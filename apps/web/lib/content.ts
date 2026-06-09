/**
 * Safe content resolver for taurisol-flagship.
 *
 * Strategy (Phase 1 — API readiness):
 *   1. Load static fallback content synchronously (always succeeds).
 *   2. If WORDPRESS_API_URL is set AND CMS is reachable, attempt a live fetch.
 *   3. Merge CMS data over fallback fields that have been mapped (Phase 2+).
 *   4. On any CMS failure: silently return fallback. Build never blocks.
 *
 * Phase 1 status: CMS layer wired; content merge deferred to Phase 2.
 * The static fallback is what the site renders today.
 */

import { fallbackContent, type FallbackContent } from "./fallback-content";
import { isWordPressReachable } from "./wordpress";

export type { FallbackContent };

export interface CMSStatus {
  source: "fallback" | "wordpress";
  reachable: boolean;
  merged: boolean;
}

export interface ResolvedContent {
  content: FallbackContent;
  cms: CMSStatus;
}

/**
 * Resolve page content for the build.
 * Safe to call from any Next.js server component or generateStaticParams.
 * Never throws. Always returns at minimum the static fallback.
 */
export async function getPageContent(): Promise<ResolvedContent> {
  const wpConfigured = Boolean(process.env.WORDPRESS_API_URL);

  if (!wpConfigured) {
    return {
      content: fallbackContent,
      cms: { source: "fallback", reachable: false, merged: false },
    };
  }

  const reachable = await isWordPressReachable();

  if (!reachable) {
    return {
      content: fallbackContent,
      cms: { source: "fallback", reachable: false, merged: false },
    };
  }

  // Phase 2: fetch WP page data and deep-merge into fallbackContent here.
  // For Phase 1 we confirm reachability only and return fallback content.
  return {
    content: fallbackContent,
    cms: { source: "wordpress", reachable: true, merged: false },
  };
}

/**
 * Synchronous variant for components that cannot use async/await.
 * Always returns static fallback — safe to use anywhere.
 */
export function getStaticContent(): FallbackContent {
  return fallbackContent;
}
