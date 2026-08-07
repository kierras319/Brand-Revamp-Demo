export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgoISO(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

/** Returns an array of `n` ISO dates ending today, oldest first. */
export function lastNDays(n: number): string[] {
  return Array.from({ length: n }, (_, i) => daysAgoISO(n - 1 - i));
}

export function formatDateLabel(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatDateLong(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatWeekday(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

/** Consecutive days (ending today or yesterday) present in `dates`. */
export function currentStreak(dates: string[]): number {
  const set = new Set(dates);
  let streak = 0;
  let cursor = new Date();
  // Allow the streak to still "count" if today just hasn't happened yet.
  if (!set.has(todayISO())) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
