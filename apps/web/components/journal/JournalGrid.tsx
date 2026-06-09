"use client";

import type { TaurisolCategory } from "@/lib/journal";
import { getCategorySlug } from "@/lib/journal";
import type { Lang } from "@/lib/i18n";

interface Props {
  categories: TaurisolCategory[];
  lang: Lang;
  basePath: string;
}

export function JournalGrid({ categories, lang, basePath }: Props) {
  return (
    <nav className="flex flex-col gap-2">
      {categories.map((cat) => {
        const slug = getCategorySlug(cat, lang);
        const label = lang === "fi" ? cat.title.fi : cat.title.en;
        return (
          <a
            key={cat.slug}
            href={`${basePath}/${slug}`}
            className="group flex items-center justify-between rounded-[15px] border border-sun/25 bg-transparent px-5 py-3 font-serif text-base text-sand-light/80 transition-all duration-300 hover:border-sun/60 hover:bg-sun/[0.04] hover:text-sand-light hover:shadow-[0_0_18px_-8px_var(--sun)]"
          >
            <span>{label}</span>
            <span className="text-sun/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-sun/70">
              →
            </span>
          </a>
        );
      })}
    </nav>
  );
}
