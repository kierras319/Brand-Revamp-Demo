import { PageWrapper } from "@/components/layout/PageWrapper"

const testimonials = [
  {
    id: "1",
    quote: "I read The Silent Hour in one sitting. The tension never lets up and the ending destroyed me in the best possible way. This is the thriller I've been waiting for.",
    author: "@TiffanyReads_",
    source: "Goodreads",
    stars: 5,
  },
  {
    id: "2",
    quote: "I don't usually write reviews but I had to. The way Keke builds dread through the most ordinary moments — a conversation at dinner, a look across a room — is genuinely unsettling. Finished it at 2am and couldn't sleep.",
    author: "Sarah M.",
    source: "Amazon Verified Purchase",
    stars: 5,
  },
  {
    id: "3",
    quote: "Domestic psychological thrillers hit different when you recognize your own home in them. This one got under my skin and stayed there. Absolutely recommended.",
    author: "Jenna L.",
    source: "Goodreads",
    stars: 5,
  },
  {
    id: "4",
    quote: "The writing workbook completely transformed how I plot my thrillers. I've taken multiple craft courses and nothing has gotten me this deep into the work. Worth every penny.",
    author: "Claire D.",
    source: "Verified Buyer",
    stars: 5,
  },
  {
    id: "5",
    quote: "I followed Keke on TikTok for months before buying — finally caved and read three of her short stories in the same night. The free library alone is worth signing up for. Hooked.",
    author: "@darkfictionlover",
    source: "Newsletter Subscriber",
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-brand-gold text-sm">★</span>
      ))}
    </div>
  )
}

export function TestimonialStrip() {
  return (
    <section className="bg-brand-parchment py-section">
      <PageWrapper>
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold mb-3">
            Social Proof
          </p>
          <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight">
            Readers Are Obsessed
          </h2>
          <div className="w-12 h-px bg-brand-gold/50 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <blockquote
              key={t.id}
              className="flex flex-col bg-brand-greige rounded-card p-8 border border-white/5 hover:border-brand-gold/20 transition-colors duration-300"
            >
              <StarRating count={t.stars} />
              <p className="font-serif text-base italic text-brand-cream/85 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-wine/20 border border-brand-wine/30 flex items-center justify-center text-xs font-semibold text-brand-gold shrink-0">
                  {t.author[0] === "@" ? t.author[1].toUpperCase() : t.author[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-cream">{t.author}</p>
                  <p className="text-xs text-brand-stone">{t.source}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Bottom row — 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-2xl lg:max-w-none lg:grid-cols-2 mx-auto lg:mx-0 lg:w-2/3 lg:ml-auto lg:mr-auto">
          {testimonials.slice(3).map((t) => (
            <blockquote
              key={t.id}
              className="flex flex-col bg-brand-greige rounded-card p-8 border border-white/5 hover:border-brand-gold/20 transition-colors duration-300"
            >
              <StarRating count={t.stars} />
              <p className="font-serif text-base italic text-brand-cream/85 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-wine/20 border border-brand-wine/30 flex items-center justify-center text-xs font-semibold text-brand-gold shrink-0">
                  {t.author[0] === "@" ? t.author[1].toUpperCase() : t.author[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-cream">{t.author}</p>
                  <p className="text-xs text-brand-stone">{t.source}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </PageWrapper>
    </section>
  )
}
