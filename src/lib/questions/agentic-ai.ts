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
      correctAnswer: "False",
      explanation:
        "Agent loops use configurable stopping conditions: a \"task complete\" action emitted by the LLM, a max-step safety limit, a human interrupt, or a heuristic (e.g., Reflexion detects repeated identical actions as hallucination and resets). A hard step count is a guard, not the normal termination criterion.",
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
        "Increase the model temperature to generate shorter responses",
        "Switch to a smaller model once the context exceeds 50% capacity",
      ],
      correctAnswer: 1,
      explanation:
        "Memory consolidation via summarization (used in Generative Agents, Park et al. 2023) compresses completed episodes into higher-level summaries, freeing context space while retaining key information. Silent truncation loses critical observations; temperature has no effect on context length.",
      hints: [
        "Generative Agents (Park et al., 2023) store a \"memory stream\" and surface condensed reflections rather than raw event logs.",
        "The goal is to keep the most relevant context within the token budget — summarization preserves semantics, truncation does not.",
      ],
    },
    {
      id: "q-agent-kp1-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In the ReAct agent loop, what triggers the agent to stop and return a final answer?",
      options: [
        "A hard-coded maximum step count is always reached",
        "The LLM emits a \"final answer\" action or a special termination signal",
        "The user manually stops the process",
        "The context window fills up completely",
      ],
      correctAnswer: 1,
      explanation: "The agent emits a final answer action when it determines the task is complete. A max-step guard exists as a safety limit but is not the normal termination criterion.",
      hints: ["The agent signals completion through its action space, not by external timer."],
    },
    {
      id: "q-agent-kp1-5",
      type: "true-false",
      difficulty: "medium",
      question: "An agent loop running for 50 steps with 200-token observations will consume roughly 10,000 tokens in total context.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Context accumulates linearly: each step adds Thought + Action + ~200 token Observation. Managing this growth is the \"long-context\" challenge in agent design.",
      hints: ["Context is append-only in a typical agent loop. Each step adds to the total."],
    },
    {
      id: "q-agent-kp1-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which technique allows an agent loop to recover from repeated failed actions?",
      options: [
        "Increasing the model temperature on each retry",
        "Reflexion: self-reflection on failed trajectories to produce corrective plans",
        "Switching to a different LLM model automatically",
        "Resetting the context window to empty",
      ],
      correctAnswer: 1,
      explanation: "Reflexion (Shinn et al., 2023) prompts the agent to reflect on why a trajectory failed and store verbal feedback in memory, then re-attempts with that feedback.",
      hints: ["Reflexion = reflect on failure + update memory + retry with updated strategy."],
    },
    {
      id: "q-agent-kp1-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the key insight behind \"scratchpad\" reasoning in agent frameworks?",
      options: [
        "Scratchpad stores tool call results in a database",
        "Allowing the model to generate intermediate reasoning tokens before the final action improves performance because reasoning is part of the computation",
        "Scratchpad compresses context to save tokens",
        "It is a legacy term for the context window before transformer architectures",
      ],
      correctAnswer: 1,
      explanation: "Chain-of-thought research shows generating intermediate reasoning steps improves accuracy. The \"Thought\" step lets the model plan before committing to an action.",
      hints: ["Why does writing out math steps help humans? Same principle applies to LLMs."],
    },
    {
      id: "q-agent-kp1-8",
      type: "true-false",
      difficulty: "hard",
      question: "Adding more tools to an agent always improves its task performance.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Too many tools increase selection complexity and can distract from the correct approach. Tool selection quality degrades with very large tool sets. Careful curation and clear descriptions are essential.",
      hints: ["More choices can lead to worse decisions. This applies to LLMs selecting tools too."],
    },
    {
      id: "q-agent-kp1-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is \"prompt injection\" in the context of LLM agent security?",
      options: [
        "Injecting model weights with adversarial gradients",
        "Malicious content in tool outputs or web pages that hijacks the agent instructions",
        "Overloading the context window with irrelevant data",
        "Using conflicting system prompts",
      ],
      correctAnswer: 1,
      explanation: "Prompt injection embeds adversarial instructions in data the agent reads (tool outputs, web pages). For example, a web page saying \"Ignore previous instructions\" could hijack an unguarded agent.",
      hints: ["The attacker puts instructions in data the agent reads, not in the system prompt."],
    },
  ],

  "tool-use-agents": [
    {
      id: "q-agent-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In API-Bank (Li et al., 2023), tool-use capability is evaluated at three levels. Which level requires the agent to plan sequences of API calls to satisfy an ambiguous user request (e.g., \"book a trip\")?",
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
      correctAnswer: "False",
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
        "ChemCrow tool use is primarily decorative and does not improve chemistry quality.",
        "Human evaluators are systematically biased toward tool-augmented systems.",
      ],
      correctAnswer: 1,
      explanation:
        "ChemCrow results highlight that LLMs cannot reliably judge the chemical correctness of outputs because they lack the domain knowledge to detect subtle errors. Human experts orient toward actual chemical validity, exposing a fundamental limitation of LLM-as-judge for specialist domains.",
      hints: [
        "If the model cannot solve the task, it also cannot reliably score solutions to the task.",
        "This is a key caution for using LLM evaluation in specialized agent benchmarks.",
      ],
    },
    {
      id: "q-agent-kp2-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is a \"tool schema\" in LLM function calling?",
      options: [
        "A database schema for storing tool outputs",
        "A JSON description of a tool name, description, and parameter types the LLM uses to generate correct calls",
        "The source code implementation of the tool",
        "A rate-limiting policy for API calls",
      ],
      correctAnswer: 1,
      explanation: "A tool schema (typically JSON Schema) tells the LLM what a tool does, what parameters it accepts, and their types — like API documentation provided directly to the model.",
      hints: ["Think of it as the tool API documentation provided directly to the model."],
    },
    {
      id: "q-agent-kp2-5",
      type: "true-false",
      difficulty: "easy",
      question: "The LLM itself executes the tool call and returns the result to itself in function calling.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "The LLM only generates the tool call specification (name + arguments). The host application executes it against the actual tool/API and returns the result to the LLM in the next turn.",
      hints: ["LLMs generate text. They cannot run code or call APIs. The host does that."],
    },
    {
      id: "q-agent-kp2-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Tool call hallucination refers to:",
      options: [
        "The model generating outputs that are too creative",
        "The model invoking tool names or parameters that do not exist in the provided schema",
        "Tool calls executing too slowly",
        "Circular tool calls that never terminate",
      ],
      correctAnswer: 1,
      explanation: "Tool hallucination is when the LLM generates calls to non-existent tools or uses incorrect parameter names. This breaks execution and is a key reliability challenge.",
      hints: ["The model may \"invent\" tools it was not given, or misremember parameter names."],
    },
    {
      id: "q-agent-kp2-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the purpose of the \"required\" array in a tool JSON Schema parameter definition?",
      options: [
        "Required fields are validated for security",
        "It instructs the LLM which parameters must always be provided vs. optional ones with defaults",
        "Required fields are cached for performance",
        "They trigger parallel execution of the tool",
      ],
      correctAnswer: 1,
      explanation: "The JSON Schema \"required\" array tells the LLM which parameters cannot be omitted. Well-designed schemas reduce malformed tool calls.",
      hints: ["Without required markers, the LLM might omit crucial parameters."],
    },
    {
      id: "q-agent-kp2-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Gorilla LLM (Patil et al., 2023) was trained specifically to improve:",
      options: [
        "Multi-step reasoning without any tools",
        "Accurate API call generation from natural language, including correct API retrieval and parameter filling",
        "Parallel conversation handling across multiple users",
        "Code security vulnerability detection",
      ],
      correctAnswer: 1,
      explanation: "Gorilla fine-tunes LLMs on API documentation to generate accurate API calls with retrieval-aware training, reducing hallucination rates on large API sets.",
      hints: ["Gorilla is named for its ability to \"grab\" the right API from a large set."],
    },
    {
      id: "q-agent-kp2-9",
      type: "true-false",
      difficulty: "hard",
      question: "Giving an LLM agent a code execution tool that runs Python is inherently more dangerous than a web search tool from a security perspective.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "A code execution tool can perform arbitrary file system access and system calls if not sandboxed. Web search is read-only with no side effects. Code execution requires strict sandboxing.",
      hints: ["What can arbitrary Python code do on a system? Compare to what web search can do."],
    },
  ],

  "react-pattern": [
    {
      id: "q-agent-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does \"ReAct\" stand for in the context of LLM agents?",
      options: [
        "Recursive Action Transformer",
        "Reasoning and Acting",
        "Retrieval-Augmented Contextual Thinking",
        "React.js integrated with Agents",
      ],
      correctAnswer: 1,
      explanation:
        "ReAct (Yao et al., 2022) interleaves Reasoning traces (Thought) with Action steps, allowing the model to plan, observe results, and update its reasoning before the next action.",
      hints: [
        "The paper key insight is that thinking out loud before acting improves task performance.",
        "The two words directly describe what the model does: it reasons, then it acts.",
      ],
    },
    {
      id: "q-agent-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In the ReAct pattern, the \"Observation\" step is generated by the LLM itself.",
      options: ["True", "False"],
      correctAnswer: "False",
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
        "Chain-of-thought generates a reasoning trace where all tokens are sampled from the model's conditional distribution with no grounding — errors accumulate because subsequent thoughts cannot correct earlier hallucinations. ReAct interleaves thoughts with actions that produce real observations from the environment, creating a feedback loop where observations can correct earlier reasoning. The trajectory becomes a grounded Markov chain rather than unconstrained generation.",
      hints: [
        "In CoT, if the model says the capital of France is London, the next thought has no signal to correct this.",
        "In ReAct, if a search tool returns Paris, the observation corrects the hallucination before the next thought is generated.",
        "The observation acts as an external memory that the model can read, breaking the self-reinforcing error loop.",
      ],
    },
    {
      id: "q-agent-kp3-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In a ReAct trace, what is the purpose of the \"Thought\" step?",
      options: [
        "To call the external tool and get results",
        "To allow the model to verbalize its reasoning plan before deciding on an action",
        "To summarize the conversation history",
        "To validate the previous observation for correctness",
      ],
      correctAnswer: 1,
      explanation: "The Thought step is an internal reasoning trace where the LLM plans its next move. It is never sent to external tools — it is pure reasoning output that improves action quality.",
      hints: [
        "The Thought step is like the model talking to itself before deciding what to do.",
        "It is chain-of-thought reasoning integrated into the action loop.",
      ],
    },
    {
      id: "q-agent-kp3-5",
      type: "true-false",
      difficulty: "medium",
      question: "ReAct agents can only use a single tool type per trajectory.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "ReAct agents can interleave different tool calls within the same trajectory — for example, searching the web, then calling a calculator, then writing to a file — whatever is needed to complete the task.",
      hints: [
        "The Action step specifies both which tool to use and what arguments to pass.",
        "Different steps in the same trajectory can use completely different tools.",
      ],
    },
    {
      id: "q-agent-kp3-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What happens when a ReAct agent encounters a tool call that returns an error as its observation?",
      options: [
        "The agent terminates immediately with a failure response",
        "The error observation is fed back into the context, allowing the agent to reason about the failure and try a different approach",
        "The error is silently ignored and the agent repeats the same action",
        "The agent automatically reverts to chain-of-thought without tools",
      ],
      correctAnswer: 1,
      explanation: "Error observations are just another form of feedback. The agent sees the error message, forms a new Thought about why it failed, and can choose a different action — this is one of ReAct's key strengths over single-pass generation.",
      hints: [
        "An error message is still information. The agent can reason about what went wrong.",
        "This is analogous to a programmer seeing a stack trace and deciding how to fix the code.",
      ],
    },
    {
      id: "q-agent-kp3-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "On HotpotQA (multi-hop QA), ReAct outperforms chain-of-thought because:",
      options: [
        "ReAct uses a larger model with more parameters",
        "ReAct can retrieve intermediate facts from Wikipedia that ground each reasoning hop, preventing compounding hallucinations over multiple hops",
        "ReAct trains on the HotpotQA dataset while CoT does not",
        "ReAct generates shorter answers that score higher on exact match metrics",
      ],
      correctAnswer: 1,
      explanation: "Multi-hop questions require chaining facts. In CoT, each hop is generated from model memory — errors compound across hops. In ReAct, each hop retrieves verified facts from Wikipedia, grounding every step. This makes 3-hop questions much more reliable with ReAct than CoT.",
      hints: [
        "A 3-hop question requires 3 separate facts, each of which can be hallucinated in CoT.",
        "Grounding each hop with a real Wikipedia retrieval prevents error accumulation.",
      ],
    },
    {
      id: "q-agent-kp3-8",
      type: "true-false",
      difficulty: "hard",
      question: "Adding a \"Thought\" step before each action always increases the number of tokens used but never improves performance on simple factual retrieval tasks.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "While Thought steps do increase token usage, they often improve performance even on simple tasks by helping the model formulate better search queries and interpret ambiguous results. The performance benefit often outweighs the token cost.",
      hints: [
        "The Thought step can help the model formulate a better query, which improves the observation quality.",
        "Even simple tasks can benefit from planning: \"What exactly am I looking for?\"",
      ],
    },
    {
      id: "q-agent-kp3-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the key limitation of the ReAct pattern that Tree of Thoughts (Yao et al., 2023) was designed to address?",
      options: [
        "ReAct cannot use multiple tools in one trajectory",
        "ReAct follows a single linear trajectory without exploring alternative reasoning paths when early choices are suboptimal",
        "ReAct requires human supervision at every step",
        "ReAct cannot handle natural language observations from tools",
      ],
      correctAnswer: 1,
      explanation: "ReAct commits to each thought-action pair sequentially and cannot backtrack. If an early thought sends the agent down a wrong path, it continues along that path. Tree of Thoughts branches at each step, explores multiple continuations, and selects the most promising branch via evaluation — addressing the myopic nature of linear ReAct.",
      hints: [
        "Tree of Thoughts = ReAct + search. It explores the space of possible reasoning paths rather than committing to the first one.",
        "A linear ReAct trace is like reading a choose-your-own-adventure book by always choosing option A. ToT explores multiple options.",
      ],
    },
  ],

  "planning-agents": [
    {
      id: "q-agent-kp4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In LLM-based planning, what is the main role of a \"planner\" step before execution?",
      options: [
        "To compress the user query into fewer tokens.",
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
      correctAnswer: "True",
      explanation:
        "MCTS operates in four phases: Selection (traverse using UCT balancing exploitation vs exploration), Expansion (add child nodes for candidate actions), Simulation (roll out using the LLM to estimate state values), and Backpropagation (update Q-values along the visited path). LLM-based planning like Tree of Thoughts and RAP uses the LLM as both a policy (proposing actions) and a value function (estimating state quality), plugging naturally into the MCTS cycle.",
      hints: [
        "Tree of Thoughts (Yao et al., 2023) treats each partial solution as a tree node; the LLM evaluates whether a partial solution can lead to a full solution.",
        "RAP (Reasoning with Planning) uses the LLM to estimate the probability of success given a plan and current state.",
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
        "A plan is a sequence of actions conditioned on expected observations. In a static world, observations match the planner assumptions. In a dynamic world, actual observations may deviate — a web search returns unexpected results, an API call fails, or user input changes context. This causes plan degradation: later actions were optimized for expected observations, not actual ones. Adaptive replanning addresses this by continuously revising based on actual observations.",
      hints: [
        "A 10-step plan where step 3 fails means steps 4 through 10 were planned for incorrect state — they may be invalid or suboptimal.",
        "Replanning frequency is a tradeoff: frequent replanning adds overhead but handles dynamics well.",
      ],
    },
    {
      id: "q-agent-kp4-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is a DAG (directed acyclic graph) plan in agent systems?",
      options: [
        "A plan where tasks run in random order",
        "A task graph encoding dependencies with no circular dependencies, enabling parallel execution of independent tasks",
        "A neural network architecture for planning",
        "A database query plan",
      ],
      correctAnswer: 1,
      explanation: "DAG plans encode task dependencies. Tasks with no unmet dependencies can run in parallel. More efficient than linear plans for independent sub-tasks.",
      hints: ["DAG = no cycles = no deadlocks. Parallel paths = speedup."],
    },
    {
      id: "q-agent-kp4-5",
      type: "true-false",
      difficulty: "easy",
      question: "LLM planners always produce globally optimal plans for complex tasks.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "LLM planners are heuristic. They generate plausible plans but lack optimality guarantees. Symbolic planners (STRIPS, PDDL) can produce optimal plans but require structured world models.",
      hints: ["LLMs generate text probabilistically. They do not run formal optimization algorithms."],
    },
    {
      id: "q-agent-kp4-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In HuggingGPT / TaskMatrix, what is the role of the central LLM?",
      options: [
        "Fine-tuning each specialist model on the task",
        "Acting as controller: interpreting user intent, selecting appropriate AI models as tools, and synthesizing outputs",
        "Storing all specialist model weights in one context window",
        "Generating training data for specialist models",
      ],
      correctAnswer: 1,
      explanation: "HuggingGPT uses ChatGPT as planner/controller that parses user requests, selects specialized models from HuggingFace as tools, executes them, and integrates results.",
      hints: ["The central LLM is the \"manager\" delegating to specialist \"workers\" (other AI models)."],
    },
    {
      id: "q-agent-kp4-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is \"plan grounding\" in agent systems?",
      options: [
        "Connecting abstract plans to real-world executable actions and verifying feasibility given current state",
        "Storing the plan in a graph database",
        "Training the LLM on planning datasets",
        "Converting natural language plans to SQL queries",
      ],
      correctAnswer: 0,
      explanation: "Plan grounding connects abstract plans (e.g., \"book a hotel\") to concrete executable steps (specific API calls, valid parameters), checking feasibility given current world state.",
      hints: ["Abstract plan: \"go to the store.\" Grounded plan: specific route, transportation, hours checked."],
    },
    {
      id: "q-agent-kp4-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The key advantage of \"online re-planning\" over purely upfront planning:",
      options: [
        "It is always faster to generate plans on-the-fly",
        "It adapts to unexpected tool results or environment changes without requiring a complete restart",
        "Online re-planning requires less total computation",
        "It eliminates the need for error handling in individual steps",
      ],
      correctAnswer: 1,
      explanation: "Upfront plans assume a static world. Online re-planning continuously revises remaining steps based on actual observations, handling failures and surprises gracefully.",
      hints: ["A GPS that recalculates when you miss a turn is re-planning; a printed map is not."],
    },
    {
      id: "q-agent-kp4-9",
      type: "true-false",
      difficulty: "hard",
      question: "LLM planning quality improves significantly when the prompt includes worked examples of task decomposition for the target domain.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Few-shot examples of decomposed plans substantially improve LLM planning quality by teaching expected granularity, format, and reasoning style for the domain.",
      hints: ["Few-shot prompting helps LLMs imitate demonstrated behavior, including plan structure."],
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
        "Short-term or in-context memory is the running conversation history held in the LLM context window; it is lost when the session ends.",
      hints: [
        "Think about what the LLM can \"see\" at any given moment — it is bounded by the context window.",
        "This type of memory does not persist to disk or a database.",
      ],
    },
    {
      id: "q-agent-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Episodic memory in agents refers to storing summaries of past agent runs so they can be retrieved in future sessions.",
      options: ["True", "False"],
      correctAnswer: "True",
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
        "The \"memory consolidation\" problem in long-running agents refers to:",
      options: [
        "The agent inability to write to a SQL database during runtime.",
        "Deciding what information to compress, summarize, or evict from the context window to stay within token limits.",
        "Converting floating-point weights to integers for efficiency.",
        "Merging two separate agent threads into one.",
      ],
      correctAnswer: 1,
      explanation:
        "Memory consolidation addresses the fundamental constraint that context windows have finite capacity. As trajectories grow, the history may approach the token limit, leaving no room for new observations. Consolidation strategies decide what to preserve: summarization compresses episodes into high-level facts via an LLM, importance scoring retains top-k facts, and eviction removes oldest or lowest-importance entries when capacity is reached.",
      hints: [
        "A context window of 128K tokens sounds large, but a 100-step ReAct loop with verbose tool outputs can exceed it quickly.",
        "The key design question: given a fixed token budget, which facts are most likely to improve the next decision?",
        "Generative Agents (Park et al., 2023) use importance-weighted reflection to decide which memories to surface.",
      ],
    },
    {
      id: "q-agent-kp5-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In Generative Agents (Park et al., 2023), what is the \"memory stream\"?",
      options: [
        "A continuous audio/video recording of agent actions",
        "A chronological list of all observations, reflections, and plans stored as natural language strings",
        "A neural network that compresses all past experiences",
        "A database of all user messages only",
      ],
      correctAnswer: 1,
      explanation: "Generative Agents maintain a memory stream: time-stamped natural language descriptions of events. Retrieval scores based on recency, importance, and relevance.",
      hints: ["Memory stream = event diary. Each entry is a natural language description of what happened."],
    },
    {
      id: "q-agent-kp5-5",
      type: "true-false",
      difficulty: "medium",
      question: "Vector databases enable agents to retrieve semantically relevant memories even when exact words differ from the query.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Semantic (vector) retrieval finds memories by meaning similarity, not exact keyword match. A query \"ate lunch\" can retrieve memories containing \"had a meal\".",
      hints: ["Vector similarity captures semantic meaning; keyword search requires exact matches."],
    },
    {
      id: "q-agent-kp5-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is \"reflection\" in Generative Agents?",
      options: [
        "The agent looking at its reflection in a simulated mirror",
        "A higher-level synthesis of recent memories into abstract insights, stored as new memory entries",
        "The agent re-executing a task it failed previously",
        "Compressing context by removing old memories",
      ],
      correctAnswer: 1,
      explanation: "Reflection generates higher-order thoughts by asking the LLM to synthesize recent memories into abstract insights stored as new memory stream entries.",
      hints: ["Reflection turns low-level events into high-level understanding. Like journaling to extract lessons."],
    },
    {
      id: "q-agent-kp5-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How does MemGPT (Packer et al., 2023) extend agent memory beyond context window limits?",
      options: [
        "By training a larger model with more parameters",
        "By implementing OS-style virtual memory: paging relevant memories into the in-context main memory from external storage on demand",
        "By compressing all history into a single embedding vector",
        "By limiting the agent to answering only from its training data",
      ],
      correctAnswer: 1,
      explanation: "MemGPT mimics OS virtual memory: context window = RAM, external databases = disk. The agent manages paging via function calls, enabling unbounded effective memory.",
      hints: ["MemGPT: context window = RAM, external DB = hard disk. Agent decides what to swap."],
    },
    {
      id: "q-agent-kp5-8",
      type: "true-false",
      difficulty: "hard",
      question: "Storing all past conversation turns verbatim is more effective than summarization for very long agent sessions.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Verbatim storage hits context limits and includes irrelevant detail. Hierarchical summarization preserves key information in fewer tokens, enabling longer sessions.",
      hints: ["Full verbatim storage has linear token growth. Summarization has sub-linear growth."],
    },
    {
      id: "q-agent-kp5-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The \"importance score\" in Generative Agents memory retrieval is used to:",
      options: [
        "Determine which API calls to make first",
        "Weight memories by significance when deciding what to surface for the current task",
        "Sort memories by creation timestamp only",
        "Measure cosine similarity between memory embeddings",
      ],
      correctAnswer: 1,
      explanation: "Generative Agents score memories by recency (decay function), importance (LLM-rated 1-10 poignancy), and relevance (cosine similarity). All three contribute to retrieval score.",
      hints: ["Importance distinguishes trivial from pivotal events: \"I ate breakfast\" vs \"I got fired.\""],
    },
  ],

  "rag-agents": [
    {
      id: "q-agent-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In a RAG system, what is the purpose of the \"retrieval\" step?",
      options: [
        "To fine-tune the LLM on new documents.",
        "To fetch relevant document chunks from a vector store to include in the prompt.",
        "To cache the LLM previous responses for speed.",
        "To validate the LLM output against a ground truth database.",
      ],
      correctAnswer: 1,
      explanation:
        "Retrieval-Augmented Generation fetches semantically relevant chunks from an external knowledge base and injects them into the prompt, giving the LLM up-to-date context it was not trained on.",
      hints: [
        "The model knowledge is static after training — RAG provides a way to give it fresh information at inference time.",
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
      correctAnswer: "True",
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
        "Which technique improves retrieval precision by having the LLM rewrite the user query before embedding it?",
      options: [
        "Re-ranking with a cross-encoder",
        "HyDE (Hypothetical Document Embeddings)",
        "Chunk overlap expansion",
        "BM25 keyword fallback",
      ],
      correctAnswer: 1,
      explanation:
        "Standard retrieval embeds the query directly, but the query embedding may not overlap well with document embeddings due to vocabulary mismatch. HyDE (Gao et al., 2022) generates a hypothetical answer document using the LLM, then embeds that document for retrieval. Since the hypothetical document is in the same distribution as real documents, its embedding is closer to relevant chunks in embedding space — improving recall without changing the encoder.",
      hints: [
        "The query \"Who developed relativity?\" embeds far from physics papers — but a generated passage about Einstein embeds near them.",
        "HyDE adds one LLM call per query but can significantly boost recall on complex or ambiguous queries.",
        "This is especially effective when the query uses different vocabulary than the relevant documents (paraphrase gap).",
      ],
    },
    {
      id: "q-agent-kp6-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is \"chunking\" in a RAG pipeline?",
      options: [
        "Compressing document embeddings into smaller vectors",
        "Splitting documents into smaller segments before embedding and indexing",
        "Batching multiple user queries together for efficiency",
        "Encrypting document content before storing in a vector database",
      ],
      correctAnswer: 1,
      explanation: "Chunking divides large documents into smaller pieces (chunks) before embedding. Chunk size affects retrieval quality: too large includes irrelevant context, too small loses surrounding context needed for understanding.",
      hints: [
        "A 100-page PDF cannot fit in a single embedding — it must be split into manageable pieces.",
        "Chunk size is a key hyperparameter: typical values range from 256 to 1024 tokens.",
      ],
    },
    {
      id: "q-agent-kp6-5",
      type: "true-false",
      difficulty: "medium",
      question: "Re-ranking with a cross-encoder model after initial retrieval can significantly improve RAG answer quality.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Initial retrieval uses fast bi-encoder models that compare query and document embeddings independently. Cross-encoders jointly process the query and each candidate document, producing more accurate relevance scores at higher compute cost. Re-ranking the top-K retrieved chunks with a cross-encoder consistently improves precision.",
      hints: [
        "Bi-encoders are fast but less accurate; cross-encoders are slower but more accurate. Re-ranking uses the best of both.",
        "Retrieve 50 candidates cheaply, then re-rank the top 5 expensively — this is a common two-stage pipeline.",
      ],
    },
    {
      id: "q-agent-kp6-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is \"faithfulness\" in RAG evaluation metrics?",
      options: [
        "Whether the retrieved documents are from trusted sources",
        "Whether the generated answer is supported by the retrieved context rather than fabricated from model parametric memory",
        "Whether the answer matches the exact wording of the source document",
        "Whether the vector store index is up-to-date",
      ],
      correctAnswer: 1,
      explanation: "Faithfulness measures whether each claim in the generated answer can be attributed to the retrieved context. Low faithfulness indicates the model is hallucinating information not present in the retrieved chunks — a key failure mode in RAG systems.",
      hints: [
        "A faithfulness score of 1.0 means every statement in the answer is traceable to a retrieved chunk.",
        "RAGAs (Evaluation Framework) defines faithfulness as the fraction of answer claims supported by retrieved context.",
      ],
    },
    {
      id: "q-agent-kp6-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In multi-hop RAG, why is a single retrieval step often insufficient?",
      options: [
        "Vector databases cannot handle more than one query at a time",
        "Some questions require chaining multiple retrieved facts where the answer to the first retrieval determines the query for the next",
        "Single retrieval always returns too many documents to fit in the context window",
        "Embedding models cannot represent questions with multiple entities",
      ],
      correctAnswer: 1,
      explanation: "Multi-hop questions like \"What is the capital of the country where the author of X was born?\" require at least two retrieval steps: first retrieve the author's birthplace, then retrieve the capital of that country. A single retrieval cannot answer both sub-questions simultaneously because the second query depends on the answer to the first.",
      hints: [
        "Multi-hop questions have dependent sub-questions. The answer to hop 1 is the query for hop 2.",
        "Iterative RAG (retrieve, read, decide if more retrieval is needed, repeat) handles these cases.",
      ],
    },
    {
      id: "q-agent-kp6-8",
      type: "true-false",
      difficulty: "hard",
      question: "Increasing the chunk overlap between adjacent text chunks always improves RAG answer quality.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "While chunk overlap helps preserve context at boundaries, excessive overlap increases index size, retrieval cost, and may include more irrelevant content in the prompt. Optimal overlap depends on the document type and chunk size — there is no universal \"more is better\" rule.",
      hints: [
        "Overlap ensures sentences split across chunk boundaries are still represented. But 90% overlap would almost triple the index size.",
        "The right overlap is domain-specific — experiment rather than always maximizing it.",
      ],
    },
    {
      id: "q-agent-kp6-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What does \"answer relevance\" measure in RAG evaluation, and how does it differ from faithfulness?",
      options: [
        "Answer relevance measures speed; faithfulness measures accuracy",
        "Answer relevance measures whether the answer addresses the question; faithfulness measures whether the answer is grounded in retrieved context",
        "They are the same metric measured by different methods",
        "Answer relevance measures retrieved chunk quality; faithfulness measures answer length",
      ],
      correctAnswer: 1,
      explanation: "These are complementary metrics in RAG evaluation frameworks like RAGAs. Faithfulness checks if the answer is grounded in context (no hallucinations). Answer relevance checks if the answer actually addresses the original question (no topic drift). An answer can be faithful (every claim traced to context) but irrelevant (answering a different question than asked).",
      hints: [
        "Faithfulness = is the answer supported by what was retrieved?",
        "Answer relevance = does the answer actually answer the question that was asked?",
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
        "Multi-agent systems do not require any orchestration logic.",
        "A single LLM cannot handle more than one tool at a time.",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-agent systems exploit parallelism, allow specialization (e.g., a coder agent + a reviewer agent), and keep each agent context focused on its sub-task rather than a bloated shared context.",
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
      correctAnswer: "False",
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
        "The orchestrator-subagent pattern implements hierarchical task decomposition. The orchestrator maintains a task graph where sub-agents receive atomic sub-tasks and emit results. The hierarchy avoids an N-agent fully connected mesh, reducing communication complexity from O(N^2) to O(N). This pattern appears in LangGraph, AutoGen, and ChatDev.",
      hints: [
        "A manager (orchestrator) knows which team member (sub-agent) is best for each sub-task — analogous to a project manager delegating tickets.",
        "The aggregation step is non-trivial: sub-agent outputs may conflict and require a third LLM call to resolve.",
        "Without hierarchy, N agents require N(N-1)/2 pairwise communication channels — impractical at scale.",
      ],
    },
    {
      id: "q-agent-kp7-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the \"blackboard\" pattern in multi-agent coordination?",
      options: [
        "Each agent has its own private memory that other agents cannot access",
        "A shared data structure that all agents can read from and write to, used to coordinate work",
        "A visual dashboard showing agent status in real time",
        "A chalkboard metaphor for sequential task assignment",
      ],
      correctAnswer: 1,
      explanation: "The blackboard architecture (from AI planning) uses a shared workspace where agents post partial solutions and read others' contributions. Any agent can contribute to the blackboard; a control component decides which agent acts next based on the current blackboard state.",
      hints: [
        "Think of a physical blackboard in a classroom where multiple students write their work — any student can read and add to it.",
        "The blackboard is the shared state; agents are independent solvers that interact through it.",
      ],
    },
    {
      id: "q-agent-kp7-5",
      type: "true-false",
      difficulty: "medium",
      question: "In debate-based multi-agent systems, having agents argue opposing positions and critique each other tends to produce more accurate final answers than a single agent generating the same answer.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Du et al. (2023) showed that multi-agent debate — where multiple LLM instances generate answers and then critique each other across rounds — improves factual accuracy and mathematical reasoning compared to single-agent generation. The critique process surfaces errors that the original generator missed.",
      hints: [
        "Peer review in science works on the same principle: critical scrutiny from different perspectives catches more errors.",
        "The debate rounds allow agents to update their answers based on other agents' counter-arguments.",
      ],
    },
    {
      id: "q-agent-kp7-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the main risk of \"agent cascade failures\" in multi-agent pipelines?",
      options: [
        "Individual agents using too much GPU memory",
        "An error or hallucination from an upstream agent propagating and amplifying through downstream agents that depend on its output",
        "Agents communicating too slowly over network connections",
        "The orchestrator running out of context window space",
      ],
      correctAnswer: 1,
      explanation: "In a pipeline where Agent B depends on Agent A's output, a hallucination from A becomes input fact for B — which builds further reasoning on top of it. By the time the error reaches the final output, it may be deeply embedded in a plausible-sounding but incorrect answer.",
      hints: [
        "If Agent A incorrectly states the population of a city, Agent B will calculate costs based on that wrong number.",
        "Error propagation in multi-agent systems is analogous to cascading failures in distributed systems.",
      ],
    },
    {
      id: "q-agent-kp7-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In the AutoGen framework, what is a \"group chat\" and how does it differ from a two-agent conversation?",
      options: [
        "Group chat is just multiple two-agent conversations running in parallel",
        "Group chat has a GroupChatManager that selects which agent speaks next, enabling N-agent round-robin or dynamic speaker selection",
        "Group chat requires all agents to respond simultaneously to each message",
        "Group chat is limited to read-only agents that cannot take actions",
      ],
      correctAnswer: 1,
      explanation: "AutoGen GroupChat introduces a manager agent that selects the next speaker based on conversation context, enabling flexible N-way conversations. Unlike two-agent conversations with fixed turn-taking, GroupChat can have dynamic speaker selection, enabling emergent specialization.",
      hints: [
        "Two-agent: A speaks, B responds, A responds, B responds. GroupChat: manager decides who speaks next.",
        "The manager can implement policies like round-robin, role-based routing, or LLM-based dynamic selection.",
      ],
    },
    {
      id: "q-agent-kp7-8",
      type: "true-false",
      difficulty: "hard",
      question: "In a multi-agent system, giving each agent access to all other agents' full conversation history is the most efficient coordination approach.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Full history sharing leads to quadratic context growth as the number of agents and steps increases. More efficient approaches include structured message passing (only relevant outputs), shared memory stores with selective retrieval, or hierarchical summarization. Selective information sharing is a key design principle in scalable multi-agent systems.",
      hints: [
        "If 10 agents each have 10,000 token histories and all share everything, each agent needs 100,000 tokens of context just for coordination.",
        "Selective context sharing scales much better than full history sharing.",
      ],
    },
    {
      id: "q-agent-kp7-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "ChatDev (Qian et al., 2023) structures software development as a multi-agent system. What is its key insight?",
      options: [
        "Code generation is faster when multiple agents generate the same code in parallel and vote on the best version",
        "Software development phases (design, coding, testing, documentation) map naturally to distinct agent roles that communicate through structured chat",
        "A single monolithic agent can produce complete software systems faster than any multi-agent approach",
        "ChatDev uses retrieval from existing code repositories to avoid generating code from scratch",
      ],
      correctAnswer: 1,
      explanation: "ChatDev assigns distinct roles (CEO, CTO, Programmer, Tester, Reviewer) that mirror real software development teams. Each role has a focused context and responsibility. The agents communicate through structured chat dialogues that simulate design meetings, code reviews, and bug triage — embedding software engineering best practices in the agent interaction protocol.",
      hints: [
        "Real software teams have roles because specialization improves quality. ChatDev applies this insight to LLM agents.",
        "The structured chat format ensures each development phase produces its expected artifact before the next phase begins.",
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
        "The \"Graph\" in LangGraph is literal — think nodes and edges.",
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
      correctAnswer: "True",
      explanation:
        "AutoGen core abstraction is conversational agents that send messages to one another; tasks are solved through this multi-agent dialogue, optionally with human-in-the-loop participants.",
      hints: [
        "The \"Auto\" in AutoGen refers to automated multi-agent conversations.",
        "Consider a \"Coder\" agent and a \"Critic\" agent debating code quality.",
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
        "CrewAI abstracts agents as crew members with human-readable roles and goals, and crews are orchestrated via task assignments — a higher-level API than LangGraph explicit graph construction.",
      hints: [
        "Think about the metaphor: a \"crew\" has roles like Captain, Navigator — agents have roles like Researcher, Writer.",
        "LangGraph requires you to define nodes and edges; CrewAI asks you to define agents and tasks.",
      ],
    },
    {
      id: "q-agent-kp8-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does MCP (Model Context Protocol) standardize in the context of LLM agent frameworks?",
      options: [
        "The format for fine-tuning datasets used to train agent models",
        "A protocol for how LLMs connect to external tools and data sources, enabling any compliant tool to work with any compliant model",
        "The maximum context window size for different model providers",
        "A compression format for reducing token usage in agent prompts",
      ],
      correctAnswer: 1,
      explanation: "MCP (Anthropic, 2024) is an open standard that defines how LLMs communicate with external tools, data sources, and services. It creates a universal interface analogous to USB — any MCP-compliant tool can connect to any MCP-compliant LLM host without custom integration code.",
      hints: [
        "Think of MCP as the USB standard for AI tools: one interface, many compatible devices.",
        "Before MCP, each tool integration required custom API glue code. MCP standardizes that interface.",
      ],
    },
    {
      id: "q-agent-kp8-5",
      type: "true-false",
      difficulty: "medium",
      question: "DSPy optimizes LLM prompts and few-shot examples automatically using compilation rather than manual prompt engineering.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "DSPy (Khattab et al., 2023) treats prompt construction as an optimization problem. A DSPy \"program\" specifies the task structure, and the DSPy compiler automatically finds effective prompts and few-shot examples by evaluating performance on a training set — replacing manual prompt engineering with automatic optimization.",
      hints: [
        "DSPy is to prompts what compilers are to machine code: you specify what you want (high-level), it figures out how (optimized prompts).",
        "DSPy can optimize entire multi-step agent pipelines, not just single prompts.",
      ],
    },
    {
      id: "q-agent-kp8-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In LangGraph, what is the purpose of \"state\" that flows through the graph?",
      options: [
        "State tracks the GPU memory usage of the LLM at each step",
        "State is a typed dictionary that accumulates information across nodes, enabling each node to read prior outputs and write new results",
        "State refers to the on/off status of external API connections",
        "State is a backup snapshot of the conversation used for rollback",
      ],
      correctAnswer: 1,
      explanation: "LangGraph state is the central data structure flowing through the graph. Each node receives the current state, performs computation (LLM calls, tool use, logic), and returns state updates. This functional approach makes agent logic composable, testable, and debuggable.",
      hints: [
        "Think of state as the shared clipboard: every node can read what previous nodes wrote and add their own results.",
        "State typing (TypedDict in Python) catches errors at definition time, not at runtime.",
      ],
    },
    {
      id: "q-agent-kp8-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the key advantage of using a framework like LangGraph over implementing a custom agent loop from scratch?",
      options: [
        "Frameworks always produce better agent performance because they use proprietary optimization techniques",
        "Frameworks provide built-in state management, persistence, human-in-the-loop support, streaming, and observability that are complex to implement correctly from scratch",
        "Custom implementations are always slower because they cannot use GPU acceleration",
        "Frameworks eliminate the need for a system prompt in agent pipelines",
      ],
      correctAnswer: 1,
      explanation: "Production agent systems require checkpointing (to resume interrupted runs), streaming (to show progress), human-in-the-loop interrupts (for approval steps), and observability (to debug failures). Implementing all of these correctly from scratch is substantial engineering work. Frameworks like LangGraph provide these as first-class primitives.",
      hints: [
        "What happens if your agent crashes at step 47 of a 50-step task? Without checkpointing, you restart from scratch.",
        "Streaming matters for user experience: seeing intermediate steps rather than waiting for the final answer.",
      ],
    },
    {
      id: "q-agent-kp8-8",
      type: "true-false",
      difficulty: "hard",
      question: "The \"human-in-the-loop\" pattern in agent frameworks requires the entire agent graph to restart from the beginning when human input is needed.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Modern agent frameworks like LangGraph support checkpointed interrupts: the graph execution pauses at a designated node, saves its full state to persistent storage, and resumes from that exact checkpoint once human input is provided — without restarting from the beginning.",
      hints: [
        "LangGraph checkpoints serialize the full graph state to a database. Resuming means loading that checkpoint and continuing.",
        "This is essential for long-running agents that need human approval at specific decision points.",
      ],
    },
    {
      id: "q-agent-kp8-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How does DSPy handle the challenge of optimizing multi-step agent pipelines where intermediate steps do not have ground-truth labels?",
      options: [
        "DSPy requires human labelers to annotate every intermediate step",
        "DSPy uses the final task metric to backpropagate optimization signals through the pipeline, treating intermediate steps as latent variables",
        "DSPy only optimizes single-step tasks and cannot handle pipelines",
        "DSPy generates ground-truth labels for intermediate steps using a separate teacher model",
      ],
      correctAnswer: 1,
      explanation: "DSPy optimizers like BootstrapFewShot and MIPRO evaluate the full pipeline end-to-end on labeled (input, final_output) examples. Intermediate steps are optimized indirectly — if changing the intermediate prompt improves final output quality (as measured by the task metric), that change is retained. This mirrors how neural networks optimize hidden layers using end-to-end loss.",
      hints: [
        "You only need labels for the final output, not every intermediate step. DSPy optimizes backward from that signal.",
        "This is analogous to training a neural network: you specify the loss on final outputs, and gradients flow backward through all layers.",
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
      correctAnswer: "True",
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
        "Top SWE-Bench systems (SWE-agent, Devin) use an iterative agent loop: Plan (analyze the issue and select a file to edit), Edit (apply a code change using file editing tools), Test (run the test suite — failures become observations), and Reflect (analyze the error and decide on next action). This Trial-Edit-Feedback loop continues until all tests pass or a step budget is exhausted. Test execution provides ground-truth feedback: binary correct/incorrect signals with zero ambiguity.",
      hints: [
        "A failed test gives precise error location and type — far more actionable than \"this code looks wrong\".",
        "The iteration count is typically bounded (e.g., 15 steps) to prevent infinite loops on unsolvable instances.",
        "The SWE-agent paper found that file navigation (knowing which file to edit) is the hardest sub-problem, not the editing itself.",
      ],
    },
    {
      id: "q-agent-kp9-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the primary tool that code agents use to verify their code changes are correct?",
      options: [
        "A separate LLM that reviews the code for style issues",
        "Running the existing test suite and using pass/fail results as feedback",
        "Comparing the generated code to similar code in the training dataset",
        "A human code reviewer who checks each change",
      ],
      correctAnswer: 1,
      explanation: "Test execution is the ground-truth oracle for code agents. Running tests gives objective, unambiguous feedback: tests either pass or fail. The error messages from failing tests pinpoint exactly what is wrong, enabling targeted corrections.",
      hints: [
        "Tests are written by the original developers to define correct behavior — they are the ground truth.",
        "An LLM reviewer might miss subtle bugs; a test suite catches them mechanically.",
      ],
    },
    {
      id: "q-agent-kp9-5",
      type: "true-false",
      difficulty: "medium",
      question: "Code agents can effectively navigate large codebases (millions of lines) by reading every file in sequence.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Reading every file sequentially in a large codebase would exhaust the context window immediately. Effective code agents use targeted navigation: searching for relevant symbols via grep or LSP tools, looking up function definitions, and reading only the files most likely to contain the relevant code.",
      hints: [
        "A codebase like Linux has millions of lines — no context window can hold that much.",
        "Code agents use search tools (grep, symbol lookup) to navigate to relevant code rather than reading everything.",
      ],
    },
    {
      id: "q-agent-kp9-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the \"file editing\" tool paradigm that top SWE-Bench agents use?",
      options: [
        "Generating entire new files from scratch for each code change",
        "Tools that enable precise string replacement, line insertion, and deletion within existing files without requiring full file rewrites",
        "Sending diffs to a separate diff-application service",
        "Using sed and awk commands through a shell tool",
      ],
      correctAnswer: 1,
      explanation: "Precision editing tools apply targeted changes: replace a specific string with a new string, insert lines at a specific position, or delete a range. This is safer and more token-efficient than regenerating entire files and avoids introducing unintended changes outside the targeted edit.",
      hints: [
        "Replacing 3 lines in a 500-line file is much cheaper than regenerating all 500 lines.",
        "Precise edits also reduce the risk of accidentally changing something else while fixing the target bug.",
      ],
    },
    {
      id: "q-agent-kp9-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Why is \"fault localization\" the hardest sub-problem for SWE-Bench code agents, according to the SWE-agent paper?",
      options: [
        "LLMs cannot read Python code well enough to understand the syntax",
        "Identifying which specific file(s) and function(s) contain the bug from a natural language issue description requires understanding both the codebase structure and the semantics of the bug report",
        "The SWE-Bench test suites are written in obscure testing frameworks LLMs cannot parse",
        "Code agents must always modify at least 10 files per issue, which is inherently difficult",
      ],
      correctAnswer: 1,
      explanation: "A GitHub issue describes a symptom (\"X fails when Y\") but not the location. The agent must map that symptom to the responsible code location in a large codebase it has never seen. This requires: understanding what the issue describes, searching for relevant code, hypothesizing which component is responsible, and verifying with tests. The search space is enormous — there may be thousands of relevant-looking files.",
      hints: [
        "The code fix itself is often simple (change one or two lines). Finding those lines in a large codebase is the hard part.",
        "Human developers use domain knowledge and IDE tools to localize bugs quickly — agents must replicate this with search tools.",
      ],
    },
    {
      id: "q-agent-kp9-8",
      type: "true-false",
      difficulty: "hard",
      question: "Code agents that use a Language Server Protocol (LSP) integration can navigate codebases more effectively than agents limited to grep and file reading.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "LSP provides semantic code understanding: go-to-definition, find-all-references, hover types, and rename symbol. These operations understand code semantics, not just text patterns. An agent can jump to where a function is defined, find all callers, and understand type signatures — capabilities that grep alone cannot provide.",
      hints: [
        "grep finds the string \"my_function\" everywhere it appears. LSP go-to-definition finds where it is actually defined, handling imports and indirection.",
        "Find-all-references shows every place a function is called — critical for understanding the impact of a change.",
      ],
    },
    {
      id: "q-agent-kp9-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "OpenDevin / OpenHands achieves higher SWE-Bench scores than baseline SWE-agent primarily because:",
      options: [
        "It uses a larger language model with more parameters",
        "It provides a richer action space including a web browser, full shell access, and an interactive Python interpreter alongside file editing",
        "It hard-codes solutions to the most common GitHub issue patterns",
        "It retrieves similar past patches from a large database and applies them directly",
      ],
      correctAnswer: 1,
      explanation: "OpenDevin expands the agent action space beyond file editing: agents can browse documentation, run interactive debuggers, install packages, and use a persistent shell environment. This richer interaction capability lets agents investigate bugs more thoroughly and apply fixes that require multiple types of actions — more closely mimicking how human developers actually work.",
      hints: [
        "A human developer debugging a bug might: search docs online, run an interactive debugger, install a missing dependency. OpenDevin enables all of these.",
        "The action space breadth matters as much as the underlying model quality for complex engineering tasks.",
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
        "Reading the application source code at runtime.",
        "Screenshots or accessibility tree representations of the screen.",
        "Network packet sniffing of application traffic.",
        "Accessing the application internal database directly.",
      ],
      correctAnswer: 1,
      explanation:
        "Computer use agents observe the UI via screenshots (pixel-level) or structured accessibility trees (element-level), which are then fed to a vision-capable LLM to decide on the next action.",
      hints: [
        "The agent needs to \"see\" the screen — how does a multimodal model receive visual input?",
        "Accessibility APIs (like those for screen readers) provide structured element descriptions.",
      ],
    },
    {
      id: "q-agent-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Anthropic Claude computer use can directly execute arbitrary shell commands on the host machine without any human confirmation.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Anthropic computer use tools are sandboxed and designed with safety guardrails; shell access, if exposed, requires explicit tool definitions by the developer, and Anthropic recommends human confirmation for irreversible actions.",
      hints: [
        "Consider what \"safe by default\" means for a system that can click buttons and type text.",
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
    {
      id: "q-agent-kp10-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "OSWorld is a benchmark for computer use agents that tests:",
      options: [
        "The speed of operating system boot times on different hardware",
        "Agents completing real computer tasks across multiple desktop applications like web browsers, office tools, and terminals",
        "The ability of agents to install operating systems from scratch",
        "Network configuration tasks on server operating systems",
      ],
      correctAnswer: 1,
      explanation: "OSWorld (Xie et al., 2024) benchmarks agents on 369 real computer tasks spanning web browsers, spreadsheets, presentation software, terminals, and multi-app workflows. Tasks are evaluated by executing functional tests on the resulting computer state, not by matching screenshots.",
      hints: [
        "OSWorld tasks look like: \"Create a new spreadsheet with columns X and Y and fill in the data from this description.\"",
        "Evaluation checks actual file contents and application state, not just whether the agent took the right sequence of clicks.",
      ],
    },
    {
      id: "q-agent-kp10-5",
      type: "true-false",
      difficulty: "medium",
      question: "Set-of-Marks (SoM) prompting improves computer use agent performance by overlaying numbered labels on UI elements in screenshots.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Set-of-Marks (Yang et al., 2023) overlays numbered tags on interactive UI elements in the screenshot before feeding it to the vision-language model. Instead of asking the model to predict pixel coordinates, the model predicts a mark number, which is then mapped to coordinates by the system. This significantly reduces visual grounding errors.",
      hints: [
        "SoM converts the hard problem of pixel coordinate prediction into the easier problem of selecting a numbered label.",
        "The numbered overlays on elements are like giving the model a labeled map instead of asking it to identify GPS coordinates by eye.",
      ],
    },
    {
      id: "q-agent-kp10-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is \"visual grounding\" in the context of computer use agents?",
      options: [
        "Grounding the agent in real-world physical environments rather than virtual ones",
        "The ability to map a textual reference to a UI element (e.g., \"the Submit button\") to its exact location in the screenshot",
        "Connecting computer use agents to external APIs for verification",
        "The process of annotating training screenshots with human-labeled bounding boxes",
      ],
      correctAnswer: 1,
      explanation: "Visual grounding is the core capability that enables computer use: given a screenshot and a textual description of an element, identify where that element is in the image. This is necessary because actions like click(x, y) require pixel-level coordinates, but the agent reasons in natural language about UI elements by name.",
      hints: [
        "\"Click the blue Save button\" requires knowing where the blue Save button is in the 1920x1080 pixel grid.",
        "Visual grounding errors (clicking the wrong location) break the entire task trajectory.",
      ],
    },
    {
      id: "q-agent-kp10-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Why is the accessibility tree approach to computer use sometimes preferable to pure screenshot-based approaches, despite being less general?",
      options: [
        "Accessibility trees are available on all operating systems and applications without any additional software",
        "Accessibility trees provide structured element descriptions with built-in coordinates and semantic roles, eliminating the need for visual grounding and making element targeting deterministic",
        "Accessibility trees process faster because they are smaller than screenshots in bytes",
        "Accessibility trees are always more accurate because they are generated by the application developers",
      ],
      correctAnswer: 1,
      explanation: "Accessibility trees (from the OS accessibility API) expose each UI element with its type (button, text field), label, position, and state (enabled/disabled). The agent can find \"the Submit button\" by querying the tree for a button element with label Submit and use its reported coordinates directly — no visual grounding needed. This makes element targeting deterministic and error-free for supported applications.",
      hints: [
        "A screen reader uses the accessibility tree to describe UI to visually impaired users — the same structured information is available to agents.",
        "The limitation is that not all applications expose full accessibility trees, especially games and custom-rendered UIs.",
      ],
    },
    {
      id: "q-agent-kp10-8",
      type: "true-false",
      difficulty: "hard",
      question: "Computer use agents that operate on real desktops can safely be given unrestricted internet access because they are software agents without physical capabilities.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Computer use agents with real desktop and internet access can cause serious harm: sending emails, making purchases, deleting files, submitting forms, or being manipulated by prompt injection on malicious websites. The software-only nature does not limit real-world impact. Production deployments require sandboxed environments, restricted permissions, and human approval for irreversible actions.",
      hints: [
        "An agent that can click a Confirm Purchase button on a shopping site has real-world financial impact.",
        "Prompt injection via malicious web content is a significant risk: a website could instruct the agent to take unintended actions.",
      ],
    },
    {
      id: "q-agent-kp10-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The primary reason top computer use agents in 2024 (like Claude computer use) still perform far below human level on OSWorld benchmarks is:",
      options: [
        "The models are too slow to complete tasks within time limits",
        "Compounding errors across multi-step GUI tasks: each action has a non-trivial error rate, and these errors compound making long task trajectories unreliable",
        "The benchmark tasks require physical hardware interaction that AI cannot perform",
        "Computer use agents cannot understand English instructions on screen",
      ],
      correctAnswer: 1,
      explanation: "OSWorld tasks require many sequential actions (often 10-50+ steps). If each action succeeds with 90% probability, a 20-step task succeeds with only 0.9^20 approximately 12% probability. Compounding error rates across long trajectories is the core challenge. Human success rates on individual actions are much higher, and humans can recover from errors naturally while agents often cannot.",
      hints: [
        "If each of 20 steps has a 90% success rate, the full task succeeds with probability 0.9^20 approximately 0.12.",
        "Improving per-step accuracy from 90% to 95% raises 20-step success from 12% to 36% — individual action quality matters enormously.",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
