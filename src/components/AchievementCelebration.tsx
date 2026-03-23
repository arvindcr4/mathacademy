"use client";

import { useEffect, useState, forwardRef } from "react";

interface AchievementCelebrationProps {
  type: "streak" | "level" | "mastery" | "xp-milestone";
  value: number;
  onComplete?: () => void;
  className?: string;
}

const achievementConfig = {
  streak: {
    icon: "🔥",
    label: "Day Streak",
    milestones: [7, 14, 21, 30, 60, 90, 100, 365],
    color: "var(--accent-coral)",
  },
  level: {
    icon: "⭐",
    label: "Level",
    milestones: [5, 10, 25, 50, 100],
    color: "var(--xp-gold)",
  },
  mastery: {
    icon: "🎯",
    label: "Topics Mastered",
    milestones: [1, 5, 10, 25, 50, 100],
    color: "var(--mastery-blue)",
  },
  "xp-milestone": {
    icon: "✨",
    label: "XP Milestone",
    milestones: [1000, 5000, 10000, 25000, 50000, 100000],
    color: "var(--success-green)",
  },
};

/**
 * Achievement celebration overlay with particle effects
 * - Triggers at milestone values
 * - Auto-dismisses after animation
 * - Respects reduced motion preferences
 */
export const AchievementCelebration = forwardRef<
  HTMLDivElement,
  AchievementCelebrationProps
>(({ type, value, onComplete, className = "" }, ref) => {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  const config = achievementConfig[type];
  const isMilestone = config.milestones.includes(value);

  useEffect(() => {
    if (isMilestone) {
      setVisible(true);
      // Generate particles
      setParticles(Array.from({ length: 20 }, (_, i) => i));

      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isMilestone, onComplete]);

  if (!visible || !isMilestone) return null;

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-oklch(0 0 0 / 50%) backdrop-blur-sm
        animate-fade-in
        ${className}
      `}
    >
      <div
        className="
          relative px-12 py-8 rounded-3xl
          bg-[var(--surface-800)] border-2
          text-center animate-scale-in
          shadow-2xl
        "
        style={{ borderColor: config.color }}
      >
        {/* Particles */}
        {particles.map((p) => (
          <div
            key={p}
            className="absolute w-2 h-2 rounded-full animate-particle-explode"
            style={{
              backgroundColor: config.color,
              left: "50%",
              top: "50%",
              animationDelay: `${p * 50}ms`,
              transform: `rotate(${p * 18}deg) translateX(${50 + Math.random() * 50}px)`,
            }}
          />
        ))}

        {/* Achievement content */}
        <div className="text-6xl mb-4 animate-bounce-subtle">{config.icon}</div>
        <div
          className="text-2xl font-bold mb-2"
          style={{ color: config.color }}
        >
          {config.label} Reached!
        </div>
        <div
          className="display-type text-5xl font-bold"
          style={{ color: config.color }}
        >
          {value.toLocaleString()}
        </div>
      </div>
    </div>
  );
});

AchievementCelebration.displayName = "AchievementCelebration";
