import type { Metadata } from "next"
import Script from "next/script"
import { playfair, raleway } from "@/lib/fonts"
import { ClientShell } from "@/components/layout/ClientShell"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/contexts/CartContext"
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
        <CartProvider>
          <ClientShell>{children}</ClientShell>
          <Toaster />
        </CartProvider>
        <Script
          src="https://payhip.com/payhip.js"
          strategy="afterInteractive"
        />
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
