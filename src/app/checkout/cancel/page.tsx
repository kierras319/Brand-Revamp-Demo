import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">

        <div className="w-16 h-16 rounded-full bg-brand-wine/10 border border-brand-wine/30 flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-8 w-8 text-brand-wine" />
        </div>

        <p className="text-xs uppercase tracking-[0.15em] text-brand-stone/60 mb-2">
          Checkout Cancelled
        </p>
        <h1 className="font-serif text-3xl text-brand-cream mb-4">
          No charge was made
        </h1>
        <p className="text-brand-stone leading-relaxed mb-8">
          You left before completing payment. Your cart is still intact —
          head back whenever you're ready.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="olive" asChild>
            <Link href="/checkout">Return to Cart</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/shop">Browse Shop</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
