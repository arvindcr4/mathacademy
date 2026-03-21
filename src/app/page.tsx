'use client'

import { useState } from 'react'
import Link from 'next/link'
import XPBar from '@/components/XPBar'
import CourseCard from '@/components/CourseCard'
import LeagueBadge from '@/components/LeagueBadge'
import { courses, categories } from '@/lib/curriculum'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCourses = selectedCategory
    ? courses.filter(c => c.category === selectedCategory)
    : courses

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-xl text-black">
              M
            </div>
            <span className="text-xl font-bold">MathAcademy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#courses" className="hover:text-yellow-400 transition">Courses</Link>
            <Link href="#how-it-works" className="hover:text-yellow-400 transition">How It Works</Link>
            <Link href="/dashboard" className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition">
              Start Learning
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            AI-Powered Adaptive Learning
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
            Master Skills 4x Faster
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            From mathematics to reinforcement learning to software engineering interviews.
            Our AI-powered platform adapts to your knowledge frontier and guides you through
            the most efficient learning path.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="px-8 py-4 bg-yellow-500 text-black font-bold text-lg rounded-xl hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/30">
              Start Your Journey
            </Link>
            <Link href="#courses" className="px-8 py-4 bg-white/10 backdrop-blur font-semibold text-lg rounded-xl hover:bg-white/20 transition">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* XP System Demo */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xl font-bold text-black">
                  JD
                </div>
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-gray-400">Level 12 • 2,450 XP</div>
                </div>
              </div>
              <LeagueBadge league="gold" />
            </div>

            <XPBar current={2450} goal={3000} showDaily />

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-400">847</div>
                <div className="text-sm text-gray-400">XP Today</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400">12</div>
                <div className="text-sm text-gray-400">Topics Mastered</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">89%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
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
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !selectedCategory
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              All Courses
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
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
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Adaptive Diagnostic</h3>
              <p className="text-gray-400">
                Take our 30-45 minute adaptive assessment. We&apos;ll identify your knowledge
                frontier and create a personalized learning path.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn with XP</h3>
              <p className="text-gray-400">
                Complete lessons, solve problems, and earn XP. Our mastery-based system
                ensures you truly understand each concept before moving on.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Spaced Repetition</h3>
              <p className="text-gray-400">
                Our algorithm schedules reviews at optimal intervals. Build long-term
                retention through scientifically-backed distributed practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* League System */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Compete in Weekly Leagues</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Climb through Bronze, Silver, Gold, Platinum, Diamond, and Master leagues.
            Earn XP each week to advance, but don&apos;t worry—your XP is never lost!
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master'].map((league, i) => (
              <div key={league} className="flex flex-col items-center">
                <LeagueBadge league={league} size={i < 3 ? 'sm' : 'md'} />
                <span className="text-sm text-gray-400 mt-2 capitalize">{league}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>MathAcademy — Learn 4x Faster with AI-Powered Adaptive Learning</p>
        </div>
      </footer>
    </div>
  )
}
