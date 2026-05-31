# Pancatz.com — Website Pipeline

Pancatz: design, printing, photography, IT & AI services. Kelapa Sawit / Kulai, Johor.

## Kanban Pipeline

```
t_de986cdc ──→ t_5bc0625c ──→ t_956e045d ──→ t_6fa7a554
 (T1 done)      (T2 done)      (T3ready)    (T4 waiting)
```

| Task | ID | Profile | Status | Description |
|------|-----|---------|--------|-------------|
| T1 | `t_de986cdc` | turing | ✅ done | Research: audience, SEO, competitors |
| T2 | `t_5bc0625c` | john | ✅ done | UI/UX design spec |
| T3 | `t_956e045d` | neo | 🔵 ready | Build: Astro/Tailwind (site written, unblocked) |
| T4 | `t_6fa7a554` | default | ⏳ todo | Review: QA, mobile, content |

## Tech Stack
- **Framework:** Astro 5 (static)
- **Runtime:** Node/npm (Bun unavailable, fallback)
- **CSS:** Tailwind v4 (Vite plugin)
- **Fonts:** DM Sans + Inter (Google Fonts)

## Site Map (5 pages)
- `/` — Home: hero, services preview, portfolio highlights, FAQs, CTA
- `/services` — 5 service cards (design, print, photo, computer repair, IT & AI)
- `/portfolio` — 6 work samples with Unsplash images
- `/about` — Mission, how we work, who we serve, coverage
- `/contact` — WhatsApp CTA, email, phone, Instagram, area

## Live Config
- **WhatsApp:** +60137572507
- **Email:** hello@pancatz.com
- **Instagram:** @pancatz.design
- **Domain:** pancatz.com

## Post-Launch Checklist
- [ ] Update DNS for pancatz.com to point at hosting
- [ ] Add real portfolio images (replace Unsplash placeholders)
- [ ] Verify all WhatsApp links work end-to-end
- [ ] Submit to Google Search Console
- [ ] Add Google Analytics or privacy-friendly alternative

## Folder Structure
```
pancatz-site/
├── docs/          ← Pipeline docs (this file)
├── src/
│   ├── pages/     ← 5 Astro pages
│   ├── layouts/   ← Layout.astro (nav, footer, WA fab)
│   ├── data/      ← site.ts (all content config)
│   └── styles/    ← global.css (Tailwind + theme)
├── dist/          ← Static build output
└── node_modules/
```
