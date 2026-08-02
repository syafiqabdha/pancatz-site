# High-Level UI Spec: Homepage, Pricing, Portfolio
## Pancatz — Clay-Inspired Adaptation (Calm Craft Premium)

**Project:** pancatz-site (Astro + Tailwind + Astryx)
**Inspiration Source:** Clay.com (premium SaaS GTM platform: bold typography, generous whitespace, polished interactive visuals, clean data/product UIs, trust-forward, elevated yet approachable).
**Adaptation Goals:** Elevate current "Calm Craft" direction (warm paper #f8f6f1, terracotta/clay #c66b4b, grain, soft cards) with Clay's confidence and visual premium without losing local Malaysian small-business warmth and craft feel.
**Core Principles (Clay-adapted for Pancatz):**
- Generous whitespace + confident padding (sections breathe).
- Bold, expressive typography (large display sizes, tight tracking on headlines, already partially implemented via fluid clamps).
- Premium tactile surfaces: subtle grain/paper texture, soft rounded (xl/2xl/3xl), gentle lifts/shadows that feel "hand-crafted clay".
- Interactive & delightful: Clay-like subtle animations + **signature interactive 3D clay orb** in hero.
- Conversational but elevated: Pricing remains step-driven (matches current JS flow + REDESIGN_BRIEF), visually premium with cards and clear value.
- Rich media portfolio: Tagged, visual-first cards.
- Service presentation: Premium cards (or smooth accordions for depth).
- CTAs: Dominant WhatsApp primary buttons, secondary "See pricing / Work".
- Palette extension: Keep/extend existing (paper/surface, terracotta primary, charcoal ink, muted ink). Add subtle Clay-like accent highlights (e.g., soft gold or deeper terracotta variants) and clean neutrals.
- Trust & locality: Small Johor business signals + "real results" language.
- Responsive-first, mobile-optimized (WhatsApp-first audience).
- Respect reduced motion.

**Assets to leverage / create:**
- Existing: pancatz_hero.png (1280x720), logos, grain CSS, interactive-lift cards, current pricing/portfolio pages.
- New: 3D orb component (React island), better portfolio photography or high-quality mocks, icons for services.
- Textures: Subtle paper/grain overlay (already in body.grain).

---

## 1. Homepage (src/pages/index.astro)

**Overall Structure (Clay-inspired flow):**
Hero (visual + promise) → Conversational entry ("What do you need?") → Service hubs (premium presentation) → Rich portfolio teaser → Pricing preview (teaser tiers) → Testimonials (social proof) → FAQ (optional) → Strong final CTA.

**Hero Section**
- Layout: Generous top padding, max-w container or split (text left 55-60%, visual right or full-bleed with overlaid orb).
- Headline (bold, Clay-like): 
  - "Calm craft.<br />Clear results." (keep or evolve to "Craft that works.<br />Systems that last." or "Design + systems for businesses that move.")
  - Large fluid size (step-4 or larger), tight -0.06em tracking, heavy weight.
- Subhead: Short, benefit-oriented. "Design, print, IT care and practical AI for Johor businesses that want it done right."
- Kicker/location: "Johor Bahru" small uppercase (existing).
- CTAs (stacked or inline, primary prominent):
  - Primary: "Chat on WhatsApp" (pre-filled general intent) — big rounded pill, terracotta bg.
  - Secondary: "See pricing" / "View our work".
- Visual element (signature Clay adaptation):
  **Interactive 3D Clay Orb**
  - Matte, slightly imperfect clay sphere (warm terracotta #c66b4b + cream highlights + subtle charcoal line work).
  - Pancatz logo (or stylized "P" / cat silhouette) subtly embossed or floating on surface.
  - Subtle textures: faint print halftone or paper grain on surface.
  - Interaction: Mouse/touch orbit (slow auto-rotate when idle), gentle scale or "squish" on hover/click for clay tactility. Floating micro-icons around it (design pencil, circuit, robot node — very small, low opacity).
  - Tech: React island using Three.js (@react-three/fiber + drei) or lightweight Canvas + simple sphere shader, or embed Spline scene (performance-friendly export). Fall back to high-quality static hero image with parallax or CSS 3D tilt.
  - Background: Soft paper + subtle raw grid or faint texture (keep existing raw-grid for hero).
  - Responsive: On mobile, orb smaller or centered below text; reduce interaction intensity.
- Spacing: Very generous vertical (pt-14/20 pb-24+), Clay-style breathing room.

**Conversational Starter ("What do you need?")**
- Small kicker "START HERE".
- Headline: "What do you need right now?"
- Grid of 4-5 premium cards (elevate current):
  - CREATIVE / Design or Print
  - IT SUPPORT / Fix or Maintain
  - AUTOMATION / AI & Workflows
  - PLANS / Monthly Retainers
  - "Just tell us" freeform
- Each card: Clean surface, subtle border, good icon (or emoji), title bold, short desc, hover lift + border highlight. Clay-card polish: slightly larger padding, better typography hierarchy.
- All link to WhatsApp with specific intent or /pricing.

**Service Hubs**
- Two (or three) large premium cards side-by-side on desktop (stack mobile).
- "CREATIVE HUB" and "IT SERVICES".
- Clay-style: Large headline inside card ("Design that prints. Brands that stick."), clean bullet list of offerings, strong secondary CTA button.
- Optional third for "AI & Retainers".
- Use card-emphasis or new "premium-card" variant with deeper shadow or clay-edge treatment.

**Portfolio Teaser / Selected Work**
- Kicker "SELECTED WORK".
- Headline "Work that gets used."
- Small grid (3-4) of **rich media cards** (preview of full portfolio page).
- Each: Large image (use or create better project shots: banners, printed materials, setups, AI screenshots), title, client/location tag, 1-2 service tags (badges: "Print", "Branding", "Repair", "Automation").
- Hover: Subtle scale + overlay with short result ("Delivered same-day" or "3-month retainer").
- Link to full /portfolio. Keep generous gaps.

**Pricing Preview**
- "INVESTMENT" kicker + "Simple plans. No surprises."
- 3 cards (Starter/Business/Pro retainers) — elevate with Clay-like clean tiers.
  - Bold large price (RM199 etc.), /month.
  - Clear feature bullets.
  - Featured middle card with stronger border or "Most popular".
- Link to full /pricing.

**Testimonials / Stories**
- "REAL PEOPLE" / "What clients say".
- Grid of calm quote cards (current is good; make quotes slightly larger, add subtle quote mark or avatar if photos available).
- 4 quotes, 2-col.

**Final CTA**
- Centered, warm clay background or strong paper with accent border.
- "Ready when you are." + WhatsApp CTA.

**Other Polish**
- Add subtle scroll progress or section dividers that feel crafted (thin terracotta line or grain).
- Nav: Keep simple, add "Work" as Portfolio link.
- Performance: Lazy load images/orb.

---

## 2. Pricing Page (src/pages/pricing.astro)

**Overall:** Keep and elevate the existing conversational step flow (matches REDESIGN_BRIEF perfectly). Clay inspiration: Clean comparison tables for retainers, generous cards, feature clarity, no surprises language. Make it feel premium service pricing, not cheap commodity.

**Hero**
- "Transparent rates.<br />No surprises."
- Short explainer: "Pick a lane. See starting ranges. Message us for a precise quote tailored to your project."
- Very clean, lots of top space.

**Conversational Flow (elevated)**
- Step 1 header: "What are you looking for?"
- Horizontal or wrapped segmented control / beautiful pill buttons (current step-btn, make more Clay-polished: better active state with terracotta underline or filled pill, larger touch targets).
- Categories: Creative / Design, Printing, IT Services, Monthly Retainers, AI & Automation.
- On select: Smooth scroll or reveal below (or tab-like panels). Use JS already present; enhance with better transitions, loading micro-state if needed.

**Per-Category Content (use premium cards/lists)**
- Creative/Design: Clean definition list or two-col grid of "Service — From RMxxx". Bold prices.
- Print: Similar, per-unit pricing.
- IT One-time + Retainers: Mix list + 3-tier cards (elevate retainers like Clay tiers: clear headers, feature rows, "Best for X businesses").
- Retainers Creative + Combined: 3-col premium cards.
- AI: List of setup services.

**Visual Elevation (Clay touches):**
- Prices in large, bold, tracking-tight font.
- Subtle dividers or card groupings.
- "Value callouts" next to tiers (e.g., "Predictable cost • Fast response").
- Side or bottom summary panel (optional React island): "Your selection so far" updating live (e.g., "Creative retainer — RM599/mo").
- All CTAs: Consistent primary WhatsApp buttons with context-specific messages.
- Footer note: "Starting ranges. Final quote depends on scope. 50% deposit..." — style elegantly.

**Comparison / Retainer Highlight**
- For retainers: Optional full feature comparison table (Clay-style) for the three tiers (columns: Starter / Business / Pro). Simple rows for devices, response, onsite, etc. Use clean table or card-grid hybrid.
- Highlight flexibility: "Custom scopes available — just message us."

**Trust/Close**
- Small section: "Hundreds of Johor projects delivered" or client logos strip (if available) + final WhatsApp.

---

## 3. Portfolio Page (src/pages/portfolio.astro)

**Hero**
- "Selected work." or Clay-inspired "Work that gets used."
- "Real projects for real Johor businesses."
- Short filter row below hero or in section.

**Main Content: Rich Media Cards with Tags**
- Responsive grid (masonry preferred or CSS columns for visual interest; 2-col desktop, 1 mobile).
- Card structure (premium Clay-card feel):
  - Large hero image (high-quality photos or polished mockups of printed pieces, screen setups, branding applications). Prioritize real client work.
  - Below image or overlay bottom: Project title (e.g., "Kedai Makan Asli — Menu & Banner System").
  - Tags row (small elegant badges/pills): Service tags ("Logo Design", "Print Production", "IT Retainer", "AI Workflow") + Industry ("F&B", "Retail", "Optics", "Auto Parts").
  - Short result line: "Same-day delivery" or "Ongoing support".
  - Subtle "View on WhatsApp" or "Ask about similar project" CTA (small).
- Interactions: Hover lift (current), image subtle zoom or before/after if available, click opens lightbox modal (simple Astro/JS) with more images, description, tags, and big WhatsApp button.
- Categories/Filters (top or sidebar): All | Creative Hub | Print | IT Services | AI & Automation. (JS filter or separate sections if static).
- Group or infinite scroll if many items (start with 8-12 featured).

**Additional Sections**
- "Process highlights" or "What we deliver" small cards if space.
- Testimonials tied to specific projects (optional).
- "Not seeing what you need?" → Direct to conversational pricing or WhatsApp.

**Visual Style**
- Generous card padding and gaps (Clay whitespace).
- Consistent image treatment: Rounded corners, subtle shadow or border.
- Tag styling: Small, rounded, low-contrast or terracotta accents.
- Overall: Editorial, craft-focused, not gallery overload.

---

## Implementation & Technical Notes

**Tech for 3D Orb (Homepage Hero):**
- Add React island: `src/components/ClayOrb.tsx`
- Dependencies: three, @react-three/fiber, @react-three/drei (or keep light).
- Simple sphere with MeshPhongMaterial or custom shader for clay look.
- Camera controls limited (orbit only, no zoom excess).
- Performance: Canvas with devicePixelRatio cap, lazy load.
- Alternative low-cost: Pure CSS 3D + SVG or Lottie clay animation + Pancatz logo overlay.

**Components to Extend (Astryx + custom):**
- New variants: `.premium-card`, `.rich-media-card`, `.pricing-tier`.
- Re-use `.card`, `.interactive-lift`, `.btn-primary`.
- Add grain texture class globally or per section (body already has `.grain`).
- For pricing steps: Enhance to feel more like a Clay wizard (progress dots? live summary?).

**Content & Data:**
- Pull from `src/data/site.ts` for intents.
- Portfolio data: Move to `src/data/portfolio.ts` (array of {id, title, image, tags: string[], industry, result, waMessage?}).
- Pricing data: Centralize numbers in data file for easy updates.

**Images & Media:**
- Optimize all (current public/images + new).
- Recommend: Real photography of prints/IT work. Fallback high-quality generated or stock adapted with brand colors.
- OG / social: Use existing pancatz_og.png; update for new hero.

**Polish & Accessibility:**
- Generous line-heights, readable sizes.
- Focus states strong on CTAs.
- ARIA for steps, filters, orb (describe interactive element).
- Dark mode? Low priority — keep light warm paper for now (matches craft).

**Phased Rollout Suggestion:**
1. CSS / token polish + hero 3D (or static + tilt first).
2. Elevate pricing conversational visuals + summary.
3. Portfolio rich cards + filters + data model.
4. Homepage service/portfolio sections.
5. Testing on real mobile + WhatsApp flow.

**Success Metrics (qualitative):**
- Feels more premium and confident (Clay polish) while remaining approachable and warm (Pancatz craft).
- Pricing feels transparent and non-intimidating.
- Portfolio shows capability and results visually.
- CTAs drive WhatsApp conversations.

---

**References & Next Steps**
- Current implementation already strong foundation (conversational pricing, warm palette, cards).
- REDESIGN_BRIEF.md and BUILD_SPEC.md align closely — this spec builds on them with Clay elevation.
- Clay references (from research): Large type, product visuals in hero, clean tiered/comparison pricing, rich case study cards, generous space, subtle interactions.
- To proceed: Implement orb component, audit images, centralize data, iterate on card components.
- Ask for specific asset generation (new hero renders, orb references) or component coding if needed.

*Drafted based on task: high-level UI spec for homepage, pricing, portfolio. Adapted specifically per provided context (3D clay orb, premium cards/accordions, rich tagged portfolio, conversational elevated pricing, whitespace + bold type).*
