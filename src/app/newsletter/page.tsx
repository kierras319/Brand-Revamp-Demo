import type { Metadata } from "next"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { EmailSignupForm } from "@/components/shared/EmailSignupForm"

export const metadata: Metadata = {
  title: "Newsletter — Keke Sharice",
  description: "Join 12,000+ readers who get dark fiction, free stories, and new release news direct from Keke Sharice.",
}

const perks = [
  {
    icon: "📖",
    title: "Free Short Stories",
    description: "Exclusive short fiction you won't find anywhere else — sent to subscribers first.",
  },
  {
    icon: "🔔",
    title: "New Release Alerts",
    description: "Be the first to know when a new book drops, before the public announcement.",
  },
  {
    icon: "✍️",
    title: "Writing Prompts",
    description: "Dark, atmospheric prompts for thriller writers — delivered monthly.",
  },
  {
    icon: "🎁",
    title: "Subscriber-Only Deals",
    description: "Discounts and early access to new shop products, exclusively for the list.",
  },
]

export default function NewsletterPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-charcoal pt-20 pb-16">
        <PageWrapper>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold mb-4">
              The Inner Circle
            </p>
            <h1 className="font-serif text-display-md md:text-display-lg font-semibold text-brand-cream leading-tight">
              Join thousands of readers who get dark fiction delivered to their inbox.
            </h1>
            <div className="w-12 h-px bg-brand-gold/50 mx-auto my-6" />
            <p className="text-brand-stone text-lg leading-relaxed">
              No spam. No corporate nonsense. Just stories, prompts, and new release news — from a writer who takes dark fiction seriously.
            </p>
          </div>
        </PageWrapper>
      </section>

      {/* Perks + form */}
      <section className="bg-brand-parchment py-section">
        <PageWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: what you get */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-brand-cream mb-8">
                What you&rsquo;ll get
              </h2>
              <div className="space-y-6">
                {perks.map((perk) => (
                  <div key={perk.title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-brand-greige border border-white/5 flex items-center justify-center text-lg shrink-0">
                      {perk.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-cream mb-1">{perk.title}</h3>
                      <p className="text-sm text-brand-stone leading-relaxed">{perk.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="mt-10 border-l-2 border-brand-wine/50 pl-5">
                <p className="font-serif italic text-brand-cream/80 text-base leading-relaxed">
                  &ldquo;The newsletter is the best part. Every email feels like getting a letter from the villain in your favorite book.&rdquo;
                </p>
                <footer className="mt-2 text-xs text-brand-stone">
                  @darkfictionlover · Subscriber
                </footer>
              </blockquote>
            </div>

            {/* Right: signup form */}
            <div className="bg-brand-greige rounded-2xl p-10 border border-white/5">
              <h2 className="font-serif text-2xl font-semibold text-brand-cream mb-2">
                Start Reading Free
              </h2>
              <p className="text-brand-stone text-sm mb-8 leading-relaxed">
                Enter your email and get the first chapters of <em className="text-brand-cream">The Silent Hour</em> immediately.
              </p>
              <EmailSignupForm
                variant="stacked"
                theme="dark"
                placeholder="Your email address"
                buttonText="Send Me the Free Chapters"
              />
              <p className="mt-4 text-xs text-brand-stone/60 text-center">
                No spam. Unsubscribe anytime. Your secrets are safe.
              </p>
              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <p className="text-xs text-brand-stone/50 uppercase tracking-widest">
                  Joined by 12,000+ readers
                </p>
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>
    </>
  )
}
