/* =============================================================
   Языковые справочники (базовые ru/en/pl)
   CATN   — названия групп направлений (CATS).
   AIWORD — словесная шкала риска ИИ (очень низкий … очень высокий).
   Список языков — в js/data/i18n/registry.js (LANGS).
   Для прочих языков эти словари приходят в js/i18n/<code>.js.
   ============================================================= */

const CATN = {"ru": {"dev": "Разработка", "data": "Данные и AI", "infra": "Инфраструктура", "sec": "Безопасность", "qa": "Качество", "prod": "Продукт и управление", "biz": "Enterprise и поддержка"}, "en": {"dev": "Development", "data": "Data & AI", "infra": "Infrastructure", "sec": "Security", "qa": "Quality", "prod": "Product & management", "biz": "Enterprise & support"}, "pl": {"dev": "Programowanie", "data": "Dane i AI", "infra": "Infrastruktura", "sec": "Bezpieczeństwo", "qa": "Jakość", "prod": "Produkt i zarządzanie", "biz": "Enterprise i wsparcie"}, "uk": {"dev": "Розробка", "data": "Дані та AI", "infra": "Інфраструктура", "sec": "Безпека", "qa": "Якість", "prod": "Продукт і управління", "biz": "Enterprise і підтримка"}, "de": {"dev": "Entwicklung", "data": "Daten & KI", "infra": "Infrastruktur", "sec": "Sicherheit", "qa": "Qualität", "prod": "Produkt & Management", "biz": "Enterprise & Support"}, "es": {"dev": "Desarrollo", "data": "Datos e IA", "infra": "Infraestructura", "sec": "Seguridad", "qa": "Calidad", "prod": "Producto y gestión", "biz": "Enterprise y soporte"}};
const AIWORD = {"ru": ["очень низкий", "низкий", "средний", "высокий", "очень высокий"], "en": ["very low", "low", "medium", "high", "very high"], "pl": ["bardzo niskie", "niskie", "średnie", "wysokie", "bardzo wysokie"]};
