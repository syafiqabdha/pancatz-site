# Pancatz 🐈‍⬛

> **Creative Hub + IT Services for modern teams**

Pancatz brings design, print, computer repair, and practical AI support into one clear service desk for people and small businesses that need useful work delivered fast.

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
- **Deployment:** Docker, Nginx

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

## 🐳 Deployment (Docker)

This project includes configuration files for containerized deployment using Docker and Nginx.

1. **Build and run using Docker Compose**:
   ```bash
   docker-compose up -d --build
   ```

2. **Coolify Support**:
   The project also contains a `docker-compose.coolify.yml` optimized for easy deployment on [Coolify](https://coolify.io/).

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
