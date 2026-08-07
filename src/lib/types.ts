// Core data model for the Life OS app. Everything is stored locally
// (see lib/storage.ts) — no fields here should assume a server exists.

export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  mood: number; // 1-10
  energy: number; // 1-10
  anxiety: number; // 1-10
  irritability: number; // 1-10
  sleepHours: number;
  symptoms: string[];
  notes: string;
  createdAt: string; // ISO timestamp
}

export interface Medication {
  id: string;
  name: string;
  dose: string;
  schedule: string; // free text, e.g. "Morning", "Morning & Night"
  active: boolean;
  createdAt: string;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  date: string; // YYYY-MM-DD
  taken: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export type DiscoveryCategory = "liked" | "disliked" | "curious" | "value" | "memory";

export interface Discovery {
  id: string;
  date: string;
  title: string;
  category: DiscoveryCategory;
  rating: number; // 0-5, 0 = unrated
  notes: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  color: string;
  targetDaysPerWeek: number;
  archived: boolean;
  createdAt: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string;
}

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  done: boolean;
  dueDate: string | null;
  priority: TaskPriority;
  createdAt: string;
}

export interface ExerciseSet {
  reps: number;
  weight: number;
}

export interface WorkoutExercise {
  name: string;
  sets: ExerciseSet[];
}

export interface Workout {
  id: string;
  date: string;
  name: string;
  exercises: WorkoutExercise[];
  notes: string;
  createdAt: string;
}

export interface BodyMetric {
  id: string;
  date: string;
  weightLbs: number | null;
  bodyFatPct: number | null;
  notes: string;
  createdAt: string;
}
