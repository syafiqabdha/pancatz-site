# Pancatz Cinematic Bento System

## Intent
A dark, cinematic, custom Pancatz experience inspired by the discipline and scale of high-end creative studios—not a clone of any agency. Retain the business truth: one partner that makes businesses look sharper and run smoother.

## Visual architecture
- **Hero:** oversized two-line thesis with a bento “signal board” beside it. The board is CSS-only until real imagery arrives and uses a 32px radius.
- **Capability bento:** one wide creative tile, one tall IT tile, one AI tile, and a small integrated-partner tile. Each tile has a different spatial role, not repeated card styling.
- **Featured work:** exactly two editorial placeholder features, 3:2 desktop and 4:5 mobile. They are explicitly marked `REPLACEMENT VISUAL PENDING`.
- **Conversion:** a context-led WhatsApp lane chooser and a pricing selector; these are the active expansion states.

## States
| State | Behaviour |
|---|---|
| Default | Clear content hierarchy, quiet depth border, micro-copy visible, no reliance on JS. |
| Hover (pointer devices) | Rounded media/image area uses GSAP `scale: 1.02`, `duration: 0.4`, `ease: power2.out`; tile border and metadata become more prominent. |
| Active expansion | WhatsApp lane gets an active state and pre-filled destination; pricing tab updates content and `aria-selected`. No surprise navigation. |

## Motion
- Install and use **GSAP + ScrollTrigger**. Register it only when reduced motion is not requested.
- The decorative background layers are transformed by ScrollTrigger at exactly **0.3x foreground scroll speed** via a scrubbed `y: () => -scrollDistance * 0.3` calculation.
- Scroll entrances use GSAP with `scrub: 0.1` (the requested cinematic smoothing factor) and linear scroll binding. They must enhance content already visible by default.
- Respect `prefers-reduced-motion`: no ScrollTrigger, no hover transforms, no parallax.

## Responsive
- Mobile first. 1 column at <640px, 2 columns from 640px, 12-column bento composition from 1024px.
- Maintain 48px minimum control height; avoid hover-only information.
- Use strong contrast: primary text #f0ede8; navigation never lower than #b9b4ad on near-black.

## Performance
- CSS-only placeholder art; no video, WebGL, remote font, or oversized asset.
- Future project assets: WebP/JPEG, desktop 2400x1600 (3:2), optional mobile 1440x1800 (4:5), <=500KB each.
- Avoid layout shifts by reserving aspect ratio.

## Do not
Do not fabricate projects, results, logos, client names or testimonials. Do not add generic icon sets, gradients for their own sake, or motion that hides content.
