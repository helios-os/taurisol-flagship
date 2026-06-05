import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";

export function Problem() {
  const { lang } = useLang();
  return (
    <section id="problem" className="relative bg-sand-light py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="max-w-3xl font-serif text-4xl leading-[1.1] text-shadow text-balance md:text-5xl lg:text-6xl">
          {t(content.problem.title, lang)}
        </h2>

        <div className="mt-20 grid gap-px bg-border md:grid-cols-2">
          {content.problem.cards.map((c, i) => (
            <div
              key={i}
              className="group bg-sand-light p-10 transition-colors hover:bg-sand md:p-14"
            >
              <div className="mb-8 flex items-center gap-4">
                <span className="font-serif text-xl italic text-olive">
                  0{i + 1}
                </span>
                <span className="h-px flex-1 bg-stone-warm/50" />
              </div>
              <h3 className="font-serif text-3xl text-shadow md:text-4xl">
                {t(c.t, lang)}
              </h3>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted-foreground">
                {t(c.b, lang)}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-20 max-w-2xl font-serif text-2xl italic leading-snug text-olive-deep md:text-3xl">
          {t(content.problem.footer, lang)}
        </p>
      </div>
    </section>
  );
}