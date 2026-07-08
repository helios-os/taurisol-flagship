import { content, t, type Lang } from "@/lib/i18n";

export function LocationFlow({ lang }: { lang: Lang }) {
  const l = content.livingLab.loc;
  const steps = [
    { k: t(l.continent, lang), v: t(l.europe, lang) },
    { k: t(l.country, lang), v: t(l.spain, lang) },
    { k: t(l.region, lang), v: t(l.andalusia, lang) },
    { k: t(l.province, lang), v: t(l.granada, lang) },
    { k: t(l.chapter, lang), v: t(l.montefrio, lang) },
  ];
  return (
    <section id="europe" className="bg-secondary py-24 md:py-28 lg:py-36 scroll-mt-20">
      <div className="container-page">
        <div className="grid gap-16 md:gap-16 lg:gap-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
          <div className="max-w-lg min-w-0">
            <p className="eyebrow mb-6">{t(l.eyebrow, lang)}</p>
            <h2 className="font-serif text-4xl md:text-[2.5rem] lg:text-5xl leading-[1.05] tracking-[-0.02em] text-balance text-foreground">
              {t(l.titleA, lang)}
              <br />
              {t(l.titleB, lang)}
            </h2>
            <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground">
              {t(l.body, lang)}
            </p>
            <p className="mt-8 font-serif italic text-xl md:text-[1.35rem] lg:text-2xl text-foreground/85">
              {t(l.tag, lang)}
            </p>
          </div>

          <ol className="relative border-l border-border/70 pl-8 md:pl-10 min-w-0">
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <li key={s.v} className={`relative ${last ? "" : "pb-10 md:pb-12"}`}>
                  <span
                    aria-hidden
                    className={`absolute -left-[41px] md:-left-[49px] top-2 inline-flex h-3 w-3 items-center justify-center rounded-full ${
                      last
                        ? "bg-sun ring-4 ring-sun/15"
                        : "bg-background border border-stone-warm"
                    }`}
                  />
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
                    {s.k}
                  </p>
                  <p
                    className={`mt-2 font-serif leading-tight ${
                      last
                        ? "text-3xl md:text-[2rem] lg:text-4xl text-foreground"
                        : "text-2xl md:text-[1.65rem] lg:text-3xl text-foreground/80"
                    }`}
                  >
                    {s.v}
                    {last && (
                      <span className="ml-3 align-middle text-sm text-muted-foreground tracking-normal">
                        37.32° N · 4.01° W
                      </span>
                    )}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
