"use client";

import Link from "next/link";
import { Course } from "@/lib/curriculum";

const iconMap: Record<string, string> = {
  cube: "📦", cpu: "🖥️", leaf: "🌿", atom: "⚛️", microphone: "🎙️",
};

function resolveIcon(icon: string): string {
  return iconMap[icon] ?? icon;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.slug}`}>
      <div className="border border-[var(--surface-600)] rounded-2xl overflow-hidden hover:border-[var(--mastery-blue)] hover:bg-[var(--surface-700)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-[var(--ease-out-quart)] group cursor-pointer">
        <div
          className="h-32 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${course.color}22 0%, ${course.color}08 100%)`,
          }}
        >
          {resolveIcon(course.icon)}
        </div>
        <div className="p-6 bg-[var(--surface-800)]">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-1 rounded text-xs font-medium transition-colors duration-300 group-hover:bg-[var(--xp-gold)]/20 group-hover:text-[var(--xp-gold)]"
              style={{
                backgroundColor: `${course.color}22`,
                color: course.color,
              }}
            >
              {course.category.replace("-", " ")}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--xp-gold)] transition-colors duration-300">
            {course.name}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              {course.topicCount} topics
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              ~{course.estimatedHours}h
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-[var(--mastery-blue)] group-hover:text-[var(--xp-gold)] transition-colors duration-300">
            <span>Start learning</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
