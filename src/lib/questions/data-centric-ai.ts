import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'data-centric-philosophy': [
    {
      id: 'q-dc-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Data-Centric AI differs from Model-Centric AI primarily by:',
      options: [
        'Using larger neural networks while keeping the dataset fixed',
        'Systematically improving data quality and quantity while holding the model architecture fixed',
        'Replacing human-labeled data with synthetic data in all cases',
        'Focusing on post-training quantization rather than training data',
      ],
      correctAnswer: 1,
      explanation: 'Data-Centric AI prioritizes iterative improvement of the dataset (quality, consistency, coverage) as the primary lever for performance gains, rather than searching for better architectures or training procedures.',
      hints: [
        'Consider what changes between a model-centric and data-centric iteration cycle.',
        'Andrew Ng popularized this distinction — what does he argue is the bottleneck in most production ML?',
      ],
    },
    {
      id: 'q-dc-kp1-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In the data-centric AI paradigm, the training code and model architecture are typically held fixed while the dataset is iterated upon.',
      correctAnswer: 'true',
      explanation: 'Data-centric AI uses a controlled experimental setup where the model is fixed so that performance changes can be directly attributed to data improvements rather than architectural changes.',
      hints: [
        'Scientific control — what do you hold constant to understand the effect of data changes?',
        'If you change both the model and data simultaneously, can you tell which caused improvement?',
      ],
    },
    {
      id: 'q-dc-kp1-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which scenario is the strongest argument for adopting a data-centric approach over a model-centric one?',
      options: [
        'The team has access to the latest GPT-scale architecture but a small noisy dataset',
        'A large clean labeled dataset exists but no suitable architecture has been tried',
        'The model achieves 99% accuracy on the training set but 60% on production data',
        'The training pipeline is slow and needs optimization',
      ],
      correctAnswer: 0,
      explanation: 'When the dataset is small and noisy, improving data quality (cleaning, augmentation, better labeling) often yields larger gains than architecture search, making a data-centric approach most impactful.',
      hints: [
        'Where is the biggest bottleneck — the model\'s capacity or the signal in the data?',
        'A state-of-the-art model trained on noisy data often underperforms a simpler model trained on clean data.',
      ],
    },
  ],

  'data-quality-framework': [
    {
      id: 'q-dc-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which of the following is NOT typically considered a core dimension of data quality?',
      options: [
        'Accuracy (correctness of values)',
        'Completeness (absence of missing values)',
        'Consistency (uniformity across sources)',
        'Interpretability (human readability of features)',
      ],
      correctAnswer: 3,
      explanation: 'Standard data quality frameworks (ISO 25012, DAMA) include dimensions like accuracy, completeness, consistency, timeliness, and validity; interpretability is a model property, not a data quality dimension.',
      hints: [
        'Data quality dimensions describe the data itself, not how a model uses it.',
        'Think about what makes data trustworthy for downstream ML tasks.',
      ],
    },
    {
      id: 'q-dc-kp2-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Data validity refers to whether data values conform to defined formats, ranges, and business rules, independent of whether they are accurate.',
      correctAnswer: 'true',
      explanation: 'Validity checks syntactic and semantic constraints (e.g., age must be 0–120, dates in ISO format) without verifying that a value is factually correct — a valid value can still be inaccurate.',
      hints: [
        'Can a date field be valid (correct format) but inaccurate (wrong date)?',
        'Validity is about conformance to rules, not ground-truth correctness.',
      ],
    },
    {
      id: 'q-dc-kp2-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In a data quality assessment, "referential integrity" violations indicate:',
      options: [
        'Duplicate rows in the primary table',
        'Foreign key values in a child table that have no matching record in the parent table',
        'Missing values in required columns',
        'Statistical outliers in numerical feature distributions',
      ],
      correctAnswer: 1,
      explanation: 'Referential integrity requires that every foreign key value references an existing primary key in the referenced table; violations create "orphaned" records that can corrupt join-based feature engineering.',
      hints: [
        'Think about relational database relationships — what connects a child table to its parent?',
        'A customer_id in an orders table that does not exist in the customers table is an example.',
      ],
    },
  ],

  'label-quality': [
    {
      id: 'q-dc-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Label noise in supervised learning refers to:',
      options: [
        'Missing feature values in the training set',
        'Incorrect or inconsistent class labels assigned to training examples',
        'High variance in the model\'s predictions on the test set',
        'Noisy gradients during stochastic optimization',
      ],
      correctAnswer: 1,
      explanation: 'Label noise occurs when training examples are assigned wrong or inconsistent labels, which can mislead the learning algorithm and degrade model performance beyond what feature noise alone would cause.',
      hints: [
        'Label noise is distinct from feature noise — which part of the data pair (x, y) is affected?',
        'Think about what happens when a sentiment classifier is trained on mislabeled reviews.',
      ],
    },
    {
      id: 'q-dc-kp3-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Random (symmetric) label noise is generally more damaging to model performance than class-conditional (asymmetric) label noise at the same noise rate.',
      correctAnswer: 'false',
      explanation: 'Asymmetric/class-conditional noise — where errors are biased toward specific classes — is typically more harmful because it systematically distorts class boundaries, whereas symmetric noise is less biased and models can partially compensate.',
      hints: [
        'Symmetric noise adds uniform confusion; asymmetric noise creates directional bias.',
        'Think about which type shifts the decision boundary more consistently in a wrong direction.',
      ],
    },
    {
      id: 'q-dc-kp3-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Confident Learning (used in CleanLab) identifies label errors by:',
      options: [
        'Retraining the model multiple times with different random seeds and flagging unstable predictions',
        'Estimating the joint distribution of noisy and true labels using out-of-sample predicted probabilities',
        'Asking human annotators to re-label all examples below a confidence threshold',
        'Clustering feature representations and flagging points near cluster boundaries',
      ],
      correctAnswer: 1,
      explanation: 'Confident Learning characterizes the noise transition matrix by estimating the joint distribution P(ỹ, y*) from out-of-sample predicted probabilities (e.g., via cross-validation), then identifies likely mislabeled examples as those inconsistent with this matrix.',
      hints: [
        'The key insight is using the model\'s own probability outputs to infer which labels are wrong.',
        'Out-of-sample predictions avoid the in-sample confidence inflation of re-evaluating on training data.',
      ],
    },
  ],

  'data-augmentation-advanced': [
    {
      id: 'q-dc-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'MixUp data augmentation creates new training examples by:',
      options: [
        'Randomly cropping and flipping images',
        'Linearly interpolating between two training examples and their labels',
        'Adding Gaussian noise to input features',
        'Randomly erasing rectangular regions of an image',
      ],
      correctAnswer: 1,
      explanation: 'MixUp creates virtual training samples as convex combinations of pairs of examples: x̃ = λxᵢ + (1-λ)xⱼ and ỹ = λyᵢ + (1-λ)yⱼ, where λ ~ Beta(α, α), encouraging linear behavior between training examples.',
      hints: [
        'MixUp operates in the input (and label) space, not just input space.',
        'The resulting label is also a blend — not a hard label for one class.',
      ],
    },
    {
      id: 'q-dc-kp4-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'AutoAugment learns augmentation policies by searching over a discrete space of augmentation operations using reinforcement learning.',
      correctAnswer: 'true',
      explanation: 'AutoAugment uses a controller RNN trained with RL to search over augmentation policies (sequences of operations with magnitudes and probabilities), optimizing child model validation accuracy on a target dataset.',
      hints: [
        'Manual augmentation requires domain expertise — AutoAugment automates this search.',
        'Think about what the controller predicts and what reward signal it receives.',
      ],
    },
    {
      id: 'q-dc-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'CutMix differs from MixUp in that it:',
      options: [
        'Mixes features in the embedding space rather than the input space',
        'Replaces a rectangular region of one image with a patch from another image, with labels proportional to patch area',
        'Applies MixUp only to hard-to-classify examples identified by loss magnitude',
        'Combines augmentation with curriculum learning to schedule difficulty',
      ],
      correctAnswer: 1,
      explanation: 'CutMix pastes a rectangular region cut from one training image onto another, assigning mixed labels proportional to the area of each image; this preserves local semantic context better than pixel-wise blending in MixUp.',
      hints: [
        'Unlike MixUp, CutMix preserves locally coherent image regions rather than blending all pixels.',
        'The label mixing in CutMix is proportional to the ratio of pixel areas, not a single λ.',
      ],
    },
  ],

  'synthetic-data': [
    {
      id: 'q-dc-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A primary advantage of using synthetic data for training ML models is:',
      options: [
        'Synthetic data always has lower noise than real data',
        'It can provide unlimited labeled examples, including rare scenarios, without privacy constraints',
        'Models trained on synthetic data always outperform those trained on real data',
        'Synthetic data eliminates the need for data validation and quality checks',
      ],
      correctAnswer: 1,
      explanation: 'Synthetic data can be generated at scale with perfect labels, including long-tail scenarios (e.g., rare defects, dangerous driving events) that are difficult or unsafe to collect naturally, without privacy concerns.',
      hints: [
        'Think about how autonomous vehicle companies get training data for rare accident scenarios.',
        'Synthetic data\'s advantages relate to scale, coverage, and privacy — not inherent quality.',
      ],
    },
    {
      id: 'q-dc-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The "domain gap" in synthetic data refers to distributional differences between synthetic and real data that can hurt model performance when transferred to real-world deployment.',
      correctAnswer: 'true',
      explanation: 'Synthetic data often lacks the full richness, noise, and distribution of real-world data (e.g., perfect lighting in simulation vs. sensor noise in deployment), causing models trained on synthetic data to perform poorly on real inputs.',
      hints: [
        'Consider how computer graphics renderings differ from real camera images.',
        'Domain randomization and domain adaptation are techniques designed to bridge this gap.',
      ],
    },
    {
      id: 'q-dc-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'CTGAN generates synthetic tabular data by:',
      options: [
        'Sampling rows from a fitted multivariate Gaussian distribution',
        'Using a conditional GAN where the generator conditions on discrete column values to handle mixed data types',
        'Applying variational autoencoders to learn a continuous latent representation of table rows',
        'Bootstrapping rows from the original dataset with added Gaussian noise',
      ],
      correctAnswer: 1,
      explanation: 'CTGAN addresses the challenges of tabular data (mixed types, imbalanced categoricals) through a conditional generator that conditions on sampled categorical values and mode-specific normalization for continuous columns.',
      hints: [
        'Tabular data has categorical and continuous columns — how does a vanilla GAN struggle with that?',
        'The "conditional" in CTGAN refers to conditioning on which discrete category to generate.',
      ],
    },
  ],

  'active-learning-dc': [
    {
      id: 'q-dc-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The goal of active learning in the context of data-centric AI is to:',
      options: [
        'Train models without any labeled data using self-supervision',
        'Select the most informative unlabeled examples for annotation to maximize model improvement per label',
        'Automatically augment data using generative models',
        'Replace human annotators with model-generated pseudo-labels',
      ],
      correctAnswer: 1,
      explanation: 'Active learning queries an oracle (usually a human) to label the most informative examples from an unlabeled pool, achieving better performance with fewer labeled examples than random sampling.',
      hints: [
        'The key is "most informative" — which examples would tell the model the most it doesn\'t already know?',
        'Think about the annotation budget constraint that motivates active learning.',
      ],
    },
    {
      id: 'q-dc-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Uncertainty sampling in active learning selects examples for which the model has the highest prediction confidence.',
      correctAnswer: 'false',
      explanation: 'Uncertainty sampling selects examples where the model is least confident (e.g., predicted probability near 0.5 for binary classification), as these are most likely to be near the decision boundary and most informative for refining it.',
      hints: [
        'If the model is already very confident, does that example help improve the decision boundary?',
        'Uncertainty = ambiguity about the correct label — high or low confidence?',
      ],
    },
    {
      id: 'q-dc-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Core-set selection as an active learning strategy selects a subset of examples that:',
      options: [
        'Has the highest predicted uncertainty under the current model',
        'Maximally covers the feature space so the selected set is representative of the full unlabeled pool',
        'Minimizes the expected model change if labeled (BALD criterion)',
        'Maximizes the diversity of predicted label distributions',
      ],
      correctAnswer: 1,
      explanation: 'Core-set approaches (e.g., greedy k-center) select examples that minimize the maximum distance from any unlabeled point to its nearest labeled neighbor, ensuring the labeled set geometrically covers the full feature space.',
      hints: [
        'Core-set is a geometry-based approach — think about coverage rather than uncertainty.',
        'The greedy k-center problem: place k points to minimize the maximum distance from any data point to its nearest center.',
      ],
    },
  ],

  'curriculum-learning-dc': [
    {
      id: 'q-dc-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Curriculum learning in machine learning is inspired by:',
      options: [
        'The way GPUs process batches in parallel',
        'The human learning principle of starting with easy examples and gradually introducing harder ones',
        'The biological process of synaptic pruning in the brain',
        'The mathematical concept of convex curriculum sets',
      ],
      correctAnswer: 1,
      explanation: 'Curriculum learning (Bengio et al., 2009) is motivated by human and animal learning, where starting with simpler examples and progressively introducing harder ones has been shown to improve learning speed and final performance.',
      hints: [
        'Think about how teachers structure lessons — do they start with the hardest material?',
        'The word "curriculum" itself comes from educational theory.',
      ],
    },
    {
      id: 'q-dc-kp7-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Self-paced learning differs from curriculum learning in that the difficulty schedule is determined by the model\'s own loss rather than a predefined external ordering.',
      correctAnswer: 'true',
      explanation: 'Self-paced learning dynamically selects easy examples (low loss under the current model) early in training and gradually includes harder ones, whereas curriculum learning uses a fixed difficulty ordering determined before training.',
      hints: [
        'Who defines "difficulty" in each approach — an external curriculum designer or the model itself?',
        'Self-paced learning is adaptive; curriculum learning is predetermined.',
      ],
    },
    {
      id: 'q-dc-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In curriculum learning, which difficulty measure is most commonly used for text classification tasks?',
      options: [
        'Sentence length (shorter = easier)',
        'Normalized frequency of vocabulary tokens in the training corpus',
        'Loss or prediction confidence under a model trained on a random subset',
        'Euclidean distance of the example\'s embedding from the class centroid',
      ],
      correctAnswer: 2,
      explanation: 'Competence-based curriculum approaches estimate difficulty as the loss under an initial model checkpoint or a model trained on a random subsample; examples with lower loss are treated as easier and presented first.',
      hints: [
        'A model trained on little data still captures some signal — its loss on an example reflects how easy that example is.',
        'Think about what "easy" means operationally: a model should be able to learn the example quickly.',
      ],
    },
  ],

  'data-programming': [
    {
      id: 'q-dc-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In data programming (Snorkel), labeling functions (LFs) are:',
      options: [
        'Human annotators who label data on a crowdsourcing platform',
        'Programmatic heuristics that noisily assign labels to unlabeled examples',
        'Neural networks fine-tuned to produce soft labels',
        'Statistical tests that validate the quality of human-provided labels',
      ],
      correctAnswer: 1,
      explanation: 'Labeling functions are user-written programs (heuristics, patterns, distant supervision rules) that each weakly assign a label or abstain on examples; Snorkel combines their noisy outputs into probabilistic training labels.',
      hints: [
        'LFs encode domain knowledge programmatically — like "if the text contains \'excellent\', label it positive."',
        'Each LF may be wrong sometimes — how does Snorkel handle that?',
      ],
    },
    {
      id: 'q-dc-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Snorkel\'s label model treats labeling functions as independent when estimating their accuracies and the true label distribution.',
      correctAnswer: 'false',
      explanation: 'Snorkel\'s label model accounts for correlations between labeling functions using a dependency graph, avoiding the naive Bayes assumption of independence that would bias the estimated accuracies.',
      hints: [
        'If two LFs based on similar heuristics both fire together, assuming independence over-weights their joint evidence.',
        'Snorkel uses higher-order dependencies captured in a factor graph or similar structure.',
      ],
    },
    {
      id: 'q-dc-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The key advantage of data programming over full manual annotation is:',
      options: [
        'It produces perfectly accurate labels without any human involvement',
        'Writing labeling functions takes less expert time than labeling every example, and can scale to millions of unlabeled examples',
        'The resulting model always outperforms one trained on human-labeled data',
        'It eliminates the need to define the label schema beforehand',
      ],
      correctAnswer: 1,
      explanation: 'Writing a few labeling functions that encode domain knowledge (hours of expert time) can generate weak labels for millions of examples, dramatically reducing annotation cost compared to labeling each example individually.',
      hints: [
        'A domain expert can write an LF in minutes; labeling a million examples individually takes much longer.',
        'Think about the scalability argument — expert time is the bottleneck, not unlabeled data.',
      ],
    },
  ],

  'cleanlab': [
    {
      id: 'q-dc-kp9-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'CleanLab\'s Confident Learning algorithm requires which input to identify label errors?',
      options: [
        'A second model trained on a different random seed',
        'Out-of-sample predicted class probabilities from a model trained via cross-validation',
        'Human re-annotation of all examples with uncertain predictions',
        'A noise transition matrix provided by domain experts',
      ],
      correctAnswer: 1,
      explanation: 'Confident Learning uses out-of-sample (cross-validated) predicted probabilities to estimate the joint distribution of noisy given labels and true labels, without requiring a separate model or expert-defined noise rates.',
      hints: [
        'Out-of-sample predictions prevent overfitting from inflating confidence on training examples.',
        'The algorithm uses these probabilities to find examples whose predicted class strongly disagrees with their given label.',
      ],
    },
    {
      id: 'q-dc-kp9-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'CleanLab can be applied to any classification dataset regardless of model architecture or modality.',
      correctAnswer: 'true',
      explanation: 'CleanLab requires only a matrix of predicted probabilities and the given labels, making it model- and modality-agnostic — any classifier that outputs class probabilities can be used as the underlying model.',
      hints: [
        'CleanLab is post-hoc — it operates on probabilities, not model internals.',
        'Think about whether the method cares whether predictions came from a CNN, transformer, or logistic regression.',
      ],
    },
    {
      id: 'q-dc-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In Confident Learning, an example is flagged as a likely label error when:',
      options: [
        'Its predicted probability for the given class falls below 0.5',
        'Its predicted probability for another class exceeds the per-class threshold derived from the noise rate estimate',
        'Its loss during training is consistently higher than the average loss',
        'Multiple labeling functions disagree on its label in a weak supervision setup',
      ],
      correctAnswer: 1,
      explanation: 'Confident Learning thresholds predicted probabilities per class (using class-conditional average predicted probabilities), flagging an example as mislabeled when its predicted probability for an alternative class exceeds the threshold for that class.',
      hints: [
        'The threshold is class-specific, not a fixed 0.5 — why does that matter?',
        'An example assigned label A but confidently predicted as label B by the cross-validated model is suspicious.',
      ],
    },
  ],

  'dataset-distillation': [
    {
      id: 'q-dc-kp10-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Dataset distillation (Wang et al., 2018) aims to:',
      options: [
        'Compress a neural network by distilling its knowledge into a smaller model',
        'Synthesize a tiny dataset such that a model trained on it matches performance of one trained on the full dataset',
        'Select the most representative subset of the training data using clustering',
        'Distill label noise from a dataset by estimating the noise transition matrix',
      ],
      correctAnswer: 1,
      explanation: 'Dataset distillation meta-learns a small synthetic dataset (e.g., 1 image per class) by optimizing the synthetic data via bilevel optimization so that models trained on it perform nearly as well as those trained on the full real dataset.',
      hints: [
        'This is different from coreset selection — the distilled examples are synthesized, not selected.',
        'Think about bilevel optimization: the outer loop optimizes synthetic data, the inner loop trains a model on it.',
      ],
    },
    {
      id: 'q-dc-kp10-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Coreset selection identifies a weighted subset of the training data such that training on the subset approximates training on the full dataset.',
      correctAnswer: 'true',
      explanation: 'Coreset selection finds a subset (with optional per-example weights) that preserves key properties of the full dataset — such as gradient similarity or loss landscape geometry — enabling efficient training with minimal performance loss.',
      hints: [
        'Coresets are selected from the existing data, unlike dataset distillation which generates new data.',
        'The goal is to approximate the full-data training outcome with much less computation.',
      ],
    },
    {
      id: 'q-dc-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Distribution Matching as a dataset distillation objective works by:',
      options: [
        'Minimizing the KL divergence between the training and distilled label distributions',
        'Matching the statistics of feature distributions (e.g., via MMD) between real and synthetic data',
        'Aligning the gradient directions produced by real and synthetic batches',
        'Matching the loss landscape curvature between models trained on real and synthetic data',
      ],
      correctAnswer: 2,
      explanation: 'Gradient matching (DC, MTT) and related objectives directly align the parameter update directions produced by synthetic and real data batches, ensuring that training on synthetic data causes similar weight updates as training on real data.',
      hints: [
        'Option C describes gradient matching — is that the same as distribution matching?',
        'Distribution Matching (DM) specifically matches feature distribution statistics, not gradients — revisit the options.',
      ],
    },
  ],

  'data-valuation': [
    {
      id: 'q-dc-kp11-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Data Shapley assigns value to each training example based on:',
      options: [
        'Its loss value relative to the average training loss',
        'Its marginal contribution to model performance, averaged over all possible subsets of the training data',
        'The frequency with which a data point appears in bootstrap samples during training',
        'The gradient magnitude it produces during the final training epoch',
      ],
      correctAnswer: 1,
      explanation: 'Data Shapley adapts the Shapley value from cooperative game theory to data valuation, averaging the marginal contribution of each data point across all possible coalitions (subsets) of training data — providing a fair and axiomatic attribution.',
      hints: [
        'Shapley values from game theory measure fair contribution — what is the "game" here?',
        'Marginal contribution = performance with vs. without the data point, over all possible subsets.',
      ],
    },
    {
      id: 'q-dc-kp11-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Exact Data Shapley computation is tractable for datasets with thousands of examples because the number of subsets grows polynomially.',
      correctAnswer: 'false',
      explanation: 'Exact Shapley computation requires evaluating 2ⁿ subsets, which is exponential in the dataset size; practical methods use Monte Carlo approximations or KNN-based shortcuts to estimate Shapley values tractably.',
      hints: [
        'How many subsets does a dataset of n=20 examples have? 2²⁰ ≈ 1 million.',
        'Think about why Shapley values require approximation in practice.',
      ],
    },
    {
      id: 'q-dc-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'DVRL (Data Valuation using Reinforcement Learning) learns data values by training a value estimator that:',
      options: [
        'Predicts the loss reduction caused by removing each training example',
        'Selects training data subsets and receives a reward based on validation performance of a model trained on the subset',
        'Estimates gradient influence scores using implicit differentiation',
        'Ranks training examples by their cosine similarity to validation examples',
      ],
      correctAnswer: 1,
      explanation: 'DVRL uses a data value estimator (DVE) trained with RL: it selects weighted subsets of training data, a predictor model is trained on the selected subset, and the predictor\'s validation performance serves as the reward signal for updating the DVE.',
      hints: [
        'DVRL is model-agnostic and uses RL to learn which examples are valuable — what is the reward?',
        'Think about the bilevel structure: outer loop learns data values, inner loop trains the predictor.',
      ],
    },
  ],

  'semi-supervised-dc': [
    {
      id: 'q-dc-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Pseudo-labeling in semi-supervised learning works by:',
      options: [
        'Generating synthetic labeled examples using a generative model',
        'Using the model\'s own high-confidence predictions on unlabeled data as training labels',
        'Querying human annotators for labels on uncertain examples',
        'Transferring labels from a related source domain',
      ],
      correctAnswer: 1,
      explanation: 'Pseudo-labeling assigns the model\'s argmax prediction as a "pseudo-label" for unlabeled examples where confidence exceeds a threshold, then includes these pseudo-labeled examples in subsequent training iterations.',
      hints: [
        'The model labels its own unlabeled data — what risk does this introduce?',
        'High confidence threshold selection is critical to avoid propagating errors.',
      ],
    },
    {
      id: 'q-dc-kp12-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The consistency regularization principle in semi-supervised learning assumes that a model\'s predictions should be invariant to small perturbations of unlabeled inputs.',
      correctAnswer: 'true',
      explanation: 'Consistency regularization (used in Pi-model, Mean Teacher, UDA, FixMatch) penalizes models for producing different predictions on perturbed versions of the same unlabeled input, enforcing smooth decision boundaries through unlabeled data.',
      hints: [
        'A robust model should predict the same class whether an image is slightly rotated or not.',
        'Consistency regularization does not require knowing the true label — only that predictions should be stable.',
      ],
    },
    {
      id: 'q-dc-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'FixMatch combines pseudo-labeling and consistency regularization by:',
      options: [
        'Applying pseudo-labels from weakly augmented views to train on strongly augmented versions of the same image',
        'Averaging predictions from multiple models to generate more reliable pseudo-labels',
        'Using a teacher-student framework where the teacher\'s exponential moving average produces pseudo-labels',
        'Applying consistency regularization only to labeled examples to avoid noise from unlabeled data',
      ],
      correctAnswer: 0,
      explanation: 'FixMatch generates pseudo-labels from weakly augmented unlabeled images (using argmax if confidence exceeds threshold), then trains the model to match these pseudo-labels on strongly augmented versions of the same image, leveraging both pseudo-labeling and consistency.',
      hints: [
        'FixMatch uses two augmentation strengths — weak for generating labels, strong for training.',
        'Think about why using a weakly augmented view for pseudo-label generation is more reliable.',
      ],
    },
  ],

  'self-supervised-dc': [
    {
      id: 'q-dc-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Self-supervised learning generates training signals by:',
      options: [
        'Having human annotators label a small portion of the data',
        'Defining pretext tasks from the unlabeled data structure itself, without external labels',
        'Distilling knowledge from a larger supervised model',
        'Augmenting labeled data with synthetic examples',
      ],
      correctAnswer: 1,
      explanation: 'Self-supervised learning creates supervision from the data itself — for example, predicting masked tokens, image patches, or future frames — without requiring manual labels, enabling learning from large unlabeled corpora.',
      hints: [
        'The "self" refers to the data providing its own labels through structure-based pretext tasks.',
        'BERT\'s masked language modeling and contrastive image learning (SimCLR) are examples.',
      ],
    },
    {
      id: 'q-dc-kp13-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Contrastive self-supervised methods like SimCLR rely on class labels to define positive and negative pairs.',
      correctAnswer: 'false',
      explanation: 'SimCLR defines positive pairs as two augmented views of the same image (no labels needed) and negatives as views from different images in the same batch, learning representations without any annotation.',
      hints: [
        'SimCLR is self-supervised — if it used class labels, it would be supervised or semi-supervised.',
        'Think about how "same image, different augmentation" creates a positive pair without labels.',
      ],
    },
    {
      id: 'q-dc-kp13-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Masked Autoencoders (MAE) achieve data efficiency in vision self-supervised learning primarily through:',
      options: [
        'Applying aggressive color jitter augmentation during pretraining',
        'Masking a large fraction (~75%) of image patches and reconstructing them, forcing the model to learn rich representations',
        'Using contrastive loss to push apart different image representations',
        'Distilling representations from a CLIP model trained on image-text pairs',
      ],
      correctAnswer: 1,
      explanation: 'MAE masks ~75% of random image patches and trains a transformer encoder-decoder to reconstruct masked pixels, creating a challenging pretext task that forces learning of meaningful spatial and semantic representations without label supervision.',
      hints: [
        'High masking ratio makes the task hard enough to prevent trivial interpolation shortcuts.',
        'Think about what the model must "understand" about an image to reconstruct 75% of it from 25%.',
      ],
    },
  ],

  'few-shot-data': [
    {
      id: 'q-dc-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In few-shot learning, an N-way K-shot episode means:',
      options: [
        'N total examples are used across K different model architectures',
        'The model must classify among N classes, given K labeled support examples per class',
        'N augmentations are applied to K labeled training examples',
        'The model is trained for N epochs with K examples per batch',
      ],
      correctAnswer: 1,
      explanation: 'An N-way K-shot task presents N novel classes at test time, each with only K labeled support examples, requiring the model to generalize from very few examples per class.',
      hints: [
        'N-way = number of classes to distinguish; K-shot = labeled examples available per class.',
        'A 5-way 1-shot task is very hard — only one example per class to distinguish five classes.',
      ],
    },
    {
      id: 'q-dc-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Prototypical Networks for few-shot classification classify a query by finding the nearest class prototype in embedding space.',
      correctAnswer: 'true',
      explanation: 'Prototypical Networks compute a class prototype as the mean embedding of the K support examples for each class, then classify a query image by its distance to each prototype in the learned embedding space.',
      hints: [
        'The "prototype" is the centroid of support embeddings per class.',
        'Classification is done by nearest neighbor to class prototypes — not by a trained classifier.',
      ],
    },
    {
      id: 'q-dc-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Model-Agnostic Meta-Learning (MAML) learns an initialization for model parameters that:',
      options: [
        'Minimizes loss on all training tasks simultaneously',
        'Can be quickly fine-tuned to any new task with a small number of gradient steps',
        'Adapts the learning rate separately for each parameter based on task history',
        'Generates task-specific network architectures through neural architecture search',
      ],
      correctAnswer: 1,
      explanation: 'MAML meta-trains model parameters θ so that a few gradient steps on a new task\'s support set lead to good performance on that task\'s query set, optimizing for fast adaptation rather than direct task performance.',
      hints: [
        'MAML\'s outer loop optimizes for "good initialization" — good for what?',
        'The bilevel optimization: inner loop = task adaptation, outer loop = initialization update.',
      ],
    },
  ],

  'web-scraping-data': [
    {
      id: 'q-dc-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Robots.txt files on websites are relevant to web scraping because they:',
      options: [
        'Encrypt web content to prevent unauthorized access',
        'Specify which parts of a website crawlers are permitted or disallowed from accessing',
        'Rate-limit API requests to prevent denial of service',
        'Verify the identity of web scrapers through authentication',
      ],
      correctAnswer: 1,
      explanation: 'Robots.txt is a standard file that websites use to communicate crawling policies to bots, specifying paths that are allowed or disallowed; respecting robots.txt is both an ethical and legal consideration in web scraping.',
      hints: [
        'Robots.txt is publicly accessible at domain.com/robots.txt.',
        'Disallowed paths are not technically blocked but represent the site owner\'s preferences.',
      ],
    },
    {
      id: 'q-dc-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Common Crawl is a publicly available web corpus that provides petabytes of raw web page data, widely used as pretraining data for large language models.',
      correctAnswer: 'true',
      explanation: 'Common Crawl maintains a freely available archive of billions of web pages in WARC format, which has been extensively used (with filtering) to train models like GPT-3, LLaMA, and many others.',
      hints: [
        'Common Crawl crawls the entire web periodically — where does LLM training data often come from?',
        'The scale (petabytes) is only achievable through automated web crawling at internet scale.',
      ],
    },
    {
      id: 'q-dc-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When building a domain-specific ML dataset via web scraping, which technique best handles dynamic JavaScript-rendered content that is not present in the initial HTML response?',
      options: [
        'Increasing the HTTP request timeout to allow the server more rendering time',
        'Using a headless browser (e.g., Playwright, Selenium) that executes JavaScript before extracting content',
        'Sending a user-agent string that identifies the scraper as a legitimate browser',
        'Parsing the page\'s CSS stylesheets to infer dynamically rendered elements',
      ],
      correctAnswer: 1,
      explanation: 'Headless browsers fully execute JavaScript in a real browser engine, allowing the DOM to render completely before content extraction — necessary for SPAs and sites that load data via AJAX after the initial page load.',
      hints: [
        'Static HTML parsers (BeautifulSoup, lxml) only see the initial server response, not JS-rendered content.',
        'Playwright and Selenium control a real browser programmatically — what does that enable?',
      ],
    },
  ],

  'annotation-tools': [
    {
      id: 'q-dc-kp16-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Label Studio is an open-source annotation tool that supports:',
      options: [
        'Only image classification tasks',
        'Multi-modal annotation including text, image, audio, and video with customizable interfaces',
        'Automated labeling only, without human annotator support',
        'Only Named Entity Recognition (NER) annotation',
      ],
      correctAnswer: 1,
      explanation: 'Label Studio is a versatile open-source platform supporting annotation across modalities (text, images, audio, video, time series) with configurable labeling interfaces and ML-assisted pre-annotation.',
      hints: [
        'The tool is designed to be data-type agnostic through configurable templates.',
        'Think about a tool that needs to serve both NLP and computer vision annotation workflows.',
      ],
    },
    {
      id: 'q-dc-kp16-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Pre-annotation (model-assisted labeling) typically reduces annotation time but requires careful quality control to prevent annotators from accepting incorrect model suggestions without review.',
      correctAnswer: 'true',
      explanation: 'While pre-annotation accelerates labeling by providing model-generated suggestions, annotators may exhibit automation bias — accepting suggestions without critical review — which can systematically propagate model errors into the dataset.',
      hints: [
        'Automation bias is the tendency to over-rely on automated suggestions even when they are wrong.',
        'Think about what happens to annotation quality if all annotators just click "accept" on model suggestions.',
      ],
    },
    {
      id: 'q-dc-kp16-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Annotation guidelines play a critical role in maintaining dataset quality primarily by:',
      options: [
        'Automating the annotation process through rule-based labeling functions',
        'Defining the label schema, edge cases, and decision rules that enable consistent annotations across annotators',
        'Setting the payment rates for crowdsource annotators to ensure high effort',
        'Specifying the technical requirements for the annotation software platform',
      ],
      correctAnswer: 1,
      explanation: 'Comprehensive annotation guidelines define what each label means, how to handle ambiguous or edge cases, and provide worked examples — directly determining inter-annotator agreement and label consistency across a large annotator pool.',
      hints: [
        'Without guidelines, different annotators apply their own interpretations of label boundaries.',
        'Think about how clear vs. vague guidelines affect inter-annotator agreement (IAA).',
      ],
    },
  ],

  'data-governance': [
    {
      id: 'q-dc-kp17-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Data lineage in machine learning refers to:',
      options: [
        'The genetic ancestry of data collected from biological sources',
        'Tracking the origin, transformations, and movement of data through the ML pipeline',
        'The chronological order in which model versions were trained',
        'The list of features selected during preprocessing',
      ],
      correctAnswer: 1,
      explanation: 'Data lineage documents the full provenance of data — where it came from, how it was transformed, filtered, merged, and used — enabling debugging, reproducibility, and compliance with data regulations.',
      hints: [
        'If a deployed model makes a biased prediction, data lineage helps trace where that bias entered.',
        'Think about what you would need to know to reproduce a training dataset from scratch.',
      ],
    },
    {
      id: 'q-dc-kp17-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'GDPR\'s "right to erasure" poses a technical challenge for ML models because removing a training example may require retraining the model to remove its influence.',
      correctAnswer: 'true',
      explanation: 'GDPR\'s right to erasure means that upon a data subject\'s request, their data must be deleted — including from trained models; machine unlearning research addresses this challenge without requiring full retraining.',
      hints: [
        'A trained model\'s weights encode information from training data — is deletion just removing the training row?',
        'Machine unlearning aims to efficiently "forget" specific training examples from an already-trained model.',
      ],
    },
    {
      id: 'q-dc-kp17-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A data catalog in a large ML organization primarily serves to:',
      options: [
        'Store model weights and hyperparameter configurations for experiment tracking',
        'Provide a searchable inventory of available datasets with metadata, quality metrics, and access policies',
        'Automate the ETL pipeline for transforming raw data into model-ready features',
        'Enforce row-level security policies on database tables used for training',
      ],
      correctAnswer: 1,
      explanation: 'A data catalog (e.g., Amundsen, DataHub) indexes available datasets with rich metadata — schema, ownership, quality scores, lineage, sample statistics — enabling teams to discover, understand, and responsibly reuse data assets.',
      hints: [
        'Without a catalog, teams in large organizations repeatedly collect the same data independently.',
        'Think of a data catalog as a library catalog, but for datasets instead of books.',
      ],
    },
  ],

  'privacy-preserving-data': [
    {
      id: 'q-dc-kp18-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Differential privacy (DP) in machine learning provides a formal guarantee that:',
      options: [
        'No individual\'s data can be reconstructed from the trained model',
        'Adding or removing any single training example changes the model output by at most a bounded amount (controlled by ε)',
        'The model achieves equal accuracy across demographic groups',
        'Training data is encrypted and inaccessible to the model during training',
      ],
      correctAnswer: 1,
      explanation: 'ε-differential privacy bounds the influence of any single individual\'s data on the output distribution of a randomized algorithm, providing a mathematically rigorous privacy guarantee regardless of an adversary\'s auxiliary knowledge.',
      hints: [
        'DP is about limiting membership inference — can an adversary tell if your data was used?',
        'Smaller ε = stronger privacy but typically lower accuracy — think about the privacy-utility tradeoff.',
      ],
    },
    {
      id: 'q-dc-kp18-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Federated learning allows training on decentralized data without the raw data leaving its source device or silo.',
      correctAnswer: 'true',
      explanation: 'In federated learning, model updates (gradients or weights) rather than raw data are aggregated — the data remains on edge devices or institutional silos, reducing privacy risk from centralized data collection.',
      hints: [
        'Think about training a model on hospital patient data without the hospitals sharing patient records.',
        'What leaves the device in federated learning — data or model updates?',
      ],
    },
    {
      id: 'q-dc-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'DP-SGD adds differential privacy to neural network training by:',
      options: [
        'Encrypting gradients before transmitting them to a central aggregator',
        'Clipping per-sample gradients to bound their sensitivity and then adding calibrated Gaussian noise',
        'Replacing the loss function with a privatized surrogate objective',
        'Training on synthetic data generated by a differentially private GAN',
      ],
      correctAnswer: 1,
      explanation: 'DP-SGD (Abadi et al., 2016) clips each example\'s gradient to a maximum L2 norm (bounding sensitivity), adds Gaussian noise scaled to the clipping norm and privacy budget, then averages clipped+noisy gradients to update model weights.',
      hints: [
        'Clipping bounds the maximum influence any one example can have — how does noise then provide privacy?',
        'The two steps are: (1) limit gradient magnitude via clipping, (2) obscure it with calibrated noise.',
      ],
    },
  ],

  'deduplication-data': [
    {
      id: 'q-dc-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Near-duplicate detection in large text datasets is important for ML because:',
      options: [
        'Duplicate text inflates the dataset size metric without adding new information',
        'Models memorize duplicates disproportionately, which can hurt generalization and inflate benchmark scores if test data is duplicated in training',
        'Duplicates cause gradient explosion during training',
        'Near-duplicates always have conflicting labels that confuse the model',
      ],
      correctAnswer: 1,
      explanation: 'Frequent duplicates in training data cause models to memorize and over-represent those examples; additionally, if test benchmarks contain near-duplicates of training data, measured performance is inflated beyond true generalization.',
      hints: [
        'What does a model learn when it sees the same text hundreds of times?',
        'Lee et al. (2022) showed deduplication of C4 and The Pile significantly reduces memorization.',
      ],
    },
    {
      id: 'q-dc-kp19-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'MinHash LSH (Locality-Sensitive Hashing) enables approximate near-duplicate detection in O(n) time rather than the O(n²) pairwise comparison baseline.',
      correctAnswer: 'true',
      explanation: 'MinHash sketches reduce each document to a compact signature; LSH buckets documents so that near-duplicates likely share a bucket, enabling sub-quadratic deduplication on billion-scale datasets.',
      hints: [
        'Comparing every pair in a billion-document corpus is prohibitive — how does hashing help?',
        'LSH ensures similar documents are likely to hash to the same bucket without full comparison.',
      ],
    },
    {
      id: 'q-dc-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Semantic deduplication (SemDeDup) goes beyond MinHash by:',
      options: [
        'Using BM25 text similarity instead of n-gram Jaccard similarity',
        'Embedding documents and removing pairs with high cosine similarity in embedding space to eliminate semantically equivalent examples',
        'Applying rule-based filters to remove templated or boilerplate text',
        'Detecting and removing machine-translated duplicates of existing documents',
      ],
      correctAnswer: 1,
      explanation: 'SemDeDup embeds documents using a pre-trained encoder, then removes examples within clusters whose cosine similarity exceeds a threshold, eliminating semantically redundant content that n-gram methods miss due to paraphrasing.',
      hints: [
        'MinHash catches near-identical text; what about two articles that say the same thing in different words?',
        'Semantic similarity is measured in embedding space, not token overlap.',
      ],
    },
  ],

  'data-versioning-dc': [
    {
      id: 'q-dc-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'DVC (Data Version Control) enables reproducibility of ML experiments by:',
      options: [
        'Storing datasets inside the Git repository alongside code',
        'Tracking data and model files in remote storage while storing lightweight metadata pointers in Git',
        'Automatically retraining models whenever the training data changes',
        'Encrypting datasets to prevent unauthorized modifications',
      ],
      correctAnswer: 1,
      explanation: 'DVC stores large data and model files in external storage (S3, GCS, etc.) while committing only small metadata files (.dvc) to Git, linking code versions to specific dataset versions for reproducibility.',
      hints: [
        'Git handles text files well but not large binary files — how does DVC complement Git?',
        'Think about what you would need to reproduce a specific model training run from months ago.',
      ],
    },
    {
      id: 'q-dc-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Data versioning is unnecessary if model training code is fully version-controlled, since the same code will produce the same model.',
      correctAnswer: 'false',
      explanation: 'Even with identical code, changes in training data produce different models; without data versioning, it is impossible to reproduce a specific model or understand how data changes drove performance improvements or regressions.',
      hints: [
        'Reproducibility requires pinning both code AND data versions.',
        'If the training dataset has been updated, running the same code will not reproduce the old model.',
      ],
    },
    {
      id: 'q-dc-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Delta Lake enables ACID transactions on large-scale data lakes primarily through:',
      options: [
        'Storing data in a proprietary binary format that prevents partial writes',
        'Maintaining a transaction log of all changes to the table, enabling versioning and rollback',
        'Using row-level locking similar to traditional RDBMS systems',
        'Replicating data across multiple storage buckets for fault tolerance',
      ],
      correctAnswer: 1,
      explanation: 'Delta Lake maintains a JSON-based transaction log (_delta_log) that records every operation (insert, update, delete, schema change), enabling ACID guarantees, time travel queries, and rollback to any previous table version.',
      hints: [
        'ACID transactions on data lakes require tracking what changed and when — the transaction log does this.',
        'Delta Lake\'s "time travel" feature lets you query historical table versions — what stores that history?',
      ],
    },
  ],

  'pretraining-data': [
    {
      id: 'q-dc-kp21-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The C4 dataset (Colossal Clean Crawled Corpus) was derived from Common Crawl by applying filters including:',
      options: [
        'Retaining only documents written in formal academic language',
        'Removing pages with offensive content, short pages, pages ending mid-sentence, and non-English content',
        'Selecting only pages from verified educational institutions',
        'Keeping only documents that appear in Wikipedia\'s citation list',
      ],
      correctAnswer: 1,
      explanation: 'C4 applies heuristic filters to Common Crawl: keeping English pages, removing those with profanity, pages shorter than 5 sentences, pages with "lorem ipsum," and pages not ending with a terminal punctuation mark.',
      hints: [
        'Common Crawl is raw and noisy — what kinds of pages would you want to remove for language model training?',
        'Think about quality signals: length, language, content cleanliness.',
      ],
    },
    {
      id: 'q-dc-kp21-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'LAION-5B is a publicly available dataset of 5 billion image-text pairs scraped from the internet, used to train CLIP-style models.',
      correctAnswer: 'true',
      explanation: 'LAION-5B is an open dataset of 5.85 billion CLIP-filtered image-text pairs from Common Crawl, created by LAION and widely used to train contrastive vision-language models like OpenCLIP.',
      hints: [
        'LAION stands for Large-scale Artificial Intelligence Open Network.',
        'Think about where image-text pairs exist naturally on the web — alt-text on images, for example.',
      ],
    },
    {
      id: 'q-dc-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Data mixture ratios in LLM pretraining (e.g., GPT-3\'s upsampling of high-quality sources) are determined primarily by:',
      options: [
        'Matching the natural distribution of each source on the internet',
        'Empirical experiments measuring validation perplexity and downstream benchmark performance for different mixture weights',
        'Regulatory requirements that mandate equal representation across data sources',
        'The storage cost of each data source relative to the total pretraining budget',
      ],
      correctAnswer: 1,
      explanation: 'Data mixture ratios are tuned empirically by training smaller proxy models with different mixture weights and evaluating on validation perplexity or downstream tasks, as done in Dolma, Llama, and GPT-3 curation.',
      hints: [
        'Equal weighting would under-use high-quality sources like books and over-use noisy web crawl data.',
        'Think about how you would use a small experiment budget to find the best data mix for a large training run.',
      ],
    },
  ],

  'data-flywheel': [
    {
      id: 'q-dc-kp22-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A "data flywheel" in AI product development refers to:',
      options: [
        'A hardware system for high-throughput data preprocessing',
        'A virtuous cycle where more users generate more data, enabling better models, attracting more users',
        'A scheduled cron job that periodically retrains models on fresh data',
        'A data augmentation pipeline that continuously generates synthetic examples',
      ],
      correctAnswer: 1,
      explanation: 'The data flywheel describes the compounding advantage that comes from deployment: more users → more usage data → better models → better product → more users, creating a self-reinforcing competitive moat.',
      hints: [
        'A flywheel is a mechanical concept about stored momentum — what is the equivalent in data collection?',
        'Think about how Google Search, Amazon recommendations, or Tesla\'s Autopilot benefit from this cycle.',
      ],
    },
    {
      id: 'q-dc-kp22-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A data flywheel requires explicit user labeling (e.g., thumbs up/down) to generate useful training signal from user interactions.',
      correctAnswer: 'false',
      explanation: 'Implicit feedback (clicks, dwell time, purchases, query reformulations) can provide training signal without explicit ratings; many successful flywheels rely primarily on behavioral signals that require no user effort.',
      hints: [
        'Amazon knows you liked a product if you bought it — is that explicit or implicit feedback?',
        'Think about what actions users take naturally that reveal their preferences.',
      ],
    },
    {
      id: 'q-dc-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The primary risk of training exclusively on user-interaction data in a production data flywheel is:',
      options: [
        'The dataset becomes too large to fit in memory during training',
        'Feedback loops where the model reinforces its own biases and reduces output diversity',
        'Users become aware of data collection and reduce their engagement',
        'The model overfits to rare power users who generate the most data',
      ],
      correctAnswer: 1,
      explanation: 'Feedback loops occur when a model trained on its own deployment data learns to recommend popular items more, generating more clicks on popular items, which further biases the training data toward those items — reducing diversity and entrenching biases.',
      hints: [
        'If the model only shows popular items and collects clicks on them, what does the next training set look like?',
        'Think about filter bubbles in recommendation systems as an example of this failure mode.',
      ],
    },
  ],

  'llm-data': [
    {
      id: 'q-dc-kp23-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Quality filtering of LLM pretraining data using a "quality classifier" trained on high-quality references typically works by:',
      options: [
        'Filtering documents shorter than a fixed token count',
        'Training a classifier to distinguish curated high-quality documents (e.g., Wikipedia, books) from raw web crawl pages',
        'Removing documents containing any tokens not in a fixed vocabulary',
        'Selecting documents with the lowest perplexity under a reference language model',
      ],
      correctAnswer: 1,
      explanation: 'A quality classifier (as used in GPT-3, PaLM, Falcon) is trained to distinguish high-quality text (Wikipedia, books) from low-quality web pages, then used to score and filter Common Crawl documents — retaining those most similar to curated sources.',
      hints: [
        'The classifier learns what "high quality" looks like from curated examples.',
        'Think about fastText or a simple logistic classifier scoring web pages against a reference corpus.',
      ],
    },
    {
      id: 'q-dc-kp23-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Diversity in LLM pretraining data is important because training on homogeneous data can limit the model\'s breadth of knowledge and generalization.',
      correctAnswer: 'true',
      explanation: 'Diverse pretraining data covering many domains, styles, languages, and topics broadens the model\'s knowledge and improves generalization to downstream tasks; over-concentration on specific domains creates capability gaps.',
      hints: [
        'A model trained only on scientific papers would struggle with casual conversation — why?',
        'Think about what "breadth of knowledge" requires in terms of data coverage.',
      ],
    },
    {
      id: 'q-dc-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Dolma dataset curation pipeline applies which strategy to balance quality and diversity at scale?',
      options: [
        'Training a single global quality classifier and filtering all sources with the same threshold',
        'Source-specific filtering pipelines tailored to each data source\'s characteristics, combined with deduplication and toxicity filtering',
        'Randomly sampling equal proportions from each web crawl and book source',
        'Using LLM self-evaluation to score and filter each document individually',
      ],
      correctAnswer: 1,
      explanation: 'Dolma applies source-specific, tailored filtering pipelines (quality, language ID, toxicity, deduplication) appropriate to each source\'s characteristics, then combines them with explicit mixture ratios — reflecting that a one-size-fits-all approach fails across heterogeneous web, code, and book sources.',
      hints: [
        'Web crawl data has different quality signals than code repositories or Wikipedia — can the same filter serve all?',
        'Think about why a filter tuned for web pages might over-remove valuable code or vice versa.',
      ],
    },
  ],

  'multimodal-data': [
    {
      id: 'q-dc-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A key challenge in constructing multimodal (image-text) datasets for training vision-language models is:',
      options: [
        'Images and text require different file formats that cannot be stored together',
        'Ensuring alignment between image content and corresponding text descriptions',
        'Converting images to text representations before model training',
        'Making sure all images have the same resolution and aspect ratio',
      ],
      correctAnswer: 1,
      explanation: 'Misaligned image-text pairs (e.g., alt-text describing something unrelated to the image) introduce noise that harms vision-language model training; CLIP-filtering and quality heuristics are used to improve alignment.',
      hints: [
        'Alt-text on web images is not always an accurate description of the image content.',
        'Think about what "alignment" means — do the image and text refer to the same thing?',
      ],
    },
    {
      id: 'q-dc-kp24-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'CLIP filtering (keeping only image-text pairs with high CLIP similarity) improves dataset quality for vision-language model training.',
      correctAnswer: 'true',
      explanation: 'CLIP similarity measures semantic alignment between image and text modalities; pairs with low CLIP scores are often misaligned or of low quality, and filtering them out has been shown to improve downstream performance (e.g., in DataComp).',
      hints: [
        'CLIP was trained to align images and text — high CLIP similarity means strong semantic match.',
        'DataComp benchmark shows that simple CLIP-score filtering significantly improves model quality.',
      ],
    },
    {
      id: 'q-dc-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Interleaved image-text datasets (e.g., MMC4, OBELICS) differ from paired image-text datasets (e.g., LAION) by:',
      options: [
        'Using higher-resolution images to improve visual detail',
        'Containing documents with alternating images and text rather than single image-caption pairs, enabling in-context visual reasoning',
        'Providing structured annotations such as bounding boxes alongside images',
        'Restricting content to a single domain such as scientific figures',
      ],
      correctAnswer: 1,
      explanation: 'Interleaved datasets preserve the natural document structure with multiple images and text segments interleaved, supporting training for few-shot in-context learning with images (as in Flamingo and IDEFICS) rather than single-pair contrastive training.',
      hints: [
        'A news article with embedded images and captions is an example of interleaved multimodal content.',
        'Think about what capability interleaved data trains that LAION-style pairs cannot.',
      ],
    },
  ],

  'instruction-data': [
    {
      id: 'q-dc-kp25-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Instruction-tuning datasets differ from standard pretraining datasets by:',
      options: [
        'Using a larger token count per example',
        'Structuring data as (instruction, input, output) triples to teach the model to follow diverse user instructions',
        'Including only code generation examples to improve programming ability',
        'Requiring all examples to be verified by human experts before inclusion',
      ],
      correctAnswer: 1,
      explanation: 'Instruction-tuning datasets format training examples as task instructions with expected outputs, teaching the model to follow diverse natural language instructions — a key step enabling user-facing assistants like ChatGPT and Alpaca.',
      hints: [
        'Pretraining data is raw text; instruction-tuning data has explicit (task, response) structure.',
        'Think about what data would teach a model to respond helpfully to "Summarize this text: ..."',
      ],
    },
    {
      id: 'q-dc-kp25-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Self-Instruct (Wang et al., 2022) generates instruction-tuning data by using an LLM to generate new task instructions and outputs from a small seed set of human-written examples.',
      correctAnswer: 'true',
      explanation: 'Self-Instruct bootstraps instruction data by prompting an LLM to generate new instruction-input-output triplets from 175 seed tasks, then filtering low-quality generations, dramatically reducing the human annotation cost for instruction tuning.',
      hints: [
        'The method is "self"-instruct because the model generates its own training data.',
        'Think about the role of the small human-written seed set and the filtering step.',
      ],
    },
    {
      id: 'q-dc-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The LIMA (Less Is More for Alignment) paper demonstrated that:',
      options: [
        'Larger instruction-tuning datasets always produce better-aligned models',
        '1,000 carefully curated high-quality examples can produce strong instruction-following behavior, suggesting quality matters more than quantity',
        'Reinforcement Learning from Human Feedback (RLHF) is necessary for effective instruction tuning',
        'Self-generated instruction data consistently outperforms human-curated data',
      ],
      correctAnswer: 1,
      explanation: 'LIMA showed that fine-tuning LLaMA on just 1,000 carefully selected diverse high-quality examples produced competitive instruction-following performance, challenging the assumption that instruction-tuning datasets must be large.',
      hints: [
        'The title says "Less Is More" — what does that imply about dataset size vs. quality?',
        'Think about what 1,000 carefully curated examples might teach a model that already has broad pretraining knowledge.',
      ],
    },
  ],

  'data-poisoning': [
    {
      id: 'q-dc-kp26-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A backdoor attack on a training dataset works by:',
      options: [
        'Corrupting model weights after training to introduce hidden behaviors',
        'Injecting poisoned examples with a hidden trigger pattern so the trained model misclassifies inputs containing the trigger',
        'Modifying the test set to make the model appear to perform poorly',
        'Adding adversarial noise to all training images to degrade model accuracy',
      ],
      correctAnswer: 1,
      explanation: 'Backdoor (trojan) attacks embed a trigger (e.g., pixel pattern) in a subset of training examples with target labels; the trained model behaves normally on clean inputs but misclassifies any input containing the trigger as the attacker\'s target class.',
      hints: [
        'The attack is "backdoor" because it is hidden — clean inputs produce correct outputs.',
        'Think about what makes a backdoor attack dangerous for deployed ML systems.',
      ],
    },
    {
      id: 'q-dc-kp26-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Data poisoning attacks can be effective even when the attacker controls only a small fraction (e.g., 1%) of the training data.',
      correctAnswer: 'true',
      explanation: 'Even a small fraction of poisoned examples can successfully embed backdoors or degrade model performance, especially when the trigger is distinctive and the attack is optimized; this makes supply chain security for training data critical.',
      hints: [
        'Backdoor triggers create a very strong gradient signal — does the attacker need many examples?',
        'Think about how much an attacker needs to influence a model if their trigger always appears with the target label.',
      ],
    },
    {
      id: 'q-dc-kp26-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Activation clustering is a defense against backdoor attacks that works by:',
      options: [
        'Pruning neurons that activate strongly on trigger inputs during inference',
        'Clustering penultimate-layer activations and identifying a class whose activations form two separate clusters, indicating a backdoor subset',
        'Retraining the model on a clean reference dataset to overwrite backdoor behaviors',
        'Adding Gaussian noise to activations during inference to disrupt trigger-specific patterns',
      ],
      correctAnswer: 1,
      explanation: 'Activation clustering (Chen et al.) inspects the feature-space activations of the penultimate layer: for a backdoored class, poisoned examples cluster separately from clean examples, revealing the presence of a backdoor without needing to know the trigger.',
      hints: [
        'Backdoored examples activate the model differently from clean examples — what does clustering reveal?',
        'If a class has two clusters of activations, one likely corresponds to legitimate examples and one to poisoned ones.',
      ],
    },
  ],

  'benchmark-construction': [
    {
      id: 'q-dc-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'When constructing a benchmark evaluation set, which practice best prevents overfitting to the benchmark over time?',
      options: [
        'Making the benchmark as large as possible',
        'Keeping the test set private and releasing only aggregate scores through a controlled evaluation server',
        'Sampling test examples randomly from the same distribution as training data',
        'Requiring all submitted models to have fewer parameters than a fixed threshold',
      ],
      correctAnswer: 1,
      explanation: 'Keeping the test set private and exposing only scores through a server (like EvalAI, Papers with Code leaderboards) prevents researchers from directly optimizing for test examples and limits adaptive overfitting.',
      hints: [
        'If the test set is public, can researchers (and LLMs) memorize the answers?',
        'Think about how GLUE/SuperGLUE manage test set access.',
      ],
    },
    {
      id: 'q-dc-kp27-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Annotation artifacts in benchmark datasets occur when systematic patterns in how labels were assigned allow models to "cheat" without actually solving the intended task.',
      correctAnswer: 'true',
      explanation: 'Annotation artifacts (Gururangan et al.) are spurious correlations — e.g., "not" predicts contradiction in NLI — that allow models to achieve high accuracy using shallow heuristics rather than genuine reasoning.',
      hints: [
        'If a model can predict the label from the hypothesis alone in an NLI dataset, what does that reveal about data collection?',
        'Artifacts arise from systematic biases in how annotators write examples for different label classes.',
      ],
    },
    {
      id: 'q-dc-kp27-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Adversarial data collection (used in Dynabench and Adversarial NLI) improves benchmark difficulty by:',
      options: [
        'Applying adversarial image perturbations to all evaluation examples',
        'Having annotators create examples that fool a specific model, ensuring the benchmark tests model weaknesses',
        'Automatically generating adversarial examples using gradient-based attacks',
        'Excluding examples where all annotators agreed on the label, keeping only ambiguous cases',
      ],
      correctAnswer: 1,
      explanation: 'Adversarial data collection uses human-and-model-in-the-loop annotation where annotators write examples that a strong current model gets wrong, creating benchmarks that specifically target model blind spots and are harder to game.',
      hints: [
        'If the benchmark is created by tricking current models, can those models score well on it?',
        'Think about the dynamic nature of this benchmark — it gets harder as models improve.',
      ],
    },
  ],

  'feedback-data': [
    {
      id: 'q-dc-kp28-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In RLHF, human preference data is collected by:',
      options: [
        'Asking humans to write ideal model responses from scratch',
        'Presenting humans with pairs of model outputs and asking which is better',
        'Having humans rate individual model outputs on a numerical scale',
        'Using model-generated critiques as proxy feedback instead of human input',
      ],
      correctAnswer: 1,
      explanation: 'RLHF preference data is typically collected as pairwise comparisons — humans choose the better of two model outputs — because comparison is more reliable and consistent than absolute rating, and provides the relative signal needed to train a reward model.',
      hints: [
        'Pairwise comparison is easier for humans than absolute scoring — why?',
        'The resulting data trains a reward model that ranks outputs, not a classifier on absolute quality.',
      ],
    },
    {
      id: 'q-dc-kp28-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Annotator agreement on human preference data is typically very high because concepts like "helpfulness" and "harmlessness" have clear, universal definitions.',
      correctAnswer: 'false',
      explanation: 'Helpfulness, harmlessness, and honesty are subjective and context-dependent; annotators often disagree, especially on borderline cases, which is why annotator training, clear guidelines, and inter-annotator agreement measurement are essential.',
      hints: [
        'Consider how different people might judge the "helpfulness" of the same response differently.',
        'Anthropic, OpenAI, and others publish guidelines specifically to align annotator judgment on ambiguous cases.',
      ],
    },
    {
      id: 'q-dc-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Constitutional AI (CAI) reduces reliance on human feedback data by:',
      options: [
        'Training a reward model on purely synthetic data from a simulator',
        'Using AI self-critique and revision guided by a set of principles to generate preference data without per-instance human labeling',
        'Applying RLHF with a fixed reward function derived from safety rules',
        'Replacing RLHF entirely with supervised fine-tuning on human-written responses',
      ],
      correctAnswer: 1,
      explanation: 'CAI (Anthropic) has the model critique and revise its own outputs according to a constitutional set of principles, generating preference data through AI feedback (RLAIF) that can reduce the volume of human labeling required for safety fine-tuning.',
      hints: [
        'The "constitution" is a set of principles — how does the AI apply them without per-example human labels?',
        'Self-critique + revision creates (original, revised) pairs that can serve as preference data.',
      ],
    },
  ],

  'data-centric-tools': [
    {
      id: 'q-dc-kp29-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'DataIQ is a data-centric tool that characterizes training examples into groups based on:',
      options: [
        'Their label quality as estimated by confident learning',
        'Their confidence and aleatoric uncertainty across training to identify easy, hard, and ambiguous samples',
        'Their similarity to validation examples as measured by kernel distance',
        'Their gradient influence on the model\'s test loss',
      ],
      correctAnswer: 1,
      explanation: 'DataIQ tracks per-example confidence and aleatoric uncertainty across training epochs, categorizing examples as "easy" (consistently high confidence), "hard" (consistently low confidence), or "ambiguous" (variable confidence) — guiding targeted data curation.',
      hints: [
        'DataIQ observes how confidence changes during training — what does that reveal about an example?',
        'Ambiguous examples are those where the model cannot make up its mind — are they mislabeled, noisy, or inherently hard?',
      ],
    },
    {
      id: 'q-dc-kp29-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'DataPerf is a benchmark suite specifically designed to evaluate data-centric AI methods rather than model architectures.',
      correctAnswer: 'true',
      explanation: 'DataPerf (Mazumder et al.) provides benchmarks where the model is fixed and participants compete by improving the training dataset — directly measuring the value of data-centric interventions like cleaning, augmentation, and selection.',
      hints: [
        'Traditional ML competitions fix the task and let participants change models — what does DataPerf fix instead?',
        'DataPerf evaluates data scientists\' ability to improve data, not their ability to tune models.',
      ],
    },
    {
      id: 'q-dc-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The primary purpose of influence functions in data-centric AI tools is to:',
      options: [
        'Estimate how much each training example contributes to the model\'s prediction on a specific test example',
        'Measure the overall importance of each feature dimension in the training dataset',
        'Identify mislabeled examples by comparing loss values across training epochs',
        'Compute pairwise similarity between training examples to detect duplicates',
      ],
      correctAnswer: 0,
      explanation: 'Influence functions (Koh & Liang, 2017) use implicit differentiation to approximate the counterfactual: "how would the model\'s prediction change if this training example were removed?" — enabling identification of which training points most support or hurt a given test prediction.',
      hints: [
        'Influence functions answer a counterfactual question without actually retraining.',
        'They connect training data to specific test predictions through the gradient and Hessian of the loss.',
      ],
    },
  ],

  'data-centric-nlp': [
    {
      id: 'q-dc-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'FLAN (Fine-tuned Language Net) demonstrated that instruction tuning benefits from:',
      options: [
        'Training on a single high-quality task to develop deep expertise',
        'Aggregating many diverse NLP tasks formatted as natural language instructions to improve zero-shot generalization',
        'Using reinforcement learning from human feedback rather than supervised fine-tuning',
        'Pre-filtering training data with a quality classifier before instruction tuning',
      ],
      correctAnswer: 1,
      explanation: 'FLAN showed that fine-tuning a language model on a mixture of many NLP tasks (>60) expressed as natural language instructions dramatically improved zero-shot performance on unseen tasks, establishing the template for instruction-tuning data curation.',
      hints: [
        'FLAN\'s key insight is about diversity of instruction tasks — what does diversity provide?',
        'Zero-shot generalization improves because the model learns to follow instruction format across many task types.',
      ],
    },
    {
      id: 'q-dc-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Prompt dataset diversity (in terms of task types, phrasings, and domains) is more important than raw dataset size for instruction-following capability.',
      correctAnswer: 'true',
      explanation: 'Research from FLAN, LIMA, and Orca suggests that diversity of instructions and task types drives instruction-following generalization more than scale alone; thousands of diverse, high-quality examples often outperform millions of low-diversity ones.',
      hints: [
        'LIMA showed 1,000 diverse examples could match much larger datasets — what does that imply about diversity?',
        'Think about what the model needs to learn: following varied instruction formats, not just more examples of the same.',
      ],
    },
    {
      id: 'q-dc-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The Orca paper (Microsoft) improved instruction-tuning data quality by:',
      options: [
        'Collecting a larger volume of human-written instructions through crowdsourcing',
        'Augmenting instruction data with detailed chain-of-thought explanations generated by GPT-4 as a teacher model',
        'Applying active learning to select the most informative instructions from a large pool',
        'Using adversarial prompting to generate harder instruction examples',
      ],
      correctAnswer: 1,
      explanation: 'Orca distills reasoning capabilities from GPT-4 by generating rich explanation traces (system prompts, step-by-step reasoning) for a large instruction dataset, teaching a smaller model to imitate not just the answer but the reasoning process.',
      hints: [
        'Orca goes beyond answer imitation — what additional signal does GPT-4 provide in the augmented data?',
        'Think about the difference between learning the final answer and learning the reasoning chain that leads to it.',
      ],
    },
  ],
}

export default questions
registerQuestions(questions)
