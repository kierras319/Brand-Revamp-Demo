import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { AnimatedDivider } from "@/components/shared/AnimatedDivider"
import { BookGrid } from "@/components/books/BookGrid"
import { ComingSoonCard } from "@/components/books/ComingSoonCard"
import { getAvailableBooks, getComingSoonBooks } from "@/data/books"

export const metadata: Metadata = {
  title: "Books",
  description:
    "Dark psychological thrillers and domestic suspense. Browse current titles and upcoming releases.",
}

export default function BooksPage() {
  const available = getAvailableBooks()
  const comingSoon = getComingSoonBooks()

  return (
    <>
      <PageHero
        title="The Shelf"
        subtitle="Every book here was written to be read in one sitting. You've been warned."
        backgroundVariant="charcoal"
      />

      {/* Available titles */}
      <section className="bg-brand-parchment py-section">
        <PageWrapper>
          <SectionHeading
            title="Current Titles"
            subtitle="Available now in ebook, paperback, and audiobook."
            align="left"
            theme="light"
          />
          <BookGrid books={available} columns={3} />
        </PageWrapper>
      </section>

      {/* Coming soon */}
      {comingSoon.length > 0 && (
        <section className="bg-brand-greige/30 py-section">
          <PageWrapper>
            <AnimatedDivider ornament />
            <SectionHeading
              title="Coming Soon"
              subtitle="The next reads in the dark. Sign up to be the first to know."
              align="left"
              theme="light"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {comingSoon.map((book) => (
                <ComingSoonCard key={book.id} book={book} />
              ))}
            </div>
          </PageWrapper>
        </section>
      )}
    </>
  )
}
