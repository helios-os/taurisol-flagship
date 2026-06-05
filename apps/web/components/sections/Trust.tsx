"use client";

import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

export function Trust() {
  const { lang } = useLang();
  return (
    <section className="relative bg-sand-light py-32 md:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
        <Reveal>
          <span className="mb-8 inline-block h-px w-16 bg-olive/50" />
          <h2 className="font-serif text-4xl leading-[1.12] text-shadow text-balance md:text-5xl lg:text-6xl">
            {t(content.trust.title, lang)}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mx-auto mt-12 max-w-2xl space-y-5 font-serif text-xl leading-relaxed text-shadow/80 md:text-2xl">
            <p>{t(content.trust.body1, lang)}</p>
            <p>{t(content.trust.body2, lang)}</p>
            <p className="italic text-olive-deep">{t(content.trust.body3, lang)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
