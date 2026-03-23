"use client";

import { useEffect, useState, forwardRef } from "react";

interface StreakCounterProps {
  count: number;
  className?: string;
}

/**
 * Animated streak counter showing consecutive days of practice
 * - Fire animation on streak increment
 * - Celebratory effect at milestone streaks (7, 14, 30, etc.)
 */
export const StreakCounter = forwardRef<HTMLDivElement, StreakCounterProps>(
  ({ count, className = "" }, ref) => {
    const [animating, setAnimating] = useState(false);
    const [prevCount, setPrevCount] = useState(count);

    useEffect(() => {
      if (count > prevCount) {
        setAnimating(true);
        const timer = setTimeout(() => setAnimating(false), 800);
        setPrevCount(count);
        return () => clearTimeout(timer);
      }
    }, [count, prevCount]);

    // Milestone detection
    const isMilestone = [7, 14, 21, 30, 60, 90, 100, 365].includes(count);

    if (count === 0) return null;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={`${count} day streak`}
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full
          bg-[color:color-mix(in_oklch,var(--accent-coral)_15%,transparent)]
          border border-[color:color-mix(in_oklch,var(--accent-coral)_30%,transparent)]
          ${animating ? "animate-bounce-subtle" : ""}
          ${className}
        `}
      >
        <span
          className={`
            text-lg transition-transform duration-300
            ${animating ? "scale-125" : ""}
          `}
          style={{ display: "inline-block" }}
        >
          {isMilestone ? "🔥" : "🔥"}
        </span>
        <span
          className={`
            font-bold tabular-nums
            ${isMilestone ? "text-[var(--xp-gold)]" : "text-[var(--text-primary)]"}
          `}
        >
          {count}
        </span>
        <span className="text-xs text-[var(--text-muted)]">days</span>
        {isMilestone && (
          <span
            className="text-xs font-semibold text-[var(--xp-gold)] animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            🏆
          </span>
        )}
      </div>
    );
  }
);

StreakCounter.displayName = "StreakCounter";
