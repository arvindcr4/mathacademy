"use client";

import { useState, useEffect, forwardRef } from "react";

type Theme = "dark" | "light";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme toggle for dark/light mode switching
 * - Persists preference to localStorage
 * - Respects system preference on first visit
 * - Smooth transition between themes
 */
export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className = "" }, ref) => {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored) {
        setTheme(stored);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      }
    }, []);

    useEffect(() => {
      if (!mounted) return;
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    if (!mounted) {
      return (
        <button
          ref={ref}
          className={`theme-toggle ${className}`}
          aria-label="Toggle theme"
          disabled
        >
          <span className="theme-toggle-icon">◐</span>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={theme === "light"}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        onClick={toggleTheme}
        className={`
          theme-toggle
          inline-flex items-center justify-center
          w-10 h-10 rounded-xl
          bg-[var(--surface-700)] hover:bg-[var(--surface-600)]
          border border-[var(--border-soft)]
          transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mastery-blue)]
          ${className}
        `}
      >
        <span
          className="text-lg transition-transform duration-300"
          style={{ transform: theme === "light" ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </span>
      </button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
