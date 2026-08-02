import type { LLMsOptions } from "fumadocs-core/mdx-plugins/remark-llms";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

/**
 * Docs pages are almost entirely JSX — the install command, source code and
 * usage live inside the `Preview` components rather than in Markdown prose.
 * Keeping them as placeholders lets `lib/get-llm-text.ts` swap in the real
 * component source at render time, so the `.md` endpoints carry actual
 * content instead of an empty shell.
 */
const llmsOptions: LLMsOptions = {
  mdxAsPlaceholder: ["Preview", "PreviewClient", "PreviewTemplate"],
};

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: llmsOptions,
    },
  },
});

export default defineConfig();
