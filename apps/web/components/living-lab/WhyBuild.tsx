import Image from "next/image";
import { content, t, type Lang } from "@/lib/i18n";

export function WhyBuild({ lang }: { lang: Lang }) {
  const w = content.livingLab.why;
  return (
    <section id="brief" className="bg-background py-28 md:py-32 lg:py-40 scroll-mt-20">
      <div className="container-page">
        <div className="grid gap-14 md:gap-16 lg:gap-24 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7 min-w-0">
            <p className="eyebrow mb-8">{t(w.eyebrow, lang)}</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-balance text-foreground">
              {t(w.title, lang)}
            </h2>
            <p className="mt-8 md:mt-10 font-serif text-2xl md:text-[1.65rem] lg:text-3xl leading-snug text-foreground/80 italic max-w-xl">
              {t(w.tag, lang)}
            </p>
            <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl">
              {t(w.body, lang)}
            </p>
          </div>
          <figure className="md:col-span-5 md:pl-6 min-w-0">
            <div className="relative aspect-4/5 overflow-hidden bg-secondary">
              <Image
                src="/images/montefrio-countryside.webp"
                alt="Olive grove above Montefrío, Granada, at sunset"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground/80">
              {t(w.caption, lang)}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
