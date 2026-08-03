# Scroll Narrative Brief — Arc A "The Upgrade"

## What
Replace the existing uniform `initGSAP()` with a scroll-driven narrative system for Pancatz site.

## Palette (already applied)
- Canvas: #0a0a0a (near-black)
- Ink: #f0ede8 (off-white)
- Primary: #c8ff00 (lime)
- Accent: #ff6b4a (coral)
- Serif: Playfair Display (for headlines)
- Sans-serif: Geist (for body)

## Rules
- ALL animations must respect `prefers-reduced-motion: reduce` — disable everything
- Default CSS for reveal elements: `opacity: 1; transform: none` (never `opacity: 0` as default)
- Use GSAP ScrollTrigger with scrub for scroll-linked animations
- Mobile (375px): simplify — cards stack, no parallax tilt, animations become simple fade-in
- Keep all existing content, CTAs, data-intent values, pricing data, contact form unchanged
- Only edit src/pages/index.astro and src/styles/global.css
- npm run build must pass

## Sections to Transform

### 1. Process section (#process)
- Stage numbers (01, 02, 03) scale up with subtle glow as they enter viewport
- A connecting vertical line draws between stages on scroll (SVG stroke-dashoffset or CSS border animation)
- Light scroll-triggered reveal with scrub

### 2. Capabilities section (#capabilities)
- 4 Discipline cards (Creative, Print, Tech, AI) enter with staggered parallax tilt/rotate
- Full Partnership card fades in after the 4 cards
- GSAP ScrollTrigger with scrub, subtle perspective transform

### 3. Services section (#services)
- 4 Discipline cards + Full Partnership card with depth (shadow lift or translateZ)
- Service bullet icons animate in sequence within each card
- All reveal animations use scrub

### 4. Work/Portfolio section (#work)
- Case study placeholders become full-width pinned frames with subtle parallax on scroll
- Add a horizontal marquee strip: "Selected Work · Creative · Print · Tech · AI · Full Partnership ·" scrolling across a dark band between portfolio and services
- Marquee: CSS animation, infinite loop, pauses on hover, GPU-accelerated translateX

### 5. Pricing section (#pricing)
- Numbers count up (GSAP or CSS counter) when a pricing tab becomes active
- Tab content crossfades smoothly (not snap)
- Price cards have subtle gradient border reveal on tab switch
- Existing pricing data and tab JS unchanged — only enhance the transition

### 6. Contact/Start section (#start)
- Radial zoom-blur background effect behind headline (CSS backdrop-filter blur or gradient)
- CTA button ("Start a conversation") has subtle pulse/shimmer on idle
- Form functionality preserved unchanged

## What NOT to touch
- Hero section (already done — circular SVG rings + wave text)
- Contact form JS, validation, webhook
- Pricing data objects
- Service card content
- Portfolio placeholder content
- Layout.astro
- site.ts
- SEO metadata

## Verification
Run `npm run build` — must exit zero. Run `npm run dev` and check page renders.
