// Marketing page: comment-to-DM automation, campaign analytics with AI insights,
// a filterable report (BI style), media-buying platforms with an ad preview
// studio and a budget planner. All numbers are clearly marked demo data.
import { h, icon, L, section, phone, onVisible, ticker, money, num, countTo, svg, smoothPath, sleep, typeInto, reduced } from './kit.js';

const T = {
  demo: { de: 'Live-Demo · Beispieldaten', en: 'Live demo · sample data', ru: 'Живое демо · пример данных' },
  auto: {
    eyebrow: { de: 'Prozess-Automatisierung', en: 'Process automation', ru: 'Автоматизация процессов' },
    title: { de: '„Was kostet das?“ – beantwortet in Sekunden.', en: '“How much?” – answered in seconds.', ru: '«Сколько стоит?» – ответ за секунды.' },
    text: { de: 'Ein Kunde kommentiert. Die Automatisierung erkennt die Preisanfrage, schickt eine persönliche Nachricht mit Link, legt den Lead im CRM an und erinnert nach 24 h.', en: 'A customer comments. The automation detects the price request, sends a personal message with a link, creates the lead in your CRM and follows up after 24 h.', ru: 'Клиент пишет комментарий. Автоматизация распознаёт запрос цены, отправляет личное сообщение со ссылкой, создаёт лид в CRM и напоминает через 24 ч.' },
    comment: { de: 'Wie viel kostet das? 😍', en: 'How much is this? 😍', ru: 'Сколько стоит? 😍' },
    caption: { de: 'Neu: Das Duftkerzen-Set „Ember“ 🕯️', en: 'New: the “Ember” scented candle set 🕯️', ru: 'Новинка: набор свечей «Ember» 🕯️' },
    reply: { de: 'Hey Sarah! 😊 Das Set kostet 49 € (inkl. MwSt.) – hier direkt bestellen: luma-home.de/ember. Ab 50 € ist der Versand gratis!', en: 'Hey Sarah! 😊 The set is €49 (incl. VAT) – order here: luma-home.de/ember. Free shipping from €50!', ru: 'Привет, Сара! 😊 Набор стоит 49 € (вкл. НДС) – заказ здесь: luma-home.de/ember. Доставка бесплатна от 50 €!' },
    replied: { de: 'Wir haben dir eine Nachricht geschickt 💌', en: 'We sent you a message 💌', ru: 'Мы отправили вам сообщение 💌' },
    steps: {
      de: [['Trigger', 'Neuer Kommentar auf Instagram'], ['KI-Erkennung', 'Absicht: Preisanfrage · 98 %'], ['Auto-Antwort', 'Kommentar + persönliche DM mit Link'], ['CRM', 'Lead „Sarah K.“ angelegt'], ['Follow-up', 'Erinnerung nach 24 h, falls kein Kauf']],
      en: [['Trigger', 'New comment on Instagram'], ['AI detection', 'Intent: price request · 98%'], ['Auto-reply', 'Comment + personal DM with link'], ['CRM', 'Lead “Sarah K.” created'], ['Follow-up', 'Reminder after 24 h if no purchase']],
      ru: [['Триггер', 'Новый комментарий в Instagram'], ['ИИ-анализ', 'Намерение: запрос цены · 98 %'], ['Автоответ', 'Комментарий + личное сообщение'], ['CRM', 'Лид «Sarah K.» создан'], ['Напоминание', 'Через 24 ч, если нет покупки']]
    },
    replay: { de: 'Erneut abspielen', en: 'Replay', ru: 'Повторить' },
    time: { de: 'Antwortzeit', en: 'Response time', ru: 'Время ответа' }
  },
  analysis: {
    eyebrow: { de: 'Datenanalyse & Auswertung', en: 'Data analysis & evaluation', ru: 'Анализ и оценка данных' },
    title: { de: 'Zahlen, die eine Geschichte erzählen.', en: 'Numbers that tell a story.', ru: 'Цифры, которые рассказывают историю.' },
    text: { de: 'Wir verbinden alle Kanäle, werten sie aus und die KI sagt Ihnen, wo sich das nächste Budget am meisten lohnt.', en: 'We connect all channels, evaluate them and the AI tells you where the next budget pays off most.', ru: 'Мы объединяем все каналы, анализируем их, а ИИ подсказывает, куда выгоднее вложить бюджет.' },
    metrics: { de: ['Umsatz vs. Ausgaben', 'ROAS', 'Kosten pro Klick'], en: ['Revenue vs. spend', 'ROAS', 'Cost per click'], ru: ['Выручка и расходы', 'ROAS', 'Цена клика'] },
    spend: { de: 'Ausgaben', en: 'Spend', ru: 'Расходы' },
    revenue: { de: 'Umsatz', en: 'Revenue', ru: 'Выручка' },
    insight: { de: 'KI-Insight', en: 'AI insight', ru: 'ИИ-инсайт' },
    insights: {
      de: ['TikTok liefert 23 % günstigere Klicks als Meta – Budget um 15 % verschieben.', 'Donnerstag 19–21 Uhr bringt die höchste Conversion-Rate. Anzeigen dort bündeln.', 'Video-Anzeigen unter 15 Sekunden erzielen 1,8× mehr Klicks als lange Clips.'],
      en: ['TikTok delivers 23% cheaper clicks than Meta – shift 15% of budget.', 'Thursday 7–9 pm brings the highest conversion rate. Concentrate ads there.', 'Video ads under 15 seconds get 1.8× more clicks than long clips.'],
      ru: ['TikTok даёт клики на 23 % дешевле Meta – перенесите 15 % бюджета.', 'Четверг 19–21 ч – самая высокая конверсия. Сосредоточьте показы там.', 'Видео короче 15 секунд получают в 1,8 раза больше кликов.']
    }
  },
  report: {
    eyebrow: { de: 'Reporting & BI-Dashboards', en: 'Reporting & BI dashboards', ru: 'Отчёты и BI-дашборды' },
    title: { de: 'Alle Daten. Ein Bericht. Automatisch.', en: 'All data. One report. Automatically.', ru: 'Все данные. Один отчёт. Автоматически.' },
    text: { de: 'Wie in Power BI: Datenquellen verbinden, filtern, verstehen. Probieren Sie die Filter – der Bericht rechnet live.', en: 'Like Power BI: connect data sources, filter, understand. Try the filters – the report recalculates live.', ru: 'Как в Power BI: подключите источники, фильтруйте, анализируйте. Попробуйте фильтры – отчёт пересчитывается.' },
    sources: { de: 'Datenquellen', en: 'Data sources', ru: 'Источники данных' },
    period: { de: 'Zeitraum', en: 'Period', ru: 'Период' },
    days: { de: ['7 Tage', '30 Tage', '90 Tage'], en: ['7 days', '30 days', '90 days'], ru: ['7 дней', '30 дней', '90 дней'] },
    channels: { de: 'Kanäle', en: 'Channels', ru: 'Каналы' },
    kpis: { de: ['Reichweite', 'Klicks', 'Conversions', 'ROAS'], en: ['Reach', 'Clicks', 'Conversions', 'ROAS'], ru: ['Охват', 'Клики', 'Конверсии', 'ROAS'] },
    byChannel: { de: 'Conversions nach Kanal', en: 'Conversions by channel', ru: 'Конверсии по каналам' },
    auto: { de: 'Jeden Montag automatisch per E-Mail', en: 'Automatically by e-mail every Monday', ru: 'Автоматически по понедельникам на e-mail' }
  },
  media: {
    eyebrow: { de: 'Media Buying', en: 'Media buying', ru: 'Закупка медиа' },
    title: { de: 'Die richtige Plattform. Das richtige Format.', en: 'The right platform. The right format.', ru: 'Правильная платформа. Правильный формат.' },
    text: { de: 'Wir planen, kaufen und optimieren Werbung dort, wo Ihre Kunden sind. Wechseln Sie Plattform und Format in der Vorschau.', en: 'We plan, buy and optimise advertising where your customers are. Switch platform and format in the preview.', ru: 'Мы планируем, закупаем и оптимизируем рекламу там, где ваши клиенты. Переключайте платформу и формат.' },
    formats: { de: ['Feed', 'Story', 'Reel'], en: ['Feed', 'Story', 'Reel'], ru: ['Лента', 'Сторис', 'Reels'] },
    sponsored: { de: 'Gesponsert', en: 'Sponsored', ru: 'Реклама' },
    adText: { de: 'Gemütliche Abende beginnen hier. Jetzt 20 % auf die Herbst-Kollektion.', en: 'Cosy evenings start here. 20% off the autumn collection now.', ru: 'Уютные вечера начинаются здесь. Скидка 20 % на осеннюю коллекцию.' },
    cta: { de: 'Jetzt shoppen', en: 'Shop now', ru: 'Купить' },
    budget: { de: 'Budget-Planer', en: 'Budget planner', ru: 'Планировщик бюджета' },
    monthly: { de: 'Monatsbudget', en: 'Monthly budget', ru: 'Бюджет в месяц' },
    goal: { de: 'Ziel', en: 'Goal', ru: 'Цель' },
    goals: { de: ['Verkäufe', 'Bekanntheit', 'Leads'], en: ['Sales', 'Awareness', 'Leads'], ru: ['Продажи', 'Узнаваемость', 'Лиды'] },
    reach: { de: 'Geschätzte Reichweite', en: 'Estimated reach', ru: 'Оценка охвата' },
    disclaimer: { de: 'Beispielrechnung auf Basis typischer Marktwerte – keine Garantie.', en: 'Sample calculation based on typical market values – no guarantee.', ru: 'Пример расчёта на основе типичных рыночных значений – без гарантий.' }
  }
};

/* ---------------- 1. Comment → DM automation ---------------- */
function automation() {
  const steps = L(T.auto.steps);
  const nodes = steps.map(([a, b], i) => h('li', { class: 'flow__node' },
    h('span', { class: 'flow__icon' }, icon(['spark', 'ai', 'mail', 'layers', 'arrow'][i], 18)),
    h('span', { class: 'flow__text' }, h('b', {}, a), h('small', {}, b)),
    h('span', { class: 'flow__check', 'aria-hidden': 'true' }, icon('check', 14))));
  const flow = h('ol', { class: 'flow' }, ...nodes);
  const timer = h('strong', {}, '0,0 s');

  const comments = h('div', { class: 'ig__comments' });
  const feed = h('div', { class: 'ig__view' },
    h('div', { class: 'ig__top' }, h('img', { class: 'post__avatar', src: 'assets/img/photos/candle-2.jpg', alt: '' }), h('b', {}, 'luma.home')),
    h('div', { class: 'ig__img' }, h('img', { src: 'assets/img/photos/candle.jpg', alt: '' })),
    h('div', { class: 'ig__actions', 'aria-hidden': 'true' }, '♡  💬  ↗'),
    h('p', { class: 'ig__caption' }, h('b', {}, 'luma.home '), L(T.auto.caption)),
    comments);
  const dmLog = h('div', { class: 'ig__dmlog' });
  const dm = h('div', { class: 'ig__view ig__dm' },
    h('div', { class: 'ig__top' }, h('span', {}, '‹'), h('img', { class: 'post__avatar', src: 'assets/img/photos/candle-2.jpg', alt: '' }), h('b', {}, 'luma.home')),
    dmLog);
  const screen = h('div', { class: 'ig' }, feed, dm);
  const replay = h('button', { type: 'button', class: 'btn btn--ghost btn--sm' }, L(T.auto.replay));
  let playing = false;

  async function play() {
    if (playing) return;
    playing = true; replay.disabled = true;
    nodes.forEach((n) => n.classList.remove('on', 'done'));
    comments.replaceChildren(); dmLog.replaceChildren(); screen.classList.remove('show-dm');
    timer.textContent = '0,0 s';
    await sleep(500);
    comments.append(h('p', { class: 'ig__comment' }, h('b', {}, 'sarah.k '), L(T.auto.comment)));
    const t0 = performance.now();
    const tick = setInterval(() => { timer.textContent = num((performance.now() - t0) / 1000, 1) + ' s'; }, 100);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.add('on');
      await sleep(reduced ? 50 : 520);
      nodes[i].classList.add('done');
      if (i === 2) {
        clearInterval(tick);
        comments.append(h('p', { class: 'ig__comment ig__comment--brand' }, h('b', {}, 'luma.home '), L(T.auto.replied)));
        await sleep(500);
        screen.classList.add('show-dm');
        const b = h('p', { class: 'ig__msg' });
        dmLog.append(h('p', { class: 'ig__msg ig__msg--me' }, L(T.auto.comment)), b);
        await typeInto(b, L(T.auto.reply), 10);
      }
    }
    playing = false; replay.disabled = false;
  }
  replay.addEventListener('click', play);
  const box = h('div', { class: 'auto', 'data-reveal': '' },
    h('div', { class: 'auto__phone' }, phone(screen)),
    h('div', { class: 'auto__flow' },
      flow,
      h('div', { class: 'auto__foot' }, h('span', { class: 'auto__time' }, h('small', {}, L(T.auto.time)), timer), replay)));
  let done = false;
  onVisible(box, () => { if (!done) { done = true; play(); } });
  return section({ id: 'demo-automation', eyebrow: L(T.auto.eyebrow), title: L(T.auto.title), text: L(T.auto.text), badge: L(T.demo) }, box);
}

/* ---------------- 2. Analytics + AI insights ---------------- */
function analytics() {
  const W = 640, H = 240, weeks = 12;
  const spend = Array.from({ length: weeks }, (_, i) => 900 + i * 40 + Math.sin(i) * 120);
  const revenue = spend.map((s, i) => s * (2.6 + i * 0.12 + Math.cos(i * 1.3) * 0.3));
  const cpc = spend.map((_, i) => 0.92 - i * 0.025 + Math.sin(i * 1.7) * 0.05);
  const names = L(T.analysis.metrics);
  let metric = 0;
  const g = svg('g');
  const chart = svg('svg', { viewBox: `0 0 ${W} ${H + 24}`, class: 'chart chart--tall', role: 'img', 'aria-label': names[0] },
    svg('defs', {}, svg('linearGradient', { id: 'an-grad', x1: 0, x2: 0, y1: 0, y2: 1 },
      svg('stop', { offset: '0', 'stop-color': '#22d3ee', 'stop-opacity': '.45' }), svg('stop', { offset: '1', 'stop-color': '#22d3ee', 'stop-opacity': '0' }))),
    svg('g', { class: 'chart__grid' }, ...[60, 120, 180].map((y) => svg('line', { x1: 0, x2: W, y1: y, y2: y }))), g);
  const legend = h('div', { class: 'an__legend' });

  function draw() {
    g.replaceChildren(); legend.replaceChildren();
    const x = (i) => 20 + i * ((W - 40) / (weeks - 1));
    if (metric === 0) {
      const max = Math.max(...revenue) * 1.1;
      spend.forEach((v, i) => {
        const bh = (v / max) * H;
        const r = svg('rect', { x: x(i) - 12, y: H - bh, width: 24, height: bh, rx: 5, class: 'an__bar' });
        r.style.setProperty('--d', i * 40 + 'ms');
        g.append(r);
      });
      const pts = revenue.map((v, i) => [x(i), H - (v / max) * H]);
      g.append(svg('path', { d: smoothPath(pts) + ` L${x(weeks - 1)},${H} L${x(0)},${H} Z`, fill: 'url(#an-grad)' }));
      g.append(svg('path', { d: smoothPath(pts), class: 'an__line', pathLength: 1 }));
      legend.append(h('span', {}, h('i', { class: 'lg-bar' }), L(T.analysis.spend)), h('span', {}, h('i', { class: 'lg-line' }), L(T.analysis.revenue)));
    } else {
      const data = metric === 1 ? revenue.map((r, i) => r / spend[i]) : cpc;
      const max = Math.max(...data) * 1.2;
      const pts = data.map((v, i) => [x(i), H - (v / max) * H]);
      g.append(svg('path', { d: smoothPath(pts) + ` L${x(weeks - 1)},${H} L${x(0)},${H} Z`, fill: 'url(#an-grad)' }));
      g.append(svg('path', { d: smoothPath(pts), class: 'an__line', pathLength: 1 }));
      pts.forEach(([px, py], i) => {
        const c = svg('circle', { cx: px, cy: py, r: 4, class: 'an__pt' });
        if (i === pts.length - 1) {
          g.append(svg('text', { x: px - 6, y: py - 12, class: 'an__val', 'text-anchor': 'end' }, document.createTextNode(metric === 1 ? num(data[i], 1) + '×' : money(data[i]))));
        }
        g.append(c);
      });
      legend.append(h('span', {}, h('i', { class: 'lg-line' }), names[metric]));
    }
    g.append(...Array.from({ length: weeks }, (_, i) => i % 2 ? null : svg('text', { x: x(i), y: H + 18, class: 'an__axis', 'text-anchor': 'middle' }, document.createTextNode('KW ' + (30 + i)))).filter(Boolean));
  }
  const seg = h('div', { class: 'seg seg--3', role: 'group' }, ...names.map((n, i) => {
    const b = h('button', { type: 'button', class: 'seg__btn', 'aria-pressed': String(i === 0) }, n);
    b.addEventListener('click', () => { metric = i; [...seg.children].forEach((x, k) => x.setAttribute('aria-pressed', String(k === i))); chart.setAttribute('aria-label', n); draw(); });
    return b;
  }));
  draw();

  const insights = h('ul', { class: 'insights' }, ...L(T.analysis.insights).map((t, i) => h('li', { class: 'insight' },
    h('span', { class: 'ai-tag' }, L(T.analysis.insight)), h('p', {}, t),
    h('span', { class: 'insight__bar', 'aria-hidden': 'true' }, h('i')))));
  const box = h('div', { class: 'analytics', 'data-reveal': '' },
    h('div', { class: 'panel analytics__chart' }, h('div', { class: 'analytics__top' }, seg, legend), chart),
    insights);
  onVisible(box, () => box.classList.add('is-live'));
  return section({ id: 'demo-analytics', eyebrow: L(T.analysis.eyebrow), title: L(T.analysis.title), text: L(T.analysis.text), badge: L(T.demo) }, box);
}

/* ---------------- 3. BI report ---------------- */
function report() {
  const CH = [
    { k: 'meta', n: 'Meta', c: '#8b5cf6', base: [42000, 1900, 128, 4.1] },
    { k: 'google', n: 'Google Ads', c: '#22d3ee', base: [31000, 2300, 156, 4.8] },
    { k: 'tiktok', n: 'TikTok', c: '#f0abfc', base: [56000, 1500, 74, 3.2] },
    { k: 'linkedin', n: 'LinkedIn', c: '#60a5fa', base: [9000, 420, 31, 2.6] }
  ];
  const sources = ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Shopify', 'CRM', 'Excel'];
  const on = new Set(CH.map((c) => c.k));
  let period = 1;
  const factor = [0.25, 1, 2.9];
  const kpiNames = L(T.report.kpis);
  const kpiEls = kpiNames.map(() => h('strong', {}, '0'));
  const barsEl = h('div', { class: 'rep__bars' });
  const rows = h('tbody');

  const chips = h('div', { class: 'rep__chips', role: 'group', 'aria-label': L(T.report.channels) }, ...CH.map((c) => {
    const b = h('button', { type: 'button', class: 'rep__chip', 'aria-pressed': 'true' }, h('i'), c.n);
    b.querySelector('i').style.setProperty('--c', c.c);
    b.addEventListener('click', () => {
      if (on.has(c.k) && on.size > 1) on.delete(c.k); else on.add(c.k);
      b.setAttribute('aria-pressed', String(on.has(c.k)));
      calc();
    });
    return b;
  }));
  const periodSel = h('div', { class: 'seg seg--3', role: 'group', 'aria-label': L(T.report.period) }, ...L(T.report.days).map((d, i) => {
    const b = h('button', { type: 'button', class: 'seg__btn', 'aria-pressed': String(i === 1) }, d);
    b.addEventListener('click', () => { period = i; [...periodSel.children].forEach((x, k) => x.setAttribute('aria-pressed', String(k === i))); calc(); });
    return b;
  }));

  function calc() {
    const act = CH.filter((c) => on.has(c.k));
    const f = factor[period];
    const sum = (idx) => act.reduce((a, c) => a + c.base[idx] * f, 0);
    const roas = act.reduce((a, c) => a + c.base[3] * c.base[2], 0) / act.reduce((a, c) => a + c.base[2], 0);
    countTo(kpiEls[0], sum(0));
    countTo(kpiEls[1], sum(1));
    countTo(kpiEls[2], sum(2));
    countTo(kpiEls[3], roas, { format: (v) => num(v, 1) + '×' });
    const max = Math.max(...CH.map((c) => c.base[2] * f));
    barsEl.replaceChildren(...CH.map((c) => {
      const val = on.has(c.k) ? c.base[2] * f : 0;
      const bar = h('span', { class: 'rep__bar' }, h('i'));
      bar.firstChild.style.setProperty('--w', (val / max * 100).toFixed(1) + '%');
      bar.firstChild.style.setProperty('--c', c.c);
      return h('div', { class: 'rep__row' + (on.has(c.k) ? '' : ' is-off') }, h('span', {}, c.n), bar, h('b', {}, num(Math.round(val))));
    }));
    rows.replaceChildren(...act.map((c) => h('tr', {},
      h('td', {}, c.n), h('td', {}, num(Math.round(c.base[0] * f))), h('td', {}, num(Math.round(c.base[1] * f))),
      h('td', {}, num(c.base[1] / c.base[0] * 100, 2) + ' %'), h('td', {}, num(c.base[3], 1) + '×'))));
  }

  const conn = h('div', { class: 'rep__sources' },
    h('p', { class: 'panel__title' }, L(T.report.sources)),
    h('ul', {}, ...sources.map((s) => h('li', {}, h('i', { class: 'online' }), s))),
    h('div', { class: 'rep__pipe', 'aria-hidden': 'true' }, h('span'), h('span'), h('span')));
  const box = h('div', { class: 'report', 'data-reveal': '' },
    conn,
    h('div', { class: 'report__canvas' },
      h('div', { class: 'report__filters' }, h('div', {}, h('p', { class: 'panel__title' }, L(T.report.channels)), chips), h('div', {}, h('p', { class: 'panel__title' }, L(T.report.period)), periodSel)),
      h('div', { class: 'report__kpis' }, ...kpiNames.map((n, i) => h('div', { class: 'kpi' }, h('span', { class: 'kpi__label' }, n), kpiEls[i]))),
      h('div', { class: 'report__grid' },
        h('div', { class: 'panel' }, h('p', { class: 'panel__title' }, L(T.report.byChannel)), barsEl),
        h('div', { class: 'panel rep__table-wrap' }, h('table', { class: 'rep__table' },
          h('thead', {}, h('tr', {}, ...['', kpiNames[0], kpiNames[1], 'CTR', 'ROAS'].map((x) => h('th', { scope: 'col' }, x)))), rows))),
      h('p', { class: 'report__auto' }, icon('mail', 16), L(T.report.auto))));
  calc();
  return section({ id: 'demo-report', eyebrow: L(T.report.eyebrow), title: L(T.report.title), text: L(T.report.text), badge: L(T.demo) }, box);
}

/* ---------------- 4. Media buying ---------------- */
const PLATFORMS = [
  { k: 'meta', n: 'Meta', sub: 'Facebook · Instagram', c: '#8b5cf6', share: [0.4, 0.35, 0.35], cpm: 7 },
  { k: 'tiktok', n: 'TikTok', sub: 'In-Feed · Spark Ads', c: '#f0abfc', share: [0.2, 0.35, 0.15], cpm: 5 },
  { k: 'google', n: 'Google', sub: 'Search · YouTube', c: '#22d3ee', share: [0.3, 0.15, 0.3], cpm: 9 },
  { k: 'linkedin', n: 'LinkedIn', sub: 'B2B · Lead Gen', c: '#60a5fa', share: [0.05, 0.05, 0.15], cpm: 28 },
  { k: 'snap', n: 'Snapchat · Pinterest', sub: 'Story · Pins', c: '#facc15', share: [0.05, 0.1, 0.05], cpm: 4 }
];

function media() {
  let plat = 0, fmt = 0;
  const formats = L(T.media.formats);
  const ad = h('div', { class: 'ad' });
  function drawAd() {
    const p = PLATFORMS[plat];
    ad.className = 'ad ad--' + ['feed', 'story', 'reel'][fmt] + ' ad--' + p.k;
    ad.replaceChildren(
      h('div', { class: 'ad__top' }, h('img', { class: 'post__avatar', src: 'assets/img/photos/candle-2.jpg', alt: '' }), h('span', {}, h('b', {}, 'luma.home'), h('small', {}, L(T.media.sponsored) + ' · ' + p.n))),
      h('div', { class: 'ad__media' }, h('img', { src: fmt ? 'assets/img/photos/candle-story.jpg' : 'assets/img/photos/candle-3.jpg', alt: '' }), fmt ? h('i', { class: 'ad__play' }, '▶') : null),
      h('p', { class: 'ad__text' }, L(T.media.adText)),
      h('span', { class: 'ad__cta' }, L(T.media.cta), icon('arrow', 14)));
  }
  const platTabs = h('div', { class: 'media__plats', role: 'group' }, ...PLATFORMS.slice(0, 4).map((p, i) => {
    const b = h('button', { type: 'button', class: 'rep__chip', 'aria-pressed': String(i === 0) }, h('i'), p.n);
    b.querySelector('i').style.setProperty('--c', p.c);
    b.addEventListener('click', () => { plat = i; [...platTabs.children].forEach((x, k) => x.setAttribute('aria-pressed', String(k === i))); drawAd(); });
    return b;
  }));
  const fmtTabs = h('div', { class: 'seg seg--3', role: 'group' }, ...formats.map((f, i) => {
    const b = h('button', { type: 'button', class: 'seg__btn', 'aria-pressed': String(i === 0) }, f);
    b.addEventListener('click', () => { fmt = i; [...fmtTabs.children].forEach((x, k) => x.setAttribute('aria-pressed', String(k === i))); drawAd(); });
    return b;
  }));
  drawAd();

  // Budget planner
  const budget = h('input', { type: 'range', min: '500', max: '20000', step: '500', value: '3000', class: 'range', 'aria-label': L(T.media.monthly) });
  const budgetVal = h('strong', { class: 'planner__budget' });
  const goals = L(T.media.goals);
  let goal = 0;
  const goalSeg = h('div', { class: 'seg seg--3', role: 'group', 'aria-label': L(T.media.goal) }, ...goals.map((g, i) => {
    const b = h('button', { type: 'button', class: 'seg__btn', 'aria-pressed': String(i === 0) }, g);
    b.addEventListener('click', () => { goal = i; [...goalSeg.children].forEach((x, k) => x.setAttribute('aria-pressed', String(k === i))); plan(); });
    return b;
  }));
  const alloc = h('div', { class: 'planner__alloc' });
  const reachEl = h('strong', { class: 'planner__reach' });
  function plan() {
    const b = Number(budget.value);
    budgetVal.textContent = money(b);
    let reach = 0;
    alloc.replaceChildren(...PLATFORMS.map((p) => {
      const amt = b * p.share[goal];
      reach += (amt / p.cpm) * 1000 * 0.55;
      const bar = h('span', { class: 'rep__bar' }, h('i'));
      bar.firstChild.style.setProperty('--w', (p.share[goal] * 100 / 0.4).toFixed(1) + '%');
      bar.firstChild.style.setProperty('--c', p.c);
      return h('div', { class: 'rep__row' }, h('span', {}, p.n), bar, h('b', {}, money(Math.round(amt))));
    }));
    const lo = Math.round(reach * 0.8 / 1000) * 1000, hi = Math.round(reach * 1.2 / 1000) * 1000;
    reachEl.textContent = num(lo) + ' – ' + num(hi);
  }
  budget.addEventListener('input', plan);
  plan();

  const grid = h('ul', { class: 'plat-grid' }, ...PLATFORMS.map((p) => {
    const li = h('li', { class: 'plat', 'data-reveal': '', 'data-tilt': '' }, h('span', { class: 'plat__dot' }), h('b', {}, p.n), h('small', {}, p.sub));
    li.querySelector('.plat__dot').style.setProperty('--c', p.c);
    return li;
  }));

  return section({ id: 'demo-media', eyebrow: L(T.media.eyebrow), title: L(T.media.title), text: L(T.media.text), badge: L(T.demo) },
    grid,
    h('div', { class: 'media', 'data-reveal': '' },
      h('div', { class: 'media__studio' }, platTabs, fmtTabs, h('div', { class: 'media__stage' }, ad)),
      h('div', { class: 'planner panel' },
        h('p', { class: 'panel__title' }, L(T.media.budget)),
        h('label', { class: 'planner__row' }, h('span', {}, L(T.media.monthly)), budgetVal),
        budget,
        h('p', { class: 'panel__title' }, L(T.media.goal)), goalSeg,
        alloc,
        h('div', { class: 'planner__result' }, h('small', {}, L(T.media.reach)), reachEl),
        h('p', { class: 'chat__privacy' }, L(T.media.disclaimer)))));
}

export function mount(container) {
  container.replaceChildren(automation(), analytics(), report(), media());
}
