import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";

export function Pillars() {
  const { lang } = useLang();
  return (
    <section className="bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-3 md:gap-px">
          {content.pillars.cards.map((c, i) => (
            <div
              key={i}
              className="relative border-t border-olive-deep/30 pt-10 md:border-l md:border-t-0 md:pl-10 md:pt-0 md:first:border-l-0 md:first:pl-0"
            >
              <span className="font-serif text-sm italic text-olive">
                — 0{i + 1}
              </span>
              <h3 className="mt-6 font-serif text-4xl text-shadow md:text-5xl">
                {t(c.t, lang)}
              </h3>
              <p className="mt-6 text-base font-light leading-relaxed text-shadow/75">
                {t(c.b, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}