# Pancatz.com — Website Pipeline

Pancatz: design, printing, photography, IT & AI services. Kelapa Sawit / Kulai, Johor.

## Kanban Pipeline (all done ✅)

```
t_de986cdc ──→ t_5bc0625c ──→ t_956e045d ──→ t_6fa7a554 ──→ t_c41a88a9
 (T1 done)      (T2 done)      (T3 done)      (T4 done)      (T5 done)
```

| Task | ID | Profile | Status | Description |
|------|-----|---------|--------|-------------|
| T1 | `t_de986cdc` | turing | ✅ | Research: audience, SEO, competitors |
| T2 | `t_5bc0625c` | john | ✅ | UI/UX design spec |
| T3 | `t_956e045d` | neo | ✅ | Build: Astro/Tailwind |
| T4 | `t_6fa7a554` | default | ✅ | Review: QA, mobile, content |
| T5 | `t_c41a88a9` | neo | ✅ | Fix: og:image, favicon, 404, dead component |

## Cron Pipeline (ongoing)

```
daily 9am MYT → watchdog → neo (review) → default (deploy)
```

| Component | Detail |
|-----------|--------|
| Cron job | `e83569ca2518` — daily at 9am MYT (`0 1 * * *`) |
| Watchdog | `~/.hermes/scripts/pancatz-watchdog.sh` |
| Daemon | Running (`hermes kanban daemon`) |
| Sentinel | `.kanban-watchdog-state` tracks last-seen commit |

**How it works:** Push to git → 9am cron detects new commits → spawns review for neo → if clean, spawns deploy for default (gated on review). Silent when no new commits.

## Tech Stack
- **Framework:** Astro 5 (static)
- **Runtime:** Node/npm (Bun unavailable, fallback)
- **CSS:** Tailwind v4 (Vite plugin)
- **Fonts:** DM Sans + Inter (Google Fonts)
- **Deployment:** Docker + nginx:1.27-alpine

## Site Map (5+1 pages)
- `/` — Home: hero, services preview, portfolio highlights, FAQs, CTA
- `/services` — 5 service cards (design, print, photo, computer repair, IT & AI)
- `/portfolio` — 6 work samples with Unsplash images
- `/about` — Mission, how we work, who we serve, coverage
- `/contact` — WhatsApp CTA, email, phone, Instagram, area
- `/404` — Custom not-found page

## Live Config
- **WhatsApp:** +601****2507
- **Email:** hello@pancatz.com
- **Instagram:** [@pancatz.design](https://www.instagram.com/pancatz.design)
- **Domain:** pancatz.com

## Coolify Deployment

### Files
- `Dockerfile` — nginx serving `dist/` with security headers
- `nginx.conf` — clean URLs, gzip, caching, 404 handling, CSP headers
- `docker-compose.yml` — Traefik labels for pancatz.com + www

### Deploy via Coolify (manual steps)

1. **Push to GitHub** — create repo and push:
   ```bash
   gh repo create pancatz-site --private --source=. --push
   ```

2. **Add to Coolify** — in Coolify dashboard:
   - New Service → GitHub → select `syafiqabdha/pancatz-site`
   - Docker Compose (auto-detects `docker-compose.yml`)
   - Domain: `pancatz.com` with `www.pancatz.com` redirect

3. **DNS** — point pancatz.com A record to your server IP (already on Cloudflare)

4. **Done** — Coolify builds + deploys on every git push. SSL via Traefik.

### Local test (optional)
```bash
docker build -t pancatz-site:local .
docker run -d -p 8089:80 --name pancatz-test pancatz-site:local
curl http://localhost:8089/
```

## Post-Launch Checklist
- [ ] Add real portfolio images (replace Unsplash placeholders)
- [ ] Verify all WhatsApp links work end-to-end
- [ ] Submit to Google Search Console
- [ ] Add analytics (Plausible/Umami recommended for privacy)
- [ ] Set up GitHub remote: `git remote add origin git@github.com:syafiqabdha/pancatz-site.git`

## Folder Structure
```
pancatz-site/
├── docs/              ← Pipeline docs (this file)
├── src/
│   ├── pages/         ← 6 Astro pages (+ 404)
│   ├── layouts/       ← Layout.astro (nav, footer, WA fab, OG meta)
│   ├── data/          ← site.ts (all content config)
│   ├── components/    ← Astro components
│   └── styles/        ← global.css (Tailwind + theme)
├── public/            ← favicon, og-image
├── dist/              ← Static build output
├── Dockerfile         ← nginx deployment
├── nginx.conf         ← Server config
├── docker-compose.yml ← Coolify stack
├── .kanban-watchdog-state
└── node_modules/
```
