/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from "vitest";

// We test the layout logic directly since it's a server component with metadata.
// We import the module to test metadata and the component shape.

// Mock next modules that server components need
vi.mock("next", () => ({
  // Metadata type mock
}));

vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "font-display" }),
  Figtree: () => ({ variable: "font-body" }),
}));

describe("RootLayout", () => {
  describe("Module exports", () => {
    it("should export metadata with correct title", async () => {
      // Dynamically import to get module exports
      const layoutModule = await import("./layout");
      expect(layoutModule.metadata).toBeDefined();
      expect(layoutModule.metadata.title).toBe(
        "MathAcademy | Daily Mastery for Math and AI"
      );
    });

    it("should export metadata with correct description", async () => {
      const layoutModule = await import("./layout");
      expect(layoutModule.metadata.description).toBe(
        "AI-powered adaptive learning for mathematics, reinforcement learning, and software engineering practice."
      );
    });

    it("should export metadata with icon configuration", async () => {
      const layoutModule = await import("./layout");
      expect(layoutModule.metadata.icons).toBeDefined();
    });

    it("should export a default function (RootLayout)", async () => {
      const layoutModule = await import("./layout");
      expect(typeof layoutModule.default).toBe("function");
    });
  });

  describe("RootLayout rendering", () => {
    it("should render children inside the layout", async () => {
      const layoutModule = await import("./layout");
      const RootLayout = layoutModule.default;

      // RootLayout returns an <html> element which can't be rendered
      // inside a jsdom body. We test the structure instead.
      const result = RootLayout({
        children: "Test Content" as unknown as React.ReactNode,
      });

      // The result should be a React element
      expect(result).toBeDefined();
      expect(result.type).toBe("html");
      expect(result.props.lang).toBe("en");
    });

    it("should set lang attribute to en", async () => {
      const layoutModule = await import("./layout");
      const RootLayout = layoutModule.default;
      const result = RootLayout({ children: null });

      expect(result.props.lang).toBe("en");
    });

    it("should have a body element with antialiased class", async () => {
      const layoutModule = await import("./layout");
      const RootLayout = layoutModule.default;
      const result = RootLayout({ children: null });

      // The body is a child of html
      const body = result.props.children;
      expect(body.type).toBe("body");
      expect(body.props.className).toContain("antialiased");
    });

    it("should pass children through to body", async () => {
      const layoutModule = await import("./layout");
      const RootLayout = layoutModule.default;
      const testChild = "Hello World";
      const result = RootLayout({
        children: testChild as unknown as React.ReactNode,
      });

      const body = result.props.children;
      expect(body.props.children[1]).toBe(testChild);
    });

    it("should include a skip link before page content", async () => {
      const layoutModule = await import("./layout");
      const RootLayout = layoutModule.default;
      const result = RootLayout({ children: null });
      const body = result.props.children;
      const skipLink = body.props.children[0];

      expect(skipLink.type).toBe("a");
      expect(skipLink.props.href).toBe("#main-content");
      expect(skipLink.props.children).toBe("Skip to content");
    });
  });

  describe("Capacitor build configuration", () => {
    it("should handle CAPACITOR_BUILD env variable for icon path", async () => {
      // The layout checks process.env.CAPACITOR_BUILD
      // When not set, it uses the default path
      const layoutModule = await import("./layout");
      const icons = layoutModule.metadata.icons as { icon: string };
      // In test env, CAPACITOR_BUILD is not set, so it should use the non-capacitor path
      expect(icons.icon).toBe("/mathacademy/favicon.svg");
    });
  });
});
