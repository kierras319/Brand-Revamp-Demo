"use client";

import Link from "next/link";
import {
  BookOpen,
  CheckSquare,
  Dumbbell,
  HeartPulse,
  ListTodo,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocalCollection } from "@/hooks/useLocalCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { genId } from "@/lib/id";
import { currentStreak, formatDateLabel, formatDateLong, todayISO } from "@/lib/dates";
import { JOURNAL_PROMPTS } from "@/lib/scales";
import type {
  BodyMetric,
  Habit,
  HabitCompletion,
  JournalEntry,
  Medication,
  MedicationLog,
  MoodEntry,
  Task,
  Workout,
} from "@/lib/types";

function promptForDate(dateISO: string) {
  const seed = dateISO.split("-").join("");
  return JOURNAL_PROMPTS[Number(seed) % JOURNAL_PROMPTS.length];
}

export default function DashboardPage() {
  const mood = useLocalCollection<MoodEntry>(STORAGE_KEYS.moodEntries);
  const meds = useLocalCollection<Medication>(STORAGE_KEYS.medications);
  const medLogs = useLocalCollection<MedicationLog>(STORAGE_KEYS.medicationLogs);
  const habits = useLocalCollection<Habit>(STORAGE_KEYS.habits);
  const completions = useLocalCollection<HabitCompletion>(STORAGE_KEYS.habitCompletions);
  const tasks = useLocalCollection<Task>(STORAGE_KEYS.tasks);
  const journal = useLocalCollection<JournalEntry>(STORAGE_KEYS.journalEntries);
  const workouts = useLocalCollection<Workout>(STORAGE_KEYS.workouts);
  const metrics = useLocalCollection<BodyMetric>(STORAGE_KEYS.bodyMetrics);

  const today = todayISO();
  const todayMood = mood.items.find((e) => e.date === today);
  const activeMeds = meds.items.filter((m) => m.active);
  const takenCount = activeMeds.filter((m) =>
    medLogs.items.some((l) => l.medicationId === m.id && l.date === today && l.taken)
  ).length;

  const activeHabits = habits.items.filter((h) => !h.archived);
  const doneToday = (habitId: string) =>
    completions.items.some((c) => c.habitId === habitId && c.date === today);
  function toggleHabit(habitId: string) {
    const existing = completions.items.find((c) => c.habitId === habitId && c.date === today);
    if (existing) completions.remove(existing.id);
    else completions.add({ id: genId(), habitId, date: today });
  }

  const openTasks = tasks.items.filter((t) => !t.done).slice(0, 5);
  function toggleTask(id: string, done: boolean) {
    tasks.update(id, { done });
  }

  const journalStreak = currentStreak(journal.items.map((e) => e.date));
  const wroteToday = journal.items.some((e) => e.date === today);

  const lastMetric = [...metrics.items].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  const lastWorkout = [...workouts.items].sort((a, b) => (a.date < b.date ? 1 : -1))[0];

  const hydrated =
    mood.hydrated &&
    meds.hydrated &&
    habits.hydrated &&
    tasks.hydrated &&
    journal.hydrated &&
    workouts.hydrated &&
    metrics.hydrated;

  if (!hydrated) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Today</h1>
        <p className="text-muted-foreground">{formatDateLong(today)}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <HeartPulse className="h-4 w-4 text-primary" />
              Mood &amp; Medication
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/mood">Open</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayMood ? (
              <p className="text-sm text-muted-foreground">
                Mood {todayMood.mood} · Energy {todayMood.energy} · Anxiety {todayMood.anxiety}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">You haven&apos;t checked in yet today.</p>
            )}
            {activeMeds.length > 0 && (
              <p className="flex items-center gap-2 text-sm">
                <Pill className="h-4 w-4 text-muted-foreground" />
                {takenCount}/{activeMeds.length} medications taken today
              </p>
            )}
            {!todayMood && (
              <Button size="sm" asChild>
                <Link href="/mood">Check in</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckSquare className="h-4 w-4 text-primary" />
              Habits today
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/habits">Open</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {activeHabits.length === 0 ? (
              <p className="text-sm text-muted-foreground">No habits yet — add one to get started.</p>
            ) : (
              <div className="space-y-2">
                {activeHabits.slice(0, 5).map((h) => (
                  <label key={h.id} className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={doneToday(h.id)}
                      onChange={() => toggleHabit(h.id)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className={doneToday(h.id) ? "text-muted-foreground line-through" : ""}>
                      {h.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <ListTodo className="h-4 w-4 text-primary" />
              Tasks
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/habits">Open</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {openTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing on your list — nice and clear.</p>
            ) : (
              <div className="space-y-2">
                {openTasks.map((t) => (
                  <label key={t.id} className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={(e) => toggleTask(t.id, e.target.checked)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span>{t.title}</span>
                    {t.priority === "high" && (
                      <Badge variant="destructive" className="text-[10px]">
                        High
                      </Badge>
                    )}
                  </label>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-primary" />
              Journal
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/journal">Open</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm italic text-muted-foreground">&ldquo;{promptForDate(today)}&rdquo;</p>
            <p className="text-sm text-muted-foreground">
              {wroteToday
                ? "You've written today. Nice."
                : journalStreak > 0
                  ? `${journalStreak}-day streak — don't break it.`
                  : "Take a few minutes to reflect."}
            </p>
            {!wroteToday && (
              <Button size="sm" asChild>
                <Link href="/journal">Write today</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <Dumbbell className="h-4 w-4 text-primary" />
              Fitness &amp; Body
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/fitness">Open</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <p className="text-sm text-muted-foreground">
                {lastMetric
                  ? `Last weigh-in: ${lastMetric.weightLbs ?? "—"} lbs on ${formatDateLabel(lastMetric.date)}`
                  : "No weight logged yet."}
              </p>
              <p className="text-sm text-muted-foreground">
                {lastWorkout
                  ? `Last workout: ${lastWorkout.name} on ${formatDateLabel(lastWorkout.date)}`
                  : "No workouts logged yet."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
