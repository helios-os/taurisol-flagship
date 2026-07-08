import { Footer } from "@/components/footer/Footer";
import { LangProvider } from "@/components/lang-context";
import { LivingLabNav } from "@/components/living-lab/LivingLabNav";
import { Hero } from "@/components/living-lab/Hero";
import { WhyBuild } from "@/components/living-lab/WhyBuild";
import { LocationFlow } from "@/components/living-lab/LocationFlow";
import { Collaborators } from "@/components/living-lab/Collaborators";
import { IntraLocked } from "@/components/living-lab/IntraLocked";
import { WhyNow } from "@/components/living-lab/WhyNow";
import { FinalCTA } from "@/components/living-lab/FinalCTA";
import type { Lang } from "@/lib/i18n";

export default function LivingLabPage({ lang }: { lang: Lang }) {
  return (
    <LangProvider initialLang={lang}>
      <div className="min-h-screen bg-background text-foreground">
        <LivingLabNav lang={lang} />
        <main className="wrap-break-word">
          <Hero lang={lang} />
          <WhyBuild lang={lang} />
          <LocationFlow lang={lang} />
          <Collaborators lang={lang} />
          <IntraLocked lang={lang} />
          <WhyNow lang={lang} />
          <FinalCTA lang={lang} />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
