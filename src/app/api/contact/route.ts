import { NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid form data" },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = parsed.data

    // Log to console in development — replace with Resend/SendGrid in production
    console.log(`[Contact Form]`)
    console.log(`From: ${name} <${email}>`)
    console.log(`Subject: ${subject}`)
    console.log(`Message: ${message}`)

    // Resend integration (configure RESEND_API_KEY in .env.local)
    const resendKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_TO_EMAIL ?? "hello@escapistfiction.com"

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "The Escapist Contact Form <noreply@escapistfiction.com>",
          to: [contactEmail],
          subject: `Contact: ${subject} — from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
          reply_to: email,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        console.error("Resend error:", data)
        return NextResponse.json(
          { error: "Failed to send message. Please try again." },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
