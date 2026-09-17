import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';

const root = process.cwd();
const srcRoot = resolve(root, 'src');
const failures = [];
const notes = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(srcRoot);
const tsFiles = files.filter((file) => extname(file) === '.ts');

for (const file of tsFiles) {
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)) {
    const base = resolve(dirname(file), match[1]);
    const hasExplicitFileExtension = /\.(?:ts|json|html|css)$/.test(match[1]);
    const candidates = hasExplicitFileExtension ? [base] : [`${base}.ts`, `${base}.json`, join(base, 'index.ts')];
    if (!candidates.some(existsSync)) {
      failures.push(`Missing relative import target in ${file.replace(root + '/', '')}: ${match[1]}`);
    }
  }
  for (const match of source.matchAll(/templateUrl:\s*['"]([^'"]+)['"]/g)) {
    const target = resolve(dirname(file), match[1]);
    if (!existsSync(target)) failures.push(`Missing templateUrl target: ${target.replace(root + '/', '')}`);
  }
}

const translationsPath = resolve(root, 'src/app/core/i18n/translations.ts');
const translations = readFileSync(translationsPath, 'utf8');
const localeNames = ['en', 'es', 'ca', 'ru'];
const localeKeys = new Map();
for (let i = 0; i < localeNames.length; i++) {
  const locale = localeNames[i];
  const startToken = `${locale}: {`;
  const start = translations.indexOf(startToken);
  const end = i < localeNames.length - 1 ? translations.indexOf(`  },\n  ${localeNames[i + 1]}: {`, start) : translations.lastIndexOf('\n  }\n};');
  if (start < 0 || end < 0) {
    failures.push(`Could not parse translation block for ${locale}`);
    continue;
  }
  const block = translations.slice(start, end);
  const keys = [...block.matchAll(/'([^']+)'\s*:/g)].map((match) => match[1]);
  const duplicateKeys = keys.filter((key, index) => keys.indexOf(key) !== index);
  if (duplicateKeys.length) failures.push(`Duplicate ${locale} translation keys: ${[...new Set(duplicateKeys)].join(', ')}`);
  localeKeys.set(locale, new Set(keys));
}

const reference = localeKeys.get('en') ?? new Set();
for (const locale of localeNames.slice(1)) {
  const keys = localeKeys.get(locale) ?? new Set();
  const missing = [...reference].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !reference.has(key));
  if (missing.length) failures.push(`${locale} is missing ${missing.length} translation key(s): ${missing.join(', ')}`);
  if (extra.length) failures.push(`${locale} has ${extra.length} extra translation key(s): ${extra.join(', ')}`);
}

const usedLiteralKeys = new Set();
for (const file of files.filter((file) => ['.ts', '.html'].includes(extname(file)))) {
  const source = readFileSync(file, 'utf8');
  for (const match of source.matchAll(/\.t\(\s*['"]([^'"]+)['"]\s*\)/g)) usedLiteralKeys.add(match[1]);
}
const missingUsed = [...usedLiteralKeys].filter((key) => !reference.has(key));
if (missingUsed.length) failures.push(`Translation keys used in templates/code but missing in EN: ${missingUsed.join(', ')}`);

const services = readFileSync(resolve(root, 'src/app/core/config/services.config.ts'), 'utf8');
const slugs = [...services.matchAll(/\bslug:\s*'([^']+)'/g)].map((m) => m[1]);
if (new Set(slugs).size !== slugs.length) failures.push('Duplicate service slugs found.');
if (slugs.length < 9) failures.push(`Expected at least 9 requested services, found ${slugs.length}.`);

notes.push(`${tsFiles.length} TypeScript files scanned.`);
notes.push(`${reference.size} translation keys checked across ${localeNames.length} locales.`);
notes.push(`${slugs.length} service definitions found.`);

console.log('\nSource integrity check\n');
for (const note of notes) console.log(`INFO  ${note}`);
for (const failure of failures) console.error(`ERROR ${failure}`);
if (failures.length) process.exit(1);
console.log('\nPASS  Local imports, templates, translation coverage and service catalog checks passed.');
