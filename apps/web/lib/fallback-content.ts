/**
 * Static fallback content for taurisol-flagship.
 *
 * This module re-exports the complete static content object from i18n.ts and
 * types it as the canonical FallbackContent shape used by content.ts.
 *
 * Rules:
 * - This file MUST compile and export valid data with zero network calls.
 * - content.ts imports from here first, then optionally overrides with CMS data.
 * - Never import from wordpress.ts in this file.
 */

import { content as i18nContent, type Lang } from "./i18n";

export type { Lang };

// Re-export the full static content tree as the authoritative fallback.
// Phase 2 will define a typed CMS content shape that maps over these keys.
export const fallbackContent = i18nContent;

export type FallbackContent = typeof fallbackContent;
