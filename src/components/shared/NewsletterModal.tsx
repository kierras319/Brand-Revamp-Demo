"use client"

import { useEffect, useState } from "react"
import { Gift } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { EmailSignupForm } from "./EmailSignupForm"

export function NewsletterModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("newsletter_modal_dismissed")
    if (dismissed) return

    const timer = setTimeout(() => {
      setOpen(true)
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [])

  function handleSuccess() {
    localStorage.setItem("newsletter_modal_dismissed", "true")
    setOpen(false)
  }

  function handleOpenChange(value: boolean) {
    if (!value) {
      localStorage.setItem("newsletter_modal_dismissed", "true")
    }
    setOpen(value)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-brand-greige border-white/10">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
            <Gift className="h-6 w-6 text-brand-gold" />
          </div>
          <DialogTitle className="text-center text-2xl text-brand-cream">
            Before You Go
          </DialogTitle>
          <DialogDescription className="text-center text-brand-stone mt-2">
            Get a free psychological thriller story — delivered instantly when you join the reader list.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <EmailSignupForm
            variant="stacked"
            theme="dark"
            placeholder="Your email address"
            buttonText="Send Me the Free Story"
            onSuccess={handleSuccess}
          />
          <p className="text-xs text-brand-stone text-center">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
