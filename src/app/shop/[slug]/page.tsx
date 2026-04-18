import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Heart, Download } from "lucide-react"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { FormatSelector } from "@/components/shop/FormatSelector"
import { AddToCartButton } from "@/components/shop/AddToCartButton"
import { WriteReviewModal } from "@/components/shop/WriteReviewModal"
import { ReviewSection } from "@/components/shop/ReviewSection"
import { StarRating } from "@/components/shop/ReviewSection"
import { YouMayAlsoLike } from "@/components/shop/YouMayAlsoLike"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { getProductBySlug, products, getRelatedProducts } from "@/data/products"
import { getReviewsBySlug, getAverageRating } from "@/data/reviews"

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return { title: product.title, description: product.description }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const hasFormats = product.formats && product.formats.length > 1
  const reviews = getReviewsBySlug(slug)
  const related = getRelatedProducts(slug, 5)
  const avgRating = getAverageRating(reviews)
  const roundedAvg = Math.round(avgRating * 10) / 10

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-charcoal/95 border-b border-brand-gold/10">
        <PageWrapper>
          <nav className="py-3 flex items-center gap-2 text-xs text-brand-stone uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-brand-cream">{product.title}</span>
          </nav>
        </PageWrapper>
      </div>

      {/* ── HERO: Cover + Product Info ── */}
      <section className="bg-white py-10 md:py-16">
        <PageWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">

            {/* LEFT: Cover image */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative w-64 lg:w-72 shrink-0">
                {product.badge && (
                  <div className="absolute top-0 left-0 z-10">
                    <span className="block bg-brand-wine text-brand-cream text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="relative aspect-[2/3] w-full rounded shadow-luxury overflow-hidden bg-brand-greige/20">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="288px"
                  />
                </div>
              </div>

              {/* Below cover links */}
              <div className="mt-4 flex flex-col items-center lg:items-start gap-3 text-sm">
                <button type="button" className="flex items-center gap-1.5 text-brand-wine hover:text-brand-wine/80 transition-colors">
                  <Heart className="h-4 w-4" />
                  Add to Wishlist
                </button>
                <Link href="/about" className="flex items-center gap-1.5 text-brand-wine hover:text-brand-wine/80 transition-colors">
                  ✓ Keke
                </Link>
              </div>
            </div>

            {/* RIGHT: Product details */}
            <div className="space-y-4 max-w-xl">

              {/* Title & author */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-brand-charcoal leading-tight">
                  {product.title}
                </h1>
                <p className="mt-2 text-sm text-brand-charcoal/60">
                  by{" "}
                  <Link href="/about" className="text-brand-wine hover:underline font-medium">
                    Keke
                  </Link>
                </p>
              </div>

              {/* Star rating row */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-3">
                  <StarRating rating={Math.round(avgRating)} />
                  <span className="text-sm font-semibold text-brand-gold">{roundedAvg}</span>
                  <span className="text-sm text-brand-charcoal/50">({reviews.length})</span>
                  <WriteReviewModal productSlug={slug} productTitle={product.title} />
                </div>
              )}

              {/* Short description in hero */}
              <p className="text-brand-charcoal/70 leading-relaxed text-sm">
                {product.description}
              </p>

              <div className="h-px bg-brand-greige/60" />

              {/* Format selector or simple price */}
              {hasFormats ? (
                <FormatSelector
                  formats={product.formats!}
                  defaultPrice={product.price}
                  productId={product.id}
                  productSlug={product.slug}
                  productTitle={product.title}
                  imageUrl={product.imageUrl}
                />
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-brand-charcoal/60 mb-1">Digital Download</p>
                    <p className="font-serif text-4xl font-semibold text-brand-charcoal">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="h-px bg-brand-greige/60" />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <AddToCartButton
                      product={product}
                      size="lg"
                      className="flex-1 sm:flex-none sm:px-10"
                    />
                    <AddToCartButton
                      product={product}
                      size="lg"
                      buyNow
                      className="flex-1 sm:flex-none sm:px-10"
                    />
                  </div>
                </div>
              )}

              <div className="h-px bg-brand-greige/60" />

              {/* Download / availability note */}
              <div className="flex items-start gap-2 text-sm text-brand-charcoal/60">
                <Download className="h-4 w-4 mt-0.5 shrink-0 text-brand-wine" />
                <span>Instant download. Available for all devices — no app required.</span>
              </div>

            </div>
          </div>
        </PageWrapper>
      </section>

      {/* ── OVERVIEW ── */}
      {(product.overview || product.authorNote) && (
        <section className="bg-brand-parchment py-section">
          <PageWrapper className="max-w-5xl">
            <h2 className="font-serif text-2xl italic text-brand-cream mb-6">Overview</h2>

            {/* "From the Author" callout box — mirrors B&N's "Notes From Your Bookseller" */}
            {product.authorNote && (
              <div className="border border-brand-greige rounded p-5 mb-8 bg-white relative">
                <span className="absolute -top-3 left-4 bg-white px-2 font-serif text-sm italic text-brand-charcoal/60">
                  Notes From the Author
                </span>
                <p className="text-brand-charcoal/80 leading-relaxed text-sm">
                  {product.authorNote}
                </p>
              </div>
            )}

            {/* Two-column overview text */}
            {product.overview && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-stone leading-relaxed text-sm">
                <p>{product.description}</p>
                <p>{product.overview}</p>
              </div>
            )}
          </PageWrapper>
        </section>
      )}

      {/* ── YOU MAY ALSO LIKE ── */}
      <YouMayAlsoLike products={related} />

      {/* ── CUSTOMER REVIEWS ── */}
      <div id="reviews">
        <ReviewSection reviews={reviews} slug={slug} title={product.title} />
      </div>
    </>
  )
}
