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
| [WORDPRESS_CONTENT_MODEL.md](WORDPRESS_CONTENT_MODEL.md) | ACF field definitions (planned schema — see postmortem for actual) |
| [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) | Deploy to Vercel |
| [KNOWN_ISSUES.md](KNOWN_ISSUES.md) | Deviations and limitations |
| [MIGRATION_COMPLETION_REPORT.md](MIGRATION_COMPLETION_REPORT.md) | Final migration report |

## Integration & Deployment

| Document | Description |
|---------|-------------|
| [HELIOS_HYBRID_PUBLISHER_AGENT_POSTMORTEM_v1.md](HELIOS_HYBRID_PUBLISHER_AGENT_POSTMORTEM_v1.md) | Full WP→Next integration post-mortem and agent blueprint |
| [HELIOS_WP_NEXT_DEPLOYMENT_GOLDEN_PATH_v1.md](HELIOS_WP_NEXT_DEPLOYMENT_GOLDEN_PATH_v1.md) | Executable deployment checklist (16 phases, 8 common failure modes) |
| [CMS_CONNECTION_STATUS.md](CMS_CONNECTION_STATUS.md) | Live CMS endpoint verification status |

## Governance

| Document | Description |
|---------|-------------|
| [governance/HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md](governance/HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md) | 60 behavioral rules governing all Helios OS agents |
| [governance/HELIOS_GOVERNANCE_INDEX.md](governance/HELIOS_GOVERNANCE_INDEX.md) | Governance registry and document hierarchy |
| [governance/HELIOS_RULEBOOK_AUDIT_v1.md](governance/HELIOS_RULEBOOK_AUDIT_v1.md) | Consistency audit: rulebook vs postmortem vs checklist |

---

## Source

Original Lovable export preserved at `migration-source/lovable-export/` — treat as immutable reference.

Helios OS deployment pipeline verified.
