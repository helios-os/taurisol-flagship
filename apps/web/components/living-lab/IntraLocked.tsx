import { IntraRequestDialog } from "@/components/intra/IntraRequestDialog";
import { content, t, type Lang } from "@/lib/i18n";

export function IntraLocked({ lang }: { lang: Lang }) {
  const i = content.livingLab.intraTeaser;
  const spaces = [
    { title: t(i.c1.title, lang), desc: t(i.c1.desc, lang) },
    { title: t(i.c2.title, lang), desc: t(i.c2.desc, lang) },
    { title: t(i.c3.title, lang), desc: t(i.c3.desc, lang) },
    { title: t(i.c4.title, lang), desc: t(i.c4.desc, lang) },
    { title: t(i.c5.title, lang), desc: t(i.c5.desc, lang) },
    { title: t(i.c6.title, lang), desc: t(i.c6.desc, lang) },
  ];

  return (
    <section id="intra" className="bg-secondary py-24 md:py-28 lg:py-36 scroll-mt-20">
      <div className="container-page">
        <div className="max-w-3xl mb-16 md:mb-20 lg:mb-24">
          <p className="eyebrow mb-6">{t(i.eyebrow, lang)}</p>
          <h2 className="font-serif text-4xl md:text-[2.5rem] lg:text-5xl leading-[1.05] tracking-[-0.02em] text-balance text-foreground">
            {t(i.title, lang)}
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">
            {t(i.body, lang)}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <IntraRequestDialog>
              <button
                type="button"
                className="inline-flex w-full max-w-full items-center justify-center rounded-[10px] border border-sun bg-sun px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-sun-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun sm:w-auto"
              >
                {t(i.requestCta, lang)}
              </button>
            </IntraRequestDialog>
            <a
              href="/intra"
              className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60 underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {t(i.privateIntraLabel, lang)}
            </a>
          </div>
        </div>

        <div className="grid gap-x-12 lg:gap-x-16 gap-y-10 md:gap-y-12 lg:grid-cols-2">
          {spaces.map((space) => (
            <div key={space.title} className="flex items-start gap-4 md:gap-5 min-w-0">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-sun-deep)" }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <h3 className="font-serif text-xl md:text-[1.35rem] lg:text-2xl text-foreground">
                  {space.title}
                </h3>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                  {space.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
