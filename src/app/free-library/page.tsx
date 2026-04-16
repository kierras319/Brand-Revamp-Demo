import type { Metadata } from "next"
import { PageHero } from "@/components/shared/PageHero"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { EmailSignupBanner } from "@/components/home/EmailSignupBanner"
import { FreeLibraryClient } from "@/components/library/FreeLibraryClient"

export const metadata: Metadata = {
  title: "Free Library",
  description:
    "Free short stories, first chapters, writing prompts, and printables. Enter your email to unlock the full collection.",
}

export default function FreeLibraryPage() {
  return (
    <>
      <PageHero
        title="Your Free Reading Room"
        subtitle="Short stories, first chapters, writing prompts, and printables — all free, all dark, all yours."
        backgroundVariant="charcoal"
        badge="Free Access"
      />

      <section className="bg-brand-parchment py-section">
        <PageWrapper>
          <FreeLibraryClient />
        </PageWrapper>
      </section>

      <EmailSignupBanner />
    </>
  )
}
