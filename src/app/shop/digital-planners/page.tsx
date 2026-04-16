import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { getProductsByCategory } from "@/data/products"

export const metadata: Metadata = {
  title: "Digital Planners & Kits",
  description: "Beautiful printable planners, reading trackers, and digital kits for book lovers.",
}

export default function DigitalPlannersPage() {
  const products = getProductsByCategory("digital-planners")
  return (
    <>
      <PageHero
        title="Digital Planners & Kits"
        subtitle="Organize your reading life in style. Beautifully designed planners for dark fiction enthusiasts."
        backgroundVariant="charcoal"
        badge="Printable & Digital"
      />
      <section className="bg-brand-parchment py-section">
        <PageWrapper>
          <ProductGrid products={products} columns={3} />
        </PageWrapper>
      </section>
    </>
  )
}
