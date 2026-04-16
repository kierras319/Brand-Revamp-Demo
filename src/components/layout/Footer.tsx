import Link from "next/link"
import { Mail, Instagram, Music2 } from "lucide-react"
import { PageWrapper } from "./PageWrapper"
import { EmailSignupForm } from "@/components/shared/EmailSignupForm"
import { NAV_LINKS, CONTACT_EMAIL } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

const shopLinks = [
  { label: "Fiction", href: "/shop/fiction" },
  { label: "Writer Resources", href: "/shop/writer-resources" },
  { label: "Reader Experiences", href: "/shop/reader-experiences" },
  { label: "Digital Planners", href: "/shop/digital-planners" },
]

export function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-cream border-t border-brand-wine/20">
      <PageWrapper>
        <div className="py-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-wide hover:text-brand-stone transition-colors">
              Keke Sharice
            </Link>
            <p className="mt-4 text-sm text-brand-stone leading-relaxed max-w-xs">
              Domestic secrets that unravel into madness.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-brand-stone hover:text-brand-cream transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-brand-stone hover:text-brand-cream transition-colors"
              >
                <Music2 className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
                className="text-brand-stone hover:text-brand-cream transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-stone mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-stone hover:text-brand-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-stone mb-5">
              The Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-stone hover:text-brand-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-stone mb-5">
              Join the Darkness
            </h3>
            <p className="text-sm text-brand-stone leading-relaxed mb-4">
              Free stories, writing prompts, and new release news — direct to your inbox.
            </p>
            <EmailSignupForm variant="inline" theme="dark" />
          </div>
        </div>

        <Separator className="bg-brand-greige/20" />

        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-stone">
          <p>© {new Date().getFullYear()} Keke Sharice. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-brand-cream transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-brand-cream transition-colors">Privacy Policy</Link>
            <span className="text-brand-stone">Terms of Service</span>
          </div>
        </div>
      </PageWrapper>
    </footer>
  )
}
