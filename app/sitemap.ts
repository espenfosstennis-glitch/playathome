import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://playathome.no/", changeFrequency: "weekly", priority: 1 },
    { url: "https://playathome.no/ovelser", changeFrequency: "weekly", priority: 0.8 },
  ];
}
