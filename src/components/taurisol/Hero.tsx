import { useEffect, useState } from "react";
import heroImg from "@/assets/hero-andalusia.jpg";
import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";

export function Hero() {
  const { lang } = useLang();
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(Math.min(window.scrollY, 800));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${y * 0.25}px, 0)`, willChange: "transform" }}
      >
        <img
          src={heroImg}
          alt="Andalusian olive grove at golden hour"
          width={1920}
          height={1280}
          className="h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-shadow/30 via-shadow/20 to-shadow/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-shadow/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-40 md:px-12 md:pb-28">
        <div className="max-w-3xl text-sand-light animate-fade-up">
          <p className="mb-8 text-xs uppercase tracking-[0.4em] text-sand opacity-90">
            {t(content.hero.eyebrow, lang)}
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] text-balance md:text-7xl lg:text-[5.5rem]">
            {t(content.hero.title, lang)}
          </h1>
          <p className="mt-8 font-serif text-2xl italic text-sand/95 md:text-3xl">
            {t(content.hero.sub, lang)}
          </p>
          <p className="mt-10 max-w-xl text-base font-light leading-relaxed text-sand-light/85 md:text-lg">
            {t(content.hero.body, lang)}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#problem"
              className="group inline-flex items-center gap-3 bg-sand-light px-8 py-4 text-xs uppercase tracking-[0.25em] text-shadow transition-all hover:bg-sun"
            >
              {t(content.hero.cta, lang)}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#one"
              className="inline-flex items-center gap-3 border-b border-sand-light/60 px-2 py-2 text-xs uppercase tracking-[0.25em] text-sand-light transition-colors hover:border-sun hover:text-sun"
            >
              {t(content.hero.cta2, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}