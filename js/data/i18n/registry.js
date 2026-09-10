/* =============================================================
   LANGS — реестр языков интерфейса
   -------------------------------------------------------------
   code  — код языка (атрибут <html lang>)
   name  — самоназвание для переключателя
   dir   — направление письма ("ltr" / "rtl")
   file  — путь к файлу перевода содержимого; null = язык-основа
           (русский, тексты берутся прямо из js/data/*).

   Файлы перевода подгружаются ЛЕНИВО: только когда пользователь
   выбрал язык (js/core/i18n.js → loadLang). Поэтому открытие
   страницы не тянет мегабайты переводов.

   Полнота перевода отмечена полем `ready` внутри пакета (js/core/i18n.js
   и js/i18n/<code>.js): "full" — переведено всё; "cards" — интерфейс и
   лицевая часть карточек, глубокие справочные разделы — на английском.

   ru / en / pl — встроенные (file: null): собираются в js/core/i18n.js
   из уже загруженных данных. Остальные — отдельные файлы, грузятся лениво.
   ============================================================= */

const LANGS = [
  { code: "ru", name: "Русский",      dir: "ltr", file: null },
  { code: "en", name: "English",      dir: "ltr", file: null },
  { code: "pl", name: "Polski",       dir: "ltr", file: null },
  { code: "uk", name: "Українська",   dir: "ltr", file: "js/i18n/uk.js" },
  { code: "be", name: "Беларуская",   dir: "ltr", file: "js/i18n/be.js" },
  { code: "de", name: "Deutsch",      dir: "ltr", file: "js/i18n/de.js" },
  { code: "fr", name: "Français",     dir: "ltr", file: "js/i18n/fr.js" },
  { code: "pt", name: "Português",    dir: "ltr", file: "js/i18n/pt.js" },
  { code: "it", name: "Italiano",     dir: "ltr", file: "js/i18n/it.js" },
  { code: "cs", name: "Čeština",      dir: "ltr", file: "js/i18n/cs.js" },
  { code: "zh", name: "中文",          dir: "ltr", file: "js/i18n/zh.js" },
  { code: "hi", name: "हिन्दी",         dir: "ltr", file: "js/i18n/hi.js" },
  { code: "ar", name: "العربية",      dir: "rtl", file: "js/i18n/ar.js" },
  { code: "am", name: "አማርኛ",        dir: "ltr", file: "js/i18n/am.js" },
  { code: "ti", name: "ትግርኛ",        dir: "ltr", file: "js/i18n/ti.js" },
  { code: "om", name: "Afaan Oromoo", dir: "ltr", file: "js/i18n/om.js" },
];

const LANG_BY_CODE = Object.fromEntries(LANGS.map(l => [l.code, l]));
