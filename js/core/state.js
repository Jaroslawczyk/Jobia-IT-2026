/* =============================================================
   state — всё состояние интерфейса в одном объекте
   -------------------------------------------------------------
   lang    — язык (ru / en / pl)
   mode    — режим: roles (по направлениям) / tech (по технологиям)
   region  — pl / waw / eu / world
   cat     — фильтр по группе направлений ("all" или id из CATS)
   tech    — фильтр по технологии ("all" или её название)
   q       — строка поиска по направлениям
   tq      — строка поиска по технологиям
   kind    — фильтр по типу технологии (режим tech)
   tGroup  — фильтр технологий по группе направлений, куда они ведут
   tSort   — сортировка технологий (name / roles / pay)
   sort    — поле сортировки списка направлений
   cur     — выбранная валюта отображения зарплат (см. CURRENCY)
   fAi     — фильтр по риску ИИ: all / low / mid / high
   fEntry  — фильтр по порогу входа: all / low / mid / high
   fLearn  — фильтр по времени изучения «с нуля»: all / 6 / 12 / 18 / 19
   fNTech  — фильтр по числу технологий направления: all / low / mid / high
   fVac    — фильтр «вакансий от N» (по выбранному региону): all / 20 / 50 / 100 / …
   tVSum / tVAvg / tNRoles / tEntry — фильтры технологий: вакансии
             (сумма по направлениям / среднее), число направлений, порог входа
   marked  — отмеченные «убрать» (красная звёздочка): ключи "r:<id>" / "t:<название>",
             хранятся в localStorage браузера
   hideMarked — скрывать отмеченные (true) или показывать их приглушёнными
   fav     — избранное «оставить» (жёлтая звёздочка), те же ключи, localStorage
   onlyFav — показывать только избранное, всё остальное убрать
   plMode  — в регионе «Варшава» общепольские цифры на карточках: "dim" (приглушить) / "hide" (убрать)
   open    — id открытой карточки направления (или null)
   tab     — активная вкладка в модальном окне

   Любое изменение state сопровождается вызовом соответствующего render*().
   ============================================================= */

let state = {
  lang: "ru",
  mode: "roles",
  region: "pl",
  cat: "all",
  tech: "all",
  q: "",
  tq: "",
  kind: "all",
  tGroup: "all",
  tSort: "name",
  sort: "demand",
  cur: "PLN",
  fAi: "all",
  fEntry: "all",
  fLearn: "all",
  fNTech: "all",
  fVac: "all",
  tVSum: "all",
  tVAvg: "all",
  tNRoles: "all",
  tEntry: "all",
  open: null,
  tab: "about",
};

/* ---------- отметки «убрать» (сохраняются в браузере) ---------- */
const MARK_KEY = "jobia.marked", HIDE_KEY = "jobia.hideMarked";
state.marked = new Set((() => { try { return JSON.parse(localStorage.getItem(MARK_KEY)) || []; } catch (e) { return []; } })());
state.hideMarked = (() => { try { return localStorage.getItem(HIDE_KEY) !== "0"; } catch (e) { return true; } })();
function saveMarks() {
  try {
    localStorage.setItem(MARK_KEY, JSON.stringify([...state.marked]));
    localStorage.setItem(HIDE_KEY, state.hideMarked ? "1" : "0");
  } catch (e) { /* приватный режим — просто не сохраняем */ }
}
const FAV_KEY = "jobia.fav", ONLY_KEY = "jobia.onlyFav";
state.fav = new Set((() => { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } })());
state.onlyFav = (() => { try { return localStorage.getItem(ONLY_KEY) === "1"; } catch (e) { return false; } })();
function saveFav() {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify([...state.fav]));
    localStorage.setItem(ONLY_KEY, state.onlyFav ? "1" : "0");
  } catch (e) { /* приватный режим — просто не сохраняем */ }
}
const isMarked = key => state.marked.has(key);
const isFav = key => state.fav.has(key);
// красная и жёлтая отметки взаимоисключающие: ставим одну — снимаем другую
function toggleMark(key) {
  state.marked.has(key) ? state.marked.delete(key) : (state.marked.add(key), state.fav.delete(key));
  saveMarks(); saveFav();
}
function toggleFav(key) {
  state.fav.has(key) ? state.fav.delete(key) : (state.fav.add(key), state.marked.delete(key));
  saveMarks(); saveFav();
}
// скрыть карточку? (только избранное / скрытие отмеченных)
const hiddenByMarks = key => (state.onlyFav && !isFav(key)) || (state.hideMarked && isMarked(key));
const starHtml = key =>
  `<span class="star fav ${isFav(key) ? "on" : ""}" data-fav="${esc(key)}" role="button" title="${esc(t("favTip"))}">${isFav(key) ? "★" : "☆"}</span>` +
  `<span class="star ${isMarked(key) ? "on" : ""}" data-star="${esc(key)}" role="button" title="${esc(t("markTip"))}">${isMarked(key) ? "★" : "☆"}</span>`;

/* ---------- регион «Варшава»: что делать с цифрами по всей Польше ---------- */
const PLMODE_KEY = "jobia.plMode";
state.plMode = (() => { try { return localStorage.getItem(PLMODE_KEY) === "hide" ? "hide" : "dim"; } catch (e) { return "dim"; } })();
function savePlMode() { try { localStorage.setItem(PLMODE_KEY, state.plMode); } catch (e) {} }
// обёртка для общепольской части на карточке: как есть / приглушить / убрать
const plPart = html => state.region !== "waw" ? html : state.plMode === "hide" ? "" : `<span class="pl-dim">${html}</span>`;
