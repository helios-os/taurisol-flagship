import { content, t, type Lang } from "@/lib/i18n";

export function LivingLabFooter({ lang }: { lang: Lang }) {
  const f = content.livingLab.foot;

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3 items-start">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-serif text-base uppercase tracking-[0.32em] text-foreground">
              TAURISOL
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {t(f.tag, lang)}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t(f.body, lang)}</p>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="eyebrow mb-3">{t(f.contactLabel, lang)}</p>
          <p>info@heliosdigitech.com</p>
          <p className="mt-1">{t(f.locationLabel, lang)}</p>
        </div>

        <div className="text-sm text-muted-foreground md:text-right">
          <p className="eyebrow mb-3">{t(f.noticeLabel, lang)}</p>
          <p>{t(f.noticeBody, lang)}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Taurisol</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="https://heliosdigitech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Helios Digitech Oy
            </a>
            <a
              href="https://os.heliosdigitech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Helios OS
            </a>
            <span>
              {t(f.locationLabel, lang)} · {t(f.rightsLine, lang)}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
