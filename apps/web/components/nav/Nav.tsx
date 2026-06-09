"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";
import { useScrolled } from "@/components/ui/Reveal";
import type { Lang } from "@/lib/i18n";

// Slug pairs for all 7 Taurisol Journal categories (EN ↔ FI)
const JOURNAL_EN_TO_FI: Record<string, string> = {
  "philosophy": "filosofia",
  "place": "paikka",
  "design": "design",
  "energy": "energia",
  "rituals": "rituaalit",
  "founder-notes": "perustajan-muistiot",
  "development": "kehitys",
};
const JOURNAL_FI_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(JOURNAL_EN_TO_FI).map(([en, fi]) => [fi, en])
);

/**
 * Returns the translated Journal path for the given target language,
 * or null if the current pathname is not a Journal route.
 * Article pages fall back to the translated category page.
 */
function journalAltPath(pathname: string, targetLang: Lang): string | null {
  // Index
  if (pathname === "/journal" && targetLang === "fi") return "/fi/journal";
  if (pathname === "/fi/journal" && targetLang === "en") return "/journal";

  // Category: /journal/[slug] or /fi/journal/[slug]
  const enCat = pathname.match(/^\/journal\/([^/]+)$/);
  if (enCat && targetLang === "fi") {
    const fi = JOURNAL_EN_TO_FI[enCat[1]];
    return fi ? `/fi/journal/${fi}` : "/fi/journal";
  }
  const fiCat = pathname.match(/^\/fi\/journal\/([^/]+)$/);
  if (fiCat && targetLang === "en") {
    const en = JOURNAL_FI_TO_EN[fiCat[1]];
    return en ? `/journal/${en}` : "/journal";
  }

  // Article: /journal/[cat]/[art] — fall back to translated category page
  const enArt = pathname.match(/^\/journal\/([^/]+)\//);
  if (enArt && targetLang === "fi") {
    const fi = JOURNAL_EN_TO_FI[enArt[1]];
    return fi ? `/fi/journal/${fi}` : "/fi/journal";
  }
  const fiArt = pathname.match(/^\/fi\/journal\/([^/]+)\//);
  if (fiArt && targetLang === "en") {
    const en = JOURNAL_FI_TO_EN[fiArt[1]];
    return en ? `/journal/${en}` : "/journal";
  }

  return null;
}

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

// Anchor links that belong to the homepage sections
const anchorLinks = [
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
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const handleLangSwitch = (newLang: Lang) => {
    setLang(newLang);
    const altPath = journalAltPath(pathname, newLang);
    if (altPath) router.push(altPath);
  };

  // On non-home pages, anchor links resolve to /#section on the homepage
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  // Journal route is language-aware
  const journalHref = lang === "fi" ? "/fi/journal" : "/journal";

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

  const linkClass =
    "rounded-[10px] border border-transparent px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-sand-light/85 transition-all duration-300 hover:border-sun/45 hover:bg-sun/[0.06] hover:text-sand-light hover:shadow-[0_0_22px_-10px_var(--sun)]";

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
            href={isHome ? "#top" : "/"}
            className="font-serif text-base tracking-[0.32em] text-sand-light"
          >
            TAURISOL
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {anchorLinks.map((l) => (
              <a
                key={l.key}
                href={resolveHref(l.href)}
                className={linkClass}
              >
                {linkLabel(l.key)}
              </a>
            ))}
            <a href={journalHref} className={linkClass}>
              {t(content.nav.journal, lang)}
            </a>
            <span className="mx-3 block h-4 w-px bg-sand-light/15" aria-hidden="true" />
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.22em]">
              <button
                onClick={() => handleLangSwitch("en")}
                aria-label="English"
                className={`${langPillBase} ${lang === "en" ? langPillActive : langPillIdle}`}
              >
                <FlagUK className="h-[13px] w-[20px] rounded-[2px]" />
                EN
              </button>
              <button
                onClick={() => handleLangSwitch("fi")}
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

          {/* Mobile: language switcher + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center gap-0.5 text-[10px] uppercase tracking-[0.22em]">
              <button
                onClick={() => handleLangSwitch("en")}
                aria-label="English"
                className={`flex items-center gap-1 rounded-[8px] px-2 py-1 transition-all ${
                  lang === "en" ? "bg-sun/15 text-sand-light" : "text-sand-light/55"
                }`}
              >
                <FlagUK className="h-[11px] w-[18px] rounded-[2px]" />
                EN
              </button>
              <button
                onClick={() => handleLangSwitch("fi")}
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
            {anchorLinks.map((l, i) => (
              <a
                key={l.key}
                href={resolveHref(l.href)}
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
            <a
              href={journalHref}
              onClick={() => setOpen(false)}
              style={{
                transitionDelay: `${open ? 120 + anchorLinks.length * 60 : 0}ms`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 700ms ease, transform 700ms ease",
              }}
              className="font-serif text-4xl text-sand-light hover:text-sun"
            >
              {t(content.nav.journal, lang)}
            </a>
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
