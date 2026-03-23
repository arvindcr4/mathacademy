"use client";

import { useEffect, useState } from "react";

interface XPBarProps {
  current: number;
  goal: number;
  showDaily?: boolean;
  onLevelUp?: () => void;
}

export default function XPBar({
  current,
  goal,
  showDaily = false,
  onLevelUp,
}: XPBarProps) {
  const [animatedCurrent, setAnimatedCurrent] = useState(
    showDaily ? 0 : current,
  );
  const [celebrating, setCelebrating] = useState(false);
  const percentage = goal > 0 ? Math.min((animatedCurrent / goal) * 100, 100) : 0;

  useEffect(() => {
    if (!showDaily) {
      setAnimatedCurrent(current);
      return;
    }

    // Animate XP gain with easing
    const duration = 1000;
    const steps = 30;
    const increment = current / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setAnimatedCurrent(Math.min(increment * step, current));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [current, showDaily]);

  // Trigger celebration when reaching 100%
  useEffect(() => {
    if (percentage >= 100 && showDaily) {
      setCelebrating(true);
      onLevelUp?.();
      setTimeout(() => setCelebrating(false), 2000);
    }
  }, [percentage, showDaily, onLevelUp]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span
          className={
            showDaily ? "text-[var(--xp-gold)] font-medium" : "text-[var(--text-secondary)]"
          }
        >
          {showDaily ? "Daily XP" : "Total XP"}
        </span>
        <span className="font-medium text-[var(--text-primary)]">
          {animatedCurrent.toLocaleString()} / {goal.toLocaleString()}
          {celebrating && (
            <span className="ml-2 inline-block animate-xp-pop">🎉</span>
          )}
        </span>
      </div>
      <div className="h-4 bg-[var(--surface-700)] rounded-full overflow-hidden">
        <div
          className={`
            h-full xp-bar rounded-full flex items-center justify-end pr-2 transition-all duration-500
            ${celebrating ? "animate-pulse-glow" : ""}
          `}
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <span className="text-xs font-bold text-[var(--surface-900)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
