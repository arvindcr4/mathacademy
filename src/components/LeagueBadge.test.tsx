/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LeagueBadge from "./LeagueBadge";

describe("LeagueBadge", () => {
  describe("League rendering", () => {
    it("should render bronze league badge", () => {
      render(<LeagueBadge league="bronze" />);
      expect(screen.getByText("🥉")).toBeInTheDocument();
    });

    it("should render silver league badge", () => {
      render(<LeagueBadge league="silver" />);
      expect(screen.getByText("🥈")).toBeInTheDocument();
    });

    it("should render gold league badge", () => {
      render(<LeagueBadge league="gold" />);
      expect(screen.getByText("🥇")).toBeInTheDocument();
    });

    it("should render platinum league badge", () => {
      render(<LeagueBadge league="platinum" />);
      expect(screen.getByText("💎")).toBeInTheDocument();
    });

    it("should render diamond league badge", () => {
      render(<LeagueBadge league="diamond" />);
      expect(screen.getByText("💠")).toBeInTheDocument();
    });

    it("should render master league badge", () => {
      render(<LeagueBadge league="master" />);
      expect(screen.getByText("👑")).toBeInTheDocument();
    });
  });

  describe("Size variants", () => {
    it("should render small size by default when sm is passed", () => {
      const { container } = render(<LeagueBadge league="gold" size="sm" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("w-8", "h-8");
    });

    it("should render medium size by default", () => {
      const { container } = render(<LeagueBadge league="gold" size="md" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("w-12", "h-12");
    });

    it("should render large size", () => {
      const { container } = render(<LeagueBadge league="gold" size="lg" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("w-16", "h-16");
    });

    it("should use medium size by default", () => {
      const { container } = render(<LeagueBadge league="gold" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("w-12", "h-12");
    });
  });

  describe("Title/tooltip", () => {
    it("should have title with capitalized league name", () => {
      const { container } = render(<LeagueBadge league="gold" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveAttribute("title", "Gold League");
    });

    it("should capitalize first letter of league", () => {
      const { container } = render(<LeagueBadge league="platinum" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveAttribute("title", "Platinum League");
    });
  });

  describe("Fallback behavior", () => {
    it("should fallback to bronze for unknown league", () => {
      render(<LeagueBadge league="unknown" />);
      // Should render bronze icon as fallback
      expect(screen.getByText("🥉")).toBeInTheDocument();
    });

    it("should fallback to bronze for empty league", () => {
      render(<LeagueBadge league="" />);
      expect(screen.getByText("🥉")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have rounded-full class", () => {
      const { container } = render(<LeagueBadge league="gold" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("rounded-full");
    });

    it("should have border", () => {
      const { container } = render(<LeagueBadge league="gold" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("border-2");
    });

    it("should have shadow", () => {
      const { container } = render(<LeagueBadge league="gold" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("shadow-lg");
    });

    it("should have extra shadow for large size", () => {
      const { container } = render(<LeagueBadge league="gold" size="lg" />);
      const badge = container.querySelector("div");
      expect(badge).toHaveClass("shadow-xl");
    });
  });
});
