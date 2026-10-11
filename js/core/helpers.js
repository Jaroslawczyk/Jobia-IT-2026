/* =============================================================
   Мелкие утилиты
   $        — короткий getElementById.
   fmt      — число → строка с разделителями (12 345).
   esc      — экранирование HTML перед вставкой через innerHTML.
   srcLabel — подпись источника цифр по Польше.
   meter    — полоска-индикатор из закрашенных делений.
   cut      — аккуратно обрезать длинный текст по границе предложения.
   plCount / wawCount — расчёт числа вакансий по доле рынка
                        (Варшава — своя доля у каждого направления, r.pl.waw).
   wawPay   — вилка для Варшавы: польская × коэффициент WAW_K.
   senior / junior   — быстрый доступ к зарплате для сортировки.
   ============================================================= */

const $ = id => document.getElementById(id);
// навесить обработчик, если элемент есть (не роняет скрипт при устаревшем index.html из кэша)
const on = (id, ev, fn) => { const el = $(id); if (el) el.addEventListener(ev, fn); };
const fmt = n => n == null ? "—" : Math.round(n).toLocaleString("ru-RU");
const esc = s => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const srcLabel={jjit:{t:"justjoin.it 2026",c:C.lime},nfj:{t:"No Fluff Jobs 2025/26",c:C.lime},
  proxy:{t:"по смежной категории",c:C.amber},est:{t:"рыночная оценка",c:"#FF9A6C"}};
const meter=(v,color,max)=>{max=max||5;let h='<span class="meter">';
  for(let i=0;i<max;i++)h+=i<v?`<i style="background:${color};box-shadow:0 0 8px ${color}99"></i>`:"<i></i>";return h+"</span>";};
const cut=(s,n)=>{s=String(s||"");if(s.length<=n)return s;const p=s.slice(0,n);
  const k=Math.max(p.lastIndexOf(". "),p.lastIndexOf("; "));return k>40?p.slice(0,k+1):p.trim()+"…";};
const plCount=r=>r.pl.share!=null?TOTAL_OFFERS*r.pl.share/100:null;
const wawCount=r=>r.pl.share!=null?TOTAL_OFFERS*r.pl.share/100*(r.pl.waw!=null?r.pl.waw:WAW_SHARE):null;
// lvl: "jun" | "mid" | "sen", i: 0 = UoP, 1 = B2B
const wawPay=(r,lvl,i)=>{const v=r.pl[lvl]&&r.pl[lvl][i];return v==null?null:Math.round(v*WAW_K[lvl][i]/50)*50;};
/* диапазоны для фильтров: [id, от, до) */
const RANGES={
  vsum:[["1",0,1000],["2",1000,3000],["3",3000,5000],["4",5000,Infinity]],
  vavg:[["1",0,500],["2",500,1000],["3",1000,1500],["4",1500,Infinity]],
  nroles:[["1",1,2],["2",2,4],["3",4,6],["4",6,Infinity]],
  ntech:[["1",0,4],["2",4,8],["3",8,Infinity]],
  entry:[["low",0,2.5],["mid",2.5,3.5],["high",3.5,Infinity]],
};
const inRange=(kind,id,v)=>{const g=RANGES[kind].find(x=>x[0]===id);return !g||(v>=g[1]&&v<g[2]);};
const roleVac=r=>state.region==="waw"?wawCount(r):plCount(r);
const senior=r=>(r.pl.sen&&r.pl.sen[0])||0, junior=r=>(r.pl.jun&&r.pl.jun[0])||0;
