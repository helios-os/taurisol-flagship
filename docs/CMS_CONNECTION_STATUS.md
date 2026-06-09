# CMS Connection Status

**Last verified:** 2026-06-09  
**CMS:** https://cms.taurisol.com  
**Frontend:** https://taurisol.com

---

## Current Status

| Item | Status |
|---|---|
| CMS reachable | ✅ Yes |
| REST API root `/wp-json/` | ✅ 200 |
| `/wp-json/wp/v2/posts` | ✅ 200 |
| `/wp-json/wp/v2/pages` | ✅ 200 |
| `/wp-json/wp/v2/pillar` | ✅ 200 |
| `WORDPRESS_API_URL` configured | ✅ Set in `.env.local` |
| API client (`lib/wordpress.ts`) | ✅ Created |
| Fallback content (`lib/fallback-content.ts`) | ✅ Created |
| Safe resolver (`lib/content.ts`) | ✅ Created |
| `next.config.ts` image domain | ✅ Added |
| Build passes | ✅ Verified |
| Live content merge active | ⏳ Phase 2 |

---

## Phase 1 Complete

The API layer is in place. The frontend fetches and renders static fallback content only. WordPress is reachable and all discovery endpoints are confirmed, but no live content is flowing to the page yet.

---

## Phase 2 Checklist

- [ ] Map `home-page-en` / `home-page-fi` ACF fields to `FallbackContent` shape
- [ ] Implement deep merge in `content.ts → getPageContent()`
- [ ] Wire `getPageContent()` into `app/page.tsx` server component
- [ ] Add `_fields` param to reduce API payload size
- [ ] Test with CMS offline to confirm fallback holds
- [ ] Add environment variable to Vercel production settings

---

## Environment Variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `WORDPRESS_API_URL` | Optional | `https://cms.taurisol.com` (hardcoded fallback in `wordpress.ts`) | Set to enable live CMS content |

The `WORDPRESS_API_URL` variable must also be added to:
- Vercel project settings → Environment Variables → Production + Preview
- Any CI/CD pipeline that runs `npm run build`

Without the variable the site builds and renders static content — no error is thrown.

---

## Fallback Behaviour

If the CMS is unavailable at build time, the site:

1. Renders all static content from `lib/i18n.ts` (unchanged)
2. Logs nothing to the user
3. Completes the build successfully
4. Deploys the static fallback to production

This means a CMS outage is invisible to end users.
