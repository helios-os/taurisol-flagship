import Image from "next/image";
import { content, t, type Lang } from "@/lib/i18n";

export function Hero({ lang }: { lang: Lang }) {
  const h = content.livingLab.hero;
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/living-lab-hero-olive.jpg"
          alt="Ancient olive grove on an Andalusian hillside at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 55%, color-mix(in oklab, oklch(0.24 0.03 95) 30%, transparent) 100%)",
          }}
        />
      </div>
      <div className="container-page relative min-h-[100vh] flex flex-col justify-end pt-32 pb-24 md:pb-28 lg:pb-32">
        <p
          className="eyebrow mb-8"
          style={{ color: "var(--color-sand)", textShadow: "0 1px 12px oklch(0.2 0.03 95 / 0.55)" }}
        >
          {t(h.eyebrow, lang)}
        </p>
        <h1
          className="max-w-5xl font-serif text-[2.65rem] sm:text-[3.3rem] md:text-[4.9rem] lg:text-[6.5rem] leading-[0.92] tracking-[-0.025em] text-balance"
          style={{ textShadow: "0 2px 24px oklch(0.2 0.03 95 / 0.55)" }}
        >
          {t(h.heading, lang)}
        </h1>
        <p
          className="mt-8 md:mt-10 max-w-3xl text-[2.05rem] md:text-[2.3rem] lg:text-[2.75rem] leading-[0.9] md:leading-[0.93] lg:leading-[0.96] font-serif italic text-primary-foreground/90"
          style={{ textShadow: "0 1px 14px oklch(0.2 0.03 95 / 0.55)" }}
        >
          {t(h.lede, lang)}
        </p>
      </div>
    </section>
  );
}
