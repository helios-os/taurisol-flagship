import Image from "next/image";
import Link from "next/link";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { projectsIndex, type ProjectsLang } from "./content";

export default function ProjectsPage({ lang }: { lang: ProjectsLang }) {
  const c = projectsIndex[lang];
  const href = lang === "fi" ? "/fi/projects/montefrio" : "/projects/montefrio";

  return (
    <LangProvider initialLang={lang}>
      <div className="min-h-screen bg-sand-light text-shadow">
        <Nav variant="light" />

        <main className="wrap-break-word">
          <section className="pt-36 pb-16 md:pt-48 md:pb-20">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-olive">{c.hero.eyebrow}</p>
                  <h1 className="mt-6 font-serif text-4xl leading-[1.08] text-balance text-shadow md:text-6xl">
                    {c.hero.heading}
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-shadow/75 md:text-lg">
                    {c.hero.lead}
                  </p>
                  <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-shadow/55">
                    {c.hero.note}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="pb-20 md:pb-28">
            <div className="container-page">
              <Reveal>
                <article className="overflow-hidden rounded-[28px] border-2 border-olive-deep/15 bg-sand shadow-[0_30px_70px_-40px_rgba(40,30,10,0.35)]">
                  <div className="relative aspect-video w-full">
                    <Image
                      src="/images/montefrio-countryside.webp"
                      alt={c.card.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      priority
                    />
                  </div>
                  <div className="p-8 md:p-12">
                    <span className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun/[0.08] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-olive-deep">
                      <span className="h-1.5 w-1.5 rounded-full bg-sun-deep" aria-hidden="true" />
                      {c.card.status}
                    </span>
                    <h2 className="mt-6 font-serif text-3xl text-shadow md:text-4xl">{c.card.name}</h2>
                    <p className="mt-2 text-sm font-light text-shadow/65">{c.card.location}</p>
                    <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-shadow/80">
                      {c.card.summary}
                    </p>

                    <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                      {c.card.metrics.map((m) => (
                        <div key={m.label} className="min-w-0">
                          <dt className="text-[11px] uppercase tracking-[0.2em] text-shadow/50">
                            {m.label}
                          </dt>
                          <dd className="mt-2 font-serif text-2xl text-shadow">{m.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <Link
                      href={href}
                      className="group mt-10 inline-flex w-full max-w-full items-center justify-center gap-3 rounded-[10px] bg-sun px-8 py-4 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-shadow transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun-soft hover:shadow-[0_14px_40px_-12px_var(--sun)] sm:w-auto sm:tracking-[0.25em]"
                    >
                      <span className="min-w-0 wrap-break-word">{c.card.cta}</span>
                      <span className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            </div>
          </section>

          <section className="pb-24 md:pb-32">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-2xl">
                  <h2 className="font-serif text-2xl text-shadow md:text-4xl">
                    {c.governance.heading}
                  </h2>
                  {c.governance.body.map((p) => (
                    <p
                      key={p}
                      className="mt-6 text-sm font-light leading-relaxed text-shadow/75 md:text-base"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </LangProvider>
  );
}