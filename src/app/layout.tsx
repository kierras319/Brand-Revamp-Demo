import type { Metadata, Viewport } from "next";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/toaster";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Anchor — Life OS",
    template: "%s | Anchor",
  },
  description:
    "A private, local-only life OS for mood & medication tracking, journaling, habits, and fitness.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#3f6b57",
};

const NO_FLASH_THEME_SCRIPT = `try{var t=localStorage.getItem('lifeos:theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
