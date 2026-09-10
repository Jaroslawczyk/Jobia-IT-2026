/* =============================================================
   renderRegions — кнопки регионов и блок фактов о рынке
   Перерисовывается при смене региона.
   ============================================================= */

function renderRegions(){
  $("regions").innerHTML = REGIONS.map(r=>
    `<button class="region ${state.region===r.id?"on":""}" data-r="${r.id}"><b>${t(r.id)}</b><span>${t(r.id+"_s")}</span></button>`).join("");
  const reg=REGIONS.find(r=>r.id===state.region);
  $("factsTitle").textContent = t("market")+": "+t(reg.id);
  $("factsList").innerHTML = trFacts(reg.id).map(f=>`<li><i>▸</i><span>${esc(f)}</span></li>`).join("");
}
