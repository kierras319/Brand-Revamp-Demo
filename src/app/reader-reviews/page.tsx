import type { Metadata } from "next"
import Link from "next/link"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { Button } from "@/components/ui/button"
import { EmailSignupBanner } from "@/components/home/EmailSignupBanner"

export const metadata: Metadata = {
  title: "Reader Reviews — Keke Sharice",
  description: "See what readers are saying about Keke Sharice's psychological thrillers. Real reviews from Goodreads, Amazon, and BookTok.",
}

const reviews = [
  {
    id: "1",
    book: "The Silent Hour",
    quote: "I read The Silent Hour in one sitting. The tension never lets up and the ending destroyed me in the best possible way. This is the thriller I've been waiting for — domestic, psychological, and deeply uncomfortable in all the right ways.",
    author: "@TiffanyReads_",
    source: "Goodreads",
    stars: 5,
  },
  {
    id: "2",
    book: "The Silent Hour",
    quote: "I don't usually write reviews but I had to. The way Keke builds dread through the most ordinary moments — a conversation at dinner, a look across a room — is genuinely unsettling. Finished it at 2am and couldn't sleep.",
    author: "Sarah M.",
    source: "Amazon Verified Purchase",
    stars: 5,
  },
  {
    id: "3",
    book: "What We Buried",
    quote: "Domestic psychological thrillers hit different when you recognize your own home in them. This one got under my skin and stayed there. I keep thinking about the ending.",
    author: "Jenna L.",
    source: "Goodreads",
    stars: 5,
  },
  {
    id: "4",
    book: "What We Buried",
    quote: "Every page felt like I was holding my breath. The unreliable narrator is done so well — I had no idea who to trust and that's exactly what a thriller should do. Absolutely brilliant.",
    author: "Monica R.",
    source: "Goodreads",
    stars: 5,
  },
  {
    id: "5",
    book: "Beneath the Surface",
    quote: "I've read a lot of psychological thrillers and most follow a formula. This one doesn't. Keke Sharice writes with such intimacy — you're inside the character's fear, not just watching from outside.",
    author: "Claire D.",
    source: "Amazon Verified Purchase",
    stars: 5,
  },
  {
    id: "6",
    book: "The Last Witness",
    quote: "I followed Keke on TikTok for months before getting the free story. Stayed up until 3am finishing it. Hooked from the first page — immediately bought everything else.",
    author: "@darkfictionlover",
    source: "Newsletter Subscriber",
    stars: 5,
  },
  {
    id: "7",
    book: "The Silent Hour",
    quote: "My book club picked this and we could not stop talking. We were all convinced the other character did it for completely different reasons until the last 20 pages. Perfect book club thriller.",
    author: "BookClub with Brianna",
    source: "Goodreads",
    stars: 5,
  },
  {
    id: "8",
    book: "What We Buried",
    quote: "Had to put this down three times because the tension was making my chest tight. That's a compliment. When a book does that, you know it's working.",
    author: "@readinginthedark_",
    source: "BookTok",
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-brand-gold">★</span>
      ))}
    </div>
  )
}

export default function ReaderReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-charcoal pt-20 pb-16">
        <PageWrapper>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold mb-4">
              Social Proof
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg font-semibold text-brand-cream leading-tight">
              Readers Are Obsessed
            </h1>
            <div className="w-12 h-px bg-brand-gold/50 mx-auto mt-5 mb-6" />
            <p className="text-brand-stone text-lg leading-relaxed">
              Real reviews from real readers on Goodreads, Amazon, and BookTok. No editorial spin.
            </p>
          </div>
        </PageWrapper>
      </section>

      {/* Reviews grid */}
      <section className="bg-brand-parchment py-section">
        <PageWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <blockquote
                key={r.id}
                className="flex flex-col bg-brand-greige rounded-card p-8 border border-white/5 hover:border-brand-gold/20 transition-colors duration-300"
              >
                <StarRating count={r.stars} />
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-wine mb-3">
                  {r.book}
                </p>
                <p className="font-serif text-base italic text-brand-cream/85 leading-relaxed flex-1">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-wine/20 border border-brand-wine/30 flex items-center justify-center text-xs font-semibold text-brand-gold shrink-0">
                    {r.author[0] === "@" ? r.author[1].toUpperCase() : r.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brand-cream">{r.author}</p>
                    <p className="text-xs text-brand-stone">{r.source}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-brand-stone mb-6">Ready to find your next obsession?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="olive" size="lg" asChild>
                <Link href="/free-chapter">Read First Chapter Free</Link>
              </Button>
              <Button variant="cream-outline" size="lg" asChild>
                <Link href="/books">Browse All Books</Link>
              </Button>
            </div>
          </div>
        </PageWrapper>
      </section>

      <EmailSignupBanner />
    </>
  )
}
