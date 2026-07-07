"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { useLang } from "@/components/lang-context";
import { content, t } from "@/lib/i18n";

export function IntraShell({
  eyebrow,
  title,
  intro,
  children,
  showBack = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  showBack?: boolean;
}) {
  const { lang } = useLang();
  const back = t(content.intra.shell.back, lang);
  const badge = t(content.intra.shell.badge, lang);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav variant="light" />
      <div className="border-b border-border/60 bg-secondary/40 pt-24 md:pt-32">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-sun-deep)" }}
              aria-hidden="true"
            />
            {badge}
          </span>
          {showBack && (
            <Link
              href="/intra"
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              ← {back}
            </Link>
          )}
        </div>
      </div>

      <main>
        <header className="border-b border-border/40">
          <div className="container-page py-16 md:py-24 lg:py-28">
            <div className="max-w-3xl">
              {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-balance">
                {title}
              </h1>
              {intro && (
                <p className="mt-8 text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                  {intro}
                </p>
              )}
            </div>
          </div>
        </header>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function IntraBlock({
  heading,
  items,
  tone = "default",
}: {
  heading: string;
  items: string[];
  tone?: "default" | "muted";
}) {
  return (
    <div>
      <h3 className="font-serif text-xl md:text-2xl text-foreground">{heading}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <span
              className="mt-2.5 h-1 w-1 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  tone === "muted"
                    ? "var(--color-muted-foreground)"
                    : "var(--color-sun-deep)",
              }}
              aria-hidden="true"
            />
            <span
              className={
                tone === "muted"
                  ? "text-sm md:text-base text-muted-foreground leading-relaxed"
                  : "text-sm md:text-base text-foreground leading-relaxed"
              }
            >
              {it}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IntraSection({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "sand";
}) {
  const bg = tone === "sand" ? "bg-secondary" : "bg-background";
  return (
    <section className={`${bg} py-16 md:py-24`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function IntraNext({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <div className="border-t border-border/60 pt-8">
      <p className="eyebrow mb-4">{label}</p>
      <p className="text-base md:text-lg leading-relaxed text-foreground max-w-2xl">
        {body}
      </p>
    </div>
  );
}
