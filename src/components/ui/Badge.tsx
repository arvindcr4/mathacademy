"use client";

import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "gold";
  size?: "sm" | "md";
}

/**
 * Reusable badge/tag component for labels and categories
 * Uses semantic colors with proper contrast
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "sm", className = "", children, style, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center gap-1.5 font-medium rounded-lg
      transition-colors duration-200
    `;

    const variants = {
      default: "bg-[var(--surface-600)] text-[var(--text-secondary)]",
      success: "bg-[#3FB950]/20 text-[#3FB950]",
      warning: "bg-[var(--xp-gold)]/20 text-[var(--xp-gold)]",
      error: "bg-[#E05252]/20 text-[#E05252]",
      info: "bg-[var(--mastery-blue)]/20 text-[var(--mastery-blue)]",
      gold: "bg-[var(--xp-gold)]/20 text-[var(--xp-gold)]",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
