/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";

vi.mock("@/lib/user-data", () => ({
  loadUserData: vi.fn(() => ({
    name: "John Doe",
    avatar: "JD",
    xp: 2450,
    dailyXp: 847,
    dailyGoal: 3000,
    topicsMastered: 12,
    totalAnswered: 45,
    totalCorrect: 40,
    streak: 12,
  })),
  getAccuracy: vi.fn(() => 89),
  getLeague: vi.fn(() => "gold"),
  getTopicMastery: vi.fn(() => 0.5),
}));

// Mock next/link to render as a simple anchor
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock child components to isolate Home page tests
vi.mock("@/components/XPBar", () => ({
  default: ({
    current,
    goal,
    showDaily,
  }: {
    current: number;
    goal: number;
    showDaily?: boolean;
  }) => (
    <div data-testid="xp-bar" data-current={current} data-goal={goal} data-show-daily={showDaily}>
      XPBar Mock
    </div>
  ),
}));

vi.mock("@/components/CourseCard", () => ({
  default: ({ course }: { course: { id: string; name: string } }) => (
    <div data-testid={`course-card-${course.id}`}>{course.name}</div>
  ),
}));

vi.mock("@/components/LeagueBadge", () => ({
  default: ({
    league,
    size,
  }: {
    league: string;
    size?: string;
  }) => (
    <div data-testid={`league-badge-${league}`} data-size={size}>
      {league}
    </div>
  ),
}));

// Mock ThemeToggle to avoid localStorage issues in jsdom
vi.mock("@/components/ThemeToggle", () => ({
  ThemeToggle: (props: Record<string, unknown>) => (
    <button data-testid="theme-toggle" {...props}>Theme</button>
  ),
}));

// Mock EmptyState to avoid Button dependency chain
vi.mock("@/components/EmptyState", () => ({
  EmptyState: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="empty-state">
      <span>{title}</span>
      <span>{description}</span>
    </div>
  ),
}));

// Mock curriculum with a small set of courses
vi.mock("@/lib/curriculum", () => ({
  categories: [
    { id: "ai", name: "Artificial Intelligence", icon: "brain-icon" },
    { id: "software-engineering", name: "Software Engineering", icon: "code-icon" },
  ],
  courses: [
    {
      id: "course-1",
      slug: "course-one",
      name: "Course One",
      description: "First course description",
      category: "ai",
      icon: "icon-1",
      color: "#FF0000",
      topicCount: 5,
      estimatedHours: 10,
      topics: [],
    },
    {
      id: "course-2",
      slug: "course-two",
      name: "Course Two",
      description: "Second course description",
      category: "ai",
      icon: "icon-2",
      color: "#00FF00",
      topicCount: 3,
      estimatedHours: 8,
      topics: [],
    },
    {
      id: "course-3",
      slug: "course-three",
      name: "Course Three",
      description: "Third course description",
      category: "software-engineering",
      icon: "icon-3",
      color: "#0000FF",
      topicCount: 7,
      estimatedHours: 15,
      topics: [],
    },
  ],
}));

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Header", () => {
    it("should render the MathAcademy brand name", () => {
      render(<Home />);
      expect(screen.getByText("LearnNova")).toBeInTheDocument();
    });

    it("should render the M logo", () => {
      render(<Home />);
      expect(screen.getByText("M")).toBeInTheDocument();
    });

    it("should render navigation links", () => {
      render(<Home />);
      // "Courses" appears in nav and also as category filter section heading
      const coursesLinks = screen.getAllByText("Courses");
      expect(coursesLinks.length).toBeGreaterThanOrEqual(1);
      // "How It Works" appears in nav link and as section heading
      const howItWorksLinks = screen.getAllByText("How It Works");
      expect(howItWorksLinks.length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("Start Learning")).toBeInTheDocument();
    });

    it("should have correct href on navigation links", () => {
      render(<Home />);
      // Find the nav link specifically by checking anchor elements
      const coursesAnchors = screen.getAllByText("Courses");
      const coursesLink = coursesAnchors.find(
        (el) => el.closest("a")?.getAttribute("href") === "#courses"
      );
      expect(coursesLink).toBeDefined();

      const howItWorksAnchors = screen.getAllByText("How It Works");
      const howItWorksLink = howItWorksAnchors.find(
        (el) => el.closest("a")?.getAttribute("href") === "#how-it-works"
      );
      expect(howItWorksLink).toBeDefined();

      const startLearningLink = screen.getByText("Start Learning");
      expect(startLearningLink.closest("a")).toHaveAttribute(
        "href",
        "/dashboard"
      );
    });
  });

  describe("Hero Section", () => {
    it("should render the hero headline", () => {
      render(<Home />);
      expect(
        screen.getByRole("heading", { name: /Master Skills\s*4x Faster/i })
      ).toBeInTheDocument();
    });

    it("should render the AI-Powered badge", () => {
      render(<Home />);
      expect(
        screen.getByText("AI-Powered Adaptive Learning")
      ).toBeInTheDocument();
    });

    it("should render hero description text", () => {
      render(<Home />);
      expect(
        screen.getByText(/From mathematics to reinforcement learning/)
      ).toBeInTheDocument();
    });

    it("should render call-to-action buttons", () => {
      render(<Home />);
      expect(screen.getByText("Start Your Journey")).toBeInTheDocument();
      expect(screen.getByText("Browse Courses")).toBeInTheDocument();
    });

    it("should link Start Your Journey to dashboard", () => {
      render(<Home />);
      const ctaLink = screen.getByText("Start Your Journey");
      expect(ctaLink.closest("a")).toHaveAttribute("href", "/dashboard");
    });

    it("should link Browse Courses to courses section", () => {
      render(<Home />);
      const browseLink = screen.getByText("Browse Courses");
      expect(browseLink.closest("a")).toHaveAttribute("href", "#courses");
    });
  });

  describe("XP System Demo", () => {
    it("should render the demo user profile", async () => {
      render(<Home />);
      expect(await screen.findByText("John Doe")).toBeInTheDocument();
    });

    it("should render the demo user level info", () => {
      render(<Home />);
      expect(screen.getByText(/2,450 XP/)).toBeInTheDocument();
    });

    it("should render the XPBar component with correct props", () => {
      render(<Home />);
      const xpBar = screen.getByTestId("xp-bar");
      expect(xpBar).toBeInTheDocument();
      expect(xpBar).toHaveAttribute("data-current", "2450");
      expect(xpBar).toHaveAttribute("data-goal", "3000");
      expect(xpBar).toHaveAttribute("data-show-daily", "true");
    });

    it("should render demo stats", () => {
      render(<Home />);
      expect(screen.getByText("847")).toBeInTheDocument();
      expect(screen.getByText("XP Today")).toBeInTheDocument();
      expect(screen.getByText("12")).toBeInTheDocument();
      expect(screen.getByText("Topics Mastered")).toBeInTheDocument();
      expect(screen.getByText("89%")).toBeInTheDocument();
      expect(screen.getByText("Accuracy")).toBeInTheDocument();
    });

    it("should render the gold LeagueBadge", () => {
      render(<Home />);
      // Gold badge appears in the XP demo section and in the league system section
      const goldBadges = screen.getAllByTestId("league-badge-gold");
      expect(goldBadges.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Course Catalog", () => {
    it("should render the Course Catalog heading", () => {
      render(<Home />);
      expect(screen.getByText("Course Catalog")).toBeInTheDocument();
    });

    it("should render All Courses filter button", () => {
      render(<Home />);
      expect(screen.getByText("All Courses")).toBeInTheDocument();
    });

    it("should render category filter buttons", () => {
      render(<Home />);
      expect(screen.getByText("Artificial Intelligence")).toBeInTheDocument();
      expect(screen.getByText("Software Engineering")).toBeInTheDocument();
    });

    it("should render all courses initially", () => {
      render(<Home />);
      expect(screen.getByTestId("course-card-course-1")).toBeInTheDocument();
      expect(screen.getByTestId("course-card-course-2")).toBeInTheDocument();
      expect(screen.getByTestId("course-card-course-3")).toBeInTheDocument();
    });

    it("should filter courses when a category is selected", () => {
      render(<Home />);
      const aiButton = screen.getByText("Artificial Intelligence");
      fireEvent.click(aiButton);

      // AI courses should be visible
      expect(screen.getByTestId("course-card-course-1")).toBeInTheDocument();
      expect(screen.getByTestId("course-card-course-2")).toBeInTheDocument();
      // Software engineering course should not be visible
      expect(
        screen.queryByTestId("course-card-course-3")
      ).not.toBeInTheDocument();
    });

    it("should filter to software engineering courses", () => {
      render(<Home />);
      const seButton = screen.getByText("Software Engineering");
      fireEvent.click(seButton);

      expect(
        screen.queryByTestId("course-card-course-1")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId("course-card-course-2")
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("course-card-course-3")).toBeInTheDocument();
    });

    it("should show all courses again when All Courses is clicked after filtering", () => {
      render(<Home />);

      // First filter to AI
      const aiButton = screen.getByText("Artificial Intelligence");
      fireEvent.click(aiButton);
      expect(
        screen.queryByTestId("course-card-course-3")
      ).not.toBeInTheDocument();

      // Then click All Courses
      const allButton = screen.getByText("All Courses");
      fireEvent.click(allButton);
      expect(screen.getByTestId("course-card-course-1")).toBeInTheDocument();
      expect(screen.getByTestId("course-card-course-2")).toBeInTheDocument();
      expect(screen.getByTestId("course-card-course-3")).toBeInTheDocument();
    });

    it("should toggle between categories", () => {
      render(<Home />);

      // Click AI
      fireEvent.click(screen.getByText("Artificial Intelligence"));
      expect(screen.queryByTestId("course-card-course-3")).not.toBeInTheDocument();

      // Click SE
      fireEvent.click(screen.getByText("Software Engineering"));
      expect(screen.queryByTestId("course-card-course-1")).not.toBeInTheDocument();
      expect(screen.getByTestId("course-card-course-3")).toBeInTheDocument();
    });
  });

  describe("How It Works Section", () => {
    it("should render the How It Works heading", () => {
      render(<Home />);
      // "How It Works" appears both as a nav link and an h2 heading
      const howItWorksElements = screen.getAllByText("How It Works");
      expect(howItWorksElements.length).toBe(2);
      // One should be in an h2
      const h2Element = howItWorksElements.find((el) => el.tagName === "H2");
      expect(h2Element).toBeDefined();
    });

    it("should render the three step titles", () => {
      render(<Home />);
      expect(screen.getByText("Adaptive Diagnostic")).toBeInTheDocument();
      expect(screen.getByText("Learn with XP")).toBeInTheDocument();
      expect(screen.getByText("Spaced Repetition")).toBeInTheDocument();
    });

    it("should render the step numbers", () => {
      render(<Home />);
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("should render step descriptions", () => {
      render(<Home />);
      expect(screen.getByText(/adaptive assessment/i)).toBeInTheDocument();
      // "earn XP" appears in both the How It Works section and the League section
      const earnXPElements = screen.getAllByText(/earn XP/i);
      expect(earnXPElements.length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/optimal intervals/i)).toBeInTheDocument();
    });
  });

  describe("League System Section", () => {
    it("should render league section heading", () => {
      render(<Home />);
      expect(
        screen.getByText("Compete in Weekly Leagues")
      ).toBeInTheDocument();
    });

    it("should render all six league badges", () => {
      render(<Home />);
      expect(screen.getByTestId("league-badge-bronze")).toBeInTheDocument();
      expect(screen.getByTestId("league-badge-silver")).toBeInTheDocument();
      // gold appears twice (demo + league section), both should exist
      const goldBadges = screen.getAllByTestId("league-badge-gold");
      expect(goldBadges.length).toBeGreaterThanOrEqual(1);
      expect(screen.getByTestId("league-badge-platinum")).toBeInTheDocument();
      expect(screen.getByTestId("league-badge-diamond")).toBeInTheDocument();
      expect(screen.getByTestId("league-badge-master")).toBeInTheDocument();
    });

    it("should render league names as labels", () => {
      render(<Home />);
      // League names appear both in the badge mock text and span labels
      const bronzeElements = screen.getAllByText("bronze");
      expect(bronzeElements.length).toBeGreaterThanOrEqual(1);
      const silverElements = screen.getAllByText("silver");
      expect(silverElements.length).toBeGreaterThanOrEqual(1);
      const platinumElements = screen.getAllByText("platinum");
      expect(platinumElements.length).toBeGreaterThanOrEqual(1);
      const diamondElements = screen.getAllByText("diamond");
      expect(diamondElements.length).toBeGreaterThanOrEqual(1);
      const masterElements = screen.getAllByText("master");
      expect(masterElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Footer", () => {
    it("should render the footer text", () => {
      render(<Home />);
      expect(
        screen.getByText(
          /LearnNova.*Learn 4x Faster with AI-Powered Adaptive Learning/
        )
      ).toBeInTheDocument();
    });
  });
});
