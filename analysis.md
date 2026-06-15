# ZCode Localization Code Analysis

## Данные о локализации

### Источник данных
- **Файл с локализацией**: `/tmp/zcode_extracted/out/renderer/assets/usageStatsUiParts-Bkw-3slT.js` (а не основной `index-*.js`)
- Переменная `at` в `nNt` импортируется как `W` из chunk-файла, где локально называется `sv` (словарь zh-CN)
- Переменная `Ze` в `nNt` импортируется как `U` из chunk-файла, где локально называется `cv` (словарь en-US)

### Сохранённые файлы
- `/Users/sergey/ai/ZCode/original/zh-CN.json` — **3015 ключей**
- `/Users/sergey/ai/ZCode/original/en.json` — **3015 ключей**

### Примеры ключей
| Ключ | zh-CN | en-US |
|------|-------|-------|
| `common.loading` | 加载中... | Loading... |
| `common.close` | 关闭 | Close |
| `common.cancel` | 取消 | Cancel |
| `common.confirm` | 确认 | Confirm |

---

## Анализ кода меню выбора языка

### 1. Архитектура системы локализации

#### Хранилище
- **Ключ в localStorage**: `zcode-locale` — текущая локаль пользователя
- **Ключ в localStorage**: `zcode-locale-preference` — предпочтение локали (включая `system`)
- **Значение по умолчанию**: `zh-CN`

#### Ключевые функции
| Функция | Описание | Строка |
|---------|----------|--------|
| `aNt(locale)` | Создаёт объект `formatMessage` для заданной локали | ~3380800 |
| `JQ(key)` | Выбирает перевод из словаря по текущей локали | ~2294099 |
| `wut()` | Определяет текущую локаль (из localStorage или navigator) | ~2293966 |
| `lNt` | Экземпляр `formatMessage` для текущей локали | ~3380976 |

#### Вычисление локали (`wut`):
```javascript
function wut() {
  // 1. Проверяет localStorage `zcode-locale-preference`
  // 2. Если значение 'zh-CN', 'en-US' или 'system' — возвращает его
  // 3. Если 'system' или нет сохранённого — определяет по navigator.language
  // 4. Fallback: navigator.language.startsWith('zh') ? 'zh-CN' : 'en-US'
}
```

### 2. Меню выбора языка — 3 места рендеринга

#### Место 1: Sidebar Settings (~2665195)
- **Компонент**: Внутри функции `KSt` (WorkspaceSidebar, ~2659232)
- **Компоненты**: `Y_` (SelectItem), `J_` (Select), `$_` (SelectLabel)
- **Опции**: `system`, `en-US`, `zh-CN`
- **Обработчик**: Передаёт `t` (locale) и `n` (onChange) через пропсы `J_`

#### Место 2: Mobile Settings (~2830023)
- **Обработчик `tt`**: Проверяет `e === 'system'` или `e === 'zh-CN' || e === 'en-US'`
- **Вызывает**: `B(e)` — `setLocale` из Zustand store

#### Место 3: Settings Page (~3637627)
- **Компоненты**: `r_` (SelectItem), `n_` (Select), `e_` (превью текущей локали)
- **Опции**: `zh-CN`, `en-US` (без `system` в этом месте)
- **Формат**: Два SelectItem без option "system"

### 3. Валидация допустимых локалей

**Есть валидация** в 3 местах:

1. **`Zat()` (~2093881)**: Проверяет `e === 'zh-CN' || e === 'en-US' || e === 'system'` — возвращает `null` если не проходит
2. **`wut()` (~2293966)**: Проверяет `e === 'zh-CN' || e === 'en-US'` — возвращает fallback navigator.language
3. **Mobile handler `tt` (~2830023)**: Проверяет `e === 'system'` или `e === 'zh-CN' || e === 'en-US'`

### 4. Статистика ссылок на локали

| Строка | Количество |
|--------|-----------|
| `zh-CN` | 16 |
| `en-US` | 21 |
| `system` | 85 (включая не-locale контексты) |
| `zcode-locale` | 4 |
| `zcode-locale-preference` | 2 |
| `setLocale` | 6 |
| `JQ()` (функция перевода) | 18 |
| `aNt()` (создание formatMessage) | 3 |

### 5. Поддерживаемые локали

Только **2 локали** + опция системной:
- `zh-CN` (китайский) — язык по умолчанию
- `en-US` (английский)
- `system` — определяет локаль из `navigator.language`
