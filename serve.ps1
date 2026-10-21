# LEKHA Full-Stack Local Web Server & REST API Backend
# Handles static assets, offline PWA resources, and Kirana REST API endpoints.

$port = 5173
$baseDir = $PSScriptRoot
$dataDir = Join-Path $baseDir "data"

if (-not (Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir -Force | Out-Null
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Prefixes.Add("http://127.0.0.1:$port/")

try {
    $listener.Start()
    Write-Host "=========================================================="
    Write-Host "   LEKHA Backend & Web Server is LIVE on port $port"
    Write-Host "   URL: http://localhost:$port/"
    Write-Host "   API: http://localhost:$port/api/status"
    Write-Host "=========================================================="
} catch {
    Write-Error "Failed to start HttpListener on port $port : $_"
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".ico"  = "image/x-icon"
    ".webmanifest" = "application/manifest+json"
}

function Send-JsonResponse($response, $data, $statusCode = 200) {
    $json = $data | ConvertTo-Json -Depth 10 -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
    $response.StatusCode = $statusCode
    $response.ContentType = "application/json; charset=utf-8"
    $response.Headers.Add("Access-Control-Allow-Origin", "*")
    $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    $response.Headers.Add("Access-Control-Allow-Headers", "*")
    $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
    $response.OutputStream.Flush()
    $response.Close()
}

function Read-RequestBody($request) {
    if (-not $request.HasEntityBody) { return $null }
    $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
    $body = $reader.ReadToEnd()
    $reader.Close()
    if ([string]::IsNullOrWhiteSpace($body)) { return $null }
    return ($body | ConvertFrom-Json)
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        try {
            $path = $request.Url.LocalPath
            $method = $request.HttpMethod.ToUpper()

            # Enable CORS for all
            if ($method -eq "OPTIONS") {
                $response.StatusCode = 200
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                $response.Headers.Add("Access-Control-Allow-Headers", "*")
                $response.ContentLength64 = 0
                $response.Close()
                continue
            }

            # ==========================================
            # REST API ENDPOINTS (/api/...)
            # ==========================================
            if ($path.StartsWith("/api/")) {
                # 1. API Status
                if ($path -eq "/api/status") {
                    $status = @{
                        status = "online"
                        server = "LEKHA PowerShell REST Backend"
                        timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
                        version = "1.0.0"
                    }
                    Send-JsonResponse $response $status
                    continue
                }

                # 2. Inventory API
                $invFile = Join-Path $dataDir "inventory.json"
                if ($path -eq "/api/inventory") {
                    if ($method -eq "GET") {
                        if (Test-Path $invFile) {
                            $content = [System.IO.File]::ReadAllText($invFile, [System.Text.Encoding]::UTF8)
                            $data = $content | ConvertFrom-Json
                            Send-JsonResponse $response $data
                        } else {
                            Send-JsonResponse $response @()
                        }
                    } elseif ($method -eq "POST") {
                        $newInv = Read-RequestBody $request
                        if ($newInv) {
                            $json = $newInv | ConvertTo-Json -Depth 10
                            [System.IO.File]::WriteAllText($invFile, $json, [System.Text.Encoding]::UTF8)
                            Send-JsonResponse $response @{ success = $true; message = "Inventory updated" }
                        } else {
                            Send-JsonResponse $response @{ error = "Invalid body" } 400
                        }
                    }
                    continue
                }

                # 3. Bills API
                $billsFile = Join-Path $dataDir "bills.json"
                if ($path -eq "/api/bills") {
                    if ($method -eq "GET") {
                        if (Test-Path $billsFile) {
                            $content = [System.IO.File]::ReadAllText($billsFile, [System.Text.Encoding]::UTF8)
                            $data = $content | ConvertFrom-Json
                            Send-JsonResponse $response $data
                        } else {
                            Send-JsonResponse $response @()
                        }
                    } elseif ($method -eq "POST") {
                        $bill = Read-RequestBody $request
                        if ($bill) {
                            $existingBills = @()
                            if (Test-Path $billsFile) {
                                $existingBills = [System.IO.File]::ReadAllText($billsFile, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
                            }
                            $allBills = @($bill) + @($existingBills)
                            $json = $allBills | ConvertTo-Json -Depth 10
                            [System.IO.File]::WriteAllText($billsFile, $json, [System.Text.Encoding]::UTF8)

                            # Decrement stock in inventory.json if matching
                            if (Test-Path $invFile) {
                                $inv = [System.IO.File]::ReadAllText($invFile, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
                                foreach ($bItem in $bill.items) {
                                    foreach ($invItem in $inv) {
                                        if ($invItem.name -eq $bItem.name -or $invItem.id -eq $bItem.id) {
                                            $invItem.stock = [Math]::Max(0, [Math]::Round(($invItem.stock - $bItem.qty), 2))
                                            $invItem.lastSoldDays = 0
                                        }
                                    }
                                }
                                $invJson = $inv | ConvertTo-Json -Depth 10
                                [System.IO.File]::WriteAllText($invFile, $invJson, [System.Text.Encoding]::UTF8)
                            }

                            Send-JsonResponse $response @{ success = $true; bill = $bill }
                        } else {
                            Send-JsonResponse $response @{ error = "Invalid body" } 400
                        }
                    }
                    continue
                }

                # 4. Swap & Hyperlocal Stock Network API
                $swapFile = Join-Path $dataDir "swap.json"
                if ($path -eq "/api/swap") {
                    if ($method -eq "GET") {
                        if (Test-Path $swapFile) {
                            $content = [System.IO.File]::ReadAllText($swapFile, [System.Text.Encoding]::UTF8)
                            $data = $content | ConvertFrom-Json
                            Send-JsonResponse $response $data
                        } else {
                            Send-JsonResponse $response @{}
                        }
                    }
                    continue
                }

                # 5. Swap Transfer Execution API
                if ($path -eq "/api/swap/transfer" -and $method -eq "POST") {
                    $transfer = Read-RequestBody $request
                    if ($transfer) {
                        # 1. Add to swap ledger in swap.json
                        if (Test-Path $swapFile) {
                            $swapData = [System.IO.File]::ReadAllText($swapFile, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
                            if (-not $swapData.transfers) { $swapData | Add-Member -MemberType NoteProperty -Name "transfers" -Value @() }
                            $swapData.transfers = @($transfer) + @($swapData.transfers)
                            $swapJson = $swapData | ConvertTo-Json -Depth 10
                            [System.IO.File]::WriteAllText($swapFile, $swapJson, [System.Text.Encoding]::UTF8)
                        }

                        # 2. Deduct stagnant stock in inventory.json
                        if (Test-Path $invFile) {
                            $inv = [System.IO.File]::ReadAllText($invFile, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
                            foreach ($invItem in $inv) {
                                if ($invItem.id -eq $transfer.itemId -or $invItem.name -eq $transfer.itemName) {
                                    $invItem.stock = [Math]::Max(0, [Math]::Round(($invItem.stock - $transfer.qty), 2))
                                    if ($invItem.stock -eq 0) { $invItem.lastSoldDays = 0 }
                                }
                            }
                            $invJson = $inv | ConvertTo-Json -Depth 10
                            [System.IO.File]::WriteAllText($invFile, $invJson, [System.Text.Encoding]::UTF8)
                        }

                        Send-JsonResponse $response @{ success = $true; transfer = $transfer; message = "Transfer recorded in ledger" }
                    } else {
                        Send-JsonResponse $response @{ error = "Invalid transfer body" } 400
                    }
                    continue
                }

                # 6. Wholesaler Dispatch Restock API
                if ($path -eq "/api/wholesaler/dispatch" -and $method -eq "POST") {
                    if (Test-Path $invFile) {
                        $inv = [System.IO.File]::ReadAllText($invFile, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
                        foreach ($it in $inv) {
                            if ($it.stock -le 5) {
                                $it.stock = $it.stock + $it.reorderQty
                            }
                        }
                        $invJson = $inv | ConvertTo-Json -Depth 10
                        [System.IO.File]::WriteAllText($invFile, $invJson, [System.Text.Encoding]::UTF8)
                    }
                    Send-JsonResponse $response @{ success = $true; message = "Inventory restocked by wholesaler" }
                    continue
                }

                # 7. Reset Data API
                if ($path -eq "/api/reset" -and $method -eq "POST") {
                    Send-JsonResponse $response @{ success = $true; message = "Reset done" }
                    continue
                }

                # Unknown API Route
                Send-JsonResponse $response @{ error = "Endpoint not found" } 404
                continue
            }

            # ==========================================
            # STATIC FILE SERVING
            # ==========================================
            $urlPath = $path.TrimStart('/')
            if ([string]::IsNullOrEmpty($urlPath)) {
                $urlPath = "index.html"
            }

            $filePath = [System.IO.Path]::GetFullPath((Join-Path $baseDir $urlPath))

            if ($filePath.StartsWith($baseDir, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path $filePath -PathType Leaf)) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime = $mimeTypes[$ext]
                if (-not $mime) { $mime = "application/octet-stream" }

                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.StatusCode = 200
                $response.ContentType = $mime
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
                $response.Headers.Add("Pragma", "no-cache")
                $response.Headers.Add("Expires", "0")
                $response.ContentLength64 = $bytes.Length

                if ($method -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, $bytes.Length)
                    $response.OutputStream.Flush()
                }
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $msg.Length
                if ($method -ne "HEAD") {
                    $response.OutputStream.Write($msg, 0, $msg.Length)
                    $response.OutputStream.Flush()
                }
            }
            $response.Close()
        } catch {
            try {
                $response.StatusCode = 500
                $errMsg = [System.Text.Encoding]::UTF8.GetBytes("500 Server Error: $_")
                $response.ContentLength64 = $errMsg.Length
                $response.OutputStream.Write($errMsg, 0, $errMsg.Length)
                $response.Close()
            } catch {}
        }
    }
} finally {
    $listener.Stop()
}
