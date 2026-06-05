import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="bg-shadow py-24 text-sand-light md:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
        <h2 className="font-serif text-5xl tracking-[0.2em] md:text-7xl">TAURISOL</h2>
        <p className="mt-8 font-serif text-2xl italic text-sand md:text-3xl">
          {t(content.hero.title, lang)}
        </p>
        <p className="mt-3 text-sm font-light tracking-wide text-sand-light/70 md:text-base">
          {t(content.hero.sub, lang)}
        </p>
        <a
          href="#top"
          className="mt-12 inline-flex items-center gap-3 bg-sand-light px-8 py-4 text-xs uppercase tracking-[0.25em] text-shadow transition-colors hover:bg-sun"
        >
          {t(content.footer.cta, lang)}
          <span>→</span>
        </a>
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-sand/15 pt-8 text-xs uppercase tracking-[0.2em] text-sand-light/50 md:flex-row">
          <span>© {new Date().getFullYear()} Taurisol</span>
          <span>Andalucía · España</span>
        </div>
      </div>
    </footer>
  );
}