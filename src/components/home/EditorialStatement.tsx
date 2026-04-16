import { PageWrapper } from "@/components/layout/PageWrapper"

export function EditorialStatement() {
  return (
    <section className="bg-brand-parchment py-16 border-t border-brand-greige/50">
      <PageWrapper>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-charcoal/40 mb-6">
          Why Keke Writes Thrillers
        </p>
        <h2 className="font-serif text-display-md md:text-display-lg lg:text-display-xl font-semibold text-brand-charcoal leading-tight max-w-5xl text-balance">
          The thrillers you{" "}
          <em>hoped</em>{" "}
          would unravel you.{" "}
          The ones you{" "}
          <em>feared</em>{" "}
          they would.
        </h2>
      </PageWrapper>
    </section>
  )
}
