/* =============================================================
   renderModal — модальное окно карточки направления
   Шапка (группа, название, тег, индикаторы), полоса вкладок, тело вкладки.
   Пустой state.open закрывает окно и снимает блокировку прокрутки.
   ============================================================= */

function renderModal(){
  const r=ROLES.find(x=>x.id===state.open);
  if(!r){$("ov").classList.remove("on");document.body.style.overflow="";return;}
  const cat=catOf(r.cat), src=srcLabel[r.pl.src];
  $("modal").style.borderColor=cat.color+"55"; $("modal").style.boxShadow="0 0 60px "+cat.color+"22";
  $("modal").innerHTML=`<div class="mhead">
      <div style="display:flex;justify-content:space-between;gap:16px;align-items:flex-start">
        <div><div style="color:${cat.color};font-size:11px;letter-spacing:2px">${catName(r.cat).toUpperCase()}</div>
          <h2 style="text-shadow:0 0 14px ${cat.color}88">${tr(r,"name")}</h2>
          <div style="color:var(--dim);font-size:13px;margin-top:6px">${tr(r,"tag")}</div></div>
        <button class="close" id="closeBtn" aria-label="${t("close")}">✕</button></div>
      <div class="stats">
        <div><div class="lbl" style="margin-bottom:4px">${t("demandL")}</div>${meter(r.demand,C.lime)}</div>
        <div><div class="lbl" style="margin-bottom:4px">${t("entryL")}</div>${meter(r.entry,C.mag)}</div>
        <div><div class="lbl" style="margin-bottom:4px">${t("aiL")}</div>${meter(r.ai.lvl,aiColor(r.ai.lvl))}</div>
        <div><div class="lbl" style="margin-bottom:4px">${t("t_timeToEnter")}</div><span style="color:${C.lime};font-size:12px">${weeksToText(roleWeeks(r).zero)}</span></div>
        <div><div class="lbl" style="margin-bottom:4px">${t("srcPL")}</div><span style="color:${src.c};font-size:12px">${src.t}</span></div>
      </div></div>
    <div class="tabs">${TABS.map(([v,k])=>{const on=state.tab===v;
      const st=on?`background:${cat.color};border-color:${cat.color};color:#04070E`:`color:${cat.color}CC;border-color:${cat.color}44`;
      return `<button class="chip ${on?"on":""}" data-t="${v}" style="${st}">${t(k)}</button>`;}).join("")}</div>
    <div class="body">${tabBody(r)}</div>`;
  $("ov").classList.add("on"); document.body.style.overflow="hidden";
}
