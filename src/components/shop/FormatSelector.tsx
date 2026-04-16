"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { ProductFormat } from "@/lib/types"

interface FormatSelectorProps {
  formats: ProductFormat[]
  defaultPrice: number
}

export function FormatSelector({ formats, defaultPrice }: FormatSelectorProps) {
  const [selected, setSelected] = useState<ProductFormat>(formats[0])
  const price = selected?.price ?? defaultPrice

  return (
    <div className="space-y-5">
      {/* Selected format label + large price — mirrors B&N */}
      <div>
        <p className="text-sm text-brand-charcoal/60 mb-1">{selected.label}</p>
        <p className="font-serif text-4xl font-semibold text-brand-charcoal">
          {formatPrice(price)}
        </p>
      </div>

      {/* Format pill buttons — each shows format name + price stacked */}
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

      {/* Divider */}
      <div className="h-px bg-brand-greige/60" />

      {/* CTAs — Add to Cart + Instant Purchase */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="olive" size="lg" className="flex-1 sm:flex-none sm:px-10" asChild>
          <a href="#">
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </a>
        </Button>
        <Button
          variant="olive-outline"
          size="lg"
          className="flex-1 sm:flex-none sm:px-10"
          asChild
        >
          <a href="#">Instant Purchase</a>
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
