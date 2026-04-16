import Link from "next/link"
import { BookOpen, PenLine, Sparkles, Layout } from "lucide-react"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { SHOP_CATEGORIES } from "@/lib/constants"
import { cn } from "@/lib/utils"

const categoryIcons = {
  fiction: BookOpen,
  "writer-resources": PenLine,
  "reader-experiences": Sparkles,
  "digital-planners": Layout,
}

export function CategoryPreview() {
  return (
    <section className="bg-brand-greige py-section">
      <PageWrapper>
        <SectionHeading
          title="Explore the Shop"
          subtitle="Everything you need — whether you're here to read, to write, or to escape."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOP_CATEGORIES.map((category) => {
            const Icon = categoryIcons[category.id]
            return (
              <Link
                key={category.id}
                href={category.href}
                className={cn(
                  "group flex flex-col items-start p-7 bg-brand-parchment rounded-card shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1"
                )}
              >
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center mb-5 group-hover:bg-brand-gold/20 transition-colors">
                  <Icon className="h-5 w-5 text-brand-gold" />
                </div>

                <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-2 group-hover:text-brand-gold transition-colors">
                  {category.label}
                </h3>
                <p className="text-sm text-brand-charcoal/60 leading-relaxed mb-5 flex-1">
                  {category.description}
                </p>
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold group-hover:text-brand-wine transition-colors">
                  Shop Now →
                </span>
              </Link>
            )
          })}
        </div>
      </PageWrapper>
    </section>
  )
}
