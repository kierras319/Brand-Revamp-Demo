export const SYMPTOM_OPTIONS = [
  "Racing thoughts",
  "Low motivation",
  "Irritability",
  "Anxiety spike",
  "Trouble sleeping",
  "Oversleeping",
  "Impulsivity",
  "Elevated mood",
  "Low mood",
  "Brain fog",
  "Appetite change",
  "Restlessness",
];

export function scaleLabel(v: number): string {
  if (v <= 2) return "Very low";
  if (v <= 4) return "Low";
  if (v <= 6) return "Moderate";
  if (v <= 8) return "High";
  return "Very high";
}

export const JOURNAL_PROMPTS = [
  "What's one thing that felt true about me today?",
  "What did I do today that felt like 'me'?",
  "What's something small I enjoyed, even a little?",
  "What's a memory from before that I'd like to revisit?",
  "What's something I used to love that I haven't done in a while?",
  "What did my mood/energy affect today, and how did I handle it?",
  "If I could try one new thing this week, what would it be?",
  "What's a value I want to live by more this week?",
  "What am I proud of myself for today, no matter how small?",
  "What's something that annoyed or drained me — and what does that tell me?",
  "Who or what made me feel most like myself recently?",
  "What's one thing I'm curious about right now?",
];

export const DISCOVERY_CATEGORIES = [
  { value: "liked", label: "Something I liked" },
  { value: "disliked", label: "Something I didn't like" },
  { value: "curious", label: "Something I'm curious about" },
  { value: "value", label: "A value that matters to me" },
  { value: "memory", label: "A memory worth revisiting" },
] as const;
