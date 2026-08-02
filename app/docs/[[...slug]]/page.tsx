import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/glass/page";
import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";
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

  const pageUrl = `${siteConfig.url}${page.url}`;
  const lastModified = page.data.lastModified;

  const breadcrumbData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
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
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "TechArticle",
        "@id": `${pageUrl}#article`,
        headline: page.data.title,
        description: page.data.description,
        url: pageUrl,
        dateModified: lastModified?.toISOString(),
        inLanguage: "en-US",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        author: {
          "@type": "Person",
          name: "Dorian Baffier",
          url: siteConfig.links.twitter,
        },
      },
    ],
  });

  // Powers "copy as Markdown" and the open-in-ChatGPT/Claude shortcuts.
  const markdownUrl = `${page.url}.md`;
  const githubUrl = `${siteConfig.links.github}/blob/main/content/docs/${page.path}`;

  // The Glass layout owns page spacing, so the previous `ml-8` offsets that
  // aligned content against the notebook sidebar are gone.
  const tableOfContent = page.data.full
    ? undefined
    : { footer: <TocProBanner /> };

  return (
    <DocsPage
      full={page.data.full}
      tableOfContent={tableOfContent}
      toc={page.data.toc}
    >
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static schema.org JSON-LD built from page data
        dangerouslySetInnerHTML={{ __html: breadcrumbData }}
        type="application/ld+json"
      />
      <DocsTitle className="font-semibold text-4xl tracking-tighter">
        {page.data.title}
      </DocsTitle>
      <DocsDescription className="text-xl tracking-tighter">
        {page.data.description}
      </DocsDescription>
      <div className="flex flex-row items-center gap-2">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover githubUrl={githubUrl} markdownUrl={markdownUrl} />
      </div>
      <DocsBody>
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
      canonical: `${siteConfig.url}${page.url}`,
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
