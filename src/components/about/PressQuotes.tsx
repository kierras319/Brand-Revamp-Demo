const quotes = [
  {
    text: "Gripping, atmospheric, and impossible to put down. The Silent Hour is everything I want from a psychological thriller.",
    source: "★★★★★ — Goodreads",
  },
  {
    text: "The writing is precise and the tension never lets up. A debut that reads like a veteran.",
    source: "Verified Reviewer, Amazon",
  },
  {
    text: "The kind of dark, immersive fiction that makes you miss your stop on the commute and not care one bit.",
    source: "Newsletter Subscriber",
  },
]

export function PressQuotes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {quotes.map((q, i) => (
        <blockquote
          key={i}
          className="flex flex-col bg-brand-greige rounded-card p-8 border-l-2 border-brand-gold/50"
        >
          <p className="font-serif italic text-brand-cream/90 leading-relaxed flex-1">
            &ldquo;{q.text}&rdquo;
          </p>
          <footer className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-gold/70">
            {q.source}
          </footer>
        </blockquote>
      ))}
    </div>
  )
}
