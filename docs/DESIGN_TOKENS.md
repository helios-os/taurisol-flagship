# DESIGN_TOKENS

Faithful extract from Lovable source `styles.css`.
Canonical source: `apps/web/app/globals.css`
TypeScript reference: `packages/ui/tokens.ts`

---

## Colors

All colors use the `oklch` color space. CSS custom properties are defined in `:root`.

| Token name | CSS variable | oklch value | Hex approx | Role |
|-----------|-------------|------------|-----------|------|
| sand-light | `--sand-light` | `oklch(0.972 0.012 85)` | ~#FAF7F0 | Page background, lightest sand |
| sand | `--sand` | `oklch(0.918 0.028 82)` | ~#EDE5D2 | Hover backgrounds, section fills |
| stone-warm | `--stone-warm` | `oklch(0.835 0.034 75)` | ~#D4C8B0 | Dividers, subtle borders |
| olive | `--olive` | `oklch(0.55 0.055 115)` | ~#6B7A3A | Eyebrow labels, accents |
| olive-deep | `--olive-deep` | `oklch(0.32 0.04 115)` | ~#3A4520 | Text accents, italic highlights |
| sun | `--sun` | `oklch(0.71 0.08 82)` | ~#C8A15A | Taurisol Gold — primary CTA, accent |
| sun-deep | `--sun-deep` | `oklch(0.65 0.075 80)` | ~#B8904A | CTA press state |
| sun-soft | `--sun-soft` | `oklch(0.78 0.075 84)` | ~#D8B06A | CTA hover glow |
| olive-night | `--olive-night` | `oklch(0.15 0.012 110)` | ~#1A1D10 | Footer background |
| shadow-deep | `--shadow-deep` | `oklch(0.22 0.025 90)` | ~#2A2518 | Dark body text, Outcome bg |

### Semantic mapping

| Semantic | Resolves to | Usage |
|---------|------------|-------|
| `--background` | `--sand-light` | Page background |
| `--foreground` | `--shadow-deep` | Body text |
| `--primary` | `--olive-deep` | Primary UI color |
| `--accent` | `--sun` | Gold highlights |
| `--muted` | `--sand` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.45 0.025 90)` | Placeholder/secondary text |
| `--border` | `oklch(0.86 0.022 80)` | Dividers |

---

## Typography

| Role | Family | Weights | Variable |
|------|--------|---------|----------|
| Serif display | Cormorant Garamond | 300, 400, 500, 600 + italic | `--font-cormorant` |
| Sans body | Inter | 300, 400, 500, 600 | `--font-inter` |

Loaded via `next/font/google` in `apps/web/app/layout.tsx`.

### Type scale

| Class | Definition | Usage |
|-------|-----------|-------|
| `font-serif text-[5.5rem]` | ~88px serif | h1 hero (desktop) |
| `font-serif text-7xl` | 72px serif | h1 hero (tablet) |
| `font-serif text-5xl` | 48px serif | h1 hero (mobile) |
| `font-serif text-6xl` | 60px serif | h2 section (desktop) |
| `font-serif text-4xl` | 36px serif | h2 section / h3 |
| `font-serif text-3xl` | 30px serif | body display |
| `text-[11px] uppercase tracking-[0.22em]` | 11px / +0.22em | Nav labels |
| `text-xs uppercase tracking-[0.35em]` | 12px / +0.35em | Eyebrow labels |
| `text-base font-light leading-relaxed` | 16px light | Body copy |
| `text-sm font-light leading-relaxed` | 14px light | Card body |

---

## Spacing

| Pattern | Value | Context |
|---------|-------|---------|
| Section vertical padding | `py-28 md:py-40` | Standard sections |
| Section vertical padding (large) | `py-32 md:py-44` | Trust, featured |
| Container horizontal | `px-6 md:px-12` | All sections |
| Max width (full) | `max-w-7xl` | Wide layouts |
| Max width (content) | `max-w-5xl` | TaurisolOne |
| Max width (narrow) | `max-w-4xl` | Trust, Location CTA |
| Max width (text) | `max-w-3xl` | Editorial prose |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| Base | `0.25rem` | Default |
| CTA buttons | `rounded-[10px]` | All CTAs, nav links |
| Lang pill | `rounded-[8px]` | Language switcher |
| Divider line | `rounded-full` | Location bullet dots |

---

## Animations

| Name | Definition | Usage |
|------|-----------|-------|
| `animate-fade-up` | `fade-up 1.2s cubic-bezier(0.22,1,0.36,1) both` | Hero text entry |
| `animate-slow-zoom` | `slow-zoom 20s ease-out both` | Hero background image |
| `Reveal` component | `opacity+translateY 1100ms cubic-bezier(0.22,1,0.36,1)` via IntersectionObserver | Section reveals |
| Nav scroll | Background transition `duration-500` at `scrollY > 40` | Nav blur/color |

---

## Shadows

| Class | Value | Usage |
|-------|-------|-------|
| CTA hover | `shadow-[0_14px_40px_-12px_var(--sun)]` | Primary CTA hover |
| Nav link hover | `shadow-[0_0_22px_-10px_var(--sun)]` | Nav item hover |
| Nav bar (scrolled) | `shadow-[0_1px_30px_-12px_rgba(0,0,0,0.25)]` | Scrolled nav |

---

## WordPress Token Mapping

When implementing the WP content model, these tokens are static (no CMS field needed):
- All colors are hardcoded in CSS
- Fonts are loaded at build time
- Animations are pure CSS/JS

The only token-level WP field that may vary per page is the **hero image** (background photo).
