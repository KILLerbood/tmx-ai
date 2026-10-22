// Live covers for the portfolio cards: a shop, a CRM and an AI tool, each running
// on its own while it is on screen (paused off-screen so the page never lags).
import { h, getLang } from './core.js';
import { money, onVisible, reduced } from './demos/kit.js';

const P = 'assets/img/photos/';
const L = (d) => d[getLang()] || d.de;
const img = (file, alt = '', cls = '') => h('img', { src: P + file, alt, class: cls, loading: 'lazy', decoding: 'async' });

/* ---------- 1. STRIDE sneaker shop ---------- */
function shopCover() {
  const shoes = [
    ['shoe-1.jpg', 'Cloud White', 129], ['shoe-2.jpg', 'Velocity Run', 149],
    ['shoe-3.jpg', 'Harbor Boot', 189], ['shoe-4.jpg', 'Prism Low', 119]
  ];
  const cities = { de: ['München', 'Hamburg', 'Wien', 'Zürich', 'Köln'], en: ['Munich', 'Hamburg', 'Vienna', 'Zurich', 'Cologne'], ru: ['Мюнхен', 'Гамбург', 'Вена', 'Цюрих', 'Кёльн'] };
  const t = L({ de: { order: 'Neue Bestellung aus', cart: 'Warenkorb', hero: 'Leicht. Schnell. Deins.' }, en: { order: 'New order from', cart: 'Cart', hero: 'Light. Fast. Yours.' }, ru: { order: 'Новый заказ из', cart: 'Корзина', hero: 'Легко. Быстро. Твоё.' } });
  const heroes = shoes.map(([f, n], i) => img(f, n, 'sc-shop__heroimg' + (i === 0 ? ' is-on' : '')));
  const name = h('b', {}, shoes[0][1]), price = h('span', {}, money(shoes[0][2]));
  const count = h('i', {}, '0');
  const toast = h('div', { class: 'sc-toast' });
  const strip = h('div', { class: 'sc-shop__strip' }, ...shoes.concat(shoes).map(([f, n, p]) => h('div', { class: 'sc-shop__card' }, img(f, ''), h('small', {}, n), h('b', {}, money(p)))));
  let i = 0, orders = 0;
  const step = () => {
    i = (i + 1) % shoes.length;
    heroes.forEach((el, k) => el.classList.toggle('is-on', k === i));
    name.textContent = shoes[i][1]; price.textContent = money(shoes[i][2]);
    if (i % 2 === 0) {
      orders++; count.textContent = String(orders);
      toast.textContent = '🛍 ' + t.order + ' ' + L(cities)[orders % 5];
      toast.classList.remove('is-in'); void toast.offsetWidth; toast.classList.add('is-in');
    }
  };
  const root = h('div', { class: 'sc sc-shop' },
    h('div', { class: 'sc-shop__nav' }, h('b', {}, 'STRIDE'), h('span', {}, 'Men · Women · Sale'), h('span', { class: 'sc-shop__cart' }, t.cart, ' ', count)),
    h('div', { class: 'sc-shop__hero' }, ...heroes, h('div', { class: 'sc-shop__copy' }, h('small', {}, t.hero), name, price)),
    strip, toast);
  let timer;
  onVisible(root, () => { if (!reduced && !timer) timer = setInterval(step, 2200); root.classList.add('is-run'); }, () => { clearInterval(timer); timer = null; root.classList.remove('is-run'); });
  return root;
}

/* ---------- 2. Kundenwerk CRM ---------- */
function crmCover() {
  const t = L({
    de: { cols: ['Anfrage', 'Angebot', 'Gewonnen'], pipe: 'Pipeline', won: 'Gewonnen diesen Monat', task: 'Automatisch: Angebot gesendet' },
    en: { cols: ['Lead', 'Proposal', 'Won'], pipe: 'Pipeline', won: 'Won this month', task: 'Automatic: proposal sent' },
    ru: { cols: ['Заявка', 'Предложение', 'Сделка'], pipe: 'Воронка', won: 'Выиграно за месяц', task: 'Автоматически: КП отправлено' }
  });
  const deals = [
    ['avatar-1.jpg', 'Bäckerei Rauch', 4800], ['avatar-2.jpg', 'Studio Lindt', 12500], ['avatar-3.jpg', 'Autohaus Kern', 21000],
    ['avatar-4.jpg', 'Praxis Dr. Vogel', 7900], ['avatar-2.jpg', 'Hotel Seeblick', 15400], ['avatar-1.jpg', 'Weingut Mohr', 6300]
  ];
  const cols = t.cols.map((c) => h('div', { class: 'sc-crm__col' }, h('small', {}, c)));
  const wonEl = h('b', {}, money(38200));
  const pipeEl = h('b', {}, money(68400));
  const note = h('div', { class: 'sc-toast sc-toast--crm' }, '⚡ ' + t.task);
  const cards = deals.map(([a, n, v], i) => {
    const c = h('div', { class: 'sc-crm__card' }, img(a, '', 'sc-av'), h('div', {}, h('b', {}, n), h('small', {}, money(v))));
    c.dataset.col = String(i % 2);
    cols[i % 2].append(c);
    return c;
  });
  let won = 38200, k = 0;
  const step = () => {
    const c = cards[k % cards.length]; k++;
    let col = Number(c.dataset.col) + 1;
    if (col > 2) col = 0;
    c.dataset.col = String(col);
    c.classList.remove('is-move'); void c.offsetWidth; c.classList.add('is-move');
    cols[col].append(c);
    if (col === 2) { won += deals[(k - 1) % deals.length][2]; wonEl.textContent = money(won); c.classList.add('is-won'); } else c.classList.remove('is-won');
    if (col === 1) { note.classList.remove('is-in'); void note.offsetWidth; note.classList.add('is-in'); }
    pipeEl.textContent = money(68400 + (k % 5) * 3100);
  };
  const root = h('div', { class: 'sc sc-crm' },
    h('div', { class: 'sc-crm__top' }, h('b', { class: 'sc-crm__logo' }, '◆ Kundenwerk'), h('div', { class: 'sc-crm__kpi' }, h('small', {}, t.pipe), pipeEl), h('div', { class: 'sc-crm__kpi' }, h('small', {}, t.won), wonEl)),
    h('div', { class: 'sc-crm__board' }, ...cols), note);
  let timer;
  onVisible(root, () => { if (!reduced && !timer) timer = setInterval(step, 1500); }, () => { clearInterval(timer); timer = null; });
  return root;
}

/* ---------- 3. Lexa document AI ---------- */
function aiCover() {
  const t = L({
    de: { doc: 'RECHNUNG', fields: [['Lieferant', 'Holzbau Brandt GmbH'], ['Rechnungs-Nr.', 'RE-2026-0418'], ['Datum', '14.10.2026'], ['Netto', '2.340,00 €'], ['USt. 19 %', '444,60 €'], ['Brutto', '2.784,60 €']], done: 'In DATEV gebucht ✓', scan: 'KI liest Dokument …', ai: 'KI' },
    en: { doc: 'INVOICE', fields: [['Supplier', 'Holzbau Brandt GmbH'], ['Invoice no.', 'RE-2026-0418'], ['Date', '14 Oct 2026'], ['Net', '€2,340.00'], ['VAT 19%', '€444.60'], ['Total', '€2,784.60']], done: 'Booked in DATEV ✓', scan: 'AI is reading …', ai: 'AI' },
    ru: { doc: 'СЧЁТ', fields: [['Поставщик', 'Holzbau Brandt GmbH'], ['Номер', 'RE-2026-0418'], ['Дата', '14.10.2026'], ['Нетто', '2 340,00 €'], ['НДС 19 %', '444,60 €'], ['Брутто', '2 784,60 €']], done: 'Проведено в DATEV ✓', scan: 'ИИ читает документ …', ai: 'ИИ' }
  });
  const doc = h('div', { class: 'sc-ai__doc' },
    h('b', {}, t.doc), h('small', {}, 'Holzbau Brandt GmbH · Kiel'),
    ...[90, 70, 80, 55, 85, 40, 65].map((w) => { const l = h('i'); l.style.setProperty('width', w + '%'); return l; }),
    h('em', {}, t.fields[5][1]), h('span', { class: 'sc-ai__beam' }));
  const rows = t.fields.map(([k, v]) => h('li', {}, h('small', {}, k), h('b', {}, v), h('span', { class: 'sc-ai__conf' }, h('i'))));
  const status = h('div', { class: 'sc-ai__status' }, t.scan);
  const root = h('div', { class: 'sc sc-ai' },
    h('div', { class: 'sc-ai__top' }, h('b', {}, 'Lexa'), h('span', { class: 'sc-ai__tag' }, t.ai)),
    h('div', { class: 'sc-ai__grid' }, doc, h('ul', { class: 'sc-ai__fields' }, ...rows)), status);
  let timers = [];
  const run = () => {
    timers.forEach(clearTimeout); timers = [];
    root.classList.remove('is-done'); root.classList.add('is-scan');
    rows.forEach((r) => r.classList.remove('is-on'));
    status.textContent = t.scan;
    rows.forEach((r, i) => timers.push(setTimeout(() => {
      r.classList.add('is-on');
      r.querySelector('.sc-ai__conf i').style.setProperty('width', 90 + ((i * 7) % 10) + '%');
    }, 700 + i * 420)));
    timers.push(setTimeout(() => { root.classList.remove('is-scan'); root.classList.add('is-done'); status.textContent = t.done; }, 700 + rows.length * 420 + 200));
  };
  let loop;
  onVisible(root, () => { if (reduced) { rows.forEach((r) => r.classList.add('is-on')); status.textContent = t.done; return; } if (!loop) { run(); loop = setInterval(run, 5600); } }, () => { clearInterval(loop); loop = null; timers.forEach(clearTimeout); });
  return root;
}

export const SHOWCASES = { shop: shopCover, crm: crmCover, ai: aiCover };
