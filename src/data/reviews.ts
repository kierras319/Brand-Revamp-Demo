import type { Review } from "@/lib/types"

const reviewsBySlug: Record<string, Review[]> = {
  "the-silent-hour": [
    {
      id: "b1",
      author: "Monique T.",
      rating: 5,
      text: "I read this in one sitting. Mara Cole is one of the most compelling protagonists I've encountered in years — you think you understand her, then the last third of this book dismantles everything. Absolutely devastating in the best way.",
      date: "2024-11-20",
      verified: true,
      recommended: true,
    },
    {
      id: "b2",
      author: "Priya S.",
      rating: 5,
      text: "The atmosphere is unreal. Every chapter felt like the walls were closing in. I kept thinking I'd figured it out and I was wrong every single time. This is the kind of thriller that stays with you.",
      date: "2024-12-04",
      verified: true,
      recommended: true,
    },
    {
      id: "b3",
      author: "Danielle R.",
      rating: 4,
      text: "Beautiful writing and a slow-burn tension that never lets up. The ending hit me harder than I expected. Would have loved a little more of Mara's backstory but honestly that restraint is probably what makes it so effective.",
      date: "2025-01-11",
      verified: true,
      recommended: true,
    },
    {
      id: "b4",
      author: "Kayla M.",
      rating: 5,
      text: "I gave this to my book club and we spent three hours arguing about the ending. In the best possible way. Keke writes women so honestly — even when they're doing terrible things.",
      date: "2025-02-08",
      verified: false,
      recommended: true,
    },
    {
      id: "b5",
      author: "Renée A.",
      rating: 5,
      text: "Honestly one of the best psychological thrillers I've read in years. The voice is so controlled. Every single word earns its place. I need the next book immediately.",
      date: "2025-02-20",
      verified: true,
      recommended: true,
    },
    {
      id: "b6",
      author: "Tamara J.",
      rating: 3,
      text: "Really atmospheric and well-written. The first two thirds gripped me completely. I felt the ending resolved a little too quickly for the slow burn it built — but I'd absolutely read whatever Keke writes next.",
      date: "2025-03-01",
      verified: true,
      recommended: true,
    },
    {
      id: "b7",
      author: "Courtney W.",
      rating: 5,
      text: "I've been recommending this to every reader I know. The kind of book that makes you feel less alone with the complicated parts of yourself. Dark and beautiful and completely unforgettable.",
      date: "2025-03-14",
      verified: true,
      recommended: true,
    },
    {
      id: "b8",
      author: "Aaliyah P.",
      rating: 4,
      text: "Riveting. I was suspicious of every character from chapter three onward — which is exactly how a thriller should make you feel. The coastal setting is so vivid I could almost smell the rain.",
      date: "2025-03-28",
      verified: true,
      recommended: true,
    },
  ],
  "what-we-buried": [
    {
      id: "c1",
      author: "Simone A.",
      rating: 5,
      text: "Family secrets done right. The three sisters feel so real — their dynamic, the unspoken resentments, the way they protect each other even when they shouldn't. I was gripping my Kindle the entire time.",
      date: "2024-08-15",
      verified: true,
      recommended: true,
    },
    {
      id: "c2",
      author: "Jasmine W.",
      rating: 4,
      text: "Creepy and atmospheric and so hard to put down. The house itself almost feels like a character. I'd love a sequel following the youngest sister.",
      date: "2024-09-03",
      verified: true,
      recommended: true,
    },
    {
      id: "c3",
      author: "Tanya B.",
      rating: 5,
      text: "Read it in two evenings. The reveal in chapter eighteen broke my heart. Perfect domestic thriller — tense, intimate, and completely unpredictable.",
      date: "2024-10-22",
      verified: true,
      recommended: true,
    },
    {
      id: "c4",
      author: "Nadia F.",
      rating: 5,
      text: "The writing in this book is something special. Every sentence is doing double work — telling you what happened and showing you what it cost. I finished it at 2am and just sat there.",
      date: "2024-11-09",
      verified: true,
      recommended: true,
    },
    {
      id: "c5",
      author: "Brianna K.",
      rating: 4,
      text: "A slow start but by chapter five I was completely hooked. The middle sister is one of the most complex characters I've read in domestic fiction — I hated her and understood her completely at the same time.",
      date: "2024-12-18",
      verified: false,
      recommended: true,
    },
    {
      id: "c6",
      author: "Stephanie O.",
      rating: 3,
      text: "Good thriller, well-written. The atmosphere was genuinely unsettling. I guessed the main twist early but the emotional resolution still landed. Would read more from this author.",
      date: "2025-01-30",
      verified: true,
      recommended: true,
    },
  ],
  "beneath-the-surface": [
    {
      id: "d1",
      author: "Margot E.",
      rating: 5,
      text: "Nina is the most unsettling unreliable narrator I've encountered in recent memory — not because she lies to the reader but because she genuinely doesn't know. This book made me question my own certainties.",
      date: "2024-02-14",
      verified: true,
      recommended: true,
    },
    {
      id: "d2",
      author: "Lena C.",
      rating: 4,
      text: "Gripping and deeply uncomfortable in the best way. The plot moves fast but the emotional weight of it stays with you. Highly recommend for fans of psychological thrillers with a literary edge.",
      date: "2024-03-05",
      verified: true,
      recommended: true,
    },
    {
      id: "d3",
      author: "Keisha N.",
      rating: 5,
      text: "This was my first Keke book and I immediately bought the other two. The way she writes interiority — the way she gets inside a woman's head and makes it feel true — is unlike anything I've read.",
      date: "2024-04-21",
      verified: true,
      recommended: true,
    },
  ],
  "the-silent-hour-ebook": [
    {
      id: "e1",
      author: "Monique T.",
      rating: 5,
      text: "I read this in one sitting. Mara Cole is one of the most compelling protagonists I've encountered in years — you think you understand her, then the last third dismantles everything. Absolutely devastating.",
      date: "2024-11-20",
      verified: true,
      recommended: true,
    },
    {
      id: "e2",
      author: "Priya S.",
      rating: 5,
      text: "The atmosphere is unreal. Every chapter felt like the walls were closing in. I kept thinking I'd figured it out and I was wrong every single time.",
      date: "2024-12-04",
      verified: true,
      recommended: true,
    },
    {
      id: "e3",
      author: "Danielle R.",
      rating: 4,
      text: "Beautiful writing and slow-burn tension that never lets up. The ending hit me harder than I expected.",
      date: "2025-01-11",
      verified: true,
      recommended: true,
    },
    {
      id: "e4",
      author: "Kayla M.",
      rating: 5,
      text: "I gave this to my book club and we spent three hours arguing about the ending. In the best possible way.",
      date: "2025-02-08",
      verified: false,
      recommended: true,
    },
  ],
  "what-we-buried-ebook": [
    {
      id: "f1",
      author: "Simone A.",
      rating: 5,
      text: "Family secrets done right. The three sisters feel so real — their dynamic, the unspoken resentments, the way they protect each other even when they shouldn't.",
      date: "2024-08-15",
      verified: true,
      recommended: true,
    },
    {
      id: "f2",
      author: "Jasmine W.",
      rating: 4,
      text: "Creepy and atmospheric and so hard to put down. The house itself almost feels like a character.",
      date: "2024-09-03",
      verified: true,
      recommended: true,
    },
    {
      id: "f3",
      author: "Tanya B.",
      rating: 5,
      text: "Read it in two evenings. The reveal in chapter eighteen broke my heart. Perfect domestic thriller.",
      date: "2024-10-22",
      verified: true,
      recommended: true,
    },
  ],
}

export function getReviewsBySlug(slug: string): Review[] {
  return reviewsBySlug[slug] ?? []
}

export function getAverageRating(reviews: Review[]): number {
  if (!reviews.length) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

export function getRatingSnapshot(reviews: Review[]): Record<number, number> {
  const snap: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((r) => { snap[r.rating] = (snap[r.rating] ?? 0) + 1 })
  return snap
}

export function getRecommendPercent(reviews: Review[]): number {
  if (!reviews.length) return 0
  const count = reviews.filter((r) => r.recommended).length
  return Math.round((count / reviews.length) * 100)
}
