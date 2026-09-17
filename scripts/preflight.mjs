import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const deployment = JSON.parse(read('deployment.config.json'));
const business = read('src/app/core/config/business.config.ts');
const pricing = read('src/app/core/config/pricing.config.ts');
const prodEnv = read('src/environments/environment.production.ts');
const reviews = read('src/app/core/config/reviews.config.ts');

const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);
const capture = (source, key) => source.match(new RegExp(`${key}:\\s*'([^']*)'`))?.[1] ?? '';

const siteUrl = String(deployment.siteUrl || '');
if (!/^https:\/\//i.test(siteUrl)) fail('deployment.config.json → siteUrl must use https://');
if (/REPLACE|example/i.test(siteUrl)) fail('deployment.config.json → replace the placeholder domain.');

for (const key of ['legalName', 'taxId', 'email', 'phoneDisplay', 'whatsappNumber', 'dataProtectionEmail']) {
  const value = capture(business, key);
  if (!value || /REPLACE|XXX|\.example|XXXXXXXX/i.test(value)) fail(`business.config.ts → replace ${key}.`);
}

if (/demoPrices:\s*true/.test(pricing)) fail('pricing.config.ts → set demoPrices to false after confirming final prices.');
if (!/supabaseUrl:\s*'https:\/\//.test(prodEnv)) fail('environment.production.ts → add the Supabase project URL before accepting live booking requests.');
if (!/supabaseAnonKey:\s*'[^']{20,}'/.test(prodEnv)) fail('environment.production.ts → add the public Supabase anon key.');

if (/images\.unsplash\.com/.test(business)) warn('Hero/About images still use remote Unsplash URLs. Replace with final owned/licensed optimized images when available.');
if (/CUSTOMER_REVIEWS:\s*CustomerReview\[\]\s*=\s*\[\s*\]/s.test(reviews)) warn('No customer reviews are configured. The testimonials section will remain hidden; this is safe to launch.');
if (/insuranceConfirmed:\s*false/.test(business)) warn('Insurance is not marked as confirmed. The site correctly avoids claiming that the business is insured.');
if (/sitterVerificationConfirmed:\s*false/.test(business)) warn('Sitter verification is not marked as confirmed. The site correctly avoids claiming verified sitters.');

console.log('\nPawcelona production preflight\n');
for (const message of warnings) console.log(`WARN  ${message}`);
for (const message of errors) console.log(`ERROR ${message}`);

if (errors.length) {
  console.error(`\nLaunch blocked: ${errors.length} required item(s) still need real business/deployment values.`);
  process.exit(1);
}
console.log('\nPASS  Required launch configuration is complete.');
