# Отчёт о русификации ZCode 3.0.1

**Дата:** 2026-06-15
**Статус:** ✅ Рабочий прототип

---

## Результат

Создана русифицированная копия ZCode: `/Users/sergey/ai/ZCode/ZCode-ru.app`

**Меню языка:**
- **Русский** — интерфейс на русском (81% ключей, ~2700 из 3376)
- **中文** — китайский (оригинал)
- **Системный** — автоопределение

---

## Что сделано

### 1. Извлечение словарей
- Извлечены `zh-CN.json` (3015 ключей) и `en.json` (3015 ключей) из JS-бандла
- Файлы: `original/zh-CN.json`, `original/en.json`

### 2. Перевод (ru.json)
- `ru/ru.json` — 3376 ключей, ~81% переведено на русский
- Перевод выполнен программно (таблицы замен + паттерны)
- ~600 ключей остались на английском (технические термины, длинные описания)

### 3. Внедрение словаря
- **Метод:** замена словаря `cv` (en-US) в файле `usageStatsUiParts-Bkw-3slT.js`
- **Размер:** исходный 189 KB → русский 204 KB (+15 KB, не ломает парсер)
- **Причина:** добавление нового словаря (+200 KB) ломает JS-парсер Vite
- **Побочный эффект:** English и Русский используют один словарь (русский)

### 4. Патчи кода

**Render-процесс** (`index-yzdnbLpy.js`):
- `nNt` — добавлена локаль `ru`
- `aNt` — перехват для ru
- `JQ()` — диспетчер перевода
- `Zat()`, `wut()` — валидация локали
- `Xat()` — маппинг локаль→страна
- `Sut`, `Wat` — ключи localStorage (`zcode-locale-preference` → `zcode-locale`)
- `setLocale` — запись в оба ключа localStorage
- Меню выбора языка — переименовано, ru убран

**Main-процесс** (`chunk-KIIDSXZ3.js`, `index.js`):
- Zod-валидация — добавлен `ru`
- `getLocaleFallbackOrder` — обновлён
- `resolveSystemApplicationLocale` — добавлен `ru`

### 5. Инструменты
- `tools/patch_bundle.py` — скрипт патча (10 замен в бандле)
- Процедура сборки: `ditto` → замена `app.asar` → `xattr -cr` → `codesign --force --deep --sign -`

---

## Известные проблемы

1. **English = Русский** — оба пункта меню ведут на один словарь
2. **Не работает отдельная локаль `ru`** — при её выборе интерфейс уходит в китайский (причина: компоненты React используют кэшированный `formatMessage`, не обновляемый при смене локали)
3. **~600 ключей без перевода** — технические термины и длинные описания
4. **Меню «Русский»** — хардкод-строка `Русский` вместо `formatMessage`

---

## Структура проекта

```
/Users/sergey/ai/ZCode/
├── ZCode-ru.app/          # Готовая русифицированная копия
├── original/
│   ├── zh-CN.json         # Китайский словарь (3015 ключей)
│   └── en.json            # Английский словарь (3015 ключей)
├── ru/
│   └── ru.json            # Русский словарь (3376 ключей, 81%)
├── _extracted/            # Распакованный и пропатченный app.asar
│   └── out/
│       ├── renderer/      # Frontend (Next.js/Turbopack)
│       └── main/          # Electron main process
├── tools/
│   └── patch_bundle.py    # Скрипт патча JS-бандла
├── analysis.md            # Анализ кода локализации
├── PLAN_RU.md             # План русификации
├── REPORT.md              # Отчёт этапа 1
└── AGENT_TASK_STAGE_3_4.md # Задание для агента
```

---

## Как пересобрать

```bash
cd /Users/sergey/ai/ZCode
rm -rf ZCode-ru.app
ditto /Applications/ZCode.app ZCode-ru.app

python3 -c "
import subprocess,shutil,os
E='_extracted'
A='ZCode-ru.app/Contents/Resources/app.asar'
T='/tmp/zc_rebuild'
shutil.rmtree(T,1);os.makedirs(T)
subprocess.run(['npx','@electron/asar','extract',A,T],check=True,capture_output=True)
for d in['renderer','main']:
 s=f'{E}/out/{d}/';d2=f'{T}/out/{d}/'
 if os.path.exists(d2):shutil.rmtree(d2)
 shutil.copytree(s,d2)
subprocess.run(['npx','@electron/asar','pack',T,A],check=True,capture_output=True)
shutil.rmtree(T)
"

xattr -cr ZCode-ru.app
codesign --force --deep --sign - ZCode-ru.app
open ZCode-ru.app
```

---

## Следующие шаги

1. Доперевести оставшиеся ~600 ключей в `ru/ru.json`
2. Найти способ добавить `rv` словарь без поломки парсера
3. Исправить меню: убрать хардкод, восстановить `formatMessage`
4. Восстановить отдельную локаль `ru` (решить проблему кэширования React)
5. Подготовить GitHub-репозиторий с патчем
