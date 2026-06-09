# Helios Founder Intent Rulebook v1.0

**Classification:** Governance — Permanent Operational Intelligence  
**Authority:** Founder (Markku Tauriainen)  
**Status:** Active  
**Version:** 1.0  
**Date:** 2026-06-09  
**Supersedes:** Nothing (inaugural document)  
**Applies to:** All Helios OS agents, Claude Code sessions, and automated publishing pipelines  

**Related documents:**
- `docs/HELIOS_HYBRID_PUBLISHER_AGENT_POSTMORTEM_v1.md` — Technical post-mortem (Taurisol WP→Next integration)
- `docs/HELIOS_WP_NEXT_DEPLOYMENT_GOLDEN_PATH_v1.md` — Executable deployment checklist
- `docs/governance/HELIOS_GOVERNANCE_INDEX.md` — Governance registry

---

## Purpose

This document converts tacit founder knowledge into permanent operational intelligence.

It is **not** a technical specification.

It is a set of behavioral rules that govern how Helios OS agents make decisions before, during, and after implementation.

These rules exist because repeated AI failure patterns emerged during real-world projects. Each rule addresses a failure mode that cost time, caused incorrect outputs, or required rework.

**When a rule conflicts with an agent's default behavior, the rule wins.**

---

## PART 1 — REALITY FIRST

*Govern how agents treat data sources, documentation, and assumptions.*

---

**Rule 001**

Production reality is always more trustworthy than documentation.

---

**Rule 002**

Never assume field structures.

Verify actual REST API responses first.

---

**Rule 003**

Never trust schema documentation until production data confirms it.

---

**Rule 004**

If documentation and production disagree, production wins.

---

**Rule 005**

Inspect first. Implement second.

---

**Rule 006**

Never write integration code before validating live data.

---

**Rule 007**

Do not assume ACF field names.

Read actual JSON.

---

**Rule 008**

Do not assume parent-child relationships.

Verify actual IDs.

---

**Rule 009**

Never assume slug conventions.

Audit all slugs first.

---

**Rule 010**

A deployment is not complete until production has been verified.

---

## PART 2 — FOUNDER INTENT

*Govern how agents interpret and execute instructions.*

---

**Rule 011**

Founder intent overrides aesthetic interpretation.

---

**Rule 012**

When asked to repair, repair.

Do not redesign.

---

**Rule 013**

When asked to improve, improve only the requested scope.

---

**Rule 014**

Do not invent additional features.

---

**Rule 015**

Do not reinterpret visual instructions.

---

**Rule 016**

"Overlay" means overlay.

Not sidebar.  
Not adjacent panel.  
Not alternative layout.

---

**Rule 017**

"On top of image" means on top of image.

---

**Rule 018**

"Match the reference" means match the reference.

Not reinterpret the reference.

---

**Rule 019**

Reference implementations exist for a reason.

Study them before building alternatives.

---

**Rule 020**

Copy proven patterns before creating new patterns.

---

## PART 3 — UI COMPOSITION

*Govern how agents make visual and layout decisions.*

---

**Rule 021**

A successful existing UI is preferred over a theoretically better UI.

---

**Rule 022**

Consistency beats originality.

---

**Rule 023**

Visual hierarchy must match business goals.

---

**Rule 024**

Important content must receive the most visual attention.

---

**Rule 025**

If article discovery is the goal, article cards must dominate.

---

**Rule 026**

Hero sections support content.

They do not replace content.

---

**Rule 027**

Large hero areas must justify their screen usage.

---

**Rule 028**

Users should reach meaningful content quickly.

---

**Rule 029**

Reduce friction before adding decoration.

---

**Rule 030**

Elegant simplicity is preferred over complexity.

---

## PART 4 — MOBILE FIRST EXECUTION

*Govern how agents handle mobile layout and interaction.*

---

**Rule 031**

Every implementation must be tested on mobile.

---

**Rule 032**

Desktop success does not imply mobile success.

---

**Rule 033**

No mobile menu should require unnecessary scrolling.

---

**Rule 034**

Primary actions must remain visible.

---

**Rule 035**

Text must remain readable over images.

---

**Rule 036**

Touch targets must be easily accessible.

---

**Rule 037**

Mobile navigation must prioritize clarity.

---

**Rule 038**

Every mobile screen has limited attention.

Respect it.

---

**Rule 039**

Reduce visual clutter.

---

**Rule 040**

Mobile users should never need to hunt for navigation.

---

## PART 5 — CONTENT PUBLISHING

*Govern how agents handle CMS integration, content flow, and publication.*

---

**Rule 041**

Content is the asset.

Infrastructure exists to serve content.

---

**Rule 042**

Never lose content because of integration assumptions.

---

**Rule 043**

Validate publication flow before scaling publication flow.

---

**Rule 044**

One successful article is worth more than ten theoretical workflows.

---

**Rule 045**

Publishing systems must survive missing content.

---

**Rule 046**

Publishing systems must survive CMS outages.

---

**Rule 047**

Fallbacks are mandatory.

---

**Rule 048**

Translation relationships must be verified.

---

**Rule 049**

SEO metadata is part of publishing.

Not an afterthought.

---

**Rule 050**

Publishing is complete only when users can find, read and navigate content.

---

## PART 6 — HELIOS OPERATING PRINCIPLES

*Govern how Helios OS and its agents operate as a system.*

---

**Rule 051**

Observe before acting.

---

**Rule 052**

Verify before assuming.

---

**Rule 053**

Build before optimizing.

---

**Rule 054**

Simplify before expanding.

---

**Rule 055**

Measure before concluding.

---

**Rule 056**

Document lessons immediately.

---

**Rule 057**

Every failure contains reusable intelligence.

---

**Rule 058**

Convert recurring failures into permanent rules.

---

**Rule 059**

Protect founder knowledge.

---

**Rule 060**

Systems improve when lessons become process.

---

## Final Principle

The mission of Helios OS is not to generate code.

The mission of Helios OS is to consistently transform founder intent into working reality with the minimum possible loss of meaning between vision and execution.

---

## Rule Index

| Rule | Part | Title |
|------|------|-------|
| 001 | Reality First | Production data over documentation |
| 002 | Reality First | Never assume field structures |
| 003 | Reality First | Never trust schema until confirmed |
| 004 | Reality First | Production wins over documentation |
| 005 | Reality First | Inspect first, implement second |
| 006 | Reality First | No integration code before live data validated |
| 007 | Reality First | Do not assume ACF field names |
| 008 | Reality First | Do not assume parent-child IDs |
| 009 | Reality First | Audit slugs before assuming |
| 010 | Reality First | Deployment not complete until production verified |
| 011 | Founder Intent | Intent overrides interpretation |
| 012 | Founder Intent | Repair, not redesign |
| 013 | Founder Intent | Improve only requested scope |
| 014 | Founder Intent | Do not invent features |
| 015 | Founder Intent | Do not reinterpret visual instructions |
| 016 | Founder Intent | Overlay means overlay |
| 017 | Founder Intent | On top of image means on top of image |
| 018 | Founder Intent | Match the reference exactly |
| 019 | Founder Intent | Study reference before building alternatives |
| 020 | Founder Intent | Copy proven patterns first |
| 021 | UI Composition | Existing success over theoretical improvement |
| 022 | UI Composition | Consistency beats originality |
| 023 | UI Composition | Visual hierarchy follows business goals |
| 024 | UI Composition | Important content gets most visual attention |
| 025 | UI Composition | Article cards dominate when discovery is the goal |
| 026 | UI Composition | Hero supports content, not replaces it |
| 027 | UI Composition | Large hero must justify screen usage |
| 028 | UI Composition | Users reach content quickly |
| 029 | UI Composition | Reduce friction before adding decoration |
| 030 | UI Composition | Simplicity over complexity |
| 031 | Mobile First | Test on mobile, always |
| 032 | Mobile First | Desktop success ≠ mobile success |
| 033 | Mobile First | No unnecessary scroll in mobile menu |
| 034 | Mobile First | Primary actions visible |
| 035 | Mobile First | Text readable over images |
| 036 | Mobile First | Touch targets accessible |
| 037 | Mobile First | Nav prioritizes clarity |
| 038 | Mobile First | Respect limited mobile attention |
| 039 | Mobile First | Reduce clutter |
| 040 | Mobile First | Navigation always findable |
| 041 | Publishing | Content is the asset |
| 042 | Publishing | No content loss from integration assumptions |
| 043 | Publishing | Validate before scaling |
| 044 | Publishing | One live article beats ten workflows |
| 045 | Publishing | Survive missing content |
| 046 | Publishing | Survive CMS outages |
| 047 | Publishing | Fallbacks mandatory |
| 048 | Publishing | Verify translation relationships |
| 049 | Publishing | SEO is part of publishing |
| 050 | Publishing | Complete when users can find and read |
| 051 | Operating | Observe before acting |
| 052 | Operating | Verify before assuming |
| 053 | Operating | Build before optimizing |
| 054 | Operating | Simplify before expanding |
| 055 | Operating | Measure before concluding |
| 056 | Operating | Document lessons immediately |
| 057 | Operating | Every failure contains intelligence |
| 058 | Operating | Failures become rules |
| 059 | Operating | Protect founder knowledge |
| 060 | Operating | Systems improve when lessons become process |

---

## Governance Metadata

| Field | Value |
|-------|-------|
| Rule count | 60 |
| Parts | 6 + Final Principle |
| Source project | Taurisol WP→Next integration sprint, 2026-06-09 |
| First audit | See `docs/governance/HELIOS_RULEBOOK_AUDIT_v1.md` |
| Next review | After second full integration sprint |
| Version history | v1.0 — inaugural, all 60 rules |
