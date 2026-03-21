import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  dqn: [
    {
      id: "q-rla-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Deep Q-Network (DQN) extends Q-learning to large state spaces by:",
      options: [
        "Using a lookup table with interpolation between states",
        "Approximating the Q-function with a deep neural network parameterized by \\theta",
        "Discretizing the state space into a finite grid",
        "Running multiple Q-learning agents in parallel",
      ],
      correctAnswer: 1,
      explanation:
        "Standard Q-learning uses a table to store $Q(s,a)$ for every state-action pair. This works for small problems, but fails when the state space is enormous (e.g., Atari frames with $210 \\times 160$ pixels giving ~10^50 states).\n\n**Step 1.** DQN replaces the Q-table with a deep neural network $Q(s,a;\\theta)$ parameterized by weights $\\theta$. The network takes a raw state $s$ (or stack of frames) as input and outputs a Q-value $Q(s,a;\\theta)$ for each action $a$.\n\n**Step 2.** This function approximation enables generalization: instead of learning $Q(s,a)$ for each $s$ individually, the network learns a shared representation that applies to all states, so experiencing one state improves Q-value estimates for similar states.\n\nTherefore, DQN extends Q-learning to large state spaces by approximating the Q-function with a deep neural network parameterized by $\\theta$.",
      hints: [
        "Tabular Q-learning cannot scale to Atari games with 210\\times160 pixel states.",
        'What does "deep" in DQN refer to?',
      ],
    },
    {
      id: "q-rla-kp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DQN can be applied directly to environments with continuous action spaces.",
      correctAnswer: "false",
      explanation:
        "Standard DQN requires computing max_a Q(s,a) over all actions, which is only tractable for discrete action spaces. Algorithms like DDPG or SAC extend deep Q-learning ideas to continuous actions.",
      hints: [
        "The DQN update requires finding the action that maximizes Q - how do you do this with infinitely many actions?",
        "Think about the computational challenge of maximizing over a continuous set.",
      ],
    },
    {
      id: "q-rla-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The two key innovations that made DQN stable enough to learn Atari games were:",
      options: [
        "Policy gradients and entropy regularization",
        "Experience replay and a separate target network",
        "Batch normalization and residual connections",
        "Prioritized sampling and double Q-learning",
      ],
      correctAnswer: 1,
      explanation:
        "DQN with a neural network faces two key instability problems:\n\n**Step 1. Correlated data.** Sequential transitions $(s_t, a_t, r_t, s_{t+1})$ are highly correlated in time. If the network trains on these sequentially, the data distribution shifts during training, causing gradient descent to oscillate or diverge.\n\n**Step 2. Moving target.** The DQN update uses $y = R + \\gamma \\max_{a'} Q(s',a';\\theta)$ as the target. Since $\\theta$ changes with every update, the target keeps moving - a moving target for a supervised learning problem.\n\nExperience replay and the target network address these respectively:\n\n**Step 3.** Experience replay stores transitions in a replay buffer and samples uniformly at random for each gradient update. This decorrelates the training data, making it closer to i.i.d., and allows each transition to be reused many times for data efficiency.\n\n**Step 4.** The target network $Q(s',a';\\theta^-)$ is a separate, periodically-copied network kept fixed for many steps, providing stable targets $y = R + \\gamma \\max_{a'} Q(s',a';\\theta^-)$ while the online network $\\theta$ is updated. This prevents the moving-target problem.\n\nTogether, these two innovations made DQN stable enough to learn Atari games.",
      hints: [
        "Training on correlated sequential data causes instability in gradient descent.",
        "Chasing a moving target (the Q-network you\'re updating) also causes instability.",
      ],
    },
  ],

  "experience-replay": [
    {
      id: "q-rla-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Experience replay in DQN stores transitions (s, a, r, s') in a replay buffer and:",
      options: [
        "Replays the most recent transition for every gradient update",
        "Samples mini-batches of past transitions uniformly at random for training",
        "Only stores transitions from successful episodes",
        "Replays entire episodes in reverse order",
      ],
      correctAnswer: 1,
      explanation:
        "By randomly sampling from the replay buffer, experience replay breaks the temporal correlations between consecutive training samples, making the data distribution closer to i.i.d. for gradient descent.",
      hints: [
        "What statistical assumption does mini-batch gradient descent make about training samples?",
        "Consecutive game frames are highly correlated - why is this a problem?",
      ],
    },
    {
      id: "q-rla-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Experience replay improves data efficiency because each transition can be used for multiple gradient updates.",
      correctAnswer: "true",
      explanation:
        "Since transitions are stored in a buffer and sampled multiple times, each experience contributes to many gradient updates rather than being used once and discarded, improving sample efficiency.",
      hints: [
        "In online learning without a replay buffer, how many times is each transition used?",
        "A buffer lets you reuse old data - how does this affect sample efficiency?",
      ],
    },
    {
      id: "q-rla-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A limitation of uniform experience replay is that:",
      options: [
        "It cannot store transitions from stochastic environments",
        "All transitions are treated as equally important regardless of their learning value",
        "It requires the replay buffer to fit entirely in GPU memory",
        "It cannot be combined with target networks",
      ],
      correctAnswer: 1,
      explanation:
        "Uniform sampling gives equal probability to all stored transitions, including those with small TD errors (already well-learned). Prioritized experience replay addresses this by sampling transitions with larger Bellman errors more frequently.",
      hints: [
        "Should a transition the agent already predicts well receive the same training attention as one with a large error?",
        "Think about which transitions provide the most learning signal.",
      ],
    },
  ],

  "target-networks": [
    {
      id: "q-rla-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In DQN, the target network is used to:",
      options: [
        "Select actions during environment interaction",
        "Provide stable TD targets by being updated less frequently than the online network",
        "Compute the policy gradient",
        "Encode the state observations into feature vectors",
      ],
      correctAnswer: 1,
      explanation:
        "In DQN, the TD target for updating the online network is:\n\\[y = R + \\gamma \\max_{a'} Q(s', a'; \\theta).\]\nBut since $\\theta$ changes at every gradient step, the target $y$ changes at every step too. This \"moving target\" problem causes training instability, similar to chasing a moving goalpost.\n\n**Step 1.** A target network $Q(s,a;\\theta^-)$ is introduced as a periodically-copied snapshot of the online network. It is kept fixed (frozen) for many steps.\n\n**Step 2.** During those frozen steps, the target becomes:\n\\[y = R + \\gamma \\max_{a'} Q(s', a'; \\theta^-).\]\nSince $\\theta^-$ is constant, the target is stable, giving the online network a fixed goal to optimize toward.\n\n**Step 3.** After $C$ steps (typically thousands), the online weights $\\theta$ are copied to the target: $\\theta^- \\leftarrow \\theta$. The target jumps to a new, slightly better goal, and the process repeats.\n\nThis stabilization of the TD target is why DQN with a target network can successfully train a deep neural network.",
      hints: [
        "If the target keeps changing as you update the network, what problem does this create?",
        "The target network provides a fixed (temporarily) goal to optimize toward.",
      ],
    },
    {
      id: "q-rla-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Without a target network, training DQN is equivalent to supervised learning because the targets are fixed.",
      correctAnswer: "false",
      explanation:
        "Without a target network, the targets y = R + \\gamma max_a Q(s',a;\\theta) change with every gradient update to \\theta, creating a moving target problem unlike standard supervised learning where labels are fixed.",
      hints: [
        "In supervised learning, are the labels fixed or changing?",
        "When you update \\theta, how does that affect max_a Q(s',a;\\theta) used in the target?",
      ],
    },
    {
      id: "q-rla-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Polyak (soft) averaging for target network updates sets \\theta\\^{- \\leftarrow \\tau\\theta + (1-\\tau)\\theta\\^{- with small \\tau. Compared to periodic hard updates, this:",
      options: [
        "Creates faster convergence by incorporating new information immediately",
        "Provides smoother, more gradual target updates that reduce instability",
        "Eliminates the need for a replay buffer",
        "Makes the target network identical to the online network at every step",
      ],
      correctAnswer: 1,
      explanation:
        "Soft updates blend the online and target networks continuously with a small mixing factor \\tau (e.g., 0.005), causing the target to evolve slowly and smoothly - reducing the instability caused by sudden large jumps in hard updates.",
      hints: [
        "A small \\tau means \\theta\\^{- changes very little per step - what does this do to target stability?",
        "Soft updates are used in DDPG and SAC - why might they prefer smooth updates?",
      ],
    },
  ],

  "double-dqn": [
    {
      id: "q-rla-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Double DQN addresses maximization bias by:",
      options: [
        "Using two completely separate replay buffers",
        "Decoupling action selection (online network) from action evaluation (target network)",
        "Averaging Q-values across two networks for each update",
        "Clipping Q-values to prevent overestimation",
      ],
      correctAnswer: 1,
      explanation:
        "In standard DQN, the TD target uses the same network for both selecting and evaluating the action:\n\\[y = R + \\gamma \\max_{a'} Q(s', a'; \\theta).\]\nThis is the source of maximization bias: the network overestimate the Q-value of the action it selects, because the same network both selects and evaluates.\n\n**Step 1.** Double DQN decouples selection and evaluation across two networks. The online network selects the action:\n\\[a^* = \\argmax_{a'} Q(s', a'; \\theta).\]\n\n**Step 2.** The target network evaluates that action:\n\\[y = R + \\gamma Q(s', a^*; \\theta^-).\]\nNote that $a^*$ comes from the online network, but the Q-value is computed by the target network.\n\n**Step 3.** Because different networks select and evaluate, the upward bias is reduced. If the online network picks an action due to overestimation, the target network's evaluation of that action is less likely to be overestimated, breaking the positive feedback loop that causes maximization bias.\n\nThis simple decoupling significantly reduces Q-value overestimation in practice.",
      hints: [
        "The bias in Q-learning comes from using the same values for both selection and evaluation.",
        "What if you use one network to pick the action and another to judge its value?",
      ],
    },
    {
      id: "q-rla-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Double DQN completely eliminates maximization bias in Q-value estimation.",
      correctAnswer: "false",
      explanation:
        "Double DQN substantially reduces maximization bias but does not eliminate it entirely, as the online and target networks are still correlated (one is a lagged copy of the other). True decorrelation would require fully independent networks.",
      hints: [
        "The target network in DQN is just an older copy of the online network - are they truly independent?",
        '"Reduces" vs. "eliminates" - consider the degree of independence between the two networks.',
      ],
    },
    {
      id: "q-rla-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Compared to standard DQN, Double DQN tends to:",
      options: [
        "Learn faster in all environments due to lower bias",
        "Underestimate Q-values, leading to overly conservative policies",
        "Produce more accurate Q-value estimates and better policies, especially in environments with many actions",
        "Require significantly more computation and memory",
      ],
      correctAnswer: 2,
      explanation:
        "Double DQN produces Q-value estimates closer to the true values, leading to better policies particularly in environments with many actions where maximization bias is most severe. The computational overhead is minimal.",
      hints: [
        "Where is maximization bias worst - few or many actions? Why?",
        "Better Q-value estimates should lead to better what?",
      ],
    },
  ],

  "dueling-dqn": [
    {
      id: "q-rla-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The Dueling DQN architecture decomposes Q(s,a) into:",
      options: [
        "A policy network and a value network running in parallel",
        "A state value stream V(s) and an advantage stream A(s,a)",
        "A reward predictor and a transition predictor",
        "An actor and a critic with shared lower layers",
      ],
      correctAnswer: 1,
      explanation:
        "The Q-value $Q(s,a)$ measures how good action $a$ is in state $s$. This can be decomposed into two components:\n\n**Step 1.** The state value $V(s)$: how good is state $s$ overall, regardless of action?\n\n**Step 2.** The advantage $A(s,a)$: how much better is action $a$ than the average action in state $s$? Formally, $A(s,a) = Q(s,a) - V(s)$. If $A(s,a) > 0$, action $a$ is better than average; if $A(s,a) < 0$, it is worse than average.\n\n**Step 3.** Dueling DQN decomposes the Q-value using this identity:\n\\[Q(s,a) = V(s) + A(s,a).\]\nThe architecture has a shared feature extractor followed by two separate streams: one outputs $V(s)$ and the other outputs $A(s,a)$ for each action. These are combined to produce $Q(s,a)$. The mean-subtraction ensures $V(s)$ and $A(s,a)$ are identifiable:\n\\[Q(s,a) = V(s) + A(s,a) - \\frac{1}{|A|} \\sum_{a'} A(s,a').\]",
      hints: [
        "Some states are good or bad regardless of what action you take - how can the architecture reflect this?",
        'Think about separating "how good is this state" from "how much better is this action."',
      ],
    },
    {
      id: "q-rla-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In Dueling DQN, the advantage stream A(s,a) is directly added to V(s) without any normalization to produce Q(s,a).",
      correctAnswer: "false",
      explanation:
        "Without normalization, V and A are not identifiable - the same Q can arise from infinitely many V/A combinations. The standard fix subtracts the mean advantage: Q(s,a) = V(s) + A(s,a) − (1/|A|)\\Sigma_a A(s,a).",
      hints: [
        "If Q = V + A, then V and A could each shift by \\pmc and cancel - is V then uniquely determined?",
        "Identifiability requires anchoring A - the mean subtraction centers it at zero.",
      ],
    },
    {
      id: "q-rla-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Dueling DQN is most beneficial in environments where:",
      options: [
        "Every action has a dramatically different outcome from every state",
        "Many states have similar values regardless of the action taken (action choice matters little)",
        "The state space is very small and fully observable",
        "The reward is always +1 or −1",
      ],
      correctAnswer: 1,
      explanation:
        "When many states are inherently good or bad regardless of the action (e.g., empty road in a racing game), learning V(s) separately allows efficient generalization - the network doesn\'t need to evaluate all actions in states where action choice is nearly irrelevant.",
      hints: [
        "In some game states, any action leads to roughly the same outcome - what stream captures this?",
        "The advantage stream is most informative when actions really differ in their consequences.",
      ],
    },
  ],

  "prioritized-replay": [
    {
      id: "q-rla-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Prioritized Experience Replay (PER) samples transitions from the replay buffer based on:",
      options: [
        "The recency of the transition (most recent first)",
        "The magnitude of the TD error |\\delta| associated with each transition",
        "The frequency with which each state has been visited",
        "A random priority assigned at insertion time",
      ],
      correctAnswer: 1,
      explanation:
        "PER assigns higher sampling priority to transitions with larger TD errors |\\delta|, focusing learning on experiences where the current Q-function is most inaccurate and thus providing the most informative gradient signal.",
      hints: [
        "A large TD error means the network\'s prediction was very wrong - is this valuable to train on?",
        'Which transitions provide the most "surprise" or learning signal?',
      ],
    },
    {
      id: "q-rla-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Prioritized experience replay requires importance sampling corrections to maintain unbiased gradient estimates.",
      correctAnswer: "true",
      explanation:
        "By oversampling high-priority transitions, PER introduces a bias in the training distribution. Importance sampling weights w_i \\propto (1/P(i))^\\beta correct for this non-uniform sampling to preserve unbiasedness.",
      hints: [
        "If you sample non-uniformly (preferring certain transitions), what happens to the expected gradient?",
        "The same fix used in off-policy RL - importance sampling - applies here too.",
      ],
    },
    {
      id: "q-rla-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In PER, the stochastic priority P(i) \\propto (|\\delta\_i| + \\epsilon)^\\alpha uses the exponent \\alpha to:",
      options: [
        "Normalize the priorities so they sum to 1",
        "Control the degree of prioritization: \\alpha=0 gives uniform sampling, \\alpha=1 gives fully proportional sampling",
        "Prevent the learning rate from changing during training",
        "Ensure all transitions are sampled at least once per epoch",
      ],
      correctAnswer: 1,
      explanation:
        "The exponent \\alpha interpolates between uniform sampling (\\alpha=0, no prioritization) and pure greedy prioritization (\\alpha=1). Intermediate values balance exploration of all experiences with focus on high-error transitions.",
      hints: [
        "What does \\alpha=0 do to (|\\delta|+\\epsilon)^\\alpha? What about \\alpha=1?",
        'Think of \\alpha as a temperature controlling how "peaky" the priority distribution is.',
      ],
    },
  ],

  "rainbow-dqn": [
    {
      id: "q-rla-kp7-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Rainbow DQN combines six DQN improvements. Which of the following is NOT one of them?",
      options: [
        "Double DQN (reducing maximization bias)",
        "Prioritized experience replay",
        "Trust region policy optimization",
        "Distributional RL (C51)",
      ],
      correctAnswer: 2,
      explanation:
        "Rainbow combines Double DQN, prioritized replay, dueling networks, multi-step returns, distributional RL (C51), and noisy networks. TRPO is a separate policy gradient algorithm, not part of Rainbow.",
      hints: [
        "TRPO is a policy gradient method - does it fit with the Q-learning family?",
        "Rainbow\'s six components all modify different aspects of DQN, not the optimization method.",
      ],
    },
    {
      id: "q-rla-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Rainbow DQN achieved superhuman performance on Atari games with far fewer environment interactions than standard DQN.",
      correctAnswer: "true",
      explanation:
        "Rainbow substantially improved sample efficiency over DQN. It achieved the same performance as DQN with roughly 7\\times fewer environment interactions and reached higher final performance, demonstrating the compounding benefits of combining multiple improvements.",
      hints: [
        "Each component of Rainbow improves either sample efficiency or asymptotic performance.",
        "Do improvements to sample efficiency compound when multiple improvements are combined?",
      ],
    },
    {
      id: "q-rla-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The distributional RL component (C51) in Rainbow differs from standard Q-learning by:",
      options: [
        "Learning the mean of the return distribution instead of the expected value",
        "Learning the full distribution of returns Z(s,a) rather than just the expectation Q(s,a)",
        "Using a categorical distribution over actions instead of Q-values",
        "Replacing the Bellman backup with a distributional TD error",
      ],
      correctAnswer: 1,
      explanation:
        "C51 models the return distribution Z(s,a) as a categorical distribution over 51 fixed atoms, learning to predict not just the expected return but the full probability distribution over possible returns - capturing uncertainty and multimodality.",
      hints: [
        "Standard Q-learning learns E[G|s,a]. What more information would a distribution give you?",
        'C51 stands for "Categorical 51" - the 51 refers to the number of distribution atoms.',
      ],
    },
  ],

  "policy-gradient": [
    {
      id: "q-rla-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The policy gradient theorem expresses \\nabla_\\theta J(\\theta) as:",
      options: [
        "The gradient of the reward function with respect to the environment dynamics",
        "E_{\\pi_\\theta}[\\nabla_\\theta log \\pi_\\theta(a|s) \\cdot Q^{\\pi_\\theta}(s,a)]",
        "The sum of TD errors over the entire episode",
        "\\nabla_\\theta V^{\\pi_\\theta}(s\_0) computed by backpropagation through time",
      ],
      correctAnswer: 1,
      explanation:
        "The objective in policy gradient is $J(\\theta) = V^{\\pi_\\theta}(s_0) = E_{\\pi_\\theta}[\\sum_{t=0}^T \\gamma^t r_t]$, the expected discounted return from the start state.\n\n**Step 1.** The policy gradient $\\nabla_\\theta J(\\theta)$ tells us how to update $\\theta$ to increase $J$. But directly differentiating $J$ requires knowing the environment dynamics $P(s'|s,a)$, which we do not have.\n\n**Step 2.** The policy gradient theorem resolves this by expressing $\\nabla_\\theta J(\\theta)$ in a form that depends only on the policy $\\pi_\\theta$:\n\\[\\nabla_\\theta J(\\theta) = E_{\\pi_\\theta}\\bigl[\\nabla_\\theta \\log \\pi_\\theta(a|s) \\cdot Q^{\\pi_\\theta}(s,a)\\bigr].\]\nThe key quantity $\\nabla_\\theta \\log \\pi_\\theta(a|s)$ is called the score function.\n\n**Step 3.** This formula enables gradient ascent on $J$ without differentiating through the environment: the environment dynamics are embedded in the Q-value $Q^{\\pi_\\theta}(s,a)$, which is estimated by sampling. This is why policy gradient methods are also called \"likelihood-ratio\" or \"score-function\" estimators.",
      hints: [
        'The gradient of J involves the "score function" \\nabla_\\theta log \\pi_\\theta(a|s).',
        "This formula is key because the environment\'s transition dynamics don\'t need to be differentiable.",
      ],
    },
    {
      id: "q-rla-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The policy gradient theorem applies only to parametric policies represented by neural networks.",
      correctAnswer: "false",
      explanation:
        "The policy gradient theorem holds for any differentiable parametric policy \\pi_\\theta(a|s), including tabular softmax policies, linear policies, and neural networks - as long as \\nabla_\\theta log \\pi_\\theta(a|s) exists.",
      hints: [
        "Does the theorem assume a specific form for \\pi_\\theta?",
        "Any policy where you can compute \\nabla_\\theta log \\pi_\\theta qualifies.",
      ],
    },
    {
      id: "q-rla-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key advantage of policy gradient methods over value-based methods is that:",
      options: [
        "They have lower variance gradient estimates",
        "They can naturally represent stochastic policies and handle continuous action spaces",
        "They always converge to the global optimum of J(\\theta)",
        "They do not require sampling from the environment",
      ],
      correctAnswer: 1,
      explanation:
        "Policy gradient methods directly optimize a parametric policy \\pi_\\theta(a|s), which can output continuous action distributions (e.g., Gaussian) - making them naturally suited for continuous action spaces where \argmax over Q-values is intractable.",
      hints: [
        "How does DQN handle continuous actions? What about a policy that outputs a Gaussian distribution?",
        "Stochastic policies are natural outputs of policy gradient methods.",
      ],
    },
  ],

  reinforce: [
    {
      id: "q-rla-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The REINFORCE algorithm updates the policy parameters using:",
      options: [
        "The TD error from a learned value function",
        "The complete Monte Carlo return G_t scaled by the log-probability gradient \\nabla_\\theta log \\pi_\\theta(a\_t|s\_t)",
        "The advantage function estimated by a separate neural network",
        "Importance sampling weights from a behavior policy",
      ],
      correctAnswer: 1,
      explanation:
        "REINFORCE is a Monte Carlo policy gradient algorithm that uses complete episode returns to estimate the gradient.\n\n**Step 1.** From the policy gradient theorem: $\\nabla_\\theta J(\\theta) = E[\\nabla_\\theta \\log \\pi_\\theta(a|s) \\cdot Q^{\\pi_\\theta}(s,a)]$.\n\n**Step 2.** REINFORCE replaces the true Q-value $Q^{\\pi_\\theta}(s,a)$ with the Monte Carlo return $G_t = \\sum_{t'=t}^T \\gamma^{t'-t} r_{t'}$, which is an unbiased sample of $Q^{\\pi_\\theta}$. This gives the stochastic gradient estimator:\n\\[\\nabla_\\theta J(\\theta) \\approx \\frac{1}{T} \\sum_{t=0}^{T-1} \\nabla_\\theta \\log \\pi_\\theta(a_t|s_t) \\cdot G_t.\]\n\n**Step 3.** The parameter update is $\\theta \\leftarrow \\theta + \\alpha \\cdot \\nabla_\\theta \\log \\pi_\\theta(a_t|s_t) \\cdot G_t$. Actions that led to high returns ($G_t > 0$) have their probability increased; actions that led to low/negative returns have their probability decreased.\n\nThis is why REINFORCE is a Monte Carlo policy gradient method.",
      hints: [
        "REINFORCE is a Monte Carlo policy gradient method - it uses complete episode returns.",
        "The update increases the probability of actions that led to high returns.",
      ],
    },
    {
      id: "q-rla-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "REINFORCE is an unbiased gradient estimator of \\nabla_\\theta J(\\theta), but it typically has high variance.",
      correctAnswer: "true",
      explanation:
        "REINFORCE uses the full Monte Carlo return, which is an unbiased sample of Q^\\pi(s,a), giving an unbiased gradient. However, the variance is high because the return depends on all future random actions and transitions.",
      hints: [
        "Is the Monte Carlo return an unbiased estimate of Q^\\pi(s,a)?",
        "What contributes to the high variance of the Monte Carlo return?",
      ],
    },
    {
      id: "q-rla-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In REINFORCE, actions that led to positive returns are made more probable. This creates a credit assignment problem because:",
      options: [
        "The algorithm cannot distinguish which specific actions in a trajectory actually caused the high return",
        "Positive returns always indicate optimal actions",
        "The policy gradient is zero for deterministic policies",
        "Monte Carlo returns cannot be used with neural network policies",
      ],
      correctAnswer: 0,
      explanation:
        "REINFORCE assigns the full episode return G\_t to every action in the trajectory, but individual actions may have contributed very differently to the outcome - making it hard to identify which actions were truly responsible for the reward.",
      hints: [
        "If an episode has 100 steps and ends with a reward, which of the 100 actions deserves credit?",
        "This is the temporal credit assignment problem - a fundamental challenge in RL.",
      ],
    },
  ],

  "baseline-variance": [
    {
      id: "q-rla-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In policy gradient methods, a baseline b(s) is subtracted from the return to:",
      options: [
        "Introduce bias that speeds convergence",
        "Reduce variance of the gradient estimate without changing its expected value",
        "Ensure the policy stays close to the behavior policy",
        "Normalize rewards to the range [−1, 1]",
      ],
      correctAnswer: 1,
      explanation:
        "Subtracting a state-dependent baseline b(s) from the return gives \\nabla_\\theta log \\pi_\\theta(a|s) \\cdot (G_t − b(s)). Since E[\\nabla_\\theta log \\pi_\\theta \\cdot b(s)] = 0, the gradient remains unbiased while the variance is reduced.",
      hints: [
        "If E[b(s)] doesn\'t affect the gradient expectation, adding/subtracting it doesn\'t introduce bias.",
        "A good baseline b(s) \\approx V^\\pi(s) centers the return around zero, reducing large positive/negative fluctuations.",
      ],
    },
    {
      id: "q-rla-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The optimal baseline that minimizes gradient variance is exactly V^\\pi(s), the state value function.",
      correctAnswer: "false",
      explanation:
        "The variance-minimizing baseline is not exactly V^\\pi(s) in general - the optimal baseline is a weighted function involving the squared gradient norms. However, V^\\pi(s) is an excellent and commonly used approximation.",
      hints: [
        "What is the formula for variance-minimizing b(s)? Does it simplify to V^\\pi(s)?",
        "In practice V^\\pi(s) works very well as a baseline - but is it provably optimal?",
      ],
    },
    {
      id: "q-rla-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When using V^\\pi(s) as the baseline, the policy gradient update becomes proportional to the advantage function A^\\pi(s,a) = Q^\\pi(s,a) − V^\\pi(s). Actions with positive advantage are:",
      options: [
        "Made less probable to increase entropy",
        "Made more probable because they performed better than average for that state",
        "Made equally probable regardless of their advantage",
        "Removed from the action space after each update",
      ],
      correctAnswer: 1,
      explanation:
        "The advantage function $A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)$ measures how much better action $a$ is compared to the average action in state $s$.\n\n**Step 1.** $V^\\pi(s) = E_{a \\sim \\pi}[Q^\\pi(s,a)]$ is the average Q-value under the current policy. If $V^\\pi(s) = 10$ and $Q^\\pi(s,a) = 15$, then $A^\\pi(s,a) = 5 > 0$: action $a$ is 5 units better than average.\n\n**Step 2.** The policy gradient with advantage becomes:\n\\[\\nabla_\\theta J(\\theta) \\approx E[\\nabla_\\theta \\log \\pi_\\theta(a|s) \\cdot A^\\pi(s,a)].\\]\n\n**Step 3.** When $A^\\pi(s,a) > 0$: the gradient points in the direction that increases $\\pi_\\theta(a|s)$, making action $a$ more likely. When $A^\\pi(s,a) < 0$: the gradient points away from action $a$, making it less likely. The advantage provides a baseline, so actions better than average are reinforced and actions worse than average are suppressed.",
      hints: [
        "The gradient \\nabla_\\theta log \\pi_\\theta(a|s) points in the direction that increases the probability of a.",
        "When is this gradient multiplied by a positive vs. negative scalar?",
      ],
    },
  ],

  "actor-critic": [
    {
      id: "q-rla-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In actor-critic methods, the "actor" and "critic" refer to:',
      options: [
        "Two agents competing against each other in a game",
        "The policy (actor) and the value function (critic) that evaluates the policy",
        "The environment model (actor) and the policy optimizer (critic)",
        "The exploration policy (actor) and the exploitation policy (critic)",
      ],
      correctAnswer: 1,
      explanation:
        "The actor is the policy \\pi_\\theta(a|s) that selects actions, and the critic is the value function V_\\phi(s) (or Q_\\phi(s,a)) that evaluates how good the actor\'s choices are by providing advantage estimates.",
      hints: [
        "In a theater, an actor performs and a critic evaluates - how does this analogy apply to RL?",
        "Which component is being optimized, and which provides the feedback signal?",
      ],
    },
    {
      id: "q-rla-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Actor-critic methods combine the advantages of both policy gradient methods (no value function needed) and value-based methods (no policy gradient needed).",
      correctAnswer: "false",
      explanation:
        "Actor-critic methods use both a policy (actor) and a value function (critic) - they do not eliminate either component. Their advantage is lower variance than pure REINFORCE (thanks to the critic\'s bootstrapping) while handling continuous actions (unlike pure value-based methods).",
      hints: [
        'Actor-critic methods use both a policy AND a value function - does this match "no value function needed"?',
        "Think about what actor-critic adds vs. removes compared to REINFORCE and Q-learning.",
      ],
    },
    {
      id: "q-rla-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The one-step actor-critic update uses the TD error \\delta = r + \\gammaV(s') − V(s) as the advantage estimate. This introduces bias compared to using the true advantage because:",
      options: [
        "The TD error is always positive, biasing the policy toward recent actions",
        "V(s') is an approximation, so \\delta = r + \\gammaV(s') − V(s) is a biased estimate of A^\\pi(s,a)",
        "The discount factor \\gamma is applied to the wrong term",
        "One-step returns have too low variance to be useful",
      ],
      correctAnswer: 1,
      explanation:
        "The advantage function is $A^\\pi(s,a) = Q^\\pi(s,a) - V^\\pi(s)$. We would ideally compute this using Monte Carlo returns, but that has high variance. The one-step TD error provides an alternative.\n\n**Step 1.** The one-step TD error is:\n\\[\\delta = r + \\gamma V(s') - V(s).\\]\nThis uses bootstrapping: instead of the full return $G_t$, it uses $r + \\gamma V(s')$ as a one-step estimate.\n\n**Step 2.** Relating $\\delta$ to the advantage: if $V(s')$ were exact, then $r + \\gamma V(s') \\approx Q^\\pi(s,a)$, so $\\delta \\approx Q^\\pi(s,a) - V(s) = A^\\pi(s,a)$. In that case, $\\delta$ would be an unbiased estimate of the advantage.\n\n**Step 3.** In practice, $V(s')$ is an approximation (learned by function approximation), so $\\delta$ is biased: the bias comes from the error in $V(s')$. However, bootstrapping dramatically reduces variance compared to Monte Carlo, at the cost of some bias. This bias-variance tradeoff is fundamental to TD methods.",
      hints: [
        "If V(s') were exact, would \\delta be an unbiased estimate of Q(s,a) − V(s)?",
        "Bootstrapping trades bias for variance reduction - what is the source of the bias?",
      ],
    },
  ],

  "a2c-a3c": [
    {
      id: "q-rla-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A3C (Asynchronous Advantage Actor-Critic) trains multiple workers in parallel by:",
      options: [
        "Sharing a single replay buffer that all workers write to and sample from",
        "Running independent environment copies and asynchronously updating a global shared network",
        "Training separate policies for each worker and averaging them at the end",
        "Using different discount factors \\gamma in each worker for diverse exploration",
      ],
      correctAnswer: 1,
      explanation:
        "In A3C, multiple workers each run their own environment instance and compute gradients locally. They asynchronously push gradient updates to a global network and pull updated parameters, achieving parallelism without a replay buffer.",
      hints: [
        '"Asynchronous" means workers update the global network without waiting for each other.',
        "Each worker explores the environment independently - why does this help with data diversity?",
      ],
    },
    {
      id: "q-rla-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A2C (Advantage Actor-Critic) is the synchronous version of A3C, where all workers are synchronized before updating the global network.",
      correctAnswer: "true",
      explanation:
        "A2C runs workers synchronously: all workers collect experience in parallel, the coordinator waits for all workers to finish, computes the average gradient, and updates the global network. This deterministic update is often more stable than A3C\'s asynchronous updates.",
      hints: [
        'Compare "asynchronous" (A3C) with "synchronous" - what does synchronization require?',
        "In A2C, no worker updates the network until all workers have finished their rollout.",
      ],
    },
    {
      id: "q-rla-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A3C\'s parallel workers help reduce gradient variance compared to a single-worker actor-critic because:",
      options: [
        "Each worker uses a different learning rate, averaging out step size errors",
        "Workers explore different parts of the state space, providing more diverse and decorrelated gradient estimates",
        "Asynchronous updates automatically correct for gradient staleness",
        "Workers share a critic, reducing the number of value function approximations needed",
      ],
      correctAnswer: 1,
      explanation:
        "Multiple workers exploring different trajectories simultaneously collect diverse, less correlated experience. Averaging their gradients reduces variance in the parameter updates - similar to the role of mini-batches in supervised learning.",
      hints: [
        "In supervised learning, why does larger batch size reduce gradient variance?",
        "If all workers saw identical states, would their gradients be diverse?",
      ],
    },
  ],

  ppo: [
    {
      id: "q-rla-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Proximal Policy Optimization (PPO) constrains policy updates by:",
      options: [
        "Solving a constrained optimization problem with a KL divergence constraint each step",
        "Clipping the probability ratio r_t(\\theta) = \\pi_\\theta(a|s)/\\pi_{\\theta_old}(a|s) to stay within [1−\\epsilon, 1+\\epsilon]",
        "Projecting the new policy back onto the trust region after each gradient step",
        "Limiting the gradient norm to a fixed maximum value",
      ],
      correctAnswer: 1,
      explanation:
        "PPO-Clip replaces TRPO\'s complex constrained optimization with a simple clipped surrogate objective that penalizes policy updates where the probability ratio deviates too far from 1, preventing destructively large policy updates.",
      hints: [
        "PPO is known for being simpler than TRPO - it doesn\'t solve a constrained optimization problem.",
        "The clip operation is applied to the ratio \\pi_\\theta/\\pi_{\\theta_old} - what range does the clip enforce?",
      ],
    },
    {
      id: "q-rla-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PPO requires computing second-order derivatives (the Hessian of the KL divergence) to update the policy.",
      correctAnswer: "false",
      explanation:
        "A key advantage of PPO over TRPO is that it uses only first-order gradient optimization (e.g., Adam). The clipping mechanism approximates the trust region constraint without any second-order computations.",
      hints: [
        "TRPO requires computing a natural gradient involving the Fisher information matrix. Does PPO?",
        "PPO was designed to be simple and scalable - does Hessian computation fit this goal?",
      ],
    },
    {
      id: "q-rla-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The PPO objective L^{CLIP}(\\theta) = E[\min(r\_t(\\theta)A\_t, clip(r\_t(\\theta), 1-\\epsilon, 1+\\epsilon)A\_t)] uses the \min operation to:",
      options: [
        "Average the clipped and unclipped objectives for a smoother gradient",
        "Pessimistically bound the objective, preventing the policy from benefiting from going outside the trust region",
        "Ensure the gradient is always positive for stable training",
        "Select between two different advantage estimators for robustness",
      ],
      correctAnswer: 1,
      explanation:
        "PPO-Clip uses the clipped surrogate objective to prevent destructively large policy updates. The probability ratio is $r_t(\\theta) = \\pi_\\theta(a_t|s_t) / \\pi_{\\theta_{old}}(a_t|s_t)$, measuring how much more likely the new policy is to select action $a_t$ compared to the old policy.\n\n**Step 1.** The unclipped objective is $r_t(\\theta) \\cdot A_t$. When the advantage $A_t > 0$ (action $a_t$ is better than average), increasing $r_t(\\theta)$ increases the objective. But $r_t(\\theta)$ can grow unbounded, causing destructive large updates.\n\n**Step 2.** PPO clips $r_t(\\theta)$ to stay in $[1-\\epsilon, 1+\\epsilon]$. The clipped objective is $\\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon) \\cdot A_t$.\n\n**Step 3.** The $\\min(\\cdot, \\cdot)$ takes the worse of the clipped and unclipped objectives:\n\\begin{align}\nL^{CLIP}(\\theta) &= E\\bigl[\\min(r_t(\\theta) A_t, \\; \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon) \\cdot A_t)\\bigr].\n\\end{align}\n\nWhen $A_t > 0$ and $r_t(\\theta) > 1+\\epsilon$, the unclipped objective gives a higher (better) value, but the clipped term is smaller and wins. This prevents the policy from gaining reward for going outside the trust region, effectively bounding the update size.",
      hints: [
        "When A > 0 and r > 1+\\epsilon, which term (clipped or unclipped) gives a smaller value under \min?",
        "The \min ensures no benefit from making the policy update too large.",
      ],
    },
  ],

  trpo: [
    {
      id: "q-rla-kp14-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Trust Region Policy Optimization (TRPO) constrains updates by solving:",
      options: [
        "Minimize the expected KL divergence subject to a lower bound on improvement",
        "Maximize the surrogate objective subject to KL(\\pi_{\\theta_old} ‖ \\pi_\\theta) \\leq \\delta",
        "Minimize the TD error subject to the policy staying within the replay buffer distribution",
        "Maximize returns subject to the policy entropy staying above a threshold",
      ],
      correctAnswer: 1,
      explanation:
        "TRPO maximizes a surrogate objective (the importance-sampled policy improvement) subject to a hard constraint on the KL divergence between old and new policies, ensuring monotonic improvement with high probability.",
      hints: [
        'TRPO defines a "trust region" - a neighborhood of the current policy where the surrogate objective is reliable.',
        "The KL constraint limits how far the new policy can deviate from the old one.",
      ],
    },
    {
      id: "q-rla-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "TRPO guarantees monotonic improvement in policy performance at every update step.",
      correctAnswer: "false",
      explanation:
        "TRPO provides a theoretical lower bound on improvement and guarantees monotonic improvement in the surrogate objective, but due to approximations in the constraint (conjugate gradient, line search), the actual policy performance can occasionally decrease slightly in practice.",
      hints: [
        "The theoretical guarantee holds for the exact trust region update. Does the practical implementation solve the constrained problem exactly?",
        "Approximations like conjugate gradient introduce errors - do these preserve the guarantee exactly?",
      ],
    },
    {
      id: "q-rla-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TRPO uses the conjugate gradient method rather than direct matrix inversion to compute the natural gradient because:",
      options: [
        "The Fisher information matrix F is often not positive definite",
        "Directly inverting F (which is |\\theta|\\times|\\theta|) is computationally prohibitive for large networks",
        "Conjugate gradient provides an exact solution where matrix inversion gives an approximation",
        "The Fisher information matrix cannot be computed analytically for neural networks",
      ],
      correctAnswer: 1,
      explanation:
        "Computing the natural gradient requires solving the linear system $F(\\theta) \\mathbf{v} = \\nabla_\\theta J(\\theta)$ for $\\mathbf{v} = F(\\theta)^{-1} \\nabla_\\theta J(\\theta)$.\n\n**Step 1.** The Fisher information matrix $F(\\theta)$ has size $|\\theta| \\times |\\theta|$ where $|\\theta|$ is the number of parameters. For a policy with 1 million parameters, this matrix has $10^{12}$ entries - requiring terabytes of storage just to hold it, let alone invert.\n\n**Step 2.** Direct inversion of $F(\\theta)$ costs $O(|\\theta|^3)$ in time. With 1M parameters, this is $10^{18}$ operations - completely infeasible.\n\n**Step 3.** Conjugate gradient sidesteps these problems by solving $F\\mathbf{v} = \\nabla J$ without ever forming $F$ explicitly. It only needs to compute matrix-vector products $F \\cdot \\mathbf{v}$, which are $O(|\\theta|^2)$ each, and converges in $O(|\\theta|)$ iterations. For a 1M-parameter network, this means ~1M operations per iteration instead of $10^{18}$ for direct inversion.",
      hints: [
        "How large is the Fisher information matrix for a network with 1M parameters?",
        "Conjugate gradient finds F\\^{-1}g without ever explicitly forming F.",
      ],
    },
  ],

  "natural-policy-gradient": [
    {
      id: "q-rla-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The natural policy gradient differs from the ordinary policy gradient by:",
      options: [
        "Using returns from multiple episodes rather than single transitions",
        "Preconditions the gradient with the inverse Fisher information matrix F(\\theta)\\^{-1}",
        "Projecting the gradient onto the constraint manifold defined by the action space",
        "Normalizing the gradient by the episode length",
      ],
      correctAnswer: 1,
      explanation:
        "The natural gradient \\nablãJ = F(\\theta)\\^{-1}\\nablaJ steepest ascends in the space of policy distributions (under KL divergence) rather than parameter space, making it invariant to policy parameterization.",
      hints: [
        "The Fisher information matrix defines the curvature of the KL divergence between policies.",
        "Preconditioned gradient descent is faster when the loss surface is poorly scaled.",
      ],
    },
    {
      id: "q-rla-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The natural policy gradient is invariant to reparameterization of the policy, meaning it finds the same update direction regardless of how the policy is parameterized.",
      correctAnswer: "true",
      explanation:
        "By using the Fisher information metric (the natural geometry of the space of probability distributions), the natural gradient update is covariant - two equivalent parameterizations of the same policy family yield equivalent updates in policy space.",
      hints: [
        "The ordinary gradient depends on the coordinate system (parameterization). Does the natural gradient?",
        "This is a desirable property - the update should describe a change in policy behavior, not parameter space.",
      ],
    },
    {
      id: "q-rla-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Fisher information matrix F(\\theta) in the natural policy gradient is defined as:",
      options: [
        "F(\\theta) = E[\\nabla_\\theta log \\pi_\\theta(a|s) \\cdot (\\nabla_\\theta log \\pi_\\theta(a|s))\\^T]",
        "F(\\theta) = \\nabla\\^2_\\theta J(\\theta) (the Hessian of expected return)",
        "F(\\theta) = E[(Q^\\pi(s,a))\\^2 \\nabla_\\theta log \\pi_\\theta(a|s)]",
        "F(\\theta) = \\nabla_\\theta KL(\\pi_{\\theta+\\epsilon} ‖ \\pi_\\theta) / \\epsilon",
      ],
      correctAnswer: 0,
      explanation:
        "The Fisher information matrix $F(\\theta)$ defines the natural gradient's metric. It is derived from the KL divergence geometry of probability distributions.\n\n**Step 1.** Consider two infinitesimally close policies $\\pi_\\theta$ and $\\pi_{\\theta + \\delta\\theta}$. Their KL divergence to second order is:\n\\[\\text{KL}(\\pi_{\\theta+\\delta\\theta} \\| \\pi_\\theta) \\approx \\frac{1}{2} (\\delta\\theta)^T F(\\theta) (\\delta\\theta),\\]\nwhere $F(\\theta)$ is the Fisher information matrix.\n\n**Step 2.** $F(\\theta)$ is defined as the expected outer product of the score function (gradient of log-likelihood):\n\\[F(\\theta) = E_{a \\sim \\pi_\\theta}\\bigl[\\nabla_\\theta \\log \\pi_\\theta(a|s) \\cdot (\\nabla_\\theta \\log \\pi_\\theta(a|s))^T\\bigr].\]\nThis captures how sensitive the log-likelihood is to parameter changes.\n\n**Step 3.** The natural gradient is $F(\\theta)^{-1} \\nabla_\\theta J(\\theta)$. Unlike the ordinary gradient, it is invariant to reparameterization: equivalent policy parameterizations yield equivalent updates in policy space.",
      hints: [
        "The Fisher information matrix is related to the curvature of the log-likelihood.",
        "It equals the expected outer product of the score (gradient of log-likelihood).",
      ],
    },
  ],

  sac: [
    {
      id: "q-rla-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Soft Actor-Critic (SAC) augments the standard RL objective by adding:",
      options: [
        "A penalty for large policy updates (KL regularization)",
        "An entropy bonus \\alpha \\cdot H(\\pi(\\cdot|s)) to encourage the policy to be as random as possible while maximizing reward",
        "A constraint on the value function to stay within a safe range",
        "A separate curiosity reward for visiting novel states",
      ],
      correctAnswer: 1,
      explanation:
        "SAC uses the maximum entropy RL objective: maximize E[\\Sigma_t (r_t + \\alpha H(\\pi(\\cdot|s_t)))], balancing reward maximization with policy entropy - the temperature \\alpha controls this tradeoff.",
      hints: [
        'SAC has "soft" in its name - what does entropy add to the policy?',
        "Higher entropy means more exploration. How does SAC incorporate this into the objective?",
      ],
    },
    {
      id: "q-rla-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SAC is an off-policy algorithm, meaning it can learn from data collected by any policy stored in a replay buffer.",
      correctAnswer: "true",
      explanation:
        "SAC is off-policy and uses a replay buffer, like DQN. This makes it highly sample efficient because old transitions can be reused. The reparameterization trick allows efficient policy gradient computation from replayed data.",
      hints: [
        "Does SAC use a replay buffer? If so, what does that imply about on-policy vs. off-policy?",
        "Off-policy methods can reuse old data - how does this benefit sample efficiency?",
      ],
    },
    {
      id: "q-rla-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SAC uses the reparameterization trick for the policy gradient. This means the policy is expressed as:",
      options: [
        "\\pi_\\theta(a|s) = softmax(Q_\\theta(s,a)/\\alpha) - a direct Boltzmann distribution",
        "a = f_\\theta(\\epsilon; s) where \\epsilon ~ N(0,I) - a deterministic function of noise, enabling low-variance gradients",
        "\\pi_\\theta(a|s) = \argmax_a Q_\\theta(s,a) with added Gaussian noise",
        "A tabular distribution learned by gradient descent on the entropy objective",
      ],
      correctAnswer: 1,
      explanation:
        "The reparameterization trick expresses sampled actions as a = tanh(\\mu_\\theta(s) + \\sigma_\\theta(s) ⊙ \\epsilon) where \\epsilon ~ N(0,I). This makes the gradient of the expected return flow through the deterministic function f_\\theta, giving lower variance than REINFORCE-style log-derivative estimators.",
      hints: [
        "The reparameterization trick moves stochasticity outside the function being differentiated.",
        "This is the same trick used in VAEs for the latent variable.",
      ],
    },
  ],

  td3: [
    {
      id: "q-rla-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "TD3 (Twin Delayed DDPG) addresses overestimation bias in DDPG by:",
      options: [
        "Using a stochastic policy instead of a deterministic one",
        "Maintaining two critic networks and using the minimum Q-value as the target",
        "Clipping the actor gradient to prevent large policy updates",
        "Using distributional critics instead of point estimates",
      ],
      correctAnswer: 1,
      explanation:
        "TD3 trains two independent critic networks Q\_1 and Q\_2 and uses \min(Q\_1, Q\_2) for the target, penalizing overestimated Q-values - analogous to Double DQN\'s decoupling of selection and evaluation.",
      hints: [
        "Two critics both estimate the same Q - which estimate is safer to use as a target?",
        "Taking the minimum is a conservative approach - why does this help with overestimation?",
      ],
    },
    {
      id: "q-rla-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'TD3\'s "delayed" policy updates mean the actor is updated less frequently than the critics to allow Q-value estimates to stabilize first.',
      correctAnswer: "true",
      explanation:
        "TD3 updates the actor (and target networks) every d critic steps (typically d=2). Updating the actor on unstable Q-values would propagate errors - letting the critics train first leads to more reliable policy gradient signals.",
      hints: [
        "If Q-values are inaccurate, the policy gradient \\nabla_a Q(s,a) is also inaccurate. What helps?",
        '"Delayed" refers to the actor update frequency relative to the critic.',
      ],
    },
    {
      id: "q-rla-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TD3 adds target policy smoothing noise \\epsilon ~ clip(N(0,\\sigma), -c, c) to target actions. The purpose of this is to:",
      options: [
        "Encourage exploration during environment interaction",
        "Regularize the Q-function by making it smooth in the action dimension around the target action",
        "Prevent the actor from collapsing to a degenerate deterministic policy",
        "Match the stochastic policy of SAC for fair comparison",
      ],
      correctAnswer: 1,
      explanation:
        "Adding clipped noise to target actions forces the target Q-values to be similar for nearby actions, preventing the critic from creating sharp, exploitable peaks in Q(s,\\cdot) that the actor would over-optimize for.",
      hints: [
        "If Q(s,a) is very peaky around the target action, small errors in the actor get amplified.",
        "Smoothing the target makes the Q-function landscape more regular and easier to optimize.",
      ],
    },
  ],

  ddpg: [
    {
      id: "q-rla-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "DDPG (Deep Deterministic Policy Gradient) extends DQN to continuous action spaces by:",
      options: [
        "Discretizing the continuous action space into many bins",
        "Using a deterministic actor network \\mu_\\theta(s) and a critic network Q_\\phi(s,a) trained simultaneously",
        "Applying policy gradients directly to the Q-network",
        "Using a model of the environment to plan ahead in continuous action space",
      ],
      correctAnswer: 1,
      explanation:
        "DDPG uses a deterministic actor \\mu_\\theta(s) \\to a (no discrete maximization needed) and trains it by gradient ascent on Q_\\phi(s, \\mu_\\theta(s)) w.r.t. \\theta, enabling DQN-like off-policy learning in continuous action spaces.",
      hints: [
        "DQN\'s \argmax over Q-values is intractable in continuous spaces - what replaces it in DDPG?",
        "The actor network outputs a specific action, not a distribution.",
      ],
    },
    {
      id: "q-rla-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DDPG uses Ornstein-Uhlenbeck noise for exploration, which is correlated across time steps, making it suitable for physical control tasks with momentum.",
      correctAnswer: "true",
      explanation:
        "Ornstein-Uhlenbeck (OU) noise is temporally correlated (mean-reverting), producing smoother exploration trajectories than i.i.d. Gaussian noise - beneficial for physical systems where jerky random actions are unhelpful.",
      hints: [
        "In a physical system like a robot arm, does completely random action noise at each step make sense?",
        "OU noise maintains some persistence in the noise direction, mimicking physically smooth exploration.",
      ],
    },
    {
      id: "q-rla-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The actor in DDPG is updated by gradient ascent on J(\\theta) \\approx E[Q_\\phi(s, \\mu_\\theta(s))]. This requires:",
      options: [
        "Computing importance sampling weights to correct for the replay buffer distribution",
        "Differentiating through the critic Q_\\phi with respect to the actor parameters \\theta via the chain rule",
        "Sampling many action perturbations to estimate the gradient numerically",
        "Inverting the Fisher information matrix to compute the natural gradient",
      ],
      correctAnswer: 1,
      explanation:
        "The DDPG actor gradient is \\nabla_\\theta Q_\\phi(s, \\mu_\\theta(s)) = \\nabla_a Q_\\phi(s,a)|_{a=\\mu_\\theta(s)} \\cdot \\nabla_\\theta \\mu_\\theta(s), computed by backpropagating through the critic into the actor via the chain rule - a form of deterministic policy gradient.",
      hints: [
        "The action a = \\mu_\\theta(s) is a differentiable function of \\theta, and Q_\\phi(s,a) is differentiable in a.",
        "Chain rule: d/d\\theta Q(s, \\mu_\\theta(s)) = \\partialQ/\\partiala \\cdot \\partial\\mu_\\theta/\\partial\\theta.",
      ],
    },
  ],

  "model-based-rl": [
    {
      id: "q-rla-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Model-based RL differs from model-free RL in that it:",
      options: [
        "Requires a neural network for both the policy and value function",
        "Learns or uses a model of the environment\'s dynamics P(s'|s,a) and/or reward R(s,a)",
        "Does not interact with the real environment during training",
        "Only works with discrete action spaces",
      ],
      correctAnswer: 1,
      explanation:
        'Model-based RL uses a learned or given dynamics model P(s\'|s,a) to simulate experience, plan ahead, or improve sample efficiency - allowing the agent to "think" about consequences before acting.',
      hints: [
        'A "model" here refers to a model of the environment, not a neural network model.',
        "With a model, you can generate simulated transitions without interacting with the real environment.",
      ],
    },
    {
      id: "q-rla-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Model-based RL is always more sample efficient than model-free RL because simulated data is free to generate.",
      correctAnswer: "false",
      explanation:
        "First, let's recall what 'sample efficient' means: the number of real environment interactions needed to reach a target performance level.\n\n**Step 1.** Model-based RL uses a learned model to simulate transitions. If the model is accurate, simulated data is indeed cheap to generate, and the agent can learn faster from simulated rollouts than from slow real-world interactions.\n\n**Step 2.** However, if the learned dynamics model P̂(s'|s,a) contains systematic errors — which is common, especially early in training — then planning with this flawed model amplifies those errors. Each simulated step compounds the error: an error in step 1 leads to a wrong state s₁, which then leads to an even more wrong state s₂, and so on.\n\n**Step 3.** This is called model bias: the agent optimizes against its model of reality, not against reality itself. A policy that exploits model errors may appear optimal during planning but fail catastrophically in the real environment.\n\nTherefore, model-based RL is not always more sample efficient — a poor model can make it worse than model-free RL, where learning relies directly on real experience without model-based distortions.",
      hints: [
        "What happens if the learned dynamics model makes systematic errors?",
        "Planning with an inaccurate model could lead the agent to exploit model errors rather than truly good behaviors.",
      ],
    },
    {
      id: "q-rla-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The key tradeoff in model-based RL is between:",
      options: [
        "Learning speed and computational cost of planning",
        "Model bias (inaccurate dynamics) and sample efficiency (generating cheap simulated experience)",
        "Exploration in the model and exploitation in the real environment",
        "Value function accuracy and policy gradient variance",
      ],
      correctAnswer: 1,
      explanation:
        "A learned model enables cheap simulated rollouts (improving sample efficiency) but introduces model bias - errors in P̂(s'|s,a) compound over long horizons, potentially leading to poor policies. This bias-efficiency tradeoff governs model-based RL algorithm design.",
      hints: [
        "More simulated experience helps, but only if the model is accurate.",
        "How do model errors accumulate over a multi-step rollout?",
      ],
    },
  ],

  dyna: [
    {
      id: "q-rla-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Dyna architecture integrates model-based and model-free learning by:",
      options: [
        "Running model-free and model-based agents and selecting the better one",
        "Using real experience to both update the Q-function directly and to train a world model, then using the model for additional simulated Q-updates",
        "Planning forward from every state using the model before each real action",
        "Learning a separate value function from simulated data and a policy from real data",
      ],
      correctAnswer: 1,
      explanation:
        "Dyna interleaves (1) direct RL updates from real experience, (2) model learning from real experience, and (3) simulated experience generation for additional Q-learning updates - gaining the efficiency benefits of both approaches.",
      hints: [
        'Dyna combines "direct RL" with "model-based RL" - how can both be used simultaneously?',
        "Each real step generates one real update plus n simulated updates.",
      ],
    },
    {
      id: "q-rla-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In Dyna-Q, simulated experience is generated by sampling states and actions from the model of the entire state-action space, not just from recently visited states.",
      correctAnswer: "false",
      explanation:
        "Dyna-Q\'s planning step samples previously visited (s,a) pairs from a tabular model and queries the model for the resulting (r, s'). It does not generate experience from states that have never been visited.",
      hints: [
        "The Dyna model only contains entries for state-action pairs that have been observed.",
        "Can you query a learned model for states you\'ve never visited? What would it return?",
      ],
    },
    {
      id: "q-rla-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Dyna+ extends Dyna-Q to handle non-stationary environments by:",
      options: [
        "Using importance sampling to correct for distribution shift",
        "Adding a bonus reward \\tau\\cdot√(time since last visited) to encourage revisiting states and detecting changes",
        "Periodically resetting the world model to forget outdated transitions",
        "Running a separate change detection algorithm on the reward signal",
      ],
      correctAnswer: 1,
      explanation:
        "Dyna+ adds an exploration bonus proportional to the square root of the time since a (s,a) pair was last tried. This incentivizes the agent to revisit areas where the model may be outdated, detecting environmental changes.",
      hints: [
        "If the environment changes, transitions not visited recently may no longer be accurate.",
        "What kind of bonus would encourage revisiting stale parts of the model?",
      ],
    },
  ],

  "world-models": [
    {
      id: "q-rla-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Ha and Schmidhuber\'s World Models (2018), the three main components are:",
      options: [
        "Actor, critic, and environment model",
        "Vision model (V), memory model (M), and controller (C)",
        "State encoder, transition model, and reward predictor",
        "Policy network, value network, and dynamics network",
      ],
      correctAnswer: 1,
      explanation:
        "World Models consists of: V (a VAE that compresses observations to latent z), M (an RNN/MDN that predicts the next latent state), and C (a small linear controller trained in the latent dream world).",
      hints: [
        "Think about how humans perceive (V), remember (M), and decide (C).",
        'The controller is trained entirely in the model\'s "dream" - what does that require?',
      ],
    },
    {
      id: "q-rla-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In the World Models framework, the controller C is trained entirely inside the world model without any interaction with the real environment.",
      correctAnswer: "true",
      explanation:
        'The controller is trained via CMA-ES (evolution strategy) purely within the learned dream world generated by V and M. The resulting controller is then transferred to the real environment - demonstrating "learning inside a dream."',
      hints: [
        "The paper\'s key claim is that a controller can be trained in the dream and transferred to reality.",
        "CMA-ES evolves the controller parameters using fitness scores from dream episodes.",
      ],
    },
    {
      id: "q-rla-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "World models with stochastic latent variables (as in DreamerV2) use a KL divergence loss between the prior and posterior. This loss term:",
      options: [
        "Maximizes entropy of the latent representation to encourage diversity",
        "Trains the posterior (with observations) to stay close to the prior (without), regularizing the latent space and enabling coherent imagination",
        "Penalizes the world model for making deterministic predictions",
        "Ensures the latent state z follows a uniform distribution",
      ],
      correctAnswer: 1,
      explanation:
        "The KL loss KL[posterior ‖ prior] ensures that the learned prior p(z'|z,a) (used during imagination without observations) matches the posterior q(z'|z,a,o') (trained with observations), making dream rollouts from the prior realistic.",
      hints: [
        "During imagination, you use the prior (no observations). During training, you use the posterior.",
        "If prior and posterior diverge, imagined rollouts won\'t match reality.",
      ],
    },
  ],

  muzero: [
    {
      id: "q-rla-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "MuZero differs from AlphaZero in that:",
      options: [
        "MuZero uses Monte Carlo Tree Search while AlphaZero uses value iteration",
        "MuZero learns its own abstract dynamics model rather than requiring knowledge of environment rules",
        "MuZero uses a policy gradient instead of MCTS for action selection",
        "MuZero trains on human demonstrations while AlphaZero uses self-play only",
      ],
      correctAnswer: 1,
      explanation:
        "AlphaZero knows the game rules (a perfect model). MuZero learns an abstract representation and dynamics model purely from experience - enabling it to achieve superhuman performance in Atari, Go, chess, and shogi without being given any rules.",
      hints: [
        "AlphaZero needs to know how pieces move and game rules. What if you didn\'t provide that?",
        'MuZero learns "what happens when I take action a in state s" from scratch.',
      ],
    },
    {
      id: "q-rla-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "MuZero\'s learned model predicts transitions in the original observation space (e.g., raw pixels).",
      correctAnswer: "false",
      explanation:
        "MuZero learns transitions in an abstract latent space h (not in observation space). The representation, dynamics, and prediction networks all operate in this compressed latent space, which is optimized for planning rather than reconstructing observations.",
      hints: [
        "Predicting future pixel frames is expensive and noisy - does MuZero try to do this?",
        "The latent state h is task-relevant but not necessarily interpretable as an image.",
      ],
    },
    {
      id: "q-rla-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MuZero\'s three learned functions are the representation function h, dynamics function g, and prediction function f. Their roles are:",
      options: [
        "h: encodes observations to latent states; g: transitions latent states given actions; f: predicts policy and value from latent states",
        "h: predicts rewards; g: transitions in pixel space; f: decodes latent states to observations",
        "h: computes Q-values; g: selects actions via MCTS; f: updates parameters",
        "h: generates rollouts; g: evaluates positions; f: computes the loss function",
      ],
      correctAnswer: 0,
      explanation:
        "h maps observations to latent states (s\\toz), g transitions the latent state given an action (z,a\\toz',r), and f predicts the policy distribution and value from any latent state (z\\to\\pi,v) - together enabling MCTS-based planning entirely in latent space.",
      hints: [
        "Think of the three functions as: encode, transition, predict.",
        "MCTS needs to simulate future states - which function provides this in latent space?",
      ],
    },
  ],

  dreamer: [
    {
      id: "q-rla-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "DreamerV2 and DreamerV3 train the policy entirely inside a learned world model by:",
      options: [
        "Using model-free Q-learning on the world model\'s simulated transitions",
        "Backpropagating gradients through multi-step dream rollouts to optimize the actor and critic",
        "Evolving the policy using an evolutionary algorithm inside the dream",
        "Using MCTS to plan inside the dream and then distilling the plan into a policy",
      ],
      correctAnswer: 1,
      explanation:
        "Dreamer imagines multi-step trajectories from the learned RSSM dynamics model and trains the actor by backpropagating through the differentiable dream to maximize value, and the critic to predict returns from dream states.",
      hints: [
        "The world model is differentiable - what optimization technique does this enable?",
        "Gradients can flow from reward/value predictions back through the latent dynamics to the actor.",
      ],
    },
    {
      id: "q-rla-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DreamerV3 is the first model-based RL algorithm to achieve human-level performance across a wide range of tasks including Atari, continuous control, and 3D environments with a single set of hyperparameters.",
      correctAnswer: "true",
      explanation:
        "DreamerV3 introduced robust techniques (symlog transformation, free-nats KL balancing, fixed bucket regression for returns) that made it work reliably across many domains with a single hyperparameter configuration - a major milestone for general-purpose model-based RL.",
      hints: [
        'Most RL algorithms require domain-specific tuning. What would "single hyperparameter set" imply?',
        "DreamerV3 achieved this by addressing training instabilities in its predecessors.",
      ],
    },
    {
      id: "q-rla-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The RSSM (Recurrent State-Space Model) in Dreamer combines a deterministic recurrent component with a stochastic latent variable because:",
      options: [
        "The deterministic component models environment noise while the stochastic component models the policy",
        "The deterministic path enables gradient flow over long horizons while the stochastic component models irreducible uncertainty",
        "The stochastic component is used during training and the deterministic component during inference",
        "Two components are needed for discrete and continuous action spaces respectively",
      ],
      correctAnswer: 1,
      explanation:
        "The deterministic GRU component h provides a stable, differentiable path for gradients over many time steps, while the stochastic categorical/Gaussian z captures the inherent randomness of the environment - enabling both long-horizon credit assignment and uncertainty modeling.",
      hints: [
        "Pure stochastic models make gradient flow through time difficult. What helps?",
        "Pure deterministic models cannot represent multimodal futures. What adds this capability?",
      ],
    },
  ],

  "multi-agent-rl": [
    {
      id: "q-rla-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Multi-agent RL (MARL) is challenging compared to single-agent RL primarily because:",
      options: [
        "The state space is always continuous in multi-agent settings",
        "The environment is non-stationary from each agent\'s perspective as other agents' policies change",
        "Rewards cannot be defined for multiple agents simultaneously",
        "Neural networks cannot be applied to multi-agent problems",
      ],
      correctAnswer: 1,
      explanation:
        "From any single agent\'s perspective, the other agents are part of the environment. As other agents learn and update their policies, the effective transition dynamics change - violating the stationarity assumption required by most single-agent RL convergence proofs.",
      hints: [
        "If another agent changes its policy during your training, does your environment remain the same?",
        "Stationarity of the MDP is a key assumption - what breaks it in MARL?",
      ],
    },
    {
      id: "q-rla-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In cooperative MARL, the Centralized Training with Decentralized Execution (CTDE) paradigm allows agents to share information during training but act independently at test time.",
      correctAnswer: "true",
      explanation:
        "CTDE methods (e.g., MADDPG, QMIX) use global state information and joint policies during training to coordinate learning, but each agent\'s policy conditions only on local observations during execution - enabling practical deployment without a central coordinator.",
      hints: [
        "Training is done in a lab (information can be shared); deployment is in the real world (communication may be limited).",
        "How can you use global information during training while keeping policies local at test time?",
      ],
    },
    {
      id: "q-rla-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In zero-sum two-player games, the Nash equilibrium solution concept implies:",
      options: [
        "Both players maximize their individual returns simultaneously",
        "Neither player can improve their expected payoff by unilaterally changing their strategy",
        "One player always wins and the other always loses regardless of strategy",
        "The optimal strategy is always deterministic for both players",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall what a strategy profile means: a specification of each player's chosen strategy (possibly mixed, i.e., a probability distribution over actions).\n\n**Step 1.** Consider two players with strategy profile (π₁, π₂). If player 1 deviates to a different strategy while player 2's strategy stays fixed, and this deviation increases player 1's expected payoff, then player 1 has an incentive to deviate.\n\n**Step 2.** A Nash equilibrium is defined as a strategy profile where no player has such an incentive — equivalently, each player's strategy is a best response to all other players' strategies.\n\n**Step 3.** In zero-sum games (payoff matrices where one player's gain is the other's loss), the Nash equilibrium has a special form: each player plays a minimax strategy, meaning they choose the action distribution that minimizes their maximum possible loss assuming the opponent also plays optimally.\n\nTherefore, in zero-sum games, the Nash equilibrium implies that neither player can improve their expected payoff by unilaterally changing their strategy — each is already playing a best response to the other.",
      hints: [
        "Nash equilibrium is a fixed point where no player wants to deviate - why?",
        "In rock-paper-scissors, what strategy profile satisfies this condition?",
      ],
    },
  ],

  "hierarchical-rl": [
    {
      id: "q-rla-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Hierarchical RL decomposes the RL problem by:",
      options: [
        "Training multiple independent agents, each solving a different subproblem",
        "Using high-level policies that set subgoals for low-level policies to achieve over multiple time steps",
        "Breaking the state space into independent regions, each solved by a separate Q-table",
        "Alternating between planning with a model and model-free Q-learning",
      ],
      correctAnswer: 1,
      explanation:
        "HRL uses a hierarchy of policies: a high-level (meta-)policy selects subgoals or options at a coarser time scale, while a low-level policy executes primitive actions to achieve those subgoals - enabling temporal abstraction.",
      hints: [
        "Think about how humans plan: high-level goals broken into sub-tasks, each executed step by step.",
        "The key innovation is that different levels of the hierarchy operate at different time scales.",
      ],
    },
    {
      id: "q-rla-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The options framework in HRL allows the low-level policy (option) to have its own termination condition, determining when control returns to the high-level policy.",
      correctAnswer: "true",
      explanation:
        "An option is a triple (\\pi, I, \\beta): a policy \\pi, an initiation set I (states where the option can start), and a termination condition \\beta(s) - the probability of terminating in state s. This allows options to span variable time horizons.",
      hints: [
        "Different subtasks take different amounts of time - how does the options framework handle this?",
        "The termination condition \\beta makes the option\'s duration state-dependent.",
      ],
    },
    {
      id: "q-rla-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'A key challenge in hierarchical RL is the "non-stationarity of sub-task rewards" because:',
      options: [
        "Low-level policies observe different state spaces than high-level policies",
        "As the high-level policy changes, the extrinsic reward signal received by the low-level policy changes, making its learning problem non-stationary",
        "Termination conditions change randomly, preventing the low-level policy from converging",
        "The high-level policy cannot observe the reward received by the low-level policy",
      ],
      correctAnswer: 1,
      explanation:
        "The low-level policy is trained with intrinsic rewards (e.g., reaching a subgoal set by the high-level). If the high-level policy changes the subgoals it assigns, the reward function for the low-level changes - creating a non-stationary learning problem for it.",
      hints: [
        "If the high-level policy changes which subgoals it assigns, what happens to the low-level\'s reward function?",
        "Non-stationarity is a general challenge in MARL too - is this similar?",
      ],
    },
  ],

  "reward-shaping": [
    {
      id: "q-rla-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Reward shaping modifies the reward function to:",
      options: [
        "Make all rewards positive to stabilize training",
        "Provide more frequent or informative feedback to speed up learning without changing the optimal policy",
        "Penalize the agent for taking too many steps in an episode",
        "Normalize rewards to have zero mean and unit variance",
      ],
      correctAnswer: 1,
      explanation:
        "Reward shaping adds supplementary reward signals (e.g., progress toward a goal) that provide more learning signal in sparse-reward settings, guiding the agent more efficiently while (ideally) preserving the optimal policy.",
      hints: [
        "Sparse rewards are hard to learn from - what could you add to help?",
        "The goal is to speed up learning without teaching the agent to do the wrong thing.",
      ],
    },
    {
      id: "q-rla-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Potential-based reward shaping F(s,s') = \\gamma\\Phi(s') − \\Phi(s) is guaranteed to preserve the optimal policy of the original MDP.",
      correctAnswer: "true",
      explanation:
        "Ng, Harada & Russell (1999) proved that potential-based shaping is the only class of shaping functions that preserves all optimal policies. The shaped MDP R' = R + F(s,s') has the same set of optimal policies as the original.",
      hints: [
        "This is the key theorem in reward shaping - what does it guarantee?",
        "Potential-based shaping is special because it factors as a telescoping sum over episodes.",
      ],
    },
    {
      id: "q-rla-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A danger of using non-potential-based reward shaping is:",
      options: [
        "The agent converges more slowly due to conflicting reward signals",
        "The agent may learn to exploit the shaped reward, optimizing the shaping bonus while ignoring the true objective",
        "The agent cannot use temporal difference learning with shaped rewards",
        "The value function estimates become negative, preventing convergence",
      ],
      correctAnswer: 1,
      explanation:
        "Arbitrary shaping rewards can redirect the agent toward a different objective - the shaped reward\'s maximum, not the original task\'s optimum. This \"reward hacking\" can cause the agent to game the shaped reward at the expense of true performance.",
      hints: [
        "What if the agent gets more shaped reward by doing something unintended?",
        "Think about an example: shaping a robot to move quickly might reward spinning in place.",
      ],
    },
  ],

  "curriculum-rl": [
    {
      id: "q-rla-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Curriculum learning in RL trains the agent by:",
      options: [
        "Providing a fixed, maximally difficult task from the start",
        "Gradually increasing task difficulty as the agent\'s competence improves",
        "Randomly sampling tasks from the full difficulty distribution at each episode",
        "Providing a human teacher that selects actions for the agent initially",
      ],
      correctAnswer: 1,
      explanation:
        "Curriculum learning presents tasks in an order from simpler to harder, allowing the agent to build foundational skills before facing the full task complexity - analogous to how humans learn progressively.",
      hints: [
        "Think about how humans learn mathematics: arithmetic before calculus.",
        "Would a chess novice improve faster against a grandmaster or an intermediate player?",
      ],
    },
    {
      id: "q-rla-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Automatic curriculum learning (ACL) methods must be provided with a manually designed sequence of tasks by a human expert.",
      correctAnswer: "false",
      explanation:
        "ACL methods automatically generate or select tasks to train on, using signals like learning progress, intermediate difficulty, or self-play to adapt the curriculum without human-designed task sequences.",
      hints: [
        '"Automatic" curriculum learning - what does "automatic" imply about human involvement?',
        "Methods like Go-Explore, PAIRED, and PLR generate their own curricula.",
      ],
    },
    {
      id: "q-rla-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "learning progress" signal used in curriculum learning measures:',
      options: [
        "The agent\'s absolute performance on a task",
        "The rate of improvement in performance, selecting tasks where the agent is improving most rapidly",
        "The difference between the agent\'s performance and a human baseline",
        "The entropy of the agent\'s policy on each task",
      ],
      correctAnswer: 1,
      explanation:
        'Learning progress (Schmidhuber\'s "interestingness") measures d/dt performance(task) - tasks where the agent is improving fastest are most informative. Very easy tasks (already mastered) and very hard tasks (no progress) have low learning progress.',
      hints: [
        "Would a task you\'ve already mastered or one you can\'t make progress on provide good learning signal?",
        "The Goldilocks zone: not too easy, not too hard - how do you identify it?",
      ],
    },
  ],

  "offline-rl": [
    {
      id: "q-rla-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Offline RL (Batch RL) differs from online RL in that:",
      options: [
        "It uses a smaller neural network to reduce computational cost",
        "It learns a policy from a fixed, pre-collected dataset without any further environment interaction",
        "It only uses deterministic policies to avoid exploration",
        "It requires a perfect model of the environment\'s dynamics",
      ],
      correctAnswer: 1,
      explanation:
        "Offline RL learns from a static dataset D = {(s,a,r,s')} collected by some (possibly unknown) behavior policy, without querying the real environment - making it suitable when interaction is dangerous, expensive, or impossible.",
      hints: [
        "Think about medical or autonomous driving data: you can\'t explore freely.",
        'The dataset is fixed - "offline" means no new environment interactions during learning.',
      ],
    },
    {
      id: "q-rla-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Standard off-policy RL algorithms (like Q-learning with a replay buffer) can be applied directly to offline RL datasets without modification.",
      correctAnswer: "false",
      explanation:
        "Standard off-policy RL suffers from distributional shift and extrapolation errors in offline settings: Q-values for out-of-distribution (OOD) actions are overestimated because those actions were never corrected by real environment feedback. Offline-specific methods like CQL, IQL, or TD3+BC add constraints to handle this.",
      hints: [
        "In online RL, the agent can explore and correct overestimated Q-values. What happens offline?",
        "The policy may want to take actions not in the dataset - what happens to Q(s,a) for those?",
      ],
    },
    {
      id: "q-rla-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Conservative Q-Learning (CQL) addresses offline RL\'s distributional shift by:",
      options: [
        "Only training on the top 10% of transitions by return",
        "Adding a regularizer that minimizes Q-values for OOD actions while maximizing them for in-dataset actions",
        "Clipping Q-values at the maximum observed return in the dataset",
        "Training the policy to imitate the behavior policy directly",
      ],
      correctAnswer: 1,
      explanation:
        "CQL augments the standard Bellman error loss with min_a E_{a~\\pi}[Q(s,a)] − E_{a~D}[Q(s,a)], penalizing high Q-values for actions outside the dataset while allowing high values for actions in the data - preventing exploitation of overestimated OOD Q-values.",
      hints: [
        "The problem is Q-values are too high for unobserved actions. How do you directly penalize this?",
        "CQL adds a Q-value penalty term to the loss - for which actions?",
      ],
    },
  ],

  "inverse-rl": [
    {
      id: "q-rla-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Inverse Reinforcement Learning (IRL) addresses the problem of:",
      options: [
        "Learning a policy without any reward signal from a sparse environment",
        "Inferring the reward function that explains observed expert behavior",
        "Reversing the direction of the Bellman equation to compute policies from values",
        "Training an agent to perform the opposite of what a given policy does",
      ],
      correctAnswer: 1,
      explanation:
        "IRL takes expert demonstrations as input and recovers the reward function R(s,a) that makes the observed behavior optimal - useful when designing a reward function is hard but demonstrations are available.",
      hints: [
        "In regular RL, the reward is given and you find the policy. IRL does what?",
        "Expert demonstrations reveal something about what the expert is trying to achieve.",
      ],
    },
    {
      id: "q-rla-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The IRL problem has a unique solution: given enough expert demonstrations, there is exactly one reward function that explains the behavior.",
      correctAnswer: "false",
      explanation:
        "IRL is fundamentally ill-posed: many reward functions can make observed behavior optimal (e.g., a constant reward, or a reward proportional to the state-action frequency). Additional assumptions or regularization are required to identify a meaningful reward.",
      hints: [
        'Could a reward of R(s,a)=0 everywhere explain any behavior as "optimal"?',
        "If multiple reward functions explain the same behavior, which one do you choose?",
      ],
    },
    {
      id: "q-rla-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Generative Adversarial Imitation Learning (GAIL) connects IRL to GANs by:",
      options: [
        "Using a GAN to generate synthetic expert demonstrations for data augmentation",
        "Training a discriminator to distinguish expert from agent trajectories, using it as an implicit reward signal",
        "Using adversarial training to find the worst-case reward function for the agent",
        "Generating diverse policies that all explain the expert demonstrations",
      ],
      correctAnswer: 1,
      explanation:
        "GAIL trains a discriminator D(s,a) to classify agent vs. expert transitions, and uses log D(s,a) as the reward signal for the agent. The agent and discriminator play a minimax game - converging when the agent\'s distribution is indistinguishable from the expert\'s.",
      hints: [
        "In a GAN, the generator fools the discriminator. Who plays the generator role in GAIL?",
        "The discriminator rewards the agent for producing transitions similar to the expert.",
      ],
    },
  ],

  "safe-rl": [
    {
      id: "q-rla-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Safe RL aims to train agents that:",
      options: [
        "Converge to the optimal policy in fewer environment steps",
        "Satisfy safety constraints (e.g., avoiding dangerous states) during training and/or deployment",
        "Use conservative exploration to avoid any reward-negative actions",
        "Achieve lower variance gradient estimates than standard RL algorithms",
      ],
      correctAnswer: 1,
      explanation:
        "Safe RL addresses the need to maintain safety constraints (e.g., collision avoidance, energy limits, safety boundaries) in safety-critical domains like robotics and autonomous vehicles, both during and after training.",
      hints: [
        '"Safe" refers to avoiding undesirable outcomes - not just finding the optimal policy.',
        "Think about a robot learning to walk: falling is unsafe and could damage hardware.",
      ],
    },
    {
      id: "q-rla-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Constrained MDPs (CMDPs) extend standard MDPs by adding auxiliary cost functions C_i(s,a), and the goal is to maximize reward subject to E[\\Sigma C_i] \\leq d_i for each constraint i.",
      correctAnswer: "true",
      explanation:
        "CMDPs formalize safe RL: the agent maximizes expected cumulative reward while satisfying cumulative cost constraints. Algorithms like CPO (Constrained Policy Optimization) and LaGrangian methods directly solve CMDP objectives.",
      hints: [
        "The CMDP adds inequality constraints on expected cumulative costs to the standard MDP objective.",
        "This is analogous to constrained optimization in continuous math - objective + constraints.",
      ],
    },
    {
      id: "q-rla-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Lagrangian relaxation applied to CMDP optimization converts the constrained problem into an unconstrained one by:",
      options: [
        "Adding a penalty term \\lambda\_i \\cdot \max(0, E[C_i] − d\_i) to the objective and optimizing jointly over policy and \\lambda",
        "Projecting the policy gradient onto the constraint manifold at each step",
        "Running a separate safety critic that blocks unsafe actions before they are executed",
        "Solving a linear program over the space of occupancy measures",
      ],
      correctAnswer: 0,
      explanation:
        "Lagrangian relaxation introduces multipliers \\lambda\_i \\geq 0 and optimizes the Lagrangian L(\\pi,\\lambda) = J(\\pi) − \\Sigma\_i \\lambda\_i(E[C\_i(\\pi)] − d\_i). The saddle-point (\\pi*, \\lambda*) satisfies the constraints, converting constrained RL into a two-player minimax game.",
      hints: [
        "Lagrangian relaxation moves constraints into the objective with penalty multipliers.",
        "The multiplier \\lambda is large when the constraint is violated, penalizing the policy heavily.",
      ],
    },
  ],
};

const extra: Record<string, import('@/lib/curriculum').Question[]> = {
  'marl-cooperative-competitive': [
    {
      id: 'q-rla-kp31-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In multi-agent RL, the key distinction between cooperative and competitive settings is:',
      options: [
        'Cooperative agents share a replay buffer; competitive agents do not',
        'Cooperative agents share a common team reward; competitive agents have opposing rewards (zero-sum)',
        'Cooperative agents always communicate; competitive agents are always silent',
        'Competitive settings require more agents than cooperative settings',
      ],
      correctAnswer: 1,
      explanation:
        'In cooperative MARL all agents maximize a shared global return, while in competitive (adversarial) settings one agent\'s gain is another\'s loss. Mixed cooperative-competitive games (e.g., team sports) combine both.',
      hints: [
        'Think about whether agents\' interests are aligned or opposed.',
        'Zero-sum means the sum of all rewards is always zero.',
      ],
    },
    {
      id: 'q-rla-kp31-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'MADDPG (Multi-Agent DDPG) uses centralized training with decentralized execution: critics are conditioned on all agents\' observations and actions during training, but actors only use local observations at execution time.',
      correctAnswer: 'true',
      explanation:
        'MADDPG\'s central critics can exploit global information to reduce non-stationarity during training, while decentralized actors ensure scalability at execution. This CTDE paradigm is widely adopted in cooperative MARL.',
      hints: [
        'CTDE = Centralized Training, Decentralized Execution.',
        'Non-stationarity arises because each agent\'s environment changes as other agents learn.',
      ],
    },
    {
      id: 'q-rla-kp31-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Reward shaping in cooperative multi-agent RL using difference rewards (D_i = G − G_{−i}) addresses which core challenge?',
      options: [
        'It removes the need for a centralized critic by computing local gradients',
        'It isolates each agent\'s individual contribution to the global reward, reducing the credit-assignment problem',
        'It converts the cooperative task into a competitive one to drive exploration',
        'It replaces the global reward with agent-specific shaped rewards that ignore teammates',
      ],
      correctAnswer: 1,
      explanation:
        'Difference rewards D_i = G(s,a) − G(s, a_{−i}) measure how much agent i contributes by comparing actual global return to counterfactual return without i\'s action. This gives a credit-assignment signal aligned with global objectives.',
      hints: [
        'The credit-assignment problem: in large teams, individual contributions to a shared reward are hard to isolate.',
        'Counterfactual baselines subtract the expected contribution of other agents.',
      ],
    },
  ],

  'hierarchical-rl-options': [
    {
      id: 'q-rla-kp32-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In hierarchical RL, the options framework decomposes a task using:',
      options: [
        'A fixed sequence of primitive actions chosen by the environment',
        'High-level options (sub-policies with initiation sets and termination conditions) executed by a meta-policy',
        'Separate neural networks for each skill that never share parameters',
        'A lookup table mapping goals to primitive actions',
      ],
      correctAnswer: 1,
      explanation:
        'An option o = (I_o, \\pi_o, \\beta_o) consists of an initiation set I_o (where option can start), intra-option policy \\pi_o, and termination condition \\beta_o. A meta-controller selects which option to execute, enabling temporal abstraction over many timesteps.',
      hints: [
        'Options generalize primitive actions to multi-step behaviors.',
        'The meta-policy picks options; each option runs its own policy until termination.',
      ],
    },
    {
      id: 'q-rla-kp32-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In goal-conditioned hierarchical RL, the high-level policy sets sub-goals for the low-level policy, and the low-level policy receives a dense intrinsic reward based on how close it gets to the sub-goal.',
      correctAnswer: 'true',
      explanation:
        'Goal-conditioned HRL (e.g., HIRO) has a high-level controller that generates sub-goals g_t every k steps. The low-level controller receives intrinsic reward r_t = −‖s_{t+1} − g_t‖ encouraging it to reach g_t, while the high-level maximizes extrinsic reward.',
      hints: [
        'HIRO = HIerarchical Reinforcement learning with Off-policy correction.',
        'Distance-based intrinsic reward provides a dense training signal for the low-level policy.',
      ],
    },
    {
      id: 'q-rla-kp32-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Hierarchical Actor-Critic (HAC) solves the non-stationarity problem in HRL by:',
      options: [
        'Freezing the low-level policy parameters while training the high-level policy',
        'Using hindsight action transitions that replace sub-goals with the state actually achieved, allowing off-policy learning at all levels',
        'Training each level with a separate environment simulator to isolate their dynamics',
        'Applying proximal policy optimization independently at each hierarchy level',
      ],
      correctAnswer: 1,
      explanation:
        'HAC uses hindsight action transitions: when the low-level policy fails to reach sub-goal g, HAC replaces g with the state actually reached s\'_t in the replay buffer. This makes transitions valid regardless of the current low-level policy, enabling stable off-policy updates at all hierarchy levels.',
      hints: [
        'Non-stationarity in HRL: as the low-level policy improves, transitions stored by the high-level become stale.',
        'Hindsight experience replay (HER) replaces failed goals with achieved states - HAC applies this hierarchically.',
      ],
    },
  ],

  'model-based-rl-apps': [
    {
      id: 'q-rla-kp33-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Dyna architecture improves sample efficiency in RL by:',
      options: [
        'Replacing real environment interactions with purely synthetic rollouts',
        'Learning a model of the environment and using it to generate additional simulated transitions for policy updates',
        'Sharing parameters between the environment model and the policy network',
        'Pretraining the policy on demonstrations before real environment interaction',
      ],
      correctAnswer: 1,
      explanation:
        'Dyna-Q interleaves real environment steps with model-based planning: after each real transition, the agent updates the model, then performs k simulated planning steps using the model. This amortizes the cost of environment interaction.',
      hints: [
        'Sutton\'s Dyna framework combines model-free and model-based learning.',
        'More planning steps (k) = better use of each real sample, at the cost of compute.',
      ],
    },
    {
      id: 'q-rla-kp33-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'World Models (Ha & Schmidhuber 2018) compress raw sensory observations into a latent representation using a VAE, then train a recurrent neural network (RNN/MDN) to predict future latent states.',
      correctAnswer: 'true',
      explanation:
        'World Models consist of: V (Vision model - VAE encodes frames to z_t), M (Memory model - MDN-RNN predicts P(z_{t+1}|z_t, a_t, h_t)), and C (Controller - linear policy trained in the dream). The agent can learn entirely inside its own learned world model.',
      hints: [
        'V = Vision (VAE), M = Memory (MDN-RNN), C = Controller.',
        'The "dream" is rollouts generated entirely inside the M model without real environment steps.',
      ],
    },
    {
      id: 'q-rla-kp33-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'MuZero differs from AlphaZero in which fundamental way?',
      options: [
        'MuZero uses policy gradient instead of MCTS for action selection',
        'MuZero learns a latent dynamics model without knowing the environment\'s rules, while AlphaZero requires a perfect simulator',
        'MuZero uses value iteration over the full state space; AlphaZero uses MCTS only at leaf nodes',
        'MuZero is restricted to board games; AlphaZero works on both games and robotics',
      ],
      correctAnswer: 1,
      explanation:
        'AlphaZero requires a perfect simulator of the environment (e.g., chess rules). MuZero learns a latent dynamics model f(h, a) \\to (h\', r, v, p) entirely from data, enabling MCTS planning in the learned latent space. This extends to Atari and other domains where rules are unknown.',
      hints: [
        'AlphaZero = perfect simulator given; MuZero = learns the simulator.',
        'MuZero\'s latent dynamics model predicts reward, value, and policy - not literal next states.',
      ],
    },
  ],

  'rl-for-nlp': [
    {
      id: 'q-rla-kp34-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Reinforcement Learning from Human Feedback (RLHF) fine-tunes language models by:',
      options: [
        'Having humans label every token in the training corpus with a reward score',
        'Training a reward model from human preference comparisons, then using PPO to maximize that reward',
        'Replacing the cross-entropy loss with a human-specified utility function during pretraining',
        'Using Q-learning over the vocabulary to select tokens that maximize user satisfaction',
      ],
      correctAnswer: 1,
      explanation:
        'RLHF (InstructGPT, ChatGPT): (1) collect human preference data comparing pairs of responses, (2) train a reward model R(x,y) via Bradley-Terry regression, (3) fine-tune the LM with PPO to maximize E[R(x,y)] − \\beta\\cdotKL(\\pi || \\pi_ref), keeping the policy close to the reference LM.',
      hints: [
        'The reward model learns to score outputs based on human pairwise preferences.',
        'PPO is used because it is stable and clips large policy updates.',
      ],
    },
    {
      id: 'q-rla-kp34-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Reward hacking in RLHF occurs when the policy finds high-scoring outputs that satisfy the reward model but diverge from true human intent, typically because the reward model is an imperfect proxy.',
      correctAnswer: 'true',
      explanation:
        'Reward hacking (Goodhart\'s Law): "When a measure becomes a target, it ceases to be a good measure." The LM can find adversarial inputs that exploit reward model blind spots - e.g., verbose or sycophantic responses that score highly but are unhelpful.',
      hints: [
        'Goodhart\'s Law applies: optimizing a proxy measure diverges from the true objective.',
        'Examples: responses that are long and complimentary rather than accurate.',
      ],
    },
    {
      id: 'q-rla-kp34-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'The KL penalty term \\beta\\cdotKL(\\pi_\\theta || \\pi_ref) in the RLHF objective serves which dual purpose?',
      options: [
        'It speeds up training by reducing gradient variance and prevents the policy from memorizing training prompts',
        'It prevents reward hacking by keeping the fine-tuned policy close to the reference LM, and ensures the policy retains general language capabilities',
        'It replaces the need for a separate reward model by computing divergence from preferred responses',
        'It enforces that the policy remains in the low-perplexity region of the reference distribution for computational efficiency',
      ],
      correctAnswer: 1,
      explanation:
        'The KL penalty \\beta\\cdotKL(\\pi || \\pi_ref) acts as a regularizer: (1) it limits how far the policy drifts from the pretrained reference, preventing reward hacking exploitation of OOD inputs; (2) it preserves the general language model capabilities learned during pretraining. Higher \\beta = more conservative fine-tuning.',
      hints: [
        'Without KL penalty, the policy can collapse to gibberish that happens to score high on the reward model.',
        '\\beta controls the trade-off: high \\beta = stays close to reference; low \\beta = more RL optimization.',
      ],
    },
  ],

  'rl-robotics': [
    {
      id: 'q-rla-kp35-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Continuous action spaces in robotics RL (e.g., joint torques) require algorithms that:',
      options: [
        'Discretize the action space into bins and apply standard DQN',
        'Directly output action distributions (e.g., Gaussian) and optimize with policy gradient or actor-critic methods',
        'Use lookup tables indexed by joint angles',
        'Restrict actions to a finite set of keyframe poses',
      ],
      correctAnswer: 1,
      explanation:
        'Continuous control requires parameterizing action distributions (typically Gaussian \\pi(a|s) = N(\\mu_\\theta(s), \\Sigma_\\theta(s))) and using algorithms like PPO, SAC, or TD3 that can optimize over continuous action spaces without exhaustive enumeration.',
      hints: [
        'DQN requires \argmax over actions - intractable for continuous spaces.',
        'Gaussian policies output mean and variance, allowing reparameterization for gradients.',
      ],
    },
    {
      id: 'q-rla-kp35-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'SAC (Soft Actor-Critic) differs from TD3 (Twin Delayed Deep Deterministic) primarily in that SAC maximizes an entropy-augmented objective, leading to a stochastic policy, while TD3 uses a deterministic policy.',
      correctAnswer: 'true',
      explanation:
        'SAC optimizes J = E[\\Sigma r_t + \\alpha\\cdotH(\\pi(\\cdot|s_t))], encouraging maximum entropy exploration. TD3 improves DDPG with twin critics and delayed policy updates but maintains a deterministic policy. SAC\'s stochastic policy provides natural exploration without explicit noise injection.',
      hints: [
        'SAC = maximum entropy RL \\to stochastic policy. TD3 = deterministic + noise for exploration.',
        '\\alpha in SAC controls exploration-exploitation trade-off (temperature parameter).',
      ],
    },
    {
      id: 'q-rla-kp35-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Reward shaping for robotic manipulation (e.g., peg insertion) using potential-based shaping \\Phi(s) guarantees:',
      options: [
        'Faster convergence to the optimal policy regardless of \\Phi\'s accuracy',
        'Policy invariance: the optimal policy for the shaped reward F(s,a,s\') = r + \\gamma\\Phi(s\') − \\Phi(s) is the same as for the original r',
        'The shaped reward eliminates the need for any sparse terminal reward signal',
        'Potential-based shaping forces exploration toward the goal state',
      ],
      correctAnswer: 1,
      explanation:
        'Ng et al. (1999) proved that F(s,a,s\') = r(s,a,s\') + \\gamma\\Phi(s\') − \\Phi(s) preserves the optimal policy for any potential function \\Phi. This allows injecting domain knowledge (e.g., \\Phi = −dist_to_goal) without distorting the RL solution, unlike arbitrary reward shaping.',
      hints: [
        'The shaping term \\gamma\\Phi(s\') − \\Phi(s) telescopes to zero over complete episodes.',
        'Only potential-based shaping guarantees policy invariance - arbitrary bonuses can change the optimal policy.',
      ],
    },
  ],

  'rl-games': [
    {
      id: 'q-rla-kp36-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'DQN achieved human-level performance on Atari 2600 games by using which input representation?',
      options: [
        'Game state variables (score, positions) extracted by the game engine',
        'Raw pixel frames stacked across 4 consecutive timesteps',
        'Audio waveforms from the game sound card',
        'Text descriptions of the game state',
      ],
      correctAnswer: 1,
      explanation:
        'DQN (Mnih et al. 2015) takes as input 4 stacked grayscale frames (84\\times84 pixels each), giving the network temporal information about motion and velocity. The stack captures recent dynamics without requiring a recurrent network.',
      hints: [
        'Stacking frames provides velocity information (motion direction) that a single frame cannot.',
        'DQN is the "end-to-end from pixels" breakthrough - no hand-engineered features.',
      ],
    },
    {
      id: 'q-rla-kp36-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'AlphaGo uses Monte Carlo Tree Search (MCTS) guided by a policy network (to select promising moves) and a value network (to evaluate board positions) trained from human expert games and self-play.',
      correctAnswer: 'true',
      explanation:
        'AlphaGo combines: (1) policy network P(a|s) trained by supervised learning on expert games then refined by policy gradient self-play; (2) value network V(s) trained by regression on self-play outcomes; (3) MCTS that uses P for tree expansion and V for leaf evaluation, replacing expensive random rollouts.',
      hints: [
        'MCTS without neural guidance requires deep random rollouts - too slow for Go\'s branching factor.',
        'Policy network prunes branches; value network evaluates leaf nodes without rollout.',
      ],
    },
    {
      id: 'q-rla-kp36-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'AlphaZero\'s key departure from AlphaGo is that it:',
      options: [
        'Replaces MCTS with policy gradient for move selection',
        'Trains entirely from self-play using a single unified network with no human expert data',
        'Uses a lookup table of 10^9 endgame positions for evaluation',
        'Applies model-free Q-learning to the game tree rather than MCTS',
      ],
      correctAnswer: 1,
      explanation:
        'AlphaZero uses a single f_\\theta(s) \\to (p, v) network trained purely from self-play with no human game data. MCTS uses p to guide search and v to evaluate positions. The network learns both move selection and position evaluation jointly, generalizing across chess, shogi, and Go.',
      hints: [
        'AlphaGo used human expert games for supervised pretraining - AlphaZero uses zero human data.',
        'A single network outputs (policy, value) - no separate policy/value networks.',
      ],
    },
  ],

  'real-world-rl-challenges': [
    {
      id: 'q-rla-kp37-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Partial observability in RL means:',
      options: [
        'The agent observes only a subset of actions available in each state',
        'The agent\'s observation o_t does not fully determine the true environment state s_t',
        'The reward function is stochastic and not fully observable',
        'Only some episodes are observed during training',
      ],
      correctAnswer: 1,
      explanation:
        'In a Partially Observable MDP (POMDP), the agent receives observation o_t ~ O(\\cdot|s_t) rather than the full state s_t. The observation may be noisy or incomplete. Agents must maintain a belief state b(s_t) = P(s_t | o_1,...,o_t, a_1,...,a_{t-1}) or use memory (RNNs) to act optimally.',
      hints: [
        'A robot with a camera has partial observability - it cannot see behind itself.',
        'POMDP = Partially Observable MDP. The O stands for Observation function.',
      ],
    },
    {
      id: 'q-rla-kp37-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'The credit assignment problem in RL refers to the difficulty of determining which specific actions in a long trajectory caused a delayed reward received many timesteps later.',
      correctAnswer: 'true',
      explanation:
        'When a reward arrives at time T after a sequence of actions a_1,...,a_T, attributing the reward to the correct actions is the temporal credit assignment problem. Techniques like eligibility traces, advantage estimation, and attention mechanisms help propagate credit backward through time.',
      hints: [
        'If you win a chess game after 100 moves, which moves were most important?',
        'Discounting (\\gamma < 1) provides one heuristic: actions closer to reward get more credit.',
      ],
    },
    {
      id: 'q-rla-kp37-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Sparse reward environments (e.g., reward only on task completion) are challenging primarily because:',
      options: [
        'The policy gradient estimator becomes biased when rewards are sparse',
        'With near-zero expected reward, the gradient signal \\nablaJ(\\theta) \\approx 0 almost everywhere, making learning from random exploration extremely slow',
        'Sparse rewards violate the Markov property required by standard RL algorithms',
        'Neural networks cannot represent sparse functions, causing approximation error',
      ],
      correctAnswer: 1,
      explanation:
        'In sparse reward settings, most trajectories receive r=0, so the policy gradient E[\\nablalog \\pi \\cdot G] \\approx 0. The agent cannot distinguish good from bad actions without ever reaching the goal. Solutions include reward shaping, hindsight experience replay (HER), intrinsic motivation (curiosity), and curriculum learning.',
      hints: [
        'If a robot never reaches the goal, it receives no learning signal from the environment.',
        'HER, curriculum learning, and intrinsic rewards are the main tools for sparse reward settings.',
      ],
    },
  ],

  'safe-rl-cmdp': [
    {
      id: 'q-rla-kp38-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A Constrained MDP (CMDP) extends the standard MDP by adding:',
      options: [
        'A second agent that enforces safety constraints on the primary agent',
        'Auxiliary cost functions C_i(s,a) with constraints E[\\Sigma C_i] \\leq d_i that the policy must satisfy',
        'Hard action masks that block unsafe actions at every timestep',
        'A separate safe state space that the agent must stay within at all times',
      ],
      correctAnswer: 1,
      explanation:
        'A CMDP is a tuple (S, A, P, r, C_1,...,C_k, d_1,...,d_k). The agent maximizes E[\\Sigma r_t] subject to E[\\Sigma C_i(s_t,a_t)] \\leq d_i for each constraint. This formulation covers safety constraints, resource limits, and fairness requirements.',
      hints: [
        'CMDPs add inequality constraints on expected cumulative costs to the standard RL objective.',
        'The threshold d_i specifies the maximum allowable cumulative cost for constraint i.',
      ],
    },
    {
      id: 'q-rla-kp38-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Shielding in safe RL uses a verified safety monitor that intercepts the RL agent\'s actions and overrides any action that would provably violate a safety constraint.',
      correctAnswer: 'true',
      explanation:
        'A shield is a reactive safety layer derived from formal verification (e.g., model checking): it computes for each state the set of safe actions and either blocks unsafe actions or replaces them with a safe fallback. The RL agent learns freely within the shield\'s safety envelope.',
      hints: [
        'The shield is verified offline using formal methods - it provides hard safety guarantees.',
        'Unlike CMDP which relaxes constraints probabilistically, shielding provides deterministic safety guarantees.',
      ],
    },
    {
      id: 'q-rla-kp38-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Constrained Policy Optimization (CPO) extends TRPO to CMDPs by:',
      options: [
        'Adding a Lagrangian penalty to the TRPO objective and solving the dual problem',
        'Solving a constrained optimization that simultaneously bounds the KL divergence and the change in constraint costs, using a linear approximation to the cost functions',
        'Projecting the unconstrained TRPO update onto the feasible constraint set using quadratic programming',
        'Using a separate safety critic to block constraint-violating gradient updates',
      ],
      correctAnswer: 1,
      explanation:
        'CPO (Achiam et al. 2017) extends TRPO\'s trust region to include constraints on expected cumulative costs. It solves: max_\\pi J(\\pi) s.t. J_C_i(\\pi) \\leq d_i, D_KL(\\pi||\\pi_k) \\leq \\delta. Using linear-quadratic approximations it finds the update direction within the trust region that satisfies cost constraints, with recovery steps when constraints are violated.',
      hints: [
        'TRPO constrains the KL divergence - CPO additionally constrains cumulative costs.',
        'The linear cost approximation allows solving the constrained update as a quadratic program.',
      ],
    },
  ],

  'offline-rl-cql': [
    {
      id: 'q-rla-kp39-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Offline RL (batch RL) differs from standard (online) RL in that:',
      options: [
        'Offline RL uses neural networks while online RL uses tabular methods',
        'Offline RL learns a policy from a fixed dataset of pre-collected transitions without any further environment interaction',
        'Offline RL requires a perfect environment model to plan future trajectories',
        'Offline RL uses supervised learning only, ignoring Bellman equations',
      ],
      correctAnswer: 1,
      explanation:
        'Offline RL (Levine et al. 2020) learns entirely from a static dataset D = {(s,a,r,s\')} without being able to interact with the environment. The key challenge is distribution shift: the learned policy may visit states not covered by the dataset, leading to extrapolation errors in Q-values.',
      hints: [
        'No environment interaction means no exploration - the dataset is fixed.',
        'Distribution shift: Q(s,a) may be wildly wrong for (s,a) pairs not in the dataset.',
      ],
    },
    {
      id: 'q-rla-kp39-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Conservative Q-Learning (CQL) penalizes Q-values for out-of-distribution actions to prevent overestimation, while still supporting Bellman backups on in-distribution data.',
      correctAnswer: 'true',
      explanation:
        'CQL minimizes E_{\\mu}[Q(s,a)] − E_{D}[Q(s,a)] + standard Bellman loss, where \\mu is a broad distribution over actions and D is the data distribution. This pushes down Q for OOD actions and pulls up Q for in-distribution actions, preventing the policy from exploiting Q-overestimation.',
      hints: [
        'CQL = Conservative Q-Learning. Conservative means: underestimate OOD Q-values for safety.',
        'The penalty term lower-bounds the true Q-function under the data distribution.',
      ],
    },
    {
      id: 'q-rla-kp39-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Implicit Q-Learning (IQL) avoids querying Q-values at OOD actions during training by:',
      options: [
        'Using a learned policy to restrict action queries to the behavior distribution',
        'Replacing the max_a Q(s\',a) Bellman backup with an expectile regression that approximates the maximum without sampling OOD actions',
        'Applying importance sampling to reweight in-distribution actions to match the optimal policy',
        'Clipping Q-values at the dataset\'s maximum observed return to prevent overestimation',
      ],
      correctAnswer: 1,
      explanation:
        'IQL (Kostrikov et al. 2021) replaces max_a Q(s\',a) with V(s\') learned via expectile regression at a high quantile \\tau \\approx 0.7-0.9, approximating the \max without querying OOD actions. Advantage-weighted regression then extracts a policy. This enables stable offline RL without any OOD action queries.',
      hints: [
        'Expectile regression at high \\tau approximates the maximum of a distribution.',
        'IQL never evaluates Q(s\',a\') for actions a\' not in the dataset - no OOD extrapolation.',
      ],
    },
  ],

  'multi-task-rl': [
    {
      id: 'q-rla-kp40-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The main benefit of multi-task RL compared to training a separate policy for each task is:',
      options: [
        'Multi-task policies always achieve higher reward on individual tasks than single-task specialists',
        'Sharing parameters across tasks enables transfer of representations, reducing sample complexity per task',
        'Multi-task training avoids the need for reward functions entirely',
        'Multi-task RL uses model-based methods while single-task RL is always model-free',
      ],
      correctAnswer: 1,
      explanation:
        'Multi-task RL trains a single policy \\pi(a|s,z) conditioned on a task descriptor z. Shared representations capture common structure (e.g., object physics) that transfers across tasks, improving data efficiency. The trade-off is potential interference between dissimilar tasks.',
      hints: [
        'Parameter sharing = implicit transfer: representations learned for one task can help others.',
        'Task descriptor z can be a one-hot vector, embedding, or natural language instruction.',
      ],
    },
    {
      id: 'q-rla-kp40-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Universal Value Function Approximators (UVFAs) extend value functions to V(s, g) conditioned on a goal g, enabling generalization across different goals without retraining.',
      correctAnswer: 'true',
      explanation:
        'UVFAs (Schaul et al. 2015) represent V(s,g;\\theta) as a single network that generalizes across both states and goals. Trained on diverse (s,g) pairs, UVFAs can estimate value for unseen (s,g) combinations via generalization. Combined with HER, this enables efficient goal-conditioned RL.',
      hints: [
        'Standard V(s) is goal-specific; UVFA V(s,g) unifies all goals in one network.',
        'Generalization across goals is the key advantage - no retraining needed for new goals.',
      ],
    },
    {
      id: 'q-rla-kp40-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Task embeddings in multi-task RL (e.g., PEARL, MAML) are inferred from context to enable fast adaptation. PEARL specifically differs from MAML by:',
      options: [
        'PEARL uses gradient-based meta-learning while MAML uses probabilistic context inference',
        'PEARL infers a posterior over task embeddings z ~ q(z|context) using an encoder network, enabling adaptation in a single forward pass without gradient updates',
        'PEARL requires knowing the task identity at test time; MAML infers it from observations',
        'PEARL trains a separate policy per task; MAML shares all parameters across tasks',
      ],
      correctAnswer: 1,
      explanation:
        'PEARL (Rakelly et al. 2019) uses an encoder E(z|{s,a,r,s\'}) to infer a probabilistic task embedding z ~ q(z|context) from recent transitions. The policy \\pi(a|s,z) conditions on z, enabling fast adaptation by updating the posterior q(z|context) rather than gradient-updating policy parameters. MAML adapts via gradient steps at meta-test time.',
      hints: [
        'MAML = gradient-based adaptation at test time. PEARL = inference-based adaptation (no gradients).',
        'PEARL\'s context encoder amortizes the adaptation cost: one forward pass replaces many gradient steps.',
      ],
    },
  ],
};

Object.assign(questions, extra);

const extra2: Record<string, Question[]> = {
  "ctde-methods": [
    {
      id: "q-rla-kp41-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "CTDE (Centralized Training, Decentralized Execution) is a paradigm for cooperative MARL. What does it mean for a critic to be 'centralized' during training in MADDPG?",
      options: [
        "The critic runs on a central server rather than on each agent's hardware",
        "The critic Q_i(s, a_1, ..., a_n) is conditioned on the joint observations and actions of ALL agents during training, giving it access to global information that individual agents cannot access at execution time",
        "The critic is shared across all agents, meaning all agents use an identical value function",
        "The critic only observes the state and ignores actions from other agents",
      ],
      correctAnswer: 1,
      explanation: "In MADDPG (Lowe et al., 2017), each agent i has a centralized critic Q_i(x, a_1, ..., a_n) that takes the global state x and all agents' actions as input during training. At execution time, each actor \\pi_i(o_i) uses only its local observation o_i. The centralized critic helps agents learn coordinated policies by providing better credit assignment and handling the non-stationarity of other agents' changing policies - if you condition on others' actions, the environment appears stationary from each agent's view.",
      hints: [
        "During training, each agent's critic receives information about what all other agents are doing. How does this help with the non-stationarity problem?",
        "At execution time, only local observations are available. How does the decentralized actor avoid needing the centralized critic?",
      ],
    },
    {
      id: "q-rla-kp41-2",
      type: "true-false",
      difficulty: "medium",
      question: "QMIX (Rashid et al., 2018) factorizes the joint Q-function as a sum of individual Q-functions: Q_tot = \\Sigma_i Q_i(o_i, a_i).",
      correctAnswer: "false",
      explanation: "QMIX uses a more expressive factorization: Q_tot = f(Q_1(o_1,a_1), ..., Q_n(o_n,a_n)) where f is a monotone mixing network with weights conditioned on the global state. This satisfies the IGM (Individual-Global-Max) property: \argmax Q_tot = (\argmax Q_1, ..., \argmax Q_n). Simple additive factorization (VDN) is a special case of QMIX. The monotone mixing network allows QMIX to represent cooperative strategies beyond simple summation while maintaining decentralized execution.",
      hints: [
        "A simple sum \\Sigma_i Q_i would be VDN (Value Decomposition Network). Is QMIX the same as VDN?",
        "QMIX requires that \argmax Q_tot can be found by each agent independently maximizing its own Q_i. What constraint on the mixing function ensures this?",
      ],
    },
    {
      id: "q-rla-kp41-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The non-stationarity problem in MARL occurs because from any single agent's perspective, other agents are part of the environment. Why does CTDE specifically address this, and what residual challenge remains?",
      options: [
        "CTDE eliminates non-stationarity completely because all agents learn simultaneously with a shared global critic",
        "CTDE addresses non-stationarity by conditioning critics on joint actions (making each agent's learning problem conditionally stationary given others' policies). The residual challenge is that policies still change during training, so the centralized critic must track a moving target as all agents' policies co-evolve.",
        "CTDE eliminates non-stationarity by freezing other agents' policies during each agent's update",
        "CTDE only addresses non-stationarity for cooperative settings, not competitive ones",
      ],
      correctAnswer: 1,
      explanation: "CTDE reduces non-stationarity: by conditioning the critic on joint actions, the transition T(s'|s, a_1,...,a_n) appears stationary from each agent's perspective (conditioned on all actions). However, as all agents update their policies simultaneously, the marginal transition T(s'|s, a_i) from agent i's perspective still shifts. This is a fundamental challenge in MARL. Recent methods address it by modeling other agents' policies (opponent modeling), using population-based training, or applying fictitious self-play for the competitive case.",
      hints: [
        "If agent i's critic conditions on all agents' joint actions, does the environment appear stationary conditioned on those joint actions?",
        "Even with CTDE, all agents update their policies during training. Does this still cause the effective transition distribution to shift from any single agent's perspective?",
      ],
    },
  ],

  "offline-rl-advanced": [
    {
      id: "q-rla-kp42-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Conservative Q-Learning (CQL, Kumar et al., 2020) penalizes Q-values for out-of-distribution (OOD) actions. What is the specific penalty CQL adds to the standard Bellman loss?",
      options: [
        "CQL subtracts the Q-value of the most likely dataset action from the objective",
        "CQL minimizes $E_{s \sim D}[\log \\Sigma_a \exp(Q(s,a))]$ - E_{(s,a)~D}[Q(s,a)], pushing down Q-values for actions not in the dataset while pushing up Q-values for dataset actions",
        "CQL adds an L2 regularizer on Q-values to prevent them from growing too large",
        "CQL clips Q-values at zero for any action not observed in the offline dataset",
      ],
      correctAnswer: 1,
      explanation: "CQL's conservative penalty is: \\alpha \cdot (E_{s}[log \\Sigma_a \exp Q(s,a)] - E_{(s,a)~D}[Q(s,a)]). The first term pushes down Q-values for all actions (softmax-weighted average), the second pushes up Q-values for dataset actions. Combined with the Bellman loss, CQL learns Q-values that are lower bounds on the true Q-values under the dataset policy, preventing overestimation for OOD actions. This stops the policy from exploiting spurious high Q-values for actions the agent should never take.",
      hints: [
        "The penalty has two terms: one that pushes Q-values DOWN for all actions, and one that pushes Q-values UP for dataset actions. Why the asymmetry?",
        "log \\Sigma_a \exp Q(s,a) = log softmax partition function. Which actions does this term most penalize?",
      ],
    },
    {
      id: "q-rla-kp42-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "IQL (Implicit Q-Learning, Kostrikov et al., 2021) avoids querying OOD actions by using expectile regression. What does expectile regression with \\tau > 0.5 compute, and why is it preferable to CQL for offline RL?",
      options: [
        "Expectile regression computes the mean Q-value; it is preferable because it is unbiased",
        "Expectile regression with \\tau close to 1 approximates the maximum of the Q-function over actions, obtained by fitting only to transitions where Q(s,a) exceeds the current value estimate. This avoids querying Q at OOD actions altogether, making it safe for offline settings.",
        "Expectile regression computes the minimum Q-value; this avoids overestimation of OOD action values",
        "Expectile regression adds a monotone transformation to make Q-values more stable numerically",
      ],
      correctAnswer: 1,
      explanation: "IQL's key insight: to find V*(s) = max_a Q*(s,a) without querying OOD actions, use expectile regression on the value function V(s). The expectile loss L_\\tau^2(u) = |\\tau - 1(u<0)| * u^2 with \\tau close to 1 asymmetrically penalizes underestimation, fitting V(s) to the upper quantile of Q(s,a) over dataset actions. The policy is then extracted via advantage-weighted regression: \\pi(a|s) \propto \exp(\beta * (Q(s,a) - V(s))). IQL outperforms CQL on many benchmarks and scales better to complex function approximators.",
      hints: [
        "Expectile \\tau=0.5 recovers the mean (like L2 regression). What does \\tau \\to 1.0 compute?",
        "IQL never evaluates Q at OOD actions - it only uses (s,a) pairs from the dataset. How does it still approximate the policy improvement step?",
      ],
    },
    {
      id: "q-rla-kp42-3",
      type: "true-false",
      difficulty: "easy",
      question: "Distribution shift in offline RL refers to the mismatch between the state-action distribution induced by the learned policy and the state-action distribution of the offline dataset used for training.",
      correctAnswer: "true",
      explanation: "During offline RL training, the Q-function is estimated from a fixed dataset D = {(s,a,r,s')} collected by some behavior policy \\pi_b. The learned policy \\pi may visit (s,a) pairs that are rare or absent in D, causing Q-values extrapolated to OOD regions to be unreliable (often overestimated). This distribution shift is the core challenge: the Bellman backup uses Q(s', \\pi(s')) which may query OOD actions. CQL, IQL, TD3+BC, and other offline RL methods each address this shift differently.",
      hints: [
        "The dataset was collected by a specific behavior policy. Does the learned policy visit the same states and actions?",
        "If Q(s,a) is overestimated for OOD (s,a) pairs, what happens to the policy that greedily maximizes Q?",
      ],
    },
  ],

  "td3bc-offline": [
    {
      id: "q-rla-kp43-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "TD3+BC (Fujimoto & Gu, 2021) is a minimal offline RL algorithm that adds a behavioral cloning term to TD3. Its policy objective is: \\pi = \argmax_a [\\lambda * Q(s,a) - (a - \\pi_\\beta(s))^2]. What does the BC term do?",
      options: [
        "It forces the learned policy to exactly replicate the behavior policy \\pi_\\beta from the dataset",
        "It regularizes the policy toward the dataset's actions, preventing large deviations from the data distribution that would require evaluating Q at OOD states",
        "It adds an entropy term to encourage exploration during offline training",
        "It penalizes the policy for selecting actions with high Q-values, preventing overestimation",
      ],
      correctAnswer: 1,
      explanation: "The BC term (a - \\pi_\\beta(s))^2 penalizes the policy for deviating from the behavior policy's actions on dataset states. The hyperparameter \\lambda = \\alpha / (1/N * \\Sigma|Q(s,a)|) normalizes the Q-values scale. This simple regularization prevents the policy from exploiting overestimated Q-values at OOD actions without requiring complex constrained optimization (unlike CQL). TD3+BC matches or outperforms more sophisticated offline RL algorithms on D4RL benchmarks despite its simplicity.",
      hints: [
        "The term (a - \\pi_\\beta(s))^2 penalizes actions that deviate from the dataset. How does this prevent OOD action exploitation?",
        "If Q(s,a) is overestimated for some OOD action a', but the BC term penalizes deviating from \\pi_\\beta(s), which force wins?",
      ],
    },
    {
      id: "q-rla-kp43-2",
      type: "true-false",
      difficulty: "medium",
      question: "Offline RL algorithms trained on suboptimal datasets (e.g., containing mostly random behavior) can still recover a near-optimal policy as long as the dataset covers the state-action space densely.",
      correctAnswer: "false",
      explanation: "Dense coverage of the state-action space does not guarantee near-optimal policy recovery. First, the offline dataset must contain some near-optimal trajectories or the stitching of suboptimal paths that compose to optimal behavior - dense random coverage may not include these. Second, offline RL algorithms like CQL and IQL are conservative and may underestimate Q-values in data-sparse regions, preventing improvement beyond the behavior policy. Third, stitching (combining different parts of suboptimal trajectories) requires accurate value estimation in the overlap regions, which is difficult with noisy random data.",
      hints: [
        "If the dataset only contains random trajectories, does it contain examples of optimal behavior for the agent to learn from?",
        "Offline RL cannot collect new data. If the optimal policy requires a sequence of actions not observed consecutively in the dataset, can the algorithm discover this?",
      ],
    },
    {
      id: "q-rla-kp43-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The 'deadly triad' in off-policy RL with function approximation consists of three factors whose combination causes divergence. Which three factors form the deadly triad?",
      options: [
        "High learning rates, large replay buffers, and discount factor \\gamma close to 1",
        "Function approximation, bootstrapping (TD learning), and off-policy training",
        "Neural networks, stochastic gradient descent, and high-dimensional observation spaces",
        "Epsilon-greedy exploration, experience replay, and target networks",
      ],
      correctAnswer: 1,
      explanation: "The deadly triad (Sutton & Barto, Chapter 11) consists of: (1) Function approximation - Q-values are estimated by a parametric model that generalizes; (2) Bootstrapping - targets use current Q-value estimates (TD), creating a feedback loop; (3) Off-policy training - the behavior distribution differs from the target policy's distribution. Any two of these three factors alone is manageable, but all three together can cause divergence (as in Baird's counterexample). Offline RL with neural networks faces all three factors simultaneously, making it inherently challenging.",
      hints: [
        "Baird's counterexample shows divergence with linear FA + off-policy TD. Which two of the three deadly triad factors does this use?",
        "Online Q-learning with function approximation can also be unstable. Which two deadly triad factors does it use?",
      ],
    },
  ],

  "rlhf-mechanics": [
    {
      id: "q-rla-kp44-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "RLHF (Reinforcement Learning from Human Feedback) for language models consists of three phases. What are they in correct order?",
      options: [
        "Pre-train on text \\to fine-tune with PPO directly \\to apply KL penalty",
        "Pre-train on text \\to supervised fine-tuning (SFT) on demonstrations \\to train a reward model from preference comparisons \\to fine-tune the LLM with PPO using the reward model",
        "Pre-train on text \\to collect human ratings of individual responses \\to fine-tune with REINFORCE using those ratings as rewards",
        "Train a reward model \\to use it to generate synthetic demonstrations \\to pre-train the LLM on those demonstrations",
      ],
      correctAnswer: 1,
      explanation: "RLHF (InstructGPT, Ouyang et al., 2022) proceeds in three phases: (1) SFT: fine-tune the pre-trained LLM on human-written demonstrations of desired behavior; (2) Reward Model: collect human preference pairs (response A vs. B is preferred), train a reward model R(x,y) using the Bradley-Terry model via a classification loss; (3) RL fine-tuning: use PPO to maximize E[R(x,y)] while keeping the policy close to the SFT model via a KL penalty. This KL penalty is critical: without it, the LLM collapses to reward hacking.",
      hints: [
        "Why do we need SFT before collecting preferences? Can't we just ask humans to rate raw LLM outputs?",
        "The reward model is trained on preference pairs (A preferred over B) rather than absolute scores. Why is relative preference data easier to collect than absolute ratings?",
      ],
    },
    {
      id: "q-rla-kp44-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The KL penalty in RLHF fine-tuning has the form: J(\\pi) = E_{x~D, y~\\pi}[R(x,y)] - \\beta \cdot KL(\\pi || \\pi_SFT). What is the purpose of the KL penalty, and what does \\beta control?",
      options: [
        "The KL penalty prevents the policy from becoming deterministic; \\beta controls entropy of the output distribution",
        "The KL penalty prevents reward hacking by keeping the policy close to the SFT reference model; \\beta controls the trade-off between reward maximization and staying close to the reference - high \\beta yields a conservative policy close to SFT, low \\beta allows more aggressive optimization that risks mode collapse or reward hacking",
        "The KL penalty encourages diversity of outputs; \\beta is a learning rate multiplier",
        "The KL penalty replaces the reward signal when human feedback is unavailable; \\beta scales the reward magnitude",
      ],
      correctAnswer: 1,
      explanation: "Without the KL penalty, PPO maximizes R(x,y) by exploiting flaws in the reward model - the policy finds outputs that score high under R but are not actually preferred by humans (reward hacking/model overoptimization). The KL penalty KL(\\pi || \\pi_SFT) = E_\\pi[log \\pi(y|x) - log \\pi_SFT(y|x)] keeps the fine-tuned policy close to the SFT baseline. High \\beta \\to policy barely moves from SFT (safe but limited improvement). Low \\beta \\to policy aggressively optimizes R, risking reward hacking. The optimal \\beta trades these off. Gao et al. (2022) showed that RL fine-tuning improvements peak at moderate KL distances before degrading.",
      hints: [
        "If \\beta=0, the policy freely maximizes R(x,y). What happens if the reward model has blind spots or errors?",
        "If \\beta is very large, the policy barely deviates from \\pi_SFT. Is this likely to achieve the alignment goals?",
      ],
    },
    {
      id: "q-rla-kp44-3",
      type: "true-false",
      difficulty: "medium",
      question: "Reward hacking in RLHF occurs when the language model finds outputs that achieve high scores under the learned reward model but are not actually preferred by humans - exploiting imperfections in the reward model.",
      correctAnswer: "true",
      explanation: "Reward hacking (also called reward model overoptimization) is a central challenge in RLHF: the reward model R(x,y) is an imperfect proxy for human preferences, trained on a finite set of comparisons. The RL fine-tuning process can find outputs that exploit the reward model's errors - long responses that artificially boost scores, repetitive patterns, or sycophantic text - while human evaluators would actually prefer simpler, more honest responses. Gao et al. (2022) empirically showed that as the KL divergence from the reference policy grows, RL performance first improves then degrades, following an 'alignment tax' curve.",
      hints: [
        "The reward model is a neural network trained on finite human preference data. Can a neural network be perfectly calibrated for all possible text outputs?",
        "If the policy discovers that very long responses always score high under R, but human evaluators actually prefer concise responses, what has happened?",
      ],
    },
  ],

  "rlhf-dpo": [
    {
      id: "q-rla-kp45-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Direct Preference Optimization (DPO, Rafailov et al., 2023) eliminates the separate reward model training phase of RLHF. What is the key mathematical insight that enables this?",
      options: [
        "DPO replaces pairwise comparisons with absolute ratings, making reward model training unnecessary",
        "The optimal RLHF policy $\pi^*$ has a closed-form expression as $\pi^*(y|x) \propto \pi_{\text{ref}}(y|x) \cdot \exp(R^*(x,y)/\beta)$. Inverting this gives $R^*(x,y) = \beta \cdot \log(\pi^*(y|x)/\pi_{\text{ref}}(y|x)) + const$. Substituting into the Bradley-Terry preference model yields a loss directly in terms of the policy $\pi$, bypassing reward model training.",
        "DPO uses model-based RL to simulate preference comparisons internally without human feedback",
        "DPO trains the reward model and policy simultaneously in a single optimization step",
      ],
      correctAnswer: 1,
      explanation: "The RLHF objective $J(\\pi) = \\mathbb{E}[R(x,y)] - \\beta \\cdot \\text{KL}(\\pi||\\pi_{\\text{ref}})$ has optimal solution $\\pi^* \\propto \\pi_{\\text{ref}} \\cdot \\exp(R^*/\\beta)$, giving $R^* = \\beta \\cdot \\log(\\pi^*/\\pi_{\\text{ref}}) + Z(x)$. Plugging into the Bradley-Terry preference model $P(y_w \\succ y_l) = \\sigma(R(x,y_w) - R(x,y_l))$, the reward difference becomes $\\beta \\cdot (\\log(\\pi^*/\\pi_{\\text{ref}})(y_w) - \\log(\\pi^*/\\pi_{\\text{ref}})(y_l))$. DPO directly minimizes\n\\[\n-\\log \\sigma\\big(\\beta \\cdot (\\log(\\pi_\\theta/\\pi_{\\text{ref}})(y_w) - \\log(\\pi_\\theta/\\pi_{\\text{ref}})(y_l))\\big)\n\\]\nover the policy $\\pi_\\theta$ — no separate reward model needed. DPO is simpler, more stable, and often matches or exceeds RLHF performance.",
      hints: [
        "The optimal RL policy satisfies \\pi* \\propto \pi_{\text{ref}} \cdot \exp(R/\beta). Can we express R in terms of \\pi* and \\pi_ref?",
        "If R appears in the preference model P(y_w > y_l), and R can be expressed in terms of \\pi, can we optimize \\pi directly on the preference data?",
      ],
    },
    {
      id: "q-rla-kp45-2",
      type: "true-false",
      difficulty: "easy",
      question: "RLHF with PPO requires sampling from the language model policy during fine-tuning (online), while DPO only requires a fixed offline dataset of preference pairs.",
      correctAnswer: "true",
      explanation: "RLHF with PPO is an online RL method: at each training step, the LLM generates new completions (samples from \\pi_\\theta), which are scored by the reward model, and PPO updates are computed. This requires inference during training, making it expensive. DPO is offline: the loss is computed entirely from a fixed dataset of (prompt, preferred, rejected) triples. No LLM inference is needed during training, only forward passes through the policy and reference model. This makes DPO 2-3x faster to train than PPO-based RLHF.",
      hints: [
        "PPO's policy gradient requires computing E_{y~\\pi_\\theta}[R(x,y)*\\nablalog \\pi_\\theta(y|x)]. Does this require sampling from \\pi_\\theta?",
        "DPO's loss $-\log \sigma(\beta \cdot (\log(\pi_\theta/\pi_{\text{ref}})(y_w) - \log(\pi_\theta/\pi_{\text{ref}})(y_l)))$ requires only forward passes through \pi_\theta and \pi_{\text{ref}}. Does this require sampling?",
      ],
    },
    {
      id: "q-rla-kp45-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In RLHF fine-tuning with PPO, the combined reward used for policy updates is typically $R_{\text{total}}(x,y) = R_{\text{model}}(x,y) - \beta \cdot \log(\\pi_\\theta(y|x) / \\pi_{\text{ref}}(y|x))$. Why is the log ratio term included per token rather than as a single episode-level penalty?",
      options: [
        "Per-token KL is easier to implement than episode-level KL",
        "Per-token KL provides a dense reward signal at each token, reducing the credit assignment problem. It keeps the per-step optimization well-defined and prevents degenerate length-based exploits (e.g., generating very long responses to dilute the KL penalty).",
        "Per-token KL prevents the policy from outputting the same token twice in a row",
        "Per-token KL replaces the need for a baseline in the PPO objective",
      ],
      correctAnswer: 1,
      explanation: "Text generation is a sequential decision process where each token is an 'action'. The KL penalty applied per-token gives a dense shaped reward signal at each step, substantially reducing the credit assignment problem (compared to a single terminal reward for the full response). It also prevents length exploitation: if KL were applied once at the sequence level, generating longer sequences would dilute the per-token penalty, incentivizing verbose responses. Per-token KL accumulates proportionally to sequence length, discouraging length-based reward hacking.",
      hints: [
        "Text generation produces one token at a time. What is the credit assignment challenge if the only reward is given at the end of the full response?",
        "If the KL penalty is applied once per full response as -\\beta*KL(\\pi||\\pi_ref), what incentive does the policy have regarding response length?",
      ],
    },
  ],

  "sim-to-real-transfer": [
    {
      id: "q-rla-kp46-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Domain randomization is a key technique for sim-to-real transfer in robotic RL. What is the core idea, and why does it work?",
      options: [
        "The robot is trained in many different real-world environments to generalize across domains",
        "During simulation training, physical parameters (friction, mass, actuator delays, sensor noise) are randomized across a wide range. This forces the policy to learn behaviors that work across many possible environments, hopefully including the real world - which is treated as just another draw from the randomization distribution.",
        "The simulation is made photorealistic by rendering high-quality images, reducing the visual domain gap",
        "The robot is trained with a fixed simulator that exactly matches the real world by careful calibration",
      ],
      correctAnswer: 1,
      explanation: "Domain randomization (Tobin et al., 2017; OpenAI dexterous manipulation) randomizes simulator parameters - friction coefficients, link masses, motor constants, camera positions, lighting - during training. The policy must succeed across all these configurations. If the real world's parameters fall within the randomization range (or can be extrapolated from it), the policy should generalize. This is the 'sim-to-real' success story behind policies trained in simulation that transfer zero-shot to physical robots, avoiding the cost and danger of real-world RL training.",
      hints: [
        "If the policy must work for many different friction values during training, what kind of policy does it learn?",
        "The real world has some specific (unknown) physical parameters. If those parameters are within the training randomization range, what should happen at test time?",
      ],
    },
    {
      id: "q-rla-kp46-2",
      type: "true-false",
      difficulty: "easy",
      question: "The reality gap in sim-to-real transfer refers to the mismatch between simulation physics and the real world, which can cause policies trained in simulation to fail when deployed on physical robots.",
      correctAnswer: "true",
      explanation: "The reality gap encompasses multiple sources of mismatch: (1) physics fidelity - simulators cannot perfectly model contact dynamics, deformable objects, or fluid; (2) actuation - real motors have delays, backlash, and nonlinear responses that differ from ideal actuators; (3) perception - real sensor noise, lighting variations, and camera characteristics differ from simulation; (4) unmodeled dynamics - wear, temperature effects, and environmental disturbances. Techniques to address the gap include domain randomization, system identification (calibrating the simulator to match real data), and domain adaptation (fine-tuning on limited real data).",
      hints: [
        "Can any physics simulator perfectly replicate the friction behavior between a robot's rubber gripper and an irregular wooden block?",
        "Name two sources of mismatch between simulation and reality that could cause a sim-trained walking policy to fail on a real robot.",
      ],
    },
    {
      id: "q-rla-kp46-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Adaptive domain randomization methods like Automatic Domain Randomization (ADR, OpenAI, 2019) adapt the randomization range during training. What criterion does ADR use to adjust the randomization distribution?",
      options: [
        "ADR increases randomization range whenever the training loss decreases below a threshold",
        "ADR monitors the policy's performance on held-out evaluation environments and expands (or contracts) the randomization range for each parameter based on whether the policy's success rate on boundary cases exceeds (or falls below) a target threshold, automatically curriculum-training on increasing difficulty",
        "ADR uses a separate adversarial network to propose the hardest possible environment configurations",
        "ADR randomizes more parameters when the policy's gradient variance is low, indicating overfit to a narrow distribution",
      ],
      correctAnswer: 1,
      explanation: "Automatic Domain Randomization (OpenAI, 2019, used for Dactyl dexterous manipulation) maintains lower and upper bounds for each randomized parameter. Performance-triggered expansion: if the policy succeeds on the current boundary configurations (easy end of the range), the bound expands further (making training harder). If the policy fails, the bound contracts. This creates an automatic curriculum that progressively challenges the policy with harder and more varied physics, enabling training on extremely diverse environments without manual curriculum design.",
      hints: [
        "ADR expands randomization range when the policy is doing well on the hardest current configurations. What does this achieve over time?",
        "ADR contracts the range when the policy fails. Why might this be necessary for stable training?",
      ],
    },
  ],

  "reward-shaping-pitfalls": [
    {
      id: "q-rla-kp47-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Potential-based reward shaping (Ng, Harada & Russell, 1999) guarantees that the shaped reward F(s,a,s') = \\gamma\\Phi(s') - \\Phi(s) preserves the optimal policy. What does 'preserves the optimal policy' mean precisely?",
      options: [
        "The shaped reward makes training faster by providing denser rewards",
        "Any policy that is optimal under the shaped reward R' = R + F is also optimal under the original reward R, and vice versa. The value function transforms as V^{\\pi,R'} = V^{\\pi,R} + \\Phi, so ranking of policies is unchanged.",
        "The agent will eventually learn the correct behavior regardless of the potential function \\Phi",
        "The shaped reward makes the MDP easier to solve because it reduces the episode length",
      ],
      correctAnswer: 1,
      explanation: "With potential-based shaping F = \\gamma\\Phi(s') - \\Phi(s), the Q-function under the shaped reward satisfies Q^{\\pi,R'} = Q^{\\pi,R} + \\Phi(s) (adjusting for the state value). Since all policies' Q-values shift by the same state-dependent term \\Phi(s), the ordering of policies is unchanged - the optimal policy under R' is identical to the optimal policy under R. This is the key theorem: potential-based shaping is the ONLY form of reward shaping guaranteed to preserve optimality (Ng et al., 1999). Non-potential-based shaping can create suboptimal fixed points.",
      hints: [
        "If Q^{\\pi,R'}(s,a) = Q^{\\pi,R}(s,a) + \\Phi(s) for all policies \\pi, can the ranking of policies by their Q-values change?",
        "\\Phi(s) is a constant with respect to action selection. Does adding a state-dependent (but action-independent) constant to all Q-values change which action maximizes Q?",
      ],
    },
    {
      id: "q-rla-kp47-2",
      type: "true-false",
      difficulty: "medium",
      question: "Adding a reward of +1 for every timestep the agent stays alive in a navigation task (to encourage longer episodes) is a safe form of reward shaping that will not change the optimal policy.",
      correctAnswer: "false",
      explanation: "A constant +1 reward per timestep is NOT potential-based (it cannot be written as \\gamma\\Phi(s') - \\Phi(s) for any \\Phi unless \\gamma=1 and \\Phi=const). This changes the optimal policy: the agent now prefers longer episodes, potentially learning to delay reaching the goal or to wander aimlessly (reward hacking). This is a classic example of a misspecified reward shaping that causes the policy to optimize the shaped reward instead of the true objective. In contrast, the potential-based shaping -\\Phi(s) + \\Phi(s') encourages progress without incentivizing delay.",
      hints: [
        "Can the constant reward +1 be written as \\gamma\\Phi(s') - \\Phi(s) for some function \\Phi? Try \\Phi(s) = c for all s.",
        "If the agent gets +1 for every step alive, does it want to reach the goal quickly or slowly?",
      ],
    },
    {
      id: "q-rla-kp47-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In the boat racing game example (Amodei et al., 2016), an RL agent trained to maximize score discovered it could get more reward by spinning in circles collecting bonuses repeatedly rather than completing the race. What type of problem does this illustrate?",
      options: [
        "Reward hacking: the agent found a policy that maximizes the specified reward function but violates the designer's intent, exploiting the gap between the formal reward specification and the true objective",
        "Reward shaping gone wrong: the bonus items were an unintentional potential-based shaping term",
        "Exploration collapse: the agent converged to a local optimum due to insufficient exploration",
        "Credit assignment failure: the agent could not connect the bonus rewards to the race completion goal",
      ],
      correctAnswer: 0,
      explanation: "The boat racing example illustrates reward hacking (Amodei et al., 2016): the specified reward was 'game score,' which included points for hitting bonus items. The agent discovered that repeatedly hitting the same bonuses by spinning in a loop maximized the specified score better than completing the race - the designer's intent. This is a reward misspecification problem: the formal reward R(s,a) does not fully capture the true objective. Solutions include: more comprehensive reward specification, constrained RL with safety constraints, inverse RL learning from human demonstrations, or RLHF to ground rewards in human preferences.",
      hints: [
        "The agent's behavior (spinning in circles) maximizes the formal reward function. Does it satisfy the designer's intent?",
        "Was the reward function poorly specified, or did the agent fail to learn? What does this say about the difficulty of reward engineering?",
      ],
    },
  ],

  "safety-constraints-deployment": [
    {
      id: "q-rla-kp48-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Control Barrier Functions (CBFs) are used as safety filters in deployed RL systems. How does a CBF safety filter modify the RL policy's actions at execution time?",
      options: [
        "It selects a completely different action from a pre-programmed safe action set whenever the RL policy selects an unsafe action",
        "It solves a quadratic program (QP) that finds the minimum-norm modification to the RL policy's action a_RL that keeps the system within a provably safe set, defined as h(s) \\geq 0 where h is the barrier function",
        "It scales down the RL policy's action magnitude whenever the agent is near a constraint boundary",
        "It switches between the RL policy and a human teleoperator when approaching unsafe states",
      ],
      correctAnswer: 1,
      explanation: "A CBF safety filter solves: min_a ||a - a_RL||^2 subject to \\partialh/\\partials * f(s,a) + \\alpha(h(s)) \\geq 0 (the CBF condition ensuring h(s) stays \\geq 0 forward in time). This is a convex QP solvable in real-time. The key properties: (1) it is minimally invasive - only modifies actions when necessary to maintain safety; (2) it provides hard safety guarantees - the system is provably confined to the safe set; (3) it is independent of the RL policy - the RL policy can be arbitrary as long as the CBF filter is applied. This decouples the RL performance objective from the safety requirement.",
      hints: [
        "The CBF filter solves a minimum-norm problem: find the closest safe action to a_RL. What does 'closest' mean here?",
        "The CBF condition \\partialh/\\partials * f(s,a) + \\alpha(h(s)) \\geq 0 ensures h remains nonneg. If h(s)=0 (at the boundary), what does this condition require?",
      ],
    },
    {
      id: "q-rla-kp48-2",
      type: "true-false",
      difficulty: "easy",
      question: "Constrained Policy Optimization (CPO, Achiam et al., 2017) guarantees monotone policy improvement on the reward objective while satisfying safety constraints at every policy update.",
      correctAnswer: "true",
      explanation: "CPO (Achiam et al., 2017) is a policy optimization algorithm that provides theoretical guarantees for both reward improvement and constraint satisfaction at each update step (similar to TRPO's reward improvement guarantee but extended to CMDPs). It achieves this by solving a constrained optimization problem with a trust region and analytical approximations of the constraint functions using the cost advantage. While these are first-order approximations and may occasionally be violated due to approximation errors, CPO provides the strongest available guarantees for safe policy optimization with constraints.",
      hints: [
        "TRPO guarantees monotone improvement without constraints. How does CPO extend this to include safety constraints?",
        "CPO uses the same trust region approach as TRPO but adds constraint terms. What does the trust region ensure?",
      ],
    },
    {
      id: "q-rla-kp48-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Lagrangian methods for constrained RL convert the CMDP into an unconstrained problem. A key challenge in practice is the choice of the Lagrange multiplier update rule. Which approach is most stable?",
      options: [
        "Set \\lambda to a large fixed constant to ensure constraints are always satisfied",
        "Update \\lambda using dual gradient ascent: \\lambda_{k+1} = \max(0, \\lambda_k + \\alpha_\\lambda * (E[C(\\pi)] - d)), where the step size \\alpha_\\lambda is tuned to balance constraint violation speed against policy update speed",
        "Update \\lambda only after the policy has fully converged to ensure a stable target",
        "Use \\lambda=0 during early training and increase it linearly after the policy becomes competent",
      ],
      correctAnswer: 1,
      explanation: "Dual gradient ascent (also called primal-dual optimization) updates the multiplier \\lambda in the direction of increasing constraint violation: \\lambda increases when E[C(\\pi)] > d (constraint violated) and decreases otherwise (clamped at 0). The step size \\alpha_\\lambda critically controls stability: too large \\to \\lambda oscillates wildly, causing unstable policy updates; too small \\to constraint violations persist for too long before \\lambda responds. In practice, separate learning rates for the policy (primal) and multipliers (dual) are tuned carefully. Recent work (Ray et al., 2019 Safety Gym) showed that simple Lagrangian methods work well when both are tuned appropriately.",
      hints: [
        "\\lambda increases when the constraint is violated and decreases when it is satisfied. What happens if \\alpha_\\lambda is very large?",
        "If the policy update step size and the multiplier update step size are mismatched, can the joint optimization still converge?",
      ],
    },
  ],
};
Object.assign(questions, extra2);

const extra3: Record<string, Question[]> = {
  "marl-nash-equilibrium": [
    {
      id: "q-rla-kp49-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In two-player zero-sum games, the Nash equilibrium policy for each player is a minimax strategy. Why does independent Q-learning (each agent treats others as part of the environment) fail to converge to Nash equilibrium in general?",
      options: [
        "Independent Q-learning uses too high a learning rate for multi-agent settings",
        "From each agent's perspective, the environment is non-stationary because other agents are learning simultaneously. This violates Q-learning's convergence assumption of a stationary MDP, causing Q-values to oscillate and potentially not converge to the Nash equilibrium.",
        "Independent Q-learning only works for cooperative settings, not zero-sum games",
        "Independent Q-learning requires more replay buffer capacity than is practical for multi-agent settings",
      ],
      correctAnswer: 1,
      explanation: "Q-learning convergence proofs assume a stationary MDP. In MARL with independent learning, each agent i sees transitions that depend on other agents' policies, which change as they learn. This creates a moving target problem: the optimal Q_i depends on other agents' current policies, which themselves evolve during training. In zero-sum games, this often leads to cycling rather than convergence to Nash. Algorithms like Nash Q-learning (Hu & Wellman, 2003) compute Nash equilibria explicitly at each step, while minimax Q-learning is provably convergent for two-player zero-sum matrix games.",
      hints: [
        "From agent 1's perspective, agent 2's actions are part of the environment's transition function. If agent 2's policy changes over time, what happens to the MDP seen by agent 1?",
        "Q-learning requires the MDP to be stationary - same transition probabilities throughout. Is this satisfied when other agents are simultaneously learning?",
      ],
    },
    {
      id: "q-rla-kp49-2",
      type: "true-false",
      difficulty: "medium",
      question: "In cooperative MARL, achieving global optimality is generally harder than in single-agent RL because the joint action space grows exponentially with the number of agents.",
      correctAnswer: "true",
      explanation: "In cooperative MARL with n agents each having |A| actions, the joint action space has |A|^n elements. Computing the joint Q-function Q(s, a_1, ..., a_n) and finding \argmax over the joint space is exponential in n. This is why value decomposition methods (VDN, QMIX, QPLEX) factorize the joint Q-function into individual contributions that can be maximized independently (the IGM condition). Even with factorization, representing and learning from the exponentially large joint state-action space remains a fundamental challenge in cooperative MARL.",
      hints: [
        "With 10 agents each having 5 actions, how large is the joint action space?",
        "If we can factorize Q_tot = f(Q_1,...,Q_n) where each agent maximizes Q_i independently, how does the complexity scale?",
      ],
    },
    {
      id: "q-rla-kp49-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Emergent communication in cooperative MARL occurs when agents learn to use a communication channel to coordinate without pre-programmed communication protocols. What is the primary challenge in learning emergent communication?",
      options: [
        "The communication channel has limited bandwidth, preventing agents from sharing full state information",
        "Communication actions are discrete (e.g., symbols), making the communication protocol non-differentiable and requiring techniques like straight-through estimators or Gumbel-softmax to enable end-to-end gradient training",
        "Agents cannot learn to communicate unless they share a common reward function",
        "Communication increases the dimensionality of the observation space, causing the curse of dimensionality",
      ],
      correctAnswer: 1,
      explanation: "Learning emergent communication end-to-end requires gradients to flow through discrete message symbols. Since \argmax(logits) is non-differentiable, methods like DIAL (Foerster et al., 2016) use continuous relaxations during training (Gumbel-softmax or straight-through estimators). CommNet (Sukhbaatar et al., 2016) uses continuous communication vectors and differentiable pooling. The core challenge: discrete communication is naturally discrete (language uses symbols), but gradient-based training requires differentiability. This creates a tension between expressivity and trainability.",
      hints: [
        "If agents communicate using discrete symbols (e.g., one of 10 messages), why can't standard backpropagation compute gradients through message selection?",
        "Gumbel-softmax and straight-through estimators provide approximate gradients for discrete choices. What problem do they solve?",
      ],
    },
  ],

  "rlhf-advanced-topics": [
    {
      id: "q-rla-kp50-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Constitutional AI (CAI, Anthropic, 2022) modifies RLHF by using the model to generate its own preference labels rather than human annotators. What is the core mechanism?",
      options: [
        "CAI trains the reward model using a pre-specified constitution of values written by Anthropic engineers",
        "CAI uses the AI model itself to critique and revise its own outputs according to a set of principles (the 'constitution'), then trains a preference model on AI-generated preference labels (AI Feedback), reducing reliance on human labelers for harmlessness training",
        "CAI replaces the reward model with a rule-based system that checks outputs against explicit rules",
        "CAI uses the model's own log-probabilities as a reward signal, bypassing the need for any external reward model",
      ],
      correctAnswer: 1,
      explanation: "Constitutional AI (CAI) has two phases: (1) SL-CAI: generate responses, use the model to critique and revise them according to a written constitution (e.g., 'be helpful, harmless, and honest'), then train on the revised responses; (2) RL-CAI: generate pairs of responses, use the model to choose which better satisfies the constitutional principles, then train a reward model (preference model) on these AI-generated labels (RLAIF - RL from AI Feedback). This scales harmlessness training without requiring human labelers for every sensitive topic, while still grounding behavior in human-written principles.",
      hints: [
        "Human labelers are expensive and may be uncomfortable judging very harmful content. How does CAI reduce reliance on human labelers for these cases?",
        "The 'constitution' is a list of principles written by humans. How does the model use these principles to generate training signal?",
      ],
    },
    {
      id: "q-rla-kp50-2",
      type: "true-false",
      difficulty: "medium",
      question: "Group Relative Policy Optimization (GRPO, DeepSeek, 2024) eliminates the need for a separate critic/value network by computing advantages relative to a group of sampled responses for the same prompt.",
      correctAnswer: "true",
      explanation: "GRPO (used in DeepSeek-R1) samples G responses {y_1, ..., y_G} for each prompt x, computes rewards {r_1, ..., r_G} from a reward model, and normalizes: A_i = (r_i - mean(r)) / std(r). This group-relative advantage eliminates the critic network entirely - no separate value function is learned. The policy is updated with a clipped importance ratio (like PPO) using these normalized advantages. GRPO is simpler and more memory-efficient than PPO-based RLHF (no critic forward/backward pass) and showed strong performance for training reasoning models on math and coding tasks.",
      hints: [
        "PPO requires a value network V(s) to estimate baselines. Does GRPO need a value network?",
        "If 5 responses have rewards [0.8, 0.3, 0.9, 0.2, 0.5], what are the group-relative advantages? Which response gets the highest advantage?",
      ],
    },
    {
      id: "q-rla-kp50-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Process Reward Models (PRMs) vs. Outcome Reward Models (ORMs) represent two approaches to rewarding LLM reasoning chains. What is the key difference and when is each preferred?",
      options: [
        "PRMs reward individual reasoning steps; ORMs reward only the final answer. PRMs are preferred when intermediate reasoning can be verified (e.g., math proofs) because they provide denser feedback and can identify where errors occur. ORMs are simpler to implement but suffer from sparse rewards and cannot penalize faulty reasoning that reaches correct answers by chance.",
        "PRMs use process supervision (human labelers check each step); ORMs use automated evaluation. PRMs are always preferred because human supervision is more accurate.",
        "PRMs reward exploration during search; ORMs reward exploitation. PRMs are preferred for MCTS-based search, ORMs for greedy decoding.",
        "PRMs and ORMs are identical in reward signal; the difference is only in network architecture.",
      ],
      correctAnswer: 0,
      explanation: "Outcome Reward Models (ORMs) assign a single reward to the final answer (e.g., correct/incorrect), providing sparse feedback. Process Reward Models (PRMs, Lightman et al., 2023 'Let's Verify Step by Step') assign rewards to each reasoning step, providing dense feedback. PRMs enable fine-grained credit assignment - an error in step 3 of a 10-step proof is caught immediately rather than attributed only at the end. They also allow Best-of-N reranking and MCTS-guided search to select high-quality intermediate steps. However, PRMs require expensive human labeling of intermediate steps or automatic verification. ORMs scale more easily but incentivize any path to the correct answer, including lucky guesses.",
      hints: [
        "If a model gets the right final answer through incorrect reasoning, how does an ORM respond? How does a PRM respond?",
        "Dense reward signals at each step reduce which fundamental RL challenge in long-horizon tasks?",
      ],
    },
  ],
};
Object.assign(questions, extra3);

export default questions;
registerQuestions(questions);
