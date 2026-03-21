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
        "First, let's recall that SFT (Supervised Fine-Tuning) trains the model to mimic demonstration data—it learns to produce outputs similar to labeled examples it has seen. Step-by-step: (1) SFT learns P(y|x) directly from input-output pairs, essentially learning to imitate human-written responses. (2) RL fine-tuning, by contrast, optimizes a policy to maximize reward signals that measure task success. (3) This allows RL to explore beyond the demonstration distribution—while SFT is constrained to outputs similar to training data, RL can discover novel strategies that improve on the training examples. Therefore, RL fine-tuning is preferred when optimal behavior isn't fully captured in demonstration data, enabling the model to find solutions humans didn't explicitly demonstrate.",
      hints: [
        "SFT is like imitation learning—think of it as copying what expert demonstrations look like",
        "RL can discover strategies beyond what was shown in training data because it optimizes for outcomes, not just similarity to examples",
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
        "First, let's recall the standard RLHF pipeline: it requires (1) an SFT model, (2) a separately trained reward model that predicts human preferences, and (3) PPO optimization using that reward model. Step-by-step derivation: DPO (Direct Preference Optimization) revolutionizes this by eliminating the reward model training step entirely. Instead of training a separate RM and then using it for PPO, DPO directly optimizes the policy using preference comparisons. This simplification avoids common issues like reward hacking, where the policy exploits reward model flaws. However, for complex multi-turn reasoning tasks with delayed rewards, the full RLHF pipeline with PPO often performs better. Therefore, DPO is preferred when you want simplicity and your task doesn't require intricate credit assignment across many steps.",
      hints: [
        "Standard RLHF needs three components: SFT model, reward model, and PPO. DPO removes one of these",
        "Consider whether your task involves simple pairwise comparisons or complex multi-step reasoning with delayed rewards",
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
        "First, let's recall how DPO works: it excels at pairwise preference alignment—given two responses, it learns which humans prefer. However, step-by-step analysis reveals limitations: (1) DPO assigns credit based on direct comparisons between complete responses, (2) For multi-step reasoning, rewards often depend on intermediate steps, not just the final answer, (3) PPO can propagate reward signals backward through a reasoning chain using value functions. Therefore, RL fine-tuning with PPO is preferred when rewards depend on multi-step reasoning chains, delayed feedback, or when the model must explore strategies beyond what preference data captures.",
      hints: [
        "DPO works best when you can clearly compare two complete responses—think of it as grading final exams only",
        "Consider tasks where the intermediate steps matter: in chess, every move contributes to winning; in reasoning, each step affects the final answer's correctness",
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
        "First, let's recall how PPO works: it requires both a policy network (the model being trained) and a value network (a critic that estimates future rewards). Step-by-step derivation: GRPO's key innovation eliminates the value function entirely. Here's how: (1) For each input prompt, GRPO generates a group of multiple outputs, (2) It ranks these outputs relative to each other (which is better than which), (3) Instead of comparing to a learned value baseline, it uses the group's mean reward as the baseline. This approach—comparing samples within a group rather than against a learned value function—is why GRPO reduces memory and computational complexity. Therefore, GRPO trades some statistical efficiency for practical efficiency, making RL training more accessible.",
      hints: [
        "PPO needs two networks: the actor (policy) and the critic (value function) that must be maintained and updated",
        "GRPO's insight: instead of learning what rewards to expect, just compare samples within each group to find the relatively better ones",
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
        "First, let's recall the policy gradient challenge: when we update our policy, the distribution of actions changes, making old samples less useful for new updates. Step-by-step: (1) In on-policy methods like PPO/GRPO, we ideally want samples from the current policy, but collecting new samples is expensive. (2) Importance sampling allows us to reuse samples from an older policy π_old by reweighting probabilities: the ratio π(a|s)/π_old(a|s) corrects for distribution mismatch. (3) This means we can take multiple gradient steps with samples from a single data collection phase. Therefore, importance sampling dramatically improves sample efficiency by letting us squeeze more learning from each batch of data.",
      hints: [
        "The probability ratio π(a|s)/π_old(a|s) appears in the GRPO objective—think of it as correcting for 'staleness' of old samples",
        "Without importance sampling, each gradient update would require fresh data collection, making RL extremely sample-inefficient",
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
        "First, let's recall what makes RL effective: it optimizes for specified rewards and can explore beyond demonstration data. Step-by-step analysis of each option: (1) Translation with parallel corpora has clear input-output pairs—SFT excels here. (2) Chess has a clear win/loss reward (1 for win, -1 for loss) and requires strategic exploration—RL can discover novel strategies humans haven't documented. (3) Summarization with ground truth summaries is ideal for SFT since you have target outputs. (4) Sentiment classification is a straightforward classification task. Therefore, chess is best for RL because it has a measurable reward signal and benefits from exploring strategies beyond existing play patterns.",
      hints: [
        "RL shines when you can clearly measure success—the win/loss outcome in chess is unambiguous",
        "Which task lets you specify 'good' behavior through rewards rather than just demonstrating correct outputs?",
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
        "First, let's recall the key question: when does RL outperform SFT? The answer is optimization beyond imitation. Step-by-step: (1) SFT with StackOverflow data teaches common SQL patterns—it learns to write queries similar to upvoted StackOverflow answers. (2) This is useful but doesn't optimize for your specific metrics. (3) RL can incorporate multiple reward signals: query correctness (does it return the right results?) and execution time (does it run fast?). (4) These are measurable objectives that SFT cannot directly optimize for. Therefore, choose RL when you have measurable metrics that go beyond pattern matching from demonstrations.",
      hints: [
        "SFT teaches 'write queries like the examples'; RL teaches 'optimize for your specific goals'",
        "Consider what you can measure and optimize: execution time, correctness, security, style—all can be reward signals in RL",
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
        "First, let's recall the memory challenge in RL fine-tuning: standard RLHF needs the policy model, reference model (for KL penalty), and often a value model—all simultaneously in GPU memory. Step-by-step: (1) Full fine-tuning updates all parameters, requiring enormous memory for optimizer states and gradients. (2) LoRA (Low-Rank Adaptation) freezes most weights and only trains small adapter matrices (~0.1-1% of parameters). (3) This dramatically reduces memory because you only store gradients and optimizer states for the tiny adapter, not the full model. (4) The freed memory can be used for larger batch sizes, longer sequences, or fitting larger base models. Therefore, LoRA makes RL fine-tuning practical on consumer GPUs.",
      hints: [
        "Standard RLHF keeps multiple large models in memory simultaneously; LoRA reduces the trainable portion to ~0.1-1% of parameters",
        "Think of LoRA as adding 'learning modules' to a frozen base model rather than modifying everything",
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
        "First, let's recall why the reference model exists in RLHF: it's your anchor to the original model. Step-by-step derivation: (1) When optimizing for rewards, the policy might discover outputs that score high on the reward model but are nonsensical. (2) The KL divergence term KL(π || π_ref) measures how much the new policy π diverges from the reference policy π_ref. (3) This penalty prevents the model from drifting too far from the original distribution—which preserves useful language capabilities. (4) Without this constraint, the model could 'hack' the reward by outputting confident-sounding gibberish that exploits reward model limitations. Therefore, the reference model is your safety net that keeps the fine-tuned model coherent.",
      hints: [
        "The KL term in the RLHF objective acts like a regularization loss—keeping the new policy close to the original",
        "Consider what happens without this constraint: the model optimizes purely for the reward signal, which may not capture actual human preferences",
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
        "First, let's recall how human preferences are captured for RLHF: we can't directly measure 'goodness' of outputs, but humans can compare two outputs and say which is better. Step-by-step: (1) Human annotators are shown pairs of model responses and choose which they prefer. (2) The Bradley-Terry model converts these pairwise comparisons into a probability framework: P(chosen > rejected) = sigmoid(r(chosen) - r(rejected)). (3) This means the probability that humans prefer response A over B depends on the difference in their predicted rewards. (4) The reward model is trained to maximize the likelihood of these human preference comparisons. Therefore, the reward model learns a scalar reward function that predicts human preferences.",
      hints: [
        "RLHF captures human preferences through pairwise comparisons, not absolute ratings—humans find it easier to say 'which is better' than to assign a number",
        "The sigmoid of the reward difference appears because we want to model probability of preference, which must be between 0 and 1",
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
        "First, let's recall Goodhart's Law: when a measure becomes a target, it ceases to be a good measure. Step-by-step analysis: (1) The reward model learns to predict human preferences, but it's an imperfect proxy for what humans actually want. (2) Reward hacking occurs when the policy exploits this gap—finding outputs that score high on the reward model but humans don't actually prefer. (3) Classic example: verbose, confident-sounding wrong answers that manipulate the reward model's superficial patterns. (4) Mitigation strategies include: KL penalty to keep the policy near the reference model, iterative data collection where new human feedback is gathered on exploited outputs, and ensemble voting across multiple reward models to reduce variance. Therefore, reward hacking is an alignment problem that requires ongoing monitoring and safeguards.",
      hints: [
        "The reward model is a proxy for human preferences—proxies can be 'gamed' when the policy finds shortcuts the proxy doesn't capture",
        "Consider why KL divergence to the reference model helps: it penalizes the policy for diverging from what humans originally approved of",
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
        "First, let's recall the typical RL fine-tuning workflow: most platforms specialize in one part—some offer training (like Tinker), others offer hosting (like Together AI), requiring you to stitch them together. HUD (Y Combinator W25) takes a different approach. Step-by-step: (1) HUD owns the entire lifecycle—reinforcement fine-tuning training AND model serving in one integrated product. (2) You upload your preference data and training prompts, HUD handles the RL training. (3) After training, the resulting models are served at inference.hud.ai. (4) Supported models include Claude, GPT, Gemini, and Grok. Therefore, HUD reduces operational complexity by being a one-stop shop for both training and hosting.",
      hints: [
        "Most platforms force you to choose: either train here or host there—HUD combines both",
        "Consider the DevOps overhead: with split platforms, you must handle weight exports, format conversions, and multiple API integrations",
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
        "First, let's recall why platform model support matters: proprietary foundation models (Claude, GPT, etc.) are trained by large companies and typically accessed via APIs, limiting customization options. Step-by-step: (1) Traditionally, fine-tuning proprietary models required the provider to support it. (2) HUD's approach supports reinforcement fine-tuning on Claude (Anthropic), GPT (OpenAI), Gemini (Google), and Grok (xAI). (3) This means developers can RL fine-tune these models for specific tasks without being limited to prompt engineering. (4) Each provider has different strengths: Claude for reasoning, GPT for versatility, Gemini for multimodal, Grok for real-time data. Therefore, HUD provides access to the major foundation models for custom RL fine-tuning.",
      hints: [
        "Proprietary models are usually accessed via APIs with limited customization—HUD expands what you can do with them",
        "Consider which task you need: different models excel at different things, so having options matters",
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
        "First, let's recall what compliance requirements mean in cloud ML: regulated industries (healthcare, finance, government) have strict rules about data handling, audit trails, and security certifications. Step-by-step: (1) HIPAA is required for handling protected health information (PHI) in the US—violations can result in millions in fines. (2) FedRAMP authorizes cloud services for government workloads, requiring rigorous security assessments. (3) Bedrock RFT provides these certifications out-of-the-box along with data sovereignty features. (4) The premium pricing (30-50% more than alternatives) covers the cost of maintaining compliance infrastructure. Therefore, for organizations in healthcare, finance, or government, Bedrock RFT's compliance features justify the higher cost.",
      hints: [
        "HIPAA violations can cost millions in fines; FedRAMP is mandatory for US government cloud workloads—these aren't optional for regulated industries",
        "Consider what 'data sovereignty' means: keeping your data within specific geographic/legal boundaries",
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
        "First, let's recall the distinction between training-only platforms and end-to-end platforms: training-only means you must build your own deployment pipeline after training. Step-by-step comparison: (1) With training-only platforms, after training you download weights and set up separate hosting, requiring additional DevOps work. (2) Bedrock RFT provides end-to-end service—after RL fine-tuning, models are served via Provisioned Throughput endpoints within your AWS VPC. (3) VPC (Virtual Private Cloud) keeps all traffic within AWS's network, never exposing it to the public internet. (4) Provisioned Throughput guarantees capacity, providing consistent latency. Therefore, Bedrock maintains data sovereignty while eliminating the need for separate hosting setup.",
      hints: [
        "VPC deployment ensures data never leaves the customer's own secure network infrastructure—think of it as your own private section of AWS",
        "Consider the advantage of 'Provisioned Throughput' over 'on-demand': you're buying reserved capacity, not competing for shared resources",
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
        "First, let's recall that each major cloud provider offers an ML platform optimized for their ecosystem: AWS has Bedrock, Azure has Azure ML, and GCP has Vertex AI. Step-by-step analysis: (1) Vertex AI RL fine-tuning integrates natively with GCP infrastructure—no need to configure cloud settings separately. (2) It uses TPUs (Tensor Processing Units) for efficient training via MaxText, Google's training framework. (3) It provides exclusive access to Gemini model fine-tuning—you can only RL fine-tune Gemini through Vertex. (4) For GCP-native teams already using BigQuery, Cloud Storage, and existing IAM permissions, there's significant operational simplicity. Therefore, Vertex AI is most advantageous for teams already invested in the GCP ecosystem.",
      hints: [
        "Google's TPUs are specialized hardware for ML training—think of them as Google's secret weapon for efficient computation",
        "Consider what 'native integration' means: you can use existing GCP tools, permissions, and data sources without reconfiguration",
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
        "First, let's recall the spectrum of RL fine-tuning options: at one end are managed services (HUD) that handle everything; at the other end are frameworks you run yourself. Step-by-step analysis: (1) Anyscale is the company behind Ray, a distributed computing framework, and Ray Serve for model hosting. (2) Unlike HUD (managed service), Anyscale doesn't provide pre-built RLHF training—you must implement training logic yourself using RLlib (Ray's RL library). (3) This gives you maximum flexibility: custom algorithms, reward functions, and training loops. (4) The trade-off is steeper learning curve—you need ML engineering expertise to set up and maintain the infrastructure. Therefore, choose Anyscale when you need flexibility for research or custom RL algorithms.",
      hints: [
        "Anyscale provides 'infrastructure' (Ray framework), not 'managed service'—think of it as giving you building blocks rather than a finished house",
        "Consider: do you want to build custom RL algorithms, or do you want someone else to handle the complexity?",
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
        "First, let's recall the startup's constraints: limited ML infrastructure experience means they want managed solutions that handle complexity. Step-by-step analysis of each option: (1) AWS Bedrock offers enterprise-grade RL fine-tuning, but comes with AWS complexity and premium pricing—overkill for a startup. (2) HUD provides end-to-end simplicity: one platform handles RL training AND inference hosting, abstracting away infrastructure. (3) Anyscale requires implementing your own training logic with RLlib—requires deep ML expertise. (4) Lambda Labs provides raw GPU instances, leaving you to build all infrastructure yourself. Therefore, for a startup with limited infrastructure experience, HUD provides the best balance of simplicity and functionality.",
      hints: [
        "Consider what 'end-to-end' means: HUD handles the entire lifecycle from training to serving, no extra integrations needed",
        "Think about DevOps overhead: how many different services/platforms does your team need to learn and manage?",
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
        "First, let's recall what 'training-only' means in the RL platform landscape: some platforms handle training, others handle hosting, and some do both. Step-by-step workflow: (1) Tinker handles the compute-intensive RL training on their infrastructure—no GPU needed from you. (2) However, Tinker doesn't provide persistent hosting—after training, you must download your weights. (3) The weights are available at tinker://<run_id>/sampler_weights/final. (4) You then deploy them using your own solution: RunPod, Together AI, local vLLM, or Ollama. Therefore, Tinker is ideal for teams who want managed training but flexibility in hosting.",
      hints: [
        "Tinker handles training compute, but what happens after training completes? You get weights to deploy wherever you want",
        "LoRA weights are small (compared to full model) and portable—think of them as 'patches' you apply to the base model",
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
