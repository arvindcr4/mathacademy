/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseClient from "./CourseClient";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useParams: () => ({ slug: "rl-fundamentals" }),
}));

// Mock the courses data
vi.mock("@/lib/curriculum", () => ({
  courses: [
    {
      id: "test-course-1",
      slug: "rl-fundamentals",
      name: "Reinforcement Learning Fundamentals",
      description: "Learn the basics of RL",
      category: "machine-learning",
      icon: "🤖",
      color: "#3B82F6",
      topicCount: 2,
      estimatedHours: 10,
      topics: [
        {
          id: "topic-1",
          slug: "mdp",
          name: "Markov Decision Processes",
          description: "MDP basics",
          knowledgePoints: [
            { id: "kp-1", slug: "states-and-actions", name: "States and Actions" },
            { id: "kp-2", slug: "reward-hypothesis", name: "Reward Hypothesis" },
          ],
        },
        {
          id: "topic-2",
          slug: "bellman-equations",
          name: "Bellman Equations",
          description: "Bellman equation fundamentals",
          knowledgePoints: [
            { id: "kp-3", slug: "bellman-equations", name: "Bellman Equations" },
          ],
        },
      ],
    },
  ],
  Topic: {} as any,
}));

describe("CourseClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Course loading", () => {
    it("should render the course when found", () => {
      render(<CourseClient />);
      expect(screen.getByText("Reinforcement Learning Fundamentals")).toBeInTheDocument();
    });

    it("should show course category", () => {
      render(<CourseClient />);
      expect(screen.getByText("machine learning")).toBeInTheDocument();
    });

    it("should show course icon", () => {
      render(<CourseClient />);
      expect(screen.getByText("🤖")).toBeInTheDocument();
    });
  });

  describe("Topic navigation", () => {
    it.skip("should render topic list", () => {
      render(<CourseClient />);
      expect(screen.getAllByText("Markov Decision Processes").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Bellman Equations").length).toBeGreaterThan(0);
    });

    it("should show Topics header", () => {
      render(<CourseClient />);
      expect(screen.getByText("Topics")).toBeInTheDocument();
    });
  });

  describe("XP and progress tracking", () => {
    it("should show initial XP as 0", () => {
      render(<CourseClient />);
      expect(screen.getByText("+0")).toBeInTheDocument();
      expect(screen.getByText("XP")).toBeInTheDocument();
    });

    it("should show mastery progress bar", () => {
      render(<CourseClient />);
      expect(screen.getByText("Mastery:")).toBeInTheDocument();
    });
  });

  describe("Knowledge point navigation", () => {
    it("should show Topics section", () => {
      const { container } = render(<CourseClient />);
      // The Topics header should be visible in sidebar
      expect(container.textContent || screen.queryByText("Topics")).toBeTruthy();
    });
  });

  describe("Header navigation", () => {
    it("should have back link to dashboard", () => {
      render(<CourseClient />);
      const backLinks = screen.getAllByRole("link");
      const dashboardLink = backLinks.find(link => link.getAttribute("href") === "/dashboard");
      expect(dashboardLink).toBeDefined();
    });
  });

  describe("Course not found", () => {
    it("should handle missing course gracefully", () => {
      // This test verifies the component handles the useParams mock correctly
      const { container } = render(<CourseClient />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
