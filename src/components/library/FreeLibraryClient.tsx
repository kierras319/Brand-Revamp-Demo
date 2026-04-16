"use client"

import { useState, useEffect } from "react"
import { FreeResourceCard } from "./FreeResourceCard"
import { LibraryGateForm } from "./LibraryGateForm"
import { RESOURCE_CATEGORIES } from "@/lib/constants"
import { getResourcesByType } from "@/data/free-resources"
import type { FreeResource } from "@/lib/types"
import { cn } from "@/lib/utils"

export function FreeLibraryClient() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [unlocked, setUnlocked] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const [pendingResource, setPendingResource] = useState<FreeResource | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUnlocked(localStorage.getItem("library_access") === "true")
    }
  }, [])

  function handleDownload(resource: FreeResource) {
    if (unlocked) {
      // In production: open the download URL
      window.open(resource.downloadUrl ?? "#", "_blank")
    } else {
      setPendingResource(resource)
      setGateOpen(true)
    }
  }

  function handleUnlockSuccess() {
    setUnlocked(true)
    if (pendingResource?.downloadUrl) {
      window.open(pendingResource.downloadUrl, "_blank")
    }
    setPendingResource(null)
  }

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
            onDownload={handleDownload}
            unlocked={unlocked}
          />
        ))}
      </div>

      <LibraryGateForm
        open={gateOpen}
        onOpenChange={setGateOpen}
        onSuccess={handleUnlockSuccess}
        resourceTitle={pendingResource?.title}
      />
    </>
  )
}
