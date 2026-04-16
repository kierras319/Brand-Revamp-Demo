import { PageWrapper } from "@/components/layout/PageWrapper"

export function EditorialStatement() {
  return (
    <section className="bg-brand-parchment py-16 border-t border-white/5">
      <PageWrapper>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold/60 mb-6">
          Keke Sharice
        </p>
        <h2 className="font-serif text-display-md md:text-display-lg lg:text-display-xl font-semibold text-brand-cream leading-tight max-w-5xl text-balance">
          The secrets hiding in your home are the most{" "}
          <em className="text-brand-wine" style={{ fontStyle: "italic" }}>dangerous</em>{" "}
          of all.
        </h2>
        <p className="mt-8 text-brand-stone text-lg leading-relaxed max-w-2xl">
          Keke Sharice writes psychological thrillers about the lies we tell the people closest to us. Dark. Addictive. You won&rsquo;t see the ending coming.
        </p>
      </PageWrapper>
    </section>
  )
}
