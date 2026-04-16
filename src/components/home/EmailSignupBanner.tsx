import { PageWrapper } from "@/components/layout/PageWrapper"
import { EmailSignupForm } from "@/components/shared/EmailSignupForm"
import { Gift } from "lucide-react"

export function EmailSignupBanner() {
  return (
    <section className="bg-brand-charcoal py-section-sm">
      <PageWrapper>
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Copy */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <Gift className="h-5 w-5 text-brand-gold" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                Free for subscribers
              </span>
            </div>
            <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight">
              Get Your First Story Free
            </h2>
            <p className="mt-4 text-brand-greige/80 text-base leading-relaxed max-w-lg">
              Join 12,000+ readers who receive exclusive short stories, writing prompts, and new release news — delivered direct to your inbox.
            </p>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-auto lg:min-w-[400px]">
            <EmailSignupForm
              variant="stacked"
              theme="dark"
              placeholder="Enter your email address"
              buttonText="Send Me the Story"
            />
            <p className="mt-3 text-xs text-brand-greige/50 text-center lg:text-left">
              No spam. Unsubscribe any time.
            </p>
          </div>
        </div>
      </PageWrapper>
    </section>
  )
}
