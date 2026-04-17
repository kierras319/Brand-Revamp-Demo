import type { Product } from "@/lib/types";

export const products: Product[] = [
  // Fiction
  {
    id: "p1",
    slug: "the-silent-hour-ebook",
    title: "The Silent Hour",
    description: "The complete psychological thriller. Therapist Mara Cole takes on a patient whose past mirrors her own — and nothing is what it seems.",
    overview: "When therapist Mara Cole accepts a new patient — a woman whose history reads like a dark mirror of her own — she tells herself she can stay professional. She's wrong. Set across one rainy autumn in a small coastal town, The Silent Hour unravels a twisted web of obsession, memory, and a truth that someone will kill to keep hidden. Mara is brilliant at reading other people. She has never been good at reading herself.",
    authorNote: "I wrote the first draft of The Silent Hour in thirty-nine days during a February that felt like it would never end. I deleted seventy thousand words. I started over. I nearly quit. Mara Cole came to me fully formed — sharp, careful, and deeply damaged in a way she'd never admit to anyone, including herself. I knew her voice before I knew her story. Everything else grew from there.",
    price: 4.99,
    category: "fiction",
    variant: "reader",
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop&q=80",
    featured: true,
    formats: [
      { label: "Ebook", price: 4.99 },
      { label: "Audiobook", price: 14.99 },
    ],
  },
  {
    id: "p2",
    slug: "what-we-buried-ebook",
    title: "What We Buried",
    description: "A domestic thriller about three sisters who return home after their mother's death — and the secret the house has been keeping.",
    overview: "Three sisters. One house. A secret they all agreed, years ago, never to speak of. But their mother is dead, the house still stands, and the silence they built their lives on is beginning to crack. What We Buried is a domestic thriller about the architecture of family secrets — how they are made, maintained, and eventually used against you.",
    authorNote: "This book started with a single image: three women standing in their childhood kitchen, not speaking, each one holding a version of the truth the others couldn't bear to hear. I spent three months reading about family systems theory and intergenerational silence before I wrote a single scene. None of that research appears directly in the book. All of it is there, underneath.",
    price: 4.99,
    category: "fiction",
    variant: "reader",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&q=80",
    featured: true,
    formats: [
      { label: "Ebook", price: 4.99 },
      { label: "Audiobook", price: 12.99 },
    ],
  },
  {
    id: "p3",
    slug: "serialized-fiction-subscription",
    title: "Serialized Fiction — Monthly",
    description: "New thriller episodes delivered to your inbox every week.",
    price: 7.99,
    category: "fiction",
    variant: "reader",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=500&fit=crop&q=80",
    featured: true,
  },
  {
    id: "p4",
    slug: "audiobook-short-collection",
    title: "Audiobook Short Collection",
    description: "Three dramatic narrations — perfect for a long commute.",
    price: 9.99,
    category: "fiction",
    variant: "reader",
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "p5",
    slug: "thriller-short-story-bundle",
    title: "Short Thriller Bundle — 5 Stories",
    description: "Five bite-sized psychological thrillers. Read in one sitting.",
    price: 3.99,
    category: "fiction",
    variant: "reader",
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=500&fit=crop&q=80",
  },

  // Writer Resources
  {
    id: "p6",
    slug: "thriller-writing-workbook",
    title: "Thriller Writing Workbook",
    description: "200-page guided workbook for plotting psychological thrillers.",
    price: 14.99,
    category: "writer-resources",
    variant: "writer",
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=500&fit=crop&q=80",
    featured: true,
  },
  {
    id: "p7",
    slug: "plot-twist-generator",
    title: "Plot Twist Generator — 200 Prompts",
    description: "Never write a predictable ending again.",
    price: 5.99,
    category: "writer-resources",
    variant: "writer",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=500&fit=crop&q=80",
    featured: true,
  },
  {
    id: "p8",
    slug: "character-development-kit",
    title: "Character Development Kit",
    description: "Deep-dive character sheets, psychology profiles, and backstory templates.",
    price: 9.99,
    category: "writer-resources",
    variant: "writer",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "p9",
    slug: "story-bible-template",
    title: "Story Bible Template",
    description: "The complete world-building and series planning template.",
    price: 12.99,
    category: "writer-resources",
    variant: "writer",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "p10",
    slug: "ai-prompt-pack-thriller",
    title: "AI Prompt Pack — Thriller Edition",
    description: "500 curated prompts for ChatGPT and Claude. Scene starters, dialogue, plot.",
    price: 7.99,
    category: "writer-resources",
    variant: "writer",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=500&fit=crop&q=80",
  },

  // Reader Experiences
  {
    id: "p11",
    slug: "thriller-book-club-kit",
    title: "Thriller Book Club Kit",
    description: "Discussion guides, themed cocktail recipes, and activity cards.",
    price: 8.99,
    category: "reader-experiences",
    variant: "reader",
    badge: "Bestseller",
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&q=80",
    featured: true,
  },
  {
    id: "p13",
    slug: "reading-journal-thriller-edition",
    title: "Reading Journal — Thriller Edition",
    description: "Track your dark reads with suspense-themed prompts and layouts.",
    price: 6.99,
    category: "reader-experiences",
    variant: "reader",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop&q=80",
  },

  // Digital Planners & Kits
  {
    id: "p14",
    slug: "printable-quote-art-set",
    title: "Printable Quote Art — Dark Edition",
    description: "8 atmospheric thriller quotes, print-ready in multiple sizes.",
    price: 4.99,
    category: "digital-planners",
    variant: "reader",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=500&fit=crop&q=80",
    featured: true,
  },
  {
    id: "p15",
    slug: "thriller-tbr-planner",
    title: "Thriller TBR Planner",
    description: "Annual reading planner themed for dark fiction enthusiasts.",
    price: 8.99,
    category: "digital-planners",
    variant: "reader",
    badge: "New",
    imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "p16",
    slug: "author-business-planner",
    title: "Author Business Planner",
    description: "Plan your indie publishing year — launches, marketing, revenue.",
    price: 16.99,
    category: "digital-planners",
    variant: "writer",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop&q=80",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getReaderProducts(): Product[] {
  return products.filter((p) => p.variant === "reader");
}

export function getWriterProducts(): Product[] {
  return products.filter((p) => p.variant === "writer");
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = products.find((p) => p.slug === slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}
