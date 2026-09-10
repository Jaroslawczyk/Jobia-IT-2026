/* =============================================================
   Содержимое вкладок карточки направления
   -------------------------------------------------------------
   Все тексты берутся через помощники локализации (js/core/i18n.js):
   tr / trAI / trStack / trExtra / trCerts / trTracks / trFw /
   trTools / trDay / trAlt / trPlNote / trEuText / trWorldText.
   Числовые зарплаты — через money() (учитывает валюту).

   salaryTable / salaryAll — зарплаты (таблица + разбивка по регионам).
   demandAll — вакансии и спрос по регионам.
   skillsTab — навыки (с оценкой времени), инструменты, языки, сертификаты.
   stackTab  — ветки внутри направления, выбор фреймворка, связанные технологии.
   aiTab     — риск замены ИИ.
   dayTab    — «Один день»: как выглядит работа изнутри.
   tabBody   — выбирает нужную вкладку по state.tab.
   TABS      — список вкладок (id + ключ перевода заголовка).
   ============================================================= */

/* примечание о валюте: показываем только когда выбран не PLN */
function curFine(){
  if(state.cur==="PLN") return "";
  return `<div class="fine">${t("curNote")} ${esc(CURRENCY.updated)} · 1 PLN ≈ ${curObj().rate} ${curObj().code}</div>`;
}

function salaryTable(r){
  const pl=r.pl;
  if(pl.approx) return `<div style="font-size:14px;line-height:1.6">${esc(pl.approx)}</div><div class="fine">${esc(trPlNote(r)||"")}</div>`;
  const rows=[[t("junior"),pl.jun],[t("mid"),pl.mid],[t("senior"),pl.sen],[t("row_avg"),pl.avg],[t("row_max"),pl.max]];
  return `<table><tr><th>—</th><th>UoP</th><th>B2B</th></tr>${rows.map((x,i)=>`<tr class="${i>2?"sub":""}">
    <td>${x[0]}</td><td class="${i>2?"":"u"}">${x[1]&&x[1][0]!=null?money(x[1][0]):"—"}</td>
    <td class="${i>2?"":"b"}">${x[1]&&x[1][1]!=null?money(x[1][1]):"—"}</td></tr>`).join("")}</table>
    <div class="fine">${t("fn_salary")}</div>
    ${curFine()}
    ${trPlNote(r)?`<div class="note">${esc(trPlNote(r))}</div>`:""}`;
}
const regBlock=(id,title,html)=>`<div class="regbox ${state.region===id?"now":""}"><h5>${title}</h5><div class="t">${html}</div></div>`;

function salaryAll(r){
  const waw=r.pl.approx?`<div>${esc(r.pl.approx)}</div>`:
    `<div>${t("junior")} <b class="u">${r.pl.jun&&r.pl.jun[0]?money(r.pl.jun[0]):"—"}</b> · ${t("mid")} <b class="u">${r.pl.mid&&r.pl.mid[0]?money(r.pl.mid[0]):"—"}</b> · ${t("senior")} <b class="u">${r.pl.sen&&r.pl.sen[0]?money(r.pl.sen[0]):"—"}</b></div>`;
  return regBlock("pl",t("pl"),salaryTable(r))
   +regBlock("waw",t("waw"),waw+`<div class="fine">${t("fn_waw_pay")}</div><div class="fine">${esc(trExtra(r,"wawNote")||"")}</div>`)
   +regBlock("eu",t("eu"),esc(trExtra(r,"euPay"))+`<div class="fine">${t("fn_eu_pay")}</div>`)
   +regBlock("world",t("world"),esc(trExtra(r,"usPay"))+`<div class="fine">${t("fn_world_pay")}</div>`);
}

function demandAll(r){
  const pc=plCount(r), wc=wawCount(r);
  return regBlock("pl",t("pl"),`<div class="kv">
      <div class="box"><span class="lbl">${t("share")}</span><div class="big">${r.pl.share!=null?r.pl.share+"%":"—"}</div></div>
      <div class="box"><span class="lbl">${t("offers")}</span><div class="big">${pc?"≈ "+fmt(pc):"—"}</div></div>
      <div class="box" style="flex:2"><span class="lbl">2025</span><div style="font-size:13px;margin-top:4px;line-height:1.5">${esc(trPlYoy(r))}</div></div>
    </div><div class="fine">${t("fn_demand_pl")}</div>`)
   +regBlock("waw",t("waw"),`<div class="kv"><div class="box"><span class="lbl">${t("offers")}</span><div class="big">${wc?"≈ "+fmt(wc):"—"}</div></div>
      <div class="box" style="flex:2"><span class="lbl">${t("lbl_capshare")}</span><div style="font-size:13px;margin-top:4px;line-height:1.5">${t("fn_waw_jobs")}</div></div></div>
      <div class="t">${esc(trExtra(r,"wawNote")||"")}</div><div class="fine">${t("fn_waw_jobs2")}</div>`)
   +regBlock("eu",t("eu"),esc(trExtra(r,"euJobs"))+`<div class="fine">${t("fn_eu_jobs")}</div>`)
   +regBlock("world",t("world"),esc(trExtra(r,"usJobs"))+`<div class="fine">${t("fn_world_jobs")}</div>`);
}

function skillsTab(r){
  const stack=trStack(r);
  const acc={pl:"techPL",waw:"techPL",eu:"techEU",world:"techWorld"}[state.region];
  const grp=(l,title,color)=>{
    const items=stack.filter(s=>s.l===l); if(!items.length) return "";
    return `<div class="grp"><b style="color:${color}">${title}</b><span></span></div>`+
      items.map((s,i)=>{const alt=trAlt(s.n); const w=skillWeeks(s);
        return `<div class="skill"><div class="r"><span class="n">${i+1}. ${esc(s.n)}</span>
            <span class="lt lt--sm">${t("learnZero")} ${weeksToText(w.zero)} <span class="lt-sep">·</span> ${t("learnStack")} ${weeksToText(w.stack)}</span></div>
          <div class="d">${esc(s.d)}</div>${alt?`<div class="a"><b style="color:${C.dim}">${t("h_alt")}:</b> ${alt.map(esc).join("<br>")}</div>`:""}</div>`;}).join("");
  };
  const rw=roleWeeks(r);
  return `<div class="box" style="margin-bottom:8px;border-color:${C.lime}44"><h4 style="color:${C.lime}">${t("h_learn")}</h4>
      <div style="font-size:14px;line-height:1.7">
        <b>${t("learnZero")}:</b> ${weeksToText(rw.zero)} &nbsp;·&nbsp; <b>${t("learnStack")}:</b> ${weeksToText(rw.stack)}</div>
      <div class="fine">${t("fn_learn")}</div></div>
    <div class="box" style="margin-bottom:6px"><h4 style="color:${C.cyan}">${t("h_accent")} · ${t(state.region)}</h4>
      <div style="font-size:13px;line-height:1.6">${esc(trExtra(r,acc))}</div></div>
    ${grp("core",t("h_core"),C.mag)}${grp("must",t("h_must"),C.cyan)}${grp("good",t("h_good"),C.lime)}${grp("plus",t("h_plus"),C.amber)}
    <div class="grp"><b style="color:${C.amber}">${t("h_tools")}</b><span></span></div>
    <div class="box" style="font-size:13px;line-height:1.6">${esc(trTools(r))}</div>
    <div class="grp"><b style="color:${C.amber}">${t("h_lang")}</b><span></span></div>
    <div class="box" style="font-size:13px;line-height:1.6">${esc(trExtra(r,"lang"))}
      <div class="fine">${t("fn_cefr")}</div></div>
    <div class="grp"><b style="color:${C.lime}">${t("h_certs")}</b><span></span></div>
    <div class="box"><ul style="margin:0;padding-left:18px;display:grid;gap:6px;font-size:13px;line-height:1.5">
      ${trCerts(r).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>`;
}

function stackTab(r){
  const tracks=trTracks(r), fw=trFw(r);
  let h="";
  if(tracks){ h+=`<div class="grp"><b style="color:${C.cyan}">${t("h_tracks")}</b><span></span></div>
    <div class="fine" style="margin-bottom:10px">${esc(tracks.note)}</div>`+
    tracks.items.map(x=>`<div class="trk"><b>${esc(x.n)}</b><div class="d">${esc(x.d)}</div>
      ${x.pl?`<div class="p">${t("pl")}: ${esc(x.pl)}</div>`:""}</div>`).join("");
  } else h+=`<div class="box">${t("fn_nostack")}</div>`;
  if(fw) h+=`<div class="grp"><b style="color:${C.lime}">${t("h_fw")}</b><span></span></div>
    <div class="box"><ul style="margin:0;padding-left:18px;display:grid;gap:8px;font-size:13px;line-height:1.5">
    ${fw.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`;
  const tl=techsOfRole(r.id);
  if(tl.length) h+=`<div class="grp"><b style="color:${C.amber}">${t("byTech")}</b><span></span></div>
    <div class="techs">${tl.map(x=>`<button class="rolechip" data-tech="${esc(x.n)}">${esc(x.n)}</button>`).join("")}</div>`;
  return h;
}

function aiTab(r){
  const c=aiColor(r.ai.lvl);
  return `<div class="box" style="border-color:${c}55;margin-bottom:14px">
      <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap">
        ${meter(r.ai.lvl,c)}<b style="color:${c};font-size:15px">${t("aiL")}: ${aiWord(r.ai.lvl)}</b></div></div>
    <div class="box" style="margin-bottom:10px"><h4 style="color:${C.cyan}">${t("ai_auto")}</h4>
      <div style="font-size:13.5px;line-height:1.6">${esc(trAI(r,"who"))}</div></div>
    <div class="box" style="margin-bottom:10px"><h4 style="color:${C.red}">${t("ai_danger")}</h4>
      <div style="font-size:13.5px;line-height:1.6">${esc(trAI(r,"risk"))}</div></div>
    <div class="box"><h4 style="color:${C.lime}">${t("ai_safe")}</h4>
      <div style="font-size:13.5px;line-height:1.6">${esc(trAI(r,"safe"))}</div></div>
    <div class="fine">${t("fn_ai")}</div>`;
}

/* вкладка «Один день» — взгляд на работу изнутри */
function dayTab(r){
  const d=trDay(r);
  if(!d||!d.text) return `<div class="box">—</div>`;
  return `<div class="box" style="margin-bottom:12px;border-color:${C.cyan}44">
      <h4 style="color:${C.cyan}">${t("d_inside")}</h4>
      <p style="margin:0;font-size:14px;line-height:1.7">${esc(d.text)}</p></div>
    <div class="grp"><b style="color:${C.amber}">${t("d_moments")}</b><span></span></div>
    <div class="box"><ul style="margin:0;padding-left:18px;display:grid;gap:9px;font-size:13.5px;line-height:1.55">
      ${d.moments.map(m=>`<li>${esc(m)}</li>`).join("")}</ul></div>`;
}

function tabBody(r){
  const cat=catOf(r.cat);
  if(state.tab==="about") return `<p>${esc(tr(r,"about"))}</p>
    <div class="box"><h4 style="color:${C.amber}">${t("howin")}</h4>
    <div style="font-size:13.5px;line-height:1.6">${esc(tr(r,"path"))}</div></div>`;
  if(state.tab==="day")    return ruOnly()+dayTab(r);
  if(state.tab==="skills") return ruOnly()+skillsTab(r);
  if(state.tab==="stack")  return ruOnly()+stackTab(r);
  if(state.tab==="salary") return ruOnly()+salaryAll(r);
  if(state.tab==="demand") return ruOnly()+demandAll(r);
  if(state.tab==="ai")     return aiTab(r);
  if(state.tab==="pros") return `<div class="two">
    <div class="pros"><h4 style="color:${C.lime}">+</h4><ul>${trList(r,"pros").map(p=>`<li><span style="color:${C.lime}">+</span><span>${esc(p)}</span></li>`).join("")}</ul></div>
    <div class="cons"><h4 style="color:${C.mag}">−</h4><ul>${trList(r,"cons").map(p=>`<li><span style="color:${C.mag}">−</span><span>${esc(p)}</span></li>`).join("")}</ul></div></div>`;
  return `<div class="box" style="margin-bottom:14px"><h4 style="color:${C.amber}">${t("h_passive")}</h4>
      ${trList(r,"passive").map(p=>`<div style="color:var(--dim);font-size:13.5px;line-height:1.55">· ${esc(p)}</div>`).join("")}</div>
    <div class="box" style="background:linear-gradient(120deg,${cat.color}18,transparent);border-color:${cat.color}44">
      <h4 style="color:${cat.color}">${t("h_ult")}</h4><div style="font-size:14.5px;line-height:1.6">${esc(tr(r,"ult"))}</div></div>`;
}

const TABS=[["about","t_about"],["day","t_day"],["skills","t_skills"],["stack","t_stack"],["salary","t_salary"],
  ["demand","t_demand"],["ai","t_ai"],["pros","t_pros"],["passive","t_passive"]];
