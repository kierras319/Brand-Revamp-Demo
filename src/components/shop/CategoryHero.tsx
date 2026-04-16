import { cn } from "@/lib/utils"
import { PageWrapper } from "@/components/layout/PageWrapper"

interface CategoryHeroProps {
  title: string
  tagline: string
  className?: string
}

export function CategoryHero({ title, tagline, className }: CategoryHeroProps) {
  return (
    <div className={cn("bg-brand-greige/40 py-10 border-b border-brand-greige/60", className)}>
      <PageWrapper>
        <h2 className="font-serif text-display-sm font-semibold text-brand-charcoal">
          {title}
        </h2>
        <p className="mt-2 text-brand-charcoal/60 italic font-serif text-lg">{tagline}</p>
      </PageWrapper>
    </div>
  )
}
