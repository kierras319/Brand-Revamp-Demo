import { PageWrapper } from "@/components/layout/PageWrapper"
import { EmailSignupForm } from "@/components/shared/EmailSignupForm"

export function EmailSignupBanner() {
  return (
    <section className="bg-brand-wine/10 border-y border-brand-wine/20 py-section-sm">
      <PageWrapper>
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold mb-4">
              Free for subscribers
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight">
              Start Reading Free —<br className="hidden sm:inline" /> No Strings Attached.
            </h2>
            <p className="mt-4 text-brand-stone text-base leading-relaxed max-w-lg">
              Get the first chapters of <em className="text-brand-cream">The Silent Hour</em> delivered straight to your inbox. Join 12,000+ readers who get dark fiction first.
            </p>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-auto lg:min-w-[400px]">
            <EmailSignupForm
              variant="stacked"
              theme="dark"
              placeholder="Your email address"
              buttonText="Send Me the Free Chapters"
            />
            <p className="mt-3 text-xs text-brand-stone/60 text-center lg:text-left">
              No spam. Unsubscribe anytime. Your secrets are safe.
            </p>
          </div>
        </div>
      </PageWrapper>
    </section>
  )
}
