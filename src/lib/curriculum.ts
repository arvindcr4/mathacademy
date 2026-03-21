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
          { id: 'kp-27', slug: 'bellman-recursion', name: 'Bellman Recursion & Bootstrapping' },
          { id: 'kp-28', slug: 'contraction-mapping', name: 'Contraction Mapping Theorem' },
          { id: 'kp-39', slug: 'optimal-policy-existence', name: 'Existence of Optimal Policies' },
          { id: 'kp-40', slug: 'bellman-operator', name: 'Bellman Backup Operator (T operator)' },
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
          { id: 'kp-29', slug: 'dp-convergence', name: 'DP Convergence & Complexity' },
          { id: 'kp-30', slug: 'asynchronous-dp', name: 'Asynchronous Dynamic Programming' },
          { id: 'kp-41', slug: 'modified-policy-iteration', name: 'Modified Policy Iteration' },
          { id: 'kp-42', slug: 'tabular-vs-approximate', name: 'Tabular vs Approximate DP' },
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
          { id: 'kp-31', slug: 'first-visit-mc', name: 'First-Visit vs Every-Visit MC' },
          { id: 'kp-32', slug: 'importance-sampling', name: 'Importance Sampling in MC' },
          { id: 'kp-43', slug: 'weighted-importance-sampling', name: 'Weighted Importance Sampling' },
          { id: 'kp-44', slug: 'glie', name: 'GLIE: Greedy in the Limit of Exploration' },
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
          { id: 'kp-33', slug: 'target-networks', name: 'Target Networks & Stability' },
          { id: 'kp-34', slug: 'double-dqn', name: 'Double DQN & Dueling Architecture' },
          { id: 'kp-45', slug: 'prioritized-replay', name: 'Prioritized Experience Replay' },
          { id: 'kp-46', slug: 'noisy-networks', name: 'Noisy Networks for Exploration' },
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
          { id: 'kp-35', slug: 'baseline-variance', name: 'Baseline & Variance Reduction' },
          { id: 'kp-36', slug: 'natural-policy-gradient', name: 'Natural Policy Gradient' },
          { id: 'kp-47', slug: 'trpo', name: 'Trust Region Policy Optimization (TRPO)' },
          { id: 'kp-48', slug: 'entropy-regularization', name: 'Entropy Regularization for Exploration' },
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
          { id: 'kp-37', slug: 'rainbow-dqn', name: 'Rainbow DQN' },
          { id: 'kp-38', slug: 'model-based-rl', name: 'Model-Based RL (MBPO, Dreamer)' },
          { id: 'kp-49', slug: 'alphago', name: 'AlphaGo & AlphaZero' },
          { id: 'kp-50', slug: 'hierarchical-rl', name: 'Hierarchical Reinforcement Learning' },
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
      { id: 'game-ai', slug: 'game-ai', name: 'Game Playing AI', description: 'Build agents that master Atari, Go, Chess, and more.', knowledgePoints: [
          { id: 'rl-app-kp-1', slug: 'game-tree-search', name: 'Game Tree Search' },
          { id: 'rl-app-kp-2', slug: 'minimax-alpha-beta', name: 'Minimax and Alpha-Beta Pruning' },
          { id: 'rl-app-kp-3', slug: 'monte-carlo-tree-search', name: 'Monte Carlo Tree Search (MCTS)' },
          { id: 'rl-app-kp-4', slug: 'dqn-atari', name: 'Deep Q-Networks for Atari' },
          { id: 'rl-app-kp-5', slug: 'alphago', name: 'AlphaGo and AlphaZero' },
        ] },
      { id: 'robotics', slug: 'robotics', name: 'Robotics Control', description: 'Apply RL to real-world robot control problems.', knowledgePoints: [
          { id: 'rl-app-kp-6', slug: 'robot-mdp', name: 'MDPs for Robot Control' },
          { id: 'rl-app-kp-7', slug: 'pid-control', name: 'PID Control' },
          { id: 'rl-app-kp-8', slug: 'motion-planning', name: 'Motion Planning with RL' },
          { id: 'rl-app-kp-9', slug: 'deep-rl-robotics', name: 'Deep RL for Robotics' },
          { id: 'rl-app-kp-10', slug: 'sim-to-real', name: 'Sim-to-Real Transfer' },
        ] },
      { id: 'nlp-rl', slug: 'nlp-rl', name: 'RL for NLP', description: 'RLHF, text generation, and dialogue systems.', knowledgePoints: [
          { id: 'rl-app-kp-11', slug: 'rlhf-intro', name: 'Reinforcement Learning from Human Feedback (RLHF)' },
          { id: 'rl-app-kp-12', slug: 'reward-modeling-nlp', name: 'Reward Modeling for NLP' },
          { id: 'rl-app-kp-13', slug: 'ppo-nlp', name: 'PPO for Text Generation' },
          { id: 'rl-app-kp-14', slug: 'dpo-nlp', name: 'Direct Preference Optimization (DPO)' },
          { id: 'rl-app-kp-15', slug: 'dialogue-systems', name: 'Dialogue Systems with RL' },
        ] },
      { id: 'recommendation', slug: 'recommendation', name: 'Recommendation Systems', description: 'Apply RL to dynamic recommendation problems.', knowledgePoints: [
          { id: 'rl-app-kp-16', slug: 'contextual-bandits', name: 'Contextual Bandits' },
          { id: 'rl-app-kp-17', slug: 'exploration-exploitation', name: 'Exploration-Exploitation Trade-off' },
          { id: 'rl-app-kp-18', slug: 'slate-recommendation', name: 'Slate Recommendation' },
          { id: 'rl-app-kp-19', slug: 'sequential-recommendation', name: 'Sequential Recommendation' },
          { id: 'rl-app-kp-20', slug: 'multi-armed-bandits-recommendation', name: 'Multi-Armed Bandits for Recommendations' },
        ] },
      { id: 'finance', slug: 'finance', name: 'RL in Finance', description: 'Trading strategies and portfolio optimization with RL.', knowledgePoints: [
          { id: 'rl-app-kp-21', slug: 'stock-trading-rl', name: 'Stock Trading with RL' },
          { id: 'rl-app-kp-22', slug: 'portfolio-optimization', name: 'Portfolio Optimization' },
          { id: 'rl-app-kp-23', slug: 'risk-management', name: 'Risk Management with RL' },
          { id: 'rl-app-kp-24', slug: 'options-pricing', name: 'Options Pricing' },
          { id: 'rl-app-kp-25', slug: 'cryptocurrency-trading', name: 'Cryptocurrency Trading' },
        ] },
      { id: 'healthcare', slug: 'healthcare', name: 'Healthcare Applications', description: 'Treatment optimization and medical decision making.', knowledgePoints: [
          { id: 'rl-app-kp-26', slug: 'treatment-optimization', name: 'Treatment Optimization' },
          { id: 'rl-app-kp-27', slug: 'dynamic-treatment-regimes', name: 'Dynamic Treatment Regimes' },
          { id: 'rl-app-kp-28', slug: 'medical-imaging-rl', name: 'Medical Imaging with RL' },
          { id: 'rl-app-kp-29', slug: 'drug-discovery', name: 'Drug Discovery with RL' },
          { id: 'rl-app-kp-30', slug: 'icu-monitoring', name: 'ICU Monitoring' },
        ] },
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
          { id: 'ft-kp-30', slug: 'when-to-finetune', name: 'When to Fine-Tune vs Prompt Engineer' },
          { id: 'ft-kp-31', slug: 'finetune-cost-benefit', name: 'Cost-Benefit Analysis of Fine-Tuning' },
          { id: 'ft-kp-51', slug: 'foundation-model-landscape', name: 'Foundation Model Landscape (Open vs Closed)' },
          { id: 'ft-kp-52', slug: 'task-specific-vs-general', name: 'Task-Specific vs General Fine-Tuning' },
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
          { id: 'ft-kp-32', slug: 'lora-rank-selection', name: 'Choosing LoRA Rank & Alpha' },
          { id: 'ft-kp-33', slug: 'lora-merge', name: 'Merging LoRA Weights into Base Model' },
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
          { id: 'ft-kp-34', slug: 'double-quantization', name: 'Double Quantization & Paged Optimizers' },
          { id: 'ft-kp-35', slug: 'bnb-setup', name: 'BitsAndBytes Setup & Configuration' },
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
          { id: 'ft-kp-36', slug: 'mixed-precision-training', name: 'Mixed Precision Training (bf16/fp16)' },
          { id: 'ft-kp-37', slug: 'optimizer-selection', name: 'Optimizer Selection (AdamW, Lion, SGD)' },
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
          { id: 'ft-kp-38', slug: 'alpaca-format', name: 'Alpaca & ShareGPT Formats' },
          { id: 'ft-kp-39', slug: 'dataset-deduplication', name: 'Dataset Deduplication Strategies' },
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
          { id: 'ft-kp-18', slug: 'llm-judges', name: 'LLM-as-a-Judge' },
          { id: 'ft-kp-40', slug: 'mt-bench', name: 'MT-Bench & AlpacaEval' },
          { id: 'ft-kp-41', slug: 'evals-suite', name: 'Open LLM Leaderboard Evals' },
          { id: 'ft-kp-53', slug: 'arena-eval', name: 'Chatbot Arena & ELO Rating' },
          { id: 'ft-kp-54', slug: 'contamination-detection', name: 'Benchmark Contamination Detection' },
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
          { id: 'ft-kp-42', slug: 'constitutional-ai', name: 'Constitutional AI & RLAIF' },
          { id: 'ft-kp-43', slug: 'kl-penalty', name: 'KL Divergence Penalty & Reference Model' },
          { id: 'ft-kp-55', slug: 'orpo', name: 'ORPO: Odds Ratio Preference Optimization' },
          { id: 'ft-kp-56', slug: 'simpo', name: 'SimPO: Simple Preference Optimization' },
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
          { id: 'ft-kp-44', slug: 'continual-learning', name: 'Continual Learning Strategies' },
          { id: 'ft-kp-45', slug: 'domain-pretraining', name: 'Domain-Adaptive Pre-training' },
          { id: 'ft-kp-46', slug: 'few-shot-adaptation', name: 'Few-Shot Domain Adaptation' },
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
          { id: 'ft-kp-47', slug: 'ia3-method', name: 'IA³ (Infused Adapter by Inhibiting and Amplifying)' },
          { id: 'ft-kp-48', slug: 'vera-method', name: 'VeRA: Vector-based Random Matrix Adaptation' },
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
          { id: 'ft-kp-49', slug: 'vllm-serving', name: 'vLLM & PagedAttention for Serving' },
          { id: 'ft-kp-50', slug: 'quantization-inference', name: 'Quantization for Inference (AWQ, GPTQ)' },
          { id: 'ft-kp-57', slug: 'model-pruning', name: 'Model Pruning for Production' },
          { id: 'ft-kp-58', slug: 'knowledge-distillation', name: 'Knowledge Distillation' },
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
          { id: 'oc-kp-30', slug: 'vs-verl-oat', name: 'OpenClaw-RL vs VeRL vs OAT' },
          { id: 'oc-kp-31', slug: 'personalization-loop', name: 'Personalization Feedback Loop' },
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
          { id: 'oc-kp-32', slug: 'turn-level-rewards', name: 'Turn-Level Reward Assignment' },
          { id: 'oc-kp-33', slug: 'kl-regularization', name: 'KL Regularization in Binary RL' },
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
          { id: 'oc-kp-34', slug: 'hindsight-replay', name: 'Hindsight Experience Replay for OPD' },
          { id: 'oc-kp-35', slug: 'jsd-divergence', name: 'JSD vs KL Divergence in Distillation' },
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
          { id: 'oc-kp-36', slug: 'loss-weighting', name: 'Loss Weighting Between Binary RL & OPD' },
          { id: 'oc-kp-37', slug: 'curriculum-mixing', name: 'Curriculum Mixing Strategies' },
          { id: 'oc-kp-38', slug: 'ablation-study', name: 'Ablation Study: Binary RL vs OPD vs Combined' },
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
          { id: 'oc-kp-39', slug: 'lora-target-modules', name: 'Target Modules Selection for RL' },
          { id: 'oc-kp-40', slug: 'lora-warmup', name: 'LoRA Warmup & Stability Tricks' },
          { id: 'oc-kp-41', slug: 'lora-rank-rl', name: 'Rank Selection for RL Fine-Tuning' },
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
          { id: 'oc-kp-42', slug: 'async-rollout-buffer', name: 'Async Rollout Buffer Design' },
          { id: 'oc-kp-43', slug: 'rejection-sampling-rl', name: 'Rejection Sampling in Rollout Collection' },
          { id: 'oc-kp-44', slug: 'trajectory-filtering', name: 'Trajectory Filtering & Quality Control' },
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
          { id: 'oc-kp-45', slug: 'scoring-rubric', name: 'Scoring Rubric Design for PRM' },
          { id: 'oc-kp-46', slug: 'judge-calibration', name: 'Judge Calibration & Agreement Metrics' },
          { id: 'oc-kp-47', slug: 'multi-judge-ensemble', name: 'Multi-Judge Ensemble Scoring' },
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
          { id: 'oc-kp-48', slug: 'gpu-scheduling', name: 'GPU Scheduling & Resource Allocation' },
          { id: 'oc-kp-49', slug: 'checkpoint-management', name: 'Checkpoint Management & Recovery' },
          { id: 'oc-kp-50', slug: 'cost-optimization', name: 'Training Cost Optimization' },
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
          { id: 'oc-kp-51', slug: 'grpo-vs-ppo-comparison', name: 'GRPO vs PPO: Tradeoffs' },
          { id: 'oc-kp-52', slug: 'reward-shaping', name: 'Reward Shaping for Agentic Tasks' },
          { id: 'oc-kp-53', slug: 'curiosity-driven-rl', name: 'Curiosity-Driven Exploration' },
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
          { id: 'oc-kp-54', slug: 'success-rate-eval', name: 'Success Rate & Task Completion Metrics' },
          { id: 'oc-kp-55', slug: 'length-penalty', name: 'Length Penalty & Efficiency Metrics' },
          { id: 'oc-kp-56', slug: 'human-eval-protocol', name: 'Human Evaluation Protocol' },
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
          { id: 'oc-kp-57', slug: 'model-sharding', name: 'Model Sharding & Pipeline Parallelism' },
          { id: 'oc-kp-58', slug: 'inference-optimization', name: 'Inference Optimization Techniques' },
          { id: 'oc-kp-59', slug: 'production-monitoring', name: 'Production Monitoring & Drift Detection' },
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
      { id: 'arrays', slug: 'arrays', name: 'Arrays & Strings', description: 'Foundational array manipulation and string algorithms.', knowledgePoints: [
          { id: 'ci-kp-1', slug: 'two-sum', name: 'Two Sum' },
          { id: 'ci-kp-2', slug: 'maximum-subarray', name: 'Maximum Subarray (Kadane\'s Algorithm)' },
          { id: 'ci-kp-3', slug: 'product-except-self', name: 'Product of Array Except Self' },
          { id: 'ci-kp-4', slug: 'rotate-array', name: 'Rotate Array' },
          { id: 'ci-kp-5', slug: 'contains-duplicate', name: 'Contains Duplicate' },
          { id: 'ci-kp-6', slug: 'longest-common-prefix', name: 'Longest Common Prefix' },
          { id: 'ci-kp-7', slug: 'valid-parentheses', name: 'Valid Parentheses' },
        ] },
      { id: 'linked-lists', slug: 'linked-lists', name: 'Linked Lists', description: 'Singly, doubly, and circular linked lists.', knowledgePoints: [
          { id: 'ci-kp-8', slug: 'reverse-linked-list', name: 'Reverse Linked List' },
          { id: 'ci-kp-9', slug: 'detect-cycle', name: 'Detect Cycle (Floyd\'s Algorithm)' },
          { id: 'ci-kp-10', slug: 'merge-sorted-lists', name: 'Merge Two Sorted Lists' },
          { id: 'ci-kp-11', slug: 'remove-nth-node', name: 'Remove Nth Node From End' },
          { id: 'ci-kp-12', slug: 'palindrome-linked-list', name: 'Palindrome Linked List' },
          { id: 'ci-kp-13', slug: 'linked-list-cycle-ii', name: 'Linked List Cycle II' },
        ] },
      { id: 'stacks-queues', slug: 'stacks-queues', name: 'Stacks & Queues', description: 'LIFO and FIFO data structures.', knowledgePoints: [
          { id: 'ci-kp-14', slug: 'balanced-parentheses', name: 'Balanced Parentheses' },
          { id: 'ci-kp-15', slug: 'min-stack', name: 'Min Stack' },
          { id: 'ci-kp-16', slug: 'implement-queue', name: 'Implement Queue with Two Stacks' },
          { id: 'ci-kp-17', slug: 'stack-using-queues', name: 'Implement Stack using Queues' },
          { id: 'ci-kp-18', slug: 'next-greater-element', name: 'Next Greater Element' },
        ] },
      { id: 'trees', slug: 'trees', name: 'Trees & Graphs', description: 'Binary trees, BSTs, tries, and graph algorithms.', knowledgePoints: [
          { id: 'ci-kp-19', slug: 'binary-tree-inorder', name: 'Binary Tree Inorder Traversal' },
          { id: 'ci-kp-20', slug: 'binary-tree-level-order', name: 'Binary Tree Level Order Traversal' },
          { id: 'ci-kp-21', slug: 'validate-bst', name: 'Validate Binary Search Tree' },
          { id: 'ci-kp-22', slug: 'lowest-common-ancestor', name: 'Lowest Common Ancestor' },
          { id: 'ci-kp-23', slug: 'insert-into-bst', name: 'Insert into BST' },
          { id: 'ci-kp-24', slug: 'trie-prefix-tree', name: 'Implement Trie (Prefix Tree)' },
          { id: 'ci-kp-25', slug: 'word-search-ii', name: 'Word Search II' },
        ] },
      { id: 'dynamic-programming-se', slug: 'dynamic-programming-se', name: 'Dynamic Programming', description: 'Memoization, tabulation, and DP patterns.', knowledgePoints: [
          { id: 'ci-kp-26', slug: 'climbing-stairs', name: 'Climbing Stairs' },
          { id: 'ci-kp-27', slug: 'coin-change', name: 'Coin Change' },
          { id: 'ci-kp-28', slug: 'longest-increasing-subsequence', name: 'Longest Increasing Subsequence' },
          { id: 'ci-kp-29', slug: 'longest-common-subsequence', name: 'Longest Common Subsequence' },
          { id: 'ci-kp-30', slug: 'edit-distance', name: 'Edit Distance' },
          { id: 'ci-kp-31', slug: 'house-robber', name: 'House Robber' },
          { id: 'ci-kp-32', slug: 'decode-ways', name: 'Decode Ways' },
          { id: 'ci-kp-33', slug: 'dp-0-1-knapsack', name: '0/1 Knapsack Problem' },
        ] },
      { id: 'sorting-searching', slug: 'sorting-searching', name: 'Sorting & Searching', description: 'Binary search, quicksort, mergesort, and more.', knowledgePoints: [
          { id: 'ci-kp-34', slug: 'binary-search', name: 'Binary Search' },
          { id: 'ci-kp-35', slug: 'search-rotated-array', name: 'Search in Rotated Sorted Array' },
          { id: 'ci-kp-36', slug: 'find-minimum-rotated', name: 'Find Minimum in Rotated Sorted Array' },
          { id: 'ci-kp-37', slug: 'merge-intervals', name: 'Merge Intervals' },
          { id: 'ci-kp-38', slug: 'median-of-two-arrays', name: 'Median of Two Sorted Arrays' },
          { id: 'ci-kp-39', slug: 'quickselect', name: 'Kth Largest Element (QuickSelect)' },
        ] },
      { id: 'hash-tables', slug: 'hash-tables', name: 'Hash Tables', description: 'Hashing, collision resolution, and applications.', knowledgePoints: [
          { id: 'ci-kp-40', slug: 'hash-map-implementation', name: 'Implement Hash Map' },
          { id: 'ci-kp-41', slug: 'hash-set-implementation', name: 'Implement Hash Set' },
          { id: 'ci-kp-42', slug: 'first-unique-char', name: 'First Unique Character' },
          { id: 'ci-kp-43', slug: 'group-anagrams', name: 'Group Anagrams' },
          { id: 'ci-kp-44', slug: 'valid-sudoku', name: 'Valid Sudoku' },
        ] },
      { id: 'recursion', slug: 'recursion', name: 'Recursion', description: 'Backtracking, divide & conquer, and recursion trees.', knowledgePoints: [
          { id: 'ci-kp-45', slug: 'fibonacci-number', name: 'Fibonacci Number' },
          { id: 'ci-kp-46', slug: 'power-of-two', name: 'Power of Two' },
          { id: 'ci-kp-47', slug: 'n-queens', name: 'N-Queens Problem' },
          { id: 'ci-kp-48', slug: 'subsets', name: 'Subsets' },
          { id: 'ci-kp-49', slug: 'permutations', name: 'Permutations' },
          { id: 'ci-kp-50', slug: 'combination-sum', name: 'Combination Sum' },
          { id: 'ci-kp-51', slug: 'subsets-ii', name: 'Subsets II' },
        ] },
      { id: 'bit-manipulation', slug: 'bit-manipulation', name: 'Bit Manipulation', description: 'Bit operations and tricks for interviews.', knowledgePoints: [
          { id: 'ci-kp-52', slug: 'bitwise-operations', name: 'Bitwise AND, OR, XOR, NOT' },
          { id: 'ci-kp-53', slug: 'counting-bits', name: 'Counting Bits' },
          { id: 'ci-kp-54', slug: 'reverse-bits', name: 'Reverse Bits' },
          { id: 'ci-kp-55', slug: 'single-number', name: 'Single Number (XOR Trick)' },
          { id: 'ci-kp-56', slug: 'power-of-three', name: 'Power of Three' },
        ] },
      { id: 'two-pointers', slug: 'two-pointers', name: 'Two Pointers', description: 'Classic two-pointer technique patterns.', knowledgePoints: [
          { id: 'ci-kp-57', slug: 'two-sum-ii', name: 'Two Sum II (Sorted Array)' },
          { id: 'ci-kp-58', slug: 'valid-palindrome', name: 'Valid Palindrome' },
          { id: 'ci-kp-59', slug: 'trapping-rain-water', name: 'Trapping Rain Water' },
          { id: 'ci-kp-60', slug: 'remove-duplicates-sorted', name: 'Remove Duplicates from Sorted Array' },
          { id: 'ci-kp-61', slug: 'container-with-most-water', name: 'Container With Most Water' },
        ] },
      { id: 'sliding-window', slug: 'sliding-window', name: 'Sliding Window', description: 'Fixed and variable window techniques.', knowledgePoints: [
          { id: 'ci-kp-62', slug: 'max-subarray-sum', name: 'Maximum Subarray Sum (Fixed Window)' },
          { id: 'ci-kp-63', slug: 'longest-substring-no-repeat', name: 'Longest Substring Without Repeating Characters' },
          { id: 'ci-kp-64', slug: 'minimum-window-substring', name: 'Minimum Window Substring' },
          { id: 'ci-kp-65', slug: 'find-all-anagrams', name: 'Find All Anagrams in a String' },
          { id: 'ci-kp-66', slug: 'sliding-window-maximum', name: 'Sliding Window Maximum' },
        ] },
      { id: 'graph-algorithms', slug: 'graph-algorithms', name: 'Graph Algorithms', description: 'BFS, DFS, Dijkstra, and Floyd-Warshall.', knowledgePoints: [
          { id: 'ci-kp-67', slug: 'graph-representation', name: 'Graph Representation (Adjacency List & Matrix)' },
          { id: 'ci-kp-68', slug: 'number-of-islands', name: 'Number of Islands' },
          { id: 'ci-kp-69', slug: 'clone-graph', name: 'Clone Graph' },
          { id: 'ci-kp-70', slug: 'course-schedule', name: 'Course Schedule (Topological Sort)' },
          { id: 'ci-kp-71', slug: 'dijkstra-algorithm', name: 'Dijkstra\'s Shortest Path' },
          { id: 'ci-kp-72', slug: 'floyd-warshall', name: 'Floyd-Warshall All-Pairs Shortest Path' },
          { id: 'ci-kp-73', slug: 'bellman-ford', name: 'Bellman-Ford Algorithm' },
        ] },
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
      { id: 'scalability', slug: 'scalability', name: 'Scalability Fundamentals', description: 'Horizontal vs vertical scaling, load balancing.', knowledgePoints: [
          { id: 'sd-kp-1', slug: 'vertical-vs-horizontal', name: 'Vertical vs Horizontal Scaling' },
          { id: 'sd-kp-2', slug: 'load-balancing', name: 'Load Balancing Strategies' },
          { id: 'sd-kp-3', slug: 'sharding', name: 'Data Sharding' },
          { id: 'sd-kp-4', slug: 'partitioning', name: 'Data Partitioning' },
          { id: 'sd-kp-5', slug: 'consistent-hashing', name: 'Consistent Hashing' },
        ] },
      { id: 'databases', slug: 'databases', name: 'Database Design', description: 'SQL vs NoSQL, sharding, replication.', knowledgePoints: [
          { id: 'sd-kp-6', slug: 'sql-vs-nosql', name: 'SQL vs NoSQL Trade-offs' },
          { id: 'sd-kp-7', slug: 'database-replication', name: 'Database Replication' },
          { id: 'sd-kp-8', slug: 'acid-properties', name: 'ACID Properties' },
          { id: 'sd-kp-9', slug: 'database-indexing', name: 'Database Indexing' },
          { id: 'sd-kp-10', slug: 'normalization', name: 'Normalization vs Denormalization' },
        ] },
      { id: 'caching', slug: 'caching', name: 'Caching Strategies', description: 'CDN, Redis, Memcached, cache patterns.', knowledgePoints: [
          { id: 'sd-kp-11', slug: 'cache-strategies', name: 'Cache Strategies (Write-through, Write-back)' },
          { id: 'sd-kp-12', slug: 'redis-datastructures', name: 'Redis Data Structures' },
          { id: 'sd-kp-13', slug: 'cache-eviction', name: 'Cache Eviction Policies (LRU, LFU, FIFO)' },
          { id: 'sd-kp-14', slug: 'cdn', name: 'Content Delivery Network (CDN)' },
          { id: 'sd-kp-15', slug: 'distributed-cache', name: 'Distributed Caching' },
        ] },
      { id: 'microservices', slug: 'microservices', name: 'Microservices', description: 'Service discovery, API gateway, communication patterns.', knowledgePoints: [
          { id: 'sd-kp-16', slug: 'monolith-vs-microservices', name: 'Monolith vs Microservices' },
          { id: 'sd-kp-17', slug: 'api-gateway', name: 'API Gateway Pattern' },
          { id: 'sd-kp-18', slug: 'service-discovery', name: 'Service Discovery' },
          { id: 'sd-kp-19', slug: 'circuit-breaker', name: 'Circuit Breaker Pattern' },
          { id: 'sd-kp-20', slug: 'service-mesh', name: 'Service Mesh' },
        ] },
      { id: 'message-queues', slug: 'message-queues', name: 'Message Queues', description: 'Kafka, RabbitMQ, pub/sub patterns.', knowledgePoints: [
          { id: 'sd-kp-21', slug: 'kafka-architecture', name: 'Kafka Architecture' },
          { id: 'sd-kp-22', slug: 'rabbitmq', name: 'RabbitMQ' },
          { id: 'sd-kp-23', slug: 'publish-subscribe', name: 'Publish/Subscribe Pattern' },
          { id: 'sd-kp-24', slug: 'event-sourcing', name: 'Event Sourcing' },
          { id: 'sd-kp-25', slug: 'message-delivery', name: 'Message Delivery Guarantees' },
        ] },
      { id: 'cdn', slug: 'cdn', name: 'CDN & DNS', description: 'Content delivery networks and DNS resolution.', knowledgePoints: [
          { id: 'sd-kp-26', slug: 'dns-resolution', name: 'DNS Resolution Process' },
          { id: 'sd-kp-27', slug: 'dns-records', name: 'DNS Record Types (A, CNAME, MX)' },
          { id: 'sd-kp-28', slug: 'cdn-workflow', name: 'How CDNs Work' },
          { id: 'sd-kp-29', slug: 'anycast', name: 'Anycast Routing' },
        ] },
      { id: 'api-design', slug: 'api-design', name: 'API Design', description: 'REST, GraphQL, versioning, rate limiting.', knowledgePoints: [
          { id: 'sd-kp-30', slug: 'rest-principles', name: 'REST API Principles' },
          { id: 'sd-kp-31', slug: 'graphql', name: 'GraphQL API' },
          { id: 'sd-kp-32', slug: 'api-versioning', name: 'API Versioning Strategies' },
          { id: 'sd-kp-33', slug: 'rate-limiting', name: 'Rate Limiting' },
          { id: 'sd-kp-34', slug: 'authentication', name: 'API Authentication (OAuth, JWT)' },
        ] },
      { id: 'cap-theorem', slug: 'cap-theorem', name: 'CAP Theorem', description: 'Consistency, availability, partition tolerance.', knowledgePoints: [
          { id: 'sd-kp-35', slug: 'cap-theorem-explained', name: 'CAP Theorem Explained' },
          { id: 'sd-kp-36', slug: 'eventual-consistency', name: 'Eventual Consistency' },
          { id: 'sd-kp-37', slug: 'strong-consistency', name: 'Strong Consistency Models' },
          { id: 'sd-kp-38', slug: 'pacelc-model', name: 'PACELC Model' },
        ] },
      { id: 'storage', slug: 'storage', name: 'Storage Systems', description: 'Object storage, blob storage, file systems.', knowledgePoints: [
          { id: 'sd-kp-39', slug: 'object-storage', name: 'Object Storage (S3)' },
          { id: 'sd-kp-40', slug: 'block-storage', name: 'Block Storage' },
          { id: 'sd-kp-41', slug: 'file-storage', name: 'File Storage (NAS)' },
          { id: 'sd-kp-42', slug: 'storage-comparison', name: 'Storage Type Comparison' },
        ] },
      { id: 'case-studies', slug: 'case-studies', name: 'Real-World Case Studies', description: 'Design of Twitter, Netflix, Uber systems.', knowledgePoints: [
          { id: 'sd-kp-43', slug: 'design-twitter', name: 'Design Twitter' },
          { id: 'sd-kp-44', slug: 'design-netflix', name: 'Design Netflix' },
          { id: 'sd-kp-45', slug: 'design-uber', name: 'Design Uber' },
          { id: 'sd-kp-46', slug: 'design-youtube', name: 'Design YouTube' },
          { id: 'sd-kp-47', slug: 'design-url-shortener', name: 'Design URL Shortener' },
        ] },
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
      { id: 'creational', slug: 'creational', name: 'Creational Patterns', description: 'Singleton, Factory, Builder, Prototype.', knowledgePoints: [
          { id: 'dp-kp-1', slug: 'singleton-pattern', name: 'Singleton Pattern' },
          { id: 'dp-kp-2', slug: 'factory-method', name: 'Factory Method' },
          { id: 'dp-kp-3', slug: 'abstract-factory', name: 'Abstract Factory' },
          { id: 'dp-kp-4', slug: 'builder-pattern', name: 'Builder Pattern' },
          { id: 'dp-kp-5', slug: 'prototype-pattern', name: 'Prototype Pattern' },
        ] },
      { id: 'structural', slug: 'structural', name: 'Structural Patterns', description: 'Adapter, Bridge, Composite, Decorator.', knowledgePoints: [
          { id: 'dp-kp-6', slug: 'adapter-pattern', name: 'Adapter Pattern' },
          { id: 'dp-kp-7', slug: 'bridge-pattern', name: 'Bridge Pattern' },
          { id: 'dp-kp-8', slug: 'composite-pattern', name: 'Composite Pattern' },
          { id: 'dp-kp-9', slug: 'decorator-pattern', name: 'Decorator Pattern' },
          { id: 'dp-kp-10', slug: 'facade-pattern', name: 'Facade Pattern' },
          { id: 'dp-kp-11', slug: 'flyweight-pattern', name: 'Flyweight Pattern' },
        ] },
      { id: 'behavioral', slug: 'behavioral', name: 'Behavioral Patterns', description: 'Observer, Strategy, Command, State.', knowledgePoints: [
          { id: 'dp-kp-12', slug: 'observer-pattern', name: 'Observer Pattern' },
          { id: 'dp-kp-13', slug: 'strategy-pattern', name: 'Strategy Pattern' },
          { id: 'dp-kp-14', slug: 'command-pattern', name: 'Command Pattern' },
          { id: 'dp-kp-15', slug: 'state-pattern', name: 'State Pattern' },
          { id: 'dp-kp-16', slug: 'iterator-pattern', name: 'Iterator Pattern' },
          { id: 'dp-kp-17', slug: 'visitor-pattern', name: 'Visitor Pattern' },
          { id: 'dp-kp-18', slug: 'mediator-pattern', name: 'Mediator Pattern' },
        ] },
      { id: 'solid', slug: 'solid', name: 'SOLID Principles', description: 'Single responsibility, Open-closed, Liskov, Interface segregation, Dependency inversion.', knowledgePoints: [
          { id: 'dp-kp-19', slug: 'single-responsibility', name: 'Single Responsibility Principle' },
          { id: 'dp-kp-20', slug: 'open-closed', name: 'Open-Closed Principle' },
          { id: 'dp-kp-21', slug: 'liskov-substitution', name: 'Liskov Substitution Principle' },
          { id: 'dp-kp-22', slug: 'interface-segregation', name: 'Interface Segregation Principle' },
          { id: 'dp-kp-23', slug: 'dependency-inversion', name: 'Dependency Inversion Principle' },
        ] },
      { id: 'react-patterns', slug: 'react-patterns', name: 'React Patterns', description: 'HOC, Render props, Custom hooks.', knowledgePoints: [
          { id: 'dp-kp-24', slug: 'higher-order-components', name: 'Higher-Order Components (HOC)' },
          { id: 'dp-kp-25', slug: 'render-props', name: 'Render Props Pattern' },
          { id: 'dp-kp-26', slug: 'custom-hooks', name: 'Custom Hooks' },
          { id: 'dp-kp-27', slug: 'compound-components', name: 'Compound Components' },
          { id: 'dp-kp-28', slug: 'controlled-uncontrolled', name: 'Controlled vs Uncontrolled Components' },
        ] },
      { id: 'node-patterns', slug: 'node-patterns', name: 'Node.js Patterns', description: 'Middleware, Streams, Event emitter.', knowledgePoints: [
          { id: 'dp-kp-29', slug: 'middleware-pattern', name: 'Middleware Pattern' },
          { id: 'dp-kp-30', slug: 'streams-pattern', name: 'Streams Pattern' },
          { id: 'dp-kp-31', slug: 'event-emitter', name: 'Event Emitter Pattern' },
          { id: 'dp-kp-32', slug: 'module-pattern', name: 'Module Pattern' },
          { id: 'dp-kp-33', slug: 'callback-pattern', name: 'Callback Pattern' },
        ] },
      { id: 'distributed', slug: 'distributed', name: 'Distributed Systems Patterns', description: 'Saga, CQRS, Event sourcing.', knowledgePoints: [
          { id: 'dp-kp-34', slug: 'saga-pattern', name: 'Saga Pattern' },
          { id: 'dp-kp-35', slug: 'cqrs-pattern', name: 'CQRS Pattern' },
          { id: 'dp-kp-36', slug: 'event-sourcing', name: 'Event Sourcing' },
          { id: 'dp-kp-37', slug: 'two-phase-commit', name: 'Two-Phase Commit' },
          { id: 'dp-kp-38', slug: 'leader-election', name: 'Leader Election' },
        ] },
      { id: 'architecture', slug: 'architecture', name: 'Architecture Styles', description: 'Monolith, Microservices, Serverless, Event-driven.', knowledgePoints: [
          { id: 'dp-kp-39', slug: 'monolith-architecture', name: 'Monolith Architecture' },
          { id: 'dp-kp-40', slug: 'microservices-architecture', name: 'Microservices Architecture' },
          { id: 'dp-kp-41', slug: 'serverless-architecture', name: 'Serverless Architecture' },
          { id: 'dp-kp-42', slug: 'event-driven-architecture', name: 'Event-Driven Architecture' },
          { id: 'dp-kp-43', slug: 'hexagonal-architecture', name: 'Hexagonal Architecture' },
        ] },
    ]
  },

  // MATHEMATICS FOR ML
  {
    id: 'math-for-ml',
    slug: 'math-for-ml',
    name: 'Mathematics for ML',
    description: 'Build the mathematical foundations essential for understanding machine learning: linear algebra, calculus, probability, and optimization.',
    category: 'fine-tuning',
    icon: '📐',
    color: '#6366F1',
    topicCount: 6,
    estimatedHours: 30,
    topics: [
      {
        id: 'linear-algebra',
        slug: 'linear-algebra',
        name: 'Linear Algebra for ML',
        description: 'Vectors, matrices, and operations that underpin neural networks.',
        knowledgePoints: [
          { id: 'ml-kp-1', slug: 'vectors-matrices', name: 'Vectors and Matrices' },
          { id: 'ml-kp-2', slug: 'matrix-multiplication', name: 'Matrix Multiplication' },
          { id: 'ml-kp-3', slug: 'eigenvalues-eigenvectors', name: 'Eigenvalues & Eigenvectors' },
          { id: 'ml-kp-4', slug: 'svd', name: 'Singular Value Decomposition (SVD)' },
          { id: 'ml-kp-5', slug: 'pca-linear-algebra', name: 'PCA via Linear Algebra' },
        ]
      },
      {
        id: 'calculus-optimization',
        slug: 'calculus-optimization',
        name: 'Calculus & Optimization',
        description: 'Derivatives, gradients, and optimization algorithms for training models.',
        knowledgePoints: [
          { id: 'ml-kp-6', slug: 'derivatives-chain-rule', name: 'Derivatives & Chain Rule' },
          { id: 'ml-kp-7', slug: 'partial-derivatives', name: 'Partial Derivatives & Gradients' },
          { id: 'ml-kp-8', slug: 'gradient-descent', name: 'Gradient Descent Variants' },
          { id: 'ml-kp-9', slug: 'second-order-methods', name: 'Second-Order Optimization Methods' },
          { id: 'ml-kp-10', slug: 'convexity', name: 'Convexity & Local vs Global Minima' },
        ]
      },
      {
        id: 'probability-stats',
        slug: 'probability-stats',
        name: 'Probability & Statistics',
        description: 'Probabilistic reasoning, distributions, and statistical inference for ML.',
        knowledgePoints: [
          { id: 'ml-kp-11', slug: 'probability-basics', name: 'Probability Basics & Bayes Theorem' },
          { id: 'ml-kp-12', slug: 'distributions', name: 'Common Probability Distributions' },
          { id: 'ml-kp-13', slug: 'mle-map', name: 'MLE and MAP Estimation' },
          { id: 'ml-kp-14', slug: 'hypothesis-testing', name: 'Hypothesis Testing & p-values' },
          { id: 'ml-kp-15', slug: 'central-limit-theorem', name: 'Central Limit Theorem' },
        ]
      },
      {
        id: 'information-theory',
        slug: 'information-theory',
        name: 'Information Theory',
        description: 'Entropy, mutual information, and KL divergence as tools for ML.',
        knowledgePoints: [
          { id: 'ml-kp-16', slug: 'entropy', name: 'Shannon Entropy' },
          { id: 'ml-kp-17', slug: 'cross-entropy', name: 'Cross-Entropy Loss' },
          { id: 'ml-kp-18', slug: 'kl-divergence', name: 'KL Divergence' },
          { id: 'ml-kp-19', slug: 'mutual-information', name: 'Mutual Information' },
          { id: 'ml-kp-20', slug: 'information-bottleneck', name: 'Information Bottleneck Principle' },
        ]
      },
      {
        id: 'numerical-methods',
        slug: 'numerical-methods',
        name: 'Numerical Methods',
        description: 'Numerical stability, floating-point arithmetic, and computational efficiency.',
        knowledgePoints: [
          { id: 'ml-kp-21', slug: 'floating-point', name: 'Floating-Point Arithmetic & Precision' },
          { id: 'ml-kp-22', slug: 'numerical-stability', name: 'Numerical Stability in Deep Learning' },
          { id: 'ml-kp-23', slug: 'finite-differences', name: 'Finite Differences & Gradient Checking' },
          { id: 'ml-kp-24', slug: 'matrix-decomposition', name: 'Matrix Decompositions (LU, QR, Cholesky)' },
          { id: 'ml-kp-25', slug: 'sparse-representations', name: 'Sparse Representations & Compression' },
        ]
      },
      {
        id: 'graph-theory-ml',
        slug: 'graph-theory-ml',
        name: 'Graph Theory for ML',
        description: 'Graph structures, GNNs, and applications in ML.',
        knowledgePoints: [
          { id: 'ml-kp-26', slug: 'graph-basics', name: 'Graph Basics & Representations' },
          { id: 'ml-kp-27', slug: 'spectral-graph-theory', name: 'Spectral Graph Theory' },
          { id: 'ml-kp-28', slug: 'graph-neural-networks', name: 'Graph Neural Networks (GNNs)' },
          { id: 'ml-kp-29', slug: 'message-passing', name: 'Message Passing Framework' },
          { id: 'ml-kp-30', slug: 'knowledge-graphs', name: 'Knowledge Graphs & Embeddings' },
        ]
      },
    ]
  },

  // RLHF & ALIGNMENT
  {
    id: 'rlhf-alignment',
    slug: 'rlhf-alignment',
    name: 'RLHF & LLM Alignment',
    description: 'Master reinforcement learning from human feedback: preference learning, reward modeling, and modern alignment techniques.',
    category: 'reinforcement-learning',
    icon: '🎯',
    color: '#F97316',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'alignment-basics',
        slug: 'alignment-basics',
        name: 'Alignment Problem Basics',
        description: 'Why LLM alignment matters and what the alignment tax means.',
        knowledgePoints: [
          { id: 'al-kp-1', slug: 'alignment-problem', name: 'The Alignment Problem' },
          { id: 'al-kp-2', slug: 'helpful-harmless-honest', name: 'Helpful, Harmless & Honest (HHH)' },
          { id: 'al-kp-3', slug: 'sycophancy', name: 'Sycophancy & Reward Hacking' },
          { id: 'al-kp-4', slug: 'alignment-tax', name: 'Alignment Tax' },
          { id: 'al-kp-5', slug: 'goodhart-law', name: 'Goodhart\'s Law in ML' },
        ]
      },
      {
        id: 'preference-data',
        slug: 'preference-data',
        name: 'Preference Data Collection',
        description: 'Collect, annotate, and quality-control human preference data.',
        knowledgePoints: [
          { id: 'al-kp-6', slug: 'preference-pairs', name: 'Preference Pairs & Comparison Format' },
          { id: 'al-kp-7', slug: 'annotator-agreement', name: 'Inter-Annotator Agreement (Cohen\'s Kappa)' },
          { id: 'al-kp-8', slug: 'ranking-vs-rating', name: 'Ranking vs Rating Annotation' },
          { id: 'al-kp-9', slug: 'synthetic-preferences', name: 'Synthetic Preference Generation (GPT-4 Judge)' },
          { id: 'al-kp-10', slug: 'preference-datasets', name: 'Open Preference Datasets (HH, UltraFeedback)' },
        ]
      },
      {
        id: 'reward-model-training',
        slug: 'reward-model-training',
        name: 'Reward Model Training',
        description: 'Train reward models that capture human preferences.',
        knowledgePoints: [
          { id: 'al-kp-11', slug: 'rm-architecture', name: 'Reward Model Architecture' },
          { id: 'al-kp-12', slug: 'bradley-terry', name: 'Bradley-Terry Preference Model' },
          { id: 'al-kp-13', slug: 'rm-overfitting', name: 'Reward Model Overfitting' },
          { id: 'al-kp-14', slug: 'ensemble-rm', name: 'Ensemble Reward Models' },
          { id: 'al-kp-15', slug: 'process-vs-outcome', name: 'Process vs Outcome Reward Models' },
        ]
      },
      {
        id: 'ppo-rlhf',
        slug: 'ppo-rlhf',
        name: 'PPO for RLHF',
        description: 'Apply PPO to optimize LLMs against reward models.',
        knowledgePoints: [
          { id: 'al-kp-16', slug: 'rlhf-pipeline', name: 'Full RLHF Pipeline (SFT → RM → PPO)' },
          { id: 'al-kp-17', slug: 'ppo-clip', name: 'PPO Clip Objective for LLMs' },
          { id: 'al-kp-18', slug: 'value-head', name: 'Value Head in RLHF Models' },
          { id: 'al-kp-19', slug: 'kl-controller', name: 'Adaptive KL Controller' },
          { id: 'al-kp-20', slug: 'rlhf-instability', name: 'RLHF Training Instabilities' },
        ]
      },
      {
        id: 'direct-alignment',
        slug: 'direct-alignment',
        name: 'Direct Alignment Methods',
        description: 'DPO, IPO, and other RM-free alignment approaches.',
        knowledgePoints: [
          { id: 'al-kp-21', slug: 'dpo-derivation', name: 'DPO: Mathematical Derivation' },
          { id: 'al-kp-22', slug: 'ipo', name: 'IPO: Identity Preference Optimization' },
          { id: 'al-kp-23', slug: 'kto', name: 'KTO: Kahneman-Tversky Optimization' },
          { id: 'al-kp-24', slug: 'rpo', name: 'RPO: Robust Preference Optimization' },
          { id: 'al-kp-25', slug: 'dpo-vs-ppo', name: 'DPO vs PPO: When to Use Which' },
        ]
      },
      {
        id: 'advanced-alignment',
        slug: 'advanced-alignment',
        name: 'Advanced Alignment Techniques',
        description: 'Scalable oversight, debate, and amplification approaches.',
        knowledgePoints: [
          { id: 'al-kp-26', slug: 'scalable-oversight', name: 'Scalable Oversight & Weak-to-Strong' },
          { id: 'al-kp-27', slug: 'ai-debate', name: 'AI Debate for Alignment' },
          { id: 'al-kp-28', slug: 'iterated-amplification', name: 'Iterated Amplification' },
          { id: 'al-kp-29', slug: 'superalignment', name: 'Superalignment Research Directions' },
          { id: 'al-kp-30', slug: 'red-teaming', name: 'Red-Teaming & Adversarial Testing' },
        ]
      },
    ]
  },

  // NATURAL LANGUAGE PROCESSING
  {
    id: 'nlp-fundamentals',
    slug: 'nlp-fundamentals',
    name: 'Natural Language Processing',
    description: 'From text preprocessing to modern NLP: embeddings, sequence models, and applied NLP tasks.',
    category: 'fine-tuning',
    icon: '📝',
    color: '#22C55E',
    topicCount: 6,
    estimatedHours: 28,
    topics: [
      {
        id: 'text-preprocessing',
        slug: 'text-preprocessing',
        name: 'Text Preprocessing',
        description: 'Clean, tokenize, and normalize text for NLP pipelines.',
        knowledgePoints: [
          { id: 'nlp-kp-1', slug: 'tokenization-nlp', name: 'Tokenization Strategies' },
          { id: 'nlp-kp-2', slug: 'stemming-lemmatization', name: 'Stemming & Lemmatization' },
          { id: 'nlp-kp-3', slug: 'stop-words', name: 'Stop Word Removal & Text Normalization' },
          { id: 'nlp-kp-4', slug: 'regex-nlp', name: 'Regular Expressions for NLP' },
          { id: 'nlp-kp-5', slug: 'text-cleaning', name: 'Text Cleaning & Unicode Handling' },
        ]
      },
      {
        id: 'word-embeddings',
        slug: 'word-embeddings',
        name: 'Word Embeddings',
        description: 'Represent words as dense vectors capturing semantic meaning.',
        knowledgePoints: [
          { id: 'nlp-kp-6', slug: 'word2vec', name: 'Word2Vec (CBOW & Skip-gram)' },
          { id: 'nlp-kp-7', slug: 'glove', name: 'GloVe: Global Vectors for Word Representation' },
          { id: 'nlp-kp-8', slug: 'fasttext', name: 'FastText & Subword Embeddings' },
          { id: 'nlp-kp-9', slug: 'contextual-embeddings', name: 'Contextual Embeddings (BERT, ELMo)' },
          { id: 'nlp-kp-10', slug: 'sentence-embeddings', name: 'Sentence Embeddings (SBERT, E5)' },
        ]
      },
      {
        id: 'sequence-classification',
        slug: 'sequence-classification',
        name: 'Text Classification & Sentiment',
        description: 'Classify text into categories using classical and deep learning approaches.',
        knowledgePoints: [
          { id: 'nlp-kp-11', slug: 'naive-bayes-text', name: 'Naive Bayes for Text Classification' },
          { id: 'nlp-kp-12', slug: 'tfidf', name: 'TF-IDF Weighting' },
          { id: 'nlp-kp-13', slug: 'bert-classification', name: 'BERT for Sequence Classification' },
          { id: 'nlp-kp-14', slug: 'zero-shot-classification', name: 'Zero-Shot Text Classification' },
          { id: 'nlp-kp-15', slug: 'sentiment-analysis', name: 'Sentiment Analysis & Opinion Mining' },
        ]
      },
      {
        id: 'named-entity-recognition',
        slug: 'named-entity-recognition',
        name: 'Named Entity Recognition',
        description: 'Identify and classify named entities in text.',
        knowledgePoints: [
          { id: 'nlp-kp-16', slug: 'ner-basics', name: 'NER: People, Orgs, Locations' },
          { id: 'nlp-kp-17', slug: 'bio-tagging', name: 'BIO/BIOES Tagging Scheme' },
          { id: 'nlp-kp-18', slug: 'crf-ner', name: 'Conditional Random Fields (CRF) for NER' },
          { id: 'nlp-kp-19', slug: 'bert-ner', name: 'BERT-Based NER' },
          { id: 'nlp-kp-20', slug: 'relation-extraction', name: 'Relation Extraction' },
        ]
      },
      {
        id: 'machine-translation',
        slug: 'machine-translation',
        name: 'Machine Translation',
        description: 'Translate text between languages with neural machine translation.',
        knowledgePoints: [
          { id: 'nlp-kp-21', slug: 'seq2seq-mt', name: 'Sequence-to-Sequence MT' },
          { id: 'nlp-kp-22', slug: 'attention-mt', name: 'Attention Mechanism in MT' },
          { id: 'nlp-kp-23', slug: 'transformer-mt', name: 'Transformer-Based MT' },
          { id: 'nlp-kp-24', slug: 'bleu-score', name: 'BLEU Score & MT Evaluation' },
          { id: 'nlp-kp-25', slug: 'low-resource-mt', name: 'Low-Resource Machine Translation' },
        ]
      },
      {
        id: 'question-answering',
        slug: 'question-answering',
        name: 'Question Answering & Summarization',
        description: 'Extract answers and summarize long texts with neural models.',
        knowledgePoints: [
          { id: 'nlp-kp-26', slug: 'extractive-qa', name: 'Extractive QA (SQuAD-style)' },
          { id: 'nlp-kp-27', slug: 'abstractive-qa', name: 'Abstractive QA with LLMs' },
          { id: 'nlp-kp-28', slug: 'open-domain-qa', name: 'Open-Domain QA with Retrieval' },
          { id: 'nlp-kp-29', slug: 'extractive-summarization', name: 'Extractive Summarization' },
          { id: 'nlp-kp-30', slug: 'abstractive-summarization', name: 'Abstractive Summarization (BART, T5)' },
        ]
      },
    ]
  },

  // COMPUTER VISION
  {
    id: 'computer-vision',
    slug: 'computer-vision',
    name: 'Computer Vision',
    description: 'From classical image processing to diffusion models: master the full computer vision stack.',
    category: 'fine-tuning',
    icon: '👁️',
    color: '#0EA5E9',
    topicCount: 6,
    estimatedHours: 32,
    topics: [
      {
        id: 'image-fundamentals',
        slug: 'image-fundamentals',
        name: 'Image Fundamentals',
        description: 'Pixels, color spaces, and classical image processing operations.',
        knowledgePoints: [
          { id: 'cv-kp-1', slug: 'pixel-representation', name: 'Pixel Representation & Color Spaces' },
          { id: 'cv-kp-2', slug: 'image-filtering', name: 'Image Filtering & Convolution' },
          { id: 'cv-kp-3', slug: 'edge-detection', name: 'Edge Detection (Sobel, Canny)' },
          { id: 'cv-kp-4', slug: 'image-transforms', name: 'Fourier Transform for Images' },
          { id: 'cv-kp-5', slug: 'morphological-ops', name: 'Morphological Operations' },
        ]
      },
      {
        id: 'feature-extraction',
        slug: 'feature-extraction',
        name: 'Feature Extraction',
        description: 'Classical and learned feature extraction for visual recognition.',
        knowledgePoints: [
          { id: 'cv-kp-6', slug: 'sift-orb', name: 'SIFT & ORB Feature Descriptors' },
          { id: 'cv-kp-7', slug: 'hog-features', name: 'HOG Features' },
          { id: 'cv-kp-8', slug: 'feature-matching', name: 'Feature Matching & Homography' },
          { id: 'cv-kp-9', slug: 'bag-of-words-vision', name: 'Bag of Visual Words' },
          { id: 'cv-kp-10', slug: 'deep-features', name: 'Deep Feature Extraction from CNNs' },
        ]
      },
      {
        id: 'image-classification',
        slug: 'image-classification',
        name: 'Image Classification',
        description: 'Train and evaluate models for single and multi-label image classification.',
        knowledgePoints: [
          { id: 'cv-kp-11', slug: 'resnet', name: 'ResNet & Skip Connections' },
          { id: 'cv-kp-12', slug: 'efficientnet', name: 'EfficientNet & Neural Architecture Search' },
          { id: 'cv-kp-13', slug: 'vit', name: 'Vision Transformer (ViT)' },
          { id: 'cv-kp-14', slug: 'fine-tuning-vision', name: 'Fine-Tuning Vision Models' },
          { id: 'cv-kp-15', slug: 'class-activation-maps', name: 'Class Activation Maps (CAM, Grad-CAM)' },
        ]
      },
      {
        id: 'object-detection-seg',
        slug: 'object-detection-seg',
        name: 'Detection & Segmentation',
        description: 'Locate and segment objects within images at scale.',
        knowledgePoints: [
          { id: 'cv-kp-16', slug: 'yolo', name: 'YOLO Architecture Family' },
          { id: 'cv-kp-17', slug: 'anchor-free', name: 'Anchor-Free Detection (FCOS, CenterNet)' },
          { id: 'cv-kp-18', slug: 'instance-segmentation', name: 'Instance Segmentation (Mask R-CNN, SAM)' },
          { id: 'cv-kp-19', slug: 'semantic-segmentation', name: 'Semantic Segmentation (DeepLab, SegFormer)' },
          { id: 'cv-kp-20', slug: 'panoptic-segmentation', name: 'Panoptic Segmentation' },
        ]
      },
      {
        id: 'generative-vision',
        slug: 'generative-vision',
        name: 'Generative Vision Models',
        description: 'GANs, VAEs, and diffusion models for image generation.',
        knowledgePoints: [
          { id: 'cv-kp-21', slug: 'gan-basics', name: 'GAN Architecture & Training' },
          { id: 'cv-kp-22', slug: 'vae', name: 'Variational Autoencoders (VAE)' },
          { id: 'cv-kp-23', slug: 'diffusion-models', name: 'Diffusion Models (DDPM, DDIM)' },
          { id: 'cv-kp-24', slug: 'stable-diffusion', name: 'Stable Diffusion & Latent Diffusion' },
          { id: 'cv-kp-25', slug: 'controlnet', name: 'ControlNet & Guided Generation' },
        ]
      },
      {
        id: 'multimodal-vision',
        slug: 'multimodal-vision',
        name: 'Multimodal & Vision-Language',
        description: 'Connect vision and language for captioning, VQA, and grounding.',
        knowledgePoints: [
          { id: 'cv-kp-26', slug: 'clip', name: 'CLIP: Contrastive Language-Image Pre-Training' },
          { id: 'cv-kp-27', slug: 'vqa', name: 'Visual Question Answering (VQA)' },
          { id: 'cv-kp-28', slug: 'llava', name: 'LLaVA & Vision-Language Models' },
          { id: 'cv-kp-29', slug: 'image-captioning', name: 'Image Captioning (BLIP, Flamingo)' },
          { id: 'cv-kp-30', slug: 'visual-grounding', name: 'Visual Grounding & Referring Expression' },
        ]
      },
    ]
  },

  // AGENTIC AI & MULTI-AGENT SYSTEMS
  {
    id: 'agentic-ai',
    slug: 'agentic-ai',
    name: 'Agentic AI & Multi-Agent Systems',
    description: 'Build autonomous AI agents that reason, plan, use tools, and collaborate in multi-agent frameworks.',
    category: 'reinforcement-learning',
    icon: '🕵️',
    color: '#14B8A6',
    topicCount: 6,
    estimatedHours: 30,
    topics: [
      {
        id: 'agent-foundations',
        slug: 'agent-foundations',
        name: 'Agent Foundations',
        description: 'Core concepts: what makes an agent, reasoning loops, and agent taxonomy.',
        knowledgePoints: [
          { id: 'ag-kp-1', slug: 'agent-definition', name: 'What Makes an AI Agent?' },
          { id: 'ag-kp-2', slug: 'react-framework', name: 'ReAct: Reasoning + Acting Framework' },
          { id: 'ag-kp-3', slug: 'agent-memory', name: 'Agent Memory (Short-term, Long-term, Episodic)' },
          { id: 'ag-kp-4', slug: 'planning-agents', name: 'Planning: Tree-of-Thought, MCTS' },
          { id: 'ag-kp-5', slug: 'agent-eval', name: 'Agent Evaluation & Benchmarks (SWE-Bench, GAIA)' },
        ]
      },
      {
        id: 'tool-use',
        slug: 'tool-use',
        name: 'Tool Use & Function Calling',
        description: 'Enable LLMs to use external tools, APIs, and code interpreters.',
        knowledgePoints: [
          { id: 'ag-kp-6', slug: 'function-calling', name: 'Function Calling (OpenAI, Claude Tool Use)' },
          { id: 'ag-kp-7', slug: 'code-interpreter', name: 'Code Interpreter & Sandboxed Execution' },
          { id: 'ag-kp-8', slug: 'browser-tools', name: 'Browser & Web Scraping Tools' },
          { id: 'ag-kp-9', slug: 'api-integration', name: 'External API Integration Patterns' },
          { id: 'ag-kp-10', slug: 'tool-selection', name: 'Tool Selection & Routing Strategies' },
        ]
      },
      {
        id: 'multi-agent-frameworks',
        slug: 'multi-agent-frameworks',
        name: 'Multi-Agent Frameworks',
        description: 'Orchestrate multiple agents to solve complex tasks collaboratively.',
        knowledgePoints: [
          { id: 'ag-kp-11', slug: 'agent-orchestration', name: 'Agent Orchestration Patterns' },
          { id: 'ag-kp-12', slug: 'autogen', name: 'AutoGen & Conversational Agents' },
          { id: 'ag-kp-13', slug: 'crewai', name: 'CrewAI & Role-Based Multi-Agent Teams' },
          { id: 'ag-kp-14', slug: 'langgraph', name: 'LangGraph & Stateful Agent Graphs' },
          { id: 'ag-kp-15', slug: 'agent-communication', name: 'Agent Communication Protocols (A2A, MCP)' },
        ]
      },
      {
        id: 'rag-and-memory',
        slug: 'rag-and-memory',
        name: 'RAG & Agent Memory',
        description: 'Augment agents with retrieval and persistent memory systems.',
        knowledgePoints: [
          { id: 'ag-kp-16', slug: 'vector-databases', name: 'Vector Databases (Qdrant, Pinecone, Weaviate)' },
          { id: 'ag-kp-17', slug: 'embedding-models', name: 'Embedding Models for RAG' },
          { id: 'ag-kp-18', slug: 'hybrid-search', name: 'Hybrid Search (Sparse + Dense)' },
          { id: 'ag-kp-19', slug: 'reranking', name: 'Reranking & Cross-Encoders' },
          { id: 'ag-kp-20', slug: 'graphrag', name: 'GraphRAG & Knowledge Graph-Enhanced RAG' },
        ]
      },
      {
        id: 'agent-safety',
        slug: 'agent-safety',
        name: 'Agent Safety & Alignment',
        description: 'Ensure agents behave safely, avoid harmful actions, and remain controllable.',
        knowledgePoints: [
          { id: 'ag-kp-21', slug: 'prompt-injection', name: 'Prompt Injection & Jailbreaking' },
          { id: 'ag-kp-22', slug: 'sandboxing-agents', name: 'Sandboxing & Capability Limits' },
          { id: 'ag-kp-23', slug: 'human-in-loop', name: 'Human-in-the-Loop (HitL) Patterns' },
          { id: 'ag-kp-24', slug: 'agent-monitoring', name: 'Agent Monitoring & Audit Logging' },
          { id: 'ag-kp-25', slug: 'corrigibility', name: 'Corrigibility & Interruptibility' },
        ]
      },
      {
        id: 'agent-rl-training',
        slug: 'agent-rl-training',
        name: 'Training Agents with RL',
        description: 'Use reinforcement learning to train autonomous agents for real-world tasks.',
        knowledgePoints: [
          { id: 'ag-kp-26', slug: 'grpo-agents', name: 'GRPO for Agentic Tasks' },
          { id: 'ag-kp-27', slug: 'process-rewards', name: 'Process Reward Models for Agents' },
          { id: 'ag-kp-28', slug: 'trajectory-optimization', name: 'Trajectory Optimization for Agents' },
          { id: 'ag-kp-29', slug: 'self-play-agents', name: 'Self-Play & Adversarial Training' },
          { id: 'ag-kp-30', slug: 'curriculum-agents', name: 'Curriculum Learning for Agents' },
        ]
      },
    ]
  },

  // DEEP LEARNING FUNDAMENTALS
  {
    id: 'deep-learning-fundamentals',
    slug: 'deep-learning-fundamentals',
    name: 'Deep Learning Fundamentals',
    description: 'Core neural network concepts: backpropagation, CNNs, RNNs, regularization, and training best practices.',
    category: 'fine-tuning',
    icon: '🧠',
    color: '#EC4899',
    topicCount: 6,
    estimatedHours: 28,
    topics: [
      {
        id: 'neural-networks-basics',
        slug: 'neural-networks-basics',
        name: 'Neural Network Basics',
        description: 'Perceptrons, activation functions, and forward propagation.',
        knowledgePoints: [
          { id: 'dl-kp-1', slug: 'perceptron', name: 'Perceptron & Linear Threshold Unit' },
          { id: 'dl-kp-2', slug: 'activation-functions', name: 'Activation Functions (ReLU, GELU, Sigmoid)' },
          { id: 'dl-kp-3', slug: 'forward-propagation', name: 'Forward Propagation' },
          { id: 'dl-kp-4', slug: 'universal-approximation', name: 'Universal Approximation Theorem' },
          { id: 'dl-kp-5', slug: 'network-depth-width', name: 'Depth vs Width Tradeoffs' },
        ]
      },
      {
        id: 'backpropagation',
        slug: 'backpropagation',
        name: 'Backpropagation',
        description: 'Compute gradients efficiently through automatic differentiation.',
        knowledgePoints: [
          { id: 'dl-kp-6', slug: 'chain-rule-backprop', name: 'Chain Rule in Backpropagation' },
          { id: 'dl-kp-7', slug: 'computation-graph', name: 'Computation Graphs & Autograd' },
          { id: 'dl-kp-8', slug: 'vanishing-gradient', name: 'Vanishing & Exploding Gradients' },
          { id: 'dl-kp-9', slug: 'gradient-clipping', name: 'Gradient Clipping' },
          { id: 'dl-kp-10', slug: 'batch-normalization', name: 'Batch Normalization' },
        ]
      },
      {
        id: 'convolutional-networks',
        slug: 'convolutional-networks',
        name: 'Convolutional Neural Networks',
        description: 'CNNs for image processing and spatial pattern recognition.',
        knowledgePoints: [
          { id: 'dl-kp-11', slug: 'convolution-operation', name: 'Convolution Operation & Filters' },
          { id: 'dl-kp-12', slug: 'pooling-layers', name: 'Pooling Layers (Max, Average)' },
          { id: 'dl-kp-13', slug: 'cnn-architectures', name: 'CNN Architectures (ResNet, EfficientNet)' },
          { id: 'dl-kp-14', slug: 'transfer-learning-cnn', name: 'Transfer Learning with CNNs' },
          { id: 'dl-kp-15', slug: 'object-detection', name: 'Object Detection (YOLO, RCNN)' },
        ]
      },
      {
        id: 'recurrent-networks',
        slug: 'recurrent-networks',
        name: 'Recurrent Neural Networks',
        description: 'Sequence modeling with RNNs, LSTMs, and GRUs.',
        knowledgePoints: [
          { id: 'dl-kp-16', slug: 'rnn-basics', name: 'RNN Architecture & Hidden State' },
          { id: 'dl-kp-17', slug: 'lstm', name: 'LSTM: Forget, Input, Output Gates' },
          { id: 'dl-kp-18', slug: 'gru', name: 'GRU: Simplified Gating Mechanism' },
          { id: 'dl-kp-19', slug: 'bptt', name: 'BackpropagationThrough Time (BPTT)' },
          { id: 'dl-kp-20', slug: 'seq2seq', name: 'Sequence-to-Sequence with Encoder-Decoder' },
        ]
      },
      {
        id: 'regularization-techniques',
        slug: 'regularization-techniques',
        name: 'Regularization',
        description: 'Prevent overfitting with dropout, weight decay, and early stopping.',
        knowledgePoints: [
          { id: 'dl-kp-21', slug: 'dropout', name: 'Dropout Regularization' },
          { id: 'dl-kp-22', slug: 'weight-decay', name: 'L1/L2 Weight Decay' },
          { id: 'dl-kp-23', slug: 'early-stopping', name: 'Early Stopping & Model Selection' },
          { id: 'dl-kp-24', slug: 'data-augmentation', name: 'Data Augmentation Strategies' },
          { id: 'dl-kp-25', slug: 'label-smoothing', name: 'Label Smoothing & Mixup' },
        ]
      },
      {
        id: 'training-best-practices',
        slug: 'training-best-practices',
        name: 'Training Best Practices',
        description: 'Practical techniques for training deep networks efficiently.',
        knowledgePoints: [
          { id: 'dl-kp-26', slug: 'weight-initialization', name: 'Weight Initialization (Xavier, He)' },
          { id: 'dl-kp-27', slug: 'learning-rate-finder', name: 'Learning Rate Finder & Cyclical LR' },
          { id: 'dl-kp-28', slug: 'warmup-schedules', name: 'Warmup Schedules & Cosine Annealing' },
          { id: 'dl-kp-29', slug: 'gradient-accumulation', name: 'Gradient Accumulation for Large Batches' },
          { id: 'dl-kp-30', slug: 'loss-landscape', name: 'Loss Landscape & Sharp vs Flat Minima' },
        ]
      },
    ]
  },

  // ML SYSTEMS & MLOps
  {
    id: 'ml-systems',
    slug: 'ml-systems',
    name: 'ML Systems & MLOps',
    description: 'Build production-grade ML systems: experiment tracking, model serving, monitoring, and the full MLOps lifecycle.',
    category: 'software-engineering',
    icon: '⚙️',
    color: '#F59E0B',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'experiment-tracking',
        slug: 'experiment-tracking',
        name: 'Experiment Tracking',
        description: 'Track, compare, and reproduce ML experiments at scale.',
        knowledgePoints: [
          { id: 'mls-kp-1', slug: 'wandb-basics', name: 'Weights & Biases (W&B) Basics' },
          { id: 'mls-kp-2', slug: 'mlflow-tracking', name: 'MLflow Experiment Tracking' },
          { id: 'mls-kp-3', slug: 'hyperparameter-search', name: 'Hyperparameter Search (Optuna, Ray Tune)' },
          { id: 'mls-kp-4', slug: 'reproducibility', name: 'Reproducibility & Seed Management' },
          { id: 'mls-kp-5', slug: 'artifact-versioning', name: 'Artifact & Model Versioning' },
        ]
      },
      {
        id: 'data-pipelines',
        slug: 'data-pipelines',
        name: 'Data Pipelines',
        description: 'Build reliable, scalable data pipelines for ML training and inference.',
        knowledgePoints: [
          { id: 'mls-kp-6', slug: 'feature-stores', name: 'Feature Stores & Feature Engineering' },
          { id: 'mls-kp-7', slug: 'data-validation', name: 'Data Validation (Great Expectations)' },
          { id: 'mls-kp-8', slug: 'stream-processing', name: 'Stream Processing for ML (Kafka, Flink)' },
          { id: 'mls-kp-9', slug: 'data-versioning', name: 'Data Versioning (DVC, LakeFS)' },
          { id: 'mls-kp-10', slug: 'etl-for-ml', name: 'ETL Pipelines for ML Workflows' },
        ]
      },
      {
        id: 'model-serving',
        slug: 'model-serving',
        name: 'Model Serving',
        description: 'Deploy models to production with low latency and high throughput.',
        knowledgePoints: [
          { id: 'mls-kp-11', slug: 'rest-api-serving', name: 'REST API Model Serving (FastAPI, BentoML)' },
          { id: 'mls-kp-12', slug: 'triton-inference', name: 'NVIDIA Triton Inference Server' },
          { id: 'mls-kp-13', slug: 'model-optimization', name: 'Model Optimization (ONNX, TensorRT)' },
          { id: 'mls-kp-14', slug: 'ab-testing-ml', name: 'A/B Testing for ML Models' },
          { id: 'mls-kp-15', slug: 'canary-deployment', name: 'Canary & Shadow Deployments' },
        ]
      },
      {
        id: 'monitoring-observability',
        slug: 'monitoring-observability',
        name: 'ML Monitoring & Observability',
        description: 'Detect and respond to model drift, data drift, and performance degradation.',
        knowledgePoints: [
          { id: 'mls-kp-16', slug: 'data-drift', name: 'Data Drift Detection' },
          { id: 'mls-kp-17', slug: 'model-drift', name: 'Model Performance Drift & Retraining Triggers' },
          { id: 'mls-kp-18', slug: 'logging-ml', name: 'Logging & Tracing for ML Services' },
          { id: 'mls-kp-19', slug: 'alerting-ml', name: 'Alerting & On-Call for ML Systems' },
          { id: 'mls-kp-20', slug: 'model-cards', name: 'Model Cards & Documentation' },
        ]
      },
      {
        id: 'ci-cd-ml',
        slug: 'ci-cd-ml',
        name: 'CI/CD for ML',
        description: 'Automated testing, validation, and deployment pipelines for ML.',
        knowledgePoints: [
          { id: 'mls-kp-21', slug: 'ml-testing', name: 'Testing ML Models (Unit, Integration, Shadow)' },
          { id: 'mls-kp-22', slug: 'github-actions-ml', name: 'GitHub Actions for ML Pipelines' },
          { id: 'mls-kp-23', slug: 'containerization-ml', name: 'Containerization (Docker) for ML' },
          { id: 'mls-kp-24', slug: 'kubernetes-ml', name: 'Kubernetes for ML Workloads' },
          { id: 'mls-kp-25', slug: 'infrastructure-as-code', name: 'Infrastructure as Code (Terraform)' },
        ]
      },
      {
        id: 'cloud-ml',
        slug: 'cloud-ml',
        name: 'Cloud ML Platforms',
        description: 'Leverage cloud platforms for scalable ML training and inference.',
        knowledgePoints: [
          { id: 'mls-kp-26', slug: 'sagemaker', name: 'AWS SageMaker Overview' },
          { id: 'mls-kp-27', slug: 'vertex-ai', name: 'Google Vertex AI' },
          { id: 'mls-kp-28', slug: 'azure-ml', name: 'Azure Machine Learning' },
          { id: 'mls-kp-29', slug: 'spot-training', name: 'Spot Instance Training & Checkpointing' },
          { id: 'mls-kp-30', slug: 'cost-tracking-ml', name: 'GPU Cost Tracking & Optimization' },
        ]
      },
    ]
  },

  // TRANSFORMERS & LLMs
  {
    id: 'transformers-llms',
    slug: 'transformers-llms',
    name: 'Transformers & LLMs',
    description: 'Deep-dive into transformer architecture, attention mechanisms, and modern large language models from GPT to Llama.',
    category: 'fine-tuning',
    icon: '🤖',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 35,
    topics: [
      {
        id: 'attention-mechanism',
        slug: 'attention-mechanism',
        name: 'Attention Mechanism',
        description: 'Self-attention, multi-head attention, and the core innovation behind transformers.',
        knowledgePoints: [
          { id: 'tr-kp-1', slug: 'scaled-dot-product', name: 'Scaled Dot-Product Attention' },
          { id: 'tr-kp-2', slug: 'multi-head-attention', name: 'Multi-Head Attention' },
          { id: 'tr-kp-3', slug: 'cross-attention', name: 'Cross-Attention (Encoder-Decoder)' },
          { id: 'tr-kp-4', slug: 'attention-complexity', name: 'Attention Complexity & Flash Attention' },
          { id: 'tr-kp-5', slug: 'sparse-attention', name: 'Sparse & Linear Attention Variants' },
        ]
      },
      {
        id: 'transformer-architecture',
        slug: 'transformer-architecture',
        name: 'Transformer Architecture',
        description: 'Complete transformer architecture from embeddings to output layers.',
        knowledgePoints: [
          { id: 'tr-kp-6', slug: 'positional-encoding', name: 'Positional Encoding (Absolute & RoPE)' },
          { id: 'tr-kp-7', slug: 'layer-normalization', name: 'Layer Normalization & Pre-LN vs Post-LN' },
          { id: 'tr-kp-8', slug: 'feed-forward-layers', name: 'Feed-Forward Layers & Activation Functions' },
          { id: 'tr-kp-9', slug: 'residual-connections', name: 'Residual Connections & Skip Connections' },
          { id: 'tr-kp-10', slug: 'tokenization', name: 'Tokenization (BPE, WordPiece, SentencePiece)' },
        ]
      },
      {
        id: 'pretraining',
        slug: 'pretraining',
        name: 'LLM Pre-Training',
        description: 'How large language models are trained from scratch at scale.',
        knowledgePoints: [
          { id: 'tr-kp-11', slug: 'causal-lm', name: 'Causal Language Modeling (Next Token Prediction)' },
          { id: 'tr-kp-12', slug: 'masked-lm', name: 'Masked Language Modeling (BERT-style)' },
          { id: 'tr-kp-13', slug: 'scaling-laws', name: 'Scaling Laws (Chinchilla Optimal)' },
          { id: 'tr-kp-14', slug: 'data-curation', name: 'Pre-Training Data Curation & Quality' },
          { id: 'tr-kp-15', slug: 'distributed-pretraining', name: 'Distributed Pre-Training (FSDP, Megatron)' },
        ]
      },
      {
        id: 'modern-llms',
        slug: 'modern-llms',
        name: 'Modern LLM Architectures',
        description: 'GPT, Llama, Mistral, Gemma and other modern LLM innovations.',
        knowledgePoints: [
          { id: 'tr-kp-16', slug: 'gpt-architecture', name: 'GPT Architecture Family' },
          { id: 'tr-kp-17', slug: 'llama-architecture', name: 'Llama & Llama-2/3 Architecture' },
          { id: 'tr-kp-18', slug: 'grouped-query-attention', name: 'Grouped Query Attention (GQA & MQA)' },
          { id: 'tr-kp-19', slug: 'mixture-of-experts', name: 'Mixture of Experts (MoE)' },
          { id: 'tr-kp-20', slug: 'sliding-window-attention', name: 'Sliding Window & Long-Context Attention' },
        ]
      },
      {
        id: 'inference-techniques',
        slug: 'inference-techniques',
        name: 'LLM Inference',
        description: 'Decoding strategies, KV-cache, and serving LLMs efficiently.',
        knowledgePoints: [
          { id: 'tr-kp-21', slug: 'kv-cache', name: 'KV Cache & Memory Management' },
          { id: 'tr-kp-22', slug: 'decoding-strategies', name: 'Decoding: Greedy, Beam, Sampling' },
          { id: 'tr-kp-23', slug: 'speculative-decoding', name: 'Speculative Decoding' },
          { id: 'tr-kp-24', slug: 'continuous-batching', name: 'Continuous Batching &Throughput' },
          { id: 'tr-kp-25', slug: 'quantization-llm', name: 'Quantization for LLM Inference (GGUF, AWQ)' },
        ]
      },
      {
        id: 'prompt-engineering',
        slug: 'prompt-engineering',
        name: 'Prompt Engineering',
        description: 'Techniques to get the best results from LLMs without fine-tuning.',
        knowledgePoints: [
          { id: 'tr-kp-26', slug: 'few-shot-prompting', name: 'Few-Shot & Zero-Shot Prompting' },
          { id: 'tr-kp-27', slug: 'chain-of-thought', name: 'Chain-of-Thought Prompting' },
          { id: 'tr-kp-28', slug: 'structured-outputs', name: 'Structured Outputs & JSON Mode' },
          { id: 'tr-kp-29', slug: 'system-prompts', name: 'System Prompts & Instruction Following' },
          { id: 'tr-kp-30', slug: 'rag-architecture', name: 'Retrieval-Augmented Generation (RAG)' },
        ]
      },
    ]
  },
  // ML SYSTEM DESIGN FOR INTERVIEWS
  {
    id: 'ml-system-design',
    slug: 'ml-system-design',
    name: 'ML System Design for Interviews',
    description: 'Design ML systems end-to-end: feature stores, recommendation engines, search, and fraud detection.',
    topics: [
      {
        id: 'ml-system-fundamentals',
        name: 'ML System Design Fundamentals',
        description: 'MLESDI framework, requirements gathering, and system design process.',
        knowledgePoints: [
          { id: 'mlsd-kp-1', slug: 'mlesdi-framework', name: 'ML System Design Framework (MLESDI)' },
          { id: 'mlsd-kp-2', slug: 'requirements-ml-system', name: 'Functional & Non-Functional Requirements for ML' },
          { id: 'mlsd-kp-3', slug: 'ml-system-tradeoffs', name: 'Latency vs Throughput vs Accuracy Tradeoffs' },
          { id: 'mlsd-kp-4', slug: 'back-of-envelope-ml', name: 'Back-of-Envelope Estimation for ML Systems' },
          { id: 'mlsd-kp-5', slug: 'ml-architecture-patterns', name: 'ML Architecture Patterns & Anti-Patterns' },
        ]
      },
      {
        id: 'feed-ranking-design',
        name: 'News Feed & Content Ranking',
        description: 'Designing Twitter/LinkedIn/TikTok feed ranking systems.',
        knowledgePoints: [
          { id: 'mlsd-kp-6', slug: 'feed-ranking-system', name: 'News Feed Ranking System Design' },
          { id: 'mlsd-kp-7', slug: 'engagement-prediction', name: 'Engagement Prediction & Multi-Task Ranking' },
          { id: 'mlsd-kp-8', slug: 'candidate-generation', name: 'Candidate Generation at Scale' },
          { id: 'mlsd-kp-9', slug: 'position-bias', name: 'Position Bias & Click Model Correction' },
          { id: 'mlsd-kp-10', slug: 'diversity-feed', name: 'Diversity & Freshness in Feed Ranking' },
        ]
      },
      {
        id: 'search-design',
        name: 'Search & Query Understanding',
        description: 'Designing ML-powered search systems with query understanding and ranking.',
        knowledgePoints: [
          { id: 'mlsd-kp-11', slug: 'query-understanding', name: 'Query Understanding & Intent Classification' },
          { id: 'mlsd-kp-12', slug: 'dense-retrieval', name: 'Dense Retrieval & Bi-Encoder Architecture' },
          { id: 'mlsd-kp-13', slug: 'query-rewriting', name: 'Query Rewriting & Expansion' },
          { id: 'mlsd-kp-14', slug: 'indexing-search', name: 'Inverted Index & ANN Indexing' },
          { id: 'mlsd-kp-15', slug: 'semantic-search-design', name: 'Semantic Search System Design' },
        ]
      },
      {
        id: 'ads-design',
        name: 'Ads & Monetization Systems',
        description: 'Click-through rate prediction, bidding, and ad auction design.',
        knowledgePoints: [
          { id: 'mlsd-kp-16', slug: 'ctr-prediction', name: 'CTR & CVR Prediction System Design' },
          { id: 'mlsd-kp-17', slug: 'ad-auction', name: 'Ad Auction Mechanics & GSP' },
          { id: 'mlsd-kp-18', slug: 'bid-optimization', name: 'Bid Optimization & Budget Pacing' },
          { id: 'mlsd-kp-19', slug: 'ad-targeting', name: 'Ad Targeting & Audience Segmentation' },
          { id: 'mlsd-kp-20', slug: 'ad-quality', name: 'Ad Quality & Spam Detection' },
        ]
      },
      {
        id: 'fraud-anomaly-design',
        name: 'Fraud Detection & Trust & Safety',
        description: 'Real-time fraud detection, account integrity, and content moderation.',
        knowledgePoints: [
          { id: 'mlsd-kp-21', slug: 'fraud-detection-design', name: 'Real-Time Fraud Detection System Design' },
          { id: 'mlsd-kp-22', slug: 'graph-fraud', name: 'Graph-Based Fraud Detection' },
          { id: 'mlsd-kp-23', slug: 'content-moderation', name: 'Content Moderation System Design' },
          { id: 'mlsd-kp-24', slug: 'bot-detection', name: 'Bot Detection & Account Integrity' },
          { id: 'mlsd-kp-25', slug: 'risk-scoring', name: 'Risk Scoring & Threshold Management' },
        ]
      },
      {
        id: 'nlp-system-design',
        name: 'NLP & Conversational AI System Design',
        description: 'Designing chatbots, question answering, and language understanding systems.',
        knowledgePoints: [
          { id: 'mlsd-kp-26', slug: 'chatbot-design', name: 'Conversational AI & Chatbot System Design' },
          { id: 'mlsd-kp-27', slug: 'qa-system-design', name: 'Question Answering System Design' },
          { id: 'mlsd-kp-28', slug: 'entity-extraction-design', name: 'NER System Design at Scale' },
          { id: 'mlsd-kp-29', slug: 'sentiment-system', name: 'Sentiment Analysis at Scale' },
          { id: 'mlsd-kp-30', slug: 'llm-product-design', name: 'LLM Product Design & Guardrails' },
        ]
      },
    ]
  },

  // APPLIED MATH FOR AI: LINEAR ALGEBRA DEEP DIVE
  {
    id: 'linear-algebra-deep-dive',
    slug: 'linear-algebra-deep-dive',
    name: 'Applied Math for AI: Linear Algebra Deep Dive',
    description: 'Advanced linear algebra for ML practitioners: matrix decompositions, tensor operations, and geometry.',
    topics: [
      {
        id: 'matrix-decompositions',
        slug: 'matrix-decompositions',
        name: 'Matrix Decompositions',
        description: 'SVD, eigendecomposition, QR, and Cholesky for ML applications.',
        knowledgePoints: [
          { id: 'lad-kp-1', slug: 'svd-deep', name: 'SVD & Dimensionality Reduction' },
          { id: 'lad-kp-2', slug: 'eigendecomposition', name: 'Eigendecomposition & Spectral Theorem' },
          { id: 'lad-kp-3', slug: 'qr-decomposition', name: 'QR Decomposition & Gram-Schmidt' },
          { id: 'lad-kp-4', slug: 'cholesky-decomp', name: 'Cholesky Decomposition & Positive Definiteness' },
          { id: 'lad-kp-5', slug: 'low-rank-approx', name: 'Low-Rank Approximation & Truncated SVD' },
        ]
      },
      {
        id: 'tensor-algebra',
        slug: 'tensor-algebra',
        name: 'Tensor Algebra & Operations',
        description: 'Tensor products, contractions, and tensor decompositions for ML.',
        knowledgePoints: [
          { id: 'lad-kp-6', slug: 'tensor-products', name: 'Tensor Products & Multilinear Maps' },
          { id: 'lad-kp-7', slug: 'einsum', name: 'Einstein Summation & Einsum Notation' },
          { id: 'lad-kp-8', slug: 'cp-tucker', name: 'CP & Tucker Tensor Decompositions' },
          { id: 'lad-kp-9', slug: 'tensor-networks', name: 'Tensor Networks & Matrix Product States' },
          { id: 'lad-kp-10', slug: 'tensor-train', name: 'Tensor Train & Tensor Ring Decompositions' },
        ]
      },
      {
        id: 'linear-maps-transformations',
        slug: 'linear-maps-transformations',
        name: 'Linear Maps & Geometric Transformations',
        description: 'Projections, rotations, and geometric interpretations in high dimensions.',
        knowledgePoints: [
          { id: 'lad-kp-11', slug: 'orthogonal-projections', name: 'Orthogonal Projections & Subspaces' },
          { id: 'lad-kp-12', slug: 'rotation-matrices', name: 'Rotation Matrices & Lie Groups' },
          { id: 'lad-kp-13', slug: 'affine-transformations', name: 'Affine Transformations in ML' },
          { id: 'lad-kp-14', slug: 'change-of-basis', name: 'Change of Basis & Coordinate Systems' },
          { id: 'lad-kp-15', slug: 'kernel-trick', name: 'Kernel Trick & Implicit Feature Maps' },
        ]
      },
      {
        id: 'matrix-calculus',
        slug: 'matrix-calculus',
        name: 'Matrix Calculus & Gradients',
        description: 'Jacobians, Hessians, and matrix derivatives for backpropagation.',
        knowledgePoints: [
          { id: 'lad-kp-16', slug: 'jacobian-matrix', name: 'Jacobian Matrix & Chain Rule' },
          { id: 'lad-kp-17', slug: 'hessian-matrix', name: 'Hessian Matrix & Second-Order Derivatives' },
          { id: 'lad-kp-18', slug: 'matrix-derivatives', name: 'Matrix Derivatives & Denominator Layout' },
          { id: 'lad-kp-19', slug: 'backprop-linear-algebra', name: 'Backpropagation as Matrix Multiplication' },
          { id: 'lad-kp-20', slug: 'forward-mode-ad', name: 'Forward Mode AD & Dual Numbers' },
        ]
      },
      {
        id: 'random-matrix-theory',
        slug: 'random-matrix-theory',
        name: 'Random Matrix Theory & High-Dimensional Stats',
        description: 'Concentration inequalities, random projections, and high-dimensional phenomena.',
        knowledgePoints: [
          { id: 'lad-kp-21', slug: 'jl-lemma', name: 'Johnson-Lindenstrauss Lemma & Random Projections' },
          { id: 'lad-kp-22', slug: 'concentration-ineq', name: 'Concentration Inequalities (Hoeffding, Bernstein)' },
          { id: 'lad-kp-23', slug: 'rmt-eigenvalue', name: 'Random Matrix Theory & Marchenko-Pastur' },
          { id: 'lad-kp-24', slug: 'curse-dimensionality', name: 'Curse of Dimensionality & Blessing of Sparsity' },
          { id: 'lad-kp-25', slug: 'compressive-sensing', name: 'Compressive Sensing & Sparse Recovery' },
        ]
      },
      {
        id: 'numerical-linear-algebra',
        slug: 'numerical-linear-algebra',
        name: 'Numerical Linear Algebra',
        description: 'Condition numbers, numerical stability, and efficient linear system solvers.',
        knowledgePoints: [
          { id: 'lad-kp-26', slug: 'condition-number', name: 'Condition Number & Numerical Stability' },
          { id: 'lad-kp-27', slug: 'iterative-solvers', name: 'Iterative Solvers (CG, GMRES, Krylov)' },
          { id: 'lad-kp-28', slug: 'preconditioning', name: 'Preconditioning & Convergence Acceleration' },
          { id: 'lad-kp-29', slug: 'sparse-matrices', name: 'Sparse Matrix Formats & Algorithms' },
          { id: 'lad-kp-30', slug: 'gpu-blas', name: 'GPU Linear Algebra (cuBLAS, cuSPARSE)' },
        ]
      },
    ]
  },

  // APPLIED ML FOR TABULAR DATA
  {
    id: 'tabular-ml',
    slug: 'tabular-ml',
    name: 'Applied ML for Tabular Data',
    description: 'Tree-based methods, gradient boosting, feature engineering, and deep learning for tabular data.',
    topics: [
      {
        id: 'tree-based-methods',
        slug: 'tree-based-methods',
        name: 'Tree-Based Methods',
        description: 'Decision trees, random forests, and ensemble methods for tabular data.',
        knowledgePoints: [
          { id: 'tab-kp-1', slug: 'decision-trees', name: 'Decision Trees & CART Algorithm' },
          { id: 'tab-kp-2', slug: 'random-forests', name: 'Random Forests & Bagging' },
          { id: 'tab-kp-3', slug: 'extra-trees', name: 'Extra Trees & Feature Randomization' },
          { id: 'tab-kp-4', slug: 'feature-importance', name: 'Feature Importance (Gini, Permutation, SHAP)' },
          { id: 'tab-kp-5', slug: 'oblique-trees', name: 'Oblique Trees & Non-Axis-Aligned Splits' },
        ]
      },
      {
        id: 'gradient-boosting',
        slug: 'gradient-boosting',
        name: 'Gradient Boosting Methods',
        description: 'XGBoost, LightGBM, CatBoost, and gradient boosting theory.',
        knowledgePoints: [
          { id: 'tab-kp-6', slug: 'gradient-boosting-theory', name: 'Gradient Boosting Theory & Functional Gradient' },
          { id: 'tab-kp-7', slug: 'xgboost', name: 'XGBoost & Second-Order Approximation' },
          { id: 'tab-kp-8', slug: 'lightgbm', name: 'LightGBM & Leaf-Wise Growth' },
          { id: 'tab-kp-9', slug: 'catboost', name: 'CatBoost & Ordered Boosting' },
          { id: 'tab-kp-10', slug: 'gbm-hypertuning', name: 'Hyperparameter Tuning for GBM Models' },
        ]
      },
      {
        id: 'tabular-feature-engineering',
        slug: 'tabular-feature-engineering',
        name: 'Feature Engineering & Selection',
        description: 'Encoding categorical features, interaction features, and dimensionality reduction.',
        knowledgePoints: [
          { id: 'tab-kp-11', slug: 'categorical-encoding', name: 'Categorical Encoding (OHE, Target, Embeddings)' },
          { id: 'tab-kp-12', slug: 'feature-interactions', name: 'Feature Interactions & Polynomial Features' },
          { id: 'tab-kp-13', slug: 'missing-values', name: 'Missing Value Imputation Strategies' },
          { id: 'tab-kp-14', slug: 'feature-selection-tab', name: 'Feature Selection (RFE, Boruta, mRMR)' },
          { id: 'tab-kp-15', slug: 'pca-tabular', name: 'PCA & Dimensionality Reduction for Tabular' },
        ]
      },
      {
        id: 'deep-tabular',
        slug: 'deep-tabular',
        name: 'Deep Learning for Tabular Data',
        description: 'TabNet, FT-Transformer, and neural networks for structured data.',
        knowledgePoints: [
          { id: 'tab-kp-16', slug: 'tabnet', name: 'TabNet & Attentive Feature Selection' },
          { id: 'tab-kp-17', slug: 'ft-transformer', name: 'FT-Transformer & Feature Tokenization' },
          { id: 'tab-kp-18', slug: 'tab-resnet', name: 'MLP-Mixer & ResNet for Tabular' },
          { id: 'tab-kp-19', slug: 'tabtransformer', name: 'TabTransformer & Categorical Embeddings' },
          { id: 'tab-kp-20', slug: 'tree-dl-hybrid', name: 'Tree + Deep Learning Hybrids (NODE, SAINT)' },
        ]
      },
      {
        id: 'tabular-automl',
        slug: 'tabular-automl',
        name: 'AutoML for Tabular Data',
        description: 'AutoGluon, H2O, TPOT, and automated ML for structured data.',
        knowledgePoints: [
          { id: 'tab-kp-21', slug: 'autogluon', name: 'AutoGluon & Stacked Ensembling' },
          { id: 'tab-kp-22', slug: 'h2o-automl', name: 'H2O AutoML & Auto-Stacking' },
          { id: 'tab-kp-23', slug: 'tpot', name: 'TPOT & Genetic Programming for AutoML' },
          { id: 'tab-kp-24', slug: 'optuna-automl', name: 'Optuna & Hyperparameter Optimization Frameworks' },
          { id: 'tab-kp-25', slug: 'llm-tabular', name: 'LLMs for Tabular (TabPFN, LIFT)' },
        ]
      },
      {
        id: 'tabular-applications',
        slug: 'tabular-applications',
        name: 'Tabular ML Applications',
        description: 'Fraud detection, churn prediction, and competition winning strategies.',
        knowledgePoints: [
          { id: 'tab-kp-26', slug: 'fraud-detection', name: 'Fraud Detection & Imbalanced Classification' },
          { id: 'tab-kp-27', slug: 'churn-prediction', name: 'Churn Prediction & Customer Lifetime Value' },
          { id: 'tab-kp-28', slug: 'kaggle-tabular', name: 'Kaggle Tabular Competition Strategies' },
          { id: 'tab-kp-29', slug: 'survival-analysis', name: 'Survival Analysis & Time-to-Event Modeling' },
          { id: 'tab-kp-30', slug: 'tabular-prod', name: 'Deploying Tabular Models in Production' },
        ]
      },
    ]
  },

  // EVALUATION & BENCHMARKING OF ML SYSTEMS
  {
    id: 'ml-evaluation-benchmarking',
    slug: 'ml-evaluation-benchmarking',
    name: 'Evaluation & Benchmarking of ML Systems',
    description: 'Statistical evaluation methods, LLM benchmarks, and robust ML model assessment.',
    topics: [
      {
        id: 'statistical-evaluation',
        slug: 'statistical-evaluation',
        name: 'Statistical Evaluation Methods',
        description: 'Significance testing, confidence intervals, and evaluation pitfalls.',
        knowledgePoints: [
          { id: 'evb-kp-1', slug: 'cross-validation-eval', name: 'Cross-Validation Strategies & Hold-Out Sets' },
          { id: 'evb-kp-2', slug: 'bootstrap-ci', name: 'Bootstrap & Confidence Intervals for Metrics' },
          { id: 'evb-kp-3', slug: 'significance-testing', name: 'Statistical Significance Testing (McNemar, t-test)' },
          { id: 'evb-kp-4', slug: 'multiple-comparison', name: 'Multiple Comparison Correction (Bonferroni, FDR)' },
          { id: 'evb-kp-5', slug: 'evaluation-bias', name: 'Evaluation Bias & Data Contamination' },
        ]
      },
      {
        id: 'classification-regression-eval',
        slug: 'classification-regression-eval',
        name: 'Classification & Regression Metrics',
        description: 'Precision/recall, ROC-AUC, calibration, and regression scoring.',
        knowledgePoints: [
          { id: 'evb-kp-6', slug: 'precision-recall-f1', name: 'Precision, Recall, F1 & Confusion Matrix' },
          { id: 'evb-kp-7', slug: 'roc-auc', name: 'ROC Curve, AUC & PR-AUC' },
          { id: 'evb-kp-8', slug: 'calibration-eval', name: 'Calibration Curves & Brier Score' },
          { id: 'evb-kp-9', slug: 'regression-metrics', name: 'MAE, RMSE, MAPE & Regression Metrics' },
          { id: 'evb-kp-10', slug: 'imbalanced-eval', name: 'Evaluation with Imbalanced Datasets' },
        ]
      },
      {
        id: 'llm-benchmarks',
        slug: 'llm-benchmarks',
        name: 'LLM Benchmarks & Leaderboards',
        description: 'MMLU, HellaSwag, HumanEval, and comprehensive LLM evaluation.',
        knowledgePoints: [
          { id: 'evb-kp-11', slug: 'mmlu-benchmark', name: 'MMLU & Multi-Task Language Understanding' },
          { id: 'evb-kp-12', slug: 'hellaswag-arc', name: 'HellaSwag, ARC & Common Sense Reasoning' },
          { id: 'evb-kp-13', slug: 'humaneval-mbpp', name: 'HumanEval, MBPP & Coding Benchmarks' },
          { id: 'evb-kp-14', slug: 'mt-bench', name: 'MT-Bench, AlpacaEval & Instruction Following' },
          { id: 'evb-kp-15', slug: 'lm-harness', name: 'LM Evaluation Harness & HELM' },
        ]
      },
      {
        id: 'generative-eval',
        slug: 'generative-eval',
        name: 'Generative Model Evaluation',
        description: 'FID, CLIP score, BLEU, ROUGE, and human evaluation.',
        knowledgePoints: [
          { id: 'evb-kp-16', slug: 'fid-is', name: 'FID, IS & Generative Image Quality Metrics' },
          { id: 'evb-kp-17', slug: 'clip-score-eval', name: 'CLIP Score & Text-Image Alignment' },
          { id: 'evb-kp-18', slug: 'bleu-rouge', name: 'BLEU, ROUGE & BERTScore for Text Generation' },
          { id: 'evb-kp-19', slug: 'human-eval-protocols', name: 'Human Evaluation Protocols & Annotation' },
          { id: 'evb-kp-20', slug: 'llm-as-judge', name: 'LLM-as-a-Judge & GPT-4 Evaluation' },
        ]
      },
      {
        id: 'safety-eval',
        slug: 'safety-eval',
        name: 'Safety & Red-Teaming Evaluation',
        description: 'Toxicity detection, jailbreak testing, and bias benchmarks.',
        knowledgePoints: [
          { id: 'evb-kp-21', slug: 'toxicity-eval', name: 'Toxicity Detection & Content Safety Metrics' },
          { id: 'evb-kp-22', slug: 'bias-benchmarks', name: 'Bias Benchmarks (WinoBias, BBQ, StereoSet)' },
          { id: 'evb-kp-23', slug: 'red-teaming-eval', name: 'Red-Teaming & Automated Jailbreak Testing' },
          { id: 'evb-kp-24', slug: 'truthfulness-eval', name: 'TruthfulQA & Hallucination Evaluation' },
          { id: 'evb-kp-25', slug: 'privacy-eval', name: 'Privacy Leakage & Memorization Evaluation' },
        ]
      },
      {
        id: 'system-eval',
        slug: 'system-eval',
        name: 'System-Level & End-to-End Evaluation',
        description: 'Agent evaluation, RAG assessment, and production system metrics.',
        knowledgePoints: [
          { id: 'evb-kp-26', slug: 'agent-eval', name: 'Agent Evaluation (AgentBench, WebArena)' },
          { id: 'evb-kp-27', slug: 'rag-eval-metrics', name: 'RAG Evaluation (Faithfulness, Relevance, RAGAS)' },
          { id: 'evb-kp-28', slug: 'latency-throughput', name: 'Latency, Throughput & SLO Evaluation' },
          { id: 'evb-kp-29', slug: 'ab-test-eval', name: 'A/B Testing & Online Evaluation Methodology' },
          { id: 'evb-kp-30', slug: 'eval-infrastructure-prod', name: 'Evaluation Infrastructure & CI Eval Pipelines' },
        ]
      },
    ]
  },

  // DATA-CENTRIC AI & DATASET ENGINEERING
  {
    id: 'data-centric-ai',
    slug: 'data-centric-ai',
    name: 'Data-Centric AI & Dataset Engineering',
    description: 'Improve ML by improving data: labeling, augmentation, data quality, and dataset curation at scale.',
    topics: [
      {
        id: 'data-labeling',
        slug: 'data-labeling',
        name: 'Data Labeling & Annotation',
        description: 'Human annotation workflows, active learning, and weak supervision.',
        knowledgePoints: [
          { id: 'dc-kp-1', slug: 'annotation-workflows', name: 'Annotation Workflows & Quality Control' },
          { id: 'dc-kp-2', slug: 'active-learning-label', name: 'Active Learning for Efficient Labeling' },
          { id: 'dc-kp-3', slug: 'weak-supervision', name: 'Weak Supervision & Snorkel' },
          { id: 'dc-kp-4', slug: 'crowdsourcing-ml', name: 'Crowdsourcing (MTurk) & Disagreement Modeling' },
          { id: 'dc-kp-5', slug: 'llm-labeling', name: 'LLM-Assisted Labeling & Data Generation' },
        ]
      },
      {
        id: 'data-augmentation-advanced',
        slug: 'data-augmentation-advanced',
        name: 'Advanced Data Augmentation',
        description: 'AutoAugment, mixup, CutMix, and augmentation policy search.',
        knowledgePoints: [
          { id: 'dc-kp-6', slug: 'autoaugment', name: 'AutoAugment & Augmentation Policy Search' },
          { id: 'dc-kp-7', slug: 'mixup-cutmix', name: 'Mixup, CutMix & Manifold Mixup' },
          { id: 'dc-kp-8', slug: 'randaugment', name: 'RandAugment & TrivialAugment' },
          { id: 'dc-kp-9', slug: 'synthetic-augmentation', name: 'Synthetic Data Augmentation with Diffusion' },
          { id: 'dc-kp-10', slug: 'augmentation-nlp', name: 'NLP Data Augmentation (EDA, Back-Translation)' },
        ]
      },
      {
        id: 'data-quality',
        slug: 'data-quality',
        name: 'Data Quality & Cleaning',
        description: 'Data validation, deduplication, label noise, and dataset curation.',
        knowledgePoints: [
          { id: 'dc-kp-11', slug: 'label-noise-correction', name: 'Label Noise Correction & Confident Learning' },
          { id: 'dc-kp-12', slug: 'data-deduplication', name: 'Data Deduplication (MinHash, Fuzzy Matching)' },
          { id: 'dc-kp-13', slug: 'data-validation-ml', name: 'Data Validation with TFX & Great Expectations' },
          { id: 'dc-kp-14', slug: 'dataset-curation', name: 'Dataset Curation Principles & Quality Metrics' },
          { id: 'dc-kp-15', slug: 'data-slicing', name: 'Data Slicing & Failure Mode Analysis' },
        ]
      },
      {
        id: 'dataset-distillation',
        slug: 'dataset-distillation',
        name: 'Dataset Distillation & Coreset Selection',
        description: 'Compress datasets while preserving performance.',
        knowledgePoints: [
          { id: 'dc-kp-16', slug: 'dataset-distillation', name: 'Dataset Distillation & Learning to Summarize' },
          { id: 'dc-kp-17', slug: 'coreset-selection', name: 'Coreset Selection & Herding' },
          { id: 'dc-kp-18', slug: 'influence-functions', name: 'Influence Functions & Data Valuation' },
          { id: 'dc-kp-19', slug: 'data-shapley', name: 'Data Shapley & Marginal Contribution' },
          { id: 'dc-kp-20', slug: 'curriculum-learning', name: 'Curriculum Learning & Data Ordering' },
        ]
      },
      {
        id: 'pretraining-data',
        slug: 'pretraining-data',
        name: 'Pretraining Data Curation',
        description: 'Web-scale data collection, filtering, and pretraining dataset design.',
        knowledgePoints: [
          { id: 'dc-kp-21', slug: 'common-crawl', name: 'Common Crawl & Web-Scale Data Processing' },
          { id: 'dc-kp-22', slug: 'data-filtering', name: 'Quality Filtering (FastText, Perplexity, Rules)' },
          { id: 'dc-kp-23', slug: 'dolma-redpajama', name: 'Dolma, RedPajama & Open Pretraining Datasets' },
          { id: 'dc-kp-24', slug: 'domain-mixture', name: 'Domain Mixture & Data Blending for LLMs' },
          { id: 'dc-kp-25', slug: 'instruction-data', name: 'Instruction Tuning Data Curation (Alpaca, FLAN)' },
        ]
      },
      {
        id: 'data-privacy-ethics',
        slug: 'data-privacy-ethics',
        name: 'Data Privacy & Ethics in ML',
        description: 'Consent, data provenance, copyright, and ethical dataset practices.',
        knowledgePoints: [
          { id: 'dc-kp-26', slug: 'data-consent', name: 'Data Consent, Provenance & Licensing' },
          { id: 'dc-kp-27', slug: 'copyright-ml', name: 'Copyright & Fair Use in ML Training Data' },
          { id: 'dc-kp-28', slug: 'pii-detection', name: 'PII Detection & De-Identification' },
          { id: 'dc-kp-29', slug: 'representational-bias', name: 'Representational Bias in Datasets' },
          { id: 'dc-kp-30', slug: 'data-cards', name: 'Data Cards & Dataset Documentation' },
        ]
      },
    ]
  },

  // ADVANCED OPTIMIZATION FOR ML
  {
    id: 'advanced-optimization-ml',
    slug: 'advanced-optimization-ml',
    name: 'Advanced Optimization for ML',
    description: 'Deep dive into optimization algorithms, convergence theory, and training dynamics for modern ML.',
    topics: [
      {
        id: 'sgd-variants',
        slug: 'sgd-variants',
        name: 'SGD & First-Order Optimizers',
        description: 'Momentum, Adam, and adaptive learning rate methods.',
        knowledgePoints: [
          { id: 'aopt-kp-1', slug: 'sgd-momentum', name: 'SGD with Momentum & Nesterov Acceleration' },
          { id: 'aopt-kp-2', slug: 'adam-optimizer', name: 'Adam, AdaMax & Adaptive Gradient Methods' },
          { id: 'aopt-kp-3', slug: 'adamw', name: 'AdamW & Weight Decay Decoupling' },
          { id: 'aopt-kp-4', slug: 'adagrad-rmsprop', name: 'Adagrad, RMSprop & Per-Parameter Learning Rates' },
          { id: 'aopt-kp-5', slug: 'lion-optimizer', name: 'Lion, Sophia & Next-Gen Optimizers' },
        ]
      },
      {
        id: 'learning-rate-schedules',
        slug: 'learning-rate-schedules',
        name: 'Learning Rate Scheduling',
        description: 'Warmup, cosine annealing, cyclic schedules, and learning rate finding.',
        knowledgePoints: [
          { id: 'aopt-kp-6', slug: 'lr-warmup', name: 'Learning Rate Warmup & Linear Warmup' },
          { id: 'aopt-kp-7', slug: 'cosine-annealing', name: 'Cosine Annealing & Restarts (SGDR)' },
          { id: 'aopt-kp-8', slug: 'cyclic-lr', name: 'Cyclic Learning Rates & Super-Convergence' },
          { id: 'aopt-kp-9', slug: 'lr-finder', name: 'Learning Rate Finder (Smith & Touvron)' },
          { id: 'aopt-kp-10', slug: 'polynomial-lr', name: 'Polynomial & Exponential Decay Schedules' },
        ]
      },
      {
        id: 'loss-landscapes',
        slug: 'loss-landscapes',
        name: 'Loss Landscapes & Convergence',
        description: 'Saddle points, loss landscape visualization, and convergence theory.',
        knowledgePoints: [
          { id: 'aopt-kp-11', slug: 'loss-landscape-viz', name: 'Loss Landscape Visualization & Flatness' },
          { id: 'aopt-kp-12', slug: 'saddle-points', name: 'Saddle Points & Escaping via Noise' },
          { id: 'aopt-kp-13', slug: 'sharp-flat-minima', name: 'Sharp vs Flat Minima & Generalization' },
          { id: 'aopt-kp-14', slug: 'neural-tangent-kernel', name: 'Neural Tangent Kernel (NTK) Theory' },
          { id: 'aopt-kp-15', slug: 'convergence-rate', name: 'Convergence Rates & Regret Bounds' },
        ]
      },
      {
        id: 'second-order-methods',
        slug: 'second-order-methods',
        name: 'Second-Order & Curvature Methods',
        description: 'K-FAC, Shampoo, and practical second-order optimization.',
        knowledgePoints: [
          { id: 'aopt-kp-16', slug: 'newton-method', name: 'Newton Method & Quasi-Newton (L-BFGS)' },
          { id: 'aopt-kp-17', slug: 'kfac', name: 'K-FAC & Kronecker-Factored Curvature' },
          { id: 'aopt-kp-18', slug: 'shampoo', name: 'Shampoo & Distributed Second-Order Optimization' },
          { id: 'aopt-kp-19', slug: 'natural-gradient', name: 'Natural Gradient & Fisher Information Matrix' },
          { id: 'aopt-kp-20', slug: 'hessian-free', name: 'Hessian-Free Optimization & Conjugate Gradient' },
        ]
      },
      {
        id: 'distributed-optimization',
        slug: 'distributed-optimization',
        name: 'Distributed & Parallel Optimization',
        description: 'Data parallelism, gradient communication, and distributed training.',
        knowledgePoints: [
          { id: 'aopt-kp-21', slug: 'data-parallel-ddp', name: 'Data Parallel & DistributedDataParallel (DDP)' },
          { id: 'aopt-kp-22', slug: 'gradient-compression', name: 'Gradient Compression & Communication Reduction' },
          { id: 'aopt-kp-23', slug: 'federated-opt', name: 'Federated Optimization (FedAvg, FedOpt)' },
          { id: 'aopt-kp-24', slug: 'zero-optimizer', name: 'ZeRO Optimizer & Sharded Training' },
          { id: 'aopt-kp-25', slug: 'async-sgd', name: 'Asynchronous SGD & Staleness Handling' },
        ]
      },
      {
        id: 'regularization-training',
        slug: 'regularization-training',
        name: 'Regularization & Training Tricks',
        description: 'Dropout, normalization, gradient clipping, and training stability.',
        knowledgePoints: [
          { id: 'aopt-kp-26', slug: 'dropout-variants', name: 'Dropout, DropConnect & Stochastic Depth' },
          { id: 'aopt-kp-27', slug: 'batch-layer-norm', name: 'Batch Norm vs Layer Norm vs RMS Norm' },
          { id: 'aopt-kp-28', slug: 'gradient-clipping-opt', name: 'Gradient Clipping & Gradient Scaling (AMP)' },
          { id: 'aopt-kp-29', slug: 'ema-training', name: 'Exponential Moving Average (EMA) for Training' },
          { id: 'aopt-kp-30', slug: 'sam-optimizer', name: 'SAM: Sharpness-Aware Minimization' },
        ]
      },
    ]
  },

  // PRODUCTION ML & LLM ENGINEERING
  {
    id: 'production-ml-engineering',
    slug: 'production-ml-engineering',
    name: 'Production ML & LLM Engineering',
    description: 'Advanced deployment patterns, LLM ops, real-time inference systems, and production-grade ML.',
    topics: [
      {
        id: 'llm-serving-patterns',
        slug: 'llm-serving-patterns',
        name: 'LLM Serving Architectures',
        description: 'Serving LLMs at scale: batching, caching, routing, and cost optimization.',
        knowledgePoints: [
          { id: 'pme-kp-1', slug: 'llm-serving-arch', name: 'LLM Serving Architecture Overview' },
          { id: 'pme-kp-2', slug: 'kv-cache-mgmt', name: 'KV Cache Management & Memory Optimization' },
          { id: 'pme-kp-3', slug: 'request-routing', name: 'Request Routing & Load Balancing for LLMs' },
          { id: 'pme-kp-4', slug: 'model-caching', name: 'Model Caching & Warm Pools' },
          { id: 'pme-kp-5', slug: 'llm-cost-optimization', name: 'LLM Cost Optimization & Token Economics' },
        ]
      },
      {
        id: 'retrieval-augmented-systems',
        slug: 'retrieval-augmented-systems',
        name: 'RAG Systems & Vector Databases',
        description: 'Production RAG pipelines, vector stores, and retrieval optimization.',
        knowledgePoints: [
          { id: 'pme-kp-6', slug: 'rag-pipeline', name: 'Production RAG Pipeline Architecture' },
          { id: 'pme-kp-7', slug: 'vector-databases', name: 'Vector Databases (Pinecone, Weaviate, Qdrant)' },
          { id: 'pme-kp-8', slug: 'hybrid-search', name: 'Hybrid Search (Dense + Sparse Retrieval)' },
          { id: 'pme-kp-9', slug: 'reranking-prod', name: 'Reranking & Cross-Encoder Optimization' },
          { id: 'pme-kp-10', slug: 'rag-evaluation', name: 'RAG Evaluation (RAGAS, ARES, DeepEval)' },
        ]
      },
      {
        id: 'llmops',
        slug: 'llmops',
        name: 'LLMOps & Model Lifecycle',
        description: 'Prompt versioning, LLM monitoring, evaluation pipelines, and A/B testing.',
        knowledgePoints: [
          { id: 'pme-kp-11', slug: 'prompt-versioning', name: 'Prompt Versioning & Management (LangSmith)' },
          { id: 'pme-kp-12', slug: 'llm-observability', name: 'LLM Observability & Tracing (Langfuse)' },
          { id: 'pme-kp-13', slug: 'llm-eval-pipeline', name: 'Automated LLM Evaluation Pipelines' },
          { id: 'pme-kp-14', slug: 'ab-testing-llm', name: 'A/B Testing LLMs & Shadow Deployment' },
          { id: 'pme-kp-15', slug: 'llm-guardrails', name: 'LLM Guardrails & Safety Layers' },
        ]
      },
      {
        id: 'streaming-ml',
        slug: 'streaming-ml',
        name: 'Streaming & Real-Time ML',
        description: 'Online learning, streaming inference, and real-time feature computation.',
        knowledgePoints: [
          { id: 'pme-kp-16', slug: 'streaming-inference', name: 'Streaming Inference & Low-Latency Serving' },
          { id: 'pme-kp-17', slug: 'online-learning-prod', name: 'Online Learning & Continual Training in Production' },
          { id: 'pme-kp-18', slug: 'real-time-features', name: 'Real-Time Feature Computation (Flink, Redis)' },
          { id: 'pme-kp-19', slug: 'event-driven-ml', name: 'Event-Driven ML Pipelines (Kafka + ML)' },
          { id: 'pme-kp-20', slug: 'edge-inference', name: 'Edge Inference & On-Device ML' },
        ]
      },
      {
        id: 'ml-platform-engineering',
        slug: 'ml-platform-engineering',
        name: 'ML Platform Engineering',
        description: 'Building internal ML platforms, compute orchestration, and developer experience.',
        knowledgePoints: [
          { id: 'pme-kp-21', slug: 'ml-platform-arch', name: 'ML Platform Architecture & Design Principles' },
          { id: 'pme-kp-22', slug: 'ray-distributed', name: 'Ray & Distributed Computing for ML' },
          { id: 'pme-kp-23', slug: 'gpu-cluster-mgmt', name: 'GPU Cluster Management & Scheduling' },
          { id: 'pme-kp-24', slug: 'training-infra', name: 'Large-Scale Training Infrastructure' },
          { id: 'pme-kp-25', slug: 'ml-developer-experience', name: 'ML Developer Experience & Tooling' },
        ]
      },
      {
        id: 'production-debugging',
        slug: 'production-debugging',
        name: 'Production Debugging & Incident Response',
        description: 'Diagnosing ML failures, data quality issues, and on-call for ML systems.',
        knowledgePoints: [
          { id: 'pme-kp-26', slug: 'ml-debugging', name: 'Debugging ML Models in Production' },
          { id: 'pme-kp-27', slug: 'data-quality-prod', name: 'Data Quality Monitoring & Data Contracts' },
          { id: 'pme-kp-28', slug: 'ml-incident-response', name: 'ML Incident Response & Postmortems' },
          { id: 'pme-kp-29', slug: 'shadow-deployment', name: 'Shadow Deployment & Canary Releases' },
          { id: 'pme-kp-30', slug: 'cost-attribution-ml', name: 'ML Cost Attribution & FinOps' },
        ]
      },
    ]
  },

  // META-LEARNING & FEW-SHOT LEARNING
  {
    id: 'meta-learning',
    slug: 'meta-learning',
    name: 'Meta-Learning & Few-Shot Learning',
    description: 'Learning to learn: MAML, prototypical networks, and rapid adaptation from few examples.',
    topics: [
      {
        id: 'few-shot-foundations',
        slug: 'few-shot-foundations',
        name: 'Few-Shot Learning Foundations',
        description: 'N-way K-shot setup, episodic training, and benchmark tasks.',
        knowledgePoints: [
          { id: 'ml3-kp-1', slug: 'nway-kshot', name: 'N-Way K-Shot Setup & Episodic Training' },
          { id: 'ml3-kp-2', slug: 'miniImageNet', name: 'miniImageNet, tieredImageNet & FS Benchmarks' },
          { id: 'ml3-kp-3', slug: 'prototypical-networks', name: 'Prototypical Networks & Class Prototypes' },
          { id: 'ml3-kp-4', slug: 'matching-networks', name: 'Matching Networks & Attention-Based Retrieval' },
          { id: 'ml3-kp-5', slug: 'relation-networks-fs', name: 'Relation Networks & Learned Similarity' },
        ]
      },
      {
        id: 'gradient-based-meta',
        slug: 'gradient-based-meta',
        name: 'Gradient-Based Meta-Learning',
        description: 'MAML, Reptile, and optimization-based fast adaptation.',
        knowledgePoints: [
          { id: 'ml3-kp-6', slug: 'maml', name: 'MAML & Model-Agnostic Meta-Learning' },
          { id: 'ml3-kp-7', slug: 'fomaml', name: 'First-Order MAML (FOMAML) & Reptile' },
          { id: 'ml3-kp-8', slug: 'meta-sgd', name: 'Meta-SGD & Learning the Learning Rate' },
          { id: 'ml3-kp-9', slug: 'anil', name: 'ANIL & Almost-No-Inner-Loop Meta-Learning' },
          { id: 'ml3-kp-10', slug: 'implicit-maml', name: 'iMAML & Implicit Gradient Meta-Learning' },
        ]
      },
      {
        id: 'memory-augmented',
        slug: 'memory-augmented',
        name: 'Memory-Augmented Meta-Learning',
        description: 'External memory, Neural Turing Machines, and memory-based meta-learners.',
        knowledgePoints: [
          { id: 'ml3-kp-11', slug: 'ntm', name: 'Neural Turing Machines (NTM)' },
          { id: 'ml3-kp-12', slug: 'snail', name: 'SNAIL & Temporal Convolution + Attention' },
          { id: 'ml3-kp-13', slug: 'mann', name: 'MANN & Memory-Augmented Neural Networks' },
          { id: 'ml3-kp-14', slug: 'meta-dataset', name: 'Meta-Dataset & Diverse Multi-Domain FS' },
          { id: 'ml3-kp-15', slug: 'hypernetworks', name: 'Hypernetworks for Fast Weight Generation' },
        ]
      },
      {
        id: 'in-context-learning',
        slug: 'in-context-learning',
        name: 'In-Context & Prompt-Based Meta-Learning',
        description: 'GPT-style in-context learning, ICL theory, and prompt-tuning.',
        knowledgePoints: [
          { id: 'ml3-kp-16', slug: 'in-context-learning', name: 'In-Context Learning (ICL) in LLMs' },
          { id: 'ml3-kp-17', slug: 'icl-theory', name: 'ICL Theory: Gradient Descent as Bayesian Inference' },
          { id: 'ml3-kp-18', slug: 'prefix-tuning', name: 'Prefix Tuning & Prompt Tuning' },
          { id: 'ml3-kp-19', slug: 'p-tuning', name: 'P-Tuning & Continuous Prompt Optimization' },
          { id: 'ml3-kp-20', slug: 'demonstration-selection', name: 'Demonstration Selection for ICL' },
        ]
      },
      {
        id: 'zero-shot-meta',
        slug: 'zero-shot-meta',
        name: 'Zero-Shot & Cross-Domain Transfer',
        description: 'Attribute-based methods, semantic embeddings, and generalized zero-shot learning.',
        knowledgePoints: [
          { id: 'ml3-kp-21', slug: 'attribute-zsl', name: 'Attribute-Based Zero-Shot Learning' },
          { id: 'ml3-kp-22', slug: 'generalized-zsl', name: 'Generalized Zero-Shot Learning' },
          { id: 'ml3-kp-23', slug: 'semantic-embedding-zsl', name: 'Semantic Embedding & Word2Vec Transfer' },
          { id: 'ml3-kp-24', slug: 'cross-domain-fs', name: 'Cross-Domain Few-Shot Learning' },
          { id: 'ml3-kp-25', slug: 'zsl-llm', name: 'Zero-Shot with LLMs & GPT-4' },
        ]
      },
      {
        id: 'meta-learning-applications',
        slug: 'meta-learning-applications',
        name: 'Meta-Learning Applications',
        description: 'Drug discovery, robotics, NLP, and continual learning with meta-learning.',
        knowledgePoints: [
          { id: 'ml3-kp-26', slug: 'drug-meta', name: 'Meta-Learning for Drug Discovery' },
          { id: 'ml3-kp-27', slug: 'robotics-meta', name: 'Meta-Learning for Robotic Control (PEARL)' },
          { id: 'ml3-kp-28', slug: 'nlp-meta', name: 'Meta-Learning for NLP & Low-Resource Languages' },
          { id: 'ml3-kp-29', slug: 'continual-meta', name: 'Meta-Learning for Continual Learning' },
          { id: 'ml3-kp-30', slug: 'meta-rl', name: 'Meta-Reinforcement Learning (RL2, PEARL)' },
        ]
      },
    ]
  },

  // SELF-SUPERVISED & CONTRASTIVE LEARNING
  {
    id: 'self-supervised-learning',
    slug: 'self-supervised-learning',
    name: 'Self-Supervised & Contrastive Learning',
    description: 'Learn representations without labels: contrastive learning, masked autoencoders, and SSL foundations.',
    topics: [
      {
        id: 'ssl-foundations',
        slug: 'ssl-foundations',
        name: 'Self-Supervised Learning Foundations',
        description: 'Pretext tasks, augmentation strategies, and SSL taxonomy.',
        knowledgePoints: [
          { id: 'ssl-kp-1', slug: 'ssl-overview', name: 'SSL Overview & Pretext Task Design' },
          { id: 'ssl-kp-2', slug: 'data-augmentation-ssl', name: 'Data Augmentation for SSL' },
          { id: 'ssl-kp-3', slug: 'instance-discrimination', name: 'Instance Discrimination & Memory Banks' },
          { id: 'ssl-kp-4', slug: 'ssl-evaluation', name: 'Linear Probing & SSL Evaluation Protocols' },
          { id: 'ssl-kp-5', slug: 'ssl-scaling', name: 'Scaling SSL: Data, Model & Compute' },
        ]
      },
      {
        id: 'contrastive-methods',
        slug: 'contrastive-methods',
        name: 'Contrastive Learning Methods',
        description: 'SimCLR, MoCo, and InfoNCE-based contrastive representation learning.',
        knowledgePoints: [
          { id: 'ssl-kp-6', slug: 'simclr', name: 'SimCLR & NT-Xent Loss' },
          { id: 'ssl-kp-7', slug: 'moco', name: 'MoCo & Momentum Encoders' },
          { id: 'ssl-kp-8', slug: 'infonce-loss', name: 'InfoNCE Loss & Mutual Information Maximization' },
          { id: 'ssl-kp-9', slug: 'supcon', name: 'Supervised Contrastive Learning (SupCon)' },
          { id: 'ssl-kp-10', slug: 'nnclr', name: 'NNCLR & Nearest Neighbor Positives' },
        ]
      },
      {
        id: 'non-contrastive-ssl',
        slug: 'non-contrastive-ssl',
        name: 'Non-Contrastive Self-Supervised Methods',
        description: 'BYOL, SimSiam, Barlow Twins, and VICReg without negative pairs.',
        knowledgePoints: [
          { id: 'ssl-kp-11', slug: 'byol', name: 'BYOL & Bootstrap Without Negatives' },
          { id: 'ssl-kp-12', slug: 'simsiam', name: 'SimSiam & Stop-Gradient Trick' },
          { id: 'ssl-kp-13', slug: 'barlow-twins', name: 'Barlow Twins & Redundancy Reduction' },
          { id: 'ssl-kp-14', slug: 'vicreg', name: 'VICReg & Variance-Invariance-Covariance' },
          { id: 'ssl-kp-15', slug: 'dino', name: 'DINO & Self-Distillation with Vision Transformers' },
        ]
      },
      {
        id: 'masked-pretraining',
        slug: 'masked-pretraining',
        name: 'Masked & Generative Pretraining',
        description: 'MAE, BEiT, and masked language/image modeling.',
        knowledgePoints: [
          { id: 'ssl-kp-16', slug: 'mae', name: 'Masked Autoencoders (MAE) for Vision' },
          { id: 'ssl-kp-17', slug: 'beit', name: 'BEiT & DALL-E Tokenizer Pretraining' },
          { id: 'ssl-kp-18', slug: 'data2vec', name: 'data2vec & Unified SSL Across Modalities' },
          { id: 'ssl-kp-19', slug: 'ibot', name: 'iBOT & Online Tokenizer SSL' },
          { id: 'ssl-kp-20', slug: 'masked-audio-ssl', name: 'Masked Audio Modeling (wav2vec 2.0, HuBERT)' },
        ]
      },
      {
        id: 'ssl-for-nlp',
        slug: 'ssl-for-nlp',
        name: 'SSL for NLP & Language Models',
        description: 'BERT, GPT, and self-supervised pretraining objectives for language.',
        knowledgePoints: [
          { id: 'ssl-kp-21', slug: 'bert-mlm', name: 'BERT & Masked Language Modeling' },
          { id: 'ssl-kp-22', slug: 'gpt-clm', name: 'GPT & Causal Language Modeling' },
          { id: 'ssl-kp-23', slug: 'electra', name: 'ELECTRA & Replaced Token Detection' },
          { id: 'ssl-kp-24', slug: 'span-bert', name: 'SpanBERT & Span Masking' },
          { id: 'ssl-kp-25', slug: 'sentence-ssl', name: 'Sentence Transformers & SimCSE' },
        ]
      },
      {
        id: 'ssl-applications',
        slug: 'ssl-applications',
        name: 'SSL Applications & Transfer',
        description: 'SSL for medical imaging, few-shot learning, and low-data regimes.',
        knowledgePoints: [
          { id: 'ssl-kp-26', slug: 'ssl-medical', name: 'SSL for Medical Imaging & Healthcare' },
          { id: 'ssl-kp-27', slug: 'ssl-few-shot', name: 'SSL for Few-Shot & Low-Data Learning' },
          { id: 'ssl-kp-28', slug: 'ssl-graphs', name: 'SSL for Graphs & Molecular Data' },
          { id: 'ssl-kp-29', slug: 'ssl-tabular', name: 'SSL for Tabular Data (SCARF, SubTab)' },
          { id: 'ssl-kp-30', slug: 'ssl-rl', name: 'SSL for Reinforcement Learning (CURL, SPR)' },
        ]
      },
    ]
  },

  // ML SAFETY, INTERPRETABILITY & ROBUSTNESS
  {
    id: 'ml-safety-interpretability',
    slug: 'ml-safety-interpretability',
    name: 'ML Safety, Interpretability & Robustness',
    description: 'Explainable AI, adversarial robustness, fairness, and building trustworthy ML systems.',
    topics: [
      {
        id: 'interpretability-methods',
        slug: 'interpretability-methods',
        name: 'Interpretability & Explainability Methods',
        description: 'SHAP, LIME, saliency maps, and mechanistic interpretability.',
        knowledgePoints: [
          { id: 'msaf-kp-1', slug: 'shap-values', name: 'SHAP Values & Shapley-Based Explanations' },
          { id: 'msaf-kp-2', slug: 'lime-explainability', name: 'LIME & Local Surrogate Models' },
          { id: 'msaf-kp-3', slug: 'saliency-maps', name: 'Gradient-Based Saliency Maps' },
          { id: 'msaf-kp-4', slug: 'mechanistic-interp', name: 'Mechanistic Interpretability & Circuit Analysis' },
          { id: 'msaf-kp-5', slug: 'tcav-concepts', name: 'TCAV & Concept Activation Vectors' },
        ]
      },
      {
        id: 'adversarial-robustness',
        slug: 'adversarial-robustness',
        name: 'Adversarial Attacks & Robustness',
        description: 'Adversarial examples, certified defenses, and robust training.',
        knowledgePoints: [
          { id: 'msaf-kp-6', slug: 'adversarial-fgsm', name: 'FGSM, PGD & C&W Adversarial Attacks' },
          { id: 'msaf-kp-7', slug: 'adversarial-training', name: 'Adversarial Training & Robust Optimization' },
          { id: 'msaf-kp-8', slug: 'certified-robustness', name: 'Certified Robustness & Randomized Smoothing' },
          { id: 'msaf-kp-9', slug: 'black-box-attacks', name: 'Transferability & Black-Box Attacks' },
          { id: 'msaf-kp-10', slug: 'prompt-injection-safety', name: 'Prompt Injection & LLM Red-Teaming' },
        ]
      },
      {
        id: 'fairness-bias',
        slug: 'fairness-bias',
        name: 'Fairness, Bias & Ethical ML',
        description: 'Fairness metrics, bias detection, and mitigation strategies.',
        knowledgePoints: [
          { id: 'msaf-kp-11', slug: 'fairness-metrics-ml', name: 'Demographic Parity & Equalized Odds' },
          { id: 'msaf-kp-12', slug: 'bias-sources-ml', name: 'Sources of Bias in Data & Models' },
          { id: 'msaf-kp-13', slug: 'bias-mitigation-ml', name: 'Bias Mitigation (Pre/In/Post-Processing)' },
          { id: 'msaf-kp-14', slug: 'model-cards-ml', name: 'Model Cards & Algorithmic Auditing' },
          { id: 'msaf-kp-15', slug: 'responsible-ai-frameworks', name: 'Responsible AI Frameworks & Governance' },
        ]
      },
      {
        id: 'distribution-shift',
        slug: 'distribution-shift',
        name: 'Distribution Shift & OOD Detection',
        description: 'Detecting covariate shift, concept drift, and out-of-distribution inputs.',
        knowledgePoints: [
          { id: 'msaf-kp-16', slug: 'covariate-shift-ml', name: 'Covariate Shift & Domain Adaptation' },
          { id: 'msaf-kp-17', slug: 'concept-drift-ml', name: 'Concept Drift Detection & Monitoring' },
          { id: 'msaf-kp-18', slug: 'ood-detection-methods', name: 'OOD Detection (Energy Score, Mahalanobis)' },
          { id: 'msaf-kp-19', slug: 'spurious-correlations', name: 'Spurious Correlations & Shortcut Learning' },
          { id: 'msaf-kp-20', slug: 'dataset-shift-eval', name: 'Evaluation Under Distribution Shift' },
        ]
      },
      {
        id: 'calibration-uncertainty',
        slug: 'calibration-uncertainty',
        name: 'Calibration & Predictive Uncertainty',
        description: 'Probability calibration, reliability diagrams, and conformal prediction.',
        knowledgePoints: [
          { id: 'msaf-kp-21', slug: 'ece-calibration', name: 'ECE & Reliability Diagrams' },
          { id: 'msaf-kp-22', slug: 'temperature-scaling-cal', name: 'Temperature Scaling & Post-Hoc Calibration' },
          { id: 'msaf-kp-23', slug: 'conformal-coverage', name: 'Conformal Prediction & Coverage Guarantees' },
          { id: 'msaf-kp-24', slug: 'selective-pred', name: 'Selective Prediction & Abstention' },
          { id: 'msaf-kp-25', slug: 'epistemic-aleatoric', name: 'Epistemic vs Aleatoric Uncertainty' },
        ]
      },
      {
        id: 'ai-safety-long-term',
        slug: 'ai-safety-long-term',
        name: 'AI Safety & Long-Term Alignment',
        description: 'Mesa-optimization, scalable oversight, and reward hacking.',
        knowledgePoints: [
          { id: 'msaf-kp-26', slug: 'mesa-optimization', name: 'Mesa-Optimization & Inner Alignment' },
          { id: 'msaf-kp-27', slug: 'scalable-oversight', name: 'Scalable Oversight & Debate' },
          { id: 'msaf-kp-28', slug: 'reward-hacking-spec', name: 'Reward Hacking & Specification Gaming' },
          { id: 'msaf-kp-29', slug: 'interp-for-safety', name: 'Interpretability for Safety Research' },
          { id: 'msaf-kp-30', slug: 'ai-governance-policy', name: 'AI Governance, Policy & Risk Frameworks' },
        ]
      },
    ]
  },

  // TIME SERIES ANALYSIS & FORECASTING
  {
    id: 'time-series-forecasting',
    slug: 'time-series-forecasting',
    name: 'Time Series Analysis & Forecasting',
    description: 'Classical statistical models, deep learning for sequences, and foundation models for time series.',
    category: 'reinforcement-learning',
    icon: '📈',
    color: '#06B6D4',
    topicCount: 8,
    estimatedHours: 30,
    topics: [
      {
        id: 'classical-time-series',
        slug: 'classical-time-series',
        name: 'Classical Time Series Models',
        description: 'ARIMA, exponential smoothing, and statistical forecasting.',
        knowledgePoints: [
          { id: 'ts-kp-1', slug: 'time-series-components', name: 'Trend, Seasonality & Stationarity' },
          { id: 'ts-kp-2', slug: 'arima', name: 'ARIMA & SARIMA Models' },
          { id: 'ts-kp-3', slug: 'exponential-smoothing', name: 'Exponential Smoothing (Holt-Winters)' },
          { id: 'ts-kp-4', slug: 'spectral-analysis', name: 'Fourier Analysis & Spectral Decomposition' },
          { id: 'ts-kp-5', slug: 'prophet-model', name: 'Facebook Prophet & Decomposition Models' },
        ]
      },
      {
        id: 'deep-time-series',
        slug: 'deep-time-series',
        name: 'Deep Learning for Time Series',
        description: 'LSTM, TCN, and Transformer-based sequence models.',
        knowledgePoints: [
          { id: 'ts-kp-6', slug: 'lstm-time-series', name: 'LSTM & GRU for Sequence Forecasting' },
          { id: 'ts-kp-7', slug: 'temporal-cnn', name: 'Temporal Convolutional Networks (TCN)' },
          { id: 'ts-kp-8', slug: 'transformer-time-series', name: 'Informer, Autoformer & Transformer Forecasting' },
          { id: 'ts-kp-9', slug: 'patchtst', name: 'PatchTST & Channel Independence' },
          { id: 'ts-kp-10', slug: 'timesnet', name: 'TimesNet & 2D Temporal Variation Modeling' },
        ]
      },
      {
        id: 'probabilistic-forecasting',
        slug: 'probabilistic-forecasting',
        name: 'Probabilistic Forecasting',
        description: 'Uncertainty quantification, conformal prediction, and distribution forecasting.',
        knowledgePoints: [
          { id: 'ts-kp-11', slug: 'quantile-regression-ts', name: 'Quantile Regression & Prediction Intervals' },
          { id: 'ts-kp-12', slug: 'deepar', name: 'DeepAR & Probabilistic Deep Learning' },
          { id: 'ts-kp-13', slug: 'normalizing-flows-ts', name: 'Normalizing Flows for Time Series' },
          { id: 'ts-kp-14', slug: 'conformal-prediction', name: 'Conformal Prediction for Time Series' },
          { id: 'ts-kp-15', slug: 'bayesian-time-series', name: 'Bayesian Structural Time Series' },
        ]
      },
      {
        id: 'anomaly-detection-ts',
        slug: 'anomaly-detection-ts',
        name: 'Anomaly Detection in Time Series',
        description: 'Statistical and deep learning methods for detecting anomalies.',
        knowledgePoints: [
          { id: 'ts-kp-16', slug: 'statistical-anomaly', name: 'Statistical Anomaly Detection (Z-Score, IQR)' },
          { id: 'ts-kp-17', slug: 'isolation-forest-ts', name: 'Isolation Forest & Unsupervised Anomaly' },
          { id: 'ts-kp-18', slug: 'lstm-anomaly', name: 'LSTM Autoencoders for Anomaly Detection' },
          { id: 'ts-kp-19', slug: 'transformers-anomaly', name: 'Transformer-Based Anomaly Detection' },
          { id: 'ts-kp-20', slug: 'real-time-anomaly', name: 'Real-Time Streaming Anomaly Detection' },
        ]
      },
      {
        id: 'ts-foundation-models',
        slug: 'ts-foundation-models',
        name: 'Time Series Foundation Models',
        description: 'Large pretrained models for universal time series forecasting.',
        knowledgePoints: [
          { id: 'ts-kp-21', slug: 'timesfm', name: 'TimesFM & Google\'s Time Series Foundation Model' },
          { id: 'ts-kp-22', slug: 'moirai', name: 'Moirai & Universal Forecasting' },
          { id: 'ts-kp-23', slug: 'chronos', name: 'Chronos & Probabilistic Foundation Forecasting' },
          { id: 'ts-kp-24', slug: 'lag-llama', name: 'Lag-Llama & Decoder-Only TS Models' },
          { id: 'ts-kp-25', slug: 'zero-shot-forecasting', name: 'Zero-Shot & Few-Shot Time Series Forecasting' },
        ]
      },
      {
        id: 'ts-applications',
        slug: 'ts-applications',
        name: 'Time Series Applications',
        description: 'Financial forecasting, demand planning, and IoT sensor analysis.',
        knowledgePoints: [
          { id: 'ts-kp-26', slug: 'financial-forecasting', name: 'Financial Time Series & Market Prediction' },
          { id: 'ts-kp-27', slug: 'demand-forecasting', name: 'Demand Forecasting & Inventory Optimization' },
          { id: 'ts-kp-28', slug: 'iot-sensor-analysis', name: 'IoT Sensor Analysis & Predictive Maintenance' },
          { id: 'ts-kp-29', slug: 'climate-forecasting', name: 'Climate & Weather Forecasting with ML' },
          { id: 'ts-kp-30', slug: 'multivariate-ts', name: 'Multivariate Time Series & Correlation' },
        ]
      },
    ]
  },

  // RECOMMENDER SYSTEMS & RANKING
  {
    id: 'recommender-systems',
    slug: 'recommender-systems',
    name: 'Recommender Systems & Ranking',
    description: 'Collaborative filtering, deep learning recommenders, and learning-to-rank for search and feeds.',
    category: 'fine-tuning',
    icon: '📚',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'collaborative-filtering',
        slug: 'collaborative-filtering',
        name: 'Collaborative Filtering',
        description: 'Matrix factorization, user-item embeddings, and memory-based CF.',
        knowledgePoints: [
          { id: 'rs-kp-1', slug: 'user-item-cf', name: 'User-Based & Item-Based Collaborative Filtering' },
          { id: 'rs-kp-2', slug: 'matrix-factorization', name: 'Matrix Factorization (SVD, ALS)' },
          { id: 'rs-kp-3', slug: 'implicit-feedback', name: 'Implicit Feedback & BPR' },
          { id: 'rs-kp-4', slug: 'neural-cf', name: 'Neural Collaborative Filtering (NCF)' },
          { id: 'rs-kp-5', slug: 'variational-autoencoders-cf', name: 'VAE for Collaborative Filtering (Mult-VAE)' },
        ]
      },
      {
        id: 'content-based-filtering',
        slug: 'content-based-filtering',
        name: 'Content-Based & Hybrid Methods',
        description: 'Feature-based recommendations, hybrid systems, and contextual bandits.',
        knowledgePoints: [
          { id: 'rs-kp-6', slug: 'content-based-filtering', name: 'Content-Based Filtering & TF-IDF Profiles' },
          { id: 'rs-kp-7', slug: 'wide-deep', name: 'Wide & Deep Learning (Google Play)' },
          { id: 'rs-kp-8', slug: 'contextual-bandits-rec', name: 'Contextual Bandits for Recommendations' },
          { id: 'rs-kp-9', slug: 'knowledge-graph-rec', name: 'Knowledge Graph Recommendations (KGAT)' },
          { id: 'rs-kp-10', slug: 'hybrid-recommendation', name: 'Hybrid Recommender Systems' },
        ]
      },
      {
        id: 'sequential-recommendations',
        slug: 'sequential-recommendations',
        name: 'Sequential & Session-Based Recommendations',
        description: 'RNN, attention, and transformer models for sequential user behavior.',
        knowledgePoints: [
          { id: 'rs-kp-11', slug: 'gru4rec', name: 'GRU4Rec & RNN-Based Session Recommendations' },
          { id: 'rs-kp-12', slug: 'bert4rec', name: 'BERT4Rec & Self-Supervised Sequential Modeling' },
          { id: 'rs-kp-13', slug: 'sasrec', name: 'SASRec & Self-Attentive Sequential Recommendations' },
          { id: 'rs-kp-14', slug: 'session-based-gnn', name: 'Session-Based GNN Recommendations (SR-GNN)' },
          { id: 'rs-kp-15', slug: 'llm-recommendations', name: 'LLM-Based Recommendations (P5, TALLRec)' },
        ]
      },
      {
        id: 'learning-to-rank',
        slug: 'learning-to-rank',
        name: 'Learning to Rank',
        description: 'Pointwise, pairwise, listwise ranking methods for search and retrieval.',
        knowledgePoints: [
          { id: 'rs-kp-16', slug: 'ranknet', name: 'RankNet & Pairwise Learning-to-Rank' },
          { id: 'rs-kp-17', slug: 'lambdarank', name: 'LambdaRank & LambdaMART' },
          { id: 'rs-kp-18', slug: 'listwise-ranking', name: 'ListNet, ListMLE & Listwise Approaches' },
          { id: 'rs-kp-19', slug: 'neural-ranking', name: 'Neural Ranking (DSSM, BERT Re-ranker)' },
          { id: 'rs-kp-20', slug: 'ndcg-map', name: 'NDCG, MAP & Ranking Evaluation Metrics' },
        ]
      },
      {
        id: 'industry-recommenders',
        slug: 'industry-recommenders',
        name: 'Industry Recommender Architectures',
        description: 'Two-tower models, retrieval-ranking pipelines, and production rec systems.',
        knowledgePoints: [
          { id: 'rs-kp-21', slug: 'two-tower-model', name: 'Two-Tower Models & ANN Retrieval' },
          { id: 'rs-kp-22', slug: 'multi-stage-ranking', name: 'Multi-Stage Ranking Pipelines' },
          { id: 'rs-kp-23', slug: 'mmoe-pgates', name: 'MMoE & Multi-Task Recommendation' },
          { id: 'rs-kp-24', slug: 'dlrm', name: 'DLRM & Facebook Recommendation Architecture' },
          { id: 'rs-kp-25', slug: 'feature-cross', name: 'Feature Crossing (DeepFM, xDeepFM)' },
        ]
      },
      {
        id: 'rec-system-challenges',
        slug: 'rec-system-challenges',
        name: 'Recommender System Challenges',
        description: 'Cold start, filter bubbles, diversity, and online learning.',
        knowledgePoints: [
          { id: 'rs-kp-26', slug: 'cold-start', name: 'Cold Start Problem & Solutions' },
          { id: 'rs-kp-27', slug: 'diversity-serendipity', name: 'Diversity, Serendipity & Beyond Accuracy' },
          { id: 'rs-kp-28', slug: 'filter-bubble', name: 'Filter Bubbles, Bias & Fairness in Recs' },
          { id: 'rs-kp-29', slug: 'online-learning-rec', name: 'Online Learning & Real-Time Personalization' },
          { id: 'rs-kp-30', slug: 'causal-recommendation', name: 'Causal Recommendation & Debiasing' },
        ]
      },
    ]
  },

  // MULTIMODAL LEARNING & FOUNDATION MODELS
  {
    id: 'multimodal-learning',
    slug: 'multimodal-learning',
    name: 'Multimodal Learning & Foundation Models',
    description: 'Vision-language models, audio-visual learning, and large multimodal foundation models.',
    category: 'fine-tuning',
    icon: '📚',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'vision-language-models',
        slug: 'vision-language-models',
        name: 'Vision-Language Models',
        description: 'CLIP, ALIGN, and contrastive vision-language pretraining.',
        knowledgePoints: [
          { id: 'ml2-kp-1', slug: 'clip-model', name: 'CLIP & Contrastive Language-Image Pretraining' },
          { id: 'ml2-kp-2', slug: 'align-coca', name: 'ALIGN, CoCa & Scaling VLP' },
          { id: 'ml2-kp-3', slug: 'visual-grounding', name: 'Visual Grounding & Referring Expression' },
          { id: 'ml2-kp-4', slug: 'image-text-retrieval', name: 'Image-Text Retrieval & Cross-Modal Search' },
          { id: 'ml2-kp-5', slug: 'zero-shot-vision', name: 'Zero-Shot Image Classification with VLMs' },
        ]
      },
      {
        id: 'large-multimodal-models',
        slug: 'large-multimodal-models',
        name: 'Large Multimodal Models (LMMs)',
        description: 'GPT-4V, LLaVA, Gemini, and instruction-tuned multimodal LLMs.',
        knowledgePoints: [
          { id: 'ml2-kp-6', slug: 'llava', name: 'LLaVA & Visual Instruction Tuning' },
          { id: 'ml2-kp-7', slug: 'flamingo', name: 'Flamingo & Few-Shot Multimodal Learning' },
          { id: 'ml2-kp-8', slug: 'gemini-architecture', name: 'Gemini Architecture & Native Multimodality' },
          { id: 'ml2-kp-9', slug: 'gpt4v-capabilities', name: 'GPT-4V & Vision Capabilities' },
          { id: 'ml2-kp-10', slug: 'multimodal-rag', name: 'Multimodal RAG & Document Understanding' },
        ]
      },
      {
        id: 'audio-speech-models',
        slug: 'audio-speech-models',
        name: 'Audio, Speech & Music Models',
        description: 'Whisper, speech synthesis, music generation, and audio-visual models.',
        knowledgePoints: [
          { id: 'ml2-kp-11', slug: 'whisper-asr', name: 'Whisper & End-to-End ASR' },
          { id: 'ml2-kp-12', slug: 'tts-models', name: 'TTS (VITS, NaturalSpeech, Bark)' },
          { id: 'ml2-kp-13', slug: 'music-generation', name: 'Music Generation (MusicGen, AudioCraft)' },
          { id: 'ml2-kp-14', slug: 'audio-visual-learning', name: 'Audio-Visual Learning & Video Understanding' },
          { id: 'ml2-kp-15', slug: 'speech-llm', name: 'Speech LLMs & Voice Assistants' },
        ]
      },
      {
        id: 'foundation-model-theory',
        slug: 'foundation-model-theory',
        name: 'Foundation Model Theory & Scaling',
        description: 'Scaling laws, emergent abilities, and foundation model training.',
        knowledgePoints: [
          { id: 'ml2-kp-16', slug: 'scaling-laws-mm', name: 'Scaling Laws for Multimodal Models' },
          { id: 'ml2-kp-17', slug: 'emergent-abilities', name: 'Emergent Abilities & Phase Transitions' },
          { id: 'ml2-kp-18', slug: 'pretraining-data', name: 'Pretraining Data Curation & Quality' },
          { id: 'ml2-kp-19', slug: 'modality-alignment', name: 'Modality Alignment & Cross-Modal Fusion' },
          { id: 'ml2-kp-20', slug: 'mixture-of-experts-mm', name: 'Mixture of Experts for Multimodal Models' },
        ]
      },
      {
        id: 'embodied-ai',
        slug: 'embodied-ai',
        name: 'Embodied AI & Robotics Foundation Models',
        description: 'RT-2, Gato, and foundation models for robot control.',
        knowledgePoints: [
          { id: 'ml2-kp-21', slug: 'rt2-model', name: 'RT-2 & Vision-Language-Action Models' },
          { id: 'ml2-kp-22', slug: 'gato-generalist', name: 'Gato & Generalist Agent Models' },
          { id: 'ml2-kp-23', slug: 'embodied-qa', name: 'Embodied QA & Visual Navigation' },
          { id: 'ml2-kp-24', slug: 'world-model-robotics', name: 'World Models for Robot Planning' },
          { id: 'ml2-kp-25', slug: 'sim-to-real', name: 'Sim-to-Real Transfer & Domain Randomization' },
        ]
      },
      {
        id: 'multimodal-evaluation',
        slug: 'multimodal-evaluation',
        name: 'Multimodal Evaluation & Benchmarks',
        description: 'Benchmarks for VQA, image captioning, and multimodal reasoning.',
        knowledgePoints: [
          { id: 'ml2-kp-26', slug: 'vqa-benchmarks', name: 'VQA, GQA & Visual Reasoning Benchmarks' },
          { id: 'ml2-kp-27', slug: 'mmmu-benchmark', name: 'MMMU & Multi-Discipline Multimodal Benchmarks' },
          { id: 'ml2-kp-28', slug: 'hallucination-multimodal', name: 'Hallucination in Multimodal Models' },
          { id: 'ml2-kp-29', slug: 'multimodal-safety', name: 'Multimodal Safety & Red-Teaming' },
          { id: 'ml2-kp-30', slug: 'eval-infrastructure', name: 'Evaluation Infrastructure & Leaderboards' },
        ]
      },
    ]
  },

  // EFFICIENT ML & MODEL COMPRESSION
  {
    id: 'efficient-ml',
    slug: 'efficient-ml',
    name: 'Efficient ML & Model Compression',
    description: 'Quantization, pruning, distillation, and hardware-aware ML for edge and production deployment.',
    category: 'fine-tuning',
    icon: '📚',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'quantization',
        slug: 'quantization',
        name: 'Quantization',
        description: 'Post-training and quantization-aware training for efficient inference.',
        knowledgePoints: [
          { id: 'em-kp-1', slug: 'quantization-basics', name: 'Quantization Fundamentals (INT8, INT4, FP8)' },
          { id: 'em-kp-2', slug: 'post-training-quantization', name: 'Post-Training Quantization (PTQ)' },
          { id: 'em-kp-3', slug: 'quantization-aware-training', name: 'Quantization-Aware Training (QAT)' },
          { id: 'em-kp-4', slug: 'gptq-gguf', name: 'GPTQ, GGUF & LLM Quantization' },
          { id: 'em-kp-5', slug: 'awq-squeezellm', name: 'AWQ, SqueezeLLM & Activation-Aware Quantization' },
        ]
      },
      {
        id: 'pruning',
        slug: 'pruning',
        name: 'Neural Network Pruning',
        description: 'Magnitude pruning, structured pruning, and sparse neural networks.',
        knowledgePoints: [
          { id: 'em-kp-6', slug: 'magnitude-pruning', name: 'Magnitude Pruning & Weight Sparsity' },
          { id: 'em-kp-7', slug: 'structured-pruning', name: 'Structured Pruning (Channel, Head, Layer)' },
          { id: 'em-kp-8', slug: 'lottery-ticket', name: 'Lottery Ticket Hypothesis' },
          { id: 'em-kp-9', slug: 'sparseGPT', name: 'SparseGPT & Wanda for LLM Pruning' },
          { id: 'em-kp-10', slug: 'dynamic-sparse', name: 'Dynamic Sparse Training (DST, RiGL)' },
        ]
      },
      {
        id: 'knowledge-distillation',
        slug: 'knowledge-distillation',
        name: 'Knowledge Distillation',
        description: 'Teacher-student training, logit distillation, and feature-level transfer.',
        knowledgePoints: [
          { id: 'em-kp-11', slug: 'hinton-distillation', name: 'Hinton\'s Knowledge Distillation & Soft Labels' },
          { id: 'em-kp-12', slug: 'feature-distillation', name: 'Feature-Level & Intermediate Distillation' },
          { id: 'em-kp-13', slug: 'self-distillation', name: 'Self-Distillation & Born-Again Networks' },
          { id: 'em-kp-14', slug: 'llm-distillation', name: 'LLM Distillation (MiniLLM, Distil-Whisper)' },
          { id: 'em-kp-15', slug: 'task-agnostic-distillation', name: 'Task-Agnostic vs Task-Specific Distillation' },
        ]
      },
      {
        id: 'neural-architecture-search',
        slug: 'neural-architecture-search',
        name: 'Neural Architecture Search',
        description: 'AutoML, NAS methods, and efficient architecture design.',
        knowledgePoints: [
          { id: 'em-kp-16', slug: 'nas-intro', name: 'NAS Overview & Search Spaces' },
          { id: 'em-kp-17', slug: 'darts', name: 'DARTS & Gradient-Based NAS' },
          { id: 'em-kp-18', slug: 'efficientnet', name: 'EfficientNet & Compound Scaling' },
          { id: 'em-kp-19', slug: 'once-for-all', name: 'Once-For-All & Slimmable Networks' },
          { id: 'em-kp-20', slug: 'hardware-aware-nas', name: 'Hardware-Aware NAS & Latency Constraints' },
        ]
      },
      {
        id: 'hardware-ml',
        slug: 'hardware-ml',
        name: 'Hardware Acceleration & Edge ML',
        description: 'GPU/TPU/NPU optimization, CUDA programming, and edge deployment.',
        knowledgePoints: [
          { id: 'em-kp-21', slug: 'gpu-programming-ml', name: 'GPU Architecture & CUDA for ML' },
          { id: 'em-kp-22', slug: 'tpu-xla', name: 'TPU Architecture & XLA Compilation' },
          { id: 'em-kp-23', slug: 'operator-fusion', name: 'Operator Fusion & Kernel Optimization' },
          { id: 'em-kp-24', slug: 'tflite-coreml', name: 'TFLite, Core ML & Edge Deployment' },
          { id: 'em-kp-25', slug: 'tensor-parallelism', name: 'Tensor & Pipeline Parallelism' },
        ]
      },
      {
        id: 'inference-optimization',
        slug: 'inference-optimization',
        name: 'Inference Optimization',
        description: 'vLLM, Flash Attention, speculative decoding, and serving optimization.',
        knowledgePoints: [
          { id: 'em-kp-26', slug: 'flash-attention-opt', name: 'Flash Attention & Memory-Efficient Attention' },
          { id: 'em-kp-27', slug: 'vllm-serving', name: 'vLLM & PagedAttention for LLM Serving' },
          { id: 'em-kp-28', slug: 'speculative-decoding-opt', name: 'Speculative Decoding & Draft Models' },
          { id: 'em-kp-29', slug: 'batching-strategies', name: 'Dynamic Batching & Continuous Batching' },
          { id: 'em-kp-30', slug: 'mlc-llm', name: 'MLC-LLM & Universal LLM Deployment' },
        ]
      },
    ]
  },

  // FEDERATED LEARNING & PRIVACY-PRESERVING ML
  {
    id: 'federated-learning',
    slug: 'federated-learning',
    name: 'Federated Learning & Privacy-Preserving ML',
    description: 'Train ML models across distributed data without centralization, using privacy guarantees.',
    category: 'fine-tuning',
    icon: '📚',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'federated-foundations',
        slug: 'federated-foundations',
        name: 'Federated Learning Foundations',
        description: 'FL setup, FedAvg, and the challenges of distributed training.',
        knowledgePoints: [
          { id: 'fl-kp-1', slug: 'federated-learning-intro', name: 'Federated Learning Setup & Motivation' },
          { id: 'fl-kp-2', slug: 'fedavg', name: 'FedAvg & Federated Optimization' },
          { id: 'fl-kp-3', slug: 'non-iid-data', name: 'Non-IID Data & Statistical Heterogeneity' },
          { id: 'fl-kp-4', slug: 'communication-efficiency', name: 'Communication Efficiency & Compression' },
          { id: 'fl-kp-5', slug: 'federated-evaluation', name: 'Federated Evaluation & Model Aggregation' },
        ]
      },
      {
        id: 'differential-privacy',
        slug: 'differential-privacy',
        name: 'Differential Privacy',
        description: 'DP fundamentals, DP-SGD, and privacy accounting.',
        knowledgePoints: [
          { id: 'fl-kp-6', slug: 'dp-definition', name: 'Differential Privacy Definition & Composition' },
          { id: 'fl-kp-7', slug: 'dp-sgd', name: 'DP-SGD & Gradient Clipping' },
          { id: 'fl-kp-8', slug: 'privacy-accounting', name: 'Privacy Accounting (Rényi DP, Moments Accountant)' },
          { id: 'fl-kp-9', slug: 'local-dp', name: 'Local Differential Privacy & Randomized Response' },
          { id: 'fl-kp-10', slug: 'dp-fine-tuning', name: 'DP Fine-Tuning for LLMs' },
        ]
      },
      {
        id: 'secure-computation',
        slug: 'secure-computation',
        name: 'Secure Multi-Party Computation',
        description: 'Cryptographic protocols for privacy-preserving ML.',
        knowledgePoints: [
          { id: 'fl-kp-11', slug: 'secure-aggregation', name: 'Secure Aggregation Protocols' },
          { id: 'fl-kp-12', slug: 'homomorphic-encryption', name: 'Homomorphic Encryption for ML' },
          { id: 'fl-kp-13', slug: 'secret-sharing', name: 'Secret Sharing & MPC Protocols' },
          { id: 'fl-kp-14', slug: 'trusted-execution', name: 'Trusted Execution Environments (TEE)' },
          { id: 'fl-kp-15', slug: 'smpc-inference', name: 'SMPC for Private Inference' },
        ]
      },
      {
        id: 'robust-federated',
        slug: 'robust-federated',
        name: 'Robust & Byzantine-Tolerant FL',
        description: 'Defending against poisoning attacks and Byzantine clients in FL.',
        knowledgePoints: [
          { id: 'fl-kp-16', slug: 'byzantine-attacks', name: 'Byzantine Attacks & Poisoning in FL' },
          { id: 'fl-kp-17', slug: 'robust-aggregation', name: 'Robust Aggregation (Krum, Trimmed Mean)' },
          { id: 'fl-kp-18', slug: 'membership-inference', name: 'Membership Inference & Reconstruction Attacks' },
          { id: 'fl-kp-19', slug: 'model-poisoning', name: 'Model Poisoning & Backdoor Attacks' },
          { id: 'fl-kp-20', slug: 'fairness-federated', name: 'Fairness in Federated Learning' },
        ]
      },
      {
        id: 'personalized-fl',
        slug: 'personalized-fl',
        name: 'Personalized Federated Learning',
        description: 'Per-client adaptation, meta-learning in FL, and hybrid approaches.',
        knowledgePoints: [
          { id: 'fl-kp-21', slug: 'personalized-fl-intro', name: 'Personalized FL & Client Drift' },
          { id: 'fl-kp-22', slug: 'maml-federated', name: 'MAML for Federated Meta-Learning' },
          { id: 'fl-kp-23', slug: 'fedprox', name: 'FedProx & Heterogeneity-Robust FL' },
          { id: 'fl-kp-24', slug: 'split-learning', name: 'Split Learning & Vertical FL' },
          { id: 'fl-kp-25', slug: 'fl-llm', name: 'Federated Learning for LLMs' },
        ]
      },
      {
        id: 'privacy-ml-applications',
        slug: 'privacy-ml-applications',
        name: 'Privacy-Preserving ML Applications',
        description: 'Healthcare, finance, and industry applications of privacy-preserving ML.',
        knowledgePoints: [
          { id: 'fl-kp-26', slug: 'healthcare-fl', name: 'FL in Healthcare & Medical Imaging' },
          { id: 'fl-kp-27', slug: 'finance-fl', name: 'FL in Finance & Fraud Detection' },
          { id: 'fl-kp-28', slug: 'gdpr-ml', name: 'GDPR, CCPA & ML Compliance' },
          { id: 'fl-kp-29', slug: 'machine-unlearning', name: 'Machine Unlearning & Right to be Forgotten' },
          { id: 'fl-kp-30', slug: 'synthetic-data', name: 'Synthetic Data Generation for Privacy' },
        ]
      },
    ]
  },

  // CAUSAL INFERENCE & CAUSAL ML
  {
    id: 'causal-inference',
    slug: 'causal-inference',
    name: 'Causal Inference & Causal ML',
    description: 'Causal reasoning, treatment effect estimation, and causal machine learning methods.',
    category: 'fine-tuning',
    icon: '📚',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'causal-foundations',
        slug: 'causal-foundations',
        name: 'Causal Reasoning Foundations',
        description: 'Correlation vs causation, potential outcomes, and structural causal models.',
        knowledgePoints: [
          { id: 'ci-kp-1', slug: 'correlation-vs-causation', name: 'Correlation vs Causation' },
          { id: 'ci-kp-2', slug: 'potential-outcomes', name: 'Potential Outcomes Framework (Rubin Causal Model)' },
          { id: 'ci-kp-3', slug: 'structural-causal-models', name: 'Structural Causal Models (SCMs)' },
          { id: 'ci-kp-4', slug: 'causal-graphs-dags', name: 'Causal Graphs & DAGs' },
          { id: 'ci-kp-5', slug: 'do-calculus', name: 'do-Calculus & Interventional Distributions' },
        ]
      },
      {
        id: 'treatment-effects',
        slug: 'treatment-effects',
        name: 'Treatment Effect Estimation',
        description: 'ATE, ATT, CATE, and methods for estimating causal effects from data.',
        knowledgePoints: [
          { id: 'ci-kp-6', slug: 'ate-att', name: 'ATE, ATT & Average Treatment Effects' },
          { id: 'ci-kp-7', slug: 'randomized-experiments', name: 'Randomized Controlled Trials & A/B Tests' },
          { id: 'ci-kp-8', slug: 'propensity-score', name: 'Propensity Score Matching & Weighting' },
          { id: 'ci-kp-9', slug: 'instrumental-variables', name: 'Instrumental Variables (IV)' },
          { id: 'ci-kp-10', slug: 'difference-in-differences', name: 'Difference-in-Differences (DiD)' },
        ]
      },
      {
        id: 'causal-discovery',
        slug: 'causal-discovery',
        name: 'Causal Discovery',
        description: 'Learning causal structure from observational data.',
        knowledgePoints: [
          { id: 'ci-kp-11', slug: 'pc-algorithm', name: 'PC Algorithm & Constraint-Based Methods' },
          { id: 'ci-kp-12', slug: 'ges-algorithm', name: 'GES & Score-Based Causal Discovery' },
          { id: 'ci-kp-13', slug: 'lingam', name: 'LiNGAM & Functional Causal Models' },
          { id: 'ci-kp-14', slug: 'neural-causal-discovery', name: 'Neural Causal Discovery (NOTEARS, DAG-GNN)' },
          { id: 'ci-kp-15', slug: 'time-series-causality', name: 'Granger Causality & Time Series Causal Discovery' },
        ]
      },
      {
        id: 'heterogeneous-effects',
        slug: 'heterogeneous-effects',
        name: 'Heterogeneous Treatment Effects',
        description: 'CATE estimation, meta-learners, and causal forests.',
        knowledgePoints: [
          { id: 'ci-kp-16', slug: 'cate-estimation', name: 'CATE Estimation & Subgroup Analysis' },
          { id: 'ci-kp-17', slug: 'meta-learners', name: 'Meta-Learners (S, T, X, R-Learner)' },
          { id: 'ci-kp-18', slug: 'causal-forests', name: 'Causal Forests & Generalized Random Forests' },
          { id: 'ci-kp-19', slug: 'double-ml', name: 'Double/Debiased Machine Learning (DML)' },
          { id: 'ci-kp-20', slug: 'regression-discontinuity', name: 'Regression Discontinuity Design (RDD)' },
        ]
      },
      {
        id: 'causal-representation',
        slug: 'causal-representation',
        name: 'Causal Representation Learning',
        description: 'Learning disentangled, causal representations and domain generalization.',
        knowledgePoints: [
          { id: 'ci-kp-21', slug: 'disentangled-representations', name: 'Disentangled Causal Representations' },
          { id: 'ci-kp-22', slug: 'independent-causal-mechanisms', name: 'Independent Causal Mechanisms (ICM)' },
          { id: 'ci-kp-23', slug: 'invariant-risk-minimization', name: 'Invariant Risk Minimization (IRM)' },
          { id: 'ci-kp-24', slug: 'counterfactual-reasoning', name: 'Counterfactual Reasoning in ML' },
          { id: 'ci-kp-25', slug: 'causal-ood', name: 'Causal OOD Generalization' },
        ]
      },
      {
        id: 'causal-applications',
        slug: 'causal-applications',
        name: 'Causal ML Applications',
        description: 'Uplift modeling, policy learning, and causal fairness.',
        knowledgePoints: [
          { id: 'ci-kp-26', slug: 'uplift-modeling', name: 'Uplift Modeling & Personalized Interventions' },
          { id: 'ci-kp-27', slug: 'policy-learning', name: 'Optimal Policy Learning & Decision Making' },
          { id: 'ci-kp-28', slug: 'causal-fairness', name: 'Causal Fairness & Algorithmic Bias' },
          { id: 'ci-kp-29', slug: 'mediation-analysis', name: 'Mediation Analysis & Path-Specific Effects' },
          { id: 'ci-kp-30', slug: 'causal-llms', name: 'Causal Reasoning in LLMs' },
        ]
      },
    ]
  },

  // DIFFUSION MODELS & GENERATIVE AI
  {
    id: 'diffusion-models',
    slug: 'diffusion-models',
    name: 'Diffusion Models & Generative AI',
    description: 'Score-based models, DDPM, latent diffusion, and state-of-the-art image/audio/video generation.',
    category: 'fine-tuning',
    icon: '📚',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'diffusion-foundations',
        slug: 'diffusion-foundations',
        name: 'Diffusion Model Foundations',
        description: 'Forward process, reverse denoising, and the DDPM framework.',
        knowledgePoints: [
          { id: 'diff-kp-1', slug: 'forward-diffusion-process', name: 'Forward Diffusion Process & Noise Scheduling' },
          { id: 'diff-kp-2', slug: 'ddpm', name: 'Denoising Diffusion Probabilistic Models (DDPM)' },
          { id: 'diff-kp-3', slug: 'score-matching', name: 'Score Matching & Score-Based Models' },
          { id: 'diff-kp-4', slug: 'ddim', name: 'DDIM & Accelerated Sampling' },
          { id: 'diff-kp-5', slug: 'classifier-free-guidance', name: 'Classifier-Free Guidance (CFG)' },
        ]
      },
      {
        id: 'latent-diffusion',
        slug: 'latent-diffusion',
        name: 'Latent Diffusion & Stable Diffusion',
        description: 'Latent space diffusion, text-to-image, and Stable Diffusion architecture.',
        knowledgePoints: [
          { id: 'diff-kp-6', slug: 'latent-diffusion-models', name: 'Latent Diffusion Models (LDM)' },
          { id: 'diff-kp-7', slug: 'stable-diffusion-arch', name: 'Stable Diffusion Architecture (VAE + UNet + CLIP)' },
          { id: 'diff-kp-8', slug: 'controlnet', name: 'ControlNet & Conditional Generation' },
          { id: 'diff-kp-9', slug: 'lora-diffusion', name: 'LoRA Fine-Tuning for Diffusion Models' },
          { id: 'diff-kp-10', slug: 'inpainting-outpainting', name: 'Inpainting, Outpainting & Image Editing' },
        ]
      },
      {
        id: 'advanced-diffusion',
        slug: 'advanced-diffusion',
        name: 'Advanced Diffusion Architectures',
        description: 'DiT, flow matching, consistency models, and rectified flow.',
        knowledgePoints: [
          { id: 'diff-kp-11', slug: 'dit', name: 'Diffusion Transformers (DiT)' },
          { id: 'diff-kp-12', slug: 'flow-matching', name: 'Flow Matching & Rectified Flow' },
          { id: 'diff-kp-13', slug: 'consistency-models', name: 'Consistency Models & Distillation' },
          { id: 'diff-kp-14', slug: 'sdxl', name: 'SDXL & High-Resolution Generation' },
          { id: 'diff-kp-15', slug: 'flux-model', name: 'FLUX & Next-Gen Diffusion Models' },
        ]
      },
      {
        id: 'video-audio-generation',
        slug: 'video-audio-generation',
        name: 'Video & Audio Generation',
        description: 'Temporal diffusion, text-to-video, and audio synthesis models.',
        knowledgePoints: [
          { id: 'diff-kp-16', slug: 'video-diffusion', name: 'Video Diffusion Models (Sora, CogVideo)' },
          { id: 'diff-kp-17', slug: 'audio-diffusion', name: 'Audio Diffusion (AudioLDM, Stable Audio)' },
          { id: 'diff-kp-18', slug: '3d-generation', name: '3D Generation (NeRF, Gaussian Splatting)' },
          { id: 'diff-kp-19', slug: 'motion-generation', name: 'Motion & Avatar Generation' },
          { id: 'diff-kp-20', slug: 'world-models', name: 'World Models & Simulation' },
        ]
      },
      {
        id: 'diffusion-training',
        slug: 'diffusion-training',
        name: 'Training & Fine-Tuning Diffusion Models',
        description: 'DreamBooth, textual inversion, RLHF for diffusion, and efficient training.',
        knowledgePoints: [
          { id: 'diff-kp-21', slug: 'dreambooth', name: 'DreamBooth & Few-Shot Personalization' },
          { id: 'diff-kp-22', slug: 'textual-inversion', name: 'Textual Inversion & Concept Embedding' },
          { id: 'diff-kp-23', slug: 'rlhf-diffusion', name: 'RLHF for Diffusion (DDPO, DPO-Diffusion)' },
          { id: 'diff-kp-24', slug: 'distillation-diffusion', name: 'Knowledge Distillation for Fast Inference' },
          { id: 'diff-kp-25', slug: 'diffusion-eval', name: 'Evaluation Metrics (FID, CLIP Score, IS)' },
        ]
      },
      {
        id: 'diffusion-applications',
        slug: 'diffusion-applications',
        name: 'Diffusion Applications & Multimodal',
        description: 'Real-world applications in science, medicine, and multimodal generation.',
        knowledgePoints: [
          { id: 'diff-kp-26', slug: 'molecular-generation', name: 'Molecular Generation with Diffusion' },
          { id: 'diff-kp-27', slug: 'medical-imaging-diffusion', name: 'Medical Imaging & Anomaly Detection' },
          { id: 'diff-kp-28', slug: 'image-restoration', name: 'Image Restoration & Super-Resolution' },
          { id: 'diff-kp-29', slug: 'multimodal-diffusion', name: 'Multimodal Diffusion (Image + Text + Audio)' },
          { id: 'diff-kp-30', slug: 'diffusion-agents', name: 'Diffusion Models as World Model Agents' },
        ]
      },
    ]
  },

  // GRAPH NEURAL NETWORKS & GEOMETRIC DEEP LEARNING
  {
    id: 'graph-neural-networks',
    slug: 'graph-neural-networks',
    name: 'Graph Neural Networks & Geometric DL',
    description: 'Message passing, graph convolutions, and geometric deep learning for structured data.',
    category: 'fine-tuning',
    icon: '📚',
    color: '#8B5CF6',
    topicCount: 6,
    estimatedHours: 25,
    topics: [
      {
        id: 'graph-foundations',
        slug: 'graph-foundations',
        name: 'Graph Theory & Representations',
        description: 'Graph data structures, adjacency matrices, and graph properties for ML.',
        knowledgePoints: [
          { id: 'gnn-kp-1', slug: 'graph-representations', name: 'Graph Representations & Adjacency Matrices' },
          { id: 'gnn-kp-2', slug: 'graph-laplacian', name: 'Graph Laplacian & Spectral Properties' },
          { id: 'gnn-kp-3', slug: 'graph-features', name: 'Node, Edge & Graph-Level Features' },
          { id: 'gnn-kp-4', slug: 'heterogeneous-graphs', name: 'Heterogeneous & Dynamic Graphs' },
          { id: 'gnn-kp-5', slug: 'graph-datasets', name: 'Graph Datasets & Benchmarks (OGB, TU)' },
        ]
      },
      {
        id: 'message-passing',
        slug: 'message-passing',
        name: 'Message Passing Neural Networks',
        description: 'MPNN framework, aggregation functions, and graph convolution variants.',
        knowledgePoints: [
          { id: 'gnn-kp-6', slug: 'mpnn-framework', name: 'Message Passing Neural Network (MPNN) Framework' },
          { id: 'gnn-kp-7', slug: 'gcn', name: 'Graph Convolutional Networks (GCN)' },
          { id: 'gnn-kp-8', slug: 'graphsage', name: 'GraphSAGE & Inductive Learning' },
          { id: 'gnn-kp-9', slug: 'gat', name: 'Graph Attention Networks (GAT)' },
          { id: 'gnn-kp-10', slug: 'gin', name: 'Graph Isomorphism Networks (GIN)' },
        ]
      },
      {
        id: 'graph-transformers',
        slug: 'graph-transformers',
        name: 'Graph Transformers & Scalable GNNs',
        description: 'Attention mechanisms on graphs, scalable training, and graph foundation models.',
        knowledgePoints: [
          { id: 'gnn-kp-11', slug: 'graph-transformer', name: 'Graph Transformers & Global Attention' },
          { id: 'gnn-kp-12', slug: 'positional-encoding-graphs', name: 'Positional Encoding for Graphs' },
          { id: 'gnn-kp-13', slug: 'scalable-gnn', name: 'Scalable GNNs (Cluster-GCN, GraphBELL)' },
          { id: 'gnn-kp-14', slug: 'over-smoothing', name: 'Over-Smoothing & Over-Squashing' },
          { id: 'gnn-kp-15', slug: 'gnn-expressiveness', name: 'GNN Expressiveness & WL Test' },
        ]
      },
      {
        id: 'graph-generative',
        slug: 'graph-generative',
        name: 'Graph Generation & Molecular ML',
        description: 'Generating graphs, molecular property prediction, and drug discovery.',
        knowledgePoints: [
          { id: 'gnn-kp-16', slug: 'graph-vae', name: 'Graph VAE & Generative Models' },
          { id: 'gnn-kp-17', slug: 'mol-property-prediction', name: 'Molecular Property Prediction' },
          { id: 'gnn-kp-18', slug: 'drug-discovery-gnn', name: 'Drug Discovery with GNNs' },
          { id: 'gnn-kp-19', slug: 'diffusion-graphs', name: 'Diffusion Models for Graph Generation' },
          { id: 'gnn-kp-20', slug: 'protein-structure', name: 'Protein Structure Prediction (AlphaFold)' },
        ]
      },
      {
        id: 'knowledge-graphs',
        slug: 'knowledge-graphs',
        name: 'Knowledge Graphs & Link Prediction',
        description: 'Knowledge graph embeddings, relation learning, and reasoning.',
        knowledgePoints: [
          { id: 'gnn-kp-21', slug: 'knowledge-graph-embeddings', name: 'Knowledge Graph Embeddings (TransE, RotatE)' },
          { id: 'gnn-kp-22', slug: 'link-prediction', name: 'Link Prediction & Graph Completion' },
          { id: 'gnn-kp-23', slug: 'relation-networks', name: 'Relational Networks & Reasoning' },
          { id: 'gnn-kp-24', slug: 'graph-rag', name: 'Graph RAG & Knowledge-Augmented LLMs' },
          { id: 'gnn-kp-25', slug: 'temporal-knowledge-graphs', name: 'Temporal Knowledge Graphs' },
        ]
      },
      {
        id: 'geometric-dl',
        slug: 'geometric-dl',
        name: 'Geometric Deep Learning',
        description: 'Symmetry, equivariance, and learning on manifolds and point clouds.',
        knowledgePoints: [
          { id: 'gnn-kp-26', slug: 'equivariance-symmetry', name: 'Equivariance & Symmetry in Neural Networks' },
          { id: 'gnn-kp-27', slug: 'point-clouds', name: 'Point Cloud Learning (PointNet, PointNet++)' },
          { id: 'gnn-kp-28', slug: 'mesh-neural-networks', name: 'Mesh & Surface Neural Networks' },
          { id: 'gnn-kp-29', slug: 'se3-equivariant', name: 'SE(3)-Equivariant Networks' },
          { id: 'gnn-kp-30', slug: 'topological-dl', name: 'Topological Deep Learning & TDA' },
        ]
      },
    ]
  },

  {
    id: 'probabilistic-ml',
    slug: 'probabilistic-ml',
    name: 'Probabilistic ML & Bayesian Methods',
    description: 'Master probabilistic modeling, Bayesian inference, and uncertainty quantification in ML.',
    category: 'fine-tuning',
    icon: '📊',
    color: '#FF6B35',
    topicCount: 6,
    estimatedHours: 30,
    topics: [
      {
        id: 'probabilistic-basics',
        slug: 'probabilistic-basics',
        name: 'Probabilistic Modeling Basics',
        description: 'Foundations of probability theory and Bayesian inference.',
        knowledgePoints: [
          { id: 'pm-kp-1', slug: 'probability-review', name: 'Probability Review & Bayes\' Theorem' },
          { id: 'pm-kp-2', slug: 'random-variables', name: 'Random Variables & Distributions' },
          { id: 'pm-kp-3', slug: 'joint-probabilities', name: 'Joint & Conditional Probabilities' },
          { id: 'pm-kp-4', slug: 'bayesian-inference', name: 'Bayesian Inference Fundamentals' },
          { id: 'pm-kp-5', slug: 'conjugate-priors', name: 'Conjugate Priors & Analytical Solutions' },
        ]
      },
      {
        id: 'bayesian-inference',
        slug: 'bayesian-inference',
        name: 'Bayesian Inference',
        description: 'Advanced techniques for Bayesian parameter estimation and inference.',
        knowledgePoints: [
          { id: 'pm-kp-6', slug: 'mcmc-sampling', name: 'MCMC Sampling (Metropolis-Hastings, Gibbs)' },
          { id: 'pm-kp-7', slug: 'variational-bayes', name: 'Variational Bayes & Approximate Inference' },
          { id: 'pm-kp-8', slug: 'bayesian-optimization', name: 'Bayesian Optimization for Hyperparameter Tuning' },
          { id: 'pm-kp-9', slug: 'bayesian-ml', name: 'Bayesian ML & Model Selection' },
          { id: 'pm-kp-10', slug: 'uncertainty-propagation', name: 'Uncertainty Propagation & Predictive Distributions' },
        ]
      },
      {
        id: 'ml-with-uncertainty',
        slug: 'ml-with-uncertainty',
        name: 'ML with Uncertainty Quantification',
        description: 'Integrate uncertainty estimates into ML workflows and decision-making.',
        knowledgePoints: [
          { id: 'pm-kp-11', slug: 'uncertainty-estimation', name: 'Uncertainty Estimation & Calibration' },
          { id: 'pm-kp-12', slug: 'robust-prediction', name: 'Robust Prediction Intervals & Quantiles' },
          { id: 'pm-kp-13', slug: 'bayesian-decision-making', name: 'Bayesian Decision Making & Risk Assessment' },
          { id: 'pm-kp-14', slug: 'uncertainty-visualization', name: 'Uncertainty Visualization & Explanation' },
          { id: 'pm-kp-15', slug: 'ml-uncertainty', name: 'ML Uncertainty & Calibration' },
        ]
      },
      {
        id: 'generative-probabilistic',
        slug: 'generative-probabilistic',
        name: 'Generative Probabilistic Models',
        description: 'Model-based approaches to generative tasks using probabilistic inference.',
        knowledgePoints: [
          { id: 'pm-kp-16', slug: 'generative-models', name: 'Generative Models (Naive Bayes, Gaussian Mixtures)' },
          { id: 'pm-kp-17', slug: 'probabilistic-gans', name: 'Probabilistic GANs & Energy-Based Models' },
          { id: 'pm-kp-18', slug: 'variational-autoencoders', name: 'Variational Autoencoders (VAEs)' },
          { id: 'pm-kp-19', slug: 'normalizing-flows', name: 'Normalizing Flows & Density Estimation' },
          { id: 'pm-kp-20', slug: 'bayesian-gans', name: 'Bayesian GANs & Uncertainty Quantification' },
        ]
      },
      {
        id: 'bayesian-optimization',
        slug: 'bayesian-optimization',
        name: 'Bayesian Optimization',
        description: 'Optimization techniques that use probabilistic models to guide search.',
        knowledgePoints: [
          { id: 'pm-kp-21', slug: 'bayesian-optimization', name: 'Bayesian Optimization (BO)' },
          { id: 'pm-kp-22', slug: 'gaussian-processes', name: 'Gaussian Processes & BO' },
          { id: 'pm-kp-23', slug: 'bayesian-active-learning', name: 'Bayesian Active Learning & Data Selection' },
          { id: 'pm-kp-24', slug: 'bo-ml', name: 'BO in ML & Hyperparameter Tuning' },
          { id: 'pm-kp-25', slug: 'multi-fidelity-bo', name: 'Multi-Fidelity BO & Resource Allocation' },
        ]
      },
      {
        id: 'uncertainty-quantification',
        slug: 'uncertainty-quantification',
        name: 'Uncertainty Quantification',
        description: 'Methods for quantifying and managing uncertainty in ML predictions and inferences.',
        knowledgePoints: [
          { id: 'pm-kp-26', slug: 'uncertainty-quantification', name: 'Uncertainty Quantification (UQ)' },
          { id: 'pm-kp-27', slug: 'aleatoric-vs-epistemic', name: 'Aleatoric vs Epistemic Uncertainty' },
          { id: 'pm-kp-28', slug: 'uq-methods', name: 'UQ Methods (Bootstrap, Jackknife, MCMC)' },
          { id: 'pm-kp-29', slug: 'uq-ml', name: 'UQ in ML & Calibration' },
          { id: 'pm-kp-30', slug: 'robust-inference', name: 'Robust Inference & Outlier Detection' },
        ]
      },
    ]
  },

]
