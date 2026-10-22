// Homepage journey showcase: one example client (Kaffee Müller, a small roastery
// in Cologne) followed through all six steps until it becomes "MORA Coffee Roasters".
// Every step is a small live demo the visitor can play with.
import { h, icon, getLang } from './core.js';
import { svg, money, num, sleep, reduced } from './demos/kit.js';

const T = {
  de: {
    client: { label: 'Beispielkunde', name: 'Kaffee Müller', desc: 'Kleine Familienrösterei in Köln, seit 1987. Großartiger Kaffee – aber nur im Laden verkauft und online kaum sichtbar.', goal: 'Ziel: moderne Marke & Onlineverkauf in ganz Deutschland' },
    example: 'Beispiel: Kaffee Müller → MORA',
    s1: { now: 'Heute', nowItems: ['0 € Onlineumsatz', '312 Instagram-Follower', 'Kunden nur aus Köln'], who: 'Zielgruppe', next: 'Nächste Persona', goal: 'Ziele in 6 Monaten', goals: ['Onlineshop in 5 Wochen', '300 Bestellungen / Monat', 'Kaffee-Abo für Stammkunden'], plan: 'Plan', planSteps: ['Marke', 'Shop', 'Automatisierung', 'KI', 'Werbung'],
      personas: [{ name: 'Lena, 29', role: 'Homeoffice · Siebträger-Fan', quote: 'Ich will frisch gerösteten Kaffee – bequem nach Hause geliefert.' }, { name: 'Markus, 41', role: 'Büroleiter · bestellt fürs Team', quote: 'Ein Abo, das automatisch kommt, ohne dass ich daran denken muss.' }, { name: 'Aylin, 34', role: 'Café-Besitzerin · B2B', quote: 'Ich brauche feste Preise und Lieferung jede Woche.' }] },
    s2: { before: 'Vorher', after: 'Nachher', drag: 'Ziehen zum Vergleichen', bag: 'Verpackung', cup: 'Becher', store: 'Laden', palette: 'Neue Farben', type: 'Schrift', since: 'seit 1987', oldBag: 'Röstkaffee 500 g', newBag: 'Espresso No. 1', sl: 'Vorher-Nachher-Vergleich' },
    s3: { url: 'mora-coffee.de', home: 'Start', shop: 'Shop', heroT: 'Frisch geröstet. In 48 h bei dir.', heroP: 'Specialty Coffee aus Köln – direkt von der Rösterei.', toShop: 'Zum Shop', best: 'Beliebt', add: 'In den Warenkorb', added: 'Hinzugefügt ✓', grind: 'Mahlgrad', grinds: ['Ganze Bohne', 'Siebträger', 'Filter'], size: 'Größe', back: '← Zurück', cart: 'Warenkorb', empty: 'Dein Warenkorb ist leer.', sub: 'Zwischensumme', ship: 'Versand', free: 'kostenlos', total: 'Gesamt', checkout: 'Zur Kasse', thanks: 'Danke für deine Bestellung!', order: 'Bestellung', demo: 'Demo – es wird nichts bestellt oder bezahlt.', again: 'Weiter einkaufen', perMonth: '/ Monat' },
    s4: { trigger: 'Testbestellung auslösen', running: 'Läuft …', flow: [['Neue Bestellung', '#MORA-{n} · Espresso No. 1'], ['Rechnung erstellt', 'PDF automatisch per E-Mail'], ['Lager aktualisiert', 'Espresso No. 1: {a} → {b}'], ['Versandlabel erstellt', 'DHL · Abholung 16:00'], ['Kundin informiert', '„Dein Kaffee ist unterwegs ☕“'], ['CRM aktualisiert', 'Lena → Segment „Stammkunden“']], done: 'automatisch bearbeitet', saved: 'Minuten gespart', manual: 'Ohne Automatisierung: ca. 12 Minuten Handarbeit pro Bestellung' },
    s5: { title: 'MORA Assistent', tag: 'KI', aiLabel: 'KI-generiert', hello: 'Hallo! Ich helfe dir, den passenden Kaffee zu finden. ☕', note: 'Demo: Antworten sind vorbereitet und als KI gekennzeichnet (EU AI Act).',
      qa: [['Welcher Kaffee passt zu meinem Siebträger?', 'Für Siebträger empfehle ich Espresso No. 1: schokoladig, wenig Säure. Wähle den Mahlgrad „Siebträger“.', 0], ['Was kostet der Versand?', 'Ab 30 € ist der Versand kostenlos, sonst 4,90 €. Lieferung in 1–2 Werktagen.'], ['Gibt es ein Abo?', 'Ja! Die Abo-Box: 2 × 250 g jeden Monat für 39 €, jederzeit kündbar.', 3]],
      stats: [['2 s', 'Antwortzeit'], ['24/7', 'erreichbar'], ['68 %', 'Fragen ohne Mitarbeiter gelöst']] },
    s6: { month: 'Monat nach Launch', orders: 'Bestellungen / Monat', revenue: 'Umsatz / Monat', followers: 'Instagram-Follower', roas: 'ROAS (Werbung)', ad: 'Frisch geröstet. In 48 h bei dir.', cta: 'Jetzt kaufen', sponsored: 'Gesponsert', sample: 'Beispielwerte' }
  },
  en: {
    client: { label: 'Example client', name: 'Kaffee Müller', desc: 'A small family coffee roastery in Cologne since 1987. Great coffee – but sold only in the shop and barely visible online.', goal: 'Goal: a modern brand & online sales across Germany' },
    example: 'Example: Kaffee Müller → MORA',
    s1: { now: 'Today', nowItems: ['€0 online revenue', '312 Instagram followers', 'Customers only from Cologne'], who: 'Target audience', next: 'Next persona', goal: 'Goals in 6 months', goals: ['Online shop in 5 weeks', '300 orders / month', 'Coffee subscription for regulars'], plan: 'Plan', planSteps: ['Brand', 'Shop', 'Automation', 'AI', 'Ads'],
      personas: [{ name: 'Lena, 29', role: 'Works from home · espresso fan', quote: 'I want freshly roasted coffee – delivered to my door.' }, { name: 'Markus, 41', role: 'Office manager · orders for the team', quote: 'A subscription that just arrives, without me thinking about it.' }, { name: 'Aylin, 34', role: 'Café owner · B2B', quote: 'I need fixed prices and delivery every week.' }] },
    s2: { before: 'Before', after: 'After', drag: 'Drag to compare', bag: 'Packaging', cup: 'Cup', store: 'Store', palette: 'New colours', type: 'Typeface', since: 'since 1987', oldBag: 'Roast coffee 500 g', newBag: 'Espresso No. 1', sl: 'Before-and-after comparison' },
    s3: { url: 'mora-coffee.de', home: 'Home', shop: 'Shop', heroT: 'Freshly roasted. At your door in 48 h.', heroP: 'Specialty coffee from Cologne – straight from the roastery.', toShop: 'Go to shop', best: 'Popular', add: 'Add to cart', added: 'Added ✓', grind: 'Grind', grinds: ['Whole bean', 'Espresso', 'Filter'], size: 'Size', back: '← Back', cart: 'Cart', empty: 'Your cart is empty.', sub: 'Subtotal', ship: 'Shipping', free: 'free', total: 'Total', checkout: 'Checkout', thanks: 'Thank you for your order!', order: 'Order', demo: 'Demo – nothing is ordered or paid.', again: 'Keep shopping', perMonth: '/ month' },
    s4: { trigger: 'Trigger a test order', running: 'Running …', flow: [['New order', '#MORA-{n} · Espresso No. 1'], ['Invoice created', 'PDF sent automatically'], ['Stock updated', 'Espresso No. 1: {a} → {b}'], ['Shipping label created', 'DHL · pickup 4 pm'], ['Customer notified', '“Your coffee is on its way ☕”'], ['CRM updated', 'Lena → segment “Regulars”']], done: 'handled automatically', saved: 'minutes saved', manual: 'Without automation: about 12 minutes of manual work per order' },
    s5: { title: 'MORA Assistant', tag: 'AI', aiLabel: 'AI-generated', hello: 'Hi! I’ll help you find the right coffee. ☕', note: 'Demo: answers are prepared and labelled as AI (EU AI Act).',
      qa: [['Which coffee suits my espresso machine?', 'For espresso machines I recommend Espresso No. 1: chocolatey, low acidity. Choose the “Espresso” grind.', 0], ['How much is shipping?', 'Free from €30, otherwise €4.90. Delivery in 1–2 working days.'], ['Is there a subscription?', 'Yes! The subscription box: 2 × 250 g every month for €39, cancel any time.', 3]],
      stats: [['2 s', 'response time'], ['24/7', 'available'], ['68%', 'questions solved without staff']] },
    s6: { month: 'Month after launch', orders: 'Orders / month', revenue: 'Revenue / month', followers: 'Instagram followers', roas: 'ROAS (ads)', ad: 'Freshly roasted. At your door in 48 h.', cta: 'Shop now', sponsored: 'Sponsored', sample: 'Sample figures' }
  },
  ru: {
    client: { label: 'Пример клиента', name: 'Kaffee Müller', desc: 'Небольшая семейная обжарочная в Кёльне с 1987 года. Отличный кофе – но продаётся только в магазине, в интернете его почти не видно.', goal: 'Цель: современный бренд и онлайн-продажи по всей Германии' },
    example: 'Пример: Kaffee Müller → MORA',
    s1: { now: 'Сейчас', nowItems: ['0 € онлайн-выручки', '312 подписчиков в Instagram', 'Клиенты только из Кёльна'], who: 'Целевая аудитория', next: 'Следующая персона', goal: 'Цели на 6 месяцев', goals: ['Интернет-магазин за 5 недель', '300 заказов в месяц', 'Подписка на кофе'], plan: 'План', planSteps: ['Бренд', 'Магазин', 'Автоматизация', 'ИИ', 'Реклама'],
      personas: [{ name: 'Лена, 29', role: 'Работает из дома · любит эспрессо', quote: 'Хочу свежеобжаренный кофе с доставкой домой.' }, { name: 'Маркус, 41', role: 'Офис-менеджер · заказывает для команды', quote: 'Подписка, которая приходит сама, без напоминаний.' }, { name: 'Айлин, 34', role: 'Владелица кафе · B2B', quote: 'Мне нужны фиксированные цены и доставка каждую неделю.' }] },
    s2: { before: 'До', after: 'После', drag: 'Потяните для сравнения', bag: 'Упаковка', cup: 'Стакан', store: 'Магазин', palette: 'Новые цвета', type: 'Шрифт', since: 'с 1987', oldBag: 'Кофе 500 г', newBag: 'Espresso No. 1', sl: 'Сравнение до и после' },
    s3: { url: 'mora-coffee.de', home: 'Главная', shop: 'Магазин', heroT: 'Свежая обжарка. У вас через 48 ч.', heroP: 'Specialty-кофе из Кёльна – прямо из обжарочной.', toShop: 'В магазин', best: 'Популярное', add: 'В корзину', added: 'Добавлено ✓', grind: 'Помол', grinds: ['Зерно', 'Эспрессо', 'Фильтр'], size: 'Размер', back: '← Назад', cart: 'Корзина', empty: 'Корзина пуста.', sub: 'Сумма', ship: 'Доставка', free: 'бесплатно', total: 'Итого', checkout: 'Оформить', thanks: 'Спасибо за заказ!', order: 'Заказ', demo: 'Демо – ничего не заказывается и не оплачивается.', again: 'Продолжить покупки', perMonth: '/ мес.' },
    s4: { trigger: 'Создать тестовый заказ', running: 'Выполняется …', flow: [['Новый заказ', '#MORA-{n} · Espresso No. 1'], ['Счёт создан', 'PDF отправлен автоматически'], ['Склад обновлён', 'Espresso No. 1: {a} → {b}'], ['Этикетка доставки', 'DHL · забор в 16:00'], ['Клиент уведомлён', '«Ваш кофе уже в пути ☕»'], ['CRM обновлена', 'Лена → сегмент «Постоянные»']], done: 'обработано автоматически', saved: 'минут сэкономлено', manual: 'Без автоматизации: около 12 минут ручной работы на заказ' },
    s5: { title: 'Ассистент MORA', tag: 'ИИ', aiLabel: 'Создано ИИ', hello: 'Привет! Помогу подобрать кофе. ☕', note: 'Демо: ответы подготовлены и помечены как ИИ (EU AI Act).',
      qa: [['Какой кофе для моей кофемашины?', 'Для рожковой кофемашины рекомендую Espresso No. 1: шоколадный, с низкой кислотностью. Выберите помол «Эспрессо».', 0], ['Сколько стоит доставка?', 'От 30 € бесплатно, иначе 4,90 €. Доставка за 1–2 рабочих дня.'], ['Есть подписка?', 'Да! Abo-Box: 2 × 250 г каждый месяц за 39 €, отмена в любой момент.', 3]],
      stats: [['2 с', 'время ответа'], ['24/7', 'на связи'], ['68 %', 'вопросов без сотрудника']] },
    s6: { month: 'Месяц после запуска', orders: 'Заказов в месяц', revenue: 'Выручка в месяц', followers: 'Подписчики Instagram', roas: 'ROAS (реклама)', ad: 'Свежая обжарка. У вас через 48 ч.', cta: 'Купить', sponsored: 'Реклама', sample: 'Примерные данные' }
  }
};
const tx = () => T[getLang()] || T.de;

const PRODUCTS = [
  { id: 'esp', price: 14.9, color: '#d9653b', name: 'Espresso No. 1', note: { de: 'Schokolade · Nuss', en: 'Chocolate · nut', ru: 'Шоколад · орех' } },
  { id: 'ken', price: 16.9, color: '#7f9c7e', name: 'Filter Kenia', note: { de: 'Beere · Zitrus', en: 'Berry · citrus', ru: 'Ягоды · цитрус' } },
  { id: 'dec', price: 13.9, color: '#b8875a', name: 'Decaf Hafen', note: { de: 'Karamell · mild', en: 'Caramel · mild', ru: 'Карамель · мягкий' } },
  { id: 'abo', price: 39, color: '#e2a93b', name: 'Abo-Box', sub: true, note: { de: '2 × 250 g jeden Monat', en: '2 × 250 g every month', ru: '2 × 250 г каждый месяц' } }
];
const loc = (v) => (typeof v === 'string' ? v : v[getLang()] || v.de);
const setVar = (el, k, v) => { el.style.setProperty(k, v); return el; };

/* ---------- Brand marks ---------- */
function sunMark(size = 28) {
  const rays = [30, 60, 90, 120, 150].map((a) => {
    const r = (a * Math.PI) / 180;
    return svg('line', { x1: 20 - Math.cos(r) * 15, y1: 27 - Math.sin(r) * 15, x2: 20 - Math.cos(r) * 19, y2: 27 - Math.sin(r) * 19, stroke: '#d9653b', 'stroke-width': 2.4, 'stroke-linecap': 'round' });
  });
  return svg('svg', { viewBox: '0 0 40 34', width: size, height: size * 0.85, 'aria-hidden': 'true', class: 'jx-sun' },
    svg('path', { d: 'M8 27 A12 12 0 0 1 32 27 Z', fill: '#d9653b' }), ...rays,
    svg('line', { x1: 4, y1: 31, x2: 36, y2: 31, stroke: 'currentColor', 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
}
function beanMark(size = 26) {
  return svg('svg', { viewBox: '0 0 40 40', width: size, height: size, 'aria-hidden': 'true' },
    svg('ellipse', { cx: 20, cy: 20, rx: 11, ry: 16, fill: '#6b3e1f', transform: 'rotate(28 20 20)' }),
    svg('path', { d: 'M13 9 C25 16 15 24 27 31', stroke: '#c58b5a', 'stroke-width': 2.4, fill: 'none' }));
}
function logo(old, cls = '') {
  const x = tx().s2;
  return old
    ? h('div', { class: 'jx-logo jx-logo--old ' + cls }, beanMark(), h('span', {}, h('b', {}, 'Kaffee Müller'), h('small', {}, x.since)))
    : h('div', { class: 'jx-logo jx-logo--new ' + cls }, sunMark(), h('span', {}, h('b', {}, 'MORA'), h('small', {}, 'COFFEE ROASTERS')));
}
function bag(color, { old = false, label = '' } = {}) {
  const b = h('div', { class: 'jx-bag' + (old ? ' is-old' : '') },
    h('i', { class: 'jx-bag__top' }),
    h('div', { class: 'jx-bag__label' }, old ? h('b', {}, 'Kaffee Müller') : sunMark(18), old ? null : h('b', {}, 'MORA')),
    label ? h('em', {}, label) : null);
  return setVar(b, '--bag', color);
}

/* ---------- 01 Strategy board ---------- */
function board() {
  const s = tx().s1;
  let pi = 0;
  const persona = h('div', { class: 'jx-persona' });
  const renderP = () => {
    const p = s.personas[pi];
    persona.replaceChildren(
      h('div', { class: 'jx-persona__top' }, h('span', { class: 'jx-avatar' }, p.name[0]), h('div', {}, h('b', {}, p.name), h('small', {}, p.role))),
      h('q', {}, p.quote));
    persona.classList.remove('is-in'); void persona.offsetWidth; persona.classList.add('is-in');
  };
  const next = h('button', { type: 'button', class: 'jx-link' }, s.next + ' →');
  next.addEventListener('click', () => { pi = (pi + 1) % s.personas.length; renderP(); });
  renderP();
  return h('div', { class: 'jx jx--board' },
    h('div', { class: 'jx-col jx-col--now' }, h('h4', {}, s.now), h('ul', {}, ...s.nowItems.map((t) => h('li', {}, h('span', { class: 'jx-x' }, '✕'), t)))),
    h('div', { class: 'jx-col jx-col--who' }, h('h4', {}, s.who), persona, next),
    h('div', { class: 'jx-col jx-col--goal' }, h('h4', {}, s.goal), h('ul', {}, ...s.goals.map((t) => h('li', {}, icon('check', 14), t)))),
    h('div', { class: 'jx-plan' }, h('b', {}, s.plan), ...s.planSteps.map((p, i) => h('span', {}, h('i', {}, String(i + 1)), p))));
}

/* ---------- 02 Brand before / after ---------- */
function brandScene(old) {
  const s = tx().s2;
  return h('div', { class: 'jx-scene' + (old ? ' is-old' : '') },
    h('div', { class: 'jx-plate' }, logo(old)),
    h('div', { class: 'jx-items' },
      h('figure', {}, bag(old ? '#8a5a33' : '#2a1d17', { old, label: old ? s.oldBag : s.newBag }), h('figcaption', {}, s.bag)),
      h('figure', {}, h('div', { class: 'jx-cup' + (old ? ' is-old' : '') }, old ? h('b', {}, 'K. Müller') : sunMark(22)), h('figcaption', {}, s.cup)),
      h('figure', {}, h('div', { class: 'jx-store' + (old ? ' is-old' : '') },
        h('i', { class: 'jx-store__awn' }),
        h('span', { class: 'jx-store__sign' }, old ? 'KAFFEE MÜLLER' : 'MORA'),
        h('span', { class: 'jx-store__win' }), h('span', { class: 'jx-store__door' })), h('figcaption', {}, s.store))));
}
function brandCompare() {
  const s = tx().s2;
  const wrap = h('div', { class: 'jx-compare', role: 'slider', tabindex: '0', 'aria-label': s.sl, 'aria-valuemin': '0', 'aria-valuemax': '100' },
    h('div', { class: 'jx-layer jx-layer--old' }, brandScene(true)),
    h('div', { class: 'jx-layer jx-layer--new' }, brandScene(false)),
    h('div', { class: 'jx-handle', 'aria-hidden': 'true' }, h('span', {}, '⟷')),
    h('span', { class: 'jx-ba jx-ba--l' }, s.before), h('span', { class: 'jx-ba jx-ba--r' }, s.after));
  let raf = 0;
  const set = (p) => { p = Math.max(0, Math.min(100, p)); setVar(wrap, '--pos', p + '%'); wrap.setAttribute('aria-valuenow', String(Math.round(p))); };
  const fromX = (e) => { const r = wrap.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); };
  let drag = false;
  wrap.addEventListener('pointerdown', (e) => { cancelAnimationFrame(raf); drag = true; wrap.setPointerCapture(e.pointerId); fromX(e); });
  wrap.addEventListener('pointermove', (e) => { if (drag) fromX(e); });
  wrap.addEventListener('pointerup', () => { drag = false; });
  wrap.addEventListener('keydown', (e) => {
    const cur = Number(wrap.getAttribute('aria-valuenow'));
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); cancelAnimationFrame(raf); set(cur + (e.key === 'ArrowRight' ? 5 : -5)); }
  });
  // Intro: old brand fully visible, then the new one sweeps over it and settles in the middle.
  if (reduced) set(50);
  else {
    set(100);
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = (now - t0) / 1000;
      if (t < 0.5) set(100);
      else if (t < 2.1) set(100 - 100 * ease((t - 0.5) / 1.6));
      else if (t < 3.6) set(65 * ease(Math.min(1, (t - 2.6) / 1)) );
      if (t < 3.6 && wrap.isConnected) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }
  const colors = [['Espresso', '#2a1d17'], ['Terracotta', '#d9653b'], ['Crema', '#f4ead9'], ['Salbei', '#9bb39a']];
  return h('div', { class: 'jx jx--brand' },
    wrap,
    h('p', { class: 'jx-hint' }, '↔ ', s.drag),
    h('div', { class: 'jx-palette' },
      h('b', {}, s.palette),
      ...colors.map(([n, c]) => h('span', {}, setVar(h('i'), '--sw', c), h('small', {}, n, h('em', {}, c)))),
      h('span', { class: 'jx-font' }, h('b', {}, 'Aa'), h('small', {}, s.type, h('em', {}, 'Space Grotesk')))));
}

/* ---------- 03 Mini shop ---------- */
function cartIcon() {
  return svg('svg', { viewBox: '0 0 24 24', width: 18, height: 18, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' },
    svg('path', { d: 'M6 7h12l-1 13H7L6 7z' }), svg('path', { d: 'M9 7a3 3 0 0 1 6 0' }));
}
function miniShop() {
  const s = tx().s3;
  const st = { page: 'home', product: null, grind: 0, size: 0, cart: [], order: 1042 };
  const view = h('div', { class: 'jx-shop__view' });
  const count = h('b', { class: 'jx-shop__count' }, '0');
  const priceOf = (p, size) => (p.sub ? p.price : size ? Math.round(p.price * 3.4 * 10) / 10 : p.price);
  const items = () => st.cart.reduce((n, c) => n + c.qty, 0);
  const sum = () => st.cart.reduce((n, c) => n + c.price * c.qty, 0);
  const nav = (label, page) => { const b = h('button', { type: 'button', 'data-p': page }, label); b.addEventListener('click', () => go(page)); return b; };
  const navHome = nav(s.home, 'home'), navShop = nav(s.shop, 'shop');
  const cartBtn = h('button', { type: 'button', class: 'jx-shop__cartbtn', 'aria-label': s.cart }, cartIcon(), count);
  cartBtn.addEventListener('click', () => go('cart'));
  const brand = h('button', { type: 'button', class: 'jx-shop__brand', 'aria-label': 'MORA' }, sunMark(20), h('b', {}, 'MORA'));
  brand.addEventListener('click', () => go('home'));
  const updateCount = () => { count.textContent = String(items()); cartBtn.classList.remove('is-bump'); void cartBtn.offsetWidth; cartBtn.classList.add('is-bump'); };

  const card = (p) => {
    const b = h('button', { type: 'button', class: 'jx-pcard' }, bag(p.color), h('b', {}, p.name), h('small', {}, loc(p.note)), h('span', {}, money(p.price), p.sub ? ' ' + s.perMonth : ''));
    b.addEventListener('click', () => { st.product = p; st.grind = 0; st.size = 0; go('product'); });
    return b;
  };
  const chips = (list, key, onPick) => h('div', { class: 'jx-chips' }, ...list.map((l, i) => {
    const c = h('button', { type: 'button', class: 'jx-chip', 'aria-pressed': String(st[key] === i) }, l);
    c.addEventListener('click', () => { st[key] = i; onPick(); });
    return c;
  }));

  const pages = {
    home: () => [
      h('div', { class: 'jx-shop__hero' }, h('div', {}, h('h5', {}, s.heroT), h('p', {}, s.heroP), (() => { const b = h('button', { type: 'button', class: 'jx-btn' }, s.toShop + ' →'); b.addEventListener('click', () => go('shop')); return b; })()), bag('#d9653b')),
      h('h6', {}, s.best), h('div', { class: 'jx-grid' }, card(PRODUCTS[0]), card(PRODUCTS[3]))],
    shop: () => [h('h6', {}, s.shop), h('div', { class: 'jx-grid' }, ...PRODUCTS.map(card))],
    product: () => {
      const p = st.product;
      const price = h('span', { class: 'jx-price' }, money(priceOf(p, st.size)), p.sub ? ' ' + s.perMonth : '');
      const add = h('button', { type: 'button', class: 'jx-btn' }, s.add);
      add.addEventListener('click', () => {
        const pr = priceOf(p, st.size);
        const key = p.id + st.grind + st.size;
        const ex = st.cart.find((c) => c.key === key);
        if (ex) ex.qty++; else st.cart.push({ key, p, price: pr, qty: 1, info: s.grinds[st.grind] + (p.sub ? '' : ' · ' + (st.size ? '1 kg' : '250 g')) });
        updateCount();
        add.textContent = s.added; add.disabled = true;
        setTimeout(() => { if (add.isConnected) { add.textContent = s.add; add.disabled = false; } }, 1100);
      });
      const back = h('button', { type: 'button', class: 'jx-link' }, s.back);
      back.addEventListener('click', () => go('shop'));
      return [back, h('div', { class: 'jx-product' }, bag(p.color, { label: p.name }),
        h('div', {}, h('h5', {}, p.name), h('small', {}, loc(p.note)), price,
          h('p', { class: 'jx-lbl' }, s.grind), chips(s.grinds, 'grind', render),
          p.sub ? null : [h('p', { class: 'jx-lbl' }, s.size), chips(['250 g', '1 kg'], 'size', render)],
          add))];
    },
    cart: () => {
      if (!st.cart.length) return [h('h6', {}, s.cart), h('p', { class: 'jx-empty' }, s.empty)];
      const sub = sum(), ship = sub >= 30 ? 0 : 4.9;
      const rows = st.cart.map((c) => {
        const minus = h('button', { type: 'button', 'aria-label': '−' }, '−'), plus = h('button', { type: 'button', 'aria-label': '+' }, '+');
        minus.addEventListener('click', () => { c.qty--; if (!c.qty) st.cart.splice(st.cart.indexOf(c), 1); updateCount(); render(); });
        plus.addEventListener('click', () => { c.qty++; updateCount(); render(); });
        return h('li', {}, setVar(h('i', { class: 'jx-dot' }), '--bag', c.p.color), h('div', {}, h('b', {}, c.p.name), h('small', {}, c.info)), h('span', { class: 'jx-qty' }, minus, String(c.qty), plus), h('span', {}, money(c.price * c.qty)));
      });
      const checkout = h('button', { type: 'button', class: 'jx-btn' }, s.checkout + ' →');
      checkout.addEventListener('click', () => go('thanks'));
      return [h('h6', {}, s.cart), h('ul', { class: 'jx-cart' }, ...rows),
        h('dl', { class: 'jx-sum' }, h('dt', {}, s.sub), h('dd', {}, money(sub)), h('dt', {}, s.ship), h('dd', {}, ship ? money(ship) : s.free), h('dt', {}, s.total), h('dd', {}, h('b', {}, money(sub + ship)))), checkout];
    },
    thanks: () => {
      const id = st.order++;
      st.cart = []; count.textContent = '0';
      const again = h('button', { type: 'button', class: 'jx-btn' }, s.again);
      again.addEventListener('click', () => go('shop'));
      return [h('div', { class: 'jx-thanks' }, h('span', { class: 'jx-thanks__ok' }, icon('check', 28)), h('h5', {}, s.thanks), h('p', {}, s.order + ' #MORA-' + id), h('small', {}, s.demo), again)];
    }
  };
  function render() {
    view.replaceChildren(...pages[st.page]().flat());
    [navHome, navShop].forEach((b) => b.setAttribute('aria-current', String(b.dataset.p === st.page || (st.page === 'product' && b.dataset.p === 'shop'))));
  }
  function go(page) { st.page = page; render(); view.scrollTop = 0; }
  render();
  return h('div', { class: 'jx jx--shop' },
    h('div', { class: 'jx-browser' },
      h('div', { class: 'jx-browser__bar' }, h('i'), h('i'), h('i'), h('span', {}, '🔒 ' + s.url)),
      h('div', { class: 'jx-shop' }, h('nav', { class: 'jx-shop__nav' }, brand, h('div', {}, navHome, navShop, cartBtn)), view)),
    h('p', { class: 'jx-hint' }, s.demo));
}

/* ---------- 04 Automation ---------- */
function automation() {
  const s = tx().s4;
  let stock = 48, order = 1042, done = 0, running = false;
  const nodes = s.flow.map(([t], i) => h('li', { class: 'jx-flow__n' }, h('span', { class: 'jx-flow__ic' }, String(i + 1)), h('div', {}, h('b', {}, t), h('small', {}, '…'))));
  const doneEl = h('b', {}, '0'), savedEl = h('b', {}, '0');
  const btn = h('button', { type: 'button', class: 'jx-btn' }, '▶ ' + s.trigger);
  const fill = (i) => s.flow[i][1].replace('{n}', order).replace('{a}', stock + 1).replace('{b}', stock);
  async function run() {
    if (running) return;
    running = true; btn.disabled = true; btn.textContent = s.running;
    stock--;
    nodes.forEach((n) => n.classList.remove('is-on'));
    for (let i = 0; i < nodes.length; i++) {
      await sleep(reduced ? 0 : 520);
      if (!root.isConnected) return;
      nodes[i].querySelector('small').textContent = fill(i);
      nodes[i].classList.add('is-on');
    }
    done++; order++;
    doneEl.textContent = String(done); savedEl.textContent = String(done * 12);
    running = false; btn.disabled = false; btn.textContent = '▶ ' + s.trigger;
  }
  btn.addEventListener('click', run);
  const root = h('div', { class: 'jx jx--auto' },
    h('ol', { class: 'jx-flow' }, ...nodes),
    h('div', { class: 'jx-auto__side' }, btn,
      h('div', { class: 'jx-kpi' }, doneEl, h('small', {}, s.done)),
      h('div', { class: 'jx-kpi' }, savedEl, h('small', {}, s.saved)),
      h('p', { class: 'jx-hint' }, s.manual)));
  setTimeout(run, 500);
  return root;
}

/* ---------- 05 AI assistant ---------- */
function aiChat() {
  const s = tx().s5;
  const log = h('div', { class: 'jx-chat__log' });
  const add = (cls, ...kids) => { const m = h('div', { class: 'jx-msg ' + cls }, ...kids); log.append(m); log.scrollTop = log.scrollHeight; return m; };
  add('is-bot', s.hello);
  let busy = false;
  async function ask(q, a, pi) {
    if (busy) return;
    busy = true; chips.forEach((c) => { c.disabled = true; });
    add('is-user', q);
    const typing = add('is-bot is-typing', h('i'), h('i'), h('i'));
    await sleep(reduced ? 0 : 900);
    if (!log.isConnected) return;
    typing.classList.remove('is-typing');
    typing.replaceChildren(h('small', {}, '✦ ' + s.aiLabel), a);
    if (pi != null) {
      const p = PRODUCTS[pi];
      typing.append(h('div', { class: 'jx-msg__prod' }, bag(p.color), h('div', {}, h('b', {}, p.name), h('small', {}, money(p.price)))));
    }
    log.scrollTop = log.scrollHeight;
    busy = false; chips.forEach((c) => { c.disabled = false; });
  }
  const chips = s.qa.map(([q, a, pi]) => { const c = h('button', { type: 'button', class: 'jx-chip' }, q); c.addEventListener('click', () => ask(q, a, pi)); return c; });
  setTimeout(() => ask(...s.qa[0]), 700);
  return h('div', { class: 'jx jx--ai' },
    h('div', { class: 'jx-chat' },
      h('div', { class: 'jx-chat__head' }, sunMark(22), h('b', {}, s.title), h('span', { class: 'jx-aitag' }, s.tag)),
      log,
      h('div', { class: 'jx-chips jx-chips--q' }, ...chips)),
    h('div', { class: 'jx-stats' }, ...s.stats.map(([v, l]) => h('div', {}, h('b', {}, v), h('small', {}, l)))),
    h('p', { class: 'jx-hint' }, s.note));
}

/* ---------- 06 Growth ---------- */
function growth() {
  const s = tx().s6;
  const D = { orders: [40, 95, 160, 220, 270, 320], fol: [900, 1800, 2900, 4100, 5200, 6400], roas: [2.1, 2.8, 3.4, 3.9, 4.3, 4.6] };
  const kpi = (label) => { const v = h('b'); return [v, h('div', { class: 'jx-kpi' }, v, h('small', {}, label))]; };
  const [oV, oK] = kpi(s.orders), [rV, rK] = kpi(s.revenue), [fV, fK] = kpi(s.followers), [aV, aK] = kpi(s.roas);
  const bars = D.orders.map((o, i) => setVar(h('span', { class: 'jx-bar' }, h('i'), h('small', {}, String(i + 1))), '--h', (o / 320) * 100 + '%'));
  const range = h('input', { type: 'range', min: '1', max: '6', step: '1', value: '1', 'aria-label': s.month });
  const mLabel = h('b', {}, '1');
  const set = (m) => {
    const i = m - 1;
    mLabel.textContent = String(m);
    oV.textContent = num(D.orders[i]); rV.textContent = money(D.orders[i] * 24.5);
    fV.textContent = num(D.fol[i]); aV.textContent = num(D.roas[i], 1) + '×';
    bars.forEach((b, k) => b.classList.toggle('is-on', k <= i));
  };
  range.addEventListener('input', () => { auto = false; set(Number(range.value)); });
  set(1);
  let auto = !reduced;
  (async () => { for (let m = 2; m <= 6 && auto; m++) { await sleep(650); if (!auto || !range.isConnected) return; range.value = String(m); set(m); } })();
  return h('div', { class: 'jx jx--growth' },
    h('div', { class: 'jx-ad' },
      h('div', { class: 'jx-ad__head' }, h('span', { class: 'jx-ad__av' }, sunMark(16)), h('div', {}, h('b', {}, 'mora.coffee'), h('small', {}, s.sponsored))),
      h('div', { class: 'jx-ad__img' }, bag('#d9653b', { label: 'Espresso No. 1' }), h('p', {}, s.ad)),
      h('div', { class: 'jx-ad__cta' }, h('span', {}, 'mora-coffee.de'), h('b', {}, s.cta))),
    h('div', { class: 'jx-dash' },
      h('label', { class: 'jx-month' }, h('span', {}, s.month, ': ', mLabel), range),
      h('div', { class: 'jx-kpis' }, oK, rK, fK, aK),
      h('div', { class: 'jx-bars' }, ...bars),
      h('p', { class: 'jx-hint' }, s.sample)));
}

export const JOURNEY_VIEWS = [board, brandCompare, miniShop, automation, aiChat, growth];

export function clientCard() {
  const c = tx().client;
  return h('div', { class: 'jx-client' },
    h('div', { class: 'jx-client__logos', 'aria-hidden': 'true' }, logo(true, 'is-sm'), h('span', { class: 'jx-client__arrow' }, '→'), logo(false, 'is-sm')),
    h('div', {}, h('small', {}, c.label), h('p', {}, h('b', {}, c.name), ' – ', c.desc), h('p', { class: 'jx-client__goal' }, c.goal)));
}
export const exampleLabel = () => tx().example;
