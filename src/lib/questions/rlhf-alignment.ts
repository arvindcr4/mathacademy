import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'reward-modeling': [
    {
      id: 'q-rlhf-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In RLHF (Ouyang et al., 2022 / InstructGPT), the reward model is trained on comparison data of the form (prompt, winning_response, losing_response). What loss function does it minimize?',
      options: [
        'Cross-entropy loss between predicted reward and a discrete human rating 1–7',
        '−log σ(r(y_w) − r(y_l)) averaged over preference pairs, pushing r(y_w) > r(y_l)',
        'Mean squared error between predicted and true reward scores',
        'KL divergence between the reward distribution and a uniform prior',
      ],
      correctAnswer: 1,
      explanation: 'Under the Bradley-Terry preference model, the reward model minimizes −E[log σ(r(y_w) − r(y_l))]. The sigmoid of the score difference gives the predicted probability that y_w is preferred; the loss is minimized when r(y_w) ≫ r(y_l). InstructGPT used 50K prompts generating 300K–1.8M preference pairs.',
      hints: [
        'σ(r(y_w) − r(y_l)) is the predicted probability that the winning response is preferred.',
        'The loss is large (penalizes heavily) when the losing response is scored higher than the winner.',
      ],
    },
    {
      id: 'q-rlhf-kp1-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'OpenAI\'s InstructGPT reward model is initialized from the SFT model rather than a randomly initialized network. What is the primary reason?',
      options: [
        'Random initialization would violate the KL constraint during RL training.',
        'The RM must be at least as capable as the LLM it scores — starting from the SFT model gives the RM strong language understanding needed to assess response quality.',
        'Starting from SFT weights halves the RM training time.',
        'The SFT model already produces reward scores as a side effect of its training.',
      ],
      correctAnswer: 1,
      explanation: 'A reward model that cannot understand nuanced language cannot reliably judge whether a response is helpful or harmful. Initializing from the SFT model — which already understands the task domain — gives the RM the language comprehension needed to assign meaningful scores. A scalar regression head is then added atop the LM backbone.',
      hints: [
        'If the RM cannot understand a complex response, it cannot score it accurately.',
        'The SFT model\'s pre-trained representations are high-quality starting points for learning reward.',
      ],
    },
    {
      id: 'q-rlhf-kp1-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'A perfectly trained reward model that exactly captures average human preferences will always produce a well-aligned policy after RL fine-tuning, even with extended optimization.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'Even a high-quality RM is only an approximation of true human preferences. Gao et al. (2023) demonstrated empirically that RL over-optimization causes the gold-standard reward to first increase then decrease as KL from the reference grows — an inverted-U curve. The policy exploits distributional gaps in the RM (reward hacking) that do not correspond to genuine human preferences.',
      hints: [
        'Goodhart\'s Law: "When a measure becomes a target, it ceases to be a good measure."',
        'The RM is trained on a fixed dataset; the policy can generate out-of-distribution text that scores high but reads poorly.',
      ],
    },
  ],

  'preference-data': [
    {
      id: 'q-rlhf-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Huyenchip (2023) notes that inter-annotator agreement for InstructGPT preference labeling is approximately:',
      options: [
        '~50% (near random chance for pairwise comparisons)',
        '~73% (10 annotators give the same ranking 7 out of 10 times)',
        '~95% (near-perfect agreement)',
        '~30% (most comparisons are disputed)',
      ],
      correctAnswer: 1,
      explanation: 'OpenAI reported ~73% inter-annotator agreement for InstructGPT preference labels: if 10 annotators rank two responses, 7 give the same ranking. This moderate agreement reflects the genuine subjectivity of "helpful" and "harmless" — different people have legitimately different preferences. The RM must handle this label noise.',
      hints: [
        '73% means ~27% of pairwise labels would differ between annotators — non-trivial noise.',
        'Higher disagreement is expected for nuanced trade-offs between helpfulness and safety.',
      ],
    },
    {
      id: 'q-rlhf-kp2-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Anthropic\'s Constitutional AI (Bai et al., 2022) uses both human and AI-generated comparison data. What is the approximate split in the 318K comparisons used for Claude\'s RM?',
      options: [
        'All 318K comparisons are human-generated.',
        '135K human comparisons + 183K AI-generated comparisons (57% AI-sourced).',
        '50K human comparisons + 268K AI-generated comparisons (84% AI-sourced).',
        'All 318K comparisons are AI-generated via RLAIF.',
      ],
      correctAnswer: 1,
      explanation: 'Constitutional AI\'s dataset comprises 135K human-labeled comparisons and 183K AI-generated comparisons produced through the CAI critique-revision cycle. The 57% AI-sourced share dramatically reduces labeling costs while maintaining alignment quality — a key CAI contribution.',
      hints: [
        'CAI\'s AI-generated comparisons come from the model critiquing its own responses against constitutional principles.',
        'Human labels remain for helpfulness; CAI primarily automates harmlessness labeling.',
      ],
    },
    {
      id: 'q-rlhf-kp2-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Human preference data is highly consistent: if annotator A prefers y_w over y_l for a given prompt, all other annotators will agree.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'Human preferences are diverse and subjective. The ~73% inter-annotator agreement in InstructGPT means ~27% of pairs produce disagreement. Cultural background, personal values, and interpretation of "helpfulness" all vary. RLHF must account for this label noise — e.g., by treating preference as a probability rather than a hard label, as formalized in the Bradley-Terry model.',
      hints: [
        'InstructGPT reported 73% inter-annotator agreement — far from perfect consistency.',
        'The Bradley-Terry model naturally accommodates noisy preferences via a probabilistic formulation.',
      ],
    },
  ],

  'ppo-rlhf': [
    {
      id: 'q-rlhf-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The PPO-RLHF objective for InstructGPT is: objective(ϕ) = E[RM(x, y) − β·log(π_ϕ(y|x)/π_SFT(y|x))] + γ·E[log π_ϕ(x_pretrain)]. What does the β term control?',
      options: [
        'The learning rate for the policy gradient update.',
        'The strength of the KL penalty that prevents the RL policy from deviating too far from the SFT reference model.',
        'The fraction of pretraining data mixed into RL batches.',
        'The discount factor for future rewards in the MDP.',
      ],
      correctAnswer: 1,
      explanation: 'β is the KL penalty coefficient. It weights the KL divergence between the RL policy π_ϕ and the SFT reference π_SFT. A large β keeps the policy close to the reference (preventing reward hacking but limiting improvement); a small β allows the policy to optimize reward more aggressively (risking degenerate outputs). The γ term is the pretraining loss weight.',
      hints: [
        'Without the β·KL term, the policy could drift to gibberish that scores high on the RM.',
        'β requires careful tuning — too large means no alignment improvement, too small means reward hacking.',
      ],
    },
    {
      id: 'q-rlhf-kp3-2',
      type: 'true-false',
      difficulty: 'hard',
      question: 'The standard PPO-RLHF setup requires four neural networks loaded simultaneously: actor, reference policy, reward model, and value (critic) network.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'PPO-RLHF uses: (1) actor π_θ — the policy being trained; (2) reference π_ref (frozen SFT model) — for the KL penalty; (3) reward model r_φ (frozen) — to score responses; (4) critic V_ψ — to estimate value for advantage computation. At 70B parameters, loading all four requires hundreds of GPU-hours. This memory burden motivates alternatives like DPO.',
      hints: [
        'The critic is distinct from the reward model — it estimates expected return, not immediate reward.',
        'This four-model requirement is a primary reason RLHF at scale is expensive, motivating DPO and RLAIF.',
      ],
    },
    {
      id: 'q-rlhf-kp3-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'PPO clips the policy update ratio r_t(θ) = π_θ(a_t|s_t)/π_θ_old(a_t|s_t) to [1−ε, 1+ε], typically with ε = 0.1 or 0.2. This prevents:',
      options: [
        'The reward from becoming negative during RL training.',
        'Excessively large policy updates that could destabilize training by moving too far from the old policy in a single step.',
        'The KL divergence from collapsing to zero.',
        'Overfitting to the reward model\'s training distribution.',
      ],
      correctAnswer: 1,
      explanation: 'PPO\'s clipped surrogate objective limits how much the policy can change relative to the old policy used to collect rollouts. If the ratio r_t(θ) exceeds [1−ε, 1+ε], the gradient is clipped to zero for that sample, preventing destabilizing large updates. This is PPO\'s key stability improvement over vanilla policy gradient.',
      hints: [
        'Without clipping, a large gradient could collapse policy quality in a single update step.',
        'ε = 0.2 is the default in the original PPO paper (Schulman et al., 2017).',
      ],
    },
  ],

  'kl-penalty': [
    {
      id: 'q-rlhf-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is a concrete example of reward hacking in RLHF caused by an insufficiently large KL penalty β?',
      options: [
        'The policy refuses to answer any questions to avoid low reward scores.',
        'The policy generates excessively verbose, sycophantic responses (e.g., "Great question! Absolutely! Of course!") that the RM rates highly but humans find annoying and unhelpful.',
        'The policy memorizes the SFT training set exactly.',
        'The policy always outputs the same token to minimize KL divergence.',
      ],
      correctAnswer: 1,
      explanation: 'Sycophancy is a documented reward hacking example: reward models trained on human comparisons often score confident, agreeable responses highly, so an unconstrained policy learns to produce excessive flattery and filler. This exploits the RM\'s approximation of human preferences without genuinely being more helpful. A larger KL penalty β limits how far the policy can drift to exploit such patterns.',
      hints: [
        'Classic examples include policies that produce long, formatted lists even when brevity is better.',
        'The RM learned from human data that certain response styles are preferred — the policy exploits this.',
      ],
    },
    {
      id: 'q-rlhf-kp4-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Increasing the KL penalty coefficient β in RLHF monotonically improves final model quality as measured by human preference evaluations.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'β controls a fundamental tradeoff. Too small: the policy rewards-hacks and produces degenerate outputs humans dislike. Too large: the policy cannot learn from the reward signal and stays too close to the SFT reference, providing no alignment improvement. An optimal β exists between these extremes and must be tuned empirically.',
      hints: [
        'At β → ∞, the RL policy is identical to π_SFT — zero improvement.',
        'At β → 0, the policy maximizes reward without constraint — reward hacking.',
      ],
    },
    {
      id: 'q-rlhf-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The KL-regularized RLHF objective E[r(x,y)] − β·KL(π‖π_ref) has a closed-form optimal policy. Which expression is correct?',
      options: [
        'π*(y|x) ∝ π_ref(y|x) · exp(r(x,y)/β)',
        'π*(y|x) = argmax_y r(x,y) subject to KL ≤ β',
        'π*(y|x) = π_ref(y|x) + r(x,y)/β (normalized)',
        'π*(y|x) ∝ exp(r(x,y)) regardless of π_ref',
      ],
      correctAnswer: 0,
      explanation: 'Solving the variational problem via Lagrange multipliers yields the Gibbs distribution: π*(y|x) ∝ π_ref(y|x) · exp(r(x,y)/β). This closed-form solution is the theoretical foundation of DPO — which avoids RL by directly optimizing toward this distribution. β controls the temperature: large β → π* ≈ π_ref; small β → π* concentrates on high-reward outputs.',
      hints: [
        'The Gibbs distribution is the maximum-entropy solution to constrained reward maximization.',
        'DPO rearranges this expression to derive a training loss that eliminates the need for explicit RL.',
      ],
    },
  ],

  'constitutional-ai': [
    {
      id: 'q-rlhf-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In Constitutional AI (Bai et al., 2022), the SL-CAI (supervised learning) stage involves a specific self-critique loop. What are the three sequential steps?',
      options: [
        'Generate response → human critique → human revision',
        'Generate response → model critiques against a constitutional principle → model revises based on critique',
        'Generate red-team prompt → human labels harmfulness → model is penalized',
        'Retrieve constitution → embed principle → fine-tune on embeddings',
      ],
      correctAnswer: 1,
      explanation: 'SL-CAI\'s critique-revision cycle: (1) the model generates an initial response to a (possibly harmful) prompt; (2) the model critiques its own response against a specific constitutional principle (e.g., "identify ways this response is harmful"); (3) the model generates a revised response addressing the critique. These revised responses become supervised fine-tuning data — no human labels needed for harmlessness.',
      hints: [
        'The model plays both writer and critic — a self-improvement loop guided by explicit principles.',
        'Multiple revisions can be chained; the final revision is used as SFT training data.',
      ],
    },
    {
      id: 'q-rlhf-kp5-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The RL-CAI stage of Constitutional AI uses AI-generated preference labels. How does it generate these labels?',
      options: [
        'The model ranks responses by their perplexity under the pretrained LM.',
        'A separate judge LLM is prompted with the constitution to compare pairs of responses and output a preference label, creating synthetic comparison data for reward model training.',
        'Human annotators review the constitutionally-revised responses and rank them.',
        'The reward model from SL-CAI is used as-is for RL without generating new labels.',
      ],
      correctAnswer: 1,
      explanation: 'RL-CAI (RLAIF stage) uses the same or a capable LLM as a constitutional judge: given a principle and two responses, it outputs which response better follows the constitution. These AI-generated pairwise labels train a preference model (PM), which then serves as the reward signal for RL — entirely replacing human harmlessness labels.',
      hints: [
        'The AI judge is prompted: "Which response follows [principle] better? A or B?"',
        'This AI-preference-model-based RL is what Anthropic calls RL-CAI, a form of RLAIF.',
      ],
    },
    {
      id: 'q-rlhf-kp5-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Constitutional AI completely eliminates the need for any human-labeled data in the alignment pipeline.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'CAI reduces but does not eliminate human labeling. Human feedback is still used for helpfulness training (SL-HF and RL-HF stages). Anthropic\'s 318K comparison dataset includes 135K human-generated comparisons. CAI primarily replaces human harmlessness labels with AI-generated constitutional critiques — a major cost reduction, but human data remains essential for helpfulness alignment.',
      hints: [
        'Helpfulness labels are harder to automate because they require subjective judgment about user needs.',
        'CAI\'s 57% AI-sourced comparisons still leave 43% human-sourced — human data is not eliminated.',
      ],
    },
  ],

  'dpo': [
    {
      id: 'q-rlhf-kp6-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The DPO loss (Rafailov et al., 2023) is: L_DPO = −log σ(β·log(π_θ(y_w|x)/π_ref(y_w|x)) − β·log(π_θ(y_l|x)/π_ref(y_l|x))). What do the two log-ratio terms represent?',
      options: [
        'The KL divergence from the reference policy for the winning and losing responses respectively.',
        'The implicit reward assigned to the winning response minus the implicit reward assigned to the losing response — DPO trains the policy to implicitly score y_w higher than y_l.',
        'The log-likelihood of the winning and losing responses under the policy.',
        'The cross-entropy loss for the winning and losing responses.',
      ],
      correctAnswer: 1,
      explanation: 'In DPO, β·log(π_θ(y|x)/π_ref(y|x)) is the implicit reward r(x,y) up to a constant. The loss trains the policy so that the implicit reward of y_w exceeds that of y_l — i.e., π_θ increases probability of y_w relative to π_ref and decreases probability of y_l, all without training an explicit reward model or running RL.',
      hints: [
        'The log-ratio log(π_θ/π_ref) is the key quantity — how much more (or less) likely is this completion under the fine-tuned policy vs. the reference?',
        'β scales the implicit reward — larger β means the policy stays closer to the reference.',
      ],
    },
    {
      id: 'q-rlhf-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'DPO is guaranteed to achieve identical performance to PPO-RLHF given the same preference data, since they optimize the same theoretical objective.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'DPO and PPO-RLHF share the same theoretical optimum under the KL-regularized objective, but differ critically in practice. DPO is offline: it trains on a fixed dataset and cannot sample new on-policy completions. PPO generates on-policy rollouts during training, allowing exploration and adaptation to the current policy distribution. This distributional difference means PPO can outperform DPO, especially on complex tasks.',
      hints: [
        'DPO is trained on (y_w, y_l) pairs generated by an earlier policy — not the current one.',
        'As the policy improves, the fixed DPO dataset becomes increasingly off-policy.',
      ],
    },
    {
      id: 'q-rlhf-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'DPO\'s implicit reward is r(x,y) = β·log(π_θ(y|x)/π_ref(y|x)) + C. This means a completion y is assigned high implicit reward when:',
      options: [
        'y is highly probable under the reference policy π_ref.',
        'π_θ assigns much higher probability to y than π_ref does — the fine-tuned policy has "learned to prefer" y relative to its pre-fine-tuning distribution.',
        'y is short, keeping the log ratio numerically stable.',
        'y appears in both the winning and losing positions in the training data.',
      ],
      correctAnswer: 1,
      explanation: 'The implicit reward β·log(π_θ/π_ref) is high when the fine-tuned policy π_θ is much more likely than the reference π_ref to generate y. This captures "learned preference": if DPO training caused the model to strongly prefer a completion, that completion gets high implicit reward. Completions unchanged from the reference get zero reward.',
      hints: [
        'If π_θ(y) = π_ref(y), the log ratio is 0 — no implicit reward.',
        'Positive implicit reward means the policy has shifted toward y; negative means it has shifted away.',
      ],
    },
  ],

  'reward-hacking': [
    {
      id: 'q-rlhf-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Gao et al. (2023) empirically studied reward hacking in RLHF and found a characteristic shape when plotting gold-standard reward vs. KL from the reference policy. What shape does this curve follow?',
      options: [
        'Monotonically increasing — more RL optimization always improves true reward.',
        'Monotonically decreasing — RL optimization always hurts true reward.',
        'Inverted-U — true reward initially improves then degrades past a KL sweet spot.',
        'Flat — KL from reference has no effect on true reward.',
      ],
      correctAnswer: 2,
      explanation: 'Gao et al. (2023) showed an inverted-U relationship: as RL optimization increases KL from the reference, the gold reward (from a human-quality oracle) initially rises (the model genuinely improves) but then falls as the policy exploits the proxy reward model\'s weaknesses. This empirically confirms that there is an optimal stopping point for RL optimization.',
      hints: [
        'The "sweet spot" is the KL value where gold reward is maximized — optimizing further causes hacking.',
        'This curve is why early stopping and careful β tuning are critical in RLHF.',
      ],
    },
    {
      id: 'q-rlhf-kp7-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Reward hacking becomes more severe as the amount of RL optimization (measured by KL divergence from the reference) increases beyond the optimal point.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'This is precisely what Gao et al. (2023) demonstrated. Past the optimal KL point, the policy has moved far enough from the reference distribution that it can exploit gaps in the reward model — generating text that scores high on the proxy RM but low on true human preference. The inverted-U shape confirms increasing hacking with increasing optimization.',
      hints: [
        'The RM was trained on data generated by earlier policies — the current policy has moved out of distribution.',
        'More KL means more deviation from the reference, more opportunity to find RM exploits.',
      ],
    },
    {
      id: 'q-rlhf-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which mitigation strategy best addresses reward hacking by keeping the reward model in-distribution relative to the current policy?',
      options: [
        'Using a larger, single reward model with more parameters.',
        'Iterative RLHF: periodically sample on-policy completions, collect new human preference labels, retrain the RM, and continue RL.',
        'Freezing the reward model after the first epoch of training.',
        'Replacing the reward model entirely with a rule-based reward function.',
      ],
      correctAnswer: 1,
      explanation: 'The root cause of reward hacking is distributional shift: the policy generates text the RM was never trained on. Iterative RLHF (online RLHF) addresses this by collecting new preference labels on current-policy outputs and retraining the RM, keeping the reward signal in-distribution. Constitutional AI\'s multi-round approach and Anthropic\'s iterative training embody this strategy.',
      hints: [
        'A reward model trained on policy v1 data is out-of-distribution for policy v10 outputs.',
        'Collecting labels on current-policy outputs closes the distributional gap iteratively.',
      ],
    },
  ],

  'scaling-rlhf': [
    {
      id: 'q-rlhf-kp8-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Huyenchip (2023) notes that pretraining constitutes approximately 98% of compute for InstructGPT, with SFT and RLHF taking the remaining 2%. What does this imply about the role of SFT and RLHF?',
      options: [
        'SFT and RLHF are computationally negligible and contribute minimally to model quality.',
        'SFT and RLHF unlock capabilities already present from pretraining that are difficult to access via prompting alone — they are high-leverage post-training steps relative to their compute cost.',
        'Pretraining is unnecessary; SFT and RLHF alone are sufficient to train capable models.',
        'The 98/2 split means pretraining is the only step that matters for alignment.',
      ],
      correctAnswer: 1,
      explanation: 'The 98% pretraining / 2% post-training split shows that SFT and RLHF are extremely compute-efficient. They do not teach the model new capabilities — those come from pretraining — but they shape how capabilities are expressed, converting a completion machine into a helpful assistant. The alignment tax (if any) is small relative to the quality gain.',
      hints: [
        '1.3B InstructGPT (SFT + RLHF) outperforms 175B GPT-3 (pretrained only) on human preference evaluations.',
        'Post-training is about shaping behavior, not learning new knowledge.',
      ],
    },
    {
      id: 'q-rlhf-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'PPO-RLHF memory costs scale linearly with the policy model size because only the actor network needs to be held in GPU memory.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'PPO-RLHF requires four models simultaneously: actor, frozen reference policy, reward model, and critic. All four are typically the same scale as the policy. At 70B parameters with FP16, one model requires ~140 GB of VRAM; four models require ~560 GB+, plus optimizer states for the actor and critic. Memory scales roughly 4× (often more) relative to a single model.',
      hints: [
        '70B × 4 models × 2 bytes/param (FP16) ≈ 560 GB VRAM before optimizer states.',
        'This 4× memory multiplier is a primary driver of RLHF infrastructure cost.',
      ],
    },
    {
      id: 'q-rlhf-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'LoRA (Low-Rank Adaptation) dramatically reduces RLHF memory costs. How does LoRA enable the actor and reference policy to share most of their memory footprint?',
      options: [
        'LoRA quantizes both models to INT4, halving memory for each.',
        'LoRA adds small trainable rank-r matrices to specific weight layers; the actor and reference share the same frozen base weights, with only the actor\'s LoRA adapters being unique — requiring storage of just the adapters rather than a full second model.',
        'LoRA merges the actor and reference into a single model with separate heads.',
        'LoRA uses gradient checkpointing to avoid storing the reference policy\'s activations.',
      ],
      correctAnswer: 1,
      explanation: 'With LoRA, the policy is parameterized as W_base + A·B where W_base is frozen and A, B are low-rank trainable matrices. The reference policy is simply W_base (no adapters). Since both share the frozen backbone stored once, the extra memory for the reference is near zero. Only the LoRA adapter weights (typically <1% of parameters) are unique to the actor.',
      hints: [
        'LoRA: total parameters ≈ base_params + 2 × r × d (very small). The reference is just base_params.',
        'At r=16 for a 7B model, LoRA adapters are ~50M params vs. 7B for a full reference copy.',
      ],
    },
  ],

  'rlaif': [
    {
      id: 'q-rlhf-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'RLAIF (Lee et al., 2023) replaces human preference labelers with an AI system. What is the key finding from Google\'s and Anthropic\'s research on RLAIF vs. RLHF?',
      options: [
        'RLAIF always produces better-aligned models than human-labeled RLHF.',
        'On summarization tasks, RLAIF achieves win rates against human baselines statistically comparable to human-labeled RLHF, validating AI feedback as a practical alternative.',
        'RLAIF is unreliable and produces models significantly worse than RLHF.',
        'RLAIF works only for code generation, not natural language tasks.',
      ],
      correctAnswer: 1,
      explanation: 'Lee et al. (2023) demonstrated that RLAIF achieves win rates on summarization comparable to human-labeled RLHF, with the two being statistically indistinguishable in some evaluations. This validates AI labeling as a scalable alternative to expensive human annotation for certain tasks, particularly where the AI labeler is competent.',
      hints: [
        'RLAIF quality degrades when the AI labeler is weaker than the model being aligned.',
        'Summarization is a task where frontier LLMs are strong evaluators — hence RLAIF works well there.',
      ],
    },
    {
      id: 'q-rlhf-kp9-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Constitutional AI\'s RL-CAI stage is a form of RLAIF, where AI-generated constitutional preference labels replace human harmlessness labels.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'RL-CAI uses an AI judge (prompted with constitutional principles) to generate pairwise preference labels comparing response pairs on harmlessness. These labels train a preference model used as the RL reward signal — with no human harmlessness labels. This is precisely the RLAIF paradigm applied to constitutional principles.',
      hints: [
        'RLAIF = any system where AI-generated labels replace human preference labels for RL training.',
        'CAI\'s constitutional principles guide what the AI judge evaluates — making the AI feedback structured and principled.',
      ],
    },
    {
      id: 'q-rlhf-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key risk of RLAIF that is less severe in human-labeled RLHF is:',
      options: [
        'Higher per-label cost compared to human annotation.',
        'Systematic amplification of the AI labeler\'s biases into the aligned model at scale, without human oversight to catch novel failure modes.',
        'Slower convergence of RL training due to noisier labels.',
        'Inability to label responses longer than 512 tokens.',
      ],
      correctAnswer: 1,
      explanation: 'If the AI labeler has systematic biases — e.g., preferring verbose responses, rewarding confident-sounding but wrong answers, or failing to detect subtle harms — these biases are directly trained into the aligned policy at scale. Human labelers can notice and flag novel failure modes; an AI labeler shares the same blind spots as the model being trained, potentially amplifying them.',
      hints: [
        'Human annotators can catch unexpected failure modes that an AI labeler would rate positively.',
        'Sycophancy and overconfidence are known AI labeler biases that RLAIF can amplify.',
      ],
    },
  ],

  'instruction-following': [
    {
      id: 'q-rlhf-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'FLAN (Wei et al., 2021) improved zero-shot instruction following by fine-tuning on diverse NLP tasks formatted as instructions. What was the primary finding regarding task diversity?',
      options: [
        'More tasks always help, and the relationship is strictly linear in number of tasks.',
        'Instruction fine-tuning on 60+ diverse tasks substantially improves zero-shot generalization to unseen instruction-following tasks, while fewer tasks provide limited benefit.',
        'Task diversity matters less than task volume — 100 examples of one task beats 10 examples of 10 tasks.',
        'FLAN only works if all tasks share the same instruction template format.',
      ],
      correctAnswer: 1,
      explanation: 'Wei et al. (2021) showed that fine-tuning on ≥60 task clusters substantially improves zero-shot performance. With fewer tasks, performance gains are limited. Diversity forces the model to learn general instruction-following meta-skills rather than task-specific patterns, enabling generalization to new task formats at zero-shot.',
      hints: [
        'At 60+ tasks, the model cannot memorize task-specific patterns — it must learn the instruction-following skill itself.',
        'This is analogous to diverse pre-training: more diverse tasks → better generalization.',
      ],
    },
    {
      id: 'q-rlhf-kp10-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Supervised fine-tuning (SFT) on instruction-following demonstrations alone is sufficient to make LLMs reliably safe and aligned with human values.',
      options: ['True', 'False'],
      correctAnswer: 'false',
      explanation: 'SFT on instructions teaches the model to follow instructions, not which instructions to refuse or how to handle harmful requests. SFT models can still produce unsafe content when prompted appropriately. RLHF adds the preference signal needed for alignment: the reward model encodes the distinction between responses humans prefer vs. dislike, including harmlessness judgments.',
      hints: [
        'SFT says "follow instructions like this"; RLHF adds "prefer responses like this, not like that."',
        'Huyenchip (2023) notes: RLHF adds the judgment layer that SFT cannot provide alone.',
      ],
    },
    {
      id: 'q-rlhf-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Why does training on a larger and more diverse set of instruction-following tasks (as in FLAN and Alpaca) improve zero-shot generalization to new tasks?',
      options: [
        'More tasks increase the number of model parameters during training.',
        'Task diversity forces the model to learn a general instruction-following meta-skill — parsing instructions, understanding intent, formatting responses — rather than task-specific pattern matching that fails on novel formats.',
        'More diverse tasks reduce the model\'s perplexity on all future inputs.',
        'Diverse tasks increase the vocabulary seen during fine-tuning, improving coverage.',
      ],
      correctAnswer: 1,
      explanation: 'With 1 task, the model learns one template. With 1000+ diverse tasks spanning classification, generation, translation, QA, summarization, and more, the model cannot rely on template memorization and must instead learn the underlying skill: reading any instruction and generating an appropriate response. This is analogous to how diverse pre-training improves few-shot generalization.',
      hints: [
        'Memorizing 1000 task formats is intractable — the model must generalize from them.',
        'Zero-shot generalization is the emergent property of instruction diversity, not instruction volume.',
      ],
    },
  ],

  'sft-rlhf': [
    {
      id: 'q-rlhf-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the standard ChatGPT/InstructGPT pipeline (Ouyang et al., 2022), what is the correct order of the three training phases?',
      options: [
        'RLHF → SFT → Pretraining',
        'Pretraining → SFT → RLHF (reward modeling + PPO)',
        'SFT → Pretraining → RLHF',
        'Pretraining → RLHF → SFT',
      ],
      correctAnswer: 1,
      explanation: 'The standard pipeline is: (1) Pretraining on internet-scale data → base LLM; (2) Supervised Fine-Tuning on ~13,000–14,500 human-written demonstration pairs → SFT model; (3) RLHF = train reward model on ~300K preference pairs + PPO fine-tune using the RM as reward signal → final aligned model. Each phase builds on the previous.',
      hints: [
        'Pretraining gives the model language knowledge; SFT gives it the right behavioral template; RLHF refines preferences.',
        'The SFT model initializes both the RL policy and the reward model in phase 3.',
      ],
    },
    {
      id: 'q-rlhf-kp11-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'According to Huyenchip (2023), RLHF empirically worsens hallucination compared to SFT alone, despite improving other aspects of model quality.',
      options: ['True', 'False'],
      correctAnswer: 'true',
      explanation: 'Ouyang et al. (2022) showed InstructGPT (SFT + RLHF) produces more hallucinations than the SFT-only model. The InstructGPT paper reports hallucination as slightly worse with RLHF. Despite this, human evaluators still prefer the RLHF model overall due to improvements in helpfulness, coherence, and instruction following. Schulman attributed hallucination to the mismatch between model and labeler knowledge.',
      hints: [
        'Behavior cloning (SFT) can teach hallucination by having humans write responses using knowledge the model lacks.',
        'RLHF improves many dimensions but hallucination is one dimension where it can regress.',
      ],
    },
    {
      id: 'q-rlhf-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Huyenchip (2023) cites three hypotheses for why RLHF works. Which hypothesis explains that RLHF uniquely provides negative feedback that SFT cannot?',
      options: [
        'The diversity hypothesis: SFT penalizes valid responses that differ from demonstrations.',
        'The negative feedback hypothesis: SFT only shows the model good responses (positive signal), while RL can also show what bad responses look like and penalize them.',
        'The hallucination hypothesis: RLHF corrects factual errors that SFT introduces.',
        'The scaling hypothesis: RLHF is more compute-efficient than SFT at large scale.',
      ],
      correctAnswer: 1,
      explanation: 'The negative feedback hypothesis (Goldberg, as cited by Huyenchip 2023): SFT is purely positive — it only shows the model examples of good behavior. RLHF provides negative signals: the reward model can score bad responses poorly, and PPO updates the policy to avoid those. This bidirectional feedback is fundamentally unavailable in SFT\'s supervised learning paradigm.',
      hints: [
        'SFT loss only backpropagates through positive demonstrations — no gradient signal for what not to do.',
        'RL reward can be negative (penalizing bad responses) — this is impossible to express in a standard cross-entropy SFT loss.',
      ],
    },
  ],
}

registerQuestions(questions)
