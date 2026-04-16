"use client"

import { useState } from "react"
import { BlogCard } from "./BlogCard"
import { BlogCategoryFilter } from "./BlogCategoryFilter"
import { getBlogPostsByCategory } from "@/data/blog-posts"

export function BlogIndexClient() {
  const [activeCategory, setActiveCategory] = useState("all")
  const posts = getBlogPostsByCategory(activeCategory)
  const [featuredPost, ...rest] = posts

  return (
    <>
      <div className="mb-10">
        <BlogCategoryFilter activeCategory={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured post — full width */}
        {featuredPost && (
          <BlogCard post={featuredPost} featured={true} />
        )}

        {/* Remaining posts */}
        {rest.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-brand-charcoal/50 py-16 font-serif italic">
          No posts in this category yet. Check back soon.
        </p>
      )}
    </>
  )
}
