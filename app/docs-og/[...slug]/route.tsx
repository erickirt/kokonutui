import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export function generateStaticParams() {
  return source.generateParams().map(({ slug }) => ({
    slug: [...(slug ?? []), "image.png"],
  }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) {
    notFound();
  }

  const title = page.data.title;
  const description = page.data.description ?? siteConfig.description;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: "#09090b",
        backgroundImage:
          "radial-gradient(circle at 25% 25%, rgba(68, 220, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(68, 220, 234, 0.08) 0%, transparent 50%)",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 9999,
            backgroundColor: "#44DCEA",
          }}
        />
        <div style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a1a1aa",
            lineHeight: 1.4,
            maxWidth: 960,
          }}
        >
          {description}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 28, color: "#71717a" }}>
        kokonutui.com — 100+ free open source UI components
      </div>
    </div>,
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
    }
  );
}
