import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";
import { Course } from "@/lib/curriculum";

// Mock course data
const mockCourse: Course = {
  id: "test-course-1",
  slug: "test-course",
  name: "Test Course",
  description: "A test course for unit testing",
  category: "programming",
  icon: "📚",
  color: "#3B82F6",
  topicCount: 5,
  estimatedHours: 10,
  topics: [
    {
      id: "topic-1",
      slug: "topic-1",
      name: "Topic 1",
      description: "First topic",
      knowledgePoints: [
        { id: "kp-1", slug: "kp-1", name: "Knowledge Point 1" },
      ],
    },
  ],
};

describe("CourseCard", () => {
  describe("Basic rendering", () => {
    it("should render course name", () => {
      render(<CourseCard course={mockCourse} />);
      expect(screen.getByText("Test Course")).toBeInTheDocument();
    });

    it("should render course description", () => {
      render(<CourseCard course={mockCourse} />);
      expect(screen.getByText("A test course for unit testing")).toBeInTheDocument();
    });

    it("should render course icon", () => {
      render(<CourseCard course={mockCourse} />);
      expect(screen.getByText("📚")).toBeInTheDocument();
    });

    it("should render topic count", () => {
      render(<CourseCard course={mockCourse} />);
      expect(screen.getByText(/5 topics/)).toBeInTheDocument();
    });

    it("should render estimated hours", () => {
      render(<CourseCard course={mockCourse} />);
      expect(screen.getByText(/~10h/)).toBeInTheDocument();
    });
  });

  describe("Category display", () => {
    it("should render category", () => {
      render(<CourseCard course={mockCourse} />);
      // Category is displayed with dashes replaced by spaces
      expect(screen.getByText("programming")).toBeInTheDocument();
    });

    it("should format category with dashes as spaces", () => {
      const courseWithDashCategory = {
        ...mockCourse,
        category: "machine-learning",
      };
      render(<CourseCard course={courseWithDashCategory} />);
      expect(screen.getByText("machine learning")).toBeInTheDocument();
    });
  });

  describe("Link", () => {
    it("should link to correct course URL", () => {
      render(<CourseCard course={mockCourse} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/course/test-course");
    });

    it("should use course slug in URL", () => {
      const anotherCourse = {
        ...mockCourse,
        slug: "advanced-calculus",
      };
      render(<CourseCard course={anotherCourse} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/course/advanced-calculus");
    });
  });

  describe("Call to action", () => {
    it("should show 'Start learning' text", () => {
      render(<CourseCard course={mockCourse} />);
      expect(screen.getByText("Start learning")).toBeInTheDocument();
    });
  });

  describe("Long descriptions", () => {
    it("should render long descriptions", () => {
      const longDescCourse = {
        ...mockCourse,
        description:
          "This is a very long description that might normally be truncated in the UI but should still be testable",
      };
      render(<CourseCard course={longDescCourse} />);
      expect(
        screen.getByText(/This is a very long description/)
      ).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle zero topics", () => {
      const zeroTopicsCourse = {
        ...mockCourse,
        topicCount: 0,
        topics: [],
      };
      render(<CourseCard course={zeroTopicsCourse} />);
      expect(screen.getByText(/0 topics/)).toBeInTheDocument();
    });

    it("should handle zero hours", () => {
      const zeroHoursCourse = {
        ...mockCourse,
        estimatedHours: 0,
      };
      render(<CourseCard course={zeroHoursCourse} />);
      expect(screen.getByText(/~0h/)).toBeInTheDocument();
    });

    it("should handle large topic counts", () => {
      const largeCourse = {
        ...mockCourse,
        topicCount: 100,
      };
      render(<CourseCard course={largeCourse} />);
      expect(screen.getByText(/100 topics/)).toBeInTheDocument();
    });

    it("should handle large hour estimates", () => {
      const longCourse = {
        ...mockCourse,
        estimatedHours: 500,
      };
      render(<CourseCard course={longCourse} />);
      expect(screen.getByText(/~500h/)).toBeInTheDocument();
    });
  });

  describe("Special characters", () => {
    it("should handle course names with special characters", () => {
      const specialCourse = {
        ...mockCourse,
        name: "C++ & Java: Advanced Topics",
      };
      render(<CourseCard course={specialCourse} />);
      expect(screen.getByText("C++ & Java: Advanced Topics")).toBeInTheDocument();
    });

    it("should handle descriptions with special characters", () => {
      const specialDescCourse = {
        ...mockCourse,
        description: "Learn <HTML> & CSS with 100% coverage!",
      };
      render(<CourseCard course={specialDescCourse} />);
      expect(
        screen.getByText("Learn <HTML> & CSS with 100% coverage!")
      ).toBeInTheDocument();
    });
  });
});
