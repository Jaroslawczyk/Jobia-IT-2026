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

/* «сбросить фильтры»: возвращает фильтры, поиск и сортировку режима к исходным
   и выключает «только избранные» (звёздочки при этом не снимаются) */
function resetFilters(mode){
  if(mode==="roles"){
    Object.assign(state,{cat:"all",q:"",tech:"all",sort:"demand",fAi:"all",fEntry:"all",fLearn:"all",fNTech:"all"});
    $("q").value="";
  } else {
    Object.assign(state,{kind:"all",tq:"",tGroup:"all",tSort:"name",tVSum:"all",tVAvg:"all",tNRoles:"all",tEntry:"all"});
    $("tq").value="";
  }
  state.onlyFav=false; saveFav();
  renderAll();
}

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

on("lang","change",e=>applyLang(e.target.value));
on("modes","click",e=>{const b=e.target.closest("[data-m]");if(!b)return;state.mode=b.dataset.m;renderChrome();});
on("regions","click",e=>{const b=e.target.closest("[data-r]");if(!b)return;
  state.region=b.dataset.r;renderRegions();renderMarkBtns();renderGrid();renderTech();if(state.open)renderModal();});
on("cats","click",e=>{const b=e.target.closest("[data-c]");if(!b)return;state.cat=b.dataset.c;renderCats();renderGrid();});
on("kinds","click",e=>{const b=e.target.closest("[data-k]");if(!b)return;state.kind=b.dataset.k;renderKinds();renderTech();});
on("q","input",e=>{state.q=e.target.value;renderGrid();});
on("tq","input",e=>{state.tq=e.target.value;renderTech();});
on("tech","change",e=>{state.tech=e.target.value;renderGrid();});
on("sort","change",e=>{state.sort=e.target.value;renderGrid();});

/* дополнительные фильтры (режим «По направлениям») */
on("fai","change",e=>{state.fAi=e.target.value;renderGrid();});
on("fentry","change",e=>{state.fEntry=e.target.value;renderGrid();});
on("flearn","change",e=>{state.fLearn=e.target.value;renderGrid();});
on("fntech","change",e=>{state.fNTech=e.target.value;renderGrid();});

/* фильтры режима «По технологиям» */
on("tgroup","change",e=>{state.tGroup=e.target.value;renderTech();});
on("treset","click",()=>resetFilters("tech"));
on("tsort","change",e=>{state.tSort=e.target.value;renderTech();});
on("tvsum","change",e=>{state.tVSum=e.target.value;renderTech();});
on("tvavg","change",e=>{state.tVAvg=e.target.value;renderTech();});
on("tnroles","change",e=>{state.tNRoles=e.target.value;renderTech();});
on("tentry","change",e=>{state.tEntry=e.target.value;renderTech();});

/* выбор валюты — пересчитываем зарплаты в списке, техно-режиме и модалке */
on("cur","change",e=>{state.cur=e.target.value;renderGrid();renderTech();if(state.open)renderModal();});

on("reset","click",()=>resetFilters("roles"));

/* красная звёздочка: отметить «убрать» / снять отметку */
function onStar(e){const s=e.target.closest("[data-star],[data-fav]");if(!s)return false;
  e.stopPropagation();e.preventDefault();
  if(s.dataset.fav!=null) toggleFav(s.dataset.fav); else toggleMark(s.dataset.star);
  renderMarkBtns();renderGrid();renderTech();return true;}
function onPlBtn(){state.plMode=state.plMode==="hide"?"dim":"hide";savePlMode();renderMarkBtns();renderGrid();renderTech();}
on("plmode","click",onPlBtn);
on("tplmode","click",onPlBtn);
function onFavBtn(){state.onlyFav=!state.onlyFav;saveFav();renderMarkBtns();renderGrid();renderTech();}
on("fav","click",onFavBtn);
on("tfav","click",onFavBtn);
function onMarkBtn(){state.hideMarked=!state.hideMarked;saveMarks();renderMarkBtns();renderGrid();renderTech();}
on("mark","click",onMarkBtn);
on("tmark","click",onMarkBtn);

on("grid","click",e=>{if(onStar(e))return;const b=e.target.closest("[data-id]");if(!b)return;
  state.open=b.dataset.id;state.tab="about";renderModal();});
on("tgrid","click",e=>{if(onStar(e))return;const b=e.target.closest("[data-id]");if(!b)return;
  state.open=b.dataset.id;state.tab="about";renderModal();});
on("modal","click",e=>{
  if(e.target.closest("#closeBtn")){state.open=null;renderModal();return;}
  const tb=e.target.closest("[data-t]"); if(tb){state.tab=tb.dataset.t;renderModal();return;}
  const tc=e.target.closest("[data-tech]");
  if(tc){state.open=null;renderModal();state.mode="tech";state.kind="all";state.tq=tc.dataset.tech;
    $("tq").value=tc.dataset.tech;renderChrome();renderKinds();renderTech();window.scrollTo(0,0);}});
on("ov","click",e=>{if(e.target.id==="ov"){state.open=null;renderModal();}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&state.open){state.open=null;renderModal();}});

renderAll();
