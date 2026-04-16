import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { formatPrice } from "@/lib/utils"
import { StarRating } from "./ReviewSection"

interface YouMayAlsoLikeProps {
  products: Product[]
}

export function YouMayAlsoLike({ products }: YouMayAlsoLikeProps) {
  if (!products.length) return null

  return (
    <section className="bg-brand-greige/20 py-section-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading with flanking rules */}
        <div className="flex items-center gap-5 mb-8">
          <div className="flex-1 h-px bg-brand-greige/60" />
          <h2 className="font-serif text-2xl font-semibold text-brand-charcoal whitespace-nowrap">
            You May Also Like
          </h2>
          <div className="flex-1 h-px bg-brand-greige/60" />
        </div>

        {/* Scrollable row */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/shop/${product.slug}`}
              className="group flex flex-col shrink-0 w-40"
            >
              <div className="relative aspect-[2/3] w-40 rounded-md overflow-hidden bg-brand-greige/20 shadow-card group-hover:shadow-card-hover transition-shadow duration-300">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                  sizes="160px"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-brand-charcoal leading-tight group-hover:text-brand-wine transition-colors line-clamp-2">
                {product.title}
              </p>
              <p className="text-xs text-brand-charcoal/50 mt-0.5">by Keke</p>
              <div className="mt-1 flex items-center gap-1.5">
                <StarRating rating={5} />
              </div>
              <p className="text-xs font-semibold text-brand-charcoal mt-1">
                {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
