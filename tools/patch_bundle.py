#!/usr/bin/env python3
"""
Патч JS-бандла ZCode для замены китайского на русский.
Применяется к оригинальному приложению.
"""

import sys, os, subprocess, shutil

APP = os.path.expanduser('/Applications/ZCode.app')
EXTRACTED = os.path.expanduser('~/ai/ZCode/_extracted')

REPLACEMENTS = [
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
    ('h.formatMessage({id:`sidebar.settings.locale.zh-CN`})', '`Русский`'),
    ('j.formatMessage({id:`settings.locale.zh-CN`})', '`Русский`'),
]


def patch_js(filepath: str) -> bool:
    with open(filepath, 'r') as f:
        content = f.read()
    ok = True
    applied = 0
    for old, new in REPLACEMENTS:
        count = content.count(old)
        if count == 0:
            print(f'  WARNING: not found: {old[:70]}')
            ok = False
        else:
            content = content.replace(old, new)
            applied += 1
            print(f'  OK {applied}/{len(REPLACEMENTS)} ({count}x)')
    if not ok:
        print('\nSome patterns not found')
        return False
    with open(filepath, 'w') as f:
        f.write(content)
    print(f'\nApplied {applied}/{len(REPLACEMENTS)} patches')
    return True


def repack_asar():
    asar_path = f'{APP}/Contents/Resources/app.asar'
    if not os.path.exists(asar_path):
        print(f'app.asar not found: {asar_path}')
        return False
    tmp = '/tmp/zcode_ru_build'
    if os.path.exists(tmp):
        shutil.rmtree(tmp)
    os.makedirs(tmp)
    print('Extracting app.asar...')
    subprocess.run(['npx', '@electron/asar', 'extract', asar_path, tmp],
                   check=True, capture_output=True)
    for fname in os.listdir(f'{EXTRACTED}/out/renderer/assets/'):
        src = f'{EXTRACTED}/out/renderer/assets/{fname}'
        dst = f'{tmp}/out/renderer/assets/{fname}'
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
    backup = asar_path + '.backup'
    if not os.path.exists(backup):
        shutil.copy2(asar_path, backup)
        print(f'Backup: {backup}')
    subprocess.run(['npx', '@electron/asar', 'pack', tmp, asar_path],
                   check=True, capture_output=True)
    print('app.asar repacked')
    return True


def resign_app():
    subprocess.run(['xattr', '-cr', APP], check=False)
    subprocess.run(['codesign', '--force', '--deep', '--sign', '-', APP], check=True)
    print('Signature updated')


def main():
    assets = f'{EXTRACTED}/out/renderer/assets/'
    js_files = [f for f in os.listdir(assets) if f.startswith('index-') and f.endswith('.js')]
    if not js_files:
        print('JS bundle not found')
        sys.exit(1)
    bundle = f'{assets}/{js_files[0]}'
    print(f'Bundle: {js_files[0]}')

    if not patch_js(bundle):
        sys.exit(1)
    if not repack_asar():
        sys.exit(1)
    resign_app()
    print(f'\nDone! Open ZCode — settings will show English and Russian.')


if __name__ == '__main__':
    main()
