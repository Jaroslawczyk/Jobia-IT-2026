/* =============================================================
   ALT — альтернативы и требуемый уровень для конкретных технологий
   Ключ — название пункта из stack[].n у направления.
   Используется во вкладке «Навыки».
   ============================================================= */

const ALT = {
 "HTML + CSS": [
  "Tailwind, SCSS/Sass, CSS Modules как надстройки",
  "уровень: сверстать адаптивный макет без подсказок, знать grid и flex наизусть"
 ],
 "JavaScript (ES2020+)": [
  "альтернатив нет — это база фронта",
  "уровень: понимать event loop, промисы, прототипы, замыкания"
 ],
 "TypeScript": [
  "альтернатива — Flow, но она мертва",
  "уровень: дженерики, utility types, strict mode без any"
 ],
 "React": [
  "альтернативы: Vue 3, Angular 17+, Svelte, Solid",
  "уровень: React 18/19, хуки, мемоизация, серверные компоненты"
 ],
 "Next.js": [
  "альтернативы: Remix, Nuxt (Vue), Astro, SvelteKit",
  "уровень: App Router, SSR/SSG/ISR, кэширование"
 ],
 "Vue / Angular": [
  "Vue 3 + Pinia или Angular 17+ с сигналами; Angular чаще в банках"
 ],
 "Тесты": [
  "Jest или Vitest для юнитов; Playwright или Cypress для e2e",
  "уровень: покрывать логику, а не проценты"
 ],
 "REST / GraphQL": [
  "альтернативы: gRPC, tRPC",
  "уровень: понимать кэширование, ошибки, версионирование"
 ],
 "REST + gRPC/GraphQL": [
  "выбор зависит от компании: REST — везде, gRPC — во внутренних сервисах"
 ],
 "CI/CD + облако": [
  "GitHub Actions, GitLab CI, Jenkins, CircleCI"
 ],
 "AI-инструменты": [
  "Claude, Copilot, Cursor — как ускоритель, не замена пониманию"
 ],
 "Один основной язык": [
  "Java, C#, Python, Go, Node.js, PHP, Kotlin — выбирайте по рынку своего города"
 ],
 "SQL + модель данных": [
  "PostgreSQL как база; MySQL, MS SQL, Oracle в enterprise",
  "уровень: читать план запроса и чинить медленный JOIN"
 ],
 "Фреймворк": [
  "Spring Boot (Java), ASP.NET Core (C#), FastAPI/Django (Python), NestJS (Node), Laravel/Symfony (PHP)"
 ],
 "Очереди и кэш": [
  "Kafka или RabbitMQ; Redis или Memcached; в облаке — SQS, Pub/Sub"
 ],
 "Docker + Kubernetes": [
  "альтернативы Kubernetes: Nomad, ECS, Cloud Run — но K8s стандарт",
  "уровень: собрать образ, написать манифест, разобрать падающий под"
 ],
 "Облако": [
  "AWS, Azure, GCP; в Польше в корпорациях чаще Azure"
 ],
 "Микросервисы и паттерны": [
  "альтернатива — модульный монолит, сейчас снова в моде"
 ],
 "Наблюдаемость": [
  "Prometheus + Grafana, ELK, Datadog, OpenTelemetry"
 ],
 "TypeScript везде": [
  "альтернатива — Python или Java на бэке при React на фронте"
 ],
 "React / Next.js": [
  "альтернативы: Nuxt, SvelteKit, Astro"
 ],
 "Node.js или Python/Java": [
  "Node (NestJS/Express), Python (FastAPI/Django), Java (Spring Boot)"
 ],
 "PostgreSQL": [
  "альтернативы: MySQL, MariaDB, MS SQL; NoSQL — MongoDB для документов"
 ],
 "Auth и безопасность": [
  "Keycloak, Auth0, AWS Cognito; стандарты OAuth2/OIDC",
  "уровень: знать OWASP Top 10 наизусть"
 ],
 "Docker + деплой": [
  "Docker Compose локально, Kubernetes или PaaS (Render, Fly.io) в проде"
 ],
 "Облачные сервисы": [
  "S3/Blob Storage, SQS/Service Bus, Lambda/Functions"
 ],
 "Kotlin + Jetpack Compose": [
  "альтернатива — Java + XML-верстка (legacy-проекты)",
  "уровень: корутины, Flow, архитектура MVVM/MVI"
 ],
 "Swift + SwiftUI": [
  "альтернатива — Objective-C + UIKit в старых проектах",
  "уровень: async/await, Combine, работа с App Store Connect"
 ],
 "Flutter или React Native": [
  "Flutter (Dart) чаще в польских агентствах; React Native — если команда уже на JS",
  "альтернатива: Kotlin Multiplatform — растёт"
 ],
 "CI/CD для мобилок": [
  "Fastlane, Bitrise, Codemagic, GitHub Actions"
 ],
 "C++": [
  "альтернатива в геймдеве — C# на Unity",
  "уровень: C++17/20, управление памятью, шаблоны"
 ],
 "C# + Unity": [
  "альтернатива — C++ и Unreal, если целитесь в AAA",
  "уровень: Unity 6, ECS/DOTS для производительности"
 ],
 "Unity или Unreal": [
  "Unity — мобильные и инди; Unreal 5 — AAA и графика",
  "альтернативы: Godot (инди), собственные движки студий"
 ],
 "Мультиплеер": [
  "Photon, Mirror, Netcode for GameObjects; Unreal — встроенный репликационный слой"
 ],
 "Математика и 3D": [
  "векторы, кватернионы, матрицы; уровень школьной геометрии не хватит"
 ],
 "C": [
  "альтернативы для новых проектов: C++ и Rust",
  "уровень: указатели и работа с памятью без гугла"
 ],
 "C++ (17/20)": [
  "в automotive часто ограничен MISRA C++",
  "альтернатива — Rust в новых прошивках"
 ],
 "Архитектура MCU": [
  "STM32, ESP32, NXP, Nordic — выбирайте один и знайте глубоко"
 ],
 "RTOS": [
  "FreeRTOS, Zephyr, ThreadX; альтернатива — bare metal без ОС"
 ],
 "Протоколы": [
  "CAN и LIN в авто; I2C, SPI, UART на плате; MQTT и BLE в IoT"
 ],
 "Отладка железа": [
  "осциллограф, логический анализатор, JTAG/SWD, ST-Link"
 ],
 "Rust для embedded": [
  "Embassy, RTIC — экосистема ещё молодая"
 ],
 "Функциональная безопасность": [
  "ISO 26262 (авто), IEC 61508 (промышленность), DO-178C (авиация)"
 ],
 "C# + WPF/.NET": [
  "альтернативы: WinUI 3, Avalonia (кроссплатформа), MAUI"
 ],
 "C++ / Qt": [
  "альтернативы: JavaFX, Electron (если важна скорость разработки)"
 ],
 "Многопоточность": [
  "async/await, потоки, каналы — в зависимости от языка"
 ],
 "PHP 8.x": [
  "альтернатива на том же рынке — Node.js или Python",
  "уровень: PHP 8.2+, строгая типизация, PSR-стандарты"
 ],
 "Laravel или Symfony": [
  "Laravel — агентства и стартапы; Symfony — enterprise; альтернатива: Slim, API Platform"
 ],
 "MySQL/PostgreSQL": [
  "в e-commerce чаще MySQL/MariaDB; PostgreSQL в новых проектах"
 ],
 "Тесты (PHPUnit/Pest)": [
  "Pest — современная обёртка над PHPUnit"
 ],
 "E-commerce платформы": [
  "Magento 2, Shopware 6, PrestaShop; альтернатива — headless (Shopify + API)"
 ],
 "Go": [
  "альтернативы в той же нише: Rust (сложнее), Java (тяжелее)",
  "уровень: горутины, каналы, контексты, профилирование"
 ],
 "Распределённые системы": [
  "теория: CAP, консенсус, идемпотентность; практика: ретраи и таймауты"
 ],
 "Kubernetes": [
  "альтернативы: Nomad, ECS; уровень CKA — хороший ориентир"
 ],
 "gRPC + protobuf": [
  "альтернативы: REST + OpenAPI, GraphQL federation"
 ],
 "Scala": [
  "альтернативы для той же работы: Java + Spark, Python + Spark",
  "уровень: ZIO или Cats Effect, функциональные абстракции"
 ],
 "Apache Spark": [
  "альтернативы: Flink (стриминг), dbt + SQL-движки (batch)"
 ],
 "JVM изнутри": [
  "GC, heap, профилирование через JFR или async-profiler"
 ],
 "Kafka": [
  "альтернативы: Pulsar, RabbitMQ, AWS Kinesis, Google Pub/Sub"
 ],
 "Akka / reactive": [
  "альтернатива: ZIO, Pekko (форк Akka после смены лицензии)"
 ],
 "Ruby + Rails 7/8": [
  "альтернативы в нише быстрой разработки: Laravel, Django, Phoenix"
 ],
 "RSpec": [
  "альтернатива — Minitest, но RSpec стандарт рынка"
 ],
 "Hotwire / Turbo": [
  "альтернатива — React/Vue поверх Rails API"
 ],
 "GraphQL": [
  "альтернативы: REST + OpenAPI, tRPC"
 ],
 "SQL": [
  "диалекты: PostgreSQL, T-SQL, BigQuery SQL, Snowflake SQL",
  "уровень: оконные функции и CTE без подсказок"
 ],
 "Python": [
  "альтернатива в data — R или Scala, но Python доминирует",
  "уровень: pandas/polars, типизация, асинхронность"
 ],
 "Spark": [
  "альтернативы: Flink, Databricks Runtime, DuckDB для средних объёмов"
 ],
 "Airflow / dbt": [
  "альтернативы: Dagster, Prefect, Azure Data Factory, Mage"
 ],
 "Snowflake / Databricks / BigQuery": [
  "альтернативы: Redshift, Synapse, Microsoft Fabric, ClickHouse"
 ],
 "Data governance": [
  "Collibra, Alation, Unity Catalog; требования GDPR"
 ],
 "Microsoft Fabric": [
  "альтернатива тому же стеку: Databricks + Power BI"
 ],
 "Power BI или Tableau": [
  "альтернативы: Looker, Qlik, Metabase, Superset",
  "уровень: модель данных и DAX, а не только графики"
 ],
 "Excel/Sheets на уровне инструмента": [
  "сводные таблицы, Power Query; альтернатива — сразу SQL"
 ],
 "Python или R": [
  "R силён в академической статистике, Python — везде остальном"
 ],
 "Статистика": [
  "распределения, доверительные интервалы, A/B; уровень вводного университетского курса"
 ],
 "Cloud analytics": [
  "BigQuery, Redshift, Snowflake, Synapse"
 ],
 "GenAI в аналитике": [
  "LLM для генерации SQL и объяснения данных; проверка результатов обязательна"
 ],
 "Математика и статистика": [
  "линейная алгебра, теория вероятностей, оптимизация — уровень технического вуза"
 ],
 "ML-методы": [
  "scikit-learn, XGBoost/LightGBM, метрики качества",
  "альтернатива для табличных данных: обычная регрессия часто выигрывает"
 ],
 "Эксперименты": [
  "A/B-платформы, causal inference, power analysis"
 ],
 "MLOps-минимум": [
  "MLflow, модельный реестр, мониторинг качества"
 ],
 "PyTorch / TensorFlow": [
  "PyTorch доминирует в исследованиях и всё чаще в проде; JAX — ниша"
 ],
 "LLM и GenAI": [
  "OpenAI, Anthropic, open-weight модели (Llama, Mistral, Qwen)",
  "инструменты: LangChain, LlamaIndex, векторные БД (pgvector, Qdrant, Pinecone)"
 ],
 "Продакшн-деплой": [
  "vLLM, TorchServe, Triton; контроль latency и стоимости токенов"
 ],
 "Data-инженерия": [
  "данные для обучения важнее архитектуры модели"
 ],
 "AI-безопасность и мониторинг": [
  "prompt injection, оценка качества, guardrails; требования AI Act"
 ],
 "MLflow / Kubeflow": [
  "альтернативы: Weights & Biases, SageMaker, Vertex AI, Azure ML"
 ],
 "CI/CD для моделей": [
  "тесты данных (Great Expectations), версионирование (DVC)"
 ],
 "Мониторинг дрейфа": [
  "Evidently, WhyLabs, встроенные средства облаков"
 ],
 "Облачные ML-платформы": [
  "SageMaker, Vertex AI, Azure ML, Databricks"
 ],
 "Linux": [
  "дистрибутивы: Ubuntu, RHEL/Rocky, Debian",
  "уровень: systemd, сеть, права, чтение логов без гугла"
 ],
 "CI/CD": [
  "GitLab CI, GitHub Actions, Jenkins, Argo CD, TeamCity"
 ],
 "Terraform": [
  "альтернативы: OpenTofu (форк), Pulumi, CloudFormation, Bicep"
 ],
 "Скрипты": [
  "Bash обязателен; дальше Python или Go"
 ],
 "Мониторинг": [
  "Prometheus + Grafana, Datadog, Zabbix, ELK/Loki"
 ],
 "Безопасность пайплайна": [
  "Trivy, Snyk, HashiCorp Vault, SOPS, подпись артефактов"
 ],
 "Kubernetes на глубину": [
  "сеть CNI, storage, операторы, отладка кластера; уровень CKA/CKS"
 ],
 "Программирование": [
  "Go или Python — платформа пишется кодом, а не кликами"
 ],
 "SLO и error budget": [
  "подход Google SRE; альтернатива — классические SLA без бюджета ошибок"
 ],
 "Наблюдаемость и профилирование": [
  "OpenTelemetry как стандарт; pprof, continuous profiling"
 ],
 "Инцидент-менеджмент": [
  "PagerDuty, Opsgenie; постмортемы без поиска виноватых"
 ],
 "Нагрузка и capacity": [
  "k6, Gatling, Locust; планирование ресурсов"
 ],
 "Одно облако глубоко": [
  "AWS — самый частый в мире, Azure — в польских корпорациях, GCP — в data и медиа"
 ],
 "Сети и IAM": [
  "VPC, подсети, приватные эндпоинты, роли и политики"
 ],
 "Kubernetes managed": [
  "EKS (AWS), AKS (Azure), GKE (Google)"
 ],
 "FinOps": [
  "Cost Explorer, Azure Cost Management, Kubecost; сертификат FinOps Practitioner"
 ],
 "Cloud security": [
  "CIS Benchmarks, CSPM-инструменты, шифрование и сегментация"
 ],
 "Windows Server + Active Directory": [
  "альтернатива — Entra ID (бывший Azure AD) в облачных компаниях"
 ],
 "Виртуализация": [
  "VMware vSphere, Hyper-V, Proxmox (растёт после смены лицензий VMware)"
 ],
 "Резервное копирование и DR": [
  "Veeam, Commvault; главное — регулярно проверять восстановление"
 ],
 "Docker и Kubernetes": [
  "в 2025 особенно ценились контейнеры даже у классических админов"
 ],
 "TCP/IP и маршрутизация": [
  "BGP, OSPF, VLAN, QoS; уровень CCNA как минимум"
 ],
 "Оборудование": [
  "Cisco (стандарт), Juniper, MikroTik (провайдеры и малый бизнес), Aruba"
 ],
 "Сетевая безопасность": [
  "Fortinet, Palo Alto, Check Point; сегментация под NIS2"
 ],
 "Автоматизация": [
  "Python + Netmiko/NAPALM, Ansible, NetBox как источник истины"
 ],
 "Облачные сети": [
  "VPC peering, Transit Gateway, Direct Connect/ExpressRoute"
 ],
 "SQL и внутренности СУБД": [
  "планы выполнения, блокировки, MVCC, статистика"
 ],
 "PostgreSQL / Oracle / MS SQL": [
  "выбор определяет рынок: Oracle — банки, MS SQL — корпорации, PostgreSQL — продукт"
 ],
 "Бэкап и восстановление": [
  "PITR, репликация, регулярные учения по восстановлению"
 ],
 "Managed БД в облаке": [
  "RDS/Aurora, Azure SQL, Cloud SQL — снимают часть рутины DBA"
 ],
 "NoSQL": [
  "MongoDB, Redis, Elasticsearch, Cassandra — под конкретные задачи"
 ],
 "Сети и ОС": [
  "без понимания TCP/IP и внутренностей ОС в безопасности делать нечего"
 ],
 "Модели атак": [
  "OWASP Top 10, MITRE ATT&CK, kill chain"
 ],
 "SOC-инструменты": [
  "SIEM: Splunk, Microsoft Sentinel, QRadar; EDR: CrowdStrike, Defender"
 ],
 "AppSec": [
  "SAST/DAST/SCA: SonarQube, Semgrep, Burp, Snyk"
 ],
 "Пентест": [
  "Burp Suite, Metasploit, nmap; практика на HackTheBox и TryHackMe"
 ],
 "Сертификаты": [
  "см. блок сертификаций ниже — в безопасности они реально влияют на найм"
 ],
 "ISO 27001 / NIST": [
  "ISO 27001 в ЕС, NIST CSF в США; SOC 2 для SaaS"
 ],
 "NIS2, DORA, GDPR": [
  "NIS2 — инфраструктура, DORA — финансы, AI Act — модели"
 ],
 "Управление рисками": [
  "реестр рисков, оценка вероятности и влияния, планы обработки"
 ],
 "Тест-дизайн": [
  "классы эквивалентности, граничные значения, таблицы решений",
  "уровень ISTQB Foundation"
 ],
 "Баг-трекинг": [
  "Jira, Azure DevOps, YouTrack; отчёт должен воспроизводиться по шагам"
 ],
 "API-тестирование": [
  "Postman, Insomnia, Bruno; проверка контрактов"
 ],
 "ISTQB": [
  "Foundation Level — база; Advanced (Test Analyst, Test Manager) — рост"
 ],
 "Язык программирования": [
  "Java и Python — самые частые в автотестах Польши; JS/TS — если фронт; C# — если .NET"
 ],
 "Playwright / Selenium / Cypress": [
  "Playwright быстро вытесняет Selenium; Cypress — для фронтовых команд"
 ],
 "API-тесты": [
  "REST Assured (Java), pytest + requests (Python), Postman/Newman"
 ],
 "Нагрузочное тестирование": [
  "k6, JMeter, Gatling, Locust"
 ],
 "Тестовая инфраструктура": [
  "Docker, тестовые данные, параллельный запуск в CI"
 ],
 "AI для генерации тестов": [
  "LLM для черновиков тестов и данных; проверка обязательна"
 ],
 "Паттерны и системное мышление": [
  "GoF-паттерны — минимум; важнее компромиссы и границы сервисов"
 ],
 "Cloud architecture": [
  "AWS Well-Architected, Azure Architecture Center как основа"
 ],
 "Микросервисы и event-driven": [
  "Kafka, saga, outbox; альтернатива — модульный монолит"
 ],
 "Agile на практике": [
  "Scrum, Kanban, SAFe в крупных компаниях",
  "уровень PSM I как минимум"
 ],
 "Инструменты": [
  "Jira, Confluence, Monday, Azure DevOps"
 ],
 "Продуктовые метрики": [
  "retention, конверсии, unit-экономика; инструменты — Amplitude, GA4, Mixpanel"
 ],
 "Исследования": [
  "интервью, опросы, юзабилити-тесты, анализ данных"
 ],
 "Приоритизация": [
  "RICE, MoSCoW, Kano — фреймворки вторичны, важна аргументация"
 ],
 "Сбор требований": [
  "user stories, критерии приёмки, интервью со стейкхолдерами"
 ],
 "Моделирование процессов": [
  "BPMN 2.0, UML, C4 для архитектурных схем"
 ],
 "API и интеграции": [
  "OpenAPI, форматы обмена, очереди — понимать, а не писать"
 ],
 "Домен": [
  "финансы, логистика, медицина, e-commerce — за домен платят больше, чем за инструменты"
 ],
 "Figma": [
  "альтернативы: Sketch (macOS), Penpot (open-source), Adobe XD (умирает)"
 ],
 "Дизайн-системы": [
  "Material 3, Apple HIG, собственные системы; работа с токенами"
 ],
 "UX-исследования": [
  "интервью, юзабилити-тесты, карты пути, аналитика поведения"
 ],
 "Доступность (WCAG)": [
  "WCAG 2.2 AA — уровень, который требует European Accessibility Act"
 ],
 "Интерфейсы для AI": [
  "паттерны для чатов, агентов и неопределённых ответов — новая ниша"
 ],
 "Базовая вёрстка": [
  "HTML/CSS на уровне чтения — чтобы говорить с разработчиками"
 ],
 "SAP (S/4HANA)": [
  "альтернативы: Microsoft Dynamics 365, Oracle Fusion, Workday, IFS"
 ],
 "Бизнес-процессы": [
  "финансы (FI/CO), закупки (MM), продажи (SD), производство (PP)"
 ],
 "Oracle / Microsoft Dynamics": [
  "выбор экосистемы определяет рынок вакансий на годы вперёд"
 ],
 "ABAP или конфигурирование": [
  "технический консультант пишет ABAP, функциональный — настраивает"
 ],
 "Cloud ERP": [
  "S/4HANA Cloud, Dynamics 365 online — направление всех новых проектов"
 ],
 "Windows / macOS / Linux": [
  "в корпорациях Windows + macOS; Linux — в инженерных командах"
 ],
 "Основы сетей": [
  "IP, DNS, DHCP, VPN, Wi-Fi — уровень CompTIA Network+"
 ],
 "Тикет-системы": [
  "Jira Service Management, ServiceNow, Zendesk, Freshservice"
 ],
 "Active Directory": [
  "и его облачная замена — Entra ID (Azure AD)"
 ],
 "Power Platform": [
  "альтернативы: Appian, OutSystems, Mendix, Retool"
 ],
 "RPA-платформа": [
  "UiPath (лидер), Automation Anywhere, Blue Prism, Power Automate Desktop"
 ],
 "AI-агенты в процессах": [
  "постепенно замещают классический RPA — стоит освоить заранее"
 ],
 "Solidity": [
  "альтернативы: Rust (Solana, Near), Move (Aptos, Sui), Cairo (Starknet)"
 ],
 "Безопасность контрактов": [
  "Slither, Foundry, Echidna; аудиты и bug bounty"
 ],
 "Rust": [
  "в Web3 — Solana и не-EVM цепочки; вне Web3 — системное программирование"
 ],
 "Криптография": [
  "подписи, хеши, zero-knowledge доказательства — уровень понимания, не изобретения"
 ],
 "ZK и L2": [
  "zkSync, Starknet, Scroll; самая дефицитная ниша"
 ],
 "SDK устройств": [
  "Meta Quest SDK, OpenXR (стандарт), Apple visionOS, PICO"
 ],
 "Оптимизация под 90 FPS": [
  "кадровый бюджет — жёсткое требование: ниже — укачивание"
 ],
 "UX для XR": [
  "комфорт, локомоция, размеры интерфейсов — инженерная задача, не эстетика"
 ],
 "ПЛК-программирование": [
  "Siemens TIA Portal (стандарт Польши), Beckhoff TwinCAT, Allen-Bradley",
  "стандарт языков: IEC 61131-3 (LAD, ST, FBD)"
 ],
 "ROS 2": [
  "альтернатива — собственные фреймворки производителей роботов"
 ],
 "Промышленные протоколы": [
  "Profinet, EtherCAT, Modbus, OPC UA"
 ],
 "Компьютерное зрение": [
  "OpenCV, Cognex, Halcon; всё чаще — модели глубокого обучения"
 ],
 "Безопасность машин": [
  "Machinery Regulation ЕС, уровни PL/SIL"
 ],
 "Английский на уровне письма": [
  "C1 письменный; носительский уровень — заметное преимущество"
 ],
 "Docs as code": [
  "Markdown + Git; генераторы: Docusaurus, MkDocs, Antora, Sphinx"
 ],
 "API-документация": [
  "OpenAPI/Swagger, Redoc; примеры, которые запускаются"
 ],
 "Информационная архитектура": [
  "структура, навигация, версионирование, поиск"
 ],
 "Реальный опыт разработки": [
  "без него сообщество не воспринимает всерьёз"
 ],
 "Публичные выступления": [
  "конференции, митапы, стримы; уровень — доклад на 30 минут без бумажки"
 ],
 "Письмо и контент": [
  "туториалы, статьи, примеры кода, видео"
 ],
 "Английский": [
  "C1 — аудитория международная"
 ],
 "Продукт и метрики": [
  "DevRel измеряется активациями и удержанием, а не лайками"
 ]
};
