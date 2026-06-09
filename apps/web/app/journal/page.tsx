import type { Metadata } from "next";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { getAllCategories } from "@/lib/journal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Taurisol Journal — Field Notes from a Place to Return",
  description:
    "Reflections on philosophy, place, design, energy, rituals and the making of Taurisol. Field notes from Andalusia.",
  alternates: {
    canonical: "https://taurisol.com/journal",
    languages: { fi: "https://taurisol.com/fi/journal" },
  },
};

export default function JournalIndexPage() {
  const categories = getAllCategories();

  return (
    <LangProvider initialLang="en">
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
                Field Notes from a<br />Place to Return
              </h1>
              <p
                className="mt-8 max-w-2xl text-base font-light leading-relaxed text-sand-light/70 animate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                Reflections on philosophy, place, design, energy, rituals and
                the making of Taurisol.
              </p>
            </div>
          </section>

          <JournalGrid categories={categories} lang="en" basePath="/journal" />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
