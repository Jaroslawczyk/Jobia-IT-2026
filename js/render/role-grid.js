/* =============================================================
   Список направлений (режим «По направлениям»)
   -------------------------------------------------------------
   visible    — применяет фильтры (группа, технология, поиск,
                риск ИИ, порог входа, время учёбы) и сортировку.
   cardMoney  — блок с зарплатами на карточке (зависит от региона
                и выбранной валюты).
   cardVac    — заметная строка с числом вакансий.
   cardLearn  — строка «сколько учить: с нуля / со сменой стека».
   renderGrid — сборка сетки карточек и счётчика «показано N из M».
   ============================================================= */

function visible(){
  let r=ROLES.filter(x=>state.cat==="all"||x.cat===state.cat);

  // фильтр по технологии
  if(state.tech!=="all"){
    const tc=TECHS.find(x=>x.n===state.tech);
    r=r.filter(x=>(tc&&tc.r.indexOf(x.id)>=0)||x.stack.some(s=>s.n.toLowerCase().includes(state.tech.toLowerCase().split(" ")[0])));
  }

  // фильтр по риску ИИ: low = уровни 1–2, mid = 3, high = 4–5
  if(state.fAi!=="all"){
    r=r.filter(x=>{const l=x.ai.lvl;
      return state.fAi==="low" ? l<=2 : state.fAi==="mid" ? l===3 : l>=4;});
  }

  // фильтр по порогу входа: те же диапазоны
  if(state.fEntry!=="all"){
    r=r.filter(x=>state.fEntry==="low" ? x.entry<=2 : state.fEntry==="mid" ? x.entry===3 : x.entry>=4);
  }

  // фильтр по времени изучения «с нуля»
  if(state.fLearn!=="all"){
    r=r.filter(x=>learnBucket(x)===state.fLearn);
  }

  // отмеченные «убрать» — скрываем, если включено
  if(state.hideMarked) r=r.filter(x=>!isMarked("r:"+x.id));

  // фильтр по числу технологий направления
  if(state.fNTech!=="all") r=r.filter(x=>inRange("ntech",state.fNTech,techsOfRole(x.id).length));

  // поиск по названию, тегу, описанию и стеку (учитывает текущий перевод)
  const s=state.q.trim().toLowerCase();
  if(s) r=r.filter(x=>(x.name+" "+tr(x,"name")+" "+x.tag+" "+tr(x,"tag")+" "+x.about+" "+tr(x,"about")+" "+trStack(x).map(y=>y.n+" "+y.d).join(" ")).toLowerCase().includes(s));

  // сортировка
  const by={demand:(a,b)=>b.demand-a.demand||senior(b)-senior(a),salary:(a,b)=>senior(b)-senior(a),
    junior:(a,b)=>junior(b)-junior(a),share:(a,b)=>(b.pl.share||0)-(a.pl.share||0),
    entry:(a,b)=>a.entry-b.entry||b.demand-a.demand,ntech:(a,b)=>techsOfRole(b.id).length-techsOfRole(a.id).length,az:(a,b)=>tr(a,"name").localeCompare(tr(b,"name"),state.lang)}[state.sort];
  return r.slice().sort(by);
}

/* зарплаты на карточке — в выбранной валюте */
function cardMoney(r){
  if(state.region==="pl"||state.region==="waw"){
    if(r.pl.approx) return `<div class="line2">${esc(cut(r.pl.approx,120))}</div>`;
    const waw=state.region==="waw";
    // для Варшавы — польская медиана × столичный коэффициент (WAW_K)
    const val=k=>waw?wawPay(r,k,0):(r.pl[k]&&r.pl[k][0]);
    const cell=(lbl,k)=>{const v=val(k);return `<div class="lvl"><span>${t(lbl)}</span><b class="u">${v!=null?(waw?"≈ ":"")+money(v):"—"}</b></div>`;};
    return `<div class="lvls">${cell("junior","jun")}${cell("mid","mid")}${cell("senior","sen")}</div>
      <div class="line2">UoP · B2B +10–25%${waw?` · ${t("wawEst")}`:""}${r.pl.share!=null?` · ${r.pl.share}% ${t("share")}`:""}</div>`;
  }
  const pay=state.region==="eu"?r.euPay:r.usPay, jobs=state.region==="eu"?r.euJobs:r.usJobs;
  return `<div class="line2" style="color:#C9D7EC">${esc(cut(pay,150))}</div><div class="line2">${esc(cut(jobs,110))}</div>`;
}

/* заметные плашки с числом вакансий: Польша и рядом Варшава */
function cardVac(r){
  if(state.region!=="pl"&&state.region!=="waw") return "";
  const p=plCount(r), w=wawCount(r);
  if(!p) return "";
  return `<span class="vacs">
    <span class="vac">PL ≈ ${fmt(p)} ${t("vac")}</span>
    <span class="vac vac--waw">${t("waw")} ≈ ${fmt(w)}</span></span>`;
}

/* оценка времени изучения */
function cardLearn(r){
  const w=roleWeeks(r);
  return `<span class="lt"><b>${t("learnZero")}</b> ${weeksToText(w.zero)} <span class="lt-sep">·</span> <b>${t("learnStack")}</b> ${weeksToText(w.stack)}</span>`;
}

function renderGrid(){
  const list=visible();
  $("count").textContent=`${t("shown")} ${list.length} / ${ROLES.length}`;
  if(!list.length){$("grid").innerHTML=`<div style="color:${C.dim};padding:40px">—</div>`;return;}
  $("grid").innerHTML=list.map(r=>{
    const cat=catOf(r.cat), key=trStack(r).filter(s=>s.l==="core"||s.l==="must").slice(0,4);
    return `<button class="role ${isMarked("r:"+r.id)?"marked":""}" data-id="${r.id}">
      <span class="top"><span class="nm">${tr(r,"name")}</span>
        <span style="display:flex;gap:8px;align-items:center"><span class="tagx" style="color:${cat.color};border:1px solid ${cat.color}55">${catName(r.cat)}</span>${starHtml("r:"+r.id)}</span></span>
      <span class="tg">${tr(r,"tag")}</span>
      ${cardMoney(r)}
      ${cardVac(r)}
      ${cardLearn(r)}
      <span class="techs">${key.map(s=>`<span class="tech ${s.l}">${s.l==="core"?"● ":""}${esc(s.n)}</span>`).join("")}</span>
      <span class="bars">
        <span><span class="lbl">${t("demandL")}</span><br>${meter(r.demand,cat.color)}</span>
        <span><span class="lbl">${t("entryL")}</span><br>${meter(r.entry,C.mag)}</span>
        <span><span class="lbl">${t("aiL")}: ${aiWord(r.ai.lvl)}</span><br>${meter(r.ai.lvl,aiColor(r.ai.lvl))}</span>
      </span></button>`;}).join("");
}
