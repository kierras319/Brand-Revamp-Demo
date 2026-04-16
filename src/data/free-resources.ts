import type { FreeResource } from "@/lib/types";

export const freeResources: FreeResource[] = [
  {
    id: "r1",
    slug: "the-wrong-door-short-story",
    title: "The Wrong Door",
    description:
      "A complete short psychological thriller — 4,000 words of tension, atmosphere, and a twist you won't see coming.",
    type: "short-story",
    typeLabel: "Short Story",
    imageUrl:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop&q=80",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: "r2",
    slug: "the-silent-hour-chapter-one",
    title: "The Silent Hour — Chapter One",
    description:
      "Read the first chapter of my debut novel before you buy. Fall into Mara Cole's world.",
    type: "first-chapter",
    typeLabel: "First Chapter",
    imageUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop&q=80",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: "r3",
    slug: "what-we-buried-chapter-one",
    title: "What We Buried — Chapter One",
    description:
      "The opening chapter of my domestic thriller about sisters and the secrets families keep.",
    type: "first-chapter",
    typeLabel: "First Chapter",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&q=80",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: "r4",
    slug: "50-dark-writing-prompts",
    title: "50 Dark Psychological Thriller Writing Prompts",
    description:
      "Fifty atmospheric, morally complex prompts to spark your next story. Free PDF download.",
    type: "writing-prompt",
    typeLabel: "Writing Prompts",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop&q=80",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: "r5",
    slug: "character-obsession-prompts",
    title: "10 Character Obsession Prompts",
    description:
      "Dive into the psychology of your characters with these ten deep-dive obsession prompts.",
    type: "writing-prompt",
    typeLabel: "Writing Prompts",
    imageUrl:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=300&fit=crop&q=80",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: "r6",
    slug: "thriller-reading-tracker",
    title: "Thriller Reading Tracker — Printable",
    description:
      "Track your dark reads in style. Includes space for ratings, quotes, and trigger notes.",
    type: "printable",
    typeLabel: "Printable",
    imageUrl:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop&q=80",
    downloadUrl: "#",
    featured: true,
  },
  {
    id: "r7",
    slug: "dark-quote-art-printable",
    title: "Dark Quote Art — 3 Designs",
    description:
      "Three print-ready quote art designs featuring atmospheric lines from psychological thrillers.",
    type: "printable",
    typeLabel: "Printable",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80",
    downloadUrl: "#",
    featured: false,
  },
  {
    id: "r8",
    slug: "last-night-short-story",
    title: "Last Night",
    description:
      "A woman wakes with no memory of the night before. Short psychological fiction — 2,500 words.",
    type: "short-story",
    typeLabel: "Short Story",
    imageUrl:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=400&h=300&fit=crop&q=80",
    downloadUrl: "#",
    featured: false,
  },
];

export function getFeaturedResources(): FreeResource[] {
  return freeResources.filter((r) => r.featured);
}

export function getResourcesByType(type: string): FreeResource[] {
  if (type === "all") return freeResources;
  return freeResources.filter((r) => r.type === type);
}

export function getResourceBySlug(slug: string): FreeResource | undefined {
  return freeResources.find((r) => r.slug === slug);
}
