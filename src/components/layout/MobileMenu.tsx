"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function MobileMenu() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-brand-stone hover:text-brand-gold hover:bg-transparent"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-[#1C1C1C] border-l border-brand-gold/15">
        <SheetHeader className="mb-2">
          <SheetTitle className="font-serif text-xl text-brand-gold tracking-wider text-left">
            Keke Writes Thrillers
          </SheetTitle>
          <p className="text-[10px] uppercase tracking-[0.25em] text-brand-stone/70 text-left -mt-1">
            Domestic Psychological Thriller Author
          </p>
        </SheetHeader>

        <div className="w-full h-px bg-brand-gold/20 mb-6" />

        <nav className="flex flex-col space-y-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200 border-b border-white/5",
                pathname === link.href
                  ? "text-brand-gold"
                  : "text-brand-cream/80 hover:text-brand-cream"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          <Button variant="olive" className="w-full text-xs tracking-wider uppercase" asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>

        <div className="mt-8 text-[10px] text-brand-stone/30 uppercase tracking-widest">
          @keke_writesthrillers
        </div>
      </SheetContent>
    </Sheet>
  )
}
