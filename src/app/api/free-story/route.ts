import { NextRequest, NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"
import { subscribeSchema } from "@/lib/validations"

const EPUB_DOWNLOAD_URL = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://velvetdaggerfiction.store"}/downloads/The-Last-Witness-Generic.epub`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = subscribeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid email" },
        { status: 400 }
      )
    }

    const { email } = parsed.data
    const recaptchaToken = typeof body.recaptchaToken === "string" ? body.recaptchaToken : null

    // reCAPTCHA verification
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (recaptchaSecret) {
      if (!recaptchaToken) {
        return NextResponse.json({ error: "Bot verification failed." }, { status: 400 })
      }
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      })
      const verifyData = await verifyRes.json()
      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json({ error: "Bot verification failed. Please try again." }, { status: 400 })
      }
    }

    // Subscribe to MailerLite
    const apiKey = process.env.MAILERLITE_API_KEY
    const groupId = process.env.MAILERLITE_GROUP_ID
    if (apiKey && groupId) {
      const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email, groups: [groupId] }),
      })
      if (!mlRes.ok && mlRes.status !== 409) {
        console.error("MailerLite error:", await mlRes.json())
      }
    }

    // Send EPUB delivery email via Resend
    const resendKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.FROM_EMAIL ?? "onboarding@resend.dev"
    if (resendKey) {
      let html = ""
      try {
        html = readFileSync(
          join(process.cwd(), "src/emails/the-last-witness-delivery.html"),
          "utf-8"
        ).replace("{{EPUB_DOWNLOAD_URL}}", EPUB_DOWNLOAD_URL)
      } catch {
        html = `<p>Your free story is ready. <a href="${EPUB_DOWNLOAD_URL}">Download The Last Witness</a></p>`
      }

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: email,
          subject: "Your free story is ready — The Last Witness",
          html,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Free story error:", error)
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 })
  }
}
