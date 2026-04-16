import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
  className?: string
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col bg-card rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400",
        featured && "lg:flex-row lg:col-span-3",
        className
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-brand-greige/20",
          featured ? "aspect-[16/9] lg:aspect-auto lg:w-1/2 lg:shrink-0" : "aspect-[16/9]"
        )}
      >
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute top-3 left-3">
          <Badge variant="charcoal" className="text-[10px] uppercase tracking-wide">
            {post.categoryLabel}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-1 p-6", featured && "lg:p-10 lg:justify-center")}>
        <div className="flex items-center gap-4 text-xs text-brand-stone mb-3">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>

        <h3
          className={cn(
            "font-serif font-semibold text-brand-cream leading-tight group-hover:text-brand-gold transition-colors",
            featured ? "text-2xl md:text-3xl" : "text-xl"
          )}
        >
          {post.title}
        </h3>

        <p className={cn("mt-3 text-brand-stone leading-relaxed", featured ? "text-base line-clamp-3 mt-4" : "text-sm line-clamp-2")}>
          {post.excerpt}
        </p>

        <span className="mt-5 text-sm font-medium text-brand-gold group-hover:text-brand-wine transition-colors">
          Read More →
        </span>
      </div>
    </Link>
  )
}
