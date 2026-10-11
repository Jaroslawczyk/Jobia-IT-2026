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
    ["share","s_share"],["entry","s_entry"],["ntech","s_ntech"],["az","s_az"]]
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
  $("fntech").innerHTML = optionList(state.fNTech, [["all",`${t("f_ntech")}: ${t("any")}`]].concat(
    RANGES.ntech.map(([id,a,b])=>[id,`${t("f_ntech")}: ${b===Infinity?a+"+":a===0?t("upto")+" "+(b-1):a+"–"+(b-1)}`])));

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
    ["vsum", `${t("t_gsort")}: ${t("gs_vsum")}`],
    ["vavg", `${t("t_gsort")}: ${t("gs_vavg")}`],
    ["entry", `${t("t_gsort")}: ${t("gs_entry")}`],
  ]);
  // подпись диапазона: «до 1 000», «1 000–3 000», «5 000+»
  const rng=(kind,label)=>[["all",`${label}: ${t("any")}`]].concat(RANGES[kind].map(([id,a,b])=>
    [id,`${label}: ${b===Infinity?fmt(a)+"+":a===0?t("upto")+" "+fmt(b):b-a===1?fmt(a):fmt(a)+"–"+fmt(b-1)}`]));
  $("tvsum").innerHTML   = optionList(state.tVSum, rng("vsum", t("t_vsum")));
  $("tvavg").innerHTML   = optionList(state.tVAvg, rng("vavg", t("t_vavg")));
  $("tnroles").innerHTML = optionList(state.tNRoles, rng("nroles", t("f_nroles")));
  $("tentry").innerHTML  = optionList(state.tEntry, [
    ["all", `${t("f_entry")}: ${t("any")}`],
    ["low", `${t("f_entry")}: ${t("lvl_low")}`],
    ["mid", `${t("f_entry")}: ${t("lvl_mid")}`],
    ["high", `${t("f_entry")}: ${t("lvl_high")}`],
  ]);

  renderMarkBtns();

  $("modes").innerHTML = [["roles","byRoles"],["tech","byTech"]]
    .map(([v,k])=>`<button class="mode ${state.mode===v?"on":""}" data-m="${v}">${t(k)}</button>`).join("");
  $("rolesView").style.display = state.mode==="roles"?"":"none";
  $("techView").style.display  = state.mode==="tech"?"":"none";

  $("sources").innerHTML = langSources();
}

/* кнопки «★ отмеченные: скрыты / показаны (N)» в обоих режимах */
function renderMarkBtns(){
  const nr=[...state.marked].filter(k=>k.startsWith("r:")).length, nt=state.marked.size-nr;
  const txt=n=>`<b>★</b> ${t("marked")}: ${state.hideMarked?t("markHidden"):t("markShown")} (${n})`;
  for(const [id,n] of [["mark",nr],["tmark",nt]]){
    $(id).innerHTML=txt(n); $(id).classList.toggle("on",state.hideMarked); $(id).title=t("markBtnTip");
  }
  for(const id of ["plmode","tplmode"]){
    $(id).style.display=state.region==="waw"?"":"none";
    $(id).innerHTML=`<b>PL</b> ${t("plOnCards")}: ${state.plMode==="hide"?t("plHidden"):t("plDimmed")}`;
    $(id).classList.toggle("on",state.plMode==="hide"); $(id).title=t("plBtnTip");
  }
  const fr=[...state.fav].filter(k=>k.startsWith("r:")).length, ft=state.fav.size-fr;
  for(const [id,n] of [["fav",fr],["tfav",ft]]){
    $(id).innerHTML=`<b>★</b> ${t("onlyFav")}: ${state.onlyFav?t("on"):t("off")} (${n})`;
    $(id).classList.toggle("on",state.onlyFav); $(id).title=t("favBtnTip");
  }
}
