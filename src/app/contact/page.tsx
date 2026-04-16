import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { AnimatedDivider } from "@/components/shared/AnimatedDivider"
import { ContactForm } from "@/components/contact/ContactForm"
import { ContactInfo } from "@/components/contact/ContactInfo"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out for book feedback, media inquiries, collaboration, or anything else. I aim to respond within 2 business days.",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Questions, feedback, collaboration, or just saying hello — I read every message."
        backgroundVariant="charcoal"
      />

      <section className="bg-brand-parchment py-section">
        <PageWrapper className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-serif text-2xl font-semibold text-brand-cream mb-8">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
          <AnimatedDivider ornament className="mt-16" />
        </PageWrapper>
      </section>
    </>
  )
}
