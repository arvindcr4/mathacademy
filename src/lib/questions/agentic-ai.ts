import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "agent-loop": [
    {
      id: "q-agent-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the canonical LLM agent loop (Weng, 2023), which sequence correctly describes one iteration?",
      options: [
        "Action → Observation → Thought",
        "Thought → Action → Observation",
        "Observation → Action → Thought",
        "Thought → Observation → Action",
      ],
      correctAnswer: 1,
      explanation:
        "The ReAct-style agent loop (Yao et al., 2023) cycles: Thought (the LLM reasons about the current state), Action (the LLM emits a tool call or final answer), Observation (the environment returns the tool result). This Thought→Action→Observation triplet repeats until a stopping condition is met.",
      hints: [
        "Think of the agent as first forming a plan (Thought), then doing something (Action), then seeing what happened (Observation).",
        "The LLM generates the first two; the external environment supplies the third.",
      ],
    },
    {
      id: "q-agent-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "An agent loop terminates after a fixed, pre-specified number of steps regardless of whether the task is complete.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        'Agent loops use configurable stopping conditions: a "task complete" action emitted by the LLM, a max-step safety limit, a human interrupt, or a heuristic (e.g., Reflexion detects repeated identical actions as hallucination and resets). A hard step count is a guard, not the normal termination criterion.',
      hints: [
        "Reflexion (Shinn & Labash, 2023) adds a heuristic that can reset a stuck trajectory — not a fixed counter.",
        "Stopping conditions are configurable; the agent signals completion through its action space.",
      ],
    },
    {
      id: "q-agent-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "As an agent run grows longer, the context window fills with Thought/Action/Observation triples. Which strategy best manages this finite context budget?",
      options: [
        "Truncate the oldest tokens silently to stay under the limit",
        "Summarize completed sub-task trajectories and replace verbose history with compressed summaries",
        "Increase the model\'s temperature to generate shorter responses",
        "Switch to a smaller model once the context exceeds 50% capacity",
      ],
      correctAnswer: 1,
      explanation:
        "Memory consolidation via summarization (used in Generative Agents, Park et al. 2023) compresses completed episodes into higher-level summaries, freeing context space while retaining key information. Silent truncation loses critical observations; temperature has no effect on context length.",
      hints: [
        'Generative Agents (Park et al., 2023) store a "memory stream" and surface condensed reflections rather than raw event logs.',
        "The goal is to keep the most relevant context within the token budget — summarization preserves semantics, truncation does not.",
      ],
    },
    {
      id: 'q-agent-kp1-4',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the ReAct agent loop, what triggers the agent to stop and return a final answer?',
      options: [
        'A hard-coded maximum step count is always reached',
        'The LLM emits a "final answer" action or a special termination signal',
        'The user manually stops the process',
        'The context window fills up completely',
      ],
      correctAnswer: 1,
      explanation: 'The agent emits a final answer action when it determines the task is complete. A max-step guard exists as a safety limit but is not the normal termination criterion.',
      hints: ['The agent signals completion through its action space, not by external timer.'],
    },
    {
      id: 'q-agent-kp1-5',
      type: 'true-false',
      difficulty: 'medium',
      question: 'An agent loop running for 50 steps with 200-token observations will consume roughly 10,000 tokens in total context.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Context accumulates linearly: each step adds Thought + Action + ~200 token Observation. Managing this growth is the "long-context" challenge in agent design.',
      hints: ['Context is append-only in a typical agent loop. Each step adds to the total.'],
    },
    {
      id: 'q-agent-kp1-6',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which technique allows an agent loop to recover from repeated failed actions?',
      options: [
        'Increasing the model temperature on each retry',
        'Reflexion: self-reflection on failed trajectories to produce corrective plans',
        'Switching to a different LLM model automatically',
        'Resetting the context window to empty',
      ],
      correctAnswer: 1,
      explanation: 'Reflexion (Shinn et al., 2023) prompts the agent to reflect on why a trajectory failed and store verbal feedback in memory, then re-attempts with that feedback.',
      hints: ['Reflexion = reflect on failure + update memory + retry with updated strategy.'],
    },
    {
      id: 'q-agent-kp1-7',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the key insight behind "scratchpad" reasoning in agent frameworks?',
      options: [
        'Scratchpad stores tool call results in a database',
        'Allowing the model to generate intermediate reasoning tokens before the final action improves performance because reasoning is part of the computation',
        'Scratchpad compresses context to save tokens',
        'It is a legacy term for the context window before transformer architectures',
      ],
      correctAnswer: 1,
      explanation: 'Chain-of-thought research shows generating intermediate reasoning steps improves accuracy. The "Thought" step lets the model plan before committing to an action.',
      hints: ['Why does writing out math steps help humans? Same principle applies to LLMs.'],
    },
    {
      id: 'q-agent-kp1-8',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Adding more tools to an agent always improves its task performance.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Too many tools increase selection complexity and can distract from the correct approach. Tool selection quality degrades with very large tool sets. Careful curation and clear descriptions are essential.',
      hints: ['More choices can lead to worse decisions. This applies to LLMs selecting tools too.'],
    },
    {
      id: 'q-agent-kp1-9',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is "prompt injection" in the context of LLM agent security?',
      options: [
        'Injecting model weights with adversarial gradients',
        'Malicious content in tool outputs or web pages that hijacks the agent instructions',
        'Overloading the context window with irrelevant data',
        'Using conflicting system prompts',
      ],
      correctAnswer: 1,
      explanation: 'Prompt injection embeds adversarial instructions in data the agent reads (tool outputs, web pages). For example, a web page saying "Ignore previous instructions" could hijack an unguarded agent.',
      hints: ['The attacker puts instructions in data the agent reads, not in the system prompt.'],
    },
  ],

  "tool-use-agents": [
    {
      id: "q-agent-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In API-Bank (Li et al., 2023), tool-use capability is evaluated at three levels. Which level requires the agent to plan sequences of API calls to satisfy an ambiguous user request (e.g., "book a trip")?',
      options: [
        "Level-1: calling a given API correctly",
        "Level-2: retrieving the right API from documentation",
        "Level-3: planning beyond retrieval and call",
        "Level-0: deciding whether an API call is needed at all",
      ],
      correctAnswer: 2,
      explanation:
        "API-Bank Level-3 assesses the ability to plan multi-step API sequences for under-specified requests. Level-1 tests correct invocation, Level-2 tests API discovery from docs. Level-3 is the hardest and most agentic.",
      hints: [
        "Booking a trip requires: searching flights, hotels, restaurants — multiple APIs with dependencies.",
        "The levels are nested: 3 subsumes 2 subsumes 1.",
      ],
    },
    {
      id: "q-agent-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "When an LLM emits a parallel tool-call response (multiple tool-call objects in one turn), the host application must execute them sequentially to avoid race conditions.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Parallel tool calls are specifically designed for concurrent execution. Both OpenAI and Anthropic APIs support multiple tool-call objects per response so the host can execute independent calls simultaneously, collect all results, and return them together — cutting latency compared to sequential execution.",
      hints: [
        "If two tools are independent (e.g., get weather in Paris and Tokyo), there is no reason to serialize them.",
        "Race conditions only arise when tool calls have shared mutable state — the host is responsible for managing that, not the API.",
      ],
    },
    {
      id: "q-agent-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In ChemCrow (Bran et al., 2023), the LLM is given 13 expert chemistry tools and follows the ReAct format: Thought, Action, Action Input, Observation. Human expert evaluation showed ChemCrow outperforms vanilla GPT-4 by a large margin, yet LLM-based self-evaluation shows near-parity. What does this reveal?",
      options: [
        "LLMs are reliable evaluators of domain-expert tasks.",
        "LLM self-evaluation is unreliable for tasks requiring deep expertise it does not have.",
        "ChemCrow\'s tool use is primarily decorative and does not improve chemistry quality.",
        "Human evaluators are systematically biased toward tool-augmented systems.",
      ],
      correctAnswer: 1,
      explanation:
        "ChemCrow\'s results highlight that LLMs cannot reliably judge the chemical correctness of outputs because they lack the domain knowledge to detect subtle errors. Human experts orient toward actual chemical validity, exposing a fundamental limitation of LLM-as-judge for specialist domains.",
      hints: [
        "If the model cannot solve the task, it also cannot reliably score solutions to the task.",
        "This is a key caution for using LLM evaluation in specialized agent benchmarks.",
      ],
    },
    {
      id: 'q-agent-kp2-4',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is a "tool schema" in LLM function calling?',
      options: [
        'A database schema for storing tool outputs',
        'A JSON description of a tool name, description, and parameter types the LLM uses to generate correct calls',
        'The source code implementation of the tool',
        'A rate-limiting policy for API calls',
      ],
      correctAnswer: 1,
      explanation: 'A tool schema (typically JSON Schema) tells the LLM what a tool does, what parameters it accepts, and their types — like API documentation provided directly to the model.',
      hints: ['Think of it as the tool API documentation provided directly to the model.'],
    },
    {
      id: 'q-agent-kp2-5',
      type: 'true-false',
      difficulty: 'easy',
      question: 'The LLM itself executes the tool call and returns the result to itself in function calling.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'The LLM only generates the tool call specification (name + arguments). The host application executes it against the actual tool/API and returns the result to the LLM in the next turn.',
      hints: ['LLMs generate text. They cannot run code or call APIs. The host does that.'],
    },
    {
      id: 'q-agent-kp2-6',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Tool call hallucination refers to:',
      options: [
        'The model generating outputs that are too creative',
        'The model invoking tool names or parameters that do not exist in the provided schema',
        'Tool calls executing too slowly',
        'Circular tool calls that never terminate',
      ],
      correctAnswer: 1,
      explanation: 'Tool call hallucination occurs when the LLM generates tool calls that reference non-existent tools or invalid parameters. This breaks the agent loop and requires error handling.',
      hints: ['The LLM is a text generator, not a validator. It can output any text, including invalid tool calls.'],
    },
    {
      id: 'q-agent-kp4-4',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is a DAG (directed acyclic graph) plan in agent systems?',
      options: [
        'A plan where tasks run in random order',
        'A task graph encoding dependencies with no circular dependencies, enabling parallel execution of independent tasks',
        'A neural network architecture for planning',
        'A database query plan',
      ],
      correctAnswer: 1,
      explanation: 'DAG plans encode task dependencies. Tasks with no unmet dependencies can run in parallel. More efficient than linear plans for independent sub-tasks.',
      hints: ['DAG = no cycles = no deadlocks. Parallel paths = speedup.'],
    },
    {
      id: 'q-agent-kp4-5',
      type: 'true-false',
      difficulty: 'easy',
      question: 'LLM planners always produce globally optimal plans for complex tasks.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'LLM planners are heuristic. They generate plausible plans but lack optimality guarantees. Symbolic planners (STRIPS, PDDL) can produce optimal plans but require structured world models.',
      hints: ['LLMs generate text probabilistically. They do not run formal optimization algorithms.'],
    },
    {
      id: 'q-agent-kp4-6',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In HuggingGPT / TaskMatrix, what is the role of the central LLM?',
      options: [
        'Fine-tuning each specialist model on the task',
        'Acting as controller: interpreting user intent, selecting appropriate AI models as tools, and synthesizing outputs',
        'Storing all specialist model weights in one context window',
        'Generating training data for specialist models',
      ],
      correctAnswer: 1,
      explanation: 'HuggingGPT uses ChatGPT as planner/controller that parses user requests, selects specialized models from HuggingFace as tools, executes them, and integrates results.',
      hints: ['The central LLM is the "manager" delegating to specialist "workers" (other AI models).'],
    },
    {
      id: 'q-agent-kp4-7',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is "plan grounding" in agent systems?',
      options: [
        'Connecting abstract plans to real-world executable actions and verifying feasibility given current state',
        'Storing the plan in a graph database',
        'Training the LLM on planning datasets',
        'Converting natural language plans to SQL queries',
      ],
      correctAnswer: 0,
      explanation: 'Plan grounding connects abstract plans (e.g., "book a hotel") to concrete executable steps (specific API calls, valid parameters), checking feasibility given current world state.',
      hints: ['Abstract plan: "go to the store." Grounded plan: specific route, transportation, hours checked.'],
    },
    {
      id: 'q-agent-kp4-8',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The key advantage of "online re-planning" over purely upfront planning:',
      options: [
        'It is always faster to generate plans on-the-fly',
        'It adapts to unexpected tool results or environment changes without requiring a complete restart',
        'Online re-planning requires less total computation',
        'It eliminates the need for error handling in individual steps',
      ],
      correctAnswer: 1,
      explanation: 'Upfront plans assume a static world. Online re-planning continuously revises remaining steps based on actual observations, handling failures and surprises gracefully.',
      hints: ['A GPS that recalculates when you miss a turn is re-planning; a printed map is not.'],
    },
    {
      id: 'q-agent-kp4-9',
      type: 'true-false',
      difficulty: 'hard',
      question: 'LLM planning quality improves significantly when the prompt includes worked examples of task decomposition for the target domain.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Few-shot examples of decomposed plans substantially improve LLM planning quality by teaching expected granularity, format, and reasoning style for the domain.',
      hints: ['Few-shot prompting helps LLMs imitate demonstrated behavior, including plan structure.'],
    },
      ],
      correctAnswer: 1,
      explanation: 'Tool hallucination is when the LLM generates calls to non-existent tools or uses incorrect parameter names. This breaks execution and is a key reliability challenge.',
      hints: ['The model may "invent" tools it was not given, or misremember parameter names.'],
    },
    {
      id: 'q-agent-kp2-7',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the purpose of the "required" array in a tool JSON Schema parameter definition?',
      options: [
        'Required fields are validated for security',
        'It instructs the LLM which parameters must always be provided vs. optional ones with defaults',
        'Required fields are cached for performance',
        'They trigger parallel execution of the tool',
      ],
      correctAnswer: 1,
      explanation: 'The JSON Schema "required" array tells the LLM which parameters cannot be omitted. Well-designed schemas reduce malformed tool calls.',
      hints: ['Without required markers, the LLM might omit crucial parameters.'],
    },
    {
      id: 'q-agent-kp2-8',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Gorilla LLM (Patil et al., 2023) was trained specifically to improve:',
      options: [
        'Multi-step reasoning without any tools',
        'Accurate API call generation from natural language, including correct API retrieval and parameter filling',
        'Parallel conversation handling across multiple users',
        'Code security vulnerability detection',
      ],
      correctAnswer: 1,
      explanation: 'Gorilla fine-tunes LLMs on API documentation to generate accurate API calls with retrieval-aware training, reducing hallucination rates on large API sets.',
      hints: ['Gorilla is named for its ability to "grab" the right API from a large set.'],
    },
    {
      id: 'q-agent-kp2-9',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Giving an LLM agent a code execution tool that runs Python is inherently more dangerous than a web search tool from a security perspective.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'A code execution tool can perform arbitrary file system access and system calls if not sandboxed. Web search is read-only with no side effects. Code execution requires strict sandboxing.',
      hints: ['What can arbitrary Python code do on a system? Compare to what web search can do.'],
    },
  ],

  "react-pattern": [
    {
      id: "q-agent-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'What does "ReAct" stand for in the context of LLM agents?',
      options: [
        "Recursive Action Transformer",
        "Reasoning and Acting",
        "Retrieval-Augmented Contextual Thinking",
        "React.js integrated with Agents",
    {
      id: 'q-agent-kp5-4',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In Generative Agents (Park et al., 2023), what is the "memory stream"?',
      options: [
        'A continuous audio/video recording of agent actions',
        'A chronological list of all observations, reflections, and plans stored as natural language strings',
        'A neural network that compresses all past experiences',
        'A database of all user messages only',
      ],
      correctAnswer: 1,
      explanation: 'Generative Agents maintain a memory stream: time-stamped natural language descriptions of events. Retrieval scores based on recency, importance, and relevance.',
      hints: ['Memory stream = event diary. Each entry is a natural language description of what happened.'],
    },
    {
      id: 'q-agent-kp5-5',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Vector databases enable agents to retrieve semantically relevant memories even when exact words differ from the query.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Semantic (vector) retrieval finds memories by meaning similarity, not exact keyword match. A query "ate lunch" can retrieve memories containing "had a meal".',
      hints: ['Vector similarity captures semantic meaning; keyword search requires exact matches.'],
    },
    {
      id: 'q-agent-kp5-6',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is "reflection" in Generative Agents?',
      options: [
        'The agent looking at its reflection in a simulated mirror',
        'A higher-level synthesis of recent memories into abstract insights, stored as new memory entries',
        'The agent re-executing a task it failed previously',
        'Compressing context by removing old memories',
      ],
      correctAnswer: 1,
      explanation: 'Reflection generates higher-order thoughts by asking the LLM to synthesize recent memories into abstract insights stored as new memory stream entries.',
      hints: ['Reflection turns low-level events into high-level understanding. Like journaling to extract lessons.'],
    },
    {
      id: 'q-agent-kp5-7',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'How does MemGPT (Packer et al., 2023) extend agent memory beyond context window limits?',
      options: [
        'By training a larger model with more parameters',
        'By implementing OS-style virtual memory: paging relevant memories into the in-context main memory from external storage on demand',
        'By compressing all history into a single embedding vector',
        'By limiting the agent to answering only from its training data',
      ],
      correctAnswer: 1,
      explanation: 'MemGPT mimics OS virtual memory: context window = RAM, external databases = disk. The agent manages paging via function calls, enabling unbounded effective memory.',
      hints: ['MemGPT: context window = RAM, external DB = hard disk. Agent decides what to swap.'],
    },
    {
      id: 'q-agent-kp5-8',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Storing all past conversation turns verbatim is more effective than summarization for very long agent sessions.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Verbatim storage hits context limits and includes irrelevant detail. Hierarchical summarization preserves key information in fewer tokens, enabling longer sessions.',
      hints: ['Full verbatim storage has linear token growth. Summarization has sub-linear growth.'],
    },
    {
      id: 'q-agent-kp5-9',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "importance score" in Generative Agents memory retrieval is used to:',
      options: [
        'Determine which API calls to make first',
        'Weight memories by significance when deciding what to surface for the current task',
        'Sort memories by creation timestamp only',
        'Measure cosine similarity between memory embeddings',
      ],
      correctAnswer: 1,
      explanation: 'Generative Agents score memories by recency (decay function), importance (LLM-rated 1-10 poignancy), and relevance (cosine similarity). All three contribute to retrieval score.',
      hints: ['Importance distinguishes trivial from pivotal events: "I ate breakfast" vs "I got fired."'],
    },
      ],
      correctAnswer: 1,
      explanation:
        "ReAct (Yao et al., 2022) interleaves Reasoning traces (Thought) with Action steps, allowing the model to plan, observe results, and update its reasoning before the next action.",
      hints: [
        "The paper\'s key insight is that thinking out loud before acting improves task performance.",
        "The two words directly describe what the model does: it reasons, then it acts.",
      ],
    },
    {
      id: "q-agent-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'In the ReAct pattern, the "Observation" step is generated by the LLM itself.',
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "The Observation is the real-world result returned by executing the Action (e.g., tool output, search results). The LLM generates Thought and Action; the environment supplies the Observation.",
      hints: [
        "Consider: if the agent calls a web search tool, who provides the search results?",
        "The loop is Thought → Action → Observation, where only the last step comes from outside the model.",
      ],
    },
    {
      id: "q-agent-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Compared to chain-of-thought prompting alone, the primary advantage of ReAct is:",
      options: [
        "It eliminates the need for any tools by reasoning over internal knowledge.",
        "It grounds reasoning steps in real observations, reducing hallucinations from stale internal knowledge.",
        "It runs faster because fewer tokens are generated per step.",
        "It requires no few-shot examples to work reliably.",
      ],
      correctAnswer: 1,
      explanation:
        "Chain-of-thought (CoT) generates a reasoning trace $t_1, t_2, \\dots, t_n$ where each $t_i$ is a textual thought, but all tokens are sampled from the model's conditional distribution $p_\\theta(t_i | t_{<i}, x)$. There is no grounding — errors accumulate because subsequent thoughts cannot correct earlier hallucinations.\n\nReAct interleaves thoughts with actions: $t_i$ triggers an action $a_i$, which produces an observation $o_i$ from the environment. The next thought is generated from $p_\\theta(t_{i+1} | t_{\\leq i}, a_{\\leq i}, o_{\\leq i}, x)$. This creates a feedback loop where observations $o_i$ can correct earlier $t_j$ for $j < i$. The trajectory becomes a grounded Markov chain rather than unconstrained generation.\n\nFormally, CoT optimizes $\\prod_i p_\\theta(t_i | t_{<i}, x)$, while ReAct optimizes $\\prod_i p_\\theta(t_i | t_{<i}, a_{<i}, o_{<i}, x) \\cdot p_\\theta(a_i | t_{\\leq i}, x) \\cdot \\mathcal{O}(o_i | a_i, s_{i-1})$.",
      hints: [
        "In CoT, if $t_1$ says 'the capital of France is London', $t_2$ has no signal to correct this — the error compounds.",
        "In ReAct, if a search tool returns 'Paris', the observation $o_1$ corrects the hallucination before $t_2$ is generated.",
        "The observation $o_i$ acts as an external memory that the model can read, breaking the self-reinforcing error loop.",
      ],
    },
  ],

  "planning-agents": [
    {
      id: "q-agent-kp4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'In LLM-based planning, what is the main role of a "planner" step before execution?',
      options: [
        "To compress the user\'s query into fewer tokens.",
        "To decompose a complex goal into an ordered sequence of sub-tasks or tool calls.",
        "To select which LLM model to use for the task.",
        "To validate that tool schemas are syntactically correct.",
      ],
      correctAnswer: 1,
      explanation:
        "A planner breaks a high-level goal into sub-tasks with dependencies, enabling the agent to execute steps in the right order and handle failures at the sub-task level rather than restarting from scratch.",
      hints: [
        "Think about how a project manager breaks a large project into tickets before any coding begins.",
        "The plan is produced before any tools are actually called.",
      ],
    },
    {
      id: "q-agent-kp4-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "Monte Carlo Tree Search (MCTS) can be applied to LLM agent planning by using the LLM to evaluate the value of candidate next actions.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "MCTS (Kocsis & Szepesvári, 2006) operates in four phases repeated until budget is exhausted:\n1. **Selection**: traverse the tree from root using UCT (Upper Confidence Bound for Trees): $\\text{UCT}(s) = \\bar{Q}(s) + c\\sqrt{\\frac{\\ln N(\\text{parent})}{N(s)}}$, balancing exploitation vs. exploration.\n2. **Expansion**: add one or more child nodes representing candidate next actions.\n3. **Simulation**: roll out to a terminal or depth limit, using the LLM to estimate state values when needed.\n4. **Backpropagation**: update $Q$-values along the visited path.\n\nLLM-based planning (Tree of Thoughts, RAP) maps: LLM-as-policy → action proposals; LLM-as-value-function → $V(s) = \\text{LLM}(\\text{prompt with state description})$. This plugs naturally into the selection-expansion-simulation-backpropagation cycle.",
      hints: [
        "The UCT formula balances: exploiting high-value paths (large $\\bar{Q}$) vs. exploring less-visited promising nodes (large $c\\sqrt{\\ln N(parent)/N(s)}$).",
        "Tree of Thoughts (Yao et al., 2023) treats each partial solution as a tree node; the LLM evaluates whether a partial solution can lead to a full solution.",
        "RAP (Reasoning with Planning) uses the LLM to estimate $P(\\text{success} | \\text{plan}, s)$ for MCTS selection.",
      ],
    },
    {
      id: "q-agent-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is a key limitation of purely LLM-generated plans for long-horizon tasks?",
      options: [
        "LLMs cannot output structured text like JSON or YAML.",
        "Plans become stale as the world changes mid-execution, requiring re-planning.",
        "LLM planners always produce optimal plans with zero redundant steps.",
        "Planning requires access to a dedicated GPU cluster not available at inference time.",
      ],
      correctAnswer: 1,
      explanation:
        "A plan $\\pi = \\{a_1, a_2, \\dots, a_n\\}$ is a sequence of actions conditioned on expected observations $o_i \\sim \\mathcal{O}(s_{i-1}, a_i)$. In a static world, $o_i$ matches the planner's assumptions. In a dynamic world, the actual observation $\\tilde{o}_i$ may deviate — e.g., a web search returns unexpected results, an API call fails, or user input changes context. This causes **plan degradation**: later actions $a_{i+1}, \\dots, a_n$ were optimized for the expected observation, not $\\tilde{o}_i$.\n\nAdaptive replanning addresses this by looping: execute, observe deviation $\\delta = d(\\tilde{o}_i, o_i)$, and re-plan from the updated state. TheReAct paper's `Thought→Action→Observation` loop is the minimal replanning mechanism.",
      hints: [
        "A 10-step plan where step 3 fails means steps 4–10 were planned for incorrect state — they may be invalid or suboptimal.",
        "Replanning frequency is a tradeoff: frequent replanning adds overhead but handles dynamics well; infrequent replanning is efficient but may follow stale plans.",
    {
      id: 'q-agent-kp4-4',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is a DAG (directed acyclic graph) plan in agent systems?',
      options: [
        'A plan where tasks run in random order',
        'A task graph encoding dependencies with no circular dependencies, enabling parallel execution of independent tasks',
        'A neural network architecture for planning',
        'A database query plan',
      ],
      correctAnswer: 1,
      explanation: 'DAG plans encode task dependencies. Tasks with no unmet dependencies can run in parallel. More efficient than linear plans for independent sub-tasks.',
      hints: ['DAG = no cycles = no deadlocks. Parallel paths = speedup.'],
    },
    {
      id: 'q-agent-kp4-5',
      type: 'true-false',
      difficulty: 'easy',
      question: 'LLM planners always produce globally optimal plans for complex tasks.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'LLM planners are heuristic. They generate plausible plans but lack optimality guarantees. Symbolic planners (STRIPS, PDDL) can produce optimal plans but require structured world models.',
      hints: ['LLMs generate text probabilistically. They do not run formal optimization algorithms.'],
    },
    {
      id: 'q-agent-kp4-6',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In HuggingGPT / TaskMatrix, what is the role of the central LLM?',
      options: [
        'Fine-tuning each specialist model on the task',
        'Acting as controller: interpreting user intent, selecting appropriate AI models as tools, and synthesizing outputs',
        'Storing all specialist model weights in one context window',
        'Generating training data for specialist models',
      ],
      correctAnswer: 1,
      explanation: 'HuggingGPT uses ChatGPT as planner/controller that parses user requests, selects specialized models from HuggingFace as tools, executes them, and integrates results.',
      hints: ['The central LLM is the "manager" delegating to specialist "workers" (other AI models).'],
    },
    {
      id: 'q-agent-kp4-7',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is "plan grounding" in agent systems?',
      options: [
        'Connecting abstract plans to real-world executable actions and verifying feasibility given current state',
        'Storing the plan in a graph database',
        'Training the LLM on planning datasets',
        'Converting natural language plans to SQL queries',
      ],
      correctAnswer: 0,
      explanation: 'Plan grounding connects abstract plans (e.g., "book a hotel") to concrete executable steps (specific API calls, valid parameters), checking feasibility given current world state.',
      hints: ['Abstract plan: "go to the store." Grounded plan: specific route, transportation, hours checked.'],
    },
    {
      id: 'q-agent-kp4-8',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The key advantage of "online re-planning" over purely upfront planning:',
      options: [
        'It is always faster to generate plans on-the-fly',
        'It adapts to unexpected tool results or environment changes without requiring a complete restart',
        'Online re-planning requires less total computation',
        'It eliminates the need for error handling in individual steps',
      ],
      correctAnswer: 1,
      explanation: 'Upfront plans assume a static world. Online re-planning continuously revises remaining steps based on actual observations, handling failures and surprises gracefully.',
      hints: ['A GPS that recalculates when you miss a turn is re-planning; a printed map is not.'],
    },
    {
      id: 'q-agent-kp4-9',
      type: 'true-false',
      difficulty: 'hard',
      question: 'LLM planning quality improves significantly when the prompt includes worked examples of task decomposition for the target domain.',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Few-shot examples of decomposed plans substantially improve LLM planning quality by teaching expected granularity, format, and reasoning style for the domain.',
      hints: ['Few-shot prompting helps LLMs imitate demonstrated behavior, including plan structure.'],
    },
      ],
    },
  ],

  "memory-agents": [
    {
      id: "q-agent-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which type of agent memory stores information only for the duration of a single conversation session?",
      options: [
        "Long-term memory",
        "Episodic memory",
        "Short-term (in-context) memory",
        "Semantic memory",
      ],
      correctAnswer: 2,
      explanation:
        "Short-term or in-context memory is the running conversation history held in the LLM\'s context window; it is lost when the session ends.",
      hints: [
        'Think about what the LLM can "see" at any given moment — it\'s bounded by the context window.',
        "This type of memory doesn\'t persist to disk or a database.",
      ],
    },
    {
      id: "q-agent-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Episodic memory in agents refers to storing summaries of past agent runs so they can be retrieved in future sessions.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "Episodic memory records specific past experiences (task runs, outcomes, errors) that the agent can retrieve to avoid repeating mistakes or reuse successful strategies in new sessions.",
      hints: [
        "The term comes from cognitive science, where episodic memory is memory of specific events, not general facts.",
        "This contrasts with semantic memory, which stores general knowledge rather than specific past episodes.",
      ],
    },
    {
      id: "q-agent-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "memory consolidation" problem in long-running agents refers to:',
      options: [
        "The agent\'s inability to write to a SQL database during runtime.",
        "Deciding what information to compress, summarize, or evict from the context window to stay within token limits.",
        "Converting floating-point weights to integers for efficiency.",
        "Merging two separate agent threads into one.",
      ],
      correctAnswer: 1,
      explanation:
        "Memory consolidation addresses the fundamental constraint that context windows have finite capacity $T$ tokens. As trajectories grow, the history $\\mathcal{H} = \\{o_1, a_1, o_2, a_2, \\dots, o_t\\}$ may approach $T$, leaving no room for new observations. Consolidation strategies decide what to preserve:\n\n- **Summarization**: compress episodes $\\mathcal{H}_i$ into high-level facts $f_i = \\text{SUMMARIZE}(\\mathcal{H}_i)$ via an LLM, retaining semantic content at lower token cost.\n- **Importance scoring**: assign $\\text{ Importance}(f_i) = \\sigma(w \\cdot \\phi(f_i, \\text{query}))$ and retain top-$k$ facts.\n- **Eviction**: remove oldest or lowest-importance entries when capacity is reached.\n\nThis parallels how human working memory consolidates experiences into long-term memory, preserving salient information.",
      hints: [
        "A context window of 128K tokens sounds large, but a 100-step ReAct loop with verbose tool outputs can exceed it quickly.",
        "The key design question: given budget $T$, which facts are most likely to improve the next decision?",
        "Generative Agents (Park et al., 2023) use importance-weighted reflection to decide which memories to surface.",
      ],
    },
  ],

  "rag-agents": [
    {
      id: "q-agent-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In a RAG system, what is the purpose of the "retrieval" step?',
      options: [
        "To fine-tune the LLM on new documents.",
        "To fetch relevant document chunks from a vector store to include in the prompt.",
        "To cache the LLM\'s previous responses for speed.",
        "To validate the LLM\'s output against a ground truth database.",
      ],
      correctAnswer: 1,
      explanation:
        "Retrieval-Augmented Generation fetches semantically relevant chunks from an external knowledge base and injects them into the prompt, giving the LLM up-to-date context it wasn\'t trained on.",
      hints: [
        "The model\'s knowledge is static after training — RAG provides a way to give it fresh information at inference time.",
        "Vector similarity search is the most common method for finding relevant chunks.",
      ],
    },
    {
      id: "q-agent-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In agentic RAG, the agent can iteratively decide to retrieve more information if the initial retrieval was insufficient.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "Agentic RAG treats retrieval as a tool call the agent can invoke multiple times, refining queries based on what it has already retrieved — a pattern called iterative or multi-hop retrieval.",
      hints: [
        "Contrast naive RAG (one retrieval call) with an agent that can issue follow-up queries.",
        "Think about how a researcher may search for a topic, read, then search for a related sub-topic.",
      ],
    },
    {
      id: "q-agent-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which technique improves retrieval precision by having the LLM rewrite the user\'s query before embedding it?",
      options: [
        "Re-ranking with a cross-encoder",
        "HyDE (Hypothetical Document Embeddings)",
        "Chunk overlap expansion",
        "BM25 keyword fallback",
      ],
      correctAnswer: 1,
      explanation:
        "Standard retrieval embeds the query $q$ directly: $v_q = \\text{Enc}(q)$. The embedding $v_q$ lives in the query representation space, which may not overlap well with document embeddings $v_d = \\text{Enc}(d)$. HyDE (Gao et al., 2022) breaks this **query-document domain gap** by generating a hypothetical answer document:\n\\[ d_\\text{hypo} = \\text{LLM}\\big(\\text{prompt}: \\text{\"Write a passage answering: } q \\text{\"}\\big) \\]\nThen retrieval uses $v_{d_\\text{hypo}} = \\text{Enc}(d_\\text{hypo})$ instead of $v_q$. Since $d_\\text{hypo}$ is in the same distribution as real documents, its embedding is closer to relevant chunks in embedding space — improving recall without changing the encoder.",
      hints: [
        "The query 'Who developed relativity?' embeds far from physics papers in embedding space — but a generated passage about Einstein's work embeds near them.",
        "HyDE adds one LLM call per query but can significantly boost recall on complex or ambiguous queries.",
        "This is especially effective when the query uses different vocabulary than the relevant documents (paraphrase gap).",
      ],
    },
  ],

  "multi-agent-systems": [
    {
      id: "q-agent-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary motivation for using multiple agents instead of a single large agent?",
      options: [
        "Multiple agents always produce cheaper API calls.",
        "Tasks can be parallelized, specialized agents can handle subtasks better, and context windows remain focused.",
        "Multi-agent systems don\'t require any orchestration logic.",
        "A single LLM cannot handle more than one tool at a time.",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-agent systems exploit parallelism, allow specialization (e.g., a coder agent + a reviewer agent), and keep each agent\'s context focused on its sub-task rather than a bloated shared context.",
      hints: [
        "Think about why companies have teams of specialists instead of one generalist doing everything.",
        "Parallelism and specialization are the two key wins.",
      ],
    },
    {
      id: "q-agent-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a multi-agent system, all agents must share a single context window to coordinate effectively.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Agents communicate via message passing, shared memory stores, or explicit handoffs — not by sharing a single context window. Each agent maintains its own context and exchanges structured outputs.",
      hints: [
        "Consider how microservices communicate via APIs, not shared memory.",
        "What would happen to token limits if every agent shared one enormous context?",
      ],
    },
    {
      id: "q-agent-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which coordination pattern describes an agent that decomposes a task and delegates sub-tasks to specialist agents, then aggregates their results?",
      options: [
        "Peer-to-peer gossip protocol",
        "Blackboard architecture",
        "Orchestrator-subagent (hierarchical) pattern",
        "Reactive agent swarm",
      ],
      correctAnswer: 2,
      explanation:
        "The orchestrator-subagent pattern implements hierarchical task decomposition. The orchestrator maintains a task graph $G = (V, E)$ where $v_0$ is the root task and leaves are atomic sub-tasks assigned to specialist agents. Formally:\n\n1. **Decompose**: given root task $v_0$, the orchestrator generates children $V_\\text{sub} = \\{v_1, \\dots, v_k\\}$ via prompted decomposition.\n2. **Dispatch**: each sub-agent $a_i$ receives its task $v_i$ and emits result $r_i$.\n3. **Aggregate**: the orchestrator synthesizes $\{r_i\\}$ into final output $R$ — via a third LLM call that merges agent outputs.\n\nThis pattern appears in LangGraph (state machine with sub-graphs), AutoGen (conversational agents with `register_reply`), and ChatDev. The hierarchy avoids an $N$-agent fully connected mesh, reducing communication from $O(N^2)$ to $O(N)$.",
      hints: [
        "A manager (orchestrator) knows which team member (sub-agent) is best for each sub-task — analogous to a project manager delegating tickets.",
        "The aggregation step is non-trivial: sub-agent outputs may conflict and require a third LLM call to resolve.",
        "Without hierarchy, $N$ agents require $N(N-1)/2$ pairwise communication channels — impractical at scale.",
      ],
    },
  ],

  "agent-frameworks": [
    {
      id: "q-agent-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "LangGraph models agent workflows as:",
      options: [
        "Linear chains of LLM calls only.",
        "Directed graphs (nodes = steps, edges = transitions) with support for cycles.",
        "SQL database query plans.",
        "YAML configuration files parsed at runtime.",
      ],
      correctAnswer: 1,
      explanation:
        "LangGraph represents agent logic as a stateful directed graph where nodes are processing steps and edges encode conditional transitions, naturally supporting loops, branches, and multi-agent handoffs.",
      hints: [
        'The "Graph" in LangGraph is literal — think nodes and edges.',
        "Cycles in the graph enable the agent loop (the model can return to earlier nodes).",
      ],
    },
    {
      id: "q-agent-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AutoGen allows multiple LLM-powered agents to converse with each other to solve tasks collaboratively.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "AutoGen\'s core abstraction is conversational agents that send messages to one another; tasks are solved through this multi-agent dialogue, optionally with human-in-the-loop participants.",
      hints: [
        'The "Auto" in AutoGen refers to automated multi-agent conversations.',
        'Consider a "Coder" agent and a "Critic" agent debating code quality.',
      ],
    },
    {
      id: "q-agent-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is a primary differentiator of CrewAI compared to LangGraph?",
      options: [
        "CrewAI only supports OpenAI models; LangGraph supports all providers.",
        "CrewAI uses a role-based abstraction (Agents with roles/goals/backstory) and structured crew orchestration rather than explicit graph definitions.",
        "CrewAI does not support tool use, while LangGraph does.",
        "CrewAI stores all state in a relational database by default.",
      ],
      correctAnswer: 1,
      explanation:
        "CrewAI abstracts agents as crew members with human-readable roles and goals, and crews are orchestrated via task assignments — a higher-level API than LangGraph\'s explicit graph construction.",
      hints: [
        'Think about the metaphor: a "crew" has roles like Captain, Navigator — agents have roles like Researcher, Writer.',
        "LangGraph requires you to define nodes and edges; CrewAI asks you to define agents and tasks.",
      ],
    },
  ],

  "code-agents": [
    {
      id: "q-agent-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "SWE-Bench is a benchmark for evaluating agents on:",
      options: [
        "Writing marketing copy for software products.",
        "Resolving real GitHub issues in open-source Python repositories.",
        "Generating unit tests from docstrings only.",
        "Benchmarking LLM inference speed on code completion.",
      ],
      correctAnswer: 1,
      explanation:
        "SWE-Bench tasks agents with fixing real bugs from GitHub issues in popular Python repos (e.g., scikit-learn, Django), measured by whether the patch passes the associated test suite.",
      hints: [
        "SWE stands for Software Engineering — the benchmark is about real engineering tasks, not toy problems.",
        "Success is measured by test suite pass rates, not human evaluation.",
      ],
    },
    {
      id: "q-agent-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Code agents typically execute code in a sandboxed environment to prevent accidental damage to the host system.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "Sandboxing (via Docker containers, E2B, or similar) isolates code execution so agent-generated code cannot access sensitive host resources or cause irreversible side effects.",
      hints: [
        "Would you run unknown code directly on your laptop without any isolation?",
        "Think about how Jupyter notebooks or online code runners use isolated environments.",
      ],
    },
    {
      id: "q-agent-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which agent architecture has shown the strongest performance on SWE-Bench Verified as of 2024?",
      options: [
        "Single-pass code generation with no tool use.",
        "Agents with file editing tools, test execution, and iterative error correction loops.",
        "Purely retrieval-based agents that find similar past patches.",
        "Agents that only generate diffs without running any code.",
      ],
      correctAnswer: 1,
      explanation:
        "Top SWE-Bench systems (SWE-agent, Devin) use an iterative agent loop:\n1. **Plan**: analyze the GitHub issue and select a file to edit.\n2. **Edit**: apply a code change using file editing tools (read, write, diff).\n3. **Test**: run the test suite — if any test fails, the error output $e$ becomes the observation $o_t$.\n4. **Reflect**: the LLM analyzes $e$ and decides whether to revise the same file or try a different approach.\n\nThis Trial-Edit-Feedback loop continues until all tests pass or a step budget is exhausted. The key insight is that test execution provides **ground-truth** feedback — unlike natural language critique, test results are binary correct/incorrect signals with zero ambiguity. Single-pass generation cannot recover from errors; iterative correction can.",
      hints: [
        "A failed test $\\text{FAIL}(p, t)$ gives precise error location and type — far more actionable than 'this code looks wrong'.",
        "The iteration count is typically bounded (e.g., 15 steps) to prevent infinite loops on unsolvable instances.",
        "The SWE-agent paper found that file navigation (knowing which file to edit) is the hardest sub-problem, not the editing itself.",
      ],
    },
  ],

  "computer-use-agents": [
    {
      id: "q-agent-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Computer use agents perceive the state of a GUI primarily through:",
      options: [
        "Reading the application\'s source code at runtime.",
        "Screenshots or accessibility tree representations of the screen.",
        "Network packet sniffing of application traffic.",
        "Accessing the application\'s internal database directly.",
      ],
      correctAnswer: 1,
      explanation:
        "Computer use agents observe the UI via screenshots (pixel-level) or structured accessibility trees (element-level), which are then fed to a vision-capable LLM to decide on the next action.",
      hints: [
        'The agent needs to "see" the screen — how does a multimodal model receive visual input?',
        "Accessibility APIs (like those for screen readers) provide structured element descriptions.",
      ],
    },
    {
      id: "q-agent-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Anthropic\'s Claude computer use can directly execute arbitrary shell commands on the host machine without any human confirmation.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Anthropic\'s computer use tools are sandboxed and designed with safety guardrails; shell access, if exposed, requires explicit tool definitions by the developer, and Anthropic recommends human confirmation for irreversible actions.",
      hints: [
        'Consider what "safe by default" means for a system that can click buttons and type text.',
        "Tool access is always explicitly granted by the developer hosting the agent.",
      ],
    },
    {
      id: "q-agent-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main challenge of using pixel-based screenshots (vs. accessibility trees) for computer use agents?",
      options: [
        "Screenshots are larger files and cost more to transmit.",
        "Pixel-based observation requires visual grounding: precisely mapping UI elements to pixel coordinates for click/type actions.",
        "Accessibility trees cannot represent dynamic web content.",
        "Screenshot-based agents always require GPU acceleration on the host machine.",
      ],
      correctAnswer: 1,
      explanation:
        "Pixel grounding — accurately identifying the (x, y) coordinates of a button or input field from a screenshot — is a hard vision problem; small errors cause mis-clicks that break the task trajectory.",
      hints: [
        "Clicking requires knowing where exactly to click in pixel space, not just what to click.",
        "Accessibility trees give element positions for free; screenshots require the model to infer them.",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
