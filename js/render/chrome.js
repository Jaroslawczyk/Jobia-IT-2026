/* =============================================================
   renderChrome — статический «каркас» страницы
   -------------------------------------------------------------
   Заголовок, лид, плашка-предупреждение, плейсхолдеры полей,
   переключатель языка, список сортировок, фильтры (технология,
   риск ИИ, порог входа, время учёбы), выбор валюты,
   переключатель режимов, блок источников.
   ============================================================= */

/* сборка одного <select> из списка пар [значение, подпись] */
function optionList(current, pairs) {
  return pairs
    .map(([v, label]) => `<option value="${esc(v)}" ${current === v ? "selected" : ""}>${esc(label)}</option>`)
    .join("");
}

function renderChrome(){
  document.documentElement.lang = state.lang;
  $("h1").textContent = t("title");
  $("lead").textContent = t("lead");
  $("notice").textContent = (state.lang==="ru" || _pack().ready==="full") ? "" : t("notice");
  $("q").placeholder = t("search"); $("tq").placeholder = t("searchTech");
  $("reset").textContent = t("reset");

  $("lang").innerHTML = LANGS.map(l=>`<option value="${l.code}" ${state.lang===l.code?"selected":""}>${l.name}</option>`).join("");

  $("sort").innerHTML = [["demand","s_demand"],["salary","s_salary"],["junior","s_junior"],
    ["share","s_share"],["entry","s_entry"],["az","s_az"]]
    .map(([v,k])=>`<option value="${v}" ${state.sort===v?"selected":""}>${t(k)}</option>`).join("");

  $("tech").innerHTML = `<option value="all">${t("filterTech")}: ${t("allDirs")}</option>`+
    TECHS.map(x=>`<option value="${esc(x.n)}" ${state.tech===x.n?"selected":""}>${esc(x.n)}</option>`).join("");

  /* --- дополнительные фильтры --- */
  $("fai").innerHTML = optionList(state.fAi, [
    ["all", `${t("f_ai")}: ${t("any")}`],
    ["low", `${t("f_ai")}: ${t("lvl_low")}`],
    ["mid", `${t("f_ai")}: ${t("lvl_mid")}`],
    ["high", `${t("f_ai")}: ${t("lvl_high")}`],
  ]);
  $("fentry").innerHTML = optionList(state.fEntry, [
    ["all", `${t("f_entry")}: ${t("any")}`],
    ["low", `${t("f_entry")}: ${t("lvl_low")}`],
    ["mid", `${t("f_entry")}: ${t("lvl_mid")}`],
    ["high", `${t("f_entry")}: ${t("lvl_high")}`],
  ]);
  $("flearn").innerHTML = optionList(state.fLearn, [
    ["all", `${t("f_learn")}: ${t("any")}`],
    ["6", t("lt_6")],
    ["12", t("lt_12")],
    ["18", t("lt_18")],
    ["19", t("lt_19")],
  ]);

  /* --- выбор валюты --- */
  $("cur").innerHTML = CURRENCY.list
    .map(c => `<option value="${c.code}" ${state.cur===c.code?"selected":""}>${t("curL")}: ${c.code}</option>`)
    .join("");

  /* --- фильтры режима «По технологиям» --- */
  $("tgroup").innerHTML = optionList(state.tGroup,
    [["all", `${t("t_group")}: ${t("allDirs")}`]].concat(CATS.map(c => [c.id, `${t("t_group")}: ${catName(c.id)}`])));
  $("tsort").innerHTML = optionList(state.tSort, [
    ["name", `${t("t_gsort")}: ${t("gs_name")}`],
    ["roles", `${t("t_gsort")}: ${t("gs_roles")}`],
    ["pay", `${t("t_gsort")}: ${t("gs_pay")}`],
  ]);

  $("modes").innerHTML = [["roles","byRoles"],["tech","byTech"]]
    .map(([v,k])=>`<button class="mode ${state.mode===v?"on":""}" data-m="${v}">${t(k)}</button>`).join("");
  $("rolesView").style.display = state.mode==="roles"?"":"none";
  $("techView").style.display  = state.mode==="tech"?"":"none";

  $("sources").innerHTML = langSources();
}
