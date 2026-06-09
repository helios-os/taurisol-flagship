"use client";

import { Reveal } from "@/components/ui/Reveal";
import type { TaurisolCategory } from "@/lib/journal";
import { getCategorySlug } from "@/lib/journal";
import type { Lang } from "@/lib/i18n";

interface Props {
  categories: TaurisolCategory[];
  lang: Lang;
  basePath: string; // "/journal" or "/fi/journal"
}

export function JournalGrid({ categories, lang, basePath }: Props) {
  return (
    <section className="bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-px bg-stone-warm/40 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat, i) => {
            const slug = getCategorySlug(cat, lang);
            return (
              <Reveal
                key={cat.slug}
                delay={i * 70}
                className="group bg-sand transition-colors hover:bg-sand-light"
              >
                <a
                  href={`${basePath}/${slug}`}
                  className="block h-full p-10 md:p-12"
                >
                  <span className="font-serif text-sm italic text-olive">
                    — 0{i + 1}
                  </span>
                  <h3 className="mt-6 font-serif text-2xl leading-snug text-shadow md:text-3xl">
                    {lang === "en" ? cat.title.en : cat.title.fi}
                  </h3>
                  <span className="mt-6 block h-px w-10 bg-olive/40 transition-all duration-500 group-hover:w-16 group-hover:bg-sun" />
                  <p className="mt-6 text-sm font-light leading-relaxed text-shadow/70 md:text-base">
                    {lang === "en" ? cat.tagline.en : cat.tagline.fi}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-olive transition-colors group-hover:text-sun">
                    {lang === "fi" ? "Lue lisää" : "Read more"}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
