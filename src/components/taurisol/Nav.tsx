import { useLang } from "@/components/LangContext";

export function Nav() {
  const { lang, setLang } = useLang();
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <a href="#top" className="font-serif text-xl tracking-[0.28em] text-background mix-blend-difference">
          TAURISOL
        </a>
        <div className="flex items-center gap-6 text-xs tracking-[0.2em] uppercase text-background mix-blend-difference">
          <button
            onClick={() => setLang("en")}
            className={`transition-opacity ${lang === "en" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
            aria-label="English"
          >
            EN
          </button>
          <span className="opacity-40">/</span>
          <button
            onClick={() => setLang("fi")}
            className={`transition-opacity ${lang === "fi" ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
            aria-label="Suomi"
          >
            FI
          </button>
        </div>
      </div>
    </header>
  );
}