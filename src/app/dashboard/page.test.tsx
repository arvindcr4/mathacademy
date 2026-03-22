/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./page";

// Mock next/link
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

// Mock XPBar
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
      XPBar
    </div>
  ),
}));

// Mock LeagueBadge
vi.mock("@/components/LeagueBadge", () => ({
  default: ({ league, size }: { league: string; size?: string }) => (
    <div data-testid={`league-badge-${league}-${size || "md"}`}>
      {league}
    </div>
  ),
}));

// Mock curriculum data
vi.mock("@/lib/curriculum", () => ({
  courses: [
    {
      id: "test-course-1",
      slug: "test-course-one",
      name: "Test Course One",
      description: "First test course",
      category: "ai",
      icon: "TC1",
      color: "#FF0000",
      topicCount: 5,
      estimatedHours: 10,
      topics: [],
    },
    {
      id: "test-course-2",
      slug: "test-course-two",
      name: "Test Course Two",
      description: "Second test course",
      category: "ai",
      icon: "TC2",
      color: "#00FF00",
      topicCount: 3,
      estimatedHours: 8,
      topics: [],
    },
    {
      id: "test-course-3",
      slug: "test-course-three",
      name: "Test Course Three",
      description: "Third test course",
      category: "software-engineering",
      icon: "TC3",
      color: "#0000FF",
      topicCount: 7,
      estimatedHours: 15,
      topics: [],
    },
    {
      id: "test-course-4",
      slug: "test-course-four",
      name: "Test Course Four",
      description: "Fourth test course",
      category: "software-engineering",
      icon: "TC4",
      color: "#FFFF00",
      topicCount: 4,
      estimatedHours: 12,
      topics: [],
    },
  ],
}));

describe("Dashboard Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Header", () => {
    it("should render the MathAcademy brand", () => {
      render(<Dashboard />);
      expect(screen.getByText("MathAcademy")).toBeInTheDocument();
    });

    it("should link logo back to home", () => {
      render(<Dashboard />);
      const homeLink = screen.getByText("MathAcademy").closest("a");
      expect(homeLink).toHaveAttribute("href", "/");
    });

    it("should render navigation tabs", () => {
      render(<Dashboard />);
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Leaderboard")).toBeInTheDocument();
      // "Courses" tab in navigation
      const coursesButtons = screen.getAllByText("Courses");
      expect(coursesButtons.length).toBeGreaterThanOrEqual(1);
    });

    it("should render user avatar", () => {
      render(<Dashboard />);
      // The current user avatar is "JD"
      const avatars = screen.getAllByText("JD");
      expect(avatars.length).toBeGreaterThan(0);
    });
  });

  describe("Dashboard Tab (default)", () => {
    it("should show the welcome message by default", () => {
      render(<Dashboard />);
      expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    });

    it("should show the learning journey prompt", () => {
      render(<Dashboard />);
      expect(
        screen.getByText("Ready to continue your learning journey?")
      ).toBeInTheDocument();
    });

    it("should render the XPBar with daily XP props", () => {
      render(<Dashboard />);
      const xpBar = screen.getByTestId("xp-bar");
      expect(xpBar).toBeInTheDocument();
      expect(xpBar).toHaveAttribute("data-current", "847");
      expect(xpBar).toHaveAttribute("data-goal", "1000");
      expect(xpBar).toHaveAttribute("data-show-daily", "true");
    });

    it("should render user stats grid", () => {
      render(<Dashboard />);
      expect(screen.getByText("Total XP")).toBeInTheDocument();
      expect(screen.getByText("Topics Mastered")).toBeInTheDocument();
      expect(screen.getByText("Accuracy")).toBeInTheDocument();
    });

    it("should show the gold league badge", () => {
      render(<Dashboard />);
      expect(screen.getByTestId("league-badge-gold-lg")).toBeInTheDocument();
    });

    it("should show the league name", () => {
      render(<Dashboard />);
      // There's a capitalized "gold" in the League Rank section
      const leagueElements = screen.getAllByText("gold");
      expect(leagueElements.length).toBeGreaterThan(0);
    });

    it("should render Continue Learning section", () => {
      render(<Dashboard />);
      expect(screen.getByText("Continue Learning")).toBeInTheDocument();
    });

    it("should render first 3 courses in Continue Learning", () => {
      render(<Dashboard />);
      expect(screen.getByText("Test Course One")).toBeInTheDocument();
      expect(screen.getByText("Test Course Two")).toBeInTheDocument();
      expect(screen.getByText("Test Course Three")).toBeInTheDocument();
    });

    it("should link continue learning courses to their pages", () => {
      render(<Dashboard />);
      const courseLink = screen.getByText("Test Course One").closest("a");
      expect(courseLink).toHaveAttribute("href", "/course/test-course-one");
    });

    it("should render Your Knowledge Graph section", () => {
      render(<Dashboard />);
      expect(screen.getByText("Your Knowledge Graph")).toBeInTheDocument();
    });

    it("should render mastered topics description", () => {
      render(<Dashboard />);
      expect(
        screen.getByText(/Topics you.*ve mastered appear with darker colors/)
      ).toBeInTheDocument();
    });

    it("should show the user accuracy percentage", () => {
      render(<Dashboard />);
      expect(screen.getByText("89%")).toBeInTheDocument();
    });

    it("should show the topics mastered count", () => {
      render(<Dashboard />);
      expect(screen.getByText("12")).toBeInTheDocument();
    });

    it("should show In progress label for courses", () => {
      render(<Dashboard />);
      const inProgressLabels = screen.getAllByText("In progress");
      expect(inProgressLabels.length).toBe(3);
    });
  });

  describe("Tab Navigation", () => {
    it("should switch to Leaderboard tab when clicked", () => {
      render(<Dashboard />);
      const leaderboardButton = screen.getByText("Leaderboard");
      fireEvent.click(leaderboardButton);

      expect(screen.getByText("League Leaderboard")).toBeInTheDocument();
    });

    it("should switch to Courses tab when clicked", () => {
      render(<Dashboard />);
      // There may be multiple "Courses" elements; find the nav button
      const coursesButtons = screen.getAllByText("Courses");
      const navButton = coursesButtons.find(
        (el) => el.tagName === "BUTTON"
      );
      if (navButton) {
        fireEvent.click(navButton);
      }

      expect(screen.getByText("All Courses")).toBeInTheDocument();
    });

    it("should switch back to Dashboard tab", () => {
      render(<Dashboard />);

      // Go to leaderboard
      fireEvent.click(screen.getByText("Leaderboard"));
      expect(screen.getByText("League Leaderboard")).toBeInTheDocument();

      // Go back to dashboard
      fireEvent.click(screen.getByText("Dashboard"));
      expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    });

    it("should hide dashboard content when on other tabs", () => {
      render(<Dashboard />);

      fireEvent.click(screen.getByText("Leaderboard"));
      expect(screen.queryByText("Welcome back!")).not.toBeInTheDocument();
      expect(screen.queryByText("Continue Learning")).not.toBeInTheDocument();
    });
  });

  describe("Leaderboard Tab", () => {
    beforeEach(() => {
      render(<Dashboard />);
      fireEvent.click(screen.getByText("Leaderboard"));
    });

    it("should render League Leaderboard heading", () => {
      expect(screen.getByText("League Leaderboard")).toBeInTheDocument();
    });

    it("should render Gold League label", () => {
      expect(screen.getByText("Gold League")).toBeInTheDocument();
    });

    it("should render top 3 users with medals", () => {
      expect(screen.getByText("Alex Chen")).toBeInTheDocument();
      expect(screen.getByText("Sarah Kim")).toBeInTheDocument();
      expect(screen.getByText("James Wilson")).toBeInTheDocument();
    });

    it("should render table headers", () => {
      expect(screen.getByText("Rank")).toBeInTheDocument();
      expect(screen.getByText("Player")).toBeInTheDocument();
      expect(screen.getByText("League")).toBeInTheDocument();
      // "XP" appears in the top 3 user cards as labels and as a table header
      const xpElements = screen.getAllByText("XP");
      expect(xpElements.length).toBeGreaterThanOrEqual(1);
      // Verify the table header specifically by checking for th element
      const xpHeader = xpElements.find((el) => el.tagName === "TH");
      expect(xpHeader).toBeDefined();
      expect(screen.getByText("Streak")).toBeInTheDocument();
    });

    it("should render the current user row", () => {
      expect(screen.getByText("You")).toBeInTheDocument();
    });

    it("should render remaining leaderboard users", () => {
      expect(screen.getByText("Emma Davis")).toBeInTheDocument();
      expect(screen.getByText("Michael Brown")).toBeInTheDocument();
      expect(screen.getByText("Sophie Taylor")).toBeInTheDocument();
    });
  });

  describe("Courses Tab", () => {
    beforeEach(() => {
      render(<Dashboard />);
      const coursesButtons = screen.getAllByText("Courses");
      const navButton = coursesButtons.find(
        (el) => el.tagName === "BUTTON"
      );
      if (navButton) {
        fireEvent.click(navButton);
      }
    });

    it("should render All Courses heading", () => {
      expect(screen.getByText("All Courses")).toBeInTheDocument();
    });

    it("should render all courses", () => {
      expect(screen.getByText("Test Course One")).toBeInTheDocument();
      expect(screen.getByText("Test Course Two")).toBeInTheDocument();
      expect(screen.getByText("Test Course Three")).toBeInTheDocument();
      expect(screen.getByText("Test Course Four")).toBeInTheDocument();
    });

    it("should render course descriptions", () => {
      expect(screen.getByText("First test course")).toBeInTheDocument();
      expect(screen.getByText("Second test course")).toBeInTheDocument();
    });

    it("should render topic counts for courses", () => {
      const topicCounts = screen.getAllByText(/\d+ topics/);
      expect(topicCounts.length).toBeGreaterThan(0);
    });

    it("should render estimated hours for courses", () => {
      const hours = screen.getAllByText(/~\d+h/);
      expect(hours.length).toBeGreaterThan(0);
    });

    it("should link courses to their detail pages", () => {
      const courseLink = screen.getByText("Test Course One").closest("a");
      expect(courseLink).toHaveAttribute("href", "/course/test-course-one");
    });

    it("should render course category labels", () => {
      // category.replace("-", " ") is applied
      const aiLabels = screen.getAllByText("ai");
      expect(aiLabels.length).toBeGreaterThan(0);
    });
  });
});
