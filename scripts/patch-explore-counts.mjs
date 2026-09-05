export function exposeIntlLocale(source) {
  const factory = /(function [\w$]+\(([\w$]+)\)\{let [\w$]+=[\w$]+\[\2\]\?\?[\w$]+\[`zh-CN`\];return\{)formatMessage/g;
  const matches = [...source.matchAll(factory)];
  if (matches.length !== 1) throw new Error('Expected one locale factory');
  return source.replace(factory, (_, prefix, locale) => `${prefix}locale:${locale},formatMessage`);
}

export function patchExploreCounts(source) {
  const formatter = /function ([\w$]+)\([^)]*\)\{switch\([^)]*\)\{case`search`:return [\w$]+\.formatMessage\(\{id:[\w$]+===1\?`chat\.toolCall\.explore\.bucket\.search\.one`/g;
  const matches = [...source.matchAll(formatter)];
  if (matches.length !== 1) throw new Error('Expected one exploration formatter');
  const name = matches[0][1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const counters = new RegExp('\\$\\{([\\w$]+)\\.(search|list|file)\\} \\$\\{' + name + '\\(([\\w$]+),`\\2`,\\1\\.\\2\\)\\}', 'g');
  const counterMatches = [...source.matchAll(counters)];
  if (counterMatches.length !== 3 || new Set(counterMatches.map(match => match[2])).size !== 3) {
    throw new Error('Expected 3 exploration counters');
  }
  return source.replace(counters, (_, counts, kind, intl) => {
    const value = `${counts}.${kind}`;
    const label = `${matches[0][1]}(${intl},\`${kind}\`,0)`;
    const original = `${value}+\` \`+${matches[0][1]}(${intl},\`${kind}\`,${value})`;
    return '${' + intl + '.locale===`ru-RU`?' + label + '+`: `+' + value + ':' + original + '}';
  });
}
