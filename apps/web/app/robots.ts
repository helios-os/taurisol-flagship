import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/sitemap.xml", "/robots.txt", "/llms.txt", "/llms-full.txt"],
    },
    sitemap: "https://www.taurisol.com/sitemap.xml",
  };
}
