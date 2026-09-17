# Pet Service Barcelona — Project Blueprint

> **Status:** Implemented MVP / Production hardening complete  
> **Purpose:** This file is the single source of truth for the website/product build.  
> **Rule:** Before starting a major feature, check this document first and update it when a product decision changes.

---

# 1. Project Vision

Create a modern, premium, trustworthy and conversion-focused multilingual Pet Service website for Barcelona.

The product must help a pet owner understand the offer quickly, trust the business, contact us easily and request a booking in as few steps as possible.

Core brand feeling:

**Trust + Care + Safety + Love + Professionalism**

The website must not feel childish, overly colorful, generic or like a cheap template.

---

# 2. Business Concept

## 2.1 Main offer

Pet care services for dog and cat owners in Barcelona.

Initial services:

- Dog Walking
- Pet Sitting
- Home Visits
- Cat Sitting
- Puppy Visits
- Overnight Pet Sitting
- Pet Taxi / Pet Transport
- Vet Visit Assistance
- Weekend / Holiday Pet Care

The architecture must allow new services to be added easily in the future.

## 2.2 Core customer promise

The customer should feel:

> “My pet is in safe, caring and professional hands, and I can easily stay informed.”

## 2.3 Target audience

- Dog owners in Barcelona
- Cat owners in Barcelona
- Busy professionals
- Expats
- Tourists
- Frequent travelers
- Families who need daytime pet support

---

# 3. Business Goals

The website must:

1. Explain the service clearly within a few seconds.
2. Build trust immediately.
3. Make booking/requesting a service simple.
4. Offer direct WhatsApp contact.
5. Collect pet information.
6. Work extremely well on mobile.
7. Be SEO-friendly.
8. Be multilingual from the beginning.
9. Be ready for future accounts, payments and pet profiles.
10. Be easy to maintain and extend.

---

# 4. MVP Scope

## 4.1 Included in MVP

- Responsive website
- Home page
- Services overview
- Individual service pages
- Pricing page
- About page
- How It Works
- FAQ
- Contact
- Booking request form
- WhatsApp CTA
- Service area information
- Testimonials section
- Safety section
- Spanish
- Catalan
- English
- SEO metadata
- Local SEO foundation
- GDPR consent
- Privacy Policy
- Cookie Policy
- Terms & Conditions
- Basic booking storage/backend

## 4.2 Not required in first MVP

- Automatic booking confirmation
- Online payment
- Customer dashboard
- Pet owner accounts
- Pet profiles
- Google Reviews API
- Google Maps integration
- WhatsApp Business API automation
- Advanced admin dashboard
- SMS notifications
- Push notifications

These features are planned for later phases.

---

# 5. Required Inputs Before Launch

Development can start without every item below, but these must be finalized before production launch.

## Brand

- Brand name: `TBD`
- Logo: `TBD`
- Domain: `TBD`
- Brand tagline: `TBD`

## Contact

- WhatsApp number: `TBD`
- Business email: `TBD`
- Public phone number: `TBD`
- Social media accounts: `TBD`

## Business information

- Legal/business name: `TBD`
- Business address, if publicly displayed: `TBD`
- Opening hours: `TBD`
- Emergency contact policy: `TBD`

## Services

- Final service list: `TBD`
- Exact prices: `TBD`
- Weekend surcharge: `TBD`
- Holiday surcharge: `TBD`
- Cancellation policy: `TBD`
- Minimum booking notice: `TBD`

## Service areas

Initial candidates:

- Eixample
- Gràcia
- Sarrià-Sant Gervasi
- Les Corts
- Ciutat Vella
- Sant Martí
- Sants-Montjuïc

Final coverage: `TBD`

## Trust & safety

- Insurance status: `TBD`
- Sitter verification process: `TBD`
- Key-handling process: `TBD`
- Emergency procedure: `TBD`
- Medication policy: `TBD`

Do not claim insurance, certification or verification unless it is actually true.

## Media

- Real pet photography: `TBD`
- Team/founder photography: `TBD`
- Customer testimonials: `TBD`
- Pet/customer photos with permission: `TBD`

---

# 6. Languages

Initial languages:

- Spanish — ES
- Catalan — CA
- English — EN
- Russian — RU

Recommended URL strategy:

```text
/es/
/ca/
/en/
```

Example service URLs:

```text
/es/paseador-perros-barcelona
/ca/passejador-gossos-barcelona
/en/dog-walker-barcelona
```

Rules:

- Do not hardcode user-facing text inside reusable components.
- All public content must be translatable.
- New languages must be addable without restructuring the application.
- SEO metadata must be localized too.

---

# 7. Website Sitemap

```text
/
├── Home
├── Services
│   ├── Dog Walking
│   ├── Pet Sitting
│   ├── Cat Sitting
│   ├── Home Visits
│   ├── Overnight Care
│   └── Pet Taxi
├── Prices
├── How It Works
├── About Us
├── Areas We Serve
│   ├── Eixample
│   ├── Gràcia
│   ├── Sarrià-Sant Gervasi
│   ├── Les Corts
│   ├── Ciutat Vella
│   ├── Sant Martí
│   └── Sants-Montjuïc
├── Safety
├── Reviews
├── FAQ
├── Contact
├── Book Now
└── Legal
    ├── Privacy Policy
    ├── Cookies Policy
    └── Terms & Conditions
```

Future authenticated area:

```text
/account
├── Login
├── Register
├── Dashboard
├── My Pets
├── Pet Profile
├── My Bookings
└── Payments
```

---

# 8. Recommended Technology

## Frontend

- Angular
- Standalone Components
- Signals
- Angular Router
- Reactive Forms
- SSR / Prerendering where appropriate

## Styling

- Tailwind CSS
- Custom design tokens
- Reusable UI primitives
- Mobile-first responsive system

## Icons

- Lucide Icons

## Backend / Database

Recommended MVP:

- Supabase
- PostgreSQL
- Supabase Auth for future accounts
- Supabase Storage for future pet photos
- Row Level Security when authentication is introduced

## Future integrations

- Stripe
- Google Maps
- Google Reviews
- Google Business Profile
- WhatsApp Business API
- Email notifications
- SMS notifications

---

# 9. Architecture Principles

The project must be:

- Clean
- Modular
- Feature-based
- Reusable
- Typed
- Testable
- Scalable
- Accessible
- SEO-friendly
- Production-ready

Avoid:

- Massive components
- Hardcoded pricing everywhere
- Hardcoded translations
- Business logic inside templates
- Repeating the same UI
- One giant global service
- One giant page file

---

# 10. Recommended Folder Structure

```text
src/
├── app/
│   ├── core/
│   │   ├── config/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── models/
│   │   └── services/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── icons/
│   │   ├── pipes/
│   │   └── utils/
│   │
│   ├── layout/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── mobile-navigation/
│   │   └── whatsapp-button/
│   │
│   ├── features/
│   │   ├── home/
│   │   ├── services/
│   │   │   ├── dog-walking/
│   │   │   ├── pet-sitting/
│   │   │   ├── cat-sitting/
│   │   │   ├── home-visits/
│   │   │   ├── overnight-care/
│   │   │   └── pet-taxi/
│   │   ├── pricing/
│   │   ├── booking/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── reviews/
│   │   ├── safety/
│   │   ├── service-areas/
│   │   └── about/
│   │
│   ├── i18n/
│   │   ├── es/
│   │   ├── ca/
│   │   └── en/
│   │
│   └── app.routes.ts
│
├── assets/
│   ├── images/
│   │   ├── hero/
│   │   ├── pets/
│   │   ├── services/
│   │   ├── team/
│   │   └── reviews/
│   └── icons/
│
├── styles/
│   ├── tokens.css
│   ├── typography.css
│   ├── animations.css
│   └── global.css
│
└── environments/
```

---

# 11. Configuration-Driven Content

Business values must live in configuration rather than being duplicated across the application.

Recommended files:

```text
src/app/core/config/
├── business.config.ts
├── contact.config.ts
├── services.config.ts
├── pricing.config.ts
├── service-areas.config.ts
└── seo.config.ts
```

Config should manage:

- Business name
- Contact details
- WhatsApp
- Services
- Pricing
- Durations
- Service areas
- Surcharges
- Opening hours
- Booking rules

---

# 12. Core Data Models

Planned models:

```text
Service
PriceOption
ServiceArea
BookingRequest
Pet
Owner
Review
FAQItem
ContactDetails
SEOData
```

Future models:

```text
User
PetProfile
Booking
Payment
Sitter
Availability
Notification
```

---

# 13. Booking Flow

Initial booking model is request-based.

The customer chooses:

1. Service
2. Date
3. Time
4. Duration
5. Pet type
6. Number of pets
7. Pet name
8. Breed
9. Age
10. Special needs
11. Medication
12. Address
13. Owner name
14. Phone
15. Email
16. Additional notes
17. GDPR/contact consent

Primary CTA:

**Request Booking**

The UI must clearly state that sending the request does not automatically confirm the booking.

Future booking status model:

```text
requested
reviewing
confirmed
completed
cancelled
```

---

# 14. Future Pet Profile

Pet profile fields:

- Photo
- Name
- Species
- Breed
- Gender
- Date of birth / Age
- Weight
- Food instructions
- Medication
- Allergies
- Vet information
- Behavior
- Emergency contact
- Special instructions

Architecture must account for this even if the MVP does not expose accounts.

---

# 15. Homepage Structure

Recommended flow:

```text
Navigation
↓
Hero
↓
Trust Strip
↓
Services
↓
How It Works
↓
Why Choose Us
↓
Safety
↓
Pricing
↓
Reviews
↓
Areas We Serve
↓
FAQ
↓
Final CTA
↓
Footer
```

---

# 16. Homepage Sections

## 16.1 Navigation

Desktop:

```text
Logo
Services
Prices
How It Works
About
FAQ
Language Switcher
WhatsApp
Book Now
```

Mobile:

```text
Logo
Menu
Persistent booking/contact access
```

## 16.2 Hero

Suggested headline:

> Trusted Pet Care in Barcelona

Suggested subheadline:

> Dog walking, pet sitting and home visits from people who care for your pet like family.

Primary CTA:

> Book a Service

Secondary CTA:

> WhatsApp Us

Hero media:

- Premium pet photography
- Prefer real, warm and professional imagery
- Avoid cartoon/clip-art aesthetics

## 16.3 Trust Strip

Possible items:

- Barcelona based
- Flexible scheduling
- Daily photo updates
- Fast WhatsApp support

Only include verified claims.

## 16.4 Services

Initial homepage cards:

- Dog Walking
- Pet Sitting
- Cat Sitting
- Home Visits
- Overnight Care
- Pet Taxi

Each service card:

- Icon
- Title
- Short description
- Starting price
- Learn More
- Book CTA

## 16.5 How It Works

1. Choose a service
2. Tell us about your pet
3. Meet your pet sitter
4. Relax while we take care of your pet

## 16.6 Why Choose Us

Suggested themes:

- Personalized Pet Care
- Daily Photo Updates
- Flexible Scheduling
- Fast WhatsApp Support
- Barcelona Based
- Clear Communication

Do not use “Verified Sitters” unless a real verification process exists.

## 16.7 Safety

Suggested items:

- Meet & Greet
- Emergency procedures
- Vet contact
- Secure key handling
- Medication instructions
- Pet information
- Daily updates

## 16.8 Pricing

Simple, scan-friendly pricing.

Examples:

```text
Dog Walking
30 min — €TBD
60 min — €TBD

Home Visit
30 min — €TBD

Pet Sitting
From €TBD

Overnight Care
From €TBD
```

## 16.9 Reviews

Review card may contain:

- Customer name
- Customer photo
- Pet photo
- Rating
- Review
- Service used

Never invent fake reviews.

## 16.10 Areas We Serve

Initial Barcelona areas:

- Eixample
- Gràcia
- Les Corts
- Sarrià-Sant Gervasi
- Sant Martí
- Ciutat Vella
- Sants-Montjuïc

## 16.11 FAQ

Initial questions:

- Do I meet the sitter before booking?
- Can you administer medication?
- Do you send photo updates?
- What happens in an emergency?
- Can I book last minute?
- Do you work on weekends?
- Which Barcelona areas do you cover?
- How does booking confirmation work?

## 16.12 Final CTA

Suggested direction:

> Ready to find the right care for your pet?

Actions:

- Book Pet Care
- Chat on WhatsApp

---

# 17. Design System Direction

## 17.1 Visual style

- Modern
- Minimal
- Premium
- Friendly
- Warm
- Clean
- Trustworthy
- Mobile-first

## 17.2 Initial color direction

Exact colors will be selected during the Design System phase.

Suggested palette direction:

- Primary: premium dark green / sage family
- Background: warm off-white
- Surface: white / soft neutral
- Text: dark charcoal
- Muted: soft gray
- Accent: subtle warm natural tone
- Success: accessible green
- Error: accessible red

## 17.3 Typography

Requirements:

- Modern sans-serif
- High readability
- Good multilingual support
- Strong headings
- Comfortable mobile body text

## 17.4 UI style

- Soft rounded cards
- Generous whitespace
- Subtle shadows
- Clear hierarchy
- Large tap targets
- Lightweight animation
- Useful micro-interactions
- No excessive visual effects

## 17.5 Reusable UI components

Initial design primitives:

- Button
- IconButton
- Container
- Section
- Card
- Badge
- Input
- Textarea
- Select
- Checkbox
- Radio
- FormField
- Accordion
- Modal / Dialog
- Toast
- Spinner
- LanguageSwitcher

---

# 18. Responsive Strategy

Design mobile first.

Priority breakpoints:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Mobile requirements:

- Clear navigation
- Large buttons
- Minimal form friction
- WhatsApp always easy to access
- Booking flow usable one-handed
- No overlapping fixed elements
- Cookie banner must not block essential controls

---

# 19. Accessibility

Target WCAG-friendly implementation.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible forms
- Correct labels
- ARIA only where needed
- Sufficient color contrast
- Reduced motion consideration
- Accessible error messages
- Alt text for meaningful images

---

# 20. SEO

Main keyword families:

English:

- Pet sitter Barcelona
- Dog walker Barcelona
- Dog walking Barcelona
- Pet sitting Barcelona
- Cat sitter Barcelona
- Dog sitter Barcelona

Spanish:

- Cuidado de mascotas Barcelona
- Paseador de perros Barcelona
- Cuidador de perros Barcelona

Each public page should support:

- Unique title
- Meta description
- Canonical URL
- hreflang
- Open Graph
- Social sharing metadata
- Structured data where appropriate
- Semantic heading structure
- Indexable server-rendered/prerendered content

---

# 21. Local SEO

Plan for:

- Google Business Profile
- Local service-area content
- Consistent business/contact information
- Location-specific service pages where justified
- LocalBusiness structured data
- Pet-related business/service schema where appropriate
- Reviews integration in future

Avoid spammy duplicate neighborhood pages.

---

# 22. Performance

Goals:

- Fast initial load
- Strong Core Web Vitals
- Optimized images
- Lazy loading
- Responsive image sizes
- Minimal JavaScript
- Route-level lazy loading
- Font optimization
- Avoid layout shift
- Avoid unnecessary third-party scripts

---

# 23. GDPR & Privacy

Because the business operates in Spain/EU:

Must include:

- Privacy Policy
- Cookie Policy
- Terms & Conditions
- Contact form consent
- Booking form consent
- Cookie consent where required
- No non-essential tracking before consent

Data minimization:

Only collect information needed to deliver or arrange the requested service.

Sensitive pet/medication information must be handled carefully and only when necessary for care.

---

# 24. WhatsApp

A floating WhatsApp action should be available on key pages.

Initial pre-filled message:

> Hi! I would like to book a pet care service in Barcelona.

The actual number must live in configuration.

Do not hardcode the number inside multiple components.

---

# 25. Analytics

MVP:

- No unnecessary tracking

Future:

- Privacy-friendly analytics or consent-controlled analytics
- Conversion events
- Booking-start
- Booking-submit
- WhatsApp-click
- Phone-click
- Contact-submit

---

# 26. Security

Minimum principles:

- Validate all form inputs
- Sanitize where needed
- Protect backend endpoints
- Use environment variables for secrets
- Never expose service keys in frontend code
- Rate-limit public submission endpoints if needed
- Use database security policies
- Apply spam protection to public forms when necessary

---

# 27. Environment Variables

Potential variables:

```text
PUBLIC_SITE_URL
PUBLIC_WHATSAPP_NUMBER
PUBLIC_CONTACT_EMAIL

SUPABASE_URL
SUPABASE_ANON_KEY

# Future
STRIPE_PUBLIC_KEY
STRIPE_SECRET_KEY
GOOGLE_MAPS_API_KEY
```

Secrets must never be committed to Git.

---

# 28. Git Workflow

Main branches:

```text
main
develop
```

Feature branches:

```text
feature/project-setup
feature/design-system
feature/global-layout
feature/homepage
feature/services
feature/pricing
feature/booking
feature/contact
feature/i18n
feature/seo
feature/gdpr
feature/supabase
```

Fixes:

```text
fix/<short-description>
```

Recommended feature flow:

```text
git checkout develop
git pull
git checkout -b feature/<feature-name>

# work

git add .
git commit -m "feat: <description>"
git push -u origin feature/<feature-name>
```

Merge via Pull Request.

---

# 29. Development Roadmap

## Phase 0 — Product Blueprint

Status: `IN PROGRESS`

Deliverables:

- Business concept
- Scope
- Sitemap
- Stack
- Architecture
- Homepage structure
- Build plan

## Phase 1 — Project Setup

Branch:

```text
feature/project-setup
```

Tasks:

- Create Angular project
- Configure Git
- Configure Tailwind
- Establish folder architecture
- Add base routing
- Add environment structure
- Add lint/format conventions
- Confirm build works

## Phase 2 — Design System

Branch:

```text
feature/design-system
```

Tasks:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Buttons
- Form primitives
- Cards
- Containers
- Responsive utilities

## Phase 3 — Global Layout

Branch:

```text
feature/global-layout
```

Tasks:

- Header
- Desktop navigation
- Mobile navigation
- Footer
- Language switcher shell
- Floating WhatsApp button

## Phase 4 — Homepage

Branch:

```text
feature/homepage
```

Tasks:

- Hero
- Trust strip
- Services preview
- How It Works
- Why Choose Us
- Safety
- Pricing preview
- Reviews preview
- Areas
- FAQ preview
- Final CTA

## Phase 5 — Services

Branch:

```text
feature/services
```

Tasks:

- Services index
- Reusable service page pattern
- Dog Walking
- Pet Sitting
- Cat Sitting
- Home Visits
- Overnight Care
- Pet Taxi

## Phase 6 — Pricing

Branch:

```text
feature/pricing
```

Tasks:

- Pricing configuration
- Pricing cards
- Surcharges
- Pricing FAQ

## Phase 7 — Booking

Branch:

```text
feature/booking
```

Tasks:

- Booking form
- Validation
- Multi-step or optimized single-flow UX
- Confirmation screen
- Request status model

## Phase 8 — Contact

Branch:

```text
feature/contact
```

Tasks:

- Contact page
- WhatsApp links
- Contact form
- Business details
- Service area contact CTA

## Phase 9 — Internationalization

Branch:

```text
feature/i18n
```

Tasks:

- ES
- CA
- EN
- Localized routes
- hreflang
- Translated metadata

## Phase 10 — SEO & Local SEO

Branch:

```text
feature/seo
```

Tasks:

- Metadata
- Structured data
- Sitemap
- robots
- Canonicals
- Local SEO checks
- Open Graph

## Phase 11 — GDPR

Branch:

```text
feature/gdpr
```

Tasks:

- Privacy
- Cookies
- Terms
- Consent
- Cookie behavior

## Phase 12 — Supabase

Branch:

```text
feature/supabase
```

Tasks:

- Database
- Booking persistence
- Security policies
- Contact/booking submissions

## Phase 13 — Production Hardening

Branch:

```text
feature/production-readiness
```

Tasks:

- Accessibility audit
- SEO audit
- Performance audit
- Error states
- Empty states
- Form abuse protection
- Analytics decision
- Deployment configuration

---

# 30. Future Roadmap

After MVP:

## Accounts

- Registration
- Login
- Password recovery
- User dashboard

## Pet Profiles

- Multiple pets per account
- Pet photos
- Care instructions
- Medical notes
- Emergency contact

## Advanced Booking

- Availability
- Automatic confirmation
- Calendar
- Rescheduling
- Cancellation
- Booking history

## Payments

- Stripe
- Deposits
- Full payment
- Refund handling
- Invoices

## Operations

- Sitter accounts
- Assignment
- Availability
- Internal notes
- Daily updates
- Photo reports

## Integrations

- Google Reviews
- Google Maps
- WhatsApp Business API
- Email automation
- SMS
- Google Business Profile

---

# 31. Development Rules for This Project

When implementing each phase:

1. Explain what we are building.
2. Explain why it is needed.
3. State the Git branch.
4. Give Git commands.
5. When creating multiple files/folders, provide one grouped terminal command.
6. Show the intended folder location.
7. Keep components small and reusable.
8. Avoid premature complexity.
9. Do not implement future features unless they are required by the current phase.
10. Update this blueprint if architecture/product decisions change.

---

# 32. Definition of Done

A feature is not complete until:

- It works on mobile and desktop.
- It has loading/error/empty states when relevant.
- It is keyboard accessible where relevant.
- It is translated or translation-ready.
- It follows the design system.
- It does not duplicate business configuration.
- It passes build/lint checks.
- It does not expose secrets.
- It has correct SEO behavior where relevant.
- It is committed on the correct branch.
- It is ready for Pull Request review.

---

# 33. Pre-development Checklist

Before we start coding, confirm or leave as TBD:

- [ ] Brand name
- [ ] Domain preference
- [ ] WhatsApp number
- [ ] Business email
- [ ] Initial Barcelona service areas
- [ ] Initial service list
- [ ] Initial prices
- [ ] Weekend/holiday rules
- [ ] Booking cancellation rules
- [ ] Insurance status
- [ ] Sitter verification policy
- [ ] Emergency process
- [ ] Medication policy
- [ ] Photography source
- [ ] Testimonials availability
- [ ] Legal/business identity
- [ ] Hosting/deployment preference

Not all boxes need to be completed before Phase 1.

---

# 34. Immediate Next Step

Current production-hardening branch recommendation:

```text
feature/production-hardening
```

Implementation is complete from the codebase side. Before public launch, enter the real business/domain/pricing/Supabase values, run the automated launch gate, complete the production build, and verify the deployed URL on target devices.

---

# 35. Product Principle

Every decision should support at least one of these goals:

**Trust**

**Conversion**

**Simple Booking**

**Mobile UX**

**Local SEO**

**Professional Branding**

If a feature adds complexity but does not improve one of these goals, it should probably not be part of the MVP.
