"use client";

import Image from "next/image";
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";

export function Outcome() {
  const { lang } = useLang();
  return (
    <section id="homes" className="relative bg-shadow py-28 text-sand-light md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-12 md:gap-12 md:px-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <h2 className="font-serif text-4xl leading-[1.1] text-balance md:text-5xl lg:text-6xl">
              {t(content.outcome.title, lang)}
            </h2>
            <div className="relative mt-12 aspect-[4/5] w-full">
              <Image
                src="/images/outcome-terrace.jpg"
                alt="Terrace at sunset in Andalusia"
                fill
                loading="lazy"
                className="object-cover grayscale-[0.1]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ul className="space-y-7 border-l border-sand/20 pl-8">
            {content.outcome.items.map((it, i) => (
              <li
                key={i}
                className="font-serif text-3xl font-light leading-snug text-sand-light/95 md:text-4xl"
              >
                {t(it, lang)}
              </li>
            ))}
          </ul>

          <div className="mt-28 max-w-xl border-l border-sun/40 pl-8">
            <p className="font-serif text-3xl leading-[1.25] text-sand-light md:text-4xl">
              {t(content.outcome.closer1, lang)}
            </p>
            <p className="mt-6 font-serif text-3xl italic leading-[1.25] text-sun md:text-4xl">
              {t(content.outcome.closer2, lang)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
