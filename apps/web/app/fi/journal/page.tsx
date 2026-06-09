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
      <div className="min-h-screen bg-shadow text-sand-light">
        <Nav />

        <main>
          {/*
           * Same layout as /journal — both use the English hero image.
           * The image already contains all branding text; no HTML text is
           * rendered on top of or alongside the image.
           */}
          <section className="flex flex-col lg:flex-row lg:min-h-screen">

            {/* ── Hero image ─────────────────────────────────────────────── */}
            <div className="w-full lg:relative lg:flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/taurisol-journal-hero.webp"
                alt="Taurisol — Field Notes from a Place to Return"
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-contain"
              />
            </div>

            {/* ── Category panel ─────────────────────────────────────────── */}
            <div className="flex flex-col justify-center gap-8 bg-shadow px-6 py-12 lg:order-first lg:w-[340px] lg:shrink-0 lg:px-10 lg:pt-24 lg:pb-16">
              <p className="text-[10px] uppercase tracking-[0.42em] text-sun/60">
                — Taurisol Journal
              </p>
              <JournalGrid
                categories={categories}
                lang="fi"
                basePath="/fi/journal"
              />
            </div>

          </section>
        </main>

        <Footer />
      </div>
    </LangProvider>
  );
}
