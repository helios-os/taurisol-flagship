"use client";

import { Reveal } from "@/components/ui/Reveal";
import type { JournalArticle } from "@/lib/journal";
import type { Lang } from "@/lib/i18n";

const EMPTY_STATE = {
  en: "Articles for this theme are being prepared.",
  fi: "Tämän teeman artikkelit ovat valmistelussa.",
};

interface Props {
  articles: JournalArticle[];
  lang: Lang;
  basePath: string;
}

export function ArticleList({ articles, lang, basePath }: Props) {
  if (articles.length === 0) {
    return (
      <div className="py-10 md:py-12">
        <p className="font-serif text-lg text-shadow/70">
          {lang === "fi" ? EMPTY_STATE.fi : EMPTY_STATE.en}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <Reveal key={article.id} delay={i * 60}>
          <a
            href={`${basePath}/${article.slug}`}
            className="group block h-full rounded-[12px] border border-sun/20 bg-shadow p-8 transition-all duration-300 hover:border-sun/55 hover:shadow-[0_0_28px_-10px_var(--sun)] md:p-10"
          >
            <h3 className="font-serif text-xl leading-snug text-sand-light md:text-2xl">
              {article.title}
            </h3>
            <span className="mt-4 block h-px w-8 bg-sun/30 transition-all duration-500 group-hover:w-14 group-hover:bg-sun" />
            {article.ingress && (
              <p className="mt-4 line-clamp-4 text-sm font-light leading-relaxed text-sand-light/55 md:text-base">
                {article.ingress}
              </p>
            )}
            <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-sun/50 transition-colors group-hover:text-sun">
              {lang === "fi" ? "Lue artikkeli" : "Read article"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
