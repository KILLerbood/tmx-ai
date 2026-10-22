// TMX AI admin: edits content/site-content.js and commits it to GitHub.
// Authentication is GitHub itself (a fine-grained token limited to this repo),
// so there is no password, server or database here that could be attacked.
// The token lives in memory (optionally sessionStorage for this tab only).

const CONTENT_PATH = 'content/site-content.js';
const PREFIX = 'window.TMX_CONTENT = ';
const SESSION_KEY = 'tmx-admin-session';
const MAX_TEXT = 5000;
const MAX_IMAGE = 1.5 * 1024 * 1024;

const app = document.getElementById('app');
const state = { owner: 'KILLerbood', repo: 'tmx-ai', branch: 'main', token: '', sha: null, data: null, dirty: false, offline: false, section: 'settings' };

/* ---------- DOM helper (no innerHTML anywhere) ---------- */
function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of kids.flat(Infinity)) if (c != null && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return el;
}

/* ---------- Encoding ---------- */
const b64encode = (str) => {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};
const b64decode = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, '')), (c) => c.charCodeAt(0)));

function parseContent(src) {
  const body = src.trim();
  if (!body.startsWith(PREFIX)) throw new Error('Unerwartetes Dateiformat.');
  return JSON.parse(body.slice(PREFIX.length).replace(/;\s*$/, ''));
}
const serialize = (data) => PREFIX + JSON.stringify(data, null, 2) + ';\n';

/* ---------- GitHub API ---------- */
async function gh(path, opts = {}) {
  const res = await fetch('https://api.github.com/repos/' + encodeURIComponent(state.owner) + '/' + encodeURIComponent(state.repo) + path, {
    ...opts,
    headers: { Accept: 'application/vnd.github+json', Authorization: 'Bearer ' + state.token, 'X-GitHub-Api-Version': '2022-11-28', ...(opts.headers || {}) }
  });
  if (!res.ok) {
    const msg = res.status === 401 ? 'Token ungültig oder abgelaufen.' : res.status === 403 ? 'Keine Berechtigung (Token braucht „Contents: Read and write“).' : res.status === 404 ? 'Repository, Branch oder Datei nicht gefunden.' : res.status === 409 ? 'Konflikt – bitte neu laden.' : 'GitHub-Fehler ' + res.status;
    throw new Error(msg);
  }
  return res.json();
}

async function loadRemote() {
  const file = await gh('/contents/' + CONTENT_PATH + '?ref=' + encodeURIComponent(state.branch));
  state.sha = file.sha;
  state.data = parseContent(b64decode(file.content));
}

async function saveRemote() {
  const content = serialize(state.data);
  const out = await gh('/contents/' + CONTENT_PATH, {
    method: 'PUT',
    body: JSON.stringify({ message: 'Inhalte aktualisiert (TMX Admin)', content: b64encode(content), sha: state.sha, branch: state.branch })
  });
  state.sha = out.content.sha;
  return out.commit.html_url;
}

async function uploadImage(file) {
  if (!/^image\/(png|jpeg|webp|avif)$/.test(file.type)) throw new Error('Nur PNG, JPG, WebP oder AVIF.');
  if (file.size > MAX_IMAGE) throw new Error('Bild ist größer als 1,5 MB.');
  const ext = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/avif': 'avif' }[file.type];
  const name = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').slice(0, 40) || 'bild';
  const path = 'assets/uploads/' + name + '-' + Date.now().toString(36) + '.' + ext;
  const buf = new Uint8Array(await file.arrayBuffer());
  let bin = '';
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  await gh('/contents/' + path, { method: 'PUT', body: JSON.stringify({ message: 'Bild hochgeladen (TMX Admin)', content: btoa(bin), branch: state.branch }) });
  return path;
}

/* ---------- Validation ---------- */
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
function validate(data) {
  const problems = [];
  const walk = (v, path) => {
    if (typeof v === 'string') {
      if (v.length > MAX_TEXT) problems.push(path + ': zu lang (max. ' + MAX_TEXT + ' Zeichen)');
      const key = path.split('.').pop();
      // i18n holds UI labels ("E-Mail", "Link"), so format rules only apply to data fields.
      if (path.startsWith('i18n.')) return;
      if (/^(url|endpoint|linkedin|instagram|facebook|tiktok|x|xing)$/.test(key) && v && !/^https:\/\/[^\s"'<>]+$/.test(v) && !(key === 'url' && /^[\w\-./]+$/.test(v))) problems.push(path + ': muss mit https:// beginnen');
      if (key === 'image' && v && !/^assets\/[\w\-./]+\.(png|jpe?g|webp|avif|svg)$/i.test(v)) problems.push(path + ': Bildpfad muss unter assets/ liegen');
      if (key === 'email' && v && !/^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i.test(v)) problems.push(path + ': ungültige E-Mail-Adresse');
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, path + '[' + i + ']'));
    else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => walk(x, path ? path + '.' + k : k));
  };
  walk(data, '');
  return problems;
}
function clean(v) {
  if (typeof v === 'string') return v.replace(CONTROL, '');
  if (Array.isArray(v)) return v.map(clean);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clean(x)]));
  return v;
}

/* ---------- Labels ---------- */
const LABELS = {
  settings: 'Allgemein & Kontakt', legal: 'Impressum-Daten', projects: 'Portfolio-Projekte',
  'i18n.de': 'Texte · Deutsch', 'i18n.en': 'Texte · English', 'i18n.ru': 'Texte · Русский',
  brand: 'Markenname', brandSuffix: 'Zusatz (z. B. AI)', defaultLang: 'Standardsprache (de/en/ru)', email: 'E-Mail', phone: 'Telefon', address: 'Adresse',
  social: 'Social-Media-Links (https://…)', form: 'Kontaktformular', accessKey: 'Web3Forms Access Key', endpoint: 'Formular-Endpunkt', provider: 'Anbieter',
  name: 'Name', company: 'Firma', street: 'Straße & Nr.', zip: 'PLZ', city: 'Ort', country: 'Land', vatId: 'USt-IdNr.', businessId: 'Wirtschafts-ID', editorial: 'Verantwortlich nach § 18 MStV', hosting: 'Hosting-Anbieter',
  image: 'Bild', url: 'Link', tags: 'Tags', title: 'Titel', label: 'Label', text: 'Text', languages: 'Sprachen'
};
const label = (key) => LABELS[key] || key;

/* ---------- Generic editor ---------- */
function setAt(path, value) {
  let o = state.data;
  for (let i = 0; i < path.length - 1; i++) o = o[path[i]];
  o[path[path.length - 1]] = value;
  markDirty();
}

function fieldFor(value, path, key) {
  if (typeof value === 'string') {
    const long = value.length > 80 || /text|paragraph|intro|banner|^p$/.test(String(key));
    const input = long ? h('textarea', { rows: Math.min(8, Math.max(3, Math.ceil(value.length / 90))), maxlength: String(MAX_TEXT) }) : h('input', { type: /accessKey|token/.test(key) ? 'password' : 'text', maxlength: String(MAX_TEXT), autocomplete: 'off' });
    input.value = value;
    input.addEventListener('input', () => setAt(path, input.value));
    const wrap = h('div', { class: 'f', 'data-search': (path.join('.') + ' ' + value).toLowerCase() }, h('label', {}, label(key)), input);
    if (key === 'image') {
      const file = h('input', { type: 'file', accept: 'image/png,image/jpeg,image/webp,image/avif', class: 'file' });
      const btn = h('button', { type: 'button', class: 'btn btn--ghost', disabled: state.offline }, 'Bild hochladen');
      btn.addEventListener('click', () => file.click());
      file.addEventListener('change', async () => {
        const f = file.files[0];
        if (!f) return;
        btn.disabled = true; btn.textContent = 'Lädt …';
        try { const p = await uploadImage(f); input.value = p; setAt(path, p); toast('Bild hochgeladen.'); }
        catch (e) { toast(e.message, true); }
        finally { btn.disabled = false; btn.textContent = 'Bild hochladen'; }
      });
      wrap.append(h('div', { class: 'row' }, btn, file));
    }
    return wrap;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    const input = h('input', { type: typeof value === 'number' ? 'number' : 'checkbox' });
    if (typeof value === 'boolean') input.checked = value; else input.value = value;
    input.addEventListener('input', () => setAt(path, typeof value === 'boolean' ? input.checked : Number(input.value)));
    return h('div', { class: 'f', 'data-search': path.join('.').toLowerCase() }, h('label', {}, label(key)), input);
  }
  if (Array.isArray(value)) return arrayEditor(value, path, key);
  if (value && typeof value === 'object') {
    return h('fieldset', { class: 'group' }, h('legend', {}, label(key)), ...Object.entries(value).map(([k, v]) => fieldFor(v, [...path, k], k)));
  }
  return h('p', {}, '—');
}

function arrayEditor(arr, path, key) {
  const box = h('fieldset', { class: 'group group--list' }, h('legend', {}, label(key) + ' (' + arr.length + ')'));
  const rerender = () => box.replaceWith(arrayEditor(arr, path, key));
  arr.forEach((item, i) => {
    const up = h('button', { type: 'button', class: 'mini', 'aria-label': 'Nach oben', disabled: i === 0 }, '↑');
    const down = h('button', { type: 'button', class: 'mini', 'aria-label': 'Nach unten', disabled: i === arr.length - 1 }, '↓');
    const del = h('button', { type: 'button', class: 'mini mini--del', 'aria-label': 'Entfernen' }, '✕');
    up.addEventListener('click', () => { [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; markDirty(); rerender(); });
    down.addEventListener('click', () => { [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]; markDirty(); rerender(); });
    del.addEventListener('click', () => { if (confirmInline(del)) { arr.splice(i, 1); markDirty(); rerender(); } });
    box.append(h('div', { class: 'item' }, h('div', { class: 'item__bar' }, h('span', {}, '#' + (i + 1)), up, down, del), fieldFor(item, [...path, i], typeof item === 'object' ? key + ' ' + (i + 1) : '')));
  });
  const add = h('button', { type: 'button', class: 'btn btn--ghost' }, '+ Eintrag hinzufügen');
  add.addEventListener('click', () => {
    const tpl = arr.length ? blank(arr[arr.length - 1]) : '';
    if (tpl && typeof tpl === 'object' && 'id' in tpl) tpl.id = 'p' + Date.now().toString(36);
    arr.push(tpl); markDirty(); rerender();
  });
  box.append(add);
  return box;
}
// Two-click delete instead of window.confirm (no blocking dialogs).
function confirmInline(btn) {
  if (btn.dataset.armed) return true;
  btn.dataset.armed = '1'; btn.textContent = 'Sicher?';
  setTimeout(() => { delete btn.dataset.armed; btn.textContent = '✕'; }, 2500);
  return false;
}
const blank = (v) => (typeof v === 'string' ? '' : typeof v === 'number' ? 0 : typeof v === 'boolean' ? false : Array.isArray(v) ? [] : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)])) : v);

/* ---------- Screens ---------- */
let toastEl;
function toast(msg, err = false) {
  toastEl?.remove();
  toastEl = h('div', { class: 'toast' + (err ? ' toast--err' : ''), role: 'status' }, msg);
  document.body.append(toastEl);
  setTimeout(() => toastEl?.remove(), 4200);
}

function markDirty() {
  state.dirty = true;
  document.querySelector('.save')?.classList.add('is-dirty');
}

function loginScreen(error = '') {
  const owner = h('input', { value: state.owner, autocomplete: 'off', required: true, pattern: '[A-Za-z0-9-]+' });
  const repo = h('input', { value: state.repo, autocomplete: 'off', required: true, pattern: '[A-Za-z0-9._-]+' });
  const branch = h('input', { value: state.branch, autocomplete: 'off', required: true });
  const token = h('input', { type: 'password', autocomplete: 'off', required: true, placeholder: 'github_pat_…' });
  const remember = h('input', { type: 'checkbox', id: 'remember' });
  const err = h('p', { class: 'err', role: 'alert' }, error);
  const go = h('button', { type: 'submit', class: 'btn btn--primary' }, 'Anmelden');
  const offline = h('button', { type: 'button', class: 'btn btn--ghost' }, 'Ohne GitHub bearbeiten (Datei herunterladen)');
  const form = h('form', { class: 'card login', novalidate: true },
    h('div', { class: 'brand' }, h('b', {}, 'TMX'), h('span', {}, 'AI'), h('small', {}, 'Admin')),
    h('h1', {}, 'Inhalte verwalten'),
    h('p', { class: 'muted' }, 'Melden Sie sich mit einem GitHub-Token an, das nur Zugriff auf dieses Repository hat. Änderungen sind nach ca. 1 Minute live.'),
    h('div', { class: 'grid3' },
      h('div', { class: 'f' }, h('label', {}, 'GitHub-Konto'), owner),
      h('div', { class: 'f' }, h('label', {}, 'Repository'), repo),
      h('div', { class: 'f' }, h('label', {}, 'Branch'), branch)),
    h('div', { class: 'f' }, h('label', {}, 'Fine-grained Token'), token),
    h('label', { class: 'check', for: 'remember' }, remember, ' Für diesen Tab merken (wird beim Schließen gelöscht)'),
    err, go, offline,
    h('details', { class: 'help' },
      h('summary', {}, 'So erstellen Sie das Token (2 Minuten)'),
      h('ol', {},
        h('li', {}, 'GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.'),
        h('li', {}, 'Repository access: „Only select repositories“ → nur dieses Repository.'),
        h('li', {}, 'Permissions → Repository → Contents: „Read and write“. Sonst nichts.'),
        h('li', {}, 'Ablaufdatum setzen (z. B. 90 Tage), Token kopieren und hier einfügen.'))));
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity() || !/^github_pat_|^ghp_/.test(token.value.trim())) { err.textContent = 'Bitte alle Felder korrekt ausfüllen.'; return; }
    Object.assign(state, { owner: owner.value.trim(), repo: repo.value.trim(), branch: branch.value.trim(), token: token.value.trim(), offline: false });
    go.disabled = true; go.textContent = 'Prüfe …';
    try {
      await loadRemote();
      if (remember.checked) sessionStorage.setItem(SESSION_KEY, JSON.stringify({ owner: state.owner, repo: state.repo, branch: state.branch, token: state.token }));
      editor();
    } catch (ex) {
      state.token = '';
      err.textContent = ex.message;
      go.disabled = false; go.textContent = 'Anmelden';
    }
  });
  offline.addEventListener('click', async () => {
    try {
      const src = await (await fetch('../' + CONTENT_PATH, { cache: 'no-store' })).text();
      state.data = parseContent(src);
      state.offline = true;
      editor();
    } catch (ex) { err.textContent = 'Inhalte konnten nicht geladen werden: ' + ex.message; }
  });
  app.replaceChildren(h('main', { class: 'center' }, form));
}

function sectionList() {
  const s = [['settings', LABELS.settings], ['legal', LABELS.legal], ['projects', LABELS.projects]];
  for (const l of Object.keys(state.data.i18n || {})) s.push(['i18n.' + l, LABELS['i18n.' + l] || 'Texte · ' + l]);
  return s;
}

function editor() {
  const nav = h('nav', { class: 'side' }, h('div', { class: 'brand' }, h('b', {}, 'TMX'), h('span', {}, 'AI'), h('small', {}, 'Admin')));
  const main = h('section', { class: 'content' });
  const search = h('input', { type: 'search', placeholder: 'Feld oder Text suchen …', class: 'search' });
  const save = h('button', { type: 'button', class: 'btn btn--primary save' }, state.offline ? 'Datei herunterladen' : 'Veröffentlichen');
  const reload = h('button', { type: 'button', class: 'btn btn--ghost', hidden: state.offline }, 'Neu laden');
  const logout = h('button', { type: 'button', class: 'btn btn--ghost' }, 'Abmelden');
  const view = h('a', { class: 'btn btn--ghost', href: '../index.html', target: '_blank', rel: 'noopener' }, 'Website ansehen ↗');

  const show = (key) => {
    state.section = key;
    [...nav.querySelectorAll('button')].forEach((b) => b.setAttribute('aria-current', b.dataset.key === key ? 'page' : 'false'));
    const path = key.split('.');
    let v = state.data;
    for (const p of path) v = v[p];
    main.replaceChildren(...[h('h2', {}, sectionList().find(([k]) => k === key)[1]),
      key === 'legal' ? h('p', { class: 'note' }, 'Pflichtangaben nach § 5 DDG: vollständiger Name, ladungsfähige Anschrift (kein Postfach), E-Mail und eine schnelle Kontaktmöglichkeit. USt-IdNr. nur, falls vorhanden.') : null,
      key === 'settings' ? h('p', { class: 'note' }, 'Kontaktformular: Kostenlosen Access Key auf web3forms.com mit Ihrer E-Mail erstellen und unten eintragen. Ohne Key öffnet das Formular das E-Mail-Programm des Besuchers.') : null,
      ...(Array.isArray(v) ? [arrayEditor(v, path, key)] : Object.entries(v).map(([k, x]) => fieldFor(x, [...path, k], k)))].filter(Boolean));
    filter();
  };
  const filter = () => {
    const q = search.value.trim().toLowerCase();
    main.querySelectorAll('.f').forEach((f) => { f.hidden = !!q && !f.dataset.search.includes(q); });
    [...main.querySelectorAll('.group')].reverse().forEach((g) => { g.hidden = !!q && !g.querySelector('.f:not([hidden])'); });
  };
  search.addEventListener('input', filter);
  for (const [k, l] of sectionList()) {
    const b = h('button', { type: 'button', 'data-key': k }, l);
    b.addEventListener('click', () => show(k));
    nav.append(b);
  }
  save.addEventListener('click', async () => {
    state.data = clean(state.data);
    state.data.meta = { ...(state.data.meta || {}), updated: new Date().toISOString().slice(0, 10) };
    const problems = validate(state.data);
    if (problems.length) { toast('Bitte korrigieren: ' + problems.slice(0, 3).join(' · '), true); return; }
    if (state.offline) {
      const url = URL.createObjectURL(new Blob([serialize(state.data)], { type: 'text/javascript' }));
      const a = h('a', { href: url, download: 'site-content.js' });
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('Datei heruntergeladen. Ersetzen Sie damit content/site-content.js.');
      state.dirty = false; save.classList.remove('is-dirty');
      return;
    }
    save.disabled = true; save.textContent = 'Speichert …';
    try {
      const link = await saveRemote();
      state.dirty = false; save.classList.remove('is-dirty');
      toast('Veröffentlicht ✓ – in ca. 1 Minute live.');
      main.prepend(h('p', { class: 'note note--ok' }, 'Gespeichert. ', h('a', { href: link, target: '_blank', rel: 'noopener noreferrer' }, 'Änderung auf GitHub ansehen ↗')));
    } catch (ex) { toast(ex.message, true); }
    finally { save.disabled = false; save.textContent = 'Veröffentlichen'; }
  });
  reload.addEventListener('click', async () => {
    try { await loadRemote(); state.dirty = false; show(state.section); toast('Neu geladen.'); } catch (ex) { toast(ex.message, true); }
  });
  logout.addEventListener('click', () => {
    sessionStorage.removeItem(SESSION_KEY);
    Object.assign(state, { token: '', data: null, sha: null, dirty: false });
    loginScreen();
  });

  app.replaceChildren(h('div', { class: 'layout' },
    nav,
    h('div', { class: 'main' },
      h('header', { class: 'top' }, search, h('div', { class: 'row' }, view, reload, logout, save)),
      main)));
  show(state.section);
}

window.addEventListener('beforeunload', (e) => { if (state.dirty) { e.preventDefault(); e.returnValue = ''; } });

(async function boot() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    if (saved && saved.token) {
      Object.assign(state, saved);
      await loadRemote();
      editor();
      return;
    }
  } catch (_) { sessionStorage.removeItem(SESSION_KEY); }
  loginScreen();
})();
