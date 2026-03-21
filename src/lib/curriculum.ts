export interface Course {
  id: string
  slug: string
  name: string
  description: string
  category: string
  icon: string
  color: string
  topicCount: number
  estimatedHours: number
  topics: Topic[]
}

export interface Topic {
  id: string
  slug: string
  name: string
  description: string
  knowledgePoints: KnowledgePoint[]
}

export interface KnowledgePoint {
  id: string
  slug: string
  name: string
}

export const categories = [
  { id: 'reinforcement-learning', name: 'Reinforcement Learning', icon: '🤖' },
  { id: 'fine-tuning', name: 'Fine-Tuning', icon: '🎛️' },
  { id: 'software-engineering', name: 'Software Engineering', icon: '💻' },
]

export const courses: Course[] = [
  // REINFORCEMENT LEARNING
  {
    id: 'rl-fundamentals',
    slug: 'rl-fundamentals',
    name: 'RL Fundamentals',
    description: 'Master the foundations of reinforcement learning: MDPs, Bellman equations, and value functions.',
    category: 'reinforcement-learning',
    icon: '🎯',
    color: '#10B981',
    topicCount: 8,
    estimatedHours: 20,
    topics: [
      {
        id: 'mdp',
        slug: 'mdp',
        name: 'Markov Decision Processes',
        description: 'Understand the mathematical framework for sequential decision making.',
        knowledgePoints: [
          { id: 'kp-1', slug: 'states-and-actions', name: 'States and Actions' },
          { id: 'kp-2', slug: 'transition-model', name: 'Transition Model' },
          { id: 'kp-3', slug: 'reward-hypothesis', name: 'Reward Hypothesis' },
          { id: 'kp-4', slug: 'discount-factor', name: 'Discount Factor' },
        ]
      },
      {
        id: 'bellman-equations',
        slug: 'bellman-equations',
        name: 'Bellman Equations',
        description: 'Derive and understand the core equations that power RL algorithms.',
        knowledgePoints: [
          { id: 'kp-5', slug: 'value-function', name: 'Value Function' },
          { id: 'kp-6', slug: 'action-value', name: 'Action-Value Function Q(s,a)' },
          { id: 'kp-7', slug: 'bellman-optimality', name: 'Bellman Optimality Equation' },
        ]
      },
      {
        id: 'dynamic-programming',
        slug: 'dynamic-programming',
        name: 'Dynamic Programming',
        description: 'Policy and value iteration methods for known environments.',
        knowledgePoints: [
          { id: 'kp-8', slug: 'policy-evaluation', name: 'Policy Evaluation' },
          { id: 'kp-9', slug: 'policy-iteration', name: 'Policy Iteration' },
          { id: 'kp-10', slug: 'value-iteration', name: 'Value Iteration' },
        ]
      },
      {
        id: 'monte-carlo',
        slug: 'monte-carlo',
        name: 'Monte Carlo Methods',
        description: 'Learning from experience through sampled trajectories.',
        knowledgePoints: [
          { id: 'kp-11', slug: 'mc-prediction', name: 'Monte Carlo Prediction' },
          { id: 'kp-12', slug: 'mc-control', name: 'Monte Carlo Control' },
          { id: 'kp-13', slug: 'epsilon-greedy', name: 'Epsilon-Greedy Exploration' },
        ]
      },
      {
        id: 'td-learning',
        slug: 'td-learning',
        name: 'Temporal Difference Learning',
        description: 'Combine Monte Carlo and DP ideas with TD(0), TD(λ), and eligibility traces.',
        knowledgePoints: [
          { id: 'kp-14', slug: 'td-0', name: 'TD(0) Algorithm' },
          { id: 'kp-15', slug: 'sarsa', name: 'SARSA' },
          { id: 'kp-16', slug: 'q-learning', name: 'Q-Learning (Off-Policy TD)' },
          { id: 'kp-17', slug: 'eligibility-traces', name: 'Eligibility Traces' },
        ]
      },
      {
        id: 'function-approximation',
        slug: 'function-approximation',
        name: 'Function Approximation',
        description: 'Extend RL to large state spaces with neural networks and other function approximators.',
        knowledgePoints: [
          { id: 'kp-18', slug: 'linear-features', name: 'Linear Feature Approximation' },
          { id: 'kp-19', slug: 'deep-rl', name: 'Deep Q-Networks' },
          { id: 'kp-20', slug: 'experience-replay', name: 'Experience Replay' },
        ]
      },
      {
        id: 'policy-gradient',
        slug: 'policy-gradient',
        name: 'Policy Gradient Methods',
        description: 'Optimize policies directly with REINFORCE and Actor-Critic algorithms.',
        knowledgePoints: [
          { id: 'kp-21', slug: 'reinforce', name: 'REINFORCE Algorithm' },
          { id: 'kp-22', slug: 'actor-critic', name: 'Actor-Critic Architecture' },
          { id: 'kp-23', slug: 'gae', name: 'Generalized Advantage Estimation' },
        ]
      },
      {
        id: 'advanced-algorithms',
        slug: 'advanced-algorithms',
        name: 'Advanced RL Algorithms',
        description: 'Master PPO, SAC, and other state-of-the-art algorithms.',
        knowledgePoints: [
          { id: 'kp-24', slug: 'ppo', name: 'Proximal Policy Optimization (PPO)' },
          { id: 'kp-25', slug: 'sac', name: 'Soft Actor-Critic (SAC)' },
          { id: 'kp-26', slug: 'td3', name: 'Twin Delayed DDPG (TD3)' },
        ]
      },
    ]
  },
  {
    id: 'rl-applications',
    slug: 'rl-applications',
    name: 'RL Applications',
    description: 'Apply reinforcement learning to games, robotics, and NLP problems.',
    category: 'reinforcement-learning',
    icon: '🎮',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      { id: 'game-ai', slug: 'game-ai', name: 'Game Playing AI', description: 'Build agents that master Atari, Go, Chess, and more.', knowledgePoints: [] },
      { id: 'robotics', slug: 'robotics', name: 'Robotics Control', description: 'Apply RL to real-world robot control problems.', knowledgePoints: [] },
      { id: 'nlp-rl', slug: 'nlp-rl', name: 'RL for NLP', description: 'RLHF, text generation, and dialogue systems.', knowledgePoints: [] },
      { id: 'recommendation', slug: 'recommendation', name: 'Recommendation Systems', description: 'Apply RL to dynamic recommendation problems.', knowledgePoints: [] },
      { id: 'finance', slug: 'finance', name: 'RL in Finance', description: 'Trading strategies and portfolio optimization with RL.', knowledgePoints: [] },
      { id: 'healthcare', slug: 'healthcare', name: 'Healthcare Applications', description: 'Treatment optimization and medical decision making.', knowledgePoints: [] },
    ]
  },

  // FINE-TUNING
  {
    id: 'llm-finetuning',
    slug: 'llm-finetuning',
    name: 'LLM Fine-Tuning',
    description: 'Learn to fine-tune large language models efficiently using LoRA, QLoRA, and full fine-tuning.',
    category: 'fine-tuning',
    icon: '🧠',
    color: '#F59E0B',
    topicCount: 10,
    estimatedHours: 30,
    topics: [
      {
        id: 'transfer-learning',
        slug: 'transfer-learning',
        name: 'Transfer Learning Basics',
        description: 'Understand how pre-trained models capture knowledge.',
        knowledgePoints: [
          { id: 'ft-kp-1', slug: 'pretrained-models', name: 'Pre-trained Models' },
          { id: 'ft-kp-2', slug: 'fine-tuning-vs-rag', name: 'Fine-tuning vs RAG' },
          { id: 'ft-kp-3', slug: 'transfer-learning-types', name: 'Types of Transfer Learning' },
        ]
      },
      {
        id: 'lora',
        slug: 'lora',
        name: 'LoRA Fine-Tuning',
        description: 'Low-Rank Adaptation for memory-efficient fine-tuning.',
        knowledgePoints: [
          { id: 'ft-kp-4', slug: 'lora-intuition', name: 'LoRA Intuition' },
          { id: 'ft-kp-5', slug: 'lora-config', name: 'LoRA Configuration' },
          { id: 'ft-kp-6', slug: 'lora-training', name: 'Training with LoRA' },
        ]
      },
      {
        id: 'qlora',
        slug: 'qlora',
        name: 'QLoRA Fine-Tuning',
        description: 'Quantized LoRA for fine-tuning on consumer GPUs.',
        knowledgePoints: [
          { id: 'ft-kp-7', slug: 'qlora-intuition', name: 'QLoRA Intuition' },
          { id: 'ft-kp-8', slug: '4bit-quantization', name: '4-bit NormalFloat Quantization' },
          { id: 'ft-kp-9', slug: 'qlora-training', name: 'Training with QLoRA' },
        ]
      },
      {
        id: 'full-finetune',
        slug: 'full-finetune',
        name: 'Full Fine-Tuning',
        description: 'When and how to fine-tune all model parameters.',
        knowledgePoints: [
          { id: 'ft-kp-10', slug: 'full-finetune-when', name: 'When to Full Fine-Tune' },
          { id: 'ft-kp-11', slug: 'learning-rate-scheduling', name: 'Learning Rate Scheduling' },
          { id: 'ft-kp-12', slug: 'gradient-checkpointing', name: 'Gradient Checkpointing' },
        ]
      },
      {
        id: 'dataset-preparation',
        slug: 'dataset-preparation',
        name: 'Dataset Preparation',
        description: 'Create and format high-quality training data.',
        knowledgePoints: [
          { id: 'ft-kp-13', slug: 'instruction-datasets', name: 'Instruction Datasets' },
          { id: 'ft-kp-14', slug: 'chat-template', name: 'Chat Templates' },
          { id: 'ft-kp-15', slug: 'data-quality', name: 'Data Quality Filtering' },
        ]
      },
      {
        id: 'evaluation',
        slug: 'evaluation',
        name: 'Fine-Tuning Evaluation',
        description: 'Evaluate fine-tuned models effectively.',
        knowledgePoints: [
          { id: 'ft-kp-16', slug: 'perplexity', name: 'Perplexity' },
          { id: 'ft-kp-17', slug: 'task-eval', name: 'Task-Specific Evaluation' },
          { id: 'ft-kp-18', slug: 'llm- judges', name: 'LLM-as-a-Judge' },
        ]
      },
      {
        id: 'rlhf',
        slug: 'rlhf',
        name: 'RLHF',
        description: 'Reinforcement Learning from Human Feedback.',
        knowledgePoints: [
          { id: 'ft-kp-19', slug: 'reward-modeling', name: 'Reward Modeling' },
          { id: 'ft-kp-20', slug: 'ppo-finetuning', name: 'PPO Fine-Tuning' },
          { id: 'ft-kp-21', slug: 'dpo', name: 'Direct Preference Optimization (DPO)' },
        ]
      },
      {
        id: 'domain-adaptation',
        slug: 'domain-adaptation',
        name: 'Domain Adaptation',
        description: 'Adapt models to specific domains (medical, legal, code).',
        knowledgePoints: [
          { id: 'ft-kp-22', slug: 'domain-data', name: 'Domain-Specific Data Collection' },
          { id: 'ft-kp-23', slug: 'catastrophic-forgetting', name: 'Avoiding Catastrophic Forgetting' },
        ]
      },
      {
        id: 'peft-techniques',
        slug: 'peft-techniques',
        name: 'Other PEFT Techniques',
        description: 'Prompt tuning, adapters, and prefix tuning.',
        knowledgePoints: [
          { id: 'ft-kp-24', slug: 'prompt-tuning', name: 'Prompt Tuning' },
          { id: 'ft-kp-25', slug: 'adapters', name: 'Adapter Layers' },
          { id: 'ft-kp-26', slug: 'prefix-tuning', name: 'Prefix Tuning' },
        ]
      },
      {
        id: 'production-finetuning',
        slug: 'production-finetuning',
        name: 'Production Fine-Tuning',
        description: 'Scale fine-tuning to production workloads.',
        knowledgePoints: [
          { id: 'ft-kp-27', slug: 'distributed-training', name: 'Distributed Training' },
          { id: 'ft-kp-28', slug: 'model-merge', name: 'Model Merging' },
          { id: 'ft-kp-29', slug: 'deployment', name: 'Deployment Strategies' },
        ]
      },
    ]
  },

  // OPENCLAW-RL (User's Research)
  {
    id: 'openclaw-rl',
    slug: 'openclaw-rl',
    name: 'OpenClaw-RL: Agentic RL',
    description: 'Master scalable RL for real-world agents. Based on cutting-edge research from OpenClaw-RL.',
    category: 'reinforcement-learning',
    icon: '🦞',
    color: '#FF6B35',
    topicCount: 12,
    estimatedHours: 35,
    topics: [
      {
        id: 'openclaw-intro',
        slug: 'openclaw-intro',
        name: 'Introduction to OpenClaw-RL',
        description: 'Understand the fully asynchronous RL framework for training personalized agents.',
        knowledgePoints: [
          { id: 'oc-kp-1', slug: 'what-is-openclaw', name: 'What is OpenClaw-RL?' },
          { id: 'oc-kp-2', slug: 'async-architecture', name: '4-Component Async Architecture' },
          { id: 'oc-kp-3', slug: 'self-hosted', name: 'Self-Hosted & Private by Design' },
        ]
      },
      {
        id: 'binary-rl',
        slug: 'binary-rl',
        name: 'Binary RL (GRPO)',
        description: 'Learn Binary RL where a Process Reward Model scores each turn.',
        knowledgePoints: [
          { id: 'oc-kp-4', slug: 'prm-intro', name: 'Process Reward Models (PRM)' },
          { id: 'oc-kp-5', slug: 'grpo-advantage', name: 'GRPO Advantage Estimation' },
          { id: 'oc-kp-6', slug: 'clip-surrogate', name: 'PPO-Style Clipped Surrogate Loss' },
        ]
      },
      {
        id: 'opd',
        slug: 'opd',
        name: 'On-Policy Distillation (OPD)',
        description: 'Extract textual hints from hindsight to create enhanced teacher signals.',
        knowledgePoints: [
          { id: 'oc-kp-7', slug: 'hindsight-hints', name: 'Hindsight Hint Extraction' },
          { id: 'oc-kp-8', slug: 'teacher-student', name: 'Teacher-Student Architecture' },
          { id: 'oc-kp-9', slug: 'directional-advantage', name: 'Token-Level Directional Advantage' },
        ]
      },
      {
        id: 'combine-method',
        slug: 'combine-method',
        name: 'Combination Method',
        description: 'Combine Binary RL and OPD for stronger, more robust optimization.',
        knowledgePoints: [
          { id: 'oc-kp-10', slug: 'hybrid-signals', name: 'Hybrid Scalar + Token Signals' },
          { id: 'oc-kp-11', slug: 'training-recipe', name: 'Unified Training Recipe' },
        ]
      },
      {
        id: 'lora-training',
        slug: 'lora-training',
        name: 'LoRA Training',
        description: 'Memory-efficient training with Low-Rank Adaptation.',
        knowledgePoints: [
          { id: 'oc-kp-12', slug: 'lora-intuition', name: 'LoRA Intuition for RL' },
          { id: 'oc-kp-13', slug: 'lora-config', name: 'LoRA Configuration' },
        ]
      },
      {
        id: 'agent-settings',
        slug: 'agent-settings',
        name: 'Agent Settings',
        description: 'Train agents in terminal, GUI, SWE, and tool-call environments.',
        knowledgePoints: [
          { id: 'oc-kp-14', slug: 'terminal-agents', name: 'Terminal Agents' },
          { id: 'oc-kp-15', slug: 'gui-agents', name: 'GUI Agents' },
          { id: 'oc-kp-16', slug: 'swe-agents', name: 'SWE Agents (swebench)' },
          { id: 'oc-kp-17', slug: 'toolcall-agents', name: 'Tool-Call Agents' },
        ]
      },
      {
        id: 'rollout-collection',
        slug: 'rollout-collection',
        name: 'Rollout Collection',
        description: 'Async collection of training trajectories from live interactions.',
        knowledgePoints: [
          { id: 'oc-kp-18', slug: 'session-trajectories', name: 'Session-Aware Trajectories' },
          { id: 'oc-kp-19', slug: 'mainline-turns', name: 'Main-line vs Side Turns' },
        ]
      },
      {
        id: 'prm-judge',
        slug: 'prm-judge',
        name: 'PRM & Judge Evaluation',
        description: 'Asynchronous evaluation with majority voting for robust scoring.',
        knowledgePoints: [
          { id: 'oc-kp-20', slug: 'async-judging', name: 'Async Judging Architecture' },
          { id: 'oc-kp-21', slug: 'majority-voting', name: 'Majority Voting Strategy' },
        ]
      },
      {
        id: 'tinker-integration',
        slug: 'tinker-integration',
        name: 'Tinker Integration',
        description: 'Deploy training on cloud GPUs via Tinker.',
        knowledgePoints: [
          { id: 'oc-kp-22', slug: 'tinker-setup', name: 'Tinker Setup' },
          { id: 'oc-kp-23', slug: 'cloud-deployment', name: 'Cloud Training Deployment' },
        ]
      },
      {
        id: 'advanced-methods',
        slug: 'advanced-methods',
        name: 'Advanced Methods',
        description: 'SDFT, SDPO, and other cutting-edge RL methods.',
        knowledgePoints: [
          { id: 'oc-kp-24', slug: 'sdft', name: 'SDFT Integration' },
          { id: 'oc-kp-25', slug: 'sdpo', name: 'SDPO Integration' },
        ]
      },
      {
        id: 'evaluation',
        slug: 'evaluation',
        name: 'Evaluation',
        description: 'Rigorous evaluation of trained agents.',
        knowledgePoints: [
          { id: 'oc-kp-26', slug: 'eval-metrics', name: 'Evaluation Metrics' },
          { id: 'oc-kp-27', slug: 'benchmarking', name: 'Benchmarking Strategies' },
        ]
      },
      {
        id: 'production-deployment',
        slug: 'production-deployment',
        name: 'Production Deployment',
        description: 'Scale to production workloads.',
        knowledgePoints: [
          { id: 'oc-kp-28', slug: 'distributed-training', name: 'Distributed Training' },
          { id: 'oc-kp-29', slug: 'model-serving', name: 'Model Serving' },
        ]
      },
    ]
  },

  // SOFTWARE ENGINEERING
  {
    id: 'coding-interviews',
    slug: 'coding-interviews',
    name: 'Coding Interview Prep',
    description: 'Master data structures, algorithms, and problem-solving for technical interviews.',
    category: 'software-engineering',
    icon: '💻',
    color: '#3B82F6',
    topicCount: 12,
    estimatedHours: 60,
    topics: [
      { id: 'arrays', slug: 'arrays', name: 'Arrays & Strings', description: 'Foundational array manipulation and string algorithms.', knowledgePoints: [] },
      { id: 'linked-lists', slug: 'linked-lists', name: 'Linked Lists', description: 'Singly, doubly, and circular linked lists.', knowledgePoints: [] },
      { id: 'stacks-queues', slug: 'stacks-queues', name: 'Stacks & Queues', description: 'LIFO and FIFO data structures.', knowledgePoints: [] },
      { id: 'trees', slug: 'trees', name: 'Trees & Graphs', description: 'Binary trees, BSTs, tries, and graph algorithms.', knowledgePoints: [] },
      { id: 'dynamic-programming-se', slug: 'dynamic-programming-se', name: 'Dynamic Programming', description: 'Memoization, tabulation, and DP patterns.', knowledgePoints: [] },
      { id: 'sorting-searching', slug: 'sorting-searching', name: 'Sorting & Searching', description: 'Binary search, quicksort, mergesort, and more.', knowledgePoints: [] },
      { id: 'hash-tables', slug: 'hash-tables', name: 'Hash Tables', description: 'Hashing, collision resolution, and applications.', knowledgePoints: [] },
      { id: 'recursion', slug: 'recursion', name: 'Recursion', description: 'Backtracking, divide & conquer, and recursion trees.', knowledgePoints: [] },
      { id: 'bit-manipulation', slug: 'bit-manipulation', name: 'Bit Manipulation', description: 'Bit operations and tricks for interviews.', knowledgePoints: [] },
      { id: 'two-pointers', slug: 'two-pointers', name: 'Two Pointers', description: 'Classic two-pointer technique patterns.', knowledgePoints: [] },
      { id: 'sliding-window', slug: 'sliding-window', name: 'Sliding Window', description: 'Fixed and variable window techniques.', knowledgePoints: [] },
      { id: 'graph-algorithms', slug: 'graph-algorithms', name: 'Graph Algorithms', description: 'BFS, DFS, Dijkstra, and Floyd-Warshall.', knowledgePoints: [] },
    ]
  },
  {
    id: 'system-design',
    slug: 'system-design',
    name: 'System Design Fundamentals',
    description: 'Design scalable distributed systems like the pros (Google, Amazon, Netflix).',
    category: 'software-engineering',
    icon: '🏗️',
    color: '#EF4444',
    topicCount: 10,
    estimatedHours: 40,
    topics: [
      { id: 'scalability', slug: 'scalability', name: 'Scalability Fundamentals', description: 'Horizontal vs vertical scaling, load balancing.', knowledgePoints: [] },
      { id: 'databases', slug: 'databases', name: 'Database Design', description: 'SQL vs NoSQL, sharding, replication.', knowledgePoints: [] },
      { id: 'caching', slug: 'caching', name: 'Caching Strategies', description: 'CDN, Redis, Memcached, cache patterns.', knowledgePoints: [] },
      { id: 'microservices', slug: 'microservices', name: 'Microservices', description: 'Service discovery, API gateway, communication patterns.', knowledgePoints: [] },
      { id: 'message-queues', slug: 'message-queues', name: 'Message Queues', description: 'Kafka, RabbitMQ, pub/sub patterns.', knowledgePoints: [] },
      { id: 'cdn', slug: 'cdn', name: 'CDN & DNS', description: 'Content delivery networks and DNS resolution.', knowledgePoints: [] },
      { id: 'api-design', slug: 'api-design', name: 'API Design', description: 'REST, GraphQL, versioning, rate limiting.', knowledgePoints: [] },
      { id: 'cap-theorem', slug: 'cap-theorem', name: 'CAP Theorem', description: 'Consistency, availability, partition tolerance.', knowledgePoints: [] },
      { id: 'storage', slug: 'storage', name: 'Storage Systems', description: 'Object storage, blob storage, file systems.', knowledgePoints: [] },
      { id: 'case-studies', slug: 'case-studies', name: 'Real-World Case Studies', description: 'Design of Twitter, Netflix, Uber systems.', knowledgePoints: [] },
    ]
  },
  {
    id: 'design-patterns',
    slug: 'design-patterns',
    name: 'Design Patterns',
    description: 'The 23 GoF patterns and modern architectural patterns for robust software.',
    category: 'software-engineering',
    icon: '🎨',
    color: '#EC4899',
    topicCount: 8,
    estimatedHours: 25,
    topics: [
      { id: 'creational', slug: 'creational', name: 'Creational Patterns', description: 'Singleton, Factory, Builder, Prototype.', knowledgePoints: [] },
      { id: 'structural', slug: 'structural', name: 'Structural Patterns', description: 'Adapter, Bridge, Composite, Decorator.', knowledgePoints: [] },
      { id: 'behavioral', slug: 'behavioral', name: 'Behavioral Patterns', description: 'Observer, Strategy, Command, State.', knowledgePoints: [] },
      { id: 'solid', slug: 'solid', name: 'SOLID Principles', description: 'Single responsibility, Open-closed, Liskov, Interface segregation, Dependency inversion.', knowledgePoints: [] },
      { id: 'react-patterns', slug: 'react-patterns', name: 'React Patterns', description: 'HOC, Render props, Custom hooks.', knowledgePoints: [] },
      { id: 'node-patterns', slug: 'node-patterns', name: 'Node.js Patterns', description: 'Middleware, Streams, Event emitter.', knowledgePoints: [] },
      { id: 'distributed', slug: 'distributed', name: 'Distributed Systems Patterns', description: 'Saga, CQRS, Event sourcing.', knowledgePoints: [] },
      { id: 'architecture', slug: 'architecture', name: 'Architecture Styles', description: 'Monolith, Microservices, Serverless, Event-driven.', knowledgePoints: [] },
    ]
  },
]
