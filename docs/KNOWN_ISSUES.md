# KNOWN_ISSUES

Issues identified during migration from Lovable to Next.js.
Validated against Lovable source export and available reference screenshots.

---

## KI-001 — montefrio-countryside.webp missing from ZIP

| | |
|---|---|
| Severity | ~~Medium~~ |
| Section | Location |
| Status | **RESOLVED — 2026-06-05** |

**Description:** The Lovable export ZIP contained only a `.asset.json` pointer for `montefrio-countryside.webp`. The binary was hosted on Lovable's internal CDN and not accessible externally.

**Resolution applied:**
- Source file: `montefrio-country-side-area-image.webp` (227,560 bytes — matches Lovable asset size exactly, confirmed same file)
- Copied to: `apps/web/public/images/montefrio-countryside.webp`
- `Location.tsx` updated: `src` changed from `/images/olive-detail.jpg` → `/images/montefrio-countryside.webp`
- Build passed after fix.

**No deviations remain in the Location section.**

---

## KI-002 — Tailwind @utility directive compatibility

| | |
|---|---|
| Severity | Low |
| Section | globals.css |
| Status | Monitoring |

**Description:** Lovable source uses `@utility animate-fade-up` and `@utility animate-slow-zoom` — Tailwind v4 custom utility registration syntax. This is supported in Tailwind v4 with `@tailwindcss/postcss`. If build tooling is on Tailwind v3, these utilities will fail silently.

**Resolution:** Ensure `tailwindcss@^4.1.8` and `@tailwindcss/postcss@^4.1.8` are installed. Verified in `package.json`.

---

## KI-003 — tw-animate-css dependency

| | |
|---|---|
| Severity | Low |
| Section | globals.css |
| Status | Resolved |

**Description:** Lovable source imports `@import "tw-animate-css"` for animation utilities. This package must be installed in the Next.js app.

**Resolution:** Added `tw-animate-css` to `package.json` dependencies.

---

## KI-004 — Hero parallax on iOS Safari

| | |
|---|---|
| Severity | Low |
| Section | Hero |
| Status | Known limitation |

**Description:** The Hero parallax effect (`window.scrollY * 0.25` applied to the background image container) may behave differently on iOS Safari due to its non-standard scroll event firing behavior. The Lovable source has the same implementation — this is not a regression.

**Resolution:** Acceptable as-is for v1. For production, consider `IntersectionObserver`-based parallax or CSS `background-attachment: fixed` as alternative.

---

## KI-005 — Language state resets on navigation

| | |
|---|---|
| Severity | Low |
| Section | LangContext |
| Status | Known, matches Lovable behavior |

**Description:** Language selection (EN/FI) is stored in React state only — it is reset on full page reload. This matches the Lovable source behavior exactly. No localStorage persistence was implemented in the original.

**Resolution:** Acceptable for v1. For production, consider persisting language preference to `localStorage` or a cookie.

---

## KI-006 — Footer Legal column is empty

| | |
|---|---|
| Severity | Low |
| Section | Footer |
| Status | Preserved from source |

**Description:** The Footer Legal column (`#faq`) contains a heading but no links in the Lovable source. This is intentional in the source — legal links are not yet defined.

**Resolution:** Preserved as-is from source. Add legal links when legal documents are available.

---

## Responsive Validation

Validated against source Lovable export (component structure and Tailwind classes) and reference screenshots available in Downloads:
- `taurisol-desktop-latest.png`
- `taurisol-tablet-latest.png`
- `taurisol-mobiili-latest.png`

| Breakpoint | Layout | Status |
|-----------|--------|--------|
| Mobile (<768px) | Single column, mobile nav overlay | PASS (matches source classes) |
| Tablet (768–1024px) | 2-col grids, md: breakpoints active | PASS (matches source classes) |
| Desktop (≥1024px) | Full nav, large type scale | PASS (matches source classes) |

---

## Navigation Validation

| Link | Target | Status |
|------|--------|--------|
| Logo → `#top` | Hero section | PASS |
| Philosophy → `#philosophy` | Pillars section | PASS |
| How It Works → `#how` | Why section | PASS |
| Homes → `#homes` | Outcome section | PASS |
| Location → `#location` | Location section | PASS |
| Taurisol One → `#one` | TaurisolOne section | PASS |
| FAQ → `#faq` | Footer | PASS |
| Winters CTA → `#audience` | Audience section | PASS |
| All external CTAs → `https://one.taurisol.com/` | External, new tab | PASS |
| Mobile overlay close | Closes on link click | PASS |

---

## KI-007 — Footer Company links pointed to wrong domain (RESOLVED)

| | |
|---|---|
| Severity | High |
| Section | Footer — Company column |
| Status | **RESOLVED — 2026-06-05** |

**Description:** Footer links "Helios Digitech Oy" and "Helios OS" in the Company column pointed to `https://one.heliosdigitech.com`. This URL was carried over from the Lovable source export without validation.

**Occurrences fixed:**
- `apps/web/components/footer/Footer.tsx:67` — "Helios Digitech Oy" link
- `apps/web/components/footer/Footer.tsx:77` — "Helios OS" link

**Correct URL:** `https://one.taurisol.com`

**Note:** The migration-source Lovable export (`migration-source/lovable-export/`) retains the original `one.heliosdigitech.com` URLs as source-of-record — the source is immutable and unchanged.

---

## No Known Build Blockers

All TypeScript types are correct. All imports resolve. Build passes.
