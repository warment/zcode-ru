import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const files = readdirSync(new URL('dict/ru/', root)).filter(name => name.endsWith('.json')).sort();
const sources = files.map(name => readFileSync(new URL(`dict/ru/${name}`, root), 'utf8'));
const translations = Object.assign({}, ...sources.map(source => JSON.parse(source)));
const corpus = Object.assign({}, ...Object.values(JSON.parse(readFileSync(new URL('upstream/corpus.json', root), 'utf8'))));
const tokens = value => [...value.matchAll(/\{[^{}]+\}/g)].map(match => match[0]).sort();
const render = (key, values) => translations[key].replace(/\{([^{}]+)\}/g, (_, name) => {
  assert.ok(Object.hasOwn(values, name), `${key}: missing ${name}`);
  return String(values[name]);
});
const counts = [2, 4, 21, 22, 101, 0, 1, 5, 11];

test('all corpus keys occur exactly once with unchanged placeholder multiplicities', () => {
  const keys = sources.flatMap(source => [...source.matchAll(/^\s*("(?:[^"\\]|\\.)*")\s*:/gm)].map(match => JSON.parse(match[1])));
  assert.equal(keys.length, new Set(keys).size, 'duplicate JSON key');
  assert.deepEqual([...keys].sort(), Object.keys(corpus).sort());
  for (const key of keys) {
    assert.equal(typeof translations[key], 'string', key);
    assert.deepEqual(tokens(translations[key]), tokens(corpus[key].en), key);
  }
});

const numericCases = [
  ['settings.memory.viewer.itemCount.other', n => `Элементов: ${n}`],
  ['settings.memory.viewer.memoryCount.other', n => `Записей памяти: ${n}`],
  ['chat.changeSummary.filesChanged.other', n => `Изменено файлов: ${n}`],
  ['chat.pptxElements.many', n => `Элементов слайда: ${n}`],
  ['chat.codeComments.many', n => `Комментариев: ${n}`],
  ['settings.resourceGroup.item.other', n => `Элементов: ${n}`],
  ['diff.preview.truncatedLines', n => `Чтобы интерфейс оставался отзывчивым, предпросмотр дифа усечён. Пропущено строк: ${n}.`],
  ['git.branchSwitcher.error.moreFiles', n => ` и другие файлы: ${n}`],
  ['settings.usage.dailyChartDescription', n => `Динамика использования токенов по дням. Дней в периоде: ${n}.`],
  ['settings.browser.import.success', n => `Импортировано файлов cookie: 7, записей LocalStorage: 3. Сайтов-источников: ${n}.`],
  ['settings.browser.import.successWithSkipped', n => `Импортировано файлов cookie: 7, записей LocalStorage: 3. Сайтов-источников: ${n}. Не импортировано файлов cookie: ${n}.`],
  ['settings.browser.import.partialCookieProtected', n => `Импортировано файлов cookie: 7, записей LocalStorage: 3. Сайтов-источников: ${n}. Из-за защиты Chrome не импортировано файлов cookie: ${n}.`],
  ['settings.browser.import.partialAppBound', n => `Импортировано записей LocalStorage: 3. Сайтов-источников: ${n}. Файлы cookie с защитой App-Bound в Windows не импортированы.`],
];

for (const [key, expected] of numericCases) {
  test(`render number-neutral Russian for ${key}`, () => {
    for (const count of counts) {
      const actual = render(key, { count, days: count, cookies: 7, entries: 3, origins: count, skipped: count });
      assert.equal(actual, expected(count), `count=${count}`);
      assert.doesNotMatch(actual, /\{[^{}]+\}/);
    }
  });
}

test('numeric templates compose with the binary singular/plural selector', () => {
  for (const [key, expected] of numericCases.filter(([key]) => /\.(other|many)$/.test(key))) {
    for (const count of counts) {
      const selected = count === 1 ? key.replace(/\.(other|many)$/, '.one') : key;
      const actual = render(selected, { count });
      if (count !== 1) assert.equal(actual, expected(count), `${selected}: count=${count}`);
      else assert.match(actual, /^1 (?:элемент|запись памяти|файл изменён|элемент слайда|комментарий)$/);
    }
  }
});

test('discard and sharing controls describe their actual actions', () => {
  assert.match(translations['offPeak.discard.title'], /^Удалить черновик/);
  assert.equal(translations['offPeak.discard.confirm'], 'Не сохранять');
  assert.notEqual(translations['offPeak.discard.confirm'], translations['common.cancel']);
  assert.equal(translations['manualClaimPlan.claim.share.close'], 'Закрыть окно «Поделиться»');
  assert.doesNotMatch(translations['manualClaimPlan.claim.share.close'], /доступ/);
});

test('minimum price suffix composes after the amount', () => {
  assert.equal(`5 $ ${translations['settings.modelProvider.codingPlan.purchase.fromPriceSuffix']}`, '5 $ и выше');
});

test('every schedule interval supports the default value one', () => {
  const keys = [
    'automations.schedule.customMinutes', 'automations.schedule.customHourly',
    'automations.schedule.customDaily', 'automations.schedule.custom',
    'automations.schedule.customWeekly', 'automations.schedule.customMonthlyDates',
    'automations.schedule.customMonthlyWeekday', 'automations.schedule.customYearly',
    'automations.customRepeat.every', 'automations.customRepeat.compactFrequency',
  ];
  for (const key of keys) {
    for (const interval of counts) {
      const actual = render(key, { interval, unit: 'мин', time: '10:00', days: 'пн', day: 'пн', month: 'янв' });
      assert.ok(actual.startsWith(`Интервал: ${interval}`), key);
      assert.doesNotMatch(actual, /Каждые|\{[^{}]+\}/, key);
    }
  }
});

test('sleep guidance and unanswered questions retain the user decision semantics', () => {
  assert.match(translations['offPeak.keepAwakeBanner'], /^Не переводите компьютер в спящий режим/);
  assert.doesNotMatch(translations['offPeak.keepAwakeBanner'], /не уйдёт/);
  assert.match(translations['settings.askUserQuestionAutoResolution'], /без ответа.*5 минут/);
  const description = translations['settings.askUserQuestionAutoResolutionDescription'];
  assert.match(description, /Если включено, агент продолжает работу.*без ответа 5 минут/);
  assert.match(description, /Если выключено, текущие и будущие вопросы будут ждать вашего ответа/);
});

test('references to translated sections match their visible names', () => {
  for (const [hint, label] of [
    ['settings.toolGroupingExploreDescription', 'chat.toolCall.explore.label'],
    ['settings.toolGroupingTerminalDescription', 'chat.toolCall.executeGroup.label'],
    ['settings.toolGroupingChangesDescription', 'chat.toolCall.changesGroup.label'],
  ]) assert.ok(translations[hint].includes(`«${translations[label]}»`), hint);
  assert.equal(translations['remote.kind.server'], 'Сервер');
  assert.doesNotMatch(translations['remote.description'], /Server/);
  assert.ok(render('settings.modelProvider.connectionMode.startPlanCount', { count: 2 }).startsWith(translations['settings.modelProvider.connectionMode.startPlan']));
  assert.ok(translations['settings.migration.emptyDescription'].includes(`«${translations['settings.migration.scan']}»`));
});

test('folder grammar and troubleshooting instructions are unambiguous', () => {
  assert.match(translations['settings.dataBaseDirDescription'], /^Корневая папка/);
  assert.match(translations['settings.dataBaseDirDescription'], /домашняя папка/);
  assert.match(translations['settings.dataBaseDirPlaceholder'], /домашняя папка/);
  assert.doesNotMatch(translations['feedback.submit.usage.descriptionPlaceholder'], /промпт/);
  assert.match(translations['feedback.submit.usage.descriptionPlaceholder'], /какое сообщение увидели/);
  const payment = translations['settings.modelProvider.codingPlan.paymentTimeout'];
  assert.match(payment, /после завершения оплаты/);
  assert.doesNotMatch(payment, /после закрытия/);
});

test('source sessions and destination task lists remain distinct', () => {
  assert.match(translations['settings.migration.candidatesDescription'], /импортированная сессия.*список задач/);
  for (const key of ['settings.plugins.detail.updateNewSessionsNote', 'settings.nativeSearchEnhancementsDescription', 'settings.memoryDescription']) {
    assert.match(translations[key], /сесси/, key);
    assert.doesNotMatch(translations[key], /задач/, key);
  }
});

const installerBytes = readFileSync(new URL('tools/install.ps1', root));
const installer = installerBytes.toString('utf8');
const messages = [...installer.matchAll(/Write-Host "([^"\n]*)"/g)].map(match => match[1]);

test('Windows PowerShell 5.1 can decode every Russian installer message', () => {
  assert.deepEqual([...installerBytes.subarray(0, 3)], [0xef, 0xbb, 0xbf], 'UTF-8 BOM required by Windows PowerShell 5.1');
  assert.equal(messages.length, 12);
  for (const message of messages) assert.match(message, /[А-Яа-яЁё]/u, message);
});

test('installer translations preserve interpolation and all executable code', () => {
  const expectedVariables = [[], ['$Res'], ['$Stock'], [], [], ['$Url'], ['$((Get-Item $Dest).Length)'], [], ['$Backup'], [], [], []];
  messages.forEach((message, index) => {
    for (const variable of expectedVariables[index]) assert.ok(message.includes(variable), `${index}: ${variable}`);
    assert.equal((message.match(/\$/g) ?? []).length, expectedVariables[index].join('').split('$').length - 1, `message ${index}`);
  });
  const normalized = installer.replace(/^\uFEFF/, '').replace(/Write-Host "[^"\n]*"/g, 'Write-Host "MESSAGE"');
  const executableHash = createHash('sha256').update(normalized).digest('hex');
  assert.equal(executableHash, 'db189f3f76b069b2f87151610e50d6f1420eacbed4feab54fa3378d0166bab05');
  assert.match(installer, /\$Url = "https:\/\/github.com\/\$Repo\/releases\/download\/\$Version\/app-ru-win\.asar"/);
});
