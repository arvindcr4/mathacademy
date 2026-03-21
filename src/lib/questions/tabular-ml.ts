import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "feature-engineering-tabular": [
    {
      id: "q-tab-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'A logistic regression model is trained on "age" and "income" separately but performs poorly. Adding the feature "age × income" improves AUC significantly. This is an example of:',
      options: [
        "Dimensionality reduction via PCA",
        "A feature interaction that captures joint nonlinear effects unavailable to linear models from individual features alone",
        "L2 regularization applied to the product term",
        "Target encoding of the age column",
      ],
      correctAnswer: 1,
      explanation:
        "Logistic regression is a linear model in its features: P(y=1) = σ(w₀ + w₁·age + w₂·income). No matter how well it tunes w₁ and w₂, it cannot learn that high income matters differently at different ages. Adding age × income as a third feature lets the model learn a coefficient w₃ that captures this joint effect, effectively giving the linear model one degree of interaction that it could never represent otherwise.",
      hints: [
        "A linear model in p features defines a hyperplane. What geometric shape does adding an interaction term allow?",
        "Tree-based models learn interactions implicitly through consecutive splits; linear models need explicit interaction features.",
      ],
    },
    {
      id: "q-tab-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Log-transforming a right-skewed numerical feature always improves model performance regardless of the model type.",
      correctAnswer: "false",
      explanation:
        "For a decision tree (or any tree ensemble), the splitting criterion at a node evaluates all possible thresholds on the raw feature. A monotonic transformation like log(x) preserves the ordering of values, so every split that was optimal on x is still optimal on log(x) — it just uses a different threshold value. The split quality is identical. Log transforms do help linear/distance-based models (logistic regression, KNN, SVM) where feature scale and distribution shape affect gradients and distance computations.",
      hints: [
        "Decision trees split on ordered thresholds: is x ≤ t? Does replacing x with log(x) change which sample falls on which side of the optimal split?",
        "Contrast: in logistic regression, the gradient ∂L/∂w scales with feature magnitude — so a feature spanning [1, 10⁶] vs. [0, 6] matters.",
      ],
    },
    {
      id: "q-tab-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'A feature "days_since_last_purchase" shows a U-shaped relationship with churn: churn is high for d < 7 (very recent), low for 7 ≤ d ≤ 90, and high again for d > 90. For a linear model, the best encoding is:',
      options: [
        "Use the raw feature; logistic regression will find the U-shape automatically",
        "Bin into three intervals (0–7, 7–90, 90+) and one-hot encode, OR encode with a natural cubic spline with interior knots at 7 and 90",
        "Replace the feature with its square to capture the curve",
        "Drop the feature and rely on the model to recover the signal from other features",
      ],
      correctAnswer: 1,
      explanation:
        "Logistic regression is linear in its inputs, so it can only model a monotone relationship with a single raw feature. Squaring (option C) creates a parabola centered at 0, which cannot represent a U-shape with a minimum at d = 7. Binning into three indicator columns gives the model three independent slopes for each region. Natural cubic splines with knots at 7 and 90 provide a smooth piecewise-polynomial fit: within each interval the function is a cubic, the pieces join with continuous first and second derivatives, and the function is linear beyond the boundary knots — precisely capturing the U-shape without overfitting.",
      hints: [
        "A single linear coefficient w·d can be positive or negative — it cannot increase on both ends and dip in the middle.",
        "A spline with K interior knots adds K extra basis functions. With knots at 7 and 90, you get a flexible smooth curve through those change-points.",
      ],
    },
  ],

  "missing-data": [
    {
      id: "q-tab-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a medical dataset, blood pressure readings are missing because the measuring device malfunctioned randomly, unrelated to any patient characteristic. This missingness mechanism is:",
      options: [
        "Missing Not at Random (MNAR), because the device failure could be correlated with sensor age",
        "Missing Completely at Random (MCAR): the probability of missingness is independent of both observed and unobserved data",
        "Missing at Random (MAR): missingness depends only on observed variables",
        "Structurally missing: the value is undefined for certain patients",
      ],
      correctAnswer: 1,
      explanation:
        "Rubin (1976) defined MCAR formally as: P(R = 0 | Y_obs, Y_mis) = P(R = 0), where R is the missingness indicator. The probability of being missing does not depend on any data values, observed or unobserved. In this scenario, device malfunction is purely random — unrelated to blood pressure values or any other patient feature. Consequence: complete-case analysis (dropping missing rows) does not introduce bias, though it loses statistical efficiency.",
      hints: [
        "MCAR is the strictest assumption. MAR allows missingness to depend on observed data. MNAR allows it to depend on the missing value itself.",
        "Clinical example of MNAR: blood pressure is not recorded because the nurse judged the patient to be too unstable to measure — missingness depends on the true blood pressure.",
      ],
    },
    {
      id: "q-tab-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Multiple imputation is preferred over single mean/median imputation because it correctly propagates the uncertainty of imputed values into downstream statistical inferences.",
      correctAnswer: "true",
      explanation:
        "Single imputation (e.g., replacing missing values with the column mean) treats the imputed value as if it were observed with certainty, artificially deflating variance estimates. Multiple Imputation (MI, Rubin 1987) generates m complete datasets with different plausible imputations drawn from the posterior predictive distribution P(Y_mis | Y_obs). Each dataset is analyzed separately, and the results are pooled using Rubin\'s combining rules: point estimate = mean of m estimates; variance = within-imputation variance + between-imputation variance (the extra term propagates imputation uncertainty). With m = 20 imputations and 30% missing data, MI confidence intervals are properly calibrated; single imputation intervals are too narrow.",
      hints: [
        "If you impute with the mean, every imputed value is identical — you have added no variance. But the true missing values are not all equal to the mean.",
        "Rubin\'s formula: total variance = W̄ + (1 + 1/m)·B, where B = between-imputation variance, the term that single imputation sets to zero.",
      ],
    },
    {
      id: "q-tab-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Income is missing for 40% of records. High earners systematically refused to report income (MNAR). Which strategy correctly handles this without assuming MCAR?",
      options: [
        "Listwise deletion: drop all rows with missing income",
        'Impute income with the median and add a binary "income_was_missing" indicator as a separate feature',
        "Mean imputation to preserve the sample mean of the observed values",
        "Assume MAR and use MICE (Multivariate Imputation by Chained Equations)",
      ],
      correctAnswer: 1,
      explanation:
        'Under MNAR, the fact of missingness encodes information about the missing value (high earners are missing → high income is more likely). Two actions are needed: (1) Impute a plausible value to fill the gap so no row is dropped — median avoids being pulled by extreme values. (2) Add a binary indicator "income_was_missing" ∈ {0, 1} as a feature. The model can then learn: when income_was_missing = 1, adjust the prediction upward, effectively capturing the MNAR signal. Listwise deletion (A) discards 40% of data and biases the remaining sample toward low earners. Mean imputation (C) has the same deletion bias without even preserving the distribution. MICE (D) assumes MAR, which is violated here.',
      hints: [
        'The missingness indicator trick: if "high income → missing", then the indicator "was_missing" is positively correlated with income, giving the model a proxy for the missing signal.',
        "MICE assumes P(R | Y_obs) — missingness depends only on observed data. MNAR violates this: P(R | Y_mis) depends on the unobserved income itself.",
      ],
    },
  ],

  "categorical-encoding": [
    {
      id: "q-tab-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'A "city" feature has 1,000 unique values. After one-hot encoding it for use in a logistic regression, the feature matrix has how many columns added (ignoring other features)?',
      options: [
        "1 column (ordinal integer encoding)",
        "999 columns (dropping one to avoid the dummy variable trap)",
        "1,000 or 999 depending on whether you drop a reference category",
        "log₂(1000) ≈ 10 columns",
      ],
      correctAnswer: 2,
      explanation:
        "OHE creates one binary indicator column per unique value. For k = 1,000 cities you get 1,000 binary columns. However, in a model with an intercept term, one column is perfectly predicted by the other 999 (multicollinearity: they sum to 1), causing a singular design matrix. Dropping one reference category leaves 999 columns and removes perfect collinearity. This is a general rule: for OHE with k categories, use k-1 columns in a model with an intercept.",
      hints: [
        'The "dummy variable trap": if all k indicator columns are included and the model has an intercept, the design matrix X is rank-deficient.',
        "With pandas get_dummies(drop_first=True) you get k-1 columns; without, you get k.",
      ],
    },
    {
      id: "q-tab-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Target encoding must use out-of-fold (leave-one-out) encoding during training to avoid target leakage, even though the same data is used to compute mean target values.",
      correctAnswer: "true",
      explanation:
        "Naive target encoding computes enc(cᵢ) = mean(y | category = cᵢ) using all training rows, including row i itself. When category cᵢ appears only once (or rarely), enc(cᵢ) ≈ yᵢ, so the encoded feature directly contains the target — severe leakage that inflates training AUC. Out-of-fold encoding computes the mean for row i using only the other folds (e.g., in 5-fold CV: enc(cᵢ) = mean(y | category = cᵢ, fold ≠ fold(i))). This adds noise that mimics test-time behavior, where the mean is estimated from training data the model did not see for that sample.",
      hints: [
        "Extreme case: a category with one sample gets encoded as exactly that sample\'s target. What happens at training time vs. test time?",
        "Kaggle\'s winning solutions almost always use out-of-fold target encoding inside their CV loop.",
      ],
    },
    {
      id: "q-tab-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A neural network must encode 2 million unique product IDs. The best strategy is:",
      options: [
        "One-hot encoding: 2M binary columns",
        "Label encoding as integers 0–1,999,999 and feed directly to a dense layer",
        "A learned embedding layer: each ID maps to a trainable d-dimensional dense vector (e.g., d = 50)",
        "Hash encoding into 1,024 buckets with hash collisions handled by averaging",
      ],
      correctAnswer: 2,
      explanation:
        "OHE with 2M columns creates a 2M-dimensional sparse input — impractical for memory and gradient computation. Label encoding (integers) is worse: it imposes an arbitrary order (ID 500,000 > ID 1 means nothing), and the dense layer treats them as ordinal, producing nonsensical embeddings. Hash encoding loses identity through collisions. Learned embeddings (the same technique as word2vec/word embeddings) map each ID to a trainable ℝᵈ vector. The embedding matrix has size 2M × d parameters — with d = 50, that is 100M parameters, which is large but feasible. IDs that co-occur in similar contexts learn similar embeddings. At inference, any ID lookup is O(1).",
      hints: [
        "Entity embeddings (Guo & Berkhahn 2016) showed learned embeddings for categorical features often match or beat OHE for neural tabular models.",
        "Embedding dimension d is a hyperparameter; a rule of thumb is d ≈ min(50, (k + 1) / 2) where k is the cardinality.",
      ],
    },
  ],

  "class-imbalance": [
    {
      id: "q-tab-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SMOTE generates a synthetic minority-class example between sample xᵢ and neighbor xⱼ as x̃ = xᵢ + λ(xⱼ − xᵢ) where λ ~ Uniform(0, 1). This differs from simple oversampling (random duplication) because:",
      options: [
        "SMOTE samples from the majority class to balance counts",
        "SMOTE creates new points along line segments between existing minority samples, adding diversity rather than exact duplicates",
        "SMOTE applies Gaussian noise to majority samples to move them toward the minority cluster",
        "SMOTE selects minority samples with probability proportional to their loss",
      ],
      correctAnswer: 1,
      explanation:
        'Random oversampling duplicates existing minority examples — the model sees the same xᵢ multiple times. SMOTE interpolates: x̃ = xᵢ + λ(xⱼ − xᵢ) for λ ∈ [0, 1] creates a point anywhere along the segment between two real minority neighbors. This fills the feature-space region around the minority cluster with novel examples, producing a smoother decision boundary and reducing overfitting to the duplicated points. The k nearest minority neighbors (default k = 5) define which directions are "safe" to interpolate in.',
      hints: [
        "Draw two minority points A and B. SMOTE generates points on the segment AB. Random oversampling only generates copies of A or copies of B.",
        "SMOTE can create problematic samples near the decision boundary if minority and majority classes overlap; SMOTE-ENN and BorderlineSMOTE address this.",
      ],
    },
    {
      id: "q-tab-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'Setting class_weight="balanced" in scikit-learn is exactly equivalent in effect to oversampling the minority class to the majority class count.',
      correctAnswer: "false",
      explanation:
        'class_weight="balanced" computes wₖ = n_samples / (n_classes × n_k) and scales each sample\'s loss contribution by its class weight. This rescales the gradient from minority samples without changing the training dataset. Oversampling replicates minority samples, changing the training distribution seen by the optimizer — each mini-batch now sees a different class ratio, which affects batch normalization statistics, dropout patterns, and the frequency of minority gradient updates. Practically: class weighting is simpler and avoids inflating the dataset; oversampling can interact differently with regularization. They are not equivalent.',
      hints: [
        "With balanced weights, the model still sees n minority samples per epoch; with oversampling it sees more. Does this matter for batch-level operations?",
        "For SGD with large imbalance ratios (1:1000), oversampling ensures minority examples appear in most mini-batches; class weighting does not guarantee that.",
      ],
    },
    {
      id: "q-tab-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Focal loss FL(pₜ) = −(1 − pₜ)^γ log(pₜ) was introduced by Lin et al. (2017) for dense object detection. With γ = 2, a well-classified example with pₜ = 0.9 is down-weighted by a factor of:",
      options: [
        "(1 − 0.9)² = 0.01 relative to standard cross-entropy",
        "0.9² = 0.81 relative to standard cross-entropy",
        "(1 − 0.9)^0.5 ≈ 0.316",
        "There is no down-weighting; γ only controls the shape of the loss curve",
      ],
      correctAnswer: 0,
      explanation:
        "Standard cross-entropy for a positive example with predicted probability p is −log(p). Focal loss multiplies by (1 − p)^γ: FL = −(1 − p)^γ log(p). For pₜ = 0.9 and γ = 2: modulating factor = (1 − 0.9)² = 0.1² = 0.01. The well-classified example contributes only 1% of its original loss. For a hard example with pₜ = 0.2: (1 − 0.2)² = 0.64 — it retains 64% of its loss. This ensures the gradient signal is dominated by hard misclassified examples rather than the abundant easy negatives in imbalanced detection tasks.",
      hints: [
        "Compute (1 − pₜ)^γ for pₜ = 0.9, γ = 2. This multiplicative factor is applied to the standard log-loss.",
        "The intuition: if the model is 90% confident and correct, training on this example provides little useful gradient — focal loss makes this precise.",
      ],
    },
  ],

  "decision-trees": [
    {
      id: "q-tab-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "At a node with 100 samples: 60 class A, 40 class B. The Gini impurity of this node is:",
      options: [
        "0.60 × 0.40 = 0.24",
        "1 − (0.60² + 0.40²) = 0.48",
        "−(0.60 log 0.60 + 0.40 log 0.40) ≈ 0.673",
        "0.60 − 0.40 = 0.20",
      ],
      correctAnswer: 1,
      explanation:
        "Gini impurity at a node with class proportions p₁, p₂, …, pK is defined as: G = 1 − Σₖ pₖ². With p_A = 0.6 and p_B = 0.4: G = 1 − (0.36 + 0.16) = 1 − 0.52 = 0.48. (Option C gives the entropy H = −Σ pₖ log pₖ ≈ 0.673, a different criterion.) CART selects the split that maximizes the weighted Gini reduction: ΔG = G(parent) − (nₗ/n)·G(left) − (nᵣ/n)·G(right). Gini and entropy usually select the same splits in practice; they differ most for highly imbalanced nodes.",
      hints: [
        "Formula: G = 1 − Σₖ pₖ². Compute pₖ² for each class and subtract from 1.",
        "A pure node (all one class) has G = 0; a 50/50 split has G = 0.5 for binary classification — the maximum.",
      ],
    },
    {
      id: "q-tab-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A decision tree grown without any depth or leaf-size constraint on a dataset with no duplicate feature vectors will always achieve 100% training accuracy.",
      correctAnswer: "true",
      explanation:
        "With no duplicate feature vectors, each sample has a unique path through the feature space. An unconstrained tree can recurse until each leaf contains exactly one sample. At that leaf, the class label is unambiguously the label of that one sample, so the training prediction is always correct. This is a limiting case of overfitting: the model has zero training error but has memorized the training set, with no generalization to unseen data. Scikit-learn\'s DecisionTreeClassifier with default parameters (no max_depth) will grow exactly this tree on a dataset with unique features.",
      hints: [
        "With n samples and no duplicates, the tree can partition the space into n singleton leaves, one per sample.",
        "Regularization mechanisms: max_depth, min_samples_split, min_samples_leaf, ccp_alpha (cost-complexity pruning).",
      ],
    },
    {
      id: "q-tab-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Mean Decrease Impurity (MDI) feature importance — the total Gini reduction weighted by node sample count — is biased toward which type of feature, and why?",
      options: [
        "Binary features, because they create pure splits quickly",
        "High-cardinality continuous features, because more possible thresholds give more chances for a spuriously good split",
        "Features that appear near the root, because they are evaluated on more samples",
        "Correlated feature pairs, because their combined impurity reduction double-counts their importance",
      ],
      correctAnswer: 1,
      explanation:
        "MDI evaluates all possible split thresholds for each feature. A continuous feature with many unique values (high cardinality) has many candidate thresholds — increasing the probability of finding at least one that gives a large Gini reduction by chance, even for a random feature. A binary feature has only one possible threshold. This inflated search space gives continuous features an unfair advantage in importance rankings. Strobl et al. (2007) formalized this bias. The fix: use permutation importance (break feature-target association by shuffling, measure accuracy drop) or conditional permutation importance, which do not depend on the number of candidate thresholds.",
      hints: [
        "Imagine a feature that is pure noise but has 10,000 unique values — it will likely find a threshold that happens to reduce Gini on the training set.",
        "Permutation importance is threshold-agnostic: it measures the holistic effect of destroying a feature\'s information, not the Gini reduction at any specific split.",
      ],
    },
  ],

  "random-forests": [
    {
      id: "q-tab-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Random forests achieve lower variance than a single deep decision tree through two mechanisms. Which pair is correct?",
      options: [
        "Pruning each tree to reduce depth, and using a larger learning rate",
        "Bootstrap aggregation (bagging) of training samples, and random feature subsampling at each split",
        "Gradient-based correction of residuals, and early stopping on validation loss",
        "L2 regularization on leaf weights, and dropout on random features",
      ],
      correctAnswer: 1,
      explanation:
        "A single deep decision tree has high variance: small changes in training data can produce a completely different tree. Random forests attack this in two ways: (1) Bagging: each tree is trained on a bootstrap sample (n draws with replacement from n samples), so each tree sees a slightly different dataset. (2) Random feature subsampling: at each split only m ≈ √p features are considered (p = total features), de-correlating individual trees. The bias-variance decomposition shows: Var(average of T trees) = ρ·σ² + (1−ρ)·σ²/T, where ρ is the pairwise tree correlation. Random feature selection reduces ρ, which is what makes the ensemble variance ≪ single-tree variance.",
      hints: [
        "If all trees were identical (ρ = 1), averaging them would not help. Random subsampling ensures ρ < 1.",
        "Breiman (2001): random forests variance = ρ·σ² + (1−ρ)/T·σ². As T → ∞, variance → ρ·σ², limited by the inter-tree correlation.",
      ],
    },
    {
      id: "q-tab-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The out-of-bag (OOB) error in a random forest provides an approximately unbiased estimate of test error without requiring a separate held-out validation set.",
      correctAnswer: "true",
      explanation:
        "Each bootstrap sample draws n samples with replacement from n training examples. The probability that a specific example is NOT selected in one draw is (1 − 1/n). Over n draws: P(never selected) = (1 − 1/n)ⁿ → 1/e ≈ 0.368 as n → ∞. So ~36.8% of training samples are out-of-bag for any given tree. Each training sample is predicted using only the trees for which it was OOB, giving a prediction that is truly out-of-sample for those trees. Aggregating these across all trees provides an error estimate equivalent to ~0.632-fraction cross-validation. Breiman showed OOB error converges to the true generalization error as the forest grows.",
      hints: [
        "With n = 100, P(example excluded from bootstrap) ≈ (0.99)¹⁰⁰ ≈ 0.366. With n = 10,000: (1 − 1/10000)^10000 ≈ 1/e.",
        'OOB predictions are made by the ~37% of trees that did not train on each example — a valid "fresh" model for that sample.',
      ],
    },
    {
      id: "q-tab-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "As the number of trees T in a random forest increases beyond T = 500, the test error:",
      options: [
        "Continues to decrease indefinitely as more trees are added",
        "Eventually plateaus near ρ·σ² (the irreducible ensemble variance floor) and cannot overfit regardless of T",
        "Begins to increase due to overfitting of the bootstrap aggregation procedure",
        "Oscillates around the optimal value because of bootstrap sampling noise",
      ],
      correctAnswer: 1,
      explanation:
        "From the bias-variance formula: Var(RF) = ρ·σ² + (1−ρ)·σ²/T. As T → ∞, the second term vanishes and variance converges to ρ·σ², the floor set by inter-tree correlation. Adding more trees never increases this — averaging more independent estimates can only maintain or reduce variance (law of large numbers). Unlike gradient boosting where adding more iterations after convergence can overfit, random forests cannot overfit by increasing T. The practical trade-off: more trees cost more inference time and memory, so there is a computational optimum but not a statistical one.",
      hints: [
        "Contrast with boosting: each new boosting iteration fits residuals more precisely on the training set and CAN overfit. Random forest trees are independent, not sequential correctors.",
        "Practically, test error plateaus by T ≈ 100–300 trees for most datasets. Going to T = 1000 wastes computation but does not hurt accuracy.",
      ],
    },
  ],

  "gradient-boosting": [
    {
      id: "q-tab-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In gradient boosting for regression with MSE loss L = ½(y − F(x))², the pseudo-residual fitted by each new tree is:",
      options: [
        "The original target y, so each tree fits the full target independently",
        "The negative gradient −∂L/∂F(xᵢ) = yᵢ − Fₘ(xᵢ), i.e., the residual from the current ensemble",
        "The second derivative (Hessian) of the loss with respect to predictions",
        "A randomly sampled subset of the target values",
      ],
      correctAnswer: 1,
      explanation:
        "Gradient boosting (Friedman 2001) performs functional gradient descent in prediction space. At iteration m, the pseudo-residual for sample i is rᵢₘ = −[∂L(yᵢ, Fₘ₋₁(xᵢ))/∂F(xᵢ)]_{F=Fₘ₋₁}. For MSE loss L = ½(y − F)²: ∂L/∂F = F − y, so rᵢₘ = y − Fₘ₋₁(xᵢ) — exactly the residual. The new tree hₘ is fit to these residuals, and the ensemble updates: Fₘ = Fₘ₋₁ + η·hₘ. For other losses (log-loss, MAE), pseudo-residuals generalize this concept to any differentiable objective.",
      hints: [
        "Gradient descent in parameter space: θ ← θ − η·∇_θ L. Gradient boosting: F ← F − η·∇_F L, where ∇_F L evaluated at each point is the pseudo-residual.",
        "For log-loss, the pseudo-residual = yᵢ − p̂ᵢ, where p̂ᵢ = σ(Fₘ₋₁(xᵢ)). Same intuition: predict what the current model missed.",
      ],
    },
    {
      id: "q-tab-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LightGBM\'s leaf-wise (best-first) growth strategy achieves lower training loss than XGBoost\'s level-wise growth for the same number of leaves, but can overfit more on small datasets.",
      correctAnswer: "true",
      explanation:
        "Level-wise growth (XGBoost default): expand all nodes at depth d before going to d+1. Leaf-wise growth (LightGBM default): at each step, split whichever leaf has the largest loss reduction, regardless of depth. With the same leaf budget, leaf-wise selects the globally best split available, reducing training loss faster. However, it creates asymmetric, deep branches on a single path — which can memorize noise on small datasets. LightGBM controls this via min_child_samples (minimum samples per leaf) and num_leaves; XGBoost uses max_depth. For large datasets (>10K samples), leaf-wise is typically superior; for small datasets, level-wise is safer.",
      hints: [
        "With 31 leaves, level-wise produces a balanced tree of depth 5; leaf-wise may produce one branch 15 levels deep and another 2 levels deep.",
        "LightGBM also uses histogram-based splitting (bucketing features into 255 bins), enabling O(n·K) split finding vs. O(n·p·log n) for XGBoost\'s exact method.",
      ],
    },
    {
      id: "q-tab-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'CatBoost\'s "ordered boosting" prevents target leakage during categorical encoding by:',
      options: [
        "One-hot encoding all categorical features before training begins",
        "Computing target statistics for each sample using only the samples that appeared before it in a random permutation of the dataset",
        "Using a separate validation set to compute category means, isolated from the training loop",
        "Hashing categories into embedding vectors that do not depend on target values",
      ],
      correctAnswer: 1,
      explanation:
        "Standard target encoding: enc(cᵢ) = mean(y | category = cᵢ) using ALL training samples — if sample i is in the training set, its own yᵢ contributes to enc(cᵢ), creating leakage. CatBoost\'s solution: randomly permute the training set. For sample at position k in the permutation, compute enc(cᵢ) using only samples at positions 1 to k − 1. This simulates a temporal ordering: each sample\'s encoding uses only \"past\" samples, so no sample encodes its own target. CatBoost generates multiple permutations per training run to avoid sensitivity to a single ordering, applying different permutations for different trees.",
      hints: [
        "Equivalent intuition: if you\'re encoding sample 500, compute the category mean from samples 1–499 only. Sample 500's own label is never in its own encoding.",
        "This is why CatBoost is particularly strong with high-cardinality categoricals on small datasets where standard target encoding leaks severely.",
      ],
    },
  ],

  "hyperparameter-optuna": [
    {
      id: "q-tab-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Optuna\'s default sampler — Tree-structured Parzen Estimator (TPE) — proposes new hyperparameter configurations by:",
      options: [
        "Exhaustively evaluating all combinations in a predefined grid",
        "Modeling two density functions l(x) and g(x) over good and bad trials, and sampling x that maximizes l(x)/g(x)",
        "Fitting a Gaussian process to past results and sampling from its acquisition function",
        "Randomly sampling from a uniform distribution over the hyperparameter space",
      ],
      correctAnswer: 1,
      explanation:
        'TPE (Bergstra et al. 2011) splits past trials into "good" (y < y*) and "bad" (y ≥ y*) based on a quantile γ of the observed objective values. It models p(x | y < y*) = l(x) and p(x | y ≥ y*) = g(x) using kernel density estimators. The acquisition function EI(x) ∝ l(x)/g(x): new configurations are sampled from l(x) and selected where the ratio l(x)/g(x) is largest — i.e., configurations likely among good trials and unlikely among bad ones. This is more sample-efficient than random/grid search and cheaper than Gaussian Process Bayesian optimization for high-dimensional discrete spaces.',
      hints: [
        "Grid search is O(k^p) for k values per p parameters — exponential. TPE uses O(n) past observations to propose the next trial.",
        'The γ quantile (default 0.25 in Optuna) determines the threshold between "good" and "bad" trials.',
      ],
    },
    {
      id: "q-tab-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Optuna\'s pruning feature (MedianPruner, HyperbandPruner) can terminate a trial early based on intermediate validation metrics, reducing total tuning compute without compromising the best configuration found.",
      correctAnswer: "true",
      explanation:
        "Pruners implement successive halving logic: at intermediate step s, a trial is pruned if its metric is worse than the median of all completed trials at the same step. An unpromising XGBoost trial with validation AUC = 0.65 after 100 trees, when all completed trials at 100 trees have median AUC = 0.82, is abandoned — saving the compute of training the remaining 900 trees. The best configurations (those that survive pruning) still run to full budget. Optuna\'s Hyperband integration implements the SHA (Successive Halving Algorithm) rigorously, with geometric budget reduction across brackets.",
      hints: [
        "Pruning is orthogonal to the sampler: TPE proposes configurations, the pruner decides whether to continue each trial.",
        "Not all models support intermediate reporting; scikit-learn estimators trained as a whole cannot be pruned. XGBoost, LightGBM with callbacks, and PyTorch training loops can report per-epoch metrics.",
      ],
    },
    {
      id: "q-tab-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When tuning XGBoost with Optuna, which hyperparameter pair is most important to co-tune because of their strong interaction?",
      options: [
        "verbosity and random_state",
        "n_estimators and learning_rate (eta): more trees require a smaller learning rate for optimal generalization",
        "objective and eval_metric",
        "tree_method and n_jobs",
      ],
      correctAnswer: 1,
      explanation:
        'The shrinkage factor η (learning_rate) multiplies each tree\'s contribution: Fₘ = Fₘ₋₁ + η·hₘ. Smaller η requires more trees (larger n_estimators) to reach the same training loss — but achieves better regularization and generalization (Friedman 2002: "with small η, each tree corrects less aggressively, requiring more steps but leading to a smoother function"). Optimal (η, n_estimators) pairs lie on a curve: η = 0.01 might need n = 5000 trees; η = 0.3 might need only n = 100. Tuning n_estimators independently of η, or fixing one and tuning the other, will find suboptimal configurations. The standard approach: fix a small η (0.05–0.1) and use early stopping to find optimal n_estimators.',
      hints: [
        "Early stopping in XGBoost trains up to n_estimators trees but stops when validation metric does not improve for early_stopping_rounds consecutive rounds — effectively joint tuning of η and n.",
        "Other key regularization params: max_depth (tree complexity), subsample (row subsampling), colsample_bytree (feature subsampling), min_child_weight (leaf regularization).",
      ],
    },
  ],

  "cross-validation": [
    {
      id: "q-tab-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A dataset has 1,000 samples: 950 class 0, 50 class 1 (5% positive rate). Standard 5-fold CV splits data sequentially. Fold 5 might contain 0 class-1 samples. Stratified 5-fold prevents this by:",
      options: [
        "Ensuring each fold has the same total sample count regardless of class",
        "Preserving the 5% positive rate in every fold by sampling class-proportionally within each fold",
        "Randomly shuffling data before splitting, which eventually balances classes",
        "Using only class-1 samples in the validation fold",
      ],
      correctAnswer: 1,
      explanation:
        "Stratified K-Fold independently divides the majority and minority class samples into K equal groups, then combines them. With 950 class-0 and 50 class-1 samples in 5-fold: each fold gets 190 class-0 and 10 class-1 samples (10/200 = 5% positive rate). Without stratification, sequential splitting might give fold 5 all 50 class-1 samples (if they are clustered at the end) or zero (if clustered at the start). A fold with no class-1 samples makes ROC-AUC undefined and accuracy trivially 100% for that fold.",
      hints: [
        "sklearn\'s cross_val_score automatically uses StratifiedKFold when the estimator is a classifier — stratification is the default for classification.",
        "For regression, ordinary KFold is used; stratification is less critical when the target is continuous.",
      ],
    },
    {
      id: "q-tab-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For time series data, standard K-fold cross-validation with random shuffling is invalid because it leaks future information into the training set.",
      correctAnswer: "true",
      explanation:
        "Suppose a model is trained on samples from 2020–2024 and validated on samples from 2022. Random shuffling means samples from 2023–2024 (the future relative to 2022) appear in the training fold — the model learns from future data to predict the past. This violates temporal causality and produces optimistically biased validation scores that do not reflect true deployment performance. The correct approach is walk-forward (expanding window) validation: always train on data up to time t and validate on t to t+Δ. Scikit-learn\'s TimeSeriesSplit implements this: fold k trains on [0, k·n/K] and validates on [k·n/K, (k+1)·n/K].",
      hints: [
        "Rolling features for a validation sample must be computed from data that would have been available before the prediction date — which random K-fold does not guarantee.",
        "TimeSeriesSplit ensures the training fold always precedes the validation fold chronologically, making rolling statistic computation causal.",
      ],
    },
    {
      id: "q-tab-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Nested cross-validation (outer K₁ folds, inner K₂ folds) is used in ML evaluation specifically to:",
      options: [
        "Speed up training by reusing cached predictions across folds",
        "Obtain an unbiased estimate of the generalization error of the model-selection procedure, not just the final model",
        "Enable ensembling of K₁ × K₂ different models",
        "Reduce memory usage by processing one fold at a time",
      ],
      correctAnswer: 1,
      explanation:
        'Suppose you use 5-fold CV to tune hyperparameters and then report that same 5-fold CV score as your generalization estimate. Problem: the best hyperparameters were selected to maximize that CV score — so the reported score is optimistically biased (it has "seen" all data through the tuning process). Nested CV fixes this: the outer loop (K₁ = 5 folds) provides test folds that are NEVER used for hyperparameter tuning. Inside each outer fold, an inner loop (K₂ = 3 folds) runs hyperparameter search on the outer training portion only. The outer test fold is held back until after tuning is complete, giving an honest estimate of the model-selection process\'s expected performance on new data.',
      hints: [
        "Analogy: if you tune hyperparameters and evaluate on the same validation set, your validation score is inflated — exactly like the training-set error. Nested CV creates a truly held-out test set for each outer fold.",
        "Nested CV is computationally expensive: K₁ × K₂ × (number of hyperparameter trials) model fits. For K₁=5, K₂=3, 50 trials: 750 model fits.",
      ],
    },
  ],

  "feature-selection": [
    {
      id: "q-tab-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which feature selection method evaluates features using their statistical relationship to the target — independently of any model — making it the fastest but most limited approach?",
      options: [
        "Recursive Feature Elimination (RFE) with a Random Forest",
        "LASSO regularization during logistic regression training",
        "Filter methods: mutual information, ANOVA F-statistic, or Pearson correlation with the target",
        "Forward stepwise selection using cross-validated accuracy",
      ],
      correctAnswer: 2,
      explanation:
        "Filter methods score each feature independently of the model: MI(X; Y) = Σ p(x,y) log[p(x,y)/(p(x)p(y))], or the F-statistic from one-way ANOVA, or |corr(X, Y)|. Features are ranked and selected by threshold or top-k. Advantages: O(p) scaling in the number of features, no model training needed. Limitations: (1) do not account for feature interactions (a feature with low individual MI might be highly useful in combination), (2) feature rankings are model-agnostic (optimal for linear models may not be optimal for trees). Wrapper methods (RFE) train a model repeatedly; embedded methods (LASSO) encode selection in the training objective.",
      hints: [
        "Filter: score → rank → select. No model, no training. Works even before you choose a model.",
        "Mutual information is the most general filter — it captures any statistical dependence, not just linear. Pearson correlation only captures linear relationships.",
      ],
    },
    {
      id: "q-tab-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LASSO (L1-regularized linear regression) performs automatic feature selection by driving some coefficients to exactly zero during optimization.",
      correctAnswer: "true",
      explanation:
        'LASSO minimizes: (1/2n)‖y − Xβ‖² + λ‖β‖₁. The L1 penalty |βⱼ| is non-differentiable at βⱼ = 0, creating a "kink" in the objective. Geometrically, the feasible set {β : ‖β‖₁ ≤ s} is a cross-polytope with corners on the coordinate axes. The solution to the constrained problem often occurs at a corner where many βⱼ = 0 exactly. By contrast, Ridge (L2) uses a smooth circular ball — the solution can occur anywhere on the ball, and βⱼ → 0 only asymptotically. For a specific coefficient, the LASSO soft-thresholding solution is: β̂ⱼ = sign(z_j) · max(|z_j| − λ, 0), where z_j is the OLS estimate — this sets β̂ⱼ = 0 when |z_j| ≤ λ.',
      hints: [
        "Soft-thresholding: if the OLS estimate for feature j has |z_j| ≤ λ, LASSO sets that coefficient to exactly 0.",
        "LASSO produces sparse solutions; Ridge produces small but nonzero coefficients. Elastic Net combines both.",
      ],
    },
    {
      id: "q-tab-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Boruta feature selection is more reliable than raw MDI (Mean Decrease Impurity) importances because it:",
      options: [
        "Uses gradient boosting instead of random forests for more accurate importance estimates",
        'Creates "shadow features" (randomly permuted copies of each real feature) and only confirms a feature as important if its MDI statistically exceeds the best shadow feature across many forest iterations',
        "Applies SHAP values instead of Gini-based importance to remove the high-cardinality bias",
        "Restricts the tree depth to 3 to prevent complex features from dominating",
      ],
      correctAnswer: 1,
      explanation:
        'Boruta (Kursa & Rudnicki 2010) creates shadow features: for each of p real features, it adds a randomly shuffled copy (shadow_fⱼ), giving 2p features. A random forest is trained on all 2p features. The null distribution for "unimportant" features is empirically estimated by the maximum MDI among all shadow features (since shadow features are pure noise). A real feature is confirmed important only if its MDI exceeds this null distribution with high statistical confidence (binomial test, Benjamini-Hochberg corrected). Features that never beat any shadow feature are rejected. This converts a heuristic ranking into a statistically grounded yes/no decision with controlled false discovery rate.',
      hints: [
        "MDI importances have no built-in null distribution — you cannot tell if a score of 0.05 is significant or noise. Boruta constructs one empirically.",
        "Shadow features are the negative control: they have zero true importance by construction. If a real feature cannot beat them, it is not useful.",
      ],
    },
  ],

  "shap-xai": [
    {
      id: "q-tab-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A model\'s mean prediction E[f(X)] = 0.3. For a specific customer, f(x) = 0.8. The SHAP values for features [age, income, credit_score] are [+0.1, +0.3, +0.1]. What does the SHAP efficiency axiom require?",
      options: [
        "Each SHAP value must be in [0, 1] and sum to 1.0",
        "The SHAP values must sum to f(x) − E[f(X)] = 0.8 − 0.3 = 0.5",
        "The SHAP values must sum to f(x) = 0.8",
        "The largest SHAP value identifies the most important global feature",
      ],
      correctAnswer: 1,
      explanation:
        "SHAP satisfies three axioms that uniquely determine Shapley values (Shapley 1953, Lundberg & Lee 2017): Efficiency: Σᵢ φᵢ(x) = f(x) − E[f(X)]. Symmetry: two features contributing equally to all coalitions receive equal SHAP. Dummy: a feature that does not change f for any coalition gets SHAP = 0. In this example: 0.1 + 0.3 + 0.1 = 0.5 = 0.8 − 0.3 ✓. The SHAP values exactly partition the prediction deviation from baseline: credit_score (+0.3) contributed most to pushing this prediction above the mean.",
      hints: [
        "SHAP explains the gap between this specific prediction and the global average — not the prediction itself.",
        "Efficiency axiom: all features together explain exactly f(x) − E[f(X)]. No more, no less.",
      ],
    },
    {
      id: "q-tab-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Global SHAP importance for a feature can be computed as the mean absolute SHAP value across all training (or test) samples: E[|φᵢ(x)|].",
      correctAnswer: "true",
      explanation:
        "Local SHAP φᵢ(xⱼ) explains how feature i influenced prediction j. To get global importance: aggregate across all n samples. Taking the mean of absolute values — not raw values — is standard because positive and negative contributions are both meaningful: a feature with φᵢ = +0.5 for half the data and −0.5 for the other half is globally important, but raw mean would give 0. Global importance Iᵢ = (1/n) Σⱼ |φᵢ(xⱼ)|. This correctly identifies features with consistently large influence regardless of direction. SHAP summary plots show each sample as a dot, colored by feature value, ordered by mean |SHAP|.",
      hints: [
        "Mean SHAP (without absolute value) = 0 by the efficiency axiom summed over all samples, if E[f(X)] is constant — not a useful importance measure.",
        "Mean |SHAP| is the basis of SHAP\'s feature importance bar plot in the shap library.",
      ],
    },
    {
      id: "q-tab-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TreeSHAP is preferred over KernelSHAP for gradient-boosted trees because it computes exact Shapley values in O(TLD²) time rather than the exponential-time exact computation or approximate Monte Carlo of KernelSHAP. What does the O(TLD²) complexity represent?",
      options: [
        "T = training samples, L = loss function evaluations, D = dataset dimensions",
        "T = number of trees, L = number of leaves per tree, D = maximum tree depth",
        "T = tuning iterations, L = learning rate steps, D = number of decision boundaries",
        "T = test samples, L = label count, D = data dimensionality",
      ],
      correctAnswer: 1,
      explanation:
        "Lundberg et al. (2020) proved that for tree ensembles, exact Shapley values can be computed in O(TLD²) time per sample, where T = number of trees, L = max leaves per tree, D = max depth. Key insight: within a tree, the contribution of a feature to the Shapley value of a specific prediction can be computed by traversing all possible orderings of features encountered on the root-to-leaf path using dynamic programming, without enumerating all 2^D feature subsets. KernelSHAP treats any model as a black box and must approximate via regression on 2^p or sampled subsets of features — O(2^p) exactly or O(M·p²) with M Monte Carlo samples. For a 1000-tree GBM with depth 6, TreeSHAP is orders of magnitude faster.",
      hints: [
        "KernelSHAP: treats model as black box. For p=50 features, 2^50 ≈ 10^15 subsets — must approximate.",
        "TreeSHAP: exploits tree structure to compute exact Shapley values using polynomial-time DP over the tree nodes.",
      ],
    },
  ],

  tabnet: [
    {
      id: "q-tab-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "TabNet (Arik & Pfister 2021) uses sequential attention with a sparsemax transformation at each decision step. The purpose of sparsemax over softmax for feature selection masks is:",
      options: [
        "Sparsemax is faster to compute, reducing training time",
        "Sparsemax produces exactly sparse probability distributions (many zero weights), achieving hard feature selection at each step; softmax produces dense distributions that never exactly zero out any feature",
        "Sparsemax is differentiable while softmax is not, enabling gradient-based training",
        "Sparsemax prevents overfitting by adding L1 regularization to the attention weights",
      ],
      correctAnswer: 1,
      explanation:
        'Softmax: σ(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ) — always positive, never exactly zero. A "soft" selector that always attends to all features to some degree. Sparsemax (Martins & Astudillo 2016): argmin_{p ∈ Δ^K} ‖p − z‖² over the probability simplex — produces a piecewise-linear projection that maps many components to exactly 0. With sparsemax, TabNet at each decision step selects a sparse subset of features (e.g., 3 out of 100), enabling interpretability (which features were used?) and mimicking the axis-aligned splits of decision trees. The entropy of the sparsemax mask, averaged over steps and samples, is used as a sparsity regularizer.',
      hints: [
        "Sparsemax: many features get exactly zero weight. This is hard feature selection.",
        "TabNet: uses sparsemax to select features per step. Entropy encourages sparsity.",
      ],
    },
    {
      id: "q-tab-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "TabNet consistently outperforms gradient-boosted trees (XGBoost, LightGBM) on tabular datasets, making tree-based methods obsolete for structured data.",
      correctAnswer: "false",
      explanation:
        'Grinsztajn et al. (2022) "Why tree-based models still outperform deep learning on tabular data" conducted a systematic benchmark across 45 diverse tabular datasets. Gradient-boosted trees won on the majority, especially for (a) small datasets (<10K samples), (b) datasets with many uninformative features, (c) heterogeneous feature types (mixed numerical/categorical). TabNet and other neural tabular models (FT-Transformer, SAINT) can match or exceed trees on large homogeneous datasets or when pre-training on unlabeled data. The paper identified that trees\' resistance to uninformative features and their exact feature selection are key structural advantages.',
      hints: [
        "Tabular data is fundamentally different from images/text: no spatial locality, mixed types, often small n, many irrelevant features — all properties favoring trees.",
        'Benchmark papers (Grinsztajn 2022, Shwartz-Ziv & Armon 2022) consistently show GBDT as the default winner for "typical" tabular ML tasks.',
      ],
    },
    {
      id: "q-tab-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TabNet can be pre-trained without labels using a self-supervised objective analogous to BERT\'s masked language modeling. The tabular analog is:",
      options: [
        "Contrastive learning: push representations of augmented table rows together, push different rows apart",
        "Masked feature reconstruction: randomly mask a subset of features (set to 0 or noise) and train TabNet to reconstruct the original values from the remaining observed features",
        "Next-step prediction: given the first k columns, predict column k+1",
        "Cluster assignment: assign each row to a cluster centroid and pre-train to predict cluster IDs",
      ],
      correctAnswer: 1,
      explanation:
        "TabNet pre-training (Arik & Pfister 2021, Section 4): given a table row x, randomly mask a subset S of feature indices (set them to 0 or noise). The encoder (same sequential attention architecture as supervised TabNet) receives the corrupted row and produces a representation. A decoder network then reconstructs the original values x_S of the masked features. Loss: ‖x_S − x̂_S‖²_F (reconstruction MSE) summed over masked features. The attention masks naturally learn to focus on unmasked features to infer masked ones, learning feature-feature dependencies. After pre-training on unlabeled data, the encoder is fine-tuned with the supervised loss on labeled data.",
      hints: [
        "BERT masks tokens and predicts them from context. TabNet masks feature values and reconstructs them from other features — the same principle applied to tables.",
        "This enables TabNet to leverage unlabeled rows (often abundant in real-world databases) to improve representations before supervised fine-tuning.",
      ],
    },
  ],

  "neural-tabular": [
    {
      id: "q-tab-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "According to Grinsztajn et al. (2022), which structural property of tabular data most explains why tree-based models outperform MLPs on many tabular benchmarks?",
      options: [
        "Neural networks cannot process numerical features without normalization, making them unsuitable for raw tabular data",
        "Tabular data often contains many uninformative features; trees perform implicit feature selection via axis-aligned splits, while MLPs are non-rotationally invariant but still use all features by default",
        "Neural networks require GPU acceleration unavailable for most tabular ML deployments",
        "MLPs overfit because they have more parameters than tree-based models of equivalent depth",
      ],
      correctAnswer: 1,
      explanation:
        'The paper identifies that "tabular data is not rotationally invariant" — adding irrelevant features hurts MLPs more than trees. Decision trees automatically ignore uninformative features (they select splits only on informative dimensions). MLPs have densely connected layers: every neuron connects to every input feature, so irrelevant features add noise to every gradient update. The paper also shows trees are better at capturing irregular target functions (non-smooth boundaries, step functions) common in tabular data, and naturally handle mixed numerical/categorical data without careful preprocessing.',
      hints: [
        "An MLP with 100 input features connects all 100 to every hidden neuron. A tree with max_features=√100 considers only 10 features per split.",
        'The "uninformative features" finding: randomly adding Gaussian noise features degraded MLP performance far more than GBDT performance in controlled experiments.',
      ],
    },
    {
      id: "q-tab-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Feature normalization (e.g., StandardScaler to zero mean and unit variance) is critical for neural network convergence on tabular data but provides no benefit for gradient-boosted trees.",
      correctAnswer: "true",
      explanation:
        'Neural networks: gradient descent updates w ← w − η·∂L/∂w. The gradient magnitude scales with both the weight magnitude and the input magnitude (chain rule: ∂L/∂wⱼ = ∂L/∂a · xⱼ). A feature with values in [0, 10⁶] produces gradients 10⁶ times larger than a feature in [0, 1], causing slow convergence or gradient explosion for the un-normalized features. StandardScaler ensures all features contribute equally to gradient magnitudes. Gradient-boosted trees split on thresholds: "is income ≤ 50,000?" and "is income ≤ 50?" are mathematically identical decisions (the tree learns a different threshold). Monotonic rescaling does not change which threshold is optimal.',
      hints: [
        "Neural network rule: always normalize numerical inputs. Tree rule: normalization is irrelevant for split quality.",
        "Batch normalization inside a neural network partially mitigates this, but input-level normalization still accelerates convergence significantly.",
      ],
    },
    {
      id: "q-tab-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FT-Transformer (Feature Tokenization Transformer, Gorishniy et al. 2021) processes tabular rows differently from a standard MLP by:",
      options: [
        "Treating the entire row as a single 1D sequence of raw feature values and applying a 1D-CNN",
        "Embedding each feature (numerical and categorical) as an individual token and applying multi-head self-attention across the p feature tokens for each row",
        "Using positional encodings based on column order to preserve feature ordering information",
        "Replacing self-attention with a kernel-based dot product to handle the small context length of tabular rows",
      ],
      correctAnswer: 1,
      explanation:
        'FT-Transformer embeds each of p features as a d-dimensional token: for numerical xⱼ, token = bⱼ + xⱼ · wⱼ (bias + scalar-scaled embedding vector); for categorical cⱼ, token = embedding lookup. The row is thus represented as a sequence of p tokens of shape (p, d). Standard multi-head self-attention is applied across these p "feature tokens": Attention(Q, K, V) = softmax(QKᵀ/√d)V, where Q, K, V are linear projections of the token sequence. Attention scores capture pairwise feature interactions: head h might learn that "income heavily attends to credit score when predicting default." This expressiveness exceeds MLPs (which cannot model feature interactions without explicit products), while remaining a standard transformer.',
      hints: [
        'In NLP, tokens are words; in FT-Transformer, tokens are individual feature values. The transformer then learns which features to "pay attention to" jointly.',
        "FT-Transformer outperforms MLP on datasets where feature interactions are important, but is slower and needs more data than tree methods.",
      ],
    },
  ],

  autogluon: [
    {
      id: "q-tab-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'AutoGluon\'s tabular predictor with preset="best_quality" automatically performs all of the following EXCEPT:',
      options: [
        "Training multiple model types (GBM, XGBoost, CatBoost, Random Forest, Neural Net, KNN) with varied hyperparameters",
        "Multi-layer stacking: using L1 model predictions as features for L2 meta-models",
        "Collecting additional labeled training data from external web sources to fill data gaps",
        "Feature preprocessing: missing value imputation, ordinal encoding, and numerical normalization per model type",
      ],
      correctAnswer: 2,
      explanation:
        'AutoGluon (Erickson et al. 2020) automates: (1) preprocessing pipelines tailored per model type, (2) training ~20+ model configurations across multiple families, (3) weighted ensembling of best individual models, (4) multi-layer stacking (L1 models → L2 meta-learner on cross-validated predictions). It does NOT collect external data — it works only with the data provided. The "best_quality" preset enables multi-layer stacking and ensemble-based hyperparameter selection, which typically outperforms any single model family.',
      hints: [
        "AutoGluon\'s key innovation: it avoids traditional HPO (hyperparameter optimization) and instead trains many fixed configurations, relying on stacking to combine their strengths.",
        "Multi-layer stacking: L1 = base models; L2 = second-layer models trained on OOF (out-of-fold) L1 predictions; repeat for L3.",
      ],
    },
    {
      id: "q-tab-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "H2O AutoML automatically trains multiple algorithm families in parallel and produces a Stacked Ensemble (SuperLearner) that typically achieves the highest leaderboard accuracy.",
      correctAnswer: "true",
      explanation:
        'H2O AutoML (LeDell & Poirier 2020) trains: GLM, Distributed Random Forest (DRF), Gradient Boosting Machine (GBM), XGBoost, Deep Learning, and multiple GBM/XGBoost configurations. It then builds two stacked ensembles: (1) "AllModels" — a SuperLearner trained on all models\' cross-validated predictions, (2) "BestOfFamily" — a SuperLearner on the best model per family. The SuperLearner uses a metalearner (typically GLM with non-negative constraints) to find optimal linear combinations. In practice, "StackedEnsemble_AllModels" typically appears at the top of the H2O AutoML leaderboard because combining diverse models reduces variance beyond any individual model.',
      hints: [
        "SuperLearner theorem (van der Laan et al. 2007): given a library of base learners, the stacked ensemble performs asymptotically at least as well as the best base learner.",
        "The metalearner in H2O uses OOF predictions from base models, so stacking does not overfit to training data.",
      ],
    },
    {
      id: "q-tab-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Deploying an AutoGluon or H2O AutoML stacked ensemble to a production system introduces which challenge NOT present with a single model?",
      options: [
        "AutoML models cannot make predictions on data with missing values",
        "Multi-layer stacked ensembles require serving dozens of models in a dependency order, increasing latency, memory footprint, and making targeted retraining of individual components difficult",
        "AutoML models always have lower accuracy than hand-tuned models in production",
        "AutoML models require GPU inference, which is unavailable in most production environments",
      ],
      correctAnswer: 1,
      explanation:
        "A 50-model AutoGluon stack: to predict one sample, you must (1) run all L1 base models in parallel, (2) collect their outputs, (3) run the L2 meta-models, (4) aggregate. Latency = max(L1 latency) + L2 latency. Memory = sum of all model weights. When concept drift occurs: which sub-model do you retrain? Retraining the full stack is expensive; retraining one model breaks the stacking relationship. Additionally, regulatory requirements (GDPR Article 22, fair lending) may require explaining predictions — a 50-model stack is extremely difficult to explain. Single models (or thin ensembles of 3–5) are far easier to debug, monitor, and retrain selectively.",
      hints: [
        "AutoML is excellent for competitions and prototyping; production ML often needs simpler models for latency, interpretability, and maintenance reasons.",
        "Consider the retraining scenario: new data arrives weekly. Retraining 50 models weekly is expensive; selective retraining of a stacked ensemble requires careful dependency management.",
      ],
    },
  ],

  "time-series-tabular": [
    {
      id: "q-tab-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "To use a gradient-boosted tree model for univariate time series forecasting of y_t, you create lag features. If you use lags 1, 2, and 7, the feature vector for predicting y_t is:",
      options: [
        "[y_{t+1}, y_{t+2}, y_{t+7}] (future values)",
        "[y_{t−1}, y_{t−2}, y_{t−7}] (past values at lags 1, 2, and 7)",
        "[mean(y_{t−1..t−7}), std(y_{t−1..t−7}), max(y_{t−1..t−7})]",
        "[y_t − y_{t−1}, y_t − y_{t−2}, y_t − y_{t−7}] (differences)",
      ],
      correctAnswer: 1,
      explanation:
        'A lag-k feature for predicting y_t is the observed value y_{t−k}: the value k time steps in the past. Lag features convert a time series into a supervised learning table: row t has features [y_{t−1}, y_{t−2}, y_{t−7}] and target y_t. This is the "time delay embedding" or Takens embedding approach. With lags 1, 2, 7 you capture: yesterday (lag 1), two days ago (lag 2), and one week ago (lag 7) — useful for data with daily seasonality. The model then learns: f(y_{t−1}, y_{t−2}, y_{t−7}) → y_t. This is causally valid: features precede the target in time.',
      hints: [
        "Lag 1 = yesterday\'s value. Lag 7 = same day last week. Choosing lags requires domain knowledge about seasonality and autocorrelation.",
        "Causal constraint: features must be available at prediction time. Lag features for t use only data from before t — no future leakage.",
      ],
    },
    {
      id: "q-tab-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Rolling window statistics (e.g., rolling mean over the past 7 days) can be safely computed and used as features during training with any cross-validation strategy, including random K-fold.",
      correctAnswer: "false",
      explanation:
        "Rolling statistics are computed from historical values. For a random K-fold split: suppose sample at time t = 100 is in the validation fold. Its rolling mean feature = mean(y_{93}...y_{99}). If t = 50 (earlier in time) is in the TRAINING fold, the model has learned from y_{50} — which is used in computing the rolling statistic for t = 100. This is a subtle form of temporal leakage. Correct approach: use TimeSeriesSplit (walk-forward validation). At each outer fold, ALL features (including rolling statistics) must be recomputed from the training window only, and rolling statistics for validation samples must only look back into the training period.",
      hints: [
        "Rolling features for a validation sample must be computed from data that would have been available before the prediction date — which random K-fold does not guarantee.",
        "TimeSeriesSplit ensures the training fold always precedes the validation fold chronologically, making rolling statistic computation causal.",
      ],
    },
    {
      id: "q-tab-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When using a GBM for multi-step-ahead time series forecasting (predict y_{t+h} for h = 1, 2, ..., 12), the recursive strategy has which drawback compared to the direct strategy?",
      options: [
        "The recursive strategy trains 12 separate models, which is computationally expensive",
        "The recursive strategy uses model predictions as inputs for further predictions, accumulating errors at each step; the direct strategy trains one model per horizon using only true historical values as inputs",
        "The direct strategy cannot handle the irregular spacing of multi-step forecasts",
        "The recursive strategy is more accurate for short horizons but less accurate for long horizons due to underfitting",
      ],
      correctAnswer: 1,
      explanation:
        "Recursive strategy: train one model f(y_{t−1}, y_{t−2}, …) → y_t. Forecast h = 1: ŷ_{t+1} = f(y_t, y_{t−1}, …). Forecast h = 2: ŷ_{t+2} = f(ŷ_{t+1}, y_t, …) — uses the predicted ŷ_{t+1} as input. Prediction errors compound: error in ŷ_{t+1} propagates into ŷ_{t+2}, ŷ_{t+3}, etc. For long horizons (h = 12), error accumulation can be severe. Direct strategy: train 12 separate models, each fₕ(y_t, y_{t−1}, …) → y_{t+h}, where each model uses only true historical values as inputs. No error propagation, but 12 models instead of 1, and each model ignores the relationship between consecutive forecast horizons.",
      hints: [
        "Recursive: one model, growing error. Direct: many models, no error propagation but loses inter-horizon coherence.",
        "RECTIFY and other hybrid strategies try to combine benefits: train direct models but use recursive outputs as additional features.",
      ],
    },
  ],
};

const extraQuestions: Record<string, Question[]> = {
  "ensemble-methods-tabular": [
    {
      id: "q-tab-kp16-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Random Forest reduces variance compared to a single decision tree primarily through which mechanism?",
      options: [
        "Using deeper trees that have lower bias, compensating for high variance",
        "Averaging predictions of many trees trained on bootstrap samples with random feature subsets, where averaging reduces variance without proportionally increasing bias",
        "Pruning each tree to a maximum depth to limit model complexity and control variance",
        "Using a larger training dataset by oversampling the original data before fitting each tree",
      ],
      correctAnswer: 1,
      explanation:
        "Random Forest variance reduction: (1) Bagging: each tree sees a different bootstrap sample, making trees somewhat independent; (2) Feature subsampling (sqrt(p) features per split): further decorrelates trees. The variance of an average of m variables with pairwise correlation rho is sigma^2 * (rho + (1-rho)/m). Low rho from feature subsampling drives this toward sigma^2/m as m grows.",
      hints: [
        "Averaging m independent variables reduces variance by m; averaging correlated ones reduces less.",
        "Feature subsampling is what differentiates Random Forest from plain bagging of decision trees.",
      ],
    },
    {
      id: "q-tab-kp16-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Gradient Boosting Machines build trees sequentially. What exactly does each new tree fit?",
      options: [
        "Each new tree fits the raw target variable y using samples misclassified by previous trees",
        "Each new tree fits the negative gradient of the loss function with respect to the current ensemble prediction (pseudo-residuals), performing gradient descent in function space",
        "Each new tree fits the residuals (y - current_prediction) using all training samples with equal weight",
        "Each new tree fits the hardest samples in the training set, determined by their current loss value",
      ],
      correctAnswer: 1,
      explanation:
        "GBM (Friedman, 2001): at each step, compute the negative gradient of loss L(y, F(x)) w.r.t. F(x) — the current ensemble prediction. These gradients are pseudo-residuals. A new tree is fit to these pseudo-residuals, and its prediction scaled by the learning rate is added to the ensemble. For squared error, pseudo-residuals equal ordinary residuals. For other losses, they differ — making GBM a general framework for any differentiable loss.",
      hints: [
        "Gradient descent in parameter space updates theta. GBM does gradient descent in function space, updating F(x).",
        "For MSE loss, pseudo-residuals = y - F(x) = ordinary residuals. For log loss, they differ.",
      ],
    },
    {
      id: "q-tab-kp16-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "XGBoost is consistently faster than LightGBM for training on tabular data because XGBoost uses more efficient tree construction algorithms.",
      correctAnswer: "false",
      explanation:
        "LightGBM is generally faster than XGBoost, especially on large datasets. LightGBM uses: (1) Leaf-wise tree growth, growing the leaf with maximum gain first; (2) GOSS: retain large-gradient instances, randomly sample small-gradient ones; (3) EFB: bundle mutually exclusive sparse features. These innovations typically make LightGBM 10x faster than XGBoost on large datasets.",
      hints: [
        "Leaf-wise growth: grow the most informative leaf first. Depth-wise: grow all leaves at the same level.",
        "GOSS exploits the insight that high-gradient samples contribute more to information gain estimates.",
      ],
    },
  ],
  "hyperparameter-tuning": [
    {
      id: "q-tab-kp17-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Bayesian optimization for hyperparameter tuning uses a surrogate model to choose the next configuration. What does the acquisition function do?",
      options: [
        "The acquisition function is the surrogate model itself; it maximizes the surrogate predicted performance directly",
        "The acquisition function balances exploration (high uncertainty regions) and exploitation (high predicted performance) — Expected Improvement is the expected gain over the current best, integrating over the surrogate uncertainty",
        "The acquisition function is the validation loss; Bayesian optimization minimizes it via gradient descent through the surrogate",
        "The acquisition function randomly samples hyperparameters according to the surrogate probability distribution",
      ],
      correctAnswer: 1,
      explanation:
        "Bayesian optimization: (1) Fit a surrogate (typically Gaussian Process) to observed (hyperparameter, performance) pairs; (2) Use an acquisition function to select the next configuration. Expected Improvement EI(x) = E[max(f(x) - f*, 0)] balances exploration (high GP uncertainty) with exploitation (high GP mean). Upper Confidence Bound UCB = mu(x) + kappa*sigma(x) is another common acquisition.",
      hints: [
        "Exploration: try uncertain regions. Exploitation: try regions predicted to be good.",
        "EI is computed analytically from the GP posterior mean and variance.",
      ],
    },
    {
      id: "q-tab-kp17-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why does k-fold cross-validation underestimate true generalization error for time series data, and what should be used instead?",
      options: [
        "k-fold CV uses too few folds for time series; using 100-fold CV resolves the issue",
        "Standard k-fold CV randomly shuffles data, allowing the model to train on future data to predict past data — violating temporal causality. Walk-forward (expanding or sliding window) validation must be used instead",
        "k-fold CV underestimates error for time series because non-stationary distributions are not accounted for",
        "k-fold CV overestimates error for time series because temporal autocorrelation inflates fold estimate variance",
      ],
      correctAnswer: 1,
      explanation:
        "Standard k-fold CV randomly assigns samples to folds, so training folds can contain data from after the test fold — data leakage across time. Walk-forward validation: train on months 1-12, test on month 13; train on 1-13, test on 14; etc. Expanding window uses all available history; sliding window uses a fixed history length. This respects temporal causality.",
      hints: [
        "Random shuffle CV: training fold might include January 2024 when test fold is January 2023 — temporal leakage.",
        "Walk-forward: always train on past, test on future — matches the deployment scenario.",
      ],
    },
    {
      id: "q-tab-kp17-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Random search for hyperparameter tuning is generally more efficient than grid search when only a few hyperparameters strongly affect model performance.",
      correctAnswer: "true",
      explanation:
        "Bergstra and Bengio (2012) showed that random search outperforms grid search when many hyperparameters are unimportant. Grid search wastes evaluations trying all combinations of unimportant hyperparameters. Random search independently samples each hyperparameter, covering more unique values of the important ones. With k important dimensions out of n total, random search achieves equivalent coverage of the important subspace with far fewer trials.",
      hints: [
        "Grid search: try every combination. Random search: sample independently. Random covers important dimensions better.",
        "If only 2 of 10 hyperparameters matter, grid search wastes 8 dimensions of evaluation budget.",
      ],
    },
  ],
  "neural-networks-tabular": [
    {
      id: "q-tab-kp18-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TabNet (Arik and Pfister, 2021) uses sequential attention for feature selection. What is the key innovation over standard MLPs?",
      options: [
        "TabNet uses transformers with self-attention over rows of the dataset, not columns",
        "TabNet uses a sequential attention mechanism that selects which features to use at each decision step, producing sparse feature masks — enabling instance-wise feature selection and interpretability",
        "TabNet applies convolutional filters over ordered feature columns, exploiting local feature correlations",
        "TabNet uses a mixture-of-experts architecture where each expert specializes in a subset of feature types",
      ],
      correctAnswer: 1,
      explanation:
        "TabNet: at each step t, a learnable mask selects which features to attend to. Selected features pass through a shared and step-specific feature transformer. The mask is produced by a sparse entmax softmax of a learned attentive transformer, guided by prior feature usage across steps. This creates step-wise feature selection where each step focuses on different features, also providing interpretability via the sparse masks.",
      hints: [
        "Sequential attention: each step selects different features. Sparse masks: only a few features per step.",
        "Standard MLP: concatenate all features. TabNet is selective per step.",
      ],
    },
    {
      id: "q-tab-kp18-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FT-Transformer (Feature Tokenizer + Transformer) adapts transformers for tabular data. What is the main difference from applying a standard transformer?",
      options: [
        "FT-Transformer uses linear attention instead of standard scaled dot-product attention",
        "FT-Transformer tokenizes each feature (numerical or categorical) into an embedding vector with a feature-specific linear transformation plus a learnable CLS token, enabling transformers to operate over the feature dimension rather than the sequence dimension",
        "FT-Transformer pre-trains on large tabular corpora using masked feature modeling before fine-tuning",
        "FT-Transformer applies rotary position embeddings to encode feature ordering",
      ],
      correctAnswer: 1,
      explanation:
        "FT-Transformer: each numerical feature x_j is tokenized as e_j = W_j * x_j + b_j (feature-specific linear embedding); categorical features use a learned lookup. A CLS token is appended. A standard transformer processes the sequence of feature tokens. The CLS token output is used for prediction. Attention between feature tokens captures feature interactions. The tokenization step is the key innovation over naive concatenation of all features into one vector.",
      hints: [
        "Standard MLP: concatenate all features. FT-Transformer: embed each feature independently, then apply attention between them.",
        "Attention between feature tokens = explicit feature interaction modeling, like word-word attention in NLP.",
      ],
    },
    {
      id: "q-tab-kp18-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gradient boosted trees consistently outperform deep learning methods on all tabular data benchmarks, making deep learning generally unsuitable for tabular tasks.",
      correctAnswer: "false",
      explanation:
        "The empirical evidence is nuanced. Grinsztajn et al. (2022) found GBTs outperform DL on most tabular benchmarks, especially with less than 10K samples. However, modern architectures (FT-Transformer, ResNet with tuned hyperparameters) can match or exceed GBTs on some datasets. Neither approach dominates uniformly. The choice depends on dataset size, feature types, and available compute for hyperparameter optimization.",
      hints: [
        "GBTs dominate on small-medium tabular data. DL can be competitive with sufficient data and tuning.",
        "Grinsztajn et al. (2022) is the key reference; the picture is dataset-dependent, not universal.",
      ],
    },
  ],
  "interpretability-tabular": [
    {
      id: "q-tab-kp19-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SHAP values provide model-agnostic feature importance. What game-theoretic concept do they implement?",
      options: [
        "Nash equilibrium: the SHAP value is the equilibrium contribution when features compete for importance",
        "Shapley values from cooperative game theory: the average marginal contribution of each feature across all possible subsets — the unique fair allocation satisfying efficiency, symmetry, dummy, and linearity axioms",
        "Minimax theorem: SHAP values minimize the maximum explanation error across all feature subsets",
        "Banzhaf power index: SHAP measures how often a feature is pivotal in changing the model prediction",
      ],
      correctAnswer: 1,
      explanation:
        "SHAP implements Shapley values: for each feature, compute its average marginal contribution to the prediction when added to each possible subset, averaging over all orderings. This is the unique allocation satisfying: efficiency (SHAP values sum to prediction minus baseline), symmetry (identical features get equal SHAP), dummy (zero-contribution features get zero), and linearity (SHAP of sum of models = sum of SHAPs). TreeSHAP computes exact values for tree models efficiently.",
      hints: [
        "Shapley value = average marginal contribution over all 2^p possible feature subsets.",
        "Four axioms uniquely determine the Shapley value — it is the only fair allocation satisfying all four.",
      ],
    },
    {
      id: "q-tab-kp19-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "LIME explains individual predictions by fitting a local surrogate. What is LIME key assumption and its main limitation?",
      options: [
        "LIME assumes the model is globally linear; it cannot handle non-linear models",
        'LIME assumes complex models are locally linear around any specific prediction; the "locality" definition (perturbation kernel) is ambiguous and the surrogate may not faithfully represent the model local behavior',
        "LIME assumes feature independence in the local neighborhood; it requires a large number of perturbation samples to be accurate",
        "LIME assumes the model uses only the top-k most important features; it cannot explain models with more than k features",
      ],
      correctAnswer: 1,
      explanation:
        'LIME: perturb the input around the instance, get model predictions for perturbations, weight by proximity, fit a weighted linear model. Key assumption: model is locally linear. Limitation: "locality" is defined by a kernel (usually Gaussian distance in feature space), but kernel width choice is arbitrary and dramatically changes explanations. For high-dimensional or structured data, the perturbation strategy and locality definition are especially problematic.',
      hints: [
        "LIME approximation: complex model approximately linear in a small neighborhood around each prediction.",
        "The kernel width is a hyperparameter that users must set — and explanations are sensitive to it.",
      ],
    },
    {
      id: "q-tab-kp19-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "SHAP feature importance values can be negative, indicating that a feature decreased the model prediction for a specific instance relative to the baseline prediction.",
      correctAnswer: "true",
      explanation:
        "SHAP values are signed: positive SHAP means the feature increased the prediction (above baseline), negative SHAP means the feature decreased it. SHAP values sum to (prediction - baseline). This directional information is a key advantage over unsigned importance measures like permutation importance, allowing exact attribution of each feature contribution to the gap between prediction and baseline.",
      hints: [
        "SHAP sum rule: sum of all SHAP values for a sample equals prediction minus expected prediction over dataset.",
        "Negative SHAP: this feature pushes the prediction below the average. Positive SHAP: above average.",
      ],
    },
  ],
  "anomaly-detection-tabular": [
    {
      id: "q-tab-kp20-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Isolation Forest detects anomalies without computing densities or distances. What is its core principle?",
      options: [
        "Isolation Forest trains a classifier to distinguish normal samples from randomly generated uniform noise",
        "Isolation Forest builds random trees that recursively partition the feature space; anomalies are isolated in fewer splits (shorter average path length) because they are sparse and different from normal points",
        "Isolation Forest uses a k-nearest-neighbor distance as the anomaly score, computed efficiently via random projections",
        "Isolation Forest fits a Gaussian mixture model and identifies points with low log-likelihood as anomalies",
      ],
      correctAnswer: 1,
      explanation:
        "Isolation Forest: for each tree, randomly select a feature and a split value between min and max. Repeat recursively. Anomalies — being sparse and different — are isolated with fewer splits than normal points. The anomaly score is the average path length across trees: shorter path means more anomalous. This is O(n log n) to train and O(log n) to score, efficient for large datasets.",
      hints: [
        "Anomalies are few and different; they are isolated early in the random partition process.",
        "Path length = how many splits to isolate a point. Anomalies: short path. Normal: long path.",
      ],
    },
    {
      id: "q-tab-kp20-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'Local Outlier Factor (LOF) is a density-based anomaly detection method. What does "local" refer to?',
      options: [
        "LOF detects anomalies only in a local geographic region of the dataset",
        "LOF compares each point local density to the densities of its k-nearest neighbors — a point is anomalous if its local density is much lower than that of its neighbors, capturing anomalies missed by global density methods",
        "LOF uses local linear models to estimate density, making it computationally more efficient than kernel density estimation",
        "LOF applies only to features with small variance rather than the full feature space",
      ],
      correctAnswer: 1,
      explanation:
        'LOF: for each point, compute reachability distance to k-nearest neighbors, estimate local density (inverse of average reachability distance). The LOF score is the ratio of average local density of neighbors to the point own local density. LOF > 1 indicates the point is less dense than its neighbors (anomalous). "Local" means the density comparison is relative to the neighborhood, not the global distribution.',
      hints: [
        "A point in a low-density cluster surrounded by a high-density cluster would be globally anomalous but locally normal.",
        "LOF solves this: compare density to k-nearest neighbors, not to the global distribution.",
      ],
    },
    {
      id: "q-tab-kp20-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Unsupervised anomaly detection methods like Isolation Forest and LOF can reliably identify specific anomaly types (point, contextual, collective) without additional information.",
      correctAnswer: "false",
      explanation:
        "Unsupervised methods produce anomaly scores but do not classify anomaly types. Point anomalies are well-handled. Contextual anomalies (normal in isolation but anomalous in context) require contextual features or time-aware methods. Collective anomalies (a sequence of normal points that is anomalous collectively) require sequence modeling. Distinguishing these types requires domain knowledge or specialized methods.",
      hints: [
        "LOF detects locally sparse points — captures point anomalies but may miss contextual ones.",
        "Contextual anomaly: temperature 35C is normal in summer but anomalous in winter.",
      ],
    },
  ],
  "class-imbalance-techniques": [
    {
      id: "q-tab-kp21-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SMOTE generates synthetic minority class samples. What is the potential problem when there are class overlaps in feature space?",
      options: [
        "SMOTE generates too many samples, causing the model to overfit the minority class",
        "SMOTE interpolates between minority class samples without checking if the interpolated region contains majority class samples — generating synthetic samples in overlapping regions that can be ambiguous or in majority class territory",
        "SMOTE only works for binary classification and cannot handle multi-class imbalance",
        "SMOTE requires the minority class to have at least k-nearest neighbors from the same class, failing when the minority class is extremely rare",
      ],
      correctAnswer: 1,
      explanation:
        "SMOTE limitation with class overlap: synthetic samples are created by interpolating between a minority sample and one of its k-nearest minority neighbors. In overlapping regions where minority and majority samples are intermixed, this interpolation may produce samples in regions where the majority class dominates. These synthetic minority samples fall in ambiguous territory, confusing the classifier. Borderline-SMOTE and ADASYN address this by focusing on boundary regions.",
      hints: [
        "SMOTE interpolates between minority samples. If minority samples are in a majority-dominated region, interpolation stays there.",
        "Borderline-SMOTE: only oversample near the decision boundary where oversampling helps most.",
      ],
    },
    {
      id: "q-tab-kp21-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For imbalanced classification, why is AUROC sometimes misleading and what metric is preferred for severe imbalance?",
      options: [
        "AUROC does not account for the positive class rate; Precision-Recall AUC (PRAUC) is preferred because it focuses on minority class performance",
        "AUROC is misleading because it uses threshold averaging; F1 score is preferred as it uses the optimal threshold",
        "AUROC is misleading because it is not calibrated; Brier score is preferred for imbalanced data",
        "AUROC is biased for high-cardinality features; Matthews Correlation Coefficient corrects for this bias",
      ],
      correctAnswer: 0,
      explanation:
        "AUROC is misleading under severe imbalance because the ROC curve is dominated by majority class performance. With 99% negatives, a model that identifies all negatives and no positives can still achieve high AUROC. PRAUC focuses on the minority class: precision and recall both measure performance on positives. A random classifier achieves PRAUC equal to the prevalence (e.g., 0.01 for 1% minority), making it a meaningful baseline.",
      hints: [
        "AUROC: ROC curve dominated by TN rate at high thresholds — easy for majority-class-favoring models.",
        "PRAUC: both precision and recall focus on the positive class — harder to game.",
      ],
    },
    {
      id: "q-tab-kp21-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Class weighting in gradient boosted trees is generally as effective as oversampling with SMOTE for handling imbalanced tabular data.",
      correctAnswer: "true",
      explanation:
        "For gradient boosted trees, class weighting and SMOTE often achieve similar performance because GBTs use loss gradients not distances. Class weighting scales the loss for minority class samples. Empirically, class weighting is simpler, faster, and typically competitive with SMOTE for GBTs. SMOTE is more beneficial for distance-based methods (k-NN, SVM) and some neural networks.",
      hints: [
        "GBTs use loss gradients, not distances — so geometric placement of SMOTE samples matters less.",
        "Class weighting achieves the same focus on minority class without modifying the data.",
      ],
    },
  ],
  "target-encoding": [
    {
      id: "q-tab-kp22-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Target encoding replaces categorical values with the mean target per category. What is the critical risk and how does smoothed target encoding address it?",
      options: [
        "Target encoding creates multicollinearity; smoothing removes correlation with the target",
        "Target encoding causes leakage especially for rare categories with few samples; smoothed target encoding blends the category mean with the global mean, shrinking rare categories toward the prior",
        "Target encoding causes scale mismatch; smoothing normalizes encoded values to [0, 1]",
        "Target encoding is biased for high-cardinality features; smoothing applies a log transformation",
      ],
      correctAnswer: 1,
      explanation:
        "Target encoding leakage: a category with 1 sample has its mean equal to that sample target — perfectly encoding the target. Smoothed target encoding: encoded_value = (n * mean_category + m * mean_global) / (n + m), where n is the count and m is a smoothing parameter. Rare categories (small n) are pulled toward the global mean; frequent categories (large n) stay close to their empirical mean. This prevents overfitting on rare categories.",
      hints: [
        "Category with 1 sample: mean = that sample target exactly. Model memorizes it.",
        "Smoothing: n=1 gives approximately the global mean. n=1000 gives approximately the category mean.",
      ],
    },
    {
      id: "q-tab-kp22-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Out-of-fold target encoding is recommended over computing target statistics on the full training set. Why?",
      options: [
        "Out-of-fold encoding is more computationally efficient because it requires fewer passes over the data",
        "Computing target statistics on the full training set for a sample that is then also used for training creates direct target leakage for that sample; out-of-fold encoding computes statistics only from data not used to train the model that sees that sample",
        "Out-of-fold encoding automatically handles rare categories without smoothing",
        "Out-of-fold encoding produces better category encodings because held-out folds are more representative of the test distribution",
      ],
      correctAnswer: 1,
      explanation:
        "Target leakage in encoding: if you compute mean(target | category=A) using all training data, then train a model that sees this encoded value for a training sample with category A, the encoding partly reflects that sample own target — direct leakage. Out-of-fold encoding: for each sample in fold i, compute the target statistic using only data from other folds. This ensures the encoding for each sample is computed from data that does not include that sample.",
      hints: [
        "Standard target encoding on training data: each sample own target contributes to its own encoding.",
        "Out-of-fold: compute encoding for fold 1 samples using only folds 2, 3, 4, 5 — no self-leakage.",
      ],
    },
    {
      id: "q-tab-kp22-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "One-hot encoding should always be preferred over target encoding for high-cardinality categorical features in gradient boosted tree models.",
      correctAnswer: "false",
      explanation:
        "For high-cardinality features with gradient boosted trees, target encoding is generally preferred. One-hot encoding with 10,000 categories creates 10,000 sparse binary features, making the feature space huge and tree splits expensive. Target encoding creates a single dense numerical feature per category, which GBTs split efficiently. LightGBM natively supports categorical features via optimal split finding, which is often best of all.",
      hints: [
        "One-hot: 10,000 columns. GBT must search all 10,000 for splits. Very expensive.",
        "Target encoding: 1 column. GBT finds a numeric threshold efficiently.",
      ],
    },
  ],
  "feature-selection-methods": [
    {
      id: "q-tab-kp23-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Recursive Feature Elimination selects features by iteratively removing the least important. What is its main limitation compared to SHAP-based feature selection?",
      options: [
        "RFE cannot be applied to non-linear models like gradient boosted trees",
        "RFE uses greedy backward elimination that may miss the optimal subset because removing the currently least important feature can change other features importance, and RFE requires re-training after each elimination step",
        "RFE cannot handle correlated features and always selects one from each correlated group arbitrarily",
        "RFE is biased toward high-cardinality features because they tend to have higher permutation importance",
      ],
      correctAnswer: 1,
      explanation:
        "RFE limitations: (1) Greedy backward elimination: the order of feature removal affects which subset is selected, and the greedy choice may not find the globally optimal subset; (2) Expensive: requires model retraining at each step; (3) Feature importance can change significantly when other features are removed. SHAP-based selection uses Shapley values computed once (efficiently for trees) without iterative retraining.",
      hints: [
        "Greedy is not globally optimal: removing feature A might make feature B more important.",
        "RFE cost: p model fits. SHAP selection: 1 model fit plus efficient TreeSHAP computation.",
      ],
    },
    {
      id: "q-tab-kp23-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Mutual information (MI) measures statistical dependence between a feature and the target. How does MI differ from Pearson correlation?",
      options: [
        "MI measures linear dependence; Pearson correlation measures non-linear dependence",
        "MI captures any statistical dependence (linear and non-linear) because it measures how much knowing the feature reduces uncertainty about the target; Pearson correlation only captures linear dependence and can be zero for strongly dependent variables",
        "MI and Pearson correlation measure the same thing; MI is simply the normalized version of Pearson correlation",
        "MI is always between 0 and 1 while Pearson is between -1 and 1; the key difference is that MI handles negative correlations better",
      ],
      correctAnswer: 1,
      explanation:
        "MI = integral of p(x,y) log[p(x,y) / (p(x)p(y))]. MI = 0 if and only if X and Y are independent; otherwise MI > 0. It captures all forms of statistical dependence. Classic counterexample: X uniform on [-1,1], Y = X^2. Pearson r=0 (uncorrelated). MI > 0 (strongly dependent). MI does not capture direction (positive/negative), only existence of dependence.",
      hints: [
        "X uniform on [-1,1], Y = X^2: Pearson r=0 (symmetric so no linear correlation). MI > 0 (strongly dependent).",
        "MI: information-theoretic measure of how much X tells you about Y. Captures all statistical dependence.",
      ],
    },
    {
      id: "q-tab-kp23-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Permutation feature importance and gain-based feature importance in gradient boosted trees always agree on which features are most important.",
      correctAnswer: "false",
      explanation:
        "PFI and gain-based importance can disagree substantially. Gain-based importance is biased toward high-cardinality features with more potential split points. For correlated features, PFI distributes importance between correlated features, while gain-based may assign all importance to whichever was split on first. SHAP is generally more reliable than both.",
      hints: [
        "High cardinality bias: features with many unique values accumulate more split gain.",
        "Correlated features: PFI spreads importance; gain-based may concentrate it arbitrarily.",
      ],
    },
  ],
  "data-preprocessing-pipelines": [
    {
      id: "q-tab-kp24-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the "pipeline" pattern in scikit-learn, and why is it critical for avoiding data leakage?',
      options: [
        "A pipeline chains multiple models together for ensemble prediction; it prevents leakage by averaging their outputs",
        "A pipeline chains preprocessing steps and a final estimator, fitting each step only on training data during cross-validation — preventing validation set information from contaminating preprocessing steps like scaling or imputation",
        "A pipeline applies transformations sequentially to avoid redundant computation; it prevents leakage by caching intermediate results",
        "A pipeline defines the order of feature engineering steps; leakage prevention is handled separately by proper train/test splitting",
      ],
      correctAnswer: 1,
      explanation:
        "Without a pipeline, fitting a StandardScaler on the full dataset before cross-validation means the scaler mean and std includes information from validation folds — leakage. With a pipeline, during each CV fold, the pipeline fits ALL preprocessing steps (scaler, imputer, encoder) on the training fold only, then transforms both training and validation folds using those training-fold statistics. This ensures preprocessing is correctly conditioned on training data only.",
      hints: [
        "Fit scaler on all data: validation fold statistics contaminate the scaler. Subtle but real leakage.",
        "Pipeline fit on training fold only: scaler sees only training data statistics. Correct.",
      ],
    },
    {
      id: "q-tab-kp24-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Quantile transformation is sometimes preferred over StandardScaler for tabular ML. Under what conditions does it provide the most benefit?",
      options: [
        "Quantile transformation is preferred when features are normally distributed, as it preserves the Gaussian shape",
        "Quantile transformation is preferred for heavy-tailed or skewed distributions (e.g., income, sales volume, counts) because it maps the distribution to uniform or normal via rank-based transformation, reducing outlier influence more aggressively than StandardScaler",
        "Quantile transformation is preferred for tree-based models that do not naturally handle monotonic transformations",
        "Quantile transformation is always preferred because it is more computationally efficient than StandardScaler",
      ],
      correctAnswer: 1,
      explanation:
        "QuantileTransformer maps each feature distribution to a target distribution (uniform or normal) using the empirical CDF. This is rank-based: robust to outliers and handles any marginal distribution shape. Most beneficial for highly skewed features (log-normal, Pareto-distributed) where StandardScaler leaves the distribution skewed, affecting linear models and distance-based methods. Tree-based models are insensitive to monotonic transformations, so benefit is limited for them.",
      hints: [
        "QuantileTransformer uses ranks (empirical CDF), not raw values — extreme outliers map to the edge of [0,1].",
        "Linear models and neural networks benefit from normalized distributions; tree models are invariant to monotonic transforms.",
      ],
    },
    {
      id: "q-tab-kp24-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Multiple Imputation by Chained Equations (MICE) produces better predictions than simple mean imputation for missing data when missingness is related to other features (Missing At Random).",
      correctAnswer: "true",
      explanation:
        "MICE iteratively imputes each feature with missing values using a model conditioned on all other features, capturing conditional relationships. Simple mean imputation ignores relationships between features, producing imputed values with lower variance than the true distribution and breaking feature correlations. Under MAR (probability of missingness depends on observed features), MICE produces approximately unbiased imputations while mean imputation introduces bias.",
      hints: [
        "MAR: missingness depends on observed features. MICE: impute using those observed features. Aligned assumption.",
        "Mean imputation: all missing values get the same value, breaking correlations. MICE: imputed value depends on individual other features.",
      ],
    },
  ],
  "calibration-tabular": [
    {
      id: "q-tab-kp25-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is a common calibration failure mode for gradient boosted trees?",
      options: [
        "GBTs tend to be overconfident (predicting probabilities near 0 or 1 too often) because their output can saturate",
        "GBTs tend to produce probabilities too close to 0.5 for balanced classes because individual trees have low accuracy",
        "GBTs are typically well-calibrated out of the box because they minimize a proper scoring rule",
        "GBTs can be overconfident or underconfident with no systematic pattern depending on depth and learning rate",
      ],
      correctAnswer: 0,
      explanation:
        "Gradient boosted trees (especially with many trees) tend to produce overconfident predictions — probabilities clustered near 0 and 1. This is because GBTs optimize a cross-entropy or squared error loss that can push probabilities to extremes in well-separated cases. Calibration plots for uncalibrated GBTs often show a sigmoidal curve. Platt scaling or isotonic regression are common calibration techniques.",
      hints: [
        "Overconfident: the model says 0.95 but the true positive rate at that threshold is only 0.7.",
        "Reliability diagram: overconfident models show an S-curve below the diagonal.",
      ],
    },
    {
      id: "q-tab-kp25-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Platt scaling calibrates a classifier output by fitting a logistic regression on the model raw scores. What dataset should Platt scaling be fitted on?",
      options: [
        "The same training data used to fit the original model, to ensure consistency with the training distribution",
        "A held-out calibration set or out-of-fold predictions from cross-validation, to avoid overfitting the calibration to the model training bias",
        "The test set, since Platt scaling is a post-processing step that does not affect training data predictions",
        "The full dataset (train plus test), since calibration benefits from maximum sample size",
      ],
      correctAnswer: 1,
      explanation:
        "Platt scaling on training data: the model predictions on its own training data are overconfident (memorized samples produce very confident predictions). Fitting logistic regression on overconfident scores produces a miscalibrated calibrator. The calibrator should be fitted on a held-out calibration set or on CV out-of-fold predictions (which the model never trained on), so the calibration input reflects true generalization uncertainty.",
      hints: [
        "Training set predictions: model is overconfident. Calibrate on this produces a wrong calibrator.",
        "OOF predictions: model never trained on these during that fold, representing true generalization.",
      ],
    },
    {
      id: "q-tab-kp25-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Expected Calibration Error (ECE) can be zero for a model that performs no better than random chance, because ECE only measures calibration, not discrimination.",
      correctAnswer: "true",
      explanation:
        "ECE measures the gap between predicted probabilities and actual outcomes grouped into bins. A model that always predicts exactly the base rate (say 0.1) for all samples has perfect calibration (ECE=0) but zero discrimination (AUROC=0.5). Calibration and discrimination are orthogonal: you need both metrics to fully evaluate a probabilistic classifier.",
      hints: [
        "A constant predictor always predicting the base rate has ECE=0: every bin correctly reflects the true positive rate.",
        "ECE=0 means calibrated. AUROC=0.5 means no discriminative power. You need both metrics.",
      ],
    },
  ],
  "leakage-detection": [
    {
      id: "q-tab-kp26-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A model achieves 99.5% AUC on validation but only 62% AUC in production. What is the most likely cause?",
      options: [
        "The model is underfit; use a larger model and retrain on more data",
        "Data leakage: the training/validation data contained features derived from the target variable or future information not available at prediction time; confirm by checking feature importance for suspiciously high-importance features and verifying each feature temporal availability",
        "Distribution shift: the production data has different statistics; confirm with a population stability index test",
        "The model is overfit; use stronger regularization and collect more training data",
      ],
      correctAnswer: 1,
      explanation:
        "A 37+ percentage point gap between validation and production AUC is a red flag for data leakage. Data leakage occurs when training features contain information not available at prediction time: future data, post-event labels disguised as features, or features constructed using the target. Diagnostic: check feature importance — if one feature has disproportionately high importance, investigate its construction. Verify temporal availability for each feature.",
      hints: [
        "Extreme validation performance followed by production failure is the canonical leakage signature.",
        "Investigate: is any feature constructed using the target variable, or using data available only after the event?",
      ],
    },
    {
      id: "q-tab-kp26-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is "target leakage" via feature construction, and give an example in a credit default prediction model?',
      options: [
        "Target leakage via feature construction occurs when training data is augmented with synthetic samples similar to the target",
        'Target leakage occurs when a feature is derived from information only available after the target is observed; in credit default, this could be including "number of missed payments in the 3 months following loan origination" when predicting default at origination time',
        "Target leakage occurs when the target variable is accidentally included as a feature",
        "Target leakage occurs when features are normalized using test set statistics",
      ],
      correctAnswer: 1,
      explanation:
        'Target leakage via feature construction: a feature incorporates future information relative to when the prediction is made. Example: predicting loan default at origination using "number of late payments in next 3 months" — this is future information not available at prediction time. More subtle: using account balance at the time of labeling (6 months after origination) rather than at origination time. The model learns a relationship that does not generalize to origination-time data.',
      hints: [
        "The test: is this feature available at the moment the prediction needs to be made? If not, it is leakage.",
        "Subtle leakage: balance at labeling time vs. balance at origination time — a small temporal shift creates leakage.",
      ],
    },
    {
      id: "q-tab-kp26-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Including a feature with zero missing values in training but high missingness in production is a form of data leakage.",
      correctAnswer: "false",
      explanation:
        "This is not data leakage (future/target information in features) but rather distribution shift or data quality inconsistency. The feature itself may be valid — the issue is that training and production pipelines produce different missingness patterns. This could arise from different data collection procedures or feature availability changes. While a serious deployment problem, it is categorized as distribution shift, not leakage.",
      hints: [
        "Data leakage: future/target information in features. Distribution shift: training and production statistics differ.",
        "High missingness in production means the feature is often missing — handle via imputation, not considered leaky.",
      ],
    },
  ],
  "model-compression-tab": [
    {
      id: "q-tab-kp27-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Knowledge distillation from a large tabular ensemble to a single model uses the ensemble soft probability outputs as training targets. What is the key advantage of soft labels over hard labels?",
      options: [
        "Soft labels allow the student model to train with a lower learning rate, preventing overfitting",
        'Soft labels encode inter-class similarity information and uncertainty estimates from the ensemble — for example, "60% class A, 30% class B" tells the student more about the decision boundary than a hard label "class A"',
        "Soft labels prevent gradient saturation in the student model output layer",
        "Soft labels allow the student model to use a different architecture without requiring output dimension alignment",
      ],
      correctAnswer: 1,
      explanation:
        'Hinton et al. (2015) "Distilling the Knowledge": hard labels are one-hot and convey only the correct class. Soft labels convey the ensemble uncertainty and inter-class relationships. A sample where the ensemble predicts "60% A, 30% B" tells the student that B is a plausible alternative — dark knowledge that hard label "A" loses. This helps the student learn a better-calibrated probability surface, especially near decision boundaries.',
      hints: [
        "Dark knowledge: probabilities assigned to wrong classes encode meaningful similarity information.",
        'Hard label "A": no information about alternatives. Soft label "60% A, 30% B": B is the next most plausible class.',
      ],
    },
    {
      id: "q-tab-kp27-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Feature pruning based on permutation feature importance carries what key risk for correlated features?",
      options: [
        "Permutation importance may rank features differently from SHAP, causing pruning to remove the wrong features",
        "For correlated features, permutation importance underestimates each individual feature importance (since removing one still lets the model use the correlated partner) — aggressive pruning of low-importance correlated features may remove all features in a correlated group, losing the information they collectively encode",
        "Permutation importance is computed on the training set, so pruning may remove features important for the test distribution",
        "Feature pruning based on importance can only be applied to linear models, not gradient boosted trees",
      ],
      correctAnswer: 1,
      explanation:
        "Correlated feature pruning risk: if features A and B are highly correlated, permuting A has little effect because B still carries the same information — both get low permutation importance. Aggressive pruning removes both, losing the information entirely. The correct approach is to first identify correlated feature groups, select one representative from each group, and then prune across groups based on importance.",
      hints: [
        "Correlated pair: permuting A barely hurts because B still contains A information.",
        "Solution: select one from each correlated group first, then prune the selected representatives.",
      ],
    },
    {
      id: "q-tab-kp27-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "A gradient boosted tree with 1000 trees can be losslessly compressed to fewer trees by identifying and removing trees whose removal does not significantly change ensemble predictions on the training set.",
      correctAnswer: "false",
      explanation:
        "Removing a tree from a GBT ensemble is not lossless — each tree contributes a small increment to the prediction, and the ensemble calibration depends on all trees. Trees that appear unimportant on training data may be important for specific tail samples. Approximate compression (tree distillation, simpler GBT retraining with fewer trees) always involves some quality tradeoff.",
      hints: [
        'Each tree contributes a small residual correction. Removing even a "small" tree changes predictions for some samples.',
        "True lossless compression would require mathematical equivalence — not achievable for GBTs.",
      ],
    },
  ],
  "survival-analysis-ml": [
    {
      id: "q-tab-kp28-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Survival analysis handles "censored" observations. What is censoring and why does it make standard regression or classification inappropriate?',
      options: [
        "Censoring occurs when feature values are missing; standard methods treat missing values as zero, biasing estimates",
        "Censoring occurs when the event of interest has not yet occurred at the observation time — we know the subject survived at least until time t but do not know the actual event time; standard regression on censored observations is biased because it uses the censoring time as if it were the true event time",
        "Censoring occurs when the target variable exceeds the measurement range; standard methods clip the target",
        "Censoring occurs when some classes have too few samples; survival methods handle this via importance weighting",
      ],
      correctAnswer: 1,
      explanation:
        "Censoring: in a clinical trial ending on date T, patients who have not experienced the event by T are right-censored. We know they survived at least until T but not when or if the event would occur. Using T as the event time in standard regression understates the true event time. Ignoring censored observations biases the estimate (survivorship bias). Survival analysis handles censoring correctly by conditioning on having survived to the censoring time.",
      hints: [
        "Censored: event has not happened yet. True event time >= censoring time. Standard regression uses censoring time as label — wrong.",
        "Kaplan-Meier estimates survival function accounting for the fact that censored patients contributed follow-up time.",
      ],
    },
    {
      id: "q-tab-kp28-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Random Survival Forest extends Random Forest to survival data. What splitting criterion does it use?",
      options: [
        "RSF uses mean squared error on survival time, treating censored observations as having survival time equal to the censoring time",
        "RSF uses the log-rank test statistic that tests whether survival distributions of the two child nodes are significantly different, properly handling censored observations",
        "RSF uses the concordance index directly as the splitting criterion, maximizing discrimination at each split",
        "RSF uses the negative log-likelihood of the Cox partial likelihood as the splitting criterion",
      ],
      correctAnswer: 1,
      explanation:
        "RSF (Ishwaran et al., 2008): each split is evaluated by the log-rank test statistic comparing survival distributions of the two proposed child nodes. The log-rank test is non-parametric and accounts for censoring correctly. At prediction time, the forest averages the cumulative hazard functions (Nelson-Aalen estimator) from each tree leaf, producing a full survival curve for each sample.",
      hints: [
        "Log-rank test: non-parametric test of whether two survival curves are identical. Perfect for splitting on survival data.",
        "RSF output: a full survival function S(t) for each sample, not just a scalar.",
      ],
    },
    {
      id: "q-tab-kp28-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "The C-index (concordance index) for survival analysis is equivalent to the AUROC for binary classification tasks with no censoring.",
      correctAnswer: "true",
      explanation:
        "The C-index measures the probability that among all comparable pairs, the one with higher predicted risk experiences the event earlier. When there is no censoring, every pair is comparable and the C-index equals the AUROC for binary classification (whether the event occurred by a fixed time). Both measure the probability that the model correctly orders a random pair.",
      hints: [
        "C-index = P(predicted risk of subject i > predicted risk of subject j | subject i experiences event before j).",
        "No censoring: every pair is comparable. C-index = AUROC for the corresponding binary classification problem.",
      ],
    },
  ],
  "causal-ml-tabular": [
    {
      id: "q-tab-kp29-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The Potential Outcomes Framework defines the Average Treatment Effect (ATE). What is the "fundamental problem of causal inference"?',
      options: [
        "The ATE cannot be estimated from observational data because confounders are always unmeasured",
        "For each individual, we observe only one potential outcome (treated or untreated) — never both simultaneously — making individual treatment effects unobservable and requiring assumptions to estimate population-level effects",
        "The ATE requires a randomized controlled trial; it cannot be estimated from observational data under any assumptions",
        "The fundamental problem is that treatment assignment is always confounded by unmeasured variables",
      ],
      correctAnswer: 1,
      explanation:
        "The fundamental problem of causal inference: individual i has potential outcomes Y_i(1) if treated and Y_i(0) if untreated, but we observe only one — the one corresponding to the actual treatment received. The individual treatment effect ITE_i = Y_i(1) - Y_i(0) is never directly observable. ATE = E[Y(1) - Y(0)] can be estimated from randomized experiments or from observational data under assumptions (no unmeasured confounders, positivity, consistency).",
      hints: [
        "You cannot be both treated and untreated simultaneously. The missing counterfactual is the core challenge.",
        "Observational studies: T depends on X (sicker patients get treatment) — confounding must be controlled.",
      ],
    },
    {
      id: "q-tab-kp29-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Double Machine Learning (DML, Chernozhukov et al., 2018) estimates treatment effects using cross-fitting. What is cross-fitting and why is it necessary?",
      options: [
        "Cross-fitting applies k-fold CV to select the best regularization parameter for nuisance models",
        "Cross-fitting fits nuisance models on one half of the data and computes residuals on the other half, then swaps — preventing overfitting of nuisance models from biasing the treatment effect estimate via regularization bias",
        "Cross-fitting averages the treatment effect estimates from multiple data splits to reduce variance",
        "Cross-fitting handles unmeasured confounders by using instrumental variables fitted via cross-validation",
      ],
      correctAnswer: 1,
      explanation:
        "DML cross-fitting addresses regularization bias: nuisance models predicting E[Y|X] and E[T|X] are regularized ML models. If residuals are computed on the same data used to fit the nuisance models, overfitting introduces bias in the treatment effect estimate. Cross-fitting: split data into K folds; fit nuisance on K-1 folds, compute residuals on the held-out fold; rotate. The treatment effect is estimated by regressing outcome residuals on treatment residuals, achieving Neyman orthogonality and root-n consistency.",
      hints: [
        "Regularization bias: an overfit nuisance model produces residuals that overfit too, biasing the treatment effect.",
        "Cross-fitting is like cross-validation for the nuisance step: fit on training folds, residualize on validation fold.",
      ],
    },
    {
      id: "q-tab-kp29-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Propensity score matching for treatment effect estimation requires that every individual in the treatment group has a comparable match in the control group (the positivity or common support assumption).",
      correctAnswer: "true",
      explanation:
        "Positivity (overlap/common support): every treated unit must have a control unit with a similar propensity score. If some treated units have no comparable controls (propensity probability near 1.0 for certain subgroups), their counterfactual outcomes cannot be estimated from observational data. Violations lead to extrapolation and biased ATE estimates. Checking propensity score distribution overlap between treated and control groups is a standard diagnostic.",
      hints: [
        "If treated units have propensity near 1.0 and controls near 0.0, there is no overlap — no valid matching.",
        "Common support check: plot propensity score distributions for treated vs. control. They should substantially overlap.",
      ],
    },
  ],
  "tabular-foundation-models": [
    {
      id: "q-tab-kp30-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TabPFN (Hollmann et al., 2022) is a pre-trained transformer for in-context learning on small tabular datasets. What is its key mechanism and limitation?",
      options: [
        "TabPFN pre-trains on a large corpus of real-world tabular datasets and fine-tunes on new datasets using gradient descent; limited by pre-training dataset diversity",
        "TabPFN is pre-trained on synthetic tabular datasets from a Bayesian network prior; at inference, the entire training set is fed as context and predictions are made in a single forward pass without any gradient updates; limited to small datasets (typically fewer than 1000 samples) due to attention complexity",
        "TabPFN uses meta-learning across multiple tabular datasets to learn a universal feature representation; limited to datasets with fewer than 100 features",
        "TabPFN trains a separate model per dataset using a shared backbone; limited by the time required for dataset-specific fine-tuning",
      ],
      correctAnswer: 1,
      explanation:
        "TabPFN (Hollmann et al., 2022): pre-trains on synthetic data generated from a Bayesian network prior. At inference, the entire training set is given as context in a single forward pass. The key limitation: O(n^2) attention complexity means it cannot scale beyond roughly 1000 training samples.",
      hints: [
        "In-context learning: the training set is the prompt. No gradient updates at inference.",
        "Synthetic pre-training: no real datasets needed for pre-training, avoiding dataset licensing issues.",
      ],
    },
    {
      id: "q-tab-kp30-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is transfer learning less effective for tabular data than for images or text?",
      options: [
        "Tabular data has too many features for transformer architectures to handle efficiently",
        "Tabular datasets have heterogeneous schema (different feature names, meanings, and types across datasets) and lack the spatial or sequential structure that enables features learned on one dataset to transfer meaningfully to another — unlike pixels or tokens which are semantically consistent across datasets",
        "Tabular data requires training from scratch because gradient-based methods do not converge on heterogeneous feature spaces",
        "Tabular models cannot be pre-trained because the optimization landscape has too many local minima",
      ],
      correctAnswer: 1,
      explanation:
        'Transfer learning fails for tabular data due to: (1) Heterogeneous schema: "feature 1" in dataset A and "feature 1" in dataset B have no semantic connection (unlike pixels or word tokens); (2) No universal structure: images share spatial locality; text shares sequential grammar. Tabular datasets have different feature meanings, orderings, and types across datasets. Methods like TabPFN circumvent this by in-context learning rather than direct weight transfer.',
      hints: [
        "Image pixel (1,1) means the same thing across datasets. Tabular column 1 means different things in different datasets.",
        "Transfer relies on shared structure. Tabular has heterogeneous structure by definition.",
      ],
    },
    {
      id: "q-tab-kp30-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "When using a GBM for multi-step-ahead time series forecasting, the recursive strategy has lower error accumulation compared to the direct strategy because it trains fewer models.",
      correctAnswer: "false",
      explanation:
        "The recursive strategy has HIGHER error accumulation than the direct strategy, not lower. Recursive: train one model, use its predictions as inputs for subsequent predictions — errors propagate. Direct: train one model per horizon h using true historical values as inputs — no error propagation but requires separate models per horizon. The recursive strategy is simpler but accumulates errors at each step, especially for long horizons.",
      hints: [
        "Recursive: model predicts y(t+1), then uses that prediction to predict y(t+2) — errors compound.",
        "Direct: model for horizon h uses only true historical values — no error accumulation from previous horizon predictions.",
      ],
    },
  ],
};

Object.assign(questions, extraQuestions);

const moreTabularQuestions: Record<string, Question[]> = {
  "calibration-tabular-extended": [
    {
      id: "q-tab-kp31-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Isotonic regression is a non-parametric calibration method. What is its key advantage over Platt scaling for gradient boosted trees?",
      options: [
        "Isotonic regression is faster to compute than Platt scaling for large calibration datasets",
        "Isotonic regression is more flexible — it fits any monotonic calibration function rather than the logistic sigmoid shape, making it more effective when the miscalibration pattern is non-sigmoidal",
        "Isotonic regression provides uncertainty estimates for the calibrated probabilities",
        "Isotonic regression is robust to outliers in the calibration set",
      ],
      correctAnswer: 1,
      explanation:
        "Platt scaling fits a logistic function (sigmoid) to model raw scores. GBTs often have more complex miscalibration patterns. Isotonic regression (pool adjacent violators algorithm) fits a piecewise constant monotone function without assuming any functional form. This greater flexibility allows better correction of non-sigmoidal miscalibration, but it risks overfitting on small calibration sets.",
      hints: [
        "Platt = logistic (one shape). Isotonic = any monotone shape. More flexible but more data needed.",
        "GBT miscalibration is often more complex than a simple sigmoid — isotonic regression can capture this.",
      ],
    },
    {
      id: "q-tab-kp31-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Temperature scaling is a calibration technique for neural networks. How does it work and why is it preferred for multi-class calibration?",
      options: [
        "Temperature scaling adds a temperature parameter T to the softmax denominator: softmax(logits / T). T > 1 makes the distribution more uniform (less confident); it is preferred for multi-class because it requires only one parameter regardless of the number of classes",
        "Temperature scaling replaces the final layer activation with a temperature-controlled sigmoid, calibrating each class independently",
        "Temperature scaling scales input features by a temperature parameter, normalizing gradient norms during training",
        "Temperature scaling applies a learned temperature per class, requiring C additional parameters for C-class calibration",
      ],
      correctAnswer: 0,
      explanation:
        "Temperature scaling: apply softmax(logits / T) instead of softmax(logits). T is a single scalar optimized on a validation set to minimize NLL. T > 1 makes the distribution softer (less confident); T < 1 makes it sharper. For multi-class, the single parameter T scales all logits equally, preserving relative ordering of class probabilities. Preferred because: (1) Only 1 parameter regardless of number of classes; (2) Preserves accuracy; (3) Simple and effective.",
      hints: [
        "Temperature T > 1: divide logits by T > 1, making them smaller, making softmax more uniform. Lower confidence.",
        "Single parameter for all classes: much more data-efficient than per-class calibration methods.",
      ],
    },
    {
      id: "q-tab-kp31-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "A model with perfect calibration (ECE = 0) will also have maximum AUROC (AUROC = 1.0) because calibration implies perfect probability estimation.",
      correctAnswer: "false",
      explanation:
        "Calibration and discrimination are independent: a perfectly calibrated model can have any AUROC from 0.5 (random) to 1.0 (perfect). A model always predicting the base rate has ECE=0 but is completely useless for discrimination (AUROC=0.5). Perfect AUROC requires correctly ranking all pairs — a stronger requirement than calibration. Both are necessary for a fully useful probabilistic classifier.",
      hints: [
        "ECE = 0 means probabilities are accurate on average. AUROC = 1 means the model perfectly ranks all samples.",
        "A constant predictor at the base rate has ECE=0 but cannot rank samples at all.",
      ],
    },
  ],
  "leakage-detection-advanced": [
    {
      id: "q-tab-kp32-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A feature with near-zero variance on the training set but high variance on the test set signals what potential problem?",
      options: [
        "The feature was incorrectly standardized; re-standardize using test set statistics",
        "The feature may have been constant during training data collection (e.g., a system default value) but changed in production, indicating the training and test periods come from different operational contexts — a distribution shift or data quality issue",
        "The feature was label-encoded with a fixed vocabulary and new categories appear in the test set",
        "The feature was derived from training set labels and its variance reflects label distribution, not a real-world feature",
      ],
      correctAnswer: 1,
      explanation:
        'A near-zero variance training feature that is high-variance in test signals distribution shift or data quality inconsistency. Example: "data_source_version" was always "v1" in training (near-zero variance) but takes multiple values in production. Or a sensor was flat during training (sensor malfunction) but works in production. This indicates the training data is not representative of the deployment distribution.',
      hints: [
        "Near-zero variance in training: model learns to ignore this feature (no information in training).",
        "High variance in production: now the feature has signal the model never learned to use.",
      ],
    },
    {
      id: "q-tab-kp32-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is "temporal leakage" in a churn prediction model, and how would you detect it?',
      options: [
        "Temporal leakage occurs when training data spans multiple years; detect by checking if model performance varies by year",
        "Temporal leakage occurs when features derived from events after the prediction date are included; detect by auditing each feature timestamp and ensuring it predates the prediction date for every training example",
        "Temporal leakage occurs when the training and test periods overlap; detect by ensuring strictly non-overlapping time windows",
        "Temporal leakage occurs when seasonal patterns in training data do not represent the test season",
      ],
      correctAnswer: 1,
      explanation:
        'Temporal leakage in churn: the prediction date is month M (predict whether customer churns in month M+1). A leaky feature: "number of support tickets in month M" — if this is computed at the labeling date when we already know they churned, it might include information from after the prediction date. Detection: for each feature, verify the timestamp of data used to compute it is strictly before the prediction date.',
      hints: [
        "The check: could this feature value be different if computed on the prediction date vs. the labeling date?",
        'Subtle form: "days since last login" computed at labeling time vs. prediction time — potentially different values.',
      ],
    },
    {
      id: "q-tab-kp32-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "A model trained with target leakage will show poor performance in cross-validation because cross-validation inherently prevents leakage between folds.",
      correctAnswer: "false",
      explanation:
        "Standard k-fold cross-validation does NOT prevent target leakage from feature construction. If a leaky feature (containing target information) is included in the feature matrix before splitting into folds, all folds contain the leakage — the model uses leaked information in both training and validation phases, appearing to have high performance in CV but failing in production. CV prevents leakage only from the train/validation split itself, not from features constructed using the target before any splitting.",
      hints: [
        "Leaky feature construction: feature is derived from target before CV splits — both train and validation folds contain the leakage.",
        "CV can only prevent leakage at the fitting step. Leakage baked into the feature matrix before CV is invisible to CV.",
      ],
    },
  ],
  "class-imbalance-advanced": [
    {
      id: "q-tab-kp33-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ADASYN (Adaptive Synthetic Sampling) improves over SMOTE by adapting the number of synthetic samples generated per minority class sample. How does it adapt?",
      options: [
        "ADASYN generates more synthetic samples for minority instances far from the decision boundary, focusing on easy minority cases",
        "ADASYN generates more synthetic samples for minority instances that have more majority class neighbors (harder to classify), concentrating oversampling in the boundary region where the model struggles most",
        "ADASYN adapts the number of synthetic samples based on local minority class density, generating more in sparse regions",
        "ADASYN uses the model current predictions to generate samples only for instances currently misclassified",
      ],
      correctAnswer: 1,
      explanation:
        "ADASYN: for each minority sample x_i, compute r_i = (number of majority class neighbors among k-NN) / k. Minority samples with higher r_i are in more majority-dominated regions (harder to classify). ADASYN generates synthetic samples proportional to r_i — more samples where the minority class is most difficult. This focuses oversampling on the decision boundary rather than distributing uniformly across the minority class.",
      hints: [
        "r_i high = surrounded by majority class = hard to classify. Generate more samples here.",
        "SMOTE generates equal samples per minority instance. ADASYN adapts: hard cases get more samples.",
      ],
    },
    {
      id: "q-tab-kp33-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Threshold optimization is an important step for imbalanced classification. What is the optimal threshold under F1 score maximization?",
      options: [
        "The optimal threshold is always 0.5 for balanced F1; only the class weights need to be adjusted for imbalanced data",
        "The optimal F1 threshold is found by evaluating F1 at each candidate threshold on a validation set and selecting the maximum; this threshold is almost always lower than 0.5 for imbalanced data where the positive class is rare",
        "The optimal F1 threshold is sqrt(prevalence), which analytically balances precision and recall for any imbalance ratio",
        "The optimal F1 threshold equals the positive class prevalence",
      ],
      correctAnswer: 1,
      explanation:
        "For imbalanced data, the default threshold of 0.5 is typically suboptimal for F1. Since the positive class is rare, the model predicted probabilities are often below 0.5 for many true positives, so using 0.5 as threshold produces many false negatives (low recall). The optimal F1 threshold is found empirically on a validation set by sweeping thresholds from 0 to 1. For rare positive classes, the optimal threshold is often much lower than 0.5.",
      hints: [
        "Rare positive class: model probabilities for positives cluster below 0.5. Using 0.5 threshold misses many.",
        "Threshold sweep on validation set is the standard approach. No closed-form solution for arbitrary models.",
      ],
    },
    {
      id: "q-tab-kp33-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Under-sampling the majority class is generally preferred over over-sampling the minority class because it preserves the original data distribution and does not introduce synthetic data artifacts.",
      correctAnswer: "false",
      explanation:
        "Under-sampling discards real training data, potentially removing informative majority class samples and reducing effective training set size. It is not generally preferred. Over-sampling (SMOTE, ADASYN) preserves all original data and adds synthetic minority samples. The choice depends on dataset size: if the dataset is large, under-sampling may be acceptable. If small, over-sampling is typically preferred. Combined methods often outperform pure under-sampling.",
      hints: [
        "Under-sampling: throw away majority class data. Loses information.",
        "Over-sampling: add synthetic minority data. Keeps all original data. Generally preferred when data is scarce.",
      ],
    },
  ],
  "categorical-encoding-advanced": [
    {
      id: "q-tab-kp34-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Leave-one-out encoding is a variant of target encoding that computes the category mean excluding the current sample. What is its advantage?",
      options: [
        "LOOE is faster to compute because it avoids k-fold cross-validation",
        "LOOE reduces direct target leakage for each training sample by computing the category mean excluding that sample own target value — the encoded value cannot be inflated by the sample own target contribution",
        "LOOE handles rare categories better by using a leave-one-out estimator with lower variance for small samples",
        "LOOE is equivalent to smoothed target encoding but without requiring a smoothing parameter",
      ],
      correctAnswer: 1,
      explanation:
        "Standard target encoding for sample i in category A: encode with mean(y | category=A) including y_i — direct leakage. LOOE: encode sample i with mean(y | category=A, excluding sample i). This removes the self-contribution. For large categories, the difference is small. For categories with few samples, LOOE substantially reduces leakage.",
      hints: [
        "Standard target encoding: mean includes the sample itself. LOOE: exclude the sample from its own mean.",
        "Category with 2 samples: standard encoding = (y_i + y_j)/2. LOOE = y_j only for sample i. Large difference.",
      ],
    },
    {
      id: "q-tab-kp34-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'CatBoost handles categorical features natively using "ordered target statistics." What does "ordered" mean and how does it prevent leakage?',
      options: [
        "CatBoost orders categories by their target mean and uses the rank as encoding, preventing leakage by not using raw target values",
        "CatBoost uses a random permutation of the training set; for each sample, the target statistic is computed only from samples appearing before it in the permutation — ensuring each sample encoding never includes its own target value",
        "CatBoost orders samples by predicted probability and uses the ordering to compute sequential target statistics",
        "CatBoost uses the temporal ordering of samples (by timestamp) to compute expanding-window target statistics",
      ],
      correctAnswer: 1,
      explanation:
        "CatBoost ordered target statistics: a random permutation is drawn for the training set. For sample sigma(i), the target statistic for its category is computed from samples sigma(1), ..., sigma(i-1) — all samples appearing before it in the permutation. This ensures no sample encoding includes its own target. A new permutation is drawn for each tree to reduce variance.",
      hints: [
        "Random permutation: sample i only sees samples before it in the permutation order.",
        "Each tree gets a new permutation: reduces variance while maintaining the ordered statistics guarantee.",
      ],
    },
    {
      id: "q-tab-kp34-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Embedding categorical features with a learned embedding layer always outperforms one-hot encoding for neural network models on tabular data.",
      correctAnswer: "false",
      explanation:
        "Learned embeddings outperform one-hot encoding for high-cardinality features where one-hot creates very sparse representations. For low-cardinality features (e.g., gender with 2-3 values), one-hot is often equally effective and simpler. Embeddings require sufficient data to learn meaningful representations — for rare categories, embeddings may overfit. Performance depends on cardinality, dataset size, and embedding dimension.",
      hints: [
        "High cardinality (1000+ unique values): embeddings far better than one-hot (1000 binary columns).",
        "Low cardinality (2-5 unique values): one-hot is simple and often comparable to embeddings.",
      ],
    },
  ],
  "continual-learning-tab": [
    {
      id: "q-tab-kp35-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Concept drift in deployed tabular ML models can be detected using which approaches?",
      options: [
        "Using t-tests to compare mean feature values between training and production data at regular intervals",
        "Population Stability Index for feature drift and Kolmogorov-Smirnov or chi-squared test for distribution shift in each feature; monitoring the model output distribution for output drift; and tracking performance metrics with labeled production data",
        "Using the AUROC of a binary classifier trained to distinguish training samples from production samples — high AUROC indicates distribution shift",
        "Both B and C are valid approaches; the choice depends on whether labels are available in production",
      ],
      correctAnswer: 3,
      explanation:
        "Multiple drift detection approaches are valid: (1) PSI, K-S, chi-squared for individual feature distributions; (2) Discriminative drift detection (train a classifier to distinguish old vs. new data — high accuracy indicates drift); (3) Output distribution monitoring; (4) Performance monitoring with labeled data. In production, labels are often delayed, so feature and output drift monitoring are primary tools. When labels arrive, performance monitoring provides the most direct signal.",
      hints: [
        "PSI measures feature distribution shift. Discriminative test: can a classifier tell old from new data?",
        "The right answer depends on label availability — B and C are complementary tools, so D is correct.",
      ],
    },
    {
      id: "q-tab-kp35-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Elastic Weight Consolidation (EWC) was proposed for continual learning. What is its approach to preventing catastrophic forgetting?",
      options: [
        "EWC uses a replay buffer storing previous task examples, mixing them with new task data during training",
        "EWC adds a regularization term penalizing changes to parameters important for previous tasks, where importance is measured by the Fisher information matrix diagonal — critical parameters are consolidated and can change only slowly",
        "EWC uses separate task-specific output heads for each task, sharing only the lower-layer representations",
        "EWC applies gradient masking, zeroing out gradients for parameters used in previous tasks",
      ],
      correctAnswer: 1,
      explanation:
        "EWC (Kirkpatrick et al., 2017): after learning task A, estimate parameter importance using the Fisher information matrix diagonal. When learning task B, add regularization: lambda * sum_i F_i * (theta_i - theta_A_i)^2, where F_i is the Fisher importance and theta_A_i is the optimal value from task A. High-F parameters (critical for task A) are penalized more strongly for changing, preserving task A performance while still allowing learning task B.",
      hints: [
        "Fisher information diagonal: how much does the loss change when parameter i changes? High F = important parameter.",
        "EWC regularizer: spring constant F_i pulls parameter i back toward theta_A_i. Strong spring for important parameters.",
      ],
    },
    {
      id: "q-tab-kp35-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "For production tabular ML systems, complete model retraining from scratch on all accumulated historical data is always preferred over incremental updates because it avoids catastrophic forgetting.",
      correctAnswer: "false",
      explanation:
        "Full retraining on all historical data is expensive and may not be feasible for large datasets. Furthermore, under significant concept drift, recent data may be more relevant than old data, making full historical retraining harmful. Periodic retraining on a sliding window of recent data may be more practical. The right approach depends on drift severity, data volume, and computational constraints.",
      hints: [
        "Under strong concept drift, training on stale old data may hurt more than help.",
        "Practical constraint: retraining on 5 years of accumulated data daily is often not feasible.",
      ],
    },
  ],
  "multi-target-tabular": [
    {
      id: "q-tab-kp36-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In multi-label classification, what is the key difference between binary relevance and classifier chains?",
      options: [
        "Binary relevance trains one binary classifier per label independently; classifier chains train labels sequentially, where each classifier includes predictions of previous classifiers as features — capturing label correlations that binary relevance ignores",
        "Binary relevance uses a multi-class softmax output; classifier chains use multiple sigmoid outputs",
        "Binary relevance requires a single model; classifier chains require one model per label ordered by frequency",
        "Binary relevance is for label imbalance; classifier chains are for balanced label distributions",
      ],
      correctAnswer: 0,
      explanation:
        "Binary Relevance: train k independent binary classifiers (one per label). Simple but ignores correlations between labels. Classifier Chains (Read et al., 2011): order labels L_1, ..., L_k. Train L_j using features X plus predictions of L_1, ..., L_{j-1}. Each classifier can exploit correlations with previous labels. This captures label dependence at the cost of error propagation through the chain.",
      hints: [
        "Binary relevance: k independent classifiers. Chains: k classifiers where each uses prior label predictions as features.",
        "Label correlation example: if label A is present, label B is likely. Chains capture this; binary relevance does not.",
      ],
    },
    {
      id: "q-tab-kp36-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multi-task learning for tabular data trains a single model on multiple related prediction tasks simultaneously. What is the key theoretical motivation?",
      options: [
        "Multi-task learning always achieves better performance because it has access to more total training data",
        "Multi-task learning leverages inductive transfer: shared representations learned across tasks encode common structure that regularizes each individual task, improving generalization especially with limited labeled data",
        "Multi-task learning reduces inference cost by requiring only one forward pass for multiple predictions",
        "Multi-task learning is primarily useful for reducing labeling costs since each sample can contribute labels for multiple tasks",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-task learning (Caruana, 1997): if tasks share underlying structure (common features, causal mechanisms, or latent factors), training them jointly encourages shared representations to capture this common structure. This acts as a regularizer: the model cannot overfit to task-specific noise because the shared layers must also perform well on other tasks. Particularly beneficial when individual tasks have few labels. Negative transfer can occur when tasks are unrelated.",
      hints: [
        "Shared representation: forced to be useful for multiple tasks, it captures common structure rather than task-specific noise.",
        "Negative transfer: if tasks are unrelated, sharing hurts. MTL only helps when tasks share common mechanisms.",
      ],
    },
    {
      id: "q-tab-kp36-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In hierarchical multi-label classification, predicting a child label without predicting its parent is a common failure mode of flat classification approaches.",
      correctAnswer: "true",
      explanation:
        'Flat classifiers for hierarchical label taxonomies (e.g., Electronics > Phones > Smartphones) treat labels independently and can predict "Smartphones" without predicting "Phones" or "Electronics" — hierarchically inconsistent. Hierarchical classification methods enforce that if a child label is predicted, all ancestor labels are also predicted. Constraint violation rates are a reported metric for hierarchical classification tasks.',
      hints: [
        "Flat classifier: predicts each label independently. No constraint that child implies parent.",
        'Hierarchical consistency: if "Smartphones" is predicted, "Phones" and "Electronics" must also be predicted.',
      ],
    },
  ],
  "causal-ml-advanced": [
    {
      id: "q-tab-kp37-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Uplift modeling (heterogeneous treatment effect estimation) differs from standard predictive modeling. What is the target?",
      options: [
        "Uplift modeling predicts the response rate (probability of conversion) for treated customers",
        "Uplift modeling predicts the incremental effect of treatment on each individual — the difference in outcome probability between treating and not treating — rather than the outcome probability itself",
        "Uplift modeling predicts whether a customer will churn, weighted by the cost of the prevention treatment",
        "Uplift modeling predicts the optimal treatment dosage for each customer based on their feature profile",
      ],
      correctAnswer: 1,
      explanation:
        'Uplift modeling target: ITE_i = P(Y=1 | T=1, X=x_i) - P(Y=1 | T=0, X=x_i). This differs from response modeling: a response model predicts P(Y=1 | X, T=1). Customers with high response probability but also high "do-it-anyway" probability have low uplift. Uplift models identify Persuadables — customers who respond because of the treatment, not despite it.',
      hints: [
        'High response rate != high uplift. A "Sure Thing" who converts with or without treatment has zero uplift.',
        "Uplift = marginal effect of treatment. Target: customers who are on the fence and nudged by treatment.",
      ],
    },
    {
      id: "q-tab-kp37-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The S-learner and T-learner are meta-learner approaches for heterogeneous treatment effect estimation. What is the key difference?",
      options: [
        "S-learner uses supervised learning; T-learner uses semi-supervised learning with unlabeled data",
        "S-learner uses the Shapley-based treatment effect; T-learner uses the Targeted MLE framework",
        "S-learner trains a single model using treatment indicator as a feature, estimating ITE as the prediction difference with T=1 vs T=0; T-learner trains separate models for treated and control groups and estimates ITE as the difference between the two models predictions",
        "S-learner is for continuous treatments; T-learner is for binary treatments",
      ],
      correctAnswer: 1,
      explanation:
        "S-learner: fit a single model mu(x, t) with treatment T as a feature. ITE(x) = mu(x, 1) - mu(x, 0). Risk: treatment indicator T may be ignored by the model due to regularization. T-learner: fit mu_1(x) on treated samples and mu_0(x) on control samples separately. ITE(x) = mu_1(x) - mu_0(x). Risk: overfits to the respective subsets. X-learner (Kunzel et al., 2019) addresses limitations of both.",
      hints: [
        "S-learner: one model with T as feature. Prediction difference estimates ITE.",
        "T-learner: two separate models. Difference between their predictions estimates ITE.",
      ],
    },
    {
      id: "q-tab-kp37-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a randomized controlled trial (RCT), confounding bias is eliminated because treatment assignment is independent of all measured and unmeasured covariates.",
      correctAnswer: "true",
      explanation:
        "In a perfect RCT, treatment is assigned by a random mechanism (coin flip) independent of all subject characteristics — measured and unmeasured. This satisfies the ignorability assumption: Y(0), Y(1) are independent of T. This eliminates confounding: treated and control groups are statistically identical in expectation. The ATE can be estimated simply as the difference in mean outcomes.",
      hints: [
        "Randomization makes T independent of Y(0), Y(1) — no confounding by design.",
        "Observational studies: T depends on X (sicker patients get treatment) — confounding must be controlled.",
      ],
    },
  ],
  "tabular-data-augmentation": [
    {
      id: "q-tab-kp38-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CTGAN (Conditional Tabular GAN) addresses specific challenges of tabular data compared to standard GANs. What are the main challenges it addresses?",
      options: [
        "CTGAN addresses that tabular data has both continuous and categorical features with complex multimodal distributions; it uses conditional generation with mode-specific normalization for continuous features and a training-by-sampling procedure for imbalanced categoricals",
        "CTGAN addresses that tabular data has no spatial structure; it uses a graph-based architecture instead of convolutional layers",
        "CTGAN addresses that GANs cannot generate reproducible synthetic datasets; it uses a deterministic decoder",
        "CTGAN addresses that tabular data requires exact integer values; it uses a rounding layer in the generator",
      ],
      correctAnswer: 0,
      explanation:
        "Standard GANs struggle with tabular data because: (1) Mixed types require different generation strategies; (2) Multi-modal continuous feature distributions; (3) Highly imbalanced categoricals. CTGAN addresses these with mode-specific normalization (VGM) for continuous features, conditional generation to ensure rare categories are generated, and training-by-sampling to balance across categories.",
      hints: [
        "Standard GAN output is continuous. Categorical features need discretization — not trivially handled.",
        "Mode-specific normalization: fit a variational Gaussian mixture, normalize each sample by which mode it belongs to.",
      ],
    },
    {
      id: "q-tab-kp38-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MixUp augmentation for tabular data creates synthetic samples by linearly interpolating between pairs. What is the key assumption and when does it fail?",
      options: [
        "MixUp assumes feature independence; it fails when features are strongly correlated and interpolation creates impossible samples",
        "MixUp assumes the decision boundary is linear; it fails for problems with complex non-linear boundaries",
        "MixUp assumes the label function is linear in the input space (the interpolated sample label should be the interpolated label); it fails when the label function has sharp boundaries where an interpolated point between two classes may definitively belong to one class",
        "MixUp assumes all features are continuous; it fails when categorical features are present",
      ],
      correctAnswer: 2,
      explanation:
        "MixUp creates x_mix = lambda * x_i + (1-lambda) * x_j, y_mix = lambda * y_i + (1-lambda) * y_j. The assumption: the label function is linear/smooth in the input space. Failure: if x_i is class A and x_j is class B with a hard boundary between them, the interpolated point may actually be in a high-probability region of class A. Training the model with a soft label (50% A, 50% B) on a point that is class A creates a misleading training signal.",
      hints: [
        'MixUp assumption: interpolation yields a point that is "between" the two samples in label space too.',
        "Tabular failure: two customer records interpolated may not represent any real customer type.",
      ],
    },
    {
      id: "q-tab-kp38-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Synthetic data generated by CTGAN or similar tabular GANs provides strong differential privacy guarantees because it does not share the original data directly.",
      correctAnswer: "false",
      explanation:
        "Synthetic tabular data generated by GANs does NOT provide formal differential privacy guarantees. GANs sometimes reproduce exact training samples — especially rare ones. Membership inference attacks can determine if a specific individual was in the training set. Formal differential privacy requires injecting calibrated noise during training (e.g., DP-SGD). Synthetic data may reduce some privacy risks but should not be equated with differential privacy.",
      hints: [
        "GAN memorization: GANs sometimes reproduce exact training samples, especially rare ones.",
        "Formal DP guarantee: requires DP-SGD or similar during training, not achievable by standard GAN training.",
      ],
    },
  ],
  "model-selection-tabular": [
    {
      id: "q-tab-kp39-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "AutoML systems automate model selection and hyperparameter tuning. What is the most significant risk of using AutoML without domain understanding?",
      options: [
        "AutoML systems always choose the most complex model, leading to overfitting regardless of dataset size",
        "AutoML optimizes for a validation metric without understanding business constraints — it may select models with high validation AUC but poor calibration, high inference latency, or features that constitute data leakage, which only domain knowledge can detect",
        "AutoML systems cannot handle categorical features or missing data, requiring manual preprocessing",
        "AutoML is computationally too expensive for real-world tabular datasets with more than 100,000 samples",
      ],
      correctAnswer: 1,
      explanation:
        "AutoML risk without domain understanding: (1) Leakage: AutoML may include leaky features and achieve perfect validation AUC — only domain knowledge identifies which features are temporally invalid; (2) Business constraints: AutoML optimizes a metric but may select a model too slow for real-time inference or too complex for regulatory requirements; (3) Calibration: AutoML rarely optimizes for calibration; (4) Feature semantics: AutoML may create mathematically valid but semantically nonsensical features.",
      hints: [
        'AutoML cannot distinguish "validation AUC is high due to a leaky feature" from legitimate model quality.',
        "Business constraint: a 99% AUC model with 2-second inference is useless for real-time scoring.",
      ],
    },
    {
      id: "q-tab-kp39-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Stacking (stacked generalization) is a model combination technique. How does it differ from simple averaging?",
      options: [
        "Stacking uses the same base models as averaging but applies them to different subsets of features",
        "Stacking trains a meta-learner on the out-of-fold predictions of base models, learning the optimal combination weights and potentially non-linear combinations; simple averaging uses fixed equal weights without learning from data",
        "Stacking requires base models to be of the same type; averaging can combine heterogeneous models",
        "Stacking is equivalent to averaging with learned weights; the difference is only computational efficiency",
      ],
      correctAnswer: 1,
      explanation:
        "Stacking: (1) Train K base models using K-fold CV, generating out-of-fold predictions for all training samples; (2) Train a meta-learner using the K base model OOF predictions as features and true labels as targets. The meta-learner learns the optimal combination — not necessarily equal weights, and potentially non-linear. Simple averaging uses fixed equal weights. Stacking can learn that model A is better for certain subpopulations and model B for others.",
      hints: [
        "Stacking meta-learner: learns how to weight and combine base models from data.",
        "OOF predictions are critical to avoid leakage — the meta-learner sees predictions the base models made on held-out data.",
      ],
    },
    {
      id: "q-tab-kp39-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Nested cross-validation (outer loop for model evaluation, inner loop for hyperparameter selection) provides an unbiased estimate of the generalization performance of the model selection and fitting process.",
      correctAnswer: "true",
      explanation:
        "Nested CV: outer K folds evaluate the entire pipeline. For each outer fold: inner K folds select hyperparameters using only the outer training fold; the outer test fold evaluates the selected model. This ensures the outer test fold is never used for hyperparameter selection, providing an unbiased estimate of the full model selection pipeline generalization performance. Without nested CV, standard CV for both HP tuning and evaluation is optimistically biased.",
      hints: [
        "Standard CV for HP tuning: test folds influence HP selection indirectly. Optimistic bias.",
        "Nested CV: outer test fold is never seen during any HP selection. Truly held-out evaluation.",
      ],
    },
  ],
  "tabular-fairness": [
    {
      id: "q-tab-kp40-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Demographic parity and equalized odds are two common fairness metrics. What is the key difference?",
      options: [
        "Demographic parity requires equal positive prediction rates across groups; equalized odds additionally requires equal true positive rates AND equal false positive rates across groups — accounting for base rate differences",
        "Demographic parity applies to binary classification; equalized odds applies to multi-class classification",
        "Demographic parity requires equal accuracy across groups; equalized odds requires equal AUROC",
        "Demographic parity measures outcome disparity; equalized odds measures disparity in treatment decisions",
      ],
      correctAnswer: 0,
      explanation:
        "Demographic parity: P(Y_hat=1 | group=A) = P(Y_hat=1 | group=B) — equal positive prediction rates. Equalized odds (Hardt et al., 2016): P(Y_hat=1 | Y=y, group=A) = P(Y_hat=1 | Y=y, group=B) for y in {0,1} — equal true positive rates AND equal false positive rates across groups, conditioning on true labels. Equalized odds requires the model to be equally accurate for both classes across groups.",
      hints: [
        "Demographic parity: equal selection rate regardless of true label. Can be satisfied by biased selection.",
        "Equalized odds: equal TPR and FPR. Model must make equally few errors for both groups and both true classes.",
      ],
    },
    {
      id: "q-tab-kp40-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The impossibility theorem of fairness states that when group base rates differ, certain combinations of fairness criteria cannot simultaneously hold. Which combination is provably impossible?",
      options: [
        "Demographic parity and equalized odds cannot both hold simultaneously when base rates differ",
        "Calibration (predictive parity) and equalized odds (equal TPR and FPR) cannot both hold when base rates differ — a calibrated model that accurately reflects different base rates will necessarily have different TPRs or FPRs between groups",
        "Demographic parity and calibration cannot hold simultaneously for any dataset",
        "Individual fairness and group fairness cannot both hold because they make contradictory assumptions about similarity",
      ],
      correctAnswer: 1,
      explanation:
        "The fairness impossibility: when groups A and B have different base rates, a perfectly calibrated classifier cannot simultaneously achieve equalized odds. Intuitively: different base rates mean different proportions of positive cases at each score, so equal FPR implies unequal FNR. The COMPAS controversy illustrated this exactly: ProPublica found unequal FPR; Northpointe defended with calibration — both were mathematically correct given different base rates.",
      hints: [
        "Calibration: a score of 0.7 means 70% positive rate for all groups. If base rates differ, equal FPR implies unequal TPR.",
        "COMPAS case: calibrated for both races AND equal FPR AND equal FNR simultaneously is mathematically impossible with different base rates.",
      ],
    },
    {
      id: "q-tab-kp40-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Removing sensitive attributes (race, gender) from the feature set of a tabular classifier guarantees fair predictions with respect to those attributes.",
      correctAnswer: "false",
      explanation:
        'Removing sensitive attributes does NOT guarantee fairness because of proxy features: other features (zip code, name, income) may be highly correlated with the sensitive attribute and indirectly encode it. The model can infer the sensitive attribute from proxies and make disparate decisions. "Fairness through unawareness" is known to be insufficient. Proper fairness techniques include adversarial debiasing, reweighting, or constraint-based optimization.',
      hints: [
        "Zip code is correlated with race in many US cities. Removing race does not help if zip code is used.",
        "Fairness through unawareness: well-intentioned but ineffective due to proxy features.",
      ],
    },
  ],
};

Object.assign(questions, moreTabularQuestions);

registerQuestions(questions);
