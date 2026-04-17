"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Gift } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { subscribeSchema, type SubscribeFormData } from "@/lib/validations"

interface LibraryGateFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  resourceTitle?: string
}

export function LibraryGateForm({
  open,
  onOpenChange,
  onSuccess,
  resourceTitle,
}: LibraryGateFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
  })

  async function onSubmit(data: SubscribeFormData) {
    setIsLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()

      // Persist unlock in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("library_access", "true")
      }

      toast({
        variant: "success",
        title: "Access granted.",
        description: "All free resources are now unlocked for you.",
      })
      reset()
      onSuccess()
      onOpenChange(false)
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-brand-greige border-white/10">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
            <Gift className="h-6 w-6 text-brand-gold" />
          </div>
          <DialogTitle className="text-center text-brand-cream">
            Unlock the Free Library
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-brand-stone mt-2">
            {resourceTitle
              ? `Enter your email to access "${resourceTitle}" — plus everything else in the free library.`
              : "Enter your email to unlock all free stories, chapters, prompts, and printables."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div>
            <Label htmlFor="library-email" className="text-sm mb-1.5 block text-brand-cream">
              Email address
            </Label>
            <Input
              id="library-email"
              type="email"
              placeholder="you@example.com"
              className="bg-brand-parchment border-white/15 text-brand-cream placeholder:text-brand-stone focus-visible:ring-brand-gold"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
          <Button type="submit" variant="olive" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Unlock Free Access"
            )}
          </Button>
          <p className="text-xs text-brand-stone text-center">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
