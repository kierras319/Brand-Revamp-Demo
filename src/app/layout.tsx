import type { Metadata } from "next"
import { playfair, raleway } from "@/lib/fonts"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/toaster"
import { NewsletterModal } from "@/components/shared/NewsletterModal"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Keke Writes Thrillers — Domestic Psychological Thrillers",
    template: "%s | Keke Writes Thrillers",
  },
  description:
    "Domestic psychological thrillers that center complex women navigating grief, secrets, trauma, and legacy. For readers who want to feel something real.",
  keywords: [
    "psychological thriller",
    "domestic thriller",
    "dark fiction",
    "thriller author",
    "Keke writes thrillers",
    "women's fiction",
    "complex women",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Keke Writes Thrillers",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${raleway.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <NewsletterModal />
      </body>
    </html>
  )
}
