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

function renderTech(){
  let list=TECHS.filter(x=>state.kind==="all"||x.k===state.kind);

  // фильтр по группе направлений, куда технология ведёт
  if(state.tGroup!=="all"){
    list=list.filter(x=>x.r.some(id=>{const r=ROLES.find(y=>y.id===id);return r&&r.cat===state.tGroup;}));
  }

  // поиск
  const s=state.tq.trim().toLowerCase();
  if(s) list=list.filter(x=>(x.n+" "+x.w+" "+x.a+" "+techW(x)+" "+techA(x)).toLowerCase().includes(s));

  // сортировка
  const by={
    name:(a,b)=>a.n.localeCompare(b.n,state.lang),
    roles:(a,b)=>b.r.length-a.r.length||a.n.localeCompare(b.n),
    pay:(a,b)=>techTopPay(b)-techTopPay(a)||a.n.localeCompare(b.n),
  }[state.tSort]||((a,b)=>a.n.localeCompare(b.n));
  list=list.slice().sort(by);

  $("tcount").textContent=`${t("shown")} ${list.length} / ${TECHS.length}`;
  $("tgrid").innerHTML=list.map(x=>`<div class="role" style="cursor:default">
      <span class="top"><span class="nm">${esc(x.n)}</span>
        <span class="tagx" style="color:${C.amber};border:1px solid ${C.amber}55">${esc(kindName(x.k))}</span></span>
      <span class="tg" style="color:#C2D2EA">${esc(techW(x))}</span>
      ${techP(x)?`<span class="line2" style="color:${C.lime}">${esc(techP(x))}</span>`:""}
      ${techA(x)?`<span class="line2"><b>${t("h_alt")}:</b> ${esc(techA(x))}</span>`:""}
      <span class="lbl">${t("h_where")}</span>
      <span class="leads">${x.r.map(id=>{const r=ROLES.find(y=>y.id===id); if(!r) return "";
        const jn=r.pl.jun&&r.pl.jun[0], md=r.pl.mid&&r.pl.mid[0], sn=r.pl.sen&&r.pl.sen[0];
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
