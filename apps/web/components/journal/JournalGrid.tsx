"use client";

import { Reveal } from "@/components/ui/Reveal";
import type { JournalPillar } from "@/lib/journal";

export function JournalGrid({ pillars }: { pillars: JournalPillar[] }) {
  if (pillars.length === 0) {
    return (
      <section className="bg-sand py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <p className="text-sm font-light text-shadow/50">No articles available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sand py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-px bg-stone-warm/40 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.id}
              delay={i * 80}
              className="group bg-sand transition-colors hover:bg-sand-light"
            >
              <div className="h-full p-10 md:p-12">
                <span className="font-serif text-sm italic text-olive">
                  — 0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-2xl leading-snug text-shadow md:text-3xl">
                  {pillar.title}
                </h3>
                <span className="mt-6 block h-px w-10 bg-olive/40 transition-all duration-500 group-hover:w-16 group-hover:bg-sun" />
                <p className="mt-6 line-clamp-5 text-sm font-light leading-relaxed text-shadow/70 md:text-base">
                  {pillar.intro.split("\n")[0]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
