import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: "hsl(var(--brand-charcoal))",   // #1C1917 — warm dark base
          gold:     "hsl(var(--brand-gold))",        // #C9A96E — antique gold accent
          parchment:"hsl(var(--brand-parchment))",   // #F0EBE3 — aged parchment bg
          greige:   "hsl(var(--brand-greige))",      // #E4DDD4 — soft greige secondary bg
          wine:     "hsl(var(--brand-wine))",        // #8B2D3A — deep wine CTA
          stone:    "hsl(var(--brand-stone))",       // #A39E98 — warm stone body text
          ink:      "hsl(var(--brand-ink))",
          cream:    "hsl(var(--brand-cream))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans:  ["var(--font-raleway)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem",   { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["3.75rem",{ lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-md": ["3rem",   { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-sm": ["2.25rem",{ lineHeight: "1.2",  letterSpacing: "-0.01em" }],
      },
      spacing: {
        section:    "6rem",
        "section-sm": "3.5rem",
      },
      borderRadius: {
        card: "0.75rem",
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card:           "0 2px 16px 0 rgba(0, 0, 0, 0.50)",
        "card-hover":   "0 8px 32px 0 rgba(0, 0, 0, 0.70)",
        luxury:         "0 4px 40px 0 rgba(0, 0, 0, 0.60)",
        gold:           "0 0 30px 0 rgba(212, 175, 55, 0.20)",
        "btn-glow":     "0 0 0 2px rgba(212, 175, 55, 0.85), 0 0 14px 4px rgba(212, 175, 55, 0.35)",
        "crimson-glow": "0 0 0 2px rgba(139, 0, 0, 0.70), 0 0 20px 4px rgba(139, 0, 0, 0.30)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "fade-up":        "fade-up 0.6s ease-out both",
        "fade-in":        "fade-in 0.4s ease-out both",
        "slide-up":       "slide-up 0.4s ease-out both",
        shimmer:          "shimmer 1.8s infinite linear",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "hsl(var(--brand-ink))",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "hsl(var(--brand-charcoal))",
            },
            a: {
              color: "hsl(var(--brand-gold))",
              "&:hover": { color: "hsl(var(--brand-wine))" },
            },
            blockquote: {
              borderLeftColor: "hsl(var(--brand-gold))",
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontStyle: "italic",
            },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
