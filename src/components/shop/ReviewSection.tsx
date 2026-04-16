import type { Review } from "@/lib/types"
import { getAverageRating, getRatingSnapshot, getRecommendPercent } from "@/data/reviews"
import { WriteReviewModal } from "./WriteReviewModal"

export function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const sz = size === "lg" ? "w-5 h-5" : "w-4 h-4"
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={sz} viewBox="0 0 20 20"
          fill={star <= rating ? "#D4AF37" : "none"}
          stroke={star <= rating ? "#D4AF37" : "#A0A0A0"}
          strokeWidth="1.5"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  return (
    <div className="py-6 border-b border-white/8 last:border-0">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <StarRating rating={review.rating} />
          {review.verified && (
            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">
              Verified Purchase
            </span>
          )}
        </div>
        <span className="text-xs text-brand-stone shrink-0">{formattedDate}</span>
      </div>
      <p className="font-semibold text-sm text-brand-cream mb-1">{review.author}</p>
      <p className="text-brand-stone leading-relaxed text-sm">{review.text}</p>
      {review.recommended && (
        <p className="mt-3 text-xs text-brand-gold font-semibold">✓ Recommends this product</p>
      )}
    </div>
  )
}

interface ReviewSectionProps {
  reviews: Review[]
  slug: string
  title: string
}

export function ReviewSection({ reviews, slug, title }: ReviewSectionProps) {
  const average = getAverageRating(reviews)
  const rounded = Math.round(average * 10) / 10
  const snapshot = getRatingSnapshot(reviews)
  const recommendPct = getRecommendPercent(reviews)
  const maxCount = Math.max(...Object.values(snapshot), 1)

  return (
    <section className="bg-brand-parchment py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-5 mb-10">
          <div className="flex-1 h-px bg-white/10" />
          <h2 className="font-serif text-display-sm font-semibold text-brand-cream whitespace-nowrap">
            Customer Reviews
          </h2>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {reviews.length > 0 && (
          <div className="bg-brand-greige border border-white/5 rounded-card p-5 mb-8">
            <div className="flex items-center gap-3 mb-1">
              <StarRating rating={Math.round(average)} size="lg" />
              <span className="font-serif text-2xl font-semibold text-brand-cream">{rounded}</span>
              <span className="text-sm text-brand-stone">{reviews.length} Reviews</span>
            </div>
            <p className="text-sm text-brand-stone">
              {recommendPct}% of reviewers recommend this product
            </p>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="font-semibold text-sm text-brand-cream uppercase tracking-widest mb-1">
                Rating Snapshot
              </h3>
              <p className="text-xs text-brand-stone mb-4">Select a row to filter reviews</p>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = snapshot[star] ?? 0
                  const pct = (count / maxCount) * 100
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-brand-stone w-8 shrink-0">{star} ★</span>
                      <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-gold rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-brand-stone w-4 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-brand-cream uppercase tracking-widest mb-4">
                Average Customer Ratings
              </h3>
              <div className="flex items-center gap-4 py-3 border-b border-white/10">
                <span className="text-sm text-brand-stone w-16">Overall</span>
                <StarRating rating={Math.round(average)} />
                <span className="text-sm font-semibold text-brand-cream">{rounded}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-stone">
            Reviews {reviews.length > 0 && `(${reviews.length})`}
          </h3>
          <WriteReviewModal productSlug={slug} productTitle={title} />
        </div>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="py-10 text-center border-t border-white/10">
            <p className="text-brand-stone text-sm mb-3">No reviews yet — be the first.</p>
          </div>
        )}

      </div>
    </section>
  )
}
