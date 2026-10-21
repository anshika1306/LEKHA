/**
 * LEKHA (लेखा) - Main Application Controller
 * Handles Multi-Role Portals, Offline Storage, Quick Billing, AI Slip OCR Scanner,
 * Customer QR Cart Engine, Reorder WhatsApp Generator, and 3D Shelf Sync.
 */

// Initial Seed Inventory (Authentic Kirana stock items with wholesale cost prices)
const DEFAULT_INVENTORY = [
  // Grains & Pulses (अनाज व दालें - loose & packed)
  { id: 'item_1', name: 'बासमती चावल (Basmati Rice)', category: 'grains', stock: 18.5, unit: 'kg', rate: 70, costPrice: 60, avgMarketRate: 68, isLoose: true, lastSoldDays: 1, reorderQty: 25 },
  { id: 'item_2', name: 'अरहर दाल (Toor Dal)', category: 'grains', stock: 3.5, unit: 'kg', rate: 145, costPrice: 126, avgMarketRate: 140, isLoose: true, lastSoldDays: 1, reorderQty: 20 },
  { id: 'item_3', name: 'सफेद चीनी (Sugar)', category: 'grains', stock: 24.0, unit: 'kg', rate: 44, costPrice: 38, avgMarketRate: 43, isLoose: true, lastSoldDays: 0, reorderQty: 50 },
  { id: 'item_4', name: 'आशीर्वाद आटा (Atta 5kg)', category: 'grains', stock: 8, unit: 'pkt', rate: 220, costPrice: 195, avgMarketRate: 220, isLoose: false, lastSoldDays: 2, reorderQty: 10 },
  { id: 'item_5', name: 'चना दाल (Chana Dal)', category: 'grains', stock: 2.0, unit: 'kg', rate: 82, costPrice: 70, avgMarketRate: 80, isLoose: true, lastSoldDays: 28, reorderQty: 15 }, // Dead stock

  // Oils & Spices (तेल, घी व मसाले)
  { id: 'item_6', name: 'फॉर्च्यून सोयाबीन तेल 1L', category: 'oils', stock: 4, unit: 'pkt', rate: 135, costPrice: 120, avgMarketRate: 135, isLoose: false, lastSoldDays: 0, reorderQty: 15 },
  { id: 'item_7', name: 'सरसों तेल खुला (Mustard Oil)', category: 'oils', stock: 12.0, unit: 'L', rate: 150, costPrice: 134, avgMarketRate: 148, isLoose: true, lastSoldDays: 1, reorderQty: 30 },
  { id: 'item_8', name: 'एमडीएच हल्दी पाउडर 100g', category: 'oils', stock: 14, unit: 'pkt', rate: 36, costPrice: 30, avgMarketRate: 36, isLoose: false, lastSoldDays: 3, reorderQty: 20 },
  { id: 'item_9', name: 'टाटा नमक 1kg (Tata Salt)', category: 'oils', stock: 25, unit: 'pkt', rate: 28, costPrice: 23, avgMarketRate: 28, isLoose: false, lastSoldDays: 0, reorderQty: 30 },

  // Household & Soaps (साबुन व घरेलू सामान)
  { id: 'item_10', name: 'रिन डिटर्जेंट साबुन (Rin Bar)', category: 'household', stock: 3, unit: 'pc', rate: 20, costPrice: 16, avgMarketRate: 20, isLoose: false, lastSoldDays: 1, reorderQty: 24 },
  { id: 'item_11', name: 'सर्फ एक्सेल 500g (Surf Excel)', category: 'household', stock: 9, unit: 'pkt', rate: 75, costPrice: 64, avgMarketRate: 75, isLoose: false, lastSoldDays: 2, reorderQty: 12 },
  { id: 'item_12', name: 'कोलगेट टूथपेस्ट 100g', category: 'household', stock: 1, unit: 'pc', rate: 60, costPrice: 48, avgMarketRate: 60, isLoose: false, lastSoldDays: 35, reorderQty: 12 }, // Critical low & slow

  // Snacks & Biscuits (स्नैक्स, नमकीन व बिस्कुट)
  { id: 'item_13', name: 'पार्ले-जी बिस्कुट (Parle-G 10/-)', category: 'snacks', stock: 28, unit: 'pkt', rate: 10, costPrice: 8.5, avgMarketRate: 10, isLoose: false, lastSoldDays: 0, reorderQty: 48 },
  { id: 'item_14', name: 'मैगी नूडल्स (Maggi 14/-)', category: 'snacks', stock: 5, unit: 'pkt', rate: 14, costPrice: 11.5, avgMarketRate: 14, isLoose: false, lastSoldDays: 0, reorderQty: 36 },
  { id: 'item_15', name: 'ताज महल चाय पत्ती 250g', category: 'snacks', stock: 7, unit: 'pkt', rate: 110, costPrice: 92, avgMarketRate: 110, isLoose: false, lastSoldDays: 2, reorderQty: 10 }
];

// Hyperlocal Network: Nearby Kirana Shops within 3-4 KM Radius
const DEFAULT_NEARBY_SHOPS = [
  {
    id: 'shop_1',
    name: 'मिश्रा कॉर्नर प्रोविज़न',
    owner: 'रमेश मिश्रा',
    distance: 0.8,
    area: 'गली नं. 3, सब्जी मंडी के पास',
    phone: '9871123456',
    neededItems: ['item_5', 'item_10'], // चना दाल, रिन साबुन
    note: 'दुकान में चना दाल खत्म हो गई है, तुरंत 2-3 kg चाहिए।'
  },
  {
    id: 'shop_2',
    name: 'वर्मा डेली नीड्स',
    owner: 'राजेश वर्मा',
    distance: 1.2,
    area: 'विकास नगर चौराहा',
    phone: '9810987654',
    neededItems: ['item_12', 'item_7'], // कोलगेट टूथपेस्ट, सरसों तेल
    note: 'टूथपेस्ट और सरसों तेल की तत्काल आवश्यकता।'
  },
  {
    id: 'shop_3',
    name: 'शर्मा किराना एंड जनरल स्टोर',
    owner: 'सुरेश शर्मा',
    distance: 2.1,
    area: 'स्टेशन रोड, पोस्ट ऑफिस के पास',
    phone: '9818812345',
    neededItems: ['item_5', 'item_15'], // चना दाल, ताज महल चाय
    note: 'चना दाल और चाय पत्ती 250g चाहिए।'
  },
  {
    id: 'shop_4',
    name: 'बालाजी मिनी सुपरमार्ट',
    owner: 'मनोज गुप्ता',
    distance: 3.4,
    area: 'शिव मंदिर मेन मार्केट',
    phone: '9899123456',
    neededItems: ['item_11', 'item_1'], // सर्फ एक्सेल, बासमती चावल
    note: 'सर्फ एक्सेल 500g के 5-10 पैकेट चाहिए।'
  }
];

// Surplus items from other shops in 3-4 KM network available at wholesale cost
const DEFAULT_NEARBY_SURPLUS = [
  {
    id: 'surplus_1',
    shopId: 'shop_2',
    shopName: 'वर्मा डेली नीड्स (1.2 KM)',
    itemId: 'item_14',
    itemName: 'मैगी नूडल्स (Maggi 14/-)',
    availableQty: 12,
    unit: 'pkt',
    wholesaleCost: 11.5,
    retailRate: 14,
    reason: 'थोक में 2 कार्टन एक्स्ट्रा आ गए, खरीद भाव पर उपलब्ध।'
  },
  {
    id: 'surplus_2',
    shopId: 'shop_1',
    shopName: 'मिश्रा कॉर्नर प्रोविज़न (0.8 KM)',
    itemId: 'item_9',
    itemName: 'टाटा नमक 1kg (Tata Salt)',
    availableQty: 10,
    unit: 'pkt',
    wholesaleCost: 23,
    retailRate: 28,
    reason: 'दुकान में जगह कम है, 0% मुनाफे पर नजदीकी दुकान को दे रहे हैं।'
  },
  {
    id: 'surplus_3',
    shopId: 'shop_4',
    shopName: 'बालाजी मिनी सुपरमार्ट (3.4 KM)',
    itemId: 'item_4',
    itemName: 'आशीर्वाद आटा (Atta 5kg)',
    availableQty: 4,
    unit: 'pkt',
    wholesaleCost: 195,
    retailRate: 220,
    reason: 'धीमी बिक्री, 3-4 KM की दुकान को थोक भाव पर ट्रांसफर।'
  }
];

class LekhaApp {
  constructor() {
    this.currentRole = 'shopkeeper'; // 'shopkeeper' | 'customer' | 'wholesaler'
    this.currentSubTab = 'billing';
    this.inventory = this.loadInventory();
    this.bills = this.loadBills();
    this.customerCart = this.loadCustomerCart();
    this.nearbyShops = this.loadNearbyShops();
    this.nearbySurplus = this.loadNearbySurplus();
    this.swapTransfers = this.loadSwapTransfers();
    this.selectedItemForBill = null;
    this.selectedSwapItem = null;
    this.selectedTargetShopId = null;

    // Customer Visual Smart Cart State
    this.custCategoryFilter = 'all';
    this.custSearchQuery = '';
    this.currentCustomerStep = 1;
    this.custOrderToken = null;
    this.custOrderCustomerName = 'नगद ग्राहक';
    this.custOrderCustomerPhone = '';
    this.shopkeeperScannedItems = [];
    this.shopkeeperPaymentMode = 'cash';
    this.shelf3d = null;
    this.isBackendOnline = false;

    this.initDOM();
    this.initEventListeners();
    this.renderAll();
    this.init3DShelf();
    this.initBackendSync();
  }

  async initBackendSync() {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        this.isBackendOnline = true;
        const txt = document.getElementById('backendStatusText');
        if (txt) txt.textContent = 'REST API कनेक्टेड';
        const badge = document.getElementById('backendStatusBadge');
        if (badge) badge.classList.add('connected');

        // Fetch Remote Inventory
        try {
          const invRes = await fetch('/api/inventory');
          if (invRes.ok) {
            const invData = await invRes.json();
            if (Array.isArray(invData) && invData.length > 0) {
              invData.forEach(item => {
                const defaultItem = DEFAULT_INVENTORY.find(d => d.id === item.id);
                if (!item.img && defaultItem) item.img = defaultItem.img;
                if (!item.emoji && defaultItem) item.emoji = defaultItem.emoji;
                if (!item.costPrice) {
                  item.costPrice = defaultItem ? defaultItem.costPrice : Math.round(item.rate * 0.82);
                }
              });
              this.inventory = invData;
              localStorage.setItem('lekha_inventory', JSON.stringify(this.inventory));
            }
          }
        } catch (e) {}

        // Fetch Remote Bills
        try {
          const billsRes = await fetch('/api/bills');
          if (billsRes.ok) {
            const billsData = await billsRes.json();
            if (Array.isArray(billsData) && billsData.length > 0) {
              this.bills = billsData;
              localStorage.setItem('lekha_bills', JSON.stringify(this.bills));
            }
          }
        } catch (e) {}

        // Fetch Remote Swap Network
        try {
          const swapRes = await fetch('/api/swap');
          if (swapRes.ok) {
            const swapData = await swapRes.json();
            if (swapData && swapData.nearbyShops) {
              this.nearbyShops = swapData.nearbyShops;
              localStorage.setItem('lekha_nearby_shops', JSON.stringify(this.nearbyShops));
            }
            if (swapData && swapData.nearbySurplus) {
              this.nearbySurplus = swapData.nearbySurplus;
              localStorage.setItem('lekha_nearby_surplus', JSON.stringify(this.nearbySurplus));
            }
            if (swapData && swapData.transfers) {
              this.swapTransfers = swapData.transfers;
              localStorage.setItem('lekha_swap_transfers', JSON.stringify(this.swapTransfers));
            }
          }
        } catch (e) {}

        this.renderAll();
      }
    } catch (e) {
      console.log('Running in local/offline mode');
    }
  }

  // --- Storage Management ---
  loadInventory() {
    try {
      const data = localStorage.getItem('lekha_inventory');
      let inv = data ? JSON.parse(data) : DEFAULT_INVENTORY;
      inv.forEach(item => {
        if (!item.costPrice) {
          const defaultItem = DEFAULT_INVENTORY.find(d => d.id === item.id);
          item.costPrice = defaultItem ? defaultItem.costPrice : Math.round(item.rate * 0.82);
        }
      });
      return inv;
    } catch (e) {
      return DEFAULT_INVENTORY;
    }
  }

  saveInventory() {
    localStorage.setItem('lekha_inventory', JSON.stringify(this.inventory));
    if (this.shelf3d) this.shelf3d.render();
    if (this.isBackendOnline) {
      fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.inventory)
      }).catch(e => console.log('Inventory sync error:', e));
    }
  }

  loadNearbyShops() {
    try {
      const data = localStorage.getItem('lekha_nearby_shops');
      return data ? JSON.parse(data) : DEFAULT_NEARBY_SHOPS;
    } catch (e) {
      return DEFAULT_NEARBY_SHOPS;
    }
  }

  saveNearbyShops() {
    localStorage.setItem('lekha_nearby_shops', JSON.stringify(this.nearbyShops));
  }

  loadNearbySurplus() {
    try {
      const data = localStorage.getItem('lekha_nearby_surplus');
      return data ? JSON.parse(data) : DEFAULT_NEARBY_SURPLUS;
    } catch (e) {
      return DEFAULT_NEARBY_SURPLUS;
    }
  }

  saveNearbySurplus() {
    localStorage.setItem('lekha_nearby_surplus', JSON.stringify(this.nearbySurplus));
  }

  loadSwapTransfers() {
    try {
      const data = localStorage.getItem('lekha_swap_transfers');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveSwapTransfers() {
    localStorage.setItem('lekha_swap_transfers', JSON.stringify(this.swapTransfers));
    if (this.isBackendOnline && this.swapTransfers.length > 0) {
      fetch('/api/swap/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.swapTransfers[0])
      }).catch(e => console.log('Swap sync error:', e));
    }
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
    if (this.isBackendOnline && this.bills.length > 0) {
      fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.bills[0])
      }).catch(e => console.log('Bill sync error:', e));
    }
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

    // Swap Tab Navigation Pills
    document.querySelectorAll('.swap-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.swaptab;
        document.querySelectorAll('.swap-pill-btn').forEach(b => b.classList.toggle('active', b === e.currentTarget));
        const pLiquidate = document.getElementById('swapTabLiquidate');
        const pSurplus = document.getElementById('swapTabSurplus');
        const pHistory = document.getElementById('swapTabHistory');
        if (pLiquidate) pLiquidate.style.display = tab === 'liquidate' ? 'block' : 'none';
        if (pSurplus) pSurplus.style.display = tab === 'surplus' ? 'block' : 'none';
        if (pHistory) pHistory.style.display = tab === 'history' ? 'block' : 'none';
      });
    });

    // Alert Banner & Stat Box Click -> Go to Swap Tab
    const alertBanner = document.getElementById('swapDeadStockAlert');
    if (alertBanner) {
      alertBanner.addEventListener('click', () => this.switchSubTab('swap'));
    }
    const statDeadBox = document.getElementById('statDeadStockBox');
    if (statDeadBox) {
      statDeadBox.addEventListener('click', () => this.switchSubTab('swap'));
    }

    // Swap Modal Recalc on Quantity input
    const swapQtyInput = document.getElementById('swapTransferQty');
    if (swapQtyInput) {
      swapQtyInput.addEventListener('input', () => this.recalcSwapModal());
    }

    // Confirm Swap Transfer
    const btnConfirmSwap = document.getElementById('btnConfirmSwapTransfer');
    if (btnConfirmSwap) {
      btnConfirmSwap.addEventListener('click', () => this.executeSwapTransfer());
    }

    // Share Swap to WhatsApp
    const btnShareSwap = document.getElementById('btnShareSwapWhatsapp');
    if (btnShareSwap) {
      btnShareSwap.addEventListener('click', () => this.shareSwapWhatsApp());
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
    } else if (tab === 'swap') {
      this.renderSwapView();
    }
  }

  // --- Rendering Functions ---
  renderAll() {
    this.renderStats();
    this.renderQuickItemTiles();
    this.renderTodayBillsTable();
    this.renderReorderSheet();
    this.renderSwapView();
    this.renderCustomerPortal();
    this.renderWholesalerPortal();
  }

  renderStats() {
    const totalSales = this.bills.reduce((sum, b) => sum + b.total, 0);
    const lowStockCount = this.inventory.filter(i => i.stock <= 4).length;

    // Dead stock / stagnant stock calculation (not sold in >= 14 days and has stock)
    const deadStockItems = this.inventory.filter(i => (i.lastSoldDays >= 14 || i.isDeadStock) && i.stock > 0);
    const deadStockCapital = deadStockItems.reduce((sum, it) => sum + (it.stock * (it.costPrice || Math.round(it.rate * 0.82))), 0);

    const elSales = document.getElementById('statTotalSales');
    const elCount = document.getElementById('statTotalBills');
    const elLow = document.getElementById('statLowStock');
    const elDead = document.getElementById('statDeadStock');
    const elAlert = document.getElementById('swapDeadStockAlert');
    const elAlertSub = document.getElementById('swapAlertSubtext');

    if (elSales) elSales.textContent = '₹' + totalSales.toLocaleString('en-IN');
    if (elCount) elCount.textContent = this.bills.length;
    if (elLow) elLow.textContent = lowStockCount + ' सामान';
    if (elDead) elDead.textContent = '₹' + Math.round(deadStockCapital).toLocaleString('en-IN');

    if (elAlert && elAlertSub) {
      if (deadStockItems.length > 0) {
        elAlert.style.display = 'flex';
        elAlertSub.textContent = `${deadStockItems.length} सामान रुके हुए हैं (फंसी पूंजी ₹${Math.round(deadStockCapital)}) • 3-4 KM में पास की दुकानों को थोक भाव पर बेचें`;
      } else {
        elAlert.style.display = 'none';
      }
    }
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

    // Section 2: Dead Stock (चेतावनी व नो-लॉस समाधान)
    if (deadStockItems.length > 0) {
      html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h4 style="font-size:13px; color:#b45309; margin:0;">🧊 रुका हुआ माल / डेड स्टॉक (Slow Moving):</h4>
        <button type="button" style="background:transparent; border:none; color:#ea580c; font-size:11.5px; font-weight:700; cursor:pointer;" onclick="window.lekhaApp.switchSubTab('swap')">
          3-4 KM एक्सचेंज खोलें ➔
        </button>
      </div>`;
      html += `<div style="display:flex; flex-direction:column; gap:8px;">`;
      deadStockItems.forEach(item => {
        const cost = item.costPrice || Math.round(item.rate * 0.82);
        const locked = Math.round(item.stock * cost);
        html += `
          <div style="background:#fff; border:1px solid #fef3c7; padding:10px 14px; border-radius:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <div style="font-weight:700; font-size:13px;">${item.name}</div>
              <div style="font-size:11px; color:#b45309;">
                ${item.lastSoldDays} दिनों से नहीं बिका (${item.stock} ${item.unit} फंसा है • ₹${locked} पूंजी ब्लॉक)
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge-pill badge-red">ऑर्डर न करें</span>
              <button type="button" class="btn-primary" style="background:#ea580c; border:none; padding:6px 12px; font-size:11px; border-radius:6px; cursor:pointer;" onclick="window.lekhaApp.openSwapModal('${item.id}')">
                🔄 3-4 KM में बेचें
              </button>
            </div>
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

    // Clone customer cart into shopkeeper's active checklist
    if (this.customerCart && this.customerCart.length > 0) {
      this.shopkeeperScannedItems = this.customerCart.map(item => ({
        ...item,
        isPacked: false,
        editedQty: item.qty,
        editedRate: item.customRate
      }));
    } else {
      this.shopkeeperScannedItems = [];
    }

    this.renderShopkeeperPackingChecklist();
  }

  loadDemoCustomerCart() {
    this.customerCart = [
      { id: 'item_1', name: 'बासमती चावल (Basmati Rice)', qty: 2.0, unit: 'kg', customRate: 70, isLoose: true },
      { id: 'item_3', name: 'सफेद चीनी (Sugar)', qty: 1.0, unit: 'kg', customRate: 44, isLoose: true },
      { id: 'item_14', name: 'मैगी नूडल्स (Maggi 14/-)', qty: 3, unit: 'pkt', customRate: 14, isLoose: false },
      { id: 'item_6', name: 'फॉर्च्यून सोयाबीन तेल 1L', qty: 1, unit: 'pkt', customRate: 135, isLoose: false }
    ];
    this.custOrderToken = '#ORD-789';
    this.custOrderCustomerName = 'रमेश भाई (डेमो ग्राहक)';
    this.custOrderCustomerPhone = '9876543210';
    this.saveCustomerCart();
    this.openQrScanModal();
  }

  renderShopkeeperPackingChecklist() {
    const resultBox = document.getElementById('qrScanResultBox');
    if (!resultBox) return;

    const tokenBadge = document.getElementById('qrScanOrderIdBadge');
    if (tokenBadge) {
      const custInfo = this.custOrderCustomerName ? ` • ${this.custOrderCustomerName}` : '';
      tokenBadge.textContent = 'ऑर्डर ' + (this.custOrderToken || '#ORD-LIVE') + custInfo;
    }

    if (!this.shopkeeperScannedItems || this.shopkeeperScannedItems.length === 0) {
      resultBox.innerHTML = `
        <div style="color: #64748b; font-size: 13px; text-align: center; padding: 28px 16px; background: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 34px; margin-bottom: 8px;">🛒</div>
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">अभी कोई ग्राहक QR ऑर्डर लोड नहीं हुआ है</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">
            ऊपर <strong>"🛒 ग्राहक"</strong> टैब से फोटो देखकर सामान चुनकर QR बनाएं, या तुरंत डेमो टेस्ट करें:
          </div>
          <button type="button" class="btn-primary" onclick="window.lekhaApp.loadDemoCustomerCart()" style="margin: 0 auto; padding: 8px 16px; font-size: 13px;">
            🛍️ सैंपल ग्राहक ऑर्डर लोड करें (Demo Cart)
          </button>
        </div>
      `;
      return;
    }

    let totalBill = 0;
    let packedCount = 0;

    let itemsHtml = this.shopkeeperScannedItems.map((item, idx) => {
      const invItem = this.inventory.find(i => i.id === item.id);
      const stock = invItem ? invItem.stock : 0;
      const isLow = stock < item.editedQty;
      const subtotal = Math.round(item.editedQty * item.editedRate * 10) / 10;
      totalBill += subtotal;
      if (item.isPacked) packedCount++;

      return `
        <div class="shopkeeper-packing-item ${item.isPacked ? 'is-packed' : ''}">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; flex: 1;">
              <input type="checkbox" class="packing-check-box" ${item.isPacked ? 'checked' : ''} onchange="window.lekhaApp.toggleQrItemPacked(${idx})">
              <div>
                <strong class="item-name-text" style="font-size: 13.5px; color: #0f172a;">${item.name}</strong>
                <div style="font-size: 11px; color: #64748b;">
                  दुकान में स्टॉक: <strong style="color: ${isLow ? '#ef4444' : '#15803d'};">${stock} ${item.unit}</strong>
                  ${isLow ? '<span style="color:#ef4444; font-weight:700; margin-left:4px;">⚠️ स्टॉक कम है</span>' : ''}
                </div>
              </div>
            </label>
            <button type="button" onclick="window.lekhaApp.removeShopkeeperQrItem(${idx})" title="सामान हटाएं" style="border: none; background: transparent; color: #ef4444; font-size: 14px; cursor: pointer; padding: 4px;">
              ✕
            </button>
          </div>

          <!-- Live Quantity & Rate Steppers for Shopkeeper -->
          <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; padding: 6px 10px; border-radius: 8px; gap: 8px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 11px; color: #64748b; font-weight: 600;">मात्रा:</span>
              <div class="qty-stepper-wrap">
                <button type="button" class="stepper-btn" onclick="window.lekhaApp.changeShopkeeperItemQty(${idx}, -(${item.isLoose ? 0.25 : 1}))">−</button>
                <input type="number" step="0.25" min="0.25" class="stepper-input" value="${item.editedQty}" onchange="window.lekhaApp.updateShopkeeperItemQty(${idx}, this.value)">
                <button type="button" class="stepper-btn" onclick="window.lekhaApp.changeShopkeeperItemQty(${idx}, +(${item.isLoose ? 0.25 : 1}))">+</button>
              </div>
              <span style="font-size: 11px; font-weight: 600; color: #475569;">${item.unit}</span>
            </div>

            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 11px; color: #64748b; font-weight: 600;">रेट ₹:</span>
              <input type="number" style="width: 55px; height: 30px; border: 1.5px solid #cbd5e1; border-radius: 6px; text-align: center; font-weight: 700; font-size: 12.5px;" value="${item.editedRate}" onchange="window.lekhaApp.updateShopkeeperItemRate(${idx}, this.value)">
            </div>

            <div style="text-align: right; min-width: 60px;">
              <div style="font-size: 14px; font-weight: 800; color: #16a34a;">₹${subtotal}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Extra Add Row for Shopkeeper
    const extraOptions = this.inventory.map(inv => `<option value="${inv.id}">${inv.name} (₹${inv.rate}/${inv.unit})</option>`).join('');

    resultBox.innerHTML = `
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
        <span style="color: #166534; font-weight: 600;">
          📦 पैकिंग प्रगति: <strong>${packedCount} / ${this.shopkeeperScannedItems.length}</strong> सामान रैक से निकाला
        </span>
        <span class="badge-pill ${packedCount === this.shopkeeperScannedItems.length ? 'badge-green' : 'badge-yellow'}" style="font-size: 10px;">
          ${packedCount === this.shopkeeperScannedItems.length ? '✅ पूरी पैकिंग तैयार' : 'पैकिंग जारी'}
        </span>
      </div>

      <div style="max-height: 280px; overflow-y: auto; margin-bottom: 12px; padding-right: 2px;">
        ${itemsHtml}
      </div>

      <!-- Add extra item at the counter -->
      <div style="display: flex; gap: 6px; margin-bottom: 14px;">
        <select id="qrScanExtraSelect" class="form-input" style="flex: 1; padding: 6px 10px; font-size: 12px;">
          <option value="">➕ काउंटर पर ग्राहक ने कुछ और मांगा? जोड़ें...</option>
          ${extraOptions}
        </select>
        <button type="button" class="btn-secondary" onclick="window.lekhaApp.addShopkeeperExtraItem()" style="padding: 6px 12px; font-size: 12px; font-weight: 700;">
          + जोड़ें
        </button>
      </div>

      <!-- Payment Mode Row -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; background: #f8fafc; padding: 8px 12px; border-radius: 8px;">
        <span style="font-size: 12px; font-weight: 600; color: #475569;">भुगतान माध्यम:</span>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="qty-chip ${this.shopkeeperPaymentMode === 'cash' ? 'active' : ''}" onclick="window.lekhaApp.setShopkeeperPaymentMode('cash')">💵 नकद</button>
          <button type="button" class="qty-chip ${this.shopkeeperPaymentMode === 'upi' ? 'active' : ''}" onclick="window.lekhaApp.setShopkeeperPaymentMode('upi')">📱 UPI</button>
          <button type="button" class="qty-chip ${this.shopkeeperPaymentMode === 'khata' ? 'active' : ''}" onclick="window.lekhaApp.setShopkeeperPaymentMode('khata')">📒 खाता</button>
        </div>
      </div>

      <!-- Total & Confirm -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px dashed #cbd5e1; padding-top: 10px; margin-bottom: 12px;">
        <span style="font-size: 14px; font-weight: 700; color: #0f172a;">फाइनल बिल रकम:</span>
        <span style="font-size: 22px; font-weight: 800; color: #16a34a;">₹${Math.round(totalBill * 10) / 10}</span>
      </div>

      <button type="button" class="btn-primary" onclick="window.lekhaApp.confirmShopkeeperQrBill()" style="width: 100%; padding: 13px; font-size: 15px; font-weight: 700; justify-content: center;">
        ⚡ बिल पक्का करें & रसीद निकालें (Create Bill)
      </button>
    `;
  }

  toggleQrItemPacked(idx) {
    if (this.shopkeeperScannedItems[idx]) {
      this.shopkeeperScannedItems[idx].isPacked = !this.shopkeeperScannedItems[idx].isPacked;
      this.renderShopkeeperPackingChecklist();
    }
  }

  changeShopkeeperItemQty(idx, delta) {
    if (this.shopkeeperScannedItems[idx]) {
      let q = parseFloat(this.shopkeeperScannedItems[idx].editedQty) + delta;
      if (q <= 0) q = 0.25;
      this.shopkeeperScannedItems[idx].editedQty = Math.round(q * 100) / 100;
      this.renderShopkeeperPackingChecklist();
    }
  }

  updateShopkeeperItemQty(idx, val) {
    if (this.shopkeeperScannedItems[idx]) {
      let q = parseFloat(val) || 0.25;
      if (q <= 0) q = 0.25;
      this.shopkeeperScannedItems[idx].editedQty = Math.round(q * 100) / 100;
      this.renderShopkeeperPackingChecklist();
    }
  }

  updateShopkeeperItemRate(idx, val) {
    if (this.shopkeeperScannedItems[idx]) {
      let r = parseFloat(val) || 0;
      this.shopkeeperScannedItems[idx].editedRate = r;
      this.renderShopkeeperPackingChecklist();
    }
  }

  removeShopkeeperQrItem(idx) {
    this.shopkeeperScannedItems.splice(idx, 1);
    this.renderShopkeeperPackingChecklist();
  }

  addShopkeeperExtraItem() {
    const sel = document.getElementById('qrScanExtraSelect');
    if (!sel || !sel.value) return;
    const inv = this.inventory.find(i => i.id === sel.value);
    if (!inv) return;

    this.shopkeeperScannedItems.push({
      id: inv.id,
      name: inv.name,
      qty: 1,
      unit: inv.unit,
      customRate: inv.rate,
      isLoose: inv.isLoose,
      isPacked: true,
      editedQty: 1,
      editedRate: inv.rate
    });

    this.renderShopkeeperPackingChecklist();
  }

  setShopkeeperPaymentMode(mode) {
    this.shopkeeperPaymentMode = mode;
    this.renderShopkeeperPackingChecklist();
  }

  confirmShopkeeperQrBill() {
    if (!this.shopkeeperScannedItems || this.shopkeeperScannedItems.length === 0) {
      alert('बिल बनाने के लिए कम से कम 1 सामान होना चाहिए।');
      return;
    }

    let total = 0;
    const items = [];

    this.shopkeeperScannedItems.forEach(item => {
      const sub = Math.round(item.editedQty * item.editedRate * 10) / 10;
      total += sub;
      items.push({
        name: item.name,
        qty: item.editedQty,
        unit: item.unit,
        rate: item.editedRate,
        total: sub
      });

      // Deduct stock from inventory
      const inv = this.inventory.find(i => i.id === item.id);
      if (inv) {
        inv.stock = Math.max(0, parseFloat((inv.stock - item.editedQty).toFixed(2)));
        inv.lastSoldDays = 0;
      }
    });

    const custName = this.custOrderCustomerName || 'नगद ग्राहक';
    const custPhone = this.custOrderCustomerPhone ? ` (${this.custOrderCustomerPhone})` : '';
    const bill = {
      id: '#B' + (1000 + this.bills.length + 1),
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
      customer: `${custName}${custPhone}`,
      token: this.custOrderToken || '#ORD-LIVE',
      total: Math.round(total * 10) / 10,
      paymentMode: this.shopkeeperPaymentMode || 'cash',
      items: items
    };

    this.bills.unshift(bill);
    this.customerCart = []; // empty cart
    this.shopkeeperScannedItems = [];

    this.saveInventory();
    this.saveBills();
    this.saveCustomerCart();
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    // Close QR modal
    const qrModal = document.getElementById('qrScanModal');
    if (qrModal) qrModal.classList.remove('active');

    // Show thermal receipt
    this.showThermalReceipt(bill);
    this.showToast('🎉 QR बिल ' + bill.id + ' (₹' + bill.total + ') सफलतापूर्वक बन गया!', '🧾');
  }

  showThermalReceipt(bill) {
    if (!bill) return;

    const modal = document.getElementById('thermalReceiptModal');
    const contentEl = document.getElementById('thermalReceiptContent');
    const btnShare = document.getElementById('btnReceiptWhatsappShare');
    if (!modal || !contentEl) return;

    const itemsRows = bill.items.map(it => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
        <span style="flex: 1.8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${it.name}</span>
        <span style="flex: 1; text-align: right;">${it.qty} × ₹${it.rate}</span>
        <span style="flex: 1; text-align: right; font-weight: bold;">₹${it.total}</span>
      </div>
    `).join('');

    contentEl.innerHTML = `
      <div style="text-align: center; border-bottom: 1px dashed #94a3b8; padding-bottom: 8px; margin-bottom: 8px;">
        <div style="font-size: 16px; font-weight: 800; letter-spacing: 0.5px;">🏪 गुप्ता किराना स्टोर</div>
        <div style="font-size: 11px; color: #475569;">मेन मार्केट, विकास नगर • मो: 9871123456</div>
        <div style="font-size: 10.5px; color: #64748b; margin-top: 2px;">GST: 07AAAAA0000A1Z5 (Unregistered)</div>
      </div>

      <div style="font-size: 11px; border-bottom: 1px dashed #94a3b8; padding-bottom: 6px; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between;">
          <span>बिल क्र: <strong>${bill.id}</strong></span>
          <span>समय: ${bill.time}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 2px;">
          <span>ग्राहक: <strong>${bill.customer}</strong></span>
          <span>मोड: <strong>${(bill.paymentMode || 'cash').toUpperCase()}</strong></span>
        </div>
      </div>

      <div style="font-size: 11px; font-weight: 700; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between;">
        <span style="flex: 1.8;">सामान (Item)</span>
        <span style="flex: 1; text-align: right;">मात्रा×दर</span>
        <span style="flex: 1; text-align: right;">रकम ₹</span>
      </div>

      <div style="font-size: 12px; margin-bottom: 10px; border-bottom: 1px dashed #94a3b8; padding-bottom: 8px;">
        ${itemsRows}
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 900; color: #0f172a; margin-bottom: 4px;">
        <span>कुल रकम (Net Total):</span>
        <span style="color: #15803d;">₹${bill.total}</span>
      </div>

      <div style="font-size: 11px; color: #166534; text-align: center; margin: 8px 0; background: #f0fdf4; padding: 4px; border-radius: 4px;">
        🎉 आपने इस खरीदारी पर लगभग ₹${Math.round(bill.total * 0.08)} बचाए!
      </div>

      <div style="text-align: center; font-size: 11px; color: #64748b; margin-top: 10px; border-top: 1px dashed #cbd5e1; padding-top: 6px;">
        *** धन्यवाद! फिर पधारें ***<br>
        Powered by LEKHA Retail OS
      </div>
    `;

    if (btnShare) {
      btnShare.onclick = () => {
        const textItems = bill.items.map(it => `• ${it.name}: ${it.qty} × ₹${it.rate} = ₹${it.total}`).join('\n');
        const text = `*गुप्ता किराना स्टोर - पक्की रसीद*\n` +
          `बिल नं: ${bill.id} | समय: ${bill.time}\n` +
          `ग्राहक: ${bill.customer}\n` +
          `-------------------------\n` +
          textItems + `\n` +
          `-------------------------\n` +
          `*कुल रकम: ₹${bill.total}*\n` +
          `भुगतान: ${(bill.paymentMode || 'नकद').toUpperCase()}\n\n` +
          `धन्यवाद! फिर पधारें 🙏`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      };
    }

    modal.classList.add('active');
  }

  reprintBill(billId) {
    const bill = this.bills.find(b => b.id === billId);
    if (bill) {
      this.showThermalReceipt(bill);
    }
  }

  // --- Customer Portal Features ---
  renderCustomerPortal() {
    this.renderCustProductGrid();
    this.updateCustCartFloatingBar();
  }

  filterCustCategory(cat) {
    this.custCategoryFilter = cat;
    document.querySelectorAll('.cust-cat-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    this.renderCustProductGrid();
  }

  filterCustCatalog(query) {
    this.custSearchQuery = (query || '').toLowerCase().trim();
    this.renderCustProductGrid();
  }

  renderCustProductGrid() {
    const grid = document.getElementById('custProductGrid');
    if (!grid) return;

    let items = this.inventory;

    if (this.custCategoryFilter && this.custCategoryFilter !== 'all') {
      items = items.filter(i => i.category === this.custCategoryFilter);
    }

    if (this.custSearchQuery) {
      items = items.filter(i => 
        i.name.toLowerCase().includes(this.custSearchQuery) || 
        i.category.toLowerCase().includes(this.custSearchQuery)
      );
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 32px 16px; color: #64748b; background: #f8fafc; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
          <div style="font-weight: 700; color: #0f172a;">कोई सामान नहीं मिला</div>
          <div style="font-size: 12px; margin-top: 4px;">कृपया कोई दूसरा नाम या कैटेगरी चुनकर देखें।</div>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
      const cartItem = this.customerCart.find(c => c.id === item.id);
      const inCartQty = cartItem ? cartItem.qty : 0;
      const isInCart = inCartQty > 0;
      const svgArtwork = window.ProductAssets ? window.ProductAssets.getProductSvg(item) : '';
      const emoji = item.emoji || '📦';
      const imgSrc = item.img || '';

      return `
        <div class="cust-product-card ${isInCart ? 'in-cart' : ''}" onclick="window.lekhaApp.quickAddCustomerCart('${item.id}')">
          <div class="card-img-wrap">
            <span class="card-loose-badge">${item.isLoose ? 'खुला सामान' : 'पैकेट'}</span>
            ${isInCart ? `<span class="card-in-cart-tag">✓ ${inCartQty} ${item.unit}</span>` : ''}
            ${svgArtwork ? `
              <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; padding: 4px;">${svgArtwork}</div>
            ` : (imgSrc ? `
              <img src="${imgSrc}" alt="${item.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <span class="card-img-fallback" style="display:none;">${emoji}</span>
            ` : `
              <span class="card-img-fallback">${emoji}</span>
            `)}
          </div>

          <div class="card-title">${item.name}</div>

          <div class="card-rate-row">
            <div>
              <span class="card-price">₹${item.rate}</span>
              <span class="card-unit">/ ${item.unit}</span>
            </div>
            <span style="font-size: 10px; color: ${item.stock <= 4 ? '#ef4444' : '#16a34a'}; font-weight: 600;">
              ${item.stock <= 4 ? 'कम बचा' : 'स्टॉक में'}
            </span>
          </div>

          <button type="button" class="btn-add-cust-cart" onclick="event.stopPropagation(); window.lekhaApp.quickAddCustomerCart('${item.id}')">
            ${isInCart ? `✓ कार्ट में है (${inCartQty} ${item.unit})` : `+ कार्ट में जोड़ें`}
          </button>
        </div>
      `;
    }).join('');
  }

  quickAddCustomerCart(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    let cartItem = this.customerCart.find(c => c.id === item.id);
    const stepAdd = item.isLoose ? 1 : 1;

    if (cartItem) {
      cartItem.qty = Math.round((cartItem.qty + stepAdd) * 100) / 100;
    } else {
      this.customerCart.push({
        id: item.id,
        name: item.name,
        qty: stepAdd,
        unit: item.unit,
        customRate: item.rate,
        isLoose: item.isLoose,
        img: item.img,
        emoji: item.emoji
      });
    }

    this.saveCustomerCart();
    this.renderCustProductGrid();
    this.updateCustCartFloatingBar();

    if (navigator.vibrate) navigator.vibrate(30);
    this.showToast(`🛒 '${item.name}' कार्ट में जुड़ा!`, '✓');
  }

  updateCustCartFloatingBar() {
    const bar = document.getElementById('custFloatingCartBar');
    const badge = document.getElementById('custCartBadge');
    if (!bar) return;

    const count = this.customerCart.length;
    let total = 0;
    this.customerCart.forEach(c => total += (c.qty * c.customRate));
    total = Math.round(total * 10) / 10;

    if (badge) badge.textContent = count;

    if (count > 0 && this.currentCustomerStep === 1) {
      bar.style.display = 'flex';
      const itemsCountEl = document.getElementById('barItemsCount');
      const totalAmountEl = document.getElementById('barTotalAmount');
      if (itemsCountEl) itemsCountEl.textContent = `🛒 ${count} सामान (${this.customerCart.reduce((s, c) => s + c.qty, 0)} कुल मात्रा)`;
      if (totalAmountEl) totalAmountEl.textContent = '₹' + total + ' अनुमानित';
    } else {
      bar.style.display = 'none';
    }
  }

  switchCustomerStep(step) {
    if (step === 2 && this.customerCart.length === 0) {
      alert('कृपया पहले कैटलॉग से कोई सामान कार्ट में जोड़ें।');
      return;
    }

    this.currentCustomerStep = step;

    // Toggle Panels
    const p1 = document.getElementById('custCatalogView');
    const p2 = document.getElementById('custCartReviewView');
    const p3 = document.getElementById('custQrResultView');

    if (p1) p1.style.display = step === 1 ? 'block' : 'none';
    if (p2) p2.style.display = step === 2 ? 'block' : 'none';
    if (p3) p3.style.display = step === 3 ? 'block' : 'none';

    // Toggle Wizard Step active classes
    for (let i = 1; i <= 3; i++) {
      const stepEl = document.getElementById('wizardStep' + i);
      if (stepEl) stepEl.classList.toggle('active', i === step);
    }

    if (step === 1) {
      this.renderCustProductGrid();
      this.updateCustCartFloatingBar();
    } else if (step === 2) {
      this.renderCustCartReviewList();
      const bar = document.getElementById('custFloatingCartBar');
      if (bar) bar.style.display = 'none';
    } else if (step === 3) {
      const bar = document.getElementById('custFloatingCartBar');
      if (bar) bar.style.display = 'none';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderCustCartReviewList() {
    const listContainer = document.getElementById('custCartReviewList');
    const countEl = document.getElementById('custReviewItemCount');
    const sumItemsEl = document.getElementById('summaryTotalItems');
    const sumTotalEl = document.getElementById('summaryTotalAmount');

    if (!listContainer) return;

    if (this.customerCart.length === 0) {
      this.switchCustomerStep(1);
      return;
    }

    let total = 0;
    if (countEl) countEl.textContent = this.customerCart.length + ' सामान';
    if (sumItemsEl) sumItemsEl.textContent = this.customerCart.length + ' प्रकार के सामान';

    listContainer.innerHTML = this.customerCart.map((item, idx) => {
      const subtotal = Math.round(item.qty * item.customRate * 10) / 10;
      total += subtotal;
      const emoji = item.emoji || '📦';

      return `
        <div class="cust-review-item">
          ${item.img ? `
            <img src="${item.img}" alt="${item.name}" class="review-item-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="review-item-img" style="display:none; align-items:center; justify-content:center; font-size:26px;">${emoji}</div>
          ` : `
            <div class="review-item-img" style="display:flex; align-items:center; justify-content:center; font-size:26px;">${emoji}</div>
          `}

          <div class="review-item-details">
            <div class="review-item-title">${item.name}</div>
            <div class="review-item-rate">रेट: <strong>₹${item.customRate}</strong> / ${item.unit}</div>

            <!-- Quantity Stepper -->
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px;">
              <div class="qty-stepper-wrap">
                <button type="button" class="stepper-btn" onclick="window.lekhaApp.changeCustCartQty(${idx}, -(${item.isLoose ? 0.25 : 1}))">−</button>
                <input type="number" step="0.25" min="0.25" class="stepper-input" value="${item.qty}" onchange="window.lekhaApp.updateCustCartItemQty(${idx}, this.value)">
                <button type="button" class="stepper-btn" onclick="window.lekhaApp.changeCustCartQty(${idx}, +(${item.isLoose ? 0.25 : 1}))">+</button>
              </div>
              <span style="font-size: 11.5px; font-weight: 600; color: #475569;">${item.unit}</span>
            </div>

            <!-- Kirana Fast Chips for Loose / Packed Items -->
            <div class="cust-mini-chips">
              ${item.isLoose ? `
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 0.25)">250g</button>
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 0.5)">500g</button>
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 1.0)">1 kg</button>
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 2.0)">2 kg</button>
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 5.0)">5 kg</button>
              ` : `
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 1)">1 ${item.unit}</button>
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 2)">2 ${item.unit}</button>
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 5)">5 ${item.unit}</button>
                <button type="button" class="cust-mini-chip" onclick="window.lekhaApp.updateCustCartItemQty(${idx}, 10)">10 ${item.unit}</button>
              `}
            </div>
          </div>

          <div class="review-subtotal-box">
            <div class="review-subtotal-val">₹${subtotal}</div>
            <button type="button" class="btn-remove-item" onclick="window.lekhaApp.removeCustCartItem(${idx})" title="हटाएं">
              🗑️ हटाएं
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (sumTotalEl) sumTotalEl.textContent = '₹' + Math.round(total * 10) / 10;
  }

  updateCustCartItemQty(idx, val) {
    if (!this.customerCart[idx]) return;
    let qty = parseFloat(val) || 0.25;
    if (qty <= 0) qty = 0.25;
    this.customerCart[idx].qty = Math.round(qty * 100) / 100;
    this.saveCustomerCart();
    this.renderCustCartReviewList();
    this.updateCustCartFloatingBar();
  }

  changeCustCartQty(idx, delta) {
    if (!this.customerCart[idx]) return;
    let qty = parseFloat(this.customerCart[idx].qty) + delta;
    if (qty <= 0) qty = 0.25;
    this.customerCart[idx].qty = Math.round(qty * 100) / 100;
    this.saveCustomerCart();
    this.renderCustCartReviewList();
    this.updateCustCartFloatingBar();
  }

  removeCustCartItem(idx) {
    this.customerCart.splice(idx, 1);
    this.saveCustomerCart();
    if (this.customerCart.length === 0) {
      this.switchCustomerStep(1);
    } else {
      this.renderCustCartReviewList();
      this.updateCustCartFloatingBar();
    }
  }

  generateCustomerQr() {
    if (this.customerCart.length === 0) {
      alert('कार्ट में कोई सामान नहीं है।');
      return;
    }

    const nameInput = document.getElementById('custOrderName');
    const phoneInput = document.getElementById('custOrderPhone');
    const customerName = (nameInput && nameInput.value.trim()) || 'नगद ग्राहक';
    const customerPhone = (phoneInput && phoneInput.value.trim()) || '';

    this.custOrderToken = '#ORD-' + (Math.floor(100 + Math.random() * 900));
    this.custOrderCustomerName = customerName;
    this.custOrderCustomerPhone = customerPhone;

    let total = 0;
    const itemsPayload = this.customerCart.map(item => {
      const sub = Math.round(item.qty * item.customRate * 10) / 10;
      total += sub;
      return {
        id: item.id,
        name: item.name,
        qty: item.qty,
        unit: item.unit,
        rate: item.customRate,
        subtotal: sub
      };
    });

    total = Math.round(total * 10) / 10;

    const qrPayload = JSON.stringify({
      lekhaOrder: true,
      token: this.custOrderToken,
      customer: customerName,
      phone: customerPhone,
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }),
      total: total,
      items: itemsPayload
    });

    const qrContainer = document.getElementById('custQrCodeContainer');
    const tokenEl = document.getElementById('qrTicketToken');
    const totalEl = document.getElementById('qrTicketTotal');
    const previewEl = document.getElementById('qrTicketItemsPreview');

    if (tokenEl) tokenEl.textContent = this.custOrderToken;
    if (totalEl) totalEl.textContent = '₹' + total;

    if (previewEl) {
      previewEl.innerHTML = this.customerCart.map(i => `
        <div style="display: flex; justify-content: space-between; padding: 2px 0;">
          <span>• ${i.name} (${i.qty} ${i.unit})</span>
          <strong>₹${Math.round(i.qty * i.customRate * 10) / 10}</strong>
        </div>
      `).join('');
    }

    if (qrContainer && window.QRCodeLib) {
      const svg = window.QRCodeLib.generateSVG(qrPayload, 220);
      qrContainer.innerHTML = svg;
    }

    this.switchCustomerStep(3);
    this.showToast(`🎉 ऑर्डर ${this.custOrderToken} का QR कोड तैयार है!`, '📱');
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
            ${item.lastSoldDays >= 14 && item.stock > 0 ? `
              <button style="background:#ea580c; color:#fff; border:none; padding:4px 8px; border-radius:6px; font-size:11px; cursor:pointer;" onclick="document.querySelectorAll('.lekha-modal').forEach(m => m.classList.remove('active')); window.lekhaApp.openSwapModal('${item.id}')">
                🔄 3-4 KM में बेचें
              </button>
            ` : ''}
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

  // --- 🔄 3-4 KM Kirana Swap & Zero-Loss Liquidator Methods ---
  renderSwapView() {
    const stagnantItems = this.inventory.filter(i => (i.lastSoldDays >= 14 || i.isDeadStock) && i.stock > 0);
    const lockedCapital = stagnantItems.reduce((sum, it) => sum + (it.stock * (it.costPrice || Math.round(it.rate * 0.82))), 0);
    const recoveredAmount = this.swapTransfers.reduce((sum, t) => sum + t.recoveredAmount, 0);

    // Count direct matches
    let matchesCount = 0;
    this.nearbyShops.forEach(shop => {
      const hasMatch = stagnantItems.some(st => shop.neededItems && shop.neededItems.includes(st.id));
      if (hasMatch) matchesCount++;
    });

    const elLocked = document.getElementById('swapLockedCapital');
    const elMatches = document.getElementById('swapMatchingCount');
    const elRecovered = document.getElementById('swapRecoveredAmount');

    if (elLocked) elLocked.textContent = '₹' + Math.round(lockedCapital).toLocaleString('en-IN');
    if (elMatches) elMatches.textContent = matchesCount + ' दुकानें';
    if (elRecovered) elRecovered.textContent = '₹' + Math.round(recoveredAmount).toLocaleString('en-IN');

    // 1. Render Liquidate My Dead Stock
    const myDeadList = document.getElementById('swapMyDeadStockList');
    if (myDeadList) {
      if (stagnantItems.length === 0) {
        myDeadList.innerHTML = `
          <div style="text-align:center; padding:28px; background:#fff; border:1px solid #e2e8f0; border-radius:12px;">
            <div style="font-size:32px; margin-bottom:8px;">🎉</div>
            <div style="font-weight:700; color:#15803d; font-size:14px;">कोई डेड स्टॉक नहीं फंसा है!</div>
            <div style="font-size:12px; color:#64748b; margin-top:4px;">आपकी दुकान का सारा सामान नियमित रूप से बिक रहा है।</div>
          </div>
        `;
      } else {
        myDeadList.innerHTML = stagnantItems.map(item => {
          const cost = item.costPrice || Math.round(item.rate * 0.82);
          const totalVal = Math.round(item.stock * cost);
          
          // Check matching nearby shops
          const matchingShops = this.nearbyShops.filter(s => s.neededItems && s.neededItems.includes(item.id));
          const nearestShop = matchingShops.length > 0 ? matchingShops.sort((a,b) => a.distance - b.distance)[0] : null;

          return `
            <div class="swap-item-card is-urgent">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                  <div style="font-weight:700; font-size:14px; color:#0f172a;">${item.name}</div>
                  <div style="font-size:11px; color:#c2410c; font-weight:600; margin-top:2px;">
                    🧊 ${item.lastSoldDays} दिनों से नहीं बिका • फंसा स्टॉक: <strong>${item.stock} ${item.unit}</strong>
                  </div>
                </div>
                <div style="text-align:right;">
                  <span class="badge-pill" style="background:#ffedd5; color:#c2410c; font-weight:700;">फंसी पूंजी: ₹${totalVal}</span>
                </div>
              </div>

              <!-- Price comparison row -->
              <div style="display:flex; gap:14px; font-size:11.5px; background:#f8fafc; border:1px solid #e2e8f0; padding:8px 12px; border-radius:8px; margin-bottom:10px; flex-wrap:wrap;">
                <div>
                  <span style="color:#64748b;">थोक खरीद भाव:</span>
                  <strong style="color:#0f172a;"> ₹${cost}/${item.unit}</strong>
                </div>
                <div>
                  <span style="color:#64748b;">खुदरा रेट (MRP):</span>
                  <span style="text-decoration:line-through; color:#94a3b8;"> ₹${item.rate}</span>
                </div>
                <div>
                  <span style="color:#15803d; font-weight:600;">नो-लॉस ट्रांसफर रेट:</span>
                  <strong style="color:#15803d;"> ₹${cost}/${item.unit} (0% घाटा)</strong>
                </div>
              </div>

              ${nearestShop ? `
                <div class="match-callout">
                  <div>
                    <strong>🎯 सीधा मैच:</strong> ${nearestShop.name} (<span class="distance-badge">📍 ${nearestShop.distance} KM</span>) को तुरंत चाहिए!
                  </div>
                  <div style="font-size:11px; color:#15803d; font-weight:600;">मांग: ${nearestShop.note}</div>
                </div>
              ` : `
                <div style="font-size:11px; color:#64748b; margin-bottom:8px;">
                  📍 3-4 KM के दायरे की सभी 4 नजदीकी दुकानों पर यह ऑफर उपलब्ध है।
                </div>
              `}

              <div style="display:flex; gap:8px; margin-top:10px;">
                <button type="button" class="btn-primary" style="background:#ea580c; flex:2; justify-content:center; font-size:12px;" onclick="window.lekhaApp.openSwapModal('${item.id}')">
                  🤝 3-4 KM में बेचें (₹${totalVal} रिकवर करें)
                </button>
                <button type="button" class="btn-whatsapp" style="flex:1; justify-content:center; font-size:12px;" onclick="window.lekhaApp.shareSwapWhatsApp('${item.id}')">
                  📲 WhatsApp
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // 2. Render Nearby Surplus To Buy at Cost
    const nearbySurplusList = document.getElementById('swapNearbySurplusList');
    if (nearbySurplusList) {
      if (this.nearbySurplus.length === 0) {
        nearbySurplusList.innerHTML = `<div style="text-align:center; padding:20px; color:#64748b; font-size:12px;">अभी पड़ोस की दुकानों में कोई अतिरिक्त सरप्लस लिस्टेड नहीं है।</div>`;
      } else {
        nearbySurplusList.innerHTML = this.nearbySurplus.map(sur => `
          <div class="swap-item-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
              <div>
                <div style="font-weight:700; font-size:14px; color:#0f172a;">${sur.itemName}</div>
                <div style="font-size:11px; color:#2563eb; font-weight:600; margin-top:2px;">
                  🏬 दुकान: <strong>${sur.shopName}</strong>
                </div>
              </div>
              <span class="badge-pill badge-green">उपलब्ध: ${sur.availableQty} ${sur.unit}</span>
            </div>

            <div style="font-size:11.5px; color:#64748b; margin:6px 0;">
              ℹ️ <em>"${sur.reason}"</em>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; background:#eff6ff; border:1px solid #bfdbfe; padding:8px 12px; border-radius:8px; margin-bottom:10px;">
              <div>
                <span style="font-size:11px; color:#1e40af;">सीधे थोक भाव:</span>
                <span style="font-size:15px; font-weight:800; color:#1d4ed8;"> ₹${sur.wholesaleCost}/${sur.unit}</span>
                <span style="font-size:11px; color:#64748b; margin-left:6px;">(खुदरा MRP ₹${sur.retailRate})</span>
              </div>
              <span class="badge-pill badge-blue">सस्ता इमरजेंसी स्टॉक</span>
            </div>

            <button type="button" class="btn-accent" style="width:100%; justify-content:center; font-size:12px;" onclick="window.lekhaApp.buyNearbySurplus('${sur.id}')">
              🛒 थोक भाव पर स्वीकार करें (स्टॉक में जोड़ें)
            </button>
          </div>
        `).join('');
      }
    }

    // 3. Render Transfer History
    const historyList = document.getElementById('swapHistoryList');
    if (historyList) {
      if (this.swapTransfers.length === 0) {
        historyList.innerHTML = `<div style="text-align:center; padding:20px; color:#64748b; font-size:12px;">अभी कोई ट्रांसफर हिस्ट्री नहीं है। जब आप फंसा माल बेचेंगे तो उसका लेज़र यहाँ दिखेगा।</div>`;
      } else {
        historyList.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${this.swapTransfers.map(tr => `
              <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <div>
                  <div style="font-weight:700; font-size:13px; color:#0f172a;">${tr.itemName} (${tr.qty} ${tr.unit})</div>
                  <div style="font-size:11px; color:#64748b; margin-top:2px;">
                    🏬 प्राप्तकर्ता: <strong>${tr.targetShopName}</strong> (${tr.targetShopDistance} KM) • ${tr.time}
                  </div>
                </div>
                <div style="text-align:right;">
                  <div style="font-weight:800; color:#15803d; font-size:14px;">+₹${tr.recoveredAmount}</div>
                  <span class="badge-pill badge-green">100% नो-लॉस रिकवर</span>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
    }
  }

  openSwapModal(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    this.selectedSwapItem = item;
    const modal = document.getElementById('swapTransferModal');
    if (!modal) return;

    const cost = item.costPrice || Math.round(item.rate * 0.82);

    document.getElementById('swapModalItemTitle').textContent = item.name;
    document.getElementById('swapModalCostPrice').textContent = `₹${cost} / ${item.unit}`;
    document.getElementById('swapModalRetailPrice').textContent = `₹${item.rate} / ${item.unit}`;
    document.getElementById('swapModalTransferRate').textContent = `₹${cost} / ${item.unit} (0% घाटा)`;
    document.getElementById('swapModalAvailableStock').textContent = `दुकान में स्टॉक: ${item.stock} ${item.unit}`;

    const qtyInput = document.getElementById('swapTransferQty');
    if (qtyInput) {
      qtyInput.value = item.stock; // Default to liquidating full stuck stock
      qtyInput.max = item.stock;
    }

    // Populate nearby shops
    const shopListEl = document.getElementById('swapNearbyShopsSelection');
    if (shopListEl) {
      // Sort: shops with direct match first, then by distance
      const sortedShops = [...this.nearbyShops].sort((a, b) => {
        const aHas = a.neededItems && a.neededItems.includes(item.id) ? 1 : 0;
        const bHas = b.neededItems && b.neededItems.includes(item.id) ? 1 : 0;
        if (bHas !== aHas) return bHas - aHas;
        return a.distance - b.distance;
      });

      this.selectedTargetShopId = sortedShops[0].id;

      shopListEl.innerHTML = sortedShops.map((shop, idx) => {
        const isMatch = shop.neededItems && shop.neededItems.includes(item.id);
        const isSelected = idx === 0;

        return `
          <div class="shop-radio-option ${isSelected ? 'selected' : ''}" onclick="window.lekhaApp.selectSwapTargetShop('${shop.id}', this)">
            <div style="display:flex; align-items:center; gap:8px;">
              <input type="radio" name="swapTargetShopRadio" value="${shop.id}" ${isSelected ? 'checked' : ''} style="accent-color:#2563eb;">
              <div>
                <div style="font-weight:700; font-size:13px; color:#0f172a;">
                  ${shop.name}
                  ${isMatch ? `<span class="badge-pill badge-green" style="margin-left:4px; font-size:10px;">🎯 मांग उपलब्ध</span>` : ''}
                </div>
                <div style="font-size:11px; color:#64748b;">${shop.area} • 📞 ${shop.phone}</div>
              </div>
            </div>
            <span class="distance-badge">📍 ${shop.distance} KM</span>
          </div>
        `;
      }).join('');
    }

    this.recalcSwapModal();
    modal.classList.add('active');
  }

  selectSwapTargetShop(shopId, element) {
    this.selectedTargetShopId = shopId;
    document.querySelectorAll('.shop-radio-option').forEach(el => el.classList.remove('selected'));
    if (element) element.classList.add('selected');
    const radio = element ? element.querySelector('input[type="radio"]') : null;
    if (radio) radio.checked = true;
  }

  recalcSwapModal() {
    if (!this.selectedSwapItem) return;
    const item = this.selectedSwapItem;
    const cost = item.costPrice || Math.round(item.rate * 0.82);
    let qty = parseFloat(document.getElementById('swapTransferQty').value) || 0;

    if (qty > item.stock) {
      qty = item.stock;
      document.getElementById('swapTransferQty').value = qty;
    }

    const totalRecovery = Math.round(qty * cost * 10) / 10;
    const recEl = document.getElementById('swapModalTotalRecovery');
    if (recEl) recEl.textContent = `₹${totalRecovery}`;

    const btnConfirm = document.getElementById('btnConfirmSwapTransfer');
    if (btnConfirm) btnConfirm.textContent = `🤝 ट्रांसफर पक्का करें (₹${totalRecovery} रिकवर)`;
  }

  executeSwapTransfer() {
    if (!this.selectedSwapItem) return;
    const item = this.selectedSwapItem;
    const cost = item.costPrice || Math.round(item.rate * 0.82);
    const qty = parseFloat(document.getElementById('swapTransferQty').value) || 0;

    if (qty <= 0) {
      alert('कृपया ट्रांसफर के लिए सही मात्रा भरें।');
      return;
    }

    const targetShop = this.nearbyShops.find(s => s.id === this.selectedTargetShopId) || this.nearbyShops[0];
    const totalRecovery = Math.round(qty * cost * 10) / 10;

    // 1. Deduct stock from inventory
    item.stock = Math.max(0, parseFloat((item.stock - qty).toFixed(2)));
    if (item.stock === 0) {
      item.lastSoldDays = 0; // cleared out
    }
    this.saveInventory();

    // 2. Add to swap ledger
    const transferRecord = {
      id: 'TR-' + Date.now().toString().slice(-4),
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' }),
      itemId: item.id,
      itemName: item.name,
      qty: qty,
      unit: item.unit,
      costPrice: cost,
      recoveredAmount: totalRecovery,
      targetShopId: targetShop.id,
      targetShopName: targetShop.name,
      targetShopDistance: targetShop.distance
    };

    this.swapTransfers.unshift(transferRecord);
    this.saveSwapTransfers();

    // 3. Close modal & re-render
    document.querySelectorAll('.lekha-modal').forEach(m => m.classList.remove('active'));
    this.selectedSwapItem = null;
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    // 4. Success feedback
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);
    alert(`🎉 बधाई! ${item.name} (${qty} ${item.unit}) सफलतापूर्वक '${targetShop.name}' (${targetShop.distance} KM) को थोक भाव पर ट्रांसफर हो गया।\n\n💰 आपकी ₹${totalRecovery} की फंसी पूंजी 100% रिकवर हो गई (0% घाटा)!`);
  }

  shareSwapWhatsApp(itemId) {
    const item = this.inventory.find(i => i.id === itemId) || this.selectedSwapItem;
    if (!item) return;

    const cost = item.costPrice || Math.round(item.rate * 0.82);
    const targetShop = this.nearbyShops.find(s => s.id === this.selectedTargetShopId) || this.nearbyShops[0];

    const message = `*LEKHA - पास-पड़ोस किराना एक्सचेंज (Zero-Loss Transfer)*\n` +
      `नमस्ते ${targetShop.owner} जी (${targetShop.name}),\n\n` +
      `मेरे पास *${item.name}* का अतिरिक्त स्टॉक उपलब्ध है:\n` +
      `• उपलब्ध मात्रा: *${item.stock} ${item.unit}*\n` +
      `• थोक खरीद भाव (Wholesale Cost): *₹${cost}/${item.unit}* (MRP ₹${item.rate})\n` +
      `• कुल रकम: *₹${Math.round(item.stock * cost)}* (0% मुनाफा / नो-लॉस ट्रांसफर)\n\n` +
      `अगर आपकी दुकान के लिए चाहिए तो कृपया बताएं, मैं 3-4 KM के दायरे में हैंडओवर कर सकता हूँ।\n\n` +
      `- गुप्ता किराना स्टोर`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  }

  buyNearbySurplus(surplusId) {
    const sur = this.nearbySurplus.find(s => s.id === surplusId);
    if (!sur) return;

    if (!confirm(`क्या आप '${sur.shopName}' से '${sur.itemName}' (${sur.availableQty} ${sur.unit}) थोक भाव ₹${sur.wholesaleCost}/${sur.unit} पर लेना चाहते हैं?`)) {
      return;
    }

    // Add to inventory
    const invItem = this.inventory.find(i => i.id === sur.itemId || i.name.toLowerCase().includes(sur.itemName.toLowerCase()));
    if (invItem) {
      invItem.stock = parseFloat((invItem.stock + sur.availableQty).toFixed(2));
      invItem.lastSoldDays = 0;
      invItem.costPrice = sur.wholesaleCost;
    } else {
      this.inventory.push({
        id: 'item_' + Date.now(),
        name: sur.itemName,
        category: 'grains',
        stock: sur.availableQty,
        unit: sur.unit,
        rate: sur.retailRate,
        costPrice: sur.wholesaleCost,
        avgMarketRate: sur.retailRate,
        isLoose: false,
        lastSoldDays: 0,
        reorderQty: 10
      });
    }
    this.saveInventory();

    // Remove from surplus pool
    this.nearbySurplus = this.nearbySurplus.filter(s => s.id !== surplusId);
    this.saveNearbySurplus();

    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    alert(`✅ माल आपके स्टॉक में जुड़ गया! बिना बड़ा कार्टन खरीदे आपको थोक भाव ₹${sur.wholesaleCost}/${sur.unit} पर सामान मिल गया।`);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.lekhaApp = new LekhaApp();
});
