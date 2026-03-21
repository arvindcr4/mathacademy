"use client";

import Link from "next/link";
import { Course } from "@/lib/curriculum";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.slug}`}>
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
        <div
          className="h-32 flex items-center justify-center text-6xl"
          style={{
            background: `linear-gradient(135deg, ${course.color}33 0%, ${course.color}11 100%)`,
          }}
        >
          {course.icon}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: `${course.color}33`,
                color: course.color,
              }}
            >
              {course.category.replace("-", " ")}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-400 transition">
            {course.name}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
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
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-400 group-hover:text-yellow-400 transition">
            <span>Start learning</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition"
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
