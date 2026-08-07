"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { HeartPulse, Pill, Plus, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LabeledSlider } from "@/components/lifeos/labeled-slider";
import { EmptyState } from "@/components/lifeos/empty-state";
import { useLocalCollection } from "@/hooks/useLocalCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { genId } from "@/lib/id";
import { formatDateLabel, formatDateLong, lastNDays, todayISO } from "@/lib/dates";
import { SYMPTOM_OPTIONS } from "@/lib/scales";
import type { Medication, MedicationLog, MoodEntry } from "@/lib/types";

function emptyMoodDraft(): Omit<MoodEntry, "id" | "date" | "createdAt"> {
  return {
    mood: 5,
    energy: 5,
    anxiety: 5,
    irritability: 5,
    sleepHours: 7,
    symptoms: [],
    notes: "",
  };
}

export default function MoodPage() {
  const mood = useLocalCollection<MoodEntry>(STORAGE_KEYS.moodEntries);
  const meds = useLocalCollection<Medication>(STORAGE_KEYS.medications);
  const medLogs = useLocalCollection<MedicationLog>(STORAGE_KEYS.medicationLogs);

  const today = todayISO();
  const todayEntry = mood.items.find((e) => e.date === today);
  const [draft, setDraft] = useState(() => emptyMoodDraft());
  const [editing, setEditing] = useState(false);
  const active = todayEntry && !editing ? todayEntry : draft;

  const [newMedOpen, setNewMedOpen] = useState(false);
  const [newMed, setNewMed] = useState({ name: "", dose: "", schedule: "" });

  const chartData = useMemo(() => {
    const days = lastNDays(30);
    return days.map((date) => {
      const entry = mood.items.find((e) => e.date === date);
      return {
        date: formatDateLabel(date),
        mood: entry?.mood ?? null,
        energy: entry?.energy ?? null,
        anxiety: entry?.anxiety ?? null,
      };
    });
  }, [mood.items]);

  function saveCheckIn() {
    if (todayEntry) {
      mood.update(todayEntry.id, { ...active });
    } else {
      mood.add({
        id: genId(),
        date: today,
        createdAt: new Date().toISOString(),
        ...active,
      });
    }
    setEditing(false);
  }

  function toggleSymptom(s: string) {
    const list = active.symptoms.includes(s)
      ? active.symptoms.filter((x) => x !== s)
      : [...active.symptoms, s];
    updateActive({ symptoms: list });
  }

  function updateActive(patch: Partial<Omit<MoodEntry, "id" | "date" | "createdAt">>) {
    if (todayEntry && !editing) {
      setEditing(true);
      setDraft({ ...todayEntry, ...patch });
    } else {
      setDraft((d) => ({ ...d, ...patch }));
    }
  }

  function todayLogFor(medicationId: string) {
    return medLogs.items.find((l) => l.medicationId === medicationId && l.date === today);
  }

  function toggleMedTaken(medicationId: string, taken: boolean) {
    const log = todayLogFor(medicationId);
    if (log) {
      medLogs.update(log.id, { taken });
    } else {
      medLogs.add({ id: genId(), medicationId, date: today, taken });
    }
  }

  function addMedication() {
    if (!newMed.name.trim()) return;
    meds.add({
      id: genId(),
      name: newMed.name.trim(),
      dose: newMed.dose.trim(),
      schedule: newMed.schedule.trim(),
      active: true,
      createdAt: new Date().toISOString(),
    });
    setNewMed({ name: "", dose: "", schedule: "" });
    setNewMedOpen(false);
  }

  const activeMeds = meds.items.filter((m) => m.active);
  const recentEntries = [...mood.items].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 10);

  if (!mood.hydrated) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Mood &amp; Medication</h1>
        <p className="text-muted-foreground">{formatDateLong(today)}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <HeartPulse className="h-5 w-5 text-primary" />
            Today&apos;s check-in
          </CardTitle>
          <CardDescription>
            {todayEntry && !editing
              ? "Logged for today — adjust anything below to update it."
              : "Take a minute to check in with yourself."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <LabeledSlider label="Mood" value={active.mood} onChange={(v) => updateActive({ mood: v })} />
            <LabeledSlider label="Energy" value={active.energy} onChange={(v) => updateActive({ energy: v })} />
            <LabeledSlider label="Anxiety" value={active.anxiety} onChange={(v) => updateActive({ anxiety: v })} />
            <LabeledSlider
              label="Irritability"
              value={active.irritability}
              onChange={(v) => updateActive({ irritability: v })}
            />
          </div>

          <div className="max-w-xs space-y-2">
            <Label htmlFor="sleep">Hours of sleep</Label>
            <Input
              id="sleep"
              type="number"
              min={0}
              max={24}
              step={0.5}
              value={active.sleepHours}
              onChange={(e) => updateActive({ sleepHours: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label>Symptoms today (optional)</Label>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_OPTIONS.map((s) => (
                <Badge
                  key={s}
                  variant={active.symptoms.includes(s) ? "default" : "outline"}
                  className="cursor-pointer select-none"
                  onClick={() => toggleSymptom(s)}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mood-notes">Notes</Label>
            <Textarea
              id="mood-notes"
              placeholder="Anything you want to remember about today..."
              value={active.notes}
              onChange={(e) => updateActive({ notes: e.target.value })}
            />
          </div>

          <Button onClick={saveCheckIn}>
            {todayEntry ? "Update check-in" : "Save check-in"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Pill className="h-5 w-5 text-primary" />
              Medications
            </CardTitle>
            <CardDescription>Track whether you took each one today.</CardDescription>
          </div>
          <Dialog open={newMedOpen} onOpenChange={setNewMedOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add medication</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="med-name">Name</Label>
                  <Input
                    id="med-name"
                    value={newMed.name}
                    onChange={(e) => setNewMed((m) => ({ ...m, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="med-dose">Dose</Label>
                  <Input
                    id="med-dose"
                    placeholder="e.g. 100mg"
                    value={newMed.dose}
                    onChange={(e) => setNewMed((m) => ({ ...m, dose: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="med-schedule">Schedule</Label>
                  <Input
                    id="med-schedule"
                    placeholder="e.g. Morning & night"
                    value={newMed.schedule}
                    onChange={(e) => setNewMed((m) => ({ ...m, schedule: e.target.value }))}
                  />
                </div>
                <Button onClick={addMedication} className="w-full">
                  Save medication
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {activeMeds.length === 0 ? (
            <EmptyState
              icon={Pill}
              title="No medications yet"
              description="Add your current medications to track whether you've taken them each day."
            />
          ) : (
            <div className="space-y-3">
              {activeMeds.map((m) => {
                const log = todayLogFor(m.id);
                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {[m.dose, m.schedule].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {log?.taken ? "Taken" : "Not yet"}
                      </span>
                      <Switch
                        checked={log?.taken ?? false}
                        onCheckedChange={(checked) => toggleMedTaken(m.id, checked)}
                      />
                      <button
                        aria-label={`Remove ${m.name}`}
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => meds.update(m.id, { active: false })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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
          <CardTitle className="text-lg">30-day trend</CardTitle>
          <CardDescription>Mood, energy, and anxiety over the last month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={20} />
                <YAxis domain={[1, 10]} tick={{ fontSize: 12 }} width={24} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="hsl(var(--primary))" connectNulls dot={false} />
                <Line type="monotone" dataKey="energy" stroke="hsl(var(--accent))" connectNulls dot={false} />
                <Line
                  type="monotone"
                  dataKey="anxiety"
                  stroke="hsl(var(--destructive))"
                  connectNulls
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          {recentEntries.length === 0 ? (
            <EmptyState
              icon={HeartPulse}
              title="No check-ins yet"
              description="Your daily check-ins will show up here."
            />
          ) : (
            <div className="divide-y divide-border">
              {recentEntries.map((e) => (
                <div key={e.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="font-medium">{formatDateLabel(e.date)}</p>
                    <p className="text-sm text-muted-foreground">
                      Mood {e.mood} · Energy {e.energy} · Anxiety {e.anxiety} · Sleep {e.sleepHours}h
                    </p>
                    {e.symptoms.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {e.symptoms.map((s) => (
                          <Badge key={s} variant="secondary" className="text-[11px]">
                            {s}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {e.notes && <p className="mt-1 text-sm">{e.notes}</p>}
                  </div>
                  <button
                    aria-label="Delete entry"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => mood.remove(e.id)}
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
