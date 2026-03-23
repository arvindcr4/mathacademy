/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseClient from "./CourseClient";

// Mock next/navigation with a slug that does NOT exist
vi.mock("next/navigation", () => ({
  useParams: () => ({ slug: "non-existent-course-slug" }),
}));

// Mock the courses data (same as main test, but the slug won't match)
vi.mock("@/lib/curriculum", () => ({
  courses: [
    {
      id: "test-course-1",
      slug: "rl-fundamentals",
      name: "RL Fundamentals",
      description: "Learn RL",
      category: "machine-learning",
      icon: "🤖",
      color: "#3B82F6",
      topicCount: 1,
      estimatedHours: 5,
      topics: [
        {
          id: "topic-1",
          slug: "mdp",
          name: "MDP",
          description: "MDP basics",
          knowledgePoints: [
            { id: "kp-1", slug: "states", name: "States" },
          ],
        },
      ],
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Topic: {} as any,
}));

describe("CourseClient - Course Not Found", () => {
  it("should show 'Course not found' when slug does not match any course", () => {
    render(<CourseClient />);
    expect(screen.getByText("Course not found")).toBeInTheDocument();
  });

  it("should show 'Go back home' link", () => {
    render(<CourseClient />);
    const homeLink = screen.getByText("Go back home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("should not render any course content", () => {
    render(<CourseClient />);
    expect(screen.queryByText("Topics")).not.toBeInTheDocument();
    expect(screen.queryByText("Mastery:")).not.toBeInTheDocument();
    expect(screen.queryByText("XP")).not.toBeInTheDocument();
  });

  it("should not render navigation buttons", () => {
    render(<CourseClient />);
    expect(screen.queryByText("Next →")).not.toBeInTheDocument();
    expect(screen.queryByText("← Previous")).not.toBeInTheDocument();
    expect(screen.queryByText("Complete Topic ✓")).not.toBeInTheDocument();
  });
});
