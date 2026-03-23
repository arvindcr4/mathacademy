"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      // Just mock login and redirect
      router.push("/dashboard");
    }
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

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-sm text-gray-400">Log in to continue your learning journey.</p>
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
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 transition">Forgot password?</Link>
            </div>
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
            className="w-full py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/20 mt-6"
          >
            Log In
          </button>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don&apos;t have an account? <Link href="/signup" className="text-yellow-400 hover:text-yellow-300 transition font-medium">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
