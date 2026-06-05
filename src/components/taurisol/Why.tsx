import oliveImg from "@/assets/olive-detail.jpg";
import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";

export function Why() {
  const { lang } = useLang();
  return (
    <section className="bg-sand-light py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img
              src={oliveImg}
              alt="Olive branch detail"
              width={1200}
              height={1500}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-olive">
              — {lang === "en" ? "How it works" : "Miten se toimii"}
            </p>
            <h2 className="font-serif text-4xl leading-[1.1] text-shadow text-balance md:text-5xl lg:text-6xl">
              {t(content.why.title, lang)}
            </h2>

            <div className="mt-14 space-y-10">
              {content.why.cards.map((c, i) => (
                <div key={i} className="border-t border-stone-warm/60 pt-8">
                  <h3 className="font-serif text-2xl text-shadow md:text-3xl">
                    {t(c.t, lang)}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                    {t(c.b, lang)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}