"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Dumbbell, Plus, Scale, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/lifeos/empty-state";
import { useLocalCollection } from "@/hooks/useLocalCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { genId } from "@/lib/id";
import { formatDateLabel, todayISO } from "@/lib/dates";
import type { BodyMetric, Workout, WorkoutExercise } from "@/lib/types";

export default function FitnessPage() {
  const workouts = useLocalCollection<Workout>(STORAGE_KEYS.workouts);
  const metrics = useLocalCollection<BodyMetric>(STORAGE_KEYS.bodyMetrics);

  const today = todayISO();

  const [workoutName, setWorkoutName] = useState("");
  const [workoutNotes, setWorkoutNotes] = useState("");
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [exerciseName, setExerciseName] = useState("");
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(0);

  const [weightInput, setWeightInput] = useState("");
  const [bodyFatInput, setBodyFatInput] = useState("");

  function addSetToExercise() {
    if (!exerciseName.trim()) return;
    setExercises((prev) => {
      const existing = prev.find((e) => e.name === exerciseName.trim());
      if (existing) {
        return prev.map((e) =>
          e === existing ? { ...e, sets: [...e.sets, { reps, weight }] } : e
        );
      }
      return [...prev, { name: exerciseName.trim(), sets: [{ reps, weight }] }];
    });
  }

  function removeExercise(name: string) {
    setExercises((prev) => prev.filter((e) => e.name !== name));
  }

  function saveWorkout() {
    if (exercises.length === 0) return;
    workouts.add({
      id: genId(),
      date: today,
      name: workoutName.trim() || "Workout",
      exercises,
      notes: workoutNotes.trim(),
      createdAt: new Date().toISOString(),
    });
    setWorkoutName("");
    setWorkoutNotes("");
    setExercises([]);
  }

  function logWeight() {
    const weightLbs = weightInput ? Number(weightInput) : null;
    const bodyFatPct = bodyFatInput ? Number(bodyFatInput) : null;
    if (weightLbs === null && bodyFatPct === null) return;
    const existing = metrics.items.find((m) => m.date === today);
    if (existing) {
      metrics.update(existing.id, { weightLbs, bodyFatPct });
    } else {
      metrics.add({
        id: genId(),
        date: today,
        weightLbs,
        bodyFatPct,
        notes: "",
        createdAt: new Date().toISOString(),
      });
    }
    setWeightInput("");
    setBodyFatInput("");
  }

  const chartData = useMemo(
    () =>
      [...metrics.items]
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .slice(-60)
        .map((m) => ({
          date: formatDateLabel(m.date),
          weight: m.weightLbs,
          bodyFat: m.bodyFatPct,
        })),
    [metrics.items]
  );

  const recentWorkouts = [...workouts.items].sort((a, b) => (a.date < b.date ? 1 : -1));
  const recentMetrics = [...metrics.items].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 10);

  if (!workouts.hydrated || !metrics.hydrated) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Fitness &amp; Body</h1>
        <p className="text-muted-foreground">Building strength, one session at a time.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Dumbbell className="h-5 w-5 text-primary" />
            Log a workout
          </CardTitle>
          <CardDescription>Add exercises with sets, reps, and weight.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workout-name">Workout name</Label>
            <Input
              id="workout-name"
              placeholder="e.g. Push day, Leg day"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-end">
            <div className="space-y-2">
              <Label htmlFor="exercise-name">Exercise</Label>
              <Input
                id="exercise-name"
                placeholder="e.g. Bench press"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reps">Reps</Label>
              <Input
                id="reps"
                type="number"
                min={0}
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (lbs)</Label>
              <Input
                id="weight"
                type="number"
                min={0}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            <Button variant="outline" onClick={addSetToExercise} disabled={!exerciseName.trim()}>
              <Plus className="h-4 w-4" /> Add set
            </Button>
          </div>

          {exercises.length > 0 && (
            <div className="space-y-2">
              {exercises.map((e) => (
                <div
                  key={e.name}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="font-medium">{e.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {e.sets.map((s) => `${s.reps}×${s.weight}lb`).join(", ")}
                    </p>
                  </div>
                  <button
                    aria-label={`Remove ${e.name}`}
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeExercise(e.name)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="workout-notes">Notes (optional)</Label>
            <Textarea
              id="workout-notes"
              placeholder="How did it feel?"
              value={workoutNotes}
              onChange={(e) => setWorkoutNotes(e.target.value)}
            />
          </div>

          <Button onClick={saveWorkout} disabled={exercises.length === 0}>
            Save workout
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Scale className="h-5 w-5 text-primary" />
            Body weight
          </CardTitle>
          <CardDescription>Log today&apos;s weight to track your trend over time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div className="space-y-2">
              <Label htmlFor="weight-lbs">Weight (lbs)</Label>
              <Input
                id="weight-lbs"
                type="number"
                step={0.1}
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body-fat">Body fat % (optional)</Label>
              <Input
                id="body-fat"
                type="number"
                step={0.1}
                value={bodyFatInput}
                onChange={(e) => setBodyFatInput(e.target.value)}
              />
            </div>
            <Button onClick={logWeight}>Log</Button>
          </div>

          {chartData.length > 0 && (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={20} />
                  <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} width={40} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="hsl(var(--primary))"
                    connectNulls
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {recentMetrics.length === 0 ? (
            <EmptyState
              icon={Scale}
              title="No weigh-ins yet"
              description="Log your weight regularly to see your trend over time."
            />
          ) : (
            <div className="divide-y divide-border">
              {recentMetrics.map((m) => (
                <div key={m.id} className="flex items-center justify-between py-2 text-sm">
                  <span>{formatDateLabel(m.date)}</span>
                  <span className="text-muted-foreground">
                    {m.weightLbs != null && `${m.weightLbs} lbs`}
                    {m.bodyFatPct != null && ` · ${m.bodyFatPct}% BF`}
                  </span>
                  <button
                    aria-label="Delete entry"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => metrics.remove(m.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Workout history</CardTitle>
        </CardHeader>
        <CardContent>
          {recentWorkouts.length === 0 ? (
            <EmptyState
              icon={Dumbbell}
              title="No workouts logged yet"
              description="Your workout history will show up here."
            />
          ) : (
            <div className="divide-y divide-border">
              {recentWorkouts.map((w) => (
                <div key={w.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium">
                      {w.name} <span className="font-normal text-muted-foreground">· {formatDateLabel(w.date)}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {w.exercises.map((e) => e.name).join(", ")}
                    </p>
                    {w.notes && <p className="mt-1 text-sm">{w.notes}</p>}
                  </div>
                  <button
                    aria-label="Delete workout"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => workouts.remove(w.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
