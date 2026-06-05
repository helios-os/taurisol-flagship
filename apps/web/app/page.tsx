import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Outcome } from "@/components/sections/Outcome";
import { Pillars } from "@/components/sections/Pillars";
import { Why } from "@/components/sections/Why";
import { Location } from "@/components/sections/Location";
import { Winters } from "@/components/sections/Winters";
import { Trust } from "@/components/sections/Trust";
import { Audience } from "@/components/sections/Audience";
import { TaurisolOne } from "@/components/sections/TaurisolOne";
import { Footer } from "@/components/footer/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function Home() {
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
          <Location />
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
