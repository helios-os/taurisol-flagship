import { content, t, type Lang } from "@/lib/i18n";

export function WhyNow({ lang }: { lang: Lang }) {
  const w = content.livingLab.whyNow;
  const points = w.items.map((item) => t(item, lang));
  return (
    <section id="why-now" className="bg-background py-24 md:py-28 lg:py-32 scroll-mt-20">
      <div className="container-page">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow mb-6">{t(w.eyebrow, lang)}</p>
          <h2 className="font-serif text-3xl md:text-[2.5rem] lg:text-5xl leading-[1.05] tracking-[-0.02em] text-foreground text-balance">
            {t(w.title, lang)}
          </h2>
        </div>
        <ul className="grid gap-x-8 lg:gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <li key={p} className="flex items-baseline gap-4 border-t border-border/70 pt-4 min-w-0">
              <span className="font-serif text-xs text-sun-deep tabular-nums shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-lg lg:text-xl text-foreground">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
