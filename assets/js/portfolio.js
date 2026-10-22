// Portfolio page: ten sample projects shown one at a time. Scrolling pins the stage;
// each step a particle wave sweeps the current project out (alternating right / left)
// and brings the next one in. Every mockup animates only while it is on screen.
import { h, getLang } from './core.js';
import { svg, money, num, onVisible, reduced } from './demos/kit.js';
import { SHOWCASES } from './showcase.js';

const P = 'assets/img/photos/';
const L = (d) => (d && typeof d === 'object' && !Array.isArray(d) ? d[getLang()] || d.de : d);
const img = (file, cls = '', alt = '') => h('img', { src: P + file, alt, class: cls, loading: 'lazy', decoding: 'async' });
const live = (el, fn, ms) => { let tm; onVisible(el, () => { if (!reduced && !tm) { fn(); tm = setInterval(fn, ms); } }, () => { clearInterval(tm); tm = null; }); return el; };
const replay = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

const UI = {
  de: { eyebrow: 'Portfolio', scroll: 'Scrollen für das nächste Projekt', prev: 'Vorheriges Projekt', next: 'Nächstes Projekt', sample: 'Beispielprojekt', of: 'von' },
  en: { eyebrow: 'Portfolio', scroll: 'Scroll for the next project', prev: 'Previous project', next: 'Next project', sample: 'Sample project', of: 'of' },
  ru: { eyebrow: 'Портфолио', scroll: 'Прокрутите к следующему проекту', prev: 'Предыдущий проект', next: 'Следующий проект', sample: 'Пример проекта', of: 'из' }
};

/* ---------- Device frames ---------- */
const browser = (url, body, cls = '') => h('div', { class: 'pf-browser ' + cls },
  h('div', { class: 'pf-browser__bar' }, h('i'), h('i'), h('i'), h('span', {}, '🔒 ' + url)), body);
const phone = (body, cls = '') => h('div', { class: 'pf-phone ' + cls }, h('span', { class: 'pf-phone__notch' }), h('div', { class: 'pf-phone__screen' }, body));

/* ---------- Mockups ---------- */
function metaCampaign() {
  const t = L({ de: { cta: 'Jetzt shoppen', sp: 'Gesponsert', reach: 'Reichweite', clicks: 'Klicks', ctr: 'CTR', roas: 'ROAS', camp: 'Kampagne · Herbst-Glow', live: 'Aktiv' }, en: { cta: 'Shop now', sp: 'Sponsored', reach: 'Reach', clicks: 'Clicks', ctr: 'CTR', roas: 'ROAS', camp: 'Campaign · Autumn Glow', live: 'Active' }, ru: { cta: 'Купить', sp: 'Реклама', reach: 'Охват', clicks: 'Клики', ctr: 'CTR', roas: 'ROAS', camp: 'Кампания · Осенний Glow', live: 'Активна' } });
  const frames = ['skin-hero.jpg', 'skin-serum.jpg', 'skin-cream.jpg', 'skin-oil.jpg'];
  const pics = frames.map((f, i) => img(f, 'pf-story__img' + (i ? '' : ' is-on')));
  const bars = frames.map(() => h('i', {}, h('b')));
  const story = phone(h('div', { class: 'pf-story' }, ...pics,
    h('div', { class: 'pf-story__bars' }, ...bars),
    h('div', { class: 'pf-story__head' }, h('span', { class: 'pf-story__av' }, 'G'), h('b', {}, 'glowandco'), h('small', {}, t.sp)),
    h('div', { class: 'pf-story__cta' }, '⌃', h('b', {}, t.cta))));
  const vals = { reach: 48200, clicks: 1630, ctr: 3.4, roas: 4.1 };
  const cells = Object.keys(vals).map((k) => { const b = h('b'); return [k, b, h('div', { class: 'pf-am__kpi' }, h('small', {}, t[k]), b)]; });
  const paint = () => cells.forEach(([k, b]) => { b.textContent = k === 'ctr' ? num(vals[k], 1) + ' %' : k === 'roas' ? num(vals[k], 1) + '×' : num(vals[k]); });
  paint();
  const panel = h('div', { class: 'pf-am' },
    h('div', { class: 'pf-am__head' }, h('span', { class: 'pf-am__logo' }, '∞'), h('b', {}, t.camp), h('span', { class: 'pf-am__live' }, '● ' + t.live)),
    h('div', { class: 'pf-am__grid' }, ...cells.map((c) => c[2])),
    h('div', { class: 'pf-am__chart' }, ...[30, 42, 38, 55, 61, 58, 72, 80, 77, 92].map((v) => { const i = h('i'); i.style.setProperty('--h', v + '%'); return i; })));
  let f = 0;
  const root = h('div', { class: 'pf-dual' }, story, panel);
  live(root, () => {
    pics.forEach((p, k) => p.classList.toggle('is-on', k === f));
    bars.forEach((b, k) => { b.classList.toggle('is-done', k < f); b.classList.toggle('is-run', k === f); if (k === f) replay(b, 'is-run'); });
    f = (f + 1) % frames.length;
    vals.reach += 380 + Math.round(Math.random() * 300); vals.clicks += 9 + Math.round(Math.random() * 12);
    vals.ctr = Math.min(4.2, vals.ctr + 0.02); vals.roas = Math.min(4.9, vals.roas + 0.03);
    paint();
  }, 2400);
  return root;
}

function restaurant() {
  const t = L({ de: { nav: ['Speisekarte', 'Über uns', 'Reservieren'], hero: 'Echte italienische Küche in Hamburg', res: 'Tisch reservieren', guests: 'Gäste', ok: 'Tisch für 2 reserviert ✓ – Bestätigung per E-Mail', days: ['Heute', 'Morgen', 'Sa'] }, en: { nav: ['Menu', 'About', 'Book'], hero: 'Real Italian cooking in Hamburg', res: 'Book a table', guests: 'Guests', ok: 'Table for 2 booked ✓ – confirmation by email', days: ['Today', 'Tomorrow', 'Sat'] }, ru: { nav: ['Меню', 'О нас', 'Бронь'], hero: 'Настоящая итальянская кухня в Гамбурге', res: 'Забронировать стол', guests: 'Гостей', ok: 'Стол на 2 забронирован ✓ – подтверждение по e-mail', days: ['Сегодня', 'Завтра', 'Сб'] } });
  const days = t.days.map((d, i) => h('span', { class: i === 0 ? 'is-on' : '' }, d));
  const times = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'].map((x) => h('span', {}, x));
  const ok = h('div', { class: 'pf-toast' }, t.ok);
  const dishes = [['food-pasta.jpg', 'Tagliatelle al tartufo', 21.5], ['food-pizza.jpg', 'Pizza Diavola', 15.9], ['food-dessert.jpg', 'Tiramisù della casa', 8.5]];
  const root = browser('trattoria-lumi.de', h('div', { class: 'pf-resto' },
    img('food-hero.jpg', 'pf-resto__bg'),
    h('nav', { class: 'pf-resto__nav' }, h('b', {}, 'Trattoria Lumi'), ...t.nav.map((n) => h('span', {}, n))),
    h('div', { class: 'pf-resto__hero' }, h('h4', {}, t.hero), h('div', { class: 'pf-resto__dishes' }, ...dishes.map(([f, n, p]) => h('div', {}, img(f), h('small', {}, n), h('b', {}, money(p)))))),
    h('div', { class: 'pf-resto__book' }, h('b', {}, t.res), h('div', { class: 'pf-pills' }, ...days), h('div', { class: 'pf-pills pf-pills--time' }, ...times), h('small', {}, t.guests + ': 2')),
    ok));
  let k = 0;
  live(root, () => {
    times.forEach((x, i) => x.classList.toggle('is-on', i === k % times.length));
    if (k % times.length === 2) replay(ok, 'is-in');
    k++;
  }, 1100);
  return root;
}

function fitnessApp() {
  const t = L({ de: { hi: 'Guten Morgen, Sara', steps: 'Schritte', kcal: 'kcal', min: 'Min. aktiv', today: 'Heute', w: [['Ganzkörper HIIT', '24 Min'], ['Yoga Flow', '15 Min'], ['Lauf 5 km', '28 Min']] }, en: { hi: 'Good morning, Sara', steps: 'Steps', kcal: 'kcal', min: 'Active min', today: 'Today', w: [['Full-body HIIT', '24 min'], ['Yoga flow', '15 min'], ['5 km run', '28 min']] }, ru: { hi: 'Доброе утро, Сара', steps: 'Шаги', kcal: 'ккал', min: 'Мин. активности', today: 'Сегодня', w: [['HIIT всё тело', '24 мин'], ['Йога', '15 мин'], ['Бег 5 км', '28 мин']] } });
  const ring = (r, c, cls) => svg('circle', { cx: 60, cy: 60, r, fill: 'none', stroke: c, 'stroke-width': 10, 'stroke-linecap': 'round', class: 'pf-ring ' + cls, pathLength: 100 });
  const rings = svg('svg', { viewBox: '0 0 120 120', class: 'pf-rings' },
    svg('circle', { cx: 60, cy: 60, r: 50, fill: 'none', stroke: 'rgba(255,45,85,.18)', 'stroke-width': 10 }), ring(50, '#ff2d55', 'r1'),
    svg('circle', { cx: 60, cy: 60, r: 37, fill: 'none', stroke: 'rgba(166,255,0,.18)', 'stroke-width': 10 }), ring(37, '#a6ff00', 'r2'),
    svg('circle', { cx: 60, cy: 60, r: 24, fill: 'none', stroke: 'rgba(0,214,255,.18)', 'stroke-width': 10 }), ring(24, '#00d6ff', 'r3'));
  const steps = h('b', {}, '0'), kcal = h('b', {}, '0'), mins = h('b', {}, '0');
  const root = phone(h('div', { class: 'pf-fit' },
    h('div', { class: 'pf-fit__top' }, img('avatar-3.jpg', 'pf-fit__av'), h('div', {}, h('small', {}, t.today), h('b', {}, t.hi))),
    rings,
    h('div', { class: 'pf-fit__stats' }, h('div', {}, steps, h('small', {}, t.steps)), h('div', {}, kcal, h('small', {}, t.kcal)), h('div', {}, mins, h('small', {}, t.min))),
    h('ul', { class: 'pf-fit__list' }, ...t.w.map(([n, d], i) => h('li', {}, h('span', { class: 'pf-fit__ic pf-fit__ic--' + i }, ['⚡', '🧘', '🏃'][i]), h('b', {}, n), h('small', {}, d)))),
    h('nav', { class: 'pf-fit__tabs' }, h('i', { class: 'is-on' }), h('i'), h('i'), h('i'))), 'pf-phone--dark');
  live(root, () => {
    replay(rings, 'is-run');
    let s = 0; const end = 8432;
    const tick = () => { s = Math.min(end, s + 420); steps.textContent = num(s); kcal.textContent = num(Math.round(s * 0.052)); mins.textContent = num(Math.round(s / 160)); if (s < end && root.isConnected) requestAnimationFrame(tick); };
    tick();
  }, 6000);
  return root;
}

function fashionShop() {
  const t = L({ de: { nav: ['Neu', 'Damen', 'Herren', 'Sale'], hero: 'Herbst / Winter 26', sub: 'Die neue Kollektion', added: 'In den Warenkorb gelegt', size: 'Größe' }, en: { nav: ['New', 'Women', 'Men', 'Sale'], hero: 'Autumn / Winter 26', sub: 'The new collection', added: 'Added to bag', size: 'Size' }, ru: { nav: ['Новинки', 'Женщинам', 'Мужчинам', 'Sale'], hero: 'Осень / Зима 26', sub: 'Новая коллекция', added: 'Добавлено в корзину', size: 'Размер' } });
  const items = [['fashion-1.jpg', 'Oversize Hoodie', 89], ['fashion-2.jpg', 'Wool Coat', 249], ['fashion-3.jpg', 'Essential Tee', 39], ['fashion-4.jpg', 'Cable Knit', 119]];
  const cards = items.map(([f, n, p]) => h('div', { class: 'pf-fash__card' }, img(f), h('small', {}, n), h('b', {}, money(p)), h('div', { class: 'pf-fash__sizes' }, ...['S', 'M', 'L'].map((s) => h('span', {}, s)))));
  const bag = h('i', {}, '0');
  const toast = h('div', { class: 'pf-toast pf-toast--light' });
  const root = browser('maison-ivre.com', h('div', { class: 'pf-fash' },
    h('nav', {}, h('b', {}, 'MAISON IVRE'), h('div', {}, ...t.nav.map((n) => h('span', {}, n))), h('span', { class: 'pf-fash__bag' }, '👜 ', bag)),
    h('div', { class: 'pf-fash__hero' }, img('fashion-hero.jpg'), h('div', {}, h('small', {}, t.sub), h('h4', {}, t.hero))),
    h('div', { class: 'pf-fash__grid' }, ...cards), toast));
  let k = 0, n = 0;
  live(root, () => {
    cards.forEach((c, i) => c.classList.toggle('is-hover', i === k % cards.length));
    const c = cards[k % cards.length];
    const sz = c.querySelectorAll('.pf-fash__sizes span'); sz.forEach((s, i) => s.classList.toggle('is-on', i === 1));
    if (k % 2) { n++; bag.textContent = String(n); toast.textContent = '✓ ' + t.added + ' · ' + items[k % items.length][1] + ' · ' + t.size + ' M'; replay(toast, 'is-in'); }
    k++;
  }, 1700);
  return root;
}

function biDashboard() {
  const t = L({ de: { title: 'Umsatz & Marketing', kpi: [['Umsatz', 184200, '€'], ['Bestellungen', 3912, ''], ['Ø Warenkorb', 47, '€'], ['Neukunden', 1204, '']], src: 'Quellen: Shopify · Meta Ads · Google Ads · DATEV', ch: ['Meta', 'Google', 'E-Mail', 'Organisch'] }, en: { title: 'Revenue & marketing', kpi: [['Revenue', 184200, '€'], ['Orders', 3912, ''], ['Avg. basket', 47, '€'], ['New customers', 1204, '']], src: 'Sources: Shopify · Meta Ads · Google Ads · DATEV', ch: ['Meta', 'Google', 'Email', 'Organic'] }, ru: { title: 'Выручка и маркетинг', kpi: [['Выручка', 184200, '€'], ['Заказы', 3912, ''], ['Средний чек', 47, '€'], ['Новые клиенты', 1204, '']], src: 'Источники: Shopify · Meta Ads · Google Ads · DATEV', ch: ['Meta', 'Google', 'E-mail', 'Органика'] } });
  const kp = t.kpi.map(([l, v, u]) => { const b = h('b', {}, '0'); return [b, v, u, h('div', { class: 'pf-bi__kpi' }, h('small', {}, l), b, h('em', {}, '▲ ' + (8 + (v % 17)) + ' %'))]; });
  const pts = [14, 22, 19, 30, 28, 41, 38, 52, 49, 63, 70, 78].map((v, i) => [i * 30, 100 - v]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ',' + p[1]).join(' ');
  const line = svg('path', { d, fill: 'none', stroke: '#22d3ee', 'stroke-width': 2.5, pathLength: 100, class: 'pf-bi__line' });
  const area = svg('path', { d: d + ' L330,100 L0,100 Z', fill: 'url(#pfbi)', class: 'pf-bi__area' });
  const chart = svg('svg', { viewBox: '0 0 330 100', preserveAspectRatio: 'none', class: 'pf-bi__chart' },
    svg('defs', {}, svg('linearGradient', { id: 'pfbi', x1: 0, x2: 0, y1: 0, y2: 1 }, svg('stop', { offset: '0', 'stop-color': '#22d3ee', 'stop-opacity': '.35' }), svg('stop', { offset: '1', 'stop-color': '#22d3ee', 'stop-opacity': '0' }))), area, line);
  const share = [42, 27, 18, 13];
  const root = browser('app.atlas-analytics.de', h('div', { class: 'pf-bi' },
    h('aside', {}, h('b', {}, '▲ Atlas'), ...['▦', '◔', '⚑', '⚙'].map((x, i) => h('span', { class: i ? '' : 'is-on' }, x))),
    h('div', { class: 'pf-bi__main' },
      h('div', { class: 'pf-bi__head' }, h('b', {}, t.title), h('small', {}, t.src)),
      h('div', { class: 'pf-bi__kpis' }, ...kp.map((k) => k[3])),
      h('div', { class: 'pf-bi__row' }, chart,
        h('ul', { class: 'pf-bi__share' }, ...t.ch.map((c, i) => { const li = h('li', {}, h('small', {}, c), h('span', {}, h('i')), h('b', {}, share[i] + ' %')); li.style.setProperty('--w', share[i] + '%'); return li; }))))), 'pf-browser--dark');
  live(root, () => {
    replay(root, 'is-run');
    kp.forEach(([b, v, u]) => {
      const t0 = performance.now();
      const step = (now) => { const p = Math.min(1, (now - t0) / 1200); const e = 1 - Math.pow(1 - p, 3); b.textContent = (u === '€' ? money(v * e).replace(/,00/, '') : num(v * e)); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }, 7000);
  return root;
}

function candleAutomation() {
  const t = L({ de: { cap: 'Neu: Duftkerze „Amber Night“ – handgegossen in Leipzig 🕯️', c: [['lisa.m', 'Wie viel kostet die? 😍'], ['jonas_k', 'Preis?'], ['mia.home', 'Gibt es die auch größer?']], dm: 'Hi! „Amber Night“ kostet 24,90 € (180 g, 45 h Brenndauer). Hier direkt bestellen: waxwork.de/amber 🕯️', auto: 'Automatische Antwort', sent: 'DM gesendet in 2 s' }, en: { cap: 'New: scented candle “Amber Night” – hand-poured in Leipzig 🕯️', c: [['lisa.m', 'How much is it? 😍'], ['jonas_k', 'Price?'], ['mia.home', 'Is there a bigger one?']], dm: 'Hi! “Amber Night” is €24.90 (180 g, 45 h burn time). Order here: waxwork.de/amber 🕯️', auto: 'Automatic reply', sent: 'DM sent in 2 s' }, ru: { cap: 'Новинка: ароматическая свеча «Amber Night» – ручная работа, Лейпциг 🕯️', c: [['lisa.m', 'Сколько стоит? 😍'], ['jonas_k', 'Цена?'], ['mia.home', 'Есть побольше?']], dm: 'Привет! «Amber Night» стоит 24,90 € (180 г, 45 ч горения). Заказ: waxwork.de/amber 🕯️', auto: 'Автоответ', sent: 'DM отправлено за 2 с' } });
  const avatars = ['avatar-1.jpg', 'avatar-2.jpg', 'avatar-4.jpg'];
  const comments = t.c.map(([u, c], i) => h('li', {}, img(avatars[i], 'pf-ig__av'), h('p', {}, h('b', {}, u + ' '), c)));
  const post = phone(h('div', { class: 'pf-ig' },
    h('div', { class: 'pf-ig__head' }, h('span', { class: 'pf-ig__ring' }, img('candle-2.jpg', 'pf-ig__av')), h('b', {}, 'waxwork.studio')),
    img('candle.jpg', 'pf-ig__photo'),
    h('div', { class: 'pf-ig__actions' }, '♡  💬  ➤'),
    h('p', { class: 'pf-ig__cap' }, h('b', {}, 'waxwork.studio '), t.cap),
    h('ul', { class: 'pf-ig__comments' }, ...comments)));
  const dm = h('div', { class: 'pf-dm__msg' }, h('small', {}, '⚡ ' + t.auto), t.dm);
  const sent = h('small', { class: 'pf-dm__sent' }, '✓ ' + t.sent);
  const chat = phone(h('div', { class: 'pf-dm' },
    h('div', { class: 'pf-dm__head' }, img('avatar-1.jpg', 'pf-ig__av'), h('b', {}, 'lisa.m')),
    h('div', { class: 'pf-dm__user' }, t.c[0][1]), dm, sent), 'pf-phone--sm');
  const root = h('div', { class: 'pf-dual pf-dual--phones' }, post, chat);
  let k = 0;
  live(root, () => {
    comments.forEach((c, i) => c.classList.toggle('is-new', i === k % comments.length));
    replay(dm, 'is-in'); replay(sent, 'is-in');
    k++;
  }, 3200);
  return root;
}

function interiorShop() {
  const t = L({ de: { hero: 'Wohnen, das zur Ruhe kommt.', add: 'In den Warenkorb', shop: 'Shop the look' }, en: { hero: 'Living that feels calm.', add: 'Add to cart', shop: 'Shop the look' }, ru: { hero: 'Дом, в котором спокойно.', add: 'В корзину', shop: 'Shop the look' } });
  const spots = [['home-lamp.jpg', 'Lampe „Fjord“', 149, 70, 34], ['home-vase.jpg', 'Vase „Sand“', 39, 46, 58], ['home-pillow.jpg', 'Kissen „Moos“', 29, 24, 66], ['home-plant.jpg', 'Topf „Terra“', 49, 86, 62]];
  const dots = spots.map(([, , , x, y]) => { const d = h('span', { class: 'pf-spot' }); d.style.setProperty('left', x + '%'); d.style.setProperty('top', y + '%'); return d; });
  const card = h('div', { class: 'pf-home__card' });
  const root = browser('nordhaus-living.de', h('div', { class: 'pf-home' },
    h('nav', {}, h('b', {}, 'NORDHAUS'), h('span', {}, t.shop)),
    h('div', { class: 'pf-home__room' }, img('home-hero.jpg'), ...dots, card),
    h('div', { class: 'pf-home__copy' }, h('h4', {}, t.hero))));
  let k = 0;
  live(root, () => {
    const i = k % spots.length, [f, n, p, x, y] = spots[i];
    dots.forEach((d, j) => d.classList.toggle('is-on', j === i));
    card.replaceChildren(img(f), h('div', {}, h('b', {}, n), h('small', {}, money(p)), h('span', {}, t.add)));
    card.style.setProperty('left', Math.min(x, 62) + '%'); card.style.setProperty('top', Math.max(6, y - 40) + '%');
    replay(card, 'is-in');
    k++;
  }, 2200);
  return root;
}

const wrapCover = (fn, url, cls) => browser(url, fn(), cls);

/* ---------- Projects ---------- */
const PROJECTS = [
  { brand: 'STRIDE', view: () => wrapCover(SHOWCASES.shop, 'stride-store.de', 'pf-browser--cover'), tags: ['E-Commerce', 'Shopify', 'Klarna', 'SEO'],
    de: ['Sneaker-Onlineshop', 'Website & Shop', 'Produktwelten, Warenkorb und Checkout in unter einer Sekunde geladen – Bestellungen laufen live ein.'], en: ['Sneaker online shop', 'Website & shop', 'Product worlds, cart and checkout loading in under a second – orders come in live.'], ru: ['Магазин кроссовок', 'Сайт и магазин', 'Каталог, корзина и оформление заказа грузятся меньше чем за секунду – заказы идут в реальном времени.'] },
  { brand: 'Glow & Co.', view: metaCampaign, tags: ['Meta Ads', 'Instagram', 'Stories', 'Reporting'],
    de: ['Meta-Kampagne für Skincare', 'Social Ads', 'Story-Anzeigen mit echten Produkten, laufend optimiert – Reichweite, Klicks und ROAS live im Blick.'], en: ['Meta campaign for skincare', 'Social ads', 'Story ads with real products, optimised continuously – reach, clicks and ROAS tracked live.'], ru: ['Кампания Meta для косметики', 'Реклама в соцсетях', 'Stories-реклама с реальными продуктами, постоянная оптимизация – охват, клики и ROAS в реальном времени.'] },
  { brand: 'Kundenwerk', view: () => wrapCover(SHOWCASES.crm, 'app.kundenwerk.de', 'pf-browser--cover pf-browser--dark'), tags: ['CRM', 'Automation', 'Dashboard'],
    de: ['CRM nach Maß', 'CRM-System', 'Anfragen, Angebote und Aufträge auf einem Board. Angebote gehen automatisch raus, der Umsatz ist immer sichtbar.'], en: ['Custom CRM', 'CRM system', 'Leads, proposals and deals on one board. Proposals go out automatically, revenue is always visible.'], ru: ['CRM под задачи', 'CRM-система', 'Заявки, предложения и сделки на одной доске. КП уходят автоматически, выручка всегда на виду.'] },
  { brand: 'Trattoria Lumi', view: restaurant, tags: ['Website', 'Reservierung', 'Google Maps'],
    de: ['Restaurant-Website mit Reservierung', 'Website', 'Speisekarte mit Fotos, Tischreservierung in drei Klicks und automatische Bestätigung per E-Mail.'], en: ['Restaurant website with booking', 'Website', 'Menu with photos, table booking in three clicks and automatic email confirmation.'], ru: ['Сайт ресторана с бронированием', 'Сайт', 'Меню с фото, бронь стола в три клика и автоматическое подтверждение по e-mail.'] },
  { brand: 'FitPulse', view: fitnessApp, tags: ['iOS', 'Android', 'Health', 'Push'],
    de: ['Fitness-App', 'App', 'Aktivitätsringe, Workouts und Erinnerungen – eine App für iOS und Android aus einer Codebasis.'], en: ['Fitness app', 'App', 'Activity rings, workouts and reminders – one app for iOS and Android from a single codebase.'], ru: ['Фитнес-приложение', 'Приложение', 'Кольца активности, тренировки и напоминания – одно приложение для iOS и Android.'] },
  { brand: 'Lexa', view: () => wrapCover(SHOWCASES.ai, 'lexa.ai/app', 'pf-browser--cover'), tags: ['KI', 'OCR', 'DATEV', 'DSGVO'],
    de: ['KI liest Rechnungen', 'KI-Tool', 'Lieferant, Beträge und Steuer in Sekunden erkannt und direkt in die Buchhaltung gebucht – EU-gehostet.'], en: ['AI that reads invoices', 'AI tool', 'Supplier, amounts and tax recognised in seconds and booked straight into accounting – hosted in the EU.'], ru: ['ИИ читает счета', 'ИИ-инструмент', 'Поставщик, суммы и налог распознаются за секунды и сразу проводятся в бухгалтерии – хостинг в ЕС.'] },
  { brand: 'Maison Ivre', view: fashionShop, tags: ['Fashion', 'Shop', 'Lookbook'],
    de: ['Fashion-Store', 'Website & Shop', 'Editorial-Look mit großen Bildern, Größenwahl ohne Umwege und ein Warenkorb, der mitzählt.'], en: ['Fashion store', 'Website & shop', 'Editorial look with large imagery, effortless size picking and a bag that counts along.'], ru: ['Магазин одежды', 'Сайт и магазин', 'Эдиториал-стиль с большими фото, быстрый выбор размера и корзина, которая считает сама.'] },
  { brand: 'Atlas', view: biDashboard, tags: ['Power BI', 'Dashboards', 'API'],
    de: ['BI-Dashboard für Händler', 'Daten & Reporting', 'Shop, Werbekonten und Buchhaltung in einem Dashboard – Umsatz und Kanäle auf einen Blick.'], en: ['BI dashboard for retailers', 'Data & reporting', 'Shop, ad accounts and accounting in one dashboard – revenue and channels at a glance.'], ru: ['BI-дашборд для ритейла', 'Данные и отчёты', 'Магазин, рекламные кабинеты и бухгалтерия в одном дашборде – выручка и каналы с первого взгляда.'] },
  { brand: 'Waxwork', view: candleAutomation, tags: ['Instagram', 'Automation', 'DMs'],
    de: ['Instagram-Automatisierung', 'Marketing-Automation', 'Jemand fragt „Preis?“ unter dem Post – die Antwort mit Link kommt in 2 Sekunden per DM.'], en: ['Instagram automation', 'Marketing automation', 'Someone asks “price?” under a post – the answer with a link arrives by DM in 2 seconds.'], ru: ['Автоматизация Instagram', 'Маркетинг-автоматизация', 'Кто-то спрашивает «цена?» под постом – ответ со ссылкой приходит в директ за 2 секунды.'] },
  { brand: 'Nordhaus', view: interiorShop, tags: ['Interior', 'Shop the look', 'UX'],
    de: ['Interior-Shop mit „Shop the look“', 'Website & Shop', 'Produkte direkt im Raumfoto anklicken und kaufen – Inspiration und Shop in einem.'], en: ['Interior shop with “shop the look”', 'Website & shop', 'Click products right inside the room photo and buy – inspiration and shop in one.'], ru: ['Магазин интерьера с «shop the look»', 'Сайт и магазин', 'Кликайте товары прямо на фото комнаты и покупайте – вдохновение и магазин в одном.'] }
];

export function portfolioStage() {
  const ui = L(UI);
  const n = PROJECTS.length;
  const slides = PROJECTS.map((p, i) => {
    const [title, cat, text] = L({ de: p.de, en: p.en, ru: p.ru });
    return h('article', { class: 'pf-slide' + (i === 0 ? ' is-active' : ''), 'aria-roledescription': 'slide', 'aria-label': (i + 1) + ' ' + ui.of + ' ' + n + ': ' + p.brand },
      h('div', { class: 'pf-info' },
        h('span', { class: 'pf-num' }, String(i + 1).padStart(2, '0'), h('small', {}, ' / ' + n)),
        h('span', { class: 'pf-cat' }, cat + ' · ' + ui.sample),
        h('h2', { class: 'pf-title' }, h('b', {}, p.brand), h('span', {}, title)),
        h('p', { class: 'pf-text' }, text),
        h('ul', { class: 'tags' }, ...p.tags.map((t) => h('li', {}, t)))),
      h('div', { class: 'pf-device' }, p.view()));
  });
  const dots = slides.map((_, i) => h('button', { type: 'button', class: 'pf-dot', 'aria-label': String(i + 1), 'aria-current': String(i === 0) }));
  const prev = h('button', { type: 'button', class: 'pf-nav pf-nav--prev', 'aria-label': ui.prev }, '←');
  const next = h('button', { type: 'button', class: 'pf-nav pf-nav--next', 'aria-label': ui.next }, '→');
  const bar = h('i');
  const stage = h('div', { class: 'pf-stage' },
    h('div', { class: 'pf-slides' }, ...slides),
    h('div', { class: 'pf-controls' }, prev, h('div', { class: 'pf-dots' }, ...dots), next),
    h('div', { class: 'pf-progress', 'aria-hidden': 'true' }, bar),
    h('p', { class: 'pf-hint' }, '↓ ' + ui.scroll));
  const section = h('section', { class: 'pf', 'aria-label': ui.eyebrow }, stage);

  let cur = 0, st = null;
  function show(i, fromScroll) {
    i = Math.max(0, Math.min(n - 1, i));
    if (i === cur) return;
    const forward = i > cur;
    const dir = cur % 2 === 0 ? 1 : -1; // wave alternates: right, left, right …
    const old = slides[cur], nu = slides[i];
    slides.forEach((s) => s.classList.remove('is-leaving', 'to-right', 'to-left', 'from-right', 'from-left'));
    old.classList.remove('is-active');
    old.classList.add('is-leaving', dir > 0 ? 'to-right' : 'to-left');
    nu.classList.add(dir > 0 ? 'from-left' : 'from-right');
    void nu.offsetWidth;
    nu.classList.add('is-active');
    requestAnimationFrame(() => nu.classList.remove('from-left', 'from-right'));
    setTimeout(() => old.classList.remove('is-leaving', 'to-right', 'to-left'), 900);
    window.dispatchEvent(new CustomEvent('tmx:scene', { detail: { shape: 'wave', x: dir * (forward ? 2.4 : -2.4), y: 0, scale: 1.25, opacity: 0.85 } }));
    cur = i;
    dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
    bar.style.setProperty('transform', 'scaleX(' + (i + 1) / n + ')');
    if (!fromScroll && st) window.scrollTo({ top: st.start + ((st.end - st.start) * i) / (n - 1), behavior: reduced ? 'auto' : 'smooth' });
  }
  bar.style.setProperty('transform', 'scaleX(' + 1 / n + ')');
  prev.addEventListener('click', () => show(cur - 1));
  next.addEventListener('click', () => show(cur + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
  stage.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') show(cur + 1); if (e.key === 'ArrowLeft') show(cur - 1); });

  // Scroll-driven pinning once GSAP is ready (main.js calls this after registering ScrollTrigger).
  section.initScroll = (ScrollTrigger) => {
    if (!ScrollTrigger || reduced) return;
    st = ScrollTrigger.create({
      trigger: section, pin: stage, start: 'top top', end: () => '+=' + window.innerHeight * 0.8 * (n - 1),
      snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.05, ease: 'power1.inOut' },
      onUpdate: (self) => show(Math.round(self.progress * (n - 1)), true),
      onEnter: () => window.dispatchEvent(new CustomEvent('tmx:scene', { detail: { shape: 'wave', x: 0, y: 0, scale: 1.25, opacity: 0.7 } }))
    });
  };
  section.dataset.pfStage = '';
  return section;
}
