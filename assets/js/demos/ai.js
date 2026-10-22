// AI page: assistant chat, auto-reply inbox, marketing tools, AI coding and
// a tools overview. All demos run locally; nothing typed here leaves the browser.
// The page carries an AI-interaction notice as required by Art. 50 EU AI Act.
import { h, icon, L, section, onVisible, chatLog, norm, sleep, typeInto, reduced } from './kit.js';

const T = {
  demo: { de: 'KI-Demo · läuft lokal im Browser', en: 'AI demo · runs locally in your browser', ru: 'ИИ-демо · работает в браузере' },
  notice: {
    title: { de: 'Transparenzhinweis', en: 'Transparency notice', ru: 'Уведомление о прозрачности' },
    text: { de: 'Auf dieser Seite interagieren Sie mit KI-Demonstrationen (Art. 50 KI-Verordnung). Die Antworten entstehen lokal in Ihrem Browser aus vorbereiteten Beispielen und Regeln. Ihre Eingaben werden weder übertragen noch gespeichert.', en: 'On this page you interact with AI demonstrations (Art. 50 EU AI Act). Responses are generated locally in your browser from prepared examples and rules. Your input is neither transmitted nor stored.', ru: 'На этой странице вы взаимодействуете с демонстрациями ИИ (ст. 50 Регламента ЕС об ИИ). Ответы формируются локально в браузере на основе подготовленных примеров и правил. Ваши данные не передаются и не сохраняются.' }
  },
  chat: {
    eyebrow: { de: 'KI-Assistent', en: 'AI assistant', ru: 'ИИ-ассистент' },
    title: { de: 'Ein Assistent, der Ihr Geschäft kennt.', en: 'An assistant that knows your business.', ru: 'Ассистент, который знает ваш бизнес.' },
    text: { de: 'Trainiert auf Ihre Inhalte, beantwortet er Kundenfragen rund um die Uhr – in jeder Sprache. Fragen Sie ihn etwas über TMX.', en: 'Trained on your content, it answers customer questions around the clock – in any language. Ask it something about TMX.', ru: 'Обученный на ваших данных, он отвечает клиентам круглосуточно – на любом языке. Спросите его о TMX.' },
    name: { de: 'TMX Assistent', en: 'TMX Assistant', ru: 'TMX Ассистент' },
    label: { de: 'KI', en: 'AI', ru: 'ИИ' },
    hello: { de: 'Hallo! Ich bin ein KI-Assistent (Demo). Fragen Sie mich zu Leistungen, Ablauf, Preisen oder Datenschutz.', en: 'Hi! I am an AI assistant (demo). Ask me about services, process, pricing or privacy.', ru: 'Здравствуйте! Я ИИ-ассистент (демо). Спросите об услугах, процессе, ценах или защите данных.' },
    chips: {
      de: ['Was kostet eine Website?', 'Wie läuft ein Projekt ab?', 'Ist das DSGVO-konform?', 'Welche KI-Tools baut ihr?'],
      en: ['How much is a website?', 'How does a project work?', 'Is it GDPR compliant?', 'Which AI tools do you build?'],
      ru: ['Сколько стоит сайт?', 'Как проходит проект?', 'Это соответствует GDPR?', 'Какие ИИ-инструменты вы делаете?']
    },
    answers: {
      price: { de: 'Das hängt vom Umfang ab: Eine Landingpage ist schnell umgesetzt, ein Shop mit 3D-Erlebnis braucht mehr. Nach einem kostenlosen Erstgespräch erhalten Sie ein transparentes Festpreis-Angebot – ohne versteckte Kosten.', en: 'It depends on the scope: a landing page is quick, a shop with a 3D experience takes more. After a free discovery call you get a transparent fixed-price proposal – no hidden costs.', ru: 'Зависит от объёма: лендинг делается быстро, магазин с 3D – дольше. После бесплатной консультации вы получите прозрачное предложение с фиксированной ценой.' },
      process: { de: 'In vier Schritten: 1) Erstgespräch, 2) Konzept & Angebot, 3) Design & Entwicklung mit frühen Zwischenständen, 4) Launch & Betreuung. Sie haben dabei immer einen festen Ansprechpartner.', en: 'In four steps: 1) discovery call, 2) concept & proposal, 3) design & development with early previews, 4) launch & support. You always have one dedicated contact.', ru: 'Четыре шага: 1) знакомство, 2) концепция и предложение, 3) дизайн и разработка с ранними превью, 4) запуск и поддержка. У вас всегда один контакт.' },
      privacy: { de: 'Ja. Datenschutz ist eingebaut: Impressum, Datenschutzerklärung, Cookie-Einwilligung und auf Wunsch KI-Lösungen mit EU-Hosting und Auftragsverarbeitungsvertrag.', en: 'Yes. Privacy is built in: legal notice, privacy policy, cookie consent and, on request, AI solutions with EU hosting and a data processing agreement.', ru: 'Да. Защита данных встроена: импрессум, политика конфиденциальности, согласие на cookie и по запросу ИИ-решения с хостингом в ЕС и договором обработки данных.' },
      tools: { de: 'Zum Beispiel: Chatbots für Website & WhatsApp, automatische E-Mail-Antworten, Dokumenten-Auswertung, Lead-Scoring, Content-Generatoren und interne Wissensdatenbanken.', en: 'For example: chatbots for website & WhatsApp, automatic e-mail replies, document analysis, lead scoring, content generators and internal knowledge bases.', ru: 'Например: чат-боты для сайта и WhatsApp, автоответы на письма, анализ документов, скоринг лидов, генераторы контента и внутренние базы знаний.' },
      time: { de: 'Eine Landingpage steht oft in 1–2 Wochen, größere Websites und Shops in 4–8 Wochen – je nach Umfang und Inhalten.', en: 'A landing page is often live in 1–2 weeks, larger websites and shops in 4–8 weeks – depending on scope and content.', ru: 'Лендинг часто готов за 1–2 недели, крупные сайты и магазины – за 4–8 недель, в зависимости от объёма.' },
      contact: { de: 'Am einfachsten über das Kontaktformular – Sie erhalten innerhalb von 24 Stunden eine Antwort.', en: 'The easiest way is the contact form – you will get a reply within 24 hours.', ru: 'Проще всего через контактную форму – ответ в течение 24 часов.' },
      hello: { de: 'Hallo! Schön, dass Sie da sind. Womit kann ich helfen?', en: 'Hello! Great to have you here. How can I help?', ru: 'Здравствуйте! Рад вас видеть. Чем помочь?' },
      fallback: { de: 'Gute Frage! In der Demo kenne ich nur einen Ausschnitt. Ein echter Assistent wird auf alle Ihre Inhalte trainiert. Möchten Sie über das Kontaktformular ein Gespräch vereinbaren?', en: 'Good question! In this demo I only know a small part. A real assistant is trained on all your content. Would you like to book a call via the contact form?', ru: 'Хороший вопрос! В демо я знаю лишь часть. Настоящий ассистент обучается на всех ваших данных. Хотите договориться о звонке через форму?' }
    },
    placeholder: { de: 'Frage eingeben …', en: 'Ask a question …', ru: 'Введите вопрос …' },
    send: { de: 'Senden', en: 'Send', ru: 'Отправить' },
    privacy: { de: 'KI-Demo · keine Datenübertragung · Antworten können unvollständig sein', en: 'AI demo · no data transfer · answers may be incomplete', ru: 'ИИ-демо · без передачи данных · ответы могут быть неполными' }
  },
  reply: {
    eyebrow: { de: 'Automatische Antworten', en: 'Auto-reply', ru: 'Автоответы' },
    title: { de: 'Posteingang, der sich selbst sortiert.', en: 'An inbox that sorts itself.', ru: 'Входящие, которые сортируют себя сами.' },
    text: { de: 'Die KI erkennt Anliegen, Stimmung und Dringlichkeit und schreibt einen Antwortentwurf. Ein Mensch gibt frei – Sie behalten die Kontrolle.', en: 'The AI detects intent, sentiment and urgency and drafts a reply. A human approves – you stay in control.', ru: 'ИИ определяет запрос, тональность и срочность и пишет черновик ответа. Человек подтверждает – контроль у вас.' },
    analyse: { de: 'Analysieren & Antwort entwerfen', en: 'Analyse & draft reply', ru: 'Анализ и черновик' },
    approve: { de: 'Freigeben & senden', en: 'Approve & send', ru: 'Одобрить и отправить' },
    sent: { de: 'Gesendet ✓', en: 'Sent ✓', ru: 'Отправлено ✓' },
    intent: { de: 'Anliegen', en: 'Intent', ru: 'Запрос' },
    mood: { de: 'Stimmung', en: 'Sentiment', ru: 'Тональность' },
    prio: { de: 'Priorität', en: 'Priority', ru: 'Приоритет' },
    lang: { de: 'Sprache', en: 'Language', ru: 'Язык' },
    draft: { de: 'KI-Entwurf', en: 'AI draft', ru: 'Черновик ИИ' },
    pick: { de: 'Nachricht links auswählen', en: 'Select a message on the left', ru: 'Выберите сообщение слева' }
  },
  tools: {
    eyebrow: { de: 'KI im Marketing', en: 'AI for marketing', ru: 'ИИ в маркетинге' },
    title: { de: 'Werkzeuge, die mitdenken.', en: 'Tools that think along.', ru: 'Инструменты, которые думают вместе с вами.' },
    text: { de: 'Drei Mini-Tools zum Ausprobieren: Leads filtern, Posts schreiben, Bewertungen auswerten.', en: 'Three mini tools to try: filter leads, write posts, analyse reviews.', ru: 'Три мини-инструмента: фильтр лидов, генерация постов, анализ отзывов.' },
    tabs: { de: ['Lead-Filter', 'Post-Generator', 'Bewertungs-Analyse'], en: ['Lead filter', 'Post generator', 'Review analysis'], ru: ['Фильтр лидов', 'Генератор постов', 'Анализ отзывов'] },
    minScore: { de: 'Mindest-Score', en: 'Minimum score', ru: 'Мин. скоринг' },
    shown: { de: 'Leads angezeigt', en: 'leads shown', ru: 'лидов показано' },
    product: { de: 'Produkt oder Angebot', en: 'Product or offer', ru: 'Продукт или предложение' },
    productDefault: { de: 'Neue Herbst-Kollektion Kerzen', en: 'New autumn candle collection', ru: 'Новая осенняя коллекция свечей' },
    channel: { de: 'Kanal', en: 'Channel', ru: 'Канал' },
    tone: { de: 'Tonalität', en: 'Tone', ru: 'Тон' },
    tones: { de: ['Freundlich', 'Premium', 'Verspielt'], en: ['Friendly', 'Premium', 'Playful'], ru: ['Дружелюбный', 'Премиум', 'Игривый'] },
    generate: { de: 'Post generieren', en: 'Generate post', ru: 'Создать пост' },
    aiLabel: { de: 'KI-generiert', en: 'AI-generated', ru: 'Создано ИИ' },
    review: { de: 'Kundenbewertung', en: 'Customer review', ru: 'Отзыв клиента' },
    reviewDefault: { de: 'Super schneller Versand und tolle Qualität, aber die Verpackung war leider beschädigt.', en: 'Super fast shipping and great quality, but unfortunately the packaging was damaged.', ru: 'Очень быстрая доставка и отличное качество, но упаковка, к сожалению, была повреждена.' },
    analyse: { de: 'Analysieren', en: 'Analyse', ru: 'Анализировать' },
    pos: { de: 'Positiv', en: 'Positive', ru: 'Позитив' },
    neg: { de: 'Negativ', en: 'Negative', ru: 'Негатив' },
    neutral: { de: 'Neutral', en: 'Neutral', ru: 'Нейтрально' },
    found: { de: 'Erkannte Themen', en: 'Detected topics', ru: 'Найденные темы' },
    suggestion: { de: 'Empfehlung', en: 'Recommendation', ru: 'Рекомендация' }
  },
  code: {
    eyebrow: { de: 'KI-Coding', en: 'AI coding', ru: 'ИИ-кодинг' },
    title: { de: 'Beschreiben Sie es. Die KI schreibt den Code.', en: 'Describe it. The AI writes the code.', ru: 'Опишите задачу. ИИ напишет код.' },
    text: { de: 'Beschreiben Sie eine Aufgabe – oder fügen Sie eigenen Code ein und lassen Sie ihn erklären und prüfen.', en: 'Describe a task – or paste your own code to have it explained and reviewed.', ru: 'Опишите задачу – или вставьте свой код, чтобы получить объяснение и проверку.' },
    modes: { de: ['Code generieren', 'Code erklären & prüfen'], en: ['Generate code', 'Explain & review code'], ru: ['Сгенерировать код', 'Объяснить и проверить'] },
    promptLabel: { de: 'Ihre Aufgabe', en: 'Your task', ru: 'Ваша задача' },
    promptDefault: { de: 'Prüfe eine E-Mail-Adresse auf Gültigkeit', en: 'Validate an e-mail address', ru: 'Проверить корректность e-mail' },
    codeLabel: { de: 'Ihr Code', en: 'Your code', ru: 'Ваш код' },
    language: { de: 'Sprache', en: 'Language', ru: 'Язык' },
    run: { de: 'Ausführen', en: 'Run', ru: 'Запустить' },
    copy: { de: 'Kopieren', en: 'Copy', ru: 'Копировать' },
    copied: { de: 'Kopiert ✓', en: 'Copied ✓', ru: 'Скопировано ✓' },
    ideas: { de: 'Ideen', en: 'Ideas', ru: 'Идеи' },
    ideaList: {
      de: ['Prüfe eine E-Mail-Adresse', 'Daten von einer API laden', 'Countdown-Timer', 'Top-Kunden per SQL', 'CSV-Datei auswerten', 'Kontaktformular in HTML'],
      en: ['Validate an e-mail address', 'Load data from an API', 'Countdown timer', 'Top customers in SQL', 'Analyse a CSV file', 'Contact form in HTML'],
      ru: ['Проверить e-mail', 'Загрузить данные из API', 'Таймер обратного отсчёта', 'Топ клиентов на SQL', 'Анализ CSV-файла', 'Контактная форма на HTML']
    },
    review: { de: 'Code-Review', en: 'Code review', ru: 'Ревью кода' },
    detected: { de: 'Erkannte Sprache', en: 'Detected language', ru: 'Определён язык' },
    structure: { de: 'Aufbau', en: 'Structure', ru: 'Структура' },
    issues: { de: 'Hinweise', en: 'Findings', ru: 'Замечания' },
    noIssues: { de: 'Keine typischen Probleme gefunden. 👍', en: 'No typical issues found. 👍', ru: 'Типичных проблем не найдено. 👍' },
    note: { de: 'KI-Demo: Code-Vorschläge vor dem Einsatz immer prüfen.', en: 'AI demo: always review code suggestions before use.', ru: 'ИИ-демо: всегда проверяйте код перед использованием.' }
  },
  grid: {
    eyebrow: { de: 'KI-Lösungen', en: 'AI solutions', ru: 'ИИ-решения' },
    title: { de: 'Was wir für Sie bauen können.', en: 'What we can build for you.', ru: 'Что мы можем сделать для вас.' },
    items: [
      { i: 'ai', de: ['Website- & WhatsApp-Chatbot', 'Beantwortet Fragen, nimmt Termine an und übergibt an Ihr Team.'], en: ['Website & WhatsApp chatbot', 'Answers questions, books appointments and hands over to your team.'], ru: ['Чат-бот для сайта и WhatsApp', 'Отвечает, записывает и передаёт команде.'] },
      { i: 'mail', de: ['E-Mail-Autopilot', 'Sortiert, priorisiert und entwirft Antworten auf eingehende Mails.'], en: ['E-mail autopilot', 'Sorts, prioritises and drafts replies to incoming mail.'], ru: ['Автопилот почты', 'Сортирует, расставляет приоритеты и пишет черновики.'] },
      { i: 'layers', de: ['Dokumenten-KI', 'Liest Rechnungen, Verträge und Formulare und überträgt Daten automatisch.'], en: ['Document AI', 'Reads invoices, contracts and forms and transfers data automatically.'], ru: ['ИИ для документов', 'Читает счета, договоры и формы и переносит данные.'] },
      { i: 'spark', de: ['Content-Studio', 'Texte, Bilder und Posts in Ihrer Markenstimme – mit KI-Kennzeichnung.'], en: ['Content studio', 'Copy, images and posts in your brand voice – with AI labelling.'], ru: ['Контент-студия', 'Тексты, изображения и посты в стиле бренда – с маркировкой ИИ.'] },
      { i: 'marketing', de: ['Prognosen & Analysen', 'Umsatz, Nachfrage und Kampagnen vorhersagen statt raten.'], en: ['Forecasts & analytics', 'Predict revenue, demand and campaigns instead of guessing.'], ru: ['Прогнозы и аналитика', 'Прогнозируйте выручку и спрос вместо догадок.'] },
      { i: 'it', de: ['Interne Wissensdatenbank', 'Ihr Team fragt, die KI antwortet aus Ihren eigenen Unterlagen.'], en: ['Internal knowledge base', 'Your team asks, the AI answers from your own documents.'], ru: ['Внутренняя база знаний', 'Команда спрашивает – ИИ отвечает по вашим документам.'] },
      { i: 'phone', de: ['Telefon-Assistent', 'Nimmt Anrufe an, beantwortet Standardfragen und leitet weiter.'], en: ['Phone assistant', 'Takes calls, answers standard questions and forwards.'], ru: ['Телефонный ассистент', 'Принимает звонки и отвечает на типовые вопросы.'] },
      { i: 'development', de: ['Workflow-Automatisierung', 'Verbindet CRM, Shop, Buchhaltung und Mail zu einem Ablauf.'], en: ['Workflow automation', 'Connects CRM, shop, accounting and mail into one flow.'], ru: ['Автоматизация процессов', 'Связывает CRM, магазин, бухгалтерию и почту.'] }
    ]
  },
  trust: {
    eyebrow: { de: 'Verantwortungsvolle KI', en: 'Responsible AI', ru: 'Ответственный ИИ' },
    title: { de: 'KI nach europäischen Regeln.', en: 'AI by European rules.', ru: 'ИИ по европейским правилам.' },
    items: {
      de: [['Transparenz', 'Nutzer erfahren immer, wann sie mit KI sprechen (Art. 50 KI-VO).'], ['Mensch entscheidet', 'Wichtige Aktionen werden von Ihrem Team freigegeben.'], ['DSGVO & AVV', 'Datensparsam, mit Auftragsverarbeitungsvertrag und EU-Hosting-Optionen.'], ['Keine Trainingsnutzung', 'Ihre Daten trainieren keine fremden Modelle.']],
      en: [['Transparency', 'Users always know when they are talking to AI (Art. 50 AI Act).'], ['Humans decide', 'Important actions are approved by your team.'], ['GDPR & DPA', 'Data-minimal, with a data processing agreement and EU hosting options.'], ['No training on your data', 'Your data never trains third-party models.']],
      ru: [['Прозрачность', 'Пользователь всегда знает, что общается с ИИ (ст. 50).'], ['Решает человек', 'Важные действия подтверждает ваша команда.'], ['GDPR и DPA', 'Минимум данных, договор обработки и хостинг в ЕС.'], ['Без обучения на ваших данных', 'Ваши данные не обучают чужие модели.']]
    }
  }
};

/* ---------------- Transparency notice ---------------- */
function notice() {
  return h('div', { class: 'container' },
    h('aside', { class: 'ai-notice', role: 'note', 'data-reveal': '' },
      h('span', { class: 'ai-notice__icon' }, icon('shield', 22)),
      h('div', {}, h('strong', {}, L(T.notice.title)), h('p', {}, L(T.notice.text)))));
}

/* ---------------- 1. Assistant ---------------- */
function assistant() {
  const chat = chatLog();
  const input = h('input', { type: 'text', class: 'chat__input', maxlength: '300', placeholder: L(T.chat.placeholder), 'aria-label': L(T.chat.placeholder), autocomplete: 'off' });
  const form = h('form', { class: 'chat__form' }, input, h('button', { type: 'submit', class: 'chat__send', 'aria-label': L(T.chat.send) }, icon('arrow', 18)));
  const quick = h('div', { class: 'chat__quick' });
  let busy = false, started = false;

  const intent = (q) => {
    const s = norm(q);
    if (/preis|kost|price|cost|budget|euro|€|сколько|цен|стоим/.test(s)) return 'price';
    if (/ablauf|prozess|process|schritt|step|work|процесс|этап|проходит/.test(s)) return 'process';
    if (/dsgvo|gdpr|datenschutz|privacy|cookie|legal|recht|защит|данн/.test(s)) return 'privacy';
    if (/tool|ki|ai|bot|automat|инструмент|ии|бот/.test(s)) return 'tools';
    if (/dauer|lange|wann|time|long|week|срок|долго|недел/.test(s)) return 'time';
    if (/kontakt|contact|erreich|mail|telefon|связ|контакт/.test(s)) return 'contact';
    if (/^(hi|hallo|hello|hey|moin|servus|привет|здравств)/.test(s)) return 'hello';
    return 'fallback';
  };
  async function ask(q) {
    if (busy || !q.trim()) return;
    busy = true;
    chat.user(q);
    await chat.bot(L(T.chat.answers[intent(q)]), { label: L(T.chat.name) + ' · ' + L(T.chat.label), typing: 900 });
    busy = false;
  }
  L(T.chat.chips).forEach((c) => { const b = h('button', { type: 'button', class: 'chip' }, c); b.addEventListener('click', () => ask(c)); quick.append(b); });
  form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, 300); input.value = ''; ask(v); });

  const box = h('div', { class: 'assistant', 'data-reveal': '' },
    h('div', { class: 'assistant__orb', 'aria-hidden': 'true' }, h('span'), h('span'), h('span')),
    h('div', { class: 'assistant__chat' },
      h('div', { class: 'chat__head' },
        h('span', { class: 'chat__avatar' }, icon('ai', 18)),
        h('span', {}, h('b', {}, L(T.chat.name), ' ', h('span', { class: 'ai-tag' }, L(T.chat.label))), h('small', {}, h('i', { class: 'online' }), 'online'))),
      chat.el, quick, form,
      h('p', { class: 'chat__privacy' }, L(T.chat.privacy))));
  onVisible(box, () => { if (!started) { started = true; chat.bot(L(T.chat.hello), { label: L(T.chat.name) + ' · ' + L(T.chat.label) }); } });
  return section({ id: 'demo-assistant', eyebrow: L(T.chat.eyebrow), title: L(T.chat.title), text: L(T.chat.text), badge: L(T.demo) }, box);
}

/* ---------------- 2. Auto-reply inbox ---------------- */
const MAILS = [
  { from: 'Sarah K.', ch: 'Instagram', lang: 'DE', intent: { de: 'Preisanfrage', en: 'Price request', ru: 'Запрос цены' }, mood: 1, prio: 2,
    msg: { de: 'Hi! Wie viel kostet das große Duftkerzen-Set? 😍', en: 'Hi! How much is the large scented candle set? 😍', ru: 'Привет! Сколько стоит большой набор свечей? 😍' },
    reply: { de: 'Hallo Sarah, danke für Ihr Interesse! 😊 Das große Set kostet 49 € inkl. MwSt., ab 50 € versenden wir kostenlos. Hier geht’s direkt zum Shop: luma-home.de/set – viel Freude damit!', en: 'Hi Sarah, thanks for your interest! 😊 The large set is €49 incl. VAT, and shipping is free from €50. Here is the direct link: luma-home.de/set – enjoy!', ru: 'Здравствуйте, Сара! Спасибо за интерес 😊 Большой набор стоит 49 € с НДС, доставка бесплатна от 50 €. Ссылка: luma-home.de/set' } },
  { from: 'Thomas B.', ch: 'E-Mail', lang: 'DE', intent: { de: 'Reklamation', en: 'Complaint', ru: 'Жалоба' }, mood: -1, prio: 3,
    msg: { de: 'Meine Lieferung ist seit 5 Tagen überfällig. Das ist echt ärgerlich.', en: 'My delivery is 5 days overdue. This is really annoying.', ru: 'Моя доставка задерживается уже 5 дней. Это очень неприятно.' },
    reply: { de: 'Hallo Thomas, das tut uns sehr leid! Ich habe Ihre Sendung geprüft: Sie liegt im Paketzentrum und wird morgen zugestellt. Als Entschuldigung erhalten Sie 10 % auf Ihre nächste Bestellung.', en: 'Hi Thomas, we are very sorry! I checked your parcel: it is at the depot and will be delivered tomorrow. As an apology you get 10% off your next order.', ru: 'Здравствуйте, Томас, нам очень жаль! Посылка на складе и будет доставлена завтра. В качестве извинения – скидка 10 % на следующий заказ.' } },
  { from: 'Elena V.', ch: 'WhatsApp', lang: 'EN', intent: { de: 'Terminanfrage', en: 'Appointment', ru: 'Запись' }, mood: 1, prio: 1,
    msg: { de: 'Can I book a consultation next Tuesday afternoon?', en: 'Can I book a consultation next Tuesday afternoon?', ru: 'Can I book a consultation next Tuesday afternoon?' },
    reply: { de: 'Hi Elena, of course! Tuesday at 2 pm or 4 pm is available. Just reply with your preferred time and we will send you a calendar invitation.', en: 'Hi Elena, of course! Tuesday at 2 pm or 4 pm is available. Just reply with your preferred time and we will send you a calendar invitation.', ru: 'Hi Elena, of course! Tuesday at 2 pm or 4 pm is available. Just reply with your preferred time and we will send you a calendar invitation.' } },
  { from: 'Igor P.', ch: 'E-Mail', lang: 'RU', intent: { de: 'Produktfrage', en: 'Product question', ru: 'Вопрос о товаре' }, mood: 0, prio: 1,
    msg: { de: 'Здравствуйте, свечи из натурального воска?', en: 'Здравствуйте, свечи из натурального воска?', ru: 'Здравствуйте, свечи из натурального воска?' },
    reply: { de: 'Здравствуйте, Игорь! Да, все наши свечи из 100 % соевого воска с хлопковым фитилём. Время горения – около 40 часов.', en: 'Здравствуйте, Игорь! Да, все наши свечи из 100 % соевого воска с хлопковым фитилём. Время горения – около 40 часов.', ru: 'Здравствуйте, Игорь! Да, все наши свечи из 100 % соевого воска с хлопковым фитилём. Время горения – около 40 часов.' } }
];

function autoReply() {
  const moods = { 1: L(T.tools.pos), 0: L(T.tools.neutral), '-1': L(T.tools.neg) };
  const prios = ['', L({ de: 'Normal', en: 'Normal', ru: 'Обычный' }), L({ de: 'Hoch', en: 'High', ru: 'Высокий' }), L({ de: 'Dringend', en: 'Urgent', ru: 'Срочно' })];
  const detail = h('div', { class: 'inbox__detail' }, h('p', { class: 'muted inbox__empty' }, L(T.reply.pick)));
  const list = h('ul', { class: 'inbox__list' });
  let active = null, running = false;

  async function open(m, li) {
    if (running) return;
    active?.classList.remove('is-active');
    li.classList.add('is-active'); active = li;
    const tags = h('div', { class: 'inbox__tags' });
    const draft = h('p', { class: 'inbox__draft' });
    const go = h('button', { type: 'button', class: 'btn btn--primary btn--sm' }, L(T.reply.analyse));
    const approve = h('button', { type: 'button', class: 'btn btn--ghost btn--sm', hidden: true }, L(T.reply.approve));
    const scan = h('div', { class: 'inbox__scan', 'aria-hidden': 'true' });
    detail.replaceChildren(
      h('div', { class: 'inbox__msg' }, h('b', {}, m.from + ' · ' + m.ch), h('p', {}, L(m.msg)), scan),
      tags,
      h('div', { class: 'inbox__draftbox' }, h('span', { class: 'ai-tag' }, L(T.reply.draft)), draft),
      h('div', { class: 'inbox__actions' }, go, approve));
    go.addEventListener('click', async () => {
      running = true; go.disabled = true;
      scan.classList.add('on');
      await sleep(reduced ? 0 : 900);
      scan.classList.remove('on');
      const add = (k, v, c) => { tags.append(h('span', { class: 'tag tag--' + c }, h('small', {}, k), v)); };
      add(L(T.reply.intent), L(m.intent), 'v'); await sleep(180);
      add(L(T.reply.mood), moods[m.mood], m.mood > 0 ? 'g' : m.mood < 0 ? 'r' : 'n'); await sleep(180);
      add(L(T.reply.prio), prios[m.prio], m.prio > 2 ? 'r' : 'c'); await sleep(180);
      add(L(T.reply.lang), m.lang, 'c');
      await typeInto(draft, L(m.reply), 12);
      go.hidden = true; approve.hidden = false; running = false;
    });
    approve.addEventListener('click', () => {
      approve.disabled = true; approve.textContent = L(T.reply.sent);
      li.classList.add('is-done');
    });
  }

  MAILS.forEach((m, i) => {
    const li = h('li', {},
      h('button', { type: 'button', class: 'inbox__item' },
        h('span', { class: 'inbox__ch inbox__ch--' + i }, m.ch.slice(0, 2)),
        h('span', { class: 'inbox__body' }, h('b', {}, m.from), h('small', {}, L(m.msg))),
        h('span', { class: 'inbox__dot', 'aria-hidden': 'true' })));
    li.firstChild.addEventListener('click', () => open(m, li));
    list.append(li);
  });

  const box = h('div', { class: 'inbox', 'data-reveal': '' }, list, detail);
  onVisible(box, () => { if (!active) open(MAILS[0], list.firstChild); });
  return section({ id: 'demo-autoreply', eyebrow: L(T.reply.eyebrow), title: L(T.reply.title), text: L(T.reply.text), badge: L(T.demo) }, box);
}

/* ---------------- 3. Marketing tools ---------------- */
function leadFilter() {
  const leads = [['Müller GmbH', 'Website + Shop', 92], ['Studio Nova', 'Branding', 81], ['Bäckerei Klein', 'Social Ads', 74], ['Kanzlei Roth', 'Website', 66], ['FitBox Köln', 'App', 58], ['Café Mira', 'Instagram', 47], ['A. Schulz', 'Newsletter', 33], ['Test-Anfrage', '—', 12]];
  const out = h('ul', { class: 'leads' });
  const count = h('span', { class: 'leads__count' });
  const range = h('input', { type: 'range', min: '0', max: '100', value: '50', class: 'range', 'aria-label': L(T.tools.minScore) });
  const val = h('b', {}, '50');
  const draw = () => {
    const min = Number(range.value);
    val.textContent = String(min);
    out.replaceChildren(...leads.filter((l) => l[2] >= min).map(([n, need, s]) => h('li', { class: 'lead' },
      h('span', { class: 'lead__avatar' }, n.slice(0, 1)),
      h('span', { class: 'lead__body' }, h('b', {}, n), h('small', {}, need)),
      h('span', { class: 'lead__score' }, h('span', { class: 'lead__bar' }, h('i', { class: s > 75 ? 'hot' : s > 50 ? 'warm' : 'cold' })), h('b', {}, String(s))))));
    out.querySelectorAll('.lead__bar i').forEach((el, i) => el.style.setProperty('--w', leads.filter((l) => l[2] >= min)[i][2] + '%'));
    count.textContent = out.children.length + ' ' + L(T.tools.shown);
  };
  range.addEventListener('input', draw);
  draw();
  return h('div', { class: 'tool' }, h('label', { class: 'tool__row' }, L(T.tools.minScore), range, val), count, out);
}

function postGenerator() {
  const product = h('input', { type: 'text', maxlength: '80', value: L(T.tools.productDefault), class: 'tool__input', 'aria-label': L(T.tools.product) });
  const channel = h('select', { class: 'tool__input', 'aria-label': L(T.tools.channel) }, ...['Instagram', 'LinkedIn', 'TikTok', 'Facebook'].map((c) => h('option', {}, c)));
  const tones = L(T.tools.tones);
  const tone = h('select', { class: 'tool__input', 'aria-label': L(T.tools.tone) }, ...tones.map((c, i) => h('option', { value: String(i) }, c)));
  const btn = h('button', { type: 'button', class: 'btn btn--primary btn--sm' }, icon('spark', 16), L(T.tools.generate));
  const out = h('div', { class: 'post' });
  const lines = {
    de: [
      [['Endlich da: {p}! ✨', 'Mach es dir gemütlich mit {p}.'], ['Perfekt für lange Abende und kleine Auszeiten.', 'Mit Liebe gemacht – für dein Zuhause.'], ['Jetzt entdecken 👉 Link in Bio']],
      [['{p}. Neu interpretiert.', 'Die Kunst des Details: {p}.'], ['Ausgewählte Materialien, zeitlose Form.', 'Für Menschen, die das Besondere suchen.'], ['Ab sofort erhältlich.']],
      [['Achtung, Gemütlichkeits-Alarm! 🚨 {p}', 'Plot Twist: {p} 🕯️'], ['Sofa, Decke, Kerze – fertig ist der perfekte Abend.', 'Warnung: macht süchtig nach Wohlfühlen.'], ['Schnell sein lohnt sich! 🏃‍♀️']]
    ],
    en: [
      [['Finally here: {p}! ✨', 'Get cosy with {p}.'], ['Perfect for long evenings and little breaks.', 'Made with love – for your home.'], ['Discover now 👉 link in bio']],
      [['{p}. Reimagined.', 'The art of detail: {p}.'], ['Selected materials, timeless form.', 'For people who seek the exceptional.'], ['Available now.']],
      [['Cosiness alert! 🚨 {p}', 'Plot twist: {p} 🕯️'], ['Sofa, blanket, candle – perfect evening sorted.', 'Warning: highly addictive comfort.'], ['Be quick! 🏃‍♀️']]
    ],
    ru: [
      [['Уже здесь: {p}! ✨', 'Уют начинается с {p}.'], ['Идеально для долгих вечеров.', 'Сделано с любовью – для вашего дома.'], ['Смотрите 👉 ссылка в профиле']],
      [['{p}. Новый взгляд.', 'Искусство деталей: {p}.'], ['Отборные материалы, вечная форма.', 'Для тех, кто ищет особенное.'], ['Уже в продаже.']],
      [['Тревога уюта! 🚨 {p}', 'Неожиданно: {p} 🕯️'], ['Диван, плед, свеча – идеальный вечер.', 'Осторожно: вызывает привыкание к уюту.'], ['Успейте! 🏃‍♀️']]
    ]
  };
  let n = 0;
  async function gen() {
    btn.disabled = true;
    const p = product.value.replace(/[\u0000-\u001F\u007F<>]/g, '').trim().slice(0, 80) || L(T.tools.productDefault);
    const set = L(lines)[Number(tone.value)];
    const pick = (a) => a[n % a.length];
    const tags = ['#' + p.split(/\s+/)[0].replace(/[^\p{L}\p{N}]/gu, ''), '#homedecor', channel.value === 'LinkedIn' ? '#business' : '#cozy', '#design'];
    const text = [pick(set[0]).replace('{p}', p), pick(set[1]), pick(set[2]), '', tags.join(' ')].join('\n');
    n++;
    const body = h('p', { class: 'post__text' });
    out.replaceChildren(
      h('div', { class: 'post__head' }, h('span', { class: 'post__avatar' }, 'L'), h('b', {}, 'luma.home'), h('small', {}, channel.value), h('span', { class: 'ai-tag' }, L(T.tools.aiLabel))),
      h('div', { class: 'post__img', 'aria-hidden': 'true' }, h('span')),
      body);
    await typeInto(body, text, 14);
    btn.disabled = false;
  }
  btn.addEventListener('click', gen);
  gen();
  return h('div', { class: 'tool tool--split' },
    h('div', { class: 'tool__form' },
      h('label', {}, L(T.tools.product), product),
      h('div', { class: 'tool__row2' }, h('label', {}, L(T.tools.channel), channel), h('label', {}, L(T.tools.tone), tone)),
      btn),
    out);
}

function reviewAnalysis() {
  const area = h('textarea', { class: 'tool__input', rows: '4', maxlength: '600', 'aria-label': L(T.tools.review) });
  area.value = L(T.tools.reviewDefault);
  const btn = h('button', { type: 'button', class: 'btn btn--primary btn--sm' }, L(T.tools.analyse));
  const meter = h('div', { class: 'meter' }, h('span', { class: 'meter__fill' }), h('span', { class: 'meter__needle' }));
  const result = h('div', { class: 'review__result' });
  const POS = ['super', 'toll', 'gut', 'schnell', 'liebe', 'perfekt', 'great', 'good', 'fast', 'love', 'perfect', 'excellent', 'amazing', 'freundlich', 'friendly', 'qualitat', 'quality', 'отличн', 'хорош', 'быстр', 'люблю', 'прекрасн', 'качеств'];
  const NEG = ['leider', 'schlecht', 'kaputt', 'beschadigt', 'langsam', 'teuer', 'arger', 'bad', 'broken', 'damaged', 'slow', 'expensive', 'unfortunately', 'never', 'nie', 'плох', 'поврежд', 'медлен', 'дорог', 'к сожалению', 'сломан'];
  const TOPICS = [['versand|liefer|shipping|delivery|доставк', { de: 'Versand', en: 'Shipping', ru: 'Доставка' }], ['qualitat|quality|качеств', { de: 'Qualität', en: 'Quality', ru: 'Качество' }], ['verpack|packag|упаков', { de: 'Verpackung', en: 'Packaging', ru: 'Упаковка' }], ['preis|price|teuer|expensive|цен|дорог', { de: 'Preis', en: 'Price', ru: 'Цена' }], ['service|support|freundlich|friendly|сервис', { de: 'Service', en: 'Service', ru: 'Сервис' }]];
  function run() {
    const s = norm(area.value).slice(0, 600);
    const p = POS.filter((w) => s.includes(w)).length, n = NEG.filter((w) => s.includes(w)).length;
    const score = p + n ? (p - n) / (p + n) : 0;
    const pct = Math.round((score + 1) * 50);
    meter.style.setProperty('--p', pct + '%');
    const label = score > 0.2 ? L(T.tools.pos) : score < -0.2 ? L(T.tools.neg) : L(T.tools.neutral);
    const topics = TOPICS.filter(([re]) => new RegExp(re).test(s)).map(([, l]) => L(l));
    const tip = n
      ? L({ de: 'Kritikpunkt freundlich aufgreifen und Lösung anbieten – Lob zum Abschluss bestätigen.', en: 'Address the criticism kindly and offer a fix – then acknowledge the praise.', ru: 'Вежливо ответить на критику и предложить решение, затем поблагодарить за похвалу.' })
      : L({ de: 'Bedanken und um Weiterempfehlung bitten – ideal für ein Testimonial.', en: 'Say thanks and ask for a referral – ideal for a testimonial.', ru: 'Поблагодарить и попросить рекомендацию – отличный отзыв для сайта.' });
    result.replaceChildren(
      h('p', { class: 'review__score' }, h('b', {}, label), ' · ' + pct + ' / 100'),
      h('p', { class: 'panel__title' }, L(T.tools.found)),
      h('div', { class: 'inbox__tags' }, ...(topics.length ? topics : ['—']).map((t) => h('span', { class: 'tag tag--c' }, t))),
      h('p', { class: 'panel__title' }, L(T.tools.suggestion)),
      h('p', { class: 'review__tip' }, tip));
  }
  btn.addEventListener('click', run);
  run();
  return h('div', { class: 'tool tool--split' },
    h('div', { class: 'tool__form' }, h('label', {}, L(T.tools.review), area), btn),
    h('div', {}, meter, h('div', { class: 'meter__labels' }, h('span', {}, L(T.tools.neg)), h('span', {}, L(T.tools.pos))), result));
}

function marketingTools() {
  const names = L(T.tools.tabs);
  const panels = [leadFilter(), postGenerator(), reviewAnalysis()];
  const tabs = h('div', { class: 'tabs', role: 'tablist' });
  const stage = h('div', { class: 'tabs__stage' });
  names.forEach((n, i) => {
    const b = h('button', { type: 'button', role: 'tab', class: 'tabs__btn', id: 'tool-tab-' + i, 'aria-selected': String(i === 0), 'aria-controls': 'tool-panel-' + i }, n);
    const p = h('div', { role: 'tabpanel', id: 'tool-panel-' + i, 'aria-labelledby': 'tool-tab-' + i, hidden: i !== 0 }, panels[i]);
    b.addEventListener('click', () => {
      [...tabs.children].forEach((x, k) => x.setAttribute('aria-selected', String(k === i)));
      [...stage.children].forEach((x, k) => { x.hidden = k !== i; });
    });
    tabs.append(b); stage.append(p);
  });
  return section({ id: 'demo-tools', eyebrow: L(T.tools.eyebrow), title: L(T.tools.title), text: L(T.tools.text), badge: L(T.demo) },
    h('div', { class: 'toolbox', 'data-reveal': '' }, tabs, stage));
}

/* ---------------- 4. AI coding ---------------- */
const SNIPPETS = [
  { re: /mail|e-mail|валид|почт|valid/, code: {
    javascript: `// Prüft, ob eine E-Mail-Adresse formal gültig ist
function isValidEmail(email) {
  const pattern = /^[^\\s@]+@[^\\s@]+\\.[a-z]{2,}$/i;
  return pattern.test(String(email).trim());
}

console.log(isValidEmail('hallo@tmx.de')); // true
console.log(isValidEmail('kein-at.de'));   // false`,
    python: `import re

# Prüft, ob eine E-Mail-Adresse formal gültig ist
PATTERN = re.compile(r"^[^\\s@]+@[^\\s@]+\\.[a-z]{2,}$", re.IGNORECASE)

def is_valid_email(email: str) -> bool:
    return bool(PATTERN.match(email.strip()))

print(is_valid_email("hallo@tmx.de"))  # True
print(is_valid_email("kein-at.de"))    # False` } },
  { re: /api|fetch|request|laden|load|загруз|данн/, code: {
    javascript: `// Lädt Daten von einer API – mit Timeout und Fehlerbehandlung
async function loadProducts() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch('/api/products', { signal: controller.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.error('Laden fehlgeschlagen:', err.message);
    return [];
  } finally {
    clearTimeout(timer);
  }
}`,
    python: `import requests

def load_products():
    """Lädt Produkte von einer API – mit Timeout und Fehlerbehandlung."""
    try:
        res = requests.get("https://api.example.com/products", timeout=8)
        res.raise_for_status()
        return res.json()
    except requests.RequestException as err:
        print("Laden fehlgeschlagen:", err)
        return []` } },
  { re: /countdown|timer|таймер|отсчет|uhr/, code: {
    javascript: `// Countdown bis zu einem Datum, aktualisiert jede Sekunde
function startCountdown(target, el) {
  const tick = () => {
    const ms = Math.max(0, new Date(target) - Date.now());
    const d = Math.floor(ms / 864e5);
    const h = Math.floor(ms / 36e5) % 24;
    const m = Math.floor(ms / 6e4) % 60;
    const s = Math.floor(ms / 1e3) % 60;
    el.textContent = \`\${d}T \${h}h \${m}m \${s}s\`;
    if (ms > 0) setTimeout(tick, 1000);
  };
  tick();
}

startCountdown('2026-12-24T18:00:00', document.querySelector('#countdown'));` } },
  { re: /sql|kunde|customer|клиент|top|umsatz|revenue/, code: {
    sql: `-- Die 10 umsatzstärksten Kunden der letzten 12 Monate
SELECT c.id,
       c.name,
       COUNT(o.id)        AS bestellungen,
       SUM(o.total_eur)   AS umsatz
FROM customers c
JOIN orders o ON o.customer_id = c.id
WHERE o.created_at >= CURRENT_DATE - INTERVAL '12 months'
  AND o.status = 'paid'
GROUP BY c.id, c.name
ORDER BY umsatz DESC
LIMIT 10;` } },
  { re: /csv|excel|tabelle|таблиц|auswert|analy/, code: {
    python: `import csv
from collections import defaultdict

# Summiert den Umsatz pro Monat aus einer CSV-Datei
def revenue_per_month(path):
    totals = defaultdict(float)
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            month = row["date"][:7]          # z. B. "2026-10"
            totals[month] += float(row["amount"])
    return dict(sorted(totals.items()))

for month, total in revenue_per_month("orders.csv").items():
    print(f"{month}: {total:,.2f} €")` } },
  { re: /form|formular|html|контакт|форм/, code: {
    html: `<!-- Barrierearmes Kontaktformular -->
<form class="contact" action="/kontakt" method="post">
  <label for="name">Name *</label>
  <input id="name" name="name" required autocomplete="name">

  <label for="email">E-Mail *</label>
  <input id="email" name="email" type="email" required autocomplete="email">

  <label for="msg">Nachricht *</label>
  <textarea id="msg" name="message" rows="5" required></textarea>

  <label class="consent">
    <input type="checkbox" required>
    Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> gelesen.
  </label>

  <button type="submit">Nachricht senden</button>
</form>` } },
  { re: /sort|sortier|сортир/, code: {
    javascript: `// Sortiert Produkte nach Preis (aufsteigend) und dann nach Name
const products = [
  { name: 'Vase', price: 39 },
  { name: 'Lampe', price: 129 },
  { name: 'Tasse', price: 19 },
];

const sorted = [...products].sort(
  (a, b) => a.price - b.price || a.name.localeCompare(b.name, 'de')
);
console.table(sorted);`,
    python: `products = [
    {"name": "Vase", "price": 39},
    {"name": "Lampe", "price": 129},
    {"name": "Tasse", "price": 19},
]

# Nach Preis, dann nach Name sortieren
for p in sorted(products, key=lambda p: (p["price"], p["name"])):
    print(f'{p["name"]:<8} {p["price"]:>6} €')` } }
];

function fallbackSnippet(task, lang) {
  const name = (norm(task).match(/[a-z]+/g) || ['task']).slice(0, 3).map((w, i) => (i ? w[0].toUpperCase() + w.slice(1) : w)).join('') || 'task';
  if (lang === 'python') return `def ${name.replace(/[A-Z]/g, (m) => '_' + m.toLowerCase())}(data):\n    """${task}"""\n    # 1. Eingaben prüfen\n    if not data:\n        raise ValueError("Keine Daten übergeben")\n    # 2. Verarbeiten\n    result = [item for item in data]\n    # 3. Ergebnis zurückgeben\n    return result`;
  if (lang === 'sql') return `-- ${task}\nSELECT *\nFROM your_table\nWHERE created_at >= CURRENT_DATE - INTERVAL '30 days'\nORDER BY created_at DESC;`;
  if (lang === 'html') return `<!-- ${task} -->\n<section class="block">\n  <h2>Titel</h2>\n  <p>Inhalt</p>\n</section>`;
  return `/**\n * ${task}\n */\nfunction ${name}(input) {\n  if (input == null) throw new Error('Eingabe fehlt');\n  // Logik hier umsetzen\n  return input;\n}`;
}

const KW = {
  javascript: /\b(const|let|var|function|return|if|else|for|while|async|await|try|catch|finally|new|throw|class|import|from|export|of|in|true|false|null|undefined)\b/,
  python: /\b(def|return|if|elif|else|for|while|in|import|from|as|with|try|except|raise|class|True|False|None|and|or|not|lambda)\b/,
  sql: /\b(SELECT|FROM|WHERE|JOIN|ON|GROUP|BY|ORDER|LIMIT|AND|OR|AS|COUNT|SUM|DESC|ASC|INTERVAL|INSERT|UPDATE|DELETE|INTO|VALUES)\b/i,
  html: /<\/?[a-z]+|\/?>/i
};

// Very small highlighter: builds spans with textContent only.
function highlight(code, lang) {
  const frag = document.createDocumentFragment();
  const re = lang === 'html'
    ? /(<!--[\s\S]*?-->)|("[^"]*")|(<\/?[a-z][\w-]*|\/?>)|([\w-]+(?==))/gi
    : /(\/\/[^\n]*|#[^\n]*|--[^\n]*|\/\*[\s\S]*?\*\/|"""[\s\S]*?""")|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?(?:e\d+)?\b)|(\b[A-Za-z_]\w*\b)/g;
  let last = 0, m;
  while ((m = re.exec(code))) {
    if (m.index > last) frag.append(code.slice(last, m.index));
    let cls = '';
    if (m[1]) cls = 'c';
    else if (m[2]) cls = 's';
    else if (m[3]) cls = lang === 'html' ? 'k' : 'n';
    else if (m[4]) cls = lang === 'html' ? 'a' : (KW[lang] && KW[lang].test(m[4]) && m[4].length > 1 ? 'k' : (code[re.lastIndex] === '(' ? 'f' : ''));
    frag.append(cls ? h('span', { class: 'tok-' + cls }, m[0]) : m[0]);
    last = re.lastIndex;
  }
  frag.append(code.slice(last));
  return frag;
}

function detectLang(code) {
  if (/<\/?[a-z][\s\S]*>/i.test(code) && !/\bfunction\b|\bdef\b/.test(code)) return 'html';
  if (/\bSELECT\b[\s\S]*\bFROM\b/i.test(code)) return 'sql';
  if (/\bdef\s+\w+\(|^\s*import \w+$|:\s*\n\s+/m.test(code) && !/[{};]\s*$/m.test(code)) return 'python';
  return 'javascript';
}

function reviewCode(code) {
  const lang = detectLang(code);
  const lines = code.split('\n');
  const fns = (code.match(/\bfunction\s+(\w+)|\bdef\s+(\w+)|(?:const|let)\s+(\w+)\s*=\s*(?:async\s*)?\(/g) || []).length;
  const loops = (code.match(/\b(for|while|forEach|map)\b/g) || []).length;
  const conds = (code.match(/\b(if|elif|else if|switch|case|WHERE)\b/g) || []).length;
  const ix = (de, en, ru) => L({ de, en, ru });
  const issues = [];
  if (lang === 'javascript') {
    if (/\bvar\s/.test(code)) issues.push(ix('„var“ durch „let“/„const“ ersetzen.', 'Replace “var” with “let”/“const”.', 'Заменить «var» на «let»/«const».'));
    if (/[^=!]==[^=]/.test(code)) issues.push(ix('„===“ statt „==“ verwenden (strikter Vergleich).', 'Use “===” instead of “==” (strict comparison).', 'Использовать «===» вместо «==».'));
    if (/\beval\s*\(/.test(code)) issues.push(ix('„eval“ ist ein Sicherheitsrisiko – vermeiden.', '“eval” is a security risk – avoid it.', '«eval» – угроза безопасности.'));
    if (/innerHTML\s*=/.test(code)) issues.push(ix('„innerHTML“ kann XSS ermöglichen – besser „textContent“.', '“innerHTML” can enable XSS – prefer “textContent”.', '«innerHTML» может привести к XSS – лучше «textContent».'));
    if (/\bfetch\(/.test(code) && !/catch|try/.test(code)) issues.push(ix('Fehlerbehandlung für „fetch“ ergänzen.', 'Add error handling for “fetch”.', 'Добавить обработку ошибок для «fetch».'));
    if (/console\.log/.test(code)) issues.push(ix('„console.log“ vor dem Livegang entfernen.', 'Remove “console.log” before going live.', 'Удалить «console.log» перед запуском.'));
  }
  if (lang === 'python') {
    if (/except\s*:/.test(code)) issues.push(ix('Nacktes „except:“ – konkrete Ausnahme angeben.', 'Bare “except:” – catch a specific exception.', 'Голый «except:» – укажите конкретное исключение.'));
    if (/open\(/.test(code) && !/with\s+open/.test(code)) issues.push(ix('Dateien mit „with open(...)“ öffnen.', 'Open files with “with open(...)”.', 'Открывать файлы через «with open(...)».'));
    if (/requests\.(get|post)\([^)]*\)/.test(code) && !/timeout/.test(code)) issues.push(ix('„timeout“ für Requests setzen.', 'Set a “timeout” for requests.', 'Указать «timeout» для запросов.'));
  }
  if (lang === 'sql') {
    if (/SELECT\s+\*/i.test(code)) issues.push(ix('„SELECT *“ vermeiden – nur benötigte Spalten abfragen.', 'Avoid “SELECT *” – select only needed columns.', 'Избегать «SELECT *».'));
    if (/\b(DELETE|UPDATE)\b/i.test(code) && !/\bWHERE\b/i.test(code)) issues.push(ix('DELETE/UPDATE ohne WHERE betrifft alle Zeilen!', 'DELETE/UPDATE without WHERE affects all rows!', 'DELETE/UPDATE без WHERE затронет все строки!'));
    if (/['"]\s*\+\s*\w+|\$\{/.test(code)) issues.push(ix('Parameter statt String-Verkettung (SQL-Injection).', 'Use parameters instead of string concatenation (SQL injection).', 'Параметры вместо конкатенации (SQL-инъекции).'));
  }
  if (lang === 'html') {
    if (/<img(?![^>]*\balt=)/i.test(code)) issues.push(ix('Bilder brauchen ein „alt“-Attribut (Barrierefreiheit).', 'Images need an “alt” attribute (accessibility).', 'Изображениям нужен атрибут «alt».'));
    if (/<input(?![^>]*\bid=)/i.test(code)) issues.push(ix('Eingabefelder mit „label“ verknüpfen.', 'Link inputs with a “label”.', 'Связать поля ввода с «label».'));
    if (/<script[^>]*>[^<]+/i.test(code)) issues.push(ix('Inline-Skripte erschweren eine strenge CSP.', 'Inline scripts make a strict CSP harder.', 'Встроенные скрипты мешают строгой CSP.'));
  }
  return {
    lang,
    structure: ix(
      `${lines.length} Zeilen · ${fns} Funktion(en) · ${loops} Schleife(n) · ${conds} Bedingung(en)`,
      `${lines.length} lines · ${fns} function(s) · ${loops} loop(s) · ${conds} condition(s)`,
      `${lines.length} строк · ${fns} функц. · ${loops} цикл. · ${conds} условий`),
    issues
  };
}

function aiCoding() {
  const langs = [['javascript', 'JavaScript'], ['python', 'Python'], ['sql', 'SQL'], ['html', 'HTML']];
  let mode = 0;
  const modeBtns = L(T.code.modes).map((m, i) => h('button', { type: 'button', class: 'seg__btn', 'aria-pressed': String(i === 0) }, m));
  const seg = h('div', { class: 'seg', role: 'group' }, ...modeBtns);
  const prompt = h('textarea', { class: 'code__prompt', rows: '3', maxlength: '400', 'aria-label': L(T.code.promptLabel) });
  prompt.value = L(T.code.promptDefault);
  const select = h('select', { class: 'tool__input code__lang', 'aria-label': L(T.code.language) }, ...langs.map(([v, n]) => h('option', { value: v }, n)));
  const run = h('button', { type: 'button', class: 'btn btn--primary btn--sm' }, icon('spark', 16), L(T.code.run));
  const ideas = h('div', { class: 'code__ideas' }, h('small', {}, L(T.code.ideas) + ':'),
    ...L(T.code.ideaList).map((t) => { const b = h('button', { type: 'button', class: 'chip' }, t); b.addEventListener('click', () => { setMode(0); prompt.value = t; go(); }); return b; }));
  const pre = h('pre', { class: 'code__out', tabindex: '0' }, h('code'));
  const copy = h('button', { type: 'button', class: 'code__copy' }, L(T.code.copy));
  const fileName = h('span', { class: 'code__file' }, 'snippet.js');
  const reviewBox = h('div', { class: 'code__review', hidden: true });
  let current = '';

  function setMode(i) {
    mode = i;
    modeBtns.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
    prompt.setAttribute('aria-label', i ? L(T.code.codeLabel) : L(T.code.promptLabel));
    prompt.rows = i ? 8 : 3;
    if (i && !/[{}();=<>]/.test(prompt.value)) prompt.value = 'function total(items) {\n  var sum = 0;\n  for (var i = 0; i < items.length; i++) {\n    if (items[i].price == null) continue;\n    sum += items[i].price;\n  }\n  document.getElementById("out").innerHTML = sum;\n  return sum;\n}';
    if (!i && /[{}();=<>]/.test(prompt.value)) prompt.value = L(T.code.promptDefault);
    select.hidden = !!i; ideas.hidden = !!i;
  }
  modeBtns.forEach((b, i) => b.addEventListener('click', () => setMode(i)));

  async function go() {
    run.disabled = true;
    const input = prompt.value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, mode ? 4000 : 400);
    const out = pre.firstChild;
    if (mode === 0) {
      reviewBox.hidden = true;
      const want = select.value;
      const s = norm(input);
      const hit = SNIPPETS.find((x) => x.re.test(s));
      let lang = want, code;
      if (hit) { if (!hit.code[want]) lang = Object.keys(hit.code)[0]; code = hit.code[lang]; } else code = fallbackSnippet(input.trim() || 'Aufgabe', want);
      select.value = lang;
      fileName.textContent = 'snippet.' + { javascript: 'js', python: 'py', sql: 'sql', html: 'html' }[lang];
      current = code;
      out.replaceChildren();
      const step = Math.max(2, Math.round(code.length / 140));
      for (let i = 0; i <= code.length; i += step) {
        out.replaceChildren(highlight(code.slice(0, i), lang));
        if (!reduced) await sleep(12);
      }
      out.replaceChildren(highlight(code, lang));
    } else {
      const r = reviewCode(input);
      current = input;
      fileName.textContent = 'review.' + { javascript: 'js', python: 'py', sql: 'sql', html: 'html' }[r.lang];
      out.replaceChildren(highlight(input, r.lang));
      reviewBox.hidden = false;
      reviewBox.replaceChildren(
        h('p', { class: 'panel__title' }, L(T.code.review) + ' · ', h('span', { class: 'ai-tag' }, 'AI')),
        h('p', {}, h('b', {}, L(T.code.detected) + ': '), r.lang.toUpperCase()),
        h('p', {}, h('b', {}, L(T.code.structure) + ': '), r.structure),
        h('p', {}, h('b', {}, L(T.code.issues) + ':')),
        r.issues.length ? h('ul', { class: 'code__issues' }, ...r.issues.map((x) => h('li', {}, x))) : h('p', { class: 'muted' }, L(T.code.noIssues)));
    }
    run.disabled = false;
  }
  run.addEventListener('click', go);
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(current); copy.textContent = L(T.code.copied); setTimeout(() => { copy.textContent = L(T.code.copy); }, 1400); } catch (_) { /* clipboard blocked */ }
  });

  const box = h('div', { class: 'coder', 'data-reveal': '' },
    h('div', { class: 'coder__input' }, seg, prompt, h('div', { class: 'coder__bar' }, select, run), ideas, reviewBox, h('p', { class: 'chat__privacy' }, L(T.code.note))),
    h('div', { class: 'coder__editor' },
      h('div', { class: 'coder__tabs' }, h('span', { class: 'browser__dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), fileName, copy),
      pre));
  let done = false;
  onVisible(box, () => { if (!done) { done = true; go(); } });
  return section({ id: 'demo-coding', eyebrow: L(T.code.eyebrow), title: L(T.code.title), text: L(T.code.text), badge: L(T.demo) }, box);
}

/* ---------------- 5. Tools grid + trust ---------------- */
function toolsGrid() {
  return section({ id: 'ai-solutions', eyebrow: L(T.grid.eyebrow), title: L(T.grid.title) },
    h('ul', { class: 'tool-grid' }, ...T.grid.items.map((it) => {
      const [title, text] = L(it);
      return h('li', { class: 'tool-card', 'data-reveal': '', 'data-tilt': '' },
        h('span', { class: 'tool-card__icon' }, icon(it.i, 22)), h('h3', {}, title), h('p', {}, text));
    })));
}

function trust() {
  return section({ id: 'ai-trust', eyebrow: L(T.trust.eyebrow), title: L(T.trust.title) },
    h('ul', { class: 'trust' }, ...L(T.trust.items).map(([a, b], i) => h('li', { class: 'trust__item', 'data-reveal': '' },
      h('span', { class: 'trust__num' }, '0' + (i + 1)), h('h3', {}, a), h('p', {}, b)))));
}

export function mount(container) {
  container.replaceChildren(notice(), assistant(), autoReply(), marketingTools(), aiCoding(), toolsGrid(), trust());
}
