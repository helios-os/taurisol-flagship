# Helios Governance Index

**Repository:** taurisol-flagship  
**Last updated:** 2026-06-09  
**Maintained by:** Helios OS / Markku Tauriainen  

This index is the authoritative registry of all governance documents in this repository. Agents must check this index before making architectural or process decisions.

---

## Governance Documents

| Document | Type | Status | Rules/Items |
|----------|------|--------|-------------|
| [HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md](HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md) | Behavioral rules | Active | 60 rules across 6 parts |
| [HELIOS_RULEBOOK_AUDIT_v1.md](HELIOS_RULEBOOK_AUDIT_v1.md) | Consistency audit | Active | Cross-reference vs postmortem + checklist |

---

## Technical Reference Documents

| Document | Type | Status |
|----------|------|--------|
| [../HELIOS_HYBRID_PUBLISHER_AGENT_POSTMORTEM_v1.md](../HELIOS_HYBRID_PUBLISHER_AGENT_POSTMORTEM_v1.md) | Post-mortem + agent blueprint | Active |
| [../HELIOS_WP_NEXT_DEPLOYMENT_GOLDEN_PATH_v1.md](../HELIOS_WP_NEXT_DEPLOYMENT_GOLDEN_PATH_v1.md) | Executable deployment checklist | Active |

---

## Document Hierarchy

```
HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md     ← WHY (principles, behavioral rules)
         │
         ├── HELIOS_HYBRID_PUBLISHER_AGENT_POSTMORTEM_v1.md  ← WHAT WENT WRONG (errors, fixes)
         │
         └── HELIOS_WP_NEXT_DEPLOYMENT_GOLDEN_PATH_v1.md     ← HOW (executable steps)
```

An agent using all three documents has:
- The principle layer (rulebook) — what governs decisions
- The technical layer (postmortem) — what the correct implementation looks like
- The execution layer (checklist) — what to do and in what order

---

## Rule Coverage by Document

| Rulebook Part | Postmortem Section | Golden Path Section |
|--------------|-------------------|---------------------|
| Part 1 — Reality First (001–010) | §13 Error Log | Phase 2–3 (slug audit, ACF verification) |
| Part 2 — Founder Intent (011–020) | §11 UI Requirements | — |
| Part 3 — UI Composition (021–030) | §11 UI Requirements | — |
| Part 4 — Mobile First (031–040) | §11.2 Agent Guardrails | Phase 9 Smoke Test |
| Part 5 — Content Publishing (041–050) | §7 Content Seeding, §8 Next.js | Phase 1–4 (CMS structure, seeding) |
| Part 6 — Operating Principles (051–060) | §14 Agent Specification | Phase 10 Documentation |

---

## Adding New Governance Documents

1. Create file in `docs/governance/`
2. Add entry to this index
3. Add entry to `docs/README.md` documentation table
4. Cross-reference any postmortem or technical docs that inform the new governance item
5. Commit with message: `docs(governance): add [document name]`
