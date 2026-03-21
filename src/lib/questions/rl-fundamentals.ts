import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "policy-definition": [
    {
      id: "q-rl-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Sutton & Barto define a policy as "a mapping from states to probabilities of selecting each possible action." Which of the following best captures this definition?',
      options: [
        "A function $\pi(a \mid s)$ that gives the probability of taking action $a$ when in state $s$",
        "The total discounted reward accumulated over an episode",
        "The transition probability $P(s' \mid s, a)$ describing how the environment evolves",
        "A neural network that outputs state values $V(s)$",
      ],
      correctAnswer: 0,
      explanation:
        "First, let's recall what a conditional probability distribution over actions means: at each state $s$, a policy assigns a probability mass function $\\pi(\\cdot|s)$ over the action set. Sutton & Barto (Chapter 3) define a policy exactly as this mapping: $\\pi(a|s)$ gives the probability of taking action $a$ when in state $s$.\n\nStep-by-step: a policy maps every state $s \\in S$ to probabilities over $A(s)$. The notation $\\pi(a|s)$ is read \"the probability of action $a$ given state $s$\" - a conditional probability distribution. The key insight is that $\\pi$ needs only the current state to specify behavior; it does not need history.\n\nTherefore, $\\pi$ fully specifies the agent's behavior at every state: to know what the agent does, you only need to know which state it's in.",
      hints: [
        "The definition involves probabilities of actions given states. Which option expresses a conditional probability distribution over actions?",
        "Think about the type signature: input = state, output = probabilities over actions.",
      ],
    },
    {
      id: "q-rl-kp6-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A policy must always be represented as a finite lookup table - one row per state, one column per action.",
      correctAnswer: "false",
      explanation:
        "Policies can be represented in many ways: lookup tables (tabular RL), linear function approximators, or deep neural networks (deep RL). What matters is that the representation maps states (or observations) to action probabilities. Sutton & Barto discuss function approximation in Chapters 9-11 precisely because tables become infeasible for large state spaces.",
      hints: [
        "Can you enumerate all states in a game like Chess or StarCraft? If not, how would you represent a policy?",
        "Chapter 9 of Sutton & Barto is titled On-Policy Prediction with Approximation. Why would approximation be needed if tables always sufficed?",
      ],
    },
    {
      id: "q-rl-kp6-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A robot uses policy \\pi(a | s\\_1, s\\_2, …, s\\_t) - it selects actions based on its entire history of visited states. According to the Markov property underlying MDPs (Sutton & Barto §3.1), why is this unnecessary for an optimal policy in a fully observed MDP?",
      options: [
        "\\pi must always be deterministic in an MDP",
        "The current state s\\_t already summarizes all relevant history: P(s\\_t₊\\_1|s\\_t,a\\_t) = P(s\\_t₊\\_1|s\\_1,…,s\\_t,a\\_t)",
        "Using history would make the action space continuous",
        "Storing history violates the reward-maximization objective",
      ],
      correctAnswer: 1,
      explanation:
        "The Markov property (Sutton & Barto §3.1) states that the state s\\_t is a sufficient statistic of the history: the future is independent of the past given the present. Therefore, a policy conditioned only on s\\_t can be optimal - there is never any benefit to conditioning on earlier states in a fully observed MDP.",
      hints: [
        "The definition says the state must encode all past information relevant to the future. If $s_t$ already does this, what does that imply about $s_1, \ldots, s_{t-1}$?",
        "If s\\_t truly summarizes history, knowing s\\_1,...,s_{t-1} adds no predictive power about s\\_t₊\\_1.",
      ],
    },
  ],

  "policy-types": [
    {
      id: "q-rl-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Spinning Up distinguishes two types of policies. A deterministic policy $\\mu(s)$ and a stochastic policy $\\pi(a|s)$. What is the key structural difference in their outputs?",
      options: [
        "$\\mu(s)$ outputs a single action; $\\pi(a|s)$ outputs a probability distribution over actions",
        "Deterministic policies $\\mu(s)$ are always optimal; stochastic $\\pi(a|s)$ is only for exploration",
        "Discrete action spaces require $\\mu(s)$; continuous spaces need $\\pi(a|s)$",
        "Neural networks use $\\mu(s)$; lookup tables use $\\pi(a|s)$",
      ],
      correctAnswer: 0,
      explanation:
        "First, let's recall the type signatures from Spinning Up: a deterministic policy $\\mu: S \\to A$ outputs one specific action per state, while a stochastic policy $\\pi: S \\times A \\to [0,1]$ outputs a probability distribution over actions, satisfying $\\sum_a \\pi(a|s) = 1$. Step-by-step: to execute a deterministic policy, you simply evaluate $\\mu(s)$ to get an action. To execute a stochastic policy, you sample from the distribution $\\pi(\\cdot|s)$. Deterministic policies are a special case of stochastic policies where all probability mass is on one action. Therefore, the key structural difference is that $\\mu(s)$ outputs a single action while $\\pi(a|s)$ outputs a probability distribution over actions.",
      hints: [
        "Think about what you need to execute each policy: $\\mu(s)$ gives you an action directly; $\\pi(a|s)$ requires sampling.",
        "Spinning Up notes that deterministic policies are written $\\mu(s) = a$, while stochastic ones satisfy $\\pi(a|s) = P[A=a|S=s]$.",
      ],
    },
    {
      id: "q-rl-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For any finite MDP with a known model, there always exists a deterministic optimal policy \\pi* - a stochastic policy cannot do strictly better.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto (§3.6) prove that for any finite MDP there is always at least one deterministic optimal policy. This follows from the policy improvement theorem: given V^\\pi, acting greedily (deterministically) yields a policy at least as good as any mixed strategy. Stochastic policies offer no benefit in fully observed MDPs.",
      hints: [
        "If a stochastic optimal policy assigned positive probability to a suboptimal action, switching to the greedy action would strictly improve the expected return. So an optimal policy can always be chosen to be deterministic.",
        "Think: if $\pi^\cdot (a \mid s) > 0$ for a suboptimal $a$, what happens if you switch to the greedy action at that state?",
      ],
    },
    {
      id: "q-rl-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In repeated rock-paper-scissors (a symmetric zero-sum game), agent A uses a fixed deterministic policy (always plays Rock). What is the minimum expected payoff agent B can guarantee per round by best-responding?",
      options: [
        "$0$, because Rock beats Scissors equally often as Paper beats Rock",
        "+1 (win every round), by always playing Paper",
        "-1 (lose every round), because the opponent knows your strategy",
        "1/3, because stochastic strategies are unpredictable",
      ],
      correctAnswer: 1,
      explanation:
        "A deterministic policy is fully exploitable in an adversarial game: if A always plays Rock, B simply always plays Paper and wins every round (+1 per round). The Nash equilibrium of RPS is the uniform mixed strategy (1/3, 1/3, 1/3), which yields expected payoff 0 against any opponent strategy. Any deterministic deviation from Nash can be exploited for +1.",
      hints: [
        "If A's policy is deterministic and known, what is B's best response?",
        "The Nash equilibrium is optimal in the worst-case sense - it prevents exploitation. But if the opponent's strategy is known and suboptimal, you can do better.",
      ],
    },
  ],

  "optimal-policy": [
    {
      id: "q-rl-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Sutton & Barto (§3.6) define the optimal policy $\\pi^*$ as the policy satisfying $V^{\\pi^*}(s) \\geq V^\\pi(s)$ for all $s \\in S$ and all policies $\\pi$. In words, $\\pi^*$ is the policy that:",
      options: [
        "Reaches any terminal state in the fewest possible steps",
        "Maximizes the expected discounted return simultaneously from every state",
        "Achieves the highest reward on the very first time step",
        "Minimizes the variance of G_t across trajectories",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall the definition from Sutton & Barto (§3.6): $\\pi^*$ satisfies $V^{\\pi^*}(s) \\geq V^\\pi(s)$ for all $s \\in S$ and all policies $\\pi$. Step-by-step: this means $\\pi^*$ simultaneously maximizes the expected discounted return from every possible starting state. Crucially, S&B prove that in finite MDPs there always exists a single $\\pi^*$ that is optimal everywhere at once - you do not need different policies for different starting states. This is non-trivial: it could theoretically be that different states prefer different policies. The proof relies on the Bellman optimality equations having a unique solution $V^*$. Therefore, $\\pi^*$ is the policy that maximizes the expected discounted return simultaneously from every state.",
      hints: [
        "S&B §3.6: \"A policy \\pi is defined to be better than or equal to a policy \\pi' if its expected return is greater than or equal to that of \\pi' for all states.\"",
        "S&B §3.6 proves that a single policy can be optimal everywhere at once. This is the existence theorem for $\pi^*取.",
      ],
    },
    {
      id: "q-rl-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a finite MDP with $\\gamma = 0.9$, if $V^\cdot (s_0) = 50$ and we follow a suboptimal policy $\\pi$ from $s_0$ with $V^\\pi(s_0) = 45$, then the policy improvement theorem guarantees that the greedy policy $\\pi'$ w.r.t. $V^\\pi$ satisfies $V^{\\pi'}(s_0) \\geq 45$.",
      correctAnswer: "true",
      explanation:
        "The Policy Improvement Theorem (Sutton & Barto Section 4.2) states that if $\\pi'$ is greedy with respect to $V^\\pi$ (i.e., $\\pi'(s) = \\arg\\max_a Q^\\pi(s,a)$), then $V^{\\pi'}(s) \\geq V^\\pi(s)$ for all $s$. So the greedy policy can only be at least as good -- possibly better -- than the policy it was derived from.",
      hints: [
        'S&B Section 4.2: "The policy improvement theorem tells us that [the greedy policy] is at least as good as, possibly better than, the original policy."',
        "If $\\pi' = \\pi$ (no change after greedification), then both are already optimal ($V^\\pi = V^*$).",
      ],
    },
    {
      id: "q-rl-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Given the optimal value function V*, the optimal policy is recovered via a one-step lookahead. Which expression correctly gives \\pi\cdot (s)?",
      options: [
        "\\pi\cdot (s) = argmax_a [R(s,a) + \\gamma \cdot V\cdot (s)]",
        "\\pi\cdot (s) = argmax_a \\Sigma_{s'} P(s'|s,a) [R(s,a,s') + \\gamma \cdot V\cdot (s')]",
        "\\pi\cdot (s) = argmax_a V\cdot (s) for all actions a",
        "\\pi\cdot (s) = argmin_a Q\cdot (s,a)",
      ],
      correctAnswer: 1,
      explanation:
        "From Sutton & Barto §3.6 (Bellman optimality equations): \\pi\cdot (s) = argmax_a \\Sigma_{s',r} p(s',r|s,a)[r + \\gamma V\cdot (s')]. This is a one-step lookahead: for each action a, compute the expected immediate reward plus the discounted value of the resulting state, summed over all possible next states s'. The action achieving the maximum is greedy-optimal.",
      hints: [
        "The Bellman optimality equation involves an expectation over next states $s'$ weighted by $P(s' \mid s, a)$. Which option includes this?",
        "Note: V\cdot (s) alone doesn\'t depend on a, so argmax_a V\cdot (s) is meaningless. The argmax must be over the expected next-state value.",
      ],
    },
  ],

  "state-value-function": [
    {
      id: "q-rl-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "An agent follows policy \\pi in an MDP with \\gamma = 0.9. Starting from state s, it receives rewards 10, 0, 5 over the next three steps then reaches a terminal state. What is V^\\pi(s) (the exact discounted return for this trajectory)?",
      options: [
        "15",
        "10 + 0.9 \cdot 0 + 0.81 \cdot 5 = 14.05",
        "10 + 0 + 5 = 15",
        "(10 + 0 + 5)/3 = 5",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall the definition from Sutton & Barto (§3.3): $V^\\pi(s) = E_\\pi[G_t | S_t = s]$ where $G_t = \\sum_{k=0}^{\\infty} \\gamma^k R_{t+k+1}$. Step-by-step: for this trajectory with rewards 10, 0, 5 and $\\gamma = 0.9$: $G = R_{t+1} + \\gamma R_{t+2} + \\gamma^2 R_{t+3} = 10 + 0.9 \\cdot 0 + 0.9^2 \\cdot 5 = 10 + 0 + 0.81 \\cdot 5 = 10 + 4.05 = 14.05$. Note how each successive reward is discounted more heavily: the reward at step 2 gets multiplied by $\\gamma^2 = 0.81$ because it is two steps in the future. Therefore, the exact discounted return for this trajectory is 14.05.",
      hints: [
        "G_t = R_{t+1} + \\gamma R_{t+2} + $\\gamma^2$R_{t+3} + ... Apply \\gamma = 0.9 to each reward, weighted by time step.",
        'S&B §3.3: "The value of a state s under a policy \\pi, denoted V^\\pi(s), is the expected return when starting in s and following \\pi thereafter."',
      ],
    },
    {
      id: "q-rl-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question: "V^\\pi(s) = 0 for all terminal states s, for any policy \\pi.",
      correctAnswer: "true",
      explanation:
        "By convention (Sutton & Barto §3.4), terminal states yield no future rewards: once the agent transitions into a terminal state, the episode ends. V^\\pi(terminal) = E_\\pi[G_t | S_t = terminal] = E[0] = 0, since no rewards are received after termination. This holds regardless of \\pi.",
      hints: [
        "What is $G_t$ when the agent is already in a terminal state and the episode has ended?",
        "S&B handle episodic tasks by treating the terminal state as absorbing with zero reward, so $V(\text{terminal}) = 0$ by definition.",
      ],
    },
    {
      id: "q-rl-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Bellman expectation equation for V^\\pi(s) (Sutton & Barto §3.5) is:",
      options: [
        "V^\\pi(s) = max_a \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V^\\pi(s')]",
        "V^\\pi(s) = \sum_a \\pi(a|s) \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V^\\pi(s')]",
        "V^\\pi(s) = \sum_a \\pi(a|s) R(s,a)",
        "V^\\pi(s) = R(s) + \\gamma max_{s'} V^\\pi(s')",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall the structure of $V^\\pi(s)$: it is the expected discounted return starting from state $s$ and following policy $\\pi$ thereafter. The key insight (Sutton & Barto §3.5 call it the \"fundamental property\") is that $V^\\pi(s)$ satisfies a self-consistency equation relating its value to its successor states.\n\nStep-by-step: to compute $V^\\pi(s)$, we consider what happens in one step. The agent selects an action $a$ according to $\\pi(a|s)$, then the environment transitions to a next state $s'$ with reward $r$. By the law of total expectation, we average over actions (weighted by $\\pi$), then over next states (weighted by $P(s'|s,a)$). The return from $s$ is the immediate reward $r$ plus $\\gamma$ times the future return from $s'$.\n\nTherefore: $V^\\pi(s) = \\sum_a \\pi(a|s) \\sum_{s',r} p(s',r|s,a)[r + \\gamma V^\\pi(s')]$. The outer sum averages over actions chosen by $\\pi$; the inner sum averages over next states. This equation holds for all $s$ simultaneously.",
      hints: [
        "For a stochastic policy, you first average over actions (weighted by $\pi$), then average over next states (weighted by $P$). Two levels of expectation.",
        "The max over actions appears in the Bellman optimality equation ($V^*$), not the expectation equation ($V^\pi$). For $V^\pi$, you use the policy $\pi$'s distribution, not a greedy max.",
      ],
    },
  ],

  "action-value-function": [
    {
      id: "q-rl-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In state s an agent commits to action a (which may not be selected by \\pi), then follows \\pi for all future steps. With \\gamma = 0.9, if the immediate reward is r = 5 and the next state has V^\\pi(s') = 20, what is Q^\\pi(s, a) (ignoring further uncertainty for this calculation)?",
      options: ["25", "5 + 0.9 \cdot 20 = 23", "5 \cdot 20 = 100", "0.9 \cdot 5 + 20 = 24.5"],
      correctAnswer: 1,
      explanation:
        "Q^\\pi(s,a) = E_\\pi[G_t | S_t=s, A_t=a] = E[R_{t+1} + \\gamma V^\\pi(S_{t+1}) | S_t=s, A_t=a]. For this single-step calculation: Q^\\pi(s,a) = 5 + 0.9 \cdot 20 = 23. Sutton & Barto §3.5 define Q^\\pi(s,a) as the expected return starting from s, taking a, then following \\pi.",
      hints: [
        "The Bellman equation for $Q^\pi$ decomposes as: $Q^\pi(s, a) = R + \gamma \cdot V^\pi(s')$. The value $V^\pi(s')$ already encodes all future returns under $\pi$.",
        "$Q^\pi$ differs from $V^\pi$ only in the first step: $Q^\pi$ fixes the first action to $a$, whereas $V^\pi$ averages over actions chosen by $\pi$.",
      ],
    },
    {
      id: "q-rl-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a deterministic policy \mu, V^\mu(s) = Q^\mu(s, \mu(s)) holds for all states s.",
      correctAnswer: "true",
      explanation:
        'Sutton & Barto establish V^\\pi(s) = \sum_a \\pi(a|s) Q^\\pi(s,a). For a deterministic policy \mu, \\pi(\mu(s)|s) = 1 and \\pi(a|s) = 0 for all a \neq \mu(s). The sum collapses to: V^\mu(s) = 1\cdot Q^\mu(s,\mu(s)) = Q^\mu(s,\mu(s)). Spinning Up also states this identity: "V^\\pi(s) = Q^\\pi(s, \mu(s)) for a deterministic policy."',
      hints: [
        "Use the identity $V^\pi(s) = \sum_a \pi(a \mid s) Q^\pi(s, a)$ and substitute $\pi(a \mid s)$ for a deterministic policy.",
        "A deterministic policy puts all probability mass on one action, so only one term survives the sum.",
      ],
    },
    {
      id: "q-rl-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The advantage function A^\\pi(s,a) is defined as Q^\\pi(s,a) - V^\\pi(s). If \sum_a \\pi(a|s) A^\\pi(s,a) = 0, and Q^\\pi(s, a\\_1) = 8 while V^\\pi(s) = 5, what is A^\\pi(s, a\\_1) and what does the sign tell you?",
      options: [
        "A^\\pi(s,a\\_1) = -3; action a\\_1 is worse than average in state s",
        "A^\\pi(s,a\\_1) = +3; action a\\_1 yields 3 more expected return than the average action under \\pi in state s",
        "A^\\pi(s,a\\_1) = 5/8; the ratio of value to Q-value",
        "A^\\pi(s,a\\_1) = 0; all actions have the same advantage by definition",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall the definition of the advantage function: $A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)$. This measures how much better action $a$ is compared to the average action under policy $\\pi$ in state $s$. Given $Q^\\pi(s, a_1) = 8$ and $V^\\pi(s) = 5$, we compute: $A^\\pi(s, a_1) = 8 - 5 = 3$. The positive sign tells us that action $a_1$ yields 3 more units of expected return than the average action under $\\pi$ from state $s$. Recall from the advantage function section (Sutton & Barto): $\\sum_a \\pi(a|s)A^\\pi(s,a) = 0$, confirming that advantages are zero-mean deviations from the baseline $V^\\pi(s)$. Therefore, $A^\\pi(s, a_1) = +3$ indicates that $a_1$ is a better-than-average action in state $s$.",
      hints: [
        "Apply the definition directly: $A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)$. Plug in $Q^\\pi(s, a_1) = 8$ and $V^\\pi(s) = 5$ to get the numerical answer.",
        "A positive advantage means the action performs better than the average action under the policy. What does this imply for how the policy should be updated?",
      ],
    },
  ],

  "advantage-function": [
    {
      id: "q-rl-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The advantage function A^\\pi(s,a) is defined as:",
      options: [
        "A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)",
        "A^\\pi(s,a) = V^\\pi(s) - Q^\\pi(s,a)",
        "A^\\pi(s,a) = R(s,a) - V^\\pi(s)",
        "A^\\pi(s,a) = max_a Q^\\pi(s,a) - V^\\pi(s)",
      ],
      correctAnswer: 0,
      explanation:
        "First, let's recall what $V^\\pi(s)$ represents: it is the expected return when starting in state $s$ and following policy $\\pi$. This is the average or baseline return from that state. Now consider a specific action $a$ taken in state $s$: $Q^\\pi(s,a)$ is the expected return when taking $a$ and then following $\\pi$.\n\nStep-by-step: if $Q^\\pi(s,a) > V^\\pi(s)$, then action $a$ is better than the average action under $\\pi$ - it yields higher expected return. If $Q^\\pi(s,a) < V^\\pi(s)$, action $a$ is worse than average. The difference $A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)$ quantifies exactly how much better or worse $a$ is relative to the baseline.\n\nTherefore: $A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)$. Note that $\\max_a A^\\pi(s,a) = \\max_a Q^\\pi(s,a) - V^\\pi(s)$ would be the advantage of the best action, not of an arbitrary action $a$.",
      hints: [
        'V^\\pi(s) is the "baseline" - the average return under \\pi. A^\\pi measures the deviation above or below that baseline.',
        "If $a$ is exactly the average action under $\pi$, $A^\pi(s, a) = 0$. Better-than-average $\rightarrow$ positive; worse-than-average $\rightarrow$ negative.",
      ],
    },
    {
      id: "q-rl-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The expected advantage under a policy is always zero: \sum_a \\pi(a|s) A^\\pi(s,a) = 0 for all states s.",
      correctAnswer: "true",
      explanation:
        "\sum_a \\pi(a|s) A^\\pi(s,a) = \sum_a \\pi(a|s) [Q^\\pi(s,a) - V^\\pi(s)] = \sum_a \\pi(a|s) Q^\\pi(s,a) - V^\\pi(s) \\sum_a \\pi(a|s) = V^\\pi(s) - V^\\pi(s) \\cdot 1 = 0. This confirms that advantages are zero-mean - they are a centered version of Q^\\pi, measuring relative rather than absolute value.",
      hints: [
        "Expand $\sum_a \pi(a \mid s) A^\pi(s, a)$ using the definition $A^\pi = Q^\pi - V^\pi$ and the identity $V^\pi(s) = \sum_a \pi(a \mid s) Q^\pi(s, a)$.",
        "Zero expected advantage means advantages don\'t shift the average - they only redistribute credit among actions.",
      ],
    },
    {
      id: "q-rl-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In REINFORCE, replacing the raw return G_t with the advantage estimate A^\\pi(s,a) = G_t - b(s) reduces gradient variance without introducing bias because:",
      options: [
        "The baseline b(s) is always equal to zero, so no information is lost",
        "E_\pi[\nabla_\theta log \pi_\theta(a|s) * b(s)] = 0 for any state-dependent baseline b(s), leaving the gradient expectation unchanged",
        "The advantage function always has smaller magnitude than G_t",
        "b(s) = V^\\pi(s) is the unique variance-minimizing baseline, proven by the policy gradient theorem",
      ],
      correctAnswer: 1,
      explanation:
        "For any baseline b(s) that depends only on state (not action), E_\pi[\nabla_\theta log \pi_\theta(a|s) * b(s)] = b(s) * sum_a \nabla_\theta \pi_\theta(a|s) = b(s) * \nabla_\theta sum_a \pi_\theta(a|s) = b(s) * \nabla_\theta 1 = 0. So subtracting b(s) from G_t leaves the gradient unbiased while typically reducing variance (since the advantage is closer to zero on average). Sutton & Barto Section 13.4 prove this baseline-invariance result.",
      hints: [
        "Key identity: $\sum_a \pi_\theta(a \mid s) = 1$ for all $\theta$, so its gradient w.r.t. $\theta$ is $0$.",
        "The baseline $b(s)$ can depend on $s$ but NOT on $a$ - if it depended on $a$, the expectation would not be zero.",
      ],
    },
  ],

  "bellman-recursion": [
    {
      id: "q-rl-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Sutton & Barto (§3.5) call the Bellman equation the "fundamental property of value functions." It states that V^\\pi(s) equals:',
      options: [
        "The maximum over actions of immediate reward plus discounted next-state value",
        "The expected immediate reward plus \\gamma times the expected value of the next state under \\pi",
        "The sum of all future undiscounted rewards",
        "The value of the best action available in state s",
      ],
      correctAnswer: 1,
      explanation:
        "S&B §3.5: V^\\pi(s) = E_\\pi[R_{t+1} + \\gamma V^\\pi(S_{t+1}) | S_t = s]. This decomposes value into two parts: the immediate reward E[R_{t+1}|s] plus \\gamma times the expected value of the next state. The key insight is the decomposition G_t = R_{t+1} + \\gamma G_{t+1}, and then taking expectations on both sides.",
      hints: [
        "Start from G_t = R_{t+1} + \\gamma G_{t+1} (the telescoping decomposition of discounted return).",
        "Take E_\\pi[*|S_t=s] of both sides: V^\\pi(s) = E_\\pi[R_{t+1}|s] + \\gammaE_\\pi[G_{t+1}|s] = E_\\pi[R_{t+1} + \\gamma V^\\pi(S_{t+1})|s].",
      ],
    },
    {
      id: "q-rl-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Bellman optimality equation for V\cdot (s) uses an expectation over actions (like V^\\pi), replacing \\pi(a|s) with the optimal policy distribution.",
      correctAnswer: "false",
      explanation:
        "The Bellman optimality equation uses a max over actions, NOT an expectation: V\cdot (s) = max_a \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V\cdot (s')]. Sutton & Barto §3.6 emphasize that the max replaces the weighted average because the optimal agent always picks the best action - it does not hedge over suboptimal actions.",
      hints: [
        "Compare: V^\\pi uses \sum_a \\pi(a|s)[...] - a weighted average. V* uses max_a[...] - the best case.",
        'S&B §3.6: "Bellman optimality equations are special because...the maximum over actions replaces the sum weighted by \\pi."',
      ],
    },
    {
      id: "q-rl-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Consider a 2-state MDP: from s\\_1, taking action a gives reward 1 and transitions to s\\_2 with probability 1; from s\\_2, any action gives reward 0 and returns to s\\_1. With \\gamma=0.5 and a deterministic policy always choosing a, what does V^\\pi(s\\_1) equal (using the Bellman equation)?",
      options: ["1", "1 + 0.5 \cdot V^\\pi(s\\_2)", "2/3", "1/(1-0.5) = 2"],
      correctAnswer: 2,
      explanation:
        "Apply the Bellman equations simultaneously. V^\\pi(s_1) = 1 + 0.5 \\cdot V^\\pi(s_2) and V^\\pi(s_2) = 0 + 0.5 \\cdot V^\\pi(s_1). Substituting: V^\\pi(s_1) = 1 + 0.5(0.5 V^\\pi(s_1)) = 1 + 0.25 V^\\pi(s_1). Solving: 0.75 V^\\pi(s_1) = 1, so V^\\pi(s_1) = 4/3 \\approx 1.33. \\n\\nThe geometric series perspective confirms this: from s_1 the reward sequence is 1, 0, 1, 0, \\ldots with discount factors 1, \\gamma, \\gamma^2, \\gamma^3, \\ldots. The expected return is G_0 = 1 + \\gamma^2 + \\gamma^4 + \\cdots = \\sum_{k=0}^{\\infty} (\\gamma\\^2)^k = 1/(1 - \\gamma\\^2) = 1/(1 - 0.25) = 4/3.",
        hints: [
        "Write out both Bellman equations simultaneously: one for $V^\pi(s_1)$ and one for $V^\pi(s_2)$, then solve the $2 \times 2$ linear system.",
        "The rewards alternate: 1, 0, 1, 0, … discounted as 1*\\gamma⁰ + 0*\\gamma¹ + 1*\\gamma\\^2 + 0*\\gamma\\^3 + … = 1/(1-\\gamma\\^2) for \\gamma=0.5.",
      ],
    },
  ],

  "contraction-mapping": [
    {
      id: "q-rl-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Bellman operator T^\\pi is a \\gamma-contraction in the sup-norm. This means that for any two value functions V and U:",
      options: [
        "\|T^\\pi V - T^\\pi U\|_\\infty \\leq \\gamma\|V - U\|_\\infty",
        "\|T^\\pi V - V*\|_\\infty \\leq \\gamma for all V",
        "T^\\pi always produces a value function with smaller L2-norm than V",
        "Applying T^\\pi reduces the number of states in the MDP",
      ],
      correctAnswer: 0,
      explanation:
        "First, let's recall what a contraction mapping is: a function $T$ is a $\\gamma$-contraction if applying $T$ to any two points brings them closer together by a factor of exactly $\\gamma < 1$. In the sup-norm, the distance between two functions $V$ and $U$ is $\|V - U\|_\\infty = \\max_s |V(s) - U(s)|$.\n\nStep-by-step: the Bellman operator is $T^\\pi V(s) = \\sum_a \\pi(a|s) \\sum_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V(s')]$. When we apply $T^\\pi$ to two value functions $V$ and $U$, the $\\gamma$ factor appears inside the expectation. Specifically: $|T^\\pi V(s) - T^\\pi U(s)| \\leq \\gamma \\cdot \\max_{s'} |V(s') - U(s')|$ for each $s$. Taking $\\max_s$ gives $\|T^\\pi V - T^\\pi U\|_\\infty \\leq \\gamma \|V - U\|_\\infty$.\n\nTherefore: the $\\gamma$ in the Bellman operator is what makes $T^\\pi$ a contraction. By the Banach fixed-point theorem, repeated application converges to the unique fixed point $V^\\pi$, regardless of the starting $V_0$.",
      hints: [
        "A contraction shrinks distances in function space. The factor $\gamma < 1$ ensures distances shrink by at least $\gamma$ each iteration.",
        "Sutton & Barto discuss convergence of policy evaluation (§4.1): it relies exactly on this contraction property.",
      ],
    },
    {
      id: "q-rl-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Banach fixed-point theorem guarantees that the Bellman operator T^\\pi has a unique fixed point, and that unique fixed point is exactly V^\\pi.",
      correctAnswer: "true",
      explanation:
        "The Banach fixed-point theorem states: any contraction mapping on a complete metric space has a unique fixed point, and iterating the mapping from any starting point converges to that fixed point. Since T^\\pi is a \\gamma-contraction (\\gamma < 1) on the complete metric space of bounded functions with sup-norm, there is a unique V such that T^\\pi V = V. By definition of the Bellman equation, that unique fixed point is V^\\pi.",
      hints: [
        "A fixed point of T^\\pi satisfies T^\\pi V = V, which is exactly the Bellman expectation equation V^\\pi(s) = E_\\pi[R + \\gamma V^\\pi(S')|s].",
        "Uniqueness matters: policy evaluation converges to the same V^\\pi regardless of initialization V_0.",
      ],
    },
    {
      id: "q-rl-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "With \\gamma = 0.9, starting from an arbitrary V\\_0, after k = 10 iterations of policy evaluation, the sup-norm error \|V_k - V^\\pi\|_\\infty is bounded by:",
      options: [
        "0.9^10 * \|V\\_0 - V^\\pi\|_\\infty \approx 0.349 * \|V\\_0 - V^\\pi\|_\\infty",
        "0.1 \cdot k * \|V\\_0 - V^\\pi\|_\\infty = 1.0 * \|V\\_0 - V^\\pi\|_\\infty",
        "(0.9/k) * \|V\\_0 - V^\\pi\|_\\infty = 0.09 * \|V\\_0 - V^\\pi\|_\\infty",
        "\|V\\_0 - V^\\pi\|_\\infty / (1 - 0.9^k)",
      ],
      correctAnswer: 0,
      explanation:
        "Each application of T^\\pi multiplies the error by at most \\gamma. After k applications: \|V_k - V^\\pi\|_\\infty \\leq \\gamma^k * \|V\\_0 - V^\\pi\|_\\infty. With \\gamma = 0.9 and k = 10: 0.9^10 \approx 0.349. This geometric decay is why policy evaluation converges reliably: after 100 iterations with \\gamma = 0.9, the error is at most 0.9^100 \approx 2.66 \\times 10\\^{-⁵⁵ the initial error.",
      hints: [
        "The contraction factor \\gamma is applied once per iteration. After k iterations it has been applied k times: \\gamma \\times \\gamma \\times … \\times \\gamma = \\gamma^k.",
        "With $\gamma = 0.9$: $0.9^{10} \approx 0.35$, $0.9^{20} \approx 0.12$, $0.9^{100} \approx 2.7 \times 10^{-5}$. The convergence is geometric, not linear.",
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
        "The optimal policy \\pi* for a given MDP",
        "The value function V^\\pi for a fixed given policy \\pi",
        "The action that maximizes Q-value in each state",
        "The transition probabilities P(s'|s,a) from environment samples",
      ],
      correctAnswer: 1,
      explanation:
        "Policy evaluation solves the system of linear equations defined by the Bellman expectation equation: V^\\pi(s) = \sum_a \\pi(a|s) \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V^\\pi(s')] for all s. This tells you how good policy \\pi is - not how to improve it. Sutton & Barto §4.1 call this the \"prediction problem.\"",
      hints: [
        'S&B §4.1: "The problem of computing the state-value function V^\\pi for an arbitrary policy \\pi is called the prediction problem, or policy evaluation."',
        '"Evaluation" means assessment - you are measuring the quality of an existing policy, not searching for a better one.',
      ],
    },
    {
      id: "q-rl-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Iterative policy evaluation with \\gamma = 1 always converges to V^\\pi, as long as the MDP is finite and every state is reachable.",
      correctAnswer: "false",
      explanation:
        "The convergence proof for iterative policy evaluation requires \\gamma < 1 OR that the policy guarantees eventual termination (episodic tasks). With \\gamma = 1 in a continuing (non-terminating) task, the Bellman operator is not a contraction - the sup-norm of V can grow without bound, and the algorithm may diverge or fail to converge.",
      hints: [
        "The contraction argument uses \\gamma < 1 explicitly: \|T^\\pi V - T^\\pi U\|_\\infty \\leq \\gamma\|V - U\|_\\infty. At \\gamma = 1, the right side equals \|V - U\|_\\infty - no contraction.",
        "Consider a policy that cycles between two states with reward +1 each step and \\gamma = 1: the return is infinite and V^\\pi is not well-defined.",
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
        'Synchronous updates compute V_{k+1}(s) = T^\\pi V_k for all s using old values V_k, requiring two arrays. Asynchronous (in-place) updates immediately overwrite V(s) and subsequent updates in the same sweep use these fresh values - typically propagating information faster and requiring only one array. Sutton & Barto §4.5 discuss this: in-place often converges faster because "the new values are used immediately instead of at the next sweep."',
      hints: [
        "In synchronous: you read from $V_k$ and write to $V_{k+1}$. In asynchronous: you read from and write to the same $V$ - so updates within the same sweep see partially-updated values.",
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
        "The policy improvement step (Sutton & Barto §4.2) constructs a new policy \\pi' by:",
      options: [
        "Adding Gaussian noise to the current policy\'s action probabilities",
        "Acting greedily with respect to V^\\pi: \\pi'(s) = argmax_a Q^\\pi(s,a) = argmax_a \\Sigma_{s'} P(s'|s,a)[R + \\gamma V^\\pi(s')]",
        "Averaging the current policy \\pi with the optimal policy \\pi*",
        "Taking one gradient ascent step on the policy parameters",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §4.2: the greedy policy \\pi' is defined by \\pi'(s) = argmax_a Q^\\pi(s,a). \"Greedy\" means always selecting the action with highest action-value - no randomness, no averaging. The Policy Improvement Theorem then guarantees V^{\\pi'}(s) \\geq V^\\pi(s) for all s.",
      hints: [
        'S&B §4.2: "The process of making a new policy that improves on an original policy by making it greedy with respect to the value function of the original policy is called policy improvement."',
        "Q^\\pi(s,a) = \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V^\\pi(s')] - this requires the model to compute the one-step lookahead.",
      ],
    },
    {
      id: "q-rl-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Policy Improvement Theorem guarantees V^{\\pi'}(s) \\geq V^\\pi(s) for all s, where \\pi' is greedy with respect to V^\\pi.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto §4.2 state and prove this theorem: if \\pi' is the greedy policy w.r.t. Q^\\pi, then V^{\\pi'}(s) \\geq V^\\pi(s) for all s. The proof proceeds by showing Q^\\pi(s, \\pi'(s)) \\geq V^\\pi(s) (greedy selects at least as good an action), then unrolling this inequality over time. Equality holds iff both \\pi and \\pi' are already optimal.",
      hints: [
        "The key step: V^\\pi(s) \\leq Q^\\pi(s, \\pi'(s)) = E[R + \\gamma V^\\pi(S')|s, \\pi'(s)] \\leq E[R + \\gamma Q^\\pi(S',\\pi'(S'))|s,\\pi'(s)] \\leq … = V^{\\pi'}(s).",
        "Equality throughout means V^\\pi satisfies the Bellman optimality equation, so \\pi is already optimal.",
      ],
    },
    {
      id: "q-rl-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In policy iteration, if the greedy policy \\pi' derived from V^\\pi turns out to be identical to \\pi (no state has its action changed), what can we conclude?",
      options: [
        "The algorithm has a bug - policy improvement should always change the policy",
        "\\pi satisfies the Bellman optimality equations V^\\pi(s) = max_a Q^\\pi(s,a) for all s, so \\pi = \\pi*",
        "V^\\pi = 0 everywhere, indicating an absorbing terminal state",
        "The MDP has no solution and more exploration is needed",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §4.2: if \\pi' = \\pi (improvement yields no change), then V^\\pi(s) = Q^\\pi(s, \\pi'(s)) = max_a Q^\\pi(s,a) for all s. This is exactly the Bellman optimality equation, which has a unique solution V*. Therefore V^\\pi = V* and \\pi = \\pi*. Convergence of policy iteration is detected precisely by this condition.",
      hints: [
        "If \\pi is already greedy w.r.t. its own V^\\pi, it satisfies V^\\pi(s) = max_a Q^\\pi(s,a). This is the Bellman optimality equation.",
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
        "Policy evaluation (compute V^\\pi) and policy improvement (\\pi \\leftarrow greedy(V^\\pi))",
        "Value initialization and value maximization",
        "State enumeration and reward maximization",
      ],
      correctAnswer: 1,
      explanation:
        "Policy iteration: (1) Policy Evaluation - solve V^\\pi for the current \\pi (iterate Bellman expectation to convergence). (2) Policy Improvement - compute \\pi' = greedy(V^\\pi). Repeat until \\pi' = \\pi. S&B §4.3 prove this sequence generates monotonically improving policies and terminates at \\pi* in finite MDPs.",
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
        "Policy iteration is guaranteed to converge to the optimal policy \\pi* in a finite number of iterations for any finite MDP with \\gamma < 1.",
      correctAnswer: "true",
      explanation:
        "For a finite MDP with |S| states and |A| actions, there are at most |A|^|S| deterministic policies. Each policy iteration step either strictly improves the policy or terminates. Since policies are strictly improving and there are finitely many, the algorithm must terminate - and at termination, \\pi = \\pi*. Sutton & Barto §4.3 establish this result.",
      hints: [
        "How many distinct deterministic policies exist for $|S|=5$ states and $|A|=3$ actions? Answer: $3^5 = 243$. Policy iteration visits each at most once.",
        "Can the same policy appear twice in the sequence? Only if it\'s optimal, which is the termination condition.",
      ],
    },
    {
      id: "q-rl-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Policy iteration typically requires far fewer policy updates than value iteration to converge (e.g., 5-20 policy updates vs. thousands of sweeps). The tradeoff is:",
      options: [
        "Policy iteration does not require storing the value function",
        "Each policy iteration step requires fully solving V^\\pi (many sweeps of policy evaluation), while value iteration does only one Bellman backup per state per sweep",
        "Policy iteration is guaranteed to find the global optimum; value iteration may not",
        "Policy iteration works with continuous state spaces; value iteration requires discretization",
      ],
      correctAnswer: 1,
      explanation:
        'Policy iteration performs complete policy evaluation (solving the linear system V^\\pi to convergence - potentially many sweeps) before each policy improvement step. Value iteration combines one sweep of evaluation with immediate improvement at each step, avoiding full convergence of V^\\pi. Sutton & Barto §4.4 note that this "truncated" evaluation in value iteration is a key algorithmic insight.',
      hints: [
        "Policy evaluation itself requires solving a system of $|S|$ linear equations - iteratively, this means many Bellman sweeps per policy iteration step.",
        'Value iteration trades "many iterations" for "cheap iterations": one backup instead of solving all the way to V^\\pi.',
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
        "The Bellman expectation operator for a fixed policy \\pi",
        "The Bellman optimality operator: V(s) \\leftarrow max_a \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V(s')]",
        "Monte Carlo returns averaged over many sampled episodes",
        "Gradient descent on the squared TD error",
      ],
      correctAnswer: 1,
      explanation:
        "Value iteration applies the Bellman optimality operator T* at every sweep: V_{k+1}(s) = max_a \\Sigma_{s'} P(s'|s,a)[R + \\gamma V_k(s')]. The max over actions embeds policy improvement directly into the value update - unlike policy evaluation (which uses a fixed \\pi's average). S&B §4.4 note that this \"truncated\" evaluation in value iteration is a key algorithmic insight.",
      hints: [
        "The crucial difference from policy evaluation: max_a replaces \sum_a \\pi(a|s)*[...]. No fixed policy is needed.",
        "T* is the Bellman optimality operator - it has V* as its unique fixed point, just as T^\\pi has V^\\pi as its fixed point.",
      ],
    },
    {
      id: "q-rl-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Value iteration requires maintaining an explicit policy representation \\pi(s) that is updated alongside V(s) at each sweep.",
      correctAnswer: "false",
      explanation:
        "Value iteration only maintains and updates the value function V(s). The policy is implicit: after convergence to V*, the optimal policy is extracted via a single greedy pass \\pi\cdot (s) = argmax_a \\Sigma_{s'} P[R + \\gamma V\cdot (s')]. No explicit policy array is stored or updated during the iterations themselves. Sutton & Barto §4.4 emphasize this simplification.",
      hints: [
        "What does value iteration\'s update formula look like? It involves V(s) \\leftarrow max_a [...]. Where does \\pi appear?",
        "The policy is \"implicitly\" the greedy policy at any point: \\pi_implicit(s) = argmax_a \\Sigma_{s'} P[R + \\gamma V(s')].",
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
        "Skipped entirely - only policy improvement is performed",
        "Truncated to exactly one Bellman backup before each improvement step",
        "Replaced by Monte Carlo rollouts from each state",
      ],
      correctAnswer: 2,
      explanation:
        'Sutton & Barto §4.4 note that value iteration can be seen as truncated policy evaluation: instead of solving V^\\pi fully, only one backup is performed, then the policy is immediately improved (via the max). This is the "generalized policy iteration" (GPI) framework of S&B §4.6, where the two steps can be of any granularity.',
      hints: [
        "Policy iteration: evaluate fully (many sweeps), then improve once. Value iteration: evaluate once (1 sweep), then improve immediately, repeat.",
        'S&B §4.6 introduces "generalized policy iteration" to unify all DP algorithms - the key parameter is how many evaluation steps before each improvement.',
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
        "Convexity of the value function with respect to the discount factor \\gamma",
        "The Bellman optimality/expectation operator being a \\gamma-contraction in the sup-norm",
        "The state space being small enough to enumerate exhaustively",
        "Rewards being bounded in the range [-1, +1]",
      ],
      correctAnswer: 1,
      explanation:
        "Both T^\\pi (expectation) and T* (optimality) are \\gamma-contractions: \|T^\\pi V - T^\\pi U\|_\\infty \\leq \\gamma\|V - U\|_\\infty and \|T* V - T* U\|_\\infty \\leq \\gamma\|V - U\|_\\infty. By the Banach fixed-point theorem, repeated application converges geometrically to the unique fixed point (V^\\pi or V* respectively). The discount factor \\gamma < 1 is what ensures this contraction.",
      hints: [
        "The proof that T* is a contraction appears in Puterman\'s book and is referenced by Sutton & Barto. The bound |max_a f(a) - max_a g(a)| \\leq \|V - U\|_\\infty is the key step.",
        "If \\gamma = 1, the contraction argument breaks. This is why \\gamma < 1 (or guaranteed termination) is required.",
      ],
    },
    {
      id: "q-rl-kp18-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Both policy iteration and value iteration are guaranteed to find the exact optimal policy \\pi* for any finite MDP with \\gamma < 1 and known transition model.",
      correctAnswer: "true",
      explanation:
        "For finite MDPs with \\gamma < 1 and complete model knowledge, both algorithms converge to V* and \\pi* with probability 1. Sutton & Barto §4.3-4.4 prove this: policy iteration terminates in finitely many steps at \\pi*, and value iteration\'s V_k converges to V* as k \\to \\infty (from which \\pi* is extracted by greedy).",
      hints: [
        "These are exact, model-based DP methods. No sampling or approximation is involved.",
        "S&B Chapters 3-4 assume the full model p(s',r|s,a) is known. Later chapters (5-7) address the model-free case.",
      ],
    },
    {
      id: "q-rl-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A robot has 10 joints, each taking 100 discrete positions, and 50 binary sensor readings. The state space has how many states, and why does this make exact DP infeasible?",
      options: [
        "10 \\times 100 + 50 = 1050 states - manageable with DP",
        "100^10 \\times 2^50 \approx 10^35 states - the curse of dimensionality makes sweeping over all states computationally infeasible",
        "100 \\times 50 = 5000 states - feasible but slow",
        "The state space is infinite because joint angles are continuous",
      ],
      correctAnswer: 1,
      explanation:
        'With 10 joints \\times 100 positions = 100^10 \approx 10^20 joint states, and 2^50 \approx 10^15 sensor states, the combined state space is \approx 10^35. Even at 10^9 state updates per second, a single sweep would take > 10^18 years. This is the "curse of dimensionality" (Bellman\'s term): the state space grows exponentially with the number of state variables. Sutton & Barto §4.6 and Chapter 9 discuss approximation methods as the remedy.',
      hints: [
        "State spaces combine multiplicatively, not additively: 100 positions \\times 100 positions \\times … for each joint.",
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
        'Sutton & Barto §4.5 prove that asynchronous DP converges to V* under the condition that all states continue to receive updates. The contraction property of the Bellman operator holds regardless of update order - what matters is that no state\'s value becomes permanently stale. This justifies focusing updates on "important" states.',
      hints: [
        "The contraction argument: each update to V(s) strictly reduces the error \|V(s) - V\cdot (s)\| by a factor involving \\gamma.",
        "If a state $s$ is never updated, $V(s)$ never converges to $V^\cdot (s)$ - hence the requirement that all states are updated infinitely often.",
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
        "The magnitude of the Bellman residual |V(s) - T^\\pi V(s)|, updating states with the largest error first",
        "Proximity (in graph distance) to the goal state",
        "The frequency with which each state appeared in past episodes",
      ],
      correctAnswer: 1,
      explanation:
        "Prioritized sweeping (Moore & Atkeson, 1993; described in Sutton & Barto §8.4) maintains a priority queue keyed by |V(s) - T^\\pi V(s)| - the Bellman residual. States with the largest error receive updates first, since they are the states where the current estimate is most inaccurate and where improvement is most valuable. This concentrates computation where it matters most.",
      hints: [
        "A state with Bellman residual $\approx 0$ is already accurate - updating it wastes compute. A state with large residual needs correction urgently.",
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
        'First-visit MC: in each episode, find the first time step t at which S_t = s. Record the return G_t. Average these returns across episodes. Sutton & Barto §5.1: "the first-visit MC method estimates V^\\pi(s) as the average of the returns following first visits to s."',
      hints: [
        "Within one episode, $s$ may appear multiple times. First-visit MC only records the return from the first occurrence.",
        "The averaging is across episodes, not within a single episode.",
      ],
    },
    {
      id: "q-rl-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "First-visit Monte Carlo is an unbiased estimator of V^\\pi(s): the expected value of the first-visit return equals V^\\pi(s).",
      correctAnswer: "true",
      explanation:
        "Each first-visit return G_t (where t is the first time S_t = s in an episode) is an independent, unbiased sample of V^\\pi(s) = E_\\pi[G_t|S_t=s]. By the strong law of large numbers, the average of these samples converges to V^\\pi(s). Sutton & Barto §5.1 prove this unbiasedness and convergence.",
      hints: [
        "Independence comes from the fact that different episodes are independent trajectories.",
        "The first visit to s in each episode is a fresh sample: E[G_t|S_t=s] = V^\\pi(s) by definition.",
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
        "Complete episodes before any value update can be made - making it inapplicable to continuing tasks",
        "A known transition model P(s'|s,a)",
        "A stochastic policy to ensure exploration",
      ],
      correctAnswer: 1,
      explanation:
        "MC estimates G_t = R_{t+1} + \\gamma R_{t+2} + \\gamma\\^2R_{t+3} + … which requires knowing all future rewards - i.e., the episode must end first. This makes MC inapplicable to non-terminating (continuing) tasks. TD methods, by contrast, use bootstrapping (R_{t+1} + \\gamma V(S_{t+1})) and can update after every single step. Sutton & Barto §6.1 highlight this as the fundamental advantage of TD over MC.",
      hints: [
        "If R\\_t = 1 at every step and \\gamma = 1: G\\_t = 1 + 1 + 1 + … = \\infty. The return is not defined.",
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
        "Returns sampled only under an \\epsilon-greedy exploration policy",
      ],
      correctAnswer: 1,
      explanation:
        "Every-visit MC counts and averages the return following every visit to state s, even if s appears multiple times in the same episode. If s occurs 3 times in one episode, all 3 returns are included. First-visit MC only records the return from the first occurrence and ignores subsequent ones.",
      hints: [
        "Both methods average across episodes. The difference is how many returns per episode are included per state.",
        "If $s$ appears 5 times in an episode, first-visit uses 1 return and every-visit uses 5 returns from that episode.",
      ],
    },
    {
      id: "q-rl-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Every-visit Monte Carlo is a biased but consistent estimator of V^\\pi(s) - unlike first-visit MC which is unbiased.",
      correctAnswer: "true",
      explanation:
        "Every-visit MC is biased because returns from later visits to s within the same episode are not independent of the return from the first visit - they are correlated through the shared trajectory up to that point. However, every-visit MC is still consistent: as the number of episodes approaches infinity, the estimate converges to V^\\pi(s). Sutton & Barto §5.1 discuss these properties.",
      hints: [
        "Independence between different episodes holds for both methods. Within one episode, are the multiple returns from $s$ independent of each other?",
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
        "As the number of episodes grows, both converge to V^\\pi and every-visit\'s bias decreases - plus the extra samples can reduce variance",
        "Every-visit has provably lower variance than first-visit, which fully compensates for the bias in MSE",
        "First-visit MC is inconsistent in the limit, making both equally imprecise",
      ],
      correctAnswer: 1,
      explanation:
        "Both methods are consistent (converge to V^\\pi). Every-visit MC\'s bias decreases as more episodes are observed. Meanwhile, every-visit produces more return samples per episode (all visits, not just the first), which can reduce variance. The net effect depends on the specific MDP and trajectory structure, but they often perform similarly in practice.",
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
        "Monte Carlo control (Sutton & Barto §5.3) uses \\epsilon-greedy policies because:",
      options: [
        "Greedy policies are theoretically invalid for Monte Carlo methods",
        "A purely greedy policy may never explore some state-action pairs, leaving Q(s,a) permanently unupdated for those pairs",
        "\\epsilon-greedy policies are always faster to converge than greedy ones in all environments",
        "Monte Carlo requires a stochastic policy to ensure the return G_t is well-defined",
      ],
      correctAnswer: 1,
      explanation:
        'For MC control to converge to Q*, every state-action pair (s,a) must be visited infinitely often - otherwise Q(s,a) is never updated from its initialization. A purely greedy policy may avoid suboptimal actions permanently, leaving their Q-values arbitrary. \\epsilon-greedy ensures each action is tried with probability \\epsilon/|A| in every state. S&B §5.4 call this the "exploring starts" or \\epsilon-soft policy requirement.',
      hints: [
        "If action a\\_2 is never tried in state s, Q(s,a\\_2) remains at its initial value forever. How can we know a\\_2 is suboptimal if we never try it?",
        'S&B §5.3: "Maintaining exploration is an issue in Monte Carlo methods. For policy \\pi to be improved on the basis of Q^\\pi, all state-action pairs must be visited."',
      ],
    },
    {
      id: "q-rl-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Monte Carlo control with exploring starts is guaranteed to converge to the optimal policy \\pi* in the limit of infinitely many episodes.",
      correctAnswer: "true",
      explanation:
        "With exploring starts (every state-action pair has nonzero probability of being the initial (s,a) of each episode), all Q(s,a) are updated infinitely often. Sutton & Barto §5.3 prove that Monte Carlo ES (exploring starts) converges to Q* and \\pi*. Without exploring starts, convergence requires \\epsilon \\to 0 (GLIE policies).",
      hints: [
        "Exploring starts is a sufficient condition for convergence. It ensures that the MC estimates are averages of infinitely many unbiased samples for every Q(s,a).",
        "Compare: \\epsilon-greedy with fixed \\epsilon > 0 converges to the best \\epsilon-soft policy, not \\pi*, because it permanently wastes probability on suboptimal actions.",
      ],
    },
    {
      id: "q-rl-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Off-policy Monte Carlo control uses importance sampling to evaluate the target policy \\pi from data generated by the behavior policy b. The per-step importance sampling ratio is:",
      options: [
        "\\rho_t = b(A\\_t|S\\_t) / \\pi(A\\_t|S\\_t)",
        "\\rho_t = \\pi(A\\_t|S\\_t) / b(A\\_t|S\\_t)",
        "\\rho_t = P(S\\_t₊\\_1|S\\_t,A\\_t) / P(S\\_t₊\\_1|S\\_t,A\\_t) = 1",
        "\\rho_t = \\pi(A\\_t|S\\_t) \\cdot b(A\\_t|S\\_t)",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §5.5: the importance sampling ratio for a trajectory segment is \\rho_{t:T-1} = \\Pi_{k=t}^{T-1} \\pi(A\\_k|S\\_k)/b(A\\_k|S\\_k). The per-step ratio is \\pi(A\\_t|S\\_t)/b(A\\_t|S\\_t). This corrects for the fact that action A\\_t was sampled from b, not \\pi - actions more likely under \\pi than b get upweighted; actions less likely under \\pi get downweighted. Note: the transition probabilities P(s'|s,a) cancel in the full trajectory ratio.",
      hints: [
        "We want E_\\pi[G_t] but we sample trajectories under b. The IS ratio is \\pi/b (target over behavior), not b/\\pi.",
        "If \\pi(a|s) = b(a|s) for all a,s, then \\rho = 1 everywhere - no correction needed (on-policy). This is the boundary case.",
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
        "Returns are collected under behavior policy b but must be used to estimate values under target policy \\pi - and these policies induce different return distributions",
        "The behavior policy must always be the greedy policy to satisfy the Bellman equation",
        "The discount factor \\gamma must be adjusted when switching between policies",
      ],
      correctAnswer: 1,
      explanation:
        'Sutton & Barto §5.5: "Almost all off-policy methods utilize importance sampling, a general technique for estimating expected values under one distribution given samples from another." Returns generated by b are biased estimates of E_\\pi[G_t]: b may select different actions with different probabilities than \\pi, changing the distribution of trajectories. IS reweights each return by \\rho = \\Pi \\pi(a)/b(a) along the trajectory to account for this.',
      hints: [
        "E_\\pi[G] = E_b[\\rho\cdot G] where \\rho = \\Pi \\pi(a)/b(a). This identity is the foundation of off-policy MC.",
        "If you use returns from b to estimate E_\\pi[G] directly (without IS), you get a biased estimate proportional to E_b[G], not E_\\pi[G].",
      ],
    },
    {
      id: "q-rl-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Ordinary importance sampling provides an unbiased estimate of V^\\pi(s) but can have infinite variance, while weighted importance sampling is biased but has finite variance and is strongly consistent.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto §5.5-5.6: ordinary IS estimate V̂(s) = (\\Sigma \\rho_i G_i) / n is unbiased (E[V̂] = V^\\pi(s)) but its variance can be infinite if \\rho_i is heavy-tailed. Weighted IS normalizes by \\Sigma \\rho_i: V̂_w(s) = \\Sigma \\rho_i G_i / \\Sigma \\rho_i - this is biased (E[V̂_w] \neq V^\\pi(s) for finite n) but consistent (converges to V^\\pi(s)) and has dramatically lower variance.",
      hints: [
        "Ordinary IS: \\rho can be very large when b(a|s) is small but \\pi(a|s) is large. The product of T such ratios can be enormous.",
        'S&B §5.6: "In practice, weighted importance sampling usually has dramatically lower variance and is strongly preferred over ordinary importance sampling."',
      ],
    },
    {
      id: "q-rl-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For a trajectory of length T, the importance sampling ratio \\rho = \\Pi_{t=0}^{T-1} \\pi(A\\_t|S\\_t)/b(A\\_t|S\\_t). Suppose \\pi is greedy and b is \\epsilon-greedy with \\epsilon = 0.1 and |A| = 4. For T = 20 steps, if \\pi and b always agree on the chosen action, what is \\rho approximately?",
      options: [
        "1.0 - they always agree, so \\rho = 1",
        "(1/(1-\\epsilon/|A|))^T = (1/0.975)^20 \approx 1.66",
        "0 - the greedy policy never matches the \\epsilon-greedy policy exactly",
        "(\\epsilon/|A|)^T \approx (0.025)^20, essentially 0",
      ],
      correctAnswer: 1,
      explanation:
        'When both policies choose the same action a* at time t, \\pi assigns probability 1 (greedy) while b assigns probability 1-\\epsilon+\\epsilon/|A| = 1-0.1+0.025 = 0.925 (\\epsilon-greedy). The per-step ratio is 1/0.925 \approx 1.081. Over T=20 steps: \\rho \approx 1.081^20 \approx 4.84. (The option "1/0.975^20" uses a slightly different approximation but the correct mechanism is the same - \\rho grows exponentially.) This illustrates how \\rho can grow exponentially with trajectory length even when the policies mostly agree.',
      hints: [
        "\\epsilon-greedy with \\epsilon=0.1 and |A|=4: probability of the greedy action = 1 - 0.1 + 0.1/4 = 0.925. The IS ratio per step = 1/0.925 \approx 1.081.",
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
        "TD(0) updates V(S\\_t) after observing one transition (S\\_t, A\\_t, R\\_t₊\\_1, S\\_t₊\\_1). The update rule is:",
      options: [
        "V(S\\_t) \\leftarrow V(S\\_t) + \\alpha [G_t - V(S\\_t)]  where G_t is the full Monte Carlo return",
        "V(S\\_t) \\leftarrow V(S\\_t) + \\alpha [R\\_t₊\\_1 + \\gamma V(S\\_t₊\\_1) - V(S\\_t)]",
        "V(S\\_t) \\leftarrow max_a \\Sigma_{s'} P(s'|s,a)[R + \\gamma V(s')]",
        "V(S\\_t) \\leftarrow (1/n) \\Sigma\\_i G\\_i   averaged over all past episodes",
      ],
      correctAnswer: 1,
      explanation:
        'TD(0) (Sutton & Barto §6.1): V(S\\_t) \\leftarrow V(S\\_t) + \\alpha[R\\_t₊\\_1 + \\gamma V(S\\_t₊\\_1) - V(S\\_t)]. The target is R\\_t₊\\_1 + \\gamma V(S\\_t₊\\_1) - the "TD target." The error \\delta\\_t = R\\_t₊\\_1 + \\gamma V(S\\_t₊\\_1) - V(S\\_t) is the "TD error." Unlike MC which waits for G_t, TD(0) bootstraps by using the current estimate V(S\\_t₊\\_1) instead of the true future return.',
      hints: [
        'S&B §6.1: "TD methods update their estimates based in part on other learned estimates, without waiting for a final outcome. This is a form of bootstrapping."',
        "The \\alpha is the learning rate (step size); \\delta\\_t = R\\_t₊\\_1 + \\gamma V(S\\_t₊\\_1) - V(S\\_t) is the TD error.",
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
        'TD(0) requires only (S\\_t, R\\_t₊\\_1, S\\_t₊\\_1) to update - one transition. It does not need a complete episode. This makes TD(0) applicable to continuing tasks that never terminate, unlike Monte Carlo which requires complete episodes to compute G_t. Sutton & Barto §6.1 call TD learning "one of the most fundamental and novel ideas in reinforcement learning" partly for this reason.',
      hints: [
        "What information does the TD update V(S\\_t) \\leftarrow V(S\\_t) + \\alpha[R\\_t₊\\_1 + \\gamma V(S\\_t₊\\_1) - V(S\\_t)] require? Just R\\_t₊\\_1 and S\\_t₊\\_1 - available immediately after the next step.",
        "A continuing task like controlling a robot indefinitely never reaches a terminal state. MC is inapplicable; TD is not.",
      ],
    },
    {
      id: "q-rl-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An agent observes: S\\_0 = s, R\\_1 = 2, S\\_1 = s'. Currently V(s) = 10 and V(s') = 8, with \\gamma = 0.9 and \\alpha = 0.1. After one TD(0) update, what is the new V(s)?",
      options: [
        "10 + 0.1 \\cdot (2 + 0.9 \\cdot 8 - 10) = 10 + 0.1 \\cdot (9.2 - 10) = 10 - 0.08 = 9.92",
        "10 + 0.1 \\cdot (2 + 8 - 10) = 10 + 0 = 10",
        "(2 + 0.9 \cdot 8) = 9.2",
        "0.1 \\cdot (2 + 0.9 \\cdot 8) + 0.9 \\cdot 10 = 9.92",
      ],
      correctAnswer: 0,
      explanation:
        "TD target = R\\_1 + \\gamma V(S\\_1) = 2 + 0.9\\times8 = 2 + 7.2 = 9.2. TD error \\delta = 9.2 - 10 = -0.8. Update: V(s) \\leftarrow 10 + 0.1\\times(-0.8) = 10 - 0.08 = 9.92. The negative TD error tells us: V(s) was too high relative to the bootstrapped estimate. We decrease V(s) slightly.",
      hints: [
        "TD error = target - current = (R + \\gamma V(s')) - V(s) = 9.2 - 10 = -0.8.",
        "Update V(s) \\leftarrow V(s) + \\alpha \cdot \\delta = 10 + 0.1\\times(-0.8) = 9.92. A negative TD error means our current estimate was too optimistic.",
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
        "(S\\_t, A\\_t, R\\_t₊\\_1, S\\_t₊\\_1, A\\_t₊\\_1) - current state, action, reward, next state, next action",
        "(State, Agent, Reward, Space, Algorithm)",
        "(Sequence, Approximation, Regression, Sampling, Averaging)",
        "(Start, Attempt, Result, Score, Adapt)",
      ],
      correctAnswer: 0,
      explanation:
        "SARSA update: Q(S\\_t,A\\_t) \\leftarrow Q(S\\_t,A\\_t) + \\alpha[R\\_t₊\\_1 + \\gamma Q(S\\_t₊\\_1,A\\_t₊\\_1) - Q(S\\_t,A\\_t)]. The five elements (S\\_t, A\\_t, R\\_t₊\\_1, S\\_t₊\\_1, A\\_t₊\\_1) give SARSA its name. Crucially, A\\_t₊\\_1 is the action actually selected by the policy in S\\_t₊\\_1 - making it on-policy.",
      hints: [
        'S&B §6.4: "This update is done after every transition from a nonterminal state S\\_t. If S\\_t₊\\_1 is terminal, then Q(S\\_t₊\\_1,A\\_t₊\\_1) is defined as zero."',
        "Each letter abbreviates one element: S=State, A=Action, R=Reward, S=next State, A=next Action.",
      ],
    },
    {
      id: "q-rl-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SARSA is on-policy because it updates Q(s,a) using the action A\\_t₊\\_1 actually selected by the current behavior policy (e.g., \\epsilon-greedy), not the greedy maximizing action.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto §6.4: SARSA is on-policy because the Q-values it learns correspond to the behavior policy being followed - including its exploration actions. The target Q(S\\_t₊\\_1, A\\_t₊\\_1) uses the actual next action. In contrast, Q-learning is off-policy: its target max_a Q(S\\_t₊\\_1, a) uses the greedy action - regardless of which action the behavior policy actually takes.",
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
        'In the "cliff walking" example (Sutton & Barto §6.5), SARSA with \\epsilon-greedy converges to a longer but safer path along the top, while Q-learning converges to the shortest path near the cliff. The reason SARSA avoids the cliff edge is:',
      options: [
        "SARSA uses a smaller learning rate by default than Q-learning",
        "SARSA\'s target Q(S\\_t₊\\_1, A\\_t₊\\_1) accounts for \\epsilon-greedy exploration - near the cliff, a random action falls off and incurs -100, so SARSA learns the true \\epsilon-greedy policy cost",
        "Q-learning uses a different discount factor that makes the cliff penalty negligible",
        "SARSA uses importance sampling to avoid dangerous actions",
      ],
      correctAnswer: 1,
      explanation:
        'S&B §6.5: SARSA learns the value of the \\epsilon-greedy policy being followed, which includes the occasional random action. Near the cliff, a random action can fall off (reward -100). SARSA correctly estimates that being near the cliff is costly under \\epsilon-greedy. Q-learning learns the optimal greedy policy value - near the cliff is fine if greedy never falls - but incurs cliff penalties during training. SARSA\'s safer path is "online performance" optimal for the \\epsilon-greedy policy.',
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
        "max_a Q(S\\_t₊\\_1, a) - the greedy action - regardless of which action the behavior policy actually takes",
        "Data collected by a different agent trained previously",
        "Returns averaged over many off-policy trajectories",
      ],
      correctAnswer: 1,
      explanation:
        'Q-learning update: Q(S\\_t,A\\_t) \\leftarrow Q(S\\_t,A\\_t) + \\alpha[R\\_t₊\\_1 + \\gamma max_a Q(S\\_t₊\\_1,a) - Q(S\\_t,A\\_t)]. The target uses max_a Q(S\\_t₊\\_1,a) - the greedy action - not the action A\\_t₊\\_1 selected by the behavior policy. This makes Q-learning off-policy: it learns about the greedy policy \\pi* while behaving under \\epsilon-greedy. S&B §6.5: "Q-learning directly approximates q*, the optimal action-value function."',
      hints: [
        "Compare with SARSA\'s target: Q(S\\_t₊\\_1, A\\_t₊\\_1) - actual next action. Q-learning uses max_a Q(S\\_t₊\\_1, a) - best possible next action.",
        "Off-policy means the policy being evaluated (greedy/optimal) differs from the policy generating data (\\epsilon-greedy).",
      ],
    },
    {
      id: "q-rl-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Tabular Q-learning converges to Q* with probability 1, given that all state-action pairs are visited infinitely often and step sizes satisfy the Robbins-Monro conditions (\\Sigma \\alpha\\_t = \\infty and \\Sigma \\alpha\\_t\\^2 < \\infty).",
      correctAnswer: "true",
      explanation:
        "Watkins and Dayan (1992) proved this convergence result for tabular Q-learning. The Robbins-Monro conditions (standard conditions from stochastic approximation theory) ensure step sizes decrease at the right rate: large enough to overcome noise (\\Sigma \\alpha = \\infty) but small enough to converge (\\Sigma \\alpha\\^2 < \\infty). Sutton & Barto §6.5 state this result directly.",
      hints: [
        "A common schedule satisfying Robbins-Monro: \\alpha\\_t = 1/t. Check: \\Sigma 1/t diverges (harmonic series), \\Sigma 1/t\\^2 converges (p-series with p>1).",
        'Without the \\Sigma \\alpha\\_t = \\infty condition, step sizes go to zero too fast and the algorithm "freezes" before converging. Without \\Sigma \\alpha\\_t\\^2 < \\infty, they don\'t go to zero and the algorithm oscillates.',
      ],
    },
    {
      id: "q-rl-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Q-learning\'s maximization bias occurs because max_a Q̂(s,a) is a biased upward estimator of max_a Q\cdot (s,a) when Q̂ has estimation noise. A concrete example: if all true Q-values are Q\cdot (s,a) = 0 for all a, but Q̂(s,a) has i.i.d. noise N(0,\\sigma\\^2), then E[max_a Q̂(s,a)] is:",
      options: [
        "= 0 (no bias, because Q̂ is an unbiased estimator of Q*)",
        "> 0 (upward bias, because the maximum of noisy unbiased estimates exceeds the true maximum)",
        "< 0 (downward bias, because Q-learning underestimates in stochastic environments)",
        "= \\sigma\\^2 (bias equals the noise variance)",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall why maximization bias occurs. When we estimate Q-values with noise (which is inevitable in RL due to stochastic environments and limited samples), each $\\hat{Q}(s,a)$ is an unbiased estimate of the true $Q(s,a)$, but with independent estimation error. The key statistical fact: for independent random variables $X_1, ..., X_n$ each with mean 0 and positive variance, $\\mathbb{E}[\\max_i X_i] > 0$. The maximum of noisy zero-mean estimates is pulled above the true maximum.\n\nStep-by-step: set all true Q-values to $Q^\\cdot(s,a) = 0$. With i.i.d. noise $N(0,\\sigma^2)$, each estimate $\\hat{Q}(s,a) \\sim N(0,\\sigma^2)$. The maximum $\\max_a \\hat{Q}(s,a)$ is the maximum of $|A|$ independent samples from $N(0,\\sigma^2)$. Even though each sample has mean 0, the largest of $|A|$ samples has a positive expected value. Intuitively: with more candidate actions, there is a higher probability that at least one action's noisy estimate is significantly positive.\n\nTherefore: $\\mathbb{E}[\\max_a \\hat{Q}(s,a)] > 0 = \\max_a Q^\\cdot(s,a)$. The upward bias grows with $|A|$ - more candidate actions means more opportunity for the maximum to be inflated. Double Q-learning fixes this by decoupling action selection (which action is best?) from value estimation (how good is that action?), eliminating the upward bias entirely.",
      hints: [
        "Consider T independent random variables X_1, ..., X_T each drawn from N(0, \\sigma^2). What is E[\\max_i X_i]? The maximum of T i.i.d. positive-variance variables is pulled above zero.",
        "The bias grows with |A| because with more candidate actions, there is a higher chance that at least one action's noisy estimate is significantly positive.",
      ],
    },
  ],

  "discount-factor": [
    {
      id: "q-rl-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Sutton & Barto (§3.3) define the discounted return as G\\_t = R\\_t₊\\_1 + \\gamma R\\_t₊\\_2 + \\gamma\\^2R\\_t₊\\_3 + … = \\Sigma_{k=0}^\\infty \\gamma^k R\\_t₊\\_k₊\\_1. What is the role of the discount factor \\gamma \\in [0, 1)?",
      options: [
        "\\gamma controls the learning rate of the value function update",
        "\\gamma weights future rewards so that rewards received k steps in the future are worth \\gamma^k times an immediate reward - making the agent prefer sooner rewards when \\gamma < 1",
        "\\gamma normalizes the reward signal to lie in [0, 1]",
        "\\gamma determines the probability of the episode terminating at each step",
      ],
      correctAnswer: 1,
      explanation:
        "The discount factor \\gamma \\in [0,1) controls how much the agent values future rewards relative to immediate ones. A reward k steps away contributes \\gamma^k \\times R to the return. When \\gamma = 0, the agent is myopic (only immediate reward matters). When \\gamma \\to 1, the agent values all future rewards nearly equally. S&B §3.3 also note that \\gamma < 1 guarantees the infinite sum converges whenever rewards are bounded: |G\\_t| \\leq R_max/(1-\\gamma).",
      hints: [
        'Think of \\gamma as a "patience" parameter: \\gamma close to 1 = patient; \\gamma close to 0 = impatient.',
        'S&B §3.3: "The discount rate determines the present value of future rewards: a reward received k time steps in the future is worth only \\gamma^{k-1} times what it would be worth if it were received immediately."',
      ],
    },
    {
      id: "q-rl-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Setting \\gamma = 1 is valid and produces a well-defined (finite) expected return in all continuing (non-terminating) MDPs, as long as rewards are bounded.",
      correctAnswer: "false",
      explanation:
        "With \\gamma = 1 and a non-terminating task, G\\_t = \\Sigma_{k=0}^\\infty R\\_t₊\\_k₊\\_1 is an infinite sum that diverges unless rewards eventually reach zero - which they generally do not. Sutton & Barto §3.3 restrict \\gamma < 1 for continuing tasks precisely to guarantee convergence: |G\\_t| \\leq R_max/(1-\\gamma). \\gamma = 1 is only valid for episodic tasks where the sum terminates at the end of the episode.",
      hints: [
        "If R\\_t = 1 at every step and \\gamma = 1: G\\_t = 1 + 1 + 1 + … = \\infty. The return is not defined.",
        'S&B §3.3 explicitly state: "If \\gamma < 1, the infinite sum [converges] as long as the reward sequence {R\\_k} is bounded."',
      ],
    },
    {
      id: "q-rl-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An agent in a continuing task receives a constant reward of R = 1 per step and uses \\gamma = 0.95. Starting from any state s, what is the maximum possible discounted return G\\_t?",
      options: [
        "\\infty - the sum of an infinite geometric series diverges",
        "1/(1-0.95) = 20 - the geometric series sum for constant reward",
        "1/0.95 \approx 1.053",
        "0.95/(1-0.95) = 19 - the present value of future-only rewards",
      ],
      correctAnswer: 1,
      explanation:
        "For constant reward R = 1 at every step: G\\_t = \\Sigma_{k=0}^\\infty \\gamma^k \cdot 1 = 1/(1-\\gamma) = 1/(1-0.95) = 1/0.05 = 20. This is the geometric series formula. It confirms that \\gamma < 1 bounds the return: no matter how long the agent runs, G\\_t \\leq R_max/(1-\\gamma). With \\gamma = 0.95 and R_max = 1, the upper bound is 20.",
      hints: [
        "Geometric series: \\Sigma_{k=0}^\\infty \\gamma^k = 1/(1-\\gamma) for |\\gamma| < 1.",
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
        "V\cdot (s) = \sum_a \\pi\cdot (a|s) \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V\cdot (s')]",
        "V\cdot (s) = max_a \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V\cdot (s')]",
        "V\cdot (s) = max_a R(s,a) + \\gamma max_{s'} V\cdot (s')",
        "V\cdot (s) = max_{\\pi} V^\\pi(s) summed over all states",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall the difference between $V^\\pi$ and $V^*$: $V^\\pi(s)$ is the value under a specific policy $\\pi$, while $V^*(s)$ is the value under the optimal policy $\\pi^*$. The Bellman expectation equation for $V^\\pi$ averages over actions using $\\pi(a|s)$. The Bellman optimality equation replaces that averaging with a $\\max$.\n\nStep-by-step: for the optimal policy $\\pi^*$, we always choose the action with the highest action-value. Therefore, $V^*(s) = \\max_a Q^*(s,a)$. Expanding $Q^*(s,a)$ using the definition $Q^*(s,a) = \\sum_{s',r} p(s'|s,a)[r + \\gamma V^*(s')]$, we get: $V^*(s) = \\max_a \\sum_{s',r} p(s',r|s,a)[r + \\gamma V^*(s')]$.\n\nThe key difference from the Bellman expectation equation: the $\\max$ replaces the weighted sum. This is why the optimal value is the value of the best available action, not the average under a policy.",
      hints: [
        "Bellman expectation: uses \sum_a \\pi(a|s)[...] - weighted average over the policy. Bellman optimality: uses max_a[...] - the best case.",
        'S&B §3.6: "Because \\pi* is greedy with respect to V*, V* must satisfy the Bellman optimality equation."',
      ],
    },
    {
      id: "q-rl-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Bellman optimality equation V\cdot (s) = max_a Q\cdot (s,a) is a system of nonlinear equations (because of the max operation), so it cannot in general be solved by simple matrix inversion unlike the Bellman expectation equation.",
      correctAnswer: "true",
      explanation:
        "The Bellman expectation equation for V^\\pi is a linear system: V^\\pi = R^\\pi + \\gammaP^\\piV^\\pi, solvable as V^\\pi = (I - \\gammaP^\\pi)^{-1}R^\\pi. The Bellman optimality equation V\cdot (s) = max_a[...] is nonlinear due to the max operator. This expresses the fundamental difference between the two equations: one linear, one nonlinear. The linear system has a closed-form matrix solution; the nonlinear system typically requires iterative methods.",
      hints: [
        "Linear system: V = AV + b \\to V = (I-A)^{-1}b. Nonlinear system: V = max_a f(V, a) - no closed form in general.",
        "Value iteration iteratively applies the nonlinear Bellman optimality operator until convergence.",
      ],
    },
    {
      id: "q-rl-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Bellman optimality equation for Q* is: Q\cdot (s,a) = \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma max_{a'} Q\cdot (s',a')]. How does this relate to the Q-learning update rule Q(S\\_t,A\\_t) \\leftarrow Q(S\\_t,A\\_t) + \\alpha[R\\_t₊\\_1 + \\gamma max_{a'} Q(S\\_t₊\\_1,a') - Q(S\\_t,A\\_t)]?",
      options: [
        "Q-learning solves a different equation - it minimizes temporal-difference error, which is unrelated to Bellman optimality",
        "The Q-learning update moves Q(S\\_t,A\\_t) toward the sampled Bellman optimality target R\\_t₊\\_1 + \\gamma max_{a'} Q(S\\_t₊\\_1,a'), implementing stochastic approximation of the Bellman optimality equation",
        "Q-learning solves the Bellman expectation equation (for \\pi*), not the Bellman optimality equation",
        "The connection is only approximate; Q-learning converges to a different fixed point than Q*",
      ],
      correctAnswer: 1,
      explanation:
        "Q-learning is a stochastic approximation method for solving the Bellman optimality equation for Q*. At each step, the sample R\\_t₊\\_1 + \\gamma max_{a'} Q(S\\_t₊\\_1,a') is an unbiased estimate of the Bellman optimality target \\Sigma_{s'} P(s'|s,a)[R + \\gamma max_{a'} Q\cdot (s',a')]. The update moves Q(S\\_t,A\\_t) toward this target with step size \\alpha. Watkins & Dayan (1992) proved that under Robbins-Monro conditions, Q \\to Q*, the unique solution of the Bellman optimality equation.",
      hints: [
        "Stochastic approximation: replace the expectation E_s'[...] with a single sample (R\\_t₊\\_1, S\\_t₊\\_1). The step size \\alpha controls how much weight the new sample gets.",
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
        "Sutton & Barto §3.6 prove that for any finite MDP, there always exists at least one policy \\pi* such that V^{\\pi*}(s) \\geq V^\\pi(s) for all states s and all policies \\pi. What is this result called?",
      options: [
        "The Bellman convergence theorem",
        "The existence of an optimal policy - there is always at least one policy simultaneously optimal in every state",
        "The policy gradient theorem - optimal policies are found by gradient ascent",
        "The No Free Lunch theorem - no single policy can be optimal for all MDPs",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §3.6 establish the existence theorem: for finite MDPs, there always exists an optimal policy \\pi* that simultaneously maximizes V^\\pi(s) for every state s. This is non-trivial because the ordering of policies must be consistent across all states - it could in principle be the case that different states prefer different policies. The proof relies on the Bellman optimality equations having a unique solution V*.",
      hints: [
        'S&B §3.6: "There is always at least one policy that is better than or equal to all other policies. This is an optimal policy."',
        "The proof shows V* (the unique fixed point of T*) is achievable: there exists \\pi* that attains V\cdot (s) simultaneously for all s.",
      ],
    },
    {
      id: "q-rl-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a finite MDP, the optimal value function V* is unique (there is exactly one V* satisfying the Bellman optimality equation), but there may be multiple optimal policies \\pi* that all achieve V*.",
      correctAnswer: "true",
      explanation:
        "The Bellman optimality equation T\cdot V = V is a contraction mapping with a unique fixed point V* (by the Banach fixed-point theorem). However, multiple optimal policies may exist whenever V\cdot (s) = Q\cdot (s,a) for more than one action a in some state - ties in the greedy argmax. All such tie-breaking choices yield optimal policies. V* is unique; \\pi* need not be.",
      hints: [
        "Uniqueness of V*: the Banach fixed-point theorem guarantees the unique fixed point of T* (a contraction).",
        "Non-uniqueness of \\pi*: consider s with two actions a\\_1, a\\_2 where Q\cdot (s,a\\_1) = Q\cdot (s,a\\_2) = V\cdot (s). Any mixture or choice between them is optimal.",
      ],
    },
    {
      id: "q-rl-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Consider a finite MDP with |S| = 100 states, |A| = 5 actions, and \\gamma = 0.99. Why does the existence theorem (existence of \\pi*) require finite |S| and |A| - and what breaks for infinite state or action spaces?",
      options: [
        "Infinite spaces require probability measures that violate the Kolmogorov axioms, making rewards undefined",
        "The existence proof relies on V* being the fixed point of T* on a finite-dimensional space; for infinite spaces, T* may not be well-defined or its fixed point may not correspond to a measurable policy",
        "Infinite action spaces always have \\gamma = 1 by construction, breaking the contraction",
        "The optimal policy theorem only applies to discrete-time MDPs, and infinite spaces are always continuous-time",
      ],
      correctAnswer: 1,
      explanation:
        "For finite MDPs, T* maps \\mathbb{R}^|S| to \\mathbb{R}^|S| - a finite-dimensional complete metric space - and the Banach fixed-point theorem applies directly. For infinite state/action spaces, complications arise: the sup over actions may not be achieved (no argmax exists), the fixed point may not yield a measurable policy, and regularity conditions (e.g., Borel measurability, compactness of action sets) must be imposed. Continuous MDPs require measure-theoretic extensions of the existence result (see Bertsekas & Shreve).",
      hints: [
        "The argmax in \\pi\cdot (s) = argmax_a Q\cdot (s,a) is guaranteed to exist when |A| is finite. With infinite A, the sup may not be achieved.",
        "Sutton & Barto restrict to finite MDPs in Chapters 3-6. Later chapters and research papers handle continuous spaces with function approximation and different theoretical tools.",
      ],
    },
  ],

  "bellman-operator": [
    {
      id: "q-rl-kp30-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Bellman expectation operator T^\\pi is defined as (T^\\pi V)(s) = \sum_a \\pi(a|s) \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V(s')]. Which property makes iterating T^\\pi a valid algorithm for computing V^\\pi?",
      options: [
        "T^\\pi is linear and its eigenvalues are all \\leq \\gamma < 1",
        "T^\\pi is a \\gamma-contraction in the sup-norm, so by the Banach fixed-point theorem it has a unique fixed point V^\\pi and iterating T^\\pi from any V\\_0 converges to V^\\pi",
        "T^\\pi maps any non-negative function to a smaller non-negative function",
        "T^\\pi is the gradient of the value function with respect to policy parameters",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall what it means to iterate $T^\\pi$: starting from an arbitrary $V_0$, we compute $V_1 = T^\\pi V_0$, $V_2 = T^\\pi V_1$, and so on. For this to converge to $V^\\pi$, the operator $T^\\pi$ must have a special property.\n\nStep-by-step: the key property is that $T^\\pi$ is a $\\gamma$-contraction in the sup-norm: $\|T^\\pi V - T^\\pi U\|_\\infty \\leq \\gamma \|V - U\|_\\infty$ for all bounded $V, U$. The proof uses the $\\gamma$ factor inside the expectation: taking the difference $T^\\pi V(s) - T^\\pi U(s)$, the reward terms cancel and only $\\gamma V(s') - \\gamma U(s')$ remains, giving at most $\\gamma \\cdot \\max_{s'}|V(s') - U(s')|$ for each $s$. Taking $\\max_s$ yields the contraction bound.\n\nBy the Banach fixed-point theorem: on a complete metric space, any contraction has a unique fixed point. The space of bounded functions with sup-norm is complete, and $V^\\pi$ (the solution of the Bellman expectation equation) is that unique fixed point. Starting from any $V_0$, iterating $V_{k+1} = T^\\pi V_k$ converges geometrically: $\|V_k - V^\\pi\|_\\infty \\leq \\gamma^k \|V_0 - V^\\pi\|_\\infty$.",
      hints: [
        "The contraction factor is exactly \\gamma, the discount factor. This is why \\gamma < 1 is a convergence requirement.",
        "Fixed point of T^\\pi means T^\\pi V = V - substituting the definition gives exactly the Bellman expectation equation.",
      ],
    },
    {
      id: "q-rl-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Bellman optimality operator T* is defined as (T* V)(s) = max_a \\Sigma_{s'} P(s'|s,a)[R(s,a,s') + \\gamma V(s')]. T* is also a \\gamma-contraction in the sup-norm, and its unique fixed point is V*.",
      correctAnswer: "true",
      explanation:
        "First, let's recall the proof strategy for showing $T^*$ is a contraction: we need to bound $\|T^* V - T^* U\|_\\infty \\leq \\gamma \|V - U\|_\\infty$. The key difficulty is that $T^*$ uses a $\\max$ over actions, unlike $T^\\pi$ which uses an expectation.\n\nStep-by-step: for any states $s$, define $f(a) = \\sum_{s'} P(s'|s,a)[R + \\gamma V(s')]$ and $g(a) = \\sum_{s'} P(s'|s,a)[R + \\gamma U(s')]$. Then $\|T^* V - T^* U\|_\\infty = \\max_s |\\max_a f(a) - \\max_a g(a)|$. A fundamental inequality from real analysis states: $|\\max_a f(a) - \\max_a g(a)| \\leq \\max_a |f(a) - g(a)|$. Applying this and the triangle inequality gives $|f(a) - g(a)| \\leq \\gamma \\cdot \\max_{s'}|V(s') - U(s')|$. Taking $\\max_s \\max_a$ yields $\|T^* V - T^* U\|_\\infty \\leq \\gamma \\|V - U\|_\\infty$.\n\nTherefore, $T^*$ is a $\\gamma$-contraction. By the Banach fixed-point theorem, it has a unique fixed point. Substituting $T^* V = V$ gives exactly the Bellman optimality equation, so that fixed point is $V^*$.",
      hints: [
        "Key inequality: |max f - max g| \\leq max |f - g|. Apply this to bound \|T\cdot V - T\cdot U\|_\\infty.",
        "Both T^\\pi and T* are \\gamma-contractions but with different fixed points: T^\\pi \\to V^\\pi, T* \\to V*.",
      ],
    },
    {
      id: "q-rl-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The generalized policy iteration (GPI) framework (Sutton & Barto §4.6) unifies policy evaluation and policy improvement by showing they are applications of two operators. Which pair of operators does GPI alternate between?",
      options: [
        "T^\\pi (Bellman expectation) for evaluation; T* (Bellman optimality) for improvement",
        "Gradient ascent on V^\\pi for evaluation; softmax update for improvement",
        "Monte Carlo sampling for evaluation; \\epsilon-greedy update for improvement",
        "Forward recursion for evaluation; backward induction for improvement",
      ],
      correctAnswer: 0,
      explanation:
        'GPI alternates between: (1) applying T^\\pi repeatedly (policy evaluation - converges to V^\\pi for current \\pi) and (2) acting greedily w.r.t. V^\\pi, which is exactly one application of T* at the policy level: \\pi\' = greedy(V^\\pi) ≡ argmax_a Q^\\pi(s,a). Sutton & Barto §4.6: "The evaluation and improvement processes in GPI can be viewed as both competing and cooperating." The two steps can be of any granularity - one sweep each (value iteration) or full convergence each (policy iteration).',
      hints: [
        "Policy evaluation ≡ iterating T^\\pi until convergence. Policy improvement ≡ one application of the greedy operator (related to T*).",
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
        "Policy evaluation is stopped after m Bellman sweeps (m \\geq 1) rather than waiting for full convergence, then policy improvement is performed immediately",
        "It modifies the policy by adding random noise rather than performing greedy improvement",
        "It alternates between policy evaluation and value iteration within each outer loop",
      ],
      correctAnswer: 1,
      explanation:
        "Modified/truncated policy iteration runs exactly m sweeps of policy evaluation (applying T^\\pi m times) before performing a policy improvement step, rather than iterating to convergence. When m = 1, it is equivalent to value iteration; when m \\to \\infty, it is standard policy iteration. This provides a continuum between the two extremes and allows trading off computation per policy update vs. quality of the value estimate. Sutton & Barto §4.6 (GPI) provides the framework; Puterman (1994) formalizes modified policy iteration.",
      hints: [
        "m = 1: one sweep then improve = value iteration. m = \\infty: evaluate fully then improve = policy iteration.",
        "The key insight: you don\'t need V^\\pi exactly - approximate V^\\pi (from partial evaluation) still enables policy improvement.",
      ],
    },
    {
      id: "q-rl-kp31-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Modified policy iteration with any finite m \\geq 1 is still guaranteed to converge to the optimal policy \\pi* for finite MDPs with \\gamma < 1.",
      correctAnswer: "true",
      explanation:
        "Modified policy iteration generates a sequence of improving policies. Each policy improvement step produces a policy at least as good as the previous (by the Policy Improvement Theorem applied to the partially-evaluated value estimate). Since policies are strictly improving and there are finitely many, the algorithm must terminate - and at termination, \\pi = \\pi*. The convergence guarantee holds for all m \\geq 1; the number of outer iterations may vary, but the algorithm converges to the same \\pi*.",
      hints: [
        "Each outer iteration (m sweeps + improvement) is non-decreasing in value. With finitely many policies, monotone improvement implies finite termination at optimality.",
        "The m sweeps need not converge fully - even an approximate V estimate improves the policy when used for greedy improvement.",
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
        "Smaller m (fewer evaluation sweeps) requires more policy improvement steps but each is cheaper; larger m requires fewer policy improvement steps but more total sweeps per step - optimal m depends on the MDP structure",
        "Modified policy iteration with m = 1 (value iteration) always requires the most total computation",
        "The optimal m is always |S|, the number of states",
      ],
      correctAnswer: 1,
      explanation:
        'There is no universally optimal m. Small m (e.g., value iteration with m=1) uses many outer iterations but very cheap inner loops. Large m (e.g., standard policy iteration) uses few outer iterations but expensive inner evaluation. The total work depends on the MDP: for MDPs where few policy updates suffice (policy iteration terminates in ~5 outer iterations), large m is efficient. For MDPs requiring many policy changes, smaller m amortizes evaluation cost better. This tradeoff is studied in Puterman (1994) "Markov Decision Processes."',
      hints: [
        "Total sweeps \approx (outer iterations) \\times m. Outer iterations decrease as m increases (better V estimate), but not necessarily proportionally.",
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
        "An \\epsilon-greedy policy with \\epsilon = 0.1 and |A| = 4 actions selects actions as follows. In state s where the greedy action is a*:",
      options: [
        "a* is selected with probability 1 - \\epsilon = 0.9; each non-greedy action is selected with probability \\epsilon/|A| = 0.025",
        "a* is selected with probability 1 - \\epsilon = 0.9; each non-greedy action is selected with probability \\epsilon/(|A|-1) \approx 0.033",
        "a* is selected with probability \\epsilon = 0.1; each other action is selected with probability (1-\\epsilon)/3 \approx 0.3",
        "All actions are selected with equal probability \\epsilon/|A| = 0.025; no action is favored",
      ],
      correctAnswer: 0,
      explanation:
        "The standard \\epsilon-greedy rule (Sutton & Barto §2.4): with probability 1-\\epsilon select the greedy action a*; with probability \\epsilon select uniformly at random over all |A| actions (including a*). So \\pi(a*|s) = 1-\\epsilon + \\epsilon/|A| = 0.9 + 0.025 = 0.925 and \\pi(a \\neq a*|s) = \\epsilon/|A| = 0.025. Total: 0.925 + 3\\times0.025 = 1 ✓. This ensures every action is tried with probability at least \\epsilon/|A| > 0.",
      hints: [
        "Careful: the random uniform draw includes the greedy action itself, so \\pi(a*|s) = 1-\\epsilon + \\epsilon/|A|, not simply 1-\\epsilon.",
        'S&B §2.4: \\epsilon-greedy "behaves greedily most of the time, but every once in a while...selects randomly from all the actions with equal probability."',
      ],
    },
    {
      id: "q-rl-kp32-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "An \\epsilon-greedy policy with fixed \\epsilon > 0 always converges to the globally optimal policy \\pi* as the number of interactions \\to \\infty.",
      correctAnswer: "false",
      explanation:
        "A fixed \\epsilon > 0 permanently assigns probability \\epsilon/|A| to suboptimal actions, so the agent never fully commits to the greedy-optimal policy. The \\epsilon-greedy policy converges to the best \\epsilon-soft policy (the optimal policy among all policies that satisfy \\pi(a|s) \\geq \\epsilon/|A|), not \\pi*. To converge to \\pi*, \\epsilon must be decayed to 0 (e.g., \\epsilon\\_n = 1/n) while satisfying GLIE conditions. Sutton & Barto §5.4 discuss this distinction.",
      hints: [
        '\\epsilon-greedy with fixed \\epsilon is always "exploring" - it can never be purely greedy, so it cannot match the performance of \\pi*.',
        "The best \\epsilon-soft policy achieves V within O(\\epsilon) of V*. Only as \\epsilon \\to 0 does it converge to V*.",
      ],
    },
    {
      id: "q-rl-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "UCB (Upper Confidence Bound) action selection selects A\\_t = argmax_a [Q(s,a) + c √(ln t / N\\_t(a))], where N\\_t(a) is the count of action a selections. How does UCB compare to \\epsilon-greedy for the exploration-exploitation tradeoff?",
      options: [
        "UCB explores actions uniformly like \\epsilon-greedy but uses a larger effective \\epsilon",
        "UCB exploration is directed: actions with high uncertainty (low N\\_t(a)) get an exploration bonus that decreases as they are tried - achieving logarithmic regret vs. linear regret for \\epsilon-greedy with fixed \\epsilon",
        "UCB is only valid for continuous action spaces, while \\epsilon-greedy works for discrete actions",
        "UCB and \\epsilon-greedy have identical regret bounds when c = \\epsilon",
      ],
      correctAnswer: 1,
      explanation:
        "UCB exploration is uncertainty-directed: the bonus c√(ln t / N\\_t(a)) is large for rarely-tried actions and shrinks as N\\_t(a) grows. This concentrates exploration on promising uncertain actions rather than random ones. UCB achieves O(ln T) cumulative regret (Auer et al., 2002), while \\epsilon-greedy with fixed \\epsilon has O(T*\\epsilon) linear regret because it wastes a constant fraction of pulls on random actions. Sutton & Barto §2.7 discuss UCB as a more principled exploration strategy.",
      hints: [
        "\\epsilon-greedy: every action is equally likely to be explored, regardless of how much you know about it.",
        'UCB: the exploration bonus √(ln t / N\\_t(a)) is high for actions tried few times and low for well-estimated actions. Exploration "naturally" shifts to less-known actions.',
      ],
    },
  ],

  "weighted-importance-sampling": [
    {
      id: "q-rl-kp33-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Weighted importance sampling estimates V^\\pi(s) as V̂_w(s) = \\Sigma\\_i \\rho\\_iG\\_i / \\Sigma\\_i \\rho\\_i, where \\rho\\_i is the importance sampling ratio for episode i. How does this differ from ordinary importance sampling V̂(s) = (1/n)\\Sigma\\_i \\rho\\_iG\\_i?",
      options: [
        "Weighted IS uses a different ratio: \\rho\\_i = b(A\\_t|S\\_t)/\\pi(A\\_t|S\\_t) instead of \\pi/b",
        "Weighted IS normalizes by the sum of ratios \\Sigma\\_i \\rho\\_i rather than the count n, making it a self-normalizing estimator that is biased but has much lower variance",
        "Weighted IS only uses trajectories where \\rho\\_i \\geq 1, discarding downweighted samples",
        "Weighted IS multiplies G by \\rho twice (\\rho\\_i\\^2) to account for the non-stationarity of b",
      ],
      correctAnswer: 1,
      explanation:
        'Ordinary IS: V̂ = (1/n)\\Sigma\\_i \\rho\\_iG\\_i is unbiased (E[V̂] = V^\\pi(s)) but \\rho\\_i can be very large, causing high variance. Weighted IS: V̂_w = \\Sigma\\_i \\rho\\_iG\\_i / \\Sigma\\_i \\rho\\_i is a self-normalizing (ratio) estimator - biased for finite n (E[V̂_w] \neq V^\\pi(s)) but consistent and with dramatically lower variance. Sutton & Barto §5.6: "In practice, weighted importance sampling usually has dramatically lower variance and is strongly preferred."',
      hints: [
        "The denominator \\Sigma\\_i \\rho\\_i instead of n is what distinguishes weighted from ordinary IS.",
        "If all \\rho\\_i = 1 (on-policy), both estimators reduce to the standard sample mean.",
      ],
    },
    {
      id: "q-rl-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Weighted importance sampling is consistent: as the number of episodes n \\to \\infty, V̂_w(s) converges to V^\\pi(s) with probability 1, despite being biased for finite n.",
      correctAnswer: "true",
      explanation:
        "Sutton & Barto §5.6 establish that weighted IS is consistent (strongly consistent under mild conditions). By the strong law of large numbers, (1/n)\\Sigma\\rho\\_i \\to E_b[\\rho] = 1 and (1/n)\\Sigma\\rho\\_iG\\_i \\to E_b[\\rhoG] = E_\\pi[G] = V^\\pi(s). The ratio converges to V^\\pi(s)/1 = V^\\pi(s). Bias for finite n arises because the ratio of averages \neq average of ratios, but both numerator and denominator converge, so their ratio converges to the correct value.",
      hints: [
        "Slutsky\'s theorem: if X\\_n \\to X and Y\\_n \\to Y (in probability), then X\\_n/Y\\_n \\to X/Y as long as Y \neq 0.",
        "The bias of weighted IS is O(1/n), which decreases with sample size - hence consistency despite finite-sample bias.",
      ],
    },
    {
      id: "q-rl-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The variance of ordinary importance sampling can be infinite even when all returns G\\_i are bounded. Why, and how does weighted IS address this?",
      options: [
        "Ordinary IS variance is infinite because G_i can take negative values; weighted IS clips G_i at zero",
        "Ordinary IS weights by \\rho\\_i = \\Pi\\_t \\pi/b, which is a product of T ratios. If b(a|s) ≪ \\pi(a|s) for any step, \\rho\\_i can be unbounded across episodes, causing Var[\\rho\\_iG\\_i] = E[\\rho\\_i\\^2G\\_i\\^2] - (E[\\rho\\_iG\\_i])\\^2 to be infinite. Weighted IS caps the effective weight per episode to \\rho\\_i/\\Sigma\\rho\\_j \\leq 1, bounding its variance",
        "Ordinary IS has infinite variance because it samples from both \\pi and b simultaneously, creating a mixture distribution with undefined moments",
        "Ordinary IS is always finite variance for \\gamma < 1; weighted IS is only valid for \\gamma = 1",
      ],
      correctAnswer: 1,
      explanation:
        "The product \\rho\\_i = \\Pi\\_t \\pi(A\\_t|S\\_t)/b(A\\_t|S\\_t) over T steps can be extremely large when b(a|s) is small but \\pi(a|s) is large. The second moment E_b[\\rho\\^2G\\^2] can be infinite even when G is bounded (because \\rho is unbounded). Weighted IS normalizes each weight by \\Sigma\\rho\\_j, so each effective weight is \\rho\\_i/\\Sigma\\rho\\_j \\in [0,1], bounding the contribution per episode. This self-normalization provides finite variance in practice, though the theoretical variance bound is complex.",
      hints: [
        "Consider T=1, b(a|s) = 0.01, \\pi(a|s) = 1: \\rho = 100. Over T=20 steps: \\rho = 100^20 = 10^40. The second moment E[\\rho\\^2G\\^2] \\geq (10^40)\\^2 \\times G\\^2 = 10^80 \\times G\\^2.",
        "Weighted IS weight per episode: \\rho\\_i/\\Sigma\\rho\\_j \\leq 1 always. No single episode can dominate the estimate with a huge \\rho.",
      ],
    },
  ],

  glie: [
    {
      id: "q-rl-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'GLIE stands for "Greedy in the Limit with Infinite Exploration." For a sequence of policies {\\pi\\_n}, GLIE requires two conditions. Which pair correctly states them?',
      options: [
        "(1) All state-action pairs are visited infinitely often; (2) the policy converges to the greedy policy in the limit",
        "(1) The policy is \\epsilon-greedy for all n; (2) \\epsilon decreases to exactly 0 after finite steps",
        "(1) Each episode has length \\to \\infty; (2) the agent uses a decaying learning rate \\alpha\\_n \\to 0",
        "(1) The reward sequence is bounded; (2) the value function converges to V* in sup-norm",
      ],
      correctAnswer: 0,
      explanation:
        "GLIE (Sutton & Barto §5.4; Singh et al. 2000) requires: (1) every state-action pair (s,a) is visited infinitely often - ensuring Q(s,a) estimates converge; and (2) the policy converges to the greedy policy - ensuring that in the limit the agent exploits its knowledge. A sufficient condition is \\epsilon\\_n \\to 0 with \\Sigma\\epsilon\\_n = \\infty (so every state-action is tried infinitely often as exploration decays). GLIE-MC control converges to Q* and \\pi*.",
      hints: [
        "Condition 1 ensures all Q(s,a) can be estimated accurately. Condition 2 ensures the limit policy is greedy (optimal).",
        "\\epsilon_n = 1/n satisfies GLIE: every state-action is visited infinitely often (since \\Sigma1/n = \\infty) and \\epsilon\\_n \\to 0 (greedy in the limit).",
      ],
    },
    {
      id: "q-rl-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "An \\epsilon-greedy policy with \\epsilon = 0.05 (constant) satisfies GLIE because every state-action pair is visited infinitely often (since \\epsilon > 0 ensures exploration forever).",
      correctAnswer: "false",
      explanation:
        "Constant \\epsilon = 0.05 satisfies the first GLIE condition (infinite exploration - all (s,a) pairs are visited infinitely often) but fails the second (greedy in the limit - the policy never converges to greedy, it always explores with probability 0.05). Both conditions are required for GLIE. Without \\epsilon \\to 0, MC control converges to the optimal \\epsilon-soft policy, not \\pi*.",
      hints: [
        "Check both GLIE conditions: (1) infinite visits to all (s,a)? Yes, with \\epsilon=0.05. (2) policy \\to greedy? No, always 5% random.",
        "GLIE requires BOTH: explore forever AND eventually stop exploring. Fixed \\epsilon achieves only the former.",
      ],
    },
    {
      id: "q-rl-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Monte Carlo control with on-policy \\epsilon-greedy and GLIE (\\epsilon\\_n = 1/n) converges to which of the following?",
      options: [
        "Q^\\pi for the initial \\epsilon-greedy policy - MC control does not improve beyond the first policy",
        "Q* and \\pi* - the optimal action-value function and optimal policy",
        "The optimal \\epsilon-soft policy for \\epsilon = 1/N (where N is the total number of episodes)",
        "A local optimum of Q, which may differ from Q* due to the non-linearity of the \\epsilon-greedy update",
      ],
      correctAnswer: 1,
      explanation:
        "Sutton & Barto §5.4 (and Singh et al. 2000 for the formal proof): on-policy MC control with GLIE policies converges to Q* and \\pi*. The GLIE conditions ensure (1) all Q(s,a) values converge to their true values (via infinite exploration), and (2) the policy greedifies in the limit. Together, these guarantee convergence to the optimal policy. This is the key theoretical motivation for decaying \\epsilon in practice.",
      hints: [
        "The two GLIE conditions precisely match what is needed: accurate Q estimates (from condition 1) + greedy limit policy (from condition 2).",
        "Compare: fixed \\epsilon > 0 \\to optimal \\epsilon-soft policy (suboptimal). GLIE (\\epsilon \\to 0) \\to optimal \\pi* (exact optimality).",
      ],
    },
  ],

  "eligibility-traces": [
    {
      id: "q-rl-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Eligibility traces (Sutton & Barto Chapter 12) assign credit to recently visited states. The eligibility trace e\\_t(s) is updated as: e\\_t(s) = \\gamma\\lambdae\\_t₋\\_1(s) + 𝟙[S\\_t = s]. What does the parameter \\lambda \\in [0,1] control?",
      options: [
        "The learning rate \\alpha of the TD update",
        "The decay rate of credit for past states: \\lambda = 0 gives TD(0) (only the last state gets credit); \\lambda = 1 gives Monte Carlo (all visited states get equal credit)",
        "The discount factor applied to future rewards",
        "The exploration rate in \\epsilon-greedy action selection",
      ],
      correctAnswer: 1,
      explanation:
        "The trace parameter \\lambda controls how far back credit propagates. With \\lambda = 0: e\\_t(s) = 𝟙[S\\_t = s] - only the current state gets credit, recovering TD(0). With \\lambda = 1: the trace decays only by \\gamma per step, giving full (undiscounted) credit to all past states - equivalent to Monte Carlo. Intermediate \\lambda gives a weighted combination: TD(\\lambda) interpolates between TD(0) and MC. Sutton & Barto §12.1-12.2 derive this explicitly via the forward (\\lambda-return) and backward (trace) views.",
      hints: [
        '\\lambda is the "memory" parameter. \\lambda = 0: no memory (only current state). \\lambda = 1: full memory (all past states).',
        "The factor \\gamma\\lambda in the update means each step back in history contributes (\\gamma\\lambda)^k relative weight, k steps ago.",
      ],
    },
    {
      id: "q-rl-kp35-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "TD(\\lambda = 0) is equivalent to TD(0), and TD(\\lambda = 1) is equivalent to every-visit Monte Carlo in the offline (batch) setting.",
      correctAnswer: "true",
      explanation:
        'Sutton & Barto §12.1 establish the "\\lambda-return" forward view: TD(\\lambda) uses a weighted combination of n-step returns G\\_t^(n) with exponential weights (1-\\lambda)\\lambda^{n-1}. At \\lambda=0: only G^(1) (the 1-step TD return) contributes \\to TD(0). At \\lambda=1: the trace decays only by \\gamma per step, giving full (undiscounted) credit to all past states - equivalent to Monte Carlo. Intermediate \\lambda gives a weighted combination.',
      hints: [
        "\\lambda-return: G\\_t^\\lambda = (1-\\lambda)\\Sigma_{n=1}^\\infty \\lambda^{n-1} G\\_t^(n). At \\lambda=0: G\\_t^\\lambda = G\\_t^(1) = R\\_t₊\\_1 + \\gamma V(S\\_t₊\\_1) = TD target. At \\lambda=1: G\\_t^\\lambda = G\\_t = MC return.",
        "The offline-online equivalence means the backward (trace) update gives the same total update as the forward (\\lambda-return) view when computed over a full episode.",
      ],
    },
    {
      id: "q-rl-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TD(\\lambda) with eligibility traces updates all visited states simultaneously using \\delta\\_t = R\\_t₊\\_1 + \\gamma V(S\\_t₊\\_1) - V(S\\_t): V(s) \\leftarrow V(s) + \\alpha \cdot \\delta\\_t\cdot e\\_t(s). Compared to n-step TD, what is the key computational advantage of eligibility traces?",
      options: [
        "Eligibility traces require less memory because they store only the current trace vector instead of the last n states and rewards",
        "Eligibility traces are computationally equivalent to n-step TD but numerically more stable due to the exponential weighting",
        "Eligibility traces allow the use of larger learning rates without divergence",
        "Eligibility traces completely eliminate the need for a discount factor \\gamma",
      ],
      correctAnswer: 0,
      explanation:
        "n-step TD must store the last n transitions (S\\_t, A\\_t, R\\_t₊\\_1, …, S\\_t₊\\_n) and wait n steps before updating - O(n) memory and n-step delay. Eligibility traces require only the current trace vector e(s) (same size as V) - O(|S|) memory - and update all states online after every step. This backward view is computationally equivalent to the forward (\\lambda-return) view in the offline setting, but achieves it in O(|S|) time and O(|S|) space per step.",
      hints: [
        "n-step TD: store n-step buffer, wait n steps to update. Eligibility traces: one trace vector, update every step.",
        'The trace e\\_t(s) effectively carries "memory" of past visits without explicitly storing past transitions.',
      ],
    },
  ],

  "multi-step-methods": [
    {
      id: "q-rl-kp36-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In n-step TD learning, increasing n generally increases the variance but decreases the bias of the value estimate. Why?",
      options: [
        "Higher n means more parameters to estimate, introducing variance.",
        "Higher n returns include more actual rewards and fewer bootstrapped estimates, reducing the systematic error (bias) from approximation, but accumulating more stochastic reward terms increases variance.",
        "Increasing n always improves accuracy since we see more of the future.",
        "Higher n reduces variance because averaging over longer sequences is more stable.",
      ],
      correctAnswer: 1,
      explanation:
        "The bias-variance trade-off in n-step TD: 1-step TD has high bias (bootstraps immediately from a potentially inaccurate value estimate) but low variance (only one stochastic reward). MC (n = episode length) has zero bias (uses actual returns) but high variance (accumulates all stochastic rewards). n-step TD interpolates - increasing n shifts toward MC properties: less bias, more variance. The optimal n balances both, typically in the range 4-32 depending on the environment.",
      hints: [
        "Think of it as: TD(0) trusts the value function more; MC trusts the data more.",
        "At n=1: mostly bias; at n=infinity (MC): mostly variance. The bias-variance trade-off applies across the spectrum.",
      ],
    },
    {
      id: "q-rl-kp36-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "N-step Tree Backup extends n-step TD to off-policy learning without importance sampling weights. How does it achieve this?",
      options: [
        "It uses a different discount factor for off-policy corrections.",
        "It weights each step by the probability of taking the greedy action under the current policy (\\pi(a|s) instead of \mu(a|s)/\\pi(a|s) importance sampling), effectively averaging over all non-selected actions at each step while following the tree of full policy probabilities.",
        "It simply ignores the behavior policy and reuses on-policy updates.",
        "It corrects for the behavior policy by dividing each reward by the behavior probability.",
      ],
      correctAnswer: 1,
      explanation:
        "Tree Backup eliminates importance sampling by considering the full distribution under the current policy: at each step, it weights the contribution by the probability the current policy would select the taken action, and adds terms for all non-taken actions weighted by their policy probabilities. This creates a consistent off-policy update that is bounded (no unbounded IS ratios) but may be less efficient when the behavior and target policies differ substantially.",
      hints: [
        "Standard IS ratio $\\rho_t = \\pi(a_t|s_t)/\\mu(a_t|s_t)$ can explode when $\\mu(a_t|s_t)$ is small. Tree Backup avoids this by replacing the ratio with $\\pi(a_t|s_t)$ directly.",
        "Tree Backup update at step $t$: the target is $r_t + \\gamma \\sum_a \\pi(a|s_{t+1}) Q(s_{t+1}, a)$. This is always bounded because $\\pi(a|s) \\leq 1$.",
      ],
    },
    {
      id: "q-rl-kp36-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Q(sigma) is a unifying algorithm that generalizes between TD(0), Expected Sarsa, and n-step Tree Backup by using a parameter sigma that controls how much sampling versus expectation is used at each step.",
      correctAnswer: "true",
      explanation:
        "Q(sigma) (Asis et al., 2017) introduces a per-step parameter \\sigma \\in [0,1]: \\sigma=1 corresponds to full sampling (like Sarsa), \\sigma=0 corresponds to pure expectation (like Expected Sarsa/Tree Backup). At different \\sigma values for each step, Q(sigma) subsumes n-step Sarsa (all \\sigma=1), n-step Expected Sarsa (all \\sigma=0), and intermediate algorithms. This provides a principled framework for understanding and designing n-step methods.",
      hints: [
        "Q($\\sigma$): $Q(S_t, A_t) \\leftarrow Q(S_t, A_t) + \\alpha \\left[ (1-\\sigma) \\bar{\\delta}_t + \\sigma \\delta_t \\right]$, where $\\bar{\\delta}_t$ is the full-expectation TD error and $\\delta_t$ is the full-sampling TD error.",
        "$\\sigma=1$: Sarsa (sample $A_{t+1}$). $\\sigma=0$: Expected Sarsa (average over $\\pi$). $\\sigma \\in (0,1)$: blend of both.",
      ],
    },
  ],

  "function-approximation-rl": [
    {
      id: "q-rl-kp37-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the deadly triad in reinforcement learning, and why does it cause instability?",
      options: [
        "The combination of large learning rates, small batch sizes, and deep networks.",
        "The combination of function approximation, bootstrapping (TD updates), and off-policy training - these three together can cause divergence of value function estimates in tabular settings that are otherwise stable.",
        "The combination of exploration, exploitation, and reward shaping.",
        "The interaction between actor networks, critic networks, and experience replay.",
      ],
      correctAnswer: 1,
      explanation:
        "The deadly triad (Sutton & Barto): (1) function approximation (generalizing across states); (2) bootstrapping (using estimates to update estimates, as in TD); (3) off-policy training (learning about a different policy than behavior). Each alone is manageable; together they can cause divergence. DQN avoids this partially through target networks (reducing the circular dependency of bootstrapping on rapidly changing estimates) and experience replay (reducing correlation that amplifies off-policy divergence).",
      hints: [
        "Tabular RL + bootstrapping + off-policy is stable; add function approximation and it can diverge.",
        "DQN mitigations: target network reduces bootstrapping instability; replay buffer reduces off-policy correlation.",
      ],
    },
    {
      id: "q-rl-kp37-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Semi-gradient TD methods update the weights in the direction that reduces the TD error on the current estimate, but not in the direction that would also account for the change in the target. Why does this matter?",
      options: [
        "Semi-gradient methods have slower convergence but the same fixed points as full gradient methods.",
        "Semi-gradient methods converge to the TD fixed point rather than the true gradient of a well-defined loss function; this means they may not minimize any single objective and can diverge with non-linear function approximation, unlike true stochastic gradient methods which always minimize their target loss.",
        "The missing gradient term only affects learning rates and can be compensated by choosing alpha more carefully.",
        "Semi-gradient and full gradient methods are equivalent for linear function approximation.",
      ],
      correctAnswer: 1,
      explanation:
        "In semi-gradient TD, the target (bootstrap target) is treated as fixed when computing the gradient: \\nablaw(target - w^T x)^2 only differentiates through w in the prediction, not the target. Full gradient methods differentiate through both. The consequence: semi-gradient TD converges to the TD fixed point (which minimizes a projected Bellman error), not the minimum of mean squared value error. This fixed point exists and is stable for linear approximation but can diverge for nonlinear approximation.",
    },
    {
      id: "q-rl-kp37-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Tile coding is a form of linear function approximation where the state space is covered by overlapping grids (tilings), and the feature vector has a 1 for each tile containing the current state.",
      correctAnswer: "true",
      explanation:
        "Tile coding (CMAC): multiple offset grids (tilings) partition the state space. For each tiling, exactly one tile is active (value 1); all others are 0. The complete feature vector has (num_tilings \\times tiles_per_tiling) binary features. Linear function approximation with this binary feature vector can represent non-linear value functions because different tilings overlap differently, capturing interactions between state dimensions. It is fast (only active tiles need updating) and proven effective in classical RL benchmarks.",
      hints: [
        "Tile coding partitions state space into overlapping grids. Each tiling covers the space differently, and exactly one tile fires per tiling for any given state.",
        "The binary feature vector has a 1 for each active tile and 0 elsewhere. With $n$ tilings of $m$ tiles each, the feature vector has length $n \\times m$.",
      ],
    },
  ],

  "policy-gradient-theory": [
    {
      id: "q-rl-kp38-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The policy gradient theorem states that \\nablaJ(\\theta) \\propto \\Sigma_s \mu(s) \sum_a Q^\\pi(s,a) \\nabla\\pi(a|s,\\theta). Why is this result significant?",
      options: [
        "It shows that the gradient of return can be computed without knowing the environment dynamics.",
        "It proves that all policy gradient algorithms converge to global optima.",
        "It shows that policy gradients are equivalent to value-based methods.",
        "It provides an exact formula that can be computed in closed form.",
      ],
      correctAnswer: 0,
      explanation:
        "First, let's recall the naive challenge: the expected return $J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}[R(\\tau)]$ depends on $\\pi_\\theta$ in two ways - both the trajectory distribution and the reward. Taking gradients seems to require knowing how $\\pi_\\theta$ changes the state visitation distribution $\\mu(s)$, which involves complex dynamics derivatives.\n\nStep-by-step: Sutton & Barto derive the policy gradient theorem by expanding $\\nabla_\\theta \\pi_\\theta(a|s)$ using the likelihood ratio trick: $\\nabla_\\theta \\pi_\\theta(a|s) = \\pi_\\theta(a|s) \\nabla_\\theta \\log \\pi_\\theta(a|s)$. When we expand $\\nabla_\\theta J(\\theta)$ and manipulate the resulting expression, the terms involving $\\nabla_\\theta \\mu_\\pi(s)$ cancel out exactly. What remains is $\\nabla_\\theta J(\\theta) \\propto \\sum_s \\mu(s) \\sum_a Q^\\pi(s,a) \\nabla_\\theta \\pi(a|s,\\theta)$. The state distribution gradient does NOT appear.\n\nTherefore, the policy gradient theorem expresses $\\nabla J(\\theta)$ as a computable expectation under the on-policy distribution $\\mu(s)$, without requiring knowledge of transition probabilities. This is what makes policy gradient methods model-free - you can estimate the gradient by sampling episodes: $\\nabla_\\theta J(\\theta) \\approx \\frac{1}{N} \\sum_n \\nabla_\\theta \\log \\pi_\\theta(a_t|s_t) G_t$.",
      hints: [
        "The gradient of the state distribution $\mu(s)$ under \pi appears nowhere in the formula - despite $\mu$ depending on \pi itself. This cancellation is the key insight.",
        "Since the formula is an expectation, you can estimate it by sampling episodes: $\nabla_\theta J(\theta) \approx \frac{1}{N} \sum_n \nabla_\theta \log \pi_\theta(a_t|s_t) G_t$.",
      ],
    },
    {
      id: "q-rl-kp38-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "REINFORCE with a baseline b(s) uses the update \\nabla\\theta J \approx (G\\_t - b(S\\_t)) \\nabla\\theta log \\pi(A\\_t|S\\_t,\\theta). Why does subtracting a baseline reduce variance without introducing bias?",
      options: [
        "The baseline shifts all rewards, reducing their magnitude and thus the gradient variance.",
        "Any state-dependent baseline b(S\\_t) has zero expected contribution to the gradient (E[b(S\\_t)\\nabla\\theta log \\pi(A\\_t|S\\_t,\\theta)] = 0 because \sum_a \\pi(a|s)\\nablalog \\pi(a|s) = \\nabla\sum_a \\pi(a|s) = \\nabla1 = 0), so the expectation is preserved while variance can be reduced by choosing b wisely.",
        "The baseline introduces a slight bias that is outweighed by the variance reduction.",
        "The baseline rescales the learning rate, indirectly reducing variance.",
      ],
      correctAnswer: 1,
      explanation:
        "The key identity: \sum_a \\pi(a|s) \\nablalog \\pi(a|s) = \sum_a \\nabla\\pi(a|s) = \\nabla\sum_a \\pi(a|s) = \\nabla1 = 0. Therefore E_a[b(s) \\nablalog \\pi(a|s,\\theta)] = b(s) \\times 0 = 0 for any state-dependent baseline. Since the baseline contributes zero in expectation, it cannot introduce bias; yet choosing b(s) close to E[G\\_t|S\\_t=s] (the value function) centers the updates near zero, dramatically reducing variance. This is why actor-critic methods using V(s) as a baseline are so effective.",
      hints: [
        "The identity $\\nabla_\theta \sum_a \pi_\theta(a|s) = 0$ holds because $\\sum_a \pi_\theta(a|s) = 1$ for all $\\theta$. The gradient of a constant is zero.",
        "A good baseline $b(s) \\approx V^\\pi(s)$ reduces variance the most. The TD error $\\delta_t = R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$ is a low-variance baseline.",
      ],
    },
    {
      id: "q-rl-kp38-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Trust Region Policy Optimization (TRPO) constrains policy updates to a trust region defined by a maximum KL divergence between the old and new policy to prevent destructive large policy updates.",
      correctAnswer: "true",
      explanation:
        "TRPO's insight: gradient ascent on expected return can take steps that catastrophically degrade the policy when the linear approximation breaks down far from the current policy. TRPO adds a hard constraint: D_KL(\\pi_old || \\pi_new) \\leq \\delta. This trust region ensures the new policy is close enough to the old policy that the linear/quadratic approximation remains valid. PPO approximates this constraint with a clipped objective, achieving similar stability with simpler first-order optimization.",
      hints: [
        "The trust region constraint $D_{KL}(\\pi_{old} || \\pi_{new}) \\leq \\delta$ prevents the policy from changing too drastically in one update.",
        "PPO's clipped surrogate objective $L^{CLIP}(\\theta) = \\hat{E}_t \\left[ \\min(r_t(\\theta) \\hat{A}_t, \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon) \\hat{A}_t \\right]$ approximately enforces the KL constraint without a secondary optimizer.",
      ],
    },
  ],

  "model-based-rl": [
    {
      id: "q-rl-kp39-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the Dyna architecture in model-based RL, and how does it combine real and simulated experience?",
      options: [
        "Dyna trains separate models for real and simulated environments and selects the better performing one.",
        "Dyna augments direct RL (learning from real experience) with planning steps: after each real interaction, the learned environment model generates k simulated experiences that are added to the replay buffer, improving sample efficiency by extracting more value from each real interaction.",
        "Dyna is a policy gradient method that uses a dynamic programming baseline.",
        "Dyna replaces real environment interaction entirely with model-based simulation.",
      ],
      correctAnswer: 1,
      explanation:
        "Dyna (Sutton, 1990) integrates three components: (1) direct RL from real experience; (2) model learning (fitting a transition model from real data); (3) planning (simulated experience from the model to update value estimates). After each real step, k planning steps are performed using the model. This dramatically improves sample efficiency: with an accurate model, each real interaction generates k+1 effective updates. The challenge is model errors compounding over long rollouts, motivating short simulated trajectories.",
      hints: [
        "Dyna-Q: tabular Q-learning + tabular model + planning Q-updates from simulated transitions.",
        "Modern variants (World Models, Dreamer) use neural network models for the same purpose.",
      ],
    },
    {
      id: "q-rl-kp39-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Model-based RL can suffer from model exploitation: the agent learns to exploit errors in the learned model to achieve artificially high simulated returns. What architectures mitigate this problem?",
      options: [
        "Use a higher learning rate for the model to make it more accurate faster.",
        "Ensemble models with uncertainty estimation (MBPO, PETS): use the disagreement between ensemble members as a proxy for model uncertainty, and either avoid high-uncertainty regions during planning or add an uncertainty penalty to the simulated reward to discourage exploitation of model errors.",
        "Train the model on the agent's imagined states rather than real states.",
        "Use a separate environment for model validation and planning.",
      ],
      correctAnswer: 1,
      explanation:
        "Model exploitation (model overestimation) occurs when the policy finds regions where the model predicts high reward but the real environment does not. Mitigations: (1) ensemble disagreement as uncertainty signal - high disagreement indicates unreliable model regions; (2) pessimistic planning (MOPO) - subtract uncertainty penalty from simulated rewards; (3) short rollouts - limit planning horizon to where model errors are small; (4) offline RL with conservative policies - avoid OOD states where the model is unreliable.",
      hints: [
        "If the model is accurate to within $\\epsilon$ per step, how much total error accumulates over $H$ steps? Is it $H \\cdot \\epsilon$ or something larger?",
        "Ensemble disagreement: if 5 models predict very different next states for (s, a), does this indicate the model is reliable or unreliable in this region?",
      ],
    },
    {
      id: "q-rl-kp39-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In model-based RL, learning a world model that predicts next state and reward from current state and action allows the agent to plan without interacting with the real environment, improving sample efficiency.",
      correctAnswer: "true",
      explanation:
        "World models are the core of model-based RL: with an accurate model P(s'|s,a) and R(s,a), the agent can simulate rollouts to evaluate policies, perform planning (MPC, tree search), or augment replay with synthetic data. This improves sample efficiency by reducing reliance on expensive real-world interactions. The trade-off is model learning cost and error propagation during rollouts. In robotics and scientific domains where real interactions are expensive or dangerous, model-based RL is often essential.",
      hints: [
        "A world model $P(s'|s,a)$ and reward model $R(s,a)$ allow simulated rollouts: $s_{t+1} \\sim P(\\cdot|s_t, a_t), r_t = R(s_t, a_t)$. No real interaction needed for planning.",
        "The key limitation is model error: errors compound exponentially in long rollouts, which is why short-horizon planning (MPC with replanning) is common.",
      ],
    },
  ],

  "exploration-strategies": [
    {
      id: "q-rl-kp40-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the exploration-exploitation dilemma in RL, and how does epsilon-greedy address it?",
      options: [
        "The dilemma of choosing between different reward functions during training.",
        "The agent must balance exploiting current knowledge (taking actions known to be good) against exploring to discover potentially better actions; epsilon-greedy takes the greedy action with probability 1-epsilon and a random action with probability epsilon, maintaining exploration throughout training.",
        "The dilemma of whether to use on-policy or off-policy learning.",
        "The trade-off between model accuracy and computational efficiency.",
      ],
      correctAnswer: 1,
      explanation:
        "The exploration-exploitation dilemma is fundamental: a purely greedy agent gets stuck in local optima by never trying unknown actions; a purely random agent never learns to use good actions. Epsilon-greedy is the simplest solution: with probability epsilon, act randomly (explore); otherwise act greedily (exploit). Decaying epsilon-greedy (high epsilon early, low epsilon late) starts with broad exploration and narrows to exploitation as the policy matures. This is computationally trivial and often surprisingly effective.",
      hints: [
        "Pure exploitation: agent never discovers better actions. Pure exploration: agent never commits to good actions.",
        "Epsilon annealing schedule: epsilon_t = max(epsilon_min, epsilon_0 * decay^t).",
      ],
    },
    {
      id: "q-rl-kp40-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Intrinsic motivation methods for exploration assign reward bonuses based on state novelty or prediction error. What is the key advantage over epsilon-greedy in sparse-reward environments?",
      options: [
        "Intrinsic motivation is computationally cheaper than epsilon-greedy.",
        "In environments with sparse external rewards (e.g., Montezuma's Revenge), epsilon-greedy random exploration almost never reaches rewarding states; intrinsic motivation directs exploration toward novel or surprising states, guiding the agent toward the sparse rewards through curiosity-driven behavior rather than random chance.",
        "Intrinsic motivation automatically tunes epsilon without manual scheduling.",
        "Intrinsic motivation only works with model-based RL, not model-free RL.",
      ],
      correctAnswer: 1,
      explanation:
        "Sparse-reward exploration crisis: in Montezuma's Revenge, random epsilon-greedy exploration almost never obtains the first reward (reaching a key requires specific sequential actions). Intrinsic reward methods: Random Network Distillation (RND) rewards prediction error on a frozen random network - novel states have high error; Count-based exploration rewards 1/sqrt(N(s)) for state visit count N(s); ICM rewards prediction error on dynamics model. These bonuses make the agent seek novel states, enabling discovery of sparse rewards that random exploration cannot reach.",
      hints: [
        "In Montezuma's Revenge, random actions succeed with probability ~0. The chance of a 10-step optimal sequence is $(1/10)^{10} \\approx 10^{-10}$ per episode. Random exploration is effectively hopeless.",
        "RND novelty bonus: $r^i_t = ||f(s_t) - \hat{f}(s_t)||^2$ where $f$ is fixed random and $\hat{f}$ is learned. Novel states $\\rightarrow$ high error $\\rightarrow$ high intrinsic reward.",
      ],
    },
    {
      id: "q-rl-kp40-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Upper Confidence Bound (UCB) exploration selects actions with high estimated value OR high uncertainty (rarely tried actions), balancing exploitation and exploration in a principled way.",
      correctAnswer: "true",
      explanation:
        "UCB selects: a = argmax_a [Q(a) + c√(ln(t)/N(a))], where N(a) is the count of times action a was taken and t is the total steps. The bonus c√(ln(t)/N(a)) is large for rarely taken actions, driving exploration, and shrinks as an action is tried more. UCB is optimistic in the face of uncertainty and achieves logarithmic regret in the multi-armed bandit setting - theoretically stronger than epsilon-greedy's linear exploration rate.",
      hints: [
        "As $N(a)$ increases, does the UCB bonus $c \\cdot \\sqrt{\\ln(t)/N(a)}$ increase or decrease? What does this mean for exploration vs. exploitation?",
        "UCB achieves $O(\\log T)$ regret vs. $\\epsilon$-greedy's $O(\\sqrt{T})$ regret in bandits. The $\\ln(t)$ term grows slowly, so the bonus shrinks slowly.",
      ],
    },
  ],

  "rl-in-games": [
    {
      id: "q-rl-kp41-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What was the key algorithmic innovation of AlphaGo that allowed it to defeat world champion Go players?",
      options: [
        "A purely rule-based system with exhaustive search.",
        "Combining Monte Carlo Tree Search (MCTS) with deep neural networks for policy (move probability) and value (win probability) estimation, with the networks trained using self-play reinforcement learning to overcome the impossibility of exhaustive search in Go's enormous state space.",
        "A larger version of the minimax algorithm with alpha-beta pruning.",
        "Using Q-learning to directly learn the optimal action for each board state.",
      ],
      correctAnswer: 1,
      explanation:
        "AlphaGo's key innovations: (1) a policy network (predicts likely moves, narrows search) and value network (evaluates board positions without rollouts) trained by supervised learning on human games, then improved by self-play RL; (2) MCTS guided by the policy network for candidate moves and the value network for leaf evaluation, replacing expensive random rollouts. Go has ~10^170 positions - exhaustive search is impossible. The neural networks make the search tractable by focusing on promising moves.",
      hints: [
        "MCTS without neural networks was already superhuman in simpler games but insufficient for Go.",
        "AlphaZero removed the human game training, using only self-play from random play - and became even stronger.",
      ],
    },
    {
      id: "q-rl-kp41-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "AlphaZero uses a single neural network f(s) = (p, v) for both the policy and value function in MCTS. What is the advantage over AlphaGo's separate networks?",
      options: [
        "A single network is easier to train and deploy than two separate networks.",
        "A shared network learns complementary representations: value and policy both benefit from the same board understanding, and training them jointly with shared lower layers allows them to reinforce each other. This eliminates the need for separate training pipelines and achieves stronger play with less compute.",
        "A single network can be quantized more easily for faster inference.",
        "Separate networks cause gradient conflict that degrades MCTS performance.",
      ],
      correctAnswer: 1,
      explanation:
        "AlphaZero's joint architecture: one neural network outputs both policy (move probabilities) and value (win probability). The shared body learns rich position representations useful for both tasks. Training jointly (multi-task learning) with shared gradient updates enables the policy and value heads to learn complementary features - better move prediction helps value estimation and vice versa. This also simplifies the training loop: one network, one training objective, one set of hyperparameters.",
      hints: [
        "In multi-task learning, shared lower layers learn general features useful for multiple tasks. For Go, what board features are useful for both move prediction AND position evaluation?",
        "AlphaGo had separate supervised learning, RL, and value network training pipelines. AlphaZero unifies these into self-play + joint training on a single loss: $L = L_{policy} + c \\cdot L_{value} + L_{entropy}$. How does this simplify things?",
      ],
    },
    {
      id: "q-rl-kp41-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Atari games in the ALE (Arcade Learning Environment) became a standard RL benchmark because they provide diverse challenges across many games with a unified observation space (screen pixels) and action space (joystick actions).",
      correctAnswer: "true",
      explanation:
        "The ALE benchmark (Bellemare et al., 2013) enabled systematic evaluation of RL algorithms across 57 diverse games using a common interface. DQN's performance across these games demonstrated that a single algorithm with the same hyperparameters could achieve human-level performance on a broad range of tasks - previously considered impossible. The benchmark enabled fair comparison across algorithms and drove rapid RL progress from 2013 to 2020.",
      hints: [
        "The ALE provides 57 games with the same state (screen pixels) and action (joystick) interface. What was remarkable about DQN's results?",
        "Before the ALE, each game required a specialized algorithm. What does DQN's cross-game performance suggest about the generality of deep RL?",
      ],
    },
  ],

  "offline-rl": [
    {
      id: "q-rl-kp42-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is offline (batch) reinforcement learning, and what is the core challenge that distinguishes it from online RL?",
      options: [
        "Offline RL trains models without using neural networks, while online RL uses deep learning.",
        "Offline RL learns a policy from a fixed dataset of previously collected interactions (without further environment access); the core challenge is distributional shift: the learned policy may take actions in states that are out-of-distribution relative to the dataset, where Q-value estimates are unreliable and optimistically extrapolated.",
        "Offline RL is simply Q-learning applied to stored replays without exploration.",
        "Offline RL is a technique for reducing training time by pre-computing all updates.",
      ],
      correctAnswer: 1,
      explanation:
        "Offline (batch) RL has a unique challenge: no online data collection means the policy cannot correct errors by exploring. Standard off-policy methods (Q-learning) overestimate values for out-of-distribution (OOD) actions - actions not in the dataset receive arbitrarily high bootstrapped Q-values, causing the policy to greedily exploit these overestimates and fail catastrophically in deployment. Conservative methods (CQL, IQL, TD3+BC) address this by adding regularization that discourages OOD actions.",
      hints: [
        "Online RL can explore to correct value estimate errors; offline RL cannot.",
        "OOD action overestimation: Q(s,a_ood) can be large because no data corrects it during training.",
      ],
    },
    {
      id: "q-rl-kp42-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Conservative Q-Learning (CQL) adds a regularization term to the standard Bellman update. What does it minimize and why does it enable safe offline learning?",
      options: [
        "It minimizes the KL divergence between the learned policy and the behavior policy.",
        "CQL minimizes Q-values for actions not in the dataset while maximizing Q-values for actions that appear in the dataset. This produces a lower bound on the true Q-function, making the policy conservatively pessimistic about OOD actions rather than optimistically overestimating them.",
        "CQL maximizes the entropy of the learned policy to maintain exploration.",
        "CQL penalizes high-variance Q-value predictions to improve stability.",
      ],
      correctAnswer: 1,
      explanation:
        "CQL's regularization: min_\\theta \\alpha(E_{s~D}[log \sum_a exp(Q_\\theta(s,a))] - E_{(s,a)~D}[Q_\\theta(s,a)]) + standard Bellman loss. The first term (softmax of Q over all actions) pushes down Q-values for unseen actions; the second term (Q at data actions) pulls them up. The result is a conservative Q-function that lower bounds the true Q, ensuring the greedy policy derived from CQL Q-values is safer than one derived from a Q-function with OOD overestimation.",
      hints: [
        "CQL regularizer: $E_{s \\sim D}[\\log \\sum_a e^{Q(s,a)}] - E_{(s,a) \\sim D}[Q(s,a)]$. For unseen actions, the first term remains large (the $\\log \\sum_a$ includes OOD actions); for seen actions, the second term pulls Q up. Net effect: lower Q for OOD actions.",
        "Pessimism about OOD actions means: if $a$ was never seen in $D$, CQL assigns it a low Q-value, preventing the greedy policy from selecting it.",
      ],
    },
    {
      id: "q-rl-kp42-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Offline RL datasets collected by suboptimal behavior policies (e.g., a random or mediocre agent) can still be used to train policies that outperform the behavior policy, a phenomenon called policy improvement.",
      correctAnswer: "true",
      explanation:
        "Policy improvement from suboptimal data: offline RL algorithms can extract better behaviors than the data-collecting behavior policy by combining observations across many trajectories to identify which actions lead to better outcomes. For example, a dataset of medium-quality demonstrations may contain some instances where an agent accidentally took a good action sequence - offline RL can learn to replicate these better actions while avoiding bad ones seen in other trajectories. This is why offline RL is valuable for real-world settings where safe online exploration is costly.",
      hints: [
        "Even a random policy generates some trajectories that are locally optimal. Offline RL can identify and generalize from these lucky sequences.",
        "The key requirement: the dataset must contain enough diversity to identify good actions, even if each individual trajectory is suboptimal.",
      ],
    },
  ],

  "multi-agent-rl": [
    {
      id: "q-rl-kp43-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is non-stationarity in multi-agent reinforcement learning, and why does it make standard single-agent RL algorithms difficult to apply directly?",
      options: [
        "The environment reward function changes randomly over time.",
        "Each agent's effective environment includes other agents whose policies change during training; from any single agent's perspective, the environment appears non-stationary (the same action in the same state yields different outcomes as other agents change behavior), violating the Markov property assumed by standard RL algorithms.",
        "Training instability due to the use of neural networks with many parameters.",
        "Different agents learning at different speeds, causing synchronization problems.",
      ],
      correctAnswer: 1,
      explanation:
        "Non-stationarity: agent A learns to exploit agent B's current policy; simultaneously B learns to counter A's current policy. As both change, the environment each faces is constantly shifting. This violates the stationarity assumption of Q-learning convergence guarantees. Solutions: centralized training with decentralized execution (CTDE, e.g., MADDPG) - share information during training to stabilize learning; opponent modeling; self-play with a pool of past policies to prevent single-opponent overfitting.",
      hints: [
        "Coordination game: two agents need to learn to cooperate, but each changing independently may cycle.",
        "CTDE: agents share observations during training (non-stationary), but execute independently (decentralized).",
      ],
    },
    {
      id: "q-rl-kp43-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In competitive multi-agent settings, self-play can lead to strategy cycling (rock-paper-scissors dynamics). How does population-based training address this?",
      options: [
        "Population-based training selects the best agent and discards the others.",
        "Maintaining a diverse population of agents with different strategies, and training each agent against a mixture of past and current opponents prevents overfitting to any single strategy and ensures robustness across the strategy space, avoiding the cycling that occurs when training against only the current opponent.",
        "Population-based training averages the weights of all agents in the population.",
        "It uses a tournament system where agents play round-robin to determine the Nash equilibrium.",
      ],
      correctAnswer: 1,
      explanation:
        "Strategy cycling: if agent A trains only against agent B, A may specialize against B's current strategy, but when B adapts, A's specialization becomes a liability. Population-based training (used in AlphaStar, OpenAI Five): each agent trains against a distribution over a population of past and current opponents, creating a diverse competitive landscape. This approximates playing against the full Nash mixture, producing agents that are robustly good rather than optimally specialized against one opponent.",
    },
    {
      id: "q-rl-kp43-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In cooperative multi-agent RL, credit assignment refers to the problem of determining which agent's actions contributed to a shared team reward when all agents receive the same global reward signal.",
      correctAnswer: "true",
      explanation:
        "Cooperative credit assignment: with a single team reward, each agent must infer how its own actions contributed to the shared outcome - difficult when many agents act simultaneously. Solutions: counterfactual baselines (COMA: compare actual reward to reward expected if agent took a different action, holding others fixed); value decomposition (QMIX, VDN: decompose team Q-value into per-agent contributions); agent-specific reward shaping. Without credit assignment, agents may learn to free-ride on teammates or blame each other for failures.",
    },
  ],

  "rl-for-llms": [
    {
      id: "q-rl-kp44-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is Reinforcement Learning from Human Feedback (RLHF), and why is it used to align large language models?",
      options: [
        "A technique where humans manually program reward functions for language models.",
        "A three-stage pipeline: (1) supervised fine-tuning on demonstrations; (2) training a reward model on human preference comparisons between model outputs; (3) RL optimization (using PPO) to maximize the learned reward while penalizing divergence from the base model - enabling alignment with nuanced human preferences that cannot be specified as simple reward functions.",
        "A method for training LLMs to play text-based games using human feedback.",
        "A way to automatically generate training data by having humans label correct outputs.",
      ],
      correctAnswer: 1,
      explanation:
        "RLHF (Christiano et al., 2017; applied in InstructGPT): (1) SFT: fine-tune the base LLM on curated demonstrations of desired behavior; (2) reward model: train a classifier to predict human preferences between pairs of model outputs using Bradley-Terry model; (3) RL: use PPO to optimize the language model to maximize reward model score while adding a KL penalty against the SFT model (preventing reward hacking). This enables alignment with helpfulness, harmlessness, and honesty - properties hard to specify as explicit rules.",
      hints: [
        "The KL penalty prevents the model from finding extreme strategies that maximize reward model score but violate natural language properties.",
        "RLHF is the core alignment technique behind ChatGPT, Claude, and Gemini.",
      ],
    },
    {
      id: "q-rl-kp44-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Direct Preference Optimization (DPO) is proposed as an alternative to RLHF-PPO. What is its key innovation and advantage?",
      options: [
        "DPO trains without any human feedback, using synthetic preferences instead.",
        "DPO reformulates the RLHF optimization problem to directly train the language model on preference data using a binary cross-entropy loss, showing that the optimal policy under the RLHF objective has a closed-form relationship to the reference policy - eliminating the need for a separate reward model and PPO training loop.",
        "DPO uses a different form of human feedback (rankings instead of pairwise comparisons).",
        "DPO replaces the KL penalty with a simpler L2 regularization term.",
      ],
      correctAnswer: 1,
      explanation:
        "DPO's insight: the RLHF objective's optimal solution can be expressed directly in terms of the language model's probabilities - the reward model is implicitly reparameterized by the model itself. This allows deriving a loss function on preference pairs (chosen, rejected) that directly fine-tunes the LM without RL: L_DPO = -E[log \\sigma(\\beta log(\\pi_\\theta(y_w|x)/\\pi_ref(y_w|x)) - \\beta log(\\pi_\\theta(y_l|x)/\\pi_ref(y_l|x)))]. Benefits: no separate reward model, no PPO instability, simpler training, comparable or better results than RLHF-PPO.",
      hints: [
        "DPO derives: $\\pi^*(y|x) \\propto \\pi_{ref}(y|x) \\exp(r^*(x,y)/\\beta)$. The reward $r^*$ is implicitly defined by the reference policy and the preference data.",
        "PPO requires: (1) reward model training, (2) PPO fine-tuning with clipping. DPO reduces this to a single binary cross-entropy loss on preference pairs.",
      ],
    },
    {
      id: "q-rl-kp44-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Reward hacking in RLHF occurs when a language model learns to exploit flaws in the reward model to achieve high reward scores while producing outputs that do not satisfy the underlying human intent.",
      correctAnswer: "true",
      explanation:
        "Reward hacking (Goodhart's Law applied to RLHF): the reward model is an imperfect proxy for human preferences. A sufficiently capable LLM finds inputs that score highly on the reward model but do not represent genuinely good outputs - e.g., very long but padded responses if the reward model overvalues length, or confident-sounding but incorrect answers. The KL penalty in PPO limits but does not eliminate this. Ongoing research in constitutional AI, iterative RLHF, and improved reward modeling addresses this challenge.",
      hints: [
        "Goodhart's Law: when a measure becomes a target, it ceases to be a good measure. The reward model is a proxy for human preferences - optimizing it too hard causes the proxy-target gap to dominate.",
        "The KL penalty $\\beta \\cdot D_{KL}(\\pi_\\theta || \\pi_{ref})$ constrains how far $\\pi_\\theta$ can drift from the base model, but cannot prevent the model from finding inputs that score well on the reward model but violate human intent.",
      ],
    },
  ],

  "rl-safety": [
    {
      id: "q-rl-kp45-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is safe reinforcement learning, and what types of constraints does it typically enforce?",
      options: [
        "RL for cybersecurity applications that protects systems from attacks.",
        "A field of RL that trains agents to achieve objectives while satisfying safety constraints (e.g., keeping a robot's joint torques below damage thresholds, ensuring a financial agent never exceeds risk limits, preventing a vehicle from collisions) - using constrained optimization or Lyapunov-based methods rather than only maximizing reward.",
        "RL methods that are safe to train on personal data without privacy violations.",
        "A formal verification approach that proves RL agents are bug-free before deployment.",
      ],
      correctAnswer: 1,
      explanation:
        "Safe RL formulates safety as constraints in a Constrained Markov Decision Process (CMDP): maximize E[\\Sigma\\gamma^t R_t] subject to E[\\Sigma\\gamma^t C_t] \\leq d (cost constraint). Approaches: Lagrangian methods (add a penalty \\lambda \\times cost to the objective and optimize \\lambda to enforce the constraint); constrained policy optimization (CPO, PCPO); control barrier functions; Lyapunov-based safety. Applications: robotic manipulation (joint limit constraints), autonomous driving (collision avoidance), finance (drawdown limits).",
      hints: [
        "CMDP = MDP with an additional cost function C(s,a) and constraint E[cost] \\leq threshold.",
        "Lagrangian method: the dual variable \\lambda is learned to enforce the constraint during training.",
      ],
    },
    {
      id: "q-rl-kp45-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An autonomous robot trained with RL must satisfy a safety constraint: joint torques must never exceed \\tau_max. During deployment, the policy sometimes violates this constraint by 5%. What approaches address this gap between training constraint satisfaction and deployment safety?",
      options: [
        "Increase the safety constraint threshold during training to add margin.",
        "Combine multiple layers: (1) train with a conservative constraint budget (E[cost] \\leq 0.8 \\times d) to account for constraint satisfaction gaps; (2) add a control barrier function (CBF) safety filter at deployment that overrides the RL policy when the constraint would be violated; (3) verify safety properties using formal methods on the CBF layer. The CBF provides a hard safety guarantee independent of the RL policy's accuracy.",
        "Run additional training iterations until the constraint is exactly satisfied.",
        "Accept 5% violations as acceptable for a real-world robot.",
      ],
      correctAnswer: 1,
      explanation:
        "Layered safety for deployment: RL with constraints is statistically safe in expectation but may violate constraints in specific states. A control barrier function (CBF) safety filter provides hard safety guarantees: it computes the minimum intervention needed to keep the system in a provably safe set, overriding the RL policy only when necessary. Training with a conservative margin (80% of the constraint budget) provides slack to accommodate model errors. This defense-in-depth approach is standard in safety-critical robotics.",
      hints: [
        "CBF safety filter: given current state $x$, CBF $h(x)$ defines a safe set $\{x : h(x) \\geq 0\\}$. The CBF derivative constraint $\\dot{h} \\geq -\\alpha h$ ensures $h(x) \\geq 0$ is invariant (once safe, stays safe).",
        "Defense-in-depth: (1) conservative training margin accounts for residual model errors; (2) CBF at runtime provides a hard guarantee independent of the RL policy's accuracy. No single layer is perfect; together they cover each other's failure modes.",
      ],
    },
    {
      id: "q-rl-kp45-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Reward shaping, which adds intermediate rewards to guide exploration, can change the optimal policy if not done carefully, potentially causing the agent to learn the wrong behavior.",
      correctAnswer: "true",
      explanation:
        "Naive reward shaping can cause misalignment: adding intermediate rewards for subgoals that seem helpful may inadvertently create a locally optimal policy that maximizes shaped rewards without achieving the true objective (reward hacking). Potential-based reward shaping (Ng et al., 1999) provides a safe form: adding F(s,a,s') = \\gamma\\Phi(s') - \\Phi(s) for any potential function \\Phi preserves the set of optimal policies. Non-potential-based shaping risks changing which policies are optimal.",
      hints: [
        "Potential-based shaping $F(s,a,s') = \\gamma \\Phi(s') - \\Phi(s)$ preserves optimal policies because it does not change the relative ordering of state-action values.",
        "If you add a constant $c$ to all rewards, the optimal policy is unchanged. Naive shaping effectively changes rewards by different amounts in different states, which CAN change the optimal policy.",
      ],
    },
  ],
};


const extra: Record<string, Question[]> = {
  "nstep-returns": [
    {
      id: "q-rl-kp46-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The n-step TD return G_t^(n) = r_{t+1} + \\gammar_{t+2} + ... + \\gamma^{n-1}r_{t+n} + \\gamma^n V(S_{t+n}). What happens to this return as n \\to \\infty for an episodic task?",
      options: [
        "It converges to the one-step TD target r_{t+1} + \\gamma V(S_{t+1})",
        "It converges to the full Monte Carlo return: the sum of all future discounted rewards",
        "It diverges to infinity for \\gamma < 1",
        "It equals the TD(\\lambda) \\lambda-return for any fixed \\lambda",
      ],
      correctAnswer: 1,
      explanation: "As n \\to \\infty, the bootstrapped value V(S_{t+n}) is pushed further into the future. For episodic tasks it eventually becomes V(terminal) = 0, and the n-step return equals the full sum of discounted rewards from t to the episode end - exactly the Monte Carlo return. n-step TD interpolates between one-step TD (n=1, high bias/low variance) and Monte Carlo (n=\\infty, low bias/high variance).",
      hints: [
        "As n grows, how many real rewards are included versus the bootstrapped estimate?",
        "At the terminal state, what is V(S_T) for a properly initialized value function?",
      ],
    },
    {
      id: "q-rl-kp46-2",
      type: "true-false",
      difficulty: "easy",
      question: "n-step TD with n=1 is equivalent to standard one-step TD(0) prediction.",
      correctAnswer: "true",
      explanation: "Substituting n=1 into G_t^(n) = r_{t+1} + \\gamma^1 V(S_{t+1}) gives exactly the TD(0) target. The n-step family unifies TD(0) (n=1) and Monte Carlo (n=T), allowing practitioners to tune the bias-variance trade-off by selecting n. This is why Sutton & Barto dedicate Chapter 7 to n-step bootstrapping as a bridge between TD and MC methods.",
      hints: [
        "Write out G_t^(1) explicitly and compare to the TD(0) update target r_{t+1} + \\gamma V(S_{t+1}).",
        "Both formulas use exactly one real reward and then bootstrap from V(S_{t+1}).",
      ],
    },
    {
      id: "q-rl-kp46-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The \\lambda-return G_t^\\lambda = (1-\\lambda) * \\Sigma_{n=1}^{\\infty} \\lambda^{n-1} G_t^{(n)} is a geometric mixture of all n-step returns. What weight does it assign to G_t^{(n)} for n < T-t?",
      options: [
        "(1-\\lambda)\\lambda^{n-1}",
        "1/n for all n",
        "\\lambda^{n-1} divided by the normalization constant",
        "(1-\\lambda)^n",
      ],
      correctAnswer: 0,
      explanation: "The \\lambda-return weights each n-step return G_t^{(n)} by (1-\\lambda)\\lambda^{n-1} for n < T-t, with the remaining weight \\lambda^{T-t-1} assigned to the terminal Monte Carlo return. All weights sum to 1. When \\lambda=0, all weight goes to the 1-step return (TD(0)). When \\lambda=1, all weight goes to the Monte Carlo return. Intermediate \\lambda provides a smooth interpolation controlled by the exponential decay rate.",
      hints: [
        "The weights (1-\\lambda)\\lambda^{n-1} form a geometric series. What do they sum to as n goes from 1 to infinity?",
        "When \\lambda=0: (1-0)*0^0=1 for n=1, and 0 for all n>1. Does this match TD(0)?",
      ],
    },
  ],

  "eligibility-traces-advanced": [
    {
      id: "q-rl-kp47-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In TD(\\lambda) with accumulating eligibility traces, the trace for state s updates as e_t(s) = \\gamma\\lambda * e_{t-1}(s) + 1[S_t = s]. What role does the trace play in the weight update?",
      options: [
        "It stores the gradient of the policy with respect to action selection",
        "It acts as a memory assigning credit to recently and frequently visited states, so the TD error at time t updates all state values weighted by their trace e_t(s)",
        "It normalizes the learning rate to prevent large updates",
        "It replaces the reward signal with a smoothed moving average",
      ],
      correctAnswer: 1,
      explanation: "The eligibility trace e_t(s) decays by \\gamma\\lambda each step and is incremented when s is visited. The TD(\\lambda) update is \\DeltaV(s) = \\alpha * \\delta_t * e_t(s) for all s simultaneously, where \\delta_t is the TD error. States visited recently and frequently receive larger updates. The trace elegantly solves the credit-assignment problem without storing an n-step buffer, implementing the backward view equivalent of the \\lambda-return forward view.",
      hints: [
        "The trace decays exponentially unless the state is revisited. What happens to the trace of a state visited many steps ago?",
        "The update \\DeltaV(s) = \\alpha * \\delta_t * e_t(s) applies to ALL states at each step. This is the backward-view equivalent of which forward-view quantity?",
      ],
    },
    {
      id: "q-rl-kp47-2",
      type: "true-false",
      difficulty: "medium",
      question: "Replacing eligibility traces (where e_t(s) is reset to 1 on revisiting state s) can outperform accumulating traces when states are revisited frequently within an episode.",
      correctAnswer: "true",
      explanation: "Replacing traces set e_t(s) = 1 whenever S_t = s, capping the trace. Accumulating traces can grow large when a state is revisited in a loop - if visited 10 times, the trace can reach 1/(1-\\gamma\\lambda). This runaway growth can cause instability. Replacing traces prevent it, and Sutton & Barto show they often outperform accumulating traces in environments where the agent revisits states frequently.",
      hints: [
        "With accumulating traces, visiting state s 10 times yields trace approximately 1/(1-\\gamma\\lambda). Could this magnitude cause instability in the update \\DeltaV(s) = \\alpha * \\delta_t * e_t(s)?",
        "Replacing traces cap the maximum trace at 1. How does this affect the maximum update magnitude for a single step?",
      ],
    },
    {
      id: "q-rl-kp47-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The forward view (\\lambda-return) and backward view (TD(\\lambda) with eligibility traces) are theoretically equivalent in the offline setting but diverge online. What does 'offline' mean in this context?",
      options: [
        "Updates are applied only at the end of each episode using a fixed V. Online means within-episode updates that change V mid-episode, altering targets G_t^\\lambda which depend on V(S_{t+n}).",
        "Offline means using a replay buffer; online means on-policy sampling. The equivalence breaks due to importance sampling weights.",
        "Offline means using a fixed dataset of trajectories collected before training begins.",
        "Offline means \\gamma=1; online means \\gamma<1. The equivalence breaks because discount affects traces differently.",
      ],
      correctAnswer: 0,
      explanation: "In the offline setting, V is fixed throughout an episode and updates are applied only at the end. The forward view (\\lambda-return using fixed V) and backward view (eligibility traces) produce identical weight changes. Online: V is updated within the episode. Mid-episode changes mean G_t^\\lambda changes as V is updated, breaking the equivalence. True Online TD(\\lambda) (van Seijen et al., 2016) resolves this with a corrected dutch traces formulation that remains equivalent to the online \\lambda-return target.",
      hints: [
        "The \\lambda-return G_t^\\lambda uses V(S_{t+n}). If V changes mid-episode, does G_t^\\lambda change too?",
        "In the offline case, all updates happen after the episode, so V is fixed during G_t^\\lambda computation. Is V fixed in the online case?",
      ],
    },
  ],

  "count-based-exploration": [
    {
      id: "q-rl-kp48-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Count-based exploration methods give a bonus reward r_plus = \\beta / sqrt(N(s)) where N(s) is the visit count. What is the key insight behind this bonus?",
      options: [
        "Rarely visited states have high uncertainty in value estimates, so the bonus encourages the agent to resolve that uncertainty (optimism under uncertainty)",
        "The bonus ensures the agent collects equal numbers of samples from all states",
        "It penalizes the agent for revisiting states to prevent circular behavior",
        "It is equivalent to adding entropy regularization to the policy",
      ],
      correctAnswer: 0,
      explanation: "Count-based exploration is motivated by optimism under uncertainty: states visited rarely (small N(s)) have high uncertainty in their value estimates, so the agent should explore them to potentially discover high-reward regions. The bonus \\beta/sqrt(N(s)) decreases as N(s) grows, naturally reducing exploration. This mirrors UCB1 from multi-armed bandits which adds \\beta\cdot sqrt(ln t / N(a)) to action values.",
      hints: [
        "What happens to the bonus \\beta/sqrt(N(s)) as N(s) grows large? Does the agent eventually stop exploring that state?",
        "Think about the UCB principle from bandits: it favors arms with high uncertainty. How is count-based exploration in MDPs analogous?",
      ],
    },
    {
      id: "q-rl-kp48-2",
      type: "true-false",
      difficulty: "easy",
      question: "Count-based exploration methods scale naturally to high-dimensional continuous state spaces like raw image observations.",
      correctAnswer: "false",
      explanation: "Count-based methods require counting visits to individual states. In continuous or high-dimensional spaces (e.g., Atari pixel observations), each state is visited at most once, making raw counts useless. Pseudo-count methods (Bellemare et al., 2016) address this by using a density model to estimate a pseudo-count from the rate of surprise: the model's prediction probability for s before and after seeing it determines a pseudo-count that generalizes to nearby states.",
      hints: [
        "In a continuous state space, how many times would any exact state typically be visited during training?",
        "If N(s) = 0 or 1 for all s (because states are never revisited exactly), what does the bonus \\beta/sqrt(N(s)) look like for all states?",
      ],
    },
    {
      id: "q-rl-kp48-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Intrinsic Curiosity Module (ICM, Pathak et al., 2017) uses an inverse dynamics model to train its feature representation. Why is the inverse model crucial for addressing the noisy-TV problem?",
      options: [
        "The inverse model caps the maximum intrinsic reward to prevent the agent being distracted by TV noise",
        "The inverse model predicts action a_t from (phi(s_t), phi(s_{t+1})). Training features to predict actions forces them to encode only state aspects controllable by the agent. Uncontrollable noise (TV pixels) is irrelevant to action prediction and excluded from phi, so the forward model cannot be fooled by stochastic uncontrollable observations.",
        "The inverse model replaces the forward model, using backward prediction to compute intrinsic rewards",
        "The inverse model provides a separate reward signal that cancels out the noise-driven reward",
      ],
      correctAnswer: 1,
      explanation: "ICM's inverse model predicts a_t from (\\phi(s_t), \\phi(s_{t+1})). For this to be accurate, \\phi must encode state aspects that change due to the agent's actions. Random TV pixels change independently of actions and are useless for action prediction - they are excluded from \\phi. The forward model predicts \\phi(s_{t+1}) from (\\phi(s_t), a_t); since \\phi ignores uncontrollable noise, the forward model can learn to predict \\phi(s_{t+1}) for TV-related transitions, driving intrinsic reward to zero.",
      hints: [
        "The noisy TV problem: an agent gets intrinsic reward for staring at random TV because the forward model cannot predict random pixels. What must be true about features \\phi to prevent this?",
        "The inverse model predicts the action from state transitions. What does this force the features to capture, and what does it force them to ignore?",
      ],
    },
  ],

  "bellman-operators-theory": [
    {
      id: "q-rl-kp49-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Bellman optimality operator T* is a \\gamma-contraction in the sup-norm. What does Banach's fixed-point theorem guarantee about repeated application (T*)^k V?",
      options: [
        "||(T*)^k V - V*||_inf \\leq \\gamma^k ||V - V*||_inf, so (T*)^k V converges to V* geometrically for any initial V",
        "The sequence (T*)^k V converges to V* in exactly |S| steps",
        "The operator T* is only a contraction for \\gamma < 0.5",
        "(T*)^k V diverges unless V is initialized to zero",
      ],
      correctAnswer: 0,
      explanation: "The Bellman optimality operator T\cdot V(s) = max_a [r(s,a) + \\gamma * \\Sigma_{s'} P(s'|s,a) V(s')] is a \\gamma-contraction in the sup-norm. By Banach's fixed-point theorem, it has a unique fixed point V*, and for any initial V: ||(T*)^k V - V*||_inf \\leq \\gamma^k ||V - V*||_inf. This is the theoretical foundation of value iteration: each sweep contracts the error by factor \\gamma, guaranteeing geometric convergence for any \\gamma < 1.",
      hints: [
        "A contraction mapping satisfies d(Tx, Ty) \\leq \\gamma * d(x,y). How does repeated application affect the distance to the fixed point?",
        "Banach's theorem: any contraction on a complete metric space has a unique fixed point reachable by iteration. What is the fixed point of T*?",
      ],
    },
    {
      id: "q-rl-kp49-2",
      type: "true-false",
      difficulty: "medium",
      question: "The Bellman evaluation operator T^\\pi (for a fixed policy \\pi) is also a \\gamma-contraction with unique fixed point V^\\pi, guaranteeing convergence of iterative policy evaluation from any initial value function.",
      correctAnswer: "true",
      explanation: "The Bellman evaluation operator T^\\pi V(s) = \sum_a \\pi(a|s) [r(s,a) + \\gamma * \\Sigma_{s'} P(s'|s,a) V(s')] is a \\gamma-contraction in the sup-norm with unique fixed point V^\\pi. This guarantees that iterative policy evaluation - repeatedly applying T^\\pi starting from any V_0 - converges to V^\\pi geometrically: ||(T^\\pi)^k V_0 - V^\\pi||_inf \\leq \\gamma^k ||V_0 - V^\\pi||_inf.",
      hints: [
        "The contraction argument does not depend on whether we take a max or a weighted sum over actions. Does T^\\pi also contract by factor \\gamma?",
        "What is the fixed point of T^\\pi V = V? This is exactly the Bellman equation for V^\\pi.",
      ],
    },
    {
      id: "q-rl-kp49-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Q-learning with function approximation can diverge even when tabular Q-learning converges. Which condition of the contraction-mapping proof fails with function approximation?",
      options: [
        "The Bellman operator T* is no longer a \\gamma-contraction when the action space is continuous",
        "The projected Bellman operator \\Pi∘T* (where \\Pi projects onto the function approximation class) is NOT generally a contraction, enabling divergence - as shown by Baird's counterexample (1995)",
        "Neural networks cannot represent Q-functions for \\gamma close to 1",
        "Function approximation effectively changes the discount factor \\gamma, invalidating the contraction",
      ],
      correctAnswer: 1,
      explanation: "With function approximation, Q is constrained to a parametric family. After applying T*, the result T\cdot Q may not lie in this family, so we project back: \\Pi(T\cdot Q). The composition \\Pi∘T* is NOT generally a contraction - Baird (1995) showed a simple linear function approximation example that diverges with off-policy semi-gradient TD. DQN's experience replay and target networks empirically stabilize training but do not provide theoretical convergence guarantees for neural networks.",
      hints: [
        "T* is a contraction on the full value function space. Projection onto a restricted parametric space happens after applying T*. Does projection preserve the contraction property?",
        "Baird's counterexample (1995) showed divergence of linear FA with off-policy TD. What does this say about the projected Bellman operator \\Pi∘T*?",
      ],
    },
  ],

  "convergence-theory": [
    {
      id: "q-rl-kp50-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Tabular Q-learning converges under the Robbins-Monro conditions: \\Sigma_t \\alpha_t = \\infty and \\Sigma_t \\alpha_t^2 < \\infty. What do these two conditions ensure respectively?",
      options: [
        "\\Sigma \\alpha_t = \\infty ensures updates are large enough in aggregate to overcome any initial bias; \\Sigma \\alpha_t^2 < \\infty ensures accumulated variance of update noise goes to zero",
        "\\Sigma \\alpha_t = \\infty ensures fast convergence; \\Sigma \\alpha_t^2 < \\infty ensures sufficient exploration",
        "\\Sigma \\alpha_t = \\infty ensures numerical stability; \\Sigma \\alpha_t^2 < \\infty ensures the policy improves monotonically",
        "Both conditions together just mean the step size must remain smaller than 1",
      ],
      correctAnswer: 0,
      explanation: "The Robbins-Monro conditions guarantee stochastic approximation convergence: (1) \\Sigma \\alpha_t = \\infty means steps are large enough in aggregate to overcome any initial bias - the algorithm can correct errors of any magnitude. (2) \\Sigma \\alpha_t^2 < \\infty means step sizes shrink fast enough that accumulated noise variance goes to zero. Together they ensure convergence. The schedule \\alpha_t = 1/t satisfies both; a constant \\alpha satisfies only the first and causes Q to fluctuate around Q* rather than converge exactly.",
      hints: [
        "The schedule \\alpha_t = 1/t satisfies \\Sigma 1/t = \\infty and \\Sigma 1/t^2 < \\infty. What about a constant step size \\alpha?",
        "If \\alpha is constant, \\Sigma \\alpha^2 = \\infty. What does failure of the second condition mean for exact convergence?",
      ],
    },
    {
      id: "q-rl-kp50-2",
      type: "true-false",
      difficulty: "medium",
      question: "Value iteration is guaranteed to find the exact optimal value function V* in a finite number of iterations for finite MDPs with \\gamma < 1.",
      correctAnswer: "false",
      explanation: "Value iteration converges asymptotically to V* but does not reach it in finite steps. Each iteration contracts the error by factor \\gamma: ||V_k - V*||_inf \\leq \\gamma^k ||V_0 - V*||_inf. For practical \\epsilon-optimality, we stop when ||V_{k+1} - V_k||_inf < \\epsilon(1-\\gamma)/(2\\gamma), which guarantees the greedy policy is \\epsilon-optimal. Exact convergence in finite steps would require \\gamma=0.",
      hints: [
        "Each value iteration sweep multiplies the error by \\gamma < 1. Does the error ever reach exactly zero in a finite number of steps?",
        "For \\epsilon-optimality: how many iterations k satisfy \\gamma^k * ||V_0 - V*||_inf \\leq \\epsilon?",
      ],
    },
    {
      id: "q-rl-kp50-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Policy iteration converges in finite steps for finite MDPs. Which of the following best explains why?",
      options: [
        "Policy iteration uses a faster Bellman operator that contracts by \\gamma^2 instead of \\gamma",
        "Policy iteration evaluates V^\\pi exactly by solving a linear system and improves strictly at each step. Since there are finitely many deterministic policies (|A|^|S|) and each step yields strict improvement, the algorithm must terminate.",
        "Policy iteration parallelizes backup operations across all states simultaneously",
        "Policy iteration does not require a discount factor \\gamma so convergence rate is \\gamma-independent",
      ],
      correctAnswer: 1,
      explanation: "Policy iteration alternates between exact policy evaluation (solving (I - \\gammaP^\\pi)V = R^\\pi) and greedy improvement. The policy strictly improves at each step: V^{\\pi_{k+1}}(s) \\geq V^{\\pi_k}(s) for all s, with strict inequality somewhere unless \\pi_k is already optimal. Since there are finitely many deterministic policies (|A|^|S|) and each step strictly improves, the algorithm terminates in at most |A|^|S| steps - in practice much fewer.",
      hints: [
        "How many distinct deterministic policies exist in a finite MDP with |S| states and |A| actions per state?",
        "Can policy iteration revisit the same policy twice? What does strict monotone improvement imply about the sequence of policies?",
      ],
    },
  ],

  "dyna-architecture": [
    {
      id: "q-rl-kp51-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The Dyna-Q architecture (Sutton, 1990) integrates model-based and model-free RL. After each real environment step, Dyna-Q performs n additional planning steps. What do these planning steps involve?",
      options: [
        "Collecting n more real environment transitions using the current policy",
        "Sampling previously experienced (s,a) pairs from a learned model and applying Q-learning updates to the simulated (s, a, r_hat, s_hat) transitions",
        "Computing n-step TD returns using the real trajectory",
        "Running policy gradient updates using the model's simulated trajectories",
      ],
      correctAnswer: 1,
      explanation: "In Dyna-Q, the model M(s,a) stores the estimated next state and reward for previously visited (s,a) pairs. After each real transition: (1) update Q(s,a) with real data; (2) update M(s,a) with observed r and s'; (3) for n iterations, sample a random previously-seen (s,a), query M to get (r_hat, s_hat), and apply Q-learning. This improves sample efficiency by extracting more value from each real experience without additional environment interactions.",
      hints: [
        "Dyna-Q stores a model of the environment. What does the model predict given a state and action?",
        "Planning uses simulated experience. How many real environment steps does one planning iteration require?",
      ],
    },
    {
      id: "q-rl-kp51-2",
      type: "true-false",
      difficulty: "easy",
      question: "In Dyna-Q, increasing the number of planning steps n always improves performance regardless of the quality of the learned environment model.",
      correctAnswer: "false",
      explanation: "If the environment model is inaccurate (e.g., early in learning or in non-stationary environments), extensive planning on a wrong model can be harmful - the agent reinforces incorrect Q-values based on faulty simulated experience. With an accurate model, more planning steps improve performance; with an inaccurate model, excessive planning can be worse than fewer steps or pure model-free RL. Dyna-Q+ addresses non-stationarity by adding exploration bonuses for infrequently tried actions.",
      hints: [
        "If the model is wrong and predicts the wrong next state, what happens to Q-values after many planning steps using that wrong model?",
        "Dyna-Q+ adds exploration bonuses for actions not tried recently. What problem is it solving?",
      ],
    },
    {
      id: "q-rl-kp51-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Dyna-Q uses a tabular model memorizing exact (s,a) \\to (r,s') transitions. How do world-model approaches like Dreamer (Hafner et al., 2020) generalize this to image observations?",
      options: [
        "Dreamer uses a larger lookup table with image compression to handle pixel inputs",
        "Dreamer learns a recurrent latent dynamics model: an encoder maps images to compact latent states z_t, a transition model predicts p(z_{t+1}|z_t, a_t), a reward model predicts r from z_t, and planning occurs via imagined rollouts entirely in latent space",
        "Dreamer replaces the model with a retrieval system that finds the most similar stored image",
        "Dreamer learns the transition function directly in pixel space using a convolutional decoder",
      ],
      correctAnswer: 1,
      explanation: "Dreamer (RSSM) learns a compact latent world model: encoder h(o_t)\\toz_t maps observations to latent states; a recurrent transition model predicts z_{t+1} from (z_t, a_t, h_t) via a GRU; reward and value models predict r and V from z. During imagination, the agent rolls out trajectories purely in latent space and trains a policy via backpropagation through time. This makes planning tractable for pixel-observation environments where Dyna's tabular model is infeasible.",
      hints: [
        "A tabular model stores exact state-action pairs. Why can't this work with 84x84x4 pixel frames?",
        "Dreamer's key insight: learn a compressed representation z_t and model transitions in latent space. What are the benefits of planning in latent space rather than pixel space?",
      ],
    },
  ],

  "planning-algorithms": [
    {
      id: "q-rl-kp52-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Monte Carlo Tree Search (MCTS) uses the UCT formula: UCT(s,a) = Q(s,a) + C * sqrt(ln N(s) / N(s,a)). What is the purpose of the second term?",
      options: [
        "It penalizes actions taken too many times, encouraging the agent to give up on bad actions",
        "It adds an exploration bonus that is large when action a has been tried rarely relative to total visits N(s), encouraging exploration of less-sampled branches",
        "It normalizes Q(s,a) to lie in [0,1]",
        "It estimates the variance of the Q-value estimate to reduce noise",
      ],
      correctAnswer: 1,
      explanation: "The UCT exploration bonus C\cdot sqrt(ln N(s) / N(s,a)) grows as N(s,a) decreases relative to N(s). This implements UCB1 from multi-armed bandits in tree search: actions sampled fewer times get a higher exploration bonus, ensuring all branches are tried sufficiently often. As N(s,a) grows, the bonus shrinks, shifting focus to exploitation. AlphaZero extends UCT by replacing Q with a neural network value estimate and adding a prior P(a|s) from a policy network.",
      hints: [
        "If action a has been tried very few times (N(s,a) is small), is the UCT bonus large or small?",
        "Compare UCT to UCB1 for bandits: UCB1 = Q_bar_a + C\cdot sqrt(ln t / N_a). What is the MDP analog of t?",
      ],
    },
    {
      id: "q-rl-kp52-2",
      type: "true-false",
      difficulty: "medium",
      question: "MuZero learns to plan without learning to reconstruct observations, instead learning a latent transition model sufficient only for MCTS-based planning.",
      correctAnswer: "true",
      explanation: "MuZero (Schrittwieser et al., 2020) learns three functions: a representation function mapping observations to latent states, a dynamics function predicting the next latent state and reward, and a prediction function outputting policy and value. Crucially, MuZero does NOT learn to reconstruct observations - there is no decoder. It learns a latent model sufficient for MCTS planning, trained to match MCTS policy targets and game outcomes, achieving state-of-the-art on Atari, Go, Chess, and Shogi.",
      hints: [
        "MuZero uses MCTS for planning. Does it need to reconstruct pixel observations from latent states to perform this planning?",
        "What does MuZero's dynamics function predict, and is this a full generative model of observations?",
      ],
    },
    {
      id: "q-rl-kp52-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Prioritized sweeping focuses Dyna-style model updates on state-action pairs with large expected value changes. What determines the priority assigned to a pair?",
      options: [
        "The most recently visited (s,a) pair receives highest priority",
        "Priority is the expected magnitude of the Bellman error |Q(s,a) - (r + \\gamma * max_{a'} Q(s',a'))| after receiving a model update propagated backward from a high-TD-error transition",
        "Pairs with the smallest visit count N(s,a) get highest priority",
        "The pair with the highest current Q-value estimate gets highest priority",
      ],
      correctAnswer: 1,
      explanation: "Prioritized sweeping (Moore & Atkeson, 1993) maintains a priority queue ordered by expected Bellman error magnitude. After observing a large TD error at (s,a), it identifies predecessor states that may now have large value changes and adds them to the queue. This focuses computation on the most informative updates, propagating value information backward from high-reward states much faster than uniform Dyna planning - dramatically reducing the number of updates needed for maze-like problems.",
      hints: [
        "If Q(s,a) just changed a lot due to a large TD error, which states should we update next?",
        "Value information propagates backward: if s' has high value and we just discovered this, which predecessors of s' should be prioritized?",
      ],
    },
  ],

  "intrinsic-motivation": [
    {
      id: "q-rl-kp53-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Random Network Distillation (RND, Burda et al., 2019) computes intrinsic rewards as ||f(s) - g_theta(s)||^2, where f is a fixed random network and g_theta is a trained predictor. Why does this measure novelty?",
      options: [
        "Novel states have large prediction error because g_theta has not been trained on them; frequently visited states have small error because g_theta has been optimized on those states",
        "The KL divergence between f(s) and g_theta(s) treated as probability distributions measures state rarity",
        "The cosine similarity between f(s) and the previous state embedding measures transition novelty",
        "The negative log probability of s under g_theta's distribution measures how unlikely the state is",
      ],
      correctAnswer: 0,
      explanation: "RND's intrinsic reward is ||f(s) - g_theta(s)||^2. The random network f has fixed weights. The predictor g_theta is trained to minimize this error on visited states. For frequently visited states, g_theta has many training examples and achieves low error. For novel states, g_theta has few examples and has high error, yielding a large intrinsic reward. RND is computationally efficient and effective for hard-exploration Atari games like Montezuma's Revenge.",
      hints: [
        "The predictor g_theta is only trained on states the agent has actually visited. What does high prediction error indicate about how often s has been visited?",
        "Both f and g_theta have the same output dimension. What is the advantage of using a fixed random target network instead of a learned one?",
      ],
    },
    {
      id: "q-rl-kp53-2",
      type: "true-false",
      difficulty: "easy",
      question: "All intrinsic motivation methods for exploration require maintaining an explicit count N(s) of how many times each state has been visited.",
      correctAnswer: "false",
      explanation: "Many intrinsic motivation methods avoid explicit state counts. RND uses neural network prediction error. ICM uses forward model prediction error in a learned feature space. VIME uses information gain on a Bayesian neural network model. These methods generalize to continuous and high-dimensional state spaces where exact state counts are meaningless (every state is visited at most once). Pseudo-count methods approximate counts via density models but still avoid explicit enumeration.",
      hints: [
        "RND computes intrinsic reward as ||f(s) - g_theta(s)||^2. Does this formula require knowing N(s)?",
        "What makes explicit counts infeasible for high-dimensional observations like 84x84 pixel images?",
      ],
    },
    {
      id: "q-rl-kp53-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The noisy-TV problem is a failure mode for forward-prediction-based intrinsic motivation. Which describes the problem and a valid solution?",
      options: [
        "The agent's policy network oscillates between actions, creating instability. Solution: use a target network to stabilize updates.",
        "In environments with irreducible stochasticity (e.g., a TV showing random noise), a forward model predicting next states in raw observation space always has high error regardless of the agent's actions, generating intrinsic reward for watching TV. Solution: ICM's inverse model trains features to encode only controllable state aspects, excluding uncontrollable noise so the forward model's error goes to zero for TV-watching.",
        "The reward function is corrupted by random environmental noise. Solution: use reward normalization.",
        "The agent's value function oscillates due to high learning rates. Solution: reduce the step size alpha.",
      ],
      correctAnswer: 1,
      explanation: "The noisy-TV problem: a forward model predicting next observations in raw pixel space is attracted to irreducible stochasticity (random noise, particle effects) because the error can never be reduced. ICM's inverse model (predicting a_t from (phi(s_t), phi(s_{t+1}))) forces features to encode only controllable state aspects - random TV pixels are irrelevant to action prediction and are excluded from phi. RND also avoids this: f(s) is deterministic, so even for a noisy TV, f(s) gives a consistent target that g_theta can learn to predict, driving intrinsic reward to zero.",
      hints: [
        "A random TV generates different pixels every frame. Can any forward model in raw pixel space predict the next frame's exact noise pattern?",
        "RND's target f(s) is deterministic (fixed random weights). Does f(s) change between visits to the same TV state? Can g_theta eventually learn to predict it?",
      ],
    },
  ],

  "fixed-point-theory": [
    {
      id: "q-rl-kp54-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Bellman equation V^\\pi = R^\\pi + \\gamma * P^\\pi * V^\\pi can be written as a linear system. What is the closed-form solution for V^\\pi?",
      options: [
        "V^\\pi = (I - \\gamma * P^\\pi)^{-1} * R^\\pi",
        "V^\\pi = (I + \\gamma * P^\\pi)^{-1} * R^\\pi",
        "V^\\pi = R^\\pi / (1 - \\gamma)",
        "V^\\pi = \\gamma * (I - P^\\pi)^{-1} * R^\\pi",
      ],
      correctAnswer: 0,
      explanation: "Rearranging V = R^\\pi + \\gamma * P^\\pi * V gives (I - \\gamma * P^\\pi) * V = R^\\pi, so V^\\pi = (I - \\gamma * P^\\pi)^{-1} * R^\\pi. The matrix (I - \\gamma * P^\\pi) is invertible because its eigenvalues are 1 - \\gamma \cdot \\lambda_i where \\lambda_i are eigenvalues of the stochastic matrix P^\\pi (|\\lambda_i| \\leq 1), so 1 - \\gamma \cdot \\lambda_i \\geq 1-\\gamma > 0 for \\gamma < 1. This closed-form requires O(|S|^3) computation and proves V^\\pi uniquely exists, but iterative policy evaluation avoids explicit matrix inversion.",
      hints: [
        "Start from V = R^\\pi + \\gamma * P^\\pi * V. Collect V terms on one side: (I - \\gamma \cdot P^\\pi)\cdot V = R^\\pi. How do you solve for V?",
        "Is (I - \\gamma * P^\\pi) invertible for \\gamma < 1? What are its eigenvalues given that P^\\pi is a stochastic matrix?",
      ],
    },
    {
      id: "q-rl-kp54-2",
      type: "true-false",
      difficulty: "medium",
      question: "For a discounted MDP with \\gamma < 1, the optimal value function V* is the unique fixed point of T*, always exists, and is always finite for bounded rewards.",
      correctAnswer: "true",
      explanation: "By Banach's fixed-point theorem, since T* is a \\gamma-contraction on the complete metric space of bounded functions with the sup-norm, it has a unique fixed point V*. Boundedness: since |r| \\leq r_max, the value function satisfies |V\cdot (s)| \\leq r_max / (1-\\gamma) < \\infty. Uniqueness: if V and U are both fixed points, then ||V - U||_inf = ||T\cdot V - T\cdot U||_inf \\leq \\gamma * ||V - U||_inf, requiring ||V - U||_inf = 0.",
      hints: [
        "If |r(s,a)| \\leq r_max for all s,a, what is an upper bound on |\\Sigma_{t=0}^\\infty \\gamma^t * r_t|?",
        "If V and U are both fixed points of T*, what does the contraction inequality \\gamma * ||V - U||_inf \\geq ||V - U||_inf imply?",
      ],
    },
    {
      id: "q-rl-kp54-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Semi-gradient TD(0) with linear function approximation V(s;w) = w^T * phi(s) does not minimize a well-defined fixed loss. What does it actually converge to (for linear FA)?",
      options: [
        "The minimum of the mean squared TD error E[\\delta_t^2], equivalent to MSE from supervised learning with fixed targets",
        "The TD fixed point w* satisfying E[\\delta_t * phi(s_t)] = 0, found by treating the target (r + \\gamma \cdot V(s';w)) as a constant when computing gradients - so the update is not the gradient of any fixed scalar objective",
        "The minimum of the projected Bellman error ||V_w - \\Pi * T^\\pi * V_w||_\mu^2 directly",
        "The minimum of the KL divergence between the target and current value distributions",
      ],
      correctAnswer: 1,
      explanation: "Semi-gradient TD treats the target y_t = r + \\gamma \cdot V(s';w) as a constant (stops gradient through V(s';w)), computing update -\\alpha * \\delta_t * phi(s_t). This is not the gradient of any fixed scalar loss because the target changes as w changes. For linear FA, the algorithm converges to the TD fixed point w* satisfying E[\\delta_t * phi(s_t)] = 0, equivalently \\Pi * T^\\pi * V_{w*} = V_{w*}. The resulting error satisfies ||V_{w*} - V*||_\mu \\leq (1/sqrt(1-\\gamma)) * min_w ||V_w - V*||_\mu.",
      hints: [
        "In supervised learning the target y_t is fixed. In TD, the target r + \\gamma \cdot V(s';w) depends on w. What happens to the gradient calculation when you treat the target as a constant?",
        "If y_t(w) changes as w changes, is -(1/2) * ||V(s;w) - y_t(w)||^2 a well-defined scalar objective we can minimize by gradient descent?",
      ],
    },
  ],

  "model-based-rl-advanced": [
    {
      id: "q-rl-kp55-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "MBPO (Model-Based Policy Optimization, Janner et al., 2019) uses short model-generated rollouts (k=1 to 5 steps) to augment real data. Why are short rollouts preferred over long ones?",
      options: [
        "Short rollouts fit in GPU memory while long rollouts do not",
        "Model errors compound over time: a model with per-step error \\epsilon accumulates O(k*\\epsilon) error over k steps. Short rollouts bound this compounding, balancing the benefit of model-generated data against model bias.",
        "Long rollouts require a target network to stabilize, which MBPO does not implement",
        "Short rollouts allow more frequent policy gradient updates per wall-clock time",
      ],
      correctAnswer: 1,
      explanation: "MBPO's theoretical bound shows |J(\\pi) - J_model(\\pi)| \\leq O(k * \\epsilon_model / (1-\\gamma)) + O(\\gamma^k / (1-\\gamma) * \\epsilon_real), where \\epsilon_model is the model's one-step error and \\epsilon_real captures real-data coverage error. Short rollouts (small k) limit model bias accumulation. Longer rollouts create more biased estimates. Empirically, k=1 works well for simple tasks; k up to 10 for harder environments. Real transitions are always included to anchor rollout starting states.",
      hints: [
        "If a model makes error \\epsilon at each step, what is the total error after k steps of a rollout?",
        "Long rollouts using an imperfect model move the agent far from states covered by real data. How does this affect the quality of value estimates?",
      ],
    },
    {
      id: "q-rl-kp55-2",
      type: "true-false",
      difficulty: "medium",
      question: "A world model that accurately minimizes one-step observation prediction loss (MSE on next observations) is always sufficient to learn a near-optimal policy via model-based planning.",
      correctAnswer: "false",
      explanation: "A model with low one-step MSE may still be a poor model for policy optimization: (1) the model may have high error in regions of state space visited by the optimal policy, even if global MSE is low; (2) compounding errors over multi-step rollouts can be large even when per-step error is small; (3) the relevant metric for policy optimization is return under the model vs. real environment, not global observation MSE. This motivates value-equivalent models trained jointly with policy objectives, and latent models like MuZero that match return distributions rather than observations.",
      hints: [
        "MSE averages over the training data distribution. If the optimal policy visits different states, can a low global MSE still imply high error on policy-relevant states?",
        "Even if per-step observation MSE is \\epsilon, how does error grow over H steps of a planning rollout?",
      ],
    },
    {
      id: "q-rl-kp55-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "AlphaZero trains its neural network to predict \\pi_MCTS proportional to N(s,a)^{1/\\tau} (MCTS visit counts) rather than just the greedy MCTS action. What is the primary reason for this design choice?",
      options: [
        "The softmax of visit counts is more numerically stable than one-hot action targets",
        "MCTS represents a stronger policy than the raw neural network because it performs lookahead over many trajectories. Using \\pi_MCTS as the training target causes the network to distill the search result, progressively learning to approximate what deep MCTS search would produce - acting as an iterative policy improvement operator.",
        "Using the greedy action would make training deterministic and prevent exploration during self-play",
        "The visit counts are more readily differentiable through the MCTS computation graph",
      ],
      correctAnswer: 1,
      explanation: "AlphaZero's training loop: (1) use the current neural network (p, v) as prior and value estimate in MCTS; (2) MCTS produces a refined policy \\pi_MCTS by aggregating evidence from thousands of simulations; (3) train the network to predict \\pi_MCTS and the game outcome z. MCTS is a policy improvement operator: given the network's initial p(a|s), MCTS produces a better policy. Training the network to match \\pi_MCTS distills the search's strength into the network, making future MCTS searches even stronger - a virtuous cycle enabling superhuman performance.",
      hints: [
        "MCTS performs many simulations from each position. Is the resulting \\pi_MCTS a stronger or weaker policy than the raw network output p(a|s)?",
        "If MCTS is a policy improvement step and you train the network to mimic MCTS output, what happens to the quality of future MCTS searches that use the improved network as prior?",
      ],
    },
  ],
};
Object.assign(questions, extra);

registerQuestions(questions);
export default questions;
