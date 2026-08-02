import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      // Exposes clean Markdown via `getText("processed")`, powering the
      // .md endpoints, llms.txt and the copy-as-markdown page actions.
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig();
