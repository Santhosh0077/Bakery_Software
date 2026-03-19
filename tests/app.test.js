'use strict';

const assert = require('node:assert/strict');
const { loadApp } = require('./helpers/load-app');

function billAt(date, overrides = {}) {
  return {
    billNo: overrides.billNo || `BILL-${Date.parse(date)}`,
    total: overrides.total ?? 100,
    method: overrides.method || 'cash',
    change: overrides.change ?? 0,
    items: overrides.items || [],
    date: date.toISOString(),
    ...overrides
  };
}

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test('updateTotals applies percent and amount discounts correctly', () => {
  const app = loadApp();
  app.resetState();
  app.setCart([
    { productId: 1, qty: 2 },
    { productId: 13, qty: 1 }
  ]);

  app.setDiscount('percent', 10);
  app.updateTotals();
  assert.equal(app.dom.subtotalAmt.textContent, '₹190.00');
  assert.equal(app.getGrandTotal(), 171);

  app.setDiscount('amount', 1000);
  app.updateTotals();
  assert.equal(app.dom.discountAmt.textContent, '−₹190.00');
  assert.equal(app.dom.grandTotal.textContent, '₹0.00');
});

test('addToCart merges quantities and persists the cart', () => {
  const app = loadApp();
  app.resetState();

  app.addToCart(1);
  app.addToCart(1, 2);

  assert.deepEqual(app.getCart(), [{ productId: 1, qty: 3 }]);
  assert.deepEqual(JSON.parse(app.getStorage('bakery_pos_cart')), [{ productId: 1, qty: 3 }]);
  assert.equal(app.dom.cartBubble.textContent, '3');
  assert.equal(app.dom.generateBtn.disabled, false);
});

test('saveBillToHistory prepends a bill snapshot and caps history at 100 items', () => {
  const app = loadApp();
  app.resetState();
  app.setCart([
    { productId: 1, qty: 1 },
    { productId: 13, qty: 2 }
  ]);

  const existing = Array.from({ length: 100 }, (_, index) => ({
    billNo: `OLD-${index}`,
    total: index,
    method: 'cash',
    change: 0,
    items: [],
    date: new Date(2026, 0, 1 + index).toISOString()
  }));
  app.setBills(existing);

  app.saveBillToHistory('BILL-NEW', 140, 'gpay', 0);

  const stored = app.getBills();
  assert.equal(stored.length, 100);
  assert.equal(stored[0].billNo, 'BILL-NEW');
  assert.equal(stored[0].method, 'gpay');
  assert.deepEqual(stored[0].items, [
    { name: 'Garlic Bread', qty: 1, price: 80 },
    { name: 'Egg Puff', qty: 2, price: 30 }
  ]);
});

test('navigateToPage syncs section visibility and active navigation states', () => {
  const app = loadApp();
  app.resetState();
  app.setWindowWidth(390);
  app.setRenderDashboard(() => {});
  app.setRenderOwnerProducts(() => {});
  app.setRenderAnalytics(() => {});

  app.navigateToPage('owner');
  assert.equal(app.getCurrentPage(), 'owner');
  assert.equal(app.dom.productsArea.style.display, 'none');
  assert.equal(app.dom.billPanel.style.display, 'none');
  assert.equal(app.dom.ownerPage.classList.contains('hidden'), false);

  app.navigateToPage('billing');
  assert.equal(app.getCurrentPage(), 'billing');
  assert.equal(app.dom.productsArea.style.display, '');
  assert.equal(app.dom.billPanel.style.display, '');
  assert.equal(app.dom.mobileBillFab.classList.contains('hidden'), true);
});

test('filterBills separates today, month, year, and all-time bills', () => {
  const app = loadApp();
  app.resetState();

  const now = new Date();
  const today = billAt(now, { billNo: 'TODAY' });
  const sameMonth = billAt(new Date(now.getFullYear(), now.getMonth(), now.getDate() === 1 ? 2 : 1, 12), { billNo: 'MONTH' });
  const sameYearDifferentMonth = billAt(
    new Date(now.getFullYear(), now.getMonth() === 0 ? 11 : 0, 15, 12),
    { billNo: 'YEAR' }
  );
  const previousYear = billAt(new Date(now.getFullYear() - 1, now.getMonth(), 15, 12), { billNo: 'ALL' });

  app.setBills([today, sameMonth, sameYearDifferentMonth, previousYear]);

  assert.equal(app.filterBills('today').length, 1);
  assert.equal(app.filterBills('month').length, 2);
  assert.equal(app.filterBills('year').length, 3);
  assert.equal(app.filterBills('all').length, 4);
});

test('renderAnalytics writes revenue and payment split summaries to the DOM', () => {
  const app = loadApp();
  app.resetState();

  const now = new Date();
  app.setBills([
    billAt(now, { total: 120, method: 'cash', discount: 10, billNo: 'A1' }),
    billAt(new Date(now.getTime() - 60 * 60 * 1000), { total: 80, method: 'gpay', discount: 0, billNo: 'A2' })
  ]);

  app.renderAnalytics('all');

  assert.equal(app.getElement('anRevenue').textContent, '₹200');
  assert.equal(app.getElement('anCash').textContent, '₹120');
  assert.equal(app.getElement('anGpay').textContent, '₹80');
  assert.equal(app.getElement('anDiscount').textContent, '₹10');
  assert.match(app.getElement('anSplitLabel').textContent, /Cash ₹120/);
  assert.match(app.getElement('anSplitLabel').textContent, /GPay ₹80/);
});

let failed = 0;

for (const { name, fn } of tests) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${name}`);
    console.error(error.stack);
  }
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed.`);
  process.exit(1);
}

console.log(`\n${tests.length} test(s) passed.`);
