"use client";

import Image from "next/image";
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

export function Location() {
  const { lang } = useLang();
  const cards = content.location.cards;

  return (
    <section id="location" className="bg-sand">
      {/* Cinematic image with title overlay */}
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[70vh]">
        <Image
          src="/images/montefrio-countryside.webp"
          alt="Olive groves and open hills of the Montefrío countryside in Andalusia"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        {/* Warm cinematic treatment: golden hue + readable shadow gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-shadow/85 via-shadow/35 to-shadow/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-shadow/55 via-shadow/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-50" style={{ background: "radial-gradient(ellipse at 70% 30%, var(--sun-soft), transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 pt-32 md:px-12 md:pb-20">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-sand/80">
              {t(content.location.eyebrow, lang)}
            </p>
            <h2 className="max-w-2xl font-serif text-5xl leading-[1.05] text-sand-light text-balance md:text-6xl lg:text-7xl">
              {t(content.location.title, lang)}
            </h2>
            <p className="mt-6 max-w-xl font-serif text-xl italic text-sand/90 md:text-2xl">
              {t(content.location.sub, lang)}
            </p>
          </div>
        </div>
      </div>

      {/* Editorial story */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="grid items-start gap-12 md:grid-cols-[2fr_3fr] lg:gap-20">

            {/* Left: village image + video CTA */}
            <div>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/pueblo-blanco-montefrio-village.webp"
                  alt="Montefrío white village with moorish castle, Andalusia"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              <a
                href="https://youtu.be/zufYIIZVM7E"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center gap-2 text-xs font-light tracking-wide text-shadow/50 transition-colors duration-300 hover:text-olive"
              >
                <span className="text-olive/60 transition-colors duration-300 group-hover:text-olive">▶</span>
                <span className="font-serif italic">Watch video</span>
                <span className="text-shadow/35">—</span>
                <span>Montefrío · Fairytale White Village</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            </div>

            {/* Right: editorial copy + bullets */}
            <div>
              <p className="font-serif text-3xl leading-[1.2] text-shadow text-balance md:text-4xl lg:text-5xl">
                {t(content.location.story1, lang)}
              </p>
              <p className="mt-6 font-serif text-2xl italic leading-snug text-olive-deep md:text-3xl">
                {t(content.location.story2, lang)}
              </p>
              <div className="mt-16 border-l border-olive/30 pl-8">
                <ul className="space-y-3 text-base font-light leading-relaxed text-shadow/75 md:text-lg">
                  {content.location.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-2.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sun" />
                      <span>{t(b, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </Reveal>

        {/* Benefit cards */}
        <div className="mt-24 grid gap-px bg-stone-warm/40 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 90} className="group bg-sand transition-colors hover:bg-sand-light">
              <div className="h-full p-10 md:p-14">
                <span className="font-serif text-sm italic text-olive">
                  — 0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-2xl text-shadow md:text-3xl">
                  {t(c.t, lang)}
                </h3>
                <span className="mt-6 block h-px w-10 bg-olive/40 transition-all duration-500 group-hover:w-16 group-hover:bg-sun" />
                <p className="mt-6 text-sm font-light leading-relaxed text-shadow/70 md:text-base">
                  {t(c.b, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* National Geographic credibility */}
        <Reveal>
          <div className="mx-auto mt-24 max-w-3xl border border-sun/25 bg-sand-light/60 px-8 py-10 md:px-12 md:py-14">
            <span className="mb-4 block text-xs uppercase tracking-[0.35em] text-olive">
              — {lang === "en" ? "Recognition" : "Tunnustus"}
            </span>
            <p className="font-serif text-2xl italic leading-snug text-shadow/90 md:text-3xl">
              {t(content.location.credibility, lang)}
            </p>
          </div>
        </Reveal>

        {/* Philosophy connection */}
        <Reveal>
          <div className="mx-auto mt-24 max-w-4xl text-center">
            <span className="mx-auto mb-8 block h-px w-16 bg-olive/50" />
            <p className="font-serif text-4xl italic leading-[1.15] text-shadow md:text-5xl lg:text-6xl">
              {t(content.location.quote, lang)}
            </p>
            <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-relaxed text-shadow/70 md:text-lg">
              {t(content.location.quoteSupport, lang)}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Microclimate comparison */}
      <div className="bg-sand-light py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <Reveal>
            <h3 className="text-center font-serif text-3xl text-shadow md:text-4xl">
              {t(content.location.microTitle, lang)}
            </h3>
          </Reveal>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            <Reveal delay={0} className="bg-sand-light p-10 md:p-14">
              <span className="text-xs uppercase tracking-[0.35em] text-shadow/40">
                {t(content.location.coastLabel, lang)}
              </span>
              <ul className="mt-8 space-y-4 font-serif text-xl text-shadow/70 md:text-2xl">
                {content.location.coastPoints.map((p, i) => (
                  <li key={i}>{t(p, lang)}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="relative bg-sand p-10 md:p-14">
              <div className="absolute left-0 top-0 h-full w-px bg-sun/40" />
              <span className="text-xs uppercase tracking-[0.35em] text-olive">
                {t(content.location.highlandsLabel, lang)}
              </span>
              <ul className="mt-8 space-y-4 font-serif text-xl text-shadow md:text-2xl">
                {content.location.highlandsPoints.map((p, i) => (
                  <li key={i} className="text-olive-deep">{t(p, lang)}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-sand py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <Reveal>
            <h3 className="font-serif text-4xl leading-[1.1] text-shadow text-balance md:text-5xl lg:text-6xl">
              {t(content.location.ctaTitle, lang)}
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <a
              href="https://one.taurisol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-3 rounded-[10px] border border-sun/70 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.25em] text-shadow transition-all duration-300 hover:border-sun hover:bg-sun/10 hover:shadow-[0_0_28px_-8px_var(--sun)]"
            >
              {t(content.location.ctaBtn, lang)}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
