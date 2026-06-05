import oliveImg from "@/assets/olive-detail.jpg";
import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";
import { Reveal } from "@/components/taurisol/Reveal";

export function Why() {
  const { lang } = useLang();
  return (
    <section id="how" className="bg-sand-light py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="mx-auto mb-24 max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-olive">
              — {lang === "en" ? "Why Taurisol is different" : "Miksi Taurisol on erilainen"}
            </p>
            <p className="font-serif text-3xl leading-[1.2] text-shadow md:text-5xl">
              {t(content.why.intro1, lang)}
              <br />
              <span className="italic text-olive-deep">
                {t(content.why.intro2, lang)}
              </span>
            </p>
          </div>
        </Reveal>

        <div className="mb-24 grid gap-px bg-border md:grid-cols-3">
          {content.why.cards.map((c, i) => (
            <Reveal key={i} delay={i * 100} className="bg-sand-light">
              <div className="h-full p-10 md:p-12">
                <div className="text-3xl">{c.icon ? t(c.icon, lang) : ""}</div>
                <h3 className="mt-8 font-serif text-2xl text-shadow md:text-3xl">
                  {t(c.t, lang)}
                </h3>
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                  {t(c.b, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="grid items-center gap-12 md:grid-cols-12">
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
              <p className="font-serif text-2xl italic leading-snug text-olive-deep md:text-3xl">
                {t(content.why.title, lang)}
              </p>
              <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                {lang === "en"
                  ? "Every choice is made to remove friction, hidden costs and dependency — so the promise stays simple to live."
                  : "Jokainen valinta on tehty poistamaan kitkaa, piilokuluja ja riippuvuutta — jotta lupaus pysyy yksinkertaisena elää."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}