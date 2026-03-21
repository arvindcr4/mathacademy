import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "vector-spaces": [
    {
      id: "q-alg-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which of the following is a valid subspace of \\mathbb{R}³?",
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
      correctAnswer: "False",
      explanation:
        "A basis only requires the vectors to be linearly independent and span the space; orthogonality is an additional property of orthonormal bases (e.g., from Gram-Schmidt) but is not required for a basis.",
      hints: [
        "Think about the standard basis {e₁, e₂, e₃} — is that the only valid basis for \\mathbb{R}³?",
        "Can you find a basis for \\mathbb{R}² where the two vectors are not perpendicular?",
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
        "A linear transformation T: \\mathbb{R}ⁿ → \\mathbb{R}ᵐ must satisfy which two properties?",
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
      correctAnswer: "True",
      explanation:
        "A linear transformation is basis-independent, but its matrix representation encodes coordinates relative to chosen bases; different bases yield different (though similar) matrices representing the same transformation.",
      hints: [
        "Think about how the same rotation in \\mathbb{R}² looks in the standard basis vs. a rotated basis.",
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
        "From \\mathbb{R}ᵐ to \\mathbb{R}ⁿ",
        "From \\mathbb{R}ⁿ to \\mathbb{R}ᵐ",
        "From \\mathbb{R}ⁿ to \\mathbb{R}ⁿ (always square)",
        "From \\mathbb{R}ᵐ to \\mathbb{R}ᵐ (always square)",
      ],
      correctAnswer: 1,
      explanation:
        "For Ax to be defined, x must be in \\mathbb{R}ⁿ (n-dimensional column vector), and the product Ax is an m-dimensional vector in \\mathbb{R}ᵐ; an m × n matrix always maps from \\mathbb{R}ⁿ to \\mathbb{R}ᵐ.",
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
      explanation: `Let $A$ be an $n \\times n$ matrix. The determinant $\\det(A)$ has several equivalent interpretations:

**Step 1: Volume interpretation.** The determinant measures the signed volume scaling factor of the linear transformation $T(\\mathbf{x}) = A\\mathbf{x}$. If $\\det(A) = 0$, the transformation collapses $n$-dimensional volume to zero — it maps $\\mathbb{R}^n$ to a lower-dimensional subspace.

**Step 2: Linear dependence.** A set of vectors $\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_n\\}$ in $\\mathbb{R}^n$ is linearly dependent if and only if the determinant of the matrix with those vectors as columns (or rows) equals zero. So $\\det(A) = 0$ means the column vectors of $A$ are linearly dependent.

**Step 3: Invertibility.** A matrix is invertible (nonsingular) if and only if $\\det(A) \\neq 0$. When $\\det(A) = 0$, the matrix is singular — it has no inverse.

**Why the other options are wrong:**
- The identity matrix has $\\det(I) = 1$, not 0.
- A rotation matrix always has $\\det(Q) = 1$ (preserving orientation).
- Positive eigenvalues imply $\\det(A) > 0$ (product of eigenvalues), but the converse is false: a matrix can have $\\det = 0$ with some positive eigenvalues.

Therefore, $\\boxed{\\text{The matrix is singular and its columns are linearly dependent}}$.`,
      hints: [
        'The determinant measures the "volume scaling factor" of the transformation — what happens to volume when it collapses to zero?',
        "If two rows of a matrix are identical, the determinant is zero — why does linear dependence of columns lead to the same conclusion?",
      ],
    },
    {
      id: "q-alg-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The determinant of the product of two matrices equals the product of their determinants: det(AB) = det(A)·det(B).",
      correctAnswer: "True",
      explanation: `Let us verify this fundamental property of determinants step by step.

**Step 1: Geometric reasoning.** Consider the geometric interpretation of the determinant as a volume scaling factor. If a linear transformation $A$ scales volume by a factor $\\det(A)$ and a second transformation $B$ scales volume by a factor $\\det(B)$, then applying $B$ first and then $A$ scales volume by $\\det(A) \\cdot \\det(B)$. But $AB$ represents the composition of these transformations, so its determinant must be $\\det(A)\\det(B)$.

**Step 2: Algebraic verification for $2 \\times 2$ matrices.** Let:
$$A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}, \\quad B = \\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix}$$

Then:
\\[
AB = \\begin{pmatrix} ae + bg & af + bh \\\\ ce + dg & cf + dh \\end{pmatrix}
\\]

Using the formula $\\det(XY) = \\det(X)\\det(Y)$ for $2 \\times 2$ matrices:
\\[
\\det(AB) = (ae+bg)(cf+dh) - (af+bh)(ce+dg)
\\]

Expanding and factoring:
\\begin{align}
\\det(AB) &= acef + aedh + bgcf + bgdh - afce - afdg - bhce - bhdg \\\\[5pt]
&= ad(eh - fg) + bc(eh - fg) \\\\[5pt]
&= (ad - bc)(eh - fg) = \\det(A) \\cdot \\det(B)
\\end{align}

**Step 3: General proof.** The multiplicative property extends to all square matrices and can be proven using the fact that $\\det(AB) = \\det(A)\\det(B)$ follows from the product formula for the exterior algebra: $\\det(A \\wedge B) = \\det(A)\\det(B)$.

An immediate corollary: since $AA^{-1} = I$, we have $\\det(A^{-1}) = 1/\\det(A)$.

Therefore, $\\boxed{\\text{True}}$ — determinants compose multiplicatively under matrix multiplication.`,
      hints: [
        "Think geometrically: if $A$ scales volume by factor $a$ and $B$ scales by factor $b$, what does the composition $AB$ scale by?",
        "This property immediately gives $\\det(A^{-1}) = 1/\\det(A)$ — can you see why?",
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
      explanation: `Let us work through the geometric interpretation using the column vectors explicitly.

**Step 1: Identify the matrix.** The matrix with columns $[2, 0]^T$ and $[0, 3]^T$ is:
$$A = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}$$

**Step 2: Trace the unit square.** Consider the unit square with corners at $(0,0)$, $(1,0)$, $(0,1)$, and $(1,1)$. Under the transformation $\\mathbf{x} \\mapsto A\\mathbf{x}$:

\\begin{align}
(0,0) &\\mapsto (0,0) \\\\\n(1,0) &\\mapsto A\\begin{pmatrix}1\\\\0\\end{pmatrix} = \\begin{pmatrix}2\\\\0\\end{pmatrix} = (2,0) \\\\\n(0,1) &\\mapsto A\\begin{pmatrix}0\\\\1\\end{pmatrix} = \\begin{pmatrix}0\\\\3\\end{pmatrix} = (0,3) \\\\\n(1,1) &\\mapsto A\\begin{pmatrix}1\\\\1\\end{pmatrix} = \\begin{pmatrix}2\\\\3\\end{pmatrix} = (2,3)
\\end{align}

**Step 3: Compute the area of the image.** The transformed square is a rectangle with corners $(0,0)$, $(2,0)$, $(0,3)$, $(2,3)$, which has area:
$$\\text{Area} = 2 \\times 3 = 6$$

**Step 4: Connect to the determinant formula.** For a $2 \\times 2$ matrix $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, the area of the parallelogram spanned by its column vectors $[a,c]^T$ and $[b,d]^T$ is $|ad - bc| = |\\det(A)|$. Here, $ad - bc = 2 \\cdot 3 - 0 \\cdot 0 = 6$.

The diagonal entries of $A$ stretch the $x$-direction by a factor of 2 and the $y$-direction by a factor of 3, so the area scales by $2 \\times 3 = 6$.

**Why the other options are wrong:**
- A rotation matrix has determinant $\\pm 1$, not 6.
- The sum of eigenvalues is $\\text{tr}(A) = 2 + 3 = 5$, not 6.

Therefore, $\\boxed{\\text{The transformation scales area by a factor of 6 (a unit square maps to a rectangle of area 6)}}$.`,
      hints: [
        "The unit square with corners at $(0,0)$, $(1,0)$, $(0,1)$, $(1,1)$ — where do its corners map under this transformation? Write out each transformed corner explicitly.",
        "The area of the parallelogram formed by the two column vectors $[2,0]^T$ and $[0,3]^T$ is $|\\det(A)|$. Compute this using the cross product magnitude: $\\|[2,0] \\times [0,3]\\| = |6 - 0| = 6$.",
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
      explanation: `The rank-nullity theorem is a fundamental result about linear transformations. Let us break it down.

**Step 1: Define the key quantities.**
- $\\text{rank}(A) = \\dim(\\text{col}(A))$: the dimension of the column space of $A$.
- $\\text{nullity}(A) = \\dim(\\text{null}(A))$: the dimension of the null space (kernel) of $A$.
- $n$: the number of columns of $A$ (the dimension of the input space $\\mathbb{R}^n$).

**Step 2: Understand the partition.** For a linear transformation $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ represented by $A$, every input vector $\\mathbf{x} \\in \\mathbb{R}^n$ can be uniquely decomposed as:
$$\\mathbf{x} = \\mathbf{x}_{\\text{range}} + \\mathbf{x}_{\\text{kernel}}$$
where $\\mathbf{x}_{\\text{range}}$ is in the row space (or more precisely, projects nontrivially onto the column space) and $\\mathbf{x}_{\\text{kernel}}$ lies in the null space.

**Step 3: Apply the theorem.** The column space and null space are orthogonal complements (in the row space sense). The dimensions must add up to the input dimension:
$$\\text{rank}(A) + \\text{nullity}(A) = n$$

This holds because the null space captures "lost" input dimensions (mapped to zero), and the column space captures the "useful" output dimensions.

**Step 4: Verify with an example.** For a rank-1 matrix $A = \\mathbf{u}\\mathbf{v}^T$ of size $m \\times n$:
- $\\text{rank}(A) = 1$
- $\\text{nullity}(A) = n - 1$
- $\\text{rank}(A) + \\text{nullity}(A) = 1 + (n-1) = n$ ✓

Therefore, $\\boxed{\\text{rank}(A) + \\text{nullity}(A) = n}$ is the correct statement.`,
      hints: [
        "Rank is the dimension of the column space (output dimension); nullity is the dimension of inputs mapped to zero. Together, they account for all $n$ input dimensions.",
        'Think of it as a budget: every one of the $n$ input dimensions either "produces output" (contributes to rank) or "disappears into zero" (contributes to nullity).',
      ],
    },
    {
      id: "q-alg-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "If a linear system Ax = b has a unique solution, then the null space of A contains only the zero vector.",
      correctAnswer: "True",
      explanation: `Let us prove this fundamental equivalence between uniqueness of solutions and the trivial null space.

**Step 1: Set up the claim.** Suppose $Ax = b$ has a unique solution $\\mathbf{x}^*$. We want to show that the only vector in $\\text{null}(A)$ is $\\mathbf{0}$.

**Step 2: Proof by contradiction.** Assume there exists a nonzero vector $\\mathbf{x}_0 \\in \\text{null}(A)$, so $A\\mathbf{x}_0 = \\mathbf{0}$ and $\\mathbf{x}_0 \\neq \\mathbf{0}$.

**Step 3: Construct a second solution.** Consider $\\mathbf{x}^* + \\mathbf{x}_0$:
$$A(\\mathbf{x}^* + \\mathbf{x}_0) = A\\mathbf{x}^* + A\\mathbf{x}_0 = b + \\mathbf{0} = b$$

So $\\mathbf{x}^* + \\mathbf{x}_0$ is also a solution to $Ax = b$.

**Step 4: Show the contradiction.** Since $\\mathbf{x}_0 \\neq \\mathbf{0}$, we have $\\mathbf{x}^* + \\mathbf{x}_0 \\neq \\mathbf{x}^*$. This means $Ax = b$ has at least two distinct solutions: $\\mathbf{x}^*$ and $\\mathbf{x}^* + \\mathbf{x}_0$.

This contradicts our assumption that the solution is unique.

**Step 5: Conclude.** Therefore, if $Ax = b$ has a unique solution, the null space must be trivial: $\\text{null}(A) = \\{\\mathbf{0}\\}$, which means $\\text{nullity}(A) = 0$.

**Geometric interpretation:** A linear transformation has a unique inverse on its image if and only if it is injective (one-to-one) — no two different inputs map to the same output. The null space being trivial is exactly the condition for injectivity.

Therefore, $\\boxed{\\text{True}}$.`,
      hints: [
        "If $Ax = b$ has solution $\\mathbf{x}^*$, and $\\mathbf{x}_0 \\in \\text{null}(A)$, then what is $A(\\mathbf{x}^* + \\mathbf{x}_0)$? Does this give a different solution?",
        "Uniqueness of solution is equivalent to the transformation being injective (one-to-one). What does injectivity imply about the null space?",
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
      explanation: `Let us apply the rank-nullity theorem systematically to find both dimensions.

**Step 1: Identify the given information.**
- Matrix $A$ is of size $5 \\times 8$: $m = 5$ rows, $n = 8$ columns.
- $\\text{rank}(A) = 3$.

**Step 2: Apply rank-nullity.** The rank-nullity theorem states:
$$\\text{rank}(A) + \\text{nullity}(A) = n = 8$$

Solving for nullity:
$$\\text{nullity}(A) = 8 - \\text{rank}(A) = 8 - 3 = 5$$

**Step 3: Determine the column space dimension.** The column space $\\text{col}(A)$ is a subspace of $\\mathbb{R}^5$ (the output space), and its dimension equals the rank:
$$\\dim(\\text{col}(A)) = \\text{rank}(A) = 3$$

So the column space lives in $\\mathbb{R}^5$ but only has dimension 3 — it is a 3-dimensional hyperplane (flat) inside 5-dimensional space.

**Step 4: Verify the dimensional balance.** Think of the transformation $T: \\mathbb{R}^8 \\to \\mathbb{R}^5$ as a "filter":
- 3 dimensions of input are "preserved" as useful output (rank).
- 5 dimensions of input are "collapsed to zero" (nullity).
- Total: $3 + 5 = 8$ input dimensions accounted for.

**Summary:**
| Space | Dimension | Lives in |
|---|---|---|
| Null space | 5 | $\\mathbb{R}^8$ (input space) |
| Column space | 3 | $\\mathbb{R}^5$ (output space) |

Therefore, $\\boxed{\\text{Null space: dimension 5 }(8 - 3),\\text{ Column space: dimension 3}}$.`,
      hints: [
        "Apply rank-nullity directly: $\\text{nullity} = n - \\text{rank}$ where $n = 8$ is the number of columns.",
        "The column space dimension always equals the rank, and it lives in $\\mathbb{R}^m$ where $m = 5$ is the number of rows. But the column space's dimension is the rank itself (3), not $m$ (5).",
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
      explanation: `Let us derive the projection formula from first principles using the orthogonality condition.

**Step 1: Define the problem.** We want to find the orthogonal projection $\\mathbf{p}$ of $\\mathbf{b}$ onto the line spanned by $\\mathbf{a}$. The projection $\\mathbf{p}$ must lie on this line, so it has the form:
$$\\mathbf{p} = \\lambda \\mathbf{a}$$
for some scalar $\\lambda$.

**Step 2: Impose the orthogonality condition.** The error vector $\\mathbf{b} - \\mathbf{p}$ must be orthogonal to $\\mathbf{a}$:
$$\\mathbf{a}^T(\\mathbf{b} - \\lambda\\mathbf{a}) = 0$$

**Step 3: Solve for \\lambda.** Expanding:
\\begin{align}
\\mathbf{a}^T\\mathbf{b} - \\lambda\\mathbf{a}^T\\mathbf{a} &= 0 \\\\\n\\lambda\\mathbf{a}^T\\mathbf{a} &= \\mathbf{a}^T\\mathbf{b} \\\\\n\\lambda &= \\frac{\\mathbf{a}^T\\mathbf{b}}{\\mathbf{a}^T\\mathbf{a}}
\\end{align}

**Step 4: Write the projection vector.** Substituting $\\lambda$:
$$\\mathbf{p} = \\frac{\\mathbf{a}^T\\mathbf{b}}{\\mathbf{a}^T\\mathbf{a}} \\cdot \\mathbf{a}$$

**Step 5: Interpret geometrically.** The scalar $\\frac{\\mathbf{a}^T\\mathbf{b}}{\\mathbf{a}^T\\mathbf{a}}$ is the signed length of the projection along $\\mathbf{a}$ (note: if $\\mathbf{a}$ is not a unit vector, $\\mathbf{a}^T\\mathbf{a} \\neq 1$). The projection $\\mathbf{p}$ points in the same direction as $\\mathbf{a}$ when $\\mathbf{a}^T\\mathbf{b} > 0$ and in the opposite direction when $\\mathbf{a}^T\\mathbf{b} < 0$.

**Geometric intuition:** The projection $\\mathbf{p}$ is the "shadow" of $\\mathbf{b}$ cast onto the line through the origin in the direction of $\\mathbf{a}$, following the rule that the shadow line (error $\\mathbf{b} - \\mathbf{p}$) is perpendicular to $\\mathbf{a}$.

Therefore, $\\boxed{\\mathbf{p} = \\frac{\\mathbf{a}^T\\mathbf{b}}{\\mathbf{a}^T\\mathbf{a}} \\cdot \\mathbf{a}}$ is the correct formula.`,
      hints: [
        "The projection must lie on the line spanned by $\\mathbf{a}$, so it has the form $\\lambda\\mathbf{a}$ for some scalar $\\lambda$.",
        "The error $\\mathbf{b} - \\mathbf{p}$ must be orthogonal to $\\mathbf{a}$: set $\\mathbf{a}^T(\\mathbf{b} - \\lambda\\mathbf{a}) = 0$ and solve for $\\lambda$.",
      ],
    },
    {
      id: "q-alg-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Gram-Schmidt process takes any set of linearly independent vectors and produces an orthonormal set spanning the same subspace.",
      correctAnswer: "True",
      explanation: `The Gram-Schmidt process is an algorithm for constructing an orthonormal basis from a set of linearly independent vectors. Let us walk through it step by step.

**Step 1: The algorithm.** Given linearly independent vectors $\\{\\mathbf{v}_1, \\mathbf{v}_2, \\ldots, \\mathbf{v}_n\\}$, we construct an orthonormal set $\\{\\mathbf{u}_1, \\mathbf{u}_2, \\ldots, \\mathbf{u}_n\\}$ as follows:

For $k = 1$:
$$\\tilde{\\mathbf{u}}_1 = \\mathbf{v}_1, \\quad \\mathbf{u}_1 = \\frac{\\tilde{\\mathbf{u}}_1}{\\|\\tilde{\\mathbf{u}}_1\\|}$$

For each $k = 2, 3, \\ldots, n$:
\\begin{align}
\\tilde{\\mathbf{u}}_k &= \\mathbf{v}_k - \\sum_{i=1}^{k-1} (\\mathbf{u}_i^T \\mathbf{v}_k) \\mathbf{u}_i \\quad \\text{(subtract projections onto previous orthonormal vectors)} \\\\\n\\mathbf{u}_k &= \\frac{\\tilde{\\mathbf{u}}_k}{\\|\\tilde{\\mathbf{u}}_k\\|} \\quad \\text{(normalize)}
\\end{align}

**Step 2: Verification of orthogonality.** At step $k$, $\\tilde{\\mathbf{u}}_k$ is orthogonal to each $\\mathbf{u}_i$ for $i < k$ because:
$$\\mathbf{u}_i^T \\tilde{\\mathbf{u}}_k = \\mathbf{u}_i^T\\mathbf{v}_k - \\sum_{j=1}^{k-1}(\\mathbf{u}_j^T\\mathbf{v}_k)(\\mathbf{u}_i^T\\mathbf{u}_j) = \\mathbf{u}_i^T\\mathbf{v}_k - \\mathbf{u}_i^T\\mathbf{v}_k = 0$$
(using orthonormality: $\\mathbf{u}_i^T\\mathbf{u}_j = \\delta_{ij}$).

**Step 3: Verification of span.** Each $\\tilde{\\mathbf{u}}_k$ is a linear combination of $\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_k\\}$, so by induction the span of $\\{\\mathbf{u}_1, \\ldots, \\mathbf{u}_k\\}$ equals the span of $\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_k\\}$. After $n$ steps, the spans are identical.

**Step 4: Geometric intuition.** At each step, we "peel off" the components of $\\mathbf{v}_k$ that lie along previously computed orthonormal directions, keeping only the residual (which is orthogonal to all of them). This residual becomes the next orthonormal basis vector.

Therefore, $\\boxed{\\text{True}}$ — Gram-Schmidt produces an orthonormal basis spanning the same subspace as the original linearly independent set.`,
      hints: [
        "At each step, subtract the projection of $\\mathbf{v}_k$ onto all previously computed orthonormal vectors $\\{\\mathbf{u}_1, \\ldots, \\mathbf{u}_{k-1}\\}$, then normalize the result.",
        "The span does not change because each new vector $\\tilde{\\mathbf{u}}_k$ is a linear combination of the original vectors $\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_k\\}$ — no new directions are introduced.",
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
      explanation: `Let us verify the properties of orthogonal matrices systematically.

**Step 1: Length preservation.** For any vector $\\mathbf{x} \\in \\mathbb{R}^n$:
$$\\|Q\\mathbf{x}\\|^2 = (Q\\mathbf{x})^T(Q\\mathbf{x}) = \\mathbf{x}^TQ^TQ\\mathbf{x} = \\mathbf{x}^T I \\mathbf{x} = \\mathbf{x}^T\\mathbf{x} = \\|\\mathbf{x}\\|^2$$

So $Q$ preserves the length of every vector. Since the angle between two vectors is defined via the dot product:
$$\\cos\\theta = \\frac{\\mathbf{x}^T\\mathbf{y}}{\\|\\mathbf{x}\\|\\|\\mathbf{y}\\|}$$
and both numerator and denominator are preserved under $Q$, the angle is also preserved.

**Step 2: Determinant.** Taking determinants of $Q^TQ = I$:
$$\\det(Q^TQ) = \\det(Q^T)\\det(Q) = \\det(Q)^2 = \\det(I) = 1$$

So $\\det(Q)^2 = 1$, which means $\\det(Q) = \\pm 1$. The value $+1$ corresponds to rotations (orientation-preserving), and $-1$ corresponds to improper rotations/reflections (orientation-reversing).

**Step 3: Why orthogonality does NOT imply symmetry.** Consider:
$$Q = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$$

This rotation matrix is orthogonal but not symmetric (unless $\\theta = 0$ or $\\pi$). Orthogonality and symmetry are independent properties.

**Step 4: Why eigenvalues are not all 1.** The eigenvalues of an orthogonal matrix lie on the unit circle in $\\mathbb{C}$: if $Q\\mathbf{v} = \\lambda\\mathbf{v}$, then:
$$\\|\\mathbf{v}\\| = \\|Q\\mathbf{v}\\| = |\\lambda|\\|\\mathbf{v}\\| \\implies |\\lambda| = 1$$

But $\\lambda$ can be complex (e.g., rotation by $\\theta \\neq 0, \\pi$ gives eigenvalues $e^{\\pm i\\theta}$), and even for real eigenvalues, only $\\lambda = \\pm 1$ are possible.

**Step 5: Counterexample for option 3 (always +1 determinant).** A reflection matrix like:
$$Q = \\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$$
has $\\det(Q) = -1$, is orthogonal, but is not a rotation.

Therefore, $\\boxed{Q\\text{ preserves vector lengths and angles (det}(Q) = \\pm 1\\text{)}}$ is the correct property.`,
      hints: [
        "Compute $\\|Q\\mathbf{x}\\|^2 = \\mathbf{x}^TQ^TQ\\mathbf{x}$ using $Q^TQ = I$. What do you conclude about length preservation?",
        "Taking determinants of $Q^TQ = I$ gives $\\det(Q)^2 = 1$. This means $\\det(Q) = \\pm 1$ — what does each case correspond to geometrically?",
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
      explanation: `Least squares is the standard method for solving overdetermined linear systems. Let us understand the minimization objective.

**Step 1: Understand the problem.** When $Ax = b$ has more equations than unknowns ( $m > n$ ), an exact solution generally does not exist because $b$ typically lies outside the column space of $A$.

**Step 2: Define the residual.** For a candidate solution $\\mathbf{x}$, the residual vector is:
$$\\mathbf{r}(\\mathbf{x}) = A\\mathbf{x} - \\mathbf{b}$$

The residual measures how far $A\\mathbf{x}$ is from $\\mathbf{b}$.

**Step 3: The least squares criterion.** We seek $\\hat{\\mathbf{x}}$ that minimizes the squared Euclidean norm of the residual:
$$\\hat{\\mathbf{x}} = \\arg\\min_{\\mathbf{x} \\in \\mathbb{R}^n} \\|A\\mathbf{x} - \\mathbf{b}\\|^2$$

This is the sum of squared residuals (the $\\|\\cdot\\|^2$ notation means $\\mathbf{r}^T\\mathbf{r} = \\sum_i r_i^2$):
$$\\|A\\mathbf{x} - \\mathbf{b}\\|^2 = (A\\mathbf{x} - \\mathbf{b})^T(A\\mathbf{x} - \\mathbf{b}) = \\sum_{i=1}^m r_i^2$$

**Step 4: Geometric interpretation.** The least squares solution $\\hat{\\mathbf{x}}$ makes $A\\hat{\\mathbf{x}}$ the orthogonal projection of $\\mathbf{b}$ onto the column space of $A$. The quantity $\\|A\\mathbf{x} - \\mathbf{b}\\|^2$ is the squared distance between $\\mathbf{b}$ and its projection in the column space.

**Step 5: Why squared norm?** Minimizing $\\|A\\mathbf{x} - \\mathbf{b}\\|$ and $\\|A\\mathbf{x} - \\mathbf{b}\\|^2$ give the same $\\hat{\\mathbf{x}}$ (since the square root is monotonic), but the squared form avoids the square root and leads to a linear system (the normal equations).

**Why the other options are wrong:**
- $\\|Ax\\|^2$: This measures the length of $A\\mathbf{x}$, not how close it is to $\\mathbf{b}$.
- $\\|x\\|^2$: This measures the length of $\\mathbf{x}$, not the fit quality.
- $\\|A\\|^2$: This is a property of $A$ alone, independent of $\\mathbf{b}$.

Therefore, $\\boxed{\\|Ax - b\\|^2}$ is the quantity minimized by least squares.`,
      hints: [
        "The system $Ax = b$ has no exact solution when $\\mathbf{b}$ is not in the column space of $A$. We want $\\mathbf{x}$ such that $A\\mathbf{x}$ is as close as possible to $\\mathbf{b}$.",
        'Closeness in Euclidean space is measured by the squared norm $\\|A\\mathbf{x} - \\mathbf{b}\\|^2$ — the sum of squared residuals $\\sum_i (a_i^T\\mathbf{x} - b_i)^2$.',
      ],
    },
    {
      id: "q-alg-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The normal equations AᵀAx = Aᵀb always have a unique solution regardless of the rank of A.",
      correctAnswer: "False",
      explanation: `The normal equations $A^TA\\mathbf{x} = A^T\\mathbf{b}$ are derived from the least squares problem, but their solvability depends on the rank of $A$.

**Step 1: Derive the normal equations.** To minimize $\\|A\\mathbf{x} - \\mathbf{b}\\|^2$, we set the gradient to zero:
$$\\nabla_\\mathbf{x} \\|A\\mathbf{x} - \\mathbf{b}\\|^2 = 2A^T(A\\mathbf{x} - \\mathbf{b}) = 0$$
which gives:
$$A^TA\\mathbf{x} = A^T\\mathbf{b}$$

**Step 2: When does $A^TA$ have full rank?** The matrix $A^TA$ is $n \\times n$. It is invertible (and thus the normal equations have a unique solution) if and only if $A$ has full column rank — that is, $\\text{rank}(A) = n$.

**Step 3: The rank-deficient case.** If $A$ has linearly dependent columns ( $\\text{rank}(A) < n$ ), then:
- $\\text{rank}(A^TA) = \\text{rank}(A) < n$ (rank does not increase under $A^TA$)
- $A^TA$ is singular — it has no inverse.
- The normal equations have infinitely many solutions (if any exist at all).

**Step 4: Concrete counterexample.** Let:
$$A = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad \\mathbf{b} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix}$$

The columns of $A$ are linearly independent, so the normal equations have a unique solution $\\hat{\\mathbf{x}} = (0.5, 1)^T$.

But if we modify $A$ to have dependent columns:
$$A = \\begin{pmatrix} 1 & 2 \\\\ 1 & 2 \\\\ 0 & 0 \\end{pmatrix}$$

Then $A^TA = \\begin{pmatrix} 2 & 4 \\\\ 4 & 8 \\end{pmatrix}$ has determinant 0 (singular), and the normal equations may have no unique solution.

**Step 5: What to use when $A^TA$ is singular?** The Moore-Penrose pseudoinverse $A^+$ gives the minimum-norm least squares solution even when $A^TA$ is singular.

Therefore, $\\boxed{\\text{False}}$ — the normal equations have a unique solution if and only if $A$ has full column rank.`,
      hints: [
        "$A^TA$ is invertible if and only if $A$ has full column rank (linearly independent columns). Ask yourself: does $A$ always have linearly independent columns?",
        "What happens to the normal equations when two columns of $A$ are identical? The system becomes singular and you cannot uniquely solve for $\\mathbf{x}$.",
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
      explanation: `When $A$ has full column rank, the Moore-Penrose pseudoinverse simplifies significantly. Let us work through this carefully.

**Step 1: Full column rank condition.** $A$ has full column rank means $\\text{rank}(A) = n$ (all columns are linearly independent). This requires $m \\geq n$ (more rows than columns, or equal).

**Step 2: Properties of the pseudoinverse.** The Moore-Penrose pseudoinverse $A^+$ satisfies four conditions:
1. $AA^+A = A$
2. $A^+AA^+ = A^+$
3. $(AA^+)^T = AA^+$
4. $(A^+A)^T = A^+A$

**Step 3: The left inverse when $A$ has full column rank.** When $A$ has full column rank, it has a left inverse:
$$A^+A = I_n$$

To find $A^+$, we require $A^+A = I$, which means $A^+$ must be a left inverse of $A$. Since $A^T A$ is invertible (full column rank), we can compute:
$$A^+ = (A^T A)^{-1} A^T$$

**Step 4: Verification.** Let us verify that this $A^+$ satisfies the pseudoinverse properties:
\\begin{align}
AA^+ &= A(A^T A)^{-1} A^T \\quad \\text{(an } m \\times m \\text{ matrix, typically not identity)} \\\\\nA^+A &= (A^T A)^{-1} A^T A = I_n \\quad \\checkmark
\\end{align}

So $A^+A = I_n$ is the key property when $A$ has full column rank.

**Step 5: The least squares solution.** With this pseudoinverse, the least squares solution is:
$$\\hat{\\mathbf{x}} = A^+ \\mathbf{b} = (A^T A)^{-1} A^T \\mathbf{b}$$

This is exactly the solution to the normal equations $A^TA\\mathbf{x} = A^T\\mathbf{b}$.

**Step 6: Why the other options are wrong.**
- $A^+ = A$: Only true for identity-like matrices, not in general.
- $A^+ = A^T(AA^T)^{-1}$: This is the formula for the pseudoinverse when $A$ has full row rank (not column rank).
- $A^+A^+ = I$: This is meaningless; $A^+$ is not idempotent.

Therefore, $\\boxed{A^+ = (A^TA)^{-1}A^T}$ is correct when $A$ has full column rank.`,
      hints: [
        "Full column rank means $n \\leq m$ and the columns of $A$ are linearly independent. In this case, $A^TA$ is invertible — what does that suggest for the pseudoinverse?",
        "The least squares solution is $\\hat{\\mathbf{x}} = (A^TA)^{-1}A^T\\mathbf{b}$. The matrix $(A^TA)^{-1}A^T$ is the pseudoinverse $A^+$ in this case.",
      ],
    },
  ],

  eigendecomposition: [
    {
      id: "q-alg-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "An eigenvalue \\lambda and eigenvector v of matrix A satisfy:",
      options: ["Av = 0", "Av = \\lambdav", "Av = v\\lambdav", "A + \\lambda = v"],
      correctAnswer: 1,
      explanation: `The eigenvalue-eigenvector equation is the fundamental definition in eigendecomposition. Let us clarify it carefully.

**Step 1: The defining equation.** By definition, $\\lambda$ is an eigenvalue of $A$ and $\\mathbf{v} \\neq \\mathbf{0}$ is a corresponding eigenvector if and only if:
$$A\\mathbf{v} = \\lambda\\mathbf{v}$$

This is the only correct form of the equation.

**Step 2: What it means geometrically.** The equation $A\\mathbf{v} = \\lambda\\mathbf{v}$ says that when $A$ acts on the eigenvector $\\mathbf{v}$, it only stretches (or shrinks, if $\\lambda < 0$) the vector — it does not change its direction. The eigenvalue $\\lambda$ is the scaling factor.

**Step 3: Why the other options are wrong.**
- $A\\mathbf{v} = \\mathbf{0}$: This defines a vector in the null space, not an eigenvector. The zero vector is never considered an eigenvector.
- $A\\mathbf{v} = \\mathbf{v}\\lambda\\mathbf{v}$: This is not a valid matrix-vector equation (dimensions do not match).
- $A + \\lambda = \\mathbf{v}$: You cannot add a scalar to a matrix — this is dimensionally meaningless.

**Step 4: How to find eigenvalues.** From $A\\mathbf{v} = \\lambda\\mathbf{v}$, we get $(A - \\lambda I)\\mathbf{v} = \\mathbf{0}$. For a nonzero $\\mathbf{v}$ to exist, the matrix $A - \\lambda I$ must be singular, so:
$$\\det(A - \\lambda I) = 0$$

This characteristic equation gives the eigenvalues $\\lambda_1, \\lambda_2, \\ldots, \\lambda_n$.

Therefore, $\\boxed{A\\mathbf{v} = \\lambda\\mathbf{v}}$ is the correct eigenvalue-eigenvector equation.`,
      hints: [
        "An eigenvector is a special direction that the matrix only scales, not rotates — in which direction does $\\mathbf{v}$ point after applying $A$?",
        'The prefix "eigen" (German for "own" or "characteristic") hints at a self-referential property: $A\\mathbf{v}$ is "owned" by $\\mathbf{v}$ (a scalar multiple of itself).',
      ],
    },
    {
      id: "q-alg-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Every square matrix has a complete set of n linearly independent eigenvectors.",
      correctAnswer: "False",
      explanation: `Not all matrices can be diagonalized. Let us examine the conditions and a counterexample.

**Step 1: Diagonalizability requires n independent eigenvectors.** A matrix $A$ is diagonalizable if and only if there exists an invertible matrix $P$ such that:
$$A = PDP^{-1}$$
where $D = \\text{diag}(\\lambda_1, \\ldots, \\lambda_n)$ is diagonal. The columns of $P$ are the $n$ linearly independent eigenvectors.

**Step 2: The defective counterexample.** Consider the Jordan block matrix:
$$J = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$$

**Step 3: Find its eigenvalues.** The characteristic polynomial is:
$$\\det(J - \\lambda I) = \\det\\begin{pmatrix} 1-\\lambda & 1 \\\\ 0 & 1-\\lambda \\end{pmatrix} = (1-\\lambda)^2$$

So $J$ has a single eigenvalue $\\lambda = 1$ of algebraic multiplicity 2.

**Step 4: Find its eigenvectors.** Solve $(J - I)\\mathbf{v} = \\mathbf{0}$:
$$(J - I) = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}, \\quad \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}\\begin{pmatrix} v_1 \\\\ v_2 \\end{pmatrix} = \\begin{pmatrix} v_2 \\\\ 0 \\end{pmatrix} = \\mathbf{0}$$

So $v_2 = 0$, giving eigenvectors of the form $\\mathbf{v} = (v_1, 0)^T = v_1(1, 0)^T$. All eigenvectors are scalar multiples of $(1, 0)^T$ — there is only **one** linearly independent eigenvector.

**Step 5: Conclusion.** This matrix has $n = 2$ eigenvalues (counting multiplicity) but only 1 linearly independent eigenvector. It cannot be diagonalized and is called a **defective matrix**.

**General rule:** A matrix with $n$ distinct eigenvalues is always diagonalizable (each eigenvalue gives at least one independent eigenvector). But repeated eigenvalues may not.

Therefore, $\\boxed{\\text{False}}$ — only diagonalizable matrices (a proper subset of all matrices) have a complete set of independent eigenvectors.`,
      hints: [
        "Consider the matrix $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$. Compute its eigenvalues via $\\det(A - \\lambda I) = 0$. How many eigenvalues are there? Now find the eigenvectors by solving $(A - \\lambda I)\\mathbf{v} = \\mathbf{0}$. How many linearly independent eigenvectors do you find?",
        "Diagonalizability requires $n$ independent eigenvectors. If the geometric multiplicity (number of independent eigenvectors) is less than the algebraic multiplicity (number of times an eigenvalue is repeated), the matrix is not diagonalizable.",
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
        "Real and mutually orthogonal, forming an orthonormal basis for \\mathbb{R}ⁿ",
        "Positive and linearly independent only",
        "Identical to the left singular vectors of A",
      ],
      correctAnswer: 1,
      explanation: `The spectral theorem is one of the most important results in linear algebra. Let us prove and interpret it carefully.

**Step 1: The spectral theorem statement.** For a real symmetric matrix $A \\in \\mathbb{R}^{n \\times n}$ (where $A = A^T$), there exists an orthogonal matrix $Q$ such that:
$$A = Q\\Lambda Q^T = Q\\begin{pmatrix} \\lambda_1 & & 0 \\\\ & \\ddots & \\\\ 0 & & \\lambda_n \\end{pmatrix}Q^T$$

The columns of $Q$ are orthonormal eigenvectors $\\{\\mathbf{q}_1, \\ldots, \\mathbf{q}_n\\}$, and $\\{\\lambda_1, \\ldots, \\lambda_n\\}$ are the real eigenvalues.

**Step 2: Proof sketch — orthogonality of eigenvectors.** Let $\\lambda_1 \\neq \\lambda_2$ be two distinct eigenvalues with eigenvectors $\\mathbf{v}_1, \\mathbf{v}_2$. We show they are orthogonal:
\\begin{align}
\\mathbf{v}_1^T(A\\mathbf{v}_2) &= \\mathbf{v}_1^T(\\lambda_2\\mathbf{v}_2) = \\lambda_2 \\mathbf{v}_1^T\\mathbf{v}_2 \\\\\n(A\\mathbf{v}_1)^T\\mathbf{v}_2 &= (\\lambda_1\\mathbf{v}_1)^T\\mathbf{v}_2 = \\lambda_1 \\mathbf{v}_1^T\\mathbf{v}_2
\\end{align}

But since $A$ is symmetric, $\\mathbf{v}_1^T(A\\mathbf{v}_2) = (A\\mathbf{v}_1)^T\\mathbf{v}_2$, so:
$$\\lambda_2 \\mathbf{v}_1^T\\mathbf{v}_2 = \\lambda_1 \\mathbf{v}_1^T\\mathbf{v}_2$$

Since $\\lambda_1 \\neq \\lambda_2$, we must have $\\mathbf{v}_1^T\\mathbf{v}_2 = 0$.

**Step 3: Real eigenvalues.** For symmetric $A$, all eigenvalues are real. (Proof: if $A\\mathbf{v} = \\lambda\\mathbf{v}$ with $\\lambda \\in \\mathbb{C}$, taking complex conjugates and using $A = \\bar{A} = A^T$ shows $\\lambda = \\bar{\\lambda}$.)

**Step 4: Constructing an orthonormal basis.** For each eigenvalue, we can find an orthonormal basis of its eigenspace using Gram-Schmidt (since eigenspaces are subspaces). Combined with the orthogonality between eigenspaces, we get an orthonormal eigenbasis.

**Step 5: Covariance matrices and PCA.** Covariance matrices $\\Sigma$ are symmetric positive semi-definite ($\\Sigma = \\Sigma^T, \\mathbf{x}^T\\Sigma\\mathbf{x} \\geq 0$). By the spectral theorem:
$$\\Sigma = Q\\text{diag}(\\lambda_1, \\ldots, \\lambda_n)Q^T$$

The columns of $Q$ are the principal component directions, and the eigenvalues give the explained variances — this is the mathematical foundation of PCA.

Therefore, $\\boxed{\\text{Real and mutually orthogonal, forming an orthonormal basis for }\\mathbb{R}^n}$ is the correct answer.`,
      hints: [
        "Use the symmetry $A = A^T$ to show eigenvectors for distinct eigenvalues are orthogonal: take the dot product of $A\\mathbf{v}_1 = \\lambda_1\\mathbf{v}_1$ with $\\mathbf{v}_2$ and compare with $\\mathbf{v}_1^T(A\\mathbf{v}_2) = \\lambda_2\\mathbf{v}_1^T\\mathbf{v}_2$ after using symmetry.",
        "The spectral theorem is exactly why covariance matrices (symmetric positive semi-definite) admit a clean PCA decomposition: $A = Q\\Lambda Q^T$ with orthogonal $Q$. This gives us orthonormal principal components.",
      ],
    },
  ],

  "svd-deep": [
    {
      id: "q-alg-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In the SVD A = U\\SigmaVᵀ of an m × n matrix, the columns of U are:",
      options: [
        "The right singular vectors of A, lying in \\mathbb{R}ⁿ",
        "The left singular vectors of A, lying in \\mathbb{R}ᵐ, forming an orthonormal basis for \\mathbb{R}ᵐ",
        "The eigenvalues of A arranged in a column",
        "The row space basis vectors of A",
      ],
      correctAnswer: 1,
      explanation:
        "U is an m × m orthogonal matrix whose columns (left singular vectors) form an orthonormal basis for \\mathbb{R}ᵐ; they are eigenvectors of AAᵀ.",
      hints: [
        "In A = U\\SigmaVᵀ, U transforms the output space and V transforms the input space.",
        "Left singular vectors live in the output space \\mathbb{R}ᵐ; right singular vectors live in the input space \\mathbb{R}ⁿ.",
      ],
    },
    {
      id: "q-alg-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question: "The singular values of any matrix are always non-negative.",
      correctAnswer: "True",
      explanation:
        "Singular values \\sigmaᵢ are defined as the square roots of the eigenvalues of AᵀA, which is positive semi-definite; therefore singular values are always real and non-negative.",
      hints: [
        "Singular values come from the diagonal of \\Sigma in the SVD.",
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
        "Aₖ = \\Sigmaᵢ₌₁ᵏ \\sigmaᵢuᵢvᵢᵀ (the truncated SVD using the top k singular triplets)",
        "The k × k submatrix of A with largest entries",
        "A projected onto the first k standard basis vectors",
      ],
      correctAnswer: 1,
      explanation:
        "The Eckart-Young theorem proves that the truncated SVD (keeping the top k singular values) yields the optimal rank-k approximation in both Frobenius and spectral norm, with approximation error equal to \\sigmaₖ₊₁.",
      hints: [
        "Each rank-1 matrix \\sigmaᵢuᵢvᵢᵀ captures the most remaining variance when added greedily.",
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
        "The square root of the sum of squares of all entries: ‖A‖_F = √(\\Sigmaᵢⱼ aᵢⱼ²)",
        "The maximum absolute row sum",
        "The trace of A",
      ],
      correctAnswer: 1,
      explanation:
        "The Frobenius norm treats the matrix as a long vector and computes its L2 norm; equivalently, ‖A‖_F = √(trace(AᵀA)) = √(\\Sigma \\sigmaᵢ²) where \\sigmaᵢ are singular values.",
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
      correctAnswer: "True",
      explanation:
        "‖A‖₂ = max_{‖x‖=1} ‖Ax‖ = \\sigma₁ (the largest singular value), representing the maximum stretch any unit vector undergoes under multiplication by A.",
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
        "The condition number of a matrix A is defined as κ(A) = \\sigma_max / \\sigma_min. A large condition number indicates:",
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
        "Think about what happens when \\sigma_min ≈ 0 — what does the ratio \\sigma_max/\\sigma_min become?",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
      correctAnswer: "False",
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
        "For f(x) = aᵀx = \\Sigmaᵢ aᵢxᵢ, the partial derivative ∂f/∂xᵢ = aᵢ, so the gradient vector ∂f/∂x = a (using the numerator layout / column vector convention).",
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
        "The Jacobian matrix of a vector-valued function f: \\mathbb{R}ⁿ → \\mathbb{R}ᵐ is an m × n matrix.",
      correctAnswer: "True",
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
        "Write out xᵀAx = \\Sigmaᵢⱼ xᵢAᵢⱼxⱼ and differentiate with respect to xₖ.",
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
        "√(\\sigma₁² + \\sigma₂² + ... + \\sigmaₖ²)",
        "√(\\sigmaₖ₊₁² + \\sigmaₖ₊₂² + ... + \\sigmaᵣ²)",
        "\\sigmaₖ₊₁ alone",
        "‖A‖_F / k",
      ],
      correctAnswer: 1,
      explanation:
        "Since the Frobenius norm equals √(\\Sigmaᵢ \\sigmaᵢ²), removing the bottom r−k singular values leaves error √(\\Sigmaᵢ₌ₖ₊₁ʳ \\sigmaᵢ²), i.e., the Frobenius norm of the discarded components.",
      hints: [
        "The full SVD satisfies ‖A‖_F² = \\Sigmaᵢ \\sigmaᵢ²; what remains after keeping only the top k?",
        "The Eckart-Young theorem tells you the error is determined by the discarded singular values.",
      ],
    },
    {
      id: "q-alg-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Low-rank matrix approximation is used in recommendation systems to find latent user and item factors in matrix factorization.",
      correctAnswer: "True",
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
        "Randomized SVD forms a random sketch Y = A\\Omega (where \\Omega is a random Gaussian matrix), orthogonalizes it, and computes an exact SVD of the small projected matrix — achieving near-optimal approximation in O(mnk) instead of O(mn²) time.",
      hints: [
        "The sketch Y = A\\Omega has only k columns, making its SVD cheap to compute exactly.",
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
        "Think about what happens to sample covariance eigenvalues as n, p → ∞ with p/n → \\gamma.",
      ],
    },
    {
      id: "q-alg-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Random matrix theory predicts that the largest eigenvalue of a Gaussian random matrix follows the Tracy-Widom distribution.",
      correctAnswer: "True",
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
      correctAnswer: "True",
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
        "\\sigmaₖ / (\\sigma₁ + \\sigma₂ + ... + \\sigmaᵣ) where \\sigmaᵢ are singular values",
        "\\lambdaₖ / (\\lambda₁ + \\lambda₂ + ... + \\lambdaᵣ) where \\lambdaᵢ are eigenvalues of the covariance matrix",
        "k / total number of features",
        "vₖᵀvₖ where vₖ is the k-th principal component vector",
      ],
      correctAnswer: 1,
      explanation:
        "Each eigenvalue \\lambdaₖ of the covariance matrix equals the variance captured by the k-th principal component; its share of total variance is \\lambdaₖ / \\Sigmaᵢ \\lambdaᵢ = \\sigmaₖ² / \\Sigmaᵢ \\sigmaᵢ² (using singular values of centered data).",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
        "A sum of rank-1 outer products: T ≈ \\Sigmaᵣ aᵣ ⊗ bᵣ ⊗ cᵣ",
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
      correctAnswer: "False",
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
      explanation: `Convolutional neural networks apply 4-dimensional filter tensors to input feature maps. A typical convolutional layer has weight tensors of shape:

$$\\mathcal{W} \\in \\mathbb{R}^{C_{\\text{out}} \\times C_{\\text{in}} \\times k_H \\times k_W}$$

**Step 1: The parameter count problem.** For a layer with 256 output channels, 128 input channels, and $3 \\times 3$ kernels:
$$\\text{Parameters} = 256 \\times 128 \\times 3 \\times 3 \\approx 295{,}000$$

This is expensive for edge deployment.

**Step 2: Tucker decomposition as compression.** Tucker decomposition factorizes the 4-way tensor $\\mathcal{W}$ as:
$$\\mathcal{W} \\approx \\mathcal{G} \\times_1 U_1 \\times_2 U_2 \\times_3 U_3 \\times_4 U_4$$

where $\\mathcal{G}$ is a small **core tensor** and $U_1, U_2, U_3, U_4$ are orthogonal factor matrices.

**Step 3: Compression ratio.** If the core tensor has shape $(r_1, r_2, r_3, r_4)$ with $r_i \\ll$ the original dimension, the compressed parameter count is:
$$\\text{Compressed} = r_1 r_2 r_3 r_4 + C_{\\text{out}} r_1 + C_{\\text{in}} r_2 + k_H r_3 + k_W r_4 \\ll 295{,}000$$

**Step 4: Why this works.** The filters in CNNs often have low Tucker rank — they can be accurately approximated by low-rank factors. This is the foundation of methods like **Tucker Compression** (used in TensorFlow Model Optimization Toolkit) and **CP decomposition** (used inMobileNet-v3).

Therefore, $\\boxed{\\text{Option 1}}$ — tensor decomposition compresses CNN weight tensors for efficient inference.`,
      hints: [
        "A conv layer with 256 output channels, 128 input channels, and $3 \\times 3$ kernels has $256 \\times 128 \\times 3 \\times 3 \\approx 295{,}000$ parameters. Tucker decomposition approximates this with a small core tensor and factor matrices.",
        "Tucker decomposition expresses $\\mathcal{W} \\approx \\mathcal{G} \\times_1 U_1 \\times_2 U_2 \\times_3 U_3 \\times_4 U_4$. The compressed model stores $\\mathcal{G}$ and the factor matrices instead of the full 4D tensor.",
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
      correctAnswer: "True",
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
      explanation: `Spectral clustering works by embedding graph nodes into $\\mathbb{R}^k$ using the eigenvectors of the graph Laplacian, then applying k-means in this embedded space.

**Step 1: The graph Laplacian.** For a graph with adjacency matrix $A$ and degree matrix $D$, the (unnormalized) Laplacian is $L = D - A$. The normalized Laplacian is $L_{\\text{sym}} = D^{-1/2} L D^{-1/2}$.

**Step 2: What do the eigenvectors represent?** The eigenvectors of $L$ encode smooth functions on the graph. If $L\\mathbf{v} = \\lambda \\mathbf{v}$, then:
$$\\sum_{(i,j) \\in E} (v_i - v_j)^2 = \\mathbf{v}^T L \\mathbf{v} = \\lambda \\|\\mathbf{v}\\|^2$$

Small $\\lambda$ means the eigenvector $\\mathbf{v}$ varies little across edges — adjacent nodes have similar values.

**Step 3: The spectral embedding.** The bottom $k$ eigenvectors (ignoring the trivial all-ones eigenvector for connected graphs) give coordinates:
$$\\mathbf{x}_i \\in \\mathbb{R}^k, \\quad \\text{where } x_i^{(j)} = v_j(i)$$

Nodes in the same **densely connected subgraph** will have similar coordinates because the Laplacian smooths over edges.

**Step 4: Why k-means works here.** In the Laplacian eigenbasis, nodes that are tightly connected (same community) cluster together in Euclidean space. This is a **nonlinear** embedding of the graph structure — k-means on original features cannot capture this.

**Why the other options are wrong:**
- Option 0: Eigenvectors can have the same dimension as features — this is not the reason.
- Option 2: k-means can technically be applied to any vectors; the question is why spectral clustering specifically uses it on Laplacian eigenvectors.
- Option 3: Normalizing magnitudes is not the purpose — preserving graph structure is.

Therefore, $\\boxed{\\text{Option 1}}$ — the Laplacian eigenvector embedding captures graph connectivity via Euclidean proximity.`,
      hints: [
        "Recall the Laplacian identity: $\\mathbf{v}^T L \\mathbf{v} = \\frac{1}{2} \\sum_{(i,j) \\in E} (v_i - v_j)^2$. What does a small $\\lambda$ tell you about $v_i$ and $v_j$ for adjacent nodes $i$ and $j$?",
        "If two nodes $i$ and $j$ are in the same dense community, the edge $(i,j)$ contributes little to $\\sum (v_i - v_j)^2$, so they can share similar eigenvector coordinates without increasing the Rayleigh quotient.",
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
      correctAnswer: "True",
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
        "LoRA (Low-Rank Adaptation) fine-tunes a pre-trained weight matrix $W_0$ by parameterizing the update as $\\Delta W = BA$ where $B \\in \\mathbb{R}^{m \\times r}$ and $A \\in \\mathbb{R}^{r \\times n}$ with $r \\ll \\min(m,n)$. The benefit is:",
      options: [
        "LoRA trains faster because the rank-$r$ matrices use less VRAM for gradients and optimizer states",
        "LoRA increases the model's expressiveness by raising its rank",
        "LoRA avoids the need for a learning rate schedule",
        "LoRA replaces attention layers with convolutional layers for efficiency",
      ],
      correctAnswer: 0,
      explanation: `LoRA (Hu et al., 2021) addresses the key bottleneck in fine-tuning large language models: the massive memory cost of training.

**Step 1: The full fine-tuning problem.** A pre-trained weight matrix $W_0 \\in \\mathbb{R}^{m \\times n}$ (e.g., for a language model attention layer) has $m \\times n$ parameters. Full fine-tuning updates all $mn$ parameters and must store gradients and optimizer states for each.

**Step 2: LoRA's low-rank update.** LoRA freezes $W_0$ and approximates the weight update as:
$$\\Delta W = B A, \\quad B \\in \\mathbb{R}^{m \\times r}, \\; A \\in \\mathbb{R}^{r \\times n}$$

with $r \\ll \\min(m, n)$. Only $B$ and $A$ are trained.

**Step 3: Parameter count comparison.** For $W_0 \\in \\mathbb{R}^{4096 \\times 4096}$ with rank $r = 8$:
$$\\text{Full fine-tuning:} \\quad mn = 4096^2 \\approx 16.8 \\text{ million parameters}$$
$$\\text{LoRA:} \\quad mr + rn = 8 \\times 4096 + 8 \\times 4096 \\approx 65{,}536 \\text{ parameters}$$

This is a **250× reduction** in trainable parameters.

**Step 4: Memory savings.** Adam optimizer states require $2\\times$ the parameter count (first and second moment estimates). With LoRA's small $B$ and $A$, the optimizer state memory is tiny compared to full fine-tuning.

**Step 5: Why it works.** Pre-trained language models have low-rank weight updates — the fine-tuning adaptation lives in a small subspace. By explicitly constraining $\\Delta W$ to rank $r$, LoRA captures this structure efficiently.

Therefore, $\\boxed{\\text{Option 0}}$ — LoRA reduces VRAM by training far fewer parameters ($mr + rn \\ll mn$).`,
      hints: [
        "Compare parameter counts: $W_0 \\in \\mathbb{R}^{4096 \\times 4096}$ has $4096^2 \\approx 16.8$M parameters. With $r=8$, LoRA trains $8 \\times 4096 + 8 \\times 4096 \\approx 65$K parameters — roughly 250× fewer.",
        "Adam stores two optimizer states (first and second moments) per trainable parameter. With far fewer trainable parameters, LoRA uses dramatically less VRAM.",
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
      correctAnswer: "True",
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
        "\\Sigmaₖ₌₀^∞ (At)ᵏ / k! (the matrix power series)",
        "The element-wise exponential of A scaled by t",
        "The inverse of (I − At) for small t",
      ],
      correctAnswer: 1,
      explanation:
        "The matrix exponential is defined by the power series \\Sigma(At)ᵏ/k!, directly analogous to the scalar exponential; this converges for all finite matrices and is used to solve linear ODEs dx/dt = Ax.",
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
        "For a diagonalizable matrix A = P\\LambdaP⁻¹, the matrix exponential simplifies to e^A = Pe^\\LambdaP⁻¹ where e^\\Lambda is a diagonal matrix of scalar exponentials.",
      correctAnswer: "True",
      explanation:
        "Diagonalization decouples the matrix power series: e^A = P(\\Sigma \\Lambdaᵏ/k!)P⁻¹ = Pe^\\LambdaP⁻¹, and e^\\Lambda is diagonal with entries e^(\\lambdaᵢ), making computation of the matrix exponential tractable.",
      hints: [
        "Use the power series definition and substitute A = P\\LambdaP⁻¹; what happens to Aᵏ?",
        "Aᵏ = (P\\LambdaP⁻¹)ᵏ = P\\LambdaᵏP⁻¹ because intermediate P⁻¹P terms cancel.",
      ],
    },
    {
      id: "q-alg-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Neural ODEs model continuous-time dynamics by replacing discrete residual layers with solutions to which equation?",
      options: [
        "\\Deltah = Wh + b (discrete linear recurrence)",
        "dh/dt = f(h(t), t, \\theta) solved by an ODE solver from t=0 to t=1",
        "h(t+1) = \\sigma(Ah(t)) (standard RNN update)",
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
        "The DFT matrix with entries Fₖₙ = e^(−2\\piikn/N) / √N",
        "The identity matrix for periodic signals",
        "A sparse triangular matrix",
      ],
      correctAnswer: 1,
      explanation:
        "The DFT matrix F has entries Fₖₙ = \\omega^(kn) where \\omega = e^(−2\\pii/N); it is a unitary matrix (FF* = I) enabling the DFT to be viewed as a change of basis to the Fourier basis of complex exponentials.",
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
      correctAnswer: "True",
      explanation:
        "The Cooley-Tukey FFT algorithm recursively splits the DFT into smaller DFTs using the symmetry \\omega^(2k) = (\\omega²)^k, reducing O(n²) matrix-vector multiplication to O(n log n) butterfly operations.",
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
        "The Mahalanobis distance between point x and distribution with mean \\mu and covariance \\Sigma is:",
      options: [
        "‖x − \\mu‖₂ (standard Euclidean distance)",
        "√((x − \\mu)ᵀ\\Sigma⁻¹(x − \\mu))",
        "(x − \\mu)ᵀ\\Sigma(x − \\mu)",
        "\\Sigma\\Sigmaᵢ(xᵢ − \\muᵢ)² / \\sigmaᵢ",
      ],
      correctAnswer: 1,
      explanation:
        "Mahalanobis distance accounts for feature correlations and different scales by whitening the space with \\Sigma⁻¹; when \\Sigma = I it reduces to Euclidean distance.",
      hints: [
        "Standard Euclidean distance treats all directions equally; Mahalanobis accounts for covariance structure.",
        "The \\Sigma⁻¹ term stretches the space to decorrelate and normalize each dimension.",
      ],
    },
    {
      id: "q-alg-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The sample covariance matrix S = (1/(n−1)) \\Sigmaᵢ (xᵢ − x̄)(xᵢ − x̄)ᵀ is an unbiased estimator of the population covariance matrix \\Sigma.",
      correctAnswer: "True",
      explanation:
        "The denominator (n−1) instead of n corrects for the degrees of freedom lost by estimating the mean x̄ from data, making E[S] = \\Sigma — the Bessel correction.",
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
      correctAnswer: "True",
      explanation:
        "For quadratic objectives f(x) = xᵀAx/2, gradient descent convergence rate is (κ−1)/(κ+1) per iteration where κ = \\sigma_max/\\sigma_min; ill-conditioned problems (large κ) force tiny step sizes and slow convergence.",
      hints: [
        "The optimal step size for gradient descent on a quadratic is 2/(\\lambda_max + \\lambda_min).",
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
        "The Fisher information matrix F = E[\\nablalog p(x|\\theta) \\nablalog p(x|\\theta)ᵀ]",
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
      correctAnswer: "False",
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
      question: "The adjacency matrix $A$ of an undirected graph satisfies:",
      options: [
        "$A_{ij} = 1$ if there is a directed edge from $i$ to $j$ only",
        "$A = A^T$ (symmetric) with $A_{ij} = 1$ if nodes $i$ and $j$ are connected",
        "$A_{ii} = 1$ for all diagonal entries (self-loops)",
        "$A$ has all positive eigenvalues",
      ],
      correctAnswer: 1,
      explanation: `The adjacency matrix $A$ of an undirected graph encodes which vertices are connected by edges.

**Step 1: Definition.** For an undirected graph with $n$ vertices:
$$A_{ij} = \\begin{cases} 1 & \\text{if vertices } i \\text{ and } j \\text{ are connected by an edge} \\\\ 0 & \\text{otherwise} \\end{cases}$$

**Step 2: Symmetry.** Since edges in an undirected graph have no direction — an edge between $i$ and $j$ means $j$ is connected to $i$ as well — the matrix must satisfy:
$$A_{ij} = A_{ji} \\implies A = A^T$$

This means $A$ is a **symmetric matrix**.

**Step 3: Why the other options are wrong.**
- Option 0: This describes a **directed graph** adjacency matrix (where $A_{ij} \\neq A_{ji}$ in general).
- Option 2: Self-loops ($A_{ii} = 1$) are not present in standard graph definitions unless explicitly added. Most simple undirected graphs have $A_{ii} = 0$.
- Option 3: Symmetric matrices have real eigenvalues, but they need not all be positive. For example, a path graph can have negative eigenvalues.

Therefore, $\\boxed{A = A^T \\text{ (symmetric) with } A_{ij} = 1 \\text{ if nodes } i \\text{ and } j \\text{ are connected}}$ is correct.`,
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
        "The $(i, j)$ entry of the matrix $A^k$ (the $k$-th power of the adjacency matrix) counts the number of walks of length exactly $k$ between nodes $i$ and $j$.",
      correctAnswer: "True",
      explanation: `This is a fundamental property of the adjacency matrix, proven by induction on $k$.

**Step 1: Base case $k = 1$.** By definition, $A_{ij} = 1$ if and only if there is an edge between $i$ and $j$ — a walk of length 1. So the claim holds for $k = 1$.

**Step 2: Inductive step.** Assume $(A^k)_{ij}$ counts walks of length $k$ from $i$ to $j$. Then:
$$(A^{k+1})_{ij} = \\sum_{\\ell=1}^n (A^k)_{i\\ell} \\cdot A_{\\ell j}$$

Each term $(A^k)_{i\\ell} \\cdot A_{\\ell j}$ counts walks of length $k$ from $i$ to $\\ell$ followed by an edge from $\\ell$ to $j$ (a walk of length 1). Summing over all intermediate nodes $\\ell$ gives all walks of length $k+1$ from $i$ to $j$.

**Step 3: Walks vs. paths.** Note that this counts **walks** (which may revisit nodes), not simple **paths** (which do not revisit nodes).

**Step 4: Example.** For $k=2$: $(A^2)_{ij} = \\sum_\\ell A_{i\\ell} A_{\\ell j}$. The term $A_{i\\ell} A_{\\ell j}$ is 1 if $\\ell$ is a common neighbor of $i$ and $j$, so $(A^2)_{ij}$ counts common neighbors — the number of length-2 walks.

This property is used in spectral GNNs: polynomial filters $p(L) = p_0 I + p_1 L + p_2 L^2 + \\cdots$ use powers of $L$ to aggregate information from multi-hop neighbors.

Therefore, $\\boxed{\\text{True}}$ — $(A^k)_{ij}$ counts walks of length $k$ from $i$ to $j$.`,
      hints: [
        "Verify for $k=2$: $(A^2)_{ij} = \\sum_\\ell A_{i\\ell} A_{\\ell j}$. Each term $A_{i\\ell} A_{\\ell j}$ is 1 if $\\ell$ is a common neighbor of $i$ and $j$, so $(A^2)_{ij}$ counts common neighbors — i.e., walks of length 2.",
        "Proof by induction: if $(A^k)_{ij}$ counts walks of length $k$ from $i$ to $j$, then $(A^{k+1})_{ij} = \\sum_\\ell (A^k)_{i\\ell} A_{\\ell j}$ adds one more step, counting walks of length $k+1$."
      ],
    },
    {
      id: "q-alg-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In graph neural networks, the normalized Laplacian $\\tilde{L} = D^{-1/2} L D^{-1/2}$ is preferred over the raw Laplacian for message passing because:",
      options: [
        "The normalized Laplacian is always invertible unlike the raw Laplacian",
        "Normalization bounds eigenvalues to $[0, 2]$, preventing gradient explosion in deep GNNs and accounting for different node degrees",
        "The normalized Laplacian is sparse and the raw Laplacian is dense",
        "Normalization makes the Laplacian asymmetric, enabling directed graph modeling",
      ],
      correctAnswer: 1,
      explanation: `The normalized Laplacian $\\tilde{L} = D^{-1/2}LD^{-1/2}$ addresses two key problems with the raw Laplacian in deep GNNs.

**Step 1: Raw Laplacian issues.** For a graph with degree heterogeneity (some nodes with degree 1000, others with degree 3), the raw Laplacian $L = D - A$ has eigenvalues unbounded by graph structure. In deep GNNs, repeated message passing with $L$ amplifies some directions exponentially, causing gradient explosion or vanishing.

**Step 2: Eigenvalue bound of normalized Laplacian.** The normalized Laplacian $\\tilde{L} = D^{-1/2}LD^{-1/2}$ satisfies:
$$0 = \\lambda_1 \\leq \\lambda_2 \\leq \\cdots \\leq \\lambda_n \\leq 2$$

This eigenvalue bound $[0, 2]$ holds for **any** graph, regardless of degree distribution. Message passing with $\\tilde{L}^k$ never amplifies directions by more than $2^k$.

**Step 3: Degree-aware aggregation.** In message passing, the raw Laplacian uses:
$$h_i^{(k+1)} = \\sigma\\left(\\sum_j L_{ij} h_j^{(k)}\\right)$$

High-degree nodes (large $L_{ij}$ values) dominate this aggregation. The normalized Laplacian uses:
$$h_i^{(k+1)} = \\sigma\\left(\\sum_j \\frac{1}{\\sqrt{d_i d_j}} A_{ij} \\, h_j^{(k)}\\right)$$

This **symmetric normalization** scales messages by $1/\\sqrt{d_i d_j}$, ensuring a node with 1000 neighbors contributes equally to one with 3 neighbors.

**Step 4: Why asymmetry is not the goal.** Option 3 is wrong because $\\tilde{L}$ is still **symmetric** ( $\\tilde{L}^T = \\tilde{L}$ ) — degree normalization does not introduce asymmetry.

Therefore, $\\boxed{\\text{Option 1}}$ — normalization bounds eigenvalues to $[0,2]$ and handles degree heterogeneity.`,
      hints: [
        "The normalized Laplacian satisfies $0 \\leq \\lambda_i(\\tilde{L}) \\leq 2$ for all $i$, regardless of graph structure. This means $\\|\\tilde{L}\\|_2 \\leq 2$, so repeated message passing does not cause exponential gradient growth.",
        "In raw Laplacian aggregation, a node with 1000 neighbors contributes 1000× more than a node with 1 neighbor. In normalized aggregation, each edge contributes $\\frac{1}{\\sqrt{d_i d_j}}$ — balancing the influence of high- and low-degree nodes."
      ]
    },
  ],

  "linear-algebra-quantum": [
    {
      id: "q-alg-kp29-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In quantum computing, a qubit state is represented as a unit vector in \\mathbb{C}² with state |\\psi⟩ = \\alpha|0⟩ + \\beta|1⟩. The constraint on \\alpha and \\beta is:",
      options: [
        "\\alpha + \\beta = 1 (probabilities sum to 1)",
        "|\\alpha|² + |\\beta|² = 1 (squared magnitudes sum to 1)",
        "\\alpha = \\beta (equal superposition always)",
        "\\alpha, \\beta ∈ {0, 1} (classical bits)",
      ],
      correctAnswer: 1,
      explanation:
        "Measurement probabilities are |\\alpha|² and |\\beta|², which must sum to 1 (Born rule); the state vector |\\psi⟩ must be a unit vector in \\mathbb{C}² under the L2 norm ‖|\\psi⟩‖ = 1.",
      hints: [
        "The probability of measuring outcome 0 is |\\alpha|², not \\alpha — what must these probabilities sum to?",
        "This is the condition that |\\psi⟩ is a unit vector in the Hilbert space \\mathbb{C}².",
      ],
    },
    {
      id: "q-alg-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Quantum gates are represented by unitary matrices (UU† = I), which preserves the norm of qubit state vectors.",
      correctAnswer: "True",
      explanation:
        "Unitary matrices are quantum computing\'s analog of orthogonal matrices over \\mathbb{C}; they preserve inner products (and thus norms) ensuring probability is conserved throughout a quantum computation.",
      hints: [
        "Quantum evolution must preserve ‖|\\psi⟩‖ = 1 at all times — what matrix property ensures this?",
        "UU† = I means ‖U|\\psi⟩‖ = ‖|\\psi⟩‖ — same argument as orthogonal matrices over \\mathbb{R}.",
      ],
    },
    {
      id: "q-alg-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Quantum entanglement between two qubits means their joint state vector CANNOT be written as a tensor product |\\psi₁⟩ ⊗ |\\psi₂⟩. This is detected by:",
      options: [
        "Computing the trace of the joint state matrix",
        "Performing SVD on the state matrix reshaped into a 2×2 matrix; entanglement exists iff the matrix has rank > 1",
        "Checking whether both qubits have the same state vector",
        "Computing the Kronecker product of the two qubit states",
      ],
      correctAnswer: 1,
      explanation: `Entanglement detection uses the Schmidt decomposition of the two-qubit state.

**Step 1: The state vector.** A two-qubit state $|\psi\\rangle \\in \\mathbb{C}^4$ can be written in the computational basis as:
$$|\\psi\\rangle = \\sum_{i,j=0}^1 \\alpha_{ij} |i\\rangle \\otimes |j\\rangle, \\quad \\sum_{i,j} |\\alpha_{ij}|^2 = 1$$

**Step 2: Reshape to a matrix.** Define the $2 \\times 2$ matrix $M$ with entries $M_{ij} = \\alpha_{ij}$:
$$M = \\begin{pmatrix} \\alpha_{00} & \\alpha_{01} \\\\ \\alpha_{10} & \\alpha_{11} \\end{pmatrix}$$

**Step 3: SVD of the matrix.** Perform SVD on $M$:
$$M = U \\Sigma V^\\dagger$$

**Step 4: The Schmidt criterion.** The number of non-zero singular values of $M$ equals the **Schmidt rank**. 

- If $\\operatorname{rank}(M) = 1$: $|\psi\\rangle$ is a **product state** $|\psi\\rangle = |\\psi_1\\rangle \\otimes |\\psi_2\\rangle$ (not entangled).
- If $\\operatorname{rank}(M) > 1$: $|\psi\\rangle$ is **entangled**.

**Step 5: Example — Bell state.** The Bell state $|\psi^+\\rangle = \\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$ has:
$$M = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = \\frac{1}{\\sqrt{2}}I$$

which has full rank 2 (two equal singular values) — maximally entangled.

Therefore, $\\boxed{\\text{Option 1}}$ — SVD of the reshaped state matrix detects entanglement via rank exceeding 1.`,
      hints: [
        "A product state $|\\psi_1\\rangle \\otimes |\\psi_2\\rangle$ reshapes to $M = |\\psi_1\\rangle\\langle\\psi_2^*|$, which is a rank-1 matrix (outer product of two vectors).",
        "The Schmidt decomposition: $M = \\sum_k \\sigma_k |u_k\\rangle\\langle v_k|$. The number of non-zero $\\sigma_k$ is the Schmidt rank. If it is 1, the state is a product state; if > 1, it is entangled."
      ]
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
      correctAnswer: "False",
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
        "The condition number ratio \\sigma_max/\\sigma_min tells you how much more the matrix stretches some directions vs. others.",
        "Think about how gradient descent behaves on a very elongated quadratic bowl (high condition number Hessian).",
      ],
    },
  ],
};

const moreAlgQ: Record<string, Question[]> = {
  "matrix-factorizations": [
    { id: "q-alg-kp31-1", type: "multiple-choice", difficulty: "medium", question: "Which matrix factorization is used by recommendation systems to decompose a user-item ratings matrix R ≈ UV^T where U ∈ \\mathbb{R}^{m×k} and V ∈ \\mathbb{R}^{n×k}?", options: ["QR decomposition", "Non-negative Matrix Factorization (NMF)", "LU decomposition", "Cholesky decomposition"], correctAnswer: 1, explanation: "NMF constrains both U and V to have non-negative entries, producing parts-based representations. For user-item matrices it gives interpretable latent factors (topics/genres). Collaborative filtering variants (SVD++) extend this.", hints: ["Non-negativity constraint ensures factors represent additive parts.", "Netflix Prize solutions used variants of this factorization."] },
    { id: "q-alg-kp31-2", type: "true-false", difficulty: "medium", question: "The Cholesky factorization A = LL^T exists if and only if A is symmetric positive definite (SPD).", correctAnswer: "True", explanation: "Cholesky factorization requires the matrix to be symmetric positive definite. It is twice as efficient as LU for SPD matrices and is widely used in probabilistic ML (Gaussian processes, Kalman filters) for stable log-determinant computation.", hints: ["For Gaussian processes, the covariance matrix K is SPD — Cholesky is used to solve K\\alpha = y.", "If A has a zero or negative eigenvalue, Cholesky fails (Cholesky pivot becomes imaginary)."] },
    { id: "q-alg-kp31-3", type: "multiple-choice", difficulty: "hard", question: "The CUR decomposition decomposes a matrix A ≈ CUR where C are actual columns of A, R are actual rows, and U is a small matrix. Its advantage over SVD for large sparse matrices is:", options: ["CUR gives exact reconstruction while SVD is approximate", "CUR preserves sparsity and interpretability since C and R are original data columns/rows", "CUR is always faster to compute than SVD", "CUR requires fewer parameters than SVD for the same approximation quality"], correctAnswer: 1, explanation: "CUR selects actual columns and rows (often via leverage score sampling), preserving sparsity and interpretability. SVD produces dense singular vectors that are linear combinations of all features — uninterpretable for sparse genomics/text data.", hints: ["Leverage scores identify the most 'important' columns/rows for selection.", "In genomics, CUR's selected columns/rows correspond to actual genes and samples."] },
  ],
  "numerical-linear-algebra": [
    { id: "q-alg-kp32-1", type: "multiple-choice", difficulty: "medium", question: "The conjugate gradient (CG) method for solving Ax = b requires A to be:", options: ["Any square matrix", "Symmetric positive definite (SPD)", "Orthogonal", "Diagonal"], correctAnswer: 1, explanation: "CG minimizes the A-norm of the error over Krylov subspaces and is guaranteed to converge only for SPD systems. For non-symmetric or indefinite systems, variants like GMRES or MINRES are used.", hints: ["CG interprets Ax = b as minimizing f(x) = ½x^TAx - b^Tx over conjugate directions.", "For non-SPD matrices, GMRES (which stores more Krylov vectors) is the standard alternative."] },
    { id: "q-alg-kp32-2", type: "true-false", difficulty: "easy", question: "Gaussian elimination with partial pivoting (GEPP) is numerically stable for all matrices.", correctAnswer: "False", explanation: "GEPP is stable in practice for most matrices but not theoretically for all. Pathological cases exist where the growth factor is exponential. However, such cases are extremely rare, and GEPP is the standard in LAPACK/MATLAB.", hints: ["The growth factor bounds stability — partial pivoting keeps it O(2^n) in the worst case.", "Complete pivoting is more stable but also more expensive and rarely needed in practice."] },
    { id: "q-alg-kp32-3", type: "multiple-choice", difficulty: "hard", question: "Preconditioning in iterative solvers (like CG or GMRES) works by solving M⁻¹Ax = M⁻¹b instead of Ax = b. The ideal preconditioner M would be:", options: ["M = I (identity matrix)", "M = A (the original matrix)", "M ≈ A such that M⁻¹ is cheap to apply and κ(M⁻¹A) ≪ κ(A)", "M = A^T (transpose)"], correctAnswer: 2, explanation: "The ideal preconditioner approximates A well (so M⁻¹A ≈ I with condition number near 1) while being cheap to invert. Common choices: incomplete LU (ILU), algebraic multigrid (AMG), and diagonal (Jacobi) preconditioners.", hints: ["If M = A then M⁻¹A = I — perfect but solving Mx=b costs as much as the original problem.", "Condition number κ(M⁻¹A) determines CG convergence rate — lower is faster."] },
  ],
  "tensors-and-multilinear": [
    { id: "q-alg-kp33-1", type: "multiple-choice", difficulty: "hard", question: "The CP (CANDECOMP/PARAFAC) decomposition of a 3-way tensor T ≈ \\Sigmaᵣ aᵣ ⊗ bᵣ ⊗ cᵣ is analogous to matrix rank-1 decomposition. Unlike matrices, computing the exact CP rank of a tensor is:", options: ["Always polynomial time via SVD generalization", "NP-hard in general", "Solved by the higher-order SVD (HOSVD)", "Equivalent to Tucker decomposition"], correctAnswer: 1, explanation: "Computing exact tensor rank (CP rank) is NP-hard in general — a fundamental difference from matrices. Practical algorithms like alternating least squares (ALS) find approximate CP decompositions. This matters for neural network tensor decomposition and signal separation.", hints: ["Unlike matrices where rank = number of nonzero singular values, tensor rank has no clean spectral characterization.", "ALS for CP alternates optimizing one factor matrix while fixing others — not guaranteed to converge to global optimum."] },
    { id: "q-alg-kp33-2", type: "true-false", difficulty: "medium", question: "The Tucker decomposition of a tensor generalizes matrix SVD by computing a core tensor G and factor matrices for each mode, giving a multilinear generalization of SVD.", correctAnswer: "True", explanation: "Tucker decomposition T ≈ G ×₁ A ×₂ B ×₃ C where G is the core tensor and A, B, C are orthogonal factor matrices — a direct generalization of SVD to higher-order tensors. HOSVD computes this via sequential SVDs on mode-unfoldings.", hints: ["Tucker generalizes: matrix SVD is Tucker with G diagonal (and scalar factors = singular values).", "HOSVD unfolds the tensor along each mode and computes truncated SVD — simple but not optimal."] },
    { id: "q-alg-kp33-3", type: "multiple-choice", difficulty: "medium", question: "In deep learning, tensor decomposition methods (CP, Tucker) are applied to weight tensors in neural networks primarily to:", options: ["Improve training accuracy", "Reduce model size and inference cost by replacing large weight tensors with low-rank factors", "Increase the number of parameters", "Enable batch normalization"], correctAnswer: 1, explanation: "Tensor decomposition compresses neural network weight tensors (especially in CNNs and transformers) by expressing them as products of smaller factor matrices/tensors, reducing parameters and FLOPs with minimal accuracy loss — a key model compression technique.", hints: ["A 4D convolutional weight tensor can be CP-decomposed into 4 small matrices.", "Tucker decomposition of transformer weight matrices reduces attention head dimensions."] },
  ],
  "probabilistic-linear-algebra": [
    { id: "q-alg-kp34-1", type: "multiple-choice", difficulty: "hard", question: "Randomized SVD (Halko et al.) computes a rank-k approximation Â ≈ U\\SigmaV^T in O(mn log k + (m+n)k²) instead of O(mn min(m,n)) for full SVD. The key step is:", options: ["Directly computing the top-k singular values via power iteration", "Forming a random sketch Y = A\\Omega where \\Omega ∈ \\mathbb{R}^{n×(k+p)}, then computing QR(Y) to get an approximate column space of A", "Running Lanczos iteration on A^TA", "Applying the fast Johnson-Lindenstrauss transform"], correctAnswer: 1, explanation: "Randomized SVD projects A onto a small random subspace Y = A\\Omega, orthogonalizes via QR, then computes the exact SVD of the small matrix Q^TA. Power iteration steps (Y = (AA^T)^q A\\Omega) improve accuracy for slowly-decaying singular values.", hints: ["The sketch Y captures the range of A with high probability via JL-type concentration.", "sklearn.utils.extmath.randomized_svd implements this — default for TruncatedSVD with n_components ≪ min(m,n)."] },
    { id: "q-alg-kp34-2", type: "true-false", difficulty: "medium", question: "In Gaussian processes, the log marginal likelihood requires computing log|K| (log-determinant of the covariance matrix), which is computed stably via the Cholesky factor L as 2·\\Sigmaᵢ log Lᵢᵢ.", correctAnswer: "True", explanation: "Since K = LL^T for SPD K, log|K| = log|L|² = 2·\\Sigmaᵢ log Lᵢᵢ. This avoids numerical issues from directly computing the determinant of a large matrix (which can overflow/underflow). This is the standard implementation in GPyTorch and GPflow.", hints: ["Direct determinant computation is unstable for large matrices — products of eigenvalues can overflow.", "The Cholesky diagonal entries Lᵢᵢ > 0 always (for SPD K), so logs are well-defined."] },
    { id: "q-alg-kp34-3", type: "multiple-choice", difficulty: "hard", question: "Stochastic trace estimation approximates tr(A) ≈ (1/s)·\\Sigmaᵢ zᵢ^T A zᵢ where zᵢ are random vectors. This is used in GP hyperparameter optimization because:", options: ["It avoids storing the matrix A entirely", "Computing tr(K⁻¹dK/d\\theta) for GP log-likelihood gradients requires O(n³) exactly, but stochastic estimation with CG reduces this to O(n²) per gradient", "Trace estimation is always exact for Gaussian random vectors", "It replaces the need for matrix multiplication"], correctAnswer: 1, explanation: "GP log-likelihood gradients require tr(K⁻¹dK/d\\theta). Hutchinson's estimator approximates the trace stochastically, and each matrix-vector product K⁻¹v is computed via CG — giving O(n²) per CG iteration vs O(n³) for Cholesky. This enables GPs to scale to millions of points (GPyTorch's BBMM).", hints: ["Hutchinson estimator: tr(A) ≈ E[z^TAz] for z ~ Rademacher or Gaussian.", "GPyTorch uses this with Lanczos + CG to scale GPs to n > 10^6."] },
  ],
  "spectral-methods": [
    { id: "q-alg-kp35-1", type: "multiple-choice", difficulty: "medium", question: "Spectral clustering uses the eigenvectors of the graph Laplacian L = D - A (where D is degree matrix, A is adjacency matrix). The number of zero eigenvalues of L equals:", options: ["The number of vertices", "The number of edges", "The number of connected components", "The algebraic connectivity"], correctAnswer: 2, explanation: "The multiplicity of the zero eigenvalue of the graph Laplacian equals the number of connected components. The second smallest eigenvalue \\lambda₂ (Fiedler value) measures algebraic connectivity — larger \\lambda₂ means a better-connected graph.", hints: ["Each connected component contributes one zero eigenvalue with eigenvector = indicator of that component.", "Spectral clustering on k clusters uses the bottom k eigenvectors of L (or normalized Laplacian)."] },
    { id: "q-alg-kp35-2", type: "true-false", difficulty: "medium", question: "The normalized graph Laplacian L_sym = D^{-1/2}LD^{-1/2} has eigenvalues in [0, 2], and its use in spectral clustering is preferred over the unnormalized Laplacian for graphs with varying node degrees.", correctAnswer: "True", explanation: "The normalized Laplacian accounts for degree heterogeneity — high-degree nodes don't dominate the spectral embedding. Its eigenvalues lie in [0,2], with 0 for disconnected components and 2 for bipartite components. This gives more balanced clusters for real-world graphs.", hints: ["Unnormalized Laplacian eigenvectors can be biased toward high-degree nodes.", "Normalized Laplacian corresponds to a random walk: L_rw = D⁻¹L with the same spectrum."] },
    { id: "q-alg-kp35-3", type: "multiple-choice", difficulty: "hard", question: "The Cheeger inequality relates the Fiedler value \\lambda₂ of the normalized Laplacian to the graph's conductance \\phi(G). The bound is:", options: ["\\lambda₂/2 ≤ \\phi(G) ≤ √(2\\lambda₂)", "\\lambda₂ = \\phi(G) exactly", "\\phi(G) ≤ \\lambda₂ always", "\\lambda₂ ≤ \\phi(G)/2 always"], correctAnswer: 0, explanation: "The Cheeger inequality \\lambda₂/2 ≤ \\phi(G) ≤ √(2\\lambda₂) provides a spectral certificate for graph expansion. Small \\lambda₂ implies a graph bottleneck (easy cut), and the spectral sweep algorithm finds a cut achieving conductance O(√\\lambda₂).", hints: ["Conductance \\phi(G) = min_S |E(S,S̄)|/(min(vol(S),vol(S̄))) — the bottleneck ratio.", "Small \\lambda₂ ≈ 0 means the graph is nearly disconnected — spectral clustering finds the cut."] },
  ],
  "matrix-calculus-v2": [
    { id: "q-alg-kp36-1", type: "multiple-choice", difficulty: "medium", question: "The gradient of $f(X) = \\operatorname{tr}(AX)$ with respect to matrix $X$ is:", options: ["$A$", "$A^T$", "$X^TA^T$", "$\\operatorname{tr}(A) \\cdot I$"], correctAnswer: 1, explanation: `Using the matrix derivative identity, let us derive $\\frac{\\partial \\operatorname{tr}(AX)}{\\partial X}$.

**Step 1: Use the differential.** The differential of $f(X) = \\operatorname{tr}(AX)$ is:
$$df = \\operatorname{tr}(A \\, dX)$$

**Step 2: Apply the trace inner product identity.** For any matrix $M$, the inner product with $dX$ can be rewritten using the cyclic property of trace:
$$\\operatorname{tr}(A \\, dX) = \\operatorname{tr}((A^T)^T \\, dX) = \\left\\langle A^T, \\, dX \\right\\rangle$$

**Step 3: Identify the gradient.** By the definition of the matrix gradient: if $df = \\operatorname{tr}(G^T dX)$ for all $dX$, then $\\frac{\\partial f}{\\partial X} = G$. Here $G = A^T$.

**Verification for backpropagation:** If the forward pass is $Y = WX$ and the loss is $L$, then by the chain rule:
$$\\frac{\\partial L}{\\partial W} = \\left(\\frac{\\partial L}{\\partial Y}\\right) X^T$$

This is the matrix generalization of the scalar gradient $\\frac{\\partial}{\\partial w}(Xw - y)^2 = 2X^T(Xw - y)$.

Therefore, $\\boxed{A^T}$ is the correct gradient.`, hints: ["The key identity is $d\\operatorname{tr}(AX) = \\operatorname{tr}(A\\,dX)$. What matrix $G$ satisfies $d\\operatorname{tr}(AX) = \\operatorname{tr}(G^T\\, dX)$ for all $dX$?", "Using the cyclic property of trace: $\\operatorname{tr}(A\\,dX) = \\operatorname{tr}((A^T)^T\\,dX)$ — this identifies the gradient as $A^T$."] },
    { id: "q-alg-kp36-2", type: "true-false", difficulty: "medium", question: "The Jacobian of a vector-valued function $f: \\mathbb{R}^n \\to \\mathbb{R}^m$ is an $m \\times n$ matrix where entry $(i,j)$ is $\\frac{\\partial f_i}{\\partial x_j}$.", correctAnswer: "True", explanation: `This statement is **true**. Let us verify the dimensions and entries carefully.

**Step 1: Dimensions.** $f$ maps from $\\mathbb{R}^n$ (input dimension $n$) to $\\mathbb{R}^m$ (output dimension $m$). The Jacobian $J$ is the matrix of all first-order partial derivatives:
$$J \\in \\mathbb{R}^{m \\times n}$$

**Step 2: Entry formula.** The entry in row $i$, column $j$ of $J$ is:
$$J_{ij} = \\frac{\\partial f_i}{\\partial x_j}$$

where $f_i$ is the $i$-th component of the output and $x_j$ is the $j$-th component of the input.

**Step 3: Full matrix form.** Writing it out:
$$J = \\begin{pmatrix} \\frac{\\partial f_1}{\\partial x_1} & \\frac{\\partial f_1}{\\partial x_2} & \\cdots & \\frac{\\partial f_1}{\\partial x_n} \\\\ \\frac{\\partial f_2}{\\partial x_1} & \\frac{\\partial f_2}{\\partial x_2} & \\cdots & \\frac{\\partial f_2}{\\partial x_n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ \\frac{\\partial f_m}{\\partial x_1} & \\frac{\\partial f_m}{\\partial x_2} & \\cdots & \\frac{\\partial f_m}{\\partial x_n} \\end{pmatrix}$$

**Step 4: Special cases.** For $m = 1$ (scalar function), the Jacobian reduces to the gradient row vector. For $n = 1$, it is a column vector of partial derivatives.

**Step 5: Backpropagation connection.** In reverse-mode automatic differentiation (used in PyTorch/JAX), the vector-Jacobian product $\\mathbf{v}^T J$ is computed without ever materializing the full Jacobian $J$ — this is the computational foundation of efficient gradient computation.

Therefore, $\\boxed{\\text{True}}$ — the Jacobian has shape $m \\times n$ with $J_{ij} = \\partial f_i / \\partial x_j$.`, hints: ["For a scalar function $f: \\mathbb{R}^n \\to \\mathbb{R}$ (i.e., $m=1$), the Jacobian has shape $1 \\times n$ and is simply the gradient row vector $\\nabla f$.", "In backpropagation, we never compute the full Jacobian explicitly — we only need vector-Jacobian products $\\mathbf{v}^T J$, which can be computed efficiently by chain-ruling through the computation graph."] },
    { id: "q-alg-kp36-3", type: "multiple-choice", difficulty: "hard", question: "The gradient of $f(W) = \\frac{1}{2}\\|Y - WX\\|_F^2$ with respect to $W$ (Frobenius norm loss for linear regression with matrix outputs) is:", options: ["$-(Y - WX)$", "$-(Y - WX)X^T$", "$(WX - Y)^T X$", "$X(Y - WX)^T$"], correctAnswer: 1, explanation: `Let us derive the gradient step by step using the chain rule and matrix differential calculus.

**Step 1: Set up the loss.** Define the error matrix $E = Y - WX$. Then:
$$f(W) = \\frac{1}{2} \\|E\\|_F^2 = \\frac{1}{2} \\operatorname{tr}(EE^T)$$

**Step 2: Compute the differential.** Using $dE = -dW \\cdot X$:
\\begin{align}
df &= \\frac{1}{2} \\operatorname{tr}(dE \\cdot E^T + E \\cdot dE^T) = \\operatorname{tr}(E \\cdot dE^T) \\\\
&= \\operatorname{tr}\\big(E \\cdot (-X^T dW^T)\\big) = -\\operatorname{tr}\\big((EX^T)^T dW\\big)
\\end{align}

**Step 3: Identify the gradient.** By the trace identity, if $df = \\operatorname{tr}(G^T dW)$, then $\\frac{\\partial f}{\\partial W} = G$. Here:
$$df = -\\operatorname{tr}\\big((EX^T)^T dW\\big) \\implies \\frac{\\partial f}{\\partial W} = -EX^T = -(Y - WX)X^T$$

**Step 4: Vector case check.** For the scalar case with $w \\in \\mathbb{R}^n$, $y \\in \\mathbb{R}^m$, and $X \\in \\mathbb{R}^{n \\times m}$, the gradient of $\\frac{1}{2}\\|y - Xw\\|^2$ is $X(Xw - y)$. The matrix case $-(Y - WX)X^T = (WX - Y)X^T$ is the direct generalization.

**Why the other options are wrong:**
- Option 0: $-(Y - WX)$ has the wrong shape — it ignores the $X^T$ factor from the chain rule.
- Option 2: $(WX - Y)^T X$ is the transpose of the correct answer, wrong shape.
- Option 3: $X(Y - WX)^T$ has the wrong arrangement of terms.

Therefore, $\\boxed{-(Y - WX)X^T}$ is the correct gradient.`,
      hints: [
        "Apply the chain rule: $\\frac{\\partial f}{\\partial W} = \\frac{\\partial \\frac{1}{2}\\|E\\|_F^2}{\\partial E} \\cdot \\frac{\\partial E}{\\partial W}$ where $E = Y - WX$. What is $\\frac{\\partial \\frac{1}{2}\\|E\\|_F^2}{\\partial E}$?",
        "Using the differential: $df = \\operatorname{tr}(E \\cdot dE^T) = \\operatorname{tr}(E(-X^T dW^T)) = -\\operatorname{tr}((EX^T)^T dW)$. What matrix $G$ satisfies $df = \\operatorname{tr}(G^T dW)$?"
      ]
    },
  ],
  "low-rank-approximation": [
    { id: "q-alg-kp37-1", type: "multiple-choice", difficulty: "medium", question: "LoRA (Low-Rank Adaptation) for fine-tuning large language models represents weight updates as $\\Delta W = BA$ where $B \\in \\mathbb{R}^{d \\times r}$ and $A \\in \\mathbb{R}^{r \\times k}$ with $r \\ll \\min(d,k)$. This reduces trainable parameters because:", options: ["It eliminates the need for backpropagation", "Instead of training a $d \\times k$ matrix ($dk$ parameters), only $B$ and $A$ are trained ($r(d+k)$ parameters $\\ll dk$ for small $r$)", "It compresses the base model weights", "It removes attention heads"], correctAnswer: 1, explanation: `LoRA (Hu et al., 2021) reduces the parameter count of fine-tuning by exploiting low-rank structure in weight updates.

**Step 1: Full fine-tuning.** A pre-trained weight matrix $W_0 \\in \\mathbb{R}^{d \\times k}$ has $dk$ parameters. Full fine-tuning updates all of them and stores gradients and Adam optimizer states for each.

**Step 2: LoRA's parameterization.** LoRA freezes $W_0$ and represents the update as:
$$\\Delta W = B A, \\quad B \\in \\mathbb{R}^{d \\times r}, \\; A \\in \\mathbb{R}^{r \\times k}$$

**Step 3: Parameter count.** With $r \\ll \\min(d, k)$:
$$\\text{LoRA parameters} = dr + rk = r(d+k)$$

For a $4096 \\times 4096$ weight matrix with $r = 8$:
$$\\text{Full:} \\; 4096^2 \\approx 16.8 \\text{M params} \\quad vs. \\quad \\text{LoRA:} \\; 8 \\times 4096 + 8 \\times 4096 \\approx 65{,}536 \\text{ params}$$

**Step 4: Memory reduction.** The base model weights $W_0$ are frozen (forward only), and only $B$ and $A$ require gradient storage and optimizer states. This enables fine-tuning large models on consumer GPUs.

Therefore, $\\boxed{\\text{Option 1}}$ — LoRA reduces trainable parameters from $dk$ to $r(d+k) \\ll dk$.`, hints: ["Count parameters: a $d \\times k$ matrix needs $dk$ parameters, while LoRA's $B \\in \\mathbb{R}^{d \\times r}$ and $A \\in \\mathbb{R}^{r \\times k}$ need $dr + rk = r(d+k)$ parameters.", "For $W_0 \\in \\mathbb{R}^{4096 \\times 4096}$ with $r=8$: full fine-tuning $\\approx 16.8$M params; LoRA $\\approx 65$K params — roughly 250× fewer."] },
    { id: "q-alg-kp37-2", type: "true-false", difficulty: "easy", question: "The Eckart-Young theorem guarantees that the best rank-k approximation to a matrix A in both the Frobenius norm and the spectral norm is given by truncated SVD Aₖ = Uₖ\\SigmaₖVₖ^T.", correctAnswer: "True", explanation: "Eckart-Young: ‖A - Aₖ‖₂ = \\sigmaₖ₊₁ and ‖A - Aₖ‖_F = √(\\Sigmaᵢ>ₖ \\sigmaᵢ²), and no rank-k matrix achieves smaller error in either norm. This is why SVD-based compression is optimal for dimensionality reduction.", hints: ["The theorem applies to both operator (spectral) and Frobenius norms — an unusually strong result.", "The optimal rank-k approximation error in Frobenius norm is √(\\sigmaₖ₊₁² + ... + \\sigmaₙ²)."] },
    { id: "q-alg-kp37-3", type: "multiple-choice", difficulty: "hard", question: "The stable rank of a matrix $A$ is defined as $\\operatorname{sr}(A) = \\|A\\|_F^2 / \\|A\\|_2^2 = \\frac{\\sum_i \\sigma_i^2}{\\sigma_1^2}$. It is used in randomized algorithms because:", options: ["$\\operatorname{sr}(A) = \\operatorname{rank}(A)$ always", "$\\operatorname{sr}(A) \\leq \\operatorname{rank}(A)$ and quantifies how numerically low-rank $A$ is — randomized algorithms require $O(\\operatorname{sr}(A))$ samples to achieve an $\\varepsilon$-approximation", "$\\operatorname{sr}(A)$ determines the computational complexity of Cholesky decomposition", "$\\operatorname{sr}(A)$ is always an integer"], correctAnswer: 1, explanation: `The stable rank (also called numerical rank) provides a more nuanced measure of matrix "size" than rank.

**Step 1: Definition.** For a matrix $A$ with singular values $\\sigma_1 \\geq \\sigma_2 \\geq \\cdots \\geq \\sigma_r > 0$:
$$\\operatorname{sr}(A) = \\frac{\\|A\\|_F^2}{\\|A\\|_2^2} = \\frac{\\sigma_1^2 + \\sigma_2^2 + \\cdots + \\sigma_r^2}{\\sigma_1^2}$$

**Step 2: Relationship to rank.** Since $\\|A\\|_F^2 = \\sum_i \\sigma_i^2$ and $\\|A\\|_2 = \\sigma_1$:
$$\\operatorname{sr}(A) = 1 + \\frac{\\sigma_2^2 + \\cdots + \\sigma_r^2}{\\sigma_1^2} \\geq 1$$

and because $\\sigma_i \\leq \\sigma_1$ for all $i$, we have $\\operatorname{sr}(A) \\leq r = \\operatorname{rank}(A)$.

**Step 3: Interpretation.** A matrix with $\\operatorname{sr}(A) \\approx 1$ has most of its Frobenius norm concentrated in the top singular value — it is numerically rank-1. A matrix with $\\operatorname{sr}(A) = \\operatorname{rank}(A)$ has energy spread uniformly across all singular values.

**Step 4: Role in randomized algorithms.** Random sampling-based algorithms (for SVD, least squares, etc.) require $O(\\operatorname{sr}(A)/\\varepsilon^2)$ samples to achieve relative $\\varepsilon$-approximation in Frobenius norm. This is much smaller than $O(\\operatorname{rank}(A)/\\varepsilon^2)$ when singular values decay rapidly.

Therefore, $\\boxed{\\text{Option 1}}$ — stable rank captures effective dimensionality and controls sample complexity in randomized numerical linear algebra.`,
      hints: [
        "A matrix with $\\sigma_1 \\gg \\sigma_2, \\sigma_3, \\ldots$ has $\\operatorname{sr}(A) \\approx 1$, meaning it is numerically low-rank even if its exact rank is high.",
        "Randomized SVD and related methods need $O(\\operatorname{sr}(A)/\\varepsilon^2)$ samples to achieve $\\varepsilon$-approximation — stable rank, not exact rank, determines sample complexity."
      ]
    },
  ],
  "linear-systems": [
    { id: "q-alg-kp38-1", type: "multiple-choice", difficulty: "medium", question: "A least-squares problem $\\min_{\\mathbf{x}} \\|A\\mathbf{x} - \\mathbf{b}\\|_2$ where $A \\in \\mathbb{R}^{m \\times n}$ with $m > n$ (overdetermined) has the unique solution:", options: ["$\\mathbf{x} = A^{-1}\\mathbf{b}$", "$\\mathbf{x} = (A^TA)^{-1}A^T\\mathbf{b}$ (normal equations solution)", "$\\mathbf{x} = (AA^T)^{-1}A^T\\mathbf{b}$", "$\\mathbf{x} = A^T\\mathbf{b} / \\|A\\|^2$"], correctAnswer: 1, explanation: `The least-squares problem finds $\\hat{\\mathbf{x}}$ that minimizes $\|A\\mathbf{x} - \\mathbf{b}\\|^2$.

**Step 1: Set up the normal equations.** The objective is:
$$J(\\mathbf{x}) = \\|A\\mathbf{x} - \\mathbf{b}\\|^2 = (A\\mathbf{x} - \\mathbf{b})^T(A\\mathbf{x} - \\mathbf{b})$$

Setting the gradient to zero:
\\begin{align}
\\nabla_\\mathbf{x} J &= 2A^T(A\\mathbf{x} - \\mathbf{b}) = 0 \\\\
A^TA\\mathbf{x} &= A^T\\mathbf{b}
\\end{align}

**Step 2: Solve for $\\hat{\\mathbf{x}}$.** When $A$ has full column rank ($\\operatorname{rank}(A) = n$), $A^TA$ is invertible, giving:
$$\\hat{\\mathbf{x}} = (A^TA)^{-1}A^T\\mathbf{b}$$

**Step 3: Why this is unique.** With full column rank, the columns of $A$ are linearly independent. The map $\\mathbf{x} \\mapsto A\\mathbf{x}$ is injective, so there is a unique minimizer of $\|A\\mathbf{x} - \\mathbf{b}\|^2$.

**Step 4: Practical considerations.** In numerical practice, solving $A^TA\\mathbf{x} = A^T\\mathbf{b}$ directly can be ill-conditioned. Numerically stable alternatives include:
- **QR decomposition:** $A = QR$ gives $\\hat{\\mathbf{x}} = R^{-1}Q^T\\mathbf{b}$
- **SVD:** $\\hat{\\mathbf{x}} = V\\Sigma^{-1}U^T\\mathbf{b}$

**Why the other options are wrong:**
- Option 0: $A^{-1}$ requires $A$ to be square and invertible, but $A$ is $m \\times n$ with $m > n$.
- Option 2: $(AA^T)^{-1}$ would give an $m \\times m$ matrix inverse, wrong for this problem.
- Option 3: $A^T\\mathbf{b} / \\|A\\|^2$ has no theoretical basis.

Therefore, $\\boxed{\\hat{\\mathbf{x}} = (A^TA)^{-1}A^T\\mathbf{b}}$ is the correct solution.`,
      hints: [
        "Start by writing out the objective $J(\\mathbf{x}) = \\|A\\mathbf{x} - \\mathbf{b}\\|^2$ and differentiating: $\\nabla_\\mathbf{x} J = 2A^T(A\\mathbf{x} - \\mathbf{b}) = 0$.",
        "The gradient $2A^T(A\\mathbf{x} - \\mathbf{b}) = 0$ gives the normal equations $A^TA\\mathbf{x} = A^T\\mathbf{b}$. Solve these for $\\mathbf{x}$."
      ]
    },
    { id: "q-alg-kp38-2", type: "true-false", difficulty: "medium", question: "Ridge regression (Tikhonov regularization) solves min_x ‖Ax-b‖² + \\lambda‖x‖², and its solution (A^TA + \\lambdaI)⁻¹A^Tb is always well-defined even when A^TA is singular.", correctAnswer: "True", explanation: "Adding \\lambdaI to A^TA ensures all eigenvalues are at least \\lambda > 0, making the matrix positive definite and invertible. This regularization shrinks the solution toward zero and stabilizes the inversion — essential when features are collinear.", hints: ["Eigenvalues of A^TA + \\lambdaI = eigenvalues of A^TA + \\lambda ≥ \\lambda > 0 always.", "In SVD form: x_ridge = \\Sigmaᵢ (\\sigmaᵢ/(\\sigmaᵢ² + \\lambda)) uᵢvᵢ^Tb — small singular values are dampened."] },
    { id: "q-alg-kp38-3", type: "multiple-choice", difficulty: "hard", question: "The LASSO regression solves min_x ‖Ax-b‖² + \\lambda‖x‖₁. Unlike ridge regression, LASSO produces sparse solutions because:", options: ["The ℓ₁ norm penalty has a square shape in 2D that makes corners at axis intersections", "The ℓ₁ norm ball has corners on the coordinate axes; the quadratic loss contour tends to touch these corners where some xᵢ = 0, inducing sparsity", "ℓ₁ is smoother than ℓ₂ and easier to optimize", "LASSO always sets exactly half the coefficients to zero"], correctAnswer: 1, explanation: "Geometrically, the ℓ₁ ball (diamond/cross-polytope shape) has corners on coordinate axes. The loss contour expansion hits these corners (where some coordinates are exactly 0) with positive probability, inducing sparsity. In contrast, the smooth ℓ₂ ball has no corners.", hints: ["In 2D: ℓ₁ ball is a diamond (corners at (±1,0),(0,±1)); ℓ₂ ball is a circle (no corners).", "Proximal gradient methods solve LASSO via soft-thresholding: sign(x)·max(|x|-\\lambda, 0)."] },
  ],
  "vector-spaces-advanced": [
    { id: "q-alg-kp39-1", type: "multiple-choice", difficulty: "hard", question: "A Hilbert space is a complete inner product space. In ML, which of the following is a Hilbert space fundamental to kernel methods?", options: ["The space of all continuous functions on \\mathbb{R}", "A Reproducing Kernel Hilbert Space (RKHS) H_k associated with kernel k, where evaluation functionals are continuous", "The space of all measurable functions (L∞)", "The space of probability distributions"], correctAnswer: 1, explanation: "The RKHS H_k has the reproducing property: f(x) = ⟨f, k(·,x)⟩_{H_k} for all f ∈ H_k. This enables the kernel trick: inner products in the (possibly infinite-dimensional) RKHS are computable as k(x,x') without explicit feature maps.", hints: ["Mercer's theorem: any PSD kernel k(x,x') = ⟨\\phi(x),\\phi(x')⟩ for some feature map \\phi into an RKHS.", "SVMs, Gaussian processes, and kernel PCA all operate in RKHS without explicit feature computation."] },
    { id: "q-alg-kp39-2", type: "true-false", difficulty: "medium", question: "Any finite-dimensional inner product space over \\mathbb{R} is isomorphic (as an inner product space) to \\mathbb{R}ⁿ with the standard dot product, where n is the dimension.", correctAnswer: "True", explanation: "By Gram-Schmidt orthonormalization, any n-dimensional inner product space has an orthonormal basis, giving an isometry to \\mathbb{R}ⁿ. This justifies working in coordinates without loss of generality for finite-dimensional spaces.", hints: ["Gram-Schmidt converts any basis to an orthonormal one, establishing the isomorphism explicitly.", "In infinite dimensions, different Hilbert spaces (L², ℓ², Sobolev spaces) are non-isomorphic."] },
    { id: "q-alg-kp39-3", type: "multiple-choice", difficulty: "hard", question: "The Riesz representation theorem states that every continuous linear functional F: H → \\mathbb{R} on a Hilbert space H can be represented as F(x) = ⟨x, y⟩ for a unique y ∈ H. In ML, this theorem underpins:", options: ["The existence of optimal transport maps", "The kernel trick: the evaluation functional \\deltaₓ(f) = f(x) in an RKHS corresponds to the element k(·,x), giving f(x) = ⟨f, k(·,x)⟩", "The convergence of stochastic gradient descent", "The universal approximation theorem for neural networks"], correctAnswer: 1, explanation: "In the RKHS H_k, evaluation at x is a bounded linear functional \\deltaₓ. By Riesz, there exists k(·,x) ∈ H_k such that f(x) = ⟨f, k(·,x)⟩ — the reproducing property. This is why kernel methods can compute inner products in infinite-dimensional spaces via the kernel function.", hints: ["The representer theorem (Tikhonov regularization in RKHS) also follows from Riesz + finite data.", "Riesz identifies H with H* (dual space) via the map y ↦ ⟨·,y⟩ — H is self-dual."] },
  ],
  "linalg-dl": [
    { id: "q-alg-kp40-1", type: "multiple-choice", difficulty: "medium", question: "Multi-head self-attention computes Q = XW_Q, K = XW_K, V = XW_V and then Attention = softmax(QK^T/√d_k)V. The √d_k scaling prevents:", options: ["The queries and keys from becoming orthogonal", "The dot products QK^T from growing large in magnitude (causing softmax saturation and vanishing gradients)", "The value matrix from being ill-conditioned", "Numerical overflow in the matrix multiplications"], correctAnswer: 1, explanation: "If d_k is large, dot products q·k grow as O(d_k) in expectation (for unit-norm vectors). Without scaling, softmax receives extreme inputs, producing near-one-hot distributions with vanishing gradients. √d_k scaling keeps the logits O(1) regardless of dimension.", hints: ["For q,k ~ N(0,I), E[q·k] = 0 but Var(q·k) = d_k — so std grows as √d_k.", "The paper 'Attention Is All You Need' introduced this scaling heuristic."] },
    { id: "q-alg-kp40-2", type: "true-false", difficulty: "medium", question: "Batch normalization normalizes activations to zero mean and unit variance using the batch statistics, which can be expressed as a linear transformation: x_norm = (x - \\mu)/(\\sigma + \\epsilon), making it a linear operation on x.", correctAnswer: "False", explanation: "Batch normalization is not a linear operation on x because \\mu and \\sigma depend on x (the batch statistics are computed from the current batch). It is an affine normalization with data-dependent statistics — nonlinear in x. However, at inference with fixed running statistics, it becomes a linear transformation.", hints: ["Linear operations satisfy f(\\alphax+\\betay) = \\alphaf(x)+\\betaf(y) — batch norm violates this due to data-dependent \\mu,\\sigma.", "During inference with frozen running_mean and running_var, BN becomes a fixed affine map."] },
    { id: "q-alg-kp40-3", type: "multiple-choice", difficulty: "hard", question: "The Neural Tangent Kernel (NTK) theory shows that infinitely wide neural networks trained with gradient descent are equivalent to kernel regression with the NTK kernel k_NTK. This implies:", options: ["Wide networks always overfit", "Wide networks trained with gradient descent converge to a linear model in function space, maintaining a fixed kernel throughout training (in the infinite-width limit)", "The NTK diagonalizes the loss Hessian", "Wide networks require the kernel trick for efficient training"], correctAnswer: 1, explanation: "In the infinite-width limit, the NTK k_NTK(x,x') remains constant throughout training (kernel doesn't change with parameters), and training is equivalent to kernel gradient descent. This linearization explains why wide networks generalize (kernel regression with appropriate kernel) but also reveals their limitations vs. feature-learning finite-width networks.", hints: ["NTK regime = 'lazy training' regime where weights barely move from initialization.", "Finite-width networks escape the NTK regime and learn features — explaining practical deep learning's superiority."] },
  ],
};

Object.assign(questions, moreAlgQ);

registerQuestions(questions);
export default questions;
