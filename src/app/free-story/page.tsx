import type { Metadata } from "next"
import Image from "next/image"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { EmailSignupForm } from "@/components/shared/EmailSignupForm"

export const metadata: Metadata = {
  title: "The Last Witness — Free Story by Keke Sharice",
  description: "A mind can forget — but the truth remembers. Get The Last Witness free. A twisty psychological thriller about memory manipulation, identity, and survival.",
}

const reviews = [
  {
    quote: "Hooked from the first page. I stayed up until 3am. This is exactly the kind of dark fiction I've been looking for.",
    author: "@darkfictionlover",
    source: "Newsletter Subscriber",
  },
  {
    quote: "The tension builds so quietly you don't realise you've been holding your breath. The ending left me breathless.",
    author: "Janelle R.",
    source: "Goodreads",
  },
]

export default function FreeStoryPage() {
  return (
    <section className="min-h-screen bg-brand-charcoal py-16">
      <PageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

          {/* Left: cover + social proof */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative w-56 md:w-72 aspect-[2/3] rounded-xl overflow-hidden shadow-luxury mb-8">
              <Image
                src="https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=900&fit=crop&q=85"
                alt="The Last Witness by Keke Sharice"
                fill
                className="object-cover"
                priority
                sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 to-transparent" />
              <div className="absolute bottom-5 left-0 right-0 text-center">
                <p className="font-serif text-xl font-semibold text-brand-cream leading-tight px-4">
                  The Last Witness
                </p>
                <p className="text-xs text-brand-gold mt-1 tracking-wider uppercase">Keke Sharice</p>
              </div>
            </div>

            {/* Reader reviews */}
            <div className="space-y-5 w-full max-w-sm">
              {reviews.map((r, i) => (
                <blockquote key={i} className="border-l-2 border-brand-wine/50 pl-4">
                  <p className="font-serif italic text-brand-cream/90 text-sm leading-relaxed">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <footer className="mt-1">
                    <span className="text-brand-gold text-xs font-medium">{r.author}</span>
                    <span className="text-brand-stone text-xs"> · {r.source}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>

          {/* Right: opt-in */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold mb-4">
              Free Short Story
            </p>
            <h1 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight mb-4">
              <em className="text-brand-wine not-italic" style={{ fontStyle: "italic" }}>The Last Witness</em>
            </h1>
            <div className="w-10 h-px bg-brand-gold/50 mb-6" />

            {/* Author note */}
            <div className="border-l-2 border-brand-wine/60 pl-4 mb-6">
              <p className="font-serif italic text-brand-cream/85 text-sm leading-relaxed">
                &ldquo;Samantha&rsquo;s story is about more than suspense — it&rsquo;s about finding power in the parts of ourselves we were told to forget. If you&rsquo;ve ever felt lost, overlooked, or like your truth has been rewritten by someone else — this one&rsquo;s for you. I hope this book gives you a fierce escape and a reminder: you are the author of your story.&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold text-brand-gold tracking-wider uppercase">— Keke Sharice</p>
            </div>

            {/* Synopsis */}
            <p className="text-brand-stone text-sm leading-relaxed mb-2">
              <strong className="text-brand-cream">A mind can forget — but the truth remembers.</strong>
            </p>
            <p className="text-brand-stone text-sm leading-relaxed mb-8">
              When Samantha wakes up in a hospital bed with no memory and a body stitched with pain, she&rsquo;s told she survived a brutal attack. As fragments of the night flicker through her mind, she begins to question everything. Who is Detective Nick Forest really trying to protect? Why does the hospital feel more like a prison than a place of healing? <em>Some memories refuse to stay buried.</em>
            </p>

            <div className="bg-brand-greige rounded-xl p-8 border border-white/5">
              <EmailSignupForm
                variant="stacked"
                theme="dark"
                placeholder="Your email address"
                buttonText="Send Me The Last Witness"
                action="/api/free-story"
              />
              <p className="mt-4 text-xs text-brand-stone text-center">
                Free EPUB delivered instantly to your inbox. No spam. Unsubscribe anytime.
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
