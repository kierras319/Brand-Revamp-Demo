import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/PageWrapper"

export function SplitPromo() {
  return (
    <section className="bg-brand-parchment py-section">
      <PageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=530&fit=crop&q=80"
              alt="Free stories from Keke Writes Thrillers"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent" />
          </div>

          {/* Right: text */}
          <div className="space-y-5">
            <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-charcoal leading-tight text-balance">
              Your next obsession is waiting — and it&rsquo;s free.
            </h2>
            <p className="text-brand-charcoal/65 leading-relaxed text-base max-w-md">
              Short stories, first chapters, writing prompts, and printable reading trackers. Explore the free library — no credit card, no catch.
            </p>
            <Button variant="olive" size="lg" asChild>
              <Link href="/free-library">Explore the Free Library</Link>
            </Button>
          </div>

        </div>
      </PageWrapper>
    </section>
  )
}
