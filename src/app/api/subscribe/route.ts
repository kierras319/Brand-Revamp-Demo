import { NextRequest, NextResponse } from "next/server"
import { subscribeSchema } from "@/lib/validations"

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

    // MailerLite integration (configure MAILERLITE_API_KEY in .env.local)
    const apiKey = process.env.MAILERLITE_API_KEY
    const groupId = process.env.MAILERLITE_GROUP_ID

    if (apiKey && groupId) {
      const res = await fetch(
        `https://connect.mailerlite.com/api/subscribers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            email,
            groups: [groupId],
          }),
        }
      )

      if (!res.ok && res.status !== 409) {
        const data = await res.json()
        console.error("MailerLite error:", data)
        return NextResponse.json(
          { error: "Subscription failed. Please try again." },
          { status: 500 }
        )
      }
    }

    // Log to console in development when no API key is configured
    if (!apiKey) {
      console.log(`[Subscribe] New subscriber: ${email}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
