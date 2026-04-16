"use client"

import { useState } from "react"
import { Loader2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface WriteReviewModalProps {
  productSlug: string
  productTitle: string
}

export function WriteReviewModal({ productSlug, productTitle }: WriteReviewModalProps) {
  const [open, setOpen] = useState(false)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [rating, setRating] = useState(0)
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [recommended, setRecommended] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const activeStar = hoveredStar || rating

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) { setError("Please select a star rating."); return }
    if (!name.trim()) { setError("Please enter your name."); return }
    if (text.trim().length < 20) { setError("Review must be at least 20 characters."); return }

    setError("")
    setIsLoading(true)
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, productTitle, rating, name, text, recommended }),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenChange(val: boolean) {
    setOpen(val)
    if (!val) {
      setRating(0)
      setHoveredStar(0)
      setName("")
      setText("")
      setRecommended(true)
      setSubmitted(false)
      setError("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-sm text-brand-gold hover:text-brand-cream underline underline-offset-2 transition-colors"
        >
          Write A Review
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-brand-greige border-white/10">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-brand-cream">
            Write a Review
          </DialogTitle>
          <p className="text-xs text-brand-stone mt-1">{productTitle}</p>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="text-3xl text-brand-gold">✓</div>
            <p className="font-serif text-lg text-brand-cream">Thank you for your review!</p>
            <p className="text-sm text-brand-stone max-w-xs mx-auto">
              Your review has been submitted and will appear once approved. We appreciate you taking the time to share your thoughts.
            </p>
            <Button variant="olive" size="sm" onClick={() => handleOpenChange(false)} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-2">

            <div>
              <Label className="text-sm font-semibold text-brand-cream mb-2 block">
                Overall Rating <span className="text-brand-wine">*</span>
              </Label>
              <div className="flex gap-1" onMouseLeave={() => setHoveredStar(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredStar(star)}
                    onClick={() => setRating(star)}
                    className="p-0.5 transition-transform duration-100 hover:scale-110"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className="w-8 h-8 transition-colors duration-100"
                      fill={star <= activeStar ? "#D4AF37" : "none"}
                      stroke={star <= activeStar ? "#D4AF37" : "#A0A0A0"}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-xs text-brand-stone mt-1">
                  {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="review-name" className="text-sm font-semibold text-brand-cream mb-1.5 block">
                Your Name <span className="text-brand-wine">*</span>
              </Label>
              <Input
                id="review-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name or nickname"
                className="bg-brand-parchment border-white/15 text-brand-cream placeholder:text-brand-stone focus-visible:ring-brand-gold"
              />
            </div>

            <div>
              <Label htmlFor="review-text" className="text-sm font-semibold text-brand-cream mb-1.5 block">
                Your Review <span className="text-brand-wine">*</span>
              </Label>
              <Textarea
                id="review-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What did you love about it? Would you recommend it?"
                rows={4}
                className="bg-brand-parchment border-white/15 text-brand-cream placeholder:text-brand-stone focus-visible:ring-brand-gold resize-none"
              />
              <p className="text-xs text-brand-stone mt-1">{text.length} characters (minimum 20)</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="review-recommend"
                checked={recommended}
                onChange={(e) => setRecommended(e.target.checked)}
                className="w-4 h-4 accent-brand-wine"
              />
              <Label htmlFor="review-recommend" className="text-sm text-brand-stone cursor-pointer">
                I recommend this product
              </Label>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <div className="flex justify-end gap-3 pt-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                className="text-brand-stone hover:text-brand-cream"
              >
                Cancel
              </Button>
              <Button type="submit" variant="olive" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit Review"}
              </Button>
            </div>

          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
