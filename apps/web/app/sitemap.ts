import type { MetadataRoute } from "next";
import { TAURISOL_CATEGORIES } from "@/lib/journal";

const BASE_URL = "https://www.taurisol.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/pricing",
    "/fi/pricing",
    "/living-lab",
    "/fi/living-lab",
    "/journal",
    "/fi/journal",
  ];

  const journalCategoryRoutes = TAURISOL_CATEGORIES.flatMap((category) => [
    `/journal/${category.slug}`,
    `/fi/journal/${category.fiSlug}`,
  ]);

  return [...staticRoutes, ...journalCategoryRoutes].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
