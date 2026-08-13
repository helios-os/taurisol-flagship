import Image from "next/image";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectAccessDialog } from "@/components/projects/ProjectAccessDialog";
import { montefrio, type ProjectsLang } from "../content";

const heading = "font-serif text-2xl leading-[1.15] text-balance text-shadow md:text-4xl";
const body = "text-base font-light leading-relaxed text-shadow/75";
const panel =
  "rounded-[28px] border-2 border-olive-deep/15 bg-sand p-8 shadow-[0_30px_70px_-40px_rgba(40,30,10,0.35)] md:p-14";
const bullet = "flex items-start gap-3 text-sm font-light leading-relaxed text-shadow/80";
const dot = <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sun-deep" aria-hidden="true" />;

export default function MontefrioPage({ lang }: { lang: ProjectsLang }) {
  const c = montefrio[lang];

  return (
    <LangProvider initialLang={lang}>
      <div className="min-h-screen bg-sand-light text-shadow">
        <Nav variant="light" />

        <main className="wrap-break-word">
          {/* Hero */}
          <section className="pt-36 pb-16 md:pt-48 md:pb-20">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-olive">{c.hero.eyebrow}</p>
                  <h1 className="mt-6 font-serif text-3xl leading-[1.1] text-balance text-shadow md:text-5xl">
                    {c.hero.heading}
                  </h1>
                  <p className={`mx-auto mt-8 max-w-2xl ${body} md:text-lg`}>{c.hero.lead}</p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="relative mx-auto mt-10 aspect-video w-full max-w-5xl overflow-hidden rounded-[28px] shadow-[0_30px_70px_-40px_rgba(40,30,10,0.35)] md:mt-14">
                  <Image
                    src="/images/taurisol-olive-tree.webp"
                    alt={c.hero.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
              </Reveal>

              <Reveal delay={120}>
                <dl className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {c.hero.status.map((s) => (
                    <div
                      key={s.label}
                      className="min-w-0 rounded-2xl border border-olive-deep/15 bg-sand p-5"
                    >
                      <dt className="text-[11px] uppercase tracking-[0.2em] text-shadow/50">
                        {s.label}
                      </dt>
                      <dd className="mt-2 text-sm font-medium text-shadow">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </section>

          {/* Facts */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panel}>
                  <h2 className={heading}>{c.facts.heading}</h2>
                  <p className={`mt-6 max-w-2xl ${body}`}>{c.facts.lead}</p>
                  <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {c.facts.items.map((f) => (
                      <div key={f.label} className="min-w-0">
                        <dt className="text-[11px] uppercase tracking-[0.2em] text-shadow/50">
                          {f.label}
                        </dt>
                        <dd className="mt-2 font-serif text-2xl text-shadow">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-10 max-w-2xl text-sm font-light leading-relaxed text-shadow/60">
                    {c.facts.note}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Strategy */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className={heading}>{c.strategy.heading}</h2>
                  <p className={`mx-auto mt-8 max-w-2xl ${body}`}>{c.strategy.lead}</p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <ol className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
                  {c.strategy.sequence.map((s, i) => (
                    <li key={s} className="flex items-center gap-3">
                      <span className="rounded-full border border-sun/40 bg-sun/[0.07] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-olive-deep">
                        {s}
                      </span>
                      {i < c.strategy.sequence.length - 1 && (
                        <span className="text-shadow/30" aria-hidden="true">
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </Reveal>
              <p className={`mx-auto mt-10 max-w-2xl text-center ${body}`}>{c.strategy.body}</p>
            </div>
          </section>

          {/* Concept */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panel}>
                  <h2 className={heading}>{c.concept.heading}</h2>
                  <div className="mt-6 max-w-2xl space-y-5">
                    {c.concept.body.map((p) => (
                      <p key={p} className={body}>
                        {p}
                      </p>
                    ))}
                  </div>
                  <p className="mt-8 font-serif text-xl italic text-olive-deep md:text-2xl">
                    {c.concept.positioning}
                  </p>
                  <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
                    {c.concept.items.map((i) => (
                      <li key={i} className={bullet}>
                        {dot}
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Why here */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl">
                  <h2 className={heading}>{c.why.heading}</h2>
                  <p className={`mt-8 ${body}`}>{c.why.lead}</p>
                  <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
                    {c.why.items.map((i) => (
                      <li key={i} className={bullet}>
                        {dot}
                        {i}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-10 font-serif text-lg italic leading-relaxed text-olive-deep md:text-xl">
                    {c.why.closing}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Known / unknown */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panel}>
                  <h2 className={heading}>{c.knowledge.heading}</h2>
                  <p className={`mt-6 max-w-2xl ${body}`}>{c.knowledge.lead}</p>
                  <div className="mt-10 grid gap-10 md:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-olive-deep">
                        {c.knowledge.documentedLabel}
                      </p>
                      <ul className="mt-4 space-y-3">
                        {c.knowledge.documented.map((i) => (
                          <li key={i} className={bullet}>
                            {dot}
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-olive-deep">
                        {c.knowledge.verifyLabel}
                      </p>
                      <ul className="mt-4 space-y-3">
                        {c.knowledge.verify.map((i) => (
                          <li key={i} className={bullet}>
                            {dot}
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-10 max-w-2xl text-sm font-light leading-relaxed text-shadow/60">
                    {c.knowledge.note}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Permitting */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl">
                  <h2 className={heading}>{c.permitting.heading}</h2>
                  <div className="mt-8 space-y-5">
                    {c.permitting.body.map((p) => (
                      <p key={p} className={body}>
                        {p}
                      </p>
                    ))}
                  </div>
                  <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                    {c.permitting.frameworks.map((f) => (
                      <div
                        key={f.label}
                        className="min-w-0 rounded-2xl border border-olive-deep/15 bg-sand p-5"
                      >
                        <dt className="text-[11px] uppercase tracking-[0.2em] text-shadow/50">
                          {f.label}
                        </dt>
                        <dd className="mt-2 text-sm font-medium text-shadow">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Dúrcal */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panel}>
                  <h2 className={heading}>{c.durcal.heading}</h2>
                  <p className={`mt-6 max-w-2xl ${body}`}>{c.durcal.lead}</p>
                  <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
                    {c.durcal.items.map((i) => (
                      <li key={i} className={bullet}>
                        {dot}
                        {i}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-10 max-w-2xl text-sm font-light leading-relaxed text-shadow/60">
                    {c.durcal.closing}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl">
                  <h2 className={heading}>{c.timeline.heading}</h2>
                  <p className={`mt-8 ${body}`}>{c.timeline.lead}</p>
                </div>
              </Reveal>
              <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
                {c.timeline.phases.map((p, i) => (
                  <Reveal key={p.period} delay={i * 80} className="min-w-0">
                    <div className="h-full rounded-[24px] border-2 border-olive-deep/15 bg-sand p-7">
                      <p className="font-serif text-2xl text-shadow">{p.period}</p>
                      <ul className="mt-5 space-y-3">
                        {p.items.map((it) => (
                          <li key={it} className={bullet}>
                            {dot}
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="mx-auto mt-10 max-w-2xl text-center text-sm font-light leading-relaxed text-shadow/60">
                {c.timeline.note}
              </p>
            </div>
          </section>

          {/* Gates */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panel}>
                  <h2 className={heading}>{c.gates.heading}</h2>
                  <p className={`mt-6 max-w-2xl ${body}`}>{c.gates.lead}</p>
                  <ol className="mt-10 grid gap-6 md:grid-cols-2">
                    {c.gates.items.map((g) => (
                      <li
                        key={g.n}
                        className="min-w-0 rounded-2xl border border-olive-deep/15 bg-sand-light/60 p-6"
                      >
                        <p className="font-serif text-sm tracking-[0.2em] text-sun-deep">{g.n}</p>
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-olive-deep">
                          {g.title}
                        </p>
                        <p className="mt-3 text-sm font-light leading-relaxed text-shadow/80">
                          {g.question}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Gated section */}
          <section id="full-file" className="scroll-mt-28 py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-2xl min-w-0 rounded-[28px] border-2 border-sun bg-sand p-6 shadow-[0_40px_90px_-35px_var(--sun)] sm:p-10 md:p-14">
                  <p className="text-xs uppercase tracking-[0.35em] text-olive">— {c.gated.eyebrow}</p>
                  <h2 className="mt-6 font-serif text-xl leading-[1.2] text-balance text-shadow md:text-4xl">
                    {c.gated.heading}
                  </h2>
                  <p className={`mt-8 ${body}`}>{c.gated.lead}</p>

                  <ul className="mt-8 space-y-3.5">
                    {c.gated.items.map((i) => (
                      <li key={i} className={`${bullet} text-shadow/70`}>
                        <span
                          className="mt-1.5 h-3 w-3 shrink-0 rounded-[3px] border border-olive-deep/30 bg-olive-deep/10"
                          aria-hidden="true"
                        />
                        {i}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 text-sm font-light leading-relaxed text-shadow/60">
                    {c.gated.disclaimer}
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <ProjectAccessDialog variant="access" lang={lang}>
                      <button
                        type="button"
                        className="group inline-flex w-full max-w-full items-center justify-center gap-3 rounded-[10px] bg-sun px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.15em] text-shadow transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun-soft hover:shadow-[0_14px_40px_-12px_var(--sun)] sm:w-auto sm:tracking-[0.25em]"
                      >
                        <span className="min-w-0 wrap-break-word">{c.gated.cta}</span>
                        <span className="shrink-0 transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    </ProjectAccessDialog>
                    <ProjectAccessDialog variant="question" lang={lang}>
                      <button
                        type="button"
                        className="max-w-full text-center text-xs font-medium uppercase tracking-[0.14em] text-shadow/70 underline underline-offset-4 transition-colors hover:text-shadow sm:tracking-[0.22em]"
                      >
                        {c.gated.secondaryCta}
                      </button>
                    </ProjectAccessDialog>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Mission */}
          <section className="py-10 md:py-14">
            <div className="container-page">
              <Reveal>
                <div className={panel}>
                  <h2 className={heading}>{c.mission.heading}</h2>
                  <p className={`mt-6 max-w-2xl ${body}`}>{c.mission.lead}</p>
                  <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
                    {c.mission.items.map((i) => (
                      <li key={i} className={bullet}>
                        {dot}
                        {i}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-10 max-w-2xl font-serif text-lg italic leading-relaxed text-olive-deep">
                    {c.mission.closing}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Conclusion */}
          <section className="py-20 md:py-28">
            <div className="container-page">
              <Reveal>
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className={heading}>{c.conclusion.heading}</h2>
                  <p className={`mx-auto mt-8 max-w-2xl ${body}`}>{c.conclusion.question}</p>
                  <p className="mt-10 font-serif text-2xl uppercase tracking-[0.12em] text-shadow md:text-3xl">
                    {c.conclusion.decision}
                  </p>
                  <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-olive-deep">
                    {c.conclusion.sequence}
                  </p>
                  <p className="mx-auto mt-10 max-w-2xl font-serif text-xl italic leading-relaxed text-olive-deep md:text-2xl">
                    {c.conclusion.thesis}
                  </p>
                  <p className="mx-auto mt-8 max-w-xl text-sm font-light leading-relaxed text-shadow/60">
                    {c.conclusion.note}
                  </p>
                  <p className="mt-12 text-xs uppercase tracking-[0.25em] text-shadow/45">
                    {c.signature}
                  </p>
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