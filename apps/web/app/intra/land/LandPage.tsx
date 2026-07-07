"use client";

import { IntraShell, IntraSection, IntraBlock, IntraNext } from "@/components/intra/IntraShell";
import { IntraRequestDialog, PrimaryCTA, SecondaryCTA } from "@/components/intra/IntraRequestDialog";
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";

export default function LandPage() {
  const { lang } = useLang();
  const c = content.intra.land;

  return (
    <IntraShell eyebrow={t(c.eyebrow, lang)} title={t(c.title, lang)} intro={t(c.intro, lang)}>
      <IntraSection>
        <div className="grid gap-12 md:gap-16 lg:grid-cols-2">
          <IntraBlock
            heading={t(c.interestedHeading, lang)}
            items={c.interestedItems.map((it) => t(it, lang))}
          />
          <IntraBlock
            tone="muted"
            heading={t(c.notLookingHeading, lang)}
            items={c.notLookingItems.map((it) => t(it, lang))}
          />
        </div>
      </IntraSection>

      <IntraSection tone="sand">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-start">
          <IntraNext label={t(c.nextLabel, lang)} body={t(c.nextBody, lang)} />
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
            <IntraRequestDialog defaultPath="land">
              <PrimaryCTA>{t(c.submitCta, lang)}</PrimaryCTA>
            </IntraRequestDialog>
            <IntraRequestDialog defaultPath="land" variant="founding">
              <SecondaryCTA>{t(content.intra.requestFoundingPartnerFile, lang)}</SecondaryCTA>
            </IntraRequestDialog>
          </div>
        </div>
      </IntraSection>
    </IntraShell>
  );
}
