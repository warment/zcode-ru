<p align="center">
  <img src="https://zcode.z.ai/_next/image?url=%2Fimages%2Fhero-visual%2Fzcode-logo%402x.png&w=128&q=75" alt="ZCode" width="64">
</p>

<h1 align="center">ZCode Russian Localization</h1>

<p align="center">
  <strong>Замена китайского языка на русский в ZCode 3.0.1</strong><br>
  Скрипт патчит оригинальное приложение. В настройках остаются два языка — English и Русский.
</p>

<p align="center">
  <a href="https://github.com/warment/zcode-ru/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-7c3aed.svg" alt="MIT License">
  </a>
  <a href="https://zcode.z.ai">
    <img src="https://img.shields.io/badge/ZCode-3.0.1-7c3aed.svg" alt="ZCode 3.0.1">
  </a>
  <a href="#translation">
    <img src="https://img.shields.io/badge/Перевод-97%25-22c55e.svg" alt="97% translated">
  </a>
</p>

---

## Обзор

ZCode — Agentic Development Environment для долгосрочных задач. Поддерживает только китайский и английский. Русского нет, и добавить его через интерфейс невозможно — локали зашиты в JS-бандл.

Этот скрипт решает проблему за одну команду: заменяет китайский словарь на русский прямо в оригинальном приложении.

**Подход:**

```
  ZCode.app (до)              ZCode.app (после)
┌──────────────────┐        ┌──────────────────┐
│  zh-CN  Китайский │   →   │  ru      Русский  │
│  en-US  English   │       │  en-US  English   │
└──────────────────┘        └──────────────────┘
```

Китайский словарь (`sv`) в `usageStatsUiParts-*.js` **полностью заменяется** русским `ru.json`. Английский остаётся без изменений.

---

## Быстрый старт

```bash
git clone https://github.com/warment/zcode-ru.git
cd zcode-ru
./tools/patch.sh
```

> **Важно:** закрой ZCode перед запуском скрипта.

Скрипт выполняет четыре шага:

| Шаг | Действие |
| --- | --- |
| 1 | Извлекает `app.asar` из `/Applications/ZCode.app` |
| 2 | Заменяет китайский словарь на русский, патчит валидацию и меню |
| 3 | Перепаковывает `app.asar` |
| 4 | Переподписывает приложение (ad-hoc) |

После этого открой ZCode — в настройках будут **English** и **Русский**.

---

## Как это работает

### Замена словаря

В `usageStatsUiParts-*.js` находится объект `sv` — китайский словарь (~3 000 ключей). Скрипт находит его границы по фигурным скобкам и заменяет содержимое на `ru.json`.

> Размер: 189 KB → 204 KB (+15 KB). JS-парсер не ломается.

### Патчи кода

После замены словаря обновляются точки, где код проверяет допустимые локали:

| Файл | Что изменяется |
| --- | --- |
| `index-*.js` | `"ru"` добавляется в объект `nNt` |
| `index-*.js` | Диспетчер перевода `JQ()` — добавлен分支 для `ru` |
| `index-*.js` | Валидация `Zat()`, `wut()` — `ru` как допустимая локаль |
| `index-*.js` | Маппинг локаль→страна `Xat()` — `ru` → `ru` |
| `index-*.js` | Mobile handler, settings handler — `ru` добавлен в проверки |
| `index-*.js` | Ключи localStorage — синхронизация `zcode-locale` |
| `chunk-*.js` | Zod-валидация — `ru` в enum |
| `chunk-*.js` | `wC()` — fallback по `navigator.language` для `ru` |
| `chunk-*.js` | `getLocaleFallbackOrder` — `ru` в цепочке |

**Итого:** 13 патчей в 3 файлах.

---

## Структура проекта

```
zcode-ru/
├── tools/
│   ├── patch.sh            ← Главный скрипт
│   ├── patch_bundle.py     ← Python-модуль патча
│   └── find_vars.js        ← AST-поиск переменных
├── ru/
│   └── ru.json             ← Русский перевод (3 528 ключей)
├── original/
│   ├── zh-CN.json          ← Китайский (эталон)
│   └── en.json             ← Английский (эталон)
├── docs/                   ← Документация ZCode
├── analysis.md             ← Анализ кода локализации
└── README.md
```

---

## Translation

<a name="translation"></a>

| Метрика | Значение |
| --- | --- |
| Ключей в словаре | 3 528 |
| Переведено | 2 948 из 3 015 **(97%)** |
| Не переведено | ~60 (технические термины) |

Переведено: навигация, меню, кнопки, сообщения об ошибках, настройки, подсказки, описания функций.

Не переведено осознанно: `Agent`, `MCP`, `Plugin`, `Goal Mode` — технические термины, которые лучше оставить на английском.

---

## Пересборка после обновления

ZCode обновляется автоматически — перевод слетает. Пересобери за одну команду:

```bash
./tools/patch.sh
```

Или укажи свой путь к приложению:

```bash
./tools/patch.sh /path/to/ZCode.app
```

---

## Совместимость

| Параметр | Значение |
| --- | --- |
| ZCode | 3.0.1 (build 1626) |
| ОС | macOS |
| Electron | 33.x |
| Зависимости | `@electron/asar` (автоустанавливается через npx) |

---

## Контрибьюшены

PR приветствуются. Особенно:

- Улучшения перевода (`ru/ru.json`)
- Исправления скрипта патча
- Тестирование на других версиях macOS

```bash
git clone https://github.com/YOUR_USERNAME/zcode-ru.git
# отредактируй ru/ru.json
./tools/patch.sh
# проверь в ZCode
git add ru/ru.json && git commit -m "fix: перевод" && git push
```

---

<p align="center">
  <sub>Сделано для русскоязычного сообщества разработчиков</sub><br>
  <sub>ZCode — <a href="https://zcode.z.ai">zcode.z.ai</a></sub>
</p>
