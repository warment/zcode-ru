#!/bin/bash
# Русификация ZCode 3.0.1
# Заменяет китайский язык на русский в оригинальном приложении.
# После патча в настройках: English + Русский.
#
# Использование: ./patch.sh [путь к ZCode.app]
# По умолчанию: /Applications/ZCode.app

set -e

APP="${1:-/Applications/ZCode.app}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=== Русификация ZCode ==="
echo "Приложение: $APP"

if [ ! -d "$APP" ]; then
  echo "❌ Приложение не найдено: $APP"
  exit 1
fi

# 1. Извлечь app.asar
echo "[1/4] Извлечение app.asar..."
ASAR="$APP/Contents/Resources/app.asar"
TMP="/tmp/zcode_patch_$$"
rm -rf "$TMP"
npx --yes @electron/asar extract "$ASAR" "$TMP" 2>/dev/null

# 2. Применить патчи
echo "[2/4] Патчи..."

python3 << 'PYEOF'
import json, os

PROJECT = os.environ.get('PROJECT_DIR', os.path.dirname(os.path.dirname(os.path.abspath('__file__'))))
TMP = os.environ.get('TMP', '/tmp/zcode_patch')

# Найти файлы
assets = f'{TMP}/out/renderer/assets/'
chunk = None
for f in os.listdir(assets):
    if f.startswith('usageStatsUiParts-') and f.endswith('.js'):
        chunk = f'{assets}/{f}'
        break
if not chunk:
    print('ERROR: chunk not found')
    exit(1)

index_js = None
for f in os.listdir(assets):
    if f.startswith('index-') and f.endswith('.js'):
        index_js = f'{assets}/{f}'
        break
if not index_js:
    print('ERROR: index.js not found')
    exit(1)

# Загрузить ru.json
ru_path = os.path.join(PROJECT, 'ru', 'ru.json')
if not os.path.exists(ru_path):
    print(f'ERROR: {ru_path} not found')
    exit(1)
with open(ru_path, 'r') as f:
    ru = json.load(f)

# === ПАТЧ CHUNK: заменить китайский (sv) на русский ===
print(f'  Patching chunk: {os.path.basename(chunk)}')
with open(chunk, 'r') as f:
    content = f.read()

sv_start = content.find('sv={')
if sv_start == -1:
    print('ERROR: sv dictionary not found in chunk')
    exit(1)

brace = 0; started = False; sv_end = -1
for i in range(sv_start, len(content)):
    c = content[i]
    if c == '{': brace += 1; started = True
    elif c == '}':
        brace -= 1
        if started and brace == 0: sv_end = i + 1; break

items = []
for k, v in ru.items():
    vs = v.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')
    items.append(f'"{k}":`{vs}`')
new_sv = 'sv={' + ','.join(items) + '}'
content = content[:sv_start] + new_sv + content[sv_end:]
with open(chunk, 'w') as f:
    f.write(content)

# === ПАТЧ index.js ===
print(f'  Patching index: {os.path.basename(index_js)}')
with open(index_js, 'r') as f:
    idx = f.read()

patches_index = [
    ('nNt={"zh-CN":at,"en-US":Ze}', 'nNt={"zh-CN":at,"en-US":Ze,"ru":at}'),
    ('(wut()===`en-US`?Ze:at)', '(wut()===`en-US`?Ze:wut()===`ru`?at:at)'),
    ('e===`zh-CN`||e===`en-US`||e===`system`?e:null',
     'e===`zh-CN`||e===`en-US`||e===`ru`||e===`system`?e:null'),
    ('e===`zh-CN`?`cn`:e===`en-US`?`en`',
     'e===`zh-CN`?`cn`:e===`en-US`?`en`:e===`ru`?`ru`'),
    ('e===`zh-CN`||e===`en-US`)return e',
     'e===`zh-CN`||e===`en-US`||e===`ru`)return e'),
    ('navigator.language.toLowerCase().startsWith(`zh`)?`zh-CN`:`en-US`',
     'navigator.language.toLowerCase().startsWith(`zh`)?`zh-CN`:navigator.language.toLowerCase().startsWith(`ru`)?`ru`:`en-US`'),
    ('(e===`zh-CN`||e===`en-US`)&&B(e)',
     '(e===`zh-CN`||e===`en-US`||e===`ru`)&&B(e)'),
    ('(e===`zh-CN`||e===`en-US`)&&d(e)',
     '(e===`zh-CN`||e===`en-US`||e===`ru`)&&d(e)'),
    ('Sut=`zcode-locale-preference`', 'Sut=`zcode-locale`'),
    ('Wat=`zcode-locale-preference`', 'Wat=`zcode-locale`'),
    ('setLocale:t=>{localStorage.setItem(`zcode-locale`,t),e({locale:t})}',
     'setLocale:t=>{localStorage.setItem(`zcode-locale`,t),localStorage.setItem(`zcode-locale-preference`,t),e({locale:t})}'),
    ('h.formatMessage({id:`sidebar.settings.locale.zh-CN`})', '`Русский`'),
    ('j.formatMessage({id:`settings.locale.zh-CN`})', '`Русский`'),
]

for old, new in patches_index:
    if old in idx:
        idx = idx.replace(old, new)
    else:
        print(f'    WARNING: pattern not found: {old[:50]}')

with open(index_js, 'w') as f:
    f.write(idx)

# === ПАТЧ main процесса ===
main_dir = f'{TMP}/out/main/'
for fname in os.listdir(main_dir):
    if not fname.endswith('.js'): continue
    fpath = f'{main_dir}/{fname}'
    with open(fpath, 'r') as f:
        mc = f.read()
    
    if ',cl=r.enum(["zh-CN","en-US"])' in mc:
        mc = mc.replace(',cl=r.enum(["zh-CN","en-US"])', ',cl=r.enum(["zh-CN","en-US","ru"])')
        print(f'  Patched main: {fname} (Zod)')
    if 'function wk(e){return e==="zh-CN"?["zh-CN","en-US"]:["en-US","zh-CN"]}' in mc:
        mc = mc.replace(
            'function wk(e){return e==="zh-CN"?["zh-CN","en-US"]:["en-US","zh-CN"]}',
            'function wk(e){return e==="zh-CN"?["zh-CN","en-US","ru"]:e==="en-US"?["en-US","zh-CN","ru"]:["ru","en-US","zh-CN"]}')
        print(f'  Patched main: {fname} (wk)')
    if 'function wC(){return Ha.getLocale().toLowerCase().startsWith("zh")?"zh-CN":"en-US"}' in mc:
        mc = mc.replace(
            'function wC(){return Ha.getLocale().toLowerCase().startsWith("zh")?"zh-CN":"en-US"}',
            'function wC(){let e=Ha.getLocale().toLowerCase();return e.startsWith("zh")?"zh-CN":e.startsWith("ru")?"ru":"en-US"}')
        print(f'  Patched main: {fname} (wC)')
    
    with open(fpath, 'w') as f:
        f.write(mc)

print('  Done')
PYEOF

# 3. Перепаковать asar
echo "[3/4] Упаковка app.asar..."
npx --yes @electron/asar pack "$TMP" "$ASAR" 2>/dev/null
rm -rf "$TMP"

# 4. Подписать
echo "[4/4] Подпись..."
xattr -cr "$APP"
codesign --force --deep --sign - "$APP" 2>/dev/null

echo ""
echo "=== Готово! ==="
echo "Открой ZCode — в настройках будут English и Русский."
