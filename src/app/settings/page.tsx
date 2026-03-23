"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { StreakCounter } from "@/components/StreakCounter";

interface SettingsSection {
  title: string;
  description: string;
  options: SettingsOption[];
}

interface SettingsOption {
  id: string;
  label: string;
  description?: string;
  type: "toggle" | "select" | "range";
  value: boolean | string | number;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, boolean | string | number>>({
    animationsEnabled: true,
    soundEnabled: false,
    dailyReminders: true,
    reminderTime: "09:00",
    difficultyLevel: "adaptive",
    sessionLength: 15,
    showStreakBadge: true,
    showLeaderboard: true,
  });

  const handleToggle = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleChange = (id: string, value: string | number) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
  };

  const sections: SettingsSection[] = [
    {
      title: "Appearance",
      description: "Customize how MathAcademy looks",
      options: [
        {
          id: "animationsEnabled",
          label: "Animations",
          description: "Enable micro-interactions and transitions",
          type: "toggle",
          value: settings.animationsEnabled as boolean,
        },
        {
          id: "showStreakBadge",
          label: "Show Streak Badge",
          description: "Display your streak in the header",
          type: "toggle",
          value: settings.showStreakBadge as boolean,
        },
      ],
    },
    {
      title: "Notifications",
      description: "Control when you receive reminders",
      options: [
        {
          id: "dailyReminders",
          label: "Daily Reminders",
          description: "Get reminded to practice every day",
          type: "toggle",
          value: settings.dailyReminders as boolean,
        },
        {
          id: "reminderTime",
          label: "Reminder Time",
          type: "select",
          value: settings.reminderTime as string,
          options: [
            { value: "07:00", label: "7:00 AM" },
            { value: "09:00", label: "9:00 AM" },
            { value: "12:00", label: "12:00 PM" },
            { value: "18:00", label: "6:00 PM" },
            { value: "20:00", label: "8:00 PM" },
          ],
        },
        {
          id: "soundEnabled",
          label: "Sound Effects",
          description: "Play sounds on correct answers",
          type: "toggle",
          value: settings.soundEnabled as boolean,
        },
      ],
    },
    {
      title: "Learning",
      description: "Adjust your learning experience",
      options: [
        {
          id: "difficultyLevel",
          label: "Difficulty",
          type: "select",
          value: settings.difficultyLevel as string,
          options: [
            { value: "gentle", label: "Gentle - Take your time" },
            { value: "adaptive", label: "Adaptive - AI adjusts to you" },
            { value: "challenging", label: "Challenging - Push your limits" },
          ],
        },
        {
          id: "sessionLength",
          label: "Daily Session Length",
          description: `${settings.sessionLength} minutes per day`,
          type: "range",
          value: settings.sessionLength as number,
          min: 5,
          max: 60,
          step: 5,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--surface-900)] to-[var(--surface-800)]">
      {/* Header */}
      <header className="border-b border-[var(--surface-600)] bg-[var(--surface-900)]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-[var(--text-muted)] hover:text-white transition focus-ring rounded-md p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {settings.showStreakBadge && <StreakCounter count={18} />}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {sections.map((section) => (
          <section key={section.title} className="surface-panel p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="text-sm text-[var(--text-muted)]">{section.description}</p>
            </div>

            <div className="space-y-4">
              {section.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between py-3 border-t border-[var(--surface-600)] first:border-t-0"
                >
                  <div className="flex-1 mr-4">
                    <label className="font-medium" htmlFor={option.id}>
                      {option.label}
                    </label>
                    {option.description && (
                      <p className="text-sm text-[var(--text-muted)]">{option.description}</p>
                    )}
                  </div>

                  {option.type === "toggle" && (
                    <button
                      type="button"
                      role="switch"
                      id={option.id}
                      aria-checked={option.value as boolean}
                      onClick={() => handleToggle(option.id)}
                      className={`
                        relative w-12 h-6 rounded-full transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mastery-blue)]
                        ${option.value ? "bg-[var(--mastery-blue)]" : "bg-[var(--surface-500)]"}
                      `}
                    >
                      <span
                        className={`
                          absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200
                          ${option.value ? "translate-x-7" : "translate-x-1"}
                        `}
                      />
                    </button>
                  )}

                  {option.type === "select" && (
                    <select
                      id={option.id}
                      value={option.value as string}
                      onChange={(e) => handleChange(option.id, e.target.value)}
                      className="
                        bg-[var(--surface-700)] border border-[var(--surface-500)]
                        rounded-lg px-3 py-2 text-sm
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mastery-blue)]
                      "
                    >
                      {option.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {option.type === "range" && (
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        id={option.id}
                        value={option.value as number}
                        min={option.min}
                        max={option.max}
                        step={option.step}
                        onChange={(e) => handleChange(option.id, parseInt(e.target.value))}
                        className="
                          w-32 accent-[var(--mastery-blue)]
                          [&::-webkit-slider-thumb]:appearance-none
                          [&::-webkit-slider-thumb]:w-4
                          [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full
                          [&::-webkit-slider-thumb]:bg-[var(--mastery-blue)]
                        "
                      />
                      <span className="text-sm font-medium text-[var(--text-muted)] w-24 text-right">
                        {option.value} min
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Save indicator */}
        <div className="text-center text-sm text-[var(--text-muted)]">
          Settings are saved automatically
        </div>
      </main>
    </div>
  );
}
