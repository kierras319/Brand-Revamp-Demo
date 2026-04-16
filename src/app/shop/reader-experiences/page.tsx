import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { getProductsByCategory } from "@/data/products"

export const metadata: Metadata = {
  title: "Reader Experiences",
  description: "Book club kits, digital escape rooms, and immersive thriller extras for readers.",
}

export default function ReaderExperiencesPage() {
  const products = getProductsByCategory("reader-experiences")
  return (
    <>
      <PageHero
        title="Reader Experiences"
        subtitle="Go deeper into the story. Immersive extras for thriller lovers."
        backgroundVariant="charcoal"
        badge="For Readers"
      />
      <section className="bg-brand-parchment py-section">
        <PageWrapper>
          <ProductGrid products={products} columns={3} />
        </PageWrapper>
      </section>
    </>
  )
}
