import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "gradient-descent-variants": [
    {
      id: "q-opt-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SGD with mini-batches differs from full-batch (batch) gradient descent primarily in that:",
      options: [
        "Using a different loss function for each parameter update",
        "Computing gradient estimates on a random subset of examples, introducing noise that can aid generalization",
        "Applying a momentum term to smooth gradient updates",
        "Adapting the learning rate separately for each parameter",
      ],
      correctAnswer: 1,
      explanation:
        "Mini-batch SGD estimates the true gradient from a small random subset (mini-batch) of the training data, rather than the full dataset.\n\n" +
        "Given a loss function \\(L(\\theta) = \\frac{1}{n}\\sum_{i=1}^{n} \\ell_i(\\theta)\\), full-batch gradient descent computes:\n" +
        "\\[\\nabla L(\\theta) = \\frac{1}{n}\\sum_{i=1}^{n} \\nabla\\ell_i(\\theta)\\]\n\n" +
        "Mini-batch SGD approximates this with:\n" +
        "\\[\\nabla L_B(\\theta) = \\frac{1}{|B|}\\sum_{i \\in B} \\nabla\\ell_i(\\theta)\\]\n\n" +
        "where \\(B\\) is a randomly sampled mini-batch of examples. This introduces gradient noise (variance \\(\\propto 1/\\sqrt{|B|}\\) ) that acts as implicit regularization, helping the model generalize better. Additionally, since only \\(|B| \\ll n\\) examples are needed per step, datasets that are too large to fit in memory can be processed efficiently.",
      hints: [
        "Full-batch gradient descent computes the exact gradient using ALL n examples per step — what are the drawbacks of this?",
        'The word "stochastic" refers to the randomness from sampling a mini-batch at each step.',
      ],
    },
    {
      id: "q-opt-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Momentum in gradient descent helps accelerate optimization by accumulating a velocity vector in directions of persistent gradient.",
      correctAnswer: "True",
      explanation:
        "Standard gradient descent updates parameters as:\n" +
        "\\[\\theta_{t+1} = \\theta_t - \\eta \\nabla L(\\theta_t)\\]\n\n" +
        "Momentum accumulates a velocity vector \\(v_t\\):\n" +
        "\\[v_t = \\beta v_{t-1} + (1-\\beta)\\nabla L(\\theta_t)\\]\n" +
        "\\[\\theta_{t+1} = \\theta_t - \\eta v_t\\]\n\n" +
        "where \\(0 \\le \\beta < 1\\) is the momentum coefficient (typically \\(\\beta = 0.9\\)).\n\n" +
        "In directions of persistent gradient (e.g., a steady downhill slope), the velocity accumulates, causing the optimizer to accelerate. In directions where gradients oscillate (change sign frequently), positive and negative contributions to \\(v_t\\) partially cancel, dampening oscillations.\n\n" +
        "This is analogous to a ball rolling down a hilly surface: it builds up speed in consistent directions while smoothing out erratic movements.",
      hints: [
        "Think of momentum as a ball rolling downhill — it picks up speed in the direction of descent.",
        "When gradients oscillate back and forth, momentum causes them to cancel out; when they consistently point the same direction, momentum causes them to add up.",
      ],
    },
    {
      id: "q-opt-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Nesterov Accelerated Gradient (NAG) improves upon standard momentum by:",
      options: [
        "Using a separate momentum coefficient for each layer of the network",
        "Computing the gradient at the anticipated future position rather than the current position",
        "Decaying the momentum coefficient linearly over training",
        "Combining momentum with an adaptive learning rate per parameter",
      ],
      correctAnswer: 1,
      explanation:
        "Classical momentum computes the gradient at the current position \\(\\theta_t\\) and then applies the momentum update:\n" +
        "\\[v_t = \\beta v_{t-1} + \\nabla L(\\theta_t)\\]\n" +
        "\\[\\theta_{t+1} = \\theta_t - \\eta v_t\\]\n\n" +
        "Nesterov Accelerated Gradient (NAG) evaluates the gradient at the anticipated future position \\(\\theta_t + \\gamma v_t\\) instead:\n" +
        "\\[v_t = \\beta v_{t-1} + \\nabla L(\\theta_t + \\gamma v_t)\\]\n" +
        "\\[\\theta_{t+1} = \\theta_t - \\eta v_t\\]\n\n" +
        "where \\(\\gamma = \\beta\\) is the momentum coefficient.\n\n" +
        "This 'lookahead' gradient is corrective: it measures how the gradient will change after the momentum step, reducing overshoot and oscillation compared to classical momentum.\n\n" +
        "\\[\\begin{align}" +
        "\\theta_{t+1} &= \\theta_t - \\eta \\nabla L(\\theta_t + \\beta v_t) - \\eta \\beta v_t\\" +
        "\\end{align}\\]\n\n" +
        "The second term (\\( -\\eta \\beta v_t \\)) is a correction that dampens the momentum when the gradient is increasing.",
      hints: [
        "Standard momentum evaluates the gradient at \\(\\theta_t\\); NAG evaluates it at \\(\\theta_t + \\beta v_t\\) — the position momentum will carry you to.",
        "If you already know the momentum will move you forward, why not look ahead from that future position to compute the gradient?",
      ],
    },
  ],

  "adam-family": [
    {
      id: "q-opt-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Adam combines which two ideas from prior optimizers?",
      options: [
        "Momentum and per-parameter adaptive learning rates (based on second moment of gradients)",
        "Nesterov lookahead and gradient clipping",
        "Weight decay and cosine annealing",
        "Second-order curvature information and mini-batch variance reduction",
      ],
      correctAnswer: 0,
      explanation:
        "Adam (Adaptive Moment Estimation) combines two key ideas from prior optimizers:\n\n" +
        "1. **First moment (from momentum):** Maintains an exponential moving average of gradients:\n" +
        "\\[m_t = \\beta_1 m_{t-1} + (1-\\beta_1) g_t\\]\n\n" +
        "2. **Second moment (from RMSProp/AdaGrad):** Maintains an exponential moving average of squared gradients:\n" +
        "\\[v_t = \\beta_2 v_{t-1} + (1-\\beta_2) g_t^2\\]\n\n" +
        "where \\(g_t = \\nabla L(\\theta_t)\\) is the gradient at step \\(t\\).\n\n" +
        "Bias correction is applied because \\(m_0 = v_0 = 0\\) causes estimates to be biased toward zero early in training:\n" +
        "\\[\\hat{m}_t = \\frac{m_t}{1-\\beta_1^t}, \\qquad \\hat{v}_t = \\frac{v_t}{1-\\beta_2^t}\\]\n\n" +
        "The parameter update is:\n" +
        "\\[\\theta_{t+1} = \\theta_t - \\frac{\\eta}{\\sqrt{\\hat{v}_t} + \\epsilon} \\hat{m}_t\\]\n\n" +
        "This adapts the learning rate per parameter: \\(\\hat{m}_t\\) provides the direction (like momentum), while \\(\\sqrt{\\hat{v}_t}\\) inversely scales the step size (dividing out the gradient magnitude).",
      hints: [
        "Adam = Adaptive Moment Estimation — what are the two moments it estimates?",
        "Think of Adam as combining momentum (1st moment) with RMSProp (2nd moment).",
      ],
    },
    {
      id: "q-opt-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AdamW fixes Adam\'s weight decay implementation by decoupling weight decay from the gradient update, applying it directly to the weights rather than including it in the gradient.",
      correctAnswer: "True",
      explanation:
        "In standard Adam with L2 regularization, the weight decay term \\(\\lambda \\theta\\) is added to the gradient:\n" +
        "\\[g_t = \\nabla L(\\theta_t) + \\lambda \\theta_t\\]\n\n" +
        "The adaptive update divides by \\(\\sqrt{v_t}\\):\n" +
        "\\[\\theta_{t+1} = \\theta_t - \\frac{\\eta}{\\sqrt{v_t}} (\\nabla L(\\theta_t) + \\lambda \\theta_t)\\]\n\n" +
        "The problem: parameters with small historical gradients (rarely-activated features) have small \\(v_t\\), so the \\(\\lambda\\theta_t\\) term gets amplified. Parameters with large \\(v_t\\) have their regularization weakened. The effective regularization strength varies unpredictably.\n\n" +
        "AdamW (Decoupled Weight Decay) applies weight decay directly after the gradient step:\n" +
        "\\[\\theta_{t+1} = (1 - \\eta \\lambda) \\theta_t - \\frac{\\eta}{\\sqrt{v_t}} m_t\\]\n\n" +
        "This ensures the regularization strength \\(\\lambda\\) is independent of the adaptive learning rate, giving consistent regularization across all parameters.",
      hints: [
        "In Adam with L2, the weight decay term gets divided by \\(\\sqrt{v_t}\\) — so parameters with small \\(v_t\\) get over-regularized, and those with large \\(v_t\\) get under-regularized.",
        "AdamW applies weight decay separately from the gradient update, so regularization strength is uniform across all parameters.",
      ],
    },
    {
      id: "q-opt-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "AdaGrad is well-suited for sparse features but poorly suited for deep learning because:",
      options: [
        "It does not maintain momentum and therefore converges too slowly",
        "Its accumulated squared gradients grow monotonically, causing the effective learning rate to shrink to zero over long training",
        "It requires more memory than Adam because it maintains per-parameter full curvature matrices",
        "It cannot handle mini-batch gradient estimates and requires full-batch gradients",
      ],
      correctAnswer: 1,
      explanation:
        "AdaGrad divides each parameter\'s gradient by the square root of the sum of all historical squared gradients; this sum only grows, eventually making learning rates negligibly small — RMSProp and Adam fix this by using exponential moving averages instead.",
      hints: [
        "AdaGrad\'s accumulated second moment is a sum, not an exponential moving average — what happens to a sum that grows forever?",
        "Think about why a decaying average (RMSProp) solves this problem.",
      ],
    },
  ],

  "lion-optimizer": [
    {
      id: "q-opt-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Lion optimizer (EvoLved Sign Momentum) is distinguished from Adam by:",
      options: [
        "Using second-order curvature information like K-FAC",
        "Applying only the sign of the momentum update as the gradient step, with a fixed step size per parameter",
        "Combining evolutionary strategies with gradient descent for global optimization",
        "Adapting the learning rate using the ratio of gradient to gradient history norm",
      ],
      correctAnswer: 1,
      explanation:
        "Lion updates parameters using sign(β₁m + (1-β₁)g), where m is momentum and g is the gradient — taking a fixed-magnitude step in the sign direction of the momentum-adjusted gradient, requiring no second-moment memory and using less memory than Adam.",
      hints: [
        "The update sign(·) collapses the gradient magnitude to ±1 — what does that imply about step sizes?",
        "Lion uses less memory than Adam because it tracks only one moment (the gradient history), not two.",
      ],
    },
    {
      id: "q-opt-kp3-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Sophia (Second-Order Clipped Stochastic Optimization) uses an approximation of the diagonal Hessian to scale gradient updates.",
      correctAnswer: "True",
      explanation:
        "Sophia periodically estimates the diagonal of the Hessian (using Hutchinson\'s estimator or Gauss-Newton) and clips the gradient divided by this curvature estimate, providing a second-order-informed adaptive scaling more efficient than full K-FAC.",
      hints: [
        "Second-order methods use curvature (Hessian) information — what does the diagonal Hessian tell you?",
        "Sophia is more memory-efficient than full second-order methods because it uses only the diagonal.",
      ],
    },
    {
      id: "q-opt-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Lion was discovered using which methodology, making it an example of "optimizer search"?',
      options: [
        "Theoretical derivation from the natural gradient framework",
        "Automated search over optimizer update rules using a program search with evolutionary strategies on proxy tasks",
        "Hyperparameter tuning of Adam with a Bayesian optimization framework",
        "Manual derivation inspired by the sign gradient descent literature",
      ],
      correctAnswer: 1,
      explanation:
        "Lion was discovered by searching over a symbolic space of optimizer update rules (combinations of standard operations like sign, clip, momentum) using evolutionary architecture search evaluated on proxy training tasks — an example of learned optimizers via program synthesis.",
      hints: [
        'The name "EvoLved Sign Momentum" hints at the discovery method — "Evo" for evolutionary search.',
        "Think about how NAS for models inspired searching for optimizers using similar automated methods.",
      ],
    },
  ],

  "learning-rate-warmup": [
    {
      id: "q-opt-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Learning rate warmup at the beginning of training is used primarily to:",
      options: [
        "Increase the effective batch size without using more memory",
        "Avoid large gradient updates before the optimizer\'s second moment estimates have stabilized",
        "Reduce overfitting by starting with a conservative learning rate",
        "Synchronize learning rates across multiple GPUs in distributed training",
      ],
      correctAnswer: 1,
      explanation:
        "Early in training, Adam\'s second-moment estimates are unreliable (biased toward zero even after bias correction), causing overly large updates; warmup keeps the learning rate low during this initialization period until the estimates stabilize.",
      hints: [
        "Early Adam steps have small second-moment accumulators — what happens when you divide by a small number?",
        "Warmup gives the optimizer time to gather reliable statistics before taking large steps.",
      ],
    },
    {
      id: "q-opt-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Cosine annealing schedules the learning rate to smoothly decrease from its maximum to near zero following a cosine curve, with no restarts.",
      correctAnswer: "False",
      explanation:
        "Basic cosine annealing (without restarts) follows a single cosine decay, but SGDR (Cosine Annealing with Warm Restarts) periodically resets the learning rate back to its maximum, allowing the optimizer to escape local minima and explore.",
      hints: [
        'Loshchilov & Hutter proposed SGDR — what does the "R" for Restarts add to basic cosine annealing?',
        "A single cosine decay is monotonically decreasing — restarts are not monotonic.",
      ],
    },
    {
      id: "q-opt-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The theoretical motivation for using learning rate warmup in Transformer training (as in "Attention Is All You Need") is based on:',
      options: [
        "Ensuring that gradients do not explode through the deep residual connections during initial steps",
        "Counteracting the high variance of gradient estimates early in training when the model is randomly initialized",
        "Matching the learning rate schedule derived from the inverse square root of the model dimension",
        "Satisfying convergence conditions that require the learning rate to be proportional to batch size",
      ],
      correctAnswer: 1,
      explanation:
        "At random initialization, gradient variance is high across all parameters; warmup allows early gradient estimates to average out before the model commits to large updates, and the original Transformer paper schedules lr as d_model^(-0.5) × min(step^(-0.5), step × warmup_steps^(-1.5)).",
      hints: [
        "Random initialization means the loss landscape is unexplored — why is high learning rate risky at this point?",
        "The Transformer paper\'s formula increases lr linearly then decreases it as inverse square root — when does the maximum occur?",
      ],
    },
  ],

  "lr-finders": [
    {
      id: "q-opt-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The LR Range Test (Smith, 2015) finds a good learning rate by:",
      options: [
        "Training multiple models with fixed learning rates and selecting the best on validation",
        "Linearly increasing the learning rate over a short training run and plotting loss vs. learning rate",
        "Using Bayesian optimization to search the learning rate space",
        "Computing the optimal learning rate analytically from the loss Hessian",
      ],
      correctAnswer: 1,
      explanation:
        "The LR Range Test trains the model for a few iterations with an exponentially or linearly increasing learning rate, plots the training loss, and recommends a learning rate in the steep downward slope — just before the loss diverges.",
      hints: [
        'The test is a short "probe" run, not a full training — what does it reveal about the loss landscape?',
        "Look for the steepest drop in the loss curve — that region is where the learning rate is most effective.",
      ],
    },
    {
      id: "q-opt-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Cyclical Learning Rates (CLR) alternate the learning rate between a minimum and maximum bound, which can allow the model to escape local minima and saddle points.",
      correctAnswer: "True",
      explanation:
        "CLR periodically increases the learning rate (even during training), which can temporarily cause loss to increase but allows the optimizer to escape sharp minima and saddle points, often leading to better final performance than monotonic decay.",
      hints: [
        "A fixed low learning rate converges to whatever minimum it finds — can it get out if that minimum is bad?",
        "Higher learning rates encourage exploration; lower learning rates encourage exploitation (convergence).",
      ],
    },
    {
      id: "q-opt-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "One-Cycle Learning Rate policy (Super-Convergence) achieves faster training by:",
      options: [
        "Using a constant high learning rate throughout training",
        "Warming up the learning rate to a maximum then annealing it to near zero in a single cycle, combined with simultaneous momentum annealing",
        "Cycling the learning rate while keeping batch size constant across training",
        "Using separate learning rate cycles for each layer group in the network",
      ],
      correctAnswer: 1,
      explanation:
        "The 1-cycle policy linearly warms up the learning rate to its maximum over ~30% of training, then anneals it to near zero while simultaneously reversing the momentum schedule — the combination enables training in far fewer epochs (super-convergence).",
      hints: [
        "Super-convergence involves one single cycle, not many small cycles like CLR.",
        "Note that momentum is also scheduled inversely to the learning rate — high LR + low momentum stabilizes training.",
      ],
    },
  ],

  "second-order-opt": [
    {
      id: "q-opt-kp6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The natural gradient differs from the standard gradient by:",
      options: [
        "Computing gradients with respect to model outputs rather than parameters",
        "Scaling the gradient by the inverse Fisher information matrix to account for the curvature of the parameter space",
        "Normalizing the gradient by its L2 norm before applying the update",
        "Using a diagonal approximation to the Hessian for computational efficiency",
      ],
      correctAnswer: 1,
      explanation:
        "The natural gradient applies the inverse Fisher information matrix F⁻¹ to the standard gradient, performing steepest descent in distribution space (KL divergence) rather than Euclidean parameter space, leading to more efficient optimization.",
      hints: [
        "Standard gradient descends in Euclidean parameter space; natural gradient accounts for information geometry.",
        "The Fisher matrix measures how much a small parameter change affects the output distribution.",
      ],
    },
    {
      id: "q-opt-kp6-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "K-FAC (Kronecker-Factored Approximate Curvature) approximates the Fisher information matrix as a Kronecker product to make second-order optimization tractable for neural networks.",
      correctAnswer: "True",
      explanation:
        "K-FAC approximates each layer\'s block of the Fisher matrix as a Kronecker product of two smaller matrices (input covariance × gradient covariance), reducing the cost of computing and inverting the full Fisher from cubic to manageable complexity.",
      hints: [
        "The full Fisher for a large network is enormous — what does Kronecker factorization do to its size?",
        "Kronecker product A ⊗ B can be inverted as A⁻¹ ⊗ B⁻¹ — how does that help?",
      ],
    },
    {
      id: "q-opt-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Distributed Shampoo improves upon K-FAC by:",
      options: [
        "Using a diagonal Fisher approximation that requires only gradient information",
        "Applying a full-matrix preconditioning using Kronecker factors for each layer\'s gradient, with efficient distributed computation across accelerators",
        "Replacing second-order information with a rank-1 update to the preconditioner",
        "Combining K-FAC with momentum by maintaining exponential moving averages of Kronecker factors",
      ],
      correctAnswer: 1,
      explanation:
        "Shampoo computes Kronecker-factor preconditioners (input and gradient covariance matrices per layer) and applies their matrix p-th root as a preconditioner; the distributed version (Anil et al.) computes these expensive matrix operations across TPU/GPU replicas to remain computationally competitive.",
      hints: [
        "Shampoo uses the full Kronecker structure, not just diagonal approximations like Adagrad.",
        "The distributed implementation assigns different layers' preconditioner computations to different accelerators.",
      ],
    },
  ],

  "distributed-opt": [
    {
      id: "q-opt-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "AllReduce in distributed training synchronizes gradients across workers by:",
      options: [
        "Sending all gradients to a central parameter server which updates and broadcasts the new weights",
        "Computing the sum (or average) of gradients across all workers and providing the result to every worker simultaneously",
        "Each worker independently updating its parameters and exchanging weights asynchronously",
        "Compressing gradients into a shared distributed key-value store",
      ],
      correctAnswer: 1,
      explanation:
        "AllReduce collectively computes the element-wise sum of gradients across all workers, giving each worker the same global gradient — enabling fully synchronous data-parallel training without a central parameter server bottleneck.",
      hints: [
        "AllReduce is symmetric — every worker gets the same result.",
        "Ring-AllReduce (used in Horovod) performs this efficiently in O(N) communication steps.",
      ],
    },
    {
      id: "q-opt-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ZeRO (Zero Redundancy Optimizer) Stage 3 partitions optimizer states, gradients, AND model parameters across all data-parallel ranks, maximally reducing per-GPU memory.",
      correctAnswer: "True",
      explanation:
        "ZeRO Stage 3 (DeepSpeed) eliminates all redundancy by partitioning optimizer states, gradients, and parameters across ranks — each GPU holds only 1/N of the full model state, enabling training of models many times larger than a single GPU\'s memory.",
      hints: [
        "ZeRO Stages 1, 2, 3 progressively partition more: states → states+gradients → states+gradients+params.",
        "Full model replication (DDP) uses N × full model memory; ZeRO-3 uses ~1 × full model memory across N GPUs.",
      ],
    },
    {
      id: "q-opt-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Fully Sharded Data Parallel (FSDP) in PyTorch differs from DDP by:",
      options: [
        "Supporting asynchronous gradient communication to overlap compute and communication",
        "Sharding all model parameters, gradients, and optimizer states across GPUs, gathering them on-demand during forward/backward passes",
        "Using pipeline parallelism to split model layers across GPUs instead of replicating them",
        "Replacing gradient synchronization with parameter averaging at fixed intervals",
      ],
      correctAnswer: 1,
      explanation:
        "FSDP shards all model state (parameters, gradients, optimizer state) across data-parallel ranks; parameters are gathered (AllGather) just before each forward/backward unit and immediately resharded after, matching ZeRO-3 while being natively integrated in PyTorch.",
      hints: [
        "DDP replicates the full model on each GPU; FSDP stores only a shard per GPU.",
        "The gather-compute-reshard pattern means each GPU only holds the full layer temporarily.",
      ],
    },
  ],

  "gradient-accumulation": [
    {
      id: "q-opt-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Gradient accumulation allows training with an effective large batch size by:",
      options: [
        "Storing gradients from previous training steps as extra regularization",
        "Summing gradients across multiple small forward/backward passes before performing a single optimizer step",
        "Distributing batch computation across multiple GPUs to process larger batches in parallel",
        "Caching activations from the forward pass to reuse in subsequent mini-batches",
      ],
      correctAnswer: 1,
      explanation:
        "Gradient accumulation runs K forward-backward passes on small micro-batches, accumulates the gradients, then calls optimizer.step() once — simulating a batch size K times larger without requiring the memory of that full batch.",
      hints: [
        "Why not just use a bigger batch directly? Memory is the constraint — what does accumulation enable?",
        "Summing K gradient estimates is equivalent (statistically) to computing the gradient on K × micro-batch examples at once.",
      ],
    },
    {
      id: "q-opt-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gradient accumulation produces results identical to using the full effective batch size directly, assuming no batch normalization layers.",
      correctAnswer: "True",
      explanation:
        "Without batch normalization (which computes statistics per mini-batch), accumulating K micro-batch gradients and updating once is mathematically equivalent to computing the gradient on the full K × micro-batch, since gradients are linear in the loss.",
      hints: [
        "Why does batch normalization break this equivalence? What does BN compute that is mini-batch-dependent?",
        "If there is no BN, what is different between the full batch and the accumulated mini-batches?",
      ],
    },
    {
      id: "q-opt-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When using gradient accumulation with distributed training (DDP), gradient synchronization (AllReduce) should be performed:",
      options: [
        "After every micro-batch forward-backward pass to keep all ranks synchronized",
        "Only after the final accumulation step (before the optimizer update) to avoid unnecessary communication overhead",
        "Before each micro-batch forward pass to ensure all ranks start from the same model state",
        "Asynchronously in the background without blocking micro-batch computation",
      ],
      correctAnswer: 1,
      explanation:
        "Performing AllReduce after every micro-batch wastes communication bandwidth; PyTorch DDP\'s no_sync() context manager defers gradient synchronization until the final accumulation step, communicating only once per effective batch.",
      hints: [
        "AllReduce is expensive — if you accumulate K micro-batches, how many times do you actually need to sync?",
        "PyTorch\'s `no_sync()` context manager suppresses gradient communication on intermediate accumulation steps.",
      ],
    },
  ],

  "mixed-precision-opt": [
    {
      id: "q-opt-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Mixed precision training uses FP16 for forward and backward passes primarily to:",
      options: [
        "Improve numerical stability compared to FP32 training",
        "Reduce memory usage and increase throughput on hardware with native FP16 tensor core support",
        "Enable larger batch sizes by storing activations in higher precision",
        "Improve gradient accuracy by using lower precision accumulation",
      ],
      correctAnswer: 1,
      explanation:
        "FP16 values use half the memory of FP32, allowing larger batch sizes or models, and modern GPUs/TPUs process FP16 operations significantly faster using tensor cores — typically 2–8× throughput improvement.",
      hints: [
        "FP16 has 16 bits vs. FP32's 32 bits — what does that immediately mean for memory?",
        "Hardware like NVIDIA V100/A100 has specialized tensor cores optimized for FP16/BF16 computation.",
      ],
    },
    {
      id: "q-opt-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Loss scaling in mixed precision training multiplies the loss by a large constant before backpropagation to prevent FP16 gradient underflow.",
      correctAnswer: "True",
      explanation:
        "FP16 has a much smaller representable range than FP32; small gradient values underflow to zero. Loss scaling multiplies the loss by a scale factor S before backward, making gradients larger (by S), then unscales before the optimizer step to restore correct magnitudes.",
      hints: [
        "FP16's smallest positive normal number is ~6×10⁻⁵ — what happens to gradients smaller than this?",
        "Loss scaling is reversed (divided by S) before the optimizer step so weights are updated correctly.",
      ],
    },
    {
      id: "q-opt-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BF16 (Brain Float 16) is often preferred over FP16 for LLM training because:",
      options: [
        "BF16 provides higher precision (more mantissa bits) than FP16",
        "BF16 has the same exponent range as FP32, avoiding overflow/underflow without requiring loss scaling",
        "BF16 is natively supported on all NVIDIA GPUs, whereas FP16 is not",
        "BF16 accumulates gradients more accurately than FP16 in the optimizer step",
      ],
      correctAnswer: 1,
      explanation:
        "BF16 uses 8 exponent bits (same as FP32) and only 7 mantissa bits, preserving FP32's dynamic range while using 16-bit storage — this eliminates overflow/underflow issues that require loss scaling in FP16 (which uses 5 exponent bits).",
      hints: [
        "The key difference between BF16 and FP16 is how they split their bits between exponent and mantissa.",
        "Dynamic range is determined by exponent bits; precision by mantissa bits — which is more important for stability?",
      ],
    },
  ],

  "convergence-theory": [
    {
      id: "q-opt-kp10-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For SGD on a smooth convex function, the convergence rate to the global minimum is:",
      options: [
        "O(1/T) for the average iterate with diminishing step sizes",
        "O(1/√T) for the best iterate with constant step sizes",
        "O(e^(-T)) (exponential convergence) like gradient descent on strongly convex functions",
        "O(1/T²) as achieved by Nesterov\'s accelerated gradient method",
      ],
      correctAnswer: 0,
      explanation:
        "For smooth convex functions, SGD with properly chosen diminishing step sizes achieves an O(1/T) convergence rate for the running average of iterates; strongly convex functions give a faster O(1/T) rate on the last iterate.",
      hints: [
        "Convergence rates are usually expressed as how the suboptimality gap decreases with T iterations.",
        "Stochastic noise from SGD fundamentally limits convergence compared to full gradient descent — where does that show up in the rate?",
      ],
    },
    {
      id: "q-opt-kp10-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "For strongly convex smooth functions, full gradient descent (not SGD) achieves linear (geometric) convergence to the global minimum.",
      correctAnswer: "True",
      explanation:
        "Gradient descent on strongly convex smooth functions converges at rate O((1-μ/L)^T) where μ is the strong convexity constant and L is the Lipschitz constant of the gradient — a geometric rate meaning the error decreases by a constant factor each step.",
      hints: [
        "Linear convergence means the log of the error decreases linearly with iterations.",
        "Strong convexity ensures a unique global minimum and a lower bound on curvature — why does that help convergence?",
      ],
    },
    {
      id: "q-opt-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The gradient complexity lower bound (by Carmon et al.) for finding an ε-approximate first-order stationary point of a smooth non-convex function is:",
      options: ["O(1/ε)", "O(1/ε²)", "O(1/ε^(4/3))", "O(log(1/ε))"],
      correctAnswer: 1,
      explanation:
        "For smooth non-convex optimization, finding a point where ||∇f|| ≤ ε requires Ω(ε⁻²) gradient evaluations in the worst case; SGD matches this rate, establishing it as optimal for stochastic first-order methods on non-convex problems.",
      hints: [
        "Non-convex problems only guarantee convergence to stationary points (where gradient is small), not global minima.",
        "Lower bounds establish what no first-order algorithm can beat — how does SGD\'s rate compare?",
      ],
    },
  ],

  "loss-landscape": [
    {
      id: "q-opt-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'The "loss landscape" of a neural network refers to:',
      options: [
        "The learning curve plotting training loss over time",
        "The surface of the loss function over the high-dimensional parameter space",
        "The distribution of loss values across different training examples",
        "The gradient magnitude plotted across layers of the network",
      ],
      correctAnswer: 1,
      explanation:
        "The loss landscape is the geometric surface defined by L(θ) over all possible parameter settings θ; its topology (flat vs. sharp regions, saddle points, minima) directly impacts optimization dynamics and generalization.",
      hints: [
        "If you had only 2 parameters, the loss landscape would be a surface in 3D — what does it look like for millions of parameters?",
        "Researchers visualize 2D slices of the loss landscape to study it.",
      ],
    },
    {
      id: "q-opt-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Models converging to flat minima in the loss landscape tend to generalize better than models converging to sharp minima.",
      correctAnswer: "True",
      explanation:
        "Flat minima are regions where the loss changes slowly in all directions — a small perturbation in parameters causes little increase in loss; sharp minima are sensitive to such perturbations, correlating with worse generalization to shifted test distributions.",
      hints: [
        "Think about what happens at a flat minimum when the test distribution shifts slightly from the training distribution.",
        "Hochreiter & Schmidhuber (1997) and subsequent work showed flat minima often generalize better.",
      ],
    },
    {
      id: "q-opt-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The filter normalization method for loss landscape visualization (Li et al., 2018) addresses which issue with naive random-direction plots?",
      options: [
        "The curse of dimensionality makes 2D slices uninformative in high dimensions",
        "Parameters at different layers have different scales, so random directions distort the perceived sharpness",
        "Gradient information is needed to find meaningful visualization directions",
        "The landscape is non-stationary during training, making static slices misleading",
      ],
      correctAnswer: 1,
      explanation:
        "Filter normalization rescales random perturbation directions to have the same norm as the corresponding weight filters, controlling for the varying scale of parameters across layers and producing comparisons of sharpness that are invariant to parameter rescaling.",
      hints: [
        "Without normalization, directions in layers with large weights dominate the plot scale.",
        "Think about how batch norm reparameterizes weights — does the raw parameter scale mean what we think?",
      ],
    },
  ],

  "sharpness-aware": [
    {
      id: "q-opt-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Sharpness-Aware Minimization (SAM) finds flat minima by:",
      options: [
        "Adding an explicit regularization term penalizing the Hessian trace during training",
        "Minimizing the worst-case loss within a neighborhood of the current parameters, then stepping toward lower sharpness regions",
        "Using exponential moving averages of parameters to smooth the loss surface",
        "Combining standard SGD with a second phase of gradient ascent on a held-out validation set",
      ],
      correctAnswer: 1,
      explanation:
        "SAM computes an adversarial perturbation ε̂ that maximizes loss within an ε-ball around current weights, then takes a gradient step on L(θ + ε̂) — seeking parameters where even the worst nearby perturbation has low loss (flat regions).",
      hints: [
        "SAM adds an inner maximization step — what is it maximizing, and why?",
        "Minimizing the worst-case perturbed loss encourages the model to land in flat, not just low, regions.",
      ],
    },
    {
      id: "q-opt-kp12-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "SAM requires two forward-backward passes per parameter update, doubling the computational cost compared to standard SGD.",
      correctAnswer: "True",
      explanation:
        "SAM first performs a forward-backward pass to compute the gradient for the inner maximization (finding the perturbation ε̂), then a second forward-backward pass at the perturbed parameters to compute the update gradient — approximately 2× the compute of standard SGD.",
      hints: [
        "Count the operations: (1) gradient at θ to find ε̂, (2) gradient at θ+ε̂ for the update.",
        "This is the main practical cost of SAM — researchers have proposed efficient approximations like m-SAM.",
      ],
    },
    {
      id: "q-opt-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "ASAM (Adaptive SAM) modifies the SAM perturbation by:",
      options: [
        "Using a per-layer ε budget instead of a global one",
        "Normalizing the perturbation by each parameter\'s magnitude to make sharpness scale-invariant",
        "Computing the perturbation only for the highest-loss mini-batch in each step",
        "Alternating between SAM and standard SGD steps to reduce computation",
      ],
      correctAnswer: 1,
      explanation:
        "ASAM defines the neighborhood using an adaptive (parameter-magnitude-scaled) norm rather than a fixed Euclidean ball, making the sharpness measure invariant to parameter rescaling (e.g., from weight normalization or batch norm) and improving training stability.",
      hints: [
        "Why is a fixed-radius Euclidean ball problematic when parameters have very different scales?",
        "Adaptive normalization is the theme connecting ASAM to similar adaptive methods like AdaGrad.",
      ],
    },
  ],

  "weight-averaging": [
    {
      id: "q-opt-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Stochastic Weight Averaging (SWA) improves generalization by:",
      options: [
        "Randomly dropping weight parameters during inference to reduce overfitting",
        "Averaging multiple model checkpoints collected at different points during training to find a flatter minimum",
        "Adding stochastic noise to model weights during training as a regularizer",
        "Averaging predictions from models trained with different random seeds",
      ],
      correctAnswer: 1,
      explanation:
        "SWA maintains a running average of model weights collected at regular intervals (typically at the end of each learning rate cycle), landing in a wider, flatter region of the loss landscape than any single checkpoint and improving generalization.",
      hints: [
        "Averaging parameters from different points in training is different from averaging model predictions.",
        'SWA connects to the "flat minima = better generalization" hypothesis — why might the average land flatter?',
      ],
    },
    {
      id: "q-opt-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Exponential Moving Average (EMA) of model weights, used in training diffusion models and GANs, maintains a separate set of weights that changes more slowly than the SGD-updated weights.",
      correctAnswer: "True",
      explanation:
        "EMA weights are updated as θ_EMA ← β × θ_EMA + (1-β) × θ with β close to 1 (e.g., 0.9999), producing a smoothed version of the weights that is more stable and typically achieves better FID/IS scores at evaluation time than the raw training weights.",
      hints: [
        "EMA with β=0.9999 means the EMA weights change very slowly — what does that stability provide?",
        "Diffusion models like DDPM use EMA weights for sampling while training continues on the raw weights.",
      ],
    },
    {
      id: "q-opt-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Model soups (Wortsman et al., 2022) demonstrated that weight averaging of fine-tuned models:",
      options: [
        "Requires all models to be fine-tuned from the same checkpoint with the same learning rate",
        "Can outperform the best individual fine-tuned model when averaging models fine-tuned with diverse hyperparameters",
        "Only works when models are ensembled at prediction time rather than weight-averaged",
        "Requires knowledge distillation to combine models effectively",
      ],
      correctAnswer: 1,
      explanation:
        "Model soups showed that averaging weights from multiple models fine-tuned from the same pretrained checkpoint (with different hyperparameters) often outperforms any single model, because the models explore nearby regions in the same loss basin and their average sits in a flatter, better-generalizing region.",
      hints: [
        "Why does weight averaging work here but not for models trained from different initializations?",
        "Models fine-tuned from the same pretrained base share a loss basin — their average stays within it.",
      ],
    },
  ],

  "gradient-checkpointing": [
    {
      id: "q-opt-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Gradient checkpointing reduces memory usage during backpropagation by:",
      options: [
        "Computing gradients in FP16 instead of FP32 to halve memory",
        "Recomputing intermediate activations during the backward pass instead of storing them all during the forward pass",
        "Accumulating gradients over multiple micro-batches before storing them",
        "Pruning gradients below a threshold to reduce memory footprint",
      ],
      correctAnswer: 1,
      explanation:
        "Gradient checkpointing stores only a subset of activations (checkpoints) during the forward pass and recomputes the rest on-the-fly during backpropagation, trading compute time (~33% overhead) for a significant reduction in activation memory.",
      hints: [
        "Backprop needs the forward-pass activations to compute gradients — normally they are all stored.",
        "Checkpointing trades memory for compute — what is the extra compute cost?",
      ],
    },
    {
      id: "q-opt-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "With gradient checkpointing on a network of depth L, memory usage reduces from O(L) to O(√L) activations by placing checkpoints optimally.",
      correctAnswer: "True",
      explanation:
        "Optimal checkpoint placement every √L layers reduces stored activations to O(√L) checkpoints × O(√L) recomputed per segment = O(√L) total memory, at the cost of one additional forward pass per segment during backpropagation.",
      hints: [
        "If you place checkpoints every k layers, you store L/k checkpoints but recompute k layers per segment.",
        "Minimize max(L/k, k) over k — at the optimum, L/k = k, giving k = √L.",
      ],
    },
    {
      id: "q-opt-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Activation offloading (used in ZeRO-Infinity) differs from gradient checkpointing by:",
      options: [
        "Recomputing activations from scratch during the backward pass rather than storing them",
        "Moving activations from GPU VRAM to CPU RAM (or NVMe storage) and fetching them back during backpropagation",
        "Quantizing activations to INT8 during the forward pass to reduce their memory footprint",
        "Distributing activations across multiple GPUs in a tensor-parallel setup",
      ],
      correctAnswer: 1,
      explanation:
        "Activation offloading stores forward-pass activations in CPU RAM (or NVMe) rather than GPU VRAM, fetching them back to GPU when needed for gradient computation — trading PCIe bandwidth for GPU memory, useful when GPU VRAM is the bottleneck.",
      hints: [
        "Gradient checkpointing recomputes activations; offloading stores but moves them off-GPU.",
        "Think about the tradeoff: recompute has CPU+GPU compute cost, offload has PCIe bandwidth cost.",
      ],
    },
  ],

  "sparse-optimization": [
    {
      id: "q-opt-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Lottery Ticket Hypothesis (Frankle & Carlin, 2019) states that:",
      options: [
        "Randomly pruned networks can match the performance of the original dense network",
        'Dense networks contain sparse subnetworks ("winning tickets") that, trained in isolation from their original initialization, match the full network\'s performance',
        "Sparse networks always outperform dense networks on the same compute budget",
        "The final sparse network is equivalent to a network trained with L1 regularization",
      ],
      correctAnswer: 1,
      explanation:
        'The Lottery Ticket Hypothesis proposes that large random networks contain small sparse subnetworks with initial weights that, when trained alone (rewound to their original values), can match the full network\'s accuracy — these are the "winning tickets."',
      hints: [
        'The "lottery" refers to lucky initialization — the ticket must be combined with its original, not random, initial weights.',
        "Key observation: the sparse subnetwork found by pruning + rewind trains as well as the full network.",
      ],
    },
    {
      id: "q-opt-kp15-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Magnitude-based pruning removes the weights with the smallest absolute values, assuming small weights contribute least to model performance.",
      correctAnswer: "True",
      explanation:
        "Magnitude pruning is the simplest and most widely used pruning heuristic: weights with small absolute magnitude have little impact on the output, and setting them to zero produces a sparse network with minimal accuracy loss.",
      hints: [
        "A weight of 0.001 contributes much less to the output than a weight of 5.0 — is that always a reliable pruning signal?",
        "Magnitude pruning is fast and practical, though theoretically suboptimal compared to gradient-based criteria.",
      ],
    },
    {
      id: "q-opt-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Sparse training methods like RigL (Evci et al.) maintain a fixed sparsity level throughout training by:",
      options: [
        "Starting with a dense model and progressively pruning the smallest weights",
        "Dynamically dropping and growing sparse connections based on magnitude and gradient information during training",
        "Training a dense model and then distilling it into a sparse model at the end",
        "Using L0 regularization to enforce hard sparsity constraints during optimization",
      ],
      correctAnswer: 1,
      explanation:
        "RigL (Rigged Lottery) maintains constant sparsity by periodically removing the smallest magnitude weights and growing new connections at positions with the largest gradient magnitudes, enabling end-to-end sparse training without a dense initialization.",
      hints: [
        "Static sparse training is limited by the initial sparse structure — how does dynamic connection growth help?",
        "Gradient magnitude indicates where new connections would be most useful — RigL uses this to grow the network.",
      ],
    },
  ],

  "meta-optimization": [
    {
      id: "q-opt-kp16-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "MAML (Model-Agnostic Meta-Learning) optimizes for:",
      options: [
        "The best average performance across all training tasks",
        "An initialization from which a few gradient steps on any new task lead to strong performance",
        "A learning rate schedule that generalizes across many different model architectures",
        "A set of task-specific adapters that can be applied to a frozen base model",
      ],
      correctAnswer: 1,
      explanation:
        "MAML\'s outer loop updates the meta-parameters θ so that for any sampled task τ, taking K gradient steps from θ on τ's support set yields a model that performs well on τ's query set — optimizing for fast adaptation, not raw average performance.",
      hints: [
        'The objective is "learn to learn" — what property of the initialization enables fast learning?',
        "MAML\'s loss is evaluated after K inner-loop gradient steps, not at θ directly.",
      ],
    },
    {
      id: "q-opt-kp16-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Meta-SGD learns not just the initialization but also a per-parameter learning rate, enabling faster and more expressive adaptation than MAML.",
      correctAnswer: "True",
      explanation:
        "Meta-SGD treats the per-parameter learning rate (and sign) as learnable meta-parameters alongside the initialization, allowing the meta-learner to determine how each parameter should adapt to new tasks — providing more expressive adaptation than MAML\'s scalar learning rate.",
      hints: [
        "MAML uses a fixed scalar learning rate for inner-loop adaptation — what does learning per-parameter rates add?",
        "Different parameters may need different step sizes and directions for fast adaptation.",
      ],
    },
    {
      id: "q-opt-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "First-Order MAML (FOMAML) and Reptile approximate MAML\'s second-order gradients by:",
      options: [
        "Using a diagonal Hessian approximation to compute meta-gradients cheaply",
        "Ignoring the second-order terms (derivatives through the inner loop\'s gradient), using only first-order information",
        "Replacing the inner-loop gradient descent with a learned optimizer to avoid second-order computation",
        "Computing meta-gradients using finite differences over the task distribution",
      ],
      correctAnswer: 1,
      explanation:
        "Exact MAML requires differentiating through the inner optimization loop (computing Hessian-vector products); FOMAML and Reptile omit these second-order terms, approximating with only first-order gradients and achieving similar performance at much lower computational cost.",
      hints: [
        "The full MAML gradient requires computing ∂²L/∂θ² through the inner loop — how expensive is that?",
        "FOMAML stops the gradient at the inner loop boundary; Reptile has a slightly different but related approximation.",
      ],
    },
  ],

  "bayesian-opt": [
    {
      id: "q-opt-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Bayesian optimization for hyperparameter tuning uses a surrogate model to:",
      options: [
        "Directly compute the gradient of the validation loss with respect to hyperparameters",
        "Build a probabilistic model of the objective function and use it to select the most promising hyperparameter configurations to evaluate",
        "Randomly sample hyperparameter configurations and train an ensemble of surrogate models",
        "Warm-start hyperparameter search using results from previous unrelated experiments",
      ],
      correctAnswer: 1,
      explanation:
        "Bayesian optimization fits a surrogate model (typically a Gaussian Process or tree-based model) to the observed (hyperparameter, performance) pairs, then uses an acquisition function to select the next hyperparameter configuration that balances exploration and exploitation.",
      hints: [
        "The surrogate model is cheap to evaluate, unlike the actual training run — how does that help?",
        "Acquisition functions (EI, UCB) quantify how promising a new point is based on the surrogate\'s uncertainty.",
      ],
    },
    {
      id: "q-opt-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gaussian Processes (GPs) are commonly used as surrogate models in Bayesian optimization because they provide both a mean prediction and calibrated uncertainty estimates over the objective function.",
      correctAnswer: "True",
      explanation:
        "GPs define a distribution over functions and provide posterior mean and variance at any query point, allowing acquisition functions to precisely balance the expected improvement (mean) and exploration benefit (variance) when selecting the next configuration.",
      hints: [
        "The uncertainty estimate from a GP is what acquisition functions like EI and UCB depend on.",
        'Without uncertainty, you cannot distinguish "probably bad" from "unknown" — why does that distinction matter?',
      ],
    },
    {
      id: "q-opt-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Expected Improvement (EI) acquisition function selects the next hyperparameter configuration by:",
      options: [
        "Choosing the configuration with the highest posterior mean from the surrogate model",
        "Computing the expected value of the improvement over the current best observation, integrating over the surrogate posterior",
        "Maximizing the upper confidence bound (mean + κ × std) of the surrogate posterior",
        "Sampling configurations proportionally to their surrogate-predicted performance",
      ],
      correctAnswer: 1,
      explanation:
        "EI computes E[max(f(x) - f(x+), 0)] analytically under the GP posterior, where f(x+) is the current best observed value — it naturally balances exploitation (high mean) and exploration (high variance) without a manual tradeoff parameter.",
      hints: [
        "EI is zero if the posterior mean is below the current best — it is only positive where improvement is expected.",
        "The closed-form EI involves the normal CDF and PDF of the standardized improvement.",
      ],
    },
  ],

  "evolutionary-opt": [
    {
      id: "q-opt-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Evolutionary Strategies (ES) optimize neural networks by:",
      options: [
        "Computing exact gradients through the network using backpropagation",
        "Evaluating a population of parameter perturbations and updating parameters in the direction of better-performing perturbations",
        "Using genetic crossover to combine two parent networks into a child network",
        "Selecting the best model from many randomly initialized networks",
      ],
      correctAnswer: 1,
      explanation:
        "ES samples a population of parameter perturbations from a distribution (typically Gaussian), evaluates each perturbation\'s fitness, and updates the distribution mean in the direction of higher-fitness perturbations — effectively estimating a gradient without backpropagation.",
      hints: [
        "ES is gradient-free — it only needs a fitness evaluation, not a gradient computation.",
        "Salimans et al. showed ES can train competitive RL policies using this perturbation-then-update loop.",
      ],
    },
    {
      id: "q-opt-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CMA-ES (Covariance Matrix Adaptation Evolution Strategy) adapts a full covariance matrix of the search distribution, allowing it to capture correlations between parameters.",
      correctAnswer: "True",
      explanation:
        "CMA-ES maintains and adapts a full covariance matrix to model the correlations and scales of successful search directions, enabling it to efficiently handle ill-conditioned and non-separable optimization landscapes where diagonal strategies fail.",
      hints: [
        "A diagonal covariance assumes parameters are independent — when is that wrong in neural network optimization?",
        "Adapting the full covariance is expensive (O(n²)) but allows ES to capture gradient-like curvature information.",
      ],
    },
    {
      id: "q-opt-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The key advantage of ES over policy gradient methods for reinforcement learning is:",
      options: [
        "ES achieves higher sample efficiency because it uses off-policy data",
        "ES is embarrassingly parallelizable — each perturbation evaluation is independent and can run on a separate worker",
        "ES has stronger convergence guarantees than REINFORCE for continuous action spaces",
        "ES does not require specifying a reward function, unlike policy gradient methods",
      ],
      correctAnswer: 1,
      explanation:
        "ES evaluates many independent perturbations simultaneously with no communication until aggregation, enabling near-linear scaling with workers; policy gradient methods require shared trajectory experience, making parallelization more complex.",
      hints: [
        "Each ES perturbation is an independent rollout — do workers need to share information mid-rollout?",
        "Salimans et al. trained on 1,000+ CPU cores with near-linear speedup using this parallelism.",
      ],
    },
  ],

  "constrained-opt": [
    {
      id: "q-opt-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In constrained optimization for ML (e.g., fairness constraints), the method of Lagrange multipliers converts a constrained problem into:",
      options: [
        "A sequence of unconstrained problems with shrinking feasible regions",
        "An unconstrained saddle-point problem by adding penalty terms for constraint violations weighted by Lagrange multipliers",
        "A binary search over the constraint violation threshold",
        "A projection step after each gradient update to enforce constraint satisfaction",
      ],
      correctAnswer: 1,
      explanation:
        "The Lagrangian L(θ, λ) = f(θ) + λᵀg(θ) converts a constrained problem min f(θ) s.t. g(θ) ≤ 0 into finding a saddle point — minimizing over θ and maximizing over λ ≥ 0 — which can be solved with standard gradient methods.",
      hints: [
        "Lagrange multipliers λ penalize constraint violations — what happens to λ when a constraint is violated?",
        "The saddle point formulation naturally handles inequality constraints through the dual variables λ.",
      ],
    },
    {
      id: "q-opt-kp19-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Projected gradient descent enforces constraints by projecting the unconstrained gradient step back onto the feasible set after each update.",
      correctAnswer: "True",
      explanation:
        "Projected gradient descent takes a standard gradient step (which may violate constraints) and then projects the result onto the constraint set (e.g., the L2 ball, the simplex), ensuring feasibility at each iteration while following the gradient direction.",
      hints: [
        "Projection finds the nearest feasible point to the infeasible gradient step.",
        "Think about L2-ball constrained optimization — how does projection enforce the norm constraint?",
      ],
    },
    {
      id: "q-opt-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Fairness-constrained learning using a Lagrangian approach requires alternating updates to:",
      options: [
        "The model parameters (minimizing loss + constraint penalty) and the Lagrange multipliers (maximizing over dual variables)",
        "The model parameters (minimizing loss) and a separate fairness classifier (maximizing fairness violation)",
        "The training data distribution (increasing fairness group weights) and the model parameters",
        "The model architecture (adding fairness-specific layers) and the learning rate schedule",
      ],
      correctAnswer: 0,
      explanation:
        "Lagrangian fairness training alternates primal updates (minimizing the Lagrangian over model parameters) and dual updates (gradient ascent over Lagrange multipliers to increase penalties for violated fairness constraints), converging to a saddle point of the Lagrangian.",
      hints: [
        "Dual variables are updated by ascending the Lagrangian (increase penalty when constraint is violated).",
        "Primal updates minimize loss + weighted constraints; dual updates increase the weights of violated constraints.",
      ],
    },
  ],

  "multi-objective-opt": [
    {
      id: "q-opt-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Pareto front in multi-objective optimization contains solutions where:",
      options: [
        "All objectives are simultaneously minimized to their individual optima",
        "No solution can improve one objective without worsening at least one other",
        "The weighted sum of all objectives is minimized with equal weights",
        "All solutions achieve the same value on each objective",
      ],
      correctAnswer: 1,
      explanation:
        "Pareto-optimal solutions are non-dominated: there is no feasible solution that is at least as good on all objectives and strictly better on at least one; the Pareto front is the set of all such non-dominated solutions, representing the optimal tradeoffs.",
      hints: [
        "A solution is dominated if another exists that beats it on every objective — Pareto-optimal solutions are not dominated.",
        "Think of the accuracy-speed tradeoff: every point on the Pareto front represents an unimprovable accuracy-speed combination.",
      ],
    },
    {
      id: "q-opt-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Scalarization (weighted sum of objectives) can always recover all Pareto-optimal solutions by varying the weights.",
      correctAnswer: "False",
      explanation:
        "Weighted sum scalarization can only find solutions on the convex hull of the Pareto front; non-convex Pareto fronts have solutions that are not achievable by any positive weight combination, requiring alternative methods like ε-constraint or evolutionary multi-objective algorithms.",
      hints: [
        "If the Pareto front is concave (non-convex), can a linear combination of objectives reach all its points?",
        'Think about which Pareto solutions lie "inside" the convex hull — can they be found by weight adjustment?',
      ],
    },
    {
      id: "q-opt-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multiple Gradient Descent Algorithm (MGDA) achieves Pareto-optimality in multi-objective ML by:",
      options: [
        "Alternating gradient descent steps between objectives in a round-robin schedule",
        "Finding a common gradient update direction that does not worsen any objective, by solving a quadratic program over convex combinations of task gradients",
        "Maximizing the hypervolume indicator of the current solution set relative to a reference point",
        "Training separate models for each objective and selecting the Pareto-optimal ensemble",
      ],
      correctAnswer: 1,
      explanation:
        "MGDA solves a quadratic program to find the minimum-norm element in the convex hull of task gradients — a direction that simultaneously descends (or is orthogonal to) all objectives — guaranteeing convergence to a Pareto-stationary point.",
      hints: [
        'If task gradients conflict (point in different directions), what is the "safest" combined update?',
        "The min-norm gradient in the convex hull is the gradient that makes the most consistent progress across all tasks.",
      ],
    },
  ],

  "regularization-opt": [
    {
      id: "q-opt-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "L1 regularization (Lasso) induces sparsity in model weights because:",
      options: [
        "It penalizes the sum of squared weights, shrinking them toward zero",
        "Its gradient is constant (±1 per non-zero weight), creating equal pressure toward zero regardless of weight magnitude",
        "It projects weights onto an L1 ball at each step, forcing the smallest weights to zero first",
        "It adds a KL divergence penalty between the weight distribution and a Laplace prior",
      ],
      correctAnswer: 1,
      explanation:
        "The L1 penalty\'s subgradient is ±λ·sign(w) — constant magnitude regardless of weight size — so small and large weights face equal shrinkage pressure; this causes small weights to hit exactly zero (sparsity), unlike L2's proportional shrinkage.",
      hints: [
        "L2 gradient is proportional to weight magnitude (2λw) — how does that differ from L1's ±λ?",
        "Think geometrically: the L1 ball has corners at the axes, where sparse solutions lie.",
      ],
    },
    {
      id: "q-opt-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Elastic Net regularization combines L1 and L2 penalties, achieving both sparsity (from L1) and grouping of correlated features (from L2).",
      correctAnswer: "True",
      explanation:
        "Elastic Net adds α||w||₁ + (1-α)||w||₂² to the loss, combining L1's sparsity-inducing property with L2's tendency to shrink correlated features together (group selection) rather than arbitrarily picking one.",
      hints: [
        "Pure L1 arbitrarily selects one feature from a correlated group; L2 keeps all of them equally.",
        "Elastic Net balances these behaviors through the mixing parameter α.",
      ],
    },
    {
      id: "q-opt-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Weight decay (L2 regularization) in deep learning acts as an implicit bias toward:",
      options: [
        "Larger gradient norms during backpropagation",
        "Smaller weight magnitudes, which in overparameterized networks corresponds to lower-complexity solutions",
        "Uniform weight distributions across all layers",
        "Orthogonal weight matrices that improve gradient flow",
      ],
      correctAnswer: 1,
      explanation:
        "Weight decay penalizes ||θ||₂², consistently shrinking all weights and biasing the optimizer toward simpler (lower-norm) solutions in the overparameterized regime where many parameter vectors fit the training data; this connects to generalization bounds via norm-based complexity measures.",
      hints: [
        "In overparameterized networks, many solutions fit the training data — weight decay selects among them.",
        "Smaller-norm solutions correspond to simpler functions under norm-based complexity measures like PAC-Bayes bounds.",
      ],
    },
  ],

  "proximal-methods": [
    {
      id: "q-opt-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The proximal operator prox_{λf}(v) is defined as the solution to:",
      options: [
        "argmin_x f(x) + λ||x||",
        "argmin_x f(x) + (1/2λ)||x - v||²",
        "argmin_x (1/2)||x - v||² + λf(x)",
        "argmax_x f(v) - λ||x - v||²",
      ],
      correctAnswer: 2,
      explanation:
        "The proximal operator prox_{λf}(v) = argmin_x {(1/2)||x-v||² + λf(x)} finds the point that minimizes f while staying close to v, with λ controlling the tradeoff; for L1, this gives soft-thresholding.",
      hints: [
        'The proximal operator minimizes f(x) while adding a quadratic "don\'t move too far from v" penalty.',
        "For L1 regularization, what does applying the proximal operator do to each weight component?",
      ],
    },
    {
      id: "q-opt-kp22-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Proximal gradient descent for L1-regularized problems applies soft-thresholding to the weights after each gradient step, implementing the proximal operator of the L1 norm.",
      correctAnswer: "True",
      explanation:
        "Proximal gradient descent applies a gradient step on the smooth loss, then applies the proximal operator of the regularizer; for L1, this proximal operator is soft-thresholding: sign(w)·max(|w|-λ, 0), which exactly zeroes out small weights.",
      hints: [
        "Soft-thresholding with threshold λ shrinks all weights by λ and sets those smaller than λ to zero.",
        "This is equivalent to applying Lasso regularization exactly, rather than the approximate gradient-based approach.",
      ],
    },
    {
      id: "q-opt-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ADMM (Alternating Direction Method of Multipliers) is particularly useful in distributed ML because it:",
      options: [
        "Eliminates the need for gradient communication by using only function value evaluations",
        "Decomposes the global optimization into local subproblems that can be solved independently and then coordinated through dual variable updates",
        "Achieves faster convergence than gradient descent by using second-order curvature information",
        "Automatically selects the optimal regularization parameter from training data",
      ],
      correctAnswer: 1,
      explanation:
        "ADMM splits the optimization into subproblems (one per machine/block) solvable independently, then synchronizes via dual variable updates — enabling consensus optimization over distributed data without sharing raw data, only local solutions.",
      hints: [
        'ADMM\'s "alternating" refers to alternating between primal (x, z) and dual (u) updates.',
        "Think about federated learning: each node solves a local problem; ADMM coordinates them via shared dual variables.",
      ],
    },
  ],

  "variance-reduction": [
    {
      id: "q-opt-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SVRG (Stochastic Variance Reduced Gradient) reduces gradient variance compared to SGD by:",
      options: [
        "Using a larger mini-batch size at each step to average out noise",
        "Periodically computing the full gradient as a reference and correcting each stochastic gradient update relative to this snapshot",
        "Applying exponential moving averages to the stochastic gradients to smooth them",
        "Clipping stochastic gradients to a fixed maximum norm before each update",
      ],
      correctAnswer: 1,
      explanation:
        "SVRG periodically computes the full gradient ∇f(θ̃) at a snapshot θ̃; each stochastic update uses g = ∇fᵢ(θ) - ∇fᵢ(θ̃) + ∇f(θ̃), canceling the noise component via the correction term and enabling convergence with a constant step size on strongly convex problems.",
      hints: [
        "The correction term ∇fᵢ(θ̃) is an unbiased estimate of the noise in ∇fᵢ(θ) — what does subtracting it do?",
        "SVRG achieves linear convergence like full gradient descent, but with per-step cost similar to SGD.",
      ],
    },
    {
      id: "q-opt-kp23-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Variance reduction methods like SVRG and SAGA achieve faster convergence than SGD on finite-sum objectives by eliminating the irreducible noise floor that SGD converges to.",
      correctAnswer: "True",
      explanation:
        "SGD with a constant step size converges to a neighborhood of the solution (noise floor) on finite-sum problems; SVRG and SAGA use gradient correction terms that reduce variance to zero as the iterate converges, achieving exact convergence with constant step sizes on strongly convex problems.",
      hints: [
        "SGD noise is irreducible with a fixed learning rate — you must decay it to converge exactly.",
        "Variance reduction methods effectively turn the stochastic problem into one that converges like full gradient descent.",
      ],
    },
    {
      id: "q-opt-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "SAGA differs from SVRG in gradient storage by:",
      options: [
        "Using a reservoir of the most recent N gradients as a control variate",
        "Storing the most recent gradient for every individual training example and using them as per-example corrections",
        "Maintaining a single snapshot of the full gradient, updated every epoch like SVRG",
        "Storing only the gradient signs to reduce memory requirements",
      ],
      correctAnswer: 1,
      explanation:
        "SAGA maintains a table of the most recently computed gradient for each training example (n gradient vectors total); each update uses the current stochastic gradient minus the stored old gradient for that example plus the average of all stored gradients — providing an unbiased low-variance correction without a full gradient pass.",
      hints: [
        "SVRG takes a full gradient pass periodically; SAGA amortizes this by storing per-example gradient history.",
        "SAGA\'s table has n entries (one per training example) — what is the memory cost vs. SVRG?",
      ],
    },
  ],

  "hyperparameter-opt": [
    {
      id: "q-opt-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Optuna\'s Tree-structured Parzen Estimator (TPE) selects hyperparameters by modeling:",
      options: [
        "The joint probability of hyperparameters using a Gaussian process",
        "Separate densities for good and bad configurations and choosing candidates with high good-to-bad likelihood ratio",
        "The expected improvement over the current best configuration using a random forest surrogate",
        "The marginal contribution of each hyperparameter independently",
      ],
      correctAnswer: 1,
      explanation:
        "TPE models l(x) (density of configs with performance above threshold) and g(x) (below threshold), then selects the config that maximizes l(x)/g(x) — the Expected Improvement under the Parzen estimator models.",
      hints: [
        'TPE splits configs into "good" and "bad" based on a performance threshold — then models each group.',
        "The acquisition is: sample where good density is high AND bad density is low.",
      ],
    },
    {
      id: "q-opt-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Successive Halving (and Hyperband) improves over random search by early-stopping low-performing configurations to free budget for more promising ones.",
      correctAnswer: "True",
      explanation:
        "Successive Halving allocates a small budget to many configurations, eliminates the bottom half, doubles the budget for survivors, and repeats — focusing compute on promising configurations without running all to completion, achieving better resource efficiency than random search.",
      hints: [
        "Random search is unbiased but allocates equal compute to both good and bad configs.",
        "Hyperband runs multiple Successive Halving brackets to handle uncertainty about the minimum useful budget.",
      ],
    },
    {
      id: "q-opt-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Population Based Training (PBT) combines hyperparameter optimization with training by:",
      options: [
        "Training a population of models in parallel and selecting the best final model",
        "Periodically copying weights from better-performing models to worse ones and perturbing their hyperparameters during training",
        "Using an evolutionary algorithm to select hyperparameters before each training run",
        "Distilling knowledge from a population of models into a single smaller model",
      ],
      correctAnswer: 1,
      explanation:
        'PBT trains a population of models concurrently; periodically, the worst-performing workers "exploit" by copying weights from a better-performing worker and then "explore" by randomly perturbing hyperparameters — adapting both weights and hyperparameters jointly during training.',
      hints: [
        "PBT differs from hyperparameter search followed by training — it does both simultaneously.",
        'The "exploit" step copies model weights, not just hyperparameters — what advantage does that provide?',
      ],
    },
  ],

  "nas-opt": [
    {
      id: "q-opt-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DARTS (Differentiable Architecture Search) makes NAS computationally tractable by:",
      options: [
        "Using evolutionary algorithms to search the architecture space in parallel",
        "Relaxing the discrete architecture choices to continuous mixing weights and optimizing them via gradient descent",
        "Using a performance predictor trained on a subset of architectures to avoid full training",
        "Sharing weights across all architecture candidates in a supernet, then fine-tuning the selected architecture",
      ],
      correctAnswer: 1,
      explanation:
        "DARTS replaces discrete operation choices with a weighted mixture of all candidate operations, with mixing weights (architecture parameters α) optimized by gradient descent on the validation loss — making the search differentiable and orders of magnitude faster than RL or evolutionary NAS.",
      hints: [
        "Discrete choices are non-differentiable — how does making them continuous enable gradient-based search?",
        "At the end of DARTS, architecture parameters are discretized by taking argmax over the mixing weights.",
      ],
    },
    {
      id: "q-opt-kp25-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Weight-sharing supernets in NAS allow different sub-architectures to share parameters, dramatically reducing the cost of evaluating each candidate architecture.",
      correctAnswer: "True",
      explanation:
        "A one-shot supernet trains all candidate sub-architectures simultaneously with shared weights; any sub-architecture can be evaluated by sampling a path through the supernet without individual training, reducing evaluation cost from O(N × training_time) to O(training_time).",
      hints: [
        "Without weight sharing, you must train each candidate from scratch — what is the cost for thousands of architectures?",
        "The tradeoff: shared weights may not be optimal for any single sub-architecture — is the ranking still useful?",
      ],
    },
    {
      id: "q-opt-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Hardware-aware NAS (e.g., Once-for-All, MNasNet) differs from standard NAS by:",
      options: [
        "Searching for architectures that achieve the highest accuracy on a standard benchmark",
        "Incorporating hardware-specific latency or energy cost as an objective alongside accuracy, finding Pareto-optimal architectures for target devices",
        "Using hardware simulation to predict FLOPs without physical deployment",
        "Constraining the search space to architectures supported by specific hardware accelerators",
      ],
      correctAnswer: 1,
      explanation:
        "Hardware-aware NAS explicitly measures (or predicts) on-device latency, energy, or memory and optimizes a joint accuracy-efficiency objective for target hardware (mobile, edge, server), finding architectures that are Pareto-optimal for the deployment context.",
      hints: [
        "A model with fewer FLOPs is not always faster on real hardware — what does hardware-aware NAS measure instead?",
        "Different devices (iPhone, Pixel, server GPU) have different optimal architectures — hardware-awareness captures this.",
      ],
    },
  ],

  "rl-opt": [
    {
      id: "q-opt-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The REINFORCE algorithm (Monte Carlo policy gradient) estimates the policy gradient by:",
      options: [
        "Computing exact gradients of the expected return using the environment\'s dynamics model",
        "Using sampled trajectories to compute ∇log π(aₜ|sₜ) × Gₜ as an unbiased gradient estimate",
        "Minimizing the TD error between consecutive value function estimates",
        "Differentiating through the reward function to compute the policy gradient directly",
      ],
      correctAnswer: 1,
      explanation:
        "REINFORCE multiplies the log-probability gradient of each taken action by the return Gₜ from that timestep, producing an unbiased estimator of the true policy gradient via the log-derivative trick — but with high variance due to full Monte Carlo returns.",
      hints: [
        "The log-derivative trick converts E[∇f(x)] into E[f(x)·∇log p(x)] — how does that apply here?",
        "REINFORCE uses complete episode returns, not bootstrapped estimates — what does that mean for variance?",
      ],
    },
    {
      id: "q-opt-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Proximal Policy Optimization (PPO) clips the policy update ratio to prevent overly large policy changes that can destabilize training.",
      correctAnswer: "True",
      explanation:
        "PPO clips the probability ratio r(θ) = π_θ(a|s)/π_θold(a|s) within [1-ε, 1+ε] in the surrogate objective, preventing the new policy from deviating too far from the old one and ensuring stable on-policy training without trust region projections.",
      hints: [
        "Large policy updates can cause performance collapse in RL — how does clipping prevent that?",
        "PPO is a simpler alternative to TRPO that enforces a similar constraint through clipping rather than a constrained optimization.",
      ],
    },
    {
      id: "q-opt-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The advantage function A(s,a) = Q(s,a) - V(s) is used in actor-critic methods to:",
      options: [
        "Estimate the value of the current state for use in the critic update",
        "Reduce variance of the policy gradient by removing the state-dependent baseline from the return estimate",
        "Compute the temporal difference error for training the critic network",
        "Scale the entropy bonus to encourage exploration in proportion to state value",
      ],
      correctAnswer: 1,
      explanation:
        "The advantage function measures how much better action a is relative to the average action in state s; using A instead of Q as the gradient weight removes the high-variance baseline V(s) from the return, substantially reducing gradient variance without introducing bias.",
      hints: [
        "Why subtract V(s)? Think about what V(s) represents and whether it carries useful gradient information.",
        "The baseline subtraction trick: E[∇log π × V(s)] = 0 for any V(s) — it is unbiased to subtract it.",
      ],
    },
  ],

  "non-convex-opt": [
    {
      id: "q-opt-kp27-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Saddle points in non-convex optimization are characterized by:",
      options: [
        "All eigenvalues of the Hessian being positive, indicating a local minimum",
        "The gradient being zero but the Hessian having both positive and negative eigenvalues",
        "The loss being higher than all surrounding points in the loss landscape",
        "The gradient having exactly one zero component while all others are non-zero",
      ],
      correctAnswer: 1,
      explanation:
        "At a saddle point, the gradient is zero (first-order condition) but the Hessian has mixed-sign eigenvalues — the point is a minimum in some directions and a maximum in others, making it a critical point that is not a local minimum or maximum.",
      hints: [
        "A Hessian with all positive eigenvalues = local minimum; all negative = local maximum; mixed = saddle.",
        "In high-dimensional neural networks, saddle points are far more common than local minima.",
      ],
    },
    {
      id: "q-opt-kp27-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "For highly overparameterized neural networks, poor local minima (high-loss local minima) are rare, and most optimization challenges arise from saddle points and flat regions.",
      correctAnswer: "True",
      explanation:
        "Theoretical and empirical evidence suggests that in highly overparameterized networks, local minima are typically global (or near-global), while saddle points and flat regions are the primary obstacles to fast convergence.",
      hints: [
        "Think about what overparameterization means for the number of global minima — are there many?",
        "Goodfellow et al. and Dauphin et al. showed empirically that saddle points, not local minima, dominate optimization difficulties.",
      ],
    },
    {
      id: "q-opt-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "strict saddle" property, which SGD and perturbed gradient descent can provably escape, requires that:',
      options: [
        "All saddle points have at least one direction of negative curvature (a direction to escape)",
        "The function is convex in a neighborhood around every critical point",
        "The Hessian at every saddle point has at least one zero eigenvalue",
        "The gradient norm is bounded away from zero everywhere except at global minima",
      ],
      correctAnswer: 0,
      explanation:
        "A function satisfies the strict saddle property if every saddle point has at least one direction of strictly negative curvature (negative Hessian eigenvalue); perturbed gradient descent can escape these saddle points efficiently by adding noise that aligns with the negative curvature direction.",
      hints: [
        '"Strict" saddle means the escape direction is well-defined (not a degenerate flat saddle).',
        "If the Hessian has a negative eigenvalue at a saddle, small perturbations in that direction cause the loss to decrease.",
      ],
    },
  ],

  "zeroth-order-opt": [
    {
      id: "q-opt-kp28-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Zeroth-order optimization is necessary when:",
      options: [
        "The objective function is non-convex and has many local minima",
        "Gradients of the objective are unavailable (black-box setting) and only function evaluations are accessible",
        "The model is too large to fit the gradient computation in GPU memory",
        "The objective function changes over time and gradients become stale",
      ],
      correctAnswer: 1,
      explanation:
        "Zeroth-order (derivative-free) methods are used when gradient computation is impossible — for example, when the objective involves non-differentiable simulation, external APIs, or discrete operations — using only function evaluations to estimate update directions.",
      hints: [
        "When can\'t you compute gradients? Think about objectives involving external simulators or discrete actions.",
        "Examples: hyper-parameter tuning of non-differentiable pipelines, adversarial prompting of LLMs.",
      ],
    },
    {
      id: "q-opt-kp28-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Finite difference gradient estimation approximates the gradient by evaluating the function at perturbed points: (f(x+δeᵢ) - f(x)) / δ for each dimension i.",
      correctAnswer: "True",
      explanation:
        "Finite differences estimate partial derivatives by evaluating f at x+δeᵢ (one-sided) or (f(x+δeᵢ) - f(x-δeᵢ))/(2δ) (central differences) for each unit vector eᵢ, requiring d function evaluations for d-dimensional x — prohibitive for high-dimensional problems.",
      hints: [
        "The approximation approaches the true gradient as δ→0, but numerical noise increases — what is the tradeoff?",
        "For d=10⁶ parameters, how many function evaluations does finite differences require?",
      ],
    },
    {
      id: "q-opt-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Simultaneous Perturbation Stochastic Approximation (SPSA) reduces the cost of finite-difference gradient estimation from O(d) to O(1) function evaluations per step by:",
      options: [
        "Using automatic differentiation on a smooth approximation of the objective",
        "Perturbing all dimensions simultaneously with a random ±1 vector and computing a two-point gradient estimate",
        "Sampling a random subset of dimensions to perturb at each step",
        "Maintaining a low-rank approximation of the gradient across iterations",
      ],
      correctAnswer: 1,
      explanation:
        "SPSA uses a random perturbation vector Δ with ±1 entries and estimates the gradient as (f(x+cΔ) - f(x-cΔ))/(2c) × Δ⁻¹, requiring only 2 function evaluations per step regardless of dimension — at the cost of a noisy gradient estimate.",
      hints: [
        "Finite differences perturb one dimension at a time (d evaluations); SPSA perturbs all at once (2 evaluations).",
        "The Δ⁻¹ term distributes the scalar difference back to individual parameter dimensions.",
      ],
    },
  ],

  "continual-opt": [
    {
      id: "q-opt-kp29-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Catastrophic forgetting in continual learning occurs because:",
      options: [
        "The model\'s capacity is too small to store all tasks simultaneously",
        "Gradient updates for new tasks overwrite parameters that were important for previously learned tasks",
        "The learning rate is too high, causing the model to oscillate between task solutions",
        "Batch normalization statistics shift when the data distribution changes between tasks",
      ],
      correctAnswer: 1,
      explanation:
        "When training on a new task, SGD-based updates modify shared parameters to minimize the new task\'s loss, inadvertently increasing loss on old tasks whose training data is no longer available — this is catastrophic forgetting.",
      hints: [
        "Why does learning a new task hurt old task performance? Think about which parameters are modified.",
        "If old task data is not included in current training, what protects old task knowledge?",
      ],
    },
    {
      id: "q-opt-kp29-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Elastic Weight Consolidation (EWC) prevents catastrophic forgetting by penalizing changes to parameters that were important for previously learned tasks.",
      correctAnswer: "True",
      explanation:
        "EWC adds a quadratic penalty λΣᵢFᵢ(θᵢ - θ*ᵢ)² to the loss, where Fᵢ is the Fisher information (importance) of parameter i for old tasks and θ*ᵢ is the old optimal value — preventing important old-task parameters from being overwritten.",
      hints: [
        "EWC\'s penalty is weighted by Fisher information — what does high Fisher information mean for a parameter?",
        "The Fisher information estimates how sensitive the old task\'s output is to each parameter.",
      ],
    },
    {
      id: "q-opt-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Gradient Episodic Memory (GEM) prevents forgetting during continual learning by:",
      options: [
        "Replaying a random subset of old task examples in each mini-batch",
        "Projecting the new task\'s gradient onto a feasible region that does not increase the loss on stored episodic memory from old tasks",
        "Regularizing new task parameters with L2 distance from old task parameters",
        "Allocating separate network modules for each new task to prevent parameter interference",
      ],
      correctAnswer: 1,
      explanation:
        "GEM stores episodic memory (small example sets) from old tasks; if the current gradient would increase loss on any stored memory, it is projected onto the intersection of halfspaces defined by the constraint that old-task losses do not increase — ensuring forward transfer while preventing backward interference.",
      hints: [
        "GEM\'s constraint: the update gradient must not increase loss on old-task memory examples.",
        "Projection finds the nearest gradient to the unconstrained one that satisfies all memory constraints.",
      ],
    },
  ],

  "opt-for-llms": [
    {
      id: "q-opt-kp30-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Maximal Update Parametrization (μP / muP) enables hyperparameter transfer by:",
      options: [
        "Scaling all learning rates to be proportional to the square root of model depth",
        "Ensuring that the feature scale, gradient scale, and update scale are each width-independent, so hyperparameters optimized on a small model transfer to large models",
        "Normalizing weights layer-by-layer to maintain constant activation variance at any width",
        "Using a fixed global learning rate that does not need to be retuned as model size scales",
      ],
      correctAnswer: 1,
      explanation:
        "muP (Yang et al.) defines per-parameter learning rate scaling rules derived from infinite-width limits that keep activations, gradients, and updates O(1) regardless of model width — enabling optimal hyperparameters found on a small model to be reused for billion-parameter models.",
      hints: [
        "The key problem muP solves: tuning hyperparameters on a small proxy model, then using them for the large model.",
        "Standard parametrization causes optimal learning rates to shift with model size — muP prevents this.",
      ],
    },
    {
      id: "q-opt-kp30-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "ZeRO-Offload extends ZeRO optimizer by offloading optimizer states and gradients to CPU memory, enabling training of models larger than GPU VRAM.",
      correctAnswer: "True",
      explanation:
        "ZeRO-Offload offloads Adam optimizer states (32-bit master weights, momentum, variance) and gradients to CPU RAM, where CPU optimizer steps are performed; only FP16 model parameters and activations remain on GPU, enabling 10× larger model training on the same GPU.",
      hints: [
        "Optimizer states are often 3× the model size in Adam — what does offloading them enable?",
        "The CPU has much more RAM than GPU VRAM — ZeRO-Offload exploits this.",
      ],
    },
    {
      id: "q-opt-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Gradient noise scale (GNS) as a training diagnostic for LLMs indicates the optimal batch size to use by:",
      options: [
        "Measuring the signal-to-noise ratio of stochastic gradients, with high GNS suggesting smaller batches are more efficient",
        "Estimating the ratio of gradient variance to gradient mean squared norm, where a GNS above the current batch size suggests batch size can be increased profitably",
        "Computing the norm of gradient fluctuations across training steps to detect instability",
        "Measuring the Hessian-to-gradient norm ratio to determine when to switch from SGD to second-order methods",
      ],
      correctAnswer: 1,
      explanation:
        "GNS (McCandlish et al.) equals B_simple / B_noise where B_noise = Σ_gradient_variance / ||gradient_mean||²; when the batch size B < GNS, increasing B reduces gradient noise and is compute-efficient; when B > GNS, further increases give diminishing returns.",
      hints: [
        'GNS provides a principled answer to "how large should the batch size be?"',
        "When batch size is much smaller than GNS, the gradient is noisy — increasing batch size helps; above GNS, you are paying for compute without proportional benefit.",
      ],
    },
  ],
};

const moreOptQ: Record<string, Question[]> = {
  "lion-optimizer-v2": [
    { id: "q-opt-kp31-1", type: "multiple-choice", difficulty: "medium", question: "The Lion optimizer (EvoLved Sign Momentum) updates parameters using only the sign of the gradient momentum. Its key advantage over Adam is:", options: ["Lion always converges faster than Adam on all tasks", "Lion uses constant step sizes (sign updates), reducing memory from 2× to 1× extra state over SGD while matching or exceeding Adam on LLM pre-training", "Lion has no hyperparameters", "Lion requires second-order gradient information"], correctAnswer: 1, explanation: "Lion discovered via program search updates w ← w - lr·sign(β₁·m + (1-β₁)·g) and then m ← β₂·m + (1-β₂)·g. It stores only one momentum buffer (vs Adam's two: m and v), halving optimizer memory, and its sign updates give uniform step sizes — beneficial for large batch LLM training.", hints: ["Adam stores both first moment m and second moment v — Lion drops v entirely.", "Sign updates mean Lion is more aggressive: all parameters move the same distance per step."] },
    { id: "q-opt-kp31-2", type: "true-false", difficulty: "medium", question: "The sign of the gradient (used in Lion and sign-SGD) has bounded norm regardless of the gradient magnitude, making sign-based optimizers more robust to gradient scale variation.", correctAnswer: "True", explanation: "sign(g) ∈ {-1,0,+1}^d has L∞ norm = 1 always, regardless of gradient magnitude. This robustness to scale makes sign-based methods effective when gradients vary widely across layers (common in large transformers).", hints: ["Adam's v term normalizes gradient scale explicitly; Lion achieves similar effect via sign.", "Distributed training: sign(g) can be communicated with 1 bit per parameter — used in 1-bit Adam."] },
    { id: "q-opt-kp31-3", type: "multiple-choice", difficulty: "hard", question: "Lion's update rule has a decoupled weight decay form similar to AdamW. Why is decoupled weight decay (not L2 regularization) important for adaptive optimizers?", options: ["Decoupled weight decay is identical to L2 in all cases", "In Adam/Lion, L2 regularization λ‖w‖² adds λw to the gradient, which gets scaled by the adaptive term — decoupled weight decay applies λw directly to weights, maintaining the regularization strength independent of gradient magnitude", "Decoupled weight decay reduces memory usage", "L2 regularization causes gradient explosion in transformers"], correctAnswer: 1, explanation: "With Adam, adding L2 to the loss means the weight penalty gradient λw gets adaptively scaled by 1/√v̂, so weights with small historical gradients (features rarely activated) are under-regularized. Decoupled weight decay (AdamW, LionW) applies λ·w after the adaptive update, maintaining uniform regularization.", hints: ["Ilya Loshchilov's AdamW paper showed decoupled WD consistently outperforms L2 for transformers.", "The difference matters most for sparse/irregular features with near-zero historical gradients."] },
  ],
  "frank-wolfe": [
    { id: "q-opt-kp32-1", type: "multiple-choice", difficulty: "hard", question: "The Frank-Wolfe (conditional gradient) algorithm minimizes f(x) over a convex set C by solving a linear minimization oracle (LMO) at each step. Its advantage over projected gradient descent is:", options: ["Frank-Wolfe always converges faster than projected gradient", "Frank-Wolfe avoids projections onto C (potentially expensive) by instead solving linear problems over C, and its iterates are sparse convex combinations of extreme points of C", "Frank-Wolfe requires no convexity assumptions", "Frank-Wolfe uses second-order information"], correctAnswer: 1, explanation: "For structured constraint sets (e.g., nuclear norm ball, simplex, flow polytopes), the LMO is much cheaper than projection. Frank-Wolfe produces solutions as convex combinations of at most t extreme points after t iterations — giving sparse structured solutions naturally (e.g., low-rank matrices for nuclear norm constraints).", hints: ["LMO: min_{s∈C} ⟨∇f(x), s⟩ — a linear program over C, which is cheap for many structured sets.", "On the simplex, the LMO is just finding the coordinate with the most negative gradient — O(n)."] },
    { id: "q-opt-kp32-2", type: "true-false", difficulty: "medium", question: "Frank-Wolfe converges at rate O(1/t) for convex smooth objectives (same as gradient descent), but unlike gradient descent it does not require a projection step.", correctAnswer: "True", explanation: "Frank-Wolfe achieves O(1/t) convergence for L-smooth convex f, matching gradient descent's rate but using the cheaper LMO instead of projection. For strongly convex f with exact line search, variants achieve linear convergence. The projection-free property is the key computational advantage.", hints: ["Convergence gap at step t: f(xₜ) - f* ≤ 2L·diam(C)²/t where diam(C) is the diameter of C.", "Variants like Away-Frank-Wolfe and Pairwise-FW achieve linear convergence for strongly convex f."] },
    { id: "q-opt-kp32-3", type: "multiple-choice", difficulty: "hard", question: "In matrix completion (collaborative filtering), why is Frank-Wolfe with the nuclear norm ball constraint preferred over projected gradient descent?", options: ["Frank-Wolfe is faster for all matrix problems", "Projecting onto the nuclear norm ball requires full SVD (O(mn·min(m,n))), while the Frank-Wolfe LMO requires only the top singular vector pair (O(mn) via power iteration)", "Frank-Wolfe guarantees exact recovery of the matrix", "Frank-Wolfe requires no regularization"], correctAnswer: 1, explanation: "The nuclear norm ball LMO min_{‖M‖_* ≤ τ} ⟨G,M⟩ is solved by the rank-1 matrix -τ·u₁v₁^T (top left/right singular vectors of G). This costs O(mn) via power iteration vs O(mn·min(m,n)) for full SVD needed in projection — a massive speedup for large matrices.", hints: ["Projection onto ‖M‖_* ≤ τ requires computing all singular values and soft-thresholding them.", "Frank-Wolfe produces low-rank iterates (rank grows by 1 per step) — ideal for low-rank matrix recovery."] },
  ],
  "proximal-methods-v2": [
    { id: "q-opt-kp33-1", type: "multiple-choice", difficulty: "medium", question: "The proximal operator of a function g is defined as prox_{λg}(v) = argmin_x {g(x) + (1/2λ)‖x-v‖²}. For g(x) = ‖x‖₁ (LASSO), the proximal operator is:", options: ["Hard thresholding: x = v·𝟙[|v| > λ]", "Soft thresholding: x = sign(v)·max(|v|-λ, 0)", "Projection onto ℓ₁ ball", "No closed form exists"], correctAnswer: 1, explanation: "The proximal operator of the ℓ₁ norm is soft-thresholding: prox_{λ‖·‖₁}(v)ᵢ = sign(vᵢ)·max(|vᵢ|-λ, 0). It shrinks entries toward zero and sets small entries exactly to zero — the origin of LASSO's sparsity.", hints: ["Soft-thresholding shrinks all entries by λ: entries with |vᵢ| ≤ λ become exactly 0.", "Hard thresholding (for ℓ₀) zeros out small entries but keeps large ones unchanged — not the proximal op of ℓ₁."] },
    { id: "q-opt-kp33-2", type: "true-false", difficulty: "medium", question: "The proximal gradient method (ISTA) for minimizing f(x) = h(x) + g(x) where h is smooth and g is convex (possibly non-smooth) converges at rate O(1/t), while FISTA (Fast ISTA with Nesterov acceleration) converges at O(1/t²).", correctAnswer: "True", explanation: "ISTA: xₜ₊₁ = prox_{λg}(xₜ - λ∇h(xₜ)), converging at O(1/t). FISTA adds a momentum term yₜ = xₜ + (t-1)/(t+2)·(xₜ - xₜ₋₁), achieving O(1/t²) — the optimal rate for first-order methods on convex problems. FISTA is the standard algorithm for LASSO and sparse recovery.", hints: ["FISTA was introduced by Beck and Teboulle (2009) — a landmark in optimization.", "The momentum coefficient (t-1)/(t+2) → 1 as t → ∞, making the update increasingly aggressive."] },
    { id: "q-opt-kp33-3", type: "multiple-choice", difficulty: "hard", question: "ADMM (Alternating Direction Method of Multipliers) decomposes the optimization into subproblems for each variable, alternating updates. Its key advantage for distributed ML is:", options: ["ADMM requires no hyperparameter tuning", "ADMM decomposes the objective across machines/devices, with each subproblem solved locally and coordination via shared dual variables — enabling distributed optimization with cheap communication", "ADMM always converges faster than gradient descent", "ADMM is only applicable to linear programs"], correctAnswer: 1, explanation: "ADMM minimizes f(x) + g(z) subject to Ax + Bz = c via alternating x-update (minimize augmented Lagrangian w.r.t. x), z-update (minimize w.r.t. z), and dual update. Each node can hold its own subproblem; consensus ADMM distributes ML training across machines with O(1) communication per round.", hints: ["ADMM's augmented Lagrangian: L_ρ(x,z,λ) = f(x) + g(z) + λ^T(Ax+Bz-c) + ρ/2‖Ax+Bz-c‖².", "Boyd et al.'s 2011 ADMM tutorial is one of the most cited papers in optimization."] },
  ],
  "bilevel-optimization": [
    { id: "q-opt-kp34-1", type: "multiple-choice", difficulty: "hard", question: "Bilevel optimization has the form min_θ f(θ, x*(θ)) where x*(θ) = argmin_x g(x,θ). In meta-learning (MAML), θ are meta-parameters and x*(θ) are task-adapted parameters. Computing the gradient ∂f/∂θ requires:", options: ["Only the outer gradient ∂f/∂θ", "The implicit function theorem to compute dx*/dθ = -(∂²g/∂x²)⁻¹·(∂²g/∂x∂θ) — requiring second-order derivatives", "A single forward pass through the inner problem", "No gradient computation — bilevel problems use zero-order methods only"], correctAnswer: 1, explanation: "The hypergradient ∂f/∂θ = ∂f/∂x·(dx*/dθ) + ∂f/∂θ, where dx*/dθ comes from the implicit function theorem (IFT). Computing the IFT requires solving a linear system with the inner Hessian ∂²g/∂x² — expensive but exact. Approximations (finite-step unrolling, Neumann series) are used in practice.", hints: ["MAML approximates bilevel optimization with T inner gradient steps and differentiates through them (unrolling).", "iMAML uses the IFT approach, avoiding unrolling and memory issues of long inner loops."] },
    { id: "q-opt-kp34-2", type: "true-false", difficulty: "medium", question: "Hyperparameter optimization (HPO) via gradient descent on validation loss is an example of bilevel optimization where the outer problem optimizes hyperparameters and the inner problem trains the model.", correctAnswer: "True", explanation: "In gradient-based HPO (e.g., DARTS for NAS, BOHB), the outer objective is validation loss as a function of hyperparameters λ, and the inner objective is training loss minimized over model weights w(λ). The hypergradient ∂L_val/∂λ is computed via unrolling or IFT.", hints: ["DARTS (Differentiable Architecture Search) uses bilevel optimization to search neural architectures.", "The practical challenge: inner loop convergence is approximate, making the hypergradient biased."] },
    { id: "q-opt-kp34-3", type: "multiple-choice", difficulty: "hard", question: "In the MAML (Model-Agnostic Meta-Learning) bilevel formulation, the first-order approximation FOMAML ignores second-order terms. Compared to full MAML, FOMAML:", options: ["Always performs worse than MAML due to the approximation", "Often performs comparably to MAML while being 2-5× cheaper, as the second-order terms often contribute little in practice", "Is equivalent to MAML for any problem", "Cannot be used for few-shot learning"], correctAnswer: 1, explanation: "FOMAML drops the Hessian terms, computing gradients of the final inner-loop parameter directly (as if stop_gradient were applied after inner steps). Empirically it matches full MAML on most benchmarks at significantly lower cost — suggesting the Hessian correction is small for typical meta-learning problems.", hints: ["Reptile (Nichol et al.) is another first-order meta-learning method that averages inner parameters.", "The Hessian-free approach: simply differentiate through the last inner gradient step only."] },
  ],
  "stochastic-variance-reduction": [
    { id: "q-opt-kp35-1", type: "multiple-choice", difficulty: "hard", question: "SVRG (Stochastic Variance Reduced Gradient) achieves linear convergence for strongly convex functions, unlike SGD which converges at O(1/t). SVRG's key innovation is:", options: ["Using a larger batch size than SGD", "Periodically computing the full gradient μ̃ at a snapshot w̃, then correcting stochastic updates as: ∇fᵢ(w) - ∇fᵢ(w̃) + μ̃, reducing gradient variance to zero at optimum", "Adapting the learning rate based on gradient history", "Using momentum with a decaying coefficient"], correctAnswer: 1, explanation: "SVRG's variance-reduced gradient estimator has zero variance at the optimum (since ∇fᵢ(w*) - ∇fᵢ(w̃) + μ̃ → 0 as w → w* and w̃ → w*). This allows using a constant learning rate and achieves linear (geometric) convergence for strongly convex f — unlike SGD which needs decaying lr.", hints: ["SVRG requires one full gradient pass per epoch (for μ̃) plus n corrected stochastic updates.", "SARAH and SPIDER are variance-reduction methods with even better complexity for non-convex optimization."] },
    { id: "q-opt-kp35-2", type: "true-false", difficulty: "medium", question: "SAG (Stochastic Average Gradient) stores the most recent gradient for each training sample and updates using the average of stored gradients. This requires O(n·d) memory for n samples and d dimensions.", correctAnswer: "True", explanation: "SAG maintains a table of the last computed gradient for each training example — n vectors of dimension d. This O(nd) memory is the main drawback vs SVRG (which uses O(d)). SAGA (an unbiased variant) has the same memory cost but better theoretical properties.", hints: ["For n=10M samples and d=1000 dimensions: SAG needs 10⁴ GB — impractical for large datasets.", "SVRG avoids this by using a periodic full gradient snapshot instead of per-sample storage."] },
    { id: "q-opt-kp35-3", type: "multiple-choice", difficulty: "hard", question: "For non-convex objectives (like neural network training), variance reduction methods (SVRG, SARAH) provide which improvement over SGD?", options: ["They guarantee convergence to the global minimum", "They achieve O(n^{2/3}/ε) gradient complexity to reach an ε-stationary point, vs O(1/ε²) for SGD — fewer gradient evaluations for the same stationarity guarantee", "They eliminate the need for momentum", "They converge at the same rate as SGD for non-convex problems"], correctAnswer: 1, explanation: "For non-convex optimization, SPIDER/SARAH achieve O(n^{1/2}/ε² + 1/ε^3) gradient complexity vs O(1/ε⁴) for vanilla SGD. The improvement is significant for large n (many training examples). However, per-iteration overhead and full gradient computation costs often make Adam/SGD+momentum competitive in practice.", hints: ["Non-convex guarantees are for ε-stationary points (‖∇f‖ ≤ ε), not global minima.", "SPIDER combines SVRG-style snapshots with a recursive estimator, achieving near-optimal complexity."] },
  ],
  "zeroth-order-optimization": [
    { id: "q-opt-kp36-1", type: "multiple-choice", difficulty: "hard", question: "Zeroth-order (derivative-free) optimization estimates gradients using only function evaluations. The two-point gradient estimator approximates ∇f(x) ≈ (d/2σ)·[f(x+σu) - f(x-σu)]·u for random direction u. Its variance scales as:", options: ["O(d) independent of problem dimension", "O(d/σ²)·Var(f), meaning variance grows with dimension d and shrinks with smoothing radius σ", "O(1/d) — variance decreases with dimension", "O(d²) due to coordinate interactions"], correctAnswer: 1, explanation: "The two-point estimator's variance ≈ (d²/σ²)·‖∇f‖² — the d factor reflects the difficulty of gradient estimation in high dimensions. This is why zeroth-order methods require O(d/ε²) function evaluations vs O(1/ε²) for first-order methods — the 'dimension gap' of derivative-free optimization.", hints: ["Smoothed gradient estimator: ∇f_σ(x) = E_u[(f(x+σu)-f(x))/σ · u] for u~N(0,I).", "Evolution Strategies (ES) and CMA-ES use populations to estimate gradients — same core idea."] },
    { id: "q-opt-kp36-2", type: "true-false", difficulty: "medium", question: "Bayesian Optimization uses a surrogate model (typically a Gaussian process) to model the objective function and an acquisition function (e.g., Expected Improvement) to select the next evaluation point — making it sample-efficient for expensive black-box optimization.", correctAnswer: "True", explanation: "Bayesian Optimization builds a GP surrogate of f(x) from observed (xᵢ, f(xᵢ)) pairs. The acquisition function (EI, UCB, Thompson sampling) trades off exploration/exploitation to select the next x. Effective for hyperparameter tuning with expensive evaluations (training neural networks).", hints: ["EI: E[max(f(x)-f*, 0)] — expected improvement over current best f*.", "BO scales poorly to >20 dimensions — high-dimensional BO is an active research area."] },
    { id: "q-opt-kp36-3", type: "multiple-choice", difficulty: "hard", question: "Evolution Strategies (ES) as used in OpenAI's 2017 paper for RL optimization estimate the gradient as ∇_θ E[f(θ+σε)] ≈ (1/nσ)·Σᵢ f(θ+σεᵢ)·εᵢ. The practical advantage over policy gradient (REINFORCE) is:", options: ["ES is unbiased while REINFORCE is biased", "ES is trivially parallelizable (each ε perturbation is independent), requires no backpropagation, and only communicates scalar rewards — making it efficient at massive scale with many workers", "ES always achieves better sample efficiency than REINFORCE", "ES doesn't require defining a policy network"], correctAnswer: 1, explanation: "With n=1000 workers each evaluating one perturbation, ES achieves wallclock speedup of 1000× while communicating only n scalars (rewards) + shared random seeds. No gradient backpropagation needed — making it compatible with any black-box simulator. Policy gradient requires backprop through the policy network.", hints: ["OpenAI's ES paper used 1440 CPU cores and achieved near-linear speedup.", "Communication cost: each worker sends 1 scalar (reward) and uses a shared random seed to reconstruct εᵢ."] },
  ],
  "convergence-theory-v2": [
    { id: "q-opt-kp37-1", type: "multiple-choice", difficulty: "hard", question: "For gradient descent on an L-smooth convex function with step size η = 1/L, the convergence rate is:", options: ["Linear (geometric): f(xₜ) - f* ≤ (1-μ/L)^t·(f(x₀)-f*)", "Sublinear: f(xₜ) - f* ≤ L‖x₀-x*‖²/(2t)", "O(1/t²) via Nesterov acceleration", "Logarithmic: f(xₜ) - f* ≤ log(t)·C"], correctAnswer: 1, explanation: "For L-smooth convex f (not strongly convex), GD with η=1/L achieves f(xₜ) - f* ≤ L‖x₀-x*‖²/(2t) = O(1/t). This is the standard convergence result. Strong convexity (μ > 0) gives linear convergence O((1-μ/L)^t). Nesterov acceleration gives O(1/t²) for the convex case.", hints: ["The condition number κ = L/μ determines the linear convergence rate for strongly convex f.", "Nesterov's O(1/t²) rate is optimal for first-order methods on smooth convex functions."] },
    { id: "q-opt-kp37-2", type: "true-false", difficulty: "medium", question: "The Polyak-Łojasiewicz (PL) inequality — ½‖∇f(x)‖² ≥ μ(f(x)-f*) — is weaker than strong convexity but still guarantees linear convergence of gradient descent without requiring the function to be convex.", correctAnswer: "True", explanation: "PL condition holds for some non-convex functions (including overparameterized linear models and some neural networks). GD converges linearly under PL even without convexity — explaining empirical fast convergence observed for overparameterized neural networks in practice.", hints: ["Strong convexity implies PL with the same constant μ, but PL does not imply convexity.", "Neural network loss on linear models and random features satisfies PL in the overparameterized regime."] },
    { id: "q-opt-kp37-3", type: "multiple-choice", difficulty: "hard", question: "For stochastic gradient descent with learning rate ηₜ = O(1/t) (decaying), the convergence rate for convex objectives is:", options: ["O(log t / t)", "O(1/√t)", "O(1/t)", "O(1/t²)"], correctAnswer: 0, explanation: "SGD with η_t = c/t achieves O(log t / t) convergence (or O(1/t) with careful analysis) for strongly convex problems — faster than the O(1/√t) achievable with constant learning rate. The decaying rate is necessary for convergence since constant-lr SGD oscillates around the optimum with variance proportional to lr²·σ².", hints: ["With constant lr η: SGD converges to within O(η·σ²/μ) of f*, not to f* itself.", "The optimal SGD rate for strongly convex f is O(1/t) — achieved by Polyak-Ruppert averaging."] },
  ],
  "optimizer-hyperparameters": [
    { id: "q-opt-kp38-1", type: "multiple-choice", difficulty: "medium", question: "The Adam optimizer has three main hyperparameters: learning rate α, β₁ (first moment decay), and β₂ (second moment decay). Typical defaults are α=0.001, β₁=0.9, β₂=0.999. The bias correction terms (1-β₁^t) and (1-β₂^t) are needed because:", options: ["They prevent gradient explosion", "Without bias correction, the moment estimates are biased toward zero in early iterations (since m₀=v₀=0), causing too-small effective step sizes at the start of training", "They enforce the learning rate schedule", "They normalize the gradient to unit norm"], correctAnswer: 1, explanation: "Adam initializes m₀=v₀=0. Early in training, m̂ₜ = mₜ/(1-β₁^t) and v̂ₜ = vₜ/(1-β₂^t) correct for the fact that mₜ and vₜ start near zero and need many steps to warm up. Without correction, steps would be tiny at t=1 (effectively lr·(1-β₁) instead of lr), slowing early training.", hints: ["At t=1: 1-β₁^1 = 0.1 and 1-β₂^1 = 0.001 — without correction, the second moment estimate is 1000× too small.", "After enough steps (t≫1/(1-β)), the correction factors approach 1 and become irrelevant."] },
    { id: "q-opt-kp38-2", type: "true-false", difficulty: "medium", question: "Warm-up learning rate schedules (linearly increasing lr from 0 to peak over the first few thousand steps) are particularly important for Adam-based training of transformers because cold starts with large lr cause instability in the Adam second moment estimate.", correctAnswer: "True", explanation: "At initialization, Adam's second moment estimate v is small (near zero), making the effective step size α/√v̂ large and unstable. Warm-up gives v time to stabilize before large steps are taken. This was identified as crucial for training BERT and GPT models — the 'Adam warm-up trick'.", hints: ["Without warm-up, large initial steps can push parameters into bad regions that are hard to recover from.", "Warm-up duration is typically 4-10% of total training steps for LLMs."] },
    { id: "q-opt-kp38-3", type: "multiple-choice", difficulty: "hard", question: "The optimal learning rate for SGD scales as η ∝ batch_size / n (linear scaling rule, Goyal et al.). When batch size is increased 8×, the recommended adjustment is:", options: ["Decrease lr by 8×", "Increase lr by 8× while keeping other hyperparameters fixed", "Keep lr the same and increase momentum", "Increase lr by √8 (square-root scaling)"], correctAnswer: 1, explanation: "The linear scaling rule: each SGD step with B examples approximates B/n of the gradient, so increasing B by k× makes each step k× more informative — equivalent to scaling lr by k×. This allows training with large batch sizes without accuracy loss, with a warm-up phase when scaling is very large (e.g., 8192 batch).", hints: ["Facebook's ResNet-in-1-hour paper validated the linear scaling rule empirically for ImageNet.", "For very large batch sizes (>32K), the linear rule breaks down and square-root scaling works better."] },
  ],
  "landscape-theory": [
    { id: "q-opt-kp39-1", type: "multiple-choice", difficulty: "hard", question: "In overparameterized neural networks, the loss landscape often has many global minima. The concept of 'implicit regularization' of SGD refers to:", options: ["SGD explicitly adds a regularization term to the loss", "SGD with small batch sizes and learning rate implicitly biases the solution toward flat minima or minimum-norm solutions, even without explicit regularization", "SGD regularizes by randomly dropping neurons", "SGD finds saddle points rather than minima"], correctAnswer: 1, explanation: "In overparameterized settings, there are many global minima. SGD (especially with small batches and label noise) implicitly prefers flat minima (low trace of Hessian) or minimum L2 norm solutions. This implicit bias — not weight decay — may explain deep learning generalization.", hints: ["Flat minima generalize better: small perturbation of weights causes small loss increase.", "Cohen et al. showed SGD bias toward low-curvature solutions; Wilson et al. argued for SGD over Adam for generalization."] },
    { id: "q-opt-kp39-2", type: "true-false", difficulty: "medium", question: "Saddle points (where the gradient is zero but the Hessian has both positive and negative eigenvalues) are the primary obstacle to convergence in neural network training, more problematic than local minima.", correctAnswer: "True", explanation: "For high-dimensional non-convex objectives, local minima with values above the global minimum are exponentially rare (Dauphin et al.). Instead, saddle points proliferate — the Hessian has O(d) saddle directions. Gradient descent with noise (SGD) and momentum efficiently escapes saddle points, explaining deep learning's empirical success.", hints: ["A saddle point in d dimensions has at least one negative curvature direction — GD can escape via perturbation.", "Strict saddle functions (all saddle points are strict, i.e., have at least one strongly negative curvature direction) are efficiently optimized by noisy GD."] },
    { id: "q-opt-kp39-3", type: "multiple-choice", difficulty: "hard", question: "The Edge of Stability (EoS) phenomenon observed in neural network training refers to:", options: ["Networks becoming numerically unstable and diverging", "Training with large learning rates causes the sharpness (max Hessian eigenvalue) to rise to 2/η and then remain there, with the loss still decreasing despite classical instability predictions", "Gradient clipping preventing progress near convergence", "The loss plateauing at a saddle point before decreasing"], correctAnswer: 1, explanation: "Cohen et al. (2021) observed that with large fixed lr η, the sharpness λ_max(∇²L) rises to ~2/η (the classical instability threshold) and then stabilizes — 'progressive sharpening then edge of stability.' Training continues with oscillating but decreasing loss. This violates classical smooth optimization theory and suggests a self-regulatory mechanism.", hints: ["Classical analysis: GD stable iff η < 2/L where L = Lipschitz constant of gradient (max eigenvalue of Hessian).", "EoS suggests training operates at the edge of instability, using mild oscillations to navigate the landscape."] },
  ],
  "landscape-theory-ii": [
    { id: "q-opt-kp40-1", type: "multiple-choice", difficulty: "medium", question: "Loss of Plasticity in continual learning refers to neural networks gradually losing the ability to learn new tasks as training progresses. One mechanism is:", options: ["Gradients becoming too large for new tasks", "Dead neurons and saturated activations accumulate over time, reducing the effective capacity of the network — addressed by periodic reinitialization or L2 regularization toward zero (regenerative regularization)", "The loss landscape becoming convex over time", "Learning rate schedules that decay to zero"], correctAnswer: 1, explanation: "As training proceeds, a fraction of ReLU neurons die (permanently output zero) or saturate, reducing the effective parameter count available for new learning. Kumar et al. showed periodic reinitialization of dead neurons (with careful weight regeneration) restores plasticity. Continual learning research increasingly focuses on this optimization-side failure.", hints: ["Dead ReLU neurons: the pre-activation is always negative, gradient never flows, weight never updates.", "L2 regularization toward 0 (not toward initial weights) acts like a weak reinitialization, restoring plasticity."] },
    { id: "q-opt-kp40-2", type: "true-false", difficulty: "medium", question: "Gradient clipping by global norm (clip_by_global_norm) scales ALL gradients simultaneously so the global L2 norm equals the clip threshold, preserving the relative direction of the gradient vector across all parameters.", correctAnswer: "True", explanation: "Global norm clipping: if ‖g‖₂ > c, set g ← g·c/‖g‖₂. All parameters are scaled by the same factor, so relative gradient directions are preserved. This differs from per-parameter clipping (which independently clips each weight's gradient, distorting the gradient direction).", hints: ["PyTorch: torch.nn.utils.clip_grad_norm_(parameters, max_norm) implements global norm clipping.", "Per-layer clipping clips each layer's gradient independently — used less commonly in LLM training."] },
    { id: "q-opt-kp40-3", type: "multiple-choice", difficulty: "hard", question: "Muon optimizer (momentum + orthogonalization via Nesterov + Newton-Schulz) orthogonalizes the gradient update using the Newton-Schulz iteration. Its motivation from optimization theory is:", options: ["Orthogonal updates have zero gradient, preventing learning", "Orthogonalizing the weight gradient update is equivalent to steepest descent under the spectral norm (operator norm) metric rather than the Euclidean metric — giving updates that efficiently use the matrix's degrees of freedom", "Orthogonalization reduces memory usage by 50%", "Muon only applies to attention weight matrices"], correctAnswer: 1, explanation: "Muon whitens/orthogonalizes gradient matrices via Newton-Schulz: G_orth ≈ G(GᵀG)^{-1/2}. This is steepest descent under the Frobenius inner product on the Stiefel manifold — theoretically justified as the natural gradient for matrix-valued parameters. It improves training stability for linear layers in transformers.", hints: ["Newton-Schulz iteration: X ← 1.5X - 0.5XXᵀX converges to the matrix sign/polar factor.", "Muon combines Nesterov momentum with gradient orthogonalization — practical and theoretically grounded."] },
  ],
};

Object.assign(questions, moreOptQ);

registerQuestions(questions);
export default questions;
