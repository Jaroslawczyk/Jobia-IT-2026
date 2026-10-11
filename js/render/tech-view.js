/* =============================================================
   Режим «По технологиям»
   -------------------------------------------------------------
   renderKinds — чипы-фильтры по типу технологии (Язык / Фреймворк…).
   renderTech  — сетка карточек технологий. Фильтры: тип, поиск,
                 группа направлений, куда технология ведёт.
                 Сортировка: по алфавиту / по числу направлений /
                 по senior-зарплате.
                 В блоке «Куда ведёт» у каждого направления —
                 вилка jun/mid/sen и число вакансий: Польша и Варшава.
   ============================================================= */

function renderKinds(){
  const kinds=["all"].concat([...new Set(TECHS.map(x=>x.k))]);
  $("kinds").innerHTML=kinds.map(k=>{
    const on=state.kind===k, n=k==="all"?TECHS.length:TECHS.filter(x=>x.k===k).length;
    const st=on?`background:${C.cyan};border-color:${C.cyan};color:#04070E`:`color:${C.cyan}CC;border-color:${C.cyan}44`;
    return `<button class="chip ${on?"on":""}" data-k="${esc(k)}" style="${st}">${k==="all"?t("allKinds"):esc(kindName(k))}<small>${n}</small></button>`;}).join("");
}

/* лучшая senior-вилка (UoP) среди направлений технологии — для сортировки */
function techTopPay(x){
  return x.r.reduce((m,id)=>{const r=ROLES.find(y=>y.id===id);return r?Math.max(m,senior(r)):m;},0);
}

/* показатели технологии по направлениям, куда она ведёт
   (вакансии — по выбранному региону: Польша или Варшава) */
function techStats(x){
  const rs=x.r.map(id=>ROLES.find(y=>y.id===id)).filter(Boolean);
  const v=rs.map(roleVac).filter(n=>n);
  const sum=v.reduce((a,b)=>a+b,0);
  return {n:rs.length, sum, avg:v.length?sum/v.length:0,
    entry:rs.length?rs.reduce((a,r)=>a+r.entry,0)/rs.length:0};
}

function renderTech(){
  let list=TECHS.filter(x=>state.kind==="all"||x.k===state.kind);

  // фильтр по группе направлений, куда технология ведёт
  if(state.tGroup!=="all"){
    list=list.filter(x=>x.r.some(id=>{const r=ROLES.find(y=>y.id===id);return r&&r.cat===state.tGroup;}));
  }

  if(state.hideMarked) list=list.filter(x=>!isMarked("t:"+x.n));

  // фильтры: вакансии (сумма / среднее), число направлений, порог входа
  list=list.filter(x=>{const st=techStats(x);
    return inRange("vsum",state.tVSum,st.sum)&&inRange("vavg",state.tVAvg,st.avg)
      &&inRange("nroles",state.tNRoles,st.n)&&inRange("entry",state.tEntry,st.entry);});

  // поиск
  const s=state.tq.trim().toLowerCase();
  if(s) list=list.filter(x=>(x.n+" "+x.w+" "+x.a+" "+techW(x)+" "+techA(x)).toLowerCase().includes(s));

  // сортировка
  const by={
    name:(a,b)=>a.n.localeCompare(b.n,state.lang),
    roles:(a,b)=>b.r.length-a.r.length||a.n.localeCompare(b.n),
    pay:(a,b)=>techTopPay(b)-techTopPay(a)||a.n.localeCompare(b.n),
    vsum:(a,b)=>techStats(b).sum-techStats(a).sum||a.n.localeCompare(b.n),
    vavg:(a,b)=>techStats(b).avg-techStats(a).avg||a.n.localeCompare(b.n),
    entry:(a,b)=>techStats(a).entry-techStats(b).entry||a.n.localeCompare(b.n),
  }[state.tSort]||((a,b)=>a.n.localeCompare(b.n));
  list=list.slice().sort(by);

  $("tcount").textContent=`${t("shown")} ${list.length} / ${TECHS.length}`;
  $("tgrid").innerHTML=list.map(x=>`<div class="role ${isMarked("t:"+x.n)?"marked":""}" style="cursor:default">
      <span class="top"><span class="nm">${esc(x.n)}</span>
        <span style="display:flex;gap:8px;align-items:center"><span class="tagx" style="color:${C.amber};border:1px solid ${C.amber}55">${esc(kindName(x.k))}</span>${starHtml("t:"+x.n)}</span></span>
      <span class="tg" style="color:#C2D2EA">${esc(techW(x))}</span>
      ${techP(x)?`<span class="line2" style="color:${C.lime}">${esc(techP(x))}</span>`:""}
      ${techA(x)?`<span class="line2"><b>${t("h_alt")}:</b> ${esc(techA(x))}</span>`:""}
      ${(st=>`<span class="line2"><b>${t("t_vsum")}:</b> ${fmt(st.sum)} · <b>${t("t_vavg")}:</b> ${fmt(st.avg)} · <b>${t("entryL")}:</b> ${st.entry.toLocaleString(state.lang,{minimumFractionDigits:1,maximumFractionDigits:1})}/5</span>`)(techStats(x))}
      <span class="lbl">${t("h_where")}</span>
      <span class="leads">${x.r.map(id=>{const r=ROLES.find(y=>y.id===id); if(!r) return "";
        const w0=state.region==="waw", lv=k=>w0?wawPay(r,k,0):(r.pl[k]&&r.pl[k][0]);
        const jn=lv("jun"), md=lv("mid"), sn=lv("sen");
        const pay=(jn||md||sn)
          ? `${t("junior")} ${jn?money(jn):"—"} · ${t("mid")} ${md?money(md):"—"} · ${t("senior")} ${sn?money(sn):"—"}`
          : "";
        const p=plCount(r), w=wawCount(r);
        const vac=p?`PL ≈ ${fmt(p)} · ${t("waw")} ≈ ${fmt(w)}` : "";
        return `<button class="rolechip lead" data-id="${id}">
            <b>${tr(r,"name")}</b>
            ${pay?`<small class="lead-pay">${pay}</small>`:""}
            ${vac?`<small class="lead-vac">${vac}</small>`:""}
          </button>`;}).join("")}</span>
    </div>`).join("");
}
