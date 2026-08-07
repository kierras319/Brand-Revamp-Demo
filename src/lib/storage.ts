// SSR-safe localStorage persistence. All data lives only in the browser —
// there is no server/database in this app by design (see Settings > Privacy).

const PREFIX = "lifeos:";

export const STORAGE_KEYS = {
  moodEntries: "mood-entries",
  medications: "medications",
  medicationLogs: "medication-logs",
  journalEntries: "journal-entries",
  discoveries: "discoveries",
  habits: "habits",
  habitCompletions: "habit-completions",
  tasks: "tasks",
  workouts: "workouts",
  bodyMetrics: "body-metrics",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function loadCollection<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function saveCollection<T>(key: string, items: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREFIX + key, JSON.stringify(items));
}

export function exportAllData(): string {
  const data: Record<string, unknown> = {
    exportedAt: new Date().toISOString(),
    version: 1,
  };
  for (const key of Object.values(STORAGE_KEYS)) {
    data[key] = loadCollection(key);
  }
  return JSON.stringify(data, null, 2);
}

export function importAllData(json: string) {
  const data = JSON.parse(json) as Record<string, unknown>;
  for (const key of Object.values(STORAGE_KEYS)) {
    const value = data[key];
    if (Array.isArray(value)) {
      saveCollection(key, value);
    }
  }
}

export function clearAllData() {
  if (typeof window === "undefined") return;
  for (const key of Object.values(STORAGE_KEYS)) {
    window.localStorage.removeItem(PREFIX + key);
  }
}
