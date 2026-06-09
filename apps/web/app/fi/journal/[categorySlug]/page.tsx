import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { ArticleList } from "@/components/journal/ArticleList";
import { Reveal } from "@/components/ui/Reveal";
import {
  getCategoryPageData,
  TAURISOL_CATEGORIES,
  getCategorySlug,
} from "@/lib/journal";

export const revalidate = 3600;

export async function generateStaticParams() {
  return TAURISOL_CATEGORIES.map((cat) => ({
    categorySlug: getCategorySlug(cat, "fi"),
  }));
}

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const data = await getCategoryPageData(categorySlug, "fi");
  if (!data) return { title: "Ei löydy — Taurisol Journal" };
  const { category } = data;
  return {
    title: `${category.title.fi} — Taurisol Journal`,
    description: category.tagline.fi,
    alternates: {
      canonical: `https://taurisol.com/fi/journal/${category.fiSlug}`,
      languages: {
        en: `https://taurisol.com/journal/${category.slug}`,
      },
    },
  };
}

export default async function FiCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const data = await getCategoryPageData(categorySlug, "fi");
  if (!data) notFound();

  const { category, pillarIntro, articles } = data;

  return (
    <LangProvider initialLang="fi">
      <div className="min-h-screen scroll-smooth bg-background text-foreground">
        <Nav />
        <main>
          {/* Hero */}
          <section className="bg-shadow pb-20 pt-40 md:pb-28 md:pt-52 text-sand-light">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <a
                href="/fi/journal"
                className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-sand-light/50 transition-colors hover:text-sun animate-fade-up"
                style={{ animationDelay: "0ms" }}
              >
                ← Taurisol Journal
              </a>
              <p
                className="mb-5 text-xs uppercase tracking-[0.35em] text-sun animate-fade-up"
                style={{ animationDelay: "60ms" }}
              >
                — Journal
              </p>
              <h1
                className="font-serif text-5xl leading-[1.05] text-balance animate-fade-up md:text-7xl"
                style={{ animationDelay: "120ms" }}
              >
                {category.title.fi}
              </h1>
              <p
                className="mt-8 max-w-2xl text-base font-light leading-relaxed text-sand-light/70 animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                {category.tagline.fi}
              </p>
            </div>
          </section>

          {/* Pillar intro from WP (if available) */}
          {pillarIntro && (
            <section className="bg-shadow border-t border-sand-light/10 pb-20 md:pb-28">
              <div className="mx-auto max-w-4xl px-6 md:px-12">
                <Reveal>
                  <p className="whitespace-pre-line text-base font-light leading-relaxed text-sand-light/80 md:text-lg">
                    {pillarIntro}
                  </p>
                </Reveal>
              </div>
            </section>
          )}

          {/* Articles */}
          <section className="bg-sand py-28 md:py-40">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <Reveal>
                <h2 className="font-serif text-3xl text-shadow md:text-4xl">
                  Artikkelit
                </h2>
              </Reveal>
              <ArticleList
                articles={articles}
                lang="fi"
                basePath={`/fi/journal/${category.fiSlug}`}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
