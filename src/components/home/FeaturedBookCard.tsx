import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { getFeaturedBooks } from "@/data/books"

export function FeaturedBookCard() {
  const book = getFeaturedBooks()[0]
  if (!book) return null

  return (
    <section className="bg-brand-parchment py-section-sm">
      <PageWrapper>
        <div className="bg-brand-charcoal rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">

            {/* Left: cover image */}
            <div className="relative h-72 md:h-full min-h-[320px]">
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-charcoal/40 hidden md:block" />
            </div>

            {/* Right: text */}
            <div className="p-10 md:p-14 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold mb-4">
                Now Available
              </p>
              <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight mb-4">
                {book.title}
              </h2>
              <p className="font-serif italic text-brand-greige/70 text-lg mb-6">
                &ldquo;{book.tagline}&rdquo;
              </p>
              <p className="text-brand-greige/60 text-sm leading-relaxed mb-8 max-w-sm mx-auto md:mx-0">
                {book.synopsis.slice(0, 140)}…
              </p>
              <Button
                variant="cream-outline"
                size="lg"
                asChild
                className="border-brand-cream/50 text-brand-cream hover:bg-brand-cream/10"
              >
                <Link href={`/books/${book.slug}`}>Get the Book</Link>
              </Button>
            </div>

          </div>
        </div>
      </PageWrapper>
    </section>
  )
}
