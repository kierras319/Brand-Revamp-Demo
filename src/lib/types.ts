export type ProductCategory =
  | "fiction"
  | "writer-resources"
  | "reader-experiences"
  | "digital-planners";

export type ProductVariant = "reader" | "writer";

export interface ProductFormat {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  overview?: string;
  authorNote?: string;
  price: number;
  category: ProductCategory;
  variant: ProductVariant;
  badge?: "New" | "Bestseller" | "Coming Soon" | "Free";
  imageUrl: string;
  featured?: boolean;
  formats?: ProductFormat[];
}

export type BookStatus = "available" | "coming-soon";

export interface Book {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  synopsis: string;
  overview?: string;
  authorNote?: string;
  coverUrl: string;
  genre: string;
  pages?: number;
  formats: string[];
  formatPricing?: ProductFormat[];
  purchaseUrl?: string;
  status: BookStatus;
  publishDate?: string;
  featured?: boolean;
}

export type BlogCategory =
  | "writing-craft"
  | "book-news"
  | "reader-life"
  | "behind-the-story"
  | "book-recommendations";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  categoryLabel: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  featured?: boolean;
  readingTime: string;
}


export interface NavLink {
  label: string;
  href: string;
}

export interface ShopCategory {
  id: ProductCategory;
  label: string;
  description: string;
  tagline: string;
  href: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  source?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
  recommended?: boolean;
}

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  format?: string;
  imageUrl?: string;
  quantity: number;
}

export type OrderStatus = "pending" | "paid" | "fulfilled" | "failed" | "refunded";

export interface OrderItem {
  slug: string;
  title: string;
  price: number;
  format?: string;
  quantity: number;
}

export interface Order {
  id: string;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  items: OrderItem[];
  customerEmail: string;
  customerName?: string;
  amountTotal: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  paidAt?: string;
  fulfilledAt?: string;
  failedAt?: string;
  refundedAt?: string;
  fulfillmentEmailSent: boolean;
}
