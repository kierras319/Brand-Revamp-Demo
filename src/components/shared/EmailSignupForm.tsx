"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { subscribeSchema, type SubscribeFormData } from "@/lib/validations"
import { cn } from "@/lib/utils"

interface EmailSignupFormProps {
  variant?: "inline" | "stacked"
  theme?: "light" | "dark"
  placeholder?: string
  buttonText?: string
  className?: string
  onSuccess?: () => void
}

export function EmailSignupForm({
  variant = "inline",
  theme = "light",
  placeholder = "Your email address",
  buttonText = "Subscribe",
  className,
  onSuccess,
}: EmailSignupFormProps) {
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
      toast({
        variant: "success",
        title: "You're in.",
        description: "Welcome to The Escapist. Your first story is on its way.",
      })
      reset()
      onSuccess?.()
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Please try again in a moment.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (variant === "stacked") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-3", className)}>
        <div>
          <Label
            htmlFor="email-stacked"
            className={cn("text-sm mb-1.5", theme === "dark" ? "text-brand-greige" : "text-brand-charcoal/70")}
          >
            Email address
          </Label>
          <Input
            id="email-stacked"
            type="email"
            placeholder={placeholder}
            className={cn(
              theme === "dark" && "bg-white/10 border-white/20 text-brand-cream placeholder:text-brand-greige/60 focus-visible:ring-brand-gold"
            )}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="olive"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonText}
        </Button>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col sm:flex-row gap-2", className)}
    >
      <div className="flex-1">
        <Input
          type="email"
          placeholder={placeholder}
          className={cn(
            "h-11",
            theme === "dark" &&
              "bg-white/10 border-white/20 text-brand-cream placeholder:text-brand-greige/60 focus-visible:ring-brand-gold"
          )}
          aria-label="Email address"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>
      <Button
        type="submit"
        variant="olive"
        size="lg"
        className="h-11 shrink-0"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {buttonText}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
