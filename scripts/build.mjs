#!/usr/bin/env node
// Сборка русифицированного app-ru.asar.
// Режимы:
//   --spike  ru-словарь = копия en (спайк цепочки, без перевода)
//   (prod)   ru-словарь = dict/ru/*.json + статические переводы мелких словарей
// Этапы: extract app.asar -> work/stock; копия -> work/build-tree; патчи; pack; верификация.
import { existsSync, mkdirSync, rmSync, cpSync, readFileSync, writeFileSync, readdirSync, statSync, openSync, readSync, closeSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractFile } from '@electron/asar';
import { exposeIntlLocale, patchExploreCounts } from './patch-explore-counts.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const APP = '/Applications/ZCode.app';
const ASAR = process.argv.slice(2).find(a => !a.startsWith('--')) ?? join(APP, 'Contents/Resources/app.asar');
const SPIKE = process.argv.includes('--spike');
const WORK = join(ROOT, 'work'), STOCK = join(WORK, 'stock'), BUILDTREE = join(WORK, 'build-tree');
const OUT = join(ROOT, 'build/app-ru.asar');
const UNPACK_GLOB = '{**/*.node,**/spawn-helper}';
const ASAR_BIN = join(ROOT, 'node_modules/@electron/asar/bin/asar.mjs');

const log = (...a) => console.log(...a);
const fails = [];
function patch(name, content, regex, repl, { min = 1, critical = true } = {}) {
  const re = regex.flags.includes('g') ? regex : new RegExp(regex.source, regex.flags + 'g');
  const ms = [...content.matchAll(re)];
  if (ms.length < min) {
    const msg = `[${name}] найдено ${ms.length} (минимум ${min})`;
    log(critical ? '  !! FAIL ' : '  ~ warn ', msg);
    if (critical) fails.push(msg);
    return content;
  }
  log(`  ok [${name}] замен: ${ms.length}`);
  return content.replace(re, repl);
}

function closeBrace(s, openIdx) {
  let depth = 0, inBt = false, inStr = false, esc = false;
  for (let j = openIdx; j < s.length; j++) {
    const ch = s[j];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (inBt) { if (ch === '`') inBt = false; continue; }
    if (inStr) { if (ch === '"') inStr = false; continue; }
    if (ch === '`') { inBt = true; continue; }
    if (ch === '"') { inStr = true; continue; }
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) return j; }
  }
  throw new Error('unbalanced braces');
}

function readHeader(archive) {
  const fd = openSync(archive, 'r');
  const b = Buffer.alloc(16);
  readSync(fd, b, 0, 16, 0);
  const jsonSize = b.readUInt32LE(12);
  const jb = Buffer.alloc(jsonSize);
  readSync(fd, jb, 0, jsonSize, 16);
  closeSync(fd);
  return JSON.parse(jb.toString('utf8'));
}

// --- 0. отчёт словаря (НЕ блокирует): непереведённое останется английским ---
// Философия: русский ставится на любую версию приложения. Что распозналось — на русском,
// что нет — английское слово. Полный отчёт: node scripts/check.mjs --strict
if (!SPIKE) {
  const corpusPath = join(ROOT, 'upstream/corpus.json');
  if (!existsSync(corpusPath)) {
    log('  ~ warn нет upstream/corpus.json — сверка с корпусом пропущена (запусти `npm run extract`)');
  } else {
    const corpusMtime = statSync(corpusPath).mtimeMs;
    const asarMtime = statSync(ASAR).mtimeMs;
    if (asarMtime > corpusMtime)
      log('  ~ warn корпус старше app.asar — возможен дрифт апстрима, запусти `npm run extract`');
    log('отчёт словаря (не блокирует сборку):');
    spawnSync(process.execPath, [join(ROOT, 'scripts/check.mjs')], { stdio: 'inherit' });
    log('непереведённые ключи останутся английскими — это штатное поведение');
  }
}

// --- 1. свежее дерево из stock ---
if (!existsSync(join(STOCK, 'out'))) {
  log('извлекаю app.asar -> work/stock ...');
  rmSync(STOCK, { recursive: true, force: true });
  spawnSync(process.execPath, [ASAR_BIN, 'extract', ASAR, STOCK], { stdio: 'inherit' });
}
rmSync(BUILDTREE, { recursive: true, force: true });
mkdirSync(dirname(BUILDTREE), { recursive: true });
cpSync(STOCK, BUILDTREE, { recursive: true });
const A = join(BUILDTREE, 'out/renderer/assets');

// --- 2. рус-словарь ---
let ruItemsText = '';
if (!SPIKE) {
  const dictDir = join(ROOT, 'dict/ru');
  const ru = {};
  for (const f of readdirSync(dictDir).filter(f => f.endsWith('.json')).sort())
    Object.assign(ru, JSON.parse(readFileSync(join(dictDir, f), 'utf8')));
  const esc = v => v.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  ruItemsText = Object.entries(ru).map(([k, v]) => `"${k}":\`${esc(v)}\``).join(',');
  log(`рус-словарь: ${Object.keys(ru).length} ключей`);
} else {
  // спайк: 3 тестовые строки — их видно на экране сразу после переключения
  const esc = v => v.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const test = { 'chat.send': 'Отправить', 'settings.title': 'Настройки', 'settings.locale': 'Язык' };
  ruItemsText = Object.entries(test).map(([k, v]) => `"${k}":\`${esc(v)}\``).join(',');
  log('SPIKE: ru = копия en + 3 тестовые строки');
}

// --- 3. IntlProvider: реестр + whitelists + системное определение ---
const intlFile = readdirSync(A).find(f => /^IntlProvider-[\w-]+\.js$/.test(f));
const iP = join(A, intlFile);
let c = readFileSync(iP, 'utf8');
c = exposeIntlLocale(c);
log('IntlProvider:', intlFile);
c = patch('реестр+ru-словарь', c,
  /(\w+)=\{"zh-CN":(\w+),"en-US":(\w+)\}/,
  (m0, v, z, e) => `${v}={"zh-CN":${z},"en-US":${e},"ru-RU":Object.assign({},${e},{${ruItemsText}})}`,
  { min: 1 });
c = patch('whitelist-локалей', c,
  /===`zh-CN`\|\|(\w+)===`en-US`/g,
  (m0, v) => `===\`zh-CN\`||${v}===\`en-US\`||${v}===\`ru-RU\``,
  { min: 1 });
c = patch('обратный-whitelist', c,
  /===`en-US`\|\|(\w+)===`zh-CN`/g,
  (m0, v) => `===\`en-US\`||${v}===\`zh-CN\`||${v}===\`ru-RU\``,
  { min: 0, critical: false });
c = patch('системное-определение', c,
  /(\w[\w$]*)\.toLowerCase\(\)\.startsWith\(`zh`\)\?`zh-CN`:`en-US`/g,
  (m0, v) => `${v}.toLowerCase().startsWith(\`zh\`)?\`zh-CN\`:${v}.toLowerCase().startsWith(\`ru\`)?\`ru-RU\`:\`en-US\``,
  { min: 1 });
writeFileSync(iP, c);

// --- 4. styles: селектор языка ---
const stylesFile = readdirSync(A).find(f => /^styles-[\w-]+\.js$/.test(f) &&
  readFileSync(join(A, f), 'utf8').includes('settings.locale.zh-CN'));
const sP = join(A, stylesFile);
let s = readFileSync(sP, 'utf8');
s = patchExploreCounts(s);
log('styles:', stylesFile);
s = patch('селектор: option ru-RU', s,
  /\(0,([\w$]+)\.jsx\)\((\w+),\{value:`en-US`,children:(\w+)\.formatMessage\(\{id:`settings\.locale\.en-US`\}\)\}\)/g,
  (m0, jsx, comp, varName) =>
    `(0,${jsx}.jsx)(${comp},{value:\`en-US\`,children:${varName}.formatMessage({id:\`settings.locale.en-US\`})}),(0,${jsx}.jsx)(${comp},{value:\`ru-RU\`,children:\`Русский\`})`,
  { min: 1 });
s = patch('селектор: option ru-RU (+testid)', s,
  /\(0,([\w$]+)\.jsx\)\((\w+),\{value:`en-US`,"data-testid":(\w+)\((\w+),`en-US`\),children:(\w+)\.formatMessage\(\{id:`settings\.locale\.en-US`\}\)\}\)/g,
  (m0, jsx, comp, vo, ra, varName) =>
    `(0,${jsx}.jsx)(${comp},{value:\`en-US\`,"data-testid":${vo}(${ra},\`en-US\`),children:${varName}.formatMessage({id:\`settings.locale.en-US\`})}),(0,${jsx}.jsx)(${comp},{value:\`ru-RU\`,"data-testid":${vo}(${ra},\`ru-RU\`),children:\`Русский\`})`,
  { min: 0, critical: false });
s = patch('лейбл-хелпер текущей локали', s,
  /function (\w+)\((\w+),(\w+)\)\{return \3\.formatMessage\(\{id:\2===`en-US`\?`settings\.locale\.en-US`:`settings\.locale\.zh-CN`\}\)\}/,
  (m0, fn, loc, t) =>
    `function ${fn}(${loc},${t}){return ${loc}===\`en-US\`?${t}.formatMessage({id:\`settings.locale.en-US\`}):${loc}===\`ru-RU\`?\`Русский\`:${t}.formatMessage({id:\`settings.locale.zh-CN\`})}`,
  { min: 0, critical: false });
writeFileSync(sP, s);

// --- 5. мелкие словари (process-monitor, cua-permission-panel): +ru-RU подобъект ---
const RU_SMALL = {
  'process-monitor': "{title:`Мониторинг процессов`,process:`Процесс`,pid:`PID`,cpu:`CPU`,memory:`Память`,processCount:e=>`${e} процессов`,loading:`Чтение метрик процессов...`,unavailable:`Мост мониторинга процессов недоступен`}",
  'cua-permission-panel': "{documentTitle:`Разрешения ZCode Computer Use`,dragTitle:`Перетащите меня в список разрешений выше`,hintPrefix:`Перетащите значок слева в раздел «`,hintSuffix:`» выше`,completion:`Отпустите, чтобы выдать разрешение — переключатель не нужен`,accessibility:`Универсальный доступ`,screen_recording:`Запись экрана`}",
};
for (const [prefix, ruObj] of Object.entries(RU_SMALL)) {
  const f = readdirSync(A).find(f => f.startsWith(prefix));
  if (!f) { fails.push(`мелкий словарь не найден: ${prefix}`); continue; }
  const fp = join(A, f);
  let m = readFileSync(fp, 'utf8');
  const anchor = m.match(/\w+=\{"zh-CN":\{/);
  if (!anchor) { fails.push(`${prefix}: якорь словаря не найден`); continue; }
  const start = m.indexOf('{"zh-CN":{', anchor.index);
  const dictClose = closeBrace(m, start);
  const enIdx = m.indexOf('"en-US":{', start);
  const enClose = closeBrace(m, enIdx + 8);
  const enInner = m.slice(enIdx + 8, enClose + 1); // "{...}" en-подобъекта
  const insert = `,"ru-RU":${SPIKE ? enInner : ruObj}`;
  m = m.slice(0, dictClose + 1) + insert + m.slice(dictClose + 1);
  writeFileSync(fp, m);
  log(`  ok [${prefix}] ru-RU подсловарь добавлен (+${insert.length} байт)`);
}

// --- 6. main process: Zod-схема, системное определение, списки локалей ---
// Словарь меню-бара/tray/dock (chunk-47DZU7O5.js, var sp): у апстрима только zh-CN/en-US,
// fallback sp[Kr] = zh-CN — без ru-RU меню остаётся китайским. Добавляем третий словарь.
const MENU_RU = '"desktopMenu.help.checkingForUpdates":"Проверка обновлений…","desktopMenu.help.downloadingUpdateProgress":"Скачивание обновления… {progress}","desktopMenu.help.downloadingUpdateVersion":"Скачивание обновления {version}…","desktopMenu.help.restartToUpdate":"Перезапустить для обновления ({version})","desktopMenu.help.updateAvailableVersion":"Доступна новая версия {version}","dock.menu.showCurrentWindow":"Показать текущее окно","titleBar.menu.app.hide":"Скрыть {appName}","titleBar.menu.app.hideOthers":"Скрыть остальные","titleBar.menu.app.quit":"Завершить {appName}","titleBar.menu.app.services":"Службы","titleBar.menu.app.showAll":"Показать все","titleBar.menu.edit":"Правка","titleBar.menu.edit.copy":"Копировать","titleBar.menu.edit.cut":"Вырезать","titleBar.menu.edit.delete":"Удалить","titleBar.menu.edit.paste":"Вставить","titleBar.menu.edit.redo":"Повторить","titleBar.menu.edit.selectAll":"Выбрать все","titleBar.menu.edit.undo":"Отменить","titleBar.menu.file":"Файл","titleBar.menu.file.closeWindow":"Закрыть окно","titleBar.menu.file.newTask":"Новая задача","titleBar.menu.file.openWorkspace":"Открыть рабочую папку","titleBar.menu.help":"Справка","titleBar.menu.help.about":"О программе ZCode","titleBar.menu.help.checkForUpdates":"Проверить обновления","titleBar.menu.help.clearAllData":"Очистить все данные","titleBar.menu.help.exportLogs":"Экспортировать логи","titleBar.menu.help.feedback":"Обратная связь","titleBar.menu.help.processMonitor":"Мониторинг процессов","titleBar.menu.help.startPerformanceRecording":"Начать запись производительности","titleBar.menu.help.stopPerformanceRecording":"Остановить запись производительности","titleBar.menu.help.toggleDevTools":"Инструменты разработчика","titleBar.menu.help.toggleZCodeStdioTap":"Перехват stdio-трафика агента","titleBar.menu.help.whatsNew":"Что нового","titleBar.menu.help.zcodeEndpoint":"ZCode Endpoint","titleBar.menu.help.zcodeEndpoint.custom":"Свой…","titleBar.menu.help.zcodeEndpoint.production":"Production (по умолчанию)","titleBar.menu.help.zcodeEndpoint.reset":"Сбросить","titleBar.menu.help.zcodeEndpoint.test":"Test","titleBar.menu.view":"Вид","titleBar.menu.view.actualSize":"Фактический размер","titleBar.menu.view.toggleFullScreen":"Переключить полный экран","titleBar.menu.view.zoomIn":"Увеличить","titleBar.menu.view.zoomOut":"Уменьшить","titleBar.menu.window":"Окно","titleBar.menu.window.bringAllToFront":"Все окна вперёд","titleBar.menu.window.minimize":"Свернуть","titleBar.menu.window.zoom":"Масштаб","tray.menu.openZCode":"Открыть ZCode","tray.menu.quit":"Завершить","tray.tooltip":"ZCode"';
const mainDir = join(BUILDTREE, 'out/main');
for (const f of readdirSync(mainDir).filter(f => f.endsWith('.js'))) {
  const fp = join(mainDir, f);
  let m = readFileSync(fp, 'utf8');
  let touched = false;
  // 6a. меню-словарь sp: вставляем "ru-RU":{...} рядом с "en-US":{...}
  const spAnchor = m.match(/\w+=\{"zh-CN":\{"titleBar\.menu\.file"/);
  if (spAnchor) {
    const objStart = m.indexOf('{"zh-CN":{', spAnchor.index);
    const spClose = closeBrace(m, objStart);
    // найти внутри sp открывающую скобку en-US-подобъекта
    const enKey = m.indexOf('"en-US":{', objStart);
    const enBrace = m.indexOf('{', enKey);
    const enClose = closeBrace(m, enBrace);
    const enInner = m.slice(enBrace + 1, enClose); // содержимое en-US без скобок
    const ruDict = SPIKE ? enInner : MENU_RU;
    // вставка ПЕРЕД закрывающей скобкой sp: ,"ru-RU":{...}
    const insert = `,"ru-RU":{${ruDict}}`;
    m = m.slice(0, spClose) + insert + m.slice(spClose);
    writeFileSync(fp, m);
    log(`  ok [main:меню-словарь sp] ru-RU добавлен (+${insert.length} байт)`);
    touched = true;
    m = readFileSync(fp, 'utf8');
  } else if (m.includes('"titleBar.menu.file"')) {
    fails.push(`меню-словарь sp: якорь не найден в ${f}`);
  }
  // 6b. словарь About-диалога AK (index.js): {"zh-CN":{aboutTitle:...},"en-US":{...}},
  // wO(locale)=AK[locale]??AK[wn='zh-CN'] — без ru-RU About китайский. Вставляем ru-RU.
  const akAnchor = m.match(/=\{"zh-CN":\{aboutTitle:/);
  if (akAnchor) {
    const objStart = m.indexOf('{"zh-CN":{', akAnchor.index);
    const akClose = closeBrace(m, objStart);
    // en-US-подобъект AK: внутри есть функции (s(e=>`...`)), для SPIKE просто копируем en-US целиком
    const enKey = m.indexOf('"en-US":{', objStart);
    const enBrace = m.indexOf('{', enKey);
    const enClose = closeBrace(m, enBrace);
    const enInner = m.slice(enBrace + 1, enClose);
    const ruAbout = SPIKE
      ? enInner
      : 'aboutTitle:`О программе ZCode`,versionLabel:`Версия`,okButtonLabel:`ОК`,optimizedForAppleSilicon:`Оптимизировано для Apple Silicon.`,copyright:s(e=>`Все права защищены © ${e} ZCode.`,"copyright")';
    // copyright в AK — вызов s(...), он уже в scope (s определён в модуле). Вставляем ,"ru-RU":{...}
    const insert = `,"ru-RU":{${ruAbout}}`;
    m = m.slice(0, akClose) + insert + m.slice(akClose);
    writeFileSync(fp, m);
    log(`  ok [main:About-словарь AK] ru-RU добавлен (+${insert.length} байт)`);
    touched = true;
    m = readFileSync(fp, 'utf8');
  }
  // 6c. константа версии в main/host чанках: апстрим забывает бампать Yu="3.10.1" между релизами
  // (баг 3.10.2: About показывает старую версию). Ставим версию из Info.plist установленного приложения.
  const appVersion = (() => {
    try { return spawnSync('/usr/libexec/PlistBuddy', ['-c', 'Print :CFBundleShortVersionString', join(APP, 'Contents/Info.plist')], { encoding: 'utf8' }).stdout.trim(); }
    catch { return null; }
  })();
  if (appVersion && !SPIKE) {
    const before = m;
    m = m.replace(/var\s+(\w+)="3\.10\.\d+"/g, `var $1="${appVersion}"`);
    if (m !== before) log(`  ok [main:константа версии] -> ${appVersion}`);
  }
  if (!m.includes('"zh-CN"')) continue;
  log('main:', f);
  m = patch('main:Zod-enum', m,
    /enum\(\["zh-CN","en-US"\]\)/g,
    'enum(["zh-CN","en-US","ru-RU"])', { min: 0, critical: false });
  m = patch('main:системное-определение', m,
    /\((\w+)\.getPreferredSystemLanguages\?\.\(\)\[0\]\?\?(\w+)\.getLocale\(\)\)\.toLowerCase\(\)\.startsWith\("zh"\)\?"zh-CN":"en-US"/,
    (m0, langs, electron) => {
      const subj = `(${langs}.getPreferredSystemLanguages?.()[0]??${electron}.getLocale()).toLowerCase()`;
      return `${subj}.startsWith("zh")?"zh-CN":${subj}.startsWith("ru")?"ru-RU":"en-US"`;
    },
    { min: 0, critical: false });
  m = patch('main:список-локалей', m,
    /(\w+)==="zh-CN"\?\["zh-CN","en-US"\]:\["en-US","zh-CN"\]/,
    (m0, v) => `${v}==="ru-RU"?["ru-RU","en-US","zh-CN"]:${v}==="zh-CN"?["zh-CN","en-US"]:["en-US","zh-CN"]`,
    { min: 0, critical: false });
  writeFileSync(fp, m);
}

// --- 6b. host: описания встроенных агентов и стилей вывода (Настройки → Субагенты) ---
const HOST_DESC = [
  ['General-purpose agent for researching complex questions, searching for code, and executing multi-step tasks.',
   'Универсальный агент для исследования сложных вопросов, поиска по коду и выполнения многошаговых задач.'],
  ['Read-only search agent for broad fan-out searches.',
   'Агент поиска только для чтения — широкий параллельный обход.'],
  ['Claude completes coding tasks efficiently and provides concise responses',
   'Claude эффективно выполняет задачи по коду и отвечает лаконично'],
  ['Claude explains its implementation choices and codebase patterns',
   'Claude объясняет свои решения по реализации и паттерны кодовой базы'],
  ['Claude pauses and asks you to write small pieces of code for hands-on practice',
   'Claude делает паузу и предлагает вам написать небольшие фрагменты кода для практики'],
];
const hostDir = join(BUILDTREE, 'out/host');
for (const f of readdirSync(hostDir).filter(f => f.endsWith('.js'))) {
  const fp = join(hostDir, f);
  let h = readFileSync(fp, 'utf8');
  let n = 0;
  for (const [en, ru] of HOST_DESC) {
    const before = h;
    h = h.replace(`description:"${en}"`, `description:"${ru}"`);
    if (h !== before) n++;
  }
  if (n) { writeFileSync(fp, h); log(`  ok [host:описания агентов] замен: ${n}`); }
}

// --- 6c. глобальный свип: Zod-схемы локалей и whitelist'ы дублируются в каждом слое бандла ---
const changedSweep = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const fp = join(dir, f);
    if (statSync(fp).isDirectory()) { walk(fp); continue; }
    if (!/\.(js|cjs)$/.test(f)) continue;
    let c = readFileSync(fp, 'utf8');
    const b4 = c;
    c = c.split('enum(["zh-CN","en-US"])').join('enum(["zh-CN","en-US","ru-RU"])');
    c = c.split('enum(["system","zh-CN","en-US"])').join('enum(["system","zh-CN","en-US","ru-RU"])');
    if (fp.includes('/assets/')) {
      c = c.replace(/===`zh-CN`\|\|(\w+)===`en-US`/g,
        (m, v) => `===\`zh-CN\`||${v}===\`en-US\`||${v}===\`ru-RU\``);
      c = c.replace(/===`en-US`\|\|(\w+)===`zh-CN`/g,
        (m, v) => `===\`en-US\`||${v}===\`zh-CN\`||${v}===\`ru-RU\``);
    }
    if (c !== b4) { writeFileSync(fp, c); changedSweep.push(fp); }
  }
})(join(BUILDTREE, 'out'));
log(`  ok [zod-схемы+whitelist'ы локалей] файлов с заменами: ${changedSweep.length}`);
changedSweep.forEach(f => log(`    - ${f.replace(BUILDTREE, '')}`));

// --- 7. верификация парсинга ---
log('\nверификация парсинга:');
for (const f of [iP, sP, ...changedSweep]) {
  const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
  log(`  ${r.status === 0 ? 'ok' : '!! FAIL'} ${f.replace(BUILDTREE, '')}`);
  if (r.status !== 0) { fails.push('parse: ' + f); if (r.stderr) log(r.stderr.slice(0, 400)); }
}

// --- 8. упаковка ---
if (fails.length) {
  log(`\nСБОРКА ПРЕРВАНА: ${fails.length} критических проблем:`);
  fails.forEach(f => log('  -', f));
  process.exit(1);
}
rmSync(OUT, { force: true });
rmSync(OUT + '.unpacked', { recursive: true, force: true });
mkdirSync(dirname(OUT), { recursive: true });
log('\nупаковка asar ...');
const pack = spawnSync(process.execPath, [ASAR_BIN, 'pack', BUILDTREE, OUT, '--unpack', UNPACK_GLOB], { stdio: 'inherit' });
if (pack.status !== 0) { log('FAIL: asar pack'); process.exit(1); }

// --- 9. сверка хедеров stock vs build ---
const a = flatHeader(ASAR), b = flatHeader(OUT);
const changed = Object.keys(a).filter(k => !b[k] || a[k][1] !== b[k][1] || (!a[k][1] && a[k][0] !== b[k][0]));
log(`файлов: ${Object.keys(a).length} -> ${Object.keys(b).length}; изменённых: ${changed.length}`);
changed.forEach(k => log('  *', k, `${a[k][0]} -> ${b[k]?.[0]}`));
log(`\nOK: build/app-ru.asar ${(statSync(OUT).size / 1048576).toFixed(0)} MB ${SPIKE ? '(SPIKE)' : ''}`);

function flatHeader(archive) {
  const h = readHeader(archive);
  const out = {};
  (function walk(node, p) {
    for (const [k, v] of Object.entries(node.files ?? {})) {
      const q = p ? p + '/' + k : k;
      if (v.files) walk(v, q);
      else out[q] = [v.size, !!v.unpacked];
    }
  })(h, '');
  return out;
}
