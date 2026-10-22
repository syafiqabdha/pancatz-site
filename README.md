<div align="center">
  <img src="public/pancatz-logo.webp" alt="Pancatz logo" width="120" height="120" />

  # Pancatz

  **Studio site for businesses that want to look sharper and run smarter.**

  [![Astro](https://img.shields.io/badge/Astro-6.4.8-ff5a03?logo=astro&logoColor=white)](https://astro.build/)
  [![Node](https://img.shields.io/badge/Node-%3E%3D22.12.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Docker](https://img.shields.io/badge/Docker-Nginx%201.27-2496ed?logo=docker&logoColor=white)](https://www.docker.com/)

  [Live site](https://pancatz.com) · [Development](#development) · [Deployment](#deployment)
</div>

---

## What this build is

Pancatz is an Astro static site for a Kulai, Johor studio with two sides under one brand:

- **Design & Print:** brand identity, social and digital design, print production, signage
- **Tech, AI & Photography:** IT support and networks, web/hosting/SEO, AI chatbots and n8n automation, commercial photography

All enquiries go to one email, one WhatsApp and one form.

## Pages

| Route | Purpose |
|---|---|
| `/` | WebGL hero, "pick a side" split panel, horizontal "opening a café" story, selected work, process, CTA |
| `/design` | Design & Print: services, pricing, work, cross-link to Tech |
| `/tech` | Tech, AI & Photography: services, pricing, work, cross-link to Design |
| `/work` | All work, filterable by side |
| `/pricing` | All indicative MYR pricing, filterable by side |
| `/contact` | Brief form (n8n webhook), WhatsApp, email. `?service=<key>` preselects the service |

Content lives in `src/data/site.ts` (contact details, nav) and `src/data/services.ts` (services, pricing, work, process).

### Replacing sample work

Work items in `src/data/services.ts` are marked `placeholder: true` and show a "Sample" flag. To swap in a real project, drop the image in `public/images/`, update `image`, `title` and `tags`, and set `placeholder: false`. Images are shown at 4:3.

## Visual direction

- Paper canvas `#f2f0eb`, ink `#0d0d0f`
- Side colours: Design & Print orange `#ff4f1a`, Tech & AI cobalt `#2b35ff`
- Bricolage Grotesque (display), Inter (body), JetBrains Mono (labels)
- Sharp edges, visible column grid, print grain

## Motion

| Effect | Where | Library |
|---|---|---|
| Topographic noise field swirled by the cursor | Home hero | OGL (WebGL2, flowmap) |
| Smooth scrolling | Everywhere | Lenis |
| Line-masked headline reveals, scroll-filled statements | Everywhere | GSAP SplitText |
| Scroll-velocity marquee, pinned horizontal story, reveals, parallax | Everywhere | GSAP ScrollTrigger |
| Split panel that follows the cursor (auto-sways on touch) | Home | GSAP |
| Image trail, magnetic buttons, cursor dot | CTA, buttons | GSAP |
| Cross-page fade | Navigation | CSS view transitions |

Content is visible without JavaScript. Everything animated is skipped under `prefers-reduced-motion`, and the hero falls back to a static background without WebGL2.

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 6 static-site build |
| UI runtime | React 19 integration (available for islands/components) |
| Styling | Tailwind CSS v4 through Vite + authored global CSS/tokens |
| Motion | GSAP (ScrollTrigger, SplitText), Lenis, OGL (WebGL) |
| Typography | Bricolage Grotesque, Inter, JetBrains Mono via Google Fonts |
| Contact delivery | n8n webhook |
| Production serving | Nginx 1.27 Alpine in a multi-stage Docker image |
| CI image publishing | GitHub Actions → GitHub Container Registry (`ghcr.io`) |
| Self-hosting | Docker Compose; Coolify/Traefik compose configuration included |

## Development

### Requirements

- Node.js `>=22.12.0`
- npm

### Run locally

```bash
git clone https://github.com/syafiqabdha/pancatz-site.git
cd pancatz-site
npm ci
npm run dev
```

Astro serves the development site at `http://localhost:4321` by default.

### Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Astro’s development server. |
| `npm run build` | Produce an optimized static site in `dist/`. |
| `npm run preview` | Serve the latest production build locally. |
| `npm run astro -- …` | Run Astro CLI commands. |
| `npm run astryx -- …` | Run the installed Astryx CLI. |

### Production check

```bash
npm run build
npm run preview
```

The build must pass before deployment. Review the site at desktop and mobile widths, test all anchor paths, pricing tabs, mobile navigation, and an enquiry submission against the intended n8n environment.

## Deployment

### Docker / Nginx

The primary `Dockerfile` builds the static Astro output with Node 22 Alpine, then serves `dist/` with Nginx 1.27 Alpine. Nginx adds baseline security headers, gzip, clean static URL resolution, and long-lived caching for Astro assets.

```bash
docker build -t pancatz-site:local .
docker run --rm -p 8088:80 pancatz-site:local
```

Open `http://localhost:8088`.

### Docker Compose

```bash
docker compose up -d --build
```

The default host port is `8088`; override it with `PORT`:

```bash
PORT=8090 docker compose up -d --build
```

### Coolify / Traefik

[`docker-compose.coolify.yml`](docker-compose.coolify.yml) attaches the container to the external `coolify` network and configures routes for `pancatz.com` and `www.pancatz.com` over TLS.

### GitHub Container Registry

The GitHub Actions workflow builds on pull requests and builds/publishes the image for pushes to `master` and version tags. Published images use the GitHub repository name under:

```text
ghcr.io/syafiqabdha/pancatz-site
```

## Repository map

```text
pancatz-site/
├── src/
│   ├── pages/index.astro       # The complete single-page experience and client interactions
│   ├── layouts/Layout.astro    # Document shell, fixed navigation, footer, mobile drawer
│   ├── data/site.ts            # Brand/contact configuration and enquiry intent labels
│   └── styles/
│       ├── global.css          # Design tokens, responsive layouts, motion and accessibility rules
│       └── theme/              # Existing Astryx theme artifacts
├── public/                     # Logo, OG image, favicon, and legacy/project image assets
├── .github/workflows/          # Container build/publish workflow
├── Dockerfile                  # Multi-stage Astro build + Nginx image
├── Dockerfile.cloudrun         # Alternative static-server image for Cloud Run
├── docker-compose.yml          # Local self-hosted compose setup
├── docker-compose.coolify.yml  # Coolify/Traefik setup for pancatz.com
├── nginx.conf                  # Static serving, caching, gzip, security headers
├── docs/                       # Current design docs + archived planning context
└── package.json                # Scripts, engines, and dependencies
```

## Content and design guardrails

- Do not invent client outcomes, testimonials, logos, or case studies.
- Keep the site’s unified promise intact: Creative, IT, and AI are supporting disciplines, not competing homepages.
- Replace the two work placeholders only with approved, real project material.
- Content must remain visible without JavaScript; animation can enhance it, never gate it.
- Preserve reduced-motion behavior and at least 44px interactive touch targets.
- Treat the form webhook as production infrastructure: coordinate changes with its n8n workflow.
- Review [`CONTRIBUTING.md`](CONTRIBUTING.md) before introducing Astryx components or changing its theme artifacts. Its Astryx guidance is legacy-oriented; the live page currently relies chiefly on Astro, Tailwind utilities, and `src/styles/global.css`.

## Brand/contact configuration

The editable site configuration is centralized in [`src/data/site.ts`](src/data/site.ts):

- `pancatz.design@gmail.com`
- [Instagram @pancatz.design](https://www.instagram.com/pancatz.design)
- [Facebook /pancatz](https://www.facebook.com/pancatz)
- Contact webhook URL and enquiry-category labels

---

© Pancatz. All rights reserved.
