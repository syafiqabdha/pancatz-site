# Pancatz Single-Page Creative-Tech Prototype

## Goal
Turn Pancatz into one long, conversion-ready page. No navigation to `/pricing`, `/services`, `/portfolio`, `/about`, or `/contact`; every destination is a section anchor on `/`.

## Direction
Bold creative-tech with dark, sharp, high-contrast K-pop energy. Use a near-black charcoal canvas, off-white type, electric lime as the primary action color, hot coral as a secondary signal, thin grid lines, oversized editorial typography, asymmetric composition, and restrained motion. It should feel like a small elite studio, not a generic SaaS landing page.

## Audience and offer
Pancatz is one unified partner that makes businesses look better and run better: creative/brand/print, IT support, and AI/automation. Keep the current WhatsApp number, current services, portfolio images, and indicative MYR pricing so the prototype remains conversion-ready.

## Page narrative
1. Sticky header: logo, Work, Services, Pricing, WhatsApp CTA; mobile menu.
2. Hero: assertive headline, short value proposition, primary WhatsApp CTA, secondary scroll CTA, small proof/status strip.
3. What we solve: three bold capability blocks that explain the unified offer.
4. Selected work: responsive portfolio grid with current images.
5. Services: creative, IT, AI cards with WhatsApp intents.
6. Pricing: anchored pricing selector, readable on mobile, existing data.
7. Process / final CTA: simple three-step path and WhatsApp close.
8. Footer: contact links.

## Responsive rules
Mobile-first. No horizontal page overflow. Hero type uses clamp; cards stack cleanly; portfolio images retain sensible aspect ratios; pricing rows wrap without clipping; minimum 44px tap targets; nav drawer closes on anchor click; preserve reduced-motion behavior.

## Do not
Do not add 3D, a heavy component library, fake testimonials, fake logos, or new business claims. Do not remove existing data or WhatsApp conversion paths. Keep Astro and current dependencies.

## Quality bar
Run `npm run build`. Inspect at desktop and mobile widths. Fix broken anchors, missing assets, console errors, and overflow before reporting done.
