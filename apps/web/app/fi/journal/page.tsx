import type { Metadata } from "next";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { getAllCategories } from "@/lib/journal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Taurisol Journal — Kirjoituksia paikasta, johon palataan",
  description:
    "Pohdintoja filosofiasta, paikasta, designista, energiasta, rituaaleista ja Taurisoliin rakentamisesta. Kenttämuistiinpanoja Andalusiasta.",
  alternates: {
    canonical: "https://taurisol.com/fi/journal",
    languages: { en: "https://taurisol.com/journal" },
  },
};

export default function FiJournalIndexPage() {
  const categories = getAllCategories();

  return (
    <LangProvider initialLang="fi">
      <div className="min-h-screen scroll-smooth bg-background text-foreground">
        <Nav />
        <main>
          <section className="bg-shadow pb-24 pt-40 md:pb-32 md:pt-56 text-sand-light">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <p
                className="mb-5 text-xs uppercase tracking-[0.35em] text-sun animate-fade-up"
                style={{ animationDelay: "0ms" }}
              >
                — Taurisol Journal
              </p>
              <h1
                className="font-serif text-5xl leading-[1.05] text-balance animate-fade-up md:text-7xl"
                style={{ animationDelay: "80ms" }}
              >
                Kirjoituksia paikasta,<br />johon palataan
              </h1>
              <p
                className="mt-8 max-w-2xl text-base font-light leading-relaxed text-sand-light/70 animate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                Pohdintoja filosofiasta, paikasta, designista, energiasta,
                rituaaleista ja Taurisoliin rakentamisesta.
              </p>
            </div>
          </section>

          <JournalGrid categories={categories} lang="fi" basePath="/fi/journal" />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
