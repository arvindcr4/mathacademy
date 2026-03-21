import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  // Topic 1: GitHub Copilot
  "copilot-setup": [
    {
      id: "q-code-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What are the main ways to access GitHub Copilot?",
      options: [
        "Only through GitHub.com",
        "VS Code extension, JetBrains plugins, GitHub CLI, and github.com",
        "Only through VS Code",
        "Only through command line",
      ],
      correctAnswer: 1,
      explanation:
        "GitHub Copilot is available through: (1) VS Code extension (most popular), (2) JetBrains IDEs (IntelliJ, PyCharm, etc.), (3) GitHub CLI (gh copilot), (4) github.com chat in browser. It also integrates with GitHub Codespaces and can be used in Neovim.",
      hints: [
        "Copilot works in many editors, not just VS Code",
        "Even available in browser on github.com",
      ],
    },
  ],

  "inline-suggestions": [
    {
      id: "q-code-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "How does Copilot decide what code to suggest?",
      options: [
        "It randomly generates code",
        "It analyzes open files, cursor position, function signatures, and comments to predict what you need",
        "It only looks at the current line",
        "It uses predefined templates",
      ],
      correctAnswer: 1,
      explanation:
        "Copilot uses context from: (1) Currently open files, (2) Cursor position and surrounding code, (3) Function signatures and types, (4) Comments and docstrings, (5) Import statements. It synthesizes all this to predict what code you're likely to write next.",
      hints: [
        "More context = better suggestions",
        "Comments guide Copilot's understanding",
      ],
    },
  ],

  "copilot-chat": [
    {
      id: "q-code-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What can you do with Copilot Chat that you cannot do with inline suggestions?",
      options: [
        "Generate code faster",
        "Ask questions about code, explain selected code, generate tests, and have multi-turn conversations",
        "Get better code quality",
        "Use multiple languages",
      ],
      correctAnswer: 1,
      explanation:
        "Copilot Chat enables: (1) Asking questions about your codebase, (2) Explaining selected code, (3) Generating unit tests for functions, (4) Multi-turn conversations for iterative refinement, (5) Slash commands like /explain, /tests, /fix. Inline suggestions only provide code completion.",
      hints: [
        "Chat = conversation, inline = completion",
        "Use chat for explanations and complex tasks",
      ],
    },
  ],

  "copilot-context": [
    {
      id: "q-code-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What files does Copilot consider when generating suggestions?",
      options: [
        "Only the file you're editing",
        "Open editor tabs, recently viewed files, and relevant project files based on imports/references",
        "All files in your GitHub repositories",
        "Only files you explicitly select",
      ],
      correctAnswer: 1,
      explanation:
        "Copilot's context includes: (1) All open editor tabs (primary context), (2) Recently viewed/edited files, (3) Files that are imported or referenced by the current file. It doesn't scan your entire codebase - context is limited to what's actively visible or directly related.",
      hints: [
        "Open related files for better suggestions",
        "Copilot sees what you see in your editor",
      ],
    },
  ],

  "copilot-best-practices": [
    {
      id: "q-code-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How can you improve Copilot's suggestions for complex functions?",
      options: [
        "Write longer function names",
        "Add clear comments describing intent, break into smaller functions, and provide type hints",
        "Use more variables",
        "Write the code first, then ask Copilot",
      ],
      correctAnswer: 1,
      explanation:
        "Improve suggestions by: (1) Write descriptive comments before functions explaining what they should do, (2) Use clear function/variable names, (3) Break complex functions into smaller ones, (4) Add type hints for better context, (5) Start typing to give Copilot a direction.",
      hints: [
        "Comments are the most powerful hint",
        "Smaller functions = clearer context",
      ],
    },
  ],

  // Topic 2: Cursor IDE
  "cursor-setup": [
    {
      id: "q-code-6",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is Cursor and how does it differ from VS Code?",
      options: [
        "Cursor is a standalone AI model",
        "Cursor is a fork of VS Code with built-in AI features, no extension needed",
        "Cursor is a VS Code theme",
        "Cursor is a GitHub product",
      ],
      correctAnswer: 1,
      explanation:
        "Cursor is a fork of VS Code that deeply integrates AI into the editor. Unlike VS Code + Copilot extension, Cursor has AI baked in: native Cmd+K for inline edits, Cmd+L for chat, Composer for multi-file changes, and codebase-wide context (@codebase). All VS Code extensions work in Cursor.",
      hints: [
        "Cursor = VS Code + AI deeply integrated",
        "Fork means it shares VS Code's ecosystem",
      ],
    },
  ],

  "cursor-compose": [
    {
      id: "q-code-7",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is Cursor Composer and when should you use it?",
      options: [
        "A music composition tool",
        "A mode for making multi-file edits and complex refactoring across your codebase",
        "A code formatting tool",
        "A testing framework",
      ],
      correctAnswer: 1,
      explanation:
        "Composer (Cmd+I) enables multi-file AI edits: (1) Apply changes across multiple files in one request, (2) Reference other files with @file syntax, (3) Review changes file-by-file before applying, (4) Handle complex refactoring that touches many files. Use it when changes span multiple files.",
      hints: [
        "Composer = multi-file AI edits",
        "Use for refactoring that touches many files",
      ],
    },
  ],

  "cursor-context": [
    {
      id: "q-code-8",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What does @codebase do in Cursor and how does it work?",
      options: [
        "It searches GitHub for similar code",
        "It uses vector search to find relevant code across your entire project for better AI context",
        "It uploads your code to Cursor servers",
        "It only searches file names",
      ],
      correctAnswer: 1,
      explanation:
        "@codebase enables project-wide context: Cursor creates embeddings of your codebase. When you use @codebase, it finds semantically relevant code using vector similarity, not just text search. This lets the AI understand patterns across your project, not just open files. Indexing happens locally.",
      hints: [
        "Vector embeddings = semantic search",
        "Finds related code even with different names",
      ],
    },
  ],

  "cursor-rules": [
    {
      id: "q-code-9",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is .cursorrules and how does it affect Cursor's behavior?",
      options: [
        "A configuration file for Cursor extensions",
        "A file that defines project-specific coding conventions and instructions for the AI",
        "A file that blocks certain AI features",
        "A security configuration",
      ],
      correctAnswer: 1,
      explanation:
        ".cursorrules is a markdown file at project root that tells Cursor how to write code for your project. Include: coding style preferences, architecture patterns, library preferences, things to avoid. It's automatically included in AI context, ensuring consistent style across all AI suggestions.",
      hints: [
        ".cursorrules = project-specific AI instructions",
        "Like .editorconfig but for AI",
      ],
    },
  ],

  // Topic 3: AI Workflows
  "ai-code-review": [
    {
      id: "q-code-10",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What are effective patterns for using AI in code review?",
      options: [
        "Let AI approve all PRs automatically",
        "Use AI to summarize changes, identify potential issues, and explain unfamiliar code patterns",
        "Only use AI for typo detection",
        "Replace human reviewers entirely with AI",
      ],
      correctAnswer: 1,
      explanation:
        "Effective AI code review: (1) Summarize PR changes for context, (2) Identify potential bugs, security issues, performance concerns, (3) Explain unfamiliar patterns or libraries, (4) Suggest improvements. Keep humans for final approval - AI augments but doesn't replace judgment.",
      hints: [
        "AI assists review, doesn't replace it",
        "Great for catching common issues and explaining code",
      ],
    },
  ],

  "ai-refactoring": [
    {
      id: "q-code-11",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What's the best approach when using AI for large-scale refactoring?",
      options: [
        "Let AI refactor everything at once",
        "Break into small, testable changes; use AI for each step; run tests after each change",
        "Disable tests during refactoring",
        "Only refactor one file at a time",
      ],
      correctAnswer: 1,
      explanation:
        "Safe AI refactoring: (1) Break refactoring into small, atomic changes, (2) Have AI implement one change at a time, (3) Run tests after each change, (4) Review AI output before committing, (5) Keep git commits atomic. This makes it easy to identify and revert problematic changes.",
      hints: [
        "Small steps + tests = safe refactoring",
        "AI can introduce subtle bugs in large changes",
      ],
    },
  ],

  "ai-debugging": [
    {
      id: "q-code-12",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How can AI tools help with debugging?",
      options: [
        "AI fixes bugs automatically",
        "AI can explain error messages, suggest fixes, analyze stack traces, and identify root causes",
        "AI only works for syntax errors",
        "AI debugging is unreliable",
      ],
      correctAnswer: 1,
      explanation:
        "AI debugging capabilities: (1) Explain error messages in plain language, (2) Analyze stack traces to find root cause, (3) Suggest fixes with code examples, (4) Identify patterns that might cause similar issues, (5) Generate test cases to reproduce bugs. Paste the error + relevant code for best results.",
      hints: [
        "Paste error + code context for best help",
        "AI excels at explaining cryptic error messages",
      ],
    },
  ],

  "ai-testing": [
    {
      id: "q-code-13",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What types of tests can AI generate effectively?",
      options: [
        "Only unit tests",
        "Unit tests, integration tests, edge cases, and test data/fixtures",
        "Only performance tests",
        "AI cannot generate tests reliably",
      ],
      correctAnswer: 1,
      explanation:
        "AI can generate: (1) Unit tests for functions/methods, (2) Integration tests for API endpoints, (3) Edge cases you might miss (null, empty, boundary values), (4) Test fixtures and mock data, (5) Property-based test generators. Always review AI tests - they may miss business logic nuances.",
      hints: [
        "Great for boilerplate test code",
        "Review for correctness, especially edge cases",
      ],
    },
  ],

  // Topic 4: Prompt Engineering for Code
  "code-context-setting": [
    {
      id: "q-code-14",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What context should you provide when asking AI to write code?",
      options: [
        "Just describe what you want",
        "Language/framework, existing patterns, constraints, error handling needs, and example usage",
        "Only the function signature",
        "As little as possible to let AI be creative",
      ],
      correctAnswer: 1,
      explanation:
        "Provide: (1) Language and framework versions, (2) Existing code patterns in your project, (3) Constraints (performance, memory, compatibility), (4) Error handling requirements, (5) Example of how the code will be used. More specific context = better, more usable output.",
      hints: [
        "Context = constraints + patterns + usage",
        "Be specific about what you need",
      ],
    },
  ],

  "few-shot-code": [
    {
      id: "q-code-15",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How does few-shot prompting improve code generation?",
      options: [
        "It makes generation faster",
        "Providing examples of input/output patterns helps AI match your coding style and requirements",
        "It reduces token usage",
        "It's only useful for simple functions",
      ],
      correctAnswer: 1,
      explanation:
        "Few-shot for code: Show 2-3 examples of similar functions with the style, patterns, and conventions you want. AI will match the examples' style. Include: (1) Function signature pattern, (2) Comment style, (3) Error handling approach, (4) Variable naming conventions.",
      hints: [
        "Examples teach style better than descriptions",
        "Show what you want, don't just describe it",
      ],
    },
  ],

  "iterative-refinement": [
    {
      id: "q-code-16",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What's the best strategy when AI-generated code isn't quite right?",
      options: [
        "Accept it and fix manually",
        "Provide specific feedback about what's wrong and ask for targeted improvements",
        "Generate completely new code",
        "Give up on AI assistance",
      ],
      correctAnswer: 1,
      explanation:
        "Iterative refinement: (1) Identify specifically what's wrong (logic, style, edge case), (2) Ask AI to fix that specific issue, (3) Provide context about why the fix is needed, (4) Review the diff. This is more efficient than regenerating or manual fixing, and teaches you how to prompt better.",
      hints: [
        "Specific feedback = better corrections",
        "Build on what's working, fix what isn't",
      ],
    },
  ],

  // Topic 5: Code Quality
  "hallucination-risks": [
    {
      id: "q-code-17",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is 'hallucination' in AI code generation and how do you mitigate it?",
      options: [
        "AI generating code too fast",
        "AI inventing non-existent APIs, libraries, or functions that look real but don't work",
        "AI generating duplicate code",
        "AI forgetting context",
      ],
      correctAnswer: 1,
      explanation:
        "Code hallucinations include: (1) Non-existent library functions, (2) Made-up API methods, (3) Incorrect parameter names. Mitigation: (1) Verify against documentation, (2) Run code to test, (3) Use libraries you know, (4) Ask AI to explain unfamiliar APIs - hallucinations often fail under scrutiny.",
      hints: [
        "If it looks unfamiliar, verify it exists",
        "Test AI code before trusting it",
      ],
    },
  ],

  "security-review-ai": [
    {
      id: "q-code-18",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What security issues should you check for in AI-generated code?",
      options: [
        "Only SQL injection",
        "Injection vulnerabilities, hardcoded secrets, improper auth, data exposure, and insecure defaults",
        "Security is handled automatically",
        "Only check for outdated dependencies",
      ],
      correctAnswer: 1,
      explanation:
        "Review AI code for: (1) SQL/Command/LDAP injection in queries, (2) Hardcoded API keys or passwords, (3) Missing authentication checks, (4) Exposing sensitive data in logs/responses, (5) Using insecure defaults (verify=False), (6) Path traversal vulnerabilities. AI doesn't understand your security requirements.",
      hints: [
        "AI doesn't know your security requirements",
        "Check auth, secrets, and injection vectors",
      ],
    },
  ],

  "human-oversight": [
    {
      id: "q-code-19",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the recommended level of human oversight for AI-generated code?",
      options: [
        "None - trust AI completely",
        "Review all AI code before committing, understanding what each part does",
        "Only review code that throws errors",
        "Review only the first few lines",
      ],
      correctAnswer: 1,
      explanation:
        "Always review AI-generated code: (1) Read every line to understand what it does, (2) Verify logic matches your intent, (3) Check for edge cases and errors, (4) Ensure it fits your architecture. You're responsible for the code in your codebase - AI is an assistant, not an author.",
      hints: [
        "You commit it, you own it",
        "Understanding > speed",
      ],
    },
  ],

  // Topic 6: Advanced Tools
  "windsurf-cascade": [
    {
      id: "q-code-20",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is unique about Windsurf's Cascade feature?",
      options: [
        "It's a code formatter",
        "It enables agentic multi-step coding with context flow between actions",
        "It's a testing framework",
        "It only works for JavaScript",
      ],
      correctAnswer: 1,
      explanation:
        "Cascade is Windsurf's agentic coding feature: it can chain multiple actions together (read file, then understand context, then write code, then run test, then fix error) in a flow. Unlike single-turn completions, Cascade maintains context across steps, making it better for complex, multi-step coding tasks.",
      hints: [
        "Cascade = multi-step agent flow",
        "Great for complex refactoring or feature work",
      ],
    },
  ],

  "aider-cli": [
    {
      id: "q-code-21",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is Aider and what makes it different from other AI coding tools?",
      options: [
        "A browser-based code editor",
        "A terminal-based pair programming tool that directly edits files in your git repo",
        "A code hosting platform",
        "A VS Code extension",
      ],
      correctAnswer: 1,
      explanation:
        "Aider is a CLI tool for AI pair programming: (1) Runs in terminal, (2) Directly edits files in your git repo, (3) Automatically commits changes with descriptive messages, (4) Works with multiple LLM providers (Claude, GPT-4, local models). It's great for developers who prefer terminal workflows.",
      hints: [
        "Aider = terminal + git + AI",
        "Edits files directly, auto-commits",
      ],
    },
  ],

  "choosing-tools": [
    {
      id: "q-code-22",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How should you choose between different AI coding assistants?",
      options: [
        "Always use the newest one",
        "Consider: workflow integration, context capabilities, model quality, privacy requirements, and cost",
        "Use only free tools",
        "Pick based on popularity alone",
      ],
      correctAnswer: 1,
      explanation:
        "Choose based on: (1) Workflow - IDE integration vs CLI vs browser, (2) Context - file-level vs project-wide vs codebase, (3) Model - Claude vs GPT-4 vs local, (4) Privacy - cloud vs local processing, (5) Cost - subscription vs usage-based. Try several - the best tool is the one you'll actually use.",
      hints: [
        "Different tools for different workflows",
        "Try before committing to one",
      ],
    },
  ],
};

registerQuestions(questions);
