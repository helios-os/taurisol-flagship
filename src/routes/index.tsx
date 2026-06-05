import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/components/LangContext";
import { Nav } from "@/components/taurisol/Nav";
import { Hero } from "@/components/taurisol/Hero";
import { Problem } from "@/components/taurisol/Problem";
import { Outcome } from "@/components/taurisol/Outcome";
import { Pillars } from "@/components/taurisol/Pillars";
import { Why } from "@/components/taurisol/Why";
import { Winters } from "@/components/taurisol/Winters";
import { Trust } from "@/components/taurisol/Trust";
import { Audience } from "@/components/taurisol/Audience";
import { TaurisolOne } from "@/components/taurisol/TaurisolOne";
import { Footer } from "@/components/taurisol/Footer";
import { ScrollToTop } from "@/components/taurisol/ScrollToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Taurisol — Make your Spain dream a reality" },
      { name: "description", content: "A new way to spend part of your life in Andalusia — freedom, certainty and a place to return. Without ownership, rental or maintenance worries." },
      { property: "og:title", content: "Taurisol — Make your Spain dream a reality" },
      { property: "og:description", content: "Freedom, certainty and a place to return. A new way to live part of your year in Andalusia." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <div className="min-h-screen scroll-smooth bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <Problem />
          <Outcome />
          <Pillars />
          <Why />
          <Winters />
          <Trust />
          <Audience />
          <TaurisolOne />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LangProvider>
  );
}
