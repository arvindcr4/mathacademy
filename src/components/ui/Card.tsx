"use client";

import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Reusable card component with consistent styling
 * - Default: Standard card with border
 * - Interactive: Hover effects for clickable cards
 * - Elevated: More prominent shadow
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", padding = "md", className = "", children, ...props }, ref) => {
    const baseStyles = `
      bg-[var(--surface-800)] rounded-2xl border border-[var(--surface-600)]
      transition-all duration-300 ease-[var(--ease-out-quart)]
    `;

    const variants = {
      default: "",
      interactive: `
        hover:border-[var(--mastery-blue)] hover:bg-[var(--surface-700)]
        hover:-translate-y-1 hover:shadow-lg cursor-pointer
        card-interactive
      `,
      elevated: "shadow-xl shadow-black/20",
    };

    const paddings = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        role="article"
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
