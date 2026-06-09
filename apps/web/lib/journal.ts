/**
 * Taurisol Journal data layer — 3-level architecture.
 *
 * Level 1  /journal              → getAllCategories()
 * Level 2  /journal/[cat]        → getCategoryPageData(slug, lang)
 * Level 3  /journal/[cat]/[art]  → getArticleData(catSlug, artSlug, lang)
 *
 * Content rules:
 * - All 7 category definitions are Taurisol-specific (no Markku/Sales Mind content).
 * - WP pillar CPT is the live source for category intro/expertView.
 * - WP posts are the live source for articles. Only posts with a valid
 *   `acf.journal_post.content_lang` field are accepted (prevents Markku posts
 *   from appearing under Taurisol Journal).
 * - Every function is safe: no throw, no runtime errors on CMS failure.
 */

import type { Lang } from "./i18n";
import {
  fetchPillarsByLang,
  fetchPosts,
  fetchPostBySlug,
  type WPPillar,
  type WPPost,
} from "./wordpress";

// ---------------------------------------------------------------------------
// 7 Taurisol categories (static, authoritative)
// ---------------------------------------------------------------------------

export interface TaurisolCategory {
  slug: string;       // EN URL slug
  fiSlug: string;     // FI URL slug
  title: { en: string; fi: string };
  tagline: { en: string; fi: string };
}

export const TAURISOL_CATEGORIES: TaurisolCategory[] = [
  {
    slug: "philosophy",
    fiSlug: "filosofia",
    title: { en: "Philosophy", fi: "Filosofia" },
    tagline: {
      en: "The thinking behind Taurisol. Why a place matters. What freedom through design can mean.",
      fi: "Taurisoliin sisällytetty ajattelu. Miksi paikalla on väliä. Mitä vapaus suunnittelun kautta voi tarkoittaa.",
    },
  },
  {
    slug: "place",
    fiSlug: "paikka",
    title: { en: "Place", fi: "Paikka" },
    tagline: {
      en: "Montefrío, Andalusia. The landscape, the light, the reason.",
      fi: "Montefrío, Andalusia. Maisema, valo, syy.",
    },
  },
  {
    slug: "design",
    fiSlug: "design",
    title: { en: "Design", fi: "Design" },
    tagline: {
      en: "How homes are built, why factory construction matters, what quality means at altitude.",
      fi: "Miten kodit rakennetaan, miksi tehdasrakentaminen on tärkeää, mitä laatu tarkoittaa.",
    },
  },
  {
    slug: "energy",
    fiSlug: "energia",
    title: { en: "Energy", fi: "Energia" },
    tagline: {
      en: "Off-grid energy systems. Solar, battery, independence. What sustainability looks like in practice.",
      fi: "Verkosta riippumattomat energiajärjestelmät. Aurinko, akku, riippumattomuus.",
    },
  },
  {
    slug: "rituals",
    fiSlug: "rituaalit",
    title: { en: "Rituals", fi: "Rituaalit" },
    tagline: {
      en: "Morning air. Slow coffee. The habits that a good place makes possible.",
      fi: "Aamuinen ilma. Hidas kahvi. Tavat, jotka hyvä paikka tekee mahdollisiksi.",
    },
  },
  {
    slug: "founder-notes",
    fiSlug: "perustajan-muistiot",
    title: { en: "Founder Notes", fi: "Perustajan muistiot" },
    tagline: {
      en: "Personal reflections from the founder. What led here. What comes next.",
      fi: "Perustajan henkilökohtaisia pohdintoja. Mikä toi tänne. Mitä tulee seuraavaksi.",
    },
  },
  {
    slug: "development",
    fiSlug: "kehitys",
    title: { en: "Development", fi: "Kehitys" },
    tagline: {
      en: "Progress updates from the project. What has been built, what is being built.",
      fi: "Edistymispäivitykset projektista. Mitä on rakennettu, mitä rakennetaan.",
    },
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getCategoryByEnSlug(slug: string): TaurisolCategory | undefined {
  return TAURISOL_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByFiSlug(slug: string): TaurisolCategory | undefined {
  return TAURISOL_CATEGORIES.find((c) => c.fiSlug === slug);
}

export function getCategoryBySlug(
  slug: string,
  lang: Lang
): TaurisolCategory | undefined {
  return lang === "en" ? getCategoryByEnSlug(slug) : getCategoryByFiSlug(slug);
}

/** Returns the URL slug for the given category and language. */
export function getCategorySlug(cat: TaurisolCategory, lang: Lang): string {
  return lang === "en" ? cat.slug : cat.fiSlug;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface JournalArticle {
  id: number | string;
  slug: string;
  lang: Lang;
  categorySlug: string; // always EN slug for internal references
  title: string;
  ingress: string;
  content: string;      // HTML — may be empty while WP content is pending
  source: "wordpress" | "fallback";
}

export interface CategoryPageData {
  category: TaurisolCategory;
  pillarIntro: string;      // From WP if available, empty otherwise
  pillarExpertView: string; // From WP if available, empty otherwise
  articles: JournalArticle[];
  source: "wordpress" | "fallback";
}

// ---------------------------------------------------------------------------
// WP filtering — strict Taurisol-only gate
// ---------------------------------------------------------------------------

/**
 * A WP post is accepted as a Taurisol Journal article only when it carries
 * the `acf.journal_post.content_lang` field. This deliberately excludes
 * Markku's blog posts (which use `acf.blog_post.header.content_lang`) and
 * any other non-journal WP content on the CMS.
 */
function isTaurisolJournalPost(post: WPPost, lang: Lang): boolean {
  const acf = post.acf as Record<string, unknown> | undefined;
  if (!acf) return false;
  const journalPost = acf.journal_post as Record<string, unknown> | undefined;
  return journalPost?.content_lang === lang;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function mapWPPost(
  post: WPPost,
  lang: Lang,
  categorySlug: string
): JournalArticle {
  const acf = post.acf as Record<string, unknown> | undefined;
  const jp = (acf?.journal_post as Record<string, unknown>) ?? {};
  const ingress =
    (jp.post_ingress as string | undefined) ??
    (post.excerpt?.rendered ?? "").replace(/<[^>]+>/g, "").trim();
  return {
    id: post.id,
    slug: post.slug,
    lang,
    categorySlug,
    title: decodeEntities(post.title.rendered),
    ingress,
    content: post.content?.rendered ?? "",
    source: "wordpress",
  };
}

// ---------------------------------------------------------------------------
// Level 1 — Journal Index
// ---------------------------------------------------------------------------

/** Returns all 7 Taurisol categories. Pure static, no network calls. */
export function getAllCategories(): TaurisolCategory[] {
  return TAURISOL_CATEGORIES;
}

// ---------------------------------------------------------------------------
// Level 2 — Category page
// ---------------------------------------------------------------------------

export async function getCategoryPageData(
  slug: string,
  lang: Lang
): Promise<CategoryPageData | null> {
  const category = getCategoryBySlug(slug, lang);
  if (!category) return null;

  let pillarIntro = "";
  let pillarExpertView = "";
  let articles: JournalArticle[] = [];
  let source: "wordpress" | "fallback" = "fallback";

  try {
    // Try to match a WP pillar by either language slug
    const pillars = await fetchPillarsByLang(lang);
    const match = pillars.find(
      (p: WPPillar) => p.slug === category.slug || p.slug === category.fiSlug
    );
    if (match?.acf?.pillar_data) {
      pillarIntro = match.acf.pillar_data.pillar_intro ?? "";
      pillarExpertView = match.acf.pillar_data.pillar_expert_view ?? "";
      source = "wordpress";
    }

    // Try to load articles — strict filter to Taurisol journal posts only
    const allPosts = await fetchPosts(100);
    const filtered = allPosts.filter((p) => isTaurisolJournalPost(p, lang));
    if (filtered.length > 0) {
      articles = filtered.map((p) => mapWPPost(p, lang, category.slug));
      source = "wordpress";
    }
  } catch {
    // Silently fall through — page renders with empty articles
  }

  return { category, pillarIntro, pillarExpertView, articles, source };
}

// ---------------------------------------------------------------------------
// Level 3 — Article detail
// ---------------------------------------------------------------------------

export async function getArticleData(
  categorySlug: string,
  articleSlug: string,
  lang: Lang
): Promise<JournalArticle | null> {
  const category = getCategoryBySlug(categorySlug, lang);
  if (!category) return null;

  try {
    const post = await fetchPostBySlug(articleSlug);
    if (!post) return null;
    if (!isTaurisolJournalPost(post, lang)) return null;
    return mapWPPost(post, lang, category.slug);
  } catch {
    return null;
  }
}
