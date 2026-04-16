import type { Book } from "@/lib/types";

export const books: Book[] = [
  {
    id: "1",
    slug: "the-silent-hour",
    title: "The Silent Hour",
    tagline: "Some silences are deadlier than words.",
    synopsis:
      "When therapist Mara Cole begins treating a new patient with unsettling echoes of her own buried past, she realizes the line between doctor and patient has never been more dangerously blurred. Set across one rainy autumn in a small coastal town, The Silent Hour unravels a twisted web of obsession, memory, and a truth that someone will kill to keep hidden.",
    overview:
      "Mara Cole is brilliant at reading other people. She has built a career — and a carefully constructed life — on that ability. When a new patient walks into her office, Mara tells herself this is just another case. She is wrong. As the sessions deepen and the parallels between her patient's past and her own buried history become impossible to ignore, Mara begins crossing lines she swore she would never cross. Set against the grey autumn of a small coastal town, The Silent Hour is a slow-burn psychological thriller about the stories we tell ourselves, the truths we can't stop running from, and the dangerous intimacy of being truly known.",
    authorNote:
      "I wrote the first draft of this book in thirty-nine days during a February that felt like it would never end. I deleted seventy thousand words. I started over. I nearly quit. Mara came to me fully formed — sharp, careful, and deeply damaged in a way she'd never admit to anyone, including herself. I knew her voice before I knew her story. Everything else grew from there. The scene in chapter twenty-two I rewrote eleven times. My editor wanted it cut. I held my ground. I think it's the best thing I've ever written.",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop&q=80",
    genre: "Psychological Thriller",
    pages: 342,
    formats: ["Ebook", "Paperback", "Audiobook"],
    formatPricing: [
      { label: "Ebook", price: 4.99 },
      { label: "Paperback", price: 14.99 },
      { label: "Audiobook", price: 19.99 },
    ],
    purchaseUrl: "#",
    status: "available",
    publishDate: "2024-03-15",
    featured: true,
  },
  {
    id: "2",
    slug: "what-we-buried",
    title: "What We Buried",
    tagline: "Every family has a grave they pretend isn't there.",
    synopsis:
      "Three sisters return to their childhood home after their mother's sudden death, each carrying secrets they swore to take to the grave. But the house remembers everything — and someone is making sure they do too.",
    overview:
      "Oldest sister Diane has built her life on control. Middle sister Renee has built hers on forgetting. Youngest sister Cass has never been allowed to remember. When their mother dies suddenly and the three women return to the house they all escaped as soon as they could, the silence between them is twenty years thick. What We Buried is a domestic thriller about the architecture of family secrets — how they are constructed, maintained, and eventually weaponized. About the conspiracy of silence that keeps families together even when it should tear them apart.",
    authorNote:
      "This book started with a single image: three women standing in their childhood kitchen, not speaking, each one holding a version of the truth the others couldn't bear to hear. I spent three months reading family systems theory and research on intergenerational trauma before I wrote a single scene. None of that research appears directly in the book. All of it is there underneath — the way a foundation is invisible once the building stands.",
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&q=80",
    genre: "Domestic Thriller",
    pages: 298,
    formats: ["Ebook", "Paperback"],
    formatPricing: [
      { label: "Ebook", price: 4.99 },
      { label: "Paperback", price: 12.99 },
    ],
    purchaseUrl: "#",
    status: "available",
    publishDate: "2024-07-22",
    featured: true,
  },
  {
    id: "3",
    slug: "beneath-the-surface",
    title: "Beneath the Surface",
    tagline: "She thought she knew who she was. She was wrong.",
    synopsis:
      "A gripping exploration of identity and manipulation, following a woman who begins to question whether the life she remembers is the one she actually lived.",
    overview:
      "Nina has a good life. A loving partner. A career she worked hard for. A past she has made peace with. Then a stranger calls her by a name she doesn't recognise — and everything she thought she knew about herself begins to loosen. Beneath the Surface is a psychological thriller about memory, manipulation, and the terrifying question of whether we can ever truly know our own minds.",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop&q=80",
    genre: "Psychological Thriller",
    pages: 316,
    formats: ["Ebook"],
    formatPricing: [
      { label: "Ebook", price: 4.99 },
    ],
    purchaseUrl: "#",
    status: "available",
    publishDate: "2023-11-01",
    featured: false,
  },
  {
    id: "4",
    slug: "the-last-confession",
    title: "The Last Confession",
    tagline: "Not all sins deserve absolution.",
    synopsis:
      "Coming spring 2025 — a gothic psychological thriller set in a crumbling estate where a woman returns to care for her estranged father, only to discover that the secrets he kept may be far darker than she imagined.",
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&q=80",
    genre: "Gothic Thriller",
    formats: ["Ebook", "Paperback", "Audiobook"],
    status: "coming-soon",
    publishDate: "2025-04-01",
    featured: true,
  },
  {
    id: "5",
    slug: "paper-bones",
    title: "Paper Bones",
    tagline: "The most dangerous lies are the ones we tell ourselves.",
    synopsis:
      "Coming autumn 2025 — a twisty domestic thriller about a true crime podcaster who begins to suspect her own husband is the subject of her next episode.",
    coverUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=600&fit=crop&q=80",
    genre: "Domestic Thriller",
    formats: ["Ebook", "Paperback"],
    status: "coming-soon",
    publishDate: "2025-09-15",
    featured: false,
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getFeaturedBooks(): Book[] {
  return books.filter((b) => b.featured && b.status === "available");
}

export function getAvailableBooks(): Book[] {
  return books.filter((b) => b.status === "available");
}

export function getComingSoonBooks(): Book[] {
  return books.filter((b) => b.status === "coming-soon");
}

export function getRelatedBooks(slug: string, limit = 4): Book[] {
  const current = books.find((b) => b.slug === slug);
  if (!current) return [];
  return books
    .filter((b) => b.slug !== slug && b.status === "available")
    .slice(0, limit);
}
