"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    image: "/images/hero-bg.png",
    eyebrow: "Keke Writes Thrillers",
    headline: "Dark Stories for Women\nWho Read Past Midnight.",
    subtext: "Domestic psychological thrillers that unravel you from the inside.",
    cta: { label: "Download Free Story", href: "/free-library" },
    ctaSecondary: { label: "Browse Books", href: "/books" },
    overlayStrength: "bg-brand-charcoal/55",
  },
  {
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1400&h=900&fit=crop&q=85",
    eyebrow: "Now Available",
    headline: "The Silent Hour",
    subtext: "Some silences are deadlier than words. The debut psychological thriller is here.",
    cta: { label: "Get the Book", href: "/books/the-silent-hour" },
    ctaSecondary: { label: "Read a Free Chapter", href: "/free-library" },
    overlayStrength: "bg-brand-charcoal/60",
  },
  {
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&h=900&fit=crop&q=85",
    eyebrow: "Free Library",
    headline: "Your Next Obsession\nIs Already Waiting.",
    subtext: "Free short stories, first chapters, writing prompts, and reading trackers. No catch.",
    cta: { label: "Explore Free Library", href: "/free-library" },
    ctaSecondary: { label: "Browse the Shop", href: "/shop" },
    overlayStrength: "bg-brand-charcoal/55",
  },
]

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setIsTransitioning(false)
    }, 50)
  }, [isTransitioning])

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, paused])

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "88vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.image}
            alt={slide.headline.replace("\n", " ")}
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className={cn("absolute inset-0", slide.overlayStrength)} />
          {/* Subtle noise */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />
        </div>
      ))}

      {/* Slide content */}
      <div className="relative z-20 flex items-center justify-center min-h-[88vh] px-6">
        <div className="text-center max-w-3xl mx-auto">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={cn(
                "transition-all duration-500",
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 absolute inset-0 pointer-events-none"
              )}
            >
              {i === current && (
                <>
                  <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.3em] mb-6">
                    {slide.eyebrow}
                  </p>
                  <h1 className="font-serif text-display-md md:text-display-xl font-semibold text-brand-cream leading-tight mb-6 whitespace-pre-line">
                    {slide.headline}
                  </h1>
                  <div className="w-12 h-px bg-brand-gold/60 mx-auto mb-6" />
                  <p className="text-brand-stone/90 text-lg leading-relaxed max-w-lg mx-auto mb-8">
                    {slide.subtext}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="mauve" size="xl" asChild>
                      <Link href={slide.cta.href}>{slide.cta.label}</Link>
                    </Button>
                    <Button variant="cream-outline" size="xl" asChild>
                      <Link href={slide.ctaSecondary.href}>{slide.ctaSecondary.label}</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow controls */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-brand-charcoal/40 hover:bg-brand-charcoal/70 flex items-center justify-center text-brand-cream transition-colors duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-brand-charcoal/40 hover:bg-brand-charcoal/70 flex items-center justify-center text-brand-cream transition-colors duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={cn(
              "rounded-full transition-all duration-300",
              i === current
                ? "bg-brand-gold w-6 h-2"
                : "bg-brand-cream/40 hover:bg-brand-cream/70 w-2 h-2"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-brand-cream/10">
        <div
          key={current}
          className="h-full bg-brand-gold/60 origin-left"
          style={{ animation: paused ? "none" : "slideProgress 5s linear forwards" }}
        />
      </div>

      <style jsx>{`
        @keyframes slideProgress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </section>
  )
}
