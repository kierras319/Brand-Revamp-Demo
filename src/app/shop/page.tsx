import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { ShopCategoryTabs } from "@/components/shop/ShopCategoryTabs"

export const metadata: Metadata = {
  title: "The Shop",
  description:
    "Browse dark fiction ebooks, thriller writing resources, reader experiences, and digital planners.",
}

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="The Shop"
        subtitle="Dark fiction, immersive experiences, and tools for readers and writers who live for the dark."
        backgroundVariant="charcoal"
      />
      <ShopCategoryTabs />
    </>
  )
}
