import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PageWrapper } from "@/components/layout/PageWrapper"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { AnimatedDivider } from "@/components/shared/AnimatedDivider"
import { EmailSignupBanner } from "@/components/home/EmailSignupBanner"
import { AuthorTimeline } from "@/components/about/AuthorTimeline"
import { PressQuotes } from "@/components/about/PressQuotes"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About",
  description:
    "I create dark, immersive psychological thrillers for women who crave escape, suspense, and stories that linger long after the final page.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-charcoal py-16 md:py-24 overflow-hidden">
        <PageWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-6">
                The writer
              </p>
              <h1 className="font-serif text-display-md md:text-display-lg font-semibold text-brand-cream leading-tight">
                Keke Sharice
              </h1>
              <div className="w-16 h-px bg-brand-gold/60 my-6" />
              <p className="font-serif text-xl italic text-brand-cream/85 leading-relaxed mb-6">
                &ldquo;I&rsquo;ve always been more interested in the monsters hiding inside our homes than the ones outside them.&rdquo;
              </p>
              <p className="text-brand-stone leading-relaxed">
                Keke Sharice is the pen name of a domestic psychological thriller author who believes the most terrifying stories happen inside four walls — behind closed doors, in whispered conversations, in the silence between people who once knew each other.
              </p>
            </div>

            {/* Portrait */}
            <div className="relative">
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-card overflow-hidden shadow-luxury">
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=600&h=800&fit=crop&q=80"
                  alt="Keke — author portrait"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent" />
              </div>
              {/* Decorative border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full max-w-sm border border-brand-gold/20 rounded-card -z-0 hidden lg:block" aria-hidden />
            </div>
          </div>
        </PageWrapper>
      </section>

      {/* Bio section */}
      <section className="bg-brand-parchment py-section">
        <PageWrapper className="max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main bio */}
            <div className="lg:col-span-2 space-y-6 text-brand-stone leading-loose text-base">
              <p>
                My thrillers are domestic and psychological — set in the kind of houses where everything looks fine from the outside. They center women: complex, fractured, sometimes unreliable, always fully human. The secrets they keep aren&rsquo;t dramatic. They&rsquo;re the kind you bury so deep you almost forget they&rsquo;re there. Almost.
              </p>
              <p>
                I write for women who read past midnight, who know that the most unsettling stories are the ones that feel just a little too familiar. Who understand that &ldquo;I would never do that&rdquo; is often the most comfortable lie we tell ourselves.
              </p>
              <p>
                Beyond the fiction, I create resources for writers who want to go to the dark places — because I know how hard it is to find craft advice that doesn&rsquo;t ask you to make your work safer, softer, more palatable.
              </p>
              <p className="text-brand-cream/80">
                This brand exists for the readers and writers who believe that dark fiction, done with intention, is some of the most honest literature there is.
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-brand-greige rounded-card p-6 border border-white/5">
                <h3 className="font-serif text-lg font-semibold text-brand-cream mb-4">Currently</h3>
                <ul className="space-y-3 text-sm text-brand-stone">
                  <li>📖 Writing: <em className="text-brand-cream/80">Paper Bones</em></li>
                  <li>📚 Reading: The latest domestic thrillers</li>
                  <li>🎧 Listening: Dark, cinematic playlists</li>
                </ul>
              </div>

              <div className="bg-brand-greige rounded-card p-6 border border-white/5">
                <h3 className="font-serif text-lg font-semibold text-brand-cream mb-4">Find me</h3>
                <div className="space-y-2">
                  <a
                    href="https://tiktok.com/@kekesharice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-brand-stone hover:text-brand-cream transition-colors"
                  >
                    <span className="text-base">🎵</span> TikTok — @kekesharice
                  </a>
                  <a
                    href="https://instagram.com/kekesharice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-brand-stone hover:text-brand-cream transition-colors"
                  >
                    <span className="text-base">📸</span> Instagram — @kekesharice
                  </a>
                  <a
                    href="https://goodreads.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-brand-stone hover:text-brand-cream transition-colors"
                  >
                    <span className="text-base">📚</span> Goodreads
                  </a>
                </div>
              </div>

              <div className="bg-brand-greige rounded-card p-6 border border-white/5">
                <h3 className="font-serif text-lg font-semibold text-brand-cream mb-4">Quick links</h3>
                <div className="space-y-2">
                  <Button variant="olive-outline" size="sm" className="w-full" asChild>
                    <Link href="/books">Browse Books</Link>
                  </Button>
                  <Button variant="olive-outline" size="sm" className="w-full" asChild>
                    <Link href="/free-story">Free Story</Link>
                  </Button>
                  <Button variant="olive-outline" size="sm" className="w-full" asChild>
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      </section>

      {/* Timeline */}
      <section className="bg-brand-charcoal py-section">
        <PageWrapper className="max-w-4xl">
          <SectionHeading title="The Journey" align="left" />
          <AuthorTimeline />
        </PageWrapper>
      </section>

      {/* Press quotes */}
      <section className="bg-brand-parchment py-section border-t border-white/5">
        <PageWrapper>
          <SectionHeading
            title="What Readers Say"
            align="center"
          />
          <PressQuotes />
          <AnimatedDivider ornament />
        </PageWrapper>
      </section>

      <EmailSignupBanner />
    </>
  )
}
