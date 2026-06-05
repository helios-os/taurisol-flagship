# VERCEL_DEPLOYMENT

Deployment guide for taurisol-flagship on Vercel.

---

## Prerequisites

- Vercel account linked to GitHub
- GitHub repo: `https://github.com/helios-os/taurisol-flagship`
- Node.js 20.x (matches development environment)

---

## Project Settings

| Setting | Value |
|---------|-------|
| Framework preset | Next.js |
| Root directory | `apps/web` |
| Build command | `npm run build` |
| Output directory | `.next` (auto-detected) |
| Install command | `npm install` |
| Node version | 20.x |

**Important:** Set **Root Directory** to `apps/web` in Vercel project settings. The monorepo root does not contain a Next.js app — only `apps/web` does.

---

## Deployment Steps

### 1. Connect repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `helios-os/taurisol-flagship`
3. Set **Root Directory** → `apps/web`
4. Framework is auto-detected as Next.js

### 2. Environment variables

No environment variables required for v1 (static build, no WP integration).

When WordPress integration is added (Phase 2), add:

| Variable | Description |
|---------|-------------|
| `NEXT_PUBLIC_WP_URL` | WordPress REST API base URL |
| `WP_APPLICATION_PASSWORD` | WP Application Password for authenticated reads (if needed) |

### 3. Deploy

Click **Deploy**. First deploy takes 2–3 minutes.

---

## Custom Domain

1. In Vercel project → Settings → Domains
2. Add `taurisol.com` (or staging domain)
3. Configure DNS: CNAME → `cname.vercel-dns.com`

---

## ISR / Revalidation (Phase 2)

When WordPress is connected:
- Set `revalidate: 3600` on page fetch (1-hour cache)
- Add Vercel webhook endpoint for on-demand revalidation triggered by WP publish events

---

## Build Output Verification

After successful deploy:

| Check | Expected |
|-------|----------|
| Home page loads | ✓ |
| Hero image visible | ✓ |
| Language switcher (EN/FI) | ✓ |
| Anchor navigation | ✓ |
| CTAs → one.taurisol.com | ✓ |
| Mobile nav overlay | ✓ |
| Core Web Vitals | LCP < 2.5s target |

---

## Performance Notes

- Google Fonts loaded via `next/font/google` — preloaded, no render-blocking
- Hero image served from `/images/` via Next.js Image Optimization
- All section images use `loading="lazy"` except hero (`priority`)
- No client-side data fetching in v1 — fully static build

---

## Rollback

Vercel maintains deployment history. To rollback:
1. Vercel dashboard → Deployments
2. Select previous deployment → Promote to Production
