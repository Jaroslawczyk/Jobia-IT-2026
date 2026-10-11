/* =============================================================
   WAW_PAY — реальные варшавские ориентиры по направлениям
   -------------------------------------------------------------
   Показываются во вкладке «Зарплаты», в блоке «Варшава», рядом с
   расчётной вилкой (польская медиана × WAW_K из config.js).
   Только опубликованные цифры, с источником; ru / en / pl.
   Источники (2026):
     • «Warszawa. Talenty i rynek pracy 2026» — отчёт города,
       объявления за 04.2025–04.2026;
     • No Fluff Jobs — анализ зарплат по городам, сентябрь 2026;
     • JobHunt.pl — медианы вилок по технологиям, 2026;
     • Antal — Raport płacowy 2026 (общепольский).
   ============================================================= */

const WAW_PAY = {
  frontend: {
    ru: "JavaScript: Варшава платит больше всех городов (JobHunt, 2026), но и конкуренция максимальная — 146 CV на junior-вакансию во фронте (No Fluff Jobs).",
    en: "JavaScript: Warsaw pays more than any other city (JobHunt, 2026), but competition peaks too — 146 CVs per junior frontend opening (No Fluff Jobs).",
    pl: "JavaScript: Warszawa płaci najwięcej ze wszystkich miast (JobHunt, 2026), ale konkurencja też jest największa — 146 CV na ofertę juniorską we Frontendzie (No Fluff Jobs).",
  },
  fullstack: {
    ru: "JavaScript: самые высокие вилки в стране — в Варшаве (JobHunt, 2026).",
    en: "JavaScript: the highest bands in the country are in Warsaw (JobHunt, 2026).",
    pl: "JavaScript: najwyższe widełki w kraju są w Warszawie (JobHunt, 2026).",
  },
  go: {
    ru: "Go: Варшава — самый высокооплачиваемый город, средняя верхняя вилка 29 058 zł (JobHunt, 2026).",
    en: "Go: Warsaw is the best-paying city, average upper band 29,058 zł (JobHunt, 2026).",
    pl: "Go: Warszawa to najlepiej płacące miasto, średnia górna widełka 29 058 zł (JobHunt, 2026).",
  },
  "data-eng": {
    ru: "BigQuery: Варшава платит больше всех — ≈27 тыс. zł верхней вилки (JobHunt, 2026). Data — одна из трёх зон роста столицы (отчёт города).",
    en: "BigQuery: Warsaw pays the most — ≈27k zł upper band (JobHunt, 2026). Data is one of the capital's three growth areas (city report).",
    pl: "BigQuery: Warszawa płaci najwięcej — ok. 27 tys. zł górnej widełki (JobHunt, 2026). Data to jeden z trzech obszarów wzrostu stolicy (raport miasta).",
  },
  "data-analyst": {
    ru: "Data — одна из трёх зон роста Варшавы (отчёт «Warszawa. Talenty i rynek pracy 2026»); основной работодатель — банки и SSC.",
    en: "Data is one of Warsaw's three growth areas (\"Warszawa. Talenty i rynek pracy 2026\"); the main employers are banks and SSCs.",
    pl: "Data to jeden z trzech obszarów wzrostu Warszawy (raport „Warszawa. Talenty i rynek pracy 2026”); główni pracodawcy to banki i SSC.",
  },
  "data-science": {
    ru: "Data и AI — зоны роста Варшавы (отчёт города, 2026).",
    en: "Data and AI are Warsaw growth areas (city report, 2026).",
    pl: "Data i AI to obszary wzrostu Warszawy (raport miasta, 2026).",
  },
  aiml: {
    ru: "ML/AI Engineer в Варшаве: 22–40 тыс. zł в месяц (отчёт города, 2026). AI — одна из трёх зон роста столицы.",
    en: "ML/AI Engineer in Warsaw: 22–40k zł a month (city report, 2026). AI is one of the capital's three growth areas.",
    pl: "ML/AI Engineer w Warszawie: 22–40 tys. zł miesięcznie (raport miasta, 2026). AI to jeden z trzech obszarów wzrostu stolicy.",
  },
  mlops: {
    ru: "Senior MLOps: 29–35 тыс. zł (Antal 2026, по Польше); в Варшаве — верх этой вилки. ML/AI Engineer в столице 22–40 тыс. zł (отчёт города).",
    en: "Senior MLOps: 29–35k zł (Antal 2026, Poland-wide); Warsaw sits at the top of that band. ML/AI Engineer in the capital 22–40k zł (city report).",
    pl: "Senior MLOps: 29–35 tys. zł (Antal 2026, cała Polska); Warszawa w górnej części widełek. ML/AI Engineer w stolicy 22–40 tys. zł (raport miasta).",
  },
  security: {
    ru: "Cyber — зона роста Варшавы. Самая высокая вилка в отчёте города — CISO: 35–50 тыс. zł брутто на UoP (2026).",
    en: "Cyber is a Warsaw growth area. The highest band in the city report is CISO: 35–50k zł gross on UoP (2026).",
    pl: "Cyber to obszar wzrostu Warszawy. Najwyższe widełki w raporcie miasta ma CISO: 35–50 tys. zł brutto na UoP (2026).",
  },
  grc: {
    ru: "Потолок карьеры — CISO: 35–50 тыс. zł брутто на UoP в Варшаве, самая высокая вилка в отчёте города (2026). Спрос держат банки под DORA.",
    en: "The career ceiling is CISO: 35–50k zł gross on UoP in Warsaw, the highest band in the city report (2026). Demand is driven by banks under DORA.",
    pl: "Sufit kariery to CISO: 35–50 tys. zł brutto na UoP w Warszawie, najwyższe widełki w raporcie miasta (2026). Popyt napędzają banki objęte DORA.",
  },
  architect: {
    ru: "Software Architect в Варшаве: 20–35 тыс. zł (отчёт города, 2026).",
    en: "Software Architect in Warsaw: 20–35k zł (city report, 2026).",
    pl: "Software Architect w Warszawie: 20–35 tys. zł (raport miasta, 2026).",
  },
  erp: {
    ru: "SAP S/4HANA Consultant в Варшаве: 20–35 тыс. zł (отчёт города, 2026). По стране ERP — самая высокооплачиваемая специализация (No Fluff Jobs).",
    en: "SAP S/4HANA Consultant in Warsaw: 20–35k zł (city report, 2026). Nationally ERP is the best-paid specialisation (No Fluff Jobs).",
    pl: "SAP S/4HANA Consultant w Warszawie: 20–35 tys. zł (raport miasta, 2026). W skali kraju ERP to najlepiej płatna specjalizacja (No Fluff Jobs).",
  },
  cloud: {
    ru: "Менеджеры сетей и облака — 31–39 тыс. zł, архитекторы — 25–30 тыс. zł (Antal 2026); в Варшаве — верхняя половина.",
    en: "Network and cloud managers — 31–39k zł, architects — 25–30k zł (Antal 2026); Warsaw is in the upper half.",
    pl: "Menedżerowie sieci i chmury — 31–39 tys. zł, architekci — 25–30 tys. zł (Antal 2026); Warszawa w górnej połowie.",
  },
  dba: {
    ru: "Urząd Pracy Варшавы прогнозирует на 2026 сильный спрос на экспертов по базам данных.",
    en: "Warsaw's labour office expects strong 2026 demand for database experts.",
    pl: "Urząd Pracy m.st. Warszawy prognozuje na 2026 silny popyt na ekspertów od baz danych.",
  },
  sysadmin: {
    ru: "Urząd Pracy Варшавы: в июне 2026 объявлений для администраторов систем стало меньше, для программистов и инженеров — больше.",
    en: "Warsaw's labour office: in June 2026 postings for system administrators fell, while those for developers and engineers rose.",
    pl: "Urząd Pracy m.st. Warszawy: w czerwcu 2026 ubyło ofert dla administratorów systemów, przybyło dla programistów i inżynierów.",
  },
};
