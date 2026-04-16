import { cn } from "@/lib/utils"
import { PageWrapper } from "@/components/layout/PageWrapper"

interface CategoryHeroProps {
  title: string
  tagline: string
  className?: string
}

export function CategoryHero({ title, tagline, className }: CategoryHeroProps) {
  return (
    <div className={cn("bg-brand-greige py-10 border-b border-white/10", className)}>
      <PageWrapper>
        <h2 className="font-serif text-display-sm font-semibold text-brand-cream">
          {title}
        </h2>
        <p className="mt-2 text-brand-stone italic font-serif text-lg">{tagline}</p>
      </PageWrapper>
    </div>
  )
}
