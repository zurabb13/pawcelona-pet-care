import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const deployment = JSON.parse(readFileSync(resolve(root, 'deployment.config.json'), 'utf8'));
const siteUrl = String(deployment.siteUrl || '').replace(/\/$/, '');
const serviceSource = readFileSync(resolve(root, 'src/app/core/config/services.config.ts'), 'utf8');
const businessSource = readFileSync(resolve(root, 'src/app/core/config/business.config.ts'), 'utf8');
const brandName = businessSource.match(/workingBrand:\s*'([^']+)'/)?.[1] ?? 'Pet Care Barcelona';
const serviceSlugs = [...serviceSource.matchAll(/\bslug:\s*'([^']+)'/g)].map((match) => match[1]);
const locales = ['en', 'es', 'ca', 'ru'];
const pages = ['', 'services', 'prices', 'how-it-works', 'about', 'safety', 'areas', 'faq', 'contact', 'book', 'privacy', 'cookies', 'terms'];

if (!siteUrl.startsWith('http')) {
  throw new Error('deployment.config.json must contain a valid absolute siteUrl.');
}

const routeGroups = [
  ...pages.map((page) => ({ path: page })),
  ...serviceSlugs.map((slug) => ({ path: `services/${slug}` }))
];

const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const urls = [];
for (const group of routeGroups) {
  for (const locale of locales) {
    const path = `${locale}${group.path ? `/${group.path}` : ''}`;
    const alternates = locales.map((alt) => {
      const altPath = `${alt}${group.path ? `/${group.path}` : ''}`;
      return `    <xhtml:link rel="alternate" hreflang="${alt}" href="${escapeXml(`${siteUrl}/${altPath}`)}" />`;
    }).join('\n');
    urls.push(`  <url>\n    <loc>${escapeXml(`${siteUrl}/${path}`)}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${siteUrl}/es${group.path ? `/${group.path}` : ''}`)}" />\n  </url>`);
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
const manifest = { name: `${brandName} Pet Care`, short_name: brandName, start_url: '/es', display: 'standalone', background_color: '#f7f4ec', theme_color: '#153f37', icons: [{ src: '/logo-mark.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] }; 

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public/robots.txt'), robots);
writeFileSync(resolve(root, 'public/manifest.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`Generated sitemap.xml (${urls.length} localized URLs), robots.txt and manifest for ${siteUrl}`);
