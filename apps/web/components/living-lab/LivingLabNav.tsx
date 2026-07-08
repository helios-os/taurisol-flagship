import { content, t, type Lang } from "@/lib/i18n";

export function LivingLabNav({ lang }: { lang: Lang }) {
  const n = content.livingLab.nav;
  const homeHref = "/";

  const sectionLinks = [
    { href: "#brief", label: t(n.montefrio, lang) },
    { href: "#europe", label: t(n.why, lang) },
    { href: "#collaborators", label: t(n.who, lang) },
    { href: "#intra", label: t(n.build, lang) },
    { href: "#request", label: t(n.start, lang) },
  ];

  const langPillBase =
    "inline-flex items-center rounded-[8px] px-2.5 py-1.5 text-[11px] tracking-[0.2em] transition-colors";
  const langPillActive = "bg-sun/25 text-foreground";
  const langPillIdle = "text-foreground/45 hover:text-foreground";

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between gap-4 lg:gap-6">
        <a href={homeHref} className="group inline-flex items-center gap-2 md:gap-3 min-w-0">
          <span className="font-serif text-base md:text-lg uppercase tracking-[0.32em] text-foreground shrink-0">
            TAURISOL
          </span>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-muted-foreground shrink-0">
            LIVING LAB
          </span>
        </a>

        <nav
          aria-label="Living Lab sections"
          className="hidden md:flex items-center gap-5 lg:gap-9"
        >
          {sectionLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[10px] lg:text-[11px] uppercase tracking-[0.22em] lg:tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4">
          <div
            role="group"
            aria-label="Language"
            className="inline-flex items-center gap-1 border-l border-border/60 pl-3 lg:pl-4"
          >
            <a
              href="/living-lab"
              aria-pressed={lang === "en"}
              className={`${langPillBase} ${lang === "en" ? langPillActive : langPillIdle}`}
            >
              EN
            </a>
            <a
              href="/fi/living-lab"
              aria-pressed={lang === "fi"}
              className={`${langPillBase} ${lang === "fi" ? langPillActive : langPillIdle}`}
            >
              FI
            </a>
          </div>
          <a
            href={homeHref}
            className="hidden sm:inline-flex items-center rounded-[10px] border border-foreground/25 bg-transparent px-4 py-2.5 text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground/60"
          >
            {t(n.back, lang)}
          </a>
        </div>
      </div>
    </header>
  );
}
