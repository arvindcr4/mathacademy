"use client";

import { useState } from "react";
import Link from "next/link";
import XPBar from "@/components/XPBar";
import CourseCard from "@/components/CourseCard";
import LeagueBadge from "@/components/LeagueBadge";
import { courses, categories } from "@/lib/curriculum";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCourses = selectedCategory
    ? courses.filter((c) => c.category === selectedCategory)
    : courses;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--surface-600)] bg-[var(--surface-900)]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--xp-gold)] to-orange-500 flex items-center justify-center font-bold text-xl text-black">
              M
            </div>
            <span className="text-xl font-bold">MathAcademy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#courses" className="hover:text-[var(--xp-gold)] transition">
              Courses
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-[var(--xp-gold)] transition"
            >
              How It Works
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-[var(--xp-gold)] text-black font-semibold rounded-lg hover:bg-[var(--xp-gold-dim)] transition"
            >
              Start Learning
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section - Refined boldness (/bolder + /quieter balance) */}
      <section className="py-20 md:py-28 px-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--xp-gold)_0%,_transparent_60%)] opacity-[0.03]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--xp-gold)]/15 text-[var(--xp-gold)] text-sm font-medium mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--xp-gold)]"></span>
            AI-Powered Adaptive Learning
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up stagger-1">
            <span className="text-white">Master Skills</span>
            <br />
            <span className="bg-gradient-to-r from-[var(--xp-gold)] via-amber-400 to-[var(--xp-gold)] bg-clip-text text-transparent">
              4x Faster
            </span>
          </h1>
          <p className="text-base md:text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-2">
            From mathematics to reinforcement learning to software engineering
            interviews. Our AI-powered platform adapts to your knowledge
            frontier and guides you through the most efficient learning path.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up stagger-3">
            <Link
              href="/dashboard"
              className="group px-8 py-4 bg-[var(--xp-gold)] text-black font-semibold text-base rounded-xl hover:bg-[var(--xp-gold-dim)] transition-all duration-300 shadow-lg shadow-[var(--xp-gold)]/20 hover:shadow-xl hover:shadow-[var(--xp-gold)]/25 hover:-translate-y-0.5 btn-interactive"
            >
              Start Your Journey
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="#courses"
              className="px-8 py-4 bg-[var(--surface-700)] border border-[var(--surface-500)] font-medium text-base rounded-xl hover:bg-[var(--surface-600)] hover:border-[var(--surface-400)] transition-all duration-300"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* XP System Demo */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[var(--surface-800)] to-[var(--surface-900)] rounded-2xl p-8 border border-[var(--surface-600)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--xp-gold)] to-orange-500 flex items-center justify-center text-xl font-bold text-black">
                  JD
                </div>
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-[var(--text-muted)]">
                    Level 12 • 2,450 XP
                  </div>
                </div>
              </div>
              <LeagueBadge league="gold" />
            </div>

            <XPBar current={2450} goal={3000} showDaily />

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="bg-[var(--surface-700)] rounded-xl p-4">
                <div className="text-2xl font-bold text-[var(--xp-gold)]">847</div>
                <div className="text-sm text-[var(--text-muted)]">XP Today</div>
              </div>
              <div className="bg-[var(--surface-700)] rounded-xl p-4">
                <div className="text-2xl font-bold text-[var(--mastery-blue)]">12</div>
                <div className="text-sm text-[var(--text-muted)]">Topics Mastered</div>
              </div>
              <div className="bg-[var(--surface-700)] rounded-xl p-4">
                <div className="text-2xl font-bold text-[#3FB950]">89%</div>
                <div className="text-sm text-[var(--text-muted)]">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section id="courses" className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Course Catalog</h2>

          <div className="flex flex-wrap gap-3 mb-8">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !selectedCategory
                  ? "bg-[var(--mastery-blue)] text-white"
                  : "bg-[var(--surface-600)] hover:bg-[var(--surface-500)]"
              }`}
            >
              All Courses
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-[var(--mastery-blue)] text-white"
                    : "bg-[var(--surface-600)] hover:bg-[var(--surface-500)]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--surface-800)] rounded-2xl p-6 border border-[var(--surface-600)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--mastery-blue)] flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Adaptive Diagnostic
              </h3>
              <p className="text-[var(--text-secondary)]">
                Take our 30-45 minute adaptive assessment. We&apos;ll identify
                your knowledge frontier and create a personalized learning path.
              </p>
            </div>

            <div className="bg-[var(--surface-800)] rounded-2xl p-6 border border-[var(--surface-600)]">
              <div className="w-12 h-12 rounded-xl bg-[#3FB950] flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn with XP</h3>
              <p className="text-[var(--text-secondary)]">
                Complete lessons, solve problems, and earn XP. Our mastery-based
                system ensures you truly understand each concept before moving
                on.
              </p>
            </div>

            <div className="bg-[var(--surface-800)] rounded-2xl p-6 border border-[var(--surface-600)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--xp-gold)] flex items-center justify-center text-xl font-bold text-black mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Spaced Repetition</h3>
              <p className="text-[var(--text-secondary)]">
                Our algorithm schedules reviews at optimal intervals. Build
                long-term retention through scientifically-backed distributed
                practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* League System */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[var(--surface-900)]/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Compete in Weekly Leagues</h2>
          <p className="text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
            Climb through Bronze, Silver, Gold, Platinum, Diamond, and Master
            leagues. Earn XP each week to advance, but don&apos;t worry—your XP
            is never lost!
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {["bronze", "silver", "gold", "platinum", "diamond", "master"].map(
              (league, i) => (
                <div key={league} className="flex flex-col items-center">
                  <LeagueBadge league={league} size={i < 3 ? "sm" : "md"} />
                  <span className="text-sm text-[var(--text-muted)] mt-2 capitalize">
                    {league}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--surface-600)]">
        <div className="max-w-7xl mx-auto text-center text-[var(--text-muted)]">
          <p>MathAcademy — Learn 4x Faster with AI-Powered Adaptive Learning</p>
        </div>
      </footer>
    </div>
  );
}
