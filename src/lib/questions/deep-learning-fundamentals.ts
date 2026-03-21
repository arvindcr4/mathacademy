import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  perceptron: [
    {
      id: "q-dl-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A single perceptron computes $y = \text{step}(w \cdot x + b)$. Which function class can it perfectly represent?",
      options: [
        "Any Boolean function with enough weights",
        "Only linearly separable functions — those where a single hyperplane separates the two classes",
        "Any continuous function on a compact domain",
        "Any function that can be represented as a polynomial",
      ],
      correctAnswer: 1,
      explanation:
        "A perceptron's decision boundary is the hyperplane $w \cdot x + b = 0$. It can only classify inputs that are linearly separable.\n\n**Step 1.** Understand the perceptron's geometry. The perceptron computes a weighted sum $z = w \cdot x + b$ and applies a step function: output 1 if $z > 0$, else 0. The set of points where $z = 0$ forms a hyperplane that divides the input space into two half-spaces.\n\n**Step 2.** Recall the definition of linear separability. A dataset is linearly separable if there exists a hyperplane that correctly classifies every point — all class-1 points on one side, all class-0 points on the other.\n\n**Step 3.** Identify the counterexample. The XOR function is the canonical non-linearly-separable function:\n\n\\[\n\\begin{array}{c|c|c}\nx_1 & x_2 & \\text{XOR} \\\\\\hline\n0 & 0 & 0 \\\\\n0 & 1 & 1 \\\\\n1 & 0 & 1 \\\\\n1 & 1 & 0\n\\end{array}\n\\]\n\nPlotting these four points, no single straight line (or hyperplane) can separate the 1s from the 0s. This famous limitation, highlighted by Minsky and Papert (1969), motivated the development of multi-layer networks.\n\nTherefore, the perceptron can represent only linearly separable functions.",
      hints: [
        "Try to draw a single straight line that separates the XOR outputs: $(0,0)\to 0$, $(0,1)\to 1$, $(1,0)\to 1$, $(1,1)\to 0$. Can any line put the two 1s on one side and the two 0s on the other?",
        "Every linear model — perceptron included — produces a decision boundary that is a hyperplane: one flat surface dividing the space into two half-spaces.",
      ],
    },
    {
      id: "q-dl-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A single perceptron can learn to classify data that is not linearly separable, such as the XOR function.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "A single perceptron can only represent linear decision boundaries. XOR is not linearly separable — no single hyperplane correctly separates the four XOR input points.\n\n**Step 1.** Recall the perceptron's geometric constraint. A perceptron computes $z = w \cdot x + b$ and applies a step function. The decision boundary is the set of points where $z = 0$, which is a hyperplane.\n\n**Step 2.** Check the XOR truth table. The four input points are $(0,0)\to 0$, $(0,1)\to 1$, $(1,0)\to 1$, $(1,1)\to 0$. If we try to separate the 1s from the 0s with a line, any line that places $(0,1)$ and $(1,0)$ on one side will inevitably place either $(0,0)$ or $(1,1)$ on the wrong side.\n\n**Step 3.** Conclude. Since no such separating hyperplane exists, the perceptron cannot learn XOR regardless of how many training iterations or how much data it receives. This fundamental limitation, publicized by Minsky and Papert (1969), motivated the development of multi-layer networks.\n\nTherefore, the statement is **False**.",
      hints: [
        "XOR: $(0,0)\to 0$, $(0,1)\to 1$, $(1,0)\to 1$, $(1,1)\to 0$. Plot these four points colored by their output — can you draw one straight line that separates the two colors?",
        "This limitation caused the first \"AI winter\" and motivated the development of multi-layer perceptrons, where hidden layers can learn non-linear decision boundaries.",
      ],
    },
    {
      id: "q-dl-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The perceptron convergence theorem guarantees convergence only when training data is linearly separable. If the data is **not** linearly separable, what happens during training?",
      options: [
        "The algorithm converges to the best linear approximation",
        "The algorithm cycles indefinitely, never converging to a stable set of weights",
        "The algorithm converges after exactly $n \cdot d$ iterations ($n$ samples, $d$ features)",
        "The algorithm converges but with higher training error than logistic regression",
      ],
      correctAnswer: 1,
      explanation:
        "The perceptron update rule — $w \leftarrow w + y \cdot x$ on each misclassified sample — is guaranteed to converge only when the data is linearly separable.\n\n**Step 1.** Understand the proof's premise. The convergence proof works by showing that each update moves the weight vector $w$ closer to a separating hyperplane $w^*$ by a finite amount. This argument requires that such a $w^*$ exists.\n\n**Step 2.** Recognize what breaks when data is not separable. If no separating hyperplane exists, the proof's inequality — that the inner product $w \cdot w^*$ always increases — no longer holds. There is no weight vector that classifies all samples correctly.\n\n**Step 3.** Describe the practical behavior. Without a stable fixed point, the algorithm loops: weights keep updating, sometimes revisiting previous configurations. The algorithm never reaches equilibrium. There is no convergence guarantee.\n\nThis is why gradient-descent-based methods with smooth losses (e.g., logistic regression) are preferred when data may not be linearly separable.",
      hints: [
        "The convergence theorem's proof relies crucially on the existence of a separating hyperplane. If no such hyperplane exists, the proof breaks down and no guarantee follows.",
        "In practice, on non-separable data, the perceptron will continue cycling through weight configurations indefinitely without stabilizing.",
      ],
    },
  ],

  backpropagation: [
    {
      id: "q-dl-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a neural network with $L$ layers, backpropagation computes the gradient of the loss with respect to layer-$\ell$ weights as a product of $L - \ell$ Jacobians. What fundamental calculus property makes this possible?",
      options: [
        "Fourier Transform",
        "The chain rule of calculus: $\\frac{d}{dx}\\,[f(g(x))] = f'(g(x)) \cdot g'(x)$",
        "Bayes' theorem",
        "Gaussian elimination",
      ],
      correctAnswer: 1,
      explanation:
        "Backpropagation applies the chain rule of calculus recursively through the computational graph, as described in d2l.ai §5.3.\n\n**Step 1.** Identify the chain of dependencies. The loss $L$ depends on the output $h^{(L)}$, which depends on $h^{(L-1)}$, and so on down to the weights $W^{(\ell)}$ at layer $\ell$. Each dependency is a differentiable function.\n\n**Step 2.** Apply the chain rule. By the chain rule, the gradient of $L$ with respect to $W^{(\ell)}$ is:\n\n\\[\n\\frac{\\partial L}{\\partial W^{(\ell)}} = \\frac{\\partial L}{\\partial h^{(L)}} \cdot \\frac{\\partial h^{(L)}}{\\partial h^{(L-1)}} \cdot \\cdots \cdot \\frac{\\partial h^{(\ell+1)}}{\\partial h^{(\ell)}} \cdot \\frac{\\partial h^{(\ell)}}{\\partial W^{(\ell)}}.\n\\]\n\nEach factor $\\frac{\\partial h^{(k+1)}}{\\partial h^{(k)}}$ is a Jacobian matrix; their sequential multiplication is exactly the chain rule applied recursively through the network.\n\n**Step 3.** Recognize the algorithmic implication. Computing this product from the output backward — multiplying local gradients at each node — is precisely what backpropagation does. No factor is omitted; every derivative through the graph is accounted for.",
      hints: [
        "To find how a small change in a weight at layer 1 affects the final loss in a 10-layer network, you must chain together the derivatives through all 9 intermediate layers.",
        "The gradient factorizes as $\\partial L / \\partial W^{(1)} = (\\partial L / \\partial h^{(10)}) \\cdot (\\partial h^{(10)} / \\partial h^{(9)}) \\cdot \\cdots \\cdot (\\partial h^{(1)} / \\partial W^{(1)})$. Each factor is a Jacobian; their product is the chain rule.",
      ],
    },
    {
      id: "q-dl-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A computational graph records every operation during the forward pass; the autograd engine traverses it backward, applying the chain rule at each node to compute all gradients without manual derivation.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "This is exactly how modern deep learning frameworks work, as described in d2l.ai §5.3.\n\n**Step 1.** Forward pass — build the graph. During forward propagation, every operation (matrix multiplication, ReLU, softmax, etc.) is recorded in a computational graph. Each node represents the result of an operation; edges represent data flow.\n\n**Step 2.** Backward pass — traverse in reverse. During backpropagation, the autograd engine traverses this graph in reverse order. At each node, it knows the gradient flowing back from the loss and computes the local gradient with respect to the node's inputs using the chain rule.\n\n**Step 3.** Chain and accumulate. The local gradient is multiplied by the incoming gradient and passed to the previous node. This repeats all the way to the input. By the end of the backward pass, every parameter has its gradient computed automatically — you never write $\\partial L / \\partial w$ by hand.\n\nTherefore, the statement is **True**.",
      hints: [
        "PyTorch's `.backward()` call triggers this traversal — you never manually compute and write $\\partial L / \\partial w$ for any standard operation.",
        "Each node in the graph knows only its own local derivative; the autograd engine chains them together by multiplying gradients at each step.",
      ],
    },
    {
      id: "q-dl-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a deep network using sigmoid activations, gradients are multiplied through each layer during backpropagation. If sigmoid's derivative satisfies $\\sigma'(x) \\leq \\tfrac{1}{4}$ for all $x$, and the network has 10 sigmoid layers, then the gradient magnitude at the earliest layer is at most:",
      options: [
        "$10 \\times \\tfrac{1}{4} = 2.5$",
        "$\\bigl(\\tfrac{1}{4}\\bigr)^{10} \\approx 9.5 \\times 10^{-7}$, shrinking exponentially with depth",
        "$\\tfrac{1}{4} / 10 = 0.025$",
        "$10 \\times \\tfrac{1}{4} = 2.5$, a linear reduction",
      ],
      correctAnswer: 1,
      explanation:
        "During backpropagation, the gradient signal is multiplied through each layer's Jacobian.\n\n**Step 1.** Write the gradient bound. For a layer $\\ell$:\n\n\\[\n\\left\\| \\frac{\\partial L}{\\partial h^{(\\ell)}} \\right\\| \\leq \\left\\| \\frac{\\partial h^{(\\ell+1)}}{\\partial h^{(\\ell)}} \\right\\| \\cdot \\left\\| \\frac{\\partial L}{\\partial h^{(\\ell+1)}} \\right\\|.\n\\]\n\nEach Jacobian norm is bounded by the sigmoid derivative maximum of $\\tfrac{1}{4}$.\n\n**Step 2.** Compute the cumulative bound. After 10 layers:\n\n\\[\n\\left\\| \\frac{\\partial L}{\\partial h^{(1)}} \\right\\| \\leq \\left(\\frac{1}{4}\\right)^{10} \\approx 9.5 \\times 10^{-7}.\n\\]\n\n**Step 3.** Interpret the result. Early layers receive a gradient roughly $10^{-6}$ times smaller than the final layer — effectively zero. They cannot learn. This is the **vanishing gradient problem**.\n\nReLU avoids this: its derivative is exactly 1 for positive inputs and 0 otherwise, causing no multiplicative shrinkage through the network.",
      hints: [
        "Each layer applies a multiplicative factor of at most $\\tfrac{1}{4}$ to the gradient. After 10 layers: $\\bigl(\\tfrac{1}{4}\\bigr)^{10} \\approx 10^{-6}$ — the gradient is essentially zero at the earliest layers.",
        "ReLU's gradient is either 0 or 1 for active neurons — no multiplicative shrinkage, so gradients flow unchanged through the network.",
      ],
    },
  ],

  "activation-functions": [
    {
      id: "q-dl-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "As shown in d2l.ai §5.1, ReLU is defined as $\\text{ReLU}(x) = \\max(x, 0)$. What is the derivative of ReLU at $x = 3.5$? At $x = -2.1$?",
      options: [
        "$\\left.\\frac{d}{dx}\\text{ReLU}(x)\\right|_{x=3.5} = 0.5$; $\\left.\\frac{d}{dx}\\text{ReLU}(x)\\right|_{x=-2.1} = -0.5$",
        "$\\left.\\frac{d}{dx}\\text{ReLU}(x)\\right|_{x=3.5} = 1$; $\\left.\\frac{d}{dx}\\text{ReLU}(x)\\right|_{x=-2.1} = 0$",
        "$\\left.\\frac{d}{dx}\\text{ReLU}(x)\\right|_{x=3.5} = 3.5$; $\\left.\\frac{d}{dx}\\text{ReLU}(x)\\right|_{x=-2.1} = 0$",
        "$\\left.\\frac{d}{dx}\\text{ReLU}(x)\\right|_{x=3.5} = 1$; $\\left.\\frac{d}{dx}\\text{ReLU}(x)\\right|_{x=-2.1} = -1$",
      ],
      correctAnswer: 1,
      explanation:
        "ReLU is piecewise linear:\n\n\\[\n\\frac{d}{dx}\\,\\text{ReLU}(x) =\n\\begin{cases}\n1 & \\text{if } x > 0, \\\\\n0 & \\text{if } x < 0.\n\\end{cases}\n\\]\n\n**Step 1.** Evaluate at $x = 3.5$. Since $3.5 > 0$, ReLU acts as the identity function $\\text{ReLU}(x) = x$, so the derivative is $\\frac{d}{dx}x = 1$.\n\n**Step 2.** Evaluate at $x = -2.1$. Since $-2.1 < 0$, ReLU outputs 0 (a constant), so the derivative is $\\frac{d}{dx}0 = 0$.\n\n**Step 3.** Note the undefined point and the broader implication. At $x = 0$ the derivative is undefined; in practice it is set to 0. This binary gradient (0 or 1) is precisely why ReLU prevents vanishing gradients — unlike sigmoid, whose peak gradient is only $\\tfrac{1}{4}$, ReLU's gradient is either 1 (full signal passed) or 0 (no signal passed). This simplicity is why ReLU became the default hidden-layer activation (d2l.ai §5.1.2.1).",
      hints: [
        "ReLU is piecewise linear with slope 1 when $x > 0$ (passing the input through unchanged) and slope 0 when $x < 0$ (zeroing it out entirely).",
        "Contrast with sigmoid: even at $x = 0$ (its peak), sigmoid's gradient is only $0.25$ — four times smaller than ReLU's maximum gradient of $1$.",
      ],
    },
    {
      id: "q-dl-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GELU (Gaussian Error Linear Unit), defined as $x \cdot \Phi(x)$ where $\\Phi$ is the standard Gaussian CDF, has become the standard activation in transformer architectures like BERT and GPT because it smoothly approximates ReLU while allowing small negative outputs.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "GELU (Hendrycks and Gimpel, 2016) smoothly gates inputs using the Gaussian CDF — unlike ReLU's hard threshold at zero.\n\n**Step 1.** Understand GELU's mechanism. $\\Phi(x)$ ranges from 0 to 1, so GELU multiplies the input $x$ by a learned gate $\\Phi(x)$. For large positive $x$, $\\Phi(x) \\approx 1$ and GELU approximates ReLU. For negative $x$, $\\Phi(x)$ is small but positive, so GELU produces a small negative output — smoothly attenuating rather than hard-zeroing.\n\n**Step 2.** Contrast with ReLU. ReLU sets all negative inputs to exactly 0, discarding all gradient information for negative signals. GELU preserves a small negative output and gradient for negative inputs, which can be useful in certain contexts.\n\n**Step 3.** Recognize the empirical result. GELU has become the default activation in BERT, GPT-2/3/4, and LLaMA feed-forward layers, empirically outperforming ReLU and other alternatives on language modeling benchmarks.\n\nTherefore, the statement is **True**.",
      hints: [
        "BERT and GPT both use GELU in their feed-forward layers, not ReLU — this is a defining characteristic of transformer architectures.",
        "Unlike ReLU which outputs exactly 0 for all $x < 0$, GELU attenuates negative values smoothly, preserving some gradient information in the negative region.",
      ],
    },
    {
      id: "q-dl-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Sigmoid's derivative is given by $\\sigma'(x) = \\sigma(x)\\,(1 - \\sigma(x))$. At $x = 5$, $\\sigma(5) \\approx 0.993$. What is the gradient $\\sigma'(5)$, and why does this cause the vanishing gradient problem in deep networks?",
      options: [
        "$\\sigma'(5) \\approx 0.007$; after 10 saturated sigmoid layers the gradient is $\\approx 7 \\times 10^{-21}$ — effectively zero at early layers, causing vanishing gradients",
        "$\\sigma'(5) \\approx 0.5$; this is the maximum possible sigmoid gradient and causes exploding gradients",
        "$\\sigma'(5) \\approx 0.993$; this large gradient causes exploding gradients in deep networks",
        "$\\sigma'(5) = 1$; sigmoid has unit gradient for all positive values",
      ],
      correctAnswer: 0,
      explanation:
        "At $x = 5$, the sigmoid output is saturated near 1: $\\sigma(5) \\approx 0.993$.\n\n**Step 1.** Compute the local gradient. Using $\\sigma'(x) = \\sigma(x)(1 - \\sigma(x))$:\n\n\\[\n\\sigma'(5) = \\sigma(5)\\,(1 - \\sigma(5)) \\approx 0.993 \\times 0.007 \\approx 0.007.\n\\]\n\nThis is already very small — the neuron is in saturation.\n\n**Step 2.** Observe the multiplicative effect through layers. During backpropagation, gradients are multiplied through each layer. After 10 saturated sigmoid layers:\n\n\\[\n\\bigl\\| \\frac{\\partial L}{\\partial h^{(1)}} \\bigr\\| \\leq (0.007)^{10} \\approx 2.8 \\times 10^{-21}.\n\\]\n\n**Step 3.** Interpret. The gradient vanishes exponentially with depth. As d2l.ai §5.4.1.1 explains, sigmoid's derivative peaks at only $0.25$ (at $x = 0$) and is already small for $|x| > 2$. In deep networks, early layers receive effectively zero gradient — they cannot learn.",
      hints: [
        "$\\sigma'(x) = \\sigma(x)(1 - \\sigma(x))$ peaks at $0.25$ only at $x = 0$. For $|x| > 2$, $\\sigma'(x) < 0.1$. At $x = 5$, $\\sigma'(5) \\approx 0.007$ — the neuron is deeply saturated.",
        "Even at the theoretical peak ($0.25$ per layer), after 10 layers the gradient is $0.25^{10} \\approx 10^{-6}$. With saturated sigmoid ($0.007$ per layer), it drops to $\\sim 10^{-21}$ — effectively zero.",
      ],
    },
  ],

  "weight-initialization": [
    {
      id: "q-dl-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "As explained in d2l.ai §5.4.1.3, if all weights in a layer are initialized to the same constant $c$, what happens during training?",
      options: [
        "All neurons learn to detect different features because the inputs to each neuron differ",
        "All neurons compute identical activations and receive identical gradients — they remain permanently identical throughout training, wasting the network's capacity",
        "The network converges faster because the symmetric initialization simplifies the loss landscape",
        "The network converges to zero weights due to weight decay dominance",
      ],
      correctAnswer: 1,
      explanation:
        "This is the **symmetry breaking** problem, explained in d2l.ai §5.4.1.3.\n\n**Step 1.** Analyze identical initialization. If all weights in a layer are set to the same constant $c$, then all neurons in that layer receive identical inputs and produce identical outputs. For any input $x$, neuron 1 computes $z_1 = w \cdot x + b$ and neuron 2 computes $z_2 = w \cdot x + b$ — the same value.\n\n**Step 2.** Trace the gradient consequence. During backpropagation, neurons with identical outputs also have identical gradients (since the gradient depends on the output error). Therefore, all weights in the layer update by the same amount.\n\n**Step 3.** Conclude the result. After every update, all neurons remain identical — they always compute the same function. The hidden layer effectively has only one neuron regardless of its declared width. The network cannot exploit its full capacity.\n\nRandom initialization is essential to break this symmetry so that each neuron learns to detect different features.",
      hints: [
        "If all neurons start identical and receive identical gradients, they will always remain identical — the hidden layer has effectively one neuron regardless of its width.",
        "d2l.ai notes: without breaking symmetry, the network might never realize its expressive power, since all hidden units compute the same function.",
      ],
    },
    {
      id: "q-dl-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Xavier initialization (Glorot and Bengio, 2010) sets weight variance to $\\sigma^2 = 2/(n_{\\text{in}} + n_{\\text{out}})$. This formula is derived by requiring that the variance of layer outputs and gradients stays constant through forward and backward passes simultaneously.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "This is exactly the Xavier initialization derivation from d2l.ai §5.4.2.2.\n\n**Step 1.** Derive the forward-pass condition. If input $x$ has variance $\\text{Var}[x]$ and weights have variance $\\sigma^2$, then the output variance is:\n\n\\[\n\\text{Var}[\\text{output}] = n_{\\text{in}} \\cdot \\sigma^2 \\cdot \\text{Var}[x].\n\\]\n\nSetting $\\text{Var}[\\text{output}] = \\text{Var}[x]$ (no signal explosion or vanishing in the forward pass) requires:\n\n\\[\nn_{\\text{in}} \\cdot \\sigma^2 = 1. \\tag{1}\n\\]\n\n**Step 2.** Derive the backward-pass condition. Similarly, for gradients flowing backward:\n\n\\[\nn_{\\text{out}} \\cdot \\sigma^2 = 1. \\tag{2}\n\\]\n\n**Step 3.** Recognize the incompatibility and the compromise. Equations (1) and (2) cannot both hold unless $n_{\\text{in}} = n_{\\text{out}}$. Xavier takes the geometric mean compromise:\n\n\\[\n\\sigma^2 = \\frac{2}{n_{\\text{in}} + n_{\\text{out}}},\n\\]\n\nkeeping signal variance stable in both directions and preventing vanishing or exploding activations.\n\nTherefore, the statement is **True**.",
      hints: [
        "The forward-pass derivation: $\\text{Var}[\\text{output}] = n_{\\text{in}} \\cdot \\sigma^2 \\cdot \\text{Var}[\\text{input}]$. Setting this to $\\text{Var}[\\text{input}]$ requires $n_{\\text{in}} \\cdot \\sigma^2 = 1$.",
        "Xavier is the compromise: $\\sigma = \\sqrt{2/(n_{\\text{in}} + n_{\\text{out}})}$, balancing both the forward and backward variance conditions simultaneously.",
      ],
    },
    {
      id: "q-dl-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "He initialization scales weights by $\\sqrt{2/n_{\\text{in}}}$ rather than Xavier's $\\sqrt{2/(n_{\\text{in}} + n_{\\text{out}})}$. Why does ReLU require this different factor of 2?",
      options: [
        "ReLU has a gradient of 2 for positive inputs, requiring the larger scaling",
        "ReLU zeros out approximately half its inputs (the negative half), effectively halving the variance. The factor of 2 compensates for this, maintaining variance through the forward pass",
        "The factor of 2 accounts for both the forward and backward pass simultaneously",
        "He initialization uses $n_{\\text{in}}$ only because ReLU has no output-side constraint",
      ],
      correctAnswer: 1,
      explanation:
        "He initialization (He et al., 2015) is designed specifically for ReLU (and its variants).\n\n**Step 1.** Understand Xavier's assumption. Xavier initialization assumes that the activation function preserves variance symmetrically — i.e., that the variance of inputs equals the variance of outputs. This holds for functions like tanh but **not** for ReLU.\n\n**Step 2.** Analyze ReLU's effect on variance. ReLU sets all negative values to zero. If inputs are roughly symmetric around zero (as is typical with proper initialization), about half of all values are killed. This roughly **halves** the output variance.\n\n**Step 3.** Derive the compensation. To maintain unit variance after ReLU, we need:\n\n\\[\n\\text{Var}[\\text{output}] = \\tfrac{1}{2} \\cdot n_{\\text{in}} \\cdot \\sigma^2 \\cdot \\text{Var}[x] \\stackrel{!}{=} \\text{Var}[x].\n\\]\n\nThis requires $n_{\\text{in}} \\cdot \\sigma^2 / 2 = 1$, giving $\\sigma^2 = 2/n_{\\text{in}}$. The factor of 2 exactly compensates for the 50% activation death: $2 \\times \\tfrac{1}{2} = 1$, restoring unit variance.",
      hints: [
        "Xavier assumes activation functions preserve variance symmetrically. ReLU does not — it zeros half the values, effectively halving the variance at each layer.",
        "The factor 2 exactly compensates for the 50% activation death in ReLU: $2 \\times \\tfrac{1}{2} = 1$, maintaining unit variance through the forward pass.",
      ],
    },
  ],

  "batch-normalization": [
    {
      id: "q-dl-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Batch Normalization normalizes activations by computing the mini-batch mean $\\mu$ and variance $\\sigma^2$, then applying:\n\n\\[\n\\hat{x} = \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\varepsilon}}.\n\\]\n\nWhat do the learnable parameters $\\gamma$ and $\\beta$ do?",
      options: [
        "$\\gamma$ scales the learning rate; $\\beta$ controls the dropout rate",
        "$\\gamma$ (scale) and $\\beta$ (shift) allow the network to undo the normalization if needed, preserving representational power",
        "$\\gamma$ and $\\beta$ normalize the weights rather than the activations",
        "$\\gamma$ sets the batch size; $\\beta$ sets the momentum for running statistics",
      ],
      correctAnswer: 1,
      explanation:
        "After normalizing to zero mean and unit variance, the full Batch Norm transformation is:\n\n\\[\ny = \\gamma \\cdot \\hat{x} + \\beta.\n\\]\n\n**Step 1.** Understand what normalization alone constrains. Without $\\gamma$ and $\\beta$, the normalized output $\\hat{x}$ is constrained to have mean 0 and variance 1. This restricts the possible outputs of the layer.\n\n**Step 2.** Recognize the harm of this constraint. For sigmoid activation near zero, the function is approximately linear. If normalization forces inputs to have mean 0 and variance 1, the sigmoid layer will operate in its nearly-linear regime, losing its non-linearity and hence its representational power.\n\n**Step 3.** Appreciate the restoration of flexibility. The parameters $\\gamma$ and $\\beta$ allow the layer to output any mean and scale. If the identity transformation is optimal, the network can learn $\\gamma = \\sigma$ and $\\beta = \\mu$ to completely undo the normalization. This ensures Batch Norm never reduces the representational capacity of the network.",
      hints: [
        "If $\\gamma = 1$ and $\\beta = 0$, BN passes through the normalized activation unchanged. If $\\gamma = \\sigma$ and $\\beta = \\mu$, it completely undoes the normalization — restoring the original distribution.",
        "The learnable parameters ensure BN can represent the identity transformation — the network can learn to bypass normalization entirely if doing so is beneficial.",
      ],
    },
    {
      id: "q-dl-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Layer Normalization normalizes across the feature dimension for a single sample (not across the batch), making it suitable for transformers where batch statistics would be unreliable for variable-length sequences.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Layer Norm (Ba et al., 2016) computes statistics across the hidden dimension for each individual token independently.\n\n**Step 1.** Contrast with Batch Norm. Batch Norm computes statistics over the batch dimension — it requires multiple samples to compute a meaningful mean and variance. For a batch of size 1, Batch Norm normalizes using statistics from a single data point, which are trivially 0 (mean) and 0 (variance).\n\n**Step 2.** Understand Layer Norm's approach. Layer Norm computes the mean and variance across the $d_{\\text{model}}$ feature dimension for each token independently. Each token uses only its own features — no batch dependence.\n\n**Step 3.** Connect to transformers. In transformer inference, we often decode one token at a time (batch size 1). Layer Norm works perfectly in this setting since it never relies on batch statistics. Additionally, for variable-length sequences in training, Batch Norm's batch statistics would mix statistics from different sequence positions — LN avoids this entirely.\n\nTherefore, the statement is **True**.",
      hints: [
        "In transformers with variable-length sequences, batch-level statistics mix statistics from different positions and sequence lengths — Layer Norm avoids this entirely by normalizing per-sample.",
        "Layer Norm normalizes across the $d_{\\text{model}}$ dimension (features) for each token independently, never across the batch dimension.",
      ],
    },
    {
      id: "q-dl-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "During training, Batch Normalization uses mini-batch statistics. During inference, it uses running estimates. Why does this create a train-test discrepancy that must be handled carefully?",
      options: [
        "The batch statistics are noisier than the population statistics, so inference is always more accurate",
        "A single test sample has no \"batch\" to compute statistics over; using batch statistics would make inference results depend on what other samples happen to be in the batch — non-deterministic and inconsistent",
        "Running estimates are more accurate than mini-batch statistics for normally distributed data",
        "The discrepancy only matters when batch size is smaller than the model's hidden dimension",
      ],
      correctAnswer: 1,
      explanation:
        "The core issue is that inference often operates on one sample at a time.\n\n**Step 1.** Recognize the single-sample problem. Compute the mean and variance of a single number: the result is undefined for variance (a single point has no spread). If we used batch statistics at test time, inference on a single input would yield mean = that input and variance = 0 — degenerate normalization that would corrupt the model's behavior.\n\n**Step 2.** Understand the running estimates solution. During training, BN accumulates exponential moving averages of batch means and variances (running_mean, running_var). At test time, these stored population-level estimates are used instead of batch statistics.\n\n**Step 3.** Identify the practical hazard. If the running estimates were not properly accumulated during training (e.g., if the model is fine-tuned on new data without updating these statistics), the train-test discrepancy causes a sharp drop in accuracy. Always call model.eval() during inference to switch BN to using running estimates, and ensure running estimates are updated during any fine-tuning.",
      hints: [
        "Compute the mean and variance of a single number — it's undefined/degenerate. BN needs population-level statistics at test time, not batch statistics from a single sample.",
        "PyTorch's model.eval() switches BN from using mini-batch statistics to the running estimates that were accumulated during training.",
      ],
    },
  ],

  "dropout-regularization": [
    {
      id: "q-dl-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "As defined in d2l.ai §5.6, the dropout formula during training is: $h' = \\frac{h}{1-p}$ with probability $1-p$, and $h' = 0$ with probability $p$. Why is the surviving activation divided by $(1-p)$?",
      options: [
        "To increase the activation magnitude and compensate for the smaller network size",
        "To ensure $\\mathbb{E}[h'] = h$ — keeping the expected value of each activation unchanged so that test-time behavior (all neurons active) matches training expectations",
        "To reduce the learning rate proportionally to the dropout rate",
        "To normalize the activations to unit variance after dropping neurons",
      ],
      correctAnswer: 1,
      explanation:
        "This technique is called **inverted dropout**.\n\n**Step 1.** Compute the expected value of the dropped activation. A neuron survives with probability $(1-p)$ and is scaled by $1/(1-p)$. Therefore:\n\n\\[\n\\mathbb{E}[h'] = (1-p) \\cdot \\frac{h}{1-p} + p \\cdot 0 = h.\n\\]\n\n**Step 2.** Contrast with test-time behavior. At test time, all neurons are active and no scaling is applied — the output is simply $h$.\n\n**Step 3.** Understand why this matters. Without the $1/(1-p)$ scaling, the expected training activation would be $(1-p) \\cdot h$ — systematically lower than the test-time activation. This train-test mismatch in expected activation magnitude would degrade performance. Inverted dropout ensures both phases have the same expected output distribution.",
      hints: [
        "$\\mathbb{E}[h'] = (1-p) \\cdot h/(1-p) + p \\cdot 0 = h$. The expected value is preserved between training (with dropout) and test time (without dropout).",
        "Without scaling: $\\mathbb{E}[h'] = (1-p) \\cdot h$. At test time: $\\mathbb{E}[h'] = h$. This train-test mismatch in expected activation magnitude is precisely what inverted dropout avoids.",
      ],
    },
    {
      id: "q-dl-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Dropout is applied during inference (test time) the same way it is applied during training.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "As d2l.ai §5.6 states: 'we disable dropout at test time. Given a trained model and a new example, we do not drop out any nodes.' All neurons are active at test time.\n\n**Step 1.** Understand the training phase. During training, dropout randomly zeros out neurons with probability $p$, and the surviving activations are scaled by $1/(1-p)$ (inverted dropout).\n\n**Step 2.** Understand the test phase. At test time, all neurons are active and no scaling is applied. The inverted dropout scaling during training already ensures that the expected activation magnitude matches what the model will see at test time.\n\n**Step 3.** Recognize the danger of test-time dropout. Applying dropout at test time would make predictions non-deterministic — running the same input through the model twice would give different outputs. This is unacceptable for production deployment.\n\nTherefore, the statement is **False**.",
      hints: [
        "Stochastic behavior at test time would make predictions non-deterministic — different runs of the same input through the model would give different outputs.",
        "Some researchers do apply dropout at test time to estimate prediction uncertainty (MC Dropout), but this is a specific technique for uncertainty quantification, not the default behavior.",
      ],
    },
    {
      id: "q-dl-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Srivastava et al. (2014) justified dropout by analogy with sexual reproduction breaking up co-adapted genes. The co-adaptation problem that dropout solves is:",
      options: [
        "Neurons in the same layer developing correlated weights that reduce model diversity",
        "Each layer developing overly specialized neurons that rely on specific activation patterns from co-occurring neurons — making the network brittle when any neuron is unavailable",
        "Different layers learning at different rates due to vanishing gradients",
        "Neurons adapting to the specific samples in the training set rather than the underlying distribution",
      ],
      correctAnswer: 1,
      explanation:
        "The analogy with sexual reproduction is that just as sexual reproduction breaks up fixed gene combinations by mixing alleles from two parents, dropout breaks up fixed neuron combinations by randomly removing neurons during training.\n\n**Step 1.** Define co-adaptation. A neuron is co-adapted when it learns to rely on specific other neurons being active — for example, neuron A learns to fire only when neuron B fires. This is fragile: if B is absent, A's output becomes unreliable.\n\n**Step 2.** Describe how dropout breaks this. When a neuron is dropped, its neighbors must still produce reasonable outputs. No neuron can depend on any specific other neuron being present. Each neuron must learn features that are independently useful.\n\n**Step 3.** Recognize the benefit. By forcing every neuron to be independently useful, dropout prevents fragile co-adaptations and produces a more robust network. At test time, with all neurons present, the learned independent features combine to form a more ensemble-like prediction.",
      hints: [
        "Co-adaptation: neuron A learns 'fire when neuron B fires' instead of learning an independent, generally useful feature.",
        "Dropout forces each neuron to be independently useful — it cannot rely on its neighbors to compensate for its errors or fill in missing information.",
      ],
    },
  ],

  optimizers: [
    {
      id: "q-dl-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Adam maintains two moment estimates per parameter: $m_t$ (first moment, mean of gradients) and $v_t$ (second moment, uncentered variance of gradients). What is the effective learning rate for a parameter whose gradient is consistently $g = 0.01$?",
      options: [
        "Exactly the base learning rate $\\alpha$, since the gradient is constant",
        "$\\alpha \\cdot \\hat{m}_t / \\sqrt{\\hat{v}_t} \\approx \\alpha$ (the ratio normalizes the learning rate to a consistent magnitude regardless of gradient scale)",
        "$\\alpha \\times 0.01$, scaled down by gradient magnitude",
        "$\\alpha / 0.01$, scaled up when gradient is small",
      ],
      correctAnswer: 1,
      explanation:
        "Adam's update rule is:\n\n\\[\n\\theta_{t+1} = \\theta_t - \\alpha \\cdot \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\varepsilon},\n\\]\n\nwhere $\\hat{m}_t$ and $\\hat{v}_t$ are bias-corrected first and second moment estimates.\n\n**Step 1.** Analyze the constant-gradient case. For a constant gradient $g$: after bias correction, $\\hat{m}_t \\approx g$ and $\\hat{v}_t \\approx g^2$.\n\n**Step 2.** Compute the effective step size:\n\n\\[\n\\alpha \\cdot \\frac{g}{\\sqrt{g^2}} = \\alpha \\cdot \\frac{g}{|g|} = \\alpha \\cdot \\operatorname{sgn}(g).\n\\]\n\nThe gradient magnitude $g$ cancels in the ratio $\\hat{m}_t / \\sqrt{\\hat{v}_t}$.\n\n**Step 3.** Interpret. Adam's effective step is approximately $\\pm \\alpha$ in the direction of the gradient sign — a consistent step size regardless of whether the gradient is large (e.g., $g = 1.0$) or small (e.g., $g = 0.01$). This is the key benefit of adaptive moment estimation.",
      hints: [
        "Adam's update: $\\theta \\leftarrow \\theta - \\alpha \\cdot \\hat{m}_t / \\sqrt{\\hat{v}_t + \\epsilon}$. With a constant gradient $g$: $\\hat{m}_t \\approx g$, $\\hat{v}_t \\approx g^2$.",
        "The step is $\\alpha \\cdot g/\\sqrt{g^2} = \\alpha \\cdot g/|g| = \\alpha \\cdot \\operatorname{sgn}(g)$. The gradient magnitude $g$ cancels in the ratio $\\hat{m}_t/\\sqrt{\\hat{v}_t}$.",
      ],
    },
    {
      id: "q-dl-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AdamW fixes a flaw in Adam by applying weight decay directly to the weights ($\\theta \\leftarrow \\theta - \\eta \\cdot \\lambda \\cdot \\theta$) rather than folding L2 regularization into the gradient, because Adam's adaptive scaling reduces the effective weight decay disproportionately for parameters with large gradients.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "This is the key distinction between Adam with L2 regularization and AdamW (Loshchilov and Hutter, 2017).\n\n**Step 1.** Analyze Adam with L2. In vanilla Adam, the L2 regularization term $\\lambda \\cdot \\theta$ is added to the gradient and then adaptively scaled by $1/\\sqrt{v_t}$. For parameters with large gradients, $v_t$ is large, so the effective weight decay is $\\lambda / \\sqrt{v_t}$ — much smaller than intended.\n\n**Step 2.** Understand AdamW's fix. AdamW decouples weight decay from gradient scaling:\n\n\\[\n\\theta \\leftarrow \\theta - \\alpha \\cdot \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t}} - \\eta \\cdot \\lambda \\cdot \\theta.\n\\]\n\nThe decay step $-\\eta \\cdot \\lambda \\cdot \\theta$ is applied directly to the weights, completely independent of Adam's adaptive gradient scaling.\n\n**Step 3.** Recognize the benefit. With AdamW, every parameter receives the same fraction of weight decay $\\lambda$, regardless of its gradient history. This makes weight decay behave as theoretically intended — a simple $L_2$ penalty on the weights.\n\nTherefore, the statement is **True**.",
      hints: [
        "Adam with L2 loss: the regularization gradient $\\lambda \\theta$ is divided by $\\sqrt{v_t}$ — effective decay is $\\lambda/\\sqrt{v_t}$, which varies by parameter and can become negligible for well-optimized parameters.",
        "AdamW: the decay step $-\\eta \\cdot \\lambda \\cdot \\theta$ is applied directly to weights, unaffected by Adam's variance scaling, so every parameter receives the intended weight decay.",
      ],
    },
    {
      id: "q-dl-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "d2l.ai §12.6 shows that SGD with momentum updates: $v_t = \\beta \\cdot v_{t-1} + g_t$, then $\\theta \\leftarrow \\theta - \\alpha \\cdot v_t$. For $\\beta = 0.9$, approximately how many effective past gradient steps does momentum integrate?",
      options: [
        "0.9 steps (just less than one)",
        "$\\approx 10$ steps (from the geometric series sum $1/(1 - \\beta) = 1/(1 - 0.9) = 10$)",
        "90 steps ($100 \\times 0.9$)",
        "1 step — momentum just smooths the current gradient",
      ],
      correctAnswer: 1,
      explanation:
        "The momentum velocity $v_t = \\beta \\cdot v_{t-1} + g_t$ unrolls into an infinite sum of past gradients:\n\n\\[\nv_t = g_t + \\beta \\cdot g_{t-1} + \\beta^2 \\cdot g_{t-2} + \\cdots + \\beta^{t-1} \\cdot g_1.\n\\]\n\n**Step 1.** Recognize the geometric series. Each past gradient $g_{t-k}$ contributes $\\beta^k$ to the current velocity, with weight decaying exponentially at rate $\\beta^k$.\n\n**Step 2.** Sum the decay weights. The effective lookback window is the sum of all decay weights:\n\n\\[\n\\sum_{k=0}^{\\infty} \\beta^k = \\frac{1}{1 - \\beta}.\n\\]\n\nFor $\\beta = 0.9$: effective window $\\approx 1/(1 - 0.9) = 10$ steps.\n\n**Step 3.** Interpret the practical meaning. A gradient from 10 steps ago carries weight $\\beta^{10} \\approx 0.35$ — still a meaningful contribution. A gradient from 20 steps ago carries $\\beta^{20} \\approx 0.12$ — modest but non-negligible. Momentum effectively smooths over roughly 10 previous steps.",
      hints: [
        "Geometric series: $1 + \\beta + \\beta^2 + \\cdots = 1/(1-\\beta)$. For $\\beta = 0.9$: $1/(1 - 0.9) = 10$. So momentum integrates approximately 10 past gradients.",
        "A gradient from 10 steps ago is weighted by $\\beta^{10} \\approx 0.35$ — still meaningful. A gradient from 20 steps ago: $\\beta^{20} \\approx 0.12$.",
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
        "To gradually increase GPU memory usage to avoid OOM errors",
        "To start with a small learning rate and ramp up, preventing large gradient updates from destabilizing randomly initialized weights",
        "To allow the dataset shuffling to complete before meaningful training begins",
        "To warm up the optimizer's momentum terms before applying weight decay",
      ],
      correctAnswer: 1,
      explanation:
        "At the start of training, weights are randomly initialized — far from any good solution — and gradient estimates are noisy.\n\n**Step 1.** Identify the hazard. A large learning rate applied to random weights can produce destructively large parameter updates, potentially causing the training loss to diverge or the model to become numerically unstable.\n\n**Step 2.** Understand warmup's role. A warmup period begins with a small learning rate and gradually increases it. This allows the model to make small, safe steps while the gradient estimates stabilize and the network learns reasonable early features.\n\n**Step 3.** Note the transformer context. Warmup is especially critical for transformers, where the 'Attention is All You Need' paper (Vaswani et al., 2017) uses a schedule of linear warmup followed by inverse-square-root decay. Without warmup, early large updates in transformers have been observed to cause training divergence.\n\nThe correct answer is the one about preventing large gradient updates from destabilizing randomly initialized weights.",
      hints: [
        "Imagine accelerating a car from 0 to 100 mph — doing it gradually is much safer than flooring the accelerator immediately.",
        "Warmup is especially critical for transformers, where early large updates can cause training divergence in the attention mechanism.",
      ],
    },
    {
      id: "q-dl-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Cosine annealing schedules reduce the learning rate following a cosine curve, and with warm restarts they periodically reset to a higher value, allowing the optimizer to escape local minima.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Cosine annealing with warm restarts (SGDR, Loshchilov and Hutter, 2017) decays the learning rate to near zero following a cosine schedule, then resets to a higher value.\n\n**Step 1.** Understand the basic cosine schedule. The cosine function smoothly decreases from 1 to 0 over a cycle of $T$ steps:\n\n\\[\n\\eta_t = \\eta_{\\min} + \\tfrac{1}{2}(\\eta_{\\max} - \\eta_{\\min})\\bigl(1 + \\cos(\\pi t / T)\\bigr).\n\\]\n\nThis produces a smooth, gradual LR decay — no abrupt drops as with step decay.\n\n**Step 2.** Understand warm restarts. After the LR reaches near-zero at the end of a cycle, it resets to a higher value. This allows the optimizer to escape shallow local minima it may have converged into during the previous cycle.\n\n**Step 3.** Recognize the practical benefit. Each restart explores the loss landscape from a different region (since the model weights have evolved), potentially finding better optima than a single long run with monotone decay.\n\nTherefore, the statement is **True**.",
      hints: [
        "The cosine curve smoothly decreases the learning rate — no abrupt drops as with step decay schedules.",
        "Warm restarts periodically 'restart' exploration with a higher learning rate, which can help the optimizer escape shallow local minima.",
      ],
    },
    {
      id: "q-dl-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The 'Attention is All You Need' transformer schedule sets learning rate as:\n\n\\[\n\\text{lr} = d_{\\text{model}}^{-0.5} \\cdot \\min\\bigl(\\text{step}^{-0.5},\\ \\text{step} \\cdot \\text{warmup\\_steps}^{-1.5}\\bigr).\n\\]\n\nAt $\\text{step} = \\text{warmup\\_steps}$, what is the learning rate, and how does it behave afterward?",
      options: [
        "$\\text{lr} = d_{\\text{model}}^{-0.5} \\times \\text{warmup\\_steps}^{-0.5}$; then grows as $\\text{step}^{0.5}$ for the remaining training",
        "$\\text{lr} = d_{\\text{model}}^{-0.5} \\times \\text{warmup\\_steps}^{-0.5}$; then decays as $\\text{step}^{-0.5}$ for the remaining training",
        "The learning rate reaches its maximum and stays constant until training ends",
        "$\\text{lr} = 1/d_{\\text{model}}$; then halves every $\\text{warmup\\_steps}$ steps",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1.** Analyze the two terms inside the $\\min$. During warmup: $\\text{step} \\cdot \\text{warmup\\_steps}^{-1.5}$ grows as $\\text{step}$ (linear increase), while $\\text{step}^{-0.5}$ decreases. The $\\min$ picks the smaller — the growing linear term dominates, producing linear increase.\n\n**Step 2.** Find the peak at $\\text{step} = \\text{warmup\\_steps}$. At this point:\n\n\\[\n\\text{step}^{-0.5} = \\text{warmup\\_steps}^{-0.5}, \\quad \\text{and} \\quad \\text{step} \\cdot \\text{warmup\\_steps}^{-1.5} = \\text{warmup\\_steps}^{-0.5}.\n\\]\n\nBoth terms are equal, so $\\text{lr} = d_{\\text{model}}^{-0.5} \\times \\text{warmup\\_steps}^{-0.5}$ — the peak.\n\n**Step 3.** Analyze post-warmup behavior. For $\\text{step} > \\text{warmup\\_steps}$, the $\\text{step}^{-0.5}$ term is smaller than the linear term, so:\n\n\\[\n\\text{lr} = d_{\\text{model}}^{-0.5} \\times \\text{step}^{-0.5}.\n\\]\n\nThis is inverse square-root decay: halving the LR requires $4\\times$ more steps. The $d_{\\text{model}}^{-0.5}$ factor scales the overall learning rate down for larger models.",
      hints: [
        "The formula has two phases: linear increase ($\\text{step} \\cdot \\text{warmup\\_steps}^{-1.5}$) during warmup and inverse-sqrt decrease ($\\text{step}^{-0.5}$) afterward. They meet at the peak.",
        "After warmup, $\\text{lr} \\propto 1/\\sqrt{\\text{step}}$ — cutting the learning rate in half requires $4\\times$ more training steps.",
      ],
    },
  ],

  "loss-functions": [
    {
      id: "q-dl-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Cross-entropy loss for classification is $L = -\\log\\bigl(p_{\\text{correct}}\\bigr)$. If the model predicts $p_{\\text{correct}} = 0.01$, what is the loss? If it predicts $p_{\\text{correct}} = 0.99$?",
      options: [
        "$L = 0.01$ when $p = 0.01$; $L = 0.99$ when $p = 0.99$",
        "$L = -\\log(0.01) \\approx 4.6$ when $p = 0.01$; $L = -\\log(0.99) \\approx 0.01$ when $p = 0.99$",
        "$L = 1/0.01 = 100$ when $p = 0.01$; $L = 1/0.99 \\approx 1$ when $p = 0.99$",
        "$L = 0$ when $p = 0.01$ (correct class); $L = 1$ when $p = 0.99$ (wrong class)",
      ],
      correctAnswer: 1,
      explanation:
        "Cross-entropy $L = -\\log\\bigl(p_{\\text{correct}}\\bigr)$ has two key properties: it goes to infinity as $p_{\\text{correct}} \\to 0$ and to 0 as $p_{\\text{correct}} \\to 1$.\n\n**Step 1.** Compute the confident-wrong case. When $p = 0.01$:\n\n\\[\nL = -\\log(0.01) = -\\log(10^{-2}) = 2 \\cdot \\log(10) \\approx 4.6,\n\\]\n\na large loss producing a strong gradient to correct the error.\n\n**Step 2.** Compute the confident-correct case. When $p = 0.99$:\n\n\\[\nL = -\\log(0.99) \\approx -(-0.01005) \\approx 0.01,\n\\]\n\na near-zero loss.\n\n**Step 3.** Contrast with MSE. MSE with sigmoid suffers from vanishing gradients near 0 and 1 — when the model is confidently correct, the gradient is tiny and learning stalls. Cross-entropy avoids this saturation problem by directly maximizing the log-likelihood of the correct class.",
      hints: [
        "$\\log(0.01) = \\log(10^{-2}) = -2 \\cdot \\log(10) \\approx -4.6$. So $-\\log(0.01) \\approx 4.6$ — a large penalty for confidently wrong predictions.",
        "Cross-entropy directly maximizes the log-likelihood of the correct class, avoiding the gradient saturation problem that afflicts MSE when used with sigmoid activations.",
      ],
    },
    {
      id: "q-dl-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Focal loss addresses class imbalance by down-weighting the loss contribution of easy, well-classified examples and focusing training on hard examples.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Focal loss (Lin et al., 2017) modifies cross-entropy to address class imbalance in dense prediction tasks like object detection.\n\n**Step 1.** Write the focal loss formula. For a binary classification with $p_t$ as the model's probability for the true class:\n\n\\[\n\\text{FL}(p_t) = -(1 - p_t)^\\gamma \\log(p_t).\n\\]\n\nThe modulating factor $(1 - p_t)^\\gamma$ is what creates the focus on hard examples.\n\n**Step 2.** Analyze the modulating effect. When the model is confidently correct ($p_t \\to 1$), the factor $(1 - p_t)^\\gamma \\to 0$, massively down-weighting the loss. When the model is wrong ($p_t \\to 0$), the factor is 1 and the loss is unchanged — hard examples dominate the gradient.\n\n**Step 3.** Quantify the effect with $\\gamma = 2$. An easy example with $p_t = 0.9$ contributes $(1 - 0.9)^2 = 0.01 \\times$ the original loss — a 100-fold reduction. This lets rare hard examples (e.g., small or occluded objects) dominate training.\n\nTherefore, the statement is **True**.",
      hints: [
        "When $p_t \\to 1$ (easy, well-classified), $(1 - p_t)^\\gamma \\to 0$ — the loss is suppressed. When $p_t \\to 0$ (hard), $(1 - p_t)^\\gamma \\to 1$ — the loss is unchanged.",
        "With $\\gamma = 2$: an easy example with $p_t = 0.9$ contributes only $0.01 \\times$ the original loss — a 100-fold reduction that lets hard examples dominate.",
      ],
    },
    {
      id: "q-dl-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Label smoothing regularizes a model by replacing the hard one-hot target $(1, 0, 0, 0)$ with a soft target $(0.9, 0.033, 0.033, 0.033)$ for a 4-class problem with smoothing $\\varepsilon = 0.1$. Why does this help?",
      options: [
        "It prevents the model from becoming overconfident on the training set, reducing overfitting to noisy labels",
        "It forces the model to produce non-extreme probabilities, preventing softmax saturation and improving gradient flow during backpropagation",
        "It makes the training loss decrease faster by softening the hard target",
        "It ensures the model never predicts a class with probability below $\\varepsilon/(n-1)$, guaranteeing minimum confidence",
      ],
      correctAnswer: 1,
      explanation:
        "Label smoothing (Szegedy et al., 2016) replaces the hard target $y$ with:\n\n\\[\ny'_i =\n\\begin{cases}\n1 - \\varepsilon & \\text{if } i = \\text{correct class}, \\\\\n\\varepsilon / (n-1) & \\text{otherwise},\n\\end{cases}\n\\]\n\n**Step 1.** Understand the problem with hard targets. With hard targets, a well-trained model outputs $(1, 0, 0, 0)$ — the softmax produces an extreme probability distribution. Near $p = 1$, the softmax gradient $\\partial L / \\partial p_i$ becomes vanishingly small, slowing down learning.\n\n**Step 2.** Analyze label smoothing's effect. With soft targets $(0.9, 0.033, 0.033, 0.033)$, the model's output must stay closer to these values to minimize cross-entropy. The probabilities remain in a range where gradients are healthy.\n\n**Step 3.** Recognize the regularization benefit. Label smoothing prevents the model from assigning full probability to a single class, which reduces overfitting to incorrect label noise and improves calibration — the model's confidence better matches its actual accuracy.\n\nAdditionally, label smoothing encourages the softmax to be less peaked, which improves gradient flow during backpropagation, especially in deep networks.",
      hints: [
        "With hard targets, the model is rewarded for pushing its output toward $(1, 0, 0, 0)$ — extremely confident predictions. Near $p=1$, the softmax gradient vanishes, starving early layers of gradient signal.",
        "With soft targets like $(0.9, 0.033, 0.033, 0.033)$, the model must stay closer to these moderate probabilities, keeping the softmax in a region with healthier gradients.",
      ],
    },
  ],
};

registerQuestions(questions);
