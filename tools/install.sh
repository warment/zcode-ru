#!/bin/bash
# ZCode RU — установка/откат русской локализации одной командой.
# Использование:
#   bash install.sh             # установить (скачает app-ru.asar из Release)
#   bash install.sh --restore   # откатить к оригиналу из бэкапа
# Ставится на любую версию ZCode (macOS). Что не распозналось — остаётся
# на английском, это штатное поведение. См. SAFETY.md.
set -euo pipefail

REPO="warment/zcode-ru"
VERSION="v2.0.4"
APP="/Applications/ZCode.app"
RES="$APP/Contents/Resources"
ASAR="$RES/app.asar"
BACKUP_DIR="$HOME/.zcode-ru-backup"

log() { echo "==> $*"; }
die() { echo "ОШИБКА: $*" >&2; exit 1; }

[[ "$(uname)" == "Darwin" ]] || die "нужен macOS"
[[ -d "$APP" ]] || die "ZCode.app не найден в /Applications"

if [[ "${1:-}" == "--restore" ]]; then
  [[ -f "$BACKUP_DIR/app.asar.stock" ]] || die "бэкап не найден: $BACKUP_DIR/app.asar.stock"
  pgrep -f "/Applications/ZCode\.app/Contents" >/dev/null && die "сначала закрой ZCode (Cmd+Q)"
  log "восстанавливаю оригинальный asar..."
  cp -f "$BACKUP_DIR/app.asar.stock" "$ASAR"
  xattr -cr "$APP" || true
  codesign --force --deep --sign - "$APP"
  open -a "$APP"
  log "готово — оригинал восстановлен и запущен."
  exit 0
fi

[[ -f "$ASAR" ]] || die "app.asar не найден"
pgrep -f "/Applications/ZCode\.app/Contents" >/dev/null && \
  die "закрой ZCode (Cmd+Q) и запусти снова — установщик не трогает запущенное приложение"

mkdir -p "$BACKUP_DIR"
if [[ ! -f "$BACKUP_DIR/app.asar.stock" ]]; then
  log "бэкап оригинала -> $BACKUP_DIR/app.asar.stock"
  cp -f "$ASAR" "$BACKUP_DIR/app.asar.stock"
fi

URL="https://github.com/$REPO/releases/download/$VERSION/app-ru.asar"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
log "скачиваю $URL ..."
curl -fL --progress-bar "$URL" -o "$TMP/app-ru.asar"
[[ -s "$TMP/app-ru.asar" ]] || die "пустой файл — проверь тег $VERSION в релизах"

log "устанавливаю..."
cp -f "$TMP/app-ru.asar" "$RES/app.asar.new" && mv -f "$RES/app.asar.new" "$ASAR"
xattr -cr "$APP" || true
codesign --force --deep --sign - "$APP"

log "запускаю ZCode..."
open -a "$APP"
sleep 6
pgrep -f "/Applications/ZCode\.app/Contents" >/dev/null || {
  log "не запустилось — откатываю"
  cp -f "$BACKUP_DIR/app.asar.stock" "$ASAR"
  codesign --force --deep --sign - "$APP"
  open -a "$APP"
  die "сборка не подошла, оригинал восстановлен"
}

cat << 'EOF'

Готово! Открой ZCode: Настройки → Язык → «Русский»
(при русской системной локали выбрано автоматически).

Откат в любой момент:  bash install.sh --restore
EOF
