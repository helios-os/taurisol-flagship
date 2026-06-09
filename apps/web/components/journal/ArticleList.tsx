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
  basePath: string; // e.g. "/journal/philosophy" or "/fi/journal/filosofia"
}

export function ArticleList({ articles, lang, basePath }: Props) {
  if (articles.length === 0) {
    return (
      <div className="py-12 md:py-16">
        <p className="font-serif text-lg text-shadow/75">
          {lang === "fi" ? EMPTY_STATE.fi : EMPTY_STATE.en}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 grid gap-px bg-stone-warm/40 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <Reveal
          key={article.id}
          delay={i * 80}
          className="group bg-sand transition-colors hover:bg-sand-light"
        >
          <a
            href={`${basePath}/${article.slug}`}
            className="block h-full p-10 md:p-12"
          >
            <h3 className="font-serif text-2xl leading-snug text-shadow md:text-3xl">
              {article.title}
            </h3>
            <span className="mt-6 block h-px w-10 bg-olive/40 transition-all duration-500 group-hover:w-16 group-hover:bg-sun" />
            {article.ingress && (
              <p className="mt-6 line-clamp-4 text-sm font-light leading-relaxed text-shadow/70 md:text-base">
                {article.ingress}
              </p>
            )}
            <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-olive transition-colors group-hover:text-sun">
              {lang === "fi" ? "Lue artikkeli" : "Read article"}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
