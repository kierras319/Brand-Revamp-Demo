import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Download } from "lucide-react"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { FreeResourceDetail } from "@/components/library/FreeResourceDetail"
import { FreeResourceCard } from "@/components/library/FreeResourceCard"
import { freeResources, getResourceBySlug, getRelatedResources } from "@/data/free-resources"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return freeResources.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const resource = getResourceBySlug(slug)
  if (!resource) return {}
  return { title: resource.title, description: resource.description }
}

export default async function FreeResourcePage({ params }: PageProps) {
  const { slug } = await params
  const resource = getResourceBySlug(slug)
  if (!resource) notFound()

  const related = getRelatedResources(slug, 4)

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#1C1C1C] border-b border-brand-gold/10">
        <PageWrapper>
          <nav className="py-3 flex items-center gap-2 text-xs text-brand-stone uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/free-library" className="hover:text-brand-gold transition-colors">Free Library</Link>
            <span>/</span>
            <span className="text-brand-cream">{resource.title}</span>
          </nav>
        </PageWrapper>
      </div>

      {/* ── HERO: Cover + Info ── */}
      <section className="bg-white py-10 md:py-16">
        <PageWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">

            {/* LEFT: Cover */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative w-64 lg:w-72 shrink-0">
                <div className="absolute top-0 left-0 z-10">
                  <span className="block bg-brand-olive text-brand-cream text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                    Free
                  </span>
                </div>
                <div className="relative aspect-[2/3] w-full rounded shadow-luxury overflow-hidden bg-brand-greige/20">
                  <Image
                    src={resource.imageUrl}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="288px"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col items-center lg:items-start gap-3 text-sm">
                <Link href="/about" className="flex items-center gap-1.5 text-brand-wine hover:text-brand-wine/80 transition-colors">
                  ✓ Keke Sharice
                </Link>
              </div>
            </div>

            {/* RIGHT: Resource details */}
            <div className="space-y-4 max-w-xl">

              {/* Type tag */}
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
                {resource.typeLabel}
              </p>

              {/* Title & meta */}
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-brand-charcoal leading-tight">
                  {resource.title}
                </h1>
                {resource.wordCount && (
                  <p className="mt-1 text-xs text-brand-charcoal/40">{resource.wordCount.toLocaleString()} words</p>
                )}
                <p className="mt-2 text-sm text-brand-charcoal/60">
                  by{" "}
                  <Link href="/about" className="text-brand-wine hover:underline font-medium">
                    Keke Sharice
                  </Link>
                </p>
              </div>

              <div className="h-px bg-brand-greige/60" />

              {/* Unlock / Download CTA */}
              <FreeResourceDetail resource={resource} />

              <div className="h-px bg-brand-greige/60" />

              {/* Tagline */}
              {resource.tagline && (
                <p className="font-serif text-lg italic text-brand-charcoal/70">
                  &ldquo;{resource.tagline}&rdquo;
                </p>
              )}

              {/* Free download note */}
              <div className="flex items-start gap-2 text-sm text-brand-charcoal/50">
                <Download className="h-4 w-4 mt-0.5 shrink-0 text-brand-wine" />
                <span>Free instant download — no purchase required. Just unlock with your email.</span>
              </div>

            </div>
          </div>
        </PageWrapper>
      </section>

      {/* ── OVERVIEW ── */}
      {(resource.synopsis || resource.overview || resource.authorNote) && (
        <section className="bg-brand-parchment py-section">
          <PageWrapper className="max-w-5xl">
            <h2 className="font-serif text-2xl italic text-brand-cream mb-6">Overview</h2>

            {resource.authorNote && (
              <div className="border border-white/10 rounded p-5 mb-8 bg-brand-greige relative">
                <span className="absolute -top-3 left-4 bg-brand-greige px-2 font-serif text-sm italic text-brand-stone">
                  Notes From the Author
                </span>
                <p className="text-brand-stone leading-relaxed text-sm">
                  {resource.authorNote}
                </p>
              </div>
            )}

            {(resource.synopsis || resource.overview) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-brand-stone leading-relaxed text-sm">
                {resource.synopsis && <p>{resource.synopsis}</p>}
                {resource.overview && <p>{resource.overview}</p>}
              </div>
            )}
          </PageWrapper>
        </section>
      )}

      {/* ── MORE FREE READS ── */}
      {related.length > 0 && (
        <section className="bg-white py-section">
          <PageWrapper>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-brand-charcoal mb-8">
              More Free Reads
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((r) => (
                <FreeResourceCard key={r.id} resource={r} unlocked={false} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/free-library"
                className="text-sm text-brand-wine hover:text-brand-wine/80 underline underline-offset-4 transition-colors"
              >
                Browse the full Free Library →
              </Link>
            </div>
          </PageWrapper>
        </section>
      )}
    </>
  )
}
