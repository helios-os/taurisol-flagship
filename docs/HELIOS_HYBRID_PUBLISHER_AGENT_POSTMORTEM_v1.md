# Helios Hybrid Publisher Agent — Post-Mortem & Automation Blueprint v1

**Project:** Taurisol.com  
**Date:** 2026-06-09  
**Author:** Helios Development (AI-assisted, reviewed by Markku Tauriainen)  
**Status:** Production live — post-mortem written after first full integration sprint

---

## 1. Executive Summary

### What Was Built

**Frontend:** `taurisol.com` — Next.js 15.3 App Router site deployed on Vercel. The homepage is fully static, served from a hardcoded i18n content object (`lib/i18n.ts`). The Journal section is CMS-driven: category index pages use ISR (revalidate 1h), article detail pages are dynamic server-rendered.

**CMS:** `cms.taurisol.com` — WordPress on Cloudways, cloned from an existing client site (`wp.markkutauriainen.com`). ACF PRO for metaboxes. RankMath SEO plugin. Standard Posts for articles. A custom post type (`pillar`) for category hub entries. REST API exposed at `/wp-json/wp/v2/`.

**Journal Hub:** A 3-level content architecture:
- Level 1: `/journal` and `/fi/journal` — static index listing all 7 categories
- Level 2: `/journal/[categorySlug]` and `/fi/journal/[categorySlug]` — SSG category pages, ISR 1h, pulling pillar intro and filtered articles from WordPress
- Level 3: `/journal/[categorySlug]/[articleSlug]` and equivalents — dynamic routes, fetching article from WordPress by slug

**Multilingual:** English (`/journal/...`) and Finnish (`/fi/journal/...`) fully parallel. No WPML. Language determined by ACF field `content_lang` on each post. Language switching implemented in the Nav via `router.push()` with a slug mapping table.

**Fallback:** Every API call is wrapped in try/catch. On CMS failure, the page renders with empty article state. The build never throws on CMS unavailability.

### What Took the Entire Day

The CMS was cloned from a working site. The assumption was that the ACF field structure was documented and consistent. It was not. The field group name in the clone was `blog_post`, not `journal_post` as initially assumed. This single wrong assumption blocked article rendering for the entire session. Additionally:

- A hero image was present in `public/images/` locally but had never been committed to Git, so production had no image.
- Language switching changed React display state but did not navigate to the equivalent route in the other language.
- A fallback `return true` in the article filter leaked third-party posts (Markku Tauriainen's blog content) into Journal category pages when the pillar lookup failed.
- The WP slug for the Design pillar (`design-en`) did not match the application slug (`design`), requiring a title-based fallback match.
- `post.content.rendered` is always empty for these posts — the body is entirely in ACF section fields.

This report documents all of these precisely so they never happen again.

---

## 2. Final Architecture

### Frontend

| Item | Value |
|------|-------|
| Framework | Next.js 15.3.8, App Router |
| Deployment | Vercel |
| Rendering | Static (homepage), SSG+ISR (Journal category), Dynamic (article detail) |
| ISR interval | 3600s (1 hour) |
| Language | EN default, FI via `/fi/` prefix |

**Route table:**

| Route | File | Rendering | Data source |
|-------|------|-----------|-------------|
| `/` | `app/page.tsx` | Static | `lib/i18n.ts` (no CMS) |
| `/journal` | `app/journal/page.tsx` | Static ISR | `getAllCategories()` (pure static) |
| `/fi/journal` | `app/fi/journal/page.tsx` | Static ISR | same |
| `/journal/[categorySlug]` | `app/journal/[categorySlug]/page.tsx` | SSG+ISR 1h | `getCategoryPageData(slug, "en")` |
| `/fi/journal/[categorySlug]` | `app/fi/journal/[categorySlug]/page.tsx` | SSG+ISR 1h | `getCategoryPageData(slug, "fi")` |
| `/journal/[categorySlug]/[articleSlug]` | `app/journal/[categorySlug]/[articleSlug]/page.tsx` | Dynamic (ƒ) | `getArticleData(catSlug, artSlug, "en")` |
| `/fi/journal/[categorySlug]/[articleSlug]` | `app/fi/journal/[categorySlug]/[articleSlug]/page.tsx` | Dynamic (ƒ) | `getArticleData(catSlug, artSlug, "fi")` |

**Key data files:**

| File | Purpose |
|------|---------|
| `lib/journal.ts` | Full Journal data layer — filtering, mapping, all 3 levels |
| `lib/wordpress.ts` | WordPress REST client — all fetch calls, timeouts, no-throw |
| `lib/i18n.ts` | Static homepage content object (not CMS-driven) |

### CMS

| Item | Value |
|------|-------|
| WordPress version | Standard (latest at Cloudways) |
| Hosting | Cloudways managed |
| ACF | Advanced Custom Fields PRO |
| SEO plugin | RankMath SEO Pro |
| Post types | `post` (articles), `pillar` (CPT, category hubs) |
| REST API | `/wp-json/wp/v2/posts`, `/wp-json/wp/v2/pillar` |
| ACF in REST | Enabled via ACF PRO (`acf_format=standard`) |

### Integration contract

The frontend fetches from the CMS at request time (category and article pages). It never fetches at the homepage level. The CMS must be reachable or the page silently falls back to an empty article list.

---

## 3. Required WordPress Template State ("Blanco CMS")

This section defines what a cloned WordPress CMS must look like **before** any integration work begins. This is the "Blanco CMS" target — zero old content, zero old brand, correct structure.

### 3.1 What Must Exist

| Item | Count | Notes |
|------|-------|-------|
| Journal hub page | 1 | Standard WordPress page, slug: `journal` or similar. Used for hero/index intro only. |
| EN Pillar CPT entries | 7 | One per category. English `content_lang`. Slugs matching category EN slugs exactly. |
| FI Pillar CPT entries | 7 | One per category. Finnish `content_lang`. Slugs matching category FI slugs exactly. |
| EN article post templates | 6 minimum | Standard posts. `content_lang = en`. `parent_pillar` pointing to an EN pillar ID. |
| FI article post templates | 6 minimum | Standard posts. `content_lang = fi`. `parent_pillar` pointing to a FI pillar ID. |
| ACF field groups | Installed | `blog_post` group on posts, `pillar_data` group on pillar CPT. See Section 4. |
| RankMath | Installed | All SEO fields empty and ready. |

### 3.2 What Must NOT Exist

- No posts, pages, or pillar entries from the previous client brand (Markku Tauriainen / Sales Mind / Myyntiasenne)
- No images from the previous brand in the Media Library
- No cloned slugs from the previous site that conflict with the new project
- No "Hello World" demo posts
- No page builder content (e.g., WPBakery, Elementor) if the CMS was cloned from a site using them

### 3.3 Pillar Slug Rules

The WP slug for each pillar entry **must exactly match** the slug used in the Next.js `TAURISOL_CATEGORIES` constant — OR the title must match for fallback detection to work. Mismatches cause silent empty-state failures. The Design category exposed this: WP slug was `design-en`, application expected `design`. This required a title-based fallback match which is fragile and should not be the primary mechanism.

**Rule: Always verify WP slugs against application constants before running the first build.**

### 3.4 Translation Relations

Each EN pillar entry should reference its FI counterpart via `acf.pillar_data.translation_pillar` (integer post ID). Same for posts: `acf.blog_post.header.translation_post`. These relations are not currently used by the Next.js integration but are required for any future bilingual content editing workflow.

---

## 4. ACF Field Mapping

**Critical note:** The `WORDPRESS_CONTENT_MODEL.md` in this repo documents a **planned** ACF schema (`taurisol_page`, `taurisol_hero`, etc.) that was **never implemented**. The actual CMS was cloned from Markku Tauriainen's site and uses a different field group: `blog_post`. Do not follow the planned schema doc for Journal integration purposes.

The following paths were verified against the live REST API at `https://cms.taurisol.com` on 2026-06-09.

### 4.1 Pillar CPT — `/wp-json/wp/v2/pillar?acf_format=standard`

```json
{
  "id": 406,
  "slug": "philosophy",
  "title": { "rendered": "Philosophy" },
  "acf": {
    "pillar_data": {
      "content_lang": "en",
      "pillar_intro": "The thinking behind Taurisol...",
      "pillar_expert_view": "...",
      "translation_pillar": 407
    }
  }
}
```

| ACF Path | Type | Purpose |
|----------|------|---------|
| `acf.pillar_data.content_lang` | String `"en"` or `"fi"` | Language filter |
| `acf.pillar_data.pillar_intro` | String | Displayed below category title on category page |
| `acf.pillar_data.pillar_expert_view` | String | Secondary intro text (currently not displayed in UI) |
| `acf.pillar_data.translation_pillar` | Integer (post ID) | Reference to counterpart pillar in other language |

### 4.2 Standard Post (Article) — `/wp-json/wp/v2/posts?acf_format=standard`

```json
{
  "id": 901,
  "slug": "why-montefrio",
  "title": { "rendered": "Why Montefr&#237;o?" },
  "content": { "rendered": "" },
  "acf": {
    "blog_post": {
      "header": {
        "content_lang": "en",
        "parent_pillar": 600,
        "post_ingress": "A short subtitle shown in article cards and at the top of the article.",
        "post_intro": "Opening paragraph(s) of the article body..."
      },
      "sections": {
        "section_1": {
          "title": "The First Section Heading",
          "description": "Section body paragraph text...",
          "image": null
        },
        "section_2": { "title": "", "description": "", "image": null },
        "section_3": { ... },
        "section_15": { "title": "", "description": "", "image": null }
      }
    }
  }
}
```

| ACF Path | Type | Purpose |
|----------|------|---------|
| `acf.blog_post.header.content_lang` | String `"en"` or `"fi"` | **Primary language gate** — articles missing this field are ignored |
| `acf.blog_post.header.parent_pillar` | Integer (post ID) | **Category gate** — must match the pillar ID for this category |
| `acf.blog_post.header.post_ingress` | String | Short subtitle shown in article card and article header |
| `acf.blog_post.header.post_intro` | String | Opening body paragraphs (rendered before named sections) |
| `acf.blog_post.sections.section_1` … `section_15` | Object `{title, description, image}` | Article body — sections with empty title AND empty description are skipped |
| `content.rendered` | String | **Always empty.** Never use this for article body. |

### 4.3 SEO / RankMath Fields

RankMath stores SEO data in WordPress post meta, not in the ACF JSON. These fields are **not** returned in the standard REST response. They must be accessed via WP-CLI, direct DB, or a custom REST endpoint.

| Meta key | Value |
|----------|-------|
| `rank_math_title` | SEO page title |
| `rank_math_description` | Meta description |
| `rank_math_focus_keyword` | Primary focus keyword |
| `rank_math_canonical_url` | Canonical override (if set) |
| `rank_math_og_title` | OpenGraph title (if different from page title) |
| `rank_math_og_description` | OpenGraph description |

### 4.4 Known Pillar IDs (Taurisol — verified 2026-06-09)

| Category | EN Slug | EN Pillar ID | FI Slug | FI Pillar ID |
|----------|---------|-------------|---------|-------------|
| Philosophy | `philosophy` | 406 | `filosofia` | 407 |
| Place | `place` | 600 | `paikka` | 588 |
| Design | `design` | 639 | `design` | 636 |
| Energy | `energy` | 643 | `energia` | 641 |
| Rituals | `rituals` | 647 | `rituaalit` | 645 |
| Founder Notes | `founder-notes` | 855 | `perustajan-muistiot` | 854 |
| Development | `development` | 857 | `kehitys` | 856 |

**Note on Design:** The EN Design pillar has WP slug `design-en`, not `design`. This mismatch required a title-based fallback match in `getCategoryPageData()`. Future projects must audit WP slugs against application constants before coding.

---

## 5. WordPress REST Endpoints

### 5.1 Endpoint Inventory

| Endpoint | Purpose | Query parameters needed |
|----------|---------|------------------------|
| `/wp-json/` | Discovery — confirms REST API is active | none |
| `/wp-json/wp/v2/posts?per_page=100&acf_format=standard` | All articles (paginated) | `per_page`, `acf_format=standard` |
| `/wp-json/wp/v2/posts?slug={slug}&acf_format=standard` | Single article by slug | `slug`, `acf_format=standard` |
| `/wp-json/wp/v2/pillar?per_page=100&acf_format=standard` | All pillar entries | `per_page`, `acf_format=standard` |
| `/wp-json/wp/v2/pillar?slug={slug}&acf_format=standard` | Single pillar by slug | `slug`, `acf_format=standard` |
| `/wp-json/wp/v2/media/{id}` | Image metadata | none |

### 5.2 Endpoint Verification Requirements

For each endpoint the agent must verify:

**`/wp-json/`**
- Expected: 200, JSON with `"authentication"` key
- Failure: 404 = REST disabled or wrong domain; 403 = REST restricted by plugin
- Agent check: confirm `namespaces` array includes `"wp/v2"`

**`/wp-json/wp/v2/pillar`**
- Expected: array of pillar objects, each with `acf.pillar_data` present
- Failure: empty array = CPT not registered or not exposed to REST; missing `acf` key = ACF REST not enabled; 404 = CPT slug wrong
- Agent check: verify at least 14 entries (7 EN + 7 FI); verify each has `acf.pillar_data.content_lang`; verify pillar IDs match the project constant table

**`/wp-json/wp/v2/posts?per_page=100&acf_format=standard`**
- Expected: array with `acf.blog_post.header.content_lang` present on Taurisol articles
- Failure: empty `acf` object = `acf_format=standard` not recognized (ACF REST not activated); articles present but `content_lang` missing = wrong ACF group name
- Agent check: find at least one post where `acf.blog_post.header.content_lang === "en"` and one `=== "fi"`; verify `parent_pillar` is an integer matching a known pillar ID

**`/wp-json/wp/v2/posts?slug={slug}&acf_format=standard`**
- Expected: single-element array
- Failure: empty array = wrong slug or post is draft; missing ACF = field group not applied
- Agent check: request a known slug; verify `acf.blog_post` key exists

### 5.3 Pagination Warning

`per_page=100` returns a maximum of 100 posts. If the Journal ever has more than 100 articles, the current fetch code silently misses the rest. The agent must implement pagination (loop on `X-WP-TotalPages` header) before 100 articles are published.

---

## 6. RankMath Automation Requirements

### 6.1 Current State

RankMath fields are filled manually via the WP Admin editor (RankMath metabox on each post). They are not exposed in the REST API by default.

### 6.2 How RankMath Stores Data

RankMath PRO writes to WordPress post meta. The relevant meta keys:

| Meta key | Notes |
|----------|-------|
| `rank_math_title` | Supports `%title%` and other variables. If empty, falls back to post title. |
| `rank_math_description` | Plain text. No variable substitution. |
| `rank_math_focus_keyword` | Comma-separated if multiple. |
| `rank_math_canonical_url` | Override only. Usually empty. |
| `rank_math_og_title` | Usually empty (inherits from title). |
| `rank_math_og_description` | Usually empty (inherits from description). |
| `rank_math_robots` | Comma-separated directives e.g. `index,follow`. |

### 6.3 Automation Options

**Option A: WP-CLI via SSH (Recommended)**
```bash
# On Cloudways SSH terminal:
wp post meta update {POST_ID} rank_math_title "Custom SEO Title"
wp post meta update {POST_ID} rank_math_description "Meta description text"
wp post meta update {POST_ID} rank_math_focus_keyword "montefrio andalusia"
```
- Safe, transactional, scriptable
- Requires SSH access to Cloudways server
- Can be batched: agent generates a `.sh` script, operator runs it via SSH

**Option B: WP REST API with registered meta (Moderate complexity)**

Register meta for REST exposure in a custom plugin or `functions.php`:
```php
register_post_meta('post', 'rank_math_title', [
  'show_in_rest' => true,
  'type' => 'string',
  'single' => true,
]);
```
Then write via: `PATCH /wp-json/wp/v2/posts/{id}` with `{ "meta": { "rank_math_title": "..." } }`

Requires: authentication (application password or JWT), PHP customization.

**Option C: Direct database (Not recommended)**
Direct `UPDATE wp_postmeta` queries. Bypasses WordPress hooks and caching. Risk of data corruption if done incorrectly. Only for emergency recovery.

**Recommendation for future agent:** Option A (WP-CLI). The agent generates a ready-to-paste shell script. The operator runs it once via Cloudways SSH. No plugin modifications required.

---

## 7. Content Seeding Requirements

### 7.1 Per-Project Seeding Spec

When the agent initializes a new project from a cloned CMS, it must produce or verify the following content structure:

| Content type | Count | Fields required before first build |
|-------------|-------|-----------------------------------|
| Journal hub page | 1 | Slug, title |
| EN Pillar entries (CPT) | 7 | Slug (exact), title, `content_lang = "en"`, `pillar_intro` (can be placeholder), `translation_pillar` (set after FI entry is created) |
| FI Pillar entries (CPT) | 7 | Slug (exact), title, `content_lang = "fi"`, `pillar_intro`, `translation_pillar` |
| EN article templates | 6 | `content_lang = "en"`, `parent_pillar` (integer), `post_ingress`, `section_1.description` (at minimum) |
| FI article templates | 6 | Same for Finnish |

### 7.2 Fallback Content JSON

Before the CMS is ready, the Next.js frontend should have a fallback content JSON that represents the intended state:

```typescript
// lib/fallback-journal.ts
export const FALLBACK_ARTICLES: Record<string, JournalArticle[]> = {
  "philosophy-en": [],
  "place-en": [],
  // ... etc
};
```

This ensures the build succeeds and pages render even with a completely empty CMS.

### 7.3 Slug Verification Step

Before coding any route or fetch logic, the agent must:
1. Fetch all pillar entries from REST
2. Compare each WP slug against the application constant
3. Flag any mismatch (e.g., `design-en` vs `design`)
4. Either fix the WP slug OR add a fallback match in the application code

This step must happen before writing any integration code.

---

## 8. Next.js Integration Requirements

### 8.1 WordPress Client

The client must:
- Never throw on network error or non-200 response
- Have a configurable timeout (recommended: 8000ms)
- Accept `WORDPRESS_API_URL` from env or hardcoded fallback
- Always include `acf_format=standard` in ACF-dependent requests
- Return typed responses or null — never `any` without assertion

```typescript
// Pattern used in lib/wordpress.ts
const BASE = process.env.WORDPRESS_API_URL ?? "https://cms.taurisol.com";

async function wpFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}
```

### 8.2 Article Filtering Logic

The agent must implement this exact filter contract:

```typescript
function isTaurisolJournalPost(post: WPPost, lang: Lang): boolean {
  const header = (post.acf as any)?.blog_post?.header;
  return header?.content_lang === lang;
}

function getParentPillarId(post: WPPost): number | null {
  const id = (post.acf as any)?.blog_post?.header?.parent_pillar;
  return typeof id === "number" ? id : null;
}

// In getCategoryPageData():
const filtered = allPosts.filter((p) => {
  if (!isTaurisolJournalPost(p, lang)) return false;
  if (match) return getParentPillarId(p) === match.id;
  return false; // NEVER fall through to true — leaks foreign posts
});
```

The `return false` fallback is not a pessimistic default. It is the safety gate that prevents third-party content from a cloned CMS from appearing on the site.

### 8.3 Article Body Construction

`post.content.rendered` is always empty for ACF-driven posts. Article body must be built from sections:

```typescript
function buildSectionsHtml(sections: Record<string, unknown>): string {
  const parts: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const s = sections[`section_${i}`] as { title?: string; description?: string } | undefined;
    if (!s) continue;
    const title = (s.title ?? "").trim();
    const desc = (s.description ?? "").trim();
    if (title) parts.push(`<h2>${title}</h2>`);
    if (desc) {
      desc.split(/\r?\n\r?\n/)
        .map((p) => `<p>${p.replace(/\r?\n/g, " ").trim()}</p>`)
        .filter((p) => p !== "<p></p>")
        .forEach((p) => parts.push(p));
    }
  }
  return parts.join("\n");
}
```

### 8.4 ISR and Build Safety

- Category pages: `export const revalidate = 3600` — pages rebuild hourly or on demand
- `generateStaticParams` must list all 7 EN slugs (category pages) and all 7 FI slugs
- Article pages: no `generateStaticParams` — rendered dynamically on first request
- If WP is down at build time: category pages render with empty article list — no build failure
- If WP is down at request time for an article: render 404 via `notFound()`

### 8.5 Public Assets

Hero images and any other public assets committed to `apps/web/public/` **must be explicitly staged and committed**. The standard `.gitignore` patterns do not exclude `.webp` or `.jpg` files, but large binary files are sometimes overlooked when using selective staging. The agent must verify public assets are tracked before the first production deploy.

```bash
git ls-files apps/web/public/images/
# Must list every image expected in production
```

### 8.6 Image Remote Patterns

`next.config.ts` must whitelist the CMS domain for `<Image>` optimization if any CMS images are used:

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "cms.taurisol.com" },
  ],
}
```

---

## 9. Language Switching Requirements

### 9.1 The Bug

The initial implementation of language switching called `setLang()` only. This updated the React `lang` state used for display text (nav labels, UI strings) but did not navigate the user to the equivalent route in the other language.

Result: A user on `/journal/philosophy` who clicked FI saw Finnish UI labels but remained on the EN route. The URL did not change. If they then clicked a link, they were still in the EN route tree.

```tsx
// WRONG — display-only, no navigation
<button onClick={() => setLang("fi")}>FI</button>
```

### 9.2 The Fix

```tsx
// CORRECT — state + navigation
const handleLangSwitch = (newLang: Lang) => {
  setLang(newLang);
  const altPath = journalAltPath(pathname, newLang);
  if (altPath) router.push(altPath);
};
```

The `journalAltPath()` function maps the current pathname to the equivalent route in the target language, using a static slug mapping table.

### 9.3 Full Slug Mapping Table

| EN route | FI route |
|----------|----------|
| `/journal` | `/fi/journal` |
| `/journal/philosophy` | `/fi/journal/filosofia` |
| `/journal/place` | `/fi/journal/paikka` |
| `/journal/design` | `/fi/journal/design` |
| `/journal/energy` | `/fi/journal/energia` |
| `/journal/rituals` | `/fi/journal/rituaalit` |
| `/journal/founder-notes` | `/fi/journal/perustajan-muistiot` |
| `/journal/development` | `/fi/journal/kehitys` |
| `/journal/[category]/[article]` | Falls back to `/fi/journal/[category-fi]` (category page) |

### 9.4 Article-Level Switching

Article translation is not guaranteed. An article in EN may not have a FI translation. For article routes, language switching falls back to the equivalent category page in the target language:

- `/journal/philosophy/some-article` + switch to FI → `/fi/journal/filosofia`

This is intentional and safe. The agent must implement this fallback, not attempt a direct article slug translation.

### 9.5 Non-Journal Routes

Language switching on non-Journal routes (homepage, etc.) changes display language only. The homepage has a single URL (`/`) that serves both languages based on React state. This is acceptable for the current architecture but should be revisited if search engine indexing of Finnish pages becomes a priority.

---

## 10. Vercel Deployment Requirements

### 10.1 Environment Variables

| Variable | Scope | Value | Notes |
|----------|-------|-------|-------|
| `WORDPRESS_API_URL` | Production + Preview | `https://cms.taurisol.com` | Without this, the site uses the hardcoded fallback URL in `lib/wordpress.ts`. Both behave identically for this project. |

**Important:** After adding or changing an environment variable in Vercel, a new deployment must be triggered. Vercel does not hotswap environment variables into a running deployment. The previous deployment will continue using old values until redeployed.

### 10.2 Git Asset Tracking

Before the first production deployment, run:

```bash
git ls-files apps/web/public/images/
```

Every image file that must appear on the live site must appear in this list. Missing images will result in broken `<img>` tags or Next.js `<Image>` 404s in production — they will work locally because the file exists on the developer's machine.

This was the root cause of the missing Journal hero image in this project. The file existed locally, the build succeeded locally, but production had no image because it was never committed.

### 10.3 Build Command

```
cd apps/web && npm run build
```

The build runs `next build` which includes type-checking and static page generation. A passing local build does not guarantee a successful Vercel build if env vars differ. Always verify env vars are set in Vercel before deploying.

### 10.4 ISR Cache Behavior

ISR cache can serve stale content for up to 1 hour after a content change in WordPress. This is by design. To force immediate refresh:
- Trigger a manual redeployment from Vercel dashboard
- Or call the Next.js revalidation endpoint (if implemented)
- Or wait for the 1-hour revalidation cycle

**Important for smoke testing:** After deployment, article card content may appear stale if tested within the first hour. This is not a bug.

### 10.5 Post-Deploy Smoke Test Order

Always test in this order to catch ISR vs. deployment issues:
1. Hard-reload the production URL (not cached local browser)
2. Check the journal index page (cached)
3. Check one category page (might show empty until ISR runs)
4. Check one article page (dynamic, always fresh)

---

## 11. UI Requirements and Guardrails

### 11.1 What Went Wrong

During this project, multiple UI iterations drifted from the stated design brief:

**Sidebar layout vs. overlay layout.** The Journal index was specified with category buttons overlaid on the hero image. Multiple iterations produced a sidebar-next-to-image layout instead. The description "buttons beside the image" was interpreted as a CSS grid with two columns rather than `position: absolute` overlay on a full-width image. The fix required a complete layout rewrite.

**Hero image duplicate text.** The hero image (`taurisol-journal-hero.webp`) has typography embedded in the image. An early version also added HTML text elements (headline, tagline) on top of the image, creating duplicate text that appeared twice. The fix was to render the image as `<img>` with no overlaid text elements.

**Article category page top padding.** Early iterations used `pt-40 md:pt-52` on the category header section, pushing the article list far below the fold. The user had to scroll past a mostly-empty header to reach content. Correct value: `pt-24 md:pt-28`.

**Mobile hero scroll.** The hero section used `min-h-screen` which on iOS Safari resolves to the viewport height without browser chrome. When the browser chrome is visible, the bottom portion of the hero is hidden and the headline text is not visible on first load. Fix: `min-h-[85vh] md:min-h-screen` with reduced padding.

**Mobile menu scroll.** The mobile overlay menu used `gap-5` (20px) between nav links and `mt-10` (40px) before the first link. On a 390×844 viewport, this caused the language switcher and CTA to be below the visible area. Fix: `gap-2` and `mt-5`.

### 11.2 Agent Guardrails

The agent must enforce these constraints before submitting any UI change:

| Rule | Anti-pattern to refuse |
|------|----------------------|
| Do not add columns when overlay is specified | 2-column grid next to hero image when brief says "buttons over the image" |
| Do not add HTML text on top of image-embedded text | `<h1>` overlay when hero image already contains the headline |
| Do not invent placeholder sections | Generic content grids that don't match the approved design |
| Keep hero height within viewport | `min-h-screen` alone is insufficient on mobile — must pair with safe viewport units or percentage |
| Keep mobile overlay scrollable content within viewport | Sum up nav item heights × count × gap before choosing spacing values |
| Preserve high-contrast article cards | Dark background + gold border on sand — never swap to all-light or all-dark |

---

## 12. Production Smoke Test Checklist

### 12.1 Route Availability

Run these checks after every production deployment. Each must return HTTP 200 with content (not a redirect, not a 404, not a blank page):

| Route | Expected |
|-------|----------|
| `https://taurisol.com/` | Homepage renders. Hero image visible. Nav readable. |
| `https://taurisol.com/journal` | Journal index renders. 7 category cards visible. Hero image visible. |
| `https://taurisol.com/fi/journal` | Same in Finnish. |
| `https://taurisol.com/journal/philosophy` | Category page. Title "Philosophy". Article cards if any published. |
| `https://taurisol.com/journal/place` | |
| `https://taurisol.com/journal/design` | |
| `https://taurisol.com/journal/energy` | |
| `https://taurisol.com/journal/rituals` | |
| `https://taurisol.com/journal/founder-notes` | |
| `https://taurisol.com/journal/development` | |
| `https://taurisol.com/fi/journal/filosofia` | Finnish category page. Title "Filosofia". |
| `https://taurisol.com/fi/journal/paikka` | |
| `https://taurisol.com/fi/journal/design` | |
| `https://taurisol.com/fi/journal/energia` | |
| `https://taurisol.com/fi/journal/rituaalit` | |
| `https://taurisol.com/fi/journal/perustajan-muistiot` | |
| `https://taurisol.com/fi/journal/kehitys` | |

### 12.2 Content Integrity Checks

After routes confirm 200:

- [ ] No Markku Tauriainen / Sales Mind / Myyntiasenne brand text visible on any page
- [ ] No "Hello World" WordPress demo post in any article list
- [ ] Hero image on Journal index renders (not broken img tag)
- [ ] Nav is readable over hero image (sufficient contrast)
- [ ] Language switching on `/journal/philosophy` navigates to `/fi/journal/filosofia` — not just changes display text
- [ ] On mobile (390×844), the entire mobile menu is visible without vertical scroll
- [ ] Article cards display article titles, not placeholder text
- [ ] CMS fallback: if WordPress is temporarily unreachable, article list shows empty state — page does not 500

### 12.3 SEO Metadata Checks

On each category page, inspect page `<head>`:
- [ ] `<title>` matches the category name
- [ ] `<meta name="description">` is non-empty (RankMath or fallback)
- [ ] `<link rel="canonical">` points to the correct canonical URL
- [ ] `<link rel="alternate" hreflang="fi">` present on EN pages, vice versa

---

## 13. Error Log — Lessons Learned

These are the specific mistakes made during this project, ordered by severity and time cost.

### 13.1 Wrong ACF Field Group Name

**Mistake:** Assumed the ACF field group for Journal articles was named `journal_post` based on logical inference. The actual name was `blog_post` (inherited from the Markku Tauriainen CMS clone).

**Cost:** Several hours of debugging articles not appearing on category pages. The filter rejected every article silently.

**Fix:** `acf.blog_post.header.content_lang`, not `acf.journal_post.content_lang`.

**Prevention:** Before writing any integration code, fetch `/wp-json/wp/v2/posts?per_page=1&acf_format=standard` and inspect the actual JSON keys. Do not assume field group names from documentation or logical naming.

### 13.2 Hero Image Not Committed to Git

**Mistake:** The Journal hero image (`taurisol-journal-hero.webp`) was present on the developer machine at `apps/web/public/images/` but was never staged and committed.

**Cost:** Production hero image was missing. Build succeeded locally, deployed successfully, but the image 404'd on Vercel.

**Fix:** `git add apps/web/public/images/taurisol-journal-hero.webp && git commit`.

**Prevention:** Add a pre-deploy step that runs `git ls-files apps/web/public/images/` and verifies all expected images are tracked.

### 13.3 Language Switch With No Navigation

**Mistake:** Language toggle buttons called `setLang(newLang)` only. This changed the display language of React-rendered text but did not navigate to the equivalent route. Users remained on the EN route while seeing FI labels.

**Cost:** Language switching appeared to work visually but was functionally broken for the Journal section where separate routes exist for EN and FI.

**Fix:** `handleLangSwitch()` calls both `setLang()` and `router.push(altPath)`.

**Prevention:** Any language switcher in a multilingual app with separate URL routes must trigger navigation, not just state change.

### 13.4 Content Filter Fallback Leaked Foreign Posts

**Mistake:** When the pillar lookup failed (e.g., wrong slug), the filter fell back to `return true` for any lang-matching post. This caused all Finnish blog posts from the Markku Tauriainen CMS clone to appear in Finnish Journal category pages.

**Cost:** Finnish article pages displayed AI marketing content unrelated to Taurisol.

**Fix:** `return false` when no pillar match found.

**Prevention:** Default to the most restrictive filtering. If in doubt about category membership, exclude.

### 13.5 WP Slug Mismatch (Design)

**Mistake:** The Design category EN pillar had WP slug `design-en` (probably created from a template that appended language suffix). The application used slug `design`. Pillar lookup by slug failed silently.

**Cost:** Design category page showed no articles.

**Fix:** Added title-based fallback matching in `getCategoryPageData()`.

**Prevention:** Audit all WP pillar slugs against application constants at setup time. Fix WP slugs to match, not the other way around.

### 13.6 `post.content.rendered` Always Empty

**Mistake:** Initial article rendering tried to use `post.content.rendered` as the article body. This field is always empty for ACF-driven posts in this CMS.

**Cost:** All article pages rendered with no body content.

**Fix:** Build body from `acf.blog_post.sections.section_1` through `section_15`.

**Prevention:** When working with a cloned CMS, verify which field actually holds the content by inspecting the REST response. Never assume the standard WordPress content field is used when ACF is involved.

### 13.7 UI Description ≠ UI Implementation

**Mistake:** Design brief used words like "buttons over the hero image" and "overlay on the left". Implementation produced a 2-column grid with image on the right and buttons in a separate column on the left. The description was correct; the layout code was wrong.

**Cost:** Multiple rebuild iterations. The correct layout required `position: absolute` on desktop and a separate mobile block.

**Prevention:** For any layout with overlay positioning, explicitly verify that `position: absolute` is used and that the reference element has `position: relative`. "Overlay" means absolute positioning, not a flex column.

### 13.8 Smart Quote Corruption in Source Files

**Mistake:** The Edit tool occasionally replaced straight double-quotes (`"`) with typographic quotes (`"` / `"`, U+201C/U+201D) inside TypeScript string literals, causing syntax errors.

**Cost:** Build failures requiring careful character-level inspection and PowerShell-based string replacement.

**Prevention:** After any automated edit of `.ts` or `.tsx` files, grep for Unicode smart quotes before building:
```bash
grep -rn $'\xe2\x80\x9c\|\xe2\x80\x9d' apps/web/lib/
```

---

## 14. Future Helios Agent Specification

### 14.1 Agent Identity

**Name:** Helios Hybrid Publisher Agent (HHPA)  
**Version target:** v1.0  
**Mission:** Given a cloned WordPress CMS and a Next.js frontend, produce a publish-ready, multilingual, SEO-ready, CMS-driven site with no manual integration work.

### 14.2 Agent Inputs

```yaml
project:
  name: "Taurisol"
  domains:
    frontend: "taurisol.com"
    cms: "cms.taurisol.com"
  languages: ["en", "fi"]
  categories:
    - slug_en: "philosophy"
      slug_fi: "filosofia"
      title_en: "Philosophy"
      title_fi: "Filosofia"
    # ... × 7

  article_templates:
    per_category_per_lang: 2

  hero_image: "taurisol-journal-hero.webp"

  brand:
    name: "Taurisol"
    tone: "Premium, minimal, architectural"

  cms:
    url: "https://cms.taurisol.com"
    source_clone: "wp.markkutauriainen.com"
    acf_group: "blog_post"
    pillar_cpt: "pillar"

  infrastructure:
    github_repo: "helios-os/taurisol-flagship"
    vercel_project: "taurisol-flagship"
    vercel_env_var: "WORDPRESS_API_URL"

  seo:
    category_descriptions:
      philosophy_en: "The thinking behind Taurisol..."
      # ...
```

### 14.3 Agent Outputs

1. **CMS structure report** — list of all pillar entries found, their IDs, slugs, language assignments, and any slug mismatches detected
2. **ACF schema verification** — confirmed field paths from live REST response
3. **Seeded content** — WP-CLI script to create missing pillars and article templates
4. **RankMath population script** — WP-CLI commands for all SEO fields
5. **Next.js routes and data layer** — typed client, filter functions, route files
6. **Vercel environment checklist** — all required variables with current status
7. **Build/deploy report** — build output, route table, any warnings
8. **Smoke test report** — HTTP status for all 18 routes, content integrity checks
9. **Development memo** — machine-readable summary of all decisions and deviations

### 14.4 Agent Decision Rules

| Situation | Agent action |
|-----------|-------------|
| WP slug mismatches application constant | Flag and auto-generate WP-CLI `wp post update --post_name=...` command |
| `acf_format=standard` returns no `acf` key | Halt and report: "ACF REST not enabled. Enable in ACF settings." |
| `content_lang` field missing on posts | Halt and report: "Field group `blog_post` not applied to post type. Check ACF field group rules." |
| Post count per category = 0 | Accept — show empty state. Do not error. |
| Image in `public/images/` not in git | Add to git automatically before commit |
| Language switching implemented without `router.push` | Reject implementation, require navigation call |
| UI description says "overlay" | Require `position: absolute` in output — reject flex column layout |

---

## 15. Recommended Template Files

The following template files should be created in the Helios OS template library:

| File | Purpose |
|------|---------|
| `HELIOS_WP_NEXT_HYBRID_PUBLISHER_AGENT_SPEC_v1.md` | Full agent specification (this document is the source) |
| `HELIOS_CMS_CLONE_CLEANUP_CHECKLIST_v1.md` | Step-by-step checklist for cleaning a cloned WP CMS |
| `HELIOS_ACF_FIELD_MAPPING_TEMPLATE_v1.md` | Blank template: fill in for each project after REST inspection |
| `HELIOS_RANKMATH_AUTOMATION_PLAN_v1.md` | WP-CLI scripts for populating RankMath on all post types |
| `HELIOS_VERCEL_DEPLOYMENT_CHECKLIST_v1.md` | Pre-deploy and post-deploy verification list |
| `HELIOS_PRODUCTION_SMOKE_TEST_CHECKLIST_v1.md` | Executable smoke test list (see Section 12) |

All templates should be stored at `/templates/` in the Helios OS repo. Each project gets a copy filled in with project-specific values.

---

## 16. Future Golden Path

The following is the correct sequence for future projects. Deviating from this order introduces the class of errors documented in Section 13.

**Phase 0 — Setup**
1. Clone clean WordPress template on Cloudways (not a live client site)
2. Remove ALL old brand content: posts, pages, pillar entries, media
3. Verify REST API active: `GET /wp-json/` → 200

**Phase 1 — CMS Structure**
4. Create 1 Journal hub page (slug: `journal`)
5. Create 7 EN Pillar CPT entries — slugs matching application constants exactly
6. Create 7 FI Pillar CPT entries — slugs matching application constants exactly
7. Link EN↔FI translation relations on each pillar
8. Create 6 EN + 6 FI blank article templates, each with `content_lang` and `parent_pillar` set
9. Verify: `GET /wp-json/wp/v2/pillar?per_page=100&acf_format=standard` → 14 entries, all with `acf.pillar_data.content_lang`
10. Verify: `GET /wp-json/wp/v2/posts?per_page=100&acf_format=standard` → 12 entries (or more), all with `acf.blog_post.header.content_lang`

**Phase 2 — Slug Audit**
11. Extract all WP pillar slugs from REST
12. Compare against application constants — fix any mismatches in WP Admin (change WP slug, not application code)
13. Document verified slug-to-ID mapping table (see Section 4.4)

**Phase 3 — ACF Content**
14. Fill `pillar_intro` on all 14 pillar entries (at minimum placeholder text)
15. Fill `section_1.description` on at least 1 article per category to verify rendering
16. Confirm `parent_pillar` is set on all articles (correct integer ID)

**Phase 4 — SEO**
17. Generate RankMath WP-CLI script for all pillars and articles
18. Run script via Cloudways SSH
19. Verify via WP Admin that `rank_math_title` and `rank_math_description` are populated

**Phase 5 — Next.js Integration**
20. Verify `WORDPRESS_API_URL` set in `.env.local`
21. Fetch live REST data and inspect JSON — confirm `acf.blog_post` key exists before coding
22. Implement WordPress client with timeout and no-throw
23. Implement filtering with `isTaurisolJournalPost()` and `getParentPillarId()`
24. Implement `buildSectionsHtml()` for article body
25. Implement category and article routes
26. Implement language switching with `router.push()`
27. Add `next.config.ts` remote image patterns

**Phase 6 — Assets**
28. Confirm all `public/images/` assets are git-tracked: `git ls-files apps/web/public/images/`
29. Stage and commit any missing images

**Phase 7 — Build & Deploy**
30. Run local build: `npm run build` — must pass with 0 errors
31. Add `WORDPRESS_API_URL` to Vercel environment variables (Production + Preview)
32. Push to main — triggers Vercel deployment
33. After deployment completes, trigger one manual redeploy (forces env vars into effect)

**Phase 8 — Smoke Test**
34. Run all 18 route checks (Section 12.1)
35. Run content integrity checks (Section 12.2)
36. Run SEO metadata checks (Section 12.3)
37. Test language switching on `/journal/philosophy` → must navigate to `/fi/journal/filosofia`
38. Test on mobile 390×844 — full menu visible without scroll, hero content visible without scroll

**Phase 9 — First Article**
39. Publish first real article in WP Admin
40. Wait for ISR cycle (up to 1 hour) or trigger manual redeploy
41. Verify article card appears on category page
42. Verify article detail page renders with full body content

**Phase 10 — Register**
43. Update `docs/CMS_CONNECTION_STATUS.md` with verified endpoint table
44. Update `docs/development-memos/` with project-specific decisions
45. Commit final development memo

---

*This document represents the actual state of the Taurisol integration as of 2026-06-09. It is authoritative for future Helios agent development. Any discrepancy between this document and other docs in this repo should be resolved in favor of this document for Journal/CMS integration topics.*
