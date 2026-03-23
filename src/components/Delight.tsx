"use client";

import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

interface XPNotificationProps {
  amount: number;
  onComplete?: () => void;
}

// Confetti celebration for major achievements
export function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const colors = [
        "var(--xp-gold)",
        "var(--mastery-blue)",
        "var(--success-green)",
        "var(--danger-red)",
        "var(--accent-coral)",
      ];

      const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        size: 6 + Math.random() * 8,
      }));

      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            width: piece.size,
            height: piece.size,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}

// XP gain notification with pop animation
export function XPNotification({ amount, onComplete }: XPNotificationProps) {
  const [visible, setVisible] = useState(true);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [amount, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        z-50 pointer-events-none
        ${animated ? "animate-xp-pop" : ""}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="bg-[var(--xp-gold)] text-black font-bold text-2xl px-6 py-3 rounded-xl shadow-lg shadow-[var(--xp-gold)]/30">
        +{amount} XP
      </div>
    </div>
  );
}

// Streak fire animation
export function StreakBadge({ count }: { count: number }) {
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setPulsing(true);
      const timer = setTimeout(() => setPulsing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [count]);

  if (count === 0) return null;

  return (
    <div
      className={`
        inline-flex items-center gap-1 px-2 py-1 rounded-full
        bg-orange-500/20 text-orange-400 text-sm font-medium
        ${pulsing ? "animate-bounce-subtle" : ""}
      `}
      title={`${count} day streak!`}
    >
      <span role="img" aria-label="fire">
        🔥
      </span>
      <span>{count}</span>
    </div>
  );
}

// Checkmark animation for correct answers
export function AnimatedCheckmark({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <svg
      className="w-16 h-16 text-[var(--success-green)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M5 13l4 4L19 7"
        style={{
          strokeDasharray: 24,
          animation: "checkmark-draw 0.4s var(--ease-out-quart) forwards",
        }}
      />
    </svg>
  );
}

// Progress bar with celebration at 100%
export function DelightfulProgress({
  value,
  max,
  color = "var(--mastery-blue)",
  showCelebration = true,
}: {
  value: number;
  max: number;
  color?: string;
  showCelebration?: boolean;
}) {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const [celebrating, setCelebrating] = useState(false);
  const [prevPercentage, setPrevPercentage] = useState(percentage);

  useEffect(() => {
    if (showCelebration && prevPercentage < 100 && percentage >= 100) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 3000);
    }
    setPrevPercentage(percentage);
  }, [percentage, showCelebration, prevPercentage]);

  return (
    <div className="relative">
      <div className="h-3 bg-[var(--surface-600)] rounded-full overflow-hidden">
        <div
          className={`
            h-full rounded-full transition-all duration-500 var(--ease-out-quart)
            ${celebrating ? "animate-pulse-glow" : ""}
          `}
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      {celebrating && <Confetti active={true} />}
    </div>
  );
}

// Empty state with personality
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="text-center py-12 animate-fade-in-up">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-[var(--mastery-blue)] hover:bg-[var(--mastery-blue-dim)] text-white font-semibold rounded-xl btn-interactive"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Loading state with personality
export function LoadingState({ message = "Loading..." }: { message?: string }) {
  const messages = [
    "Gathering knowledge...",
    "Preparing your lesson...",
    "Loading brilliance...",
    "Warming up the neurons...",
  ];

  const displayMessage = message === "Loading..."
    ? messages[Math.floor(Math.random() * messages.length)]
    : message;

  return (
    <div className="text-center py-12 animate-fade-in-up">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-[var(--surface-600)] border-t-[var(--mastery-blue)] animate-spin" />
      <p className="text-[var(--text-secondary)]">{displayMessage}</p>
    </div>
  );
}
