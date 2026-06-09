# WordPress API Integration Report

**Project:** taurisol-flagship  
**Phase:** 1 — API Readiness  
**Date:** 2026-06-09  
**Author:** Claude Code (Anthropic)

---

## Summary

Phase 1 establishes the headless WordPress connection layer between the Next.js frontend (`apps/web`) and the CMS at `https://cms.taurisol.com`. All endpoints are live and responding. Static fallback content remains active — no page content has been replaced by CMS data yet (Phase 2 scope).

---

## Endpoints Verified

| Endpoint | Status | Notes |
|---|---|---|
| `GET /wp-json/` | ✅ 200 | WP REST API root — namespace discovery |
| `GET /wp-json/wp/v2/posts` | ✅ 200 | Standard WP posts |
| `GET /wp-json/wp/v2/pages` | ✅ 200 | Pages including `home-page-en` (ID 156), `home-page-fi` (ID 252) |
| `GET /wp-json/wp/v2/pillar` | ✅ 200 | Custom post type with ACF `pillar_data` group |

All endpoints returned HTTP 200 during Phase 1 discovery (2026-06-09).

---

## Files Created

| File | Purpose |
|---|---|
| `apps/web/.env.local` | Environment variable `WORDPRESS_API_URL=https://cms.taurisol.com` |
| `apps/web/lib/wordpress.ts` | Typed WP REST API client. Safe fetch, 5s timeout, no-throw |
| `apps/web/lib/fallback-content.ts` | Re-exports static `i18n.ts` content as typed fallback |
| `apps/web/lib/content.ts` | Safe resolver: load fallback → try WP → merge → return |
| `apps/web/next.config.ts` | Added `cms.taurisol.com` to `images.remotePatterns` |

---

## Architecture

```
Build time
  ↓
content.ts: getPageContent()
  ├── Always: load fallbackContent from fallback-content.ts  (never fails)
  ├── If WORDPRESS_API_URL set:
  │     isWordPressReachable() → 5s timeout
  │     ├── Reachable:   fetch WP data → merge → return merged content
  │     └── Unreachable: return fallback silently
  └── If WORDPRESS_API_URL absent: return fallback silently
```

### Resilience guarantees

- `WORDPRESS_API_URL` absent → fallback only, no network calls
- CMS returns non-200 → fallback, no error logged to user
- CMS times out (>5s) → fallback, build continues
- CMS returns malformed JSON → fallback, `try/catch` swallows error
- Missing ACF fields → Phase 2 merge code must treat all WP fields as optional

---

## CMS Content Model

The WordPress CMS uses **ACF PRO** (Advanced Custom Fields) with the following key structures:

### Pages (post type: `page`)

- `home-page-en` (slug, ID 156) — English homepage content
- `home-page-fi` (slug, ID 252) — Finnish homepage content

ACF field groups defined in `docs/WORDPRESS_CONTENT_MODEL.md`:
`taurisol_hero`, `taurisol_problem`, `taurisol_outcome`, `taurisol_pillars`,
`taurisol_why`, `taurisol_location`, `taurisol_winters`, `taurisol_trust`,
`taurisol_audience`, `taurisol_one`, `taurisol_navigation`

### Pillars (post type: `pillar`)

Custom post type. Each pillar has an ACF group `pillar_data`:

| ACF field | Type | Notes |
|---|---|---|
| `content_lang` | `"en" \| "fi"` | Language discriminator |
| `translation_pillar` | `number` | ID of the translated counterpart |
| `pillar_intro` | `string` | Multi-paragraph intro text |
| `pillar_expert_view` | `string` | Expert quote block |
| `seo_content` | `object` | SEO title, description, robots, og_image, canonical |

---

## Phase 2 Scope

Content merge not yet implemented. Phase 2 tasks:

1. Implement `fetchPageBySlug('home-page-en')` call in `content.ts`
2. Map ACF fields → `FallbackContent` shape (see `WORDPRESS_CONTENT_MODEL.md`)
3. Deep-merge WP data over fallback keys where WP data is non-empty
4. Return `cms.merged = true` from `getPageContent()`
5. Wire `getPageContent()` into `app/page.tsx` as a server component fetch
6. Implement ISR revalidation via WP webhook (Phase 3)

---

## Build Status

Phase 1 build: **PASS** (see `npm run build` output).  
Static fallback content is served. CMS layer is idle but importable.
