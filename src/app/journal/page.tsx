"use client";

import { useMemo, useState } from "react";
import { BookOpen, Shuffle, Sparkles, Star, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/lifeos/empty-state";
import { useLocalCollection } from "@/hooks/useLocalCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { genId } from "@/lib/id";
import { currentStreak, formatDateLabel, formatDateLong, todayISO } from "@/lib/dates";
import { DISCOVERY_CATEGORIES, JOURNAL_PROMPTS } from "@/lib/scales";
import type { Discovery, DiscoveryCategory, JournalEntry } from "@/lib/types";

function promptForDate(dateISO: string) {
  const seed = dateISO.split("-").join("");
  const idx = Number(seed) % JOURNAL_PROMPTS.length;
  return JOURNAL_PROMPTS[idx];
}

export default function JournalPage() {
  const journal = useLocalCollection<JournalEntry>(STORAGE_KEYS.journalEntries);
  const discoveries = useLocalCollection<Discovery>(STORAGE_KEYS.discoveries);

  const today = todayISO();
  const [prompt, setPrompt] = useState(() => promptForDate(today));
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const [discoveryDraft, setDiscoveryDraft] = useState({
    title: "",
    category: "liked" as DiscoveryCategory,
    rating: 0,
    notes: "",
  });

  const streak = useMemo(
    () => currentStreak(journal.items.map((e) => e.date)),
    [journal.items]
  );

  function shufflePrompt() {
    const next = JOURNAL_PROMPTS[Math.floor(Math.random() * JOURNAL_PROMPTS.length)];
    setPrompt(next);
  }

  function saveEntry() {
    if (!content.trim()) return;
    journal.add({
      id: genId(),
      date: today,
      prompt,
      content: content.trim(),
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    });
    setContent("");
    setTagsInput("");
  }

  function saveDiscovery() {
    if (!discoveryDraft.title.trim()) return;
    discoveries.add({
      id: genId(),
      date: today,
      title: discoveryDraft.title.trim(),
      category: discoveryDraft.category,
      rating: discoveryDraft.rating,
      notes: discoveryDraft.notes.trim(),
      createdAt: new Date().toISOString(),
    });
    setDiscoveryDraft({ title: "", category: "liked", rating: 0, notes: "" });
  }

  const recentEntries = [...journal.items].sort((a, b) => (a.date < b.date ? 1 : -1));
  const recentDiscoveries = [...discoveries.items].sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!journal.hydrated) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Journal &amp; Self-Discovery</h1>
        <p className="text-muted-foreground">
          {formatDateLong(today)}
          {streak > 0 && ` · ${streak}-day journaling streak`}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-primary" />
            Today&apos;s prompt
          </CardTitle>
          <div className="flex items-start justify-between gap-3">
            <CardDescription className="text-base italic text-foreground">
              &ldquo;{prompt}&rdquo;
            </CardDescription>
            <Button variant="ghost" size="sm" onClick={shufflePrompt}>
              <Shuffle className="h-4 w-4" /> New prompt
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write freely — there's no wrong answer."
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated, optional)</Label>
            <Input
              id="tags"
              placeholder="e.g. gratitude, family, work"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </div>
          <Button onClick={saveEntry} disabled={!content.trim()}>
            Save entry
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Discoveries
          </CardTitle>
          <CardDescription>
            Log new interests, values, and memories as you reconnect with yourself.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="disc-title">What did you discover?</Label>
              <Input
                id="disc-title"
                placeholder="e.g. Pottery classes, cold plunges, journaling in the morning"
                value={discoveryDraft.title}
                onChange={(e) =>
                  setDiscoveryDraft((d) => ({ ...d, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={discoveryDraft.category}
                onValueChange={(v) =>
                  setDiscoveryDraft((d) => ({ ...d, category: v as DiscoveryCategory }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DISCOVERY_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rating (optional)</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() =>
                    setDiscoveryDraft((d) => ({ ...d, rating: d.rating === n ? 0 : n }))
                  }
                  aria-label={`Rate ${n}`}
                >
                  <Star
                    className={
                      n <= discoveryDraft.rating
                        ? "h-5 w-5 fill-accent text-accent"
                        : "h-5 w-5 text-muted-foreground"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disc-notes">Notes (optional)</Label>
            <Textarea
              id="disc-notes"
              placeholder="Why did it stand out?"
              value={discoveryDraft.notes}
              onChange={(e) => setDiscoveryDraft((d) => ({ ...d, notes: e.target.value }))}
            />
          </div>

          <Button onClick={saveDiscovery} disabled={!discoveryDraft.title.trim()}>
            Save discovery
          </Button>

          {recentDiscoveries.length === 0 ? (
            <EmptyState
              icon={Sparkles}
              title="Nothing logged yet"
              description="Every small discovery counts — start with one thing that caught your interest."
            />
          ) : (
            <div className="space-y-2 pt-2">
              {recentDiscoveries.map((d) => (
                <div
                  key={d.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{d.title}</p>
                      <Badge variant="secondary" className="text-[11px]">
                        {DISCOVERY_CATEGORIES.find((c) => c.value === d.category)?.label}
                      </Badge>
                    </div>
                    {d.rating > 0 && (
                      <div className="mt-1 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={
                              n <= d.rating
                                ? "h-3.5 w-3.5 fill-accent text-accent"
                                : "h-3.5 w-3.5 text-muted-foreground"
                            }
                          />
                        ))}
                      </div>
                    )}
                    {d.notes && <p className="mt-1 text-sm text-muted-foreground">{d.notes}</p>}
                    <p className="mt-1 text-xs text-muted-foreground">{formatDateLabel(d.date)}</p>
                  </div>
                  <button
                    aria-label="Delete discovery"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => discoveries.remove(d.id)}
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
          <CardTitle className="text-lg">Past entries</CardTitle>
        </CardHeader>
        <CardContent>
          {recentEntries.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No journal entries yet"
              description="Your saved entries will appear here."
            />
          ) : (
            <div className="divide-y divide-border">
              {recentEntries.map((e) => (
                <div key={e.id} className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{formatDateLabel(e.date)}</p>
                    <p className="italic text-sm text-muted-foreground">&ldquo;{e.prompt}&rdquo;</p>
                    <p className="mt-1 whitespace-pre-wrap">{e.content}</p>
                    {e.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {e.tags.map((t) => (
                          <Badge key={t} variant="outline" className="text-[11px]">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    aria-label="Delete entry"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => journal.remove(e.id)}
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
