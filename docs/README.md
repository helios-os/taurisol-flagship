# taurisol-flagship

Next.js + WordPress Headless implementation of the Taurisol flagship site.

Migrated from Lovable (TanStack Start) using the Helios OS template `HLX_LOVABLE_TO_NEXT_WP_v1`.

---

## Project Structure

```
taurisol-flagship/
├── apps/
│   └── web/                  Next.js 15, App Router, TypeScript
├── packages/
│   ├── ui/                   Design tokens (TypeScript)
│   └── content-model/        WordPress ACF content model
├── docs/                     Full migration documentation
└── migration-source/
    └── lovable-export/       Original Lovable export (immutable)
```

---

## Getting Started

```bash
cd apps/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build

```bash
cd apps/web
npm run build
npm start
```

---

## Documentation

| Document | Description |
|---------|-------------|
| [LOVABLE_IMPORT_REPORT.md](LOVABLE_IMPORT_REPORT.md) | Source validation |
| [COMPONENT_MAP.md](COMPONENT_MAP.md) | All sections, anchors, i18n, assets |
| [DESIGN_TOKENS.md](DESIGN_TOKENS.md) | Colors, typography, spacing |
| [WORDPRESS_CONTENT_MODEL.md](WORDPRESS_CONTENT_MODEL.md) | ACF field definitions |
| [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) | Deploy to Vercel |
| [KNOWN_ISSUES.md](KNOWN_ISSUES.md) | Deviations and limitations |
| [MIGRATION_COMPLETION_REPORT.md](MIGRATION_COMPLETION_REPORT.md) | Final migration report |

---

## Source

Original Lovable export preserved at `migration-source/lovable-export/` — treat as immutable reference.
