import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'feature-engineering-tabular': [
    {
      id: 'q-tab-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A logistic regression model is trained on "age" and "income" separately but performs poorly. Adding the feature "age × income" improves AUC significantly. This is an example of:',
      options: [
        'Dimensionality reduction via PCA',
        'A feature interaction that captures joint nonlinear effects unavailable to linear models from individual features alone',
        'L2 regularization applied to the product term',
        'Target encoding of the age column',
      ],
      correctAnswer: 1,
      explanation: 'Logistic regression is a linear model in its features: P(y=1) = σ(w₀ + w₁·age + w₂·income). No matter how well it tunes w₁ and w₂, it cannot learn that high income matters differently at different ages. Adding age × income as a third feature lets the model learn a coefficient w₃ that captures this joint effect, effectively giving the linear model one degree of interaction that it could never represent otherwise.',
      hints: [
        'A linear model in p features defines a hyperplane. What geometric shape does adding an interaction term allow?',
        'Tree-based models learn interactions implicitly through consecutive splits; linear models need explicit interaction features.',
      ],
    },
    {
      id: 'q-tab-kp1-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Log-transforming a right-skewed numerical feature always improves model performance regardless of the model type.',
      correctAnswer: 'false',
      explanation: 'For a decision tree (or any tree ensemble), the splitting criterion at a node evaluates all possible thresholds on the raw feature. A monotonic transformation like log(x) preserves the ordering of values, so every split that was optimal on x is still optimal on log(x) — it just uses a different threshold value. The split quality is identical. Log transforms do help linear/distance-based models (logistic regression, KNN, SVM) where feature scale and distribution shape affect gradients and distance computations.',
      hints: [
        'Decision trees split on ordered thresholds: is x ≤ t? Does replacing x with log(x) change which sample falls on which side of the optimal split?',
        'Contrast: in logistic regression, the gradient ∂L/∂w scales with feature magnitude — so a feature spanning [1, 10⁶] vs. [0, 6] matters.',
      ],
    },
    {
      id: 'q-tab-kp1-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A feature "days_since_last_purchase" shows a U-shaped relationship with churn: churn is high for d < 7 (very recent), low for 7 ≤ d ≤ 90, and high again for d > 90. For a linear model, the best encoding is:',
      options: [
        'Use the raw feature; logistic regression will find the U-shape automatically',
        'Bin into three intervals (0–7, 7–90, 90+) and one-hot encode, OR encode with a natural cubic spline with interior knots at 7 and 90',
        'Replace the feature with its square to capture the curve',
        'Drop the feature and rely on the model to recover the signal from other features',
      ],
      correctAnswer: 1,
      explanation: 'Logistic regression is linear in its inputs, so it can only model a monotone relationship with a single raw feature. Squaring (option C) creates a parabola centered at 0, which cannot represent a U-shape with a minimum at d = 7. Binning into three indicator columns gives the model three independent slopes for each region. Natural cubic splines with knots at 7 and 90 provide a smooth piecewise-polynomial fit: within each interval the function is a cubic, the pieces join with continuous first and second derivatives, and the function is linear beyond the boundary knots — precisely capturing the U-shape without overfitting.',
      hints: [
        'A single linear coefficient w·d can be positive or negative — it cannot increase on both ends and dip in the middle.',
        'A spline with K interior knots adds K extra basis functions. With knots at 7 and 90, you get a flexible smooth curve through those change-points.',
      ],
    },
  ],

  'missing-data': [
    {
      id: 'q-tab-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a medical dataset, blood pressure readings are missing because the measuring device malfunctioned randomly, unrelated to any patient characteristic. This missingness mechanism is:',
      options: [
        'Missing Not at Random (MNAR), because the device failure could be correlated with sensor age',
        'Missing Completely at Random (MCAR): the probability of missingness is independent of both observed and unobserved data',
        'Missing at Random (MAR): missingness depends only on observed variables',
        'Structurally missing: the value is undefined for certain patients',
      ],
      correctAnswer: 1,
      explanation: 'Rubin (1976) defined MCAR formally as: P(R = 0 | Y_obs, Y_mis) = P(R = 0), where R is the missingness indicator. The probability of being missing does not depend on any data values, observed or unobserved. In this scenario, device malfunction is purely random — unrelated to blood pressure values or any other patient feature. Consequence: complete-case analysis (dropping missing rows) does not introduce bias, though it loses statistical efficiency.',
      hints: [
        'MCAR is the strictest assumption. MAR allows missingness to depend on observed data. MNAR allows it to depend on the missing value itself.',
        'Clinical example of MNAR: blood pressure is not recorded because the nurse judged the patient to be too unstable to measure — missingness depends on the true blood pressure.',
      ],
    },
    {
      id: 'q-tab-kp2-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Multiple imputation is preferred over single mean/median imputation because it correctly propagates the uncertainty of imputed values into downstream statistical inferences.',
      correctAnswer: 'true',
      explanation: 'Single imputation (e.g., replacing missing values with the column mean) treats the imputed value as if it were observed with certainty, artificially deflating variance estimates. Multiple Imputation (MI, Rubin 1987) generates m complete datasets with different plausible imputations drawn from the posterior predictive distribution P(Y_mis | Y_obs). Each dataset is analyzed separately, and the results are pooled using Rubin\'s combining rules: point estimate = mean of m estimates; variance = within-imputation variance + between-imputation variance (the extra term propagates imputation uncertainty). With m = 20 imputations and 30% missing data, MI confidence intervals are properly calibrated; single imputation intervals are too narrow.',
      hints: [
        'If you impute with the mean, every imputed value is identical — you have added no variance. But the true missing values are not all equal to the mean.',
        'Rubin\'s formula: total variance = W̄ + (1 + 1/m)·B, where B = between-imputation variance, the term that single imputation sets to zero.',
      ],
    },
    {
      id: 'q-tab-kp2-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Income is missing for 40% of records. High earners systematically refused to report income (MNAR). Which strategy correctly handles this without assuming MCAR?',
      options: [
        'Listwise deletion: drop all rows with missing income',
        'Impute income with the median and add a binary "income_was_missing" indicator as a separate feature',
        'Mean imputation to preserve the sample mean of the observed values',
        'Assume MAR and use MICE (Multivariate Imputation by Chained Equations)',
      ],
      correctAnswer: 1,
      explanation: 'Under MNAR, the fact of missingness encodes information about the missing value (high earners are missing → high income is more likely). Two actions are needed: (1) Impute a plausible value to fill the gap so no row is dropped — median avoids being pulled by extreme values. (2) Add a binary indicator "income_was_missing" ∈ {0, 1} as a feature. The model can then learn: when income_was_missing = 1, adjust the prediction upward, effectively capturing the MNAR signal. Listwise deletion (A) discards 40% of data and biases the remaining sample toward low earners. Mean imputation (C) has the same deletion bias without even preserving the distribution. MICE (D) assumes MAR, which is violated here.',
      hints: [
        'The missingness indicator trick: if "high income → missing", then the indicator "was_missing" is positively correlated with income, giving the model a proxy for the missing signal.',
        'MICE assumes P(R | Y_obs) — missingness depends only on observed data. MNAR violates this: P(R | Y_mis) depends on the unobserved income itself.',
      ],
    },
  ],

  'categorical-encoding': [
    {
      id: 'q-tab-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A "city" feature has 1,000 unique values. After one-hot encoding it for use in a logistic regression, the feature matrix has how many columns added (ignoring other features)?',
      options: [
        '1 column (ordinal integer encoding)',
        '999 columns (dropping one to avoid the dummy variable trap)',
        '1,000 or 999 depending on whether you drop a reference category',
        'log₂(1000) ≈ 10 columns',
      ],
      correctAnswer: 2,
      explanation: 'OHE creates one binary indicator column per unique value. For k = 1,000 cities you get 1,000 binary columns. However, in a model with an intercept term, one column is perfectly predicted by the other 999 (multicollinearity: they sum to 1), causing a singular design matrix. Dropping one reference category leaves 999 columns and removes perfect collinearity. This is a general rule: for OHE with k categories, use k-1 columns in a model with an intercept.',
      hints: [
        'The "dummy variable trap": if all k indicator columns are included and the model has an intercept, the design matrix X is rank-deficient.',
        'With pandas get_dummies(drop_first=True) you get k-1 columns; without, you get k.',
      ],
    },
    {
      id: 'q-tab-kp3-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Target encoding must use out-of-fold (leave-one-out) encoding during training to avoid target leakage, even though the same data is used to compute mean target values.',
      correctAnswer: 'true',
      explanation: 'Naive target encoding computes enc(cᵢ) = mean(y | category = cᵢ) using all training rows, including row i itself. When category cᵢ appears only once (or rarely), enc(cᵢ) ≈ yᵢ, so the encoded feature directly contains the target — severe leakage that inflates training AUC. Out-of-fold encoding computes the mean for row i using only the other folds (e.g., in 5-fold CV: enc(cᵢ) = mean(y | category = cᵢ, fold ≠ fold(i))). This adds noise that mimics test-time behavior, where the mean is estimated from training data the model did not see for that sample.',
      hints: [
        'Extreme case: a category with one sample gets encoded as exactly that sample\'s target. What happens at training time vs. test time?',
        'Kaggle\'s winning solutions almost always use out-of-fold target encoding inside their CV loop.',
      ],
    },
    {
      id: 'q-tab-kp3-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A neural network must encode 2 million unique product IDs. The best strategy is:',
      options: [
        'One-hot encoding: 2M binary columns',
        'Label encoding as integers 0–1,999,999 and feed directly to a dense layer',
        'A learned embedding layer: each ID maps to a trainable d-dimensional dense vector (e.g., d = 50)',
        'Hash encoding into 1,024 buckets with hash collisions handled by averaging',
      ],
      correctAnswer: 2,
      explanation: 'OHE with 2M columns creates a 2M-dimensional sparse input — impractical for memory and gradient computation. Label encoding (integers) is worse: it imposes an arbitrary order (ID 500,000 > ID 1 means nothing), and the dense layer treats them as ordinal, producing nonsensical embeddings. Hash encoding loses identity through collisions. Learned embeddings (the same technique as word2vec/word embeddings) map each ID to a trainable ℝᵈ vector. The embedding matrix has size 2M × d parameters — with d = 50, that is 100M parameters, which is large but feasible. IDs that co-occur in similar contexts learn similar embeddings. At inference, any ID lookup is O(1).',
      hints: [
        'Entity embeddings (Guo & Berkhahn 2016) showed learned embeddings for categorical features often match or beat OHE for neural tabular models.',
        'Embedding dimension d is a hyperparameter; a rule of thumb is d ≈ min(50, (k + 1) / 2) where k is the cardinality.',
      ],
    },
  ],

  'class-imbalance': [
    {
      id: 'q-tab-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'SMOTE generates a synthetic minority-class example between sample xᵢ and neighbor xⱼ as x̃ = xᵢ + λ(xⱼ − xᵢ) where λ ~ Uniform(0, 1). This differs from simple oversampling (random duplication) because:',
      options: [
        'SMOTE samples from the majority class to balance counts',
        'SMOTE creates new points along line segments between existing minority samples, adding diversity rather than exact duplicates',
        'SMOTE applies Gaussian noise to majority samples to move them toward the minority cluster',
        'SMOTE selects minority samples with probability proportional to their loss',
      ],
      correctAnswer: 1,
      explanation: 'Random oversampling duplicates existing minority examples — the model sees the same xᵢ multiple times. SMOTE interpolates: x̃ = xᵢ + λ(xⱼ − xᵢ) for λ ∈ [0, 1] creates a point anywhere along the segment between two real minority neighbors. This fills the feature-space region around the minority cluster with novel examples, producing a smoother decision boundary and reducing overfitting to the duplicated points. The k nearest minority neighbors (default k = 5) define which directions are "safe" to interpolate in.',
      hints: [
        'Draw two minority points A and B. SMOTE generates points on the segment AB. Random oversampling only generates copies of A or copies of B.',
        'SMOTE can create problematic samples near the decision boundary if minority and majority classes overlap; SMOTE-ENN and BorderlineSMOTE address this.',
      ],
    },
    {
      id: 'q-tab-kp4-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Setting class_weight="balanced" in scikit-learn is exactly equivalent in effect to oversampling the minority class to the majority class count.',
      correctAnswer: 'false',
      explanation: 'class_weight="balanced" computes wₖ = n_samples / (n_classes × n_k) and scales each sample\'s loss contribution by its class weight. This rescales the gradient from minority samples without changing the training dataset. Oversampling replicates minority samples, changing the training distribution seen by the optimizer — each mini-batch now sees a different class ratio, which affects batch normalization statistics, dropout patterns, and the frequency of minority gradient updates. Practically: class weighting is simpler and avoids inflating the dataset; oversampling can interact differently with regularization. They are not equivalent.',
      hints: [
        'With balanced weights, the model still sees n minority samples per epoch; with oversampling it sees more. Does this matter for batch-level operations?',
        'For SGD with large imbalance ratios (1:1000), oversampling ensures minority examples appear in most mini-batches; class weighting does not guarantee that.',
      ],
    },
    {
      id: 'q-tab-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Focal loss FL(pₜ) = −(1 − pₜ)^γ log(pₜ) was introduced by Lin et al. (2017) for dense object detection. With γ = 2, a well-classified example with pₜ = 0.9 is down-weighted by a factor of:',
      options: [
        '(1 − 0.9)² = 0.01 relative to standard cross-entropy',
        '0.9² = 0.81 relative to standard cross-entropy',
        '(1 − 0.9)^0.5 ≈ 0.316',
        'There is no down-weighting; γ only controls the shape of the loss curve',
      ],
      correctAnswer: 0,
      explanation: 'Standard cross-entropy for a positive example with predicted probability p is −log(p). Focal loss multiplies by (1 − p)^γ: FL = −(1 − p)^γ log(p). For pₜ = 0.9 and γ = 2: modulating factor = (1 − 0.9)² = 0.1² = 0.01. The well-classified example contributes only 1% of its original loss. For a hard example with pₜ = 0.2: (1 − 0.2)² = 0.64 — it retains 64% of its loss. This ensures the gradient signal is dominated by hard misclassified examples rather than the abundant easy negatives in imbalanced detection tasks.',
      hints: [
        'Compute (1 − pₜ)^γ for pₜ = 0.9, γ = 2. This multiplicative factor is applied to the standard log-loss.',
        'The intuition: if the model is 90% confident and correct, training on this example provides little useful gradient — focal loss makes this precise.',
      ],
    },
  ],

  'decision-trees': [
    {
      id: 'q-tab-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'At a node with 100 samples: 60 class A, 40 class B. The Gini impurity of this node is:',
      options: [
        '0.60 × 0.40 = 0.24',
        '1 − (0.60² + 0.40²) = 0.48',
        '−(0.60 log 0.60 + 0.40 log 0.40) ≈ 0.673',
        '0.60 − 0.40 = 0.20',
      ],
      correctAnswer: 1,
      explanation: 'Gini impurity at a node with class proportions p₁, p₂, …, pK is defined as: G = 1 − Σₖ pₖ². With p_A = 0.6 and p_B = 0.4: G = 1 − (0.36 + 0.16) = 1 − 0.52 = 0.48. (Option C gives the entropy H = −Σ pₖ log pₖ ≈ 0.673, a different criterion.) CART selects the split that maximizes the weighted Gini reduction: ΔG = G(parent) − (nₗ/n)·G(left) − (nᵣ/n)·G(right). Gini and entropy usually select the same splits in practice; they differ most for highly imbalanced nodes.',
      hints: [
        'Formula: G = 1 − Σₖ pₖ². Compute pₖ² for each class and subtract from 1.',
        'A pure node (all one class) has G = 0; a 50/50 split has G = 0.5 for binary classification — the maximum.',
      ],
    },
    {
      id: 'q-tab-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A decision tree grown without any depth or leaf-size constraint on a dataset with no duplicate feature vectors will always achieve 100% training accuracy.',
      correctAnswer: 'true',
      explanation: 'With no duplicate feature vectors, each sample has a unique path through the feature space. An unconstrained tree can recurse until each leaf contains exactly one sample. At that leaf, the class label is unambiguously the label of that one sample, so the training prediction is always correct. This is a limiting case of overfitting: the model has zero training error but has memorized the training set, with no generalization to unseen data. Scikit-learn\'s DecisionTreeClassifier with default parameters (no max_depth) will grow exactly this tree on a dataset with unique features.',
      hints: [
        'With n samples and no duplicates, the tree can partition the space into n singleton leaves, one per sample.',
        'Regularization mechanisms: max_depth, min_samples_split, min_samples_leaf, ccp_alpha (cost-complexity pruning).',
      ],
    },
    {
      id: 'q-tab-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Mean Decrease Impurity (MDI) feature importance — the total Gini reduction weighted by node sample count — is biased toward which type of feature, and why?',
      options: [
        'Binary features, because they create pure splits quickly',
        'High-cardinality continuous features, because more possible thresholds give more chances for a spuriously good split',
        'Features that appear near the root, because they are evaluated on more samples',
        'Correlated feature pairs, because their combined impurity reduction double-counts their importance',
      ],
      correctAnswer: 1,
      explanation: 'MDI evaluates all possible split thresholds for each feature. A continuous feature with many unique values (high cardinality) has many candidate thresholds — increasing the probability of finding at least one that gives a large Gini reduction by chance, even for a random feature. A binary feature has only one possible threshold. This inflated search space gives continuous features an unfair advantage in importance rankings. Strobl et al. (2007) formalized this bias. The fix: use permutation importance (break feature-target association by shuffling, measure accuracy drop) or conditional permutation importance, which do not depend on the number of candidate thresholds.',
      hints: [
        'Imagine a feature that is pure noise but has 10,000 unique values — it will likely find a threshold that happens to reduce Gini on the training set.',
        'Permutation importance is threshold-agnostic: it measures the holistic effect of destroying a feature\'s information, not the Gini reduction at any specific split.',
      ],
    },
  ],

  'random-forests': [
    {
      id: 'q-tab-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Random forests achieve lower variance than a single deep decision tree through two mechanisms. Which pair is correct?',
      options: [
        'Pruning each tree to reduce depth, and using a larger learning rate',
        'Bootstrap aggregation (bagging) of training samples, and random feature subsampling at each split',
        'Gradient-based correction of residuals, and early stopping on validation loss',
        'L2 regularization on leaf weights, and dropout on random features',
      ],
      correctAnswer: 1,
      explanation: 'A single deep decision tree has high variance: small changes in training data can produce a completely different tree. Random forests attack this in two ways: (1) Bagging: each tree is trained on a bootstrap sample (n draws with replacement from n samples), so each tree sees a slightly different dataset. (2) Random feature subsampling: at each split only m ≈ √p features are considered (p = total features), de-correlating individual trees. The bias-variance decomposition shows: Var(average of T trees) = ρ·σ² + (1−ρ)·σ²/T, where ρ is the pairwise tree correlation. Random feature selection reduces ρ, which is what makes the ensemble variance ≪ single-tree variance.',
      hints: [
        'If all trees were identical (ρ = 1), averaging them would not help. Random subsampling ensures ρ < 1.',
        'Breiman (2001): random forests variance = ρ·σ² + (1−ρ)/T·σ². As T → ∞, variance → ρ·σ², limited by the inter-tree correlation.',
      ],
    },
    {
      id: 'q-tab-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The out-of-bag (OOB) error in a random forest provides an approximately unbiased estimate of test error without requiring a separate held-out validation set.',
      correctAnswer: 'true',
      explanation: 'Each bootstrap sample draws n samples with replacement from n training examples. The probability that a specific example is NOT selected in one draw is (1 − 1/n). Over n draws: P(never selected) = (1 − 1/n)ⁿ → 1/e ≈ 0.368 as n → ∞. So ~36.8% of training samples are out-of-bag for any given tree. Each training sample is predicted using only the trees for which it was OOB, giving a prediction that is truly out-of-sample for those trees. Aggregating these across all trees provides an error estimate equivalent to ~0.632-fraction cross-validation. Breiman showed OOB error converges to the true generalization error as the forest grows.',
      hints: [
        'With n = 100, P(example excluded from bootstrap) ≈ (0.99)¹⁰⁰ ≈ 0.366. With n = 10,000: (1 − 1/10000)^10000 ≈ 1/e.',
        'OOB predictions are made by the ~37% of trees that did not train on each example — a valid "fresh" model for that sample.',
      ],
    },
    {
      id: 'q-tab-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'As the number of trees T in a random forest increases beyond T = 500, the test error:',
      options: [
        'Continues to decrease indefinitely as more trees are added',
        'Eventually plateaus near ρ·σ² (the irreducible ensemble variance floor) and cannot overfit regardless of T',
        'Begins to increase due to overfitting of the bootstrap aggregation procedure',
        'Oscillates around the optimal value because of bootstrap sampling noise',
      ],
      correctAnswer: 1,
      explanation: 'From the bias-variance formula: Var(RF) = ρ·σ² + (1−ρ)·σ²/T. As T → ∞, the second term vanishes and variance converges to ρ·σ², the floor set by inter-tree correlation. Adding more trees never increases this — averaging more independent estimates can only maintain or reduce variance (law of large numbers). Unlike gradient boosting where adding more iterations after convergence can overfit, random forests cannot overfit by increasing T. The practical trade-off: more trees cost more inference time and memory, so there is a computational optimum but not a statistical one.',
      hints: [
        'Contrast with boosting: each new boosting iteration fits residuals more precisely on the training set and CAN overfit. Random forest trees are independent, not sequential correctors.',
        'Practically, test error plateaus by T ≈ 100–300 trees for most datasets. Going to T = 1000 wastes computation but does not hurt accuracy.',
      ],
    },
  ],

  'gradient-boosting': [
    {
      id: 'q-tab-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In gradient boosting for regression with MSE loss L = ½(y − F(x))², the pseudo-residual fitted by each new tree is:',
      options: [
        'The original target y, so each tree fits the full target independently',
        'The negative gradient −∂L/∂F(xᵢ) = yᵢ − Fₘ(xᵢ), i.e., the residual from the current ensemble',
        'The second derivative (Hessian) of the loss with respect to predictions',
        'A randomly sampled subset of the target values',
      ],
      correctAnswer: 1,
      explanation: 'Gradient boosting (Friedman 2001) performs functional gradient descent in prediction space. At iteration m, the pseudo-residual for sample i is rᵢₘ = −[∂L(yᵢ, F(xᵢ))/∂F(xᵢ)]_{F=Fₘ₋₁}. For MSE loss L = ½(y − F)²: ∂L/∂F = F − y, so rᵢₘ = y − Fₘ₋₁(xᵢ) — exactly the residual. The new tree hₘ is fit to these residuals, and the ensemble updates: Fₘ = Fₘ₋₁ + η·hₘ. For other losses (log-loss, MAE), pseudo-residuals generalize this concept to any differentiable objective.',
      hints: [
        'Gradient descent in parameter space: θ ← θ − η·∇_θ L. Gradient boosting: F ← F − η·∇_F L, where ∇_F L evaluated at each point is the pseudo-residual.',
        'For log-loss, the pseudo-residual = yᵢ − p̂ᵢ, where p̂ᵢ = σ(Fₘ₋₁(xᵢ)). Same intuition: predict what the current model missed.',
      ],
    },
    {
      id: 'q-tab-kp7-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'LightGBM\'s leaf-wise (best-first) growth strategy achieves lower training loss than XGBoost\'s level-wise growth for the same number of leaves, but can overfit more on small datasets.',
      correctAnswer: 'true',
      explanation: 'Level-wise growth (XGBoost default): expand all nodes at depth d before going to d+1. Leaf-wise growth (LightGBM default): at each step, split whichever leaf has the largest loss reduction, regardless of depth. With the same leaf budget, leaf-wise selects the globally best split available, reducing training loss faster. However, it creates asymmetric, deep branches on a single path — which can memorize noise on small datasets. LightGBM controls this via min_child_samples (minimum samples per leaf) and num_leaves; XGBoost uses max_depth. For large datasets (>10K samples), leaf-wise is typically superior; for small datasets, level-wise is safer.',
      hints: [
        'With 31 leaves, level-wise produces a balanced tree of depth 5; leaf-wise may produce one branch 15 levels deep and another 2 levels deep.',
        'LightGBM also uses histogram-based splitting (bucketing features into 255 bins), enabling O(n·K) split finding vs. O(n·p·log n) for XGBoost\'s exact method.',
      ],
    },
    {
      id: 'q-tab-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'CatBoost\'s "ordered boosting" prevents target leakage during categorical encoding by:',
      options: [
        'One-hot encoding all categorical features before training begins',
        'Computing target statistics for each sample using only the samples that appeared before it in a random permutation of the dataset',
        'Using a separate validation set to compute category means, isolated from the training loop',
        'Hashing categories into embedding vectors that do not depend on target values',
      ],
      correctAnswer: 1,
      explanation: 'Standard target encoding: enc(cᵢ) = mean(y | category = cᵢ) using ALL training samples — if sample i is in the training set, its own yᵢ contributes to enc(cᵢ), creating leakage. CatBoost\'s solution: randomly permute the training set. For sample at position k in the permutation, compute enc(cᵢ) using only samples at positions 1 to k − 1. This simulates a temporal ordering: each sample\'s encoding uses only "past" samples, so no sample encodes its own target. CatBoost generates multiple permutations per training run to avoid sensitivity to a single ordering, applying different permutations for different trees.',
      hints: [
        'Equivalent intuition: if you\'re encoding sample 500, compute the category mean from samples 1–499 only. Sample 500\'s own label is never in its own encoding.',
        'This is why CatBoost is particularly strong with high-cardinality categoricals on small datasets where standard target encoding leaks severely.',
      ],
    },
  ],

  'hyperparameter-optuna': [
    {
      id: 'q-tab-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Optuna\'s default sampler — Tree-structured Parzen Estimator (TPE) — proposes new hyperparameter configurations by:',
      options: [
        'Exhaustively evaluating all combinations in a predefined grid',
        'Modeling two density functions l(x) and g(x) over good and bad trials, and sampling x that maximizes l(x)/g(x)',
        'Fitting a Gaussian process to past results and sampling from its acquisition function',
        'Randomly sampling from a uniform distribution over the hyperparameter space',
      ],
      correctAnswer: 1,
      explanation: 'TPE (Bergstra et al. 2011) splits past trials into "good" (y < y*) and "bad" (y ≥ y*) based on a quantile γ of the observed objective values. It models p(x | y < y*) = l(x) and p(x | y ≥ y*) = g(x) using kernel density estimators. The acquisition function EI(x) ∝ l(x)/g(x): new configurations are sampled from l(x) and selected where the ratio l(x)/g(x) is largest — i.e., configurations likely among good trials and unlikely among bad ones. This is more sample-efficient than random/grid search and cheaper than Gaussian Process Bayesian optimization for high-dimensional discrete spaces.',
      hints: [
        'Grid search is O(k^p) for k values per p parameters — exponential. TPE uses O(n) past observations to propose the next trial.',
        'The γ quantile (default 0.25 in Optuna) determines the threshold between "good" and "bad" trials.',
      ],
    },
    {
      id: 'q-tab-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Optuna\'s pruning feature (MedianPruner, HyperbandPruner) can terminate a trial early based on intermediate validation metrics, reducing total tuning compute without compromising the best configuration found.',
      correctAnswer: 'true',
      explanation: 'Pruners implement successive halving logic: at intermediate step s, a trial is pruned if its metric is worse than the median of all completed trials at the same step. An unpromising XGBoost trial with validation AUC = 0.65 after 100 trees, when all completed trials at 100 trees have median AUC = 0.82, is abandoned — saving the compute of training the remaining 900 trees. The best configurations (those that survive pruning) still run to full budget. Optuna\'s Hyperband integration implements the SHA (Successive Halving Algorithm) rigorously, with geometric budget reduction across brackets.',
      hints: [
        'Pruning is orthogonal to the sampler: TPE proposes configurations, the pruner decides whether to continue each trial.',
        'Not all models support intermediate reporting; scikit-learn estimators trained as a whole cannot be pruned. XGBoost, LightGBM with callbacks, and PyTorch training loops can report per-epoch metrics.',
      ],
    },
    {
      id: 'q-tab-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When tuning XGBoost with Optuna, which hyperparameter pair is most important to co-tune because of their strong interaction?',
      options: [
        'verbosity and random_state',
        'n_estimators and learning_rate (eta): more trees require a smaller learning rate for optimal generalization',
        'objective and eval_metric',
        'tree_method and n_jobs',
      ],
      correctAnswer: 1,
      explanation: 'The shrinkage factor η (learning_rate) multiplies each tree\'s contribution: Fₘ = Fₘ₋₁ + η·hₘ. Smaller η requires more trees (larger n_estimators) to reach the same training loss — but achieves better regularization and generalization (Friedman 2002: "with small η, each tree corrects less aggressively, requiring more steps but leading to a smoother function"). Optimal (η, n_estimators) pairs lie on a curve: η = 0.01 might need n = 5000 trees; η = 0.3 might need only n = 100. Tuning n_estimators independently of η, or fixing one and tuning the other, will find suboptimal configurations. The standard approach: fix a small η (0.05–0.1) and use early stopping to find optimal n_estimators.',
      hints: [
        'Early stopping in XGBoost trains up to n_estimators trees but stops when validation metric does not improve for early_stopping_rounds consecutive rounds — effectively joint tuning of η and n.',
        'Other key regularization params: max_depth (tree complexity), subsample (row subsampling), colsample_bytree (feature subsampling), min_child_weight (leaf regularization).',
      ],
    },
  ],

  'cross-validation': [
    {
      id: 'q-tab-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A dataset has 1,000 samples: 950 class 0, 50 class 1 (5% positive rate). Standard 5-fold CV splits data sequentially. Fold 5 might contain 0 class-1 samples. Stratified 5-fold prevents this by:',
      options: [
        'Ensuring each fold has the same total sample count regardless of class',
        'Preserving the 5% positive rate in every fold by sampling class-proportionally within each fold',
        'Randomly shuffling data before splitting, which eventually balances classes',
        'Using only class-1 samples in the validation fold',
      ],
      correctAnswer: 1,
      explanation: 'Stratified K-Fold independently divides the majority and minority class samples into K equal groups, then combines them. With 950 class-0 and 50 class-1 samples in 5-fold: each fold gets 190 class-0 and 10 class-1 samples (10/200 = 5% positive rate). Without stratification, sequential splitting might give fold 5 all 50 class-1 samples (if they are clustered at the end) or zero (if clustered at the start). A fold with no class-1 samples makes ROC-AUC undefined and accuracy trivially 100% for that fold.',
      hints: [
        'sklearn\'s cross_val_score automatically uses StratifiedKFold when the estimator is a classifier — stratification is the default for classification.',
        'For regression, ordinary KFold is used; stratification is less critical when the target is continuous.',
      ],
    },
    {
      id: 'q-tab-kp9-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'For time series data, standard K-fold cross-validation with random shuffling is invalid because it leaks future information into the training set.',
      correctAnswer: 'true',
      explanation: 'Suppose a model is trained on samples from 2020–2024 and validated on samples from 2022. Random shuffling means samples from 2023–2024 (the future relative to 2022) appear in the training fold — the model learns from future data to predict the past. This violates temporal causality and produces optimistically biased validation scores that do not reflect true deployment performance. The correct approach is walk-forward (expanding window) validation: always train on data up to time t and validate on t to t+Δ. Scikit-learn\'s TimeSeriesSplit implements this: fold k trains on [0, k·n/K] and validates on [k·n/K, (k+1)·n/K].',
      hints: [
        'If your 2022 model can "see" a 2024 news event during training, its 2022 predictions will be unrealistically good.',
        'TimeSeriesSplit ensures the validation set is always strictly after the training set in time.',
      ],
    },
    {
      id: 'q-tab-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Nested cross-validation (outer K₁ folds, inner K₂ folds) is used in ML evaluation specifically to:',
      options: [
        'Speed up training by reusing cached predictions across folds',
        'Obtain an unbiased estimate of the generalization error of the model-selection procedure, not just the final model',
        'Enable ensembling of K₁ × K₂ different models',
        'Reduce memory usage by processing one fold at a time',
      ],
      correctAnswer: 1,
      explanation: 'Suppose you use 5-fold CV to tune hyperparameters and then report that same 5-fold CV score as your generalization estimate. Problem: the best hyperparameters were selected to maximize that CV score — so the reported score is optimistically biased (it has "seen" all data through the tuning process). Nested CV fixes this: the outer loop (K₁ = 5 folds) provides test folds that are NEVER used for hyperparameter tuning. Inside each outer fold, an inner loop (K₂ = 3 folds) runs hyperparameter search on the outer training portion only. The outer test fold is held back until after tuning is complete, giving an honest estimate of the model-selection process\'s expected performance on new data.',
      hints: [
        'Analogy: if you tune hyperparameters and evaluate on the same validation set, your validation score is inflated — exactly like the training-set error. Nested CV creates a truly held-out test set for each outer fold.',
        'Nested CV is computationally expensive: K₁ × K₂ × (number of hyperparameter trials) model fits. For K₁=5, K₂=3, 50 trials: 750 model fits.',
      ],
    },
  ],

  'feature-selection': [
    {
      id: 'q-tab-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which feature selection method evaluates features using their statistical relationship to the target — independently of any model — making it the fastest but most limited approach?',
      options: [
        'Recursive Feature Elimination (RFE) with a Random Forest',
        'LASSO regularization during logistic regression training',
        'Filter methods: mutual information, ANOVA F-statistic, or Pearson correlation with the target',
        'Forward stepwise selection using cross-validated accuracy',
      ],
      correctAnswer: 2,
      explanation: 'Filter methods score each feature independently of the model: MI(X; Y) = Σ p(x,y) log[p(x,y)/(p(x)p(y))], or the F-statistic from one-way ANOVA, or |corr(X, Y)|. Features are ranked and selected by threshold or top-k. Advantages: O(p) scaling in the number of features, no model training needed. Limitations: (1) do not account for feature interactions (a feature with low individual MI might be highly useful in combination), (2) feature rankings are model-agnostic (optimal for linear models may not be optimal for trees). Wrapper methods (RFE) train a model repeatedly; embedded methods (LASSO) encode selection in the training objective.',
      hints: [
        'Filter: score → rank → select. No model, no training. Works even before you choose a model.',
        'Mutual information is the most general filter — it captures any statistical dependence, not just linear. Pearson correlation only captures linear relationships.',
      ],
    },
    {
      id: 'q-tab-kp10-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'LASSO (L1-regularized linear regression) performs automatic feature selection by driving some coefficients to exactly zero during optimization.',
      correctAnswer: 'true',
      explanation: 'LASSO minimizes: (1/2n)‖y − Xβ‖² + λ‖β‖₁. The L1 penalty |βⱼ| is non-differentiable at βⱼ = 0, creating a "kink" in the objective. Geometrically, the feasible set {β : ‖β‖₁ ≤ s} is a cross-polytope with corners on the coordinate axes. The solution to the constrained problem often occurs at a corner where many βⱼ = 0 exactly. By contrast, Ridge (L2) uses a smooth circular ball — the solution can occur anywhere on the ball, and βⱼ → 0 only asymptotically. For a specific coefficient, the LASSO soft-thresholding solution is: β̂ⱼ = sign(z_j) · max(|z_j| − λ, 0), where z_j is the OLS estimate — this sets β̂ⱼ = 0 when |z_j| ≤ λ.',
      hints: [
        'Soft-thresholding: if the OLS estimate for feature j has |z_j| ≤ λ, LASSO sets that coefficient to exactly 0.',
        'LASSO produces sparse solutions; Ridge produces small but nonzero coefficients. Elastic Net combines both.',
      ],
    },
    {
      id: 'q-tab-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Boruta feature selection is more reliable than raw MDI (Mean Decrease Impurity) importances because it:',
      options: [
        'Uses gradient boosting instead of random forests for more accurate importance estimates',
        'Creates "shadow features" (randomly permuted copies of each real feature) and only confirms a feature as important if its MDI statistically exceeds the best shadow feature across many forest iterations',
        'Applies SHAP values instead of Gini-based importance to remove the high-cardinality bias',
        'Restricts the tree depth to 3 to prevent complex features from dominating',
      ],
      correctAnswer: 1,
      explanation: 'Boruta (Kursa & Rudnicki 2010) creates shadow features: for each of p real features, it adds a randomly shuffled copy (shadow_fⱼ), giving 2p features. A random forest is trained on all 2p features. The null distribution for "unimportant" features is empirically estimated by the maximum MDI among all shadow features (since shadow features are pure noise). A real feature is confirmed important only if its MDI exceeds this null distribution with high statistical confidence (binomial test, Benjamini-Hochberg corrected). Features that never beat any shadow feature are rejected. This converts a heuristic ranking into a statistically grounded yes/no decision with controlled false discovery rate.',
      hints: [
        'MDI importances have no built-in null distribution — you cannot tell if a score of 0.05 is significant or noise. Boruta constructs one empirically.',
        'Shadow features are the negative control: they have zero true importance by construction. If a real feature cannot beat them, it is not useful.',
      ],
    },
  ],

  'shap-xai': [
    {
      id: 'q-tab-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A model\'s mean prediction E[f(X)] = 0.3. For a specific customer, f(x) = 0.8. The SHAP values for features [age, income, credit_score] are [+0.1, +0.3, +0.1]. What does the SHAP efficiency axiom require?',
      options: [
        'Each SHAP value must be in [0, 1] and sum to 1.0',
        'The SHAP values must sum to f(x) − E[f(X)] = 0.8 − 0.3 = 0.5',
        'The SHAP values must sum to f(x) = 0.8',
        'The largest SHAP value identifies the most important global feature',
      ],
      correctAnswer: 1,
      explanation: 'SHAP satisfies three axioms that uniquely determine Shapley values (Shapley 1953, Lundberg & Lee 2017): Efficiency: Σᵢ φᵢ(x) = f(x) − E[f(X)]. Symmetry: two features contributing equally to all coalitions receive equal SHAP. Dummy: a feature that does not change f for any coalition gets SHAP = 0. In this example: 0.1 + 0.3 + 0.1 = 0.5 = 0.8 − 0.3 ✓. The SHAP values exactly partition the prediction deviation from baseline: credit_score (+0.3) contributed most to pushing this prediction above the mean.',
      hints: [
        'SHAP explains the gap between this specific prediction and the global average — not the prediction itself.',
        'Efficiency axiom: all features together explain exactly f(x) − E[f(X)]. No more, no less.',
      ],
    },
    {
      id: 'q-tab-kp11-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Global SHAP importance for a feature can be computed as the mean absolute SHAP value across all training (or test) samples: E[|φᵢ(x)|].',
      correctAnswer: 'true',
      explanation: 'Local SHAP φᵢ(xⱼ) explains how feature i influenced prediction j. To get global importance: aggregate across all n samples. Taking the mean of absolute values — not raw values — is standard because positive and negative contributions are both meaningful: a feature with φᵢ = +0.5 for half the data and −0.5 for the other half is globally important, but raw mean would give 0. Global importance Iᵢ = (1/n) Σⱼ |φᵢ(xⱼ)|. This correctly identifies features with consistently large influence regardless of direction. SHAP summary plots show each sample as a dot, colored by feature value, ordered by mean |SHAP|.',
      hints: [
        'Mean SHAP (without absolute value) = 0 by the efficiency axiom summed over all samples, if E[f(X)] is constant — not a useful importance measure.',
        'Mean |SHAP| is the basis of SHAP\'s feature importance bar plot in the shap library.',
      ],
    },
    {
      id: 'q-tab-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'TreeSHAP is preferred over KernelSHAP for gradient-boosted trees because it computes exact Shapley values in O(TLD²) time rather than the exponential-time exact computation or approximate Monte Carlo of KernelSHAP. What does the O(TLD²) complexity represent?',
      options: [
        'T = training samples, L = loss function evaluations, D = dataset dimensions',
        'T = number of trees, L = number of leaves per tree, D = maximum tree depth',
        'T = tuning iterations, L = learning rate steps, D = number of decision boundaries',
        'T = test samples, L = label count, D = data dimensionality',
      ],
      correctAnswer: 1,
      explanation: 'Lundberg et al. (2020) proved that for tree ensembles, exact Shapley values can be computed in O(TLD²) time per sample, where T = number of trees, L = max leaves per tree, D = max depth. Key insight: within a tree, the contribution of a feature to the Shapley value of a specific prediction can be computed by traversing all possible orderings of features encountered on the root-to-leaf path using dynamic programming, without enumerating all 2^D feature subsets. KernelSHAP treats any model as a black box and must approximate via regression on 2^p or sampled subsets of features — O(2^p) exactly or O(M·p²) with M Monte Carlo samples. For a 1000-tree GBM with depth 6, TreeSHAP is orders of magnitude faster.',
      hints: [
        'KernelSHAP: treats model as black box. For p=50 features, 2^50 ≈ 10^15 subsets — must approximate.',
        'TreeSHAP: exploits tree structure to compute exact Shapley values using polynomial-time DP over the tree nodes.',
      ],
    },
  ],

  'tabnet': [
    {
      id: 'q-tab-kp12-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'TabNet (Arik & Pfister 2021) uses sequential attention with a sparsemax transformation at each decision step. The purpose of sparsemax over softmax for feature selection masks is:',
      options: [
        'Sparsemax is faster to compute, reducing training time',
        'Sparsemax produces exactly sparse probability distributions (many zero weights), achieving hard feature selection at each step; softmax produces dense distributions that never exactly zero out any feature',
        'Sparsemax is differentiable while softmax is not, enabling gradient-based training',
        'Sparsemax prevents overfitting by adding L1 regularization to the attention weights',
      ],
      correctAnswer: 1,
      explanation: 'Softmax: σ(z)ᵢ = exp(zᵢ) / Σⱼ exp(zⱼ) — always positive, never exactly zero. A "soft" selector that always attends to all features to some degree. Sparsemax (Martins & Astudillo 2016): argmin_{p ∈ Δ^K} ‖p − z‖² over the probability simplex — produces a piecewise-linear projection that maps many components to exactly 0. With sparsemax, TabNet at each decision step selects a sparse subset of features (e.g., 3 out of 100), enabling interpretability (which features were used?) and mimicking the axis-aligned splits of decision trees. The entropy of the sparsemax mask, averaged over steps and samples, is used as a sparsity regularizer.',
      hints: [
        'Sparsemax projects z onto the simplex by finding a threshold and zeroing out all components below it — a "hard" nearest-simplex-point projection.',
        'TabNet\'s feature importance: a feature\'s importance for a prediction is the sum of its sparsemax weights across all decision steps.',
      ],
    },
    {
      id: 'q-tab-kp12-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'TabNet consistently outperforms gradient-boosted trees (XGBoost, LightGBM) on tabular datasets, making tree-based methods obsolete for structured data.',
      correctAnswer: 'false',
      explanation: 'Grinsztajn et al. (2022) "Why tree-based models still outperform deep learning on tabular data" conducted a systematic benchmark across 45 diverse tabular datasets. Gradient-boosted trees won on the majority, especially for (a) small datasets (<10K samples), (b) datasets with many uninformative features, (c) heterogeneous feature types (mixed numerical/categorical). TabNet and other neural tabular models (FT-Transformer, SAINT) can match or exceed trees on large homogeneous datasets or when pre-training on unlabeled data. The paper identified that trees\' resistance to uninformative features and their exact feature selection are key structural advantages.',
      hints: [
        'Tabular data is fundamentally different from images/text: no spatial locality, mixed types, often small n, many irrelevant features — all properties favoring trees.',
        'Benchmark papers (Grinsztajn 2022, Shwartz-Ziv & Armon 2022) consistently show GBDT as the default winner for "typical" tabular ML tasks.',
      ],
    },
    {
      id: 'q-tab-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'TabNet can be pre-trained without labels using a self-supervised objective analogous to BERT\'s masked language modeling. The tabular analog is:',
      options: [
        'Contrastive learning: push representations of augmented table rows together, push different rows apart',
        'Masked feature reconstruction: randomly mask a subset of features (set to 0 or noise) and train TabNet to reconstruct the original values from the remaining observed features',
        'Next-step prediction: given the first k columns, predict column k+1',
        'Cluster assignment: assign each row to a cluster centroid and pre-train to predict cluster IDs',
      ],
      correctAnswer: 1,
      explanation: 'TabNet pre-training (Arik & Pfister 2021, Section 4): given a table row x, randomly mask a subset S of feature indices (set them to 0 or noise). The encoder (same sequential attention architecture as supervised TabNet) receives the corrupted row and produces a representation. A decoder network then reconstructs the original values x_S of the masked features. Loss: ‖x_S − x̂_S‖²_F (reconstruction MSE) summed over masked features. The attention masks naturally learn to focus on unmasked features to infer masked ones, learning feature-feature dependencies. After pre-training on unlabeled data, the encoder is fine-tuned with the supervised loss on labeled data.',
      hints: [
        'BERT masks tokens and predicts them from context. TabNet masks feature values and reconstructs them from other features — the same principle applied to tables.',
        'This enables TabNet to leverage unlabeled rows (often abundant in real-world databases) to improve representations before supervised fine-tuning.',
      ],
    },
  ],

  'neural-tabular': [
    {
      id: 'q-tab-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'According to Grinsztajn et al. (2022), which structural property of tabular data most explains why tree-based models outperform MLPs on many tabular benchmarks?',
      options: [
        'Neural networks cannot process numerical features without normalization, making them unsuitable for raw tabular data',
        'Tabular data often contains many uninformative features; trees perform implicit feature selection via axis-aligned splits, while MLPs are non-rotationally invariant but still use all features by default',
        'Neural networks require GPU acceleration unavailable for most tabular ML deployments',
        'MLPs overfit because they have more parameters than tree-based models of equivalent depth',
      ],
      correctAnswer: 1,
      explanation: 'The paper identifies that "tabular data is not rotationally invariant" — adding irrelevant features hurts MLPs more than trees. Decision trees automatically ignore uninformative features (they select splits only on informative dimensions). MLPs have densely connected layers: every neuron connects to every input feature, so irrelevant features add noise to every gradient update. The paper also shows trees are better at capturing irregular target functions (non-smooth boundaries, step functions) common in tabular data, and naturally handle mixed numerical/categorical data without careful preprocessing.',
      hints: [
        'An MLP with 100 input features connects all 100 to every hidden neuron. A tree with max_features=√100 considers only 10 features per split.',
        'The "uninformative features" finding: randomly adding Gaussian noise features degraded MLP performance far more than GBDT performance in controlled experiments.',
      ],
    },
    {
      id: 'q-tab-kp13-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Feature normalization (e.g., StandardScaler to zero mean and unit variance) is critical for neural network convergence on tabular data but provides no benefit for gradient-boosted trees.',
      correctAnswer: 'true',
      explanation: 'Neural networks: gradient descent updates w ← w − η·∂L/∂w. The gradient magnitude scales with both the weight magnitude and the input magnitude (chain rule: ∂L/∂wⱼ = ∂L/∂a · xⱼ). A feature with values in [0, 10⁶] produces gradients 10⁶ times larger than a feature in [0, 1], causing slow convergence or gradient explosion for the un-normalized features. StandardScaler ensures all features contribute equally to gradient magnitudes. Gradient-boosted trees split on thresholds: "is income ≤ 50,000?" and "is income ≤ 50?" are mathematically identical decisions (the tree learns a different threshold). Monotonic rescaling does not change which threshold is optimal.',
      hints: [
        'Neural network rule: always normalize numerical inputs. Tree rule: normalization is irrelevant for split quality.',
        'Batch normalization inside a neural network partially mitigates this, but input-level normalization still accelerates convergence significantly.',
      ],
    },
    {
      id: 'q-tab-kp13-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'FT-Transformer (Feature Tokenization Transformer, Gorishniy et al. 2021) processes tabular rows differently from a standard MLP by:',
      options: [
        'Treating the entire row as a single 1D sequence of raw feature values and applying a 1D-CNN',
        'Embedding each feature (numerical and categorical) as an individual token and applying multi-head self-attention across the p feature tokens for each row',
        'Using positional encodings based on column order to preserve feature ordering information',
        'Replacing self-attention with a kernel-based dot product to handle the small context length of tabular rows',
      ],
      correctAnswer: 1,
      explanation: 'FT-Transformer embeds each of p features as a d-dimensional token: for numerical xⱼ, token = bⱼ + xⱼ · wⱼ (bias + scalar-scaled embedding vector); for categorical cⱼ, token = embedding lookup. The row is thus represented as a sequence of p tokens of shape (p, d). Standard multi-head self-attention is applied across these p "feature tokens": Attention(Q, K, V) = softmax(QKᵀ/√d)V, where Q, K, V are linear projections of the token sequence. Attention scores capture pairwise feature interactions: head h might learn that "income heavily attends to credit score when predicting default." This expressiveness exceeds MLPs (which cannot model feature interactions without explicit products), while remaining a standard transformer.',
      hints: [
        'In NLP, tokens are words; in FT-Transformer, tokens are individual feature values. The transformer then learns which features to "pay attention to" jointly.',
        'FT-Transformer outperforms MLP on datasets where feature interactions are important, but is slower and needs more data than tree methods.',
      ],
    },
  ],

  'autogluon': [
    {
      id: 'q-tab-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'AutoGluon\'s tabular predictor with preset="best_quality" automatically performs all of the following EXCEPT:',
      options: [
        'Training multiple model types (GBM, XGBoost, CatBoost, Random Forest, Neural Net, KNN) with varied hyperparameters',
        'Multi-layer stacking: using L1 model predictions as features for L2 meta-models',
        'Collecting additional labeled training data from external web sources to fill data gaps',
        'Feature preprocessing: missing value imputation, ordinal encoding, and numerical normalization per model type',
      ],
      correctAnswer: 2,
      explanation: 'AutoGluon (Erickson et al. 2020) automates: (1) preprocessing pipelines tailored per model type, (2) training ~20+ model configurations across multiple families, (3) weighted ensembling of best individual models, (4) multi-layer stacking (L1 models → L2 meta-learner on cross-validated predictions). It does NOT collect external data — it works only with the data provided. The "best_quality" preset enables multi-layer stacking and ensemble-based hyperparameter selection, which typically outperforms any single model family.',
      hints: [
        'AutoGluon\'s key innovation: it avoids traditional HPO (hyperparameter optimization) and instead trains many fixed configurations, relying on stacking to combine their strengths.',
        'Multi-layer stacking: L1 = base models; L2 = second-layer models trained on OOF (out-of-fold) L1 predictions; repeat for L3.',
      ],
    },
    {
      id: 'q-tab-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'H2O AutoML automatically trains multiple algorithm families in parallel and produces a Stacked Ensemble (SuperLearner) that typically achieves the highest leaderboard accuracy.',
      correctAnswer: 'true',
      explanation: 'H2O AutoML (LeDell & Poirier 2020) trains: GLM, Distributed Random Forest (DRF), Gradient Boosting Machine (GBM), XGBoost, Deep Learning, and multiple GBM/XGBoost configurations. It then builds two stacked ensembles: (1) "AllModels" — a SuperLearner trained on all models\' cross-validated predictions, (2) "BestOfFamily" — a SuperLearner on the best model per family. The SuperLearner uses a metalearner (typically GLM with non-negative constraints) to find optimal linear combinations. In practice, "StackedEnsemble_AllModels" typically appears at the top of the H2O AutoML leaderboard because combining diverse models reduces variance beyond any individual model.',
      hints: [
        'SuperLearner theorem (van der Laan et al. 2007): given a library of base learners, the stacked ensemble performs asymptotically at least as well as the best base learner.',
        'The metalearner in H2O uses OOF predictions from base models, so stacking does not overfit to training data.',
      ],
    },
    {
      id: 'q-tab-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Deploying an AutoGluon or H2O AutoML stacked ensemble to a production system introduces which challenge NOT present with a single model?',
      options: [
        'AutoML models cannot make predictions on data with missing values',
        'Multi-layer stacked ensembles require serving dozens of models in a dependency order, increasing latency, memory footprint, and making targeted retraining of individual components difficult',
        'AutoML models always have lower accuracy than hand-tuned models in production',
        'AutoML models require GPU inference, which is unavailable in most production environments',
      ],
      correctAnswer: 1,
      explanation: 'A 50-model AutoGluon stack: to predict one sample, you must (1) run all L1 base models in parallel, (2) collect their outputs, (3) run the L2 meta-models, (4) aggregate. Latency = max(L1 latency) + L2 latency. Memory = sum of all model weights. When concept drift occurs: which sub-model do you retrain? Retraining the full stack is expensive; retraining one model breaks the stacking relationship. Additionally, regulatory requirements (GDPR Article 22, fair lending) may require explaining predictions — a 50-model stack is extremely difficult to explain. Single models (or thin ensembles of 3–5) are far easier to debug, monitor, and retrain selectively.',
      hints: [
        'AutoML is excellent for competitions and prototyping; production ML often needs simpler models for latency, interpretability, and maintenance reasons.',
        'Consider the retraining scenario: new data arrives weekly. Retraining 50 models weekly is expensive; selective retraining of a stacked ensemble requires careful dependency management.',
      ],
    },
  ],

  'time-series-tabular': [
    {
      id: 'q-tab-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'To use a gradient-boosted tree model for univariate time series forecasting of y_t, you create lag features. If you use lags 1, 2, and 7, the feature vector for predicting y_t is:',
      options: [
        '[y_{t+1}, y_{t+2}, y_{t+7}] (future values)',
        '[y_{t−1}, y_{t−2}, y_{t−7}] (past values at lags 1, 2, and 7)',
        '[mean(y_{t−1..t−7}), std(y_{t−1..t−7}), max(y_{t−1..t−7})]',
        '[y_t − y_{t−1}, y_t − y_{t−2}, y_t − y_{t−7}] (differences)',
      ],
      correctAnswer: 1,
      explanation: 'A lag-k feature for predicting y_t is the observed value y_{t−k}: the value k time steps in the past. Lag features convert a time series into a supervised learning table: row t has features [y_{t−1}, y_{t−2}, y_{t−7}] and target y_t. This is the "time delay embedding" or Takens embedding approach. With lags 1, 2, 7 you capture: yesterday (lag 1), two days ago (lag 2), and one week ago (lag 7) — useful for data with daily seasonality. The model then learns: f(y_{t−1}, y_{t−2}, y_{t−7}) → y_t. This is causally valid: features precede the target in time.',
      hints: [
        'Lag 1 = yesterday\'s value. Lag 7 = same day last week. Choosing lags requires domain knowledge about seasonality and autocorrelation.',
        'Causal constraint: features must be available at prediction time. Lag features for t use only data from before t — no future leakage.',
      ],
    },
    {
      id: 'q-tab-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Rolling window statistics (e.g., rolling mean over the past 7 days) can be safely computed and used as features during training with any cross-validation strategy, including random K-fold.',
      correctAnswer: 'false',
      explanation: 'Rolling statistics are computed from historical values. For a random K-fold split: suppose sample at time t = 100 is in the validation fold. Its rolling mean feature = mean(y_{93}...y_{99}). If t = 50 (earlier in time) is in the TRAINING fold, the model has learned from y_{50} — which is used in computing the rolling statistic for t = 100. This is a subtle form of temporal leakage. Correct approach: use TimeSeriesSplit (walk-forward validation). At each outer fold, ALL features (including rolling statistics) must be recomputed from the training window only, and rolling statistics for validation samples must only look back into the training period.',
      hints: [
        'Rolling features for a validation sample must be computed from data that would have been available before the prediction date — which random K-fold does not guarantee.',
        'TimeSeriesSplit ensures the training fold always precedes the validation fold chronologically, making rolling statistic computation causal.',
      ],
    },
    {
      id: 'q-tab-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When using a GBM for multi-step-ahead time series forecasting (predict y_{t+h} for h = 1, 2, ..., 12), the recursive strategy has which drawback compared to the direct strategy?',
      options: [
        'The recursive strategy trains 12 separate models, which is computationally expensive',
        'The recursive strategy uses model predictions as inputs for further predictions, accumulating errors at each step; the direct strategy trains one model per horizon using only true historical values as inputs',
        'The direct strategy cannot handle the irregular spacing of multi-step forecasts',
        'The recursive strategy is more accurate for short horizons but less accurate for long horizons due to underfitting',
      ],
      correctAnswer: 1,
      explanation: 'Recursive strategy: train one model f(y_{t−1}, y_{t−2}, …) → y_t. Forecast h = 1: ŷ_{t+1} = f(y_t, y_{t−1}, …). Forecast h = 2: ŷ_{t+2} = f(ŷ_{t+1}, y_t, …) — uses the predicted ŷ_{t+1} as input. Prediction errors compound: error in ŷ_{t+1} propagates into ŷ_{t+2}, ŷ_{t+3}, etc. For long horizons (h = 12), error accumulation can be severe. Direct strategy: train 12 separate models, each fₕ(y_t, y_{t−1}, …) → y_{t+h}, where each model uses only true historical values as inputs. No error propagation, but 12 models instead of 1, and each model ignores the relationship between consecutive forecast horizons.',
      hints: [
        'Recursive: one model, growing error. Direct: many models, no error propagation but loses inter-horizon coherence.',
        'RECTIFY and other hybrid strategies try to combine benefits: train direct models but use recursive outputs as additional features.',
      ],
    },
  ],
}

registerQuestions(questions)
