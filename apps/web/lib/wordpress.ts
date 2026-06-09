/**
 * Headless WordPress REST API client for taurisol-flagship.
 * All fetches are safe: any network or parse error returns null.
 * Never throws. Never blocks the build.
 *
 * Endpoint discovery (Phase 1, verified 2026-06-09):
 *   GET /wp-json/wp/v2/posts   → standard WP posts
 *   GET /wp-json/wp/v2/pages   → taurisol pages (home-page-en, home-page-fi)
 *   GET /wp-json/wp/v2/pillar  → custom post type with ACF pillar_data group
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const WP_BASE_URL =
  process.env.WORDPRESS_API_URL?.replace(/\/$/, "") ?? "https://cms.taurisol.com";

const WP_API = `${WP_BASE_URL}/wp-json/wp/v2`;

// 5-second timeout; build never hangs if CMS is slow/down
const FETCH_TIMEOUT_MS = 5000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WPRendered {
  rendered: string;
}

export interface WPPost {
  id: number;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  acf?: Record<string, unknown>;
}

export interface WPPage {
  id: number;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRendered;
  content: WPRendered;
  featured_media: number;
  acf?: Record<string, unknown>;
}

// ACF field group on the pillar custom post type
export interface WPPillarData {
  content_lang: "en" | "fi";
  translation_pillar: number;
  pillar_intro: string;
  pillar_expert_view: string;
  seo_content: unknown;
}

export interface WPPillar {
  id: number;
  slug: string;
  status: string;
  type: "pillar";
  link: string;
  title: WPRendered;
  acf?: {
    pillar_data?: WPPillarData;
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

async function wpFetch<T>(path: string): Promise<T | null> {
  const url = `${WP_API}${path}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(timer);

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Fetch all published posts. Returns empty array on failure. */
export async function fetchPosts(perPage = 10): Promise<WPPost[]> {
  const data = await wpFetch<WPPost[]>(`/posts?per_page=${perPage}&status=publish`);
  return data ?? [];
}

/** Fetch all published pages. Returns empty array on failure. */
export async function fetchPages(perPage = 20): Promise<WPPage[]> {
  const data = await wpFetch<WPPage[]>(`/pages?per_page=${perPage}&status=publish`);
  return data ?? [];
}

/** Fetch a single page by slug. Returns null on failure or not found. */
export async function fetchPageBySlug(slug: string): Promise<WPPage | null> {
  const data = await wpFetch<WPPage[]>(`/pages?slug=${slug}&status=publish`);
  return data?.[0] ?? null;
}

/**
 * Fetch all published pillars (custom post type).
 * Endpoint: /wp-json/wp/v2/pillar
 * Returns empty array on failure.
 */
export async function fetchPillars(perPage = 50): Promise<WPPillar[]> {
  const data = await wpFetch<WPPillar[]>(`/pillar?per_page=${perPage}&status=publish`);
  return data ?? [];
}

/**
 * Fetch pillars filtered by language via ACF content_lang field.
 * Relies on ACF pillar_data.content_lang being "en" or "fi".
 */
export async function fetchPillarsByLang(lang: "en" | "fi"): Promise<WPPillar[]> {
  const all = await fetchPillars();
  return all.filter((p) => p.acf?.pillar_data?.content_lang === lang);
}

/**
 * Health check: returns true if the WP REST API responds within timeout.
 * Used by content.ts to decide whether to attempt a live fetch.
 */
export async function isWordPressReachable(): Promise<boolean> {
  const url = `${WP_BASE_URL}/wp-json/`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}
