# HELIOS OS FOUNDER DIARY

## Cornerstone Memo: Taurisol Flagship Site, Living Lab, Pricing & AI Crawlability

**Date:** 8–9 July 2026
**Project:** Taurisol / Helios OS
**Founder:** Markku Tauriainen
**Theme:** From published website to discoverable, indexable and AI-readable public asset

---

## 1. What happened

During the last two days, the already published Taurisol flagship website was taken through an important operational correction and learning loop.

The site had already been published, but two key public-facing sections needed to be added and stabilised:

- **Living Lab**
- **Pricing**

The first working day was partly lost in confusion, route issues and unclear implementation loops. The work only started to move properly when the instructions to Claude were tightened into precise, bounded loop prompts.

The important operational shift was this:

> Do not ask the coding agent to "improve the site".
> Ask it to fix one clearly defined production problem, verify it, report changed files, and stop.

With these tighter prompts, the Living Lab and Pricing sections were corrected, built and published.

---

## 2. The indexing problem

After the pages were live, a deeper issue was found in Google Search Console.

The Taurisol sitemap was not being fetched correctly. Search Console showed failed sitemap reads and zero or incomplete discovered pages.

At first, the question was whether the Search Console property had been created incorrectly because Taurisol was set up differently than BellaHelena.

BellaHelena used a URL-prefix property and showed the domain prefix automatically before the sitemap field.

Taurisol used a domain-style setup / www configuration, and the sitemap field behaved differently.

The conclusion:

> The Search Console setup itself was not the root problem.
> The real problem was in the sitemap, canonical domain, route structure and production configuration.

The site was resolving to:

```
https://www.taurisol.com/
```

while some sitemap/canonical assumptions still pointed inconsistently between:

```
https://taurisol.com
https://www.taurisol.com
```

There was also no working production sitemap or robots.txt initially.

---

## 3. What was fixed

Claude was instructed through a precise repair loop.

The fixes included:

- canonical production domain aligned to: `https://www.taurisol.com`
- sitemap generated at: `https://www.taurisol.com/sitemap.xml`
- robots.txt generated at: `https://www.taurisol.com/robots.txt`
- only real working public URLs included in the sitemap
- non-existing `/fi` route excluded
- private/invite-oriented `/intra` routes excluded from sitemap
- CMS journal articles excluded for now to avoid fragile live CMS-fetch logic
- canonical metadata and Open Graph URLs aligned to the www domain
- homepage tagline added as crawlable server-rendered HTML:

```
Some places you visit.
Some places you return to.
```

The final deployed commit was:

```
d093251 Fix indexing, sitemap, robots and AI crawlability
```

After deployment, production verification showed:

```
/sitemap.xml       OK
/robots.txt        OK
/llms.txt          OK
/llms-full.txt     OK
```

Google Search Console then successfully read the sitemap:

```
Status: Success
Discovered pages: 21
```

Three main pages were also manually submitted for indexing:

```
https://www.taurisol.com/
https://www.taurisol.com/pricing
https://www.taurisol.com/living-lab
```

---

## 4. AI visibility layer

During the same process, a second layer was added: AI crawlability and LLM discoverability.

This included:

```
https://www.taurisol.com/llms.txt
https://www.taurisol.com/llms-full.txt
```

The purpose was to give AI systems a clean, factual understanding of Taurisol.

The llms files define:

- what Taurisol is
- what it is not
- preferred description
- important public URLs
- key positioning
- guardrails against wrong descriptions

The important insight:

> AI visibility is not magic.
> It starts with clean crawlable text, consistent metadata, working sitemap, robots.txt and a factual llms.txt guide.

This became the foundation for a reusable Helios OS prompt.

---

## 5. The universal Helios OS prompt created

From this work, a reusable prompt was created:

```
HELIOS OS — AI CRAWLABILITY & INDEXING AUDIT v1
```

Its purpose is to let Markku copy-paste a standard audit prompt into Claude inside any repo and quickly check:

- route existence
- canonical domain consistency
- sitemap availability
- robots.txt rules
- llms.txt
- llms-full.txt
- homepage crawlable text
- metadata
- Open Graph
- hreflang
- JSON-LD risk
- build health
- post-deploy verification

This should become a standard Helios OS pre-deploy and post-deploy tool.

---

## 6. Key operational learning

The central learning from the last two days:

> A site is not production-ready when it looks ready.
> A site is production-ready when it is crawlable, indexable, canonical, explainable and verifiable.

For Helios OS, this means every future website delivery must include a launch checklist:

```
1. Canonical domain decided
2. Apex/www redirect verified
3. Sitemap returns 200
4. Sitemap contains only real public URLs
5. robots.txt returns 200
6. robots.txt references sitemap
7. llms.txt returns 200
8. llms-full.txt returns 200 if used
9. Homepage contains crawlable core positioning
10. Metadata and Open Graph are aligned
11. Private/admin/intra routes excluded from sitemap
12. Google Search Console sitemap submitted
13. Main pages submitted via URL inspection
14. Post-deploy check documented
```

This is now a Helios OS governance-first publishing rule.

---

## 7. Strategic meaning

This was more than a technical bug fix.

It showed how Helios OS should operate:

- founder sees the business risk
- AI assistant diagnoses and frames
- Claude executes bounded repo tasks
- every loop ends with build, report and verification
- no uncontrolled code changes
- no vague "make it better" prompts
- every correction becomes a reusable operating asset

The Taurisol work created a real production lesson:

> Every Helios OS web delivery needs an AI/search visibility preflight before launch.

This is not optional.
It is part of the operating system.

---

## 8. Founder note

The Taurisol site now moved from "published" to "discoverable".

That difference matters.

The Living Lab and Pricing pages make the concept commercially understandable.
The sitemap and robots fix make it technically visible.
The llms files make it easier for AI systems to describe Taurisol correctly.

This is exactly the kind of small but decisive operational layer that separates random website building from Helios OS.

Doing is the highest form of talking.

---

## 9. Final principle

**Helios OS Publishing Rule v1:**

> Before any public website is considered launched, it must pass the Indexing & AI Crawlability Check.

A public page must be:

- visible to humans
- visible to Google
- visible to AI crawlers
- consistent in canonical identity
- safe in metadata
- clear in positioning
- verified after deployment

Only then is it truly published.
