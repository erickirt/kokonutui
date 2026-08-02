import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const pages = source.getPages();

  // Fall back to the most recent page edit rather than the build time, so
  // the homepage's <lastmod> only moves when content actually changes.
  const latest = pages.reduce<Date | undefined>((newest, page) => {
    const modified = page.data.lastModified;

    if (!modified) {
      return newest;
    }

    return !newest || modified > newest ? modified : newest;
  }, undefined);

  const home: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // `/docs` comes out of the loop below via the index page. Hardcoding it
  // here as well produced a duplicate, and `generateParams()` returns an
  // empty slug for it, which built a trailing-slash `/docs/` variant.
  const docsUrls: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.data.lastModified,
    changeFrequency: "monthly",
    priority: page.url === "/docs" ? 0.9 : 0.7,
  }));

  return [...home, ...docsUrls];
}
