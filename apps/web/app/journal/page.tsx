import type { Metadata } from "next";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { getJournalPillars } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal — Taurisol",
  description:
    "Perspectives on sales leadership, value creation and commercial culture — from 50 years of B2B sales experience.",
};

export default async function JournalPage() {
  const { pillars } = await getJournalPillars("en");

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
                — Journal
              </p>
              <h1
                className="font-serif text-5xl leading-[1.05] text-balance animate-fade-up md:text-7xl"
                style={{ animationDelay: "80ms" }}
              >
                Sales Mind
              </h1>
              <p
                className="mt-8 max-w-2xl text-base font-light leading-relaxed text-sand-light/70 animate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                Perspectives on sales leadership, value creation and commercial
                culture — from 50 years of B2B sales experience.
              </p>
            </div>
          </section>

          <JournalGrid pillars={pillars} />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
