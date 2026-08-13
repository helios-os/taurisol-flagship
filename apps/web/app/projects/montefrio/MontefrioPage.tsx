import Image from "next/image";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { ProjectAccessDialog } from "@/components/projects/ProjectAccessDialog";
import { Reveal } from "@/components/ui/Reveal";
import type { ProjectsLang } from "../content";

const copy = {
  en: {
    eyebrow: "Taurisol Project 01",
    title: "Montefrío Olive Garden",
    meta: "7.6 ha · 202 Olive Trees · Granada, Andalucía",
    type: "Taurisol Proof of Concept",
    status: "Pre-Due Diligence · Open",
    decision: "Investigate — Do Not Buy Yet",
    imageAlt: "Ancient olive tree above the Andalusian hills at sunset",
    intro: "Taurisol is evaluating this property as its first Proof of Concept. The land has not been purchased, and any acquisition is conditional on legal, technical and permitting due diligence. The concept positioning is Luxury Remote Workplace.",
    indicative: "Indicative assumption",
    metrics: [["7.6 ha", "Land", false], ["202", "Olive Trees", false], ["13", "Planned Modular Units", true], ["6–8 months", "Permitting assumption", true], ["€200k", "Founder Investor requirement", true], ["≈ €1.0M", "PoC investment", true]] as const,
    strategy: "Control the land → De-risk → Permit → Finance → Buy → Build → Sell → Scale",
    cta: "Open Pre-Due Diligence",
  },
  fi: {
    eyebrow: "Taurisol-hanke 01",
    title: "Montefrío Olive Garden",
    meta: "7,6 ha · 202 oliivipuuta · Granada, Andalucía",
    type: "Taurisol Proof of Concept",
    status: "Pre-Due Diligence · Avoinna",
    decision: "Investigate — Do Not Buy Yet",
    imageAlt: "Ikivanha oliivipuu Andalusian kukkuloiden yllä auringonlaskussa",
    intro: "Taurisol arvioi kohdetta ensimmäiseksi Proof of Concept -hankkeekseen. Maa-aluetta ei ole vielä ostettu, ja mahdollinen hankinta edellyttää juridisen, teknisen ja luvituksellisen due diligencen läpäisemistä. Konseptin positiointi on Luxury Remote Workplace.",
    indicative: "Alustava oletus",
    metrics: [["7,6 ha", "Maa-alue", false], ["202", "Oliivipuuta", false], ["13", "Suunniteltua moduuliyksikköä", true], ["6–8 kk", "Luvitusoletus", true], ["200 000 €", "Founder Investor -tarve", true], ["≈ 1,0 M€", "PoC-investointi", true]] as const,
    strategy: "Maa hallintaan → Riskin poisto → Luvitus → Rahoitus → Osto → Rakentaminen → Myynti → Skaalaus",
    cta: "Avaa Pre-Due Diligence",
  },
} as const;

export default function MontefrioPage({ lang }: { lang: ProjectsLang }) {
  const c = copy[lang];
  return (
    <LangProvider initialLang={lang}>
      <div className="min-h-screen bg-sand-light text-shadow">
        <Nav variant="light" />
        <main className="wrap-break-word pb-16 pt-28 md:pb-24 md:pt-36">
          <section className="container-page">
            <Reveal>
              <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                <div className="order-2 lg:order-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-olive">{c.eyebrow}</p>
                  <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-balance md:text-6xl">{c.title}</h1>
                  <p className="mt-5 text-sm font-medium text-shadow/75 md:text-base">{c.meta}</p>
                  <p className="mt-2 font-serif text-xl italic text-olive-deep">{c.type}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-[8px] border border-sun/50 bg-sun/[0.1] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-olive-deep">{c.status}</span>
                    <span className="rounded-[8px] bg-olive-deep px-3 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-sand-light">{c.decision}</span>
                  </div>
                  <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-shadow/78">{c.intro}</p>
                </div>
                <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-[20px] lg:order-2">
                  <Image src="/images/taurisol-olive-tree.webp" alt={c.imageAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 46vw" />
                </div>
              </div>
            </Reveal>
          </section>
          <section className="container-page mt-12 md:mt-16">
            <Reveal>
              <dl className="grid grid-cols-2 border-y border-olive-deep/15 md:grid-cols-3 lg:grid-cols-6">
                {c.metrics.map(([value, label, indicative]) => (
                  <div key={label} className="min-w-0 border-olive-deep/15 px-3 py-5 even:border-l md:border-l md:first:border-l-0 lg:px-4">
                    <dd className="font-serif text-2xl leading-none md:text-3xl">{value}</dd>
                    <dt className="mt-2 text-[10px] uppercase tracking-[0.13em] text-shadow/58">{label}</dt>
                    {indicative && <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-olive">{c.indicative}</p>}
                  </div>
                ))}
              </dl>
            </Reveal>
          </section>
          <section className="container-page mt-12 text-center md:mt-16">
            <Reveal>
              <p className="mx-auto max-w-5xl font-serif text-xl leading-relaxed text-olive-deep md:text-2xl">{c.strategy}</p>
              <ProjectAccessDialog lang={lang}>
                <button type="button" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[10px] bg-sun px-7 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-shadow transition-colors hover:bg-sun-soft">{c.cta}</button>
              </ProjectAccessDialog>
            </Reveal>
          </section>
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}