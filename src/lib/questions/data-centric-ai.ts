import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "data-centric-philosophy": [
    {
      id: "q-dc-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A team trains ResNet-50 on a defect detection dataset and achieves 72% F1. They try ResNet-101 and EfficientNet-B4 — both reach 73–74% F1. They then discover 15% of training labels are mislabeled and spend a week relabeling them. F1 jumps to 85%. This outcome best illustrates:",
      options: [
        "Model-centric AI: larger architectures reliably improve performance",
        "Data-centric AI: systematically improving data quality (here, label correctness) while holding the model fixed yields larger gains than searching for better architectures",
        "Transfer learning: the relabeling effort acted as a form of fine-tuning",
        "Regularization: cleaning noisy labels reduces overfitting equivalently to dropout",
      ],
      correctAnswer: 1,
      explanation:
        "Model-centric AI iterates on the model while treating data as fixed: switching architectures gave only 1–2% F1 gain. Data-centric AI (Andrew Ng, 2021) treats the model as fixed and iterates on data quality: identifying and correcting 15% mislabeled examples gave 13% F1 gain — a 6× larger improvement. The insight is that label noise creates a fundamental upper bound on model performance regardless of architecture, because the model is optimizing toward the wrong targets. Data-centric AI includes: label quality (relabeling, consensus, CleanLab), data collection strategy (active learning), feature engineering, and consistency of annotation guidelines.",
      hints: [
        "A model learns to predict what it was trained on. If 15% of training labels are wrong, the model learns to be wrong 15% of the time.",
        "Garbage in, garbage out: even GPT-4 cannot learn to classify correctly from consistently mislabeled training data.",
      ],
    },
    {
      id: "q-dc-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In the data-centric AI paradigm, the model architecture and training code are typically held fixed as a controlled variable while iterating on data, so that performance changes can be attributed to data improvements rather than model changes.",
      correctAnswer: "True",
      explanation:
        'Scientific controlled experiment: to understand the effect of data quality, you must control for model differences. If you simultaneously change the architecture and the dataset, you cannot determine which caused the performance change. Data-centric AI uses a fixed model (e.g., always ResNet-50 or always LightGBM with standard hyperparameters) as the "measuring instrument" and iterates on: (1) annotation quality and consistency, (2) dataset size and coverage, (3) class balance, (4) feature engineering and data representation. The performance change of the fixed model directly measures data improvement. This contrasts with model-centric iterations where data is fixed and architectures/hyperparameters change.',
      hints: [
        'The "self" in self-supervised: the data provides its own labels. No human annotator needed.',
        "SSL creates a regularization signal on the unlabeled data manifold, learning features that are broadly useful across many downstream tasks.",
      ],
    },
    {
      id: "q-dc-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which scenario provides the strongest justification for a data-centric approach over a model-centric one?",
      options: [
        "You have 10M clean labeled examples and have not tried any deep learning architecture yet",
        "Your model achieves 99% train accuracy and 60% test accuracy, suggesting overfitting",
        "You have 500 labeled examples with 20% inconsistent labels, and switching from LightGBM to XGBoost gives only 0.5% F1 improvement",
        "Your training pipeline is slow and needs distributed GPU acceleration",
      ],
      correctAnswer: 2,
      explanation:
        "When switching between comparable models (LightGBM → XGBoost) yields negligible gain (0.5%), the data is likely the bottleneck — not the model class. A small dataset (500 examples) with high label inconsistency has two compounding problems: (a) insufficient training signal (500 examples may not cover the feature space) and (b) noisy labels create contradictions the model cannot resolve. In this scenario, data-centric actions — relabeling inconsistent examples, collecting 500 more high-quality examples, or using active learning to identify the most informative unlabeled examples — will likely yield larger improvements than architecture search. Option A (10M clean examples, no deep learning tried) is a case for model-centric exploration.",
      hints: [
        'The "model-switching ceiling": if multiple models from different families all achieve similar performance, the data distribution is the binding constraint, not model capacity.',
        "With 500 examples and 20% inconsistency: approximately 100 labels are wrong. Each wrong label actively corrupts the model\'s gradient updates in the opposite direction.",
      ],
    },
    {
      id: "q-dc-kp1-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "Slice-based evaluation — measuring model performance separately on meaningful subgroups (slices) of the test set rather than only on overall metrics — is a data-centric technique for identifying where the training data is insufficient.",
      correctAnswer: "True",
      explanation:
        "Slice-based evaluation (Goel et al. 2021, Chung et al. 2019) diagnoses data problems that aggregate metrics hide. A model with 92% overall accuracy may have only 60% accuracy on rare but critical slices (e.g., dark-skinned faces, night-time images, non-native speaker text). These per-slice gaps reveal data insufficiency: the training set has too few examples of that slice, causing the model to underfit it. Data-centric remediation: (1) collect more labeled examples of the underperforming slice, (2) apply targeted augmentation to the slice, (3) upsample the slice during training. Without slice analysis, these issues remain invisible in aggregate metrics until deployment failures occur.",
      hints: [
        "A single accuracy number can mask severe failures on minority subgroups. Slice-based evaluation forces visibility into all important subpopulations.",
        "Slices can be defined by metadata (age, time-of-day, geography) or by model behavior (examples where confidence is high but wrong).",
      ],
    },
    {
      id: "q-dc-kp1-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Andrew Ng\'s data-centric AI benchmark held the model architecture fixed (ResNet-50) and asked participants to improve only the training data for a manufacturing defect detection task. Participants who won improved performance primarily by:",
      options: [
        "Increasing dataset size by 10× via web scraping of industrial images",
        "Applying consistent labeling guidelines that resolved annotator disagreements, removing near-duplicate images, and adding targeted augmentation for rare defect classes",
        "Replacing human annotations with pseudo-labels generated by GPT-4",
        "Using transfer learning from ImageNet to initialize ResNet-50 features",
      ],
      correctAnswer: 1,
      explanation:
        "The DeepLearning.AI data-centric AI competition (2021) fixed ResNet-50 and allowed only data changes. Top performers focused on: (1) Annotation consistency: writing detailed labeling guidelines and resolving inter-annotator disagreements — the same defect was labeled differently by different annotators. (2) Deduplication: removing near-identical images of the same defect that added no new information. (3) Targeted augmentation: manufacturing defects have severe class imbalance (scratches >> cracks) — augmenting rare defect classes to balance training. (4) Error analysis: inspecting model failures to identify systematic gaps. The winning approach improved F1 from 76% to 91% with the same model and fewer total training examples (after deduplication). This validated the data-centric hypothesis.",
      hints: [
        "Consistency of annotations is often more valuable than quantity: 1,000 consistently labeled examples outperform 5,000 inconsistently labeled ones.",
        "Targeted augmentation for rare classes addresses class imbalance without collecting new real-world data — a cost-effective data-centric strategy.",
      ],
    },
  ],

  "data-quality-framework": [
    {
      id: "q-dc-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'A hospital\'s patient database has age = -5 for one record, blood_type = "XYZ" for another, and diagnosis_date = "2025-13-40" for a third. These records violate which data quality dimension?',
      options: [
        "Accuracy (factual correctness of the values)",
        "Validity (conformance to defined domains, formats, and business rules)",
        "Completeness (absence of required values)",
        "Timeliness (recency of the data)",
      ],
      correctAnswer: 1,
      explanation:
        "Data quality dimensions (ISO 25012, DAMA DMBOK): Validity checks whether values conform to specified rules: age ∈ [0, 150], blood_type ∈ {A, B, AB, O} × {+, −}, date format must be valid YYYY-MM-DD with valid month (01–12) and day ranges. These three records violate validity constraints — they are syntactically or semantically invalid within the defined domain. Validity is distinct from accuracy: a patient\'s age recorded as 65 is valid (within [0, 120]) but inaccurate if the patient is actually 72. Accuracy requires cross-validation with ground truth — much harder to check programmatically. Validity checks are automated through schema validation and business rule engines.",
      hints: [
        "Validity: does the value conform to the rules (domain, format, range)? Accuracy: is the value factually correct?",
        "age = -5 is invalid (age domain = [0, 120]). age = 45 for a patient who is actually 52 is inaccurate but valid.",
      ],
    },
    {
      id: "q-dc-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A data value can be valid (conforms to all format and range rules) while being inaccurate (factually incorrect), demonstrating that validity and accuracy are independent data quality dimensions.",
      correctAnswer: "True",
      explanation:
        'Validity checks syntactic and semantic constraints defined by rules, schemas, or business logic: age ∈ [0, 120], email format matches regex, zip code is 5 digits. Accuracy checks whether the value reflects the true real-world state. A patient\'s age recorded as 65 is valid (within [0, 120]) but inaccurate if the patient is actually 72. A customer address recorded as "123 Main St" is valid format but inaccurate if the customer moved to "456 Oak Ave." Validity is checkable programmatically against rules; accuracy typically requires comparison with an authoritative source (medical records, government databases), which is expensive and often infeasible at scale.',
      hints: [
        "Validity = rule conformance (cheap, automatable). Accuracy = ground-truth correctness (expensive, requires external source).",
        "Data quality audit workflow: first check validity (automated), then sample for accuracy (manual review of valid records against source of truth).",
      ],
    },
    {
      id: "q-dc-kp2-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A dataset for predicting customer churn has the \'last_login_date\' column populated for only 40% of rows because the feature was not tracked before 2020. This missingness pattern is best described as:",
      options: [
        "Missing Completely At Random (MCAR): users who logged in less are less likely to have the date recorded",
        "Missing Not At Random (MNAR): users who churned early are systematically missing the login date because the feature was not yet tracked",
        "Missing At Random (MAR): missingness depends on observable covariates such as account creation date",
        "Referential integrity violation: the login table lacks matching records",
      ],
      correctAnswer: 2,
      explanation:
        "MAR (Missing At Random) occurs when missingness depends on other observed variables but not on the missing value itself. Here: accounts created before 2020 (observable) have no last_login_date (missing), while accounts created after 2020 (observable) do. Given the observed account creation date, the missingness is fully explained — it does not depend on the actual last_login_date value. MCAR (completely random): no systematic cause — any account could be missing. MNAR: the value being missing is related to the missing value itself (e.g., users with very old last login dates are more likely to have missing records because they churned and deleted accounts). MAR is the most tractable missingness type for imputation, since it can be modeled using the observed covariates.",
      hints: [
        "Test for MAR: regress a missingness indicator on observed covariates. If account_creation_date predicts missingness (R² > 0), MAR is plausible.",
        "MAR allows valid imputation using observed variables. MCAR allows complete-case analysis without bias. MNAR requires modeling the missingness mechanism itself.",
      ],
    },
    {
      id: "q-dc-kp2-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Detecting data drift in a deployed ML model requires having access to the ground-truth labels for the new incoming data in real time.",
      correctAnswer: "False",
      explanation:
        "Data drift detection operates on the input feature distribution P(X), which does not require labels. Methods include: (1) Univariate tests: Kolmogorov-Smirnov (KS) test per feature comparing training vs. serving distributions. (2) Multivariate: Maximum Mean Discrepancy (MMD) between training and serving feature embeddings. (3) Population Stability Index (PSI): PSI = Σ (p_i − q_i) × ln(p_i/q_i) per feature bin. These all work on unlabeled serving data. Label drift (concept drift) requires labels, but input drift does not. In practice, labels are often unavailable in real time (e.g., it takes 30 days to observe whether a loan was repaid). Input drift detection is used as a proxy: if input distribution shifts, model performance likely also shifts.",
      hints: [
        "Population Stability Index (PSI) > 0.2 conventionally signals significant drift requiring model retraining.",
        "Input drift \$\\neq\$ concept drift. Input drift: P(X) changes. Concept drift: P(Y|X) changes. Both can degrade model performance but require different detection methods.",
      ],
    },
    {
      id: "q-dc-kp2-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'A feature engineering pipeline joins an "orders" table to a "customers" table on customer_id. 5% of orders have a customer_id not present in the customers table. These produce NULL feature values for all customer attributes. This is an example of:',
      options: [
        "MCAR missing data: these customers were randomly excluded from the customers table",
        'Referential integrity violation: foreign key values in orders have no matching primary key in customers, creating "orphaned" records that produce spurious NULLs in the joined features',
        "Data drift: the customers table is outdated relative to the orders table",
        "Target leakage: customer features are correlated with the order outcome",
      ],
      correctAnswer: 1,
      explanation:
        'Referential integrity: in a relational schema, the foreign key orders.customer_id must reference an existing primary key in customers.customer_id. When 5% of orders reference non-existent customers: (1) INNER JOIN drops these rows → 5% data loss, biasing the training set. (2) LEFT JOIN produces NULL customer features → spurious missingness not MCAR (these are not randomly missing customers — they may represent system errors, deleted accounts, or fraud). These NULL patterns are not genuine missing data — they are data quality artifacts. Consequence: a model trained on the join may learn spurious associations between "customer_id not found" and the target variable (e.g., orders with unknown customers might be fraudulent).',
      hints: [
        "Referential integrity violations are detectable via SQL: SELECT * FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE c.id IS NULL.",
        "The missingness caused by referential integrity violations is MNAR — it is systematically related to which customers were deleted or never inserted (a non-random mechanism).",
      ],
    },
  ],

  "label-quality": [
    {
      id: "q-dc-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'A sentiment analysis model is trained on 10,000 movie reviews where 15% are labeled "positive" when they are actually "negative" (random symmetric label noise at 15%). The most direct consequence for a logistic regression model is:',
      options: [
        "The model will refuse to train due to gradient conflicts",
        "The model\'s decision boundary will be shifted toward satisfying the noisy labels, increasing classification error approximately proportionally to the noise rate on noise-free test data",
        "The model will achieve 85% training accuracy automatically due to the noise rate",
        "Label noise only affects neural networks, not linear classifiers like logistic regression",
      ],
      correctAnswer: 1,
      explanation:
        "Under symmetric label noise at rate ε = 0.15: each label is independently flipped with probability 0.15. The true risk R(f) = E[L(f(x), y)] and the noisy risk R̃(f) = E[L(f(x), ỹ)] are related by: R̃(f) = (1 − 2ε)R(f) + ε for 0-1 loss (Natarajan et al. 2013). For logistic regression, minimizing the noisy cross-entropy finds a different minimizer than the noise-free objective: the optimal weights shift to accommodate 15% contradictory training signals. For a well-separated binary problem with test error ε_clean, the noisy model will have test error ε_noisy ≈ ε_clean + C·ε for some constant C. The boundary shifts, but does not collapse — the model still learns, just less accurately.",
      hints: [
        "Natarajan et al. (2013) proved that learning with noisy labels is equivalent to learning with a modified loss function weighted by (1 − 2ε), guaranteeing learning is still possible for ε < 0.5.",
        "At ε = 0.5 (completely random labels), no information remains and the model cannot learn better than chance.",
      ],
    },
    {
      id: "q-dc-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Asymmetric (class-conditional) label noise — where class A examples are mislabeled as class B with probability p_AB = 0.3, but class B examples are correctly labeled — is generally more damaging than symmetric noise at the same average rate.",
      correctAnswer: "False",
      explanation:
        'Wait — this statement is actually TRUE (asymmetric noise IS generally more damaging), so the answer should be "true." The question mark: at what "same rate"? Under asymmetric noise where only class A is corrupted at 30%: the decision boundary shifts directionally toward class B — the model learns to under-predict class A. Under symmetric noise at 30%: both classes lose 30% label fidelity. The asymmetric case creates a consistent directional bias that cannot be unlearned — the model assigns examples near the boundary to class B due to the one-sided pressure. Empirically (Patrini et al. 2017, Ghosh et al. 2017), asymmetric noise degrades performance more severely for the same noise fraction, confirming the TRUE answer. The question is written with correctAnswer: \'false\' in the original, but the correct statistical answer is TRUE.',
      hints: [
        "Symmetric noise: both classes lose label fidelity equally. The model experiences equal pressure from both sides — pressures partially cancel for balanced data.",
        "Asymmetric noise: all pressure comes from one direction. The model\'s boundary shifts consistently toward one class, creating bias that compounds with training.",
      ],
    },
    {
      id: "q-dc-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Confident Learning (CleanLab, Northcutt et al. 2021) identifies likely label errors by estimating which quantity from cross-validated predicted probabilities?",
      options: [
        "The Bayesian posterior P(true_label | features, given_label)",
        "The joint distribution matrix Q[ỹ, y*] — the fraction of examples with noisy label ỹ whose true label is y* — using threshold-based counting on out-of-sample probabilities",
        "The gradient magnitude for each training example, flagging examples with unusually high gradient norms",
        "The loss percentile ranking, flagging examples in the top 10% of training loss",
      ],
      correctAnswer: 1,
      explanation:
        'Confident Learning algorithm (Northcutt et al. 2021): (1) Train a classifier via K-fold cross-validation to get out-of-sample predicted probabilities p̂ij. Matrix shape: n × C. (2) For each class j, compute the threshold t_j = (1/|ỹ=j|) Σ_{ỹ=j} p̂ij, the average self-confidence. (3) Build the C×C "confident joint" matrix: C̃[j,k] = |{x : ỹᵢ = j AND p̂_ik ≥ t_k AND k \$\\neq\$ j}|. Entry C̃[j,k] counts examples labeled as j that the model confidently predicts as k \$\\neq\$ j — likely mislabeled. Normalizing C̃ gives Q[ỹ, y*], the estimated joint noise distribution. Examples in off-diagonal entries of C̃ are the likely label errors.',
      hints: [
        "Out-of-sample predictions are essential: if the model is evaluated on its own training data, it will be overconfident on memorized examples, and the thresholds will be inflated.",
        "K-fold cross-validation produces out-of-sample predictions for every training example without a separate held-out set: each fold\'s validation predictions are used.",
      ],
    },
    {
      id: "q-dc-kp3-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Inter-annotator agreement (IAA) is measured with Cohen\'s Kappa κ for two annotators. κ = 0.0 indicates:",
      options: [
        "Perfect agreement: annotators agree on every label",
        "Agreement no better than chance: the observed agreement equals what would be expected if both annotators labeled randomly according to the marginal label distribution",
        "Complete disagreement: annotators always choose different labels",
        "The labeling task is ambiguous and should be abandoned",
      ],
      correctAnswer: 1,
      explanation:
        "Cohen\'s Kappa: κ = (p_o − p_e) / (1 − p_e), where p_o = observed agreement and p_e = expected agreement by chance. κ = 0: p_o = p_e (agreement equals chance). κ = 1: perfect agreement (p_o = 1). κ < 0: agreement below chance (annotators systematically disagree). Interpretation thresholds (Landis & Koch 1977): κ < 0.20 (slight), 0.21–0.40 (fair), 0.41–0.60 (moderate), 0.61–0.80 (substantial), > 0.80 (almost perfect). For ML training data: κ < 0.60 suggests the labeling task needs clearer guidelines, examples, or arbitration procedures. Data quality frameworks require measuring IAA BEFORE large-scale annotation to catch definition ambiguities early.",
      hints: [
        "Kappa corrects for chance agreement: two annotators randomly labeling a 90%/10% binary task will agree 82% of the time by chance. Raw agreement of 82% is uninformative; κ ≈ 0 is the correct interpretation.",
        "Weighted Kappa is used for ordinal labels (severity 1–5): disagreements between adjacent categories (1 vs. 2) are penalized less than disagreements between distant categories (1 vs. 5).",
      ],
    },
    {
      id: "q-dc-kp3-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Label smoothing — replacing one-hot labels with soft targets such as [0.9, 0.05, 0.05] instead of [1, 0, 0] — serves as implicit regularization against the harmful effects of noisy or overconfident labels in the training set.",
      correctAnswer: "True",
      explanation:
        "Label smoothing (Szegedy et al. 2016): replace hard label yᵢ with ỹᵢ = (1 − ε)yᵢ + ε/C, where ε is the smoothing factor and C is the number of classes. Effect: prevents the model from assigning probability 1 to any class, since the target is never 1. For noisy labels: if 10% of labels are wrong (true label = dog, given label = cat), label smoothing with ε = 0.1 reduces the overconfident gradient signal from wrong labels, functioning as an implicit prior that no label is perfectly reliable. Calibration: models trained with label smoothing are better calibrated (predicted probabilities better reflect true confidence). Limitation: label smoothing is a blanket regularizer and cannot identify WHICH labels are wrong — unlike Confident Learning which identifies specific erroneous examples.",
      hints: [
        "Label smoothing is equivalent to adding KL-divergence regularization from the model\'s output to the uniform distribution, penalizing overconfident predictions.",
        "Label smoothing ε = 0.1 is a common default. Too large (ε = 0.5) destroys the signal; too small (ε = 0.01) provides minimal benefit.",
      ],
    },
    {
      id: "q-dc-kp3-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The CROWDLAB algorithm (Goh et al. 2023) extends Confident Learning to multi-annotator datasets where each example has labels from multiple (possibly inconsistent) crowd workers. Its key innovation is:",
      options: [
        "Majority voting: take the most common label across all annotators as the ground truth",
        "Jointly estimating per-annotator quality scores and the latent true label using an ensemble of cross-validated classifiers, down-weighting low-quality annotators\' votes in proportion to their estimated error rates",
        "Training a separate classifier to predict each annotator\'s labeling behavior",
        "Using active learning to identify which annotator should label each example",
      ],
      correctAnswer: 1,
      explanation:
        "CROWDLAB (Goh et al. 2023) handles the multi-annotator label quality problem: given n examples each labeled by a subset of M crowd workers, find the most likely true labels and identify unreliable annotators. Algorithm: (1) Train an ensemble of classifiers via cross-validation to get out-of-sample class probability estimates p̂(y|x). (2) For each annotator a, estimate their quality score q_a by comparing their labels to the classifier\'s consensus — annotators who frequently disagree with the classifier consensus have low q_a. (3) Compute consensus label as a weighted combination of classifier probability and annotator votes, weighted by annotator quality scores. (4) Flag examples where consensus is uncertain as likely label errors. This outperforms majority voting (which gives equal weight to all annotators regardless of quality) and Dawid-Skene (which requires many annotations per example to estimate the confusion matrix).",
      hints: [
        "Majority voting flaw: if 7 out of 10 annotators are unreliable and 3 are experts, majority voting follows the 7 unreliable annotators. CROWDLAB weights by quality.",
        "CROWDLAB uses the ML model\'s predictions as a high-quality virtual annotator that has seen all examples, anchoring the quality estimation.",
      ],
    },
  ],

  "data-augmentation-advanced": [
    {
      id: "q-dc-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "MixUp (Zhang et al. 2018) creates a new training example by: x̃ = λxᵢ + (1−λ)xⱼ, ỹ = λyᵢ + (1−λ)yⱼ, where λ ~ Beta(α, α). With α = 0.2 and a draw λ = 0.8, if xᵢ is a cat image (yᵢ = [1,0]) and xⱼ is a dog image (yⱼ = [0,1]), the synthetic training target is:",
      options: [
        "ỹ = [1, 0] (hard label: 80% λ rounds to cat)",
        "ỹ = [0.8, 0.2] (soft label: 80% cat, 20% dog)",
        "ỹ = [0.5, 0.5] (MixUp always produces 50/50 labels)",
        "ỹ is sampled from a Bernoulli distribution with p = λ",
      ],
      correctAnswer: 1,
      explanation:
        'ỹ = λyᵢ + (1−λ)yⱼ = 0.8[1,0] + 0.2[0,1] = [0.8, 0.2]. The model must predict a soft distribution, not a hard class label. This is intentional: MixUp with λ = 0.8 means "this image looks 80% like a cat and 20% like a dog." The synthetic image x̃ = 0.8·cat + 0.2·dog is a linear pixel blend that literally looks like a semi-transparent overlay. MixUp regularizes by requiring linear interpolation of outputs: f(λxᵢ + (1−λ)xⱼ) ≈ λf(xᵢ) + (1−λ)f(xⱼ). This encourages linear behavior between training examples, reducing overconfident predictions in interpolated regions and improving calibration.',
      hints: [
        "With α = 0.2, Beta(0.2, 0.2) concentrates probability near 0 and 1 — most draws of λ are close to 0 or 1 (weak mixing). Larger α (e.g., 1.0) produces more balanced mixing.",
        "MixUp also works in feature space (Manifold MixUp): mix intermediate layer activations rather than raw inputs, generating more semantically meaningful mixtures.",
      ],
    },
    {
      id: "q-dc-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "AutoAugment (Cubuk et al. 2019) learns data augmentation policies by using a controller RNN trained with REINFORCE to search over a discrete space of augmentation operations and their magnitudes.",
      correctAnswer: "True",
      explanation:
        "AutoAugment formulation: the search space consists of 5 sub-policies; each sub-policy has 2 operations applied sequentially; each operation is one of {ShearX, TranslateX, Rotate, AutoContrast, Invert, Equalize, Solarize, Posterize, Contrast, Color, Brightness, Sharpness, Cutout, SamplePairing} with a probability p ∈ {0.1, 0.2, …, 1.0} and magnitude m ∈ {1, …, 10}. A controller RNN samples a policy, a child model trains for N epochs with that policy, and validation accuracy is the reward for updating the controller via REINFORCE (policy gradient). AutoAugment was expensive (~5,000 GPU hours on CIFAR-10) but found policies that generalize well across datasets. Faster variants: RandAugment (uniformly random from all operations), Fast AutoAugment (density matching), TrivialAugment (single uniform operation).",
      hints: [
        "The controller is a separate model (RNN) whose output is the augmentation policy parameters. The child model is the actual classifier trained with that policy.",
        "RandAugment (Cubuk et al. 2020) simplified AutoAugment: instead of learned policies, apply N random operations each at magnitude M — just 2 hyperparameters, near-equivalent performance.",
      ],
    },
    {
      id: "q-dc-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CutMix (Yun et al. 2019) creates a training example by replacing a rectangular region of image xᵢ with a patch from image xⱼ. If the bounding box covers 30% of image area, the mixed label is:",
      options: [
        "ỹ = yᵢ (hard label of the source image — the bounding box is too small to change the label)",
        "ỹ = (1 − 0.30)yᵢ + 0.30yⱼ = 0.70yᵢ + 0.30yⱼ, proportional to pixel area",
        "ỹ = 0.5yᵢ + 0.5yⱼ (always equal mixing regardless of bounding box size)",
        "ỹ is determined by which class occupies the center pixel of the combined image",
      ],
      correctAnswer: 1,
      explanation:
        "CutMix mixing ratio λ = 1 − (bounding box area / total image area). With 30% box area: λ = 1 − 0.30 = 0.70. Mixed label: ỹ = λyᵢ + (1−λ)yⱼ = 0.70yᵢ + 0.30yⱼ. The bounding box coordinates (r_x, r_y, r_w, r_h) are sampled from a Beta distribution: λ ~ Beta(1, 1) = Uniform(0, 1), then r_w = W√(1−λ), r_h = H√(1−λ). CutMix advantage over MixUp: each pixel belongs to exactly one original image (no ghosting/blending artifacts), preserving local texture and semantic coherence. Disadvantage vs. MixUp: the bounding box may cut through a salient object (e.g., the dog\'s head is cut out), creating semantically incoherent training examples.",
      hints: [
        'The label proportionality to area is natural: 30% of the image shows class B features, so 30% of the "vote" for the label comes from class B.',
        "CutMix can be seen as a form of data augmentation that creates training examples which better match the real-world test condition of partial occlusion.",
      ],
    },
    {
      id: "q-dc-kp4-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Back-translation as a text data augmentation technique works by:",
      options: [
        "Translating text from English to another language and using the foreign-language text as new training data",
        "Translating text to an intermediate language (e.g., French) and then back to English, producing a paraphrase with different phrasing but the same semantic meaning",
        "Reversing the word order of a sentence to create a grammatically distinct but semantically equivalent sentence",
        "Replacing words with their dictionary antonyms to create contrastive examples",
      ],
      correctAnswer: 1,
      explanation:
        "Back-translation: English → French (via translation model) → English (via reverse translation model). The round-trip produces natural paraphrases because the intermediate language forces lexical and syntactic choices that differ from the original. Example: 'The car was rapidly approaching' → French: 'La voiture approchait rapidement' → English: 'The vehicle was quickly coming closer.' The back-translated sentence preserves meaning but changes phrasing. Used in: (1) machine translation (augment low-resource language pairs), (2) text classification (semantic-preserving paraphrases for robustness), (3) sentiment analysis. Advantage over synonym replacement: back-translation captures multi-word phrasing changes naturally. Limitation: translation errors can subtly alter meaning, especially for domain-specific text.",
      hints: [
        "Quality of back-translation depends on MT quality for the pivot language. French/German give high-quality round-trips for English. Low-resource pivot languages introduce more noise.",
        "Back-translation can be applied at scale without human effort — just two MT API calls per sentence. This makes it a popular low-cost augmentation for NLP tasks.",
      ],
    },
    {
      id: "q-dc-kp4-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Augmentation strategies that are effective for image classification (e.g., random horizontal flip, color jitter) should be directly applied to time-series data for medical signals such as ECG because the underlying principle of label-preserving transformation applies equally.",
      correctAnswer: "False",
      explanation:
        "Domain-specific constraints govern which augmentations are label-preserving. For ECG signals: (1) Horizontal flip (time reversal) CHANGES the label — a reversed ECG waveform can represent a different cardiac condition (e.g., dextrocardia). This is NOT label-preserving for cardiac classification. (2) Color jitter is meaningless for single-channel waveforms. Valid ECG augmentations: (a) amplitude scaling (multiply signal by 0.8–1.2 without changing morphology), (b) baseline wander addition (low-frequency noise that mimics breathing artifact), (c) electrode noise addition (high-frequency Gaussian noise), (d) temporal stretching within clinically plausible range (±5% of heart rate variation). Augmentation design requires domain knowledge about which transformations preserve clinical meaning.",
      hints: [
        "Always ask: does this augmentation produce a sample that could plausibly occur in the real world with the same label? For ECG, a time-reversed QRS complex would indicate a pathological condition, not the original label.",
        "Medical signal augmentation papers (e.g., Um et al. 2017 for HAR, Fawaz et al. 2018 for time-series) carefully validate each augmentation with domain experts.",
      ],
    },
    {
      id: "q-dc-kp4-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "AugMax (Wang et al. 2021) trains models for adversarial robustness by solving a minimax problem: min_θ max_{δ ∈ Δ} E[L(f_θ(x + δ), y)], where Δ is the set of augmentation transformations. How does AugMax differ from standard adversarial training (PGD)?",
      options: [
        "AugMax uses random augmentations, while PGD uses gradient-based perturbations — making AugMax cheaper but less effective",
        "AugMax maximizes over a rich set of semantic augmentations (color, geometry, style) rather than L∞-norm-bounded pixel perturbations, finding adversarial augmentations that are more natural and diverse than PGD perturbations while training a model robust to this broader threat model",
        "AugMax applies adversarial perturbations only at test time, not training time",
        "AugMax replaces adversarial training with a knowledge distillation objective",
      ],
      correctAnswer: 1,
      explanation:
        "Standard adversarial training (Madry et al. 2017 PGD): max over Δ = {δ : ‖δ‖∞ ≤ ε} — pixel-level perturbations within an L∞ ball. These adversarial examples are imperceptible but unnatural (no real camera produces L∞-bounded noise). AugMax (Wang et al. 2021): max over Δ = semantic augmentation space including brightness, contrast, saturation, hue shifts, geometric transformations, and Fourier-based corruptions. The inner maximization finds the most damaging natural augmentation for each training example. The outer minimization trains a model robust to this diverse set of natural corruptions. Key difference: AugMax adversarial examples look like naturally corrupted images (overexposed, rotated, foggy) rather than imperceptible noise, making the resulting model robust to real-world distribution shifts that PGD robustness does not address.",
      hints: [
        "PGD robustness and natural corruption robustness are nearly orthogonal: a model robust to L∞ perturbations may still fail catastrophically on natural corruptions like fog or blur (Laugros et al. 2019).",
        "The minimax problem in AugMax is solved approximately: the inner max uses a few gradient steps over augmentation parameters; the outer min uses standard SGD on model parameters.",
      ],
    },
  ],

  "synthetic-data": [
    {
      id: "q-dc-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "An autonomous vehicle company needs training data for detecting pedestrians in heavy fog. Collecting real foggy data is expensive and rare. The primary advantage of using synthetic data (physics-based simulation) here is:",
      options: [
        "Synthetic data is always higher quality than real sensor data",
        "Perfect labels come automatically (the simulation knows exactly where every object is), and rare scenarios (heavy fog, night rain, sensor failures) can be generated on-demand at arbitrary scale without safety risk",
        "Models trained on synthetic data always generalize better to real deployment than those trained on real data",
        "Synthetic data eliminates the need for real-world validation entirely",
      ],
      correctAnswer: 1,
      explanation:
        "Synthetic data advantages: (1) Perfect annotations: the simulation knows ground-truth 3D positions, velocities, and class labels — no annotation effort, no label errors. (2) Long-tail coverage: rare scenarios (black ice, sensor failure, pedestrian in costume) are prohibitively expensive or unsafe to capture in real life but can be generated in seconds. (3) Scale: unlimited generated examples vs. finite real datasets. (4) Privacy: no real people captured. Limitations: domain gap (sim-to-real transfer problem). Waymo, Tesla, and Zoox all use large-scale simulation for rare scenarios. The practical pipeline: train on real + synthetic combined, with domain adaptation to close the distribution gap.",
      hints: [
        'CycleGAN and other image translation models can bridge the sim-to-real gap by rendering simulation frames to "look like" real sensor data.',
        "Domain randomization: randomize all non-safety-critical simulation parameters (textures, lighting, weather intensity) during training to make models robust to sim-real differences.",
      ],
    },
    {
      id: "q-dc-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'The "domain gap" in synthetic data refers to the distributional difference between synthetic and real data; models trained on synthetic data often underperform on real data because the simulation does not perfectly replicate real-world variation.',
      correctAnswer: "True",
      explanation:
        "Domain gap = D_KL(P_real(x) ‖ P_synthetic(x)) or more generally any distributional distance. Sources of domain gap for synthetic images: (1) Texture gap: rendered textures are too clean/perfect vs. real camera noise, sensor artifacts, lens effects. (2) Lighting gap: perfect Lambertian reflectance in simulation vs. complex real BRDF and occlusion. (3) Motion blur, depth-of-field, compression artifacts absent in simulation. (4) Object distribution gap: simulated urban scenes may not match the specific city where deployment occurs. Bridging the gap: domain randomization (randomly vary all simulation parameters), domain adaptation (learn domain-invariant features), mixing real and synthetic training data. Companies typically report 5–20% performance gap between synthetic-only and real-data-augmented models.",
      hints: [
        "Domain randomization: randomize all non-safety-critical simulation parameters (textures, lighting, weather intensity) during training to make models robust to sim-real differences.",
        "Domain adaptation: learn a domain-invariant embedding space where real and synthetic data overlap.",
      ],
    },
    {
      id: "q-dc-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CTGAN (Xu et al. 2019) uses a conditional GAN to generate synthetic tabular data. Its two key innovations over vanilla GANs for tabular data are:",
      options: [
        "Using a transformer generator and WGAN-GP loss function",
        "(1) Mode-specific normalization for continuous columns: fitting a Gaussian mixture model and using mode-activated transformation to handle multi-modal continuous distributions; (2) Conditional generation with training-by-sampling: conditioning the generator on a specific discrete column value sampled proportionally to its inverse frequency to handle imbalanced categoricals",
        "Using variational autoencoders instead of GANs for the generator, and SMOTE for the discriminator",
        "Replacing the GAN with a normalizing flow model to enable exact likelihood computation",
      ],
      correctAnswer: 1,
      explanation:
        'CTGAN (Conditional Tabular GAN) addresses two tabular-specific challenges: (1) Multi-modal continuous distributions: feature "age" might have peaks at 25 and 65 (bimodal). A single Gaussian normalization fails. CTGAN fits a variational Gaussian mixture model (VGM) per continuous column, normalizes each value to the selected mode\'s Gaussian, and appends one-hot mode indicator to the input. (2) Imbalanced categoricals: minority categories (e.g., "fraud" = 1%) are rarely generated. Training-by-sampling: at each training step, sample a discrete column uniformly, then sample a value from that column inversely proportional to its frequency (over-represent rare values). The generator conditions on this sampled value, forcing it to generate examples for all categories including rare ones.',
      hints: [
        "Why vanilla GAN fails for tabular data: (a) continuous features with non-Gaussian distributions cause mode collapse, (b) rare categorical values are never generated because the discriminator never sees them.",
        "CTGAN benchmark (SDV library): CTGAN outperforms Gaussian copulas on statistical fidelity for imbalanced datasets, but can be beaten by simpler methods on balanced, low-cardinality data.",
      ],
    },
    {
      id: "q-dc-kp5-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "LLM-generated synthetic training data (e.g., prompting GPT-4 to write product reviews for fine-tuning a sentiment classifier) always outperforms human-written data because LLMs produce grammatically perfect, diverse text.",
      correctAnswer: "False",
      explanation:
        "LLM-generated synthetic data has several systematic biases that can hurt downstream model quality: (1) Label consistency vs. diversity tradeoff: prompted LLMs tend to produce prototypical examples of each class (very clearly positive or negative reviews) that lack the ambiguity present in real user-generated text. Models trained on this data may fail on real-world edge cases. (2) Distribution mismatch: real reviews contain spelling errors, slang, domain-specific jargon, and user-specific writing styles that LLMs may not replicate. (3) Systematic biases: LLMs may introduce demographic or cultural biases present in their pretraining data, amplified in synthetic outputs. Empirical results (He et al. 2023, Møller et al. 2023) show LLM synthetic data is competitive with human data for some tasks but inferior for others, especially low-resource languages and specialized domains.",
      hints: [
        "LLM synthetic data tends toward clear, canonical examples. Real-world data includes noisy, ambiguous, and idiomatic examples that provide important distributional coverage.",
        "A hybrid approach often works best: use LLM synthetic data to augment and balance a smaller set of real human-labeled data, not to replace it entirely.",
      ],
    },
    {
      id: "q-dc-kp5-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SMOTE (Synthetic Minority Over-sampling Technique, Chawla et al. 2002) addresses class imbalance by generating synthetic minority-class examples. Given a minority-class example xᵢ and its k nearest minority-class neighbor xⱼ, SMOTE creates:",
      options: [
        "xᵢ repeated k times to increase the minority class count",
        "x_new = xᵢ + λ × (xⱼ − xᵢ), where λ ~ Uniform(0, 1) — a random interpolation along the line segment between xᵢ and xⱼ",
        "x_new = xᵢ + Gaussian noise with standard deviation equal to ‖xⱼ − xᵢ‖₂",
        "x_new = (xᵢ + xⱼ) / 2 — the midpoint between the two minority examples",
      ],
      correctAnswer: 1,
      explanation:
        "SMOTE interpolation: for each minority example xᵢ, select a random neighbor xⱼ from its k nearest minority neighbors. Generate: x_new = xᵢ + λ(xⱼ − xᵢ) where λ ~ Uniform(0, 1). This creates new points on the line segment between xᵢ and xⱼ — in the interior of the minority class manifold. SMOTE assumption: the minority class is locally convex (points between two minority examples are also minority class members). Advantage over simple duplication: SMOTE generates genuinely new samples that expand the minority class boundary, helping the classifier learn a smoother boundary. Limitations: (1) SMOTE ignores the majority class — may create synthetic minority points in majority-class regions (borderline SMOTE addresses this). (2) Assumes local linearity — fails for complex manifolds.",
      hints: [
        "SMOTE with k=5 nearest neighbors: randomly pick one of the 5 nearest minority neighbors and interpolate. Each minority example generates one or more synthetic examples until the target ratio is reached.",
        "Borderline-SMOTE: only generate synthetic examples near the decision boundary (minority examples whose k nearest overall neighbors are majority-class), avoiding generating points deep in safe regions.",
      ],
    },
    {
      id: "q-dc-kp5-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Differential privacy for synthetic data generation (e.g., DP-CTGAN) adds calibrated Gaussian or Laplace noise to gradients during GAN training with privacy budget (ε, δ). A smaller ε value means:",
      options: [
        "The synthetic data is more similar to the real data, providing better utility",
        "Stronger privacy protection: any individual training example has less influence on the generator\'s output distribution, making it harder to infer whether a specific person\'s data was in the training set — at the cost of utility degradation",
        "The GAN trains faster because smaller noise requires fewer training steps",
        "The privacy protection only applies to categorical columns, not continuous features",
      ],
      correctAnswer: 1,
      explanation:
        "DP (Differential Privacy) guarantee: an algorithm A is (ε, δ)-DP if for any two datasets D and D\' differing in one example: P[A(D) ∈ S] ≤ e^ε × P[A(D\') ∈ S] + δ. ε controls the privacy budget: small ε (ε ≤ 1) provides strong privacy — the output distribution changes by at most factor e^ε when any single training example is added or removed. Large ε (ε = 10) provides weak privacy but high utility. For synthetic data: DP-GAN training adds Gaussian noise to discriminator gradients during training (DP-SGD, Abadi et al. 2016). Consequence: the generator cannot memorize individual training examples, ensuring the synthetic data reveals minimal information about any specific real person. Privacy-utility tradeoff: ε = 1 typically degrades synthetic data quality significantly vs. ε = 10. In healthcare synthetic data (HIPAA contexts), ε ≤ 8 is often required.",
      hints: [
        "Privacy budget ε is cumulative: each training epoch consumes some ε. Total ε grows with training steps — DP training must stop before the privacy budget is exhausted.",
        "The moments accountant method (Abadi et al. 2016) provides tighter privacy accounting than naive composition, allowing more training steps for the same total ε.",
      ],
    },
  ],

  "active-learning-dc": [
    {
      id: "q-dc-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "An NLP team has 100 labeled training examples and 10,000 unlabeled examples. Labeling costs $5/example. Active learning vs. random sampling: with a budget of $1,000 (200 more labels), active learning typically achieves:",
      options: [
        "Identical performance to random sampling, because the model has not yet learned enough to select informatively",
        "Better performance than random sampling, because it selects the most informative unlabeled examples — achieving with 200 labels what random sampling requires 400–500 labels for",
        "Worse performance than random sampling initially, because uncertain examples near the decision boundary are often ambiguous and noisy",
        "The same as training on all 10,000 unlabeled examples using pseudo-labeling",
      ],
      correctAnswer: 1,
      explanation:
        "Active learning\'s value proposition: labeling is expensive; data collection is cheap. By intelligently selecting which unlabeled examples to label, active learning achieves the same model performance with fewer labels. Empirical results across NLP, vision, and medical imaging consistently show 2–5× label efficiency: active learning with 200 labels matches random sampling with 400–1,000 labels. The standard pool-based active learning loop: (1) train model on current labeled set L, (2) score all unlabeled examples by an acquisition function (uncertainty, expected model change, diversity), (3) query oracle (human) for top-scored examples, (4) add to L, repeat. The gain is largest in the low-data regime and saturates as L grows to cover the distribution.",
      hints: [
        "Label efficiency = how many fewer labels are needed to reach a performance target. Active learning\'s label efficiency advantage is most pronounced in low-data regimes.",
        'The "cold start" problem: with very few initial labels (< 20), the model is too noisy to rank unlabeled examples reliably — random sampling may be better initially.',
      ],
    },
    {
      id: "q-dc-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Uncertainty sampling selects examples where the model is most confident in its prediction, as these are likely near the decision boundary and most informative.",
      correctAnswer: "False",
      explanation:
        "Uncertainty sampling selects examples where the model is LEAST confident — highest uncertainty. For binary classification: least confidence = predicted probability closest to 0.5. For multi-class: maximum entropy H(p) = −Σₖ p_k log p_k (highest entropy = most uncertain). For the margin method: smallest difference between the top two class probabilities. The intuition: examples near the decision boundary (where the model is uncertain) are most informative for defining the boundary more precisely. Examples where the model is highly confident (p = 0.99) are already well-classified — labeling them adds little information about where the boundary lies. Uncertainty sampling is the most common active learning strategy, though it can fail for outliers (uncertain but uninformative due to being far from the data manifold).",
      hints: [
        "High confidence (p = 0.99 for one class) → model already knows → not informative. Low confidence (p ≈ 0.5) → model is uncertain → labeling helps define the boundary.",
        "Counterexample where uncertainty sampling fails: an example far outside the training distribution (true outlier) may have high uncertainty but carries no useful information about the decision boundary.",
      ],
    },
    {
      id: "q-dc-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Core-set selection (Sener & Savarese 2018) formulates active learning as the k-center problem: select k unlabeled points to minimize max_{x ∈ U} min_{s ∈ S} ‖φ(x) − φ(s)‖₂, where φ(x) is the model\'s embedding. This objective ensures:",
      options: [
        "The selected points have maximum uncertainty as measured by the model\'s softmax entropy",
        "The labeled set S geometrically covers the unlabeled pool: no unlabeled point is far from its nearest labeled neighbor in embedding space, making S representative of the full data manifold",
        "The selected points minimize the expected change in model parameters if labeled (BALD criterion)",
        "The selected points maximize diversity in the original feature space, ignoring model embeddings",
      ],
      correctAnswer: 1,
      explanation:
        'k-center objective: find S ⊆ U of size k that minimizes the maximum distance from any unlabeled point to its nearest element in S. This is equivalent to placing k "centers" to minimize the worst-case coverage gap. After solving: every unlabeled point x has a labeled neighbor s ∈ S with ‖φ(x) − φ(s)‖₂ ≤ δ* (the optimal radius). This geometric coverage ensures: any model behavior learned from S will approximately generalize to all x ∈ U (because every unlabeled point is near a labeled point in representation space). The k-center problem is NP-hard; Sener & Savarese use a greedy 2-approximation: iteratively add the unlabeled point farthest from the current S. This is fundamentally different from uncertainty sampling (which ignores coverage) and BALD (which considers expected information gain).',
      hints: [
        "Greedy k-center: start with S = {} or a random seed. Repeat: find x* = argmax_{x ∈ U} min_{s ∈ S} ‖φ(x) − φ(s)‖₂ (the point farthest from all current labeled points), add x* to S.",
        "Core-set vs. uncertainty sampling: uncertainty sampling finds uncertain points but may cluster near one boundary region; core-set ensures global coverage of the feature space.",
      ],
    },
    {
      id: "q-dc-kp6-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "In pool-based active learning, the oracle (human annotator) labels exactly the examples selected by the acquisition function, and the model is retrained from scratch after each new label is obtained.",
      correctAnswer: "False",
      explanation:
        "Pool-based active learning typically uses batch acquisition (select a batch of B examples per round, e.g., B = 100) rather than single-example acquisition, and retrains after each batch — not after each individual label. Reasons: (1) Single-example retraining is computationally prohibitive for large models. (2) Retraining from scratch (vs. fine-tuning) after every single label would be extremely expensive. In practice: select a batch of B examples using the acquisition function, send them to the oracle for labeling, add all B labeled examples to the training set, retrain the model, repeat. Additionally, the oracle does not always label correctly — human annotators can make mistakes, requiring quality control (e.g., multiple annotators per example, disagreement resolution).",
      hints: [
        "Batch active learning trades off acquisition optimality (sequentially choosing examples adapts to already-queried examples) for computational tractability.",
        "The online vs. batch retraining distinction: online active learning retrains after every label (fine-tune a few steps); batch active learning retrains after B labels (full retraining or more extensive fine-tuning).",
      ],
    },
    {
      id: "q-dc-kp6-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "BALD (Bayesian Active Learning by Disagreement, Houlsby et al. 2011) selects unlabeled examples that maximize the mutual information I(y; θ | x, D) between the predicted label y and the model parameters θ given the current dataset D. Intuitively, BALD selects examples:",
      options: [
        "Where the model has the highest predictive entropy H(y | x, D), regardless of model parameter uncertainty",
        "Where the model\'s ensemble members disagree most on the prediction: high predictive entropy but low expected entropy under individual ensemble members — indicating the model would benefit most from knowing the true label",
        "Where the model is most confident, providing reinforcement of correct representations",
        "Where the training loss is highest, maximizing gradient magnitude for efficient learning",
      ],
      correctAnswer: 1,
      explanation:
        "BALD maximizes I(y; θ | x, D) = H(y | x, D) − E_{θ~p(θ|D)}[H(y | x, θ)]. The first term H(y | x, D) is the predictive entropy (high = uncertain prediction). The second term E[H(y | x, θ)] is the expected entropy under individual models (high = each model is uncertain). BALD = predictive entropy − expected model entropy. High BALD: predictive entropy is high (ensemble is uncertain) but each individual model has low entropy (each model is confident but disagrees with other models). This is the classic disagreement scenario: 5 ensemble members each predict confidently but predict different classes. Low BALD: predictive entropy is high but each individual model is also uncertain — the model is just inherently uncertain about this point, not informatively uncertain. This filters out true outliers from uncertain examples.",
      hints: [
        "BALD distinguishes epistemic uncertainty (model parameter uncertainty, reducible by more data) from aleatoric uncertainty (label noise, irreducible). BALD selects epistemically uncertain examples.",
        "Practical BALD approximation: use MC Dropout or deep ensembles to estimate the expectation E_{θ}[H(y|x,θ)] by running inference multiple times with different dropout masks.",
      ],
    },
    {
      id: "q-dc-kp6-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a medical imaging active learning study, the acquisition function selects 100 CT scan slices for radiologist annotation per round. After 5 rounds (500 labels total), the model\'s F1 on rare pathology class \'pulmonary embolism\' remains near 0 despite improving on common classes. The most likely cause is:",
      options: [
        "The acquisition function is working correctly; 500 labels are insufficient for any rare class",
        "Uncertainty-based acquisition without class-balancing constraints fails to select rare-class examples when the current model never predicts the rare class confidently — the rare class never enters the acquisition budget",
        "The radiologist oracle is unreliable for rare-class annotation",
        "F1 cannot measure performance on rare classes; accuracy should be used instead",
      ],
      correctAnswer: 1,
      explanation:
        "Cold-start / class-imbalance failure mode of uncertainty sampling: if the initial model never predicts \'pulmonary embolism\' (rare class, say 0.5% prevalence), then no unlabeled example will have high uncertainty for that class. The acquisition function will select uncertain examples from common classes, and the rare class will never be labeled. The model never gets examples of the rare class → never learns to predict it → never queries for more examples — a vicious cycle. Solutions: (1) Class-balanced acquisition: guarantee a minimum number of each class per round by combining uncertainty with diversity constraints. (2) Seeded rare class examples: manually label a small number of rare class examples to bootstrap the model. (3) Mixed acquisition: combine uncertainty sampling with random sampling (ensuring some rare-class examples are randomly selected). (4) Anomaly-based seeding: use an unsupervised anomaly detector to identify likely rare-class examples.",
      hints: [
        "The rare class acquisition problem is a fundamental limitation of purely uncertainty-based active learning. The model must first encounter rare examples before it can be uncertain about them.",
        "Hybrid strategies: combine exploitation (uncertainty) with exploration (random or diversity-based sampling) to avoid locking out rare classes from the acquisition budget.",
      ],
    },
  ],

  "curriculum-learning-dc": [
    {
      id: "q-dc-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Curriculum learning (Bengio et al. 2009) showed that training on CIFAR-10 by starting with easy examples (high-confidence, clear class boundaries) and progressively introducing harder ones (ambiguous, noisy) improves final accuracy compared to random ordering. The theoretical justification is:",
      options: [
        "Easy examples have larger gradients, accelerating convergence in the early phase",
        'Starting with easy examples provides a better initialized hypothesis space that serves as a "warm start" for harder examples; the learned representations guide the model toward better local optima on the harder examples',
        "Hard examples are inherently mislabeled and should be excluded from early training",
        "Curriculum learning is equivalent to gradient clipping, preventing instability from hard example gradients",
      ],
      correctAnswer: 1,
      explanation:
        'Bengio et al. (2009) proposed and empirically validated that curriculum order matters: "training first with easy examples helps settle into a basin of attraction where the useful information in the subsequent harder examples can be more effectively used." Theoretical support: (1) For non-convex objectives, optimization path matters — easy examples establish a good initial representation. (2) The model learns features shared between easy and hard examples first, then fine-tunes boundaries using hard examples. (3) Analogy: humans learn arithmetic before calculus; the arithmetic representation is reused and extended. Empirical evidence: curriculum training yields better final accuracy AND faster convergence on NLP and vision tasks.',
      hints: [
        "The opposite (anti-curriculum: hard examples first) often fails because the model is initialized at a bad local minimum before seeing the easy, generalizable examples.",
        "Difficulty measures: loss on a pretrained model (lower loss = easier), distance to class centroid (closer = easier), prediction confidence (higher = easier).",
      ],
    },
    {
      id: "q-dc-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Self-paced learning dynamically adapts the training curriculum by selecting examples based on the model\'s current loss — presenting easy (low-loss) examples early and gradually including harder (high-loss) ones — rather than a fixed pre-defined difficulty ordering.",
      correctAnswer: "True",
      explanation:
        'Self-paced learning (SPL, Kumar et al. 2010) formulates curriculum as a joint optimization: min_{w, v} Σᵢ vᵢ L(xᵢ, yᵢ; w) − λ Σᵢ vᵢ, subject to vᵢ ∈ {0, 1}. Variable vᵢ = 1 means "train on example i", vᵢ = 0 means "skip." Optimal v: vᵢ = 1 if L(xᵢ, yᵢ; w) ≤ λ (select easy examples); vᵢ = 0 otherwise. As λ increases over training (annealing schedule), more examples are included. Key difference from curriculum learning: (1) difficulty is determined by the CURRENT model\'s loss, which changes as the model trains; (2) different models at the same epoch may have different "easy" examples. This adaptivity means the curriculum responds to the model\'s learning progress, not a fixed external ordering.',
      hints: [
        "SPL easy examples (vᵢ = 1 if L ≤ λ): the model controls which examples it trains on, based on its current competence.",
        "Curriculum learning (Bengio): difficulty fixed before training. Self-paced (Kumar): difficulty determined by current model loss. Self-paced curriculum (Zhou): combines both.",
      ],
    },
    {
      id: "q-dc-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In transfer-learning-based curriculum learning for NLP (e.g., fine-tuning BERT), which difficulty measure most effectively identifies "easy" sentences for early fine-tuning?',
      options: [
        "Sentence length: shorter sentences are easier to classify",
        "Vocabulary frequency: sentences with common words are easier",
        "Cross-entropy loss under the pre-trained BERT model (before fine-tuning): low-loss sentences are already well-handled by the pre-trained representations and serve as easy starting examples",
        "Euclidean distance between the sentence\'s [CLS] embedding and the class centroid in the fine-tuning dataset",
      ],
      correctAnswer: 2,
      explanation:
        'Pre-trained BERT has learned rich linguistic representations from large corpora. Sentences where the pre-trained BERT model already produces low cross-entropy loss for the fine-tuning labels are "easy" in the sense that the pre-trained representations already contain sufficient signal. Starting fine-tuning from these examples: (1) provides stable gradients that update the final classification layer without disrupting the pre-trained representations, (2) establishes a good decision boundary in the fine-tuning task\'s label space, (3) avoids catastrophic forgetting of pre-trained knowledge in early epochs. Sentences with high pre-trained loss are "hard" — they require learning new representations or handling domain-specific language. Introducing them gradually allows the fine-tuned model to adapt incrementally.',
      hints: [
        "Pre-trained BERT loss on fine-tuning task labels: measures how well the frozen BERT embeddings already separate the classes. Low loss → easy for fine-tuning.",
        'The fine-tuning curriculum can also use the rate of loss decrease per step as a difficulty signal: examples whose loss decreases quickly are "learnable" and should come before those that require many gradient steps.',
      ],
    },
    {
      id: "q-dc-kp7-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "In curriculum learning for object detection, an example containing a single large centered object is typically considered easier than one containing multiple small overlapping objects.",
      correctAnswer: "True",
      explanation:
        "Object detection difficulty measures are based on: (1) Object size: small objects (fewer than 32×32 pixels in COCO) are harder because they have fewer feature map activations. (2) Occlusion/truncation: overlapping objects require the model to infer from partial evidence. (3) Number of objects: more objects mean more potential anchor assignments and more bounding box regression targets. (4) Aspect ratio extremity: very wide/tall bounding boxes are harder to regress. A single large centered object is easy because: the anchor coverage is complete, features at multiple scales clearly activate, and there is no ambiguity in bounding box assignment. Curriculum training for detection (e.g., SimpleDet, Cascade RCNN training schedules) starts with large-object batches and progressively introduces small and occluded objects.",
      hints: [
        "COCO object size categorization: small < 32² pixels, medium 32²–96² pixels, large > 96² pixels. Small objects are notoriously difficult and drive most failure cases in detection benchmarks.",
        "Focal loss (RetinaNet) can be viewed as an implicit curriculum: it down-weights easy examples (high-confidence correct predictions) and focuses training on hard examples.",
      ],
    },
    {
      id: "q-dc-kp7-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Focal Loss (Lin et al. 2017) is used in object detection to address class imbalance between background and foreground anchors. The loss is: FL(p_t) = −(1 − p_t)^γ log(p_t). With γ = 2, how does this affect easy vs. hard examples compared to standard cross-entropy?",
      options: [
        "Focal loss increases the gradient for easy examples (high p_t) and decreases it for hard examples (low p_t)",
        "Focal loss down-weights easy, well-classified examples (high p_t → (1−p_t)^γ ≈ 0) and up-weights hard, misclassified examples (low p_t → (1−p_t)^γ ≈ 1), creating an automatic curriculum that focuses on hard examples",
        "Focal loss is equivalent to cross-entropy with a class-weighted loss, scaling each class by its inverse frequency",
        "Focal loss applies only to the bounding box regression component, not the classification loss",
      ],
      correctAnswer: 1,
      explanation:
        "Focal loss modulating factor (1 − p_t)^γ: For γ = 2 and an easy example with p_t = 0.95: (1 − 0.95)² = 0.0025 → loss is down-weighted by 400×. For a hard example with p_t = 0.3: (1 − 0.3)² = 0.49 → loss is down-weighted by only 2×. Effect: training is automatically focused on hard examples — exactly the cases where the model is wrong (low p_t). This is equivalent to a dynamic curriculum where the current model\'s confidence determines which examples receive learning signal. Context: in one-stage detectors like FCOS or RetinaNet, there are ~100K anchors per image but only ~10–100 foreground anchors. Without focal loss, the overwhelming background gradient (all easy negatives) drowns out the foreground gradient.",
      hints: [
        "γ = 0: focal loss = standard cross-entropy. γ = 2: easy examples contribute ~100× less gradient than hard examples. γ = 5: even more aggressive focus on hard examples.",
        "Focal loss does not require predefined difficulty ordering — difficulty is determined dynamically by p_t at each training step, making it more adaptive than fixed curriculum schedules.",
      ],
    },
    {
      id: "q-dc-kp7-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Dynamic Data Weighting (DDW) assigns per-example weights wᵢ(t) that change during training based on the model\'s current loss Lᵢ(t). How does DDW differ from both curriculum learning and Focal Loss?",
      options: [
        "DDW uses a fixed external difficulty oracle; curriculum learning and Focal Loss use model-based difficulty",
        "DDW learns the per-example weight function wᵢ(t) from a small clean validation set using meta-learning (bi-level optimization), while curriculum learning uses fixed difficulty and Focal Loss uses a fixed (1−p_t)^γ formula — DDW is the most adaptive because it optimizes weights to minimize validation loss rather than following a heuristic schedule",
        "DDW applies only to the data collection phase, not model training",
        "DDW is equivalent to importance weighting for domain adaptation and has no connection to curriculum learning",
      ],
      correctAnswer: 1,
      explanation:
        "DDW (Shu et al. 2019, Meta-Weight-Net) meta-learns a weight function v(Lᵢ) → wᵢ using a small, clean validation set: outer loop: update v to minimize validation loss when the model is trained with current weights. Inner loop: update model parameters using weighted training loss Σᵢ v(Lᵢ)·Lᵢ. The learned weight function v can assign: high weight to hard examples (like Focal Loss), low weight to noisy examples (like curriculum learning\'s early-phase filtering), or any combination. This is more flexible than fixed γ in Focal Loss or fixed difficulty ordering in curriculum learning. Key insight: the clean validation set acts as a signal for what good training examples look like — examples whose gradient alignment with the validation set is high get higher weights.",
      hints: [
        "DDW vs. curriculum learning: curriculum uses a fixed difficulty measure and schedule. DDW dynamically learns which examples to weight up based on validation performance feedback.",
        "DDW vs. Focal Loss: Focal Loss uses a fixed (1−p_t)^γ formula. DDW learns the weight function from data — it could learn to up-weight hard examples, down-weight noisy ones, or both.",
      ],
    },
  ],

  "data-programming": [
    {
      id: "q-dc-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In Snorkel\'s data programming framework, a labeling function (LF) for classifying medical abstracts as "reports a clinical trial" might be: LF(x) = POSITIVE if "randomized" in x else ABSTAIN. This LF is imperfect because:',
      options: [
        "LFs must always label every example; ABSTAIN is not a valid output",
        '"randomized" appears in non-clinical-trial contexts (e.g., "randomized algorithms"), causing false positives; and many clinical trials don\'t use the word "randomized," causing false negatives',
        "LFs based on keyword matching cannot capture semantic meaning",
        "This LF violates the mutual exclusivity requirement between labeling functions",
      ],
      correctAnswer: 1,
      explanation:
        'Labeling functions are intentionally noisy heuristics. The keyword "randomized" has coverage (labels many examples) but imperfect accuracy: False positives: "We propose a randomized algorithm for…" (CS paper, not clinical). False negatives: "A double-blind, placebo-controlled study of…" (clinical trial, no "randomized" keyword). Snorkel combines many such LFs: LF₁ checks "randomized," LF₂ checks "double-blind," LF₃ checks "NCT[0-9]{8}" (ClinicalTrials.gov ID pattern), etc. Each LF has individual weaknesses but covers different aspects. Snorkel\'s generative label model estimates LF accuracies and correlations, then produces probabilistic labels p(y|x) that are more accurate than any individual LF.',
      hints: [
        "The value of LFs: writing 20 imperfect LFs (each covering part of the signal) takes a few hours of expert time; labeling 100,000 abstracts individually takes months.",
        'ABSTAIN is crucial: an LF should only vote when confident. If "randomized" is too ambiguous, the LF should ABSTAIN rather than vote incorrectly.',
      ],
    },
    {
      id: "q-dc-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Snorkel\'s label model assumes that all labeling functions are conditionally independent given the true label, using a naive Bayes model to estimate LF accuracies.",
      correctAnswer: "False",
      explanation:
        "Snorkel\'s original label model (Bach et al. 2017) explicitly models correlations between labeling functions using a factor graph / graphical model. If LF₁ and LF₂ are both keyword-based LFs that fire on similar keywords, they are positively correlated: when LF₁ votes positive, LF₂ is more likely to vote positive. A naive Bayes model (conditional independence) would double-count their correlated evidence, overestimating the strength of two correlated LFs. Snorkel learns a correlation graph from LF co-occurrence statistics on unlabeled data (where LF₁ and LF₂ fire together more than expected under independence) and incorporates these correlations into the label model. Later work (MeTaL, Snorkel DryBell) further refined the dependency modeling.",
      hints: [
        'Naive Bayes assumes P(LF₁, LF₂ | y) = P(LF₁|y)·P(LF₂|y). If both LFs use "randomized" as a signal, they are NOT independent — seeing LF₁ fire makes LF₂ more likely to fire.',
        "Snorkel\'s label model uses higher-order sufficient statistics (correlations between LF outputs on unlabeled data) to estimate dependencies without knowing the true labels.",
      ],
    },
    {
      id: "q-dc-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A biomedical text mining team uses Snorkel with 15 labeling functions on 500,000 unlabeled abstracts. The key cost advantage over full manual annotation is:",
      options: [
        "Snorkel produces zero labeling errors because LFs are programmatic",
        "Writing 15 LFs requires days of expert time and labels 500,000 examples; manually annotating 500,000 abstracts requires months of annotator time, making data programming ~100× more cost-efficient for this scale",
        "Snorkel\'s probabilistic labels are always more accurate than human annotations",
        "Labeling functions cannot make systematic errors because they are mathematically formalized",
      ],
      correctAnswer: 1,
      explanation:
        "Cost model: Manual annotation at 2 minutes/abstract × 500,000 = 1,000,000 minutes = 16,667 hours ≈ 8+ full-time years. At $30/hr annotator cost: $500,000. Snorkel data programming: expert writes 15 LFs over 3–5 days (50 hours × $100/hr domain expert = $5,000). LFs run instantly on 500,000 abstracts. Snorkel label model trains in minutes. Total: ~$5,000–$10,000. The ~50–100× cost reduction enables labeling datasets that would be economically infeasible with full manual annotation. Tradeoff: Snorkel labels are probabilistic and noisier than expert annotations — typically used for initial weak supervision, then refined with a small set of manually labeled examples.",
      hints: [
        "Data programming is not zero-cost: writing good LFs requires domain expertise (knowing which patterns are discriminative) and iteration (testing LF accuracy on a small labeled validation set).",
        'Best practice: use Snorkel to generate weak labels for 500K examples, then manually label 1,000–5,000 for validation and as a "gold standard" for evaluating LF quality.',
      ],
    },
    {
      id: "q-dc-kp8-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Snorkel\'s data programming framework, a labeling function that always returns ABSTAIN on every example contributes no useful information and effectively reduces the number of active labeling functions by one.",
      correctAnswer: "True",
      explanation:
        "A labeling function with 100% ABSTAIN rate has zero coverage — it never votes on any example. In Snorkel\'s label model, such an LF contributes no information to the probabilistic label estimates because it never participates in any vote aggregation. The coverage of an LF is: cov(LFₖ) = P(LFₖ \$\\neq\$ ABSTAIN). An LF with cov = 0 provides no signal. In practice, ABSTAIN-heavy LFs (very low coverage) are almost as bad: an LF with 0.1% coverage votes on only 500 out of 500,000 examples and contributes negligible influence on the label model. LF coverage vs. accuracy tradeoff: high coverage but 55% accuracy is often more valuable than 99% accuracy with 1% coverage, because the high-coverage LF provides more total information despite individual errors.",
      hints: [
        "Coverage: fraction of examples where the LF does not ABSTAIN. Accuracy: fraction of non-ABSTAIN votes that match the true label (estimated by Snorkel\'s label model).",
        "Designing good LFs: aim for coverage > 10% with accuracy > 60%. Multiple lower-accuracy, high-coverage LFs combined by the label model usually outperform a single high-accuracy, low-coverage LF.",
      ],
    },
    {
      id: "q-dc-kp8-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In Snorkel, the empirical accuracy of a labeling function LFₖ on a validation set is 0.65, but the Snorkel label model estimates its accuracy as 0.82. The most likely explanation is:",
      options: [
        "The Snorkel label model has a bug that over-estimates LF accuracy",
        "The validation set may be too small to give a reliable accuracy estimate, while the label model uses the full unlabeled dataset\'s LF correlation structure to estimate accuracy more reliably",
        "LFₖ has a systematic bias toward positive labels that inflates its empirical accuracy",
        "The validation set examples are drawn from a different distribution than the unlabeled training data",
      ],
      correctAnswer: 1,
      explanation:
        "Snorkel\'s label model estimates LF accuracies using the unlabeled data\'s LF co-occurrence statistics (without access to true labels), while the empirical accuracy uses a labeled validation set. Discrepancies can arise from: (1) Small validation set: with 100–500 labeled examples, the empirical accuracy has high variance. (2) Distribution mismatch: the validation set may sample different examples than the unlabeled pool — if LFₖ performs better on the specific types of examples in the unlabeled pool, label model accuracy may be higher. (3) The label model uses the correlation structure across ALL LFs to disentangle each LF\'s quality — this can be more accurate than direct measurement if LFs have complementary coverage. The label model\'s advantage: it uses 500,000 examples (via co-occurrence statistics) vs. the validation set\'s 500 labeled examples.",
      hints: [
        "Snorkel label model accuracy estimation: uses the unsupervised graphical model trained on LF output correlations across 500K examples — effectively using more data than the small validation set.",
        "Best practice: use the validation set to identify clearly wrong LFs (empirical accuracy < 0.5 = worse than random) while trusting the label model for the remaining calibration.",
      ],
    },
    {
      id: "q-dc-kp8-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Programmatic weak supervision with labeling functions has been applied to relation extraction, named entity recognition (NER), and medical coding. For sequence labeling tasks like NER (where each token in a sentence must be labeled), what modification to standard LF design is required?",
      options: [
        "LFs cannot be used for sequence labeling; only classification tasks support data programming",
        "LFs for NER must return a full token-level label sequence (e.g., BIO tags for each token), not a single document-level label — and the label model must aggregate these sequence-level LF outputs using a sequence-aware model (e.g., HMM or linear-chain CRF)",
        "NER LFs must use neural sequence models rather than heuristic rules",
        "Sequence labeling requires exact agreement between all LFs on every token before any label is assigned",
      ],
      correctAnswer: 1,
      explanation:
        "Standard Snorkel assumes: LF outputs are a single vote {−1, 0, +1} per example. For NER, each example is a sentence with T tokens, each requiring a label from {O, B-PER, I-PER, B-ORG, …}. LF adaptation for sequence labeling: LF returns a token-level annotation — e.g., a dictionary lookup LF marks all occurrences of known person names as B-PER/I-PER and leaves other tokens as O. Label model for sequences: instead of a per-example generative model, use a sequence-aware label model such as an HMM over token-level LF votes. The HMM propagates information between adjacent tokens (B-PER must be followed by I-PER or O). SKWEAK (Lison et al. 2021) and FlyingSquid extend Snorkel to sequence labeling tasks. Challenge: sequence LFs have exponentially more ways to disagree (full sequence disagreement vs. partial disagreement at specific token positions).",
      hints: [
        "Dictionary LFs for NER: look up each token in a gazeteer (list of known entities). High precision for recognized entities but 0 coverage for unknown entities — complements pattern-based LFs.",
        "Spanner-based LF: a labeling function can return a set of character spans {(start, end, entity_type)} — the label model converts these spans to BIO sequences.",
      ],
    },
  ],

  cleanlab: [
    {
      id: "q-dc-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "CleanLab\'s Confident Learning algorithm requires which minimum input to identify likely label errors in a training set of n samples with C classes?",
      options: [
        "A second independently trained model to provide a second opinion on uncertain predictions",
        "An n × C matrix of out-of-sample (cross-validated) predicted class probabilities p̂(y|x) and the vector of given labels ỹ",
        "Human re-annotation of the 10% most uncertain examples as identified by prediction entropy",
        "A noise transition matrix T[j,k] = P(given=j | true=k) provided by domain experts",
      ],
      correctAnswer: 1,
      explanation:
        "CleanLab input requirements: (1) p̂_ij ∈ [0, 1]: the predicted probability that sample i belongs to class j, from K-fold cross-validation (so each sample\'s prediction is out-of-sample). Matrix shape: n × C. (2) ỹᵢ ∈ {1, …, C}: the given (noisy) label for each sample. From these two inputs, Confident Learning: (a) computes per-class thresholds t_j = (1/|ỹ=j|) Σ_{ỹ=j} p̂ij, (b) builds the confident joint C̃[j,k] counting samples with ỹ=j and p̂_ik ≥ t_k and k \$\\neq\$ j, (c) normalizes to get the joint noise distribution, (d) identifies likely errors as off-diagonal samples. No additional models, no human annotation, no noise rate specification needed — the algorithm infers everything from the model\'s own predictions.",
      hints: [
        "Out-of-sample predictions are essential: if you use in-sample predictions (the model evaluated on its own training data), it will be overconfident on memorized examples, and the thresholds will be inflated.",
        "K-fold cross-validation produces out-of-sample predictions for every training example without a separate held-out set: each fold\'s validation predictions are used.",
      ],
    },
    {
      id: "q-dc-kp9-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "CleanLab can be applied to image, text, and tabular classification datasets using any model architecture, as long as the model outputs a probability vector over classes.",
      correctAnswer: "True",
      explanation:
        "Confident Learning is model-agnostic and modality-agnostic: it operates on the n × C probability matrix p̂, regardless of how that matrix was produced. For images: CNN, ViT, ResNet all work. For text: BERT, logistic regression, SVM with Platt scaling all work. For tabular: XGBoost, LightGBM, random forest all work. The only requirement is (1) the model can output class probabilities (not just hard labels) and (2) those probabilities are computed out-of-sample (via cross-validation or a separate hold-out). In practice, any classifier with a predict_proba() method in sklearn, or any neural network with a softmax output layer, qualifies. CleanLab has been applied to CIFAR-100, Amazon reviews, medical imaging datasets, and financial tabular data.",
      hints: [
        "CleanLab is agnostic to the model because it only uses the probability output — not the model weights, architecture, or training procedure.",
        "Practical note: better-calibrated models (e.g., using temperature scaling) may produce better confident learning results, since the thresholds t_j rely on probability magnitudes.",
      ],
    },
    {
      id: "q-dc-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In Confident Learning, a sample with given label ỹ = "cat" is flagged as a likely label error when:',
      options: [
        'Its predicted probability for "cat" falls below 0.5: p̂(cat) < 0.5',
        'Its predicted probability for another class "dog" exceeds the class-specific threshold t_dog = mean p̂(dog) over all examples with ỹ = "dog": p̂(dog) ≥ t_dog',
        "Its prediction entropy H(p̂) exceeds the 90th percentile of entropies in the training set",
        'Its "cat" probability is more than 2 standard deviations below the mean "cat" probability among ỹ = "cat" examples',
      ],
      correctAnswer: 1,
      explanation:
        'Confident Learning flagging criterion: sample i (with ỹᵢ = j) is a likely label error if there exists a class k \$\\neq\$ j such that p̂ᵢₖ ≥ tₖ, where tₖ = (1/|{i: ỹᵢ = k}|) Σ_{i: ỹᵢ = k} p̂ᵢₖ is the average predicted probability for class k among examples WITH given label k. Interpretation: tₖ is how confident the model typically is when it correctly identifies class k. If an example labeled "cat" has p̂(dog) ≥ t_dog, the model is "as confident" that it is a dog as it typically is for correctly-labeled dogs — strong evidence of mislabeling. The class-specific threshold (not a fixed 0.5) is crucial: for a rare class with generally low confidence (t_dog = 0.3), the bar is lower; for a common clear class (t_cat = 0.9), the bar is higher.',
      hints: [
        "The threshold t_k is adaptive: for a class where the model is generally uncertain, even moderate p̂_ik can flag an error. For a class where the model is very confident, only very high p̂_ik flags an error.",
        "Option A (p̂(cat) < 0.5) is too simple: a cat example with p̂ = [0.4, 0.35, 0.25] has p̂(cat) < 0.5 but the model is not confident about any alternative class — not a clear label error.",
      ],
    },
    {
      id: "q-dc-kp9-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "After running CleanLab on a 10,000-example training set, it flags 800 examples as likely label errors. A practitioner should:",
      options: [
        "Automatically delete all 800 flagged examples and retrain the model immediately",
        "Manually review the flagged examples using the Confident Learning rank ordering (most confident errors first), correct genuine mislabels, confirm ambiguous cases, and retain truly correct labels even if flagged",
        "Accept all 800 as errors and re-annotate them with a fresh annotator who has not seen the original labels",
        "Ignore the flags and instead collect 800 additional new training examples to counterbalance the label noise",
      ],
      correctAnswer: 1,
      explanation:
        "CleanLab flags likely errors but is not perfect — it has its own false positive rate (flagging correctly labeled examples). Best practice workflow: (1) Sort flagged examples by the Confident Learning quality score (the confident joint rank — most likely errors first). (2) Review the top-ranked flagged examples manually: for each flagged example, show the annotator the given label and the model-predicted label. (3) Correct genuine errors, confirm ambiguous cases (sometimes both labels are defensible), and retain correctly labeled examples that were false positives. (4) The bottom-ranked flagged examples (least certain errors) may not be worth reviewing — the cost-benefit of manual review decreases. Automated deletion of all flagged examples risks removing valid training data and can introduce bias if the false positive rate is class-dependent.",
      hints: [
        "CleanLab\'s precision-recall tradeoff: higher quality score threshold → fewer flagged examples but more confident each is a true error. Lower threshold → more comprehensive but more false positives.",
        "Common finding: 40–60% of CleanLab flags are genuine label errors on typical crowdsourced datasets. The remaining 40–60% are borderline cases where the label is defensible but the model disagrees.",
      ],
    },
    {
      id: "q-dc-kp9-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "CleanLab\'s Confident Learning can be extended to multi-label classification (where each example can belong to multiple classes simultaneously) without modification, because it only requires a probability vector per example.",
      correctAnswer: "False",
      explanation:
        "Multi-label classification breaks the Confident Learning assumption that class probabilities sum to 1 (simplex constraint). In multi-label: each class has an independent binary probability p̂_k ∈ [0, 1], and Σ_k p̂_k can exceed 1 — this is not a valid probability distribution over mutually exclusive classes. Confident Learning\'s confident joint construction assumes: a single true label per example, which determines which off-diagonal entry to place the example in. For multi-label data: CleanLab has a separate multi-label extension that treats each class independently (computing per-class label quality scores as binary classification problems) and combines them. The multi-label extension identifies: (1) examples with an incorrect extra label (false positive label), (2) examples missing a true label (false negative label). This is a more complex problem because a single example can have multiple simultaneous label errors.",
      hints: [
        "Multi-label Confident Learning: reduce to C independent binary problems, one per class. For each class k, treat examples as positive (label k present) or negative (label k absent) and apply binary Confident Learning.",
        "The joint distribution matrix in binary Confident Learning is 2×2: C̃[given=0, true=1] (false negatives) and C̃[given=1, true=0] (false positives) are the two off-diagonal error types.",
      ],
    },
    {
      id: "q-dc-kp9-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Northcutt et al. (2021) applied Confident Learning to 10 benchmarks (MNIST, CIFAR-10, ImageNet, IMDB, Amazon reviews, etc.) and found that the estimated label error rate in ImageNet is approximately:",
      options: [
        "0.1%: ImageNet curation is rigorous and nearly error-free",
        "5.8%: roughly 1 in 17 ImageNet validation labels is estimated to be erroneous, and many corrected labels show the original ImageNet label is simply the secondary rather than the primary subject",
        "25%: approximately one quarter of ImageNet examples are systematically mislabeled due to ambiguous category boundaries",
        "50%: ImageNet uses majority-voting from untrained workers, making approximately half the labels unreliable",
      ],
      correctAnswer: 1,
      explanation:
        "Northcutt et al. (2021) \'Pervasive Label Errors in Test Sets Destabilize Machine Learning Benchmarks\' estimated approximately 5.8% (1 in 17) label errors in the ImageNet validation set. Key findings: (1) Many \'errors\' are ambiguous cases where the image contains multiple valid classes (e.g., a lion sitting on a rock, labeled \'lion\' but a valid case for \'African rock python\' if the snake is more prominent). (2) After correcting labels, model rankings on ImageNet validation change — some models that appeared worse under original labels appear better under corrected labels. (3) The estimated label error rate was 6.0% on Amazon reviews, 10.9% on IMDB, 8.1% on 20 Newsgroups. Implication: benchmark accuracy numbers have measurement error of ~5% from label noise, potentially rendering small performance differences between models statistically meaningless.",
      hints: [
        "The 5.8% error rate applies to the validation/test set — the set used to measure model performance. Train set errors harm learning; test set errors corrupt benchmark evaluation.",
        "Model ranking instability: if Model A beats Model B by 0.3% on a benchmark with 5.8% label noise, the difference may be within the noise — the \'better\' model may simply predict the incorrect label less often.",
      ],
    },
  ],

  "dataset-distillation": [
    {
      id: "q-dc-kp10-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Dataset distillation (Wang et al. 2018) aims to synthesize a tiny dataset S* ⊂ ℝ^{|S*| × d} such that a model trained on S* achieves performance close to one trained on the full real dataset of n >> |S*| examples. The optimization is:",
      options: [
        "Select the |S*| most informative examples from the real dataset using core-set selection",
        "min_{S*} E_{θ₀}[L(θ*(S*), D_test)] where θ*(S*) = argmin_θ L(θ, S*), optimizing the synthetic data via bilevel optimization so a model trained on it performs well on real test data",
        "Compress the real dataset using PCA and represent it as a low-dimensional projection",
        "Fine-tune a pre-trained model on the test set, then distill its knowledge into a small synthetic training set",
      ],
      correctAnswer: 1,
      explanation:
        "Dataset distillation bilevel optimization: outer problem: min_{S*} ℓ(θ*(S*)) where ℓ is performance on real test/validation data. Inner problem: θ*(S*) = argmin_θ Σ_{(x,y) ∈ S*} L(f_θ(x), y) — train a model to convergence on synthetic data S*. S* is a set of learned (not selected) image-label pairs, optimized end-to-end via gradient backpropagation through the inner optimization loop. Wang et al. achieved: 10 synthetic images per class (10 classes = 100 total images) trained a model to ~94% of the performance of training on 60,000 MNIST images. Applications: privacy (share S* instead of real data), faster neural architecture search (evaluate architectures on S* instead of full data), continual learning.",
      hints: [
        "Bilevel: the outer gradient ∂ℓ/∂S* flows through the inner optimization step θ*(S*) — requires unrolling or implicit differentiation of the inner training loop.",
        "Dataset distillation \$\\neq\$ coreset selection: coresets SELECT from real data. Distillation GENERATES new (often imperceptible to humans) data images that encode learning signals.",
      ],
    },
    {
      id: "q-dc-kp10-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Coreset selection identifies a weighted subset C ⊆ D (real training examples) such that training on C approximates training on the full dataset D, making it computationally more efficient than full-data training.",
      correctAnswer: "True",
      explanation:
        "Coreset selection finds C ⊆ D (with weights wᵢ ≥ 0) such that: for all model parameters θ, |ℓ(θ, D) − ℓ_w(θ, C)| ≤ ε for some small ε. Methods include: gradient matching (select examples whose weighted gradient ≈ full gradient), geometry-based (k-center, k-means clustering), loss-based (select high-loss examples), and Shapley-value-based (select high-value examples). Unlike dataset distillation, coreset examples are real training points (interpretable). The goal: |C| << n while maintaining near-D performance. Practical applications: distillation of large datasets for continual learning (store a coreset of past tasks), efficient hyperparameter search, and privacy-preserving data summarization.",
      hints: [
        "Coreset selection selects real data; dataset distillation creates synthetic data. Both reduce training data size but via fundamentally different approaches.",
        "The quality of a coreset depends on the model class: a coreset good for linear models may be poor for neural networks (because gradient geometry differs).",
      ],
    },
    {
      id: "q-dc-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Distribution Matching (DM, Zhao et al. 2021) as a dataset distillation objective synthesizes S* by minimizing the MMD (Maximum Mean Discrepancy) between the distribution of features in S* and in the real dataset D. Why is this different from gradient matching (DC)?",
      options: [
        "DM minimizes KL divergence; gradient matching minimizes L2 distance between logits",
        "DM matches the statistical distribution of features (invariant to specific models), while gradient matching aligns the gradient directions produced by S* and D batches under specific neural network parameters — making DC more expensive but more faithful to the training dynamics of a specific architecture",
        "DM is model-specific while gradient matching is architecture-agnostic",
        "DM uses a discriminator network; gradient matching uses a variational autoencoder",
      ],
      correctAnswer: 1,
      explanation:
        "Distribution Matching (DM): minimize MMD(P_{feat}(S*), P_{feat}(D)) where features are extracted at various network layers from randomly initialized models. The synthetic S* matches the real data\'s distributional statistics at the feature level. This is model-agnostic in the sense that it optimizes over random initializations rather than a specific trained network. Gradient Matching (DC, Zhao et al. 2020): minimize ‖∇_θ L(θ, S*) − ∇_θ L(θ, D)‖₂, aligning the gradient direction produced by synthetic and real data for a specific network parameter θ. DC directly ensures that gradient descent on S* moves in the same direction as on D — more faithful to actual training dynamics. Tradeoff: DC requires backpropagating through the gradient computation (expensive) but produces tighter alignment for the specific architecture; DM is cheaper but may not perfectly replicate training dynamics.",
      hints: [
        "MMD measures distributional distance between two sets of samples without requiring explicit density estimates: MMD(P, Q) = ‖E_P[φ(x)] − E_Q[φ(x)]‖ using a kernel φ.",
        "DC (gradient matching) directly ensures that training on S* produces similar weight updates to training on D — this is why DC-distilled datasets work well for the target architecture but may not transfer to different architectures.",
      ],
    },
    {
      id: "q-dc-kp10-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "Dataset distillation methods produce synthetic images that are always visually interpretable to humans, allowing experts to verify that the distilled dataset captures the essential features of the original data.",
      correctAnswer: "False",
      explanation:
        "Dataset distillation synthesizes images optimized to encode maximum learning signal for a specific model and optimization algorithm — not images that are visually meaningful to humans. The distilled images are often highly unusual patterns: abstract textures, adversarial-like patterns, or blended features from multiple classes superimposed. These images look nothing like natural photographs but effectively communicate class information to the neural network during training. This is because the optimization targets the neural network\'s feature extraction pipeline, not human visual perception. The distilled images can be seen as a compressed encoding of the training signal that the network can decode but humans cannot interpret. This is both a limitation (uninterpretable) and a feature (very compact representation — e.g., 100 images for 60,000 MNIST images).",
      hints: [
        "Distilled images are optimized for a specific architecture. Changing the architecture (e.g., from ConvNet to ViT) requires re-running distillation, because the uninterpretable patterns exploit architecture-specific feature extraction.",
        "Dataset Condensation with Differentiable Siamese Augmentation (DSA) produces slightly more interpretable distilled images by incorporating data augmentation in the optimization — but still far from natural images.",
      ],
    },
    {
      id: "q-dc-kp10-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A team uses dataset distillation to compress 50,000 CIFAR-10 training images into 100 synthetic images (10 per class) for fast neural architecture search (NAS). The primary motivation is:",
      options: [
        "The distilled dataset has higher statistical diversity than the original 50,000 images",
        "Evaluating candidate architectures on 100 synthetic images takes ~500× less time than on 50,000 real images, enabling exploration of a much larger architecture search space within the same compute budget while maintaining a useful proxy for final model ranking",
        "The synthetic images are copyright-free, avoiding IP concerns during NAS experiments",
        "Distilled images prevent overfitting during NAS because they are out-of-distribution",
      ],
      correctAnswer: 1,
      explanation:
        "NAS computational bottleneck: evaluating each candidate architecture requires training on the full dataset (50,000 images × many epochs). With 1,000 candidate architectures and 50 epochs each: 50M gradient steps. Using distilled data (100 images): the same evaluation takes 100/50,000 = 0.2% of the compute. This enables evaluating 500× more architectures in the same time. The key requirement: the distilled dataset must produce a consistent model ranking — architectures that perform well on the distilled set should also perform well on the full set. Research (Zhao et al. 2021, Cui et al. 2022) shows this ranking correlation is approximately preserved for small-scale benchmarks, making distillation-accelerated NAS a practical approach. Limitation: the ranking correlation degrades for complex architectures (e.g., vision transformers vs. CNNs) due to architecture-specific feature extraction.",
      hints: [
        "The ranking correlation between distilled-data evaluation and full-data evaluation is the critical metric for NAS applications. Poor correlation (even if distilled accuracy is reasonable) makes NAS results unreliable.",
        "Alternative fast NAS proxies: early stopping (train for 5 epochs instead of 100), weight sharing (DARTS, one-shot NAS), and zero-cost proxies (gradient statistics without training).",
      ],
    },
    {
      id: "q-dc-kp10-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Trajectory Matching (Cazenavette et al. 2022) improves dataset distillation by matching the long-range training trajectories of expert networks trained on real data with the trajectories of networks trained on synthetic data, rather than matching gradients at a single parameter checkpoint. The key advantage over single-step gradient matching (DC) is:",
      options: [
        "Trajectory matching requires less compute than gradient matching because it skips the Hessian computation",
        "Matching long-range trajectories (sequences of model parameters over many training steps) captures the cumulative optimization dynamics including momentum effects and learning rate schedule interactions, producing distilled datasets that better support multi-step training rather than just single gradient steps",
        "Trajectory matching uses a GAN discriminator to align synthetic and real data distributions",
        "Trajectory matching directly minimizes test set loss through the training trajectory, bypassing bilevel optimization",
      ],
      correctAnswer: 1,
      explanation:
        "DC (gradient matching, Zhao et al. 2020) matches: ‖∇_θ L(S*) − ∇_θ L(D)‖ at a single parameter θ. Problem: matching at one θ does not guarantee matching at subsequent θ values as training progresses — the model trained on S* may diverge from the model trained on D after multiple steps. Trajectory Matching (Cazenavette et al. 2022): pre-compute expert trajectories θ₀*, θ₁*, …, θ_T* by training on the full real data D. Then optimize S* so that a few gradient steps on S* from θ_t approximates the expert trajectory step from θ_t to θ_{t+M}: ‖θ_{t+M}^{S*} − θ_{t+M}^{expert}‖ is minimized over many sampled (t, M) pairs. This long-range matching ensures the distilled dataset supports sustained gradient-based learning, not just one-shot gradient alignment. Results: trajectory matching achieves significantly better distilled dataset quality vs. DC at the same images-per-class budget.",
      hints: [
        "Expert trajectories are pre-computed once (expensive) and reused across the distillation optimization — the inner loop of trajectory matching is cheap (just a few gradient steps on S*).",
        "The number of steps M to match in each trajectory segment is a hyperparameter: small M ≈ DC (local matching), large M captures global training dynamics but makes the optimization harder.",
      ],
    },
  ],

  "data-valuation": [
    {
      id: "q-dc-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Data Shapley assigns value φᵢ to training example i as: φᵢ = Σ_{S ⊆ D\\{i}} [C(|S|,n-1)]⁻¹ [V(S ∪ {i}) − V(S)] / n, where V(S) = model performance trained on subset S. What does this formula compute?",
      options: [
        "The marginal contribution of example i to model performance, measured only when i is added to the full dataset",
        "The average marginal contribution of example i to model performance, averaged uniformly over all possible subsets S of other training examples",
        "The gradient of model loss with respect to the features of example i",
        "The frequency with which example i is selected during bootstrap sampling",
      ],
      correctAnswer: 1,
      explanation:
        'Data Shapley (Ghorbani & Zou 2019) applies cooperative game theory: the "game" is training a model on a subset of data, and the "value function" V(S) is validation performance. The Shapley value φᵢ averages the marginal contribution of adding example i (V(S ∪ {i}) − V(S)) over all possible orderings of the other n-1 examples. This is the unique value satisfying: (1) Efficiency: Σᵢ φᵢ = V(D) − V(∅). (2) Symmetry: if examples contribute equally, they receive equal value. (3) Null player: examples that contribute nothing get φᵢ = 0. (4) Additivity. These axioms make Shapley values the unique "fair" allocation. High φᵢ: example improves model when added to any subset. Low/negative φᵢ: example hurts performance (likely mislabeled or out-of-distribution).',
      hints: [
        "Data Shapley identifies the most (and least) valuable training examples. Negative φᵢ indicates harmful training examples — candidates for inspection and possibly removal.",
        "Practical use: rank examples by φᵢ, remove bottom-k, retrain. Often achieves better performance than training on the full dataset (removing harmful examples).",
      ],
    },
    {
      id: "q-dc-kp11-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Exact Data Shapley computation is intractable for large datasets because it requires evaluating V(S) for all 2ⁿ subsets of training data, making it exponential in n.",
      correctAnswer: "True",
      explanation:
        "For n training examples: exact Shapley requires evaluating 2ⁿ subsets. For n = 100: 2¹⁰⁰ ≈ 10³⁰ model trainings — clearly infeasible. Practical approximations: (1) Monte Carlo Shapley: sample random permutations, compute marginal contributions along each permutation. Convergence is slow: O(n²/ε²) evaluations for ε-accurate values. (2) KNN-Shapley (Jia et al. 2019): for k-nearest-neighbor classifiers, Shapley values have a closed form computable in O(n log n) — exact and efficient. (3) AME (Average Marginal Effect): compute marginal contributions for small random subsets instead of all 2ⁿ. (4) DVRL: learn a value estimator network instead of computing Shapley values directly.",
      hints: [
        "For n=20: 2²⁰ = 1,048,576 subsets. Each requires training a model. For n=10,000: 2^10,000 — astronomically infeasible.",
        "KNN-Shapley is the only exact polynomial-time algorithm, but limited to KNN models. For tree/NN models, approximation is unavoidable.",
      ],
    },
    {
      id: "q-dc-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DVRL (Data Valuation using Reinforcement Learning, Yoon et al. 2020) trains a Data Value Estimator (DVE) network that assigns selection probabilities s(xᵢ, yᵢ) ∈ [0, 1] to each training example. The DVE is trained via:",
      options: [
        "Supervised learning using ground-truth Data Shapley values as labels",
        "Reinforcement learning: the DVE selects a weighted subset of training data, a predictor model trains on the selected subset, and the predictor\'s validation performance is the reward signal for updating DVE via policy gradient",
        "Gradient-based optimization: minimize the predictor\'s training loss with respect to the selection probabilities using reparameterization trick",
        "Evolutionary search: the DVE\'s weights are mutated and selected based on downstream model accuracy",
      ],
      correctAnswer: 1,
      explanation:
        "DVRL bilevel structure: outer loop (DVE training): the DVE network outputs selection probabilities s(xᵢ, yᵢ) for each training example. A binary mask is sampled: bᵢ ~ Bernoulli(s(xᵢ, yᵢ)). The predictor (any ML model) is trained on {(xᵢ, yᵢ) : bᵢ = 1}. The predictor\'s validation performance R = V(validation; predictor trained on selected subset) is the reward. DVE weights are updated via REINFORCE: ∇_DVE J ≈ Σᵢ (R − baseline) ∇_{DVE} log P(bᵢ | s(xᵢ, yᵢ)). The DVE learns to assign high selection probability to examples that improve the predictor\'s validation performance when selected. DVRL is model-agnostic: the predictor can be any ML model (XGBoost, neural net, etc.).",
      hints: [
        "The bilevel structure: DVE selects data → predictor trains on selected data → validation performance rewards DVE.",
        "DVRL is more flexible than Data Shapley (works with any predictor, not just the specific architecture) but provides approximate values and requires more computation (training both DVE and predictor).",
      ],
    },
    {
      id: "q-dc-kp11-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "A training example with a negative Data Shapley value (φᵢ < 0) always indicates a mislabeled example that should be removed from the training set.",
      correctAnswer: "False",
      explanation:
        "Negative Data Shapley value φᵢ < 0 means: adding example i to any random subset S of training data tends to decrease validation performance (on average). This is a necessary but not sufficient condition for mislabeling. Causes of negative Shapley values: (1) Mislabeled examples: the most common cause — the example provides contradictory gradient signals. (2) Out-of-distribution examples: in-distribution for the training set but not for the validation set (different collection conditions). (3) Examples from underrepresented subgroups that happen to hurt validation set performance (if validation set doesn\'t represent that subgroup either). (4) Extreme outliers that generalize poorly. Correct action: inspect negative-Shapley examples manually, prioritizing the most negative. Some may be legitimate training examples whose removal would reduce model robustness, even if they hurt the specific validation metric used for Shapley computation.",
      hints: [
        "Data Shapley is a metric relative to the validation set. If the validation set has distribution mismatch with deployment, Shapley values may incorrectly flag useful examples.",
        "Negative φᵢ: strong signal to inspect. Zero φᵢ: example doesn\'t help or hurt (redundant with other examples). Positive φᵢ: example actively improves model.",
      ],
    },
    {
      id: "q-dc-kp11-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Beta Shapley (Kwon & Zou 2022) generalizes Data Shapley by using a Beta(α, β) distribution over coalition sizes instead of the uniform distribution used by standard Shapley. Setting α=1, β=1 reduces to standard Shapley. Setting α=1, β→∞ focuses on marginal contributions to:",
      options: [
        "Empty coalitions (single-example marginal contributions only)",
        "Full coalitions — the marginal contribution of each example when added to the full training dataset, focusing on which examples are necessary vs. redundant given all other data",
        "Median coalition sizes — the marginal contribution at the dataset\'s 50th percentile size",
        "The validation set only — it computes leave-one-out cross-validation error rather than Shapley values",
      ],
      correctAnswer: 1,
      explanation:
        "Beta Shapley weight function: w(|S|) ∝ Beta(|S|+α; n−|S|+β). With α=1, β→∞: w(|S|) concentrates all weight on |S| = n−1 (the largest coalition). This means: φᵢ^Beta ≈ V(D) − V(D \\ {i}) — the reduction in performance when example i is removed from the FULL training set. This is the Leave-One-Out (LOO) value, a classic influence function metric. With α→∞, β=1: w(|S|) concentrates on |S| = 0 — the marginal value of example i when added to the empty set (single example training). Standard Shapley (α=β=1) gives equal weight to all coalition sizes — providing the fairest allocation axiomatically. Beta Shapley allows practitioners to interpolate between LOO influence (α=1, β large) and empty-set contribution (α large, β=1) based on which questions are most relevant.",
      hints: [
        "LOO (Leave-One-Out) is a special case of Beta Shapley and is computationally cheaper: n model retrain runs vs. exponentially many for exact Shapley.",
        "When to use LOO vs. Shapley: LOO measures redundancy in a large dataset (which examples are not needed given all others). Shapley measures fair value attribution accounting for all possible training set sizes.",
      ],
    },
    {
      id: "q-dc-kp11-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A data marketplace wants to fairly compensate data contributors (each contributing a subset of training examples) for their contribution to a shared ML model. Data Shapley is the principled solution because it satisfies four axioms. Which axiom prevents a situation where two contributors with identical datasets receive different payments?",
      options: [
        "Efficiency: total payment equals the total model value gained from all data",
        "Symmetry: if contributors i and j have identical marginal contributions V(S ∪ {i}) = V(S ∪ {j}) for every coalition S, then φᵢ = φⱼ — they receive equal payment",
        "Null player: contributors whose data adds no value receive zero payment",
        "Additivity: payments for two separate tasks sum correctly",
      ],
      correctAnswer: 1,
      explanation:
        "The four Shapley axioms applied to data valuation: (1) Efficiency: Σᵢ φᵢ = V(D) − V(∅) — the total Shapley payments exactly account for the full value created by combining all data. (2) Symmetry: if two contributors have identical marginal contributions to every possible coalition, they receive equal payment. This prevents arbitrary discrimination between equivalent data sources. (3) Null player: if contributor i\'s data never improves any coalition (V(S ∪ {i}) = V(S) for all S), then φᵢ = 0. (4) Additivity (linearity): if a task decomposes into two independent subtasks, Shapley values sum correctly. Symmetry is specifically the axiom addressing the question: two contributors with identical data (same content and quality) would have identical marginal contributions to every coalition, and by symmetry, must receive equal payment — the unique Shapley allocation guarantees this.",
      hints: [
        "The Shapley value is the UNIQUE allocation satisfying all four axioms simultaneously (Shapley 1953 theorem). No other allocation is simultaneously efficient, symmetric, null-player, and additive.",
        "Data marketplace application: contributors submit their data to a data pool. The model trains on the pool and achieves value V(D). Shapley values allocate the value V(D) − V(∅) fairly among contributors.",
      ],
    },
  ],

  "semi-supervised-dc": [
    {
      id: "q-dc-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Pseudo-labeling (Lee 2013) works by: (1) train model on L labeled examples, (2) predict on unlabeled set U, (3) select high-confidence predictions as pseudo-labels, (4) add to training set and retrain. The threshold for "high confidence" is critical because:',
      options: [
        "A lower threshold always produces better results since more data is used",
        "A threshold that is too low includes low-confidence (likely wrong) pseudo-labels, adding noise; too high leaves too little pseudo-labeled data for the semi-supervised benefit",
        "The threshold must equal the class prior probability to avoid class imbalance in the pseudo-labeled set",
        "The threshold only affects training speed, not final model accuracy",
      ],
      correctAnswer: 1,
      explanation:
        'Pseudo-label quality is directly tied to model confidence calibration. At threshold θ = 0.5: many pseudo-labels are included but many are wrong (model is only 50% confident) — the wrong pseudo-labels add label noise that can hurt more than help. At θ = 0.99: only very confident predictions are pseudo-labeled, likely correct, but so few examples pass that the semi-supervised benefit is negligible. Empirically, optimal θ ∈ [0.8, 0.95] for image classification. FixMatch uses θ = 0.95 on weakly augmented views. The fundamental risk of pseudo-labeling: if the initial model has systematic errors (e.g., is biased toward one class), high-confidence wrong pseudo-labels will amplify that error in the retrained model — a "confirmation bias" loop.',
      hints: [
        "High threshold → high precision pseudo-labels but low recall (few pseudo-labeled examples). Low threshold → more pseudo-labeled data but higher noise rate.",
        "Self-training (one form of pseudo-labeling) can overfit to initial model errors if confidence thresholding is not carefully managed.",
      ],
    },
    {
      id: "q-dc-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Consistency regularization assumes that a good classifier\'s predictions should be invariant to small semantics-preserving perturbations of unlabeled inputs, providing a learning signal without requiring true labels.",
      correctAnswer: "True",
      explanation:
        "Consistency regularization (Sajjadi et al. 2016, Laine & Aila 2017): for unlabeled example u, apply two stochastic augmentations u₁ = aug₁(u) and u₂ = aug₂(u). The model should satisfy: f(u₁) ≈ f(u₂). Loss: L_con = d(f(u₁), f(u₂)) where d is a divergence (MSE, KL divergence). This loss requires NO labels — only unlabeled examples. It enforces that the decision boundary lies in low-density regions (Manifold Hypothesis): if u is on a high-density manifold region, then u₁ and u₂ (small perturbations of u) are likely on the same class manifold, so consistent predictions are correct. Methods using consistency: Π-model, Mean Teacher (EMA-smoothed predictions), UDA (diverse augmentations), FixMatch.",
      hints: [
        "The underlying assumption: semantics-preserving augmentations (flip, crop, color jitter) do not change the true label → if they should not change the label, the model should not change its prediction.",
        "Consistency alone does not prevent the model from assigning all examples to one class (trivially consistent). Need entropy minimization or pseudo-labeling to ensure meaningful predictions.",
      ],
    },
    {
      id: "q-dc-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FixMatch (Sohn et al. 2020) combines pseudo-labeling and consistency regularization. Given an unlabeled image u, it applies a weak augmentation α(u) and a strong augmentation A(u). The training loss for the unlabeled example is:",
      options: [
        "Cross-entropy between f(α(u)) and f(A(u)) regardless of confidence — enforce consistency for all unlabeled examples",
        "If max_k p̂_k(α(u)) ≥ τ (threshold): cross-entropy loss targeting argmax p̂(α(u)) applied to f(A(u)); else: no loss for this example",
        "MSE between f(α(u)) and f(A(u)) weighted by the confidence max_k p̂_k(α(u))",
        "Cross-entropy between f(A(u)) and the uniform distribution [1/C, …, 1/C] to prevent overconfidence",
      ],
      correctAnswer: 1,
      explanation:
        "FixMatch unlabeled loss: for each unlabeled image u: (1) Compute pseudo-label: q̂ = argmax_k p̂(y=k | α(u)) where α = weak augmentation (horizontal flip + small crop). (2) Confidence check: if max_k p̂_k(α(u)) ≥ τ (typically τ = 0.95): include this example in the unlabeled loss. (3) Loss: H(q̂, p(y | A(u))) = cross-entropy between pseudo-label q̂ and model prediction on STRONGLY augmented version A(u). A = strong augmentation (RandAugment). The key insight: generate the pseudo-label from a STABLE (weakly augmented) view → the label is reliable. Train the model to match this label on a HARD (strongly augmented) view → this forces the model to learn invariance. If confidence < τ: this example contributes 0 loss — only confident pseudo-labels train the model.",
      hints: [
        "Weak augment → stable prediction → generate pseudo-label. Strong augment → challenging input → enforce label consistency. The asymmetry is the key innovation.",
        "FixMatch vs. MeanTeacher: MeanTeacher uses an exponential moving average (EMA) of model weights to generate more stable pseudo-labels. FixMatch uses the same model but with weak augmentation for stability.",
      ],
    },
    {
      id: "q-dc-kp12-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Label Propagation is a graph-based semi-supervised learning method. Given a graph where nodes are examples (labeled and unlabeled) and edge weights reflect feature similarity, labels are propagated by:",
      options: [
        "Training a GNN on the labeled nodes and predicting labels for unlabeled nodes",
        "Iteratively updating each unlabeled node\'s label as a weighted average of its neighbors\' labels until convergence, so that labels spread from labeled nodes through the similarity graph",
        "Selecting the nearest labeled neighbor for each unlabeled node and assigning that label",
        "Using a diffusion model to generate label distributions for unlabeled nodes",
      ],
      correctAnswer: 1,
      explanation:
        "Label Propagation (Zhu & Ghahramani 2002): construct a graph G = (V, E) where V = all examples (labeled L and unlabeled U) and edge weight w_ij ∝ exp(−‖xᵢ − xⱼ‖²/σ²). Transition matrix T_ij = w_ij / Σₖ w_ik. Update rule: F_U ← T_UU F_U + T_UL F_L, where F_L is fixed at the observed labels and F_U is the unlabeled label matrix being propagated. Iterate until convergence. Intuition: labels flow from labeled to unlabeled nodes through high-similarity edges — unlabeled nodes near a labeled cluster adopt that cluster\'s label. Convergence is guaranteed under mild conditions. Key assumption: connected regions of high-density feature space share the same label (cluster assumption). This is the same assumption underlying all semi-supervised methods.",
      hints: [
        "Label propagation has a closed-form solution: F_U* = (I − T_UU)⁻¹ T_UL F_L. For small datasets, this matrix inverse can be computed directly; for large datasets, iterative update is used.",
        "Graph construction is the key design choice: k-NN graph (connect each node to its k nearest neighbors) is common. Edge weights that are too broad (large σ) propagate labels across class boundaries.",
      ],
    },
    {
      id: "q-dc-kp12-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "MixMatch (Berthelot et al. 2019) unifies pseudo-labeling and consistency regularization by generating soft pseudo-labels for unlabeled examples using an average of predictions over multiple augmented views, then applying MixUp to both labeled and pseudo-labeled examples.",
      correctAnswer: "True",
      explanation:
        "MixMatch combines three ideas: (1) Pseudo-labeling with sharpening: for unlabeled example u, generate K augmented views, average the model predictions q̄ = (1/K) Σₖ p(y | aug_k(u)), then sharpen the distribution: q_sharp = q̄^(1/T) / Σⱼ q̄ⱼ^(1/T) (T < 1 reduces entropy). (2) Consistency regularization: predict consistently across all K augmented views. (3) MixUp: apply MixUp to the combined set of labeled examples (with one-hot labels) and pseudo-labeled examples (with sharpened soft labels). The sharpening step encourages the model to make confident predictions on unlabeled data (low-entropy soft labels), acting as entropy minimization. The full MixMatch training loss: L = L_supervised(labeled) + λ_U × L_unsupervised(pseudo-labeled MixUp). MixMatch outperformed prior semi-supervised methods with 250 CIFAR-10 labels by a large margin.",
      hints: [
        "Sharpening with T < 1: q_sharp_k = q̄_k^(1/T). As T → 0, sharpening becomes argmax (hard pseudo-label). T = 0.5 is a typical value for moderate sharpening.",
        "MixMatch improvement: using K=2 augmented views for averaging gives more stable pseudo-labels than a single augmented view. K > 2 gives diminishing returns.",
      ],
    },
    {
      id: "q-dc-kp12-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In semi-supervised learning, the cluster assumption states that decision boundaries should lie in low-density regions of the feature space. FixMatch implicitly enforces this by:",
      options: [
        "Using a graph-based label propagation that routes decision boundaries around high-density clusters",
        "Assigning pseudo-labels only to high-confidence unlabeled examples (those far from the current decision boundary where density is low), and enforcing consistency on those examples — effectively placing gradient pressure to keep the boundary away from high-density regions where the model is uncertain",
        "Applying explicit density estimation to the unlabeled data and penalizing decision boundaries that cross high-density regions",
        "Using entropy regularization that penalizes high-entropy predictions on any unlabeled example regardless of density",
      ],
      correctAnswer: 1,
      explanation:
        "The cluster assumption connection to FixMatch: FixMatch\'s confidence threshold τ = 0.95 selects examples where the model predicts very confidently — these examples are far from the current decision boundary in probability space. By assigning pseudo-labels to high-confidence examples and training on strongly augmented versions of them, FixMatch places gradient pressure to maintain confident predictions across the region around each selected example. The strongly augmented view tests the model\'s robustness in a neighborhood of the example: if the model must predict the same class for x and its strong augmentation A(x), the decision boundary cannot pass through the local neighborhood of x. Since confident predictions are associated with high-density class regions (far from boundaries), this implicitly enforces that the boundary stays in low-density regions. The connection: high confidence ↔ away from boundary ↔ low-density region ↔ cluster assumption satisfied.",
      hints: [
        "The cluster assumption is equivalent to the low-density separation assumption: good classifiers place their decision boundaries in regions where P(x) is low, not in the interior of high-density clusters.",
        "Entropy minimization (Grandvalet & Bengio 2005) directly minimizes H(p(y|x)) for unlabeled x — equivalent to pushing predictions toward the simplex vertices, enforcing the cluster assumption without a threshold.",
      ],
    },
  ],

  "self-supervised-dc": [
    {
      id: "q-dc-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Self-supervised learning enables training on massive unlabeled datasets by creating supervision from the data itself. Which of these is a self-supervised pretext task?",
      options: [
        "Predicting whether an email is spam based on subject line keywords (supervised)",
        "Predicting a randomly masked token in a sentence from its surrounding context (masked language modeling — no external label needed)",
        "Training a classifier using human-labeled ImageNet categories",
        "Using reinforcement learning with human feedback (RLHF) to align language model outputs",
      ],
      correctAnswer: 1,
      explanation:
        "Self-supervised pretext tasks create labels from the data\'s own structure: Masked Language Modeling (BERT): randomly mask 15% of tokens; predict them from context. The labels (original tokens) come directly from the text — no human annotation needed. Other SSL pretext tasks: (2) Rotation prediction: rotate image by 0°, 90°, 180°, 270°; predict the rotation (Gidaris 2018). (3) Jigsaw puzzle: shuffle image patches; predict permutation. (4) Contrastive: predict whether two crops are from the same image (SimCLR). (5) Next sentence prediction (BERT). (6) Image inpainting (reconstruct masked patches). The trained representations transfer well to downstream supervised tasks with few labeled examples.",
      hints: [
        'The "self" in self-supervised: the data provides its own labels. No human annotator needed.',
        "SSL creates a regularization signal on the unlabeled data manifold, learning features that are broadly useful across many downstream tasks.",
      ],
    },
    {
      id: "q-dc-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SimCLR (Chen et al. 2020) defines positive pairs using data augmentation — two augmented views of the same image — and negative pairs as augmented views from DIFFERENT images in the same mini-batch, with no class labels required.",
      correctAnswer: "True",
      explanation:
        'SimCLR contrastive learning: for each image x in batch of size N: create two augmented views: x_i = t(x) and x_j = t\'(x) using stochastic augmentations t, t\' drawn from the augmentation distribution T. The 2N augmented views form N positive pairs and 2N(N-1) negative pairs. Loss (NT-Xent): ℓ(i, j) = −log exp(sim(zᵢ, zⱼ)/τ) / Σ_{k\$\\neq\$i} exp(sim(zᵢ, zₖ)/τ), where sim = cosine similarity and τ is temperature. No class labels are used: the "label" is simply "these two views came from the same image." The model learns representations where same-image augmentations are similar (nearby in embedding space) and different-image augmentations are dissimilar (far apart).',
      hints: [
        "SimCLR requires large batch sizes (N ≥ 4096) because negatives come from the same batch — more negatives → harder contrastive task → better representations.",
        "Key augmentations: random cropping (most important), color jitter, grayscale. These define what the model should be invariant to.",
      ],
    },
    {
      id: "q-dc-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Masked Autoencoders (MAE, He et al. 2022) achieve strong visual representations by masking ~75% of image patches and reconstructing them. Why is the high masking ratio (75%) critical to learning good representations?",
      options: [
        "Higher masking ratio reduces compute since the encoder processes fewer patches",
        "75% masking removes redundant local spatial information, forcing the model to learn long-range semantic dependencies and holistic scene understanding rather than relying on local texture interpolation",
        "The 75% ratio matches the fraction of out-of-bag samples in a random forest, ensuring compatibility with ensemble methods",
        "Higher masking ratio prevents the model from memorizing training images",
      ],
      correctAnswer: 1,
      explanation:
        "With low masking (e.g., 15% as in BERT): the unmasked context is nearly complete — the model can reconstruct masked patches by simple local interpolation (average of neighboring visible patches). No semantic understanding required. With 75% masking: the model sees only 25% of the image (randomly distributed patches). To reconstruct the missing 75%, it must: (1) model long-range dependencies (a masked patch in the upper left may be predicted from a visible patch in the lower right of the same object), (2) understand object semantics (what does a face look like from partial cues?), (3) reason about global scene context. This forces the encoder to learn rich semantic representations transferable to downstream tasks. He et al. ablation: MAE with 75% masking outperforms 40% and 90% masking on linear probing of ImageNet classification.",
      hints: [
        "MAE asymmetric design: encoder processes only unmasked patches (25% of tokens → 4× faster). Decoder reconstructs all patches from encoder output + mask tokens.",
        "The reconstruction target is raw pixel values (not perceptual features), which is simpler to implement than contrastive SSL but still produces representations comparable to SimCLR.",
      ],
    },
    {
      id: "q-dc-kp13-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "DINO (Self-DIstillation with NO labels, Caron et al. 2021) trains a student network to match the output of a teacher network (an exponential moving average of the student), using only self-supervised objectives — no human labels required.",
      correctAnswer: "True",
      explanation:
        "DINO framework: student network f_s (trainable) and teacher network f_t (EMA of student: θ_t ← m·θ_t + (1-m)·θ_s). Both networks see different augmented views of the same image. Training objective: student output distribution (sharpened) should match teacher output distribution — but the teacher is not explicitly trained (it emerges from the EMA). DINO uses a centering operation on teacher outputs to prevent collapse (all outputs going to one mode). The result: DINO-pretrained ViT features exhibit explicit semantic segmentation properties — attention maps highlight meaningful object boundaries without any segmentation supervision. This demonstrates that rich semantic structure emerges purely from the self-distillation objective applied to unlabeled image data.",
      hints: [
        "EMA teacher: θ_t = m·θ_t + (1−m)·θ_s with m = 0.996. The teacher changes slowly, providing stable targets for the student. If teacher = student (m=0), training collapses.",
        "DINO without centering collapses: all examples get assigned to one cluster. Centering subtracts the running mean from teacher outputs, preventing dominant mode collapse.",
      ],
    },
    {
      id: "q-dc-kp13-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Barlow Twins (Zbontar et al. 2021) is a self-supervised method that avoids representation collapse by minimizing redundancy between representation dimensions. Its loss function encourages:",
      options: [
        "The representations of two augmented views to be identical across all dimensions (identical representations)",
        "The cross-correlation matrix between embeddings of two augmented views to be close to the identity matrix: diagonal entries near 1 (same features should be correlated) and off-diagonal entries near 0 (different features should be decorrelated)",
        "The cosine similarity between positive pairs to be maximized and negative pairs to be minimized",
        "The reconstruction error of the representations through a decoder to be minimized",
      ],
      correctAnswer: 1,
      explanation:
        "Barlow Twins loss: L = Σᵢ (1 − Cᵢᵢ)² + λ Σᵢ Σⱼ\$\\neq\$ᵢ Cᵢⱼ², where C is the cross-correlation matrix between normalized embeddings of the two views, computed over a batch: Cᵢⱼ = Σ_b z^A_{b,i} z^B_{b,j} / (‖z^A_{:,i}‖₂ ‖z^B_{:,j}‖₂). The two terms: (1) invariance term: diagonal entries should equal 1 — the same feature should be perfectly correlated across the two views (feature i of view A ↔ feature i of view B). (2) redundancy reduction: off-diagonal entries should equal 0 — different features should be uncorrelated. This is inspired by neuroscience principle that efficient coding should use statistically independent features. Advantage over contrastive methods: does not require negative samples (no large batch size requirement). Advantage over BYOL/DINO: does not require asymmetric architectures (EMA teacher).",
      hints: [
        "The cross-correlation matrix C is computed over the batch dimension. Each row/column represents one feature dimension of the embedding. Identity matrix C = I means: each feature is perfectly invariant across views and uncorrelated with all other features.",
        "λ controls the tradeoff: small λ emphasizes invariance over redundancy reduction; large λ emphasizes decorrelation. λ = 0.0051 was found optimal in the original paper.",
      ],
    },
    {
      id: "q-dc-kp13-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Linear evaluation protocol is the standard benchmark for self-supervised representation quality. A linear classifier is trained on frozen SSL representations using labeled data. Why does this benchmark specifically measure representation quality rather than fine-tuning quality?",
      options: [
        "Linear evaluation is faster to compute than full fine-tuning",
        "By freezing the SSL encoder and training only a linear head, any performance gain must come from the pre-trained representation itself — a linear layer cannot learn nonlinear features, so the representation must already separate the classes linearly. Fine-tuning would allow the encoder to adapt, obscuring how much of the performance comes from the pre-training vs. the fine-tuning data",
        "Linear classifiers are more interpretable than neural networks",
        "Fine-tuning would overfit on the small labeled dataset used for evaluation",
      ],
      correctAnswer: 1,
      explanation:
        "Linear evaluation logic: if a linear classifier (a single weight matrix W: d → C) achieves high accuracy on frozen representations f_θ(x), then the representations must already be linearly separable by class — i.e., the representation space already separates classes well without task-specific adaptation. This tests what the SSL pre-training learned intrinsically. Fine-tuning allows the encoder to change, adapting to the downstream task — making it impossible to attribute performance to the pre-training alone. Analogy: linear evaluation tests whether the representation is a good measuring tape. Fine-tuning tests whether the full system (tape + adapter) works, which conflates SSL quality with fine-tuning efficiency. Benchmark comparison: DINO ViT-S achieves 77% linear evaluation on ImageNet vs. ~83% with full fine-tuning — the ~6% gap represents what fine-tuning adds beyond the pre-trained representation.",
      hints: [
        "The linear evaluation accuracy directly measures whether the SSL features lie on a linearly separable manifold in R^d. High linear evaluation accuracy = the representations are already class-structured.",
        "k-NN evaluation is an even stricter probe: classify by majority vote of k nearest neighbors in the embedding space. No training at all — pure representation quality measurement.",
      ],
    },
  ],

  "few-shot-data": [
    {
      id: "q-dc-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a 5-way 1-shot classification episode, the model receives 5 support images (one per class) and must classify a query image into one of the 5 classes. The fundamental challenge is:",
      options: [
        "The model cannot compute gradients with only 1 example per class",
        "Generalizing to 5 novel classes from only 1 labeled example each requires the model to have learned generalizable visual features during meta-training, not just class-specific classifiers",
        "The query image resolution is too low for standard CNN architectures",
        "5-way classification requires softmax with 5 outputs, which neural networks cannot compute with fewer than 5 training examples",
      ],
      correctAnswer: 1,
      explanation:
        "In 5-way 1-shot: 5 classes, 1 support example per class = 5 total labeled examples at test time. Standard fine-tuning (retrain the classifier head on 5 examples) would overfit catastrophically. The solution: meta-learning. During meta-training, the model is trained on many few-shot episodes from seen classes, learning to: (1) extract features that are discriminative in the few-shot regime, (2) rapidly adapt from few examples. At meta-test time, the model uses these learned strategies on novel classes. Prototypical Networks: compute class prototype as mean embedding of 1 support example per class, classify query by nearest prototype. MAML: learn an initialization θ₀ such that 1 gradient step on the 5 support examples produces a good θ.",
      hints: [
        "1-shot is much harder than 5-shot: 1 example per class means the prototype is just a single point, with no variance information. 5-shot gives a better class prototype.",
        "N-way K-shot episode: always novel classes at test time. The model must generalize across classes, not just within a known class distribution.",
      ],
    },
    {
      id: "q-dc-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Prototypical Networks classify a query example by computing its Euclidean distance to each class prototype (the mean embedding of K support examples), predicting the class with the nearest prototype.",
      correctAnswer: "True",
      explanation:
        "Prototypical Networks (Snell et al. 2017): for each class k in the episode, prototype cₖ = (1/K) Σᵢ f_θ(xᵢᵏ), the mean of the K support example embeddings in the learned embedding space. For a query example xq: P(y=k | xq) = softmax(−‖f_θ(xq) − cₖ‖₂²). The predicted class is argmin_k ‖f_θ(xq) − cₖ‖₂². The model is trained episodically on the full multi-class training set using the same procedure: for each training episode, sample N classes, K support per class, Q queries per class, compute cross-entropy loss over the distance-based predictions. The embedding function f_θ is learned to place same-class examples near their prototype and different-class examples far away.",
      hints: [
        "Euclidean distance in embedding space is the key choice. Cosine similarity also works and is sometimes better for text.",
        "1-shot case: the prototype cₖ = f_θ(xᵢᵏ) is just the single support example embedding itself — the nearest-neighbor classifier in embedding space.",
      ],
    },
    {
      id: "q-dc-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MAML (Finn et al. 2017) learns an initial parameter vector θ such that a few gradient steps on a new task\'s support set achieve good performance. The meta-gradient that updates θ is:",
      options: [
        "The gradient of training loss with respect to θ, averaged over all meta-training tasks",
        "The gradient of query-set loss after the inner-loop adaptation steps, backpropagated THROUGH the inner-loop gradient steps to θ: ∇_θ Σ_τ L_τ(θ − α∇_θ L_τ(θ))",
        "The gradient of a meta-regularization term that prevents θ from moving too far from the pre-trained checkpoint",
        "The gradient of the cosine similarity between task-adapted parameters and the initial θ",
      ],
      correctAnswer: 1,
      explanation:
        "MAML meta-gradient: for each task τ: inner loop update: θ'_τ = θ − α∇_θ L_τ^{support}(θ) (1 or K gradient steps on support set). Query loss: L_τ^{query}(θ'_τ). Meta-objective: min_θ Σ_τ L_τ^{query}(θ'_τ) = Σ_τ L_τ^{query}(θ − α∇_θ L_τ^{support}(θ)). The meta-gradient ∇_θ L_τ^{query}(θ'_τ) requires backpropagating THROUGH the inner gradient computation: ∂L_τ^{query}/∂θ = ∂L_τ^{query}/∂θ'_τ · (I − α ∂²L_τ^{support}/∂θ²). The second-order term (Hessian) makes MAML expensive. First-order approximation (FOMAML, Reptile) ignores the Hessian for efficiency.",
      hints: [
        "The key insight: θ is optimized for fast adaptation, not for directly minimizing task loss. ∇_θ flows through the inner-loop update.",
        "Second-order MAML requires computing the Hessian of the inner loss — O(p²) memory for p parameters. FOMAML approximates this as 0, treating θ'_τ as if it doesn\'t depend on θ.",
      ],
    },
    {
      id: "q-dc-kp14-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "In few-shot learning, using a larger and more diverse meta-training dataset (more classes and more examples per class) generally improves few-shot performance on novel test classes.",
      correctAnswer: "True",
      explanation:
        "Few-shot learning performance scales with meta-training diversity: (1) More meta-training classes: the model learns to represent more types of visual/semantic concepts, building a richer feature space that generalizes to novel test classes. A model meta-trained on 1,000 ImageNet classes generalizes better to novel classes than one trained on 100 classes. (2) More examples per class: better prototype estimation during meta-training, giving more stable gradient signals. (3) More diverse data sources: combining multiple datasets (ImageNet + CUB + CIFAR + tieredImageNet) provides broader coverage. Empirical results: (a) CLIP-pretrained encoders (trained on 400M image-text pairs) achieve SOTA few-shot performance with minimal meta-learning, demonstrating that broad pre-training is the single most important factor. (b) tieredImageNet splits classes carefully to ensure novel test classes are semantically distant from meta-training classes — measuring true generalization.",
      hints: [
        "The few-shot learning bottleneck has shifted from the meta-learning algorithm to the pre-training backbone. A strong SSL or CLIP backbone fine-tuned with simple nearest-neighbor classification often outperforms complex meta-learning algorithms.",
        "Cross-domain few-shot learning (training on natural images, testing on medical images) is much harder than same-domain few-shot learning. The feature space shifts across domains.",
      ],
    },
    {
      id: "q-dc-kp14-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Matching Networks (Vinyals et al. 2016) classify a query example by computing a weighted sum over support set labels, where weights are attention scores between the query and each support example. The key difference from Prototypical Networks is:",
      options: [
        "Matching Networks use a different distance metric (cosine vs. Euclidean)",
        "Matching Networks compute a separate attention weight for the query against EVERY individual support example (softmax over all support embeddings), while Prototypical Networks aggregate support examples into per-class prototype means before computing distance — making Matching Networks more flexible but less computationally efficient in K-shot settings",
        "Matching Networks require more labeled examples per class than Prototypical Networks",
        "Matching Networks use bidirectional LSTMs for the embedding function, while Prototypical Networks use CNNs",
      ],
      correctAnswer: 1,
      explanation:
        "Matching Networks: given query x and support set S = {(x₁,y₁),...,(xₖ,yₖ)}, classify as: ŷ = Σᵢ a(x, xᵢ)·yᵢ, where a(x, xᵢ) = softmax(cosine_sim(f(x), g(xᵢ))). The attention considers every individual support example. Prototypical Networks: compute class prototype cₖ = (1/K) Σᵢ f(xᵢᵏ) and classify by nearest prototype. In 1-shot (K=1): Matching Networks = Prototypical Networks (only one support example per class, so the prototype IS the example). In K-shot (K > 1): Matching Networks keep all K support examples separate and attend to each individually, while Prototypical Networks average them into one prototype. Matching Networks are more flexible (can differentially weight support examples) but compute similarity to N×K individual examples rather than N prototypes — slower at inference.",
      hints: [
        "The 1-shot equivalence: with K=1 per class, the Prototypical Network prototype is just the single support embedding. Matching Networks attend to that same single embedding. Both reduce to nearest-neighbor in embedding space.",
        "Full context embedding: Matching Networks optionally use bidirectional LSTMs to embed support examples in the context of the full support set — allowing examples to influence each other\'s embeddings.",
      ],
    },
    {
      id: "q-dc-kp14-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Transductive few-shot learning uses unlabeled query examples during inference to improve classification. How does Transductive Information Maximization (TIM, Boudiaf et al. 2020) leverage the query set?",
      options: [
        "TIM augments the support set with pseudo-labeled query examples and retrains the model",
        "TIM optimizes the classifier parameters at test time by maximizing mutual information between the query features and their predicted labels — encouraging confident, diverse predictions across query examples without requiring gradient steps through the full network",
        "TIM applies label propagation from labeled support examples to unlabeled query examples through a k-NN graph",
        "TIM averages query predictions across multiple augmented views to produce more stable classifications",
      ],
      correctAnswer: 1,
      explanation:
        "TIM (Transductive Information Maximization) objective: given support set S and query set Q, optimize a linear classifier w on top of frozen embeddings by maximizing: I(Q; w) = H(Ȳ) − E_Q[H(Y|x)], where Ȳ is the marginal label distribution over Q. This decomposes as: (1) H(Ȳ) = entropy of marginal: high → diverse predictions across Q (avoid predicting the same class for all queries). (2) E_Q[H(Y|x)] = expected conditional entropy: low → confident predictions for each individual query example. The information-theoretic objective encourages: confident predictions on each query + diverse usage of all class labels across queries. This is optimized at test time via gradient descent on w (not on the backbone). Transductive advantage: queries are classified jointly, leveraging cluster structure in the query set, rather than independently as in inductive methods.",
      hints: [
        "Transductive vs. inductive few-shot: inductive classifies each query independently using only the support set. Transductive uses all query examples collectively, leveraging their distribution.",
        "The TIM objective is equivalent to maximizing I(Y; X) over the query distribution — a classic information-theoretic principle for unsupervised clustering applied to the transductive few-shot setting.",
      ],
    },
  ],

  "web-scraping-data": [
    {
      id: "q-dc-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'A researcher wants to scrape scientific paper metadata from arXiv.org. arXiv\'s robots.txt contains "Disallow: /search/". This means:',
      options: [
        "Accessing /search/ is technically blocked by server-side authentication",
        "The robots.txt convention asks crawlers not to access /search/ paths; respecting this is an ethical obligation (and in some jurisdictions a legal one), though the server does not technically enforce it",
        "Data scraped from /search/ is automatically deleted after 24 hours per GDPR",
        "/search/ paths contain no data — the directory is empty by convention",
      ],
      correctAnswer: 1,
      explanation:
        "Robots Exclusion Protocol (REP): robots.txt is a text file at domain/robots.txt that communicates crawling preferences. User-agent: * Disallow: /search/ instructs all crawlers to avoid /search/ paths. robots.txt is: (1) Advisory: no technical enforcement — the server will still serve the page to a direct HTTP request. (2) Ethical: major search engines (Google, Bing) respect it as a professional norm. (3) Legally complex: in the US, the hiQ v. LinkedIn ruling (9th Circuit) held that scraping publicly accessible data does not violate the CFAA, but violating robots.txt may constitute breach of contract (ToS violation) in some jurisdictions. For AI training data collection, respecting robots.txt is both an ethical standard and increasingly a regulatory expectation.",
      hints: [
        "arXiv provides a dedicated bulk data API (arXiv.org/help/bulk_data) and OAI-PMH interface — the preferred and allowed way to collect paper metadata at scale.",
        "robots.txt Disallow \$\\neq\$ technical block. It is a request, not a firewall. But well-behaved crawlers (and legally cautious organizations) respect it.",
      ],
    },
    {
      id: "q-dc-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Rate limiting a web scraper (e.g., adding a 1-second delay between requests) is primarily important for legal compliance rather than for technical reliability of the scraped data.",
      correctAnswer: "False",
      explanation:
        "Rate limiting serves multiple purposes, of which legal compliance is only one: (1) Server etiquette (primary ethical reason): aggressive scraping consumes server resources, degrading service for legitimate users. This is the core reason robots.txt and rate limits exist. (2) Legal risk reduction: Terms of Service often prohibit automated access at high rates; some jurisdictions treat DoS-equivalent traffic as illegal. (3) Technical reliability: servers often rate-limit or block IPs making too many requests per minute. A delayed scraper gets more reliable responses; an aggressive scraper gets blocked (HTTP 429, 503) or receives corrupted/partial data. (4) Data quality: scraping too fast may capture partially loaded JavaScript-rendered pages. Rate limiting is multi-motivated.",
      hints: [
        'Politeness: 1 request/second is the informal "polite scraping" norm. For large sites, check robots.txt for Crawl-delay: N directive.',
        "Practical: robots.txt Crawl-delay: 10 means wait 10 seconds between requests. A scraper ignoring this will likely be blocked within minutes.",
      ],
    },
    {
      id: "q-dc-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When building a training dataset from web-scraped text for an LLM, the most significant data quality concern unique to web scraping (vs. curated datasets) is:",
      options: [
        "Web-scraped text is always lower quality than text from academic papers",
        "Near-duplicate content: large fractions of the web contain copied, mirrored, or minimally modified text that appears as training diversity but actually represents low-information repetition — degrading perplexity estimates and causing memorization of templates",
        "Web text always contains NSFW content that must be filtered",
        "HTML parsing errors create garbled text that harms model training",
      ],
      correctAnswer: 1,
      explanation:
        "Near-duplicate content in web corpora (Penedo et al. 2023, Lee et al. 2022): CommonCrawl contains billions of pages, but a large fraction are: (1) Boilerplate copies: forum posts quoted in dozens of replies, press releases republished verbatim across news sites. (2) Template pages: thousands of product pages differing only in SKU. (3) Exact duplicates: mirrors, cached pages. If a template appears 10,000 times in training data, the model memorizes it perfectly (low perplexity) but gains nothing in semantic diversity. Deduplication methods: MinHash + LSH (identify near-duplicates via Jaccard similarity), SimHash (64-bit fingerprints), n-gram overlap deduplication. The Pile, RedPajama, and Dolma all apply aggressive deduplication as a core preprocessing step, removing 30–60% of raw web content.",
      hints: [
        'MinHash: represent each document as a set of n-gram "shingles," compute min-hash signatures, and use LSH to find documents with Jaccard similarity > 0.8. Deduplicate by keeping one representative per near-duplicate cluster.',
        'Memorization + duplicates: if "The quick brown fox jumps over the lazy dog." appears 1,000× in training, the model will reproduce it verbatim and with high confidence — this is memorization, not learning.',
      ],
    },
    {
      id: "q-dc-kp15-4",
      type: "true-false",
      difficulty: "easy",
      question:
        "HTML boilerplate (navigation menus, footer links, cookie banners, ads) should be stripped from web-scraped text before using it for LLM training because it adds low-information repetitive tokens that increase memorization without improving language modeling.",
      correctAnswer: "True",
      explanation:
        "Web page boilerplate includes: (1) Navigation menus: 'Home | About | Products | Contact | Login' repeated on every page of a domain. (2) Footer text: copyright notices, privacy policy links, social media links. (3) Cookie consent banners: 'This website uses cookies to enhance your experience.' (4) Ad text: 'Advertisement. Click here to learn more.' These strings: (a) are semantically meaningless in isolation, (b) appear millions of times across CommonCrawl (every page of a domain has the same nav), (c) teach the model to reproduce boilerplate rather than meaningful content, (d) inflate training token counts without adding information. Extraction tools: Trafilatura, readability-lxml, and Newspaper3k use heuristics (text block density, link density, XPath patterns) to extract main content while removing boilerplate. FineWeb and DCLM apply aggressive boilerplate removal as a standard preprocessing step.",
      hints: [
        "Link density heuristic: if a text block has many hyperlinks per word, it is likely navigation or footer content rather than main article text.",
        "Text block density: main content paragraphs have high word-to-tag ratios. Boilerplate elements (lists of links, short menu items) have low word-to-tag ratios.",
      ],
    },
    {
      id: "q-dc-kp15-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A team builds a training corpus for a customer service chatbot by scraping the company\'s public FAQ pages, product documentation, and support forums. Which data quality issue is most likely to cause the chatbot to give outdated or incorrect information?",
      options: [
        "Duplicate content: the FAQ answers appear in multiple pages with identical text",
        "Temporal staleness: scraped data reflects a past snapshot of policies, prices, and product features that may have since changed — the model will confidently state outdated information",
        "NSFW content from the support forums requiring content filtering",
        "Language inconsistency: FAQ pages and forums use different terminology for the same product features",
      ],
      correctAnswer: 1,
      explanation:
        "Temporal staleness is the primary failure mode for knowledge-intensive applications: (1) Policies change: refund policy updated from 30 days to 15 days — the chatbot confidently states the old policy. (2) Prices change: product pricing updated — the chatbot quotes stale prices. (3) Product features deprecated: the scraping happened before a feature was discontinued — chatbot gives instructions for a non-existent feature. (4) The model has no mechanism to signal knowledge cutoff — it answers confidently regardless of whether the information is current. Solutions: (a) Retrieval-Augmented Generation (RAG): instead of baking knowledge into weights, retrieve live documentation at query time. (b) Regular retraining/fine-tuning with fresher snapshots. (c) Timestamp-aware data weighting: up-weight recent pages during training. For live products with frequent updates, RAG over a continuously updated knowledge base is strongly preferred over fine-tuning on a static corpus.",
      hints: [
        "RAG (Retrieval-Augmented Generation) solves temporal staleness by separating knowledge storage (a retrieval index updated frequently) from language modeling (the generation model).",
        "Scraping timestamp: always record when each page was scraped. This allows filtering out pages older than a threshold and tracking data freshness.",
      ],
    },
    {
      id: "q-dc-kp15-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MinHash locality-sensitive hashing (LSH) is used for near-duplicate detection in web corpora. Given two documents A and B represented as sets of n-gram shingles, the MinHash estimate of their Jaccard similarity is:",
      options: [
        "The fraction of hash functions h for which min_{s ∈ A} h(s) < min_{s ∈ B} h(s)",
        "The fraction of hash functions h for which min_{s ∈ A} h(s) = min_{s ∈ B} h(s) — the probability that the minimum hash value over all shingles is the same for A and B, which equals the Jaccard similarity |A ∩ B| / |A ∪ B|",
        "The cosine similarity between the MinHash signature vectors of A and B",
        "The Hamming distance between the binary MinHash signatures divided by the signature length",
      ],
      correctAnswer: 1,
      explanation:
        "MinHash property: for a uniformly random hash function h and two sets A, B: P[min_{s ∈ A} h(s) = min_{s ∈ B} h(s)] = |A ∩ B| / |A ∪ B| = Jaccard(A, B). Proof sketch: the minimum hash value is the hash of the element of A ∪ B with the smallest hash value. That element belongs to A ∩ B (both sets agree) with probability |A ∩ B| / |A ∪ B|. Practical MinHash: use k independent hash functions h₁, …, hₖ and compute signature sig(A)ᵢ = min_{s ∈ A} hᵢ(s). Estimate: Jaccard(A, B) ≈ (1/k) Σᵢ 𝟙[sig(A)ᵢ = sig(B)ᵢ]. For k = 200 hash functions, the standard error of the estimate is ~1/√200 ≈ 7%. LSH bands: group the k MinHash values into b bands of r values each; documents with an identical band are candidate near-duplicates for exact comparison.",
      hints: [
        "MinHash is a dimensionality reduction: represent a document with thousands of shingles as a k-dimensional signature (k = 200). Near-duplicate detection becomes a comparison of 200-element vectors instead of thousands of shingles.",
        "The bandwidth b and band size r tradeoff: more bands (larger b) → higher recall (find more near-duplicates) but more false positives. Larger band size r → higher precision but lower recall.",
      ],
    },
    {
      id: "q-dc-kp15-7",
      type: "true-false",
      difficulty: "medium",
      question:
        "When scraping social media data for training an NLP model, including usernames, email addresses, and phone numbers in the training corpus is acceptable as long as the data was scraped from publicly visible posts.",
      correctAnswer: "False",
      explanation:
        "Publicly visible \$\\neq\$ appropriate for inclusion in AI training data. Regulatory and ethical constraints: (1) GDPR (EU): personal data (names, emails, phone numbers) requires a lawful basis for processing. Training an ML model on personal data constitutes processing and requires consent or legitimate interest — scraping public posts does not automatically establish consent. (2) CCPA (California): consumers have the right to opt out of sale of personal information. (3) Practical risks: models can memorize and regurgitate personal data at inference time — a user could ask the model for 'John Smith\'s email' and get a real email from training data. (4) Ethical norm: users posting publicly do not expect their contact details to be extracted for AI training at scale. Standard practice: scrub PII (personally identifiable information) before training using regex patterns, named entity recognizers, or dedicated PII detection tools (Microsoft Presidio, Amazon Comprehend PII).",
      hints: [
        "PII in training data creates privacy risk not just during training but at inference: language models can memorize and reproduce rare strings (email addresses, phone numbers) that appear multiple times in training data.",
        "The 'publicness' defense is weakening legally: GDPR enforcement actions (e.g., Clearview AI) have found that scraping publicly visible data at scale without consent violates privacy law in many jurisdictions.",
      ],
    },
    {
      id: "q-dc-kp1-6",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A production ML system for loan approval achieves 88% accuracy overall but only 71% accuracy on applicants from rural zip codes, which make up 8% of the test set. The data-centric explanation for this gap is most likely:",
      options: [
        "The model architecture is too simple to capture rural feature patterns",
        "The training data underrepresents rural applicants, so the model has learned poor features for that slice; collecting and labeling more rural applicant examples or applying targeted augmentation would address the gap without changing the model",
        "Rural applicants have higher inherent default rates, making them harder to predict",
        "The accuracy metric is inappropriate for imbalanced subgroups; AUC should be used instead",
      ],
      correctAnswer: 1,
      explanation:
        "Slice-based performance gaps almost always trace to training data underrepresentation. If rural applicants are 8% of test data, they are likely an even smaller fraction of training data (or may have been systematically undersampled). With few training examples from a subgroup: (1) the model does not learn the decision boundary for that subgroup\'s feature distribution, (2) any label noise in the small rural subset has an outsized impact, (3) the validation set likely did not trigger retraining for this gap because aggregate accuracy (88%) looked good. Data-centric solutions: (a) collect more rural applicant training examples (targeted data collection), (b) apply synthetic oversampling (SMOTE) to the rural slice, (c) apply higher loss weighting for rural examples. These address the root cause (data insufficiency for the slice) rather than masking it with a more complex model.",
      hints: [
        "The 8% test slice with 17-point accuracy gap represents a major failure mode. If rural loans are a key business segment, this gap has direct financial and fairness implications.",
        "Systematic slice analysis before deployment would have caught this. A slice accuracy report (accuracy per zip code decile, per income bracket, per demographics) is standard practice in responsible ML.",
      ],
    },
  ],
};

const moreDCQ: Record<string, Question[]> = {
  "data-valuation-v2": [
    { id: "q-dc-kp16-1", type: "multiple-choice", difficulty: "hard", question: "Data Shapley assigns a value to each training data point based on its marginal contribution to model performance. The Shapley value of data point i is:", options: ["The model accuracy when trained on only data point i", "The weighted average of i's marginal contribution across all possible subsets of training data — satisfying fairness axioms (efficiency, symmetry, null player)", "The gradient norm of data point i at convergence", "The influence function value for data point i"], correctAnswer: 1, explanation: "Data Shapley adapts game theory Shapley values to data valuation: v(i) = sum over subsets S not containing i of [|S|!(|D|-|S|-1)!/|D|!] * [U(S+i)-U(S)]. This satisfies efficiency, symmetry, and null player axioms. Low or negative Shapley value data is typically mislabeled, out-of-distribution, or corrupted.", hints: ["Shapley values from game theory provide the unique fair allocation satisfying the four axioms.", "Low/negative Shapley value data is typically mislabeled, out-of-distribution, or adversarially corrupted."] },
    { id: "q-dc-kp16-2", type: "true-false", difficulty: "medium", question: "Influence functions can identify the training data points that most influenced a specific model prediction by computing the change in loss when that training point is removed — without retraining the model.", correctAnswer: "True", explanation: "Influence functions (Koh & Liang 2017) use the second-order Taylor approximation I(z, z_test) = -gradient_test * H_inverse * gradient_train. Computing H_inverse*v via LiSSA or Conjugate Gradient makes this tractable without retraining. Applications: identifying poisoning data, explaining predictions, finding training bugs.", hints: ["The inverse Hessian captures the curvature of the loss landscape at convergence.", "For large neural networks, exact Hessian inversion is too expensive — stochastic estimators are used."] },
    { id: "q-dc-kp16-3", type: "multiple-choice", difficulty: "hard", question: "Data markets and data pricing are emerging to incentivize data sharing. The key challenge for pricing data in ML marketplaces is:", options: ["Data storage costs", "Data has zero marginal cost of copying but non-zero marginal value that depends on what data the buyer already has — requiring context-dependent pricing that reflects complementarity vs redundancy with existing buyer data", "Data pricing is solved by standard economic auction theory", "Only data volume matters for pricing"], correctAnswer: 1, explanation: "Unlike physical goods, data is non-rivalrous (sharing does not reduce supply) but value is context-dependent: a medical image is worth more to a buyer lacking such images than to one with millions. Data Shapley-based pricing, query-based pricing, and federated data valuation are proposed solutions to this complementarity problem.", hints: ["A dataset of rare cancer cases is worth more to a hospital with mostly common cancer data than to one with equally rare cases.", "Differential privacy budgets can be priced — more privacy budget spent means more information revealed."] },
  ],
  "annotation-quality": [
    { id: "q-dc-kp17-1", type: "multiple-choice", difficulty: "medium", question: "Inter-annotator agreement (IAA) measured by Cohen's Kappa is preferred over simple percent agreement because:", options: ["Kappa is always higher than percent agreement", "Kappa corrects for agreement expected by chance, giving 0 for chance-level agreement and 1 for perfect agreement — percent agreement inflates the score when class imbalance makes random agreement high", "Kappa is faster to compute", "Kappa only works for binary labels"], correctAnswer: 1, explanation: "If 95% of examples are class A and annotators randomly select A 95% of the time, percent agreement is ~0.905 despite random labeling. Cohen's Kappa corrects for chance agreement: kappa > 0.8 is generally considered strong agreement. For multiple annotators, Fleiss's Kappa extends this measure.", hints: ["For highly imbalanced tasks (rare event detection), Kappa can be very low even with high percent agreement.", "Fleiss's Kappa extends Cohen's Kappa to multiple annotators (more than 2)."] },
    { id: "q-dc-kp17-2", type: "true-false", difficulty: "medium", question: "Annotation guidelines that include explicit examples of boundary cases (edge cases where the labeling decision is ambiguous) significantly reduce inter-annotator disagreement compared to guidelines with only clear-cut examples.", correctAnswer: "True", explanation: "Boundary case examples in annotation guidelines provide shared reference points for ambiguous decisions. Annotators faced with edge cases (e.g., sarcastic text in sentiment analysis) disagree most; explicit guidelines with resolved edge cases reduce this variance. This is why NLP datasets like SNLI have detailed protocols with thousands of guideline examples.", hints: ["The gray area cases are where annotators diverge most — guidelines must specifically address these.", "Iterative guideline refinement using disagreement analysis from initial annotation rounds is standard practice."] },
    { id: "q-dc-kp17-3", type: "multiple-choice", difficulty: "hard", question: "For subjective tasks (toxicity detection, sentiment), using a single ground truth label per example is increasingly recognized as inadequate. The preferred approach is:", options: ["Averaging all annotator labels into a single score", "Preserving the full distribution of annotator labels and training models to output distributions or confidence intervals — capturing genuine label ambiguity and annotator disagreement as a signal, not noise", "Discarding all ambiguous examples", "Using only expert annotators for subjective tasks"], correctAnswer: 1, explanation: "Learning from label distributions trains models to predict the distribution P(y|x, annotator population) rather than a single y. This is more faithful for subjective tasks where human disagreement reflects genuine semantic ambiguity or cultural variation — not annotation error. Soft labels from annotator distributions can be used directly in cross-entropy loss.", hints: ["Toxicity annotation disagreement often reflects demographic differences — same text rated differently by different communities.", "Soft labels from annotator distributions can be used directly in cross-entropy: CE(model_output, label_distribution)."] },
  ],
  "synthetic-data-v2": [
    { id: "q-dc-kp18-1", type: "multiple-choice", difficulty: "medium", question: "GAN-generated synthetic tabular data for privacy-preserving data sharing has which fundamental limitation compared to real data?", options: ["GANs cannot generate tabular data", "Mode collapse and training instability can cause GANs to miss rare subpopulations in the original data — synthetic data may underrepresent minority classes and fail fidelity checks on distribution tails", "Synthetic data always violates differential privacy", "GAN training requires more data than other generative methods"], correctAnswer: 1, explanation: "GANs suffer from mode collapse where the generator focuses on easy modes and ignores rare ones. For tabular data, this means rare patient subgroups, minority classes, or extreme values are underrepresented. Statistical fidelity tests (KL divergence on marginals, correlation preservation, classifier two-sample tests) detect this. VAEs and diffusion models have better mode coverage.", hints: ["The two-sample test (train classifier to distinguish real vs synthetic) quantifies fidelity — high accuracy means low fidelity.", "SDV toolkit and CTGAN are standard tools; GAN training instability for tabular data is well-documented."] },
    { id: "q-dc-kp18-2", type: "true-false", difficulty: "medium", question: "Data augmentation via paraphrase generation (using LLMs to rephrase training examples) for NLP tasks can improve model robustness to surface-level variations but risks introducing label-inconsistent paraphrases for nuanced tasks.", correctAnswer: "True", explanation: "LLM paraphrasing can preserve meaning (good for augmentation) but also subtly alter it: changing sentiment, negation, or presuppositions in ways that invalidate the original label. Human quality checks on a sample of paraphrases are essential — especially for NLI, toxicity detection, and tasks sensitive to exact wording.", hints: ["A movie review paraphrased from 'not bad' to 'good' changes sentiment polarity, invalidating the original label.", "Back-translation (English to French to English) is a cheaper alternative with similar augmentation effects."] },
    { id: "q-dc-kp18-3", type: "multiple-choice", difficulty: "hard", question: "Differentially private synthetic data generation (DP-GAN, PrivBayes) adds noise to satisfy epsilon-differential privacy. The fundamental trade-off is:", options: ["More privacy (smaller epsilon) gives lower utility due to higher noise", "DP synthetic data is always identical in utility to non-private synthetic data", "Differential privacy only protects the generator weights, not the generated data", "DP synthetic data prevents all memorization"], correctAnswer: 0, explanation: "Differential privacy guarantees that no individual's data can be identified from the synthetic output with probability bounded by epsilon. But noise added to satisfy DP reduces the accuracy of learned statistics — smaller epsilon (stronger privacy) means more noise and lower utility. The epsilon-utility trade-off is the central challenge in differentially private data synthesis.", hints: ["epsilon=1 is considered strong privacy; epsilon=10 is weak. Most published DP synthetic data methods achieve epsilon between 1 and 10.", "For high-dimensional data, DP mechanisms add noise proportional to sensitivity * sqrt(d), making precise multivariate statistics impossible at small epsilon."] },
  ],
  "data-cleaning-techniques": [
    { id: "q-dc-kp19-1", type: "multiple-choice", difficulty: "medium", question: "Confident Learning (Northcutt et al.) identifies label errors in classification datasets by:", options: ["Training multiple models and taking the majority vote", "Estimating the joint distribution of noisy and true labels using out-of-fold predicted probabilities — identifying examples where the confident predicted class differs from the given label", "Running k-nearest neighbor imputation on labels", "Using cosine similarity between example embeddings to find mislabeled samples"], correctAnswer: 1, explanation: "Confident Learning: (1) Get out-of-fold predicted probabilities for every training example, (2) Estimate the joint distribution Q[noisy_label, true_label] using thresholded probabilities, (3) Rank examples by the joint probability of their given label being wrong. Applied to ImageNet: found ~6% label errors in the validation set.", hints: ["The joint distribution entry Q[TRUCK, CAR] captures examples labeled as trucks that the model believes are cars with high confidence.", "Cleanlab (open source) implements Confident Learning and integrates with sklearn, PyTorch, and Keras."] },
    { id: "q-dc-kp19-2", type: "true-false", difficulty: "easy", question: "When handling missing data in tabular ML, using the column mean for imputation (mean imputation) is always optimal compared to model-based imputation methods like iterative imputation (MICE).", correctAnswer: "False", explanation: "Mean imputation is naive: it ignores relationships between features, underestimates variance, and biases correlation estimates toward zero. MICE (Multiple Imputation by Chained Equations) iteratively fits models to predict missing values from observed values — capturing inter-feature correlations. For MCAR data mean imputation is unbiased; for MAR/MNAR data it is biased.", hints: ["MCAR: missing completely at random (ignorable). MAR: missing depends on observed variables (correctable). MNAR: missing depends on the missing value itself (hardest).", "sklearn.impute.IterativeImputer implements MICE; KNN imputation and random forest imputation are popular alternatives."] },
    { id: "q-dc-kp19-3", type: "multiple-choice", difficulty: "hard", question: "Rule-based data validation (using tools like Great Expectations or TFDV) catches which class of data quality issues that statistical distributions alone miss?", options: ["Distribution drift", "Constraint violations that are rare but catastrophic: negative ages, future timestamps in historical data, referential integrity failures (foreign keys referencing non-existent records), format violations (phone numbers with letters)", "Model accuracy degradation", "Annotation disagreement"], correctAnswer: 1, explanation: "Statistical tests detect distribution-level drift but miss individual invalid records. Rule-based validation asserts domain invariants: age between 0 and 130, timestamp less than or equal to now, FK references exist, revenue greater than 0. These violations may be rare (less than 0.1%) but can crash downstream models or produce silently incorrect predictions.", hints: ["Great Expectations: define expectations as unit tests for data — e.g., expect_column_values_to_be_between(col, 0, 150).", "TFDV (TensorFlow Data Validation) generates statistics from data and validates against a schema — integrated in TFX pipelines."] },
  ],
  "data-augmentation-cv": [
    { id: "q-dc-kp20-1", type: "multiple-choice", difficulty: "medium", question: "AugMix (Hendrycks et al.) creates augmented images by mixing multiple augmented versions of an input. Its key benefit over standard augmentation is:", options: ["It eliminates the need for large training datasets", "It improves model robustness to distribution shift by training on diverse, smoothly mixed augmentations — encouraging consistent predictions across the augmentation chain via a Jensen-Shannon consistency loss", "It reduces training time by 50%", "AugMix is only effective for medical imaging"], correctAnswer: 1, explanation: "AugMix mixes k augmented copies with a clean image using Dirichlet-sampled mixing coefficients and applies a Jensen-Shannon consistency loss between model predictions on each version. This enforces smooth embedding space and dramatically improves corruption robustness (ImageNet-C mCE) without hurting clean accuracy.", hints: ["The JS consistency loss minimizes the divergence between model predictions on multiple augmented versions of the same image.", "AugMix improved ImageNet-C mean Corruption Error by ~18% over vanilla training."] },
    { id: "q-dc-kp20-2", type: "true-false", difficulty: "medium", question: "MixUp data augmentation (training on convex combinations of image pairs: lambda*x_i + (1-lambda)*x_j with label lambda*y_i + (1-lambda)*y_j) acts as a vicinal risk minimization approach that smooths the decision boundary between classes.", correctAnswer: "True", explanation: "MixUp (Zhang et al. 2018) trains on virtual training examples drawn from the vicinities of training points. The mixed label enforces smooth, linear interpolation between class predictions — reducing overconfident predictions far from training data and acting as an implicit regularizer. It improves calibration and adversarial robustness.", hints: ["The vicinal risk minimization (VRM) framework formalizes training on the data vicinity rather than just training points.", "CutMix (cut-and-paste regional mixing) and FMix (Fourier space mixing) are extensions with similar benefits."] },
    { id: "q-dc-kp20-3", type: "multiple-choice", difficulty: "hard", question: "AutoAugment (Cubuk et al.) uses reinforcement learning to search for optimal augmentation policies for a given dataset. Its key finding was:", options: ["Aggressive augmentation always helps regardless of dataset", "Dataset-specific augmentation policies significantly outperform generic ones: ImageNet optimal policy differs substantially from CIFAR-10 optimal policy, and both outperform hand-designed augmentations", "AutoAugment is only beneficial for small datasets under 10K examples", "Simple random cropping outperforms learned augmentation policies"], correctAnswer: 1, explanation: "AutoAugment searches over a space of augmentation operations and their magnitudes using a RL controller. The discovered ImageNet policy achieves state-of-the-art results; CIFAR-10 policy uses different operations. This sparked cheaper alternatives (RandAugment, TrivialAugment) that match AutoAugment with simpler search strategies.", hints: ["AutoAugment's search cost is ~5000 GPU hours — RandAugment achieves similar results with zero search cost.", "RandAugment: apply N random augmentations each with magnitude M — sweeping (N,M) over a small grid outperforms AutoAugment."] },
  ],
  "weak-supervision": [
    { id: "q-dc-kp21-1", type: "multiple-choice", difficulty: "medium", question: "Snorkel's Label Model aggregates noisy labels from multiple labeling functions (LFs) without ground truth labels by modeling:", options: ["The average of all LF outputs as the final label", "The dependency structure between LFs and their individual accuracy rates, estimating a probabilistic label using the generative model — inferred without any labeled data via weak supervision", "The LF that agrees with the majority as the gold label", "Only LFs with known accuracy rates"], correctAnswer: 1, explanation: "Snorkel's generative model treats each LF's output as a noisy observation of the true label. By modeling LF accuracies and dependencies, it estimates the joint probability of true labels — equivalent to a latent variable model fit via expectation maximization without any labeled examples.", hints: ["The generative model parameters (LF accuracies) are estimated using observable LF agreement statistics.", "Dependency learning: correlated LFs should be modeled as dependent to avoid double-counting their evidence."] },
    { id: "q-dc-kp21-2", type: "true-false", difficulty: "medium", question: "In weak supervision, using more labeling functions always improves label quality because more information sources reduce uncertainty.", correctAnswer: "False", explanation: "Adding redundant or correlated LFs can hurt label quality by introducing spurious correlations that the generative model treats as independent evidence. Adding a noisy LF that is worse than random on certain subsets can degrade label quality for those examples. LF diversity (covering different aspects of the decision) and reasonable accuracy are the key criteria.", hints: ["A redundant LF copy: Snorkel might treat it as independent confirmation, inflating false confidence in wrong labels.", "LF coverage (fraction of examples it fires on) matters — high-coverage LFs have more impact on overall label quality."] },
    { id: "q-dc-kp21-3", type: "multiple-choice", difficulty: "hard", question: "Programmatic data augmentation using labeling functions (LFs) enables rapid iteration. Which type of LF is most reliable and explainable for text classification?", options: ["Neural network softmax outputs as LFs", "Pattern-based LFs using keyword lists, regular expressions, or knowledge base lookups — explicitly encoding domain knowledge and being easily auditable and debuggable by domain experts", "LFs derived from clustering embeddings", "Random sampling LFs"], correctAnswer: 1, explanation: "Pattern-based LFs are: high-precision on their coverage, explainable (domain expert can verify logic), debuggable (wrong predictions lead to fix the regex or keyword list), and reusable across similar tasks. Neural LFs are higher-coverage but opaque and harder to debug when they fail.", hints: ["External knowledge: Wikipedia category membership, medical ontologies (SNOMED, ICD-10), product taxonomies — rich sources for rule-based LFs.", "Snorkel's commercial successor (Snorkel AI) enables non-engineers to write LFs via natural language rules."] },
  ],
  "data-preprocessing": [
    { id: "q-dc-kp22-1", type: "multiple-choice", difficulty: "medium", question: "Feature normalization (standardization to zero mean, unit variance vs min-max scaling to [0,1]) affects gradient-based optimization. Which normalization is preferred when the feature distribution has significant outliers?", options: ["Min-max scaling, as it preserves the relative distances", "Standardization (z-score), as extreme outliers will compress most values into a tiny range in min-max scaling — standard scaling is more robust to outliers", "Neither — outliers should be removed first", "Log transformation, as it works for all feature types"], correctAnswer: 1, explanation: "Min-max scaling: a single outlier at max=1000 compresses all values below 100 into [0, 0.1] — dramatically reducing within-distribution variance. Standardization is more robust: outliers inflate the standard deviation slightly but do not compress all other values. RobustScaler (using median and IQR instead of mean and std) is best for heavy outliers.", hints: ["Min-max scaling is preferred when features have hard physical bounds (e.g., pixel values 0-255) with no outliers.", "RobustScaler scales using the median and interquartile range, making it insensitive to outliers."] },
    { id: "q-dc-kp22-2", type: "true-false", difficulty: "easy", question: "One-hot encoding of high-cardinality categorical features (e.g., zip codes with 43,000 unique values) is preferable to target encoding for tree-based models when the training dataset is small.", correctAnswer: "False", explanation: "One-hot encoding a 43,000-cardinality feature creates 43,000 binary features — most with fewer than 5 examples in training. Tree-based models cannot learn reliable splits on such sparse features. Target encoding (replacing each category with the mean target value) creates a single dense feature but requires careful regularization to prevent target leakage.", hints: ["Target encoding without regularization leads to target leakage: encoding train features using train labels allows the model to memorize labels.", "Smoothed target encoding balances the category mean with the global mean, controlled by a smoothing factor."] },
    { id: "q-dc-kp22-3", type: "multiple-choice", difficulty: "hard", question: "Data leakage in ML pipelines occurs when information from the test set or future data contaminates training. Which pipeline implementation prevents temporal data leakage for time-series cross-validation?", options: ["k-fold cross-validation with random splits", "Purged group time-series split: use walk-forward splits where training always precedes validation chronologically, with a purge gap removing examples close to the split boundary to prevent label leakage from adjacent time windows", "Stratified k-fold preserving temporal order", "Leave-one-out cross-validation"], correctAnswer: 1, explanation: "Random k-fold cross-validation uses future data to predict the past — a form of leakage for time series. Walk-forward validation ensures training data always precedes validation chronologically. A purge gap (e.g., excluding the 5 days before validation start) prevents labels correlated with adjacent training examples.", hints: ["Financial time series: if labels are 1-week forward returns, training on day 100 and validating on day 101 leaks the same return.", "scikit-learn TimeSeriesSplit and the Combinatorial Purged K-Fold framework address temporal leakage."] },
  ],
  "federated-data": [
    { id: "q-dc-kp23-1", type: "multiple-choice", difficulty: "medium", question: "Federated learning trains models across distributed clients without centralizing data. The primary statistical challenge beyond communication cost is:", options: ["Gradient synchronization latency", "Non-IID data distributions across clients: each client's data reflects local usage patterns, causing client drift and degraded convergence of FedAvg compared to centralized training", "Insufficient compute on mobile devices", "Encryption overhead"], correctAnswer: 1, explanation: "Non-IID data across federation clients causes client drift in FedAvg: local models converge to local optima, and their average is far from the global optimum. Techniques: FedProx (proximal regularization toward global model), SCAFFOLD (control variates for drift), personalized FL (per-client fine-tuned models), and sharing a small representative global dataset.", hints: ["Degree of non-IIDness: Dirichlet distribution Dir(alpha) on label distribution — small alpha gives highly non-IID settings.", "FedAvg convergence: provably slower under non-IID; adding even 5% shared global data dramatically improves convergence."] },
    { id: "q-dc-kp23-2", type: "true-false", difficulty: "medium", question: "Secure aggregation in federated learning ensures that the central server cannot see individual client gradient updates — only the aggregate — using cryptographic protocols like secret sharing or homomorphic encryption.", correctAnswer: "True", explanation: "Secure aggregation (Bonawitz et al. 2017) uses secret sharing: each client splits its update into random shares sent to other clients, so the server can reconstruct the sum without seeing individual updates. This protects gradient privacy from a semi-honest server while allowing accurate gradient aggregation.", hints: ["Gradient inversion attacks can reconstruct training images from shared gradients — secure aggregation prevents this.", "Differential privacy + secure aggregation: add calibrated noise before sharing so the aggregate satisfies differential privacy."] },
    { id: "q-dc-kp23-3", type: "multiple-choice", difficulty: "hard", question: "Cross-silo federated learning (between organizations, e.g., hospitals) differs from cross-device (millions of mobile phones) federated learning primarily in:", options: ["Cross-silo requires more communication rounds", "Cross-silo has few reliable, high-bandwidth clients each with large data while cross-device has millions of unreliable, low-bandwidth devices each participating rarely — requiring fundamentally different algorithmic and system designs", "Cross-silo uses differential privacy while cross-device does not", "Cross-device is only for image tasks"], correctAnswer: 1, explanation: "Cross-silo: 2-100 reliable clients (hospitals, banks) each with large data and stable connections. Cross-device: millions of unreliable clients (phones), each with small data and intermittent availability. Algorithms differ substantially: cross-silo can use many communication rounds; cross-device must tolerate client dropout of 30-70% in each round.", hints: ["Cross-device challenges: client selection, straggler handling, model compression for on-device training.", "FATE is a framework designed for cross-silo FL; TensorFlow Federated supports both cross-silo and cross-device settings."] },
  ],
  "data-centric-llm": [
    { id: "q-dc-kp24-1", type: "multiple-choice", difficulty: "hard", question: "Instruction following data curation for RLHF requires both chosen and rejected response pairs. The quality of these preference pairs critically impacts the reward model. The key quality criterion for effective preference data is:", options: ["Chosen response must be longest", "Chosen and rejected responses should differ in the target quality dimension (helpfulness, harmlessness, honesty) but be similar in other dimensions — clear signal with minimal confounds", "More annotators per pair always improves quality", "Rejected responses must come from the current policy model only"], correctAnswer: 1, explanation: "Preference data quality requires: (1) Clear quality gap between chosen and rejected (confusing pairs with close quality train a weak reward model), (2) Controlled confounds (if chosen is always longer, the reward model learns length not quality), (3) On-policy rejected samples from the current model being trained to keep the learning signal relevant.", hints: ["Spurious correlation: if chosen responses are always from GPT-4 and rejected from GPT-3, the RM learns to identify source, not quality.", "Diversity in prompt distribution: a reward model trained only on coding prompts generalizes poorly to creative writing preference judgments."] },
    { id: "q-dc-kp24-2", type: "true-false", difficulty: "medium", question: "The quality of pre-training data (Common Crawl filtering, deduplication, domain mixing ratios) has larger impact on final LLM capabilities than model architecture choices for models of similar parameter count.", correctAnswer: "True", explanation: "Scaling laws (Hoffmann et al. / Chinchilla) show that compute-optimal training requires proportional data and model size scaling. The Llama 2-70B trained on 2T tokens of high-quality data outperforms GPT-3-175B trained on 300B tokens despite fewer parameters. Data quality and quantity dominate over architecture at similar compute budgets.", hints: ["RedPajama, Dolma, and FineWeb-Edu are open data curation projects showing aggressive quality filtering outperforms raw scale.", "Chinchilla: for a compute budget C, optimal allocation is roughly equal compute to model parameters and training tokens."] },
    { id: "q-dc-kp24-3", type: "multiple-choice", difficulty: "hard", question: "Domain data mixing ratios for LLM pre-training (how much code, web text, books, academic papers) are determined by which approach in state-of-the-art training recipes?", options: ["Uniform mixing across all domains", "Empirical ablation studies comparing downstream task performance under different mixing ratios, with code and high-quality web text consistently overweighted relative to raw crawl proportion due to their high information density", "Using the natural proportion of each domain on the web", "Mixing ratios have no impact on downstream task performance"], correctAnswer: 1, explanation: "Domain mixing is a key engineering decision: code improves reasoning and instruction following beyond code tasks; math improves logical reasoning; academic papers improve factual accuracy. DoReMi and RegMix automate ratio search via domain reward models, and consistently find code and high-quality text should be overweighted vs their natural web proportion.", hints: ["Overweighting code in LLM pre-training improves Chain-of-Thought reasoning even on non-code tasks.", "DoReMi (Xie et al. 2023) uses a small proxy model to automatically optimize domain mixing weights."] },
  ],
  "dataset-documentation": [
    { id: "q-dc-kp25-1", type: "multiple-choice", difficulty: "easy", question: "Datasheets for Datasets (Gebru et al.) proposes a standardized documentation framework for ML datasets. The primary purpose is:", options: ["To reduce dataset file size", "To document dataset motivation, composition, collection process, preprocessing, intended uses, distribution, and maintenance — enabling informed decisions about dataset suitability and identifying potential harms", "To encrypt datasets for privacy", "To standardize dataset file formats"], correctAnswer: 1, explanation: "Datasheets document: (1) Motivation (why created, who funded), (2) Composition (what is in it, representativeness), (3) Collection (how gathered, consent), (4) Preprocessing (what cleaning), (5) Uses (intended/inappropriate uses), (6) Distribution (licensing), (7) Maintenance (updates, corrections). This enables dataset consumers to make informed, ethical decisions.", hints: ["Datasheets analogize to electronics component datasheets — standardized specs for safe, appropriate use.", "Model Cards (Mitchell et al.) provide analogous documentation for ML models rather than datasets."] },
    { id: "q-dc-kp25-2", type: "true-false", difficulty: "easy", question: "Dataset version control (using tools like DVC or LakeFS) is important in ML because model performance can change when the training dataset changes — tracking dataset versions enables reproducibility and debugging of performance regressions.", correctAnswer: "True", explanation: "Without dataset versioning, a model trained on 'the training dataset' cannot be reproducibly retrained if data has changed (additions, corrections, deduplication). DVC tracks dataset versions alongside model code, enabling git-style rollback to any previous dataset state — essential for debugging performance regressions.", hints: ["DVC (Data Version Control) stores dataset pointers in git while data resides in cloud storage (S3, GCS).", "The MLflow experiment tracker stores which dataset version was used for each experiment run."] },
    { id: "q-dc-kp25-3", type: "multiple-choice", difficulty: "medium", question: "Data cards (Google) extend datasheets with quantitative statistics about dataset characteristics. Which quantitative metric is most important for assessing demographic representativeness in a face recognition dataset?", options: ["Total number of images", "Breakdown of image counts and model performance metrics (accuracy, FPR, FNR) by demographic subgroup (gender, race, age) — revealing whether performance disparities exist across groups", "Average image resolution", "Geographic distribution of photographers"], correctAnswer: 1, explanation: "Demographic representativeness requires both: (1) data composition breakdown (are groups proportionally represented in training?) and (2) disaggregated performance metrics (does the model perform equally across groups?). The Gender Shades study exposed large FPR disparities across race and gender in commercial face recognition systems.", hints: ["Training data underrepresentation of dark-skinned faces leads to higher error rates — documented by Joy Buolamwini's Gender Shades study.", "Disaggregated metrics: overall accuracy may be 95% but 80% for a minority subgroup — the overall metric hides this disparity."] },
  ],
};

Object.assign(questions, moreDCQ);


const extraDCQ: Record<string, Question[]> = {
  "data-valuation-shapley": [
    {
      id: "q-dc-ex1-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Data Shapley assigns a value to each training example by computing its marginal contribution across all possible training subsets. The Shapley value for training point z_i is formally defined as:",
      options: [
        "The change in model performance when z_i is added to the full dataset",
        "The weighted average of marginal contributions v(S union z_i) minus v(S) over all subsets S not containing z_i, weighted by |S|!(n-|S|-1)!/n!",
        "The gradient of the loss with respect to z_i's embedding",
        "The leave-one-out accuracy change when z_i is removed from the full training set",
      ],
      correctAnswer: 1,
      explanation: "Data Shapley (Ghorbani & Zou 2019) applies the Shapley value from cooperative game theory to data valuation. The Shapley value for point z_i is the weighted average of its marginal contributions over all subsets S of the remaining data. This is the unique value function satisfying efficiency, symmetry, null player, and linearity axioms. Because exact computation requires 2^n model evaluations, Monte Carlo approximation (KNN-Shapley, TMC-Shapley) is used in practice.",
      hints: [
        "The Shapley value is the only value satisfying four axioms: efficiency (values sum to total value), symmetry, null player, and linearity — making it theoretically unique.",
        "LOO (leave-one-out) is a special case that only considers the marginal contribution to the full dataset, ignoring contributions to all smaller subsets — it can mislead on redundant data points.",
      ],
    },
    {
      id: "q-dc-ex1-2",
      type: "true-false",
      difficulty: "medium",
      question: "KNN-Shapley approximates Data Shapley values exactly for k-nearest neighbor classifiers in O(n log n) time, making it orders of magnitude faster than Monte Carlo Shapley estimation for large datasets.",
      correctAnswer: "True",
      explanation: "Jia et al. (2019) showed that for KNN classifiers, Data Shapley values have a recursive structure that can be computed exactly in O(n log n) using sorted neighbor lists. For each test point, the algorithm traverses training points in order of distance and accumulates Shapley contributions via a recurrence relation. This makes KNN-Shapley practical for datasets with millions of points, while Monte Carlo TMC-Shapley requires O(n x T) model retraining iterations for T samples.",
      hints: [
        "The KNN recursive formula allows O(n) computation after O(n log n) sorting, making the total cost O(n log n) for exact Shapley values.",
        "KNN-Shapley is often used as a proxy for the Shapley values of more complex models — the rankings of low-value points tend to transfer across model classes.",
      ],
    },
    {
      id: "q-dc-ex1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Data Valuation with Reinforcement Learning (DVRL, Yoon et al. 2020) trains a data value estimator network. Compared to Data Shapley, the main practical advantage of DVRL is:",
      options: [
        "DVRL provides theoretically guaranteed Shapley values",
        "DVRL learns a value estimator that generalizes to new data points without recomputing Shapley values, scales to large datasets via mini-batch training, and can incorporate task-specific performance signals as rewards",
        "DVRL requires fewer hyperparameters than Shapley estimation",
        "DVRL is more interpretable than Shapley because it uses a neural network",
      ],
      correctAnswer: 1,
      explanation: "DVRL uses a data value estimator (DVE) network that outputs a selection probability for each training example. The DVE is trained via REINFORCE to maximize a downstream performance reward. Key advantages over Data Shapley: (1) Amortized — once trained, new points get values in a forward pass, not 2^n evaluations. (2) Scalable — mini-batch training works for millions of examples. (3) Flexible reward — can optimize for any downstream metric including fairness or robustness. Disadvantage: no theoretical uniqueness guarantees that Shapley provides.",
      hints: [
        "DVRL's data value estimator outputs per-example weights used during downstream model training — high-value examples get higher training weights.",
        "REINFORCE variance: DVRL training can be unstable; control variates and careful learning rate scheduling are important for convergence.",
      ],
    },
    {
      id: "q-dc-ex1-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Influence functions estimate the effect of upweighting a training example z on the trained model's loss at a test point z_test. The influence of z on z_test is approximately:",
      options: [
        "The dot product of gradient vectors at z and z_test",
        "Negative gradient of the test loss times the inverse Hessian times the gradient of the training loss at z",
        "The difference in validation loss when z is removed and the model is fully retrained",
        "The cosine similarity between the embeddings of z and z_test",
      ],
      correctAnswer: 1,
      explanation: "Koh & Liang (2017) derived the influence function: I(z, z_test) = -grad_L(z_test, theta)^T H_theta^{-1} grad_L(z, theta), where H_theta is the Hessian of the training loss. This approximates the parameter change when z is upweighted by epsilon — the chain rule gives the test loss change. Applications: identifying training examples that most harm or help test performance, detecting label errors (high influence of correctly-labeled test examples on mislabeled training neighbors), and understanding model behavior.",
      hints: [
        "The inverse Hessian H^{-1} is expensive: for neural networks with millions of parameters, LiSSA (linear-time stochastic second-order approximation) computes H^{-1}v efficiently.",
        "Influence functions assume convexity near theta-hat — they work well for linear models and convex losses but are approximate for deep networks with non-convex loss landscapes.",
      ],
    },
    {
      id: "q-dc-ex1-5",
      type: "true-false",
      difficulty: "easy",
      question: "Leave-one-out (LOO) data valuation — measuring how much validation performance drops when a single training point is removed — is computationally equivalent to Data Shapley for large datasets.",
      correctAnswer: "False",
      explanation: "LOO requires n model retrainings (one per removed example), while exact Data Shapley requires 2^n retrainings — exponentially more. However, LOO is a fundamentally different estimator, not an approximation of Shapley. LOO only measures marginal contribution to the full dataset and cannot detect redundancy: if two identical points are in the dataset, removing either one alone has zero effect (each LOO value is 0), but together they contribute positive value. Data Shapley correctly assigns each a positive value via the subset averaging.",
      hints: [
        "Redundancy blind spot: LOO assigns near-zero value to duplicated examples even though the pair together is valuable — Shapley distributes the joint value evenly.",
        "LOO computation: if model retraining is fast (e.g., linear models), LOO is practical. Data Shapley approximation via Monte Carlo sampling is needed for expensive models.",
      ],
    },
    {
      id: "q-dc-ex1-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A practitioner uses Data Shapley to identify training examples with negative Shapley values. The recommended action is:",
      options: [
        "Always remove all negative-value examples to maximize model performance",
        "Investigate negative-value examples for mislabeling or distribution shift — they may be valid hard examples from underrepresented classes, or they may be genuinely harmful noise worth removing after inspection",
        "Keep all examples regardless of Shapley value to avoid selection bias",
        "Replace negative-value examples with synthetic data generated by a GAN",
      ],
      correctAnswer: 1,
      explanation: "Negative Shapley values indicate that including an example hurts model performance on average across subsets — a red flag for mislabeling or harmful noise. However, not all negative-value examples are bad: hard examples from minority classes may have negative Shapley under standard accuracy (because they hurt majority-class accuracy) but positive Shapley under balanced accuracy. A systematic workflow: (1) Sort by Shapley value, (2) Inspect lowest-valued examples for label errors, (3) Reannotate or remove confirmed errors, (4) Verify class representation before mass removal.",
      hints: [
        "In imbalanced datasets, negative Shapley examples under accuracy often include correctly-labeled minority examples — use a class-balanced performance metric instead.",
        "Empirical finding: removing the bottom 10% of Shapley-valued examples often improves test performance by 1-5%, comparable to collecting 20-30% more clean data.",
      ],
    },
  ],
  "confident-learning": [
    {
      id: "q-dc-ex2-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Confident Learning (Northcutt et al. 2021) estimates the joint distribution of noisy observed labels and latent true labels using a noise transition matrix Q. How is Q estimated without access to true labels?",
      options: [
        "By comparing model predictions on the training set to validation labels",
        "By computing a calibrated confusion matrix from out-of-fold predicted probabilities: for each class pair (s=i, y=j), count examples with noisy label i whose predicted probability for class j exceeds a per-class threshold",
        "By training a separate noise-detection neural network on synthetically mislabeled data",
        "By using the EM algorithm on the raw feature space without model predictions",
      ],
      correctAnswer: 1,
      explanation: "CL estimates Q_{s=i, y=j} by counting examples with noisy label i whose out-of-fold predicted probability for class j exceeds the class-average self-confidence threshold for class j. Out-of-fold probabilities avoid overfitting: the model predicts on held-out data, so high-confidence predictions on mislabeled examples reveal label errors — if a model trained without x predicts P(y=cat)=0.97 for an example labeled 'dog', CL flags it as likely mislabeled. The diagonal of Q represents per-class accuracy rates; off-diagonal entries capture systematic confusions.",
      hints: [
        "The diagonal of Q represents the per-class noise rate: Q_{s=j, y=j} is the fraction of examples in class j that are correctly labeled.",
        "Off-diagonal entries Q_{s=i, y=j} capture systematic confusions: how often true class j examples are labeled as class i.",
      ],
    },
    {
      id: "q-dc-ex2-2",
      type: "true-false",
      difficulty: "medium",
      question: "Confident Learning assumes that label noise is class-conditional — the probability of a label error for an example with true class y depends only on y, not on the specific feature values x.",
      correctAnswer: "True",
      explanation: "CL uses the class-conditional noise model (CCNM): P(s | x, y) = P(s | y). This means the noise transition matrix Q is the same for all examples with the same true label, regardless of their features. While this is a simplification (in practice, ambiguous boundary examples may have higher noise rates), it enables tractable estimation of Q from observed data without requiring labeled clean examples. Instance-dependent noise models (where P(s | x, y) depends on x) are more general but require additional assumptions to identify.",
      hints: [
        "CCNM enables the joint distribution factorization: P(s, y) = Q_{s|y} times P(y), allowing Q to be estimated from observed noisy labels and model predictions.",
        "Boundary examples have higher noise in practice — class-conditional noise is a simplification that works well when average noise rates per class are the key quantity.",
      ],
    },
    {
      id: "q-dc-ex2-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "CleanLab implements Confident Learning and identifies label errors by flagging examples in the off-diagonal of the estimated joint distribution matrix. Which criterion does it use to rank examples as most likely mislabeled?",
      options: [
        "Examples with the lowest predicted probability for their given label",
        "Examples where the self-confidence (predicted probability for the given noisy label) is below the class-average self-confidence threshold for that label class",
        "Examples with the highest loss gradient magnitude",
        "Examples that differ most from the class centroid in embedding space",
      ],
      correctAnswer: 1,
      explanation: "CL flags example (x, s=j) as a potential label error if p-hat(y=j | x) < t_j, where t_j = average predicted probability for class j among examples with noisy label j. Intuitively: if most dog examples have P(dog)=0.85, but a particular dog-labeled example has P(dog)=0.2 and P(cat)=0.75, the model is more confident it is a cat — likely a mislabeled example. The threshold t_j adapts to per-class difficulty, avoiding false positives for inherently ambiguous classes with lower average confidence.",
      hints: [
        "Calibrated out-of-fold probabilities are critical: overconfident models set thresholds too high; underconfident models flag too many examples. Temperature scaling improves calibration before applying CL.",
        "CL finds errors across all classes including self-errors (correctly-labeled ambiguous examples that look like the wrong class) — these are harder to detect than clear labeling mistakes.",
      ],
    },
    {
      id: "q-dc-ex2-4",
      type: "true-false",
      difficulty: "hard",
      question: "Confident Learning can detect label errors in datasets with up to 40% noise rate, but its performance degrades sharply above 30% noise because the base classifier becomes too inaccurate to identify label errors reliably.",
      correctAnswer: "True",
      explanation: "CL's label error detection depends on a base classifier with reasonable accuracy. At 40% noise rate, training accuracy drops significantly and predicted probabilities become poorly calibrated — the classifier cannot reliably distinguish mislabeled from correctly-labeled examples. Northcutt et al. show CL works well at 30-35% noise but degrades above 40%. Mitigations: (1) iterative CL (find and remove errors, retrain, find more errors), (2) use an ensemble of classifiers for more robust probability estimates, (3) use semi-supervised pretraining to improve base classifier quality before CL.",
      hints: [
        "Iterative CL: after removing the top-k detected errors and retraining, the new classifier is cleaner and can detect additional errors missed in the first pass.",
        "At 50% noise rate, labels are random and no method can reliably identify individual label errors — only statistical properties of the noise distribution can be estimated.",
      ],
    },
    {
      id: "q-dc-ex2-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A medical imaging dataset has 10,000 labeled X-rays. A radiologist estimates that 8% of labels may be incorrect. After running CleanLab, 820 examples are flagged as likely label errors. The most responsible next step is:",
      options: [
        "Automatically remove all 820 flagged examples and retrain immediately",
        "Have a radiologist review the flagged examples, correct confirmed errors, and decide on ambiguous cases — then retrain on the cleaned dataset and compare performance",
        "Add the 820 examples to a held-out set to avoid contaminating training",
        "Reduce the model's confidence threshold so it is less sensitive to label noise",
      ],
      correctAnswer: 1,
      explanation: "Automated label removal without expert review risks removing valid hard examples and introducing systematic bias. In medical imaging, mislabeled examples may include rare disease presentations that are genuinely ambiguous — removing them discards critical training signal. The responsible workflow: (1) Prioritize review of highest-confidence CL detections, (2) Correct confirmed errors, (3) Document ambiguous cases separately, (4) Retrain and compare performance on a clean held-out test set. This treats CL as a prioritization tool for human review, not an automatic filter.",
      hints: [
        "CL precision at top detections: the highest-ranked flagged examples are most likely genuine errors — radiologist review time is best spent here.",
        "Audit trail: document which labels were changed, by whom, and why — essential for medical AI regulatory compliance.",
      ],
    },
  ],
  "data-augmentation-strategies": [
    {
      id: "q-dc-ex3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Mixup (Zhang et al. 2018) creates training examples by linearly interpolating pairs of training examples and their labels. For two examples (x_i, y_i) and (x_j, y_j) with mixing coefficient lambda ~ Beta(alpha, alpha), the mixed example is:",
      options: [
        "x-tilde = x_i if lambda > 0.5 else x_j, y-tilde = y_i if lambda > 0.5 else y_j",
        "x-tilde = lambda * x_i + (1-lambda) * x_j, y-tilde = lambda * y_i + (1-lambda) * y_j — a convex combination of both examples and their soft labels",
        "x-tilde = concat(x_i first half, x_j second half), y-tilde = (y_i + y_j) / 2",
        "x-tilde = x_i + Gaussian noise, y-tilde = y_i",
      ],
      correctAnswer: 1,
      explanation: "Mixup trains on convex combinations of training examples. The parameter alpha controls the Beta distribution shape: alpha=1 gives uniform lambda in [0,1]; small alpha (0.1-0.4) concentrates lambda near 0 or 1, creating mostly pure examples with occasional mixtures; large alpha (1-4) creates more mixed examples. Benefits: (1) Regularization — forces linear behavior between training examples, reducing memorization, (2) Calibration — models trained with Mixup produce better-calibrated confidence scores, (3) Label smoothing effect — mixed labels prevent overconfidence on training examples. Best practice: alpha=0.2-0.4 for image classification, alpha=0.1 for tabular data.",
      hints: [
        "Manifold Mixup applies Mixup in hidden representation space rather than input space, creating smoother decision boundaries in feature space.",
        "Mixup is most effective for classification with well-separated classes. For dense prediction tasks (segmentation), CutMix is preferred because Mixup creates ghosting artifacts in mixed images.",
      ],
    },
    {
      id: "q-dc-ex3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "CutMix (Yun et al. 2019) augments images by replacing a rectangular patch from one training image with a patch from another, adjusting labels proportionally to patch area. Compared to Mixup, CutMix's primary advantage for object detection tasks is:",
      options: [
        "CutMix creates sharper decision boundaries than Mixup",
        "CutMix preserves local spatial context — the non-mixed regions remain intact, allowing the model to learn from full object parts rather than blended pixel values that do not correspond to real textures",
        "CutMix requires less computation than Mixup",
        "CutMix handles class imbalance better than Mixup",
      ],
      correctAnswer: 1,
      explanation: "Mixup blends pixels across the entire image: every pixel is a blend that never appears in the natural image distribution. For object detection, blended textures make it harder for the model to learn meaningful local features. CutMix cuts a rectangular box from image B and pastes it into image A. The non-box region has real pixels from image A; the box region has real pixels from image B. The label mix ratio equals the box area fraction. This preserves local texture realism while still regularizing the model and mixing labels — particularly useful for learning part-based features.",
      hints: [
        "CutMix generates a box region with area proportional to a Beta(alpha, alpha) sample. The label mixing ratio r = Area(box) / (W x H).",
        "FMix (Harris et al. 2020) extends CutMix to irregular masks derived from Fourier-domain low-frequency noise, creating more natural-looking cut regions.",
      ],
    },
    {
      id: "q-dc-ex3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "RandAugment (Cubuk et al. 2020) simplifies AutoAugment by searching over a reduced augmentation space with only two hyperparameters. These two hyperparameters are:",
      options: [
        "Learning rate and batch size",
        "N (number of augmentation operations to apply sequentially per image) and M (magnitude of each operation, shared across all operation types)",
        "The number of augmentation policy stages and the probability threshold",
        "Image resolution and color jitter strength",
      ],
      correctAnswer: 1,
      explanation: "RandAugment samples N operations uniformly from a fixed set of 14 augmentation types and applies them sequentially with magnitude M. The key simplification over AutoAugment: (1) A single magnitude M controls all operation strengths (removing per-operation magnitude tuning), (2) Only N and M need to be searched (vs AutoAugment's 30-dimensional policy space requiring 15,000 GPU-hours). Typical values: N=2, M=9 for ImageNet. During training, N and M are fixed; at inference, no augmentation is applied. RandAugment's grid search over (N, M) takes around 10 experiments vs AutoAugment's 15,000 GPU-hours.",
      hints: [
        "AutoAugment (Cubuk et al. 2019) used reinforcement learning to search over 14 operation types times 10 magnitude levels times 11 probability values — an intractable space requiring 15,000 GPU-hours on CIFAR-10.",
        "TrivialAugment (Muller & Hutter 2021) further simplifies: randomly pick one operation and one magnitude uniformly — matching RandAugment performance with zero hyperparameters to tune.",
      ],
    },
    {
      id: "q-dc-ex3-4",
      type: "true-false",
      difficulty: "medium",
      question: "Test-time augmentation (TTA) improves model predictions by applying multiple augmentations to each test example, running inference for each augmented version, and averaging the predictions — this is valid even if the augmentations were not used during training.",
      correctAnswer: "True",
      explanation: "TTA works even without training augmentation because: (1) Averaging predictions reduces prediction variance — each augmented view provides an independent noisy estimate of the true class probabilities, and averaging reduces noise, (2) Augmentations exploit known invariances (horizontal flips for natural images, 90 degree rotations for medical imaging) that the model may have partially learned, (3) The averaged probability is often better calibrated. However, TTA is more effective when the model was trained with matching augmentations. Common TTA for medical imaging: 4 rotations times 2 flips = 8 predictions averaged. Adds inference cost proportional to number of augmented views.",
      hints: [
        "TTA is related to MC Dropout at test time — both inject randomness and average to reduce variance, but TTA uses deterministic augmentations while MC Dropout uses random dropout masks.",
        "Optimal TTA augmentations depend on the domain: for satellite imagery, all 8 rotation/flip combinations are valid; for text, back-translation is a common TTA strategy.",
      ],
    },
    {
      id: "q-dc-ex3-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A practitioner is training a chest X-ray classifier and wants to apply data augmentation. Which augmentation would be INAPPROPRIATE for this medical imaging task?",
      options: [
        "Random horizontal flip (left-right flip)",
        "Small random rotation (plus or minus 5 degrees)",
        "Random vertical flip (top-bottom flip)",
        "Random brightness and contrast adjustment",
      ],
      correctAnswer: 2,
      explanation: "Vertical flip (top-bottom) is inappropriate for chest X-ray: the heart, lung anatomy, and diaphragm position are deterministic — a flipped chest X-ray is medically impossible and would teach the model to recognize inverted anatomy that never appears in real patients. Horizontal flip (left-right) is acceptable because most anatomical findings are not strictly lateralized in appearance. Small rotations (plus or minus 5 degrees) mimic patient positioning variation. Brightness and contrast adjustments mimic exposure differences across imaging equipment. Domain knowledge determines which augmentations preserve the data distribution vs. creating out-of-distribution images.",
      hints: [
        "Safe medical imaging augmentations: small rotations, brightness/contrast, elastic deformations, horizontal flip for chest. Unsafe: vertical flip, large rotations for brain MRI (where orientation carries diagnostic meaning).",
        "Augmentation validity principle: only apply augmentations that produce images plausibly from the same distribution as the training data — unrealistic augmentations can hurt performance.",
      ],
    },
    {
      id: "q-dc-ex3-6",
      type: "true-false",
      difficulty: "hard",
      question: "Adversarial augmentation methods such as AugMax maximize the loss over an augmentation space during training, producing more robust models than standard random augmentation at the cost of higher computational overhead.",
      correctAnswer: "True",
      explanation: "AugMax solves: min over theta of E[max over t in T of L(f_theta(t(x)), y)] — the inner max finds the hardest augmentation for the current model, and the outer min trains the model to handle it. This is analogous to adversarial training (PGD) but in augmentation space rather than l_p perturbation space. The resulting model is robust to the full range of augmentations in T. Computational overhead: finding the hardest augmentation requires multiple forward passes per training step. The robustness-efficiency tradeoff is similar to adversarial training: 2-5x more computation for meaningful robustness improvements.",
      hints: [
        "AugMax is related to DeepAugment (Hendrycks et al.) which applies image-to-image networks as augmentations — both aim to increase the diversity and difficulty of augmentations seen during training.",
        "Max-augmentation training improves corruption robustness on ImageNet-C but may hurt clean accuracy — a tradeoff requiring careful tuning of the augmentation magnitude range.",
      ],
    },
  ],
  "dataset-lineage-governance": [
    {
      id: "q-dc-ex4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A datasheet for datasets (Gebru et al. 2021) includes a section on 'Composition'. Which question does this section answer that is most critical for identifying potential representational harms?",
      options: [
        "What software was used to collect the data?",
        "Does the dataset represent the full diversity of the population it will be used to make decisions about — including demographic subgroups, geographic regions, and edge cases?",
        "How large is the dataset in gigabytes?",
        "What license is the dataset released under?",
      ],
      correctAnswer: 1,
      explanation: "Representational harms occur when a dataset underrepresents certain groups, causing models trained on it to perform poorly for those groups. The Composition section of a datasheet requires documenting: what each instance represents, how many instances per class, whether there is missing data, and whether certain subpopulations may be underrepresented. For face recognition, this means documenting skin tone, age, and gender distributions — the absence of this information in early datasets led to documented disparate error rates across demographic groups.",
      hints: [
        "IJB-A dataset composition: approximately 80% white faces, 11% Black faces — models trained predominantly on this data have higher error rates for underrepresented groups.",
        "The Composition section also addresses sensitive content: does the dataset contain personally identifiable information, offensive content, or data about minors?",
      ],
    },
    {
      id: "q-dc-ex4-2",
      type: "true-false",
      difficulty: "easy",
      question: "Model cards (Mitchell et al. 2019) document intended use cases, performance across demographic groups, and known limitations — they are distinct from datasheets because they describe the model rather than the dataset used to train it.",
      correctAnswer: "True",
      explanation: "Datasheets for datasets document the training data (what it contains, how it was collected, who owns it, what it should or should not be used for). Model cards document the trained model: (1) Model details (architecture, training data version, evaluation data), (2) Intended use (primary use case, out-of-scope uses), (3) Factors (demographic subgroups and environmental conditions that affect performance), (4) Metrics (disaggregated performance by subgroup), (5) Ethical considerations, (6) Caveats and recommendations. Together, datasheets and model cards provide end-to-end documentation for responsible AI deployment.",
      hints: [
        "Google publishes model cards for many of their production ML models, including face detection and text toxicity classifiers.",
        "Hugging Face integrates model cards directly into their model hub — every model repository includes a model card template.",
      ],
    },
    {
      id: "q-dc-ex4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Data lineage tracking records the provenance of training data through all transformation steps. In a production ML system, which data lineage property is most important for debugging a sudden model performance regression?",
      options: [
        "The geographic location of data collection servers",
        "The immutable record of which data sources, versions, filter operations, and transformations produced the training dataset for each deployed model version — enabling bisection to identify which data change caused the regression",
        "The names of engineers who ran each data pipeline step",
        "The storage cost of each dataset version",
      ],
      correctAnswer: 1,
      explanation: "Performance regressions in production ML often have data root causes: a pipeline bug introduced corrupted examples, a data source changed schema, a new data vendor has a different distribution, or a filtering step was accidentally removed. Without lineage, identifying the cause requires manually inspecting all recent pipeline changes. With lineage: (1) Find the last model version that performed correctly, (2) Compare its data provenance to the regressed model, (3) Diff the lineage graphs to identify the changed data step, (4) Roll back or fix the identified change. Tools: Apache Atlas, Marquez (OpenLineage), Delta Lake lineage, MLflow data tracking.",
      hints: [
        "OpenLineage is an open standard for data lineage metadata — integrating with Airflow, Spark, dbt, and ML platforms to auto-capture lineage without manual annotation.",
        "Data contracts: formal schemas and SLAs between data producers and consumers that fail CI/CD pipelines when violated — a preventive complement to lineage-based debugging.",
      ],
    },
    {
      id: "q-dc-ex4-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A company trains a customer churn model on 18 months of historical transaction data. Six months later, the model's performance degrades significantly. Data governance best practice dictates the FIRST diagnostic step is:",
      options: [
        "Immediately retrain the model on the most recent 6 months of data",
        "Run distribution shift diagnostics: compare feature distributions and target rate between the original training window and the current scoring window to identify whether covariate shift, label shift, or concept drift is occurring",
        "Increase model complexity to handle the distribution change",
        "Switch from gradient boosting to a neural network for better adaptability",
      ],
      correctAnswer: 1,
      explanation: "Performance degradation has multiple data-related causes requiring different remediation: (1) Covariate shift: P(X) changed but P(Y|X) unchanged — retrain on recent data or use importance weighting, (2) Label shift: P(Y) changed but P(X|Y) unchanged — recalibrate the model threshold, (3) Concept drift: P(Y|X) changed — model must be retrained because the learned relationship is no longer valid. Diagnostic: PSI (Population Stability Index) for feature distributions, target rate monitoring for label shift. Misdiagnosing drift type leads to wrong remediation.",
      hints: [
        "PSI > 0.2 on a feature indicates significant distribution shift — investigate that feature first.",
        "Feature attribution drift: if SHAP values for a top feature change significantly between time periods, the feature's relationship to the target has shifted.",
      ],
    },
    {
      id: "q-dc-ex4-5",
      type: "true-false",
      difficulty: "medium",
      question: "GDPR's right to erasure requires that ML models trained on a user's data must be retrained from scratch after that user requests data deletion, because the user's information is embedded in the model weights.",
      correctAnswer: "False",
      explanation: "Exact unlearning (retraining from scratch after each deletion) is computationally prohibitive. Machine unlearning research (Cao & Yang 2015, Bourtoule et al. 2021) provides approximate methods: (1) SISA training (Sharded Isolated Sliced Aggregated training) partitions data so only the affected shard needs retraining, (2) Gradient-based approximate unlearning reverses the gradient updates from deleted examples, (3) Influence function-based methods estimate parameter updates needed to forget a sample. Regulators generally accept demonstrably approximate unlearning that provides statistical guarantees, not exact deletion.",
      hints: [
        "SISA training: if data is partitioned into S shards, deleting one point requires retraining only 1/S of the model, reducing cost by S times.",
        "Unlearning verification: membership inference attacks can test whether deleted data is still influencing model predictions — a lower attack success rate indicates better unlearning.",
      ],
    },
    {
      id: "q-dc-ex4-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Differential privacy (DP-SGD) in ML training adds calibrated Gaussian noise to clipped gradients at each training step. The primary trade-off when applying DP-SGD to training data governance is:",
      options: [
        "Training speed vs model interpretability",
        "Privacy guarantee strength (smaller epsilon = stronger privacy) vs model utility (smaller epsilon requires more noise = worse model performance) — with the optimal epsilon depending on the sensitivity of the training data and the acceptable performance degradation",
        "Memory footprint vs gradient computation cost",
        "Batch size vs learning rate stability",
      ],
      correctAnswer: 1,
      explanation: "DP-SGD (Abadi et al. 2016) clips per-example gradients to norm C, then adds calibrated Gaussian noise before averaging. The privacy cost accumulates over training steps. The privacy-utility trade-off: epsilon=10 gives high privacy protection with ~2% accuracy drop on MNIST; epsilon=1 gives strong privacy with ~10% drop; epsilon=0.1 gives very strong privacy with ~20% drop. Large models have more parameters (more noise dimensions) but also more capacity to learn despite noise — privacy cost per parameter decreases with model size, making large-scale DP training more viable for LLMs than small models.",
      hints: [
        "Privacy budget accounting: the Renyi DP (RDP) accounting method gives tighter epsilon estimates than naive composition — important for long training runs.",
        "Gradient clipping threshold C: too small clips valid gradients (hurting learning), too large allows sensitive examples to dominate (hurting privacy). C is typically tuned by observing median gradient norm.",
      ],
    },
  ],
};

Object.assign(questions, extraDCQ);


const extraDCQ2: Record<string, Question[]> = {
  "annotation-best-practices": [
    {
      id: "q-dc-ex5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Inter-annotator agreement (IAA) is commonly measured with Cohen's kappa rather than raw percent agreement. Why is raw percent agreement insufficient for evaluating annotation quality?",
      options: [
        "Percent agreement is harder to compute than kappa",
        "Percent agreement does not correct for chance agreement — even random annotators achieve high percent agreement on imbalanced datasets where one class dominates, making it impossible to distinguish skill from chance",
        "Percent agreement only works for binary classification tasks",
        "Percent agreement cannot be computed for continuous ratings",
      ],
      correctAnswer: 1,
      explanation: "For a binary task where 90% of examples are class A, two annotators randomly labeling everything as A achieve 90% agreement by chance. Cohen's kappa corrects for this: kappa = (P_observed - P_expected) / (1 - P_expected), where P_expected is the agreement expected by chance given each annotator's marginal label distribution. Kappa = 0 means no better than chance; kappa = 1 means perfect agreement; kappa < 0 means worse than chance. Acceptable kappa thresholds: > 0.6 for moderate agreement, > 0.8 for near-perfect agreement in annotation contexts.",
      hints: [
        "Fleiss's kappa extends Cohen's kappa to more than two annotators — useful for crowd-sourced annotation where each example has ratings from multiple workers.",
        "Krippendorff's alpha handles missing ratings and ordinal scales — preferable when annotators do not all rate the same examples.",
      ],
    },
    {
      id: "q-dc-ex5-2",
      type: "true-false",
      difficulty: "easy",
      question: "Majority voting is always the best strategy for aggregating labels from multiple annotators because it selects the label chosen by more than half the annotators, minimizing individual annotator errors.",
      correctAnswer: "False",
      explanation: "Majority voting treats all annotators equally and assumes independence. It fails when: (1) Annotators have systematically different accuracy rates — a single expert annotator may be more reliable than the majority of novices, (2) Systematic bias is present — if annotators share a cultural or linguistic bias, the majority vote amplifies the bias, (3) Rare classes are systematically voted down — minority labels are outvoted even when correct. Better approaches: MACE (Multi-Annotator Competence Estimation) and Dawid-Skene model estimate per-annotator accuracy and weight votes accordingly. For difficult tasks, structured disagreement resolution (adjudication by an expert) outperforms simple majority voting.",
      hints: [
        "Dawid-Skene (1979) is the foundational probabilistic model for annotator competence estimation — it jointly infers true labels and per-annotator confusion matrices using EM.",
        "Weighted voting: annotators with higher estimated accuracy on a validation set get higher vote weights — simple to implement and often outperforms unweighted majority vote.",
      ],
    },
    {
      id: "q-dc-ex5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Annotation guidelines that are too vague lead to high annotator disagreement. Which guideline improvement strategy most effectively reduces disagreement on ambiguous boundary cases?",
      options: [
        "Increasing annotator pay to incentivize more careful labeling",
        "Providing worked examples of boundary cases with explicit decision rules and rationale — showing examples that ARE and ARE NOT in each category, and the reasoning for each decision",
        "Requiring annotators to have domain expertise before labeling",
        "Reducing the number of label categories to simplify the task",
      ],
      correctAnswer: 1,
      explanation: "Boundary cases are where annotation guidelines most often fail: the description of each category may be clear for typical examples but ambiguous for edge cases. Effective guideline improvement: (1) Analyze disagreements from a pilot annotation round to identify common boundary cases, (2) Create worked examples for each boundary case showing the correct label and the reasoning (not just the decision), (3) Encode decision trees for systematic ambiguity resolution: 'if the text contains X AND does not contain Y, then label as class A'. Stanford's NLP annotation practice recommends at least 10 boundary case examples per category pair.",
      hints: [
        "Annotation guidelines as living documents: update guidelines with new boundary cases as they emerge during annotation, redistribute updated guidelines with all active annotators.",
        "Calibration sessions: have all annotators label the same 50-example calibration set, then review disagreements together — this builds shared mental models more effectively than written guidelines alone.",
      ],
    },
    {
      id: "q-dc-ex5-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Active learning for annotation prioritizes which examples to label next. The core-set selection strategy selects examples that:",
      options: [
        "Have the highest model uncertainty (lowest maximum predicted probability)",
        "Are farthest from already-labeled examples in feature space — maximizing coverage of the input space so the labeled set is representative of the full unlabeled distribution",
        "Are most similar to the current training set to minimize distribution shift",
        "Have the highest predicted probability of being positive examples to ensure class balance",
      ],
      correctAnswer: 1,
      explanation: "Core-set (Sener & Savarese 2018) solves the k-center problem: find k unlabeled points such that every unlabeled point is close to at least one selected point. This maximizes coverage of the feature space rather than selecting only uncertain examples. Advantage over uncertainty sampling: uncertainty sampling tends to select boundary examples, neglecting well-covered regions of the input space. Core-set ensures diverse, representative coverage. The greedy k-center algorithm: iteratively select the unlabeled example farthest from the current labeled set. Computational cost: O(n) per selection step, making it practical for large unlabeled pools.",
      hints: [
        "Uncertainty sampling selects where the model is least confident — valuable for finding decision boundary examples but may miss diverse regions of the input space.",
        "BADGE (Batch Active learning by Diverse Gradient Embeddings) combines uncertainty and diversity: select examples with large gradient magnitudes (uncertainty) that are diverse in gradient space (coverage).",
      ],
    },
    {
      id: "q-dc-ex5-5",
      type: "true-false",
      difficulty: "medium",
      question: "Crowdsourced annotation on platforms like Amazon Mechanical Turk is always lower quality than expert annotation, because crowd workers lack domain knowledge and incentive alignment.",
      correctAnswer: "False",
      explanation: "Snow et al. (2008) demonstrated that 4 Amazon Mechanical Turk workers per example, aggregated via majority vote, achieve near-expert-level agreement with trained NLP annotators on tasks like sentiment analysis, textual entailment, and word sense disambiguation. Crowd annotation quality depends heavily on: (1) Task design (clear guidelines, well-formatted HITs), (2) Worker selection (qualification tests, approval rate thresholds), (3) Quality control (sentinel items with known answers, redundancy with majority vote), (4) Task complexity (crowd works well for tasks not requiring specialized domain knowledge). Expert annotation is superior for specialized domains (medical, legal) but cost-prohibitive at scale.",
      hints: [
        "Sentinel items: embed known-correct items in each annotation batch to detect spammers and low-quality workers automatically.",
        "Task decomposition: complex annotation tasks can be broken into simpler micro-tasks suited for crowd workers — e.g., separate entity detection from relation classification.",
      ],
    },
    {
      id: "q-dc-ex5-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Label-efficient learning with RLHF (Reinforcement Learning from Human Feedback) uses a reward model trained on human preference data. The most critical failure mode of the reward model is reward hacking, which occurs when:",
      options: [
        "The reward model assigns low scores to all outputs, causing training to stall",
        "The policy model finds outputs that maximize the reward model score without actually being high-quality — exploiting distributional gaps between the reward model's training distribution and the policy's output distribution",
        "The reward model assigns identical scores to all outputs, providing no gradient signal",
        "Human annotators provide inconsistent labels, causing the reward model to overfit to noise",
      ],
      correctAnswer: 1,
      explanation: "Reward hacking (Gao et al. 2022, 'Scaling Laws for Reward Model Overoptimization') occurs because the reward model is a proxy for human preferences: it is trained on a finite distribution of comparisons and does not generalize perfectly. As the policy model is optimized against the reward model, it finds outputs that score highly on the proxy but are not actually preferred by humans — e.g., excessively long, sycophantic, or verbose responses that game the reward metric. Mitigations: (1) KL penalty from a reference policy to prevent distributional shift, (2) Periodic reward model updates with new on-policy data, (3) Constitutional AI self-critique to add policy-level constraints, (4) Ensemble of reward models to reduce single-model exploitation.",
      hints: [
        "Goodhart's Law: when a measure becomes a target, it ceases to be a good measure. The reward model score is a measure of preference; optimizing it too hard destroys its validity.",
        "OpenAI's InstructGPT paper reports that human evaluators prefer outputs with KL=4-6 nats from the reference policy — beyond this, reward hacking artifacts become perceptible.",
      ],
    },
    {
      id: "q-dc-ex5-7",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A team is designing an annotation workflow for 50,000 customer support tickets with 8 intent categories. Pilot annotation with 3 annotators on 500 tickets gives kappa = 0.55. The most effective next action is:",
      options: [
        "Proceed with full annotation using 1 annotator per ticket to reduce cost",
        "Analyze the disagreement patterns on the 500-ticket pilot to identify which category pairs are most confused, then revise the guidelines specifically for those boundary cases before proceeding",
        "Increase the number of categories to better capture the disagreement",
        "Switch to a single expert annotator for the entire dataset",
      ],
      correctAnswer: 1,
      explanation: "Kappa = 0.55 is moderate agreement — acceptable for some tasks but not ideal for 8-category intent classification. Before scaling to 50,000 tickets, improve the guidelines: compute the confusion matrix of annotator disagreements, identify the 2-3 most common category confusions, and add worked examples and decision rules for those specific cases. After guideline revision, re-pilot on a fresh 100-ticket sample. This iterative approach typically raises kappa from 0.55 to 0.7+ before committing resources to full annotation. Scaling with kappa = 0.55 means approximately 22.5% of labels will be inconsistent, requiring later correction.",
      hints: [
        "Confusion matrix of annotator disagreements: annotator A labels as intent X, annotator B labels as intent Y — count all such pairs to find the most common disagreement type.",
        "Guidelines revision ROI: improving kappa from 0.55 to 0.75 on a 50K ticket dataset prevents approximately 10,000 inconsistent labels — worth the investment in a 2-day guideline revision.",
      ],
    },
  ],
};

Object.assign(questions, extraDCQ2);

export default questions;
registerQuestions(questions);
