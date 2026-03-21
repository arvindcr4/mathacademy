import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  // Topic 1: OpenAI API
  "openai-auth-setup": [
    {
      id: "q-sdk-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the recommended way to authenticate with the OpenAI API?",
      options: [
        "Hardcode the API key in your source code",
        "Use environment variables (OPENAI_API_KEY) or a secrets manager",
        "Pass the key as a URL parameter",
        "Use HTTP Basic Auth with username and password",
      ],
      correctAnswer: 1,
      explanation:
        "API keys should never be hardcoded in source code. Use environment variables (OPENAI_API_KEY) or secrets managers (AWS Secrets Manager, HashiCorp Vault). The OpenAI SDK automatically reads OPENAI_API_KEY from environment, making it the recommended approach.",
      hints: [
        "Never commit API keys to git",
        "Environment variables are the standard pattern",
      ],
    },
  ],

  "chat-completions-api": [
    {
      id: "q-sdk-2",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the required structure for a Chat Completion API call?",
      options: [
        "Just send a string message",
        "Send a messages array with role/content pairs (system, user, assistant)",
        "Send a single prompt parameter",
        "Send a JSON object with text field",
      ],
      correctAnswer: 1,
      explanation:
        "The Chat Completions API requires a messages array where each message has a role (system, user, assistant) and content. Example: [{role: 'system', content: 'You are helpful'}, {role: 'user', content: 'Hello'}]. This structure enables multi-turn conversations.",
      hints: [
        "Think conversation: system sets behavior, user asks, assistant responds",
        "Messages are role + content objects",
      ],
    },
    {
      id: "q-sdk-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What does the 'temperature' parameter control in Chat Completions?",
      options: [
        "The speed of the response",
        "The randomness of outputs: 0 is deterministic, higher values are more creative/random",
        "The maximum token count",
        "The model version to use",
      ],
      correctAnswer: 1,
      explanation:
        "Temperature controls sampling randomness. At 0, the model always picks the most likely token (deterministic). Higher values (0.7-1.0) introduce randomness, useful for creative tasks. For factual/consistent outputs, use low temperature. For creative writing, use higher values.",
      hints: [
        "Temperature 0 = same output every time",
        "Higher temperature = more variety/creativity",
      ],
    },
  ],

  "streaming-responses-openai": [
    {
      id: "q-sdk-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why use streaming responses instead of waiting for the complete response?",
      options: [
        "Streaming reduces total token usage",
        "Streaming improves perceived latency by showing tokens as they're generated",
        "Streaming is required for all API calls",
        "Streaming produces higher quality responses",
      ],
      correctAnswer: 1,
      explanation:
        "Streaming returns tokens as they're generated rather than waiting for the entire response. This dramatically improves perceived latency - users see the first tokens in ~100ms instead of waiting seconds for a complete response. Total time is similar, but UX is much better for long responses.",
      hints: [
        "Total time is similar, but users see progress immediately",
        "ChatGPT uses streaming for this reason",
      ],
    },
  ],

  "function-calling-openai": [
    {
      id: "q-sdk-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When using function calling, what happens when the model decides to call a function?",
      options: [
        "OpenAI executes the function and returns the result",
        "The model returns a tool_calls array with function name and arguments; you execute the function and send results back",
        "The function is defined locally and auto-executed",
        "Function calling only works with Python",
      ],
      correctAnswer: 1,
      explanation:
        "OpenAI doesn't execute functions. The model returns tool_calls with function name and JSON arguments. Your code: (1) parses the call, (2) executes the function locally, (3) sends results back as a tool message. The model then uses these results to generate the final response.",
      hints: [
        "OpenAI suggests functions, you execute them",
        "This is for security - functions run in your environment",
      ],
    },
  ],

  // Topic 2: Anthropic API
  "claude-messages-api": [
    {
      id: "q-sdk-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does Anthropic's Messages API differ from OpenAI's Chat Completions?",
      options: [
        "Anthropic uses a single prompt string",
        "Anthropic uses a messages array but system prompt is a separate top-level parameter",
        "Anthropic doesn't support multi-turn conversations",
        "There's no significant difference",
      ],
      correctAnswer: 1,
      explanation:
        "Anthropic's Messages API separates the system prompt as a top-level 'system' parameter, while conversation history is in 'messages'. This is semantically cleaner - system instructions aren't part of conversation history. Example: {system: 'You are helpful', messages: [{role: 'user', content: 'Hi'}]}.",
      hints: [
        "System prompt is separate, not in messages array",
        "Anthropic: system at top level, OpenAI: system in messages",
      ],
    },
  ],

  "system-prompt-patterns": [
    {
      id: "q-sdk-7",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is prompt caching and how does it reduce costs with Claude?",
      options: [
        "Caching stores complete responses for reuse",
        "Caching stores the system prompt and conversation prefix so they're not re-processed, reducing input token costs by 90%+",
        "Caching compresses prompts",
        "Caching only works for image inputs",
      ],
      correctAnswer: 1,
      explanation:
        "Prompt caching stores processed tokens from system prompts and conversation history. When you make subsequent requests with the same prefix, those tokens are read from cache instead of re-processed. This reduces latency and cuts input token costs by ~90%. Mark cacheable content with cache_control: {type: 'ephemeral'}.",
      hints: [
        "Cache the repeated parts (system prompt, context docs)",
        "Same prefix = cache hit = faster + cheaper",
      ],
    },
  ],

  "claude-tool-use": [
    {
      id: "q-sdk-8",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Claude's tool use, what is the difference between tool_choice 'auto' and 'any'?",
      options: [
        "'auto' and 'any' behave identically",
        "'auto' lets Claude decide whether to use tools; 'any' forces Claude to use at least one tool",
        "'any' disables all tools",
        "'auto' only allows one tool at a time",
      ],
      correctAnswer: 1,
      explanation:
        "With 'auto', Claude decides whether tools are needed - it might answer directly or use tools. With 'any', Claude must use at least one tool before responding. Use 'auto' for general cases, 'any' when you require tool usage (e.g., data fetching before response).",
      hints: [
        "'auto' = Claude's choice, 'any' = forced tool use",
        "Use 'any' when tools are required",
      ],
    },
  ],

  // Topic 3: Google AI
  "gemini-api-basics": [
    {
      id: "q-sdk-9",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What are the main Gemini model variants and their use cases?",
      options: [
        "Only one Gemini model exists",
        "Gemini Nano (on-device), Flash (fast/cheap), Pro (balanced), Ultra (most capable)",
        "Gemini Small, Medium, Large",
        "Gemini Lite and Pro only",
      ],
      correctAnswer: 1,
      explanation:
        "Gemini variants: Nano for on-device (Pixel phones), Flash for fast/cheap responses, Pro for balanced capability/cost, Ultra for most complex tasks. Choose based on your needs: Flash for high-volume simple tasks, Pro for general use, Ultra for difficult reasoning.",
      hints: [
        "More variants than other providers",
        "Nano = edge, Flash = fast, Pro = balanced, Ultra = powerful",
      ],
    },
  ],

  "google-grounding": [
    {
      id: "q-sdk-10",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is Google Search grounding in Gemini and when should you use it?",
      options: [
        "It searches Google's training data",
        "It augments responses with real-time Google Search results for current information",
        "It caches Google searches",
        "It only works for image queries",
      ],
      correctAnswer: 1,
      explanation:
        "Grounding connects Gemini to Google Search, retrieving current information to include in responses. Use it when you need up-to-date information (news, prices, events) that may not be in the model's training data. Without grounding, responses are limited to training cutoff date.",
      hints: [
        "Training data has a cutoff date",
        "Grounding = real-time web information",
      ],
    },
  ],

  // Topic 4: LangChain
  "langchain-architecture": [
    {
      id: "q-sdk-11",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What are the core abstractions in LangChain's architecture?",
      options: [
        "Only models and prompts",
        "Models, Prompts, Chains, Memory, Agents, Retrievers, Tools",
        "Only chains and agents",
        "LangChain doesn't use abstractions",
      ],
      correctAnswer: 1,
      explanation:
        "LangChain's core abstractions: (1) Models - LLMs and Chat Models, (2) Prompts - templates and management, (3) Chains - sequences of operations, (4) Memory - conversation state, (5) Agents - LLM-driven decision making, (6) Retrievers - document fetching, (7) Tools - functions agents can use.",
      hints: [
        "Think: model, prompt, chain, memory, agent, retriever, tool",
        "These compose to build applications",
      ],
    },
  ],

  "chains-lcel": [
    {
      id: "q-sdk-12",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is LCEL (LangChain Expression Language) and why use it?",
      options: [
        "A new programming language",
        "A declarative way to compose chains using pipe (|) syntax with automatic streaming and async support",
        "A template language for prompts",
        "A query language for vector databases",
      ],
      correctAnswer: 1,
      explanation:
        "LCEL is LangChain's declarative composition syntax. Instead of imperative code, you chain components with |: prompt | model | parser. Benefits: automatic streaming, async support, batch processing, and tracing. It's the recommended way to build chains in modern LangChain.",
      hints: [
        "chain = prompt | model | parser",
        "Declarative = cleaner, more features automatically",
      ],
    },
  ],

  "langchain-agents": [
    {
      id: "q-sdk-13",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the ReAct pattern used in LangChain agents?",
      options: [
        "A pattern for React.js integration",
        "A reasoning pattern where the agent alternates between Thought and Action steps",
        "A pattern for vector search",
        "A pattern for prompt caching",
      ],
      correctAnswer: 1,
      explanation:
        "ReAct (Reasoning + Acting) is an agent pattern where the LLM: (1) Thinks about what to do, (2) Decides on an Action, (3) Observes the result, (4) Repeats until done. This interleaving of reasoning and action produces more reliable agent behavior than pure prompting.",
      hints: [
        "ReAct = Reason + Act, not React.js",
        "Think, Act, Observe, Repeat",
      ],
    },
  ],

  // Topic 5: LlamaIndex
  "llamaindex-overview": [
    {
      id: "q-sdk-14",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is LlamaIndex primarily designed for?",
      options: [
        "Training language models",
        "Building RAG (Retrieval-Augmented Generation) applications with a focus on data connectors and indices",
        "Web scraping only",
        "Image generation",
      ],
      correctAnswer: 1,
      explanation:
        "LlamaIndex is a data framework for LLM applications, specializing in: (1) Data connectors for various sources (PDFs, databases, APIs), (2) Index structures for efficient retrieval, (3) Query engines for natural language access. While LangChain is general-purpose, LlamaIndex focuses on RAG.",
      hints: [
        "LlamaIndex = RAG specialist",
        "Data ingestion + indexing + querying",
      ],
    },
  ],

  "query-engines": [
    {
      id: "q-sdk-15",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What are the different query engine types in LlamaIndex?",
      options: [
        "Only one query engine exists",
        "Vector index query engine, Summary query engine, Keyword table query engine, Composable graph engine",
        "SQL query engines only",
        "REST API query engines",
      ],
      correctAnswer: 1,
      explanation:
        "LlamaIndex offers multiple query engines: (1) Vector index - semantic similarity search, (2) Summary - generates summaries of document subsets, (3) Keyword table - exact term matching, (4) Composable - combines multiple indices. Choose based on your data and query patterns.",
      hints: [
        "Different engines for different retrieval strategies",
        "Vector = semantic, Keyword = exact, Summary = synthesis",
      ],
    },
  ],

  // Topic 6: Production Patterns
  "api-error-handling": [
    {
      id: "q-sdk-16",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is exponential backoff and why is it essential for LLM APIs?",
      options: [
        "A way to speed up API calls",
        "A retry strategy that increases wait time between retries to handle rate limits gracefully",
        "A method to compress responses",
        "A caching strategy",
      ],
      correctAnswer: 1,
      explanation:
        "Exponential backoff retries failed requests with increasing delays: 1s, 2s, 4s, 8s, etc. This prevents thundering herd problems when APIs are overloaded and gives rate limits time to reset. Most SDKs have built-in retry logic; configure max_retries and retry delay appropriately.",
      hints: [
        "Rate limits are common with LLM APIs",
        "Back off slowly to avoid making things worse",
      ],
    },
  ],

  "rate-limiting": [
    {
      id: "q-sdk-17",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Your application hits OpenAI rate limits during peak usage. What's the best solution?",
      options: [
        "Make requests faster",
        "Implement request queuing with rate limit awareness and consider multiple API keys or tiers",
        "Ignore the rate limits",
        "Switch to a different model",
      ],
      correctAnswer: 1,
      explanation:
        "Solutions for rate limits: (1) Request queuing - buffer requests and process at allowed rate, (2) Multiple API keys/accounts for higher throughput, (3) Upgrade to higher tier with higher limits, (4) Use batch API for non-urgent requests, (5) Implement caching to reduce redundant calls.",
      hints: [
        "Rate limits are per-account constraints",
        "Queue, scale horizontally, or upgrade tier",
      ],
    },
  ],

  "cost-tracking": [
    {
      id: "q-sdk-18",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How do you estimate and track costs for LLM API usage?",
      options: [
        "Costs are unpredictable",
        "Track input/output tokens and multiply by per-token pricing; use response.usage fields",
        "Costs are fixed per request",
        "Only track output tokens",
      ],
      correctAnswer: 1,
      explanation:
        "LLM APIs return usage: {prompt_tokens, completion_tokens, total_tokens}. Track these and multiply by pricing (e.g., GPT-4: $0.03/1K input, $0.06/1K output). Log usage per user/feature, set budgets, and alert on anomalies. Prompt caching reduces input token costs significantly.",
      hints: [
        "Input and output tokens are priced differently",
        "response.usage contains the counts",
      ],
    },
  ],

  "multi-provider-patterns": [
    {
      id: "q-sdk-19",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is a fallback routing pattern for multi-provider LLM applications?",
      options: [
        "Always use the cheapest model",
        "Route to primary provider, automatically fall back to secondary if primary fails or times out",
        "Round-robin between all providers",
        "Only use one provider at a time",
      ],
      correctAnswer: 1,
      explanation:
        "Fallback routing: primary provider handles normal requests; on failure/timeout, automatically retry with secondary. Benefits: (1) Availability - outages don't break your app, (2) Latency - timeout fallback prevents slow responses, (3) Cost - can use cheaper primary with premium fallback.",
      hints: [
        "Primary fails, secondary saves the day",
        "Also called cascading failover",
      ],
    },
  ],

  "observability-logging": [
    {
      id: "q-sdk-20",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What metrics should you log for production LLM applications?",
      options: [
        "Only success/failure",
        "Latency, token usage, cost, model version, prompt hashes, error rates, user feedback",
        "Only token usage",
        "Only cost",
      ],
      correctAnswer: 1,
      explanation:
        "Production observability needs: (1) Latency - TTFT and total time, (2) Token usage - input/output counts, (3) Cost - calculated from usage, (4) Model version - for debugging, (5) Prompt hashes - detect prompt drift, (6) Error rates - track failures by type, (7) User feedback - quality signal.",
      hints: [
        "Log everything you'd need to debug issues",
        "Cost, latency, and quality are the big three",
      ],
    },
  ],
};

registerQuestions(questions);
