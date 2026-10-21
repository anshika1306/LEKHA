/**
 * LEKHA (लेखा) - Main Application Controller
 * Handles Multi-Role Portals, Offline Storage, Quick Billing, AI Slip OCR Scanner,
 * Customer QR Cart Engine, Reorder WhatsApp Generator, and 3D Shelf Sync.
 */

// Initial Seed Inventory (Authentic Kirana stock items)
const DEFAULT_INVENTORY = [
  // Grains & Pulses (अनाज व दालें - loose & packed)
  { id: 'item_1', name: 'बासमती चावल (Basmati Rice)', category: 'grains', stock: 18.5, unit: 'kg', rate: 70, avgMarketRate: 68, isLoose: true, lastSoldDays: 1, reorderQty: 25 },
  { id: 'item_2', name: 'अरहर दाल (Toor Dal)', category: 'grains', stock: 3.5, unit: 'kg', rate: 145, avgMarketRate: 140, isLoose: true, lastSoldDays: 1, reorderQty: 20 },
  { id: 'item_3', name: 'सफेद चीनी (Sugar)', category: 'grains', stock: 24.0, unit: 'kg', rate: 44, avgMarketRate: 43, isLoose: true, lastSoldDays: 0, reorderQty: 50 },
  { id: 'item_4', name: 'आशीर्वाद आटा (Atta 5kg)', category: 'grains', stock: 8, unit: 'pkt', rate: 220, avgMarketRate: 220, isLoose: false, lastSoldDays: 2, reorderQty: 10 },
  { id: 'item_5', name: 'चना दाल (Chana Dal)', category: 'grains', stock: 2.0, unit: 'kg', rate: 82, avgMarketRate: 80, isLoose: true, lastSoldDays: 28, reorderQty: 15 }, // Dead stock example

  // Oils & Spices (तेल, घी व मसाले)
  { id: 'item_6', name: 'फॉर्च्यून सोयाबीन तेल 1L', category: 'oils', stock: 4, unit: 'pkt', rate: 135, avgMarketRate: 135, isLoose: false, lastSoldDays: 0, reorderQty: 15 },
  { id: 'item_7', name: 'सरसों तेल खुला (Mustard Oil)', category: 'oils', stock: 12.0, unit: 'L', rate: 150, avgMarketRate: 148, isLoose: true, lastSoldDays: 1, reorderQty: 30 },
  { id: 'item_8', name: 'एमडीएच हल्दी पाउडर 100g', category: 'oils', stock: 14, unit: 'pkt', rate: 36, avgMarketRate: 36, isLoose: false, lastSoldDays: 3, reorderQty: 20 },
  { id: 'item_9', name: 'टाटा नमक 1kg (Tata Salt)', category: 'oils', stock: 25, unit: 'pkt', rate: 28, avgMarketRate: 28, isLoose: false, lastSoldDays: 0, reorderQty: 30 },

  // Household & Soaps (साबुन व घरेलू सामान)
  { id: 'item_10', name: 'रिन डिटर्जेंट साबुन (Rin Bar)', category: 'household', stock: 3, unit: 'pc', rate: 20, avgMarketRate: 20, isLoose: false, lastSoldDays: 1, reorderQty: 24 },
  { id: 'item_11', name: 'सर्फ एक्सेल 500g (Surf Excel)', category: 'household', stock: 9, unit: 'pkt', rate: 75, avgMarketRate: 75, isLoose: false, lastSoldDays: 2, reorderQty: 12 },
  { id: 'item_12', name: 'कोलगेट टूथपेस्ट 100g', category: 'household', stock: 1, unit: 'pc', rate: 60, avgMarketRate: 60, isLoose: false, lastSoldDays: 35, reorderQty: 12 }, // Critical low & slow

  // Snacks & Biscuits (स्नैक्स, नमकीन व बिस्कुट)
  { id: 'item_13', name: 'पार्ले-जी बिस्कुट (Parle-G 10/-)', category: 'snacks', stock: 28, unit: 'pkt', rate: 10, avgMarketRate: 10, isLoose: false, lastSoldDays: 0, reorderQty: 48 },
  { id: 'item_14', name: 'मैगी नूडल्स (Maggi 14/-)', category: 'snacks', stock: 5, unit: 'pkt', rate: 14, avgMarketRate: 14, isLoose: false, lastSoldDays: 0, reorderQty: 36 },
  { id: 'item_15', name: 'ताज महल चाय पत्ती 250g', category: 'snacks', stock: 7, unit: 'pkt', rate: 110, avgMarketRate: 110, isLoose: false, lastSoldDays: 2, reorderQty: 10 }
];

class LekhaApp {
  constructor() {
    this.currentRole = 'shopkeeper'; // 'shopkeeper' | 'customer' | 'wholesaler'
    this.currentSubTab = 'billing';
    this.inventory = this.loadInventory();
    this.bills = this.loadBills();
    this.customerCart = this.loadCustomerCart();
    this.selectedItemForBill = null;
    this.shelf3d = null;

    this.initDOM();
    this.initEventListeners();
    this.renderAll();
    this.init3DShelf();
  }

  // --- Storage Management ---
  loadInventory() {
    try {
      const data = localStorage.getItem('lekha_inventory');
      return data ? JSON.parse(data) : DEFAULT_INVENTORY;
    } catch (e) {
      return DEFAULT_INVENTORY;
    }
  }

  saveInventory() {
    localStorage.setItem('lekha_inventory', JSON.stringify(this.inventory));
    if (this.shelf3d) this.shelf3d.render();
  }

  loadBills() {
    try {
      const data = localStorage.getItem('lekha_bills');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveBills() {
    localStorage.setItem('lekha_bills', JSON.stringify(this.bills));
  }

  loadCustomerCart() {
    try {
      const data = localStorage.getItem('lekha_cart');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCustomerCart() {
    localStorage.setItem('lekha_cart', JSON.stringify(this.customerCart));
  }

  // --- Initializations ---
  initDOM() {
    // Current date
    const dateStr = new Date().toLocaleDateString('hi-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const dateEl = document.getElementById('headerDate');
    if (dateEl) dateEl.textContent = dateStr;
  }

  init3DShelf() {
    setTimeout(() => {
      const canvas = document.getElementById('shelfCanvas');
      if (canvas && window.StoreShelf3D) {
        this.shelf3d = new window.StoreShelf3D(
          'shelfCanvas',
          () => this.inventory,
          (rack) => {
            this.showRackDetailsModal(rack);
          }
        );
      }
    }, 150);
  }

  initEventListeners() {
    // Role Switchers
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const role = e.currentTarget.dataset.role;
        this.switchRole(role);
      });
    });

    // Mobile Bottom Nav
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchSubTab(tab);
      });
    });

    // Quick Quantity Chips
    document.querySelectorAll('.qty-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.qty-chip').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const qtyVal = parseFloat(e.currentTarget.dataset.val);
        const qtyInput = document.getElementById('billItemQty');
        if (qtyInput) qtyInput.value = qtyVal;
        this.recalcBillAmount();
      });
    });

    // Bill Input Recalc
    const qtyInput = document.getElementById('billItemQty');
    const priceInput = document.getElementById('billItemRate');
    if (qtyInput) qtyInput.addEventListener('input', () => this.recalcBillAmount());
    if (priceInput) priceInput.addEventListener('input', () => this.recalcBillAmount());

    // Single-Tap Bill Submit
    const quickBillForm = document.getElementById('quickBillForm');
    if (quickBillForm) {
      quickBillForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitSingleBill();
      });
    }

    // Modal Close buttons
    document.querySelectorAll('.modal-close, .btn-modal-dismiss').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lekha-modal').forEach(m => m.classList.remove('active'));
      });
    });

    // AI Scanner Simulation Trigger
    const btnScanSlip = document.getElementById('btnOpenOcrScanner');
    if (btnScanSlip) {
      btnScanSlip.addEventListener('click', () => this.openOcrModal());
    }

    // Scan Customer QR Trigger
    const btnScanCustomerQr = document.getElementById('btnOpenQrScanner');
    if (btnScanCustomerQr) {
      btnScanCustomerQr.addEventListener('click', () => this.openQrScanModal());
    }

    // WhatsApp Reorder Export
    const btnWhatsappExport = document.getElementById('btnWhatsappReorder');
    if (btnWhatsappExport) {
      btnWhatsappExport.addEventListener('click', () => this.sendReorderToWhatsApp());
    }

    // Customer Cart item addition
    const custItemSelect = document.getElementById('custItemSelect');
    if (custItemSelect) {
      custItemSelect.addEventListener('change', (e) => {
        this.onCustomerSelectProduct(e.target.value);
      });
    }

    const btnAddCustCart = document.getElementById('btnAddCustomerCart');
    if (btnAddCustCart) {
      btnAddCustCart.addEventListener('click', () => this.addCustomerCartItem());
    }

    // Reset Data button
    const btnReset = document.getElementById('btnResetSampleData');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('क्या आप टेस्ट डेटा को रीसेट करना चाहते हैं?')) {
          localStorage.clear();
          this.inventory = DEFAULT_INVENTORY;
          this.bills = [];
          this.customerCart = [];
          this.saveInventory();
          this.saveBills();
          this.saveCustomerCart();
          this.renderAll();
          alert('डेटा रीसेट हो गया!');
        }
      });
    }
  }

  // --- Role & Tab Switching ---
  switchRole(role) {
    this.currentRole = role;
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.role === role);
    });

    // Toggle Portals
    document.getElementById('portalShopkeeper').classList.toggle('active', role === 'shopkeeper');
    document.getElementById('portalCustomer').classList.toggle('active', role === 'customer');
    document.getElementById('portalWholesaler').classList.toggle('active', role === 'wholesaler');

    // Bottom Navigation visibility
    const bottomNav = document.getElementById('mobileNavBar');
    if (bottomNav) {
      bottomNav.style.display = role === 'shopkeeper' ? 'flex' : 'none';
    }

    if (role === 'customer') {
      this.renderCustomerPortal();
    } else if (role === 'wholesaler') {
      this.renderWholesalerPortal();
    } else {
      if (this.shelf3d) this.shelf3d.render();
    }
  }

  switchSubTab(tab) {
    this.currentSubTab = tab;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tab);
    });

    document.querySelectorAll('.shop-tab-view').forEach(view => {
      view.classList.toggle('active', view.dataset.view === tab);
    });

    if (tab === 'shelf' && this.shelf3d) {
      setTimeout(() => this.shelf3d.render(), 100);
    }
  }

  // --- Rendering Functions ---
  renderAll() {
    this.renderStats();
    this.renderQuickItemTiles();
    this.renderTodayBillsTable();
    this.renderReorderSheet();
    this.renderCustomerPortal();
    this.renderWholesalerPortal();
  }

  renderStats() {
    const totalSales = this.bills.reduce((sum, b) => sum + b.total, 0);
    const lowStockCount = this.inventory.filter(i => i.stock <= 4).length;

    const elSales = document.getElementById('statTotalSales');
    const elCount = document.getElementById('statTotalBills');
    const elLow = document.getElementById('statLowStock');

    if (elSales) elSales.textContent = '₹' + totalSales.toLocaleString('en-IN');
    if (elCount) elCount.textContent = this.bills.length;
    if (elLow) elLow.textContent = lowStockCount + ' सामान';
  }

  renderQuickItemTiles() {
    const grid = document.getElementById('quickItemsGrid');
    if (!grid) return;

    grid.innerHTML = this.inventory.map(item => {
      let stockColor = '#16a34a'; // green
      let tag = `${item.stock} ${item.unit}`;
      if (item.stock <= 2) {
        stockColor = '#ef4444'; // red
        tag = `⚠️ मात्र ${item.stock}${item.unit}`;
      } else if (item.stock <= 5) {
        stockColor = '#f59e0b'; // yellow
        tag = `कम (${item.stock}${item.unit})`;
      }

      return `
        <div class="item-tile" onclick="window.lekhaApp.selectQuickItem('${item.id}')">
          <div class="name">${item.name}</div>
          <div class="rate">₹${item.rate} / ${item.unit}</div>
          <div class="stock-tag" style="color: ${stockColor};">${tag}</div>
        </div>
      `;
    }).join('');
  }

  selectQuickItem(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    this.selectedItemForBill = item;
    document.getElementById('billItemName').value = item.name;
    document.getElementById('billItemRate').value = item.rate;
    document.getElementById('billItemQty').value = item.isLoose ? 1 : 1;
    this.recalcBillAmount();
  }

  recalcBillAmount() {
    const qty = parseFloat(document.getElementById('billItemQty').value) || 0;
    const rate = parseFloat(document.getElementById('billItemRate').value) || 0;
    const total = qty * rate;
    const totalEl = document.getElementById('billCalculatedTotal');
    if (totalEl) totalEl.textContent = '₹' + total.toFixed(1).replace('.0', '');
  }

  submitSingleBill() {
    const custName = document.getElementById('billCustName').value.trim() || 'नगद ग्राहक (Cash)';
    const itemName = document.getElementById('billItemName').value.trim();
    const qty = parseFloat(document.getElementById('billItemQty').value) || 0;
    const rate = parseFloat(document.getElementById('billItemRate').value) || 0;

    if (!itemName || qty <= 0 || rate <= 0) {
      alert('कृपया सामान, सही मात्रा और रेट भरें।');
      return;
    }

    const total = qty * rate;
    const billId = '#B' + (1000 + this.bills.length + 1);

    const newBill = {
      id: billId,
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
      customer: custName,
      items: [
        { name: itemName, qty: qty, rate: rate, total: total }
      ],
      total: total
    };

    // Deduct Stock if matching item found
    const invItem = this.inventory.find(i => i.name.toLowerCase().includes(itemName.toLowerCase()) || (this.selectedItemForBill && i.id === this.selectedItemForBill.id));
    if (invItem) {
      invItem.stock = Math.max(0, parseFloat((invItem.stock - qty).toFixed(2)));
      invItem.lastSoldDays = 0; // mark as active fast-mover
      this.saveInventory();
    }

    this.bills.unshift(newBill);
    this.saveBills();

    // Reset Form
    document.getElementById('billItemName').value = '';
    document.getElementById('billItemQty').value = '1';
    document.getElementById('billItemRate').value = '';
    document.getElementById('billCalculatedTotal').textContent = '₹0';
    this.selectedItemForBill = null;

    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    // Success sound/vibration feedback
    if (navigator.vibrate) navigator.vibrate(50);
  }

  renderTodayBillsTable() {
    const tbody = document.getElementById('todayBillsTbody');
    const emptyState = document.getElementById('noBillsState');
    if (!tbody) return;

    if (this.bills.length === 0) {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    tbody.innerHTML = this.bills.map(b => {
      const itemsText = b.items.map(it => `${it.name} (${it.qty} × ₹${it.rate})`).join(', ');
      return `
        <tr>
          <td><strong>${b.id}</strong><div style="font-size: 10px; color: #64748b;">${b.time}</div></td>
          <td>${b.customer}</td>
          <td>${itemsText}</td>
          <td><strong style="color: #15803d;">₹${b.total}</strong></td>
          <td><span class="badge-pill badge-green">नगद प्राप्त</span></td>
        </tr>
      `;
    }).join('');
  }

  // --- Reorder Sheet (हैकथॉन की मुख्य मांग) ---
  renderReorderSheet() {
    const container = document.getElementById('reorderListContainer');
    if (!container) return;

    // Fast movers low in stock
    const lowStockItems = this.inventory.filter(i => i.stock <= 5);
    // Dead stock items (not sold in >= 20 days)
    const deadStockItems = this.inventory.filter(i => i.lastSoldDays >= 20);

    let html = '';

    if (lowStockItems.length === 0 && deadStockItems.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:20px; color:#64748b;">सब स्टॉक ठीक है! कोई रीऑर्डर की जरूरत नहीं।</div>`;
      return;
    }

    // Section 1: Low Stock Reorder
    if (lowStockItems.length > 0) {
      html += `<h4 style="font-size:13px; color:#b91c1c; margin-bottom:8px;">⚠️ तुरंत मंगवाने वाला सामान (Low Stock):</h4>`;
      html += `<div style="display:flex; flex-direction:column; gap:8px; margin-bottom:16px;">`;
      lowStockItems.forEach(item => {
        html += `
          <div style="background:#fff; border:1px solid #fee2e2; padding:10px 14px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:700; font-size:13px;">${item.name}</div>
              <div style="font-size:11px; color:#ef4444;">बचा हुआ स्टॉक: ${item.stock} ${item.unit}</div>
            </div>
            <div style="text-align:right;">
              <span class="badge-pill badge-yellow">जरूरत: +${item.reorderQty} ${item.unit}</span>
            </div>
          </div>
        `;
      });
      html += `</div>`;
    }

    // Section 2: Dead Stock (चेतावनी)
    if (deadStockItems.length > 0) {
      html += `<h4 style="font-size:13px; color:#b45309; margin-bottom:8px;">🧊 रुका हुआ माल / डेड स्टॉक (Slow Moving):</h4>`;
      html += `<div style="display:flex; flex-direction:column; gap:8px;">`;
      deadStockItems.forEach(item => {
        html += `
          <div style="background:#fff; border:1px solid #fef3c7; padding:10px 14px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:700; font-size:13px;">${item.name}</div>
              <div style="font-size:11px; color:#b45309;">${item.lastSoldDays} दिनों से नहीं बिका (${item.stock} ${item.unit} फंसा है)</div>
            </div>
            <span class="badge-pill badge-red">ऑर्डर न करें</span>
          </div>
        `;
      });
      html += `</div>`;
    }

    container.innerHTML = html;
  }

  sendReorderToWhatsApp() {
    const lowStockItems = this.inventory.filter(i => i.stock <= 5);
    if (lowStockItems.length === 0) {
      alert('अभी किसी सामान का स्टॉक कम नहीं है!');
      return;
    }

    let text = `*LEKHA - किराना दुकान का थोक ऑर्डर*\nदिनांक: ${new Date().toLocaleDateString('hi-IN')}\n\nकृपया निम्न सामान जल्दी भिजवाएं:\n`;
    lowStockItems.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}* - मात्रा: *${item.reorderQty} ${item.unit}* (दुकान में बचा: ${item.stock} ${item.unit})\n`;
    });
    text += `\nधन्यवाद!\n- गुप्ता किराना स्टोर`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }

  // --- AI Handwritten Slip OCR Scanner Modal ---
  openOcrModal() {
    const modal = document.getElementById('ocrModal');
    if (modal) modal.classList.add('active');
  }

  processSampleSlip(slipIndex) {
    const samples = [
      {
        customer: 'रमेश भाई (Ramesh Bhai)',
        rawText: '2kg बासमती चावल, 500g चीनी, 1pkt फॉर्च्यून तेल',
        items: [
          { name: 'बासमती चावल (Basmati Rice)', qty: 2.0, rate: 70 },
          { name: 'सफेद चीनी (Sugar)', qty: 0.5, rate: 44 },
          { name: 'फॉर्च्यून सोयाबीन तेल 1L', qty: 1.0, rate: 135 }
        ]
      },
      {
        customer: 'सुमन दीदी (Suman Didi)',
        rawText: '1kg अरहर दाल, 2 पैकेट मैगी, 1 पार्ले-जी',
        items: [
          { name: 'अरहर दाल (Toor Dal)', qty: 1.0, rate: 145 },
          { name: 'मैगी नूडल्स (Maggi 14/-)', qty: 2.0, rate: 14 },
          { name: 'पार्ले-जी बिस्कुट (Parle-G 10/-)', qty: 1.0, rate: 10 }
        ]
      }
    ];

    const chosen = samples[slipIndex] || samples[0];
    const previewBox = document.getElementById('ocrExtractedResult');
    if (!previewBox) return;

    previewBox.innerHTML = `
      <div style="background:#eff6ff; border:1px solid #93c5fd; padding:14px; border-radius:10px; margin-top:14px;">
        <div style="font-weight:700; color:#1d4ed8; font-size:14px; margin-bottom:6px;">✨ AI ने पर्ची से निकाला:</div>
        <div style="font-size:12px; margin-bottom:4px;"><strong>ग्राहक:</strong> ${chosen.customer}</div>
        <div style="font-size:12px; margin-bottom:8px;"><strong>हस्तलिखित नोट:</strong> "${chosen.rawText}"</div>
        <hr style="border:0; border-top:1px solid #cbd5e1; margin:8px 0;"/>
        <ul style="font-size:12px; padding-left:18px;">
          ${chosen.items.map(it => `<li>${it.name} - <strong>${it.qty}</strong> × ₹${it.rate} = <strong>₹${it.qty * it.rate}</strong></li>`).join('')}
        </ul>
        <div style="margin-top:10px; font-weight:700; font-size:13px; text-align:right;">
          कुल रकम: ₹${chosen.items.reduce((s, it) => s + it.qty * it.rate, 0)}
        </div>
        <button class="btn-primary" style="margin-top:12px;" onclick="window.lekhaApp.confirmOcrBill(${slipIndex})">
          ✅ बिल में जोड़ें और स्टॉक घटाएं
        </button>
      </div>
    `;
  }

  confirmOcrBill(slipIndex) {
    const samples = [
      {
        customer: 'रमेश भाई (Ramesh Bhai)',
        items: [
          { name: 'बासमती चावल (Basmati Rice)', qty: 2.0, rate: 70 },
          { name: 'सफेद चीनी (Sugar)', qty: 0.5, rate: 44 },
          { name: 'फॉर्च्यून सोयाबीन तेल 1L', qty: 1.0, rate: 135 }
        ]
      },
      {
        customer: 'सुमन दीदी (Suman Didi)',
        items: [
          { name: 'अरहर दाल (Toor Dal)', qty: 1.0, rate: 145 },
          { name: 'मैगी नूडल्स (Maggi 14/-)', qty: 2.0, rate: 14 },
          { name: 'पार्ले-जी बिस्कुट (Parle-G 10/-)', qty: 1.0, rate: 10 }
        ]
      }
    ];

    const chosen = samples[slipIndex] || samples[0];
    const total = chosen.items.reduce((s, it) => s + it.qty * it.rate, 0);

    const bill = {
      id: '#B' + (1000 + this.bills.length + 1),
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
      customer: chosen.customer,
      items: chosen.items.map(it => ({ ...it, total: it.qty * it.rate })),
      total: total
    };

    // Deduct stock for all items
    chosen.items.forEach(it => {
      const invItem = this.inventory.find(inv => inv.name === it.name);
      if (invItem) {
        invItem.stock = Math.max(0, parseFloat((invItem.stock - it.qty).toFixed(2)));
      }
    });

    this.bills.unshift(bill);
    this.saveInventory();
    this.saveBills();
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    document.querySelectorAll('.lekha-modal').forEach(m => m.classList.remove('active'));
    alert(`पर्ची से बिल ${bill.id} सफलतापूर्वक बन गया और स्टॉक घट गया!`);
  }

  // --- Customer QR Scan Modal (दुकानदार QR स्कैन करेगा) ---
  openQrScanModal() {
    const modal = document.getElementById('qrScanModal');
    if (!modal) return;
    modal.classList.add('active');

    const resultBox = document.getElementById('qrScanResultBox');
    if (this.customerCart.length === 0) {
      resultBox.innerHTML = `
        <div style="color:#64748b; font-size:13px; text-align:center; padding:20px;">
          अभी ग्राहक ने कोई कार्ट नहीं बनाई है।<br>
          (ऊपर <strong>"🛒 ग्राहक"</strong> टैब में जाकर सामान जोड़ें और QR कोड बनाएं)
        </div>
      `;
      return;
    }

    // Show simulated QR scan of current customer cart
    let checkHtml = `<div style="font-size:13px; font-weight:700; margin-bottom:8px;">📱 ग्राहक की कार्ट प्राप्त हुई (Customer Cart Scanned):</div>`;
    checkHtml += `<div style="display:flex; flex-direction:column; gap:6px; margin-bottom:12px;">`;

    let totalEst = 0;
    this.customerCart.forEach((item, idx) => {
      const invItem = this.inventory.find(i => i.id === item.id);
      const isAvailable = invItem && invItem.stock >= item.qty;
      const subTotal = item.qty * item.customRate;
      totalEst += subTotal;

      checkHtml += `
        <div style="background:#f8fafc; border:1px solid ${isAvailable ? '#e2e8f0' : '#fee2e2'}; padding:10px; border-radius:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong>${item.name}</strong>
            <span class="badge-pill ${isAvailable ? 'badge-green' : 'badge-red'}">
              ${isAvailable ? 'उपलब्ध' : `स्टॉक कम (बचा: ${invItem ? invItem.stock : 0}${item.unit})`}
            </span>
          </div>
          <div style="font-size:12px; color:#64748b; margin-top:4px; display:flex; justify-content:space-between;">
            <span>मांग: ${item.qty} ${item.unit}</span>
            <span>दुकान रेट: <strong>₹${item.customRate}</strong> (कुल: ₹${subTotal})</span>
          </div>
        </div>
      `;
    });

    checkHtml += `</div>`;
    checkHtml += `
      <div style="text-align:right; font-size:15px; font-weight:800; margin-bottom:12px;">
        कुल बिल: ₹${totalEst}
      </div>
      <button class="btn-primary" onclick="window.lekhaApp.confirmQrCartBill()">
        ⚡ बिल स्वीकारें व सामान दें (Confirm Bill)
      </button>
    `;

    resultBox.innerHTML = checkHtml;
  }

  confirmQrCartBill() {
    if (this.customerCart.length === 0) return;

    let total = 0;
    const items = [];

    this.customerCart.forEach(item => {
      const sub = item.qty * item.customRate;
      total += sub;
      items.push({
        name: item.name,
        qty: item.qty,
        rate: item.customRate,
        total: sub
      });

      // Deduct stock
      const inv = this.inventory.find(i => i.id === item.id);
      if (inv) {
        inv.stock = Math.max(0, parseFloat((inv.stock - item.qty).toFixed(2)));
      }
    });

    const bill = {
      id: '#B' + (1000 + this.bills.length + 1),
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
      customer: 'QR ग्राहक (App Customer)',
      items: items,
      total: total
    };

    this.bills.unshift(bill);
    this.customerCart = []; // empty cart
    this.saveInventory();
    this.saveBills();
    this.saveCustomerCart();
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    document.querySelectorAll('.lekha-modal').forEach(m => m.classList.remove('active'));
    alert(`QR कोड से बिल ${bill.id} बन गया!`);
  }

  // --- Customer Portal Features ---
  renderCustomerPortal() {
    const select = document.getElementById('custItemSelect');
    if (!select) return;

    select.innerHTML = `<option value="">-- सामान चुनें --</option>` + this.inventory.map(item => `
      <option value="${item.id}">${item.name} (${item.isLoose ? 'खुला सामान' : 'पैकेट'})</option>
    `).join('');

    this.renderCustomerCartList();
  }

  onCustomerSelectProduct(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    const avgRateInfo = document.getElementById('custAvgRateInfo');
    const rateInput = document.getElementById('custItemRate');
    if (!item) {
      if (avgRateInfo) avgRateInfo.innerHTML = '';
      return;
    }

    if (rateInput) rateInput.value = item.rate;

    if (avgRateInfo) {
      if (item.isLoose) {
        avgRateInfo.innerHTML = `
          <div style="background:#eff6ff; border:1px solid #bfdbfe; padding:8px 12px; border-radius:8px; font-size:12px; color:#1e40af;">
            ℹ️ <strong>खुला सामान (Loose):</strong> बाज़ार का औसत भाव <strong>₹${item.avgMarketRate}/${item.unit}</strong> है।<br>
            दुकानदार दुकान की क्वालिटी के हिसाब से ₹2-4 तय करेगा, आप बिल पर कन्फर्म कर सकते हैं।
          </div>
        `;
      } else {
        avgRateInfo.innerHTML = `
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:8px 12px; border-radius:8px; font-size:12px; color:#166534;">
            ✅ <strong>पैकेट सामान (MRP):</strong> फिक्स रेट ₹${item.rate}/${item.unit}
          </div>
        `;
      }
    }
  }

  addCustomerCartItem() {
    const itemId = document.getElementById('custItemSelect').value;
    const qty = parseFloat(document.getElementById('custItemQty').value) || 0;
    const item = this.inventory.find(i => i.id === itemId);

    if (!item || qty <= 0) {
      alert('कृपया सामान और मात्रा चुनें।');
      return;
    }

    this.customerCart.push({
      id: item.id,
      name: item.name,
      qty: qty,
      unit: item.unit,
      customRate: item.rate,
      isLoose: item.isLoose
    });

    this.saveCustomerCart();
    this.renderCustomerCartList();
    document.getElementById('custItemSelect').value = '';
    document.getElementById('custAvgRateInfo').innerHTML = '';
  }

  renderCustomerCartList() {
    const container = document.getElementById('customerCartContainer');
    const qrContainer = document.getElementById('customerQrCodeWrapper');
    if (!container) return;

    if (this.customerCart.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:16px; color:#64748b; font-size:13px;">आपकी कार्ट अभी खाली है। ऊपर से सामान जोड़ें।</div>`;
      if (qrContainer) qrContainer.innerHTML = '';
      return;
    }

    let total = 0;
    let listHtml = `<div style="display:flex; flex-direction:column; gap:8px;">`;

    this.customerCart.forEach((item, idx) => {
      const sub = item.qty * item.customRate;
      total += sub;
      listHtml += `
        <div style="background:#fff; border:1px solid #e2e8f0; padding:10px 14px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; font-size:13px;">${item.name}</div>
            <div style="font-size:11px; color:#64748b;">मात्रा: ${item.qty} ${item.unit} × ₹${item.customRate}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700; color:#2563eb;">₹${sub}</div>
            <button style="border:none; background:transparent; color:#ef4444; font-size:11px; cursor:pointer;" onclick="window.lekhaApp.removeCustCartItem(${idx})">हटाएं ✕</button>
          </div>
        </div>
      `;
    });
    listHtml += `</div>`;
    listHtml += `<div style="text-align:right; font-size:15px; font-weight:800; margin-top:12px;">अनुमानित कुल: ₹${total}</div>`;

    container.innerHTML = listHtml;

    // Render Offline QR Code
    if (qrContainer && window.QRCodeLib) {
      const payload = JSON.stringify({
        app: 'LEKHA',
        ts: Date.now(),
        items: this.customerCart
      });
      const svg = window.QRCodeLib.generateSVG(payload, 220);
      qrContainer.innerHTML = `
        <div style="background:#fff; padding:16px; border-radius:16px; display:inline-block; box-shadow:0 10px 25px rgba(0,0,0,0.08); text-align:center;">
          ${svg}
          <div style="font-size:12px; font-weight:700; color:#0f172a; margin-top:8px;">
            दुकानदार को यह QR कोड दिखाएं
          </div>
          <div style="font-size:11px; color:#64748b;">
            स्कैन करते ही बिना लाइन में लगे आपका बिल बन जाएगा
          </div>
        </div>
      `;
    }
  }

  removeCustCartItem(index) {
    this.customerCart.splice(index, 1);
    this.saveCustomerCart();
    this.renderCustomerCartList();
  }

  // --- Wholesaler Portal Features ---
  renderWholesalerPortal() {
    const orderBox = document.getElementById('wholesalerIncomingOrders');
    if (!orderBox) return;

    // Check low stock from Kirana store as pending orders
    const lowStockItems = this.inventory.filter(i => i.stock <= 5);

    if (lowStockItems.length === 0) {
      orderBox.innerHTML = `<div style="text-align:center; padding:20px; color:#64748b;">अभी किसी दुकान से नया ऑर्डर नहीं आया है।</div>`;
      return;
    }

    let html = `
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <div>
            <div style="font-weight:700; font-size:14px;">🏬 गुप्ता किराना स्टोर (स्टेशन रोड)</div>
            <div style="font-size:11px; color:#64748b;">ऑर्डर #WH-8041 • तत्काल सप्लाई चाहिए</div>
          </div>
          <span class="badge-pill badge-yellow">पेंडिंग</span>
        </div>
        <ul style="font-size:13px; padding-left:18px; margin-bottom:12px;">
          ${lowStockItems.map(it => `<li><strong>${it.name}</strong> - ${it.reorderQty} ${it.unit}</li>`).join('')}
        </ul>
        <button class="btn-accent" style="width:100%; justify-content:center;" onclick="alert('सप्लाई डिस्पैच मार्क कर दी गई!')">
          🚚 माल भेजा गया (Mark Dispatched)
        </button>
      </div>
    `;

    orderBox.innerHTML = html;
  }

  showRackDetailsModal(rack) {
    const modal = document.getElementById('rackDetailsModal');
    if (!modal) return;
    modal.classList.add('active');

    const titleEl = document.getElementById('rackModalTitle');
    const contentEl = document.getElementById('rackModalContent');

    if (titleEl) titleEl.textContent = rack.name;

    const rackItems = this.inventory.filter(i => i.category === rack.category);
    let html = `<div style="display:flex; flex-direction:column; gap:10px;">`;

    rackItems.forEach(item => {
      let badge = 'badge-green';
      let status = 'स्टॉक पर्याप्त';
      if (item.stock <= 2) {
        badge = 'badge-red';
        status = 'खत्म!';
      } else if (item.stock <= 5) {
        badge = 'badge-yellow';
        status = 'कम बचा';
      }

      html += `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:10px 14px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-weight:700; font-size:13px;">${item.name}</div>
            <div style="font-size:11px; color:#64748b;">मौजूदा स्टॉक: <strong>${item.stock} ${item.unit}</strong> | रेट: ₹${item.rate}</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="badge-pill ${badge}">${status}</span>
            <button style="background:#2563eb; color:#fff; border:none; padding:4px 8px; border-radius:6px; font-size:11px; cursor:pointer;" onclick="window.lekhaApp.quickRefillStock('${item.id}', 10)">
              +10 भरें
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    if (contentEl) contentEl.innerHTML = html;
  }

  quickRefillStock(itemId, addQty) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;
    item.stock = parseFloat((item.stock + addQty).toFixed(2));
    this.saveInventory();
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    const currentRack = this.shelf3d.racks[this.shelf3d.selectedRackIndex];
    if (currentRack) this.showRackDetailsModal(currentRack);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.lekhaApp = new LekhaApp();
});
