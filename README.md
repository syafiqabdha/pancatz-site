<div align="center">
  <img src="public/pancatz-logo.webp" alt="Pancatz Logo" width="120" height="120" style="border-radius: 20%; margin-bottom: 1rem;" />
  
  <h1>Pancatz 🐈‍⬛</h1>
  <p><strong>Creative Hub + IT Services for modern teams</strong></p>
  
  [![Deploy Status](https://img.shields.io/github/actions/workflow/status/syafiqabdha/pancatz-site/docker-publish.yml?label=Docker%20Build&style=flat-square)](https://github.com/syafiqabdha/pancatz-site/actions)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel&style=flat-square)](https://pancatz-site.vercel.app)
  [![Astro](https://img.shields.io/badge/Astro-v6-ff5a03?logo=astro&style=flat-square)](https://astro.build/)
  [![Astryx](https://img.shields.io/badge/Astryx-Design_System-0a7f5a?style=flat-square)](https://github.com/astryxdesign)

  <p>
    <a href="https://pancatz-site.vercel.app"><b>View Live Site</b></a> •
    <a href="#-getting-started"><b>Getting Started</b></a> •
    <a href="CONTRIBUTING.md"><b>Contributing</b></a>
  </p>
</div>

<br/>

Pancatz brings design, print, computer repair, and practical AI support into one clear service desk for people and small businesses that need useful work delivered fast.

---

## ✨ Features

- **🎨 Creative Hub**: Design & Brand Assets, Print Production.
- **💻 IT Services**: Computer Repair & Maintenance, AI & Digital Workflow Support.
- **⚡ Fast Quote Flow**: Clear scope via WhatsApp before work starts.
- **🌐 Online-first Service**: Operating with appointment-based support.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) (Static Site Generation)
- **UI & Components:** [Astryx Design System](https://github.com/astryxdesign) + React
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment:** Vercel (Primary) / Docker + Nginx (Self-Hosted)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) `>=22.12.0`
- npm (or your preferred package manager)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/syafiqabdha/pancatz-site.git
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
**Live URL:** [https://pancatz-site.vercel.app](https://pancatz-site.vercel.app)

### Docker & Coolify (Self-Hosted)
A Docker image is automatically built and pushed to the GitHub Container Registry via GitHub Actions.

Pull the latest production image on any server:
```bash
docker pull ghcr.io/syafiqabdha/pancatz-site:master
```

Or build and run it locally using Docker Compose:
```bash
docker-compose up -d --build
```
*(A `docker-compose.coolify.yml` is included for easy deployment on [Coolify](https://coolify.io/).)*

## 🤖 AI Agent & Developer Handover

We strictly use the **Astryx Design System**. 

Before contributing, please read [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on how to extend the site using the Astryx component workflow. This outlines the commands necessary for component generation, design tokens, and avoiding raw HTML/Tailwind practices.

## 📁 Project Structure

```text
pancatz-site/
├── public/                 # Static assets (images, fonts, etc.)
├── src/                    # Source code
│   ├── assets/             # Internal assets
│   ├── components/         # Reusable React/Astro components
│   ├── data/               # Site data, navigation, and service details (site.ts)
│   ├── layouts/            # Astro layout components (Layout.astro)
│   ├── pages/              # Astro pages (index, about, services, contact, 404)
│   └── styles/             # Global CSS and Astryx Theme configurations
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
<div align="center">
  <i>© Pancatz. All rights reserved.</i>
</div>
