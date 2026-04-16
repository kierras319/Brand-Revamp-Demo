"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/PageWrapper"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="bg-brand-charcoal min-h-[70vh] flex items-center">
      <PageWrapper className="text-center py-24">
        <h1 className="font-serif text-display-md font-semibold text-brand-cream">
          Something Went Wrong
        </h1>
        <div className="w-16 h-px bg-brand-gold/50 mx-auto my-6" />
        <p className="text-brand-greige/70 text-lg max-w-md mx-auto mb-10">
          A plot twist we didn&apos;t plan for. Try again, or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="olive" size="lg" onClick={reset}>
            Try Again
          </Button>
          <Button variant="cream-outline" size="lg" asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </PageWrapper>
    </section>
  )
}
