#!/usr/bin/env python3
"""
Патч JS-бандла ZCode для добавления локали 'ru'.
Работает с КОПИЕЙ приложения в ~/ai/ZCode/ZCode-ru.app
Исправленная версия с бэктик-синтаксисом.
"""

import sys, os, subprocess, shutil

WORKDIR = os.path.expanduser('~/ai/ZCode')
EXTRACTED = f'{WORKDIR}/_extracted'
APP_COPY = f'{WORKDIR}/ZCode-ru.app'

# ВАЖНО: в JS-бандле строки используют разные виды кавычек.
# nNt использует "двойные", остальные — `бэктики` (template literals)
REPLACEMENTS = [
    # 1. nNt: добавить "ru":Ze (двойные кавычки!)
    ('nNt={"zh-CN":at,"en-US":Ze}', 'nNt={"zh-CN":at,"en-US":Ze,"ru":Ze}'),

    # 2. JQ() диспетчер перевода (=== с бэктиками!)
    ('(wut()===`en-US`?Ze:at)', '(wut()===`en-US`?Ze:wut()===`ru`?Ze:at)'),

    # 3. Zat() валидация
    ('e===`zh-CN`||e===`en-US`||e===`system`?e:null',
     'e===`zh-CN`||e===`en-US`||e===`ru`||e===`system`?e:null'),

    # 4. Xat() country code
    ('e===`zh-CN`?`cn`:e===`en-US`?`en`',
     'e===`zh-CN`?`cn`:e===`en-US`?`en`:e===`ru`?`ru`'),

    # 5. wut() проверка
    ('e===`zh-CN`||e===`en-US`)return e',
     'e===`zh-CN`||e===`en-US`||e===`ru`)return e'),

    # 6. system fallback navigator.language
    ('navigator.language.toLowerCase().startsWith(`zh`)?`zh-CN`:`en-US`',
     'navigator.language.toLowerCase().startsWith(`zh`)?`zh-CN`:navigator.language.toLowerCase().startsWith(`ru`)?`ru`:`en-US`'),

    # 7. tt mobile handler
    ('(e===`zh-CN`||e===`en-US`)&&B(e)',
     '(e===`zh-CN`||e===`en-US`||e===`ru`)&&B(e)'),

    # 8. settings page handler d(e)
    ('(e===`zh-CN`||e===`en-US`)&&d(e)',
     '(e===`zh-CN`||e===`en-US`||e===`ru`)&&d(e)'),

    # 9. Sidebar menu: вставить ru SelectItem над en-US
    ('{value:`en-US`,children:h.formatMessage({id:`sidebar.settings.locale.en-US`})})',
     '{value:`ru`,children:h.formatMessage({id:`sidebar.settings.locale.ru`})}),'
     '(0,Y.jsx)(Y_,{value:`en-US`,children:h.formatMessage({id:`sidebar.settings.locale.en-US`})})'),

    # 10. Settings page menu: вставить ru над en-US
    ('{value:`en-US`,children:j.formatMessage({id:`settings.locale.en-US`})})',
     '{value:`ru`,children:j.formatMessage({id:`settings.locale.ru`})}),'
     '(0,Y.jsx)(r_,{value:`en-US`,children:j.formatMessage({id:`settings.locale.en-US`})})'),
]


def patch_js(filepath: str) -> bool:
    with open(filepath, 'r') as f:
        content = f.read()
    ok = True
    applied = 0
    for old, new in REPLACEMENTS:
        count = content.count(old)
        if count == 0:
            print(f'  ❌ НЕ НАЙДЕНО: {old[:70]}')
            ok = False
        else:
            content = content.replace(old, new)
            applied += 1
            print(f'  ✅ {applied}/10 ({count}x)')
    if not ok:
        print('\n❌ Некоторые замены не найдены — проверь синтаксис!')
        return False
    with open(filepath, 'w') as f:
        f.write(content)
    print(f'\n✅ Применено {applied}/10 замен.')
    return True


def repack_asar():
    asar_path = f'{APP_COPY}/Contents/Resources/app.asar'
    if not os.path.exists(asar_path):
        print(f'❌ app.asar не найден: {asar_path}')
        return False
    tmp = '/tmp/zcode_ru_build'
    if os.path.exists(tmp):
        shutil.rmtree(tmp)
    os.makedirs(tmp)
    print(f'Извлечение app.asar из копии...')
    subprocess.run(['npx', '@electron/asar', 'extract', asar_path, tmp],
                   check=True, cwd=WORKDIR, capture_output=True)
    # Копируем пропатченный JS
    for fname in os.listdir(f'{EXTRACTED}/out/renderer/assets/'):
        src = f'{EXTRACTED}/out/renderer/assets/{fname}'
        dst = f'{tmp}/out/renderer/assets/{fname}'
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
    # Бэкап
    backup = asar_path + '.backup'
    if not os.path.exists(backup):
        shutil.copy2(asar_path, backup)
        print(f'Бэкап: {backup}')
    # Перепаковка
    subprocess.run(['npx', '@electron/asar', 'pack', tmp, asar_path],
                   check=True, cwd=WORKDIR, capture_output=True)
    print(f'✅ app.asar пересобран')
    return True


def resign_app():
    subprocess.run(['xattr', '-cr', APP_COPY], check=False)
    subprocess.run(['codesign', '--force', '--deep', '--sign', '-', APP_COPY], check=True)
    print('✅ Подпись обновлена')


def main():
    assets = f'{EXTRACTED}/out/renderer/assets/'
    js_files = [f for f in os.listdir(assets) if f.startswith('index-') and f.endswith('.js')]
    if not js_files:
        print('❌ JS-бандл не найден')
        sys.exit(1)
    bundle = f'{assets}/{js_files[0]}'
    print(f'Бандл: {js_files[0]}')

    if not patch_js(bundle):
        sys.exit(1)
    if not repack_asar():
        sys.exit(1)
    resign_app()
    print(f'\n🎉 Готово! Запуск: open {APP_COPY}')
    print('⚠️  Закрой оригинальный ZCode.app перед запуском копии!')


if __name__ == '__main__':
    main()
