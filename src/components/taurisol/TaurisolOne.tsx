import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";

export function TaurisolOne() {
  const { lang } = useLang();
  return (
    <section id="one" className="bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-olive">
          — {t(content.one.eyebrow, lang)}
        </p>
        <h2 className="font-serif text-4xl leading-[1.1] text-shadow text-balance md:text-6xl">
          {t(content.one.title, lang)}
        </h2>
        <p className="mt-10 max-w-2xl text-base font-light leading-relaxed text-shadow/75 md:text-lg">
          {t(content.one.body, lang)}
        </p>
        <a
          href="#"
          className="mt-12 inline-flex items-center gap-3 bg-shadow px-8 py-4 text-xs uppercase tracking-[0.25em] text-sand-light transition-colors hover:bg-olive-deep"
        >
          {t(content.one.cta, lang)}
          <span>→</span>
        </a>
      </div>
    </section>
  );
}