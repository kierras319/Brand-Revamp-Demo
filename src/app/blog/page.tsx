import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { BlogIndexClient } from "@/components/blog/BlogIndexClient"

export const metadata: Metadata = {
  title: "The Reading Room",
  description:
    "Writing craft, book news, reader life, and behind-the-story insights from a psychological thriller author.",
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="The Reading Room"
        subtitle="Writing craft, book news, reader life, and what happens behind the final draft."
        backgroundVariant="charcoal"
      />

      <section className="bg-brand-parchment py-section">
        <PageWrapper>
          <BlogIndexClient />
        </PageWrapper>
      </section>
    </>
  )
}
