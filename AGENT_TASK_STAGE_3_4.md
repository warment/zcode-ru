# Задание: Патч JS-бандла ZCode — добавить локаль `ru`

## Контекст

Файл бандла: `/Users/sergey/ai/ZCode/_extracted/out/renderer/assets/index-yzdnbLpy.js` (3.6 МБ, минифицирован)

Цель: добавить локаль `ru` (русский) как третью опцию языка, НЕ трогая переводы (ru.json = копия en.json, переводы будут позже).

## Что нужно сделать

### Шаг 1 — Создать `ru/ru.json`

Скопировать `original/en.json` → `ru/ru.json`:
```bash
cp /Users/sergey/ai/ZCode/original/en.json /Users/sergey/ai/ZCode/ru/ru.json
```

### Шаг 2 — Внедрить `ru` словарь в бандл

**Позиция ~3380768** — определение `nNt`:
```js
nNt={"zh-CN":at,"en-US":Ze}
```
Нужно заменить на:
```js
nNt={"zh-CN":at,"en-US":Ze,"ru":Ze}
```
(используем `Ze` (en-US словарь) как заглушку для `ru`, чтобы не менять импорты — переводы подставятся позже через скрипт)

### Шаг 3 — Пропатчить ВСЕ точки проверки локали (6 мест)

#### 3a. `JQ()` — диспетчер перевода (позиция ~2294128)
Было:
```js
(wut()==="en-US"?Ze:at)[e]??e
```
Стало:
```js
(wut()==="en-US"?Ze:wut()==="ru"?Ze:at)[e]??e
```

#### 3b. `Zat()` — валидация (позиция ~2093879)
Было:
```js
e==="zh-CN"||e==="en-US"||e==="system"?e:null
```
Стало:
```js
e==="zh-CN"||e==="en-US"||e==="ru"||e==="system"?e:null
```

#### 3c. `Xat()` — locale→country mapping (позиция ~2093625)
Было:
```js
e==="zh-CN"?"cn":e==="en-US"?"en"
```
Стало:
```js
e==="zh-CN"?"cn":e==="en-US"?"en":e==="ru"?"ru"
```

#### 3d. `wut()` — получение локали (позиция ~2293964)
Было:
```js
e==="zh-CN"||e==="en-US")return e
```
Стало:
```js
e==="zh-CN"||e==="en-US"||e==="ru")return e
```

#### 3e. `tt` mobile handler (позиция ~2830021)
Было:
```js
(e==="zh-CN"||e==="en-US")&&B(e)
```
Стало:
```js
(e==="zh-CN"||e==="en-US"||e==="ru")&&B(e)
```

#### 3f. Settings page handler (позиция ~3651794)
Было:
```js
(e==="zh-CN"||e==="en-US")&&d(e)
```
Стало:
```js
(e==="zh-CN"||e==="en-US"||e==="ru")&&d(e)
```

### Шаг 4 — Добавить `ru` в меню выбора языка (3 места)

#### 4a. Sidebar settings (позиция ~2665193)
Добавить НАД `en-US` SelectItem:
```js
(0,Y.jsx)(Y_,{value:"ru",children:h.formatMessage({id:"sidebar.settings.locale.ru"})}),
```

#### 4b. Settings page (позиция ~3637625)
Добавить НАД `en-US` SelectItem:
```js
(0,Y.jsx)(r_,{value:"ru",children:j.formatMessage({id:"settings.locale.ru"})}),
```

#### 4c. system fallback (позиция ~2294079)
Было:
```js
navigator.language.toLowerCase().startsWith("zh")?"zh-CN":"en-US"
```
Стало:
```js
navigator.language.toLowerCase().startsWith("zh")?"zh-CN":navigator.language.toLowerCase().startsWith("ru")?"ru":"en-US"
```

### Шаг 5 — Упаковать app.asar обратно

```bash
cd /tmp && rm -rf zcode_patched
cp -r /Users/sergey/ai/ZCode/_extracted /tmp/zcode_patched
# скопировать изменённый index-yzdnbLpy.js в /tmp/zcode_patched/out/renderer/assets/
cd /tmp/zcode_patched
npx asar pack . /tmp/app_patched.asar
```

### Шаг 6 — Собрать ZCode-ru.app

```bash
cp -r /Applications/ZCode.app /tmp/ZCode-ru.app
cp /tmp/app_patched.asar "/tmp/ZCode-ru.app/Contents/Resources/app.asar"
# Обновить bundle id в Info.plist
/usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier dev.zcode.app.ru" "/tmp/ZCode-ru.app/Contents/Info.plist"
/usr/libexec/PlistBuddy -c "Set :CFBundleName 'ZCode RU'" "/tmp/ZCode-ru.app/Contents/Info.plist"
# Подписать
xattr -cr /tmp/ZCode-ru.app
codesign --force --deep --sign - /tmp/ZCode-ru.app
```

### Шаг 7 — Тест

```bash
# ЗАКРЫТЬ оригинальный ZCode.app перед тестом! (singleton-lock)
open /tmp/ZCode-ru.app
```

В DevTools консоли:
```js
localStorage.setItem("zcode-locale", "ru")
localStorage.setItem("zcode-locale-preference", "ru")
location.reload()
```

## Критерии успеха

- [ ] В меню языка появилась опция «Русский» / «ru»
- [ ] При выборе `ru` интерфейс показывает английский текст (заглушка, не крашится)
- [ ] `localStorage["zcode-locale"]` === `"ru"` после выбора
- [ ] Приложение не крашится при переключении языков
- [ ] Оригинальный ZCode.app НЕ тронут

## Файлы для работы

| Файл | Путь |
|------|------|
| Бандл для патча | `/Users/sergey/ai/ZCode/_extracted/out/renderer/assets/index-yzdnbLpy.js` |
| Словарь en | `/Users/sergey/ai/ZCode/original/en.json` |
| Словарь zh-CN | `/Users/sergey/ai/ZCode/original/zh-CN.json` |
| Анализ кода | `/Users/sergey/ai/ZCode/analysis.md` |
| Папка для ru | `/Users/sergey/ai/ZCode/ru/` |
| Оригинал приложения | `/Applications/ZCode.app` |
