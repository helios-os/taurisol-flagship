import { useEffect, useState } from "react";
import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";
import { useScrolled } from "@/components/taurisol/Reveal";

function FlagUK({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagFI({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden="true">
      <rect width="60" height="30" fill="#fff" />
      <rect x="0" y="9" width="60" height="12" fill="#003580" />
      <rect x="15" y="0" width="12" height="30" fill="#003580" />
    </svg>
  );
}

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
    ? "bg-shadow/25 backdrop-blur-2xl border-b border-sand-light/10 shadow-[0_1px_30px_-12px_rgba(0,0,0,0.25)]"
    : "bg-transparent border-b border-transparent";

  const linkLabel = (key: string) =>
    t((content.nav as Record<string, { en: string; fi: string }>)[key], lang);

  const langPillBase =
    "flex items-center gap-1.5 rounded-[8px] px-2.5 py-1 transition-all duration-300";
  const langPillActive = "bg-sun/15 text-sand-light";
  const langPillIdle = "text-sand-light/55 hover:text-sand-light";

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
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className="rounded-[10px] border border-transparent px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-sand-light/85 transition-all duration-300 hover:border-sun/45 hover:bg-sun/[0.06] hover:text-sand-light hover:shadow-[0_0_22px_-10px_var(--sun)]"
              >
                {linkLabel(l.key)}
              </a>
            ))}
            <span className="mx-3 block h-4 w-px bg-sand-light/15" aria-hidden="true" />
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.22em]">
              <button
                onClick={() => setLang("en")}
                aria-label="English"
                className={`${langPillBase} ${lang === "en" ? langPillActive : langPillIdle}`}
              >
                <FlagUK className="h-[13px] w-[20px] rounded-[2px]" />
                EN
              </button>
              <button
                onClick={() => setLang("fi")}
                aria-label="Suomi"
                className={`${langPillBase} ${lang === "fi" ? langPillActive : langPillIdle}`}
              >
                <FlagFI className="h-[13px] w-[20px] rounded-[2px]" />
                FI
              </button>
            </div>
            <a
              href="#philosophy"
              className="ml-3 inline-flex items-center gap-2 rounded-[10px] bg-sun px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] text-shadow transition-all duration-300 hover:bg-sun-soft hover:shadow-[0_10px_28px_-10px_var(--sun)]"
            >
              {t(content.nav.cta, lang)}
            </a>
          </nav>

          {/* Mobile: language switcher stays visible alongside hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center gap-0.5 text-[10px] uppercase tracking-[0.22em]">
              <button
                onClick={() => setLang("en")}
                aria-label="English"
                className={`flex items-center gap-1 rounded-[8px] px-2 py-1 transition-all ${
                  lang === "en" ? "bg-sun/15 text-sand-light" : "text-sand-light/55"
                }`}
              >
                <FlagUK className="h-[11px] w-[18px] rounded-[2px]" />
                EN
              </button>
              <button
                onClick={() => setLang("fi")}
                aria-label="Suomi"
                className={`flex items-center gap-1 rounded-[8px] px-2 py-1 transition-all ${
                  lang === "fi" ? "bg-sun/15 text-sand-light" : "text-sand-light/55"
                }`}
              >
                <FlagFI className="h-[11px] w-[18px] rounded-[2px]" />
                FI
              </button>
            </div>
            <span className="block h-4 w-px bg-sand-light/15" aria-hidden="true" />
            <button
              onClick={() => setOpen(true)}
              aria-label={t(content.nav.menu, lang)}
              className="flex flex-col items-end gap-1.5"
            >
              <span className="block h-px w-7 bg-sand-light" />
              <span className="block h-px w-5 bg-sand-light" />
            </button>
          </div>
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

          <a
            href="https://one.taurisol.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-12 inline-flex items-center justify-center gap-2 rounded-[10px] border border-sun bg-sun px-6 py-4 text-xs font-medium uppercase tracking-[0.25em] text-shadow transition-colors hover:bg-sun-soft"
          >
            {t(content.audience.cta, lang)} →
          </a>
        </div>
      </div>
    </>
  );
}