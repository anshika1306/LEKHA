/**
 * =======================================================
 * LEKHA (लेखा) - Enterprise Smart Kirana Retail OS
 * Master Application Controller & Multi-Page Engine
 * =======================================================
 */

// Initial Seed Inventory (Authentic Kirana stock items)
const DEFAULT_INVENTORY = [
  // Grains & Pulses (अनाज व दालें)
  { id: 'item_1', name: 'बासमती चावल (Basmati Rice)', category: 'grains', stock: 18.5, unit: 'kg', rate: 70, costPrice: 60, avgMarketRate: 68, isLoose: true, lastSoldDays: 1, reorderQty: 25 },
  { id: 'item_2', name: 'अरहर दाल (Toor Dal)', category: 'grains', stock: 3.5, unit: 'kg', rate: 145, costPrice: 126, avgMarketRate: 140, isLoose: true, lastSoldDays: 1, reorderQty: 20 },
  { id: 'item_3', name: 'सफेद चीनी (Sugar)', category: 'grains', stock: 24.0, unit: 'kg', rate: 44, costPrice: 38, avgMarketRate: 43, isLoose: true, lastSoldDays: 0, reorderQty: 50 },
  { id: 'item_4', name: 'आशीर्वाद आटा (Atta 5kg)', category: 'grains', stock: 8, unit: 'pkt', rate: 220, costPrice: 195, avgMarketRate: 220, isLoose: false, lastSoldDays: 2, reorderQty: 10 },
  { id: 'item_5', name: 'चना दाल (Chana Dal)', category: 'grains', stock: 2.0, unit: 'kg', rate: 82, costPrice: 70, avgMarketRate: 80, isLoose: true, lastSoldDays: 28, reorderQty: 15, isDeadStock: true },

  // Oils & Spices (तेल, घी व मसाले)
  { id: 'item_6', name: 'फॉर्च्यून सोयाबीन तेल 1L', category: 'oils', stock: 4, unit: 'pkt', rate: 135, costPrice: 120, avgMarketRate: 135, isLoose: false, lastSoldDays: 0, reorderQty: 15 },
  { id: 'item_7', name: 'सरसों तेल खुला (Mustard Oil)', category: 'oils', stock: 12.0, unit: 'L', rate: 150, costPrice: 134, avgMarketRate: 148, isLoose: true, lastSoldDays: 1, reorderQty: 30 },
  { id: 'item_8', name: 'एमडीएच हल्दी पाउडर 100g', category: 'oils', stock: 14, unit: 'pkt', rate: 36, costPrice: 30, avgMarketRate: 36, isLoose: false, lastSoldDays: 3, reorderQty: 20 },
  { id: 'item_9', name: 'टाटा नमक 1kg (Tata Salt)', category: 'oils', stock: 25, unit: 'pkt', rate: 28, costPrice: 23, avgMarketRate: 28, isLoose: false, lastSoldDays: 0, reorderQty: 30 },

  // Household & Soaps (साबुन व घरेलू सामान)
  { id: 'item_10', name: 'रिन डिटर्जेंट साबुन (Rin Bar)', category: 'household', stock: 3, unit: 'pc', rate: 20, costPrice: 16, avgMarketRate: 20, isLoose: false, lastSoldDays: 1, reorderQty: 24 },
  { id: 'item_11', name: 'सर्फ एक्सेल 500g (Surf Excel)', category: 'household', stock: 9, unit: 'pkt', rate: 75, costPrice: 64, avgMarketRate: 75, isLoose: false, lastSoldDays: 2, reorderQty: 12 },
  { id: 'item_12', name: 'कोलगेट टूथपेस्ट 100g', category: 'household', stock: 1, unit: 'pc', rate: 60, costPrice: 48, avgMarketRate: 60, isLoose: false, lastSoldDays: 35, reorderQty: 12, isDeadStock: true },

  // Snacks & Biscuits (स्नैक्स, नमकीन व बिस्कुट)
  { id: 'item_13', name: 'पार्ले-जी बिस्कुट (Parle-G 10/-)', category: 'snacks', stock: 28, unit: 'pkt', rate: 10, costPrice: 8.5, avgMarketRate: 10, isLoose: false, lastSoldDays: 0, reorderQty: 48 },
  { id: 'item_14', name: 'मैगी नूडल्स (Maggi 14/-)', category: 'snacks', stock: 5, unit: 'pkt', rate: 14, costPrice: 11.5, avgMarketRate: 14, isLoose: false, lastSoldDays: 0, reorderQty: 36 },
  { id: 'item_15', name: 'ताज महल चाय पत्ती 250g', category: 'snacks', stock: 7, unit: 'pkt', rate: 110, costPrice: 92, avgMarketRate: 110, isLoose: false, lastSoldDays: 2, reorderQty: 10 }
];

// Seed Khata Customers
const DEFAULT_KHATA_CUSTOMERS = [
  { id: 'c_1', name: 'रमेश शर्मा (Ramesh Ji)', phone: '9810123456', balance: 450, creditLimit: 2000, lastVisit: 'आज' },
  { id: 'c_2', name: 'सुमन दीदी (Suman Devi)', phone: '9871654321', balance: 1200, creditLimit: 3000, lastVisit: 'कल' },
  { id: 'c_3', name: 'अनीता वर्मा (Anita Verma)', phone: '9910987654', balance: 850, creditLimit: 1500, lastVisit: '3 दिन पहले' },
  { id: 'c_4', name: 'राजेश भाई (Rajesh Bhai)', phone: '9818112233', balance: 0, creditLimit: 2500, lastVisit: 'आज' },
  { id: 'c_5', name: 'विकास यादव (Vikas Yadav)', phone: '9711445566', balance: 1400, creditLimit: 2000, lastVisit: '5 दिन पहले' },
  { id: 'c_6', name: 'सुरेश मीणा (Suresh Meena)', phone: '9899332211', balance: 2500, creditLimit: 3000, lastVisit: '1 हफ्ता पहले' }
];

// Realistic Sample Handwritten Slips for AI OCR Studio
const SAMPLE_OCR_SLIPS = [
  {
    title: 'पर्ची #1 (रमेश जी)',
    items: [
      { name: 'बासमती चावल', matchedId: 'item_1', qty: 2, unit: 'kg', rate: 70, subtotal: 140 },
      { name: 'सफेद चीनी', matchedId: 'item_3', qty: 0.5, unit: 'kg', rate: 44, subtotal: 22 },
      { name: 'फॉर्च्यून तेल 1L', matchedId: 'item_6', qty: 1, unit: 'pkt', rate: 135, subtotal: 135 }
    ],
    total: 297
  },
  {
    title: 'पर्ची #2 (सुमन दीदी)',
    items: [
      { name: 'अरहर दाल', matchedId: 'item_2', qty: 1, unit: 'kg', rate: 145, subtotal: 145 },
      { name: 'मैगी नूडल्स', matchedId: 'item_14', qty: 2, unit: 'pkt', rate: 14, subtotal: 28 },
      { name: 'पार्ले-जी बिस्कुट', matchedId: 'item_13', qty: 3, unit: 'pkt', rate: 10, subtotal: 30 }
    ],
    total: 203
  },
  {
    title: 'पर्ची #3 (राजेश भाई)',
    items: [
      { name: 'आशीर्वाद आटा 5kg', matchedId: 'item_4', qty: 1, unit: 'pkt', rate: 220, subtotal: 220 },
      { name: 'एमडीएच हल्दी पाउडर', matchedId: 'item_8', qty: 1, unit: 'pkt', rate: 36, subtotal: 36 },
      { name: 'टाटा नमक 1kg', matchedId: 'item_9', qty: 1, unit: 'pkt', rate: 28, subtotal: 28 }
    ],
    total: 284
  }
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
    availableQty: 24,
    unit: 'pkt',
    wholesaleCost: 11.5,
    retailRate: 14,
    reason: 'अतिरिक्त 2 पेटी माल रखा है, कोई भी नजदीकी दुकानदार लागत भाव पर ले सकता है।'
  },
  {
    id: 'surplus_2',
    shopId: 'shop_3',
    shopName: 'शर्मा किराना स्टोर (2.1 KM)',
    itemId: 'item_8',
    itemName: 'एमडीएच हल्दी पाउडर 100g',
    availableQty: 10,
    unit: 'pkt',
    wholesaleCost: 30,
    retailRate: 36,
    reason: 'थोक बंडल में ज्यादा आ गया था, होलसेल रेट पर उपलब्ध।'
  },
  {
    id: 'surplus_3',
    shopId: 'shop_4',
    shopName: 'बालाजी सुपरमार्ट (3.4 KM)',
    itemId: 'item_3',
    itemName: 'सफेद चीनी (Sugar loose)',
    availableQty: 50,
    unit: 'kg',
    wholesaleCost: 38,
    retailRate: 44,
    reason: '50kg की अतिरिक्त बोरी मंडी भाव (₹38/kg) पर उपलब्ध।'
  }
];

class LekhaRetailApp {
  constructor() {
    window.lekhaApp = this;
    this.activePage = 'dashboard';
    this.currentRole = 'shopkeeper';
    this.isBackendOnline = false;

    // 3-4 KM Hyperlocal Stock Swap Network State
    this.nearbyShops = this.loadStorage('lekha_nearby_shops', DEFAULT_NEARBY_SHOPS);
    this.nearbySurplus = this.loadStorage('lekha_nearby_surplus', DEFAULT_NEARBY_SURPLUS);
    this.swapTransfers = this.loadStorage('lekha_swap_transfers', []);
    this.selectedSwapItem = null;
    this.selectedTargetShopId = null; // shopkeeper | customer | wholesaler
    this.inventory = this.loadStorage('lekha_inventory', DEFAULT_INVENTORY);
    this.khataCustomers = this.loadStorage('lekha_khata', DEFAULT_KHATA_CUSTOMERS);
    this.bills = this.loadStorage('lekha_bills', [
      { id: 'INV-4021', custName: 'रमेश शर्मा', time: '12:15 PM', total: 297, mode: 'UPI', itemsCount: 3 },
      { id: 'INV-4020', custName: 'सुमन देवी', time: '11:42 AM', total: 145, mode: 'CASH', itemsCount: 1 },
      { id: 'INV-4019', custName: 'राजेश भाई', time: '11:10 AM', total: 420, mode: 'KHATA', itemsCount: 4 },
      { id: 'INV-4018', custName: 'नगद ग्राहक', time: '10:30 AM', total: 88, mode: 'CASH', itemsCount: 2 }
    ]);
    
    // Active POS Billing State
    this.selectedCatalogItem = this.inventory[0];
    this.adjusterQty = 1;
    this.activeBillItems = [];
    this.paymentMode = 'cash';
    
    // Customer Kiosk Cart State
    this.customerCart = this.loadStorage('lekha_customer_cart', [
      { item: this.inventory[0], qty: 2 },
      { item: this.inventory[2], qty: 1 }
    ]);

    // Active OCR Slip
    this.currentOcrSlip = SAMPLE_OCR_SLIPS[0];

    // 3D Shelf Instance
    this.shelf3d = null;

    this.init();
    this.syncWithBackend();
  }

  // --- Storage Helper ---
  loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  async syncWithBackend() {
    try {
      const res = await fetch('/api/status', { cache: 'no-cache' });
      if (!res.ok) return;
      const status = await res.json();
      if (status && status.status === 'online') {
        this.isBackendOnline = true;
        const badge = document.getElementById('backendStatusBadge');
        if (badge) {
          const dot = badge.querySelector('.indicator-dot');
          if (dot) dot.style.background = '#22c55e';
          const txt = document.getElementById('backendStatusText') || badge.querySelector('span');
          if (txt) txt.textContent = 'REST API कनेक्टेड';
        }

        // Fetch Inventory
        try {
          const invRes = await fetch('/api/inventory');
          if (invRes.ok) {
            const invData = await invRes.json();
            if (Array.isArray(invData) && invData.length > 0) {
              this.inventory = invData;
              this.saveStorage('lekha_inventory', this.inventory);
            }
          }
        } catch (e) {}

        // Fetch Bills
        try {
          const billsRes = await fetch('/api/bills');
          if (billsRes.ok) {
            const billsData = await billsRes.json();
            if (Array.isArray(billsData) && billsData.length > 0) {
              this.bills = billsData;
              this.saveStorage('lekha_bills', this.bills);
            }
          }
        } catch (e) {}

        // Fetch Swap Network
        try {
          const swapRes = await fetch('/api/swap');
          if (swapRes.ok) {
            const swapData = await swapRes.json();
            if (swapData && swapData.nearbyShops) {
              this.nearbyShops = swapData.nearbyShops;
              this.saveStorage('lekha_nearby_shops', this.nearbyShops);
            }
            if (swapData && swapData.nearbySurplus) {
              this.nearbySurplus = swapData.nearbySurplus;
              this.saveStorage('lekha_nearby_surplus', this.nearbySurplus);
            }
            if (swapData && swapData.transfers) {
              this.swapTransfers = swapData.transfers;
              this.saveStorage('lekha_swap_transfers', this.swapTransfers);
            }
          }
        } catch (e) {}

        // Fetch Khata
        try {
          const khataRes = await fetch('/api/khata');
          if (khataRes.ok) {
            const khataData = await khataRes.json();
            if (Array.isArray(khataData) && khataData.length > 0) {
              this.khataCustomers = khataData;
              this.saveStorage('lekha_khata', this.khataCustomers);
            }
          }
        } catch (e) {}

        this.renderAll();
      }
    } catch (err) {
      console.log('Backend offline or running purely client-side');
    }
  }

  init() {
    // Current date format
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('hi-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const dateEl = document.getElementById('dashboardDateText');
    if (dateEl) dateEl.textContent = `${dateFormatted} | गुप्ता किराना स्टोर`;

    // Listen to hash changes for direct page routing
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['dashboard', 'billing', 'shelf', 'ocr', 'customer', 'khata', 'wholesaler', 'swap'].includes(hash)) {
        this.navigateTo(hash, false);
      }
    });

    // Keyboard Shortcuts (F1, F2, F3, F4, F9)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F1') { e.preventDefault(); this.navigateTo('dashboard'); }
      if (e.key === 'F2') { e.preventDefault(); this.navigateTo('billing'); }
      if (e.key === 'F3') { e.preventDefault(); this.navigateTo('ocr'); }
      if (e.key === 'F4') { e.preventDefault(); this.navigateTo('shelf'); }
      if (e.key === 'F9') { e.preventDefault(); this.completeAndPrintBill(); }
    });

    // Initial page load from hash if present
    const initHash = window.location.hash.replace('#', '');
    if (initHash && ['dashboard', 'billing', 'shelf', 'ocr', 'customer', 'khata', 'wholesaler', 'swap'].includes(initHash)) {
      this.activePage = initHash;
    }

    this.renderAll();
    this.navigateTo(this.activePage, false);
  }

  // =======================================================
  // MULTI-PAGE NAVIGATION ROUTER
  // =======================================================
  navigateTo(pageId, updateHash = true) {
    this.activePage = pageId;
    if (updateHash) {
      window.location.hash = pageId;
    }

    // Toggle active page view in DOM
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
    });
    const target = document.getElementById(`page-${pageId}`);
    if (target) target.classList.add('active');

    // Update Topbar Nav Tab Active State
    document.querySelectorAll('.nav-tab-item').forEach(tab => {
      if (tab.getAttribute('data-page') === pageId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Specialized page activations
    if (pageId === 'shelf') {
      setTimeout(() => this.initOrResize3DShelf(), 50);
    } else if (pageId === 'customer') {
      this.renderCustomerKiosk();
    } else if (pageId === 'ocr') {
      this.renderOcrExtractedTable();
    } else if (pageId === 'khata') {
      this.renderKhataCards();
    } else if (pageId === 'wholesaler') {
      this.renderReorderList();
    } else if (pageId === 'swap') {
      this.renderSwapView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  switchRole(role) {
    this.currentRole = role;
    if (role === 'customer') {
      this.navigateTo('customer');
      this.showToast('ग्राहक सेल्फ-सर्विस मोड चालू', '🛒');
    } else if (role === 'wholesaler') {
      this.navigateTo('wholesaler');
      this.showToast('थोक सप्लायर पोर्टल चालू', '📦');
    } else {
      this.navigateTo('billing');
      this.showToast('दुकानदार 1-हाथ बिलिंग काउंटर', '🏪');
    }
  }

  // =======================================================
  // RENDER ALL MASTER VIEWS
  // =======================================================
  renderAll() {
    this.updateDashboardMetrics();
    this.renderRecentBills();
    this.renderPosCatalog();
    this.updatePosAdjuster();
    this.renderPosActiveBill();
    this.renderKhataCards();
    this.renderReorderList();
    this.renderCustomerKiosk();
    this.renderSwapView();
  }

  // =======================================================
  // PAGE 1: DASHBOARD
  // =======================================================
  updateDashboardMetrics() {
    // Calculate total sales & count
    let totalSales = this.bills.reduce((sum, b) => sum + (b.total || 0), 0);
    const lowStock = this.inventory.filter(i => i.stock <= 5);
    const totalKhata = this.khataCustomers.reduce((sum, c) => sum + (c.balance || 0), 0);

    const sEl = document.getElementById('dashSalesValue');
    const bEl = document.getElementById('dashBillsValue');
    const lEl = document.getElementById('dashLowStockValue');
    const kEl = document.getElementById('dashKhataValue');
    const navLow = document.getElementById('navLowStockCount');
    const navKhata = document.getElementById('navKhataPendingCount');

    if (sEl) sEl.textContent = `₹${totalSales.toLocaleString('en-IN')}`;
    if (bEl) bEl.textContent = `${this.bills.length}`;
    if (lEl) lEl.textContent = `${lowStock.length}`;
    if (kEl) kEl.textContent = `₹${totalKhata.toLocaleString('en-IN')}`;
    if (navLow) navLow.textContent = `${lowStock.length}`;
    if (navKhata) navKhata.textContent = `${this.khataCustomers.filter(c => c.balance > 0).length}`;
  }

  renderRecentBills() {
    const list = document.getElementById('dashboardRecentBills');
    if (!list) return;

    if (this.bills.length === 0) {
      list.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">अभी कोई बिल नहीं बना है।</div>`;
      return;
    }

    list.innerHTML = this.bills.slice(0, 5).map(b => `
      <div class="bill-feed-item">
        <div class="bill-cust-info">
          <strong>${b.custName || 'नगद ग्राहक'} (${b.id})</strong>
          <span>${b.time} | ${b.itemsCount || 1} वस्तुएं</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="bill-amount-tag">
            <div class="amount">₹${b.total}</div>
            <div class="mode">${b.mode || 'CASH'}</div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.lekhaApp.reprintBill('${b.id}')">
            🧾 रसीद
          </button>
        </div>
      </div>
    `).join('');
  }

  // =======================================================
  // PAGE 2: ⚡ 1-HAND POS BILLING COUNTER
  // =======================================================
  renderPosCatalog(filteredItems = null) {
    const grid = document.getElementById('posProductCatalogGrid');
    if (!grid) return;

    const items = filteredItems || this.inventory;

    grid.innerHTML = items.map(item => {
      let stockClass = 'green';
      let stockText = `${item.stock} ${item.unit}`;
      if (item.stock <= 2) {
        stockClass = 'red';
        stockText = `केवल ${item.stock} ${item.unit}`;
      } else if (item.stock <= 5) {
        stockClass = 'yellow';
        stockText = `कम (${item.stock} ${item.unit})`;
      }

      const isSelected = this.selectedCatalogItem && this.selectedCatalogItem.id === item.id;

      return `
        <div class="product-item-card ${isSelected ? 'selected' : ''}" onclick="window.lekhaApp.selectCatalogItem('${item.id}')">
          <div class="product-card-top">
            <span class="item-category-tag">${item.category}</span>
            <span class="stock-indicator-pill ${stockClass}">${stockText}</span>
          </div>
          <h4>${item.name}</h4>
          <div class="product-card-bottom">
            <span class="product-rate">₹${item.rate} <small style="font-size:11px; color:var(--text-muted);">/${item.unit}</small></span>
            <span class="product-stock-left">${item.isLoose ? 'खुला तौल' : 'पैक्ड'}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  filterCatalog(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      this.renderPosCatalog();
      return;
    }
    const filtered = this.inventory.filter(i => 
      i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
    this.renderPosCatalog(filtered);
  }

  filterCategory(cat) {
    document.querySelectorAll('.cat-pill-btn').forEach(b => {
      if (b.getAttribute('data-cat') === cat) b.classList.add('active');
      else b.classList.remove('active');
    });

    if (cat === 'all') {
      this.renderPosCatalog();
    } else {
      const filtered = this.inventory.filter(i => i.category === cat);
      this.renderPosCatalog(filtered);
    }
  }

  selectCatalogItem(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;
    this.selectedCatalogItem = item;
    this.adjusterQty = item.isLoose ? 1 : 1;
    this.updatePosAdjuster();
    this.renderPosCatalog();
  }

  updatePosAdjuster() {
    if (!this.selectedCatalogItem) return;
    const nameEl = document.getElementById('posAdjusterItemName');
    const rateEl = document.getElementById('posAdjusterItemRate');
    const inputEl = document.getElementById('posAdjusterQtyInput');

    if (nameEl) nameEl.textContent = this.selectedCatalogItem.name;
    if (rateEl) rateEl.textContent = `₹${this.selectedCatalogItem.rate} / ${this.selectedCatalogItem.unit}`;
    if (inputEl) inputEl.value = this.adjusterQty;
  }

  setAdjusterQty(qty) {
    this.adjusterQty = qty;
    const input = document.getElementById('posAdjusterQtyInput');
    if (input) input.value = qty;

    // Highlight active chip
    document.querySelectorAll('.qty-preset-chip').forEach(chip => {
      chip.classList.remove('active');
    });
    if (event && event.target) event.target.classList.add('active');
  }

  stepQty(delta) {
    this.adjusterQty = Math.max(0.25, parseFloat((this.adjusterQty + delta).toFixed(2)));
    const input = document.getElementById('posAdjusterQtyInput');
    if (input) input.value = this.adjusterQty;
  }

  onManualQtyChange(val) {
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      this.adjusterQty = parsed;
    }
  }

  addItemToActiveBill() {
    if (!this.selectedCatalogItem) return;

    if (this.selectedCatalogItem.stock < this.adjusterQty) {
      this.showToast(`स्टॉक में केवल ${this.selectedCatalogItem.stock} ${this.selectedCatalogItem.unit} उपलब्ध है!`, '⚠️');
      return;
    }

    const subtotal = Math.round(this.selectedCatalogItem.rate * this.adjusterQty);

    // Check if already in bill
    const existing = this.activeBillItems.find(i => i.item.id === this.selectedCatalogItem.id);
    if (existing) {
      existing.qty = parseFloat((existing.qty + this.adjusterQty).toFixed(2));
      existing.subtotal = Math.round(existing.item.rate * existing.qty);
    } else {
      this.activeBillItems.push({
        item: this.selectedCatalogItem,
        qty: this.adjusterQty,
        subtotal: subtotal
      });
    }

    this.renderPosActiveBill();
    this.showToast(`${this.selectedCatalogItem.name} जोड़ा गया (₹${subtotal})`, '⚡');
  }

  renderPosActiveBill() {
    const list = document.getElementById('posActiveBillItemsList');
    const totalEl = document.getElementById('posGrandTotalAmount');
    if (!list || !totalEl) return;

    if (this.activeBillItems.length === 0) {
      list.innerHTML = `<div style="text-align:center; padding:18px; color:var(--text-muted); font-size:12px;">बिल खाली है। बाईं तरफ से सामान चुनें।</div>`;
      totalEl.textContent = '₹0';
      return;
    }

    let grandTotal = 0;
    list.innerHTML = this.activeBillItems.map((entry, idx) => {
      grandTotal += entry.subtotal;
      return `
        <div class="bill-item-row">
          <div class="bill-item-meta">
            <strong>${entry.item.name}</strong>
            <span>${entry.qty} ${entry.item.unit} × ₹${entry.item.rate}</span>
          </div>
          <div class="bill-item-calc">
            <span class="item-total">₹${entry.subtotal}</span>
            <button type="button" class="btn-remove-item" onclick="window.lekhaApp.removeBillItem(${idx})">✕</button>
          </div>
        </div>
      `;
    }).join('');

    totalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  }

  removeBillItem(index) {
    this.activeBillItems.splice(index, 1);
    this.renderPosActiveBill();
  }

  setPaymentMode(mode) {
    this.paymentMode = mode;
    document.querySelectorAll('.pay-mode-btn').forEach(btn => {
      if (btn.getAttribute('data-mode') === mode) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  completeAndPrintBill() {
    if (this.activeBillItems.length === 0) {
      this.showToast('बिल में कम से कम 1 सामान होना चाहिए!', '⚠️');
      return;
    }

    const custName = document.getElementById('posCustomerNameInput').value.trim() || 'नगद ग्राहक';
    const custPhone = document.getElementById('posCustomerPhoneInput').value.trim() || '';
    const grandTotal = this.activeBillItems.reduce((sum, i) => sum + i.subtotal, 0);

    // Deduct stock from inventory
    this.activeBillItems.forEach(entry => {
      const match = this.inventory.find(i => i.id === entry.item.id);
      if (match) {
        match.stock = Math.max(0, parseFloat((match.stock - entry.qty).toFixed(2)));
        match.lastSoldDays = 0;
      }
    });
    this.saveStorage('lekha_inventory', this.inventory);

    // Save invoice
    const invId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const newBill = {
      id: invId,
      custName: custName,
      custPhone: custPhone,
      time: timeStr,
      total: grandTotal,
      mode: this.paymentMode.toUpperCase(),
      items: [...this.activeBillItems],
      itemsCount: this.activeBillItems.length
    };

    this.bills.unshift(newBill);
    this.saveStorage('lekha_bills', this.bills);

    if (this.isBackendOnline) {
      fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBill)
      }).catch(e => console.log('Bill sync error:', e));
    }

    // If Khata mode, add to customer balance
    if (this.paymentMode === 'khata') {
      let khataCust = this.khataCustomers.find(c => c.name.includes(custName) || (custPhone && c.phone === custPhone));
      if (khataCust) {
        khataCust.balance += grandTotal;
        khataCust.lastVisit = 'आज';
      } else {
        this.khataCustomers.push({
          id: `c_${Date.now()}`,
          name: custName,
          phone: custPhone || '98XXXXXXXX',
          balance: grandTotal,
          creditLimit: 2000,
          lastVisit: 'आज'
        });
      }
      this.saveStorage('lekha_khata', this.khataCustomers);

      if (this.isBackendOnline) {
        fetch('/api/khata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.khataCustomers)
        }).catch(e => console.log('Khata sync error:', e));
      }
    }

    // Render Printable Thermal Receipt
    this.renderThermalReceipt(newBill);

    // Reset current active bill
    this.activeBillItems = [];
    document.getElementById('posCustomerNameInput').value = '';
    document.getElementById('posCustomerPhoneInput').value = '';
    this.renderPosActiveBill();
    this.renderAll();

    this.showToast(`बिल ${invId} पूरा हुआ! ₹${grandTotal}`, '🧾');
  }

  renderThermalReceipt(bill) {
    const paper = document.getElementById('receiptPaperContent');
    if (!paper) return;

    paper.innerHTML = `
      <div class="receipt-header">
        <h3>🏪 गुप्ता किराना स्टोर</h3>
        <p>मेन मार्केट, दुकान नं 14, दिल्ली-110001</p>
        <p>GSTIN: 07AAAAA0000A1Z5 | Mob: 98101XXXXX</p>
        <p style="margin-top:6px; font-weight:700;">इनवॉइस #${bill.id} | ${bill.time}</p>
        <p>ग्राहक: ${bill.custName} ${bill.custPhone ? `(${bill.custPhone})` : ''}</p>
      </div>

      <table class="receipt-table">
        <thead>
          <tr>
            <th>वस्तु विवरण</th>
            <th>मात्रा</th>
            <th>दर</th>
            <th style="text-align:right;">रकम</th>
          </tr>
        </thead>
        <tbody>
          ${(bill.items || []).map(it => `
            <tr>
              <td>${it.item.name}</td>
              <td>${it.qty} ${it.item.unit}</td>
              <td>₹${it.item.rate}</td>
              <td style="text-align:right;">₹${it.subtotal}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="receipt-total-row">
        <span>कुल भुगतान (${bill.mode})</span>
        <span>₹${bill.total}</span>
      </div>

      <div class="receipt-footer">
        <p>||| || ||||| |||| ||| ||||| |||</p>
        <p>🙏 धन्यवाद! फिर पधारें! 🙏</p>
        <p style="font-size:10px;">Powered by LEKHA Retail OS</p>
      </div>
    `;

    document.getElementById('thermalReceiptModal').classList.add('active');
  }

  reprintBill(billId) {
    const bill = this.bills.find(b => b.id === billId);
    if (!bill) return;
    this.renderThermalReceipt(bill);
  }

  printThermalReceipt() {
    window.print();
  }

  sendReceiptWhatsapp() {
    this.showToast('रसीद WhatsApp पर भेज दी गई!', '💬');
    this.closeModal('thermalReceiptModal');
  }

  // =======================================================
  // PAGE 3: 📦 3D SMART STORE SHELVES
  // =======================================================
  initOrResize3DShelf() {
    if (!this.shelf3d && window.StoreShelf3D) {
      this.shelf3d = new window.StoreShelf3D(
        'shelfCanvas',
        () => this.inventory,
        (rack) => this.showRackDetails(rack)
      );
    } else if (this.shelf3d) {
      this.shelf3d.render();
    }

    if (this.shelf3d && this.shelf3d.racks) {
      this.showRackDetails(this.shelf3d.racks[this.shelf3d.selectedRackIndex || 0]);
    }
  }

  showRackDetails(rack) {
    const title = document.getElementById('shelfInspectTitle');
    const list = document.getElementById('shelfInspectItemsList');
    if (!title || !list) return;

    title.textContent = rack.name;
    const items = this.inventory.filter(i => i.category === rack.category);

    list.innerHTML = items.map(item => {
      let bClass = 'green';
      let status = 'स्टॉक पर्याप्त';
      if (item.stock <= 2) { bClass = 'red'; status = 'खत्म!'; }
      else if (item.stock <= 5) { bClass = 'yellow'; status = 'कम बचा'; }

      return `
        <div class="rack-stock-item">
          <div class="name-stock">
            <strong>${item.name}</strong>
            <span>वर्तमान स्टॉक: ${item.stock} ${item.unit} | ₹${item.rate}</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="stock-indicator-pill ${bClass}">${status}</span>
            <button type="button" class="btn btn-primary btn-sm" onclick="window.lekhaApp.refillItemStock('${item.id}', 10)">
              +10 भरें
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  refillItemStock(itemId, amount) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;
    item.stock = parseFloat((item.stock + amount).toFixed(2));
    this.saveStorage('lekha_inventory', this.inventory);
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();
    if (this.shelf3d && this.shelf3d.racks) {
      this.showRackDetails(this.shelf3d.racks[this.shelf3d.selectedRackIndex || 0]);
    }
    this.showToast(`${item.name} में +${amount} स्टॉक भरा गया!`, '📦');
  }

  refillAllLowStock() {
    this.inventory.forEach(item => {
      if (item.stock <= 5) {
        item.stock = parseFloat((item.stock + item.reorderQty).toFixed(2));
      }
    });
    this.saveStorage('lekha_inventory', this.inventory);
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();
    this.showToast('सभी कम स्टॉक वाले सामान को +रीऑर्डर भर दिया गया!', '📦');
  }

  // =======================================================
  // PAGE 4: 📸 AI HANDWRITTEN SLIP SCANNER
  // =======================================================
  loadSampleSlip(index) {
    this.currentOcrSlip = SAMPLE_OCR_SLIPS[index];
    
    // Highlight button
    document.querySelectorAll('.sample-slip-btn').forEach((b, idx) => {
      if (idx === index) b.classList.add('active');
      else b.classList.remove('active');
    });

    const heading = document.getElementById('ocrStatusHeading');
    const sub = document.getElementById('ocrStatusSub');
    if (heading) heading.textContent = `${this.currentOcrSlip.title} स्कैन हुई!`;
    if (sub) sub.textContent = '3 वस्तुओं को 98.4% एक्यूरेसी से पहचाना गया';

    this.renderOcrExtractedTable();
    this.showToast(`${this.currentOcrSlip.title} लोड हुई!`, '📸');
  }

  renderOcrExtractedTable() {
    const tbody = document.getElementById('ocrExtractedItemsBody');
    const totalEl = document.getElementById('ocrTotalAmount');
    if (!tbody || !this.currentOcrSlip) return;

    tbody.innerHTML = this.currentOcrSlip.items.map(it => `
      <tr>
        <td><strong>${it.name}</strong></td>
        <td>${it.qty} ${it.unit}</td>
        <td>₹${it.rate}</td>
        <td style="color:#34d399; font-weight:700;">₹${it.subtotal}</td>
      </tr>
    `).join('');

    if (totalEl) totalEl.textContent = `₹${this.currentOcrSlip.total}`;
  }

  transferOcrToPosBill() {
    if (!this.currentOcrSlip) return;

    // Load each item into active bill
    this.currentOcrSlip.items.forEach(it => {
      const match = this.inventory.find(i => i.id === it.matchedId) || this.inventory[0];
      this.activeBillItems.push({
        item: match,
        qty: it.qty,
        subtotal: it.subtotal
      });
    });

    this.renderPosActiveBill();
    this.navigateTo('billing');
    this.showToast('पर्ची का सामान POS बिलिंग काउंटर में लोड हो गया!', '⚡');
  }

  // =======================================================
  // PAGE 5: 🛒 CUSTOMER QR SELF-SERVICE KIOSK
  // =======================================================
  renderCustomerKiosk() {
    const grid = document.getElementById('customerKioskProductGrid');
    const list = document.getElementById('customerCartItemsList');
    const totalEl = document.getElementById('customerCartTotal');
    const qrBox = document.getElementById('customerQrContainer');

    if (!grid || !list || !qrBox) return;

    // Render simple product tiles
    grid.innerHTML = this.inventory.slice(0, 8).map(item => `
      <div class="product-item-card" style="padding:10px; cursor:pointer;" onclick="window.lekhaApp.addCustomerCartItem('${item.id}')">
        <h4 style="font-size:12px; margin-bottom:4px;">${item.name}</h4>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="color:#34d399; font-size:13px;">₹${item.rate}</strong>
          <span class="btn btn-primary btn-sm" style="padding:2px 8px; font-size:11px;">+ झोले में</span>
        </div>
      </div>
    `).join('');

    // Render cart items
    let cartTotal = 0;
    if (this.customerCart.length === 0) {
      list.innerHTML = `<div style="text-align:center; padding:12px; color:var(--text-muted); font-size:12px;">झोला खाली है। ऊपर से सामान चुनें।</div>`;
    } else {
      list.innerHTML = this.customerCart.map((c, idx) => {
        const sub = Math.round(c.item.rate * c.qty);
        cartTotal += sub;
        return `
          <div class="bill-item-row" style="padding:8px 10px;">
            <div class="bill-item-meta">
              <strong>${c.item.name}</strong>
              <span>${c.qty} ${c.item.unit} × ₹${c.item.rate}</span>
            </div>
            <div class="bill-item-calc">
              <span class="item-total">₹${sub}</span>
              <button type="button" class="btn-remove-item" onclick="window.lekhaApp.removeCustomerCartItem(${idx})">✕</button>
            </div>
          </div>
        `;
      }).join('');
    }

    if (totalEl) totalEl.textContent = `₹${cartTotal}`;

    // Generate dynamic QR
    if (window.QRCodeLib) {
      const payload = JSON.stringify({
        app: 'LEKHA',
        cust: 'स्वयं-सेवा ग्राहक',
        items: this.customerCart.map(c => ({ id: c.item.id, name: c.item.name, qty: c.qty, rate: c.item.rate })),
        total: cartTotal
      });
      qrBox.innerHTML = window.QRCodeLib.generateSVG(payload, 220);
    }
  }

  addCustomerCartItem(itemId) {
    const item = this.inventory.find(i => i.id === itemId);
    if (!item) return;

    const exist = this.customerCart.find(c => c.item.id === item.id);
    if (exist) {
      exist.qty += 1;
    } else {
      this.customerCart.push({ item: item, qty: 1 });
    }
    this.saveStorage('lekha_customer_cart', this.customerCart);
    this.renderCustomerKiosk();
    this.showToast(`${item.name} झोले में जोड़ा गया!`, '🛍️');
  }

  removeCustomerCartItem(idx) {
    this.customerCart.splice(idx, 1);
    this.saveStorage('lekha_customer_cart', this.customerCart);
    this.renderCustomerKiosk();
  }

  simulateShopkeeperScan() {
    if (this.customerCart.length === 0) {
      this.showToast('पहले झोले में सामान डालें!', '⚠️');
      return;
    }

    // Transfer customer cart to POS Active Bill
    this.activeBillItems = this.customerCart.map(c => ({
      item: c.item,
      qty: c.qty,
      subtotal: Math.round(c.item.rate * c.qty)
    }));

    document.getElementById('posCustomerNameInput').value = 'QR ग्राहक';
    this.renderPosActiveBill();
    this.navigateTo('billing');
    this.showToast('दुकानदार ने QR स्कैन किया! बिल 1 सेकंड में लोड हो गया!', '📱');
  }

  // =======================================================
  // PAGE 6: 📒 DIGITAL BAHI KHATA & UDHAAR LEDGER
  // =======================================================
  renderKhataCards() {
    const grid = document.getElementById('khataCustomersGrid');
    if (!grid) return;

    grid.innerHTML = this.khataCustomers.map(cust => {
      const isCleared = cust.balance === 0;

      return `
        <div class="khata-card">
          <div class="khata-card-header">
            <h4>${cust.name}</h4>
            <span>अंतिम विजिट: ${cust.lastVisit}</span>
          </div>

          <div class="khata-balance-row">
            <div>
              <span style="font-size:11px; color:var(--text-muted); display:block;">कुल बकाया उधार:</span>
              <span class="amount ${isCleared ? 'cleared' : ''}">₹${cust.balance.toLocaleString('en-IN')}</span>
            </div>
            <span class="stock-indicator-pill ${isCleared ? 'green' : 'red'}">
              ${isCleared ? 'हिसाब चुकता' : `क्रेडिट लिमिट: ₹${cust.creditLimit}`}
            </span>
          </div>

          <div class="khata-actions-row">
            <button type="button" class="btn btn-secondary btn-sm" style="flex:1;" onclick="window.lekhaApp.recordKhataPayment('${cust.id}')">
              💵 जमा (Paid)
            </button>
            <button type="button" class="btn btn-success btn-sm" style="flex:1.2;" onclick="window.lekhaApp.sendKhataWhatsappReminder('${cust.id}')">
              💬 WhatsApp तगादा
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  recordKhataPayment(custId) {
    const cust = this.khataCustomers.find(c => c.id === custId);
    if (!cust) return;

    if (cust.balance === 0) {
      this.showToast(`${cust.name} का कोई बकाया नहीं है।`, '✅');
      return;
    }

    const amt = prompt(`${cust.name} द्वारा जमा की गई रकम दर्ज करें (वर्तमान बकाया: ₹${cust.balance}):`, cust.balance);
    const num = parseFloat(amt);
    if (!isNaN(num) && num > 0) {
      cust.balance = Math.max(0, cust.balance - num);
      cust.lastVisit = 'आज';
      this.saveStorage('lekha_khata', this.khataCustomers);
      if (this.isBackendOnline) {
        fetch('/api/khata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.khataCustomers)
        }).catch(e => console.log('Khata sync error:', e));
      }
      this.renderAll();
      this.showToast(`₹${num} जमा हुआ! नया बकाया: ₹${cust.balance}`, '💰');
    }
  }

  sendKhataWhatsappReminder(custId) {
    const cust = this.khataCustomers.find(c => c.id === custId);
    if (!cust) return;

    const text = `नमस्ते ${cust.name} जी! गुप्ता किराना स्टोर से आपका कुल पुराना हिसाब ₹${cust.balance} बकाया है। कृपया सुविधानुसार UPI या दुकान पर जमा करवा दें। धन्यवाद! 🙏`;

    navigator.clipboard.writeText(text).then(() => {
      this.showToast(`WhatsApp तगादा कॉपी हो गया! (${cust.name})`, '💬');
    }).catch(() => {
      this.showToast(`तगादा तैयार: ₹${cust.balance}`, '💬');
    });
  }

  openNewKhataCustomerModal() {
    document.getElementById('newKhataModal').classList.add('active');
  }

  saveNewKhataCustomer() {
    const name = document.getElementById('newKhataName').value.trim();
    const phone = document.getElementById('newKhataPhone').value.trim();
    const amount = parseFloat(document.getElementById('newKhataAmount').value) || 0;

    if (!name) {
      this.showToast('कृपया ग्राहक का नाम दर्ज करें', '⚠️');
      return;
    }

    this.khataCustomers.push({
      id: `c_${Date.now()}`,
      name: name,
      phone: phone || '98XXXXXXXX',
      balance: amount,
      creditLimit: 3000,
      lastVisit: 'आज'
    });

    this.saveStorage('lekha_khata', this.khataCustomers);
    if (this.isBackendOnline) {
      fetch('/api/khata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.khataCustomers)
      }).catch(e => console.log('Khata sync error:', e));
    }
    this.closeModal('newKhataModal');
    this.renderAll();
    this.showToast(`${name} बहीखाते में जुड़ गए!`, '📒');
  }

  // =======================================================
  // PAGE 7: 🚚 WHOLESALER PORTAL & REORDER LIST
  // =======================================================
  renderReorderList() {
    const list = document.getElementById('reorderItemsList');
    const badge = document.getElementById('reorderItemsCountBadge');
    if (!list) return;

    const lowItems = this.inventory.filter(i => i.stock <= 5);
    if (badge) badge.textContent = `${lowItems.length} सामान कम`;

    if (lowItems.length === 0) {
      list.innerHTML = `<div style="text-align:center; padding:18px; color:#34d399;">सभी सामान का स्टॉक पर्याप्त है! कोई रीऑर्डर जरूरी नहीं।</div>`;
      return;
    }

    list.innerHTML = lowItems.map(item => `
      <div class="reorder-item-row">
        <div>
          <strong style="font-size:13px; color:#fff; display:block;">${item.name}</strong>
          <span style="font-size:11px; color:#f87171;">बचा स्टॉक: केवल ${item.stock} ${item.unit}</span>
          ${item.lastSoldDays > 25 ? '<span class="stock-indicator-pill yellow" style="margin-left:6px;">धीमी गति</span>' : ''}
        </div>
        <div style="text-align:right;">
          <div style="font-size:13px; font-weight:700; color:#60a5fa;">रीऑर्डर: +${item.reorderQty} ${item.unit}</div>
          <span style="font-size:10px; color:var(--text-muted);">थोक दर: ₹${item.avgMarketRate}</span>
        </div>
      </div>
    `).join('');
  }

  copyWhatsappReorderText() {
    const lowItems = this.inventory.filter(i => i.stock <= 5);
    if (lowItems.length === 0) {
      this.showToast('स्टॉक पूरा है, रीऑर्डर की जरूरत नहीं!', '✅');
      return;
    }

    let text = `*📦 थोक सप्लायर ऑर्डर (गुप्ता किराना स्टोर)*\n`;
    text += `तारीख: ${new Date().toLocaleDateString('hi-IN')}\n\n`;
    lowItems.forEach((it, idx) => {
      text += `${idx + 1}. ${it.name} - ${it.reorderQty} ${it.unit}\n`;
    });
    text += `\nकृपया माल आज ही डिस्पैच करवाएं। धन्यवाद!`;

    navigator.clipboard.writeText(text).then(() => {
      this.showToast('WhatsApp रीऑर्डर टेक्स्ट कॉपी हो गया!', '💬');
    }).catch(() => {
      this.showToast('रीऑर्डर तैयार हो गया!', '💬');
    });
  }

  dispatchWholesalerSupply() {
    this.inventory.forEach(item => {
      if (item.stock <= 5) {
        item.stock = parseFloat((item.stock + item.reorderQty).toFixed(2));
      }
    });
    this.saveStorage('lekha_inventory', this.inventory);
    if (this.isBackendOnline) {
      fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.inventory)
      }).catch(e => console.log('Inventory sync error:', e));
    }
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();
    this.showToast('थोक व्यापारी ने माल डिस्पैच किया! स्टॉक तुरंत रीफिल हुआ!', '🚚');
  }

  // =======================================================
  // UI HELPERS & MODALS
  // =======================================================
  closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
  }

  showToast(msg, icon = '🔔') {
    const container = document.getElementById('appToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // ==========================================
  // 🔄 3-4 KM HYPERLOCAL KIRANA SWAP NETWORK
  // ==========================================
  switchSwapTab(tabName) {
    document.querySelectorAll('.swap-pill-btn').forEach(btn => {
      if (btn.getAttribute('data-swaptab') === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const panels = {
      liquidate: document.getElementById('swapTabLiquidate'),
      surplus: document.getElementById('swapTabSurplus'),
      history: document.getElementById('swapTabHistory')
    };

    Object.keys(panels).forEach(key => {
      const panel = panels[key];
      if (panel) {
        if (key === tabName) {
          panel.style.display = 'block';
          panel.classList.add('active');
        } else {
          panel.style.display = 'none';
          panel.classList.remove('active');
        }
      }
    });
  }

  renderSwapView() {
    const stagnantItems = this.inventory.filter(i => (i.lastSoldDays >= 14 || i.isDeadStock) && i.stock > 0);
    const lockedCapital = stagnantItems.reduce((sum, it) => sum + (it.stock * (it.costPrice || Math.round(it.rate * 0.82))), 0);
    const recoveredAmount = this.swapTransfers.reduce((sum, t) => sum + (t.recoveredAmount || 0), 0);

    const matchingShopsCount = this.nearbyShops.filter(shop => {
      return stagnantItems.some(st => shop.neededItems && shop.neededItems.includes(st.id));
    }).length;

    const elLocked = document.getElementById('swapLockedCapital');
    if (elLocked) elLocked.textContent = '₹' + Math.round(lockedCapital).toLocaleString('en-IN');

    const elMatches = document.getElementById('swapMatchingCount');
    if (elMatches) elMatches.textContent = matchingShopsCount + ' दुकानें';

    const elRecovered = document.getElementById('swapRecoveredAmount');
    if (elRecovered) elRecovered.textContent = '₹' + Math.round(recoveredAmount).toLocaleString('en-IN');

    // Panel A: My Dead Stock
    const myDeadList = document.getElementById('swapMyDeadStockList');
    if (myDeadList) {
      if (stagnantItems.length === 0) {
        myDeadList.innerHTML = `
          <div style="text-align: center; padding: 32px 16px; background: #f8fafc; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
            <div style="font-size: 32px; margin-bottom: 8px;">🎉</div>
            <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">शानदार! कोई फंसा हुआ माल (डेड स्टॉक) नहीं है</div>
            <div style="font-size: 12px; color: var(--text-muted);">आपकी दुकान की सभी वस्तुएं नियमित रूप से बिक रही हैं।</div>
          </div>
        `;
      } else {
        myDeadList.innerHTML = stagnantItems.map(item => {
          const cost = item.costPrice || Math.round(item.rate * 0.82);
          const locked = Math.round(item.stock * cost);
          const matchingShops = this.nearbyShops.filter(s => s.neededItems && s.neededItems.includes(item.id));
          const hasDirectMatch = matchingShops.length > 0;

          return `
            <div class="swap-item-card ${hasDirectMatch ? 'is-urgent' : ''}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <div style="font-weight: 700; font-size: 14.5px; color: #0f172a;">${item.name}</div>
                  <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">
                    आखरी बिक्री: <strong>${item.lastSoldDays} दिन पहले</strong> • दुकान में बचा स्टॉक: <strong>${item.stock} ${item.unit}</strong>
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 15px; font-weight: 800; color: #ea580c;">₹${locked} फंसा</div>
                  <div style="font-size: 10.5px; color: #64748b;">लागत: ₹${cost}/${item.unit}</div>
                </div>
              </div>

              ${hasDirectMatch ? `
                <div class="match-callout">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 16px;">🎯</span>
                    <span><strong>${matchingShops[0].name} (${matchingShops[0].distance} KM)</strong> को इस सामान की तत्काल आवश्यकता है!</span>
                  </div>
                  <span class="distance-badge">📍 ${matchingShops[0].distance} KM</span>
                </div>
              ` : `
                <div style="font-size: 11.5px; color: #64748b; margin: 6px 0;">
                  3-4 KM के दायरे में 4 अन्य किराना दुकानें उपलब्ध हैं।
                </div>
              `}

              <div style="display: flex; gap: 8px; margin-top: 10px;">
                <button type="button" class="btn btn-primary" style="flex: 2; padding: 7px 12px; font-size: 12px;" onclick="window.lekhaApp.openSwapModal('${item.id}')">
                  🔄 पास की दुकान को ट्रांसफर करें (₹${locked} वापस लें)
                </button>
                <button type="button" class="btn btn-secondary" style="flex: 1; padding: 7px 10px; font-size: 12px;" onclick="window.lekhaApp.shareSwapWhatsApp('${item.id}')">
                  📲 WhatsApp
                </button>
              </div>
            </div>
          `;
        }).join('');
      }
    }

    // Panel B: Nearby Surplus
    const nearbyList = document.getElementById('swapNearbySurplusList');
    if (nearbyList) {
      if (this.nearbySurplus.length === 0) {
        nearbyList.innerHTML = `
          <div style="text-align: center; padding: 32px 16px; background: #f8fafc; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
            <div style="font-size: 32px; margin-bottom: 8px;">📦</div>
            <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">अभी कोई अतिरिक्त सरप्लस लिस्टेड नहीं है</div>
            <div style="font-size: 12px; color: var(--text-muted);">जैसे ही कोई नजदीकी दुकान अतिरिक्त स्टॉक शेयर करेगी, यहाँ दिखेगा।</div>
          </div>
        `;
      } else {
        nearbyList.innerHTML = this.nearbySurplus.map(sur => {
          return `
            <div class="swap-item-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-weight: 700; font-size: 14.5px; color: #0f172a;">${sur.itemName}</span>
                    <span class="distance-badge">📍 ${sur.shopName}</span>
                  </div>
                  <div style="font-size: 11.5px; color: #64748b; margin-top: 4px;">
                    ${sur.reason}
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 15px; font-weight: 800; color: #15803d;">₹${sur.wholesaleCost}/${sur.unit}</div>
                  <div style="font-size: 10.5px; color: #64748b;">बाजार MRP: ₹${sur.retailRate}</div>
                </div>
              </div>

              <div style="background: #f8fafc; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 11.5px; display: flex; justify-content: space-between;">
                <span>उपलब्ध मात्रा: <strong>${sur.availableQty} ${sur.unit}</strong></span>
                <span style="color: #15803d; font-weight: 600;">लागत भाव पर बिना कार्टन लिए</span>
              </div>

              <button type="button" class="btn btn-primary" style="width: 100%; padding: 8px 12px; font-size: 12px;" onclick="window.lekhaApp.buyNearbySurplus('${sur.id}')">
                📥 थोक भाव पर अपनी दुकान में लें (₹${sur.wholesaleCost}/${sur.unit})
              </button>
            </div>
          `;
        }).join('');
      }
    }

    // Panel C: Transfer Ledger
    const historyList = document.getElementById('swapHistoryList');
    if (historyList) {
      if (this.swapTransfers.length === 0) {
        historyList.innerHTML = `
          <div style="text-align: center; padding: 32px 16px; background: #f8fafc; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
            <div style="font-size: 32px; margin-bottom: 8px;">📜</div>
            <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">अभी तक कोई नो-लॉस ट्रांसफर नहीं हुआ</div>
            <div style="font-size: 12px; color: var(--text-muted);">जब आप किसी पास की दुकान को फंसा माल देंगे, उसका हिसाब यहाँ सुरक्षित रहेगा।</div>
          </div>
        `;
      } else {
        historyList.innerHTML = this.swapTransfers.map(tr => {
          return `
            <div class="swap-item-card" style="border-left: 4px solid #16a34a;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                <div>
                  <span style="font-size: 11px; color: #64748b; font-weight: 600;">ID: ${tr.id} • ${tr.time}</span>
                  <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-top: 2px;">
                    ${tr.itemName} (${tr.qty} ${tr.unit})
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 16px; font-weight: 800; color: #16a34a;">+₹${tr.recoveredAmount}</div>
                  <span class="badge-pill badge-green" style="font-size: 10px;">100% रिकवर</span>
                </div>
              </div>
              <div style="font-size: 11.5px; color: #475569; display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #e2e8f0; padding-top: 6px; margin-top: 6px;">
                <span>दुकान: <strong>${tr.targetShopName}</strong></span>
                <span class="distance-badge">📍 ${tr.targetShopDistance} KM</span>
              </div>
            </div>
          `;
        }).join('');
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
    document.getElementById('swapModalCostPrice').textContent = '₹' + cost + ' / ' + item.unit;
    document.getElementById('swapModalRetailPrice').textContent = '₹' + item.rate + ' / ' + item.unit;
    document.getElementById('swapModalTransferRate').textContent = '₹' + cost + ' / ' + item.unit + ' (0% घाटा)';
    document.getElementById('swapModalAvailableStock').textContent = 'दुकान में स्टॉक: ' + item.stock + ' ' + item.unit;

    const qtyInput = document.getElementById('swapTransferQty');
    if (qtyInput) {
      qtyInput.value = item.stock;
      qtyInput.max = item.stock;
    }

    const shopListEl = document.getElementById('swapNearbyShopsSelection');
    if (shopListEl) {
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
                  ${isMatch ? '<span class="badge-pill badge-green" style="margin-left:4px; font-size:10px;">🎯 मांग उपलब्ध</span>' : ''}
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
    if (recEl) recEl.textContent = '₹' + totalRecovery;

    const btnConfirm = document.getElementById('btnConfirmSwapTransfer');
    if (btnConfirm) btnConfirm.textContent = '🤝 ट्रांसफर पक्का करें (₹' + totalRecovery + ' रिकवर)';
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

    item.stock = Math.max(0, parseFloat((item.stock - qty).toFixed(2)));
    if (item.stock === 0) {
      item.lastSoldDays = 0;
    }
    this.saveStorage('lekha_inventory', this.inventory);

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
    this.saveStorage('lekha_swap_transfers', this.swapTransfers);

    if (this.isBackendOnline) {
      fetch('/api/swap/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transferRecord)
      }).catch(e => console.log('Swap transfer sync error:', e));
    }

    const modal = document.getElementById('swapTransferModal');
    if (modal) modal.classList.remove('active');
    this.selectedSwapItem = null;
    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    this.showToast(`🎉 ₹${totalRecovery} रिकवर! ${item.name} '${targetShop.name}' (${targetShop.distance} KM) को ट्रांसफर हुआ।`, '🤝');
  }

  shareSwapWhatsApp(itemId) {
    const item = (itemId ? this.inventory.find(i => i.id === itemId) : null) || this.selectedSwapItem;
    if (!item) {
      const stagnant = this.inventory.find(i => (i.lastSoldDays >= 14 || i.isDeadStock) && i.stock > 0);
      if (!stagnant) {
        alert('कोई फंसा हुआ स्टॉक नहीं है जिसे शेयर किया जाए।');
        return;
      }
      return this.shareSwapWhatsApp(stagnant.id);
    }

    const cost = item.costPrice || Math.round(item.rate * 0.82);
    const targetShop = this.nearbyShops.find(s => s.id === this.selectedTargetShopId) || this.nearbyShops[0];

    const message = '*LEKHA - पास-पड़ोस किराना एक्सचेंज (Zero-Loss Transfer)*\n' +
      'नमस्ते ' + targetShop.owner + ' जी (' + targetShop.name + '),\n\n' +
      'मेरे पास *' + item.name + '* का अतिरिक्त स्टॉक उपलब्ध है:\n' +
      '• उपलब्ध मात्रा: *' + item.stock + ' ' + item.unit + '*\n' +
      '• थोक खरीद भाव (Wholesale Cost): *₹' + cost + '/' + item.unit + '* (MRP ₹' + item.rate + ')\n' +
      '• कुल रकम: *₹' + Math.round(item.stock * cost) + '* (0% मुनाफा / नो-लॉस ट्रांसफर)\n\n' +
      'अगर आपकी दुकान के लिए चाहिए तो कृपया बताएं, मैं 3-4 KM के दायरे में हैंडओवर कर सकता हूँ।\n\n' +
      '- गुप्ता किराना स्टोर';

    const encoded = encodeURIComponent(message);
    window.open('https://wa.me/?text=' + encoded, '_blank');
  }

  buyNearbySurplus(surplusId) {
    const sur = this.nearbySurplus.find(s => s.id === surplusId);
    if (!sur) return;

    if (!confirm(`क्या आप '${sur.shopName}' से '${sur.itemName}' (${sur.availableQty} ${sur.unit}) थोक भाव ₹${sur.wholesaleCost}/${sur.unit} पर लेना चाहते हैं?`)) {
      return;
    }

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
    this.saveStorage('lekha_inventory', this.inventory);
    if (this.isBackendOnline) {
      fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.inventory)
      }).catch(e => console.log('Inventory sync error:', e));
    }

    this.nearbySurplus = this.nearbySurplus.filter(s => s.id !== surplusId);
    this.saveStorage('lekha_nearby_surplus', this.nearbySurplus);

    this.renderAll();
    if (this.shelf3d) this.shelf3d.render();

    this.showToast(`✅ '${sur.itemName}' स्टॉक में जुड़ा! थोक भाव ₹${sur.wholesaleCost}/${sur.unit} पर मिला।`, '📦');
  }

}

// Global Resilient App Initialization
function initLekhaOS() {
  if (!window.lekhaApp) {
    window.lekhaApp = new LekhaRetailApp();
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initLekhaOS);
} else {
  initLekhaOS();
}
