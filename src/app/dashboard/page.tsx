"use client";

import { useState } from "react";
import Link from "next/link";
import XPBar from "@/components/XPBar";
import LeagueBadge from "@/components/LeagueBadge";
import { courses } from "@/lib/curriculum";

// Map string icon names to emoji equivalents
const iconMap: Record<string, string> = {
  cube: "📦",
  cpu: "🖥️",
  leaf: "🌿",
  atom: "⚛️",
  microphone: "🎙️",
};

function resolveIcon(icon: string): string {
  return iconMap[icon] ?? icon;
}

// Simulated users for leaderboard
const simulatedUsers = [
  {
    id: "1",
    name: "Alex Chen",
    xp: 12450,
    league: "diamond",
    avatar: "AC",
    dailyStreak: 42,
  },
  {
    id: "2",
    name: "Sarah Kim",
    xp: 11320,
    league: "diamond",
    avatar: "SK",
    dailyStreak: 38,
  },
  {
    id: "3",
    name: "James Wilson",
    xp: 9870,
    league: "platinum",
    avatar: "JW",
    dailyStreak: 31,
  },
  {
    id: "4",
    name: "Emma Davis",
    xp: 8920,
    league: "platinum",
    avatar: "ED",
    dailyStreak: 28,
  },
  {
    id: "5",
    name: "Michael Brown",
    xp: 7650,
    league: "gold",
    avatar: "MB",
    dailyStreak: 21,
  },
  {
    id: "6",
    name: "Lisa Zhang",
    xp: 6540,
    league: "gold",
    avatar: "LZ",
    dailyStreak: 19,
  },
  {
    id: "7",
    name: "David Park",
    xp: 5430,
    league: "gold",
    avatar: "DP",
    dailyStreak: 15,
  },
  {
    id: "8",
    name: "Anna Lee",
    xp: 4320,
    league: "silver",
    avatar: "AL",
    dailyStreak: 12,
  },
  {
    id: "9",
    name: "Ryan Miller",
    xp: 3210,
    league: "silver",
    avatar: "RM",
    dailyStreak: 8,
  },
  {
    id: "10",
    name: "Sophie Taylor",
    xp: 2100,
    league: "bronze",
    avatar: "ST",
    dailyStreak: 5,
  },
];

// Current user (simulated session)
const currentUser = {
  id: "current",
  name: "You",
  xp: 2450,
  league: "gold" as const,
  avatar: "JD",
  dailyXp: 847,
  dailyGoal: 1000,
  topicsMastered: 12,
  accuracy: 89,
};

export default function Dashboard() {
  // const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "leaderboard" | "courses"
  >("dashboard");

  const sortedLeaderboard = [
    ...simulatedUsers,
    { id: "current", name: currentUser.name, xp: currentUser.xp, league: currentUser.league, avatar: currentUser.avatar, dailyStreak: 12 },
  ].sort((a, b) => b.xp - a.xp);
  const userRank =
    sortedLeaderboard.findIndex((u) => u.id === "current") + 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--surface-900)] to-[var(--surface-800)]">
      {/* Header */}
      <header className="border-b border-[var(--surface-600)] bg-[var(--surface-900)]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--xp-gold)] to-orange-500 flex items-center justify-center font-bold text-xl text-black">
              M
            </div>
            <span className="text-xl font-bold">MathAcademy</span>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("dashboard")}
                className={`hover:text-[var(--xp-gold)] transition ${activeTab === "dashboard" ? "text-[var(--xp-gold)]" : ""}`}
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("leaderboard")}
                className={`hover:text-[var(--xp-gold)] transition ${activeTab === "leaderboard" ? "text-[var(--xp-gold)]" : ""}`}
              >
                Leaderboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("courses")}
                className={`hover:text-[var(--xp-gold)] transition ${activeTab === "courses" ? "text-[var(--xp-gold)]" : ""}`}
              >
                Courses
              </button>
            </nav>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--xp-gold)] to-orange-500 flex items-center justify-center font-bold text-black">
                {currentUser.avatar}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Welcome + XP Section */}
            <div className="bg-[var(--surface-800)] rounded-2xl p-6 border border-[var(--surface-600)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--xp-gold)] to-orange-500 flex items-center justify-center text-2xl font-bold text-black">
                    {currentUser.avatar}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Welcome back!</h1>
                    <p className="text-[var(--text-secondary)]">
                      Ready to continue your learning journey?
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <LeagueBadge league={currentUser.league} size="lg" />
                  <div>
                    <div className="text-sm text-[var(--text-muted)]">League Rank</div>
                    <div className="text-lg font-semibold capitalize">
                      {currentUser.league}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <XPBar
                  current={currentUser.dailyXp}
                  goal={currentUser.dailyGoal}
                  showDaily
                />
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[var(--surface-700)] rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[var(--xp-gold)]">
                    {currentUser.xp.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">Total XP</div>
                </div>
                <div className="bg-[var(--surface-700)] rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[var(--mastery-blue)]">
                    {currentUser.topicsMastered}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">Topics Mastered</div>
                </div>
                <div className="bg-[var(--surface-700)] rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[var(--success-green)]">
                    {currentUser.accuracy}%
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">Accuracy</div>
                </div>
                <div className="bg-[var(--surface-700)] rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[var(--xp-gold)]">
                    #{userRank}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">League Rank</div>
                </div>
              </div>
            </div>

            {/* Continue Learning Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 3).map((course, index) => (
                  <Link key={course.id} href={`/course/${course.slug}`}>
                    <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-xl p-6 hover:bg-[var(--surface-700)] hover:border-[var(--mastery-blue)] transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                          style={{ backgroundColor: `${course.color}22` }}
                        >
                          {resolveIcon(course.icon)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{course.name}</h3>
                          <div className="text-xs text-[var(--text-muted)]">
                            {course.topicCount} topics
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-[var(--surface-600)] rounded-full h-2">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${[45, 72, 28][index % 3]}%`,
                            backgroundColor: course.color,
                          }}
                        />
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-2">
                        In progress
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Knowledge Graph Preview */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Your Knowledge Graph
              </h2>
              <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-xl p-6">
                <div className="flex flex-wrap gap-3 justify-center">
                  {courses.map((course) => (
                    <div key={course.id} className="flex flex-col items-center">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl knowledge-node"
                        style={{
                          backgroundColor: `${course.color}22`,
                          boxShadow: `0 0 20px ${course.color}22`,
                        }}
                        title={course.name}
                      >
                        {resolveIcon(course.icon)}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] mt-1 max-w-20 text-center truncate">
                        {course.name.split(" ")[0]}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-[var(--text-secondary)] mt-4 text-sm">
                  Topics you&apos;ve mastered appear with darker colors
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">League Leaderboard</h1>
              <div className="flex items-center gap-2">
                <LeagueBadge league="gold" size="md" />
                <span className="font-medium">Gold League</span>
              </div>
            </div>

            {/* Top 3 */}
            <div className="grid grid-cols-3 gap-4">
              {sortedLeaderboard.slice(0, 3).map((user, index) => (
                <div
                  key={user.id}
                  className={`
                    ${index === 0 ? "bg-gradient-to-b from-[var(--xp-gold)]/20 to-transparent border-[var(--xp-gold)] order-2" : ""}
                    ${index === 1 ? "bg-gradient-to-b from-[var(--league-silver)]/20 to-transparent border-[var(--league-silver)] order-1" : ""}
                    ${index === 2 ? "bg-gradient-to-b from-[var(--league-bronze)]/20 to-transparent border-[var(--league-bronze)] order-3" : ""}
                    bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-xl p-4 text-center
                  `}
                >
                  <div className="text-4xl mb-2">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[var(--mastery-blue)] to-teal-500 flex items-center justify-center text-xl font-bold text-white mb-2">
                    {user.avatar}
                  </div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-2xl font-bold text-[var(--xp-gold)] mt-2">
                    {user.xp.toLocaleString()}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">XP</div>
                </div>
              ))}
            </div>

            {/* Rest of leaderboard */}
            <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[var(--surface-700)]">
                  <tr>
                    <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">
                      Rank
                    </th>
                    <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">
                      Player
                    </th>
                    <th className="text-left py-3 px-4 text-[var(--text-muted)] font-medium">
                      League
                    </th>
                    <th className="text-right py-3 px-4 text-[var(--text-muted)] font-medium">
                      XP
                    </th>
                    <th className="text-right py-3 px-4 text-[var(--text-muted)] font-medium">
                      Streak
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLeaderboard.slice(3).map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-t border-[var(--surface-600)] hover:bg-[var(--surface-700)]"
                    >
                      <td className="py-3 px-4 text-[var(--text-muted)]">#{index + 4}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--mastery-blue)] to-teal-500 flex items-center justify-center text-sm font-bold text-white">
                            {user.avatar}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <LeagueBadge league={user.league} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {user.xp.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-[var(--xp-gold)]">🔥</span>{" "}
                        {user.dailyStreak}
                      </td>
                    </tr>
                  ))}
                  {/* Current user row */}
                  <tr className="border-t border-[var(--xp-gold)]/30 bg-[var(--xp-gold)]/10">
                    <td className="py-3 px-4 text-[var(--xp-gold)] font-bold">#{userRank}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--xp-gold)] to-orange-500 flex items-center justify-center text-sm font-bold text-black">
                          {currentUser.avatar}
                        </div>
                        <span className="font-medium text-[var(--xp-gold)]">
                          {currentUser.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <LeagueBadge league={currentUser.league} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[var(--xp-gold)]">
                      {currentUser.xp.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[var(--xp-gold)]">🔥</span> 12
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">All Courses</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Link key={course.id} href={`/course/${course.slug}`}>
                  <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-xl overflow-hidden hover:bg-[var(--surface-700)] hover:border-[var(--mastery-blue)] transition">
                    <div
                      className="h-24 flex items-center justify-center text-4xl"
                      style={{
                        background: `linear-gradient(135deg, ${course.color}22 0%, ${course.color}08 100%)`,
                      }}
                    >
                      {resolveIcon(course.icon)}
                    </div>
                    <div className="p-4">
                      <span
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: `${course.color}22`,
                          color: course.color,
                        }}
                      >
                        {course.category.replace("-", " ")}
                      </span>
                      <h3 className="text-lg font-semibold mt-2">
                        {course.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-muted)]">
                        <span>{course.topicCount} topics</span>
                        <span>~{course.estimatedHours}h</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
