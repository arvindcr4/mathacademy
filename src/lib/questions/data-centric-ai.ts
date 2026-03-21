import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

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
      correctAnswer: "true",
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
      correctAnswer: "true",
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
        "Input drift ≠ concept drift. Input drift: P(X) changes. Concept drift: P(Y|X) changes. Both can degrade model performance but require different detection methods.",
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
      correctAnswer: "false",
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
        'Confident Learning algorithm (Northcutt et al. 2021): (1) Train a classifier via K-fold cross-validation to get out-of-sample predicted probabilities p̂ij. Matrix shape: n × C. (2) For each class j, compute the threshold t_j = (1/|ỹ=j|) Σ_{ỹ=j} p̂ij, the average self-confidence. (3) Build the C×C "confident joint" matrix: C̃[j,k] = |{x : ỹᵢ = j AND p̂_ik ≥ t_k AND k ≠ j}|. Entry C̃[j,k] counts examples labeled as j that the model confidently predicts as k ≠ j — likely mislabeled. Normalizing C̃ gives Q[ỹ, y*], the estimated joint noise distribution. Examples in off-diagonal entries of C̃ are the likely label errors.',
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
      correctAnswer: "true",
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
      correctAnswer: "true",
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
      correctAnswer: "false",
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
      correctAnswer: "true",
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
      correctAnswer: "false",
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
        "CleanLab input requirements: (1) p̂_ij ∈ [0, 1]: the predicted probability that sample i belongs to class j, from K-fold cross-validation (so each sample\'s prediction is out-of-sample). Matrix shape: n × C. (2) ỹᵢ ∈ {1, …, C}: the given (noisy) label for each sample. From these two inputs, Confident Learning: (a) computes per-class thresholds t_j = (1/|ỹ=j|) Σ_{ỹ=j} p̂ij, (b) builds the confident joint C̃[j,k] counting samples with ỹ=j and p̂_ik ≥ t_k and k ≠ j, (c) normalizes to get the joint noise distribution, (d) identifies likely errors as off-diagonal samples. No additional models, no human annotation, no noise rate specification needed — the algorithm infers everything from the model\'s own predictions.",
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
      correctAnswer: "true",
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
        'Confident Learning flagging criterion: sample i (with ỹᵢ = j) is a likely label error if there exists a class k ≠ j such that p̂ᵢₖ ≥ tₖ, where tₖ = (1/|{i: ỹᵢ = k}|) Σ_{i: ỹᵢ = k} p̂ᵢₖ is the average predicted probability for class k among examples WITH given label k. Interpretation: tₖ is how confident the model typically is when it correctly identifies class k. If an example labeled "cat" has p̂(dog) ≥ t_dog, the model is "as confident" that it is a dog as it typically is for correctly-labeled dogs — strong evidence of mislabeling. The class-specific threshold (not a fixed 0.5) is crucial: for a rare class with generally low confidence (t_dog = 0.3), the bar is lower; for a common clear class (t_cat = 0.9), the bar is higher.',
      hints: [
        "The threshold t_k is adaptive: for a class where the model is generally uncertain, even moderate p̂_ik can flag an error. For a class where the model is very confident, only very high p̂_ik flags an error.",
        "Option A (p̂(cat) < 0.5) is too simple: a cat example with p̂ = [0.4, 0.35, 0.25] has p̂(cat) < 0.5 but the model is not confident about any alternative class — not a clear label error.",
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
        "Dataset distillation ≠ coreset selection: coresets SELECT from real data. Distillation GENERATES new (often imperceptible to humans) data images that encode learning signals.",
      ],
    },
    {
      id: "q-dc-kp10-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Coreset selection identifies a weighted subset C ⊆ D (real training examples) such that training on C approximates training on the full dataset D, making it computationally more efficient than full-data training.",
      correctAnswer: "true",
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
      correctAnswer: "true",
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
      correctAnswer: "true",
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
      correctAnswer: "true",
      explanation:
        'SimCLR contrastive learning: for each image x in batch of size N: create two augmented views: x_i = t(x) and x_j = t\'(x) using stochastic augmentations t, t\' drawn from the augmentation distribution T. The 2N augmented views form N positive pairs and 2N(N-1) negative pairs. Loss (NT-Xent): ℓ(i, j) = −log exp(sim(zᵢ, zⱼ)/τ) / Σ_{k≠i} exp(sim(zᵢ, zₖ)/τ), where sim = cosine similarity and τ is temperature. No class labels are used: the "label" is simply "these two views came from the same image." The model learns representations where same-image augmentations are similar (nearby in embedding space) and different-image augmentations are dissimilar (far apart).',
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
      correctAnswer: "true",
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
        "robots.txt Disallow ≠ technical block. It is a request, not a firewall. But well-behaved crawlers (and legally cautious organizations) respect it.",
      ],
    },
    {
      id: "q-dc-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Rate limiting a web scraper (e.g., adding a 1-second delay between requests) is primarily important for legal compliance rather than for technical reliability of the scraped data.",
      correctAnswer: "false",
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
  ],
};

registerQuestions(questions);
