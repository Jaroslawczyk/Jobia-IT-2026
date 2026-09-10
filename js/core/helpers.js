/* =============================================================
   Мелкие утилиты
   $        — короткий getElementById.
   fmt      — число → строка с разделителями (12 345).
   esc      — экранирование HTML перед вставкой через innerHTML.
   srcLabel — подпись источника цифр по Польше.
   meter    — полоска-индикатор из закрашенных делений.
   cut      — аккуратно обрезать длинный текст по границе предложения.
   plCount / wawCount — расчёт числа вакансий по доле рынка.
   senior / junior   — быстрый доступ к зарплате для сортировки.
   ============================================================= */

const $ = id => document.getElementById(id);
const fmt = n => n == null ? "—" : Math.round(n).toLocaleString("ru-RU");
const esc = s => String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const srcLabel={jjit:{t:"justjoin.it 2026",c:C.lime},nfj:{t:"No Fluff Jobs 2025/26",c:C.lime},
  proxy:{t:"по смежной категории",c:C.amber},est:{t:"рыночная оценка",c:"#FF9A6C"}};
const meter=(v,color,max)=>{max=max||5;let h='<span class="meter">';
  for(let i=0;i<max;i++)h+=i<v?`<i style="background:${color};box-shadow:0 0 8px ${color}99"></i>`:"<i></i>";return h+"</span>";};
const cut=(s,n)=>{s=String(s||"");if(s.length<=n)return s;const p=s.slice(0,n);
  const k=Math.max(p.lastIndexOf(". "),p.lastIndexOf("; "));return k>40?p.slice(0,k+1):p.trim()+"…";};
const plCount=r=>r.pl.share!=null?TOTAL_OFFERS*r.pl.share/100:null;
const wawCount=r=>r.pl.share!=null?TOTAL_OFFERS*r.pl.share/100*WAW_SHARE:null;
const senior=r=>(r.pl.sen&&r.pl.sen[0])||0, junior=r=>(r.pl.jun&&r.pl.jun[0])||0;
