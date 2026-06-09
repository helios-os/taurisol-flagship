# API Endpoint Map

**CMS base URL:** `https://cms.taurisol.com`  
**REST API root:** `https://cms.taurisol.com/wp-json/`  
**Discovery date:** 2026-06-09

---

## Standard WP REST v2 Endpoints

| Endpoint | Method | Status | Description |
|---|---|---|---|
| `/wp-json/` | GET | ✅ 200 | API root — namespace and route discovery |
| `/wp-json/wp/v2/posts` | GET | ✅ 200 | Blog/news posts |
| `/wp-json/wp/v2/pages` | GET | ✅ 200 | WordPress pages |
| `/wp-json/wp/v2/media` | GET | ✅ (via parent param) | Media library items |
| `/wp-json/wp/v2/types` | GET | ✅ (inferred) | Registered post types |

---

## Custom Post Type Endpoints

| Endpoint | Method | Status | Post Type | ACF Group |
|---|---|---|---|---|
| `/wp-json/wp/v2/pillar` | GET | ✅ 200 | `pillar` | `pillar_data` |
| `/wp-json/wp/v2/pillar/{id}` | GET | ✅ (inferred) | Single pillar | `pillar_data` |

---

## Key Page Slugs

| Slug | WP ID | Language | Endpoint |
|---|---|---|---|
| `home-page-en` | 156 | English | `/wp-json/wp/v2/pages?slug=home-page-en` |
| `home-page-fi` | 252 | Finnish | `/wp-json/wp/v2/pages?slug=home-page-fi` |

---

## Useful Query Parameters

| Param | Example | Effect |
|---|---|---|
| `per_page` | `?per_page=50` | Increase results per page (default 10, max 100) |
| `slug` | `?slug=home-page-en` | Filter by slug (returns array, take `[0]`) |
| `status` | `?status=publish` | Filter published only |
| `_fields` | `?_fields=id,slug,acf` | Reduce response payload (performance) |

---

## ACF Response Shape

ACF fields appear under the `acf` key in each response object.  
Example pillar item:

```json
{
  "id": 647,
  "slug": "sales-leadership-culture",
  "type": "pillar",
  "title": { "rendered": "Sales Leadership &amp; Culture" },
  "acf": {
    "pillar_data": {
      "content_lang": "en",
      "translation_pillar": 645,
      "pillar_intro": "...",
      "pillar_expert_view": "Markku Tauriainen: ...",
      "seo_content": { "title": "...", "description": "...", ... }
    }
  }
}
```

---

## Frontend Usage

```ts
// apps/web/lib/wordpress.ts

// Fetch all pillars
const pillars = await fetchPillars();

// Fetch pillars for a specific language
const enPillars = await fetchPillarsByLang("en");

// Fetch main EN page (ACF fields included)
const page = await fetchPageBySlug("home-page-en");

// Health check
const alive = await isWordPressReachable();
```

---

## Notes

- The `pillar` custom post type endpoint `/wp-json/wp/v2/pillar` is confirmed live.  
  The original task anticipated it might differ — it did not.
- ACF fields are embedded in the REST response via the ACF PRO REST API integration.
- Bilingual content uses separate posts per language, linked by `translation_pillar` ID.
- No WPML or Polylang is in use. Locale detection is handled by `content_lang` ACF field.
