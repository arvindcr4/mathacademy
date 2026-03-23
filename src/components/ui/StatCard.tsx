"use client";

import { HTMLAttributes, forwardRef } from "react";

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  icon?: string;
  variant?: "default" | "gold" | "blue" | "green" | "coral";
}

/**
 * Stat card for displaying metrics and XP counts
 * Consistent styling for dashboard stats
 */
export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ value, label, icon, variant = "default", className = "", ...props }, ref) => {
    const baseStyles = `
      bg-[var(--surface-700)] rounded-xl p-4 text-center
      transition-transform duration-200 hover:scale-105
    `;

    const variants = {
      default: "[&_.value]:text-[var(--text-primary)]",
      gold: "[&_.value]:text-[var(--xp-gold)]",
      blue: "[&_.value]:text-[var(--mastery-blue)]",
      green: "[&_.value]:text-[#3FB950]",
      coral: "[&_.value]:text-[#FF6B35]",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {icon && <div className="text-2xl mb-2">{icon}</div>}
        <div className="value text-3xl font-bold">{value}</div>
        <div className="text-sm text-[var(--text-muted)] mt-1">{label}</div>
      </div>
    );
  }
);

StatCard.displayName = "StatCard";
