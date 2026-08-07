import { BookOpen, CheckSquare, Dumbbell, HeartPulse, Home, Settings } from "lucide-react";

export const navItems = [
  { href: "/", label: "Today", icon: Home },
  { href: "/mood", label: "Mood", icon: HeartPulse },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/habits", label: "Habits", icon: CheckSquare },
  { href: "/fitness", label: "Fitness", icon: Dumbbell },
];

export const settingsItem = { href: "/settings", label: "Settings", icon: Settings };
