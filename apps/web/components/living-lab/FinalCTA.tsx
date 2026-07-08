import { IntraRequestDialog } from "@/components/intra/IntraRequestDialog";
import { content, t, type Lang } from "@/lib/i18n";

export function FinalCTA({ lang }: { lang: Lang }) {
  const c = content.livingLab.finalCta;
  return (
    <section id="request" className="bg-primary text-primary-foreground py-36 md:py-44 lg:py-56 scroll-mt-20">
      <div className="container-page">
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-8" style={{ color: "var(--color-sand)" }}>
            {t(c.eyebrow, lang)}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-balance">
            {t(c.title, lang)}
          </h2>
          <p className="mt-10 md:mt-12 font-serif italic text-2xl md:text-3xl lg:text-4xl text-primary-foreground/85">
            {t(c.sub, lang)}
          </p>
          <div className="mt-14 md:mt-16 flex justify-center">
            <IntraRequestDialog>
              <button
                type="button"
                className="inline-flex w-full max-w-full items-center justify-center rounded-[10px] border border-sun bg-sun px-8 py-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-foreground shadow-sm transition-colors hover:bg-sun-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:w-auto sm:tracking-[0.25em]"
              >
                {t(c.button, lang)}
              </button>
            </IntraRequestDialog>
          </div>
        </div>
      </div>
    </section>
  );
}
