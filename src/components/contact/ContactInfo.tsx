import { Mail, Clock, Instagram, Music2 } from "lucide-react"
import { CONTACT_EMAIL } from "@/lib/constants"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-brand-cream mb-4">
          Let&apos;s Connect
        </h2>
        <p className="text-brand-stone leading-relaxed">
          Whether you&apos;re a reader with feedback, a fellow writer, or someone interested in collaboration — I&apos;d love to hear from you.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="h-5 w-5 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-cream mb-0.5">Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-brand-gold hover:text-brand-wine transition-colors underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="h-5 w-5 text-brand-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-cream mb-0.5">Response Time</p>
            <p className="text-sm text-brand-stone">
              I aim to respond within 2 business days. For media and press, please include your deadline.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-stone mb-4">
          Find me online
        </p>
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-stone hover:bg-brand-gold hover:text-brand-cream transition-all duration-200"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-stone hover:bg-brand-gold hover:text-brand-cream transition-all duration-200"
          >
            <Music2 className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="bg-brand-greige rounded-card p-6 border border-white/10">
        <p className="font-serif italic text-brand-cream/85 text-sm leading-relaxed">
          &ldquo;I read every message. Even the long ones. Especially the long ones.&rdquo;
        </p>
      </div>
    </div>
  )
}
