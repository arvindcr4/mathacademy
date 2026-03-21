import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "meta-learning-problem": [
    {
      id: "q-meta-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'The core goal of meta-learning ("learning to learn") is best described as:',
      options: [
        "Training a single model on as many tasks as possible to achieve high average accuracy",
        "Learning an inductive bias or initialisation that enables fast adaptation to new tasks with very few examples",
        "Combining the predictions of many base models via ensembling",
        "Learning a curriculum that gradually increases task difficulty during training",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-learning aims to extract shared structure across tasks so that a learner can adapt quickly to a new task using only a handful of examples — solving the few-shot learning challenge.",
      hints: [
        'Think about what "learning to learn" implies: the meta-learner is learning how to learn new tasks.',
        'The key word is "fast adaptation" — the meta-learner should need very little new data per task.',
      ],
    },
    {
      id: "q-meta-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In meta-learning, the meta-train and meta-test sets contain the same individual classes or tasks.",
      correctAnswer: "False",
      explanation:
        "Meta-learning requires a strict separation: classes/tasks seen at meta-train time must be disjoint from those seen at meta-test time, so generalisation to truly novel tasks can be measured.",
      hints: [
        "If test tasks overlap with training tasks, you are measuring memorisation, not generalisation.",
        'Think about how meta-test tasks should be "new" in the same way a test set is new in standard supervised learning.',
      ],
    },
    {
      id: "q-meta-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'In the episodic training framework for meta-learning, each "episode" consists of:',
      options: [
        "A full pass over the entire training dataset",
        "A support set (few labelled examples per class) and a query set (unlabelled examples to classify), sampled to mimic a few-shot test scenario",
        "A batch of randomly sampled image-label pairs from all classes",
        "A pair of tasks drawn from different domains for cross-domain transfer",
      ],
      correctAnswer: 1,
      explanation:
        "Episodic training structures each mini-batch as a mini few-shot problem: the support set provides the few-shot context, and the query set evaluates generalisation — directly mimicking the meta-test condition.",
      hints: [
        "Episodic training is designed to match training conditions to test conditions — what does a meta-test episode look like?",
        'Think about "support" as the few labelled examples and "query" as what the model must classify.',
      ],
    },
  ],

  "few-shot-classification": [
    {
      id: "q-meta-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In few-shot classification, a "5-way 1-shot" task means:',
      options: [
        "5 training examples per class, 1 class total",
        "5 classes, each with exactly 1 labelled support example",
        "5 query examples and 1 support example total",
        "5 meta-training episodes, each with 1 class",
      ],
      correctAnswer: 1,
      explanation:
        "N-way K-shot means N classes in the episode, each with K labelled support examples. 5-way 1-shot is one of the most challenging settings, requiring classification across 5 novel classes with a single example each.",
      hints: [
        'The "way" is the number of classes; the "shot" is the number of labelled examples per class.',
        "Think about how hard it is to distinguish 5 classes when you have seen only 1 example of each.",
      ],
    },
    {
      id: "q-meta-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "On the 5-way 1-shot miniImageNet benchmark, MAML (Finn et al., 2017) reported approximately what accuracy?",
      options: [
        "Approximately 43%",
        "Approximately 48%",
        "Approximately 63%",
        "Approximately 78%",
      ],
      correctAnswer: 1,
      explanation:
        "MAML achieves approximately 48.70% ± 1.84% on 5-way 1-shot miniImageNet with a 4-layer convolutional backbone, establishing it as a strong optimization-based baseline. The 5-shot variant reaches ~63.1%.",
      hints: [
        "MAML is an optimization-based method — it is strong but not the highest-performing method on this benchmark.",
        "miniImageNet is 100 classes, 600 images each; the 5-way 1-shot task is the hardest standard setting.",
      ],
    },
    {
      id: "q-meta-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Omniglot is often called the "transpose" of MNIST. What does this mean in the few-shot learning context?',
      options: [
        "Omniglot images are transposed (rotated 90°) versions of MNIST images",
        "Omniglot has many classes (1623) with few examples each (20), whereas MNIST has few classes (10) with many examples each — making Omniglot naturally suited for few-shot learning",
        "Omniglot uses the same alphabet as MNIST but in a different language",
        "Omniglot pixels are inverted relative to MNIST",
      ],
      correctAnswer: 1,
      explanation:
        'Omniglot contains 1623 handwritten character classes from 50 alphabets, each with only 20 examples — a "transposed" regime of many classes/few examples per class, ideal for evaluating few-shot generalisation.',
      hints: [
        'Think about MNIST: 10 classes, ~6000 examples each. What would the "transpose" of those ratios look like?',
        "Few-shot learning needs many classes to sample novel episodes from, with few examples per class.",
      ],
    },
  ],

  "metric-based-meta": [
    {
      id: "q-meta-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Metric-based meta-learning methods classify new examples by:",
      options: [
        "Fine-tuning the entire model on the support set for each new task",
        "Computing similarity or distance between the query embedding and support set embeddings in a learned embedding space",
        "Generating new training examples using a generative model",
        "Using a gradient-based update to adapt the model\'s last layer",
      ],
      correctAnswer: 1,
      explanation:
        "Metric-based approaches learn an embedding function such that support and query examples from the same class are close in embedding space, enabling non-parametric nearest-neighbour classification at test time. The key insight (from Matching Networks, Prototypical Networks, Relation Networks) is that the embedding is trained episodically so distances are meaningful for novel classes.",
      hints: [
        'The "metric" in metric-based refers to a distance or similarity measure in embedding space.',
        "Think about k-NN classification — metric-based meta-learning learns the embedding that makes k-NN work well.",
      ],
    },
    {
      id: "q-meta-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Matching Networks (Vinyals et al., 2016), the attention kernel a(x̂, x_i) used for classification is computed as:",
      options: [
        "L2 distance between embeddings, converted to probability via sigmoid",
        "Cosine similarity between embeddings of the test sample and support samples, normalized by softmax: softmax(cosine(f(x̂), g(x_i)))",
        "Dot product between embeddings divided by the square root of embedding dimension",
        "Euclidean distance squared, converted to probability by a learned MLP",
      ],
      correctAnswer: 1,
      explanation:
        'Matching Networks use cosine similarity normalized by softmax as the attention kernel: a(x̂, x_i) = exp(cosine(f(x̂), g(x_i))) / \\Sigma_j exp(cosine(f(x̂), g(x_j))). The embedding functions f and g can be different: g embeds support examples (optionally with a bidirectional LSTM over the full support set, called "Full Context Embeddings"), while f embeds the query.',
      hints: [
        "Matching Networks match test examples to labelled support examples via attention weighted by similarity.",
        "The paper also proposed Full Context Embeddings (FCE) where the support set context modifies each embedding.",
      ],
    },
    {
      id: "q-meta-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Siamese Networks (Koch et al., 2015) for one-shot image recognition use what loss function and what architectural constraint?",
      options: [
        "Cross-entropy loss; two networks with independent (non-shared) weights",
        "Contrastive loss; two identical twin networks that share all weights and output a binary same/different score via L1 distance + sigmoid",
        "MSE loss; one network applied twice with different dropout masks",
        "Triplet loss; two networks encoding anchor and positive examples with a third encoding the negative",
      ],
      correctAnswer: 1,
      explanation:
        "Siamese Networks use twin CNN branches with shared weights that map images to feature vectors. The L1 distance between embeddings is passed through a linear + sigmoid layer to predict the probability the two images are in the same class. Training uses binary cross-entropy: same-class pairs → 1, different-class pairs → 0. At test time, the test image is compared to all support examples and the class of the most similar support image is predicted.",
      hints: [
        "A Siamese Network has two identical weight-sharing branches — what does it compare?",
        'Think about the training signal: pairs of examples with a label indicating "same" or "different".',
      ],
    },
  ],

  "prototypical-networks": [
    {
      id: "q-meta-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Prototypical Networks (Snell et al., 2017), how is the prototype c_k for class k computed from the support set S_k?",
      options: [
        "By training a separate classifier for each class in the support set",
        "As the mean of the embedding vectors of all support examples belonging to that class: c_k = (1/|S_k|) \\Sigma_{(x,y)∈S_k} f_\\phi(x)",
        "By selecting the support example closest to the class centroid in pixel space",
        "By fine-tuning the embedding network on each class\'s support examples",
      ],
      correctAnswer: 1,
      explanation:
        "A class prototype is the mean of the embedding vectors of all support examples for that class: c_k = (1/|S_k|) \\Sigma f_\\phi(x_i). Classification is done by finding the nearest prototype to the query embedding using squared Euclidean distance, with the squared Euclidean distance specifically chosen for its connection to mixture-of-Gaussians models.",
      hints: [
        "Think about the simplest way to summarise a set of points in a vector space — the mean (centroid).",
        "Once you have a prototype per class, classification is a nearest-centroid problem.",
      ],
    },
    {
      id: "q-meta-kp4-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Prototypical Networks use softmax over negative squared Euclidean distances to the prototypes to produce class probabilities for a query.",
      correctAnswer: "True",
      explanation:
        "The probability of a query x belonging to class k is p(y=k|x) = exp(−d(f_\\phi(x), c_k)) / \\Sigma_{k'} exp(−d(f_\\phi(x), c_{k'})), where d is squared Euclidean distance. Snell et al. showed that squared Euclidean (not cosine) distance is crucial — it corresponds to a Bregman divergence under a Gaussian assumption.",
      hints: [
        "Smaller distance → higher score → higher probability — the negative sign converts distance to similarity.",
        "Softmax turns these scores into a proper probability distribution over classes.",
      ],
    },
    {
      id: "q-meta-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Snell et al. (2017) showed that Prototypical Networks in the zero-shot setting are equivalent to which simpler method?",
      options: [
        "Matching Networks with a full-context embedding function",
        "Relation Networks with a fixed L2 distance as the relation module",
        "Linear classifiers on class attribute vectors — the prototype becomes the mean attribute vector, and nearest-centroid is equivalent to a linear classifier in the attribute space",
        "Siamese Networks trained with contrastive loss on attribute pairs",
      ],
      correctAnswer: 2,
      explanation:
        "In the zero-shot extension, prototypes are constructed from semantic embeddings (attributes/word vectors) rather than visual examples. Snell et al. showed this is equivalent to a linear classifier in the semantic space: the nearest-prototype decision boundary is a linear hyperplane between class attribute means.",
      hints: [
        "In zero-shot learning there are no labelled images for new classes — class attributes serve as prototypes.",
        "A nearest-centroid classifier with Euclidean distance is equivalent to a linear classifier when the prototypes are the class means.",
      ],
    },
  ],

  "relation-networks": [
    {
      id: "q-meta-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "How do Relation Networks differ from Prototypical Networks in their classification mechanism?",
      options: [
        "Relation Networks use Euclidean distance; Prototypical Networks use cosine similarity",
        "Relation Networks learn a separate relation module (neural network) to compute similarity between query and support embeddings, rather than using a fixed distance metric",
        "Relation Networks use attention over support embeddings; Prototypical Networks use a fixed prototype",
        "Relation Networks require more support examples per class",
      ],
      correctAnswer: 1,
      explanation:
        'In Relation Networks, the similarity between a query and a support example is computed by a learned "relation module" (an MLP applied to the concatenation of their embeddings), rather than a fixed metric like Euclidean distance.',
      hints: [
        "Prototypical Networks have a fixed distance metric; Relation Networks ask: what if the metric itself is learned?",
        "Think about concatenating two embeddings and passing them through a neural network to get a similarity score.",
      ],
    },
    {
      id: "q-meta-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In Relation Networks, both the embedding module and the relation module are trained end-to-end using mean squared error between the relation score and the binary same/different label.",
      correctAnswer: "True",
      explanation:
        "Relation Networks are fully differentiable and trained end-to-end: the embedding module maps inputs to feature vectors, the relation module predicts a similarity score, and MSE loss (treating same-class = 1, different-class = 0) trains both jointly.",
      hints: [
        "End-to-end training means gradients flow through both the relation module and the embedding module.",
        "MSE here treats the relation score as a regression target, not a classification probability.",
      ],
    },
    {
      id: "q-meta-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is a potential limitation of Relation Networks compared to Prototypical Networks in high-way (many-class) few-shot settings?",
      options: [
        "Relation Networks cannot handle more than 2 classes",
        "Relation Networks require O(N×Q) relation computations (N classes × Q queries), scaling poorly with number of classes, while Prototypical Networks only compute N prototypes",
        "Relation Networks cannot use convolutional embedding networks",
        "Relation Networks are not differentiable and cannot be trained with backpropagation",
      ],
      correctAnswer: 1,
      explanation:
        "Relation Networks compute a separate relation score for every (query, support) pair, resulting in O(N×K×Q) forward passes through the relation module, which becomes computationally expensive as N (number of classes) grows.",
      hints: [
        "Think about how many relation computations are needed for a 100-way 5-shot problem with 15 query examples per class.",
        "Prototypical Networks compute N prototypes and then N distances per query — much cheaper.",
      ],
    },
  ],

  maml: [
    {
      id: "q-meta-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In MAML's inner loop, the task-adapted parameters $\\theta'_i$ are computed via one gradient step as: $$\\theta'_i = \\theta - \\alpha \\nabla_\\theta \\mathcal{L}_{T_i}(f_\\theta).$$ What does $\\alpha$ represent?",
      options: [
        "The meta-learning rate for the outer loop update",
        "The inner-loop task-specific learning rate (a fixed hyperparameter, distinct from the outer-loop meta-learning rate $\\beta$)",
        "The number of gradient steps in the inner loop",
        "The temperature parameter for the softmax classifier",
      ],
      correctAnswer: 1,
      explanation:
        "MAML uses a two-level optimization structure with two distinct learning rates: $\\alpha$ (inner loop, task-level) and $\\beta$ (outer loop, meta-level, optimized with Adam/SGD). The inner-loop update $\\theta'_i = \\theta - \\alpha\\nabla_\\theta\\mathcal{L}_{T_i}(\\theta)$ adapts parameters to task $T_i$ using the support-set loss $\\mathcal{L}_{T_i}$. The outer loop then evaluates how well the adapted parameters $\\theta'_i$ generalize to the query set and updates $\\theta$ accordingly.",
      hints: [
        "MAML has a two-level optimization structure: the inner loop adapts to each task, the outer loop improves the initialization based on post-adaptation query-set performance.",
        "$\\alpha$ is the step size for task adaptation (typically 0.01–0.1); $\\beta$ is the step size for meta-optimization (typically 0.001–0.01).",
        "The notation $\\nabla_\\theta$ denotes the gradient with respect to the meta-parameters $\\theta$.",
      ],
    },
    {
      id: "q-meta-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "MAML's meta-gradient computation requires differentiating through the inner loop gradient steps, resulting in second-order gradients (gradients of gradients).",
      correctAnswer: "True",
      explanation:
        "The meta-objective $\\mathcal{L}_\\text{meta}(\\theta) = \\sum_i \\mathcal{L}_{T_i}(f_{\\theta'_i})$ depends on adapted parameters $\\theta'_i = \\theta - \\alpha\\nabla_\\theta\\mathcal{L}_{T_i}(\\theta)$. Differentiating the outer loss with respect to $\\theta$ requires the chain rule:\n$$\\frac{\\partial \\mathcal{L}_{T_i}(f_{\\theta'_i})}{\\partial \\theta} = \\frac{\\partial \\mathcal{L}_{T_i}}{\\partial \\theta'_i} \\cdot \\frac{\\partial \\theta'_i}{\\partial \\theta} = \\nabla_{\\theta'_i}\\mathcal{L}_{T_i} \\cdot (I - \\alpha\\nabla^2_\\theta\\mathcal{L}_{T_i}(\\theta)).$$\nThe term $(I - \\alpha\\nabla^2_\\theta\\mathcal{L}_{T_i})$ is the Hessian $\\nabla^2_\\theta\\mathcal{L}$ of the task loss — a matrix of second derivatives. Computing Hessian-vector products $\\nabla^2_\\theta\\mathcal{L} \\cdot v$ without materializing the full Hessian is the key algorithmic challenge.",
      hints: [
        "Chain rule: $\\frac{\\partial \\mathcal{L}(\\theta')}{\\partial \\theta} = \\frac{\\partial \\mathcal{L}}{\\partial \\theta'} \\cdot \\frac{\\partial \\theta'}{\\partial \\theta}$.",
        "Since $\\theta' = \\theta - \\alpha\\nabla_\\theta\\mathcal{L}$, we have $\\frac{\\partial \\theta'}{\\partial \\theta} = I - \\alpha\\nabla^2_\\theta\\mathcal{L}$. The $\\nabla^2$ is the Hessian (second derivative).",
        "Second-order derivatives are computationally expensive — this is precisely why first-order approximations like FOMAML were developed.",
      ],
    },
    {
      id: "q-meta-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MAML uses ___ gradient step(s) in the inner loop by default as described in Finn et al. (2017), and the meta-update uses which set of examples?",
      options: [
        "1 inner-loop gradient step on the support set; meta-update uses the query set",
        "5 inner-loop gradient steps on the query set; meta-update uses the support set",
        "10 inner-loop gradient steps on the full episode; meta-update uses a held-out validation set",
        "1 inner-loop gradient step on the query set; meta-update uses the support set",
      ],
      correctAnswer: 0,
      explanation:
        "MAML's default (Finn et al., 2017) uses $K=1$ inner-loop gradient step on the support set to compute $\\theta'_i = \\theta - \\alpha\\nabla_\\theta\\mathcal{L}_{T_i}^\\text{support}(f_\\theta)$, then evaluates the meta-loss on the query set:\n$$\\theta \\leftarrow \\theta - \\beta \\nabla_\\theta \\sum_i \\mathcal{L}_{T_i}^\\text{query}(f_{\\theta'_i}).$$\nThe support/query split is critical: using the same data for inner and outer loops would let the meta-learner overfit to specific examples rather than learning a generalizable initialization. The support set provides the adaptation signal; the query set measures generalization.",
      hints: [
        "In the episode $(T_i, \\mathcal{D}_i^\\text{supp}, \\mathcal{D}_i^\\text{query})$ structure: inner loop uses $\\mathcal{D}_i^\\text{supp}$, outer loop uses $\\mathcal{D}_i^\\text{query}$.",
        "Why not use the same data for both? If adaptation and evaluation share the same examples, the meta-learner can memorize them instead of learning a broadly useful initialization.",
        "Finn et al. (2017) report results with $K=1$ and $K=5$ inner steps; $K=1$ is the default reported in the main paper.",
      ],
    },
  ],

  fomaml: [
    {
      id: "q-meta-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "First-Order MAML (FOMAML) differs from vanilla MAML primarily by:",
      options: [
        "Using fewer inner-loop gradient steps to reduce training time",
        "Ignoring second-order derivatives (Hessian terms) in the meta-gradient, approximating it with first-order gradients only",
        "Using a different loss function for the outer loop update",
        "Training on fewer meta-training tasks per outer-loop update",
      ],
      correctAnswer: 1,
      explanation:
        "FOMAML drops the second-order Hessian terms from the meta-gradient, approximating:\n$$\\nabla_\\theta^\\text{FOMAML} = \\nabla_{\\theta'_i}\\mathcal{L}_{T_i} \\approx \\nabla_\\theta\\mathcal{L}_{T_i}(\\theta),$$\nas opposed to the full second-order expression:\n$$\\nabla_\\theta^\\text{MAML} = \\nabla_{\\theta'_i}\\mathcal{L}_{T_i} \\cdot (I - \\alpha\\nabla^2_\\theta\\mathcal{L}_{T_i}(\\theta)).$$\nThe FOMAML approximation ignores the $(I - \\alpha\\nabla^2_\\theta\\mathcal{L})$ factor. Empirically this retains most of MAML's performance while eliminating the expensive Hessian-vector product computation.",
      hints: [
        "Second-order gradients are the expensive part of MAML — what happens if you simply drop them?",
        "Think about the trade-off: FOMAML is faster but the gradient estimate is less accurate.",
        "The chain rule gives ∂L(\\theta')/∂\\theta = (∂L/∂\\theta') · (∂\\theta'/∂\\theta) = \\nabla_{\\theta'}L · (I − \\alpha\\nabla²_\\thetaL). Dropping (I − \\alpha\\nabla²_\\thetaL) is the FOMAML approximation.",
      ],
    },
    {
      id: "q-meta-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Reptile (Nichol et al., 2018) updates the meta-parameters by the rule: \\theta ← \\theta + \\epsilon(\\phi − \\theta), where \\phi is the result of k SGD steps on a sampled task. What is the Reptile gradient when k=1?",
      options: [
        "Identical to the standard SGD gradient on the task loss — no meta-learning occurs",
        "The Reptile gradient equals the task loss gradient, same as FOMAML with k=1 inner steps",
        "The Reptile gradient is zero because \\phi − \\theta cancels with the learning rate",
        "The Reptile gradient averages gradients across all tasks seen so far",
      ],
      correctAnswer: 1,
      explanation:
        "When k=1, \\phi = \\theta − \\alpha\\nablaL_i(\\theta), so \\phi − \\theta = −\\alpha\\nablaL_i(\\theta), and the Reptile update is \\theta ← \\theta − \\epsilon\\alpha\\nablaL_i(\\theta). This is identical to FOMAML with one inner step. Reptile's advantage emerges for k > 1, where it implicitly maximizes within-task gradient alignment.\n\nMathematically, when k=1: \\phi = \\theta − \\alpha\\nabla_\\thetaL_i(\\theta), so \\phi − \\theta = −\\alpha\\nabla_\\thetaL_i(\\theta). The update \\theta ← \\theta + \\epsilon(\\phi − \\theta) = \\theta − \\epsilon\\alpha\\nabla_\\thetaL_i(\\theta) is standard SGD on the task loss — the same as FOMAML with one inner step. For k > 1, \\phi = \\theta − \\alpha\\nabla_\\thetaL_i(\\theta) − \\alpha\\nabla_\\thetaL_i(\\theta − \\alpha\\nabla_\\thetaL_i(\\theta)) − ... (k compositions), giving Reptile its distinct behaviour.",
      hints: [
        'Reptile\'s update is "move \\theta toward where the task gradient took you" — a form of interpolation.',
        "Think about what \\theta'_i - \\theta represents when k=1: just one gradient descent step.",
        "For k > 1, \\phi = \\theta after k composed SGD steps. Reptile moves \\theta toward this \\phi, averaging over tasks: \\theta ← \\theta + \\epsilon(\\phī − \\theta) where \\phī is the average post-adaptation parameter.",
      ],
    },
    {
      id: "q-meta-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Empirically, FOMAML often achieves performance comparable to full second-order MAML despite using a cheaper gradient approximation. What theoretical insight explains why?",
      options: [
        "Neural networks have near-zero Hessians in the regions MAML operates, so second-order terms are negligible",
        "The second-order terms in MAML\'s gradient are often small in magnitude relative to first-order terms, and the noise in mini-batch gradients dominates the approximation error",
        "FOMAML uses a larger learning rate that compensates for the dropped Hessian terms",
        "Neural networks with ReLU activations have zero second derivatives everywhere",
      ],
      correctAnswer: 1,
      explanation:
        "In practice, the Hessian-vector products (second-order terms) tend to be small relative to first-order gradient magnitudes, and stochastic gradient noise dominates the error introduced by the first-order approximation — making FOMAML nearly as good as full MAML at much lower cost.\n\nThe full MAML gradient is \\nabla_\\theta^MAML = \\nabla_{\\theta'}L · (I − \\alpha\\nabla²_\\thetaL), while FOMAML uses \\nabla_\\theta^FOMAML ≈ \\nabla_\\thetaL. The approximation error from dropping (I − \\alpha\\nabla²_\\thetaL) is small when: (1) \\alpha\\nabla²_\\thetaL ≈ 0 (small curvature relative to the identity), and (2) the mini-batch gradient noise Var[\\nabla_\\thetaL] dominates the curvature term. Empirically both conditions hold in the low-shot regime where MAML operates.",
      hints: [
        "If the Hessian terms are very small, dropping them introduces very little error.",
        "Think about what dominates the gradient signal in mini-batch SGD: the mini-batch noise or the curvature terms?",
        "The Hessian \\nabla²L captures how the gradient changes with position in parameter space. In MAML's few-shot regime, gradients change slowly (small curvature), and mini-batch noise (\\propto 1/batch_size) dominates.",
      ],
    },
  ],

  "meta-sgd": [
    {
      id: "q-meta-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Meta-SGD extends MAML by meta-learning which additional components of the inner-loop update?",
      options: [
        "The loss function used for the inner-loop gradient",
        "The learning rate \\alpha and gradient direction (as a per-parameter learned vector)",
        "The number of inner-loop gradient steps",
        "The data augmentation strategy for the support set",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-SGD treats both the initialisation \\theta and the per-parameter learning rates \\alpha (stored as a vector of the same shape as \\theta) as meta-learnable parameters. The inner-loop update becomes:\n$$\\theta'_i = \\theta + \\alpha \\odot \\nabla_\\theta\\mathcal{L}_{T_i}(\\theta),$$\nwhere ⊙ is elementwise multiplication. This allows the meta-learner to learn both what to update (\\theta) and by how much (\\alpha) — effectively learning a diagonal preconditioning matrix for each task. The meta-objective is:\n$$\\min_{\\theta, \\alpha} \\sum_i \\mathcal{L}_{T_i}^\\text{query}(f_{\\theta + \\alpha \\odot \\nabla_\\theta\\mathcal{L}_{T_i}^\\text{support}}),$$\noptimized jointly over \\theta and \\alpha.",
      hints: [
        "MAML learns \\theta₀ but uses a fixed scalar learning rate. What else about SGD could be learned?",
        "Think about per-parameter adaptive learning rates — Meta-SGD learns these as part of the meta-training.",
      ],
    },
    {
      id: "q-meta-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In Meta-SGD, the inner-loop update for parameter \\theta on task i is: \\theta'_i = \\theta - \\alpha ⊙ \\nablaL_i(\\theta), where ⊙ is element-wise multiplication and \\alpha is a learned vector.",
      correctAnswer: "True",
      explanation:
        "The elementwise multiplication of the gradient by learned vector \\alpha allows each parameter to have its own learning rate and even sign of update, giving the meta-learner more expressive control over the inner-loop adaptation.\n\nSpecifically, each parameter component j is updated as: \\theta'_j = \\theta_j + \\alpha_j · (\\nablaL)_j. If \\alpha_j is positive, the update follows the gradient; if \\alpha_j is negative, the update reverses the gradient direction. This is equivalent to learning a diagonal preconditioning matrix M = diag(\\alpha) applied to the gradient: \\theta' = \\theta + M · \\nablaL. The meta-learner learns \\alpha that generalizes across tasks, finding per-parameter learning rates that work well for the task distribution.",
      hints: [
        "Standard SGD uses a scalar \\alpha; Meta-SGD uses a vector \\alpha with the same shape as the gradient.",
        "Element-wise multiplication (⊙) applies a different scaling to each gradient component.",
      ],
    },
    {
      id: "q-meta-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why might meta-learned per-parameter learning rates in Meta-SGD be more effective than a global learning rate in MAML for few-shot regression tasks?",
      options: [
        "Per-parameter rates allow the model to skip updating parameters that are already near-optimal for the task distribution",
        "Different parameters may need vastly different update magnitudes for efficient task adaptation — some features are shared across tasks while others are task-specific",
        "Global learning rates cause gradient explosion when the inner loop runs for more than 5 steps",
        "Per-parameter rates reduce the number of inner-loop steps needed from 5 to 1",
      ],
      correctAnswer: 1,
      explanation:
        "In few-shot settings, some parameters encode shared representations (low learning rate optimal) while others are task-specific heads (high learning rate optimal). Per-parameter rates let the meta-learner implicitly discover and exploit this structure.\n\nConsider a ConvNet backbone + linear head: the backbone parameters encode general visual features useful across tasks (small \\alpha_j ensures these useful features aren't disrupted by task adaptation), while the head parameters are specific to each task's classification boundaries (large \\alpha_j allows rapid task-specific adjustment). A scalar \\alpha cannot simultaneously be small for the backbone and large for the head — per-parameter \\alpha_j resolves this tension. Empirically, Meta-SGD often outperforms MAML on regression tasks where different output dimensions require different adaptation speeds.",
      hints: [
        "Think about which layers in a neural network are task-specific vs. generally useful across tasks.",
        "A backbone feature extractor might need small updates; a task-specific head might need large ones.",
        "The elementwise update \\theta'_j = \\theta_j + \\alpha_j · (\\nablaL)_j lets \\alpha_j be negative for some parameters (reversing gradient direction) and positive for others.",
      ],
    },
  ],

  "anil-boil": [
    {
      id: "q-meta-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "ANIL (Almost No Inner Loop) modifies MAML by restricting inner-loop updates to which part of the network?",
      options: [
        "Only the batch normalisation parameters",
        "Only the final classification head (last layer), leaving the feature extractor frozen during inner-loop adaptation",
        "All layers except the first convolutional block",
        "Only the bias terms across all layers",
      ],
      correctAnswer: 1,
      explanation:
        "ANIL freezes the feature extractor during inner-loop adaptation and only adapts the final head layer. Remarkably, this achieves near-identical performance to full MAML, suggesting the feature extractor does most of the task-relevant work.",
      hints: [
        'If ANIL is "Almost No Inner Loop" (head only), BOIL is its complement — body only.',
        "Think about what it means to adapt the features but keep the classifier fixed.",
      ],
    },
    {
      id: "q-meta-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "BOIL (Body Only Inner Loop) is the opposite of ANIL: it updates only the feature extractor (body) during inner-loop adaptation and freezes the head.",
      correctAnswer: "True",
      explanation:
        "BOIL updates the backbone (body) during the inner loop and freezes the classification head, investigating how much of MAML\'s success comes from adapting features vs. adapting the classifier, and finding that body updates can be beneficial in some settings.",
      hints: [
        'If ANIL is "Almost No Inner Loop" (head only), BOIL is its complement — body only.',
        "Think about what it means to adapt the features but keep the classifier fixed.",
      ],
    },
    {
      id: "q-meta-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The ANIL finding that feature reuse dominates task adaptation in MAML has an important practical implication. What is it?",
      options: [
        "MAML can be replaced by simple feature extraction with a linear classifier for all tasks",
        "Pre-training a good feature extractor (e.g., with supervised or self-supervised learning) may be as effective as or more effective than full meta-learning for many few-shot benchmarks",
        "Inner-loop adaptation is only useful when the number of inner-loop steps exceeds 10",
        "Feature reuse means the embedding space must be explicitly regularised to prevent collapse",
      ],
      correctAnswer: 1,
      explanation:
        'If feature reuse is the main driver of MAML\'s performance, then investing in better pre-training (e.g., larger backbones, stronger SSL pre-training) rather than complex meta-learning algorithms may yield better few-shot results — a finding consistent with "baseline" papers in the field.',
      hints: [
        "If the feature extractor barely changes during inner-loop adaptation, what matters most?",
        "Think about papers that show simple fine-tuning of a well-pretrained backbone beats complex meta-learning methods.",
      ],
    },
  ],

  "memory-augmented": [
    {
      id: "q-meta-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Memory-Augmented Neural Networks (MANNs) extend standard neural networks for meta-learning by adding:",
      options: [
        "A larger number of parameters to increase model capacity",
        "An external addressable memory that can be rapidly written to and read from, allowing the network to store and retrieve task-specific information",
        "A recurrent architecture that processes the entire training set sequentially",
        "A cache of training examples that is consulted during every forward pass",
      ],
      correctAnswer: 1,
      explanation:
        "MANNs couple a neural network controller with an external memory matrix that supports differentiable read and write operations, enabling rapid binding of new information (support examples) for few-shot retrieval.",
      hints: [
        'The memory is "external" — it is separate from the model\'s weights and can be updated per episode.',
        "Think about why a standard RNN\'s hidden state might not be sufficient to store many few-shot examples.",
      ],
    },
    {
      id: "q-meta-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Neural Turing Machine (NTM) uses content-based and location-based addressing to read from and write to its external memory differentiably.",
      correctAnswer: "True",
      explanation:
        "NTM\'s read/write heads combine content-based addressing (attention over memory by key similarity) and location-based addressing (sequential shifts), allowing flexible, differentiable memory access trained end-to-end via backpropagation.",
      hints: [
        "Content-based addressing finds memory locations similar to a query key — like a dictionary lookup.",
        "Location-based addressing allows sequential access patterns — like reading a tape.",
      ],
    },
    {
      id: "q-meta-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the MANN paper by Santoro et al., a Least Recently Used Access (LRUA) write strategy is proposed. What problem does this solve in few-shot meta-learning?",
      options: [
        "It prevents the memory from storing duplicate examples by overwriting the oldest entry",
        "It ensures new support examples overwrite the least recently accessed memory slots, preserving frequently accessed (relevant) memories and making room for new task information",
        "It reduces the memory read cost by caching the most recently used slots in fast memory",
        "It ensures all memory slots are written with equal frequency to prevent memory collapse",
      ],
      correctAnswer: 1,
      explanation:
        "LRUA overwrites the least recently used memory slot, keeping task-relevant memories intact (since they are read frequently) while replacing stale, unused memories — an inductive bias suited for episodic few-shot learning.",
      hints: [
        'Think about what "least recently used" means as a replacement policy — it discards what hasn\'t been needed recently.',
        "In a few-shot episode, which memory slots should be preserved: ones you\'ve consulted or ones you haven\'t?",
      ],
    },
  ],

  hypernetworks: [
    {
      id: "q-meta-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A hypernetwork in the context of meta-learning is:",
      options: [
        "A very large neural network trained on massive datasets",
        "A network that generates the weights of another (target) network, conditioned on task information",
        "A network with skip connections between all layers",
        "An ensemble of networks trained on different data subsets",
      ],
      correctAnswer: 1,
      explanation:
        "A hypernetwork takes task context (e.g., support set embeddings) as input and outputs the weights of a separate target network, enabling rapid task-specific weight generation without gradient-based inner-loop adaptation.",
      hints: [
        'The hypernetwork produces the weights for another network — it\'s a "network that makes networks".',
        "Think about how this differs from gradient-based adaptation: instead of updating weights, you generate them.",
      ],
    },
    {
      id: "q-meta-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Hypernetworks for weight generation must output all weights of the target network in a single forward pass, which limits them to small target networks.",
      correctAnswer: "False",
      explanation:
        "Chunking and factorisation techniques allow hypernetworks to generate weights layer-by-layer or in compressed factored form (e.g., low-rank factors), enabling their application to large target networks without outputting every weight simultaneously.",
      hints: [
        "Think about how you would handle generating millions of weights — do you need all of them at once?",
        "Low-rank factorisation is a common trick: generate A and B such that W ≈ AB, rather than generating W directly.",
      ],
    },
    {
      id: "q-meta-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Compared to MAML-style gradient-based adaptation, what is the key computational advantage of hypernetwork-based weight generation at meta-test time?",
      options: [
        "Hypernetworks require fewer training examples to learn weight generation",
        "Weight generation is a single forward pass through the hypernetwork, whereas MAML requires multiple gradient computation steps on the support set",
        "Hypernetworks do not require differentiating through the target network",
        "Hypernetworks can generate weights for arbitrary architectures not seen during training",
      ],
      correctAnswer: 1,
      explanation:
        "At meta-test time, a hypernetwork generates task-specific weights in a single forward pass — O(1) in terms of gradient steps — whereas MAML requires multiple forward and backward passes through the target network on the support set.",
      hints: [
        "MAML adapts through gradient steps — each step requires a forward and backward pass through the full network.",
        "A hypernetwork just runs once and produces weights — how does that compare to multiple gradient steps?",
      ],
    },
  ],

  "black-box-meta": [
    {
      id: "q-meta-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Black-box meta-learning approaches (e.g., LSTM meta-learner) treat the adaptation process as:",
      options: [
        "A closed-form least squares solution computed on the support set",
        "A learned sequential process where a recurrent network reads support examples and produces predictions for query examples",
        "A nearest-neighbour lookup in a pre-computed embedding space",
        "A gradient descent update step on a fixed initialisation",
      ],
      correctAnswer: 1,
      explanation:
        "Black-box approaches use a recurrent model (LSTM, Transformer) as the meta-learner: it processes the support set sequentially and maintains internal state that encodes the task, producing predictions for queries without explicit gradient steps.",
      hints: [
        "Black-box refers to the fact that the adaptation mechanism is entirely learned and opaque — no explicit gradient steps.",
        "Think about an LSTM that reads (x₁,y₁), (x₂,y₂), ... and then predicts y for a new x.",
      ],
    },
    {
      id: "q-meta-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SNAIL (Simple Neural Attentive Learner) combines temporal convolutional layers and attention to process support sets in meta-learning, enabling it to capture both local and long-range dependencies.",
      correctAnswer: "True",
      explanation:
        "SNAIL interleaves causal temporal convolutional blocks (for efficient local aggregation) with attention blocks (for direct access to any previous position), allowing it to process variable-length support sets effectively for meta-learning.",
      hints: [
        "Temporal convolutions capture local patterns; attention captures global dependencies — SNAIL uses both.",
        "Think about why you want both: local patterns for nearby support examples, global attention for the most relevant ones.",
      ],
    },
    {
      id: "q-meta-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A fundamental limitation of pure black-box meta-learners (LSTM meta-learner) compared to gradient-based methods like MAML is:",
      options: [
        "Black-box meta-learners cannot process image inputs",
        "Black-box meta-learners must encode all task information in fixed-size hidden states, which may not scale to tasks requiring large support sets or many classes",
        "Black-box meta-learners require second-order gradient computation",
        "Black-box meta-learners cannot be trained on episodic tasks",
      ],
      correctAnswer: 1,
      explanation:
        "LSTM hidden states have fixed capacity; as the support set grows larger or the task becomes more complex, the recurrent state may not be sufficient to store all task-relevant information — a scalability bottleneck that gradient-based methods avoid by updating weights directly.",
      hints: [
        'Think about an LSTM\'s hidden state as a fixed-size "working memory" — what happens as the task complexity grows?',
        "MAML stores task information in the adapted weights, which scale with model capacity; the LSTM hidden state is fixed-size.",
      ],
    },
  ],

  "bayesian-meta": [
    {
      id: "q-meta-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Bayesian meta-learning frames few-shot learning as:",
      options: [
        "Maximum likelihood estimation of task-specific parameters from the support set",
        "Inference of a posterior distribution over task-specific parameters given the support set, using a prior learned from meta-training tasks",
        "Ensemble averaging of models trained on each task independently",
        "Gradient-based optimisation with a Gaussian prior as an L2 regulariser",
      ],
      correctAnswer: 1,
      explanation:
        "Bayesian meta-learning learns a prior over model parameters from meta-training tasks. At meta-test time, the support set updates this prior via Bayes' rule to yield a posterior, enabling principled uncertainty quantification in few-shot predictions.",
      hints: [
        "Think about Bayes' rule: prior × likelihood \\propto posterior. What plays each role in few-shot learning?",
        "The prior is learned from many tasks; the posterior is task-specific given the support set.",
      ],
    },
    {
      id: "q-meta-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PLATIPUS explicitly models uncertainty over the meta-learned initialisation by learning a distribution over MAML initialisation parameters rather than a point estimate.",
      correctAnswer: "True",
      explanation:
        "PLATIPUS extends MAML by representing the meta-initialisation as a distribution p(\\theta) rather than a point \\theta, enabling the model to express uncertainty about the initialisation and sample multiple adapted models for probabilistic prediction.",
      hints: [
        "MAML learns a single point \\theta; PLATIPUS asks: what if we learned a distribution p(\\theta)?",
        "Uncertainty in the initialisation propagates to uncertainty in the adapted model\'s predictions.",
      ],
    },
    {
      id: "q-meta-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What practical advantage does Bayesian meta-learning (e.g., ABML) provide over standard MAML in safety-critical few-shot applications?",
      options: [
        "Bayesian methods train faster because they avoid second-order gradients",
        "Bayesian methods provide calibrated predictive uncertainty, allowing the system to express low confidence on ambiguous queries rather than making overconfident predictions",
        "Bayesian methods do not require episodic training, simplifying the data pipeline",
        "Bayesian methods automatically select the optimal number of inner-loop steps",
      ],
      correctAnswer: 1,
      explanation:
        "In safety-critical domains (medical diagnosis, autonomous driving), knowing when the model is uncertain is as important as its predictions. Bayesian meta-learners provide posterior predictive distributions, enabling reliable uncertainty quantification with few-shot data.",
      hints: [
        'Standard MAML produces a point prediction — it cannot say "I\'m not sure". Bayesian methods can.',
        'Think about a few-shot medical diagnosis system: would you prefer a confident wrong answer or an honest "uncertain"?',
      ],
    },
  ],

  "gradient-based-meta": [
    {
      id: "q-meta-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In gradient-based meta-learning, the bi-level optimization has an inner and outer loop. Using MAML notation, the complete outer-loop update is:",
      options: [
        "\\theta ← \\theta − \\beta\\nabla_\\theta \\Sigmaᵢ L_{T_i}(f_{\\theta'_i}), where \\theta'_i = \\theta − \\alpha\\nabla_\\theta L_{T_i}(f_\\theta) and \\beta is the meta-learning rate",
        "\\theta ← \\theta − \\alpha\\nabla_\\theta \\Sigmaᵢ L_{T_i}(f_\\theta), treating each task independently without inner-loop adaptation",
        "\\theta ← \\theta − \\beta \\Sigmaᵢ \\nabla_{\\theta'_i} L_{T_i}(f_{\\theta'_i}), where gradients are taken with respect to the adapted parameters only",
        "\\theta ← \\theta + \\beta(\\theta'_i − \\theta), the Reptile update using the difference between adapted and original parameters",
      ],
      correctAnswer: 0,
      explanation:
        "The MAML bi-level optimization: inner loop computes \\theta'_i = \\theta − \\alpha\\nablaL_{T_i}(\\theta) on the support set; outer loop evaluates the meta-loss on the query set and updates: \\theta ← \\theta − \\beta\\nabla_\\theta \\Sigma_i L_{T_i}(f_{\\theta'_i}). The gradient \\nabla_\\theta L(f_{\\theta'_i}) requires differentiating through the inner loop (second-order), giving terms involving the Hessian ∂²L/∂\\theta².",
      hints: [
        "Inner loop: adapt to each task; outer loop: update the initialization based on post-adaptation performance.",
        "\\alpha is the inner learning rate (task-level); \\beta is the outer/meta learning rate.",
      ],
    },
    {
      id: "q-meta-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gradient-based meta-learning suffers from meta-overfitting when the number of meta-training tasks is small relative to the model complexity — analogous to standard overfitting when training examples are few.",
      correctAnswer: "True",
      explanation:
        "With too few meta-training tasks, the meta-learner overfits: the learned initialization adapts well to the specific training task distribution but fails on novel meta-test tasks. Regularization techniques (dropout in the inner loop, data augmentation, task augmentation) or limiting the number of inner-loop steps help prevent meta-overfitting.",
      hints: [
        "Meta-overfitting is analogous to regular overfitting: too few examples (tasks) relative to model capacity.",
        'In meta-learning, "examples" are entire tasks — overfitting to 50 tasks with a large model is easy.',
      ],
    },
    {
      id: "q-meta-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The exact MAML meta-gradient \\nabla_\\theta L_{T_i}(f_{\\theta'_i}) involves a Hessian term. Using the chain rule with \\theta'_i = \\theta − \\alpha\\nablaL_{T_i}(\\theta), the full expression is:",
      options: [
        "\\nabla_\\theta L_{T_i}(f_{\\theta'_i}) = \\nabla_{\\theta'_i} L_{T_i} · (I − \\alpha\\nabla²_\\theta L_{T_i}(\\theta)) — requiring a Hessian-vector product computation",
        "\\nabla_\\theta L_{T_i}(f_{\\theta'_i}) = \\nabla_{\\theta} L_{T_i}(f_\\theta) — the same as the pre-adaptation gradient (FOMAML approximation)",
        "\\nabla_\\theta L_{T_i}(f_{\\theta'_i}) = \\nabla_{\\theta'_i} L_{T_i} / \\alpha — the gradient divided by the inner learning rate",
        "\\nabla_\\theta L_{T_i}(f_{\\theta'_i}) = 0 when one inner step is used, requiring at least two steps for a non-zero gradient",
      ],
      correctAnswer: 0,
      explanation:
        "By chain rule: ∂L(f_{\\theta'_i})/∂\\theta = ∂L/∂\\theta'_i · ∂\\theta'_i/∂\\theta = \\nabla_{\\theta'_i}L · (I − \\alpha\\nabla²L_{T_i}(\\theta)). The Hessian \\nabla²L_{T_i}(\\theta) makes this second-order. FOMAML drops this term, using only \\nabla_{\\theta'_i}L (first order). The Hessian-vector product can be computed via reverse-mode autodiff without materializing the full Hessian.",
      hints: [
        "Use chain rule: dL(\\theta'(\\theta))/d\\theta = dL/d\\theta' · d\\theta'/d\\theta.",
        "d\\theta'/d\\theta = d(\\theta − \\alpha\\nablaL)/d\\theta = I − \\alpha\\nabla²L — this is the Hessian term.",
      ],
    },
  ],

  "task-distribution": [
    {
      id: "q-meta-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In meta-learning, "task distribution" p(T) refers to:',
      options: [
        "The distribution of class labels within each training batch",
        "The population of possible tasks (e.g., few-shot classification problems) from which episodes are sampled during meta-training",
        "The probability distribution of learning rates used across meta-training",
        "The distribution of model architectures evaluated during neural architecture search",
      ],
      correctAnswer: 1,
      explanation:
        "p(T) is the distribution from which tasks (episodes) are sampled during meta-training. Designing or selecting this distribution is critical because the meta-learner generalises to tasks drawn from the same distribution at meta-test time.",
      hints: [
        'Think of p(T) as the "training set" of the meta-learner — but its elements are tasks, not examples.',
        "If p(T) is too narrow (few task types), the meta-learner will overfit to those tasks.",
      ],
    },
    {
      id: "q-meta-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A well-designed task distribution for meta-learning should include sufficient diversity so that the meta-learner cannot solve tasks by memorising task-specific patterns rather than learning general adaptation strategies.",
      correctAnswer: "True",
      explanation:
        "Diverse task distributions force the meta-learner to develop broadly applicable strategies for adaptation. If the distribution is too narrow, the model might overfit the task structure rather than learning to adapt.",
      hints: [
        "If all tasks are variations of the same problem, the model might overfit the task structure rather than learning to adapt.",
        "Think about why human learning benefits from diverse experiences rather than repetition of one type of problem.",
      ],
    },
    {
      id: "q-meta-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When the meta-test task distribution differs significantly from the meta-train task distribution, what failure mode occurs?",
      options: [
        "The model\'s inner-loop learning rate becomes too large and causes divergence",
        "Meta-train/test task distribution shift: the meta-learner fails to adapt because its inductive bias is tailored to the training task distribution and does not generalise",
        "The model ignores the support set and uses its pre-adaptation parameters directly",
        "The outer-loop gradient becomes zero due to the distributional mismatch",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-train/test task distribution shift degrades meta-learner performance. If meta-test tasks differ structurally from meta-train tasks, the learned adaptation strategy may be ineffective or harmful.",
      hints: [
        "Think about training a meta-learner on medical image tasks and testing on satellite image tasks.",
        "The meta-learner\'s inductive bias is shaped by the training task distribution — mismatch breaks generalisation.",
      ],
    },
  ],

  "zero-shot-meta": [
    {
      id: "q-meta-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Zero-shot learning (ZSL) aims to classify instances of classes that were never seen during training. How is this made possible?",
      options: [
        "By training on an extremely large dataset that implicitly covers all possible classes",
        "By representing each class through semantic descriptors (attributes, word vectors, text descriptions) and learning a mapping from visual features to this semantic space",
        "By using data augmentation to synthesise examples of unseen classes",
        "By training a separate binary classifier for every possible pair of classes",
      ],
      correctAnswer: 1,
      explanation:
        "ZSL leverages semantic class descriptors (e.g., attribute vectors, word embeddings) shared between seen and unseen classes. By learning to map visual features to the same semantic space, the model can recognise unseen classes from their descriptions alone.",
      hints: [
        "If you\'ve never seen a \"zebra\" but know it has black and white stripes and four legs, you can recognise one — that\'s ZSL.",
        "The key is shared semantic representation between seen and unseen classes.",
      ],
    },
    {
      id: "q-meta-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In the generalised zero-shot learning (GZSL) setting, the test set contains instances from both seen and unseen classes, making it harder than standard ZSL.",
      correctAnswer: "True",
      explanation:
        "Standard ZSL tests only on unseen classes, while GZSL tests on both seen and unseen classes. Models tend to be biased toward seen classes (which they trained on), making GZSL a more challenging and realistic evaluation setting.",
      hints: [
        "In standard ZSL, you know the test class is unseen. In GZSL, you don\'t know — it could be either.",
        "Models trained on seen classes have a strong prior toward predicting seen class labels.",
      ],
    },
    {
      id: "q-meta-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "hubness problem" in ZSL refers to what phenomenon in the semantic embedding space?',
      options: [
        "Some semantic attributes are correlated, making the embedding space low-rank",
        "A small number of semantic prototypes become nearest neighbours of many query points in high-dimensional spaces, degrading ZSL classification accuracy",
        "Unseen class prototypes cluster too closely together in the semantic space",
        "The embedding space collapses to a low-dimensional manifold during training",
      ],
      correctAnswer: 1,
      explanation:
        'In high-dimensional spaces, a few "hub" points tend to appear as nearest neighbours of many other points due to concentration of measure. In ZSL, hub class prototypes attract many query embeddings, causing misclassification.',
      hints: [
        'In high dimensions, distances become more uniform — some points become "hubs" that are close to many others.',
        "Think about what happens to k-NN classification when a few prototypes are always among the k-nearest to most queries.",
      ],
    },
  ],

  "in-context-learning": [
    {
      id: "q-meta-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In-context learning (ICL) in large language models refers to:",
      options: [
        "Fine-tuning the model on a few labelled examples before inference",
        "The model adapting its predictions based on demonstrations (input-output examples) provided in the prompt context, without any gradient updates",
        "Using the model\'s internal context window as external memory",
        "Pre-training the model on a diverse mixture of tasks",
      ],
      correctAnswer: 1,
      explanation:
        "ICL allows a frozen LLM to perform new tasks by reading input-output examples in the prompt context and generalising the pattern to a new input — achieving few-shot adaptation without parameter updates.",
      hints: [
        'In-context means the "learning" happens within the context window at inference time, not in the weights.',
        "No gradient updates happen in ICL — the model\'s weights stay fixed.",
      ],
    },
    {
      id: "q-meta-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In-context learning can be interpreted as implicit Bayesian inference, where the LLM approximates a posterior over task functions given the in-context demonstrations.",
      correctAnswer: "True",
      explanation:
        "Theoretical work (e.g., Xie et al. 2022) shows that ICL in LLMs trained on diverse tasks approximates Bayesian inference: the model infers the latent task from demonstrations and predicts accordingly — connecting ICL to meta-learning and Bayesian models.",
      hints: [
        'Think about how the model updates its "belief" about the task as it reads more demonstrations.',
        "Bayesian inference: prior (from pre-training) × likelihood (from demonstrations) ≈ posterior (LLM prediction).",
      ],
    },
    {
      id: "q-meta-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Research on in-context learning has found that the labels in ICL demonstrations are often less important than previously assumed. What does this suggest?",
      options: [
        "LLMs ignore all information in the context and rely solely on pre-training",
        "The format, distribution, and structure of input-output pairs matter more than the accuracy of the labels — the model is learning to locate the right task format, not the correct input-output mapping",
        "Demonstrations with wrong labels always improve performance by acting as a form of regularisation",
        "LLMs cannot learn from labelled examples and only benefit from unlabelled input demonstrations",
      ],
      correctAnswer: 1,
      explanation:
        "Studies (Min et al., 2022) found that randomising labels in ICL examples barely degrades performance, suggesting LLMs use demonstrations primarily to identify the task format and input space, not to learn the true input-output mapping from labels.",
      hints: [
        "If wrong labels don\'t hurt much, what are the demonstrations actually teaching the model?",
        'Think about ICL as "formatting instructions" rather than "supervised examples".',
      ],
    },
  ],

  "prompt-tuning-meta": [
    {
      id: "q-meta-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Prompt tuning (soft prompts) differs from full fine-tuning in that:",
      options: [
        "Prompt tuning updates all model parameters, while fine-tuning updates only the final layer",
        "Prompt tuning optimises only a small set of continuous prompt vectors prepended to the input, leaving the frozen LLM weights unchanged",
        "Prompt tuning uses discrete text prompts optimised by genetic algorithms",
        "Prompt tuning requires more labelled examples than full fine-tuning",
      ],
      correctAnswer: 1,
      explanation:
        "Soft prompt tuning prepends learnable continuous vectors to the input sequence and optimises them via gradient descent on a task\'s training set, keeping the massive pre-trained model frozen — dramatically reducing the number of trainable parameters.",
      hints: [
        'Think about what "soft" means: the prompt tokens are not discrete words but continuous floating-point vectors.',
        "Only the prompt vectors are updated; the LLM\'s billions of parameters stay frozen.",
      ],
    },
    {
      id: "q-meta-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Meta-prompt tuning frameworks train a prompt initialisation across many tasks so that it can be rapidly adapted to new tasks with very few gradient steps, directly analogising MAML to the prompt space.",
      correctAnswer: "True",
      explanation:
        "Works like MAML applied to prompts (e.g., ATTEMPT, MetaPrompt) learn a shared prompt initialisation across meta-training tasks, enabling few-step adaptation of the prompt vectors to new tasks — a direct application of the MAML meta-learning algorithm to the prompt parameter space.",
      hints: [
        "MAML finds a good parameter initialisation; apply the same idea to prompt parameters instead of model weights.",
        "If prompt vectors are the only trainable parameters, MAML over them is extremely parameter-efficient.",
      ],
    },
    {
      id: "q-meta-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why might prompt tuning be viewed as a form of meta-learning rather than standard supervised fine-tuning?",
      options: [
        "Because prompt tuning uses gradient descent, which is a meta-learning algorithm",
        "Because prompt tuning learns a lightweight task-conditioning mechanism that steers a general pre-trained model without modifying the general knowledge encoded in its weights",
        "Because prompt tuning always trains on multiple tasks simultaneously",
        "Because the soft prompt vectors can be used to generate new training data",
      ],
      correctAnswer: 1,
      explanation:
        "Prompt tuning can be seen as learning a task-specific input adaptation while leveraging the pre-trained model as a frozen general-purpose base — analogous to meta-learning an input conditioning mechanism that guides the model\'s behaviour without relearning from scratch.",
      hints: [
        "Meta-learning is about adapting a general base to specific tasks efficiently — what does prompt tuning adapt?",
        'The frozen LLM is the "meta-learner"; the soft prompt is the task-specific adaptation.',
      ],
    },
  ],

  "cross-domain-meta": [
    {
      id: "q-meta-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Cross-domain meta-learning addresses what limitation of standard few-shot learning benchmarks?",
      options: [
        "Standard benchmarks use images that are too small for modern architectures",
        "Standard benchmarks evaluate generalisation within a single domain (e.g., all natural images), whereas real-world meta-learning requires adapting across domains with different visual statistics",
        "Standard benchmarks do not include enough classes for high-way evaluation",
        "Standard benchmarks use fixed class splits that prevent episodic training",
      ],
      correctAnswer: 1,
      explanation:
        "Benchmarks like miniImageNet test within-domain generalisation. Cross-domain meta-learning evaluates whether a meta-learner trained on one domain (e.g., natural photos) can adapt to novel domains (e.g., medical images, satellite photos) with few examples.",
      hints: [
        "Think about training on animals and testing on skin lesions — that\'s a domain shift.",
        "Within-domain success doesn\'t guarantee cross-domain generalisation.",
      ],
    },
    {
      id: "q-meta-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Models pre-trained on large diverse datasets (e.g., ImageNet-21k) tend to produce more transferable features for cross-domain few-shot learning than models trained only on small domain-specific datasets.",
      correctAnswer: "True",
      explanation:
        "Large-scale pre-training on diverse data produces feature representations that capture general visual concepts, making them more broadly transferable to target domains that differ from the training domain.",
      hints: [
        "Diversity of pre-training data correlates with breadth of learned representations.",
        "Think about why ImageNet features transfer well to many vision tasks — they encode general visual structure.",
      ],
    },
    {
      id: "q-meta-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The STARTUP method for cross-domain few-shot learning uses unlabelled target-domain images at meta-test time. What does this approach enable?",
      options: [
        "It enables the model to fine-tune on the target domain using a self-supervised pre-text task before few-shot classification",
        "It enables semi-supervised adaptation: using unlabelled target data to align the meta-learned features toward the target domain distribution before performing few-shot classification",
        "It enables the model to generate labelled examples for the target domain using a generative model",
        "It enables the model to select which meta-training tasks are most relevant for the target domain",
      ],
      correctAnswer: 1,
      explanation:
        "STARTUP uses unlabelled target-domain images to fine-tune the feature extractor (via self-training or SSL) before few-shot classification, reducing the domain gap and improving cross-domain few-shot accuracy without requiring labelled target data.",
      hints: [
        "Unlabelled data from the target domain is valuable for adapting features even without labels.",
        "Self-training uses the model\'s own predictions as pseudo-labels to adapt to the target distribution.",
      ],
    },
  ],

  "continual-meta": [
    {
      id: "q-meta-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Catastrophic forgetting in continual learning refers to:",
      options: [
        "A model failing to generalise to new classes due to insufficient training data",
        "A neural network losing performance on previously learned tasks when trained sequentially on new tasks",
        "A model\'s gradient norm exploding when trained on long sequences of tasks",
        "A model overfitting to the most recent task in a continual learning stream",
      ],
      correctAnswer: 1,
      explanation:
        "Catastrophic forgetting occurs because SGD updates weights to minimise the current task\'s loss, overwriting the weight configurations that encoded previously learned task knowledge.",
      hints: [
        "Think about what happens to the weights for Task 1 when you train only on Task 2.",
        'Gradient updates are not "task-aware" — they modify shared weights to fit the current task.',
      ],
    },
    {
      id: "q-meta-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Meta-learning can address catastrophic forgetting by learning an initialisation or update rule that inherently preserves prior task performance when adapting to new tasks.",
      correctAnswer: "True",
      explanation:
        "Meta-learning approaches like OML (Online-aware Meta-Learning) and ANML explicitly meta-train for the ability to quickly learn new tasks without forgetting old ones, directly encoding anti-forgetting inductive bias into the initialisation or update rule.",
      hints: [
        "If you meta-train by simulating continual learning sequences, the model learns to adapt without catastrophically forgetting.",
        "The meta-objective can explicitly penalise forgetting as part of the outer-loop loss.",
      ],
    },
    {
      id: "q-meta-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "OML (Online-aware Meta-Learning) trains a model to minimise forgetting by using an episodic structure that mimics continual learning. What is the structure of each OML training episode?",
      options: [
        "A single task sampled i.i.d. from the task distribution, evaluated on a held-out query set",
        "A sequence of tasks trained one after another (inner loop), followed by evaluation on all previously seen tasks (outer loop), meta-training the model to maintain performance across the sequence",
        "A replay buffer of past tasks interleaved with the current task during the inner loop",
        "A pair of related tasks trained jointly to maximise their shared representation",
      ],
      correctAnswer: 1,
      explanation:
        "OML simulates a continual learning stream in the inner loop (sequential task exposure without replay) and evaluates retention of all tasks in the outer loop — directly meta-training the model to have low forgetting across sequential task exposure.",
      hints: [
        "OML\'s training procedure simulates the exact evaluation protocol of continual learning.",
        "The outer loop penalises forgetting by measuring performance on earlier tasks after sequential adaptation.",
      ],
    },
  ],

  "rl-meta": [
    {
      id: "q-meta-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Meta-Reinforcement Learning (meta-RL) aims to train agents that can:",
      options: [
        "Learn a single optimal policy for one fixed environment",
        "Quickly adapt to new reward functions or environment dynamics using only a few episodes of interaction",
        "Maximise reward on a single task without any prior training",
        "Learn to predict the environment\'s transition dynamics from pixels",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-RL agents are trained across a distribution of tasks (different reward functions, dynamics, or goals) so they can rapidly adapt to new tasks from the same distribution with minimal new interactions.",
      hints: [
        'Think of meta-RL as "learning to learn to act" — the meta-learner learns how to adapt the policy quickly.',
        "A few episodes with a new reward function should be enough for a meta-RL agent to identify and optimise it.",
      ],
    },
    {
      id: "q-meta-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "RL² (Reinforcement Learning squared) implements meta-RL by using a recurrent policy that treats the entire history of an episode (actions, observations, rewards, dones) as its input, enabling it to adapt its behaviour within a single trial.",
      correctAnswer: "True",
      explanation:
        "RL² uses an LSTM-based policy that processes the full interaction history within a multi-episode trial. The recurrent state encodes the task identity inferred from experience, allowing the policy to adapt its strategy without gradient updates.",
      hints: [
        "RL² is a black-box meta-RL method: the adaptation happens via the RNN hidden state, not gradient steps.",
        "Think about what it means to adapt the features but keep the classifier fixed.",
      ],
    },
    {
      id: "q-meta-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MAML applied to RL (MAML-RL) uses policy gradient to compute inner-loop updates. What is the main challenge this introduces compared to supervised meta-learning?",
      options: [
        "Policy gradient estimates are unbiased and lower variance than supervised gradients",
        "Policy gradient estimates are high-variance and require many rollouts to get a reliable inner-loop gradient, making meta-training sample-inefficient and expensive",
        "MAML-RL requires a differentiable environment model for the inner-loop updates",
        "Policy gradient cannot be used with MAML because it is not differentiable through the inner loop",
      ],
      correctAnswer: 1,
      explanation:
        "In MAML-RL, the inner-loop gradient is estimated via policy gradient (REINFORCE), which has notoriously high variance. This requires many rollouts per task per inner step, making meta-training computationally demanding and data-hungry compared to supervised MAML.",
      hints: [
        "Policy gradient uses sampled trajectories for gradient estimation — why are these estimates noisy?",
        "Compare to supervised MAML where the inner gradient is computed on fixed support examples with a deterministic loss.",
      ],
    },
  ],

  "nas-meta": [
    {
      id: "q-meta-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "How can meta-learning accelerate Neural Architecture Search (NAS)?",
      options: [
        "By using gradient-free evolutionary algorithms to search the architecture space",
        "By meta-learning an initialisation or predictor that transfers knowledge from previously evaluated architectures to rapidly estimate the performance of new ones",
        "By training each candidate architecture for the full number of epochs before comparing",
        "By randomly sampling architectures and selecting the one with the highest training loss",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-learning can train a performance predictor or warm initialisation that uses knowledge from prior architecture evaluations to quickly estimate new architecture quality, dramatically reducing the number of full training runs needed.",
      hints: [
        "NAS is expensive because evaluating each architecture requires training — meta-learning reduces this cost.",
        "Think about learning a function that maps architecture descriptors to expected accuracy.",
      ],
    },
    {
      id: "q-meta-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Meta-learning for Hyperparameter Optimisation (HPO) can use warm-starting: initialising the HPO search from hyperparameter configurations that performed well on similar past tasks, rather than starting from scratch.",
      correctAnswer: "True",
      explanation:
        "Meta-learning across HPO tasks builds a prior over good hyperparameter configurations. For a new task, this prior warm-starts the search, finding good configurations faster than cold-start methods like random search or Bayesian optimisation from scratch.",
      hints: [
        "If a learning rate of 3e-4 works well for many similar tasks, it\'s a good starting point for a new similar task.",
        "Warm-starting is the opposite of cold-starting — you begin from an informed prior, not ignorance.",
      ],
    },
    {
      id: "q-meta-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DARTS (Differentiable Architecture Search) reformulates NAS to be differentiable by:",
      options: [
        "Training thousands of architectures in parallel on separate GPUs",
        "Relaxing the discrete architecture search space to a continuous one using a weighted mixture of operations, jointly optimising architecture weights and model weights via gradient descent",
        "Using a meta-learned predictor to score architectures without training them",
        "Applying evolutionary mutations to the best-performing architecture found so far",
      ],
      correctAnswer: 1,
      explanation:
        "DARTS uses a continuous relaxation where each operation in the architecture is a weighted softmax mixture of candidate operations. Gradient descent jointly optimises the architecture mixing weights (via the validation loss) and model weights (via the training loss) in a bilevel optimisation.",
      hints: [
        "Discrete search spaces are not differentiable — DARTS makes them continuous with a softmax mixture.",
        "Think about gradient descent: it requires a continuous, differentiable objective — DARTS constructs one over the architecture.",
      ],
    },
  ],

  "multi-task-meta": [
    {
      id: "q-meta-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key difference between multi-task learning (MTL) and meta-learning?",
      options: [
        "MTL uses larger datasets; meta-learning uses smaller datasets",
        "MTL learns shared representations to perform well on a fixed set of training tasks; meta-learning aims to learn an adaptation mechanism that generalises to novel tasks at test time — MTL\'s tasks are fixed, meta-learning\'s meta-test tasks are novel",
        "MTL trains separate models for each task; meta-learning trains one model for all tasks",
        "MTL requires labelled data for all tasks; meta-learning requires unlabelled data",
      ],
      correctAnswer: 1,
      explanation:
        'MTL optimises E_T[L_T(h)] for a known fixed set of tasks, learning shared representations that benefit all tasks simultaneously. Meta-learning optimises the ability to adapt to new tasks from p(T) — the meta-test tasks are disjoint from meta-training tasks. MTL can be seen as the "outer loop only" of meta-learning.',
      hints: [
        "MTL\'s test condition is the same as its training condition (same fixed tasks); meta-learning\'s test condition (new tasks) is different.",
        "If a method works well on training tasks but fails on new tasks, it is doing MTL but not meta-learning.",
      ],
    },
    {
      id: "q-meta-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Multi-task pre-training (training a single model on many tasks jointly before fine-tuning) can serve as a strong alternative to explicit episodic meta-learning for few-shot generalisation.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "T5 (Raffel et al., 2020) and similar multi-task pre-trained models show strong few-shot transfer without episodic meta-training, because training on diverse tasks implicitly develops an inductive bias for task adaptation. The distinction between multi-task pre-training and meta-learning blurs at scale.",
      hints: [
        "Multi-task pre-training on diverse tasks creates representations that transfer broadly.",
        'The boundary between "MTL" and "meta-learning" is not sharp when training on a very diverse task set.',
      ],
    },
    {
      id: "q-meta-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In MAML applied to a multi-task setting with N tasks, the outer-loop gradient is: \\nabla_\\theta \\Sigmaᵢ L_{T_i}(f_{\\theta'_i}). What challenge arises when the tasks are very diverse (e.g., mixing visual and language tasks)?",
      options: [
        "The sum of gradients always cancels out to zero when tasks are diverse",
        'Different task loss gradients may point in conflicting directions in parameter space, making the meta-gradient a compromise that fails to find an initialization that adapts well to all tasks — the "gradient conflict" problem',
        "Diverse tasks require different inner-loop step counts, which MAML cannot accommodate",
        "The second-order Hessian terms become infinite for cross-modal tasks",
      ],
      correctAnswer: 1,
      explanation:
        "When task gradients are negatively correlated (point in opposite directions), naively averaging them produces a gradient that is suboptimal for all tasks. Methods like PCGrad (gradient surgery) or CAGrad project conflicting gradients to reduce interference, and multi-head architectures with task-specific components help prevent destructive interference in multi-task meta-learning.",
      hints: [
        "Gradient conflicts occur when improving performance on one task harms another — a fundamental MTL challenge.",
        "Methods like PCGrad detect conflicting gradients and project them to avoid interference.",
      ],
    },
  ],

  "dataset-meta": [
    {
      id: "q-meta-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Meta-Dataset (Triantafillou et al.) was introduced to address what limitation of prior few-shot benchmarks like miniImageNet?",
      options: [
        "Prior benchmarks had too few images per class for accurate evaluation",
        "Prior benchmarks used only one source domain (e.g., natural images), hiding cross-domain generalisation failures and using fixed N-way K-shot settings that do not reflect real-world variation",
        "Prior benchmarks did not support 5-way classification",
        "Prior benchmarks required too much compute to evaluate",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-Dataset aggregates 10 diverse image datasets (ImageNet, Aircraft, CUB, Textures, QuickDraw, etc.) into a unified evaluation that tests few-shot generalisation across domains with variable-way variable-shot episodes — revealing that methods tuned on miniImageNet often fail badly on cross-domain episodes.",
      hints: [
        "Think about what makes a benchmark realistic: diversity of domains or depth within one domain.",
        "Meta-Dataset\'s contribution is breadth — many different types of visual tasks in one evaluation.",
      ],
    },
    {
      id: "q-meta-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In the Meta-Dataset benchmark, test episodes use variable-way variable-shot settings (the number of classes and examples per class vary), unlike miniImageNet which always uses fixed 5-way 1-shot or 5-shot episodes.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Meta-Dataset episodes randomly sample the number of ways (5–50) and the number of support examples per class (1–20) from each dataset, creating a more realistic and challenging evaluation that tests robustness to varying episode structure, not just performance at a fixed N-way K-shot setting.",
      hints: [
        "Real-world few-shot problems don\'t come with a fixed N-way K-shot structure.",
        "Variable episodes test whether methods are robust to varying amounts of support information.",
      ],
    },
    {
      id: "q-meta-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key finding from Meta-Dataset evaluation was that methods strongly tuned for miniImageNet often fail on cross-domain episodes. What does this reveal about the field?",
      options: [
        "miniImageNet is the wrong benchmark and should be replaced by CIFAR-10",
        "Metric-based and gradient-based meta-learning methods can overfit to the specific statistical properties of one domain, and strong pre-trained backbones often outperform specialized meta-learning algorithms on cross-domain evaluation",
        "Cross-domain evaluation is always easier than within-domain evaluation",
        "The feature extractor architecture is irrelevant for cross-domain few-shot performance",
      ],
      correctAnswer: 1,
      explanation:
        'Triantafillou et al. and subsequent work (e.g., Bateni et al., Requeima et al.) found that strong pre-trained universal features often outperform dedicated meta-learning algorithms on Meta-Dataset, especially for cross-domain episodes. This reinforces the "feature reuse" hypothesis and motivates large-scale pre-training as a foundation for few-shot learning.',
      hints: [
        "Overfitting to one benchmark domain is analogous to overfitting to one training dataset.",
        "If features are general enough, nearest-centroid classification works across many domains.",
      ],
    },
  ],

  "generalization-meta": [
    {
      id: "q-meta-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Generalisation bounds for meta-learning (e.g., Baxter 2000) bound the gap between meta-training performance and expected performance on novel tasks. This gap depends on:",
      options: [
        "Only the number of training examples per task (K in K-shot)",
        "The number of meta-training tasks (n), the number of examples per task (m), and the complexity of the hypothesis class used for task-specific adaptation",
        "Only the meta-learner\'s model size in parameters",
        "The inner-loop learning rate \\alpha and the outer-loop learning rate \\beta",
      ],
      correctAnswer: 1,
      explanation:
        "Baxter (2000) showed that the meta-generalisation error bound has two terms: (1) within-task generalisation (depends on m, examples per task) and (2) task-level generalisation (depends on n, number of tasks). More diverse tasks and more examples per task both tighten the bound. The hypothesis class complexity for task adaptation (H) also appears, analogous to VC dimension in standard learning theory.",
      hints: [
        'Think about what "meta-test performance" means and what controls how well meta-training predicts it.',
        "The bound has terms for both task-level and sample-level generalisation — two separate quantities to control.",
      ],
    },
    {
      id: "q-meta-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The PAC-Bayes framework has been applied to derive generalisation bounds for gradient-based meta-learning by treating the meta-initialisation as a prior p(\\theta) and the adapted parameters \\theta'_i as drawn from a posterior — bounding performance by KL(posterior || prior).",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "PAC-Bayes bounds for meta-learning (Amit & Meir 2018) treat the meta-initialisation as a prior p(\\theta) and the task-adapted distribution q(\\theta'|S_i) as a posterior. The bound is: E_T[L_T(\\theta')] ≤ E_T[L_S(\\theta')] + sqrt[(KL(q||p) + log(n/\\delta)) / (2n)], connecting meta-generalisation to the information-theoretic distance between initialization and adapted parameters.",
      hints: [
        "PAC-Bayes: the generalisation gap is bounded by KL(posterior || prior) — how far you moved from the initialization.",
        "A tight initialization (small KL) means the meta-learned prior is close to optimal for each task.",
      ],
    },
    {
      id: "q-meta-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What does the "task complexity" parameter in meta-learning generalisation bounds capture, and what architectural choice does it motivate?',
      options: [
        "The computational cost of running the meta-learner\'s inner loop",
        "The richness of the task-specific hypothesis class (how many parameters can be adapted in the inner loop) — larger adaptation expressivity leads to larger complexity term and potentially worse meta-generalisation, motivating adapter-based or head-only adaptation (like ANIL) over full-network adaptation",
        "The number of gradient steps used in the inner loop",
        "The diversity of the meta-training task distribution",
      ],
      correctAnswer: 1,
      explanation:
        "More expressive task-specific adaptation (e.g., adapting all parameters vs. only the head) increases hypothesis class complexity and can hurt meta-generalisation when n (number of tasks) is small. This explains why ANIL (head-only adaptation) or adapter-based methods can generalise better than full MAML when training tasks are few — their smaller task complexity leads to tighter generalisation bounds.",
      hints: [
        "More expressive adaptation = more complex hypothesis class = bound tightens only with more tasks.",
        "ANIL adapts only the head — its task-specific hypothesis class complexity is much smaller than full MAML.",
      ],
    },
  ],

  "efficient-meta": [
    {
      id: "q-meta-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary bottleneck that makes vanilla MAML computationally expensive to scale?",
      options: [
        "The number of classes in the support set",
        "Computing second-order gradients (Hessians) during the meta-gradient update through the inner-loop steps",
        "The size of the query set used in the outer loop",
        "The number of meta-test tasks used for evaluation",
      ],
      correctAnswer: 1,
      explanation:
        "Vanilla MAML requires differentiating through inner-loop gradient steps, resulting in Hessian-vector products that are O(P²) in memory/compute with model parameters P — the primary motivation for first-order approximations.",
      hints: [
        "First-order approximations like FOMAML exist specifically because second-order computation is the bottleneck.",
        "Hessian computation scales quadratically with parameter count.",
      ],
    },
    {
      id: "q-meta-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Efficient meta-learning can be achieved by reducing the number of meta-training tasks required, such as through data augmentation strategies that synthesise additional task diversity.",
      correctAnswer: "True",
      explanation:
        "Task augmentation (e.g., label permutation, mixing feature spaces, generating synthetic tasks) increases the effective meta-training task distribution without collecting new labelled data, improving meta-learner generalisation efficiency.",
      hints: [
        "Think about how rotating images creates new classification tasks from existing ones.",
        "Task augmentation creates more training tasks.",
      ],
    },
    {
      id: "q-meta-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Linear probing on frozen pre-trained features is often considered an "efficient meta-learning baseline." Why is this efficient in both computation and data?',
      options: [
        "Linear probes use fewer parameters than the pre-trained backbone, reducing inference cost",
        "Fitting a linear classifier on frozen features requires only a small support set and a single matrix inversion or few gradient steps — much cheaper than full meta-learning while often competitive in accuracy",
        "Pre-trained features are already task-specific, eliminating the need for any adaptation",
        "Linear probes avoid the vanishing gradient problem that affects deep fine-tuning",
      ],
      correctAnswer: 1,
      explanation:
        "A linear classifier on fixed features has a closed-form solution (ridge regression, logistic regression) that requires very few operations and support examples, making it a computationally trivial but often surprisingly strong few-shot baseline.",
      hints: [
        "Think about what you need to fit a linear classifier: a matrix inversion or a few gradient steps on a convex objective.",
        "If the features are already rich, adapting only the linear head is cheap and often sufficient.",
      ],
    },
  ],

  "foundation-meta": [
    {
      id: "q-meta-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In what sense can GPT-3 be considered a "meta-learner"?',
      options: [
        "GPT-3 was explicitly trained with MAML on a distribution of NLP tasks",
        "GPT-3's pre-training on diverse data enables it to adapt to new tasks via in-context learning without gradient updates — a form of meta-learning at inference time where the model uses the prompt context as a task description",
        "GPT-3 stores all training examples in an external memory that it retrieves at inference time",
        "GPT-3 uses a recurrent architecture that maintains task state across queries",
      ],
      correctAnswer: 1,
      explanation:
        'GPT-3 is a meta-learner in the sense that pre-training on diverse data implicitly trains an adaptation mechanism (in-context learning), allowing it to generalise to new tasks from a few prompt examples without any gradient updates — the hallmark of meta-learning. Brown et al. (2020) explicitly frame GPT-3\'s in-context learning as "few-shot meta-learning."',
      hints: [
        'Think about what "learning to learn" means for a language model: it learns how to use demonstrations to solve new tasks.',
        "No gradient updates happen in GPT-3 ICL — all adaptation is through the attention mechanism using the context.",
      ],
    },
    {
      id: "q-meta-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Foundation models pre-trained on diverse data can be viewed as implicitly learning a task prior that enables fast few-shot adaptation, analogous to the meta-learned prior in Bayesian meta-learning.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The diverse pre-training distribution shapes the model\'s inductive bias (prior) over tasks. When few-shot prompted, the model uses this prior to rapidly identify and solve the new task — a functional analogue to a Bayesian meta-learned prior. This connection was formalized by Xie et al. (2022) who showed ICL approximates Bayesian inference under a mixture-of-tasks data generating process.",
      hints: [
        "Bayesian meta-learning: learn a prior p(\\theta) from many tasks, update to posterior given support set.",
        "Foundation model ICL: pre-training builds an implicit prior; demonstrations update the implicit posterior.",
      ],
    },
    {
      id: "q-meta-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FLAN (Fine-tuned LAnguage Net, Wei et al., 2022) improves zero-shot generalisation of LLMs by:",
      options: [
        "Training with MAML-style episodic meta-learning across 1,800+ NLP task variants formatted as natural language instructions",
        "Increasing the model size to 540B parameters without changing the training objective",
        "Adding explicit external memory to store task definitions during inference",
        "Using contrastive learning between task descriptions and their corresponding examples",
      ],
      correctAnswer: 0,
      explanation:
        'FLAN instruction-tunes a frozen LLM on 1,800+ NLP tasks formatted as natural language instructions (e.g., "Translate to French: ..."; "Summarize: ..."). This can be seen as multi-task meta-learning: the model learns to follow task instructions and generalises zero-shot to unseen instruction-described tasks — significantly improving zero-shot performance over the base model.',
      hints: [
        "Instruction tuning = training on tasks described in natural language, hoping the pattern generalizes to new tasks.",
        "FLAN evaluates on task clusters held out during training — a direct meta-generalisation test.",
      ],
    },
  ],

  "robotics-meta": [
    {
      id: "q-meta-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why is meta-learning particularly valuable for robotic learning applications?",
      options: [
        "Robots have more compute than cloud servers, enabling longer meta-training",
        "Real-world robot interaction data is expensive and slow to collect, making fast adaptation from few real-world trials critical",
        "Robotic environments are fully simulated and infinite data is available",
        "Robotic learning requires more complex models than meta-learning can handle",
      ],
      correctAnswer: 1,
      explanation:
        "Physical robot trials are slow, expensive, and can damage hardware. Meta-learning aims to enable robots to adapt to new tasks (new objects, environments, dynamics) from only a handful of real-world trials, reducing data collection burden.",
      hints: [
        "Think about the cost of 10,000 robot arm manipulation trials vs. 10,000 ImageNet images.",
        "Fast adaptation from few trials is the core meta-learning promise — why is it especially valuable for robots?",
      ],
    },
    {
      id: "q-meta-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Sim-to-real transfer in robotics can be combined with meta-learning by meta-training on a distribution of simulated environments so the robot can adapt quickly to the real world with few real trials.",
      correctAnswer: "True",
      explanation:
        'Randomising simulation parameters (dynamics, friction, sensor noise) during meta-training forces the meta-learner to develop robust adaptation strategies. This "meta-sim" approach reduces the number of real-world trials needed for sim-to-real adaptation.',
      hints: [
        "Domain randomisation generates diverse simulated tasks — what does meta-learning do with that diversity?",
        "If the meta-learner can adapt across simulated environments, it may also adapt to the real environment quickly.",
      ],
    },
    {
      id: "q-meta-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MAML applied to robotic locomotion tasks (e.g., MuJoCo) meta-trains across variations in body morphology. What does this enable at meta-test time?",
      options: [
        "The robot can control any morphology with a single fixed policy without adaptation",
        "The robot can adapt its gait/policy to a new, unseen morphology variation (e.g., a damaged limb) in just a few real-world rollouts",
        "The meta-learned policy replaces the need for a physics simulator",
        "The robot learns to build its own morphology from raw materials",
      ],
      correctAnswer: 1,
      explanation:
        "By meta-training across morphology variations, MAML finds an initialisation from which a few gradient steps (using a handful of rollouts in the new morphology) yield a well-adapted locomotion policy — enabling fast recovery from damage or hardware changes.",
      hints: [
        'Meta-training on varied morphologies teaches "how to adapt to a new morphology" in the initialisation.',
        "At test time, a few real rollouts with the damaged/changed morphology provide the gradient signal for adaptation.",
      ],
    },
  ],

  "personalization-meta": [
    {
      id: "q-meta-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Personalisation in ML can be cast as a meta-learning problem by treating each user as:",
      options: [
        "A separate dataset to train a dedicated model from scratch",
        "A task: a few personal examples (support set) are used to rapidly adapt a shared meta-learned model to the individual user\'s preferences — the global model is the meta-learned initialisation, the user model is the adapted parameters",
        "A data augmentation source for improving the global model",
        "A validation set for measuring global model generalisation",
      ],
      correctAnswer: 1,
      explanation:
        "Each user\'s interaction history forms a \"support set\" for adapting a global meta-learned model to that user\'s personal preferences. MAML-based personalization (per FedMeta, pFedMe) learns an initialisation from which a few gradient steps yield a personalized model, enabling personalization with very few user-specific examples.",
      hints: [
        'MAML finds a good initialization for fast adaptation — the "task" here is each user\'s preference modeling.',
        "The global model encodes shared knowledge; the personalized model captures individual differences.",
      ],
    },
    {
      id: "q-meta-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Personalised federated learning (pFL) approaches like pFedMe cast personalization as a meta-learning problem where each client performs a few inner-loop adaptation steps to obtain a personalized model while the global model is optimized as the meta-initialisation.",
      correctAnswer: "True",
      explanation:
        "pFedMe formulates per-client personalization as MAML: the global model \\theta is the meta-initialization; each client solves argmin_\\theta_i L_i(\\theta_i) + (\\lambda/2)||\\theta_i − \\theta||² to get a personalized model \\theta_i close to but adapted from the global model. The global model is then updated based on the gradient toward each client\'s personalized model.",
      hints: [
        "The regularization term ||\\theta_i − \\theta||² keeps the personalized model close to the global initialization.",
        "This is analogous to MAML\'s inner loop with an L2 proximity constraint instead of a fixed number of gradient steps.",
      ],
    },
    {
      id: "q-meta-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why might meta-learned per-parameter learning rates in Meta-SGD be more effective than a global learning rate in MAML for few-shot regression tasks?",
      options: [
        "Per-parameter rates allow the model to skip updating parameters that are already near-optimal for the task distribution",
        "Different parameters may need vastly different update magnitudes for efficient task adaptation — some features are shared across tasks while others are task-specific",
        "Global learning rates cause gradient explosion when the inner loop runs for more than 5 steps",
        "Per-parameter rates reduce the number of inner-loop steps needed from 5 to 1",
      ],
      correctAnswer: 1,
      explanation:
        "In few-shot settings, some parameters encode shared representations (low learning rate optimal) while others are task-specific heads (high learning rate optimal). Per-parameter rates let the meta-learner implicitly discover and exploit this structure.",
      hints: [
        "Think about which layers in a neural network are task-specific vs. generally useful across tasks.",
        "A backbone feature extractor might need small updates; a task-specific head might need large ones.",
      ],
    },
  ],

  "meta-learning-practice": [
    {
      id: "q-meta-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Meta-learning is most appropriate to use when:",
      options: [
        "Large quantities of labelled data are available for the target task",
        "You face many related tasks with very few labelled examples per task, and task diversity is sufficient to meta-train on",
        "You need to train a single model on a single large-scale dataset",
        "Computational resources are limited and you cannot afford episodic training",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-learning shines when labelled data per task is scarce but many related tasks exist for meta-training. It is less useful when abundant labelled data is available (standard supervised learning suffices) or when tasks are too dissimilar (cross-domain generalisation breaks down).",
      hints: [
        "Think about the two requirements: few examples per task AND enough task diversity to meta-train.",
        "If you have abundant data for the target task, do you need fast adaptation?",
      ],
    },
    {
      id: "q-meta-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Before applying meta-learning, a practitioner should consider whether strong pre-training baselines (e.g., a large pre-trained backbone with a linear probe) already solve the few-shot problem, since they are simpler and often competitive.",
      correctAnswer: "True",
      explanation:
        'Multiple studies (e.g., Tian et al. 2020 "Rethinking Few-Shot Image Classification," Chen et al. 2019 "Closer Look") show that well-pretrained backbones with simple fine-tuning often match or exceed complex meta-learning methods. Checking this baseline avoids unnecessary algorithmic complexity and is good engineering practice.',
      hints: [
        'The Meta-Dataset and several "rethinking" papers showed this empirically.',
        "Engineering principle: start with the simplest solution that could work before adding complexity.",
      ],
    },
    {
      id: "q-meta-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In practice, what are the most important hyperparameters for MAML-based meta-learning and what values did Finn et al. (2017) report for the miniImageNet 5-way 1-shot setting?",
      options: [
        "Embedding dimension and dropout rate; Finn et al. used dim=64, dropout=0.5",
        "Inner-loop learning rate \\alpha, number of inner-loop steps, outer-loop learning rate \\beta, and task batch size; Finn et al. used \\alpha=0.01, 1 inner step, \\beta=0.001 with Adam, 5 tasks per batch",
        "Batch normalization momentum and weight decay; Finn et al. used momentum=0.9, weight decay=1e-4",
        "Temperature parameter \\tau and projection head dimension; Finn et al. used \\tau=0.1, dim=128",
      ],
      correctAnswer: 1,
      explanation:
        "Key MAML hyperparameters are: \\alpha (inner-loop step size, usually 0.01–0.1 for few-shot classification), the number of inner-loop gradient steps (1 in the original paper, more steps at test time), \\beta (outer-loop/meta learning rate, typically 0.001 with Adam), and the number of tasks per outer-loop batch. Finn et al. 2017 used these settings to achieve ~48.70% on 5-way 1-shot miniImageNet.",
      hints: [
        "\\alpha and \\beta serve different purposes: \\alpha is fixed during training and controls inner-loop adaptation; \\beta is the meta-optimizer step size.",
        "More inner-loop steps generally improve test performance but are not used during meta-training (1 step is typical).",
      ],
    },
  ],

  "few-shot-generative": [
    {
      id: "q-meta-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which approach does DALL-E 3 / Imagen-style models use that resembles few-shot generalization?",
      options: [
        "K-nearest neighbor retrieval from the training set",
        "Conditioning on textual descriptions that encode novel concept combinations not seen during training",
        "Fine-tuning on a handful of in-context image-label pairs",
        "Prototypical network style embedding of seed images",
      ],
      correctAnswer: 1,
      explanation:
        "Large text-to-image models generalize to novel concept combinations by conditioning on text prompts at inference time. The textual conditioning space is rich enough that combinations of concepts unseen during training can still produce coherent outputs — a form of compositional few-shot generalization.",
    },
    {
      id: "q-meta-kp31-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'Generative models trained with meta-learning objectives (e.g., "generate images of unseen categories given one example") can learn to perform visual imagination for truly novel categories.',
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Work such as Lake et al.'s Omniglot few-shot generation and more recent approaches (e.g., LAFITE, Parti) show that meta-training generative models on episode-structured tasks enables generation of novel categories from one or a few examples, demonstrating learned inductive biases for imagination.",
    },
    {
      id: "q-meta-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main challenge of applying meta-learning to few-shot image generation (as opposed to few-shot classification)?",
      options: [
        "The lack of suitable datasets; there are no few-shot generation benchmarks",
        "Evaluating generation quality is fundamentally harder than evaluating classification accuracy, and the loss landscape is more complex for generative models",
        "Generative models cannot be meta-trained because they have no task-specific parameters",
        "Few-shot generation is always solved by retrieval, making meta-learning unnecessary",
      ],
      correctAnswer: 1,
      explanation:
        "Evaluating few-shot generation requires perceptual quality metrics (FID, IS, LPIPS) plus semantic fidelity to the conditioning examples, which is harder than measuring top-1 accuracy. Additionally, generative model loss landscapes (VAEs, GANs, diffusion) are more complex, making meta-optimization more challenging than in discriminative settings.",
    },
  ],
  "meta-learning-theory": [
    {
      id: "q-meta-kp32-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In PAC-Bayes meta-learning theory, what does the "meta-prior" represent?',
      options: [
        "A prior over model architectures chosen by the practitioner",
        "A distribution over task-specific hypotheses learned from the meta-training task distribution",
        "The uniform distribution over all possible tasks",
        "A Gaussian prior placed on the weights of the inner-loop optimizer",
      ],
      correctAnswer: 1,
      explanation:
        "PAC-Bayes bounds for meta-learning (e.g., Amit & Meir 2018) decompose generalization error into a meta-level term (how well the meta-prior fits the task distribution) and a task-level term (how well the task-specific posterior adapts from the meta-prior). The meta-prior is learned from meta-training tasks and encodes shared structure across tasks.",
    },
    {
      id: "q-meta-kp32-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "Theoretical analyses of MAML show that the number of inner-loop gradient steps directly controls the task-complexity tradeoff: more steps increase expressivity but worsen meta-generalization bounds.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Theoretical work (e.g., Fallah et al. 2020, Khodak et al. 2019) shows that more inner-loop steps increase the hypothesis class complexity, which can improve task-specific performance but expands the effective capacity enough to weaken meta-generalization bounds. This mirrors the bias-variance tradeoff in standard learning theory.",
    },
    {
      id: "q-meta-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What does "task diversity" formally mean in the context of meta-learning sample complexity bounds?',
      options: [
        "The number of distinct classes across all meta-training tasks",
        "A measure of how well the meta-training task distribution covers the meta-test task distribution, often quantified via coverage or KL divergence between task distributions",
        "The standard deviation of the number of examples per task",
        "The entropy of the label distribution within a single task",
      ],
      correctAnswer: 1,
      explanation:
        "In theoretical meta-learning frameworks (e.g., Baxter 2000, Ben-David & Schuller 2003), task diversity is formally captured by the divergence between the training and test task distributions. Higher diversity means meta-training tasks are more representative of test tasks, leading to tighter generalization bounds and better empirical performance.",
    },
  ],
  "siamese-networks": [
    {
      id: "q-meta-kp33-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of a Siamese network in few-shot learning?",
      options: [
        "To classify images using a single forward pass through two separate classifiers",
        "To learn a similarity function by processing two inputs through shared-weight sub-networks and comparing their embeddings",
        "To generate synthetic training examples for rare classes",
        "To apply data augmentation symmetrically to pairs of images",
      ],
      correctAnswer: 1,
      explanation:
        "Siamese networks (Koch et al. 2015) consist of two identical sub-networks with tied weights. Given a pair of inputs, each passes through the network to produce an embedding; a distance metric (e.g., L1 or L2) on the embeddings determines if the inputs are from the same class. This allows the network to learn a generalizable similarity function.",
    },
    {
      id: "q-meta-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Siamese networks and Matching Networks both use contrastive or pair-based training and produce identical outputs at inference time.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "While both learn similarity-based representations, they differ at inference time. Siamese networks compare a query to each support example independently using a learned distance. Matching Networks use attention over the full support set, producing a weighted combination of support labels — incorporating set-level context that Siamese networks ignore.",
    },
    {
      id: "q-meta-kp33-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which loss function is most commonly used to train Siamese networks for verification tasks?",
      options: [
        "Cross-entropy loss on predicted class probabilities",
        "Contrastive loss (Hadsell et al. 2006), which minimizes distance for same-class pairs and maximizes distance (up to a margin) for different-class pairs",
        "Mean squared error between the two embedding vectors",
        "Triplet loss with hard negative mining",
      ],
      correctAnswer: 1,
      explanation:
        "Contrastive loss directly shapes the embedding space: same-class pairs are pulled together, different-class pairs are pushed apart beyond a margin m. This is the classical choice for Siamese network training. Triplet loss is also popular but requires triplet sampling rather than pair sampling, and was popularized later (FaceNet, 2015).",
    },
  ],
  "graph-meta-learning": [
    {
      id: "q-meta-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How do Graph Neural Networks (GNNs) improve few-shot learning over standard metric-learning approaches?",
      options: [
        "GNNs replace the backbone CNN with a graph convolutional backbone, reducing parameters",
        "GNNs model relationships between support examples and queries as a graph, enabling message passing to propagate label information across the support set",
        "GNNs eliminate the need for an embedding function by directly operating on pixel adjacency graphs",
        "GNNs use graph structure to perform automatic data augmentation",
      ],
      correctAnswer: 1,
      explanation:
        'Methods like Kim et al. (2019) "Edge-Labeling GNN" and Garcia & Bruna (2018) represent support examples and query items as nodes in a graph, with edges encoding similarities. Message passing propagates label information from labeled support nodes to unlabeled query nodes, enabling richer interaction than independent pairwise comparison in standard metric learning.',
    },
    {
      id: "q-meta-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Meta-learning on graph-structured data (e.g., molecular property prediction) is more challenging than on image data partly because task-specific graph structures vary in size and topology.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Unlike images which have fixed grid structure, molecular graphs vary in node count, edge count, and topology across tasks. Standard episodic meta-training assumes consistent input dimensionality, so graph meta-learning must handle variable-size inputs, often via graph-level pooling or size-invariant GNN architectures.",
    },
    {
      id: "q-meta-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the context of few-shot molecular property prediction, what is a key advantage of MAML-based approaches over traditional fingerprint-based ML?",
      options: [
        "MAML requires fewer atoms per molecule to function correctly",
        "MAML can meta-learn a shared molecular representation that rapidly adapts to new property prediction tasks with very few labeled molecules",
        "MAML automatically discovers chemical reaction pathways via inner-loop optimization",
        "MAML eliminates the need for molecular featurization entirely",
      ],
      correctAnswer: 1,
      explanation:
        'Work such as Altae-Tran et al. (2017) "Low Data Drug Discovery" showed that MAML can meta-learn a molecular embedding that adapts quickly to new property prediction tasks (e.g., predicting a new biological activity) from just a handful of labeled molecules, outperforming traditional fingerprint-based approaches in the low-data regime.',
    },
  ],
  "hypernetworks-meta": [
    {
      id: "q-meta-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is a hypernetwork in the context of meta-learning?",
      options: [
        "A very large neural network trained on many tasks simultaneously",
        "A network that generates the weights (or weight updates) of a task-specific network conditioned on task information",
        "A network that operates on a hypergraph of task relationships",
        "An ensemble of networks where each network handles a specific difficulty level",
      ],
      correctAnswer: 1,
      explanation:
        "A hypernetwork (Ha et al. 2016) is a network that outputs the weights of another network. In meta-learning, the hypernetwork is conditioned on task-specific information (e.g., a task embedding or support set) and generates parameters for the base network, enabling rapid task adaptation without explicit gradient-based inner-loop optimization.",
    },
    {
      id: "q-meta-kp35-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Hypernetwork-based meta-learning methods are generally faster at test-time adaptation than MAML because they replace iterative gradient steps with a single forward pass through the hypernetwork.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "MAML requires K gradient steps (inner loop) at test time, which has computational cost proportional to K. Hypernetwork approaches (e.g., CNAPs, VERSA) generate task-specific parameters in a single forward pass, making test-time adaptation significantly faster — at the cost of reduced expressivity compared to iterative optimization.",
    },
    {
      id: "q-meta-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CNAPs (Conditional Neural Adaptive Processes) use a hypernetwork-style approach for few-shot classification. What is the key architectural choice that distinguishes CNAPs from standard hypernetworks?",
      options: [
        "CNAPs use convolutional hypernetworks while standard hypernetworks are fully connected",
        "CNAPs condition the feature extractor (not just the classifier head) using task-specific FiLM layers generated by an amortized inference network over the support set",
        "CNAPs train a separate hypernetwork per task rather than a shared one",
        "CNAPs replace all weight generation with learned task embeddings added to frozen base weights",
      ],
      correctAnswer: 1,
      explanation:
        "CNAPs (Requeima et al. 2019) use Feature-wise Linear Modulation (FiLM) to adapt the backbone feature extractor, not just the classifier. An inference network processes the support set to generate task-specific \\gamma and \\beta parameters for each FiLM layer. This is more expressive than adapting only the final classification head.",
    },
  ],
  "self-supervised-meta": [
    {
      id: "q-meta-kp36-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does self-supervised pre-training complement meta-learning for few-shot image classification?",
      options: [
        "Self-supervised training directly optimizes for few-shot accuracy, making meta-training redundant",
        "Self-supervised pre-training learns rich generic representations without labels, which then serve as a strong initialization for meta-learning or direct few-shot fine-tuning",
        "Self-supervised training is used only for data augmentation policy search in meta-learning",
        "Self-supervised objectives replace the meta-test phase evaluation entirely",
      ],
      correctAnswer: 1,
      explanation:
        'Work such as Chen et al. (2020) "Big Self-Supervised Models" and Su et al. (2020) showed that strong self-supervised representations (SimCLR, MoCo) transfer very well to few-shot classification tasks, sometimes matching or exceeding episodic meta-learning. Self-supervised pre-training provides label-efficient representation learning that bootstraps meta-learners.',
    },
    {
      id: "q-meta-kp36-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ANIL (Almost No Inner Loop) demonstrated that most of the benefit in MAML comes from adapting the body (feature extractor) rather than just the head (classifier).",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "ANIL (Raghu et al. 2020) showed the opposite: nearly all of MAML\'s benefit comes from the rapid learning of the head (final linear classifier), not the feature extractor body. The body features can be frozen after pre-training with minimal performance loss, suggesting that the inner loop is primarily serving as a head-adaptation mechanism.",
    },
    {
      id: "q-meta-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the "feature reuse" hypothesis in meta-learning, and what empirical finding supports it?',
      options: [
        "Meta-learners share feature extractors across tasks; supported by finding that removing task-specific layers hurts performance",
        "MAML learns representations that are already well-suited for new tasks with minimal adaptation; supported by finding that inner-loop updates primarily change the head while body representations change very little",
        "Metric-learning methods reuse training-set features at test time via nearest neighbor lookup; supported by retrieval-based accuracy matching episodic methods",
        "Self-supervised pre-training reuses features across both supervised and unsupervised tasks; supported by linear probing accuracy",
      ],
      correctAnswer: 1,
      explanation:
        "The feature reuse hypothesis (Raghu et al. 2020, ANIL paper) states that MAML\'s meta-learned initialization already contains reusable features. Evidence: tracking gradient magnitudes and representation changes during inner-loop adaptation shows that body layer representations change minimally while the head adapts significantly — supporting the view that the body is reusing meta-learned features.",
    },
  ],
  "meta-sgd-reptile": [
    {
      id: "q-meta-kp37-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What does Meta-SGD learn in addition to the initial parameters compared to MAML?",
      options: [
        "The architecture of the inner-loop network",
        "Per-parameter inner-loop learning rates and update directions (effectively a learned preconditioning matrix)",
        "The number of inner-loop steps for each task",
        "A task encoder that maps support sets to task embeddings",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-SGD (Li et al. 2017) learns both the initial parameters \\theta AND per-parameter learning rate vectors \\alpha (same shape as \\theta). The inner-loop update becomes:\n$$\\theta' = \\theta + \\alpha \\odot \\nabla_\\theta\\mathcal{L},$$\nwhere ⊙ denotes elementwise multiplication. This allows the meta-learner to set task-adaptive learning rate magnitudes and signs for each parameter — effectively learning a preconditioning matrix $M = \\text{diag}(\\alpha)$ that scales the gradient differently per parameter. The meta-objective becomes:\n$$\\min_{\\theta, \\alpha} \\sum_i \\mathcal{L}_{T_i}^\\text{query}(f_{\\theta + \\alpha \\odot \\nabla_\\theta\\mathcal{L}_{T_i}^\\text{support}}),$$\nwhich is optimized jointly over both the initialization \\theta and the per-parameter learning rates \\alpha.",
      hints: [
        "MAML uses a scalar \\alpha for all parameters; Meta-SGD uses a vector \\alpha with the same shape as \\theta.",
        "Elementwise multiplication (⊙) applies a different scaling to each gradient component: \\theta'_j = \\theta_j + \\alpha_j · (\\nablaL)_j.",
        "The sign of \\alpha_j can be negative, allowing the meta-learner to reverse the gradient direction for specific parameters.",
      ],
    },
    {
      id: "q-meta-kp37-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Reptile can be interpreted as a first-order approximation to MAML that avoids computing second-order derivatives.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Reptile (Nichol et al. 2018) updates the meta-parameters by moving them towards the final parameters obtained after K inner-loop SGD steps on each task:\n$$\\theta \\leftarrow \\theta + \\varepsilon(\\phi_i - \\theta), \\quad \\text{where } \\phi_i = \\text{SGD}^K(\\theta, \\mathcal{D}_i^\\text{support}).$$\nNichol et al. showed analytically that Reptile's update direction approximates the MAML gradient while ignoring the second-order terms, making it computationally cheaper and simpler to implement. The connection: the MAML gradient is $\\mathbb{E}_i[\\nabla_\\theta\\mathcal{L}_{T_i}(f_{\\theta'_i})]$, while Reptile's gradient is $\\mathbb{E}_i[\\theta'_i - \\theta]$. For $K=1$, these are equivalent; for $K > 1$, Reptile still approximates MAML's goal of finding an initialization close to all task optima.",
      hints: [
        "The MAML gradient is $\\mathbb{E}_i[\\nabla_{\\theta}\\mathcal{L}_{T_i}(f_{\\theta'_i})] \\cdot (I - \\alpha\\nabla^2\\mathcal{L})$ — it requires second-order derivatives.",
        "Reptile's gradient $\\mathbb{E}_i[\\theta'_i - \\theta]$ can be computed without any second-order derivatives — just the difference between adapted and original parameters.",
        "For K=1, $\\theta'_i = \\theta - \\alpha\\nabla\\mathcal{L}$, so $\\theta'_i - \\theta = -\\alpha\\nabla\\mathcal{L}$, equivalent to FOMAML.",
      ],
    },
    {
      id: "q-meta-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Reptile\'s update rule is: \\theta ← \\theta + \\epsilon(\\phi_i − \\theta) where \\phi_i are the post-inner-loop parameters for task i. What does this geometrically represent?",
      options: [
        "A projection of \\theta onto the feasible set of task-optimal parameters",
        "A step towards the centroid of task-optimal parameter solutions, which MAML theory shows corresponds to an initialization that is close to many task optima simultaneously",
        "A Newton step along the natural gradient of the meta-loss",
        "A mixture of the current parameters and a task-specific variational posterior",
      ],
      correctAnswer: 1,
      explanation:
        'Reptile moves the meta-parameters towards the task-specific optimal parameters \\phi_i obtained after inner-loop adaptation. Averaged over tasks, this moves \\theta towards the "average optimal solution" across tasks — a point from which all task optima are reachable with few gradient steps. MAML theory shows this is equivalent to finding an initialization close to all task manifolds.\n\nGeometrically, the Reptile update \\theta ← \\theta + \\epsilon(\\phi_i − \\theta) interpolates between the current initialization \\theta and the task-adapted parameters \\phi_i. Averaged over N tasks: \\theta_new = \\theta + (\\epsilon/N)\\Sigma_i(\\phi_i − \\theta) = (1 − \\epsilon)\\theta + (\\epsilon/N)\\Sigma_i\\phi_i. This is a weighted average of \\theta and the task optima \\phi_i, pulling \\theta toward their centroid. MAML\'s theory shows that an initialization near all task manifolds enables few-shot adaptation because the distance to any task optimum is small from such a point.',
      hints: [
        "The Reptile update is \\theta_new = (1 − \\epsilon)\\theta + \\epsilon · (1/N)\\Sigma_i\\phi_i — a convex combination of the current \\theta and the task-optimal parameters.",
        "Think of \\phi_i as the \"task-specific solution\" after adaptation. Reptile averages these solutions and moves \\theta toward their centroid.",
        "The goal is an initialization from which any task optimum is reachable in a few gradient steps — minimizing the maximum distance to any task manifold.",
      ],
    },
  ],
  "task-augmentation": [
    {
      id: "q-meta-kp38-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'What is "task augmentation" in meta-learning, and why is it useful?',
      options: [
        "Augmenting the support set images with standard transformations (flips, crops) to increase sample count",
        "Generating additional meta-training tasks from existing data (e.g., by mixing classes, varying N and K) to increase task diversity and reduce meta-overfitting",
        "Fine-tuning the meta-learner on augmented queries at test time",
        "Using a teacher-student distillation framework where the teacher provides augmented task labels",
      ],
      correctAnswer: 1,
      explanation:
        'Task augmentation creates new training tasks without additional data collection. Techniques include: randomly sampling different N-way K-shot configurations, using data mixup across class pairs, generating "virtual classes" via feature space interpolation, or adding self-supervised auxiliary tasks. This combats meta-overfitting when few meta-training tasks are available.',
    },
    {
      id: "q-meta-kp38-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Mixing support examples from different classes (cross-class feature interpolation) during meta-training is a valid form of task augmentation that improves few-shot performance.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Methods like FEAT-aug and mixup-based task augmentation create virtual classes by interpolating feature vectors across classes, then train on these synthetic N-way tasks. This has been shown to improve generalization to novel classes by exposing the meta-learner to a broader distribution of task structures during training.",
    },
    {
      id: "q-meta-kp38-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What problem does "meta-dataset curriculum" address in task augmentation?',
      options: [
        "The computational cost of sampling too many tasks per batch",
        "The fact that not all tasks are equally informative: easy tasks contribute little signal while overly hard tasks destabilize training; curriculum scheduling samples tasks of increasing difficulty",
        "The mismatch between meta-training and meta-test class distributions in cross-domain settings",
        "The lack of a principled stopping criterion for meta-training",
      ],
      correctAnswer: 1,
      explanation:
        "Task curriculum learning for meta-learning (e.g., Graves et al. style adapted to episodes) addresses the information content of training tasks. Initially training on easier tasks (more shots, fewer ways, intra-class similar examples) and gradually increasing difficulty stabilizes early training and improves final performance — analogous to curriculum learning in standard supervised learning.",
    },
  ],
  "meta-learning-nlp": [
    {
      id: "q-meta-kp39-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'How does GPT-3\'s "in-context learning" relate to meta-learning?',
      options: [
        "GPT-3 was explicitly meta-trained on N-way K-shot NLP episode tasks",
        "In-context learning can be viewed as implicit meta-learning: the model has learned during pre-training to infer task structure from examples in the context window, effectively performing inference-time adaptation without weight updates",
        "In-context learning uses MAML-style gradient steps hidden inside the transformer\'s forward pass",
        "GPT-3 fine-tunes on the provided in-context examples via LoRA before generating the output",
      ],
      correctAnswer: 1,
      explanation:
        'Brown et al. (2020) and subsequent theoretical work (e.g., Akyürek et al. 2022, Von Oswald et al. 2023) interpret ICL as a form of implicit meta-learning. During pre-training, the model encounters many sequences that are structured as implicit tasks, learning to do in-context Bayesian inference. At test time, the prompt acts as a "support set" and the model adapts its predictions without any weight updates.',
    },
    {
      id: "q-meta-kp39-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "MAML has been directly applied to NLP few-shot tasks like text classification and relation extraction, yielding improvements over standard fine-tuning in very-low-data regimes.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        'Dou et al. (2019) "Few-Shot NLP with Meta-Learning," Gu et al. (2018) for machine translation, and subsequent work showed MAML and Prototypical Networks adapted to NLP tasks improve over standard fine-tuning when only K=5 or K=10 labeled examples per class are available, by learning better task-general initializations from auxiliary NLP datasets.',
    },
    {
      id: "q-meta-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the "meta-training data" used in few-shot NLP meta-learning, and why is its choice critical?',
      options: [
        "The model is meta-trained on the same dataset as the target task, split into episodes — the split strategy is critical",
        "The model is meta-trained on diverse NLP datasets (e.g., sentiment, NLI, NER, QA tasks) structured as episodes; the diversity and similarity of meta-training tasks to meta-test tasks critically determines generalization",
        "Meta-training data is synthetically generated by paraphrasing the few-shot examples; quality of paraphrase generation is critical",
        "The meta-training data is a fixed set of 100 balanced NLP tasks standardized across all papers — task selection does not matter as long as this standard is used",
      ],
      correctAnswer: 1,
      explanation:
        "The choice of meta-training tasks in NLP is critical: Triantafillou et al. (2020) Meta-Dataset and Bragg et al. FLEX benchmark showed that meta-training task diversity and domain proximity to test tasks strongly determines few-shot performance. Overly similar meta-training tasks cause overfitting to specific patterns; too dissimilar tasks provide little useful transfer.",
    },
  ],
  "meta-learning-robotics": [
    {
      id: "q-meta-kp40-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'What is the "sim-to-real transfer" problem in robot meta-learning, and how can meta-learning help?',
      options: [
        "Robots cannot learn in simulation; meta-learning helps by replacing simulation with real-world data collection",
        "There is a distribution shift between simulated and real-world dynamics; meta-learning can meta-train across diverse simulated environments so the policy quickly adapts to real-world conditions using a few real interactions",
        "Sim-to-real transfer only affects visual appearance, not dynamics; meta-learning addresses this through domain randomization of textures",
        "Meta-learning eliminates sim-to-real transfer by training only on real-world data in an episodic format",
      ],
      correctAnswer: 1,
      explanation:
        "Sim-to-real transfer fails when simulated physics doesn\'t match reality (the \"reality gap\"). Meta-learning approaches (e.g., MAML-based policies, Domain Randomization + MAML) train across diverse simulated dynamics so the robot\'s policy can rapidly adapt using a few real-world rollouts. Papers like Finn et al. (2017) and Nagabandi et al. (2019) demonstrated this for locomotion and manipulation.",
    },
    {
      id: "q-meta-kp40-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Meta-learning for robot manipulation tasks is easier than for locomotion because manipulation tasks have lower-dimensional state spaces.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Manipulation tasks are generally harder for meta-learning because they involve contact-rich dynamics, high-dimensional object configurations, and require precise dexterous control. Locomotion tasks, while complex, often have more structured reward landscapes. The difficulty of manipulation comes from contact discontinuities and the sensitivity to object pose, not state dimensionality alone.",
    },
    {
      id: "q-meta-kp40-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In "Learning to Learn by Self-Play" approaches for robotics (e.g., POET, AMG), what is the outer-loop meta-optimization objective?',
      options: [
        "Maximizing the reward on a fixed set of held-out test environments",
        "Jointly evolving environments and agents so that environments are always at the frontier of the current agent\'s competence, enabling open-ended learning",
        "Minimizing the KL divergence between the agent\'s behavior distribution and an expert demonstration distribution",
        "Maximizing the entropy of the policy over the training task distribution",
      ],
      correctAnswer: 1,
      explanation:
        "POET (Wang et al. 2019) and related approaches co-evolve environments and agents. The outer-loop generates increasingly complex environments that are challenging but solvable for the current agent level. This creates a curriculum that drives open-ended skill acquisition — the meta-learning objective is implicit in the environment generation process rather than an explicit episode-based loss.",
    },
  ],
};

const extraMeta: Record<string, Question[]> = {
  "fomaml-reptile": [
    {
      id: "q-meta-kp41-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "First-Order MAML (FOMAML) differs from full MAML in that it:",
      options: [
        "Replaces the inner-loop SGD with closed-form ridge regression",
        "Drops the second-order (Hessian) terms from the meta-gradient, using only first-order derivatives",
        "Uses a separate meta-network to predict inner-loop learning rates",
        "Averages gradients across tasks without any inner-loop adaptation",
      ],
      correctAnswer: 1,
      explanation: "Full MAML computes d/d(theta) of the adapted parameters phi_i, which requires differentiating through the inner-loop update steps — producing second-order (Hessian) terms. FOMAML simply stops the gradient at the adapted parameters, treating them as constants for the purpose of computing the outer-loop gradient. This dramatically reduces memory and compute (no second-order backprop) at the cost of a biased meta-gradient estimate. Empirically the bias matters little, and FOMAML matches MAML in most benchmarks.",
      hints: [
        "Think about what terms appear when you differentiate phi_i = theta - alpha * grad_L_i(theta) with respect to theta.",
        "The Hessian appears because phi_i depends on theta twice: directly and through the gradient.",
      ],
    },
    {
      id: "q-meta-kp41-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Reptile (Nichol et al., 2018) performs meta-learning by:",
      options: [
        "Running inner-loop SGD on a task and then moving the meta-parameters toward the resulting adapted parameters",
        "Training a hypernetwork to generate task-specific weight offsets",
        "Minimizing the KL divergence between the meta-prior and the task posterior",
        "Sampling episodes and maximizing the mutual information between support and query predictions",
      ],
      correctAnswer: 0,
      explanation: "Reptile is extremely simple: sample a task, run k steps of SGD to get adapted parameters phi, then update theta toward phi via theta <- theta + epsilon*(phi - theta). No second-order derivatives and no explicit train/test split within an episode are needed. Reptile can be shown to approximately maximize the inner product between task gradients, encouraging an initialization from which all tasks are reachable in few steps.",
      hints: [
        "Reptile's update is a simple interpolation: move the meta-parameters toward the task-adapted parameters.",
        "Unlike MAML, Reptile does not require a query set — it uses the same data for inner and outer loop.",
      ],
    },
    {
      id: "q-meta-kp41-3",
      type: "true-false",
      difficulty: "hard",
      question: "Reptile is mathematically equivalent to FOMAML when using a single inner-loop gradient step.",
      correctAnswer: "False",
      explanation: "With a single inner step, Reptile reduces to joint training (standard multi-task gradient descent) because phi - theta = -alpha*grad_L(theta), so the Reptile update is proportional to the plain task gradient evaluated at theta. FOMAML with one inner step is identical to joint training too, but for multiple inner steps Reptile differs: it implicitly maximizes within-task gradient alignment across tasks without requiring an explicit query set, making it distinct from FOMAML even though both are first-order methods.",
      hints: [
        "With k=1 inner step, Reptile's update direction is exactly the task gradient, same as joint training.",
        "The interesting meta-learning behavior of Reptile emerges only with k > 1 inner steps.",
      ],
    },
  ],
  "imaml-implicit": [
    {
      id: "q-meta-kp42-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "iMAML (Rajeswaran et al., 2019) solves the meta-gradient computation problem by:",
      options: [
        "Replacing the inner loop with a single proximal-point optimization step",
        "Using implicit differentiation on the inner-loop optimality condition to compute exact meta-gradients without unrolling",
        "Approximating the Hessian with a diagonal Fisher information matrix",
        "Parameterizing the inner-loop optimizer with a learned LSTM",
      ],
      correctAnswer: 1,
      explanation: "iMAML defines the inner-loop solution phi_i as the minimizer of L_i(phi) + (lambda/2)||phi - theta||^2, then applies the implicit function theorem: d(phi_i)/d(theta) = (H_i + lambda*I)^(-1) * lambda*I, where H_i is the task Hessian at phi_i. This gives exact meta-gradients without storing the entire inner-loop computation graph, making iMAML memory-efficient and capable of using any black-box inner optimizer.",
      hints: [
        "Implicit differentiation differentiates through an optimality condition F(phi, theta)=0 rather than through the computation graph.",
        "The regularization term ||phi - theta||^2 links the inner-loop solution to the meta-parameters.",
      ],
    },
    {
      id: "q-meta-kp42-2",
      type: "true-false",
      difficulty: "medium",
      question: "iMAML requires storing all intermediate activations from the inner-loop optimization steps, making its memory cost proportional to the number of inner-loop steps.",
      correctAnswer: "False",
      explanation: "This is the key advantage of iMAML. Because it uses implicit differentiation on the inner-loop optimality condition rather than backpropagating through the unrolled computation graph, iMAML does NOT need to store intermediate activations from inner-loop steps. Its memory cost is essentially constant with respect to the number of inner steps, unlike standard MAML which stores the full unrolled graph.",
      hints: [
        "Implicit differentiation requires solving a linear system at the final phi_i, not backpropagating through each step.",
        "Compare to MAML where the meta-gradient computation graph grows linearly with the number of inner steps.",
      ],
    },
    {
      id: "q-meta-kp42-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The MAML++ paper (Antoniou et al., 2019) identifies which of the following as a critical failure mode of vanilla MAML?",
      options: [
        "The meta-initialization converges to a flat region of the loss landscape after many outer steps",
        "Instability caused by fixed learning rates across all inner-loop steps and all layers, combined with absence of batch normalization statistics per-step",
        "The query set gradient always points in the opposite direction of the support set gradient",
        "The episodic sampling strategy introduces severe class imbalance that degrades the meta-initialization",
      ],
      correctAnswer: 1,
      explanation: "MAML++ demonstrates that vanilla MAML is unstable because: (1) a single scalar learning rate is shared across all inner-loop steps and all layers, ignoring that different layers need different step sizes at different adaptation stages; (2) batch normalization uses running statistics rather than per-step statistics, causing distribution shift during unrolled inner-loop steps. MAML++ introduces per-layer per-step learnable learning rates and proper per-step BN statistics, substantially improving stability and performance.",
      hints: [
        "Think about what changes across inner-loop steps: the parameter magnitudes, the batch statistics, the gradient scales.",
        "MAML++ adds learnable learning rates alpha_{i,j} for each layer j at each inner step i.",
      ],
    },
  ],
  "matching-networks-deep": [
    {
      id: "q-meta-kp43-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Matching Networks (Vinyals et al., 2016), the key innovation over a standard nearest-neighbor classifier is:",
      options: [
        "Using a cross-attention mechanism so that the query embedding is conditioned on the entire support set",
        "Replacing cosine similarity with learned Mahalanobis distance",
        "Training a separate embedding network for each N-way K-shot task configuration",
        "Applying a graph neural network over the support set to model inter-class relationships",
      ],
      correctAnswer: 0,
      explanation: "Matching Networks use a Full Context Embeddings (FCE) mechanism: the query is encoded by an LSTM that attends over the support set embeddings (conditioning the query representation on the specific support examples), and the support embeddings themselves are encoded by a bidirectional LSTM over the support set. This context-awareness means the same image can be embedded differently depending on which other classes are in the support set — a crucial advantage over fixed embeddings.",
      hints: [
        "Standard nearest-neighbor uses fixed embeddings independent of the support set. What does Matching Networks do differently?",
        "FCE stands for Full Context Embeddings — the full context is the entire support set.",
      ],
    },
    {
      id: "q-meta-kp43-2",
      type: "true-false",
      difficulty: "easy",
      question: "Prototypical Networks represent each class as the mean of its support set embeddings in the embedding space.",
      correctAnswer: "True",
      explanation: "Prototypical Networks (Snell et al., 2017) compute a class prototype c_k = (1/|S_k|) * sum_{(x,y) in S_k} f_theta(x), the average embedding of all support examples for class k. Classification is then performed by finding the nearest prototype in embedding space using squared Euclidean distance: p(y=k|x) = softmax(-||f_theta(x) - c_k||^2). This averaging operation is key: it reduces intra-class variance and produces a stable representative embedding.",
      hints: [
        "The prototype is literally the centroid of the support set embeddings for each class.",
        "Classification is done by proximity to these centroids in embedding space.",
      ],
    },
    {
      id: "q-meta-kp43-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Prototypical Networks have a theoretical interpretation as a mixture of von Mises-Fisher distributions when using which distance metric?",
      options: [
        "Euclidean distance",
        "Cosine similarity (normalized dot product)",
        "KL divergence between embedding distributions",
        "Mahalanobis distance with a class-specific covariance",
      ],
      correctAnswer: 1,
      explanation: "When embeddings are L2-normalized and cosine similarity is used, Prototypical Networks become equivalent to a mixture of von Mises-Fisher (vMF) distributions on the unit hypersphere, where each prototype is the mean direction. The classification softmax over cosine similarities corresponds exactly to the posterior under equal-concentration vMF components. This provides a principled probabilistic interpretation: the embedding space is a hypersphere and prototypes are distribution modes.",
      hints: [
        "von Mises-Fisher is the directional analogue of the Gaussian distribution, defined on the unit sphere.",
        "L2 normalization projects all embeddings onto the unit hypersphere.",
      ],
    },
  ],
  "relation-networks-deep": [
    {
      id: "q-meta-kp44-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Relation Networks (Sung et al., 2018) extend Prototypical/Matching Networks by:",
      options: [
        "Learning the distance function itself via a neural network rather than using a fixed metric like cosine or Euclidean distance",
        "Adding a temporal relation module that models the order of support examples",
        "Using a GAN to generate additional support examples and augment the support set",
        "Learning a mapping from support embeddings to class-conditional generative model parameters",
      ],
      correctAnswer: 0,
      explanation: "Relation Networks concatenate the query embedding with each class prototype (or support example embedding) and feed the concatenated vector through a learned relation module — a small neural network that outputs a scalar relation score. This replaces the fixed cosine or Euclidean distance with a learned similarity function that can capture complex, non-metric relationships between query and support embeddings that fixed distances cannot express.",
      hints: [
        "The key question: in Matching/Prototypical Networks, what is fixed versus learned compared to Relation Networks?",
        "The relation module takes [query_emb; support_emb] as input and outputs a scalar similarity score.",
      ],
    },
    {
      id: "q-meta-kp44-2",
      type: "true-false",
      difficulty: "medium",
      question: "Relation Networks require the embedding space to satisfy metric axioms (symmetry, triangle inequality) because the relation module is constrained to be a metric function.",
      correctAnswer: "False",
      explanation: "Relation Networks explicitly relax the metric requirement. The relation module is an unconstrained neural network that maps (query_embedding, support_embedding) pairs to relation scores. It need not be symmetric, need not satisfy the triangle inequality, and can capture asymmetric or complex relational patterns. This freedom is both a strength (more expressive) and a potential weakness (harder to optimize, risk of overfitting the relation module).",
      hints: [
        "A neural network is a general function approximator with no built-in metric constraints.",
        "Compare to Prototypical Networks where Euclidean distance is always symmetric and satisfies triangle inequality.",
      ],
    },
    {
      id: "q-meta-kp44-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "When comparing Prototypical Networks to Matching Networks on 5-way 1-shot tasks, which finding has been consistently observed in the literature?",
      options: [
        "Matching Networks outperform Prototypical Networks because FCE provides richer context-aware embeddings",
        "Prototypical Networks match or outperform Matching Networks despite their simpler design, suggesting metric choice matters more than context-aware embeddings for 1-shot tasks",
        "Both methods perform identically because they use the same episodic training framework",
        "Matching Networks significantly outperform because they avoid the prototype averaging operation that loses intra-class information",
      ],
      correctAnswer: 1,
      explanation: "Surprisingly, Prototypical Networks (using simple mean prototypes and Euclidean distance, with no context-aware embeddings) match or outperform Matching Networks on standard 5-way 1-shot miniImageNet benchmarks. This finding challenged the assumption that the complex FCE mechanism of Matching Networks was necessary. It suggests that choosing the right distance metric (Euclidean vs. cosine) and proper training protocol matters more than architectural complexity for few-shot metric learning.",
      hints: [
        "Snell et al. (2017) directly compared these methods. Their result was counterintuitive.",
        "With only 1 support example per class, the prototype IS the support example, so averaging does not change anything.",
      ],
    },
  ],
  "hypernetworks-meta-deep": [
    {
      id: "q-meta-kp45-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In meta-learning with hypernetworks, the hypernetwork serves as:",
      options: [
        "A regularizer that penalizes large weight magnitudes in the target network",
        "A network that takes a task description (e.g., support set encoding) as input and outputs the full weight tensor or weight offset for a target (primary) network",
        "An ensemble aggregator that combines predictions from multiple independently trained task-specific networks",
        "A memory module that retrieves relevant past task parameters from an external key-value store",
      ],
      correctAnswer: 1,
      explanation: "A hypernetwork h_phi takes a task embedding z (computed from the support set or a task descriptor) and generates the parameters W = h_phi(z) for a target network f_W. The hypernetwork is the meta-learner: it internalizes task structure so that a single forward pass through h_phi produces a task-specific parameter set, avoiding explicit gradient-based inner-loop optimization. This enables amortized inference — adaptation becomes a feed-forward computation.",
      hints: [
        "The prefix hyper- means the network operates on another network's parameters.",
        "The hypernetwork is trained meta-learner; the target network is the task-specific learner whose weights are generated.",
      ],
    },
    {
      id: "q-meta-kp45-2",
      type: "true-false",
      difficulty: "medium",
      question: "Hypernetworks for meta-learning can achieve adaptation to a new task at test time without performing any gradient descent steps, since weights are generated by a forward pass through the hypernetwork.",
      correctAnswer: "True",
      explanation: "This is the key advantage of hypernetwork-based meta-learning over gradient-based methods like MAML. At test time, the support set is encoded into a task embedding z, and the hypernetwork computes W = h_phi(z) in a single forward pass. The target network f_W is then used directly for inference on the query set. No gradient computation or iterative optimization is required at test time, making adaptation extremely fast (amortized inference).",
      hints: [
        "Compare the test-time procedure: MAML runs k gradient steps, hypernetworks run one forward pass.",
        "This is the classic amortized inference principle from variational inference applied to meta-learning.",
      ],
    },
    {
      id: "q-meta-kp45-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A fundamental scalability challenge for hypernetworks that generate full weight tensors for large target networks is:",
      options: [
        "The hypernetwork cannot be trained with gradient descent because the weight generation process is non-differentiable",
        "The output dimension of the hypernetwork equals the number of parameters in the target network, causing the hypernetwork itself to be extremely large",
        "Hypernetworks are limited to generating weights only for the final classification layer of the target network",
        "The generated weights cannot be fine-tuned after generation because they are not stored in differentiable variables",
      ],
      correctAnswer: 1,
      explanation: "If the target network has P parameters, the hypernetwork must output a P-dimensional vector for each task. For modern deep networks with millions of parameters, this means the hypernetwork's output layer alone has P neurons — making the hypernetwork itself massive. Common solutions include: (1) generating low-rank weight updates (delta_W = U*V^T) instead of full weights, (2) generating only task-specific adapter layers (a small fraction of total parameters), or (3) chunking the parameter space and generating it sequentially.",
      hints: [
        "Think about the dimensionality mismatch: modern ResNets have ~25M parameters. The hypernetwork would need to output 25M values.",
        "This is why most practical hypernetwork approaches generate low-rank updates or adapters, not full weight tensors.",
      ],
    },
  ],
  "icl-as-meta-learning": [
    {
      id: "q-meta-kp46-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The in-context learning as implicit meta-learning perspective (Akyurek et al., 2022; von Oswald et al., 2023) proposes that transformer forward passes performing in-context learning implicitly implement:",
      options: [
        "Bayesian model averaging over a posterior distribution of task hypotheses",
        "Gradient descent steps on an implicit in-context loss, with attention layers acting as gradient update steps in weight space",
        "Monte Carlo tree search over the token sequence to find the optimal next-token prediction",
        "Expectation-maximization alternating between task inference and parameter optimization",
      ],
      correctAnswer: 1,
      explanation: "Von Oswald et al. (2023) show that a single linear self-attention layer performing ICL is mathematically equivalent to one step of gradient descent on an in-context regression loss: the attention output W_V * softmax(W_Q*x_q * (W_K*X_S)^T) * X_S matches the form of a gradient descent update. This gradient descent in the forward pass interpretation suggests that during pre-training, transformers learn to implement a fast learning algorithm in their weights — exactly the goal of meta-learning.",
      hints: [
        "The key insight: the attention mechanism can compute the same update that gradient descent would compute on the in-context examples.",
        "This requires the value, query, and key projections to align with the gradient descent update direction.",
      ],
    },
    {
      id: "q-meta-kp46-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Task vectors (Ilharco et al., 2023) enable task arithmetic in model weight space. When a task vector is defined as tau = theta_ft - theta_pre, adding tau to a different pre-trained model's weights:",
      options: [
        "Always destroys the pre-trained model's capabilities because the weight shift is incompatible with a different initialization",
        "Transfers the task-specific behavior to the new model, enabling zero-shot composition and negation of capabilities without any fine-tuning",
        "Requires the two pre-trained models to have identical architectures but can differ in training data",
        "Only works if both models were pre-trained on the same dataset with the same random seed",
      ],
      correctAnswer: 1,
      explanation: "Task vectors (theta_ft - theta_pre) encode the directional weight shift induced by fine-tuning on a specific task. Ilharco et al. show that these vectors are approximately transferable: adding tau to another pre-trained checkpoint of the same architecture transfers the capability. Furthermore, task vectors can be composed (adding vectors for multiple tasks improves multi-task performance) and negated (subtracting tau removes a capability). This is a form of meta-learning in weight space.",
      hints: [
        "The task vector lives in the same parameter space for all models with the same architecture.",
        "Think of it as a direction in weight space that corresponds to a skill or task.",
      ],
    },
    {
      id: "q-meta-kp46-3",
      type: "true-false",
      difficulty: "hard",
      question: "The theoretical analysis of ICL by Xie et al. (2021) shows that Bayesian inference over a latent concept variable produces the same predictions as ICL in large language models, when the pre-training distribution is a mixture of HMMs.",
      correctAnswer: "True",
      explanation: "Xie et al. (2021) An Explanation of In-context Learning as Implicit Bayesian Inference proves that under a generative model where documents are generated by a mixture of hidden Markov models (one per latent concept), the optimal predictor for the next token given the in-context examples is exactly Bayesian inference over the latent concept. Since transformers trained on such data learn to approximate this optimal predictor, ICL emerges naturally as implicit Bayesian concept inference — a form of meta-learning that updates beliefs about the task from context.",
      hints: [
        "Bayesian inference: p(concept | context) is proportional to p(context | concept) * p(concept).",
        "The latent concept is analogous to the task identity in meta-learning — it determines the data distribution.",
      ],
    },
  ],
  "meta-gradient-theory": [
    {
      id: "q-meta-kp47-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The memory cost of standard MAML (with second-order gradients) scales with the number of inner-loop steps K because:",
      options: [
        "Each inner step adds a new set of task-specific parameters that must be stored",
        "Backpropagation through the K-step unrolled inner loop requires storing all intermediate activations and parameters at each step",
        "The outer-loop optimizer maintains K copies of the meta-parameters, one per inner step",
        "The Hessian matrix grows quadratically with K since it captures pairwise parameter interactions across steps",
      ],
      correctAnswer: 1,
      explanation: "MAML's meta-gradient requires differentiating through the K-step inner loop. Reverse-mode autodiff (backprop through time) must store the full computation graph: all intermediate activations, parameter values, and gradient tensors at each of the K inner steps. Memory grows O(K * model_size). This is the dominant reason MAML is memory-intensive and why FOMAML, Reptile, and iMAML (which avoid full unrolling) are preferred in practice for large models.",
      hints: [
        "Compare to training a standard network: backprop through K inner steps is like backprop through a K-layer network of full models.",
        "Each intermediate theta_i (for i=1..K) must be stored to compute gradients of the meta-loss.",
      ],
    },
    {
      id: "q-meta-kp47-2",
      type: "true-false",
      difficulty: "medium",
      question: "In gradient-based meta-learning, the meta-gradient is always an unbiased estimate of the true gradient of the expected task loss with respect to the meta-parameters.",
      correctAnswer: "False",
      explanation: "FOMAML and Reptile use biased meta-gradient estimates because they drop higher-order terms. Even full MAML can have bias when using stochastic inner-loop updates (because E[phi(theta)] != phi(E[theta]) for nonlinear updates). The meta-gradient is also biased when the inner-loop optimizer does not converge to the true task optimum (truncated optimization bias). Only in the limit of infinite data, infinite inner steps, and exact gradients is the MAML meta-gradient unbiased.",
      hints: [
        "FOMAML explicitly drops second-order terms — these are not zero, so the gradient estimate is biased.",
        "Bias in meta-learning can still be acceptable if variance reduction compensates in practice.",
      ],
    },
    {
      id: "q-meta-kp47-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Meta-SGD (Li et al., 2017) extends MAML by introducing per-parameter learnable learning rates. The key claim about meta-learned learning rates is that they:",
      options: [
        "Converge to the same scalar value for all parameters as training progresses, recovering standard SGD",
        "Encode task-specific curvature information analogous to a preconditioner, allowing faster adaptation than isotropic SGD",
        "Must be positive to ensure inner-loop convergence, and Meta-SGD uses a softplus constraint on them",
        "Replace the meta-initialization entirely — only the learning rates are meta-learned, not the starting parameters",
      ],
      correctAnswer: 1,
      explanation: "Meta-SGD jointly meta-learns both the initialization theta and a per-parameter learning rate vector alpha (with the same shape as theta). The learned alpha acts as a diagonal preconditioner: parameters that are more informative for task adaptation get larger learning rates. This is analogous to diagonal preconditioning in natural gradient descent, where the Fisher information matrix (approximated diagonally) scales each parameter's update by its curvature. Both theta and alpha are updated by the outer-loop meta-optimizer.",
      hints: [
        "A preconditioner scales gradient updates differently for different parameters, encoding local curvature.",
        "Meta-SGD's update: phi = theta - alpha * grad_L(theta), where alpha is element-wise and meta-learned.",
      ],
    },
  ],
  "anil-boil-analysis": [
    {
      id: "q-meta-kp48-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The ANIL (Almost No Inner Loop) ablation (Raghu et al., 2020) discovered that in MAML, the inner-loop adaptation of the feature extractor layers is:",
      options: [
        "Essential for performance — removing inner-loop updates to the body causes catastrophic accuracy degradation",
        "Nearly dispensable — adapting only the final linear head in the inner loop achieves comparable accuracy to full MAML",
        "Responsible for 90% of the performance gain, while adapting the head contributes only marginally",
        "Necessary only for cross-domain generalization but not within-domain few-shot tasks",
      ],
      correctAnswer: 1,
      explanation: "ANIL freezes the feature extractor (body) during inner-loop adaptation and only adapts the final linear classification head. Despite this drastic simplification, ANIL achieves accuracy within ~1% of full MAML on miniImageNet and tieredImageNet. This finding reveals that MAML primarily learns a general-purpose feature representation (in the outer loop) and that rapid adaptation of the linear head is sufficient — the inner-loop body updates in MAML are largely redundant. This challenges the narrative that MAML learns to rapidly adapt deep feature representations.",
      hints: [
        "ANIL = Almost No Inner Loop: only the head (last layer) is updated in the inner loop.",
        "BOIL is the complementary ablation: adapt the body but not the head — it performs much worse than ANIL.",
      ],
    },
    {
      id: "q-meta-kp48-2",
      type: "true-false",
      difficulty: "medium",
      question: "The BOIL (Body Only Inner Loop) variant of MAML, which adapts only the feature extractor body without adapting the classification head in the inner loop, achieves better few-shot performance than ANIL.",
      correctAnswer: "False",
      explanation: "BOIL adapts the body but keeps the head fixed during inner-loop adaptation. It performs substantially worse than ANIL (which adapts only the head) and worse than full MAML. This asymmetry is striking: adapting the head alone (ANIL) nearly matches full MAML, while adapting the body alone (BOIL) is much worse. The implication is that what matters most for few-shot adaptation is reconfiguring the final classification layer to recognize new classes — the representations learned by the body are already sufficiently general.",
      hints: [
        "Intuitively, the head maps features to class probabilities — this is where class-specific information is concentrated.",
        "ANIL body features are reused across tasks; only the head discriminates between the N-way classes in each episode.",
      ],
    },
    {
      id: "q-meta-kp48-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Centered Kernel Alignment (CKA) analysis of MAML-trained representations (Raghu et al., 2020) shows that compared to a standard pre-trained (non-meta-learned) network:",
      options: [
        "MAML representations show higher inter-layer similarity, indicating that all layers collapse to the same representation",
        "MAML lower layers are highly similar to those of non-meta-learned networks, but upper layers diverge significantly due to rapid reuse across tasks",
        "MAML representations differ dramatically at every layer from non-meta-learned networks, explaining the performance advantage",
        "MAML and non-meta-learned representations are essentially identical at all layers when controlling for dataset size",
      ],
      correctAnswer: 1,
      explanation: "CKA analysis shows that MAML's lower-layer feature representations are very similar to those of a pre-trained network trained with standard supervised learning on the same episodes — suggesting these layers learn general low-level features regardless of the meta-learning objective. However, the upper layers (closer to the classification head) differ significantly in MAML, being more task-agnostic and reusable. This explains why ANIL works: the body already produces general features; only the upper/head layers need task-specific configuration.",
      hints: [
        "CKA measures representational similarity between two networks' layer activations on the same inputs.",
        "Low CKA at upper layers means the representation structures differ — MAML upper layers are more task-agnostic.",
      ],
    },
  ],
  "few-shot-embeddings": [
    {
      id: "q-meta-kp49-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a 5-way 1-shot classification task with Prototypical Networks using squared Euclidean distance, the classification of a query x is given by which softmax computation?",
      options: [
        "p(y=k|x) = softmax_k(f(x)^T * c_k) where c_k is the kth prototype",
        "p(y=k|x) = softmax_k(-||f(x) - c_k||^2) where c_k = (1/K) * sum f(x_i^k)",
        "p(y=k|x) = softmax_k(||f(x) - c_k||^2 / temperature) with negative distance becoming a logit",
        "p(y=k|x) = sigmoid(f(x)^T * W_k) where W_k is a learned per-class weight vector",
      ],
      correctAnswer: 1,
      explanation: "Prototypical Networks classify by: (1) compute prototype c_k = mean of support embeddings for class k, (2) compute negative squared Euclidean distance -||f_theta(x) - c_k||^2 as the logit for class k, (3) apply softmax over all N classes. The negative sign converts distance to similarity (closer prototype = higher logit = higher probability). With 1-shot, c_k = f(x_k^support) since there is exactly one support example per class.",
      hints: [
        "Softmax needs a similarity (higher = more likely), but Euclidean distance is dissimilarity (lower = more similar).",
        "Negating the distance converts it to the appropriate logit for softmax classification.",
      ],
    },
    {
      id: "q-meta-kp49-2",
      type: "true-false",
      difficulty: "easy",
      question: "For few-shot classification, episodic training with N-way K-shot episodes that match the test configuration consistently outperforms standard joint training (training on all classes simultaneously with cross-entropy) when the same backbone architecture is used.",
      correctAnswer: "False",
      explanation: "This belief was widely held early in the meta-learning literature, but later work (Chen et al., 2019 A Closer Look at Few-Shot Classification) showed that a strong baseline of standard pre-training followed by few-shot linear evaluation often matches or outperforms episodic meta-learning methods. The key factors are: backbone size, data augmentation, and training duration. Episodic training is not a silver bullet — the representation quality from standard training can be equally good or better, especially with larger models.",
      hints: [
        "Chen et al. (2019) showed that simple pre-training + cosine similarity matching achieves competitive few-shot accuracy.",
        "The advantage of episodic training shrinks as the backbone grows larger and is pre-trained on more data.",
      ],
    },
    {
      id: "q-meta-kp49-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The SimpleShot (Wang et al., 2019) few-shot method demonstrates that which pre-processing step dramatically improves nearest-neighbor few-shot classification without any meta-learning?",
      options: [
        "Applying PCA to reduce embedding dimensionality to 64 dimensions before computing distances",
        "L2-normalizing embeddings before computing Euclidean distance, which converts Euclidean to cosine distance and reduces hubness",
        "Whitening the embedding space so that all dimensions have unit variance and zero covariance",
        "Centering embeddings by subtracting the class prototype before computing inter-class distances",
      ],
      correctAnswer: 1,
      explanation: "SimpleShot shows that L2-normalizing embeddings before nearest-neighbor classification is extremely effective and simple. L2 normalization converts Euclidean distance computation to cosine similarity, reduces the hubness problem (where certain points become nearest neighbors to many others in high dimensions), and makes the distance metric invariant to embedding magnitude. Combined with a pre-trained backbone (no episodic training), L2-normalized nearest-neighbor achieves state-of-the-art few-shot results, demonstrating that meta-learning complexity is often unnecessary.",
      hints: [
        "Hubness: in high-dimensional spaces, some points appear as k-NN of many other points, distorting classification.",
        "L2 normalization: x_hat = x / ||x||. After this, Euclidean distance equals sqrt(2 - 2*cos_similarity).",
      ],
    },
  ],
  "meta-overfitting-generalization": [
    {
      id: "q-meta-kp50-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Meta-overfitting in few-shot learning refers to a model that:",
      options: [
        "Achieves high accuracy on meta-training tasks but fails to generalize to novel meta-test tasks from different classes or domains",
        "Overfits to specific query examples within each episode, ignoring the support set information",
        "Learns task-specific parameters that are so large they cause numerical overflow in the inner loop",
        "Fails to converge during meta-training because the task distribution is too heterogeneous",
      ],
      correctAnswer: 0,
      explanation: "Meta-overfitting occurs when the meta-learner memorizes the meta-training task distribution (e.g., which specific classes tend to co-occur in an episode) rather than learning general few-shot learning strategies. Symptoms: high meta-training accuracy but poor generalization to novel classes or domains at meta-test time. Mitigations include: diverse task augmentation, larger backbone architectures, meta-regularization (e.g., dropout, weight decay at the meta-level), and cross-domain episodes.",
      hints: [
        "Analogous to standard overfitting but at the task level rather than the example level.",
        "A meta-overfitted model knows the meta-training classes very well but cannot adapt to truly novel classes.",
      ],
    },
    {
      id: "q-meta-kp50-2",
      type: "true-false",
      difficulty: "medium",
      question: "In cross-domain few-shot learning, training and testing episode classes come from different visual domains (e.g., training on natural images, testing on medical images), which generally degrades meta-learner performance compared to within-domain evaluation.",
      correctAnswer: "True",
      explanation: "Cross-domain few-shot learning (CD-FSL) is significantly harder than within-domain evaluation because: (1) the visual statistics differ (color, texture, scale) between domains, (2) the feature extractor trained on one domain produces poorly calibrated embeddings in another, (3) the class structure may differ (fine-grained medical categories vs. coarse natural image categories). Performance drops of 20-40% accuracy are common when moving from miniImageNet to medical or satellite image benchmarks. Domain-adaptive meta-learning methods specifically address this gap.",
      hints: [
        "The feature extractor backbone is trained on the source domain — its inductive biases may not transfer.",
        "Cross-domain FSL benchmarks include: BSCD-FSL (4 target domains), Meta-Dataset (8+ domains).",
      ],
    },
    {
      id: "q-meta-kp50-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The generalization bound for meta-learning (Baxter, 2000; Maurer et al., 2016) shows that meta-learning generalization error depends on:",
      options: [
        "Only the number of tasks T, independent of the per-task sample size K",
        "Both the number of tasks T and the per-task sample size K, with the meta-generalization error decreasing as O(1/sqrt(T)) for the between-task term and O(1/sqrt(K)) for the within-task term",
        "Only the per-task sample size K, since the meta-learner sees all training tasks and thus has no task-level uncertainty",
        "The product T*K only, meaning that 100 tasks with 10 examples each is equivalent to 10 tasks with 100 examples each",
      ],
      correctAnswer: 1,
      explanation: "The canonical meta-learning generalization bound (Baxter 2000, Maurer et al. 2016) decomposes into two terms: (1) a between-task term O(C/sqrt(T)) where C is the complexity of the hypothesis class for meta-parameters and T is the number of meta-training tasks — this controls how well the meta-learner generalizes to new tasks; (2) a within-task term O(C'/sqrt(K)) where K is the per-task support size — this controls how well the adapted model generalizes within each new task. Both are necessary for low meta-test error.",
      hints: [
        "Two sources of uncertainty in meta-learning: which task am I facing (between-task) and what is the correct label for this example (within-task).",
        "The bound suggests collecting many diverse tasks is just as important as collecting many examples per task.",
      ],
    },
  ],
};
Object.assign(questions, extraMeta);

registerQuestions(questions);
export default questions;
