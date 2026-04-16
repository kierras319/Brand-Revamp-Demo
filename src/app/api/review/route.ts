import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const reviewSchema = z.object({
  productSlug: z.string().min(1),
  productTitle: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  name: z.string().min(1).max(100),
  text: z.string().min(20).max(2000),
  recommended: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = reviewSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid submission" },
        { status: 400 }
      )
    }

    const { productSlug, productTitle, rating, name, text, recommended } = parsed.data
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating)

    // Email notification via Resend (configure RESEND_API_KEY in .env.local)
    const resendKey = process.env.RESEND_API_KEY
    const notifyEmail = process.env.CONTACT_EMAIL ?? "kierras319@gmail.com"

    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "noreply@kekewritesthrillers.com",
          to: notifyEmail,
          subject: `New Review: ${productTitle} — ${stars}`,
          html: `
            <h2>New Review Submitted</h2>
            <p><strong>Product:</strong> ${productTitle} (${productSlug})</p>
            <p><strong>Reviewer:</strong> ${name}</p>
            <p><strong>Rating:</strong> ${stars} (${rating}/5)</p>
            <p><strong>Recommends:</strong> ${recommended ? "Yes" : "No"}</p>
            <hr />
            <p>${text}</p>
            <hr />
            <p style="font-size:12px;color:#999;">Add this review to src/data/reviews.ts to publish it.</p>
          `,
        }),
      })
    } else {
      // Log to console in development
      console.log("[Review submitted]", { productSlug, rating, name, text, recommended })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Review submission error:", error)
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 })
  }
}
