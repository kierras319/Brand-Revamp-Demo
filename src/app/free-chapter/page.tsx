import type { Metadata } from "next"
import Image from "next/image"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { EmailSignupForm } from "@/components/shared/EmailSignupForm"

export const metadata: Metadata = {
  title: "Read Free — Keke Sharice",
  description: "Get the first chapters of The Silent Hour delivered to your inbox. Free. No strings attached.",
}

const reviews = [
  {
    quote: "I read it in one sitting. The ending destroyed me in the best possible way.",
    author: "Sarah M.",
    source: "Amazon Verified Purchase",
  },
  {
    quote: "The tension builds so slowly you don't realize you've been holding your breath until your chest hurts. That's great writing.",
    author: "@TiffanyReads_",
    source: "Goodreads",
  },
]

export default function FreeChapterPage() {
  return (
    /* Nav deliberately kept — users arriving from organic/email traffic still need navigation */
    <section className="min-h-screen bg-brand-charcoal py-16">
      <PageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

          {/* Left: book cover + social proof */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative w-56 md:w-72 aspect-[2/3] rounded-xl overflow-hidden shadow-luxury mb-8">
              <Image
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=900&fit=crop&q=85"
                alt="The Silent Hour by Keke Sharice"
                fill
                className="object-cover"
                priority
                sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent" />
            </div>

            {/* Reader reviews */}
            <div className="space-y-5 w-full max-w-sm">
              {reviews.map((r, i) => (
                <blockquote key={i} className="border-l-2 border-brand-wine/50 pl-4">
                  <p className="font-serif italic text-brand-cream/80 text-sm leading-relaxed">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <footer className="mt-1">
                    <span className="text-brand-gold text-xs font-medium">{r.author}</span>
                    <span className="text-brand-stone/60 text-xs"> · {r.source}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          {/* Right: opt-in form */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold mb-4">
              Free Download
            </p>
            <h1 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight mb-4">
              Start Reading <em className="text-brand-wine" style={{ fontStyle: "italic" }}>The Silent Hour</em> — Free.
            </h1>
            <div className="w-10 h-px bg-brand-gold/50 mb-6" />
            <p className="text-brand-stone text-base leading-relaxed mb-8">
              She thought the silence was just their marriage. She was wrong. Get the first three chapters delivered straight to your inbox — no credit card, no catch.
            </p>

            <div className="bg-brand-greige rounded-xl p-8 border border-white/5">
              <EmailSignupForm
                variant="stacked"
                theme="dark"
                placeholder="Your email address"
                buttonText="Send Me the Free Chapters"
              />
              <p className="mt-4 text-xs text-brand-stone/60 text-center">
                No spam. Unsubscribe anytime. Your secrets are safe.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-1">
                {["S", "J", "M", "C", "T"].map((initial) => (
                  <div
                    key={initial}
                    className="w-7 h-7 rounded-full bg-brand-greige border-2 border-brand-charcoal flex items-center justify-center text-[10px] font-semibold text-brand-gold"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-stone">
                Joined by <span className="text-brand-cream font-medium">12,000+ readers</span>
              </p>
            </div>
          </div>

        </div>
      </PageWrapper>
    </section>
  )
}
