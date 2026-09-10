/* =============================================================
   Точка входа: обработчики событий и первичный рендер
   -------------------------------------------------------------
   renderAll  — перерисовать всё сразу (при смене языка).
   applyLang  — сменить язык: лениво подгрузить его файл перевода,
                выставить <html lang/dir>, перерисовать.
   Дальше — слушатели на переключатели, фильтры, поиск, сетки
   и модальное окно. В конце — первый рендер.
   Этот файл подключается ПОСЛЕДНИМ.
   ============================================================= */

function renderAll(){renderChrome();renderRegions();renderCats();renderGrid();renderKinds();renderTech();}

/* смена языка с ленивой подгрузкой перевода */
function applyLang(code){
  loadLang(code, () => {
    state.lang = code;
    const meta = LANG_BY_CODE[code] || {};
    document.documentElement.lang = code;
    document.documentElement.dir = meta.dir || "ltr";
    renderAll();
    if (state.open) renderModal();
  });
}

$("lang").addEventListener("change",e=>applyLang(e.target.value));
$("modes").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(!b)return;state.mode=b.dataset.m;renderChrome();});
$("regions").addEventListener("click",e=>{const b=e.target.closest("[data-r]");if(!b)return;
  state.region=b.dataset.r;renderRegions();renderGrid();if(state.open)renderModal();});
$("cats").addEventListener("click",e=>{const b=e.target.closest("[data-c]");if(!b)return;state.cat=b.dataset.c;renderCats();renderGrid();});
$("kinds").addEventListener("click",e=>{const b=e.target.closest("[data-k]");if(!b)return;state.kind=b.dataset.k;renderKinds();renderTech();});
$("q").addEventListener("input",e=>{state.q=e.target.value;renderGrid();});
$("tq").addEventListener("input",e=>{state.tq=e.target.value;renderTech();});
$("tech").addEventListener("change",e=>{state.tech=e.target.value;renderGrid();});
$("sort").addEventListener("change",e=>{state.sort=e.target.value;renderGrid();});

/* дополнительные фильтры (режим «По направлениям») */
$("fai").addEventListener("change",e=>{state.fAi=e.target.value;renderGrid();});
$("fentry").addEventListener("change",e=>{state.fEntry=e.target.value;renderGrid();});
$("flearn").addEventListener("change",e=>{state.fLearn=e.target.value;renderGrid();});

/* фильтры режима «По технологиям» */
$("tgroup").addEventListener("change",e=>{state.tGroup=e.target.value;renderTech();});
$("tsort").addEventListener("change",e=>{state.tSort=e.target.value;renderTech();});

/* выбор валюты — пересчитываем зарплаты в списке, техно-режиме и модалке */
$("cur").addEventListener("change",e=>{state.cur=e.target.value;renderGrid();renderTech();if(state.open)renderModal();});

$("reset").addEventListener("click",()=>{state.cat="all";state.q="";state.tech="all";state.sort="demand";
  state.fAi="all";state.fEntry="all";state.fLearn="all";
  $("q").value="";renderChrome();renderCats();renderGrid();});

$("grid").addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(!b)return;
  state.open=b.dataset.id;state.tab="about";renderModal();});
$("tgrid").addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(!b)return;
  state.open=b.dataset.id;state.tab="about";renderModal();});
$("modal").addEventListener("click",e=>{
  if(e.target.closest("#closeBtn")){state.open=null;renderModal();return;}
  const tb=e.target.closest("[data-t]"); if(tb){state.tab=tb.dataset.t;renderModal();return;}
  const tc=e.target.closest("[data-tech]");
  if(tc){state.open=null;renderModal();state.mode="tech";state.kind="all";state.tq=tc.dataset.tech;
    $("tq").value=tc.dataset.tech;renderChrome();renderKinds();renderTech();window.scrollTo(0,0);}});
$("ov").addEventListener("click",e=>{if(e.target.id==="ov"){state.open=null;renderModal();}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&state.open){state.open=null;renderModal();}});

renderAll();
