"use client"

import Image from "next/image"
import { Download, BookOpen, PenLine, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { FreeResource, ResourceType } from "@/lib/types"

interface FreeResourceCardProps {
  resource: FreeResource
  onDownload: (resource: FreeResource) => void
  unlocked: boolean
  className?: string
}

const typeConfig: Record<ResourceType, { icon: React.ElementType; badgeVariant: "olive" | "mauve" | "taupe" | "charcoal" }> = {
  "short-story": { icon: BookOpen, badgeVariant: "charcoal" },
  "first-chapter": { icon: BookOpen, badgeVariant: "olive" },
  "writing-prompt": { icon: PenLine, badgeVariant: "mauve" },
  printable: { icon: Printer, badgeVariant: "taupe" },
}

export function FreeResourceCard({ resource, onDownload, unlocked, className }: FreeResourceCardProps) {
  const config = typeConfig[resource.type]
  const Icon = config.icon

  return (
    <div className={cn("group flex flex-col bg-card rounded-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400", className)}>
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-greige/20">
        <Image
          src={resource.imageUrl}
          alt={resource.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={config.badgeVariant} className="text-[10px] uppercase tracking-wide">
            {resource.typeLabel}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-brand-charcoal/60 flex items-center justify-center">
          <Icon className="h-3.5 w-3.5 text-brand-cream" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg font-semibold text-brand-charcoal mb-2 group-hover:text-brand-gold transition-colors">
          {resource.title}
        </h3>
        <p className="text-sm text-brand-charcoal/60 leading-relaxed flex-1 mb-4">
          {resource.description}
        </p>
        <Button
          variant={unlocked ? "olive" : "olive-outline"}
          size="sm"
          className="w-full"
          onClick={() => onDownload(resource)}
        >
          <Download className="h-4 w-4" />
          {unlocked ? "Download Free" : "Unlock Free"}
        </Button>
      </div>
    </div>
  )
}
