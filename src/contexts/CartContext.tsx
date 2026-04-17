"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (slug: string, format?: string) => void;
  updateQuantity: (slug: string, quantity: number, format?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "ef_cart";

function itemKey(slug: string, format?: string) {
  return format ? `${slug}::${format}` : slug;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, hydrated]);

  const addItem = useCallback(
    (incoming: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = incoming.quantity ?? 1;
      setItems((prev) => {
        const key = itemKey(incoming.slug, incoming.format);
        const existing = prev.find(
          (i) => itemKey(i.slug, i.format) === key
        );
        if (existing) {
          return prev.map((i) =>
            itemKey(i.slug, i.format) === key
              ? { ...i, quantity: i.quantity + qty }
              : i
          );
        }
        return [...prev, { ...incoming, quantity: qty }];
      });
    },
    []
  );

  const removeItem = useCallback((slug: string, format?: string) => {
    const key = itemKey(slug, format);
    setItems((prev) => prev.filter((i) => itemKey(i.slug, i.format) !== key));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, quantity: number, format?: string) => {
      const key = itemKey(slug, format);
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter((i) => itemKey(i.slug, i.format) !== key)
        );
      } else {
        setItems((prev) =>
          prev.map((i) =>
            itemKey(i.slug, i.format) === key ? { ...i, quantity } : i
          )
        );
      }
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
