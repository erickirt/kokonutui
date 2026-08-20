import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

// Exports the prebuilt Orama index once (staticGET) instead of running a
// search per keystroke — the client downloads it and searches in-browser.
// staticGET never reads the request, so the route is prerendered at build.
export const { staticGET: GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: "english",
  buildIndex(page) {
    const { title, description, keywords, structuredData } = page.data;

    return {
      id: page.url,
      title,
      description,
      url: page.url,
      structuredData: {
        // Docs pages open with an empty `#` placeholder heading — keep it
        // out of the index so it can't surface as a blank result.
        headings: structuredData.headings.filter((heading) =>
          heading.content.trim()
        ),
        // Component pages have almost no prose, so frontmatter keywords
        // ("glow", "cta", …) are indexed as an extra content record.
        contents: keywords?.length
          ? [
              ...structuredData.contents,
              { heading: undefined, content: keywords.join(", ") },
            ]
          : structuredData.contents,
      },
    };
  },
});
