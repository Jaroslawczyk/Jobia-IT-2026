/* =============================================================
   Метрики: валюта и время изучения
   -------------------------------------------------------------
   Подключается ПОСЛЕ helpers.js и i18n.js:
   использует CURRENCY, LEARN (данные), state и t().

   Валюта:
     curObj  — текущий объект валюты из CURRENCY.list
     conv    — сумма в PLN → сумма в текущей валюте
     money   — сумма в PLN → отформатированная строка с символом

   Время изучения:
     skillWeeks — {zero, stack} недель на один пункт стека
     roleWeeks  — {zero, stack} недель на всё направление
     weeksToText — недели → «≈ 5 мес» / «≈ 3 нед»
     learnBucket — недель «с нуля» → id диапазона для фильтра
   ============================================================= */

/* ---------- валюта ---------- */

const curObj = () => CURRENCY.list.find(c => c.code === state.cur) || CURRENCY.list[0];

const conv = pln => (pln == null ? null : pln * curObj().rate);

const money = pln => {
  if (pln == null) return "—";
  const c = curObj();
  const v = conv(pln);
  // крупные суммы округляем до десятков, чтобы не мельтешить цифрами
  const n = v >= 1000 ? Math.round(v / 10) * 10 : Math.round(v);
  return n.toLocaleString("ru-RU") + " " + c.sym;
};

/* ---------- время изучения ---------- */

// один пункт стека: сколько недель «с нуля» и «со сменой стека»
function skillWeeks(item) {
  let w = LEARN.base[item.l] != null ? LEARN.base[item.l] : 3;
  const n = String(item.n || "").toLowerCase();
  for (const [keys, mult] of LEARN.HINT) {
    if (keys.some(k => n.includes(k))) { w *= mult; break; }
  }
  return { zero: w, stack: w * LEARN.fromStack };
}

// всё направление: сумма по стеку × поправка на порог входа (entry 1..5)
function roleWeeks(r) {
  let zero = 0, stack = 0;
  (r.stack || []).forEach(it => {
    const x = skillWeeks(it);
    zero += x.zero;
    stack += x.stack;
  });
  const k = 0.6 + (r.entry || 3) * 0.15; // entry 1 → ×0.75 … entry 5 → ×1.35
  return { zero: zero * k, stack: stack * k };
}

const WEEKS_IN_MONTH = 4.345;

function weeksToText(w) {
  const m = w / WEEKS_IN_MONTH;
  if (m < 1.5) return "≈ " + Math.round(w) + " " + t("wUnitWeek");
  let val = m < 10 ? (m < 4 ? m.toFixed(1) : String(Math.round(m))) : String(Math.round(m));
  if (state.lang !== "en") val = val.replace(".", ","); // ru/pl — запятая как десятичный разделитель
  return "≈ " + val + " " + t("wUnitMonth");
}

// диапазон времени «с нуля» для фильтра: "6" | "12" | "18" | "19"
// (id сохранены прежними, границы — 6 / 10 / 16 месяцев)
function learnBucket(r) {
  const m = roleWeeks(r).zero / WEEKS_IN_MONTH;
  if (m <= 6) return "6";
  if (m <= 9) return "12";
  if (m <= 13) return "18";
  return "19";
}
