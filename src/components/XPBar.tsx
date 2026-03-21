"use client";

import { useEffect, useState } from "react";

interface XPBarProps {
  current: number;
  goal: number;
  showDaily?: boolean;
}

export default function XPBar({
  current,
  goal,
  showDaily = false,
}: XPBarProps) {
  const [animatedCurrent, setAnimatedCurrent] = useState(
    showDaily ? 0 : current,
  );
  const percentage = Math.min((animatedCurrent / goal) * 100, 100);

  useEffect(() => {
    if (!showDaily) {
      setAnimatedCurrent(current);
      return;
    }

    // Animate XP gain
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

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span
          className={
            showDaily ? "text-yellow-400 font-medium" : "text-gray-400"
          }
        >
          {showDaily ? "Daily XP" : "Total XP"}
        </span>
        <span className="font-medium">
          {animatedCurrent.toLocaleString()} / {goal.toLocaleString()}
        </span>
      </div>
      <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full xp-bar rounded-full flex items-center justify-end pr-2 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <span className="text-xs font-bold text-black">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
