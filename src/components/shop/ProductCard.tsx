import Link from "next/link"
import Image from "next/image"
import { PenLine, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/shop/AddToCartButton"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  size?: "default" | "compact"
  className?: string
}

const badgeVariantMap = {
  New: "olive" as const,
  Bestseller: "charcoal" as const,
  "Coming Soon": "taupe" as const,
  Free: "mauve" as const,
}

export function ProductCard({ product, size = "default", className }: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-card rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400",
        className
      )}
    >
      {/* Image */}
      <div className={cn("relative overflow-hidden bg-brand-greige/20", size === "compact" ? "aspect-square" : "aspect-[4/5]")}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={badgeVariantMap[product.badge] ?? "default"} className="text-[10px] uppercase tracking-wide">
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Variant icon */}
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-brand-charcoal/60 flex items-center justify-center">
          {product.variant === "writer" ? (
            <PenLine className="h-3.5 w-3.5 text-brand-cream" />
          ) : (
            <ShoppingBag className="h-3.5 w-3.5 text-brand-cream" />
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-brand-charcoal/90 p-4 flex flex-col items-center gap-2">
          <span className="text-brand-cream font-serif font-semibold text-lg">
            {formatPrice(product.price)}
          </span>
          <AddToCartButton product={product} size="sm" className="w-full" />
          <Link
            href={`/shop/${product.slug}`}
            className="text-xs text-brand-cream/60 hover:text-brand-cream transition-colors underline underline-offset-4"
          >
            View details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold/70 mb-1">
          {product.variant === "writer" ? "For Writers" : "For Readers"}
        </p>
        <h3 className={cn("font-serif font-semibold text-brand-cream leading-tight group-hover:text-brand-gold transition-colors duration-200 flex-1", size === "compact" ? "text-base" : "text-lg")}>
          {product.title}
        </h3>
        {size !== "compact" && (
          <p className="text-sm text-brand-stone mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold text-brand-cream">{formatPrice(product.price)}</span>
          <Link
            href={`/shop/${product.slug}`}
            className="text-xs font-medium text-brand-gold hover:text-brand-wine transition-colors underline underline-offset-4"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
