import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import ProSection from "@/components/landing/pro-section";
import StatsBar from "@/components/landing/stats-bar";
import TestimonialsSection from "@/components/landing/testimonials";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ProSection />
      <HowItWorks />
      <TestimonialsSection />
    </>
  );
}
