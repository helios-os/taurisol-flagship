"use client";

import Link from "next/link";
import { IntraShell, IntraSection } from "@/components/intra/IntraShell";
import { IntraRequestDialog, PrimaryCTA } from "@/components/intra/IntraRequestDialog";
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";

export default function IntraHome() {
  const { lang } = useLang();
  const c = content.intra.lobby;

  return (
    <IntraShell
      showBack={false}
      eyebrow={t(c.eyebrow, lang)}
      title={t(c.title, lang)}
      intro={t(c.intro, lang)}
    >
      <IntraSection>
        <div className="mb-10 md:mb-14">
          <p className="eyebrow mb-4">{t(c.chooseEyebrow, lang)}</p>
          <h2 className="font-serif text-2xl md:text-3xl leading-tight text-foreground max-w-2xl">
            {t(c.chooseHeading, lang)}
          </h2>
        </div>

        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {c.paths.map((p) => (
            <Link
              key={p.to}
              href={p.to}
              className="group flex flex-col justify-between gap-8 border border-border/70 bg-card p-7 md:p-8 transition-colors hover:border-foreground/40"
            >
              <div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground">
                  {t(p.label, lang)}
                </h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                  {t(p.body, lang)}
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/60 transition-colors group-hover:text-foreground">
                {t(c.enter, lang)}
              </span>
            </Link>
          ))}
        </div>
      </IntraSection>

      <IntraSection tone="sand">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-start">
          <div>
            <p className="eyebrow mb-4">{t(c.deeperEyebrow, lang)}</p>
            <h2 className="font-serif text-2xl md:text-3xl leading-tight text-foreground max-w-xl">
              {t(c.deeperHeading, lang)}
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
              {t(c.deeperBody, lang)}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-end">
            <Link
              href="/intra/founding-partner-file"
              className="inline-flex items-center rounded-[10px] border border-foreground/30 bg-transparent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-foreground transition-colors hover:border-foreground/60"
            >
              {t(c.foundingPartnerFileLabel, lang)}
            </Link>
            <IntraRequestDialog>
              <PrimaryCTA>{t(c.requestAccessCta, lang)}</PrimaryCTA>
            </IntraRequestDialog>
          </div>
        </div>
      </IntraSection>
    </IntraShell>
  );
}
