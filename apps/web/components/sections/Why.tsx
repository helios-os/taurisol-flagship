"use client";

import Image from "next/image";
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

export function Why() {
  const { lang } = useLang();
  return (
    <section id="how" className="bg-sand-light py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="mx-auto mb-24 max-w-3xl text-center">
            <span className="mx-auto mb-8 block h-px w-16 bg-olive/50" />
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-olive">
              — {lang === "en" ? "Why Taurisol is different" : "Miksi Taurisol on erilainen"}
            </p>
            <p className="font-serif text-3xl leading-[1.2] text-shadow md:text-5xl">
              {t(content.why.intro1, lang)}
              <br />
              <span className="italic text-olive-deep">
                {t(content.why.intro2, lang)}
              </span>
            </p>
          </div>
        </Reveal>

        <div className="relative mb-24 grid gap-px bg-border md:grid-cols-3">
          {content.why.cards.map((c, i) => (
            <Reveal key={i} delay={i * 120} className="group bg-sand-light transition-colors hover:bg-sand">
              <div className="relative h-full p-10 md:p-12">
                <span className="font-serif text-xs uppercase tracking-[0.3em] text-olive">0{i + 1}</span>
                <div className="mt-6 text-3xl">{c.icon ? t(c.icon, lang) : ""}</div>
                <h3 className="mt-6 font-serif text-2xl text-shadow md:text-3xl">
                  {t(c.t, lang)}
                </h3>
                <span className="mt-5 block h-px w-10 bg-olive/40 transition-all duration-500 group-hover:w-20 group-hover:bg-sun" />
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                  {t(c.b, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/olive-detail.jpg"
                  alt="Olive branch detail"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="font-serif text-2xl italic leading-snug text-olive-deep md:text-3xl">
                {t(content.why.title, lang)}
              </p>
              <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                {lang === "en"
                  ? "Every choice is made to remove friction, hidden costs and dependency — so the promise stays simple to live."
                  : "Jokainen valinta on tehty poistamaan kitkaa, piilokuluja ja riippuvuutta — jotta lupaus pysyy yksinkertaisena elää."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
