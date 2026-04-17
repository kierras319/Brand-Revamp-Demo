import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { createToken } from "@/lib/manor-tokens"

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name } = schema.parse(body)

    const token = createToken(email, name)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const accessUrl = `${siteUrl}/the-manor?token=${token}`

    // TODO: add email delivery — install resend (npm install resend) and set RESEND_API_KEY
    // Email template available in buildEmailHtml() below
    const emailSent = false
    console.log(`[Manor] Access link for ${name} <${email}>: ${accessUrl}`)

    return NextResponse.json({ success: true, token, accessUrl, emailSent })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Invalid email or name" }, { status: 400 })
    }
    console.error("[Manor] issue error:", err)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}

function buildEmailHtml(name: string, accessUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Your Access to The Manor</title>
</head>
<body style="margin:0;padding:0;background:#07070f;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:48px 24px;">
    <tr>
      <td style="text-align:center;padding-bottom:28px;">
        <p style="font-size:24px;color:#c9a84c;margin:0 0 12px;">✦</p>
        <h1 style="font-family:Georgia,serif;font-size:36px;font-weight:700;color:#ecdece;letter-spacing:0.15em;text-transform:uppercase;margin:0 0 10px;">THE MANOR</h1>
        <p style="font-size:13px;color:#c9a84c;letter-spacing:0.25em;text-transform:uppercase;margin:0;">Blackthorn Estate &nbsp;·&nbsp; An Immersive Mystery</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 0 32px;">
        <hr style="border:none;border-top:1px solid rgba(201,168,76,0.2);margin:0 0 28px;" />
        <p style="font-size:18px;color:#ecdece;line-height:1.8;margin:0 0 16px;">Dear ${name},</p>
        <p style="font-size:16px;color:#a09080;line-height:1.85;margin:0 0 14px;">You have been summoned to Blackthorn Manor.</p>
        <p style="font-size:16px;color:#a09080;line-height:1.85;margin:0 0 14px;">Old friends. Old secrets. One of them is lying. Your one-time access link awaits below — once you enter, the door locks behind you.</p>
        <p style="font-size:16px;color:#a09080;line-height:1.85;margin:0 0 28px;">Can you find the truth before the truth finds you?</p>
        <div style="text-align:center;margin:0 0 32px;">
          <a href="${accessUrl}" style="display:inline-block;padding:16px 48px;border:1px solid #c9a84c;color:#c9a84c;font-family:Georgia,serif;font-size:15px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;border-radius:3px;">Enter the Manor</a>
        </div>
        <p style="font-size:13px;color:#5c5040;line-height:1.6;margin:0;font-style:italic;">⚠ This is a one-time link. Once you begin your playthrough, the link expires. Save this email if you plan to play later.</p>
      </td>
    </tr>
    <tr>
      <td style="padding-top:24px;border-top:1px solid rgba(201,168,76,0.1);text-align:center;">
        <p style="font-size:11px;color:#5c5040;letter-spacing:0.1em;text-transform:uppercase;margin:0;">Keke Writes Thrillers &nbsp;·&nbsp; Digital Experience</p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
