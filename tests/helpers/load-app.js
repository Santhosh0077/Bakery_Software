'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

class FakeClassList {
  constructor(owner, initial = '') {
    this.owner = owner;
    this.set = new Set();
    initial.split(/\s+/).filter(Boolean).forEach((name) => this.set.add(name));
    this._sync();
  }

  add(...names) {
    names.filter(Boolean).forEach((name) => this.set.add(name));
    this._sync();
  }

  remove(...names) {
    names.forEach((name) => this.set.delete(name));
    this._sync();
  }

  toggle(name, force) {
    if (force === true) {
      this.set.add(name);
      this._sync();
      return true;
    }
    if (force === false) {
      this.set.delete(name);
      this._sync();
      return false;
    }
    if (this.set.has(name)) {
      this.set.delete(name);
      this._sync();
      return false;
    }
    this.set.add(name);
    this._sync();
    return true;
  }

  contains(name) {
    return this.set.has(name);
  }

  toString() {
    return [...this.set].join(' ');
  }

  _sync() {
    this.owner._className = this.toString();
  }
}

class FakeElement {
  constructor(ownerDocument, options = {}) {
    this.ownerDocument = ownerDocument;
    this.tagName = (options.tagName || 'div').toUpperCase();
    this.id = options.id || '';
    this.dataset = { ...(options.dataset || {}) };
    this.style = {};
    this.attributes = new Map();
    this.listeners = {};
    this.children = [];
    this.parentElement = null;
    this._textContent = '';
    this._innerHTML = '';
    this._className = '';
    this.value = options.value || '';
    this.disabled = false;
    this.draggable = false;
    this.classList = new FakeClassList(this, options.className || '');
    this.className = options.className || '';
  }

  set className(value) {
    this.classList = new FakeClassList(this, value || '');
  }

  get className() {
    return this.classList.toString();
  }

  set textContent(value) {
    this._textContent = String(value);
  }

  get textContent() {
    return this._textContent;
  }

  set innerHTML(value) {
    this._innerHTML = String(value);
    this.children = [];
  }

  get innerHTML() {
    return this._innerHTML;
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  remove() {
    if (!this.parentElement) return;
    const siblings = this.parentElement.children;
    const index = siblings.indexOf(this);
    if (index >= 0) siblings.splice(index, 1);
    this.parentElement = null;
  }

  addEventListener(type, listener) {
    this.listeners[type] ||= [];
    this.listeners[type].push(listener);
  }

  dispatchEvent(event) {
    const listeners = this.listeners[event.type] || [];
    listeners.forEach((listener) => listener(event));
  }

  setAttribute(name, value) {
    const normalized = String(value);
    this.attributes.set(name, normalized);
    if (name === 'id') this.id = normalized;
    if (name === 'class') this.className = normalized;
    if (name.startsWith('data-')) {
      const key = name
        .slice(5)
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      this.dataset[key] = normalized;
    }
  }

  getAttribute(name) {
    if (name === 'class') return this.className;
    if (name === 'id') return this.id;
    return this.attributes.get(name) ?? null;
  }

  focus() {}

  scrollIntoView() {}

  contains(node) {
    if (this === node) return true;
    return this.children.some((child) => child.contains(node));
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (matchesSelector(current, selector)) return current;
      current = current.parentElement;
    }
    return null;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }

  querySelectorAll(selector) {
    const results = [];
    const visit = (node) => {
      node.children.forEach((child) => {
        if (matchesSelector(child, selector)) results.push(child);
        visit(child);
      });
    };
    visit(this);
    return results;
  }
}

class FakeDocument {
  constructor() {
    this.body = new FakeElement(this, { tagName: 'body' });
    this.listeners = {};
    this.activeElement = this.body;
  }

  createElement(tagName) {
    return new FakeElement(this, { tagName });
  }

  addEventListener(type, listener) {
    this.listeners[type] ||= [];
    this.listeners[type].push(listener);
  }

  dispatchEvent(event) {
    (this.listeners[event.type] || []).forEach((listener) => listener(event));
  }

  querySelector(selector) {
    return this.body.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.body.querySelectorAll(selector);
  }
}

function matchesSelector(element, selector) {
  if (!selector) return false;

  if (selector.startsWith('#')) {
    return element.id === selector.slice(1);
  }

  if (selector.startsWith('.')) {
    const classNames = selector.split('.').filter(Boolean);
    return classNames.every((name) => element.classList.contains(name));
  }

  if (selector.startsWith('[') && selector.endsWith(']')) {
    const attr = selector.slice(1, -1);
    if (attr === 'data-en') return element.attributes.has('data-en');
    return false;
  }

  const attrMatch = selector.match(/^\.([a-zA-Z0-9_-]+)\[data-id="([^"]+)"\]$/);
  if (attrMatch) {
    return element.classList.contains(attrMatch[1]) && String(element.dataset.id) === attrMatch[2];
  }

  return element.tagName.toLowerCase() === selector.toLowerCase();
}

class FakeStorage {
  constructor() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(key, String(value));
  }

  removeItem(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

function appendElement(document, element) {
  document.body.appendChild(element);
  return element;
}

function buildDocument() {
  const document = new FakeDocument();

  const ids = [
    'greeting', 'liveClock', 'searchInput', 'resultCount', 'searchClear', 'recentStrip',
    'recentItems', 'categoryTabs', 'productGrid', 'billBody', 'billItems', 'emptyCart',
    'billFooter', 'subtotalAmt', 'discountAmt', 'discountRow', 'grandTotal', 'generateBillBtn',
    'billDate', 'billNumber', 'cartBubble', 'mobileBottomNav', 'mobileBillFab', 'mobileBillBadge',
    'productsArea', 'dashboardPage', 'ownerPage', 'analyticsPage', 'billPanel', 'paymentModal',
    'paymentTotalAmt', 'cashInput', 'changeAmt', 'changeDisplay', 'cashSection', 'confirmPayBtn',
    'successOverlay', 'successBillNo', 'successChange', 'newBillBtn', 'qtyModal', 'qtyDisplay',
    'toastContainer', 'discountInput', 'lowStockList', 'lowStockCount', 'recentBillsList',
    'recentBillsCount', 'categoryBreakdown', 'statTotalProducts', 'statCategories', 'statLowStock',
    'statTopItem', 'statTodayBills', 'statRevenue', 'anRevenue', 'anBillCount', 'anCash',
    'anCashCount', 'anGpay', 'anGpayCount', 'anAvg', 'anPeakHour', 'anDiscount', 'anSplitCash',
    'anSplitGpay', 'anSplitLabel', 'anTransactionList', 'anTxCount', 'anTopProducts'
  ];

  ids.forEach((id) => {
    appendElement(document, new FakeElement(document, { id }));
  });

  document.querySelector('#discountInput').value = '0';
  document.querySelector('#searchInput').tagName = 'INPUT';
  document.querySelector('#cashInput').tagName = 'INPUT';

  const sidebarPages = ['billing', 'analytics', 'owner', 'analytics2', 'settings'];
  sidebarPages.forEach((page) => {
    appendElement(document, new FakeElement(document, {
      tagName: 'button',
      className: page === 'billing' ? 'sidebar-btn active' : 'sidebar-btn',
      dataset: { page }
    }));
  });

  ['billing', 'analytics', 'owner', 'analytics2'].forEach((page) => {
    appendElement(document, new FakeElement(document, {
      tagName: 'button',
      className: page === 'billing' ? 'mob-nav-btn active' : 'mob-nav-btn',
      dataset: { page }
    }));
  });

  ['en', 'ta'].forEach((lang, index) => {
    appendElement(document, new FakeElement(document, {
      tagName: 'button',
      className: index === 0 ? 'lang-btn active' : 'lang-btn',
      dataset: { lang }
    }));
  });

  ['percent', 'amount'].forEach((type, index) => {
    appendElement(document, new FakeElement(document, {
      tagName: 'button',
      className: index === 0 ? 'disc-btn active' : 'disc-btn',
      dataset: { type }
    }));
  });

  ['cash', 'gpay'].forEach((method, index) => {
    appendElement(document, new FakeElement(document, {
      tagName: 'button',
      className: index === 0 ? 'pay-option selected' : 'pay-option',
      dataset: { method }
    }));
  });

  return document;
}

function loadApp() {
  const document = buildDocument();
  const localStorage = new FakeStorage();
  const window = { innerWidth: 1280 };

  const context = {
    console,
    document,
    localStorage,
    window,
    MutationObserver: class {
      observe() {}
      disconnect() {}
    },
    requestAnimationFrame: (fn) => fn(),
    setTimeout: () => 0,
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {},
    Date,
    Math,
    JSON,
    parseInt,
    parseFloat
  };

  context.globalThis = context;
  window.document = document;
  window.localStorage = localStorage;
  window.requestAnimationFrame = context.requestAnimationFrame;
  window.setTimeout = context.setTimeout;
  window.clearTimeout = context.clearTimeout;
  window.setInterval = context.setInterval;
  window.clearInterval = context.clearInterval;

  const source = fs.readFileSync(path.join(process.cwd(), 'app.js'), 'utf8');
  const exportShim = `
    globalThis.__appTestHooks = {
      PRODUCTS,
      CATEGORIES,
      dom,
      addToCart,
      removeFromCart,
      updateQty,
      updateTotals,
      getGrandTotal,
      saveBillToHistory,
      navigateToPage,
      filterBills,
      renderAnalytics,
      renderDashboard,
      startNewBill,
      getElement: (id) => document.querySelector('#' + id),
      getCart: () => JSON.parse(JSON.stringify(cart)),
      setCart: (next) => { cart = JSON.parse(JSON.stringify(next)); },
      setDiscount: (type, value) => {
        discountType = type;
        discountValue = value;
        dom.discountInput.value = String(value);
      },
      setWindowWidth: (value) => { window.innerWidth = value; },
      setBills: (bills) => localStorage.setItem('bakery_pos_bills', JSON.stringify(bills)),
      getBills: () => JSON.parse(localStorage.getItem('bakery_pos_bills') || '[]'),
      getStorage: (key) => localStorage.getItem(key),
      clearStorage: () => localStorage.clear(),
      setRenderDashboard: (fn) => { renderDashboard = fn; },
      setRenderOwnerProducts: (fn) => { renderOwnerProducts = fn; },
      setRenderAnalytics: (fn) => { renderAnalytics = fn; },
      setShowToast: (fn) => { showToast = fn; },
      setSaveRecentItem: (fn) => { saveRecentItem = fn; },
      setUpdateCartUI: (fn) => { updateCartUI = fn; },
      getCurrentPage: () => currentPage,
      resetState: () => {
        cart = [];
        currentLang = 'en';
        currentCategory = 'all';
        discountType = 'percent';
        discountValue = 0;
        billCount = 0;
        selectedPayMethod = 'cash';
        currentPage = 'billing';
        dom.discountInput.value = '0';
        dom.billPanel.className = '';
        dom.billPanel.style.display = '';
        dom.productsArea.style.display = '';
        dom.dashboardPage.className = 'hidden';
        dom.ownerPage.className = 'hidden';
        dom.analyticsPage.className = 'hidden';
        dom.mobileBillFab.className = 'mobile-bill-fab hidden';
        dom.mobileBillBadge.className = 'mob-fab-badge hidden';
        dom.cartBubble.className = 'cart-bubble hidden';
        dom.billFooter.className = 'hidden';
        dom.emptyCart.style.display = '';
        dom.billItems.style.display = '';
        dom.generateBtn.disabled = true;
        localStorage.clear();
      }
    };
  `;

  vm.runInNewContext(`${source}\n${exportShim}`, context, { filename: 'app.js' });
  return context.__appTestHooks;
}

module.exports = { loadApp };
