/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CoursePage, { generateStaticParams } from "./page";

// Mock CourseClient
vi.mock("./CourseClient", () => ({
  default: () => <div data-testid="course-client">CourseClient Mock</div>,
}));

// Mock curriculum
vi.mock("@/lib/curriculum", () => ({
  courses: [
    {
      id: "course-1",
      slug: "intro-to-ml",
      name: "Intro to ML",
      description: "Machine learning basics",
      category: "ai",
      icon: "brain",
      color: "#FF0000",
      topicCount: 3,
      estimatedHours: 10,
      topics: [],
    },
    {
      id: "course-2",
      slug: "deep-learning",
      name: "Deep Learning",
      description: "Deep learning fundamentals",
      category: "ai",
      icon: "neural",
      color: "#00FF00",
      topicCount: 5,
      estimatedHours: 20,
      topics: [],
    },
    {
      id: "course-3",
      slug: "systems-design",
      name: "Systems Design",
      description: "Systems design interview prep",
      category: "software-engineering",
      icon: "system",
      color: "#0000FF",
      topicCount: 8,
      estimatedHours: 30,
      topics: [],
    },
  ],
}));

describe("CoursePage", () => {
  describe("generateStaticParams", () => {
    it("should return params for all courses", async () => {
      const params = await generateStaticParams();
      expect(params).toHaveLength(3);
    });

    it("should return correct slug for each course", async () => {
      const params = await generateStaticParams();
      expect(params[0]).toEqual({ slug: "intro-to-ml" });
      expect(params[1]).toEqual({ slug: "deep-learning" });
      expect(params[2]).toEqual({ slug: "systems-design" });
    });

    it("should return an array of objects with slug property", async () => {
      const params = await generateStaticParams();
      for (const param of params) {
        expect(param).toHaveProperty("slug");
        expect(typeof param.slug).toBe("string");
        expect(param.slug.length).toBeGreaterThan(0);
      }
    });

    it("should return unique slugs", async () => {
      const params = await generateStaticParams();
      const slugs = params.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });
  });

  describe("Page Rendering", () => {
    it("should render CourseClient component", () => {
      render(<CoursePage />);
      expect(screen.getByTestId("course-client")).toBeInTheDocument();
    });

    it("should render CourseClient text", () => {
      render(<CoursePage />);
      expect(screen.getByText("CourseClient Mock")).toBeInTheDocument();
    });
  });
});
