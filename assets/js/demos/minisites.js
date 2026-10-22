// Five small but working websites for the 3D carousel on the Development page.
// Each one scrolls inside its frame and reacts to clicks (cart, filters, booking …).
import { h, L, money } from './kit.js';

const P = 'assets/img/photos/';
const img = (f, cls = '') => h('img', { src: P + f, alt: '', class: cls, loading: 'lazy', decoding: 'async' });

function shell(s, ...body) {
  const count = h('b', { class: 'ms__count' }, '0');
  const toast = h('div', { class: 'ms__toast', role: 'status' });
  const scroll = h('div', { class: 'ms__scroll', tabindex: '0' }, ...body.map((b) => (typeof b === 'function' ? b({ count, toast }) : b)));
  const root = h('div', { class: 'ms ms--' + s.key },
    h('div', { class: 'ms__bar' }, h('i'), h('i'), h('i'), h('span', {}, s.url)),
    h('nav', { class: 'ms__nav' }, h('b', { class: 'ms__logo' }, s.name), h('span', { class: 'ms__links' }, ...L(s.links).map((l) => h('span', {}, l))), h('span', { class: 'ms__cart' }, s.cartIcon || '🛒', ' ', count)),
    scroll, toast);
  return root;
}
const say = (ctx, text) => { ctx.toast.textContent = text; ctx.toast.classList.remove('is-in'); void ctx.toast.offsetWidth; ctx.toast.classList.add('is-in'); };
const bump = (ctx, n = 1) => { ctx.count.textContent = String(Number(ctx.count.textContent) + n); ctx.count.classList.remove('is-bump'); void ctx.count.offsetWidth; ctx.count.classList.add('is-bump'); };
const hero = (file, kicker, title, cta) => h('header', { class: 'ms__hero' }, img(file), h('div', {}, h('small', {}, kicker), h('h4', {}, title), cta ? h('span', { class: 'ms__btn' }, cta) : null));
const foot = (txt) => h('footer', { class: 'ms__foot' }, txt);

const ADDED = { de: 'Zum Warenkorb hinzugefügt', en: 'Added to cart', ru: 'Добавлено в корзину' };

/* 1 · STRIDE – sneakers */
function stride() {
  const s = { key: 'stride', name: 'STRIDE', url: 'stride-store.de', links: { de: ['Herren', 'Damen', 'Sale'], en: ['Men', 'Women', 'Sale'], ru: ['Мужчинам', 'Женщинам', 'Sale'] } };
  const items = [['shoe-1.jpg', 'Cloud White', 129], ['shoe-2.jpg', 'Velocity Run', 149], ['shoe-3.jpg', 'Harbor Boot', 189], ['shoe-4.jpg', 'Prism Low', 119]];
  return shell(s,
    hero('shoe-hero.jpg', L({ de: 'Neu eingetroffen', en: 'Just landed', ru: 'Новинки' }), L({ de: 'Leicht. Schnell. Deins.', en: 'Light. Fast. Yours.', ru: 'Легко. Быстро. Твоё.' }), L({ de: 'Jetzt shoppen', en: 'Shop now', ru: 'Купить' })),
    h('h5', {}, L({ de: 'Bestseller', en: 'Bestsellers', ru: 'Хиты продаж' })),
    (ctx) => h('div', { class: 'ms__grid' }, ...items.map(([f, n, p]) => {
      let size = 42;
      const sizes = h('div', { class: 'ms__sizes' }, ...[40, 41, 42, 43, 44].map((z) => {
        const b = h('button', { type: 'button', 'aria-pressed': String(z === size) }, String(z));
        b.addEventListener('click', () => { size = z; [...sizes.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b))); });
        return b;
      }));
      const add = h('button', { type: 'button', class: 'ms__add' }, '+ ' + L({ de: 'Warenkorb', en: 'Cart', ru: 'Корзина' }));
      add.addEventListener('click', () => { bump(ctx); say(ctx, '✓ ' + n + ' · EU ' + size + ' – ' + L(ADDED)); });
      return h('div', { class: 'ms__card' }, img(f), h('b', {}, n), h('span', {}, money(p)), sizes, add);
    })),
    h('div', { class: 'ms__banner' }, L({ de: '🚚 Kostenloser Versand & 30 Tage Rückgabe', en: '🚚 Free shipping & 30-day returns', ru: '🚚 Бесплатная доставка и возврат 30 дней' })),
    foot('© STRIDE · Impressum · Datenschutz · AGB'));
}

/* 2 · MAISON IVRE – fashion */
function maison() {
  const s = { key: 'maison', name: 'MAISON IVRE', url: 'maison-ivre.com', cartIcon: '👜', links: { de: ['Neu', 'Kollektion', 'Lookbook'], en: ['New', 'Collection', 'Lookbook'], ru: ['Новое', 'Коллекция', 'Лукбук'] } };
  const items = [['fashion-1.jpg', 'Oversize Hoodie', 89, 'basics'], ['fashion-2.jpg', 'Bomber Jacket', 249, 'jackets'], ['fashion-3.jpg', 'Essential Tee', 39, 'basics'], ['fashion-4.jpg', 'Cable Knit', 119, 'knit']];
  const cats = [['all', { de: 'Alle', en: 'All', ru: 'Все' }], ['jackets', { de: 'Jacken', en: 'Jackets', ru: 'Куртки' }], ['knit', { de: 'Strick', en: 'Knit', ru: 'Трикотаж' }], ['basics', { de: 'Basics', en: 'Basics', ru: 'Базовое' }]];
  return shell(s,
    hero('fashion-hero.jpg', L({ de: 'Herbst / Winter 26', en: 'Autumn / Winter 26', ru: 'Осень / Зима 26' }), L({ de: 'Die neue Kollektion', en: 'The new collection', ru: 'Новая коллекция' }), L({ de: 'Entdecken', en: 'Discover', ru: 'Смотреть' })),
    (ctx) => {
      const grid = h('div', { class: 'ms__grid' });
      const draw = (c) => grid.replaceChildren(...items.filter((x) => c === 'all' || x[3] === c).map(([f, n, p]) => {
        const heart = h('button', { type: 'button', class: 'ms__heart', 'aria-pressed': 'false', 'aria-label': '♡' }, '♡');
        heart.addEventListener('click', () => { const on = heart.getAttribute('aria-pressed') !== 'true'; heart.setAttribute('aria-pressed', String(on)); heart.textContent = on ? '♥' : '♡'; });
        const add = h('button', { type: 'button', class: 'ms__add' }, L({ de: 'In die Tasche', en: 'Add to bag', ru: 'В корзину' }));
        add.addEventListener('click', () => { bump(ctx); say(ctx, '✓ ' + n + ' – ' + L(ADDED)); });
        return h('div', { class: 'ms__card' }, h('div', { class: 'ms__imgwrap' }, img(f), heart), h('b', {}, n), h('span', {}, money(p)), add);
      }));
      const tabs = h('div', { class: 'ms__tabs' }, ...cats.map(([k, l], i) => {
        const b = h('button', { type: 'button', 'aria-pressed': String(i === 0) }, L(l));
        b.addEventListener('click', () => { [...tabs.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b))); draw(k); });
        return b;
      }));
      draw('all');
      return h('div', {}, tabs, grid);
    },
    foot('© Maison Ivre · Impressum · Datenschutz'));
}

/* 3 · Trattoria Lumi – restaurant */
function trattoria() {
  const s = { key: 'lumi', name: 'Trattoria Lumi', url: 'trattoria-lumi.de', cartIcon: '🍽', links: { de: ['Karte', 'Über uns', 'Reservieren'], en: ['Menu', 'About', 'Book'], ru: ['Меню', 'О нас', 'Бронь'] } };
  const menu = { pasta: [['food-pasta.jpg', 'Penne all’arrabbiata', 14.5], ['food-hero.jpg', 'Branzino al limone', 24]], pizza: [['food-pizza.jpg', 'Pizza Diavola', 15.9]], dolci: [['food-dessert.jpg', 'Panna cotta ai lamponi', 8.5]] };
  return shell(s,
    hero('food-hero.jpg', 'Hamburg · Ottensen', L({ de: 'Echte italienische Küche', en: 'Real Italian cooking', ru: 'Настоящая итальянская кухня' }), null),
    (ctx) => {
      const list = h('div', { class: 'ms__menu' });
      const draw = (k) => list.replaceChildren(...menu[k].map(([f, n, p]) => h('div', { class: 'ms__dish' }, img(f), h('b', {}, n), h('span', {}, money(p)))));
      const tabs = h('div', { class: 'ms__tabs' }, ...Object.keys(menu).map((k, i) => {
        const b = h('button', { type: 'button', 'aria-pressed': String(i === 0) }, k[0].toUpperCase() + k.slice(1));
        b.addEventListener('click', () => { [...tabs.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b))); draw(k); });
        return b;
      }));
      draw('pasta');
      let guests = 2, time = '19:30';
      const g = h('b', {}, '2');
      const minus = h('button', { type: 'button', 'aria-label': '−' }, '−'), plus = h('button', { type: 'button', 'aria-label': '+' }, '+');
      minus.addEventListener('click', () => { guests = Math.max(1, guests - 1); g.textContent = String(guests); });
      plus.addEventListener('click', () => { guests = Math.min(12, guests + 1); g.textContent = String(guests); });
      const times = h('div', { class: 'ms__pills' }, ...['18:00', '18:30', '19:00', '19:30', '20:00', '21:00'].map((x) => {
        const b = h('button', { type: 'button', 'aria-pressed': String(x === time) }, x);
        b.addEventListener('click', () => { time = x; [...times.children].forEach((y) => y.setAttribute('aria-pressed', String(y === b))); });
        return b;
      }));
      const book = h('button', { type: 'button', class: 'ms__btn ms__btn--full' }, L({ de: 'Tisch reservieren', en: 'Book table', ru: 'Забронировать' }));
      book.addEventListener('click', () => { bump(ctx); say(ctx, '✓ ' + L({ de: 'Tisch für ', en: 'Table for ', ru: 'Стол на ' }) + guests + ' · ' + time + L({ de: ' reserviert', en: ' booked', ru: ' забронирован' })); });
      return h('div', {}, h('h5', {}, L({ de: 'Speisekarte', en: 'Menu', ru: 'Меню' })), tabs, list,
        h('div', { class: 'ms__book' }, h('h5', {}, L({ de: 'Reservieren', en: 'Book a table', ru: 'Бронь' })),
          h('div', { class: 'ms__guests' }, L({ de: 'Gäste', en: 'Guests', ru: 'Гостей' }), minus, g, plus), times, book));
    },
    foot('© Trattoria Lumi · Impressum · Datenschutz'));
}

/* 4 · Glow & Co. – skincare */
function glow() {
  const s = { key: 'glow', name: 'glow & co.', url: 'glowandco.de', links: { de: ['Pflege', 'Quiz', 'Über uns'], en: ['Care', 'Quiz', 'About'], ru: ['Уход', 'Тест', 'О нас'] } };
  const items = { serum: ['skin-serum.jpg', 'Hyaluron Serum', 34], cream: ['skin-cream.jpg', 'Barrier Cream', 29], oil: ['skin-oil.jpg', 'Glow Face Oil', 38] };
  const types = [['dry', { de: 'Trocken', en: 'Dry', ru: 'Сухая' }, 'cream'], ['oily', { de: 'Ölig', en: 'Oily', ru: 'Жирная' }, 'serum'], ['dull', { de: 'Fahl', en: 'Dull', ru: 'Тусклая' }, 'oil']];
  const card = (ctx, k) => {
    const [f, n, p] = items[k];
    const add = h('button', { type: 'button', class: 'ms__add' }, '+');
    add.addEventListener('click', () => { bump(ctx); say(ctx, '✓ ' + n + ' – ' + L(ADDED)); });
    return h('div', { class: 'ms__card ms__card--row' }, img(f), h('div', {}, h('b', {}, n), h('span', {}, money(p))), add);
  };
  return shell(s,
    hero('skin-hero.jpg', L({ de: 'Clean Beauty', en: 'Clean beauty', ru: 'Чистая косметика' }), L({ de: 'Klare Haut. Klare Inhaltsstoffe.', en: 'Clear skin. Clear ingredients.', ru: 'Чистая кожа. Честный состав.' }), null),
    (ctx) => {
      const out = h('div', { class: 'ms__quizout' }, card(ctx, 'serum'));
      const chips = h('div', { class: 'ms__pills' }, ...types.map(([, l, k], i) => {
        const b = h('button', { type: 'button', 'aria-pressed': String(i === 1) }, L(l));
        b.addEventListener('click', () => { [...chips.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b))); out.replaceChildren(card(ctx, k)); out.classList.remove('is-in'); void out.offsetWidth; out.classList.add('is-in'); });
        return b;
      }));
      return h('div', { class: 'ms__quiz' }, h('h5', {}, L({ de: 'Hauttyp-Quiz: Was passt zu dir?', en: 'Skin quiz: what suits you?', ru: 'Тест: что подходит вам?' })), chips, out,
        h('h5', {}, L({ de: 'Alle Produkte', en: 'All products', ru: 'Все продукты' })), ...Object.keys(items).map((k) => card(ctx, k)));
    },
    foot('© glow & co. · Impressum · Datenschutz'));
}

/* 5 · NORDHAUS – interior */
function nordhaus() {
  const s = { key: 'nord', name: 'NORDHAUS', url: 'nordhaus-living.de', links: { de: ['Wohnen', 'Licht', 'Deko'], en: ['Living', 'Lighting', 'Decor'], ru: ['Гостиная', 'Свет', 'Декор'] } };
  const spots = [['home-blanket.jpg', 'Sessel „Oslo“', 249, 14, 62], ['home-lamp.jpg', 'Lampe „Fjord“', 149, 72, 30], ['home-plant.jpg', 'Topf „Terra“', 49, 90, 56], ['home-vase.jpg', 'Vase „Sand“', 39, 50, 66]];
  return shell(s,
    (ctx) => {
      const pop = h('div', { class: 'ms__pop' });
      const dots = spots.map(([f, n, p, x, y]) => {
        const d = h('button', { type: 'button', class: 'ms__spot', 'aria-label': n });
        d.style.setProperty('left', x + '%'); d.style.setProperty('top', y + '%');
        d.addEventListener('click', () => {
          const add = h('button', { type: 'button', class: 'ms__add' }, '+ ' + L({ de: 'Warenkorb', en: 'Cart', ru: 'Корзина' }));
          add.addEventListener('click', () => { bump(ctx); say(ctx, '✓ ' + n + ' – ' + L(ADDED)); });
          pop.replaceChildren(img(f), h('div', {}, h('b', {}, n), h('span', {}, money(p)), add));
          pop.style.setProperty('left', Math.min(x, 55) + '%'); pop.style.setProperty('top', Math.max(4, y - 44) + '%');
          pop.classList.add('is-in');
        });
        return d;
      });
      return h('div', { class: 'ms__room' }, img('home-hero.jpg'), ...dots, pop, h('small', { class: 'ms__roomhint' }, L({ de: '● Punkte anklicken – Shop the look', en: '● Tap the dots – shop the look', ru: '● Нажмите на точки – shop the look' })));
    },
    h('h5', {}, L({ de: 'Neu im Sortiment', en: 'New in', ru: 'Новинки' })),
    (ctx) => h('div', { class: 'ms__grid ms__grid--3' }, ...[['home-mug.jpg', 'Becher „Clay“', 19], ['home-pillow.jpg', 'Kissen „Moos“', 29], ['home-vase.jpg', 'Vase „Sand“', 39]].map(([f, n, p]) => {
      const add = h('button', { type: 'button', class: 'ms__add' }, '+');
      add.addEventListener('click', () => { bump(ctx); say(ctx, '✓ ' + n + ' – ' + L(ADDED)); });
      return h('div', { class: 'ms__card' }, img(f), h('b', {}, n), h('span', {}, money(p)), add);
    })),
    foot('© Nordhaus Living · Impressum · Datenschutz'));
}

export const MINI_SITES = [
  { name: 'STRIDE', tag: { de: 'Sneaker-Shop', en: 'Sneaker shop', ru: 'Магазин кроссовок' }, build: stride },
  { name: 'Maison Ivre', tag: { de: 'Fashion-Store', en: 'Fashion store', ru: 'Магазин одежды' }, build: maison },
  { name: 'Trattoria Lumi', tag: { de: 'Restaurant mit Reservierung', en: 'Restaurant with booking', ru: 'Ресторан с бронированием' }, build: trattoria },
  { name: 'glow & co.', tag: { de: 'Skincare-Shop mit Quiz', en: 'Skincare shop with quiz', ru: 'Косметика с тестом' }, build: glow },
  { name: 'Nordhaus', tag: { de: 'Interior – Shop the look', en: 'Interior – shop the look', ru: 'Интерьер – shop the look' }, build: nordhaus }
];
