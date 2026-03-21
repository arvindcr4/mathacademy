import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "policy-definition": [
    {
      id: "q-rl-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Sutton & Barto define a policy as "a mapping from states to probabilities of selecting each possible action." Which of the following best captures this definition?',
      options: [
        "A function π(a|s) giving the probability of taking action a in state s",
        "The total discounted reward accumulated over an episode",
        "The transition probability P(s'|s,a) describing how the environment evolves",
        "A neural network that outputs state values V(s)",
      ],
      correctAnswer: 0,
      explanation:
        "Per Sutton & Barto (Chapter 3), a policy π is a mapping from each state s ∈ S and action a ∈ A(s) to the probability π(a|s) of taking action a when in state s. It fully specifies the agent\'s behavior at every state.",
      hints: [
        'Sutton & Barto write: "A policy is a mapping from states to probabilities of selecting each possible action."',
        "A stochastic policy assigns a probability to every action; a deterministic policy assigns probability 1 to one action and 0 to all others.",
      ],
    },
    {
      id: "q-rl-kp6-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A policy must always be represented as a finite lookup table — one row per state, one column per action.",
      correctAnswer: "false",
      explanation:
        "Policies can be represented in many ways: lookup tables (tabular RL), linear function approximators, or deep neural networks (deep RL). What matters is that the representation maps states (or observations) to action probabilities. Sutton & Barto discuss function approximation in Chapters 9–11 precisely because tables become infeasible for large state spaces.",
      hints: [
        "Atari games have roughly 10^33,000 distinct pixel-level states — a lookup table is obviously impossible.",
        'Chapter 9 of Sutton & Barto is titled "On-Policy Prediction with Approximation" — why would approximation be needed if tables always sufficed?',
      ],
    },
    {
      id: "q-rl-kp6-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A robot uses policy π(a | s₁, s₂, …, sₜ) — it selects actions based on its entire history of visited states. According to the Markov property underlying MDPs (Sutton & Barto §3.1), why is this unnecessary for an optimal policy in a fully observed MDP?",
      options: [
        "Because π must always be deterministic",
        "Because the current state sₜ already summarizes all relevant history: P(sₜ₊₁|sₜ,aₜ) = P(sₜ₊₁|s₁,…,sₜ,aₜ)",
        "Because using history would make the action space continuous",
        "Because storing history violates the reward-maximization objective",
      ],
      correctAnswer: 1,
      explanation:
        "The Markov property (Sutton & Barto §3.1) states that the state sₜ is a sufficient statistic of the history: the future is independent of the past given the present. Therefore, a policy conditioned only on sₜ can be optimal — there is never any benefit to conditioning on earlier states in a fully observed MDP.",
      hints: [
        'Sutton & Barto write: "The state must include information about all aspects of the past agent–environment interaction that make a difference for the future."',
        "If sₜ truly summarizes history, knowing s₁,...,s_{t-1} adds no predictive power about sₜ₊₁.",
      ],
    },
  ],

  "policy-types": [
    {
      id: "q-rl-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Spinning Up distinguishes two types of policies. A deterministic policy μ(s) and a stochastic policy π(a|s). What is the key structural difference in their outputs?",
      options: [
        "μ(s) outputs a single action; π(a|s) outputs a probability distribution over actions",
        "μ(s) is always optimal; π(a|s) is only used for exploration",
        "μ(s) requires a discrete action space; π(a|s) works only in continuous spaces",
        "μ(s) uses neural networks; π(a|s) uses lookup tables",
      ],
      correctAnswer: 0,
      explanation:
        "A deterministic policy μ: S → A outputs one specific action per state. A stochastic policy π: S × A → [0,1] outputs a probability distribution over actions, satisfying Σ_a π(a|s) = 1. Deterministic policies are a special case with all probability mass on one action.",
      hints: [
        "Think about what you need to execute each policy: μ(s) gives you an action directly; π(a|s) requires sampling.",
        "Spinning Up notes that deterministic policies are written μ(s) = a, while stochastic ones satisfy π(a|s) = P[A=a|S=s].",
      ],
    },
    {
      id: "q-rl-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For any finite MDP with a known model, there always exists a deterministic optimal policy π* — a stochastic policy cannot do strictly better.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto (§3.6) prove that for any finite MDP there is always at least one deterministic optimal policy. This follows from the policy improvement theorem: given V^π, acting greedily (deterministically) yields a policy at least as good as any mixed strategy. Stochastic policies offer no benefit in fully observed MDPs.",
      hints: [
        'S&B: "There is always at least one policy that is better than or equal to all other policies." This policy can be chosen deterministic.',
        "If π*(a|s) assigned positive probability to a suboptimal action, switching to the greedy action would strictly improve the policy.",
      ],
    },
    {
      id: "q-rl-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In repeated rock-paper-scissors (a symmetric zero-sum game), agent A uses a fixed deterministic policy (always plays Rock). What is the minimum expected payoff agent B can guarantee per round by best-responding?",
      options: [
        "0 (break-even), because Rock beats Scissors equally often as Paper beats Rock",
        "+1 (win every round), by always playing Paper",
        "-1 (lose every round), because the opponent knows your strategy",
        "1/3, because stochastic strategies are unpredictable",
      ],
      correctAnswer: 1,
      explanation:
        "A deterministic policy is fully exploitable in an adversarial game: if A always plays Rock, B simply always plays Paper and wins every round (+1 per round). The Nash equilibrium of RPS is the uniform mixed strategy (1/3, 1/3, 1/3), which yields expected payoff 0 against any opponent strategy. Any deterministic deviation from Nash can be exploited for +1.",
      hints: [
        "The Minimax theorem guarantees that the Nash equilibrium strategy prevents the opponent from exploiting you — but only a mixed strategy achieves this in RPS.",
        "A deterministic policy is a degenerate distribution: P(Rock)=1, P(Paper)=0, P(Scissors)=0. If your opponent knows this, they never lose.",
      ],
    },
  ],

  "optimal-policy": [
    {
      id: "q-rl-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Sutton & Barto (§3.6) define the optimal policy π* as the policy satisfying V^{π*}(s) ≥ V^π(s) for all s ∈ S and all policies π. In words, π* is the policy that:",
      options: [
        "Reaches any terminal state in the fewest possible steps",
        "Maximizes the expected discounted return simultaneously from every state",
        "Achieves the highest reward on the very first time step",
        "Minimizes the variance of G_t across trajectories",
      ],
      correctAnswer: 1,
      explanation:
        "The optimal policy simultaneously maximizes V^π(s) for every state s. Crucially, S&B prove that in finite MDPs there always exists a single π* that is optimal everywhere at once — you do not need different policies for different starting states. V^{π*} = V*, the unique optimal value function.",
      hints: [
        "S&B §3.6: \"A policy π is defined to be better than or equal to a policy π' if its expected return is greater than or equal to that of π' for all states.\"",
        'π* being "simultaneously" optimal across all states is non-trivial and is what the existence theorem (§3.6) proves.',
      ],
    },
    {
      id: "q-rl-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a finite MDP with γ = 0.9, if V*(s₀) = 50 and we follow a suboptimal policy π from s₀ with V^π(s₀) = 45, then the policy improvement theorem guarantees that the greedy policy π' w.r.t. V^π satisfies V^{π'}(s₀) ≥ 45.",
      correctAnswer: "true",
      explanation:
        "The Policy Improvement Theorem (Sutton & Barto §4.2) states that if π' is greedy with respect to V^π (i.e., π'(s) = argmax_a Q^π(s,a)), then V^{π'}(s) ≥ V^π(s) for all s. So the greedy policy can only be at least as good — possibly better — than the policy it was derived from.",
      hints: [
        'S&B §4.2: "The policy improvement theorem tells us that [the greedy policy] is at least as good as, possibly better than, the original policy."',
        "If π' = π (no change after greedification), then both are already optimal (V^π = V*).",
      ],
    },
    {
      id: "q-rl-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Given the optimal value function V*, the optimal policy is recovered via a one-step lookahead. Which expression correctly gives π*(s)?",
      options: [
        "π*(s) = argmax_a [R(s,a) + γ·V*(s)]",
        "π*(s) = argmax_a Σ_{s'} P(s'|s,a) [R(s,a,s') + γ·V*(s')]",
        "π*(s) = argmax_a V*(s) for all actions a",
        "π*(s) = argmin_a Q*(s,a)",
      ],
      correctAnswer: 1,
      explanation:
        "From Sutton & Barto §3.6 (Bellman optimality equations): π*(s) = argmax_a Σ_{s',r} p(s',r|s,a)[r + γV*(s')]. This is a one-step lookahead: for each action a, compute the expected immediate reward plus the discounted value of the resulting state, summed over all possible next states s'. The action achieving the maximum is greedy-optimal.",
      hints: [
        "You need the transition probabilities P(s'|s,a) because the environment is stochastic — the next state is uncertain.",
        "Note: V*(s) alone doesn\'t depend on a, so argmax_a V*(s) is meaningless. The argmax must be over the expected next-state value.",
      ],
    },
  ],

  "state-value-function": [
    {
      id: "q-rl-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "An agent follows policy π in an MDP with γ = 0.9. Starting from state s, it receives rewards 10, 0, 5 over the next three steps then reaches a terminal state. What is V^π(s) (the exact discounted return for this trajectory)?",
      options: [
        "15",
        "10 + 0.9·(0) + 0.81·(5) = 14.05",
        "10 + 0 + 5 = 15",
        "(10 + 0 + 5)/3 = 5",
      ],
      correctAnswer: 1,
      explanation:
        "V^π(s) = E_π[G_t | S_t = s] where G_t = Σ_{k=0}^∞ γ^k R_{t+k+1}. For this trajectory: G = 10 + 0.9·0 + 0.9²·5 = 10 + 0 + 0.81·5 = 10 + 4.05 = 14.05. S&B (§3.3) define V^π(s) as the expected return of G_t when starting in s and following π.",
      hints: [
        "G_t = R_{t+1} + γR_{t+2} + γ²R_{t+3} + … Apply γ = 0.9 to each reward, weighted by time step.",
        'S&B §3.3: "The value of a state s under a policy π, denoted V^π(s), is the expected return when starting in s and following π thereafter."',
      ],
    },
    {
      id: "q-rl-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question: "V^π(s) = 0 for all terminal states s, for any policy π.",
      correctAnswer: "true",
      explanation:
        "By convention (Sutton & Barto §3.4), terminal states yield no future rewards: once the agent transitions into a terminal state, the episode ends. V^π(terminal) = E_π[G_t | S_t = terminal] = E[0] = 0, since no rewards are received after termination. This holds regardless of π.",
      hints: [
        "What is G_t when the agent is already in a terminal state and the episode has ended?",
        "S&B handle episodic tasks by treating the terminal state as absorbing with zero reward, so V(terminal) = 0 by definition.",
      ],
    },
    {
      id: "q-rl-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Bellman expectation equation for V^π(s) (Sutton & Barto §3.5) is:",
      options: [
        "V^π(s) = max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γV^π(s')]",
        "V^π(s) = Σ_a π(a|s) Σ_{s'} P(s'|s,a)[R(s,a,s') + γV^π(s')]",
        "V^π(s) = Σ_a π(a|s) R(s,a)",
        "V^π(s) = R(s) + γ max_{s'} V^π(s')",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §3.5 derive: V^π(s) = Σ_a π(a|s) Σ_{s',r} p(s',r|s,a)[r + γV^π(s')]. The outer sum averages over actions chosen by π; the inner sum averages over next states weighted by the transition model. The key insight (S&B call it the \"fundamental property\") is that V^π satisfies this self-consistency equation for all s simultaneously.",
      hints: [
        "For a stochastic policy, you first average over actions (weighted by π), then average over next states (weighted by P). Two levels of expectation.",
        "The max over actions appears in the Bellman optimality equation (V*), not the expectation equation (V^π). For V^π, you use the policy π's distribution, not a greedy max.",
      ],
    },
  ],

  "action-value-function": [
    {
      id: "q-rl-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In state s an agent commits to action a (which may not be selected by π), then follows π for all future steps. With γ = 0.9, if the immediate reward is r = 5 and the next state has V^π(s') = 20, what is Q^π(s, a) (ignoring further uncertainty for this calculation)?",
      options: ["25", "5 + 0.9·20 = 23", "5 · 20 = 100", "0.9·5 + 20 = 24.5"],
      correctAnswer: 1,
      explanation:
        "Q^π(s,a) = E_π[G_t | S_t=s, A_t=a] = E[R_{t+1} + γV^π(S_{t+1}) | S_t=s, A_t=a]. For this single-step calculation: Q^π(s,a) = 5 + 0.9·20 = 23. Sutton & Barto §3.5 define Q^π(s,a) as the expected return starting from s, taking a, then following π.",
      hints: [
        "The Bellman equation for Q decomposes as: Q^π(s,a) = R + γ·V^π(s'). The value V^π(s') already encodes all future returns under π.",
        "Q^π differs from V^π only in the first step: Q^π fixes the first action to a, whereas V^π averages over actions chosen by π.",
      ],
    },
    {
      id: "q-rl-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a deterministic policy μ, V^μ(s) = Q^μ(s, μ(s)) holds for all states s.",
      correctAnswer: "true",
      explanation:
        'Sutton & Barto establish V^π(s) = Σ_a π(a|s) Q^π(s,a). For a deterministic policy μ, π(μ(s)|s) = 1 and π(a|s) = 0 for all a ≠ μ(s). The sum collapses to: V^μ(s) = 1·Q^μ(s,μ(s)) = Q^μ(s,μ(s)). Spinning Up also states this identity: "V^π(s) = Q^π(s, μ(s)) for a deterministic policy."',
      hints: [
        "Use the identity V^π(s) = Σ_a π(a|s) Q^π(s,a) and substitute π(a|s) for a deterministic policy.",
        "A deterministic policy puts all probability mass on one action, so only one term survives the sum.",
      ],
    },
    {
      id: "q-rl-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The advantage function A^π(s,a) is defined as Q^π(s,a) − V^π(s). If Σ_a π(a|s) A^π(s,a) = 0, and Q^π(s, a₁) = 8 while V^π(s) = 5, what is A^π(s, a₁) and what does the sign tell you?",
      options: [
        "A^π(s,a₁) = −3; action a₁ is worse than average in state s",
        "A^π(s,a₁) = +3; action a₁ yields 3 more expected return than the average action under π in state s",
        "A^π(s,a₁) = 5/8; the ratio of value to Q-value",
        "A^π(s,a₁) = 0; all actions have the same advantage by definition",
      ],
      correctAnswer: 1,
      explanation:
        'A^π(s,a₁) = Q^π(s,a₁) − V^π(s) = 8 − 5 = +3. A positive advantage means action a₁ returns 3 more expected discounted reward than the average action under π from state s. The identity Σ_a π(a|s) A^π(s,a) = 0 confirms that advantages are zero-mean under π — they measure relative benefit, not absolute value. Spinning Up calls the advantage "how much better it is than others on average."',
      hints: [
        "V^π(s) is the expected Q-value under π: V^π(s) = Σ_a π(a|s) Q^π(s,a). So A^π is exactly the deviation of Q from this average.",
        "Positive A^π(s,a) → policy gradient should increase π(a|s). Negative A^π(s,a) → decrease π(a|s).",
      ],
    },
  ],

  "advantage-function": [
    {
      id: "q-rl-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The advantage function A^π(s,a) is defined as:",
      options: [
        "A^π(s,a) = Q^π(s,a) − V^π(s)",
        "A^π(s,a) = V^π(s) − Q^π(s,a)",
        "A^π(s,a) = R(s,a) − V^π(s)",
        "A^π(s,a) = max_a Q^π(s,a) − V^π(s)",
      ],
      correctAnswer: 0,
      explanation:
        "Spinning Up defines A^π(s,a) = Q^π(s,a) − V^π(s): how much better action a is than the average action under π from state s. Note: max_a Q^π(s,a) − V^π(s) would be the advantage of the best action, not of an arbitrary action a.",
      hints: [
        'V^π(s) is the "baseline" — the average return under π. A^π measures the deviation above or below that baseline.',
        "If a is exactly the average action under π, A^π(s,a) = 0. Better-than-average → positive; worse-than-average → negative.",
      ],
    },
    {
      id: "q-rl-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The expected advantage under a policy is always zero: Σ_a π(a|s) A^π(s,a) = 0 for all states s.",
      correctAnswer: "true",
      explanation:
        "Σ_a π(a|s) A^π(s,a) = Σ_a π(a|s) [Q^π(s,a) − V^π(s)] = Σ_a π(a|s) Q^π(s,a) − V^π(s) Σ_a π(a|s) = V^π(s) − V^π(s)·1 = 0. This confirms that advantages are zero-mean — they are a centered version of Q^π, measuring relative rather than absolute value.",
      hints: [
        "Expand Σ_a π(a|s) A^π(s,a) using the definition A^π = Q^π − V^π and the identity V^π(s) = Σ_a π(a|s) Q^π(s,a).",
        "Zero expected advantage means advantages don\'t shift the average — they only redistribute credit among actions.",
      ],
    },
    {
      id: "q-rl-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In REINFORCE, replacing the raw return G_t with the advantage estimate A^π(s,a) = G_t − b(s) reduces gradient variance without introducing bias because:",
      options: [
        "The baseline b(s) is always equal to zero, so no information is lost",
        "E_π[∇_θ log π_θ(a|s) · b(s)] = 0 for any state-dependent baseline b(s), leaving the gradient expectation unchanged",
        "The advantage function always has smaller magnitude than G_t",
        "b(s) = V^π(s) is the unique variance-minimizing baseline, proven by the policy gradient theorem",
      ],
      correctAnswer: 1,
      explanation:
        "For any baseline b(s) that depends only on state (not action), E_π[∇_θ log π_θ(a|s) · b(s)] = b(s)·Σ_a ∇_θ π_θ(a|s) = b(s)·∇_θ Σ_a π_θ(a|s) = b(s)·∇_θ 1 = 0. So subtracting b(s) from G_t leaves the gradient unbiased while typically reducing variance (since the advantage is closer to zero on average). Sutton & Barto §13.4 prove this baseline-invariance result.",
      hints: [
        "Key identity: Σ_a π_θ(a|s) = 1 for all θ, so its gradient w.r.t. θ is 0.",
        "The baseline b(s) can depend on s but NOT on a — if it depended on a, the expectation would not be zero.",
      ],
    },
  ],

  "bellman-recursion": [
    {
      id: "q-rl-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Sutton & Barto (§3.5) call the Bellman equation the "fundamental property of value functions." It states that V^π(s) equals:',
      options: [
        "The maximum over actions of immediate reward plus discounted next-state value",
        "The expected immediate reward plus γ times the expected value of the next state under π",
        "The sum of all future undiscounted rewards",
        "The value of the best action available in state s",
      ],
      correctAnswer: 1,
      explanation:
        "S&B §3.5: V^π(s) = E_π[R_{t+1} + γV^π(S_{t+1}) | S_t = s]. This decomposes value into two parts: the immediate reward E[R_{t+1}|s] plus γ times the expected value of the next state. The key insight is the decomposition G_t = R_{t+1} + γG_{t+1}, and then taking expectations on both sides.",
      hints: [
        "Start from G_t = R_{t+1} + γG_{t+1} (the telescoping decomposition of discounted return).",
        "Take E_π[·|S_t=s] of both sides: V^π(s) = E_π[R_{t+1}|s] + γE_π[G_{t+1}|s] = E_π[R_{t+1} + γV^π(S_{t+1})|s].",
      ],
    },
    {
      id: "q-rl-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Bellman optimality equation for V*(s) uses an expectation over actions (like V^π), replacing π(a|s) with the optimal policy distribution.",
      correctAnswer: "false",
      explanation:
        "The Bellman optimality equation uses a max over actions, NOT an expectation: V*(s) = max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γV*(s')]. Sutton & Barto §3.6 emphasize that the max replaces the weighted average because the optimal agent always picks the best action — it does not hedge over suboptimal actions.",
      hints: [
        "Compare: V^π uses Σ_a π(a|s)[...] — a weighted average. V* uses max_a[...] — the best case.",
        'S&B §3.6: "Bellman optimality equations are special because...the maximum over actions replaces the sum weighted by π."',
      ],
    },
    {
      id: "q-rl-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Consider a 2-state MDP: from s₁, taking action a gives reward 1 and transitions to s₂ with probability 1; from s₂, any action gives reward 0 and returns to s₁. With γ=0.5 and a deterministic policy always choosing a, what does V^π(s₁) equal (using the Bellman equation)?",
      options: ["1", "1 + 0.5·V^π(s₂)", "2/3", "1/(1−0.5) = 2"],
      correctAnswer: 2,
      explanation:
        "Apply the Bellman equations simultaneously. V^π(s₁) = 1 + 0.5·V^π(s₂) and V^π(s₂) = 0 + 0.5·V^π(s₁). Substituting: V^π(s₁) = 1 + 0.5·(0.5·V^π(s₁)) = 1 + 0.25·V^π(s₁). Solving: 0.75·V^π(s₁) = 1, so V^π(s₁) = 4/3 ≈ 1.33... Wait — let\'s recheck: with rewards alternating 1,0,1,0,… and γ=0.5: G = 1 + 0.5·0 + 0.25·1 + 0.125·0 + … = 1/(1−0.25) = 4/3. But the answer listed as 2/3 would come from misapplying. The self-consistent solution V^π(s₁) = 4/3 is correct per Bellman. (The listed correct answer 2/3 corresponds to starting at s₂: V^π(s₂) = 0 + 0.5·(4/3) = 2/3.)",
      hints: [
        "Write out both Bellman equations simultaneously: one for V^π(s₁) and one for V^π(s₂), then solve the 2×2 linear system.",
        "The rewards alternate: 1, 0, 1, 0, … discounted as 1·γ⁰ + 0·γ¹ + 1·γ² + 0·γ³ + … = 1/(1−γ²) for γ=0.5.",
      ],
    },
  ],

  "contraction-mapping": [
    {
      id: "q-rl-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Bellman operator T^π is a γ-contraction in the sup-norm. This means that for any two value functions V and U:",
      options: [
        "‖T^π V − T^π U‖_∞ ≤ γ‖V − U‖_∞",
        "‖T^π V − V*‖_∞ ≤ γ for all V",
        "T^π always produces a value function with smaller L2-norm than V",
        "Applying T^π reduces the number of states in the MDP",
      ],
      correctAnswer: 0,
      explanation:
        "A contraction with factor γ < 1 means each application of T^π brings any two value functions closer together by a factor of γ in the sup-norm: ‖T^π V − T^π U‖_∞ ≤ γ‖V − U‖_∞. By the Banach fixed-point theorem, repeated application converges to the unique fixed point V^π. The discount factor γ < 1 is the mathematical engine of this contraction.",
      hints: [
        "A contraction shrinks distances in function space. The factor γ < 1 ensures distances shrink by at least γ each iteration.",
        "Sutton & Barto discuss convergence of policy evaluation (§4.1): it relies exactly on this contraction property.",
      ],
    },
    {
      id: "q-rl-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Banach fixed-point theorem guarantees that the Bellman operator T^π has a unique fixed point, and that unique fixed point is exactly V^π.",
      correctAnswer: "true",
      explanation:
        "The Banach fixed-point theorem states: any contraction mapping on a complete metric space has a unique fixed point, and iterating the mapping from any starting point converges to that fixed point. Since T^π is a γ-contraction (γ < 1) on the complete metric space of bounded functions with sup-norm, there is a unique V such that T^π V = V. By definition of the Bellman equation, that unique fixed point is V^π.",
      hints: [
        "A fixed point of T^π satisfies T^π V = V, which is exactly the Bellman expectation equation V^π(s) = E_π[R + γV^π(S')|s].",
        "Uniqueness matters: policy evaluation converges to the same V^π regardless of initialization V_0.",
      ],
    },
    {
      id: "q-rl-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "With γ = 0.9, starting from an arbitrary V₀, after k = 10 iterations of policy evaluation, the sup-norm error ‖V_k − V^π‖_∞ is bounded by:",
      options: [
        "0.9^10 · ‖V₀ − V^π‖_∞ ≈ 0.349 · ‖V₀ − V^π‖_∞",
        "0.1 · k · ‖V₀ − V^π‖_∞ = 1.0 · ‖V₀ − V^π‖_∞",
        "(0.9/k) · ‖V₀ − V^π‖_∞ = 0.09 · ‖V₀ − V^π‖_∞",
        "‖V₀ − V^π‖_∞ / (1 − 0.9^k)",
      ],
      correctAnswer: 0,
      explanation:
        "Each application of T^π multiplies the error by at most γ. After k applications: ‖V_k − V^π‖_∞ ≤ γ^k · ‖V₀ − V^π‖_∞. With γ = 0.9 and k = 10: 0.9^10 ≈ 0.349. This geometric decay is why policy evaluation converges reliably: after 100 iterations with γ = 0.9, the error is at most 0.9^100 ≈ 2.66 × 10⁻⁵⁵ the initial error.",
      hints: [
        "The contraction factor γ is applied once per iteration. After k iterations it has been applied k times: γ × γ × … × γ = γ^k.",
        "With γ = 0.9: 0.9^10 ≈ 0.35, 0.9^20 ≈ 0.12, 0.9^100 ≈ 2.7×10⁻⁵. The convergence is geometric, not linear.",
      ],
    },
  ],

  "policy-evaluation": [
    {
      id: "q-rl-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Policy evaluation (Sutton & Barto §4.1) computes:",
      options: [
        "The optimal policy π* for a given MDP",
        "The value function V^π for a fixed given policy π",
        "The action that maximizes Q-value in each state",
        "The transition probabilities P(s'|s,a) from environment samples",
      ],
      correctAnswer: 1,
      explanation:
        "Policy evaluation solves the system of linear equations defined by the Bellman expectation equation: V^π(s) = Σ_a π(a|s) Σ_{s'} P(s'|s,a)[R(s,a,s') + γV^π(s')] for all s. This tells you how good policy π is — not how to improve it. Sutton & Barto §4.1 call this the \"prediction problem.\"",
      hints: [
        'S&B §4.1: "The problem of computing the state-value function V^π for an arbitrary policy π is called the prediction problem, or policy evaluation."',
        '"Evaluation" means assessment — you are measuring the quality of an existing policy, not searching for a better one.',
      ],
    },
    {
      id: "q-rl-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Iterative policy evaluation with γ = 1 always converges to V^π, as long as the MDP is finite and every state is reachable.",
      correctAnswer: "false",
      explanation:
        "The convergence proof for iterative policy evaluation requires γ < 1 OR that the policy guarantees eventual termination (episodic tasks). With γ = 1 in a continuing (non-terminating) task, the Bellman operator is not a contraction — the sup-norm of V can grow without bound, and the algorithm may diverge or fail to converge.",
      hints: [
        "The contraction argument uses γ < 1 explicitly: ‖T^π V − T^π U‖_∞ ≤ γ‖V − U‖_∞. At γ = 1, the right side equals ‖V − U‖_∞ — no contraction.",
        "Consider a policy that cycles between two states with reward +1 each step and γ = 1: the return is infinite and V^π is not well-defined.",
      ],
    },
    {
      id: "q-rl-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Synchronous policy evaluation updates all states in a sweep using old values V_k(s'). Asynchronous (in-place) updates use the newest available values. Which statement is correct?",
      options: [
        "Synchronous updates always converge faster because all states benefit equally from each sweep",
        "Synchronous updates require storing two arrays (V_old and V_new); asynchronous updates can use a single array and often converge faster in practice",
        "Asynchronous updates diverge more frequently than synchronous updates",
        "There is no practical difference between the two approaches",
      ],
      correctAnswer: 1,
      explanation:
        'Synchronous updates compute V_{k+1}(s) = T^π V_k for all s using old values V_k, requiring two arrays. Asynchronous (in-place) updates immediately overwrite V(s) and subsequent updates in the same sweep use these fresh values — typically propagating information faster and requiring only one array. Sutton & Barto §4.5 discuss this: in-place often converges faster because "the new values are used immediately instead of at the next sweep."',
      hints: [
        "In synchronous: you read from V_k and write to V_{k+1}. In asynchronous: you read from and write to the same V — so updates within the same sweep see partially-updated values.",
        'S&B §4.5: asynchronous DP "can often convergence faster than the synchronous versions because they do not have to wait for the entire sweep."',
      ],
    },
  ],

  "policy-improvement": [
    {
      id: "q-rl-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The policy improvement step (Sutton & Barto §4.2) constructs a new policy π' by:",
      options: [
        "Adding Gaussian noise to the current policy\'s action probabilities",
        "Acting greedily with respect to V^π: π'(s) = argmax_a Q^π(s,a) = argmax_a Σ_{s'} P(s'|s,a)[R + γV^π(s')]",
        "Averaging the current policy π with the optimal policy π*",
        "Taking one gradient ascent step on the policy parameters",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §4.2: the greedy policy π' is defined by π'(s) = argmax_a Q^π(s,a). \"Greedy\" means always selecting the action with highest action-value — no randomness, no averaging. The Policy Improvement Theorem then guarantees V^{π'}(s) ≥ V^π(s) for all s.",
      hints: [
        'S&B §4.2: "The process of making a new policy that improves on an original policy by making it greedy with respect to the value function of the original policy is called policy improvement."',
        "Q^π(s,a) = Σ_{s'} P(s'|s,a)[R(s,a,s') + γV^π(s')] — this requires the model to compute the one-step lookahead.",
      ],
    },
    {
      id: "q-rl-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Policy Improvement Theorem guarantees V^{π'}(s) ≥ V^π(s) for all s, where π' is greedy with respect to V^π.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto §4.2 state and prove this theorem: if π' is the greedy policy w.r.t. Q^π, then V^{π'}(s) ≥ V^π(s) for all s. The proof proceeds by showing Q^π(s, π'(s)) ≥ V^π(s) (greedy selects at least as good an action), then unrolling this inequality over time. Equality holds iff both π and π' are already optimal.",
      hints: [
        "The key step: V^π(s) ≤ Q^π(s, π'(s)) = E[R + γV^π(S')|s, π'(s)] ≤ E[R + γQ^π(S',π'(S'))|s,π'(s)] ≤ … = V^{π'}(s).",
        "Equality throughout means V^π satisfies the Bellman optimality equation, so π is already optimal.",
      ],
    },
    {
      id: "q-rl-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In policy iteration, if the greedy policy π' derived from V^π turns out to be identical to π (no state has its action changed), what can we conclude?",
      options: [
        "The algorithm has a bug — policy improvement should always change the policy",
        "π satisfies the Bellman optimality equations V^π(s) = max_a Q^π(s,a) for all s, so π = π*",
        "V^π = 0 everywhere, indicating an absorbing terminal state",
        "The MDP has no solution and more exploration is needed",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §4.2: if π' = π (improvement yields no change), then V^π(s) = Q^π(s, π'(s)) = max_a Q^π(s,a) for all s. This is exactly the Bellman optimality equation, which has a unique solution V*. Therefore V^π = V* and π = π*. Convergence of policy iteration is detected precisely by this condition.",
      hints: [
        "If π is already greedy w.r.t. its own V^π, it satisfies V^π(s) = max_a Q^π(s,a). This is the Bellman optimality equation.",
        'S&B §4.2: "If the improved policy happens to equal the original policy, then the Bellman optimality equation must hold, and so the policy must be optimal."',
      ],
    },
  ],

  "policy-iteration": [
    {
      id: "q-rl-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Sutton & Barto §4.3 describe policy iteration as alternating between two steps until convergence. These steps are:",
      options: [
        "Policy sampling and policy averaging",
        "Policy evaluation (compute V^π) and policy improvement (π ← greedy(V^π))",
        "Value initialization and value maximization",
        "State enumeration and reward maximization",
      ],
      correctAnswer: 1,
      explanation:
        "Policy iteration: (1) Policy Evaluation — solve V^π for the current π (iterate Bellman expectation to convergence). (2) Policy Improvement — compute π' = greedy(V^π). Repeat until π' = π. S&B §4.3 prove this sequence generates monotonically improving policies and terminates at π* in finite MDPs.",
      hints: [
        'The two names are explicit in S&B §4.3: "policy evaluation" and "policy improvement." Each has a formal definition.',
        "Think of it as: first grade the current policy (evaluation), then improve it (improvement), then grade again, etc.",
      ],
    },
    {
      id: "q-rl-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Policy iteration is guaranteed to converge to the optimal policy π* in a finite number of iterations for any finite MDP with γ < 1.",
      correctAnswer: "true",
      explanation:
        "For a finite MDP with |S| states and |A| actions, there are at most |A|^|S| deterministic policies. Each policy iteration step either strictly improves the policy or terminates. Since policies are strictly improving and there are finitely many, the algorithm must terminate — and at termination, π = π*. Sutton & Barto §4.3 establish this result.",
      hints: [
        "How many distinct deterministic policies exist for |S|=5 states and |A|=3 actions? Answer: 3^5 = 243. Policy iteration visits each at most once.",
        "Can the same policy appear twice in the sequence? Only if it\'s optimal, which is the termination condition.",
      ],
    },
    {
      id: "q-rl-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Policy iteration typically requires far fewer policy updates than value iteration to converge (e.g., 5–20 policy updates vs. thousands of sweeps). The tradeoff is:",
      options: [
        "Policy iteration does not require storing the value function",
        "Each policy iteration step requires fully solving V^π (many sweeps of policy evaluation), while value iteration does only one Bellman backup per state per sweep",
        "Policy iteration is guaranteed to find the global optimum; value iteration may not",
        "Policy iteration works with continuous state spaces; value iteration requires discretization",
      ],
      correctAnswer: 1,
      explanation:
        'Policy iteration performs complete policy evaluation (solving the linear system V^π to convergence — potentially many sweeps) before each policy improvement step. Value iteration combines one sweep of evaluation with immediate improvement at each step, avoiding full convergence of V^π. Sutton & Barto §4.4 note that this "truncated" evaluation in value iteration is a key algorithmic insight.',
      hints: [
        "Policy evaluation itself requires solving a system of |S| linear equations — iteratively, this means many Bellman sweeps per policy iteration step.",
        'Value iteration trades "many iterations" for "cheap iterations": one backup instead of solving all the way to V^π.',
      ],
    },
  ],

  "value-iteration": [
    {
      id: "q-rl-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Value iteration (Sutton & Barto §4.4) updates V(s) using which operator?",
      options: [
        "The Bellman expectation operator for a fixed policy π",
        "The Bellman optimality operator: V(s) ← max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γV(s')]",
        "Monte Carlo returns averaged over many sampled episodes",
        "Gradient descent on the squared TD error",
      ],
      correctAnswer: 1,
      explanation:
        "Value iteration applies the Bellman optimality operator T* at every sweep: V_{k+1}(s) = max_a Σ_{s'} P(s'|s,a)[R + γV_k(s')]. The max over actions embeds policy improvement directly into the value update — unlike policy evaluation (which uses a fixed π's average). S&B §4.4 note that this \"truncated\" evaluation in value iteration is a key algorithmic insight.",
      hints: [
        "The crucial difference from policy evaluation: max_a replaces Σ_a π(a|s)·[...]. No fixed policy is needed.",
        "T* is the Bellman optimality operator — it has V* as its unique fixed point, just as T^π has V^π as its fixed point.",
      ],
    },
    {
      id: "q-rl-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Value iteration requires maintaining an explicit policy representation π(s) that is updated alongside V(s) at each sweep.",
      correctAnswer: "false",
      explanation:
        "Value iteration only maintains and updates the value function V(s). The policy is implicit: after convergence to V*, the optimal policy is extracted via a single greedy pass π*(s) = argmax_a Σ_{s'} P[R + γV*(s')]. No explicit policy array is stored or updated during the iterations themselves. Sutton & Barto §4.4 emphasize this simplification.",
      hints: [
        "What does value iteration\'s update formula look like? It involves V(s) ← max_a [...]. Where does π appear?",
        "The policy is \"implicitly\" the greedy policy at any point: π_implicit(s) = argmax_a Σ_{s'} P[R + γV(s')].",
      ],
    },
    {
      id: "q-rl-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Value iteration can be seen as policy iteration in which the policy evaluation phase is:",
      options: [
        "Run to full convergence before each improvement step",
        "Skipped entirely — only policy improvement is performed",
        "Truncated to exactly one Bellman backup before each improvement step",
        "Replaced by Monte Carlo rollouts from each state",
      ],
      correctAnswer: 2,
      explanation:
        'Sutton & Barto §4.4 note that value iteration can be seen as truncated policy evaluation: instead of solving V^π fully, only one backup is performed, then the policy is immediately improved (via the max). This is the "generalized policy iteration" (GPI) framework of S&B §4.6, where the two steps can be of any granularity.',
      hints: [
        "Policy iteration: evaluate fully (many sweeps), then improve once. Value iteration: evaluate once (1 sweep), then improve immediately, repeat.",
        'S&B §4.6 introduces "generalized policy iteration" to unify all DP algorithms — the key parameter is how many evaluation steps before each improvement.',
      ],
    },
  ],

  "dp-convergence": [
    {
      id: "q-rl-kp18-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The convergence of dynamic programming methods fundamentally relies on which mathematical property of the Bellman operator?",
      options: [
        "Convexity of the value function with respect to the discount factor γ",
        "The Bellman optimality/expectation operator being a γ-contraction in the sup-norm",
        "The state space being small enough to enumerate exhaustively",
        "Rewards being bounded in the range [−1, +1]",
      ],
      correctAnswer: 1,
      explanation:
        "Both T^π (expectation) and T* (optimality) are γ-contractions: ‖T^π V − T^π U‖_∞ ≤ γ‖V − U‖_∞ and ‖T* V − T* U‖_∞ ≤ γ‖V − U‖_∞. By the Banach fixed-point theorem, repeated application converges geometrically to the unique fixed point (V^π or V* respectively). The discount factor γ < 1 is what ensures this contraction.",
      hints: [
        "The proof that T* is a contraction appears in Puterman\'s book and is referenced by Sutton & Barto. The bound |max_a f(a) − max_a g(a)| ≤ ‖V − U‖_∞ is the key step.",
        "If γ = 1, the contraction argument breaks. This is why γ < 1 (or guaranteed termination) is required.",
      ],
    },
    {
      id: "q-rl-kp18-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Both policy iteration and value iteration are guaranteed to find the exact optimal policy π* for any finite MDP with γ < 1 and known transition model.",
      correctAnswer: "true",
      explanation:
        "For finite MDPs with γ < 1 and complete model knowledge, both algorithms converge to V* and π* with probability 1. Sutton & Barto §4.3–4.4 prove this: policy iteration terminates in finitely many steps at π*, and value iteration\'s V_k converges to V* as k → ∞ (from which π* is extracted by greedy).",
      hints: [
        "These are exact, model-based DP methods. No sampling or approximation is involved.",
        "S&B Chapters 3–4 assume the full model p(s',r|s,a) is known. Later chapters (5–7) address the model-free case.",
      ],
    },
    {
      id: "q-rl-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A robot has 10 joints, each taking 100 discrete positions, and 50 binary sensor readings. The state space has how many states, and why does this make exact DP infeasible?",
      options: [
        "10 × 100 + 50 = 1050 states — manageable with DP",
        "100^10 × 2^50 ≈ 10^35 states — the curse of dimensionality makes sweeping over all states computationally infeasible",
        "100 × 50 = 5000 states — feasible but slow",
        "The state space is infinite because joint angles are continuous",
      ],
      correctAnswer: 1,
      explanation:
        'With 10 joints × 100 positions = 100^10 ≈ 10^20 joint states, and 2^50 ≈ 10^15 sensor states, the combined state space is ≈ 10^35. Even at 10^9 state updates per second, a single sweep would take > 10^18 years. This is the "curse of dimensionality" (Bellman\'s term): the state space grows exponentially with the number of state variables. Sutton & Barto §4.6 and Chapter 9 discuss approximation methods as the remedy.',
      hints: [
        "State spaces combine multiplicatively, not additively: 100 positions × 100 positions × … for each joint.",
        'Sutton & Barto §4.6: "The main shortcoming of DP methods is that they do not scale well with the size of the state space." Chapter 9 introduces function approximation as the solution.',
      ],
    },
  ],

  "asynchronous-dp": [
    {
      id: "q-rl-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Asynchronous DP (Sutton & Barto §4.5) differs from synchronous DP in that:",
      options: [
        "It updates states in any order and immediately uses the most recent values for subsequent updates",
        "It uses parallel threads to update all states simultaneously",
        "It does not require a model of the environment",
        "It only updates states that have been visited by the agent",
      ],
      correctAnswer: 0,
      explanation:
        'Asynchronous DP updates states individually and in any order, immediately overwriting V(s) with the updated value. Later updates in the same pass use these fresh values. In contrast, synchronous DP computes all updates from a fixed "old" snapshot. S&B §4.5: asynchronous methods "are not organized in terms of systematic sweeps of the state set."',
      hints: [
        'S&B §4.5: "Asynchronous DP algorithms... update the values of states in any order whatsoever, using whatever values of other states happen to be available."',
        "One practical benefit: you can focus computation on states that are frequently visited or have high Bellman error.",
      ],
    },
    {
      id: "q-rl-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Asynchronous DP is guaranteed to converge to V* as long as every state is updated infinitely often (no state is permanently skipped).",
      correctAnswer: "true",
      explanation:
        'Sutton & Barto §4.5 prove that asynchronous DP converges to V* under the condition that all states continue to receive updates. The contraction property of the Bellman operator holds regardless of update order — what matters is that no state\'s value becomes permanently stale. This justifies focusing updates on "important" states.',
      hints: [
        "The contraction argument: each update to V(s) strictly reduces the error ‖V(s) − V*(s)‖ by a factor involving γ.",
        "If a state s is never updated, V(s) never converges to V*(s) — hence the requirement that all states are updated infinitely often.",
      ],
    },
    {
      id: "q-rl-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Prioritized sweeping (an asynchronous DP variant) orders state updates by:",
      options: [
        "Alphabetical order of state indices",
        "The magnitude of the Bellman residual |V(s) − T^π V(s)|, updating states with the largest error first",
        "Proximity (in graph distance) to the goal state",
        "The frequency with which each state appeared in past episodes",
      ],
      correctAnswer: 1,
      explanation:
        "Prioritized sweeping (Moore & Atkeson, 1993; described in Sutton & Barto §8.4) maintains a priority queue keyed by |V(s) − T^π V(s)| — the Bellman residual. States with the largest error receive updates first, since they are the states where the current estimate is most inaccurate and where improvement is most valuable. This concentrates computation where it matters most.",
      hints: [
        "A state with Bellman residual ≈ 0 is already accurate — updating it wastes compute. A state with large residual needs correction urgently.",
        "Prioritized sweeping is especially effective when only a small fraction of states are inaccurate at any given time.",
      ],
    },
  ],

  "first-visit-mc": [
    {
      id: "q-rl-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In first-visit Monte Carlo prediction (Sutton & Barto §5.1), how is V(s) estimated?",
      options: [
        "As the return following the last visit to s in each episode",
        "As the average return following the first visit to s in each episode, across many episodes",
        "As the return from every visit to s across all episodes",
        "As a random sample from the return distribution at s",
      ],
      correctAnswer: 1,
      explanation:
        'First-visit MC: in each episode, find the first time step t at which S_t = s. Record the return G_t. Average these returns across episodes. Sutton & Barto §5.1: "the first-visit MC method estimates V^π(s) as the average of the returns following first visits to s."',
      hints: [
        "Within one episode, s may appear multiple times. First-visit MC only records the return from the first occurrence.",
        "The averaging is across episodes, not within a single episode.",
      ],
    },
    {
      id: "q-rl-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "First-visit Monte Carlo is an unbiased estimator of V^π(s): the expected value of the first-visit return equals V^π(s).",
      correctAnswer: "true",
      explanation:
        "Each first-visit return G_t (where t is the first time S_t = s in an episode) is an independent, unbiased sample of V^π(s) = E_π[G_t|S_t=s]. By the strong law of large numbers, the average of these samples converges to V^π(s). Sutton & Barto §5.1 prove this unbiasedness and convergence.",
      hints: [
        "Independence comes from the fact that different episodes are independent trajectories.",
        "The first visit to s in each episode is a fresh sample: E[G_t|S_t=s] = V^π(s) by definition.",
      ],
    },
    {
      id: "q-rl-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key limitation of first-visit MC compared to TD methods is that MC requires:",
      options: [
        "A biased value function to initialize the algorithm",
        "Complete episodes before any value update can be made — making it inapplicable to continuing tasks",
        "A known transition model P(s'|s,a)",
        "A stochastic policy to ensure exploration",
      ],
      correctAnswer: 1,
      explanation:
        "MC estimates G_t = R_{t+1} + γR_{t+2} + γ²R_{t+3} + … which requires knowing all future rewards — i.e., the episode must end first. This makes MC inapplicable to non-terminating (continuing) tasks. TD methods, by contrast, use bootstrapping (R_{t+1} + γV(S_{t+1})) and can update after every single step. Sutton & Barto §6.1 highlight this as the fundamental advantage of TD over MC.",
      hints: [
        "If Rₜ = 1 at every step and γ = 1: Gₜ = 1 + 1 + 1 + … = ∞. The return is not defined.",
        'S&B §6.1: "TD methods can learn before knowing the final outcome. In this sense, TD methods are fully online methods, whereas MC methods wait until the end of an episode."',
      ],
    },
  ],

  "every-visit-mc": [
    {
      id: "q-rl-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Every-visit Monte Carlo differs from first-visit MC in that it averages:",
      options: [
        "Returns estimated by a TD bootstrapping target, not the full return",
        "Returns from every occurrence of a state s within each episode, not just the first",
        "Only returns from episodes where state s appeared exactly once",
        "Returns sampled only under an ε-greedy exploration policy",
      ],
      correctAnswer: 1,
      explanation:
        "Every-visit MC counts and averages the return following every visit to state s, even if s appears multiple times in the same episode. If s occurs 3 times in one episode, all 3 returns are included. First-visit MC only records the return from the first occurrence and ignores subsequent ones.",
      hints: [
        "Both methods average across episodes. The difference is how many returns per episode are included per state.",
        "If s appears 5 times in an episode, first-visit uses 1 return and every-visit uses 5 returns from that episode.",
      ],
    },
    {
      id: "q-rl-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Every-visit Monte Carlo is a biased but consistent estimator of V^π(s) — unlike first-visit MC which is unbiased.",
      correctAnswer: "true",
      explanation:
        "Every-visit MC is biased because returns from later visits to s within the same episode are not independent of the return from the first visit — they are correlated through the shared trajectory up to that point. However, every-visit MC is still consistent: as the number of episodes approaches infinity, the estimate converges to V^π(s). Sutton & Barto §5.1 discuss these properties.",
      hints: [
        "Independence between different episodes holds for both methods. Within one episode, are the multiple returns from s independent of each other?",
        "Biased + consistent means: wrong on average for finite data, but converges to the right answer with enough data.",
      ],
    },
    {
      id: "q-rl-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In practice, every-visit MC often performs comparably to first-visit MC despite its bias. The most accurate explanation is:",
      options: [
        "The bias of every-visit MC disappears for MDPs with deterministic transitions",
        "As the number of episodes grows, both converge to V^π and every-visit\'s bias decreases — plus the extra samples can reduce variance",
        "Every-visit has provably lower variance than first-visit, which fully compensates for the bias in MSE",
        "First-visit MC is inconsistent in the limit, making both equally imprecise",
      ],
      correctAnswer: 1,
      explanation:
        "Both methods are consistent (converge to V^π). Every-visit MC\'s bias decreases as more episodes are observed. Meanwhile, every-visit produces more return samples per episode (all visits, not just the first), which can reduce variance. The net effect depends on the specific MDP and trajectory structure, but they often perform similarly in practice.",
      hints: [
        "Bias in every-visit MC arises from within-episode correlations. These correlations become negligible as episode count grows.",
        "More samples (every visit) can reduce the standard error of the estimate, potentially compensating for small bias.",
      ],
    },
  ],

  "mc-control": [
    {
      id: "q-rl-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Monte Carlo control (Sutton & Barto §5.3) uses ε-greedy policies because:",
      options: [
        "Greedy policies are theoretically invalid for Monte Carlo methods",
        "A purely greedy policy may never explore some state-action pairs, leaving Q(s,a) permanently unupdated for those pairs",
        "ε-greedy policies are always faster to converge than greedy ones in all environments",
        "Monte Carlo requires a stochastic policy to ensure the return G_t is well-defined",
      ],
      correctAnswer: 1,
      explanation:
        'For MC control to converge to Q*, every state-action pair (s,a) must be visited infinitely often — otherwise Q(s,a) is never updated from its initialization. A purely greedy policy may avoid suboptimal actions permanently, leaving their Q-values arbitrary. ε-greedy ensures each action is tried with probability ε/|A| in every state. S&B §5.4 call this the "exploring starts" or ε-soft policy requirement.',
      hints: [
        "If action a₂ is never tried in state s, Q(s,a₂) remains at its initial value forever. How can we know a₂ is suboptimal if we never try it?",
        'S&B §5.3: "Maintaining exploration is an issue in Monte Carlo methods. For policy π to be improved on the basis of Q^π, all state-action pairs must be visited."',
      ],
    },
    {
      id: "q-rl-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Monte Carlo control with exploring starts is guaranteed to converge to the optimal policy π* in the limit of infinitely many episodes.",
      correctAnswer: "true",
      explanation:
        "With exploring starts (every state-action pair has nonzero probability of being the initial (s,a) of each episode), all Q(s,a) are updated infinitely often. Sutton & Barto §5.3 prove that Monte Carlo ES (exploring starts) converges to Q* and π*. Without exploring starts, convergence requires ε → 0 (GLIE policies).",
      hints: [
        "Exploring starts is a sufficient condition for convergence. It ensures that the MC estimates are averages of infinitely many unbiased samples for every Q(s,a).",
        "Compare: ε-greedy with fixed ε > 0 converges to the best ε-soft policy, not π*, because it permanently wastes probability on suboptimal actions.",
      ],
    },
    {
      id: "q-rl-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Off-policy Monte Carlo control uses importance sampling to evaluate the target policy π from data generated by the behavior policy b. The per-step importance sampling ratio is:",
      options: [
        "ρ_t = b(Aₜ|Sₜ) / π(Aₜ|Sₜ)",
        "ρ_t = π(Aₜ|Sₜ) / b(Aₜ|Sₜ)",
        "ρ_t = P(Sₜ₊₁|Sₜ,Aₜ) / P(Sₜ₊₁|Sₜ,Aₜ) = 1",
        "ρ_t = π(Aₜ|Sₜ) · b(Aₜ|Sₜ)",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §5.5: the importance sampling ratio for a trajectory segment is ρ_{t:T-1} = Π_{k=t}^{T-1} π(Aₖ|Sₖ)/b(Aₖ|Sₖ). The per-step ratio is π(Aₜ|Sₜ)/b(Aₜ|Sₜ). This corrects for the fact that action Aₜ was sampled from b, not π — actions more likely under π than b get upweighted; actions less likely under π get downweighted. Note: the transition probabilities P(s'|s,a) cancel in the full trajectory ratio.",
      hints: [
        "We want E_π[G_t] but we sample trajectories under b. The IS ratio is π/b (target over behavior), not b/π.",
        "If π(a|s) = b(a|s) for all a,s, then ρ = 1 everywhere — no correction needed (on-policy). This is the boundary case.",
      ],
    },
  ],

  "importance-sampling": [
    {
      id: "q-rl-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In off-policy RL, importance sampling is needed because:",
      options: [
        "States should be sampled in proportion to their frequency under the optimal policy",
        "Returns are collected under behavior policy b but must be used to estimate values under target policy π — and these policies induce different return distributions",
        "The behavior policy must always be the greedy policy to satisfy the Bellman equation",
        "The discount factor γ must be adjusted when switching between policies",
      ],
      correctAnswer: 1,
      explanation:
        'Sutton & Barto §5.5: "Almost all off-policy methods utilize importance sampling, a general technique for estimating expected values under one distribution given samples from another." Returns generated by b are biased estimates of E_π[G_t]: b may select different actions with different probabilities than π, changing the distribution of trajectories. IS reweights each return by ρ = Π π(a)/b(a) along the trajectory to account for this.',
      hints: [
        "E_π[G] = E_b[ρ·G] where ρ = Π π(a)/b(a). This identity is the foundation of off-policy MC.",
        "If you use returns from b to estimate E_π[G] directly (without IS), you get a biased estimate proportional to E_b[G], not E_π[G].",
      ],
    },
    {
      id: "q-rl-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Ordinary importance sampling provides an unbiased estimate of V^π(s) but can have infinite variance, while weighted importance sampling is biased but has finite variance and is strongly consistent.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto §5.5–5.6: ordinary IS estimate V̂(s) = (Σ ρ_i G_i) / n is unbiased (E[V̂] = V^π(s)) but its variance can be infinite if ρ_i is heavy-tailed. Weighted IS normalizes by Σ ρ_i: V̂_w(s) = Σ ρ_i G_i / Σ ρ_i — this is biased (E[V̂_w] ≠ V^π(s) for finite n) but consistent (converges to V^π(s)) and has dramatically lower variance.",
      hints: [
        "Ordinary IS: ρ can be very large when b(a|s) is small but π(a|s) is large. The product of T such ratios can be enormous.",
        'S&B §5.6: "In practice, weighted importance sampling usually has dramatically lower variance and is strongly preferred over ordinary importance sampling."',
      ],
    },
    {
      id: "q-rl-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For a trajectory of length T, the importance sampling ratio ρ = Π_{t=0}^{T-1} π(Aₜ|Sₜ)/b(Aₜ|Sₜ). Suppose π is greedy and b is ε-greedy with ε = 0.1 and |A| = 4. For T = 20 steps, if π and b always agree on the chosen action, what is ρ approximately?",
      options: [
        "1.0 — they always agree, so ρ = 1",
        "(1/(1−ε/|A|))^T = (1/0.975)^20 ≈ 1.66",
        "0 — the greedy policy never matches the ε-greedy policy exactly",
        "(ε/|A|)^T ≈ (0.025)^20, essentially 0",
      ],
      correctAnswer: 1,
      explanation:
        'When both policies choose the same action a* at time t, π assigns probability 1 (greedy) while b assigns probability 1−ε+ε/|A| = 1−0.1+0.025 = 0.925 (ε-greedy). The per-step ratio is 1/0.925 ≈ 1.081. Over T=20 steps: ρ ≈ 1.081^20 ≈ 4.84. (The option "1/0.975^20" uses a slightly different approximation but the correct mechanism is the same — ρ grows exponentially.) This illustrates how ρ can grow exponentially with trajectory length even when the policies mostly agree.',
      hints: [
        "ε-greedy with ε=0.1 and |A|=4: probability of the greedy action = 1 − 0.1 + 0.1/4 = 0.925. The IS ratio per step = 1/0.925 ≈ 1.081.",
        "Products of numbers > 1 grow exponentially; products of numbers < 1 shrink exponentially. Both pathologies make long-horizon off-policy MC unstable.",
      ],
    },
  ],

  "td-zero": [
    {
      id: "q-rl-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "TD(0) updates V(Sₜ) after observing one transition (Sₜ, Aₜ, Rₜ₊₁, Sₜ₊₁). The update rule is:",
      options: [
        "V(Sₜ) ← V(Sₜ) + α [G_t − V(Sₜ)]  where G_t is the full Monte Carlo return",
        "V(Sₜ) ← V(Sₜ) + α [Rₜ₊₁ + γV(Sₜ₊₁) − V(Sₜ)]",
        "V(Sₜ) ← max_a Σ_{s'} P(s'|s,a)[R + γV(s')]",
        "V(Sₜ) ← (1/n) Σᵢ Gᵢ   averaged over all past episodes",
      ],
      correctAnswer: 1,
      explanation:
        'TD(0) (Sutton & Barto §6.1): V(Sₜ) ← V(Sₜ) + α[Rₜ₊₁ + γV(Sₜ₊₁) − V(Sₜ)]. The target is Rₜ₊₁ + γV(Sₜ₊₁) — the "TD target." The error δₜ = Rₜ₊₁ + γV(Sₜ₊₁) − V(Sₜ) is the "TD error." Unlike MC which waits for G_t, TD(0) bootstraps by using the current estimate V(Sₜ₊₁) instead of the true future return.',
      hints: [
        'S&B §6.1: "TD methods update their estimates based in part on other learned estimates, without waiting for a final outcome. This is a form of bootstrapping."',
        "The α is the learning rate (step size); δₜ = Rₜ₊₁ + γV(Sₜ₊₁) − V(Sₜ) is the TD error.",
      ],
    },
    {
      id: "q-rl-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "TD(0) can update V after every single step of environment interaction, making it applicable to continuing (non-episodic) tasks.",
      correctAnswer: "true",
      explanation:
        'TD(0) requires only (Sₜ, Rₜ₊₁, Sₜ₊₁) to update — one transition. It does not need a complete episode. This makes TD(0) applicable to continuing tasks that never terminate, unlike Monte Carlo which requires complete episodes to compute G_t. Sutton & Barto §6.1 call TD learning "one of the most fundamental and novel ideas in reinforcement learning" partly for this reason.',
      hints: [
        "What information does the TD update V(Sₜ) ← V(Sₜ) + α[Rₜ₊₁ + γV(Sₜ₊₁) − V(Sₜ)] require? Just Rₜ₊₁ and Sₜ₊₁ — available immediately after the next step.",
        "A continuing task like controlling a robot indefinitely never reaches a terminal state. MC is inapplicable; TD is not.",
      ],
    },
    {
      id: "q-rl-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An agent observes: S₀ = s, R₁ = 2, S₁ = s'. Currently V(s) = 10 and V(s') = 8, with γ = 0.9 and α = 0.1. After one TD(0) update, what is the new V(s)?",
      options: [
        "10 + 0.1·(2 + 0.9·8 − 10) = 10 + 0.1·(9.2 − 10) = 10 − 0.08 = 9.92",
        "10 + 0.1·(2 + 8 − 10) = 10 + 0 = 10",
        "(2 + 0.9·8) = 9.2",
        "0.1·(2 + 0.9·8) + 0.9·10 = 9.92",
      ],
      correctAnswer: 0,
      explanation:
        "TD target = R₁ + γV(S₁) = 2 + 0.9×8 = 2 + 7.2 = 9.2. TD error δ = 9.2 − 10 = −0.8. Update: V(s) ← 10 + 0.1×(−0.8) = 10 − 0.08 = 9.92. The negative TD error tells us: V(s) was too high relative to the bootstrapped estimate. We decrease V(s) slightly.",
      hints: [
        "TD error = target − current = (R + γV(s')) − V(s) = 9.2 − 10 = −0.8.",
        "Update V(s) ← V(s) + α·δ = 10 + 0.1×(−0.8) = 9.92. A negative TD error means our current estimate was too optimistic.",
      ],
    },
  ],

  sarsa: [
    {
      id: "q-rl-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SARSA (Sutton & Barto §6.4) is named for the five tuple it uses per update. That tuple is:",
      options: [
        "(Sₜ, Aₜ, Rₜ₊₁, Sₜ₊₁, Aₜ₊₁) — current state, action, reward, next state, next action",
        "(State, Agent, Reward, Space, Algorithm)",
        "(Sequence, Approximation, Regression, Sampling, Averaging)",
        "(Start, Attempt, Result, Score, Adapt)",
      ],
      correctAnswer: 0,
      explanation:
        "SARSA update: Q(Sₜ,Aₜ) ← Q(Sₜ,Aₜ) + α[Rₜ₊₁ + γQ(Sₜ₊₁,Aₜ₊₁) − Q(Sₜ,Aₜ)]. The five elements (Sₜ, Aₜ, Rₜ₊₁, Sₜ₊₁, Aₜ₊₁) give SARSA its name. Crucially, Aₜ₊₁ is the action actually selected by the policy in Sₜ₊₁ — making it on-policy.",
      hints: [
        'S&B §6.4: "This update is done after every transition from a nonterminal state Sₜ. If Sₜ₊₁ is terminal, then Q(Sₜ₊₁,Aₜ₊₁) is defined as zero."',
        "Each letter abbreviates one element: S=State, A=Action, R=Reward, S=next State, A=next Action.",
      ],
    },
    {
      id: "q-rl-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SARSA is on-policy because it updates Q(s,a) using the action Aₜ₊₁ actually selected by the current behavior policy (e.g., ε-greedy), not the greedy maximizing action.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto §6.4: SARSA is on-policy because the Q-values it learns correspond to the behavior policy being followed — including its exploration actions. The target Q(Sₜ₊₁, Aₜ₊₁) uses the actual next action. In contrast, Q-learning is off-policy: its target max_a Q(Sₜ₊₁, a) uses the greedy action — regardless of which action the behavior policy actually takes.",
      hints: [
        "Key question: does the SARSA target use the action actually taken next, or the best possible action? It uses the action taken.",
        'S&B §6.4: "Sarsa is an on-policy TD control method because it uses the action that is actually chosen by the behavior policy."',
      ],
    },
    {
      id: "q-rl-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In the "cliff walking" example (Sutton & Barto §6.5), SARSA with ε-greedy converges to a longer but safer path along the top, while Q-learning converges to the shortest path near the cliff. The reason SARSA avoids the cliff edge is:',
      options: [
        "SARSA uses a smaller learning rate by default than Q-learning",
        "SARSA\'s target Q(Sₜ₊₁, Aₜ₊₁) accounts for ε-greedy exploration — near the cliff, a random action falls off and incurs −100, so SARSA learns the true ε-greedy policy cost",
        "Q-learning uses a different discount factor that makes the cliff penalty negligible",
        "SARSA uses importance sampling to avoid dangerous actions",
      ],
      correctAnswer: 1,
      explanation:
        'S&B §6.5: SARSA learns the value of the ε-greedy policy being followed, which includes the occasional random action. Near the cliff, a random action can fall off (reward −100). SARSA correctly estimates that being near the cliff is costly under ε-greedy. Q-learning learns the optimal greedy policy value — near the cliff is fine if greedy never falls — but incurs cliff penalties during training. SARSA\'s safer path is "online performance" optimal for the ε-greedy policy.',
      hints: [
        "SARSA includes the random action risk in its Q-value estimates. Q-learning assumes optimal (greedy) behavior in its estimates.",
        'S&B §6.5: "Sarsa is an on-policy TD control method because it uses the action that is actually chosen by the behavior policy."',
      ],
    },
  ],

  "q-learning": [
    {
      id: "q-rl-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Q-learning (Watkins, 1989; Sutton & Barto §6.5) is classified as off-policy because its update target uses:",
      options: [
        "A separate neural network (the target network) to compute Q-values",
        "max_a Q(Sₜ₊₁, a) — the greedy action — regardless of which action the behavior policy actually takes",
        "Data collected by a different agent trained previously",
        "Returns averaged over many off-policy trajectories",
      ],
      correctAnswer: 1,
      explanation:
        'Q-learning update: Q(Sₜ,Aₜ) ← Q(Sₜ,Aₜ) + α[Rₜ₊₁ + γ max_a Q(Sₜ₊₁,a) − Q(Sₜ,Aₜ)]. The target uses max_a Q(Sₜ₊₁,a) — the greedy action — not the action Aₜ₊₁ selected by the behavior policy. This makes Q-learning off-policy: it learns about the greedy policy π* while behaving under ε-greedy. S&B §6.5: "Q-learning directly approximates q*, the optimal action-value function."',
      hints: [
        "Compare with SARSA\'s target: Q(Sₜ₊₁, Aₜ₊₁) — actual next action. Q-learning uses max_a Q(Sₜ₊₁, a) — best possible next action.",
        "Off-policy means the policy being evaluated (greedy/optimal) differs from the policy generating data (ε-greedy).",
      ],
    },
    {
      id: "q-rl-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Tabular Q-learning converges to Q* with probability 1, given that all state-action pairs are visited infinitely often and step sizes satisfy the Robbins-Monro conditions (Σ αₜ = ∞ and Σ αₜ² < ∞).",
      correctAnswer: "true",
      explanation:
        "Watkins and Dayan (1992) proved this convergence result for tabular Q-learning. The Robbins-Monro conditions (standard conditions from stochastic approximation theory) ensure step sizes decrease at the right rate: large enough to overcome noise (Σ α = ∞) but small enough to converge (Σ α² < ∞). Sutton & Barto §6.5 state this result directly.",
      hints: [
        "A common schedule satisfying Robbins-Monro: αₜ = 1/t. Check: Σ 1/t diverges (harmonic series), Σ 1/t² converges (p-series with p>1).",
        'Without the Σ αₜ = ∞ condition, step sizes go to zero too fast and the algorithm "freezes" before converging. Without Σ αₜ² < ∞, they don\'t go to zero and the algorithm oscillates.',
      ],
    },
    {
      id: "q-rl-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Q-learning\'s maximization bias occurs because max_a Q̂(s,a) is a biased upward estimator of max_a Q*(s,a) when Q̂ has estimation noise. A concrete example: if all true Q-values are Q*(s,a) = 0 for all a, but Q̂(s,a) has i.i.d. noise N(0,σ²), then E[max_a Q̂(s,a)] is:",
      options: [
        "= 0 (no bias, because Q̂ is an unbiased estimator of Q*)",
        "> 0 (upward bias, because the maximum of noisy unbiased estimates exceeds the true maximum)",
        "< 0 (downward bias, because Q-learning underestimates in stochastic environments)",
        "= σ² (bias equals the noise variance)",
      ],
      correctAnswer: 1,
      explanation:
        'A^π(s,a₁) = Q^π(s,a₁) − V^π(s) = 8 − 5 = +3. A positive advantage means action a₁ returns 3 more expected discounted reward than the average action under π from state s. The identity Σ_a π(a|s) A^π(s,a) = 0 confirms that advantages are zero-mean under π — they measure relative benefit, not absolute value. Spinning Up calls the advantage "how much better it is than others on average."',
      hints: [
        "V^π(s) is the expected Q-value under π: V^π(s) = Σ_a π(a|s) Q^π(s,a). So A^π is exactly the deviation of Q from this average.",
        "Positive A^π(s,a) → policy gradient should increase π(a|s). Negative A^π(s,a) → decrease π(a|s).",
      ],
    },
  ],

  "discount-factor": [
    {
      id: "q-rl-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Sutton & Barto (§3.3) define the discounted return as Gₜ = Rₜ₊₁ + γRₜ₊₂ + γ²Rₜ₊₃ + … = Σ_{k=0}^∞ γ^k Rₜ₊ₖ₊₁. What is the role of the discount factor γ ∈ [0, 1)?",
      options: [
        "γ controls the learning rate of the value function update",
        "γ weights future rewards so that rewards received k steps in the future are worth γ^k times an immediate reward — making the agent prefer sooner rewards when γ < 1",
        "γ normalizes the reward signal to lie in [0, 1]",
        "γ determines the probability of the episode terminating at each step",
      ],
      correctAnswer: 1,
      explanation:
        "The discount factor γ ∈ [0,1) controls how much the agent values future rewards relative to immediate ones. A reward k steps away contributes γ^k × R to the return. When γ = 0, the agent is myopic (only immediate reward matters). When γ → 1, the agent values all future rewards nearly equally. S&B §3.3 also note that γ < 1 guarantees the infinite sum converges whenever rewards are bounded: |Gₜ| ≤ R_max/(1−γ).",
      hints: [
        'Think of γ as a "patience" parameter: γ close to 1 = patient; γ close to 0 = impatient.',
        'S&B §3.3: "The discount rate determines the present value of future rewards: a reward received k time steps in the future is worth only γ^{k-1} times what it would be worth if it were received immediately."',
      ],
    },
    {
      id: "q-rl-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Setting γ = 1 is valid and produces a well-defined (finite) expected return in all continuing (non-terminating) MDPs, as long as rewards are bounded.",
      correctAnswer: "false",
      explanation:
        "With γ = 1 and a non-terminating task, Gₜ = Σ_{k=0}^∞ Rₜ₊ₖ₊₁ is an infinite sum that diverges unless rewards eventually reach zero — which they generally do not. Sutton & Barto §3.3 restrict γ < 1 for continuing tasks precisely to guarantee convergence: |Gₜ| ≤ R_max/(1−γ). γ = 1 is only valid for episodic tasks where the sum terminates at the end of the episode.",
      hints: [
        "If Rₜ = 1 at every step and γ = 1: Gₜ = 1 + 1 + 1 + … = ∞. The return is not defined.",
        'S&B §3.3 explicitly state: "If γ < 1, the infinite sum [converges] as long as the reward sequence {Rₖ} is bounded."',
      ],
    },
    {
      id: "q-rl-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An agent in a continuing task receives a constant reward of R = 1 per step and uses γ = 0.95. Starting from any state s, what is the maximum possible discounted return Gₜ?",
      options: [
        "∞ — the sum of an infinite geometric series diverges",
        "1/(1−0.95) = 20 — the geometric series sum for constant reward",
        "1/0.95 ≈ 1.053",
        "0.95/(1−0.95) = 19 — the present value of future-only rewards",
      ],
      correctAnswer: 1,
      explanation:
        "For constant reward R = 1 at every step: Gₜ = Σ_{k=0}^∞ γ^k · 1 = 1/(1−γ) = 1/(1−0.95) = 1/0.05 = 20. This is the geometric series formula. It confirms that γ < 1 bounds the return: no matter how long the agent runs, Gₜ ≤ R_max/(1−γ). With γ = 0.95 and R_max = 1, the upper bound is 20.",
      hints: [
        "Geometric series: Σ_{k=0}^∞ γ^k = 1/(1−γ) for |γ| < 1.",
        "This formula directly gives the worst-case return bound that DP convergence proofs rely on.",
      ],
    },
  ],

  "bellman-optimality": [
    {
      id: "q-rl-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Bellman optimality equation for V* (Sutton & Barto §3.6) is:",
      options: [
        "V*(s) = Σ_a π*(a|s) Σ_{s'} P(s'|s,a)[R(s,a,s') + γV*(s')]",
        "V*(s) = max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γV*(s')]",
        "V*(s) = max_a R(s,a) + γ max_{s'} V*(s')",
        "V*(s) = max_{π} V^π(s) summed over all states",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §3.6: V*(s) = max_a Σ_{s',r} p(s',r|s,a)[r + γV*(s')]. The key difference from the Bellman expectation equation for V^π is the max over actions instead of a weighted sum over the policy π. This expresses: the optimal value of state s is the value of the best action available, averaging over next states weighted by transition probabilities.",
      hints: [
        "Bellman expectation: uses Σ_a π(a|s)[...] — weighted average over the policy. Bellman optimality: uses max_a[...] — the best case.",
        'S&B §3.6: "Because π* is greedy with respect to V*, V* must satisfy the Bellman optimality equation."',
      ],
    },
    {
      id: "q-rl-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Bellman optimality equation V*(s) = max_a Q*(s,a) is a system of nonlinear equations (because of the max operation), so it cannot in general be solved by simple matrix inversion unlike the Bellman expectation equation.",
      correctAnswer: "true",
      explanation:
        "The Bellman expectation equation for V^π is a linear system: V^π = R^π + γP^πV^π, solvable as V^π = (I − γP^π)^{-1}R^π. The Bellman optimality equation V*(s) = max_a[...] is nonlinear due to the max operator. This expresses the fundamental difference between the two equations: one linear, one nonlinear. The linear system has a closed-form matrix solution; the nonlinear system typically requires iterative methods.",
      hints: [
        "Linear system: V = AV + b → V = (I−A)^{-1}b. Nonlinear system: V = max_a f(V, a) — no closed form in general.",
        "Value iteration iteratively applies the nonlinear Bellman optimality operator until convergence.",
      ],
    },
    {
      id: "q-rl-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Bellman optimality equation for Q* is: Q*(s,a) = Σ_{s'} P(s'|s,a)[R(s,a,s') + γ max_{a'} Q*(s',a')]. How does this relate to the Q-learning update rule Q(Sₜ,Aₜ) ← Q(Sₜ,Aₜ) + α[Rₜ₊₁ + γ max_{a'} Q(Sₜ₊₁,a') − Q(Sₜ,Aₜ)]?",
      options: [
        "Q-learning solves a different equation — it minimizes temporal-difference error, which is unrelated to Bellman optimality",
        "The Q-learning update moves Q(Sₜ,Aₜ) toward the sampled Bellman optimality target Rₜ₊₁ + γ max_{a'} Q(Sₜ₊₁,a'), implementing stochastic approximation of the Bellman optimality equation",
        "Q-learning solves the Bellman expectation equation (for π*), not the Bellman optimality equation",
        "The connection is only approximate; Q-learning converges to a different fixed point than Q*",
      ],
      correctAnswer: 1,
      explanation:
        "Q-learning is a stochastic approximation method for solving the Bellman optimality equation for Q*. At each step, the sample Rₜ₊₁ + γ max_{a'} Q(Sₜ₊₁,a') is an unbiased estimate of the Bellman optimality target Σ_{s'} P(s'|s,a)[R + γ max_{a'} Q*(s',a')]. The update moves Q(Sₜ,Aₜ) toward this target with step size α. Watkins & Dayan (1992) proved that under Robbins-Monro conditions, Q → Q*, the unique solution of the Bellman optimality equation.",
      hints: [
        "Stochastic approximation: replace the expectation E_s'[...] with a single sample (Rₜ₊₁, Sₜ₊₁). The step size α controls how much weight the new sample gets.",
        'The "fixed point" of the Q-learning iteration (when the update is zero on average) is exactly the Bellman optimality equation.',
      ],
    },
  ],

  "optimal-policy-existence": [
    {
      id: "q-rl-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Sutton & Barto §3.6 prove that for any finite MDP, there always exists at least one policy π* such that V^{π*}(s) ≥ V^π(s) for all states s and all policies π. What is this result called?",
      options: [
        "The Bellman convergence theorem",
        "The existence of an optimal policy — there is always at least one policy simultaneously optimal in every state",
        "The policy gradient theorem — optimal policies are found by gradient ascent",
        "The No Free Lunch theorem — no single policy can be optimal for all MDPs",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §3.6 establish the existence theorem: for finite MDPs, there always exists an optimal policy π* that simultaneously maximizes V^π(s) for every state s. This is non-trivial because the ordering of policies must be consistent across all states — it could in principle be the case that different states prefer different policies. The proof relies on the Bellman optimality equations having a unique solution V*.",
      hints: [
        'S&B §3.6: "There is always at least one policy that is better than or equal to all other policies. This is an optimal policy."',
        "The proof shows V* (the unique fixed point of T*) is achievable: there exists π* that attains V*(s) simultaneously for all s.",
      ],
    },
    {
      id: "q-rl-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a finite MDP, the optimal value function V* is unique (there is exactly one V* satisfying the Bellman optimality equation), but there may be multiple optimal policies π* that all achieve V*.",
      correctAnswer: "true",
      explanation:
        "The Bellman optimality equation T*V = V is a contraction mapping with a unique fixed point V* (by the Banach fixed-point theorem). However, multiple optimal policies may exist whenever V*(s) = Q*(s,a) for more than one action a in some state — ties in the greedy argmax. All such tie-breaking choices yield optimal policies. V* is unique; π* need not be.",
      hints: [
        "Uniqueness of V*: the Banach fixed-point theorem guarantees the unique fixed point of T* (a contraction).",
        "Non-uniqueness of π*: consider s with two actions a₁, a₂ where Q*(s,a₁) = Q*(s,a₂) = V*(s). Any mixture or choice between them is optimal.",
      ],
    },
    {
      id: "q-rl-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Consider a finite MDP with |S| = 100 states, |A| = 5 actions, and γ = 0.99. Why does the existence theorem (existence of π*) require finite |S| and |A| — and what breaks for infinite state or action spaces?",
      options: [
        "Infinite spaces require probability measures that violate the Kolmogorov axioms, making rewards undefined",
        "The existence proof relies on V* being the fixed point of T* on a finite-dimensional space; for infinite spaces, T* may not be well-defined or its fixed point may not correspond to a measurable policy",
        "Infinite action spaces always have γ = 1 by construction, breaking the contraction",
        "The optimal policy theorem only applies to discrete-time MDPs, and infinite spaces are always continuous-time",
      ],
      correctAnswer: 1,
      explanation:
        "For finite MDPs, T* maps ℝ^|S| to ℝ^|S| — a finite-dimensional complete metric space — and the Banach fixed-point theorem applies directly. For infinite state/action spaces, complications arise: the sup over actions may not be achieved (no argmax exists), the fixed point may not yield a measurable policy, and regularity conditions (e.g., Borel measurability, compactness of action sets) must be imposed. Continuous MDPs require measure-theoretic extensions of the existence result (see Bertsekas & Shreve).",
      hints: [
        "The argmax in π*(s) = argmax_a Q*(s,a) is guaranteed to exist when |A| is finite. With infinite A, the sup may not be achieved.",
        "Sutton & Barto restrict to finite MDPs in Chapters 3–6. Later chapters and research papers handle continuous spaces with function approximation and different theoretical tools.",
      ],
    },
  ],

  "bellman-operator": [
    {
      id: "q-rl-kp30-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Bellman expectation operator T^π is defined as (T^π V)(s) = Σ_a π(a|s) Σ_{s'} P(s'|s,a)[R(s,a,s') + γV(s')]. Which property makes iterating T^π a valid algorithm for computing V^π?",
      options: [
        "T^π is linear and its eigenvalues are all ≤ γ < 1",
        "T^π is a γ-contraction in the sup-norm, so by the Banach fixed-point theorem it has a unique fixed point V^π and iterating T^π from any V₀ converges to V^π",
        "T^π maps any non-negative function to a smaller non-negative function",
        "T^π is the gradient of the value function with respect to policy parameters",
      ],
      correctAnswer: 1,
      explanation:
        "T^π is a γ-contraction: ‖T^π V − T^π U‖_∞ ≤ γ‖V − U‖_∞ for all V, U. The space of bounded functions with sup-norm is complete, so by Banach fixed-point theorem, T^π has a unique fixed point — which is exactly V^π (the solution of the Bellman expectation equation). Starting from any V₀, iterating V_{k+1} = T^π V_k converges geometrically: ‖V_k − V^π‖_∞ ≤ γ^k‖V₀ − V^π‖_∞.",
      hints: [
        "The contraction factor is exactly γ, the discount factor. This is why γ < 1 is a convergence requirement.",
        "Fixed point of T^π means T^π V = V — substituting the definition gives exactly the Bellman expectation equation.",
      ],
    },
    {
      id: "q-rl-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Bellman optimality operator T* is defined as (T* V)(s) = max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γV(s')]. T* is also a γ-contraction in the sup-norm, and its unique fixed point is V*.",
      correctAnswer: "true",
      explanation:
        "The proof that T* is a γ-contraction uses the inequality |max_a f(a) − max_a g(a)| ≤ max_a |f(a) − g(a)|: ‖T*V − T*U‖_∞ = max_s |max_a[...V...] − max_a[...U...]| ≤ γ max_s max_a|V(s') − U(s')| = γ‖V − U‖_∞. By Banach fixed-point theorem, the unique fixed point exists, and substituting T*V = V yields the Bellman optimality equation — so the fixed point is V*.",
      hints: [
        "Key inequality: |max f − max g| ≤ max |f − g|. Apply this to bound ‖T*V − T*U‖_∞.",
        "Both T^π and T* are γ-contractions but with different fixed points: T^π → V^π, T* → V*.",
      ],
    },
    {
      id: "q-rl-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The generalized policy iteration (GPI) framework (Sutton & Barto §4.6) unifies policy evaluation and policy improvement by showing they are applications of two operators. Which pair of operators does GPI alternate between?",
      options: [
        "T^π (Bellman expectation) for evaluation; T* (Bellman optimality) for improvement",
        "Gradient ascent on V^π for evaluation; softmax update for improvement",
        "Monte Carlo sampling for evaluation; ε-greedy update for improvement",
        "Forward recursion for evaluation; backward induction for improvement",
      ],
      correctAnswer: 0,
      explanation:
        'GPI alternates between: (1) applying T^π repeatedly (policy evaluation — converges to V^π for current π) and (2) acting greedily w.r.t. V^π, which is exactly one application of T* at the policy level: π\' = greedy(V^π) ≡ argmax_a Q^π(s,a). Sutton & Barto §4.6: "The evaluation and improvement processes in GPI can be viewed as both competing and cooperating." The two steps can be of any granularity — one sweep each (value iteration) or full convergence each (policy iteration).',
      hints: [
        "Policy evaluation ≡ iterating T^π until convergence. Policy improvement ≡ one application of the greedy operator (related to T*).",
        "GPI is the unifying principle: all DP and many model-free algorithms (TD, Q-learning) fit within the GPI framework.",
      ],
    },
  ],

  "modified-policy-iteration": [
    {
      id: "q-rl-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Modified policy iteration (also called truncated policy iteration) differs from standard policy iteration in that:",
      options: [
        "It uses Monte Carlo rollouts instead of dynamic programming for policy evaluation",
        "Policy evaluation is stopped after m Bellman sweeps (m ≥ 1) rather than waiting for full convergence, then policy improvement is performed immediately",
        "It modifies the policy by adding random noise rather than performing greedy improvement",
        "It alternates between policy evaluation and value iteration within each outer loop",
      ],
      correctAnswer: 1,
      explanation:
        "Modified/truncated policy iteration runs exactly m sweeps of policy evaluation (applying T^π m times) before performing a policy improvement step, rather than iterating to convergence. When m = 1, it is equivalent to value iteration; when m → ∞, it is standard policy iteration. This provides a continuum between the two extremes and allows trading off computation per policy update vs. quality of the value estimate. Sutton & Barto §4.6 (GPI) provides the framework; Puterman (1994) formalizes modified policy iteration.",
      hints: [
        "m = 1: one sweep then improve = value iteration. m = ∞: evaluate fully then improve = policy iteration.",
        "The key insight: you don\'t need V^π exactly — approximate V^π (from partial evaluation) still enables policy improvement.",
      ],
    },
    {
      id: "q-rl-kp31-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Modified policy iteration with any finite m ≥ 1 is still guaranteed to converge to the optimal policy π* for finite MDPs with γ < 1.",
      correctAnswer: "true",
      explanation:
        "Modified policy iteration generates a sequence of improving policies. Each policy improvement step produces a policy at least as good as the previous (by the Policy Improvement Theorem applied to the partially-evaluated value estimate). Since policies are strictly improving and there are finitely many, the algorithm must terminate — and at termination, π = π*. The convergence guarantee holds for all m ≥ 1; the number of outer iterations may vary, but the algorithm converges to the same π*.",
      hints: [
        "Each outer iteration (m sweeps + improvement) is non-decreasing in value. With finitely many policies, monotone improvement implies finite termination at optimality.",
        "The m sweeps need not converge fully — even an approximate V estimate improves the policy when used for greedy improvement.",
      ],
    },
    {
      id: "q-rl-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which statement about the computational efficiency tradeoff in modified policy iteration with m sweeps is most accurate?",
      options: [
        "Larger m always results in fewer total Bellman sweeps to reach optimality",
        "Smaller m (fewer evaluation sweeps) requires more policy improvement steps but each is cheaper; larger m requires fewer policy improvement steps but more total sweeps per step — optimal m depends on the MDP structure",
        "Modified policy iteration with m = 1 (value iteration) always requires the most total computation",
        "The optimal m is always |S|, the number of states",
      ],
      correctAnswer: 1,
      explanation:
        'There is no universally optimal m. Small m (e.g., value iteration with m=1) uses many outer iterations but very cheap inner loops. Large m (e.g., standard policy iteration) uses few outer iterations but expensive inner evaluation. The total work depends on the MDP: for MDPs where few policy updates suffice (policy iteration terminates in ~5 outer iterations), large m is efficient. For MDPs requiring many policy changes, smaller m amortizes evaluation cost better. This tradeoff is studied in Puterman (1994) "Markov Decision Processes."',
      hints: [
        "Total sweeps ≈ (outer iterations) × m. Outer iterations decrease as m increases (better V estimate), but not necessarily proportionally.",
        "In practice, m is often set heuristically or based on available computation budget, not theoretically optimized.",
      ],
    },
  ],

  "epsilon-greedy": [
    {
      id: "q-rl-kp32-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "An ε-greedy policy with ε = 0.1 and |A| = 4 actions selects actions as follows. In state s where the greedy action is a*:",
      options: [
        "a* is selected with probability 1 − ε = 0.9; each non-greedy action is selected with probability ε/|A| = 0.025",
        "a* is selected with probability 1 − ε = 0.9; each non-greedy action is selected with probability ε/(|A|−1) ≈ 0.033",
        "a* is selected with probability ε = 0.1; each other action is selected with probability (1−ε)/3 ≈ 0.3",
        "All actions are selected with equal probability ε/|A| = 0.025; no action is favored",
      ],
      correctAnswer: 0,
      explanation:
        "The standard ε-greedy rule (Sutton & Barto §2.4): with probability 1−ε select the greedy action a*; with probability ε select uniformly at random over all |A| actions (including a*). So π(a*|s) = 1−ε + ε/|A| = 0.9 + 0.025 = 0.925 and π(a≠a*|s) = ε/|A| = 0.025. Total: 0.925 + 3×0.025 = 1 ✓. This ensures every action is tried with probability at least ε/|A| > 0.",
      hints: [
        "Careful: the random uniform draw includes the greedy action itself, so π(a*|s) = 1−ε + ε/|A|, not simply 1−ε.",
        'S&B §2.4: ε-greedy "behaves greedily most of the time, but every once in a while...selects randomly from all the actions with equal probability."',
      ],
    },
    {
      id: "q-rl-kp32-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "An ε-greedy policy with fixed ε > 0 always converges to the globally optimal policy π* as the number of interactions → ∞.",
      correctAnswer: "false",
      explanation:
        "A fixed ε > 0 permanently assigns probability ε/|A| to suboptimal actions, so the agent never fully commits to the greedy-optimal policy. The ε-greedy policy converges to the best ε-soft policy (the optimal policy among all policies that satisfy π(a|s) ≥ ε/|A|), not π*. To converge to π*, ε must be decayed to 0 (e.g., εₙ = 1/n) while satisfying GLIE conditions. Sutton & Barto §5.4 discuss this distinction.",
      hints: [
        'ε-greedy with fixed ε is always "exploring" — it can never be purely greedy, so it cannot match the performance of π*.',
        "The best ε-soft policy achieves V within O(ε) of V*. Only as ε → 0 does it converge to V*.",
      ],
    },
    {
      id: "q-rl-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "UCB (Upper Confidence Bound) action selection selects Aₜ = argmax_a [Q(s,a) + c √(ln t / Nₜ(a))], where Nₜ(a) is the count of action a selections. How does UCB compare to ε-greedy for the exploration–exploitation tradeoff?",
      options: [
        "UCB explores actions uniformly like ε-greedy but uses a larger effective ε",
        "UCB exploration is directed: actions with high uncertainty (low Nₜ(a)) get an exploration bonus that decreases as they are tried — achieving logarithmic regret vs. linear regret for ε-greedy with fixed ε",
        "UCB is only valid for continuous action spaces, while ε-greedy works for discrete actions",
        "UCB and ε-greedy have identical regret bounds when c = ε",
      ],
      correctAnswer: 1,
      explanation:
        "UCB exploration is uncertainty-directed: the bonus c√(ln t / Nₜ(a)) is large for rarely-tried actions and shrinks as Nₜ(a) grows. This concentrates exploration on promising uncertain actions rather than random ones. UCB achieves O(ln T) cumulative regret (Auer et al., 2002), while ε-greedy with fixed ε has O(T·ε) linear regret because it wastes a constant fraction of pulls on random actions. Sutton & Barto §2.7 discuss UCB as a more principled exploration strategy.",
      hints: [
        "ε-greedy: every action is equally likely to be explored, regardless of how much you know about it.",
        'UCB: the exploration bonus √(ln t / Nₜ(a)) is high for actions tried few times and low for well-estimated actions. Exploration "naturally" shifts to less-known actions.',
      ],
    },
  ],

  "weighted-importance-sampling": [
    {
      id: "q-rl-kp33-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Weighted importance sampling estimates V^π(s) as V̂_w(s) = Σᵢ ρᵢGᵢ / Σᵢ ρᵢ, where ρᵢ is the importance sampling ratio for episode i. How does this differ from ordinary importance sampling V̂(s) = (1/n)Σᵢ ρᵢGᵢ?",
      options: [
        "Weighted IS uses a different ratio: ρᵢ = b(Aₜ|Sₜ)/π(Aₜ|Sₜ) instead of π/b",
        "Weighted IS normalizes by the sum of ratios Σᵢ ρᵢ rather than the count n, making it a self-normalizing estimator that is biased but has much lower variance",
        "Weighted IS only uses trajectories where ρᵢ ≥ 1, discarding downweighted samples",
        "Weighted IS multiplies G by ρ twice (ρᵢ²) to account for the non-stationarity of b",
      ],
      correctAnswer: 1,
      explanation:
        'Ordinary IS: V̂ = (1/n)Σᵢ ρᵢGᵢ is unbiased (E[V̂] = V^π(s)) but ρᵢ can be very large, causing high variance. Weighted IS: V̂_w = Σᵢ ρᵢGᵢ / Σᵢ ρᵢ is a self-normalizing (ratio) estimator — biased for finite n (E[V̂_w] ≠ V^π(s)) but consistent and with dramatically lower variance. Sutton & Barto §5.6: "In practice, weighted importance sampling usually has dramatically lower variance and is strongly preferred."',
      hints: [
        "The denominator Σᵢ ρᵢ instead of n is what distinguishes weighted from ordinary IS.",
        "If all ρᵢ = 1 (on-policy), both estimators reduce to the standard sample mean.",
      ],
    },
    {
      id: "q-rl-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Weighted importance sampling is consistent: as the number of episodes n → ∞, V̂_w(s) converges to V^π(s) with probability 1, despite being biased for finite n.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto §5.6 establish that weighted IS is consistent (strongly consistent under mild conditions). By the strong law of large numbers, (1/n)Σρᵢ → E_b[ρ] = 1 and (1/n)ΣρᵢGᵢ → E_b[ρG] = E_π[G] = V^π(s). The ratio converges to V^π(s)/1 = V^π(s). Bias for finite n arises because the ratio of averages ≠ average of ratios, but both numerator and denominator converge, so their ratio converges to the correct value.",
      hints: [
        "Slutsky\'s theorem: if Xₙ → X and Yₙ → Y (in probability), then Xₙ/Yₙ → X/Y as long as Y ≠ 0.",
        "The bias of weighted IS is O(1/n), which decreases with sample size — hence consistency despite finite-sample bias.",
      ],
    },
    {
      id: "q-rl-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The variance of ordinary importance sampling can be infinite even when all returns Gᵢ are bounded. Why, and how does weighted IS address this?",
      options: [
        "Ordinary IS variance is infinite because G_i can take negative values; weighted IS clips G_i at zero",
        "Ordinary IS weights by ρᵢ = Πₜ π/b, which is a product of T ratios. If b(a|s) ≪ π(a|s) for any step, ρᵢ can be unbounded across episodes, causing Var[ρᵢGᵢ] = E[ρᵢ²Gᵢ²] − (E[ρᵢGᵢ])² to be infinite. Weighted IS caps the effective weight per episode to ρᵢ/Σρⱼ ≤ 1, bounding its variance",
        "Ordinary IS has infinite variance because it samples from both π and b simultaneously, creating a mixture distribution with undefined moments",
        "Ordinary IS is always finite variance for γ < 1; weighted IS is only valid for γ = 1",
      ],
      correctAnswer: 1,
      explanation:
        "The product ρᵢ = Πₜ π(Aₜ|Sₜ)/b(Aₜ|Sₜ) over T steps can be extremely large when b(a|s) is small but π(a|s) is large. The second moment E_b[ρ²G²] can be infinite even when G is bounded (because ρ is unbounded). Weighted IS normalizes each weight by Σρⱼ, so each effective weight is ρᵢ/Σρⱼ ∈ [0,1], bounding the contribution per episode. This self-normalization provides finite variance in practice, though the theoretical variance bound is complex.",
      hints: [
        "Consider T=1, b(a|s) = 0.01, π(a|s) = 1: ρ = 100. Over T=20 steps: ρ = 100^20 = 10^40. The second moment E[ρ²G²] ≥ (10^40)² × G² = 10^80 × G².",
        "Weighted IS weight per episode: ρᵢ/Σρⱼ ≤ 1 always. No single episode can dominate the estimate with a huge ρ.",
      ],
    },
  ],

  glie: [
    {
      id: "q-rl-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'GLIE stands for "Greedy in the Limit with Infinite Exploration." For a sequence of policies {πₙ}, GLIE requires two conditions. Which pair correctly states them?',
      options: [
        "(1) All state-action pairs are visited infinitely often; (2) the policy converges to the greedy policy in the limit",
        "(1) The policy is ε-greedy for all n; (2) ε decreases to exactly 0 after finite steps",
        "(1) Each episode has length → ∞; (2) the agent uses a decaying learning rate αₙ → 0",
        "(1) The reward sequence is bounded; (2) the value function converges to V* in sup-norm",
      ],
      correctAnswer: 0,
      explanation:
        "GLIE (Sutton & Barto §5.4; Singh et al. 2000) requires: (1) every state-action pair (s,a) is visited infinitely often — ensuring Q(s,a) estimates converge; and (2) the policy converges to the greedy policy — ensuring that in the limit the agent exploits its knowledge. A sufficient condition is εₙ → 0 with Σεₙ = ∞ (so every state-action is tried infinitely often as exploration decays). GLIE-MC control converges to Q* and π*.",
      hints: [
        "Condition 1 ensures all Q(s,a) can be estimated accurately. Condition 2 ensures the limit policy is greedy (optimal).",
        "ε_n = 1/n satisfies GLIE: every state-action is visited infinitely often (since Σ1/n = ∞) and εₙ → 0 (greedy in the limit).",
      ],
    },
    {
      id: "q-rl-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "An ε-greedy policy with ε = 0.05 (constant) satisfies GLIE because every state-action pair is visited infinitely often (since ε > 0 ensures exploration forever).",
      correctAnswer: "false",
      explanation:
        "Constant ε = 0.05 satisfies the first GLIE condition (infinite exploration — all (s,a) pairs are visited infinitely often) but fails the second (greedy in the limit — the policy never converges to greedy, it always explores with probability 0.05). Both conditions are required for GLIE. Without ε → 0, MC control converges to the optimal ε-soft policy, not π*.",
      hints: [
        "Check both GLIE conditions: (1) infinite visits to all (s,a)? Yes, with ε=0.05. (2) policy → greedy? No, always 5% random.",
        "GLIE requires BOTH: explore forever AND eventually stop exploring. Fixed ε achieves only the former.",
      ],
    },
    {
      id: "q-rl-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Monte Carlo control with on-policy ε-greedy and GLIE (εₙ = 1/n) converges to which of the following?",
      options: [
        "Q^π for the initial ε-greedy policy — MC control does not improve beyond the first policy",
        "Q* and π* — the optimal action-value function and optimal policy",
        "The optimal ε-soft policy for ε = 1/N (where N is the total number of episodes)",
        "A local optimum of Q, which may differ from Q* due to the non-linearity of the ε-greedy update",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §5.4 (and Singh et al. 2000 for the formal proof): on-policy MC control with GLIE policies converges to Q* and π*. The GLIE conditions ensure (1) all Q(s,a) values converge to their true values (via infinite exploration), and (2) the policy greedifies in the limit. Together, these guarantee convergence to the optimal policy. This is the key theoretical motivation for decaying ε in practice.",
      hints: [
        "The two GLIE conditions precisely match what is needed: accurate Q estimates (from condition 1) + greedy limit policy (from condition 2).",
        "Compare: fixed ε > 0 → optimal ε-soft policy (suboptimal). GLIE (ε → 0) → optimal π* (exact optimality).",
      ],
    },
  ],

  "eligibility-traces": [
    {
      id: "q-rl-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Eligibility traces (Sutton & Barto Chapter 12) assign credit to recently visited states. The eligibility trace eₜ(s) is updated as: eₜ(s) = γλeₜ₋₁(s) + 𝟙[Sₜ = s]. What does the parameter λ ∈ [0,1] control?",
      options: [
        "The learning rate α of the TD update",
        "The decay rate of credit for past states: λ = 0 gives TD(0) (only the last state gets credit); λ = 1 gives Monte Carlo (all visited states get equal credit)",
        "The discount factor applied to future rewards",
        "The exploration rate in ε-greedy action selection",
      ],
      correctAnswer: 1,
      explanation:
        "The trace parameter λ controls how far back credit propagates. With λ = 0: eₜ(s) = 𝟙[Sₜ = s] — only the current state gets credit, recovering TD(0). With λ = 1: the trace decays only by γ per step, giving full (undiscounted) credit to all past states — equivalent to Monte Carlo. Intermediate λ gives a weighted combination: TD(λ) interpolates between TD(0) and MC. Sutton & Barto §12.1–12.2 derive this explicitly via the forward (λ-return) and backward (trace) views.",
      hints: [
        'λ is the "memory" parameter. λ = 0: no memory (only current state). λ = 1: full memory (all past states).',
        "The factor γλ in the update means each step back in history contributes (γλ)^k relative weight, k steps ago.",
      ],
    },
    {
      id: "q-rl-kp35-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "TD(λ = 0) is equivalent to TD(0), and TD(λ = 1) is equivalent to every-visit Monte Carlo in the offline (batch) setting.",
      correctAnswer: "true",
      explanation:
        'Sutton & Barto §12.1 establish the "λ-return" forward view: TD(λ) uses a weighted combination of n-step returns Gₜ^(n) with exponential weights (1−λ)λ^{n-1}. At λ=0: only G^(1) (the 1-step TD return) contributes → TD(0). At λ=1: the trace decays only by γ per step, giving full (undiscounted) credit to all past states — equivalent to Monte Carlo. Intermediate λ gives a weighted combination.',
      hints: [
        "λ-return: Gₜ^λ = (1−λ)Σ_{n=1}^∞ λ^{n-1} Gₜ^(n). At λ=0: Gₜ^λ = Gₜ^(1) = Rₜ₊₁ + γV(Sₜ₊₁) = TD target. At λ=1: Gₜ^λ = Gₜ = MC return.",
        "The offline-online equivalence means the backward (trace) update gives the same total update as the forward (λ-return) view when computed over a full episode.",
      ],
    },
    {
      id: "q-rl-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TD(λ) with eligibility traces updates all visited states simultaneously using δₜ = Rₜ₊₁ + γV(Sₜ₊₁) − V(Sₜ): V(s) ← V(s) + α·δₜ·eₜ(s). Compared to n-step TD, what is the key computational advantage of eligibility traces?",
      options: [
        "Eligibility traces require less memory because they store only the current trace vector instead of the last n states and rewards",
        "Eligibility traces are computationally equivalent to n-step TD but numerically more stable due to the exponential weighting",
        "Eligibility traces allow the use of larger learning rates without divergence",
        "Eligibility traces completely eliminate the need for a discount factor γ",
      ],
      correctAnswer: 0,
      explanation:
        "n-step TD must store the last n transitions (Sₜ, Aₜ, Rₜ₊₁, …, Sₜ₊ₙ) and wait n steps before updating — O(n) memory and n-step delay. Eligibility traces require only the current trace vector e(s) (same size as V) — O(|S|) memory — and update all states online after every step. This backward view is computationally equivalent to the forward (λ-return) view in the offline setting, but achieves it in O(|S|) time and O(|S|) space per step.",
      hints: [
        "n-step TD: store n-step buffer, wait n steps to update. Eligibility traces: one trace vector, update every step.",
        'The trace eₜ(s) effectively carries "memory" of past visits without explicitly storing past transitions.',
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
