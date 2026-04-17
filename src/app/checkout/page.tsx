"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, removeItem, totalItems, totalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (totalItems === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag className="h-14 w-14 text-brand-stone/40" />
        <div className="text-center">
          <h1 className="font-serif text-2xl text-brand-cream mb-2">
            Your cart is empty
          </h1>
          <p className="text-brand-stone text-sm mb-6">
            Add something from the shop to get started.
          </p>
          <Button variant="olive" asChild>
            <Link href="/shop">Browse the Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email so we can deliver your order.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email: email.trim() }),
      });

      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to Stripe hosted checkout
      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#111] py-16 px-4">
      <div className="max-w-xl mx-auto">

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.15em] text-brand-gold/70 mb-1">
            Secure Checkout
          </p>
          <h1 className="font-serif text-3xl text-brand-cream">
            Your Order
          </h1>
        </div>

        {/* Cart items */}
        <div className="space-y-3 mb-8">
          {items.map((item) => (
            <div
              key={`${item.slug}::${item.format ?? ""}`}
              className="flex items-center justify-between gap-4 bg-[#1a1a1a] border border-brand-gold/10 rounded-lg px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-brand-cream font-medium text-sm truncate">
                  {item.title}
                </p>
                {item.format && (
                  <p className="text-brand-stone text-xs mt-0.5">
                    {item.format}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-brand-cream font-semibold text-sm">
                  {formatPrice(item.price * item.quantity)}
                </span>
                <button
                  onClick={() => removeItem(item.slug, item.format)}
                  className="text-brand-stone/50 hover:text-brand-wine transition-colors"
                  aria-label={`Remove ${item.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-brand-gold/15 pt-4 mb-8">
          <span className="text-brand-stone uppercase tracking-widest text-xs">
            Total
          </span>
          <span className="font-serif text-xl text-brand-gold font-semibold">
            {formatPrice(totalPrice)}
          </span>
        </div>

        {/* Email + pay */}
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-widest text-brand-stone mb-2"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1a1a1a] border-brand-gold/20 text-brand-cream placeholder:text-brand-stone/40 focus:border-brand-gold/50"
            />
            <p className="text-brand-stone/60 text-xs mt-1.5">
              Your digital products will be delivered here after payment is verified.
            </p>
          </div>

          {error && (
            <p className="text-brand-wine text-sm bg-brand-wine/10 border border-brand-wine/20 rounded px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="olive"
            size="lg"
            className="w-full text-sm tracking-wider uppercase"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Redirecting to payment…
              </>
            ) : (
              <>Pay securely — {formatPrice(totalPrice)}</>
            )}
          </Button>

          <p className="text-center text-xs text-brand-stone/50">
            You'll be taken to Stripe's secure payment page.
            <br />
            No card details are stored on this site.
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/shop"
            className="text-xs text-brand-stone/50 hover:text-brand-stone transition-colors underline underline-offset-4"
          >
            ← Continue shopping
          </Link>
        </div>

      </div>
    </div>
  );
}
