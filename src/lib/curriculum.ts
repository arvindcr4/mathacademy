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
          { id: 'tr-kp-24', slug: 'continuous-batching', name: 'Continuous Batching & Throughput' },
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
]
