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
        <Nav />

        <main>
          {/*
           * Desktop: full-viewport flex row.
           *   Left  — 340 px panel: "Taurisol Journal" label + 7 category buttons.
           *   Right — remaining width: hero image, object-contain (no cropping).
           *
           * Mobile: stacked column.
           *   Top  — hero image full-width at natural aspect ratio.
           *   Below — label + 7 category buttons.
           *
           * The hero image already contains all branding text.
           * No HTML title / subtitle is rendered on top of or near the image.
           */}
          <section className="flex flex-col lg:flex-row lg:min-h-screen">

            {/* ── Hero image ─────────────────────────────────────────────── */}
            {/*
             * Mobile:  block, w-full h-auto — natural aspect ratio, never cropped.
             * Desktop: flex-1 relative — image fills available space with
             *          object-contain so all embedded text remains visible.
             */}
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
            {/*
             * Mobile:  below the image, full-width, comfortable padding.
             * Desktop: fixed 340 px wide, full height, vertically centred.
             *          order-first pushes it to the LEFT of the image.
             */}
            <div className="flex flex-col justify-center gap-8 bg-shadow px-6 py-12 lg:order-first lg:w-[340px] lg:shrink-0 lg:px-10 lg:pt-24 lg:pb-16">
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
        </main>

        <Footer />
      </div>
    </LangProvider>
  );
}
