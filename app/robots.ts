import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/barn", "/forelder", "/logg-inn", "/lag-konto", "/api"],
    },
    sitemap: "https://playathome.no/sitemap.xml",
  };
}
