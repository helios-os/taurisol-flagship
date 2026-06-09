import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { ArticleList } from "@/components/journal/ArticleList";
import {
  getCategoryPageData,
  TAURISOL_CATEGORIES,
  getCategorySlug,
} from "@/lib/journal";

export const revalidate = 3600;

export async function generateStaticParams() {
  return TAURISOL_CATEGORIES.map((cat) => ({
    categorySlug: getCategorySlug(cat, "en"),
  }));
}

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const data = await getCategoryPageData(categorySlug, "en");
  if (!data) return { title: "Not Found — Taurisol Journal" };
  const { category } = data;
  return {
    title: `${category.title.en} — Taurisol Journal`,
    description: category.tagline.en,
    alternates: {
      canonical: `https://taurisol.com/journal/${category.slug}`,
      languages: {
        fi: `https://taurisol.com/fi/journal/${category.fiSlug}`,
      },
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  const data = await getCategoryPageData(categorySlug, "en");
  if (!data) notFound();

  const { category, pillarIntro, articles } = data;

  return (
    <LangProvider initialLang="en">
      <div className="min-h-screen scroll-smooth bg-background text-foreground">
        <Nav />
        <main>
          {/*
           * Compact category header — not a hero, just orientation.
           * Articles are the main focus; header should clear the nav
           * and introduce the theme without consuming the viewport.
           */}
          <section className="bg-shadow pt-24 pb-10 md:pt-28 md:pb-12 text-sand-light">
            <div className="mx-auto max-w-4xl px-6 md:px-12">
              <a
                href="/journal"
                className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-sand-light/50 transition-colors hover:text-sun"
              >
                ← Taurisol Journal
              </a>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-sun">
                — Journal
              </p>
              <h1 className="font-serif text-3xl leading-tight text-balance md:text-5xl">
                {category.title.en}
              </h1>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-sand-light/65 md:text-base">
                {category.tagline.en}
              </p>
              {pillarIntro && (
                <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-sand-light/50 md:text-base">
                  {pillarIntro}
                </p>
              )}
            </div>
          </section>

          {/* Articles — primary content */}
          <section className="bg-sand py-10 md:py-14">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <h2 className="font-serif text-xl text-shadow/60 md:text-2xl">
                Articles
              </h2>
              <ArticleList
                articles={articles}
                lang="en"
                basePath={`/journal/${category.slug}`}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
