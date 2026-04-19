"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Check, Zap } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
  format?: string;
  price?: number;
  className?: string;
  size?: "default" | "sm" | "lg";
  buyNow?: boolean;
}

export function AddToCartButton({
  product,
  format,
  price,
  className,
  size = "default",
  buyNow = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const payhipUrl = product.payhipUrl;

  // ── Payhip path ─────────────────────────────────────────────────────────────
  if (payhipUrl) {
    if (buyNow) {
      return (
        <a
          href={payhipUrl}
          className={cn(
            "payhip-buy-button inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-200",
            "border border-brand-wine/70 text-brand-wine hover:bg-brand-wine hover:text-brand-cream rounded-sm",
            size === "lg" ? "px-10 py-3 text-sm" : size === "sm" ? "px-4 py-1.5 text-xs" : "px-6 py-2 text-sm",
            className
          )}
          data-theme="none"
        >
          <Zap className="h-4 w-4" />
          Buy Now
        </a>
      );
    }

    return (
      <a
        href={payhipUrl}
        className={cn(
          "payhip-buy-button inline-flex items-center justify-center gap-1.5 font-medium transition-all duration-200",
          "bg-brand-wine text-brand-cream hover:bg-brand-wine/90 rounded-sm",
          size === "lg" ? "w-full px-10 py-3 text-sm" : size === "sm" ? "w-full px-4 py-1.5 text-xs" : "px-6 py-2 text-sm",
          className
        )}
        data-theme="none"
      >
        <ShoppingCart className="h-4 w-4" />
        Buy Now
      </a>
    );
  }

  // ── Fallback: existing cart (for products not yet on Payhip) ─────────────────
  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: price ?? product.price,
      format,
      imageUrl: product.imageUrl,
    });

    if (buyNow) {
      router.push("/checkout");
      return;
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (buyNow) {
    return (
      <Button
        variant="olive-outline"
        size={size}
        onClick={handleAdd}
        className={cn("transition-all duration-200", className)}
      >
        <Zap className="h-4 w-4 mr-1.5" />
        Buy Now
      </Button>
    );
  }

  return (
    <Button
      variant={added ? "secondary" : "olive"}
      size={size}
      onClick={handleAdd}
      className={cn("transition-all duration-200", className)}
    >
      {added ? (
        <>
          <Check className="h-4 w-4 mr-1.5" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-1.5" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
