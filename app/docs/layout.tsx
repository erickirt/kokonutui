import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { Metadata } from "next";
import HeaderProSmall from "@/components/landing/header-pro-small";
import { source } from "@/lib/source";
import { baseOptions } from "../layout.config";

export const metadata: Metadata = {
  title: {
    template: "%s | KokonutUI",
    default:
      "KokonutUI - Open Source UI Components to build beautiful websites",
  },
};

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      {...baseOptions()}
      sidebar={{ footer: <HeaderProSmall /> }}
      tree={source.getPageTree()}
    >
      {children}
    </DocsLayout>
  );
}
