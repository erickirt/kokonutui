import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import TocProBanner from "@/components/landing/toc-pro-banner";
import { Preview } from "@/components/mdx/preview";
import { PreviewClient } from "@/components/mdx/preview-client";
import PreviewTemplate from "@/components/mdx/preview-template";
import WhatIncluded from "@/components/mdx/what-included";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    return notFound();
  }

  const MDX = page.data.body;

  const breadcrumbData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Docs",
        item: `${siteConfig.url}/docs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.data.title,
        item: `${siteConfig.url}${page.url}`,
      },
    ],
  });

  const hasToc = page.data.toc.length > 0;

  const tableOfContent = page.data.full
    ? undefined
    : { footer: <TocProBanner />, component: hasToc ? undefined : <></> };

  return (
    <DocsPage
      breadcrumb={{ className: "ml-8" }}
      footer={{ enabled: false }}
      full={page.data.full}
      tableOfContent={tableOfContent}
      toc={page.data.toc}
    >
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static schema.org JSON-LD built from page data
        dangerouslySetInnerHTML={{ __html: breadcrumbData }}
        type="application/ld+json"
      />
      <DocsTitle className="ml-8 font-semibold text-4xl tracking-tighter">
        {page.data.title}
      </DocsTitle>
      <DocsDescription className="ml-8 text-xl tracking-tighter">
        {page.data.description}
      </DocsDescription>
      <DocsBody className="ml-8">
        <MDX
          components={{
            ...defaultMdxComponents,
            a: createRelativeLink(source, page),
            Preview,
            PreviewClient,
            PreviewTemplate,
            WhatIncluded,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return await source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    return notFound();
  }

  const ogImage = {
    url: ["/docs-og", ...(params.slug ?? []), "image.png"].join("/"),
    width: 1200,
    height: 630,
    alt: page.data.title,
  };

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      siteName: siteConfig.name,
      type: "article",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: page.data.title,
      description: page.data.description,
      images: [ogImage],
    },
  };
}
