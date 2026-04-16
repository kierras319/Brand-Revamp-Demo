import { cn } from "@/lib/utils"
import { PageWrapper } from "@/components/layout/PageWrapper"

interface PageHeroProps {
  title: string
  subtitle?: string
  badge?: string
  backgroundVariant?: "parchment" | "charcoal" | "textured"
  className?: string
  children?: React.ReactNode
}

export function PageHero({
  title,
  subtitle,
  badge,
  backgroundVariant = "charcoal",
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 md:py-28",
        backgroundVariant === "charcoal" && "bg-brand-charcoal",
        backgroundVariant === "parchment" && "bg-brand-parchment",
        backgroundVariant === "textured" && "bg-brand-charcoal",
        className
      )}
    >
      {/* Subtle noise texture for charcoal/textured variants */}
      {(backgroundVariant === "charcoal" || backgroundVariant === "textured") && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <PageWrapper className="relative z-10 text-center">
        {badge && (
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold border border-brand-gold/40 px-4 py-1 rounded-full">
            {badge}
          </span>
        )}

        <h1
          className={cn(
            "font-serif text-display-md md:text-display-lg font-semibold leading-tight",
            "text-brand-cream"
          )}
        >
          {title}
        </h1>

        <div
          className={cn(
            "h-px w-16 mx-auto mt-5",
            backgroundVariant === "parchment"
              ? "bg-brand-gold"
              : "bg-brand-gold/60"
          )}
        />

        {subtitle && (
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed max-w-2xl mx-auto",
              "text-brand-stone"
            )}
          >
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </PageWrapper>
    </section>
  )
}
