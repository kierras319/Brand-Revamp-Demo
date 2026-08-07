"use client";

import { useCallback, useEffect, useState } from "react";
import { loadCollection, saveCollection } from "@/lib/storage";

interface WithId {
  id: string;
}

export function useLocalCollection<T extends WithId>(key: string) {
  const [items, setItems] = useState<T[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadCollection<T>(key));
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (hydrated) saveCollection(key, items);
  }, [key, items, hydrated]);

  const add = useCallback((item: T) => {
    setItems((prev) => [item, ...prev]);
  }, []);

  const update = useCallback((id: string, patch: Partial<T>) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const upsertByMatch = useCallback(
    (match: (it: T) => boolean, make: () => T, patch: Partial<T>) => {
      setItems((prev) => {
        const existing = prev.find(match);
        if (existing) {
          return prev.map((it) => (it === existing ? { ...it, ...patch } : it));
        }
        return [{ ...make(), ...patch }, ...prev];
      });
    },
    []
  );

  return { items, hydrated, add, update, remove, upsertByMatch, setItems };
}
