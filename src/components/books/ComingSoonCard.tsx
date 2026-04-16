import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Book } from "@/lib/types"

interface ComingSoonCardProps {
  book: Book
  className?: string
}

export function ComingSoonCard({ book, className }: ComingSoonCardProps) {
  return (
    <div className={cn("flex flex-col bg-card rounded-card overflow-hidden shadow-card border border-brand-greige/40", className)}>
      {/* Placeholder cover */}
      <div className="relative aspect-[2/3] bg-gradient-to-br from-brand-charcoal/90 to-brand-charcoal flex flex-col items-center justify-center p-6 text-center">
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--brand-gold)) 0, hsl(var(--brand-gold)) 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
          aria-hidden
        />
        <Badge variant="taupe" className="mb-4 text-xs uppercase tracking-widest">
          Coming Soon
        </Badge>
        <h3 className="font-serif text-2xl font-semibold text-brand-cream leading-tight">
          {book.title}
        </h3>
        <div className="w-8 h-px bg-brand-gold/50 my-4" />
        <p className="text-brand-greige/70 font-serif italic text-sm">{book.genre}</p>
        {book.publishDate && (
          <p className="mt-4 text-xs text-brand-greige/50 uppercase tracking-widest">
            {new Date(book.publishDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="p-5">
        <p className="text-sm text-brand-charcoal/60 italic font-serif mb-4 line-clamp-2">
          {book.tagline}
        </p>
        <Button variant="olive-outline" size="sm" className="w-full">
          <Bell className="h-4 w-4" />
          Notify Me
        </Button>
      </div>
    </div>
  )
}
