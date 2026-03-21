import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  perceptron: [
    {
      id: "q-dl-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A single perceptron computes y = step(w \\cdot x + b). Which function class can it perfectly represent?",
      options: [
        "Any Boolean function with enough weights",
        "Only linearly separable functions - those where a single hyperplane separates the two classes",
        "Any continuous function on a compact domain",
        "Any function that can be represented as a polynomial",
      ],
      correctAnswer: 1,
      explanation:
        "A perceptron\'s decision boundary is the hyperplane w \\cdot x + b = 0. It can only classify inputs that are linearly separable. XOR, for example, cannot be separated by a single line and is famously beyond the perceptron\'s capacity.",
      hints: [
        "Try to draw a single straight line separating XOR outputs: (0,0)\\to0, (0,1)\\to1, (1,0)\\to1, (1,1)\\to0. It\'s impossible.",
        "The decision boundary of any linear model is always a hyperplane - one flat surface dividing the space.",
      ],
    },
    {
      id: "q-dl-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A single perceptron can learn to classify data that is not linearly separable, such as the XOR function.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "A single perceptron can only represent linear decision boundaries. XOR is not linearly separable - no single hyperplane correctly separates the four XOR input points. This fundamental limitation, publicized by Minsky and Papert (1969), motivated multi-layer networks.",
      hints: [
        "XOR: (0,0)\\to0, (0,1)\\to1, (1,0)\\to1, (1,1)\\to0. Plot these points colored by output - you cannot separate them with one line.",
        'This limitation caused the first "AI winter" and motivated the development of multi-layer perceptrons.',
      ],
    },
    {
      id: "q-dl-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The perceptron convergence theorem guarantees convergence only when training data is linearly separable. If it is NOT linearly separable, what happens?",
      options: [
        "The algorithm converges to the best linear approximation",
        "The algorithm cycles indefinitely, never converging to a stable set of weights",
        "The algorithm converges after exactly n\\cdotd iterations (n samples, d features)",
        "The algorithm converges but with higher training error than a logistic regression",
      ],
      correctAnswer: 1,
      explanation:
        "The perceptron update rule (w \\leftarrow w + y\\cdotx on misclassified samples) is guaranteed to converge only if the data is linearly separable. On non-separable data, it cycles indefinitely - there is no stable weight vector that classifies all samples correctly.",
      hints: [
        "The convergence theorem\'s proof relies on the existence of a separating hyperplane - if none exists, the proof breaks down.",
        "This is why gradient-descent-based methods with smooth losses (logistic regression) are preferred for non-separable data.",
      ],
    },
  ],

  backpropagation: [
    {
      id: "q-dl-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a neural network with L layers, backpropagation computes the gradient of the loss with respect to layer-ℓ weights as a product of L − ℓ Jacobians. What mathematical property of calculus makes this possible?",
      options: [
        "Fourier Transform",
        "The chain rule of calculus: $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$",
        "Bayes' theorem",
        "Gaussian elimination",
      ],
      correctAnswer: 1,
      explanation:
        "Backpropagation applies the chain rule of calculus recursively. As described in d2l.ai §5.3, the gradient of the loss with respect to layer ℓ\'s weights equals the product of all Jacobians from layer ℓ+1 to the output, multiplied by the local gradient - a chain of derivatives applied backward through the computational graph. Concretely:\n\n\\[\n\\frac{\\partial L}{\\partial W^{(\\ell)}} = \\frac{\\partial L}{\\partial h^{(L)}} \\cdot \\frac{\\partial h^{(L)}}{\\partial h^{(L-1)}} \\cdot \\cdots \\cdot \\frac{\\partial h^{(\\ell+1)}}{\\partial h^{(\\ell)}} \\cdot \\frac{\\partial h^{(\\ell)}}{\\partial W^{(\\ell)}}.\n\\]\n\nEach factor in the product is a Jacobian matrix; their sequential multiplication is exactly the chain rule applied recursively through the network.",
      hints: [
        "To find how a small change in a weight at layer 1 affects the final loss in a 10-layer network, you must chain together the derivatives through all 9 intermediate layers.",
        "The gradient factorizes as: \\partialL/\\partialW\\_1 = (\\partialL/\\partialh\\_1\\_0) \\cdot (\\partialh\\_1\\_0/\\partialh\\_9) \\cdot ... \\cdot (\\partialh\\_2/\\partialh\\_1) \\cdot (\\partialh\\_1/\\partialW\\_1). Each factor is a Jacobian; their product is the chain rule applied recursively.",
      ],
    },
    {
      id: "q-dl-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A computational graph records every operation during the forward pass; the autograd engine traverses it backward, applying the chain rule at each node to compute all gradients without manual derivation.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "As described in d2l.ai §5.3, during forward propagation a computational graph is constructed that records all operations. During backpropagation, this graph is traversed in reverse and local gradients at each node are multiplied together via the chain rule - producing all parameter gradients automatically.",
      hints: [
        "PyTorch\'s .backward() call triggers this traversal - you never write dL/dw by hand for any standard operation.",
        "Each node in the graph knows its local derivative; autograd chains them together using the chain rule.",
      ],
    },
    {
      id: "q-dl-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a deep network using sigmoid activations, gradients are multiplied through each layer during backpropagation. If sigmoid\'s derivative satisfies \\sigma'(x) \\leq 0.25 for all x, and a network has 10 sigmoid layers, then the gradient magnitude at the earliest layer is at most:",
      options: [
        "$0.25 \\times 10 = 2.5$",
        "$0.25^{10} \\approx 9.5 \\times 10^{-7}$, shrinking exponentially with depth",
        "$0.25 / 10 = 0.025$",
        "$10 \\times 0.25 = 2.5$, a linear reduction",
      ],
      correctAnswer: 1,
      explanation:
        "During backpropagation, the gradient signal is multiplied through each layer:\n\n\\[\n\\left\\| \\frac{\\partial L}{\\partial h^{(\\ell)}} \\right\\| \\leq \\left\\| \\frac{\\partial h^{(\\ell+1)}}{\\partial h^{(\\ell)}} \\right\\| \\cdot \\left\\| \\frac{\\partial L}{\\partial h^{(\\ell+1)}} \\right\\|.\n\\]\n\nWith \\sigma'(x) = \\sigma(x)(1 − \\sigma(x)) and \\sigma'(x) \\leq 0.25 for all x, each layer multiplies the gradient by at most 0.25. After 10 layers:\n\n\\[\n0.25^{10} \\approx 9.5 \\times 10^{-7}.\n\\]\n\nEarly layers receive a gradient signal roughly 10\\^{-⁶ times smaller than the final layer - effectively zero. ReLU\'s derivative is exactly 1 for positive inputs and 0 otherwise, avoiding this multiplicative shrinkage entirely.",
      hints: [
        "Each layer applies a multiplicative factor of at most 0.25 to the gradient. After 10 layers: 0.25¹⁰ \\approx 10\\^{-⁶ - the gradient is essentially zero.",
        "ReLU\'s gradient is either 0 or 1 for active neurons - no multiplicative shrinkage, so gradients flow unchanged through the network.",
      ],
    },
  ],

  "activation-functions": [
    {
      id: "q-dl-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "As shown in d2l.ai §5.1, ReLU is defined as ReLU(x) = max(x, 0). What is the derivative of ReLU with respect to x at x = 3.5? At x = −2.1?",
      options: [
        "$\\frac{d}{dx}$ReLU$\\big|_{x=3.5} = 0.5$; $\\frac{d}{dx}$ReLU$\\big|_{x=-2.1} = -0.5$",
        "$\\frac{d}{dx}$ReLU$\\big|_{x=3.5} = 1$; $\\frac{d}{dx}$ReLU$\\big|_{x=-2.1} = 0$",
        "$\\frac{d}{dx}$ReLU$\\big|_{x=3.5} = 3.5$; $\\frac{d}{dx}$ReLU$\\big|_{x=-2.1} = 0$",
        "$\\frac{d}{dx}$ReLU$\\big|_{x=3.5} = 1$; $\\frac{d}{dx}$ReLU$\\big|_{x=-2.1} = -1$",
      ],
      correctAnswer: 1,
      explanation:
        "ReLU is piecewise linear:\n\n\\[\n\\frac{d}{dx}\\text{ReLU}(x) =\n\\begin{cases}\n1 & \\text{if } x > 0, \\\\\n0 & \\text{if } x < 0.\n\\end{cases}\n\\]\n\nAt x = 3.5 (> 0): the derivative is 1. At x = −2.1 (< 0): the derivative is 0. At x = 0 the derivative is undefined; in practice it is set to 0.\n\nThis binary gradient (0 or 1) prevents vanishing gradients: unlike sigmoid, whose peak gradient is only 0.25, ReLU\'s gradient is either 1 (full signal passed) or 0 (no signal passed). This simplicity is why ReLU became the default hidden-layer activation (d2l.ai §5.1.2.1).",
      hints: [
        "ReLU is piecewise linear with slope 1 when x > 0 (passing the input through unchanged) and slope 0 when x < 0 (zeroing it out).",
        "Contrast with sigmoid: even at x = 0 (its peak), sigmoid\'s gradient is only 0.25 - four times smaller than ReLU\'s maximum gradient of 1.",
      ],
    },
    {
      id: "q-dl-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GELU (Gaussian Error Linear Unit), defined as x\\cdot\\Phi(x) where \\Phi is the standard Gaussian CDF, has become the standard activation in transformer architectures like BERT and GPT because it smoothly approximates ReLU while allowing small negative outputs.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "GELU (Hendrycks & Gimpel, 2016) smoothly gates inputs using the Gaussian CDF - unlike ReLU\'s hard threshold at zero. It produces small negative outputs for slightly-negative inputs (unlike ReLU which hard-zeros them), and has become the default in BERT, GPT-2/3/4, and LLaMA FFN layers due to empirically better performance.",
      hints: [
        "BERT and GPT both use GELU in their feed-forward layers, not ReLU.",
        "Unlike ReLU which is 0 for all x < 0, GELU attenuates negative values smoothly, preserving gradient information.",
      ],
    },
    {
      id: "q-dl-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Sigmoid\'s derivative is given by \\sigma'(x) = \\sigma(x)(1 − \\sigma(x)). At x = 5, \\sigma(5) \\approx 0.993. What is the gradient \\sigma'(5), and why does this cause problems in deep networks?",
      options: [
        "\\sigma'(5) \\approx 0.007; after 10 saturated sigmoid layers the gradient is \\approx 7\\times10\\^{-\\^2⁰ - essentially zero at early layers, causing vanishing gradients",
        "\\sigma'(5) \\approx 0.5; this is the maximum possible sigmoid gradient and causes exploding gradients",
        "\\sigma'(5) \\approx 0.993; this large gradient causes exploding gradients in deep networks",
        "\\sigma'(5) = 1; sigmoid has unit gradient for all positive values",
      ],
      correctAnswer: 0,
      explanation:
        "At x = 5, the sigmoid output is \\sigma(5) \\approx 0.993 (saturated near 1). The gradient is:\n\n\\[\n\\sigma'(5) = \\sigma(5)\\,(1 - \\sigma(5)) \\approx 0.993 \\times 0.007 \\approx 0.007.\n\\]\n\nThis is already very small - the neuron is in saturation. During backpropagation, the gradient signal is multiplied through each layer. After 10 saturated sigmoid layers:\n\n\\[\n\\bigl\\| \\frac{\\partial L}{\\partial h^{(1)}} \\bigr\\| \\leq (0.007)^{10} \\approx 2.8 \\times 10^{-21}.\n\\]\n\nThe gradient vanishes exponentially with depth. As d2l.ai §5.4.1.1 explains, sigmoid\'s derivative peaks at 0.25 (at x = 0) and is already small for |x| > 2. In deep networks, early layers receive effectively zero gradient - they cannot learn.",
      hints: [
        "\\sigma'(x) = \\sigma(x)(1 − \\sigma(x)) is maximum (0.25) only at x = 0. For |x| > 2, \\sigma'(x) < 0.1. At x = 5, \\sigma'(5) \\approx 0.007 - the neuron is saturated.",
        "Even at the theoretical peak (0.25 per layer), after 10 layers: 0.25¹⁰ \\approx 10\\^{-⁶. With saturated sigmoid (0.007 per layer), it drops to ~10\\^{-\\^2¹ - effectively zero.",
      ],
    },
  ],

  "weight-initialization": [
    {
      id: "q-dl-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "As explained in d2l.ai §5.4.1.3, if all weights in a layer are initialized to the same constant c, what happens during training?",
      options: [
        "All neurons learn to detect different features because the inputs to each neuron differ",
        "All neurons compute identical activations and receive identical gradients - they remain permanently identical throughout training, wasting the network\'s capacity",
        "The network converges faster because the symmetric initialization simplifies the loss landscape",
        "The network converges to zero weights due to weight decay dominance",
      ],
      correctAnswer: 1,
      explanation:
        "As d2l.ai §5.4.1.3 explains, if all weights in a layer are initialized to the same constant, then all neurons in that layer receive identical inputs and produce identical outputs. Consequently, they all receive identical gradients during backpropagation, so every weight updates by the same amount. After any number of updates, all neurons remain identical - the hidden layer effectively has only one neuron regardless of its width. Random initialization is essential to break this symmetry so that each neuron learns to detect different features.",
      hints: [
        "If all neurons start identical and receive identical gradients, they will always remain identical - the hidden layer has effectively one neuron regardless of width.",
        "d2l.ai notes: without breaking symmetry, the network might never realize its expressive power, since all hidden units compute the same function.",
      ],
    },
    {
      id: "q-dl-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Xavier initialization (Glorot & Bengio, 2010) sets weight variance to \\sigma\\^2 = 2/(n_in + n_out). This formula is derived by requiring that the variance of layer outputs and gradients stays constant through forward and backward passes simultaneously.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "As derived in d2l.ai §5.4.2.2: forward propagation requires n_in\\cdot\\sigma\\^2=1 and backpropagation requires n_out\\cdot\\sigma\\^2=1. Since both cannot hold simultaneously, Xavier takes the compromise \\sigma\\^2 = 2/(n_in + n_out). This keeps signal variance stable in both directions, preventing vanishing/exploding activations.",
      hints: [
        "The derivation: Var[output] = n_in \\times \\sigma\\^2 \\times Var[input]. Setting this to Var[input] requires n_in\\cdot\\sigma\\^2=1.",
        "Xavier is the compromise: \\sigma = √(2/(n_in + n_out)), balancing both the forward and backward variance conditions.",
      ],
    },
    {
      id: "q-dl-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "He initialization scales weights by √(2/n_in) rather than Xavier\'s √(2/(n_in + n_out)). Why does ReLU require this different factor of 2?",
      options: [
        "ReLU has a gradient of 2 for positive inputs, requiring the larger scaling",
        "ReLU zeros out approximately half its inputs (the negative half), effectively halving the variance. The factor of 2 compensates for this, maintaining variance through the forward pass",
        "The factor of 2 accounts for both the forward and backward pass simultaneously",
        "He initialization uses n_in only because ReLU has no output-side constraint",
      ],
      correctAnswer: 1,
      explanation:
        "ReLU kills roughly 50% of activations (all negative values become 0), halving the effective variance at each layer. He initialization compensates: instead of \\sigma\\^2=1/n_in (which would give halved variance after ReLU), it uses \\sigma\\^2=2/n_in, maintaining correct activation variance through layers with ReLU.",
      hints: [
        "Xavier assumes activation functions preserve variance symmetrically. ReLU does not - it zeros half the values.",
        "The factor 2 exactly compensates for the 50% activation death: 2 \\times (1/2) = 1, maintaining unit variance.",
      ],
    },
  ],

  "batch-normalization": [
    {
      id: "q-dl-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Batch Normalization normalizes activations by computing the mini-batch mean \\mu and variance \\sigma\\^2, then applying: \\(\\hat{x} = (x - \\mu) / \\sqrt{\\sigma^2 + \\varepsilon}.\\) What do the learnable parameters \\gamma and \\beta do?",
      options: [
        "\\gamma scales the learning rate; \\beta controls the dropout rate",
        "\\gamma (scale) and \\beta (shift) allow the network to undo the normalization if needed, preserving representational power",
        "\\gamma and \\beta normalize the weights rather than the activations",
        "\\gamma sets the batch size; \\beta sets the momentum for running statistics",
      ],
      correctAnswer: 1,
      explanation:
        "After normalizing to zero mean and unit variance, the learnable parameters \\gamma and \\beta allow the layer to output any mean and scale:\n\n\\[\ny = \\gamma \\cdot \\hat{x} + \\beta.\n\\]\n\nWithout \\gamma and \\beta, the normalized output is constrained to have mean 0 and variance 1. This can harm the network: for example, sigmoid near zero is approximately linear, so normalization would make the sigmoid layer nearly linear, losing its non-linearity. \\gamma and \\beta restore full representational flexibility - if the identity transformation is optimal, the network can learn \\gamma = \\sigma and \\beta = \\mu to undo the normalization.",
      hints: [
        "If \\gamma = 1 and \\beta = 0, BN passes through the normalized activation unchanged. If \\gamma = \\sigma and \\beta = \\mu, it completely undoes the normalization.",
        "The learnable parameters ensure BN can represent the identity transformation - the network can learn to bypass normalization if doing so is beneficial.",
      ],
    },
    {
      id: "q-dl-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Layer Normalization normalizes across the feature dimension for a single sample (not across the batch), making it suitable for transformers where batch statistics would be unreliable for variable-length sequences.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Layer Norm (Ba et al., 2016) computes statistics across the hidden dimension for each individual token independently. Unlike Batch Norm which averages over the batch, LN is batch-size-agnostic and works correctly with batch size 1 - essential for transformer inference where we often decode one token at a time.",
      hints: [
        "In transformers with variable-length sequences, batch-level statistics mix statistics from different positions - LN avoids this by normalizing per-sample.",
        "LN normalizes across the d_model dimension (features) rather than across the batch dimension.",
      ],
    },
    {
      id: "q-dl-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'During training, Batch Normalization uses mini-batch statistics. During inference, it uses running estimates. Why does this create a "train-test discrepancy" that must be handled carefully?',
      options: [
        "The batch statistics are noisier than the population statistics, so inference is always more accurate",
        'A single test sample has no "batch" to compute statistics over; using batch statistics would make inference results depend on what other samples happen to be in the batch - non-deterministic and inconsistent',
        "Running estimates are more accurate than mini-batch statistics for normally distributed data",
        "The discrepancy only matters when batch size is smaller than the model\'s hidden dimension",
      ],
      correctAnswer: 1,
      explanation:
        "At inference time, BN uses exponential moving averages of training batch statistics (running_mean, running_var). Without this, inference with batch size 1 would have no meaningful batch statistics (mean and variance of one sample = trivially 0 and 0), breaking normalization entirely. The running estimates approximate the population statistics.",
      hints: [
        "Compute the mean and variance of a single number - it\'s undefined/degenerate. BN needs population-level statistics at test time.",
        "PyTorch\'s model.eval() switches BN from using mini-batch stats to the running estimates accumulated during training.",
      ],
    },
  ],

  "dropout-regularization": [
    {
      id: "q-dl-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "As defined in d2l.ai §5.6, the dropout formula is: h' = 0 with probability p, else h/(1−p). Why is the surviving activation divided by (1−p)?",
      options: [
        "To increase the activation magnitude and compensate for the smaller network size",
        "To ensure E[h'] = h - keeping the expected value of each activation unchanged, so that test-time behavior (all neurons active) matches training expectations",
        "To reduce the learning rate proportionally to the dropout rate",
        "To normalize the activations to unit variance after dropping neurons",
      ],
      correctAnswer: 1,
      explanation:
        "If a neuron survives with probability (1−p) and is scaled by 1/(1−p), then its expected value is:\n\n\\[\n\\mathbb{E}[h'] = (1-p) \\cdot \\frac{h}{1-p} + p \\cdot 0 = h.\n\\]\n\nThis \"inverted dropout\" design ensures that the expected activation at training time equals the activation at test time (when all neurons are active and no scaling is applied). Without this scaling, the expected training activation would be (1−p)\\cdoth, creating a train-test mismatch.",
      hints: [
        "E[h'] = Pr(survive) \\cdot h/(1−p) + Pr(drop) \\cdot 0 = (1−p) \\cdot h/(1−p) + 0 = h. The expected value is preserved.",
        "Without scaling: E[h'] = (1−p) \\cdot h. At test time (all neurons active): E[h'] = h. This train-test mismatch in expected activation magnitude is avoided by inverted dropout.",
      ],
    },
    {
      id: "q-dl-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Dropout is applied during inference (test time) the same way it is applied during training.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        'As d2l.ai §5.6 states: "we disable dropout at test time. Given a trained model and a new example, we do not drop out any nodes." All neurons are active at test time. The inverted dropout scaling during training ensures activation magnitudes are consistent between train and test phases without any additional test-time adjustment.',
      hints: [
        "Stochastic behavior at test time would make predictions non-deterministic - different runs of the same input would give different outputs.",
        "Some researchers do apply dropout at test time to estimate prediction uncertainty (MC Dropout), but this is a specific technique, not the default.",
      ],
    },
    {
      id: "q-dl-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Srivastava et al. (2014) justified dropout by analogy with sexual reproduction breaking co-adapted genes. The co-adaptation problem it solves is:",
      options: [
        "Neurons in the same layer developing correlated weights that reduce model diversity",
        "Each layer developing overly specialized neurons that rely on specific activation patterns from the previous layer - making the network brittle to any neuron being unavailable",
        "Different layers learning at different rates due to vanishing gradients",
        "Neurons adapting to the specific samples in the training set rather than the distribution",
      ],
      correctAnswer: 1,
      explanation:
        'As d2l.ai §5.6 explains, dropout "breaks up co-adaptation" - neurons cannot rely on specific other neurons always being present. Each neuron must learn features that are useful regardless of which subset of other neurons is active, forcing the network to learn more redundant, robust representations.',
      hints: [
        'Co-adaptation: neuron A learns "fire when neuron B fires" instead of learning an independent useful feature.',
        'Dropout forces each neuron to be independently useful - it cannot rely on its neighbors to "correct" its errors.',
      ],
    },
  ],

  optimizers: [
    {
      id: "q-dl-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Adam maintains two moment estimates per parameter: m_t (first moment, mean of gradients) and v_t (second moment, uncentered variance of gradients). What is the effective learning rate for a parameter whose gradient is consistently g = 0.01?",
      options: [
        "Exactly the base learning rate \\alpha, since the gradient is constant",
        "\\alpha \\cdot m̂_t / √v̂_t \\approx \\alpha (the ratio normalizes the learning rate to a consistent magnitude regardless of gradient scale)",
        "\\alpha \\times 0.01 (scaled down by gradient magnitude)",
        "\\alpha / 0.01 (scaled up when gradient is small)",
      ],
      correctAnswer: 1,
      explanation:
        "Adam\'s update rule is:\n\n\\[\n\\theta_{t+1} = \\theta_t - \\alpha \\cdot \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\varepsilon},\n\\]\n\nwhere \\(\\hat{m}_t\\) and \\(\\hat{v}_t\\) are bias-corrected first and second moment estimates. For a constant gradient g: \\(\\hat{m}_t = g\\) and \\(\\hat{v}_t = g^2\\) (after bias correction). The effective step size is:\n\n\\[\n\\alpha \\cdot \\frac{g}{\\sqrt{g^2}} = \\alpha \\cdot \\frac{g}{|g|} = \\alpha \\cdot \\operatorname{sgn}(g).\n\\]\n\nThe gradient magnitude cancels in the ratio \\(\\hat{m}_t / \\sqrt{\\hat{v}_t}\\). Adam\'s step size is approximately \\pm\\alpha in the gradient direction, providing a consistent effective learning rate regardless of gradient scale.",
      hints: [
        "Adam\'s update: \\theta \\leftarrow \\theta − \\alpha \\cdot m̂_t / √(v̂_t + \\epsilon). With constant gradient g: m̂_t = g, v̂_t = g\\^2.",
        "The step is \\alpha \\cdot g/√(g\\^2) = \\alpha \\cdot g/|g| = \\alpha \\cdot sign(g). The gradient magnitude g cancels in the ratio m̂_t/√v̂_t.",
      ],
    },
    {
      id: "q-dl-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AdamW fixes a flaw in Adam by applying weight decay directly to the weights (\\theta \\leftarrow \\theta − \\eta\\cdot\\lambda\\cdot\\theta) rather than folding L2 regularization into the gradient, because Adam\'s adaptive scaling reduces the effective weight decay disproportionately.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "In vanilla Adam with L2 regularization, the L2 gradient (\\lambda\\cdot\\theta) is added to the gradient and then adaptively scaled by 1/√v_t. For parameters with large gradients, this scale is small - effectively reducing weight decay. AdamW decouples weight decay: \\theta \\leftarrow \\theta − \\alpha\\cdotm̂/√v̂ − \\eta\\cdot\\lambda\\cdot\\theta, applying full weight decay regardless of gradient scale.",
      hints: [
        "Adam with L2 loss: the regularization gradient \\lambda\\theta is divided by √v - effective decay = \\lambda/√v, which varies by parameter.",
        "AdamW: the decay step −\\eta\\cdot\\lambda\\cdot\\theta is applied directly to weights, unaffected by Adam\'s variance scaling.",
      ],
    },
    {
      id: "q-dl-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "d2l.ai §12.6 shows that SGD with momentum updates: v_t = \\beta\\cdotv_{t-1} + g_t, then \\theta \\leftarrow \\theta − \\alpha\\cdotv_t. For \\beta = 0.9, how many effective past gradient steps does momentum approximately integrate?",
      options: [
        "0.9 steps (just less than 1)",
        "\\approx 10 steps (from the geometric series sum 1/(1 − \\beta) = 1/(1 − 0.9) = 10)",
        "90 steps (100 \\times 0.9)",
        "1 step - momentum just smooths the current gradient",
      ],
      correctAnswer: 1,
      explanation:
        "The momentum velocity v_t = \\beta\\cdotv_{t-1} + g_t unrolls by substitution into a geometric series:\n\n\\[\nv_t = g_t + \\beta \\cdot g_{t-1} + \\beta^2 \\cdot g_{t-2} + \\cdots + \\beta^{t-1} \\cdot g_1.\n\\]\n\nEach past gradient g_{t-k} contributes \\beta^k to the current velocity, with weight decaying exponentially at rate \\beta^k. The effective window is the sum of the decay weights:\n\n\\[\n\\sum_{k=0}^{\\infty} \\beta^k = \\frac{1}{1-\\beta}.\n\\]\n\nWith \\beta = 0.9: effective window \\approx 1/(1 − 0.9) = 10 steps. A gradient from 10 steps ago carries weight \\beta¹⁰ \\approx 0.35 - still meaningful. A gradient from 20 steps ago carries \\beta\\^2⁰ \\approx 0.12.",
      hints: [
        "Geometric series: 1 + \\beta + \\beta\\^2 + ... = 1/(1−\\beta). For \\beta = 0.9: 1/(1 − 0.9) = 10. So momentum integrates ~10 past gradients.",
        "A gradient from 10 steps ago is weighted by \\beta¹⁰ \\approx 0.35 - still meaningful. A gradient from 20 steps ago: \\beta\\^2⁰ \\approx 0.12.",
      ],
    },
  ],

  "learning-rate-schedules": [
    {
      id: "q-dl-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the purpose of a learning rate warmup period at the start of training?",
      options: [
        "To gradually increase GPU memory usage to avoid OOM errors.",
        "To start with a small learning rate and ramp up, preventing large gradient updates from destabilizing randomly initialized weights.",
        "To allow the dataset shuffling to complete before meaningful training begins.",
        "To warm up the optimizer\'s momentum terms before applying weight decay.",
      ],
      correctAnswer: 1,
      explanation:
        'At initialization, gradient estimates are noisy and weights are far from optima. A small initial learning rate prevents destructively large early updates, with the rate increasing linearly once training stabilizes. This is especially critical for transformers, where the "Attention is All You Need" paper uses warmup followed by inverse-sqrt decay.',
      hints: [
        "Imagine driving at 100 mph from a standing start vs. gradually accelerating - the gradual ramp is safer.",
        "Warmup is especially critical for transformers, where early large updates can cause training divergence.",
      ],
    },
    {
      id: "q-dl-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Cosine annealing schedules reduce the learning rate following a cosine curve, allowing it to restart (warm restarts) to escape local minima periodically.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Cosine annealing with warm restarts (SGDR) decays the learning rate to near zero following a cosine schedule, then resets to a higher value, allowing the optimizer to explore different loss landscape regions at the beginning of each cycle.",
      hints: [
        "The cosine curve smoothly decreases the LR - no abrupt drops as with step decay.",
        'Warm restarts periodically "restart" exploration, which can help escape shallow local minima.',
      ],
    },
    {
      id: "q-dl-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "Attention is All You Need" transformer schedule sets learning rate as: lr = d_model^{−0.5} \\cdot min(step^{−0.5}, step \\cdot warmup_steps^{−1.5}). At step = warmup_steps, what is the learning rate, and how does it behave afterward?',
      options: [
        "lr = d_model^{−0.5} \\times warmup_steps^{−0.5}; then grows as step^{0.5} for remaining training",
        "lr = d_model^{−0.5} \\times warmup_steps^{−0.5}; then decays as step^{−0.5} for remaining training",
        "lr reaches its maximum and stays constant until training ends",
        "lr = 1/d_model; then halves every warmup_steps steps",
      ],
      correctAnswer: 1,
      explanation:
        "At step = warmup_steps: both terms equal warmup_steps^{−0.5}, so lr = d_model^{−0.5} \\times warmup_steps^{−0.5} (the peak). For step > warmup_steps: the step^{−0.5} term is smaller, so lr = d_model^{−0.5} \\times step^{−0.5} - inverse square root decay. The d_model^{−0.5} scaling means larger models (larger d_model) use smaller learning rates.",
      hints: [
        "The formula has two phases: linear increase (step \\times warmup^{−1.5}) and inverse-sqrt decrease (step^{−0.5}), meeting at the peak.",
        "After warmup, lr \\propto 1/√step - cutting LR in half requires 4\\times more steps.",
      ],
    },
  ],

  "loss-functions": [
    {
      id: "q-dl-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Cross-entropy loss for classification is \\(L = -\\log(p_{\\text{correct}})\\). If the model predicts probability 0.01 for the correct class, what is the loss? If it predicts 0.99?",
      options: [
        "$L = 0.01$ when $p=0.01$; $L = 0.99$ when $p=0.99$",
        "$L = -\\log(0.01) \\approx 4.6$ when $p=0.01$; $L = -\\log(0.99) \\approx 0.01$ when $p=0.99$",
        "$L = 1/0.01 = 100$ when $p=0.01$; $L = 1/0.99 \\approx 1$ when $p=0.99$",
        "$L = 0$ when $p=0.01$ (correct); $L = 1$ when $p=0.99$ (wrong)",
      ],
      correctAnswer: 1,
      explanation:
        "Cross-entropy \\(L = -\\log(p_{\\text{correct}})\\) goes to infinity as \\(p_{\\text{correct}} \\to 0\\) and to 0 as \\(p_{\\text{correct}} \\to 1\\).\n\nWhen confidently wrong (\\(p = 0.01\\)):\n\n\\[\nL = -\\log(0.01) = -\\log(10^{-2}) = 2 \\cdot \\log(10) \\approx 4.6,\n\\]\n\na large loss producing strong gradients to correct the error.\n\nWhen confidently correct (\\(p = 0.99\\)):\n\n\\[\nL = -\\log(0.99) \\approx -(-0.01005) \\approx 0.01,\n\\]\n\na near-zero loss. MSE\'s gradient shrinks badly near 0 and 1 with sigmoid - cross-entropy avoids this neuron saturation problem.",
      hints: [
        "$\\log(0.01) = \\log(10^{-2}) = -2 \\cdot \\log(10) \\approx -4.6$. So $-\\log(0.01) \\approx 4.6$ - a large penalty for confident wrong answers.",
        "Cross-entropy directly maximizes the log-likelihood of the correct class label, avoiding the saturation problem that afflicts MSE with sigmoid.",
      ],
    },
    {
      id: "q-dl-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Focal loss addresses class imbalance by down-weighting the loss contribution of easy, well-classified examples and focusing training on hard examples.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Focal loss (Lin et al., 2017) modifies cross-entropy: FL(p_t) = −(1 − p_t)^\\gamma log(p_t), where p_t is the model\'s predicted probability for the true class. The modulating factor (1 − p_t)^\\gamma reduces loss for well-classified examples (p_t \\to 1) while leaving loss unchanged for misclassified examples (p_t \\to 0). With \\gamma=2: an easy example with p_t=0.9 contributes (1−0.9)\\^2 = 0.01\\times the original loss - 100\\times reduction. This lets rare hard examples (e.g., small objects in detection) dominate the gradient.",
      hints: [
        "Focal loss: FL(p_t) = −(1−p_t)^\\gamma log(p_t). For p_t=0.9, \\gamma=2: weight = (0.1)\\^2 = 0.01. For p_t=0.1: weight = (0.9)\\^2 \\approx 0.81 - barely affected.",
        "In object detection, 99% of anchors may be easy negatives (background). Without focal loss, their gradient overwhelms rare foreground objects.",
      ],
    },
    {
      id: "q-dl-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Contrastive loss (e.g., used in SimCLR) trains a network to:",
      options: [
        "Minimize the cross-entropy of predicted vs. true class labels.",
        "Pull embeddings of similar pairs (positive pairs) closer together and push embeddings of dissimilar pairs (negative pairs) apart in the representation space.",
        "Maximize the KL divergence between the model's predictions and a uniform prior.",
        "Minimize the L2 distance between the model's weights and their initialization.",
      ],
      correctAnswer: 1,
      explanation:
        "Contrastive learning optimizes an embedding space where positive pairs (augmented views of the same sample) are pulled close together and negative pairs (different samples) are pushed far apart. The objective is:\n\n\\[\nL = -\\log\\frac{\\exp(\\text{sim}(z_i, z_j)/\\tau)}{\\sum_{k=1}^{2N} \\mathbb{1}_{[k \\neq i]} \\exp(\\text{sim}(z_i, z_k)/\\tau)},\n\\]\n\nwhere sim(\\cdot,\\cdot) is cosine similarity, \\tau is a temperature hyperparameter, and the sum is over all negative pairs in the batch. This is the NT-Xent (Normalized Temperature-scaled Cross Entropy) loss used in SimCLR - learning rich representations without any explicit class labels.",
      hints: [
        "Contrastive = contrasting similar vs. different things. The loss directly reflects this: pull positive pairs together, push negative pairs apart.",
        "SimCLR uses two augmented views of the same image as a positive pair and all other images in the batch as negatives, normalized by temperature \\tau.",
      ],
    },
  ],

  "overfitting-underfitting": [
    {
      id: "q-dl-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "As discussed in d2l.ai §12.1.1, the goal of optimization (minimizing training loss) and the goal of deep learning (minimizing generalization error) are fundamentally different. Which scenario illustrates this gap?",
      options: [
        "A model with 0% training error and 0% validation error",
        "A model with near-zero training loss but high validation loss - it has minimized empirical risk but not the true risk",
        "A model with 50% training error and 50% validation error - underfitting both",
        "A model with identical training and validation loss - perfectly calibrated",
      ],
      correctAnswer: 1,
      explanation:
        'd2l.ai §12.1.1: "since the objective function of the optimization algorithm is usually a loss function based on the training dataset, the goal of optimization is to reduce the training error. However, the goal of deep learning is to reduce the generalization error." The gap between them is the overfitting gap - memorizing training data without learning the underlying pattern.',
      hints: [
        "The empirical risk (training loss) and actual risk (generalization loss) have different minima - as illustrated in d2l.ai §12.1.1.",
        "A model can achieve zero training loss on any dataset by memorization, but this guarantees nothing about new data.",
      ],
    },
    {
      id: "q-dl-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Increasing training data size is generally the most effective remedy for overfitting, more effective than regularization techniques alone.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "More training data gives the model less opportunity to memorize specific examples and forces it to learn the underlying distribution. Regularization (dropout, L2, etc.) approximates the effect of more data by constraining model complexity, but cannot substitute for the generalization benefit of genuinely diverse, abundant data.",
      hints: [
        "With infinite training data, overfitting is impossible - the model must learn the true distribution.",
        "Regularization is a proxy when data is scarce; data is always the preferred solution when obtainable.",
      ],
    },
    {
      id: "q-dl-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: 'The "double descent" phenomenon in deep learning refers to:',
      options: [
        "Loss decreasing twice: once during training and once during fine-tuning.",
        "Test error initially decreasing, then increasing (classical overfitting), then decreasing again as model capacity grows into the overparameterized regime.",
        "Gradient descent applied twice per batch for more accurate updates.",
        "Two separate descent phases in cosine annealing schedules.",
      ],
      correctAnswer: 1,
      explanation:
        "Double descent challenges the classical bias-variance tradeoff: beyond the interpolation threshold (where the model perfectly fits training data), further increasing model size or training time can again reduce test error, contradicting the traditional U-shaped risk curve. This was empirically demonstrated in large-scale modern neural networks.",
      hints: [
        "Classical wisdom: bigger models overfit. Modern finding: very large overparameterized models can generalize well.",
        "The second descent occurs in the overparameterized regime - more parameters than training samples.",
      ],
    },
  ],

  "mlp-universal-approx": [
    {
      id: "q-dl-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'As noted in d2l.ai §5.1, MLPs are "Universal Approximators." The Universal Approximation Theorem (Cybenko 1989, Hornik 1991) states:',
      options: [
        "Infinite depth and fixed width can approximate any continuous function.",
        "A single hidden layer of sufficient width with a non-polynomial activation can approximate any continuous function on a compact domain to arbitrary precision.",
        "Only linear activations can approximate any polynomial function.",
        "Any architecture can approximate any function given enough training data.",
      ],
      correctAnswer: 1,
      explanation:
        "The UAT guarantees that a single hidden layer MLP with enough neurons and a non-linear activation (e.g., sigmoid, ReLU) can approximate any continuous function on a compact set to any desired precision \\epsilon > 0. The key resource is width - more neurons allow finer approximation. d2l.ai §5.1 notes this as the theoretical justification for MLP expressivity.",
      hints: [
        "Width (number of neurons) is the key resource - more neurons allow finer approximation.",
        "The theorem says such a network exists, not that gradient descent will find it - existence and learnability are separate.",
      ],
    },
    {
      id: "q-dl-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Universal Approximation Theorem guarantees that gradient descent will find the optimal weights for the approximating network.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "The UAT is an existence result only - it proves that a network of sufficient width CAN represent the target function, but says nothing about whether gradient descent will find those weights in practice. The optimization landscape is non-convex with many local minima and saddle points, making convergence to the global optimum unguaranteed.",
      hints: [
        "Existence and findability are different mathematical properties - the UAT only proves existence.",
        "A non-convex loss landscape with many local minima (described in d2l.ai §12.1.2.1) may trap gradient descent far from the global optimum.",
      ],
    },
    {
      id: "q-dl-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Depth-efficient approximation theory shows deep networks can represent certain functions exponentially more efficiently than shallow networks. Which concrete example illustrates this?",
      options: [
        "Deep networks always have more parameters than shallow networks of the same width.",
        'Functions with exponentially many "oscillations" (e.g., high-frequency compositions) require exponentially many neurons in a single hidden layer but only polynomially many in a deep network (Telgarsky, 2016).',
        "Gradient descent works better for deep networks than shallow ones.",
        "Depth reduces total training time required for convergence.",
      ],
      correctAnswer: 1,
      explanation:
        "Telgarsky (2016) proved that for certain functions (compositions of simple functions), a 2-layer network requires exponentially many neurons while a deep network with the same function class needs only polynomially many. The hierarchical composition of functions in deep networks (edges \\to shapes \\to objects in vision) captures exponentially complex patterns efficiently.",
      hints: [
        "Feature hierarchies (pixel patterns \\to edges \\to shapes \\to objects) cannot be efficiently represented in a single flat layer.",
        "A deep network with k layers can represent function compositions that would require exponentially many neurons in a 2-layer network.",
      ],
    },
  ],

  "cnn-fundamentals": [
    {
      id: "q-dl-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What key property of convolutional layers makes them suitable for image processing?",
      options: [
        "They can process variable-length sequences unlike fully connected layers.",
        "They exploit translation equivariance - the same feature detector is applied everywhere in the image via weight sharing.",
        "They always produce outputs of the same spatial size as their inputs.",
        "They require fewer activations than recurrent layers for the same task.",
      ],
      correctAnswer: 1,
      explanation:
        "Convolutional layers share weights across spatial positions (translation equivariance), meaning the same edge detector learned for the top-left corner also applies to the bottom-right - drastically reducing parameters vs. fully connected layers. A 3\\times3 conv with 64 filters uses 576 weights regardless of image size; an FC layer on a 224\\times224 image would need millions.",
      hints: [
        "A cat\'s ear detector should work whether the cat is on the left or right side of the image - weight sharing enforces this.",
        "Weight sharing: the same filter slides across the entire input, detecting the same feature everywhere.",
      ],
    },
    {
      id: "q-dl-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'Adding "same" padding to a convolutional layer ensures the output spatial dimensions equal the input spatial dimensions when stride = 1.',
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        '"Same" padding adds zeros around the input border so that the output height and width match the input exactly (for stride 1). Without padding, a k\\timesk convolution reduces each spatial dimension by k−1. For a 3\\times3 kernel, padding=1 adds 1 pixel on each side, keeping output size = input size.',
      hints: [
        "Without padding, each convolution shrinks the spatial dimensions by (kernel_size − 1). A 224\\times224 image with 3\\times3 conv becomes 222\\times222.",
        '"Same" is named because output size = input size when using it (for stride=1).',
      ],
    },
    {
      id: "q-dl-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Depthwise separable convolutions (used in MobileNet) reduce computation compared to standard convolutions by:",
      options: [
        "Using smaller kernel sizes (1\\times1 instead of 3\\times3) throughout the network.",
        "Factorizing a standard convolution into a depthwise convolution (per-channel spatial filtering) followed by a pointwise 1\\times1 convolution (cross-channel mixing), drastically reducing FLOP count.",
        "Skipping pooling layers entirely and using strided convolutions instead.",
        "Applying pruning to zero out 50% of the convolution weights before inference.",
      ],
      correctAnswer: 1,
      explanation:
        "Standard conv: each output pixel computes k\\^2\\cdotC_in\\cdotC_out multiply-adds per spatial position. FLOPs = k\\^2 \\times C_in \\times C_out \\times H \\times W. Depthwise separable factorises this into two steps: (1) Depthwise: each of C_in channels is convolved spatially with its own k\\timesk filter \\to k\\^2 \\times C_in \\times H \\times W FLOPs. (2) Pointwise (1\\times1): mixes channels \\to C_in \\times C_out \\times H \\times W FLOPs. Total = k\\^2\\cdotC_in + C_in\\cdotC_out / (k\\^2\\cdotC_in\\cdotC_out) = 1/C_out + 1/k\\^2. For k=3 and C_out=32: (1/32 + 1/9) \\approx 0.125. A 3\\times3 depthwise separable conv costs ~8-9\\times fewer FLOPs than a standard conv.",
      hints: [
        "Standard conv FLOPs: k\\^2 \\times C_in \\times C_out \\times H \\times W. Depthwise sep: k\\^2\\cdotC_in\\cdotH\\cdotW + C_in\\cdotC_out\\cdotH\\cdotW.",
        "For k=3 and large C_out: the ratio \\approx 1/k\\^2 = 1/9. The depthwise step alone is 9\\times cheaper than standard conv on the spatial part.",
      ],
    },
  ],

  "rnn-lstm-gru": [
    {
      id: "q-dl-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What fundamental problem do LSTMs solve that vanilla RNNs struggle with?",
      options: [
        "LSTMs can process images while RNNs cannot.",
        "LSTMs use gating mechanisms and a cell state that can carry gradients over long sequences without them vanishing, enabling learning of long-range dependencies.",
        "LSTMs are faster to train because they use fewer parameters.",
        "LSTMs can handle variable-length sequences; RNNs require fixed-length inputs.",
      ],
      correctAnswer: 1,
      explanation:
        'In vanilla RNNs, backpropagation through time (BPTT) multiplies the recurrent weight matrix at every timestep. If this matrix has eigenvalues < 1, gradients vanish exponentially with sequence length. LSTM\'s cell state provides a "gradient highway" through the forget gate: gradients flow through additive connections in the cell state rather than multiplicative chains.',
      hints: [
        "A vanilla RNN run for 100 timesteps is like a 100-layer feedforward network for backpropagation - gradients shrink by the same matrix 100 times.",
        "LSTM\'s cell state update: c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t. The additive path through c allows unimpeded gradient flow.",
      ],
    },
    {
      id: "q-dl-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The GRU (Gated Recurrent Unit) achieves performance comparable to LSTM on many tasks while using fewer parameters by merging the cell state and hidden state, reducing from 4 gate computations to 2.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "LSTM has 4 gates (forget, input, output, cell) and separate cell/hidden states: ~4 \\times (h+x) \\times h parameters per layer. GRU has 2 gates (update, reset) and merges cell and hidden state: ~3 \\times (h+x) \\times h parameters - about 25% fewer. On many sequence tasks, GRU matches LSTM performance and sometimes trains faster.",
      hints: [
        "LSTM: forget gate, input gate, output gate, cell gate \\to 4 weight matrices. GRU: reset gate, update gate, candidate \\to 3 weight matrices.",
        "GRU\'s update gate plays the role of both LSTM\'s forget and input gates simultaneously.",
      ],
    },
    {
      id: "q-dl-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Backpropagation Through Time (BPTT) in RNNs involves unrolling the network across T timesteps. For a sequence of length T=100, the gradient of the loss with respect to h_1 involves multiplying which quantity T−1=99 times?",
      options: [
        "The input weight matrix W_x, applied at each step.",
        "The recurrent weight matrix W_h (or its Jacobian \\partialh_t/\\partialh_{t-1}), applied at each temporal step during backpropagation.",
        "The output projection matrix W_y, applied at each prediction step.",
        "The gradient of the loss \\partialL/\\partialh_T, applied recursively backward.",
      ],
      correctAnswer: 1,
      explanation:
        "In BPTT, the gradient flows backward through unrolled timesteps: \\partialL/\\partialh_1 = (\\partialL/\\partialh_T) \\cdot \\prod_{t=2}^{T} (\\partialh_t/\\partialh_{t-1}). With h_t = \\sigma(W_h\\cdoth_{t-1} + W_x\\cdotx_t), the Jacobian \\partialh_t/\\partialh_{t-1} = W_h^T \\cdot diag(\\sigma'(W_h\\cdoth_{t-1})). The product of 99 such matrices - \\prod_{t=2}^{T} W_h^T - is the culprit. If the largest eigenvalue \\lambda_max of W_h satisfies \\lambda_max < 1, gradients vanish as \\lambda_max^{99}. If \\lambda_max > 1, gradients explode. This is why RNNs without gating struggle with long sequences.",
      hints: [
        "The Jacobian \\partialh_t/\\partialh_{t-1} = W_h^T \\cdot diag(\\sigma'(\\cdot)). Each step multiplies the gradient by W_h^T. After 99 steps: ‖\\partialh_T/\\partialh_1‖ \\leq ‖W_h‖^{99}.",
        "If \\lambda_max(W_h) = 0.5, then \\lambda_max^{99} \\approx 10^{-30} - the gradient is effectively zero. LSTM\'s additive cell state bypasses this multiplication.",
      ],
    },
  ],

  "attention-dl": [
    {
      id: "q-dl-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In scaled dot-product attention, the formula is: Attention(Q, K, V) = softmax\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) \\cdot V. If d_k = 64 and Q, K are random unit-variance vectors, what is the variance of a single dot product q \\cdot k before scaling?",
      options: [
        "Variance = 1 (unchanged by dimensionality)",
        "Variance = d_k = 64 (grows linearly with dimension)",
        "Variance = √d_k = 8",
        "Variance = d_k\\^2 = 4096",
      ],
      correctAnswer: 1,
      explanation:
        "For random unit-variance vectors \\(\\mathbf{q}, \\mathbf{k} \\in \\mathbb{R}^{d_k}\\), each dimension i has \\(\\mathbb{E}[q_i] = \\mathbb{E}[k_i] = 0\\) and \\(\\operatorname{Var}(q_i) = \\operatorname{Var}(k_i) = 1\\). Assuming independence across dimensions:\n\n\\[\n\\operatorname{Var}(\\mathbf{q} \\cdot \\mathbf{k}) = \\operatorname{Var}\\left(\\sum_{i=1}^{d_k} q_i k_i\\right) = \\sum_{i=1}^{d_k} \\operatorname{Var}(q_i k_i) = \\sum_{i=1}^{d_k} 1 \\cdot 1 = d_k.\n\\]\n\nSo the dot product variance grows linearly with \\(d_k\\). Dividing by \\(\\sqrt{d_k}\\) restores unit variance:\n\n\\[\n\\operatorname{Var}\\left(\\frac{\\mathbf{q} \\cdot \\mathbf{k}}{\\sqrt{d_k}}\\right) = \\frac{d_k}{d_k} = 1,\n\\]\n\nensuring softmax operates in a regime with meaningful gradients.",
      hints: [
        "Dot product: q \\cdot k = \\Sigma_i q_i k_i. Var(q \\cdot k) = \\Sigma_i Var(q_i k_i) = \\Sigma_i (Var(q_i) \\cdot Var(k_i)) = d_k \\times 1 = d_k.",
        "Without scaling: std(q \\cdot k) = √64 = 8. softmax(exp(8) \\approx 2981, exp(−8) \\approx 0.0003) saturates to one-hot with near-zero gradients.",
      ],
    },
    {
      id: "q-dl-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Multi-head attention allows the model to simultaneously attend to information from different representation subspaces at different positions.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        'Each attention head projects Q, K, V into a different d_k = d_model/h dimensional subspace via learned linear projections. Head i learns to attend based on a different notion of "relevance." The outputs of all h heads are concatenated and projected back to d_model, combining diverse relationship types simultaneously.',
      hints: [
        "One head might attend to syntactic dependencies (subject-verb agreement); another to semantic similarity; another to positional proximity.",
        "Multiple heads run in parallel - computationally no more expensive than single-head attention with dimension d_model, since d_k = d_model/h.",
      ],
    },
    {
      id: "q-dl-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "As shown in d2l.ai §11.6.2, self-attention has O(n\\^2\\cdotd) computational complexity and O(1) maximum path length between any two positions. Why does O(1) path length matter for learning?",
      options: [
        "O(1) path length means self-attention uses constant memory regardless of sequence length.",
        "O(1) path length means any token can directly influence any other token in a single forward pass, making it maximally easy to learn long-range dependencies - unlike RNNs where information must propagate through O(n) sequential steps.",
        "O(1) path length means the attention matrix has constant rank.",
        "O(1) path length means self-attention is faster than convolutions for short sequences.",
      ],
      correctAnswer: 1,
      explanation:
        "Path length = number of sequential steps between two positions for information to flow. In self-attention, the attention mechanism directly connects every token pair in one operation: position i attends to position j with attention score a_{ij} = softmax(q_i \\cdot k_j / √d). There is no intermediate token between i and j - information flows directly. By contrast, in an RNN: h_t = f(W\\cdoth_{t-1} + U\\cdotx_t), so h_100 depends on h_99, which depends on h_98, ..., which depends on h_1. The gradient \\partialL/\\partialh_1 must backpropagate through 99 matrix multiplications - each potentially vanishing or exploding.",
      hints: [
        "Self-attention computes attention scores between ALL token pairs simultaneously in one matrix operation: A = softmax(QK^T/√d). No intermediate tokens needed.",
        "RNN: to pass information from token 1 to token 100 requires 99 sequential hidden state updates. Each update multiplies by W - gradient decays as ‖W‖^99.",
      ],
    },
  ],

  "residual-connections": [
    {
      id: "q-dl-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does a residual (skip) connection add to the output of a layer?",
      options: [
        "A learnable scaling factor applied to the input.",
        "The input to the layer (identity shortcut) added to the layer\'s output: H(x) = F(x) + x.",
        "The output of the previous layer multiplied by the current layer\'s output.",
        "A normalization term based on the batch statistics.",
      ],
      correctAnswer: 1,
      explanation:
        "A residual connection computes H(x) = F(x) + x, where F(x) is the layer\'s transformation and x is the direct shortcut. The network learns the residual F(x) = H(x) − x rather than the full mapping H(x). He et al. (2016) showed this makes it much easier to train very deep networks by providing a clean gradient highway.",
      hints: [
        'The "skip" name comes from the shortcut that skips the transformation and adds the input directly.',
        "If F(x) = 0 (the layer learns to do nothing), H(x) = x - the network can preserve information exactly.",
      ],
    },
    {
      id: "q-dl-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Residual connections improve gradient flow because, by the chain rule, \\(\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial H} \\cdot (\\frac{\\partial F}{\\partial x} + 1)\\), where the \"+1\" term ensures a gradient of at least 1 flows along the skip path regardless of how small \\(\\frac{\\partial F}{\\partial x}\\) is.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "For a residual block \\(H(x) = F(x) + x\\), the gradient with respect to \\(x\\) is:\n\n\\[\n\\frac{\\partial L}{\\partial x} = \\frac{\\partial L}{\\partial H} \\cdot \\frac{\\partial H}{\\partial x} = \\frac{\\partial L}{\\partial H} \\cdot \\left(\\frac{\\partial F}{\\partial x} + 1\\right).\n\\]\n\nEven if \\(\\frac{\\partial F}{\\partial x} = 0\\) (e.g., due to ReLU saturation or vanishing gradients in deep networks), the \"+1\" from the skip connection ensures the gradient signal through the shortcut path is exactly \\(\\frac{\\partial L}{\\partial H}\\). This additive identity gradient is why ResNets can be trained at depths of 100-1000+ layers without vanishing gradients.",
      hints: [
        "H(x) = F(x) + x. By the chain rule: \\partialL/\\partialx = \\partialL/\\partialH \\cdot \\partialH/\\partialx = \\partialL/\\partialH \\cdot (\\partialF/\\partialx + 1). The skip path contributes exactly 1, regardless of how small \\partialF/\\partialx is.",
        "If \\partialF/\\partialx = 0 (vanishing gradient through the transformation), the skip connection still carries \\partialL/\\partialH \\cdot 1 = \\partialL/\\partialH - the gradient signal passes through the shortcut unchanged.",
      ],
    },
    {
      id: "q-dl-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Pre-activation residual networks (ResNet v2, He et al. 2016) apply BN+ReLU before the convolution rather than after. The main advantage is:",
      options: [
        "Pre-activation allows the skip connection to carry normalized values directly to the output.",
        "The identity skip path carries raw (un-normalized, un-activated) values - making the shortcut a truly clean identity, while BN+ReLU are applied within the residual branch only.",
        "Pre-activation doubles the effective depth of the network.",
        "Batch normalization is more accurate when applied before convolution.",
      ],
      correctAnswer: 1,
      explanation:
        "In ResNet v1 (post-activation), BN+ReLU are applied after the addition, so the skip path carries values through a ReLU - not a true identity. In ResNet v2 (pre-activation), the addition is between two raw (unnormalized, pre-activation) paths. The skip connection is truly H(x) = F(x) + x without any modification to x, giving cleaner gradient flow and better generalization on very deep networks.",
      hints: [
        "ResNet v1 (post-activation): h = ReLU(F(x) + x). The skip path x passes through ReLU before the addition - nonlinearity applied to x.",
        "ResNet v2 (pre-activation): h = F_preact(x) + x where F_preact = BN\\toReLU\\toConv. The addition is between two raw, pre-activation values: BN output + x. The skip path is a true identity mapping h = F(x) + x.",
      ],
    },
  ],

  "data-pipeline": [
    {
      id: "q-dl-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of data augmentation during training?",
      options: [
        "To increase dataset size by duplicating samples without modification.",
        "To artificially expand the effective training set with label-preserving transformations, improving generalization.",
        "To normalize pixel values to zero mean and unit variance.",
        "To balance class frequencies by oversampling rare classes exactly.",
      ],
      correctAnswer: 1,
      explanation:
        "Augmentation applies random label-preserving transformations (flips, crops, color jitter) to training images, effectively showing the model diverse views of each sample and improving robustness to those transformations at test time. A flipped cat is still a cat - the label is unchanged but the representation varies.",
      hints: [
        "A horizontally flipped cat is still a cat - the label doesn\'t change, but the model must learn this invariance.",
        "More diverse training examples (even synthetic ones) lead to better generalization.",
      ],
    },
    {
      id: "q-dl-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PyTorch\'s DataLoader with num_workers > 0 loads batches in separate worker processes to overlap data loading and model computation.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Multi-process data loading (num_workers > 0) fetches and preprocesses the next batch in background workers while the GPU trains on the current batch, eliminating the data loading bottleneck through pipeline parallelism. Without it (num_workers=0), the GPU sits idle during data loading.",
      hints: [
        "With num_workers=0, the GPU sits idle while the CPU loads data. Workers eliminate this idle time.",
        "This is the same producer-consumer pipeline pattern used in operating systems.",
      ],
    },
    {
      id: "q-dl-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MixUp data augmentation (Zhang et al., 2018) trains on convex combinations: x̃ = \\lambda\\cdotx\\_i + (1−\\lambda)\\cdotx\\_j, ỹ = \\lambda\\cdoty\\_i + (1−\\lambda)\\cdoty\\_j. Its main theoretical justification (Vicinal Risk Minimization) is:",
      options: [
        "It prevents the model from memorizing specific training examples by adding label noise.",
        "It encourages the model to behave linearly between training examples, improving calibration and reducing overconfident extrapolation between data points.",
        "It effectively doubles the training set size without requiring any additional storage.",
        "It forces the model to learn class-conditional feature representations.",
      ],
      correctAnswer: 1,
      explanation:
        "MixUp applies Vicinal Risk Minimization: instead of training only on discrete samples, it creates a vicinity around each training point by mixing two samples. The model is trained on (x̃, ỹ) where x̃ = \\lambda\\cdotx_i + (1−\\lambda)\\cdotx_j and ỹ = \\lambda\\cdoty_i + (1−\\lambda)\\cdoty_j, with \\lambda ~ Beta(\\alpha, \\alpha). This forces the model to satisfy the linear assumption f(\\lambda\\cdotx_i + (1−\\lambda)\\cdotx_j) \\approx \\lambda\\cdotf(x_i) + (1−\\lambda)\\cdotf(x_j) - the model behaves linearly between training examples. The result is smoother decision boundaries and better-calibrated probability estimates, reducing overconfident predictions.",
      hints: [
        "MixUp loss: L_MixUp = \\lambda\\cdotL(y_i, f(x_i)) + (1−\\lambda)\\cdotL(y_j, f(x_j)). The model is directly trained to satisfy f(\\lambda\\cdotx_i + (1−\\lambda)\\cdotx_j) \\approx \\lambda\\cdotf(x_i) + (1−\\lambda)\\cdotf(x_j).",
        "Standard ERM trains on exact labels (hard targets). MixUp trains on soft targets from a mixture distribution - this regularizes the function to be linear between data points.",
      ],
    },
  ],

  "mixed-precision": [
    {
      id: "q-dl-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary benefit of using FP16 (half precision) during training compared to FP32?",
      options: [
        "FP16 eliminates the need for gradient computation entirely.",
        "FP16 uses half the memory and enables faster tensor operations on modern GPU hardware, allowing larger models or batch sizes.",
        "FP16 provides higher precision for gradient updates, improving convergence.",
        "FP16 removes the need for a learning rate scheduler.",
      ],
      correctAnswer: 1,
      explanation:
        "FP16 uses 2 bytes vs. FP32's 4 bytes, halving memory for weights and activations. Modern GPUs (with Tensor Cores) compute FP16 matrix multiplications at 2-8\\times the throughput of FP32, enabling larger batch sizes or models within the same memory budget.",
      hints: [
        "16 bits = 2 bytes; 32 bits = 4 bytes. Less memory = larger batch size or bigger model.",
        "Tensor Cores on NVIDIA GPUs are specifically designed for fast FP16 and BF16 operations.",
      ],
    },
    {
      id: "q-dl-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Loss scaling in mixed-precision training shifts the gradient values upward before the backward pass to prevent FP16 underflow, then scales them back down before the optimizer step.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "FP16's minimum representable value is ~6\\times10\\^{-⁵; many gradients underflow to zero in FP16. Loss scaling multiplies the loss by a large constant (e.g., 2¹⁰=1024) to move gradients into representable range, with inverse scaling before updating weights in FP32. The master weights are kept in FP32 for numerical stability.",
      hints: [
        "Very small gradients (e.g., 10\\^{-⁷) are not representable in FP16 and become zero - underflow.",
        "Multiplying by 1024 moves those gradients into the FP16 representable range without changing the gradient direction.",
      ],
    },
    {
      id: "q-dl-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BF16 (Brain Float 16) is often preferred over FP16 for large language model training because:",
      options: [
        "BF16 has higher precision (more mantissa bits) than FP16.",
        "BF16 has the same 8-bit exponent range as FP32, preventing overflow without loss scaling, at the cost of fewer mantissa bits (7 vs. FP16's 10).",
        "BF16 is supported on all hardware including older consumer GPUs.",
        "BF16 enables automatic loss scaling while FP16 requires manual configuration.",
      ],
      correctAnswer: 1,
      explanation:
        "BF16: 1 sign bit + 8 exponent bits + 7 mantissa bits. FP16: 1 sign + 5 exponent + 10 mantissa. BF16's 8-bit exponent matches FP32 (dynamic range ~10\\^{-\\^3⁸ to 10\\^3⁸), avoiding the overflow issues of FP16 (max ~65,504) that plague large activations in LLMs. The reduced mantissa precision (7 vs. 10 bits) is rarely the bottleneck.",
      hints: [
        "FP16 max value is ~65,504 - activations in large models can easily exceed this. BF16 max is ~3\\times10\\^3⁸.",
        "Exponent bits determine dynamic range; mantissa bits determine precision. BF16 trades precision for range - a good trade for DL.",
      ],
    },
  ],

  "gradient-clipping": [
    {
      id: "q-dl-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What problem does gradient clipping directly address?",
      options: [
        "Vanishing gradients in deep networks.",
        "Exploding gradients that cause unstable weight updates and training divergence.",
        "Slow convergence due to a large learning rate.",
        "Overfitting by penalizing large weight values.",
      ],
      correctAnswer: 1,
      explanation:
        "Gradient clipping directly addresses exploding gradients - common in RNNs and some deep networks - by rescaling the gradient vector when its L2 norm exceeds a threshold:\n\n\\[\n\\mathbf{g} \\leftarrow \\mathbf{g} \\cdot \\frac{\\text{clip\\_value}}{\\|\\mathbf{g}\\|_2} \\quad \\text{if } \\|\\mathbf{g}\\|_2 > \\text{clip\\_value}.\n\\]\n\nWithout clipping, a single large gradient update can push parameters to NaN or to regions far from the loss minimum, causing training to diverge. Clipping acts as a safety bound on the maximum update magnitude.",
      hints: [
        "Exploding gradients cause loss spikes and NaN values - clipping prevents any single update from being catastrophically large.",
        "Think of it as a speed limiter: gradients cannot push the parameters faster than the clip threshold allows, preventing divergence.",
      ],
    },
    {
      id: "q-dl-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Global norm clipping rescales the entire gradient vector so that its total L2 norm equals the clip threshold, preserving the gradient direction.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Global norm clipping applies:\n\n\\[\n\\mathbf{g} \\leftarrow \\mathbf{g} \\cdot \\frac{\\text{clip\\_value}}{\\|\\mathbf{g}\\|_2}.\n\\]\n\nThis scales the entire gradient vector by a positive scalar, shrinking its magnitude to clip_value while preserving its direction (all relative angles between parameters are maintained). Unlike per-parameter clipping (which clips each element independently, distorting the update direction), global norm clipping maintains the geometric integrity of the gradient direction - which is why it is the standard approach for training transformers and RNNs.",
      hints: [
        "Rescaling a vector by a positive scalar preserves its direction (angle) while changing only its magnitude.",
        "Per-parameter clipping distorts the gradient direction because it clips each element independently. Global norm clipping scales all elements by the same factor, preserving the update direction.",
      ],
    },
    {
      id: "q-dl-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Monitoring the gradient norm during training is useful for diagnosing training health. Which pattern indicates a potential problem?",
      options: [
        "The gradient norm gradually decreasing over training epochs.",
        "The gradient norm suddenly spiking to many times its typical value, potentially indicating a bad batch or learning rate instability.",
        "The gradient norm remaining roughly constant throughout training.",
        "The gradient norm being smaller for later layers than earlier layers.",
      ],
      correctAnswer: 1,
      explanation:
        "A sudden spike in gradient norm (often 10-100\\times the baseline) signals a potentially destabilizing update - caused by a noisy/outlier batch, too-high learning rate, or a poorly structured input. Many practitioners set an alert or automatic clip threshold based on the running median gradient norm to catch these spikes before they diverge training.",
      hints: [
        "A calm, gradually decreasing norm means training is stable. A spike means something unusual happened.",
        "Monitoring gradient norms in tools like Weights & Biases can reveal training instability before loss diverges.",
      ],
    },
  ],

  "early-stopping": [
    {
      id: "q-dl-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does early stopping monitor to decide when to halt training?",
      options: [
        "The training loss, stopping when it reaches a predetermined threshold.",
        "The validation loss (or metric), stopping when it no longer improves for a defined number of epochs (patience).",
        "The gradient norm, stopping when gradients become smaller than 10\\^{-⁶.",
        "The wall-clock training time, stopping after a fixed number of hours.",
      ],
      correctAnswer: 1,
      explanation:
        'Early stopping monitors validation performance and halts training when improvement stagnates for "patience" epochs, preventing overfitting by stopping before the model memorizes training noise. Training loss always decreases if you train long enough - validation loss is the signal that reflects generalization.',
      hints: [
        "Training loss always decreases if you train long enough - validation is the signal that matters.",
        "Patience is the number of epochs you wait for improvement before calling it stopped.",
      ],
    },
    {
      id: "q-dl-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Model checkpointing saves the model weights at the epoch with the best validation performance, not necessarily the weights at the final training epoch.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Checkpointing saves snapshots during training; the best checkpoint (by validation metric) is retained as the final model. The last epoch\'s weights are often overfit relative to the best checkpoint - the optimal bias-variance tradeoff typically occurs before training fully converges.",
      hints: [
        "Training for 100 epochs with the best performance at epoch 67 - which checkpoint do you deploy? The epoch-67 one.",
        "The best checkpoint captures the optimal bias-variance tradeoff point during training.",
      ],
    },
    {
      id: "q-dl-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key limitation of using validation loss for early stopping is:",
      options: [
        "Validation loss is always noisier than training loss and cannot be trusted.",
        "If the validation set is used repeatedly to make stopping decisions, it is effectively used for model selection, introducing optimistic bias - the chosen model may not generalize to a truly held-out test set.",
        "Validation loss cannot be computed for regression tasks.",
        "Early stopping based on validation loss requires a quadratic amount of memory.",
      ],
      correctAnswer: 1,
      explanation:
        "Repeated early stopping on the same validation set constitutes implicit overfitting to the validation set - the stopping criterion is tuned to that specific validation set. Best practice uses three splits (train/val/test) where the test set is touched only once at the very end to get an unbiased performance estimate.",
      hints: [
        "If you optimize every training decision based on validation performance, the validation set is no longer unbiased.",
        "This is the same reason you need a test set separate from the validation set - the val set is used for model selection.",
      ],
    },
  ],

  "hyperparameter-tuning": [
    {
      id: "q-dl-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What advantage does random search have over grid search for hyperparameter tuning?",
      options: [
        "Random search always finds better hyperparameters than grid search.",
        "Random search explores hyperparameter space more efficiently when only a subset of hyperparameters significantly affect performance - covering more unique values of the important dimensions per trial.",
        "Random search requires fewer total experiments than grid search.",
        "Random search guarantees finding the global optimum given enough trials.",
      ],
      correctAnswer: 1,
      explanation:
        "Bergstra & Bengio (2012) showed that if only 2 of 5 hyperparameters are important, grid search wastes trials repeating the same values of the 3 unimportant parameters in different combinations. With grid search, the same value of an unimportant hyperparameter appears in every trial - it is tested once in combination with all values of the important ones. Random search samples unique values for all hyperparameters on every trial, exploring the important dimensions more thoroughly with the same total number of trials.",
      hints: [
        "If only 2 of 5 hyperparameters matter, grid search repeats the same value of the other 3 in every trial - wasting exploration on dimensions that don't affect performance.",
        "Random search samples different values for all 5 hyperparameters on every trial, giving more diverse coverage of the important dimensions.",
      ],
    },
    {
      id: "q-dl-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Bayesian optimization for hyperparameter tuning uses the results of previous trials to build a surrogate model that predicts which hyperparameters are likely to be good, reducing wasted experiments.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Bayesian optimization maintains a probabilistic surrogate (e.g., Gaussian process or Tree Parzen Estimator) of the objective function and uses an acquisition function (e.g., Expected Improvement) to select the next most promising hyperparameter configuration. Unlike random search, it learns from prior trials and focuses exploration on promising regions.",
      hints: [
        "Unlike random/grid search (memoryless), Bayesian optimization learns from previous results.",
        "Each trial informs the surrogate model about which regions of hyperparameter space are promising.",
      ],
    },
    {
      id: "q-dl-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Successive Halving and Hyperband address the cost of hyperparameter tuning by:",
      options: [
        "Running all trials to completion and selecting the best at the end.",
        "Allocating a small budget to many configurations, then progressively eliminating poor performers and giving more resources to survivors.",
        "Using gradient descent to optimize hyperparameters jointly with model weights.",
        "Training one very large model and using weight sharing to simulate many configurations.",
      ],
      correctAnswer: 1,
      explanation:
        "Successive Halving / Hyperband use a bandit-based strategy: start many configurations with tiny budgets (few epochs), eliminate the bottom half, double the budget for survivors, and repeat. This concentrates resources on promising configurations - bad hyperparameters reveal themselves quickly, saving compute compared to running all to completion.",
      hints: [
        "Most bad hyperparameter configurations reveal themselves quickly - early stopping of bad runs saves compute.",
        "Think of a tournament bracket: many first-round games (small budget), fewer as rounds progress (larger budget), one winner.",
      ],
    },
  ],

  "transfer-learning-dl": [
    {
      id: "q-dl-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In transfer learning, what does "feature extraction" mean?',
      options: [
        "Extracting hand-crafted features from data before passing them to the model.",
        "Freezing the pretrained model\'s layers and using them to produce fixed representations, training only a new task-specific head.",
        "Retraining all layers of the pretrained model on the new dataset.",
        "Extracting the model\'s weights and compressing them for deployment.",
      ],
      correctAnswer: 1,
      explanation:
        "Feature extraction uses the pretrained backbone as a frozen feature extractor - no gradient updates to its weights. Only the new task-specific head (e.g., a classification layer) is trained. This works because the pretrained network has learned rich, general-purpose features (edges, textures, shapes) that are useful for many downstream tasks.",
      hints: [
        '"Frozen" means no gradient updates to the backbone - only the new head learns.',
        "The pretrained network already knows how to extract useful features; you just redirect them to a new output.",
      ],
    },
    {
      id: "q-dl-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Fine-tuning a pretrained model typically requires a smaller learning rate than training from scratch to avoid catastrophically destroying the pretrained representations.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Pretrained weights encode valuable representations built over large-scale training. Large learning rates can overwrite them in a few gradient steps - catastrophic forgetting. A small LR (e.g., 10\\^{-⁵ instead of 10\\^{-\\^3) allows gentle adaptation to the new task while preserving the useful features encoded in the pretrained weights.",
      hints: [
        "Large updates at high LR can move weights far from their pretrained values, erasing learned features in a few steps.",
        "The goal is to nudge pretrained weights toward the new task, not scramble them with large random updates.",
      ],
    },
    {
      id: "q-dl-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Layer-wise learning rate decay (discriminative fine-tuning) assigns lower learning rates to early layers because:",
      options: [
        "Early layers have more parameters and require smaller updates to converge.",
        "Early layers capture general low-level features (edges, textures) that transfer well and should change minimally; later layers are task-specific and benefit from larger updates.",
        "Gradient magnitudes are always larger in early layers, requiring scaling.",
        "Early layers are closer to the input and thus see noisier gradients.",
      ],
      correctAnswer: 1,
      explanation:
        "Empirical analysis of CNN representations (Zeiler & Fergus, 2014) shows early layers learn low-level, universal features (edges, colors, Gabor-like filters) that are useful for virtually any vision task - these should be preserved. Later layers encode task-specific patterns that need significant adaptation for a new domain.",
      hints: [
        "Visualizations of CNN layers show early layers learn edges and textures that are useful for any vision task.",
        'The logic: early layers are "more general" (transferable) - change them less. Later layers are task-specific - change them more.',
      ],
    },
  ],

  "knowledge-distillation": [
    {
      id: "q-dl-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In knowledge distillation (Hinton et al., 2015), what does the "teacher" model provide beyond hard labels?',
      options: [
        "Larger labeled datasets generated by the teacher.",
        'Soft probability distributions over all classes (soft targets) that encode class similarities and the teacher\'s uncertainty - Hinton called this "dark knowledge."',
        "Pretrained weights that are directly copied to the student.",
        "Architectural templates that the student must exactly replicate.",
      ],
      correctAnswer: 1,
      explanation:
        'Soft targets (e.g., teacher assigns 0.7 to "cat", 0.2 to "leopard", 0.1 to other classes) encode the teacher\'s knowledge of class similarities. Hard labels (0 or 1) convey no information about relationships between classes. Hinton termed this "dark knowledge" - the meaningful signal in the non-argmax probabilities.',
      hints: [
        'A hard label of "cat" tells the student nothing about how similar cats are to leopards. Soft targets reveal: cat is 3\\times more like leopard than other classes.',
        'Hinton called the non-argmax probabilities "dark knowledge" - they contain the teacher\'s learned concept of similarity.',
      ],
    },
    {
      id: "q-dl-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The temperature parameter T in knowledge distillation controls the softness of the teacher\'s probability distribution; higher T produces softer (more uniform) distributions that expose more information in the non-argmax probabilities.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Soft targets use softmax(logits/T). High T flattens the distribution: at T=10, even large logit differences produce similar probabilities, exposing the full structure of the teacher\'s belief about class relationships. At T=1 (standard), the argmax dominates and little dark knowledge is visible. Distillation typically uses T=2-10.",
      hints: [
        "At T=1: softmax is standard, argmax dominates. At T=10: even classes with much smaller logits get meaningful probability.",
        "Think of temperature as contrast: high T = low contrast (flat, more information in non-peak classes), low T = high contrast (peaked).",
      ],
    },
    {
      id: "q-dl-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Feature-based distillation (e.g., FitNets) improves over response-based distillation by:",
      options: [
        "Only distilling from the teacher\'s final output layer.",
        "Matching intermediate hidden representations between teacher and student via hint layers, transferring richer structural knowledge than final logits alone.",
        "Using reinforcement learning to optimize the student\'s KL divergence from the teacher.",
        "Training the student and teacher jointly from scratch with shared weights.",
      ],
      correctAnswer: 1,
      explanation:
        "FitNets (Romero et al., 2015) add intermediate supervision: the student\'s hidden layers are trained to match the teacher\'s intermediate representations via L2 loss on features. This transfers internal representations (how the model represents intermediate concepts) not captured by final-layer logits alone - enabling thinner-but-deeper students to learn richer representations.",
      hints: [
        'Final logits distill "what to predict." Feature matching distills "how to represent the input internally."',
        "FitNets train a thinner-but-deeper student to mimic the teacher\'s intermediate feature maps at hint layers.",
      ],
    },
  ],

  "neural-architecture-search": [
    {
      id: "q-dl-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does Neural Architecture Search (NAS) automate?",
      options: [
        "The selection of training hyperparameters like learning rate and batch size.",
        "The design of the neural network architecture itself (layer types, connections, widths) to optimize a target metric like validation accuracy or inference speed.",
        "The labeling of training data using a pre-existing model.",
        "The deployment and serving infrastructure for trained models.",
      ],
      correctAnswer: 1,
      explanation:
        "NAS automates the architecture design process - searching over a space of possible network architectures (layer types, skip connections, widths, depths) to find configurations that optimize validation accuracy, inference efficiency, or a weighted combination. NASNet, EfficientNet, and MobileNetV3 were all found via NAS.",
      hints: [
        "Traditionally, humans hand-design architectures (ResNet, VGG). NAS lets algorithms do this architectural search.",
        "NAS optimizes the architecture, not the weights - weight training happens in an inner loop for each candidate architecture.",
      ],
    },
    {
      id: "q-dl-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Differentiable NAS (DARTS) makes architecture search tractable by relaxing discrete architecture choices into a continuous mixture, enabling gradient-based optimization over both architecture weights and operation weights jointly.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "DARTS (Liu et al., 2019) represents the architecture as a softmax-weighted mixture of candidate operations (e.g., 3\\times3 conv, 5\\times5 conv, skip, pooling). Architecture weights \\alpha and operation weights W are trained jointly via gradient descent - the final discrete architecture is derived by selecting the highest-weight operation at each position.",
      hints: [
        "Discrete choices (which operation?) can\'t be optimized by gradients. DARTS makes them continuous via softmax.",
        'The "architecture weights" are trainable via gradient descent, not enumeration - making NAS orders of magnitude faster.',
      ],
    },
    {
      id: "q-dl-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "One-shot NAS methods (e.g., Single-Path One-Shot) reduce search cost by:",
      options: [
        "Training one network per architecture candidate in parallel on separate GPUs.",
        "Training a single supernet containing all candidate architectures as subgraphs; architectures are evaluated by sampling paths through the supernet without retraining.",
        "Using reinforcement learning with a controller that proposes architectures sequentially.",
        "Pruning a large network and treating the resulting sparse subnetwork as the searched architecture.",
      ],
      correctAnswer: 1,
      explanation:
        "One-shot NAS trains a single supernet once (all 2^N candidate architectures share weights in it). Evaluation and search are cheap - sample a path, evaluate it using the supernet\'s shared weights, no additional training needed. Total cost: O(1 \\times training_cost) instead of O(N \\times training_cost) for training each candidate separately.",
      hints: [
        'Instead of training each candidate architecture from scratch, train one supernet and "rent" weights from it.',
        "Weight sharing is the key: all 2^N candidate architectures share the supernet\'s parameters.",
      ],
    },
  ],

  "multitask-learning": [
    {
      id: "q-dl-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the core idea behind multitask learning?",
      options: [
        "Training separate models for each task and ensembling their predictions.",
        "Training a shared model on multiple related tasks simultaneously, allowing the shared backbone to benefit from all tasks via implicit data augmentation and inductive bias.",
        "Training a model that can switch between tasks at inference time based on the input.",
        "Fine-tuning a general model sequentially on each task one at a time.",
      ],
      correctAnswer: 1,
      explanation:
        "Multitask learning shares parameters (usually a backbone) across tasks, training jointly on all objectives. The shared backbone sees more diverse data than any single-task model, learning more general features. This is especially beneficial when individual task datasets are small - related tasks act as a form of regularization for each other.",
      hints: [
        "Think of learning Spanish while also studying Portuguese - the shared vocabulary and grammar rules help both.",
        "The shared backbone sees more diverse data (from all tasks) than any single-task model would.",
      ],
    },
    {
      id: "q-dl-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Task weighting in multitask learning is important because different tasks may have different loss scales, and naive summation can cause the optimizer to focus disproportionately on high-loss tasks.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "If Task A has loss ~1000 (e.g., pixel-wise reconstruction) and Task B has loss ~0.1 (e.g., classification), a naive sum overwhelmingly optimizes Task A - gradients from Task A are 10,000\\times larger. Task weighting (manual or learned, e.g., GradNorm, uncertainty weighting) balances gradient contributions so all tasks improve together.",
      hints: [
        "Imagine trying to optimize two goals where one has 10,000\\times larger gradients - the optimizer ignores the smaller one.",
        "GradNorm and Kendall et al.'s uncertainty-based weighting are popular automatic methods for balancing task losses.",
      ],
    },
    {
      id: "q-dl-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Negative transfer in multitask learning occurs when:",
      options: [
        "The shared model performs worse on all tasks compared to single-task baselines because tasks have conflicting gradients or incompatible representations.",
        "Training on multiple tasks requires more GPU memory than single-task training.",
        "The model transfers knowledge from the target task back to the source task.",
        "The multitask model is too large to fit on the available hardware.",
      ],
      correctAnswer: 0,
      explanation:
        "Negative transfer happens when tasks are dissimilar or have conflicting gradients - a gradient update helpful for Task A hurts Task B. The multitask model underperforms single-task baselines on one or more tasks. Gradient surgery and careful task selection are research directions specifically aimed at avoiding negative transfer.",
      hints: [
        "Not all task combinations are synergistic - forcing unrelated tasks to share representations can hurt both.",
        "Gradient surgery projects conflicting task gradients to remove the conflicting component before applying the update.",
      ],
    },
  ],

  "continual-learning": [
    {
      id: "q-dl-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is catastrophic forgetting in neural networks?",
      options: [
        "A hardware failure that deletes model weights during training.",
        "The tendency of a neural network to sharply lose performance on previously learned tasks when trained sequentially on new tasks, because gradient updates overwrite weights important for old tasks.",
        "The model failing to converge due to an unstable loss landscape.",
        "Gradient explosion that destroys the learned representations in a single batch.",
      ],
      correctAnswer: 1,
      explanation:
        "Catastrophic forgetting (McCloskey & Cohen, 1989) occurs because gradient updates for new task data modify the same weights used by old tasks. Unlike human memory which has separation between old and new memories, neural networks store all tasks in shared weights - training on new data can overwrite the patterns learned for old data.",
      hints: [
        "Imagine a model perfectly classifying dogs, then trained exclusively on cats - gradient updates optimizing cat classification can overwrite the dog-classification weights.",
        "Unlike humans, neural networks don\'t have separate storage for past experiences - everything shares the same weight matrix.",
      ],
    },
    {
      id: "q-dl-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Elastic Weight Consolidation (EWC) mitigates catastrophic forgetting by penalizing changes to weights that were important for previous tasks, using the Fisher information matrix as a measure of importance.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "EWC (Kirkpatrick et al., 2017) adds L = L_new + \\lambda \\Sigma\\_i F\\_i(\\theta\\_i − \\theta*\\_i)\\^2 where F\\_i is the Fisher information diagonal (measuring parameter importance for old tasks) and \\theta*\\_i are old task weights. High-Fisher weights are strongly anchored; low-Fisher weights can change freely for new tasks.",
      hints: [
        "Fisher information identifies which weights mattered most for the previous task (high Fisher = important).",
        "The penalty anchors important weights near their old task values, allowing unimportant weights to adapt freely to new tasks.",
      ],
    },
    {
      id: "q-dl-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Experience replay in continual learning addresses catastrophic forgetting by:",
      options: [
        "Freezing all weights except the final classification layer when learning new tasks.",
        "Maintaining a small memory buffer of old task examples and mixing them into new task training batches, so the model continuously re-learns old tasks alongside new ones.",
        "Training separate model copies for each task and routing inputs to the correct copy.",
        "Using attention mechanisms to explicitly mask old task neurons from new task updates.",
      ],
      correctAnswer: 1,
      explanation:
        "Experience replay (Gradient Episodic Memory, ER-ACE) maintains a small buffer of old task samples and interleaves them with new task batches during training. By continuously seeing examples of old tasks, the model cannot completely overwrite old task knowledge. The tradeoff: memory overhead for storing old examples vs. forgetting prevention.",
      hints: [
        "If the model keeps seeing a few examples from old tasks during new task training, it cannot forget them completely.",
        "The buffer size is a key hyperparameter: larger buffer \\to less forgetting but more memory.",
      ],
    },
  ],

  pruning: [
    {
      id: "q-dl-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the goal of neural network pruning?",
      options: [
        "To add more neurons to under-performing layers.",
        "To remove redundant or unimportant weights (or neurons/filters) to create a smaller, faster model with minimal accuracy loss.",
        "To reduce the model\'s training dataset size.",
        "To convert the model\'s floating-point weights to integer values.",
      ],
      correctAnswer: 1,
      explanation:
        "Pruning removes parameters (weights, neurons, or filters) that contribute least to the model\'s outputs, producing a sparser or narrower model. Many network weights are near-zero and contribute negligibly to predictions - removing them reduces memory and computation with minimal accuracy impact. LeCun\'s Optimal Brain Damage (1990) showed this quantitatively.",
      hints: [
        "Not all weights are equally important - many can be set to zero with negligible accuracy impact.",
        "Think of pruning a tree: removing dead branches doesn\'t kill the tree, it makes it more efficient.",
      ],
    },
    {
      id: "q-dl-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'The Lottery Ticket Hypothesis (Frankle & Carlin, 2019) proposes that dense networks contain sparse subnetworks ("winning tickets") that, if trained in isolation from the same initialization, can match the full network\'s accuracy.',
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        'Frankle & Carlin found that winning ticket subnetworks exist inside large networks. Key: the subnetwork must be trained from the original initialization (not random reinitialization) - "rewinding" weights to their initial values. This suggests dense networks are overparameterized and contain efficient sparse cores that are hard to find directly.',
      hints: [
        'The "lottery" metaphor: you buy many tickets (parameters) hoping a few win (are the important ones for training).',
        "The winning ticket must use the original initialization - rewinding weights to random reinitialization does not work as well.",
      ],
    },
    {
      id: "q-dl-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Structured pruning (removing entire filters or neurons) is preferred over unstructured (weight-level) pruning for inference speedup because:",
      options: [
        "Structured pruning achieves higher sparsity ratios than unstructured pruning.",
        "Unstructured sparsity produces irregular memory access patterns that standard GPU hardware cannot efficiently accelerate, while removing whole filters produces dense smaller matrices that map directly to optimized BLAS routines.",
        "Structured pruning requires no retraining after the pruning step.",
        "Unstructured pruning always causes higher accuracy loss than structured pruning.",
      ],
      correctAnswer: 1,
      explanation:
        "A weight matrix with 50% zeros scattered randomly is not faster on a GPU than a dense matrix - GPUs are optimized for regular, dense computation. Removing 10 of 64 filters creates a 54-filter dense layer - a smaller but still dense matrix that fully utilizes CUDA matmul optimization. Sparse BLAS support is improving but still not universally available.",
      hints: [
        "A dense matrix with 50% random zeros is not faster on a GPU - hardware prefers regularity over sparsity.",
        "Removing 10 of 64 filters creates a 54-filter dense layer - smaller, dense, and fast on any hardware.",
      ],
    },
  ],

  "quantization-dl": [
    {
      id: "q-dl-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does model quantization do to reduce inference cost?",
      options: [
        "It reduces the number of layers in the model.",
        "It represents weights and/or activations using lower-bit integers (e.g., INT8, INT4) instead of 32-bit or 16-bit floats, reducing memory and bandwidth requirements.",
        "It replaces all attention layers with faster alternatives.",
        "It applies knowledge distillation to create a smaller student model.",
      ],
      correctAnswer: 1,
      explanation:
        "Quantization maps floating-point values to lower-precision integers. INT8 uses 4\\times less memory than FP32 and is supported by fast integer arithmetic on modern hardware accelerators. Memory bandwidth is often the bottleneck for LLM inference - quantization directly reduces the bytes transferred per weight, enabling faster token generation.",
      hints: [
        "FP32 \\to INT8: 32 bits \\to 8 bits = 4\\times smaller. More data fits in cache; memory bandwidth demand drops 4\\times.",
        "Integer multiply-accumulate (MAC) operations are faster and cheaper than floating-point on most hardware.",
      ],
    },
    {
      id: "q-dl-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Post-Training Quantization (PTQ) can be applied to a pretrained model without retraining, while Quantization-Aware Training (QAT) simulates quantization noise during training to produce more accurate quantized models.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "PTQ quantizes a trained model using calibration data (no gradient updates) - fast and practical but may degrade accuracy at aggressive bit widths (INT4). QAT inserts fake quantization nodes during training so the model adapts to quantization error via gradient descent, typically achieving higher accuracy at the same bit width at the cost of full retraining.",
      hints: [
        "PTQ: take the finished model, quantize it, done. QAT: train with quantization simulation so the model learns to be robust.",
        "QAT is slower (requires full training) but produces better accuracy, especially for aggressive quantization (INT4, INT2).",
      ],
    },
    {
      id: "q-dl-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GPTQ and AWQ are methods for quantizing large language models to INT4. They differ from naive rounding because they:",
      options: [
        "They train the model from scratch in INT4 precision.",
        "GPTQ uses second-order Hessian information to compensate for quantization errors layer-by-layer; AWQ identifies salient weights (those receiving large activations) and protects them via per-channel scaling - both far outperforming naive round-to-nearest at INT4.",
        "They convert attention layers to INT4 and keep feed-forward layers in FP16.",
        "They quantize only the embedding tables and leave attention weights in FP32.",
      ],
      correctAnswer: 1,
      explanation:
        "INT4 quantization maps each weight to one of 16 values - naive rounding loses significant information. GPTQ uses the Optimal Brain Quantization framework: after quantizing each weight, it adjusts remaining weights in the row to compensate, using the inverse Hessian. AWQ finds ~1% of salient weights (high activation magnitude) and scales them before quantization, protecting the most informative weights.",
      hints: [
        "Naive rounding at INT4 (16 possible values) loses a lot of precision. Smart methods compensate by adjusting other weights or using activation-aware scaling.",
        "AWQ\'s insight: not all weights are equally important - those multiplied by large activations matter more.",
      ],
    },
  ],

  "dl-debugging": [
    {
      id: "q-dl-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A training loss curve that remains completely flat from the very first step most likely indicates:",
      options: [
        "The model is converging very quickly to the optimum.",
        "A bug causing zero or constant gradients - e.g., a dead ReLU initialization, incorrect loss function, or accidentally detached computation graph.",
        "The learning rate is too small and training will eventually progress.",
        "The validation set is too similar to the training set.",
      ],
      correctAnswer: 1,
      explanation:
        "A perfectly flat loss from step 0 (not gradually plateauing, but immediately flat) signals that no learning is happening - gradients are zero. Common causes: accidentally calling tensor.detach() breaking the computation graph, using the wrong loss function (e.g., MSE instead of cross-entropy for classification), all-zero initialized weights with ReLU (dead neurons), or a target label bug.",
      hints: [
        "If loss = constant from step 1, the optimizer is not receiving any gradient signal.",
        "Common culprits: tensor.detach(), wrong loss, all-zero init with ReLU - all produce constant zero gradients.",
      ],
    },
    {
      id: "q-dl-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gradient flow visualization (plotting per-layer gradient norms) can diagnose both vanishing and exploding gradient problems during training.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Per-layer gradient norm plots reveal gradient health throughout the network. Vanishing: norms near zero in early layers (those layers not learning). Exploding: norms in the thousands (updates destabilize training). Tools like TensorBoard, Weights & Biases, or a simple hook logging ||\\nablaW||\\_2 per layer can identify these issues.",
      hints: [
        "Vanishing: gradient norms near zero for early layers. Exploding: gradient norms in the thousands for any layer.",
        "Logging per-layer gradient norms at each step is a key debugging practice for deep network training.",
      ],
    },
    {
      id: "q-dl-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "overfit a single batch" debugging technique works because:',
      options: [
        "It verifies the model can perfectly memorize at least one sample, confirming the forward pass, loss, and backward pass are all correctly implemented before scaling to full data.",
        "It measures generalization by testing how quickly the model overfits to training data.",
        "It finds the optimal learning rate for the full training set.",
        "It identifies noisy labels in the training set.",
      ],
      correctAnswer: 0,
      explanation:
        "Any correct model should be able to achieve near-zero loss on a tiny batch (1-32 samples) - it has enough capacity to memorize them. If it cannot, there is a bug in the architecture, loss function, or optimizer before you even attempt generalization. This test isolates implementation correctness from dataset/generalization issues, saving time on large-scale debugging.",
      hints: [
        "A model should easily memorize 1-32 examples - if it can\'t, something is fundamentally wrong.",
        'This test separates "is my code correct?" from "will my model generalize?" - answer the first question first.',
      ],
    },
  ],

  "modern-activation-functions": [
    {
      id: "q-dl-kp30-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SiLU (Sigmoid Linear Unit / Swish) is defined as SiLU(x) = x \\cdot \\sigma(x). Compared to ReLU, which property does SiLU possess that makes it beneficial for deep networks?",
      options: [
        "SiLU is computationally cheaper than ReLU because it avoids the max operation",
        "SiLU is smooth and non-monotonic - it has a small negative region near x \\approx −1.28, allowing the network to learn to suppress near-zero activations rather than hard-zeroing them, improving gradient flow and empirical performance in deep architectures",
        "SiLU eliminates the vanishing gradient problem entirely because its derivative is always \\geq 1",
        "SiLU is equivalent to ReLU for positive inputs and LeakyReLU for negative inputs",
      ],
      correctAnswer: 1,
      explanation:
        "SiLU(x) = x\\cdot\\sigma(x) is smooth (infinitely differentiable), self-gated, and non-monotonic with a global minimum near x \\approx −1.28. Unlike ReLU's hard zero for x < 0, SiLU allows small negative values to pass, providing a richer gradient signal. Empirically, SiLU outperforms ReLU in EfficientNet, MobileNetV3, and large language model FFN layers. Its derivative SiLU'(x) = \\sigma(x) + x\\cdot\\sigma(x)\\cdot(1−\\sigma(x)) is nonzero for all x.",
      hints: [
        "Self-gating: the activation gates itself (x \\cdot \\sigma(x)) rather than using a separate learned gate.",
        "SiLU is the activation function used in EfficientNet and many modern vision transformers.",
      ],
    },
    {
      id: "q-dl-kp30-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GELU (Gaussian Error Linear Unit) is defined as GELU(x) = x \\cdot \\Phi(x), where \\Phi is the standard normal CDF. What is the intuition behind this formulation, and why is it preferred in transformer architectures like BERT and GPT?",
      options: [
        "GELU approximates ReLU but is computationally faster due to lookup table approximation of \\Phi(x)",
        "GELU stochastically gates inputs: each input x is multiplied by the probability that x is greater than a standard normal random draw - smoothly blending identity (x passes through) and zero-gating based on the input's magnitude, which regularizes and improves calibration in attention-based models",
        "GELU is preferred because it is the only activation function with a closed-form derivative",
        "GELU eliminates the need for layer normalization in transformer blocks",
      ],
      correctAnswer: 1,
      explanation:
        "GELU(x) = x\\cdot\\Phi(x) can be interpreted as: scale x by the probability that a standard normal random variable Z is less than x. For large positive x, \\Phi(x) \\approx 1 (full pass-through); for large negative x, \\Phi(x) \\approx 0 (suppressed). This smooth stochastic gating outperforms ReLU in BERT, GPT-2/3, ViT, and most modern transformers. Approximation: GELU(x) \\approx 0.5x\\cdot(1 + tanh(√(2/\\pi)\\cdot(x + 0.044715\\cdotx\\^3))) is commonly used in practice.",
      hints: [
        "GELU is the default activation in BERT, GPT-2, GPT-3, and ViT - it has essentially replaced ReLU in transformer architectures.",
        "The approximation using tanh avoids computing the true Gaussian CDF and is accurate to within 0.001% on the typical input range.",
      ],
    },
    {
      id: "q-dl-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SwiGLU (Swish-Gated Linear Unit) is used in LLaMA, PaLM, and Mistral FFN layers. It replaces the standard FFN (Linear \\to activation \\to Linear) with which formulation?",
      options: [
        "FFN(x) = SiLU(W\\_1x + b\\_1) + W\\_2x + b\\_2 - adding a residual path inside the FFN block",
        "FFN(x) = (SiLU(W\\_1x) ⊙ W\\_3x) \\cdot W\\_2 - a gated linear unit where one branch applies SiLU and the other is a learned linear gate, combined via elementwise multiplication before the output projection",
        "FFN(x) = SiLU(W\\_1x) \\cdot SiLU(W\\_2x) - applying SiLU to both linear projections and multiplying the results",
        "FFN(x) = LayerNorm(SiLU(W\\_1x + b\\_1)) \\cdot W\\_2 - inserting layer normalization between the two linear layers",
      ],
      correctAnswer: 1,
      explanation:
        "SwiGLU(x, W, V, W\\_2) = (SiLU(xW) ⊙ xV) W\\_2. Two linear projections (W and V) split the input: one branch applies SiLU as the activation, the other is a linear gate. Their elementwise product selects which features pass. This gated architecture requires a third weight matrix but delivers better perplexity per parameter. LLaMA models use SwiGLU with a hidden dimension scaled to 8/3 of d_model to maintain parameter count parity with the standard 4\\timesd_model FFN.",
      hints: [
        "GLU family: Gated Linear Units use elementwise multiplication of two linear branches - the gate controls information flow.",
        "LLaMA/Mistral FFN: three weight matrices (W_gate, W_up, W_down) rather than the standard two (W_1, W_2) in vanilla transformers.",
      ],
    },
  ],
  "dl-frameworks": [
    {
      id: "q-dl-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key difference between PyTorch\'s eager mode and TensorFlow 1.x\'s graph mode?",
      options: [
        "PyTorch requires compilation before execution; TensorFlow does not.",
        "PyTorch executes operations immediately (eager), building the computational graph dynamically on each forward pass; TensorFlow 1.x first builds a static graph, then executes it in a session.",
        "TensorFlow supports GPU acceleration; PyTorch does not.",
        "PyTorch uses NumPy arrays internally; TensorFlow uses its own tensor format.",
      ],
      correctAnswer: 1,
      explanation:
        "As described in d2l.ai §6.1 (Builders' Guide), eager mode executes each operation immediately as it\'s called, making debugging intuitive (Python debuggers work naturally). Graph mode (TF 1.x) requires define-then-run: first construct the static graph, then pass data through it in a session. Eager mode is slower for some deployments but far more developer-friendly.",
      hints: [
        "Eager: x = torch.mm(A, B) executes immediately and you can print x. Graph: you define the computation, then run it in a session.",
        'd2l.ai uses PyTorch\'s eager mode throughout because "operations execute immediately as they are invoked."',
      ],
    },
    {
      id: "q-dl-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "torch.compile() (PyTorch 2.0+) applies graph capture and kernel fusion to accelerate eager-mode PyTorch code, often achieving 2\\times speedups without changing the model definition.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "torch.compile() traces the model\'s computation graph, applies optimizations like operator fusion (combining multiple kernels into one), and generates optimized code via TorchInductor/Triton. This gets closer to graph-mode efficiency while preserving eager-mode flexibility and debuggability.",
      hints: [
        "torch.compile() is a JIT compiler - it analyzes the computation graph and optimizes it without changing your code.",
        "Kernel fusion means combining e.g., a matmul + bias add + activation into a single GPU kernel - fewer memory round-trips.",
      ],
    },
    {
      id: "q-dl-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "As described in d2l.ai §6.4, lazy initialization defers weight initialization until the first forward pass. The primary advantage over eager initialization is:",
      options: [
        "Lazy initialization is faster because it avoids random number generation.",
        "Lazy initialization infers the correct input dimension automatically from the first batch of data, eliminating the need to manually specify n_in for each layer.",
        "Lazy initialization allows weights to be initialized with pretrained values.",
        "Lazy initialization enables the model to change its architecture at runtime.",
      ],
      correctAnswer: 1,
      explanation:
        'As d2l.ai §6.4 explains: "lazy initialization is convenient, allowing the framework to infer parameter shapes automatically." With nn.LazyLinear, you specify the output dimension but not the input - the input dimension is inferred from the first forward pass. This eliminates dimension arithmetic errors and makes architecture prototyping faster.',
      hints: [
        "Without lazy init, you must compute each layer\'s input dimension from the previous layer\'s output - error-prone for complex architectures.",
        "d2l.ai shows nn.LazyLinear - you only specify output size; input size is inferred from the first batch.",
      ],
    },
  ],
};

const questionsExtra: Record<string, Question[]> = {
  "transformer-fundamentals": [
    {
      id: "q-dl-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the scaled dot-product attention mechanism, queries Q, keys K, and values V are derived from the input. Why is the dot product scaled by 1/sqrt(d_k)?",
      options: [
        "To make the attention weights sum to d_k instead of 1",
        "To prevent the dot products from growing large in magnitude when d_k is large, which would push softmax into regions with very small gradients",
        "To normalize the value vectors so they have unit norm",
        "To ensure queries and keys have the same dimensionality as values",
      ],
      correctAnswer: 1,
      explanation:
        "When d_k is large, dot products Q times K^T grow in magnitude because they are sums of d_k terms each with variance 1. Large values push softmax toward near-one-hot distributions with near-zero gradients. Scaling by 1/sqrt(d_k) normalizes the variance of the dot product to 1, keeping gradients healthy.",
      hints: [
        "If each element of Q and K has zero mean and unit variance, Q times K^T has variance d_k - dividing by sqrt(d_k) gives variance 1.",
        "Near-one-hot softmax outputs have near-zero gradients everywhere except the argmax - this kills learning.",
      ],
    },
    {
      id: "q-dl-kp31-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Sinusoidal positional encodings in the original transformer are learned parameters that are updated during training.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "Vaswani et al. (2017) used fixed sinusoidal positional encodings - sin and cos functions of different frequencies - that are not learned. This allows the model to generalize to sequence lengths not seen during training. Later models like BERT and GPT-2 switched to learned positional embeddings.",
      hints: [
        "PE(pos, 2i) = sin(pos / 10000^(2i/d_model)) - this is a fixed formula, not a weight matrix.",
        "Sinusoidal encodings allow extrapolation to longer sequences; learned encodings may not generalize beyond training lengths.",
      ],
    },
    {
      id: "q-dl-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multi-head attention with h heads splits d_model into h subspaces of dimension d_k = d_model/h. What is the computational advantage of this design compared to a single head with d_model dimensions?",
      options: [
        "Multi-head attention requires fewer parameters because d_k is less than d_model",
        "Each head can attend to different representation subspaces simultaneously while keeping total computation comparable to a single full-dimension attention operation",
        "Multi-head attention eliminates the need for positional encodings",
        "Multi-head attention reduces the quadratic O(n squared) complexity of attention to linear O(n)",
      ],
      correctAnswer: 1,
      explanation:
        "With h heads of dimension d_k = d_model/h each, total computation is h times O(n squared times d_k) = O(n squared times d_model) - the same as one full-dimensional head. The benefit is representational diversity: different heads can capture syntactic, semantic, and positional patterns in parallel, improving model expressivity without extra cost.",
      hints: [
        "Total parameters for h heads equals a constant in d_model - the computation scales identically.",
        "Visualizations of attention heads show specialization: some heads attend to syntax, others to coreference.",
      ],
    },
  ],

  "modern-architectures": [
    {
      id: "q-dl-kp32-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Mamba (Gu and Dao, 2023) uses a selective state space model (SSM) to achieve linear-time sequence modeling. What makes Mamba's SSM 'selective' compared to classical linear SSMs?",
      options: [
        "Mamba selects which attention heads to activate based on input",
        "Mamba's state transition matrices A, B, C are functions of the input token, allowing the model to selectively retain or discard information based on content",
        "Mamba uses sparse activations similar to mixture-of-experts",
        "Mamba selects between SSM and attention layers based on sequence length",
      ],
      correctAnswer: 1,
      explanation:
        "Classical SSMs have fixed (input-independent) parameters. Mamba makes B, C, and the discretization delta input-dependent, so the model dynamically selects how much each input token modifies the hidden state. This gives it context-dependent filtering like attention but with O(n) inference cost.",
      hints: [
        "In S4, the transition matrix A is fixed. In Mamba, the input gate modulates how much each token updates the state.",
        "Content-dependent state transitions enable Mamba to forget irrelevant tokens and retain relevant ones - like soft attention but recurrent.",
      ],
    },
    {
      id: "q-dl-kp32-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "RWKV combines elements of transformers and RNNs to achieve transformer-quality performance with linear-time inference, making it suitable for very long sequences.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "RWKV (Peng et al., 2023) uses a linear attention formulation that can be computed recurrently (O(n) inference) or in parallel (like transformers during training). It matches transformer quality on many NLP benchmarks while scaling to very long sequences without quadratic memory cost.",
      hints: [
        "RWKV stands for Receptance Weighted Key Value - it replaces softmax attention with linear attention computed recurrently.",
        "During inference, RWKV runs as an RNN (O(1) per token); during training it runs in parallel like a transformer.",
      ],
    },
    {
      id: "q-dl-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "RetNet (Sun et al., 2023) introduces a 'retention' mechanism as an alternative to standard softmax attention. What is the key computational property that distinguishes it?",
      options: [
        "Retention uses sparse connections between tokens to reduce computation",
        "Retention allows three computation modes: parallel (like transformers for training), recurrent (O(1) per token for inference), and chunkwise-recurrent (balancing training efficiency and sequence length)",
        "Retention replaces softmax with a linear activation to save memory",
        "Retention uses relative positional bias instead of absolute positional encoding",
      ],
      correctAnswer: 1,
      explanation:
        "RetNet\'s key innovation is the \"dual-form\" property: the same model parameters admit three computation modes:\n\n- **Parallel mode**: computes all positions simultaneously (like standard attention), used during training for efficient parallelization.\n- **Recurrent mode**: computes each token sequentially with O(1) memory and computation per step, used during inference for linear-time decoding.\n- **Chunkwise mode**: processes chunks of the sequence at a time, balancing long-sequence training efficiency with recurrent efficiency.\n\nThis eliminates the traditional trade-off where transformers are efficient for training but inefficient for inference, and RNNs are efficient for inference but hard to parallelize for training.",
      hints: [
        "The three modes of RetNet: parallel (GPT-style training), recurrent (RNN-style inference), chunkwise (long-document processing).",
        "This parallelism-recurrence duality means one model supports both efficient training (parallel) and efficient inference (recurrent) - eliminating the architecture mismatch of standard transformers vs. RNNs.",
      ],
    },
  ],

  "training-stability-advanced": [
    {
      id: "q-dl-kp33-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Gradient clipping by global norm computes the L2 norm of all gradients concatenated and scales them down if the norm exceeds a threshold. Why is global norm clipping preferred over per-parameter clipping?",
      options: [
        "Global norm clipping is faster to compute than per-parameter clipping",
        "Global norm clipping preserves the direction of the gradient update while only reducing its magnitude, whereas per-parameter clipping distorts the update direction",
        "Global norm clipping applies only to the final layer where gradients are largest",
        "Global norm clipping is required by all modern deep learning frameworks",
      ],
      correctAnswer: 1,
      explanation:
        "When you clip each parameter's gradient independently, the relative magnitudes change, distorting the update direction. Global norm clipping scales all gradients by the same factor, preserving the direction of the update vector in parameter space while bounding its magnitude. This is the standard approach in transformers and RNNs.",
      hints: [
        "If you clip two gradients independently to the same value, the combined direction changes. Scaling both by the same factor preserves direction.",
        "PyTorch's torch.nn.utils.clip_grad_norm_ implements global norm clipping.",
      ],
    },
    {
      id: "q-dl-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Loss spikes during LLM training are typically caused by outlier batches with very high loss, and the standard mitigation is to simply skip those batches.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "Skipping loss spike batches is one approach but is not the only or necessarily the best one. Loss spikes also arise from learning rate being too high, optimizer state corruption, or numerical instability. Mitigation strategies include gradient clipping, loss spike detection with rollback to a checkpoint, learning rate reduction, and better data filtering.",
      hints: [
        "PaLM (Chowdhery et al., 2022) handled loss spikes by restarting from a checkpoint before the spike and skipping the problematic data.",
        "Gradient clipping prevents spikes from corrupting optimizer momentum state - stopping gradient explosions before they compound.",
      ],
    },
    {
      id: "q-dl-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Stochastic Weight Averaging with warm restarts (SWAR) improves model generalization. What is the intuition behind warm restarts in this context?",
      options: [
        "Warm restarts gradually reduce the learning rate to zero each cycle, ensuring the model converges to the global minimum",
        "Warm restarts periodically reset the learning rate to a high value, causing the optimizer to explore different regions of loss landscape and enabling averaging of diverse weight solutions",
        "Warm restarts reinitialize the model weights periodically to escape local minima",
        "Warm restarts increase the batch size at each restart to improve gradient estimates",
      ],
      correctAnswer: 1,
      explanation:
        "Cosine annealing with warm restarts (SGDR, Loshchilov and Hutter, 2017) periodically resets the learning rate to a high value. Each high-LR phase explores a different basin of the loss landscape. Averaging the weights found at the end of each cycle (SWA) yields a solution in a flatter, more generalizable region than any single cycle's minimum.",
      hints: [
        "SGDR resets lr to lr_max at each cycle start - the model re-explores the loss landscape before settling.",
        "SWA (Izmailov et al., 2018) shows that the average of cyclically annealed weights outperforms any individual endpoint.",
      ],
    },
  ],

  "lr-schedule-advanced": [
    {
      id: "q-dl-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The linear warmup plus cosine decay learning rate schedule is standard for transformer pretraining. Why is a warmup phase at the start of training important?",
      options: [
        "Warmup prevents the model from learning too fast and overfitting to the first batches",
        "At the start of training, gradient estimates are noisy and Adam's second moment estimate is unreliable - warmup with a small LR prevents large destructive updates before the optimizer stabilizes",
        "Warmup is needed to allow the learning rate to exceed 1.0 safely in later stages",
        "Warmup prevents gradient clipping from activating during early training",
      ],
      correctAnswer: 1,
      explanation:
        "Early in training, Adam's second moment estimate v (used in the denominator) is near zero, making the effective step size very large and noisy. A small initial LR during warmup (typically 1,000-10,000 steps) lets v accumulate reliable statistics before the full LR is applied. Without warmup, early large updates can permanently damage the model.",
      hints: [
        "Adam's bias correction addresses the cold start problem mathematically, but warmup provides additional stability in practice.",
        "The original transformer paper (Vaswani et al., 2017) used 4,000 warmup steps with the Noam schedule.",
      ],
    },
    {
      id: "q-dl-kp34-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In cosine annealing, the learning rate follows a cosine curve from lr_max to lr_min, reaching its lowest value at the end of training or the end of each cycle.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Cosine annealing (Loshchilov and Hutter, 2017) sets lr(t) = lr_min + 0.5 times (lr_max minus lr_min) times (1 + cos(pi times t/T)). At t=0, lr equals lr_max; at t=T, lr equals lr_min. The smooth decay avoids abrupt LR drops and helps the optimizer settle into flat minima at the end of training.",
      hints: [
        "The cosine curve starts at lr_max and decreases smoothly to lr_min - no sudden drops like step decay.",
        "With warm restarts (SGDR), T resets to T_0 at cycle boundaries, causing lr to jump back to lr_max.",
      ],
    },
    {
      id: "q-dl-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Cyclical learning rates (CLR, Smith 2017) cycle the learning rate between lr_min and lr_max throughout training. What surprising finding did Smith report about using higher learning rates than typical?",
      options: [
        "Higher learning rates always cause divergence if they exceed the Lipschitz constant of the loss",
        "Cyclically using learning rates that would cause divergence if held constant can actually improve generalization because the transient high-LR phase helps escape sharp local minima",
        "CLR only works with SGD and fails with Adam",
        "The optimal lr_max is always the learning rate at which training loss starts to increase",
      ],
      correctAnswer: 1,
      explanation:
        "Smith's key finding was that learning rates which cause instability when held constant can be beneficial when cycled through, because the brief high-LR phase kicks the optimizer out of sharp, poorly-generalizing minima and into broader, flatter basins. This 'super-convergence' phenomenon was later explained through the flat minima generalization hypothesis.",
      hints: [
        "Sharp minima (narrow valleys in loss landscape) generalize poorly; flat minima generalize well. High LR phases escape sharp ones.",
        "The LR range test (increasing LR from very small to very large and watching loss) identifies the optimal lr_min and lr_max for CLR.",
      ],
    },
  ],

  "data-efficiency": [
    {
      id: "q-dl-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Few-shot fine-tuning adapts a pretrained model using only a small labeled dataset (e.g., 10-100 examples). Why does this work much better for pretrained models than for randomly initialized models?",
      options: [
        "Pretrained models have smaller weight matrices that require fewer gradient updates",
        "Pretraining provides rich feature representations that only require a small number of task-specific examples to steer, whereas random initialization requires many examples to build these features from scratch",
        "Few-shot fine-tuning uses a different optimizer that is more sample-efficient",
        "Pretrained models have seen the fine-tuning examples during pretraining and memorized them",
      ],
      correctAnswer: 1,
      explanation:
        "Pretraining on large corpora learns general-purpose representations covering syntax, semantics, and world knowledge. Fine-tuning steers these representations for a specific task, requiring only a few examples to specify the desired behavior. Random initialization has no prior knowledge - every feature must be learned from the small dataset, which is drastically insufficient.",
      hints: [
        "Think of it as transfer learning: the hard work (feature extraction) is done during pretraining; fine-tuning is just specialization.",
        "Howard and Ruder (2018) demonstrated in ULMFiT that fine-tuning a pretrained LM on 100 examples outperforms training from scratch on 10,000.",
      ],
    },
    {
      id: "q-dl-kp35-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Data augmentation techniques such as random cropping and color jitter increase the effective training set size by creating new training examples, thereby reducing overfitting.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Data augmentation applies random but label-preserving transformations (crop, flip, color jitter for images; back-translation, synonym substitution for text) to generate novel views of existing examples. This effectively multiplies the training set size, teaches the model invariance to these transformations, and reduces overfitting.",
      hints: [
        "A horizontally flipped image of a cat is still a cat - flipping is a label-preserving augmentation.",
        "SimCLR and other contrastive learning methods use aggressive augmentation as the core of their self-supervised training.",
      ],
    },
    {
      id: "q-dl-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "PAC learning theory provides a sample complexity bound for learning a concept class. For a finite hypothesis class H, the sample complexity to achieve error at most epsilon with probability at least 1 minus delta is approximately:",
      options: [
        "O(|H| / epsilon)",
        "O(log(|H| / delta) / epsilon)",
        "O(|H| squared times log(1 / epsilon))",
        "O(VC-dim(H) times log(1 / epsilon) / delta)",
      ],
      correctAnswer: 1,
      explanation:
        "The PAC sample complexity bound for a finite hypothesis class H is m >= (1/epsilon)(log|H| + log(1/delta)), which is O(log(|H|/delta)/epsilon). The log|H| term captures the complexity of the hypothesis class - larger classes need more data. For infinite classes, VC dimension replaces log|H|.",
      hints: [
        "The bound has two terms: 1/epsilon for the accuracy requirement and log(1/delta) for the confidence requirement.",
        "Key insight: sample complexity grows logarithmically with hypothesis class size - even exponentially large classes need few samples.",
      ],
    },
  ],

  "neural-ode": [
    {
      id: "q-dl-kp36-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Neural ODEs (Chen et al., 2018) model the hidden state dynamics as an ODE: dh/dt = f(h(t), t, theta). What makes this formulation memory-efficient compared to deep residual networks?",
      options: [
        "Neural ODEs use fewer parameters because the same network f is applied at each time step",
        "Neural ODEs use the adjoint method to compute gradients without storing intermediate activations, requiring O(1) memory in the number of function evaluations",
        "Neural ODEs skip the backward pass entirely and use finite differences for gradients",
        "Neural ODEs compress activations using quantization during the forward pass",
      ],
      correctAnswer: 1,
      explanation:
        "Standard backpropagation through an ODE solver requires storing all intermediate function evaluations - O(N) memory where N is the number of solver steps. The adjoint method solves a separate ODE backward in time to compute gradients, requiring only O(1) memory (just storing the final state). This is the key memory efficiency claim of Neural ODEs.",
      hints: [
        "The adjoint state a(t) = -dL/dh(t) satisfies an ODE that can be solved backward from T to 0.",
        "Memory efficiency: ResNet with N layers stores N activation tensors; Neural ODE with N steps stores only the final output.",
      ],
    },
    {
      id: "q-dl-kp36-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Neural ODEs can model continuous-time dynamics, making them suitable for irregularly sampled time series data where observations occur at non-uniform time intervals.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Because Neural ODEs model dynamics as a continuous-time ODE, they can evaluate the hidden state at any time t - including irregular observation times. Standard RNNs require uniformly spaced inputs or padding/masking for irregular timestamps. Neural ODEs handle irregularity naturally by integrating from one observation time to the next.",
      hints: [
        "Medical records often have irregular timestamps - Neural ODEs are a natural fit for this domain.",
        "Latent ODE (Rubanova et al., 2019) extends Neural ODEs for irregular time series with an encoder-decoder architecture.",
      ],
    },
    {
      id: "q-dl-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The adjoint method for Neural ODE training computes gradients by solving a second ODE backward in time. What quantities does the backward ODE propagate?",
      options: [
        "The original hidden state h(t) and the network weights theta",
        "The adjoint state a(t) = dL/dh(t), the gradient of loss with respect to theta, and the gradient with respect to the initial time",
        "The softmax probabilities and the cross-entropy loss",
        "The Hessian matrix of the loss with respect to all parameters",
      ],
      correctAnswer: 1,
      explanation:
        "The augmented backward ODE propagates three quantities simultaneously: a(t) = dL/dh(t) (adjoint state), dL/dtheta (accumulated parameter gradient), and dL/dt_0 (gradient with respect to initial time). These are solved jointly using an ODE solver run backward from T to 0.",
      hints: [
        "The adjoint method is analogous to backpropagation but for continuous dynamics - it backpropagates through time continuously.",
        "Chen et al. (2018) Appendix B derives the adjoint ODE in full - three coupled differential equations.",
      ],
    },
  ],

  "mixture-of-experts": [
    {
      id: "q-dl-kp37-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a Mixture-of-Experts (MoE) layer, top-k routing selects the k experts with the highest router logits for each token. What is the computational advantage of top-k=2 routing compared to using all N experts?",
      options: [
        "Top-2 routing uses 2/N of the total expert parameters per token, enabling models with total parameters N times larger without N times the compute",
        "Top-2 routing reduces the number of attention heads in the transformer",
        "Top-2 routing eliminates the need for the feed-forward network in the transformer block",
        "Top-2 routing uses half the training data compared to dense models",
      ],
      correctAnswer: 0,
      explanation:
        "With N experts and top-k routing, each token is processed by only k experts. The total model has N times the expert parameters, but each forward pass activates only k/N of them - keeping FLOPs constant while scaling model capacity. Mixtral 8x7B activates 2 of 8 experts per token, giving 46.7B total parameters but only 12.9B active parameters per forward pass.",
      hints: [
        "Mixtral 8x7B: 8 experts times 7B parameters each = 56B total, but top-2 means only 14B active per token.",
        "MoE decouples model capacity (total params) from inference cost (active params) - a key scaling advantage.",
      ],
    },
    {
      id: "q-dl-kp37-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Expert collapse in MoE training occurs when the router sends most or all tokens to a small subset of experts, leaving other experts undertrained and underutilized.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Expert collapse (also called load imbalance) is a training failure mode where popular experts receive more tokens, become better trained, and attract even more tokens - a positive feedback loop. Auxiliary load balancing losses (Shazeer et al., GShard) add a regularization term that penalizes uneven expert usage, enforcing roughly uniform expert utilization.",
      hints: [
        "Without load balancing, experts collapse into a small group - effectively wasting the MoE architecture.",
        "GShard and Switch Transformer both use auxiliary losses to enforce expert load balance.",
      ],
    },
    {
      id: "q-dl-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Switch Transformer (Fedus et al., 2022) uses top-1 routing (each token goes to exactly one expert). What key design insight justified this simplification over top-2 routing?",
      options: [
        "Top-1 routing doubles training speed by halving expert computation per token",
        "Top-1 routing reduces routing complexity and eliminates the need for combining multiple expert outputs, achieving better scaling efficiency even though it reduces per-token capacity compared to top-2",
        "Top-1 routing prevents expert collapse by ensuring uniform token distribution",
        "Top-1 routing enables sparse backpropagation that skips gradient computation for inactive experts",
      ],
      correctAnswer: 1,
      explanation:
        "Fedus et al. found that top-1 routing achieves better perplexity/compute tradeoffs than top-2 at large scale by simplifying the routing mechanism and enabling larger total expert counts. The reduced routing overhead and simpler expert output aggregation allows scaling to more experts with the same compute budget.",
      hints: [
        "Switch Transformer showed top-1 routing with 2048 experts achieves better scaling than dense models at equivalent FLOPs.",
        "Top-1 routing means no expert output weighted averaging - each token gets exactly one expert's output.",
      ],
    },
  ],

  "multi-task-learning-advanced": [
    {
      id: "q-dl-kp38-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Gradient surgery (Yu et al., 2020) addresses task interference in multi-task learning by modifying conflicting gradients. What does it do when two task gradients conflict?",
      options: [
        "It averages the two conflicting gradients to find a compromise update direction",
        "It projects each conflicting gradient onto the normal plane of the other, removing the component that increases the other task's loss",
        "It scales conflicting gradients down to zero to stop the interference",
        "It alternates between tasks, applying only one task's gradient per batch",
      ],
      correctAnswer: 1,
      explanation:
        "Gradient surgery detects conflict when two task gradients have negative cosine similarity (they point in opposing directions). For conflicting pairs, it projects each gradient to remove the component in the direction of the other task's gradient - finding an update that does not increase either task's loss. This mitigates catastrophic forgetting and negative transfer.",
      hints: [
        "Conflict is detected when the cosine similarity between two task gradients is negative.",
        "Gradient surgery is applied pairwise between all conflicting task gradient pairs before the optimizer step.",
      ],
    },
    {
      id: "q-dl-kp38-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Task interference in multi-task learning occurs when training on one task degrades performance on another task sharing the same model parameters.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "Negative transfer (task interference) happens when gradients from different tasks point in conflicting directions, causing updates that improve one task to hurt another. This is the central challenge of multi-task learning and motivates methods like gradient surgery, task weighting, and task-specific adapter layers.",
      hints: [
        "Positive transfer is when tasks help each other; negative transfer is when they hurt each other.",
        "Tasks with very different label spaces or objectives tend to interfere more than related tasks.",
      ],
    },
    {
      id: "q-dl-kp38-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Uncertainty-based task weighting (Kendall et al., 2018) sets task loss weights proportional to task-specific uncertainty. What is the intuition behind this approach?",
      options: [
        "Tasks with higher uncertainty get lower weights because they provide noisy gradients",
        "Tasks with higher homoscedastic uncertainty (output noise) should have their loss scaled down, as the model's predictions for noisy tasks should have wider confidence intervals",
        "Uncertainty weighting ensures all tasks have equal gradient magnitudes before summation",
        "Only the hardest task (highest loss) receives a nonzero weight at each step",
      ],
      correctAnswer: 1,
      explanation:
        "Kendall et al. treat each task's output noise as a learnable scalar sigma_i. The combined loss is a sum of (L_i / 2 sigma_i squared) + log sigma_i terms. Tasks with higher noise get lower effective weights (1/sigma_i squared) automatically, as large sigma_i means the task's labels are noisy and should not dominate. The log sigma_i term prevents sigma_i from growing to infinity.",
      hints: [
        "Homoscedastic uncertainty is task-level noise, not instance-level - it measures how noisy a task is overall.",
        "The learned sigma_i values naturally adapt the loss weights: noisy tasks get small effective weights, clean tasks get large weights.",
      ],
    },
  ],

  "continual-learning-advanced": [
    {
      id: "q-dl-kp39-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Catastrophic forgetting in neural networks refers to what phenomenon?",
      options: [
        "A model forgetting its training data when the learning rate is set too high",
        "When a neural network trained sequentially on new tasks rapidly loses performance on previously learned tasks because new gradient updates overwrite old weights",
        "When a model's validation loss suddenly spikes due to a corrupted batch",
        "When dropout randomly disables neurons, causing the model to forget recent patterns",
      ],
      correctAnswer: 1,
      explanation:
        "Catastrophic forgetting (McCloskey and Cohen, 1989; Ratcliff, 1990) occurs because SGD optimizes for the current task without constraint on preserving past task performance. Gradient updates for Task B overwrite the weight configurations that enabled Task A performance. This is the fundamental challenge of continual learning.",
      hints: [
        "Unlike human memory, which consolidates old memories while learning new ones, standard NNs have no such consolidation mechanism.",
        "Fine-tuning a pretrained model on a new task almost always causes some forgetting of the original task.",
      ],
    },
    {
      id: "q-dl-kp39-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Elastic Weight Consolidation (EWC) prevents catastrophic forgetting by penalizing changes to weights that were most important for previous tasks, using the Fisher information matrix to measure weight importance.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "EWC (Kirkpatrick et al., 2017) adds a regularization term proportional to the Fisher information times the squared difference from the previous task's optimal weights. High Fisher information means the weight is important - the quadratic penalty resists changing it. This is inspired by synaptic consolidation in neuroscience.",
      hints: [
        "Fisher information approximates the curvature of the loss - high curvature means small changes cause large performance drops.",
        "EWC is like Bayesian continual learning: the previous optimal weights serve as a prior when learning new tasks.",
      ],
    },
    {
      id: "q-dl-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Progressive Neural Networks (Rusu et al., 2016) prevent catastrophic forgetting through a fundamentally different approach than EWC. What is their key architectural mechanism?",
      options: [
        "Progressive networks use weight averaging across all previous task networks",
        "Progressive networks freeze all weights from previous tasks and add new columns of weights for each new task, with lateral connections from old columns to the new one",
        "Progressive networks store a replay buffer of previous task data and mix it into new task training batches",
        "Progressive networks use hypernetworks to generate task-specific weight deltas",
      ],
      correctAnswer: 1,
      explanation:
        "Progressive Neural Networks add a new network column per task, with all previous columns frozen. Lateral connections from frozen columns to the new column allow knowledge transfer without interference - the new task learns to leverage but not modify old task representations. The cost is that model size grows linearly with the number of tasks.",
      hints: [
        "Frozen previous columns means no forgetting. New column means no interference. Lateral connections enable knowledge transfer.",
        "The tradeoff: ProgNets scale poorly (one column per task) but perfectly preserve all previous tasks.",
      ],
    },
  ],

  "neural-architecture-design": [
    {
      id: "q-dl-kp40-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When designing a neural network, width refers to the number of neurons per layer and depth refers to the number of layers. For a fixed parameter budget, which generally produces better results on complex tasks and why?",
      options: [
        "Wider networks, because more neurons per layer capture more features in parallel",
        "Deeper networks, because composition of many nonlinear functions enables exponentially more functions than a shallow network with the same parameters",
        "Neither - width and depth are exactly equivalent for a fixed parameter count",
        "It depends only on the optimizer used, not the architecture",
      ],
      correctAnswer: 1,
      explanation:
        "Theoretical results (Pascanu et al., 2013; Telgarsky, 2016) show that deep networks can represent functions requiring exponentially wider shallow networks. Depth enables hierarchical feature composition - low layers detect edges, mid layers detect shapes, high layers detect objects - a capability that cannot be replicated by adding neurons to a single layer.",
      hints: [
        "A 2-layer network can approximate any function (universal approximation), but may need exponentially many neurons versus a deeper network.",
        "ResNets outperform wide shallow networks at the same parameter count on ImageNet - empirically confirming depth's advantage.",
      ],
    },
    {
      id: "q-dl-kp40-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The receptive field of a neuron in a convolutional neural network is the region of the input image that can influence that neuron's activation, and it grows with each successive convolutional layer.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        "With a 3x3 convolution, layer 1 neurons see a 3x3 region, layer 2 neurons see a 5x5 region (3x3 plus 1 pixel border on each side from the previous layer), and so on. After L layers with 3x3 kernels, the receptive field is (2L+1) by (2L+1). Deeper networks have larger receptive fields, enabling them to capture long-range spatial dependencies.",
      hints: [
        "Receptive field after L layers of 3x3 convolutions with stride 1: (2L+1) by (2L+1).",
        "Dilated convolutions increase receptive field without depth: dilation rate d expands the effective kernel size.",
      ],
    },
    {
      id: "q-dl-kp40-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Inductive biases in neural architecture design encode prior assumptions about the problem structure. What inductive bias does a convolutional layer encode that a fully connected layer does not?",
      options: [
        "Temporal ordering - CNNs assume inputs arrive in a fixed sequence",
        "Translation equivariance and locality - CNNs assume that useful features appear in local neighborhoods and that the same feature detector is valid anywhere in the input",
        "Permutation invariance - CNNs assume the order of channels does not matter",
        "Scale invariance - CNNs assume features at different zoom levels are equally important",
      ],
      correctAnswer: 1,
      explanation:
        "Convolutional layers encode two key inductive biases: (1) locality - each filter connects to a local patch, assuming relevant features are local; (2) translation equivariance - the same weights are applied at every position (weight sharing), assuming that a feature detector useful at one location works everywhere. These biases reduce parameters and embed domain knowledge about natural images.",
      hints: [
        "Translation equivariance: if the input shifts, the feature map shifts by the same amount - enabled by weight sharing across positions.",
        "Locality: a 3x3 filter only sees a 3x3 patch - this embeds the prior that nearby pixels are more related than distant ones.",
      ],
    },
  ],
};

Object.assign(questions, questionsExtra);


registerQuestions(questions);
