import { ProductCard } from "./ProductCard"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
  size?: "default" | "compact"
  className?: string
}

export function ProductGrid({ products, columns = 3, size = "default", className }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} size={size} />
      ))}
    </div>
  )
}
