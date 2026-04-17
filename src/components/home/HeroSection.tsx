"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { cn } from "@/lib/utils"

const polaroidImages = [
  {
    src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=600&fit=crop&q=80",
    alt: "Reader with The Silent Hour",
    rotation: "-rotate-2",
  },
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=600&fit=crop&q=80",
    alt: "Late night reading",
    rotation: "rotate-1",
  },
  {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=600&fit=crop&q=80",
    alt: "Thriller collection",
    rotation: "-rotate-1",
  },
  {
    src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&h=600&fit=crop&q=80",
    alt: "Dark reading atmosphere",
    rotation: "rotate-2",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % polaroidImages.length)
        setFading(false)
      }, 400)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  const img = polaroidImages[current]

  return (
    <section className="bg-brand-parchment py-16 md:py-24 overflow-hidden border-t border-white/5">
      <PageWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Polaroid cycling image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Stacked shadow cards for depth */}
              <div className="absolute top-3 left-3 w-72 md:w-80 bg-white shadow-luxury rotate-3 rounded-sm" style={{ height: "370px" }} aria-hidden />
              <div className="absolute top-1.5 left-1.5 w-72 md:w-80 bg-white shadow-card rotate-1 rounded-sm" style={{ height: "370px" }} aria-hidden />

              {/* Main polaroid */}
              <div
                className={cn(
                  "relative w-72 md:w-80 bg-white shadow-luxury rounded-sm transition-all duration-400",
                  img.rotation,
                  fading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
                )}
              >
                {/* Photo area */}
                <div className="p-3 pb-2">
                  <div className="relative w-full overflow-hidden bg-brand-greige/20" style={{ height: "290px" }}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      priority
                      sizes="320px"
                    />
                    {/* Film grain overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                      aria-hidden
                    />
                  </div>
                  {/* Polaroid caption area */}
                  <p className="text-center text-[11px] text-brand-stone font-serif italic mt-3 mb-1 tracking-wide">
                    keke writes thrillers
                  </p>
                </div>
              </div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-1.5 mt-5">
                {polaroidImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false) }, 400) }}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-200",
                      i === current ? "bg-brand-wine w-4" : "bg-brand-greige"
                    )}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Headline + CTA */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-wine">
              Keke Writes Thrillers
            </p>
            <h2 className="font-serif text-display-md md:text-display-lg font-semibold text-brand-cream leading-tight text-balance">
              Dark stories for women who read{" "}
              <em className="text-brand-wine not-italic" style={{ fontStyle: "italic" }}>past midnight.</em>
            </h2>
            <div className="w-12 h-px bg-brand-gold/60" />
            <p className="text-brand-stone text-lg leading-relaxed max-w-md">
              Domestic psychological thrillers that unravel you from the inside — and the tools to write your own.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button variant="olive" size="lg" asChild>
                <Link href="/free-story">
                  <BookOpen className="h-4 w-4" />
                  Get Free Story
                </Link>
              </Button>
              <Button variant="olive-outline" size="lg" asChild>
                <Link href="/books">
                  Browse the Books
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-brand-stone uppercase tracking-widest pt-1">
              Read by 12,000+ thriller lovers
            </p>
          </div>

        </div>
      </PageWrapper>
    </section>
  )
}
