import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  // Topic 1: RL Fine-Tuning Fundamentals
  "rlft-vs-sft": [
    {
      id: "q-rlft-vs-sft-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key difference between SFT (Supervised Fine-Tuning) and RL Fine-Tuning?",
      options: [
        "SFT requires more compute than RL",
        "RL fine-tuning uses reward signals to optimize behavior, while SFT mimics demonstration data",
        "SFT can only be used for classification tasks",
        "RL fine-tuning doesn't require a base model",
      ],
      correctAnswer: 1,
      explanation:
        "SFT trains the model to mimic demonstrations (input-output pairs), while RL fine-tuning optimizes for reward signals that measure task success. RL allows the model to explore beyond the demonstration distribution and can improve on tasks where the optimal behavior isn't captured in training data.",
      hints: [
        "SFT is like imitation learning - copy what you see",
        "RL can discover novel strategies that weren't in the training data",
      ],
    },
    {
      id: "q-rlft-vs-sft-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DPO (Direct Preference Optimization) is often preferred over RLHF because:",
      options: [
        "DPO produces better results than RLHF in all cases",
        "DPO doesn't require training a separate reward model",
        "DPO uses more compute but is more stable",
        "DPO was invented before RLHF",
      ],
      correctAnswer: 1,
      explanation:
        "DPO directly optimizes the policy using preference data without needing to train a reward model first. This simplifies the pipeline (no RM training step) and avoids reward hacking issues, though it may not work as well for complex multi-turn reasoning tasks where RLHF with PPO excels.",
      hints: [
        "Think about what components RLHF requires: SFT model, reward model, then PPO",
        "DPO eliminates one of these components",
      ],
    },
    {
      id: "q-rlft-vs-sft-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When is RL fine-tuning preferred over DPO for aligning an LLM?",
      options: [
        "When you have limited preference data",
        "When the task requires multi-step reasoning with delayed rewards",
        "When you want the fastest possible training time",
        "When you don't have a base model",
      ],
      correctAnswer: 1,
      explanation:
        "RL fine-tuning with PPO is preferred for complex tasks where rewards depend on multi-step reasoning chains or where the model needs to explore strategies beyond the preference data distribution. DPO works well for single-turn alignment but struggles with tasks requiring credit assignment across multiple steps.",
      hints: [
        "DPO is great for 'which response is better' pairwise comparisons",
        "Think about games: RL excels when rewards come at the end of long sequences",
      ],
    },
  ],

  "grpo-algorithms": [
    {
      id: "q-grpo-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "GRPO (Group Relative Policy Optimization) differs from PPO in that it:",
      options: [
        "Uses a different clipping objective",
        "Estimates advantages by comparing outputs within a group rather than using a value function",
        "Requires more training data",
        "Was developed before PPO",
      ],
      correctAnswer: 1,
      explanation:
        "GRPO eliminates the need for a critic/value network by computing advantages relative to other samples in the same group. For each prompt, it generates multiple outputs and ranks them against each other, using the relative rankings as the advantage signal. This reduces memory and complexity.",
      hints: [
        "PPO needs both policy and value networks",
        "GRPO's innovation is avoiding the value function entirely",
      ],
    },
    {
      id: "q-grpo-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In GRPO, why is importance sampling used during the RL update?",
      options: [
        "To speed up training",
        "To reuse samples from older policy versions without collecting new data each step",
        "To improve model accuracy",
        "To reduce memory usage",
      ],
      correctAnswer: 1,
      explanation:
        "Importance sampling allows computing the gradient of the current policy using samples collected from an older version of the policy. The ratio π(a|s)/π_old(a|s) corrects for the distribution mismatch. This is more sample-efficient than collecting fresh rollouts for every gradient step.",
      hints: [
        "The probability ratio appears in the PPO/GRPO objective",
        "Without importance sampling, you'd need new samples for each update",
      ],
    },
  ],

  "rlft-use-cases": [
    {
      id: "q-rlft-use-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which scenario is best suited for RL fine-tuning over SFT alone?",
      options: [
        "Translating text between languages with parallel corpora",
        "Training a model to play chess at superhuman level",
        "Summarizing documents with ground truth summaries",
        "Classifying sentiment in product reviews",
      ],
      correctAnswer: 1,
      explanation:
        "Chess playing requires exploring strategies beyond what's in demonstration data and optimizing for a clear win/loss reward. SFT can only copy existing play patterns, while RL can discover novel strategies that lead to higher win rates. The other tasks have clear input-output pairs suitable for SFT.",
      hints: [
        "Think about which task has a clear objective/reward",
        "Which task benefits from exploration beyond demonstrations?",
      ],
    },
    {
      id: "q-rlft-use-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A startup wants to fine-tune an LLM to write better SQL queries. When should they choose RL over SFT?",
      options: [
        "When they have 10,000 example SQL queries from StackOverflow",
        "When they want the model to optimize for query execution time and correctness",
        "When they only need the model to match existing query styles",
        "When training budget is the primary constraint",
      ],
      correctAnswer: 1,
      explanation:
        "RL is appropriate when you have a measurable objective (execution time + correctness) that goes beyond imitation. SFT with StackOverflow data would teach common patterns, but RL can optimize for the specific metrics that matter: queries that run fast and return correct results.",
      hints: [
        "SFT mimics - RL optimizes",
        "What can you measure and reward?",
      ],
    },
  ],

  "lora-for-rl": [
    {
      id: "q-lora-rl-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is LoRA particularly well-suited for RL fine-tuning of LLMs?",
      options: [
        "LoRA produces larger models than full fine-tuning",
        "LoRA reduces memory usage and allows training larger models or using larger batch sizes",
        "LoRA is the only method that works with RL",
        "LoRA eliminates the need for a reward model",
      ],
      correctAnswer: 1,
      explanation:
        "RL training requires keeping the policy, reference model, and often a value model in memory. LoRA dramatically reduces memory by only training low-rank adapters (~0.1-1% of parameters). This allows using the saved memory for larger batch sizes, longer sequences, or larger base models.",
      hints: [
        "RL needs multiple models in memory simultaneously",
        "LoRA freezes most weights and trains tiny adapters",
      ],
    },
    {
      id: "q-lora-rl-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In RL fine-tuning with LoRA, what is the 'reference model' used for?",
      options: [
        "To generate training data",
        "To compute KL divergence penalty preventing the policy from drifting too far from the base",
        "To evaluate the final model",
        "To store the reward function",
      ],
      correctAnswer: 1,
      explanation:
        "The reference model (frozen base model) is used to compute KL(π || π_ref) which penalizes the policy for deviating too far from the original distribution. This prevents reward hacking and maintains language capabilities. Without it, the model might output gibberish that maximizes reward.",
      hints: [
        "The KL term appears in the RLHF objective",
        "It prevents 'reward hacking' where the model exploits the reward",
      ],
    },
  ],

  "reward-modeling": [
    {
      id: "q-reward-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A reward model for RLHF is typically trained using:",
      options: [
        "Supervised learning on question-answer pairs",
        "Bradley-Terry loss on preference comparisons (chosen vs rejected)",
        "Unsupervised clustering",
        "Reinforcement learning from environment rewards",
      ],
      correctAnswer: 1,
      explanation:
        "Reward models learn from human preference data where annotators compare two model outputs. The Bradley-Terry model converts pairwise comparisons into a probability: P(chosen > rejected) = sigmoid(r(chosen) - r(rejected)). The reward model is trained to maximize the likelihood of human preferences.",
      hints: [
        "RLHF = RL from Human Feedback, so how do you capture human preferences?",
        "The reward model learns to predict which output humans prefer",
      ],
    },
    {
      id: "q-reward-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is 'reward hacking' in RLHF and how is it mitigated?",
      options: [
        "When the reward model is too slow",
        "When the policy exploits loopholes in the reward model to achieve high scores without actually improving",
        "When humans provide inconsistent feedback",
        "When the model is too small",
      ],
      correctAnswer: 1,
      explanation:
        "Reward hacking occurs when the policy finds outputs that the reward model scores highly but humans don't actually prefer (e.g., verbose confident-sounding wrong answers). It's mitigated by: KL penalty to reference model, iterative data collection (RLAIF), and using multiple reward models for ensemble voting.",
      hints: [
        "The reward model isn't perfect - it can be 'fooled'",
        "Think about Goodhart's Law: when a measure becomes a target, it ceases to be a good measure",
      ],
    },
  ],

  // Topic 2: End-to-End RL Platforms
  "hud-platform": [
    {
      id: "q-hud-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What makes HUD unique among RL fine-tuning platforms?",
      options: [
        "It's the only platform that uses GPUs",
        "It provides both RL training and inference hosting in one product",
        "It's free for all users",
        "It only supports small models",
      ],
      correctAnswer: 1,
      explanation:
        "HUD (Y Combinator W25) is notable for owning the entire RL loop + serving in one integrated product. Most platforms only do training (Tinker) or only do hosting (Together AI). HUD supports Claude, GPT, Gemini, and Grok models with reinforcement fine-tuning and serves the resulting models at inference.hud.ai.",
      hints: [
        "Think about the typical split: train here, host there",
        "HUD handles the full lifecycle",
      ],
    },
    {
      id: "q-hud-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which models does HUD support for reinforcement fine-tuning?",
      options: [
        "Only open-source models like Llama",
        "Claude, GPT, Gemini, and Grok",
        "Only proprietary models from big tech",
        "Only models trained on HUD",
      ],
      correctAnswer: 1,
      explanation:
        "HUD supports reinforcement fine-tuning on major foundation models including Anthropic's Claude, OpenAI's GPT, Google's Gemini, and xAI's Grok. This allows developers to enhance these models for specific tasks using RL rather than being limited to prompt engineering.",
      hints: [
        "HUD works with the major LLM providers",
        "It's not limited to open-source",
      ],
    },
  ],

  "aws-bedrock-rft": [
    {
      id: "q-bedrock-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "AWS Bedrock's Reinforcement Fine-Tuning (RFT) is best suited for organizations that:",
      options: [
        "Want the cheapest possible training",
        "Require HIPAA, FedRAMP, or other compliance certifications",
        "Need to train models from scratch",
        "Prefer open-source only solutions",
      ],
      correctAnswer: 1,
      explanation:
        "Bedrock RFT is enterprise-grade with HIPAA, FedRAMP, and other compliance certifications. The premium pricing (30-50% more than alternatives) is justified for organizations in healthcare, finance, or government that need data sovereignty, audit trails, and regulatory compliance.",
      hints: [
        "Think about what enterprises prioritize over cost",
        "What certifications matter for regulated industries?",
      ],
    },
    {
      id: "q-bedrock-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How does AWS Bedrock RFT serve fine-tuned models compared to training-only platforms?",
      options: [
        "You must download weights and host yourself",
        "It offers Provisioned Throughput serving in your VPC",
        "Models are only available during training",
        "You must use third-party hosting",
      ],
      correctAnswer: 1,
      explanation:
        "Bedrock provides end-to-end service: after RFT training, models are served via Provisioned Throughput endpoints within your AWS VPC. This maintains data sovereignty (traffic never leaves your network) and provides consistent latency with reserved capacity, unlike training-only platforms where you'd need to set up separate hosting.",
      hints: [
        "Bedrock is a full-service platform, not just training",
        "VPC = Virtual Private Cloud",
      ],
    },
  ],

  "vertex-ai-rl": [
    {
      id: "q-vertex-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Google Vertex AI's RL fine-tuning capability is most advantageous for teams already using:",
      options: [
        "AWS infrastructure",
        "GCP, TPUs, or needing Gemini model access",
        "On-premise GPU clusters",
        "Azure ML Studio",
      ],
      correctAnswer: 1,
      explanation:
        "Vertex AI RL fine-tuning integrates natively with GCP infrastructure, uses TPUs for efficient training via MaxText, and provides exclusive access to Gemini model fine-tuning. For GCP-native teams, the integration with BigQuery, Cloud Storage, and existing IAM provides operational simplicity.",
      hints: [
        "Each cloud provider has their ML platform",
        "What's unique to Google Cloud?",
      ],
    },
  ],

  "anyscale-ray": [
    {
      id: "q-anyscale-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Anyscale's approach to RL fine-tuning differs from managed services like HUD because it:",
      options: [
        "Is simpler to use for beginners",
        "Provides infrastructure for custom training loops via Ray and RLlib rather than managed RLHF",
        "Doesn't support LLM fine-tuning",
        "Is only for inference",
      ],
      correctAnswer: 1,
      explanation:
        "Anyscale provides the Ray distributed computing framework and Ray Serve for hosting, but requires you to implement your own training logic using RLlib. This offers maximum flexibility for research or custom RL algorithms but has a steeper learning curve than managed services like HUD.",
      hints: [
        "Anyscale = Ray, which is a framework not a managed service",
        "Think 'infrastructure' vs 'managed service'",
      ],
    },
  ],

  "platform-comparison": [
    {
      id: "q-platform-comp-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A startup needs RL fine-tuning with model hosting and has limited ML infrastructure experience. Which platform is most appropriate?",
      options: [
        "AWS Bedrock for cost savings",
        "HUD for end-to-end simplicity",
        "Anyscale for maximum flexibility",
        "Lambda Labs for DIY control",
      ],
      correctAnswer: 1,
      explanation:
        "HUD provides the simplest end-to-end experience with RL training and inference hosting in one product. AWS Bedrock is overkill for a startup, Anyscale requires deep ML expertise, and Lambda Labs requires building the entire infrastructure yourself. HUD abstracts away infrastructure complexity.",
      hints: [
        "Limited infrastructure experience = want managed service",
        "Which option is both end-to-end and user-friendly?",
      ],
    },
  ],

  // Topic 3: Training-Only Platforms
  "tinker-platform": [
    {
      id: "q-tinker-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Tinker (Thinking Machines) provides RL training but requires users to:",
      options: [
        "Provide their own GPUs",
        "Download weights after training and host separately",
        "Use only Claude models",
        "Train for at least 100 hours",
      ],
      correctAnswer: 1,
      explanation:
        "Tinker handles RL training on their infrastructure (no GPU needed from you) but doesn't provide persistent hosting. After training completes, you download the LoRA weights from tinker://<run_id>/sampler_weights/final and deploy them using your own hosting solution like RunPod, Together AI, or local vLLM.",
      hints: [
        "Tinker = training only, not hosting",
        "What happens after training finishes?",
      ],
    },
    {
      id: "q-tinker-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What RL algorithms does Tinker support for fine-tuning?",
      options: [
        "Only supervised fine-tuning",
        "LoRA-based RL with GRPO and importance sampling",
        "Only full parameter fine-tuning",
        "Only DPO without RL",
      ],
      correctAnswer: 1,
      explanation:
        "Tinker specializes in LoRA-based RL training using GRPO (Group Relative Policy Optimization) and importance sampling. This memory-efficient approach allows training on larger models without requiring full parameter updates, making RL fine-tuning practical for consumer use.",
      hints: [
        "LoRA = Low-Rank Adaptation for efficient fine-tuning",
        "GRPO is a variant of policy gradient methods",
      ],
    },
  ],

  "atropos-framework": [
    {
      id: "q-atropos-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Atropos is an open-source RL framework that differs from managed platforms by:",
      options: [
        "Being only available as a paid service",
        "Requiring self-hosting on your own GPU infrastructure but offering full control",
        "Not supporting LLM training",
        "Being deprecated",
      ],
      correctAnswer: 1,
      explanation:
        "Atropos is an open-source RL framework that you run on your own infrastructure (Lambda Labs, RunPod, etc.). Unlike managed platforms, it requires setting up the training environment yourself but offers complete control over the training loop, custom reward functions, and model architectures.",
      hints: [
        "Open-source = more control, more setup",
        "What do you trade for flexibility?",
      ],
    },
  ],

  "verl-openrlhf": [
    {
      id: "q-verl-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "veRL and OpenRLHF are best described as:",
      options: [
        "Managed cloud services for RLHF",
        "Open-source libraries for implementing custom RLHF training pipelines",
        "Model hosting platforms",
        "Data annotation tools",
      ],
      correctAnswer: 1,
      explanation:
        "veRL (from VolcEngine) and OpenRLHF are open-source libraries providing implementations of RLHF algorithms (PPO, DPO, etc.) that you run on your own infrastructure. They're building blocks for creating custom RL training pipelines, not managed services.",
      hints: [
        "These are code libraries, not cloud services",
        "Think PyTorch/TensorFlow but for RLHF",
      ],
    },
  ],

  "openclaw-rl": [
    {
      id: "q-openclaw-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "OpenClaw-RL differentiates itself from other RL frameworks by:",
      options: [
        "Being closed-source",
        "Focusing on agentic RL for tool use and multi-step reasoning tasks",
        "Only supporting small models",
        "Being a hosting platform",
      ],
      correctAnswer: 1,
      explanation:
        "OpenClaw-RL is designed specifically for training agentic AI systems that use tools, plan multi-step actions, and perform complex reasoning. Unlike general RLHF frameworks, it includes environment abstractions for tool integration and reward shaping for agentic behaviors.",
      hints: [
        "Claw suggests grasping/using tools",
        "What makes agentic RL different from single-turn RLHF?",
      ],
    },
  ],

  "weight-export": [
    {
      id: "q-weight-export-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "After training with Tinker, how do you deploy the fine-tuned model?",
      options: [
        "Use Tinker's built-in hosting service",
        "Download LoRA weights, merge with base model, then deploy via vLLM/Together/Ollama",
        "The model is automatically deployed",
        "You must retrain from scratch elsewhere",
      ],
      correctAnswer: 1,
      explanation:
        "Tinker provides weights at tinker://<run_id>/sampler_weights/final which you download, merge with the base model using HuggingFace PEFT, convert to your target format (GGUF for Ollama, or deploy via vLLM/Together/Fireworks). This workflow gives flexibility but requires additional steps.",
      hints: [
        "Tinker doesn't host - what comes after training?",
        "LoRA weights need to be merged with the base model",
      ],
    },
  ],

  // Topic 4: Model Serving & Hosting
  "vllm-pagedattention": [
    {
      id: "q-vllm-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "vLLM's PagedAttention improves inference throughput by:",
      options: [
        "Using smaller model sizes",
        "Dynamically allocating GPU memory for KV cache like virtual memory paging",
        "Skipping attention computation",
        "Using CPU instead of GPU",
      ],
      correctAnswer: 1,
      explanation:
        "PagedAttention manages the KV cache like virtual memory: attention keys/values are stored in non-contiguous blocks that can be allocated on-demand. This eliminates memory fragmentation and allows serving more concurrent requests with the same GPU memory, dramatically improving throughput.",
      hints: [
        "Think about how OS virtual memory works",
        "KV cache is the bottleneck for serving multiple requests",
      ],
    },
    {
      id: "q-vllm-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is vLLM commonly recommended for hosting RL-fine-tuned models?",
      options: [
        "It's the only option for LoRA models",
        "High throughput, LoRA support, and easy deployment of HuggingFace models",
        "It includes RL training capabilities",
        "It's maintained by OpenAI",
      ],
      correctAnswer: 1,
      explanation:
        "vLLM is popular for production serving because it handles the efficiency challenges of LLM inference (PagedAttention for memory, continuous batching), supports loading LoRA adapters, and integrates directly with HuggingFace model formats that RL training tools produce.",
      hints: [
        "vLLM is a serving solution, not a training one",
        "Think about what matters for production deployment",
      ],
    },
  ],

  "together-ai-serving": [
    {
      id: "q-together-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Together AI's model hosting is attractive because it offers:",
      options: [
        "Free unlimited usage",
        "Simple API to upload custom weights and serve via inference endpoint",
        "Only proprietary models",
        "On-premise deployment only",
      ],
      correctAnswer: 1,
      explanation:
        "Together AI allows uploading your fine-tuned model weights and serving them through their inference API at competitive rates (~$0.20/M tokens). This is ideal for teams who've done custom fine-tuning and want production hosting without managing GPU infrastructure.",
      hints: [
        "Together = community + custom models",
        "What do you need after fine-tuning?",
      ],
    },
  ],

  "fireworks-inference": [
    {
      id: "q-fireworks-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Fireworks AI differentiates from other hosting platforms by:",
      options: [
        "Being the cheapest option",
        "Optimizing for sub-100ms inference latency",
        "Only supporting training",
        "Being limited to small models",
      ],
      correctAnswer: 1,
      explanation:
        "Fireworks AI is optimized for low-latency inference, achieving sub-100ms response times. This makes it ideal for real-time applications (chatbots, assistants) where response latency directly impacts user experience, even if it's not the cheapest option.",
      hints: [
        "Fireworks = speed",
        "What metric matters most for interactive applications?",
      ],
    },
  ],

  "runpod-serverless": [
    {
      id: "q-runpod-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "RunPod Serverless is attractive for hosting fine-tuned models because:",
      options: [
        "It requires annual contracts",
        "Pay-per-second pricing with serverless GPU endpoints",
        "It only supports CPU inference",
        "It's only for training",
      ],
      correctAnswer: 1,
      explanation:
        "RunPod Serverless provides GPU endpoints where you pay only for actual compute time (per-second billing). Upload your model, get an API endpoint, and requests spin up GPU instances on-demand. This is cost-effective for variable or low-traffic workloads.",
      hints: [
        "Serverless = pay only when processing requests",
        "Think AWS Lambda but for GPU inference",
      ],
    },
  ],

  "ollama-local": [
    {
      id: "q-ollama-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Ollama is ideal for deploying fine-tuned models when:",
      options: [
        "You need to serve millions of users",
        "You want free local deployment on your own machine",
        "You require enterprise SLAs",
        "You need cloud redundancy",
      ],
      correctAnswer: 1,
      explanation:
        "Ollama runs models locally on your CPU/GPU for free, making it perfect for personal use, development, or privacy-sensitive applications. After merging LoRA weights and converting to GGUF format, you can run the model entirely offline without cloud costs or data leaving your machine.",
      hints: [
        "Ollama = local, free, offline",
        "What's the trade-off vs cloud hosting?",
      ],
    },
  ],

  // Topic 5: GPU Infrastructure
  "lambda-labs": [
    {
      id: "q-lambda-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Lambda Labs differentiates from AWS/GCP for ML training by:",
      options: [
        "Being more expensive",
        "Offering dedicated GPU rental optimized for ML at competitive prices",
        "Only providing CPU instances",
        "Being limited to inference",
      ],
      correctAnswer: 1,
      explanation:
        "Lambda Labs provides GPU instances specifically optimized for ML workloads (proper drivers, pre-installed frameworks) at $2.49/hr for H100s. Unlike general cloud providers, everything is ML-focused, and you can run any training stack (Atropos, veRL, OpenRLHF) on the raw GPU.",
      hints: [
        "Lambda = ML-specialized cloud",
        "Think about what makes ML different from general computing",
      ],
    },
  ],

  "runpod-gpu": [
    {
      id: "q-runpod-gpu-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "RunPod offers both GPU rental and serverless. When should you choose GPU rental?",
      options: [
        "For occasional inference requests",
        "For long training runs where you need persistent access and full control",
        "Only for CPU workloads",
        "When you want managed services",
      ],
      correctAnswer: 1,
      explanation:
        "RunPod GPU rental ($2.39/hr H100) gives you a persistent VM where you install your training stack and run long jobs. This is cheaper than serverless for training workloads that run continuously. Use serverless only for on-demand inference.",
      hints: [
        "GPU rental = VM you control",
        "Serverless = pay per request",
      ],
    },
  ],

  "modal-serverless": [
    {
      id: "q-modal-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Modal's serverless GPU approach differs from RunPod by:",
      options: [
        "Being cheaper for all workloads",
        "Using Python decorators to define GPU functions that scale automatically",
        "Only supporting inference",
        "Requiring annual contracts",
      ],
      correctAnswer: 1,
      explanation:
        "Modal uses a code-first approach where you annotate Python functions with @modal.gpu() and they automatically scale to GPUs on-demand. Unlike RunPod's VM model, you write normal Python and Modal handles infrastructure. It's more expensive ($4.76/hr H100) but simpler for developers.",
      hints: [
        "Modal = code-first, serverless",
        "Think function-level GPU access vs VM-level",
      ],
    },
  ],

  "coreweave-k8s": [
    {
      id: "q-coreweave-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CoreWeave is best suited for organizations that need:",
      options: [
        "Simple single-GPU training",
        "Kubernetes-native infrastructure with high-speed InfiniBand networking for distributed training",
        "Only inference hosting",
        "Free GPU access",
      ],
      correctAnswer: 1,
      explanation:
        "CoreWeave provides Kubernetes-native GPU infrastructure with InfiniBand networking, essential for distributed training across hundreds of GPUs. This is overkill for single-GPU work but critical for training large models where inter-GPU communication is the bottleneck.",
      hints: [
        "CoreWeave = infrastructure for serious scale",
        "What makes distributed training fast?",
      ],
    },
  ],

  "spheron-decentralized": [
    {
      id: "q-spheron-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Spheron's decentralized GPU approach offers:",
      options: [
        "Enterprise SLAs and compliance",
        "Lower costs by using distributed community GPU resources",
        "Only inference hosting",
        "Only CPU compute",
      ],
      correctAnswer: 1,
      explanation:
        "Spheron creates a marketplace of distributed GPU providers, achieving $1.33/hr for H100 access. The trade-off is less reliability/consistency than dedicated providers, but for cost-sensitive workloads that can handle occasional interruptions, it offers significant savings.",
      hints: [
        "Decentralized = community resources",
        "What's the trade-off for lower cost?",
      ],
    },
  ],

  // Topic 6: Platform Selection & Trade-offs
  "cost-optimization": [
    {
      id: "q-cost-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A team wants to RL fine-tune a 70B model. What's the most cost-effective training approach?",
      options: [
        "AWS Bedrock for simplicity",
        "Tinker for training + download weights for self-hosting",
        "Train from scratch on Lambda Labs",
        "Use only prompt engineering",
      ],
      correctAnswer: 1,
      explanation:
        "Tinker provides managed RL training without needing your own GPUs. After training, download the LoRA weights (~100MB vs full 70B model) and host on cheap infrastructure like RunPod Serverless or Together AI. This avoids the premium of end-to-end platforms while getting managed training.",
      hints: [
        "LoRA weights are small and portable",
        "What can you separate: training vs hosting?",
      ],
    },
  ],

  "latency-requirements": [
    {
      id: "q-latency-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For a real-time voice assistant requiring <100ms response time, which hosting platform is most appropriate?",
      options: [
        "Ollama on local CPU",
        "Fireworks AI for optimized low-latency inference",
        "RunPod GPU rental with vLLM",
        "Any platform would work equally well",
      ],
      correctAnswer: 1,
      explanation:
        "Fireworks AI specifically optimizes for sub-100ms inference latency, making it ideal for real-time applications. Local CPU inference (Ollama) is too slow for 70B models, and while vLLM on RunPod can be fast, it requires more setup and optimization work.",
      hints: [
        "Voice assistants need very fast responses",
        "Which platform specifically targets low latency?",
      ],
    },
  ],

  "compliance-security": [
    {
      id: "q-compliance-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A healthcare startup handling patient data needs RL fine-tuning. Which platform meets HIPAA requirements?",
      options: [
        "Tinker with external hosting",
        "AWS Bedrock with VPC deployment and BAA",
        "Any cloud provider with GPU access",
        "Modal serverless",
      ],
      correctAnswer: 1,
      explanation:
        "AWS Bedrock offers HIPAA compliance with Business Associate Agreements (BAA) and VPC deployment where data never leaves your network. Tinker + external hosting creates compliance complexity, and most GPU rental platforms don't offer HIPAA BAAs.",
      hints: [
        "Healthcare = strict data handling requirements",
        "What document do you need for HIPAA cloud services?",
      ],
    },
  ],

  "scaling-decisions": [
    {
      id: "q-scaling-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A startup is choosing between HUD (end-to-end) and Tinker+RunPod (separate services). What factor should drive choosing HUD?",
      options: [
        "HUD is cheaper at all scales",
        "Limited ML infrastructure expertise and desire for simplicity",
        "Need for maximum customization",
        "Running on-premise",
      ],
      correctAnswer: 1,
      explanation:
        "HUD's value proposition is simplicity: one platform handles RL training AND hosting. Tinker+RunPod requires managing two services, handling weight export/merge, and more DevOps. Choose HUD when your team's time is more valuable than the convenience premium.",
      hints: [
        "Managed services trade cost for simplicity",
        "What's your team good at?",
      ],
    },
  ],

  "hybrid-architectures": [
    {
      id: "q-hybrid-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What's a common 'hybrid' architecture for RL fine-tuned models?",
      options: [
        "Training and hosting on the same platform always",
        "Train on managed platform (Tinker) -> export LoRA -> host on specialized inference provider (Together/Fireworks)",
        "Use only local deployment",
        "Never export weights from training platforms",
      ],
      correctAnswer: 1,
      explanation:
        "The hybrid pattern separates concerns: use Tinker (no GPU needed) for RL training, download tiny LoRA weights, then deploy to specialized inference providers. This combines managed training convenience with inference provider choice for latency/cost optimization.",
      hints: [
        "Why use different providers for training vs hosting?",
        "LoRA weights are portable and small",
      ],
    },
  ],
};

registerQuestions(questions);
