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
        "In tensor notation, rank (order) equals the number of indices needed. A vector x \\in \\mathbb{R}\\^n is addressed by a single index x\\_i - making it rank-1. Scalars are rank-0, matrices rank-2.",
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
        "Given u = [1, 2, 3] and v = [4, 0, −1], compute the dot product u \\cdot v. The formula is u \\cdot v = \\Sigma\\_i u\\_iv\\_i.",
      options: ["1", "2", "3", "5"],
      correctAnswer: 0,
      explanation:
        "u \\cdot v = 1\\times4 + 2\\times0 + 3\\times(−1) = 4 + 0 − 3 = 1. Only the first and third terms are nonzero.",
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
        "Matrix A has shape (3 \\times 4) and matrix B has shape (4 \\times 2). The product AB has shape:",
      options: ["4 \\times 4", "3 \\times 2", "4 \\times 2", "3 \\times 4"],
      correctAnswer: 1,
      explanation:
        "For AB to be defined, the inner dimensions must match: A is (m \\times k) = (3 \\times 4) and B is (k \\times p) = (4 \\times 2). The result has shape (m \\times p) = (3 \\times 2). The inner dimension k = 4 is consumed.",
      hints: [
        'Rule: (m \\times k) \\times (k \\times p) = (m \\times p). The "inner" k must match.',
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
        "AB \$\\neq\$ BA in general, so matrix multiplication is not commutative",
        "AB = BA only when both matrices are square",
        "AB and BA are always transposes of each other",
      ],
      correctAnswer: 1,
      explanation:
        "AB = [[7,2],[3,1]] and BA = [[1,2],[3,7]]. Since AB \$\\neq\$ BA, matrix multiplication is not commutative. However it is always associative: (AB)C = A(BC).",
      hints: [
        "AB: row 1 of A dotted with cols of B gives [1\\cdot1+2\\cdot3, 1\\cdot0+2\\cdot1] = [7,2]. Row 2: [0+3, 0+1] = [3,1].",
        "BA: row 1 of B dotted with cols of A gives [1,2]. Row 2: [3\\cdot1+1\\cdot0, 3\\cdot2+1\\cdot1] = [3,7].",
      ],
    },
    {
      id: "q-mfml-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A linear map T: \\mathbb{R}\\^n \\to \\mathbb{R}ᵐ is represented as multiplication by a matrix A. What is the shape of A?",
      options: ["n \\times m", "m \\times n", "n \\times n", "m \\times m"],
      correctAnswer: 1,
      explanation:
        "For Ax to be defined when x \\in \\mathbb{R}\\^n, A must have n columns. Since Ax \\in \\mathbb{R}ᵐ, A must have m rows. So A has shape m \\times n.",
      hints: [
        "x \\in \\mathbb{R}\\^n means x is a column vector with n entries \\to A needs n columns.",
        "The output Ax \\in \\mathbb{R}ᵐ \\to A needs m rows. Shape: m \\times n.",
      ],
    },
    {
      id: "q-mfml-kp2-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "If A and B are both invertible n \\times n matrices, then (AB)\\^{-1} = A\\^{-1}B\\^{-1}.",
      correctAnswer: "False",
      explanation:
        'The correct formula is (AB)\\^{-1} = B\\^{-1}A\\^{-1} - order reverses. Verify: (AB)(B\\^{-1}A\\^{-1}) = A(BB\\^{-1})A\\^{-1} = AIA\\^{-1} = I. The "socks before shoes" rule: to undo AB, first undo B then undo A.',
      hints: [
        "Try multiplying AB by B\\^{-1}A\\^{-1} and check if you get I.",
        "Think of putting on socks (A) then shoes (B): to reverse, remove shoes (B\\^{-1}) first, then socks (A\\^{-1}).",
      ],
    },
  ],

  "eigenvalues-eigenvectors": [
    {
      id: "q-mfml-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For matrix A = [[2, 1], [1, 2]], find the eigenvalues by solving det(A − \\lambdaI) = 0.",
      options: [
        "\\lambda = 1 and \\lambda = 3",
        "\\lambda = 2 and \\lambda = 2",
        "\\lambda = 0 and \\lambda = 4",
        "\\lambda = −1 and \\lambda = 3",
      ],
      correctAnswer: 0,
      explanation:
        "det(A − \\lambdaI) = det([[2−\\lambda, 1],[1, 2−\\lambda]]) = (2−\\lambda)\\^2 − 1 = \\lambda\\^2 − 4\\lambda + 3 = (\\lambda−1)(\\lambda−3) = 0. So \\lambda\\_1 = 1, \\lambda\\_2 = 3.",
      hints: [
        "Form A − \\lambdaI = [[2−\\lambda, 1],[1, 2−\\lambda]] and compute its determinant: (2−\\lambda)\\^2 − 1\\cdot1.",
        "Expand: (2−\\lambda)\\^2 − 1 = 4 − 4\\lambda + \\lambda\\^2 − 1 = \\lambda\\^2 − 4\\lambda + 3. Factor as (\\lambda−1)(\\lambda−3).",
      ],
    },
    {
      id: "q-mfml-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Spectral Theorem states that for a real symmetric matrix A, there exists an orthogonal matrix Q such that A = Q\\LambdaQ\\^T where \\Lambda is diagonal. What are the diagonal entries of \\Lambda?",
      options: [
        "The singular values of A",
        "The eigenvalues of A, which are all real",
        "The diagonal entries of A",
        "The entries of the Cholesky factor",
      ],
      correctAnswer: 1,
      explanation:
        "The Spectral Theorem guarantees that every real symmetric matrix has real eigenvalues and orthonormal eigenvectors. \\Lambda = diag(\\lambda\\_1, …, \\lambda\\_n) contains the real eigenvalues, and the columns of Q are the corresponding orthonormal eigenvectors.",
      hints: [
        "For A = [[2,1],[1,2]], \\Lambda = diag(1,3) and Q has columns [1/√2, 1/√2]\\^T and [1/√2, −1/√2]\\^T.",
        "Symmetry A = A\\^T forces all eigenvalues to be real and eigenvectors for distinct eigenvalues to be orthogonal.",
      ],
    },
    {
      id: "q-mfml-kp3-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Every n \\times n square matrix can be diagonalized over the real numbers.",
      correctAnswer: "False",
      explanation:
        "Diagonalization requires n linearly independent eigenvectors. The matrix A = [[1,1],[0,1]] has characteristic polynomial (1−\\lambda)\\^2 = 0, so \\lambda = 1 with algebraic multiplicity 2, but only one independent eigenvector [1,0]\\^T. It cannot be diagonalized over \\mathbb{R}.",
      hints: [
        "Check A = [[1,1],[0,1]]: det(A−\\lambdaI) = (1−\\lambda)\\^2. Solving gives \\lambda = 1 only. Then A−I = [[0,1],[0,0]] has null space spanned by [1,0]\\^T - only one eigenvector.",
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
        "In the SVD A = U\\SigmaV\\^T of an m \\times n matrix A (m \\geq n), which statement correctly describes U, \\Sigma, V?",
      options: [
        "U is n \\times n orthogonal, \\Sigma is m \\times n diagonal, V is m \\times m orthogonal",
        "U is m \\times m orthogonal (left singular vectors), \\Sigma is m \\times n diagonal (singular values on diagonal), V is n \\times n orthogonal (right singular vectors)",
        "U contains eigenvalues, \\Sigma contains eigenvectors",
        "U = V for symmetric matrices",
      ],
      correctAnswer: 1,
      explanation:
        "SVD: A = U\\SigmaV\\^T where U \\in \\mathbb{R}ᵐˣᵐ is orthogonal with left singular vectors as columns, \\Sigma \\in \\mathbb{R}ᵐˣ\\^n has singular values \\sigma\\_1 \\geq \\sigma\\_2 \\geq … \\geq 0 on its diagonal, and V \\in \\mathbb{R}\\^nˣ\\^n is orthogonal with right singular vectors as columns.",
      hints: [
        "The singular values \\sigma\\_i = √(eigenvalues of A\\^TA) appear in decreasing order on the diagonal of \\Sigma.",
        "Left singular vectors (cols of U) are eigenvectors of AA\\^T; right singular vectors (cols of V) are eigenvectors of A\\^TA.",
      ],
    },
    {
      id: "q-mfml-kp4-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The matrix A = [[3,0],[0,2],[0,0]] has SVD with singular values \\sigma\\_1 = 3, \\sigma\\_2 = 2. Its best rank-1 approximation A\\_1 has Frobenius-norm error ‖A − A\\_1‖_F equal to:",
      options: ["3", "2", "√13", "1"],
      correctAnswer: 1,
      explanation:
        "By the Eckart-Young theorem, the rank-1 truncated SVD minimizes the Frobenius norm error. The error is ‖A − A\\_1‖_F = √(\\sigma\\_2\\^2 + \\sigma\\_3\\^2 + …) = √(2\\^2) = 2, since \\sigma\\_3 = 0 here.",
      hints: [
        "‖A‖_F\\^2 = \\Sigma\\_i \\sigma\\_i\\^2 = 3\\^2 + 2\\^2 = 9 + 4 = 13. Keeping rank-1 uses \\sigma\\_1=3, discarding \\sigma\\_2=2.",
        "Error\\^2 = \\sigma\\_2\\^2 = 4, so error = 2.",
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
        "Singular values \\sigma\\_i = √(\\lambda\\_i(A\\^TA)). Since A\\^TA is positive semi-definite, all its eigenvalues \\lambda\\_i \\geq 0, so \\sigma\\_i = √\\lambda\\_i \\geq 0. This holds even for complex matrices (using A*A).",
      hints: [
        "A\\^TA is PSD because x\\^T(A\\^TA)x = ‖Ax‖\\^2 \\geq 0 for all x.",
        "Non-negative eigenvalues of A\\^TA \\to non-negative square roots \\to non-negative singular values.",
      ],
    },
  ],

  "pca-linalg": [
    {
      id: "q-mfml-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Given centered data matrix X̃ \\in \\mathbb{R}\\^nˣᵈ, PCA finds directions of maximum variance by computing eigenvectors of which matrix?",
      options: [
        "X̃ directly (n \\times d)",
        "The sample covariance matrix C = X̃\\^TX̃/(n−1) \\in \\mathbb{R}ᵈˣᵈ",
        "The Gram matrix X̃X̃\\^T \\in \\mathbb{R}\\^nˣ\\^n",
        "The Hessian of the reconstruction loss",
      ],
      correctAnswer: 1,
      explanation:
        "PCA maximizes variance of projected data. For unit vector w, variance of X̃w is w\\^TCw where C = X̃\\^TX̃/(n−1). Maximizing this subject to ‖w‖=1 by Lagrange multipliers gives Cw = \\lambdaw - an eigenvector problem.",
      hints: [
        "Projection of X̃ onto unit vector w: the projected coordinates are X̃w \\in \\mathbb{R}\\^n.",
        "Variance of X̃w = (1/(n−1))‖X̃w‖\\^2 = w\\^T(X̃\\^TX̃/(n−1))w = w\\^TCw. Maximize over ‖w‖=1.",
      ],
    },
    {
      id: "q-mfml-kp5-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "If the covariance matrix C has eigenvalues \\lambda\\_1 = 5, \\lambda\\_2 = 3, \\lambda\\_3 = 2, what fraction of total variance is explained by the first two principal components?",
      options: ["5/10 = 50%", "8/10 = 80%", "5/8 = 62.5%", "3/10 = 30%"],
      correctAnswer: 1,
      explanation:
        "Total variance = trace(C) = sum of eigenvalues = 5 + 3 + 2 = 10. The first two PCs capture variance \\lambda\\_1 + \\lambda\\_2 = 5 + 3 = 8. Fraction = 8/10 = 80%.",
      hints: [
        "Each eigenvalue equals the variance captured by its corresponding principal component.",
        "Total variance = \\Sigma\\lambda\\_i = 10. Two-PC variance = 5+3 = 8. Ratio = 8/10.",
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
        "The covariance matrix C is real and symmetric, so by the Spectral Theorem its eigenvectors can be chosen to be orthonormal. Principal components are these eigenvectors, so they are mutually orthogonal: PC\\_i \\cdot PC\\_j = 0 for i \$\\neq\$ j.",
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
        "A fair six-sided die is rolled. Let A = {1,2,3} and B = {2,4,6}. Compute P(A \\cup B).",
      options: ["1/2", "2/3", "5/6", "1/3"],
      correctAnswer: 2,
      explanation:
        "P(A) = 3/6 = 1/2, P(B) = 3/6 = 1/2, P(A \\cap B) = P({2}) = 1/6. By inclusion-exclusion: P(A \\cup B) = P(A) + P(B) − P(A \\cap B) = 1/2 + 1/2 − 1/6 = 5/6.",
      hints: [
        "A \\cap B = {2} (elements in both A and B). P(A \\cap B) = 1/6.",
        "Inclusion-exclusion: P(A \\cup B) = P(A) + P(B) − P(A \\cap B) = 3/6 + 3/6 − 1/6 = 5/6.",
      ],
    },
    {
      id: "q-mfml-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "If events A and B are mutually exclusive (P(A \\cap B) = 0), then they are also independent (P(A \\cap B) = P(A)\\cdotP(B)).",
      correctAnswer: "False",
      explanation:
        "Mutual exclusivity means P(A \\cap B) = 0. Independence requires P(A \\cap B) = P(A)\\cdotP(B). These are equal only if P(A) = 0 or P(B) = 0. For a fair die with A = {1,2,3} and B = {4,5,6}: P(A\\capB) = 0 but P(A)\\cdotP(B) = 1/4 \$\\neq\$ 0. They are dependent.",
      hints: [
        "Knowing A occurred means B cannot occur - that is informative, violating independence.",
        "Independence: P(B|A) = P(B). But P(B|A) = 0 \$\\neq\$ 1/2 = P(B) for mutually exclusive events.",
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
        "Using Bayes' theorem: P(disease|+) = P(+|disease)\\cdotP(disease) / P(+). P(+) = 0.90\\times0.01 + 0.05\\times0.99 = 0.009 + 0.0495 = 0.0585. P(disease|+) = 0.009/0.0585 \\approx 0.154 \\approx 15%.",
      hints: [
        "P(+) = P(+|D)P(D) + P(+|¬D)P(¬D) = 0.90\\times0.01 + (1−0.95)\\times0.99.",
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
      options: ["120/1024 \\approx 0.117", "3/10 = 0.3", "1/10 = 0.1", "0.5\\^3 = 0.125"],
      correctAnswer: 0,
      explanation:
        "P(X=k) = C(n,k)\\cdotp\\^k\\cdot(1−p)\\^n\\^{-\\^k. Here P(X=3) = C(10,3)\\cdot(0.5)\\^3\\cdot(0.5)⁷ = 120\\cdot(0.5)¹⁰ = 120/1024 \\approx 0.117.",
      hints: [
        "Binomial PMF: P(X=k) = C(n,k)\\cdotp\\^k\\cdot(1−p)\\^n\\^{-\\^k. With p=0.5: P(X=3) = C(10,3)\\cdot(0.5)¹⁰.",
        "C(10,3) = 10!/(3!7!) = 120. (0.5)¹⁰ = 1/1024. Product: 120/1024.",
      ],
    },
    {
      id: "q-mfml-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "If X ~ N(\\mu, \\sigma\\^2) and Y = aX + b (a, b constants), what is the distribution of Y?",
      options: [
        "Y ~ N(a\\mu, \\sigma\\^2) - mean shifts but variance unchanged",
        "Y ~ N(a\\mu + b, a\\^2\\sigma\\^2) - mean and variance both transform",
        "Y ~ N(\\mu + b, \\sigma\\^2) - only mean shifts by b",
        "Y is no longer Gaussian if a \$\\neq\$ 1",
      ],
      correctAnswer: 1,
      explanation:
        "Linear transformations of Gaussians are Gaussian. E[Y] = E[aX+b] = a\\mu+b. Var(Y) = Var(aX+b) = a\\^2Var(X) = a\\^2\\sigma\\^2. So Y ~ N(a\\mu+b, a\\^2\\sigma\\^2). This closure under linear operations is a key property exploited in Kalman filters and GP inference.",
      hints: [
        "E[aX+b] = a\\cdotE[X]+b = a\\mu+b.",
        "Var(aX+b) = a\\^2\\cdotVar(X) = a\\^2\\sigma\\^2 (adding constant b shifts mean, not variance).",
      ],
    },
    {
      id: "q-mfml-kp7-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The Poisson distribution can be derived as the limit of Binomial(n,p) as n \\to \\infty, p \\to 0, with np = \\lambda fixed.",
      correctAnswer: "True",
      explanation:
        "As n\\to\\infty, p\\to0 with np=\\lambda: C(n,k)\\cdotp\\^k\\cdot(1−p)\\^n\\^{-\\^k \\to e\\^{-\\lambda\\lambda\\^k/k!. This is the Poisson PMF. Practically: the Poisson models rare-event counts (\\lambda small) over many trials (n large).",
      hints: [
        "C(n,k)\\cdotp\\^k \\approx n\\^kp\\^k/k! = \\lambda\\^k/k! for large n. And (1−p)\\^n \\approx (1−\\lambda/n)\\^n \\to e\\^{-\\lambda.",
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
        "Bayes' theorem is: P(H | E) = P(E | H) \\cdot P(H) / P(E). In ML terms with \\theta as model parameters and D as data, the posterior P(\\theta|D) equals:",
      options: [
        "P(\\theta) / P(D|\\theta)",
        "P(D|\\theta) \\cdot P(\\theta) / P(D)",
        "P(D) \\cdot P(\\theta)",
        "P(\\theta|D) \\cdot P(D)",
      ],
      correctAnswer: 1,
      explanation:
        "Posterior \\propto Likelihood \\times Prior: P(\\theta|D) = P(D|\\theta)\\cdotP(\\theta)/P(D). The denominator P(D) = \\intP(D|\\theta)P(\\theta)d\\theta is the marginal likelihood (evidence), which normalizes the posterior to integrate to 1.",
      hints: [
        "Map H \\to \\theta (hypothesis/parameters) and E \\to D (evidence/data).",
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
        "p⁷(1−p)\\^3 (a Beta(8,4) distribution)",
        "7/10 (a point mass at the MLE)",
        "(1−p)⁷p\\^3",
        "1/10 for all p",
      ],
      correctAnswer: 0,
      explanation:
        "With Binomial likelihood P(7H,3T|p) = C(10,7)p⁷(1−p)\\^3 and uniform prior P(p)=1, posterior \\propto p⁷(1−p)\\^3 which is a Beta(8,4) distribution. The posterior mean is 8/(8+4) = 2/3 \\approx 0.667.",
      hints: [
        "Posterior \\propto likelihood \\times prior = p⁷(1−p)\\^3 \\times 1 = p⁷(1−p)\\^3.",
        "This matches Beta(\\alpha,\\beta) with \\alpha = 7+1 = 8, \\beta = 3+1 = 4. Uniform prior = Beta(1,1).",
      ],
    },
    {
      id: "q-mfml-kp8-3",
      type: "true-false",
      difficulty: "hard",
      question: "Bayes' theorem requires the events H and E to be independent.",
      correctAnswer: "False",
      explanation:
        "Bayes' theorem P(H|E) = P(E|H)P(H)/P(E) holds for any events with P(E) > 0, derived purely from the definition of conditional probability: P(H|E)\\cdotP(E) = P(H\\capE) = P(E|H)\\cdotP(H). Independence would make P(H|E) = P(H), making Bayesian updating useless.",
      hints: [
        "Bayes' theorem is derived from: P(H\\capE) = P(H|E)P(E) = P(E|H)P(H). No independence assumed.",
        "If H and E were independent, P(H|E) = P(H) - posterior equals prior, meaning data provides no information.",
      ],
    },
  ],

  "expectation-variance": [
    {
      id: "q-mfml-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For X ~ Uniform(0, 4), compute Var(X) using the formula Var(X) = E[X\\^2] − (E[X])\\^2.",
      options: ["4/3", "16/3", "4", "2"],
      correctAnswer: 0,
      explanation:
        "E[X] = (0+4)/2 = 2. E[X\\^2] = \\int\\_0\\^4 x\\^2\\cdot(1/4)dx = [x\\^3/12]\\_0\\^4 = 64/12 = 16/3. Var(X) = 16/3 − 4 = 16/3 − 12/3 = 4/3. General formula: Var(Uniform(a,b)) = (b−a)\\^2/12 = 16/12 = 4/3. ✓",
      hints: [
        "For Uniform(0,4): E[X] = 2, E[X\\^2] = \\int\\_0\\^4 x\\^2/4 dx = (1/4)[x\\^3/3]\\_0\\^4 = 64/12 = 16/3.",
        "Var(X) = E[X\\^2] − (E[X])\\^2 = 16/3 − 4 = 4/3.",
      ],
    },
    {
      id: "q-mfml-kp9-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Random variable X ~ N(0,1) and Y = X\\^2. What is Cov(X, Y)?",
      options: ["1", "0", "2", "−1"],
      correctAnswer: 1,
      explanation:
        "Cov(X,Y) = E[XY] − E[X]E[Y] = E[X\\cdotX\\^2] − E[X]E[X\\^2] = E[X\\^3] − 0\\cdot1 = E[X\\^3]. For N(0,1), all odd moments are 0 by symmetry. So Cov(X,X\\^2) = 0. Yet X and Y = X\\^2 are clearly dependent! Zero covariance \$\\neq\$ independence.",
      hints: [
        "E[X\\^3] = 0 because N(0,1) is symmetric around 0 (odd moments vanish).",
        "X and X\\^2 are functionally dependent (knowing X determines Y) but have zero covariance - illustrating that uncorrelated \$\\neq\$ independent.",
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
        "Var(X+Y) = Var(X) + 2\\cdotCov(X,Y) + Var(Y). Independence ⟹ Cov(X,Y) = 0 ⟹ Var(X+Y) = Var(X)+Var(Y). For example: X,Y ~ N(0,1) independent ⟹ X+Y ~ N(0,2), and Var(X+Y) = 2 = 1+1 = Var(X)+Var(Y). ✓",
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
        "You observe n i.i.d. samples x\\_1,…,x\\_n from N(\\mu, \\sigma\\^2) with \\sigma\\^2 known. The MLE for \\mu is:",
      options: [
        "The sample median",
        "x̄ = (1/n)\\Sigmax\\_i (the sample mean)",
        "(1/n)\\Sigmax\\_i\\^2 (the second moment)",
        "max(x\\_1,…,x\\_n)",
      ],
      correctAnswer: 1,
      explanation:
        "Log-likelihood: ℓ(\\mu) = −n/(2\\sigma\\^2)\\cdot\\Sigma(x\\_i−\\mu)\\^2. Taking dℓ/d\\mu = (1/\\sigma\\^2)\\Sigma(x\\_i−\\mu) = 0 gives \\mû_MLE = (1/n)\\Sigmax\\_i = x̄. The MLE for a Gaussian mean is the sample mean.",
      hints: [
        "Maximize log-likelihood ℓ(\\mu) = const − (1/2\\sigma\\^2)\\Sigma(x\\_i−\\mu)\\^2.",
        "Differentiate with respect to \\mu: dℓ/d\\mu = (1/\\sigma\\^2)\\Sigma(x\\_i−\\mu) = 0 ⟹ \\mû = x̄.",
      ],
    },
    {
      id: "q-mfml-kp10-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "MAP estimation with a Gaussian prior N(0, \\tau\\^2) on weights w is equivalent to which regularized objective?",
      options: [
        "Minimize \\Sigma(y\\_i − w\\^Tx\\_i)\\^2 + (\\sigma\\^2/\\tau\\^2)‖w‖\\_1  (L1 regularization)",
        "Minimize \\Sigma(y\\_i − w\\^Tx\\_i)\\^2 + (\\sigma\\^2/\\tau\\^2)‖w‖\\^2  (L2/ridge regularization)",
        "Minimize \\Sigma(y\\_i − w\\^Tx\\_i)\\^2 with no regularization",
        "Minimize ‖w‖\\^2 subject to \\Sigma(y\\_i − w\\^Tx\\_i)\\^2 \\leq \\epsilon",
      ],
      correctAnswer: 1,
      explanation:
        "MAP: arg max_w [log P(data|w) + log P(w)]. With Gaussian likelihood and prior N(0,\\tau\\^2): log P(w) = −‖w‖\\^2/(2\\tau\\^2) + const. This adds an L2 penalty: minimize \\Sigma(y\\_i−w\\^Tx\\_i)\\^2/(2\\sigma\\^2) + ‖w‖\\^2/(2\\tau\\^2), equivalently minimize MSE + \\lambda‖w‖\\^2 with \\lambda = \\sigma\\^2/\\tau\\^2.",
      hints: [
        "log P(w) = −w\\^2/(2\\tau\\^2) for Gaussian prior. A Laplace prior gives L1.",
        "The ratio \\sigma\\^2/\\tau\\^2 controls regularization strength: small \\tau\\^2 (strong prior toward 0) \\leftrightarrow large \\lambda.",
      ],
    },
    {
      id: "q-mfml-kp10-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The MLE for the variance of a normal distribution, \\sigmâ\\^2 = (1/n)\\Sigma(x\\_i−x̄)\\^2, is an unbiased estimator.",
      correctAnswer: "False",
      explanation:
        "E[\\sigmâ\\^2_MLE] = (n−1)/n \\cdot \\sigma\\^2. The MLE divides by n but the unbiased estimator divides by (n−1) (Bessel\'s correction). For n=10: E[\\sigmâ\\^2_MLE] = 0.9\\sigma\\^2 - it systematically underestimates by 10%. This is because estimating x̄ from the data uses one degree of freedom.",
      hints: [
        "E[(1/n)\\Sigma(x\\_i−x̄)\\^2] = (n−1)\\sigma\\^2/n \$\\neq\$ \\sigma\\^2. Use s\\^2 = (1/(n−1))\\Sigma(x\\_i−x̄)\\^2 for unbiasedness.",
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
        "$[6xy - 2, 3x^2 + 3y^2] = [10, 15]$ at $(1,2)$ - correct",
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
        "This is a **necessary condition** (but not sufficient) for a local extremum.\n\n**Why must $\\nabla f = 0$ at a local minimum?**\n\nIf $\\nabla f(x^*) \\neq 0$, then at least one partial derivative is non-zero, say $\\frac{\\partial f}{\\partial x_k} > 0$ at $x^*$. Then moving a small step in the direction $-h_k$ (decreasing $x_k$) would decrease $f$, contradicting $x^*$ being a local minimum:\n\\[\nf(x^* - \\epsilon \\cdot e_k) \\approx f(x^*) - \\epsilon \\cdot \\frac{\\partial f}{\\partial x_k}(x^*) < f(x^*).\n\\]\n\n**Key insight:** $\\nabla f = 0$ defines a **stationary (critical) point**. These can be:\n- Local minima (all directions curve upward)\n- Local maxima (all directions curve downward)\n- Saddle points (some directions curve up, others curve down)\n\nThis is why the first-derivative test is only a necessary condition - you need the second-derivative test (Hessian) to distinguish between these cases.",
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
        "$(\\frac{\\partial L}{\\partial a_2}) \\cdot (\\frac{\\partial a_2}{\\partial a_1}) \\cdot (\\frac{\\partial a_1}{\\partial W_1})$ - product of local Jacobians along the computation graph",
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
        "These are fundamentally different approaches to computing derivatives:\n\n**Symbolic Differentiation**\nManipulates algebraic expressions to produce new expressions:\n\\[\n\\frac{d}{dx}(x^2 + \\sin(x)) \\to 2x + \\cos(x).\n\\]\n- Pros: Exact, mathematically clean results\n- Cons: \"Expression swell\" (explosive growth in expression size), struggles with control flow (loops, conditionals)\n- Examples: Mathematica, SymPy, MATLAB's Symbolic Toolbox\n\n**Automatic Differentiation (Autograd)**\nApplies the chain rule to **numerical values** during program execution:\n- Forward mode: evaluates $\\frac{\\partial f}{\\partial x}$ alongside $f(x)$ using dual numbers\n- Reverse mode (backpropagation): records operations in a computational graph, then replays backward to accumulate gradients\n- Handles arbitrary Python code (loops, branches, recursion)\n- Examples: PyTorch, JAX, TensorFlow's Autograd\n\n**Key difference:**\n- Symbolic: \"manipulate the formula\"\n- Autograd: \"evaluate and accumulate\"\n\nFor neural networks with millions of parameters, autograd's reverse-mode differentiation (backprop) is essential - computing symbolic gradients would be intractable.",
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
        "The Hessian matrix contains all second-order partial derivatives:\n\\[\nH_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}.\n\\]\n\n**Computing each second partial derivative:**\n\nFirst derivatives:\n\\[\n\\frac{\\partial f}{\\partial x} = 2x + y, \\quad \\frac{\\partial f}{\\partial y} = x + 2y.\n\\]\n\nSecond derivatives (Clairaut's theorem: mixed partials are equal if continuous):\n\\[\n\\frac{\\partial^2 f}{\\partial x^2} = \\frac{\\partial}{\\partial x}(2x + y) = 2,\n\\quad\n\\frac{\\partial^2 f}{\\partial y^2} = \\frac{\\partial}{\\partial y}(x + 2y) = 2,\n\\quad\n\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial}{\\partial y}(2x + y) = 1 = \\frac{\\partial^2 f}{\\partial y \\partial x}.\n\\]\n\n**Assembling the Hessian:**\n\\[\nH = \\begin{pmatrix} \\frac{\\partial^2 f}{\\partial x^2} & \\frac{\\partial^2 f}{\\partial x \\partial y} \\\\ \\frac{\\partial^2 f}{\\partial y \\partial x} & \\frac{\\partial^2 f}{\\partial y^2} \\end{pmatrix} = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}.\n\\]\n\nNote: Since $f$ is a quadratic polynomial, the Hessian is **constant** (independent of $x, y$) - this means the function curves the same way everywhere.",
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
        "A local minimum (all eigenvalues positive - $H$ is positive definite)",
        "Cannot determine without more information",
      ],
      correctAnswer: 2,
      explanation:
        "The **second-order sufficiency condition** tells us how to classify critical points using the Hessian:\n\n**Classification by eigenvalues:**\n- All $\\lambda_i > 0$ (positive definite) $\\Leftrightarrow$ **local minimum**\n- All $\\lambda_i < 0$ (negative definite) $\\Leftrightarrow$ **local maximum**\n- Mixed signs (indefinite) $\\Leftrightarrow$ **saddle point**\n- Zero eigenvalues require higher-order tests\n\n**Applying to our Hessian:**\nGiven eigenvalues $\\lambda_1 = 1$ and $\\lambda_2 = 3$, both are positive. Therefore $H$ is **positive definite**.\n\n**Geometric intuition:**\nAt a critical point where $\\nabla f = 0$, the Hessian encodes the **curvature** (second derivatives) of $f$:\n- Positive definite means the function curves **upward** in all directions\n- Think of $f(x,y) = x^2 + xy + y^2$ as a bowl-shaped surface - the unique critical point at $(0,0)$ is a global (and local) minimum\n\n**Verification via determinants:**\nFor a $2 \\times 2$ matrix $H = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, it is PD iff $a > 0$ and $\\det(H) > 0$:\n\\[\na = 2 > 0, \\quad \\det(H) = (2)(2) - (1)(1) = 3 > 0.\n\\]\nBoth conditions satisfied, confirming positive definite.",
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
        "Newton's method uses **second-order Taylor approximation** to take more accurate steps than gradient descent.\n\n**Derivation:**\nAround the current point $\\theta_t$, the second-order Taylor expansion of $f$ is:\n\\[\nf(\\theta) \\approx f(\\theta_t) + \\nabla f(\\theta_t)^\\top (\\theta - \\theta_t) + \\frac{1}{2}(\\theta - \\theta_t)^\\top H_t (\\theta - \\theta_t).\n\\]\n\nTaking the gradient with respect to $\\theta$ and setting to zero gives the optimum of this local quadratic model:\n\\[\n\\nabla f(\\theta_t) + H_t(\\theta - \\theta_t) = 0 \\implies \\theta_{t+1} = \\theta_t - H_t^{-1}\\nabla f(\\theta_t).\n\\]\n\n**Convergence analysis:**\nNear a minimum $\\theta^*$ with $\\nabla f(\\theta^*) = 0$ and $H$ positive definite:\n\\[\n\\|\\theta_{t+1} - \\theta^*\\| \\leq C \\cdot \\|\\theta_t - \\theta^*\\|^2.\n\\]\nThis is **quadratic convergence** - the error squares (roughly doubles correct digits) at each iteration.\n\n**Comparison with gradient descent:**\n- GD: $\\|\\text{error}_{t+1}\\| \\leq r \\cdot \\|\\text{error}_t\\|$ - linear (slow)\n- Newton: $\\|\\text{error}_{t+1}\\| \\leq C \\cdot \\|\\text{error}_t\\|^2$ - quadratic (fast)\n\n**Trade-offs:**\n- Newton requires computing and inverting the Hessian ($O(n^3)$ for $n$ parameters)\n- Works best near optima; may diverge far from minimum (Hessian may not be PD)\n- Quasi-Newton methods (L-BFGS) approximate $H^{-1}$ cheaply",
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
        "A function is **convex** if its epigraph (the region above its graph) is a convex set. Equivalently, for any two points, the line segment between them lies above the function.\n\n**The second derivative test for convexity:**\nFor a twice-differentiable function $f$ on an interval:\n\\[\nf \\text{ is convex } \\iff f''(x) \\geq 0 \\text{ for all } x.\n\\]\n\n**Analyzing each option:**\n\n1. $f(x) = -x^2$: $f'(x) = -2x$, $f''(x) = -2 < 0$ everywhere - **concave** (bowl turned upside down)\n\n2. $f(x) = x^2$: $f'(x) = 2x$, $f''(x) = 2 > 0$ everywhere - **convex** (standard bowl shape)\n\n3. $f(x) = \\sin(x)$: Oscillates between concave and convex - **neither**\n\n4. $f(x) = x^3$: $f''(x) = 6x$, which is negative for $x < 0$ and positive for $x > 0$ - has an **inflection point** at $x = 0$, so **neither** convex nor concave on $\\mathbb{R}$\n\n**Geometric intuition for $f(x) = x^2$:**\nThe chord connecting any two points on the parabola always lies above (or on) the parabola itself - this is the visual definition of convexity.",
      hints: [
        "Visual test: a convex function looks like a 'bowl' - you can roll a ball anywhere on it and it will roll to the bottom. A concave function looks like an 'upside-down bowl'.",
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
        "This is one of the most important properties of convex functions - it guarantees that optimization is \"well-behaved.\"\n\n**Proof by contradiction:**\n\nSuppose $x^*$ is a local minimum but **not** a global minimum. Then there exists some $y$ with:\n\\[\nf(y) < f(x^*).\n\\]\n\nBy convexity, for any $t \\in (0, 1)$:\n\\[\nf(tx^* + (1-t)y) \\leq t f(x^*) + (1-t) f(y) < t f(x^*) + (1-t) f(x^*) = f(x^*).\n\\]\n\nNow consider points of the form $z_t = tx^* + (1-t)y$ as $t \\to 1$:\n- $z_t \\to x^*$ as $t \\to 1$\n- For $t$ close enough to 1, $z_t$ is arbitrarily close to $x^*$\n- Yet $f(z_t) < f(x^*)$ for all $t < 1$\n\nThis contradicts $x^*$ being a local minimum!\n\n**Practical implication:**\nWhen training convex models (like linear regression with MSE loss), any local minimum you find is **the** global minimum - no risk of being trapped in a suboptimal local minimum.\n\n**Non-convex counterexample:**\n$f(x) = x^3 - x$ has local minima at $x = -1/\\sqrt{3}$ and $x = 1/\\sqrt{3}$, but the global minimum is not at a local minimum (it goes to $-\\infty$).",
      hints: [
        "The key step: convexity lets us bound $f$ at intermediate points using a weighted average of endpoint values. If one endpoint is lower, all intermediate points inherit some of that lowness.",
        "This is why convex optimization is 'easy' - you can't get stuck in local optima. Algorithms like gradient descent that find stationary points are guaranteed to find the global optimum.",
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
        "Despite the sigmoid being non-linear, the **composition structure** makes the loss convex.\n\n**Key insight:** The loss has the form $L(w) = -\\sum_i \\ell_i(w)$ where each $\\ell_i(w)$ is:\n\\[\n\\ell_i(w) = y_i \\log \\sigma(w^\\top x_i) + (1-y_i) \\log(1-\\sigma(w^\\top x_i)).\n\\]\n\n**Showing convexity via the Hessian:**\nDefine $\\sigma_i = \\sigma(w^\\top x_i) = \\frac{1}{1 + e^{-w^\\top x_i}}$.\n\nThe Hessian of the total loss is:\n\\[\nH = \\nabla^2 L(w) = \\sum_i \\sigma_i(1-\\sigma_i) \\, x_i x_i^\\top.\n\\]\n\n**Why this is positive semi-definite (PSD):**\n- Each term $\\sigma_i(1-\\sigma_i) > 0$ because $0 < \\sigma_i < 1$ for all inputs\n- Each $x_i x_i^\\top$ is **rank-1 positive semi-definite** (for any vector $v$, $v^\\top (x_i x_i^\\top) v = (x_i^\\top v)^2 \\geq 0$)\n- A sum of PSD matrices is PSD\n\nSince $H$ is PSD for all $w$, the loss function $L(w)$ is **convex**.\n\n**Critical point:** This convexity holds **regardless of data separability**. Even if the data is perfectly separable (logistic regression can achieve near-zero training loss), the loss is still convex - there are no spurious local minima to worry about.\n\n**Note on multi-class:** The softmax cross-entropy loss $\\ell(w) = -\\log \\frac{e^{w_{y}^\\top x}}{\\sum_j e^{w_j^\\top x}}$ is also convex in $w$ because softmax is log-sum-exp (a convex function) composed with a linear function.",
      hints: [
        "The sigmoid $\\sigma(z) = 1/(1+e^{-z})$ is NOT convex or concave globally - but the way it appears in the log-likelihood structure creates convexity in the weight space.",
        "The term $\\sigma_i(1-\\sigma_i)$ is the variance of a Bernoulli distribution - it's always positive and acts as a 'curvature weight' for each data point's contribution to the Hessian.",
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
        "The constraint $x + y = 4$ describes a line. The method finds where along this line the product $xy$ is maximized - intuitively at the 'most square' point $(2, 2)$.",
      ],
    },
    {
      id: "q-mfml-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Lagrange multiplier \\lambda has the interpretation as the rate of change of the optimal objective value with respect to the constraint level c in g(x) = c.",
      correctAnswer: "True",
      explanation:
        "This is the **envelope theorem** interpretation of Lagrange multipliers - one of the most economically meaningful aspects.\n\nConsider optimizing $f(x)$ subject to $g(x) = c$. Let $F^*(c)$ be the optimal value. Then:\n\\[\n\\frac{dF^*}{dc}(c) = \\lambda^*,\n\\]\nwhere $\\lambda^*$ is the optimal Lagrange multiplier.\n\nIn our $xy$ example with constraint $x + y = 4$:\n- At the optimum we found $\\lambda = 2$ (since $y = \\lambda = 2$ and $x = \\lambda = 2$)\n- If the constraint changes to $x + y = 4 + \\epsilon$:\n\\[\nF^*(4 + \\epsilon) \\approx F^*(4) + \\lambda \\cdot \\epsilon = 4 + 2\\epsilon.\n\\]\n\nFor $\\epsilon = 1$: new optimum $\\approx 6$ (AM-GM gives $((4+1)/2)^2 = 6.25$).\n\n$\\lambda$ is called the \"shadow price\" because it tells you the marginal value of relaxing the constraint.",
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
        "In the dual formulation of SVMs, KKT complementary slackness \\alpha\\_i(y\\_i(w\\^Tx\\_i+b)−1) = 0 implies:",
      options: [
        "All \\alpha\\_i are equal at the optimum",
        "\\alpha\\_i > 0 only for points on the margin boundary y\\_i(w\\^Tx\\_i+b) = 1 (support vectors); all others have \\alpha\\_i = 0",
        "\\alpha\\_i = y\\_i for all training points",
        "Points inside the margin have the largest \\alpha\\_i",
      ],
      correctAnswer: 1,
      explanation:
        "The KKT (Karush-Kuhn-Tucker) complementary slackness condition $\\alpha_i (y_i(w^\\top x_i + b) - 1) = 0$ means that for each training point, exactly one of the following holds:\n\n- $\\alpha_i = 0$: the point is **not** a support vector - it lies outside the margin (constraint not tight)\n- $y_i(w^\\top x_i + b) = 1$: the point **is** a support vector - it lies exactly on the margin boundary\n\nThe decision boundary $w^* = \\sum_i \\alpha_i y_i x_i$ depends **only** on support vectors. Points inside the margin or far from the boundary have $\\alpha_i = 0$ and don't affect $w^*$.\n\nThis is why SVMs are sparse: to classify a new point, you only need to compute its inner product with the support vectors, not all training points.",
      hints: [
        "Complementary slackness: $\\alpha_i \\cdot (\\text{constraint slack}) = 0$. If the constraint is loose (slack > 0), then $\\alpha_i = 0$. If $\\alpha_i > 0$, then the constraint must be tight (slack = 0, point exactly on margin).",
        "The word 'slack' means 'looseness' - if there's slack in the constraint, the multiplier is zero (we're not 'paying' for that point). If there's no slack, we pay a positive price $\\alpha_i > 0$.",
      ],
    },
  ],

  "information-theory": [
    {
      id: "q-mfml-kp16-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Compute the Shannon entropy H(X) for a fair coin: P(H)=P(T)=0.5, using H = −\\Sigma p(x) log\\_2 p(x).",
      options: ["0 bits", "0.5 bits", "1 bit", "2 bits"],
      correctAnswer: 2,
      explanation:
        "H = −[0.5\\cdotlog\\_2(0.5) + 0.5\\cdotlog\\_2(0.5)] = −[0.5\\cdot(−1) + 0.5\\cdot(−1)] = −(−1) = 1 bit. A fair coin has maximum entropy for a binary variable - one bit of uncertainty. A biased coin (e.g., P(H)=1) has H = 0.",
      hints: [
        "log\\_2(0.5) = log\\_2(1/2) = −1.",
        'H = −[0.5\\cdot(−1) + 0.5\\cdot(−1)] = 1 bit. The unit "bit" comes from using log base 2.',
      ],
    },
    {
      id: "q-mfml-kp16-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "KL divergence D_KL(P ‖ Q) = \\Sigma P(x) log(P(x)/Q(x)) satisfies which property?",
      options: [
        "D_KL(P‖Q) = D_KL(Q‖P) always (symmetric)",
        "D_KL(P‖Q) \\geq 0 with equality iff P = Q (non-negative)",
        "D_KL(P‖Q) = 1 for any two distinct distributions",
        "D_KL(P‖Q) \\leq 1 always",
      ],
      correctAnswer: 1,
      explanation:
        "By Jensen\'s inequality applied to the convex function −log: D_KL(P‖Q) = E_P[log(P/Q)] = −E_P[log(Q/P)] \\geq −log(E_P[Q/P]) = −log(1) = 0. Equality holds iff P/Q is constant, i.e., P = Q. KL is asymmetric: D_KL(P‖Q) \$\\neq\$ D_KL(Q‖P) in general.",
      hints: [
        "Jensen\'s inequality: for convex f, E[f(X)] \\geq f(E[X]). Apply with f = −log and X = Q(x)/P(x).",
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
        "I(X;Y) = D_KL(P(X,Y) ‖ P(X)P(Y)). Since KL \\geq 0 with equality iff P(X,Y) = P(X)P(Y), we have I(X;Y) = 0 iff X and Y are independent. Unlike correlation (which only measures linear dependence), MI captures all statistical dependence including nonlinear.",
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
        "X is a non-negative random variable with E[X] = 3. Markov\'s inequality gives an upper bound on P(X \\geq 9) of:",
      options: ["1/9", "1/3", "1/2", "2/3"],
      correctAnswer: 1,
      explanation:
        "Markov\'s inequality: P(X \\geq a) \\leq E[X]/a. With E[X]=3 and a=9: P(X \\geq 9) \\leq 3/9 = 1/3. This bound uses only the mean - no assumption on the distribution shape beyond non-negativity.",
      hints: [
        "Markov: P(X \\geq a) \\leq E[X]/a. Plug in E[X]=3, a=9: P(X\\geq9) \\leq 3/9 = 1/3.",
        "Proof: E[X] = E[X\\cdot1(X<a)] + E[X\\cdot1(X\\geqa)] \\geq a\\cdotP(X\\geqa). Rearrange: P(X\\geqa) \\leq E[X]/a.",
      ],
    },
    {
      id: "q-mfml-kp17-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "X has mean \\mu=10 and standard deviation \\sigma=2. Chebyshev\'s inequality bounds P(|X−10| \\geq 6) by:",
      options: ["1/9", "1/4", "2/3", "1/3"],
      correctAnswer: 0,
      explanation:
        "Chebyshev: P(|X−\\mu| \\geq k\\sigma) \\leq 1/k\\^2. Here |X−10| \\geq 6 = 3\\cdot\\sigma, so k=3. P(|X−10|\\geq6) \\leq 1/9. This bound holds for any distribution with finite variance, using both mean and variance.",
      hints: [
        "6 = k\\cdot\\sigma = k\\cdot2. So k = 3.",
        "Chebyshev: P(|X−\\mu| \\geq k\\sigma) \\leq 1/k\\^2 = 1/9.",
      ],
    },
    {
      id: "q-mfml-kp17-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Hoeffding\'s inequality gives an exponential tail bound for bounded random variables, making it much tighter than Chebyshev\'s 1/k\\^2 bound for large deviations.",
      correctAnswer: "True",
      explanation:
        "For bounded i.i.d. X\\_i \\in [0,1] with mean \\mu, Hoeffding gives P(|X̄−\\mu| \\geq t) \\leq 2exp(−2nt\\^2). Chebyshev gives 1/(nt/\\sigma)\\^2. For n=100, t=0.1: Hoeffding \\leq 2e\\^{-\\^2 \\approx 0.27 while Chebyshev gives \\sigma\\^2/(n\\cdott\\^2) - much looser. The exponential decay enables PAC learning sample complexity bounds.",
      hints: [
        "Compare 2exp(−2nt\\^2) vs. \\sigma\\^2/(nt\\^2) for large n or large t: exponential decays much faster.",
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
        "There is a 3% probability that the null hypothesis H\\_0 is true",
        "If H\\_0 were true, the probability of observing data at least as extreme as seen is 3%",
        "The alternative hypothesis is 97% likely",
        "The effect size is 0.03",
      ],
      correctAnswer: 1,
      explanation:
        "A p-value is P(data as extreme as observed | H\\_0 true). It is NOT the probability that H\\_0 is true (that requires a prior via Bayes). A p-value of 0.03 means: under H\\_0, only 3% of samples would show this or more extreme results - evidence against H\\_0.",
      hints: [
        "p-value = P(T \\geq t_obs | H\\_0), where T is the test statistic.",
        "Small p-value: data is surprising under H\\_0 - reject H\\_0. Large p-value: data consistent with H\\_0 - fail to reject.",
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
        "Cohen\'s d = (\\mu\\_1−\\mu\\_2)/\\sigma measures effect magnitude independently of sample size.",
      ],
    },
    {
      id: "q-mfml-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Power of a statistical test is defined as P(reject H\\_0 | H\\_0 is false) = 1 − \\beta. If power = 0.8 and \\alpha = 0.05, which statement is true?",
      options: [
        "80% chance of a false positive, 5% chance of a true positive",
        "80% chance of detecting a real effect (true positive), 5% chance of falsely rejecting H\\_0 (false positive)",
        "The test has 80% accuracy overall",
        "\\alpha + power = 0.85 is the total error rate",
      ],
      correctAnswer: 1,
      explanation:
        "Power = P(reject H\\_0 | H\\_0 false) = 1 − \\beta = 0.8: 80% chance of correctly detecting a real effect. \\alpha = 0.05 = P(reject H\\_0 | H\\_0 true): 5% false positive rate. \\beta = 0.2 = P(fail to reject | H\\_0 false): 20% false negative rate (Type II error).",
      hints: [
        "Type I error (\\alpha): falsely reject H\\_0 when it is true. Type II error (\\beta): fail to reject H\\_0 when it is false.",
        "Power = 1 − \\beta. Higher power means more sensitive test. Power increases with larger n and larger effect size.",
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
        "E[(f̂(x)−y)\\^2] = Bias\\^2(f̂) + Variance(f̂)",
        "E[(f̂(x)−y)\\^2] = Bias\\^2(f̂) + Variance(f̂) + \\sigma\\^2_noise",
        "E[(f̂(x)−y)\\^2] = Bias(f̂) + √Variance(f̂)",
        "E[(f̂(x)−y)\\^2] = Bias\\^2(f̂) \\cdot Variance(f̂)",
      ],
      correctAnswer: 1,
      explanation:
        "MSE = E[(f̂−y)\\^2] = [E[f̂]−f]\\^2 + E[(f̂−E[f̂])\\^2] + \\sigma\\^2 = Bias\\^2 + Variance + Noise. The irreducible noise \\sigma\\^2 comes from y = f(x) + \\epsilon where \\epsilon ~ N(0,\\sigma\\^2) and cannot be eliminated by any model.",
      hints: [
        "Bias = E[f̂(x)] − f(x): systematic error of the predictor.",
        "Variance = E[(f̂(x) − E[f̂(x)])\\^2]: how much the predictor changes across training sets.",
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
        "High variance means the model is sensitive to specific training samples - it fits noise. This results in low training error but high test error (overfitting). Example: a degree-15 polynomial fitted to 10 points has near-zero training error but wild extrapolation.",
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
        "Adding L2 regularization (ridge) to a linear regression model with \\lambda \\to \\infty causes the bias and variance to:",
      options: [
        "Both decrease",
        "Bias increases (toward zero prediction), variance decreases (toward zero)",
        "Both increase",
        "Bias decreases, variance increases",
      ],
      correctAnswer: 1,
      explanation:
        "Ridge shrinks ŵ = (X\\^TX+\\lambdaI)\\^{-1}X\\^Ty toward 0. As \\lambda\\to\\infty, ŵ\\to0 regardless of data \\to prediction always near 0 \\to high bias. But ŵ becomes less sensitive to training data \\to lower variance. This is the classic bias-variance tradeoff modulated by regularization strength.",
      hints: [
        "As \\lambda\\to\\infty: ŵ\\to0 (extreme shrinkage). Prediction f̂(x) = w\\^Tx \\to 0. If true f(x) \$\\neq\$ 0, bias is large.",
        "But f̂(x)\\approx0 for all training sets \\to variance \\approx 0.",
      ],
    },
  ],

  "vc-dimension": [
    {
      id: "q-mfml-kp20-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The VC dimension of linear classifiers (hyperplanes through the origin) in \\mathbb{R}\\^2 is:",
      options: ["1", "2", "3", "4"],
      correctAnswer: 1,
      explanation:
        "Hyperplanes through the origin in \\mathbb{R}\\^2 (lines through origin with sign(w\\^Tx)) can shatter any 2 points but not any 3 points (they cannot separate XOR-like labelings). With bias term: lines in \\mathbb{R}\\^2 have VC dim = d+1 = 3. Without bias: VC dim = d = 2.",
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
        "PAC learning requires: for any \\epsilon, \\delta, with m \\geq m(\\epsilon,\\delta) samples, error \\leq \\epsilon+opt with probability 1−\\delta.",
        "Infinite VC dim \\to no such finite m(\\epsilon,\\delta) exists - the class is too expressive to generalize from finite data.",
      ],
    },
    {
      id: "q-mfml-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The VC dimension of the class of halfspaces (linear classifiers with bias) in \\mathbb{R}ᵈ is:",
      options: ["d", "d + 1", "2d", "d\\^2"],
      correctAnswer: 1,
      explanation:
        "Linear classifiers sign(w\\^Tx + b) in \\mathbb{R}ᵈ have VC dimension d+1. They can shatter any d+1 points in general position (no d+1 points in a hyperplane) but cannot shatter any d+2 points. In \\mathbb{R}\\^2: VC dim = 3 (any 3 non-collinear points can be shattered, but no 4 points can).",
      hints: [
        "In \\mathbb{R}\\^2: 3 non-collinear points - all 8 labelings achievable by some line. But any 4 points include an XOR-type labeling no line achieves.",
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
        "The polynomial kernel k(x,z) = (x\\^Tz + 1)\\^2 for x,z \\in \\mathbb{R}\\^2 implicitly computes the inner product ⟨\\phi(x), \\phi(z)⟩ in which feature space?",
      options: [
        "\\mathbb{R}\\^2 (same as input space)",
        "\\mathbb{R}⁶ (monomials up to degree 2: 1, x\\_1, x\\_2, x\\_1\\^2, x\\_1x\\_2, x\\_2\\^2)",
        "An infinite-dimensional Hilbert space",
        "\\mathbb{R}\\^4 (all degree-2 monomials only)",
      ],
      correctAnswer: 1,
      explanation:
        "Expand (x\\^Tz+1)\\^2 = (x\\_1z\\_1+x\\_2z\\_2+1)\\^2. This equals ⟨\\phi(x),\\phi(z)⟩ where \\phi(x) = [1, √2\\cdotx\\_1, √2\\cdotx\\_2, x\\_1\\^2, √2\\cdotx\\_1x\\_2, x\\_2\\^2]\\^T \\in \\mathbb{R}⁶. The kernel computes this 6-dimensional inner product without explicitly constructing \\phi.",
      hints: [
        "(a+b+c)\\^2 = a\\^2 + b\\^2 + c\\^2 + 2ab + 2ac + 2bc. With a=x\\_1z\\_1, b=x\\_2z\\_2, c=1: identifies the feature map.",
        "The kernel trick: k(x,z) = ⟨\\phi(x),\\phi(z)⟩ without materializing \\phi - especially useful for large/infinite feature spaces.",
      ],
    },
    {
      id: "q-mfml-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A function k(x,z) is a valid Mercer kernel iff the kernel (Gram) matrix K with K\\_i\\_j = k(x\\_i,x\\_j) is positive semi-definite for any finite input set.",
      correctAnswer: "True",
      explanation:
        "Mercer\'s theorem: k is a valid kernel (i.e., \\exists feature map \\phi such that k(x,z) = ⟨\\phi(x),\\phi(z)⟩) iff for all finite sets {x\\_1,…,x\\_n} and all vectors c: \\Sigma\\_i\\_j c\\_ic\\_jk(x\\_i,x\\_j) \\geq 0, i.e., the Gram matrix is PSD.",
      hints: [
        "PSD Gram matrix iff all eigenvalues \\geq 0. This is the kernel validity condition.",
        "To verify a new kernel: construct a random Gram matrix K for sample points, check if PSD (all eigenvalues \\geq 0).",
      ],
    },
    {
      id: "q-mfml-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The RBF (Gaussian) kernel k(x,z) = exp(−‖x−z‖\\^2/(2\\sigma\\^2)) corresponds to a feature map \\phi: \\mathbb{R}\\^n \\to ?",
      options: [
        "\\mathbb{R}\\^n (same dimension)",
        "\\mathbb{R}\\^n\\^2 (polynomial of degree 2)",
        "An infinite-dimensional Hilbert space (Taylor series has infinitely many terms)",
        "\\mathbb{R}\\^2 regardless of input dimension",
      ],
      correctAnswer: 2,
      explanation:
        "The Taylor expansion of exp(−‖x−z‖\\^2/(2\\sigma\\^2)) = exp(−‖x‖\\^2/2\\sigma\\^2)\\cdotexp(x\\^Tz/\\sigma\\^2)\\cdotexp(−‖z‖\\^2/2\\sigma\\^2) involves all orders of monomials x\\_i\\_1x\\_i\\_2…x\\_i\\_k, giving infinitely many features. The RKHS of the RBF kernel is infinite-dimensional - SVM with RBF kernel implicitly operates in \\infty-dim space.",
      hints: [
        "exp(x\\^Tz/\\sigma\\^2) = \\Sigma\\_k (x\\^Tz)\\^k/(\\sigma\\^2\\^kk!): this series has infinitely many terms \\to infinite-dimensional feature space.",
        "The kernel trick is especially powerful here: comparing in \\infty-dim space costs only O(n) (one kernel evaluation).",
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
        "The DFT X[k] = \\Sigma\\_n x[n]\\cdote^(−2\\piikn/N) for k=0,1,…,N−1 represents N frequencies at k/N cycles per sample. k=0 is the DC (mean) component; k=N/2 is the Nyquist frequency (highest representable). These N complex coefficients contain all information about the length-N signal.",
      hints: [
        "k=0: DC component (average). k=1: one full cycle over the entire signal length N.",
        "The DFT is a change of basis from time domain (standard basis e\\_n) to frequency domain (complex exponential basis).",
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
        "Convolution theorem: F{f * g} = F{f} \\cdot F{g}. This enables O(N log N) convolution: FFT(f), FFT(g), multiply elementwise, IFFT - versus O(N\\cdotK) direct convolution. CNNs with large kernels can exploit this; Fourier Neural Operators (FNO) use it explicitly.",
      hints: [
        "Direct convolution: for each output position, sum K products. O(N\\cdotK) total.",
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
        "Drawing random frequencies \\omega ~ p(\\omega) (the spectral density) and using z(x) = cos(\\omega\\^Tx + b) to approximate k(x,z) \\approx z(x)\\^Tz(z)",
        "Using the FFT to compute the kernel matrix in O(N log N)",
        "Replacing the kernel with a polynomial approximation",
      ],
      correctAnswer: 1,
      explanation:
        "By Bochner\'s theorem, any continuous positive-definite shift-invariant kernel k(x−z) = \\intp(\\omega)e^(i\\omega^T(x−z))d\\omega for some spectral density p(\\omega). Sampling \\omega\\_1,…,\\omegaD ~ p(\\omega) and b\\_j ~ Uniform(0,2\\pi), the feature map z(x) = √(2/D)[cos(\\omega\\_1\\^Tx+b\\_1),…,cos(\\omegaD\\^Tx+bD)] satisfies E[z(x)\\^Tz(z)] = k(x,z).",
      hints: [
        "RFF reduces kernel machines from O(n\\^2) kernel matrix to O(nD) feature matrix, enabling scalability.",
        "Bochner\'s theorem: PD shift-invariant kernel \\leftrightarrow Fourier transform of a non-negative measure (spectral density p(\\omega)).",
      ],
    },
  ],

  "measure-theory-basics": [
    {
      id: "q-mfml-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A \\sigma-algebra F over \\Omega must satisfy three axioms. Which set is NOT necessarily in F?",
      options: [
        "\\Omega itself",
        "The complement Aᶜ of any A \\in F",
        "The union A\\_1 \\cup A\\_2 \\cup … of any countable collection {A\\_i} \\in F",
        "Every subset of every A \\in F",
      ],
      correctAnswer: 3,
      explanation:
        "\\sigma-algebra axioms: (1) \\Omega \\in F, (2) A \\in F \\to Aᶜ \\in F, (3) {A\\_i} \\subset F \\to \\cupA\\_i \\in F. Subsets of A \\in F need NOT be in F. For example, the \\sigma-algebra {∅, \\Omega} contains \\Omega but not its subsets {\\omega} for individual outcomes \\omega.",
      hints: [
        "The three axioms are: \\Omega \\in F, closed under complement, closed under countable union.",
        "Sub-sets of F-members are not required to be in F - that would make every subset an event.",
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
        "The Lebesgue integral partitions the range (not the domain) and handles a far wider class of functions - including pointwise limits of measurable functions. Every bounded Riemann-integrable function is Lebesgue-integrable with equal value. Lebesgue handles \\Sigma x\\_i over countable sets and the dominated convergence theorem, both essential for probability theory.",
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
        "In the measure-theoretic formulation, a random variable X on probability space (\\Omega, F, P) is formally:",
      options: [
        "A fixed real number representing a typical outcome",
        "A measurable function X: \\Omega \\to \\mathbb{R} such that {\\omega: X(\\omega) \\leq x} \\in F for all x \\in \\mathbb{R}",
        "The expected value E[X]",
        "An element of the sample space \\Omega",
      ],
      correctAnswer: 1,
      explanation:
        "A random variable is a measurable function: X: (\\Omega,F) \\to (\\mathbb{R}, B(\\mathbb{R})). Measurability means preimages of Borel sets are events in F, ensuring P(X \\leq x) is well-defined. This formalism is needed to rigorously define continuous distributions, conditional expectations, and stochastic processes.",
      hints: [
        "Measurability: {\\omega: X(\\omega) \\leq x} must be in F so we can compute P(X \\leq x) = P({\\omega: X(\\omega) \\leq x}).",
        "Without measurability, some sets might have no assigned probability - making P(X \\leq x) undefined.",
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
        "Orthogonal (LL\\^T = I)",
      ],
      correctAnswer: 1,
      explanation:
        "For any vector f: f\\^TLf = (1/2)\\Sigma\\_i\\_j A\\_i\\_j(f\\_i−f\\_j)\\^2 \\geq 0, so L is PSD. The constant vector 1 satisfies L\\cdot1 = 0 (since rows sum to zero), so 0 is always an eigenvalue. For a graph with k connected components, there are exactly k zero eigenvalues.",
      hints: [
        "f\\^TLf = \\Sigma\\_i\\_j A\\_i\\_j(f\\_i−f\\_j)\\^2/2 \\geq 0 since all terms are non-negative squares.",
        "L\\cdot1 = D\\cdot1 − A\\cdot1 = (degrees) − (row sums of A) = 0. So \\lambda=0 is always an eigenvalue with eigenvector 1.",
      ],
    },
    {
      id: "q-mfml-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Fiedler value (second smallest eigenvalue \\lambda\\_2 of the graph Laplacian) measures graph connectivity - larger \\lambda\\_2 means the graph is harder to disconnect.",
      correctAnswer: "True",
      explanation:
        "The algebraic connectivity \\lambda\\_2 = 0 iff the graph is disconnected. For a connected graph, \\lambda\\_2 > 0 and quantifies how well-connected the graph is. The Cheeger inequality relates \\lambda\\_2 to the edge expansion (min-cut ratio), justifying its use in spectral clustering.",
      hints: [
        "If the graph splits into two components by removing few edges, \\lambda\\_2 is small - the graph is nearly disconnected.",
        "Spectral bisection: assign nodes to clusters based on sign of Fiedler vector (eigenvector for \\lambda\\_2).",
      ],
    },
    {
      id: "q-mfml-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In spectral GNNs, a graph convolution is defined as g_\\theta * f = Uĝ(\\Lambda)U\\^Tf where U contains Laplacian eigenvectors. The main computational bottleneck of this approach is:",
      options: [
        "Computing the sigmoid activation function",
        "The full eigendecomposition of L (O(n\\^3) for n nodes) - addressed by polynomial approximations like ChebNet",
        "Storing the adjacency matrix",
        "Computing node embeddings during message passing",
      ],
      correctAnswer: 1,
      explanation:
        "Full spectral GNNs require computing U (Laplacian eigenvectors) - O(n\\^3) eigendecomposition. ChebNet (Defferrard 2016) approximates spectral filters as degree-K Chebyshev polynomials of L, avoiding eigendecomposition. GCN (Kipf 2017) uses K=1 first-order approximation: Ã = D̃^{-1/2}ÃD̃^{-1/2} where Ã = A + I.",
      hints: [
        "n\\^3 eigendecomposition is prohibitive for large graphs (millions of nodes in social networks).",
        "Chebyshev polynomial approximation: g_\\theta(\\Lambda) \\approx \\Sigma\\_k \\theta\\_kT\\_k(\\Lambda). Only requires matrix-vector products with L - O(|E|) per step.",
      ],
    },
  ],

  "numerical-linear-algebra": [
    {
      id: "q-mfml-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "IEEE 754 double-precision (float64) uses 52 mantissa bits, 11 exponent bits, and 1 sign bit. The machine epsilon (smallest \\epsilon with 1+\\epsilon \$\\neq\$ 1 in float64) is approximately:",
      options: ["2\\^{-\\^2\\^3 \\approx 1.2\\times10\\^{-⁷", "2\\^{-⁵\\^2 \\approx 2.2\\times10\\^{-1}⁶", "2\\^{-1}⁰\\^2\\^3", "10\\^{-\\^3\\^2"],
      correctAnswer: 1,
      explanation:
        "Machine epsilon for float64 is 2\\^{-⁵\\^2 \\approx 2.2\\times10\\^{-1}⁶, giving ~15 decimal digits of precision. For float32 (23 mantissa bits): \\epsilon \\approx 2\\^{-\\^2\\^3 \\approx 1.2\\times10\\^{-⁷ (~7 digits). This is why ML training typically uses float32 (speed) while scientific computing uses float64 (precision).",
      hints: [
        "The mantissa has p = 52 bits \\to relative precision is 2\\^{-⁵\\^2 \\approx 2.2\\times10\\^{-1}⁶.",
        "float32: p=23 bits \\to \\epsilon \\approx 2\\^{-\\^2\\^3 \\approx 1.2\\times10\\^{-⁷. float64: p=52 \\to \\epsilon \\approx 2.2\\times10\\^{-1}⁶.",
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
        "Example: a = 1.000000001, b = 1.000000000 (both representable to 10 significant digits). a−b = 0.000000001 = 1\\times10\\^{-⁹ - only 1 significant digit! The leading digits cancel, leaving only the noisy low-order bits. This affects the naive variance formula E[X\\^2]−(E[X])\\^2 when mean >> std.",
      hints: [
        "If a \\approx b with 15 significant digits each, a−b may have only 1 significant digit.",
        "Welford\'s online algorithm computes variance without catastrophic cancellation by updating incrementally.",
      ],
    },
    {
      id: "q-mfml-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The condition number κ(A) = \\sigma_max/\\sigma_min bounds the relative error amplification for Ax = b. If κ(A) = 10⁶ and b has relative error 10\\^{-1}\\^2, what is the relative error bound on x?",
      options: ["10\\^{-1}\\^2", "10\\^{-⁶", "10⁶", "10¹\\^2"],
      correctAnswer: 1,
      explanation:
        "‖\\deltax‖/‖x‖ \\leq κ(A)\\cdot‖\\deltab‖/‖b‖ = 10⁶ \\times 10\\^{-1}\\^2 = 10\\^{-⁶. With float64 precision (\\epsilon \\approx 10\\^{-1}⁶), if κ(A) = 10⁶, we lose 6 decimal digits of accuracy in the solution - from 16 to about 10 significant digits.",
      hints: [
        "Relative error bound: ‖\\deltax‖/‖x‖ \\leq κ(A) \\cdot ‖\\deltab‖/‖b‖.",
        "κ = 10⁶ means the matrix amplifies errors by up to 10⁶. Starting from 10\\^{-1}\\^2 error in b: x error \\leq 10⁶\\cdot10\\^{-1}\\^2 = 10\\^{-⁶.",
      ],
    },
  ],

  "monte-carlo-methods": [
    {
      id: "q-mfml-kp26-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A Monte Carlo estimate of \\pi draws n random points uniformly in [0,1]\\^2 and counts those inside the unit quarter-circle. If k = 785 of n = 1000 points fall inside, the estimate \\pî is:",
      options: ["3.14", "3.00", "3.93", "2.47"],
      correctAnswer: 0,
      explanation:
        "P(inside quarter-circle) = \\pi/4. So \\pî = 4\\cdotk/n = 4\\cdot785/1000 = 3.14. Standard error: √(\\pi(4−\\pi)/(4n)) \\approx √(3.14\\cdot0.86/4000) \\approx 0.026. The error scales as O(1/√n) - independent of dimension.",
      hints: [
        "Area of quarter-circle radius 1 = \\pi/4. Area of unit square = 1. Fraction inside = \\pi/4.",
        "Estimate: \\pî = 4\\times(fraction inside) = 4\\times0.785 = 3.14.",
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
        "w(x) = p(x)\\cdotq(x)",
        "w(x) = |p(x)−q(x)|",
      ],
      correctAnswer: 1,
      explanation:
        "E_p[f(X)] = \\intf(x)p(x)dx = \\intf(x)[p(x)/q(x)]q(x)dx = E_q[f(X)\\cdotw(X)] where w(x) = p(x)/q(x). Estimate: (1/n)\\Sigma\\_i f(x\\_i)w(x\\_i) for x\\_i ~ q. Choose q \\propto |f|\\cdotp to minimize variance.",
      hints: [
        "Key identity: E_p[f] = E_q[f\\cdot(p/q)]. The weight p/q corrects for sampling under q instead of p.",
        "Large weights (p(x) >> q(x)) mean x is sampled too rarely under q - those points are upweighted.",
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
        "The Metropolis-Hastings acceptance ratio is \\alpha = min(1, [p̃(x')q(x|x')] / [p̃(x)q(x'|x)]) where p̃ \\propto p. The normalizing constant cancels in the ratio p̃(x')/p̃(x) = p(x')/p(x). This is essential for Bayesian inference where the posterior p(\\theta|D) \\propto p(D|\\theta)p(\\theta) is known only up to P(D).",
      hints: [
        "Acceptance ratio: p(x')/p(x) = p̃(x')/p̃(x). Normalization constant cancels.",
        "In Bayesian inference: posterior \\propto likelihood \\times prior. The normalizing constant P(D) = \\intp(D|\\theta)p(\\theta)d\\theta is often intractable but cancels in MCMC.",
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
        "min_{q \\in Q} D_KL(q(z) ‖ p(z|x)) (minimize KL divergence to true posterior)",
        "max_q E_q[log p(x,z)] (maximize ELBO without entropy term)",
        "min_q ‖q − p‖\\_2\\^2 (minimize L2 distance)",
      ],
      correctAnswer: 1,
      explanation:
        "VI turns posterior inference into optimization: find q*(z) = argmin_{q\\inQ} D_KL(q‖p(z|x)), where Q is a tractable family (e.g., mean-field). Since p(z|x) is intractable, this is equivalently done by maximizing the ELBO = E_q[log p(x,z)] − E_q[log q(z)].",
      hints: [
        "Maximizing ELBO = minimizing KL(q‖p): log p(x) = ELBO + KL(q‖p) \\geq ELBO.",
        "Mean-field Q: q(z) = \\Pi\\_i q\\_i(z\\_i) - each latent variable independent. Tractable but approximate.",
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
        "log p(x) = ELBO \\times KL(q‖p)",
        "log p(x) = KL(q‖p) − ELBO",
      ],
      correctAnswer: 1,
      explanation:
        'Derivation: log p(x) = E_q[log p(x,z)/q(z)] + E_q[log q(z)/p(z|x)] = ELBO + KL(q‖p(z|x)). Since KL \\geq 0, ELBO \\leq log p(x) - hence the name "lower bound". Maximizing ELBO tightens the bound (KL \\to 0 iff q = p(z|x)).',
      hints: [
        "log p(x) = log p(x,z)/p(z|x). Rewrite using q: take E_q and split into ELBO + KL.",
        "ELBO + KL(q‖p(z|x)) = log p(x). KL \\geq 0 ⟹ ELBO \\leq log p(x).",
      ],
    },
    {
      id: "q-mfml-kp27-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "The mean-field variational assumption q(z) = \\Pi\\_i q\\_i(z\\_i) ignores posterior correlations between latent variables.",
      correctAnswer: "True",
      explanation:
        "Mean-field VI assumes complete independence among latent variables. The optimal q\\_i*(z\\_i) \\propto exp(E_{q_{-i}}[log p(x,z)]). This factorization ignores posterior correlations, potentially making the approximation poor when latent variables are strongly correlated (e.g., in linear regression with correlated features).",
      hints: [
        "Mean-field: q(z\\_1,z\\_2,…) = q\\_1(z\\_1)q\\_2(z\\_2)…. Correlations between z variables are ignored.",
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
        "A GP prior f ~ GP(0, k) is placed on function values. At two input points x\\_1, x\\_2, the joint distribution of f(x\\_1), f(x\\_2) is:",
      options: [
        "Two independent N(0,1) variables",
        "Bivariate Gaussian N(0, K) where K = [[k(x\\_1,x\\_1), k(x\\_1,x\\_2)],[k(x\\_2,x\\_1), k(x\\_2,x\\_2)]]",
        "Uniform over all functions passing through x\\_1, x\\_2",
        "A Dirichlet distribution parameterized by k",
      ],
      correctAnswer: 1,
      explanation:
        "By the GP definition, any finite collection of function values is jointly Gaussian. For zero-mean GP: [f(x\\_1),f(x\\_2)] ~ N(0, K) where K is the 2\\times2 kernel (Gram) matrix. k(x\\_1,x\\_2) encodes correlation - nearby inputs (small ‖x\\_1−x\\_2‖ for RBF kernel) are highly correlated.",
      hints: [
        "GP is a distribution over functions: any finite evaluation is a multivariate Gaussian.",
        "K_{ij} = k(x\\_i,x\\_j). For RBF kernel: k(x,x') = \\sigma\\^2exp(−‖x−x'‖\\^2/2ℓ\\^2). K is always PSD.",
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
        "GP posterior at test point x*: \\mu* = k(x*,X)[K(X,X)+\\sigma\\^2I]\\^{-1}y and \\sigma*\\^2 = k(x*,x*) − k(x*,X)[K(X,X)+\\sigma\\^2I]\\^{-1}k(X,x*). The variance \\sigma*\\^2 is zero at training points and grows far from data - automatic uncertainty quantification without approximation.",
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
        "Exact GP inference with n training points requires solving a linear system with the n\\timesn kernel matrix K. The computational complexity is:",
      options: [
        "O(n) - linear in training size",
        "O(n\\^2) - forming the kernel matrix",
        "O(n\\^3) - Cholesky factorization of K",
        "O(n\\^2 log n) - using FFT-accelerated kernel computations",
      ],
      correctAnswer: 2,
      explanation:
        "Exact GP requires Cholesky factorization of K \\in \\mathbb{R}\\^nˣ\\^n: O(n\\^3) time and O(n\\^2) memory. For n=10,000 this is feasible; for n=1,000,000 it is not (10¹⁸ FLOPs). Sparse/inducing-point GPs reduce this to O(nm\\^2) with m≪n inducing points.",
      hints: [
        "Cholesky of n\\timesn matrix: O(n\\^3/3) operations. Storing K: O(n\\^2) memory.",
        "n=10K: ~3\\times10¹¹ FLOPs \\approx seconds. n=100K: ~3\\times10¹⁵ FLOPs \\approx years. Hence sparse GPs for large n.",
      ],
    },
  ],

  "ode-sde": [
    {
      id: "q-mfml-kp29-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A Neural ODE (Chen et al. 2018) parameterizes the hidden state dynamics as dh/dt = f_\\theta(h(t), t). The connection to ResNets is:",
      options: [
        "Neural ODEs have more parameters than ResNets",
        "A ResNet block h_{l+1} = h_l + f(h_l) is a forward Euler discretization of the ODE with step size 1",
        "ResNets use continuous time while Neural ODEs use discrete layers",
        "Neural ODEs require gradient checkpointing; ResNets do not",
      ],
      correctAnswer: 1,
      explanation:
        "Euler discretization of dh/dt = f(h) with step \\Deltat=1: h(t+1) = h(t) + f(h(t)). This is exactly a ResNet block with skip connection. Neural ODEs are the continuous limit: infinite layers with infinitesimal Euler steps, solved by an adaptive ODE solver.",
      hints: [
        "Forward Euler: h_{t+\\Deltat} = h_t + \\Deltat\\cdotf(h_t). With \\Deltat=1: h_{t+1} = h_t + f(h_t) = ResNet.",
        "Neural ODE uses Runge-Kutta or Dormand-Prince adaptive solvers - not just Euler steps.",
      ],
    },
    {
      id: "q-mfml-kp29-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "An SDE dX = \\mu(X,t)dt + \\sigma(X,t)dW (where W is a Wiener process) has solutions that are Markov processes.",
      correctAnswer: "True",
      explanation:
        "Solutions to SDEs driven by Brownian motion are Markov processes: given X(t), the future {X(s):s>t} is independent of the past {X(s):s<t}. This follows because Wiener increments dW are independent of the past. This Markov property is fundamental to diffusion models, enabling the forward/reverse process formulation.",
      hints: [
        'Wiener increments: W(t)−W(s) ⊥ {W(u):u\\leqs} for t>s. The SDE is "driven" by these independent increments.',
        "Markov property: future depends only on present state, not the entire history.",
      ],
    },
    {
      id: "q-mfml-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Score-based generative models (DDPM/Score Matching) learn the score function \\nabla_x log p_t(x). This is used to reverse a forward noising SDE. The reverse SDE (Anderson 1982) involves:",
      options: [
        "The gradient of the log-prior only",
        "The score \\nabla_x log p_t(x) of the marginal distribution at each noise level t",
        "The Hessian of the log-likelihood",
        "The score of the data distribution p\\_0 only",
      ],
      correctAnswer: 1,
      explanation:
        "The time-reversal of dX=f dt+g dW (forward SDE) is dX=[f−g\\^2\\nablaₓ log p\\_t(X)]dt + g dW̃ (reverse SDE, from t=T to 0). Learning \\nablaₓ log p\\_t(x) (score) for all t via score matching enables exact reversal, generating samples from p\\_t₌\\_0 (data distribution) from noise p\\_t₌T \\approx N(0,I).",
      hints: [
        "Forward: data \\to noise. Reverse: noise \\to data. The score \\nablaₓ log p\\_t(x) guides denoising.",
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
        'Persistent homology tracks topological features (connected components, loops, voids) as a scale parameter \\epsilon varies. A "birth-death" pair (b, d) with large persistence |d−b| indicates:',
      options: [
        "A numerical artifact due to noise",
        "A robust topological feature present across a wide range of scales",
        "A feature present only at a single scale",
        "An outlier in the dataset",
      ],
      correctAnswer: 1,
      explanation:
        "In a persistence diagram, points near the diagonal (d−b \\approx 0) represent short-lived features likely due to noise. Points far from the diagonal (large d−b) represent robust topological features (genuine holes/loops/voids). This scale-invariant signal/noise separation is persistent homology\'s key property.",
      hints: [
        "Born at \\epsilon=b, dies at \\epsilon=d. Persistence = d−b. Small persistence: noise. Large persistence: signal.",
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
        "For a sphere: χ = 2. For a torus: χ = 0. For a pretzel (2 holes): χ = −2. The Euler characteristic depends only on topology, not geometry. Equivalent formula: χ = \\Sigma (−1)\\^k\\beta\\_k where \\beta\\_k are Betti numbers (number of k-dimensional holes).",
      hints: [
        "Coffee mug and donut are topologically equivalent (both have one hole) - same χ = 0.",
        "\\beta\\_0 = connected components, \\beta\\_1 = loops, \\beta\\_2 = enclosed voids. χ = \\beta\\_0 − \\beta\\_1 + \\beta\\_2.",
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
        "Mapper: (1) filter function f: X\\to\\mathbb{R} (e.g., first PCA component), (2) cover f(X) with overlapping intervals, (3) cluster data within each interval\'s preimage, (4) add edge between clusters sharing \\geq1 point. Result: a graph capturing the topological skeleton of the data - useful for finding flares, loops, and branching structure.",
      hints: [
        "The overlapping bins ensure connectivity is preserved - exclusive bins would miss connections.",
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
        '\\Sigma_x P(x) log(Q(x)/P(x))',
        '\\Sigma_x P(x) log(P(x)/Q(x))',
        '\\Sigma_x |P(x) − Q(x)|',
        '√(\\Sigma_x (P(x) − Q(x))\\^2)',
      ],
      correctAnswer: 1,
      explanation:
        'KL(P||Q) = \\Sigma_x P(x) log(P(x)/Q(x)) = E_P[log P/Q]. It measures the expected information loss when Q is used to approximate P. KL \\geq 0 always (Gibbs\' inequality), with KL = 0 iff P = Q.',
      hints: [
        'KL is always non-negative by Jensen\'s inequality: log is concave so E[log x] \\leq log E[x].',
        'KL(P||Q) \$\\neq\$ KL(Q||P) - it is asymmetric and not a true distance metric.',
      ],
    },
    {
      id: 'q-mfml-kp31-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'KL divergence is asymmetric: KL(P||Q) \$\\neq\$ KL(Q||P) in general. KL(P||Q) is called the forward KL and tends to be mass-covering (mean-seeking), while KL(Q||P) is called the reverse KL and tends to be mode-seeking (zero-forcing).',
      correctAnswer: 'True',
      explanation:
        'Forward KL (P||Q): penalizes Q being small where P is large, forcing Q to cover all modes of P (mass-covering). Reverse KL (Q||P): penalizes Q being large where P is small, so Q collapses to a single mode of P (mode-seeking). Variational inference minimizes reverse KL; MLE minimizes forward KL.',
      hints: [
        'Forward KL: Q must cover all of P\'s mass - spread wide.',
        'Reverse KL: Q must stay within P\'s support - collapse to one mode.',
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
        'ELBO = log p(x) \\cdot KL(q(z|x) || p(z))',
        'log p(x) = ELBO only when q is the true posterior',
      ],
      correctAnswer: 1,
      explanation:
        'log p(x) = ELBO + KL(q(z|x) || p(z|x)). Since KL \\geq 0, ELBO \\leq log p(x) - it is a lower bound on the log evidence. Maximizing ELBO simultaneously maximizes the log evidence and minimizes KL(q || p(z|x)), driving q toward the true posterior.',
      hints: [
        'KL(q||p) \\geq 0 implies ELBO \\leq log p(x) - hence the name "lower bound".',
        'ELBO is tight (= log p(x)) when q = p(z|x), the true posterior.',
      ],
    },
    {
      id: 'q-mfml-kp32-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Mean-field variational inference assumes the variational posterior factorizes as q(z) = \\prod_i q_i(z_i), making the approximation independent across latent dimensions.',
      correctAnswer: 'True',
      explanation:
        'Mean-field VI (from statistical physics) assumes full independence: q(z\\_1,...,z_k) = q\\_1(z\\_1)\\cdot...\\cdotq_k(z_k). This enables efficient coordinate ascent (CAVI): each factor q_i(z_i) \\propto exp(E_{q_{-i}}[log p(x,z)]) has a closed form for exponential family models. The trade-off: cannot capture posterior correlations between latent dimensions.',
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
        'Writing z = \\mu + \\sigma\\cdot\\epsilon where \\epsilon ~ N(0,I), making z a deterministic function of (\\mu,\\sigma) so gradients flow through the sampling operation',
        'Computing the exact gradient of the log-likelihood using the score function identity',
        'Approximating the discrete latent space with a continuous relaxation',
      ],
      correctAnswer: 1,
      explanation:
        'Sampling z ~ N(\\mu, \\sigma\\^2) is not differentiable w.r.t. \\mu, \\sigma. Reparameterizing: \\epsilon ~ N(0,1), z = \\mu + \\sigma\\epsilon makes z a deterministic function of (\\mu,\\sigma) and the noise \\epsilon. Then \\partialz/\\partial\\mu = 1, \\partialz/\\partial\\sigma = \\epsilon, enabling backpropagation through the sampling operation. This gives low-variance gradient estimates.',
      hints: [
        'The problem: \\partial/\\partial\\theta E_{z~p_\\theta}[f(z)] = ? Cannot backprop through a sampling node.',
        'Reparameterization moves \\theta outside the expectation: E_{\\epsilon~N(0,I)}[f(g_\\theta(\\epsilon))].',
      ],
    },
  ],

  'matrix-calculus': [
    {
      id: 'q-mfml-kp33-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Jacobian matrix J of a vector function f: \\mathbb{R}\\^n \\to \\mathbb{R}ᵐ has shape:',
      options: [
        'n \\times n (a square matrix of partial derivatives)',
        'm \\times n, where J_ij = \\partialf_i/\\partialx_j',
        'n \\times m, where J_ij = \\partialf_j/\\partialx_i',
        '1 \\times n (a gradient vector)',
      ],
      correctAnswer: 1,
      explanation:
        'The Jacobian J \\in \\mathbb{R}^{m\\timesn} has J_ij = \\partialf_i(x)/\\partialx_j. Each row i contains the gradient of the i-th output component f_i w.r.t. all inputs. For f: \\mathbb{R}\\^n \\to \\mathbb{R} (scalar output), the Jacobian is the gradient \\nablaf \\in \\mathbb{R}^{1\\timesn}.',
      hints: [
        'For f: \\mathbb{R}\\^n \\to \\mathbb{R}ᵐ, Jacobian has m rows (outputs) and n columns (inputs).',
        'The Jacobian generalizes the scalar derivative to vector functions.',
      ],
    },
    {
      id: 'q-mfml-kp33-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'The Hessian matrix H of a scalar function f: \\mathbb{R}\\^n \\to \\mathbb{R} is the matrix of second partial derivatives H_ij = \\partial\\^2f/\\partialx_i\\partialx_j, and is always symmetric for twice continuously differentiable functions.',
      correctAnswer: 'True',
      explanation:
        'Schwarz\'s theorem (symmetry of second derivatives): if f is twice continuously differentiable (C\\^2), then \\partial\\^2f/\\partialx_i\\partialx_j = \\partial\\^2f/\\partialx_j\\partialx_i, so H = H\\^T. The Hessian characterizes the local curvature of f; its eigenvalues determine whether a critical point is a minimum (all +), maximum (all −), or saddle point (mixed).',
      hints: [
        'Schwarz\'s theorem: mixed partials commute for C\\^2 functions.',
        'Hessian eigenvalues: all positive \\to local min; all negative \\to local max; mixed \\to saddle.',
      ],
    },
    {
      id: 'q-mfml-kp33-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'For loss L = ‖Ax − b‖\\^2, the gradient \\partialL/\\partialx using matrix calculus is:',
      options: [
        '2(Ax − b)',
        '2A\\^T(Ax − b)',
        '2A(Ax − b)',
        'A\\^TA \\cdot x − A\\^Tb',
      ],
      correctAnswer: 1,
      explanation:
        'L = (Ax−b)\\^T(Ax−b). Using matrix calculus: \\partialL/\\partialx = 2A\\^T(Ax−b). Derivation: Let r = Ax−b. Then L = r\\^Tr, \\partialL/\\partialr = 2r, \\partialr/\\partialx = A (Jacobian of Ax−b w.r.t. x). Chain rule: \\partialL/\\partialx = (\\partialr/\\partialx)\\^T \\cdot \\partialL/\\partialr = A\\^T \\cdot 2r = 2A\\^T(Ax−b).',
      hints: [
        'The chain rule for matrix expressions: \\partialf/\\partialx = (\\partialg/\\partialx)\\^T \\cdot \\partialf/\\partialg.',
        'The Jacobian of Ax w.r.t. x is A (dimension check: \\partial(m\\times1)/\\partial(n\\times1) = m\\timesn = A).',
      ],
    },
  ],

  'optimization-theory': [
    {
      id: 'q-mfml-kp34-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A function f: \\mathbb{R}\\^n \\to \\mathbb{R} is convex if for all x, y and \\lambda \\in [0,1]:',
      options: [
        'f(\\lambdax + (1−\\lambda)y) \\geq \\lambdaf(x) + (1−\\lambda)f(y)',
        'f(\\lambdax + (1−\\lambda)y) \\leq \\lambdaf(x) + (1−\\lambda)f(y)',
        'f(x) \\leq f(y) whenever ‖x‖ \\leq ‖y‖',
        '\\nablaf(x) = 0 has a unique solution',
      ],
      correctAnswer: 1,
      explanation:
        'Convexity: the function value at any convex combination of points lies below the chord connecting those points. Equivalent conditions: (1) Hessian is positive semidefinite everywhere, (2) f(y) \\geq f(x) + \\nablaf(x)\\^T(y−x) (first-order characterization). Convexity guarantees any local minimum is a global minimum.',
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
        'A saddle point is a critical point (\\nablaf = 0) where the Hessian has both positive and negative eigenvalues, indicating it is a minimum in some directions and a maximum in others.',
      correctAnswer: 'True',
      explanation:
        'Saddle points are ubiquitous in high-dimensional neural network loss landscapes. The Hessian at a saddle point is indefinite (some eigenvalues > 0, some < 0). Gradient descent may slow near saddle points (gradient \\approx 0) but noise and curvature asymmetry typically allow escape. True local minima (all positive Hessian eigenvalues) are exponentially rare in high dimensions.',
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
        'Overparameterization = more unknowns than equations \\to infinitely many solutions.',
        'Mode connectivity: two independently trained networks can be connected by a path of low-loss networks.',
      ],
    },
  ],

  'measure-theory-probability': [
    {
      id: 'q-mfml-kp35-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A \\sigma-algebra (sigma-algebra) F on sample space \\Omega is a collection of subsets satisfying:',
      options: [
        'F contains only finite subsets of \\Omega',
        'F contains \\Omega, is closed under complementation, and closed under countable unions',
        'F contains all subsets with probability > 0.5',
        'F is the power set of \\Omega restricted to measurable events',
      ],
      correctAnswer: 1,
      explanation:
        'A \\sigma-algebra F satisfies: (1) \\Omega \\in F, (2) A \\in F ⟹ Aᶜ \\in F (closed under complement), (3) A\\_1, A\\_2,... \\in F ⟹ \\cup\\_iA\\_i \\in F (closed under countable union). The triple (\\Omega, F, P) is a probability space where F specifies which events can be assigned probability.',
      hints: [
        '\\sigma-algebra defines "measurable" events - events we can assign probabilities to.',
        'Closure under countable union allows handling continuous distributions.',
      ],
    },
    {
      id: 'q-mfml-kp35-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'For a continuous random variable X with density f_X, the expectation E[g(X)] = \\int g(x) f_X(x) dx is defined as a Lebesgue integral, which agrees with the Riemann integral when f_X is Riemann-integrable.',
      correctAnswer: 'True',
      explanation:
        'The Lebesgue integral generalizes the Riemann integral. For well-behaved densities (e.g., continuous or piecewise continuous), both integrals agree. Lebesgue integration handles more general functions (e.g., indicator functions, limits of measurable functions) and allows powerful convergence theorems (Dominated Convergence, Monotone Convergence) crucial for probability theory.',
      hints: [
        'Lebesgue integration: partition the range of f (not the domain) - more general than Riemann.',
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
        'There exists a measurable function f = dP/dQ such that P(A) = \\int_A f dQ for all measurable A',
        'The KL divergence KL(P||Q) is bounded by the L\\^2 norm of P − Q',
        'P and Q share the same support and have equal marginals',
      ],
      correctAnswer: 1,
      explanation:
        'The Radon-Nikodym derivative (likelihood ratio) f = dP/dQ satisfies P(A) = \\int_A f dQ. Absolute continuity P ≪ Q means Q(A) = 0 ⟹ P(A) = 0. The R-N derivative is the foundation of likelihood ratios in statistics, KL divergence (KL(P||Q) = E_P[log dP/dQ]), and importance sampling.',
      hints: [
        'P ≪ Q means P cannot assign mass to Q-null sets.',
        'dP/dQ is the density of P relative to Q - used in importance sampling weights.',
      ],
    },
  ],

  'bayesian-inference': [
    {
      id: 'q-mfml-kp36-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Bayes\' theorem for parameter inference updates beliefs about \\theta given data x as:',
      options: [
        'P(\\theta|x) = P(x)P(\\theta) / P(x|\\theta)',
        'P(\\theta|x) = P(x|\\theta)P(\\theta) / P(x)',
        'P(\\theta|x) = P(x|\\theta) / P(\\theta)',
        'P(\\theta|x) = P(\\theta)P(x|\\theta) \\cdot P(x)',
      ],
      correctAnswer: 1,
      explanation:
        'Bayes\' theorem: P(\\theta|x) \\propto P(x|\\theta) \\cdot P(\\theta). The posterior P(\\theta|x) combines the likelihood P(x|\\theta) (how well \\theta explains data x) with the prior P(\\theta) (our belief before seeing data). P(x) = \\intP(x|\\theta)P(\\theta)d\\theta is the normalizing constant (model evidence).',
      hints: [
        'Posterior \\propto Likelihood \\times Prior. The normalizer P(x) is often intractable.',
        'MAP: \\theta* = argmax P(\\theta|x). MLE: \\theta* = argmax P(x|\\theta) (no prior).',
      ],
    },
    {
      id: 'q-mfml-kp36-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'A conjugate prior is a prior distribution P(\\theta) such that the posterior P(\\theta|x) belongs to the same parametric family as the prior, enabling closed-form Bayesian updates.',
      correctAnswer: 'True',
      explanation:
        'Conjugate priors give analytical posteriors: Beta prior + Bernoulli likelihood \\to Beta posterior; Gaussian prior + Gaussian likelihood \\to Gaussian posterior; Dirichlet prior + Categorical likelihood \\to Dirichlet posterior. Conjugacy enables efficient sequential Bayesian updating without numerical integration.',
      hints: [
        'Beta-Binomial conjugacy: Beta(\\alpha,\\beta) prior + n successes out of m trials \\to Beta(\\alpha+successes, \\beta+failures).',
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
        'Laplace prior \\to L2 (Ridge) regularization; Gaussian prior \\to L1 (LASSO)',
        'Gaussian prior \\to L2 (Ridge) regularization; Laplace prior \\to L1 (LASSO)',
        'Both Gaussian and Laplace priors lead to L2 regularization with different \\lambda values',
        'Gaussian prior \\to dropout regularization; Laplace prior \\to L2 regularization',
      ],
      correctAnswer: 1,
      explanation:
        'MAP: \\theta_MAP = argmax [log P(x|\\theta) + log P(\\theta)]. Gaussian prior N(0,\\sigma\\^2I): log P(\\theta) = −‖\\theta‖\\^2/(2\\sigma\\^2) \\propto −\\lambda‖\\theta‖\\^2 = L2 regularization (Ridge). Laplace prior \\propto exp(−\\lambda‖\\theta‖\\_1): log P(\\theta) \\propto −\\lambda‖\\theta‖\\_1 = L1 regularization (LASSO). L1 promotes sparsity because the Laplace prior has sharper peak at zero.',
      hints: [
        'Gaussian is quadratic \\to L2 penalty. Laplace has exponential tails \\to L1 penalty.',
        'Laplace prior \\to L1 \\to sparse solutions (many parameters go to exactly zero).',
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
        'A GP f ~ GP(\\mu, k) defines a distribution over functions: for any finite set of inputs {x\\_1,...,x\\_n}, the outputs [f(x\\_1),...,f(x\\_n)] ~ N(\\mu, K) where K_ij = k(x\\_i, x\\_j). The kernel k specifies the covariance structure - smoothness, periodicity, etc. GPs provide non-parametric Bayesian regression with calibrated uncertainty.',
      hints: [
        'GP = distribution over functions, not a distribution over parameters.',
        'Any finite marginal of a GP is multivariate Gaussian - that\'s the definition.',
      ],
    },
    {
      id: 'q-mfml-kp37-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In GP regression, the posterior predictive mean at a new point x* is a weighted sum of training outputs y, where the weights depend on the kernel function k(x*, x\\_i) evaluated between x* and training points.',
      correctAnswer: 'True',
      explanation:
        'GP posterior: \\mu*(x*) = k(x*, X)[K(X,X) + \\sigma\\^2I]\\^{-1}y = \\Sigma\\_i \\alpha\\_i k(x*, x\\_i) where \\alpha = [K+\\sigma\\^2I]\\^{-1}y. The prediction is an interpolation of training outputs weighted by kernel similarities. The posterior variance \\sigma\\^2*(x*) = k(x*,x*) − k(x*,X)[K+\\sigma\\^2I]\\^{-1}k(X,x*) quantifies uncertainty.',
      hints: [
        'Kernel k(x*,x\\_i) measures similarity between x* and training point x\\_i.',
        'Far from training data: k(x*,x\\_i) \\approx 0, posterior variance \\approx prior variance.',
      ],
    },
    {
      id: 'q-mfml-kp37-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'GP hyperparameter optimization (e.g., kernel length scale ℓ) is typically performed by maximizing:',
      options: [
        'The posterior predictive accuracy on a held-out validation set using cross-validation',
        'The log marginal likelihood log P(y|X, \\theta_hyp) = −½ y\\^T(K+\\sigma\\^2I)\\^{-1}y − ½ log|K+\\sigma\\^2I| − n/2 log(2\\pi)',
        'The ELBO of a variational approximation to the GP posterior',
        'The squared error between predicted and actual outputs on the training set',
      ],
      correctAnswer: 1,
      explanation:
        'The log marginal likelihood (type-II MLE / evidence) balances data fit (−½ y\\^T(K+\\sigma\\^2I)\\^{-1}y) against model complexity (−½ log|K+\\sigma\\^2I|). Gradient-based optimization w.r.t. hyperparameters (ℓ, \\sigma_f, \\sigma_n) yields an automatic Occam\'s razor - it penalizes overly complex kernels that overfit.',
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
        'Sampling x ~ Q and computing the weighted mean (1/N) \\Sigma\\_i f(x\\_i) w(x\\_i) where w(x\\_i) = P(x\\_i)/Q(x\\_i)',
        'Using rejection sampling to accept only samples that satisfy f(x) > 0',
        'Computing the expectation analytically using moment-generating functions',
      ],
      correctAnswer: 1,
      explanation:
        'Importance sampling: E_P[f(x)] = E_Q[f(x)P(x)/Q(x)] = E_Q[f(x)w(x)]. Samples x_i ~ Q are weighted by importance weights w_i = P(x_i)/Q(x_i). The estimator is unbiased if Q(x) > 0 wherever P(x)f(x) \$\\neq\$ 0. Variance is low when Q \\approx P\\cdot|f| (proposal matches integrand shape).',
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
        'MH accepts/rejects proposed moves using the acceptance ratio \\alpha = min(1, P(x\')Q(x|x\')/P(x)Q(x\'|x)). Since P appears as a ratio, the normalizing constant cancels - only the unnormalized P̃(x) \\propto P(x) is needed. Under detailed balance, the chain\'s stationary distribution is P(x). This makes MCMC invaluable for Bayesian inference where P(\\theta|x) \\propto P(x|\\theta)P(\\theta) is known up to normalizer.',
      hints: [
        'Detailed balance: \\pi(x)T(x\'|x) = \\pi(x\')T(x|x\'). Ensures P is the stationary distribution.',
        'The normalizing constant P(x) = \\intP(x|\\theta)P(\\theta)d\\theta is often intractable - MCMC avoids it.',
      ],
    },
    {
      id: 'q-mfml-kp38-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Control variates reduce the variance of a Monte Carlo estimator ê = (1/N)\\Sigma f(x\\_i) by:',
      options: [
        'Increasing N (sample size) to reduce variance at rate 1/√N',
        'Subtracting a correlated function c\\cdotg(x) with known mean E[g] = \\mu_g, giving ê_CV = (1/N)\\Sigma [f(x\\_i) − c(g(x\\_i) − \\mu_g)]',
        'Importance-weighting samples to match a lower-variance proposal distribution',
        'Truncating extreme outliers that inflate the variance of f(x)',
      ],
      correctAnswer: 1,
      explanation:
        'Control variate estimator: ê_CV = (1/N)\\Sigma[f(x_i) − c(g(x_i) − \\mu_g)] is unbiased (since E[g − \\mu_g] = 0). Optimal c* = Cov(f,g)/Var(g) minimizes Var(ê_CV) = Var(f)(1 − \\rho\\^2_{fg}). When |\\rho_{fg}| \\approx 1, variance reduction is dramatic. The REINFORCE baseline in RL is a control variate for the policy gradient estimator.',
      hints: [
        'Subtracting zero-mean term c(g − \\mu_g) doesn\'t change the mean but can reduce variance.',
        'Optimal coefficient c* = Cov(f,g)/Var(g). Higher correlation \\to larger variance reduction.',
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
        'L = A \\cdot D\\^{-1}',
        'L = D\\^{-½ A D\\^{-½',
      ],
      correctAnswer: 1,
      explanation:
        'The combinatorial graph Laplacian L = D − A where D_ii = \\Sigma_j A_ij (degree of node i). L is symmetric, positive semidefinite, with smallest eigenvalue 0 (eigenvector 1). The number of zero eigenvalues equals the number of connected components. L captures graph connectivity and is fundamental to spectral graph theory.',
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
        'PageRank vector \\pi satisfies \\pi = d\\cdotA\\^T\\pi + (1−d)\\cdot1/n. The damping factor d \\approx 0.85 prevents rank sinks (nodes with no outlinks) and dangling nodes. The teleportation term (1−d)/n ensures the Markov chain is irreducible and aperiodic, guaranteeing a unique stationary distribution. PageRank = principal eigenvector of the modified transition matrix.',
      hints: [
        'Random surfer model: follow link with prob d, teleport with prob 1−d.',
        'Without teleportation, dangling nodes (no outlinks) accumulate all rank - it leaks.',
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
        'Fiedler vector = second smallest eigenvector - used for bisection (k=2 case).',
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
        'P(X \\geq t) \\leq E[X\\^2]/t\\^2',
        'P(X \\geq t) \\leq E[X]/t',
        'P(|X − E[X]| \\geq t) \\leq Var(X)/t\\^2',
        'P(X \\geq t) \\leq exp(−t/E[X])',
      ],
      correctAnswer: 1,
      explanation:
        'Markov\'s inequality: P(X \\geq t) \\leq E[X]/t. It requires only finite mean. Proof: E[X] \\geq E[X\\cdot1(X\\geqt)] \\geq t\\cdotP(X\\geqt). Chebyshev\'s inequality (requires finite variance) is Markov applied to (X−E[X])\\^2: P(|X−\\mu|\\geqt) \\leq \\sigma\\^2/t\\^2.',
      hints: [
        'Markov requires only E[X] < \\infty and X \\geq 0 - extremely weak assumption.',
        'Chebyshev\'s = apply Markov to (X − E[X])\\^2 with threshold t\\^2 - gives tighter bound.',
      ],
    },
    {
      id: 'q-mfml-kp40-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Hoeffding\'s inequality states that for independent bounded random variables X\\_i \\in [a\\_i, b\\_i] with S_n = \\Sigma X\\_i, the tail bound P(S_n − E[S_n] \\geq t) \\leq exp(−2t\\^2/\\Sigma(b\\_i−a\\_i)\\^2) decays exponentially in t.',
      correctAnswer: 'True',
      explanation:
        'Hoeffding\'s inequality gives exponential (sub-Gaussian) concentration for bounded variables - much tighter than Chebyshev\'s polynomial bound. For the sample mean X̄_n of i.i.d. [0,1] variables: P(X̄_n − \\mu \\geq \\epsilon) \\leq exp(−2n\\epsilon\\^2). This is the foundation of PAC learning bounds and confidence intervals in ML theory.',
      hints: [
        'Exponential decay vs. Chebyshev\'s 1/t\\^2 polynomial decay - Hoeffding is exponentially tighter.',
        'Hoeffding requires bounded variables; Gaussian concentration requires sub-Gaussian variables.',
      ],
    },
    {
      id: 'q-mfml-kp40-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'The union bound (Boole\'s inequality) P(\\cup\\_i A\\_i) \\leq \\Sigma\\_i P(A\\_i) is used in ML theory to:',
      options: [
        'Prove that the sample mean concentrates around the true mean for Gaussian data',
        'Convert per-hypothesis Hoeffding bounds into a uniform convergence guarantee over a finite hypothesis class: P(\\existsh\\inH: |err_S(h) − err(h)| \\geq \\epsilon) \\leq |H|\\cdotexp(−2n\\epsilon\\^2)',
        'Derive the Vapnik-Chervonenkis dimension of a hypothesis class from its size',
        'Bound the mutual information between inputs and predictions',
      ],
      correctAnswer: 1,
      explanation:
        'The union bound converts per-hypothesis Hoeffding bounds into a uniform convergence guarantee: P(\\existsh\\inH: |err_S(h) − err(h)| \\geq \\epsilon) \\leq \\Sigma_{h\\inH} P(|err_S(h) − err(h)| \\geq \\epsilon) \\leq |H|\\cdotexp(−2n\\epsilon\\^2). Setting this \\leq \\delta and solving for \\epsilon: with probability \\geq 1−\\delta, all hypotheses satisfy |training error − true error| \\leq √((log|H| + log(1/\\delta))/(2n)).',
      hints: [
        'Union bound: probability of any bad event \\leq sum of individual bad event probabilities.',
        'The log|H| factor in the generalization bound is the hypothesis class complexity penalty.',
      ],
    },
  ],
};

Object.assign(questions, extra);

const extra2: Record<string, import("@/lib/curriculum").Question[]> = {
  "information-theory-advanced": [
    {
      id: "q-mfml-kp41-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The entropy H(X) of a discrete random variable X with n equally likely outcomes is:",
      options: [
        "H(X) = 0 (certainty)",
        "H(X) = log\\_2(n) bits",
        "H(X) = 1/n bits",
        "H(X) = n bits",
      ],
      correctAnswer: 1,
      explanation: "For a uniform distribution over n outcomes: H(X) = −\\Sigma\\_i (1/n) log\\_2(1/n) = log\\_2(n). A fair coin (n=2) has H=1 bit; a fair die (n=6) has H=log\\_26\\approx2.58 bits. Uniform is the maximum-entropy distribution for fixed n.",
      hints: [
        "Each outcome has probability 1/n. Plug into H = −\\Sigma p log p.",
        "Entropy is maximized by the uniform distribution - all outcomes equally surprising.",
      ],
    },
    {
      id: "q-mfml-kp41-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A source emits symbols A (prob 0.5), B (prob 0.25), C (prob 0.125), D (prob 0.125). What is its entropy in bits?",
      options: ["1.75", "1.875", "2.0", "2.25"],
      correctAnswer: 1,
      explanation: "H = −(0.5 log\\_20.5 + 0.25 log\\_20.25 + 0.125 log\\_20.125 + 0.125 log\\_20.125) = 0.5\\times1 + 0.25\\times2 + 0.125\\times3 + 0.125\\times3 = 0.5 + 0.5 + 0.375 + 0.375 = 1.75. Wait: the Huffman code assigns lengths 1, 2, 3, 3, so average length = 1.75 bits, which equals entropy H = 1.75 bits - achieving the theoretical optimum.",
      hints: [
        "H = −\\Sigma p\\_i log\\_2p\\_i. For each symbol: −0.5\\timeslog\\_20.5 = 0.5, −0.25\\timeslog\\_20.25 = 0.5, each −0.125\\timeslog\\_20.125 = 0.375.",
        "Sum: 0.5 + 0.5 + 0.375 + 0.375 = 1.75 bits.",
      ],
    },
    {
      id: "q-mfml-kp41-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Shannon's channel capacity theorem (Shannon 1948) states that a noisy channel with bandwidth B Hz and SNR \\gamma = S/N has maximum error-free throughput:",
      options: [
        "C = B log\\_2(1 + \\gamma) bits/second",
        "C = B \\cdot \\gamma bits/second",
        "C = B / \\gamma bits/second",
        "C = \\gamma log\\_2(1 + B) bits/second",
      ],
      correctAnswer: 0,
      explanation: "The Shannon-Hartley theorem: C = B log\\_2(1 + S/N). Example: B=1 MHz, SNR=63: C = 10⁶ \\times log\\_2(64) = 6 Mbps. Below capacity, there exist codes achieving arbitrarily low error rate (Shannon's noisy channel coding theorem). This sets the ultimate limit for wireless communications regardless of modulation scheme.",
      hints: [
        "Doubling bandwidth doubles capacity. Doubling SNR adds only log\\_2(2)=1 bit/Hz.",
        "SNR must be on a linear scale (not dB). If SNR is given in dB: SNR_linear = 10^(SNR_dB/10).",
      ],
    },
    {
      id: "q-mfml-kp41-4",
      type: "true-false",
      difficulty: "medium",
      question: "The conditional entropy H(Y|X) is always less than or equal to H(Y), with equality if and only if X and Y are independent.",
      correctAnswer: "True",
      explanation: "Conditioning reduces entropy (or leaves it unchanged): H(Y|X) \\leq H(Y). Proof: H(Y) − H(Y|X) = I(X;Y) \\geq 0. Equality H(Y|X) = H(Y) holds iff I(X;Y) = 0 iff X and Y are independent. This formalises the intuition that knowing X cannot increase uncertainty about Y.",
      hints: [
        "I(X;Y) = H(Y) − H(Y|X) \\geq 0. Mutual information is always non-negative.",
        "If X is perfectly correlated with Y: H(Y|X) = 0. If independent: H(Y|X) = H(Y).",
      ],
    },
    {
      id: "q-mfml-kp41-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The data processing inequality states that for a Markov chain X \\to Y \\to Z:",
      options: [
        "I(X;Z) \\geq I(X;Y): processing can increase information",
        "I(X;Z) \\leq I(X;Y): post-processing cannot increase mutual information",
        "I(X;Z) = I(X;Y) always: information is preserved by processing",
        "H(Z) \\geq H(Y): processing increases entropy",
      ],
      correctAnswer: 1,
      explanation: "Data processing inequality: for Markov chain X\\toY\\toZ, I(X;Z) \\leq I(X;Y). Any function of Y cannot extract more information about X than Y itself contains. Application: bottleneck features - a compressed representation Z of features Y can retain at most I(X;Y) bits about the label X. This motivates the Information Bottleneck (Tishby 2000).",
      hints: [
        "Markov chain: Z is determined by Y alone, not by X directly. So Z cannot 'see' X through anything other than Y.",
        "Information Bottleneck: find Z that compresses Y while maximising I(Z;X) - subject to I(X;Z) \\leq I(X;Y).",
      ],
    },
    {
      id: "q-mfml-kp41-6",
      type: "true-false",
      difficulty: "easy",
      question: "Cross-entropy H(P, Q) = −\\Sigma P(x) log Q(x) is always greater than or equal to the entropy H(P) = −\\Sigma P(x) log P(x), with equality iff P = Q.",
      correctAnswer: "True",
      explanation: "H(P, Q) − H(P) = KL(P||Q) \\geq 0 (Gibbs' inequality). Equivalently: −\\Sigma P log Q \\geq −\\Sigma P log P. Cross-entropy is the expected code length when using Q to encode messages drawn from P. The inefficiency relative to the optimal H(P) is exactly the KL divergence KL(P||Q).",
      hints: [
        "H(P,Q) = H(P) + KL(P||Q). Since KL \\geq 0, cross-entropy \\geq entropy.",
        "In ML training, minimising cross-entropy H(P_data, P_model) = H(P_data) + KL(P_data||P_model), so minimising cross-entropy = minimising KL.",
      ],
    },
  ],

  "numerical-methods-advanced": [
    {
      id: "q-mfml-kp42-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Gradient descent with constant learning rate \\eta on a strongly convex function with Lipschitz gradient (L-smooth, \\mu-strongly convex) converges at rate:",
      options: [
        "O(1/t) - sublinear convergence",
        "O((1 − \\mu/L)^t) - linear (geometric) convergence",
        "O(1/t\\^2) - accelerated sublinear convergence",
        "O(exp(−t\\^2)) - super-linear convergence",
      ],
      correctAnswer: 1,
      explanation: "For L-smooth \\mu-strongly convex f, gradient descent with \\eta=1/L achieves f(x\\_t)−f* \\leq (1 − \\mu/L)^t (f(x\\_0)−f*). The condition number κ = L/\\mu \\geq 1 controls convergence: small κ \\to fast. Nesterov acceleration (momentum) improves this to O((1−√(\\mu/L))^t), the optimal first-order rate.",
      hints: [
        "The ratio \\mu/L \\in (0,1] is the progress per step. Small κ=L/\\mu means function is well-conditioned.",
        "Momentum (Nesterov): replaces factor (1−\\mu/L) with (1−√(\\mu/L)) - exploits the geometric mean structure.",
      ],
    },
    {
      id: "q-mfml-kp42-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LU decomposition with partial pivoting decomposes a matrix A as PA = LU where P is a permutation matrix. The condition number κ(A) affects numerical stability because:",
      options: [
        "Partial pivoting directly reduces κ(A) to 1 for any matrix",
        "The relative error in the solution x to Ax=b is bounded by ‖\\deltax‖/‖x‖ \\leq κ(A)\\cdot‖\\deltab‖/‖b‖, so large κ amplifies rounding errors from finite precision arithmetic",
        "LU without pivoting always produces a smaller condition number than LU with pivoting",
        "The condition number only affects the speed of convergence, not the accuracy of the solution",
      ],
      correctAnswer: 1,
      explanation: "The fundamental condition number bound: ‖\\deltax‖/‖x‖ \\leq κ(A)\\cdot(‖\\deltaA‖/‖A‖ + ‖\\deltab‖/‖b‖). Partial pivoting (swapping rows to put the largest pivot on the diagonal) controls the growth factor of LU and improves numerical stability, but cannot change κ(A). An ill-conditioned matrix (κ >> 1) will give poor solutions regardless of the algorithm used.",
      hints: [
        "κ(A) = \\sigma_max/\\sigma_min. Large κ: tiny changes in b cause huge changes in x.",
        "float64 precision \\approx 10\\^{-1}⁶. If κ(A) = 10¹\\^2, you lose 12 digits of accuracy \\to solution has only ~4 significant digits.",
      ],
    },
    {
      id: "q-mfml-kp42-3",
      type: "true-false",
      difficulty: "medium",
      question: "The QR decomposition A = QR (Q orthogonal, R upper triangular) can be used to solve least-squares problems Ax \\approx b more numerically stably than forming the normal equations A\\^TAx = A\\^Tb.",
      correctAnswer: "True",
      explanation: "Normal equations A\\^TAx = A\\^Tb square the condition number: κ(A\\^TA) = κ(A)\\^2. For κ(A) = 10⁸, κ(A\\^TA) = 10¹⁶, exhausting float64 precision. QR solves min‖Ax−b‖ via Rx=Q\\^Tb without squaring the condition number, using orthogonal transformations (Householder, Givens) that are numerically stable. Standard numerical libraries (LAPACK's dgels) use QR for least-squares.",
      hints: [
        "Normal equations condition number = κ(A)\\^2: for ill-conditioned A, this can catastrophically amplify errors.",
        "QR preserves condition number: solving Rx=Q\\^Tb has the same conditioning as the original A.",
      ],
    },
    {
      id: "q-mfml-kp42-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Singular Value Decomposition A = U\\SigmaV\\^T provides the best rank-k approximation A\\_k = U\\_k\\Sigma\\_kV\\_k\\^T in the sense that:",
      options: [
        "A\\_k has the smallest Frobenius norm among all rank-k matrices",
        "‖A − A\\_k‖\\_2 = \\sigma\\_k₊\\_1 is minimal - no other rank-k matrix approximates A better in spectral or Frobenius norm (Eckart-Young theorem)",
        "A\\_k minimizes the number of non-zero entries (sparsity)",
        "A\\_k is the rank-k matrix closest to A in the L\\infty norm",
      ],
      correctAnswer: 1,
      explanation: "Eckart-Young-Mirsky theorem: among all rank-k matrices B, the SVD truncation A\\_k = U\\_k\\Sigma\\_kV\\_k\\^T minimizes both ‖A−B‖\\_2 = \\sigma\\_k₊\\_1 (spectral norm) and ‖A−B‖_F = √(\\sigma\\_k₊\\_1\\^2 + ⋯ + \\sigmaᵣ\\^2) (Frobenius norm). This makes SVD the theoretically optimal dimensionality reduction for linear methods, underlying PCA, LSA, and collaborative filtering.",
      hints: [
        "Truncate after k singular values: the approximation error in spectral norm = \\sigma\\_k₊\\_1, the (k+1)-th singular value.",
        "PCA is SVD on the centered data matrix: the k principal components are the top-k right singular vectors V\\_k.",
      ],
    },
    {
      id: "q-mfml-kp42-5",
      type: "true-false",
      difficulty: "hard",
      question: "Newton's method for finding the root of f(x)=0 has quadratic convergence near the root: the error at step t+1 satisfies |e\\_t₊\\_1| \\approx C|e\\_t|\\^2, meaning the number of correct decimal digits doubles each iteration.",
      correctAnswer: "True",
      explanation: "Newton's method: x\\_t₊\\_1 = x\\_t − f(x\\_t)/f'(x\\_t). Taylor expansion around root x*: e\\_t₊\\_1 \\approx f''(x*)/(2f'(x*)) \\cdot e\\_t\\^2. This quadratic convergence (once in the basin of attraction) gives extremely fast local convergence: 1 \\to 2 \\to 4 \\to 8 \\to 16 significant digits per iteration. Applied to f(\\theta) = \\nablaL(\\theta): Newton step = −H\\^{-1}\\nablaL is the full Newton method for optimization.",
      hints: [
        "Quadratic convergence: error ~ C \\times (previous error)\\^2. Starting at 10\\^{-1}: next step 10\\^{-\\^2, then 10\\^{-\\^4, then 10\\^{-⁸.",
        "Newton requires computing and inverting the Hessian H: O(n\\^2) storage, O(n\\^3) per step - expensive in high dimensions.",
      ],
    },
    {
      id: "q-mfml-kp42-6",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The conjugate gradient (CG) method solves Ax = b (A symmetric positive definite) in at most n iterations exactly, and in practice converges faster for well-conditioned matrices. Its key advantage over gradient descent for solving linear systems is:",
      options: [
        "CG requires computing A\\^{-1} explicitly, making each step O(n\\^3)",
        "CG is guaranteed to converge in at most n iterations for an n\\timesn SPD system, versus gradient descent which may require many more steps",
        "CG uses randomized matrix-vector products for speed",
        "CG is only applicable to diagonal matrices",
      ],
      correctAnswer: 1,
      explanation: "CG generates mutually A-conjugate search directions (d\\_i\\^TAd\\_j = 0 for i\$\\neq\$j), ensuring each new step makes progress in a previously unexplored direction. For an n\\timesn SPD system: CG terminates in \\leq n steps exactly. Convergence rate: ‖e\\_t‖_A \\leq 2((√κ−1)/(√κ+1))^t ‖e\\_0‖_A - dependent on √κ rather than κ for gradient descent.",
      hints: [
        "CG termination in n steps: n search directions span \\mathbb{R}\\^n - x* is found exactly.",
        "Condition number dependence: GD converges as (1−2/(κ+1))^t; CG as ((√κ−1)/(√κ+1))^t - CG is faster by factor √κ.",
      ],
    },
  ],

  "markov-chains-mcmc": [
    {
      id: "q-mfml-kp43-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A Markov chain with transition matrix P is called ergodic if it is:",
      options: [
        "Reducible and periodic",
        "Irreducible and aperiodic, guaranteeing convergence to a unique stationary distribution",
        "Absorbing: some states cannot be left once entered",
        "Reversible: detailed balance holds with any initial distribution",
      ],
      correctAnswer: 1,
      explanation: "Ergodic Markov chain = irreducible (every state reachable from every other state) + aperiodic (no cyclic patterns). Ergodicity guarantees: (1) unique stationary distribution \\pi exists, (2) P\\^t \\to 1\\pi\\^T (convergence from any initial state), (3) time averages equal ensemble averages (ergodic theorem). MCMC methods rely on ergodicity for valid sampling.",
      hints: [
        "Irreducible: can go from any state to any other. Aperiodic: not stuck in a cycle of fixed length.",
        "Ergodicity = unique stationary distribution \\pi such that \\piP = \\pi, and P\\^t converges to it.",
      ],
    },
    {
      id: "q-mfml-kp43-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Metropolis-Hastings MCMC, the acceptance probability for moving from state x to proposed state x' with proposal Q(x'|x) is \\alpha = min(1, \\pi(x')Q(x|x')/\\pi(x)Q(x'|x)). If Q is symmetric (Q(x'|x) = Q(x|x')), this simplifies to:",
      options: [
        "\\alpha = min(1, \\pi(x)/\\pi(x'))",
        "\\alpha = min(1, \\pi(x')/\\pi(x))",
        "\\alpha = \\pi(x')/(\\pi(x') + \\pi(x))",
        "\\alpha = 1 always (all proposals accepted)",
      ],
      correctAnswer: 1,
      explanation: "For symmetric Q: \\alpha = min(1, \\pi(x')Q(x|x')/(\\pi(x)Q(x'|x))) = min(1, \\pi(x')/\\pi(x)). This is the original Metropolis algorithm (1953). If the proposed state has higher density (\\pi(x') > \\pi(x)): always accept. If lower: accept with probability \\pi(x')/\\pi(x). This implements detailed balance: \\pi(x)T(x'|x) = \\pi(x')T(x|x').",
      hints: [
        "Symmetric Q cancels: MH ratio reduces to just the target density ratio \\pi(x')/\\pi(x).",
        "Always move uphill (higher \\pi); sometimes move downhill - prevents getting trapped at local modes.",
      ],
    },
    {
      id: "q-mfml-kp43-3",
      type: "true-false",
      difficulty: "hard",
      question: "Hamiltonian Monte Carlo (HMC) uses gradient information \\nablalog \\pi(x) to propose distant moves that are accepted with high probability, making it more efficient than random-walk Metropolis for smooth high-dimensional targets.",
      correctAnswer: "True",
      explanation: "HMC augments the state with auxiliary momentum p ~ N(0, M), then simulates Hamiltonian dynamics (conservative motion on the energy surface H(x,p) = −log \\pi(x) + ½p\\^TM\\^{-1}p) using leapfrog integration. The dynamics propose distant moves in the right direction guided by the gradient. Acceptance rate is near 1 (energy is conserved exactly in continuous time; leapfrog has small discretization error). HMC reduces random-walk behaviour from O(n) to O(n^{1/4}) steps per effective sample in n dimensions.",
      hints: [
        "Random-walk MH explores by diffusion (O(n) steps to traverse the target). HMC uses gradient to slide along level sets - much more efficient.",
        "The leapfrog integrator preserves volume in phase space (symplectic), enabling high acceptance rates without detailed computation of the Jacobian.",
      ],
    },
    {
      id: "q-mfml-kp43-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The mixing time of a Markov chain measures how long it takes to approach the stationary distribution. For Metropolis-Hastings on a target with K well-separated modes, the mixing time tends to be:",
      options: [
        "Very short because HM always accepts inter-mode proposals",
        "Exponentially long in the energy barrier between modes - the chain can get trapped in one mode",
        "Exactly K steps, one per mode",
        "Independent of K because MH has geometric convergence guarantees",
      ],
      correctAnswer: 1,
      explanation: "Multimodal targets are the Achilles heel of local MCMC methods. If modes are separated by a low-density region, proposals that cross the barrier are rejected with probability 1 − \\pi(x')/\\pi(x) \\approx 1. The chain explores within one mode for an exponentially long time before crossing. Solutions: parallel tempering (run chains at multiple temperatures), transdimensional MCMC, or normalizing flows as proposals.",
      hints: [
        "Energy barrier = region where \\pi(x) \\approx 0 between modes. Crossing it requires a proposal with very low acceptance.",
        "Parallel tempering: high-temperature chains mix faster and occasionally swap states with the cold chain, enabling cross-mode jumps.",
      ],
    },
    {
      id: "q-mfml-kp43-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A Markov chain has stationary distribution \\pi. The detailed balance condition (reversibility) \\pi(x)T(x'|x) = \\pi(x')T(x|x') implies:",
      options: [
        "The chain visits states in order of decreasing probability",
        "The chain is time-reversible: the forward and backward processes are statistically indistinguishable",
        "The chain converges faster than non-reversible chains",
        "All transition probabilities are equal",
      ],
      correctAnswer: 1,
      explanation: "Detailed balance (also called reversibility or microreversibility) means the probability flux from x to x' equals that from x' to x: \\pi(x)T(x'|x) = \\pi(x')T(x|x'). Summing over x': \\Sigma_x \\pi(x)T(x'|x) = \\pi(x')\\cdot\\Sigma_x T(x|x') = \\pi(x'). So detailed balance implies stationarity. Metropolis-Hastings is designed to satisfy detailed balance by construction.",
      hints: [
        "Detailed balance = equal flux in both directions. Sum over x to verify \\pi satisfies \\piP = \\pi.",
        "Not all MCMC methods satisfy detailed balance. Non-reversible chains can mix faster but are harder to construct.",
      ],
    },
    {
      id: "q-mfml-kp43-6",
      type: "true-false",
      difficulty: "medium",
      question: "Gibbs sampling is a special case of Metropolis-Hastings where each coordinate is updated from its full conditional distribution P(x\\_i|x_{−i}), and all proposed updates are accepted with probability 1.",
      correctAnswer: "True",
      explanation: "In Gibbs sampling, the proposal for coordinate i is Q(x\\_i'|x) = P(x\\_i'|x_{−i}). The MH acceptance ratio: \\pi(x')Q(x|x')/\\pi(x)Q(x'|x) = P(x')/P(x\\_i|x_{−i}) \\times P(x\\_i'|x_{−i})/P(x) = 1. So Gibbs sampling always accepts. This requires that full conditionals are available in closed form (e.g., exponential family conjugate models) - otherwise MH with a different proposal is needed.",
      hints: [
        "Gibbs = MH with acceptance rate 1. The proposal already places probability according to the target's full conditional.",
        "Gibbs works for models with conjugate priors where P(\\theta\\_i|\\theta_{−i}, data) has a known form (Beta, Gaussian, etc.).",
      ],
    },
  ],

  "lagrangian-kkt-optimization": [
    {
      id: "q-mfml-kp44-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For the constrained optimization problem min f(x) s.t. g(x) \\leq 0, h(x) = 0, the Lagrangian is L(x, \\lambda, ν) = f(x) + \\lambda\\^Tg(x) + ν\\^Th(x). The KKT conditions for optimality include the complementary slackness condition:",
      options: [
        "\\lambda\\_i \\geq 0 for all inequality constraints",
        "\\lambda\\_i \\cdot g\\_i(x*) = 0 for each i: either the multiplier is zero or the constraint is active",
        "ν\\_i = 0 for all equality constraints",
        "\\nablaf(x*) = 0 (unconstrained stationarity)",
      ],
      correctAnswer: 1,
      explanation: "KKT conditions: (1) Stationarity: \\nablaf + \\Sigma\\lambda\\_i\\nablag\\_i + \\Sigmaν\\_j\\nablah\\_j = 0. (2) Primal feasibility: g\\_i(x*)\\leq0, h\\_j(x*)=0. (3) Dual feasibility: \\lambda\\_i\\geq0. (4) Complementary slackness: \\lambda\\_i\\cdotg\\_i(x*)=0. The CS condition means: if constraint i is inactive (g\\_i<0), its multiplier \\lambda\\_i must be 0 (it doesn't constrain the optimum). If \\lambda\\_i>0, the constraint must be active (g\\_i=0).",
      hints: [
        "Complementary slackness: \\lambda\\_i=0 or g\\_i(x*)=0 - at least one of them must be zero.",
        "Active constraints (g\\_i=0) can have \\lambda\\_i>0; inactive constraints (g\\_i<0) must have \\lambda\\_i=0.",
      ],
    },
    {
      id: "q-mfml-kp44-2",
      type: "true-false",
      difficulty: "medium",
      question: "Strong duality holds for convex optimization problems satisfying Slater's condition (existence of a strictly feasible point), meaning the primal and dual optimal values are equal: p* = d*.",
      correctAnswer: "True",
      explanation: "Slater's condition: \\existsx with g\\_i(x)<0 for all i. For convex f, g\\_i: Slater's condition guarantees strong duality (p*=d*). The duality gap p*−d* measures the quality of the dual lower bound. For the SVM: strong duality gives the dual formulation max \\Sigma\\alpha\\_i − ½\\Sigma\\_i\\_j\\alpha\\_i\\alpha\\_jy\\_iy\\_jx\\_i\\^Tx\\_j s.t. \\alpha\\_i\\geq0, \\Sigma\\alpha\\_iy\\_i=0 - enabling the kernel trick.",
      hints: [
        "Slater's condition: there is a point that strictly satisfies all inequality constraints - not just on the boundary.",
        "Without Slater's condition, the duality gap p*−d* \\geq 0 but may be positive even for convex problems.",
      ],
    },
    {
      id: "q-mfml-kp44-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The dual of the primal SVM (min ½‖w‖\\^2 s.t. y\\_i(w\\^Tx\\_i+b) \\geq 1) has the dual variables \\alpha\\_i \\geq 0 satisfying complementary slackness: \\alpha\\_i(y\\_i(w\\^Tx\\_i+b)−1) = 0. This means:",
      options: [
        "All \\alpha\\_i > 0 (all training points contribute to the decision boundary)",
        "Only the support vectors (points with y\\_i(w\\^Tx\\_i+b) = 1) have \\alpha\\_i > 0; all other points have \\alpha\\_i = 0",
        "\\alpha\\_i = y\\_i for all points by the dual constraint",
        "\\alpha\\_i = 0 iff the point is correctly classified",
      ],
      correctAnswer: 1,
      explanation: "By complementary slackness: either \\alpha\\_i=0 or y\\_i(w\\^Tx\\_i+b)=1. For points strictly inside the margin (y\\_i(w\\^Tx\\_i+b)>1): their constraint is inactive \\to \\alpha\\_i=0. They do not contribute to w = \\Sigma\\alpha\\_iy\\_ix\\_i. Only support vectors (on the margin boundary) have \\alpha\\_i>0. This is why SVM is memory-efficient: the solution depends only on the support vectors.",
      hints: [
        "\\alpha\\_i>0 requires the constraint to be active: y\\_i(w\\^Tx\\_i+b) = 1 exactly - on the margin boundary.",
        "w = \\Sigma\\_i \\alpha\\_iy\\_ix\\_i: only support vectors (\\alpha\\_i>0) contribute. Far-from-margin points have \\alpha\\_i=0 and are irrelevant.",
      ],
    },
    {
      id: "q-mfml-kp44-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The proximal operator of a function g with step size \\eta is defined as prox_{\\etag}(v) = argmin_x (g(x) + ‖x−v‖\\^2/(2\\eta)). For g(x) = \\lambda‖x‖\\_1 (LASSO), the proximal operator is:",
      options: [
        "prox(v) = v/(1 + 2\\eta\\lambda) (ridge shrinkage)",
        "prox(v) = sign(v)\\cdotmax(|v| − \\eta\\lambda, 0) (soft-thresholding)",
        "prox(v) = v if |v| > \\eta\\lambda, else 0 (hard-thresholding)",
        "prox(v) = v − \\eta\\lambda\\cdotsign(v) (gradient step of L1)",
      ],
      correctAnswer: 1,
      explanation: "The proximal operator of \\eta\\lambda‖\\cdot‖\\_1 is the soft-thresholding operator: S_{\\eta\\lambda}(v) = sign(v)\\cdotmax(|v|−\\eta\\lambda, 0). It shrinks each coordinate toward zero by \\eta\\lambda, setting small coordinates exactly to zero (sparsity). This arises in ISTA/FISTA for solving LASSO: x\\_t₊\\_1 = prox_{\\eta\\lambda‖\\cdot‖\\_1}(x\\_t − \\eta\\nablaf(x\\_t)).",
      hints: [
        "Soft-thresholding: values in [−\\eta\\lambda, \\eta\\lambda] map to 0; values outside shrink by \\eta\\lambda toward 0.",
        "ISTA (Iterative Shrinkage Thresholding Algorithm) = gradient step on smooth part f + proximal step on L1.",
      ],
    },
    {
      id: "q-mfml-kp44-5",
      type: "true-false",
      difficulty: "easy",
      question: "A function f is convex if and only if its epigraph epi(f) = {(x,t): f(x) \\leq t} is a convex set.",
      correctAnswer: "True",
      explanation: "The epigraph definition is equivalent to the standard definition f(\\lambdax+(1−\\lambda)y) \\leq \\lambdaf(x)+(1−\\lambda)f(y). The epigraph is the set of points on or above the graph of f. If epi(f) is convex, then for any two points (x\\_1,t\\_1) and (x\\_2,t\\_2) in epi(f): f(x\\_1)\\leqt\\_1, f(x\\_2)\\leqt\\_2, and by convexity of epi(f): f(\\lambdax\\_1+(1−\\lambda)x\\_2) \\leq \\lambdat\\_1+(1−\\lambda)t\\_2.",
      hints: [
        "epi(f) = region above the graph. Convex epigraph = the 'bowl' above a convex function.",
        "This definition extends naturally to functions on infinite-dimensional spaces and allows f(x)=+\\infty (convex indicator functions).",
      ],
    },
    {
      id: "q-mfml-kp44-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Mirror descent generalizes gradient descent by replacing the Euclidean proximity measure with a Bregman divergence D_\\phi(x, y) = \\phi(x) − \\phi(y) − \\nabla\\phi(y)\\^T(x−y). For online learning with the simplex constraint and \\phi(x) = \\Sigma x\\_i log x\\_i (negative entropy), mirror descent becomes:",
      options: [
        "Gradient descent with L1 projection onto the simplex",
        "The multiplicative weights (Hedge) algorithm: x\\_t₊\\_1 \\propto x\\_t \\cdot exp(−\\eta\\nablaf\\_t(x\\_t))",
        "Projected gradient descent with Euclidean projection onto the simplex",
        "Stochastic gradient descent with batch normalization",
      ],
      correctAnswer: 1,
      explanation: "With mirror map \\phi(x)=\\Sigmax\\_ilogx\\_i (KL-divergence-based Bregman), the mirror descent update is: x\\_t₊\\_1 \\propto x\\_t\\_i exp(−\\etag\\_t\\_i) where g\\_t=\\nablaf\\_t(x\\_t). This is the multiplicative weights / Hedge algorithm, achieving regret O(√(T log K)) for K experts - optimal for the simplex. Compared to projected gradient descent, mirror descent adapts the geometry to the constraint set.",
      hints: [
        "Mirror map \\phi = negative entropy \\to Bregman divergence = KL(x||y). The update maintains the simplex constraint naturally.",
        "Multiplicative weights: multiply each weight by exp(−\\eta \\times gradient). Exponentials automatically keep weights non-negative.",
      ],
    },
  ],

  "conjugate-priors-moments": [
    {
      id: "q-mfml-kp45-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The Beta distribution Beta(\\alpha,\\beta) is a conjugate prior for the Bernoulli likelihood. After observing k successes in n trials, the posterior is:",
      options: [
        "Beta(\\alpha+n, \\beta+k)",
        "Beta(\\alpha+k, \\beta+n−k)",
        "Normal(\\alpha/(\\alpha+\\beta), \\alpha\\beta/(\\alpha+\\beta)\\^2(\\alpha+\\beta+1))",
        "Dirichlet(\\alpha+k, \\beta+n−k)",
      ],
      correctAnswer: 1,
      explanation: "Likelihood: P(k|\\theta) \\propto \\theta\\^k(1−\\theta)^{n−k}. Prior: Beta(\\alpha,\\beta) \\propto \\theta^{\\alpha−1}(1−\\theta)^{\\beta−1}. Posterior: \\theta^{\\alpha+k−1}(1−\\theta)^{\\beta+n−k−1} = Beta(\\alpha+k, \\beta+n−k). The counts simply add to the prior pseudocounts. Prior mean E[\\theta] = \\alpha/(\\alpha+\\beta); posterior mean = (\\alpha+k)/(\\alpha+\\beta+n). With large n, posterior approaches MLE k/n.",
      hints: [
        "Beta conjugate update: just add observed successes to \\alpha and failures to \\beta.",
        "Effective prior sample size = \\alpha+\\beta. Large \\alpha+\\beta \\to posterior less affected by data (strong prior).",
      ],
    },
    {
      id: "q-mfml-kp45-2",
      type: "true-false",
      difficulty: "medium",
      question: "The moment generating function (MGF) M_X(t) = E[e^{tX}] of a random variable X uniquely determines its distribution (when it exists in a neighborhood of t=0), and the k-th moment E[X\\^k] can be recovered as M_X^{(k)}(0) (the k-th derivative at t=0).",
      correctAnswer: "True",
      explanation: "MGF uniqueness theorem: if M_X(t) exists for |t|<\\delta, it uniquely determines the distribution of X. Derivatives: M_X'(0) = E[X], M_X''(0) = E[X\\^2], M_X^{(k)}(0) = E[X\\^k]. Example: X ~ N(\\mu,\\sigma\\^2): M_X(t) = exp(\\mut + \\sigma\\^2t\\^2/2). MGFs are useful for proving CLT and computing moments without integration.",
      hints: [
        "Taylor expand M_X(t) = \\Sigma\\_k (E[X\\^k]/k!) t\\^k - coefficients are moments divided by k!.",
        "MGF of sum of independents = product of MGFs: M_{X+Y}(t) = M_X(t)\\cdotM_Y(t).",
      ],
    },
    {
      id: "q-mfml-kp45-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Dirichlet distribution Dir(\\alpha\\_1,...,\\alpha\\_k) is a conjugate prior for the Categorical/Multinomial likelihood. Its mean and mode are:",
      options: [
        "Mean = \\alpha\\_i/\\Sigma\\alpha\\_j; Mode = (\\alpha\\_i−1)/(\\Sigma\\alpha\\_j−K) for \\alpha\\_i > 1",
        "Mean = \\Sigma\\alpha\\_j/K; Mode = K/\\Sigma\\alpha\\_j",
        "Mean = \\alpha\\_i; Mode = \\alpha\\_i/max(\\alpha\\_j)",
        "Mean = 1/K (uniform regardless of \\alpha); Mode = argmax \\alpha\\_i",
      ],
      correctAnswer: 0,
      explanation: "Dir(\\alpha): Mean_i = \\alpha\\_i/\\Sigma\\alpha\\_j (normalized counts). Mode_i = (\\alpha\\_i−1)/(\\Sigma\\alpha\\_j−K) for \\alpha\\_i>1 (valid when all \\alpha\\_i>1). With prior Dir(\\alpha\\_1,...,\\alphaK) and observed counts (n\\_1,...,nK): posterior is Dir(\\alpha\\_1+n\\_1,...,\\alphaK+nK). LDA uses Dir(\\alpha) prior on topic mixtures and Dir(\\beta) prior on word distributions.",
      hints: [
        "Dirichlet mean: normalize the \\alpha parameters. Posterior: simply add observed counts to \\alpha.",
        "\\alpha\\_i < 1: sparse mode (pushes probability mass to corners of simplex). \\alpha\\_i > 1: smooth distribution.",
      ],
    },
    {
      id: "q-mfml-kp45-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The Normal-Inverse-Gamma distribution is a conjugate prior for Bayesian linear regression. Which of the following describes a key benefit of using conjugate priors in Bayesian inference?",
      options: [
        "Conjugate priors always assign equal probability to all parameter values, preventing overfitting",
        "The posterior distribution has the same parametric form as the prior, enabling analytical (closed-form) updates without numerical integration",
        "Conjugate priors guarantee that the MAP estimate equals the MLE estimate",
        "Using conjugate priors removes the need for any prior specification",
      ],
      correctAnswer: 1,
      explanation: "Conjugacy enables exact Bayesian inference without MCMC or variational approximations. After observing data, the posterior is computed by updating the prior parameters according to fixed formulas. This is computationally efficient and supports sequential (online) updating: each new observation updates the posterior which becomes the new prior. For large datasets or non-conjugate models, approximations (MCMC, VI) are needed.",
      hints: [
        "Conjugate posterior: same family as prior, updated parameters. No integration required.",
        "Sequential updating: posterior after n samples = prior updated with all n observations simultaneously = prior updated one sample at a time.",
      ],
    },
  ],
};

const extra3: Record<string, import("@/lib/curriculum").Question[]> = {
  "svd-applications": [
    {
      id: "q-mfml-kp46-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Principal Component Analysis (PCA) applied to a centred data matrix X of shape (n samples x d features) computes the top-k principal components. These components are:",
      options: [
        "The top-k rows of X with the largest L2 norm",
        "The top-k right singular vectors of X (equivalently, the top-k eigenvectors of the covariance matrix X\\^TX/n)",
        "The top-k left singular vectors of X (the n-dimensional representations)",
        "The top-k columns of X with the largest variance",
      ],
      correctAnswer: 1,
      explanation: "PCA via SVD: X = U\\SigmaV\\^T. The principal directions are columns of V (right singular vectors). The top-k right singular vectors v\\_1,...,v\\_k \\in \\mathbb{R}ᵈ are the directions of maximum variance. They are also the eigenvectors of the covariance matrix C = X\\^TX/n with eigenvalues \\sigma\\_i\\^2/n. The projected data is Z = XV\\_k \\in \\mathbb{R}\\^nˣ\\^k (the top-k left singular vectors scaled by singular values).",
      hints: [
        "PCA = SVD on centred data. Principal directions = right singular vectors V. Scores = XV = U\\Sigma.",
        "Eigenvalues of X\\^TX/n = \\sigma\\_i\\^2/n. Variance explained by component i = \\sigma\\_i\\^2/\\Sigma\\sigma\\_j\\^2.",
      ],
    },
    {
      id: "q-mfml-kp46-2",
      type: "true-false",
      difficulty: "hard",
      question: "In a Gaussian mixture model (GMM) fit with the EM algorithm, the E-step computes the posterior probability that each data point belongs to each component, and the M-step updates the component parameters (means, covariances, weights) to maximize the expected complete-data log-likelihood.",
      correctAnswer: "True",
      explanation: "EM for GMM: E-step: r\\_i\\_k = P(z\\_i=k|x\\_i, \\theta) = \\pi\\_kN(x\\_i|\\mu\\_k,\\Sigma\\_k)/\\Sigma\\_j\\pi\\_j N(x\\_i|\\mu\\_j,\\Sigma\\_j) (soft cluster assignments). M-step: \\pi\\_k = (1/n)\\Sigma\\_ir\\_i\\_k, \\mu\\_k = \\Sigma\\_ir\\_i\\_kx\\_i/\\Sigma\\_ir\\_i\\_k, \\Sigma\\_k = \\Sigma\\_ir\\_i\\_k(x\\_i−\\mu\\_k)(x\\_i−\\mu\\_k)\\^T/\\Sigma\\_ir\\_i\\_k. EM monotonically increases the marginal log-likelihood log p(X|\\theta) and converges to a local maximum.",
      hints: [
        "E-step: soft assignment r\\_i\\_k = responsibility of component k for point i. M-step: update parameters using weighted statistics.",
        "EM does not guarantee global optimum - multiple random restarts are used to find a good local maximum.",
      ],
    },
  ],
};

Object.assign(questions, extra2, extra3);

registerQuestions(questions);
export default questions;
