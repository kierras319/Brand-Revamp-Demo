"use client"

import { usePathname } from "next/navigation"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { NewsletterModal } from "@/components/shared/NewsletterModal"

const BARE_ROUTES = ["/links", "/booktok"]

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const bare = BARE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))

  return (
    <>
      {!bare && <Header />}
      <main>{children}</main>
      {!bare && <Footer />}
      {!bare && <NewsletterModal />}
    </>
  )
}
