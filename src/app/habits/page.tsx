"use client";

import { useState } from "react";
import { CheckSquare, ListTodo, Plus, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/lifeos/empty-state";
import { cn } from "@/lib/utils";
import { useLocalCollection } from "@/hooks/useLocalCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { genId } from "@/lib/id";
import { currentStreak, formatWeekday, lastNDays, todayISO } from "@/lib/dates";
import type { Habit, HabitCompletion, Task, TaskPriority } from "@/lib/types";

const PRIORITY_ORDER: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };
const PRIORITY_LABEL: Record<TaskPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export default function HabitsPage() {
  const habits = useLocalCollection<Habit>(STORAGE_KEYS.habits);
  const completions = useLocalCollection<HabitCompletion>(STORAGE_KEYS.habitCompletions);
  const tasks = useLocalCollection<Task>(STORAGE_KEYS.tasks);

  const [newHabitOpen, setNewHabitOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>("medium");

  const days = lastNDays(7);
  const today = todayISO();

  function isDone(habitId: string, date: string) {
    return completions.items.some((c) => c.habitId === habitId && c.date === date);
  }

  function toggleDay(habitId: string, date: string) {
    const existing = completions.items.find((c) => c.habitId === habitId && c.date === date);
    if (existing) {
      completions.remove(existing.id);
    } else {
      completions.add({ id: genId(), habitId, date });
    }
  }

  function addHabit() {
    if (!newHabitName.trim()) return;
    habits.add({
      id: genId(),
      name: newHabitName.trim(),
      color: "primary",
      targetDaysPerWeek: 7,
      archived: false,
      createdAt: new Date().toISOString(),
    });
    setNewHabitName("");
    setNewHabitOpen(false);
  }

  function addTask() {
    if (!newTaskTitle.trim()) return;
    tasks.add({
      id: genId(),
      title: newTaskTitle.trim(),
      done: false,
      dueDate: null,
      priority: newTaskPriority,
      createdAt: new Date().toISOString(),
    });
    setNewTaskTitle("");
  }

  const activeHabits = habits.items.filter((h) => !h.archived);
  const openTasks = tasks.items
    .filter((t) => !t.done)
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
  const doneTasks = tasks.items.filter((t) => t.done);

  if (!habits.hydrated || !tasks.hydrated) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Habits &amp; Tasks</h1>
        <p className="text-muted-foreground">Small, consistent wins build momentum.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckSquare className="h-5 w-5 text-primary" />
              Habits
            </CardTitle>
            <CardDescription>Check off each day you follow through.</CardDescription>
          </div>
          <Dialog open={newHabitOpen} onOpenChange={setNewHabitOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" /> Add habit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New habit</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="habit-name">Name</Label>
                  <Input
                    id="habit-name"
                    placeholder="e.g. Take a walk, Drink water, Meditate"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                  />
                </div>
                <Button onClick={addHabit} className="w-full">
                  Save habit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {activeHabits.length === 0 ? (
            <EmptyState
              icon={CheckSquare}
              title="No habits yet"
              description="Add a small habit you want to build — you can always add more later."
            />
          ) : (
            <div className="space-y-4">
              {activeHabits.map((h) => {
                const streak = currentStreak(
                  completions.items.filter((c) => c.habitId === h.id).map((c) => c.date)
                );
                return (
                  <div key={h.id} className="rounded-lg border border-border p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-medium">{h.name}</p>
                      <div className="flex items-center gap-2">
                        {streak > 0 && (
                          <Badge variant="accent" className="text-[11px]">
                            🔥 {streak}-day streak
                          </Badge>
                        )}
                        <button
                          aria-label={`Remove ${h.name}`}
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => habits.update(h.id, { archived: true })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {days.map((date) => {
                        const done = isDone(h.id, date);
                        return (
                          <button
                            key={date}
                            onClick={() => toggleDay(h.id, date)}
                            className={cn(
                              "flex flex-col items-center gap-1 rounded-md border py-2 text-xs transition-colors",
                              done
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:bg-muted",
                              date === today && "ring-2 ring-ring ring-offset-1 ring-offset-background"
                            )}
                          >
                            <span>{formatWeekday(date)}</span>
                            <span>{done ? "✓" : "·"}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ListTodo className="h-5 w-5 text-primary" />
            Tasks
          </CardTitle>
          <CardDescription>Keep it simple — just what matters today.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Add a task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <Select value={newTaskPriority} onValueChange={(v) => setNewTaskPriority(v as TaskPriority)}>
              <SelectTrigger className="sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addTask} disabled={!newTaskTitle.trim()}>
              Add
            </Button>
          </div>

          {openTasks.length === 0 && doneTasks.length === 0 ? (
            <EmptyState
              icon={ListTodo}
              title="No tasks yet"
              description="Add today's tasks above to keep momentum going."
            />
          ) : (
            <div className="space-y-1">
              {openTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2"
                >
                  <label className="flex flex-1 items-center gap-3">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={(e) => tasks.update(t.id, { done: e.target.checked })}
                      className="h-4 w-4 accent-primary"
                    />
                    <span>{t.title}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <Badge variant={t.priority === "high" ? "destructive" : "outline"} className="text-[11px]">
                      {PRIORITY_LABEL[t.priority]}
                    </Badge>
                    <button
                      aria-label="Delete task"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => tasks.remove(t.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              {doneTasks.length > 0 && (
                <div className="pt-3">
                  <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Done</p>
                  {doneTasks.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between gap-3 rounded-md px-3 py-2"
                    >
                      <label className="flex flex-1 items-center gap-3">
                        <input
                          type="checkbox"
                          checked={t.done}
                          onChange={(e) => tasks.update(t.id, { done: e.target.checked })}
                          className="h-4 w-4 accent-primary"
                        />
                        <span className="text-muted-foreground line-through">{t.title}</span>
                      </label>
                      <button
                        aria-label="Delete task"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => tasks.remove(t.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
