import Link from "next/link"
import Image from "next/image"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { Button } from "@/components/ui/button"

export function SplitPanels() {
  return (
    <section className="bg-brand-parchment py-section-sm">
      <PageWrapper>
        <div className="flex flex-col gap-4">

          {/* Panel 1: Image left + Wine block right */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden" style={{ minHeight: "340px" }}>
            <div className="relative min-h-[260px] md:min-h-0">
              <Image
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&h=400&fit=crop&q=80"
                alt="New thrillers written for you"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="bg-brand-wine flex flex-col justify-center px-10 py-12 md:px-14">
              <p className="text-brand-cream/60 text-xs font-semibold uppercase tracking-widest mb-4">
                New Releases
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-brand-cream leading-tight text-balance">
                New thrillers written{" "}
                <strong className="font-bold">just for you.</strong>
              </h3>
              <p className="text-brand-cream/70 text-sm leading-relaxed mt-4 mb-6 max-w-xs">
                Domestic psychological fiction that centers complex women doing complicated things. Dark, intimate, and completely un-put-downable.
              </p>
              <Button
                variant="cream-outline"
                size="default"
                className="self-start border-brand-cream/50 text-brand-cream hover:bg-brand-cream/10"
                asChild
              >
                <Link href="/books">See all books</Link>
              </Button>
            </div>
          </div>

          {/* Panel 2: Charcoal block left + Image right */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden" style={{ minHeight: "340px" }}>
            <div className="bg-brand-charcoal flex flex-col justify-center px-10 py-12 md:px-14 order-2 md:order-1">
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-4">
                For Writers
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-brand-cream leading-tight text-balance">
                Dark enough to{" "}
                <strong className="text-brand-gold font-bold">haunt</strong>{" "}
                your readers.
              </h3>
              <p className="text-brand-greige/60 text-sm leading-relaxed mt-4 mb-6 max-w-xs">
                Workbooks, prompt packs, and story bibles for thriller writers who refuse to sand their work down into something safer.
              </p>
              <Button
                variant="olive-outline"
                size="default"
                className="self-start"
                asChild
              >
                <Link href="/shop/writer-resources">Writer Resources</Link>
              </Button>
            </div>
            <div className="relative min-h-[260px] md:min-h-0 order-1 md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=700&h=400&fit=crop&q=80"
                alt="Resources for thriller writers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-charcoal/20 hidden md:block" />
            </div>
          </div>

        </div>
      </PageWrapper>
    </section>
  )
}
