# Contributing to Pancatz Site

Guidelines for anyone (human or AI agent) changing `pancatz-site`.

## Where things live

| Change | Edit |
|---|---|
| Page order | `src/pages/index.astro` |
| A section's markup | `src/components/sections/<Section>.astro` |
| Section heading block (label, title, intro) | `src/components/SectionHeader.astro` |
| Services, capabilities, process copy | `src/data/disciplines.ts` |
| Prices | `src/data/pricing.ts` |
| Brand, contact details, webhook, enquiry options | `src/data/site.ts` |
| Client behaviour | `src/scripts/` (`nav`, `contact-form`, `pricing`, `motion`) |
| Tokens and component styles | `src/styles/global.css` |

## Rules

- Content goes in `src/data/`, not hard-coded in markup.
- Use the colour and spacing tokens in `global.css`; avoid raw hex values and inline `style=` attributes.
- Tailwind only sees class names written out in full, so map variants to complete class strings rather than building them with template literals.
- Content must render without JavaScript. Scripts may enhance it (motion, tab switching) but never gate it.
- Keep `prefers-reduced-motion` support and 44px minimum touch targets.
- Run `npm run build` before opening a PR.
