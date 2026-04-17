import { isTokenValid } from "@/lib/manor-tokens"
import { ManorGame } from "@/components/manor/ManorGame"

interface PageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function ManorPage({ searchParams }: PageProps) {
  const { token } = await searchParams

  if (!token) {
    return <ManorGame token={null} invalidReason="no-token" />
  }

  const valid = isTokenValid(token)
  if (!valid) {
    return <ManorGame token={null} invalidReason="used-or-invalid" />
  }

  return <ManorGame token={token} invalidReason={null} />
}
