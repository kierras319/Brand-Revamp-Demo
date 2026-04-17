import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/PageWrapper"

export function SplitPromo() {
  return (
    <section className="bg-brand-charcoal py-section">
      <PageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=530&fit=crop&q=80"
              alt="Free stories from Keke Sharice"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/50 to-transparent" />
          </div>

          {/* Right: text */}
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Free Short Story</p>
            <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight text-balance">
              A mind can forget — but the truth remembers.
            </h2>
            <p className="text-brand-stone leading-relaxed text-base max-w-md">
              Get <em className="text-brand-cream not-italic font-medium">The Last Witness</em> free. A twisty psychological thriller about memory manipulation, identity, and survival — delivered straight to your inbox.
            </p>
            <Button variant="olive" size="lg" asChild>
              <Link href="/free-story">Get the Free Story</Link>
            </Button>
          </div>

        </div>
      </PageWrapper>
    </section>
  )
}
