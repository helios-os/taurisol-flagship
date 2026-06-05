# COMPONENT_MAP

## Source: Lovable export — taurisol-flagship-main

---

## Page Structure

Single-page application. One route (`/`). All sections rendered in sequence with anchor navigation.

### Section Order

| # | Component | Section ID | Next.js file |
|---|-----------|-----------|--------------|
| — | Nav | — | `components/nav/Nav.tsx` |
| 1 | Hero | `#top` | `components/sections/Hero.tsx` |
| 2 | Problem | `#problem` | `components/sections/Problem.tsx` |
| 3 | Outcome | `#homes` | `components/sections/Outcome.tsx` |
| 4 | Pillars | `#philosophy` | `components/sections/Pillars.tsx` |
| 5 | Why | `#how` | `components/sections/Why.tsx` |
| 6 | Location | `#location` | `components/sections/Location.tsx` |
| 7 | Winters | — | `components/sections/Winters.tsx` |
| 8 | Trust | — | `components/sections/Trust.tsx` |
| 9 | Audience | `#audience` | `components/sections/Audience.tsx` |
| 10 | TaurisolOne | `#one` | `components/sections/TaurisolOne.tsx` |
| — | Footer | `#faq` | `components/footer/Footer.tsx` |
| — | ScrollToTop | — | `components/ui/ScrollToTop.tsx` |

---

## Navigation

### Desktop Nav Links
| Key | Label (EN) | Label (FI) | Anchor |
|-----|-----------|-----------|--------|
| philosophy | Philosophy | Filosofia | `#philosophy` |
| how | How It Works | Miten se toimii | `#how` |
| homes | Homes | Kodit | `#homes` |
| location | Location | Sijainti | `#location` |
| one | Taurisol One | Taurisol One | `#one` |
| faq | FAQ | UKK | `#faq` |

### CTA Buttons
| Location | Text (EN) | URL | Behavior |
|----------|----------|-----|----------|
| Nav desktop | Discover Taurisol | `#philosophy` | Anchor scroll |
| Nav mobile | Start Taurisol One | `https://one.taurisol.com/` | External, new tab |
| Hero primary | Discover Taurisol | `#philosophy` | Anchor scroll |
| Hero secondary | Start Taurisol One | `https://one.taurisol.com/` | External, new tab |
| Location | Start Taurisol One | `https://one.taurisol.com/` | External, new tab |
| Winters | Explore the possibility | `#audience` | Anchor scroll |
| Audience | Start Taurisol One | `https://one.taurisol.com/` | External, new tab |
| TaurisolOne | Start Taurisol One | `https://one.taurisol.com/` | External, new tab |
| Footer | Discover Taurisol | `#philosophy` (implied) | Anchor |

---

## i18n

| System | Languages | Mechanism |
|--------|-----------|-----------|
| LangContext | EN / FI | React Context, client-side only |
| Default lang | EN | Set in LangProvider initial state |
| Switch UI | Flag icons (SVG) in Nav | EN = UK flag, FI = Finnish flag |
| Content | `src/lib/i18n.ts` → `content` object | Flat key-value pairs per section |

---

## Static Assets

| File | Used in | Notes |
|------|---------|-------|
| `hero-andalusia.jpg` | Hero | Main hero background, parallax scroll |
| `outcome-terrace.jpg` | Outcome | Sticky side image |
| `winters.jpg` | Winters | Background image with overlay |
| `olive-detail.jpg` | Why | Editorial image alongside tech cards |
| `montefrio-countryside.webp` | Location | **NOT in ZIP binary** — Lovable CDN asset pointer only. See KNOWN_ISSUES.md |

---

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Serif display | Cormorant Garamond | 300, 400, 500, 600, 400 italic | h1, h2, h3, h4, large body |
| Sans body | Inter | 300, 400, 500, 600 | body, captions, nav labels |

Font loading: Google Fonts `@import url(...)` in Lovable → `next/font/google` in Next.js

---

## Colors (Design Tokens)

| Token | CSS Variable | Value (oklch) | Role |
|-------|-------------|---------------|------|
| sand-light | `--sand-light` | `oklch(0.972 0.012 85)` | Background, lightest |
| sand | `--sand` | `oklch(0.918 0.028 82)` | Hover states, sections |
| stone-warm | `--stone-warm` | `oklch(0.835 0.034 75)` | Dividers |
| olive | `--olive` | `oklch(0.55 0.055 115)` | Accents, eyebrows |
| olive-deep | `--olive-deep` | `oklch(0.32 0.04 115)` | Primary text accent |
| sun | `--sun` | `oklch(0.71 0.08 82)` | Gold CTA (#C8A15A approx) |
| sun-deep | `--sun-deep` | `oklch(0.65 0.075 80)` | CTA hover |
| sun-soft | `--sun-soft` | `oklch(0.78 0.075 84)` | CTA hover glow |
| olive-night | `--olive-night` | `oklch(0.15 0.012 110)` | Footer background |
| shadow-deep | `--shadow-deep` | `oklch(0.22 0.025 90)` | Dark text, Outcome bg |

---

## Animations

| Name | Type | Used in |
|------|------|---------|
| `animate-fade-up` | CSS keyframe (opacity 0→1, Y 20→0, 1.2s) | Hero text block |
| `animate-slow-zoom` | CSS keyframe (scale 1.05→1.12, 20s) | Hero background image |
| `Reveal` component | IntersectionObserver (opacity/Y, 1100ms) | Why, Location, Trust, Audience |
| Hero parallax | `window.scrollY * 0.25` translate Y | Hero background |
| Nav scroll | `useScrolled(40)` → class change | Nav background/padding |
| ScrollToTop | `window.scrollY > 600` show/hide | Floating button |

---

## Responsive Breakpoints (Tailwind defaults)

| Prefix | Min-width | Usage |
|--------|-----------|-------|
| `md:` | 768px | Main layout switches (grid cols, font sizes) |
| `lg:` | 1024px | Nav desktop visibility, large font steps |

---

## React Component Client Boundary Map

| Component | Directive | Reason |
|-----------|-----------|--------|
| LangContext | `"use client"` | useState |
| Nav | `"use client"` | useState, useEffect, useScrolled |
| Hero | `"use client"` | useEffect, scroll listener |
| Reveal | `"use client"` | useEffect, IntersectionObserver |
| ScrollToTop | `"use client"` | useEffect, scroll listener |
| Problem | Server component | No hooks, reads lang from prop |
| Outcome | Server component | No hooks |
| Pillars | Server component | No hooks |
| Why | Client component (uses Reveal) | Reveal is client |
| Location | Client component (uses Reveal) | Reveal is client |
| Trust | Client component (uses Reveal) | Reveal is client |
| Audience | Client component (uses Reveal) | Reveal is client |
| Winters | Server component | No hooks |
| TaurisolOne | Server component | No hooks |
| Footer | Server component | No hooks |

Note: Because LangContext is client-side only, all components that call `useLang()` must be wrapped or be client components. Strategy: wrap the entire page in `LangProvider` (client), pass lang down via props OR keep components using `useLang()` as client components.

**Decision:** All section components that call `useLang()` receive `"use client"` directive. This is the simplest faithful conversion.
