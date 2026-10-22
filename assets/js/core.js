// Shared helpers: content access, language state and safe DOM building.
// Every piece of editable content is written with textContent / setAttribute,
// never innerHTML, so nothing from the content file can inject markup or script.

const LANG_KEY = 'tmx-lang';

export const content = Object.freeze(window.TMX_CONTENT || {});
export const settings = content.settings || {};
export const legal = content.legal || {};
export const LANGS = (Array.isArray(settings.languages) ? settings.languages : ['de', 'en', 'ru'])
  .filter((l) => /^[a-z]{2}$/.test(l) && content.i18n && content.i18n[l]);

let lang = pickInitialLang();

function pickInitialLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (LANGS.includes(stored)) return stored;
  } catch (_) { /* storage blocked: fall back to default */ }
  return LANGS.includes(settings.defaultLang) ? settings.defaultLang : LANGS[0] || 'de';
}

export const getLang = () => lang;

// Only remembered when the visitor actively switches (TDDDG § 25 (2) Nr. 2).
export function setLang(next) {
  if (!LANGS.includes(next)) return;
  lang = next;
  try { localStorage.setItem(LANG_KEY, next); } catch (_) { /* ignore */ }
}

export function clearStoredLang() {
  try { localStorage.removeItem(LANG_KEY); } catch (_) { /* ignore */ }
}

export function t(path) {
  const dict = (content.i18n && content.i18n[lang]) || {};
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);
}

export const str = (v) => (typeof v === 'string' ? v : v == null ? '' : String(v));

// Allow only links we can vouch for: same-site paths, anchors, https, mailto, tel.
export function safeUrl(raw, { allowExternal = true } = {}) {
  const v = str(raw).trim();
  if (!v) return '';
  if (/^#[\w-]*$/.test(v)) return v;
  if (/^(\.{0,2}\/)?[\w\-./]+(\?[\w=&-]*)?(#[\w-]*)?$/.test(v) && !v.includes('..') && !v.startsWith('//')) return v;
  if (allowExternal && /^https:\/\/[^\s"'<>]+$/i.test(v)) return v;
  if (/^mailto:[^\s"'<>]+$/i.test(v)) return v;
  if (/^tel:\+?[\d\s()/-]+$/i.test(v)) return v;
  return '';
}

// Images only from our own origin (uploads live in the repo).
export function safeImage(raw) {
  const v = str(raw).trim();
  return /^(\.\/|\/)?assets\/[\w\-./]+\.(png|jpe?g|webp|avif|svg)$/i.test(v) && !v.includes('..') ? v : '';
}

/**
 * h('a', { class: 'x', href: '/y' }, 'text', child)
 * Strings become text nodes. "on*" attributes are rejected; use addEventListener.
 */
export function h(tag, attrs = {}, ...children) {
  const el = document.createElementNS(
    attrs && attrs.ns ? attrs.ns : 'http://www.w3.org/1999/xhtml', tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false || k === 'ns') continue;
    if (/^on/i.test(k)) throw new Error('inline handlers are not allowed');
    if (k === 'href') {
      const url = safeUrl(v);
      if (url) el.setAttribute('href', url);
      continue;
    }
    if (k === 'src') {
      const url = safeImage(v) || (/^(\.\/)?assets\/[\w\-./]+$/.test(v) ? v : '');
      if (url) el.setAttribute('src', url);
      continue;
    }
    el.setAttribute(k, v === true ? '' : str(v));
  }
  append(el, children);
  return el;
}

function append(el, children) {
  for (const c of children.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(str(c)));
  }
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const ICONS = {
  development: ['M8 9l-4 3 4 3', 'M16 9l4 3-4 3', 'M13.5 6l-3 12'],
  ai: ['M12 3v3', 'M12 18v3', 'M3 12h3', 'M18 12h3', 'M6.3 6.3l2.1 2.1', 'M15.6 15.6l2.1 2.1', 'M6.3 17.7l2.1-2.1', 'M15.6 8.4l2.1-2.1', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  marketing: ['M4 19V10', 'M10 19V5', 'M16 19v-6', 'M22 19H2'],
  it: ['M4 4h16v6H4z', 'M4 14h16v6H4z', 'M8 7h.01', 'M8 17h.01'],
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  check: ['M5 12l5 5 9-10'],
  layers: ['M12 3l9 5-9 5-9-5 9-5z', 'M3 13l9 5 9-5'],
  spark: ['M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z'],
  shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z', 'M9 12l2 2 4-4'],
  mail: ['M3 6h18v12H3z', 'M3 7l9 6 9-6'],
  phone: ['M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2'],
  pin: ['M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z', 'M12 9.5a.5.5 0 1 0 0 .01'],
  linkedin: ['M4 9h4v11H4z', 'M6 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z', 'M11 9h4v2c.6-1.2 2-2 3.5-2 2 0 3.5 1.3 3.5 4v7h-4v-6c0-1.2-.7-2-1.8-2s-1.7.8-1.7 2v6H11z'],
  instagram: ['M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z', 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z', 'M17.5 6.5h.01'],
  xing: ['M6 7l2.5 4.5L6 16', 'M17 3l-6 10.5L15 21'],
  facebook: ['M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z'],
  tiktok: ['M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5', 'M14 3c.5 3 2.5 5 5.5 5'],
  x: ['M4 4l16 16', 'M20 4L4 20']
};

export function icon(name, size = 24) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('class', 'icon');
  for (const d of ICONS[name] || []) {
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', d);
    svg.append(p);
  }
  return svg;
}

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const SERVICE_KEYS = ['development', 'ai', 'marketing', 'it'];
export const SERVICE_PAGES = {
  development: 'development.html',
  ai: 'ai.html',
  marketing: 'marketing.html',
  it: 'it.html'
};
