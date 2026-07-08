"use client";

import Image from "next/image";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { pricingContent, type PricingLang } from "./content";

const eyebrowClass = "text-xs uppercase tracking-[0.35em] text-olive";
const headingClass = "font-serif text-2xl leading-[1.15] text-shadow text-balance md:text-5xl";
const bodyClass = "text-base font-light leading-relaxed text-shadow/75 md:text-lg";
const panelClass =
  "rounded-[28px] border-2 border-olive-deep/15 bg-sand p-8 shadow-[0_30px_70px_-40px_rgba(40,30,10,0.35)] md:p-14";
const primaryCta =
  "group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-[10px] bg-sun px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-shadow transition-all duration-300 hover:bg-sun-soft hover:shadow-[0_14px_40px_-12px_var(--sun)] hover:-translate-y-0.5";
const secondaryCta =
  "group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-[10px] border border-sun/70 px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-shadow transition-all duration-300 hover:border-sun hover:bg-sun/[0.08] hover:shadow-[0_0_28px_-10px_var(--sun)] hover:-translate-y-0.5";

const heroLineClass = {
  lead: "font-serif text-xl italic leading-relaxed text-olive-deep md:text-2xl",
  body: bodyClass,
  medium: "text-base font-medium text-shadow/85 md:text-lg",
  strong: "font-serif text-xl italic leading-relaxed text-olive-deep md:text-2xl",
} as const;

export default function PricingPage({ lang }: { lang: PricingLang }) {
  const c = pricingContent[lang];

  return (
    <LangProvider initialLang={lang}>
      <div className="min-h-screen bg-sand-light text-shadow">
        <Nav variant="light" />

        <main className="wrap-break-word">
          {/* Hero — split editorial layout: text + image side by side on desktop */}
          <section className="pt-36 pb-20 md:pt-48 md:pb-28">
            <div className="container-page">
              <Reveal>
                <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-16">
                  {/* Text column */}
                  <div className="min-w-0 text-center md:text-left">
                    <p className={`${eyebrowClass} mb-6`}>{c.hero.eyebrow}</p>
                    <h1 className="font-serif text-4xl leading-[1.08] text-balance text-shadow md:text-6xl lg:text-7xl">
                      {c.hero.heading}
                    </h1>

                    {/* Image — mobile only, directly below the heading */}
                    <div className="relative my-8 aspect-4/3 w-full overflow-hidden rounded-[28px] shadow-[0_30px_70px_-40px_rgba(40,30,10,0.35)] md:hidden">
                      <Image
                        src="/images/taurisol-olive-tree.webp"
                        alt={c.hero.imageAlt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                      />
                    </div>

                    {c.hero.lines.map((line, i) => (
                      <p
                        key={i}
                        className={`mx-auto max-w-md md:mx-0 ${
                          i === 0 ? "mt-2 md:mt-8" : "mt-6"
                        } ${heroLineClass[line.variant]}`}
                      >
                        {line.text}
                      </p>
                    ))}

                    <div className="mx-auto mt-8 inline-flex max-w-full min-w-0 items-center gap-3 rounded-full border border-olive-deep/20 bg-sand px-6 py-3 text-left text-sm font-light leading-relaxed text-shadow/70 md:mx-0 md:max-w-md">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-sun-deep"
                        aria-hidden="true"
                      />
                      {c.hero.trustPill}
                    </div>
                  </div>

                  {/* Image column — desktop only */}
                  <div className="relative hidden aspect-4/3 w-full overflow-hidden rounded-[28px] shadow-[0_30px_70px_-40px_rgba(40,30,10,0.35)] md:block">
                    <Image
                      src="/images/taurisol-olive-tree.webp"
                      alt={c.hero.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1216px) 55vw, 660px"
                      priority
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Pricing transition */}
          <section className="pb-20 md:pb-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className={headingClass}>{c.transition.heading}</h2>
                  {c.transition.body.map((p, i) => (
                    <p
                      key={p}
                      className={`mx-auto max-w-xl ${i === 0 ? "mt-8" : "mt-6"} ${bodyClass}`}
                    >
                      {p}
                    </p>
                  ))}
                  <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-shadow/70 md:text-base">
                    {c.transition.reflective}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Pricing cards — slightly wider than the standard page container */}
          <section className="pb-16 md:pb-24">
            <div className="mx-auto max-w-336 px-6 md:px-12">
              <Reveal>
                <h2 className="mx-auto mb-14 max-w-2xl text-balance text-center font-serif text-2xl leading-[1.2] text-shadow md:mb-16 md:text-4xl">
                  {c.cardsHeading}
                </h2>
              </Reveal>
              <div className="grid gap-10 md:grid-cols-3 md:items-start md:gap-8 lg:gap-10">
                {c.tiers.map((tier, i) => (
                  <Reveal key={tier.name} delay={i * 100} className="h-full min-w-0">
                    <div
                      className={`relative flex h-full min-w-0 flex-col rounded-[28px] p-10 md:p-11 ${
                        tier.featured
                          ? "border-2 border-sun bg-sand shadow-[0_40px_90px_-35px_var(--sun)] md:-translate-y-6 md:scale-[1.03]"
                          : "border-2 border-olive-deep/20 bg-sand shadow-[0_25px_60px_-40px_rgba(40,30,10,0.3)]"
                      }`}
                    >
                      {tier.badge && (
                        <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-sun px-5 py-2 text-[11px] font-medium uppercase tracking-[0.25em] text-shadow shadow-[0_10px_24px_-8px_var(--sun)]">
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-shadow/70"
                            aria-hidden="true"
                          />
                          {tier.badge}
                        </span>
                      )}

                      <h3 className="font-serif text-2xl text-shadow md:text-3xl">{tier.name}</h3>
                      <p className="mt-2 font-serif text-base italic text-olive-deep">
                        {tier.tagline}
                      </p>
                      <p className="mt-6 font-serif text-5xl leading-none text-shadow md:text-6xl">
                        {tier.price}
                      </p>
                      <p className="mt-4 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-olive-deep">
                        {tier.stay}
                        <span className="text-shadow/25" aria-hidden="true">
                          ·
                        </span>
                        {tier.term}
                      </p>

                      <p className="mt-6 text-sm font-light leading-relaxed text-shadow/75">
                        {tier.description}
                      </p>

                      <ul className="mt-7 space-y-3.5">
                        {tier.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 text-sm font-light leading-relaxed text-shadow/80"
                          >
                            <span
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sun-deep"
                              aria-hidden="true"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 rounded-2xl border border-sun/30 bg-sun/[0.07] p-5">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-olive-deep">
                          {tier.additionalLabel}
                        </p>
                        <div className="mt-2 space-y-1 text-sm font-light leading-relaxed text-shadow/80">
                          {tier.additional.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>

                      <a
                        href="#priority-list"
                        className="group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-sun px-6 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-shadow transition-all duration-300 hover:bg-sun-soft hover:shadow-[0_14px_32px_-10px_var(--sun)] hover:-translate-y-0.5"
                      >
                        {tier.cta}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </Reveal>
                ))}
              </div>

              <p className="mx-auto mt-14 max-w-2xl text-center text-sm font-light leading-relaxed text-shadow/60">
                {c.cardsNote}
              </p>
            </div>
          </section>

          {/* Included in every membership — contained panel */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panelClass}>
                  <h2 className={headingClass}>{c.included.heading}</h2>
                  <div className="mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2">
                    {c.included.items.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-3 text-sm font-light leading-relaxed text-shadow/80 md:text-base"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sun-deep"
                          aria-hidden="true"
                        />
                        {b}
                      </div>
                    ))}
                  </div>
                  <p className="mt-10 max-w-2xl text-sm font-light leading-relaxed text-shadow/60">
                    {c.included.note}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Who it's for */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="max-w-2xl">
                  <h2 className={headingClass}>{c.whoFor.heading}</h2>
                  <p className={`mt-8 ${bodyClass}`}>{c.whoFor.body}</p>
                  <p className="mt-6 text-sm font-light text-shadow/70 md:text-base">
                    {c.whoFor.supportLabel}
                  </p>
                </div>
              </Reveal>
              <div className="mt-8 flex flex-wrap gap-3">
                {c.whoFor.uses.map((u) => (
                  <span
                    key={u}
                    className="max-w-full rounded-full border border-olive-deep/20 bg-sand px-5 py-2.5 text-sm font-light text-shadow/80"
                  >
                    {u}
                  </span>
                ))}
              </div>
              <p className="mt-10 max-w-2xl text-sm font-light leading-relaxed text-shadow/60">
                {c.whoFor.note}
              </p>
            </div>
          </section>

          {/* Host Privileges — contained panel */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panelClass}>
                  <p className={eyebrowClass}>— {c.hostPrivileges.eyebrow}</p>
                  <h2 className="mt-6 font-serif text-2xl leading-[1.15] text-shadow text-balance md:text-5xl">
                    {c.hostPrivileges.heading}
                  </h2>
                  <div className="mt-8 max-w-2xl space-y-5 text-sm font-light leading-relaxed text-shadow/80 md:text-base">
                    {c.hostPrivileges.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    <p className="text-shadow/60">{c.hostPrivileges.mutedNote}</p>
                  </div>

                  <ul className="mt-10 grid gap-x-10 gap-y-4 md:grid-cols-2">
                    {c.hostPrivileges.items.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-sm font-light leading-relaxed text-shadow/80 md:text-base"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sun-deep"
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-10 max-w-2xl text-sm font-light leading-relaxed text-shadow/60">
                    {c.hostPrivileges.finalNote}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Private by design */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className={headingClass}>{c.privateByDesign.heading}</h2>
                  <p className={`mx-auto mt-8 max-w-2xl ${bodyClass}`}>
                    {c.privateByDesign.body1}
                  </p>
                  <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-shadow/70 md:text-base">
                    {c.privateByDesign.body2}
                  </p>
                  <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-olive-deep md:text-2xl">
                    {c.privateByDesign.quote}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Founding Member Priority List — strongest panel on the page */}
          <section id="priority-list" className="py-10 scroll-mt-28 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-2xl min-w-0 rounded-[28px] border-2 border-sun bg-sand p-6 shadow-[0_40px_90px_-35px_var(--sun)] sm:p-10 md:p-14">
                  <p className={eyebrowClass}>— {c.priorityList.eyebrow}</p>
                  <h2 className="mt-6 font-serif text-xl leading-[1.2] text-shadow text-balance md:text-4xl">
                    {c.priorityList.heading}
                  </h2>

                  <div className="mt-8 space-y-4 text-sm font-light leading-relaxed text-shadow/80 md:text-base">
                    <p>
                      {c.priorityList.feeIntro}{" "}
                      <span className="font-normal text-shadow">
                        {c.priorityList.feeAmount}
                      </span>
                      .
                    </p>
                    {c.priorityList.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {c.priorityList.mutedParagraphs.map((p) => (
                      <p key={p} className="text-shadow/60">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <a href="/intra" className={primaryCta}>
                      {c.priorityList.primaryCta}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                    <a
                      href="/intra"
                      className="text-xs font-medium uppercase tracking-[0.22em] text-shadow/70 underline underline-offset-4 transition-colors hover:text-shadow"
                    >
                      {c.priorityList.secondaryCta}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* What Taurisol Membership is not */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className={headingClass}>{c.notThis.heading}</h2>
                  <p className={`mx-auto mt-8 max-w-2xl ${bodyClass}`}>
                    {c.notThis.prefix}{" "}
                    {c.notThis.items.map((item, i) => (
                      <span key={item}>
                        {item}
                        {i < c.notThis.items.length - 1 ? ", " : "."}
                      </span>
                    ))}
                  </p>
                  <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-shadow/70 md:text-base">
                    {c.notThis.body}
                  </p>
                  <p className="mx-auto mt-6 max-w-2xl font-serif text-xl italic leading-relaxed text-olive-deep md:text-2xl">
                    {c.notThis.quote}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* How the process works */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <h2 className={headingClass}>{c.process.heading}</h2>
              </Reveal>
              <div className="mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
                {c.process.steps.map((s, i) => (
                  <Reveal key={s.title} delay={i * 90}>
                    <span className="font-serif text-sm italic text-olive">— 0{i + 1}</span>
                    <h3 className="mt-4 font-serif text-xl text-shadow md:text-2xl">{s.title}</h3>
                    <p className="mt-4 text-sm font-light leading-relaxed text-shadow/70">
                      {s.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ — contained panel */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panelClass}>
                  <div className="mx-auto max-w-2xl text-center">
                    <p className={eyebrowClass}>— {c.faq.eyebrow}</p>
                    <h2 className="mt-6 font-serif text-2xl leading-[1.15] text-shadow text-balance md:text-5xl">
                      {c.faq.heading}
                    </h2>
                  </div>
                  <div className="mx-auto mt-12 max-w-2xl">
                    {c.faq.items.map((f) => (
                      <details
                        key={f.q}
                        className="group border-b border-olive-deep/20 py-7 marker:hidden first:pt-0 last:border-b-0 [&::-webkit-details-marker]:hidden"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg text-shadow transition-colors duration-300 group-hover:text-olive-deep md:text-xl">
                          {f.q}
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-olive-deep/20 text-lg font-light leading-none text-olive transition-all duration-300 group-open:rotate-45 group-open:border-sun group-open:text-sun-deep">
                            +
                          </span>
                        </summary>
                        <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-shadow/75 md:text-base">
                          {f.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-28 md:py-40">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="font-serif text-2xl leading-[1.15] text-shadow text-balance md:text-5xl">
                    {c.finalCta.heading}
                  </h2>
                  <p className={`mx-auto mt-8 max-w-xl ${bodyClass}`}>{c.finalCta.body}</p>
                  <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a href="/intra" className={primaryCta}>
                      {c.finalCta.primaryCta}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                    <a href="/intra" className={secondaryCta}>
                      {c.finalCta.secondaryCta}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </LangProvider>
  );
}
