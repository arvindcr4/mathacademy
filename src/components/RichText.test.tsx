/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RichText, { normalizeRichText } from "./RichText";

describe("RichText", () => {
  it("normalizes escaped LaTeX delimiters into markdown math syntax", () => {
    expect(normalizeRichText(String.raw`\[x^2 + 1\]`)).toBe("$$\nx^2 + 1\n$$");
    expect(normalizeRichText(String.raw`\(\alpha + \beta\)`)).toBe("$\\alpha + \\beta$");
    expect(normalizeRichText(String.raw`\$x\$`)).toBe("$x$");
  });

  it("renders markdown emphasis and KaTeX output for block content", () => {
    const { container } = render(
      <RichText
        content={String.raw`**Chain rule:** If \(f(x) = x^2\), then \[f'(x) = 2x\].`}
      />,
    );

    expect(screen.getByText("Chain rule:")).toBeInTheDocument();
    expect(container.querySelector(".katex")).not.toBeNull();
    expect(container.querySelector(".katex-display")).not.toBeNull();
    expect(container).not.toHaveTextContent(String.raw`\[`);
    expect(container).not.toHaveTextContent(String.raw`\(`);
  });

  it("renders inline math without introducing paragraph tags", () => {
    const { container } = render(
      <button type="button">
        <RichText content="Option $x^2$" inline />
      </button>,
    );

    const button = screen.getByRole("button");
    expect(button.querySelector("p")).toBeNull();
    expect(container.querySelector(".katex")).not.toBeNull();
  });
});
