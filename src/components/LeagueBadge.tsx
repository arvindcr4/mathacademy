"use client";

interface LeagueBadgeProps {
  league: string;
  size?: "sm" | "md" | "lg";
}

const leagueConfig = {
  bronze: {
    bg: "bg-gradient-to-br from-amber-700 to-amber-900",
    text: "text-amber-200",
    border: "border-amber-600",
    icon: "🥉",
  },
  silver: {
    bg: "bg-gradient-to-br from-slate-400 to-slate-600",
    text: "text-slate-200",
    border: "border-slate-400",
    icon: "🥈",
  },
  gold: {
    bg: "bg-gradient-to-br from-yellow-400 to-orange-500",
    text: "text-yellow-900",
    border: "border-yellow-400",
    icon: "🥇",
  },
  platinum: {
    bg: "bg-gradient-to-br from-emerald-400 to-teal-600",
    text: "text-emerald-900",
    border: "border-emerald-400",
    icon: "💎",
  },
  diamond: {
    bg: "bg-gradient-to-br from-cyan-300 to-blue-500",
    text: "text-blue-900",
    border: "border-cyan-300",
    icon: "💠",
  },
  master: {
    bg: "bg-gradient-to-br from-orange-500 to-red-600",
    text: "text-orange-100",
    border: "border-orange-400",
    icon: "👑",
  },
};

const sizeConfig = {
  sm: "w-8 h-8 text-lg",
  md: "w-12 h-12 text-xl",
  lg: "w-16 h-16 text-2xl",
};

export default function LeagueBadge({ league, size = "md" }: LeagueBadgeProps) {
  const config =
    leagueConfig[league as keyof typeof leagueConfig] || leagueConfig.bronze;

  return (
    <div
      className={`
        ${config.bg}
        ${config.border}
        border-2
        rounded-full
        ${sizeConfig[size]}
        flex items-center justify-center
        shadow-lg
        ${size === "lg" ? "shadow-xl" : ""}
      `}
      title={`${league.charAt(0).toUpperCase() + league.slice(1)} League`}
    >
      <span className="text-lg">{config.icon}</span>
    </div>
  );
}
