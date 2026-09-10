/* =============================================================
   Локализация — ленивая загрузка языков + помощники перевода
   -------------------------------------------------------------
   Русский — язык-основа: тексты берутся прямо из js/data/*.
   en / pl — «пакеты» TL.en / TL.pl собираются здесь из уже
             загруженных объектов (I18N, EN, PL, TT, FACTS…).
   Остальные языки — файл js/i18n/<code>.js, который подгружается
   ДИНАМИЧЕСКИ при выборе языка (loadLang) и присваивает TL[code].

   Цепочка фолбэков для любого поля:
       текущий язык  →  английский  →  русская основа

   Помощники:
     t              — строка интерфейса
     tr / trAI / trList — простые поля направления (name, about, pros…)
     trStack        — стек с переведёнными названиями и описаниями
     trExtra/trCerts/trTracks/trFw/trTools/trDay — глубокие разделы
     trAlt/trFacts  — альтернативы технологий и факты по регионам
     trPlNote/trPlYoy/trEuText/trWorldText — зарплатные тексты
     kindName/catName/aiWord/techW/techA/techP — словарные подстановки
     ruOnly         — плашка «раздел ещё не переведён на этот язык»
   ============================================================= */

/* ---------- хранилище переводов ---------- */

const TL = {};

// TT: { "Название": [[enW, enA], [plW, plA]] } → плоская карта
function _mapTT(langIdx, fieldIdx) {
  const o = {};
  for (const n in TT) o[n] = TT[n][langIdx][fieldIdx];
  return o;
}

// русский — основа: словари указывают на базовые данные,
// роли/глубокие поля берутся напрямую из ROLES/EXTRA/DAY (r[f])
TL.ru = {
  ready: "full",
  ui: I18N.ru, catn: CATN.ru, aiword: AIWORD.ru,
};

// пакеты для встроенных языков из уже загруженных данных
TL.en = {
  ready: "cards",
  ui: I18N.en, catn: CATN.en, aiword: AIWORD.en, kinds: KINDS_EN,
  sources: SOURCES.en, roles: EN,
  facts: { pl: FACTS.pl.en, waw: FACTS.waw.en, eu: FACTS.eu.en, world: FACTS.world.en },
  techW: _mapTT(0, 0), techA: _mapTT(0, 1),
};
TL.pl = {
  ready: "cards",
  ui: I18N.pl, catn: CATN.pl, aiword: AIWORD.pl, kinds: KINDS_PL,
  sources: SOURCES.pl, roles: PL,
  facts: { pl: FACTS.pl.pl, waw: FACTS.waw.pl, eu: FACTS.eu.pl, world: FACTS.world.pl },
  techW: _mapTT(1, 0), techA: _mapTT(1, 1),
};

/* ---------- ленивая загрузка ---------- */

const _langWaiters = {};
function loadLang(code, cb) {
  if (code === "ru" || TL[code]) { if (cb) cb(); return; }
  const meta = LANG_BY_CODE[code];
  if (!meta || !meta.file) { if (cb) cb(); return; }
  if (_langWaiters[code]) { _langWaiters[code].push(cb); return; }
  _langWaiters[code] = [cb];
  const s = document.createElement("script");
  s.src = meta.file;
  s.onload = () => {
    const q = _langWaiters[code] || []; delete _langWaiters[code];
    q.forEach(f => f && f());
  };
  s.onerror = () => {
    console.warn("i18n: не удалось загрузить", meta.file);
    TL[code] = { ready: "none" };
    const q = _langWaiters[code] || []; delete _langWaiters[code];
    q.forEach(f => f && f());
  };
  document.head.appendChild(s);
}

/* ---------- доступ к текущему пакету ---------- */

const _pack = () => TL[state.lang] || TL.en;
// английский-фолбэк: пусто для русского (у него база — сами данные)
const _enPack = () => state.lang === "ru" ? {} : TL.en;
const _packRole = id => (_pack().roles && _pack().roles[id]) || {};
const _enRole = id => (_enPack().roles && _enPack().roles[id]) || {};

// поле роли: текущий язык → английский → база
function _field(id, f, base) {
  const a = _packRole(id); if (a[f] != null) return a[f];
  const b = _enRole(id); if (b[f] != null) return b[f];
  return base;
}

/* ---------- помощники ---------- */

const t = k => {
  const u = _pack().ui;
  if (u && u[k] != null) return u[k];
  const en = _enPack().ui;
  if (en && en[k] != null) return en[k];
  return I18N.ru[k] != null ? I18N.ru[k] : k;
};

const tr     = (r, f) => _field(r.id, f, r[f]);
const trList  = (r, f) => _field(r.id, f, r[f]); // pros / cons / passive
const trAI    = (r, f) => {
  const a = _packRole(r.id).ai, b = _enRole(r.id).ai;
  if (a && a[f] != null) return a[f];
  if (b && b[f] != null) return b[f];
  return r.ai[f];
};

// стек с переведёнными названиями/описаниями, уровень (l) — из базы
function trStack(r) {
  const a = _packRole(r.id).stack, b = _enRole(r.id).stack;
  return r.stack.map((s, i) => {
    const x = (a && a[i]) || (b && b[i]) || {};
    return { l: s.l, n: x.n || s.n, d: x.d || s.d };
  });
}

function trExtra(r, f) {
  const a = _packRole(r.id).extra, b = _enRole(r.id).extra;
  if (a && a[f] != null) return a[f];
  if (b && b[f] != null) return b[f];
  return r[f];
}
function trCerts(r) {
  const a = _packRole(r.id).extra, b = _enRole(r.id).extra;
  return (a && a.certs) || (b && b.certs) || r.certs;
}
function trTracks(r) {
  if (!r.tracks) return null;
  const src = _packRole(r.id).tracks || _enRole(r.id).tracks;
  if (!src) return r.tracks;
  return {
    note: src.note || r.tracks.note,
    items: r.tracks.items.map((it, i) => {
      const x = (src.items && src.items[i]) || {};
      return { n: x.n || it.n, d: x.d || it.d, pl: x.pl || it.pl };
    }),
  };
}
function trFw(r) {
  if (!r.fw) return null;
  const a = _packRole(r.id).fw || _enRole(r.id).fw;
  return a ? r.fw.map((x, i) => a[i] || x) : r.fw;
}
function trTools(r) {
  return _packRole(r.id).tools || _enRole(r.id).tools || r.toolsNeed;
}
function trDay(r) {
  const base = DAY[r.id] || { text: "", moments: [] };
  const a = _packRole(r.id).day || _enRole(r.id).day;
  if (!a) return base;
  return {
    text: a.text || base.text,
    moments: base.moments.map((m, i) => (a.moments && a.moments[i]) || m),
  };
}
const trAlt = name => {
  const p = _pack(), en = _enPack();
  return (p.alt && p.alt[name]) || (en.alt && en.alt[name]) || ALT[name];
};
const trFacts = region => {
  const p = _pack(), en = _enPack();
  const base = (REGIONS.find(x => x.id === region) || {}).facts || [];
  return (p.facts && p.facts[region]) || (en.facts && en.facts[region]) || base;
};
const trPlNote    = r => _packRole(r.id).plNote || _enRole(r.id).plNote || r.pl.note;
const trPlYoy     = r => _packRole(r.id).plYoy  || _enRole(r.id).plYoy  || r.pl.yoy;
const trEuText    = r => _packRole(r.id).eu     || _enRole(r.id).eu     || r.eu;
const trWorldText = r => _packRole(r.id).world  || _enRole(r.id).world  || r.world;

const kindName = k  => (_pack().kinds && _pack().kinds[k]) || (_enPack().kinds && _enPack().kinds[k]) || k;
const catName  = id => (_pack().catn && _pack().catn[id]) || CATN.ru[id];
const aiWord   = lvl => (_pack().aiword && _pack().aiword[lvl - 1]) || AIWORD.ru[lvl - 1];
const techW    = x  => (_pack().techW && _pack().techW[x.n]) || (_enPack().techW && _enPack().techW[x.n]) || x.w;
const techA    = x  => (_pack().techA && _pack().techA[x.n]) || (_enPack().techA && _enPack().techA[x.n]) || x.a;
const techP    = x  => (_pack().techP && _pack().techP[x.n]) || x.p;

const catOf       = id => CATS.find(c => c.id === id);
const aiColor     = l  => l >= 4 ? C.red : l === 3 ? C.amber : C.lime;
const techsOfRole = id => TECHS.filter(x => x.r.indexOf(id) >= 0);
const langSources = () => state.lang === "ru" ? SRC_RU : (_pack().sources || TL.en.sources || SRC_RU);

// плашка: показывается, когда глубокие разделы ещё не переведены на язык
const ruOnly = () => {
  if (state.lang === "ru") return "";
  const p = _pack();
  if (p.ready === "full") return "";
  const msg = (p.ui && p.ui.ruOnly) || (TL.en.ui && TL.en.ui.ruOnly) || "";
  return msg ? `<div class="note" style="margin:0 0 12px">${msg}</div>` : "";
};
