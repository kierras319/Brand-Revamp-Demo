"use client"

import { BLOG_CATEGORIES } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface BlogCategoryFilterProps {
  activeCategory: string
  onChange: (category: string) => void
}

export function BlogCategoryFilter({ activeCategory, onChange }: BlogCategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {BLOG_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
            activeCategory === cat.id
              ? "bg-brand-charcoal text-brand-cream border-brand-charcoal"
              : "bg-transparent text-brand-charcoal/70 border-brand-greige hover:border-brand-charcoal/50 hover:text-brand-charcoal"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
