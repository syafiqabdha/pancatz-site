# Pancatz: $10k-Grade Website Standard

## Reality check
The current prototype is competent but not yet premium-agency work. It has a strong palette and tidy layout, but it is still a collection of familiar landing-page sections: hero, cards, portfolio grid, price tabs, process. A $10k site is not bought for a dark theme or animation. It is bought for a distinct point of view, proof, content art direction, conversion strategy, and meticulous responsive QA.

## Market benchmark
- Custom marketing sites commonly bundle bespoke UX, copy, brand-matched visuals, technical SEO, and analytics. Published ranges place these projects around US$5k–20k; Clutch says reviewed UX projects commonly sit in the US$10k–49,999 band.
- The design budget reflects discovery, wireframes, content strategy, high-fidelity responsive design, prototyping, QA, and launch—not merely coding.

## Non-negotiables
1. One sharply defined audience and offer. Pancatz must sell the outcome: businesses that look sharper and operate smoother. Creative, IT and AI are supporting evidence—not three competing homepages.
2. Original art direction. Build one unmistakable visual device from actual Pancatz material: project fragments, print textures, real work-in-progress, site visits, or studio artefacts. Do not decorate with generic blobs, icon packs, or AI filler.
3. Case-study proof. Replace generic portfolio cards with 3 real mini case studies: client/context, problem, deliverables, visual evidence, and tangible outcome when available. No invented results or testimonials.
4. Custom conversion path. Every important section needs one clear, contextual action. Use a WhatsApp brief chooser / short progressive enquiry flow rather than repeating a generic CTA.
5. Deliberate motion. Motion must reveal hierarchy or cause/effect: one signature hero interaction, work previews that respond to input, and restrained section transitions. Nothing moves merely because it can.
6. Design system, not one-off styling. Codify grid, type, colors, spacing, buttons, cards, tags, focus states, motion, and mobile rules before detail work.
7. Performance/accessibility QA. Target LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75; keyboard navigation, visible focus, real alt text, reduced motion, and 44px touch controls.

## Approved scope: two featured projects, placeholders now
- Build exactly **two** premium editorial case-study features. They are intentional placeholders, not fake proof. Each must be visibly marked `PROJECT 01 — REPLACEMENT VISUAL PENDING` / `PROJECT 02 — REPLACEMENT VISUAL PENDING` and use neutral art-directed placeholder compositions until Syafiq supplies material.
- Keep all other business services balanced. The website must not privilege Creative, IT, or AI as the sole revenue engine; the central promise is the combined outcome.
- **Asset handoff requirements:** Prepare two images per project: a desktop landscape image at **2400 × 1600 px (3:2)**, plus an optional mobile portrait crop at **1440 × 1800 px (4:5)**. Use WebP or JPEG, target under 500 KB each after compression. The code must reserve the exact aspect ratio to prevent layout shift when replacements arrive.

## Recommended information architecture
1. Hero: outcome, one central thesis, high-impact original art / project montage.
2. Credibility strip: location, service model, actual proof only.
3. The business tension: look amateur / operate manually / lose time.
4. Unified solution: one narrative, then three capabilities as proof.
5. Two featured projects: large, asymmetric editorial case-study placeholders—not equal product cards.
6. Operating model: visual explanation of how Pancatz joins brand and systems.
7. Scope/pricing: a guided selector that ends in a tailored WhatsApp message.
8. FAQ / risk reversal: turnaround, revision, support, service area—only confirmed facts.
9. Closing conversion block: direct WhatsApp project-start moment.

## UI/UX architecture constraints
- **Custom-first:** No template-looking layouts, generic framework compositions, or copied component patterns. The design system may use Astro/Tailwind utilities, but the visual composition must be authored for Pancatz.
- **Hyper-minimal and adaptive:** Content comes first. Hide secondary detail until context makes it useful; use progressive disclosure in the project chooser, pricing, and case-study details rather than exposing every option at once.
- **Micro-interactions with purpose:** Use subtle transitions for navigation state, project selection, pricing changes, and form/WhatsApp handoff. Motion must communicate state or increase confidence; no ornamental animation loops.
- **Bento architecture where it clarifies:** Use varied, intentional boxes for capabilities, proof, and scope—not a repeated grid of identical cards. Bento is a structural tool, not a trend sticker.
- **Dark contrast default:** Maintain near-black dark mode as the primary experience with WCAG-conscious text, focus rings, borders, and action contrast. Muted text must remain readable on the canvas.
- **Mobile-first as a separate composition:** Design the 360–430px experience intentionally for thumb reach, variable connectivity, and short attention—not merely a collapsed desktop grid.
- **Performance and low-carbon assets:** Reserve image dimensions, prefer local compressed WebP/JPEG and lean SVG, avoid unnecessary libraries, lazy-load below-fold media, and target LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at p75.

## What must change in the existing prototype
- Hero: copy and color are not enough. Introduce a distinctive, real Pancatz visual asset and a refined type composition. The headline needs a greater claim of point of view.
- Capability and service cards: merge or make them meaningfully different. Repeated card grids are template behaviour.
- Work: the highest-value weakness. Four stock-like equal cards do not prove premium delivery. Replace with immersive editorial mini-case studies.
- Pricing: useful, but visually and emotionally flat. Upgrade it to a guided scope conversation, retain transparent prices as reassurance.
- Proof strip: remove "Fast turnaround" unless specific evidence/terms exist; it currently reads like generic sales copy.
- Header/footer: give the brand a more authored wordmark treatment and use active navigation state.

## Build sequence
### Phase 1 — Strategy and material
- Confirm ideal customer, primary conversion, and service priority.
- Collect real source material: 3 projects, logo source, 10–20 behind-the-scenes / finished work images, client permission, measured outcomes, delivery constraints.
- Create a content matrix and 2 art-direction boards. Select one.

### Phase 2 — Design
- Create a lightweight Figma-quality system in code: 12-column desktop / 4-column mobile grid, type scale, motion rules, interaction states.
- Design desktop and mobile intentionally—not desktop compressed into mobile.
- Make the hero + one case study the signature pieces. These earn the perceived price.

### Phase 3 — Build and QA
- Implement in Astro, optimize images, avoid heavyweight animation.
- Validate at 360px, 390px, 768px, 1024px, 1440px and keyboard-only navigation.
- Run Lighthouse/PageSpeed, inspect CWV risks, validate all links and WhatsApp intents.

### Phase 4 — Conversion learning
- Add analytics events for hero CTA, project-lane selection, pricing interaction and WhatsApp opens.
- Review enquiry quality after launch; improve copy and CTA flow based on observed behaviour.

## Evidence used
- Knapsack Creative: custom sites are strategy -> wireframes -> bespoke design -> build, typically including bespoke user journeys, copy, technical SEO and CRM/analytics; US$5k–20k range. https://knapsackcreative.com/blog/web-design/web-design-pricing
- Clutch: UX projects reviewed typically cost US$10k–49,999. https://clutch.co/agencies/ui-ux/pricing
- Tubik’s Awwwards case study: distinctive visual language came from the work itself, turning real project fragments into the site’s visual system. https://blog.tubikstudio.com/annual-awwwards-website-design/
- Nielsen Norman Group: maintain clear status, user language, user control and consistency. https://www.nngroup.com/articles/ten-usability-heuristics/
- web.dev: good CWV thresholds are LCP <= 2.5s, INP <= 200ms and CLS <= 0.1. https://web.dev/articles/vitals
