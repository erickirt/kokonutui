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
      const response = NextResponse.rewrite(new URL(result, request.nextUrl));

      // Set on the response, not via `rewrite`'s `headers` option — that one
      // forwards headers to the *request*, so the `Vary` never reached the
      // client and a CDN could serve cached HTML to a Markdown request.
      response.headers.append("Vary", "Accept");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/docs/:path*",
};
