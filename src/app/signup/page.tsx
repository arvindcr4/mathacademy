"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadUserData } from "@/lib/user-data";

export default function Signup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    goals: [] as string[],
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.name && formData.email && formData.password) {
      setStep(2);
    } else if (step === 2) {
      // Complete signup
      if (typeof window !== "undefined") {
        const userData = loadUserData();
        userData.name = formData.name;
        // make an avatar out of the first 2 letters
        const parts = formData.name.split(" ");
        userData.avatar = parts.length > 1 
          ? (parts[0][0] + parts[1][0]).toUpperCase()
          : formData.name.substring(0, 2).toUpperCase();
        
        localStorage.setItem("learnnova_user_data_v2", JSON.stringify(userData));
      }
      router.push("/dashboard");
    }
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 hover:opacity-80 transition">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-xl text-black">
            M
          </div>
          <span className="text-2xl font-bold text-white">LearnNova</span>
        </Link>

        {step === 1 ? (
          <form onSubmit={handleNext} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
              <p className="text-sm text-gray-400">Join thousands of learners mastering skills 4x faster.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Jane Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20 mt-6"
            >
              Continue
            </button>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account? <Link href="/login" className="text-blue-400 hover:text-blue-300 transition font-medium">Log in</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleNext} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">What are your goals?</h2>
              <p className="text-gray-400 text-sm">Select all that apply. We&apos;ll personalize your path.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "ai", label: "Master AI & Machine Learning", icon: "🧠" },
                { id: "swe", label: "Pass Software Engineering Interviews", icon: "💻" },
                { id: "math", label: "Build Strong Math Foundations", icon: "📐" },
                { id: "research", label: "Keep up with AI Research", icon: "🔬" }
              ].map(goal => {
                const isSelected = formData.goals.includes(goal.id);
                return (
                  <button
                    type="button"
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`
                      w-full flex items-center gap-3 p-4 rounded-xl border transition text-left
                      ${isSelected
                        ? "bg-blue-500/20 border-blue-500 text-white" 
                        : "bg-black/20 border-white/10 text-gray-300 hover:border-white/30 hover:bg-white/5"}
                    `}
                  >
                    <span className="text-2xl">{goal.icon}</span>
                    <span className="font-medium flex-1">{goal.label}</span>
                    {isSelected && (
                      <span className="text-blue-400 text-lg">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={formData.goals.length === 0}
              className={`
                w-full py-4 font-bold rounded-xl transition mt-8 shadow-lg
                ${formData.goals.length > 0 
                  ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-yellow-500/20" 
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"}
              `}
            >
              Start Learning
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full py-2 text-gray-400 hover:text-white transition mt-2 text-sm font-medium"
            >
              ← Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
