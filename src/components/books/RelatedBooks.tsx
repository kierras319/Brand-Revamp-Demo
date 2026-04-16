import Link from "next/link"
import Image from "next/image"
import type { Book } from "@/lib/types"
import { StarRating } from "@/components/shop/ReviewSection"

interface RelatedBooksProps {
  books: Book[]
}

export function RelatedBooks({ books }: RelatedBooksProps) {
  if (!books.length) return null

  return (
    <section className="bg-brand-greige/20 py-section-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="flex-1 h-px bg-brand-greige/60" />
          <h2 className="font-serif text-2xl font-semibold text-brand-charcoal whitespace-nowrap">
            You May Also Like
          </h2>
          <div className="flex-1 h-px bg-brand-greige/60" />
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/books/${book.slug}`}
              className="group flex flex-col shrink-0 w-40"
            >
              <div className="relative aspect-[2/3] w-40 rounded shadow-card group-hover:shadow-card-hover transition-shadow duration-300 overflow-hidden bg-brand-greige/20">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                  sizes="160px"
                />
                {book.status === "coming-soon" && (
                  <div className="absolute inset-0 bg-brand-charcoal/50 flex items-end p-2">
                    <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Coming Soon</span>
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm font-semibold text-brand-charcoal leading-tight group-hover:text-brand-wine transition-colors line-clamp-2">
                {book.title}
              </p>
              <p className="text-xs text-brand-charcoal/50 mt-0.5">by Keke</p>
              <div className="mt-1">
                <StarRating rating={5} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
