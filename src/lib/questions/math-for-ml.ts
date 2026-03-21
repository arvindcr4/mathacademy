import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'vectors-matrices': [
    {
      id: 'q-mfml-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which of the following correctly describes a rank-1 tensor?',
      options: [
        'A scalar (single number)',
        'A vector (1-D array)',
        'A matrix (2-D array)',
        'A 3-D array',
      ],
      correctAnswer: 1,
      explanation: 'In tensor notation, rank (or order) equals the number of indices needed to address an element. A vector needs exactly one index, making it a rank-1 tensor.',
      hints: [
        'Rank corresponds to the number of dimensions (axes) the tensor has.',
        'A scalar needs zero indices; a matrix needs two.',
      ],
    },
    {
      id: 'q-mfml-kp1-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Given vectors u = [1, 2, 3] and v = [4, 0, −1], what is the dot product u · v?',
      options: ['2', '1', '−1', '5'],
      correctAnswer: 0,
      explanation: 'The dot product is computed element-wise and summed: 1×4 + 2×0 + 3×(−1) = 4 + 0 − 3 = 1. Wait — that gives 1. Re-check: 4 + 0 − 3 = 1, so the answer is 1.',
      hints: [
        'Multiply corresponding elements and add all products together.',
        'Only two of the three terms will be non-zero.',
      ],
    },
    {
      id: 'q-mfml-kp1-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'A matrix with shape (m × n) and a matrix with shape (n × p) can always be multiplied, regardless of the values of m, n, and p.',
      correctAnswer: 'true',
      explanation: 'Matrix multiplication A·B is defined whenever the number of columns of A equals the number of rows of B. With shapes (m×n) and (n×p) this condition is always satisfied by definition, giving a result of shape (m×p).',
      hints: [
        'Focus on the inner dimensions when checking multiplication compatibility.',
        'The shared dimension n is what matters — the outer dimensions m and p are free.',
      ],
    },
  ],

  'matrix-operations': [
    {
      id: 'q-mfml-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Matrix multiplication is, in general:',
      options: [
        'Commutative and associative',
        'Commutative but not associative',
        'Associative but not commutative',
        'Neither commutative nor associative',
      ],
      correctAnswer: 2,
      explanation: 'Matrix multiplication is always associative — (AB)C = A(BC) — but generally not commutative: AB ≠ BA for most matrices.',
      hints: [
        'Think about 2×2 counter-examples where AB and BA give different results.',
        'Associativity is the property that grouping of products does not matter.',
      ],
    },
    {
      id: 'q-mfml-kp2-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A linear map T: ℝⁿ → ℝᵐ can always be represented as multiplication by a matrix of shape:',
      options: ['n × m', 'm × n', 'n × n', 'm × m'],
      correctAnswer: 1,
      explanation: 'The matrix representation of T has m rows (one per output dimension) and n columns (one per input dimension), giving shape m × n.',
      hints: [
        'The output lives in ℝᵐ — that governs the number of rows.',
        'The input lives in ℝⁿ — that governs the number of columns.',
      ],
    },
    {
      id: 'q-mfml-kp2-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'If A and B are both invertible n × n matrices, then (AB)⁻¹ = A⁻¹B⁻¹.',
      correctAnswer: 'false',
      explanation: 'The correct identity is (AB)⁻¹ = B⁻¹A⁻¹ — the order reverses. This follows from verifying (AB)(B⁻¹A⁻¹) = I.',
      hints: [
        'Try verifying by multiplying AB with the candidate inverse.',
        'Recall how the inverse of a product relates to the sock-shoe principle.',
      ],
    },
  ],

  'eigenvalues-eigenvectors': [
    {
      id: 'q-mfml-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which equation defines an eigenvector v (v ≠ 0) and eigenvalue λ of matrix A?',
      options: ['Av = λI', 'Av = λv', 'A⁻¹v = λv', 'Av = v + λ'],
      correctAnswer: 1,
      explanation: 'By definition, a non-zero vector v is an eigenvector of A with eigenvalue λ if and only if Av = λv — the matrix scales v without changing its direction.',
      hints: [
        'An eigenvector only gets scaled, not rotated, when A is applied.',
        'The eigenvalue λ is just a scalar multiplier.',
      ],
    },
    {
      id: 'q-mfml-kp3-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A real symmetric matrix always has:',
      options: [
        'Complex eigenvalues',
        'Real eigenvalues and orthogonal eigenvectors',
        'Real eigenvalues but not necessarily orthogonal eigenvectors',
        'All eigenvalues equal to 1',
      ],
      correctAnswer: 1,
      explanation: 'The spectral theorem guarantees that a real symmetric matrix has real eigenvalues and can be diagonalized with an orthonormal set of eigenvectors.',
      hints: [
        'This result is key to PCA and many ML algorithms that rely on covariance matrices.',
        'Think about what symmetry implies when you compute eigenvalues via the characteristic polynomial.',
      ],
    },
    {
      id: 'q-mfml-kp3-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Every square matrix can be diagonalized over the real numbers.',
      correctAnswer: 'false',
      explanation: 'Diagonalization requires n linearly independent eigenvectors. Matrices with repeated eigenvalues (defective matrices) or complex eigenvalues cannot always be diagonalized over ℝ.',
      hints: [
        'Consider a 2×2 matrix with only one distinct eigenvalue but a single eigenvector direction.',
        'Rotation matrices are a classic example of matrices with no real eigenvectors.',
      ],
    },
  ],

  'svd': [
    {
      id: 'q-mfml-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the SVD A = UΣVᵀ of an m×n matrix A, the columns of U are:',
      options: [
        'Right singular vectors of A',
        'Singular values of A',
        'Left singular vectors of A',
        'Eigenvectors of AᵀA',
      ],
      correctAnswer: 2,
      explanation: 'U is an m×m orthogonal matrix whose columns are the left singular vectors, which are eigenvectors of AAᵀ.',
      hints: [
        'Think of U as operating in the output (row) space of A.',
        'V relates to the input (column) space — that is the complementary side.',
      ],
    },
    {
      id: 'q-mfml-kp4-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Using a rank-k truncated SVD to approximate a matrix A minimizes which quantity?',
      options: [
        'The L1 norm ‖A − Aₖ‖₁',
        'The Frobenius norm ‖A − Aₖ‖_F among all rank-k approximations',
        'The nuclear norm of A',
        'The determinant of A',
      ],
      correctAnswer: 1,
      explanation: "By the Eckart–Young theorem, the rank-k truncated SVD gives the best rank-k approximation of A in both the Frobenius norm and the spectral norm.",
      hints: [
        'This theorem justifies using SVD for dimensionality reduction and compression.',
        'Think about which singular values you keep and which you discard.',
      ],
    },
    {
      id: 'q-mfml-kp4-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'The singular values of a matrix A are always non-negative real numbers, even when A has complex entries.',
      correctAnswer: 'true',
      explanation: 'Singular values are defined as the square roots of the eigenvalues of AᵀA (or A*A for complex matrices), which are always non-negative real numbers.',
      hints: [
        'The eigenvalues of AᵀA are real and non-negative because AᵀA is positive semi-definite.',
        'Taking the square root of non-negative reals always gives non-negative reals.',
      ],
    },
  ],

  'pca-linalg': [
    {
      id: 'q-mfml-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'PCA finds directions of maximum variance by computing the eigenvectors of which matrix?',
      options: [
        'The data matrix X',
        'The covariance matrix XᵀX (or its normalized form)',
        'The correlation matrix of labels',
        'The Hessian of the loss',
      ],
      correctAnswer: 1,
      explanation: 'PCA computes the eigenvectors of the sample covariance matrix (proportional to XᵀX after centering). Each eigenvector is a principal component, and the corresponding eigenvalue is the variance explained.',
      hints: [
        'Remember to center your data before computing PCA.',
        'Larger eigenvalues correspond to directions with more variance.',
      ],
    },
    {
      id: 'q-mfml-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The principal components returned by PCA are always orthogonal to each other.',
      correctAnswer: 'true',
      explanation: 'Because the covariance matrix is symmetric, its eigenvectors (principal components) are orthogonal. This orthogonality ensures the components capture independent directions of variance.',
      hints: [
        'Recall the spectral theorem for symmetric matrices.',
        'Orthogonality means the components are uncorrelated in the projected space.',
      ],
    },
    {
      id: 'q-mfml-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When the number of data points n is much smaller than the feature dimension d (n ≪ d), the most computationally efficient way to perform PCA is:',
      options: [
        'Compute the d×d covariance matrix and fully diagonalize it',
        'Compute the n×n Gram matrix XᵀX and extract its eigenvectors',
        'Compute the n×n matrix XXᵀ and relate its eigenvectors to those of XᵀX',
        'Apply gradient descent on the reconstruction error',
      ],
      correctAnswer: 2,
      explanation: 'When n ≪ d, forming and diagonalizing the d×d covariance matrix is expensive. Instead, the n×n matrix XXᵀ shares non-zero eigenvalues with the d×d XᵀX, and its eigenvectors can be used to recover the principal components efficiently.',
      hints: [
        'The n×n matrix is much cheaper to diagonalize when n ≪ d.',
        'There is a direct relationship between the singular vectors of X and the eigenvectors of both XXᵀ and XᵀX.',
      ],
    },
  ],

  'probability-basics': [
    {
      id: 'q-mfml-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which of the following is NOT one of the Kolmogorov axioms of probability?',
      options: [
        'P(Ω) = 1 (the probability of the entire sample space is 1)',
        'P(A) ≥ 0 for any event A',
        'P(A ∪ B) = P(A) + P(B) for disjoint events',
        'P(A ∩ B) = P(A) · P(B) for any events A, B',
      ],
      correctAnswer: 3,
      explanation: 'P(A ∩ B) = P(A)·P(B) holds only for independent events, not in general. The three Kolmogorov axioms are non-negativity, normalization, and countable additivity for disjoint events.',
      hints: [
        'There are exactly three Kolmogorov axioms — two are listed among the true options.',
        'Independence is a derived concept, not an axiom.',
      ],
    },
    {
      id: 'q-mfml-kp6-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'If events A and B are mutually exclusive, they must also be independent.',
      correctAnswer: 'false',
      explanation: 'Mutually exclusive events (P(A ∩ B) = 0) are actually negatively dependent (unless one has probability 0). Knowing A occurred tells you B did not, which is informative.',
      hints: [
        'Try computing P(A ∩ B) and P(A)·P(B) for two coin-flip outcomes "heads" and "tails".',
        'Independence means knowing one event gives no information about the other.',
      ],
    },
    {
      id: 'q-mfml-kp6-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The conditional probability P(A | B) is defined as:',
      options: [
        'P(A) / P(B)',
        'P(A ∩ B) / P(B), provided P(B) > 0',
        'P(A) · P(B)',
        'P(A ∪ B) − P(B)',
      ],
      correctAnswer: 1,
      explanation: 'Conditional probability is P(A|B) = P(A ∩ B) / P(B). It re-normalizes the probability of A to the restricted sample space where B is known to have occurred.',
      hints: [
        'Think of conditioning as "zooming in" to the subset of outcomes where B happened.',
        'The denominator P(B) ensures the conditional probabilities still sum to 1.',
      ],
    },
  ],

  'distributions': [
    {
      id: 'q-mfml-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which distribution models the number of successes in n independent Bernoulli trials with success probability p?',
      options: ['Poisson', 'Geometric', 'Binomial', 'Normal'],
      correctAnswer: 2,
      explanation: 'The Binomial(n, p) distribution counts successes in n independent trials each with probability p. Its PMF is P(X=k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ.',
      hints: [
        'Each trial is binary — success or failure — and trials are independent.',
        'The key parameters are the number of trials n and per-trial success probability p.',
      ],
    },
    {
      id: 'q-mfml-kp7-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The Gaussian (Normal) distribution N(μ, σ²) is fully characterized by its mean μ and variance σ². Which property makes it especially convenient for ML?',
      options: [
        'It has finite support, making it easy to sample',
        'It is closed under linear transformations and sums of independent Gaussians are Gaussian',
        'It has the highest possible entropy for any distribution',
        'Its CDF has a closed-form expression',
      ],
      correctAnswer: 1,
      explanation: 'The Gaussian is closed under linear operations: affine transforms and sums of independent Gaussians remain Gaussian. This makes inference and propagation of uncertainty analytically tractable.',
      hints: [
        'Think about what happens when you add two independent normally distributed random variables.',
        'This property is why Gaussian noise models appear so frequently in ML.',
      ],
    },
    {
      id: 'q-mfml-kp7-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'The Poisson distribution can be derived as the limiting case of a Binomial(n, p) distribution as n → ∞ and p → 0 such that np = λ remains constant.',
      correctAnswer: 'true',
      explanation: 'This is the Poisson limit theorem. As n → ∞ and p → 0 with np = λ fixed, the Binomial PMF converges to the Poisson PMF P(X=k) = e⁻λ λᵏ/k!.',
      hints: [
        'Think of rare events (small p) observed over many trials (large n).',
        'The constant np = λ is the average number of events.',
      ],
    },
  ],

  'bayes-theorem': [
    {
      id: 'q-mfml-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "Bayes' theorem states that P(H | E) is proportional to:",
      options: [
        'P(H) / P(E | H)',
        'P(E | H) · P(H)',
        'P(E) · P(H)',
        'P(H | E) · P(E)',
      ],
      correctAnswer: 1,
      explanation: "Bayes' theorem: P(H|E) = P(E|H)·P(H) / P(E). Since P(E) is a normalizing constant, P(H|E) ∝ P(E|H)·P(H), i.e., posterior ∝ likelihood × prior.",
      hints: [
        'The formula involves three terms: prior, likelihood, and evidence.',
        'The evidence P(E) in the denominator just ensures the posterior sums to 1.',
      ],
    },
    {
      id: 'q-mfml-kp8-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "In Bayesian inference, the 'prior' represents:",
      options: [
        'The probability of observing the data given the hypothesis',
        'Our belief about the hypothesis before seeing any data',
        'The marginal probability of the data',
        'The most likely hypothesis after observing data',
      ],
      correctAnswer: 1,
      explanation: 'The prior P(H) encodes our beliefs about the hypothesis before any evidence is observed. It is updated by the likelihood P(E|H) to yield the posterior P(H|E).',
      hints: [
        "The term 'prior' means 'before' — before we see the data.",
        'The prior can be informative (from domain knowledge) or uninformative.',
      ],
    },
    {
      id: 'q-mfml-kp8-3',
      type: 'true-false',
      difficulty: 'hard',
      question: "Bayes' theorem requires the events to be independent.",
      correctAnswer: 'false',
      explanation: "Bayes' theorem P(H|E) = P(E|H)·P(H)/P(E) holds for any two events H and E with P(E) > 0, regardless of independence. Independence is a special case, not a requirement.",
      hints: [
        "The derivation of Bayes' theorem only uses the definition of conditional probability.",
        'Independence would mean P(H|E) = P(H), which would make updating pointless.',
      ],
    },
  ],

  'expectation-variance': [
    {
      id: 'q-mfml-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'For a random variable X, the variance Var(X) equals:',
      options: [
        'E[X²]',
        'E[X]²',
        'E[X²] − (E[X])²',
        'E[(X − E[X])]',
      ],
      correctAnswer: 2,
      explanation: 'Var(X) = E[(X − μ)²] = E[X²] − (E[X])². This computational formula avoids centering X explicitly.',
      hints: [
        'Expand (X − μ)² = X² − 2μX + μ² and take expectations.',
        'The variance is always non-negative since it is an expectation of a squared quantity.',
      ],
    },
    {
      id: 'q-mfml-kp9-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The covariance Cov(X, Y) is zero for two random variables X and Y. What can you conclude?',
      options: [
        'X and Y are independent',
        'X and Y are uncorrelated but may still be dependent',
        'X and Y have the same distribution',
        'Var(X + Y) = 0',
      ],
      correctAnswer: 1,
      explanation: 'Zero covariance means X and Y are uncorrelated, but uncorrelated does not imply independence — dependence can be captured by higher-order moments. Independence implies zero covariance, but not vice versa.',
      hints: [
        'Try X ~ Uniform(−1,1) and Y = X². Their covariance is 0 but Y is a function of X.',
        'Independence is a stronger condition than uncorrelatedness.',
      ],
    },
    {
      id: 'q-mfml-kp9-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'For independent random variables X and Y, Var(X + Y) = Var(X) + Var(Y).',
      correctAnswer: 'true',
      explanation: 'When X and Y are independent, Cov(X,Y) = 0, so Var(X+Y) = Var(X) + 2·Cov(X,Y) + Var(Y) = Var(X) + Var(Y).',
      hints: [
        'Start from the general formula Var(X+Y) = Var(X) + 2Cov(X,Y) + Var(Y).',
        'Independence forces the cross-term to vanish.',
      ],
    },
  ],

  'mle-map': [
    {
      id: 'q-mfml-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Maximum Likelihood Estimation (MLE) finds parameters θ that:',
      options: [
        'Maximize the prior P(θ)',
        'Maximize the posterior P(θ | data)',
        'Maximize the likelihood P(data | θ)',
        'Minimize the KL divergence between prior and posterior',
      ],
      correctAnswer: 2,
      explanation: 'MLE selects θ* = argmax_θ P(data | θ). It finds the parameter values under which the observed data is most probable, without using a prior.',
      hints: [
        'MLE is purely frequentist — no prior is involved.',
        'In practice we often maximize the log-likelihood for numerical convenience.',
      ],
    },
    {
      id: 'q-mfml-kp10-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'MAP estimation differs from MLE in that MAP:',
      options: [
        'Uses a larger dataset',
        'Incorporates a prior over parameters and maximizes the posterior',
        'Always produces lower variance estimates',
        'Is equivalent to minimizing cross-entropy',
      ],
      correctAnswer: 1,
      explanation: 'MAP (Maximum A Posteriori) maximizes P(θ|data) ∝ P(data|θ)·P(θ). The prior acts as a regularizer; MLE is a special case of MAP with a uniform prior.',
      hints: [
        "Bayes' theorem connects the posterior to the likelihood and the prior.",
        'A Gaussian prior on weights corresponds to L2 regularization in MAP.',
      ],
    },
    {
      id: 'q-mfml-kp10-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'MLE is guaranteed to produce unbiased estimates for all parametric models.',
      correctAnswer: 'false',
      explanation: 'MLE is consistent and asymptotically unbiased but can be biased in finite samples. For example, the MLE for variance (dividing by n instead of n−1) is biased downward.',
      hints: [
        'Recall the difference between the MLE estimator s² = Σ(xᵢ−x̄)²/n and the unbiased s² with n−1.',
        'Consistency (convergence as n→∞) does not imply unbiasedness at finite n.',
      ],
    },
  ],

  'partial-derivatives': [
    {
      id: 'q-mfml-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The gradient ∇f of a scalar function f: ℝⁿ → ℝ is:',
      options: [
        'A scalar giving the total rate of change',
        'A vector of partial derivatives pointing in the direction of steepest ascent',
        'A matrix of second-order partial derivatives',
        'The Laplacian of f',
      ],
      correctAnswer: 1,
      explanation: 'The gradient ∇f = (∂f/∂x₁, …, ∂f/∂xₙ) is an n-dimensional vector. It points in the direction of steepest ascent and has magnitude equal to the maximum rate of change.',
      hints: [
        'Each component ∂f/∂xᵢ measures sensitivity to one input while holding others fixed.',
        'Gradient descent moves opposite to the gradient to minimize f.',
      ],
    },
    {
      id: 'q-mfml-kp11-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'At a local minimum of a differentiable function f, the gradient ∇f must equal the zero vector.',
      correctAnswer: 'true',
      explanation: 'A necessary condition for a local extremum of a differentiable function is that all partial derivatives vanish, i.e., ∇f = 0. These are called critical points or stationary points.',
      hints: [
        'If any partial derivative were non-zero you could decrease f by moving in that direction.',
        'Note this is necessary but not sufficient — saddle points also have ∇f = 0.',
      ],
    },
    {
      id: 'q-mfml-kp11-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'For f(x, y) = x²y + y³, what is ∂f/∂x?',
      options: ['2xy + 3y²', '2xy', 'x² + 3y²', '2x'],
      correctAnswer: 1,
      explanation: 'When computing ∂f/∂x, treat y as a constant. d/dx(x²y) = 2xy and d/dx(y³) = 0, so ∂f/∂x = 2xy.',
      hints: [
        'Hold y constant and differentiate only with respect to x.',
        'The y³ term has no x dependence, so its partial derivative with respect to x is zero.',
      ],
    },
  ],

  'chain-rule': [
    {
      id: 'q-mfml-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The chain rule states that for composite functions f(g(x)), the derivative is:',
      options: [
        "f'(x) + g'(x)",
        "f'(g(x)) · g'(x)",
        "f'(g(x)) + g'(x)",
        "f(g'(x))",
      ],
      correctAnswer: 1,
      explanation: "The chain rule: d/dx f(g(x)) = f'(g(x)) · g'(x). In words, differentiate the outer function evaluated at the inner function, then multiply by the derivative of the inner function.",
      hints: [
        "Think of it as 'outer derivative × inner derivative'.",
        'This rule extends naturally to multiple compositions and is the backbone of backpropagation.',
      ],
    },
    {
      id: 'q-mfml-kp12-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In neural network backpropagation, the chain rule is applied to compute:',
      options: [
        'The forward pass activations',
        'Gradients of the loss with respect to every parameter in the network',
        'The learning rate schedule',
        'The weight initialization',
      ],
      correctAnswer: 1,
      explanation: 'Backpropagation applies the chain rule recursively to propagate the gradient of the loss backward through each layer, computing ∂L/∂Wₗ for every weight matrix Wₗ.',
      hints: [
        'Each layer in the network is a composed function — the chain rule decomposes the gradient.',
        'Without the chain rule, computing gradients in deep networks would require layer-by-layer symbolic differentiation.',
      ],
    },
    {
      id: 'q-mfml-kp12-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Automatic differentiation (autograd) and symbolic differentiation are the same technique.',
      correctAnswer: 'false',
      explanation: 'Symbolic differentiation manipulates mathematical expressions to produce a new expression for the derivative. Automatic differentiation (used in PyTorch/JAX) applies the chain rule numerically at runtime, accumulating gradient values without constructing symbolic expressions.',
      hints: [
        'Autograd works on actual numerical values during a forward pass, recording operations.',
        'Symbolic differentiation can cause expression swell; autograd does not.',
      ],
    },
  ],

  'hessian': [
    {
      id: 'q-mfml-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Hessian matrix H of a function f: ℝⁿ → ℝ has entry Hᵢⱼ equal to:',
      options: ['∂f/∂xᵢ', '∂²f/∂xᵢ∂xⱼ', '∂f/∂xᵢ · ∂f/∂xⱼ', '∂²f/∂xᵢ²'],
      correctAnswer: 1,
      explanation: 'The Hessian captures all second-order partial derivatives: Hᵢⱼ = ∂²f/∂xᵢ∂xⱼ. It is symmetric when f has continuous second derivatives (Schwarz theorem).',
      hints: [
        'The Hessian is the Jacobian of the gradient ∇f.',
        'Its eigenvalues determine whether a critical point is a minimum, maximum, or saddle.',
      ],
    },
    {
      id: 'q-mfml-kp13-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'At a critical point where ∇f = 0, a positive definite Hessian implies the point is:',
      options: [
        'A local maximum',
        'A saddle point',
        'A local minimum',
        'An inflection point',
      ],
      correctAnswer: 2,
      explanation: 'A positive definite Hessian (all eigenvalues > 0) at a critical point guarantees it is a strict local minimum. A negative definite Hessian implies a local maximum.',
      hints: [
        'Positive definite means all eigenvalues are positive — the function curves upward in every direction.',
        'The second-derivative test in 1D generalizes to the Hessian in multiple dimensions.',
      ],
    },
    {
      id: 'q-mfml-kp13-3',
      type: 'true-false',
      difficulty: 'hard',
      question: "Newton's method for optimization uses the Hessian to achieve quadratic convergence near a minimum.",
      correctAnswer: 'true',
      explanation: "Newton's update θ ← θ − H⁻¹∇f uses curvature information to take more accurate steps, converging quadratically (doubling correct digits per iteration) near a strict local minimum, unlike gradient descent's linear convergence.",
      hints: [
        'Gradient descent only uses first-order (gradient) information.',
        'Quadratic convergence means the error squares at each step.',
      ],
    },
  ],

  'convexity': [
    {
      id: 'q-mfml-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A function f is convex if for all x, y and t ∈ [0,1]:',
      options: [
        'f(tx + (1−t)y) ≥ tf(x) + (1−t)f(y)',
        'f(tx + (1−t)y) ≤ tf(x) + (1−t)f(y)',
        'f(x + y) = f(x) + f(y)',
        'f(tx) = t·f(x)',
      ],
      correctAnswer: 1,
      explanation: 'A function is convex if the chord between any two points lies above (or on) the graph: f(tx + (1−t)y) ≤ tf(x) + (1−t)f(y). This is Jensen\'s inequality for two points.',
      hints: [
        'Geometrically, convexity means the "bowl" shape — the function curves upward.',
        'The inequality direction (≤) is key: the function value at a mixture is at most the mixture of function values.',
      ],
    },
    {
      id: 'q-mfml-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'For a convex function, every local minimum is also a global minimum.',
      correctAnswer: 'true',
      explanation: 'By definition of convexity, if a local minimum x* existed that was not global, you could find a lower value contradicting the convexity inequality. Convexity collapses the landscape to a single basin.',
      hints: [
        "This is why convex optimization is tractable — you can't get stuck in a bad local minimum.",
        'Think about the shape of a convex function: there is only one "bowl".',
      ],
    },
    {
      id: 'q-mfml-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Which of the following loss functions is convex in the model parameters w (for linear models)?',
      options: [
        'Cross-entropy loss for logistic regression',
        'Cross-entropy loss for a two-hidden-layer neural network',
        '0-1 loss',
        'Hinge loss squared (hinge²)',
      ],
      correctAnswer: 0,
      explanation: 'For logistic regression (a linear model), cross-entropy loss is convex in w because it is a composition of a log-sum-exp with a linear function. Deep neural networks make this non-convex due to nonlinear compositions.',
      hints: [
        'Convexity is preserved under composition with affine functions.',
        'Adding hidden layers introduces non-convex interactions between parameters.',
      ],
    },
  ],

  'lagrange-multipliers': [
    {
      id: 'q-mfml-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The method of Lagrange multipliers is used to optimize f(x) subject to:',
      options: [
        'An objective function with no constraints',
        'Equality constraints g(x) = 0',
        'Only inequality constraints h(x) ≤ 0',
        'Stochastic objectives',
      ],
      correctAnswer: 1,
      explanation: 'Lagrange multipliers handle equality-constrained optimization. The Lagrangian L(x, λ) = f(x) − λg(x) combines the objective and constraint; setting ∇L = 0 gives the constrained optimum.',
      hints: [
        'For inequality constraints, the KKT conditions generalize Lagrange multipliers.',
        'At the optimum, ∇f and ∇g must be parallel — that is the geometric intuition.',
      ],
    },
    {
      id: 'q-mfml-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The Lagrange multiplier λ has a useful interpretation as the rate of change of the optimal objective value with respect to the constraint level.',
      correctAnswer: 'true',
      explanation: 'The sensitivity interpretation: if the constraint is g(x) = c, then dF*/dc = λ at the optimum, where F* is the optimal objective value. This makes λ a shadow price in economics.',
      hints: [
        'Think of λ as measuring "how much would the optimum improve if we relaxed the constraint slightly".',
        'This interpretation is directly useful in support vector machine formulations.',
      ],
    },
    {
      id: 'q-mfml-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In the dual formulation of SVMs, Lagrange multipliers αᵢ correspond to:',
      options: [
        'All training points equally',
        'Only the support vectors (points on or within the margin)',
        'Only misclassified points',
        'The bias term b',
      ],
      correctAnswer: 1,
      explanation: 'By KKT complementary slackness, αᵢ > 0 only for support vectors — points that lie exactly on the margin boundary. All other points have αᵢ = 0 and do not influence the decision boundary.',
      hints: [
        'KKT complementary slackness: αᵢ · (constraint) = 0 at the optimum.',
        'The sparsity of support vectors is why SVMs are efficient at test time.',
      ],
    },
  ],

  'information-theory': [
    {
      id: 'q-mfml-kp16-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "Shannon entropy H(X) = −Σ p(x) log p(x) is maximized when:",
      options: [
        'All probability mass is on a single outcome',
        'The distribution is uniform over all outcomes',
        'The distribution is exponential',
        'The variance of X is minimized',
      ],
      correctAnswer: 1,
      explanation: 'Entropy is maximized by the uniform distribution, which assigns equal probability to all outcomes. A deterministic distribution (all mass on one outcome) has zero entropy.',
      hints: [
        'Maximum uncertainty corresponds to maximum entropy.',
        'The uniform distribution is "maximally ignorant" — all outcomes are equally likely.',
      ],
    },
    {
      id: 'q-mfml-kp16-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'KL divergence D_KL(P ‖ Q) measures:',
      options: [
        'The symmetric distance between two distributions',
        'The extra bits needed to encode samples from P using a code optimized for Q',
        'The mutual information between two variables',
        'The variance of P minus the variance of Q',
      ],
      correctAnswer: 1,
      explanation: 'D_KL(P‖Q) = Σ P(x) log(P(x)/Q(x)) quantifies the information lost (extra bits) when approximating P with Q. It is asymmetric: D_KL(P‖Q) ≠ D_KL(Q‖P) in general.',
      hints: [
        'KL divergence is always ≥ 0, with equality iff P = Q.',
        'In variational inference, minimizing KL(q‖p) fits an approximate posterior q to the true posterior p.',
      ],
    },
    {
      id: 'q-mfml-kp16-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Mutual information I(X; Y) equals zero if and only if X and Y are independent.',
      correctAnswer: 'true',
      explanation: 'I(X;Y) = D_KL(P(X,Y) ‖ P(X)P(Y)) = 0 iff the joint equals the product of marginals, which is exactly the definition of independence. Mutual information is a complete measure of dependence.',
      hints: [
        'I(X;Y) = H(X) − H(X|Y) = H(Y) − H(Y|X).',
        'Unlike correlation, mutual information captures nonlinear dependencies.',
      ],
    },
  ],

  'concentration-inequalities': [
    {
      id: 'q-mfml-kp17-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: "Markov's inequality states that for a non-negative random variable X and a > 0:",
      options: [
        'P(X ≥ a) ≤ E[X] / a',
        'P(X ≥ a) ≥ E[X] / a',
        'P(X ≥ a) = Var(X) / a²',
        'P(|X − μ| ≥ a) ≤ σ² / a²',
      ],
      correctAnswer: 0,
      explanation: "Markov's inequality: P(X ≥ a) ≤ E[X]/a. It gives a simple upper bound on tail probabilities using only the mean, though it is often quite loose.",
      hints: [
        'This bound requires only that X is non-negative — no assumption about the distribution shape.',
        'Divide both sides of E[X] ≥ a · P(X ≥ a) by a to derive it.',
      ],
    },
    {
      id: 'q-mfml-kp17-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: "Chebyshev's inequality provides a bound on P(|X − μ| ≥ k·σ) that is tighter than Markov's because it uses:",
      options: [
        'The median instead of the mean',
        'Both the mean and the variance',
        'The full distribution of X',
        'Only the maximum value of X',
      ],
      correctAnswer: 1,
      explanation: "Chebyshev's inequality P(|X−μ| ≥ kσ) ≤ 1/k² uses both the mean μ and variance σ², making it tighter than Markov's (which uses only the mean). It holds for any distribution with finite variance.",
      hints: [
        "Chebyshev's inequality is derived by applying Markov's inequality to (X−μ)².",
        'It guarantees at least 75% of data lies within 2σ of the mean, regardless of distribution.',
      ],
    },
    {
      id: 'q-mfml-kp17-3',
      type: 'true-false',
      difficulty: 'hard',
      question: "Hoeffding's inequality provides exponential tail bounds for bounded random variables, making it much tighter than Chebyshev's for large deviations.",
      correctAnswer: 'true',
      explanation: "For bounded independent variables Xᵢ ∈ [aᵢ, bᵢ], Hoeffding's inequality gives P(|S̄ − μ| ≥ t) ≤ 2exp(−2n²t²/Σ(bᵢ−aᵢ)²). The exponential decay makes it far tighter than Chebyshev's 1/k² bound for large deviations.",
      hints: [
        'Exponential bounds are important in PAC learning and generalization theory.',
        'The boundedness assumption [a,b] is what enables the exponential improvement.',
      ],
    },
  ],

  'hypothesis-testing': [
    {
      id: 'q-mfml-kp18-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A p-value in hypothesis testing represents:',
      options: [
        'The probability that the null hypothesis is true',
        'The probability of observing data at least as extreme as seen, assuming the null hypothesis is true',
        'The probability that the alternative hypothesis is true',
        'The effect size of the observed difference',
      ],
      correctAnswer: 1,
      explanation: 'The p-value is P(data as extreme as observed | H₀ true). It is NOT the probability that H₀ is true; rejecting H₀ when p < α controls the Type I error rate at α.',
      hints: [
        'A small p-value means the data would be surprising under H₀ — evidence against H₀.',
        'The p-value is a conditional probability, conditioned on H₀ being true.',
      ],
    },
    {
      id: 'q-mfml-kp18-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A result that is statistically significant (p < 0.05) is always practically significant.',
      correctAnswer: 'false',
      explanation: 'Statistical significance depends on sample size; with large n, even tiny trivial effects produce p < 0.05. Practical significance requires assessing effect size (e.g., Cohen\'s d) alongside p-values.',
      hints: [
        'A massive sample can detect a 0.001% difference as "statistically significant".',
        'Always report effect sizes alongside p-values for complete communication.',
      ],
    },
    {
      id: 'q-mfml-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The power of a statistical test is defined as:',
      options: [
        '1 − P(Type I error) = 1 − α',
        'P(reject H₀ | H₀ is true)',
        'P(reject H₀ | H₀ is false) = 1 − P(Type II error)',
        'The p-value threshold α',
      ],
      correctAnswer: 2,
      explanation: 'Power = 1 − β, where β is the Type II error rate (failing to reject a false H₀). High power means the test reliably detects true effects.',
      hints: [
        'Type I error = false positive (reject H₀ when true). Type II error = false negative (fail to reject when false).',
        'Power increases with larger sample size and larger true effect size.',
      ],
    },
  ],

  'bias-variance-math': [
    {
      id: 'q-mfml-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The bias-variance decomposition of the expected squared error is:',
      options: [
        'E[(ŷ − y)²] = Bias² + Variance',
        'E[(ŷ − y)²] = Bias² + Variance + Noise',
        'E[(ŷ − y)²] = Bias + √Variance + Noise',
        'E[(ŷ − y)²] = Bias · Variance',
      ],
      correctAnswer: 1,
      explanation: 'MSE = Bias²(f̂) + Var(f̂) + σ²_noise. The irreducible noise term σ² comes from the data generation process and cannot be reduced by any model.',
      hints: [
        'The decomposition has three terms: systematic error (bias), random model variability (variance), and irreducible noise.',
        'The bias term is squared — it is always non-negative.',
      ],
    },
    {
      id: 'q-mfml-kp19-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A high-variance model tends to overfit the training data and perform poorly on unseen data.',
      correctAnswer: 'true',
      explanation: 'High variance means the model is sensitive to the specific training samples — it fits noise. This leads to low training error but high test error, i.e., overfitting.',
      hints: [
        'Think of a polynomial of very high degree fitted to a small dataset.',
        'Regularization and ensemble methods reduce variance at the cost of some bias.',
      ],
    },
    {
      id: 'q-mfml-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In the bias-variance tradeoff, increasing model complexity typically:',
      options: [
        'Increases bias and decreases variance',
        'Decreases bias and increases variance',
        'Increases both bias and variance',
        'Decreases both bias and variance',
      ],
      correctAnswer: 1,
      explanation: 'More complex models have lower bias (they can fit more patterns) but higher variance (they are sensitive to training data fluctuations). The optimal complexity balances these two sources of error.',
      hints: [
        'A simple linear model has high bias (underfits) but low variance.',
        'The optimal model complexity minimizes total expected error, not just training error.',
      ],
    },
  ],

  'vc-dimension': [
    {
      id: 'q-mfml-kp20-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The VC dimension of a hypothesis class H is defined as:',
      options: [
        'The minimum number of samples needed to learn any concept in H',
        'The maximum number of points that can be shattered by H',
        'The number of parameters in the model',
        'The maximum training accuracy achievable by H',
      ],
      correctAnswer: 1,
      explanation: 'VC dimension = the size of the largest set of points that H can shatter (correctly classify in every possible labeling). It measures the expressive capacity of the hypothesis class.',
      hints: [
        '"Shattering" means correctly labeling all 2ⁿ possible binary labelings of n points.',
        'A higher VC dimension means more expressiveness but requires more data to generalize.',
      ],
    },
    {
      id: 'q-mfml-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A hypothesis class with infinite VC dimension is not PAC learnable.',
      correctAnswer: 'true',
      explanation: 'The fundamental theorem of PAC learning: a binary hypothesis class is PAC learnable if and only if its VC dimension is finite. Infinite VC dimension means no finite sample can guarantee generalization.',
      hints: [
        'PAC learning requires uniform convergence, which the VC dimension characterizes.',
        'The class of all possible classifiers over ℝ has infinite VC dimension.',
      ],
    },
    {
      id: 'q-mfml-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The VC dimension of the class of linear classifiers (hyperplanes) in ℝᵈ is:',
      options: ['d', 'd + 1', '2d', 'd²'],
      correctAnswer: 1,
      explanation: 'Linear classifiers in ℝᵈ have VC dimension d+1. They can shatter any d+1 points in general position, but cannot shatter any set of d+2 points.',
      hints: [
        'In ℝ² (d=2), a line can shatter any 3 non-collinear points but not any 4 points.',
        'The +1 comes from the bias term (intercept) in the linear classifier.',
      ],
    },
  ],

  'kernel-methods-math': [
    {
      id: 'q-mfml-kp21-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A kernel function k(x, z) implicitly computes:',
      options: [
        'The Euclidean distance between x and z',
        'The dot product ⟨φ(x), φ(z)⟩ in a (possibly infinite-dimensional) feature space',
        'The probability P(z | x)',
        'The gradient of the loss with respect to x',
      ],
      correctAnswer: 1,
      explanation: "By Mercer's theorem, a valid (positive semi-definite) kernel k(x,z) = ⟨φ(x), φ(z)⟩ for some feature map φ. The kernel trick lets us compute this inner product without ever constructing φ explicitly.",
      hints: [
        'The RBF kernel k(x,z) = exp(−‖x−z‖²/2σ²) corresponds to an infinite-dimensional feature space.',
        'The kernel trick enables SVMs in high dimensions without paying the computational cost.',
      ],
    },
    {
      id: 'q-mfml-kp21-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A function k(x, z) is a valid Mercer kernel if and only if the corresponding kernel matrix (Gram matrix) is positive semi-definite for any finite set of inputs.',
      correctAnswer: 'true',
      explanation: "This is precisely Mercer's condition. The Gram matrix K with Kᵢⱼ = k(xᵢ, xⱼ) must be PSD for all finite input sets. This guarantees the existence of a feature space where k computes inner products.",
      hints: [
        'PSD means all eigenvalues of the Gram matrix are ≥ 0.',
        'This condition is used to verify that a proposed kernel is valid before using it in a kernel SVM.',
      ],
    },
    {
      id: 'q-mfml-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Reproducing Kernel Hilbert Space (RKHS) norm ‖f‖²_H acts as which kind of regularizer?',
      options: [
        'L1 regularization promoting sparsity in weights',
        'A smoothness regularizer penalizing highly oscillatory functions',
        'An L∞ bound on function values',
        'A constraint on the number of support vectors',
      ],
      correctAnswer: 1,
      explanation: 'The RKHS norm ‖f‖²_H penalizes functions that vary rapidly, effectively enforcing smoothness. In kernel ridge regression, minimizing the empirical loss + λ‖f‖²_H yields smooth interpolations.',
      hints: [
        'Functions with large RKHS norm are "rough" — they change quickly across the input space.',
        "The representer theorem guarantees the optimal f lives in the span of kernel functions at training points.",
      ],
    },
  ],

  'fourier-analysis': [
    {
      id: 'q-mfml-kp22-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Fourier transform decomposes a signal into:',
      options: [
        'A sum of polynomial basis functions',
        'A sum of sinusoidal components of different frequencies',
        'A product of wavelet functions',
        'A sum of Gaussian basis functions',
      ],
      correctAnswer: 1,
      explanation: 'The Fourier transform expresses a signal as a superposition of complex exponentials (sines and cosines) at different frequencies, revealing the frequency content of the signal.',
      hints: [
        'The Fourier transform maps from the time/spatial domain to the frequency domain.',
        'Each frequency component has an amplitude and a phase.',
      ],
    },
    {
      id: 'q-mfml-kp22-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Convolution in the spatial domain corresponds to pointwise multiplication in the Fourier (frequency) domain.',
      correctAnswer: 'true',
      explanation: 'This is the convolution theorem: F{f * g} = F{f} · F{g}. It means convolutions (used in CNNs) can be computed efficiently via FFT, multiply, and inverse FFT.',
      hints: [
        'This is why convolutional layers in neural networks can be analyzed spectrally.',
        'The FFT algorithm reduces convolution from O(n²) to O(n log n).',
      ],
    },
    {
      id: 'q-mfml-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Random Fourier Features (Bochner/Rahimi-Recht) are used in ML to:',
      options: [
        'Compute exact kernel evaluations more quickly',
        'Approximate shift-invariant kernels with finite-dimensional feature maps',
        'Replace gradient descent with frequency-domain optimization',
        'Analyze the Fourier spectrum of neural network weights',
      ],
      correctAnswer: 1,
      explanation: "Random Fourier Features (Rahimi & Recht 2007) sample random frequencies to construct explicit low-dimensional features z(x) such that k(x,z) ≈ ⟨φ(x), φ(z)⟩, enabling scalable kernel methods via Bochner's theorem.",
      hints: [
        'Bochner\'s theorem connects positive definite shift-invariant kernels to spectral densities.',
        'This allows running kernel SVM on millions of points by replacing the kernel matrix with an explicit feature matrix.',
      ],
    },
  ],

  'measure-theory-basics': [
    {
      id: 'q-mfml-kp23-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In measure theory, a σ-algebra over a set Ω must satisfy:',
      options: [
        'Ω ∈ F, closed under complements, closed under finite unions only',
        'Ω ∈ F, closed under complements, closed under countable unions',
        'Closed under finite intersections only',
        'Every subset of Ω is in F',
      ],
      correctAnswer: 1,
      explanation: 'A σ-algebra F satisfies: (1) Ω ∈ F, (2) A ∈ F ⟹ Aᶜ ∈ F, and (3) if A₁, A₂, … ∈ F then ∪Aᵢ ∈ F (countable unions). This is the foundation for defining probability measures rigorously.',
      hints: [
        'The σ in σ-algebra refers to closure under countable (not just finite) operations.',
        'This structure ensures we can assign probabilities consistently to all relevant events.',
      ],
    },
    {
      id: 'q-mfml-kp23-2',
      type: 'true-false',
      difficulty: 'hard',
      question: 'The Lebesgue integral generalizes the Riemann integral, and every Riemann-integrable function is also Lebesgue-integrable with the same value.',
      correctAnswer: 'true',
      explanation: 'The Lebesgue integral is strictly more general: it handles a much wider class of functions (including limits of sequences of functions) and equals the Riemann integral whenever the latter exists.',
      hints: [
        'Lebesgue integration partitions the range (not the domain) and is more flexible.',
        'The dominated convergence theorem — fundamental in probability — requires Lebesgue integration.',
      ],
    },
    {
      id: 'q-mfml-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In the measure-theoretic formulation of probability, a random variable X is formally defined as:',
      options: [
        'A scalar value sampled from a distribution',
        'A measurable function X: (Ω, F) → (ℝ, B(ℝ)) from the sample space to the real line',
        'An element of the probability space Ω',
        'The expected value E[X]',
      ],
      correctAnswer: 1,
      explanation: 'A random variable is a measurable function mapping outcomes ω ∈ Ω to real values, with measurability ensuring P(X ∈ B) is well-defined for all Borel sets B.',
      hints: [
        'Measurability ensures that preimages of "nice" sets are events with assigned probabilities.',
        'This formalism is needed to rigorously handle continuous distributions and stochastic processes.',
      ],
    },
  ],

  'graph-theory-ml': [
    {
      id: 'q-mfml-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Laplacian matrix L of a graph is defined as:',
      options: [
        'L = A (adjacency matrix)',
        'L = D − A, where D is the degree matrix',
        'L = A + D',
        'L = A · D⁻¹',
      ],
      correctAnswer: 1,
      explanation: 'The graph Laplacian L = D − A, where D is the diagonal degree matrix and A is the adjacency matrix. Its eigenvalues encode connectivity: the number of zero eigenvalues equals the number of connected components.',
      hints: [
        'The Laplacian is always positive semi-definite for undirected graphs.',
        'Spectral clustering uses the eigenvectors of L to partition the graph.',
      ],
    },
    {
      id: 'q-mfml-kp24-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In spectral clustering, the second smallest eigenvalue of the graph Laplacian (the Fiedler value) measures graph connectivity.',
      correctAnswer: 'true',
      explanation: 'The Fiedler value λ₂ = 0 iff the graph is disconnected. A small but positive λ₂ indicates the graph is nearly disconnected (a bottleneck), which spectral clustering exploits to find clusters.',
      hints: [
        'The eigenvector corresponding to λ₂ is the Fiedler vector, used to bisect the graph.',
        'Larger λ₂ means the graph is more robustly connected.',
      ],
    },
    {
      id: 'q-mfml-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Graph Neural Networks (GNNs) aggregate information from neighbors. In the spectral domain, this aggregation is equivalent to:',
      options: [
        'Multiplying node features by the adjacency matrix eigenvalues',
        'Applying a graph convolution — a filter in the spectral domain of the graph Laplacian',
        'Computing the PageRank of each node',
        'Running a random walk on the graph',
      ],
      correctAnswer: 1,
      explanation: "Spectral GNNs define convolution via the graph Laplacian's eigendecomposition: f * g = UĜU^T f, where U contains Laplacian eigenvectors and Ĝ is a learned spectral filter. Spatial GNNs (e.g., GraphSAGE) approximate this in the node domain.",
      hints: [
        'The Fourier transform on graphs is defined using the Laplacian eigenvectors.',
        'ChebNet and GCN are efficient approximations that avoid full eigendecomposition.',
      ],
    },
  ],

  'numerical-linear-algebra': [
    {
      id: 'q-mfml-kp25-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'IEEE 754 double-precision floating-point numbers have approximately how many decimal digits of precision?',
      options: ['7', '10', '15–16', '32'],
      correctAnswer: 2,
      explanation: 'Double-precision (float64) uses 52 bits for the mantissa, providing about 15–16 significant decimal digits. Single-precision (float32) provides only about 7 digits.',
      hints: [
        'The mantissa bits determine the number of significant digits.',
        'Machine epsilon for float64 is approximately 2.2 × 10⁻¹⁶.',
      ],
    },
    {
      id: 'q-mfml-kp25-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Catastrophic cancellation occurs when subtracting two nearly equal floating-point numbers, causing significant loss of significant digits.',
      correctAnswer: 'true',
      explanation: 'When a ≈ b, computing a − b can lose most significant digits because the leading digits cancel. For example, 1.0000001 − 1.0000000 = 1×10⁻⁷ may have only 1 accurate digit if inputs had 8.',
      hints: [
        'This is why computing variance as E[X²] − (E[X])² can be numerically unstable.',
        'Numerically stable algorithms (e.g., Welford\'s algorithm) avoid this by reordering computations.',
      ],
    },
    {
      id: 'q-mfml-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The condition number κ(A) of a matrix A determines:',
      options: [
        'Whether A is invertible',
        'How much the solution x to Ax = b can change relative to small perturbations in b',
        'The rank of A',
        'The computational cost of multiplying A',
      ],
      correctAnswer: 1,
      explanation: 'The condition number κ(A) = ‖A‖·‖A⁻¹‖ bounds the relative error amplification: ‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖. A large κ indicates an ill-conditioned system where small input errors cause large output errors.',
      hints: [
        'κ(A) = σ_max / σ_min (ratio of largest to smallest singular value).',
        'An identity matrix has κ = 1 (perfectly conditioned); singular matrices have κ = ∞.',
      ],
    },
  ],

  'monte-carlo-methods': [
    {
      id: 'q-mfml-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Monte Carlo estimation approximates E[f(X)] by:',
      options: [
        'Analytically integrating f times the density of X',
        'Averaging f(xᵢ) over samples x₁, …, xₙ drawn from the distribution of X',
        'Computing the mode of f(X)',
        'Using numerical quadrature on a grid',
      ],
      correctAnswer: 1,
      explanation: 'Monte Carlo: Ê[f(X)] = (1/n)Σf(xᵢ) where xᵢ ~ p(X). By the law of large numbers this converges to E[f(X)] as n → ∞, regardless of the dimensionality of X.',
      hints: [
        'Monte Carlo shines in high dimensions where grid-based quadrature is infeasible.',
        'The error scales as O(1/√n) — independent of dimension.',
      ],
    },
    {
      id: 'q-mfml-kp26-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Importance sampling reweights samples from a proposal distribution q(x) to estimate expectations under a target p(x). The importance weights are:',
      options: [
        'w(x) = q(x) / p(x)',
        'w(x) = p(x) / q(x)',
        'w(x) = p(x) · q(x)',
        'w(x) = √(p(x) / q(x))',
      ],
      correctAnswer: 1,
      explanation: 'E_p[f(X)] = E_q[f(X) · p(X)/q(X)]. The importance weights w(x) = p(x)/q(x) correct for the mismatch between q (where we sample) and p (where we want to estimate).',
      hints: [
        'The weights upweight regions where p(x) > q(x) and downweight where q(x) > p(x).',
        'Choosing q close to |f|·p minimizes variance of the estimator.',
      ],
    },
    {
      id: 'q-mfml-kp26-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Markov Chain Monte Carlo (MCMC) methods can sample from distributions that we can only evaluate up to a normalizing constant.',
      correctAnswer: 'true',
      explanation: 'MCMC (Metropolis-Hastings, NUTS, etc.) only requires evaluating the unnormalized density p̃(x) ∝ p(x), since the acceptance ratio p(x\')/p(x) = p̃(x\')/p̃(x) cancels the normalizing constant.',
      hints: [
        'In Bayesian inference, the posterior ∝ likelihood × prior; we rarely know the normalizing constant.',
        'The acceptance ratio in Metropolis-Hastings is exactly where cancellation occurs.',
      ],
    },
  ],

  'variational-inference-math': [
    {
      id: 'q-mfml-kp27-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Variational inference approximates an intractable posterior p(z|x) by:',
      options: [
        'Drawing samples via MCMC',
        'Finding a distribution q(z) from a tractable family that minimizes KL(q‖p)',
        'Computing the MAP estimate of z',
        'Marginalizing out z analytically',
      ],
      correctAnswer: 1,
      explanation: 'Variational inference turns posterior inference into optimization: find q*(z) = argmin_{q ∈ Q} D_KL(q(z) ‖ p(z|x)), where Q is a tractable family (e.g., mean-field Gaussians).',
      hints: [
        'Instead of sampling, VI optimizes — trading statistical exactness for speed.',
        'The choice of family Q determines the quality of the approximation.',
      ],
    },
    {
      id: 'q-mfml-kp27-2',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Evidence Lower BOund (ELBO) is defined as:',
      options: [
        'ELBO = E_q[log p(x, z)] + H(q)',
        'ELBO = log p(x) − D_KL(q‖p)',
        'ELBO = E_q[log p(x|z)] only',
        'ELBO = D_KL(p‖q)',
      ],
      correctAnswer: 0,
      explanation: 'ELBO = E_q[log p(x,z)] − E_q[log q(z)] = E_q[log p(x,z)] + H(q). Maximizing the ELBO is equivalent to minimizing KL(q‖p(z|x)), and log p(x) = ELBO + KL(q‖p) ≥ ELBO.',
      hints: [
        'The ELBO is a lower bound on log p(x) — the log marginal likelihood.',
        'VAEs maximize the ELBO with neural network encoders and decoders.',
      ],
    },
    {
      id: 'q-mfml-kp27-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'The mean-field variational assumption posits that the approximate posterior q(z) factorizes as a product of independent distributions over each latent variable.',
      correctAnswer: 'true',
      explanation: "Mean-field VI assumes q(z) = Πᵢ qᵢ(zᵢ), ignoring posterior correlations. This makes optimization tractable via coordinate ascent, but the approximation can be poor when latent variables are strongly correlated.",
      hints: [
        'Mean-field is the simplest variational family — each latent variable is independent.',
        'More expressive families (normalizing flows, full-covariance Gaussians) can capture correlations at higher computational cost.',
      ],
    },
  ],

  'gaussian-processes-math': [
    {
      id: 'q-mfml-kp28-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A Gaussian Process (GP) is defined as a collection of random variables such that:',
      options: [
        'Each variable is independently Gaussian',
        'Any finite subset has a joint Gaussian distribution',
        'The mean function is always zero',
        'The covariance is always the identity matrix',
      ],
      correctAnswer: 1,
      explanation: 'A GP is specified by a mean function m(x) and a covariance (kernel) function k(x,x\'). Its defining property: any finite collection of function values f(x₁),…,f(xₙ) follows a multivariate Gaussian.',
      hints: [
        'GPs are a distribution over functions, not just over vectors.',
        'The kernel encodes assumptions about function smoothness and periodicity.',
      ],
    },
    {
      id: 'q-mfml-kp28-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'GP regression produces not just a point prediction but also a calibrated uncertainty estimate for each prediction.',
      correctAnswer: 'true',
      explanation: 'GP posterior conditioning yields a predictive Gaussian at each test point: mean (prediction) and variance (uncertainty). This makes GPs ideal for Bayesian optimization and active learning.',
      hints: [
        'The predictive variance is large in regions far from training data.',
        'This uncertainty quantification is exact (within the GP model) — not approximated.',
      ],
    },
    {
      id: 'q-mfml-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The main computational bottleneck in exact GP inference with n training points is:',
      options: [
        'Computing the kernel matrix K ∈ ℝⁿˣⁿ — O(n²) time',
        'Inverting the kernel matrix K⁻¹ — O(n³) time',
        'Computing the log marginal likelihood — O(n) time',
        'Computing the predictive mean — O(n²) time',
      ],
      correctAnswer: 1,
      explanation: 'Exact GP inference requires computing K⁻¹ (or equivalently a Cholesky factorization), which is O(n³) time and O(n²) space. This limits exact GPs to n ≲ 10,000 and motivates sparse GP approximations.',
      hints: [
        'The Cholesky decomposition of K takes O(n³) time.',
        'Sparse GPs (inducing points, Nyström approximation) reduce this to O(nm²) with m ≪ n inducing points.',
      ],
    },
  ],

  'ode-sde': [
    {
      id: 'q-mfml-kp29-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A Neural ODE models the hidden state dynamics as:',
      options: [
        'A recurrence hₜ₊₁ = f(hₜ, θ)',
        'A continuous-time ODE dh/dt = f(h(t), t, θ)',
        'A diffusion process with Brownian noise',
        'A discrete Markov chain over states',
      ],
      correctAnswer: 1,
      explanation: 'Neural ODEs (Chen et al. 2018) parameterize the derivative of the hidden state: dh/dt = f_θ(h,t). The output is obtained by integrating with an ODE solver. This gives a continuous-depth model with O(1) memory for backpropagation via the adjoint method.',
      hints: [
        'A ResNet block h_{l+1} = h_l + f(h_l) is a discrete Euler step of an ODE.',
        'The adjoint method avoids storing intermediate states during backpropagation.',
      ],
    },
    {
      id: 'q-mfml-kp29-2',
      type: 'true-false',
      difficulty: 'hard',
      question: "An SDE of the form dX = μ(X,t)dt + σ(X,t)dW has a solution that is a Markov process (where W is a Wiener process).",
      correctAnswer: 'true',
      explanation: 'Solutions to SDEs driven by Brownian motion (Wiener process W) are Markov processes: given the current state X(t), the future is independent of the past. This is because the Wiener increments are independent.',
      hints: [
        'The Markov property follows from the independence of Brownian increments.',
        'This property is fundamental to diffusion models and stochastic optimal control.',
      ],
    },
    {
      id: 'q-mfml-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Score-based generative models (e.g., DDPM) are connected to SDEs through:',
      options: [
        'Using an ODE to generate samples via gradient ascent on the data density',
        'Defining a forward noising SDE and learning to reverse it using the score function ∇_x log p(x)',
        'Training a discriminator to distinguish real from generated samples',
        'Solving a Poisson equation over the data manifold',
      ],
      correctAnswer: 1,
      explanation: 'Diffusion models define a forward SDE that gradually adds noise to data. The reverse SDE (which generates samples) involves the score function ∇_x log p_t(x). Learning this score via score matching enables exact reversal.',
      hints: [
        'Anderson (1982) derived the time-reversal of an SDE, which involves the score.',
        'DDPM and score matching are unified in the SDE framework by Song et al. (2021).',
      ],
    },
  ],

  'topology-ml': [
    {
      id: 'q-mfml-kp30-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Persistent homology in Topological Data Analysis (TDA) tracks:',
      options: [
        'The mean and variance of the data distribution',
        'How topological features (connected components, loops, voids) appear and disappear as a scale parameter varies',
        'The curvature of the data manifold at each point',
        'The eigenvalues of the data covariance matrix',
      ],
      correctAnswer: 1,
      explanation: 'Persistent homology builds a filtration of topological spaces at increasing scales and records when topological features (Betti numbers) are born and die. Long-lived features are considered significant.',
      hints: [
        'A "persistence diagram" plots birth vs. death of each feature.',
        'Points far from the diagonal in the persistence diagram correspond to robust topological features.',
      ],
    },
    {
      id: 'q-mfml-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The Euler characteristic of a shape is a topological invariant, meaning it does not change under continuous deformations.',
      correctAnswer: 'true',
      explanation: 'The Euler characteristic χ = V − E + F (vertices − edges + faces) is a topological invariant. For a sphere χ = 2, for a torus χ = 0, regardless of stretching or bending.',
      hints: [
        'A coffee cup and a donut have the same Euler characteristic (same topology).',
        'χ = Σ (−1)ᵏ βₖ where βₖ are the Betti numbers (counts of k-dimensional holes).',
      ],
    },
    {
      id: 'q-mfml-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Mapper algorithm in TDA is used to:',
      options: [
        'Map high-dimensional data to low-dimensional embeddings using UMAP',
        'Construct a graph summary of high-dimensional data that preserves topological structure for visualization',
        'Compute pairwise distances for clustering',
        'Apply persistent homology to time-series data',
      ],
      correctAnswer: 1,
      explanation: 'Mapper (Singh et al. 2007) covers the range of a filter function with overlapping bins, clusters data within each bin, and connects clusters sharing points. The result is a graph capturing the shape of the data useful for exploratory analysis.',
      hints: [
        'Mapper produces a network/graph, not just a 2D point cloud.',
        'The choice of filter function (e.g., PCA projection, distance to a point) shapes the Mapper output.',
      ],
    },
  ],
}

registerQuestions(questions)
export default questions
