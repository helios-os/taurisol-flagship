"use client";

import { IntraShell, IntraSection } from "@/components/intra/IntraShell";
import { IntraRequestDialog, PrimaryCTA } from "@/components/intra/IntraRequestDialog";
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";

export default function FoundingPartnerFilePage() {
  const { lang } = useLang();
  const c = content.intra.foundingPartnerFile;
  const includes = c.includesItems.map((it) => t(it, lang));

  return (
    <IntraShell eyebrow={t(c.eyebrow, lang)} title={t(c.title, lang)} intro={t(c.intro, lang)}>
      <IntraSection>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-start">
          <div>
            <p className="text-base md:text-lg leading-relaxed text-foreground max-w-xl">
              {t(c.body1, lang)}
            </p>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
              {t(c.body2, lang)}
            </p>
          </div>

          <aside className="border border-border/70 bg-card p-8 md:p-10">
            <p className="eyebrow mb-4">{t(c.accessLabel, lang)}</p>
            <p className="font-serif text-4xl md:text-5xl text-foreground">{c.price}</p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t(c.priceCaption, lang)}
            </p>
            <div className="mt-8">
              <IntraRequestDialog variant="founding">
                <PrimaryCTA>{t(c.requestCta, lang)}</PrimaryCTA>
              </IntraRequestDialog>
            </div>
          </aside>
        </div>
      </IntraSection>

      <IntraSection tone="sand">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{t(c.includesEyebrow, lang)}</p>
          <h2 className="font-serif text-2xl md:text-3xl leading-tight text-foreground">
            {t(c.includesHeading, lang)}
          </h2>
          <ul className="mt-8 space-y-3">
            {includes.map((it) => (
              <li key={it} className="flex items-start gap-3">
                <span
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--color-sun-deep)" }}
                  aria-hidden="true"
                />
                <span className="text-sm md:text-base text-foreground leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </IntraSection>
    </IntraShell>
  );
}
