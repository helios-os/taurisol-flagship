# Helios Rulebook Consistency Audit v1

**Date:** 2026-06-09  
**Audited documents:**
- `docs/governance/HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md` (60 rules)
- `docs/HELIOS_HYBRID_PUBLISHER_AGENT_POSTMORTEM_v1.md` (16 sections)
- `docs/HELIOS_WP_NEXT_DEPLOYMENT_GOLDEN_PATH_v1.md` (10 phases)

**Audit method:** Manual cross-reference. Each rulebook part mapped against postmortem sections and checklist phases. Gaps, overlaps, and structural observations recorded.

---

## Verdict Summary

| Category | Count | Action required |
|----------|-------|----------------|
| Genuine conflicts | 0 | None |
| Expected overlaps (complementary layers) | 8 | None — by design |
| Near-duplicate rules within rulebook | 3 pairs | None — distinction is intentional (noted below) |
| Gaps: rules with no postmortem anchor | 3 groups | Proposed additions to postmortem (see §3) |
| Gaps: postmortem findings with no rule | 1 | Proposed new rule (see §4) |
| Missing cross-references between docs | 3 | Proposed link additions (see §5) |

**No existing file should be modified without founder approval. All proposed changes are listed in §3–5 below.**

---

## 1. Genuine Conflicts

**None found.**

The three documents occupy different abstraction levels and do not contradict each other:

- Rulebook = WHY (governing principles)
- Postmortem = WHAT (technical record, correct implementations)
- Golden Path = WHEN and HOW (executable sequence)

A conflict would exist if, for example, a postmortem section recommended `return true` as a safe default when Rule 042 prohibits losing content through integration assumptions. No such inversion was found.

---

## 2. Overlaps — Complementary, Expected

These overlaps are intentional and correct. The same principle appears in different forms at different layers. This is the design.

### 2.1 ACF field assumptions

| Layer | Location | Form |
|-------|----------|------|
| Rulebook | Rules 002, 007 | "Never assume field structures. Never assume ACF field names." |
| Postmortem | §13.1 | Concrete failure: assumed `journal_post`, actual was `blog_post` |
| Golden Path | Phase 3 | Executable step: fetch, inspect JSON, confirm `acf.blog_post` key before coding |

**Assessment:** Three levels of the same truth. All three are required.

### 2.2 Slug auditing

| Layer | Location | Form |
|-------|----------|------|
| Rulebook | Rule 009 | "Never assume slug conventions. Audit all slugs first." |
| Postmortem | §13.5 | Concrete failure: WP slug `design-en` vs. app slug `design` |
| Golden Path | Phase 2 | Executable step: extract slugs from REST, compare against constants |

**Assessment:** Correct layering.

### 2.3 Content filter safety

| Layer | Location | Form |
|-------|----------|------|
| Rulebook | Rules 042, 047 | "Never lose content from assumptions. Fallbacks mandatory." |
| Postmortem | §13.4, §8.2 | `return true` leaked foreign posts; `return false` is the safety gate |
| Golden Path | Phase 5 | "Fallback: `return false` (NEVER `return true`)" |

**Assessment:** Rule 042 and 047 are the governance; the postmortem is the evidence; the checklist is the enforcement.

### 2.4 Overlay vs. sidebar

| Layer | Location | Form |
|-------|----------|------|
| Rulebook | Rules 016, 017 | "'Overlay' means overlay. Not sidebar." |
| Postmortem | §11.1, §13.7 | Concrete failure: brief said overlay, code produced two-column grid |

**Assessment:** Rule 016 is the permanent principle; §11.1 is the historical record.

### 2.5 Mobile layout

| Layer | Location | Form |
|-------|----------|------|
| Rulebook | Rules 031–033 | Test on mobile. Desktop success ≠ mobile success. No scroll in mobile menu. |
| Postmortem | §11.1 | Mobile hero scroll, mobile menu overflow failures documented |
| Golden Path | Phase 9 | Mobile 390×844 smoke test items |

**Assessment:** Correct layering.

### 2.6 CMS outage survival

| Layer | Location | Form |
|-------|----------|------|
| Rulebook | Rules 045, 046, 047 | Survive missing content, CMS outages, fallbacks mandatory |
| Postmortem | §8.4 | ISR build safety, `notFound()` for article routes |
| Golden Path | Phase 5 | "no-throw" WordPress client requirement |

**Assessment:** All three needed.

### 2.7 Production verification

| Layer | Location | Form |
|-------|----------|------|
| Rulebook | Rule 010 | "A deployment is not complete until production has been verified." |
| Postmortem | §12 | Full smoke test checklist (17 routes + content + SEO checks) |
| Golden Path | Phase 9 | Executable smoke test list |

**Assessment:** Rule 010 is the principle; the postmortem/checklist provide the implementation.

### 2.8 Document lessons immediately

| Layer | Location | Form |
|-------|----------|------|
| Rulebook | Rule 056 | "Document lessons immediately." |
| Postmortem | (the document itself) | Written on the same day as the sprint |

**Assessment:** The postmortem is proof of Rule 056 in action.

---

## 3. Gaps — Rules With No Postmortem or Checklist Anchor

These rules exist in the rulebook but have no corresponding section in either technical document. They are underrepresented at the operational level.

### 3.1 Founder intent rules (011–015, 018–020) — no postmortem section

**Rules:** 011 (intent overrides interpretation), 012 (repair not redesign), 013 (only requested scope), 014 (no extra features), 015 (no reinterpretation), 018 (match the reference), 019 (study reference first), 020 (copy proven patterns)

**Current postmortem coverage:** §11.1 documents the sidebar/overlay failure (Rules 016, 017 specifically) but does not document the broader pattern of agents expanding scope or reinterpreting instructions. The failures that generated Rules 011–015 are implied but not recorded.

**Proposed addition to postmortem §11.1:** One paragraph explicitly recording instances of scope drift — where the agent added unrequested features or reinterpreted a brief — to anchor Rules 011–015 in project history.

**Status:** Pending founder approval before modifying postmortem.

### 3.2 UI composition rules (021–030) — partial postmortem coverage

**Rules:** 023–030 are partially reflected in postmortem §11.2 guardrail table, but Rules 023 (hierarchy follows business goals), 025 (article cards dominate for discovery), 026 (hero supports content), 027 (large hero must justify screen usage) have no explicit guardrail entry.

**Current coverage:** Postmortem §11.1 mentions "Article category page top padding" (Rule 027), but the underlying principle (hero supports content, not dominates) is not stated.

**Proposed addition to postmortem §11.2:** Add three rows to the agent guardrails table:
- Rule 026: "Hero sections must not prevent users from reaching article content on first scroll"
- Rule 027: "Hero height must be justified — calculate available viewport height before choosing `min-h`"
- Rule 025: "If the page goal is article discovery, article cards must be visible on first load"

**Status:** Pending founder approval.

### 3.3 Operating principles (051–060) — no operational anchor

**Rules:** 051–060 are meta-principles about how Helios OS operates. None of them have a corresponding section in either the postmortem or the checklist.

**Assessment:** These principles are intentionally abstract. They do not need individual postmortem sections. However, they should appear as a header/preamble in the golden path checklist, so an agent reading only the checklist understands that a governance layer exists above it.

**Proposed addition to golden path:** Add a single line in the introduction: "This checklist implements the operational requirements of HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md (Rules 001–060). When in doubt about a decision not covered by this checklist, apply the rulebook."

**Status:** Pending founder approval.

---

## 4. Gaps — Postmortem Findings With No Rule

### 4.1 Smart quote / encoding corruption (Postmortem §13.8)

**Postmortem documents:** The Edit tool occasionally replaced straight double-quotes (`"`) with typographic quotes (`"` / `"`, U+201C/U+201D) inside TypeScript string literals, causing build failures.

**Missing rule:** There is no rulebook principle about validating automated file edits before committing.

**Proposed new rule:**

> **Rule 061 — Validate automated edits before committing**
>
> Automated file edits can introduce invisible encoding errors. Before committing any agent-generated change to source code, verify that no typographic or non-ASCII characters were introduced into string literals, import paths, or configuration values.
>
> Applies to: TypeScript, JSON, YAML, any file that must pass a parser or type checker.

**Status:** Proposed, pending founder approval. If approved, adds to Part 6 (Operating Principles) or creates a new Part 7 (Tooling Safety).

### 4.2 Pagination at scale (Postmortem §5.3)

**Postmortem documents:** `per_page=100` is a hard ceiling. If a project publishes more than 100 articles, the current client silently misses them.

**Missing rule:** No principle about building for realistic future scale vs. current state.

**Proposed new rule:**

> **Rule 062 — Build for next order of magnitude**
>
> Do not build integrations that silently fail when content volume grows. If a fetch has a hard limit, document it, add pagination, or add a visible warning.

**Status:** Proposed, pending founder approval.

---

## 5. Missing Cross-References Between Documents

These are documentation gaps only — no logic or code is affected. Proposed as low-priority improvements to reduce navigation friction for agents reading the docs.

### 5.1 Rulebook rule index: no postmortem cross-reference

The rulebook's Rule Index table (60 rows) does not show which postmortem section first validated each rule. An agent can infer the connection but must search manually.

**Proposed addition:** Add a fourth column `First validated` to the rulebook's Rule Index table. Example:
```
| 002 | Reality First | Never assume field structures | Postmortem §13.1 |
| 009 | Reality First | Audit slugs before assuming   | Postmortem §13.5 |
| 016 | Founder Intent | Overlay means overlay         | Postmortem §11.1 |
```

**Status:** Pending founder approval.

### 5.2 Golden path: no rulebook reference

The golden path checklist is self-contained. An agent using only the checklist has no indication that a governing rulebook exists.

**Proposed addition to golden path introduction:** One line pointing to the rulebook, e.g.:
> "Governing principles: `docs/governance/HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md`"

**Status:** Pending founder approval.

### 5.3 Postmortem: no rulebook reference

The postmortem was written before the rulebook. Its §14 (Agent Specification) defines decision rules for a future agent but does not reference the rulebook as the authoritative source of those rules.

**Proposed addition to postmortem §14.1 Agent Identity:** Add line:
> "Behavioral governance: `docs/governance/HELIOS_FOUNDER_INTENT_RULEBOOK_v1.md`"

**Status:** Pending founder approval.

---

## 6. Near-Duplicate Rules Within the Rulebook

These pairs are similar enough to warrant documentation of their intentional distinction.

### 6.1 Rules 001 and 004

| Rule | Text |
|------|------|
| 001 | Production reality is always more trustworthy than documentation. |
| 004 | If documentation and production disagree, production wins. |

**Distinction:** Rule 001 is a standing preference — default to production data over docs in all cases. Rule 004 is a conflict-resolution rule — when an explicit contradiction is encountered, production is the tiebreaker. Both are needed: one sets general orientation, the other resolves a specific decision point.

### 6.2 Rules 005 and 006

| Rule | Text |
|------|------|
| 005 | Inspect first. Implement second. |
| 006 | Never write integration code before validating live data. |

**Distinction:** Rule 005 is a general workflow principle (inspect any system before acting on it). Rule 006 is the specific application to integration code with live data systems (REST APIs, CMSes). Rule 005 governs file edits, UI reviews, architecture decisions; Rule 006 governs only code that reads from external data sources.

### 6.3 Rules 005/052 pair

| Rule | Text |
|------|------|
| 005 | Inspect first. Implement second. |
| 052 | Verify before assuming. |

**Distinction:** Rule 005 is a workflow sequencing rule (do the inspection step before the coding step). Rule 052 is epistemological (when you don't know something, verify rather than assume). Rule 052 applies in all contexts including non-technical decisions; Rule 005 is specifically about implementation sequences.

---

## 7. Structural Observations

### 7.1 The three documents are coherent

The rulebook, postmortem, and golden path form a complete governance stack. No critical principle is absent from all three. No document contradicts another.

### 7.2 The rulebook is source of truth for behavior

Any future agent or Claude Code session should load the rulebook before making any implementation decision. The postmortem and checklist are reference material; the rulebook governs behavior.

### 7.3 Rules 011–020 are the least anchored

Part 2 (Founder Intent, Rules 011–020) is the hardest to verify operationally because the failures it addresses are about interpretation, not technical errors. An agent can confirm Rule 007 (no assumed ACF field names) by running a grep. It cannot confirm Rule 012 (repair not redesign) without understanding the original intent.

**Implication:** These rules are the most important to enforce proactively, because they cannot be detected in the output — only in the process. An agent that redesigns when asked to repair will produce a technically correct result that violates founder intent. The agent must internalize Rules 011–020, not just check them at the end.

### 7.4 The rulebook has no enforcement mechanism yet

Rules are stated. There is no current tooling that verifies compliance (no pre-commit hook, no agent self-check). The governance relies on the agent reading and internalizing the rulebook.

**Future work:** A Helios OS agent could include a rulebook check as a pre-implementation step: "Before submitting this change, verify it does not violate any of Rules 001–060."

---

## Audit Sign-Off

| Item | Status |
|------|--------|
| Conflicts found | None |
| Overlaps requiring resolution | None |
| Proposed postmortem additions | 3 (§3.1, §3.2, §3.3) — awaiting approval |
| Proposed new rules | 2 (Rules 061, 062) — awaiting approval |
| Proposed cross-reference additions | 3 (§5.1, §5.2, §5.3) — awaiting approval |
| Documents requiring immediate change | None |

All existing documents are internally consistent and can be used in their current state. Proposed changes are improvements, not corrections.
