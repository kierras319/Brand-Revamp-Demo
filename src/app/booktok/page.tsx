import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { EmailSignupForm } from "@/components/shared/EmailSignupForm"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Welcome — Keke Sharice",
  description: "You found me. Psychological thrillers for women who read past midnight. Read the first chapter free.",
}

const reviews = [
  {
    quote: "I found Keke on TikTok and read three of her short stories in one night. Now I'm deep in The Silent Hour and can't stop.",
    author: "@darkfictionlover",
    stars: 5,
  },
  {
    quote: "The ending destroyed me in the best possible way. This is the domestic thriller I didn't know I needed.",
    author: "@readinginthedark_",
    stars: 5,
  },
  {
    quote: "Dark. Addictive. You won't see the ending coming. That's all you need to know.",
    author: "@TiffanyReads_",
    stars: 5,
  },
]

export default function BookTokPage() {
  return (
    /* No nav on this page — distraction-free for social traffic */
    <div className="min-h-screen bg-brand-charcoal">
      {/* Minimal header */}
      <div className="py-6 border-b border-white/5">
        <PageWrapper>
          <div className="flex items-center justify-between">
            <Link href="/" className="font-serif text-brand-gold text-xl font-semibold tracking-wide">
              Keke Sharice
            </Link>
            <div className="flex gap-3 text-xs text-brand-stone">
              <a href="https://tiktok.com/@kekesharice" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream transition-colors">TikTok</a>
              <span className="text-brand-stone/70">·</span>
              <a href="https://instagram.com/kekesharice" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream transition-colors">Instagram</a>
            </div>
          </div>
        </PageWrapper>
      </div>

      <section className="py-16">
        <PageWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

            {/* Left: copy + form */}
            <div>
              <p className="text-brand-gold text-sm mb-4">Welcome, BookTok 🖤</p>
              <h1 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight mb-4">
                You found me.
              </h1>
              <p className="text-brand-stone text-lg leading-relaxed mb-8">
                I write domestic psychological thrillers for women who read past midnight. Dark stories about the secrets people keep inside their homes. Start with the first chapter — free.
              </p>

              <div className="bg-brand-greige rounded-xl p-8 border border-white/5 mb-8">
                <p className="text-brand-cream font-semibold mb-1">Read Free →</p>
                <p className="text-brand-stone text-sm mb-5">First chapters of <em className="text-brand-cream">The Silent Hour</em> straight to your inbox.</p>
                <EmailSignupForm
                  variant="stacked"
                  theme="dark"
                  placeholder="Your email address"
                  buttonText="Send Me the Free Chapters"
                />
                <p className="mt-3 text-xs text-brand-stone text-center">
                  No spam. Unsubscribe anytime. Your secrets are safe.
                </p>
              </div>

              <Button variant="cream-outline" size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/shop">
                  Shop Now
                </Link>
              </Button>
            </div>

            {/* Right: book cover + reviews */}
            <div className="flex flex-col items-center">
              <div className="relative w-52 md:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-luxury mb-10">
                <Image
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=900&fit=crop&q=85"
                  alt="The Silent Hour — Keke Sharice"
                  fill
                  className="object-cover"
                  priority
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 to-transparent" />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="font-serif text-brand-cream text-lg font-semibold">The Silent Hour</p>
                </div>
              </div>

              <div className="space-y-4 w-full">
                {reviews.map((r, i) => (
                  <blockquote
                    key={i}
                    className="bg-brand-greige rounded-xl p-5 border border-white/5"
                  >
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <span key={j} className="text-brand-gold text-xs">★</span>
                      ))}
                    </div>
                    <p className="font-serif italic text-brand-cream/90 text-sm leading-relaxed">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                    <footer className="mt-2 text-xs text-brand-stone">{r.author}</footer>
                  </blockquote>
                ))}
              </div>
            </div>

          </div>
        </PageWrapper>
      </section>

      {/* Footer: social handles only */}
      <footer className="border-t border-white/5 py-8">
        <PageWrapper>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-stone">
            <p className="font-serif text-brand-stone">Keke Sharice</p>
            <div className="flex gap-6">
              <a href="https://tiktok.com/@kekesharice" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream transition-colors">
                @kekesharice on TikTok
              </a>
              <a href="https://instagram.com/kekesharice" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream transition-colors">
                @kekesharice on Instagram
              </a>
            </div>
          </div>
        </PageWrapper>
      </footer>
    </div>
  )
}
