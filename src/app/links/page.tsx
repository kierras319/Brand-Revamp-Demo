import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Keke Writes Thrillers — Links",
  description: "Psychological thrillers for the restless mind. Free story, books, and more from Keke Sharice.",
}

const links = [
  {
    label: "Get My Free Story →",
    href: "/free-story",
    description: "The Last Witness — free EPUB delivered to your inbox",
    highlight: true,
  },
  {
    label: "Shop My Books",
    href: "/shop/fiction",
    description: "Psychological thrillers you won't put down",
    highlight: false,
  },
  {
    label: "The Manor — Exclusive Reader Experience",
    href: "/the-manor",
    description: "An immersive dark fiction world for the obsessed",
    highlight: false,
  },
  {
    label: "Read the Blog",
    href: "/blog",
    description: "Writing life, craft, and dark fiction",
    highlight: false,
  },
  {
    label: "About Keke",
    href: "/about",
    description: "The author behind the twists",
    highlight: false,
  },
  {
    label: "Work With Me",
    href: "/contact",
    description: "Collaborations, press, and reader mail",
    highlight: false,
  },
]

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-brand-charcoal flex flex-col items-center justify-start py-16 px-4">

      {/* Profile header */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 rounded-full bg-brand-greige border-2 border-brand-gold/40 flex items-center justify-center mb-4">
          <span className="font-serif text-2xl font-bold text-brand-gold">K</span>
        </div>
        <h1 className="font-serif text-2xl font-semibold text-brand-cream mb-1 tracking-wide">
          Keke Sharice
        </h1>
        <p className="text-brand-stone text-sm text-center max-w-xs leading-relaxed">
          Psychological thrillers for the restless mind.<br />
          Characters who lie. Endings you won&rsquo;t see coming.
        </p>
      </div>

      {/* Link buttons */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`
              group block rounded-xl px-6 py-4 text-center transition-all duration-200
              ${link.highlight
                ? "bg-brand-wine text-brand-cream border border-brand-wine hover:bg-brand-wine/80"
                : "bg-brand-greige text-brand-cream border border-white/5 hover:border-brand-gold/30 hover:bg-brand-greige/80"
              }
            `}
          >
            <span className="font-serif text-base font-semibold block leading-tight">
              {link.label}
            </span>
            <span className="text-xs text-brand-stone mt-0.5 block group-hover:text-brand-cream/70 transition-colors">
              {link.description}
            </span>
          </Link>
        ))}
      </div>

      {/* Social handles */}
      <div className="mt-10 flex gap-6 text-xs text-brand-stone">
        <a
          href="https://instagram.com/kekesharice"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-cream transition-colors"
        >
          Instagram
        </a>
        <span className="text-brand-stone/40">·</span>
        <a
          href="https://tiktok.com/@kekesharice"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-cream transition-colors"
        >
          TikTok
        </a>
        <span className="text-brand-stone/40">·</span>
        <Link href="/" className="hover:text-brand-cream transition-colors">
          Website
        </Link>
      </div>

      {/* Wordmark */}
      <p className="mt-8 text-[11px] text-brand-stone/40 tracking-widest uppercase">
        kekesharice.com
      </p>

    </div>
  )
}
