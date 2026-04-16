import { PageWrapper } from "@/components/layout/PageWrapper"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: "1",
    quote: "I read The Silent Hour in one sitting. The tension never lets up. One of the best psychological thrillers I've read in years.",
    author: "Sarah M.",
    source: "Goodreads",
  },
  {
    id: "2",
    quote: "The writing workbook completely transformed how I plot my thrillers. Worth every penny — I keep going back to it.",
    author: "Jenna L.",
    source: "Verified Buyer",
  },
  {
    id: "3",
    quote: "The free library alone is worth signing up for. The short stories are genuinely great — tight, atmospheric, and unpredictable.",
    author: "Claire D.",
    source: "Newsletter Subscriber",
  },
]

export function TestimonialStrip() {
  return (
    <section className="bg-brand-parchment py-section">
      <PageWrapper>
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            What readers are saying
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="flex flex-col bg-brand-greige/30 rounded-card p-8 border border-brand-greige/50"
            >
              <Quote className="h-6 w-6 text-brand-gold/50 mb-4 shrink-0" />
              <p className="font-serif text-base italic text-brand-charcoal/80 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-xs font-semibold text-brand-gold">
                  {t.author[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-charcoal">{t.author}</p>
                  <p className="text-xs text-brand-charcoal/50">{t.source}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </PageWrapper>
    </section>
  )
}
