import type { NavLink, ShopCategory } from "./types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Free Library", href: "/free-library" },
  { label: "Reader Experiences", href: "/shop/reader-experiences" },
  { label: "Writer's Resources", href: "/shop/writer-resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    id: "fiction",
    label: "Fiction",
    description: "Dark, immersive psychological thrillers and serialized stories.",
    tagline: "Stories that refuse to let you go.",
    href: "/shop/fiction",
  },
  {
    id: "writer-resources",
    label: "Writer Resources",
    description: "Tools, workbooks, and kits for writers of psychological thrillers.",
    tagline: "Craft the darkness within your stories.",
    href: "/shop/writer-resources",
  },
  {
    id: "reader-experiences",
    label: "Reader Experiences",
    description: "Book club kits, escape rooms, and immersive extras for readers.",
    tagline: "Go deeper into the story.",
    href: "/shop/reader-experiences",
  },
  {
    id: "digital-planners",
    label: "Digital Planners & Kits",
    description: "Beautiful printable planners and themed digital kits.",
    tagline: "Organize your reading life in style.",
    href: "/shop/digital-planners",
  },
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
  { label: "TikTok", href: "https://tiktok.com", icon: "Music2" },
  { label: "Pinterest", href: "https://pinterest.com", icon: "Pinterest" },
  { label: "Substack", href: "https://substack.com", icon: "Mail" },
];

export const CONTACT_EMAIL = "hello@escapistfiction.com";

export const BLOG_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "writing-craft", label: "Writing Craft" },
  { id: "book-news", label: "Book News" },
  { id: "reader-life", label: "Reader Life" },
  { id: "behind-the-story", label: "Behind the Story" },
  { id: "book-recommendations", label: "Book Recs" },
];

export const RESOURCE_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "short-story", label: "Short Stories" },
  { id: "first-chapter", label: "First Chapters" },
  { id: "writing-prompt", label: "Writing Prompts" },
  { id: "printable", label: "Printables" },
];
