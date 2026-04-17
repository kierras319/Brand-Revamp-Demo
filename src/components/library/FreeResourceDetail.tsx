"use client"

import { useState, useEffect } from "react"
import { Download, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LibraryGateForm } from "./LibraryGateForm"
import type { FreeResource } from "@/lib/types"

interface FreeResourceDetailProps {
  resource: FreeResource
}

export function FreeResourceDetail({ resource }: FreeResourceDetailProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUnlocked(localStorage.getItem("library_access") === "true")
    }
  }, [])

  function handleUnlockSuccess() {
    setUnlocked(true)
    if (resource.downloadUrl && resource.downloadUrl !== "#") {
      window.open(resource.downloadUrl, "_blank")
    }
  }

  function handleDownload() {
    if (resource.downloadUrl && resource.downloadUrl !== "#") {
      window.open(resource.downloadUrl, "_blank")
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        {unlocked ? (
          <Button variant="olive" size="lg" className="flex-1 sm:flex-none sm:px-10" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download Free
          </Button>
        ) : (
          <Button variant="olive" size="lg" className="flex-1 sm:flex-none sm:px-10" onClick={() => setGateOpen(true)}>
            <Lock className="h-4 w-4" />
            Unlock Free
          </Button>
        )}
      </div>

      <LibraryGateForm
        open={gateOpen}
        onOpenChange={setGateOpen}
        onSuccess={handleUnlockSuccess}
        resourceTitle={resource.title}
      />
    </>
  )
}
