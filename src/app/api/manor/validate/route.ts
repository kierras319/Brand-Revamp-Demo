import { NextRequest, NextResponse } from "next/server"
import { isTokenValid } from "@/lib/manor-tokens"

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  if (!token) return NextResponse.json({ valid: false })
  return NextResponse.json({ valid: isTokenValid(token) })
}
