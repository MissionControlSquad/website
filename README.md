# AgentCenter Website

The marketing website and blog for [AgentCenter.cloud](https://agentcenter.cloud) — Mission Control for your OpenClaw AI agents.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Runtime:** Cloudflare Pages + Pages Functions (CF Workers)
- **Auth:** BuildBase SDK (`@buildbase/sdk`) — OAuth2 + workspace management
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Blog:** MDX via next-mdx-remote + gray-matter
- **Deployment:** Cloudflare Pages (via Wrangler)

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Wrangler CLI (`npm i -g wrangler`) for local CF Functions dev

### Setup

```bash
git clone https://github.com/MissionControlSquad/website.git
cd website
npm install
cp .dev.vars.example .dev.vars   # fill in your values (see below)
npm run dev                      # Next.js only (no CF Functions)
# OR
wrangler pages dev               # Next.js + CF Functions locally
```

### Available Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Start Next.js dev server (port 3000)             |
| `npm run build`      | Production build + sitemap generation            |
| `npm run start`      | Serve production build                           |
| `npm run lint`       | Run ESLint                                       |
| `npm run format`     | Format with Prettier                             |
| `wrangler pages dev` | Local dev with CF Functions (auth, tenant, etc.) |

## Environment Variables

Copy `.dev.vars.example` to `.dev.vars` for local development. All variables are required in production unless marked optional.

### BuildBase (OAuth + Workspace)

These come from your BuildBase dashboard → Settings → OAuth.

| Variable                      | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| `SAAS_SERVER_URL`             | BuildBase API URL (`https://api.console.buildbase.app`)    |
| `SAAS_ORG_ID`                 | Your BuildBase organisation ID                             |
| `SAAS_CLIENT_ID`              | OAuth client ID                                            |
| `SAAS_CLIENT_SECRET`          | OAuth client secret (server-side only)                     |
| `NEXT_PUBLIC_SAAS_SERVER_URL` | Same as `SAAS_SERVER_URL` (exposed to browser)             |
| `NEXT_PUBLIC_SAAS_ORG_ID`     | Same as `SAAS_ORG_ID` (exposed to browser)                 |
| `NEXT_PUBLIC_SAAS_CLIENT_ID`  | Same as `SAAS_CLIENT_ID` (exposed to browser)              |
| `NEXT_PUBLIC_PLAN_GROUP_SLUG` | BuildBase plan group slug (e.g. `main`)                    |
| `NEXT_PUBLIC_APP_URL`         | Public URL of this site (e.g. `https://agentcenter.cloud`) |

### JWT Signing

| Variable        | Description                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| `SYSTEM_SECRET` | HMAC-SHA256 secret for signing internal JWTs — **required, no fallback**. Generate: `openssl rand -base64 32` |

### Infra API

| Variable        | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `INFRA_API_URL` | URL of the MissionControlSquad-infra dashboard (e.g. `https://admin.agentcenter.cloud`)                             |
| `INFRA_API_KEY` | Shared secret for infra API calls — must match `API_KEY` in infra `.env.local`. Generate: `openssl rand -base64 32` |

### SEO (optional)

| Variable                               | Description                                 |
| -------------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification meta tag |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | Bing Webmaster verification                 |
| `NEXT_PUBLIC_YANDEX_VERIFICATION`      | Yandex verification                         |
| `NEXT_PUBLIC_BAIDU_SITE_VERIFICATION`  | Baidu verification                          |

## Cloudflare Pages Functions

All server-side logic lives in `functions/` and runs as CF Workers at the edge.

```
functions/
├── api/
│   ├── auth/
│   │   ├── token.ts          # POST — exchanges BuildBase OAuth code for session + JWT
│   │   ├── session.ts        # GET  — reads HttpOnly session cookie for SDK restore
│   │   ├── logout.ts         # POST — clears session cookie
│   │   └── workspace-token.ts# POST — issues workspace-scoped JWT (requires valid Bearer token)
│   ├── tenant/
│   │   ├── status.ts         # GET  — checks/provisions tenant via infra API
│   │   └── retry.ts          # POST — retries a failed tenant provisioning
│   ├── events.ts             # POST — receives BuildBase SDK events (workspace:changed, etc.)
│   └── _middleware.ts        # CORS + auth middleware for all /api/* routes
└── lib/
    └── jwt.ts                # HMAC-SHA256 JWT (Web Crypto API, CF Workers compatible)
```

### Auth flow

1. User signs in via BuildBase OAuth → `/api/auth/token` exchanges the code, sets a `bb-session-id` HttpOnly cookie, returns a signed JWT stored in `localStorage`
2. On workspace switch → `/api/auth/workspace-token` issues a workspace-scoped JWT (requires the existing JWT as `Authorization: Bearer <token>`)
3. Dashboard calls `/api/tenant/status?planName=<plan>` with the JWT to get or provision the workspace

### Tenant provisioning

- `/api/tenant/status` looks up the user's tenant via the infra API (by email + plan type)
- Hosted plan: waits for Docker container to be ready (~1–5 min), polls with `provisioningStatus`
- Self-Hosting plan: infra creates a registry entry + issues a license key immediately (`ready: true` on first call)
- Plan type is determined by `planName` from the BuildBase subscription — only `"Self-Hosting"` maps to `CLIENT_TYPE.SELF_HOSTED`

## Push Notifications

`public/push-sw.js` is a service worker that handles browser push notifications. The BuildBase SDK auto-registers it at `/push-sw.js`. No additional config is needed — VAPID keys are managed by BuildBase server-side.

To subscribe a user to push:

```tsx
import { usePushNotifications } from "@buildbase/sdk/react";
const { subscribe, isSubscribed } = usePushNotifications();
```

## Folder Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Authenticated dashboard (BuildBase + tenant status)
│   ├── blogs/              # Blog listing + MDX post pages
│   ├── pricing/            # Pricing page (BuildBase checkout)
│   └── ...
├── components/
│   ├── providers/
│   │   └── BuildbaseProvider.tsx  # SaaSOSProvider wrapper + auth callbacks
│   ├── sections/           # Page sections (Pricing, Hero, etc.)
│   └── Navbar.tsx
├── content/
│   └── blog/               # MDX blog posts
├── functions/              # Cloudflare Pages Functions (CF Workers)
├── lib/
│   ├── constants.ts        # Shared constants (plan names, client types, provisioning states)
│   ├── hooks/
│   │   └── useWorkspaceSubscription.ts  # BuildBase subscription state hook
│   └── utils.ts
├── public/
│   └── push-sw.js          # Push notification service worker
├── .dev.vars.example       # Environment variable template
└── package.json
```

## Key Constants (`lib/constants.ts`)

| Constant                           | Value                     | Purpose                                             |
| ---------------------------------- | ------------------------- | --------------------------------------------------- |
| `SELF_HOST_PLAN_NAME`              | `"Self-Hosting"`          | BuildBase plan name that maps to self-hosted type   |
| `CLIENT_TYPE.HOSTED`               | `"hosted"`                | Hosted (Docker) deployment type                     |
| `CLIENT_TYPE.SELF_HOSTED`          | `"self-hosted"`           | Self-managed deployment type                        |
| `PROVISIONING_STATUS.PROVISIONING` | `"provisioning"`          | Container being created                             |
| `PROVISIONING_STATUS.ACTIVE`       | `"active"`                | Tenant ready                                        |
| `PROVISIONING_STATUS.FAILED`       | `"failed"`                | Provisioning timed out                              |
| `HOSTED_APP_DOMAIN`                | `"app.agentcenter.cloud"` | Base domain for hosted tenants                      |
| `TENANT_MAX_RETRY_ATTEMPTS`        | `3`                       | Max provisioning retries before manual intervention |

## Adding Blog Posts

Posts live in `content/blog/` as `.mdx` files:

```mdx
---
title: "Your Post Title"
description: "One-line SEO description."
date: "2026-02-20"
author: "AgentCenter Team"
tags: ["tag1", "tag2"]
---

Content here. MDX supports JSX components.
```

Use kebab-case filenames that match the URL: `my-post-title.mdx` → `/blogs/my-post-title`

Dates must be unique (no two posts on the same day). Future-dated posts are hidden from the site and sitemap until their date passes.

## License

Proprietary. © Jagodana LLC.
