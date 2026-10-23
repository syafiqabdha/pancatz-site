# Contributing to Pancatz Site

Welcome! If you are a developer or an AI agent working on `pancatz-site`, please follow these guidelines.

## Design system

The site uses its own design system, written in Astro components and plain CSS. It does not use a component library.

- **Tokens:** Colours, type and spacing are CSS custom properties on `:root` in `src/styles/global.css`. Use the tokens (`--paper`, `--ink`, `--design`, `--tech`, `--accent`, `--t-*`, `--gutter`), not raw hex values.
- **Type voices:** Mona Sans (expanded for display) is the brand voice. Inside display text, `<em>` switches to the Design voice (Instrument Serif italic) and `<strong>` to the Tech voice (Doto dot matrix). Use them for one or two words, not whole sentences.
- **Side colour:** Set `data-side="design"` or `data-side="tech"` on an element and `--accent` resolves to that side's colour inside it.
- **Components:** Reuse the components in `src/components/` (`SectionHead`, `WorkCard`, `PriceCard`, `CTA`, `SidePage`) and the shared classes (`.btn`, `.label`, `.h2`, `.wrap`, `.section`, `.inverse`) before you add new ones.
- **Content:** Copy, services, pricing and work live in `src/data/`. Change the data, not the markup.
- **Vocabulary:** Follow `CONTEXT.md` (Selected Work, Project, discipline names).

## Motion

Motion lives in `src/scripts/motion.ts` (GSAP, ScrollTrigger, SplitText, Lenis), `src/scripts/hero-gl.ts` (OGL WebGL hero), and `src/remotion/` (Remotion compositions played with `@remotion/player`; see the README).

- Content must be readable without JavaScript. Only animate *from* a hidden state inside JS, never set `opacity: 0` in CSS.
- Everything must respect `prefers-reduced-motion`. Layouts that only work while animating, such as the pinned journey, go under `.js-motion`.
- Use the opt-in attributes (`data-reveal`, `data-split`, `data-clip`, `data-parallax`, `data-magnetic`, `data-statement`) rather than one-off scripts.

## Checks

Run `npm run build`, then check pages at 390px and 1440px for overflow and console errors before you open a PR.

Thank you for contributing to Pancatz!
