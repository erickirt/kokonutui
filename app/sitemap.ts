import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const baseUrl = siteConfig.url;

  // Base URLs
  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];

  // Dynamic docs URLs from source
  const docsUrls: MetadataRoute.Sitemap = source
    .generateParams()
    .map(({ slug }) => ({
      url: `${baseUrl}/docs/${slug?.join("/") || ""}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

  return [...baseUrls, ...docsUrls];
}
