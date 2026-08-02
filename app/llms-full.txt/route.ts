import { siteConfig } from "@/config/site";
import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";

export async function GET() {
  const pages = source.getPages();
  const rendered = await Promise.all(pages.map((page) => getLLMText(page)));

  const header = [
    `# ${siteConfig.name} - Full Documentation`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Every documentation page, concatenated. Index: ${siteConfig.url}/llms.txt`,
    "",
    "---",
    "",
  ].join("\n");

  return new Response(header + rendered.join("\n\n---\n\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
