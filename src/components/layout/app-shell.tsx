"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems, settingsItem } from "./nav-items";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex md:w-60 md:flex-col md:border-r md:border-border md:bg-card md:px-4 md:py-6">
        <Link href="/" className="mb-8 flex items-center gap-2 px-2">
          <span className="text-xl">⚓</span>
          <span className="text-lg font-semibold">Anchor</span>
        </Link>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-border pt-4">
          <Link
            href={settingsItem.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === settingsItem.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <settingsItem.icon className="h-4 w-4" />
            {settingsItem.label}
          </Link>
          <ThemeToggle className="w-full justify-start gap-3 px-3" />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">⚓</span>
            <span className="text-lg font-semibold">Anchor</span>
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle className="[&>span]:hidden" />
            <Link
              href="/settings"
              className={cn(
                "rounded-md p-2 hover:bg-muted",
                pathname === "/settings" && "text-primary"
              )}
              aria-label="Settings"
            >
              <settingsItem.icon className="h-5 w-5" />
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 pb-24 md:px-8 md:py-8 md:pb-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-card px-1 py-2 md:hidden">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-md px-3 py-1.5 text-[11px] font-medium",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
