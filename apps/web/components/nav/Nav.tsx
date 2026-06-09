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
  if (pathname === "/journal" && targetLang === "fi") return "/fi/journal";
  if (pathname === "/fi/journal" && targetLang === "en") return "/journal";

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

  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  const journalHref = lang === "fi" ? "/fi/journal" : "/journal";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Desktop nav background — scroll-aware, lg+ only
  const desktopNavBg = scrolled
    ? "lg:bg-shadow/25 lg:backdrop-blur-2xl lg:border-b lg:border-sand-light/10 lg:shadow-[0_1px_30px_-12px_rgba(0,0,0,0.25)]"
    : "lg:bg-transparent lg:border-b lg:border-transparent";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-out ${desktopNavBg}`}
      >
        {/*
         * Mobile background: always-on subtle tint so the header is readable
         * over hero images. Hidden on desktop (lg:hidden) so the desktop
         * scroll-aware desktopNavBg logic takes over without interference.
         */}
        <div
          className="absolute inset-0 bg-[rgba(15,13,5,0.35)] backdrop-blur-[8px] lg:hidden"
          aria-hidden="true"
        />

        <div
          className={`relative mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 transition-[padding] duration-500 ${
            scrolled ? "py-4 md:py-5" : "py-5 md:py-8"
          }`}
        >
          <a
            href={isHome ? "#top" : "/"}
            className="font-serif text-base tracking-[0.32em] text-sand-light"
          >
            TAURISOL
          </a>

          {/* Desktop nav — unchanged */}
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

          {/*
           * Mobile: hamburger only — no language flags in the closed header.
           * 3 lines, h-0.5 (2px), 44×44px touch target via p-3.
           * Language switching lives inside the opened overlay instead.
           */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex flex-col items-center justify-center gap-[5px] p-3 -mr-3 lg:hidden min-w-[44px] min-h-[44px]"
          >
            <span className="block h-0.5 w-6 rounded-full bg-sand-light" />
            <span className="block h-0.5 w-6 rounded-full bg-sand-light" />
            <span className="block h-0.5 w-[14px] rounded-full bg-sand-light/70" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-shadow text-sand-light transition-opacity duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-6 pt-6">

          {/* Overlay top bar */}
          <div className="flex items-center justify-between">
            <span className="font-serif text-base tracking-[0.32em]">TAURISOL</span>
            <button
              onClick={() => setOpen(false)}
              aria-label={t(content.nav.close, lang)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-sand-light/70 transition-colors hover:text-sun"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="mt-5 flex flex-1 flex-col gap-2">
            {anchorLinks.map((l, i) => (
              <a
                key={l.key}
                href={resolveHref(l.href)}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: `${open ? 80 + i * 45 : 0}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 600ms ease, transform 600ms ease",
                }}
                className="font-serif text-3xl text-sand-light hover:text-sun"
              >
                {linkLabel(l.key)}
              </a>
            ))}
            <a
              href={journalHref}
              onClick={() => setOpen(false)}
              style={{
                transitionDelay: `${open ? 80 + anchorLinks.length * 45 : 0}ms`,
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 600ms ease, transform 600ms ease",
              }}
              className="font-serif text-3xl text-sand-light hover:text-sun"
            >
              {t(content.nav.journal, lang)}
            </a>
          </nav>

          {/* Language switcher — inside overlay, below nav links */}
          <div className="mt-4 flex items-center gap-2 border-t border-sand-light/10 pt-3">
            <span className="mr-1 text-[10px] uppercase tracking-[0.3em] text-sand-light/35">
              {lang === "fi" ? "Kieli" : "Language"}
            </span>
            <button
              onClick={() => { handleLangSwitch("en"); setOpen(false); }}
              aria-label="English"
              className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-[11px] tracking-[0.12em] transition-all duration-200 ${
                lang === "en"
                  ? "bg-sun/20 text-sand-light"
                  : "text-sand-light/45 hover:text-sand-light"
              }`}
            >
              {"🇬🇧"} English
            </button>
            <button
              onClick={() => { handleLangSwitch("fi"); setOpen(false); }}
              aria-label="Suomi"
              className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-[11px] tracking-[0.12em] transition-all duration-200 ${
                lang === "fi"
                  ? "bg-sun/20 text-sand-light"
                  : "text-sand-light/45 hover:text-sand-light"
              }`}
            >
              {"🇫🇮"} Suomi
            </button>
          </div>

          {/* CTA */}
          <a
            href={resolveHref("#philosophy")}
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-[10px] border border-sun bg-sun px-6 py-4 text-xs font-medium uppercase tracking-[0.25em] text-shadow transition-colors hover:bg-sun-soft"
          >
            {t(content.nav.cta, lang)}
          </a>

        </div>
      </div>
    </>
  );
}
