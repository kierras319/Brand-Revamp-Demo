import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
  theme?: "light" | "dark"
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2
        className={cn(
          "font-serif text-display-sm md:text-display-md font-semibold leading-tight",
          theme === "dark" ? "text-brand-cream" : "text-brand-charcoal"
        )}
      >
        {title}
      </h2>

      {/* Decorative rule */}
      <div
        className={cn(
          "h-px w-16 bg-brand-gold mt-4",
          align === "center" ? "mx-auto" : "ml-0"
        )}
      />

      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            theme === "dark"
              ? "text-brand-greige/80"
              : "text-brand-charcoal/60"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
