import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { exposeIntlLocale, patchExploreCounts } from '../scripts/patch-explore-counts.mjs';

const factory = 'function w(e){let t=g[e]??g[`zh-CN`];return{formatMessage({id:e},n){let r=t[e]??e;if(n)for(let[e,t]of Object.entries(n))r=r.replaceAll(`{${e}}`,String(t));return r}}}';
const formatter = 'function TY(e,t,n){switch(t){case`search`:return e.formatMessage({id:n===1?`chat.toolCall.explore.bucket.search.one`:`chat.toolCall.explore.bucket.search.other`});case`list`:return e.formatMessage({id:n===1?`chat.toolCall.explore.bucket.list.one`:`chat.toolCall.explore.bucket.list.other`});case`file`:return e.formatMessage({id:n===1?`chat.toolCall.explore.bucket.file.one`:`chat.toolCall.explore.bucket.file.other`});default:return e.formatMessage({id:`chat.toolCall.explore.bucket.items`})}}';
const summary = 'function G1e(e,t){let n=[];return t.search>0&&n.push(`${t.search} ${TY(e,`search`,t.search)}`),t.list>0&&n.push(`${t.list} ${TY(e,`list`,t.list)}`),t.file>0&&n.push(`${t.file} ${TY(e,`file`,t.file)}`),n.length>0?n.join(`, `):e.formatMessage({id:`chat.toolCall.explore.emptySummary`})}';
const ru = JSON.parse(readFileSync(new URL('../dict/ru/03.json', import.meta.url), 'utf8'));
const corpus = JSON.parse(readFileSync(new URL('../upstream/corpus.json', import.meta.url), 'utf8'));
const originals = Object.assign({}, ...Object.values(corpus));
const dictionaries = { 'ru-RU': ru };
for (const [locale, field] of [['en-US', 'en'], ['zh-CN', 'zh']]) {
  dictionaries[locale] = Object.fromEntries(Object.entries(originals).map(([key, value]) => [key, value[field]]));
}

function render(locale, counts, changed = true) {
  const provider = changed ? exposeIntlLocale(factory) : factory;
  const consumer = changed ? patchExploreCounts(formatter + summary) : formatter + summary;
  return runInNewContext(`${provider};${consumer};G1e(w(locale),counts)`, { g: dictionaries, locale, counts });
}

test('Russian exploration summaries use count-neutral labels for every bucket', () => {
  for (const count of [1, 2, 4, 5, 11, 21, 22, 101]) {
    assert.equal(render('ru-RU', { search: count, list: count, file: count }), `поисков: ${count}, списков: ${count}, файлов: ${count}`);
  }
});

test('empty results and original English and Chinese output remain unchanged', () => {
  for (const locale of Object.keys(dictionaries)) {
    assert.equal(render(locale, { search: 0, list: 0, file: 0 }), dictionaries[locale]['chat.toolCall.explore.emptySummary']);
  }
  for (const locale of ['en-US', 'zh-CN']) {
    for (const count of [1, 2, 21]) {
      const counts = { search: count, list: 0, file: count };
      assert.equal(render(locale, counts), render(locale, counts, false));
    }
  }
});

test('unsupported bundle patterns fail rather than silently leave broken Russian text', () => {
  assert.throws(() => exposeIntlLocale('function different(){}'), /locale factory/);
  assert.throws(() => patchExploreCounts('function different(){}'), /exploration formatter/);
  assert.throws(() => patchExploreCounts(formatter + summary.replace('t.file}', 't.other}')), /3 exploration counters/);
});
