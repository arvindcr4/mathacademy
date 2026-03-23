import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

type RichTextProps = {
  content: string;
  inline?: boolean;
  className?: string;
};

export function normalizeRichText(content: string): string {
  return content
    .replace(/\\\[((?:[\s\S]*?))\\\]/g, (_, expression: string) => {
      const trimmed = expression.trim();
      return trimmed ? `$$\n${trimmed}\n$$` : "";
    })
    .replace(/\\\(((?:[\s\S]*?))\\\)/g, (_, expression: string) => {
      const trimmed = expression.trim();
      return trimmed ? `$${trimmed}$` : "";
    })
    .replace(/\\\$((?:[\s\S]*?))\\\$/g, (_, expression: string) => {
      const trimmed = expression.trim();
      return trimmed ? `$${trimmed}$` : "";
    });
}

function InlineListItem({ children }: { children: ReactNode }) {
  return <span className="block">• {children}</span>;
}

const blockComponents: Components = {
  p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-6 last:mb-0">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 last:mb-0">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children, className }) => (
    <code
      className={[
        "rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.95em]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </code>
  ),
};

const inlineComponents: Components = {
  p: ({ children }) => <>{children}</>,
  ul: ({ children }) => <span className="block space-y-1">{children}</span>,
  ol: ({ children }) => <span className="block space-y-1">{children}</span>,
  li: ({ children }) => <InlineListItem>{children}</InlineListItem>,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.95em]">
      {children}
    </code>
  ),
};

export default function RichText({
  content,
  inline = false,
  className,
}: RichTextProps) {
  const normalizedContent = normalizeRichText(content);
  const sharedClassName = ["lesson-rich-text", inline ? "lesson-rich-text--inline" : null, className]
    .filter(Boolean)
    .join(" ");

  const markdown = (
    <ReactMarkdown
      components={inline ? inlineComponents : blockComponents}
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkMath]}
    >
      {normalizedContent}
    </ReactMarkdown>
  );

  if (inline) {
    return <span className={sharedClassName}>{markdown}</span>;
  }

  return <div className={sharedClassName}>{markdown}</div>;
}
