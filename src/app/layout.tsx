import type { Metadata } from "next"
import { playfair, raleway } from "@/lib/fonts"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Toaster } from "@/components/ui/toaster"
import { NewsletterModal } from "@/components/shared/NewsletterModal"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Keke Sharice — Domestic Psychological Thrillers",
    template: "%s | Keke Sharice",
  },
  description:
    "Keke Sharice writes domestic psychological thrillers that will keep you up all night. Download a free chapter and start your next obsession.",
  keywords: [
    "psychological thriller",
    "domestic thriller",
    "dark fiction",
    "Keke Sharice",
    "thriller author",
    "women's fiction",
    "unreliable narrator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Keke Sharice",
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
