import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import XPBar from "./XPBar";

describe("XPBar", () => {
  describe("Basic rendering", () => {
    it("should render with current and goal values", () => {
      render(<XPBar current={50} goal={100} />);

      expect(screen.getByText("Total XP")).toBeInTheDocument();
      expect(screen.getByText("50 / 100")).toBeInTheDocument();
    });

    it("should calculate percentage correctly", () => {
      render(<XPBar current={75} goal={100} />);

      expect(screen.getByText("75%")).toBeInTheDocument();
    });

    it("should cap percentage at 100", () => {
      render(<XPBar current={150} goal={100} />);

      // Should show 100%, not 150%
      expect(screen.getByText("100%")).toBeInTheDocument();
    });

    it("should handle zero values gracefully", () => {
      render(<XPBar current={0} goal={100} />);

      expect(screen.getByText("0 / 100")).toBeInTheDocument();
    });
  });

  describe("Daily XP mode", () => {
    it("should show Daily XP label when showDaily is true", () => {
      render(<XPBar current={50} goal={100} showDaily />);

      expect(screen.getByText("Daily XP")).toBeInTheDocument();
    });

    it("should animate XP gain when showDaily is true", async () => {
      vi.useFakeTimers();

      render(<XPBar current={100} goal={200} showDaily />);

      // Initially starts at 0
      expect(screen.getByText("0 / 200")).toBeInTheDocument();

      // Fast-forward time to complete animation
      vi.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(screen.getByText("100 / 200")).toBeInTheDocument();
      });

      vi.useRealTimers();
    });

    it("should not animate when showDaily is false", () => {
      render(<XPBar current={100} goal={200} showDaily={false} />);

      // Should immediately show the value
      expect(screen.getByText("100 / 200")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle large numbers with locale formatting", () => {
      render(<XPBar current={10000} goal={100000} />);

      expect(screen.getByText("10,000 / 100,000")).toBeInTheDocument();
    });

    it("should not show percentage text when bar is too narrow", () => {
      render(<XPBar current={5} goal={100} />);

      // 5% is less than 15%, so percentage text should not appear
      expect(screen.queryByText("5%")).not.toBeInTheDocument();
    });

    it("should show percentage text when bar is wide enough", () => {
      render(<XPBar current={20} goal={100} />);

      // 20% is more than 15%, so percentage text should appear
      expect(screen.getByText("20%")).toBeInTheDocument();
    });
  });
});
