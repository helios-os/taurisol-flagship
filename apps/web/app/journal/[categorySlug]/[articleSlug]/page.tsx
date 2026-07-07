import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LangProvider } from "@/components/lang-context";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { getArticleData, getCategoryByEnSlug } from "@/lib/journal";

export const revalidate = 3600;

interface Props {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug, articleSlug } = await params;
  const article = await getArticleData(categorySlug, articleSlug, "en");
  if (!article) return { title: "Not Found — Taurisol Journal" };
  return {
    title: `${article.title} — Taurisol Journal`,
    description: article.ingress,
    alternates: {
      canonical: `https://taurisol.com/journal/${categorySlug}/${articleSlug}`,
    },
    openGraph: {
      title: article.title,
      description: article.ingress,
      type: "article",
      siteName: "Taurisol",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { categorySlug, articleSlug } = await params;
  const article = await getArticleData(categorySlug, articleSlug, "en");
  if (!article) notFound();

  const category = getCategoryByEnSlug(article.categorySlug);

  return (
    <LangProvider initialLang="en">
      <div className="min-h-screen scroll-smooth bg-background text-foreground">
        <Nav variant="light" />
        <main>
          {/* Article hero */}
          <section className="bg-shadow pb-20 pt-40 md:pb-28 md:pt-52 text-sand-light">
            <div className="mx-auto max-w-4xl px-6 md:px-12">
              <a
                href={`/journal/${categorySlug}`}
                className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-sand-light/50 transition-colors hover:text-sun animate-fade-up"
                style={{ animationDelay: "0ms" }}
              >
                ← {category?.title.en ?? "Journal"}
              </a>
              <p
                className="mb-5 text-xs uppercase tracking-[0.35em] text-sun animate-fade-up"
                style={{ animationDelay: "60ms" }}
              >
                — {category?.title.en ?? "Taurisol Journal"}
              </p>
              <h1
                className="font-serif text-4xl leading-[1.05] text-balance animate-fade-up md:text-6xl"
                style={{ animationDelay: "120ms" }}
              >
                {article.title}
              </h1>
              {article.ingress && (
                <p
                  className="mt-8 max-w-2xl text-base font-light leading-relaxed text-sand-light/75 animate-fade-up"
                  style={{ animationDelay: "200ms" }}
                >
                  {article.ingress}
                </p>
              )}
            </div>
          </section>

          {/* Article body */}
          {article.content ? (
            <section className="bg-sand py-20 md:py-32">
              <div className="mx-auto max-w-3xl px-6 md:px-12">
                <Reveal>
                  <div
                    className="prose prose-lg max-w-none font-light leading-relaxed text-shadow/85"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </Reveal>
              </div>
            </section>
          ) : (
            <section className="bg-sand py-20 md:py-32">
              <div className="mx-auto max-w-3xl px-6 md:px-12">
                <Reveal>
                  <p className="font-serif text-xl italic text-shadow/50">
                    Full article content is being prepared.
                  </p>
                </Reveal>
              </div>
            </section>
          )}

          {/* Back navigation */}
          <section className="bg-sand border-t border-stone-warm/40 py-16">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <a
                href={`/journal/${categorySlug}`}
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-shadow/60 transition-colors hover:text-sun"
              >
                <span className="transition-transform group-hover:-translate-x-1">←</span>
                Back to {category?.title.en ?? "Journal"}
              </a>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
