"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./MobileMenu"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/CartContext"

export function Header() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1C1C1C] backdrop-blur-md border-b border-brand-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Keke Writes Thrillers — Home"
          >
            <Image
              src="/images/logo.png"
              alt="Keke Writes Thrillers"
              width={48}
              height={48}
              className="rounded-sm object-contain shrink-0"
              priority
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg font-semibold text-brand-gold tracking-wider leading-tight group-hover:text-brand-gold/80 transition-colors duration-200">
                Keke Sharice
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-stone/80 leading-tight">
                Domestic Psychological Thriller Author
              </span>
            </div>
          </Link>

          {/* Thin gold center rule — decorative, desktop only */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 h-5 w-px bg-brand-gold/20" aria-hidden />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0" aria-label="Main navigation">
            {NAV_LINKS.filter((l) => l.label !== "Home").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2.5 py-2 text-[10px] font-semibold uppercase tracking-[0.07em] transition-colors duration-200 relative group whitespace-nowrap",
                  pathname === link.href
                    ? "text-brand-gold"
                    : "text-brand-cream/80 hover:text-brand-cream"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-1 left-2.5 right-2.5 h-px bg-brand-gold/70 transition-transform duration-300 origin-left",
                    pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* CTA + Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Shopping bag — always visible, badge appears when cart has items */}
            <Link
              href="/checkout"
              aria-label={totalItems > 0 ? `Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}` : "Shopping bag"}
              className="relative flex items-center justify-center w-9 h-9 rounded-md border border-brand-gold/40 text-brand-cream hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10 transition-all duration-200"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-brand-gold text-[#1C1C1C] text-[10px] font-bold leading-none px-1">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            <Button variant="olive" size="sm" className="hidden lg:inline-flex text-xs tracking-wider uppercase" asChild>
              <Link href="/free-chapter">Read Free</Link>
            </Button>

            <MobileMenu />
          </div>

        </div>
      </div>
    </header>
  )
}
