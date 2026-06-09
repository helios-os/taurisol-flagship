# Helios WP-to-Next Deployment — Golden Path Checklist v1

**Use this for:** Any new project using WordPress (Cloudways) + Next.js (Vercel) + ACF + RankMath  
**Full reference:** `docs/HELIOS_HYBRID_PUBLISHER_AGENT_POSTMORTEM_v1.md`  
**Last updated:** 2026-06-09

---

## Phase 0 — WordPress Setup

- [ ] Clone fresh WP template on Cloudways (not a live client site)
- [ ] Delete ALL old brand content: posts, pages, pillar CPT entries, media files
- [ ] Delete "Hello World" demo post
- [ ] Verify REST API: `GET https://cms.example.com/wp-json/` → 200 JSON
- [ ] Verify ACF PRO active and REST exposure enabled (ACF → Settings → REST API)
- [ ] Verify RankMath installed

---

## Phase 1 — CMS Structure

- [ ] Create 1 Journal hub page — slug: `journal`
- [ ] Create 7 EN Pillar CPT entries — slugs must exactly match application constants
- [ ] Create 7 FI Pillar CPT entries — slugs must exactly match application constants
- [ ] Set `content_lang` on every pillar entry (`en` or `fi`)
- [ ] Link `translation_pillar` on each EN pillar → FI counterpart ID (and vice versa)
- [ ] Create 6+ EN article templates — set `content_lang = en`, `parent_pillar` (correct integer ID), `post_ingress`, `section_1.description`
- [ ] Create 6+ FI article templates — same for Finnish

**Verification:**
```
GET /wp-json/wp/v2/pillar?per_page=100&acf_format=standard
→ 14 entries, each with acf.pillar_data.content_lang

GET /wp-json/wp/v2/posts?per_page=100&acf_format=standard
→ 12+ entries, each with acf.blog_post.header.content_lang
```

---

## Phase 2 — Slug Audit (Do This Before Writing Any Code)

- [ ] Extract all WP pillar slugs from REST response
- [ ] Compare every slug against the application constants (`TAURISOL_CATEGORIES` or equivalent)
- [ ] Fix mismatches in WP Admin (change WP slug to match app — NOT the other way around)
- [ ] Document verified slug → ID mapping table

**Known gotcha:** Design EN pillar historically created with slug `design-en`. Must be `design`.

---

## Phase 3 — ACF Field Verification (Do This Before Writing Any Code)

Fetch a real post from REST and confirm actual field paths:

```bash
curl "https://cms.example.com/wp-json/wp/v2/posts?per_page=1&acf_format=standard" | jq .
```

- [ ] Confirm `acf.blog_post` key exists (not `acf.journal_post` or other assumed name)
- [ ] Confirm `acf.blog_post.header.content_lang` present and `"en"` or `"fi"`
- [ ] Confirm `acf.blog_post.header.parent_pillar` is an integer
- [ ] Confirm `acf.blog_post.sections.section_1` exists with `title` and `description` keys
- [ ] Confirm `post.content.rendered` is empty (it always is — body lives in ACF sections)

**If `acf` key is missing from response:** ACF REST exposure is not enabled. Go to ACF → Settings → REST API → enable.

---

## Phase 4 — RankMath SEO Population

- [ ] Generate WP-CLI commands for all pillar and article entries
- [ ] Run via Cloudways SSH terminal:

```bash
wp post meta update {POST_ID} rank_math_title "Category Name — Taurisol Journal"
wp post meta update {POST_ID} rank_math_description "150-character description"
wp post meta update {POST_ID} rank_math_focus_keyword "keyword phrase"
```

- [ ] Verify in WP Admin that RankMath metabox shows populated fields

---

## Phase 5 — Next.js Integration

- [ ] Set `WORDPRESS_API_URL=https://cms.example.com` in `.env.local`
- [ ] WordPress client: timeout 8000ms, never-throw, returns `null` on failure
- [ ] Article filter — both gates must be active:
  - `acf.blog_post.header.content_lang === lang`
  - `acf.blog_post.header.parent_pillar === match.id`
  - Fallback: `return false` (NEVER `return true`)
- [ ] Article body: built from `acf.blog_post.sections.section_1…section_15`, NOT `post.content.rendered`
- [ ] Language switching: `setLang()` + `router.push(altPath)` — not `setLang()` alone
- [ ] `generateStaticParams` lists all 7 EN + 7 FI category slugs
- [ ] `revalidate = 3600` on category pages
- [ ] `notFound()` for article routes when CMS returns null
- [ ] `next.config.ts` remotePatterns includes CMS hostname

---

## Phase 6 — Public Assets

- [ ] Verify all images in `public/images/` are git-tracked:

```bash
git ls-files apps/web/public/images/
```

- [ ] Stage and commit any missing images before pushing

---

## Phase 7 — Build

- [ ] Run local build: `npm run build` — must complete with zero errors and zero type errors
- [ ] Confirm route table includes all 14 category paths (7 EN + 7 FI)
- [ ] Confirm article routes show as `ƒ` (dynamic) not `●` (SSG)

---

## Phase 8 — Vercel Deploy

- [ ] Add `WORDPRESS_API_URL` to Vercel → Settings → Environment Variables → Production AND Preview
- [ ] Push to main (triggers deployment)
- [ ] After first deployment: trigger one manual redeploy (forces new env vars into all functions)
- [ ] Wait for deployment to complete

---

## Phase 9 — Smoke Test (Run After Every Production Deploy)

### Routes — all must return 200

| URL | Expected |
|-----|----------|
| `/` | Homepage visible |
| `/journal` | Journal index, 7 category cards |
| `/fi/journal` | Finnish journal index |
| `/journal/philosophy` | Articles or empty state |
| `/journal/place` | |
| `/journal/design` | |
| `/journal/energy` | |
| `/journal/rituals` | |
| `/journal/founder-notes` | |
| `/journal/development` | |
| `/fi/journal/filosofia` | Finnish version |
| `/fi/journal/paikka` | |
| `/fi/journal/design` | |
| `/fi/journal/energia` | |
| `/fi/journal/rituaalit` | |
| `/fi/journal/perustajan-muistiot` | |
| `/fi/journal/kehitys` | |

### Content checks

- [ ] No Markku / Sales Mind / Myyntiasenne content visible anywhere
- [ ] Hero images render (not broken img tags)
- [ ] Nav is readable over hero images
- [ ] Language switch on `/journal/philosophy` navigates to `/fi/journal/filosofia` (check URL changes)
- [ ] On mobile 390×844: entire open menu visible without vertical scroll
- [ ] On mobile 390×844: hero headline visible without scrolling

### SEO checks (inspect page source)

- [ ] `<title>` populated on category pages
- [ ] `<meta name="description">` non-empty
- [ ] `<link rel="canonical">` present
- [ ] `<link rel="alternate" hreflang="...">` present on all bilingual pages

---

## Phase 10 — Documentation

- [ ] Update `docs/CMS_CONNECTION_STATUS.md` with verified endpoint status
- [ ] Create development memo in `docs/development-memos/`
- [ ] Record verified pillar ID table in memo
- [ ] Commit final state

---

## Quick Reference — The 8 Things Most Likely To Go Wrong

| # | Problem | Symptom | Fix |
|---|---------|---------|-----|
| 1 | Wrong ACF field group name | Articles never appear | Fetch REST, inspect actual JSON keys before coding |
| 2 | Image not committed to Git | Broken image on production, works locally | `git ls-files public/images/` — add missing |
| 3 | Language switch without navigation | UI changes language label but URL stays wrong | `setLang()` + `router.push(altPath)` |
| 4 | Filter fallback `return true` | Foreign client content leaks into pages | Always `return false` when pillar not found |
| 5 | WP slug mismatch | Category shows 0 articles | Audit WP slugs vs app constants at setup |
| 6 | `post.content.rendered` empty | Article body empty | Use ACF sections, not `content.rendered` |
| 7 | Vercel env var not set | Build fetches wrong CMS or no CMS | Add to Vercel settings, redeploy |
| 8 | ISR stale after content change | New articles don't appear | Wait 1h or trigger manual redeploy |

---

## Category Slug Mapping Reference

| EN Slug | FI Slug | EN Route | FI Route |
|---------|---------|----------|----------|
| `philosophy` | `filosofia` | `/journal/philosophy` | `/fi/journal/filosofia` |
| `place` | `paikka` | `/journal/place` | `/fi/journal/paikka` |
| `design` | `design` | `/journal/design` | `/fi/journal/design` |
| `energy` | `energia` | `/journal/energy` | `/fi/journal/energia` |
| `rituals` | `rituaalit` | `/journal/rituals` | `/fi/journal/rituaalit` |
| `founder-notes` | `perustajan-muistiot` | `/journal/founder-notes` | `/fi/journal/perustajan-muistiot` |
| `development` | `kehitys` | `/journal/development` | `/fi/journal/kehitys` |
