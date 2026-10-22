// IT & consulting page: service pillars, an interactive digital-readiness check,
// a clickable infrastructure map, a security posture check and a roadmap.
import { h, icon, L, section, onVisible, svg, sleep, reduced } from './kit.js';

const T = {
  demo: { de: 'Interaktiv · läuft lokal im Browser', en: 'Interactive · runs locally in your browser', ru: 'Интерактивно · работает в браузере' },
  pillars: {
    eyebrow: { de: 'Beratung mit Substanz', en: 'Consulting with substance', ru: 'Консалтинг по существу' },
    title: { de: 'Drei Disziplinen. Ein Ansprechpartner.', en: 'Three disciplines. One contact.', ru: 'Три направления. Один контакт.' },
    text: { de: 'Von der KI-Strategie über den IT-Betrieb bis zur Digitalisierung Ihrer Prozesse – pragmatisch, herstellerneutral und mit Blick auf deutsche Vorgaben.', en: 'From AI strategy to IT operations to digitalising your processes – pragmatic, vendor-neutral and with German regulations in mind.', ru: 'От ИИ-стратегии до IT-эксплуатации и цифровизации процессов – прагматично, независимо от вендоров и с учётом требований Германии.' },
    items: [
      { i: 'ai', t: { de: 'KI-Beratung', en: 'AI consulting', ru: 'ИИ-консалтинг' },
        l: { de: ['KI-Readiness-Check & Potenzialanalyse', 'Use-Case-Workshops mit ROI-Bewertung', 'KI-Strategie & Umsetzungs-Roadmap', 'EU-KI-Verordnung: Richtlinien & Compliance', 'Tool-Auswahl: Copilot, ChatGPT, Claude, EU-Modelle', 'KI-Kompetenz-Schulungen (Art. 4 KI-VO)'],
          en: ['AI readiness check & potential analysis', 'Use-case workshops with ROI assessment', 'AI strategy & implementation roadmap', 'EU AI Act: policies & compliance', 'Tool selection: Copilot, ChatGPT, Claude, EU models', 'AI literacy training (Art. 4 AI Act)'],
          ru: ['Оценка готовности к ИИ и потенциала', 'Воркшопы по сценариям с оценкой ROI', 'ИИ-стратегия и дорожная карта', 'Регламент ЕС об ИИ: правила и соответствие', 'Выбор инструментов: Copilot, ChatGPT, Claude, модели ЕС', 'Обучение ИИ-грамотности (ст. 4)'] } },
      { i: 'it', t: { de: 'IT-Services', en: 'IT services', ru: 'IT-услуги' },
        l: { de: ['Managed IT & Helpdesk', 'Microsoft 365 & Google Workspace', 'Cloud-Migration in EU-Rechenzentren', 'Backup & Notfallwiederherstellung (3-2-1)', 'Netzwerk, WLAN & Firewall', 'Endpoint-Security & Patch-Management'],
          en: ['Managed IT & helpdesk', 'Microsoft 365 & Google Workspace', 'Cloud migration to EU data centres', 'Backup & disaster recovery (3-2-1)', 'Network, Wi-Fi & firewall', 'Endpoint security & patch management'],
          ru: ['Managed IT и служба поддержки', 'Microsoft 365 и Google Workspace', 'Миграция в облако в дата-центрах ЕС', 'Резервное копирование и восстановление (3-2-1)', 'Сеть, Wi-Fi и межсетевой экран', 'Защита устройств и обновления'] } },
      { i: 'layers', t: { de: 'Digitalberatung', en: 'Digital consulting', ru: 'Цифровой консалтинг' },
        l: { de: ['Digitalisierungsstrategie', 'Prozessanalyse & Automatisierung', 'Software- & Tool-Auswahl', 'DSGVO- & NIS2-Readiness', 'IT-Sicherheitskonzept', 'KPI-Dashboards & Reporting'],
          en: ['Digitalisation strategy', 'Process analysis & automation', 'Software & tool selection', 'GDPR & NIS2 readiness', 'IT security concept', 'KPI dashboards & reporting'],
          ru: ['Стратегия цифровизации', 'Анализ и автоматизация процессов', 'Выбор ПО и инструментов', 'Готовность к GDPR и NIS2', 'Концепция IT-безопасности', 'KPI-дашборды и отчётность'] } }
    ]
  },
  check: {
    eyebrow: { de: 'Digital-Readiness-Check', en: 'Digital readiness check', ru: 'Проверка цифровой зрелости' },
    title: { de: 'Wie digital ist Ihr Unternehmen?', en: 'How digital is your business?', ru: 'Насколько цифровой ваш бизнес?' },
    text: { de: 'Sechs Fragen, eine Minute: Sie erhalten Ihr Profil und die drei wirkungsvollsten nächsten Schritte. Ihre Antworten bleiben in Ihrem Browser.', en: 'Six questions, one minute: you get your profile and the three most effective next steps. Your answers stay in your browser.', ru: 'Шесть вопросов, одна минута: вы получите профиль и три самых эффективных шага. Ответы остаются в вашем браузере.' },
    axes: { de: ['Website', 'Prozesse', 'Daten', 'Sicherheit', 'KI', 'Marketing'], en: ['Website', 'Processes', 'Data', 'Security', 'AI', 'Marketing'], ru: ['Сайт', 'Процессы', 'Данные', 'Безопасность', 'ИИ', 'Маркетинг'] },
    qs: {
      de: ['Wie aktuell ist Ihre Website (mobil, schnell, rechtssicher)?', 'Wie viele Abläufe laufen digital statt auf Papier oder per Hand?', 'Haben Sie Ihre wichtigsten Kennzahlen jederzeit im Blick?', 'Gibt es Backups, MFA und regelmäßige Updates?', 'Nutzt Ihr Team bereits KI-Werkzeuge im Alltag?', 'Gewinnen Sie planbar Kunden über digitale Kanäle?'],
      en: ['How up to date is your website (mobile, fast, legally compliant)?', 'How many processes run digitally instead of on paper or by hand?', 'Do you have your key figures in view at all times?', 'Do you have backups, MFA and regular updates?', 'Does your team already use AI tools day to day?', 'Do you win customers predictably through digital channels?'],
      ru: ['Насколько современен ваш сайт (мобильный, быстрый, юридически корректный)?', 'Сколько процессов цифровые, а не на бумаге или вручную?', 'Видите ли вы ключевые показатели в любой момент?', 'Есть ли резервные копии, MFA и регулярные обновления?', 'Использует ли команда ИИ-инструменты ежедневно?', 'Получаете ли вы клиентов из цифровых каналов стабильно?']
    },
    answers: { de: ['Kaum', 'Teilweise', 'Größtenteils', 'Vollständig'], en: ['Hardly', 'Partly', 'Mostly', 'Fully'], ru: ['Почти нет', 'Частично', 'В основном', 'Полностью'] },
    back: { de: 'Zurück', en: 'Back', ru: 'Назад' },
    question: { de: 'Frage', en: 'Question', ru: 'Вопрос' },
    result: { de: 'Ihr Digital-Score', en: 'Your digital score', ru: 'Ваш цифровой балл' },
    levels: { de: ['Einsteiger', 'Auf dem Weg', 'Fortgeschritten', 'Vorreiter'], en: ['Beginner', 'On the way', 'Advanced', 'Pioneer'], ru: ['Начинающий', 'В пути', 'Продвинутый', 'Лидер'] },
    next: { de: 'Ihre nächsten Schritte', en: 'Your next steps', ru: 'Ваши следующие шаги' },
    recs: {
      de: ['Website modernisieren: mobil, schnell, mit Impressum & Datenschutz.', 'Wiederkehrende Abläufe automatisieren – z. B. Angebote, Rechnungen, Termine.', 'Ein zentrales Dashboard für Umsatz, Leads und Kosten einrichten.', 'Backups testen, MFA aktivieren, Updates automatisieren.', 'Mit einem KI-Workshop zwei Quick-Wins identifizieren und schulen.', 'Kampagnen mit klarem Budget und messbaren Zielen starten.'],
      en: ['Modernise the website: mobile, fast, with legal notice & privacy policy.', 'Automate recurring tasks – e.g. quotes, invoices, appointments.', 'Set up one central dashboard for revenue, leads and costs.', 'Test backups, enable MFA, automate updates.', 'Identify and train two quick wins in an AI workshop.', 'Launch campaigns with a clear budget and measurable goals.'],
      ru: ['Обновить сайт: мобильный, быстрый, с импрессумом и политикой.', 'Автоматизировать рутину – предложения, счета, записи.', 'Создать единый дашборд выручки, лидов и затрат.', 'Проверить бэкапы, включить MFA, автоматизировать обновления.', 'Найти два быстрых ИИ-решения на воркшопе и обучить команду.', 'Запустить кампании с ясным бюджетом и измеримыми целями.']
    },
    restart: { de: 'Neu starten', en: 'Start over', ru: 'Заново' },
    talk: { de: 'Ergebnis besprechen', en: 'Discuss the result', ru: 'Обсудить результат' }
  },
  infra: {
    eyebrow: { de: 'IT-Infrastruktur', en: 'IT infrastructure', ru: 'IT-инфраструктура' },
    title: { de: 'Ihre IT – sauber verbunden.', en: 'Your IT – cleanly connected.', ru: 'Ваша IT – грамотно связана.' },
    text: { de: 'So sieht eine moderne, sichere Infrastruktur für kleine und mittlere Unternehmen aus. Klicken Sie auf einen Baustein.', en: 'This is what a modern, secure infrastructure for small and medium businesses looks like. Click a component.', ru: 'Так выглядит современная безопасная инфраструктура для малого и среднего бизнеса. Нажмите на элемент.' },
    nodes: [
      { k: 'office', x: 110, y: 200, n: { de: 'Büro-Netzwerk', en: 'Office network', ru: 'Офисная сеть' }, d: { de: 'Getrennte Netze für Team, Gäste und Geräte, WLAN mit WPA3 und zentral verwaltete Access Points.', en: 'Separate networks for team, guests and devices, WPA3 Wi-Fi and centrally managed access points.', ru: 'Раздельные сети для команды, гостей и устройств, Wi-Fi WPA3 и централизованное управление.' } },
      { k: 'firewall', x: 290, y: 200, n: { de: 'Firewall', en: 'Firewall', ru: 'Межсетевой экран' }, d: { de: 'Next-Gen-Firewall mit VPN für Homeoffice, Filterung und Protokollierung nach Stand der Technik.', en: 'Next-gen firewall with VPN for remote work, filtering and logging to the state of the art.', ru: 'Межсетевой экран нового поколения с VPN для удалённой работы, фильтрацией и журналированием.' } },
      { k: 'cloud', x: 470, y: 110, n: { de: 'Cloud (EU)', en: 'Cloud (EU)', ru: 'Облако (ЕС)' }, d: { de: 'Microsoft 365 oder Google Workspace mit Rechenzentren in der EU, Single Sign-on und MFA für alle Konten.', en: 'Microsoft 365 or Google Workspace with EU data centres, single sign-on and MFA for every account.', ru: 'Microsoft 365 или Google Workspace с дата-центрами в ЕС, единый вход и MFA для всех аккаунтов.' } },
      { k: 'backup', x: 470, y: 290, n: { de: 'Backup 3-2-1', en: 'Backup 3-2-1', ru: 'Бэкап 3-2-1' }, d: { de: '3 Kopien, 2 Medien, 1 Kopie extern und unveränderbar – regelmäßig per Wiederherstellungstest geprüft.', en: '3 copies, 2 media, 1 copy off-site and immutable – verified by regular restore tests.', ru: '3 копии, 2 носителя, 1 копия вне офиса и неизменяемая – с регулярной проверкой восстановления.' } },
      { k: 'devices', x: 650, y: 200, n: { de: 'Geräte & Homeoffice', en: 'Devices & remote work', ru: 'Устройства и удалёнка' }, d: { de: 'Laptops und Smartphones zentral verwaltet: Verschlüsselung, automatische Updates, Fernlöschung bei Verlust.', en: 'Laptops and phones managed centrally: encryption, automatic updates, remote wipe if lost.', ru: 'Ноутбуки и смартфоны под централизованным управлением: шифрование, обновления, удалённая очистка.' } }
    ],
    links: [['office', 'firewall'], ['firewall', 'cloud'], ['firewall', 'backup'], ['cloud', 'devices'], ['cloud', 'backup'], ['backup', 'devices']]
  },
  sec: {
    eyebrow: { de: 'Sicherheits-Check', en: 'Security check', ru: 'Проверка безопасности' },
    title: { de: 'Wie gut sind Sie geschützt?', en: 'How well are you protected?', ru: 'Насколько вы защищены?' },
    text: { de: 'Haken Sie ab, was bei Ihnen bereits umgesetzt ist. Die Ampel zeigt, wo das größte Risiko liegt.', en: 'Tick what you already have in place. The traffic light shows where the biggest risk lies.', ru: 'Отметьте, что уже внедрено. Индикатор покажет главный риск.' },
    items: {
      de: [['Mehr-Faktor-Anmeldung (MFA)', 3], ['Getestete Backups', 3], ['Automatische Updates', 2], ['Firewall & VPN', 2], ['Phishing-Schulung fürs Team', 2], ['Passwort-Manager', 1], ['Verschlüsselte Geräte', 1], ['Notfallplan für Cyberangriffe', 2]],
      en: [['Multi-factor authentication (MFA)', 3], ['Tested backups', 3], ['Automatic updates', 2], ['Firewall & VPN', 2], ['Phishing training for the team', 2], ['Password manager', 1], ['Encrypted devices', 1], ['Incident response plan', 2]],
      ru: [['Многофакторная аутентификация (MFA)', 3], ['Проверенные бэкапы', 3], ['Автообновления', 2], ['Межсетевой экран и VPN', 2], ['Обучение команды против фишинга', 2], ['Менеджер паролей', 1], ['Шифрование устройств', 1], ['План реагирования на инциденты', 2]]
    },
    levels: { de: ['Hohes Risiko', 'Mittleres Risiko', 'Gut aufgestellt'], en: ['High risk', 'Medium risk', 'Well protected'], ru: ['Высокий риск', 'Средний риск', 'Хорошая защита'] },
    priority: { de: 'Höchste Priorität', en: 'Top priority', ru: 'Главный приоритет' },
    allDone: { de: 'Alles umgesetzt – jetzt regelmäßig prüfen und üben.', en: 'All in place – now review and practise regularly.', ru: 'Всё внедрено – теперь регулярно проверяйте и тренируйтесь.' }
  },
  road: {
    eyebrow: { de: 'Vorgehen', en: 'Approach', ru: 'Подход' },
    title: { de: 'Von der Analyse zum laufenden Betrieb.', en: 'From analysis to live operation.', ru: 'От анализа до стабильной работы.' },
    steps: {
      de: [['Analyse', 'Ist-Aufnahme, Interviews, Risiko- und Potenzialbewertung.', 'Bericht mit Prioritäten'], ['Strategie', 'Ziele, Architektur, Budget und Fahrplan – verständlich aufbereitet.', 'Roadmap & Angebot'], ['Umsetzung', 'Einführung in Etappen, Migration ohne Stillstand, Schulung des Teams.', 'Laufende Systeme'], ['Betrieb', 'Monitoring, Updates, Support und jährlicher Review.', 'Planbare Kosten']],
      en: [['Analysis', 'Current state, interviews, risk and potential assessment.', 'Report with priorities'], ['Strategy', 'Goals, architecture, budget and roadmap – clearly presented.', 'Roadmap & proposal'], ['Implementation', 'Rollout in stages, migration without downtime, team training.', 'Running systems'], ['Operation', 'Monitoring, updates, support and an annual review.', 'Predictable costs']],
      ru: [['Анализ', 'Текущее состояние, интервью, оценка рисков и потенциала.', 'Отчёт с приоритетами'], ['Стратегия', 'Цели, архитектура, бюджет и план – понятно и наглядно.', 'Дорожная карта'], ['Внедрение', 'Поэтапный запуск, миграция без простоев, обучение команды.', 'Работающие системы'], ['Эксплуатация', 'Мониторинг, обновления, поддержка и ежегодный аудит.', 'Предсказуемые расходы']]
    },
    result: { de: 'Ergebnis', en: 'Outcome', ru: 'Результат' }
  },
  facts: {
    eyebrow: { de: 'Gut zu wissen', en: 'Good to know', ru: 'Полезно знать' },
    title: { de: 'Was 2026 für Unternehmen in Deutschland gilt.', en: 'What applies to businesses in Germany in 2026.', ru: 'Что действует для компаний в Германии в 2026 году.' },
    items: {
      de: [['NIS2', 'Seit dem 6. Dezember 2025 gilt das NIS2-Umsetzungsgesetz. Deutlich mehr Unternehmen müssen Cybersicherheits-Maßnahmen nachweisen und Vorfälle melden.'], ['KI-Kompetenz', 'Seit Februar 2025 müssen Unternehmen, die KI einsetzen, für ausreichende KI-Kompetenz ihrer Mitarbeitenden sorgen (Art. 4 KI-VO).'], ['KI-Transparenz', 'Seit August 2026 müssen Chatbots als KI erkennbar sein (Art. 50 KI-VO).'], ['Barrierefreiheit', 'Seit Juni 2025 verpflichtet das BFSG viele Online-Angebote für Verbraucher zur Barrierefreiheit.']],
      en: [['NIS2', 'Germany’s NIS2 implementation act has applied since 6 December 2025. Many more companies must demonstrate cybersecurity measures and report incidents.'], ['AI literacy', 'Since February 2025, companies using AI must ensure sufficient AI literacy among their staff (Art. 4 AI Act).'], ['AI transparency', 'Since August 2026, chatbots must be recognisable as AI (Art. 50 AI Act).'], ['Accessibility', 'Since June 2025, Germany’s BFSG requires many consumer-facing online services to be accessible.']],
      ru: [['NIS2', 'С 6 декабря 2025 года действует закон о внедрении NIS2. Гораздо больше компаний обязаны подтверждать меры кибербезопасности и сообщать об инцидентах.'], ['ИИ-грамотность', 'С февраля 2025 года компании, использующие ИИ, обязаны обеспечить ИИ-грамотность сотрудников (ст. 4).'], ['Прозрачность ИИ', 'С августа 2026 года чат-боты должны быть узнаваемы как ИИ (ст. 50).'], ['Доступность', 'С июня 2025 года закон BFSG требует доступности многих онлайн-сервисов для потребителей.']]
    }
  }
};

/* ---------------- Pillars ---------------- */
function pillars() {
  return section({ id: 'it-pillars', eyebrow: L(T.pillars.eyebrow), title: L(T.pillars.title), text: L(T.pillars.text) },
    h('ul', { class: 'pillars' }, ...T.pillars.items.map((p, i) => h('li', { class: 'pillar', 'data-reveal': '', 'data-tilt': '' },
      h('span', { class: 'pillar__glow', 'aria-hidden': 'true' }),
      h('div', { class: 'pillar__top' }, h('span', { class: 'pillar__icon' }, icon(p.i, 26)), h('span', { class: 'pillar__num' }, '0' + (i + 1))),
      h('h3', {}, L(p.t)),
      h('ul', { class: 'pillar__list' }, ...L(p.l).map((x) => h('li', {}, icon('check', 16), x)))))));
}

/* ---------------- Readiness check with radar ---------------- */
function radar(values, axes) {
  const cx = 160, cy = 150, R = 110, n = axes.length;
  const pt = (i, r) => [cx + Math.sin((i / n) * Math.PI * 2) * r, cy - Math.cos((i / n) * Math.PI * 2) * r];
  const s = svg('svg', { viewBox: '0 0 320 300', class: 'radar', role: 'img', 'aria-label': axes.map((a, i) => a + ' ' + Math.round(values[i] * 100) + '%').join(', ') });
  [0.25, 0.5, 0.75, 1].forEach((k) => s.append(svg('polygon', { points: axes.map((_, i) => pt(i, R * k).join(',')).join(' '), class: 'radar__ring' })));
  axes.forEach((a, i) => {
    const [x, y] = pt(i, R);
    s.append(svg('line', { x1: cx, y1: cy, x2: x, y2: y, class: 'radar__axis' }));
    const [lx, ly] = pt(i, R + 22);
    s.append(svg('text', { x: lx, y: ly + 4, 'text-anchor': 'middle', class: 'radar__label' }, document.createTextNode(a)));
  });
  const poly = svg('polygon', { points: axes.map((_, i) => pt(i, 0).join(',')).join(' '), class: 'radar__shape' });
  s.append(poly);
  const target = axes.map((_, i) => pt(i, Math.max(0.08, values[i]) * R).join(',')).join(' ');
  requestAnimationFrame(() => requestAnimationFrame(() => poly.setAttribute('points', target)));
  return s;
}

function readiness() {
  const qs = L(T.check.qs), axes = L(T.check.axes), answers = L(T.check.answers);
  const vals = [];
  const stage = h('div', { class: 'quiz__stage', 'aria-live': 'polite' });
  const bar = h('span', { class: 'quiz__progress' }, h('i'));

  function ask(i) {
    bar.firstChild.style.setProperty('--w', (i / qs.length * 100) + '%');
    const opts = h('div', { class: 'quiz__opts' }, ...answers.map((a, k) => {
      const b = h('button', { type: 'button', class: 'quiz__opt' }, h('span', { class: 'quiz__dots', 'aria-hidden': 'true' }, ...[0, 1, 2, 3].map((d) => h('i', { class: d <= k ? 'on' : '' }))), a);
      b.addEventListener('click', () => { vals[i] = (k + 1) / 4; i + 1 < qs.length ? ask(i + 1) : result(); });
      return b;
    }));
    const back = i ? h('button', { type: 'button', class: 'quiz__back' }, '← ' + L(T.check.back)) : null;
    back?.addEventListener('click', () => ask(i - 1));
    stage.replaceChildren(h('div', { class: 'quiz__q' },
      h('p', { class: 'eyebrow' }, L(T.check.question) + ' ' + (i + 1) + ' / ' + qs.length + ' · ' + axes[i]),
      h('h3', {}, qs[i]), opts, back));
    stage.querySelector('.quiz__opt')?.focus({ preventScroll: true });
  }

  function result() {
    bar.firstChild.style.setProperty('--w', '100%');
    const score = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 100);
    const level = L(T.check.levels)[Math.min(3, Math.floor(score / 26))];
    const recs = vals.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]).slice(0, 3).map(([, i]) => L(T.check.recs)[i]);
    const restart = h('button', { type: 'button', class: 'btn btn--ghost btn--sm' }, L(T.check.restart));
    restart.addEventListener('click', () => { vals.length = 0; ask(0); });
    stage.replaceChildren(h('div', { class: 'quiz__result' },
      h('div', { class: 'quiz__score' },
        h('small', {}, L(T.check.result)),
        h('strong', {}, String(score)),
        h('span', { class: 'quiz__level' }, level),
        radar(vals, axes)),
      h('div', {},
        h('p', { class: 'panel__title' }, L(T.check.next)),
        h('ol', { class: 'quiz__recs' }, ...recs.map((r) => h('li', {}, r))),
        h('div', { class: 'quiz__actions' },
          h('a', { class: 'btn btn--primary btn--sm', href: 'kontakt.html?service=it' }, L(T.check.talk), icon('arrow', 16)),
          restart))));
  }
  ask(0);
  return section({ id: 'demo-readiness', eyebrow: L(T.check.eyebrow), title: L(T.check.title), text: L(T.check.text), badge: L(T.demo) },
    h('div', { class: 'quiz', 'data-reveal': '' }, bar, stage));
}

/* ---------------- Infrastructure map ---------------- */
function infra() {
  const nodes = T.infra.nodes;
  const byKey = Object.fromEntries(nodes.map((n) => [n.k, n]));
  const W = 760, H = 400;
  const map = svg('svg', { viewBox: `0 0 ${W} ${H}`, class: 'infra__map', 'aria-hidden': 'true' });
  const links = svg('g');
  const packets = svg('g');
  map.append(links, packets);
  T.infra.links.forEach(([a, b], i) => {
    const A = byKey[a], B = byKey[b];
    const d = `M${A.x},${A.y} C${(A.x + B.x) / 2},${A.y} ${(A.x + B.x) / 2},${B.y} ${B.x},${B.y}`;
    links.append(svg('path', { d, class: 'infra__link' }));
    if (!reduced) {
      const p = svg('circle', { r: 4, class: 'infra__packet' });
      p.append(svg('animateMotion', { dur: (2.4 + i * 0.4) + 's', repeatCount: 'indefinite', path: d }));
      packets.append(p);
    }
  });
  const info = h('div', { class: 'infra__info', 'aria-live': 'polite' });
  const btns = nodes.map((n) => {
    const b = h('button', { type: 'button', class: 'infra__node', 'aria-pressed': 'false' }, h('span', { class: 'infra__icon' }, icon({ office: 'layers', firewall: 'shield', cloud: 'spark', backup: 'it', devices: 'phone' }[n.k], 22)), h('span', {}, L(n.n)));
    b.style.setProperty('--x', (n.x / W * 100) + '%');
    b.style.setProperty('--y', (n.y / H * 100) + '%');
    b.addEventListener('click', () => select(n.k));
    return b;
  });
  function select(k) {
    const n = byKey[k];
    btns.forEach((b, i) => b.setAttribute('aria-pressed', String(nodes[i].k === k)));
    info.replaceChildren(h('b', {}, L(n.n)), h('p', {}, L(n.d)));
  }
  select('cloud');
  const box = h('div', { class: 'infra', 'data-reveal': '' },
    h('div', { class: 'infra__canvas' }, map, ...btns),
    info);
  // Pause SVG animations while off screen to save battery.
  onVisible(box, () => map.unpauseAnimations?.(), () => map.pauseAnimations?.());
  return section({ id: 'demo-infra', eyebrow: L(T.infra.eyebrow), title: L(T.infra.title), text: L(T.infra.text), badge: L(T.demo) }, box);
}

/* ---------------- Security posture ---------------- */
function security() {
  const items = L(T.sec.items);
  const state = items.map((_, i) => i === 2 || i === 3);
  const gauge = h('div', { class: 'gauge' }, h('span', { class: 'gauge__fill' }), h('strong', { class: 'gauge__num' }));
  const level = h('p', { class: 'gauge__level' });
  const prio = h('p', { class: 'sec__prio' });
  const max = items.reduce((a, [, w]) => a + w, 0);
  const list = h('ul', { class: 'sec__list' }, ...items.map(([label], i) => {
    const input = h('input', { type: 'checkbox', id: 'sec-' + i, checked: state[i] });
    input.addEventListener('change', () => { state[i] = input.checked; draw(); });
    return h('li', {}, input, h('label', { for: 'sec-' + i }, h('span', { class: 'sec__box', 'aria-hidden': 'true' }, icon('check', 14)), label));
  }));
  function draw() {
    const got = items.reduce((a, [, w], i) => a + (state[i] ? w : 0), 0);
    const pct = Math.round(got / max * 100);
    gauge.style.setProperty('--p', pct);
    gauge.querySelector('.gauge__num').textContent = pct + ' %';
    const lv = pct < 45 ? 0 : pct < 80 ? 1 : 2;
    gauge.dataset.level = String(lv);
    level.textContent = L(T.sec.levels)[lv];
    const open = items.map((x, i) => [x, i]).filter(([, i]) => !state[i]).sort((a, b) => b[0][1] - a[0][1]);
    prio.replaceChildren(open.length ? h('span', {}, h('b', {}, L(T.sec.priority) + ': '), open[0][0][0]) : L(T.sec.allDone));
  }
  draw();
  return section({ id: 'demo-security', eyebrow: L(T.sec.eyebrow), title: L(T.sec.title), text: L(T.sec.text), badge: L(T.demo) },
    h('div', { class: 'sec', 'data-reveal': '' }, list, h('div', { class: 'sec__side' }, gauge, level, prio)));
}

/* ---------------- Roadmap + facts ---------------- */
function roadmap() {
  return section({ id: 'it-roadmap', eyebrow: L(T.road.eyebrow), title: L(T.road.title) },
    h('ol', { class: 'road' }, ...L(T.road.steps).map(([a, b, c], i) => h('li', { class: 'road__step', 'data-reveal': '' },
      h('span', { class: 'road__num' }, '0' + (i + 1)),
      h('h3', {}, a), h('p', {}, b),
      h('p', { class: 'road__out' }, h('small', {}, L(T.road.result)), c)))));
}

function facts() {
  return section({ id: 'it-facts', eyebrow: L(T.facts.eyebrow), title: L(T.facts.title) },
    h('ul', { class: 'facts' }, ...L(T.facts.items).map(([a, b]) => h('li', { class: 'fact', 'data-reveal': '' }, h('b', {}, a), h('p', {}, b)))));
}

export function mount(container) {
  container.replaceChildren(pillars(), readiness(), infra(), security(), roadmap(), facts());
}
