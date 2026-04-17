"use client"

import { useState } from "react"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { ShoppingCart, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { ProductFormat } from "@/lib/types"

interface FormatSelectorProps {
  formats: ProductFormat[]
  defaultPrice: number
  productId: string
  productSlug: string
  productTitle: string
  imageUrl?: string
}

export function FormatSelector({
  formats,
  defaultPrice,
  productId,
  productSlug,
  productTitle,
  imageUrl,
}: FormatSelectorProps) {
  const [selected, setSelected] = useState<ProductFormat>(formats[0])
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()
  const price = selected?.price ?? defaultPrice

  function addToCart() {
    addItem({
      productId,
      slug: productSlug,
      title: productTitle,
      price,
      format: selected.label,
      imageUrl,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function buyNow() {
    addItem({
      productId,
      slug: productSlug,
      title: productTitle,
      price,
      format: selected.label,
      imageUrl,
    })
    router.push("/checkout")
  }

  return (
    <div className="space-y-5">
      {/* Selected format label + large price */}
      <div>
        <p className="text-sm text-brand-charcoal/60 mb-1">{selected.label}</p>
        <p className="font-serif text-4xl font-semibold text-brand-charcoal">
          {formatPrice(price)}
        </p>
      </div>

      {/* Format pill buttons */}
      <div className="flex flex-wrap gap-2">
        {formats.map((fmt) => (
          <button
            key={fmt.label}
            type="button"
            onClick={() => setSelected(fmt)}
            className={cn(
              "flex flex-col items-center px-5 py-3 rounded border text-sm transition-all duration-200 min-w-[90px]",
              selected.label === fmt.label
                ? "bg-brand-wine text-brand-cream border-brand-wine shadow-btn-glow font-semibold"
                : "bg-white text-brand-charcoal border-brand-greige hover:border-brand-wine hover:text-brand-wine"
            )}
          >
            <span className="text-xs font-semibold uppercase tracking-wide leading-tight">
              {fmt.label}
            </span>
            <span className={cn("text-sm font-semibold mt-0.5", selected.label === fmt.label ? "text-brand-cream/90" : "text-brand-charcoal/70")}>
              {formatPrice(fmt.price)}
            </span>
          </button>
        ))}
      </div>

      <div className="h-px bg-brand-greige/60" />

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant={added ? "charcoal" : "olive"}
          size="lg"
          className="flex-1 sm:flex-none sm:px-10 transition-all duration-200"
          onClick={addToCart}
        >
          {added ? (
            <><Check className="h-4 w-4 mr-1.5" />Added</>
          ) : (
            <><ShoppingCart className="h-4 w-4 mr-1.5" />Add to Cart</>
          )}
        </Button>
        <Button
          variant="olive-outline"
          size="lg"
          className="flex-1 sm:flex-none sm:px-10"
          onClick={buyNow}
        >
          <Zap className="h-4 w-4 mr-1.5" />
          Buy Now
        </Button>
      </div>

      <p className="text-xs text-brand-charcoal/40">
        {selected.label === "Ebook"
          ? "Instant download. Compatible with Kindle, Apple Books, and all major e-readers."
          : "Instant access. Stream or download. Compatible with all major audiobook apps."}
      </p>
    </div>
  )
}
