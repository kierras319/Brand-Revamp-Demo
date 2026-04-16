import { Skeleton } from "@/components/ui/skeleton"
import { PageWrapper } from "@/components/layout/PageWrapper"

export default function Loading() {
  return (
    <div className="bg-brand-parchment min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-brand-charcoal py-28">
        <PageWrapper className="text-center space-y-4">
          <Skeleton className="h-4 w-32 mx-auto bg-white/10" />
          <Skeleton className="h-16 w-full max-w-2xl mx-auto bg-white/10" />
          <Skeleton className="h-6 w-full max-w-lg mx-auto bg-white/10" />
        </PageWrapper>
      </div>

      {/* Content skeleton */}
      <div className="py-section">
        <PageWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-card overflow-hidden">
                <Skeleton className="aspect-[4/5] w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </PageWrapper>
      </div>
    </div>
  )
}
