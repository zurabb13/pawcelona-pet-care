# Pawcelona — Barcelona Pet Care Platform

Production-oriented Angular 22 website and request-booking MVP for a premium pet-care business in Barcelona.

> **Working brand:** `Pawcelona` is intentionally configurable and is not asserted to be a registered or available trademark. Replace/confirm it before launch.

## Included

The codebase includes a premium mobile-first landing page, scroll reveal animations, ambient visual motion, micro-interactions, sticky glass navigation, floating WhatsApp, nine service types, service-detail pages, pricing, How It Works, Safety, service areas, FAQ, About, Contact, request booking, legal pages, four-language UI (ES/CA/EN/RU), localized SEO metadata, hreflang/canonicals, JSON-LD, static prerender configuration, generated sitemap/robots/manifest, Supabase-ready persistence, GDPR-oriented consent handling, accessibility/reduced-motion support, and Netlify/Vercel/Apache deployment helpers.

No fake testimonials, insurance claim, certification claim, or sitter-verification claim is included.

## Technology

- Angular 22 standalone components + Signals
- Angular Router + Reactive Forms
- Angular SSR package configured for **static prerender output**
- Tailwind CSS 4 infrastructure + a custom production design system
- Supabase / PostgreSQL booking backend
- Node build-time scripts for launch checks and static SEO files

## Languages and entry routes

Spanish is the default/x-default language.

```text
/es
/ca
/en
/ru
```

## Local development

Requirements: Node.js 22+ and npm 10+.

```bash
npm install
npm run check:source
npm start
```

Open `http://localhost:4200/es`.

## What you edit before launch

All business-specific values are intentionally centralized:

```text
src/app/core/config/business.config.ts          brand, legal identity, phone, WhatsApp, email, public details
src/app/core/config/services.config.ts          services, options and starting prices
src/app/core/config/pricing.config.ts           demo flag and weekend/holiday surcharges
src/app/core/config/service-areas.config.ts      Barcelona coverage
src/app/core/config/reviews.config.ts            genuine customer reviews only
deployment.config.json                           final HTTPS domain
src/environments/environment.production.ts       Supabase public URL + anon key
src/app/core/i18n/translations.ts                any copy/translation changes
```

Replace the remote prototype photography in the business/service configs with owned or properly licensed optimized images when available.

## Booking backend

Read `SUPABASE_SETUP.md`, create a Supabase project, and run:

```text
supabase/schema.sql
```

The frontend uses only the public Supabase URL and anon key. **Never ship the Supabase service-role key to the browser.**

When Supabase is not configured, the booking UI runs in safe demo mode and does **not** persist personal booking data.

## Production readiness commands

During development:

```bash
npm run check:source
```

After entering your real business/domain/pricing/Supabase values:

```bash
npm run check:launch
```

A launch check intentionally fails while required placeholders remain. This prevents accidentally publishing demo values.

Create a production/prerender build:

```bash
npm run build:prod
```

Or require both the launch gate and production build:

```bash
npm run build:release
```

Expected browser output:

```text
dist/pawcelona-pet-care/browser
```

`build:prod` also regenerates `public/sitemap.xml`, `public/robots.txt`, and `public/manifest.webmanifest` from the final domain and service catalog.

## SEO architecture

- Per-route title and description
- Canonical URLs
- ES/CA/EN/RU hreflang + Spanish `x-default`
- Open Graph + Twitter card metadata
- LocalBusiness JSON-LD
- Service JSON-LD on service pages
- FAQPage JSON-LD on FAQ
- Prerender route list for every public localized page and service
- Sitemap generated from the same service catalog used by the app
- 404 page marked `noindex`

The project uses Schema.org `LocalBusiness` + `Service`; it does not invent a non-standard `PetService` schema type.

## Privacy and security

- Booking consent links to the Privacy Policy.
- The cookie notice currently stores only an essential acknowledgement key and does not enable marketing/analytics cookies.
- Booking input is validated and length-limited.
- A honeypot field is included for basic bot filtering.
- Supabase RLS allows anonymous booking inserts only; public reads/updates/deletes are blocked.
- Secrets must never be placed in browser config.
- For higher traffic, put booking submission behind a Supabase Edge Function/server endpoint with rate limiting/abuse protection.

Legal templates are implementation-ready but the real controller identity, tax ID, policies, retention decisions, processors and business terms must be confirmed by the business before launch.

## Hosting

### Netlify

`netlify.toml` builds with `npm run build:prod` and publishes `dist/pawcelona-pet-care/browser`. Existing prerendered files are served directly; the fallback supports client-side navigation.

### Vercel

`vercel.json` contains the build command and static output directory. Prerendered route files are served as generated.

### Apache/shared hosting

`public/.htaccess` preserves real files/directories and falls back to `index.html` for unmatched client routes.

## Git workflow

A sensible production-hardening branch is:

```bash
git checkout -b feature/production-hardening
git add .
git commit -m "feat: production hardening for pet care launch"
```

Then merge through a Pull Request into `develop`/`main` according to your repository workflow.

## Verification note

The repository includes automated source-integrity and launch-preflight scripts. In the generation environment, source integrity and TypeScript syntax parsing were run successfully. A real Angular dependency install/build could not be completed there because external package installation was unavailable, so **run `npm install && npm run build:release` on a machine with internet access before deployment**.

See `PRE_LAUNCH_CHECKLIST.md` for the final operational checklist.
