"use client";

import { forwardRef, HTMLAttributes } from "react";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number;
  variant?: "default" | "success" | "warning" | "mastery";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}

/**
 * Reusable progress bar with consistent styling
 * - Supports different variants for semantic meaning
 * - Smooth animations with reduced motion support
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      variant = "default",
      size = "md",
      showLabel = false,
      animated = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const baseStyles = `
      rounded-full overflow-hidden transition-all duration-500
      ${animated ? "ease-[var(--ease-out-quart)]" : ""}
    `;

    const trackStyles = "bg-[var(--surface-600)]";

    const variants = {
      default: "bg-gradient-to-r from-[var(--mastery-blue)] to-teal-500",
      success: "bg-gradient-to-r from-[#3FB950] to-emerald-400",
      warning: "bg-gradient-to-r from-[var(--xp-gold)] to-orange-400",
      mastery: "bg-gradient-to-r from-[var(--mastery-blue)] to-[#3FB950]",
    };

    const sizes = {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-4",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${trackStyles} ${sizes[size]} ${className}`}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <div
          className={`
            h-full rounded-full transition-all duration-500
            ${animated ? "ease-[var(--ease-out-quart)]" : ""}
            ${variants[variant]}
          `}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && percentage > 15 && (
            <span className="text-xs font-bold text-[var(--surface-900)] flex items-center justify-end pr-2 h-full">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
