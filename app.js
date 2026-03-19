/* ═══════════════════════════════════════════════
   ANNAM BAKERY POS — App Logic
   ═══════════════════════════════════════════════ */

// ─── Product Data (Demo) ──────────────────────
const PRODUCTS = [
  // Bread
  { id: 1, cat: 'bread', name_en: 'Garlic Bread', name_ta: 'பூண்டு ரொட்டி', price: 80, emoji: '🍞', img: 'images/garlic_bread.png', stock: 25, popular: 85 },
  { id: 2, cat: 'bread', name_en: 'Whole Wheat Bread', name_ta: 'கோதுமை ரொட்டி', price: 55, emoji: '🍞', img: 'images/whole_wheat_bread.png', stock: 30, popular: 70 },
  { id: 3, cat: 'bread', name_en: 'Multigrain Loaf', name_ta: 'பல தானிய ரொட்டி', price: 70, emoji: '🥖', img: 'images/multigrain_loaf.png', stock: 15, popular: 40 },
  { id: 4, cat: 'bread', name_en: 'Butter Bun', name_ta: 'வெண்ணெய் பன்', price: 25, emoji: '🍞', img: 'images/butter_bun.png', stock: 50, popular: 90 },
  { id: 5, cat: 'bread', name_en: 'French Baguette', name_ta: 'ஃபிரெஞ்ச் பாகுவெட்', price: 90, emoji: '🥖', img: 'images/french_baguette.png', stock: 12, popular: 35 },
  // Cake
  { id: 6, cat: 'cake', name_en: 'Black Forest', name_ta: 'பிளாக் ஃபாரெஸ்ட்', price: 550, emoji: '🎂', img: 'images/black_forest.png', stock: 8, popular: 95 },
  { id: 7, cat: 'cake', name_en: 'Butterscotch Cake', name_ta: 'பட்டர்ஸ்காட்ச் கேக்', price: 480, emoji: '🎂', img: 'images/butterscotch_cake.png', stock: 6, popular: 80 },
  { id: 8, cat: 'cake', name_en: 'Chocolate Truffle', name_ta: 'சாக்லேட் ட்ரஃபிள்', price: 620, emoji: '🍫', img: 'images/chocolate_truffle.png', stock: 5, popular: 88 },
  { id: 9, cat: 'cake', name_en: 'Pineapple Cake', name_ta: 'அன்னாசி கேக்', price: 420, emoji: '🍰', img: 'images/pineapple_cake.png', stock: 10, popular: 60 },
  { id: 10, cat: 'cake', name_en: 'Red Velvet Cake', name_ta: 'ரெட் வெல்வெட் கேக்', price: 680, emoji: '🎂', img: 'images/red_velvet_cake.png', stock: 4, popular: 92 },
  // Pastry
  { id: 11, cat: 'pastry', name_en: 'Butter Croissant', name_ta: 'வெண்ணெய் குரோசான்ட்', price: 65, emoji: '🥐', img: 'images/butter_croissant.png', stock: 20, popular: 75 },
  { id: 12, cat: 'pastry', name_en: 'Chocolate Éclair', name_ta: 'சாக்லேட் எக்ளேர்', price: 55, emoji: '🍫', img: 'images/chocolate_eclair.png', stock: 18, popular: 65 },
  { id: 13, cat: 'pastry', name_en: 'Egg Puff', name_ta: 'முட்டை பஃப்', price: 30, emoji: '🥧', img: 'images/egg_puff.png', stock: 40, popular: 97 },
  { id: 14, cat: 'pastry', name_en: 'Veg Puff', name_ta: 'வெஜ் பஃப்', price: 25, emoji: '🥧', img: 'images/veg_puff.png', stock: 45, popular: 93 },
  { id: 15, cat: 'pastry', name_en: 'Chicken Puff', name_ta: 'சிக்கன் பஃப்', price: 40, emoji: '🥧', img: 'images/chicken_puff.png', stock: 30, popular: 82 },
  // Cookies
  { id: 16, cat: 'cookies', name_en: 'Butter Cookies', name_ta: 'வெண்ணெய் குக்கீஸ்', price: 120, emoji: '🍪', img: 'images/butter_cookies.png', stock: 20, popular: 55 },
  { id: 17, cat: 'cookies', name_en: 'Choco Chip Cookie', name_ta: 'சாக்கோ சிப் குக்கீ', price: 35, emoji: '🍪', img: 'images/choco_chip_cookie.png', stock: 35, popular: 78 },
  { id: 18, cat: 'cookies', name_en: 'Oat Raisin Cookie', name_ta: 'ஓட் திராட்சை குக்கீ', price: 30, emoji: '🍪', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop', stock: 28, popular: 30 },
  { id: 19, cat: 'cookies', name_en: 'Almond Biscotti', name_ta: 'பாதாம் பிஸ்காட்டி', price: 45, emoji: '🍪', img: 'https://images.unsplash.com/photo-1548848221-0c2e497ed557?w=400&h=300&fit=crop', stock: 22, popular: 25 },
  // Snacks
  { id: 20, cat: 'snacks', name_en: 'Samosa', name_ta: 'சமோசா', price: 20, emoji: '🔺', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', stock: 60, popular: 98 },
  { id: 21, cat: 'snacks', name_en: 'Paneer Sandwich', name_ta: 'பன்னீர் சாண்ட்விச்', price: 60, emoji: '🥪', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', stock: 15, popular: 50 },
  { id: 22, cat: 'snacks', name_en: 'Vada Pav', name_ta: 'வடா பாவ்', price: 30, emoji: '🍔', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880049?w=400&h=300&fit=crop', stock: 35, popular: 72 },
  { id: 23, cat: 'snacks', name_en: 'Spring Roll', name_ta: 'ஸ்பிரிங் ரோல்', price: 45, emoji: '🌯', img: 'https://images.unsplash.com/photo-1677679665022-01d1c5e3d4f7?w=400&h=300&fit=crop', stock: 25, popular: 45 },
  // Drinks
  { id: 24, cat: 'drinks', name_en: 'Filter Coffee', name_ta: 'ஃபில்டர் காபி', price: 35, emoji: '☕', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefda?w=400&h=300&fit=crop', stock: 99, popular: 99 },
  { id: 25, cat: 'drinks', name_en: 'Masala Tea', name_ta: 'மசாலா தேநீர்', price: 25, emoji: '🍵', img: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop', stock: 99, popular: 96 },
  { id: 26, cat: 'drinks', name_en: 'Cold Coffee', name_ta: 'கோல்ட் காபி', price: 70, emoji: '🥤', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop', stock: 99, popular: 68 },
  { id: 27, cat: 'drinks', name_en: 'Fresh Juice', name_ta: 'பிரெஷ் ஜூஸ்', price: 60, emoji: '🧃', img: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop', stock: 99, popular: 58 },
  { id: 28, cat: 'drinks', name_en: 'Lassi', name_ta: 'லஸ்ஸி', price: 50, emoji: '🥛', img: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop', stock: 99, popular: 42 },
  // Sweets
  { id: 29, cat: 'sweets', name_en: 'Gulab Jamun', name_ta: 'குலாப் ஜாமுன்', price: 15, emoji: '🍩', img: 'https://images.unsplash.com/photo-1666190410093-15bd56a13a0f?w=400&h=300&fit=crop', stock: 50, popular: 87 },
  { id: 30, cat: 'sweets', name_en: 'Jalebi', name_ta: 'ஜிலேபி', price: 80, emoji: '🌀', img: 'https://images.unsplash.com/photo-1601303516150-6d3be1e25328?w=400&h=300&fit=crop', stock: 25, popular: 76 },
  { id: 31, cat: 'sweets', name_en: 'Mysore Pak', name_ta: 'மைசூர் பாக்', price: 200, emoji: '🟨', img: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=300&fit=crop', stock: 15, popular: 52 },
  { id: 32, cat: 'sweets', name_en: 'Laddu', name_ta: 'லட்டு', price: 25, emoji: '🟡', img: 'https://images.unsplash.com/photo-1605197584547-b638fa8e90c3?w=400&h=300&fit=crop', stock: 40, popular: 83 },
];

const CATEGORIES = [
  { key: 'all', en: 'All', ta: 'அனைத்தும்', emoji: '🏪', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=120&fit=crop' },
  { key: 'bread', en: 'Bread', ta: 'ரொட்டி', emoji: '🍞', img: 'https://images.unsplash.com/photo-1549931319-a545753467c8?w=200&h=120&fit=crop' },
  { key: 'cake', en: 'Cake', ta: 'கேக்', emoji: '🎂', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=120&fit=crop' },
  { key: 'pastry', en: 'Pastry', ta: 'பேஸ்ட்ரி', emoji: '🥐', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=200&h=120&fit=crop' },
  { key: 'cookies', en: 'Cookies', ta: 'குக்கீஸ்', emoji: '🍪', img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=120&fit=crop' },
  { key: 'snacks', en: 'Snacks', ta: 'தின்பண்டம்', emoji: '🥧', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=120&fit=crop' },
  { key: 'drinks', en: 'Drinks', ta: 'பானங்கள்', emoji: '☕', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&h=120&fit=crop' },
  { key: 'sweets', en: 'Sweets', ta: 'இனிப்புகள்', emoji: '🍩', img: 'https://images.unsplash.com/photo-1666190410093-15bd56a13a0f?w=200&h=120&fit=crop' },
];

// ─── State ────────────────────────────────────
let cart = [];               // [{ productId, qty }]
let currentLang = localStorage.getItem('bakery_pos_lang') || 'en';
let currentCategory = 'all';
let discountType = 'percent'; // 'percent' | 'amount'
let discountValue = 0;
let billCount = parseInt(localStorage.getItem('bakery_pos_billcount') || '0');
let searchDebounce = null;
let longPressTimer = null;
let longPressProductId = null;
let selectedPayMethod = 'cash';
let toastTimer = null;
let currentGridFocus = -1;
let currentPage = 'billing';

// ─── DOM Refs ─────────────────────────────────
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const dom = {
  greeting: $('#greeting'),
  clock: $('#liveClock'),
  searchInput: $('#searchInput'),
  resultCount: $('#resultCount'),
  searchClear: $('#searchClear'),
  recentStrip: $('#recentStrip'),
  recentItems: $('#recentItems'),
  categoryTabs: $('#categoryTabs'),
  productGrid: $('#productGrid'),
  billBody: $('#billBody'),
  billItems: $('#billItems'),
  emptyCart: $('#emptyCart'),
  billFooter: $('#billFooter'),
  subtotalAmt: $('#subtotalAmt'),
  discountAmt: $('#discountAmt'),
  discountRow: $('#discountRow'),
  grandTotal: $('#grandTotal'),
  generateBtn: $('#generateBillBtn'),
  billDate: $('#billDate'),
  billNumber: $('#billNumber'),
  cartBubble: $('#cartBubble'),
  mobileNav: $('#mobileBottomNav'),
  mobileBillFab: $('#mobileBillFab'),
  mobileBillBadge: $('#mobileBillBadge'),
  productsArea: $('#productsArea'),
  dashboardPage: $('#dashboardPage'),
  ownerPage: $('#ownerPage'),
  analyticsPage: $('#analyticsPage'),
  billPanel: $('#billPanel'),
  paymentModal: $('#paymentModal'),
  paymentTotalAmt: $('#paymentTotalAmt'),
  cashInput: $('#cashInput'),
  changeAmt: $('#changeAmt'),
  changeDisplay: $('#changeDisplay'),
  cashSection: $('#cashSection'),
  confirmPayBtn: $('#confirmPayBtn'),
  successOverlay: $('#successOverlay'),
  successBillNo: $('#successBillNo'),
  successChange: $('#successChange'),
  newBillBtn: $('#newBillBtn'),
  qtyModal: $('#qtyModal'),
  qtyDisplay: $('#qtyDisplay'),
  toastContainer: $('#toastContainer'),
  discountInput: $('#discountInput'),
};

function isMobileView() {
  return window.innerWidth <= 768;
}

function setBillPanelOpen(open) {
  if (!dom.billPanel) return;
  dom.billPanel.classList.toggle('mob-open', open);
  if (dom.mobileBillFab) {
    dom.mobileBillFab.classList.toggle('is-active', open);
    dom.mobileBillFab.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
}

function syncNavigation(page) {
  $$('.sidebar-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.page === page));
  $$('.mob-nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.page === page));
}

function navigateToPage(page) {
  currentPage = page;
  syncNavigation(page);

  dom.productsArea.style.display = 'none';
  dom.dashboardPage.classList.add('hidden');
  dom.ownerPage.classList.add('hidden');
  dom.analyticsPage.classList.add('hidden');
  dom.billPanel.style.display = 'none';

  if (page === 'billing') {
    dom.productsArea.style.display = '';
    dom.billPanel.style.display = '';
    if (!isMobileView()) setBillPanelOpen(false);
  } else if (page === 'analytics') {
    dom.dashboardPage.classList.remove('hidden');
    renderDashboard();
    setBillPanelOpen(false);
  } else if (page === 'owner') {
    dom.ownerPage.classList.remove('hidden');
    renderOwnerProducts();
    setBillPanelOpen(false);
  } else if (page === 'analytics2') {
    dom.analyticsPage.classList.remove('hidden');
    renderAnalytics(currentAnPeriod);
    setBillPanelOpen(false);
  } else {
    dom.productsArea.style.display = '';
    dom.billPanel.style.display = '';
  }

  if (page !== 'billing' || !isMobileView()) {
    setBillPanelOpen(false);
  }

  updateCartBubble();
}

// ═════════════════════════════════════════════
// INIT
// ═════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initGreeting();
  initLanguage();
  initCategories();
  renderProducts();
  initBillMeta();
  restoreCart();
  loadRecentItems();
  initEventListeners();
  initKeyboardShortcuts();
  initDashboard();
  initOwnerPage();
  initAnalytics();
  initAddStockModal();
  navigateToPage('billing');
});

// ─── Clock ──────────────────────────────────
function initClock() {
  function update() {
    const now = new Date();
    dom.clock.textContent = now.toLocaleTimeString('en-IN', { hour12: false });
  }
  update();
  setInterval(update, 1000);
}

// ─── Greeting ───────────────────────────────
function initGreeting() {
  function update() {
    const h = new Date().getHours();
    let g;
    if (h >= 5 && h < 12) g = currentLang === 'ta' ? 'காலை வணக்கம்! ☀️' : 'Good Morning! ☀️';
    else if (h >= 12 && h < 17) g = currentLang === 'ta' ? 'மதிய வணக்கம்! 🌤' : 'Good Afternoon! 🌤';
    else if (h >= 17 && h < 21) g = currentLang === 'ta' ? 'மாலை வணக்கம்! 🌙' : 'Good Evening! 🌙';
    else g = currentLang === 'ta' ? 'வணக்கம்! 🌙' : 'Good Night! 🌙';
    dom.greeting.textContent = g;
  }
  update();
  setInterval(update, 60000);
  window._updateGreeting = update;
}

// ─── Language ───────────────────────────────
function initLanguage() {
  const btns = $$('.lang-btn');
  btns.forEach(b => {
    if (b.dataset.lang === currentLang) b.classList.add('active');
    else b.classList.remove('active');
    b.addEventListener('click', () => {
      currentLang = b.dataset.lang;
      localStorage.setItem('bakery_pos_lang', currentLang);
      btns.forEach(x => x.classList.toggle('active', x.dataset.lang === currentLang));
      applyLanguage();
      renderProducts();
      renderBillItems();
      if (window._updateGreeting) window._updateGreeting();
    });
  });
  applyLanguage();
}

function applyLanguage() {
  $$('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text !== null) {
      // Don't replace if has children with data attrs
      if (el.children.length === 0 || el.classList.contains('shop-name')) {
        if (el.classList.contains('shop-name')) {
          // Special: only update text node
          el.querySelector('.shop-name-text').textContent = el.getAttribute(`data-${currentLang}`);
        } else {
          el.textContent = text;
        }
      }
    }
  });
  // Update sidebar tooltips
  $$('.sidebar-btn[data-tooltip-en]').forEach(btn => {
    btn.style.setProperty('--tooltip', `"${btn.getAttribute(`data-tooltip-${currentLang}`)}"`);
    btn.setAttribute('data-tooltip', btn.getAttribute(`data-tooltip-${currentLang}`) || '');
    // We use CSS ::after with content: attr(data-tooltip-en); — update that
    // Actually let's just use JS to set the after content via custom prop
  });
}

// ─── Categories ─────────────────────────────
function initCategories() {
  dom.categoryTabs.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const count = cat.key === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === cat.key).length;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `cat-tab${cat.key === 'all' ? ' active' : ''}`;
    btn.dataset.cat = cat.key;
    btn.innerHTML = `
      <div class="cat-tab-img">
        <img src="${cat.img}" alt="${cat.en}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.parentElement.innerHTML='${cat.emoji}'">
      </div>
      <span class="cat-tab-label">${currentLang === 'ta' ? cat.ta : cat.en}</span>
      <span class="cat-count">${count}</span>
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      currentCategory = cat.key;
      $$('.cat-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    });
    dom.categoryTabs.appendChild(btn);
  });
}

// ─── Products Render ────────────────────────
function renderProducts(filter = '') {
  let products = currentCategory === 'all'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.cat === currentCategory);

  // Sort by popularity (most sold first)
  products.sort((a, b) => (b.popular || 0) - (a.popular || 0));

  if (filter) {
    const q = filter.toLowerCase();
    products = products.filter(p =>
      p.name_en.toLowerCase().includes(q) ||
      p.name_ta.includes(q)
    );
  }

  // Update result count
  if (filter) {
    const l = currentLang === 'ta' ? 'பொருட்கள்' : 'items';
    dom.resultCount.textContent = `${products.length} ${l}`;
    dom.resultCount.classList.remove('hidden');
  } else {
    dom.resultCount.classList.add('hidden');
  }

  // Update category tabs labels for current language
  $$('.cat-tab').forEach(tab => {
    const cat = CATEGORIES.find(c => c.key === tab.dataset.cat);
    if (cat) {
      const count = cat.key === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === cat.key).length;
      const label = tab.querySelector('.cat-tab-label');
      const countEl = tab.querySelector('.cat-count');
      if (label) label.textContent = currentLang === 'ta' ? cat.ta : cat.en;
      if (countEl) countEl.textContent = count;
    }
  });

  dom.productGrid.innerHTML = '';
  products.forEach((p, i) => {
    const inCart = cart.find(c => c.productId === p.id);
    const card = document.createElement('div');
    card.className = `product-card fade-in${inCart ? ' in-cart' : ''}`;
    card.dataset.id = p.id;
    card.style.animationDelay = `${i * 40}ms`;

    const catLabel = CATEGORIES.find(c => c.key === p.cat);
    const lowStock = p.stock <= 5;

    const imageContent = p.img
      ? `<img src="${p.img}" alt="${p.name_en}" loading="lazy" onload="this.classList.add('loaded')" onerror="this.parentElement.innerHTML='${p.emoji}'">`
      : p.emoji;

    card.innerHTML = `
      <div class="card-image">${imageContent}</div>
      ${lowStock ? '<span class="card-badge-low">Low Stock</span>' : ''}
      <span class="card-check">✓</span>
      <div class="card-body">
        <div class="card-category">${catLabel ? (currentLang === 'ta' ? catLabel.ta : catLabel.en) : p.cat}</div>
        <div class="card-name">${currentLang === 'ta' ? p.name_ta : p.name_en}</div>
        <div class="card-name-ta tamil">${currentLang === 'ta' ? p.name_en : p.name_ta}</div>
        <div class="card-price">₹${p.price}</div>
      </div>
    `;

    // Click → add to cart
    card.addEventListener('click', (e) => {
      addToCart(p.id, 1, card);
    });

    // Long press → qty picker
    card.addEventListener('pointerdown', (e) => {
      longPressTimer = setTimeout(() => {
        longPressProductId = p.id;
        openQtyPicker();
      }, 500);
    });
    card.addEventListener('pointerup', () => clearTimeout(longPressTimer));
    card.addEventListener('pointerleave', () => clearTimeout(longPressTimer));

    dom.productGrid.appendChild(card);
  });
}


// ─── Cart Logic ─────────────────────────────
function addToCart(productId, qty = 1, cardEl = null) {
  const existing = cart.find(c => c.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }
  saveCart();
  updateCartUI();

  // Card flash animation
  if (cardEl) {
    cardEl.classList.add('cart-flash', 'in-cart');
    setTimeout(() => cardEl.classList.remove('cart-flash'), 450);

    // Float +qty label
    const fl = document.createElement('span');
    fl.className = 'float-label';
    fl.textContent = `+${qty}`;
    cardEl.appendChild(fl);
    setTimeout(() => fl.remove(), 600);
  } else {
    // Find card in grid
    const c = dom.productGrid.querySelector(`.product-card[data-id="${productId}"]`);
    if (c) {
      c.classList.add('cart-flash', 'in-cart');
      setTimeout(() => c.classList.remove('cart-flash'), 450);
    }
  }

  const product = PRODUCTS.find(p => p.id === productId);
  const name = currentLang === 'ta' ? product.name_ta : product.name_en;
  showToast(`✓ ${name} ${currentLang === 'ta' ? 'சேர்க்கப்பட்டது' : 'added'}`);

  // Save to recent
  saveRecentItem(productId);
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.productId !== productId);
  saveCart();
  updateCartUI();

  // Update card visual
  const c = dom.productGrid.querySelector(`.product-card[data-id="${productId}"]`);
  if (c) c.classList.remove('in-cart');
}

function updateQty(productId, delta) {
  const item = cart.find(c => c.productId === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();

  // Update in-place (no re-render, no animation)
  const row = dom.billItems.querySelector(`.bill-item[data-id="${productId}"]`);
  if (row) {
    const product = PRODUCTS.find(p => p.id === productId);
    row.querySelector('.qty-val').textContent = item.qty;
    row.querySelector('.bill-item-subtotal').textContent = `₹${(product.price * item.qty).toFixed(0)}`;
  }
  updateTotals();
  updateCartBubble();
}

function saveCart() {
  localStorage.setItem('bakery_pos_cart', JSON.stringify(cart));
}

function restoreCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('bakery_pos_cart'));
    if (saved && saved.length) {
      cart = saved;
      updateCartUI();
      // Mark cards in-cart
      cart.forEach(c => {
        const el = dom.productGrid.querySelector(`.product-card[data-id="${c.productId}"]`);
        if (el) el.classList.add('in-cart');
      });
      showToast(currentLang === 'ta' ? '🛒 கார்ட் மீட்கப்பட்டது' : '🛒 Cart restored');
    }
  } catch (e) { /* ignore */ }
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  $$('.product-card.in-cart').forEach(c => c.classList.remove('in-cart'));
}

// ─── Cart UI ────────────────────────────────
function updateCartUI() {
  renderBillItems();
  updateTotals();
  updateCartBubble();

  // Show/hide empty state and footer
  if (cart.length === 0) {
    dom.emptyCart.style.display = 'flex';
    dom.billItems.style.display = 'none';
    dom.billFooter.classList.add('hidden');
    dom.generateBtn.disabled = true;
  } else {
    dom.emptyCart.style.display = 'none';
    dom.billItems.style.display = 'flex';
    dom.billFooter.classList.remove('hidden');
    dom.generateBtn.disabled = false;
  }
}

function renderBillItems() {
  dom.billItems.innerHTML = '';
  cart.forEach((item, idx) => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (!product) return;
    const row = document.createElement('div');
    row.className = 'bill-item';
    row.style.animationDelay = `${idx * 50}ms`;
    row.dataset.id = item.productId;

    const name = currentLang === 'ta' ? product.name_ta : product.name_en;
    row.innerHTML = `
      <span class="bill-item-name" title="${name}">${name}</span>
      <div class="qty-controls">
        <button class="qty-btn" data-action="dec" data-id="${item.productId}">−</button>
        <span class="qty-val mono">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.productId}">+</button>
      </div>
      <span class="bill-item-subtotal mono">₹${(product.price * item.qty).toFixed(0)}</span>
      <button class="bill-item-remove" data-id="${item.productId}">✕</button>
      <div class="bill-item-delete-zone">🗑</div>
    `;

    // Swipe to delete (touch)
    let touchStartX = 0;
    row.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    row.addEventListener('touchmove', e => {
      const dx = touchStartX - e.touches[0].clientX;
      if (dx > 40) row.classList.add('swiping');
      else row.classList.remove('swiping');
    }, { passive: true });
    row.addEventListener('touchend', () => {
      if (row.classList.contains('swiping')) {
        removeFromCart(item.productId);
      }
      row.classList.remove('swiping');
    });

    dom.billItems.appendChild(row);
  });

  // Qty +/- events
  dom.billItems.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;
      updateQty(id, action === 'inc' ? 1 : -1);
    });
  });

  // Remove events
  dom.billItems.querySelectorAll('.bill-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.dataset.id));
    });
  });
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  discountValue = parseFloat(dom.discountInput.value) || 0;
  let discAmt = 0;
  if (discountType === 'percent') {
    discAmt = subtotal * (Math.min(discountValue, 100) / 100);
  } else {
    discAmt = Math.min(discountValue, subtotal);
  }

  const grand = Math.max(0, subtotal - discAmt);

  dom.subtotalAmt.textContent = `₹${subtotal.toFixed(2)}`;
  dom.discountAmt.textContent = `−₹${discAmt.toFixed(2)}`;
  dom.grandTotal.textContent = `₹${grand.toFixed(2)}`;

  // Bump animation
  dom.grandTotal.classList.remove('bump');
  void dom.grandTotal.offsetWidth; // force reflow
  dom.grandTotal.classList.add('bump');
}

function updateCartBubble() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  if (count > 0) {
    dom.cartBubble.textContent = count;
    dom.cartBubble.classList.remove('hidden');
    dom.cartBubble.style.animation = 'none';
    void dom.cartBubble.offsetWidth;
    dom.cartBubble.style.animation = '';
  } else {
    dom.cartBubble.classList.add('hidden');
  }

  if (dom.mobileBillBadge) {
    dom.mobileBillBadge.textContent = count;
    dom.mobileBillBadge.classList.toggle('hidden', count === 0);
  }

  if (dom.mobileBillFab) {
    const shouldShowFab = false;
    dom.mobileBillFab.classList.toggle('hidden', !shouldShowFab);
  }
}

// ─── Bill Meta ──────────────────────────────
function initBillMeta() {
  updateBillMeta();
}

function updateBillMeta() {
  const now = new Date();
  dom.billDate.textContent = now.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const dateStr = now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0');
  billCount++;
  const billNo = `BILL-${dateStr}-${billCount.toString().padStart(4, '0')}`;
  dom.billNumber.textContent = billNo;
}

function getCurrentBillNo() {
  return dom.billNumber.textContent;
}

// ─── Search ─────────────────────────────────
function initSearch() {
  dom.searchInput.addEventListener('input', () => {
    const val = dom.searchInput.value.trim();
    dom.searchClear.classList.toggle('hidden', !val);

    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      renderProducts(val);
    }, 300);
  });

  dom.searchClear.addEventListener('click', () => {
    dom.searchInput.value = '';
    dom.searchClear.classList.add('hidden');
    dom.resultCount.classList.add('hidden');
    renderProducts();
  });
}

// ─── Recent Items ───────────────────────────
function saveRecentItem(productId) {
  let recent = JSON.parse(localStorage.getItem('bakery_pos_recent') || '[]');
  recent = recent.filter(id => id !== productId);
  recent.unshift(productId);
  recent = recent.slice(0, 5);
  localStorage.setItem('bakery_pos_recent', JSON.stringify(recent));
  loadRecentItems();
}

function loadRecentItems() {
  const recent = JSON.parse(localStorage.getItem('bakery_pos_recent') || '[]');
  if (recent.length === 0) {
    dom.recentStrip.classList.add('hidden');
    return;
  }
  dom.recentStrip.classList.remove('hidden');
  dom.recentItems.innerHTML = '';
  recent.forEach(id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const chip = document.createElement('button');
    chip.className = 'recent-chip';
    chip.textContent = `${p.emoji} ${currentLang === 'ta' ? p.name_ta : p.name_en}`;
    chip.addEventListener('click', () => addToCart(p.id));
    dom.recentItems.appendChild(chip);
  });
}

// ─── Discount ───────────────────────────────
function initDiscount() {
  $$('.disc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      discountType = btn.dataset.type;
      $$('.disc-btn').forEach(b => b.classList.toggle('active', b.dataset.type === discountType));
      updateTotals();
    });
  });
  dom.discountInput.addEventListener('input', () => updateTotals());
}

// ─── Payment Modal ──────────────────────────
function openPaymentModal() {
  const total = getGrandTotal();
  dom.paymentTotalAmt.textContent = `₹${total.toFixed(2)}`;
  dom.paymentModal.classList.remove('hidden');
  // Trigger animation next frame
  requestAnimationFrame(() => dom.paymentModal.classList.add('show'));
  dom.cashInput.value = '';
  dom.changeAmt.textContent = '₹0.00';
  dom.changeAmt.classList.remove('insufficient');
  selectedPayMethod = 'cash';
  $$('.pay-option').forEach(o => o.classList.toggle('selected', o.dataset.method === 'cash'));
  dom.cashSection.classList.add('show');
  dom.confirmPayBtn.disabled = true;
}

function closePaymentModal() {
  dom.paymentModal.classList.remove('show');
  setTimeout(() => dom.paymentModal.classList.add('hidden'), 300);
}

function getGrandTotal() {
  const subtotal = cart.reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  let discAmt = 0;
  if (discountType === 'percent') {
    discAmt = subtotal * (Math.min(discountValue, 100) / 100);
  } else {
    discAmt = Math.min(discountValue, subtotal);
  }
  return Math.max(0, subtotal - discAmt);
}

function initPayment() {
  // Generate bill btn
  dom.generateBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    openPaymentModal();
  });

  // Close
  $('#paymentClose').addEventListener('click', closePaymentModal);

  // Payment method
  $$('.pay-option').forEach(opt => {
    opt.addEventListener('click', () => {
      selectedPayMethod = opt.dataset.method;
      $$('.pay-option').forEach(o => o.classList.toggle('selected', o.dataset.method === selectedPayMethod));
      if (selectedPayMethod === 'cash') {
        dom.cashSection.classList.add('show');
        dom.confirmPayBtn.disabled = true;
      } else {
        dom.cashSection.classList.remove('show');
        dom.confirmPayBtn.disabled = false;
      }
    });
  });

  // Cash input
  dom.cashInput.addEventListener('input', () => {
    const total = getGrandTotal();
    const cash = parseFloat(dom.cashInput.value) || 0;
    const change = cash - total;
    if (cash > 0 && change >= 0) {
      dom.changeAmt.textContent = `₹${change.toFixed(2)}`;
      dom.changeAmt.classList.remove('insufficient');
      dom.confirmPayBtn.disabled = false;
    } else if (cash > 0) {
      dom.changeAmt.textContent = currentLang === 'ta' ? '⚠ போதுமான பணம் இல்லை' : '⚠ Insufficient';
      dom.changeAmt.classList.add('insufficient');
      dom.changeAmt.classList.add('shake');
      setTimeout(() => dom.changeAmt.classList.remove('shake'), 300);
      dom.confirmPayBtn.disabled = true;
    } else {
      dom.changeAmt.textContent = '₹0.00';
      dom.changeAmt.classList.remove('insufficient');
      dom.confirmPayBtn.disabled = true;
    }
  });

  // Confirm
  dom.confirmPayBtn.addEventListener('click', confirmBill);
}

function confirmBill() {
  const total = getGrandTotal();
  const cash = parseFloat(dom.cashInput.value) || 0;
  const change = selectedPayMethod === 'cash' ? cash - total : 0;
  const billNo = getCurrentBillNo();

  // Save bill
  saveBillToHistory(billNo, total, selectedPayMethod, change);

  // Close payment modal
  dom.paymentModal.classList.remove('show');
  setTimeout(() => dom.paymentModal.classList.add('hidden'), 300);

  // Show success overlay
  dom.successBillNo.textContent = billNo;
  if (selectedPayMethod === 'cash' && change > 0) {
    dom.successChange.textContent = `${currentLang === 'ta' ? 'மீதம்' : 'Change'}: ₹${change.toFixed(2)}`;
    dom.successChange.style.display = 'block';
  } else {
    dom.successChange.style.display = 'none';
  }
  dom.successOverlay.classList.remove('hidden');
  requestAnimationFrame(() => dom.successOverlay.classList.add('show'));

  // Save bill count
  localStorage.setItem('bakery_pos_billcount', billCount.toString());

  // ── Auto-reset after 2 seconds — no button click needed ──
  setTimeout(() => startNewBill(), 2000);
}

function saveBillToHistory(billNo, total, method, change) {
  const bills = JSON.parse(localStorage.getItem('bakery_pos_bills') || '[]');
  bills.unshift({
    billNo,
    total,
    method,
    change,
    items: cart.map(c => {
      const p = PRODUCTS.find(x => x.id === c.productId);
      return { name: p.name_en, qty: c.qty, price: p.price };
    }),
    date: new Date().toISOString()
  });
  localStorage.setItem('bakery_pos_bills', JSON.stringify(bills.slice(0, 100)));
}

// ─── Success / New Bill ─────────────────────
function initSuccess() {
  dom.newBillBtn.addEventListener('click', startNewBill);
}

function startNewBill() {
  dom.successOverlay.classList.remove('show');
  setTimeout(() => dom.successOverlay.classList.add('hidden'), 400);
  clearCart();
  dom.discountInput.value = '0';
  discountValue = 0;
  updateBillMeta();
  updateCartUI();
  showToast(currentLang === 'ta' ? '🧾 புதிய பில் தொடங்கியது' : '🧾 New bill started');
}

// ─── Quantity Picker ────────────────────────
function openQtyPicker() {
  dom.qtyDisplay.textContent = '1';
  dom.qtyModal.classList.remove('hidden');
}

function initQtyPicker() {
  $$('.qty-num').forEach(btn => {
    btn.addEventListener('click', () => {
      const num = btn.dataset.num;
      if (num === 'C') {
        dom.qtyDisplay.textContent = '0';
      } else if (num === 'OK') {
        const qty = parseInt(dom.qtyDisplay.textContent) || 1;
        if (longPressProductId && qty > 0) {
          addToCart(longPressProductId, qty);
        }
        dom.qtyModal.classList.add('hidden');
        longPressProductId = null;
      } else {
        const current = dom.qtyDisplay.textContent;
        if (current === '0') dom.qtyDisplay.textContent = num;
        else dom.qtyDisplay.textContent = (current + num).slice(0, 3);
      }
    });
  });

  $('#qtyCancel').addEventListener('click', () => {
    dom.qtyModal.classList.add('hidden');
    longPressProductId = null;
  });
}

// ─── Toast ──────────────────────────────────
function showToast(message) {
  // Remove previous
  dom.toastContainer.innerHTML = '';
  clearTimeout(toastTimer);

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  dom.toastContainer.appendChild(toast);

  toastTimer = setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 250);
  }, 2000);
}

// ─── Keyboard Shortcuts ─────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // / → focus search
    if (e.key === '/' && document.activeElement !== dom.searchInput && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      dom.searchInput.focus();
    }
    // Esc → close modals / clear search
    if (e.key === 'Escape') {
      if (!dom.qtyModal.classList.contains('hidden')) {
        dom.qtyModal.classList.add('hidden');
        longPressProductId = null;
      } else if (!dom.paymentModal.classList.contains('hidden')) {
        closePaymentModal();
      } else if (isMobileView() && dom.billPanel.classList.contains('mob-open')) {
        setBillPanelOpen(false);
      } else if (dom.searchInput.value) {
        dom.searchInput.value = '';
        dom.searchClear.classList.add('hidden');
        dom.resultCount.classList.add('hidden');
        renderProducts();
      }
    }
    // Ctrl+G → generate bill
    if (e.ctrlKey && e.key === 'g') {
      e.preventDefault();
      if (cart.length > 0) openPaymentModal();
    }
    // Ctrl+N → new bill
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      if (!dom.successOverlay.classList.contains('hidden')) {
        startNewBill();
      }
    }
    // Arrow keys → navigate grid
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (document.activeElement === dom.searchInput) return;
      const cards = [...dom.productGrid.querySelectorAll('.product-card')];
      if (!cards.length) return;

      e.preventDefault();
      const cols = Math.floor(dom.productGrid.offsetWidth / 159); // approx
      if (e.key === 'ArrowRight') currentGridFocus = Math.min(currentGridFocus + 1, cards.length - 1);
      else if (e.key === 'ArrowLeft') currentGridFocus = Math.max(currentGridFocus - 1, 0);
      else if (e.key === 'ArrowDown') currentGridFocus = Math.min(currentGridFocus + cols, cards.length - 1);
      else if (e.key === 'ArrowUp') currentGridFocus = Math.max(currentGridFocus - cols, 0);

      if (currentGridFocus < 0) currentGridFocus = 0;
      cards.forEach(c => c.style.outline = '');
      cards[currentGridFocus].style.outline = `2px solid var(--gold)`;
      cards[currentGridFocus].scrollIntoView({ block: 'nearest' });

      // Enter → add to cart
      if (e.key === 'Enter' && currentGridFocus >= 0) {
        const id = parseInt(cards[currentGridFocus].dataset.id);
        addToCart(id, 1, cards[currentGridFocus]);
      }
    }
    if (e.key === 'Enter' && currentGridFocus >= 0) {
      const cards = [...dom.productGrid.querySelectorAll('.product-card')];
      if (cards[currentGridFocus]) {
        const id = parseInt(cards[currentGridFocus].dataset.id);
        addToCart(id, 1, cards[currentGridFocus]);
      }
    }
  });
}

// ─── Mobile Bill Panel Toggle ───────────────
function initMobileBillToggle() {
  if (dom.mobileBillFab) {
    dom.mobileBillFab.addEventListener('click', () => {
      if (currentPage !== 'billing' || !isMobileView()) return;
      setBillPanelOpen(!dom.billPanel.classList.contains('mob-open'));
    });
  }

  document.addEventListener('click', (e) => {
    if (!isMobileView() || currentPage !== 'billing') return;
    if (!dom.billPanel.classList.contains('mob-open')) return;
    if (dom.billPanel.contains(e.target)) return;
    if (dom.mobileBillFab && dom.mobileBillFab.contains(e.target)) return;
    setBillPanelOpen(false);
  });

  window.addEventListener('resize', () => {
    if (!isMobileView()) {
      setBillPanelOpen(false);
    }
    updateCartBubble();
  });
}

// ─── Drag & Drop Reorder Bill Items ─────────
function initDragReorder() {
  dom.billItems.addEventListener('dragstart', (e) => {
    const item = e.target.closest('.bill-item');
    if (!item) return;
    e.dataTransfer.setData('text/plain', item.dataset.id);
    item.style.opacity = '0.4';
  });

  dom.billItems.addEventListener('dragover', (e) => {
    e.preventDefault();
    const item = e.target.closest('.bill-item');
    if (item) item.style.borderTop = '2px solid var(--gold)';
  });

  dom.billItems.addEventListener('dragleave', (e) => {
    const item = e.target.closest('.bill-item');
    if (item) item.style.borderTop = '';
  });

  dom.billItems.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    const target = e.target.closest('.bill-item');
    if (!target) return;
    const targetId = parseInt(target.dataset.id);
    target.style.borderTop = '';

    // Reorder cart
    const dragIdx = cart.findIndex(c => c.productId === draggedId);
    const targetIdx = cart.findIndex(c => c.productId === targetId);
    if (dragIdx < 0 || targetIdx < 0 || dragIdx === targetIdx) return;
    const [item] = cart.splice(dragIdx, 1);
    cart.splice(targetIdx, 0, item);
    saveCart();
    renderBillItems();
  });

  dom.billItems.addEventListener('dragend', (e) => {
    const item = e.target.closest('.bill-item');
    if (item) item.style.opacity = '';
  });
}

// ─── ALL Event Listeners ────────────────────
function initEventListeners() {
  initSearch();
  initDiscount();
  initPayment();
  initSuccess();
  initQtyPicker();
  initMobileBillToggle();
  initDragReorder();

  // Make bill items draggable
  const observer = new MutationObserver(() => {
    dom.billItems.querySelectorAll('.bill-item').forEach(item => {
      item.draggable = true;
    });
  });
  observer.observe(dom.billItems, { childList: true });

  // ─── Sidebar Page Navigation ─────────────────
  ['.sidebar-btn', '.mob-nav-btn'].forEach(selector => {
    $$(selector).forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (!page || page === 'settings') return;
        if (page === 'billing' && isMobileView()) {
          if (currentPage !== 'billing') {
            navigateToPage('billing');
            setBillPanelOpen(true);
            return;
          }

          setBillPanelOpen(!dom.billPanel.classList.contains('mob-open'));
          return;
        }
        navigateToPage(page);
      });
    });
  });
}

// ═════════════════════════════════════════════
// DASHBOARD
// ═════════════════════════════════════════════
function initDashboard() {
  // Set date in header
  const el = $('#dashDate');
  if (el) {
    el.textContent = new Date().toLocaleDateString('en-IN', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
  }
}

function renderDashboard() {
  // ── Stat: Total Products
  $('#statTotalProducts').textContent = PRODUCTS.length;

  // ── Stat: Categories (excluding 'all')
  $('#statCategories').textContent = CATEGORIES.filter(c => c.key !== 'all').length;

  // ── Stat: Low Stock (≤5)
  const lowStock = PRODUCTS.filter(p => p.stock <= 5);
  $('#statLowStock').textContent = lowStock.length;

  // ── Stat: Top Seller
  const top = [...PRODUCTS].sort((a, b) => (b.popular || 0) - (a.popular || 0))[0];
  const topEl = $('#statTopItem');
  if (top) topEl.textContent = top.emoji + ' ' + top.name_en.split(' ')[0];

  // ── Stat: Today's Bills & Revenue from localStorage
  const allBills = JSON.parse(localStorage.getItem('bakery_pos_bills') || '[]');
  const today = new Date().toISOString().slice(0, 10);
  const todayBills = allBills.filter(b => b.date && b.date.startsWith(today));
  const todayRevenue = todayBills.reduce((s, b) => s + (b.total || 0), 0);
  $('#statTodayBills').textContent = todayBills.length;
  $('#statRevenue').textContent = '₹' + todayRevenue.toLocaleString('en-IN');

  // ── Low Stock List
  const lowList = $('#lowStockList');
  $('#lowStockCount').textContent = lowStock.length;
  lowList.innerHTML = '';
  if (lowStock.length === 0) {
    lowList.innerHTML = '<div class="dash-empty">✅ All items well stocked!</div>';
  } else {
    lowStock.forEach(p => {
      lowList.innerHTML += `
        <div class="dash-list-row">
          <div class="dash-list-left">
            <span class="dash-list-emoji">${p.emoji}</span>
            <div>
              <div class="dash-list-name">${p.name_en}</div>
              <div class="dash-list-sub">${CATEGORIES.find(c=>c.key===p.cat)?.en || p.cat}</div>
            </div>
          </div>
          <span class="dash-stock-tag">${p.stock} left</span>
        </div>`;
    });
  }

  // ── Recent Bills List (last 5)
  const recentList = $('#recentBillsList');
  const recent5 = allBills.slice(0, 5);
  $('#recentBillsCount').textContent = allBills.length;
  recentList.innerHTML = '';
  if (recent5.length === 0) {
    recentList.innerHTML = '<div class="dash-empty">No bills yet today</div>';
  } else {
    recent5.forEach(b => {
      const t = new Date(b.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      recentList.innerHTML += `
        <div class="dash-list-row">
          <div class="dash-list-left">
            <span class="dash-list-emoji">${b.method === 'gpay' ? '📱' : '💵'}</span>
            <div>
              <div class="dash-list-name">${b.billNo}</div>
              <div class="dash-list-sub">${t} · ${b.method?.toUpperCase()}</div>
            </div>
          </div>
          <span class="dash-bill-tag">₹${(b.total||0).toLocaleString('en-IN')}</span>
        </div>`;
    });
  }

  // ── Category Breakdown (bar chart)
  const chartEl = $('#categoryBreakdown');
  chartEl.innerHTML = '';
  const cats = CATEGORIES.filter(c => c.key !== 'all');
  const maxCount = Math.max(...cats.map(c => PRODUCTS.filter(p => p.cat === c.key).length));
  cats.forEach(c => {
    const count = PRODUCTS.filter(p => p.cat === c.key).length;
    const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
    chartEl.innerHTML += `
      <div class="dash-bar-row">
        <span class="dash-bar-label">${c.emoji} ${c.en}</span>
        <div class="dash-bar-track">
          <div class="dash-bar-fill" style="width:0%" data-pct="${pct}"></div>
        </div>
        <span class="dash-bar-count">${count}</span>
      </div>`;
  });
  // Animate bars after render
  requestAnimationFrame(() => {
    chartEl.querySelectorAll('.dash-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  });
}

// ═════════════════════════════════════════════
// PRODUCTS PAGE (OWNER)
// ═════════════════════════════════════════════
let prActiveCat = 'all';

function initOwnerPage() {
  const addBtn = $('#ownerAddBtn');
  if (!addBtn) return;

  // Add Item
  addBtn.addEventListener('click', () => {
    const name   = $('#ownerName').value.trim();
    const nameTa = $('#ownerNameTa').value.trim();
    const cat    = $('#ownerCategory').value;
    const price  = parseFloat($('#ownerPrice').value);
    const stock  = parseInt($('#ownerStock').value) || 0;
    const emoji  = $('#ownerEmoji').value.trim() || '🍪';
    if (!name || !price) { showToast('⚠️ Enter name and price'); return; }
    const newId = Math.max(...PRODUCTS.map(p => p.id)) + 1;
    PRODUCTS.push({ id: newId, cat, name_en: name, name_ta: nameTa || name, price, emoji, stock, popular: 0 });
    ['ownerName','ownerNameTa','ownerPrice','ownerStock','ownerEmoji'].forEach(id => { const el = $('#'+id); if(el) el.value=''; });
    initCategories(); renderProducts(); renderOwnerProducts();
    showToast('✅ ' + name + ' added!');
  });

  // Search
  const searchEl = $('#ownerSearch');
  if (searchEl) searchEl.addEventListener('input', () => renderOwnerProducts());

  // Sort
  const sortEl = $('#prSort');
  if (sortEl) sortEl.addEventListener('change', () => renderOwnerProducts());

  // Category chips — delegated
  document.addEventListener('click', e => {
    const chip = e.target.closest('.pr-chip');
    if (!chip) return;
    $$('.pr-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    prActiveCat = chip.dataset.cat || 'all';
    renderOwnerProducts();
  });
}

function buildCategoryChips() {
  const container = $('#prCatChips');
  if (!container) return;
  const cats = [...new Set(PRODUCTS.map(p => p.cat))];
  container.innerHTML = `<button class="pr-chip ${prActiveCat === 'all' ? 'active' : ''}" data-cat="all">All (${PRODUCTS.length})</button>`;
  cats.forEach(cat => {
    const catLabel = CATEGORIES.find(c => c.key === cat);
    const count = PRODUCTS.filter(p => p.cat === cat).length;
    const label = catLabel ? `${catLabel.emoji || ''} ${catLabel.en}` : cat;
    container.innerHTML += `<button class="pr-chip ${prActiveCat === cat ? 'active' : ''}" data-cat="${cat}">${label} (${count})</button>`;
  });
}

function renderOwnerProducts() {
  const grid = $('#ownerProductList');
  if (!grid) return;

  const search = ($('#ownerSearch')?.value || '').toLowerCase();
  const sort   = $('#prSort')?.value || 'name';

  let products = [...PRODUCTS];

  // Filter by category
  if (prActiveCat !== 'all') products = products.filter(p => p.cat === prActiveCat);

  // Filter by search
  if (search) products = products.filter(p =>
    p.name_en.toLowerCase().includes(search) || p.name_ta.includes(search) || p.cat.includes(search)
  );

  // Sort
  products.sort((a, b) => {
    if (sort === 'price-asc')   return a.price - b.price;
    if (sort === 'price-desc')  return b.price - a.price;
    if (sort === 'stock-asc')   return a.stock - b.stock;
    if (sort === 'stock-desc')  return b.stock - a.stock;
    return a.name_en.localeCompare(b.name_en); // 'name'
  });

  // Update stats bar
  const total = PRODUCTS.length;
  const low   = PRODUCTS.filter(p => p.stock > 0 && p.stock <= 5).length;
  const out   = PRODUCTS.filter(p => p.stock === 0).length;
  const cats  = new Set(PRODUCTS.map(p => p.cat)).size;
  const s = id => $('#' + id);
  if (s('prStatTotal')) s('prStatTotal').textContent = total;
  if (s('prStatLow'))   s('prStatLow').textContent   = low;
  if (s('prStatOut'))   s('prStatOut').textContent   = out;
  if (s('prStatCats'))  s('prStatCats').textContent  = cats;

  buildCategoryChips();
  grid.innerHTML = '';

  if (products.length === 0) {
    grid.innerHTML = '<div class="an-empty" style="grid-column:1/-1">No products found</div>';
    return;
  }

  products.forEach(p => {
    const catLabel = CATEGORIES.find(c => c.key === p.cat);
    const stockClass = p.stock === 0 ? 'out' : p.stock <= 5 ? 'low' : 'ok';
    const stockLabel = p.stock === 0 ? 'Out of Stock' : p.stock <= 5 ? `${p.stock} · Low ⚠` : `${p.stock} units`;
    const card = document.createElement('div');
    card.className = 'pr-card';
    card.dataset.productId = p.id;
    card.innerHTML = `
      <div class="pr-card-top">
        <span class="pr-card-emoji">${p.emoji}</span>
        <span class="pr-card-badge ${stockClass}">${stockLabel}</span>
      </div>
      <div class="pr-card-name">${p.name_en}</div>
      <div class="pr-card-cat">${catLabel ? catLabel.en : p.cat}</div>
      <div class="pr-card-footer">
        <span class="pr-card-price">₹${p.price}</span>
      </div>
      <button class="owner-add-stock-btn">+ Add Stock</button>
    `;

    card.querySelector('.owner-add-stock-btn').addEventListener('click', () => {
      openAddStockModal(p.id);
    });

    grid.appendChild(card);
  });
}

// ─── Add Stock Modal ────────────────────────
let addStockTargetId = null;

function initAddStockModal() {
  const modal    = $('#addStockModal');
  const qtyInput = $('#asQtyInput');
  if (!modal) return;

  const closeModal = () => modal.classList.add('hidden');

  $('#asCloseBtn').addEventListener('click', closeModal);
  $('#asCancelBtn').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  $('#asQtyMinus').addEventListener('click', () => {
    const v = parseInt(qtyInput.value) || 1;
    if (v > 1) { qtyInput.value = v - 1; updatePreview(); }
  });
  $('#asQtyPlus').addEventListener('click', () => {
    qtyInput.value = (parseInt(qtyInput.value) || 0) + 1;
    updatePreview();
  });
  qtyInput.addEventListener('input', updatePreview);
  qtyInput.addEventListener('keydown', e => { if (e.key === 'Enter') confirmAddStock(); });

  $('#asConfirmBtn').addEventListener('click', confirmAddStock);
}

function updatePreview() {
  const p = PRODUCTS.find(x => x.id === addStockTargetId);
  if (!p) return;
  const qty = parseInt($('#asQtyInput').value) || 0;
  $('#asNewStockPreview').textContent = `New total: ${p.stock + qty} units`;
}

function openAddStockModal(productId) {
  addStockTargetId = productId;
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  $('#asProductEmoji').textContent  = p.emoji;
  $('#asProductName').textContent   = p.name_en;
  $('#asCurrentStock').textContent  = `Current stock: ${p.stock} units`;
  $('#asQtyInput').value = 1;
  $('#asNewStockPreview').textContent = `New total: ${p.stock + 1} units`;
  $('#addStockModal').classList.remove('hidden');
  setTimeout(() => $('#asQtyInput').focus(), 150);
}

function confirmAddStock() {
  const qty = parseInt($('#asQtyInput').value);
  if (!qty || qty < 1) { showToast('⚠️ Enter a valid quantity'); return; }
  const p = PRODUCTS.find(x => x.id === addStockTargetId);
  if (!p) return;
  p.stock += qty;
  showToast(`✅ Added ${qty} units to ${p.name_en} · Now: ${p.stock}`);
  $('#addStockModal').classList.add('hidden');
  addStockTargetId = null;
  renderOwnerProducts();
}

// ═════════════════════════════════════════════
// ANALYTICS PAGE
// ═════════════════════════════════════════════
let currentAnPeriod = 'today';

function initAnalytics() {
  const el = $('#anDate');
  if (el) el.textContent = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  // Period tab clicks
  document.addEventListener('click', e => {
    const tab = e.target.closest('.an-tab');
    if (!tab) return;
    $$('.an-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentAnPeriod = tab.dataset.period;
    renderAnalytics(currentAnPeriod);
  });
}

function filterBills(period) {
  const all = JSON.parse(localStorage.getItem('bakery_pos_bills') || '[]');
  const now = new Date();
  return all.filter(b => {
    if (!b.date) return false;
    const d = new Date(b.date);
    if (period === 'today')  return d.toDateString() === now.toDateString();
    if (period === 'month')  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    if (period === 'year')   return d.getFullYear() === now.getFullYear();
    return true; // 'all'
  });
}

function fmt(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }

function renderAnalytics(period) {
  const bills = filterBills(period);

  // Totals
  const total    = bills.reduce((s, b) => s + (b.total || 0), 0);
  const cash     = bills.filter(b => b.method === 'cash');
  const gpay     = bills.filter(b => b.method === 'gpay');
  const cashAmt  = cash.reduce((s, b) => s + (b.total || 0), 0);
  const gpayAmt  = gpay.reduce((s, b) => s + (b.total || 0), 0);
  const discAmt  = bills.reduce((s, b) => s + (b.discount || 0), 0);
  const avg      = bills.length ? total / bills.length : 0;

  // Peak hour
  const hourMap = {};
  bills.forEach(b => {
    const h = new Date(b.date).getHours();
    hourMap[h] = (hourMap[h] || 0) + 1;
  });
  const peakH = Object.keys(hourMap).sort((a, b) => hourMap[b] - hourMap[a])[0];
  const peakStr = peakH != null
    ? `${peakH % 12 || 12}${+peakH < 12 ? 'am' : 'pm'}`
    : '—';

  // Update cards
  $('#anRevenue').textContent = fmt(total);
  $('#anBillCount').textContent = `${bills.length} bill${bills.length !== 1 ? 's' : ''}`;
  $('#anCash').textContent = fmt(cashAmt);
  $('#anCashCount').textContent = `${cash.length} bill${cash.length !== 1 ? 's' : ''}`;
  $('#anGpay').textContent = fmt(gpayAmt);
  $('#anGpayCount').textContent = `${gpay.length} bill${gpay.length !== 1 ? 's' : ''}`;
  $('#anAvg').textContent = fmt(avg);
  $('#anPeakHour').textContent = peakStr;
  $('#anDiscount').textContent = fmt(discAmt);

  // Split bar
  const cashPct = total > 0 ? (cashAmt / total) * 100 : 50;
  const gpayPct = 100 - cashPct;
  const cashBar = $('#anSplitCash');
  const gpayBar = $('#anSplitGpay');
  requestAnimationFrame(() => {
    cashBar.style.width = cashPct + '%';
    gpayBar.style.width = gpayPct + '%';
  });
  cashBar.textContent = cashPct > 10 ? `Cash ${cashPct.toFixed(0)}%` : '';
  gpayBar.textContent = gpayPct > 10 ? `GPay ${gpayPct.toFixed(0)}%` : '';
  $('#anSplitLabel').textContent = total > 0
    ? `Cash ${fmt(cashAmt)}  ·  GPay ${fmt(gpayAmt)}`
    : 'No data yet';

  // Transactions
  const txList = $('#anTransactionList');
  const recent = [...bills].reverse().slice(0, 20);
  $('#anTxCount').textContent = bills.length;
  txList.innerHTML = '';
  if (recent.length === 0) {
    txList.innerHTML = '<div class="an-empty">No transactions in this period</div>';
  } else {
    recent.forEach(b => {
      const m = b.method || 'cash';
      const t = new Date(b.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const d = new Date(b.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      txList.innerHTML += `
        <div class="an-tx-row">
          <div class="an-tx-method ${m}">${m === 'gpay' ? '📱' : '💵'}</div>
          <div class="an-tx-info">
            <div class="an-tx-bill">${b.billNo || 'BILL'}</div>
            <div class="an-tx-time">${d} · ${t}</div>
          </div>
          <span class="an-tx-tag ${m}">${m.toUpperCase()}</span>
          <span class="an-tx-amt">${fmt(b.total || 0)}</span>
        </div>`;
    });
  }

  // Top Products
  const topList = $('#anTopProducts');
  const sorted = [...PRODUCTS].sort((a, b) => (b.popular || 0) - (a.popular || 0)).slice(0, 10);
  const maxPop = sorted[0]?.popular || 1;
  topList.innerHTML = '';
  sorted.forEach((p, i) => {
    const pct = maxPop > 0 ? ((p.popular || 0) / maxPop) * 100 : 0;
    topList.innerHTML += `
      <div class="an-top-row">
        <span class="an-top-rank">${i + 1}</span>
        <span class="an-top-emoji">${p.emoji}</span>
        <div class="an-top-info">
          <div class="an-top-name">${p.name_en}</div>
          <div class="an-top-bar-track">
            <div class="an-top-bar-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <span class="an-top-price">₹${p.price}</span>
      </div>`;
  });
}

