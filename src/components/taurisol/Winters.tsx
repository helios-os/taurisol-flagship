import wintersImg from "@/assets/winters.jpg";
import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";

export function Winters() {
  const { lang } = useLang();
  return (
    <section className="relative overflow-hidden bg-shadow py-32 text-sand-light md:py-48">
      <div className="absolute inset-0 opacity-40">
        <img
          src={wintersImg}
          alt=""
          width={1600}
          height={1100}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shadow via-shadow/70 to-shadow/40" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-12">
        <h2 className="font-serif text-4xl leading-[1.1] text-balance md:text-6xl lg:text-7xl">
          {t(content.winters.title, lang)}
        </h2>
        <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-relaxed text-sand-light/85 md:text-lg">
          {t(content.winters.body, lang)}
        </p>
        <a
          href="#audience"
          className="group mt-12 inline-flex items-center gap-3 rounded-[10px] border border-sun/70 px-8 py-4 text-xs uppercase tracking-[0.25em] text-sun transition-all duration-300 hover:border-sun hover:bg-sun hover:text-shadow hover:shadow-[0_0_28px_-8px_var(--sun)]"
        >
          {t(content.winters.cta, lang)}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}