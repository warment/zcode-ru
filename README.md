<div align="center">

# 🇷🇺 ZCode — Русская локализация

**Полная русификация десктопного ADE [ZCode 3.0.1](https://zcode.z.ai)**

Русский интерфейс для Agentic Development Environment от Z.ai — с сохранением оригинального приложения и возможностью пересборки после обновлений.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![ZCode](https://img.shields.io/badge/ZCode-3.0.1-purple.svg)](https://zcode.z.ai)
[![Electron](https://img.shields.io/badge/Electron-33-blue.svg)](https://www.electronjs.org)
[![Translation](https://img.shields.io/badge/Перевод-97%25-brightgreen.svg)](#статистика)

---

<br/>

[Установка](#установка) • [Как работает](#как-это-работает) • [Структура](#структура-проекта) • [Пересборка](#пересборка-после-обновления) • [Скрипт](#автоматический-скрипт) • [Известные проблемы](#известные-проблемы) • [Контрибьютинг](#контрибьютинг)

</div>

---

## Зачем это нужно

ZCode — мощный ADE для долгосрочных задач, но поддерживает только **китайский** и **английский**. Русский язык отсутствует, и добавить его через интерфейс невозможно — локали зашиты в JS-бандл.

Этот репозиторий решает проблему:

- ✅ **Патч JS-бандла** — добавляет `ru` как третью локаль
- ✅ **3 528 ключей** переведено на русский язык
- ✅ **Оригинал не трогается** — работает копия `ZCode-ru.app`
- ✅ **Скрипт пересборки** — пере применить перевод после автообновления за одну команду
- ✅ **Не требует изменений в коде ZCode** — чистый патч поверх готового бандла

---

## Статистика

| Метрика | Значение |
|:--------|:---------|
| Версия ZCode | 3.0.1 (build 1626) |
| Bundle ID | `dev.zcode.app` |
| Стек | Electron + React 19 |
| Локали в оригинале | `zh-CN`, `en-US` |
| Ключей в словаре | 3 528 |
| Переведено на русский | 2 948 из 3 015 (**97%**) |
| Доп. ключей (rus-specific) | 513 |
| Файлов с патчами | 3 (chunk, index, main) |
| Точек валидации локали | 8 |

---

## Установка

### Быстрый старт (3 команды)

```bash
git clone https://github.com/warment/zcode-ru.git
cd zcode-ru
./tools/patch.sh
```

Скрипт автоматически:
1. Скопирует `/Applications/ZCode.app` → `ZCode-ru.app`
2. Распакует `app.asar`
3. Применит все патчи (словарь + валидация + меню)
4. Перепакует и подпишет копию

### Ручная установка

<details>
<summary>Пошаговая инструкция (нажми, чтобы развернуть)</summary>

```bash
# 1. Копируем оригинальное приложение
cp -R /Applications/ZCode.app ./ZCode-ru.app

# 2. Распаковываем app.asar
npx @electron/asar extract ZCode-ru.app/Contents/Resources/app.asar /tmp/zc_tmp

# 3. Применяем патчи (см. tools/patch_bundle.py)
python3 tools/patch_bundle.py

# 4. Перепаковываем
npx @electron/asar pack /tmp/zc_tmp ZCode-ru.app/Contents/Resources/app.asar

# 5. Подписываем и запускаем
xattr -cr ZCode-ru.app
codesign --force --deep --sign - ZCode-ru.app
open ZCode-ru.app
```

</details>

---

## Как это работает

### Архитектура локализации ZCode

```
┌─────────────────────────────────────────────────┐
│                  ZCode.app                       │
│                                                  │
│  ┌──────────────┐    ┌───────────────────────┐  │
│  │  Main Process │    │   Renderer Process    │  │
│  │  (Electron)   │    │   (React 19)          │  │
│  │              │    │                       │  │
│  │  Zod valid.  │    │  ┌─────────────────┐  │  │
│  │  ┌────────┐  │    │  │    nNt dict      │  │  │
│  │  │zh-CN ✓ │  │    │  │  zh-CN → at     │  │  │
│  │  │en-US ✓ │  │    │  │  en-US → Ze     │  │  │
│  │  │  ru  ◀──├──┼────┤  │  ru    → at  ◀──┼──┤ ← патч
│  │  └────────┘  │    │  └─────────────────┘  │  │
│  │              │    │                       │  │
│  │  wk() ←──────┤    │  aNt(e) formatMsg    │  │
│  │  wC() ←──────┤    │  JQ()  dispatcher    │  │
│  │              │    │  Zat() validator      │  │
│  └──────────────┘    └───────────────────────┘  │
│                                                  │
│  localStorage: zcode-locale = "ru"               │
└─────────────────────────────────────────────────┘
```

### Что патчится

| # | Файл | Что делаем | Кол-во замен |
|:-:|:-----|:-----------|:------------:|
| 1 | `usageStatsUiParts-*.js` | Заменяем словарь `sv` (zh-CN) на русский `ru.json` | 1 |
| 2 | `index-*.js` | Добавляем `"ru"` в объект `nNt` | 1 |
| 3 | `index-*.js` | Обновляем `JQ()` — диспетчер перевода | 1 |
| 4 | `index-*.js` | Обновляем `Zat()` — валидацию локали | 1 |
| 5 | `index-*.js` | Обновляем `Xat()` — маппинг локаль→страна | 1 |
| 6 | `index-*.js` | Обновляем `wut()` — определение текущей локали | 1 |
| 7 | `index-*.js` | Обновляем mobile handler `tt` | 1 |
| 8 | `index-*.js` | Обновляем settings page handler | 1 |
| 9 | `index-*.js` | Исправляем localStorage ключи | 3 |
| 10 | `chunk-KIIDSXZ3.js` | Zod-валидация — добавляем `ru` | 1 |
| 11 | `chunk-KIIDSXZ3.js` | `getLocaleFallbackOrder` — добавляем `ru` | 1 |
| 12 | `chunk-KIIDSXZ3.js` | `resolveSystemApplicationLocale` — добавляем `ru` | 1 |
| 13 | `chunk-KIIDSXZ3.js` | `wC()` — fallback по `navigator.language` | 1 |

**Итого:** 13 патчей в 3 файлах.

---

## Структура проекта

```
zcode-ru/
├── README.md                   # Этот файл
├── LICENSE                     # MIT
├── .gitignore
│
├── original/                   # Эталонные словари (извлечены из бандла)
│   ├── zh-CN.json              # Китайский — 3 015 ключей
│   └── en.json                 # Английский — 3 015 ключей
│
├── ru/
│   └── ru.json                 # Русский перевод — 3 528 ключей (97%)
│
├── tools/
│   ├── patch.sh                # Bash: полная пересборка (копия → патч → подпись)
│   ├── patch_bundle.py         # Python: патч JS-бандла (13 замен)
│   └── find_vars.js            # AST-поиск переменных через acorn
│
├── docs/                       # Документация ZCode (англ.)
│   ├── INDEX.md
│   ├── welcome.md
│   ├── agents.md
│   ├── goal.md
│   ├── commands.md
│   └── ...                     # +16 файлов
│
├── PLAN.md                     # План русификации (англ.)
├── PLAN_RU.md                  # План русификации (рус.)
├── REPORT.md                   # Отчёт этапа 1
├── REPORT_RU.md                # Отчёт — полный
├── analysis.md                 # Анализ кода локализации
└── AGENT_TASK_STAGE_3_4.md     # Задание для агента
```

---

## Пересборка после обновления

Когда ZCode обновляется через автообновление, перевод «слетает». Пересоберите за одну команду:

```bash
./tools/patch.sh
```

Или укажите свой путь к приложению:

```bash
./tools/patch.sh /path/to/ZCode.app
```

---

## Автоматический скрипт

`tools/patch.sh` — полный цикл пересборки:

```bash
#!/bin/bash
# Этап 1: Копирование (ditto сохраняет расширенные атрибуты)
ditto /Applications/ZCode.app ZCode-ru.app

# Этап 2: Распаковка app.asar
npx @electron/asar extract ZCode-ru.app/Contents/Resources/app.asar /tmp/zc_tmp

# Этап 3: Применение патчей (Python)
# - Замена словаря sv → ru.json
# - Добавление "ru" в nNt
# - Обновление валидаторов, диспетчеров, fallback

# Этап 4: Перепаковка
npx @electron/asar pack /tmp/zc_tmp app.asar

# Этап 5: Подпись
xattr -cr ZCode-ru.app
codesign --force --deep --sign - ZCode-ru.app
```

---

## Как добавить перевод

Если вы хотите улучшить перевод:

1. Отредактируйте `ru/ru.json`
2. Ключи совпадают с `original/en.json` (3 015 общих ключей)
3. Запустите `./tools/patch.sh` для пересборки

### Приоритеты перевода

| Приоритет | Категория | Примеры |
|:---------:|:----------|:--------|
| 🔴 1 | Навигация, кнопки, меню | `common.close`, `sidebar.settings.title` |
| 🔴 1 | Сообщения об ошибках | `appError.title`, `appError.reload` |
| 🟡 2 | Описания, подсказки | `agents.description`, `goal.description` |
| 🟡 2 | Тексты помощи | `welcome.description`, `feedback.type.*` |
| ⚪ 3 | Технические термины | `Agent`, `Plugin`, `MCP`, `Goal Mode` |

---

## Известные проблемы

| # | Проблема | Статус | Решение |
|:-:|:---------|:------:|:--------|
| 1 | English и Русский используют один словарь | ⚠️ | При выборе EN показывается русский текст |
| 2 | Отдельная локаль `ru` не работает | ⚠️ | React кэширует `formatMessage` — нужен хак |
| 3 | ~60 тех. терминов не переведены | 📝 | `Agent`, `MCP`, `Plugin` — осознанно оставлены на англ. |
| 4 | Копия требует закрытия оригинала | ⚠️ | Singleton-lock в Electron |

### Обходные решения

**Проблема singleton-lock:** закройте оригинальный ZCode перед запуском копии.

**Проблема кэширования React:** пока не решена. Русский работает через замену английского словаря — при переключении на EN интерфейс всё равно показывает русский.

---

## Совместимость

| Параметр | Значение |
|:---------|:---------|
| ZCode | 3.0.1 (build 1626) |
| ОС | macOS (проверено на Ventura+) |
| Electron | 33.x |
| Node.js | 20+ (для npx) |
| Зависимости | `@electron/asar` (автоустанавливается через npx) |

---

## Контрибьютинг

PR приветствуются! Особенно:

- 🌐 Улучшения перевода (`ru/ru.json`)
- 🐛 Исправления патч-скриптов
- 📖 Документация
- 🧪 Тестирование на других версиях macOS

### Как внести изменения

```bash
# 1. Fork и clone
git clone https://github.com/YOUR_USERNAME/zcode-ru.git

# 2. Внесите изменения
# ...

# 3. Проверьте
./tools/patch.sh
open ZCode-ru.app

# 4. Коммит и PR
git add -A && git commit -m "fix: ..."
git push
```

---

## Благодарности

- **Z.ai** — за создание ZCode
- **Electron** — за платформу
- Всем, кто помогает с переводом

---

<div align="center">

**[⬆ Наверх](#-zcode--русская-локализация)**

Сделано с ❤️ для русскоязычного сообщества разработчиков

</div>
