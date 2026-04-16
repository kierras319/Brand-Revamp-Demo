import type { Metadata } from "next"
import { HeroSlideshow } from "@/components/home/HeroSlideshow"
import { HeroSection } from "@/components/home/HeroSection"
import { HowItWorks } from "@/components/home/HowItWorks"
import { FeaturedBookCard } from "@/components/home/FeaturedBookCard"
import { SplitPromo } from "@/components/home/SplitPromo"
import { EditorialStatement } from "@/components/home/EditorialStatement"
import { SplitPanels } from "@/components/home/SplitPanels"
import { FeaturedBooks } from "@/components/home/FeaturedBooks"
import { CategoryPreview } from "@/components/home/CategoryPreview"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { EmailSignupBanner } from "@/components/home/EmailSignupBanner"
import { TestimonialStrip } from "@/components/home/TestimonialStrip"

export const metadata: Metadata = {
  title: "Keke Sharice — Domestic Psychological Thrillers",
  description:
    "Keke Sharice writes psychological thrillers about the lies we tell the people closest to us. Download a free chapter and start your next obsession.",
}

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />
      <HeroSection />
      <HowItWorks />
      <FeaturedBookCard />
      <SplitPromo />
      <EditorialStatement />
      <SplitPanels />
      <FeaturedBooks />
      <CategoryPreview />
      <FeaturedProducts />
      <EmailSignupBanner />
      <TestimonialStrip />
    </>
  )
}
