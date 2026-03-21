import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'agent-loop': [
    {
      id: 'q-agent-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the canonical LLM agent loop (Weng, 2023), which sequence correctly describes one iteration?',
      options: [
        'Action → Observation → Thought',
        'Thought → Action → Observation',
        'Observation → Action → Thought',
        'Thought → Observation → Action',
      ],
      correctAnswer: 1,
      explanation: 'The ReAct-style agent loop (Yao et al., 2023) cycles: Thought (the LLM reasons about the current state), Action (the LLM emits a tool call or final answer), Observation (the environment returns the tool result). This Thought→Action→Observation triplet repeats until a stopping condition is met.',
      hints: [
        'Think of the agent as first forming a plan (Thought), then doing something (Action), then seeing what happened (Observation).',
        'The LLM generates the first two; the external environment supplies the third.',
      ],
    },
    {
      id: 'q-agent-kp1-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'An agent loop terminates after a fixed, pre-specified number of steps regardless of whether the task is complete.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'Agent loops use configurable stopping conditions: a "task complete" action emitted by the LLM, a max-step safety limit, a human interrupt, or a heuristic (e.g., Reflexion detects repeated identical actions as hallucination and resets). A hard step count is a guard, not the normal termination criterion.',
      hints: [
        'Reflexion (Shinn & Labash, 2023) adds a heuristic that can reset a stuck trajectory — not a fixed counter.',
        'Stopping conditions are configurable; the agent signals completion through its action space.',
      ],
    },
    {
      id: 'q-agent-kp1-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'As an agent run grows longer, the context window fills with Thought/Action/Observation triples. Which strategy best manages this finite context budget?',
      options: [
        'Truncate the oldest tokens silently to stay under the limit',
        'Summarize completed sub-task trajectories and replace verbose history with compressed summaries',
        'Increase the model\'s temperature to generate shorter responses',
        'Switch to a smaller model once the context exceeds 50% capacity',
      ],
      correctAnswer: 1,
      explanation: 'Memory consolidation via summarization (used in Generative Agents, Park et al. 2023) compresses completed episodes into higher-level summaries, freeing context space while retaining key information. Silent truncation loses critical observations; temperature has no effect on context length.',
      hints: [
        'Generative Agents (Park et al., 2023) store a "memory stream" and surface condensed reflections rather than raw event logs.',
        'The goal is to keep the most relevant context within the token budget — summarization preserves semantics, truncation does not.',
      ],
    },
  ],

  'tool-use-agents': [
    {
      id: 'q-agent-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In API-Bank (Li et al., 2023), tool-use capability is evaluated at three levels. Which level requires the agent to plan sequences of API calls to satisfy an ambiguous user request (e.g., "book a trip")?',
      options: [
        'Level-1: calling a given API correctly',
        'Level-2: retrieving the right API from documentation',
        'Level-3: planning beyond retrieval and call',
        'Level-0: deciding whether an API call is needed at all',
      ],
      correctAnswer: 2,
      explanation: 'API-Bank Level-3 assesses the ability to plan multi-step API sequences for under-specified requests. Level-1 tests correct invocation, Level-2 tests API discovery from docs. Level-3 is the hardest and most agentic.',
      hints: [
        'Booking a trip requires: searching flights, hotels, restaurants — multiple APIs with dependencies.',
        'The levels are nested: 3 subsumes 2 subsumes 1.',
      ],
    },
    {
      id: 'q-agent-kp2-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'When an LLM emits a parallel tool-call response (multiple tool-call objects in one turn), the host application must execute them sequentially to avoid race conditions.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'Parallel tool calls are specifically designed for concurrent execution. Both OpenAI and Anthropic APIs support multiple tool-call objects per response so the host can execute independent calls simultaneously, collect all results, and return them together — cutting latency compared to sequential execution.',
      hints: [
        'If two tools are independent (e.g., get weather in Paris and Tokyo), there is no reason to serialize them.',
        'Race conditions only arise when tool calls have shared mutable state — the host is responsible for managing that, not the API.',
      ],
    },
    {
      id: 'q-agent-kp2-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In ChemCrow (Bran et al., 2023), the LLM is given 13 expert chemistry tools and follows the ReAct format: Thought, Action, Action Input, Observation. Human expert evaluation showed ChemCrow outperforms vanilla GPT-4 by a large margin, yet LLM-based self-evaluation shows near-parity. What does this reveal?',
      options: [
        'LLMs are reliable evaluators of domain-expert tasks.',
        'LLM self-evaluation is unreliable for tasks requiring deep expertise it does not have.',
        'ChemCrow\'s tool use is primarily decorative and does not improve chemistry quality.',
        'Human evaluators are systematically biased toward tool-augmented systems.',
      ],
      correctAnswer: 1,
      explanation: 'ChemCrow\'s results highlight that LLMs cannot reliably judge the chemical correctness of outputs because they lack the domain knowledge to detect subtle errors. Human experts orient toward actual chemical validity, exposing a fundamental limitation of LLM-as-judge for specialist domains.',
      hints: [
        'If the model cannot solve the task, it also cannot reliably score solutions to the task.',
        'This is a key caution for using LLM evaluation in specialized agent benchmarks.',
      ],
    },
  ],

  'react-pattern': [
    {
      id: 'q-agent-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does "ReAct" stand for in the context of LLM agents?',
      options: [
        'Recursive Action Transformer',
        'Reasoning and Acting',
        'Retrieval-Augmented Contextual Thinking',
        'React.js integrated with Agents',
      ],
      correctAnswer: 1,
      explanation: 'ReAct (Yao et al., 2022) interleaves Reasoning traces (Thought) with Action steps, allowing the model to plan, observe results, and update its reasoning before the next action.',
      hints: [
        'The paper\'s key insight is that thinking out loud before acting improves task performance.',
        'The two words directly describe what the model does: it reasons, then it acts.',
      ],
    },
    {
      id: 'q-agent-kp3-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In the ReAct pattern, the "Observation" step is generated by the LLM itself.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'The Observation is the real-world result returned by executing the Action (e.g., tool output, search results). The LLM generates Thought and Action; the environment supplies the Observation.',
      hints: [
        'Consider: if the agent calls a web search tool, who provides the search results?',
        'The loop is Thought → Action → Observation, where only the last step comes from outside the model.',
      ],
    },
    {
      id: 'q-agent-kp3-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Compared to chain-of-thought prompting alone, the primary advantage of ReAct is:',
      options: [
        'It eliminates the need for any tools by reasoning over internal knowledge.',
        'It grounds reasoning steps in real observations, reducing hallucinations from stale internal knowledge.',
        'It runs faster because fewer tokens are generated per step.',
        'It requires no few-shot examples to work reliably.',
      ],
      correctAnswer: 1,
      explanation: 'ReAct anchors each reasoning step to fresh, grounded observations from tool calls, preventing the model from drifting into hallucinated "facts" that chain-of-thought reasoning alone can produce.',
      hints: [
        'CoT lets the model think but never checks its thinking against reality.',
        'What happens when a model reasons about today\'s stock price from its training data vs. querying a live API?',
      ],
    },
  ],

  'planning-agents': [
    {
      id: 'q-agent-kp4-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In LLM-based planning, what is the main role of a "planner" step before execution?',
      options: [
        'To compress the user\'s query into fewer tokens.',
        'To decompose a complex goal into an ordered sequence of sub-tasks or tool calls.',
        'To select which LLM model to use for the task.',
        'To validate that tool schemas are syntactically correct.',
      ],
      correctAnswer: 1,
      explanation: 'A planner breaks a high-level goal into sub-tasks with dependencies, enabling the agent to execute steps in the right order and handle failures at the sub-task level rather than restarting from scratch.',
      hints: [
        'Think about how a project manager breaks a large project into tickets before any coding begins.',
        'The plan is produced before any tools are actually called.',
      ],
    },
    {
      id: 'q-agent-kp4-2',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Monte Carlo Tree Search (MCTS) can be applied to LLM agent planning by using the LLM to evaluate the value of candidate next actions.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Recent work (e.g., Tree of Thoughts, RAP) uses LLMs as both a policy (proposing actions) and a value function (scoring states), plugging directly into MCTS\'s selection-expansion-simulation-backpropagation cycle.',
      hints: [
        'MCTS needs a way to estimate "how good is this state?" — an LLM can provide that estimate via prompting.',
        'Tree of Thoughts explicitly frames reasoning as a search through a tree of partial solutions.',
      ],
    },
    {
      id: 'q-agent-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is a key limitation of purely LLM-generated plans for long-horizon tasks?',
      options: [
        'LLMs cannot output structured text like JSON or YAML.',
        'Plans become stale as the world changes mid-execution, requiring re-planning.',
        'LLM planners always produce optimal plans with zero redundant steps.',
        'Planning requires access to a dedicated GPU cluster not available at inference time.',
      ],
      correctAnswer: 1,
      explanation: 'Static upfront plans assume a static environment; in practice, tool results may be unexpected, requiring the agent to revise its plan mid-execution — a capability called adaptive or online re-planning.',
      hints: [
        'Consider what happens if step 3 of a 10-step plan fails unexpectedly.',
        'The world can change between when the plan is made and when step 7 executes.',
      ],
    },
  ],

  'memory-agents': [
    {
      id: 'q-agent-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which type of agent memory stores information only for the duration of a single conversation session?',
      options: [
        'Long-term memory',
        'Episodic memory',
        'Short-term (in-context) memory',
        'Semantic memory',
      ],
      correctAnswer: 2,
      explanation: 'Short-term or in-context memory is the running conversation history held in the LLM\'s context window; it is lost when the session ends.',
      hints: [
        'Think about what the LLM can "see" at any given moment — it\'s bounded by the context window.',
        'This type of memory doesn\'t persist to disk or a database.',
      ],
    },
    {
      id: 'q-agent-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Episodic memory in agents refers to storing summaries of past agent runs so they can be retrieved in future sessions.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Episodic memory records specific past experiences (task runs, outcomes, errors) that the agent can retrieve to avoid repeating mistakes or reuse successful strategies in new sessions.',
      hints: [
        'The term comes from cognitive science, where episodic memory is memory of specific events, not general facts.',
        'This contrasts with semantic memory, which stores general knowledge rather than specific past episodes.',
      ],
    },
    {
      id: 'q-agent-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "memory consolidation" problem in long-running agents refers to:',
      options: [
        'The agent\'s inability to write to a SQL database during runtime.',
        'Deciding what information to compress, summarize, or evict from the context window to stay within token limits.',
        'Converting floating-point weights to integers for efficiency.',
        'Merging two separate agent threads into one.',
      ],
      correctAnswer: 1,
      explanation: 'As agent runs grow, the context fills up. Memory consolidation strategies (summarization, importance scoring, eviction policies) decide what to keep verbatim, compress, or discard to maintain performance within the token budget.',
      hints: [
        'Context windows have finite token limits — you can\'t keep everything.',
        'Think about how a human\'s working memory is limited and the brain "decides" what to keep.',
      ],
    },
  ],

  'rag-agents': [
    {
      id: 'q-agent-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a RAG system, what is the purpose of the "retrieval" step?',
      options: [
        'To fine-tune the LLM on new documents.',
        'To fetch relevant document chunks from a vector store to include in the prompt.',
        'To cache the LLM\'s previous responses for speed.',
        'To validate the LLM\'s output against a ground truth database.',
      ],
      correctAnswer: 1,
      explanation: 'Retrieval-Augmented Generation fetches semantically relevant chunks from an external knowledge base and injects them into the prompt, giving the LLM up-to-date context it wasn\'t trained on.',
      hints: [
        'The model\'s knowledge is static after training — RAG provides a way to give it fresh information at inference time.',
        'Vector similarity search is the most common method for finding relevant chunks.',
      ],
    },
    {
      id: 'q-agent-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In agentic RAG, the agent can iteratively decide to retrieve more information if the initial retrieval was insufficient.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Agentic RAG treats retrieval as a tool call the agent can invoke multiple times, refining queries based on what it has already retrieved — a pattern called iterative or multi-hop retrieval.',
      hints: [
        'Contrast naive RAG (one retrieval call) with an agent that can issue follow-up queries.',
        'Think about how a researcher may search for a topic, read, then search for a related sub-topic.',
      ],
    },
    {
      id: 'q-agent-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which technique improves retrieval precision by having the LLM rewrite the user\'s query before embedding it?',
      options: [
        'Re-ranking with a cross-encoder',
        'HyDE (Hypothetical Document Embeddings)',
        'Chunk overlap expansion',
        'BM25 keyword fallback',
      ],
      correctAnswer: 1,
      explanation: 'HyDE generates a hypothetical ideal document that would answer the query, then embeds that document for retrieval — often producing vectors closer to the relevant chunks than embedding the raw question alone.',
      hints: [
        'The key insight is that embedding a question and embedding an answer live in different regions of vector space.',
        'Think about what would be more similar to a passage about "Einstein\'s work": the question "Who developed relativity?" or a synthetic paragraph describing relativity.',
      ],
    },
  ],

  'multi-agent-systems': [
    {
      id: 'q-agent-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary motivation for using multiple agents instead of a single large agent?',
      options: [
        'Multiple agents always produce cheaper API calls.',
        'Tasks can be parallelized, specialized agents can handle subtasks better, and context windows remain focused.',
        'Multi-agent systems don\'t require any orchestration logic.',
        'A single LLM cannot handle more than one tool at a time.',
      ],
      correctAnswer: 1,
      explanation: 'Multi-agent systems exploit parallelism, allow specialization (e.g., a coder agent + a reviewer agent), and keep each agent\'s context focused on its sub-task rather than a bloated shared context.',
      hints: [
        'Think about why companies have teams of specialists instead of one generalist doing everything.',
        'Parallelism and specialization are the two key wins.',
      ],
    },
    {
      id: 'q-agent-kp7-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In a multi-agent system, all agents must share a single context window to coordinate effectively.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'Agents communicate via message passing, shared memory stores, or explicit handoffs — not by sharing a single context window. Each agent maintains its own context and exchanges structured outputs.',
      hints: [
        'Consider how microservices communicate via APIs, not shared memory.',
        'What would happen to token limits if every agent shared one enormous context?',
      ],
    },
    {
      id: 'q-agent-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which coordination pattern describes an agent that decomposes a task and delegates sub-tasks to specialist agents, then aggregates their results?',
      options: [
        'Peer-to-peer gossip protocol',
        'Blackboard architecture',
        'Orchestrator-subagent (hierarchical) pattern',
        'Reactive agent swarm',
      ],
      correctAnswer: 2,
      explanation: 'The orchestrator-subagent pattern has a central orchestrator that plans and routes sub-tasks to specialized agents, then synthesizes their outputs — common in frameworks like LangGraph and AutoGen.',
      hints: [
        'Think of a manager who assigns work to team members and reviews their outputs.',
        'The key word is "delegates" — there is a hierarchy, not a flat peer structure.',
      ],
    },
  ],

  'agent-frameworks': [
    {
      id: 'q-agent-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'LangGraph models agent workflows as:',
      options: [
        'Linear chains of LLM calls only.',
        'Directed graphs (nodes = steps, edges = transitions) with support for cycles.',
        'SQL database query plans.',
        'YAML configuration files parsed at runtime.',
      ],
      correctAnswer: 1,
      explanation: 'LangGraph represents agent logic as a stateful directed graph where nodes are processing steps and edges encode conditional transitions, naturally supporting loops, branches, and multi-agent handoffs.',
      hints: [
        'The "Graph" in LangGraph is literal — think nodes and edges.',
        'Cycles in the graph enable the agent loop (the model can return to earlier nodes).',
      ],
    },
    {
      id: 'q-agent-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'AutoGen allows multiple LLM-powered agents to converse with each other to solve tasks collaboratively.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'AutoGen\'s core abstraction is conversational agents that send messages to one another; tasks are solved through this multi-agent dialogue, optionally with human-in-the-loop participants.',
      hints: [
        'The "Auto" in AutoGen refers to automated multi-agent conversations.',
        'Consider a "Coder" agent and a "Critic" agent debating code quality.',
      ],
    },
    {
      id: 'q-agent-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is a primary differentiator of CrewAI compared to LangGraph?',
      options: [
        'CrewAI only supports OpenAI models; LangGraph supports all providers.',
        'CrewAI uses a role-based abstraction (Agents with roles/goals/backstory) and structured crew orchestration rather than explicit graph definitions.',
        'CrewAI does not support tool use, while LangGraph does.',
        'CrewAI stores all state in a relational database by default.',
      ],
      correctAnswer: 1,
      explanation: 'CrewAI abstracts agents as crew members with human-readable roles and goals, and crews are orchestrated via task assignments — a higher-level API than LangGraph\'s explicit graph construction.',
      hints: [
        'Think about the metaphor: a "crew" has roles like Captain, Navigator — agents have roles like Researcher, Writer.',
        'LangGraph requires you to define nodes and edges; CrewAI asks you to define agents and tasks.',
      ],
    },
  ],

  'code-agents': [
    {
      id: 'q-agent-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'SWE-Bench is a benchmark for evaluating agents on:',
      options: [
        'Writing marketing copy for software products.',
        'Resolving real GitHub issues in open-source Python repositories.',
        'Generating unit tests from docstrings only.',
        'Benchmarking LLM inference speed on code completion.',
      ],
      correctAnswer: 1,
      explanation: 'SWE-Bench tasks agents with fixing real bugs from GitHub issues in popular Python repos (e.g., scikit-learn, Django), measured by whether the patch passes the associated test suite.',
      hints: [
        'SWE stands for Software Engineering — the benchmark is about real engineering tasks, not toy problems.',
        'Success is measured by test suite pass rates, not human evaluation.',
      ],
    },
    {
      id: 'q-agent-kp9-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Code agents typically execute code in a sandboxed environment to prevent accidental damage to the host system.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Sandboxing (via Docker containers, E2B, or similar) isolates code execution so agent-generated code cannot access sensitive host resources or cause irreversible side effects.',
      hints: [
        'Would you run unknown code directly on your laptop without any isolation?',
        'Think about how Jupyter notebooks or online code runners use isolated environments.',
      ],
    },
    {
      id: 'q-agent-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which agent architecture has shown the strongest performance on SWE-Bench Verified as of 2024?',
      options: [
        'Single-pass code generation with no tool use.',
        'Agents with file editing tools, test execution, and iterative error correction loops.',
        'Purely retrieval-based agents that find similar past patches.',
        'Agents that only generate diffs without running any code.',
      ],
      correctAnswer: 1,
      explanation: 'Top SWE-Bench systems (e.g., SWE-agent, Devin-style) combine file navigation, code editing, test running, and feedback loops — iteratively fixing errors based on test output rather than generating a patch in one shot.',
      hints: [
        'Real software engineering involves writing code, running it, seeing errors, and fixing them.',
        'The iterative feedback loop from test execution is crucial to high pass rates.',
      ],
    },
  ],

  'computer-use-agents': [
    {
      id: 'q-agent-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Computer use agents perceive the state of a GUI primarily through:',
      options: [
        'Reading the application\'s source code at runtime.',
        'Screenshots or accessibility tree representations of the screen.',
        'Network packet sniffing of application traffic.',
        'Accessing the application\'s internal database directly.',
      ],
      correctAnswer: 1,
      explanation: 'Computer use agents observe the UI via screenshots (pixel-level) or structured accessibility trees (element-level), which are then fed to a vision-capable LLM to decide on the next action.',
      hints: [
        'The agent needs to "see" the screen — how does a multimodal model receive visual input?',
        'Accessibility APIs (like those for screen readers) provide structured element descriptions.',
      ],
    },
    {
      id: 'q-agent-kp10-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Anthropic\'s Claude computer use can directly execute arbitrary shell commands on the host machine without any human confirmation.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'Anthropic\'s computer use tools are sandboxed and designed with safety guardrails; shell access, if exposed, requires explicit tool definitions by the developer, and Anthropic recommends human confirmation for irreversible actions.',
      hints: [
        'Consider what "safe by default" means for a system that can click buttons and type text.',
        'Tool access is always explicitly granted by the developer hosting the agent.',
      ],
    },
    {
      id: 'q-agent-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the main challenge of using pixel-based screenshots (vs. accessibility trees) for computer use agents?',
      options: [
        'Screenshots are larger files and cost more to transmit.',
        'Pixel-based observation requires visual grounding: precisely mapping UI elements to pixel coordinates for click/type actions.',
        'Accessibility trees cannot represent dynamic web content.',
        'Screenshot-based agents always require GPU acceleration on the host machine.',
      ],
      correctAnswer: 1,
      explanation: 'Pixel grounding — accurately identifying the (x, y) coordinates of a button or input field from a screenshot — is a hard vision problem; small errors cause mis-clicks that break the task trajectory.',
      hints: [
        'Clicking requires knowing where exactly to click in pixel space, not just what to click.',
        'Accessibility trees give element positions for free; screenshots require the model to infer them.',
      ],
    },
  ],
}

registerQuestions(questions)

export default questions
