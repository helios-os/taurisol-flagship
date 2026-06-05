# LOVABLE_IMPORT_REPORT

## Source

| Field | Value |
|---|---|
| ZIP file | `C:\Users\Järjestelmänvalvoja\Downloads\taurisol-flagship-main.zip` |
| ZIP size | 1,029,852 bytes (~1.0 MB) |
| Uncompressed size | 1,299,006 bytes (~1.3 MB) |
| Total entries | 104 |
| Export root | `taurisol-flagship-main/` |
| Extraction target | `migration-source/lovable-export/` |
| Source status | IMMUTABLE — never modified |

## Lovable Project

| Field | Value |
|---|---|
| Project name | taurisol-flagship |
| Framework | TanStack Start (Vite 7 + TanStack Router) |
| React | 19.2.0 |
| TypeScript | 5.8.3 |
| Tailwind | 4.2.1 (CSS-based config, `@import "tailwindcss"`) |
| Fonts | Cormorant Garamond (serif) + Inter (sans) via Google Fonts |
| i18n | EN / FI via React Context + static `content` object |
| Pages | 1 (single-page, anchor navigation) |
| Routes | `src/routes/index.tsx` |

## Components Identified

| Component | File | Type |
|---|---|---|
| Nav | `src/components/taurisol/Nav.tsx` | Fixed header, EN/FI switcher, mobile overlay |
| Hero | `src/components/taurisol/Hero.tsx` | Full-screen parallax, `hero-andalusia.jpg` |
| Problem | `src/components/taurisol/Problem.tsx` | 4-card section |
| Outcome | `src/components/taurisol/Outcome.tsx` | Bullet list + image |
| Pillars | `src/components/taurisol/Pillars.tsx` | 3 pillar cards |
| Why | `src/components/taurisol/Why.tsx` | 3 tech cards |
| Location | `src/components/taurisol/Location.tsx` | Complex: bullets, cards, CTA |
| Winters | `src/components/taurisol/Winters.tsx` | Emotional CTA + `winters.jpg` |
| Trust | `src/components/taurisol/Trust.tsx` | 3-line text block |
| Audience | `src/components/taurisol/Audience.tsx` | 4 audience cards + CTA |
| TaurisolOne | `src/components/taurisol/TaurisolOne.tsx` | CTA → one.taurisol.com |
| Footer | `src/components/taurisol/Footer.tsx` | Brand block + 3 columns + bottom bar |
| ScrollToTop | `src/components/taurisol/ScrollToTop.tsx` | Fixed scroll button |
| Reveal | `src/components/taurisol/Reveal.tsx` | IntersectionObserver animation wrapper |
| LangContext | `src/components/LangContext.tsx` | EN/FI React context |

## Static Assets

| File | Usage |
|---|---|
| `src/assets/hero-andalusia.jpg` | Hero section background |
| `src/assets/outcome-terrace.jpg` | Outcome section image |
| `src/assets/winters.jpg` | Winters section background |
| `src/assets/olive-detail.jpg` | Present in assets, usage TBD |
| `src/assets/montefrio-countryside.webp.asset.json` | Lovable asset reference (no binary in ZIP) |

## i18n Content

- Languages: `en`, `fi`
- Keys: `nav`, `hero`, `problem`, `outcome`, `pillars`, `why`, `location`, `winters`, `one`, `trust`, `audience`, `footer`
- Total text strings: ~120 bilingual pairs

## Validation Result

| Check | Result |
|---|---|
| ZIP file exists | PASS |
| ZIP readable | PASS |
| ZIP extractable | PASS |
| Source components present | PASS |
| Assets present | PASS (note: montefrio-countryside.webp binary absent — only .asset.json) |
| i18n complete | PASS |

## Notes

- `montefrio-countryside.webp` has only an `.asset.json` reference file in the ZIP, no actual binary. This is a Lovable asset pointer. The Location section uses it via Lovable's asset system. Documented in KNOWN_ISSUES.md.
- Screenshots available in Downloads: `taurisol-desktop-latest.png`, `taurisol-tablet-latest.png`, `taurisol-mobiili-latest.png` — used as responsive validation reference.
