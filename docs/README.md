# Pancatz Documentation

This directory keeps implementation context separate from the deployable application.

## Current design direction

- [`design/REDESIGN_BRIEF.md`](design/REDESIGN_BRIEF.md) — active product, positioning, and page-architecture brief
- [`design/CINEMATIC_BENTO_SPEC.md`](design/CINEMATIC_BENTO_SPEC.md) — active visual system, responsive rules, motion, and performance constraints
- [`design/PREMIUM_DESIGN_AUDIT.md`](design/PREMIUM_DESIGN_AUDIT.md) — quality bar, evidence requirements, and remaining work before the site earns a premium-agency claim

## Historical context

[`archive/`](archive/) contains earlier build specs, theme notes, pipeline notes, and redesign explorations. They are retained for traceability only and **do not describe the current site**. When they conflict with the source or the current design documents, the source code wins.

## Source of truth

| Concern | Source |
|---|---|
| Public site behavior and content | `src/pages/index.astro`, `src/layouts/Layout.astro`, `src/data/site.ts` |
| Styling and motion defaults | `src/styles/global.css` |
| Runtime/dependency configuration | `package.json`, `astro.config.mjs` |
| Deployment | `Dockerfile`, `nginx.conf`, `docker-compose*.yml`, `.github/workflows/` |

Run `npm run build` after changing site code. Keep documentation accurate, but never let an old brief overrule the live implementation without an explicit product decision.
