import { NextRequest, NextResponse } from "next/server"
import { consumeToken } from "@/lib/manor-tokens"

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()
    if (!token) {
      return NextResponse.json({ success: false, error: "Token required" }, { status: 400 })
    }
    const record = consumeToken(token)
    if (!record) {
      return NextResponse.json(
        { success: false, error: "Token already used or not found" },
        { status: 410 }
      )
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}
