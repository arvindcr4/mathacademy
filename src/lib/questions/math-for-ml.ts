import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "vectors-matrices": [
    {
      id: "q-mfml-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A rank-1 tensor is formally defined as a tensor requiring exactly one index to address each element. Which of the following is a rank-1 tensor?",
      options: [
        "A scalar (single number requiring zero indices)",
        "A vector such as [3, 1, 4] (requiring one index)",
        "A matrix such as [[1,2],[3,4]] (requiring two indices)",
        "A 3-D array (requiring three indices)",
      ],
      correctAnswer: 1,
      explanation:
        "In tensor notation, rank (order) equals the number of indices needed. A vector x ∈ ℝⁿ is addressed by a single index xᵢ — making it rank-1. Scalars are rank-0, matrices rank-2.",
      hints: [
        "Count the number of indices needed: scalar needs 0, vector needs 1, matrix needs 2.",
        'Rank here means "number of axes", not the matrix rank (dimension of column space).',
      ],
    },
    {
      id: "q-mfml-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Given u = [1, 2, 3] and v = [4, 0, −1], compute the dot product u · v. The formula is u · v = Σᵢ uᵢvᵢ.",
      options: ["1", "2", "3", "5"],
      correctAnswer: 0,
      explanation:
        "u · v = 1×4 + 2×0 + 3×(−1) = 4 + 0 − 3 = 1. Only the first and third terms are nonzero.",
      hints: [
        "Multiply element-wise: (1)(4) = 4, (2)(0) = 0, (3)(−1) = −3.",
        "Sum the products: 4 + 0 + (−3) = 1.",
      ],
    },
    {
      id: "q-mfml-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Matrix A has shape (3 × 4) and matrix B has shape (4 × 2). The product AB has shape:",
      options: ["4 × 4", "3 × 2", "4 × 2", "3 × 4"],
      correctAnswer: 1,
      explanation:
        "For AB to be defined, the inner dimensions must match: A is (m × k) = (3 × 4) and B is (k × p) = (4 × 2). The result has shape (m × p) = (3 × 2). The inner dimension k = 4 is consumed.",
      hints: [
        'Rule: (m × k) × (k × p) = (m × p). The "inner" k must match.',
        "Outer dimensions 3 and 2 survive; inner dimension 4 is consumed by the dot products.",
      ],
    },
  ],

  "matrix-operations": [
    {
      id: "q-mfml-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Let A = [[1, 2], [0, 1]] and B = [[1, 0], [3, 1]]. Compute AB and BA. What does this illustrate?",
      options: [
        "AB = BA, so matrix multiplication is commutative",
        "AB ≠ BA in general, so matrix multiplication is not commutative",
        "AB = BA only when both matrices are square",
        "AB and BA are always transposes of each other",
      ],
      correctAnswer: 1,
      explanation:
        "AB = [[7,2],[3,1]] and BA = [[1,2],[3,7]]. Since AB ≠ BA, matrix multiplication is not commutative. However it is always associative: (AB)C = A(BC).",
      hints: [
        "AB: row 1 of A dotted with cols of B gives [1·1+2·3, 1·0+2·1] = [7,2]. Row 2: [0+3, 0+1] = [3,1].",
        "BA: row 1 of B dotted with cols of A gives [1,2]. Row 2: [3·1+1·0, 3·2+1·1] = [3,7].",
      ],
    },
    {
      id: "q-mfml-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A linear map T: ℝⁿ → ℝᵐ is represented as multiplication by a matrix A. What is the shape of A?",
      options: ["n × m", "m × n", "n × n", "m × m"],
      correctAnswer: 1,
      explanation:
        "For Ax to be defined when x ∈ ℝⁿ, A must have n columns. Since Ax ∈ ℝᵐ, A must have m rows. So A has shape m × n.",
      hints: [
        "x ∈ ℝⁿ means x is a column vector with n entries → A needs n columns.",
        "The output Ax ∈ ℝᵐ → A needs m rows. Shape: m × n.",
      ],
    },
    {
      id: "q-mfml-kp2-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "If A and B are both invertible n × n matrices, then (AB)⁻¹ = A⁻¹B⁻¹.",
      correctAnswer: "False",
      explanation:
        'The correct formula is (AB)⁻¹ = B⁻¹A⁻¹ — order reverses. Verify: (AB)(B⁻¹A⁻¹) = A(BB⁻¹)A⁻¹ = AIA⁻¹ = I. The "socks before shoes" rule: to undo AB, first undo B then undo A.',
      hints: [
        "Try multiplying AB by B⁻¹A⁻¹ and check if you get I.",
        "Think of putting on socks (A) then shoes (B): to reverse, remove shoes (B⁻¹) first, then socks (A⁻¹).",
      ],
    },
  ],

  "eigenvalues-eigenvectors": [
    {
      id: "q-mfml-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For matrix A = [[2, 1], [1, 2]], find the eigenvalues by solving det(A − λI) = 0.",
      options: [
        "λ = 1 and λ = 3",
        "λ = 2 and λ = 2",
        "λ = 0 and λ = 4",
        "λ = −1 and λ = 3",
      ],
      correctAnswer: 0,
      explanation:
        "det(A − λI) = det([[2−λ, 1],[1, 2−λ]]) = (2−λ)² − 1 = λ² − 4λ + 3 = (λ−1)(λ−3) = 0. So λ₁ = 1, λ₂ = 3.",
      hints: [
        "Form A − λI = [[2−λ, 1],[1, 2−λ]] and compute its determinant: (2−λ)² − 1·1.",
        "Expand: (2−λ)² − 1 = 4 − 4λ + λ² − 1 = λ² − 4λ + 3. Factor as (λ−1)(λ−3).",
      ],
    },
    {
      id: "q-mfml-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Spectral Theorem states that for a real symmetric matrix A, there exists an orthogonal matrix Q such that A = QΛQᵀ where Λ is diagonal. What are the diagonal entries of Λ?",
      options: [
        "The singular values of A",
        "The eigenvalues of A, which are all real",
        "The diagonal entries of A",
        "The entries of the Cholesky factor",
      ],
      correctAnswer: 1,
      explanation:
        "The Spectral Theorem guarantees that every real symmetric matrix has real eigenvalues and orthonormal eigenvectors. Λ = diag(λ₁, …, λₙ) contains the real eigenvalues, and the columns of Q are the corresponding orthonormal eigenvectors.",
      hints: [
        "For A = [[2,1],[1,2]], Λ = diag(1,3) and Q has columns [1/√2, 1/√2]ᵀ and [1/√2, −1/√2]ᵀ.",
        "Symmetry A = Aᵀ forces all eigenvalues to be real and eigenvectors for distinct eigenvalues to be orthogonal.",
      ],
    },
    {
      id: "q-mfml-kp3-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Every n × n square matrix can be diagonalized over the real numbers.",
      correctAnswer: "False",
      explanation:
        "Diagonalization requires n linearly independent eigenvectors. The matrix A = [[1,1],[0,1]] has characteristic polynomial (1−λ)² = 0, so λ = 1 with algebraic multiplicity 2, but only one independent eigenvector [1,0]ᵀ. It cannot be diagonalized over ℝ.",
      hints: [
        "Check A = [[1,1],[0,1]]: det(A−λI) = (1−λ)². Solving gives λ = 1 only. Then A−I = [[0,1],[0,0]] has null space spanned by [1,0]ᵀ — only one eigenvector.",
        "A matrix is diagonalizable iff algebraic multiplicity = geometric multiplicity for each eigenvalue.",
      ],
    },
  ],

  svd: [
    {
      id: "q-mfml-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the SVD A = UΣVᵀ of an m × n matrix A (m ≥ n), which statement correctly describes U, Σ, V?",
      options: [
        "U is n × n orthogonal, Σ is m × n diagonal, V is m × m orthogonal",
        "U is m × m orthogonal (left singular vectors), Σ is m × n diagonal (singular values on diagonal), V is n × n orthogonal (right singular vectors)",
        "U contains eigenvalues, Σ contains eigenvectors",
        "U = V for symmetric matrices",
      ],
      correctAnswer: 1,
      explanation:
        "SVD: A = UΣVᵀ where U ∈ ℝᵐˣᵐ is orthogonal with left singular vectors as columns, Σ ∈ ℝᵐˣⁿ has singular values σ₁ ≥ σ₂ ≥ … ≥ 0 on its diagonal, and V ∈ ℝⁿˣⁿ is orthogonal with right singular vectors as columns.",
      hints: [
        "The singular values σᵢ = √(eigenvalues of AᵀA) appear in decreasing order on the diagonal of Σ.",
        "Left singular vectors (cols of U) are eigenvectors of AAᵀ; right singular vectors (cols of V) are eigenvectors of AᵀA.",
      ],
    },
    {
      id: "q-mfml-kp4-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The matrix A = [[3,0],[0,2],[0,0]] has SVD with singular values σ₁ = 3, σ₂ = 2. Its best rank-1 approximation A₁ has Frobenius-norm error ‖A − A₁‖_F equal to:",
      options: ["3", "2", "√13", "1"],
      correctAnswer: 1,
      explanation:
        "By the Eckart–Young theorem, the rank-1 truncated SVD minimizes the Frobenius norm error. The error is ‖A − A₁‖_F = √(σ₂² + σ₃² + …) = √(2²) = 2, since σ₃ = 0 here.",
      hints: [
        "‖A‖_F² = Σᵢ σᵢ² = 3² + 2² = 9 + 4 = 13. Keeping rank-1 uses σ₁=3, discarding σ₂=2.",
        "Error² = σ₂² = 4, so error = 2.",
      ],
    },
    {
      id: "q-mfml-kp4-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The singular values of any matrix A are always non-negative real numbers.",
      correctAnswer: "True",
      explanation:
        "Singular values σᵢ = √(λᵢ(AᵀA)). Since AᵀA is positive semi-definite, all its eigenvalues λᵢ ≥ 0, so σᵢ = √λᵢ ≥ 0. This holds even for complex matrices (using A*A).",
      hints: [
        "AᵀA is PSD because xᵀ(AᵀA)x = ‖Ax‖² ≥ 0 for all x.",
        "Non-negative eigenvalues of AᵀA → non-negative square roots → non-negative singular values.",
      ],
    },
  ],

  "pca-linalg": [
    {
      id: "q-mfml-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Given centered data matrix X̃ ∈ ℝⁿˣᵈ, PCA finds directions of maximum variance by computing eigenvectors of which matrix?",
      options: [
        "X̃ directly (n × d)",
        "The sample covariance matrix C = X̃ᵀX̃/(n−1) ∈ ℝᵈˣᵈ",
        "The Gram matrix X̃X̃ᵀ ∈ ℝⁿˣⁿ",
        "The Hessian of the reconstruction loss",
      ],
      correctAnswer: 1,
      explanation:
        "PCA maximizes variance of projected data. For unit vector w, variance of X̃w is wᵀCw where C = X̃ᵀX̃/(n−1). Maximizing this subject to ‖w‖=1 by Lagrange multipliers gives Cw = λw — an eigenvector problem.",
      hints: [
        "Projection of X̃ onto unit vector w: the projected coordinates are X̃w ∈ ℝⁿ.",
        "Variance of X̃w = (1/(n−1))‖X̃w‖² = wᵀ(X̃ᵀX̃/(n−1))w = wᵀCw. Maximize over ‖w‖=1.",
      ],
    },
    {
      id: "q-mfml-kp5-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "If the covariance matrix C has eigenvalues λ₁ = 5, λ₂ = 3, λ₃ = 2, what fraction of total variance is explained by the first two principal components?",
      options: ["5/10 = 50%", "8/10 = 80%", "5/8 = 62.5%", "3/10 = 30%"],
      correctAnswer: 1,
      explanation:
        "Total variance = trace(C) = sum of eigenvalues = 5 + 3 + 2 = 10. The first two PCs capture variance λ₁ + λ₂ = 5 + 3 = 8. Fraction = 8/10 = 80%.",
      hints: [
        "Each eigenvalue equals the variance captured by its corresponding principal component.",
        "Total variance = Σλᵢ = 10. Two-PC variance = 5+3 = 8. Ratio = 8/10.",
      ],
    },
    {
      id: "q-mfml-kp5-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The principal components returned by PCA are always orthogonal to each other.",
      correctAnswer: "True",
      explanation:
        "The covariance matrix C is real and symmetric, so by the Spectral Theorem its eigenvectors can be chosen to be orthonormal. Principal components are these eigenvectors, so they are mutually orthogonal: PCᵢ · PCⱼ = 0 for i ≠ j.",
      hints: [
        "The Spectral Theorem: real symmetric matrices have orthonormal eigenvectors.",
        "Orthogonality ensures PCs capture independent, non-redundant directions of variance.",
      ],
    },
  ],

  "probability-basics": [
    {
      id: "q-mfml-kp6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A fair six-sided die is rolled. Let A = {1,2,3} and B = {2,4,6}. Compute P(A ∪ B).",
      options: ["1/2", "2/3", "5/6", "1/3"],
      correctAnswer: 2,
      explanation:
        "P(A) = 3/6 = 1/2, P(B) = 3/6 = 1/2, P(A ∩ B) = P({2}) = 1/6. By inclusion-exclusion: P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 1/2 + 1/2 − 1/6 = 5/6.",
      hints: [
        "A ∩ B = {2} (elements in both A and B). P(A ∩ B) = 1/6.",
        "Inclusion-exclusion: P(A ∪ B) = P(A) + P(B) − P(A ∩ B) = 3/6 + 3/6 − 1/6 = 5/6.",
      ],
    },
    {
      id: "q-mfml-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "If events A and B are mutually exclusive (P(A ∩ B) = 0), then they are also independent (P(A ∩ B) = P(A)·P(B)).",
      correctAnswer: "False",
      explanation:
        "Mutual exclusivity means P(A ∩ B) = 0. Independence requires P(A ∩ B) = P(A)·P(B). These are equal only if P(A) = 0 or P(B) = 0. For a fair die with A = {1,2,3} and B = {4,5,6}: P(A∩B) = 0 but P(A)·P(B) = 1/4 ≠ 0. They are dependent.",
      hints: [
        "Knowing A occurred means B cannot occur — that is informative, violating independence.",
        "Independence: P(B|A) = P(B). But P(B|A) = 0 ≠ 1/2 = P(B) for mutually exclusive events.",
      ],
    },
    {
      id: "q-mfml-kp6-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A disease affects 1% of the population. A test has 90% sensitivity (true positive rate) and 95% specificity (true negative rate). If a random person tests positive, what is the approximate probability they have the disease?",
      options: ["90%", "50%", "15%", "1%"],
      correctAnswer: 2,
      explanation:
        "Using Bayes' theorem: P(disease|+) = P(+|disease)·P(disease) / P(+). P(+) = 0.90×0.01 + 0.05×0.99 = 0.009 + 0.0495 = 0.0585. P(disease|+) = 0.009/0.0585 ≈ 0.154 ≈ 15%.",
      hints: [
        "P(+) = P(+|D)P(D) + P(+|¬D)P(¬D) = 0.90×0.01 + (1−0.95)×0.99.",
        "The base rate (1%) is low, so most positives are false positives even with a good test.",
      ],
    },
  ],

  distributions: [
    {
      id: "q-mfml-kp7-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "X ~ Binomial(n=10, p=0.5). What is P(X = 3)? (Use C(10,3) = 120.)",
      options: ["120/1024 ≈ 0.117", "3/10 = 0.3", "1/10 = 0.1", "0.5³ = 0.125"],
      correctAnswer: 0,
      explanation:
        "P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ. Here P(X=3) = C(10,3)·(0.5)³·(0.5)⁷ = 120·(0.5)¹⁰ = 120/1024 ≈ 0.117.",
      hints: [
        "Binomial PMF: P(X=k) = C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ. With p=0.5: P(X=3) = C(10,3)·(0.5)¹⁰.",
        "C(10,3) = 10!/(3!7!) = 120. (0.5)¹⁰ = 1/1024. Product: 120/1024.",
      ],
    },
    {
      id: "q-mfml-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "If X ~ N(μ, σ²) and Y = aX + b (a, b constants), what is the distribution of Y?",
      options: [
        "Y ~ N(aμ, σ²) — mean shifts but variance unchanged",
        "Y ~ N(aμ + b, a²σ²) — mean and variance both transform",
        "Y ~ N(μ + b, σ²) — only mean shifts by b",
        "Y is no longer Gaussian if a ≠ 1",
      ],
      correctAnswer: 1,
      explanation:
        "Linear transformations of Gaussians are Gaussian. E[Y] = E[aX+b] = aμ+b. Var(Y) = Var(aX+b) = a²Var(X) = a²σ². So Y ~ N(aμ+b, a²σ²). This closure under linear operations is a key property exploited in Kalman filters and GP inference.",
      hints: [
        "E[aX+b] = a·E[X]+b = aμ+b.",
        "Var(aX+b) = a²·Var(X) = a²σ² (adding constant b shifts mean, not variance).",
      ],
    },
    {
      id: "q-mfml-kp7-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The Poisson distribution can be derived as the limit of Binomial(n,p) as n → ∞, p → 0, with np = λ fixed.",
      correctAnswer: "True",
      explanation:
        "As n→∞, p→0 with np=λ: C(n,k)·pᵏ·(1−p)ⁿ⁻ᵏ → e⁻λλᵏ/k!. This is the Poisson PMF. Practically: the Poisson models rare-event counts (λ small) over many trials (n large).",
      hints: [
        "C(n,k)·pᵏ ≈ nᵏpᵏ/k! = λᵏ/k! for large n. And (1−p)ⁿ ≈ (1−λ/n)ⁿ → e⁻λ.",
        "This justifies using Poisson for rare events: website clicks per second, radioactive decays per minute.",
      ],
    },
  ],

  "bayes-theorem": [
    {
      id: "q-mfml-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Bayes' theorem is: P(H | E) = P(E | H) · P(H) / P(E). In ML terms with θ as model parameters and D as data, the posterior P(θ|D) equals:",
      options: [
        "P(θ) / P(D|θ)",
        "P(D|θ) · P(θ) / P(D)",
        "P(D) · P(θ)",
        "P(θ|D) · P(D)",
      ],
      correctAnswer: 1,
      explanation:
        "Posterior ∝ Likelihood × Prior: P(θ|D) = P(D|θ)·P(θ)/P(D). The denominator P(D) = ∫P(D|θ)P(θ)dθ is the marginal likelihood (evidence), which normalizes the posterior to integrate to 1.",
      hints: [
        "Map H → θ (hypothesis/parameters) and E → D (evidence/data).",
        "P(D) is the normalizing constant ensuring the posterior is a valid probability distribution.",
      ],
    },
    {
      id: "q-mfml-kp8-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Bayesian inference for a coin with unknown bias p, you observe 7 heads in 10 flips. With a uniform prior P(p) = 1 on [0,1], the posterior is proportional to:",
      options: [
        "p⁷(1−p)³ (a Beta(8,4) distribution)",
        "7/10 (a point mass at the MLE)",
        "(1−p)⁷p³",
        "1/10 for all p",
      ],
      correctAnswer: 0,
      explanation:
        "With Binomial likelihood P(7H,3T|p) = C(10,7)p⁷(1−p)³ and uniform prior P(p)=1, posterior ∝ p⁷(1−p)³ which is a Beta(8,4) distribution. The posterior mean is 8/(8+4) = 2/3 ≈ 0.667.",
      hints: [
        "Posterior ∝ likelihood × prior = p⁷(1−p)³ × 1 = p⁷(1−p)³.",
        "This matches Beta(α,β) with α = 7+1 = 8, β = 3+1 = 4. Uniform prior = Beta(1,1).",
      ],
    },
    {
      id: "q-mfml-kp8-3",
      type: "true-false",
      difficulty: "hard",
      question: "Bayes' theorem requires the events H and E to be independent.",
      correctAnswer: "False",
      explanation:
        "Bayes' theorem P(H|E) = P(E|H)P(H)/P(E) holds for any events with P(E) > 0, derived purely from the definition of conditional probability: P(H|E)·P(E) = P(H∩E) = P(E|H)·P(H). Independence would make P(H|E) = P(H), making Bayesian updating useless.",
      hints: [
        "Bayes' theorem is derived from: P(H∩E) = P(H|E)P(E) = P(E|H)P(H). No independence assumed.",
        "If H and E were independent, P(H|E) = P(H) — posterior equals prior, meaning data provides no information.",
      ],
    },
  ],

  "expectation-variance": [
    {
      id: "q-mfml-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For X ~ Uniform(0, 4), compute Var(X) using the formula Var(X) = E[X²] − (E[X])².",
      options: ["4/3", "16/3", "4", "2"],
      correctAnswer: 0,
      explanation:
        "E[X] = (0+4)/2 = 2. E[X²] = ∫₀⁴ x²·(1/4)dx = [x³/12]₀⁴ = 64/12 = 16/3. Var(X) = 16/3 − 4 = 16/3 − 12/3 = 4/3. General formula: Var(Uniform(a,b)) = (b−a)²/12 = 16/12 = 4/3. ✓",
      hints: [
        "For Uniform(0,4): E[X] = 2, E[X²] = ∫₀⁴ x²/4 dx = (1/4)[x³/3]₀⁴ = 64/12 = 16/3.",
        "Var(X) = E[X²] − (E[X])² = 16/3 − 4 = 4/3.",
      ],
    },
    {
      id: "q-mfml-kp9-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Random variable X ~ N(0,1) and Y = X². What is Cov(X, Y)?",
      options: ["1", "0", "2", "−1"],
      correctAnswer: 1,
      explanation:
        "Cov(X,Y) = E[XY] − E[X]E[Y] = E[X·X²] − E[X]E[X²] = E[X³] − 0·1 = E[X³]. For N(0,1), all odd moments are 0 by symmetry. So Cov(X,X²) = 0. Yet X and Y = X² are clearly dependent! Zero covariance ≠ independence.",
      hints: [
        "E[X³] = 0 because N(0,1) is symmetric around 0 (odd moments vanish).",
        "X and X² are functionally dependent (knowing X determines Y) but have zero covariance — illustrating that uncorrelated ≠ independent.",
      ],
    },
    {
      id: "q-mfml-kp9-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "For independent random variables X and Y, Var(X + Y) = Var(X) + Var(Y).",
      correctAnswer: "True",
      explanation:
        "Var(X+Y) = Var(X) + 2·Cov(X,Y) + Var(Y). Independence ⟹ Cov(X,Y) = 0 ⟹ Var(X+Y) = Var(X)+Var(Y). For example: X,Y ~ N(0,1) independent ⟹ X+Y ~ N(0,2), and Var(X+Y) = 2 = 1+1 = Var(X)+Var(Y). ✓",
      hints: [
        "General formula: Var(X+Y) = Var(X) + 2Cov(X,Y) + Var(Y).",
        "Independence forces Cov(X,Y) = 0, eliminating the cross-term.",
      ],
    },
  ],

  "mle-map": [
    {
      id: "q-mfml-kp10-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "You observe n i.i.d. samples x₁,…,xₙ from N(μ, σ²) with σ² known. The MLE for μ is:",
      options: [
        "The sample median",
        "x̄ = (1/n)Σxᵢ (the sample mean)",
        "(1/n)Σxᵢ² (the second moment)",
        "max(x₁,…,xₙ)",
      ],
      correctAnswer: 1,
      explanation:
        "Log-likelihood: ℓ(μ) = −n/(2σ²)·Σ(xᵢ−μ)². Taking dℓ/dμ = (1/σ²)Σ(xᵢ−μ) = 0 gives μ̂_MLE = (1/n)Σxᵢ = x̄. The MLE for a Gaussian mean is the sample mean.",
      hints: [
        "Maximize log-likelihood ℓ(μ) = const − (1/2σ²)Σ(xᵢ−μ)².",
        "Differentiate with respect to μ: dℓ/dμ = (1/σ²)Σ(xᵢ−μ) = 0 ⟹ μ̂ = x̄.",
      ],
    },
    {
      id: "q-mfml-kp10-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "MAP estimation with a Gaussian prior N(0, τ²) on weights w is equivalent to which regularized objective?",
      options: [
        "Minimize Σ(yᵢ − wᵀxᵢ)² + (σ²/τ²)‖w‖₁  (L1 regularization)",
        "Minimize Σ(yᵢ − wᵀxᵢ)² + (σ²/τ²)‖w‖²  (L2/ridge regularization)",
        "Minimize Σ(yᵢ − wᵀxᵢ)² with no regularization",
        "Minimize ‖w‖² subject to Σ(yᵢ − wᵀxᵢ)² ≤ ε",
      ],
      correctAnswer: 1,
      explanation:
        "MAP: arg max_w [log P(data|w) + log P(w)]. With Gaussian likelihood and prior N(0,τ²): log P(w) = −‖w‖²/(2τ²) + const. This adds an L2 penalty: minimize Σ(yᵢ−wᵀxᵢ)²/(2σ²) + ‖w‖²/(2τ²), equivalently minimize MSE + λ‖w‖² with λ = σ²/τ².",
      hints: [
        "log P(w) = −w²/(2τ²) for Gaussian prior. A Laplace prior gives L1.",
        "The ratio σ²/τ² controls regularization strength: small τ² (strong prior toward 0) ↔ large λ.",
      ],
    },
    {
      id: "q-mfml-kp10-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The MLE for the variance of a normal distribution, σ̂² = (1/n)Σ(xᵢ−x̄)², is an unbiased estimator.",
      correctAnswer: "False",
      explanation:
        "E[σ̂²_MLE] = (n−1)/n · σ². The MLE divides by n but the unbiased estimator divides by (n−1) (Bessel\'s correction). For n=10: E[σ̂²_MLE] = 0.9σ² — it systematically underestimates by 10%. This is because estimating x̄ from the data uses one degree of freedom.",
      hints: [
        "E[(1/n)Σ(xᵢ−x̄)²] = (n−1)σ²/n ≠ σ². Use s² = (1/(n−1))Σ(xᵢ−x̄)² for unbiasedness.",
        "Dividing by n−1 rather than n corrects for the one degree of freedom lost to estimating the mean.",
      ],
    },
  ],

  "partial-derivatives": [
    {
      id: "q-mfml-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For $f(x,y) = 3x^2y + y^3 - 2x$, compute the gradient $\\nabla f$ at the point $(1, 2)$.",
      options: [
        "$[6xy - 2, 3x^2 + 3y^2] = [10, 15]$ at $(1,2)$",
        "$[6xy - 2, 3x^2 + 3y^2] = [10, 15]$ at $(1,2)$ — correct",
        "$[6x, 3y^2]$ at $(1,2)$",
        "$[3y, 3y^2]$ at $(1,2)$",
      ],
      correctAnswer: 0,
      explanation:
        "The gradient $\\nabla f = \\left[\\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y}\\right]$ collects the partial derivatives.\n\n**Step 1: Compute $\\frac{\\partial f}{\\partial x}$**\nTreat $y$ as a constant and differentiate with respect to $x$:\n\\[\n\\frac{\\partial f}{\\partial x} = \\frac{\\partial}{\\partial x}(3x^2y) + \\frac{\\partial}{\\partial x}(y^3) - \\frac{\\partial}{\\partial x}(2x) = 6xy - 0 - 2 = 6xy - 2.\n\\]\n\n**Step 2: Compute $\\frac{\\partial f}{\\partial y}$**\nTreat $x$ as a constant and differentiate with respect to $y$:\n\\[\n\\frac{\\partial f}{\\partial y} = \\frac{\\partial}{\\partial y}(3x^2y) + \\frac{\\partial}{\\partial y}(y^3) - \\frac{\\partial}{\\partial y}(2x) = 3x^2 + 3y^2 - 0 = 3x^2 + 3y^2.\n\\]\n\n**Step 3: Evaluate at $(1, 2)$**\n\\[\n\\frac{\\partial f}{\\partial x}(1,2) = 6(1)(2) - 2 = 12 - 2 = 10,\n\\quad\n\\frac{\\partial f}{\\partial y}(1,2) = 3(1)^2 + 3(2)^2 = 3 + 12 = 15.\n\\]\n\nTherefore: $\\nabla f(1,2) = [10, 15]$.",
      hints: [
        "Remember: when taking $\\frac{\\partial f}{\\partial x}$, all variables except $x$ are treated as constants.",
        "The power rule for $x^n$ gives $\\frac{\\partial}{\\partial x}(x^n) = nx^{n-1}$, while constants differentiate to zero.",
      ],
    },
    {
      id: "q-mfml-kp11-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "At a local minimum of a differentiable function $f: \\mathbb{R}^n \\to \\mathbb{R}$, the gradient $\\nabla f$ must equal the zero vector.",
      correctAnswer: "True",
      explanation:
        "This is a **necessary condition** (but not sufficient) for a local extremum.\n\n**Why must $\\nabla f = 0$ at a local minimum?**\n\nIf $\\nabla f(x^*) \\neq 0$, then at least one partial derivative is non-zero, say $\\frac{\\partial f}{\\partial x_k} > 0$ at $x^*$. Then moving a small step in the direction $-h_k$ (decreasing $x_k$) would decrease $f$, contradicting $x^*$ being a local minimum:\n\\[\nf(x^* - \\epsilon \\cdot e_k) \\approx f(x^*) - \\epsilon \\cdot \\frac{\\partial f}{\\partial x_k}(x^*) < f(x^*).\n\\]\n\n**Key insight:** $\\nabla f = 0$ defines a **stationary (critical) point**. These can be:\n- Local minima (all directions curve upward)\n- Local maxima (all directions curve downward)\n- Saddle points (some directions curve up, others curve down)\n\nThis is why the first-derivative test is only a necessary condition — you need the second-derivative test (Hessian) to distinguish between these cases.",
      hints: [
        "The gradient points in the direction of steepest ascent. At a minimum, there is no direction of descent, so the gradient must vanish.",
        "Visualize: a bowl-shaped surface has $\\nabla f = 0$ at the bottom point. A saddle point also has $\\nabla f = 0$ but at a 'saddle' where some directions go up and others go down.",
      ],
    },
    {
      id: "q-mfml-kp11-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The gradient of the squared L2 norm $f(x) = \\|x\\|^2 = x^\\top x$ with respect to $x$ is:",
      options: ["$x$", "$2x$", "$x^\\top$", "$2x^\\top x$"],
      correctAnswer: 1,
      explanation:
        "The squared L2 norm is $f(x) = \\|x\\|^2 = x^\\top x = \\sum_{i=1}^{n} x_i^2$.\n\n**Method 1: Element-wise differentiation**\nFor each component $x_k$:\n\\[\n\\frac{\\partial f}{\\partial x_k} = \\frac{\\partial}{\\partial x_k}\\left(\\sum_{i=1}^{n} x_i^2\\right) = 2x_k.\n\\]\nAssembling these into a vector:\n\\[\n\\nabla f = [2x_1, 2x_2, \\ldots, 2x_n]^\\top = 2x.\n\\]\n\n**Method 2: Matrix calculus identity**\nFor a symmetric matrix $A$:\n\\[\n\\nabla_x(x^\\top A x) = (A + A^\\top)x = 2Ax.\n\\]\nSince $A = I$ (the identity matrix) is symmetric, and $x^\\top I x = x^\\top x = \\|x\\|^2$:\n\\[\n\\nabla(\\|x\\|^2) = 2Ix = 2x.\n\\]\n\nThis is one of the most frequently-used identities in machine learning optimization (e.g., gradient of the MSE loss $\|Xw - y\\|^2$ is $2X^\\top(Xw - y)$).",
      hints: [
        "Expand $x^\\top x = x_1^2 + x_2^2 + \\cdots + x_n^2$. Each term only depends on one variable, so $\\frac{\\partial}{\\partial x_k}(x_i^2) = 2x_k \\delta_{ik}$.",
        "The key identity to remember: $\\nabla_x(x^\\top x) = 2x$. This appears constantly in gradient descent, backpropagation, and optimization.",
      ],
    },
  ],

  "chain-rule": [
    {
      id: "q-mfml-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Let $f(u) = u^3$ and $u = g(x) = 2x$. Compute $\\frac{df}{dx}$ at $x = 2$.",
      options: ["24", "12", "48", "96"],
      correctAnswer: 2,
      explanation:
        "The chain rule states that for a composition $f(g(x))$:\n\\[\n\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x).\n\\]\n\n**Step 1: Identify the inner and outer functions**\n- Outer function: $f(u) = u^3$, so $f'(u) = 3u^2$\n- Inner function: $u = g(x) = 2x$, so $g'(x) = 2$\n\n**Step 2: Apply the chain rule**\n\\[\n\\frac{df}{dx} = f'(u) \\cdot g'(x) = 3u^2 \\cdot 2.\n\\]\n\n**Step 3: Substitute back in terms of $x$**\nSince $u = 2x$:\n\\[\n\\frac{df}{dx} = 3(2x)^2 \\cdot 2 = 3 \\cdot 4x^2 \\cdot 2 = 24x^2.\n\\]\n\n**Step 4: Evaluate at $x = 2$**\n\\[\n\\frac{df}{dx}\\bigg|_{x=2} = 24 \\cdot (2)^2 = 24 \\cdot 4 = 96.\n\\]\n\n**Verification by composition:** $f(g(x)) = (2x)^3 = 8x^3$, so $\\frac{d}{dx}(8x^3) = 24x^2$. At $x = 2$: $24 \\cdot 4 = 96$.",
      hints: [
        "The chain rule $\\frac{df}{dx} = \\frac{df}{du} \\cdot \\frac{du}{dx}$ is the fundamental tool: differentiate the outer function at the inner function, then multiply by the derivative of the inner function.",
        "A helpful mental check: you can also compose first to get $f(g(x)) = (2x)^3 = 8x^3$, then differentiate directly to verify.",
      ],
    },
    {
      id: "q-mfml-kp12-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In neural network backpropagation, the chain rule computes $\\frac{\\partial L}{\\partial W_1}$ (gradient of loss w.r.t. first-layer weights) as:",
      options: [
        "$\\frac{\\partial L}{\\partial W_1}$ directly from the loss function",
        "$(\\frac{\\partial L}{\\partial a_2}) \\cdot (\\frac{\\partial a_2}{\\partial a_1}) \\cdot (\\frac{\\partial a_1}{\\partial W_1})$ — product of local Jacobians along the computation graph",
        "The transpose of the forward pass",
        "The Hessian of $L$ with respect to $W_1$",
      ],
      correctAnswer: 1,
      explanation:
        "Backpropagation is a systematic application of the **multivariate chain rule** to computation graphs.\n\n**The computation graph perspective:**\nA neural network with layers $a_1 \\to a_2 \\to \\cdots \\to a_L$ computes:\n\\[\na_{k+1} = f_k(a_k, W_k), \\quad L = \\ell(a_L, y).\n\\]\n\n**Applying the chain rule recursively:**\n\\[\n\\frac{\\partial L}{\\partial W_1} = \\underbrace{\\frac{\\partial L}{\\partial a_L}}_{\\delta_L} \\cdot \\underbrace{\\frac{\\partial a_L}{\\partial a_{L-1}}}_{J_{L-1}} \\cdot \\cdots \\cdot \\underbrace{\\frac{\\partial a_2}{\\partial a_1}}_{J_1} \\cdot \\frac{\\partial a_1}{\\partial W_1}.\n\\]\n\nEach $\\frac{\\partial a_{k+1}}{\\partial a_k} = J_k$ is a **Jacobian matrix** (local gradient), and the final $\\frac{\\partial a_1}{\\partial W_1}$ contains the input activations.\n\n**Why this is efficient:** Rather than re-traversing the entire graph for each gradient, backprop:\n1. First does a **forward pass** storing all activations $a_k$\n2. Then does a single **backward pass** accumulating these Jacobian products\n\nThis reduces gradient computation from $O(\\text{graph size})$ per parameter to essentially $O(\\text{one traversal})$.",
      hints: [
        "Think of the chain rule for scalar functions: if $L = f(g(h(x)))$, then $\\frac{dL}{dx} = f'(g(h)) \\cdot g'(h) \\cdot h'(x)$. Neural networks are just a multi-variable version of this.",
        "The key insight of backprop is that we can compute each local gradient independently during the backward pass, then multiply them together to get the full gradient.",
      ],
    },
    {
      id: "q-mfml-kp12-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Automatic differentiation (autograd) and symbolic differentiation are the same technique.",
      correctAnswer: "False",
      explanation:
        "These are fundamentally different approaches to computing derivatives:\n\n**Symbolic Differentiation**\nManipulates algebraic expressions to produce new expressions:\n\\[\n\\frac{d}{dx}(x^2 + \\sin(x)) \\to 2x + \\cos(x).\n\\]\n- Pros: Exact, mathematically clean results\n- Cons: \"Expression swell\" (explosive growth in expression size), struggles with control flow (loops, conditionals)\n- Examples: Mathematica, SymPy, MATLAB's Symbolic Toolbox\n\n**Automatic Differentiation (Autograd)**\nApplies the chain rule to **numerical values** during program execution:\n- Forward mode: evaluates $\\frac{\\partial f}{\\partial x}$ alongside $f(x)$ using dual numbers\n- Reverse mode (backpropagation): records operations in a computational graph, then replays backward to accumulate gradients\n- Handles arbitrary Python code (loops, branches, recursion)\n- Examples: PyTorch, JAX, TensorFlow's Autograd\n\n**Key difference:**\n- Symbolic: \"manipulate the formula\"\n- Autograd: \"evaluate and accumulate\"\n\nFor neural networks with millions of parameters, autograd's reverse-mode differentiation (backprop) is essential — computing symbolic gradients would be intractable.",
      hints: [
        "Imagine computing $\\frac{d}{dx}(\\sin(x^2) + x^2\\cos(x))$ symbolically: you'd need the product rule and chain rule repeatedly, creating increasingly complex expressions. Autograd just evaluates numerically at each step.",
        "Autograd systems like PyTorch build a dynamic computational graph: each operation records its inputs and outputs. During backward, gradients flow from loss back through each operation, accumulating via the chain rule.",
      ],
    },
  ],

  hessian: [
    {
      id: "q-mfml-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For $f(x, y) = x^2 + xy + y^2$, what is the Hessian matrix $H$?",
      options: [
        "$H = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$",
        "$H = \\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}$",
        "$H = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$",
        "$H = \\begin{pmatrix} 2x & y \\\\ x & 2y \\end{pmatrix}$",
      ],
      correctAnswer: 0,
      explanation:
        "The Hessian matrix contains all second-order partial derivatives:\n\\[\nH_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}.\n\\]\n\n**Computing each second partial derivative:**\n\nFirst derivatives:\n\\[\n\\frac{\\partial f}{\\partial x} = 2x + y, \\quad \\frac{\\partial f}{\\partial y} = x + 2y.\n\\]\n\nSecond derivatives (Clairaut's theorem: mixed partials are equal if continuous):\n\\[\n\\frac{\\partial^2 f}{\\partial x^2} = \\frac{\\partial}{\\partial x}(2x + y) = 2,\n\\quad\n\\frac{\\partial^2 f}{\\partial y^2} = \\frac{\\partial}{\\partial y}(x + 2y) = 2,\n\\quad\n\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial}{\\partial y}(2x + y) = 1 = \\frac{\\partial^2 f}{\\partial y \\partial x}.\n\\]\n\n**Assembling the Hessian:**\n\\[\nH = \\begin{pmatrix} \\frac{\\partial^2 f}{\\partial x^2} & \\frac{\\partial^2 f}{\\partial x \\partial y} \\\\ \\frac{\\partial^2 f}{\\partial y \\partial x} & \\frac{\\partial^2 f}{\\partial y^2} \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}.\n\\]\n\nNote: Since $f$ is a quadratic polynomial, the Hessian is **constant** (independent of $x, y$) — this means the function curves the same way everywhere.",
      hints: [
        "The Hessian is symmetric for scalar functions of real variables (Clairaut's theorem on equality of mixed partials).",
        "For a quadratic function $f(x) = x^\\top A x + b^\\top x + c$, the Hessian is simply $H = A + A^\\top = 2A$ when $A$ is symmetric. Here $A = \\begin{pmatrix} 1/2 & 1/2 \\\\ 1/2 & 1 \\end{pmatrix}$, giving $H = 2A$.",
      ],
    },
    {
      id: "q-mfml-kp13-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Hessian $H = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ has eigenvalues $1$ and $3$. At a critical point where $\\nabla f = 0$, what type of point is this?",
      options: [
        "A saddle point (eigenvalues have mixed signs)",
        "A local maximum (all eigenvalues negative)",
        "A local minimum (all eigenvalues positive — $H$ is positive definite)",
        "Cannot determine without more information",
      ],
      correctAnswer: 2,
      explanation:
        "The **second-order sufficiency condition** tells us how to classify critical points using the Hessian:\n\n**Classification by eigenvalues:**\n- All $\\lambda_i > 0$ (positive definite) $\\Leftrightarrow$ **local minimum**\n- All $\\lambda_i < 0$ (negative definite) $\\Leftrightarrow$ **local maximum**\n- Mixed signs (indefinite) $\\Leftrightarrow$ **saddle point**\n- Zero eigenvalues require higher-order tests\n\n**Applying to our Hessian:**\nGiven eigenvalues $\\lambda_1 = 1$ and $\\lambda_2 = 3$, both are positive. Therefore $H$ is **positive definite**.\n\n**Geometric intuition:**\nAt a critical point where $\\nabla f = 0$, the Hessian encodes the **curvature** (second derivatives) of $f$:\n- Positive definite means the function curves **upward** in all directions\n- Think of $f(x,y) = x^2 + xy + y^2$ as a bowl-shaped surface — the unique critical point at $(0,0)$ is a global (and local) minimum\n\n**Verification via determinants:**\nFor a $2 \\times 2$ matrix $H = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, it is PD iff $a > 0$ and $\\det(H) > 0$:\n\\[\na = 2 > 0, \\quad \\det(H) = (2)(2) - (1)(1) = 3 > 0.\n\\]\nBoth conditions satisfied, confirming positive definite.",
      hints: [
        "The key insight: the Hessian's eigenvalues tell you how the function curves in different directions. Positive curvature in all directions means you're at a bottom of a 'bowl'.",
        "For quick checks without computing eigenvalues: for a $2 \\times 2$ symmetric matrix, check $a > 0$ and $\\det > 0$. For larger matrices, check all leading principal minors $> 0$ (Sylvester's criterion).",
      ],
    },
    {
      id: "q-mfml-kp13-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Newton's method for optimization uses the update $\\theta \\leftarrow \\theta - H^{-1}\\nabla f$, and achieves quadratic convergence near a minimum.",
      correctAnswer: "True",
      explanation:
        "Newton's method uses **second-order Taylor approximation** to take more accurate steps than gradient descent.\n\n**Derivation:**\nAround the current point $\\theta_t$, the second-order Taylor expansion of $f$ is:\n\\[\nf(\\theta) \\approx f(\\theta_t) + \\nabla f(\\theta_t)^\\top (\\theta - \\theta_t) + \\frac{1}{2}(\\theta - \\theta_t)^\\top H_t (\\theta - \\theta_t).\n\\]\n\nTaking the gradient with respect to $\\theta$ and setting to zero gives the optimum of this local quadratic model:\n\\[\n\\nabla f(\\theta_t) + H_t(\\theta - \\theta_t) = 0 \\implies \\theta_{t+1} = \\theta_t - H_t^{-1}\\nabla f(\\theta_t).\n\\]\n\n**Convergence analysis:**\nNear a minimum $\\theta^*$ with $\\nabla f(\\theta^*) = 0$ and $H$ positive definite:\n\\[\n\\|\\theta_{t+1} - \\theta^*\\| \\leq C \\cdot \\|\\theta_t - \\theta^*\\|^2.\n\\]\nThis is **quadratic convergence** — the error squares (roughly doubles correct digits) at each iteration.\n\n**Comparison with gradient descent:**\n- GD: $\\|\\text{error}_{t+1}\\| \\leq r \\cdot \\|\\text{error}_t\\|$ — linear (slow)\n- Newton: $\\|\\text{error}_{t+1}\\| \\leq C \\cdot \\|\\text{error}_t\\|^2$ — quadratic (fast)\n\n**Trade-offs:**\n- Newton requires computing and inverting the Hessian ($O(n^3)$ for $n$ parameters)\n- Works best near optima; may diverge far from minimum (Hessian may not be PD)\n- Quasi-Newton methods (L-BFGS) approximate $H^{-1}$ cheaply",
      hints: [
        "Think of gradient descent as taking steps in the direction of steepest descent with fixed step size. Newton's method is like gradient descent but with **variable step size and direction** determined by the local curvature.",
        "For a perfect quadratic $f(x) = \\frac{1}{2}x^\\top A x - b^\\top x$ with PD $A$, Newton's method converges to the optimum in exactly **one step**: $\\theta^* = A^{-1}b$.",
      ],
    },
  ],

  convexity: [
    {
      id: "q-mfml-kp14-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which of the following functions is convex on $\\mathbb{R}$?",
      options: [
        "$f(x) = -x^2$ (concave parabola)",
        "$f(x) = x^2$ (upward parabola)",
        "$f(x) = \\sin(x)$ (oscillating)",
        "$f(x) = x^3$ (has inflection point)",
      ],
      correctAnswer: 1,
      explanation:
        "A function is **convex** if its epigraph (the region above its graph) is a convex set. Equivalently, for any two points, the line segment between them lies above the function.\n\n**The second derivative test for convexity:**\nFor a twice-differentiable function $f$ on an interval:\n\\[\nf \\text{ is convex } \\iff f''(x) \\geq 0 \\text{ for all } x.\n\\]\n\n**Analyzing each option:**\n\n1. $f(x) = -x^2$: $f'(x) = -2x$, $f''(x) = -2 < 0$ everywhere — **concave** (bowl turned upside down)\n\n2. $f(x) = x^2$: $f'(x) = 2x$, $f''(x) = 2 > 0$ everywhere — **convex** (standard bowl shape)\n\n3. $f(x) = \\sin(x)$: Oscillates between concave and convex — **neither**\n\n4. $f(x) = x^3$: $f''(x) = 6x$, which is negative for $x < 0$ and positive for $x > 0$ — has an **inflection point** at $x = 0$, so **neither** convex nor concave on $\\mathbb{R}$\n\n**Geometric intuition for $f(x) = x^2$:**\nThe chord connecting any two points on the parabola always lies above (or on) the parabola itself — this is the visual definition of convexity.",
      hints: [
        "Visual test: a convex function looks like a 'bowl' — you can roll a ball anywhere on it and it will roll to the bottom. A concave function looks like an 'upside-down bowl'.",
        "Remember: $f''(x) > 0$ means the function curves upward (convex); $f''(x) < 0$ means it curves downward (concave).",
      ],
    },
    {
      id: "q-mfml-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a convex function, every local minimum is also a global minimum.",
      correctAnswer: "True",
      explanation:
        "This is one of the most important properties of convex functions — it guarantees that optimization is \"well-behaved.\"\n\n**Proof by contradiction:**\n\nSuppose $x^*$ is a local minimum but **not** a global minimum. Then there exists some $y$ with:\n\\[\nf(y) < f(x^*).\n\\]\n\nBy convexity, for any $t \\in (0, 1)$:\n\\[\nf(tx^* + (1-t)y) \\leq t f(x^*) + (1-t) f(y) < t f(x^*) + (1-t) f(x^*) = f(x^*).\n\\]\n\nNow consider points of the form $z_t = tx^* + (1-t)y$ as $t \\to 1$:\n- $z_t \\to x^*$ as $t \\to 1$\n- For $t$ close enough to 1, $z_t$ is arbitrarily close to $x^*$\n- Yet $f(z_t) < f(x^*)$ for all $t < 1$\n\nThis contradicts $x^*$ being a local minimum!\n\n**Practical implication:**\nWhen training convex models (like linear regression with MSE loss), any local minimum you find is **the** global minimum — no risk of being trapped in a suboptimal local minimum.\n\n**Non-convex counterexample:**\n$f(x) = x^3 - x$ has local minima at $x = -1/\\sqrt{3}$ and $x = 1/\\sqrt{3}$, but the global minimum is not at a local minimum (it goes to $-\\infty$).",
      hints: [
        "The key step: convexity lets us bound $f$ at intermediate points using a weighted average of endpoint values. If one endpoint is lower, all intermediate points inherit some of that lowness.",
        "This is why convex optimization is 'easy' — you can't get stuck in local optima. Algorithms like gradient descent that find stationary points are guaranteed to find the global optimum.",
      ],
    },
    {
      id: "q-mfml-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The cross-entropy loss for logistic regression $L(w) = -\\sum_i [y_i \\log \\sigma(w^\\top x_i) + (1-y_i)\\log(1-\\sigma(w^\\top x_i))]$ is:",
      options: [
        "Non-convex because it involves the sigmoid function",
        "Convex in $w$ because log-sum-exp composed with a linear function is convex",
        "Convex only when the data is linearly separable",
        "Non-convex for multi-class (softmax) but convex for binary",
      ],
      correctAnswer: 1,
      explanation:
        "Despite the sigmoid being non-linear, the **composition structure** makes the loss convex.\n\n**Key insight:** The loss has the form $L(w) = -\\sum_i \\ell_i(w)$ where each $\\ell_i(w)$ is:\n\\[\n\\ell_i(w) = y_i \\log \\sigma(w^\\top x_i) + (1-y_i) \\log(1-\\sigma(w^\\top x_i)).\n\\]\n\n**Showing convexity via the Hessian:**\nDefine $\\sigma_i = \\sigma(w^\\top x_i) = \\frac{1}{1 + e^{-w^\\top x_i}}$.\n\nThe Hessian of the total loss is:\n\\[\nH = \\nabla^2 L(w) = \\sum_i \\sigma_i(1-\\sigma_i) \\, x_i x_i^\\top.\n\\]\n\n**Why this is positive semi-definite (PSD):**\n- Each term $\\sigma_i(1-\\sigma_i) > 0$ because $0 < \\sigma_i < 1$ for all inputs\n- Each $x_i x_i^\\top$ is **rank-1 positive semi-definite** (for any vector $v$, $v^\\top (x_i x_i^\\top) v = (x_i^\\top v)^2 \\geq 0$)\n- A sum of PSD matrices is PSD\n\nSince $H$ is PSD for all $w$, the loss function $L(w)$ is **convex**.\n\n**Critical point:** This convexity holds **regardless of data separability**. Even if the data is perfectly separable (logistic regression can achieve near-zero training loss), the loss is still convex — there are no spurious local minima to worry about.\n\n**Note on multi-class:** The softmax cross-entropy loss $\\ell(w) = -\\log \\frac{e^{w_{y}^\\top x}}{\\sum_j e^{w_j^\\top x}}$ is also convex in $w$ because softmax is log-sum-exp (a convex function) composed with a linear function.",
      hints: [
        "The sigmoid $\\sigma(z) = 1/(1+e^{-z})$ is NOT convex or concave globally — but the way it appears in the log-likelihood structure creates convexity in the weight space.",
        "The term $\\sigma_i(1-\\sigma_i)$ is the variance of a Bernoulli distribution — it's always positive and acts as a 'curvature weight' for each data point's contribution to the Hessian.",
      ],
    },
  ],

  "lagrange-multipliers": [
    {
      id: "q-mfml-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Find the maximum of f(x,y) = xy subject to the constraint g(x,y) = x + y − 4 = 0 using Lagrange multipliers.",
      options: [
        "Maximum is 4 at (2, 2)",
        "Maximum is 8 at (4, 4)",
        "Maximum is 2 at (1, 3)",
        "No maximum exists",
      ],
      correctAnswer: 0,
      explanation:
        "**Lagrange multipliers** solve constrained optimization by finding where $\\nabla f$ is parallel to $\\nabla g$.\n\n**Step 1: Set up the Lagrangian**\n\\[\n\\mathcal{L}(x, y, \\lambda) = xy - \\lambda(x + y - 4).\n\\]\n\n**Step 2: Take partial derivatives and set to zero**\n\\[\n\\frac{\\partial \\mathcal{L}}{\\partial x} = y - \\lambda = 0 \\Rightarrow y = \\lambda,\n\\quad\n\\frac{\\partial \\mathcal{L}}{\\partial y} = x - \\lambda = 0 \\Rightarrow x = \\lambda,\n\\quad\n\\frac{\\partial \\mathcal{L}}{\\partial \\lambda} = -(x + y - 4) = 0 \\Rightarrow x + y = 4.\n\\]\n\n**Step 3: Solve the system**\nFrom the first two equations: $x = y = \\lambda$.\n\nSubstituting into the constraint: $x + x = 4 \\Rightarrow x = 2$, so $y = 2$.\n\n**Step 4: Evaluate**\n\\[\nf(2, 2) = 2 \\cdot 2 = 4.\n\\]\n\n**Verification via AM-GM:** $xy \\leq ((x+y)/2)^2 = (4/2)^2 = 4$, with equality when $x = y = 2$.",
      hints: [
        "At the optimum, $\\nabla f$ is parallel to $\\nabla g$. This gives us $\\frac{\\partial \\mathcal{L}}{\\partial x} = 0$ and $\\frac{\\partial \\mathcal{L}}{\\partial y} = 0$.",
        "The constraint $x + y = 4$ describes a line. The method finds where along this line the product $xy$ is maximized — intuitively at the 'most square' point $(2, 2)$.",
      ],
    },
    {
      id: "q-mfml-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Lagrange multiplier λ has the interpretation as the rate of change of the optimal objective value with respect to the constraint level c in g(x) = c.",
      correctAnswer: "True",
      explanation:
        "This is the **envelope theorem** interpretation of Lagrange multipliers — one of the most economically meaningful aspects.\n\nConsider optimizing $f(x)$ subject to $g(x) = c$. Let $F^*(c)$ be the optimal value. Then:\n\\[\n\\frac{dF^*}{dc}(c) = \\lambda^*,\n\\]\nwhere $\\lambda^*$ is the optimal Lagrange multiplier.\n\nIn our $xy$ example with constraint $x + y = 4$:\n- At the optimum we found $\\lambda = 2$ (since $y = \\lambda = 2$ and $x = \\lambda = 2$)\n- If the constraint changes to $x + y = 4 + \\epsilon$:\n\\[\nF^*(4 + \\epsilon) \\approx F^*(4) + \\lambda \\cdot \\epsilon = 4 + 2\\epsilon.\n\\]\n\nFor $\\epsilon = 1$: new optimum $\\approx 6$ (AM-GM gives $((4+1)/2)^2 = 6.25$).\n\n$\\lambda$ is called the \"shadow price\" because it tells you the marginal value of relaxing the constraint.",
      hints: [
        "Think of $\\lambda$ as a 'price' for the constraint resource. If you can increase the budget $c$ by one unit, how much extra objective value do you gain? That's $\\lambda$.",
        "In constrained optimization, not all constraints are equally valuable. The magnitude of $\\lambda$ tells you which constraints are 'binding' (critical) vs. slack.",
      ],
    },
    {
      id: "q-mfml-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the dual formulation of SVMs, KKT complementary slackness αᵢ(yᵢ(wᵀxᵢ+b)−1) = 0 implies:",
      options: [
        "All αᵢ are equal at the optimum",
        "αᵢ > 0 only for points on the margin boundary yᵢ(wᵀxᵢ+b) = 1 (support vectors); all others have αᵢ = 0",
        "αᵢ = yᵢ for all training points",
        "Points inside the margin have the largest αᵢ",
      ],
      correctAnswer: 1,
      explanation:
        "The KKT (Karush-Kuhn-Tucker) complementary slackness condition $\\alpha_i (y_i(w^\\top x_i + b) - 1) = 0$ means that for each training point, exactly one of the following holds:\n\n- $\\alpha_i = 0$: the point is **not** a support vector — it lies outside the margin (constraint not tight)\n- $y_i(w^\\top x_i + b) = 1$: the point **is** a support vector — it lies exactly on the margin boundary\n\nThe decision boundary $w^* = \\sum_i \\alpha_i y_i x_i$ depends **only** on support vectors. Points inside the margin or far from the boundary have $\\alpha_i = 0$ and don't affect $w^*$.\n\nThis is why SVMs are sparse: to classify a new point, you only need to compute its inner product with the support vectors, not all training points.",
      hints: [
        "Complementary slackness: $\\alpha_i \\cdot (\\text{constraint slack}) = 0$. If the constraint is loose (slack > 0), then $\\alpha_i = 0$. If $\\alpha_i > 0$, then the constraint must be tight (slack = 0, point exactly on margin).",
        "The word 'slack' means 'looseness' — if there's slack in the constraint, the multiplier is zero (we're not 'paying' for that point). If there's no slack, we pay a positive price $\\alpha_i > 0$.",
      ],
    },
  ],

  "information-theory": [
    {
      id: "q-mfml-kp16-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Compute the Shannon entropy H(X) for a fair coin: P(H)=P(T)=0.5, using H = −Σ p(x) log₂ p(x).",
      options: ["0 bits", "0.5 bits", "1 bit", "2 bits"],
      correctAnswer: 2,
      explanation:
        "H = −[0.5·log₂(0.5) + 0.5·log₂(0.5)] = −[0.5·(−1) + 0.5·(−1)] = −(−1) = 1 bit. A fair coin has maximum entropy for a binary variable — one bit of uncertainty. A biased coin (e.g., P(H)=1) has H = 0.",
      hints: [
        "log₂(0.5) = log₂(1/2) = −1.",
        'H = −[0.5·(−1) + 0.5·(−1)] = 1 bit. The unit "bit" comes from using log base 2.',
      ],
    },
    {
      id: "q-mfml-kp16-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "KL divergence D_KL(P ‖ Q) = Σ P(x) log(P(x)/Q(x)) satisfies which property?",
      options: [
        "D_KL(P‖Q) = D_KL(Q‖P) always (symmetric)",
        "D_KL(P‖Q) ≥ 0 with equality iff P = Q (non-negative)",
        "D_KL(P‖Q) = 1 for any two distinct distributions",
        "D_KL(P‖Q) ≤ 1 always",
      ],
      correctAnswer: 1,
      explanation:
        "By Jensen\'s inequality applied to the convex function −log: D_KL(P‖Q) = E_P[log(P/Q)] = −E_P[log(Q/P)] ≥ −log(E_P[Q/P]) = −log(1) = 0. Equality holds iff P/Q is constant, i.e., P = Q. KL is asymmetric: D_KL(P‖Q) ≠ D_KL(Q‖P) in general.",
      hints: [
        "Jensen\'s inequality: for convex f, E[f(X)] ≥ f(E[X]). Apply with f = −log and X = Q(x)/P(x).",
        "KL asymmetry: P = N(0,1), Q = N(1,1): D_KL(P‖Q) = 0.5 but D_KL(Q‖P) = 0.5 (symmetric here due to equal variances). Try different variances for asymmetry.",
      ],
    },
    {
      id: "q-mfml-kp16-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Mutual information I(X; Y) equals zero if and only if X and Y are statistically independent.",
      correctAnswer: "True",
      explanation:
        "I(X;Y) = D_KL(P(X,Y) ‖ P(X)P(Y)). Since KL ≥ 0 with equality iff P(X,Y) = P(X)P(Y), we have I(X;Y) = 0 iff X and Y are independent. Unlike correlation (which only measures linear dependence), MI captures all statistical dependence including nonlinear.",
      hints: [
        "I(X;Y) = H(X) − H(X|Y) = H(Y) − H(Y|X). If X,Y independent: H(X|Y) = H(X), so I = 0.",
        "I(X;Y) = 0 detects all forms of dependence: linear, quadratic, etc. Correlation = 0 does not imply independence.",
      ],
    },
  ],

  "concentration-inequalities": [
    {
      id: "q-mfml-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "X is a non-negative random variable with E[X] = 3. Markov\'s inequality gives an upper bound on P(X ≥ 9) of:",
      options: ["1/9", "1/3", "1/2", "2/3"],
      correctAnswer: 1,
      explanation:
        "Markov\'s inequality: P(X ≥ a) ≤ E[X]/a. With E[X]=3 and a=9: P(X ≥ 9) ≤ 3/9 = 1/3. This bound uses only the mean — no assumption on the distribution shape beyond non-negativity.",
      hints: [
        "Markov: P(X ≥ a) ≤ E[X]/a. Plug in E[X]=3, a=9: P(X≥9) ≤ 3/9 = 1/3.",
        "Proof: E[X] = E[X·1(X<a)] + E[X·1(X≥a)] ≥ a·P(X≥a). Rearrange: P(X≥a) ≤ E[X]/a.",
      ],
    },
    {
      id: "q-mfml-kp17-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "X has mean μ=10 and standard deviation σ=2. Chebyshev\'s inequality bounds P(|X−10| ≥ 6) by:",
      options: ["1/9", "1/4", "2/3", "1/3"],
      correctAnswer: 0,
      explanation:
        "Chebyshev: P(|X−μ| ≥ kσ) ≤ 1/k². Here |X−10| ≥ 6 = 3·σ, so k=3. P(|X−10|≥6) ≤ 1/9. This bound holds for any distribution with finite variance, using both mean and variance.",
      hints: [
        "6 = k·σ = k·2. So k = 3.",
        "Chebyshev: P(|X−μ| ≥ kσ) ≤ 1/k² = 1/9.",
      ],
    },
    {
      id: "q-mfml-kp17-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Hoeffding\'s inequality gives an exponential tail bound for bounded random variables, making it much tighter than Chebyshev\'s 1/k² bound for large deviations.",
      correctAnswer: "True",
      explanation:
        "For bounded i.i.d. Xᵢ ∈ [0,1] with mean μ, Hoeffding gives P(|X̄−μ| ≥ t) ≤ 2exp(−2nt²). Chebyshev gives 1/(nt/σ)². For n=100, t=0.1: Hoeffding ≤ 2e⁻² ≈ 0.27 while Chebyshev gives σ²/(n·t²) — much looser. The exponential decay enables PAC learning sample complexity bounds.",
      hints: [
        "Compare 2exp(−2nt²) vs. σ²/(nt²) for large n or large t: exponential decays much faster.",
        "Hoeffding requires boundedness [a,b]; Chebyshev only requires finite variance but gives weaker bounds.",
      ],
    },
  ],

  "hypothesis-testing": [
    {
      id: "q-mfml-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A p-value of 0.03 in a hypothesis test means:",
      options: [
        "There is a 3% probability that the null hypothesis H₀ is true",
        "If H₀ were true, the probability of observing data at least as extreme as seen is 3%",
        "The alternative hypothesis is 97% likely",
        "The effect size is 0.03",
      ],
      correctAnswer: 1,
      explanation:
        "A p-value is P(data as extreme as observed | H₀ true). It is NOT the probability that H₀ is true (that requires a prior via Bayes). A p-value of 0.03 means: under H₀, only 3% of samples would show this or more extreme results — evidence against H₀.",
      hints: [
        "p-value = P(T ≥ t_obs | H₀), where T is the test statistic.",
        "Small p-value: data is surprising under H₀ — reject H₀. Large p-value: data consistent with H₀ — fail to reject.",
      ],
    },
    {
      id: "q-mfml-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A result that is statistically significant (p < 0.05) is always practically significant.",
      correctAnswer: "False",
      explanation:
        "Statistical significance depends heavily on sample size. With n = 1,000,000, a 0.001% change in click rate might give p < 0.001 but have zero business impact. Effect size (e.g., Cohen\'s d) measures practical significance. Always report both p-values and effect sizes.",
      hints: [
        'p-value shrinks with larger n even for trivial effects. A massive n can make any effect "significant".',
        "Cohen\'s d = (μ₁−μ₂)/σ measures effect magnitude independently of sample size.",
      ],
    },
    {
      id: "q-mfml-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Power of a statistical test is defined as P(reject H₀ | H₀ is false) = 1 − β. If power = 0.8 and α = 0.05, which statement is true?",
      options: [
        "80% chance of a false positive, 5% chance of a true positive",
        "80% chance of detecting a real effect (true positive), 5% chance of falsely rejecting H₀ (false positive)",
        "The test has 80% accuracy overall",
        "α + power = 0.85 is the total error rate",
      ],
      correctAnswer: 1,
      explanation:
        "Power = P(reject H₀ | H₀ false) = 1 − β = 0.8: 80% chance of correctly detecting a real effect. α = 0.05 = P(reject H₀ | H₀ true): 5% false positive rate. β = 0.2 = P(fail to reject | H₀ false): 20% false negative rate (Type II error).",
      hints: [
        "Type I error (α): falsely reject H₀ when it is true. Type II error (β): fail to reject H₀ when it is false.",
        "Power = 1 − β. Higher power means more sensitive test. Power increases with larger n and larger effect size.",
      ],
    },
  ],

  "bias-variance-math": [
    {
      id: "q-mfml-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The bias-variance decomposition of expected squared error for a predictor f̂ at a point x is:",
      options: [
        "E[(f̂(x)−y)²] = Bias²(f̂) + Variance(f̂)",
        "E[(f̂(x)−y)²] = Bias²(f̂) + Variance(f̂) + σ²_noise",
        "E[(f̂(x)−y)²] = Bias(f̂) + √Variance(f̂)",
        "E[(f̂(x)−y)²] = Bias²(f̂) · Variance(f̂)",
      ],
      correctAnswer: 1,
      explanation:
        "MSE = E[(f̂−y)²] = [E[f̂]−f]² + E[(f̂−E[f̂])²] + σ² = Bias² + Variance + Noise. The irreducible noise σ² comes from y = f(x) + ε where ε ~ N(0,σ²) and cannot be eliminated by any model.",
      hints: [
        "Bias = E[f̂(x)] − f(x): systematic error of the predictor.",
        "Variance = E[(f̂(x) − E[f̂(x)])²]: how much the predictor changes across training sets.",
      ],
    },
    {
      id: "q-mfml-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A high-variance model tends to overfit the training data and perform poorly on unseen data.",
      correctAnswer: "True",
      explanation:
        "High variance means the model is sensitive to specific training samples — it fits noise. This results in low training error but high test error (overfitting). Example: a degree-15 polynomial fitted to 10 points has near-zero training error but wild extrapolation.",
      hints: [
        "High variance: model changes dramatically if trained on a slightly different dataset.",
        "Regularization, dropout, and ensembling reduce variance at the cost of some bias.",
      ],
    },
    {
      id: "q-mfml-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Adding L2 regularization (ridge) to a linear regression model with λ → ∞ causes the bias and variance to:",
      options: [
        "Both decrease",
        "Bias increases (toward zero prediction), variance decreases (toward zero)",
        "Both increase",
        "Bias decreases, variance increases",
      ],
      correctAnswer: 1,
      explanation:
        "Ridge shrinks ŵ = (XᵀX+λI)⁻¹Xᵀy toward 0. As λ→∞, ŵ→0 regardless of data → prediction always near 0 → high bias. But ŵ becomes less sensitive to training data → lower variance. This is the classic bias-variance tradeoff modulated by regularization strength.",
      hints: [
        "As λ→∞: ŵ→0 (extreme shrinkage). Prediction f̂(x) = wᵀx → 0. If true f(x) ≠ 0, bias is large.",
        "But f̂(x)≈0 for all training sets → variance ≈ 0.",
      ],
    },
  ],

  "vc-dimension": [
    {
      id: "q-mfml-kp20-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The VC dimension of linear classifiers (hyperplanes through the origin) in ℝ² is:",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      explanation:
        "Hyperplanes through the origin in ℝ² (lines through origin with sign(wᵀx)) can shatter any 2 points but not any 3 points (they cannot separate XOR-like labelings). With bias term: lines in ℝ² have VC dim = d+1 = 3. Without bias: VC dim = d = 2.",
      hints: [
        "Shattering 2 points: any of 4 labelings achievable with a line through origin? Yes (2 points, line can rotate).",
        "For 3 general points, the XOR labeling (alternating labels) cannot be achieved by a line through origin.",
      ],
    },
    {
      id: "q-mfml-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A hypothesis class with infinite VC dimension is not PAC learnable.",
      correctAnswer: "True",
      explanation:
        "The Fundamental Theorem of Statistical Learning: a binary hypothesis class H is (agnostic) PAC learnable if and only if its VC dimension is finite. With infinite VC dimension, H can shatter arbitrarily large sets, so no finite sample size guarantees generalization for all distributions.",
      hints: [
        "PAC learning requires: for any ε, δ, with m ≥ m(ε,δ) samples, error ≤ ε+opt with probability 1−δ.",
        "Infinite VC dim → no such finite m(ε,δ) exists — the class is too expressive to generalize from finite data.",
      ],
    },
    {
      id: "q-mfml-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The VC dimension of the class of halfspaces (linear classifiers with bias) in ℝᵈ is:",
      options: ["d", "d + 1", "2d", "d²"],
      correctAnswer: 1,
      explanation:
        "Linear classifiers sign(wᵀx + b) in ℝᵈ have VC dimension d+1. They can shatter any d+1 points in general position (no d+1 points in a hyperplane) but cannot shatter any d+2 points. In ℝ²: VC dim = 3 (any 3 non-collinear points can be shattered, but no 4 points can).",
      hints: [
        "In ℝ²: 3 non-collinear points — all 8 labelings achievable by some line. But any 4 points include an XOR-type labeling no line achieves.",
        "The +1 comes from the bias term b. Homogeneous classifiers (no bias) have VC dim = d.",
      ],
    },
  ],

  "kernel-methods-math": [
    {
      id: "q-mfml-kp21-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The polynomial kernel k(x,z) = (xᵀz + 1)² for x,z ∈ ℝ² implicitly computes the inner product ⟨φ(x), φ(z)⟩ in which feature space?",
      options: [
        "ℝ² (same as input space)",
        "ℝ⁶ (monomials up to degree 2: 1, x₁, x₂, x₁², x₁x₂, x₂²)",
        "An infinite-dimensional Hilbert space",
        "ℝ⁴ (all degree-2 monomials only)",
      ],
      correctAnswer: 1,
      explanation:
        "Expand (xᵀz+1)² = (x₁z₁+x₂z₂+1)². This equals ⟨φ(x),φ(z)⟩ where φ(x) = [1, √2·x₁, √2·x₂, x₁², √2·x₁x₂, x₂²]ᵀ ∈ ℝ⁶. The kernel computes this 6-dimensional inner product without explicitly constructing φ.",
      hints: [
        "(a+b+c)² = a² + b² + c² + 2ab + 2ac + 2bc. With a=x₁z₁, b=x₂z₂, c=1: identifies the feature map.",
        "The kernel trick: k(x,z) = ⟨φ(x),φ(z)⟩ without materializing φ — especially useful for large/infinite feature spaces.",
      ],
    },
    {
      id: "q-mfml-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A function k(x,z) is a valid Mercer kernel iff the kernel (Gram) matrix K with Kᵢⱼ = k(xᵢ,xⱼ) is positive semi-definite for any finite input set.",
      correctAnswer: "True",
      explanation:
        "Mercer\'s theorem: k is a valid kernel (i.e., ∃ feature map φ such that k(x,z) = ⟨φ(x),φ(z)⟩) iff for all finite sets {x₁,…,xₙ} and all vectors c: Σᵢⱼ cᵢcⱼk(xᵢ,xⱼ) ≥ 0, i.e., the Gram matrix is PSD.",
      hints: [
        "PSD Gram matrix iff all eigenvalues ≥ 0. This is the kernel validity condition.",
        "To verify a new kernel: construct a random Gram matrix K for sample points, check if PSD (all eigenvalues ≥ 0).",
      ],
    },
    {
      id: "q-mfml-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The RBF (Gaussian) kernel k(x,z) = exp(−‖x−z‖²/(2σ²)) corresponds to a feature map φ: ℝⁿ → ?",
      options: [
        "ℝⁿ (same dimension)",
        "ℝⁿ² (polynomial of degree 2)",
        "An infinite-dimensional Hilbert space (Taylor series has infinitely many terms)",
        "ℝ² regardless of input dimension",
      ],
      correctAnswer: 2,
      explanation:
        "The Taylor expansion of exp(−‖x−z‖²/(2σ²)) = exp(−‖x‖²/2σ²)·exp(xᵀz/σ²)·exp(−‖z‖²/2σ²) involves all orders of monomials xᵢ₁xᵢ₂…xᵢₖ, giving infinitely many features. The RKHS of the RBF kernel is infinite-dimensional — SVM with RBF kernel implicitly operates in ∞-dim space.",
      hints: [
        "exp(xᵀz/σ²) = Σₖ (xᵀz)ᵏ/(σ²ᵏk!): this series has infinitely many terms → infinite-dimensional feature space.",
        "The kernel trick is especially powerful here: comparing in ∞-dim space costs only O(n) (one kernel evaluation).",
      ],
    },
  ],

  "fourier-analysis": [
    {
      id: "q-mfml-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Fourier transform decomposes a signal f(t) into sinusoidal components. For a discrete signal of length N, the DFT gives N frequency components at frequencies:",
      options: [
        "0, 1/N, 2/N, …, (N−1)/N cycles per sample",
        "0, 1, 2, …, N−1 Hz always",
        "−N/2, …, 0, …, N/2 cycles per second",
        "Only the DC component (frequency 0)",
      ],
      correctAnswer: 0,
      explanation:
        "The DFT X[k] = Σₙ x[n]·e^(−2πikn/N) for k=0,1,…,N−1 represents N frequencies at k/N cycles per sample. k=0 is the DC (mean) component; k=N/2 is the Nyquist frequency (highest representable). These N complex coefficients contain all information about the length-N signal.",
      hints: [
        "k=0: DC component (average). k=1: one full cycle over the entire signal length N.",
        "The DFT is a change of basis from time domain (standard basis eₙ) to frequency domain (complex exponential basis).",
      ],
    },
    {
      id: "q-mfml-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Convolution in the time/spatial domain corresponds to pointwise multiplication in the Fourier (frequency) domain.",
      correctAnswer: "True",
      explanation:
        "Convolution theorem: F{f * g} = F{f} · F{g}. This enables O(N log N) convolution: FFT(f), FFT(g), multiply elementwise, IFFT — versus O(N·K) direct convolution. CNNs with large kernels can exploit this; Fourier Neural Operators (FNO) use it explicitly.",
      hints: [
        "Direct convolution: for each output position, sum K products. O(N·K) total.",
        "FFT approach: 2 FFTs (O(N log N)) + pointwise multiply (O(N)) + IFFT (O(N log N)) = O(N log N). Better when K is large.",
      ],
    },
    {
      id: "q-mfml-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Random Fourier Features (Rahimi & Recht 2007) approximate a shift-invariant kernel k(x−z) by:",
      options: [
        "Computing the exact DFT of the kernel",
        "Drawing random frequencies ω ~ p(ω) (the spectral density) and using z(x) = cos(ωᵀx + b) to approximate k(x,z) ≈ z(x)ᵀz(z)",
        "Using the FFT to compute the kernel matrix in O(N log N)",
        "Replacing the kernel with a polynomial approximation",
      ],
      correctAnswer: 1,
      explanation:
        "By Bochner\'s theorem, any continuous positive-definite shift-invariant kernel k(x−z) = ∫p(ω)e^(iω^T(x−z))dω for some spectral density p(ω). Sampling ω₁,…,ωD ~ p(ω) and bⱼ ~ Uniform(0,2π), the feature map z(x) = √(2/D)[cos(ω₁ᵀx+b₁),…,cos(ωDᵀx+bD)] satisfies E[z(x)ᵀz(z)] = k(x,z).",
      hints: [
        "RFF reduces kernel machines from O(n²) kernel matrix to O(nD) feature matrix, enabling scalability.",
        "Bochner\'s theorem: PD shift-invariant kernel ↔ Fourier transform of a non-negative measure (spectral density p(ω)).",
      ],
    },
  ],

  "measure-theory-basics": [
    {
      id: "q-mfml-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A σ-algebra F over Ω must satisfy three axioms. Which set is NOT necessarily in F?",
      options: [
        "Ω itself",
        "The complement Aᶜ of any A ∈ F",
        "The union A₁ ∪ A₂ ∪ … of any countable collection {Aᵢ} ∈ F",
        "Every subset of every A ∈ F",
      ],
      correctAnswer: 3,
      explanation:
        "σ-algebra axioms: (1) Ω ∈ F, (2) A ∈ F → Aᶜ ∈ F, (3) {Aᵢ} ⊂ F → ∪Aᵢ ∈ F. Subsets of A ∈ F need NOT be in F. For example, the σ-algebra {∅, Ω} contains Ω but not its subsets {ω} for individual outcomes ω.",
      hints: [
        "The three axioms are: Ω ∈ F, closed under complement, closed under countable union.",
        "Sub-sets of F-members are not required to be in F — that would make every subset an event.",
      ],
    },
    {
      id: "q-mfml-kp23-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "The Lebesgue integral generalizes the Riemann integral: every Riemann-integrable function is Lebesgue-integrable with the same value.",
      correctAnswer: "True",
      explanation:
        "The Lebesgue integral partitions the range (not the domain) and handles a far wider class of functions — including pointwise limits of measurable functions. Every bounded Riemann-integrable function is Lebesgue-integrable with equal value. Lebesgue handles Σ xᵢ over countable sets and the dominated convergence theorem, both essential for probability theory.",
      hints: [
        "Riemann integrates by partitioning the x-axis (domain). Lebesgue partitions the y-axis (range).",
        "The dominated convergence theorem (lim integral = integral of lim) requires Lebesgue integration.",
      ],
    },
    {
      id: "q-mfml-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the measure-theoretic formulation, a random variable X on probability space (Ω, F, P) is formally:",
      options: [
        "A fixed real number representing a typical outcome",
        "A measurable function X: Ω → ℝ such that {ω: X(ω) ≤ x} ∈ F for all x ∈ ℝ",
        "The expected value E[X]",
        "An element of the sample space Ω",
      ],
      correctAnswer: 1,
      explanation:
        "A random variable is a measurable function: X: (Ω,F) → (ℝ, B(ℝ)). Measurability means preimages of Borel sets are events in F, ensuring P(X ≤ x) is well-defined. This formalism is needed to rigorously define continuous distributions, conditional expectations, and stochastic processes.",
      hints: [
        "Measurability: {ω: X(ω) ≤ x} must be in F so we can compute P(X ≤ x) = P({ω: X(ω) ≤ x}).",
        "Without measurability, some sets might have no assigned probability — making P(X ≤ x) undefined.",
      ],
    },
  ],

  "graph-theory-ml": [
    {
      id: "q-mfml-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The graph Laplacian L = D − A for an undirected graph with degree matrix D and adjacency matrix A is always:",
      options: [
        "Invertible for any connected graph",
        "Positive semi-definite with at least one zero eigenvalue",
        "Negative definite",
        "Orthogonal (LLᵀ = I)",
      ],
      correctAnswer: 1,
      explanation:
        "For any vector f: fᵀLf = (1/2)Σᵢⱼ Aᵢⱼ(fᵢ−fⱼ)² ≥ 0, so L is PSD. The constant vector 1 satisfies L·1 = 0 (since rows sum to zero), so 0 is always an eigenvalue. For a graph with k connected components, there are exactly k zero eigenvalues.",
      hints: [
        "fᵀLf = Σᵢⱼ Aᵢⱼ(fᵢ−fⱼ)²/2 ≥ 0 since all terms are non-negative squares.",
        "L·1 = D·1 − A·1 = (degrees) − (row sums of A) = 0. So λ=0 is always an eigenvalue with eigenvector 1.",
      ],
    },
    {
      id: "q-mfml-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Fiedler value (second smallest eigenvalue λ₂ of the graph Laplacian) measures graph connectivity — larger λ₂ means the graph is harder to disconnect.",
      correctAnswer: "True",
      explanation:
        "The algebraic connectivity λ₂ = 0 iff the graph is disconnected. For a connected graph, λ₂ > 0 and quantifies how well-connected the graph is. The Cheeger inequality relates λ₂ to the edge expansion (min-cut ratio), justifying its use in spectral clustering.",
      hints: [
        "If the graph splits into two components by removing few edges, λ₂ is small — the graph is nearly disconnected.",
        "Spectral bisection: assign nodes to clusters based on sign of Fiedler vector (eigenvector for λ₂).",
      ],
    },
    {
      id: "q-mfml-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In spectral GNNs, a graph convolution is defined as g_θ * f = Uĝ(Λ)Uᵀf where U contains Laplacian eigenvectors. The main computational bottleneck of this approach is:",
      options: [
        "Computing the sigmoid activation function",
        "The full eigendecomposition of L (O(n³) for n nodes) — addressed by polynomial approximations like ChebNet",
        "Storing the adjacency matrix",
        "Computing node embeddings during message passing",
      ],
      correctAnswer: 1,
      explanation:
        "Full spectral GNNs require computing U (Laplacian eigenvectors) — O(n³) eigendecomposition. ChebNet (Defferrard 2016) approximates spectral filters as degree-K Chebyshev polynomials of L, avoiding eigendecomposition. GCN (Kipf 2017) uses K=1 first-order approximation: Ã = D̃^{-1/2}ÃD̃^{-1/2} where Ã = A + I.",
      hints: [
        "n³ eigendecomposition is prohibitive for large graphs (millions of nodes in social networks).",
        "Chebyshev polynomial approximation: g_θ(Λ) ≈ Σₖ θₖTₖ(Λ). Only requires matrix-vector products with L — O(|E|) per step.",
      ],
    },
  ],

  "numerical-linear-algebra": [
    {
      id: "q-mfml-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "IEEE 754 double-precision (float64) uses 52 mantissa bits, 11 exponent bits, and 1 sign bit. The machine epsilon (smallest ε with 1+ε ≠ 1 in float64) is approximately:",
      options: ["2⁻²³ ≈ 1.2×10⁻⁷", "2⁻⁵² ≈ 2.2×10⁻¹⁶", "2⁻¹⁰²³", "10⁻³²"],
      correctAnswer: 1,
      explanation:
        "Machine epsilon for float64 is 2⁻⁵² ≈ 2.2×10⁻¹⁶, giving ~15 decimal digits of precision. For float32 (23 mantissa bits): ε ≈ 2⁻²³ ≈ 1.2×10⁻⁷ (~7 digits). This is why ML training typically uses float32 (speed) while scientific computing uses float64 (precision).",
      hints: [
        "The mantissa has p = 52 bits → relative precision is 2⁻⁵² ≈ 2.2×10⁻¹⁶.",
        "float32: p=23 bits → ε ≈ 2⁻²³ ≈ 1.2×10⁻⁷. float64: p=52 → ε ≈ 2.2×10⁻¹⁶.",
      ],
    },
    {
      id: "q-mfml-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Catastrophic cancellation occurs when subtracting two nearly equal floating-point numbers, causing significant loss of significant digits.",
      correctAnswer: "True",
      explanation:
        "Example: a = 1.000000001, b = 1.000000000 (both representable to 10 significant digits). a−b = 0.000000001 = 1×10⁻⁹ — only 1 significant digit! The leading digits cancel, leaving only the noisy low-order bits. This affects the naive variance formula E[X²]−(E[X])² when mean >> std.",
      hints: [
        "If a ≈ b with 15 significant digits each, a−b may have only 1 significant digit.",
        "Welford\'s online algorithm computes variance without catastrophic cancellation by updating incrementally.",
      ],
    },
    {
      id: "q-mfml-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The condition number κ(A) = σ_max/σ_min bounds the relative error amplification for Ax = b. If κ(A) = 10⁶ and b has relative error 10⁻¹², what is the relative error bound on x?",
      options: ["10⁻¹²", "10⁻⁶", "10⁶", "10¹²"],
      correctAnswer: 1,
      explanation:
        "‖δx‖/‖x‖ ≤ κ(A)·‖δb‖/‖b‖ = 10⁶ × 10⁻¹² = 10⁻⁶. With float64 precision (ε ≈ 10⁻¹⁶), if κ(A) = 10⁶, we lose 6 decimal digits of accuracy in the solution — from 16 to about 10 significant digits.",
      hints: [
        "Relative error bound: ‖δx‖/‖x‖ ≤ κ(A) · ‖δb‖/‖b‖.",
        "κ = 10⁶ means the matrix amplifies errors by up to 10⁶. Starting from 10⁻¹² error in b: x error ≤ 10⁶·10⁻¹² = 10⁻⁶.",
      ],
    },
  ],

  "monte-carlo-methods": [
    {
      id: "q-mfml-kp26-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A Monte Carlo estimate of π draws n random points uniformly in [0,1]² and counts those inside the unit quarter-circle. If k = 785 of n = 1000 points fall inside, the estimate π̂ is:",
      options: ["3.14", "3.00", "3.93", "2.47"],
      correctAnswer: 0,
      explanation:
        "P(inside quarter-circle) = π/4. So π̂ = 4·k/n = 4·785/1000 = 3.14. Standard error: √(π(4−π)/(4n)) ≈ √(3.14·0.86/4000) ≈ 0.026. The error scales as O(1/√n) — independent of dimension.",
      hints: [
        "Area of quarter-circle radius 1 = π/4. Area of unit square = 1. Fraction inside = π/4.",
        "Estimate: π̂ = 4×(fraction inside) = 4×0.785 = 3.14.",
      ],
    },
    {
      id: "q-mfml-kp26-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In importance sampling, to estimate E_p[f(X)] using samples from proposal q, the importance weight for sample x is:",
      options: [
        "w(x) = q(x)/p(x)",
        "w(x) = p(x)/q(x)",
        "w(x) = p(x)·q(x)",
        "w(x) = |p(x)−q(x)|",
      ],
      correctAnswer: 1,
      explanation:
        "E_p[f(X)] = ∫f(x)p(x)dx = ∫f(x)[p(x)/q(x)]q(x)dx = E_q[f(X)·w(X)] where w(x) = p(x)/q(x). Estimate: (1/n)Σᵢ f(xᵢ)w(xᵢ) for xᵢ ~ q. Choose q ∝ |f|·p to minimize variance.",
      hints: [
        "Key identity: E_p[f] = E_q[f·(p/q)]. The weight p/q corrects for sampling under q instead of p.",
        "Large weights (p(x) >> q(x)) mean x is sampled too rarely under q — those points are upweighted.",
      ],
    },
    {
      id: "q-mfml-kp26-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "MCMC methods (Metropolis-Hastings, HMC) can sample from distributions known only up to a normalizing constant.",
      correctAnswer: "True",
      explanation:
        "The Metropolis-Hastings acceptance ratio is α = min(1, [p̃(x')q(x|x')] / [p̃(x)q(x'|x)]) where p̃ ∝ p. The normalizing constant cancels in the ratio p̃(x')/p̃(x) = p(x')/p(x). This is essential for Bayesian inference where the posterior p(θ|D) ∝ p(D|θ)p(θ) is known only up to P(D).",
      hints: [
        "Acceptance ratio: p(x')/p(x) = p̃(x')/p̃(x). Normalization constant cancels.",
        "In Bayesian inference: posterior ∝ likelihood × prior. The normalizing constant P(D) = ∫p(D|θ)p(θ)dθ is often intractable but cancels in MCMC.",
      ],
    },
  ],

  "variational-inference-math": [
    {
      id: "q-mfml-kp27-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Variational inference approximates an intractable posterior p(z|x) by solving which optimization problem?",
      options: [
        "max_q H(q) (maximize entropy of q)",
        "min_{q ∈ Q} D_KL(q(z) ‖ p(z|x)) (minimize KL divergence to true posterior)",
        "max_q E_q[log p(x,z)] (maximize ELBO without entropy term)",
        "min_q ‖q − p‖₂² (minimize L2 distance)",
      ],
      correctAnswer: 1,
      explanation:
        "VI turns posterior inference into optimization: find q*(z) = argmin_{q∈Q} D_KL(q‖p(z|x)), where Q is a tractable family (e.g., mean-field). Since p(z|x) is intractable, this is equivalently done by maximizing the ELBO = E_q[log p(x,z)] − E_q[log q(z)].",
      hints: [
        "Maximizing ELBO = minimizing KL(q‖p): log p(x) = ELBO + KL(q‖p) ≥ ELBO.",
        "Mean-field Q: q(z) = Πᵢ qᵢ(zᵢ) — each latent variable independent. Tractable but approximate.",
      ],
    },
    {
      id: "q-mfml-kp27-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The ELBO (Evidence Lower BOund) is defined as ELBO = E_q[log p(x,z)] − E_q[log q(z)]. Which identity connects ELBO to the log-evidence log p(x)?",
      options: [
        "log p(x) = ELBO − KL(q‖p(z|x))",
        "log p(x) = ELBO + KL(q(z) ‖ p(z|x))",
        "log p(x) = ELBO × KL(q‖p)",
        "log p(x) = KL(q‖p) − ELBO",
      ],
      correctAnswer: 1,
      explanation:
        'Derivation: log p(x) = E_q[log p(x,z)/q(z)] + E_q[log q(z)/p(z|x)] = ELBO + KL(q‖p(z|x)). Since KL ≥ 0, ELBO ≤ log p(x) — hence the name "lower bound". Maximizing ELBO tightens the bound (KL → 0 iff q = p(z|x)).',
      hints: [
        "log p(x) = log p(x,z)/p(z|x). Rewrite using q: take E_q and split into ELBO + KL.",
        "ELBO + KL(q‖p(z|x)) = log p(x). KL ≥ 0 ⟹ ELBO ≤ log p(x).",
      ],
    },
    {
      id: "q-mfml-kp27-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The mean-field variational assumption q(z) = Πᵢ qᵢ(zᵢ) ignores posterior correlations between latent variables.",
      correctAnswer: "True",
      explanation:
        "Mean-field VI assumes complete independence among latent variables. The optimal qᵢ*(zᵢ) ∝ exp(E_{q_{-i}}[log p(x,z)]). This factorization ignores posterior correlations, potentially making the approximation poor when latent variables are strongly correlated (e.g., in linear regression with correlated features).",
      hints: [
        "Mean-field: q(z₁,z₂,…) = q₁(z₁)q₂(z₂)…. Correlations between z variables are ignored.",
        "Normalizing flows or full-covariance Gaussians can capture correlations but at higher computational cost.",
      ],
    },
  ],

  "gaussian-processes-math": [
    {
      id: "q-mfml-kp28-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A GP prior f ~ GP(0, k) is placed on function values. At two input points x₁, x₂, the joint distribution of f(x₁), f(x₂) is:",
      options: [
        "Two independent N(0,1) variables",
        "Bivariate Gaussian N(0, K) where K = [[k(x₁,x₁), k(x₁,x₂)],[k(x₂,x₁), k(x₂,x₂)]]",
        "Uniform over all functions passing through x₁, x₂",
        "A Dirichlet distribution parameterized by k",
      ],
      correctAnswer: 1,
      explanation:
        "By the GP definition, any finite collection of function values is jointly Gaussian. For zero-mean GP: [f(x₁),f(x₂)] ~ N(0, K) where K is the 2×2 kernel (Gram) matrix. k(x₁,x₂) encodes correlation — nearby inputs (small ‖x₁−x₂‖ for RBF kernel) are highly correlated.",
      hints: [
        "GP is a distribution over functions: any finite evaluation is a multivariate Gaussian.",
        "K_{ij} = k(xᵢ,xⱼ). For RBF kernel: k(x,x') = σ²exp(−‖x−x'‖²/2ℓ²). K is always PSD.",
      ],
    },
    {
      id: "q-mfml-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GP regression produces both a predictive mean (point prediction) and a predictive variance (uncertainty estimate) at each test point.",
      correctAnswer: "True",
      explanation:
        "GP posterior at test point x*: μ* = k(x*,X)[K(X,X)+σ²I]⁻¹y and σ*² = k(x*,x*) − k(x*,X)[K(X,X)+σ²I]⁻¹k(X,x*). The variance σ*² is zero at training points and grows far from data — automatic uncertainty quantification without approximation.",
      hints: [
        "GP posterior mean is the prediction; posterior variance measures uncertainty.",
        "This exact uncertainty is why GPs are preferred for Bayesian optimization (acquisition functions need uncertainty).",
      ],
    },
    {
      id: "q-mfml-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Exact GP inference with n training points requires solving a linear system with the n×n kernel matrix K. The computational complexity is:",
      options: [
        "O(n) — linear in training size",
        "O(n²) — forming the kernel matrix",
        "O(n³) — Cholesky factorization of K",
        "O(n² log n) — using FFT-accelerated kernel computations",
      ],
      correctAnswer: 2,
      explanation:
        "Exact GP requires Cholesky factorization of K ∈ ℝⁿˣⁿ: O(n³) time and O(n²) memory. For n=10,000 this is feasible; for n=1,000,000 it is not (10¹⁸ FLOPs). Sparse/inducing-point GPs reduce this to O(nm²) with m≪n inducing points.",
      hints: [
        "Cholesky of n×n matrix: O(n³/3) operations. Storing K: O(n²) memory.",
        "n=10K: ~3×10¹¹ FLOPs ≈ seconds. n=100K: ~3×10¹⁵ FLOPs ≈ years. Hence sparse GPs for large n.",
      ],
    },
  ],

  "ode-sde": [
    {
      id: "q-mfml-kp29-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A Neural ODE (Chen et al. 2018) parameterizes the hidden state dynamics as dh/dt = f_θ(h(t), t). The connection to ResNets is:",
      options: [
        "Neural ODEs have more parameters than ResNets",
        "A ResNet block h_{l+1} = h_l + f(h_l) is a forward Euler discretization of the ODE with step size 1",
        "ResNets use continuous time while Neural ODEs use discrete layers",
        "Neural ODEs require gradient checkpointing; ResNets do not",
      ],
      correctAnswer: 1,
      explanation:
        "Euler discretization of dh/dt = f(h) with step Δt=1: h(t+1) = h(t) + f(h(t)). This is exactly a ResNet block with skip connection. Neural ODEs are the continuous limit: infinite layers with infinitesimal Euler steps, solved by an adaptive ODE solver.",
      hints: [
        "Forward Euler: h_{t+Δt} = h_t + Δt·f(h_t). With Δt=1: h_{t+1} = h_t + f(h_t) = ResNet.",
        "Neural ODE uses Runge-Kutta or Dormand-Prince adaptive solvers — not just Euler steps.",
      ],
    },
    {
      id: "q-mfml-kp29-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "An SDE dX = μ(X,t)dt + σ(X,t)dW (where W is a Wiener process) has solutions that are Markov processes.",
      correctAnswer: "True",
      explanation:
        "Solutions to SDEs driven by Brownian motion are Markov processes: given X(t), the future {X(s):s>t} is independent of the past {X(s):s<t}. This follows because Wiener increments dW are independent of the past. This Markov property is fundamental to diffusion models, enabling the forward/reverse process formulation.",
      hints: [
        'Wiener increments: W(t)−W(s) ⊥ {W(u):u≤s} for t>s. The SDE is "driven" by these independent increments.',
        "Markov property: future depends only on present state, not the entire history.",
      ],
    },
    {
      id: "q-mfml-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Score-based generative models (DDPM/Score Matching) learn the score function ∇_x log p_t(x). This is used to reverse a forward noising SDE. The reverse SDE (Anderson 1982) involves:",
      options: [
        "The gradient of the log-prior only",
        "The score ∇_x log p_t(x) of the marginal distribution at each noise level t",
        "The Hessian of the log-likelihood",
        "The score of the data distribution p₀ only",
      ],
      correctAnswer: 1,
      explanation:
        "The time-reversal of dX=f dt+g dW (forward SDE) is dX=[f−g²∇ₓ log pₜ(X)]dt + g dW̃ (reverse SDE, from t=T to 0). Learning ∇ₓ log pₜ(x) (score) for all t via score matching enables exact reversal, generating samples from pₜ₌₀ (data distribution) from noise pₜ₌T ≈ N(0,I).",
      hints: [
        "Forward: data → noise. Reverse: noise → data. The score ∇ₓ log pₜ(x) guides denoising.",
        "DDPM discretizes the reverse SDE. Song et al. (2021) unified DDPM and score matching in this SDE framework.",
      ],
    },
  ],

  "topology-ml": [
    {
      id: "q-mfml-kp30-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'Persistent homology tracks topological features (connected components, loops, voids) as a scale parameter ε varies. A "birth-death" pair (b, d) with large persistence |d−b| indicates:',
      options: [
        "A numerical artifact due to noise",
        "A robust topological feature present across a wide range of scales",
        "A feature present only at a single scale",
        "An outlier in the dataset",
      ],
      correctAnswer: 1,
      explanation:
        "In a persistence diagram, points near the diagonal (d−b ≈ 0) represent short-lived features likely due to noise. Points far from the diagonal (large d−b) represent robust topological features (genuine holes/loops/voids). This scale-invariant signal/noise separation is persistent homology\'s key property.",
      hints: [
        "Born at ε=b, dies at ε=d. Persistence = d−b. Small persistence: noise. Large persistence: signal.",
        "Example: a circular data manifold has one persistent 1-cycle (loop) with large d−b, plus many short-lived loops from noise.",
      ],
    },
    {
      id: "q-mfml-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Euler characteristic χ = V − E + F (vertices − edges + faces) is a topological invariant, unchanged by continuous deformations of a shape.",
      correctAnswer: "True",
      explanation:
        "For a sphere: χ = 2. For a torus: χ = 0. For a pretzel (2 holes): χ = −2. The Euler characteristic depends only on topology, not geometry. Equivalent formula: χ = Σ (−1)ᵏβₖ where βₖ are Betti numbers (number of k-dimensional holes).",
      hints: [
        "Coffee mug and donut are topologically equivalent (both have one hole) — same χ = 0.",
        "β₀ = connected components, β₁ = loops, β₂ = enclosed voids. χ = β₀ − β₁ + β₂.",
      ],
    },
    {
      id: "q-mfml-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Mapper algorithm (Singh et al. 2007) builds a graph summary of high-dimensional data. Its key steps are:",
      options: [
        "Apply PCA, then k-means, then connect clusters by edges",
        "Choose a filter f (e.g., PCA projection), cover the range with overlapping bins, cluster data in each bin, connect clusters sharing points",
        "Build a distance matrix, apply hierarchical clustering, prune the dendrogram",
        "Compute persistent homology of the data point cloud",
      ],
      correctAnswer: 1,
      explanation:
        "Mapper: (1) filter function f: X→ℝ (e.g., first PCA component), (2) cover f(X) with overlapping intervals, (3) cluster data within each interval\'s preimage, (4) add edge between clusters sharing ≥1 point. Result: a graph capturing the topological skeleton of the data — useful for finding flares, loops, and branching structure.",
      hints: [
        "The overlapping bins ensure connectivity is preserved — exclusive bins would miss connections.",
        "Mapper has revealed clinical subgroups in breast cancer data where standard clustering methods failed.",
      ],
    },
  ],
};

const extra: Record<string, import('@/lib/curriculum').Question[]> = {
  'kl-divergence-info': [
    {
      id: 'q-mfml-kp31-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The KL divergence KL(P || Q) between distributions P and Q is defined as:',
      options: [
        'Σ_x P(x) log(Q(x)/P(x))',
        'Σ_x P(x) log(P(x)/Q(x))',
        'Σ_x |P(x) − Q(x)|',
        '√(Σ_x (P(x) − Q(x))²)',
      ],
      correctAnswer: 1,
      explanation:
        'KL(P||Q) = Σ_x P(x) log(P(x)/Q(x)) = E_P[log P/Q]. It measures the expected information loss when Q is used to approximate P. KL ≥ 0 always (Gibbs\' inequality), with KL = 0 iff P = Q.',
      hints: [
        'KL is always non-negative by Jensen\'s inequality: log is concave so E[log x] ≤ log E[x].',
        'KL(P||Q) ≠ KL(Q||P) — it is asymmetric and not a true distance metric.',
      ],
    },
    {
      id: 'q-mfml-kp31-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'KL divergence is asymmetric: KL(P||Q) ≠ KL(Q||P) in general. KL(P||Q) is called the forward KL and tends to be mass-covering (mean-seeking), while KL(Q||P) is called the reverse KL and tends to be mode-seeking (zero-forcing).',
      correctAnswer: 'True',
      explanation:
        'Forward KL (P||Q): penalizes Q being small where P is large, forcing Q to cover all modes of P (mass-covering). Reverse KL (Q||P): penalizes Q being large where P is small, so Q collapses to a single mode of P (mode-seeking). Variational inference minimizes reverse KL; MLE minimizes forward KL.',
      hints: [
        'Forward KL: Q must cover all of P\'s mass — spread wide.',
        'Reverse KL: Q must stay within P\'s support — collapse to one mode.',
      ],
    },
    {
      id: 'q-mfml-kp31-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Mutual information I(X;Y) between random variables X and Y can be expressed in terms of KL divergence as:',
      options: [
        'I(X;Y) = KL(P(X) || P(X|Y))',
        'I(X;Y) = KL(P(X,Y) || P(X)P(Y))',
        'I(X;Y) = H(X) + H(Y)',
        'I(X;Y) = KL(P(Y|X) || P(Y))',
      ],
      correctAnswer: 1,
      explanation:
        'I(X;Y) = KL(P(X,Y) || P(X)P(Y)) = E_{P(X,Y)}[log P(X,Y)/P(X)P(Y)]. This is the KL divergence from the joint to the product of marginals, measuring dependence. I(X;Y) = H(X) − H(X|Y) = H(Y) − H(Y|X) = H(X) + H(Y) − H(X,Y).',
      hints: [
        'If X and Y are independent, P(X,Y) = P(X)P(Y), so KL = 0 and I(X;Y) = 0.',
        'MI measures how much knowing Y reduces uncertainty about X.',
      ],
    },
  ],

  'variational-inference-elbo': [
    {
      id: 'q-mfml-kp32-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Evidence Lower BOund (ELBO) in variational inference relates to log evidence log p(x) as:',
      options: [
        'log p(x) = ELBO − KL(q(z|x) || p(z|x))',
        'log p(x) = ELBO + KL(q(z|x) || p(z|x))',
        'ELBO = log p(x) · KL(q(z|x) || p(z))',
        'log p(x) = ELBO only when q is the true posterior',
      ],
      correctAnswer: 1,
      explanation:
        'log p(x) = ELBO + KL(q(z|x) || p(z|x)). Since KL ≥ 0, ELBO ≤ log p(x) — it is a lower bound on the log evidence. Maximizing ELBO simultaneously maximizes the log evidence and minimizes KL(q || p(z|x)), driving q toward the true posterior.',
      hints: [
        'KL(q||p) ≥ 0 implies ELBO ≤ log p(x) — hence the name "lower bound".',
        'ELBO is tight (= log p(x)) when q = p(z|x), the true posterior.',
      ],
    },
    {
      id: 'q-mfml-kp32-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Mean-field variational inference assumes the variational posterior factorizes as q(z) = ∏_i q_i(z_i), making the approximation independent across latent dimensions.',
      correctAnswer: 'True',
      explanation:
        'Mean-field VI (from statistical physics) assumes full independence: q(z₁,...,z_k) = q₁(z₁)·...·q_k(z_k). This enables efficient coordinate ascent (CAVI): each factor q_i(z_i) ∝ exp(E_{q_{-i}}[log p(x,z)]) has a closed form for exponential family models. The trade-off: cannot capture posterior correlations between latent dimensions.',
      hints: [
        'Mean field = fully factorized = no correlation structure between latent variables.',
        'CAVI = Coordinate Ascent Variational Inference: update each q_i while holding others fixed.',
      ],
    },
    {
      id: 'q-mfml-kp32-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'The reparameterization trick in VAEs enables gradient-based ELBO optimization by:',
      options: [
        'Replacing the KL term with a Monte Carlo estimator that is always differentiable',
        'Writing z = μ + σ·ε where ε ~ N(0,I), making z a deterministic function of (μ,σ) so gradients flow through the sampling operation',
        'Computing the exact gradient of the log-likelihood using the score function identity',
        'Approximating the discrete latent space with a continuous relaxation',
      ],
      correctAnswer: 1,
      explanation:
        'Sampling z ~ N(μ, σ²) is not differentiable w.r.t. μ, σ. Reparameterizing: ε ~ N(0,1), z = μ + σε makes z a deterministic function of (μ,σ) and the noise ε. Then ∂z/∂μ = 1, ∂z/∂σ = ε, enabling backpropagation through the sampling operation. This gives low-variance gradient estimates.',
      hints: [
        'The problem: ∂/∂θ E_{z~p_θ}[f(z)] = ? Cannot backprop through a sampling node.',
        'Reparameterization moves θ outside the expectation: E_{ε~N(0,I)}[f(g_θ(ε))].',
      ],
    },
  ],

  'matrix-calculus': [
    {
      id: 'q-mfml-kp33-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Jacobian matrix J of a vector function f: ℝⁿ → ℝᵐ has shape:',
      options: [
        'n × n (a square matrix of partial derivatives)',
        'm × n, where J_ij = ∂f_i/∂x_j',
        'n × m, where J_ij = ∂f_j/∂x_i',
        '1 × n (a gradient vector)',
      ],
      correctAnswer: 1,
      explanation:
        'The Jacobian J ∈ ℝ^{m×n} has J_ij = ∂f_i(x)/∂x_j. Each row i contains the gradient of the i-th output component f_i w.r.t. all inputs. For f: ℝⁿ → ℝ (scalar output), the Jacobian is the gradient ∇f ∈ ℝ^{1×n}.',
      hints: [
        'For f: ℝⁿ → ℝᵐ, Jacobian has m rows (outputs) and n columns (inputs).',
        'The Jacobian generalizes the scalar derivative to vector functions.',
      ],
    },
    {
      id: 'q-mfml-kp33-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'The Hessian matrix H of a scalar function f: ℝⁿ → ℝ is the matrix of second partial derivatives H_ij = ∂²f/∂x_i∂x_j, and is always symmetric for twice continuously differentiable functions.',
      correctAnswer: 'True',
      explanation:
        'Schwarz\'s theorem (symmetry of second derivatives): if f is twice continuously differentiable (C²), then ∂²f/∂x_i∂x_j = ∂²f/∂x_j∂x_i, so H = Hᵀ. The Hessian characterizes the local curvature of f; its eigenvalues determine whether a critical point is a minimum (all +), maximum (all −), or saddle point (mixed).',
      hints: [
        'Schwarz\'s theorem: mixed partials commute for C² functions.',
        'Hessian eigenvalues: all positive → local min; all negative → local max; mixed → saddle.',
      ],
    },
    {
      id: 'q-mfml-kp33-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'For loss L = ‖Ax − b‖², the gradient ∂L/∂x using matrix calculus is:',
      options: [
        '2(Ax − b)',
        '2Aᵀ(Ax − b)',
        '2A(Ax − b)',
        'AᵀA · x − Aᵀb',
      ],
      correctAnswer: 1,
      explanation:
        'L = (Ax−b)ᵀ(Ax−b). Using matrix calculus: ∂L/∂x = 2Aᵀ(Ax−b). Derivation: Let r = Ax−b. Then L = rᵀr, ∂L/∂r = 2r, ∂r/∂x = A (Jacobian of Ax−b w.r.t. x). Chain rule: ∂L/∂x = (∂r/∂x)ᵀ · ∂L/∂r = Aᵀ · 2r = 2Aᵀ(Ax−b).',
      hints: [
        'The chain rule for matrix expressions: ∂f/∂x = (∂g/∂x)ᵀ · ∂f/∂g.',
        'The Jacobian of Ax w.r.t. x is A (dimension check: ∂(m×1)/∂(n×1) = m×n = A).',
      ],
    },
  ],

  'optimization-theory': [
    {
      id: 'q-mfml-kp34-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A function f: ℝⁿ → ℝ is convex if for all x, y and λ ∈ [0,1]:',
      options: [
        'f(λx + (1−λ)y) ≥ λf(x) + (1−λ)f(y)',
        'f(λx + (1−λ)y) ≤ λf(x) + (1−λ)f(y)',
        'f(x) ≤ f(y) whenever ‖x‖ ≤ ‖y‖',
        '∇f(x) = 0 has a unique solution',
      ],
      correctAnswer: 1,
      explanation:
        'Convexity: the function value at any convex combination of points lies below the chord connecting those points. Equivalent conditions: (1) Hessian is positive semidefinite everywhere, (2) f(y) ≥ f(x) + ∇f(x)ᵀ(y−x) (first-order characterization). Convexity guarantees any local minimum is a global minimum.',
      hints: [
        'The chord between (x, f(x)) and (y, f(y)) lies above the function graph for convex f.',
        'Key property: for convex f, any local minimum is a global minimum.',
      ],
    },
    {
      id: 'q-mfml-kp34-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'A saddle point is a critical point (∇f = 0) where the Hessian has both positive and negative eigenvalues, indicating it is a minimum in some directions and a maximum in others.',
      correctAnswer: 'True',
      explanation:
        'Saddle points are ubiquitous in high-dimensional neural network loss landscapes. The Hessian at a saddle point is indefinite (some eigenvalues > 0, some < 0). Gradient descent may slow near saddle points (gradient ≈ 0) but noise and curvature asymmetry typically allow escape. True local minima (all positive Hessian eigenvalues) are exponentially rare in high dimensions.',
      hints: [
        'Indefinite Hessian = saddle point. Positive definite = local min. Negative definite = local max.',
        'In high dimensions, most critical points are saddles, not local minima.',
      ],
    },
    {
      id: 'q-mfml-kp34-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'The loss landscape of overparameterized neural networks is often described as having many connected valleys of near-zero loss. This observation is best explained by:',
      options: [
        'Convexity of the cross-entropy loss combined with ReLU activations',
        'Overparameterization creates an underdetermined system where infinitely many weight configurations achieve zero training loss, and these solutions form connected manifolds in weight space',
        'Batch normalization eliminates all local minima by normalizing the loss surface',
        'Stochastic gradient descent always converges to the global minimum in overparameterized models',
      ],
      correctAnswer: 1,
      explanation:
        'When the number of parameters exceeds the number of training samples, the system is underdetermined: there are infinitely many weight configurations achieving zero training loss. Recent work (e.g., mode connectivity) shows these solutions often lie on connected paths in weight space, with low loss throughout. This is consistent with empirical findings that different SGD runs from different initializations reach qualitatively similar solutions.',
      hints: [
        'Overparameterization = more unknowns than equations → infinitely many solutions.',
        'Mode connectivity: two independently trained networks can be connected by a path of low-loss networks.',
      ],
    },
  ],

  'measure-theory-probability': [
    {
      id: 'q-mfml-kp35-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A σ-algebra (sigma-algebra) F on sample space Ω is a collection of subsets satisfying:',
      options: [
        'F contains only finite subsets of Ω',
        'F contains Ω, is closed under complementation, and closed under countable unions',
        'F contains all subsets with probability > 0.5',
        'F is the power set of Ω restricted to measurable events',
      ],
      correctAnswer: 1,
      explanation:
        'A σ-algebra F satisfies: (1) Ω ∈ F, (2) A ∈ F ⟹ Aᶜ ∈ F (closed under complement), (3) A₁, A₂,... ∈ F ⟹ ∪ᵢAᵢ ∈ F (closed under countable union). The triple (Ω, F, P) is a probability space where F specifies which events can be assigned probability.',
      hints: [
        'σ-algebra defines "measurable" events — events we can assign probabilities to.',
        'Closure under countable union allows handling continuous distributions.',
      ],
    },
    {
      id: 'q-mfml-kp35-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'For a continuous random variable X with density f_X, the expectation E[g(X)] = ∫ g(x) f_X(x) dx is defined as a Lebesgue integral, which agrees with the Riemann integral when f_X is Riemann-integrable.',
      correctAnswer: 'True',
      explanation:
        'The Lebesgue integral generalizes the Riemann integral. For well-behaved densities (e.g., continuous or piecewise continuous), both integrals agree. Lebesgue integration handles more general functions (e.g., indicator functions, limits of measurable functions) and allows powerful convergence theorems (Dominated Convergence, Monotone Convergence) crucial for probability theory.',
      hints: [
        'Lebesgue integration: partition the range of f (not the domain) — more general than Riemann.',
        'Key theorem: Dominated Convergence allows interchanging limits and expectations.',
      ],
    },
    {
      id: 'q-mfml-kp35-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'The Radon-Nikodym theorem states that if P is absolutely continuous with respect to Q (P ≪ Q), then:',
      options: [
        'P and Q are equal as measures on all measurable sets',
        'There exists a measurable function f = dP/dQ such that P(A) = ∫_A f dQ for all measurable A',
        'The KL divergence KL(P||Q) is bounded by the L² norm of P − Q',
        'P and Q share the same support and have equal marginals',
      ],
      correctAnswer: 1,
      explanation:
        'The Radon-Nikodym derivative (likelihood ratio) f = dP/dQ satisfies P(A) = ∫_A f dQ. Absolute continuity P ≪ Q means Q(A) = 0 ⟹ P(A) = 0. The R-N derivative is the foundation of likelihood ratios in statistics, KL divergence (KL(P||Q) = E_P[log dP/dQ]), and importance sampling.',
      hints: [
        'P ≪ Q means P cannot assign mass to Q-null sets.',
        'dP/dQ is the density of P relative to Q — used in importance sampling weights.',
      ],
    },
  ],

  'bayesian-inference': [
    {
      id: 'q-mfml-kp36-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Bayes\' theorem for parameter inference updates beliefs about θ given data x as:',
      options: [
        'P(θ|x) = P(x)P(θ) / P(x|θ)',
        'P(θ|x) = P(x|θ)P(θ) / P(x)',
        'P(θ|x) = P(x|θ) / P(θ)',
        'P(θ|x) = P(θ)P(x|θ) · P(x)',
      ],
      correctAnswer: 1,
      explanation:
        'Bayes\' theorem: P(θ|x) ∝ P(x|θ) · P(θ). The posterior P(θ|x) combines the likelihood P(x|θ) (how well θ explains data x) with the prior P(θ) (our belief before seeing data). P(x) = ∫P(x|θ)P(θ)dθ is the normalizing constant (model evidence).',
      hints: [
        'Posterior ∝ Likelihood × Prior. The normalizer P(x) is often intractable.',
        'MAP: θ* = argmax P(θ|x). MLE: θ* = argmax P(x|θ) (no prior).',
      ],
    },
    {
      id: 'q-mfml-kp36-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'A conjugate prior is a prior distribution P(θ) such that the posterior P(θ|x) belongs to the same parametric family as the prior, enabling closed-form Bayesian updates.',
      correctAnswer: 'True',
      explanation:
        'Conjugate priors give analytical posteriors: Beta prior + Bernoulli likelihood → Beta posterior; Gaussian prior + Gaussian likelihood → Gaussian posterior; Dirichlet prior + Categorical likelihood → Dirichlet posterior. Conjugacy enables efficient sequential Bayesian updating without numerical integration.',
      hints: [
        'Beta-Binomial conjugacy: Beta(α,β) prior + n successes out of m trials → Beta(α+successes, β+failures).',
        'Conjugate priors are convenient but not always a good model of prior beliefs.',
      ],
    },
    {
      id: 'q-mfml-kp36-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Maximum A Posteriori (MAP) estimation can be viewed as MLE with regularization. Which prior corresponds to which regularizer?',
      options: [
        'Laplace prior → L2 (Ridge) regularization; Gaussian prior → L1 (LASSO)',
        'Gaussian prior → L2 (Ridge) regularization; Laplace prior → L1 (LASSO)',
        'Both Gaussian and Laplace priors lead to L2 regularization with different λ values',
        'Gaussian prior → dropout regularization; Laplace prior → L2 regularization',
      ],
      correctAnswer: 1,
      explanation:
        'MAP: θ_MAP = argmax [log P(x|θ) + log P(θ)]. Gaussian prior N(0,σ²I): log P(θ) = −‖θ‖²/(2σ²) ∝ −λ‖θ‖² = L2 regularization (Ridge). Laplace prior ∝ exp(−λ‖θ‖₁): log P(θ) ∝ −λ‖θ‖₁ = L1 regularization (LASSO). L1 promotes sparsity because the Laplace prior has sharper peak at zero.',
      hints: [
        'Gaussian is quadratic → L2 penalty. Laplace has exponential tails → L1 penalty.',
        'Laplace prior → L1 → sparse solutions (many parameters go to exactly zero).',
      ],
    },
  ],

  'gaussian-processes': [
    {
      id: 'q-mfml-kp37-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A Gaussian Process (GP) is best described as:',
      options: [
        'A neural network with Gaussian activation functions',
        'A distribution over functions where any finite collection of function values has a joint Gaussian distribution',
        'A Markov chain with Gaussian transition probabilities',
        'A Gaussian mixture model with infinitely many components',
      ],
      correctAnswer: 1,
      explanation:
        'A GP f ~ GP(μ, k) defines a distribution over functions: for any finite set of inputs {x₁,...,xₙ}, the outputs [f(x₁),...,f(xₙ)] ~ N(μ, K) where K_ij = k(xᵢ, xⱼ). The kernel k specifies the covariance structure — smoothness, periodicity, etc. GPs provide non-parametric Bayesian regression with calibrated uncertainty.',
      hints: [
        'GP = distribution over functions, not a distribution over parameters.',
        'Any finite marginal of a GP is multivariate Gaussian — that\'s the definition.',
      ],
    },
    {
      id: 'q-mfml-kp37-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In GP regression, the posterior predictive mean at a new point x* is a weighted sum of training outputs y, where the weights depend on the kernel function k(x*, xᵢ) evaluated between x* and training points.',
      correctAnswer: 'True',
      explanation:
        'GP posterior: μ*(x*) = k(x*, X)[K(X,X) + σ²I]⁻¹y = Σᵢ αᵢ k(x*, xᵢ) where α = [K+σ²I]⁻¹y. The prediction is an interpolation of training outputs weighted by kernel similarities. The posterior variance σ²*(x*) = k(x*,x*) − k(x*,X)[K+σ²I]⁻¹k(X,x*) quantifies uncertainty.',
      hints: [
        'Kernel k(x*,xᵢ) measures similarity between x* and training point xᵢ.',
        'Far from training data: k(x*,xᵢ) ≈ 0, posterior variance ≈ prior variance.',
      ],
    },
    {
      id: 'q-mfml-kp37-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'GP hyperparameter optimization (e.g., kernel length scale ℓ) is typically performed by maximizing:',
      options: [
        'The posterior predictive accuracy on a held-out validation set using cross-validation',
        'The log marginal likelihood log P(y|X, θ_hyp) = −½ yᵀ(K+σ²I)⁻¹y − ½ log|K+σ²I| − n/2 log(2π)',
        'The ELBO of a variational approximation to the GP posterior',
        'The squared error between predicted and actual outputs on the training set',
      ],
      correctAnswer: 1,
      explanation:
        'The log marginal likelihood (type-II MLE / evidence) balances data fit (−½ yᵀ(K+σ²I)⁻¹y) against model complexity (−½ log|K+σ²I|). Gradient-based optimization w.r.t. hyperparameters (ℓ, σ_f, σ_n) yields an automatic Occam\'s razor — it penalizes overly complex kernels that overfit.',
      hints: [
        'Log marginal likelihood = log P(y|X, hyp): integrated over all function values (GP prior).',
        'Complexity penalty −½ log|K| prevents overfitting by penalizing high model complexity.',
      ],
    },
  ],

  'monte-carlo': [
    {
      id: 'q-mfml-kp38-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Importance sampling estimates E_P[f(x)] when sampling from P is difficult by:',
      options: [
        'Sampling x ~ P directly and computing the sample mean of f(x)',
        'Sampling x ~ Q and computing the weighted mean (1/N) Σᵢ f(xᵢ) w(xᵢ) where w(xᵢ) = P(xᵢ)/Q(xᵢ)',
        'Using rejection sampling to accept only samples that satisfy f(x) > 0',
        'Computing the expectation analytically using moment-generating functions',
      ],
      correctAnswer: 1,
      explanation:
        'Importance sampling: E_P[f(x)] = E_Q[f(x)P(x)/Q(x)] = E_Q[f(x)w(x)]. Samples x_i ~ Q are weighted by importance weights w_i = P(x_i)/Q(x_i). The estimator is unbiased if Q(x) > 0 wherever P(x)f(x) ≠ 0. Variance is low when Q ≈ P·|f| (proposal matches integrand shape).',
      hints: [
        'Importance weights w = P/Q correct for the mismatch between sampling distribution Q and target P.',
        'High-variance weights (Q much lighter-tailed than P) cause catastrophic importance sampling failure.',
      ],
    },
    {
      id: 'q-mfml-kp38-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Markov Chain Monte Carlo (MCMC) methods like Metropolis-Hastings generate samples from a target distribution P(x) by constructing a Markov chain whose stationary distribution equals P(x), without needing to evaluate the normalizing constant of P.',
      correctAnswer: 'True',
      explanation:
        'MH accepts/rejects proposed moves using the acceptance ratio α = min(1, P(x\')Q(x|x\')/P(x)Q(x\'|x)). Since P appears as a ratio, the normalizing constant cancels — only the unnormalized P̃(x) ∝ P(x) is needed. Under detailed balance, the chain\'s stationary distribution is P(x). This makes MCMC invaluable for Bayesian inference where P(θ|x) ∝ P(x|θ)P(θ) is known up to normalizer.',
      hints: [
        'Detailed balance: π(x)T(x\'|x) = π(x\')T(x|x\'). Ensures P is the stationary distribution.',
        'The normalizing constant P(x) = ∫P(x|θ)P(θ)dθ is often intractable — MCMC avoids it.',
      ],
    },
    {
      id: 'q-mfml-kp38-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Control variates reduce the variance of a Monte Carlo estimator ê = (1/N)Σ f(xᵢ) by:',
      options: [
        'Increasing N (sample size) to reduce variance at rate 1/√N',
        'Subtracting a correlated function c·g(x) with known mean E[g] = μ_g, giving ê_CV = (1/N)Σ [f(xᵢ) − c(g(xᵢ) − μ_g)]',
        'Importance-weighting samples to match a lower-variance proposal distribution',
        'Truncating extreme outliers that inflate the variance of f(x)',
      ],
      correctAnswer: 1,
      explanation:
        'Control variate estimator: ê_CV = (1/N)Σ[f(x_i) − c(g(x_i) − μ_g)] is unbiased (since E[g − μ_g] = 0). Optimal c* = Cov(f,g)/Var(g) minimizes Var(ê_CV) = Var(f)(1 − ρ²_{fg}). When |ρ_{fg}| ≈ 1, variance reduction is dramatic. The REINFORCE baseline in RL is a control variate for the policy gradient estimator.',
      hints: [
        'Subtracting zero-mean term c(g − μ_g) doesn\'t change the mean but can reduce variance.',
        'Optimal coefficient c* = Cov(f,g)/Var(g). Higher correlation → larger variance reduction.',
      ],
    },
  ],

  'spectral-graph-theory': [
    {
      id: 'q-mfml-kp39-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The graph Laplacian L of an undirected graph G = (V, E) with adjacency matrix A and degree matrix D is defined as:',
      options: [
        'L = A + D',
        'L = D − A',
        'L = A · D⁻¹',
        'L = D⁻½ A D⁻½',
      ],
      correctAnswer: 1,
      explanation:
        'The combinatorial graph Laplacian L = D − A where D_ii = Σ_j A_ij (degree of node i). L is symmetric, positive semidefinite, with smallest eigenvalue 0 (eigenvector 1). The number of zero eigenvalues equals the number of connected components. L captures graph connectivity and is fundamental to spectral graph theory.',
      hints: [
        'D is diagonal with node degrees; A is the adjacency matrix.',
        'Normalized Laplacian: L_norm = D^{-1/2}(D−A)D^{-1/2} = I − D^{-1/2}AD^{-1/2}.',
      ],
    },
    {
      id: 'q-mfml-kp39-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'PageRank computes a stationary distribution of a random walk on the web graph, where at each step the surfer either follows a random outgoing link with probability d, or teleports to a random page with probability (1−d).',
      correctAnswer: 'True',
      explanation:
        'PageRank vector π satisfies π = d·Aᵀπ + (1−d)·1/n. The damping factor d ≈ 0.85 prevents rank sinks (nodes with no outlinks) and dangling nodes. The teleportation term (1−d)/n ensures the Markov chain is irreducible and aperiodic, guaranteeing a unique stationary distribution. PageRank = principal eigenvector of the modified transition matrix.',
      hints: [
        'Random surfer model: follow link with prob d, teleport with prob 1−d.',
        'Without teleportation, dangling nodes (no outlinks) accumulate all rank — it leaks.',
      ],
    },
    {
      id: 'q-mfml-kp39-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Spectral clustering uses the eigenvectors of the graph Laplacian because:',
      options: [
        'Laplacian eigenvectors maximize the within-cluster edge weight (graph cut)',
        'The k smallest eigenvectors of L span a k-dimensional embedding that minimizes the normalized cut, and k-means in this space finds near-optimal clusters',
        'Laplacian eigenvectors are sparse, enabling efficient computation of cluster assignments',
        'The largest eigenvectors capture global graph structure while small eigenvectors capture local neighborhoods',
      ],
      correctAnswer: 1,
      explanation:
        'The relaxation of the normalized cut problem (NcutMin) is solved exactly by the k eigenvectors corresponding to the k smallest eigenvalues of the normalized Laplacian L_sym = D^{-1/2}LD^{-1/2}. These eigenvectors define an embedding where graph-connected nodes cluster together. Running k-means in this embedding space approximates the optimal graph partitioning.',
      hints: [
        'Smallest eigenvalues of L capture global connectivity; smallest eigenvectors span the cluster structure.',
        'Fiedler vector = second smallest eigenvector — used for bisection (k=2 case).',
      ],
    },
  ],

  'concentration-bounds': [
    {
      id: 'q-mfml-kp40-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Markov\'s inequality states that for a non-negative random variable X and t > 0:',
      options: [
        'P(X ≥ t) ≤ E[X²]/t²',
        'P(X ≥ t) ≤ E[X]/t',
        'P(|X − E[X]| ≥ t) ≤ Var(X)/t²',
        'P(X ≥ t) ≤ exp(−t/E[X])',
      ],
      correctAnswer: 1,
      explanation:
        'Markov\'s inequality: P(X ≥ t) ≤ E[X]/t. It requires only finite mean. Proof: E[X] ≥ E[X·1(X≥t)] ≥ t·P(X≥t). Chebyshev\'s inequality (requires finite variance) is Markov applied to (X−E[X])²: P(|X−μ|≥t) ≤ σ²/t².',
      hints: [
        'Markov requires only E[X] < ∞ and X ≥ 0 — extremely weak assumption.',
        'Chebyshev\'s = apply Markov to (X − E[X])² with threshold t² — gives tighter bound.',
      ],
    },
    {
      id: 'q-mfml-kp40-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Hoeffding\'s inequality states that for independent bounded random variables Xᵢ ∈ [aᵢ, bᵢ] with S_n = Σ Xᵢ, the tail bound P(S_n − E[S_n] ≥ t) ≤ exp(−2t²/Σ(bᵢ−aᵢ)²) decays exponentially in t.',
      correctAnswer: 'True',
      explanation:
        'Hoeffding\'s inequality gives exponential (sub-Gaussian) concentration for bounded variables — much tighter than Chebyshev\'s polynomial bound. For the sample mean X̄_n of i.i.d. [0,1] variables: P(X̄_n − μ ≥ ε) ≤ exp(−2nε²). This is the foundation of PAC learning bounds and confidence intervals in ML theory.',
      hints: [
        'Exponential decay vs. Chebyshev\'s 1/t² polynomial decay — Hoeffding is exponentially tighter.',
        'Hoeffding requires bounded variables; Gaussian concentration requires sub-Gaussian variables.',
      ],
    },
    {
      id: 'q-mfml-kp40-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'The union bound (Boole\'s inequality) P(∪ᵢ Aᵢ) ≤ Σᵢ P(Aᵢ) is used in ML theory to:',
      options: [
        'Prove that the sample mean concentrates around the true mean for Gaussian data',
        'Convert per-hypothesis Hoeffding bounds into a uniform convergence guarantee over a finite hypothesis class: P(∃h∈H: |err_S(h) − err(h)| ≥ ε) ≤ |H|·exp(−2nε²)',
        'Derive the Vapnik-Chervonenkis dimension of a hypothesis class from its size',
        'Bound the mutual information between inputs and predictions',
      ],
      correctAnswer: 1,
      explanation:
        'The union bound converts per-hypothesis Hoeffding bounds into a uniform convergence guarantee: P(∃h∈H: |err_S(h) − err(h)| ≥ ε) ≤ Σ_{h∈H} P(|err_S(h) − err(h)| ≥ ε) ≤ |H|·exp(−2nε²). Setting this ≤ δ and solving for ε: with probability ≥ 1−δ, all hypotheses satisfy |training error − true error| ≤ √((log|H| + log(1/δ))/(2n)).',
      hints: [
        'Union bound: probability of any bad event ≤ sum of individual bad event probabilities.',
        'The log|H| factor in the generalization bound is the hypothesis class complexity penalty.',
      ],
    },
  ],
};

Object.assign(questions, extra);

registerQuestions(questions);
export default questions;
