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
      <div className="min-h-screen bg-shadow text-sand-light">
        <Nav variant="light" />
        <main>
          {/*
           * Desktop: full-width hero image with button group overlaid on the
           *          left side. Buttons are positioned inside the image, not
           *          beside it — no sidebar, no flex row.
           * Mobile:  image at full natural width, buttons stacked below.
           */}
          <section className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/taurisol-journal-hero.webp"
              alt="Taurisol — Field Notes from a Place to Return"
              fetchPriority="high"
              decoding="async"
              className="block w-full h-auto"
            />

            {/* Desktop overlay — absolute inside the hero image, left side */}
            <div
              className="hidden lg:flex flex-col gap-5 absolute z-10 top-[30%] w-[270px]"
              style={{ left: "clamp(24px, 5vw, 72px)" }}
            >
              <p className="text-[10px] uppercase tracking-[0.42em] text-sun/60">
                — Taurisol Journal
              </p>
              <JournalGrid
                categories={categories}
                lang="en"
                basePath="/journal"
              />
            </div>
          </section>

          {/* Mobile — buttons below the image */}
          <div className="lg:hidden flex flex-col gap-5 px-6 py-10">
            <p className="text-[10px] uppercase tracking-[0.42em] text-sun/60">
              — Taurisol Journal
            </p>
            <JournalGrid
              categories={categories}
              lang="en"
              basePath="/journal"
            />
          </div>
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
