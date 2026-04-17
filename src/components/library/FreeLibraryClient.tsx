"use client"

import { useState, useEffect } from "react"
import { FreeResourceCard } from "./FreeResourceCard"
import { RESOURCE_CATEGORIES } from "@/lib/constants"
import { getResourcesByType } from "@/data/free-resources"
import { cn } from "@/lib/utils"

export function FreeLibraryClient() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUnlocked(localStorage.getItem("library_access") === "true")
    }
  }, [])

  const resources = getResourcesByType(activeCategory)

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {RESOURCE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
              activeCategory === cat.id
                ? "bg-brand-gold text-brand-charcoal border-brand-gold"
                : "bg-transparent text-brand-stone border-white/20 hover:border-white/40 hover:text-brand-cream"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <FreeResourceCard
            key={resource.id}
            resource={resource}
            unlocked={unlocked}
          />
        ))}
      </div>
    </>
  )
}
