import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/PageWrapper"

const steps = [
  {
    number: "01",
    title: "Pick what haunts you.",
    description: "Browse psychological thrillers, writer resources, or reader kits — curated for the dark fiction obsessive.",
  },
  {
    number: "02",
    title: "Download instantly.",
    description: "Every digital product lands in your inbox within seconds. No waiting. No shipping. Just the story.",
  },
  {
    number: "03",
    title: "Read in the dark.",
    description: "That's where all the best thrillers are meant to be experienced. We'll never judge your midnight habits.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-brand-parchment py-section border-t border-brand-greige/50">
      <PageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-charcoal/40 mb-4">
              How It Works
            </p>
            <h2 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-charcoal leading-tight text-balance">
              Every book is dark, immersive, and{" "}
              <span className="text-brand-wine italic">impossible to put down.</span>
            </h2>
            <Button variant="olive" size="lg" className="mt-8" asChild>
              <Link href="/books">Browse the Books</Link>
            </Button>
          </div>

          {/* RIGHT: numbered steps */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <div key={step.number}>
                {i > 0 && <div className="h-px bg-brand-greige/60 my-6" />}
                <div className="flex gap-6 items-start">
                  <span className="font-serif text-3xl font-bold text-brand-gold leading-none shrink-0 w-10">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-2">
                      {step.title}
                    </h3>
                    <p className="text-brand-charcoal/60 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </PageWrapper>
    </section>
  )
}
