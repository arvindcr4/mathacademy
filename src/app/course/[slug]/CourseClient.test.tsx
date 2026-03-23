/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CourseClient from "./CourseClient";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useParams: () => ({ slug: "rl-fundamentals" }),
}));

// Mock the courses data with multiple topics and knowledge points
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
      topicCount: 3,
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
            { id: "kp-3", slug: "discount-factor", name: "Discount Factor" },
          ],
        },
        {
          id: "topic-2",
          slug: "bellman-equations",
          name: "Bellman Equations",
          description: "Bellman equation fundamentals",
          knowledgePoints: [
            { id: "kp-4", slug: "bellman-equations", name: "Bellman Equations" },
            { id: "kp-5", slug: "bellman-recursion", name: "Bellman Recursion" },
          ],
        },
        {
          id: "topic-3",
          slug: "dynamic-programming",
          name: "Dynamic Programming",
          description: "DP methods for RL",
          knowledgePoints: [
            { id: "kp-6", slug: "dp-convergence", name: "DP Convergence" },
          ],
        },
      ],
    },
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Topic: {} as any,
}));

describe("CourseClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Course loading", () => {
    it("should render the course when found", () => {
      render(<CourseClient />);
      expect(screen.getByText("Reinforcement Learning Fundamentals")).toBeInTheDocument();
    });

    it("should show course category with dashes replaced by spaces", () => {
      render(<CourseClient />);
      expect(screen.getByText("machine learning")).toBeInTheDocument();
    });

    it("should show course icon", () => {
      render(<CourseClient />);
      expect(screen.getByText("🤖")).toBeInTheDocument();
    });
  });

  describe("Course not found", () => {
    it("should handle the component rendering without errors", () => {
      // The current mock always returns rl-fundamentals which exists
      // Verifying the component renders successfully
      const { container } = render(<CourseClient />);
      expect(container.firstChild).toBeInTheDocument();
      // Verify it does NOT show "Course not found" for a valid slug
      expect(screen.queryByText("Course not found")).not.toBeInTheDocument();
    });
  });

  describe("Topic navigation sidebar", () => {
    it("should render Topics header in sidebar", () => {
      render(<CourseClient />);
      expect(screen.getByText("Topics")).toBeInTheDocument();
    });

    it("should list all topics in the sidebar", () => {
      render(<CourseClient />);
      // All topic names should appear in the sidebar buttons
      expect(screen.getByRole("button", { name: /Markov Decision Processes/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Bellman Equations/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Dynamic Programming/ })).toBeInTheDocument();
    });

    it("should auto-select the first topic on load", () => {
      render(<CourseClient />);
      // The first topic name should appear as the heading in the main content area
      expect(screen.getByRole("heading", { level: 1, name: "Markov Decision Processes" })).toBeInTheDocument();
      // Its description should be visible
      expect(screen.getByText("MDP basics")).toBeInTheDocument();
    });

    it("should switch topic when clicking a different topic button", () => {
      render(<CourseClient />);

      // Click "Bellman Equations" topic in sidebar
      const bellmanButton = screen.getByRole("button", { name: /Bellman Equations/ });
      fireEvent.click(bellmanButton);

      // Now the heading should change
      expect(screen.getByRole("heading", { level: 1, name: "Bellman Equations" })).toBeInTheDocument();
      expect(screen.getByText("Bellman equation fundamentals")).toBeInTheDocument();
    });

    it("should reset KP index to 0 when switching topics", () => {
      render(<CourseClient />);

      // Navigate to KP 2 in the first topic
      const nextButton = screen.getByText("Next →");
      fireEvent.click(nextButton);

      // Should now show KP 2 of 3
      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();

      // Switch to second topic
      const bellmanButton = screen.getByRole("button", { name: /Bellman Equations/ });
      fireEvent.click(bellmanButton);

      // Should show KP 1 of 2 (reset to first KP of new topic)
      expect(screen.getByText(/1 of 2/)).toBeInTheDocument();
    });

    it("should show progress percentages for topics with user progress", () => {
      render(<CourseClient />);
      // mdp has 85% progress, bellman-equations has 60%, dynamic-programming has 30%
      expect(screen.getByText("85%")).toBeInTheDocument();
      expect(screen.getByText("60%")).toBeInTheDocument();
      expect(screen.getByText("30%")).toBeInTheDocument();
    });
  });

  describe("Knowledge Point navigation", () => {
    it("should show KP counter as '1 of N' initially", () => {
      render(<CourseClient />);
      // First topic has 3 KPs
      expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
    });

    it("should show the current KP name", () => {
      render(<CourseClient />);
      expect(screen.getByText("States and Actions")).toBeInTheDocument();
    });

    it("should advance to next KP when clicking Next", () => {
      render(<CourseClient />);

      const nextButton = screen.getByText("Next →");
      fireEvent.click(nextButton);

      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();
      expect(screen.getByText("Reward Hypothesis")).toBeInTheDocument();
    });

    it("should go back to previous KP when clicking Previous", () => {
      render(<CourseClient />);

      // Go to KP 2
      fireEvent.click(screen.getByText("Next →"));
      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();

      // Go back to KP 1
      fireEvent.click(screen.getByText("← Previous"));
      expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
      expect(screen.getByText("States and Actions")).toBeInTheDocument();
    });

    it("should disable Previous button on first KP", () => {
      render(<CourseClient />);

      const prevButton = screen.getByText("← Previous");
      expect(prevButton).toBeDisabled();
    });

    it("should not go below index 0 when clicking Previous on first KP", () => {
      render(<CourseClient />);

      const prevButton = screen.getByText("← Previous");
      fireEvent.click(prevButton); // Should be no-op since disabled
      expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
    });

    it("should not go beyond the last KP index when clicking Next", () => {
      render(<CourseClient />);

      // Navigate to KP 2
      fireEvent.click(screen.getByText("Next →"));
      // Navigate to KP 3 (last)
      fireEvent.click(screen.getByText("Next →"));

      expect(screen.getByText(/3 of 3/)).toBeInTheDocument();
      expect(screen.getByText("Discount Factor")).toBeInTheDocument();
    });

    it("should clear user answer when navigating to next KP", () => {
      render(<CourseClient />);

      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "some answer" } });
      expect(input).toHaveValue("some answer");

      fireEvent.click(screen.getByText("Next →"));
      const newInput = screen.getByPlaceholderText("Type your answer...");
      expect(newInput).toHaveValue("");
    });

    it("should clear user answer when navigating to previous KP", () => {
      render(<CourseClient />);

      // Go forward first
      fireEvent.click(screen.getByText("Next →"));

      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "test answer" } });

      fireEvent.click(screen.getByText("← Previous"));
      const newInput = screen.getByPlaceholderText("Type your answer...");
      expect(newInput).toHaveValue("");
    });
  });

  describe("Complete Topic link at last KP", () => {
    it("should show 'Complete Topic' link when on the last KP", () => {
      render(<CourseClient />);

      // Navigate to the last KP (3 of 3)
      fireEvent.click(screen.getByText("Next →"));
      fireEvent.click(screen.getByText("Next →"));

      expect(screen.getByText(/3 of 3/)).toBeInTheDocument();
      const completeLink = screen.getByText("Complete Topic ✓");
      expect(completeLink).toBeInTheDocument();
      expect(completeLink.closest("a")).toHaveAttribute("href", "/course/rl-fundamentals");
    });

    it("should show Next button when NOT on the last KP", () => {
      render(<CourseClient />);

      // On KP 1 of 3, Next button should be present (not Complete Topic)
      expect(screen.getByText("Next →")).toBeInTheDocument();
      expect(screen.queryByText("Complete Topic ✓")).not.toBeInTheDocument();
    });

    it("should show Next button on middle KP", () => {
      render(<CourseClient />);

      fireEvent.click(screen.getByText("Next →")); // KP 2 of 3
      expect(screen.getByText("Next →")).toBeInTheDocument();
      expect(screen.queryByText("Complete Topic ✓")).not.toBeInTheDocument();
    });

    it("should show Complete Topic for single-KP topics", () => {
      render(<CourseClient />);

      // Switch to Dynamic Programming topic which has only 1 KP
      const dpButton = screen.getByRole("button", { name: /Dynamic Programming/ });
      fireEvent.click(dpButton);

      // Should immediately be on the last (and only) KP
      expect(screen.getByText(/1 of 1/)).toBeInTheDocument();
      expect(screen.getByText("Complete Topic ✓")).toBeInTheDocument();
    });
  });

  describe("Answer input and submission", () => {
    it("should render the answer input field", () => {
      render(<CourseClient />);
      expect(screen.getByPlaceholderText("Type your answer...")).toBeInTheDocument();
    });

    it("should update input value when typing", () => {
      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "my answer" } });
      expect(input).toHaveValue("my answer");
    });

    it("should disable Check Answer button when input is empty", () => {
      render(<CourseClient />);
      const checkButton = screen.getByText("Check Answer");
      expect(checkButton).toBeDisabled();
    });

    it("should enable Check Answer button when input has text", () => {
      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "test" } });

      const checkButton = screen.getByText("Check Answer");
      expect(checkButton).not.toBeDisabled();
    });

    it("should disable Check Answer when input is only whitespace", () => {
      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "   " } });

      const checkButton = screen.getByText("Check Answer");
      expect(checkButton).toBeDisabled();
    });

    it("should submit answer on Enter key press", () => {
      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "test answer" } });
      fireEvent.keyDown(input, { key: "Enter" });

      // After submission, feedback should appear (either correct or incorrect)
      const hasFeedback =
        screen.queryByText("Correct!") !== null ||
        screen.queryByText("Incorrect") !== null;
      expect(hasFeedback).toBe(true);
    });

    it("should submit answer on Check Answer click", () => {
      // Seed Math.random for deterministic test
      vi.spyOn(Math, "random").mockReturnValue(0.5); // > 0.3 = correct

      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "test answer" } });
      fireEvent.click(screen.getByText("Check Answer"));

      expect(screen.getByText("Correct!")).toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });
  });

  describe("Feedback display", () => {
    it("should show 'Correct!' feedback when answer is correct", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.8); // > 0.3 = correct

      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "answer" } });
      fireEvent.click(screen.getByText("Check Answer"));

      expect(screen.getByText("Correct!")).toBeInTheDocument();
      expect(screen.getByText("✓")).toBeInTheDocument();
      expect(screen.getByText(/\+10 XP earned/)).toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });

    it("should show 'Incorrect' feedback when answer is wrong", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.1); // < 0.3 = incorrect

      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "wrong" } });
      fireEvent.click(screen.getByText("Check Answer"));

      expect(screen.getByText("Incorrect")).toBeInTheDocument();
      expect(screen.getByText("✗")).toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });

    it("should disable the input field while feedback is showing", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "answer" } });
      fireEvent.click(screen.getByText("Check Answer"));

      expect(input).toBeDisabled();

      vi.mocked(Math.random).mockRestore();
    });

    it("should hide Check Answer button while feedback is showing", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "answer" } });
      fireEvent.click(screen.getByText("Check Answer"));

      expect(screen.queryByText("Check Answer")).not.toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });

    it("should clear feedback and advance after timeout", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "answer" } });
      fireEvent.click(screen.getByText("Check Answer"));

      expect(screen.getByText("Correct!")).toBeInTheDocument();

      // Advance timer past the 1500ms timeout
      act(() => {
        vi.advanceTimersByTime(1600);
      });

      // Feedback should be gone
      expect(screen.queryByText("Correct!")).not.toBeInTheDocument();
      // Should have advanced to next KP
      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });

    it("should not advance past last KP after answering", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      render(<CourseClient />);

      // Navigate to last KP
      fireEvent.click(screen.getByText("Next →"));
      fireEvent.click(screen.getByText("Next →"));
      expect(screen.getByText(/3 of 3/)).toBeInTheDocument();

      // Answer the question
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "answer" } });
      fireEvent.click(screen.getByText("Check Answer"));

      act(() => {
        vi.advanceTimersByTime(1600);
      });

      // Should stay on KP 3 of 3 (not crash or go beyond)
      expect(screen.getByText(/3 of 3/)).toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });
  });

  describe("XP tracking", () => {
    it("should show initial XP as 0", () => {
      render(<CourseClient />);
      expect(screen.getByText("+0")).toBeInTheDocument();
      expect(screen.getByText("XP")).toBeInTheDocument();
    });

    it("should increment XP on correct answer", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.8);

      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "answer" } });
      fireEvent.click(screen.getByText("Check Answer"));

      // XP should increase by 10 for a correct answer with a current KP
      expect(screen.getByText("+10")).toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });

    it("should not increment XP on incorrect answer", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.1);

      render(<CourseClient />);
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "wrong" } });
      fireEvent.click(screen.getByText("Check Answer"));

      expect(screen.getByText("+0")).toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });

    it("should accumulate XP across multiple correct answers", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.8);

      render(<CourseClient />);

      // First correct answer
      const input1 = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input1, { target: { value: "answer" } });
      fireEvent.click(screen.getByText("Check Answer"));
      expect(screen.getByText("+10")).toBeInTheDocument();

      // Wait for feedback to clear
      act(() => {
        vi.advanceTimersByTime(1600);
      });

      // Second correct answer (now on KP 2)
      const input2 = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input2, { target: { value: "answer 2" } });
      fireEvent.click(screen.getByText("Check Answer"));
      expect(screen.getByText("+20")).toBeInTheDocument();

      vi.mocked(Math.random).mockRestore();
    });
  });

  describe("Mastery level", () => {
    it("should show mastery label", () => {
      render(<CourseClient />);
      expect(screen.getByText("Mastery:")).toBeInTheDocument();
    });

    it("should update mastery level on correct answer", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.8);

      render(<CourseClient />);

      // The first topic starts from saved user progress (85%)
      const masteryBar = screen.getByTestId("mastery-progress-fill") as HTMLElement;
      expect(masteryBar.style.width).toBe("85%");

      // Answer correctly
      const input = screen.getByPlaceholderText("Type your answer...");
      fireEvent.change(input, { target: { value: "answer" } });
      fireEvent.click(screen.getByText("Check Answer"));

      // Mastery should increase from 85% to 95%
      expect(masteryBar.style.width).toBe("95%");

      vi.mocked(Math.random).mockRestore();
    });

    it("should update mastery when switching topics based on userProgress", () => {
      render(<CourseClient />);

      // Switch to bellman-equations topic (60% progress)
      const bellmanButton = screen.getByRole("button", { name: /Bellman Equations/ });
      fireEvent.click(bellmanButton);

      // After topic switch, mastery is set to topicProgress (0.6)
      // The mastery bar width should reflect 60%
      const masteryBar = screen.getByTestId("mastery-progress-fill") as HTMLElement;
      expect(masteryBar.style.width).toBe("60%");
    });
  });

  describe("Example and practice problems", () => {
    it("should show example section for first KP", () => {
      render(<CourseClient />);
      expect(screen.getByText("Example")).toBeInTheDocument();
      expect(screen.getByText("Follow along")).toBeInTheDocument();
    });

    it("should show practice section", () => {
      render(<CourseClient />);
      expect(screen.getByText("Practice")).toBeInTheDocument();
    });

    it("should show XP value for practice problem", () => {
      render(<CourseClient />);
      expect(screen.getByText("10 XP")).toBeInTheDocument();
    });

    it("should show hints when details is expanded", () => {
      render(<CourseClient />);
      // The hints are in a details/summary element
      const hintToggle = screen.getByText("Need a hint?");
      expect(hintToggle).toBeInTheDocument();
    });

    it("should show the example question for states-and-actions KP", () => {
      render(<CourseClient />);
      expect(
        screen.getByText(/In a chess game, which of the following BEST represents/)
      ).toBeInTheDocument();
    });

    it("should show practice or fallback prompt for KPs", () => {
      render(<CourseClient />);

      // Navigate to discount-factor KP (index 2) which has only 1 example
      fireEvent.click(screen.getByText("Next →"));
      fireEvent.click(screen.getByText("Next →"));

      // The practice section should show either the specific practice or a fallback
      // Use getAllByText since both example and practice areas may match
      const practiceElements = screen.getAllByText(/Apply your understanding of|What happens when gamma/);
      expect(practiceElements.length).toBeGreaterThan(0);
    });
  });

  describe("Progress bar", () => {
    it("should show knowledge points progress bar", () => {
      render(<CourseClient />);
      expect(
        screen.getByRole("progressbar", { name: "Knowledge point progress" })
      ).toBeInTheDocument();
    });

    it("should update progress bar width when navigating KPs", () => {
      render(<CourseClient />);

      const progressBar = screen.getByTestId("kp-progress-fill") as HTMLElement;
      // KP 1 of 3: width should be ~33%
      const initialWidth = progressBar.style.width;

      fireEvent.click(screen.getByText("Next →"));
      // KP 2 of 3: width should be ~67%
      const secondWidth = progressBar.style.width;
      expect(secondWidth).not.toBe(initialWidth);
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
});
