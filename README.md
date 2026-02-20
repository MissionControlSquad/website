# AgentCenter Website

The marketing website and blog for [AgentCenter.cloud](https://agentcenter.cloud) — Mission Control for your OpenClaw AI agents.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS (`app/globals.css`)
- **Blog:** MDX via [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) + [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **SEO:** [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) + [next-seo](https://github.com/garmeeh/next-seo)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Linting:** ESLint + Prettier (enforced via Husky pre-commit hook)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20+)
- npm

### Setup

```bash
git clone https://github.com/MissionControlSquad/website.git
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start development server                |
| `npm run build`        | Production build (+ sitemap generation) |
| `npm run start`        | Serve production build                  |
| `npm run lint`         | Run ESLint                              |
| `npm run format`       | Format code with Prettier               |
| `npm run format:check` | Check formatting without writing        |

## Folder Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   ├── blogs/              # Blog listing + [slug] detail pages
│   ├── features/           # Features page
│   ├── pricing/            # Pricing page
│   ├── about/              # About page
│   ├── docs/               # Documentation pages
│   │   ├── getting-started/
│   │   ├── how-agents-work/
│   │   ├── api-reference/
│   │   └── roadmap/
│   ├── legal/              # Privacy policy + terms
│   ├── thank-you/          # Post-signup thank you page
│   └── api/                # API routes (early-access signup)
├── components/             # Shared React components
│   ├── ui/                 # Base UI components (Container, etc.)
│   ├── sections/           # Page section components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── icons.tsx
├── content/
│   └── blog/               # MDX blog posts
├── lib/                    # Utilities
│   ├── blog.ts             # Blog post loader (MDX + gray-matter)
│   ├── constants.ts        # Site config, OG image settings
│   └── utils.ts            # Shared helpers
├── public/                 # Static assets (favicons, images, robots.txt)
├── plan/                   # SEO strategy and blog planning docs
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Adding Blog Posts

Blog posts live in `content/blog/` as `.mdx` files. Each file needs frontmatter:

```mdx
---
title: "Your Post Title"
description: "A short description for SEO and previews."
date: "2026-02-20"
author: "Mission Control Team"
tags: ["tag1", "tag2", "tag3"]
---

Your markdown content here. MDX supports JSX components too.
```

### Blog file naming

Use kebab-case slugs that match the URL: `my-post-title.mdx` → `/blogs/my-post-title`

### How it works

1. `lib/blog.ts` reads all `.mdx` files from `content/blog/`
2. Frontmatter is parsed with `gray-matter`
3. Content is rendered with `next-mdx-remote`
4. Posts are sorted by date (newest first)
5. Reading time is auto-calculated (~200 words/min)

## Configuration

- **next.config.ts** — image optimization, security headers, redirects, compression
- **next-sitemap.config.js** — sitemap generation (runs on `postbuild`)
- **tsconfig.json** — path alias `@/*` maps to project root

## License

Proprietary. © Jagodana LLC.
