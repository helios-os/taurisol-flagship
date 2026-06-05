"use client";

import { useLang } from "@/components/lang-context";
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
        <div className="border-b border-sand/10 py-16 text-center md:py-20">
          <h2 className="font-serif text-4xl tracking-[0.2em] md:text-5xl">
            TAURISOL
          </h2>
          <p className="mt-5 font-serif text-2xl italic text-sand md:text-3xl">
            {t(content.hero.title, lang)}
          </p>
          <p className="mt-2 text-sm font-light tracking-wide text-sand-light/60 md:text-base">
            {t(content.hero.sub, lang)}
          </p>

          <p className="mx-auto mt-8 max-w-2xl text-sm font-light leading-relaxed text-sand-light/45">
            {t(content.footer.heliosNote, lang)}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-12 md:grid-cols-3 md:gap-12">
          {/* Explore */}
          <div>
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.25em] text-sand-light/35">
              {t(content.footer.explore, lang)}
            </h3>
            <ul className="space-y-3">
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
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.25em] text-sand-light/35">
              {t(content.footer.company, lang)}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://one.taurisol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-sand-light/60 transition-colors duration-300 hover:text-sun"
                >
                  {t(content.footer.heliosDigitech, lang)}
                </a>
              </li>
              <li>
                <a
                  href="https://one.taurisol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-sand-light/60 transition-colors duration-300 hover:text-sun"
                >
                  {t(content.footer.heliosOS, lang)}
                </a>
              </li>
              <li>
                <a
                  href="https://one.taurisol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-sand-light/60 transition-colors duration-300 hover:text-sun"
                >
                  {t(content.footer.contact, lang)}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.25em] text-sand-light/35">
              {t(content.footer.legal, lang)}
            </h3>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-sand/10 py-8 text-center md:flex-row md:justify-between md:gap-3 md:text-left">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs uppercase tracking-[0.2em] text-sand-light/35">
              © {new Date().getFullYear()} Taurisol / Helios Digitech Oy
            </span>
            <span className="text-[11px] font-light tracking-wide text-sand-light/25">
              {t(content.footer.ownership, lang)}
            </span>
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-sand-light/35">
            Andalucía · España
          </span>
        </div>
      </div>
    </footer>
  );
}
