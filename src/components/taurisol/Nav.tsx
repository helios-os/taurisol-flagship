import { useEffect, useState } from "react";
import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";
import { useScrolled } from "@/components/taurisol/Reveal";

const links = [
  { key: "philosophy", href: "#philosophy" },
  { key: "how", href: "#how" },
  { key: "homes", href: "#homes" },
  { key: "location", href: "#location" },
  { key: "one", href: "#one" },
  { key: "faq", href: "#faq" },
] as const;

export function Nav() {
  const { lang, setLang } = useLang();
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navBg = scrolled
    ? "bg-shadow/80 backdrop-blur-md border-b border-sand-light/10"
    : "bg-transparent border-b border-transparent";

  const linkLabel = (key: string) =>
    t((content.nav as Record<string, { en: string; fi: string }>)[key], lang);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-out ${navBg}`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 transition-[padding] duration-500 ${
            scrolled ? "py-4 md:py-5" : "py-6 md:py-8"
          }`}
        >
          <a
            href="#top"
            className="font-serif text-base tracking-[0.32em] text-sand-light"
          >
            TAURISOL
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className="text-[11px] uppercase tracking-[0.22em] text-sand-light/80 transition-colors hover:text-sun"
              >
                {linkLabel(l.key)}
              </a>
            ))}
            <div className="flex items-center gap-2 pl-2 text-[11px] uppercase tracking-[0.22em] text-sand-light/80">
              <button
                onClick={() => setLang("en")}
                className={`transition-opacity ${lang === "en" ? "text-sun" : "opacity-60 hover:opacity-100"}`}
              >
                EN
              </button>
              <span className="opacity-30">|</span>
              <button
                onClick={() => setLang("fi")}
                className={`transition-opacity ${lang === "fi" ? "text-sun" : "opacity-60 hover:opacity-100"}`}
              >
                FI
              </button>
            </div>
            <a
              href="#one"
              className="ml-2 inline-flex items-center gap-2 border border-sand-light/40 px-5 py-2.5 text-[11px] uppercase tracking-[0.22em] text-sand-light transition-colors hover:border-sun hover:bg-sun hover:text-shadow"
            >
              {t(content.nav.cta, lang)}
            </a>
          </nav>

          {/* Mobile trigger */}
          <button
            onClick={() => setOpen(true)}
            aria-label={t(content.nav.menu, lang)}
            className="flex flex-col items-end gap-1.5 lg:hidden"
          >
            <span className="block h-px w-7 bg-sand-light" />
            <span className="block h-px w-5 bg-sand-light" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-shadow text-sand-light transition-opacity duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-12 pt-6">
          <div className="flex items-center justify-between">
            <span className="font-serif text-base tracking-[0.32em]">TAURISOL</span>
            <button
              onClick={() => setOpen(false)}
              aria-label={t(content.nav.close, lang)}
              className="text-xs uppercase tracking-[0.25em] text-sand-light/80 hover:text-sun"
            >
              {t(content.nav.close, lang)} ✕
            </button>
          </div>

          <nav className="mt-16 flex flex-1 flex-col gap-7">
            {links.map((l, i) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: `${open ? 120 + i * 60 : 0}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 700ms ease, transform 700ms ease",
                }}
                className="font-serif text-4xl text-sand-light hover:text-sun"
              >
                {linkLabel(l.key)}
              </a>
            ))}
          </nav>

          <div className="mt-12 flex items-center gap-4 text-xs uppercase tracking-[0.25em]">
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-sun" : "opacity-60"}
            >
              EN
            </button>
            <span className="opacity-30">|</span>
            <button
              onClick={() => setLang("fi")}
              className={lang === "fi" ? "text-sun" : "opacity-60"}
            >
              FI
            </button>
          </div>

          <a
            href="#one"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 bg-sand-light px-6 py-4 text-xs uppercase tracking-[0.25em] text-shadow transition-colors hover:bg-sun"
          >
            {t(content.nav.cta, lang)} →
          </a>
        </div>
      </div>
    </>
  );
}