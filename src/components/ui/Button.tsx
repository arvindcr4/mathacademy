"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

/**
 * Reusable button component with consistent styling
 * - Primary: Gold, for main CTAs
 * - Secondary: Surface color, for secondary actions
 * - Ghost: Transparent, for tertiary actions
 * - Danger: Red, for destructive actions
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-xl
      transition-all duration-200 ease-[var(--ease-out-quart)]
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mastery-blue)]
      disabled:opacity-50 disabled:cursor-not-allowed
      btn-interactive
    `;

    const variants = {
      primary: `
        bg-[var(--xp-gold)] text-black
        hover:bg-[var(--xp-gold-dim)]
        shadow-lg shadow-[var(--xp-gold)]/20
        hover:shadow-xl hover:shadow-[var(--xp-gold)]/30
      `,
      secondary: `
        bg-[var(--surface-700)] text-white border border-[var(--surface-500)]
        hover:bg-[var(--surface-600)] hover:border-[var(--surface-400)]
      `,
      ghost: `
        bg-transparent text-[var(--text-secondary)]
        hover:bg-[var(--surface-700)] hover:text-white
      `,
      danger: `
        bg-[#E05252] text-white
        hover:bg-[#DC2626]
      `,
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2.5 text-base",
      lg: "px-6 py-3.5 text-lg",
    };

    return (
      <button
        ref={ref}
        type={props.type || "button"}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
