import { GlassLayout } from "fumadocs-ui/layouts/glass";
import type { Metadata } from "next";
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
    <GlassLayout {...baseOptions()} tree={source.getPageTree()}>
      {children}
    </GlassLayout>
  );
}
