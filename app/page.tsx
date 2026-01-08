import { Suspense } from "react";
import { Hero } from "@/components/features/Hero";

import { MenuSection } from "@/components/features/MenuSection";
import { AboutSection } from "@/components/features/AboutSection";
import { Footer } from "@/components/layout/Footer";

import { ReviewsSection } from "@/components/features/ReviewsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-black text-white selection:bg-gold selection:text-black">
      <Hero />

      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <MenuSection />
      </Suspense>
      <AboutSection />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
