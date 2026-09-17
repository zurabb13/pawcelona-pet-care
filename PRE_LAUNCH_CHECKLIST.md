# Production Launch Checklist

The application code is designed so business-specific decisions can be filled in after development without restructuring the site.

## Required business configuration

- [ ] Confirm the final public brand/domain.
- [ ] Replace legal business name and NIF/CIF/NIE placeholder.
- [ ] Replace public email, privacy email, phone and WhatsApp.
- [ ] Confirm services actually offered and service areas.
- [ ] Replace all demo prices; set `demoPrices: false`.
- [ ] Set weekend/holiday surcharges if used.
- [ ] Confirm cancellation, minimum-notice and availability rules.
- [ ] Add only genuine customer reviews with permission.
- [ ] Confirm insurance before setting `insuranceConfirmed: true` or making any insurance claim.
- [ ] Confirm a real verification process before setting `sitterVerificationConfirmed: true` or claiming verified sitters.

## Required technical configuration

- [ ] Put the final HTTPS domain in `deployment.config.json`.
- [ ] Add Supabase Project URL and public anon key in `environment.production.ts`.
- [ ] Run `supabase/schema.sql` in the production project.
- [ ] Run `npm run check:source`.
- [ ] Run `npm run check:launch` until it passes.
- [ ] Run `npm run build:release` successfully.
- [ ] Verify generated `robots.txt`, `sitemap.xml` and localized canonical/hreflang URLs use the final domain.
- [ ] Test direct refreshes on localized/service URLs after hosting.

## Content, privacy and operations

- [ ] Replace prototype/remote images with final owned/licensed assets where desired and optimize them as WebP/AVIF.
- [ ] Native-speaker proofread ES / CA / EN / RU copy.
- [ ] Make Privacy Policy match the real controller, processors, retention, rights contact and booking workflow.
- [ ] Make Terms & Conditions match the real commercial/cancellation/payment/emergency rules.
- [ ] Keep non-essential analytics/tracking disabled until an appropriate consent mechanism is implemented.
- [ ] Define emergency, vet-contact, medication and secure-key procedures internally.

## Device and quality checks

- [ ] Test booking/WhatsApp/navigation on current iOS Safari and Android Chrome.
- [ ] Test desktop Chrome/Safari/Firefox/Edge where relevant.
- [ ] Test keyboard navigation and visible focus states.
- [ ] Test reduced-motion mode.
- [ ] Run Lighthouse / Core Web Vitals / accessibility checks on the deployed production URL.
- [ ] Test form error, success, offline/backend-failure and duplicate-submit scenarios.

## Final commands

```bash
npm install
npm run check:source
npm run check:launch
npm run build:release
```

Do not bypass `check:launch` for a real commercial deployment; it exists to catch forgotten placeholders.
