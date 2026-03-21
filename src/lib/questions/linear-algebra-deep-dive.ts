import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "vector-spaces": [
    {
      id: "q-alg-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which of the following is a valid subspace of ℝ³?",
      options: [
        "The set of all vectors (x, y, z) where x + y + z = 1",
        "The set of all vectors (x, y, z) where x + y + z = 0",
        "The set of all vectors (x, y, z) where x² + y² + z² = 1",
        "The set of all vectors (x, y, z) where x, y, z > 0",
      ],
      correctAnswer: 1,
      explanation:
        "A subspace must contain the zero vector, be closed under addition, and be closed under scalar multiplication. Only x + y + z = 0 contains (0,0,0) and satisfies both closure properties; the others fail the zero vector test.",
      hints: [
        "Check whether the zero vector (0, 0, 0) belongs to each set.",
        "A subspace must be closed under addition: if u and v are in the set, is u + v also in the set?",
      ],
    },
    {
      id: "q-alg-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A basis for a vector space must be a set of orthogonal vectors.",
      correctAnswer: "false",
      explanation:
        "A basis only requires the vectors to be linearly independent and span the space; orthogonality is an additional property of orthonormal bases (e.g., from Gram-Schmidt) but is not required for a basis.",
      hints: [
        "Think about the standard basis {e₁, e₂, e₃} — is that the only valid basis for ℝ³?",
        "Can you find a basis for ℝ² where the two vectors are not perpendicular?",
      ],
    },
    {
      id: "q-alg-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The set of all polynomials of degree ≤ 2 forms a vector space. What is its dimension?",
      options: ["2", "3", "4", "Infinite"],
      correctAnswer: 1,
      explanation:
        "Every polynomial of degree ≤ 2 can be written as a₀ + a₁x + a₂x², so {1, x, x²} is a basis — giving dimension 3.",
      hints: [
        "Find the smallest spanning set: what basic building blocks can generate every polynomial of degree ≤ 2?",
        "The dimension equals the number of elements in any basis.",
      ],
    },
  ],

  "linear-transformations": [
    {
      id: "q-alg-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A linear transformation T: ℝⁿ → ℝᵐ must satisfy which two properties?",
      options: [
        "T(u + v) = T(u) + T(v) and T(cu) = cT(u) for all u, v and scalar c",
        "T(u · v) = T(u) · T(v) and T(u + v) = T(u) × T(v)",
        "T is invertible and T maps the origin to itself",
        "T(u) > 0 for all nonzero u and T(0) = 1",
      ],
      correctAnswer: 0,
      explanation:
        "Linearity requires additivity (T(u + v) = T(u) + T(v)) and homogeneity (T(cu) = cT(u)); together these imply T(0) = 0 and that the transformation preserves the vector space structure.",
      hints: [
        "The two properties are about addition and scalar multiplication — the two operations defined in a vector space.",
        "A consequence of linearity: T(0) must equal 0.",
      ],
    },
    {
      id: "q-alg-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The matrix representation of a linear transformation depends on the choice of basis, so the same transformation can have different matrix representations.",
      correctAnswer: "true",
      explanation:
        "A linear transformation is basis-independent, but its matrix representation encodes coordinates relative to chosen bases; different bases yield different (though similar) matrices representing the same transformation.",
      hints: [
        "Think about how the same rotation in ℝ² looks in the standard basis vs. a rotated basis.",
        "Two matrices A and B represent the same transformation if B = P⁻¹AP for some invertible P.",
      ],
    },
    {
      id: "q-alg-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The transformation T(x) = Ax where A is an m × n matrix maps from which space to which space?",
      options: [
        "From ℝᵐ to ℝⁿ",
        "From ℝⁿ to ℝᵐ",
        "From ℝⁿ to ℝⁿ (always square)",
        "From ℝᵐ to ℝᵐ (always square)",
      ],
      correctAnswer: 1,
      explanation:
        "For Ax to be defined, x must be in ℝⁿ (n-dimensional column vector), and the product Ax is an m-dimensional vector in ℝᵐ; an m × n matrix always maps from ℝⁿ to ℝᵐ.",
      hints: [
        "The number of columns of A determines the size of the input vector.",
        "The number of rows of A determines the size of the output vector.",
      ],
    },
  ],

  determinants: [
    {
      id: "q-alg-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does a determinant of 0 for a square matrix indicate?",
      options: [
        "The matrix is the identity matrix",
        "The matrix is singular (not invertible) and its columns are linearly dependent",
        "The matrix has all positive eigenvalues",
        "The matrix represents a rotation transformation",
      ],
      correctAnswer: 1,
      explanation:
        "A zero determinant means the matrix is singular: its columns are linearly dependent, it maps ℝⁿ to a lower-dimensional subspace (volume collapses to zero), and it has no inverse.",
      hints: [
        'The determinant measures the "volume scaling factor" of the transformation.',
        "If two rows are identical, what happens to the determinant?",
      ],
    },
    {
      id: "q-alg-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The determinant of the product of two matrices equals the product of their determinants: det(AB) = det(A)·det(B).",
      correctAnswer: "true",
      explanation:
        "The multiplicative property of determinants (det(AB) = det(A)·det(B)) holds for square matrices of the same size and reflects the fact that volume scaling factors compose multiplicatively.",
      hints: [
        "Think geometrically: if A scales volume by a factor and B scales by b, what does AB scale by?",
        "This property is used to prove that det(A⁻¹) = 1/det(A).",
      ],
    },
    {
      id: "q-alg-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A 2×2 matrix with columns [2, 0] and [0, 3] has determinant 6. What is the geometric interpretation?",
      options: [
        "The matrix rotates all vectors by 6 degrees",
        "The transformation scales area by a factor of 6 (a unit square maps to a rectangle of area 6)",
        "The matrix has 6 nonzero entries",
        "The sum of all eigenvalues is 6",
      ],
      correctAnswer: 1,
      explanation:
        "The determinant equals the signed area scaling factor of the linear transformation; this diagonal matrix stretches by 2 in x and 3 in y, scaling all areas by 2×3 = 6.",
      hints: [
        "The unit square with corners at (0,0), (1,0), (0,1), (1,1) — where do its corners map?",
        "What is the area of the parallelogram formed by the two column vectors?",
      ],
    },
  ],

  "rank-nullity": [
    {
      id: "q-alg-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "For a matrix A of size m × n, the rank-nullity theorem states:",
      options: [
        "rank(A) + nullity(A) = m",
        "rank(A) + nullity(A) = n",
        "rank(A) × nullity(A) = mn",
        "rank(A) = nullity(A) for all square matrices",
      ],
      correctAnswer: 1,
      explanation:
        "The rank-nullity theorem states rank(A) + nullity(A) = n, the number of columns; this reflects the fact that dimensions of the column space and null space partition the input dimension n.",
      hints: [
        "Rank is the dimension of the column space (output); nullity is the dimension of the null space (inputs mapped to zero).",
        'The theorem accounts for all n input dimensions: some produce output (rank), some are "lost" (nullity).',
      ],
    },
    {
      id: "q-alg-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "If a linear system Ax = b has a unique solution, then the null space of A contains only the zero vector.",
      correctAnswer: "true",
      explanation:
        "Unique solution means nullity(A) = 0 (trivial null space); if any nonzero vector x₀ were in the null space, then both x* and x* + x₀ would be solutions, contradicting uniqueness.",
      hints: [
        "If Ax = b has solution x*, and Ax₀ = 0, then what is A(x* + x₀)?",
        "Uniqueness of solution is equivalent to the transformation being injective (one-to-one).",
      ],
    },
    {
      id: "q-alg-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A 5 × 8 matrix A has rank 3. What are the dimensions of its null space and column space?",
      options: [
        "Null space: dimension 3, Column space: dimension 5",
        "Null space: dimension 5, Column space: dimension 3",
        "Null space: dimension 5, Column space: dimension 8",
        "Null space: dimension 5 (8 − 3), Column space: dimension 3",
      ],
      correctAnswer: 3,
      explanation:
        "By rank-nullity: nullity = n − rank = 8 − 3 = 5; the column space has dimension equal to rank = 3. The column space lives in ℝ⁵ (5 rows) but has dimension 3.",
      hints: [
        "Apply rank-nullity: nullity = n − rank where n is the number of columns (8).",
        "The column space dimension equals the rank; it lives in the output space ℝᵐ.",
      ],
    },
  ],

  orthogonality: [
    {
      id: "q-alg-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The orthogonal projection of vector b onto the line spanned by vector a is:",
      options: ["a × b (cross product)", "(aᵀb / aᵀa) · a", "b − a", "aᵀb"],
      correctAnswer: 1,
      explanation:
        "The projection of b onto a is p = (aᵀb / aᵀa)·a; the scalar (aᵀb / aᵀa) gives the signed length along a, and multiplying by a gives the vector projection.",
      hints: [
        "The projection must lie on the line spanned by a, so it has the form λa for some scalar λ.",
        "The error b − p must be orthogonal to a: aᵀ(b − λa) = 0.",
      ],
    },
    {
      id: "q-alg-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Gram-Schmidt process takes any set of linearly independent vectors and produces an orthonormal set spanning the same subspace.",
      correctAnswer: "true",
      explanation:
        "Gram-Schmidt iteratively projects out the components of each vector along previously processed vectors, producing an orthonormal basis for the same subspace as the original vectors.",
      hints: [
        "At each step, subtract the projection onto all previous orthonormal vectors, then normalize.",
        "The span does not change because each new vector is a linear combination of original vectors.",
      ],
    },
    {
      id: "q-alg-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For an orthogonal matrix Q (QᵀQ = I), which property holds?",
      options: [
        "Q is always symmetric",
        "Q preserves vector lengths and angles (det(Q) = ±1)",
        "Q has all eigenvalues equal to 1",
        "Q is always a rotation matrix with det(Q) = +1",
      ],
      correctAnswer: 1,
      explanation:
        "Orthogonal matrices preserve inner products (and thus lengths and angles) because ‖Qu‖² = uᵀQᵀQu = uᵀu; det(Q) = ±1 because det(QᵀQ) = det(I) = 1.",
      hints: [
        "Use the definition QᵀQ = I to compute ‖Qu‖².",
        "det(Q)² = det(QᵀQ) = det(I) = 1 — what does that imply about det(Q)?",
      ],
    },
  ],

  "least-squares": [
    {
      id: "q-alg-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The least squares solution to an overdetermined system Ax = b (more equations than unknowns) minimizes:",
      options: ["‖Ax‖²", "‖Ax − b‖²", "‖x‖²", "‖A‖²"],
      correctAnswer: 1,
      explanation:
        "Least squares finds x̂ that minimizes the sum of squared residuals ‖Ax − b‖², which is the squared distance between the projection of b onto the column space of A and b itself.",
      hints: [
        "The system Ax = b has no exact solution when b is not in the column space of A.",
        'We want x such that Ax is as close as possible to b — "close" measured by what norm?',
      ],
    },
    {
      id: "q-alg-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The normal equations AᵀAx = Aᵀb always have a unique solution regardless of the rank of A.",
      correctAnswer: "false",
      explanation:
        "If A has linearly dependent columns (rank-deficient), then AᵀA is also singular and the normal equations have infinitely many solutions; the minimum-norm solution is found using the pseudoinverse.",
      hints: [
        "AᵀA is invertible if and only if A has full column rank.",
        "What happens to the normal equations when two columns of A are identical?",
      ],
    },
    {
      id: "q-alg-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Moore-Penrose pseudoinverse A⁺ satisfies which property when A has full column rank?",
      options: ["A⁺ = A", "A⁺ = (AᵀA)⁻¹Aᵀ", "A⁺ = Aᵀ(AAᵀ)⁻¹", "A⁺A⁺ = I"],
      correctAnswer: 1,
      explanation:
        "When A has full column rank, (AᵀA) is invertible and the pseudoinverse simplifies to (AᵀA)⁻¹Aᵀ, which is the left inverse satisfying A⁺A = I and giving the least squares solution x̂ = A⁺b.",
      hints: [
        "Full column rank means n ≤ m and the columns are linearly independent.",
        "The least squares solution x̂ = (AᵀA)⁻¹Aᵀb — what is (AᵀA)⁻¹Aᵀ?",
      ],
    },
  ],

  eigendecomposition: [
    {
      id: "q-alg-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "An eigenvalue λ and eigenvector v of matrix A satisfy:",
      options: ["Av = 0", "Av = λv", "Av = vλv", "A + λ = v"],
      correctAnswer: 1,
      explanation:
        "By definition, v is an eigenvector of A with eigenvalue λ if Av = λv; multiplying A by v only scales v by λ without changing its direction.",
      hints: [
        "An eigenvector is a special direction that the matrix only scales, not rotates.",
        'The prefix "eigen" (German for "own" or "characteristic") hints at a self-referential scaling property.',
      ],
    },
    {
      id: "q-alg-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Every square matrix has a complete set of n linearly independent eigenvectors.",
      correctAnswer: "false",
      explanation:
        "Defective matrices (e.g., a 2×2 Jordan block) have repeated eigenvalues with fewer linearly independent eigenvectors than the matrix dimension and cannot be diagonalized.",
      hints: [
        "Consider the matrix [[1,1],[0,1]]: what are its eigenvalues and how many independent eigenvectors does it have?",
        "Diagonalizability requires n independent eigenvectors — not all matrices are diagonalizable.",
      ],
    },
    {
      id: "q-alg-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The spectral theorem states that for a real symmetric matrix A, the eigenvectors can be chosen to be:",
      options: [
        "Complex and unit-norm",
        "Real and mutually orthogonal, forming an orthonormal basis for ℝⁿ",
        "Positive and linearly independent only",
        "Identical to the left singular vectors of A",
      ],
      correctAnswer: 1,
      explanation:
        "The spectral theorem guarantees that real symmetric matrices have real eigenvalues and orthonormal eigenvectors, enabling the decomposition A = QΛQᵀ where Q is orthogonal.",
      hints: [
        "Symmetric matrices satisfy A = Aᵀ — use this to show eigenvectors for different eigenvalues are orthogonal.",
        "The spectral theorem is why covariance matrices (symmetric positive semi-definite) have a clean PCA decomposition.",
      ],
    },
  ],

  "svd-deep": [
    {
      id: "q-alg-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In the SVD A = UΣVᵀ of an m × n matrix, the columns of U are:",
      options: [
        "The right singular vectors of A, lying in ℝⁿ",
        "The left singular vectors of A, lying in ℝᵐ, forming an orthonormal basis for ℝᵐ",
        "The eigenvalues of A arranged in a column",
        "The row space basis vectors of A",
      ],
      correctAnswer: 1,
      explanation:
        "U is an m × m orthogonal matrix whose columns (left singular vectors) form an orthonormal basis for ℝᵐ; they are eigenvectors of AAᵀ.",
      hints: [
        "In A = UΣVᵀ, U transforms the output space and V transforms the input space.",
        "Left singular vectors live in the output space ℝᵐ; right singular vectors live in the input space ℝⁿ.",
      ],
    },
    {
      id: "q-alg-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question: "The singular values of any matrix are always non-negative.",
      correctAnswer: "true",
      explanation:
        "Singular values σᵢ are defined as the square roots of the eigenvalues of AᵀA, which is positive semi-definite; therefore singular values are always real and non-negative.",
      hints: [
        "Singular values come from the diagonal of Σ in the SVD.",
        "AᵀA is positive semi-definite by construction — what does that imply about its eigenvalues?",
      ],
    },
    {
      id: "q-alg-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Eckart-Young theorem states that the best rank-k approximation to A (minimizing Frobenius norm error) is:",
      options: [
        "The first k rows of A",
        "Aₖ = Σᵢ₌₁ᵏ σᵢuᵢvᵢᵀ (the truncated SVD using the top k singular triplets)",
        "The k × k submatrix of A with largest entries",
        "A projected onto the first k standard basis vectors",
      ],
      correctAnswer: 1,
      explanation:
        "The Eckart-Young theorem proves that the truncated SVD (keeping the top k singular values) yields the optimal rank-k approximation in both Frobenius and spectral norm, with approximation error equal to σₖ₊₁.",
      hints: [
        "Each rank-1 matrix σᵢuᵢvᵢᵀ captures the most remaining variance when added greedily.",
        "The theorem is the mathematical foundation of PCA and matrix completion methods.",
      ],
    },
  ],

  "matrix-norms": [
    {
      id: "q-alg-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The Frobenius norm of a matrix A is defined as:",
      options: [
        "The largest singular value of A",
        "The square root of the sum of squares of all entries: ‖A‖_F = √(Σᵢⱼ aᵢⱼ²)",
        "The maximum absolute row sum",
        "The trace of A",
      ],
      correctAnswer: 1,
      explanation:
        "The Frobenius norm treats the matrix as a long vector and computes its L2 norm; equivalently, ‖A‖_F = √(trace(AᵀA)) = √(Σ σᵢ²) where σᵢ are singular values.",
      hints: [
        'Think of "flattening" the matrix into a vector and computing the usual Euclidean length.',
        "The Frobenius norm can also be expressed in terms of singular values.",
      ],
    },
    {
      id: "q-alg-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The spectral norm (operator 2-norm) of a matrix equals its largest singular value.",
      correctAnswer: "true",
      explanation:
        "‖A‖₂ = max_{‖x‖=1} ‖Ax‖ = σ₁ (the largest singular value), representing the maximum stretch any unit vector undergoes under multiplication by A.",
      hints: [
        "The operator norm measures how much A can stretch a vector.",
        "The direction of maximum stretch corresponds to the first right singular vector v₁.",
      ],
    },
    {
      id: "q-alg-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The condition number of a matrix A is defined as κ(A) = σ_max / σ_min. A large condition number indicates:",
      options: [
        "The matrix is orthogonal and well-behaved",
        "The matrix is nearly singular and small perturbations in b can cause large changes in the solution x to Ax = b",
        "The matrix has many zero entries",
        "The matrix has large eigenvalues that accelerate gradient descent",
      ],
      correctAnswer: 1,
      explanation:
        "A large condition number means the matrix is nearly rank-deficient; the relative error in the solution is amplified by κ(A) relative to the relative error in b, making the linear system numerically ill-conditioned.",
      hints: [
        "Condition number measures the ratio of maximum to minimum stretching; nearly singular matrices stretch some directions enormously relative to others.",
        "Think about what happens when σ_min ≈ 0 — what does the ratio σ_max/σ_min become?",
      ],
    },
  ],

  "positive-definite": [
    {
      id: "q-alg-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A symmetric matrix $A$ is positive definite if and only if:",
      options: [
        "All entries of $A$ are positive",
        "$\\mathbf{x}^T A \\mathbf{x} > 0$ for all nonzero vectors $\\mathbf{x}$",
        "All diagonal entries of $A$ are positive",
        "The trace of $A$ is positive",
        "All eigenvalues of $A$ are non-negative",
      ],
      correctAnswer: 1,
      explanation: `First, let\'s recall what a symmetric matrix is: a matrix where $A = A^T$.

The defining property of positive definiteness involves the **quadratic form** $\\mathbf{x}^T A \\mathbf{x}$.

For any vector $\\mathbf{x} = \\begin{pmatrix} x_1 \\\\ x_2 \\\\ \\vdots \\\\ x_n \\end{pmatrix}$, the quantity $\\mathbf{x}^T A \\mathbf{x}$ is a scalar.

**Step 1:** A symmetric matrix $A$ is **positive definite** if and only if:
$$\\mathbf{x}^T A \\mathbf{x} > 0 \\text{ for all } \\mathbf{x} \\neq \\mathbf{0}$$

**Step 2:** This is NOT equivalent to:
- All entries being positive (a matrix can have all positive entries but not be PD)
- Diagonal entries being positive (necessary but not sufficient)
- Trace being positive (only means sum of eigenvalues is positive)

**Step 3:** An equivalent characterization: all eigenvalues of $A$ are strictly positive ($\\lambda_i > 0$ for all $i$).

**Why the other options are wrong:**
- Option 0: Counterexample: $\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$ has all positive entries but determinant $= -3 < 0$, so not PD.
- Option 2: Necessary but not sufficient: $\\begin{pmatrix} 1 & 10 \\\\ 10 & 1 \\end{pmatrix}$ has positive diagonal but is not PD.
- Option 3: $\\text{tr}(A) > 0$ only means $\\sum \\lambda_i > 0$, but PD requires each $\\lambda_i > 0$.
- Option 4: "Non-negative" eigenvalues would make it **positive semi-definite**, not positive definite.

Therefore, $\\boxed{\\mathbf{x}^T A \\mathbf{x} > 0 \\text{ for all nonzero } \\mathbf{x}}$ is the correct characterization.`,
      hints: [
        "The definition is about the quadratic form, not individual entries.",
        "A diagonal matrix is PD iff all diagonal entries are positive — but this generalizes via the quadratic form.",
      ],
    },
    {
      id: "q-alg-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Cholesky decomposition $A = LL^T$ exists for any symmetric positive definite matrix.",
      correctAnswer: "true",
      explanation: `First, let\'s recall what the Cholesky decomposition claims.

For a symmetric positive definite matrix $A$, we seek a lower triangular matrix $L$ such that:
$$A = LL^T$$

**Step 1: Existence by induction.**

For a $1 \\times 1$ matrix $A = [a_{11}]$: Since $A$ is PD, we have $a_{11} > 0$. Set $L = [\\sqrt{a_{11}}]$.

**Step 2: Inductive step.**

Write $A = \\begin{pmatrix} a_{11} & \\mathbf{b}^T \\\\ \\mathbf{b} & C \\end{pmatrix}$ where $C$ is $(n-1) \\times (n-1)$.

Since $A$ is PD: $a_{11} > 0$ and the Schur complement $C - \\frac{1}{a_{11}}\\mathbf{b}\\mathbf{b}^T$ is also PD.

By induction hypothesis, this Schur complement has a Cholesky factorization.

**Step 3: Uniqueness.**

The factor $L$ is unique when we require positive diagonal entries.

**Step 4: Computational advantage.**

Cholesky requires $\\frac{n^3}{3}$ operations vs. $\\frac{2n^3}{3}$ for LU — a factor of 2 savings.

Therefore, $\\boxed{\\text{True}}$ — every symmetric PD matrix has a unique Cholesky decomposition with $L$ having positive diagonal entries.`,
      hints: [
        "The proof proceeds by induction on matrix size, using the positive definiteness at each step.",
        "Cholesky requires half the operations of LU decomposition for symmetric systems.",
      ],
    },
    {
      id: "q-alg-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why are covariance matrices always positive semi-definite (PSD)?",
      options: [
        "Because all their entries are non-negative probabilities",
        "Because $\\Sigma = \\mathbb{E}_{\\mathbf{x}}[(\\mathbf{x} - \\boldsymbol{\\mu})(\\mathbf{x} - \\boldsymbol{\\mu})^T]$ and for any $\\mathbf{v}$: $\\mathbf{v}^T \\Sigma \\mathbf{v} = \\mathbb{E}[\\| (\\mathbf{x} - \\boldsymbol{\\mu})^T \\mathbf{v}\\|^2] \\geq 0$",
        "Because they are computed using only positive data values",
        "Because their eigenvalues are bounded by the variance of the data",
        "Because covariance matrices are always diagonal with non-negative entries",
      ],
      correctAnswer: 1,
      explanation: `First, let\'s recall the definition of a covariance matrix.

For a random vector $\\mathbf{x}$ with mean $\\boldsymbol{\\mu} = \\mathbb{E}[\\mathbf{x}]$, the covariance matrix is:
$$\\Sigma = \\mathbb{E}[(\\mathbf{x} - \\boldsymbol{\\mu})(\\mathbf{x} - \\boldsymbol{\\mu})^T]$$

**Step 1: Test the quadratic form.**

To prove $\\Sigma$ is PSD, we need to show $\\mathbf{v}^T \\Sigma \\mathbf{v} \\geq 0$ for any vector $\\mathbf{v}$.

**Step 2: Expand the quadratic form.**

$$\\mathbf{v}^T \\Sigma \\mathbf{v} = \\mathbf{v}^T \\mathbb{E}[(\\mathbf{x} - \\boldsymbol{\\mu})(\\mathbf{x} - \\boldsymbol{\\mu})^T] \\mathbf{v}$$

Since expectation is linear, we can bring $\\mathbf{v}$ inside:
$$= \\mathbb{E}[\\mathbf{v}^T (\\mathbf{x} - \\boldsymbol{\\mu})(\\mathbf{x} - \\boldsymbol{\\mu})^T \\mathbf{v}]$$

**Step 3: Recognize this as a squared scalar.**

Note that $\\mathbf{v}^T (\\mathbf{x} - \\boldsymbol{\\mu})$ is a scalar, and for any scalar $s$:
$$s \\cdot s = s^2$$

So:
$$\\mathbf{v}^T \\Sigma \\mathbf{v} = \\mathbb{E}[(\\mathbf{v}^T (\\mathbf{x} - \\boldsymbol{\\mu}))^2]$$

**Step 4: The key insight.**

The quantity $(\\mathbf{v}^T (\\mathbf{x} - \\boldsymbol{\\mu}))^2$ is a **squared real number**, which is always $\\geq 0$.

Since the expectation of a non-negative quantity is non-negative:
$$\\mathbb{E}[(\\mathbf{v}^T (\\mathbf{x} - \\boldsymbol{\\mu}))^2] \\geq 0$$

Therefore, $\\boxed{\\mathbf{v}^T \\Sigma \\mathbf{v} \\geq 0}$ for all $\\mathbf{v}$, proving $\\Sigma$ is PSD.

**Why the other options are wrong:**
- Option 0: Covariance entries can be negative! Covariance of negatively correlated variables is negative.
- Option 2: Data values don\'t need to be positive — covariance is about deviations from the mean.
- Option 3: This doesn\'t explain PSD; eigenvalues of PSD matrices are $\\geq 0$, but this is a consequence, not a cause.
- Option 4: Covariance matrices are generally NOT diagonal unless variables are uncorrelated.`,
      hints: [
        "Write out $\\mathbf{v}^T \\Sigma \\mathbf{v}$ explicitly and recognize it as an expectation of a squared scalar.",
        "A squared real number is always non-negative — how does that imply PSD?",
      ],
    },
  ],

  "sparse-matrices": [
    {
      id: "q-alg-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The CSR (Compressed Sparse Row) format stores a sparse matrix using three arrays. What do they store?",
      options: [
        "Row indices, column indices, and values of nonzero entries in dense format",
        "Nonzero values, their column indices, and row pointer offsets into the values array",
        "The full matrix, a mask matrix, and the sparsity pattern",
        "Eigenvalues, eigenvectors, and diagonal entries",
      ],
      correctAnswer: 1,
      explanation:
        "CSR stores (1) a values array of nonzeros, (2) a column indices array, and (3) a row pointer array indicating where each row\'s nonzeros start in the values array — enabling O(1) row access.",
      hints: [
        "Think about what the minimum information is needed to reconstruct where each nonzero lives.",
        "CSR is optimized for efficient row-wise operations like sparse matrix-vector products.",
      ],
    },
    {
      id: "q-alg-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Multiplying two dense n × n matrices always requires O(n³) operations, but sparse matrix-vector multiplication can be done in O(nnz) where nnz is the number of nonzeros.",
      correctAnswer: "true",
      explanation:
        "Sparse matrix-vector multiplication (SpMV) only touches the nnz nonzero entries, achieving O(nnz) complexity; for sparse matrices where nnz ≪ n², this is far more efficient than O(n²) dense multiplication.",
      hints: [
        "In y = Ax, each output entry yᵢ is a dot product of row i of A with x — if row i has only k nonzeros, it takes k operations.",
        "Note the question compares dense matmul (O(n³)) with sparse matrix-vector product (O(nnz)).",
      ],
    },
    {
      id: "q-alg-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In iterative sparse solvers like Conjugate Gradient, the dominant operation is sparse matrix-vector multiplication. The key bottleneck on modern hardware is:",
      options: [
        "Floating point arithmetic speed (FLOPS)",
        "Memory bandwidth — sparse access patterns cause poor cache utilization",
        "Integer overflow in index arrays",
        "Network latency in distributed systems",
      ],
      correctAnswer: 1,
      explanation:
        "SpMV on real hardware is memory-bandwidth-limited, not compute-limited: irregular memory access patterns (due to sparse structure) cause cache misses, leaving arithmetic units idle — achieving only 5-15% of peak FLOPS.",
      hints: [
        "Modern CPUs/GPUs can perform many more FLOPS per second than they can load bytes from memory per second.",
        "Random memory access patterns (sparse rows with scattered column indices) do not benefit from spatial locality.",
      ],
    },
  ],

  "kronecker-products": [
    {
      id: "q-alg-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Kronecker product A ⊗ B where A is m × n and B is p × q produces a matrix of size:",
      options: ["m × n", "mp × nq", "(m + p) × (n + q)", "mp × pq"],
      correctAnswer: 1,
      explanation:
        "A ⊗ B replaces each entry aᵢⱼ of A with the block aᵢⱼ·B; with A of size m × n and B of size p × q, the result is an (mp) × (nq) block matrix.",
      hints: [
        "Each of the mn entries of A becomes a p × q block.",
        "Think about the resulting matrix as an m × n grid of p × q blocks.",
      ],
    },
    {
      id: "q-alg-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Kronecker product is commutative: A ⊗ B = B ⊗ A for all matrices A and B.",
      correctAnswer: "false",
      explanation:
        "The Kronecker product is not commutative in general; A ⊗ B and B ⊗ A have the same eigenvalues but different block structures and are related by permutation matrices (they are permutation-similar, not equal).",
      hints: [
        "Try a simple example: A = [[1,0],[0,0]] and B = [[0,1],[0,0]] — compute A⊗B and B⊗A.",
        "Even the sizes of A⊗B and B⊗A can differ if A and B are not square.",
      ],
    },
    {
      id: "q-alg-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Kronecker products appear in neural networks in which context?",
      options: [
        "Computing softmax activations efficiently",
        "Structured weight matrix compression (K-FAC, Kronecker factorization of layer weights and their Fisher information)",
        "Backpropagation through ReLU layers",
        "Computing batch normalization statistics",
      ],
      correctAnswer: 1,
      explanation:
        "K-FAC (Kronecker-Factored Approximate Curvature) approximates the Fisher information matrix as a Kronecker product of smaller matrices, enabling computationally feasible natural gradient updates for neural network training.",
      hints: [
        "The Fisher information matrix for a neural network layer has a natural Kronecker structure related to its inputs and outputs.",
        "Kronecker factorization turns an O(n⁴) matrix into a product of two O(n²) matrices.",
      ],
    },
  ],

  "matrix-calculus": [
    {
      id: "q-alg-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "If f(x) = aᵀx where a and x are n-dimensional vectors, then ∂f/∂x equals:",
      options: ["xᵀ", "a", "aᵀ", "1"],
      correctAnswer: 1,
      explanation:
        "For f(x) = aᵀx = Σᵢ aᵢxᵢ, the partial derivative ∂f/∂xᵢ = aᵢ, so the gradient vector ∂f/∂x = a (using the numerator layout / column vector convention).",
      hints: [
        "Differentiate aᵀx = a₁x₁ + a₂x₂ + ... + aₙxₙ with respect to each xᵢ.",
        "The gradient of a linear function aᵀx is simply the coefficient vector a.",
      ],
    },
    {
      id: "q-alg-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Jacobian matrix of a vector-valued function f: ℝⁿ → ℝᵐ is an m × n matrix.",
      correctAnswer: "true",
      explanation:
        "The Jacobian J has entry Jᵢⱼ = ∂fᵢ/∂xⱼ; with m output components and n input variables, J is an m × n matrix encoding all first-order partial derivatives.",
      hints: [
        "The Jacobian generalizes the gradient to vector-valued functions.",
        "Count rows (output dimension m) and columns (input dimension n) from the definition Jᵢⱼ = ∂fᵢ/∂xⱼ.",
      ],
    },
    {
      id: "q-alg-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The gradient of the quadratic form f(x) = xᵀAx with respect to x (where A is symmetric) is:",
      options: ["Ax", "2Ax", "AᵀAx", "xᵀA"],
      correctAnswer: 1,
      explanation:
        "For symmetric A, ∂(xᵀAx)/∂x = 2Ax; the factor of 2 arises from the sum rule applied to (xᵀAx = xᵀAx), and symmetry collapses Aᵀ + A = 2A.",
      hints: [
        "Write out xᵀAx = Σᵢⱼ xᵢAᵢⱼxⱼ and differentiate with respect to xₖ.",
        "Without symmetry the answer would be (A + Aᵀ)x; symmetry gives 2Ax.",
      ],
    },
  ],

  "low-rank-approx": [
    {
      id: "q-alg-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Truncated SVD retains only the top k singular values and vectors. The approximation error in Frobenius norm is:",
      options: [
        "√(σ₁² + σ₂² + ... + σₖ²)",
        "√(σₖ₊₁² + σₖ₊₂² + ... + σᵣ²)",
        "σₖ₊₁ alone",
        "‖A‖_F / k",
      ],
      correctAnswer: 1,
      explanation:
        "Since the Frobenius norm equals √(Σᵢ σᵢ²), removing the bottom r−k singular values leaves error √(Σᵢ₌ₖ₊₁ʳ σᵢ²), i.e., the Frobenius norm of the discarded components.",
      hints: [
        "The full SVD satisfies ‖A‖_F² = Σᵢ σᵢ²; what remains after keeping only the top k?",
        "The Eckart-Young theorem tells you the error is determined by the discarded singular values.",
      ],
    },
    {
      id: "q-alg-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Low-rank matrix approximation is used in recommendation systems to find latent user and item factors in matrix factorization.",
      correctAnswer: "true",
      explanation:
        "Collaborative filtering via matrix factorization decomposes the user-item rating matrix into low-rank user (U) and item (V) factor matrices, finding latent representations that capture preferences with far fewer parameters than the full matrix.",
      hints: [
        "A user-item matrix of 1M users × 500K items has 500B entries; a rank-50 factorization needs only 75M parameters.",
        "Netflix Prize was famously won using low-rank matrix factorization techniques.",
      ],
    },
    {
      id: "q-alg-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Randomized SVD (e.g., Halko et al.) achieves a near-optimal rank-k approximation much faster than full SVD. Its key idea is:",
      options: [
        "Using gradient descent instead of eigen-decomposition",
        "Projecting A onto a random low-dimensional subspace to form a sketch, then computing SVD of the small sketch",
        "Randomly sampling rows and columns of A to form a submatrix",
        "Approximating singular values using the power method only",
      ],
      correctAnswer: 1,
      explanation:
        "Randomized SVD forms a random sketch Y = AΩ (where Ω is a random Gaussian matrix), orthogonalizes it, and computes an exact SVD of the small projected matrix — achieving near-optimal approximation in O(mnk) instead of O(mn²) time.",
      hints: [
        "The sketch Y = AΩ has only k columns, making its SVD cheap to compute exactly.",
        "Random projections (by the Johnson-Lindenstrauss lemma) approximately preserve geometry with high probability.",
      ],
    },
  ],

  "random-matrices": [
    {
      id: "q-alg-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Marchenko-Pastur law describes the limiting spectral distribution of:",
      options: [
        "Eigenvalues of deterministic diagonal matrices",
        "Singular values of large random matrices (e.g., sample covariance matrices from Gaussian data)",
        "Eigenvalues of graph adjacency matrices",
        "Condition numbers of Vandermonde matrices",
      ],
      correctAnswer: 1,
      explanation:
        'The Marchenko-Pastur law gives the limiting distribution of eigenvalues of sample covariance matrices (1/n XᵀX) as dimensions grow proportionally, separating "signal" eigenvalues from the bulk noise distribution.',
      hints: [
        "In ML, the Marchenko-Pastur law helps identify which PCA components carry real signal vs. noise.",
        "Think about what happens to sample covariance eigenvalues as n, p → ∞ with p/n → γ.",
      ],
    },
    {
      id: "q-alg-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Random matrix theory predicts that the largest eigenvalue of a Gaussian random matrix follows the Tracy-Widom distribution.",
      correctAnswer: "true",
      explanation:
        "The Tracy-Widom distribution describes the fluctuations of the largest eigenvalue of random Hermitian matrices (GUE/GOE), and has applications in testing for the number of significant components in PCA.",
      hints: [
        "Tracy-Widom appears when the largest eigenvalue of a random matrix is analyzed after centering and scaling.",
        "This distribution has been used to test whether a PCA component is real signal or random noise.",
      ],
    },
    {
      id: "q-alg-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Random matrix theory insights are applied in deep learning to understand which phenomenon?",
      options: [
        "Why dropout prevents overfitting by adding noise to activations",
        "The bulk spectral distribution of weight matrices in trained networks and its connection to implicit regularization",
        "Why the Adam optimizer converges faster than SGD",
        "How batch size affects gradient variance during training",
      ],
      correctAnswer: 1,
      explanation:
        'RMT tools (e.g., Martin & Mahoney\'s heavy-tail self-regularization theory) analyze the eigenspectrum of trained weight matrices to diagnose overfitting and generalization, finding that well-trained layers have "heavy-tail" eigenspectra deviating from random matrix predictions.',
      hints: [
        "If a weight matrix looked like a random matrix, the network would not have learned anything.",
        "Deviations from Marchenko-Pastur bulk distribution indicate signal vs. noise in weight matrices.",
      ],
    },
  ],

  "pca-deep": [
    {
      id: "q-alg-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "PCA finds principal components that maximize:",
      options: [
        "The reconstruction error of the data",
        "The variance of the projected data",
        "The pairwise distances between data points",
        "The log-likelihood of a Gaussian model",
      ],
      correctAnswer: 1,
      explanation:
        "PCA seeks orthogonal directions (principal components) that capture maximum variance in the data; the first PC is the direction of maximum variance, the second is orthogonal to it with second-most variance, etc.",
      hints: [
        "Think about which projection direction would spread data points out the most.",
        "Maximum variance projection corresponds to the eigenvector with the largest eigenvalue of the covariance matrix.",
      ],
    },
    {
      id: "q-alg-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PCA via eigendecomposition of the covariance matrix and PCA via SVD of the centered data matrix always produce the same principal components.",
      correctAnswer: "true",
      explanation:
        "If X̃ is the centered data matrix, then X̃ᵀX̃/n is the sample covariance; the right singular vectors of X̃ equal the eigenvectors of X̃ᵀX̃, so both approaches yield identical principal components.",
      hints: [
        "The right singular vectors of X̃ are eigenvectors of X̃ᵀX̃ — what matrix is that?",
        "SVD of data is numerically more stable than eigendecomposition of the covariance (avoids squaring the condition number).",
      ],
    },
    {
      id: "q-alg-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "explained variance ratio" of the k-th principal component is:',
      options: [
        "σₖ / (σ₁ + σ₂ + ... + σᵣ) where σᵢ are singular values",
        "λₖ / (λ₁ + λ₂ + ... + λᵣ) where λᵢ are eigenvalues of the covariance matrix",
        "k / total number of features",
        "vₖᵀvₖ where vₖ is the k-th principal component vector",
      ],
      correctAnswer: 1,
      explanation:
        "Each eigenvalue λₖ of the covariance matrix equals the variance captured by the k-th principal component; its share of total variance is λₖ / Σᵢ λᵢ = σₖ² / Σᵢ σᵢ² (using singular values of centered data).",
      hints: [
        "Total variance is trace(covariance) = sum of all eigenvalues.",
        "The explained variance ratio tells you what fraction of the total data spread is captured by PC k.",
      ],
    },
  ],

  ica: [
    {
      id: "q-alg-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "ICA assumes that the observed signals x are linear mixtures of independent source signals s. Its key assumption that PCA does NOT make is:",
      options: [
        "The number of sources equals the number of observations",
        "The source signals are statistically independent and non-Gaussian",
        "The mixing matrix is orthogonal",
        "The signals are zero-mean",
      ],
      correctAnswer: 1,
      explanation:
        "ICA exploits statistical independence (higher-order statistics) and non-Gaussianity of sources to separate them; PCA only uses second-order statistics (covariance) and produces uncorrelated (not independent) components.",
      hints: [
        "Uncorrelated (PCA) vs. statistically independent (ICA) — which is a stronger condition?",
        "The central limit theorem hints why Gaussianity must be avoided: mixtures of non-Gaussian signals become more Gaussian.",
      ],
    },
    {
      id: "q-alg-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ICA can recover the true sources up to arbitrary scaling and permutation of the recovered components.",
      correctAnswer: "true",
      explanation:
        "ICA is identifiable only up to permutation (which source is which) and scaling (sign and magnitude of each source), because these transformations preserve statistical independence — these are the fundamental ambiguities of ICA.",
      hints: [
        "If you swap two sources, are they still independent? If you scale one, does it change independence?",
        "These ambiguities do not affect the practical utility of ICA for blind source separation.",
      ],
    },
    {
      id: "q-alg-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FastICA maximizes non-Gaussianity of the recovered sources using which surrogate measure?",
      options: [
        "The variance of the recovered component",
        "Negentropy (approximated by kurtosis or log-cosh contrast functions)",
        "The correlation between recovered components",
        "The L1 norm of the mixing matrix",
      ],
      correctAnswer: 1,
      explanation:
        "FastICA maximizes negentropy (deviation from Gaussianity) using fixed-point iterations; practical implementations use smooth approximations like log-cosh or tanh as contrast functions, chosen for robustness to outliers.",
      hints: [
        "The central limit theorem implies that mixtures of random variables approach Gaussian — so maximizing non-Gaussianity unmixes them.",
        'Kurtosis measures the "tailedness" of a distribution; negentropy is a more robust measure of the same concept.',
      ],
    },
  ],

  "nonneg-factorization": [
    {
      id: "q-alg-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "NMF factors a non-negative matrix V ≈ WH where W and H are constrained to have:",
      options: [
        "Orthogonal columns and rows respectively",
        "All non-negative entries",
        "Unit Frobenius norm",
        "Sparse entries with at most k nonzeros per column",
      ],
      correctAnswer: 1,
      explanation:
        "NMF imposes non-negativity on both factor matrices W (basis vectors) and H (activations), ensuring that the reconstruction is purely additive — no cancellation between components, unlike SVD or PCA.",
      hints: [
        'NMF is motivated by applications like image decomposition where "negative pixels" are meaningless.',
        "The non-negativity constraint makes NMF produce parts-based representations.",
      ],
    },
    {
      id: "q-alg-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Unlike SVD, NMF does not have a unique global solution in general — it is a non-convex optimization problem.",
      correctAnswer: "true",
      explanation:
        "NMF minimizes a non-convex objective (e.g., Frobenius norm of V − WH) subject to non-negativity constraints; it has multiple local minima and no closed-form solution, requiring iterative algorithms like multiplicative update rules.",
      hints: [
        "SVD has a unique solution (up to sign) given by the spectral decomposition; NMF lacks this uniqueness.",
        "Think about what makes an optimization landscape non-convex and how many local minima can exist.",
      ],
    },
    {
      id: "q-alg-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "NMF is particularly well-suited for which type of data compared to PCA?",
      options: [
        "Continuous real-valued data with negative measurements",
        "Count data or pixel intensities where parts-based, additive decompositions are meaningful",
        "Data with Gaussian noise where maximum likelihood estimation is needed",
        "Time series with periodic components requiring frequency decomposition",
      ],
      correctAnswer: 1,
      explanation:
        'NMF produces parts-based representations (e.g., facial parts, document topics) naturally suited to non-negative data like pixel intensities, word counts, or spectrograms — domains where negative "anti-features" are uninterpretable.',
      hints: [
        "Lee & Seung\'s 1999 paper showed NMF learns face parts (eyes, nose, mouth) while PCA learns global eigenvectors.",
        "Think about topic modeling: document = weighted sum of topics (all non-negative).",
      ],
    },
  ],

  "tensor-decompositions": [
    {
      id: "q-alg-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The CP (CANDECOMP/PARAFAC) decomposition expresses a tensor as:",
      options: [
        "A product of two matrices analogous to SVD",
        "A sum of rank-1 outer products: T ≈ Σᵣ aᵣ ⊗ bᵣ ⊗ cᵣ",
        "A Tucker decomposition with orthogonal factor matrices",
        "A Kronecker product of smaller tensors",
      ],
      correctAnswer: 1,
      explanation:
        "CP decomposes a tensor as a sum of rank-1 tensors (outer products), generalizing matrix factorization; the minimum number of rank-1 components needed is the tensor rank.",
      hints: [
        'Think of CP as the tensor analog of SVD: a sum of outer product "atoms."',
        "For a matrix, a rank-1 outer product is uvᵀ; for a 3-way tensor, it is u ⊗ v ⊗ w.",
      ],
    },
    {
      id: "q-alg-kp19-2",
      type: "true-false",
      difficulty: "hard",
      question:
        "Tensor rank is computationally easy to determine, just like matrix rank which can be found via Gaussian elimination.",
      correctAnswer: "false",
      explanation:
        "Computing tensor rank is NP-hard in general; unlike matrix rank which has efficient algorithms (Gaussian elimination, SVD), there is no efficient algorithm for computing the rank of a tensor of order ≥ 3.",
      hints: [
        "Matrix rank is well-understood and efficiently computable — do the same algorithms extend to tensors?",
        "The difficulty of tensor rank is related to why tensor decomposition problems are harder than matrix problems.",
      ],
    },
    {
      id: "q-alg-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Tensor decompositions appear in deep learning in which context?",
      options: [
        "Computing cross-entropy loss functions",
        "Compressing convolutional layer weight tensors (4D: out_channels × in_channels × kH × kW) using Tucker or CP decomposition",
        "Implementing attention mechanisms in transformers",
        "Normalizing gradients during backpropagation",
      ],
      correctAnswer: 1,
      explanation:
        "Convolutional filters are 4-way tensors; Tucker decomposition factors them into a core tensor and mode matrices, reducing parameter count and FLOPs while preserving most model accuracy — enabling model compression for edge deployment.",
      hints: [
        "A conv layer with 256 output channels, 128 input channels, and 3×3 kernels has 256×128×3×3 ≈ 300K parameters.",
        "Think about how Tucker decomposition reduces the 4D filter tensor to smaller factor matrices.",
      ],
    },
  ],

  "spectral-clustering": [
    {
      id: "q-alg-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In spectral clustering, the graph Laplacian L is defined as:",
      options: [
        "L = A (the adjacency matrix)",
        "L = D − A where D is the degree matrix and A is the adjacency matrix",
        "L = A + D",
        "L = A · D⁻¹",
      ],
      correctAnswer: 1,
      explanation:
        "The unnormalized graph Laplacian L = D − A encodes the graph structure; it is positive semi-definite with the number of zero eigenvalues equaling the number of connected components.",
      hints: [
        "D is diagonal with Dᵢᵢ = degree of node i; subtracting A from D captures the local structure.",
        "The Laplacian appears in diffusion, heat flow, and spectral clustering of graphs.",
      ],
    },
    {
      id: "q-alg-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The number of zero eigenvalues of the graph Laplacian equals the number of connected components in the graph.",
      correctAnswer: "true",
      explanation:
        "Each connected component contributes one zero eigenvalue to L (with corresponding eigenvector being the indicator vector of that component); this is the Fiedler theorem used in spectral graph theory.",
      hints: [
        "The all-ones vector restricted to a connected component is in the null space of L.",
        'Two zero eigenvalues would mean two independent "flat" directions — what does that imply about graph structure?',
      ],
    },
    {
      id: "q-alg-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Spectral clustering applies k-means to the eigenvectors of the graph Laplacian rather than to the original features. Why?",
      options: [
        "Eigenvectors are always lower-dimensional than the original features",
        "The Laplacian eigenvectors embed nodes into a space where cluster structure (graph connectivity) is captured by Euclidean proximity, making k-means effective",
        "K-means cannot be applied directly to graph adjacency matrices",
        "Eigenvectors normalize the feature magnitudes to help k-means converge",
      ],
      correctAnswer: 1,
      explanation:
        "The eigenvectors of the Laplacian provide a low-dimensional embedding where nodes in the same cluster (tightly connected subgraph) are close in Euclidean space, enabling k-means to recover graph-based clusters even when original features do not separate linearly.",
      hints: [
        "Think about what the Laplacian eigenvectors represent: smooth functions on the graph.",
        "Two nodes in the same dense subgraph will have similar embeddings in Laplacian eigenspace.",
      ],
    },
  ],

  "linear-algebra-dl": [
    {
      id: "q-alg-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a transformer\'s self-attention, the attention score between query q and key k is computed as:",
      options: [
        "‖q − k‖₂ (Euclidean distance)",
        "qᵀk / √d where d is the key dimension",
        "softmax(q) · softmax(k)",
        "q × k (cross product)",
      ],
      correctAnswer: 1,
      explanation:
        "Scaled dot-product attention computes qᵀk / √d, where the √d scaling prevents dot products from growing large in high dimensions (which would push softmax into saturation regions).",
      hints: [
        "The dot product qᵀk measures alignment between query and key directions.",
        "Without the √d scaling, large dot products lead to very peaked softmax distributions.",
      ],
    },
    {
      id: "q-alg-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Weight matrices in neural networks can be viewed as linear transformations between vector spaces, and their singular value decomposition reveals the effective rank and information bottlenecks of each layer.",
      correctAnswer: "true",
      explanation:
        "Each weight matrix implements a linear transformation; its SVD reveals the effective dimensionality of information flow — layers with rapidly decaying singular values act as low-rank projections and information bottlenecks.",
      hints: [
        "Low-rank adaptation (LoRA) exploits this: it approximates weight updates as low-rank matrices during fine-tuning.",
        "Think about what it means if most singular values of a weight matrix are near zero.",
      ],
    },
    {
      id: "q-alg-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "LoRA (Low-Rank Adaptation) fine-tunes a pre-trained weight matrix W by parameterizing the update as ΔW = BA where B ∈ ℝᵐˣʳ and A ∈ ℝʳˣⁿ with r ≪ min(m,n). The benefit is:",
      options: [
        "LoRA trains faster because the rank r matrices use less VRAM for gradients and optimizer states",
        "LoRA increases the model\'s rank to improve expressiveness",
        "LoRA avoids the need for a learning rate schedule",
        "LoRA replaces attention layers with convolutional layers for efficiency",
      ],
      correctAnswer: 0,
      explanation:
        "LoRA freezes W and only trains B and A; with r ≪ min(m,n), the trainable parameters (mr + rn) are far fewer than mn, drastically reducing optimizer state memory and enabling fine-tuning of large models on consumer GPUs.",
      hints: [
        "Count the parameters in BA vs. the full matrix W = mn entries.",
        "Gradient computation and Adam optimizer states are proportional to the number of trainable parameters.",
      ],
    },
  ],

  "numerical-methods-linalg": [
    {
      id: "q-alg-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "LU decomposition factors A = LU where L is lower triangular and U is upper triangular. Its primary use is:",
      options: [
        "Finding eigenvectors of A",
        "Solving linear systems Ax = b efficiently by forward/back substitution",
        "Computing the SVD of A",
        "Orthogonalizing the columns of A",
      ],
      correctAnswer: 1,
      explanation:
        "Once A = LU, solving Ax = b reduces to Ly = b (forward substitution) then Ux = y (back substitution), each O(n²) — far cheaper than direct inversion which is O(n³) per right-hand side.",
      hints: [
        "LU is computed once; multiple right-hand sides can then be solved cheaply.",
        "Think about the complexity of each triangular solve.",
      ],
    },
    {
      id: "q-alg-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "QR decomposition is preferred over LU for solving least squares problems because Q preserves numerical stability via orthogonal transformations.",
      correctAnswer: "true",
      explanation:
        "QR avoids forming AᵀA (which squares the condition number); orthogonal transformations are numerically stable (condition number 1), making QR the standard for least squares in numerical practice.",
      hints: [
        "Forming AᵀA doubles the condition number in the exponent — what does that mean for numerical error?",
        "Orthogonal matrices Q satisfy ‖Qx‖ = ‖x‖ — no amplification of errors.",
      ],
    },
    {
      id: "q-alg-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Conjugate Gradient method is appropriate for solving Ax = b when:",
      options: [
        "A is a dense, non-square matrix with more rows than columns",
        "A is a large, sparse, symmetric positive definite matrix where forming A⁻¹ is intractable",
        "A is an arbitrary matrix with possible negative eigenvalues",
        "You need an exact solution in a fixed number of steps regardless of matrix size",
      ],
      correctAnswer: 1,
      explanation:
        "CG exploits symmetry and positive definiteness of A to converge in at most n iterations using only matrix-vector products (no factorization), making it ideal for large sparse SPD systems where direct methods are too expensive.",
      hints: [
        "CG requires SPD A to guarantee convergence and that the algorithm is well-defined.",
        "The power of CG for sparse systems: each iteration only requires one SpMV, not O(n²) work.",
      ],
    },
  ],

  "matrix-exp": [
    {
      id: "q-alg-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The matrix exponential e^(At) is defined as:",
      options: [
        "A matrix with entries eᵃⁱʲᵗ",
        "Σₖ₌₀^∞ (At)ᵏ / k! (the matrix power series)",
        "The element-wise exponential of A scaled by t",
        "The inverse of (I − At) for small t",
      ],
      correctAnswer: 1,
      explanation:
        "The matrix exponential is defined by the power series Σ(At)ᵏ/k!, directly analogous to the scalar exponential; this converges for all finite matrices and is used to solve linear ODEs dx/dt = Ax.",
      hints: [
        "Recall the scalar Taylor series: eˣ = 1 + x + x²/2! + ... — extend this to matrices.",
        "The solution to ẋ = Ax, x(0) = x₀ is x(t) = e^(At)x₀.",
      ],
    },
    {
      id: "q-alg-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a diagonalizable matrix A = PΛP⁻¹, the matrix exponential simplifies to e^A = Pe^ΛP⁻¹ where e^Λ is a diagonal matrix of scalar exponentials.",
      correctAnswer: "true",
      explanation:
        "Diagonalization decouples the matrix power series: e^A = P(Σ Λᵏ/k!)P⁻¹ = Pe^ΛP⁻¹, and e^Λ is diagonal with entries e^(λᵢ), making computation of the matrix exponential tractable.",
      hints: [
        "Use the power series definition and substitute A = PΛP⁻¹; what happens to Aᵏ?",
        "Aᵏ = (PΛP⁻¹)ᵏ = PΛᵏP⁻¹ because intermediate P⁻¹P terms cancel.",
      ],
    },
    {
      id: "q-alg-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Neural ODEs model continuous-time dynamics by replacing discrete residual layers with solutions to which equation?",
      options: [
        "Δh = Wh + b (discrete linear recurrence)",
        "dh/dt = f(h(t), t, θ) solved by an ODE solver from t=0 to t=1",
        "h(t+1) = σ(Ah(t)) (standard RNN update)",
        "h̃ = e^A h (single matrix exponential step)",
      ],
      correctAnswer: 1,
      explanation:
        "Neural ODEs (Chen et al. 2018) parameterize the derivative of a hidden state with a neural network and use an ODE solver (e.g., RK4) to integrate forward, viewing depth as a continuous parameter rather than discrete layers.",
      hints: [
        "A residual network h(t+1) = h(t) + f(h(t)) approximates an ODE as the step size goes to zero.",
        "The adjoint method efficiently computes gradients through the ODE solver without storing intermediate states.",
      ],
    },
  ],

  "fourier-matrix": [
    {
      id: "q-alg-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Discrete Fourier Transform (DFT) of a length-n signal x can be written as a matrix multiplication y = Fx where F is:",
      options: [
        "A random orthogonal matrix",
        "The DFT matrix with entries Fₖₙ = e^(−2πikn/N) / √N",
        "The identity matrix for periodic signals",
        "A sparse triangular matrix",
      ],
      correctAnswer: 1,
      explanation:
        "The DFT matrix F has entries Fₖₙ = ω^(kn) where ω = e^(−2πi/N); it is a unitary matrix (FF* = I) enabling the DFT to be viewed as a change of basis to the Fourier basis of complex exponentials.",
      hints: [
        "The DFT is a linear operation — any linear operation on a vector can be written as a matrix multiplication.",
        "The Fourier basis vectors are complex sinusoids at different frequencies.",
      ],
    },
    {
      id: "q-alg-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Fast Fourier Transform (FFT) computes the DFT in O(n log n) instead of O(n²) by exploiting the recursive structure of the DFT matrix.",
      correctAnswer: "true",
      explanation:
        "The Cooley-Tukey FFT algorithm recursively splits the DFT into smaller DFTs using the symmetry ω^(2k) = (ω²)^k, reducing O(n²) matrix-vector multiplication to O(n log n) butterfly operations.",
      hints: [
        "The DFT matrix has a highly structured form — it is not arbitrary, enabling structured matrix-vector multiplication.",
        "Think about how a length-n DFT can be split into two length-(n/2) DFTs.",
      ],
    },
    {
      id: "q-alg-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Convolutional neural networks implicitly compute cross-correlations. How does the convolution theorem connect CNNs to the DFT?",
      options: [
        "Convolution in the spatial domain equals addition in the Fourier domain",
        "Convolution in the spatial domain equals pointwise multiplication in the Fourier domain, so large convolutions can be computed via FFT more efficiently",
        "The CNN filters are always initialized as DFT basis vectors",
        "Pooling layers apply the inverse DFT to downsample feature maps",
      ],
      correctAnswer: 1,
      explanation:
        "The convolution theorem states conv(f, g) = IFFT(FFT(f) · FFT(g)); for large kernels, FFT-based convolution is O(n log n) vs. O(nk) direct convolution — used in FNO (Fourier Neural Operator) and frequency-domain CNNs.",
      hints: [
        "Convolution becomes multiplication in frequency space — this is the core insight of signal processing.",
        "Think about when a direct convolution O(nk) becomes more expensive than two FFTs O(n log n).",
      ],
    },
  ],

  "covariance-matrices": [
    {
      id: "q-alg-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Mahalanobis distance between point x and distribution with mean μ and covariance Σ is:",
      options: [
        "‖x − μ‖₂ (standard Euclidean distance)",
        "√((x − μ)ᵀΣ⁻¹(x − μ))",
        "(x − μ)ᵀΣ(x − μ)",
        "ΣΣᵢ(xᵢ − μᵢ)² / σᵢ",
      ],
      correctAnswer: 1,
      explanation:
        "Mahalanobis distance accounts for feature correlations and different scales by whitening the space with Σ⁻¹; when Σ = I it reduces to Euclidean distance.",
      hints: [
        "Standard Euclidean distance treats all directions equally; Mahalanobis accounts for covariance structure.",
        "The Σ⁻¹ term stretches the space to decorrelate and normalize each dimension.",
      ],
    },
    {
      id: "q-alg-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The sample covariance matrix S = (1/(n−1)) Σᵢ (xᵢ − x̄)(xᵢ − x̄)ᵀ is an unbiased estimator of the population covariance matrix Σ.",
      correctAnswer: "true",
      explanation:
        "The denominator (n−1) instead of n corrects for the degrees of freedom lost by estimating the mean x̄ from data, making E[S] = Σ — the Bessel correction.",
      hints: [
        "If you use n in the denominator, the estimator is biased (slightly underestimates variance).",
        "Think about the one degree of freedom consumed by estimating the mean.",
      ],
    },
    {
      id: "q-alg-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In high-dimensional settings (p ≫ n), the sample covariance matrix is:",
      options: [
        "A perfectly good estimator with no issues",
        "Rank-deficient (rank ≤ n − 1 < p) and its inverse does not exist, necessitating regularization (e.g., shrinkage)",
        "Always the identity matrix due to the law of large numbers",
        "Positive definite as long as n > 10",
      ],
      correctAnswer: 1,
      explanation:
        "With p > n features, the sample covariance has rank at most n−1 < p and is singular; Ledoit-Wolf shrinkage, diagonal covariance, or pseudoinverse are used to handle this high-dimensional regime common in bioinformatics and finance.",
      hints: [
        "You have p(p+1)/2 covariance parameters but only n observations — what happens when p > n?",
        "Singular covariance matrices cannot be inverted for Mahalanobis distance or Gaussian likelihoods.",
      ],
    },
  ],

  "linear-algebra-opt": [
    {
      id: "q-alg-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A quadratic form xᵀAx (with A symmetric) is convex if and only if:",
      options: [
        "A has all positive entries",
        "A is positive semi-definite (all eigenvalues ≥ 0)",
        "The trace of A is positive",
        "A is invertible",
      ],
      correctAnswer: 1,
      explanation:
        "The quadratic form xᵀAx is convex iff A is PSD (all eigenvalues ≥ 0); the Hessian of xᵀAx is 2A, and a function is convex iff its Hessian is PSD.",
      hints: [
        "Convexity of a twice-differentiable function is determined by its Hessian.",
        "The Hessian of f(x) = xᵀAx is 2A — when is a symmetric matrix PSD?",
      ],
    },
    {
      id: "q-alg-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The condition number of the Hessian matrix directly controls the convergence rate of gradient descent: a higher condition number leads to slower convergence.",
      correctAnswer: "true",
      explanation:
        "For quadratic objectives f(x) = xᵀAx/2, gradient descent convergence rate is (κ−1)/(κ+1) per iteration where κ = σ_max/σ_min; ill-conditioned problems (large κ) force tiny step sizes and slow convergence.",
      hints: [
        "The optimal step size for gradient descent on a quadratic is 2/(λ_max + λ_min).",
        "Preconditioning aims to reduce the condition number, accelerating convergence.",
      ],
    },
    {
      id: "q-alg-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Natural gradient descent (used in policy gradient RL and some neural network optimizers) multiplies the gradient by the inverse of which matrix?",
      options: [
        "The Hessian of the loss function",
        "The Fisher information matrix F = E[∇log p(x|θ) ∇log p(x|θ)ᵀ]",
        "The covariance matrix of the data",
        "The Jacobian of the output layer",
      ],
      correctAnswer: 1,
      explanation:
        "Natural gradient uses the Fisher information matrix as a Riemannian metric on the parameter space, ensuring parameter updates are invariant to reparameterization and often converge much faster than standard gradient descent.",
      hints: [
        "The Fisher information captures the curvature of the KL-divergence between nearby distributions.",
        "Natural gradient corrects for the non-Euclidean geometry of probability distribution spaces.",
      ],
    },
  ],

  "linalg-code": [
    {
      id: "q-alg-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In NumPy, which operation is fastest for computing the dot product of two large vectors x and y?",
      options: [
        "sum([x[i]*y[i] for i in range(len(x))])",
        "np.dot(x, y) or x @ y",
        "np.sum(x * y)",
        "All are equivalent in speed",
      ],
      correctAnswer: 1,
      explanation:
        "np.dot(x, y) and x @ y call optimized BLAS routines (DAXPY, DDOT) that exploit SIMD vectorization and cache efficiency; Python loops are orders of magnitude slower for large vectors.",
      hints: [
        "NumPy\'s vectorized operations call compiled C/Fortran BLAS routines under the hood.",
        "Python loops have high overhead per iteration; vectorization eliminates this overhead.",
      ],
    },
    {
      id: "q-alg-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In PyTorch, using torch.einsum is always slower than writing explicit matrix multiplications because einsum is parsed at runtime.",
      correctAnswer: "false",
      explanation:
        "PyTorch\'s einsum compiles to optimized backends (cuBLAS, cuDNN) at runtime; for multi-dimensional contractions, it is often as fast as explicit matmul calls and much more readable.",
      hints: [
        "Modern einsum implementations optimize the contraction order and dispatch to hardware-optimized routines.",
        "Einsum is widely used in transformer implementations for its clarity and performance.",
      ],
    },
    {
      id: "q-alg-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When computing a batched matrix multiplication of tensors shaped (B, M, K) and (B, K, N) in PyTorch, the correct operation is:",
      options: [
        "torch.mm applied in a Python loop over the batch dimension",
        "torch.bmm(A, B) which performs B independent M×K @ K×N multiplications in parallel",
        "torch.matmul with squeeze/unsqueeze to collapse the batch dimension",
        'torch.einsum("bmk,bkn->bmn", A, B)',
      ],
      correctAnswer: 1,
      explanation:
        'torch.bmm performs batched matrix multiplication natively in a single CUDA kernel call; both torch.bmm and torch.einsum("bmk,bkn->bmn") are correct, but the question identifies torch.bmm as the idiomatic batched matmul.',
      hints: [
        "A Python loop is always slow; you want a single operation that handles all batch elements at once.",
        "torch.bmm is specifically designed for exactly this (batch, M, K) × (batch, K, N) use case.",
      ],
    },
  ],

  "graph-matrices": [
    {
      id: "q-alg-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "The adjacency matrix A of an undirected graph satisfies:",
      options: [
        "Aᵢⱼ = 1 if there is a directed edge from i to j only",
        "A = Aᵀ (symmetric) with Aᵢⱼ = 1 if nodes i and j are connected",
        "Aᵢᵢ = 1 for all diagonal entries",
        "A has all positive eigenvalues",
      ],
      correctAnswer: 1,
      explanation:
        "Undirected graphs have symmetric adjacency matrices (Aᵢⱼ = Aⱼᵢ) because an edge between i and j is bidirectional; directed graphs have asymmetric adjacency matrices.",
      hints: [
        "In an undirected graph, if i connects to j, then j also connects to i.",
        "Symmetry of A implies it has real eigenvalues by the spectral theorem.",
      ],
    },
    {
      id: "q-alg-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The (i, j) entry of the matrix Aᵏ (the k-th power of the adjacency matrix) counts the number of walks of length exactly k between nodes i and j.",
      correctAnswer: "true",
      explanation:
        "By induction, (Aᵏ)ᵢⱼ counts the number of distinct paths of length k from node i to node j, including paths that revisit nodes — this is a fundamental property used in graph algorithms and GNNs.",
      hints: [
        "Verify for k=2: (A²)ᵢⱼ = Σₖ AᵢₖAₖⱼ counts how many common neighbors i and j share.",
        "This property is exploited in polynomial graph filters used in spectral GNNs.",
      ],
    },
    {
      id: "q-alg-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In graph neural networks, the normalized Laplacian L̃ = D^(−1/2) L D^(−1/2) is preferred over the raw Laplacian for message passing because:",
      options: [
        "The normalized Laplacian is always invertible unlike the raw Laplacian",
        "Normalization bounds eigenvalues to [0, 2], preventing gradient explosion in deep GNNs and accounting for different node degrees",
        "The normalized Laplacian is sparse and the raw Laplacian is dense",
        "Normalization makes the Laplacian asymmetric, enabling directed graph modeling",
      ],
      correctAnswer: 1,
      explanation:
        "The normalized Laplacian has spectrum in [0, 2], ensuring stable gradient flow in deep GNNs; it also accounts for node degree (a high-degree node\'s features are scaled down), preventing high-degree nodes from dominating aggregation.",
      hints: [
        "Think about what happens to gradients during backpropagation when eigenvalues are unbounded.",
        "Degree normalization ensures that a node with 1000 neighbors and one with 3 neighbors contribute equally in aggregation.",
      ],
    },
  ],

  "linear-algebra-quantum": [
    {
      id: "q-alg-kp29-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In quantum computing, a qubit state is represented as a unit vector in ℂ² with state |ψ⟩ = α|0⟩ + β|1⟩. The constraint on α and β is:",
      options: [
        "α + β = 1 (probabilities sum to 1)",
        "|α|² + |β|² = 1 (squared magnitudes sum to 1)",
        "α = β (equal superposition always)",
        "α, β ∈ {0, 1} (classical bits)",
      ],
      correctAnswer: 1,
      explanation:
        "Measurement probabilities are |α|² and |β|², which must sum to 1 (Born rule); the state vector |ψ⟩ must be a unit vector in ℂ² under the L2 norm ‖|ψ⟩‖ = 1.",
      hints: [
        "The probability of measuring outcome 0 is |α|², not α — what must these probabilities sum to?",
        "This is the condition that |ψ⟩ is a unit vector in the Hilbert space ℂ².",
      ],
    },
    {
      id: "q-alg-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Quantum gates are represented by unitary matrices (UU† = I), which preserves the norm of qubit state vectors.",
      correctAnswer: "true",
      explanation:
        "Unitary matrices are quantum computing\'s analog of orthogonal matrices over ℂ; they preserve inner products (and thus norms) ensuring probability is conserved throughout a quantum computation.",
      hints: [
        "Quantum evolution must preserve ‖|ψ⟩‖ = 1 at all times — what matrix property ensures this?",
        "UU† = I means ‖U|ψ⟩‖ = ‖|ψ⟩‖ — same argument as orthogonal matrices over ℝ.",
      ],
    },
    {
      id: "q-alg-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Quantum entanglement between two qubits means their joint state vector CANNOT be written as a tensor product |ψ₁⟩ ⊗ |ψ₂⟩. This is detected by:",
      options: [
        "Computing the trace of the joint state matrix",
        "Performing SVD on the state matrix reshaped into a 2×2 matrix; entanglement exists iff the matrix has rank > 1",
        "Checking whether both qubits have the same state vector",
        "Computing the Kronecker product of the two qubit states",
      ],
      correctAnswer: 1,
      explanation:
        "Reshaping the 4-dimensional state vector of two qubits into a 2×2 matrix M, entanglement corresponds to rank(M) > 1; the Schmidt decomposition via SVD of M directly quantifies entanglement via the Schmidt coefficients.",
      hints: [
        "A product state |ψ₁⟩ ⊗ |ψ₂⟩ reshapes to a rank-1 matrix (outer product of two vectors).",
        "Entanglement is quantified by the Schmidt rank — the number of nonzero singular values of M.",
      ],
    },
  ],

  "linalg-interviews": [
    {
      id: "q-alg-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In an ML interview, you are asked "why does PCA fail on non-linearly separable data?" The correct answer is:',
      options: [
        "PCA fails because it requires labeled data",
        "PCA is a linear method that finds linear projections; it cannot capture nonlinear manifold structure in the data",
        "PCA is too slow for high-dimensional data",
        "PCA requires the data to be normally distributed to work correctly",
      ],
      correctAnswer: 1,
      explanation:
        "PCA finds the linear subspace of maximum variance; when the intrinsic structure is a nonlinear manifold (e.g., a Swiss roll), linear projections discard the manifold geometry — kernel PCA or nonlinear methods like UMAP are needed.",
      hints: [
        "Think about projecting data on a circle onto a line — the circular structure is lost.",
        "PCA applies linear transformations (matrix multiplications) only.",
      ],
    },
    {
      id: "q-alg-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'In an ML interview context, saying "SVD is too slow for large matrices" is always correct — you should always use PCA instead.',
      correctAnswer: "false",
      explanation:
        "Randomized SVD (Halko et al.) and incremental/online PCA algorithms make SVD practical for very large matrices; dismissing SVD without considering these variants demonstrates incomplete knowledge.",
      hints: [
        "Randomized SVD runs in O(mnk) for a rank-k approximation — far less than full SVD O(min(mn², m²n)).",
        "sklearn.decomposition.TruncatedSVD and randomized_svd are designed for large sparse matrices.",
      ],
    },
    {
      id: "q-alg-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'An interviewer asks: "A neural network\'s weight matrix has a very high condition number. What are the implications for training?" The best answer covers:',
      options: [
        "High condition number means the matrix is orthogonal, which speeds up training",
        "High condition number implies ill-conditioning: gradient flow is poor (vanishing/exploding gradients), and the layer learns different directions at very different rates — addressed by careful initialization, normalization, or gradient clipping",
        "High condition number has no effect on neural network training",
        "High condition number means the matrix is sparse, which is efficient for backpropagation",
      ],
      correctAnswer: 1,
      explanation:
        "Ill-conditioned weight matrices cause gradient magnitudes to vary enormously across directions, leading to vanishing/exploding gradients; techniques like He/Xavier initialization (controlling singular value spread), batch normalization, and gradient clipping address this.",
      hints: [
        "The condition number ratio σ_max/σ_min tells you how much more the matrix stretches some directions vs. others.",
        "Think about how gradient descent behaves on a very elongated quadratic bowl (high condition number Hessian).",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
