# ZCode RU - Windows installer. Installs Russian localization on any ZCode version.
# Usage (PowerShell): powershell -ExecutionPolicy Bypass -File install.ps1
# Rollback:          powershell -ExecutionPolicy Bypass -File install.ps1 -Restore
param([switch]$Restore)

$ErrorActionPreference = "Stop"
$Repo = "warment/zcode-ru"
$Version = "v2.0.3"
$Candidates = @(
  "$env:LOCALAPPDATA\Programs\zcode\resources",
  "$env:ProgramFiles\ZCode\resources",
  "${env:ProgramFiles(x86)}\ZCode\resources"
)
$Res = $Candidates | Where-Object { Test-Path (Join-Path $_ "app.asar") } | Select-Object -First 1
if (-not $Res) { Write-Host "ОШИБКА: файл app.asar не найден. Сначала установите ZCode Desktop." -ForegroundColor Red; exit 1 }
$Asar = Join-Path $Res "app.asar"
$Backup = Join-Path $env:USERPROFILE ".zcode-ru-backup"
Write-Host "==> ZCode найден: $Res"

if ($Restore) {
  $Stock = Join-Path $Backup "app.asar.stock"
  if (-not (Test-Path $Stock)) { Write-Host "ОШИБКА: резервная копия не найдена: $Stock" -ForegroundColor Red; exit 1 }
  $p = Get-Process -Name "ZCode" -ErrorAction SilentlyContinue
  if ($p) { Write-Host "==> Закрытие ZCode..."; $p | Stop-Process -Force; Start-Sleep -Seconds 3 }
  Copy-Item -Force $Stock $Asar
  Write-Host "==> Исходная версия восстановлена. Запуск ZCode..."
  Start-Process $Asar.Replace("\resources\app.asar", "\ZCode.exe").Replace("resources\ZCode.exe", "ZCode.exe") -ErrorAction SilentlyContinue
  exit 0
}

# download app-ru-win.asar from release
$tmp = Join-Path $env:TEMP "zcode-ru-asar"
New-Item -ItemType Directory -Force -Path $tmp, $Backup | Out-Null
$Url = "https://github.com/$Repo/releases/download/$Version/app-ru-win.asar"
Write-Host "==> Загрузка $Url ..."
$Dest = Join-Path $tmp "app-ru-win.asar"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $Url -OutFile $Dest -UseBasicParsing
if ((Get-Item $Dest).Length -lt 100MB) { Write-Host "ОШИБКА: загруженный файл имеет подозрительный размер ($((Get-Item $Dest).Length) байт)" -ForegroundColor Red; exit 1 }

# close ZCode
$p = Get-Process -Name "ZCode" -ErrorAction SilentlyContinue
if ($p) { Write-Host "==> Закрытие ZCode..."; $p | Stop-Process -Force; Start-Sleep -Seconds 3 }

# backup + swap
if (-not (Test-Path (Join-Path $Backup "app.asar.stock"))) {
  Copy-Item $Asar (Join-Path $Backup "app.asar.stock")
  Write-Host "==> Резервная копия сохранена: $Backup"
}
Copy-Item -Force $Dest $Asar
Write-Host "==> Русская локализация установлена."

# relaunch
$Exe = Get-ChildItem (Split-Path $Res -Parent) -Filter "ZCode.exe" -Recurse -Depth 1 | Select-Object -First 1
if ($Exe) { Start-Process $Exe.FullName; Write-Host "==> Готово. ZCode перезапущен с русской локализацией." }
else { Write-Host "==> Готово. Запустите ZCode вручную." }
