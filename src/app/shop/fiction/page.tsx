import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { getProductsByCategory } from "@/data/products"

export const metadata: Metadata = {
  title: "Fiction",
  description: "Dark psychological thriller ebooks, serialized fiction, and audiobook shorts.",
}

export default function FictionPage() {
  const products = getProductsByCategory("fiction")
  return (
    <>
      <PageHero
        title="Fiction"
        subtitle="Stories that refuse to let you go. Dark, immersive, and emotionally unforgettable."
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
