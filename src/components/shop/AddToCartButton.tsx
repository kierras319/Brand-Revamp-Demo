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
      variant={added ? "charcoal" : "olive"}
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
