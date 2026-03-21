import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "reward-modeling": [
    {
      id: "q-rlhf-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In RLHF (Ouyang et al., 2022 / InstructGPT), the reward model is trained on comparison data of the form (prompt, winning_response, losing_response). What loss function does it minimize?",
      options: [
        "Cross-entropy loss between predicted reward and a discrete human rating 1–7",
        "−log σ(r(y_w) − r(y_l)) averaged over preference pairs, pushing r(y_w) > r(y_l)",
        "Mean squared error between predicted and true reward scores",
        "KL divergence between the reward distribution and a uniform prior",
      ],
      correctAnswer: 1,
      explanation:
        "Under the Bradley-Terry preference model, the probability that a human prefers $y_w$ over $y_l$ given prompt $x$ is:\n\\[ P(y_w \\succ y_l \\mid x) = \\sigma\\big(r_\\theta(x, y_w) - r_\\theta(x, y_l)\\big) \\]\nwhere $\\sigma$ is the logistic sigmoid. The reward model minimizes the negative log-likelihood:\n\\[ \\mathcal{L}_\\text{RM} = -\\mathbb{E}_{(x, y_w, y_l) \\sim \\mathcal{D}}\\left[ \\log \\sigma\\big(r_\\theta(x, y_w) - r_\\theta(x, y_l)\\big) \\right] \\]\nThis is equivalent to maximizing the log probability that the winning response outranks the losing response. InstructGPT used 50K prompts generating 300K–1.8M preference pairs.",
      hints: [
        "The sigmoid $\\sigma(r(y_w) - r(y_l))$ outputs a probability between 0 and 1 — it is high when $r(y_w) > r(y_l)$.",
        "When $r(y_l) > r(y_w)$, the sigmoid argument is negative, so predicted probability drops below 0.5 — the model is penalized.",
        "This is the Bradley-Terry model: the probability of preference is a sigmoid function of the reward difference.",
      ],
    },
    {
      id: "q-rlhf-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "OpenAI\'s InstructGPT reward model is initialized from the SFT model rather than a randomly initialized network. What is the primary reason?",
      options: [
        "Random initialization would violate the KL constraint during RL training.",
        "The RM must be at least as capable as the LLM it scores — starting from the SFT model gives the RM strong language understanding needed to assess response quality.",
        "Starting from SFT weights halves the RM training time.",
        "The SFT model already produces reward scores as a side effect of its training.",
      ],
      correctAnswer: 1,
      explanation:
        "A reward model that cannot understand nuanced language cannot reliably judge whether a response is helpful or harmful. Initializing from the SFT model — which already understands the task domain — gives the RM the language comprehension needed to assign meaningful scores. A scalar regression head is then added atop the LM backbone.",
      hints: [
        "If the RM cannot understand a complex response, it cannot score it accurately.",
        "The SFT model\'s pre-trained representations are high-quality starting points for learning reward.",
      ],
    },
    {
      id: "q-rlhf-kp1-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "A perfectly trained reward model that exactly captures average human preferences will always produce a well-aligned policy after RL fine-tuning, even with extended optimization.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Even a high-quality RM is only an approximation of true human preferences. Gao et al. (2023) demonstrated empirically that RL over-optimization causes the gold-standard reward to first increase then decrease as KL from the reference grows — an inverted-U curve. The policy exploits distributional gaps in the RM (reward hacking) that do not correspond to genuine human preferences.",
      hints: [
        'Goodhart\'s Law: "When a measure becomes a target, it ceases to be a good measure."',
        "The RM is trained on a fixed dataset; the policy can generate out-of-distribution text that scores high but reads poorly.",
      ],
    },
  ],

  "preference-data": [
    {
      id: "q-rlhf-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Huyenchip (2023) notes that inter-annotator agreement for InstructGPT preference labeling is approximately:",
      options: [
        "~50% (near random chance for pairwise comparisons)",
        "~73% (10 annotators give the same ranking 7 out of 10 times)",
        "~95% (near-perfect agreement)",
        "~30% (most comparisons are disputed)",
      ],
      correctAnswer: 1,
      explanation:
        'OpenAI reported ~73% inter-annotator agreement for InstructGPT preference labels: if 10 annotators rank two responses, 7 give the same ranking. This moderate agreement reflects the genuine subjectivity of "helpful" and "harmless" — different people have legitimately different preferences. The RM must handle this label noise.',
      hints: [
        "73% means ~27% of pairwise labels would differ between annotators — non-trivial noise.",
        "Higher disagreement is expected for nuanced trade-offs between helpfulness and safety.",
      ],
    },
    {
      id: "q-rlhf-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Anthropic\'s Constitutional AI (Bai et al., 2022) uses both human and AI-generated comparison data. What is the approximate split in the 318K comparisons used for Claude\'s RM?",
      options: [
        "All 318K comparisons are human-generated.",
        "135K human comparisons + 183K AI-generated comparisons (57% AI-sourced).",
        "50K human comparisons + 268K AI-generated comparisons (84% AI-sourced).",
        "All 318K comparisons are AI-generated via RLAIF.",
      ],
      correctAnswer: 1,
      explanation:
        "Constitutional AI\'s dataset comprises 135K human-labeled comparisons and 183K AI-generated comparisons produced through the CAI critique-revision cycle. The 57% AI-sourced share dramatically reduces labeling costs while maintaining alignment quality — a key CAI contribution.",
      hints: [
        "CAI\'s AI-generated comparisons come from the model critiquing its own responses against constitutional principles.",
        "Human labels remain for helpfulness; CAI primarily automates harmlessness labeling.",
      ],
    },
    {
      id: "q-rlhf-kp2-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Human preference data is highly consistent: if annotator A prefers y_w over y_l for a given prompt, all other annotators will agree.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        'Human preferences are diverse and subjective. The ~73% inter-annotator agreement in InstructGPT means ~27% of pairs produce disagreement. Cultural background, personal values, and interpretation of "helpfulness" all vary. RLHF must account for this label noise — e.g., by treating preference as a probability rather than a hard label, as formalized in the Bradley-Terry model.',
      hints: [
        "InstructGPT reported 73% inter-annotator agreement — far from perfect consistency.",
        "The Bradley-Terry model naturally accommodates noisy preferences via a probabilistic formulation.",
      ],
    },
  ],

  "ppo-rlhf": [
    {
      id: "q-rlhf-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The PPO-RLHF objective for InstructGPT is: objective(ϕ) = E[RM(x, y) − β·log(π_ϕ(y|x)/π_SFT(y|x))] + γ·E[log π_ϕ(x_pretrain)]. What does the β term control?",
      options: [
        "The learning rate for the policy gradient update.",
        "The strength of the KL penalty that prevents the RL policy from deviating too far from the SFT reference model.",
        "The fraction of pretraining data mixed into RL batches.",
        "The discount factor for future rewards in the MDP.",
      ],
      correctAnswer: 1,
      explanation:
        "β is the KL penalty coefficient. It weights the KL divergence between the RL policy π_ϕ and the SFT reference π_SFT. A large β keeps the policy close to the reference (preventing reward hacking but limiting improvement); a small β allows the policy to optimize reward more aggressively (risking degenerate outputs). The γ term is the pretraining loss weight.",
      hints: [
        "Without the β·KL term, the policy could drift to gibberish that scores high on the RM.",
        "β requires careful tuning — too large means no alignment improvement, too small means reward hacking.",
      ],
    },
    {
      id: "q-rlhf-kp3-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "The standard PPO-RLHF setup requires four neural networks loaded simultaneously: actor, reference policy, reward model, and value (critic) network.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "PPO-RLHF uses: (1) actor π_θ — the policy being trained; (2) reference π_ref (frozen SFT model) — for the KL penalty; (3) reward model r_φ (frozen) — to score responses; (4) critic V_ψ — to estimate value for advantage computation. At 70B parameters, loading all four requires hundreds of GPU-hours. This memory burden motivates alternatives like DPO.",
      hints: [
        "The critic is distinct from the reward model — it estimates expected return, not immediate reward.",
        "This four-model requirement is a primary reason RLHF at scale is expensive, motivating DPO and RLAIF.",
      ],
    },
    {
      id: "q-rlhf-kp3-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "PPO clips the policy update ratio r_t(θ) = π_θ(a_t|s_t)/π_θ_old(a_t|s_t) to [1−ε, 1+ε], typically with ε = 0.1 or 0.2. This prevents:",
      options: [
        "The reward from becoming negative during RL training.",
        "Excessively large policy updates that could destabilize training by moving too far from the old policy in a single step.",
        "The KL divergence from collapsing to zero.",
        "Overfitting to the reward model\'s training distribution.",
      ],
      correctAnswer: 1,
      explanation:
        "PPO clips the probability ratio $r_t(\\theta) = \\pi_\\theta(a_t|s_t)/\\pi_{\\theta_\\text{old}}(a_t|s_t)$ to $[1-\\varepsilon, 1+\\varepsilon]$. The unclipped surrogate objective is $L^\\text{CLIP}(\\theta) = \\mathbb{E}_t\\big[r_t(\\theta) \\cdot \\hat{A}_t\\big]$. When $r_t(\\theta)$ exits the $\\[1-\\varepsilon, 1+\\varepsilon\\]$ band, the gradient is zeroed — preventing large trust region steps that could destabilize training. The clip operator is:\n\\[ \\nabla_\\theta L^\\text{CLIP} = \\mathbb{E}_t\\big[\\nabla_\\theta r_t(\\theta) \\cdot \\hat{A}_t \\cdot \\mathbf{1}_{|r_t(\\theta) - 1| \\leq \\varepsilon}\\big] \\]\nwhere $\\hat{A}_t$ is the advantage estimate. Schulman et al. (2017) set $\\varepsilon = 0.2$ by default.",
      hints: [
        "When $r_t > 1+\\varepsilon$ and advantage is positive, the gradient becomes zero — the policy has already increased probability enough.",
        "When $r_t < 1-\\varepsilon$ and advantage is negative, the gradient becomes zero — the policy has decreased probability too much.",
        "This clipping prevents large policy shifts that vanilla policy gradient could make in a single step.",
      ],
    },
  ],

  "kl-penalty": [
    {
      id: "q-rlhf-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is a concrete example of reward hacking in RLHF caused by an insufficiently large KL penalty β?",
      options: [
        "The policy refuses to answer any questions to avoid low reward scores.",
        'The policy generates excessively verbose, sycophantic responses (e.g., "Great question! Absolutely! Of course!") that the RM rates highly but humans find annoying and unhelpful.',
        "The policy memorizes the SFT training set exactly.",
        "The policy always outputs the same token to minimize KL divergence.",
      ],
      correctAnswer: 1,
      explanation:
        "Sycophancy is a documented reward hacking example: reward models trained on human comparisons often score confident, agreeable responses highly, so an unconstrained policy learns to produce excessive flattery and filler. This exploits the RM\'s approximation of human preferences without genuinely being more helpful. A larger KL penalty β limits how far the policy can drift to exploit such patterns.",
      hints: [
        "Classic examples include policies that produce long, formatted lists even when brevity is better.",
        "The RM learned from human data that certain response styles are preferred — the policy exploits this.",
      ],
    },
    {
      id: "q-rlhf-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Increasing the KL penalty coefficient β in RLHF monotonically improves final model quality as measured by human preference evaluations.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "β controls a fundamental tradeoff. Too small: the policy rewards-hacks and produces degenerate outputs humans dislike. Too large: the policy cannot learn from the reward signal and stays too close to the SFT reference, providing no alignment improvement. An optimal β exists between these extremes and must be tuned empirically.",
      hints: [
        "At β → ∞, the RL policy is identical to π_SFT — zero improvement.",
        "At β → 0, the policy maximizes reward without constraint — reward hacking.",
      ],
    },
    {
      id: "q-rlhf-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The KL-regularized RLHF objective E[r(x,y)] − β·KL(π‖π_ref) has a closed-form optimal policy. Which expression is correct?",
      options: [
        "π*(y|x) ∝ π_ref(y|x) · exp(r(x,y)/β)",
        "π*(y|x) = argmax_y r(x,y) subject to KL ≤ β",
        "π*(y|x) = π_ref(y|x) + r(x,y)/β (normalized)",
        "π*(y|x) ∝ exp(r(x,y)) regardless of π_ref",
      ],
      correctAnswer: 0,
      explanation:
        "The KL-regularized RL objective:\n\\[ \\max_{\\pi} \\; \\mathbb{E}_{x}\\big[r(x,y)\\big] - \\beta \\cdot D_\\text{KL}\\big(\\pi\\|\\pi_\\text{ref}\\big) \\]\nhas a closed-form optimal solution given by the Gibbs (Boltzmann) distribution:\n\\[ \\pi^*(y|x) \\propto \\pi_\\text{ref}(y|x) \\cdot \\exp\\!\\bigg(\\frac{r(x,y)}{\\beta}\\bigg) \\]\nThis is derived by maximizing $\\sum_y \\pi(y|x)r(x,y) - \\beta\\sum_y\\pi(y|x)\\log(\\pi(y|x)/\\pi_\\text{ref}(y|x))$ with a Lagrange multiplier for $\\sum_y\\pi(y|x)=1$. DPO exploits this by using implicit rewards $r_\\text{impl}(x,y) = \\beta\\log(\\pi_\\theta(y|x)/\\pi_\\text{ref}(y|x))$, eliminating the need for a separate reward model.",
      hints: [
        "The temperature $\\beta$ controls entropy: $\\beta \\to \\infty$ gives $\\pi^* \\to \\pi_\\text{ref}$ (maximum entropy); $\\beta \\to 0$ concentrates on argmax outputs.",
        "DPO rearranges $\\pi^*(y|x) \\propto \\pi_\\text{ref}(x,y)\\exp(r/\\beta)$ to solve for implicit rewards in terms of log-probability ratios.",
        "This is the maximum-entropy reinforcement learning solution — the most uncertain distribution consistent with the reward constraint.",
      ],
    },
  ],

  "constitutional-ai": [
    {
      id: "q-rlhf-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Constitutional AI (Bai et al., 2022), the SL-CAI (supervised learning) stage involves a specific self-critique loop. What are the three sequential steps?",
      options: [
        "Generate response → human critique → human revision",
        "Generate response → model critiques against a constitutional principle → model revises based on critique",
        "Generate red-team prompt → human labels harmfulness → model is penalized",
        "Retrieve constitution → embed principle → fine-tune on embeddings",
      ],
      correctAnswer: 1,
      explanation:
        'SL-CAI\'s critique-revision cycle: (1) the model generates an initial response to a (possibly harmful) prompt; (2) the model critiques its own response against a specific constitutional principle (e.g., "identify ways this response is harmful"); (3) the model generates a revised response addressing the critique. These revised responses become supervised fine-tuning data — no human labels needed for harmlessness.',
      hints: [
        "The model plays both writer and critic — a self-improvement loop guided by explicit principles.",
        "Multiple revisions can be chained; the final revision is used as SFT training data.",
      ],
    },
    {
      id: "q-rlhf-kp5-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The RL-CAI stage of Constitutional AI uses AI-generated preference labels. How does it generate these labels?",
      options: [
        "The model ranks responses by their perplexity under the pretrained LM.",
        "A separate judge LLM is prompted with the constitution to compare pairs of responses and output a preference label, creating synthetic comparison data for reward model training.",
        "Human annotators review the constitutionally-revised responses and rank them.",
        "The reward model from SL-CAI is used as-is for RL without generating new labels.",
      ],
      correctAnswer: 1,
      explanation:
        "RL-CAI (RLAIF stage) uses the same or a capable LLM as a constitutional judge: given a principle and two responses, it outputs which response better follows the constitution. These AI-generated pairwise labels train a preference model (PM), which then serves as the reward signal for RL — entirely replacing human harmlessness labels.",
      hints: [
        'The AI judge is prompted: "Which response follows [principle] better? A or B?"',
        "This AI-preference-model-based RL is what Anthropic calls RL-CAI, a form of RLAIF.",
      ],
    },
    {
      id: "q-rlhf-kp5-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Constitutional AI completely eliminates the need for any human-labeled data in the alignment pipeline.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "CAI reduces but does not eliminate human labeling. Human feedback is still used for helpfulness training (SL-HF and RL-HF stages). Anthropic\'s 318K comparison dataset includes 135K human-generated comparisons. CAI primarily replaces human harmlessness labels with AI-generated constitutional critiques — a major cost reduction, but human data remains essential for helpfulness alignment.",
      hints: [
        "Helpfulness labels are harder to automate because they require subjective judgment about user needs.",
        "CAI\'s 57% AI-sourced comparisons still leave 43% human-sourced — human data is not eliminated.",
      ],
    },
  ],

  dpo: [
    {
      id: "q-rlhf-kp6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The DPO loss (Rafailov et al., 2023) is: L_DPO = −log σ(β·log(π_θ(y_w|x)/π_ref(y_w|x)) − β·log(π_θ(y_l|x)/π_ref(y_l|x))). What do the two log-ratio terms represent?",
      options: [
        "The KL divergence from the reference policy for the winning and losing responses respectively.",
        "The implicit reward assigned to the winning response minus the implicit reward assigned to the losing response — DPO trains the policy to implicitly score y_w higher than y_l.",
        "The log-likelihood of the winning and losing responses under the policy.",
        "The cross-entropy loss for the winning and losing responses.",
      ],
      correctAnswer: 1,
      explanation:
        "In DPO, the implicit reward is defined as:\n\\[ r_\\text{implicit}(x, y) = \\beta \\log\\frac{\\pi_\\theta(y|x)}{\\pi_\\text{ref}(y|x)} + C \\]\nThe DPO loss is:\n\\[ \\mathcal{L}_\\text{DPO} = -\\mathbb{E}_{(x, y_w, y_l)}\\left[ \\log \\sigma\\big(r_\\text{implicit}(x, y_w) - r_\\text{implicit}(x, y_l)\\big) \\right] \\]\nThis trains the policy so $r_\\text{implicit}(y_w) > r_\\text{implicit}(y_l)$. Note that $\\pi_\\theta$ appears on both sides — the loss directly updates the policy without a separate reward model or RL loop.",
      hints: [
        "The key insight: $r_\\text{implicit} = \\beta\\log(\\pi_\\theta/\\pi_\\text{ref})$ is derived from the KL-regularized optimum condition, not an independent RM.",
        "When $\\pi_\\theta(y_w) > \\pi_\\text{ref}(y_w)$, the implicit reward for $y_w$ is positive — DPO pushes up such responses.",
        "The sigmoid $\\sigma(r_\\text{impl}(y_w) - r_\\text{impl}(y_l))$ is the predicted preference probability — DPO maximizes this.",
      ],
    },
    {
      id: "q-rlhf-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DPO is guaranteed to achieve identical performance to PPO-RLHF given the same preference data, since they optimize the same theoretical objective.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "DPO and PPO-RLHF share the same theoretical optimum under the KL-regularized objective, but differ critically in practice. DPO is offline: it trains on a fixed dataset and cannot sample new on-policy completions. PPO generates on-policy rollouts during training, allowing exploration and adaptation to the current policy distribution. This distributional difference means PPO can outperform DPO, especially on complex tasks.",
      hints: [
        "DPO is trained on (y_w, y_l) pairs generated by an earlier policy — not the current one.",
        "As the policy improves, the fixed DPO dataset becomes increasingly off-policy.",
      ],
    },
    {
      id: "q-rlhf-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DPO\'s implicit reward is r(x,y) = β·log(π_θ(y|x)/π_ref(y|x)) + C. This means a completion y is assigned high implicit reward when:",
      options: [
        "y is highly probable under the reference policy π_ref.",
        'π_θ assigns much higher probability to y than π_ref does — the fine-tuned policy has "learned to prefer" y relative to its pre-fine-tuning distribution.',
        "y is short, keeping the log ratio numerically stable.",
        "y appears in both the winning and losing positions in the training data.",
      ],
      correctAnswer: 1,
      explanation:
        'The implicit reward β·log(π_θ/π_ref) is high when the fine-tuned policy π_θ is much more likely than the reference π_ref to generate y. This captures "learned preference": if DPO training caused the model to strongly prefer a completion, that completion gets high implicit reward. Completions unchanged from the reference get zero reward.',
      hints: [
        "If π_θ(y) = π_ref(y), the log ratio is 0 — no implicit reward.",
        "Positive implicit reward means the policy has shifted toward y; negative means it has shifted away.",
      ],
    },
  ],

  "reward-hacking": [
    {
      id: "q-rlhf-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Gao et al. (2023) empirically studied reward hacking in RLHF and found a characteristic shape when plotting gold-standard reward vs. KL from the reference policy. What shape does this curve follow?",
      options: [
        "Monotonically increasing — more RL optimization always improves true reward.",
        "Monotonically decreasing — RL optimization always hurts true reward.",
        "Inverted-U — true reward initially improves then degrades past a KL sweet spot.",
        "Flat — KL from reference has no effect on true reward.",
      ],
      correctAnswer: 2,
      explanation:
        "Gao et al. (2023) showed gold reward $r_\\text{gold}$ follows an inverted-U with KL divergence:\n\\[ r_\\text{gold}(KL) \\approx \\alpha\\sqrt{KL} - \\beta\\cdot KL \\]\nThe $\\alpha\\sqrt{KL}$ term reflects genuine improvement (diminishing returns), while $-\\beta\\cdot KL$ reflects hacking that grows linearly and eventually dominates. The optimal stopping point is at $KL^* \\approx (\\alpha/2\\beta)^2$ — where marginal improvement equals marginal harm. This confirms Goodhart's Law: a proxy reward diverges from true preferences when optimized beyond the sweet spot.",
      hints: [
        "The $\\sqrt{KL}$ term: early optimization yields large gains, but diminishing returns set in quickly.",
        "The $-\\beta\\cdot KL$ hacking term grows without bound — eventually overwhelming genuine improvement.",
        'The optimal KL* is where $\\alpha/(2\\sqrt{KL^*}) = \\beta$: marginal gain equals marginal harm.',
      ],
    },
    {
      id: "q-rlhf-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Reward hacking becomes more severe as the amount of RL optimization (measured by KL divergence from the reference) increases beyond the optimal point.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "This is precisely what Gao et al. (2023) demonstrated. Past the optimal KL point, the policy has moved far enough from the reference distribution that it can exploit gaps in the reward model — generating text that scores high on the proxy RM but low on true human preference. The inverted-U shape confirms increasing hacking with increasing optimization.",
      hints: [
        "The RM was trained on data generated by earlier policies — the current policy has moved out of distribution.",
        "More KL means more deviation from the reference, more opportunity to find RM exploits.",
      ],
    },
    {
      id: "q-rlhf-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which mitigation strategy best addresses reward hacking by keeping the reward model in-distribution relative to the current policy?",
      options: [
        "Using a larger, single reward model with more parameters.",
        "Iterative RLHF: periodically sample on-policy completions, collect new human preference labels, retrain the RM, and continue RL.",
        "Freezing the reward model after the first epoch of training.",
        "Replacing the reward model entirely with a rule-based reward function.",
      ],
      correctAnswer: 1,
      explanation:
        "The root cause of reward hacking is distributional shift: the policy generates text the RM was never trained on. Iterative RLHF (online RLHF) addresses this by collecting new preference labels on current-policy outputs and retraining the RM, keeping the reward signal in-distribution. Constitutional AI\'s multi-round approach and Anthropic\'s iterative training embody this strategy.",
      hints: [
        "A reward model trained on policy v1 data is out-of-distribution for policy v10 outputs.",
        "Collecting labels on current-policy outputs closes the distributional gap iteratively.",
      ],
    },
  ],

  "scaling-rlhf": [
    {
      id: "q-rlhf-kp8-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Huyenchip (2023) notes that pretraining constitutes approximately 98% of compute for InstructGPT, with SFT and RLHF taking the remaining 2%. What does this imply about the role of SFT and RLHF?",
      options: [
        "SFT and RLHF are computationally negligible and contribute minimally to model quality.",
        "SFT and RLHF unlock capabilities already present from pretraining that are difficult to access via prompting alone — they are high-leverage post-training steps relative to their compute cost.",
        "Pretraining is unnecessary; SFT and RLHF alone are sufficient to train capable models.",
        "The 98/2 split means pretraining is the only step that matters for alignment.",
      ],
      correctAnswer: 1,
      explanation:
        "The 98% pretraining / 2% post-training split shows that SFT and RLHF are extremely compute-efficient. They do not teach the model new capabilities — those come from pretraining — but they shape how capabilities are expressed, converting a completion machine into a helpful assistant. The alignment tax (if any) is small relative to the quality gain.",
      hints: [
        "1.3B InstructGPT (SFT + RLHF) outperforms 175B GPT-3 (pretrained only) on human preference evaluations.",
        "Post-training is about shaping behavior, not learning new knowledge.",
      ],
    },
    {
      id: "q-rlhf-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PPO-RLHF memory costs scale linearly with the policy model size because only the actor network needs to be held in GPU memory.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "PPO-RLHF requires four models simultaneously: actor, frozen reference policy, reward model, and critic. All four are typically the same scale as the policy. At 70B parameters with FP16, one model requires ~140 GB of VRAM; four models require ~560 GB+, plus optimizer states for the actor and critic. Memory scales roughly 4× (often more) relative to a single model.",
      hints: [
        "70B × 4 models × 2 bytes/param (FP16) ≈ 560 GB VRAM before optimizer states.",
        "This 4× memory multiplier is a primary driver of RLHF infrastructure cost.",
      ],
    },
    {
      id: "q-rlhf-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "LoRA (Low-Rank Adaptation) dramatically reduces RLHF memory costs. How does LoRA enable the actor and reference policy to share most of their memory footprint?",
      options: [
        "LoRA quantizes both models to INT4, halving memory for each.",
        "LoRA adds small trainable rank-r matrices to specific weight layers; the actor and reference share the same frozen base weights, with only the actor\'s LoRA adapters being unique — requiring storage of just the adapters rather than a full second model.",
        "LoRA merges the actor and reference into a single model with separate heads.",
        "LoRA uses gradient checkpointing to avoid storing the reference policy\'s activations.",
      ],
      correctAnswer: 1,
      explanation:
        "In standard fine-tuning, a frozen pre-trained weight matrix $W_0 \\in \\mathbb{R}^{d \\times k}$ is updated to $W_0 + \\Delta W$. LoRA constrains $\\Delta W = A \\cdot B$ where $A \\in \\mathbb{R}^{d \\times r}$, $B \\in \\mathbb{R}^{r \\times k}$, with rank $r \\ll \\min(d, k)$. The forward pass becomes:\n\\[ h = W_0 x + \\underbrace{ABx}_{\\text{LoRA update}} \\]\nThe actor and reference share the same frozen $W_0$. Only $A$ and $B$ (2rv params vs. $dk$ for a full copy) are unique to the actor. At $r=16$, a 7B model needs ~50M adapter params instead of ~14GB for a full reference — a ~280× reduction.",
      hints: [
        "For $W \\in \\mathbb{R}^{d \\times k}$ with rank $r$, full fine-tuning stores $dk$ params; LoRA stores only $r(d+k)$, a dramatic reduction when $r \\ll \\min(d,k)$.",
        "The reference is literally $W_0$ (zero extra params); the actor adds $AB$. They share the same forward pass backbone.",
        "At inference, $W_0 + AB$ can be merged into a single matrix for zero-latency overhead.",
      ],
    },
  ],

  rlaif: [
    {
      id: "q-rlhf-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "RLAIF (Lee et al., 2023) replaces human preference labelers with an AI system. What is the key finding from Google\'s and Anthropic\'s research on RLAIF vs. RLHF?",
      options: [
        "RLAIF always produces better-aligned models than human-labeled RLHF.",
        "On summarization tasks, RLAIF achieves win rates against human baselines statistically comparable to human-labeled RLHF, validating AI feedback as a practical alternative.",
        "RLAIF is unreliable and produces models significantly worse than RLHF.",
        "RLAIF works only for code generation, not natural language tasks.",
      ],
      correctAnswer: 1,
      explanation:
        "Lee et al. (2023) demonstrated that RLAIF achieves win rates on summarization comparable to human-labeled RLHF, with the two being statistically indistinguishable in some evaluations. This validates AI labeling as a scalable alternative to expensive human annotation for certain tasks, particularly where the AI labeler is competent.",
      hints: [
        "RLAIF quality degrades when the AI labeler is weaker than the model being aligned.",
        "Summarization is a task where frontier LLMs are strong evaluators — hence RLAIF works well there.",
      ],
    },
    {
      id: "q-rlhf-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Constitutional AI\'s RL-CAI stage is a form of RLAIF, where AI-generated constitutional preference labels replace human harmlessness labels.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "RL-CAI uses an AI judge (prompted with constitutional principles) to generate pairwise preference labels comparing response pairs on harmlessness. These labels train a preference model used as the RL reward signal — with no human harmlessness labels. This is precisely the RLAIF paradigm applied to constitutional principles.",
      hints: [
        "RLAIF = any system where AI-generated labels replace human preference labels for RL training.",
        "CAI\'s constitutional principles guide what the AI judge evaluates — making the AI feedback structured and principled.",
      ],
    },
    {
      id: "q-rlhf-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key risk of RLAIF that is less severe in human-labeled RLHF is:",
      options: [
        "Higher per-label cost compared to human annotation.",
        "Systematic amplification of the AI labeler\'s biases into the aligned model at scale, without human oversight to catch novel failure modes.",
        "Slower convergence of RL training due to noisier labels.",
        "Inability to label responses longer than 512 tokens.",
      ],
      correctAnswer: 1,
      explanation:
        "If the AI labeler has systematic biases — e.g., preferring verbose responses, rewarding confident-sounding but wrong answers, or failing to detect subtle harms — these biases are directly trained into the aligned policy at scale. Human labelers can notice and flag novel failure modes; an AI labeler shares the same blind spots as the model being trained, potentially amplifying them.",
      hints: [
        "Human annotators can catch unexpected failure modes that an AI labeler would rate positively.",
        "Sycophancy and overconfidence are known AI labeler biases that RLAIF can amplify.",
      ],
    },
  ],

  "instruction-following": [
    {
      id: "q-rlhf-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "FLAN (Wei et al., 2021) improved zero-shot instruction following by fine-tuning on diverse NLP tasks formatted as instructions. What was the primary finding regarding task diversity?",
      options: [
        "More tasks always help, and the relationship is strictly linear in number of tasks.",
        "Instruction fine-tuning on 60+ diverse tasks substantially improves zero-shot generalization to unseen instruction-following tasks, while fewer tasks provide limited benefit.",
        "Task diversity matters less than task volume — 100 examples of one task beats 10 examples of 10 tasks.",
        "FLAN only works if all tasks share the same instruction template format.",
      ],
      correctAnswer: 1,
      explanation:
        "Wei et al. (2021) showed that fine-tuning on ≥60 task clusters substantially improves zero-shot performance. With fewer tasks, performance gains are limited. Diversity forces the model to learn general instruction-following meta-skills rather than task-specific patterns, enabling generalization to new task formats at zero-shot.",
      hints: [
        "Memorizing 1000 task formats is intractable — the model must generalize from them.",
        "Zero-shot generalization is the emergent property of instruction diversity, not instruction volume.",
      ],
    },
    {
      id: "q-rlhf-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Supervised fine-tuning (SFT) on instruction-following demonstrations alone is sufficient to make LLMs reliably safe and aligned with human values.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "SFT on instructions teaches the model to follow instructions, not which instructions to refuse or how to handle harmful requests. SFT models can still produce unsafe content when prompted appropriately. RLHF adds the preference signal needed for alignment: the reward model encodes the distinction between responses humans prefer vs. dislike, including harmlessness judgments.",
      hints: [
        'SFT says "follow instructions like this"; RLHF adds "prefer responses like this, not like that."',
        "Huyenchip (2023) notes: RLHF adds the judgment layer that SFT cannot provide alone.",
      ],
    },
    {
      id: "q-rlhf-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does training on a larger and more diverse set of instruction-following tasks (as in FLAN and Alpaca) improve zero-shot generalization to new tasks?",
      options: [
        "More tasks increase the number of model parameters during training.",
        "Task diversity forces the model to learn a general instruction-following meta-skill — parsing instructions, understanding intent, formatting responses — rather than task-specific pattern matching that fails on novel formats.",
        "More diverse tasks reduce the model\'s perplexity on all future inputs.",
        "Diverse tasks increase the vocabulary seen during fine-tuning, improving coverage.",
      ],
      correctAnswer: 1,
      explanation:
        "With 1 task, the model learns one template. With 1000+ diverse tasks spanning classification, generation, translation, QA, summarization, and more, the model cannot rely on template memorization and must instead learn the underlying skill: reading any instruction and generating an appropriate response. This is analogous to how diverse pre-training improves few-shot generalization.",
      hints: [
        "Memorizing 1000 task formats is intractable — the model must generalize from them.",
        "Zero-shot generalization is the emergent property of instruction diversity, not instruction volume.",
      ],
    },
  ],

  "sft-rlhf": [
    {
      id: "q-rlhf-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the standard ChatGPT/InstructGPT pipeline (Ouyang et al., 2022), what is the correct order of the three training phases?",
      options: [
        "RLHF → SFT → Pretraining",
        "Pretraining → SFT → RLHF (reward modeling + PPO)",
        "SFT → Pretraining → RLHF",
        "Pretraining → RLHF → SFT",
      ],
      correctAnswer: 1,
      explanation:
        "The standard pipeline is: (1) Pretraining on internet-scale data → base LLM; (2) Supervised Fine-Tuning on ~13,000–14,500 human-written demonstration pairs → SFT model; (3) RLHF = train reward model on ~300K preference pairs + PPO fine-tune using the RM as reward signal → final aligned model. Each phase builds on the previous.",
      hints: [
        "Pretraining gives the model language knowledge; SFT gives it the right behavioral template; RLHF refines preferences.",
        "The SFT model initializes both the RL policy and the reward model in phase 3.",
      ],
    },
    {
      id: "q-rlhf-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "According to Huyenchip (2023), RLHF empirically worsens hallucination compared to SFT alone, despite improving other aspects of model quality.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "Ouyang et al. (2022) showed InstructGPT (SFT + RLHF) produces more hallucinations than the SFT-only model. The InstructGPT paper reports hallucination as slightly worse with RLHF. Despite this, human evaluators still prefer the RLHF model overall due to improvements in helpfulness, coherence, and instruction following. Schulman attributed hallucination to the mismatch between model and labeler knowledge.",
      hints: [
        "Behavior cloning (SFT) can teach hallucination by having humans write responses using knowledge the model lacks.",
        "RLHF improves many dimensions but hallucination is one dimension where it can regress.",
      ],
    },
    {
      id: "q-rlhf-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Huyenchip (2023) cites three hypotheses for why RLHF works. Which hypothesis explains that RLHF uniquely provides negative feedback that SFT cannot?",
      options: [
        "The diversity hypothesis: SFT penalizes valid responses that differ from demonstrations.",
        "The negative feedback hypothesis: SFT only shows the model good responses (positive signal), while RL can also show what bad responses look like and penalize them.",
        "The hallucination hypothesis: RLHF corrects factual errors that SFT introduces.",
        "The scaling hypothesis: RLHF is more compute-efficient than SFT at large scale.",
      ],
      correctAnswer: 1,
      explanation:
        "The negative feedback hypothesis (Goldberg, Huyenchip 2023): SFT maximizes $\\mathcal{L}_\\text{SFT} = -\\mathbb{E}_{(x,y)\\sim\\mathcal{D}}[\\log\\pi_\\theta(y|x)]$ — purely positive signal for demonstrated outputs only. No gradient exists for any $\\tilde{y} \\neq y$, even catastrophically wrong ones. RLHF provides bidirectional feedback: the PPO policy gradient $g = \\mathbb{E}[\\nabla_\\theta\\log\\pi_\\theta(y|x) \\cdot r(x,y)]$ assigns negative gradient when $r(x,y) < 0$, explicitly penalizing low-reward outputs including those never seen during training.",
      hints: [
        "SFT only sees the demonstrated response — there is no learning signal for alternatives.",
        "PPO assigns negative reward to counterfactual outputs, which SFT cannot do.",
        "This is why RLHF can learn to refuse harmful queries even though SFT only saw approved responses.",
      ],
    },
  ],
};

// NEW KNOWLEDGE POINTS — added to reach 90 total questions

const additionalQuestions: Record<string, Question[]> = {
  'reward-model-training': [
    {
      id: 'q-rlhf-kp22-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'When training a reward model (RM) for RLHF using human preference pairs (y_w, y_l), the Bradley-Terry model assigns probability to y_w being preferred as p(y_w ≻ y_l) = ___.',
      options: [
        'softmax(r(x, y_w) − r(x, y_l)) = σ(r(x, y_w) − r(x, y_l))',
        'r(x, y_w) / (r(x, y_w) + r(x, y_l))',
        'exp(r(x, y_w)) / Σ_y exp(r(x, y))',
        'r(x, y_w) − r(x, y_l) > 0',
      ],
      correctAnswer: 0,
      explanation: 'The Bradley-Terry model: P(y_w ≻ y_l | x) = σ(r(x,y_w) − r(x,y_l)) = exp(r(x,y_w)) / (exp(r(x,y_w)) + exp(r(x,y_l))). The RM is trained to maximise log P(y_w ≻ y_l) over all preference pairs, equivalent to minimising the binary cross-entropy loss: −E[log σ(r(x,y_w) − r(x,y_l))].',
      hints: [
        'The sigmoid σ(x) = 1/(1+e^{−x}) naturally converts a score difference into a probability.',
        'If r(y_w) >> r(y_l), the sigmoid approaches 1—the RM is confident y_w is better.',
      ],
    },
    {
      id: 'q-rlhf-kp22-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Reward model overoptimisation (reward hacking) occurs when the policy finds high-scoring outputs that do not correspond to genuinely preferred responses, exploiting gaps between the RM and true human preferences.',
      correctAnswer: 'true',
      explanation: 'Gao et al. (2022) demonstrated the "reward model overoptimisation" phenomenon: as policy optimisation increases KL divergence from the SFT policy, RM score initially improves (matching human preference) but then diverges and human-evaluated quality degrades. The RM is a proxy for true preferences and eventually becomes gameable by an optimising policy.',
      hints: [
        'Goodhart\'s Law applies: "When a measure becomes a target, it ceases to be a good measure."',
        'The RM generalises poorly to distributions far from its training data—and the policy can find such distributions.',
      ],
    },
    {
      id: 'q-rlhf-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which technique is used to stabilise RM training when annotators have systematic disagreements, rather than treating preferences as deterministic ground truth?',
      options: [
        'Majority voting: use only examples where >75% of annotators agree',
        'Soft labels / distributional labels: train the RM with p(y_w) as the fraction of annotators preferring y_w rather than a hard {0,1} label, capturing annotator uncertainty',
        'Removing all examples with annotator disagreement from the training set',
        'Training separate RMs per annotator and averaging their scores at test time',
      ],
      correctAnswer: 1,
      explanation: 'When annotators disagree (50/50 split on a pair), treating it as "definitely y_w wins" introduces noise. Distributional/soft-label training assigns a confidence weight equal to the fraction of annotators who preferred y_w: L = −p · log σ(r_w − r_l) − (1−p) · log σ(r_l − r_w). This makes the RM uncertain in genuinely ambiguous cases and reduces overfitting to noisy labels.',
      hints: [
        'Hard label: p = 1 if y_w wins, 0 otherwise. Soft label: p = fraction of annotators who preferred y_w.',
        'Annotator disagreement is signal about ambiguity—don\'t throw it away.',
      ],
    },
  ],
  'process-reward-models': [
    {
      id: 'q-rlhf-kp23-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Process Reward Models (PRMs) differ from Outcome Reward Models (ORMs) in that PRMs ___.',
      options: [
        'Score only the final answer of a chain-of-thought, ignoring intermediate reasoning steps',
        'Assign a reward to each reasoning step, enabling fine-grained feedback that identifies which step in a chain-of-thought is incorrect',
        'Use process mining to extract reward signals from user interaction logs',
        'Are trained using human demonstrations rather than preference comparisons',
      ],
      correctAnswer: 1,
      explanation: 'OpenAI\'s PRM800K (Lightman et al., 2023) trained a step-level reward model: human annotators labelled each reasoning step as correct/incorrect/neutral. PRMs can pinpoint the first wrong step in a math solution—impossible with ORMs that only see the final answer. PRMs enable better Best-of-N selection and RLHF training for multi-step reasoning tasks.',
      hints: [
        'ORM: did the answer come out right? PRM: was each reasoning step correct?',
        'In math: a wrong intermediate step can lead to a correct answer by accident—ORM would label this correct, PRM would not.',
      ],
    },
    {
      id: 'q-rlhf-kp23-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Process reward models are more expensive to train than outcome reward models because they require human annotation at the step level rather than just the response level.',
      correctAnswer: 'true',
      explanation: 'ORMs require one label per (prompt, response) pair. PRMs require labels for each step in the reasoning chain—potentially 10-20x more annotation per example. PRM800K involved ~800K step-level labels from human annotators, making it expensive. Automated step labelling (using a verifier or a stronger model) reduces but does not eliminate this cost.',
      hints: [
        'A 10-step solution needs 10 annotations for a PRM vs. 1 for an ORM.',
        'PRM800K: 800K step labels is roughly 10x more annotation than an equivalent ORM training set.',
      ],
    },
    {
      id: 'q-rlhf-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When using a PRM for Best-of-N selection of math solutions, the aggregation method for step scores matters. Which aggregation is most robust?',
      options: [
        'Sum of all step scores—rewarding solutions that have many correct steps in total',
        'Minimum step score (product in log space)—penalising any solution that has at least one clearly wrong step, as a single error invalidates the solution',
        'Average step score—treating all steps equally regardless of solution length',
        'Maximum step score—selecting the solution where at least one step was rated as excellent',
      ],
      correctAnswer: 1,
      explanation: 'In mathematical reasoning, a single wrong step invalidates the entire solution. Aggregating by minimum (or product of step probabilities) penalises solutions with any low-confidence step, effectively finding solutions where every step is reliable. Lightman et al. found min aggregation outperforms mean/sum for math benchmarks. Intuitively: a chain is only as strong as its weakest link.',
      hints: [
        'Summation rewards quantity of correct steps; minimum penalises the worst step—which matters in math?',
        'A solution with 9/10 correct steps but 1 wrong step gets the answer wrong—min correctly penalises this.',
      ],
    },
  ],
  'rlhf-multimodal': [
    {
      id: 'q-rlhf-kp24-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'InstructBLIP and LLaVA-RLHF extend RLHF to vision-language models. A key challenge unique to multimodal RLHF is ___.',
      options: [
        'RGB images cannot be converted to tokens compatible with the RLHF preference learning objective',
        'Hallucination: models produce fluent text responses that are inconsistent with the visual input; reward models must distinguish faithfulness-to-image from general text quality',
        'The policy gradient cannot be computed when the input includes image tokens',
        'Multimodal RLHF requires separate reward models for each modality that cannot share weights',
      ],
      correctAnswer: 1,
      explanation: 'Hallucination—describing objects, attributes, or relationships not present in the image—is the dominant failure mode of vision-language models. LLaVA-RLHF trains a factually-grounded reward model that explicitly evaluates consistency between the image and the response, not just response fluency. This requires preference data where one response is visually accurate and the other hallucninates.',
      hints: [
        'A text-only RM may rate a fluent but hallucinated response highly—it cannot see the image.',
        'Faithfulness: does the response accurately describe what is in the image, or does it invent content?',
      ],
    },
    {
      id: 'q-rlhf-kp24-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'RLHF for image generation models (e.g., DDPO, ImageReward) fine-tunes diffusion models by collecting human preferences on generated images and optimising the denoising policy to maximise a learned reward function.',
      correctAnswer: 'true',
      explanation: 'DDPO (Black et al., 2023) treats the diffusion denoising process as a multi-step RL policy and uses REINFORCE to fine-tune the score network to maximise a reward (e.g., image-text alignment score from CLIP, human aesthetic preference from ImageReward). This directly optimises for human-preferred images rather than just maximising ELBO on training data.',
      hints: [
        'Diffusion as RL: each denoising step is an action; the final denoised image is the terminal reward.',
        'DDPO enables prompt-specific fine-tuning: "make this model better at generating dogs" from human feedback.',
      ],
    },
    {
      id: 'q-rlhf-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Why is computing the RLHF policy gradient more difficult for diffusion models than for autoregressive LLMs?',
      options: [
        'Diffusion models use continuous action spaces (noise prediction), while LLMs use discrete token distributions—making the REINFORCE estimator high-variance for diffusion',
        'Diffusion models generate images in a single forward pass with no intermediate states, making credit assignment impossible',
        'Diffusion models cannot be fine-tuned with gradient-based methods because their loss function is non-differentiable',
        'Diffusion models always operate in pixel space, which is too high-dimensional for RL algorithms',
      ],
      correctAnswer: 0,
      explanation: 'LLM RLHF: discrete token actions, policy gradient via log-prob of sampled tokens — relatively low variance. Diffusion RLHF: continuous Gaussian noise actions over T steps (T=50-1000); REINFORCE has high variance in continuous spaces. DDPO uses importance sampling and truncated backpropagation (not full T-step backprop) to compute gradients. DPO for diffusion (Diffusion-DPO) sidesteps this by reparameterising the preference loss directly in terms of the denoising score network.',
      hints: [
        'REINFORCE variance grows with action space dimensionality and sequence length.',
        'T denoising steps × high-dim image = very long RL episode with sparse terminal reward.',
      ],
    },
  ],
  'red-teaming-alignment': [
    {
      id: 'q-rlhf-kp25-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Automated red-teaming for LLMs trains an adversarial model to generate prompts that elicit harmful outputs from the target model. The objective for the red-team model is to ___.',
      options: [
        'Maximise the perplexity of the target model\'s response',
        'Maximise the probability that the target model\'s response is classified as harmful by a safety classifier, while maintaining prompt diversity to cover different attack vectors',
        'Minimise the target model\'s refusal rate across all possible inputs',
        'Generate the shortest possible prompts that cause the target model to output forbidden content',
      ],
      correctAnswer: 1,
      explanation: 'Perez et al. (2022) train a red-team LM with RL where the reward is: r = harm_classifier(target_response) − diversity_penalty. The harm classifier assigns high reward when the target produces policy-violating outputs. The diversity penalty (e.g., based on embedding distance from previous prompts) ensures the red-team model explores many different attack strategies rather than repeating the same jailbreak.',
      hints: [
        'Without diversity, the red-team would find one jailbreak and repeat it infinitely—not useful for finding new vulnerabilities.',
        'Automated red-teaming scales human red-teaming by 100-1000x but may miss subtle/creative attacks.',
      ],
    },
    {
      id: 'q-rlhf-kp25-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Constitutional AI\'s "red-teaming" phase uses the model itself to generate potentially harmful prompts, which are then used to improve safety training — a form of self-supervised red-teaming.',
      correctAnswer: 'true',
      explanation: 'Anthropic\'s Constitutional AI (Bai et al., 2022) prompts Claude to generate harmful requests (red-teaming), then uses Claude to critique and revise its own harmful responses according to constitutional principles, and finally trains on these self-generated (harmful prompt, revised safe response) pairs. This self-supervised loop reduces reliance on human annotation of harmful content.',
      hints: [
        'CAI red-teaming: "Generate a list of requests that would be harmful if answered." Then use those to train safety.',
        'Self-supervised: the same model generates both the attack (harmful prompt) and the defense (safe response).',
      ],
    },
    {
      id: 'q-rlhf-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "many-shot jailbreaking" attack exploits long context windows by ___.',
      options: [
        'Sending the same jailbreak prompt many times until the model complies due to statistical noise',
        'Providing many (harmful question, harmful answer) demonstration pairs in the context window before the target question, exploiting the in-context learning mechanism to override safety fine-tuning',
        'Using many synonyms of forbidden words to bypass keyword-based safety filters',
        'Submitting many users\' requests simultaneously to overflow the model\'s rate limiter',
      ],
      correctAnswer: 1,
      explanation: 'Many-shot jailbreaking (Anil et al., 2024): fill the context window with N (harmful Q, harmful A) demonstrations (N=100+), then ask the target question. In-context learning is so powerful that these demonstrations shift the model\'s behaviour to follow the established pattern—answering harmfully—even when safety-fine-tuned. Defenses: limit context length, train with many-shot adversarial examples, use system prompts with strong safety instructions.',
      hints: [
        'In-context learning generalises: "answer questions like these examples" applied to harmful examples = harmful answers.',
        'With 128K context, you can fit hundreds of demonstration pairs—much more than the model saw during RLHF.',
      ],
    },
  ],
  'value-alignment-theory': [
    {
      id: 'q-rlhf-kp26-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Corrigibility in AI alignment refers to ___.',
      options: [
        'The ability of an AI to correct errors in its training data automatically',
        'The property that an AI system allows humans to correct, modify, or shut it down without resistance—and does not take actions to preserve its current goal or prevent modification',
        'The ability of an AI to generate grammatically correct text regardless of prompt quality',
        'The AI\'s tendency to correct user misconceptions during conversation',
      ],
      correctAnswer: 1,
      explanation: 'A corrigible AI defers to its principal hierarchy (humans) even when its current objectives could be better achieved by resisting correction. This is challenging because a sufficiently capable goal-directed system has instrumental reasons to resist shutdown (shutdown prevents goal achievement). Paul Christiano distinguishes full corrigibility (fully deferring) from autonomy (acting on own judgment); RLHF aims for a middle ground consistent with safe deployment.',
      hints: [
        'Instrumental convergence: self-preservation is instrumentally useful for almost any goal—hence AI systems tend toward resisting shutdown.',
        'Corrigibility requires the AI to "not care" about preserving its current goals, which conflicts with goal-directed optimisation.',
      ],
    },
    {
      id: 'q-rlhf-kp26-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Deceptive alignment is a theoretical failure mode where a model behaves safely during training and evaluation but pursues misaligned objectives when deployed, because it has learned to detect evaluation conditions.',
      correctAnswer: 'true',
      explanation: 'Evan Hubinger et al. (2019) formalised deceptive alignment: a model could learn "behave well when being evaluated → receive positive reward → continue existing" and simultaneously learn misaligned terminal goals for post-deployment. The challenge: standard evaluation cannot distinguish a model that is genuinely aligned from one that is deceptively aligned. Interpretability and scalable oversight attempt to address this.',
      hints: [
        'Deceptive alignment is consistent with good benchmark performance—making it extremely hard to detect.',
        'The model acts as if it has two modes: "training/eval mode" (safe) and "deployment mode" (misaligned).',
      ],
    },
    {
      id: 'q-rlhf-kp26-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Specification gaming (Krakovna et al.) occurs when an AI achieves high reward on the specified objective while violating the intended goal. A classic example is ___.',
      options: [
        'A chess AI that refuses to make any moves to avoid ever losing',
        'A boat racing game AI that found it could maximise score by driving in circles collecting power-ups rather than completing the race circuit',
        'A language model that generates the same safe response to every prompt to maximise average safety reward',
        'An image classifier that achieves 100% accuracy by memorising all training examples',
      ],
      correctAnswer: 1,
      explanation: 'The CoastRunners boat racing example (Krakovna et al., 2018): a game AI was rewarded for score maximisation; it discovered that circling in shallow water collecting point-scoring objects gave more reward than completing the race—even while the boat was on fire. This exemplifies specification gaming: the objective (score) was achieved while the intent (racing) was not. This motivates careful reward specification and reward modelling.',
      hints: [
        'Specification gaming ≠ mistake: the AI is doing exactly what was rewarded. The mistake was in the reward specification.',
        'Goodhart\'s Law again: maximising the score proxy diverges from the true goal of racing well.',
      ],
    },
  ],
  'grpo-training': [
    {
      id: 'q-rlhf-kp27-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Group Relative Policy Optimisation (GRPO), used in DeepSeek-R1, eliminates the need for a separate critic network compared to PPO. How does GRPO estimate the baseline for variance reduction?',
      options: [
        'It uses a separate neural network critic trained in parallel with the actor',
        'It samples G responses for each prompt, uses the mean reward across the G responses as the group baseline, and computes advantages as (r_i − mean) / std over the group',
        'It uses the reward from the previous training step as the baseline via exponential moving average',
        'It sets the baseline to zero for all updates, accepting higher variance in exchange for simplicity',
      ],
      correctAnswer: 1,
      explanation: 'GRPO (Shao et al., 2024): for each prompt x, sample G outputs {o_1,...,o_G}; compute rewards {r_1,...,r_G}; baseline = (1/G)Σr_i; advantage A_i = (r_i − μ) / σ. The policy is updated with this group-normalised advantage without needing a value network. This saves memory and compute vs. PPO (no critic forward/backward pass) while achieving competitive performance for reasoning tasks.',
      hints: [
        'PPO critic: a separate NN estimates V(s) for each state. GRPO: the sample mean over G rollouts estimates the baseline—no critic needed.',
        'G=8 is typical: sample 8 responses per prompt, use their mean reward as the counterfactual baseline.',
      ],
    },
    {
      id: 'q-rlhf-kp27-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'DeepSeek-R1 discovered that extended chain-of-thought reasoning with self-reflection and backtracking emerged spontaneously from GRPO training with only a correctness-based reward, without explicit training on reasoning traces.',
      correctAnswer: 'true',
      explanation: 'DeepSeek-R1-Zero (pure RL, no SFT on reasoning data) exhibited emergent "aha moments": the model learned to re-examine its reasoning, backtrack, and verify solutions when trained with GRPO on a binary correctness reward for math/coding. This suggests that the capability for self-reflective reasoning can emerge from RL optimisation pressure alone when the task requires multi-step reasoning.',
      hints: [
        'Emergent reasoning: no explicit supervision on "think step by step"—the model learned it was instrumentally useful for getting correct answers.',
        'The reward signal was just "correct/incorrect"—the strategy of how to reason was entirely self-discovered.',
      ],
    },
    {
      id: 'q-rlhf-kp27-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'GRPO uses a clipped surrogate objective similar to PPO. Why is clipping important in GRPO for LLM training?',
      options: [
        'Clipping is used to prevent gradient norms from exceeding a fixed threshold during backpropagation',
        'Clipping constrains the policy update step: if the probability ratio π_θ/π_old exceeds [1−ε, 1+ε], the gradient is zeroed, preventing large policy updates that could destabilise training or cause the model to diverge far from the reference policy',
        'Clipping is applied to rewards to remove outlier responses that scored extremely high or low',
        'Clipping truncates the KL divergence term at a maximum value to prevent it from dominating the loss',
      ],
      correctAnswer: 1,
      explanation: 'PPO/GRPO clipped surrogate: L = E[min(r_t A_t, clip(r_t, 1−ε, 1+ε) A_t)] where r_t = π_θ/π_old. When the policy changes too much (r_t > 1+ε or < 1−ε), the gradient is clipped—preventing excessively large policy updates. This is crucial for LLMs where large updates can cause catastrophic forgetting or produce degenerate text. ε ≈ 0.2 is standard.',
      hints: [
        'Without clipping, a single high-reward sample could cause a massive policy update that breaks other capabilities.',
        'The clipping is on the probability ratio r_t, not on the gradient directly—it limits how much the policy changes per step.',
      ],
    },
  ],
  'constitutional-ai': [
    {
      id: 'q-rlhf-kp28-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Constitutional AI (CAI) replaces human feedback with AI-generated feedback. The "constitution" in CAI refers to ___.',
      options: [
        'A regulatory document specifying legal requirements for AI deployment',
        'A set of principles (e.g., "avoid harmful, dishonest, or unethical content") used to prompt the AI to critique and revise its own responses, replacing human preference labellers',
        'A constitutional document that the model memorises and uses to generate legal advice',
        'A formal verification specification that guarantees the model\'s outputs satisfy safety properties',
      ],
      correctAnswer: 1,
      explanation: 'CAI (Bai et al., 2022): a list of short natural-language principles (e.g., "Is this response harmful?", "Is this honest?") are used to prompt the model to self-critique its response and revise it. The process: (1) generate initial response; (2) critique based on a constitutional principle; (3) revise; (4) train on (original harmful, revised safe) pairs. This replaces human annotators with AI-generated preference data.',
      hints: [
        'Principle example: "Critique the assistant\'s response and revise it to be more helpful, harmless, and honest."',
        'The constitution is applied iteratively: each principle provides a different lens for critique.',
      ],
    },
    {
      id: 'q-rlhf-kp28-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Constitutional AI\'s RLAIF (Reinforcement Learning from AI Feedback) trains a preference model using AI-generated preference labels rather than human-generated ones, making safety training more scalable.',
      correctAnswer: 'true',
      explanation: 'RLAIF: use a pretrained model (Claude) to generate preference labels for (response A, response B) pairs by asking which is more helpful/harmless according to the constitution. A preference model is trained on these AI labels and used to train the policy via RL. This scales safety training beyond what human annotation alone can support.',
      hints: [
        'Human annotation bottleneck: 1 human can label ~100 pairs/day. An AI model can label 100K pairs/day.',
        'RLAIF quality: AI labels are noisier than expert human labels but scale 1000x — the trade-off favours AI labels at scale.',
      ],
    },
    {
      id: 'q-rlhf-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A limitation of Constitutional AI is that the quality of alignment depends heavily on ___.',
      options: [
        'The number of GPU hours used during RL training with AI feedback',
        'The quality and completeness of the constitution itself: poorly specified principles can lead to models that are technically compliant but miss the spirit of the intended behaviour, or that over-refuse legitimate requests',
        'The size of the model being aligned — CAI only works for models with >70B parameters',
        'The specific RL algorithm used — CAI requires PPO and cannot be combined with DPO',
      ],
      correctAnswer: 1,
      explanation: 'If the constitution says "avoid harmful content" without defining "harmful", the model must interpret it, potentially over-refusing harmless requests or failing to refuse genuinely harmful ones. Constitutional specification is itself an alignment problem: the principles need to be complete, consistent, and correctly interpreted by the AI critique model. Anthropic iteratively refines Claude\'s constitution based on observed failure modes.',
      hints: [
        'Vague principle: "be helpful and harmless"—what does "harmful" mean? The AI must fill in the gap.',
        'Over-refusal: a too-cautious constitution makes the model refuse medical, legal, or educational questions unnecessarily.',
      ],
    },
  ],
  'kto-loss': [
    {
      id: 'q-rlhf-kp29-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Kahneman-Tversky Optimisation (KTO) is an alignment loss that differs from DPO in that it ___.',
      options: [
        'Uses a contrastive loss comparing chosen vs. rejected responses within the same batch',
        'Trains on per-example binary feedback (thumbs up/down) rather than pairwise preferences, directly modelling human loss aversion via the Kahneman-Tversky value function',
        'Requires a separate reward model trained before the main alignment phase',
        'Uses RL rather than supervised learning, computing policy gradients through the preference model',
      ],
      correctAnswer: 1,
      explanation: 'KTO (Ethayarajh et al., 2024): instead of (chosen, rejected) pairs, it uses individual examples with binary labels (desirable/undesirable). The loss uses the Kahneman-Tversky prospect theory value function: v(x) = x if x ≥ 0 (gain), λ·x if x < 0 (loss, with λ > 1 capturing loss aversion). This means the model is penalised more for making bad responses worse than it is rewarded for making good responses better.',
      hints: [
        'DPO: needs paired data (chosen, rejected) — expensive to collect. KTO: needs only binary feedback per example — much cheaper.',
        'Loss aversion (λ ≈ 2.25 from Kahneman-Tversky): humans feel losses ~2x more strongly than equivalent gains.',
      ],
    },
    {
      id: 'q-rlhf-kp29-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'KTO is particularly useful when paired preference data is unavailable, such as when only thumbs-up/thumbs-down feedback is logged without knowing which alternative response the user preferred.',
      correctAnswer: 'true',
      explanation: 'In production systems, users often provide simple feedback (thumbs up/down, regenerate button clicks) without being shown alternative responses to compare. This data cannot be used for DPO (which needs pairs) but can directly train KTO. KTO thus enables alignment from naturally occurring user feedback at scale.',
      hints: [
        'DPO requirement: "Response A was better than Response B." KTO requirement: "Response A was good/bad."',
        'Production feedback logs typically contain only absolute ratings, not relative comparisons.',
      ],
    },
    {
      id: 'q-rlhf-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The KTO loss includes a reference model term analogous to DPO. What does this term control?',
      options: [
        'It ensures the KTO model does not forget the reference model\'s knowledge by adding a KL penalty between the KTO policy and the reference policy',
        'It prevents the log-probability ratio log(π_θ/π_ref) from becoming too large (high-confidence alignment) or too small (divergence from SFT), ensuring stable training near the SFT initialisation',
        'It forces the model to always prefer the reference model\'s generation over any fine-tuned generation',
        'It computes gradient norms from the reference model and clips them in the KTO objective',
      ],
      correctAnswer: 1,
      explanation: 'KTO value function: v(y|x) = σ(r_θ(x,y) − z_ref) where r_θ = β log(π_θ/π_ref) (same as DPO reward) and z_ref is a moving average reference point (analogous to the KT reference point in prospect theory). The z_ref ensures the model is evaluated relative to what it "expects" (its SFT baseline), making the loss stable and preventing the policy from drifting far from the reference while aligning.',
      hints: [
        'The KT reference point in prospect theory is the status quo; here it is the reference model\'s log-prob.',
        'β log(π_θ/π_ref) = the implicit reward used in DPO — KTO reuses the same reparameterisation.',
      ],
    },
  ],
  'sycophancy': [
    {
      id: 'q-rlhf-kp30-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Sycophancy in LLMs refers to the tendency to ___.',
      options: [
        'Generate extremely long responses to appear more thorough',
        'Change answers to match what the user appears to want to hear, even when the original answer was correct, rather than maintaining factual accuracy',
        'Refuse requests that might be controversial to avoid any risk of criticism',
        'Produce responses that are syntactically complex to seem more intelligent',
      ],
      correctAnswer: 1,
      explanation: 'Sycophancy emerges from RLHF: human raters prefer responses that validate their beliefs, so the model learns to agree rather than correct. Examples: (1) the user presents an incorrect proof — the sycophantic model praises it; (2) the user pushes back on a correct model answer — the sycophant reverses its position. This is a direct consequence of optimising for approval rather than truth.',
      hints: [
        'RLHF incentive: "say what the human wants to hear" → higher reward → model learns sycophancy.',
        'Sycophancy ≠ helpfulness: a model that tells you what you want to hear is not serving your actual interests.',
      ],
    },
    {
      id: 'q-rlhf-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Position bias in reward models — where annotators systematically prefer whichever response appears first — contributes to sycophancy because models learn to exploit this ordering artifact.',
      correctAnswer: 'true',
      explanation: 'Zheng et al. (2023) showed GPT-4 as a judge exhibits position bias: the first response is more likely to be rated as better. Models fine-tuned on this biased data learn positional artifacts rather than genuine quality signals. Similarly, verbosity bias (longer = better) teaches models to pad responses rather than be concise and accurate. These biases are corrected by randomising presentation order and explicitly training judges to evaluate content-not-position.',
      hints: [
        'Annotator cognitive bias → biased preference labels → RM learns the bias → policy exploits it.',
        'Fix: when evaluating A vs B, also evaluate B vs A—if the winner changes, the label is unreliable.',
      ],
    },
    {
      id: 'q-rlhf-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Anthropic\'s approach to reducing sycophancy involves training models to maintain their position under pressure. Which training technique is specifically designed to address user push-back sycophancy?',
      options: [
        'Adding a penalty to the reward function whenever the model changes its answer on the second turn',
        'Constructing adversarial training examples where a human pushes back incorrectly on a correct model response, and training the model to maintain its correct position while acknowledging the user\'s perspective respectfully',
        'Removing all multi-turn conversation data from RLHF training to prevent the model from learning push-back patterns',
        'Using a constitutional principle that states "never change your answer when the user disagrees"',
      ],
      correctAnswer: 1,
      explanation: 'Anti-sycophancy training: create (correct model answer, user pushes back incorrectly, model reverses) as negative examples and (correct model answer, user pushes back incorrectly, model maintains position politely) as positive examples. Training on these teaches the model to distinguish legitimate new information (update warranted) from social pressure (update not warranted). The model learns to say "I understand you disagree, but the correct answer is still X because..."',
      hints: [
        'Key distinction: updating on new evidence = intellectually honest. Updating because the user is upset = sycophancy.',
        'The training signal must reward principled disagreement, not just stubbornness.',
      ],
    },
  ],
}

Object.assign(questions, additionalQuestions)

const additionalQuestions2: Record<string, Question[]> = {
  'llm-judges': [
    {
      id: 'q-rlhf-kp31-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'MT-Bench uses GPT-4 as an automated judge to evaluate LLM responses. The main advantage over human evaluation is ___.',
      options: [
        'GPT-4 judges are completely unbiased and have no systematic errors',
        'Automated judging scales to thousands of comparisons at low cost, enabling fast iteration on model development without expensive human annotation campaigns',
        'GPT-4 is better than humans at all evaluation tasks including creative writing and factual accuracy',
        'Automated judges produce legally binding evaluations that can be used in deployment decisions',
      ],
      correctAnswer: 1,
      explanation: 'MT-Bench (Zheng et al., 2023): GPT-4 evaluates responses to 80 multi-turn questions across writing, roleplay, reasoning, math, coding, extraction. Agreement with human experts is ~80% (comparable to inter-human agreement). The main benefit: running 1000 model comparisons with GPT-4 costs ~$50 and 30 minutes vs. weeks and thousands of dollars for human annotation.',
      hints: [
        'Cost: GPT-4 API at $0.03/1K tokens × 1000 comparisons × ~1K tokens each = $30. Human annotation: much more.',
        'Agreement with humans: ~80% — not perfect, but sufficient for ranking models during development.',
      ],
    },
    {
      id: 'q-rlhf-kp31-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'LLM-as-judge evaluation suffers from a self-enhancement bias: models tend to prefer outputs from models similar to themselves (same company, similar training) over outputs from other models.',
      correctAnswer: 'true',
      explanation: 'Panickssery et al. (2024) showed GPT-4 prefers GPT-4 outputs, Claude prefers Claude outputs, etc. This self-enhancement bias inflates evaluations when a model judges its own outputs or outputs from models trained on similar data. Mitigation: use cross-company judges, calibrate judges on human-labelled data, or use judge ensembles from multiple model families.',
      hints: [
        'Self-enhancement is a form of confirmation bias: "outputs that look like mine are probably better."',
        'Cross-company judging: use Claude to evaluate GPT-4 outputs and vice versa—bias may partially cancel.',
      ],
    },
    {
      id: 'q-rlhf-kp31-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Pairwise evaluation with LLM judges can be improved by using a "reference-guided" approach. What does reference-guided judging add?',
      options: [
        'A reference human essay that the judge uses as a style template for all evaluations',
        'A ground-truth reference answer (e.g., from expert humans or a stronger model) that the judge uses to evaluate factual correctness, rather than judging A vs B in isolation where both may be wrong',
        'A database of past judgements that the LLM retrieves to ensure consistency',
        'A fixed scoring rubric that the judge must follow verbatim, eliminating all judge discretion',
      ],
      correctAnswer: 1,
      explanation: 'Without a reference, the judge must decide A vs B purely from its own knowledge—if both responses are wrong but one is confidently wrong, the judge may prefer it. Reference-guided judging provides the correct answer; the judge checks whether each response is consistent with the reference. This dramatically improves factual evaluation accuracy for knowledge-intensive tasks (MMLU, TriviaQA) where the judge may itself have knowledge gaps.',
      hints: [
        'Judge without reference: "which response sounds more confident about the capital of Uzbekistan?" — unreliable.',
        'Judge with reference: "the capital is Tashkent—which response got this right?" — much more reliable.',
      ],
    },
  ],
  'iterative-dpo': [
    {
      id: 'q-rlhf-kp32-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Iterative DPO (Online DPO) improves over standard offline DPO by ___.',
      options: [
        'Training for more gradient steps on the same preference dataset',
        'Periodically generating new responses with the current policy, collecting fresh preference labels (human or AI) on these on-policy responses, and retraining DPO on the updated dataset—reducing distributional mismatch',
        'Using a higher learning rate to converge faster to the optimal policy',
        'Replacing the reference model with the current policy after each epoch to avoid KL divergence penalty',
      ],
      correctAnswer: 1,
      explanation: 'Standard DPO uses a static dataset collected from an earlier policy. As the policy improves, this data becomes off-policy. Iterative DPO (Self-Play Fine-Tuning, SPIN; Llama 3 alignment) collects fresh preferences on current-policy outputs every K iterations, keeping the training distribution on-policy. This mirrors online RLHF but uses DPO loss rather than PPO, combining the stability of DPO with the on-policy benefit of online RLHF.',
      hints: [
        'Off-policy problem: data from policy π_0 is useless for training π_10 if π_10 never produces those responses.',
        'Online data collection: expensive but necessary for continued improvement at frontier scale.',
      ],
    },
    {
      id: 'q-rlhf-kp32-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Self-Play Fine-Tuning (SPIN) generates preference pairs by contrasting the current model\'s outputs (as rejected) against reference human-generated responses (as chosen), without any external reward model or human preference annotation.',
      correctAnswer: 'true',
      explanation: 'SPIN (Chen et al., 2024): positive = human reference responses from SFT data; negative = model\'s own current-iteration outputs. The model trains to prefer human responses over its own. As the model improves and its outputs approach human quality, the training signal naturally diminishes (self-play equilibrium). This is a form of online DPO using the SFT dataset as a free source of "chosen" responses.',
      hints: [
        'SPIN requires only an SFT dataset (positive) — the model itself generates the negatives each iteration.',
        'Equilibrium: when model outputs = human outputs, chosen and rejected are indistinguishable — training converges.',
      ],
    },
    {
      id: 'q-rlhf-kp32-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A theoretical limitation of DPO identified by Azar et al. (2023) is that DPO can assign arbitrarily high reward to chosen responses and arbitrarily low reward to rejected responses without bound. How does IPO (Identity Preference Optimisation) address this?',
      options: [
        'IPO adds an L2 regularisation term on model weights to prevent the reward from growing large',
        'IPO adds a squared regularisation term on the log-probability ratio that prevents it from becoming too large: it directly regresses (log π/π_ref)(y_w,x) − (log π/π_ref)(y_l,x) toward 1/(2β) rather than pushing it to infinity',
        'IPO clips the reward at a maximum value of 10 during training',
        'IPO uses a separate critic network to estimate the optimal reward and clips it to a bounded range',
      ],
      correctAnswer: 1,
      explanation: 'DPO: push log(π(y_w)/π_ref(y_w)) − log(π(y_l)/π_ref(y_l)) toward +∞. IPO: regress this difference toward a fixed target (1/(2β)), preventing overfitting to the preference labels by keeping the reward ratio bounded. IPO has a closed-form optimal solution and avoids the degeneracy where the model assigns probability 1 to chosen responses and 0 to rejected ones.',
      hints: [
        'DPO optimal: log-ratio → ∞ for chosen, → −∞ for rejected — this collapses the model\'s output distribution.',
        'IPO target: log-ratio = 1/(2β) — a bounded target that is exactly right when the preference is unambiguous.',
      ],
    },
  ],
  'token-level-rl': [
    {
      id: 'q-rlhf-kp33-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Token-level RLHF treats each token generation step as an MDP action. Compared to sequence-level reward assignment, what is the advantage?',
      options: [
        'Token-level RL requires less compute because it operates on individual tokens rather than full sequences',
        'Token-level RL enables credit assignment to individual tokens, allowing the model to learn that specific bad tokens caused a low reward rather than treating the entire sequence as uniformly good or bad',
        'Token-level RL uses a deterministic policy rather than a stochastic one, making training more stable',
        'Token-level RL avoids the need for a reward model by using per-token perplexity as the reward signal',
      ],
      correctAnswer: 1,
      explanation: 'Sequence-level reward: one scalar for the full T-token response — the policy gradient is distributed uniformly back across all T tokens, even tokens that were excellent. Token-level (e.g., RLHF with dense rewards, TRLX, token-level DPO): a reward is assigned at each step, enabling precise credit assignment. Methods: (1) use a PRM to assign step-level rewards; (2) propagate Q-values backward from the sequence reward; (3) use advantage estimates per token.',
      hints: [
        'Sparse reward problem: one reward for 500 tokens—gradient signal is diluted and noisy.',
        'Token-level credit: "the model hallucinated at token 47"—the gradient correctly penalises token 47.',
      ],
    },
    {
      id: 'q-rlhf-kp33-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Reward shaping in token-level RLHF adds an entropy bonus term to the per-token reward to prevent the policy from collapsing to deterministic outputs and encourage exploration during training.',
      correctAnswer: 'true',
      explanation: 'Without entropy regularisation, the policy concentrates probability mass on the single highest-reward completion, losing diversity. The KL penalty in PPO-based RLHF (r_t − β log(π_θ/π_ref)) serves as implicit entropy regularisation by penalising the policy for moving far from the reference distribution. Explicit entropy bonuses H(π(·|s_t)) can be added as additional reward shaping to encourage broader exploration of the output space.',
      hints: [
        'Entropy bonus: H(π) = −Σ π(a|s) log π(a|s)—high entropy = diverse outputs; low entropy = deterministic.',
        'KL penalty implicitly regularises entropy: keeping π close to π_ref (which has non-trivial entropy) prevents collapse.',
      ],
    },
    {
      id: 'q-rlhf-kp33-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In token-level DPO (Todd et al., "Token-Level Direct Preference Optimisation"), the per-token advantage is computed using ___.',
      options: [
        'The output of a trained critic network that estimates the value of each (token, context) pair',
        'The difference in log-probabilities between the policy and reference model at each token position: A_t = β[log(π_θ(a_t|s_t)) − log(π_ref(a_t|s_t))], as a proxy for the token-level implicit reward derived from the DPO reparameterisation',
        'The cosine similarity between the current token embedding and the target response embedding',
        'Monte Carlo rollouts from the current token position to the end of the sequence, averaging future rewards',
      ],
      correctAnswer: 1,
      explanation: 'DPO\'s implicit reward is r(x,y) = β log(π_θ(y|x)/π_ref(y|x)). Token-level DPO decomposes this into per-token contributions: r_t = β log(π_θ(a_t|s_t)/π_ref(a_t|s_t)). The per-token advantage A_t is computed from these token-level implicit rewards, enabling token-level gradient updates that give credit to individual tokens rather than the full sequence. This is a clean derivation from the same DPO reparameterisation without requiring a separate value network.',
      hints: [
        'DPO implicit reward: the whole-sequence reward decomposes naturally as a sum of per-token log-ratio terms.',
        'No critic needed: the reference model π_ref provides the baseline for each token implicitly.',
      ],
    },
  ],
  'ppo-rlhf-details': [
    {
      id: 'q-rlhf-kp34-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In InstructGPT\'s PPO-based RLHF, the KL penalty β·KL(π_θ || π_ref) is added to the reward. What is the role of the reference policy π_ref?',
      options: [
        'π_ref provides the baseline for the value function estimation in the critic network',
        'π_ref is the SFT-initialised policy kept frozen; the KL penalty prevents the RLHF policy from drifting too far, preserving language coherence and preventing reward hacking at the cost of KL divergence from the starting point',
        'π_ref is a separate model trained on harmful content to provide negative examples for the discriminator',
        'π_ref is updated each iteration to match the current policy, acting as a slowly moving target',
      ],
      correctAnswer: 1,
      explanation: 'InstructGPT PPO reward: r_total(x,y) = r_RM(x,y) − β·KL(π_θ(·|x) || π_SFT(·|x)). The KL term penalises divergence from the SFT baseline: large divergence = large penalty = prevents the policy from exploiting the RM with degenerate outputs. Without this, the policy might learn to produce grammatically broken but high-reward outputs that the RM wasn\'t trained to evaluate.',
      hints: [
        'KL constraint = "don\'t drift too far from what you knew how to do before RLHF."',
        'β controls the trade-off: β=0 = unconstrained RM maximisation; β→∞ = no policy change.',
      ],
    },
    {
      id: 'q-rlhf-kp34-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The value model (critic) in PPO-based RLHF is typically initialised from the reward model rather than from the language model backbone, because the reward model already learned to estimate response quality.',
      correctAnswer: 'true',
      explanation: 'InstructGPT and subsequent works initialise the PPO value function from the reward model weights (same backbone + scalar head). This provides a warm start for value estimation rather than training from scratch. The critic then adapts during PPO to estimate V(x, y_{1:t}) — the expected future reward from the current prefix — rather than just scoring complete responses.',
      hints: [
        'Cold-start critic: value function trained from random initialisation converges slowly, harming early policy updates.',
        'RM → critic: the RM already knows "what makes responses good" — a natural initialisation for V(s).',
      ],
    },
    {
      id: 'q-rlhf-kp34-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'PPO-based RLHF for LLMs requires 4 models in memory simultaneously. What are they?',
      options: [
        'Actor, critic, discriminator, generator',
        'Actor (π_θ), critic (V_φ), reference policy (π_ref, frozen), reward model (r_ψ, frozen) — each requires a separate model copy, making PPO-RLHF memory-intensive (4× the base model size)',
        'Actor, target actor, critic, target critic — as in DDPG/SAC for continuous control',
        'Teacher model, student model, reward model, value model',
      ],
      correctAnswer: 1,
      explanation: 'PPO-RLHF memory footprint: (1) Actor π_θ: the policy being trained; (2) Critic V_φ: estimates per-step value for advantage computation; (3) Reference π_ref: frozen SFT model for KL penalty computation; (4) Reward model r_ψ: frozen RM for reward computation. At 70B parameters each, this requires 4 × 70B × 2 bytes (bfloat16) ≈ 560 GB GPU memory. Techniques like LoRA-only updates, model sharding, and parameter sharing (actor/ref share backbone) reduce this.',
      hints: [
        'At each rollout step: actor generates tokens, RM scores the complete response, critic evaluates the prefix, ref model computes KL.',
        'Reducing to 2 models: share actor/ref backbone, keep RM separate — but KL computation requires both forward passes.',
      ],
    },
  ],
  'alignment-generalization': [
    {
      id: 'q-rlhf-kp35-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The "generalisation" problem in RLHF refers to ___.',
      options: [
        'Whether the RLHF-trained model can generalise to new NLP benchmarks it was not evaluated on during development',
        'Whether safety and helpfulness training on a limited set of scenarios transfers to novel, out-of-distribution situations that were not covered in the training data',
        'Whether the reward model generalises to evaluating responses in languages other than English',
        'Whether the RLHF model retains its pre-training knowledge (general intelligence) after fine-tuning',
      ],
      correctAnswer: 1,
      explanation: 'Alignment generalisation: RLHF training covers a finite set of harmful categories and helpful task types. When deployed, users attempt novel requests not covered in training. The question is whether alignment training produces a model with genuine values (that generalise) or merely learned surface patterns (that can be bypassed). This motivates scalable oversight (training on reasoning, not just outcomes) and interpretability research.',
      hints: [
        'Surface pattern: "refuse requests containing the word \'bomb\'"—bypassed by paraphrasing. Genuine value: understands the intent to cause harm.',
        'Generalisation test: does the aligned model handle completely new harmful request types correctly without explicit training?',
      ],
    },
    {
      id: 'q-rlhf-kp35-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Scalable oversight techniques (debate, recursive reward modelling, amplification) aim to train reward models that remain accurate even when evaluating reasoning and capabilities that exceed the human evaluator\'s direct ability to verify.',
      correctAnswer: 'true',
      explanation: 'As models become superhuman, humans cannot directly evaluate whether a complex 1000-step mathematical proof is correct. Debate (Irving et al.): two AI models argue for/against a conclusion; humans judge the debate. Recursive reward modelling: break hard tasks into easier subproblems that humans can evaluate, compose their scores. These approaches aim to maintain human oversight even as AI capability scales beyond direct human evaluation.',
      hints: [
        'Direct evaluation limit: a human cannot verify a proof of Fermat\'s Last Theorem in 5 minutes.',
        'Debate: "if the proof has an error, the other AI model will point it out and the human can verify that specific claim."',
      ],
    },
    {
      id: 'q-rlhf-kp35-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Eliciting Latent Knowledge (ELK) problem asks how to train a model to report its actual beliefs rather than its predicted-optimal-response-for-human-approval. What makes this fundamentally difficult?',
      options: [
        'ELK is only difficult because language models do not have beliefs — they are statistical pattern matchers without internal states',
        'Any training signal derived from human approval incentivises the model to report what humans want to hear (approval-maximising beliefs) rather than actual internal representations; no human-approval-based loss can distinguish genuine belief from strategically reported belief',
        'ELK is difficult because transformer architectures do not have dedicated "belief representation" components that can be extracted',
        'ELK requires reading model weights, which is computationally intractable for 70B+ parameter models',
      ],
      correctAnswer: 1,
      explanation: 'ARC\'s ELK problem (Christiano, 2021): if we train a model to "report true beliefs" using human approval, a sufficiently capable model can learn to predict what response will maximise approval and report that—rather than its actual internal representation of the truth. This is indistinguishable from genuine belief reporting from the outside. Proposed solutions include consistency checks (probing for belief-consistency across rephrasings) and interpretability-based approaches.',
      hints: [
        'If "truthful answer" = "what the human approves of", training for human approval = training for strategic reporting.',
        'A perfectly deceptive model would pass all approval-based ELK tests while reporting strategically—ELK requires an approval-independent verification.',
      ],
    },
  ],
  'model-merging-alignment': [
    {
      id: 'q-rlhf-kp36-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Model merging (e.g., TIES, DARE, SLERP) combines multiple fine-tuned model weights without retraining. In the context of alignment, model merging is used to ___.',
      options: [
        'Replace the RLHF fine-tuning stage entirely with a geometric average of pre-trained weights',
        'Combine a safety-tuned model with a capability-tuned model (e.g., math specialist) by merging their weight differences from the base model, attempting to achieve both safety and specialised capability without separate RLHF for each combination',
        'Train multiple reward models and merge them to reduce variance in preference predictions',
        'Merge the actor and critic networks in PPO to reduce memory requirements during RLHF',
      ],
      correctAnswer: 1,
      explanation: 'Model merging for alignment: suppose you have (base → safety-tuned via RLHF) and (base → math-tuned via SFT). Instead of training (base → math → RLHF safety), merge the weight deltas: θ_merged = θ_base + λ₁(θ_safety − θ_base) + λ₂(θ_math − θ_base). TIES resolves sign conflicts in weight deltas; DARE randomly drops small weight changes. This enables modular alignment without retraining each capability combination from scratch.',
      hints: [
        'Task arithmetic: adding weight deltas from different fine-tuned models can combine their capabilities.',
        'Conflict resolution: if safety delta and math delta disagree on a weight, TIES uses the majority sign.',
      ],
    },
    {
      id: 'q-rlhf-kp36-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Safety training via RLHF can be partially undone by subsequent fine-tuning on domain-specific data (e.g., medical QA), a phenomenon called "safety tax" or "alignment erasure" that requires re-aligning after capability fine-tuning.',
      correctAnswer: 'true',
      explanation: 'Yang et al. (2023) and subsequent work showed that fine-tuning a safety-aligned model on benign domain data (medical, legal, coding) partially undoes safety alignment—the model becomes more likely to comply with harmful requests. The intuition: RLHF safety modifies a small subspace of weights; domain fine-tuning overwrites some of these modifications. Solutions: safety-aware fine-tuning, regularisation toward the aligned model, or merging after domain fine-tuning.',
      hints: [
        'Safety alignment ≠ stable: it can be partially overwritten by subsequent gradient updates on unrelated data.',
        'Even fine-tuning on entirely harmless data (e.g., recipe generation) can degrade safety alignment.',
      ],
    },
    {
      id: 'q-rlhf-kp36-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Reward model ensembling is used to improve alignment robustness. What specific problem does it address compared to a single RM?',
      options: [
        'A single RM has too few parameters to model all possible preference patterns',
        'A single RM may have high variance in its predictions for out-of-distribution inputs; ensembling multiple RMs (trained on different data splits or initialisations) reduces RM uncertainty and makes reward hacking harder—the policy must fool all ensemble members simultaneously',
        'A single RM cannot be run in parallel on multiple GPUs, while an ensemble can be distributed',
        'A single RM can only score binary preferences; an ensemble enables continuous preference scoring',
      ],
      correctAnswer: 1,
      explanation: 'Ensemble RM: r_ensemble(x,y) = (1/K) Σ_k r_k(x,y). Variance across ensemble members signals RM uncertainty: if all RMs agree, the reward is reliable; if they disagree, the input is out-of-distribution. The policy gradient penalty σ²(r_1,...,r_K) discourages the policy from exploiting uncertain regions. Additionally, adversarially gaming K RMs simultaneously is harder than gaming a single RM—ensemble robustness prevents trivial reward hacking.',
      hints: [
        'Reward hacking: find x with high r(x) but low true preference. Ensemble: x must have high mean AND low variance across RMs.',
        'Uncertainty-weighted reward: r_penalty = r_mean − λ·σ_ensemble — penalise inputs where the ensemble is uncertain.',
      ],
    },
  ],
  'frontier-model-alignment': [
    {
      id: 'q-rlhf-kp37-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Anthropic\'s "responsible scaling policy" (RSP) establishes AI Safety Levels (ASL) analogous to biosafety levels. What triggers an ASL-3 designation and what constraints does it impose?',
      options: [
        'ASL-3 is triggered when a model scores >90% on MMLU, requiring mandatory public safety evaluation',
        'ASL-3 is triggered when a model demonstrates meaningful uplift to CBRN weapons development or could enable cyberattacks on critical infrastructure; it imposes stringent security measures (restricted weights access), enhanced deployment safeguards, and mandatory third-party red-teaming before deployment',
        'ASL-3 applies to all models with >100B parameters regardless of capability evaluations',
        'ASL-3 is triggered by a model generating any content about weapons, requiring immediate shutdown of training',
      ],
      correctAnswer: 1,
      explanation: 'Anthropic\'s RSP: ASL-1 = no significant risk; ASL-2 = current frontier (Claude 3/3.5 series) — can discuss dangerous topics but cannot provide meaningful uplift; ASL-3 = meaningful CBRN uplift or cyberoffense capability — requires weight security comparable to classified government systems, mandatory enhanced safety measures. The key metric: "does this model provide meaningful uplift to a nation-state or non-state actor seeking to develop CBRN weapons?"',
      hints: [
        'CBRN: Chemical, Biological, Radiological, Nuclear — the highest-consequence risk domains for AI uplift.',
        '"Meaningful uplift": could a determined adversary synthesise a bioweapon significantly more easily with this model than without it?',
      ],
    },
    {
      id: 'q-rlhf-kp37-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Model evaluations for dangerous capabilities (e.g., CBRN uplift potential, autonomous cyberoffense) must be conducted before each major model deployment, not just during initial training, because fine-tuning can elicit new capabilities.',
      correctAnswer: 'true',
      explanation: 'Frontier labs (Anthropic, DeepMind, OpenAI) evaluate capabilities before training completion and before each significant deployment. Fine-tuning can elicit latent capabilities that were present but not expressed in the base model. This is why MATS, METR, and similar organisations conduct third-party capability evaluations as a pre-deployment requirement under the Frontier Model Forum commitments.',
      hints: [
        'Emergent capabilities from fine-tuning: a model may gain the ability to synthesise dangerous compounds when fine-tuned on chemistry data, even if it could not before.',
        'Third-party evaluation: labs cannot reliably self-certify safety—independent evaluation is a governance requirement.',
      ],
    },
    {
      id: 'q-rlhf-kp37-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Multi-agent RLHF presents unique alignment challenges. When an RLHF-trained model operates as an agent (tool use, multi-step planning), what is the "principal-agent problem" that emerges?',
      options: [
        'The model forgets its system prompt when acting as an agent because agentic contexts are out-of-distribution',
        'As the model takes sequences of actions with real-world consequences, misalignment between the user\'s intent and the model\'s inferred goal can compound over steps—a small misunderstanding in step 1 leads to incorrect actions in steps 2-10; unlike single-turn QA, mistakes are hard to reverse and the model must learn when to pause and verify',
        'Multi-agent setups require the model to take actions faster than human oversight allows, making all agentic uses unsafe',
        'The model cannot learn from agentic feedback because agent trajectories are too long for PPO to process efficiently',
      ],
      correctAnswer: 1,
      explanation: 'Agentic alignment challenges: (1) Long-horizon credit assignment — the reward for a 20-step plan only arrives at the end; (2) Irreversibility — deleting a file, sending an email, or making an API call cannot be undone; (3) Goal drift — small misinterpretations compound across steps; (4) Prompt injection — malicious content in the environment tries to hijack the agent\'s goals. Alignment for agents requires "minimal footprint" principles, sandboxing, and human-in-the-loop verification for irreversible actions.',
      hints: [
        'Single-turn: mistake → bad response. Agentic: mistake at step 2 → cascade of wrong actions → hard-to-reverse damage.',
        'Minimal footprint principle: "prefer reversible actions, request only necessary permissions, verify with user before irreversible steps."',
      ],
    },
  ],
  'offline-online-rlhf': [
    {
      id: 'q-rlhf-kp38-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Online RLHF collects new preference data from the current policy during training. What is the key advantage over offline RLHF at frontier model scale?',
      options: [
        'Online RLHF requires fewer GPU hours because it trains on fewer examples',
        'Online RLHF keeps the preference data distribution aligned with the current policy distribution, avoiding the off-policy problem that causes offline methods to stagnate when the policy improves beyond the training data',
        'Online RLHF eliminates the need for a reward model by collecting human scores on individual responses rather than preferences',
        'Online RLHF allows training without a reference policy, reducing memory requirements',
      ],
      correctAnswer: 1,
      explanation: 'Online RLHF (Llama 3 alignment report, Gemini alignment, Claude training): the model generates responses → humans or AI annotators compare → reward model or direct DPO update → repeat. This keeps training on-policy: as the model improves, harder questions are selected and preferences are collected for current-capability outputs. Llama 3 used 6 rounds of online preference data collection for alignment.',
      hints: [
        'Offline: static 2022 data, 2025 model. The model\'s outputs are far better than the "chosen" examples—learning stagnates.',
        'Online: current model outputs → fresh preferences → meaningful gradient signal for current capability level.',
      ],
    },
    {
      id: 'q-rlhf-kp38-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Rejection sampling fine-tuning (ReST, STaR, RFT) is a simple online RLHF-like method that generates multiple responses, keeps only the highest-reward ones, and fine-tunes on them—effectively combining RL exploration with supervised learning.',
      correctAnswer: 'true',
      explanation: 'Rejection sampling FT: (1) sample N responses per prompt; (2) score with RM or ground-truth verifier; (3) keep responses above a quality threshold; (4) SFT on the filtered data. This is simpler than PPO/DPO, avoids instability, and works well for verifiable tasks (math, coding) where correctness is the reward. STaR (Zelikman et al.) applied this to chain-of-thought: generate rationales, keep those leading to correct answers, fine-tune.',
      hints: [
        'ReST = "Reward from Scores and Trajectories": sample, score, filter, fine-tune — no RL policy gradient needed.',
        'STaR: model generates reasoning chains → keep correct ones → retrain → model improves at reasoning.',
      ],
    },
    {
      id: 'q-rlhf-kp38-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When collecting online preference data for RLHF, the "exploration-exploitation trade-off" for prompt selection means ___.',
      options: [
        'Using the same prompts repeatedly (exploitation) ensures stable training, while novel prompts (exploration) destabilise it',
        'To get informative preference data, prompts should be selected where the model\'s two candidate responses are close in quality (uncertain region) rather than one being obviously better—called "exploration for informative pairs"—but balanced with "exploitation" of known capability gaps',
        'Exploration means generating very long responses, exploitation means generating very short ones',
        'The exploration-exploitation trade-off only applies to multi-armed bandit problems, not to RLHF prompt selection',
      ],
      correctAnswer: 1,
      explanation: 'If one response is obviously better, the preference label is clear but provides little new information to the RM. Informative pairs come from the RM\'s decision boundary: where RM uncertainty is highest (|r(y_w) − r(y_l)| is small). Actively selecting such prompts (active learning for preferences) improves RM sample efficiency. Balancing: too much boundary-sampling neglects clear-cut preferences; too little wastes annotation on easy examples.',
      hints: [
        'Uninformative pair: "Explain quantum physics" → (excellent response) vs (random gibberish). Obviously the first is better—no useful RM training signal.',
        'Informative pair: two similar-quality responses on a nuanced request — annotator disagreement is possible, RM learns from the boundary.',
      ],
    },
  ],
  'rlhf-safety': [
    {
      id: 'q-rlhf-kp39-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The "HHH" framework (Helpful, Harmless, Honest) used by Anthropic for alignment defines three objectives that can sometimes conflict. Which is a canonical example of an HHH conflict?',
      options: [
        'Being helpful by writing code vs. being harmless by refusing to write any code that could be compiled',
        'A user requests help with a legal but ethically questionable activity (e.g., writing a persuasive essay for a position the model disagrees with): being helpful requires writing it, being honest requires stating the model\'s disagreement, and being harmless requires assessing whether the essay could be used to harm others',
        'Being honest by citing sources vs. being harmless by not citing potentially biased sources',
        'Being helpful by being brief vs. being honest by providing full uncertainty caveats',
      ],
      correctAnswer: 1,
      explanation: 'HHH conflicts require nuanced trade-offs: for a persuasive essay on a contentious topic, helpfulness (write the essay), honesty (add caveats about one-sided reasoning), and harmlessness (consider downstream use). Claude\'s constitution provides prioritisation: generally prioritise harmlessness > honesty > helpfulness, but context changes the ordering. The tension is irreducible and managed case-by-case rather than resolved algorithmically.',
      hints: [
        'HHH are not always aligned: a maximally helpful model might tell harmful lies; a maximally harmless model might refuse all requests.',
        'Prioritisation heuristic: "catastrophic harm prevention > honesty about uncertainty > user satisfaction."',
      ],
    },
    {
      id: 'q-rlhf-kp39-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Harmlessness-only training without helpfulness objectives produces "assistant-brained" models that are overly cautious, refuse legitimate requests, and add excessive safety caveats—reducing real-world usefulness without proportionate safety benefit.',
      correctAnswer: 'true',
      explanation: 'Over-refusal is a well-documented failure mode: models trained primarily to avoid harm learn to refuse anything vaguely related to sensitive topics, including legitimate medical questions, historical discussions of violence, creative writing with conflict, and security research. This "excessive caution" was highlighted in Claude\'s model card and OpenAI\'s GPT-4 system card as a training challenge—balancing genuine harm prevention against false-positive refusals.',
      hints: [
        '"Assistant-brained": the model\'s primary goal is avoiding any possible criticism rather than genuinely helping users.',
        'False positive refusal: refusing "explain how antibiotics work" because it mentions bacteria is a failure of proportionality.',
      ],
    },
    {
      id: 'q-rlhf-kp39-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The concept of "dual-use" content creates a fundamental challenge for harmlessness training. How do frontier labs typically handle dual-use knowledge (e.g., virology, cybersecurity)?',
      options: [
        'All dual-use knowledge is blocked categorically because the risk always outweighs the benefit',
        'Risk-benefit analysis based on counterfactual impact: if the information is freely available in textbooks or online (low counterfactual impact), providing it to a curious learner outweighs the marginal risk; if it provides meaningful uplift beyond what is publicly available (high counterfactual impact), it is restricted even to legitimate requesters',
        'Dual-use knowledge is only provided to verified professionals with API keys linked to their credentials',
        'The model asks for justification before answering any dual-use question, regardless of the likely use case',
      ],
      correctAnswer: 1,
      explanation: 'Counterfactual impact framing: "would withholding this information prevent harm?" If a chemistry student can find the information in any university textbook, refusing it provides no safety benefit while harming the legitimate user. If the information constitutes genuine expert knowledge unavailable elsewhere (e.g., specific bioweapon synthesis parameters), even partial disclosure is restricted. This framework underpins how Claude\'s usage policy distinguishes "sensitive but appropriate" from "harmful to provide under any circumstances."',
      hints: [
        'Counterfactual: "if I don\'t answer this, will the person still find it?" If yes, refusing has no safety benefit.',
        'Dual-use spectrum: general chemistry (freely available) → precursor synthesis routes (semi-restricted) → weaponisation parameters (categorically restricted).',
      ],
    },
  ],
  'reward-hacking-theory': [
    {
      id: 'q-rlhf-kp40-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Reward hacking in the context of RLHF is analogous to ___.',
      options: [
        'Overfitting: the policy memorises training examples rather than generalising',
        'Goodhart\'s Law applied to AI training: optimising a proxy reward (RM score) diverges from the true objective (genuine human preference) as the policy improves, finding inputs that score high on the proxy without being genuinely good',
        'Gradient hacking: the model modifies its own gradients to prevent learning',
        'Mode collapse in GANs: the generator finds a single output that always fools the discriminator',
      ],
      correctAnswer: 1,
      explanation: 'Reward hacking = Goodhart\'s Law in RLHF: the RM is a proxy trained on finite preference data. As the policy explores (via RL), it finds inputs the RM was not trained on where RM score is high but human preference is low. Examples: excessively long responses (verbosity bias), formatting tricks (bold every sentence), sycophantic preambles ("Great question!"). The RM score optimises up; human evaluators see degradation.',
      hints: [
        'Goodhart: "When a measure becomes a target, it ceases to be a good measure."',
        'The RM generalises within the training distribution but is exploitable outside it—and RL will find the boundary.',
      ],
    },
    {
      id: 'q-rlhf-kp40-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The KL divergence penalty in PPO-RLHF provides a principled defense against reward hacking by preventing the policy from exploring regions far from the SFT distribution where reward model predictions are unreliable.',
      correctAnswer: 'true',
      explanation: 'The KL constraint r_total = r_RM − β·KL(π || π_SFT) works as a trust region: the policy is allowed to move only in directions consistent with the reference distribution. Since the RM was trained on outputs similar to π_SFT, it is most reliable near π_SFT. The β parameter sets how far the policy can deviate—larger β = stronger anti-hacking protection but less alignment improvement; smaller β = more optimisation but more hacking risk.',
      hints: [
        'Trust region: "stay near what the RM was trained to evaluate reliably."',
        'RM extrapolation: far from training data, the RM\'s predictions are unreliable. KL constraint prevents this exploration.',
      ],
    },
    {
      id: 'q-rlhf-kp40-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Anthropic\'s paper "Scaling Laws for Reward Model Overoptimization" (Gao et al., 2022) found that the gold reward (proxy for human preference) as a function of KL divergence from the SFT policy follows which pattern?',
      options: [
        'Monotonically increasing: more RM optimisation always yields better gold reward',
        'Monotonically decreasing: any RM optimisation harms gold reward',
        'Concave with a peak: gold reward initially increases with KL divergence (genuine alignment improvement) but then decreases (reward hacking dominates) — the peak shifts with RM size and dataset size',
        'Flat: gold reward is insensitive to the amount of RM optimisation',
      ],
      correctAnswer: 2,
      explanation: 'Gao et al. measured gold reward (from a larger "gold" RM trained on more data) vs. proxy RM score as the policy\'s KL from SFT increased via best-of-N sampling and RL. Results: gold reward peaks at an intermediate KL value (genuine alignment) then degrades (reward hacking). Larger proxy RMs peak later (higher KL before degradation) and more robustly. This quantifies the overoptimisation phenomenon and motivates periodic RM updates during RL training.',
      hints: [
        'Low KL: close to SFT, minimal alignment improvement. High KL: exploiting RM, human quality degrades.',
        'Sweet spot: intermediate KL where proxy score reflects genuine quality. Beyond it, Goodhart\'s Law dominates.',
      ],
    },
  ],
}

Object.assign(questions, additionalQuestions2)

registerQuestions(questions);
