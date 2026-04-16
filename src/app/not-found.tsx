import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/PageWrapper"

export default function NotFound() {
  return (
    <section className="bg-brand-charcoal min-h-[70vh] flex items-center">
      <PageWrapper className="text-center py-24">
        <p className="font-serif text-8xl font-bold text-brand-gold/20 select-none">
          404
        </p>
        <h1 className="font-serif text-display-md font-semibold text-brand-cream mt-4 -mt-4">
          Page Not Found
        </h1>
        <div className="w-16 h-px bg-brand-gold/50 mx-auto my-6" />
        <p className="text-brand-stone text-lg max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for has vanished — like a thriller protagonist who knows too much.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button variant="olive" size="lg" asChild>
            <Link href="/">Return Home</Link>
          </Button>
          <Button variant="cream-outline" size="lg" asChild>
            <Link href="/books">Browse Books</Link>
          </Button>
        </div>
      </PageWrapper>
    </section>
  )
}
