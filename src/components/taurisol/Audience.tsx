import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";
import { Reveal } from "@/components/taurisol/Reveal";

export function Audience() {
  const { lang } = useLang();
  return (
    <section id="audience" className="bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-olive">
              — {t(content.audience.eyebrow, lang)}
            </p>
            <h2 className="font-serif text-4xl leading-[1.1] text-shadow text-balance md:text-6xl">
              {t(content.audience.title, lang)}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-shadow/70 md:text-lg">
              {t(content.audience.sub, lang)}
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-px bg-stone-warm/40 md:grid-cols-2 lg:grid-cols-4">
          {content.audience.cards.map((c, i) => (
            <Reveal key={i} delay={i * 90} className="group bg-sand transition-colors hover:bg-sand-light">
              <div className="h-full p-10 md:p-12">
                <span className="font-serif text-sm italic text-olive">
                  — 0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-2xl text-shadow md:text-3xl">
                  {t(c.t, lang)}
                </h3>
                <span className="mt-6 block h-px w-10 bg-olive/40 transition-all duration-500 group-hover:w-16 group-hover:bg-sun" />
                <p className="mt-6 text-sm font-light leading-relaxed text-shadow/70 md:text-base">
                  {t(c.b, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <p className="font-serif text-xl italic leading-relaxed text-shadow/85 md:text-2xl">
              {t(content.audience.footer1, lang)}
              <br />
              {t(content.audience.footer2, lang)}
            </p>
            <a
              href="https://one.taurisol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 bg-shadow px-8 py-4 text-xs uppercase tracking-[0.25em] text-sand-light transition-all hover:bg-olive-deep hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)]"
            >
              {t(content.audience.cta, lang)}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}