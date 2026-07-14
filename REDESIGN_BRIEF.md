# Pancatz Redesign — Creative Brief

## Brand Identity
Pancatz is a Malaysian creative+IT hybrid based in Johor Bahru. Two service lanes:
- **Creative Hub** — design, print, branding
- **IT Services** — repair, maintenance, AI workflow

Tone: Warm, personal, craft-focused, non-corporate. Malaysian small-business friendly.

## Design Direction: Calm Craft

### 1. Palette & Texture
- Muted, warm base: cream/off-white backgrounds (`#FDF8F3`), warm taupe (`#8B7D6B`), deep charcoal (`#2D2A26`)
- Accent: a warm terracotta or clay tone (`#C66B4B` or `#D4836A`)
- "Liquid glass" translucency: cards with `backdrop-filter: blur()` and subtle glassmorphism on key UI elements
- **Intentional imperfection**: add subtle paper/grain texture as a CSS overlay or background pattern on hero sections and cards. Think offset-printed feel — not sterile vector-perfect.

### 2. Typography
- Warm serif or rounded sans-serif for headings (playful but readable)
- Clean sans-serif for body text
- Soft letter-spacing, generous line-height

### 3. Conversational Pricing (Micro-Commitment)
Replace the flat pricing table with a **step-by-step flow**:
- Step 1: "What do you need?" → buttons: Design, Print, IT Repair, AI Setup, Retainer
- Step 2: Based on selection, show relevant options/packages
- Step 3: Reveal price + CTA to WhatsApp
- This reduces cognitive load — show one thing at a time

### 4. Layout & Components
- Softer corners (`rounded-2xl` / `rounded-3xl`)
- Cards with subtle borders and background grain
- Hero section: warm, textured background with a hand-drawn/illustrative feel
- Testimonials: card-based with quote marks as decorative elements
- CTA sections: warm clay/taupe backgrounds with soft white text

### 5. Homepage Restructure
```
Hero (warm + textured) → "What do you need?" conversation starter
→ Service Hubs (Creative / IT) with craft-style cards
→ Testimonials (calm card grid)
→ Pricing preview (3 retainer tiers in glass cards)
→ FAQ (clean accordion)
→ CTA (warm clay background)
```

## Implementation Notes
- Keep Astro + Tailwind + Astryx components where they work
- Override colours and styles to match the new palette
- Add CSS grain overlay as a global background texture
- The conversational pricing can be a client-side JS toggle (show/hide sections) — no backend needed
- Responsive: mobile-first as always
- Don't touch the Malay pages for now — redesign English first

## What to Do
1. Update global CSS with new palette and grain texture
2. Redesign homepage with calm/craft aesthetic
3. Redesign pricing page with conversational step flow
4. Redesign the hero and CTA sections

Start with the CSS/tokens first, then homepage, then pricing. This is a creative pass — make it feel warm, crafted, and human.
