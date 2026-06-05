import { useLang } from "@/components/LangContext";
import { content, t } from "@/lib/i18n";

export function Footer() {
  const { lang } = useLang();

  const exploreLinks = [
    { label: content.nav.philosophy, href: "#philosophy" },
    { label: content.nav.how, href: "#how" },
    { label: content.nav.homes, href: "#homes" },
    { label: content.nav.location, href: "#location" },
    { label: content.nav.one, href: "#one" },
    { label: content.nav.faq, href: "#faq" },
  ] as const;

  return (
    <footer id="faq" className="bg-olive-night text-sand-light">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Brand block */}
        <div className="border-b border-sand/10 py-20 text-center md:py-28">
          <h2 className="font-serif text-4xl tracking-[0.2em] md:text-5xl">
            TAURISOL
          </h2>
          <p className="mt-6 font-serif text-2xl italic text-sand md:text-3xl">
            {t(content.hero.title, lang)}
          </p>
          <p className="mt-2 text-sm font-light tracking-wide text-sand-light/60 md:text-base">
            {t(content.hero.sub, lang)}
          </p>

          <p className="mx-auto mt-10 max-w-2xl text-sm font-light leading-relaxed text-sand-light/45">
            {t(content.footer.heliosNote, lang)}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 md:gap-12">
          {/* Explore */}
          <div>
            <h3 className="mb-6 text-[11px] uppercase tracking-[0.25em] text-sand-light/35">
              {t(content.footer.explore, lang)}
            </h3>
            <ul className="space-y-3.5">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-light text-sand-light/60 transition-colors duration-300 hover:text-sun"
                  >
                    {t(item.label, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-[11px] uppercase tracking-[0.25em] text-sand-light/35">
              {t(content.footer.company, lang)}
            </h3>
            <ul className="space-y-3.5">
              <li className="text-sm font-light text-sand-light/60">
                {t(content.footer.heliosDigitech, lang)}
              </li>
              <li className="text-sm font-light text-sand-light/60">
                {t(content.footer.heliosOS, lang)}
              </li>
              <li className="text-sm font-light text-sand-light/60">
                {t(content.footer.contact, lang)}
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-[11px] uppercase tracking-[0.25em] text-sand-light/35">
              {t(content.footer.legal, lang)}
            </h3>
          </div>

          {/* CTA */}
          <div className="col-span-2 flex flex-col items-start md:col-span-1 md:items-end">
            <a
              href="https://one.taurisol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-[10px] bg-sun px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-shadow transition-all duration-300 hover:bg-sun-soft hover:shadow-[0_14px_40px_-12px_var(--sun)]"
            >
              {t(content.footer.startCta, lang)}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-sand/10 py-8 text-xs uppercase tracking-[0.2em] text-sand-light/35 md:flex-row">
          <span>
            © {new Date().getFullYear()} Taurisol / Helios Digitech Oy
          </span>
          <span>Andalucía · España</span>
        </div>
      </div>
    </footer>
  );
}
