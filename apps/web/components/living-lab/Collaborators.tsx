import { IntraRequestDialog } from "@/components/intra/IntraRequestDialog";
import { content, t, type Lang } from "@/lib/i18n";

export function Collaborators({ lang }: { lang: Lang }) {
  const c = content.livingLab.col;
  const invitations = [
    { id: "land", defaultPath: "land", number: "I.", q: t(c.land.q, lang), b: t(c.land.b, lang) },
    { id: "research", defaultPath: "research", number: "II.", q: t(c.research.q, lang), b: t(c.research.b, lang) },
    { id: "funding", defaultPath: "funding", number: "III.", q: t(c.funding.q, lang), b: t(c.funding.b, lang) },
    { id: "operator", defaultPath: "communities", number: "IV.", q: t(c.operator.q, lang), b: t(c.operator.b, lang) },
  ];
  return (
    <section id="collaborators" className="bg-background py-28 md:py-32 lg:py-44 scroll-mt-20">
      <div className="container-page">
        <header className="max-w-3xl mb-20 md:mb-24 lg:mb-28">
          <p className="eyebrow mb-6">{t(c.eyebrow, lang)}</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-balance text-foreground">
            {t(c.title, lang)}
          </h2>
          <p className="mt-8 font-serif italic text-xl md:text-[1.35rem] lg:text-2xl text-foreground/70 max-w-2xl">
            {t(c.sub, lang)}
          </p>
        </header>

        <ul className="divide-y divide-border/70 border-y border-border/70">
          {invitations.map((item) => (
            <li key={item.id} className="group">
              <IntraRequestDialog defaultPath={item.defaultPath}>
                <button
                  type="button"
                  className="w-full grid gap-6 md:grid-cols-[3rem_1fr_auto] lg:grid-cols-[4rem_1fr_auto] items-baseline py-10 md:py-12 lg:py-16 text-left transition-colors hover:bg-secondary/60 focus-visible:outline-none focus-visible:bg-secondary/60"
                >
                  <span className="font-serif text-lg text-sun-deep tracking-wider">
                    {item.number}
                  </span>
                  <div className="max-w-3xl min-w-0">
                    <h3 className="font-serif text-2xl md:text-[1.85rem] lg:text-4xl leading-[1.15] tracking-[-0.015em] text-foreground text-balance">
                      {item.q}
                    </h3>
                    <p className="mt-5 text-base lg:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                      {item.b}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="hidden md:inline-flex items-center gap-2 text-sm font-medium tracking-wide text-primary transition-transform group-hover:translate-x-1"
                  >
                    {t(c.step, lang)}
                    <span>→</span>
                  </span>
                </button>
              </IntraRequestDialog>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
