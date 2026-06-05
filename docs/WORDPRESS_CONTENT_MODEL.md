# WORDPRESS_CONTENT_MODEL

Headless WordPress + ACF content model for taurisol-flagship.

Locale pattern: `content_lang` (EN + FI field pairs) — no WPML required.
This follows the Helios locale architecture standard.

TypeScript definition: `packages/content-model/taurisol.ts`

---

## WordPress Setup

| Setting | Value |
|---------|-------|
| WordPress type | Headless |
| REST API | `/wp-json/wp/v2/` |
| ACF plugin | Advanced Custom Fields PRO |
| Custom fields format | ACF per section, field pairs `_en` / `_fi` |
| Post type | `page` (single page: `taurisol-flagship`) |
| GraphQL | Optional — WPGraphQL plugin |

---

## ACF Groups

### 1. taurisol_page — Page metadata

| Field | Type | Notes |
|-------|------|-------|
| `seo_title_en` | Text | |
| `seo_title_fi` | Text | |
| `seo_description_en` | Textarea | |
| `seo_description_fi` | Textarea | |

---

### 2. taurisol_hero — Hero section

| Field | Type | Notes |
|-------|------|-------|
| `hero_image` | Image | 1920×1280px recommended |
| `hero_eyebrow_en/fi` | Text | |
| `hero_title_en/fi` | Text | |
| `hero_subtitle_en/fi` | Text | |
| `hero_body_en/fi` | Textarea | |
| `hero_cta_primary_text_en/fi` | Text | |
| `hero_cta_primary_url` | URL | Default `#philosophy` |
| `hero_cta_secondary_text_en/fi` | Text | |
| `hero_cta_secondary_url` | URL | Default `https://one.taurisol.com/` |

---

### 3. taurisol_problem — Problem section

| Field | Type | Notes |
|-------|------|-------|
| `problem_title_en/fi` | Text | |
| `problem_cards` | Repeater | max 4 rows |
| → `card_title_en/fi` | Text | |
| → `card_body_en/fi` | Textarea | |
| `problem_footer_en/fi` | Text | |

---

### 4. taurisol_outcome — Outcome section

| Field | Type | Notes |
|-------|------|-------|
| `outcome_title_en/fi` | Text | |
| `outcome_image` | Image | 1600×1100px, aspect 4/5 |
| `outcome_items` | Repeater | bullet list |
| → `item_en/fi` | Text | |
| `outcome_closer1_en/fi` | Text | |
| `outcome_closer2_en/fi` | Text | italic variant |

---

### 5. taurisol_pillars — Pillars section

| Field | Type | Notes |
|-------|------|-------|
| `pillars_cards` | Repeater | max 3 rows |
| → `pillar_title_en/fi` | Text | |
| → `pillar_body_en/fi` | Textarea | |

---

### 6. taurisol_why — Why / Technology section

| Field | Type | Notes |
|-------|------|-------|
| `why_intro1_en/fi` | Text | |
| `why_intro2_en/fi` | Text | italic |
| `why_image` | Image | aspect 4/5 |
| `why_title_en/fi` | Text | caption |
| `why_body_en/fi` | Textarea | caption body |
| `why_cards` | Repeater | max 3 rows |
| → `card_icon` | Text | emoji |
| → `card_title_en/fi` | Text | |
| → `card_body_en/fi` | Textarea | |

---

### 7. taurisol_location — Location section

| Field | Type | Notes |
|-------|------|-------|
| `location_image` | Image | 1600×900px — replaces Lovable CDN asset |
| `location_eyebrow_en/fi` | Text | |
| `location_title_en/fi` | Text | |
| `location_subtitle_en/fi` | Textarea | |
| `location_story1_en/fi` | Text | |
| `location_story2_en/fi` | Textarea | italic |
| `location_bullets` | Repeater | |
| → `bullet_en/fi` | Text | |
| `location_cards` | Repeater | max 4 rows |
| → `card_title_en/fi` | Text | |
| → `card_body_en/fi` | Textarea | |
| `location_credibility_en/fi` | Textarea | National Geographic quote |
| `location_quote_en/fi` | Text | pull quote |
| `location_quote_support_en/fi` | Textarea | |
| `location_micro_title_en/fi` | Text | microclimate heading |
| `location_cta_title_en/fi` | Text | |
| `location_cta_btn_en/fi` | Text | |
| `location_cta_url` | URL | |

---

### 8. taurisol_winters — Winters section

| Field | Type | Notes |
|-------|------|-------|
| `winters_image` | Image | 1600×1100px |
| `winters_title_en/fi` | Text | |
| `winters_body_en/fi` | Textarea | |
| `winters_cta_text_en/fi` | Text | |
| `winters_cta_url` | URL | Default `#audience` |

---

### 9. taurisol_trust — Trust section

| Field | Type | Notes |
|-------|------|-------|
| `trust_title_en/fi` | Text | |
| `trust_body1_en/fi` | Text | |
| `trust_body2_en/fi` | Text | |
| `trust_body3_en/fi` | Text | italic |

---

### 10. taurisol_audience — Audience section

| Field | Type | Notes |
|-------|------|-------|
| `audience_eyebrow_en/fi` | Text | |
| `audience_title_en/fi` | Text | |
| `audience_subtitle_en/fi` | Textarea | |
| `audience_cards` | Repeater | max 4 rows |
| → `card_title_en/fi` | Text | |
| → `card_body_en/fi` | Textarea | |
| `audience_footer1_en/fi` | Text | |
| `audience_footer2_en/fi` | Textarea | |
| `audience_cta_text_en/fi` | Text | |
| `audience_cta_url` | URL | |

---

### 11. taurisol_one — Taurisol One section

| Field | Type | Notes |
|-------|------|-------|
| `one_eyebrow_en/fi` | Text | |
| `one_title_en/fi` | Text | |
| `one_body_en/fi` | Textarea | |
| `one_cta_text_en/fi` | Text | |
| `one_cta_url` | URL | Default `https://one.taurisol.com/` |

---

### 12. taurisol_navigation — Global nav overrides

| Field | Type | Notes |
|-------|------|-------|
| `nav_cta_text_en/fi` | Text | Nav desktop CTA label |

---

## WP Integration Strategy

### Phase 1 (Current)
All content served from static `lib/i18n.ts`. Site runs without WordPress.

### Phase 2 (WP Integration)
1. Fetch page data from WP REST API at build time (Next.js `generateStaticParams` / `fetch`)
2. Replace static `content` object with WP data
3. Implement `getPageContent(lang)` helper in `lib/wordpress/`
4. Follow `lib/wordpress/` structure from Victor WP model pattern (Helios standard)

### Phase 3 (Live editing)
On-demand ISR revalidation when WP content changes via webhook.

---

## Image Migration

| Source | WP field | Next.js path |
|--------|----------|--------------|
| `hero-andalusia.jpg` | `hero_image` | `/images/hero-andalusia.jpg` |
| `outcome-terrace.jpg` | `outcome_image` | `/images/outcome-terrace.jpg` |
| `winters.jpg` | `winters_image` | `/images/winters.jpg` |
| `olive-detail.jpg` | `why_image` | `/images/olive-detail.jpg` |
| `montefrio-countryside.webp` (missing) | `location_image` | Must be uploaded to WP Media |

---

## Notes

- The `montefrio-countryside.webp` binary is NOT in the Lovable ZIP. It must be provided separately and uploaded to WordPress Media Library when WP integration is implemented.
- All anchor navigation (`#philosophy`, `#how`, etc.) is handled client-side — no WP involvement.
- External links (`https://one.taurisol.com/`) are hardcoded in `location_cta_url` / `audience_cta_url` defaults and can be overridden from WP.
