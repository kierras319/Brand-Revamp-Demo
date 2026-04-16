import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ProductGrid } from "@/components/shop/ProductGrid"
import { getFeaturedProducts } from "@/data/products"

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 6)

  return (
    <section className="bg-brand-charcoal py-section">
      <PageWrapper>
        <SectionHeading
          title="Reader Picks"
          subtitle="The most-loved products in the shop — handpicked for dark fiction enthusiasts."
          align="center"
          theme="dark"
        />

        <ProductGrid products={products} columns={3} />

        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:text-brand-cream transition-colors underline underline-offset-4"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageWrapper>
    </section>
  )
}
