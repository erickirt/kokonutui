import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { type NextRequest, NextResponse } from "next/server";

const { rewrite: rewriteLLM } = rewritePath(
  "/docs{/*path}",
  "/llms.mdx/docs{/*path}"
);

/**
 * Content negotiation for AI agents: a client that asks for `text/markdown`
 * on a normal docs URL gets the clean Markdown version, without needing to
 * know about the `.md` suffix convention.
 */
export default function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        headers: { Vary: "Accept" },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/docs/:path*",
};
