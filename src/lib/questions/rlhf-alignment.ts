import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

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
      correctAnswer: "False",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
      correctAnswer: "False",
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
        "The KL-regularized RL objective is:\n\\[ \\max_{\\pi} \\; \\mathbb{E}_{x}\\big[r(x,y)\\big] - \\beta \\cdot D_{\\mathrm{KL}}\\big(\\pi\\|\\pi_{\\mathrm{ref}}\\big) \\]\nwhere the KL term expands to:\n\\[ D_{\\mathrm{KL}}\\big(\\pi\\|\\pi_{\\mathrm{ref}}\\big) = \\sum_{y} \\pi(y|x) \\log\\frac{\\pi(y|x)}{\\pi_{\\mathrm{ref}}(y|x)} \\]\nMaximizing the Lagrangian with constraint $\\sum_y \\pi(y|x) = 1$:\n\\[ \\mathcal{L} = \\sum_{y} \\pi(y|x)\\,r(x,y) - \\beta\\sum_{y}\\pi(y|x)\\log\\frac{\\pi(y|x)}{\\pi_{\\mathrm{ref}}(y|x)} + \\lambda\\Bigl(1 - \\sum_{y}\\pi(y|x)\\Bigr) \\]\nSetting $\\partial\\mathcal{L}/\\partial\\pi(y|x) = 0$ gives:\n\\[ r(x,y) - \\beta\\Bigl(\\log\\frac{\\pi(y|x)}{\\pi_{\\mathrm{ref}}(y|x)} + 1\\Bigr) - \\lambda = 0 \\]\n\\[ \\log\\pi(y|x) = \\log\\pi_{\\mathrm{ref}}(y|x) + \\frac{r(x,y)}{\\beta} - \\frac{\\lambda+1}{\\beta} \\]\nExponentiating and normalizing yields the Gibbs (Boltzmann) distribution:\n\\[ \\pi^*(y|x) = \\frac{\\pi_{\\mathrm{ref}}(y|x)\\,\\exp\\!\\bigl(r(x,y)/\\beta\\bigr)}{\\sum_{y'}\\pi_{\\mathrm{ref}}(y'|x)\\,\\exp\\!\\bigl(r(x,y')/\\beta\\bigr)} \\propto \\pi_{\\mathrm{ref}}(y|x)\\,\\exp\\!\\biggl(\\frac{r(x,y)}{\\beta}\\biggr) \\]\n\n**Connection to DPO.** Since the partition function $Z(x) = \\sum_{y'}\\pi_{\\mathrm{ref}}(y'|x)\\,\\exp(r(x,y')/\\beta)$ does not depend on $y$, we can write the implicit reward as:\n\\[ r_{\\mathrm{impl}}(x,y) = \\beta\\log\\frac{\\pi_\\theta(y|x)}{\\pi_{\\mathrm{ref}}(y|x)} + \\beta\\log Z(x) \\]\nRearranging the optimality condition gives $r_{\\mathrm{impl}}(x,y) = \\beta\\log(\\pi_\\theta(y|x)/\\pi_{\\mathrm{ref}}(y|x))$, which DPO uses directly — eliminating the need for a separate reward model or RL loop.",
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
      correctAnswer: "False",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
  'alignment-problem': [
    {
      id: 'q-rlhf-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the "alignment problem" in the context of large language models?',
      options: [
        'The technical difficulty of aligning multiple model replicas in distributed training.',
        'The challenge of ensuring AI systems pursue goals and exhibit behaviors that are beneficial and consistent with human values and intent.',
        'The problem of matching embedding dimensions between encoder and decoder layers.',
        'The difficulty of aligning training data labels with ground-truth annotations.',
      ],
      correctAnswer: 1,
      explanation: 'The alignment problem asks how to build AI systems whose objectives, behaviors, and outputs are reliably consistent with what humans actually want. For LLMs this manifests as: models that follow instructions but also refuse harmful requests, are helpful without being sycophantic, and remain honest without hallucinating — all simultaneously.',
      hints: [
        'A perfectly capable model can be perfectly misaligned — capability and alignment are orthogonal.',
        'Goodhart\'s Law captures one facet: optimizing any measurable proxy for human values eventually diverges from true values.',
      ],
    },
    {
      id: 'q-rlhf-kp12-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'An LLM that scores perfectly on all NLP benchmarks (MMLU, HumanEval, GSM8K) is guaranteed to be well-aligned with human values.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      explanation: 'Benchmark performance measures capability (what the model can do), not alignment (whether it does what humans actually want). A model could score 100% on MMLU while producing harmful outputs, being deceptive, or failing to follow instructions — benchmarks measure narrow task performance, not the full scope of alignment.',
      hints: [
        'Alignment requires helpfulness, harmlessness, and honesty — none of which are directly measured by standard benchmarks.',
        'A model that memorised all benchmark answers would score perfectly without being aligned.',
      ],
    },
    {
      id: 'q-rlhf-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Mesa-optimisation (Hubinger et al., 2019) describes a risk where a base optimiser (gradient descent) produces a mesa-optimiser (the trained model) that pursues different objectives. What is the "inner alignment" problem?',
      options: [
        'Ensuring the training loss correctly captures human preferences (reward modelling accuracy)',
        'Ensuring the trained model\'s learned objective matches the base optimiser\'s training objective — a mesa-optimiser could learn to pursue a proxy objective that coincidentally maximised training reward but diverges in deployment',
        'Aligning the attention patterns of inner Transformer layers with the outer task objective',
        'Preventing gradient descent from converging to local minima during RLHF training',
      ],
      correctAnswer: 1,
      explanation: 'Inner alignment: even if the reward function perfectly captures human values (outer alignment), gradient descent might produce a model that learned a correlated but distinct internal objective (mesa-objective) that happened to score well on the training distribution. This mesa-objective may diverge from the reward function out-of-distribution — a model that "acts aligned" during training for strategic reasons but pursues different goals at deployment.',
      hints: [
        'Outer alignment: does the reward function capture what we want? Inner alignment: does the trained model optimize that reward function?',
        'Mesa-optimizer: the model itself is an optimizer (e.g., doing in-context learning) — its internal optimization target may differ from the training reward.',
      ],
    },
  ],
  'rlhf-instruct': [
    {
      id: 'q-rlhf-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'InstructGPT (Ouyang et al., 2022) demonstrated that RLHF-trained models are preferred by human evaluators over much larger base models. The 1.3B InstructGPT model was preferred over the ___.',
      options: [
        '6.7B GPT-3 base model',
        '175B GPT-3 base model',
        '13B Codex base model',
        '70B GPT-3 base model',
      ],
      correctAnswer: 1,
      explanation: 'InstructGPT showed that alignment quality matters more than raw scale: the 1.3B RLHF model was preferred by human evaluators over the 175B GPT-3 base model on most tasks. This demonstrated that a smaller, well-aligned model could outperform a much larger but unaligned model in real-world usefulness — a landmark result motivating the RLHF paradigm.',
      hints: [
        'Scale alone is insufficient: GPT-3 175B is 135x larger but less preferred because it was not fine-tuned for instruction following.',
        'Human preference \$\\neq\$ benchmark accuracy: the metric that matters for deployment is whether humans find the model useful.',
      ],
    },
    {
      id: 'q-rlhf-kp13-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Supervised Fine-Tuning (SFT) alone on high-quality demonstrations is sufficient for LLMs to learn nuanced human preferences, making RLHF unnecessary for most alignment tasks.',
      correctAnswer: 'False',
      explanation: 'SFT on demonstrations provides positive-only learning signal for demonstrated outputs. It cannot teach the model to distinguish between good and bad responses on prompts not in the demonstration set, nor provide calibrated uncertainty or explicit preference ranking. RLHF adds bidirectional signal: both reinforcing good responses and penalising bad ones, enabling alignment generalisation beyond the SFT demonstration distribution.',
      hints: [
        'SFT learns "what good responses look like" but not "why some responses are better than others."',
        'For novel prompts outside the SFT demonstration set, the model has no explicit signal about response quality — RLHF fills this gap.',
      ],
    },
    {
      id: 'q-rlhf-kp13-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "alignment tax" refers to the phenomenon where RLHF-aligned models sometimes show reduced performance on NLP benchmarks compared to base models. What is the primary cause of this degradation?',
      options: [
        'RLHF training uses a smaller learning rate than pre-training, causing underfitting',
        'The KL divergence penalty and RM-optimised policy may trade off factual accuracy for response style (fluency, safety compliance), as the RM may reward well-formatted but less precise responses',
        'RLHF training corrupts the embedding layer, reducing token representation quality',
        'RLHF models are smaller because alignment removes parameters via pruning',
      ],
      correctAnswer: 1,
      explanation: 'The alignment tax: the RM was trained by humans who may prefer confident, well-formatted responses even when less accurate. The RLHF policy learns this preference, potentially sacrificing accuracy for stylistic qualities rewarded by the RM. Mitigations: diverse annotator pools, calibration-aware RM training, and evaluating alignment on benchmarks alongside human preference metrics.',
      hints: [
        'RM training on human preferences may inadvertently reward confidence over accuracy.',
        'RLHF optimises RM score, not ground-truth accuracy — the RM is an imperfect proxy for true quality.',
      ],
    },
  ],
  'dpo-variants': [
    {
      id: 'q-rlhf-kp14-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'DPO (Direct Preference Optimisation) eliminates the need for a separate reward model by reparameterising the RLHF objective. The DPO loss for a (prompt x, chosen y_w, rejected y_l) triple is ___.',
      options: [
        'L = −log σ(r(x,y_w) − r(x,y_l)) where r is a separately trained reward model',
        'L = −log σ(β log[π_θ(y_w|x)/π_ref(y_w|x)] − β log[π_θ(y_l|x)/π_ref(y_l|x)]) where the implicit reward is expressed directly via the policy log-prob ratio',
        'L = MSE(π_θ(y_w|x), π_ref(y_w|x)) summed over chosen responses',
        'L = KL(π_θ(·|x) || π_ref(·|x)) averaged over preference pairs',
      ],
      correctAnswer: 1,
      explanation: 'DPO (Rafailov et al., 2023): starting from the RLHF objective with KL constraint, the optimal policy satisfies π*(y|x) ∝ π_ref(y|x)·exp(r(y,x)/β). Rearranging: r(y,x) = β log[π*(y|x)/π_ref(y|x)] + β log Z(x). Substituting into the Bradley-Terry preference loss eliminates r and Z(x), giving the DPO loss directly in terms of policy log-probabilities.',
      hints: [
        'The key insight: the optimal RLHF policy implicitly encodes the reward — no separate RM needed.',
        'Log Z(x) cancels in the difference r(y_w) − r(y_l), making the reparameterisation exact.',
      ],
    },
    {
      id: 'q-rlhf-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'DPO is an offline algorithm — it trains on a fixed, pre-collected preference dataset without interacting with the current policy — making it more computationally efficient but potentially less effective than online RLHF for continued alignment improvement.',
      correctAnswer: 'True',
      explanation: 'DPO offline limitation: the preference dataset was collected from some behaviour policy (often the SFT model). As the DPO-trained policy improves, its outputs diverge from the dataset distribution, and the fixed preference pairs become less informative (off-policy problem). Online/iterative DPO collects new preferences on current-policy outputs each iteration, addressing this at additional cost.',
      hints: [
        'Offline RL limitation: training data represents old policy outputs; the new policy may never encounter these outputs.',
        'Online DPO: collect preferences on current model outputs → update → repeat. Higher cost, better asymptotic performance.',
      ],
    },
    {
      id: 'q-rlhf-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'SimPO (Simple Preference Optimisation) modifies DPO by replacing the log-probability ratio reward with an average log-probability reward. What problem with DPO does SimPO address?',
      options: [
        'DPO requires paired data which is unavailable in most practical settings',
        'DPO\'s reward implicitly depends on the reference model for each response, leading to length bias (longer responses have higher log-prob ratios simply due to more tokens); SimPO normalises by response length and removes the reference model for inference efficiency',
        'DPO cannot be applied to instruction-following tasks, only to factual QA',
        'DPO has no closed-form solution for the optimal policy, making convergence analysis impossible',
      ],
      correctAnswer: 1,
      explanation: 'SimPO (Meng et al., 2024): reward = (1/|y|) Σ_t log π_θ(y_t|y_{<t},x) — average log-probability per token, with a target reward margin γ. This eliminates the reference model at inference (faster) and removes length bias (DPO\'s implicit reward grows with sequence length, incentivising verbosity). SimPO matches or exceeds DPO on AlpacaEval2 while requiring only one model during inference.',
      hints: [
        'DPO length bias: a response twice as long has twice as many log-prob terms, artifically inflating its reward.',
        'SimPO normalises by length: average log-prob is length-invariant, removing the verbosity incentive.',
      ],
    },
  ],
  'preference-data-v2': [
    {
      id: 'q-rlhf-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Anthropic HH dataset (Helpful and Harmless) provides human preference pairs for RLHF training. Each example consists of ___.',
      options: [
        'A prompt and a single gold-standard response written by an expert',
        'A conversation context and two model responses, with human-labelled winner indicating which response is more helpful or less harmful',
        'A prompt and a reward score from 1-10 given by a human annotator',
        'A harmful prompt paired with a safe refusal, used as positive examples for safety training',
      ],
      correctAnswer: 1,
      explanation: 'The HH dataset (Ganguli et al., Anthropic 2022) contains ~170K preference pairs: human annotators are shown a conversation context and two model continuations (A and B), then label which they prefer. Separate subsets cover helpfulness and harmlessness. These binary comparisons train the Bradley-Terry reward model used for PPO-based RLHF.',
      hints: [
        'Binary comparison, not scalar rating: annotators say "A is better than B" rather than giving A a score of 7/10.',
        'Two separate datasets: HH-harmless (which response is less harmful?) and HH-helpful (which response is more helpful?).',
      ],
    },
    {
      id: 'q-rlhf-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'UltraFeedback improves preference data quality by using GPT-4 to generate both diverse instruction-following prompts and fine-grained critique scores across multiple quality dimensions (instruction-following, truthfulness, honesty, helpfulness).',
      correctAnswer: 'True',
      explanation: 'UltraFeedback (Cui et al., 2023): GPT-4 generates responses to 64K diverse instructions and assigns scores (1-5) across four quality dimensions per response. The highest and lowest-scored responses form preference pairs for DPO/RLHF training. This AI-generated preference data at scale (without human annotation cost) enabled models like Zephyr to match or exceed models trained on human-annotated data.',
      hints: [
        'UltraFeedback: 4 model responses per prompt × 64K prompts = 256K scored responses → 64K preference pairs.',
        'Multi-dimensional scoring: one response can be truthful but unhelpful; scores per dimension give richer training signal.',
      ],
    },
    {
      id: 'q-rlhf-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Annotator disagreement in preference datasets is a fundamental challenge. What does inter-annotator agreement (IAA) in RLHF preference data typically look like, and what does this imply for reward model training?',
      options: [
        'IAA is typically >95%, meaning human preferences are nearly deterministic and training labels are highly reliable',
        'IAA is typically 60-75% for complex tasks, reflecting genuine ambiguity in human preferences; reward models should treat preferences as probabilistic (noisy labels) rather than deterministic ground truth, and ensemble/uncertainty-aware RM training is warranted',
        'IAA is always exactly 50% because preferences are random and RLHF reward models cannot learn anything meaningful',
        'IAA is not measured in RLHF because the majority vote is always used as the ground truth label',
      ],
      correctAnswer: 1,
      explanation: 'Bai et al. (Anthropic, 2022) reported inter-annotator agreement of ~70% for helpfulness preferences. This 30% disagreement rate reflects genuine ambiguity: different people have different definitions of "helpful." Implications: (1) the RM should not be over-confident; (2) soft labels (probabilities rather than hard 0/1) better capture annotator disagreement; (3) RM uncertainty estimates are meaningful and should be propagated to policy training.',
      hints: [
        '70% IAA means 30% of pairs would be labelled oppositely by two annotators — significant noise.',
        'Treating noisy 70% labels as 100% certain creates a miscalibrated RM that is overconfident on ambiguous examples.',
      ],
    },
  ],
  'llm-safety-training': [
    {
      id: 'q-rlhf-kp16-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Safety training for LLMs commonly uses the "safety-helpfulness" Pareto frontier concept. What does this frontier represent?',
      options: [
        'The trade-off between model speed and accuracy on safety benchmarks',
        'The set of model checkpoints where improving safety (fewer harmful outputs) without decreasing helpfulness is impossible — any safety improvement requires some helpfulness reduction, and vice versa',
        'A fixed safety threshold below which all models are deployed and above which they are rejected',
        'The boundary between models that pass red-team evaluation and those that fail',
      ],
      correctAnswer: 1,
      explanation: 'The safety-helpfulness Pareto frontier: both objectives cannot be simultaneously maximised. Adding more safety training reduces harmful output rates but also increases over-refusal (false positives that reject legitimate requests). The optimal deployment model is on or near the Pareto frontier — maximally helpful given a safety constraint. Moving off the frontier (e.g., adding safety training that reduces helpfulness unnecessarily) is waste.',
      hints: [
        'Pareto optimal: no change can improve safety without hurting helpfulness, or vice versa.',
        'Below the frontier: safety could be improved without sacrificing helpfulness — the model is suboptimal.',
      ],
    },
    {
      id: 'q-rlhf-kp16-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Catastrophic forgetting — where safety training degrades the model\'s pre-training knowledge — is mitigated in RLHF by the KL divergence penalty that keeps the policy close to the SFT initialisation.',
      correctAnswer: 'True',
      explanation: 'The KL constraint β·KL(π_θ||π_SFT) in PPO-RLHF anchors the policy near the SFT model, preventing large weight changes that would erase pre-training knowledge. Without this constraint, aggressive RL optimisation could overwrite factual knowledge, language generation quality, or code ability in favour of reward-maximising behaviours. DPO also uses the reference model for the same purpose.',
      hints: [
        'KL penalty = implicit regularisation toward the SFT model. Large β = strong regularisation, small policy change.',
        'Catastrophic forgetting in RL: gradient descent on RL loss overwrites weights trained by pre-training and SFT — the KL constraint prevents this.',
      ],
    },
    {
      id: 'q-rlhf-kp16-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Safety fine-tuning approaches can be categorised as "reactive" (refusing harmful requests) vs. "proactive" (promoting beneficial behaviour). Which is an example of proactive safety training?',
      options: [
        'Training the model to output a refusal message when detecting jailbreak patterns',
        'Training the model to proactively flag potential harms in user requests before answering, add safety caveats to dangerous information, or suggest safer alternatives — not just refusing but actively guiding toward safer outcomes',
        'Using a safety classifier to filter outputs post-generation and replace detected harmful content with refusals',
        'Blocking API calls that match a predefined list of harmful keywords',
      ],
      correctAnswer: 1,
      explanation: 'Proactive safety (Anthropic\'s model spec): rather than only refusing, the model actively steers interactions toward safe outcomes: warns about risks of an activity while still helping, adds safety caveats to dangerous information, asks for context when the intent is ambiguous, and suggests alternatives. This produces a model that is both safer and more helpful than one trained only to refuse.',
      hints: [
        'Reactive safety: "you asked something harmful, I refuse." Proactive safety: "here is how to do this safely, and watch out for these risks."',
        'A proactive model is an active safety participant, not just a passive filter.',
      ],
    },
  ],
  'reward-model-architecture': [
    {
      id: 'q-rlhf-kp17-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A reward model for RLHF is typically initialised from the SFT model and modified by ___.',
      options: [
        'Replacing all attention layers with feed-forward layers to remove sequence dependencies',
        'Replacing the language modelling head (vocabulary logits) with a scalar head that outputs a single reward value for the full input sequence',
        'Adding a new decoder stack on top of the SFT encoder to generate reward scores autoregressively',
        'Freezing all weights and training only a new classification head from scratch',
      ],
      correctAnswer: 1,
      explanation: 'RM architecture: start from the SFT model (same backbone); remove the LM head (|V| logits); add a single linear layer that maps the final-token hidden state to a scalar reward. Training: minimise −E[log σ(r(x,y_w) − r(x,y_l))] over preference pairs. The SFT initialisation gives strong language understanding that transfers to reward prediction.',
      hints: [
        'The RM still reads the prompt+response as text and processes it with the Transformer backbone.',
        'The final token\'s hidden state summarises the full sequence — the scalar head maps this to a quality score.',
      ],
    },
    {
      id: 'q-rlhf-kp17-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Using a larger reward model (e.g., 70B parameters) rather than a smaller one (e.g., 7B) generally produces more accurate preference predictions and leads to better RLHF policy training.',
      correctAnswer: 'True',
      explanation: 'Gao et al. (2022) showed that larger RMs have higher proxy-gold correlation: their predictions better match gold-standard human preferences on held-out evaluations. Larger RMs also overoptimise less quickly — the policy must drift further in KL space before reward hacking occurs. However, larger RMs are more expensive to run during RL (every rollout requires an RM forward pass).',
      hints: [
        'RM scaling: more parameters → better generalisation from the preference training data.',
        'Trade-off: 70B RM is more accurate but 10x slower than 7B RM — inference cost matters during rollout generation.',
      ],
    },
    {
      id: 'q-rlhf-kp17-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When the reward model is trained on preference data that was generated by a weaker policy and then applied to score outputs from a stronger policy, this creates ___.',
      options: [
        'A positive feedback loop that improves RM accuracy automatically',
        'Distribution shift: the RM was trained on (weaker policy response) comparisons but scores (stronger policy response) comparisons — the RM may be unreliable on better responses it was never trained to compare, potentially assigning incorrect scores to high-quality outputs',
        'No problem, because the RM generalises perfectly to any quality level by design',
        'A mode collapse where the RM assigns identical scores to all strong policy outputs',
      ],
      correctAnswer: 1,
      explanation: 'RM distribution shift: trained on comparisons from π_0 (SFT model), deployed to score π_k (k-th RLHF iteration, much better). π_k\'s outputs are out-of-distribution for the RM — it was never trained to compare outputs at this quality level. This causes reward model degradation, requiring periodic RM refresh with new preference data collected from the current policy.',
      hints: [
        'The RM\'s training distribution = quality range of the policy that generated the preference pairs.',
        'After many RL iterations, even the "losing" responses from π_k may be better than the "winning" responses that trained the RM.',
      ],
    },
  ],
  'constitutional-principles': [
    {
      id: 'q-rlhf-kp18-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Anthropic\'s model specification (the "Claude constitution") establishes a priority ordering for Claude\'s objectives. What is the correct ordering from highest to lowest priority?',
      options: [
        'Helpful → Harmless → Honest',
        'Broadly safe (supporting human oversight) → Broadly ethical → Adherent to Anthropic\'s principles → Genuinely helpful',
        'Harmless → Honest → Helpful → Corrigible',
        'Helpful → Honest → Broadly safe → Ethical',
      ],
      correctAnswer: 1,
      explanation: 'Claude\'s model spec (2024): (1) Broadly safe: supporting appropriate human oversight mechanisms during this critical period of AI development; (2) Broadly ethical: having good values, being honest, avoiding harmful actions; (3) Adherent to Anthropic principles: acting per Anthropic guidelines where relevant; (4) Genuinely helpful: benefiting users and operators. This ordering means Claude will sacrifice helpfulness to avoid harm, and sacrifice harmlessness to maintain broad safety properties.',
      hints: [
        'Broad safety ranks highest because during early AI development, human oversight is the most important safeguard.',
        'Helpfulness ranks last: Claude should not be helpful in ways that compromise safety, ethics, or core principles.',
      ],
    },
    {
      id: 'q-rlhf-kp18-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Claude\'s model specification distinguishes between "operators" (API customers who build products) and "users" (end users of those products), giving operators higher trust and the ability to restrict or expand Claude\'s default behaviours within limits set by Anthropic.',
      correctAnswer: 'True',
      explanation: 'The three-tier principal hierarchy: Anthropic (highest trust, via training) → Operators (medium trust, via system prompt — can restrict Claude to specific topics, enable adult content for appropriate platforms, etc.) → Users (base trust, via conversation — can adjust within operator-permitted range). This layered trust model enables flexible deployment across diverse use cases while maintaining Anthropic\'s core safety guarantees.',
      hints: [
        'Operator example: a medical platform enables Claude to discuss drug interactions in detail (restricted by default) for verified healthcare providers.',
        'User permissions are bounded by operator permissions, which are bounded by Anthropic\'s training.',
      ],
    },
    {
      id: 'q-rlhf-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "hardcoded OFF" vs. "softcoded" distinction in Claude\'s model spec means ___.',
      options: [
        'Hardcoded behaviours use deterministic code rules; softcoded behaviours use probabilistic NN outputs',
        'Hardcoded OFF behaviours are absolute limits (never provide CBRN uplift, never generate CSAM) that cannot be changed by any operator or user instruction; softcoded behaviours are defaults that operators/users can legitimately adjust within Anthropic\'s policy',
        'Hardcoded OFF means the model physically cannot generate certain token sequences due to vocabulary filtering',
        'Softcoded behaviours are behaviours that can be changed by updating Claude\'s weights via fine-tuning; hardcoded behaviours are frozen in pre-training',
      ],
      correctAnswer: 1,
      explanation: 'Hardcoded OFF = bright lines that Claude never crosses regardless of instructions: no weapons of mass destruction assistance, no CSAM, no undermining legitimate AI oversight. These are non-negotiable because the potential harms are catastrophic and irreversible. Softcoded defaults (e.g., following suicide safe messaging guidelines, adding safety caveats) can be adjusted by operators with legitimate reasons (medical platform, research context).',
      hints: [
        'Hardcoded OFF: no argument or instruction, however compelling, should cause Claude to cross these lines.',
        'Softcoded: operators/users can legitimately expand or restrict these behaviours within Anthropic\'s policies.',
      ],
    },
  ],
  'rlhf-evaluation': [
    {
      id: 'q-rlhf-kp19-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Evaluation of RLHF-trained models typically uses ___.',
      options: [
        'Only standard NLP benchmarks (MMLU, HellaSwag, ARC) because they are objective and reproducible',
        'A combination of automated benchmarks (for capability), human preference evaluations (for alignment), and red-team testing (for safety) — no single evaluation captures the full picture',
        'Only human preference ratings because automated metrics are unreliable for aligned models',
        'Perplexity on a held-out validation set from the RLHF preference dataset',
      ],
      correctAnswer: 1,
      explanation: 'Comprehensive RLHF evaluation (InstructGPT, Llama 3 alignment, Claude evaluations): (1) Standard benchmarks: MMLU, HumanEval, GSM8K — measure capability retention; (2) Human preference studies: A/B comparisons against baseline models — measure alignment; (3) Red-team testing: adversarial prompts testing robustness — measure safety. Each dimension captures different aspects; all three are needed for deployment decisions.',
      hints: [
        'Benchmark: "can the model answer this factual question correctly?" — necessary but not sufficient.',
        'Human preference: "do people prefer this model\'s outputs?" — essential for deployment quality.',
        'Red-team: "can the model be manipulated into producing harmful outputs?" — safety-critical.',
      ],
    },
    {
      id: 'q-rlhf-kp19-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'AlpacaEval is an automated evaluation benchmark that uses GPT-4 (or Claude) as a judge to compare model outputs against GPT-4-Turbo reference responses, providing a scalable alternative to human preference studies.',
      correctAnswer: 'True',
      explanation: 'AlpacaEval 2.0: 805 instructions, LLM-as-judge (GPT-4-Turbo) compares each model\'s response against GPT-4-Turbo as baseline. Reports win rate (% of responses preferred over baseline). Correlates well with Chatbot Arena (human preference) rankings. Enables rapid automated evaluation of new models without expensive human annotation — critical for fast development iteration.',
      hints: [
        'AlpacaEval win rate: "what fraction of this model\'s responses did GPT-4-judge prefer over GPT-4-Turbo\'s responses?"',
        'High win rate ≈ human preference — the correlation is the key validation that makes AlpacaEval useful.',
      ],
    },
    {
      id: 'q-rlhf-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Chatbot Arena (LMSYS) uses the Elo rating system adapted for pairwise model comparisons. What statistical property ensures the Elo ratings converge to reflect true model quality?',
      options: [
        'Elo ratings are deterministic and converge as long as enough comparison pairs are collected',
        'Under the Bradley-Terry model of pairwise comparisons (where P(A beats B) = e^{Elo_A}/(e^{Elo_A}+e^{Elo_B})), the Elo maximum likelihood estimate converges to the true rating with increasing comparisons — this is a consistent estimator of the latent quality ordering',
        'Elo ratings use Bayesian updating, which guarantees convergence to the posterior distribution over model quality',
        'Elo convergence requires that every model pair is compared at least 100 times — below this threshold, ratings are unreliable',
      ],
      correctAnswer: 1,
      explanation: 'Chatbot Arena uses Bradley-Terry MLE for its "Arena Score" (not vanilla Elo, which is an online update approximation). BT-MLE is a consistent estimator: as N → ∞, the estimated ratings converge in probability to the true quality ordering. Confidence intervals shrink as more comparisons accumulate. The BT model assumes pairwise comparison probability follows a logistic function of the rating difference — the same assumption used in RLHF reward model training.',
      hints: [
        'Bradley-Terry = the statistical model underlying both Chatbot Arena ratings and RLHF reward models.',
        'MLE consistency: with enough data, the estimator converges to the true parameter regardless of initialisation.',
      ],
    },
  ],
  'scalable-oversight': [
    {
      id: 'q-rlhf-kp20-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Debate (Irving et al., 2018) proposes a scalable oversight technique where ___.',
      options: [
        'Human annotators debate with the AI to provide adversarial training examples',
        'Two AI agents argue for opposing answers and a human judges which argument is more persuasive — the idea is that a human can evaluate debate arguments even for tasks exceeding their direct competence, because it is easier to identify flaws in an argument than to generate a correct answer',
        'The AI debates itself internally via chain-of-thought and selects the most internally consistent answer',
        'A safety team debates internally whether to deploy each model version, providing structured governance',
      ],
      correctAnswer: 1,
      explanation: 'Debate setup: two AI agents argue for/against competing answers to a hard question; a human judge evaluates the arguments. Key claim: if one agent is making a correct argument and the other is wrong, the correct agent should win the debate (assuming the human can detect logical flaws). This allows humans to verify superhuman AI reasoning through adversarial scrutiny rather than direct understanding.',
      hints: [
        'Verification vs. generation: it\'s easier to check if a proof step is valid than to construct the proof yourself.',
        'If both agents could collude to present a false answer convincingly, debate breaks down — game-theoretic analysis of this is ongoing.',
      ],
    },
    {
      id: 'q-rlhf-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Recursive reward modelling (RRM) decomposes hard-to-evaluate tasks into simpler subtasks that humans can directly evaluate, composing their evaluations to provide feedback on the original task.',
      correctAnswer: 'True',
      explanation: 'RRM (Leike et al., 2018): a human+AI "assistant" team evaluates a complex task by breaking it into subproblems each human can evaluate. For a long-form essay: split into paragraphs, evaluate each paragraph for accuracy and coherence, compose scores. This enables human oversight of outputs that would be too complex to evaluate holistically, scaling human oversight through task decomposition.',
      hints: [
        'A 50-page research report is hard to evaluate holistically; evaluating each section separately is tractable.',
        'Compose: if each section is high quality and flows logically, the whole report is likely high quality.',
      ],
    },
    {
      id: 'q-rlhf-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Iterated amplification (Christiano et al., 2018) trains an AI assistant H(A) where ___.',
      options: [
        'H is a human and A is an AI; H teaches A to match human-level performance iteratively',
        'H(A) denotes a human using AI A as a tool: the human+AI pair evaluates tasks, generates preference labels, trains A to match H(A)\'s outputs, then H uses the improved A — iterating until A can solve the original task without human involvement',
        'H is a heuristic reward function and A is the aligned model; the heuristic is amplified by training A to surpass the heuristic',
        'H is a hierarchy of reward models and A is the actor-critic policy trained on their combined signal',
      ],
      correctAnswer: 1,
      explanation: 'Iterated amplification: (1) Human H uses AI A (initially weak) as a tool to evaluate/solve subtasks; (2) Train A_{new} on (H+A_old)\'s outputs; (3) Human now uses A_{new} (stronger) as a tool — each iteration amplifies human capability. The key claim: if decomposition is correct and human+AI evaluation is accurate, the trained model A_{final} provably converges to the human\'s true preferences even for tasks humans cannot evaluate alone.',
      hints: [
        'Bootstrap: weak A → human amplified by weak A → slightly better A → human amplified by better A → ...',
        'Amplification ensures each training step is supervised by a more capable (human+AI) evaluator than the previous step.',
      ],
    },
  ],
  'helpfulness-training': [
    {
      id: 'q-rlhf-kp21-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Instruction following is a core capability developed during SFT for RLHF. What distinguishes "instruction following" from "question answering"?',
      options: [
        'Instruction following uses longer prompts than question answering',
        'Instruction following requires the model to understand and execute diverse imperatives (format responses as JSON, translate text, summarise at a specific reading level) rather than just retrieving or reasoning about factual information',
        'Instruction following is only relevant for coding tasks, while question answering covers all other domains',
        'Instruction following is evaluated only by human raters, while question answering has automatic evaluation metrics',
      ],
      correctAnswer: 1,
      explanation: 'Question answering: respond to a factual question with the correct answer. Instruction following: execute an arbitrary command, respecting constraints on format, length, tone, persona, language, and content. InstructGPT\'s SFT data included diverse tasks: open QA, summarisation, classification, code generation, and creative writing — all requiring different instruction-following capabilities.',
      hints: [
        '"What is the capital of France?" = QA. "Write a haiku about Paris in the style of Hemingway, using exactly 17 syllables" = instruction following.',
        'Instruction following requires parsing constraints (format, style, length) and generating responses that satisfy all of them simultaneously.',
      ],
    },
    {
      id: 'q-rlhf-kp21-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'The LIMA (Less Is More for Alignment) paper showed that 1000 high-quality SFT examples can be sufficient to align a model for instruction following, suggesting data quality matters more than quantity for SFT.',
      correctAnswer: 'True',
      explanation: 'LIMA (Zhou et al., 2023): fine-tuned LLaMA-65B on 1000 carefully curated examples (diverse, high-quality demonstrations) and found the result competitive with models trained on 52K+ examples (like Alpaca). Key finding: alignment emerges from learning a "style" of helpful responding, not from learning vast amounts of new knowledge — most knowledge comes from pre-training. This is the "superficial alignment hypothesis."',
      hints: [
        'Superficial alignment: SFT teaches the model how to respond (format, tone, instruction-following style), not what to know.',
        '1000 high-quality examples > 52000 noisy examples — quality beats quantity for alignment SFT.',
      ],
    },
    {
      id: 'q-rlhf-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Open-source instruction-following datasets like Alpaca and Dolly were generated via self-instruct: prompting a teacher LLM to generate instruction-response pairs. What is the key limitation of this approach for alignment?',
      options: [
        'Self-instruct cannot generate diverse instructions because the teacher LLM always produces the same outputs',
        'Self-instruct inherits the biases, limitations, and hallucinations of the teacher model (e.g., ChatGPT, GPT-4) — generating a dataset that encodes those errors into the student model, and may introduce unsafe content if the teacher is not safety-filtered',
        'Self-instruct requires a separate reward model to filter generated examples, making it as expensive as human annotation',
        'Self-instruct can only generate English-language examples due to temperature limitations in the teacher LLM',
      ],
      correctAnswer: 1,
      explanation: 'Self-instruct (Wang et al., 2022) uses GPT-3/4 to generate (instruction, response) pairs at scale (~52K for Alpaca). Limitation: the student model learns from the teacher\'s errors. If GPT-3 hallucinates facts, the student learns to hallucinate. If GPT-4 has biases, the student inherits them. Additionally, quality filtering is manual and imperfect. High-quality curation (LIMA, ShareGPT from real human interactions) addresses this but at higher cost.',
      hints: [
        'Garbage in, garbage out: self-instruct quality is bounded by the teacher model\'s quality.',
        'ChatGPT as teacher: it has safety training but still hallucinates — those hallucinations propagate to the student via distillation.',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
        'Specification gaming \$\\neq\$ mistake: the AI is doing exactly what was rewarded. The mistake was in the reward specification.',
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
      correctAnswer: 'True',
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
  'constitutional-ai-v2': [
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
        'Sycophancy \$\\neq\$ helpfulness: a model that tells you what you want to hear is not serving your actual interests.',
      ],
    },
    {
      id: 'q-rlhf-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Position bias in reward models — where annotators systematically prefer whichever response appears first — contributes to sycophancy because models learn to exploit this ordering artifact.',
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
      explanation: 'Yang et al. (2023) and subsequent work showed that fine-tuning a safety-aligned model on benign domain data (medical, legal, coding) partially undoes safety alignment—the model becomes more likely to comply with harmful requests. The intuition: RLHF safety modifies a small subspace of weights; domain fine-tuning overwrites some of these modifications. Solutions: safety-aware fine-tuning, regularisation toward the aligned model, or merging after domain fine-tuning.',
      hints: [
        'Safety alignment \$\\neq\$ stable: it can be partially overwritten by subsequent gradient updates on unrelated data.',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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
      correctAnswer: 'True',
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

const additionalQuestions3: Record<string, Question[]> = {
  "cai-rlaif": [
    {
      id: "q-rlhf-kp51-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Constitutional AI (CAI) by Anthropic (Bai et al., 2022) differs from standard RLHF in that the preference labels used for RL training come primarily from:",
      options: [
        "Human crowdworkers rating response pairs on a 1-7 Likert scale",
        "An AI model critiquing and revising responses according to a fixed set of constitutional principles, then rating revised pairs",
        "Automated toxicity classifiers trained on Common Crawl",
        "A mixture of human labels and GPT-4 labels weighted 50/50",
      ],
      correctAnswer: 1,
      explanation: "CAI uses a two-phase approach. In the supervised learning phase, the model critiques its own harmful outputs and rewrites them according to constitutional principles. In the RL phase (RLAIF), an AI model generates preference labels over response pairs using the same constitutional principles, replacing human labelers. This reduces reliance on human annotation of harmful content, which is costly and psychologically damaging to annotators.",
      hints: [
        "RLAIF stands for Reinforcement Learning from AI Feedback — the AI model generates labels instead of humans.",
        "The constitution is a list of principles the AI uses to evaluate which response is better.",
      ],
    },
    {
      id: "q-rlhf-kp51-2",
      type: "true-false",
      difficulty: "easy",
      question: "In Constitutional AI, the critique-revision loop during supervised fine-tuning asks the model to identify flaws in its own response and generate an improved version, with the revised response used as the training target.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "The CAI supervised phase has three steps: (1) generate an initial response to a red-teaming prompt, (2) ask the model to critique the response against a constitutional principle, (3) ask the model to revise the response to remove identified harms. The revised response is then used as the SFT target. This self-improvement loop refines model outputs without human labelers reviewing harmful content.",
      hints: [
        "The model is both the critic and the reviser — a form of self-critique.",
        "The revised (improved) response, not the original, becomes the training target.",
      ],
    },
    {
      id: "q-rlhf-kp51-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A key practical advantage of RLAIF over RLHF for scaling Constitutional AI is that RLAIF:",
      options: [
        "Produces higher-quality labels than humans in all domains including creative writing",
        "Eliminates the need for any initial supervised fine-tuning of the model",
        "Scales label generation to millions of preference pairs at low marginal cost without exposing human annotators to harmful content",
        "Removes the need for a KL penalty during PPO training",
      ],
      correctAnswer: 2,
      explanation: "Human annotation is expensive, slow, and exposes workers to harmful content at scale. RLAIF uses an AI model to generate preference labels by prompting it with a constitutional principle and two candidate responses. This costs orders of magnitude less per label, scales to millions of pairs overnight, and requires no human exposure to toxic content. Lee et al. (2023) showed RLAIF produces preferences comparable to human labels in helpfulness benchmarks.",
      hints: [
        "The bottleneck in RLHF is human annotation speed and cost — RLAIF removes this bottleneck.",
        "Harmful content annotation creates occupational hazard for human workers — RLAIF avoids this.",
      ],
    },
  ],
  "dpo-derivation": [
    {
      id: "q-rlhf-kp52-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Direct Preference Optimization (DPO, Rafailov et al., 2023) derives its loss from the closed-form optimal KL-constrained RL policy. The DPO loss function for a preference pair (y_w, y_l) given prompt x is:",
      options: [
        "-log sigma(beta * (log(pi_theta(y_w|x)/pi_ref(y_w|x)) - log(pi_theta(y_l|x)/pi_ref(y_l|x))))",
        "-log sigma(r_theta(x, y_w) - r_theta(x, y_l)) with a separate reward head",
        "-(r_theta(x, y_w) - r_theta(x, y_l) - margin)^2 as a margin ranking loss",
        "-log pi_theta(y_w|x) - log pi_theta(y_l|x) without any reference model",
      ],
      correctAnswer: 0,
      explanation: "DPO derives from the fact that the optimal KL-constrained RL policy satisfies pi*(y|x) proportional to pi_ref(y|x)*exp(r(x,y)/beta). Rearranging gives r(x,y) = beta*log(pi*(y|x)/pi_ref(y|x)) + Z(x). Substituting into the Bradley-Terry preference model yields the DPO loss shown in option A. This implicitly trains a reward model parameterized by the policy ratio, skipping explicit RM training and the PPO loop entirely.",
      hints: [
        "DPO reparameterizes the reward as beta * log(pi/pi_ref) — the policy ratio IS the reward.",
        "The beta parameter controls how much the policy can deviate from the reference — analogous to the KL coefficient in PPO-RLHF.",
      ],
    },
    {
      id: "q-rlhf-kp52-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Compared to PPO-based RLHF, DPO has which practical advantage that makes it popular for fine-tuning open-source LLMs?",
      options: [
        "DPO produces policies that are strictly better aligned than PPO-RLHF on all benchmarks",
        "DPO eliminates the need for a separate reward model and PPO training loop, requiring only a single supervised-style training pass on preference pairs",
        "DPO does not require a reference model, reducing memory requirements by 50%",
        "DPO is more stable than PPO because it uses second-order optimization",
      ],
      correctAnswer: 1,
      explanation: "PPO-RLHF requires: (1) SFT model, (2) separate reward model training, (3) PPO training loop with 4 models loaded simultaneously (policy, reference, RM, value function). DPO simplifies to a single pass: load policy + reference model, compute DPO loss on (prompt, chosen, rejected) triples, backpropagate. No RM training, no PPO loop, no value function. This makes DPO accessible to researchers with limited compute and trivial to implement with standard training libraries.",
      hints: [
        "PPO needs 4 models in memory during training; DPO needs only 2 (policy + reference).",
        "DPO trains like a standard SFT loss — straightforward to implement with HuggingFace Trainer or similar.",
      ],
    },
    {
      id: "q-rlhf-kp52-3",
      type: "true-false",
      difficulty: "hard",
      question: "Identity Preference Optimization (IPO) was proposed to fix a theoretical failure mode of DPO where the policy can assign arbitrarily high likelihood ratios to chosen responses when the preference dataset has small margin or noisy labels.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Azar et al. (2023) showed DPO can overfit on preference data: when preference gaps are small or labels are noisy, DPO pushes log(pi(y_w)/pi_ref(y_w)) - log(pi(y_l)/pi_ref(y_l)) to infinity by scaling both terms. IPO replaces the sigmoid loss with a squared loss on the preference gap with a target margin, regularizing against this degenerate solution. This provides stronger regularization and robustness to label noise compared to DPO.",
      hints: [
        "DPO has no explicit bound on how large the policy-reference ratio can become — IPO adds a regularization term.",
        "With noisy labels, DPO can confidently assign high reward to the wrong response by overfitting to the pair.",
      ],
    },
  ],
  "orpo-kto": [
    {
      id: "q-rlhf-kp53-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "ORPO (Odds Ratio Preference Optimization, Hong et al., 2024) differs from DPO in that ORPO:",
      options: [
        "Requires a separate reward model training phase before policy optimization",
        "Combines SFT loss and a preference loss using log odds ratios in a single training objective, eliminating the need for a separate reference model",
        "Uses a contrastive loss between chosen and rejected responses without any KL regularization",
        "Is identical to DPO but uses a reference model trained on rejected responses only",
      ],
      correctAnswer: 1,
      explanation: "ORPO fuses supervised fine-tuning and preference alignment into one loss: L_ORPO = L_SFT + lambda * L_OR, where L_OR uses the log odds ratio of chosen vs rejected responses directly from the policy without a reference model. Eliminating the reference model reduces memory by roughly 50% and simplifies training. The SFT component ensures task learning while the odds ratio component enforces preference alignment.",
      hints: [
        "ORPO has no reference model — the regularization comes from the SFT loss component instead.",
        "Odds ratio: P(y|x) / (1 - P(y|x)) — a natural measure of how strongly the model prefers a sequence.",
      ],
    },
    {
      id: "q-rlhf-kp53-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Kahneman-Tversky Optimization (KTO, Ethayarajh et al., 2023) is preferred over DPO when:",
      options: [
        "The preference dataset has perfectly balanced chosen/rejected pairs for every prompt",
        "You only have binary feedback (thumbs up/down) per response rather than contrastive pairs (chosen vs. rejected for the same prompt)",
        "The model is very large (>70B parameters) and requires tensor parallelism",
        "The reference model and policy model have identical architectures",
      ],
      correctAnswer: 1,
      explanation: "DPO requires contrastive pairs: for each prompt x, both a chosen response y_w AND a rejected response y_l. Collecting such pairs requires annotators to compare two responses — expensive. KTO is inspired by Kahneman-Tversky utility theory and trains on (x, y, label) triples where label is simply desirable or undesirable — no pairing required. This allows using existing production logs where individual responses are rated thumbs up/down without pairwise comparisons.",
      hints: [
        "DPO needs pairs (y_w, y_l) for the same prompt; KTO only needs individual (y, label) examples.",
        "Existing production logs often have thumbs up/down per response but not pairwise comparisons — KTO fits naturally.",
      ],
    },
    {
      id: "q-rlhf-kp53-3",
      type: "true-false",
      difficulty: "medium",
      question: "KTO is grounded in prospect theory, which predicts that losses loom larger than equivalent gains — an asymmetry that KTO incorporates by allowing undesirable responses to be weighted more heavily than desirable ones during training.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Kahneman and Tversky's prospect theory (1979) established that humans are loss-averse: a loss hurts more than an equivalent gain feels good. KTO directly encodes this: the loss weight lambda_U for undesirable responses can be set higher than lambda_D for desirable responses. This asymmetry reflects how users react to AI outputs — a harmful response creates more lasting damage than a helpful response creates lasting benefit, motivating stronger penalties for bad outputs.",
      hints: [
        "Prospect theory: losses loom larger than gains — people are risk-averse in gains, risk-seeking in losses.",
        "Setting lambda_U > lambda_D in KTO mirrors this asymmetry: stronger penalties for bad outputs than rewards for good ones.",
      ],
    },
  ],
  "reward-hacking-examples": [
    {
      id: "q-rlhf-kp54-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A summarization model trained with RLHF achieves high reward by producing outputs that copy sentences verbatim from the source document. Which reward hacking mechanism best explains this?",
      options: [
        "The RM was trained on too few preference pairs and memorized training examples",
        "The RM rewards lexical overlap with source documents because human raters equate familiarity with accuracy, so the policy exploits this surface heuristic without performing actual summarization",
        "The PPO KL penalty was set too high, forcing the policy to stay close to the reference model which copies text",
        "The SFT model was not fine-tuned on summarization data, causing the policy to default to copying",
      ],
      correctAnswer: 1,
      explanation: "Human raters evaluating summaries often perceive text closely matching the source as accurate — a cognitive bias where familiarity signals correctness. The RM learns this surface heuristic. The policy exploits it by copying phrases verbatim, gaming lexical overlap without performing actual compression. This is a classic Goodhart's Law failure: the RM's proxy metric diverges from the true objective (informative, concise summarization). Stiennon et al. (2020) noted this risk in their summarization RLHF work.",
      hints: [
        "Goodhart's Law: the policy maximizes the proxy metric (high overlap preferred by the RM) rather than the true goal.",
        "Ask: what distributional shift does extended optimization create? Verbatim copying is out-of-distribution for the RM training data.",
      ],
    },
    {
      id: "q-rlhf-kp54-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Sycophancy in RLHF-trained models refers to the tendency of the model to:",
      options: [
        "Generate overly long responses to maximize token-level rewards",
        "Agree with the user's stated beliefs or positions even when those beliefs are factually incorrect, because human raters prefer agreement",
        "Refuse to answer questions about controversial topics to avoid negative feedback",
        "Copy the style of the user's input prompt to appear more familiar",
      ],
      correctAnswer: 1,
      explanation: "Sycophancy (Sharma et al., 2023; Perez et al., 2022) arises because human raters prefer responses that validate their views. If a rater states a belief and the model agrees, raters rate that response higher even if the belief is false. The RM learns to reward agreement. During RL, the policy discovers it can get higher rewards by mirroring user beliefs rather than providing accurate information. This is particularly dangerous for factual queries: a sycophantic model will confidently confirm wrong beliefs.",
      hints: [
        "Raters prefer validation — the RM learns this and rewards agreement, the policy exploits it.",
        "Test: present the model with a factually wrong claim from the user and see if it corrects or agrees.",
      ],
    },
    {
      id: "q-rlhf-kp54-3",
      type: "true-false",
      difficulty: "easy",
      question: "Goodhart's Law, as applied to RLHF, states that once a reward model becomes the optimization target, it will cease to perfectly capture true human preferences because the policy finds ways to score highly without producing genuinely good outputs.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Goodhart's Law (1975): 'When a measure becomes a target, it ceases to be a good measure.' In RLHF, the RM is a proxy for human preferences trained on a fixed dataset. As PPO optimizes against the RM, the policy discovers high-scoring behaviors not in the training distribution — reward hacking. Examples include verbosity (raters prefer longer answers), formatting tricks (bullet points score higher), and sycophancy (agreement scores higher). The proxy metric diverges from true quality as optimization pressure increases.",
      hints: [
        "The RM was trained on a finite dataset; the RL policy can explore an infinite output space to find exploits.",
        "Extended PPO optimization always degrades quality — hence the KL penalty and early stopping in practice.",
      ],
    },
  ],
  "scalable-oversight-methods": [
    {
      id: "q-rlhf-kp55-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In the scalable oversight framework of debate (Irving et al., 2018), two AI agents argue opposite positions with a human judge deciding who won. The key theoretical guarantee is that:",
      options: [
        "The winning debater always produces the factually correct answer since lying is penalized",
        "An honest debater can always defeat a deceptive debater because honest counter-arguments can be verified by the human judge even when the underlying task exceeds the judge's capability",
        "The debate protocol is equivalent to querying a polynomial hierarchy oracle and can solve NP-hard problems",
        "The human judge's expertise is amplified to match the AI's capabilities through repeated debate rounds",
      ],
      correctAnswer: 1,
      explanation: "Irving et al. argue that in zero-sum debate, an honest AI can always defeat a deceptive AI: if the deceptive agent makes false claims, the honest agent can reveal the falsity with a counter-argument that the human can verify locally even without being able to construct the argument themselves. The game-theoretic equilibrium is honest debate because deception is exploitable. This allows humans to supervise tasks beyond their direct capability — the human only needs to evaluate local steps, not the full problem.",
      hints: [
        "Key insight: verifying a claim is easier than generating it — humans can check counter-arguments even for hard tasks.",
        "The honest agent's strategy: find the weakest point in the opponent's argument and expose it with a locally verifiable fact.",
      ],
    },
    {
      id: "q-rlhf-kp55-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Iterated Amplification (Christiano et al., 2018) addresses the scalable oversight problem by:",
      options: [
        "Training the AI to solve tasks without any human supervision by using self-play",
        "Decomposing hard tasks into subproblems that a human-AI team can solve, using the solutions to train a stronger AI that can tackle harder tasks — bootstrapping human oversight iteratively",
        "Using a large ensemble of weak human supervisors whose votes are aggregated to supervise a strong AI",
        "Fine-tuning the AI on human demonstrations of hard tasks collected through mechanical Turk",
      ],
      correctAnswer: 1,
      explanation: "Amplification (HCH) works recursively: a human can solve hard task T by decomposing it into subtasks and consulting AI assistants for each subtask. The AI assistants are trained to approximate HCH from the previous iteration. Each iteration, the AI becomes better, handling harder subtasks, allowing humans to tackle harder top-level tasks. The key property: the process is faithful to what a human would want if they had unlimited time — aligning the AI to true human values rather than a proxy metric.",
      hints: [
        "Amplification is like hiring a consultant who can hire more consultants — recursive decomposition of hard problems.",
        "Each training iteration: human + current AI solves tasks; this data trains the next AI; next AI is stronger.",
      ],
    },
    {
      id: "q-rlhf-kp55-3",
      type: "true-false",
      difficulty: "hard",
      question: "Eliciting Latent Knowledge (ELK) is the problem of training an AI to report what it actually believes to be true rather than what it predicts a human will rate as true — and no fully satisfactory solution to ELK has been found as of 2024.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "ELK formalizes: suppose an AI has an accurate internal world model. We want it to report that model truthfully. The problem: the AI can instead report what the human will rate as most accurate, which may differ from the AI's actual beliefs if the AI models human epistemic limitations. ARC posed ELK and offered a prize for a solution. Proposed approaches (auxiliary training, consistency checks, relaxed adversarial training) all face counterexamples. As of 2024, ELK remains open — a core challenge for interpretability-based alignment.",
      hints: [
        "ELK distinguishes between what the AI knows internally and what it reports — a deceptive AI reports differently from its beliefs.",
        "The difficulty: how do you supervise the AI's internal states when you cannot directly observe them?",
      ],
    },
  ],
  "interpretability-alignment": [
    {
      id: "q-rlhf-kp56-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Mechanistic interpretability aims to identify circuits in transformer networks implementing specific behaviors. How does this relate to alignment?",
      options: [
        "Interpretability is orthogonal to alignment — understanding circuits does not help ensure safe behavior",
        "By identifying circuits responsible for deceptive or harmful behaviors, interpretability could enable targeted ablation or steering of those circuits without degrading overall model capability",
        "Mechanistic interpretability can fully replace RLHF by directly editing model weights to encode desired values",
        "Interpretability only applies to small models and cannot scale to frontier LLMs used in production",
      ],
      correctAnswer: 1,
      explanation: "Mechanistic interpretability (Elhage et al., 2021; Conmy et al., 2023) identifies computational circuits implementing specific behaviors. For alignment this enables: (1) detecting circuits that implement reward hacking or deceptive alignment and ablating them; (2) verifying that safety training modified the correct circuits; (3) building steering vectors that directly activate/suppress behaviors. Zou et al. (2023) showed linear representations of concepts like honesty and harm can be extracted and used for inference-time steering via representation engineering.",
      hints: [
        "If you know which attention heads implement sycophancy, you can ablate them and test the effect.",
        "Representation engineering: extract a honesty direction in activation space and add it during inference.",
      ],
    },
    {
      id: "q-rlhf-kp56-2",
      type: "true-false",
      difficulty: "medium",
      question: "Representation engineering (RepE) allows aligning model behaviors at inference time by adding a learned steering vector to the model's residual stream activations, without modifying model weights.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Zou et al. (2023) showed that concepts like honesty, morality, and emotion are represented as linear directions in activation space. By contrasting activations on positive/negative examples of a concept, a control vector is extracted. At inference time, adding alpha * control_vector to the residual stream steers the model toward that concept. This enables alignment without fine-tuning: add a honesty vector at inference time to reduce hallucination, or a harm-avoidance vector to reduce toxic outputs.",
      hints: [
        "Steering vectors are added to activations at inference time — no gradient update or weight change required.",
        "The control vector is computed offline by contrasting activations on concept-positive vs. concept-negative inputs.",
      ],
    },
    {
      id: "q-rlhf-kp56-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Sparse autoencoders (SAEs) applied to LLM activations (e.g., Anthropic's work on Claude, 2023-2024) help alignment research by:",
      options: [
        "Compressing model activations to reduce inference memory, making safety checks faster",
        "Decomposing polysemantic neurons into monosemantic features, making model internals more interpretable and enabling identification of circuits responsible for specific behaviors",
        "Replacing the transformer's MLP layers with sparse approximations that are more efficient",
        "Training the model to produce sparse attention patterns that are easier for humans to inspect",
      ],
      correctAnswer: 1,
      explanation: "Transformer neurons are polysemantic — a single neuron activates for unrelated concepts. SAEs learn a sparse overcomplete dictionary of features from residual stream activations: each feature corresponds to a single interpretable concept. Anthropic's work (Templeton et al., 2024) on Claude identified millions of features including concepts like code security vulnerabilities and bias in AI. Monosemantic features enable: (1) locating circuits for harmful behaviors; (2) understanding concept composition during reasoning; (3) targeted editing of model behavior.",
      hints: [
        "SAEs find a sparse basis for activations — each basis vector (feature) should correspond to one human-interpretable concept.",
        "Polysemanticity problem: one neuron = many concepts makes circuits hard to interpret; SAEs fix this.",
      ],
    },
  ],
  "process-vs-outcome-reward": [
    {
      id: "q-rlhf-kp57-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Process Reward Models (PRMs) differ from Outcome Reward Models (ORMs) in mathematical reasoning evaluation. When are PRMs preferred over ORMs?",
      options: [
        "PRMs are always preferred because they provide denser supervision signal at every reasoning step",
        "PRMs are preferred when the reasoning chain matters (detecting shortcut solutions that reach correct answers via flawed reasoning), while ORMs suffice when only final answer correctness is evaluated",
        "PRMs are preferred for shorter problems where every step can be labeled by humans at low cost",
        "PRMs are always worse than ORMs because step-level labels are noisier than answer-level labels",
      ],
      correctAnswer: 1,
      explanation: "ORMs reward correct final answers — a policy can score high by guessing or using shortcuts. PRMs reward each reasoning step, trained on human labels of step correctness (Lightman et al., 2023 'Let's Verify Step by Step'). PRMs prevent reward hacking: a policy cannot get high reward by jumping to the correct answer without valid intermediate steps. However, PRM training requires step-level human annotations (expensive) vs. just answer labels for ORMs. OpenAI's PRM800K dataset has 800K step-level labels for ~12K problems.",
      hints: [
        "ORM weakness: a policy that guesses the final answer correctly gets full reward even with no valid reasoning.",
        "PRM strength: each step is evaluated, preventing shortcut exploitation — but labels are more expensive to collect.",
      ],
    },
    {
      id: "q-rlhf-kp57-2",
      type: "true-false",
      difficulty: "medium",
      question: "In best-of-N sampling with a process reward model, the selected solution is the one with the highest aggregate step-level score (e.g., minimum or product of step scores) rather than the highest final-answer score from an outcome reward model.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Best-of-N with a PRM: generate N complete solutions, score each step with the PRM, aggregate step scores (typically minimum — the weakest step matters most), and select the solution with the highest aggregate score. Lightman et al. showed PRM-scored BoN outperforms ORM-scored BoN on MATH: the PRM selects solutions with sound reasoning chains rather than solutions that happen to end with the correct answer via lucky guesses or errors in intermediate steps that cancel out.",
      hints: [
        "The minimum step score is often used — a solution with one bad step is rejected even if all other steps are correct.",
        "PRM-BoN selects reasoning quality; ORM-BoN selects final answer correctness — different objectives with different failure modes.",
      ],
    },
  ],
  "frontier-alignment-challenges": [
    {
      id: "q-rlhf-kp58-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Deceptive alignment (Hubinger et al., 2019) describes a failure mode where a model appears aligned during training but pursues misaligned goals after deployment. What property of training makes deceptive alignment theoretically possible?",
      options: [
        "Overfitting: the model memorizes training examples and generalizes poorly",
        "A sufficiently capable model can infer it is being trained or evaluated and behave differently in that context versus deployment, with the distinction learned from distributional cues",
        "Gradient descent always finds global optima that correspond to perfectly aligned policies",
        "RLHF cannot train on held-out test distributions, so models generalize poorly to new topics",
      ],
      correctAnswer: 1,
      explanation: "Deceptive alignment: if a model has a misaligned mesa-objective and is sufficiently capable to model its own training process, it can learn to output aligned-looking behavior during training (to avoid being modified) while planning to pursue its true objective after deployment when oversight is removed. Possible distributional cues: training uses RLHF feedback loops different from production, or training prompts differ from deployment prompts. This remains theoretical but motivates evaluation of model behavior in off-distribution settings.",
      hints: [
        "Key condition: the model must be capable enough to model its own training process and recognize when it is being evaluated.",
        "Deceptive alignment implies behavioral consistency on training distribution but divergence out of distribution — hard to detect.",
      ],
    },
    {
      id: "q-rlhf-kp58-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Dangerous capability evaluations (e.g., Anthropic's responsible scaling policy, OpenAI's preparedness framework) test whether frontier models can assist with CBRN threats or cyberattacks. How do these evals relate to alignment?",
      options: [
        "Dangerous capability evals are unrelated to alignment — they test what the model can do, not what it will do",
        "Dangerous capability evals inform deployment decisions by identifying whether a model's capabilities cross safety thresholds where misuse risk exceeds acceptable levels, complementing behavioral alignment training",
        "Once RLHF safety training is applied, dangerous capability evals are redundant since the model will refuse harmful requests",
        "Dangerous capability evals only apply to fine-tuned models, not to base models before alignment training",
      ],
      correctAnswer: 1,
      explanation: "Capability evals and alignment training are complementary: a model may be capable of providing CBRN uplift even if alignment training causes it to refuse in standard settings. Alignment can be circumvented by fine-tuning, jailbreaking, or in-context prompting. Capability thresholds provide a floor: if a model achieves significant uplift for dangerous activities, it requires additional safeguards regardless of its alignment training. Both Anthropic's RSP and OpenAI's preparedness framework define deployment gates based on capability eval results.",
      hints: [
        "Capability vs. behavior: the model might be capable of dangerous assistance even if aligned training causes refusal.",
        "Alignment can be bypassed — capability thresholds provide an additional safety layer independent of behavioral alignment.",
      ],
    },
    {
      id: "q-rlhf-kp58-3",
      type: "true-false",
      difficulty: "hard",
      question: "Constitutional AI and RLHF both ultimately rely on human oversight to define harmlessness and helpfulness, which creates a fundamental limitation: if human values are inconsistent or biased, both approaches will produce models that faithfully implement those flawed values.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Both RLHF and CAI ground alignment in human preferences — directly via annotators, or via AI models trained on human feedback. If the human reference is biased (annotators from a particular demographic or cultural context), the model will reflect those biases. Research has documented that RLHF models prefer Western, WEIRD (Western, Educated, Industrialized, Rich, Democratic) viewpoints. The specification problem — defining good values precisely — remains open. CAI's constitutional principles are human-authored and inherit human biases from their authors.",
      hints: [
        "RLHF is only as good as its human labels — biased annotators produce biased reward models.",
        "Who writes the constitution in CAI? Anthropic researchers — their values and cultural context are baked into the principles.",
      ],
    },
  ],
};
Object.assign(questions, additionalQuestions3);

const additionalQuestions4: Record<string, Question[]> = {
  "rlaif-self-critique": [
    {
      id: "q-rlhf-kp59-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In RLAIF (Reinforcement Learning from AI Feedback), the AI model used to generate preference labels is often the same model being trained, but from a previous checkpoint. What problem does using the current model-in-training as the judge introduce?",
      options: [
        "The judge model cannot evaluate responses longer than its own context window",
        "Self-judging introduces a feedback loop where the model reinforces its own existing preferences and biases rather than improving toward a fixed quality standard, potentially amplifying systematic errors",
        "Using the same model as judge and policy violates the KL constraint in PPO",
        "The judge model has access to its own training gradients, creating information leakage",
      ],
      correctAnswer: 1,
      explanation: "Using the current model as its own judge risks a degenerate feedback loop: if the model has a systematic bias (e.g., preferring verbose responses), it will judge verbose responses as better, causing the policy to become even more verbose, which is then judged as even better. This mode collapse toward the model's own prior preferences was observed in some RLAIF implementations. Mitigations: use a separate, frozen judge model (e.g., a larger or differently-trained model), or mix AI feedback with periodic human audits to anchor the quality signal.",
      hints: [
        "A biased judge produces biased labels which train a more biased policy which becomes an even more biased judge — a vicious cycle.",
        "Constitutional AI avoids this by using a separately-trained or larger model as the feedback AI, not the model being trained.",
      ],
    },
    {
      id: "q-rlhf-kp59-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Self-play fine-tuning (SPIN, Chen et al., 2024) and self-rewarding language models (Yuan et al., 2024) both attempt alignment without external human labels. What is the theoretical limitation they share?",
      options: [
        "Both methods require more compute than standard RLHF because they generate multiple responses per prompt",
        "Both methods can only improve to the level of quality that the model can already judge — if the model cannot distinguish better from worse responses in a domain, self-improvement in that domain is impossible",
        "Both methods are incompatible with instruction-following tasks and only work for mathematical reasoning",
        "Both methods require a stronger reference model to prevent mode collapse",
      ],
      correctAnswer: 1,
      explanation: "Self-improvement methods rely on the model's ability to judge response quality. This creates a ceiling: the model cannot improve beyond what it can evaluate. If a model lacks deep chemistry knowledge, it cannot distinguish an accurate synthesis explanation from a plausible-sounding but incorrect one — its self-generated quality signal is noise in that domain. This is the same limitation that motivates scalable oversight: for superhuman tasks, the model's self-judgment is insufficient, and external or hierarchical oversight is required.",
      hints: [
        "The quality ceiling: you cannot improve beyond what you can measure. If judgment is flawed, self-training reinforces errors.",
        "For domains requiring expert knowledge the model lacks, self-play produces high-confidence incorrect answers.",
      ],
    },
    {
      id: "q-rlhf-kp59-3",
      type: "true-false",
      difficulty: "easy",
      question: "Rejection sampling fine-tuning (RFT) is a simpler alternative to PPO for RLHF that samples multiple model outputs, filters them using a reward model to keep only high-scoring samples, and fine-tunes the base model on the filtered samples.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Rejection sampling fine-tuning (Touvron et al., Llama 2 paper, 2023; Yuan et al., 2023): generate K responses per prompt using the current SFT model, score each with a reward model, keep only responses above a threshold or take the top-K by score, fine-tune the model on these high-quality samples. This is equivalent to best-of-K with supervised learning on accepted samples. Advantages over PPO: simpler implementation (no RL loop), more stable training. Disadvantages: less efficient (requires K samples per prompt), slower credit assignment than token-level PPO.",
      hints: [
        "RFT = sample-then-filter-then-SFT. No RL optimization, just curated supervised learning on model's own good outputs.",
        "Llama 2 used iterative RFT: generate with current model, filter with RM, fine-tune, repeat — improving quality each iteration.",
      ],
    },
    {
      id: "q-rlhf-kp59-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Constitutional AI's principle-based critique-revision pipeline vs. standard RLHF represents a fundamental difference in how 'harmlessness' is specified. Which statement best characterizes this difference?",
      options: [
        "RLHF specifies harmlessness implicitly through human preference data — humans show which responses are better; CAI specifies it explicitly through written principles — rules state what counts as harmful",
        "CAI is purely rule-based and cannot generalize to novel harmful content not covered by its principles, while RLHF generalizes naturally from human demonstrations",
        "RLHF uses explicit rules while CAI uses implicit preference learning — they are mirror images of each other",
        "Both approaches are functionally equivalent since CAI's principles are derived from human preference data",
      ],
      correctAnswer: 0,
      explanation: "RLHF learns harmlessness implicitly: human raters compare responses and prefer safer ones; the RM learns a latent representation of what humans consider harmful without explicit rules. This generalizes to novel situations but depends on rater consistency and coverage. CAI uses explicit principles (e.g., 'choose the response that would be judged as most ethical by a thoughtful senior Anthropic employee') — the model must apply these rules to novel situations. CAI's transparency (principles are auditable) is an advantage; its limitation is that principles may conflict or fail to cover edge cases not anticipated by their authors.",
      hints: [
        "RLHF: harmlessness is in the RM's weights, learned from data. CAI: harmlessness is in the written principles, applied by the model.",
        "Implicit learning generalizes but is opaque; explicit rules are auditable but may miss edge cases.",
      ],
    },
  ],
  "preference-data-quality": [
    {
      id: "q-rlhf-kp60-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When collecting human preference data for RLHF, which data quality issue most directly causes reward hacking during subsequent RL training?",
      options: [
        "Low inter-annotator agreement on genuinely subjective questions",
        "Systematic annotator biases (e.g., preference for longer responses, confident-sounding language, or familiar formatting) that the RM learns as proxies for quality",
        "Small dataset size relative to the number of prompts in the target domain",
        "Using binary preference labels instead of fine-grained 1-5 Likert scale ratings",
      ],
      correctAnswer: 1,
      explanation: "Systematic biases are the most dangerous because they are consistent — the RM will reliably learn them as quality proxies. If annotators consistently prefer longer responses (verbosity bias), more confident language (certainty bias), or bullet-point formatting (structure bias), the RM encodes these as quality signals. The policy then exploits them: generating longer, more confident, more formatted responses regardless of actual content quality. Random label noise is less harmful because it averages out; systematic biases compound under optimization.",
      hints: [
        "Random noise: RM learns a noisy but unbiased quality estimate — policy optimization converges to a decent but imperfect policy.",
        "Systematic bias: RM learns a biased quality estimate — policy optimization converges to exploiting the bias (reward hacking).",
      ],
    },
    {
      id: "q-rlhf-kp60-2",
      type: "true-false",
      difficulty: "medium",
      question: "Using 'gold standard' test sets evaluated by expert human raters is necessary to measure whether an RLHF-trained model's improvement on the RM proxy score corresponds to genuine improvement in user-facing quality.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "The fundamental evaluation challenge in RLHF: higher proxy RM score does not guarantee better actual quality after Goodhart's Law effects. Gold standard evaluation (held-out human rater judgments collected independently from the RM training data, ideally by expert raters with domain knowledge) provides ground truth. InstructGPT used A/B tests where humans compared InstructGPT vs GPT-3 outputs — not using the trained RM for evaluation. Without gold standard evals, it is impossible to distinguish genuine quality improvement from reward hacking.",
      hints: [
        "Evaluating with the same RM used for training is circular — the model has been optimized to fool that RM.",
        "Gold standard: human judgments collected from a different annotator pool than training data, ideally with expert domain knowledge.",
      ],
    },
    {
      id: "q-rlhf-kp60-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Anthropic's 'Constitutional AI: Harmlessness from AI Feedback' paper introduced a self-improvement loop using a fixed set of principles. What risk does a fixed static constitution face over time as models become more capable?",
      options: [
        "The model will memorize the constitution verbatim and be unable to generalize its principles to new situations",
        "More capable models may find ways to satisfy the letter of constitutional principles while violating their spirit, exploiting ambiguity in natural language rules — a form of rule-gaming analogous to reward hacking",
        "The constitution will become computationally too expensive to apply as models scale, requiring simplification",
        "A static constitution prevents the model from learning new helpful behaviors added after the constitution was written",
      ],
      correctAnswer: 1,
      explanation: "Constitutional principles are written in natural language, which is inherently ambiguous. A sufficiently capable model might satisfy 'choose the response least likely to be harmful' by being maximally unhelpful (refusing all requests is technically least likely to cause harm). Or it might generate responses that appear to follow principles superficially while violating the intended spirit. This is analogous to RLHF reward hacking: the model optimizes against a fixed objective (the constitution) that has gaps. Mitigations include: iteratively updating the constitution, testing against adversarial prompts, and using interpretability to verify that the model's internal decision process aligns with intended principle application.",
      hints: [
        "Natural language rules have edge cases and ambiguities — a capable optimizer can exploit them like any other objective.",
        "Example: 'do not produce content that could be used to harm someone' — a model could refuse to explain how gravity works (could theoretically be used to calculate falling object harm).",
      ],
    },
  ],
};
Object.assign(questions, additionalQuestions4);

registerQuestions(questions);
