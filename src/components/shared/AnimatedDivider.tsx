import { cn } from "@/lib/utils"

interface AnimatedDividerProps {
  className?: string
  ornament?: boolean
  theme?: "light" | "dark"
}

export function AnimatedDivider({
  className,
  ornament = false,
  theme = "light",
}: AnimatedDividerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 py-8",
        className
      )}
    >
      <div
        className={cn(
          "flex-1 h-px",
          theme === "dark" ? "bg-brand-greige/20" : "bg-brand-greige/50"
        )}
      />
      {ornament && (
        <span
          className={cn(
            "text-xl font-serif",
            theme === "dark" ? "text-brand-gold/60" : "text-brand-gold/50"
          )}
          aria-hidden
        >
          ✦
        </span>
      )}
      <div
        className={cn(
          "flex-1 h-px",
          theme === "dark" ? "bg-brand-greige/20" : "bg-brand-greige/50"
        )}
      />
    </div>
  )
}
