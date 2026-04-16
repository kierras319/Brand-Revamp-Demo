import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { AnimatedDivider } from "@/components/shared/AnimatedDivider"
import { EmailSignupBanner } from "@/components/home/EmailSignupBanner"
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts"
import { formatDate } from "@/lib/utils"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      {/* Hero image */}
      <div className="relative h-[50vh] md:h-[60vh] bg-brand-charcoal overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <PageWrapper className="pb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-brand-greige/70 hover:text-brand-greige transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="olive" className="text-[10px] uppercase tracking-wide">
                {post.categoryLabel}
              </Badge>
            </div>
            <h1 className="font-serif text-display-sm md:text-display-md font-semibold text-brand-cream leading-tight max-w-3xl text-balance">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 mt-5 text-sm text-brand-greige/70">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
          </PageWrapper>
        </div>
      </div>

      {/* Content */}
      <section className="bg-brand-parchment py-section">
        <PageWrapper className="max-w-3xl">
          <p className="font-serif text-xl italic text-brand-charcoal/60 mb-8 leading-relaxed">
            {post.excerpt}
          </p>
          <AnimatedDivider ornament />
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-charcoal prose-p:text-brand-charcoal/80 prose-p:leading-loose prose-a:text-brand-gold prose-a:no-underline hover:prose-a:text-brand-wine prose-blockquote:border-brand-gold prose-blockquote:text-brand-charcoal/70 prose-strong:text-brand-charcoal"
            dangerouslySetInnerHTML={{
              __html: post.content
                .split("\n\n")
                .map((p) =>
                  p.startsWith("## ")
                    ? `<h2>${p.slice(3)}</h2>`
                    : `<p>${p}</p>`
                )
                .join(""),
            }}
          />
        </PageWrapper>
      </section>

      <EmailSignupBanner />
    </>
  )
}
