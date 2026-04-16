import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Book } from "@/lib/types"

interface BookCardProps {
  book: Book
  className?: string
}

export function BookCard({ book, className }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className={cn(
        "group flex flex-col bg-brand-greige rounded-card overflow-hidden shadow-card hover:shadow-card-hover border border-white/5 transition-all duration-400 hover:-translate-y-1",
        className
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-brand-charcoal">
        <Image
          src={book.coverUrl}
          alt={`${book.title} cover`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        {book.status === "coming-soon" && (
          <div className="absolute inset-0 bg-brand-charcoal/80 flex items-center justify-center">
            <Badge variant="taupe" className="text-xs font-semibold uppercase tracking-widest">
              Coming Soon
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-2">
          {book.genre}
        </span>
        <h3 className="font-serif text-xl font-semibold text-brand-cream leading-tight mb-2 group-hover:text-brand-gold transition-colors duration-200">
          {book.title}
        </h3>
        <p className="text-sm text-brand-stone italic mb-4 line-clamp-1">
          {book.tagline}
        </p>
        <p className="text-sm text-brand-stone/80 leading-relaxed line-clamp-3 flex-1">
          {book.synopsis}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-gold group-hover:text-brand-cream transition-colors duration-200">
          {book.status === "available" ? "Read More" : "Learn More"}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
