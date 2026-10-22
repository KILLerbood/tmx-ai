// Page renderers. Each one builds the <main> content for its data-page value.
import { h, t, str, icon, content, settings, legal, getLang, safeUrl, safeImage, SERVICE_KEYS, SERVICE_PAGES } from './core.js';
import { socialLinks } from './layout.js';

const arr = (v) => (Array.isArray(v) ? v : []);

function splitWords(text, cls = '') {
  return str(text).split(/\s+/).filter(Boolean).map((w) =>
    h('span', { class: 'word ' + cls }, h('span', { class: 'word__inner' }, w)));
}

function heading({ eyebrow, title, accent, level = 'h2', id }) {
  return h('header', { class: 'section-head', 'data-reveal': '' },
    eyebrow ? h('p', { class: 'eyebrow' }, eyebrow) : null,
    h(level, { class: 'section-title', id },
      title, accent ? ' ' : null, accent ? h('span', { class: 'accent' }, accent) : null));
}

function button(label, href, variant = 'primary', withArrow = true) {
  return h('a', { class: 'btn btn--' + variant, href, 'data-magnetic': '' },
    h('span', { class: 'btn__label' }, label), withArrow ? icon('arrow', 18) : null);
}

/* ---------- Home ---------- */

function hero() {
  return h('section', { class: 'hero', id: 'hero', 'aria-labelledby': 'hero-title' },
    h('div', { class: 'container hero__inner' },
      h('p', { class: 'eyebrow hero__eyebrow' }, t('hero.eyebrow')),
      h('h1', { class: 'hero__title', id: 'hero-title' },
        h('span', { class: 'hero__line' }, ...splitWords(t('hero.title1'))),
        h('span', { class: 'hero__line hero__line--accent' }, ...splitWords(t('hero.title2')))),
      h('p', { class: 'hero__text' }, t('hero.text')),
      h('div', { class: 'hero__actions' },
        button(t('hero.cta'), 'kontakt.html'),
        button(t('hero.cta2'), '#services', 'ghost', false))),
    h('a', { class: 'scroll-cue', href: '#about' }, h('span', {}, t('hero.scroll')), h('span', { class: 'scroll-cue__line', 'aria-hidden': 'true' })));
}

function about() {
  return h('section', { class: 'section about', id: 'about', 'data-shape': 'about' },
    h('div', { class: 'container about__grid' },
      h('div', {},
        heading({ eyebrow: t('about.eyebrow'), title: t('about.title'), accent: t('about.titleAccent') }),
        h('div', { class: 'prose' }, ...arr(t('about.paragraphs')).map((p) => h('p', { 'data-reveal': '' }, p))),
        h('div', { 'data-reveal': '' }, button(t('about.cta'), 'kontakt.html', 'ghost'))),
      h('ul', { class: 'stats' },
        ...arr(t('about.stats')).map((s) => h('li', { class: 'stat', 'data-reveal': '' },
          h('span', { class: 'stat__value' }, s.value),
          h('span', { class: 'stat__label' }, s.label))))));
}

function serviceCard(key) {
  const s = t('services.' + key) || {};
  return h('li', { class: 'svc-card', 'data-reveal': '', 'data-service': key, 'data-tilt': '' },
    h('a', { class: 'svc-card__link', href: SERVICE_PAGES[key] },
      h('span', { class: 'svc-card__glow', 'aria-hidden': 'true' }),
      h('span', { class: 'svc-card__top' },
        h('span', { class: 'svc-card__icon' }, icon(key, 26)),
        h('span', { class: 'svc-card__num' }, s.num)),
      h('span', { class: 'svc-card__title' }, s.title),
      h('span', { class: 'svc-card__tagline' }, s.tagline),
      h('span', { class: 'svc-card__more' }, t('servicesIntro.more'), icon('arrow', 16))));
}

function services() {
  return h('section', { class: 'section services', id: 'services', 'data-shape': 'services' },
    h('div', { class: 'container' },
      heading({ eyebrow: t('servicesIntro.eyebrow'), title: t('servicesIntro.title') }),
      h('p', { class: 'lead', 'data-reveal': '' }, t('servicesIntro.text')),
      h('ul', { class: 'svc-grid' }, ...SERVICE_KEYS.map(serviceCard))));
}

const JV = {
  de: { ask: 'Wie viel kostet das Set?', ans: '49 € inkl. MwSt. – hier bestellen →', ai: 'KI', growth: 'Wachstum' },
  en: { ask: 'How much is the set?', ans: '€49 incl. VAT – order here →', ai: 'AI', growth: 'Growth' },
  ru: { ask: 'Сколько стоит набор?', ans: '49 € с НДС – заказать здесь →', ai: 'ИИ', growth: 'Рост' }
};

function journeyVisual(i) {
  const x = JV[getLang()] || JV.de;
  const v = (cls, ...kids) => h('div', { class: 'jv jv--' + cls, 'aria-hidden': 'true' }, ...kids);
  switch (i) {
    case 0: return v('brief',
      h('div', { class: 'jv-card' },
        h('b', {}, 'Briefing · LUMA home'),
        ...[0, 1, 2, 3].map((k) => h('span', { class: 'jv-check' }, icon('check', 14), h('i', { class: 'w' + k })))),
      h('div', { class: 'jv-bubble' }, h('i'), h('i'), h('i')));
    case 1: return v('brand',
      h('div', { class: 'jv-logo' }, h('span', { class: 'jv-mark' }), 'LUMA'),
      h('div', { class: 'jv-swatches' }, h('i'), h('i'), h('i'), h('i')),
      h('div', { class: 'jv-type' }, h('b', {}, 'Aa'), h('span', {}, 'Space Grotesk · Inter')));
    case 2: return v('site',
      h('div', { class: 'jv-browser' },
        h('div', { class: 'jv-bar' }, h('i'), h('i'), h('i')),
        h('div', { class: 'jv-hero' }, h('span'), h('span'), h('em')),
        h('div', { class: 'jv-grid' }, h('i'), h('i'), h('i'))));
    case 3: return v('auto',
      ...['mail', 'layers', 'check'].map((n) => h('span', { class: 'jv-node' }, icon(n, 20))),
      h('span', { class: 'jv-wire' }, h('i'), h('i')));
    case 4: return v('ai',
      h('div', { class: 'jv-msg jv-msg--u' }, x.ask),
      h('div', { class: 'jv-msg' }, h('small', {}, x.ai), x.ans),
      h('div', { class: 'jv-msg jv-msg--typing' }, h('i'), h('i'), h('i')));
    default: return v('growth',
      h('div', { class: 'jv-bars' }, ...[18, 26, 34, 48, 62, 80, 100].map((p) => { const b = h('i'); b.style.setProperty('--h', p + '%'); return b; })),
      h('span', { class: 'jv-badge' }, '▲ ', h('b', {}, x.growth)));
  }
}

function journeySection() {
  const j = t('journey') || {};
  const steps = arr(j.steps);
  let active = 0, timer = null, userPicked = false;
  const stage = h('div', { class: 'journey__stage', 'aria-live': 'polite' });
  const btns = steps.map((s, i) => {
    const b = h('button', { type: 'button', class: 'journey__step', role: 'tab', 'aria-selected': String(i === 0), id: 'jt-' + i, 'aria-controls': 'journey-panel' },
      h('span', { class: 'journey__num' }, String(i + 1).padStart(2, '0')),
      h('span', { class: 'journey__label' }, h('b', {}, s.title), h('small', {}, s.tag)),
      h('span', { class: 'journey__bar', 'aria-hidden': 'true' }, h('i')));
    b.addEventListener('click', () => { userPicked = true; stop(); show(i); });
    return b;
  });
  function show(i) {
    active = i;
    btns.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.classList.toggle('is-done', k < i); });
    const s = steps[i];
    stage.replaceChildren(
      journeyVisual(i),
      h('div', { class: 'journey__copy', id: 'journey-panel', role: 'tabpanel', 'aria-labelledby': 'jt-' + i },
        h('span', { class: 'journey__tag' }, s.tag),
        h('h3', {}, s.title),
        h('p', {}, s.text)));
  }
  const stop = () => { clearInterval(timer); timer = null; root.classList.remove('is-auto'); };
  const start = () => {
    if (userPicked || timer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('is-auto');
    timer = setInterval(() => show((active + 1) % steps.length), 4800);
  };
  const root = h('section', { class: 'section journey', id: 'journey', 'data-shape': 'process' },
    h('div', { class: 'container' },
      heading({ eyebrow: j.eyebrow, title: j.title, accent: j.titleAccent }),
      h('div', { class: 'journey__box', 'data-reveal': '' },
        h('div', { class: 'journey__steps', role: 'tablist' }, ...btns),
        stage),
      j.example ? h('p', { class: 'journey__example' }, j.example) : null));
  show(0);
  const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.3 });
  io.observe(root);
  return root;
}

function whySection() {
  const icons = ['marketing', 'spark', 'layers', 'shield'];
  return h('section', { class: 'section why', id: 'why', 'data-shape': 'why' },
    h('div', { class: 'container' },
      heading({ eyebrow: t('why.eyebrow'), title: t('why.title'), accent: t('why.titleAccent') }),
      h('ul', { class: 'why-grid' },
        ...arr(t('why.items')).map((it, i) => h('li', { class: 'why-card', 'data-reveal': '', 'data-tilt': '' },
          h('span', { class: 'why-card__icon' }, icon(icons[i % icons.length], 24)),
          h('h3', {}, it.title),
          h('p', {}, it.text))))));
}

function projectCard(p, i) {
  const loc = (p && p[getLang()]) || {};
  const img = safeImage(p.image);
  const url = safeUrl(p.url);
  const cover = img
    ? h('img', { class: 'project__img', src: img, alt: loc.title || '', loading: 'lazy', decoding: 'async', width: '1200', height: '750' })
    : h('div', { class: 'project__placeholder project__placeholder--' + (i % 3), 'aria-hidden': 'true' },
      h('span', {}, str(loc.title).slice(0, 2).toUpperCase() || 'TMX'));
  const body = [
    h('div', { class: 'project__frame' },
      h('span', { class: 'project__dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')),
      cover),
    h('div', { class: 'project__body' },
      loc.label ? h('span', { class: 'project__label' }, loc.label) : null,
      h('h3', { class: 'project__title' }, loc.title),
      loc.text ? h('p', { class: 'project__text' }, loc.text) : null,
      h('ul', { class: 'tags' }, ...arr(p.tags).map((tag) => h('li', {}, tag))),
      url ? h('span', { class: 'project__visit' }, t('portfolio.visit'), icon('arrow', 16)) : null)
  ];
  return h('li', { class: 'project', 'data-reveal': '', 'data-tilt': '' },
    url ? h('a', { class: 'project__link', href: url, target: url.startsWith('http') ? '_blank' : null, rel: url.startsWith('http') ? 'noopener noreferrer' : null }, ...body)
      : h('div', { class: 'project__link' }, ...body));
}

function portfolioPreview() {
  return h('section', { class: 'section portfolio-preview', id: 'portfolio', 'data-shape': 'portfolio' },
    h('div', { class: 'container' },
      heading({ eyebrow: t('portfolio.eyebrow'), title: t('portfolio.title') }),
      h('ul', { class: 'projects' }, ...arr(content.projects).slice(0, 3).map(projectCard)),
      h('div', { class: 'center', 'data-reveal': '' }, button(t('portfolio.all'), 'portfolio.html', 'ghost'))));
}

function ctaBand() {
  return h('section', { class: 'section cta-band', 'data-shape': 'cta' },
    h('div', { class: 'container' },
      h('div', { class: 'cta-band__card', 'data-reveal': '' },
        h('h2', { class: 'section-title' }, t('portfolio.nextTitle')),
        button(t('portfolio.nextCta'), 'kontakt.html'))));
}

/* ---------- Service pages ---------- */

function servicePage(key) {
  const s = t('services.' + key) || {};
  const idx = SERVICE_KEYS.indexOf(key);
  const nextKey = SERVICE_KEYS[(idx + 1) % SERVICE_KEYS.length];
  const next = t('services.' + nextKey) || {};
  return [
    h('section', { class: 'hero hero--service', 'aria-labelledby': 'svc-title' },
      h('div', { class: 'container hero__inner' },
        h('a', { class: 'back-link', href: 'index.html#services' }, '← ', t('servicePage.back')),
        h('p', { class: 'eyebrow hero__eyebrow' }, s.num + ' — ' + str(s.tagline)),
        h('h1', { class: 'hero__title', id: 'svc-title' }, h('span', { class: 'hero__line hero__line--accent' }, ...splitWords(s.title))),
        h('p', { class: 'hero__text' }, s.intro),
        h('div', { class: 'hero__actions' }, button(t('servicePage.cta'), 'kontakt.html?service=' + key)))),
    h('div', { class: 'demos', id: 'demos', 'data-shape': key }),
    h('section', { class: 'section', 'data-shape': key },
      h('div', { class: 'container' },
        heading({ title: t('servicePage.includes') }),
        h('ul', { class: 'feature-grid' },
          ...arr(s.items).map((item, i) => h('li', { class: 'feature', 'data-reveal': '', 'data-tilt': '' },
            h('span', { class: 'feature__num' }, String(i + 1).padStart(2, '0')),
            h('span', { class: 'feature__icon' }, icon('check', 20)),
            h('p', {}, item)))))),
    h('section', { class: 'section next-svc' },
      h('div', { class: 'container' },
        h('a', { class: 'next-svc__link', href: SERVICE_PAGES[nextKey], 'data-reveal': '' },
          h('span', { class: 'eyebrow' }, t('servicePage.next')),
          h('span', { class: 'next-svc__title' }, next.num + ' ', next.title),
          icon('arrow', 36)))),
    ctaBand()
  ];
}

/* ---------- Portfolio ---------- */

function portfolioPage() {
  return [
    h('section', { class: 'hero hero--compact', 'aria-labelledby': 'pf-title' },
      h('div', { class: 'container hero__inner' },
        h('p', { class: 'eyebrow hero__eyebrow' }, t('portfolio.eyebrow')),
        h('h1', { class: 'hero__title', id: 'pf-title' }, h('span', { class: 'hero__line' }, ...splitWords(t('portfolio.title')))),
        h('p', { class: 'hero__text' }, t('portfolio.text')))),
    h('section', { class: 'section', 'data-shape': 'portfolio' },
      h('div', { class: 'container' }, h('ul', { class: 'projects' }, ...arr(content.projects).map(projectCard)))),
    ctaBand()
  ];
}

/* ---------- Contact ---------- */

const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

function field(id, label, input, hint) {
  return h('div', { class: 'field' },
    h('label', { for: id }, label),
    input,
    h('p', { class: 'field__error', id: id + '-err', 'aria-live': 'polite' }),
    hint || null);
}

function contactPage() {
  const preselect = new URLSearchParams(location.search).get('service');
  const info = [
    ['emailLabel', 'mail', settings.email, settings.email ? 'mailto:' + settings.email : ''],
    ['phoneLabel', 'phone', settings.phone, settings.phone ? 'tel:' + settings.phone.replace(/[^\d+]/g, '') : ''],
    ['addressLabel', 'pin', settings.address, '']
  ];

  const input = (id, type, max, auto) => h('input', {
    id, name: id, type, maxlength: String(max), autocomplete: auto, required: true, 'aria-describedby': id + '-err'
  });
  const select = h('select', { id: 'service', name: 'service' },
    h('option', { value: 'general' }, t('contact.serviceGeneral')),
    ...SERVICE_KEYS.map((k) => h('option', { value: k, selected: k === preselect }, t('services.' + k + '.title'))));
  const message = h('textarea', { id: 'message', name: 'message', rows: '6', maxlength: String(LIMITS.message), required: true, 'aria-describedby': 'message-err' });
  const consent = h('input', { id: 'consent', name: 'consent', type: 'checkbox', required: true, 'aria-describedby': 'consent-err' });
  const status = h('p', { class: 'form__status', role: 'status' });
  const submit = h('button', { type: 'submit', class: 'btn btn--primary btn--block' }, h('span', { class: 'btn__label' }, t('contact.send')), icon('arrow', 18));

  const form = h('form', { class: 'form', novalidate: true, 'data-reveal': '' },
    h('p', { class: 'form__required' }, t('contact.required')),
    h('div', { class: 'form__row' },
      field('name', t('contact.name'), input('name', 'text', LIMITS.name, 'name')),
      field('email', t('contact.email'), input('email', 'email', LIMITS.email, 'email'))),
    field('service', t('contact.service'), select),
    field('subject', t('contact.subject'), input('subject', 'text', LIMITS.subject, 'off')),
    field('message', t('contact.message'), message),
    h('div', { class: 'field field--check' },
      consent,
      h('label', { for: 'consent' },
        t('contact.consentBefore'), ' ',
        h('a', { href: 'datenschutz.html', target: '_blank' }, t('contact.consentLink')), ' ',
        t('contact.consentAfter')),
      h('p', { class: 'field__error', id: 'consent-err', 'aria-live': 'polite' })),
    h('div', { class: 'hp', 'aria-hidden': 'true' }, h('label', { for: 'website' }, 'Website'), h('input', { id: 'website', name: 'website', type: 'text', tabindex: '-1', autocomplete: 'off' })),
    submit,
    h('p', { class: 'form__note' }, t('contact.note')),
    status);

  let lastSent = 0;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const clean = (v) => str(v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
    const errors = {};
    for (const k of ['name', 'email', 'subject', 'message']) {
      data[k] = clean(data[k]);
      if (!data[k]) errors[k] = t('contact.errorRequired');
      else if (data[k].length > LIMITS[k]) errors[k] = t('contact.errorLength');
    }
    if (!errors.email && !EMAIL_RE.test(data.email)) errors.email = t('contact.errorEmail');
    if (!consent.checked) errors.consent = t('contact.errorConsent');

    for (const k of ['name', 'email', 'subject', 'message', 'consent']) {
      const el = form.querySelector('#' + k);
      form.querySelector('#' + k + '-err').textContent = errors[k] || '';
      el.setAttribute('aria-invalid', errors[k] ? 'true' : 'false');
    }
    const first = Object.keys(errors)[0];
    if (first) { form.querySelector('#' + first).focus(); return; }

    if (form.querySelector('[name="website"]').value) return; // bot filled the honeypot
    if (Date.now() - lastSent < 30000) return;
    const svc = data.service === 'general' ? t('contact.serviceGeneral') : t('services.' + data.service + '.title');
    const cfg = settings.form || {};
    const key = clean(cfg.accessKey);
    const endpoint = safeUrl(cfg.endpoint);

    if (key && endpoint.startsWith('https://')) {
      submit.disabled = true;
      status.textContent = t('contact.sending');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: key,
            subject: ('[' + (settings.brand || 'TMX') + '] ' + data.subject).replace(/[\r\n]+/g, ' '),
            from_name: data.name,
            name: data.name,
            email: data.email,
            service: svc,
            message: data.message,
            language: getLang()
          })
        });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || out.success === false) throw new Error('send failed');
        lastSent = Date.now();
        form.reset();
        status.textContent = t('contact.success');
      } catch (_) {
        status.textContent = t('contact.errorSend');
      } finally {
        submit.disabled = false;
      }
      return;
    }

    // No form service configured yet: fall back to the visitor's own mail app.
    const to = clean(settings.email);
    if (!EMAIL_RE.test(to)) { status.textContent = t('contact.errorNoEmail'); return; }
    const subject = ('[' + (settings.brand || 'TMX') + '] ' + data.subject).replace(/[\r\n]+/g, ' ');
    const body = [data.message, '', '—', data.name, data.email, svc].join('\n');
    location.href = 'mailto:' + encodeURIComponent(to) + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  return [
    h('section', { class: 'hero hero--compact', 'aria-labelledby': 'ct-title' },
      h('div', { class: 'container hero__inner' },
        h('p', { class: 'eyebrow hero__eyebrow' }, t('contact.eyebrow')),
        h('h1', { class: 'hero__title', id: 'ct-title' }, h('span', { class: 'hero__line' }, ...splitWords(t('contact.title')))),
        h('p', { class: 'hero__text' }, t('contact.text')))),
    h('section', { class: 'section contact', 'data-shape': 'contact' },
      h('div', { class: 'container contact__grid' },
        h('ul', { class: 'contact__info' },
          ...info.map(([label, ic, value, href]) => h('li', { class: 'contact__item', 'data-reveal': '' },
            h('span', { class: 'contact__icon' }, icon(ic, 20)),
            h('span', {},
              h('span', { class: 'contact__label' }, t('contact.' + label)),
              value
                ? (href ? h('a', { href }, value) : h('span', {}, value))
                : h('span', { class: 'muted' }, t('contact.pending'))))),
          h('li', { class: 'contact__item contact__item--social', 'data-reveal': '' },
            h('span', { class: 'contact__label' }, t('contact.social')),
            socialLinks('contact__social'))),
        form))
  ];
}

/* ---------- Legal ---------- */

function legalShell(title, ...children) {
  return h('section', { class: 'section legal' },
    h('div', { class: 'container container--narrow' },
      h('h1', { class: 'legal__title' }, title),
      t('legalPages.bindingNote') ? h('p', { class: 'notice' }, t('legalPages.bindingNote')) : null,
      ...children));
}

function sections(list) {
  return arr(list).map((s) => h('section', { class: 'legal__block' },
    h('h2', {}, s.h), ...arr(s.p).map((p) => h('p', {}, p))));
}

function imprintPage() {
  const L = (k) => str(legal[k]).trim();
  const lines = [L('company'), L('name'), L('street'), [L('zip'), L('city')].filter(Boolean).join(' '), L('country')].filter(Boolean);
  const complete = L('name') && L('street') && L('city') && L('email');
  return legalShell(t('legalPages.imprintTitle'),
    h('p', { class: 'legal__lead' }, t('legalPages.imprintLead')),
    complete ? null : h('p', { class: 'notice' }, t('legalPages.pendingNote')),
    h('address', { class: 'legal__block' }, ...lines.flatMap((l, i) => (i ? [h('br'), l] : [l]))),
    h('section', { class: 'legal__block' },
      h('h2', {}, t('legalPages.contactHead')),
      L('phone') ? h('p', {}, t('contact.phoneLabel') + ': ', h('a', { href: 'tel:' + L('phone').replace(/[^\d+]/g, '') }, L('phone'))) : null,
      L('email') ? h('p', {}, t('contact.emailLabel') + ': ', h('a', { href: 'mailto:' + L('email') }, L('email'))) : null),
    L('vatId') ? h('section', { class: 'legal__block' }, h('h2', {}, t('legalPages.vatHead')), h('p', {}, t('legalPages.vatText') + ' ' + L('vatId'))) : null,
    L('businessId') ? h('section', { class: 'legal__block' }, h('h2', {}, t('legalPages.businessHead')), h('p', {}, L('businessId'))) : null,
    L('editorial') ? h('section', { class: 'legal__block' }, h('h2', {}, t('legalPages.editorialHead')), h('p', {}, L('editorial'))) : null,
    h('section', { class: 'legal__block' }, h('h2', {}, t('legalPages.disputeHead')), h('p', {}, t('legalPages.disputeText'))));
}

function privacyPage() {
  return legalShell(t('legalPages.privacyTitle'),
    ...sections(t('privacy')),
    legal.hosting ? h('p', { class: 'muted' }, 'Hosting: ' + legal.hosting) : null,
    h('p', { class: 'muted' }, t('legalPages.updated') + ': ' + str(content.meta && content.meta.updated)));
}

function accessibilityPage() {
  return legalShell(t('legalPages.accessibilityTitle'), ...sections(t('accessibility')));
}

function notFoundPage() {
  return h('section', { class: 'hero hero--compact' },
    h('div', { class: 'container hero__inner' },
      h('p', { class: 'eyebrow' }, '404'),
      h('h1', { class: 'hero__title' }, h('span', { class: 'hero__line' }, t('notFound.title'))),
      h('p', { class: 'hero__text' }, t('notFound.text')),
      h('div', { class: 'hero__actions' }, button(t('notFound.cta'), 'index.html'))));
}

const TITLES = {
  home: () => settings.brand + ' ' + (settings.brandSuffix || '') + ' — ' + t('hero.title1'),
  portfolio: () => t('nav.portfolio'),
  contact: () => t('nav.contact'),
  imprint: () => t('legalPages.imprintTitle'),
  privacy: () => t('legalPages.privacyTitle'),
  accessibility: () => t('legalPages.accessibilityTitle'),
  notfound: () => t('notFound.title')
};

export function pageTitle(page) {
  const brand = (settings.brand || 'TMX') + (settings.brandSuffix ? ' ' + settings.brandSuffix : '');
  if (page === 'home') return TITLES.home();
  const name = SERVICE_KEYS.includes(page) ? t('services.' + page + '.title') : (TITLES[page] || (() => ''))();
  return name + ' — ' + brand;
}

export function renderPage(page) {
  switch (page) {
    case 'home': return [hero(), about(), services(), journeySection(), whySection(), portfolioPreview(), ctaBand()];
    case 'portfolio': return portfolioPage();
    case 'contact': return contactPage();
    case 'imprint': return imprintPage();
    case 'privacy': return privacyPage();
    case 'accessibility': return accessibilityPage();
    case 'notfound': return notFoundPage();
    default: return SERVICE_KEYS.includes(page) ? servicePage(page) : notFoundPage();
  }
}
