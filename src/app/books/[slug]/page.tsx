import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Heart, Download, ShoppingCart } from "lucide-react"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { BookFormatSelector } from "@/components/books/BookFormatSelector"
import { WriteReviewModal } from "@/components/shop/WriteReviewModal"
import { RelatedBooks } from "@/components/books/RelatedBooks"
import { ReviewSection } from "@/components/shop/ReviewSection"
import { StarRating } from "@/components/shop/ReviewSection"
import { Button } from "@/components/ui/button"
import { getBookBySlug, books, getRelatedBooks } from "@/data/books"
import { getReviewsBySlug, getAverageRating } from "@/data/reviews"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const book = getBookBySlug(slug)
  if (!book) return {}
  return { title: book.title, description: book.tagline }
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params
  const book = getBookBySlug(slug)
  if (!book) notFound()

  const hasFormatPricing = book.formatPricing && book.formatPricing.length > 0
  const reviews = getReviewsBySlug(slug)
  const related = getRelatedBooks(slug, 5)
  const avgRating = getAverageRating(reviews)
  const roundedAvg = Math.round(avgRating * 10) / 10

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#1C1C1C] border-b border-brand-gold/10">
        <PageWrapper>
          <nav className="py-3 flex items-center gap-2 text-xs text-brand-stone uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/books" className="hover:text-brand-gold transition-colors">Books</Link>
            <span>/</span>
            <span className="text-brand-cream">{book.title}</span>
          </nav>
        </PageWrapper>
      </div>

      {/* ── HERO: Cover + Book Info ── */}
      <section className="bg-white py-10 md:py-16">
        <PageWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">

            {/* LEFT: Cover */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative w-64 lg:w-72 shrink-0">
                {book.featured && book.status === "available" && (
                  <div className="absolute top-0 left-0 z-10">
                    <span className="block bg-brand-wine text-brand-cream text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                      Bestseller
                    </span>
                  </div>
                )}
                {book.status === "coming-soon" && (
                  <div className="absolute top-0 left-0 z-10">
                    <span className="block bg-brand-charcoal text-brand-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="relative aspect-[2/3] w-full rounded shadow-luxury overflow-hidden bg-brand-greige/20">
                  <Image
                    src={book.coverUrl}
                    alt={`${book.title} cover`}
                    fill
                    className="object-cover"
                    priority
                    sizes="288px"
                  />
                </div>
              </div>

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

            {/* RIGHT: Book details */}
            <div className="space-y-4 max-w-xl">

              {/* Genre tag */}
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                {book.genre}
              </p>

              {/* Title & author */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-brand-charcoal leading-tight">
                  {book.title}
                </h1>
                {book.pages && (
                  <p className="mt-1 text-xs text-brand-charcoal/40">{book.pages} pages</p>
                )}
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
                  <WriteReviewModal productSlug={slug} productTitle={book.title} />
                </div>
              )}

              <div className="h-px bg-brand-greige/60" />

              {/* Format selector or coming-soon */}
              {book.status === "available" && hasFormatPricing ? (
                <BookFormatSelector
                  formats={book.formatPricing!}
                  purchaseUrl={book.purchaseUrl}
                />
              ) : book.status === "available" ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="olive" size="lg" className="flex-1 sm:flex-none sm:px-10" asChild>
                      <a href={book.purchaseUrl ?? "#"}>
                        <ShoppingCart className="h-4 w-4" />
                        Buy Now
                      </a>
                    </Button>
                    <Button variant="olive-outline" size="lg" className="flex-1 sm:flex-none sm:px-10" asChild>
                      <Link href="/free-library">Read a Free Chapter</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-serif text-lg italic text-brand-charcoal/60">
                    Available {book.publishDate ? new Date(book.publishDate).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "soon"}
                  </p>
                  <Button variant="olive" size="lg" className="px-10" asChild>
                    <a href="#">Notify Me When Available</a>
                  </Button>
                </div>
              )}

              <div className="h-px bg-brand-greige/60" />

              {/* Tagline */}
              <p className="font-serif text-lg italic text-brand-charcoal/70">
                &ldquo;{book.tagline}&rdquo;
              </p>

              {/* Download note */}
              {book.status === "available" && (
                <div className="flex items-start gap-2 text-sm text-brand-charcoal/50">
                  <Download className="h-4 w-4 mt-0.5 shrink-0 text-brand-wine" />
                  <span>Ebook: instant download. Audiobook: instant streaming &amp; download.</span>
                </div>
              )}

            </div>
          </div>
        </PageWrapper>
      </section>

      {/* ── OVERVIEW ── */}
      {(book.overview || book.authorNote) && (
        <section className="bg-brand-parchment py-section">
          <PageWrapper className="max-w-5xl">
            <h2 className="font-serif text-2xl italic text-brand-cream mb-6">Overview</h2>

            {book.authorNote && (
              <div className="border border-white/10 rounded p-5 mb-8 bg-brand-greige relative">
                <span className="absolute -top-3 left-4 bg-brand-greige px-2 font-serif text-sm italic text-brand-stone">
                  Notes From the Author
                </span>
                <p className="text-brand-stone leading-relaxed text-sm">
                  {book.authorNote}
                </p>
              </div>
            )}

            {book.overview && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-stone leading-relaxed text-sm">
                <p>{book.synopsis}</p>
                <p>{book.overview}</p>
              </div>
            )}
          </PageWrapper>
        </section>
      )}

      {/* ── YOU MAY ALSO LIKE ── */}
      <RelatedBooks books={related} />

      {/* ── CUSTOMER REVIEWS ── */}
      <div id="reviews">
        <ReviewSection reviews={reviews} slug={slug} title={book.title} />
      </div>
    </>
  )
}
