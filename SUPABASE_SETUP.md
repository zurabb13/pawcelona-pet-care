# Supabase Booking Setup

Supabase is the production persistence layer for booking requests. The site can be previewed without it; in demo mode a successful form submission is simulated and **personal booking data is not saved**.

## 1. Create the database

Create a Supabase project, open **SQL Editor**, and execute:

```text
supabase/schema.sql
```

The schema creates `booking_requests`, enables Row Level Security, allows anonymous inserts that satisfy basic checks, and does not allow anonymous reads, updates or deletes.

## 2. Configure the frontend

In Supabase project settings copy:

- Project URL
- Public / anon key

Then edit:

```text
src/environments/environment.production.ts
```

Example:

```ts
import deployment from '../../deployment.config.json';

export const environment = {
  production: true,
  siteUrl: deployment.siteUrl.replace(/\/$/, ''),
  supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR-PUBLIC-ANON-KEY'
};
```

The anon key is a public browser credential protected by database policies. **Never use the service-role key in frontend code.**

## 3. Test

After entering the production values:

```bash
npm run check:launch
npm run build:prod
```

Test a booking using non-sensitive test data, then verify a row was created in `booking_requests`.

## 4. Production hardening

The included RLS policy is a safe MVP baseline, but a public commercial service should also consider a Supabase Edge Function or server endpoint for rate limiting, CAPTCHA/Turnstile, server-side validation, email notification and abuse protection.

Booking requests can contain personal data plus pet care/medication instructions. Define retention and deletion rules, restrict staff access, document processors, and make the Privacy Policy match the actual data flow before launch.
