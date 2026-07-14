# Phase 3 Build: Pancatz Site Overhaul

## Context
Astro site at /home/syafiq/pancatz-site
Uses Astryx design system (@astryxdesign/core), Tailwind CSS v4, React islands
Site URL: https://pancatz.com
WhatsApp: +60137572507 (link format: `https://wa.me/60137572507?text=...`)

## Tasks

### 1. Create /pricing page (`src/pages/pricing.astro`)
- Use Layout from `../layouts/Layout.astro`
- Data from: `src/data/site.ts` (import site, whatsappIntents)
- Sections:
  - **Hero**: "Pricing & Packages" title, subtitle about transparent pricing
  - **Creative Hub Pricing Table**: Logo Design from RM150, Business Cards from RM80, Flyers from RM120, Social Media Kit from RM200, Menu from RM180, Banner from RM150, Full Brand Package from RM800
  - **Print Pricing Table**: Business Cards RM30/100pcs, Flyers A5 RM35/100pcs, Flyers A4 RM50/100pcs, Banners RM8/sqft, Stickers RM25/100pcs, Booklets RM2.50/pc, Posters A2/A1 RM5-12/pc
  - **IT Services Table**: PC Diagnosis RM30, Windows Reinstall RM80, Virus Removal RM60, Hardware Upgrade RM50 labour, Data Recovery RM100, Network Setup RM150, Printer Setup RM50
  - **Retainer Packages** (3 cards): Starter RM199/mo (3 devices), Business RM499/mo (8 devices), Pro RM899/mo (15 devices)
  - **Creative Retainer** (3 cards): Lite RM299/mo, Standard RM599/mo, Pro RM1,200/mo
  - **Combined Retainer**: Small Business RM799/mo, Growing Business RM1,500/mo
  - **AI Services**: Consultation RM150, Chatbot RM300, n8n Workflow RM500, ComfyUI Setup RM300, Custom AI RM800+
  - **CTA section**: WhatsApp link with pre-filled message
- Use `<Button>` and `<Card>` from `@astryxdesign/core`
- Style with Tailwind classes and Astryx theme tokens
- CTA buttons link to `https://wa.me/60137572507?text={encoded_message}`

### 2. Create /portfolio page (`src/pages/portfolio.astro`)
- Use Layout from `../layouts/Layout.astro`
- Sections:
  - **Hero**: "Our Work" title
  - **Design Portfolio** section with image cards:
    - Use placeholder image: `/images/portfolio-design.jpg`
    - Categories: Logo Design, Social Media, Flyers, Branding
  - **IT Services** section with image cards:
    - Use placeholder image: `/images/portfolio-it.jpg`
    - Categories: Repairs, Network Setup, AI Workflows
  - **CTA**: Link to WhatsApp for portfolio inquiry
- Cards should be clickable (or decorative for now with real portfolio coming later)

### 3. Add testimonial strip to homepage (`src/pages/index.astro`)
- Add a new testimonial section between the FAQ section and the final CTA
- Title: "What Clients Say"
- Use the testimonial quotes from the content draft:
  1. "Pancatz reka banner untuk kedai kami dalam sehari." — Aminah, Kedai Makan Asli, Kulai
  2. "Setup WiFi office kami jadi smooth." — Raj, Kulai Optics
  3. "Logo dan business card semua done di Pancatz. Professional." — Tan, JB Auto Parts
  4. "Saya ambil pelan bulanan IT. Response WhatsApp memang cepat." — Faiz, SG Creative Studio
- Style as a grid of `<Card>` components
- Background image: `/images/testimonials-strip.jpg`

### 4. Add FAQPage + LocalBusiness schema to homepage (`src/pages/index.astro`)
- In the frontmatter, add a structured data script tag in the head
- FAQPage schema using the existing FAQs from `src/data/site.ts`
- LocalBusiness schema with:
  - name: "Pancatz"
  - description: "Creative Hub + IT Services for modern teams"
  - url: "https://pancatz.com"
  - telephone: "+60137572507"
  - email: "pancatz.design@gmail.com"
  - areaServed: "Johor Bahru, Johor, Malaysia"
  - address: "Online-first / appointment-based, Johor Bahru, Johor, Malaysia"
  - sameAs: ["https://www.instagram.com/pancatz.design", "https://www.facebook.com/pancatz"]

### 5. Update meta descriptions with location keywords
- In `src/layouts/Layout.astro`, update the global meta description to include Johor Bahru / Malaysia keywords
- Add location: "Johor Bahru (JB), Malaysia" in page titles and descriptions

### 6. Add lead capture form to contact page (`src/pages/contact.astro`)
- Add a simple email + name + phone form section before the existing CTA
- Form submits as a mailto: link or simple POST (no backend needed yet — will connect via n8n later)
- Offer: "Free IT Health Check" or "Free Design Consultation"
- Style with existing design system components

### 7. Add Malay language page structures
- Create `src/pages/ms/` directory
- Copy existing key pages with Malay translations:
  - Index: `/ms/index.astro` — Malay version of homepage
  - Services: `/ms/services.astro` — Malay version of services
  - Pricing: `/ms/pricing.astro` — Malay version of pricing
  - About: `/ms/about.astro` — Malay version of about
- Use the Malay translations from the content draft
- Set `path="/ms"` and add Malay meta descriptions

### 8. Update navItems in site.ts
- Add `/pricing` and `/portfolio` to the nav
- Add `/ms` link for Malay language toggle

## Images already in place
- `/images/hero-bg.jpg` — Hero background
- `/images/portfolio-design.jpg` — Design portfolio image
- `/images/portfolio-it.jpg` — IT portfolio image
- `/images/testimonials-strip.jpg` — Testimonials visual
- `/public/pancatz-logo.jpg` — Site logo

## Design guidelines
- Use warm beige and dark grey tones from existing site
- Cards use `<Card padding={6} variant="default">` or `variant="muted"`
- Buttons: `variant="primary"` for CTAs, `variant="secondary"` for secondary, `variant="ghost"` for text links
- Badges: `<Badge>` from Astryx
- Use Tailwind: `section` class, `page-title` for h1, `lead` for subtitles, `kicker` for labels
- Responsive: use `grid gap-4 md:grid-cols-2 lg:grid-cols-3` for card grids
- CTA to WhatsApp: pre-fill message with `encodeURIComponent(whatsappIntents.general)`
