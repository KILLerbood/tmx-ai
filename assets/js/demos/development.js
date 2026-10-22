// Development page: 3D design carousel, app mock, a working mini shop,
// a live dashboard and a support-chat system. Everything runs in the browser.
import { h, icon, L, section, browser, phone, onVisible, ticker, money, num, countTo, svg, smoothPath, chatLog, norm, sleep, reduced } from './kit.js';

const T = {
  demo: { de: 'Live-Demo · läuft lokal im Browser', en: 'Live demo · runs locally in your browser', ru: 'Живое демо · работает в браузере' },
  design: {
    eyebrow: { de: 'Webdesign in 3D', en: 'Web design in 3D', ru: 'Веб-дизайн в 3D' },
    title: { de: 'Fünf Branchen. Fünf Handschriften.', en: 'Five industries. Five signatures.', ru: 'Пять отраслей. Пять почерков.' },
    text: { de: 'Ziehen, klicken oder wischen Sie: Jede Website bekommt ein eigenes Design-System – Farben, Typografie und Layout passend zur Marke.', en: 'Drag, click or swipe: every website gets its own design system – colours, type and layout tailored to the brand.', ru: 'Тяните, нажимайте или листайте: у каждого сайта своя дизайн-система – цвета, шрифты и сетка под бренд.' },
    prev: { de: 'Vorheriges Design', en: 'Previous design', ru: 'Предыдущий дизайн' },
    next: { de: 'Nächstes Design', en: 'Next design', ru: 'Следующий дизайн' }
  },
  app: {
    eyebrow: { de: 'App-Entwicklung', en: 'App development', ru: 'Разработка приложений' },
    title: { de: 'Apps, die sich nativ anfühlen.', en: 'Apps that feel native.', ru: 'Приложения, которые ощущаются нативными.' },
    text: { de: 'Wischen Sie durch die Screens einer Buchungs-App: Login, Übersicht und Termin – responsiv, schnell und barrierearm.', en: 'Swipe through the screens of a booking app: login, overview and appointment – responsive, fast and accessible.', ru: 'Пролистайте экраны приложения для записи: вход, обзор и запись – быстро, адаптивно, доступно.' },
    points: {
      de: ['iOS & Android aus einer Codebasis', 'Offline-fähig als PWA', 'Push, Login, Zahlungen', 'Anbindung an Ihr Backend'],
      en: ['iOS & Android from one codebase', 'Offline-ready as a PWA', 'Push, login, payments', 'Connected to your backend'],
      ru: ['iOS и Android из одной кодовой базы', 'Работает офлайн как PWA', 'Push, вход, платежи', 'Интеграция с вашим бэкендом']
    }
  },
  shop: {
    eyebrow: { de: 'Onlineshops', en: 'E-commerce', ru: 'Интернет-магазины' },
    title: { de: 'Ein echter Shop – im Kleinformat.', en: 'A real shop – in miniature.', ru: 'Настоящий магазин – в миниатюре.' },
    text: { de: 'Scrollen Sie im Fenster, filtern Sie Kategorien, legen Sie Produkte in den Warenkorb und gehen Sie zur Kasse.', en: 'Scroll inside the window, filter categories, add products to the cart and check out.', ru: 'Прокрутите окно, отфильтруйте категории, добавьте товары в корзину и оформите заказ.' },
    hero: { de: 'Herbst-Kollektion', en: 'Autumn collection', ru: 'Осенняя коллекция' },
    heroSub: { de: 'Handgemachtes Design für Ihr Zuhause', en: 'Handmade design for your home', ru: 'Дизайн ручной работы для вашего дома' },
    shopNow: { de: 'Jetzt entdecken', en: 'Discover now', ru: 'Смотреть' },
    all: { de: 'Alle', en: 'All', ru: 'Все' },
    cats: { decor: { de: 'Deko', en: 'Decor', ru: 'Декор' }, light: { de: 'Licht', en: 'Light', ru: 'Свет' }, living: { de: 'Wohnen', en: 'Living', ru: 'Интерьер' } },
    add: { de: 'In den Warenkorb', en: 'Add to cart', ru: 'В корзину' },
    added: { de: 'Hinzugefügt', en: 'Added', ru: 'Добавлено' },
    cart: { de: 'Warenkorb', en: 'Cart', ru: 'Корзина' },
    empty: { de: 'Ihr Warenkorb ist leer.', en: 'Your cart is empty.', ru: 'Корзина пуста.' },
    total: { de: 'Gesamt (inkl. MwSt.)', en: 'Total (incl. VAT)', ru: 'Итого (вкл. НДС)' },
    checkout: { de: 'Zur Kasse', en: 'Checkout', ru: 'Оформить' },
    close: { de: 'Schließen', en: 'Close', ru: 'Закрыть' },
    success: { de: 'Danke! Demo-Bestellung #TMX-1042 aufgegeben.', en: 'Thank you! Demo order #TMX-1042 placed.', ru: 'Спасибо! Демо-заказ #TMX-1042 оформлен.' },
    note: { de: 'Demo-Shop · keine echten Produkte, keine Zahlung', en: 'Demo shop · no real products, no payment', ru: 'Демо-магазин · без реальных товаров и оплаты' },
    features: {
      de: ['Warenkorb & Checkout', 'Filter & Suche', 'Zahlungsanbieter', 'Rechtstexte für DE'],
      en: ['Cart & checkout', 'Filters & search', 'Payment providers', 'German legal texts'],
      ru: ['Корзина и оформление', 'Фильтры и поиск', 'Платёжные системы', 'Юр. тексты для Германии']
    }
  },
  dash: {
    eyebrow: { de: 'Digitale Systeme & Dashboards', en: 'Digital systems & dashboards', ru: 'Цифровые системы и дашборды' },
    title: { de: 'Ihr Unternehmen auf einen Blick.', en: 'Your business at a glance.', ru: 'Ваш бизнес – с одного взгляда.' },
    text: { de: 'Ein Dashboard, das sich live aktualisiert: Umsatz, Bestellungen, Traffic-Quellen und neue Aufträge.', en: 'A dashboard that updates live: revenue, orders, traffic sources and new jobs.', ru: 'Дашборд, который обновляется в реальном времени: выручка, заказы, источники трафика.' },
    kpis: {
      de: ['Umsatz heute', 'Bestellungen', 'Conversion', 'Besucher live'],
      en: ['Revenue today', 'Orders', 'Conversion', 'Live visitors'],
      ru: ['Выручка сегодня', 'Заказы', 'Конверсия', 'Посетители онлайн']
    },
    chart: { de: 'Umsatz · letzte 24 Stunden', en: 'Revenue · last 24 hours', ru: 'Выручка · 24 часа' },
    sources: { de: 'Traffic-Quellen', en: 'Traffic sources', ru: 'Источники трафика' },
    srcNames: { de: ['Suche', 'Social', 'Direkt', 'E-Mail'], en: ['Search', 'Social', 'Direct', 'E-mail'], ru: ['Поиск', 'Соцсети', 'Прямые', 'E-mail'] },
    orders: { de: 'Neueste Aufträge', en: 'Latest orders', ru: 'Последние заказы' },
    status: { de: ['Neu', 'Bezahlt', 'Versendet'], en: ['New', 'Paid', 'Shipped'], ru: ['Новый', 'Оплачен', 'Отправлен'] },
    data: { de: 'Demo-Daten', en: 'Demo data', ru: 'Демо-данные' }
  },
  chat: {
    eyebrow: { de: 'Chat- & Supportsysteme', en: 'Chat & support systems', ru: 'Чаты и системы поддержки' },
    title: { de: 'Support, der nie schläft.', en: 'Support that never sleeps.', ru: 'Поддержка, которая не спит.' },
    text: { de: 'Links fragt der Kunde, rechts sieht Ihr Team die Tickets. Probieren Sie die Schnellantworten oder schreiben Sie selbst.', en: 'On the left the customer asks, on the right your team sees the tickets. Try the quick replies or type yourself.', ru: 'Слева клиент задаёт вопрос, справа команда видит тикеты. Нажмите быстрый ответ или напишите сами.' },
    widget: { de: 'Kunden-Chat', en: 'Customer chat', ru: 'Чат клиента' },
    inbox: { de: 'Team-Posteingang', en: 'Team inbox', ru: 'Входящие команды' },
    hello: { de: 'Hallo! 👋 Wie kann ich helfen?', en: 'Hi! 👋 How can I help?', ru: 'Здравствуйте! 👋 Чем помочь?' },
    bot: { de: 'Support-Bot', en: 'Support bot', ru: 'Бот поддержки' },
    agent: { de: 'Lena · Support-Team', en: 'Lena · Support team', ru: 'Лена · поддержка' },
    quick: {
      de: ['Wo ist meine Bestellung?', 'Ich möchte etwas zurückgeben', 'Mit einem Menschen sprechen'],
      en: ['Where is my order?', 'I want to return something', 'Talk to a human'],
      ru: ['Где мой заказ?', 'Хочу вернуть товар', 'Связаться с человеком']
    },
    answers: {
      order: { de: 'Ihre Bestellung #TMX-1042 ist unterwegs 🚚 – Zustellung voraussichtlich morgen zwischen 10 und 14 Uhr.', en: 'Your order #TMX-1042 is on its way 🚚 – expected delivery tomorrow between 10 am and 2 pm.', ru: 'Ваш заказ #TMX-1042 в пути 🚚 – доставка ожидается завтра с 10 до 14.' },
      ret: { de: 'Kein Problem! Ich habe Ihnen ein Rücksende-Etikett erstellt. Sie haben 30 Tage Zeit.', en: 'No problem! I have created a return label for you. You have 30 days.', ru: 'Без проблем! Я создал этикетку для возврата. У вас есть 30 дней.' },
      human: { de: 'Ich verbinde Sie mit unserem Team. Ein Ticket wurde erstellt.', en: 'Connecting you with our team. A ticket has been created.', ru: 'Соединяю с командой. Тикет создан.' },
      agentHi: { de: 'Hallo, hier ist Lena. Ich habe Ihren Verlauf vor mir – wie kann ich weiterhelfen?', en: 'Hi, Lena here. I can see your conversation – how can I help further?', ru: 'Здравствуйте, это Лена. Я вижу вашу переписку – чем ещё помочь?' },
      fallback: { de: 'Danke! Das habe ich an unser Team weitergeleitet – Ticket erstellt.', en: 'Thanks! I have passed this on to our team – ticket created.', ru: 'Спасибо! Я передал это команде – тикет создан.' }
    },
    placeholder: { de: 'Nachricht schreiben …', en: 'Write a message …', ru: 'Напишите сообщение …' },
    send: { de: 'Senden', en: 'Send', ru: 'Отправить' },
    tickets: { de: 'Tickets', en: 'Tickets', ru: 'Тикеты' },
    states: { de: ['Neu', 'In Bearbeitung', 'Gelöst'], en: ['New', 'In progress', 'Solved'], ru: ['Новый', 'В работе', 'Решён'] },
    stats: { de: ['Ø Antwortzeit', 'Automatisch gelöst', 'Verfügbarkeit'], en: ['Avg. response', 'Solved automatically', 'Availability'], ru: ['Ср. время ответа', 'Решено автоматически', 'Доступность'] },
    note: { de: 'Demo: Ihre Eingaben bleiben in Ihrem Browser.', en: 'Demo: your input stays in your browser.', ru: 'Демо: ваши данные остаются в браузере.' }
  }
};

/* ---------------- 1. 3D design carousel ---------------- */

const SITES = [
  { key: 'bistro', name: 'Bistro Aurora', tag: { de: 'Restaurant', en: 'Restaurant', ru: 'Ресторан' }, title: { de: 'Saisonal. Regional. Unvergesslich.', en: 'Seasonal. Local. Unforgettable.', ru: 'Сезонно. Локально. Незабываемо.' }, cta: { de: 'Tisch reservieren', en: 'Book a table', ru: 'Забронировать' } },
  { key: 'nordwerk', name: 'NORDWERK', tag: { de: 'Architektur', en: 'Architecture', ru: 'Архитектура' }, title: { de: 'Räume, die bleiben.', en: 'Spaces that last.', ru: 'Пространства, которые остаются.' }, cta: { de: 'Projekte ansehen', en: 'View projects', ru: 'Проекты' } },
  { key: 'pulse', name: 'PULSE', tag: { de: 'Fitness', en: 'Fitness', ru: 'Фитнес' }, title: { de: 'Stärker. Jeden Tag.', en: 'Stronger. Every day.', ru: 'Сильнее. Каждый день.' }, cta: { de: 'Probetraining', en: 'Free trial', ru: 'Пробное занятие' } },
  { key: 'lumen', name: 'Lumen Skin', tag: { de: 'Kosmetik-Shop', en: 'Beauty shop', ru: 'Косметика' }, title: { de: 'Klare Haut. Klare Inhaltsstoffe.', en: 'Clear skin. Clear ingredients.', ru: 'Чистая кожа. Честный состав.' }, cta: { de: 'Jetzt shoppen', en: 'Shop now', ru: 'В магазин' } },
  { key: 'vectra', name: 'Vectra', tag: { de: 'SaaS-Plattform', en: 'SaaS platform', ru: 'SaaS-платформа' }, title: { de: 'Daten, die entscheiden.', en: 'Data that decides.', ru: 'Данные, которые решают.' }, cta: { de: 'Kostenlos testen', en: 'Start free', ru: 'Попробовать' } }
];

function siteMock(s) {
  return h('div', { class: 'mock mock--' + s.key, 'aria-hidden': 'true' },
    h('div', { class: 'mock__nav' }, h('b', {}, s.name), h('span', { class: 'mock__links' }, h('i'), h('i'), h('i')), h('span', { class: 'mock__pill' })),
    h('div', { class: 'mock__hero' },
      h('div', { class: 'mock__copy' },
        h('span', { class: 'mock__kicker' }, L(s.tag)),
        h('span', { class: 'mock__h' }, L(s.title)),
        h('span', { class: 'mock__lines' }, h('i'), h('i')),
        h('span', { class: 'mock__btn' }, L(s.cta))),
      h('div', { class: 'mock__art' }, h('span'), h('span'), h('span'))),
    h('div', { class: 'mock__cards' }, h('span'), h('span'), h('span')));
}

function designCarousel() {
  const n = SITES.length;
  let index = 0, drag = null, auto = null;
  const ring = h('div', { class: 'carousel__ring' });
  const panels = SITES.map((s, i) => {
    const p = h('figure', { class: 'carousel__panel', 'data-i': String(i) }, siteMock(s));
    ring.append(p);
    return p;
  });
  const caption = h('p', { class: 'carousel__caption', 'aria-live': 'polite' });
  const prev = h('button', { type: 'button', class: 'icon-btn', 'aria-label': L(T.design.prev) }, icon('arrow', 18));
  const next = h('button', { type: 'button', class: 'icon-btn', 'aria-label': L(T.design.next) }, icon('arrow', 18));
  const dots = h('div', { class: 'carousel__dots' }, ...SITES.map((s, i) => {
    const d = h('button', { type: 'button', class: 'dot', 'aria-label': s.name });
    d.addEventListener('click', () => go(i));
    return d;
  }));
  const stage = h('div', { class: 'carousel', tabindex: '0', role: 'group', 'aria-roledescription': 'carousel', 'aria-label': L(T.design.eyebrow) }, ring);

  function layout() {
    const w = stage.clientWidth;
    const pw = Math.min(560, w * 0.72);
    const radius = Math.round((pw / 2) / Math.tan(Math.PI / n)) + 40;
    stage.style.setProperty('--pw', pw + 'px');
    stage.style.setProperty('--radius', radius + 'px');
    panels.forEach((p, i) => p.style.setProperty('--a', (i * 360 / n) + 'deg'));
    render();
  }
  function render(extra = 0) {
    ring.style.setProperty('--rot', (-index * 360 / n + extra) + 'deg');
    const active = ((index % n) + n) % n;
    panels.forEach((p, i) => p.classList.toggle('is-active', i === active));
    [...dots.children].forEach((d, i) => d.setAttribute('aria-current', i === active ? 'true' : 'false'));
    const s = SITES[active];
    caption.textContent = s.name + ' — ' + L(s.tag);
  }
  function go(i) { index = i; render(); }
  prev.addEventListener('click', () => { index--; render(); });
  next.addEventListener('click', () => { index++; render(); });
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { index--; render(); }
    if (e.key === 'ArrowRight') { index++; render(); }
  });
  stage.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, moved: 0 }; stage.setPointerCapture(e.pointerId); ring.classList.add('is-drag'); });
  stage.addEventListener('pointermove', (e) => {
    if (!drag) return;
    drag.moved = e.clientX - drag.x;
    render(drag.moved * 0.25);
  });
  const end = () => {
    if (!drag) return;
    const step = Math.round(-drag.moved / (stage.clientWidth * 0.25));
    index += step; drag = null; ring.classList.remove('is-drag'); render();
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  stage.addEventListener('pointerenter', () => { clearInterval(auto); auto = null; });

  window.addEventListener('resize', layout);
  requestAnimationFrame(layout);
  if (!reduced) onVisible(stage, () => { auto ||= setInterval(() => { index++; render(); }, 3800); }, () => { clearInterval(auto); auto = null; });

  return section({ id: 'demo-design', eyebrow: L(T.design.eyebrow), title: L(T.design.title), text: L(T.design.text), badge: L(T.demo) },
    h('div', { class: 'carousel-wrap', 'data-reveal': '' },
      stage,
      h('div', { class: 'carousel__controls' }, prev, caption, next),
      dots));
}

/* ---------------- 2. App mock ---------------- */

function appSection() {
  const screens = h('div', { class: 'app__screens', tabindex: '0', 'aria-label': L(T.app.eyebrow) },
    h('div', { class: 'app__screen app__screen--login' },
      h('div', { class: 'app__logo' }, 'studio', h('b', {}, '.')),
      h('p', { class: 'app__big' }, L({ de: 'Willkommen zurück', en: 'Welcome back', ru: 'С возвращением' })),
      h('span', { class: 'app__input' }, 'anna@mail.de'),
      h('span', { class: 'app__input' }, '••••••••'),
      h('span', { class: 'app__btn' }, L({ de: 'Anmelden', en: 'Sign in', ru: 'Войти' })),
      h('span', { class: 'app__hint' }, 'Face ID')),
    h('div', { class: 'app__screen' },
      h('p', { class: 'app__small' }, L({ de: 'Hallo Anna', en: 'Hi Anna', ru: 'Привет, Анна' })),
      h('p', { class: 'app__big' }, L({ de: 'Deine Woche', en: 'Your week', ru: 'Твоя неделя' })),
      h('div', { class: 'app__ring' }, h('span', {}, '4/5')),
      ...['Yoga Flow', 'HIIT 30', 'Pilates'].map((n, i) => h('div', { class: 'app__row' }, h('i', { class: 'c' + i }), h('span', {}, n), h('small', {}, ['08:00', '18:30', '19:15'][i])))),
    h('div', { class: 'app__screen' },
      h('p', { class: 'app__small' }, L({ de: 'Termin buchen', en: 'Book a session', ru: 'Записаться' })),
      h('p', { class: 'app__big' }, 'Pilates'),
      h('div', { class: 'app__days' }, ...['Mo', 'Di', 'Mi', 'Do', 'Fr'].map((d, i) => h('span', { class: i === 2 ? 'on' : '' }, d))),
      h('div', { class: 'app__slots' }, ...['09:00', '12:30', '17:00', '19:15'].map((d, i) => h('span', { class: i === 3 ? 'on' : '' }, d))),
      h('span', { class: 'app__btn' }, L({ de: 'Jetzt buchen', en: 'Book now', ru: 'Записаться' }))));
  const pager = h('div', { class: 'app__pager', 'aria-hidden': 'true' }, h('i', { class: 'on' }), h('i'), h('i'));
  screens.addEventListener('scroll', () => {
    const i = Math.round(screens.scrollLeft / screens.clientWidth);
    [...pager.children].forEach((d, k) => d.classList.toggle('on', k === i));
  }, { passive: true });
  let auto;
  if (!reduced) onVisible(screens, () => {
    auto = setInterval(() => {
      const i = Math.round(screens.scrollLeft / screens.clientWidth);
      screens.scrollTo({ left: ((i + 1) % 3) * screens.clientWidth, behavior: 'smooth' });
    }, 3200);
  }, () => clearInterval(auto));
  screens.addEventListener('pointerdown', () => clearInterval(auto), { once: true });

  return section({ id: 'demo-app', eyebrow: L(T.app.eyebrow), title: L(T.app.title), text: L(T.app.text) },
    h('div', { class: 'app-grid' },
      h('div', { class: 'app-phone', 'data-reveal': '', 'data-tilt': '' }, phone(screens, pager)),
      h('ul', { class: 'check-list', 'data-reveal': '' }, ...L(T.app.points).map((p) => h('li', {}, icon('check', 18), p)))));
}

/* ---------------- 3. Mini shop ---------------- */

const PRODUCTS = [
  { id: 1, cat: 'decor', price: 39, name: { de: 'Vase „Dune“', en: 'Vase “Dune”', ru: 'Ваза «Dune»' }, art: 'vase' },
  { id: 2, cat: 'light', price: 129, name: { de: 'Leuchte „Halo“', en: 'Lamp “Halo”', ru: 'Лампа «Halo»' }, art: 'lamp' },
  { id: 3, cat: 'living', price: 249, name: { de: 'Sessel „Oslo“', en: 'Chair “Oslo”', ru: 'Кресло «Oslo»' }, art: 'chair' },
  { id: 4, cat: 'decor', price: 19, name: { de: 'Tasse „Clay“', en: 'Mug “Clay”', ru: 'Кружка «Clay»' }, art: 'mug' },
  { id: 5, cat: 'living', price: 59, name: { de: 'Pflanze „Ficus“', en: 'Plant “Ficus”', ru: 'Растение «Ficus»' }, art: 'plant' },
  { id: 6, cat: 'light', price: 24, name: { de: 'Kerze „Ember“', en: 'Candle “Ember”', ru: 'Свеча «Ember»' }, art: 'candle' }
];

function productArt(kind) {
  const s = svg('svg', { viewBox: '0 0 120 120', 'aria-hidden': 'true', class: 'shop__art-svg' });
  const add = (tag, a) => s.append(svg(tag, a));
  add('ellipse', { cx: 60, cy: 104, rx: 34, ry: 5, fill: 'rgba(0,0,0,.18)' });
  if (kind === 'vase') { add('path', { d: 'M48 26h24l-4 14c14 8 18 22 14 38-3 14-12 24-22 24s-19-10-22-24c-4-16 0-30 14-38z', fill: '#c9a27e' }); add('path', { d: 'M44 64h32', stroke: '#a7805e', 'stroke-width': 3 }); }
  if (kind === 'lamp') { add('path', { d: 'M36 50 L60 18 L84 50 Z', fill: '#f5d77a' }); add('rect', { x: 58, y: 50, width: 4, height: 46, fill: '#3a3550' }); add('rect', { x: 44, y: 96, width: 32, height: 6, rx: 3, fill: '#3a3550' }); add('circle', { cx: 60, cy: 56, r: 10, fill: 'rgba(255,220,120,.35)' }); }
  if (kind === 'chair') { add('rect', { x: 32, y: 30, width: 56, height: 44, rx: 14, fill: '#7c6cf0' }); add('rect', { x: 26, y: 62, width: 68, height: 22, rx: 10, fill: '#6a5ae0' }); add('rect', { x: 34, y: 84, width: 5, height: 18, fill: '#2b2640' }); add('rect', { x: 81, y: 84, width: 5, height: 18, fill: '#2b2640' }); }
  if (kind === 'mug') { add('rect', { x: 34, y: 42, width: 44, height: 54, rx: 10, fill: '#e8e2d6' }); add('path', { d: 'M78 54c14 0 14 26 0 26', stroke: '#e8e2d6', 'stroke-width': 7, fill: 'none' }); add('path', { d: 'M48 26c0 6 6 6 6 12M60 22c0 6 6 6 6 12', stroke: '#b9b0c9', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }); }
  if (kind === 'plant') { add('path', { d: 'M42 72h36l-5 30H47z', fill: '#d9805f' }); add('path', { d: 'M60 72C50 50 34 46 30 30c14 2 26 14 30 30 4-16 16-28 30-30-4 16-20 20-30 42z', fill: '#4caf7a' }); }
  if (kind === 'candle') { add('rect', { x: 44, y: 48, width: 32, height: 52, rx: 6, fill: '#f1e6d2' }); add('path', { d: 'M60 22c8 10 8 18 0 22-8-4-8-12 0-22z', fill: '#ffb547' }); add('rect', { x: 59, y: 40, width: 2, height: 9, fill: '#3a3550' }); }
  return s;
}

function miniShop() {
  const cart = new Map();
  let filter = 'all';
  const count = h('span', { class: 'shop__count', 'aria-live': 'polite' }, '0');
  const cartBtn = h('button', { type: 'button', class: 'shop__cart-btn', 'aria-label': L(T.shop.cart) }, icon('layers', 18), count);
  const grid = h('ul', { class: 'shop__grid' });
  const toast = h('div', { class: 'shop__toast', role: 'status' });
  const drawerList = h('ul', { class: 'shop__lines' });
  const totalEl = h('strong');
  const checkout = h('button', { type: 'button', class: 'shop__checkout' }, L(T.shop.checkout));
  const closeBtn = h('button', { type: 'button', class: 'shop__close', 'aria-label': L(T.shop.close) }, '×');
  const drawer = h('aside', { class: 'shop__drawer', 'aria-label': L(T.shop.cart) },
    h('div', { class: 'shop__drawer-head' }, h('strong', {}, L(T.shop.cart)), closeBtn),
    drawerList,
    h('div', { class: 'shop__total' }, h('span', {}, L(T.shop.total)), totalEl),
    checkout);

  const chips = h('div', { class: 'shop__chips', role: 'group' },
    ...['all', 'decor', 'light', 'living'].map((c) => {
      const b = h('button', { type: 'button', class: 'shop__chip', 'aria-pressed': String(c === 'all') }, c === 'all' ? L(T.shop.all) : L(T.shop.cats[c]));
      b.addEventListener('click', () => {
        filter = c;
        [...chips.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        renderGrid();
      });
      return b;
    }));

  function renderGrid() {
    grid.replaceChildren(...PRODUCTS.filter((p) => filter === 'all' || p.cat === filter).map((p) => {
      const btn = h('button', { type: 'button', class: 'shop__add' }, L(T.shop.add));
      btn.addEventListener('click', () => {
        cart.set(p.id, (cart.get(p.id) || 0) + 1);
        btn.textContent = '✓ ' + L(T.shop.added);
        setTimeout(() => { btn.textContent = L(T.shop.add); }, 1200);
        flash(L(p.name) + ' · ' + L(T.shop.added));
        update();
      });
      return h('li', { class: 'shop__item' },
        h('div', { class: 'shop__art shop__art--' + p.art }, productArt(p.art)),
        h('span', { class: 'shop__name' }, L(p.name)),
        h('span', { class: 'shop__price' }, money(p.price)),
        btn);
    }));
  }

  function update() {
    let qty = 0, sum = 0;
    drawerList.replaceChildren();
    for (const [id, q] of cart) {
      const p = PRODUCTS.find((x) => x.id === id);
      qty += q; sum += q * p.price;
      const minus = h('button', { type: 'button', 'aria-label': '−' }, '−');
      const plus = h('button', { type: 'button', 'aria-label': '+' }, '+');
      minus.addEventListener('click', () => { q > 1 ? cart.set(id, q - 1) : cart.delete(id); update(); });
      plus.addEventListener('click', () => { cart.set(id, q + 1); update(); });
      drawerList.append(h('li', {},
        h('span', { class: 'shop__line-art' }, productArt(p.art)),
        h('span', { class: 'shop__line-name' }, L(p.name), h('small', {}, money(p.price))),
        h('span', { class: 'shop__qty' }, minus, h('b', {}, String(q)), plus)));
    }
    if (!cart.size) drawerList.append(h('li', { class: 'shop__empty' }, L(T.shop.empty)));
    count.textContent = String(qty);
    count.classList.remove('bump'); void count.offsetWidth; count.classList.add('bump');
    totalEl.textContent = money(sum);
    checkout.disabled = !cart.size;
  }

  function flash(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(flash.t);
    flash.t = setTimeout(() => toast.classList.remove('show'), 1600);
  }

  cartBtn.addEventListener('click', () => drawer.classList.add('open'));
  closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  checkout.addEventListener('click', () => {
    cart.clear(); update(); drawer.classList.remove('open'); flash(L(T.shop.success));
  });

  renderGrid(); update();

  const store = h('div', { class: 'shop' },
    h('div', { class: 'shop__header' },
      h('b', { class: 'shop__logo' }, 'LUMA', h('span', {}, ' home')),
      h('span', { class: 'shop__search' }, icon('spark', 14), L({ de: 'Suchen …', en: 'Search …', ru: 'Поиск …' })),
      cartBtn),
    h('div', { class: 'shop__scroll', tabindex: '0' },
      h('div', { class: 'shop__hero' },
        h('div', {},
          h('span', { class: 'shop__kicker' }, 'New in'),
          h('p', { class: 'shop__hero-title' }, L(T.shop.hero)),
          h('p', { class: 'shop__hero-sub' }, L(T.shop.heroSub)),
          h('span', { class: 'shop__hero-btn' }, L(T.shop.shopNow))),
        h('div', { class: 'shop__hero-art' }, productArt('lamp'))),
      chips,
      grid,
      h('div', { class: 'shop__usp' },
        ...[{ de: 'Kostenloser Versand ab 50 €', en: 'Free shipping from €50', ru: 'Бесплатная доставка от 50 €' }, { de: '30 Tage Rückgabe', en: '30-day returns', ru: 'Возврат 30 дней' }, { de: 'Sicher bezahlen', en: 'Secure payment', ru: 'Безопасная оплата' }]
          .map((u) => h('span', {}, icon('check', 14), L(u)))),
      h('p', { class: 'shop__foot' }, L(T.shop.note))),
    drawer,
    toast);

  return section({ id: 'demo-shop', eyebrow: L(T.shop.eyebrow), title: L(T.shop.title), text: L(T.shop.text), badge: L(T.demo) },
    h('div', { class: 'split', 'data-reveal': '' },
      browser('luma-home.de', store),
      h('ul', { class: 'check-list' }, ...L(T.shop.features).map((p) => h('li', {}, icon('check', 18), p)))));
}

/* ---------------- 4. Live dashboard ---------------- */

function dashboard() {
  const kpiNames = L(T.dash.kpis);
  const state = { revenue: 4820, orders: 63, conv: 3.4, live: 128 };
  const kpiEls = kpiNames.map(() => h('strong', { class: 'kpi__value' }, '0'));
  const deltas = ['+12,4 %', '+8,1 %', '+0,6 pp', ''];
  const kpis = h('div', { class: 'dash__kpis' }, ...kpiNames.map((n, i) => h('div', { class: 'kpi' },
    h('span', { class: 'kpi__label' }, n),
    kpiEls[i],
    deltas[i] ? h('span', { class: 'kpi__delta' }, '▲ ' + deltas[i]) : h('span', { class: 'kpi__live' }, h('i'), 'live'))));

  // Area chart
  const W = 600, H = 200;
  let series = Array.from({ length: 24 }, (_, i) => 80 + Math.sin(i / 3) * 30 + i * 3 + Math.random() * 15);
  const area = svg('path', { class: 'chart__area' });
  const line = svg('path', { class: 'chart__line' });
  const dot = svg('circle', { class: 'chart__dot', r: 5 });
  const gridLines = svg('g', { class: 'chart__grid' }, ...[40, 90, 140].map((y) => svg('line', { x1: 0, x2: W, y1: y, y2: y })));
  const defs = svg('defs', {}, svg('linearGradient', { id: 'dash-grad', x1: 0, x2: 0, y1: 0, y2: 1 },
    svg('stop', { offset: '0', 'stop-color': '#8b5cf6', 'stop-opacity': '.55' }),
    svg('stop', { offset: '1', 'stop-color': '#8b5cf6', 'stop-opacity': '0' })));
  const chart = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'chart', preserveAspectRatio: 'none', role: 'img', 'aria-label': L(T.dash.chart) }, defs, gridLines, area, line, dot);
  function drawChart() {
    const max = Math.max(...series) * 1.15;
    const pts = series.map((v, i) => [i * (W / (series.length - 1)), H - (v / max) * H]);
    const d = smoothPath(pts);
    line.setAttribute('d', d);
    area.setAttribute('d', d + ` L${W},${H} L0,${H} Z`);
    const last = pts[pts.length - 1];
    dot.setAttribute('cx', last[0] - 4); dot.setAttribute('cy', last[1]);
  }

  // Bars
  const days = L({ de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'], en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] });
  const bars = h('div', { class: 'bars' }, ...days.map((d) => h('div', { class: 'bars__col' }, h('span', { class: 'bars__bar' }), h('small', {}, d))));
  function drawBars() {
    [...bars.children].forEach((c) => c.firstChild.style.setProperty('--h', (35 + Math.random() * 60).toFixed(0) + '%'));
  }

  // Donut
  const names = L(T.dash.srcNames);
  const colors = ['#8b5cf6', '#22d3ee', '#f0abfc', '#64748b'];
  let shares = [42, 31, 18, 9];
  const ring = svg('g', { transform: 'rotate(-90 60 60)' });
  const donut = svg('svg', { viewBox: '0 0 120 120', class: 'donut', role: 'img', 'aria-label': L(T.dash.sources) },
    svg('circle', { cx: 60, cy: 60, r: 44, fill: 'none', stroke: 'rgba(255,255,255,.06)', 'stroke-width': 14 }), ring);
  const legend = h('ul', { class: 'legend' });
  function drawDonut() {
    ring.replaceChildren();
    legend.replaceChildren();
    const C = 2 * Math.PI * 44;
    let off = 0;
    shares.forEach((s, i) => {
      ring.append(svg('circle', { cx: 60, cy: 60, r: 44, fill: 'none', stroke: colors[i], 'stroke-width': 14, 'stroke-dasharray': `${(s / 100) * C - 2} ${C}`, 'stroke-dashoffset': -off }));
      off += (s / 100) * C;
      legend.append(h('li', {}, h('i', { class: 'c' + i }), names[i], h('b', {}, s + ' %')));
    });
  }

  // Orders
  const cities = ['Berlin', 'München', 'Hamburg', 'Köln', 'Leipzig', 'Wien', 'Zürich', 'Dresden'];
  const stat = L(T.dash.status);
  const table = h('ul', { class: 'orders' });
  let orderNo = 2381;
  function addOrder() {
    const row = h('li', { class: 'orders__row is-new' },
      h('span', {}, '#' + orderNo++),
      h('span', {}, cities[Math.floor(Math.random() * cities.length)]),
      h('span', {}, money(20 + Math.round(Math.random() * 280))),
      h('span', { class: 'pill pill--' + (orderNo % 3) }, stat[orderNo % 3]));
    table.prepend(row);
    while (table.children.length > 5) table.lastChild.remove();
    setTimeout(() => row.classList.remove('is-new'), 600);
  }
  for (let i = 0; i < 5; i++) addOrder();

  const box = h('div', { class: 'dash', 'data-reveal': '' },
    h('nav', { class: 'dash__side', 'aria-hidden': 'true' },
      h('b', {}, 'V'), ...['layers', 'marketing', 'it', 'ai', 'shield'].map((n, i) => h('span', { class: i === 1 ? 'on' : '' }, icon(n, 18)))),
    h('div', { class: 'dash__main' },
      h('div', { class: 'dash__top' },
        h('strong', {}, 'Overview'),
        h('span', { class: 'demo-badge demo-badge--sm' }, L(T.dash.data))),
      kpis,
      h('div', { class: 'dash__row' },
        h('div', { class: 'panel panel--wide' }, h('p', { class: 'panel__title' }, L(T.dash.chart)), chart),
        h('div', { class: 'panel' }, h('p', { class: 'panel__title' }, L(T.dash.sources)), h('div', { class: 'donut-wrap' }, donut, legend))),
      h('div', { class: 'dash__row' },
        h('div', { class: 'panel' }, h('p', { class: 'panel__title' }, L({ de: 'Bestellungen pro Tag', en: 'Orders per day', ru: 'Заказы по дням' })), bars),
        h('div', { class: 'panel panel--wide' }, h('p', { class: 'panel__title' }, L(T.dash.orders)), table))));

  drawChart(); drawBars(); drawDonut();
  countTo(kpiEls[0], state.revenue, { format: (v) => money(Math.round(v)) });
  countTo(kpiEls[1], state.orders);
  countTo(kpiEls[2], state.conv, { format: (v) => num(v, 1) + ' %' });
  countTo(kpiEls[3], state.live);

  ticker(box, () => {
    state.revenue += Math.round(20 + Math.random() * 140);
    state.orders += Math.random() < 0.6 ? 1 : 0;
    state.conv = Math.max(2.8, Math.min(4.2, state.conv + (Math.random() - 0.45) * 0.1));
    state.live = Math.max(80, Math.round(state.live + (Math.random() - 0.5) * 14));
    countTo(kpiEls[0], state.revenue, { format: (v) => money(Math.round(v)) });
    countTo(kpiEls[1], state.orders);
    countTo(kpiEls[2], state.conv, { format: (v) => num(v, 1) + ' %' });
    countTo(kpiEls[3], state.live);
    series = [...series.slice(1), series[series.length - 1] * (0.94 + Math.random() * 0.14)];
    drawChart();
    if (Math.random() < 0.5) addOrder();
    if (Math.random() < 0.3) drawBars();
    if (Math.random() < 0.25) {
      shares = shares.map((s) => Math.max(5, s + Math.round((Math.random() - 0.5) * 4)));
      const sum = shares.reduce((a, b) => a + b, 0);
      shares = shares.map((s) => Math.round((s / sum) * 100));
      drawDonut();
    }
  }, 2200);

  return section({ id: 'demo-dashboard', eyebrow: L(T.dash.eyebrow), title: L(T.dash.title), text: L(T.dash.text), badge: L(T.demo) }, box);
}

/* ---------------- 5. Support chat system ---------------- */

function supportSystem() {
  const chat = chatLog();
  const input = h('input', { type: 'text', class: 'chat__input', maxlength: '300', 'aria-label': L(T.chat.placeholder), placeholder: L(T.chat.placeholder), autocomplete: 'off' });
  const sendBtn = h('button', { type: 'submit', class: 'chat__send', 'aria-label': L(T.chat.send) }, icon('arrow', 18));
  const form = h('form', { class: 'chat__form' }, input, sendBtn);
  const quick = h('div', { class: 'chat__quick' });
  const ticketsEl = h('ul', { class: 'tickets' });
  const states = L(T.chat.states);
  let ticketNo = 581, busy = false, started = false;

  const seed = [
    { name: 'M. Weber', text: L({ de: 'Rechnung doppelt erhalten', en: 'Received invoice twice', ru: 'Счёт пришёл дважды' }), s: 1 },
    { name: 'J. Kaya', text: L({ de: 'Lieferadresse ändern', en: 'Change delivery address', ru: 'Изменить адрес доставки' }), s: 2 }
  ];
  function ticket(name, text, s = 0) {
    const pill = h('span', { class: 'pill pill--' + s }, states[s]);
    const li = h('li', { class: 'ticket is-new' },
      h('span', { class: 'ticket__avatar' }, name.slice(0, 1)),
      h('span', { class: 'ticket__body' }, h('b', {}, '#' + ticketNo++ + ' · ' + name), h('small', {}, text)),
      pill);
    ticketsEl.prepend(li);
    setTimeout(() => li.classList.remove('is-new'), 700);
    return { set(k) { pill.className = 'pill pill--' + k; pill.textContent = states[k]; } };
  }
  seed.forEach((t) => ticket(t.name, t.text, t.s));

  function intent(text) {
    const s = norm(text);
    if (/bestell|order|lieferung|paket|track|заказ|доставк|где/.test(s)) return 'order';
    if (/ruck|retour|return|umtausch|возврат|вернуть/.test(s)) return 'ret';
    if (/mensch|human|mitarbeiter|agent|person|человек|оператор|сотрудник/.test(s)) return 'human';
    return 'fallback';
  }

  async function handle(text) {
    if (busy || !text.trim()) return;
    busy = true;
    chat.user(text);
    const kind = intent(text);
    await chat.bot(L(T.chat.answers[kind]), { label: L(T.chat.bot) });
    if (kind === 'human' || kind === 'fallback') {
      const tk = ticket(L({ de: 'Sie', en: 'You', ru: 'Вы' }), text.slice(0, 48));
      await sleep(1200); tk.set(1);
      if (kind === 'human') await chat.bot(L(T.chat.answers.agentHi), { label: L(T.chat.agent), typing: 1100 });
      await sleep(1600); tk.set(2);
    }
    busy = false;
  }

  L(T.chat.quick).forEach((q) => {
    const b = h('button', { type: 'button', class: 'chip' }, q);
    b.addEventListener('click', () => handle(q));
    quick.append(b);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, 300);
    input.value = '';
    handle(v);
  });

  const statVals = ['< 1 min', '68 %', '24/7'];
  const box = h('div', { class: 'support', 'data-reveal': '' },
    h('div', { class: 'support__widget' },
      h('div', { class: 'chat__head' },
        h('span', { class: 'chat__avatar' }, icon('ai', 18)),
        h('span', {}, h('b', {}, L(T.chat.widget)), h('small', {}, h('i', { class: 'online' }), 'online'))),
      chat.el, quick, form,
      h('p', { class: 'chat__privacy' }, L(T.chat.note))),
    h('div', { class: 'support__inbox' },
      h('div', { class: 'chat__head' }, h('span', { class: 'chat__avatar chat__avatar--alt' }, icon('layers', 18)), h('b', {}, L(T.chat.inbox))),
      h('div', { class: 'support__stats' }, ...L(T.chat.stats).map((n, i) => h('div', {}, h('strong', {}, statVals[i]), h('small', {}, n)))),
      h('p', { class: 'panel__title' }, L(T.chat.tickets)),
      ticketsEl));

  onVisible(box, () => {
    if (started) return;
    started = true;
    chat.bot(L(T.chat.hello), { label: L(T.chat.bot) });
  });

  return section({ id: 'demo-support', eyebrow: L(T.chat.eyebrow), title: L(T.chat.title), text: L(T.chat.text), badge: L(T.demo) }, box);
}

export function mount(container) {
  container.replaceChildren(designCarousel(), appSection(), miniShop(), dashboard(), supportSystem());
}
