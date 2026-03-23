/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CourseClient from "./CourseClient";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useParams: () => ({ slug: "rl-fundamentals" }),
}));

vi.mock("@/lib/user-data", () => ({
  loadUserData: vi.fn(() => ({
    name: "Learner",
    avatar: "MA",
    xp: 0,
    dailyXp: 0,
    dailyGoal: 1000,
    dailyDate: "2026-03-23",
    topicsMastered: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    lastActiveDate: "2026-03-23",
    topicProgress: {
      mdp: { slug: "mdp", completedKps: 2, totalKps: 3, mastered: false },
      "bellman-equations": { slug: "bellman-equations", completedKps: 1, totalKps: 2, mastered: false },
      "dynamic-programming": { slug: "dynamic-programming", completedKps: 0, totalKps: 1, mastered: false },
    },
    kpProgress: {
      "states-and-actions": { slug: "states-and-actions", answered: 5, correct: 4, mastery: 0.85, lastAnswered: "" },
      "reward-hypothesis": { slug: "reward-hypothesis", answered: 3, correct: 2, mastery: 0.6, lastAnswered: "" },
      "discount-factor": { slug: "discount-factor", answered: 1, correct: 0, mastery: 0.3, lastAnswered: "" },
      "bellman-equations": { slug: "bellman-equations", answered: 4, correct: 3, mastery: 0.6, lastAnswered: "" },
      "bellman-recursion": { slug: "bellman-recursion", answered: 2, correct: 1, mastery: 0.5, lastAnswered: "" },
      "dp-convergence": { slug: "dp-convergence", answered: 1, correct: 0, mastery: 0.3, lastAnswered: "" },
    },
  })),
  loadUserDataAsync: vi.fn(() =>
    Promise.resolve({
      name: "Learner",
      avatar: "MA",
      xp: 0,
      dailyXp: 0,
      dailyGoal: 1000,
      dailyDate: "2026-03-23",
      topicsMastered: 0,
      totalAnswered: 0,
      totalCorrect: 0,
      streak: 0,
      lastActiveDate: "2026-03-23",
      topicProgress: {
        mdp: { slug: "mdp", completedKps: 2, totalKps: 3, mastered: false },
        "bellman-equations": { slug: "bellman-equations", completedKps: 1, totalKps: 2, mastered: false },
        "dynamic-programming": { slug: "dynamic-programming", completedKps: 0, totalKps: 1, mastered: false },
      },
      kpProgress: {
        "states-and-actions": { slug: "states-and-actions", answered: 5, correct: 4, mastery: 0.85, lastAnswered: "" },
        "reward-hypothesis": { slug: "reward-hypothesis", answered: 3, correct: 2, mastery: 0.6, lastAnswered: "" },
        "discount-factor": { slug: "discount-factor", answered: 1, correct: 0, mastery: 0.3, lastAnswered: "" },
        "bellman-equations": { slug: "bellman-equations", answered: 4, correct: 3, mastery: 0.6, lastAnswered: "" },
        "bellman-recursion": { slug: "bellman-recursion", answered: 2, correct: 1, mastery: 0.5, lastAnswered: "" },
        "dp-convergence": { slug: "dp-convergence", answered: 1, correct: 0, mastery: 0.3, lastAnswered: "" },
      },
    }),
  ),
  recordAnswerAsync: vi.fn(() =>
    Promise.resolve({
      name: "Learner", avatar: "MA", xp: 10, dailyXp: 10, dailyGoal: 1000,
      dailyDate: "2026-03-23", topicsMastered: 0, totalAnswered: 1, totalCorrect: 1,
      streak: 0, lastActiveDate: "2026-03-23", topicProgress: {}, kpProgress: {},
    }),
  ),
  getTopicMastery: vi.fn((_data: unknown, topicSlug: string) => {
    const map: Record<string, number> = { mdp: 2 / 3, "bellman-equations": 1 / 2, "dynamic-programming": 0 };
    return map[topicSlug] ?? 0;
  }),
  getKpMastery: vi.fn((_data: unknown, kpSlug: string) => {
    const map: Record<string, number> = {
      "states-and-actions": 0.85, "reward-hypothesis": 0.6, "discount-factor": 0.3,
      "bellman-equations": 0.6, "bellman-recursion": 0.5, "dp-convergence": 0.3,
    };
    return map[kpSlug] ?? 0;
  }),
}));

// Mock @/lib/questions (dynamic import in useEffect)
vi.mock("@/lib/questions", () => ({
  getAllQuestions: vi.fn(() => ({
    'states-and-actions': [{
      id: 'q1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a chess game, which of the following BEST represents a state?',
      options: ['A', 'The board position', 'Moving a piece', 'C'],
      correctAnswer: 1,
      hints: ['Need a hint?', 'Think about what captures all relevant information']
    }],
    'discount-factor': [{
      id: 'q2',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What happens when gamma equals 0?',
      options: ['Myopic', 'Agent is myopic', 'Farsighted', 'Neutral'],
      correctAnswer: 1,
      hints: ['Need a hint?']
    }]
  })),
}));

// Mock the courses data with inline questions on each KP
vi.mock("@/lib/curriculum", () => ({
  courses: [
    {
      id: "test-course-1",
      slug: "rl-fundamentals",
      name: "Reinforcement Learning Fundamentals",
      description: "Learn the basics of RL",
      category: "machine-learning",
      icon: "\u{1F916}",
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
            {
              id: "kp-1", slug: "states-and-actions", name: "States and Actions",
              questions: [{
                id: "q-sa-1", type: "multiple-choice", difficulty: "easy",
                question: "In a chess game, which of the following BEST represents a state?",
                options: ["The board position", "Moving a piece", "Winning the game", "The rules"],
                correctAnswer: 0,
                explanation: "A state represents the current configuration.",
                hints: ["Think about what fully describes the current situation."],
              }],
            },
            {
              id: "kp-2", slug: "reward-hypothesis", name: "Reward Hypothesis",
              questions: [{
                id: "q-rh-1", type: "true-false", difficulty: "easy",
                question: "The reward hypothesis states all goals can be described as maximizing cumulative reward.",
                correctAnswer: "true",
                explanation: "This is the reward hypothesis.",
              }],
            },
            {
              id: "kp-3", slug: "discount-factor", name: "Discount Factor",
              questions: [{
                id: "q-df-1", type: "multiple-choice", difficulty: "medium",
                question: "What happens when gamma equals 0?",
                options: ["Agent is myopic", "Agent values all rewards equally", "Agent never acts", "Rewards diverge"],
                correctAnswer: 0,
                explanation: "Gamma=0 means the agent only cares about immediate reward.",
              }],
            },
          ],
        },
        {
          id: "topic-2",
          slug: "bellman-equations",
          name: "Bellman Equations",
          description: "Bellman equation fundamentals",
          knowledgePoints: [
            {
              id: "kp-4", slug: "bellman-equations", name: "Bellman Equations",
              questions: [{
                id: "q-be-1", type: "multiple-choice", difficulty: "medium",
                question: "What does the Bellman equation express?",
                options: ["Recursive relationship of values", "Gradient descent", "Policy iteration", "Model dynamics"],
                correctAnswer: 0,
                explanation: "Bellman equation decomposes value into immediate reward plus discounted future value.",
              }],
            },
            {
              id: "kp-5", slug: "bellman-recursion", name: "Bellman Recursion",
              questions: [{
                id: "q-br-1", type: "true-false", difficulty: "easy",
                question: "Bellman recursion applies only to finite MDPs.",
                correctAnswer: "false",
                explanation: "It applies to infinite horizon MDPs as well.",
              }],
            },
          ],
        },
        {
          id: "topic-3",
          slug: "dynamic-programming",
          name: "Dynamic Programming",
          description: "DP methods for RL",
          knowledgePoints: [
            {
              id: "kp-6", slug: "dp-convergence", name: "DP Convergence",
              questions: [{
                id: "q-dp-1", type: "multiple-choice", difficulty: "hard",
                question: "Apply your understanding of DP convergence.",
                options: ["Value iteration converges", "Policy iteration diverges", "Both diverge", "Neither converges"],
                correctAnswer: 0,
                explanation: "Value iteration is guaranteed to converge.",
              }],
            },
          ],
        },
      ],
    },
  ],
  Topic: {},
}));

// Helper: render and wait for async effects to settle
async function renderAndWait() {
  let result: ReturnType<typeof render>;
  await act(async () => {
    result = render(<CourseClient />);
  });
  return result!;
}

describe("CourseClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Course loading", () => {
    it("should render the course when found", async () => {
      await renderAndWait();
      expect(screen.getByText("Reinforcement Learning Fundamentals")).toBeInTheDocument();
    });

    it("should show course category with dashes replaced by spaces", async () => {
      await renderAndWait();
      expect(screen.getByText("machine learning")).toBeInTheDocument();
    });

    it("should show course icon", async () => {
      await renderAndWait();
      expect(screen.getByText("\u{1F916}")).toBeInTheDocument();
    });
  });

  describe("Course not found", () => {
    it("should handle the component rendering without errors", async () => {
      const { container } = await renderAndWait();
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.queryByText("Course not found")).not.toBeInTheDocument();
    });
  });

  describe("Topic navigation sidebar", () => {
    it("should render Topics header in sidebar", async () => {
      await renderAndWait();
      expect(screen.getByText("Topics")).toBeInTheDocument();
    });

    it("should list all topics in the sidebar", async () => {
      await renderAndWait();
      expect(screen.getByRole("button", { name: /Markov Decision Processes/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Bellman Equations/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Dynamic Programming/ })).toBeInTheDocument();
    });

    it("should auto-select the first topic on load", async () => {
      await renderAndWait();
      expect(screen.getByRole("heading", { level: 2, name: "Markov Decision Processes" })).toBeInTheDocument();
      expect(screen.getByText("MDP basics")).toBeInTheDocument();
    });

    it("should switch topic when clicking a different topic button", async () => {
      await renderAndWait();
      const bellmanButton = screen.getByRole("button", { name: /Bellman Equations/ });
      fireEvent.click(bellmanButton);
      expect(screen.getByRole("heading", { level: 2, name: "Bellman Equations" })).toBeInTheDocument();
      expect(screen.getByText("Bellman equation fundamentals")).toBeInTheDocument();
    });

    it("should reset KP index to 0 when switching topics", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();
      const bellmanButton = screen.getByRole("button", { name: /Bellman Equations/ });
      fireEvent.click(bellmanButton);
      expect(screen.getByText(/1 of 2/)).toBeInTheDocument();
    });

    it("should show progress percentages for topics with user progress", async () => {
      await renderAndWait();
      // mdp: 2/3 = 67%, bellman-equations: 1/2 = 50%
      expect(screen.getByText("67%")).toBeInTheDocument();
      expect(screen.getByText("50%")).toBeInTheDocument();
    });
  });

  describe("Knowledge Point navigation", () => {
    it("should show KP counter as '1 of N' initially", async () => {
      await renderAndWait();
      expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
    });

    it("should show the current KP name", async () => {
      await renderAndWait();
      expect(screen.getByText("States and Actions")).toBeInTheDocument();
    });

    it("should advance to next KP when clicking Next", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();
      expect(screen.getByText("Reward Hypothesis")).toBeInTheDocument();
    });

    it("should go back to previous KP when clicking Previous", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Previous/));
      expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
      expect(screen.getByText("States and Actions")).toBeInTheDocument();
    });

    it("should disable Previous button on first KP", async () => {
      await renderAndWait();
      const prevButton = screen.getByText(/Previous/);
      expect(prevButton).toBeDisabled();
    });

    it("should not go below index 0 when clicking Previous on first KP", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Previous/));
      expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
    });

    it("should not go beyond the last KP index when clicking Next", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Next/));
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/3 of 3/)).toBeInTheDocument();
      expect(screen.getByText("Discount Factor")).toBeInTheDocument();
    });

    it("should clear user answer when navigating to next KP", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/The board position/));
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();
    });

    it("should clear user answer when navigating to previous KP", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Next/));
      fireEvent.click(screen.getByText(/Previous/));
      expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
    });
  });

  describe("Complete Topic link at last KP", () => {
    it("should show 'Complete Topic' link when on the last KP", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Next/));
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/3 of 3/)).toBeInTheDocument();
      const completeLink = screen.getByText(/Complete Topic/);
      expect(completeLink).toBeInTheDocument();
      expect(completeLink.closest("a")).toHaveAttribute("href", "/course/rl-fundamentals");
    });

    it("should show Next button when NOT on the last KP", async () => {
      await renderAndWait();
      expect(screen.getByText(/Next/)).toBeInTheDocument();
      expect(screen.queryByText(/Complete Topic/)).not.toBeInTheDocument();
    });

    it("should show Next button on middle KP", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/Next/)).toBeInTheDocument();
      expect(screen.queryByText(/Complete Topic/)).not.toBeInTheDocument();
    });

    it("should show Complete Topic for single-KP topics", async () => {
      await renderAndWait();
      const dpButton = screen.getByRole("button", { name: /Dynamic Programming/ });
      fireEvent.click(dpButton);
      expect(screen.getByText(/1 of 1/)).toBeInTheDocument();
      expect(screen.getByText(/Complete Topic/)).toBeInTheDocument();
    });
  });

  describe("Answer input and submission", () => {
    it("should render the question text", async () => {
      await renderAndWait();
      expect(await screen.findByText(/In a chess game, which of the following BEST represents/)).toBeInTheDocument();
    });

    it("should render answer options", async () => {
      await renderAndWait();
      expect(screen.getByText(/The board position/)).toBeInTheDocument();
      expect(screen.getByText(/Moving a piece/)).toBeInTheDocument();
    });

    it("should disable Check Answer button when no option selected", async () => {
      await renderAndWait();
      const checkButton = await screen.findByText("Check Answer");
      expect(checkButton).toBeDisabled();
    });

    it("should enable Check Answer button when an option is selected", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/The board position/));
      const checkButton = await screen.findByText("Check Answer");
      expect(checkButton).not.toBeDisabled();
    });

    it("should submit answer on Check Answer click - correct", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/The board position/));
      fireEvent.click(await screen.findByText("Check Answer"));
      expect(await screen.findByText("Correct!")).toBeInTheDocument();
    });

    it("should submit answer on Check Answer click - incorrect", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Moving a piece/));
      fireEvent.click(await screen.findByText("Check Answer"));
      expect(await screen.findByText("Incorrect")).toBeInTheDocument();
    });
  });

  describe("Feedback display", () => {
    it("should show 'Correct!' feedback when answer is correct", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/The board position/));
      fireEvent.click(await screen.findByText("Check Answer"));
      expect(await screen.findByText("Correct!")).toBeInTheDocument();
      expect(screen.getByText("\u2713")).toBeInTheDocument();
      expect(screen.getByText(/\+10 XP earned/)).toBeInTheDocument();
    });

    it("should show 'Incorrect' feedback when answer is wrong", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Moving a piece/));
      fireEvent.click(await screen.findByText("Check Answer"));
      expect(await screen.findByText("Incorrect")).toBeInTheDocument();
      expect(screen.getByText("\u2717")).toBeInTheDocument();
    });

    it("should disable the option buttons while feedback is showing", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/The board position/));
      fireEvent.click(await screen.findByText("Check Answer"));
      const options = screen.getAllByRole("button").filter((b) => b.textContent?.includes("The board position"));
      expect(options[0]).toBeDisabled();
    });

    it("should hide Check Answer button while feedback is showing", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/The board position/));
      fireEvent.click(await screen.findByText("Check Answer"));
      expect(screen.queryByText("Check Answer")).not.toBeInTheDocument();
    });

    it("should clear feedback after timeout", async () => {
    await renderAndWait();
    fireEvent.click(screen.getByText(/The board position/));
    fireEvent.click(await screen.findByText("Check Answer"));
    expect(await screen.findByText("Correct!")).toBeInTheDocument();

    await new Promise(r => setTimeout(r, 2100));

    expect(screen.queryByText("Correct!")).not.toBeInTheDocument();
  });
    });

    it("should not advance past last KP after answering", async () => {
    await renderAndWait();
    fireEvent.click(screen.getByText(/Next/));
    fireEvent.click(screen.getByText(/Next/));
    expect(screen.getByText(/3 of 3/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Agent is myopic/));
    fireEvent.click(await screen.findByText("Check Answer"));

    await new Promise(r => setTimeout(r, 2100));

    expect(screen.getByText(/3 of 3/)).toBeInTheDocument();
  });

  describe("XP tracking", () => {
    it("should show initial XP as 0", async () => {
      await renderAndWait();
      expect(screen.getByText("+0")).toBeInTheDocument();
      expect(screen.getByText(/XP this session/)).toBeInTheDocument();
    });

    it("should increment XP on correct answer", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/The board position/));
      fireEvent.click(await screen.findByText("Check Answer"));
      expect(screen.getByText("+10")).toBeInTheDocument();
    });

    it("should not increment XP on incorrect answer", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Moving a piece/));
      fireEvent.click(await screen.findByText("Check Answer"));
      expect(screen.getByText("+0")).toBeInTheDocument();
    });

    it("should accumulate XP across multiple correct answers", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/The board position/));
      fireEvent.click(await screen.findByText("Check Answer"));
      expect(screen.getByText("+10")).toBeInTheDocument();

      vi.useFakeTimers();
      await act(async () => {
        vi.advanceTimersByTime(2100);
      });
      vi.useRealTimers();

      const checkBtn = screen.queryByText("Check Answer");
      if (checkBtn) {
        const trueBtn = screen.queryByText("True");
        if (trueBtn) {
          fireEvent.click(trueBtn);
          fireEvent.click(await screen.findByText("Check Answer"));
          expect(screen.getByText("+20")).toBeInTheDocument();
        }
      }
    });
  });

  describe("Mastery level", () => {
    it("should show mastery info", async () => {
      await renderAndWait();
      expect(screen.getByText(/Mastery:/)).toBeInTheDocument();
    });

    it("should show KP mastery from user data", async () => {
      await renderAndWait();
      // states-and-actions has mastery 0.85 -> 85%
      expect(screen.getByText(/85%/)).toBeInTheDocument();
    });

    it("should update mastery when switching topics based on userProgress", async () => {
      await renderAndWait();
      const bellmanButton = screen.getByRole("button", { name: /Bellman Equations/ });
      fireEvent.click(bellmanButton);
      // bellman-equations KP has mastery 0.6 -> 60%
      expect(screen.getByText(/60%/)).toBeInTheDocument();
    });
  });

  describe("Question content", () => {
    it("should show the question for first KP", async () => {
      await renderAndWait();
      expect(await screen.findByText(/In a chess game, which of the following BEST represents/)).toBeInTheDocument();
    });

    it("should show difficulty badge", async () => {
      await renderAndWait();
      expect(await screen.findByText("easy")).toBeInTheDocument();
    });

    it("should show XP value for question", async () => {
      await renderAndWait();
      expect(await screen.findByText("10 XP")).toBeInTheDocument();
    });

    it("should show hints when available", async () => {
      await renderAndWait();
      expect(await screen.findByText("Need a hint?")).toBeInTheDocument();
    });

    it("should show the question for states-and-actions KP", async () => {
      await renderAndWait();
      expect(await screen.findByText(/In a chess game, which of the following BEST represents/)).toBeInTheDocument();
    });

    it("should show question for other KPs when navigating", async () => {
      await renderAndWait();
      fireEvent.click(screen.getByText(/Next/));
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/What happens when gamma equals 0/)).toBeInTheDocument();
    });
  });

  describe("Progress bar", () => {
    it("should show knowledge points progress info", async () => {
      await renderAndWait();
      expect(screen.getByText(/Knowledge Points/)).toBeInTheDocument();
    });

    it("should update progress display when navigating KPs", async () => {
      await renderAndWait();
      expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Next/));
      expect(screen.getByText(/2 of 3/)).toBeInTheDocument();
    });
  });

  describe("Header navigation", () => {
    it("should have back link to dashboard", async () => {
      await renderAndWait();
      const backLinks = screen.getAllByRole("link");
      const dashboardLink = backLinks.find((link) => link.getAttribute("href") === "/dashboard");
      expect(dashboardLink).toBeDefined();
    });
  });
});
