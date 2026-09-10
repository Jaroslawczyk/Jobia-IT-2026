/* =============================================================
   renderCats — чипы-фильтры по группам направлений
   На каждом чипе — счётчик направлений в группе.
   ============================================================= */

function renderCats(){
  const items=[{id:"all",name:t("allDirs"),color:C.cyan}].concat(CATS.map(c=>({id:c.id,name:catName(c.id),color:c.color})));
  $("cats").innerHTML = items.map(c=>{
    const n=c.id==="all"?ROLES.length:ROLES.filter(r=>r.cat===c.id).length, on=state.cat===c.id;
    const st=on?`background:${c.color};border-color:${c.color};color:#04070E`:`color:${c.color}CC;border-color:${c.color}44`;
    return `<button class="chip ${on?"on":""}" data-c="${c.id}" style="${st}">${c.name}<small>${n}</small></button>`;}).join("");
}
