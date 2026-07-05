# Pancatz 🐈‍⬛

> **Creative Hub + IT Services for modern teams**

Pancatz brings design, print, computer repair, and practical AI support into one clear service desk for people and small businesses that need useful work delivered fast.

🌍 **Live Site:** [pancatz-site.vercel.app](https://pancatz-site.vercel.app)

---

## ✨ Features

- **Creative Hub**: Design & Brand Assets, Print Production.
- **IT Services**: Computer Repair & Maintenance, AI & Digital Workflow Support.
- **Fast Quote Flow**: Clear scope via WhatsApp before work starts.
- **Online-first Service**: Operating with appointment-based support.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **UI & Components:** [Astryx Design System](https://github.com/astryxdesign) + React
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment:** Vercel (Primary), Docker (GHCR), Nginx

## 🤖 AI Agent & Developer Handover
Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on how to extend the site using the Astryx component workflow. This outlines the commands necessary for component generation and design tokens.

## 🚀 Getting Started

### Prerequisites

- Node.js `>=22.12.0`
- npm (or your preferred package manager)

### Installation & Local Development

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd pancatz-site
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   *The site will be available locally at `http://localhost:4321`.*

4. **Build for production**:
   ```bash
   npm run build
   ```
   *The output will be generated in the `./dist` directory.*

## 🌍 Deployments

### Vercel (Recommended)
The site is automatically deployed to Vercel on every push to the `master` branch.
**URL:** [https://pancatz-site.vercel.app](https://pancatz-site.vercel.app)

### Docker & Coolify (Self-Hosted)
A Docker image is automatically built and pushed to the GitHub Container Registry via GitHub Actions.
You can pull the latest production image on any server:
```bash
docker pull ghcr.io/syafiqabdha/pancatz-site:master
```

You can also build and run it locally using Docker Compose:
```bash
docker-compose up -d --build
```
*(A `docker-compose.coolify.yml` is included for easy deployment on [Coolify](https://coolify.io/).)*

## 📁 Project Structure

```text
pancatz-site/
├── public/                 # Static assets (images, fonts, etc.)
├── src/                    # Source code
│   ├── assets/             # Internal assets
│   ├── data/               # Site data, navigation, and service details (site.ts)
│   ├── layouts/            # Astro layout components (Layout.astro)
│   ├── pages/              # Astro pages (index, about, services, contact, 404)
│   └── styles/             # Global CSS and Tailwind directives
├── Dockerfile              # Docker configuration for serving static files
├── docker-compose*.yml     # Docker Compose configurations
├── nginx.conf              # Nginx server configuration
├── astro.config.mjs        # Astro configuration
└── package.json            # Dependencies and scripts
```

## 📬 Contact & Socials

- **WhatsApp:** +60 13-757 2507
- **Email:** pancatz.design@gmail.com
- **Instagram:** [@pancatz.design](https://www.instagram.com/pancatz.design)
- **Facebook:** [pancatz](https://www.facebook.com/pancatz)

---
*© Pancatz. All rights reserved.*
