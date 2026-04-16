import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { BookGrid } from "@/components/books/BookGrid"
import { getFeaturedBooks } from "@/data/books"

export function FeaturedBooks() {
  const books = getFeaturedBooks().slice(0, 3)

  return (
    <section className="bg-brand-parchment py-section">
      <PageWrapper>
        <SectionHeading
          title="The Latest Reads"
          subtitle="Psychological thrillers crafted for women who love to feel the tension on every page."
          align="center"
          theme="light"
        />

        <BookGrid books={books} columns={3} />

        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-gold hover:text-brand-wine transition-colors underline underline-offset-4"
          >
            View All Books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageWrapper>
    </section>
  )
}
