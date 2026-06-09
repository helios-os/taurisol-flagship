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
// WP filtering — blog_post ACF group (cloned from Markku CMS structure)
// ---------------------------------------------------------------------------

/**
 * Actual ACF field path (verified 2026-06-09 against cms.taurisol.com):
 *   acf.blog_post.header.content_lang  — "en" or "fi"
 *   acf.blog_post.header.parent_pillar — pillar post ID (integer)
 *   acf.blog_post.header.post_ingress  — short subtitle text
 *   acf.blog_post.header.post_intro    — longer intro body text
 *   acf.blog_post.sections.section_1…section_15 — { title, description, image }
 *
 * The CMS was cloned from wp.markkutauriainen.com; both Taurisol Journal posts
 * and Markku's blog posts share the same ACF group. Taurisol posts are
 * identified by content_lang + parent_pillar matching a Taurisol pillar ID.
 */
function isTaurisolJournalPost(post: WPPost, lang: Lang): boolean {
  const acf = post.acf as Record<string, unknown> | undefined;
  if (!acf) return false;
  const blogPost = acf.blog_post as Record<string, unknown> | undefined;
  if (!blogPost) return false;
  const header = blogPost.header as Record<string, unknown> | undefined;
  return header?.content_lang === lang;
}

/** Returns the parent_pillar post ID from the blog_post ACF group, or null. */
function getParentPillarId(post: WPPost): number | null {
  const acf = post.acf as Record<string, unknown> | undefined;
  const blogPost = acf?.blog_post as Record<string, unknown> | undefined;
  const header = blogPost?.header as Record<string, unknown> | undefined;
  const id = header?.parent_pillar;
  return typeof id === "number" ? id : null;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, "\u201C")
    .replace(/&#8221;/g, "\u201D")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/**
 * Builds article body HTML from ACF sections (section_1…section_15).
 * Sections with empty title and description are skipped.
 */
function buildSectionsHtml(sections: Record<string, unknown>): string {
  const parts: string[] = [];
  for (let i = 1; i <= 15; i++) {
    const s = sections[`section_${i}`] as Record<string, unknown> | undefined;
    if (!s) continue;
    const title = ((s.title as string | undefined) ?? "").trim();
    const desc = ((s.description as string | undefined) ?? "").trim();
    if (title) parts.push(`<h2>${title}</h2>`);
    if (desc) {
      desc
        .split(/\r?\n\r?\n/)
        .map((p) => `<p>${p.replace(/\r?\n/g, " ").trim()}</p>`)
        .filter((p) => p !== "<p></p>")
        .forEach((p) => parts.push(p));
    }
  }
  return parts.join("\n");
}

function mapWPPost(
  post: WPPost,
  lang: Lang,
  categorySlug: string
): JournalArticle {
  const acf = post.acf as Record<string, unknown> | undefined;
  const blogPost = (acf?.blog_post as Record<string, unknown>) ?? {};
  const header = (blogPost.header as Record<string, unknown>) ?? {};
  const sections = (blogPost.sections as Record<string, unknown>) ?? {};

  const ingress = ((header.post_ingress as string | undefined) ?? "").trim();

  // Build content: intro paragraph(s) first, then named sections
  const introParts: string[] = [];
  const intro = ((header.post_intro as string | undefined) ?? "").trim();
  if (intro) {
    intro
      .split(/\r?\n\r?\n/)
      .map((p) => `<p>${p.replace(/\r?\n/g, " ").trim()}</p>`)
      .filter((p) => p !== "<p></p>")
      .forEach((p) => introParts.push(p));
  }
  const sectionsHtml = buildSectionsHtml(sections);
  const content = [...introParts, sectionsHtml].filter(Boolean).join("\n");

  return {
    id: post.id,
    slug: post.slug,
    lang,
    categorySlug,
    title: decodeEntities(post.title.rendered),
    ingress,
    content,
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
    // Match pillar by slug (EN slug, FI slug, or title as fallback for edge
    // cases like "design-en" WP slug vs "design" category slug)
    const pillars = await fetchPillarsByLang(lang);
    const match = pillars.find(
      (p: WPPillar) =>
        p.slug === category.slug ||
        p.slug === category.fiSlug ||
        decodeEntities(p.title.rendered).toLowerCase() ===
          category.title[lang].toLowerCase()
    );
    if (match?.acf?.pillar_data) {
      pillarIntro = match.acf.pillar_data.pillar_intro ?? "";
      pillarExpertView = match.acf.pillar_data.pillar_expert_view ?? "";
      source = "wordpress";
    }

    // Fetch posts, filter by language AND parent pillar ID so each article
    // appears only in its correct category
    const allPosts = await fetchPosts(100);
    const filtered = allPosts.filter((p) => {
      if (!isTaurisolJournalPost(p, lang)) return false;
      if (match) return getParentPillarId(p) === match.id;
      return true; // No pillar found — include all lang-matching posts
    });
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
