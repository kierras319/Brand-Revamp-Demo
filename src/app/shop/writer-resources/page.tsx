import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { getProductsByCategory } from "@/data/products"

export const metadata: Metadata = {
  title: "Writer Resources",
  description: "Thriller writing workbooks, character kits, story bibles, and AI prompt packs.",
}

export default function WriterResourcesPage() {
  const products = getProductsByCategory("writer-resources")
  return (
    <>
      <PageHero
        title="Writer Resources"
        subtitle="Craft the darkness within your stories. Tools and workbooks for psychological thriller writers."
        backgroundVariant="charcoal"
        badge="For Writers"
      />
      <section className="bg-brand-parchment py-section">
        <PageWrapper>
          <ProductGrid products={products} columns={3} />
        </PageWrapper>
      </section>
    </>
  )
}
