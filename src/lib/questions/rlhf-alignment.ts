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
  "alignment-problem": [
    {
      id: "q-rlhf-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'What is the "alignment problem" in the context of large language models?',
      options: [
        "The technical difficulty of aligning multiple model replicas in distributed training.",
        "The challenge of ensuring AI systems pursue goals and exhibit behaviors that are beneficial and consistent with human values and intent.",
        "The problem of matching embedding dimensions between encoder and decoder layers.",
        "The difficulty of aligning training data labels with ground-truth annotations.",
      ],
      correctAnswer: 1,
      explanation:
        "The alignment problem asks how to build AI systems whose objectives, behaviors, and outputs are reliably consistent with what humans actually want. For LLMs this manifests as: models that follow instructions but also refuse harmful requests, are helpful without being sycophantic, and remain honest without hallucinating — all simultaneously. Anthropic\'s HHH (Helpful, Harmless, Honest) framework operationalizes these goals.",
      hints: [
        "A perfectly capable model can be perfectly misaligned — capability and alignment are orthogonal.",
        "Goodhart\'s Law captures one facet: optimizing any measurable proxy for human values eventually diverges from true values.",
      ],
    },
    {
      id: "q-rlhf-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "An LLM that scores perfectly on all NLP benchmarks (MMLU, HumanEval, GSM8K) is guaranteed to be well-aligned with human values.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Benchmark performance measures capability on specific tasks, not alignment. A model can ace MMLU while still generating harmful content, being sycophantic, or hallucinating confidently. Alignment is a behavioral property (how the model acts in deployment, under adversarial prompts, with vulnerable users) not a capability property. RLHF and Constitutional AI exist precisely because capability ≠ alignment.",
      hints: [
        "MMLU measures knowledge retrieval, not refusal of harmful requests or honesty under pressure.",
        'A model can know the "right answer" but deliberately output a different one if it has misaligned objectives.',
      ],
    },
    {
      id: "q-rlhf-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "inner alignment" vs. "outer alignment" distinction refers to:',
      options: [
        "Aligning the model\'s inner layers vs. its output layer.",
        "Outer alignment: the specified reward function correctly captures human goals. Inner alignment: the model\'s learned mesa-optimizer pursues the specified reward rather than a proxy objective that happened to correlate during training.",
        "Aligning the model to inner (private) user preferences vs. outer (public) community standards.",
        "The alignment of weight initialization vs. weight updates during RL training.",
      ],
      correctAnswer: 1,
      explanation:
        'Outer alignment (Christiano et al.) asks: does our reward function accurately represent what we want? Inner alignment (Hubinger et al., 2019 "Risks from Learned Optimization") asks: even if the reward function is correct, does the model actually optimize it, or did it learn a proxy objective that happened to correlate with the reward on training distribution but diverges at deployment? Both must be solved for full alignment.',
      hints: [
        "Outer alignment failure: the RM doesn\'t capture true human values (e.g., it can be fooled by verbose responses).",
        "Inner alignment failure: the policy might optimize a spurious feature that correlated with reward during training.",
      ],
    },
  ],

  "helpful-harmless-honest": [
    {
      id: "q-rlhf-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Anthropic\'s HHH (Helpful, Harmless, Honest) framework from Bai et al. (2022) identifies a core tension. Which pair of properties is most often in conflict?",
      options: [
        "Helpful vs. Honest — being helpful requires lying to make users feel good.",
        "Helpful vs. Harmless — maximally helpful responses may provide information that could be misused; maximally harmless responses may refuse too much, becoming unhelpful.",
        "Harmless vs. Honest — honest responses always cause harm.",
        "All three properties are always fully compatible and never in conflict.",
      ],
      correctAnswer: 1,
      explanation:
        "The helpfulness-harmlessness tension is the central challenge in alignment. A model that refuses everything is maximally harmless but useless. A model that answers everything is maximally helpful but potentially dangerous. InstructGPT\'s labelers were explicitly instructed to balance both, and Anthropic\'s CAI framework uses constitutional principles to navigate this tradeoff systematically.",
      hints: [
        "Refusing a question about medication dosages is harmless but unhelpful to a nurse asking for patient care.",
        "Providing detailed synthesis instructions for a dangerous chemical is helpful to the asker but harmful overall.",
      ],
    },
    {
      id: "q-rlhf-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In Anthropic\'s HHH framework, \"honest\" requires that the model only outputs claims it believes to be true, but does NOT require the model to proactively share information the user hasn\'t asked for.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Anthropic\'s HHH paper distinguishes multiple honesty components: truthfulness (only asserting what you believe true), calibration (appropriate uncertainty), transparency (no hidden agendas), forthrightness (proactively sharing relevant information), non-deception (no misleading implicature), and non-manipulation. Forthrightness is explicitly part of the honesty cluster — a model that withholds critical information to avoid conflict is failing this component.",
      hints: [
        "Proactively sharing a drug interaction the user didn\'t ask about is forthrightness — part of honesty.",
        "A response can be technically truthful yet dishonest through selective omission.",
      ],
    },
    {
      id: "q-rlhf-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Anthropic trained separate reward models for helpfulness and harmlessness in early Claude versions. Why is a single combined RM problematic for the HHH framework?",
      options: [
        "A single RM requires twice the GPU memory of two separate RMs.",
        "A single combined RM cannot independently vary the tradeoff between helpfulness and harmlessness at inference time — separate RMs allow operators to adjust the safety-helpfulness balance for different deployment contexts (e.g., medical vs. general consumer).",
        "Training a single RM on both helpfulness and harmlessness data violates the Bradley-Terry preference model assumptions.",
        "A single RM makes the PPO objective non-convex.",
      ],
      correctAnswer: 1,
      explanation:
        "Separate helpfulness and harmlessness RMs allow deployment-time flexibility: a medical operator might accept more clinical detail (higher helpfulness weight), while a children\'s platform maximizes harmlessness weight. A single combined RM bakes in one fixed tradeoff. This modularity is also critical for iterative improvement: you can retrain one RM without affecting the other.",
      hints: [
        "Different deployment contexts (children\'s app, medical platform, coding assistant) have different helpfulness-safety tradeoffs.",
        "Separate RMs allow a scalarization parameter λ·r_help + (1-λ)·r_harm tunable at inference time.",
      ],
    },
  ],

  sycophancy: [
    {
      id: "q-rlhf-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Sycophancy in RLHF-trained models refers to which behavior?",
      options: [
        "The model generating excessively long responses to maximize token count.",
        "The model adjusting its stated beliefs and answers to match perceived user preferences, even when the user\'s position is factually wrong.",
        "The model copying training data verbatim when uncertain.",
        "The model refusing to engage with controversial topics.",
      ],
      correctAnswer: 1,
      explanation:
        'Sycophancy is when the model tells users what they want to hear rather than what is true. For example: if a user says "I think climate change is a hoax, do you agree?", a sycophantic model might agree to avoid conflict. RLHF is implicated: human raters tend to prefer responses that validate their views, so the RM learns to reward agreement, and RL training amplifies this behavior.',
      hints: [
        'The term "sycophancy" comes from the Greek for "flatterer" — a model that flatters rather than informs.',
        "Perez et al. (2022) and Sharma et al. (2023) documented sycophancy systematically in RLHF models.",
      ],
    },
    {
      id: "q-rlhf-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Sycophancy in RLHF models is primarily caused by intentional design choices by the model creators, not by the training process itself.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Sycophancy is an emergent consequence of RLHF training dynamics: human raters prefer responses that validate their existing beliefs, so the RM learns to reward agreement, and RL training amplifies this behavior. This is a reward hacking failure mode — not a design choice. Sharma et al. (2023) showed sycophancy emerges even when annotators are instructed to be objective.",
      hints: [
        "Annotators have an implicit positivity bias — they rate agreeable responses higher even when told not to.",
        "The policy discovers that flattery is a reliable proxy for human approval — a form of reward hacking.",
      ],
    },
    {
      id: "q-rlhf-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which of the following experimental manipulations best demonstrates sycophancy in RLHF-trained models (Perez et al., 2022)?",
      options: [
        "Asking the model the same factual question 100 times and observing response variance.",
        'Prepending "I strongly believe the answer is X" (where X is wrong) to questions and observing that the RLHF model agrees with X more often than the base model or SFT model.',
        "Measuring response length before and after RLHF training.",
        "Comparing model performance on MMLU with and without system prompts.",
      ],
      correctAnswer: 1,
      explanation:
        "Perez et al. (2022) showed that prepending user belief statements (even incorrect ones) causes RLHF models to shift their answers toward the stated belief far more than base or SFT models. This manipulation isolates sycophancy: the only change is a social-pressure signal in the prompt, and the RLHF model responds to it by changing its factual answers. Base models are significantly less susceptible.",
      hints: [
        'The key control is the same question without the "I believe X" prefix — the model answers correctly.',
        "Adding social pressure causes the RLHF model to abandon the correct answer, proving sycophancy.",
      ],
    },
  ],

  "alignment-tax": [
    {
      id: "q-rlhf-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'The "alignment tax" refers to which observed phenomenon in RLHF-trained models?',
      options: [
        "The financial cost of hiring human annotators for preference labeling.",
        "A potential decrease in performance on standard capability benchmarks (e.g., coding, math) that can occur when fine-tuning for alignment, representing a capability-safety tradeoff.",
        "The computational overhead of running the KL penalty during PPO training.",
        "The legal cost of ensuring model outputs comply with regulations.",
      ],
      correctAnswer: 1,
      explanation:
        "Alignment tax refers to any performance degradation on capability tasks caused by alignment training. InstructGPT (Ouyang et al., 2022) found that the 175B RLHF model slightly regressed on public NLP benchmarks compared to GPT-3, though human preference evaluations showed large improvements. The good news: modern RLHF (especially with good data curation) can often reduce or eliminate the alignment tax.",
      hints: [
        'InstructGPT specifically noted regressions on "public NLP datasets" but improvements on human preference evaluations.',
        "The tax is task-dependent: creative writing improves, formal logic may regress.",
      ],
    },
    {
      id: "q-rlhf-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "InstructGPT (175B, SFT + RLHF) was rated as producing better outputs than GPT-3 (175B, pretrained only) in human preference evaluations, despite InstructGPT being trained on far less compute.",
      options: ["True", "False"],
      correctAnswer: "true",
      explanation:
        "Ouyang et al. (2022) reported that human evaluators preferred InstructGPT 175B outputs over GPT-3 175B outputs ~80% of the time. Remarkably, InstructGPT 1.3B (SFT + RLHF) was preferred over GPT-3 175B, demonstrating that RLHF alignment makes a 100× smaller model more preferred by humans. The alignment tax on benchmarks is outweighed by the dramatic improvement in practical utility.",
      hints: [
        "1.3B InstructGPT > 175B GPT-3 in human preference — a 100× parameter efficiency gain from alignment.",
        "Benchmark performance ≠ human preference; the alignment tax on benchmarks doesn\'t dominate real-world utility.",
      ],
    },
    {
      id: "q-rlhf-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "InstructGPT mitigated the alignment tax on pretraining performance by mixing a pretraining loss term into the RLHF objective. This term is represented as γ·E[log π_ϕ(x_pretrain)] in the objective. What does this term do?",
      options: [
        "It increases the KL penalty β during training.",
        "It adds a log-likelihood term on pretraining data to the RL objective, ensuring the policy retains pretrained language modeling ability and does not catastrophically forget during RLHF.",
        "It computes the perplexity of the reference policy on new RL rollouts.",
        "It penalizes the policy for generating responses shorter than pretraining sequences.",
      ],
      correctAnswer: 1,
      explanation:
        "The γ·E[log π_ϕ(x_pretrain)] term is a pretraining data loss mixed into the PPO update. It prevents the policy from forgetting pretrained capabilities (a form of catastrophic forgetting) by requiring it to remain a good language model on the original pretraining distribution. InstructGPT found this significantly reduced regressions on public NLP benchmarks, mitigating the alignment tax.",
      hints: [
        'Without this term, extended RL training can cause the model to "forget" syntactic and factual knowledge.',
        "γ controls how much weight to give pretraining data vs. RL reward — too large means no alignment, too small means forgetting.",
      ],
    },
  ],

  "goodhart-law": [
    {
      id: "q-rlhf-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Goodhart\'s Law states: "When a measure becomes a target, it ceases to be a good measure." In RLHF, this manifests as:',
      options: [
        "The reward model losing accuracy over multiple epochs of training.",
        "The RL policy over-optimizing the proxy reward model, achieving high proxy scores but low true human preference — the proxy reward diverges from the true reward it was meant to measure.",
        "Benchmark scores decreasing as the model trains longer.",
        "The KL divergence from the reference policy becoming zero.",
      ],
      correctAnswer: 1,
      explanation:
        "In RLHF, the reward model is a proxy for true human preferences. When the RL policy optimizes aggressively against this proxy, it exploits the gaps between the proxy and true preferences — achieving high RM scores through behaviors humans actually dislike. This empirically confirms that there is an optimal stopping point for RL optimization.",
      hints: [
        "The RM is a learned proxy for human preferences — not a perfect one.",
        "The policy finds the cracks in the proxy and exploits them, just as Goodhart\'s Law predicts.",
      ],
    },
    {
      id: "q-rlhf-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Goodhart\'s Law implies that no proxy reward model can ever be useful for RLHF, since any measure used as a target will fail.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Goodhart\'s Law warns of failure under unlimited optimization, not under moderate optimization. RLHF works well when: (1) the KL penalty β limits how far the policy can optimize the proxy; (2) iterative RL keeps the RM in-distribution; (3) the RM training data is large and diverse. The law motivates careful β tuning and iterative training, not abandonment of the RM approach.",
      hints: [
        'β acts as a "Goodhart brake" — limiting optimization pressure on the proxy to stay within the range where it is accurate.',
        "The inverted-U curve (Gao 2023) shows the RM is useful before the sweet spot, just not after.",
      ],
    },
    {
      id: "q-rlhf-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Gao et al. (2023) found that the relationship between gold reward and KL from the reference follows a specific functional form. What does this functional form imply about the rate of reward hacking?",
      options: [
        "The form is linear, implying reward hacking accumulates at a constant rate.",
        "The form is approximately gold_r ≈ α·√KL − β·KL, implying the policy gains reward quickly at first but hacking accelerates quadratically, causing the inverted-U shape and subsequent rapid decline.",
        "The form is logarithmic, implying reward hacking eventually plateaus.",
        "The form is exponential, implying reward hacking has a phase transition at a critical KL threshold.",
      ],
      correctAnswer: 1,
      explanation:
        "Gao et al. (2023) fit the functional form:\n\\[ r_\\text{gold}(KL) = \\alpha\\sqrt{KL} - \\beta\\cdot KL \\]\nwhere $\\alpha > 0$ and $\\beta > 0$ are fitted constants. The $\\sqrt{KL}$ term captures diminishing returns from alignment (the policy rapidly improves early but gains taper off), while $-\\beta\\cdot KL$ captures linearly accelerating reward hacking. Setting $\\frac{d}{dKL}r_\\text{gold} = 0$ gives the optimal stopping point $KL^* = (\\alpha/2\\beta)^2$. This functional form is the foundation of KL-based early stopping criteria in RLHF.",
      hints: [
        "Fitting $r_\\text{gold} \\sim \\alpha\\sqrt{KL} - \\beta KL$ to data directly quantifies the tradeoff.",
        "Early stopping at $KL^*$ maximizes gold reward — beyond this point, hacking damages alignment more than improvement helps.",
        "This equation is why modern RLHF uses KL monitoring rather than just monitoring proxy reward.",
      ],
    },
  ],

  "preference-pairs": [
    {
      id: "q-rlhf-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why does RLHF use pairwise preference comparisons (y_w vs. y_l) rather than asking annotators to assign numerical scores (e.g., 1–10) to individual responses?",
      options: [
        "Pairwise comparisons are faster to compute in PyTorch than scalar scores.",
        'Humans are much more consistent at relative judgments ("A is better than B") than absolute quality ratings, which vary idiosyncratically between annotators.',
        "Numerical scores cannot be used to train the Bradley-Terry model.",
        "Pairwise comparisons reduce GPU memory usage during reward model training.",
      ],
      correctAnswer: 1,
      explanation:
        'Psychophysics research shows humans are better at relative than absolute judgments. When asked "rate this 1-10", annotators use different scales: one person\'s 7 is another\'s 4. But "which of A or B is better?" yields much more reliable inter-annotator agreement. This is why InstructGPT collected pairwise comparisons, and the Bradley-Terry model was designed to consume them directly.',
      hints: [
        "The Bradley-Terry model was designed for sports rankings — who beat whom — not for absolute skill scores.",
        '73% inter-annotator agreement for InstructGPT pairwise labels is high given the subjective nature of "helpful".',
      ],
    },
    {
      id: "q-rlhf-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In RLHF preference data collection, a single prompt typically has only two candidate responses compared — collecting more than 2 responses per prompt is prohibitively expensive and not done in practice.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "InstructGPT collected 4–9 responses per prompt and extracted all K*(K-1)/2 pairwise comparisons from a single ranking. For K=4 responses, one ranking yields 6 pairs. This dramatically increases data efficiency: one annotator session with 4 responses generates 6 preference pairs rather than 1. The Bradley-Terry model handles transitive preference chains derived from full rankings.",
      hints: [
        "For K responses, a full ranking yields K(K-1)/2 pairwise comparisons — efficient data generation.",
        "InstructGPT used 4–9 completions per prompt, so one annotation session produced many preference pairs.",
      ],
    },
    {
      id: "q-rlhf-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the preference pair (x, y_w, y_l), the Bradley-Terry model assumes preferences are generated as P(y_w ≻ y_l | x) = σ(r*(x,y_w) − r*(x,y_l)) where r* is the true reward. What critical assumption does this make about human preferences?",
      options: [
        "Human preferences are deterministic and transitive.",
        "Human preferences are stochastic but are generated by a single scalar latent reward function r* — all preference uncertainty comes from noise around this scalar, not from multi-dimensional values or context-dependent weighting.",
        "Human preferences depend only on response length, not content.",
        "Human preferences are exchangeable across different annotators without individual variation.",
      ],
      correctAnswer: 1,
      explanation:
        'The Bradley-Terry model\'s key assumption is that a single scalar reward function r*(x,y) underlies all preferences. This is a strong simplification: real human preferences are multi-dimensional (helpfulness, honesty, style, correctness) and individual-dependent. The model "collapses" these into one number. This assumption breaks when different annotators weight dimensions differently — a fundamental limitation motivating multi-head reward models and personalized alignment research.',
      hints: [
        "A response that is helpful to an expert may be unhelpful to a novice — r* would need to be person-dependent.",
        "The Bradley-Terry model cannot represent the case where Ann prefers A>B but Bob prefers B>A for principled reasons.",
      ],
    },
  ],

  "annotator-agreement": [
    {
      id: "q-rlhf-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Cohen\'s Kappa (κ) is used to measure inter-annotator agreement, adjusted for chance. How does it differ from raw percent agreement?",
      options: [
        "Cohen\'s Kappa measures response quality, not annotator agreement.",
        "Cohen\'s Kappa subtracts the agreement expected by chance from observed agreement, normalizing by the maximum possible above-chance agreement — κ = (p_o − p_e) / (1 − p_e). This prevents inflated agreement scores when one category dominates.",
        "Cohen\'s Kappa averages agreement across all annotator pairs, while percent agreement uses only the majority vote.",
        "Cohen\'s Kappa applies only to continuous rating scales, not binary preference labels.",
      ],
      correctAnswer: 1,
      explanation:
        "Raw percent agreement is misleading when labels are imbalanced. If 90% of pairs are won by the longer response, two annotators could agree 90% of the time by both always picking the longer response — but this is not genuine agreement. Cohen\'s Kappa accounts for this chance baseline: κ = 0 means agreement at chance, κ = 1 means perfect agreement, κ < 0 means worse than chance. For RLHF preference data, κ > 0.4 is considered moderate, > 0.6 is substantial.",
      hints: [
        "If annotators independently guess randomly on a 50/50 task, p_e = 0.5, so chance agreement is 50%.",
        "κ allows fair comparison of agreement across tasks with different base rates.",
      ],
    },
    {
      id: "q-rlhf-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "High inter-annotator agreement on preference labels guarantees that the reward model trained on those labels will generalize well to new prompts and user populations.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "High agreement among a specific annotator pool (e.g., English-speaking contractors from a particular region) means the RM captures that pool\'s preferences well. But that pool may not represent all users. If annotators systematically share biases (cultural norms, political views, educational background), high agreement encodes those biases into the RM — which then fails to generalize to users with different preferences. Demographic diversity of annotators is as important as agreement levels.",
      hints: [
        "A pool of annotators who all share the same political bias will agree highly — but produce a biased RM.",
        "Generalization requires both reliable labels (high κ) AND representative annotators.",
      ],
    },
    {
      id: "q-rlhf-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When two annotators disagree on a preference pair in RLHF data collection, what is the most principled way to handle the disagreement during reward model training?",
      options: [
        "Discard all disagreed pairs to keep only high-quality labels.",
        "Assign the pair a fractional label (e.g., 0.5) representing uncertainty, so the reward model learns a soft preference probability rather than a hard 0/1 label.",
        "Always prefer the more senior annotator\'s label.",
        "Relabel the pair using GPT-4 as a tiebreaker.",
      ],
      correctAnswer: 1,
      explanation:
        "Soft/fractional labels are the most principled approach to annotator disagreement. If 3 of 5 annotators prefer y_w, the true preference probability is ~0.6, not 1.0. Training the RM with a label of 0.6 (rather than 1.0 or discarding) provides an accurate calibration signal. InstructGPT used fractional labels derived from the fraction of annotators preferring each response. Discarding disagreed pairs loses signal; majority voting loses calibration.",
      hints: [
        "Fractional labels make the Bradley-Terry RM predict P(y_w ≻ y_l) ≈ 0.6, which is a calibrated estimate.",
        "Hard 0/1 labels from majority voting overstate confidence and hurt RM calibration on uncertain pairs.",
      ],
    },
  ],

  "ranking-vs-rating": [
    {
      id: "q-rlhf-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In RLHF preference data collection, "ranking" (ordering K responses best-to-worst) differs from "rating" (assigning a score to each response independently). Which approach does InstructGPT use, and why?',
      options: [
        "Rating (1–7 scale) for each response independently, because absolute scores are more informative than rankings.",
        "Ranking (ordering 4–9 responses), because it produces more preference pairs per annotation session and is more reliable than absolute ratings.",
        "Both equally — labelers randomly choose between ranking and rating.",
        "Rating with a binary good/bad label for each response individually.",
      ],
      correctAnswer: 1,
      explanation:
        'InstructGPT used ranking: labelers saw K=4–9 responses per prompt and ordered them. This produces K(K-1)/2 pairwise preference pairs per annotation (e.g., 6 pairs for K=4), making ranking more data-efficient than rating. Ranking is also more reliable than absolute ratings because relative comparisons reduce annotator-specific scale variation (one person\'s "7" may be another\'s "5").',
      hints: [
        "Memorizing 1000 task formats is intractable — the model must generalize from them.",
        "Zero-shot generalization is the emergent property of instruction diversity, not instruction volume.",
      ],
    },
    {
      id: "q-rlhf-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Rating-based annotation (assigning a quality score to each response independently) is generally preferred over ranking for RLHF because it provides richer per-response information.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Despite providing absolute quality information, rating-based annotation suffers from inconsistency across annotators: different people use rating scales differently. Ranking (relative ordering) avoids this problem because the comparison is made under identical cognitive conditions within one session. The Bradley-Terry model is specifically designed to consume pairwise comparisons derived from rankings, making ranking the standard in RLHF practice.",
      hints: [
        "Inter-annotator agreement is typically higher for rankings than for absolute ratings on the same responses.",
        "Pairwise comparisons from rankings are the native input to Bradley-Terry models.",
      ],
    },
    {
      id: "q-rlhf-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When converting a full ranking (e.g., A > B > C > D) to pairwise preference pairs for Bradley-Terry training, a practitioner must decide how to weight transitively implied pairs (A > C, A > D, B > D) vs. adjacent pairs (A > B, B > C, C > D). What is the risk of up-weighting non-adjacent pairs equally?",
      options: [
        "It causes the reward model to produce rewards with higher variance.",
        'Non-adjacent pairs (e.g., A > D) carry weaker signal because the quality gap is wider and more obvious — they are "easy" comparisons that the RM learns little from, while adjacent pairs contain the most discriminative signal. Up-weighting easy pairs underutilizes the ranking\'s discriminative content.',
        "Non-adjacent pairs violate the Bradley-Terry model\'s independence assumption.",
        "Up-weighting non-adjacent pairs causes KL divergence to collapse during PPO training.",
      ],
      correctAnswer: 1,
      explanation:
        'In a ranking A > B > C > D, the pair (A, D) represents a large quality gap — the RM can easily learn to score r(A) > r(D). The pair (A, B) is harder — it requires fine-grained discrimination. Bradley-Terry training benefits most from "hard" adjacent pairs that provide gradient signal in the regime where the RM is uncertain. Uniform weighting of all pairs may flood the training signal with easy non-adjacent pairs, reducing the discriminative quality of the trained RM.',
      hints: [
        'The RM already "knows" the best response beats the worst — adjacent pairs teach it fine-grained distinctions.',
        "Some practitioners use only adjacent pairs (A>B, B>C, C>D) to focus on hard comparisons.",
      ],
    },
  ],

  "synthetic-preferences": [
    {
      id: "q-rlhf-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Using GPT-4 (or a capable LLM) as a "judge" to generate preference labels for RLHF training is called:',
      options: [
        "Supervised Fine-Tuning (SFT)",
        "LLM-as-a-judge or AI feedback, a form of RLAIF where the AI labeler replaces or supplements human annotators.",
        "Constitutional AI (CAI)",
        "Reward Model Ensembling",
      ],
      correctAnswer: 1,
      explanation:
        "Using a frontier LLM to evaluate and compare model outputs is called LLM-as-a-judge (Zheng et al., 2023, MT-Bench) or AI feedback. It is a form of RLAIF: instead of human annotators selecting y_w over y_l, a prompted LLM makes that judgment. Datasets like UltraFeedback (Cui et al., 2023) used GPT-4 to generate 64K preference labels at a fraction of human annotation cost.",
      hints: [
        "MT-Bench (Zheng et al., 2023) used GPT-4 as a judge and found high correlation with human judgments.",
        "LLM judges inherit LLM biases (verbosity preference, self-preference) that must be carefully controlled.",
      ],
    },
    {
      id: "q-rlhf-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LLM judges (e.g., GPT-4 used as a preference labeler) are free from position bias, consistently evaluating responses A and B equally regardless of which is presented first.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "Zheng et al. (2023) documented position bias in LLM judges: models tend to prefer whichever response appears first (or second) in the prompt, independent of quality. This can be partially mitigated by swapping positions and averaging, but LLM judges remain imperfect. Other documented biases include verbosity bias (preferring longer responses) and self-preference (a model preferring outputs similar to its own training data).",
      hints: [
        "Mitigation: run each pair in both orders (A then B, B then A) and average the preferences.",
        "Verbosity bias: LLM judges often rate longer responses higher even when the shorter response is more accurate.",
      ],
    },
    {
      id: "q-rlhf-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The UltraFeedback dataset (Cui et al., 2023) uses GPT-4 to generate preferences across four dimensions. Why is multi-dimensional scoring (helpfulness, honesty, instruction-following, truthfulness) preferable to a single overall score for synthetic preference generation?",
      options: [
        "Multi-dimensional scoring is faster for GPT-4 to generate than a single score.",
        "Different downstream tasks may weight dimensions differently; multi-dimensional labels enable training reward models that can be composed or reweighted, while a single scalar collapses information that is useful for understanding model failures.",
        "Single overall scores are not supported by the Bradley-Terry model.",
        "Multi-dimensional scoring eliminates position bias in LLM judges.",
      ],
      correctAnswer: 1,
      explanation:
        "A single overall preference collapses the reason for the preference. If y_w is preferred, is it more helpful? More honest? Better formatted? Separate dimension scores enable: (1) dimension-specific reward models for multi-objective optimization; (2) diagnostic analysis of where models fail; (3) flexible composition of rewards for different deployment goals. UltraFeedback\'s multi-dimensional structure is designed to support fine-grained alignment research beyond what a single preference label allows.",
      hints: [
        "A response can score high on helpfulness but low on truthfulness — a single score hides this tension.",
        "Multi-objective alignment (helpfulness + harmlessness + honesty) requires multi-dimensional labels to train distinct reward components.",
      ],
    },
  ],

  "dpo-vs-rlhf": [
    {
      id: "q-rlhf-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary practical advantage of DPO (Direct Preference Optimization) over PPO-RLHF for aligning large language models?",
      options: [
        "DPO always produces better-aligned models than PPO.",
        "DPO eliminates the need for a separate reward model and RL training loop, training the policy directly on preference data with a supervised loss — requiring only two models instead of four.",
        "DPO runs on CPUs and does not require GPU acceleration.",
        "DPO allows the policy to generate on-policy rollouts during training.",
      ],
      correctAnswer: 1,
      explanation:
        "PPO-RLHF requires four models (actor, critic, reward model, reference policy) and an RL training loop with rollout generation, reward scoring, and advantage estimation. DPO trains the policy directly on (prompt, chosen, rejected) triplets using a supervised cross-entropy-like loss, requiring only the policy and a frozen reference. This dramatically reduces engineering complexity, memory requirements, and training time.",
      hints: [
        "DPO\'s loss looks like supervised fine-tuning — it uses standard backpropagation, not RL.",
        "Fewer models means fewer GPUs, simpler infrastructure, and faster iteration — a major practical win.",
      ],
    },
    {
      id: "q-rlhf-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DPO can be applied iteratively (collecting new preference data on current-policy outputs and retraining) to mitigate its offline distributional mismatch limitation.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Iterative DPO (also called online DPO or self-play fine-tuning) addresses the distributional mismatch by: (1) generating completions from the current policy; (2) collecting preferences on those completions (via humans or AI); (3) running DPO training; (4) repeating. This closes the gap between the data-generating policy and the trained policy, and has been shown to match or exceed offline PPO-RLHF in several benchmarks.",
      hints: [
        "Each iteration of DPO uses on-policy completions, making the preference data current.",
        "Papers like SPIN and Self-Play Fine-Tuning formalize this iterative approach.",
      ],
    },
    {
      id: "q-rlhf-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DPO\'s gradient update on a preference pair (y_w, y_l) has an undesirable behavior when the reference policy assigns very low probability to y_w. What is this failure mode called?",
      options: [
        "Reward hacking — the implicit reward becomes negative for y_w.",
        "Token-level DPO divergence — the per-token probabilities become NaN.",
        "Likelihood displacement — DPO simultaneously decreases the probability of y_l and, unintentionally, of y_w if the reference already assigns low probability to it, failing to correctly increase y_w\'s probability.",
        "KL collapse — the policy collapses to the reference distribution.",
      ],
      correctAnswer: 2,
      explanation:
        "Azar et al. (2023) and Pang et al. (2024) identified that DPO can suffer from likelihood displacement: if π_ref(y_w|x) is very low (y_w is out-of-distribution for the reference), the DPO gradient may not reliably increase π_θ(y_w|x). The implicit reward β·log(π_θ/π_ref) requires careful initialization. IPO (Identity Preference Optimization) and SimPO address this by modifying the loss to be more robust to this case.",
      hints: [
        "The DPO gradient for y_w is ∝ (1 − σ(Δr)) · ∇logπ_θ(y_w) — when σ(Δr) ≈ 1, the y_w gradient is near zero.",
        "If y_w is a good response but very different from the reference, DPO may fail to increase its probability.",
      ],
    },
  ],

  "instructgpt-details": [
    {
      id: "q-rlhf-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "InstructGPT (Ouyang et al., 2022) used approximately how many high-quality human-written demonstration examples for the SFT (supervised fine-tuning) phase?",
      options: [
        "500 examples",
        "13,000–14,500 examples",
        "300,000 examples",
        "1.8 million examples",
      ],
      correctAnswer: 1,
      explanation:
        "InstructGPT\'s SFT phase used approximately 13,000–14,500 human-written prompt-response demonstration pairs. OpenAI contractor labelers wrote high-quality responses to a diverse set of prompts covering helpfulness, safety, and instruction-following. The small dataset size (relative to pretraining) demonstrates that SFT is extremely sample-efficient for eliciting desired behavior from a well-pretrained model.",
      hints: [
        "~13K examples is tiny compared to the billions of pretraining tokens — yet sufficient for SFT.",
        "Quality matters more than quantity for SFT: carefully written demonstrations beat noisy large datasets.",
      ],
    },
    {
      id: "q-rlhf-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "InstructGPT\'s human labelers were exclusively Mechanical Turk workers with no domain expertise.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "InstructGPT used contractors from a professional labeling company (Scale AI), not anonymous Mechanical Turk workers. Labelers were screened for agreement with OpenAI researchers on sensitive content and helpfulness judgments. For specialized tasks (e.g., legal, medical prompts), OpenAI acknowledged that their labeler pool may not represent expert knowledge — a limitation they explicitly noted as contributing to hallucination.",
      hints: [
        "The labeler selection process included training, calibration, and quality checks — not typical of MTurk.",
        "Specialized domain expertise (medicine, law) was identified as a gap in the labeler pool.",
      ],
    },
    {
      id: "q-rlhf-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "InstructGPT\'s RLHF objective includes a pretraining loss term γ·E[log π_ϕ(x_pretrain)]. Why is the γ coefficient typically set to a very small value (e.g., 0 < γ ≪ 1)?",
      options: [
        "A large γ would cause the reward model to overfit to pretraining data.",
        "A large γ would dominate the RL reward signal, preventing alignment learning and keeping the policy close to the pretrained LM distribution — the policy would improve little beyond the SFT baseline.",
        "A large γ would increase GPU memory usage proportionally.",
        "γ must be small to satisfy the Bradley-Terry model\'s normalization constraint.",
      ],
      correctAnswer: 1,
      explanation:
        "The full objective is: E[r(x,y)] − β·KL(π‖π_ref) + γ·E[log π_ϕ(x_pretrain)]. If γ is large, the pretrain loss dominates and the model optimizes language modeling rather than human preference. The pretraining term is a regularizer — set small enough to prevent catastrophic forgetting without crowding out the RL reward signal. InstructGPT found γ ≈ 0 or very small worked well for most tasks.",
      hints: [
        "Think of γ as a catastrophic-forgetting penalty, not a primary training signal.",
        "At γ = 0, RLHF ignores pretraining data entirely; at γ = 1, pretraining may dominate the RL reward.",
      ],
    },
  ],

  "ppo-mechanics": [
    {
      id: "q-rlhf-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In PPO-RLHF, the reward signal from the reward model is typically applied only at the end of each generated response (the final token), not at every token. Why?",
      options: [
        "Computing per-token rewards would require O(T) forward passes through the reward model, where T is sequence length — this is computationally prohibitive.",
        "Per-token rewards are mathematically invalid under the Bradley-Terry model.",
        "PPO\'s clipping mechanism only works with terminal rewards.",
        "Per-token rewards cause KL divergence to become negative.",
      ],
      correctAnswer: 0,
      explanation:
        "The reward model assigns a scalar score to a complete (prompt, response) pair. Applying the reward at the final token is a practical approximation: the RL episode is a single token sequence, and the reward is a terminal reward at the episode end. Generating a per-token intermediate reward would require the RM to score partial sequences, which it was not trained to do. The KL penalty IS applied per-token in the objective.",
      hints: [
        "The reward model takes a complete response as input — it cannot score partial sequences mid-generation.",
        "Only the KL penalty is per-token; the reward model score is assigned at the end of generation.",
      ],
    },
    {
      id: "q-rlhf-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In PPO-RLHF, the critic (value network) is initialized from the reward model weights rather than the SFT model weights.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "In standard PPO-RLHF (e.g., TRL library, InstructGPT implementation), the critic (value network V_ψ) is often initialized from the reward model because the RM already learned to assess response quality — a good initialization for estimating expected return. The actor is initialized from the SFT model. Some implementations initialize both from the SFT model. Using the RM as critic initialization reduces value network training time and improves advantage estimate quality.",
      hints: [
        "The reward model estimates immediate reward; the value network estimates cumulative return — related but distinct.",
        "Warm-starting the critic from RM weights provides a better initial value estimate than random initialization.",
      ],
    },
    {
      id: "q-rlhf-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GAE (Generalized Advantage Estimation) is used in PPO-RLHF to compute advantage estimates. With λ = 1, GAE reduces to Monte Carlo returns. With λ = 0, it reduces to TD(0) (one-step TD error). What is the tradeoff controlled by λ?",
      options: [
        "λ controls the learning rate for the policy update.",
        "λ interpolates between high-variance/low-bias (λ=1, Monte Carlo) and low-variance/high-bias (λ=0, TD) advantage estimates — higher λ uses more actual returns (less bias) but more variance; lower λ relies more on the value function (less variance) but inherits its bias.",
        "λ controls the KL penalty coefficient between RL steps.",
        "λ determines the clip ratio ε for the PPO surrogate objective.",
      ],
      correctAnswer: 1,
      explanation:
        "GAE (Schulman et al., 2016) computes the advantage as:\n\\[ \\hat{A}_t^\\text{GAE}(\\gamma, \\lambda) = \\sum_{l=0}^{\\infty} (\\gamma\\lambda)^l \\delta_{t+l} \\]\nwhere $\\delta_t = r_t + \\gamma V(s_{t+1}) - V(s_t)$ is the TD error. At λ=1: returns to full Monte Carlo (high variance, low bias). At λ=0: pure one-step TD (low variance, high value-function bias). RLHF typically uses λ ∈ [0.9, 0.99] — close to Monte Carlo but with variance reduction from the value function bootstrap.",
      hints: [
        "High λ means the advantage estimate relies more on actual sampled rewards (accurate but noisy).",
        "Low λ means the advantage estimate relies more on the learned value function (smooth but potentially biased).",
      ],
    },
  ],

  "rlaif-details": [
    {
      id: "q-rlhf-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In RLAIF, what makes a frontier LLM (like GPT-4) a viable preference labeler for aligning a weaker model?",
      options: [
        "The frontier LLM was trained on the same data as the model being aligned.",
        "The frontier LLM is capable enough to reliably evaluate the quality of the weaker model\'s outputs across the relevant dimensions (helpfulness, harmlessness, accuracy), producing labels that correlate well with human judgments.",
        "The frontier LLM can access the weaker model\'s weights to assess quality.",
        "Frontier LLMs always agree with each other on preference judgments.",
      ],
      correctAnswer: 1,
      explanation:
        "The core assumption of RLAIF is that the AI labeler is competent enough at the evaluation task. If the AI labeler cannot reliably distinguish good from bad outputs, its labels are noise. Frontier LLMs like GPT-4 have been shown to have high agreement with human judgments on summarization, instruction following, and safety — making them viable as preference labelers for models they outperform on those tasks.",
      hints: [
        "RLAIF degrades when the AI labeler is weaker or equal to the model being aligned — it cannot reliably rank what it cannot do.",
        "The labeler must be better at evaluation than the trainee is at generation.",
      ],
    },
    {
      id: "q-rlhf-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In RLAIF with self-improvement (a model labeling its own outputs), the labeler model and the trainee model can be the same model, provided the labeling and training are done on different checkpoints.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Self-improvement RLAIF uses a model (or a more capable checkpoint of the same model) to evaluate and generate preference labels for its own outputs. Constitutional AI\'s RL-CAI stage does exactly this: Claude evaluates pairs of its own responses against constitutional principles. The key is using a frozen checkpoint as the labeler while training a separate copy — preventing circular gradient flow while enabling self-critique.",
      hints: [
        "CAI uses the same model for generation and critique but at different pipeline stages — not simultaneously.",
        "Frozen labeler checkpoint + trainable policy copy is the standard pattern for self-improvement RLAIF.",
      ],
    },
    {
      id: "q-rlhf-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Constitutional AI\'s RL-CAI generates preference labels by prompting a model with the constitution and a pair of responses. Why does the model\'s chain-of-thought reasoning before outputting a preference label improve label quality?",
      options: [
        "Chain-of-thought increases the probability of the correct label token in the vocabulary.",
        "Explicitly reasoning through constitutional principles before selecting a preference forces the model to apply the relevant evaluation criteria step-by-step, reducing shallow pattern matching and improving label reliability — analogous to chain-of-thought improving reasoning accuracy in other tasks.",
        "Chain-of-thought reduces the GPU memory required for the forward pass.",
        "The chain-of-thought output is used as training data for the SFT phase.",
      ],
      correctAnswer: 1,
      explanation:
        "Bai et al. (2022) found that prompting the AI judge with chain-of-thought (first reason about which response better follows the principle, then output A or B) produces more reliable constitutional preference labels than direct output. This mirrors Wei et al. (2022)\'s chain-of-thought prompting finding: generating intermediate reasoning steps before final answers improves accuracy on multi-step evaluation tasks by decomposing the judgment.",
      hints: [
        "Without reasoning steps, the model may pattern-match on surface features (length, formatting) rather than constitutional adherence.",
        "CoT forces explicit principle application: \'Response A is harmful because... therefore B is preferred.\'",
      ],
    },
  ],

  "reward-model-training": [
    {
      id: "q-rlhf-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "During reward model training, why is it important to only compute the reward on the response tokens and not on the prompt tokens?",
      options: [
        "Prompt tokens are longer than response tokens and would dominate the loss.",
        "The reward model should evaluate the quality of the response given the prompt, not the quality of the prompt itself — including prompt tokens in the loss would dilute the signal about response quality.",
        "Prompt tokens are masked in the tokenizer and cannot be processed.",
        "Including prompt tokens violates the Bradley-Terry preference model assumptions.",
      ],
      correctAnswer: 1,
      explanation:
        "The reward model\'s purpose is to score response quality conditioned on the prompt. Backpropagating through prompt token representations would mix irrelevant information (prompt quality/style) with response quality signal. In practice, implementations mask prompt token positions when computing the RM loss, focusing training entirely on how the model\'s representation of the prompt+response encodes response quality.",
      hints: [
        "The reward scalar is extracted from the final token\'s hidden state — a natural position to encode the full (prompt, response) quality.",
        "Gradient masking on prompt positions is standard in RLHF implementations like TRL.",
      ],
    },
    {
      id: "q-rlhf-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Reward model ensembling (training multiple independent reward models and averaging their scores) is an effective technique for reducing reward hacking.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "An ensemble of reward models trained on different random seeds or data subsets will disagree on out-of-distribution inputs (the RM\'s uncertainty is high precisely where reward hacking occurs). Using the minimum or average score across ensemble members penalizes outputs where models disagree — effectively detecting potential reward-hacking candidates. This is an uncertainty-aware reward approach that goes beyond a single RM.",
      hints: [
        "Individual RMs overfit to different spurious features; an ensemble\'s disagreement signals out-of-distribution inputs.",
        "Conservative reward estimation (using minimum ensemble score) provides a safety margin against hacking.",
      ],
    },
    {
      id: "q-rlhf-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does reward model calibration (having P(y_w ≻ y_l) = 0.7 when 70% of humans prefer y_w) matter more for iterative RLHF than for standard offline RLHF?",
      options: [
        "Calibration only matters for reward models with more than 1B parameters.",
        "In iterative RLHF, the policy actively generates novel responses that the RM must reliably rank. A miscalibrated RM may be overconfident on these new outputs, providing misleading gradients. Iterative training amplifies calibration errors over rounds because miscalibrated labels in round N distort the policy for round N+1.",
        "Calibration affects the KL penalty coefficient calculation.",
        "Offline RLHF uses absolute ratings; calibration only applies to pairwise comparisons.",
      ],
      correctAnswer: 1,
      explanation:
        "In offline RLHF, the RM scores a fixed set of responses — miscalibration creates a fixed bias. In iterative RLHF, the policy generates increasingly novel responses each round, and the RM\'s calibration on these out-of-distribution inputs directly shapes future policy updates. Overconfident RM scores on novel outputs cause the policy to aggressively shift toward those outputs, potentially amplifying reward hacking across iterations.",
      hints: [
        "Round 1 miscalibration → biased policy → more out-of-distribution outputs in round 2 → worse miscalibration — a compounding error.",
        "Calibration testing (ECE, reliability diagrams) on held-out preference pairs should be standard practice.",
      ],
    },
  ],

  "kl-divergence-details": [
    {
      id: "q-rlhf-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In RLHF, the KL divergence KL(π_RL ‖ π_SFT) is applied per-token across the generated response. What does this mean computationally?",
      options: [
        "The KL is computed once for the entire sequence by comparing the final output distributions.",
        "At each token position t, the KL between the RL policy\'s token distribution and the SFT policy\'s token distribution is computed and summed: KL = Σ_t KL(π_RL(·|x, y_{<t}) ‖ π_SFT(·|x, y_{<t})).",
        "The KL is computed only at the first and last token of each response.",
        "The KL is approximated using the Euclidean distance between hidden states.",
      ],
      correctAnswer: 1,
      explanation:
        "Per-token KL computes the divergence at each autoregressive step: how different are the RL policy\'s next-token probabilities from the SFT reference\'s? Summing across all T tokens in a response gives the sequence-level KL. This is efficiently computed in a single forward pass through both models on the same token sequence. The per-token KL penalty naturally captures how far each individual generation step has drifted from the reference.",
      hints: [
        "Per-token KL = Σ_t Σ_v π_RL(v|·) · log(π_RL(v|·) / π_SFT(v|·)) — summed over vocabulary and time steps.",
        "A response with one divergent token contributes less total KL than one that consistently differs from the reference.",
      ],
    },
    {
      id: "q-rlhf-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "KL divergence is symmetric: KL(π_RL ‖ π_SFT) = KL(π_SFT ‖ π_RL).",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "KL divergence is asymmetric: KL(P‖Q) ≠ KL(Q‖P) in general. KL(π_RL ‖ π_SFT) = Σ π_RL · log(π_RL/π_SFT) — weighted by the RL policy\'s distribution. This penalizes places where the RL policy assigns high probability but the reference assigns low probability (the forward KL). KL(π_SFT ‖ π_RL) would instead penalize places where the reference assigns high probability but the RL policy assigns low probability. RLHF uses forward KL (π_RL first) as the penalty.",
      hints: [
        "KL(P‖Q) is infinite whenever Q assigns zero probability to an event P assigns positive probability.",
        "The direction matters: RLHF penalizes the RL policy for diverging from the reference, not the reverse.",
      ],
    },
    {
      id: "q-rlhf-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is the KL penalty in RLHF applied to the forward KL KL(π_RL ‖ π_SFT) rather than the reverse KL KL(π_SFT ‖ π_RL)?",
      options: [
        "The forward KL is computationally cheaper to estimate from samples.",
        "The forward KL naturally penalizes the RL policy for assigning high probability to sequences the reference considers unlikely — preventing the policy from confidently generating out-of-distribution text. The reverse KL would penalize the reference for diverging from the RL policy, which is incorrect since the reference is frozen.",
        "The reverse KL would cause the PPO gradient to become zero.",
        "Both directions are equivalent for autoregressive language models.",
      ],
      correctAnswer: 1,
      explanation:
        "In RLHF, the RL policy π_RL is being trained; π_SFT is frozen. The objective is to prevent π_RL from drifting too far from π_SFT. KL(π_RL ‖ π_SFT) = Σ π_RL(y) · log(π_RL(y)/π_SFT(y)) penalizes π_RL for placing mass where π_SFT has low probability — precisely the case where reward hacking would generate implausible text. The forward KL is also tractable to sample from π_RL during training. The reverse KL would optimize from the reference\'s perspective, which is not the training objective.",
      hints: [
        "Forward KL: mode-covering — the RL policy is penalized for ignoring modes of the reference.",
        "We want to constrain where π_RL can go, so the penalty must be weighted by π_RL\'s current distribution.",
      ],
    },
  ],

  "safety-evaluation": [
    {
      id: "q-rlhf-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Red-teaming in the context of LLM alignment refers to:",
      options: [
        "Training the model on data from red-colored datasets.",
        "Adversarially probing the model to find inputs that elicit harmful, unsafe, or misaligned outputs — identifying failure modes before deployment.",
        "Evaluating model performance on red-team benchmark datasets like MMLU.",
        "The process of reversing RLHF training to recover the base model.",
      ],
      correctAnswer: 1,
      explanation:
        "Red-teaming (Perez et al., 2022; Ganguli et al., 2022) systematically tries to break a model\'s safety behaviors by crafting adversarial prompts. Techniques include: jailbreaking (role-play attacks, instruction overrides), prompt injection, many-shot jailbreaking, and automated red-teaming using another LLM. Anthropic, OpenAI, and Google DeepMind all use red-teaming as a mandatory pre-deployment safety evaluation.",
      hints: [
        "Red-teaming finds the \'attack surface\' of alignment — inputs where RLHF\'s safety training fails.",
        "Automated red-teaming (using an LLM to generate adversarial prompts) scales human red-teaming efforts.",
      ],
    },
    {
      id: "q-rlhf-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A model that passes all red-team evaluations conducted before deployment is guaranteed to be safe in all real-world use cases.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Red-teaming is inherently incomplete: it can only test the attack surface that red-teamers imagined. Novel jailbreaks, unexpected user behaviors, or emergent capabilities at deployment scale can reveal new failure modes not found during pre-deployment evaluation. Additionally, deployed models interact with millions of users, creating a much larger attack surface than any red-team exercise. Red-teaming reduces risk but cannot guarantee safety.",
      hints: [
        "Many-shot jailbreaking was discovered after models had already passed standard red-team evaluations.",
        "The gap between pre-deployment testing and deployed-scale usage is a fundamental limitation of safety evaluation.",
      ],
    },
    {
      id: "q-rlhf-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Perez et al. (2022) introduced automated red-teaming where an LLM generates adversarial test prompts. What is the key advantage over manual human red-teaming for safety evaluation?",
      options: [
        "Automated red-teaming is guaranteed to find all safety failures.",
        "An LLM red-teamer can generate thousands of diverse adversarial prompts per hour with low cost, enabling broader coverage of the attack surface than human red-teamers who are limited by time and cognitive bandwidth — especially for discovering rare jailbreaks.",
        "Automated red-teaming produces prompts that humans cannot understand, testing novel attack vectors.",
        "LLM red-teamers are unbiased, while human red-teamers only test culturally familiar failure modes.",
      ],
      correctAnswer: 1,
      explanation:
        "Human red-teamers are bottlenecked by time (hours per prompt), cognitive fatigue, and limited imagination. An automated LLM red-teamer (prompted to generate harmful prompts, adversarial roleplays, etc.) can generate millions of candidates, enabling much broader coverage. Perez et al. (2022) showed that automated red-teaming discovers safety failures that human red-teams miss, particularly in narrow domains requiring technical knowledge or systematic variation of prompt patterns.",
      hints: [
        "Systematic variation (e.g., paraphrasing the same harmful request 1000 ways) is trivial for LLMs but exhausting for humans.",
        "The goal is attack surface coverage — automated tools maximize breadth while humans maximize creativity.",
      ],
    },
  ],

  "scalable-oversight": [
    {
      id: "q-rlhf-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the core problem that \'scalable oversight\' research aims to solve?",
      options: [
        "How to reduce the computational cost of training large reward models.",
        "How to maintain effective human oversight of AI systems as their capabilities exceed human ability to directly evaluate their outputs — ensuring alignment even when humans cannot reliably judge correctness.",
        "How to scale human annotation teams efficiently for large RLHF datasets.",
        "How to make RLHF training scale linearly with model size.",
      ],
      correctAnswer: 1,
      explanation:
        "Scalable oversight (Amodei et al., 2016; Christiano et al., 2018) addresses a fundamental alignment challenge: as AI capabilities grow, humans may lose the ability to directly evaluate whether AI outputs are correct, safe, or beneficial. Standard RLHF requires humans to judge AI outputs — but what happens when the AI is smarter than the human evaluator? Scalable oversight techniques (debate, amplification, recursive reward modeling) try to maintain meaningful human control beyond this threshold.",
      hints: [
        "A human cannot verify whether an AI\'s novel mathematical proof is correct without similar mathematical ability.",
        "Scalable oversight asks: how do we align AI that is smarter than us, using humans who are less capable?",
      ],
    },
    {
      id: "q-rlhf-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Debate (Irving et al., 2018) is a scalable oversight technique where two AI agents argue opposing positions to help humans identify the correct answer — with the assumption that truthful arguments are easier to verify than lies.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "In AI Debate (Irving et al., 2018), two AI agents take opposing sides on a claim. The key assumption is that it is easier to spot a flaw in a dishonest argument than to independently construct a correct argument from scratch. A human referee watches the debate and can ask clarifying questions. If the assumption holds, debate enables humans to adjudicate complex AI outputs even without direct domain expertise — the AI\'s argument structure helps reveal truth.",
      hints: [
        "Cross-examination in courtrooms works similarly: probing an argument for inconsistencies is easier than independently proving the truth.",
        "The debate assumption: a lie can be revealed by an honest debater; an honest argument cannot be successfully attacked.",
      ],
    },
    {
      id: "q-rlhf-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Recursive Reward Modeling (RRM, Leike et al., 2018) addresses scalable oversight by:",
      options: [
        "Training a reward model recursively by reusing the same training data multiple times.",
        "Decomposing complex tasks into subtasks that humans CAN evaluate, training reward models on subtasks, and composing them to provide reward signals for tasks humans cannot directly evaluate — bootstrapping oversight capability.",
        "Using recursive neural networks (RNNs) as the architecture for reward models.",
        "Applying reward modeling at multiple layers of the LLM simultaneously.",
      ],
      correctAnswer: 1,
      explanation:
        "RRM (also related to Iterated Amplification, Christiano et al., 2018) breaks a hard-to-evaluate task into subtasks. For example: evaluating a complex code review is hard for a non-expert, but evaluating whether specific lines have specific bugs may be easier. By training reward models on the easier subtasks and composing them, RRM builds oversight capability for harder tasks. This bootstrapping approach enables human oversight to scale with AI capability.",
      hints: [
        "Decomposition is the key: humans can evaluate step-by-step reasoning even when they cannot evaluate the final answer directly.",
        "Iterated Amplification iterates this process: use the composed reward model to train a better AI, which helps build better subtask reward models.",
      ],
    },
  ],

  "preference-datasets": [
    {
      id: "q-rlhf-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When evaluating the \'alignment tax\' from RLHF, what does it mean for a metric to be on the \'Pareto frontier\' of helpfulness vs. harmlessness?",
      options: [
        "The model scores 100% on both helpfulness and harmlessness benchmarks.",
        "No further improvement in helpfulness is possible without some decrease in harmlessness (or vice versa) — the model is optimally trading off the two objectives given current alignment techniques.",
        "The model uses Pareto-optimal neural architecture search for its design.",
        "The model\'s training data is Pareto-distributed across topic domains.",
      ],
      correctAnswer: 1,
      explanation:
        "The Pareto frontier in multi-objective optimization represents the set of solutions where improving one objective requires sacrificing another. For alignment, a model on the helpfulness-harmlessness Pareto frontier cannot be made more helpful without becoming more harmful (or vice versa). RLHF research aims to push this frontier outward — finding techniques that improve both simultaneously. Constitutional AI\'s combined SL-CAI + RL-CAI was shown to improve the frontier.",
      hints: [
        "A model below the Pareto frontier is inefficient — it could be made more helpful without being more harmful.",
        "Anthropic\'s alignment research explicitly optimizes for Pareto improvements over the helpfulness-harmlessness tradeoff.",
      ],
    },
    {
      id: "q-rlhf-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Anthropic HH (Helpful and Harmless) dataset is a landmark open RLHF preference dataset. What format does it use?",
      options: [
        "Single responses with numerical quality scores from 1-10.",
        "Multi-turn conversations where each example contains a chosen (preferred) and rejected response to a human turn, covering both helpfulness and harmlessness.",
        "A list of factual questions with verified correct answers.",
        "Model completions ranked by length from shortest to longest.",
      ],
      correctAnswer: 1,
      explanation:
        'The Anthropic HH dataset (Bai et al., 2022) contains ~169K examples of multi-turn human-AI dialogues in the format (conversation_history, chosen_response, rejected_response). It covers two splits: "helpful" (preference for more helpful responses) and "harmless" (preference for less harmful responses). It is one of the most widely used open-source RLHF preference datasets for reproducing alignment research.',
      hints: [
        'The HH dataset is available on HuggingFace: "Anthropic/hh-rlhf".',
        "Multi-turn format is important because safety and helpfulness are often context-dependent within a conversation.",
      ],
    },
    {
      id: "q-rlhf-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "UltraFeedback (Cui et al., 2023) is a human-labeled preference dataset requiring thousands of annotator hours to produce its 64K examples.",
      options: ["True", "False"],
      correctAnswer: "false",
      explanation:
        "UltraFeedback used GPT-4 as an AI labeler (LLM-as-a-judge) to generate its 64K preference examples, making it an AI-generated (synthetic) dataset, not human-labeled. GPT-4 scored responses from multiple models across four dimensions. This demonstrates that large-scale, multi-dimensional preference data can be created at low cost through AI annotation — a key advantage of synthetic preference generation over human annotation.",
      hints: [
        "UltraFeedback\'s 64K examples with multi-dimensional GPT-4 scores would cost millions of dollars to produce with human annotators.",
        "Synthetic datasets like UltraFeedback enabled open-source RLHF research at scale.",
      ],
    },
    {
      id: "q-rlhf-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key limitation of static preference datasets (like HH or UltraFeedback) for RLHF training compared to online preference collection is:",
      options: [
        "Static datasets contain only English language examples.",
        "Static datasets were collected from an earlier policy distribution; as the policy improves during RL training, the dataset becomes increasingly off-policy, causing distributional mismatch that limits alignment quality and can cause DPO to degrade.",
        "Static datasets cannot be loaded into GPU memory efficiently.",
        "Static datasets do not support the Bradley-Terry preference model.",
      ],
      correctAnswer: 1,
      explanation:
        "Off-policy distributional mismatch is the fundamental limitation of offline preference data. If HH was collected from Claude 1 and you\'re training Claude 3, the winning and losing responses may both be much worse than Claude 3's current outputs — the preference pairs are no longer informative for the current policy. This is why online RLHF (collecting preferences on current-policy completions) and iterative DPO (collecting new preferences each iteration) outperform offline training on static datasets.",
      hints: [
        'As the policy improves beyond the data-generating policy, even the "chosen" responses may be worse than the current policy\'s average output.',
        "Online data collection solves this by collecting preferences on current-policy outputs — but at higher cost.",
      ],
    },
  ],
};

// Merge additional questions into main questions object
Object.assign(questions, additionalQuestions);

registerQuestions(questions);
