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
          href="https://one.taurisol.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 inline-flex items-center gap-3 rounded-[10px] border border-sun bg-sun px-8 py-4 text-xs uppercase tracking-[0.25em] text-shadow transition-all duration-300 hover:bg-sun-deep hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)]"
        >
          {t(content.one.cta, lang)}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}