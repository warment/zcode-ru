<p align="center">
  <img src="https://zcode.z.ai/_next/image?url=%2Fimages%2Fhero-visual%2Fzcode-logo%402x.png&w=128&q=75" alt="ZCode" width="64">
</p>

<h1 align="center">ZCode Russian Localization</h1>

<p align="center">
  <strong>Полноценный русский язык (ru-RU) для ZCode Desktop (macOS)</strong><br>
  Третий язык в селекторе — System / English / <strong>Русский</strong>.
</p>

<p align="center">
  <a href="https://github.com/warment/zcode-ru/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-7c3aed.svg" alt="MIT License">
  </a>
  <a href="https://zcode.z.ai">
    <img src="https://img.shields.io/badge/ZCode-любая_версия-7c3aed.svg" alt="ZCode any version">
  </a>
  <a href="#translation">
    <img src="https://img.shields.io/badge/Перевод-100%25-22c55e.svg" alt="100% translated">
  </a>
  <a href="https://github.com/warment/zcode-ru/releases">
    <img src="https://img.shields.io/badge/release-v2.0.0-7c3aed.svg" alt="v2.0.0">
  </a>
</p>

<p align="center">
  Русский · <a href="#english">English</a> · <a href="./README_CN.md">中文</a>
</p>

---

## Обзор

ZCode — Agentic Development Environment от Z.ai. Официально поддерживаются два языка интерфейса — китайский и английский; локали зашиты в JS-бандл, добавить новую через настройки невозможно.

Этот пак решает проблему одной командой: добавляет в приложение **нативную третью локаль `ru-RU`** — без подмены китайского, с английским fallback для строк будущих версий.

**Подход:**

```
  ZCode.app (до)                 ZCode.app (после)
┌───────────────────┐        ┌───────────────────┐
│  zh-CN  中文       │        │  zh-CN  中文       │
│  en-US  English   │   →    │  en-US  English   │
│                   │        │  ru-RU  Русский ← │
└───────────────────┘        └───────────────────┘
```

---

## Быстрый старт

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/warment/zcode-ru/v2.0.1/tools/install.sh)
```

> **Важно:** закрой ZCode перед запуском — установщик не трогает запущенное приложение.

Установщик выполняет пять шагов:

| Шаг | Действие |
| --- | --- |
| 1 | Находит приложение и показывает его версию (пак ставится на любую версию) |
| 2 | Бэкапит `app.asar` → `~/.zcode-ru-backup/` |
| 3 | Скачивает русифицированную сборку из Release и подменяет `app.asar` |
| 4 | Переподписывает приложение (ad-hoc) |
| 5 | Перезапускает ZCode; если не завелось — автоматически откатывает оригинал |

После этого открой ZCode — в настройках **три языка**, включая **Русский**. При русской системной локали выбрано автоматически.

Откат в любой момент:

```bash
bash install.sh --restore
```

**Windows (PowerShell):**

```powershell
powershell -ExecutionPolicy Bypass -File install.ps1          # установка
powershell -ExecutionPolicy Bypass -File install.ps1 -Restore # откат
```

---

## Как это работает

### Словарь ru-RU

В `IntlProvider-*.js` находится реестр локалей — словари `zh-CN` и `en-US` (~5 000 ключей каждый). Пак добавляет третий словарь: **полная копия английского + русский оверлей**, поэтому непереведённые и новые строки апстрима показывают английский, а не «голые» ключи.

> Размер чанка: 654 KB → 1.1 MB. JS-парсер не ломается (проверяется при сборке).

### Патчи кода

После словаря обновляются точки, где код проверяет допустимые локали:

| Файл | Что изменяется |
| --- | --- |
| `IntlProvider-*.js` | Реестр словарей `g` — добавлен `ru-RU` (fallback через `Object.assign`) |
| `IntlProvider-*.js` | Валидация локали, системное определение (`ru*` → `ru-RU`) |
| `styles-*.js` | Селектор языка — третий пункт «Русский» (3 места) |
| `process-monitor-*.js` | Русский подсловарь окна мониторинга процессов |
| `cua-permission-panel-*.js` | Русский подсловарь панели разрешений Computer Use |
| `chunk-*.js` (main) | Zod-валидация настроек — `ru-RU` в enum |
| `index.js` (main) | `resolveSystemApplicationLocale` — системное определение |
| `host/index.js` | Описания встроенных агентов и стилей вывода (5 строк) |

**Итого:** 12 патчей в 6 файлах. Info.plist не затрагивается (fuse целостности asar в билде отключён).

---

## Translation

<a name="translation"></a>

| Метрика | Значение |
| --- | --- |
| Ключей в корпусе | 5 018 (82 namespace) |
| Переведено | 5 018 из 5 018 **(100%)** |
| Fallback | английский — для строк будущих версий |

Переведено: чат, настройки, плагины, скиллы, MCP, субагенты, git, автоматизации, боты, usage, вики, диалоги подтверждений, мониторинг процессов.

Не переведено осознанно: диалоги main process (About, трей) и CLI — отдельные корпуса; `Agent`, `MCP`, `GLM` — технические термины по глоссарию.

Не локализуется в принципе: **шаблоны автоматизаций** (Morning dev brief, Risk scan…) — их названия и описания приходят с сервера Z.ai как данные, мимо словаря интерфейса. Лечится только апстримом.

---

## Пересборка после обновления

ZCode обновится — перевод слетит. Порядок всегда такой: **сначала обновление ZCode, потом русификация** (обновление перезаписывает `app.asar`, русифицировать до обновления бессмысленно):

```bash
npm install
node scripts/extract.mjs        # корпус en+zh из установленной версии
node scripts/check.mjs          # что изменилось (детали: --strict, --plurals-report)
node scripts/build.mjs          # build/app-ru.asar — сам прогоняет strict-валидацию словаря
bash tools/apply.sh             # установка (сам дождётся закрытия приложения)
```

Сборка не начнётся (exit 1 до распаковки asar), если словарь не покрыл корпус на 100%,
плейсхолдеры разошлись или плюральные формы неполны.

После сборки — проверка на машине пользователя до любых публикаций: меню-бар, tray,
диалоги, переключение языка.

---

## Совместимость

| Параметр | Значение |
| --- | --- |
| ZCode | любая версия. Перевод — надстройка над английским: что распозналось — на русском, что нет — английское слово. Новые строки апстрима показываются по-английски, «голых» ключей не бывает |
| ОС | macOS (arm64) · **Windows 10/11 x64 — протестировано** |
| Electron | 41.x |
| Зависимости | `@electron/asar` (локально, через npm) |

---

## Контрибьюшены

PR приветствуются. Особенно:

- Улучшения перевода (`dict/ru/*.json`)
- Адаптация патч-точек под новые версии ZCode
- Локализация main process и CLI

```bash
git clone https://github.com/warment/zcode-ru.git
cd zcode-ru && npm install
# отредактируй dict/ru/*.json
node scripts/check.mjs --strict && node scripts/build.mjs
bash tools/apply.sh   # проверь в ZCode
```

---

## English

<a name="english"></a>

Unofficial community pack adding a **native third locale (`ru-RU`)** to the ZCode desktop app (macOS): **5,018 UI strings — 100% of the renderer corpus**, third entry in the language selector (System / English / Русский), English fallback for new upstream strings, translated built-in agent descriptions.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/warment/zcode-ru/v2.0.1/tools/install.sh)
```

Restore: `bash install.sh --restore`. The installer backs up `app.asar`, patches it, re-signs the app ad-hoc and relaunches it. See [SAFETY.md](./SAFETY.md) for risks (signature, updates, TCC permissions). Not affiliated with Z.ai — see [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

---

<p align="center">
  <sub>Сделано для русскоязычного сообщества разработчиков</sub><br>
  <sub>ZCode — <a href="https://zcode.z.ai">zcode.z.ai</a></sub>
</p>
