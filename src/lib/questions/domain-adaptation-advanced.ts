import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "covariate-shift": [
    {
      id: "q-adapt-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Covariate shift occurs when:",
      options: [
        "The label distribution P(Y) differs between training and test but P(Y|X) stays the same",
        "The input distribution P(X) differs between training and test but P(Y|X) stays the same",
        "Both P(X) and P(Y|X) change simultaneously between train and test",
        "The training set contains labeling errors that corrupt P(Y|X)",
      ],
      correctAnswer: 1,
      explanation:
        "Covariate shift (Shimodaira, 2000) is the specific case where the marginal input distribution shifts (P_S(X) \$\\neq\$ P_T(X)) while the conditional label distribution remains constant (P_S(Y|X) = P_T(Y|X)). The challenge is that ERM on source data minimizes E_{P_S}[L(h(X),Y)], not E_{P_T}[L(h(X),Y)] — importance weighting corrects this by reweighting source samples by w(x) = P_T(x)/P_S(x).",
      hints: [
        '"Covariate" refers to the input variables X; "shift" means the distribution of X has changed.',
        "If P(Y|X) is the same, a model trained on source data would generalize perfectly to the target — the challenge is the input distribution shift.",
      ],
    },
    {
      id: "q-adapt-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Under covariate shift, a classifier that achieves 100% training accuracy will necessarily generalize perfectly to the target domain.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "High training accuracy does not imply target generalization under covariate shift; the model may have overfit to source-domain input patterns that differ from the target, causing degraded performance despite perfect training accuracy.",
      hints: [
        "Think about a model trained on sunny outdoor images tested on rainy ones — even if P(Y|X) is the same, input differences can cause failures.",
        "Overfitting is exacerbated when the input distribution shifts.",
      ],
    },
    {
      id: "q-adapt-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "KLIEP (Kullback-Leibler Importance Estimation Procedure, Sugiyama et al., 2008) estimates importance weights $w(\\mathbf{x}) = P_T(\\mathbf{x})/P_S(\\mathbf{x})$ by:",
      options: [
        "Training a binary classifier to distinguish source from target and using the odds ratio as the weight",
        "Directly minimizing the KL divergence $\\text{KL}(P_T \\| w \\cdot P_S)$ subject to the constraint that $w \\cdot P_S$ integrates to 1, solving for $w$ as a kernel density ratio",
        "Computing the ratio of source and target label frequencies and applying them as weights",
        "Normalizing source samples to have the same mean and variance as target samples",
      ],
      correctAnswer: 1,
      explanation:
        "KLIEP directly minimizes the KL divergence from the reweighted source to the target:\n\\[\\min_w \\text{KL}(P_T \\| w \\cdot P_S) = \\mathbb{E}_{P_T}[\\log P_T] - \\mathbb{E}_{P_T}[\\log(w(\\mathbf{x}) \\cdot P_S(\\mathbf{x}))].\\]\nSince the first term is constant with respect to $w$, this reduces to maximizing $\\mathbb{E}_{P_T}[\\log w(\\mathbf{x})]$ subject to the normalization constraint $\\mathbb{E}_{P_S}[w(\\mathbf{x})] = 1$ (ensuring $w \\cdot P_S$ integrates to 1). The weight function is modeled as a kernel expansion $w(\\mathbf{x}) = \\sum_l \\alpha_l k(\\mathbf{x}, \\mathbf{x}_l^T)$ using target kernel centers $\\{\\mathbf{x}_l^T\\}$, with $\\alpha_l \\geq 0$ learned by optimization.",
      hints: [
        "The key insight: instead of estimating $P_T$ and $P_S$ separately (hard), KLIEP directly estimates the ratio $w = P_T/P_S$ by fitting $w$ to satisfy the constraints — avoiding the hard intermediate steps.",
        "The constraint $\\mathbb{E}_{P_S}[w(\\mathbf{x})] = 1$ is a normalization condition: without it, scaling $w$ by any constant would keep KL minimized, but the weighted distribution would not integrate to 1.",
      ],
    },
  ],

  "importance-weighting": [
    {
      id: "q-adapt-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In importance-weighted empirical risk minimization for covariate shift, source samples are reweighted by w(x) = P_T(x)/P_S(x). When a domain classifier is trained to output P(source=1|x) via sigmoid, the density ratio can be recovered as:",
      options: [
        "w(x) = P(source=1|x) / (1 − P(source=1|x))",
        "w(x) = (1 − P(source=1|x)) / P(source=1|x)",
        "w(x) = log P(source=1|x) − log P(source=0|x)",
        "w(x) = P(source=1|x) \\times P(target=1|x)",
      ],
      correctAnswer: 1,
      explanation:
        "By Bayes' rule, P(source=1|x)/P(source=0|x) = P(x|source)/P(x|target) = P_S(x)/P_T(x). The ratio P_T(x)/P_S(x) = P(source=0|x)/P(source=1|x) = (1 − P(source=1|x)) / P(source=1|x). This allows training a binary domain classifier and reading off the density ratio from its output.",
      hints: [
        "Bayes' rule: P(source|x) \\propto P(x|source)\\cdotP(source). The ratio P(x|source)/P(x|target) = P_S(x)/P_T(x).",
        "You want P_T/P_S, so invert the domain classifier odds ratio.",
      ],
    },
    {
      id: "q-adapt-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Kernel Mean Matching (KMM) estimates importance weights by directly minimizing the MMD between the weighted source distribution and the target distribution in a reproducing kernel Hilbert space, formulated as a quadratic program.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "KMM solves: min_w ||\\mu_T − \\Sigma_i w_i \\phi(x_i^S)||\\^2_{RKHS} subject to w_i \\geq 0 and |\\Sigma_i w_i/n_S − 1| \\leq \\epsilon. Expanding the squared RKHS norm gives a quadratic objective in w with kernel matrix K_SS and cross-kernel k_ST, yielding a QP that can be solved without explicit density estimation.",
      hints: [
        "KMM avoids the intermediate step of density estimation by working directly in feature space.",
        "The QP constraint ensures the weights are non-negative and approximately sum to the sample count.",
      ],
    },
    {
      id: "q-adapt-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key practical failure mode of importance weighting under large distribution shift is variance explosion. Concretely, if w(x) has heavy tails, the weighted empirical risk \\Sigma_i w(x_i) L(h(x_i), y_i) / n:",
      options: [
        "Converges faster than standard ERM due to the corrective reweighting",
        "May have infinite variance even with a finite-variance loss, since weights can be unbounded — causing the estimator to be dominated by a few extreme samples",
        "Is always lower than the unweighted empirical risk",
        "Converges to the target risk only when source and target are identical distributions",
      ],
      correctAnswer: 1,
      explanation:
        "Importance sampling variance is proportional to E_{P_S}[w(x)\\^2\\cdotL\\^2] / n. When P_S(x) ≪ P_T(x) for some regions, w(x)=P_T(x)/P_S(x) \\to \\infty, giving enormous variance. Practical fixes include weight clipping (cap at some M), self-normalized importance sampling (\\Sigma w_i L_i / \\Sigma w_i), and KLIEP\'s built-in normalization constraint.",
      hints: [
        "Importance sampling estimators are unbiased but can have very high variance.",
        "Techniques like weight truncation or self-normalized importance sampling mitigate this at the cost of some bias.",
      ],
    },
  ],

  "mmd-da": [
    {
      id: "q-adapt-kp3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The squared Maximum Mean Discrepancy MMD\\^2(P, Q) between distributions P and Q using kernel k is defined as:",
      options: [
        "$$\\text{MMD}^2(P,Q) = \\|\\mathbb{E}_{x\\sim P}[\\phi(x)] - \\mathbb{E}_{y\\sim Q}[\\phi(y)]\\|^2_{\\mathcal{H}} = \\mathbb{E}_{x,x'\\sim P}[k(x,x')] - 2\\mathbb{E}_{x\\sim P,y\\sim Q}[k(x,y)] + \\mathbb{E}_{y,y'\\sim Q}[k(y,y')]$$",
        "MMD\\^2(P,Q) = KL(P||Q) estimated via kernel density estimation",
        "MMD\\^2(P,Q) = max_{f: ||f||\\leq1} |E_P[f(x)] − E_Q[f(x)]| (Wasserstein-1 dual)",
        "MMD\\^2(P,Q) = ||Cov_P(\\phi(x)) − Cov_Q(\\phi(x))||\\^2_F where \\phi is a fixed feature map",
      ],
      correctAnswer: 0,
      explanation:
        "The MMD measures the distance between distributions P and Q in the RKHS $\\mathcal{H}$ induced by kernel $k$. It equals $\\|\\mu_P - \\mu_Q\\|_{\\mathcal{H}}^2$, where $\\mu_P = \\mathbb{E}_{x\\sim P}[\\phi(x)]$ is the mean embedding. Expanding the squared norm gives:\n\\[\n\\text{MMD}^2(P,Q) = \\mathbb{E}_{x,x'\\sim P}[k(x,x')] - 2\\mathbb{E}_{x\\sim P,y\\sim Q}[k(x,y)] + \\mathbb{E}_{y,y'\\sim Q}[k(y,y')].\n\\]\nFor a characteristic kernel (e.g., the RBF/Gaussian kernel $k(x,y) = \\exp(-\\|x-y\\|^2 / (2\\sigma^2))$), MMD\\^2 = 0 if and only if P = Q. The empirical estimator uses within-domain terms $k(x_i, x_j)$ for same-domain pairs and cross-domain terms $k(x_i, y_j)$ — diagonal terms $k(x_i, x_i) = 1$ for normalized kernels are typically excluded in the unbiased U-statistic.",
      hints: [
        "Start with $\\|\\mu_P - \\mu_Q\\|^2 = \\langle \\mu_P - \\mu_Q, \\mu_P - \\mu_Q\\rangle = \\langle \\mu_P, \\mu_P\\rangle - 2\\langle \\mu_P, \\mu_Q\\rangle + \\langle \\mu_Q, \\mu_Q\\rangle$. Each inner product expands to an expectation over kernel evaluations.",
        "For a normalized kernel like RBF, $k(x_i, x_i) = 1$. Including these diagonal terms in the empirical estimate introduces a positive bias — the unbiased U-statistic excludes $i=j$ pairs to fix this.",
      ],
    },
    {
      id: "q-adapt-kp3-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Deep Adaptation Network (DAN) minimizes Multi-Kernel MMD (MK-MMD) between source and target domain representations in multiple fully-connected layers of a deep network simultaneously.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "DAN uses a mixture of kernels (MK-MMD: k = \\Sigma_u \\beta_u k_u) in multiple task-specific layers simultaneously to align distributions at multiple levels of abstraction. The multi-kernel approach makes the MMD test more powerful by selecting the best kernel combination.",
      hints: [
        "Feature distributions at different layers capture different levels of abstraction.",
        "Aligning representations at multiple layers provides a stronger alignment signal.",
      ],
    },
    {
      id: "q-adapt-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The unbiased U-statistic estimator of MMD\\^2(P,Q) from samples {x_1,...,x_m}∼P and {y_1,...,y_n}∼Q is:",
      options: [
        "Only cross-domain terms: (2/mn) \\Sigma_{i,j} k(x_i, y_j)",
        "MMD̂\\^2 = [1/(m(m−1)) \\Sigma_{i\$\\neq\$j} k(x_i,x_j)] − [2/(mn) \\Sigma_{i,j} k(x_i,y_j)] + [1/(n(n−1)) \\Sigma_{i\$\\neq\$j} k(y_i,y_j)]",
        "Only within-domain terms averaged: [1/m\\^2 \\Sigma_{i,j} k(x_i,x_j) + 1/n\\^2 \\Sigma_{i,j} k(y_i,y_j)] / 2",
        "The log of the ratio of within-class to between-class kernel values",
      ],
      correctAnswer: 1,
      explanation:
        "The U-statistic excludes diagonal terms (i=j) to ensure unbiasedness: MMD̂\\^2 uses sums over i\$\\neq\$j pairs for within-source and within-target terms. Excluding diagonals ensures E[MMD̂\\^2] = MMD\\^2 without a positive bias from k(x_i, x_i) = k(y_j, y_j) = 1 (for normalized kernels).",
      hints: [
        "Expand ||\\mu_S − \\mu_T||\\^2 in the RKHS to see all three term types.",
        "The U-statistic is unbiased because it excludes self-comparisons k(x_i, x_i).",
      ],
    },
  ],

  dann: [
    {
      id: "q-adapt-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In DANN (Domain-Adversarial Neural Networks, Ganin et al., 2016), the gradient reversal layer (GRL) multiplies gradients by ___ during backpropagation, and acts as ___ during the forward pass.",
      options: [
        "Multiplies by −\\lambda during backprop; acts as the identity function during forward pass",
        "Multiplies by +\\lambda during backprop; acts as a zero function during forward pass",
        "Multiplies by 0 during backprop; acts as a scaling function during forward pass",
        "Multiplies by −1/\\lambda during backprop; acts as ReLU during forward pass",
      ],
      correctAnswer: 0,
      explanation:
        "The GRL is defined as: forward pass R(x) = x (identity); backward pass \\partialR/\\partialx = −\\lambdaI. The hyperparameter \\lambda is often annealed during training: \\lambda = 2/(1+exp(−10p)) − 1 where p goes from 0 to 1 over training. This makes the feature extractor maximize domain confusion (adversarial to domain classifier) while the domain classifier minimizes it — both objectives satisfied in a single network.",
      hints: [
        "The GRL is a zero-cost trick in the forward pass — it only affects backpropagation.",
        "Reversing gradients makes the feature extractor compete against the domain classifier — adversarial alignment.",
      ],
    },
    {
      id: "q-adapt-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In DANN, the feature extractor is trained to simultaneously minimize task loss on source data and minimize domain discrimination accuracy.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "DANN jointly optimizes: (1) minimize classification loss L_y on labeled source data (task performance); (2) maximize domain classifier loss L_d (domain confusion — the GRL flips this to minimize for the domain classifier). The overall objective is: min_{G_f,G_y} max_{G_d} [L_y(G_y(G_f(x_s)), y_s) − \\lambda\\cdotL_d(G_d(G_f(x)), d)].",
      hints: [
        "These two objectives can conflict — the feature extractor must find a balance.",
        "The gradient reversal layer implements the adversarial part without requiring alternating optimization.",
      ],
    },
    {
      id: "q-adapt-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DANN\'s theoretical justification draws on Ben-David et al.'s bound: \\epsilon_T(h) \\leq \\epsilon_S(h) + d_{H△H}(S,T)/2 + \\lambda*. What does the H△H-divergence d_{H△H}(S,T) measure, and why does minimizing it justify DANN?",
      options: [
        "It measures the KL divergence between source and target feature distributions; DANN minimizes it via MMD",
        "It measures the discrepancy between source and target distributions in terms of the hypothesis class H — specifically the maximum difference in error between the best hypothesis on source and target; DANN minimizes it by making features indistinguishable to a domain classifier in H",
        "It measures the Wasserstein distance between source and target marginal distributions",
        "It measures the mutual information between domain label and input features",
      ],
      correctAnswer: 1,
      explanation:
        "The H△H-divergence measures how well a classifier in hypothesis class H can distinguish source from target samples. If H contains the domain classifier, d_{H△H}(S,T) is related to domain classification accuracy. DANN minimizes this by training the feature extractor adversarially against the domain classifier — directly minimizing the theoretical upper bound on target error.",
      hints: [
        "The bound has three terms: source error, domain divergence, and the irreducible error \\lambda*.",
        "DANN minimizes the H-divergence term by making features indistinguishable across domains.",
      ],
    },
  ],

  coral: [
    {
      id: "q-adapt-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "CORAL (CORrelation ALignment, Sun & Saenko, 2016) aligns source and target domains by minimizing the CORAL loss, which is defined as:",
      options: [
        "L_CORAL = (1/4d\\^2) ||C_S − C_T||\\^2_F, where C_S and C_T are the feature covariance matrices and d is the feature dimension",
        "L_CORAL = (1/d) ||\\mu_S − \\mu_T||\\^2 where \\mu are the feature means",
        "L_CORAL = KL(N(\\mu_S, C_S) || N(\\mu_T, C_T)) between Gaussian approximations of the feature distributions",
        "L_CORAL = Tr(C_S^{−1} C_T) − log det(C_S^{−1} C_T) − d (the Riemannian distance between SPD matrices)",
      ],
      correctAnswer: 0,
      explanation:
        "CORAL minimizes L_CORAL = (1/4d\\^2)||C_S − C_T||\\^2_F where C_S = (1/(n−1))(X_S^T X_S − (1/n)(1^T X_S)^T(1^T X_S)) and similarly for C_T. The 4d\\^2 normalization accounts for the matrix size. Unlike MMD, CORAL has a closed-form solution: whiten source features (C_S^{−1/2}) and color with target (C_T^{1/2}), requiring only two eigendecompositions.",
      hints: [
        "First-order alignment = mean matching; second-order alignment = covariance matching.",
        "The Frobenius norm measures element-wise differences between matrices: ||A||\\^2_F = \\Sigma_{i,j} A_{ij}\\^2.",
      ],
    },
    {
      id: "q-adapt-kp5-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "CORAL requires target domain labels to compute the covariance alignment loss.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "CORAL only requires unlabeled target data to compute target covariance C_T = (1/(n_T−1))(X_T^T X_T − (1/n_T)(1^T X_T)^T(1^T X_T)); the alignment loss is purely statistical and does not use target labels. This makes CORAL directly applicable in unsupervised domain adaptation.",
      hints: [
        "Covariance computation requires only feature vectors, not labels.",
        "This makes CORAL applicable in unsupervised domain adaptation settings.",
      ],
    },
    {
      id: "q-adapt-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Deep CORAL embeds the covariance alignment loss into deep networks. The gradient of L_CORAL with respect to source features X_S involves:",
      options: [
        "Backpropagation through the eigendecomposition, which is numerically unstable for repeated eigenvalues",
        "A gradient expression involving (C_S − C_T) and the source feature matrix, making it fully differentiable without requiring matrix square roots at training time",
        "A finite-difference approximation because the Frobenius norm is non-differentiable at zero",
        "Zero gradient with respect to features — only the transformation matrix is updated",
      ],
      correctAnswer: 1,
      explanation:
        "The gradient \\partialL_CORAL/\\partialX_S = (1/d\\^2)(X_S − 1_n \\cdot mean_S^T)(C_S − C_T) / (n−1). This avoids eigendecomposition during backprop — the gradient only involves (C_S − C_T) and the centered features. Mini-batch covariance estimates are noisy but gradient averaging over iterations makes training stable.",
      hints: [
        "The Frobenius norm ||A||\\^2_F is differentiable everywhere — its gradient is 2A.",
        "With n samples, a covariance matrix has n−1 degrees of freedom in its estimation.",
      ],
    },
  ],

  "progressive-da": [
    {
      id: "q-adapt-kp6-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Progressive domain adaptation addresses large domain gaps by:",
      options: [
        "Training simultaneously on all intermediate domains and the target domain",
        "Constructing intermediate domains between source and target and adapting step-by-step through them",
        "Progressively growing the model architecture as domain complexity increases",
        "Applying curriculum learning to the source domain labels only",
      ],
      correctAnswer: 1,
      explanation:
        "When the source-target gap is too large for direct adaptation, progressive DA interpolates intermediate domains (via data mixing, style transfer, or synthetic augmentation) to create easier adaptation steps.",
      hints: [
        "Think of it as stepping stones: source \\to intermediate\\_1 \\to intermediate\\_2 \\to target.",
        "Each step is a smaller domain gap, making each adaptation problem easier to solve.",
      ],
    },
    {
      id: "q-adapt-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Curriculum domain adaptation selects target pseudo-labeled samples for training in order from easiest to hardest, progressively expanding the training set.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Following curriculum learning principles, curriculum DA starts with high-confidence pseudo-labeled target samples and gradually includes harder ones, reducing the risk of noise from low-confidence pseudo-labels corrupting early training.",
      hints: [
        "Easy samples have high model confidence; hard samples have low confidence and are more likely to be mislabeled.",
        "Starting with easy samples builds a stable foundation before introducing noisy labels.",
      ],
    },
    {
      id: "q-adapt-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When constructing intermediate domains for progressive DA, which approach directly interpolates in pixel space?",
      options: [
        "CORAL covariance alignment",
        "Mixup between source and target images (pixel-level convex combinations)",
        "Gradient reversal on intermediate domain features",
        "Adversarial feature alignment with an intermediate domain classifier",
      ],
      correctAnswer: 1,
      explanation:
        "Pixel-level mixup creates intermediate images \\lambdax_s + (1−\\lambda)x_t; varying \\lambda from 1 to 0 defines a continuum from source to target, providing smooth intermediate supervision for progressive adaptation.",
      hints: [
        "Mixup is a simple interpolation in input space between two examples.",
        "By varying the mixing coefficient, you can smoothly transition from one domain to the other.",
      ],
    },
  ],

  "multi-source-da": [
    {
      id: "q-adapt-kp7-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Multi-source domain adaptation aims to adapt from K source domains to a target domain. A naive approach would be to pool all source data. Why is this suboptimal?",
      options: [
        "Pooling increases computation time quadratically with K",
        "Different source domains may have different relevance to the target; pooling treats them equally and ignores inter-source differences",
        "Pooling prevents the use of batch normalization",
        "Pooling requires all source domains to have the same label space",
      ],
      correctAnswer: 1,
      explanation:
        "Pooling all sources treats each source equally regardless of its proximity to the target, potentially allowing irrelevant domains to dominate; source-selection and domain-weighting methods learn to upweight more relevant sources.",
      hints: [
        "If one source domain is very similar to the target and another is very different, equal weighting is suboptimal.",
        "Learning domain importance weights addresses this by assigning more weight to more relevant sources.",
      ],
    },
    {
      id: "q-adapt-kp7-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Mixture of Experts approaches can be applied to multi-source DA by training a separate expert model for each source domain and learning a gating network for the target.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Each expert specializes in one source domain; the gating network learns to weight experts based on target input similarity to each source, effectively combining multiple adapted models.",
      hints: [
        "A gating network that assigns high weight to the expert closest to the target selects the best-adapted features.",
        "This is analogous to mixture of experts in general: specialized models combined by a learned mixture.",
      ],
    },
    {
      id: "q-adapt-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Theoretical analysis of multi-source DA (Mansour et al.) shows the target error is bounded by:",
      options: [
        "The maximum source error across all K domains",
        "A weighted combination of source errors and distribution distances, with optimal weights depending on domain proximity to the target",
        "The average source error divided by K",
        "The sum of pairwise source-target MMD values",
      ],
      correctAnswer: 1,
      explanation:
        "Mansour et al. show that a weighted mixture of source distributions can approximate the target, with the bound involving weighted source errors and distribution distances — informing practical domain weighting strategies.",
      hints: [
        "Sources closer to the target should receive higher weights in the mixture.",
        "The optimal mixture weights minimize the total divergence between the mixture and the target.",
      ],
    },
  ],

  "partial-da": [
    {
      id: "q-adapt-kp8-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Partial domain adaptation (PDA) addresses the setting where:",
      options: [
        "The source domain has only partially labeled data",
        "The target label space is a subset of the source label space",
        "Only a partial batch of target data is available at each training step",
        "The target domain is only partially observed during training",
      ],
      correctAnswer: 1,
      explanation:
        'In PDA, the target label space C_T \\subset C_S; source classes not present in the target are "outlier" classes that can mislead adaptation if treated the same as shared classes.',
      hints: [
        "Think of adapting an ImageNet classifier to a 10-class target — only 10 of 1000 source classes are relevant.",
        "Standard DA methods that align all classes together are misled by irrelevant source classes.",
      ],
    },
    {
      id: "q-adapt-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Importance-weighted adversarial nets (IWAN) for partial DA down-weight source examples from classes unlikely to appear in the target domain.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "IWAN assigns lower weights to source samples from outlier classes (not in the target) by using auxiliary domain and class discriminators, focusing alignment only on the shared class space.",
      hints: [
        "Outlier source classes hurt alignment by pulling feature representations in irrelevant directions.",
        "Down-weighting them focuses adaptation energy on the shared class subset.",
      ],
    },
    {
      id: "q-adapt-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ETN (Example Transfer Network) for partial DA identifies which source samples to transfer by:",
      options: [
        "Clustering source features and removing the smallest clusters",
        "Learning a transferability weight for each source example based on its similarity to the target distribution via a class-level discriminator",
        "Using the discriminator score as a hard threshold to discard source outlier samples",
        "Applying K-means on source labels to group them by relevance to the target",
      ],
      correctAnswer: 1,
      explanation:
        "ETN introduces per-instance transferability weights learned by a class-level domain discriminator; high-weight samples are more likely from shared classes, allowing soft rather than hard selection.",
      hints: [
        "Soft weighting is more robust than hard thresholding when class overlap is uncertain.",
        "The class-level discriminator distinguishes shared from outlier classes by examining class posterior distributions.",
      ],
    },
  ],

  "universal-da": [
    {
      id: "q-adapt-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Universal Domain Adaptation (UniDA) handles which of the following challenging scenarios?",
      options: [
        "Source and target have the same label space with known overlap",
        "The label space relationship between source and target is unknown a priori — they may share some classes, have private classes, or have no overlap",
        "The target domain has fully labeled data for all classes",
        "The source domain contains samples from all possible target classes",
      ],
      correctAnswer: 1,
      explanation:
        "UniDA assumes no prior knowledge about the label space relationship, requiring the model to identify shared classes, reject source-private classes, and identify target-private samples simultaneously.",
      hints: [
        "In real applications, you may not know which target classes appeared in the source training data.",
        'The model must decide for each target sample: does it belong to a shared class or a target-private "unknown" class?',
      ],
    },
    {
      id: "q-adapt-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'Universal DA requires a threshold to distinguish "known" (shared class) from "unknown" (target-private) target samples, and this threshold is always set manually.',
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Methods like UAN (Universal Adaptation Network) learn to estimate the threshold adaptively using a domain similarity score, avoiding manual threshold tuning.",
      hints: [
        "A fixed manual threshold may be suboptimal across different domain pairs.",
        'Adaptive thresholds can be learned from the data by measuring how "source-like" each target sample is.',
      ],
    },
    {
      id: "q-adapt-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DCC (Discriminability and Transferability-based Common Subspace) for UniDA selects the common label space by:",
      options: [
        "Using a fixed fraction of the source classes with the highest accuracy on target data",
        "Learning a binary mask over source classes that maximizes a combination of within-class discriminability and cross-domain transferability",
        "Applying Gaussian mixture models to cluster source and target features jointly",
        "Running DBSCAN on target features and matching clusters to source classes",
      ],
      correctAnswer: 1,
      explanation:
        "DCC jointly optimizes for class discriminability (so selected classes are well-separable) and transferability (so selected classes have matching target support), automatically discovering the shared label space.",
      hints: [
        'A class is "transferable" if its source distribution resembles some part of the target distribution.',
        'A class is "discriminable" if it can be distinguished from other classes in feature space.',
      ],
    },
  ],

  "test-time-adaptation": [
    {
      id: "q-adapt-kp10-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Test-Time Adaptation (TTA) differs from standard domain adaptation in that:",
      options: [
        "TTA requires labeled target data while standard DA does not",
        "TTA adapts the model at inference time using only the test sample(s), without access to source data or offline target data",
        "TTA trains a new model from scratch on each test sample",
        "TTA only modifies the last classification layer while standard DA modifies all layers",
      ],
      correctAnswer: 1,
      explanation:
        "TTA updates model parameters (or statistics) at test time using only the incoming test data, enabling on-the-fly adaptation without a separate offline adaptation phase or access to source data.",
      hints: [
        '"Test-time" means the adaptation happens during inference, not before.',
        "TTA is especially useful when target distributions shift continuously and unpredictably.",
      ],
    },
    {
      id: "q-adapt-kp10-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "TTT (Test-Time Training, Sun et al.) trains an auxiliary self-supervised task jointly with the main task so the model can adapt at test time using the auxiliary loss alone.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "TTT introduces a self-supervised auxiliary task (e.g., rotation prediction) trained with the main task on source data; at test time, the model fine-tunes using the auxiliary loss on each test example before making predictions.",
      hints: [
        "The self-supervised task provides a gradient signal at test time without needing labels.",
        "Rotation prediction, contrastive loss, or masked reconstruction are common auxiliary tasks.",
      ],
    },
    {
      id: "q-adapt-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "TENT (Wang et al., 2021) performs test-time entropy minimization by updating only which parameters of the network?",
      options: [
        "All parameters including convolutional filters",
        "Only the affine parameters (scale \\gamma and shift \\beta) of batch normalization layers",
        "Only the final classification layer weights",
        "Only the parameters of a separately trained adapter network",
      ],
      correctAnswer: 1,
      explanation:
        "TENT updates only the BatchNorm affine parameters (\\gamma, \\beta) by minimizing entropy of the output distribution on test batches, which is computationally cheap and avoids catastrophic forgetting of other parameters.",
      hints: [
        "BatchNorm affine parameters control the output statistics per channel and are lightweight to update.",
        "Updating only these parameters limits the risk of over-adapting to a few test samples.",
      ],
    },
  ],

  "source-free-da": [
    {
      id: "q-adapt-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Source-free domain adaptation (SFDA) addresses which practical constraint?",
      options: [
        "The source data is unlabeled and cannot be used for supervision",
        "Source data is unavailable at adaptation time due to privacy, proprietary, or storage constraints",
        "The source model must be adapted without any gradient computation",
        "Source and target data must come from different modalities",
      ],
      correctAnswer: 1,
      explanation:
        "SFDA adapts a pre-trained source model to the target domain using only the pre-trained model weights and unlabeled target data — no source data is accessed during adaptation, addressing data privacy and practical deployment constraints.",
      hints: [
        "In practice, source data may be proprietary, no longer stored, or subject to privacy regulations.",
        "The pre-trained source model encodes source knowledge implicitly in its weights.",
      ],
    },
    {
      id: "q-adapt-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SHOT (Source Hypothesis Transfer) adapts to the target domain by freezing the source model\'s classifier and only updating the feature extractor.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "SHOT freezes the source hypothesis (classifier) and adapts the feature extractor via information maximization (entropy minimization + diversity) and self-supervised pseudo-labeling on target data.",
      hints: [
        "The classifier head encodes the source decision boundaries; updating it without source data risks destroying them.",
        "Adapting only the feature extractor reuses the source classifier while making features compatible with it.",
      ],
    },
    {
      id: "q-adapt-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The information maximization loss used in SFDA methods like SHOT combines two terms. What are they?",
      options: [
        "Cross-entropy on pseudo-labels + L2 weight regularization",
        "Entropy minimization of individual predictions + maximization of marginal prediction entropy (diversity)",
        "MMD between source model and target model features + label smoothing",
        "Triplet loss on target features + cosine similarity to source prototypes",
      ],
      correctAnswer: 1,
      explanation:
        "Information maximization balances prediction confidence (low individual entropy) with output diversity (high marginal entropy across the dataset), preventing the degenerate solution where all samples are assigned the same class.",
      hints: [
        "Without the diversity term, minimizing entropy alone collapses all predictions to one class.",
        "High individual confidence + high marginal diversity = each sample is confidently assigned a different class.",
      ],
    },
  ],

  "zero-shot-da": [
    {
      id: "q-adapt-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Zero-shot domain adaptation aims to adapt to a target domain using:",
      options: [
        "Zero labeled target samples, but many unlabeled target samples",
        "No target samples at all — domain shift is described only by auxiliary information (e.g., domain description or attributes)",
        "Only ten labeled target samples and no unlabeled data",
        "Zero source samples and only labeled target samples",
      ],
      correctAnswer: 1,
      explanation:
        "Zero-shot DA assumes no access to target data during training; instead, domain shift is parameterized via domain descriptors or attributes, and the model must generalize to unseen domains at test time.",
      hints: [
        '"Zero-shot" means zero target examples — the model must transfer purely based on domain description.',
        "This is analogous to zero-shot classification where classes are described by attributes rather than examples.",
      ],
    },
    {
      id: "q-adapt-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Domain-adversarial training is directly applicable to zero-shot DA since it requires unlabeled target samples to compute the domain confusion loss.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "DANN-style methods require target samples to train the domain discriminator; without any target data, feature-level adversarial alignment cannot be applied directly in zero-shot DA.",
      hints: [
        "Adversarial domain alignment needs examples from both domains to train the discriminator.",
        "Zero-shot DA must instead use auxiliary domain information to predict how to adapt.",
      ],
    },
    {
      id: "q-adapt-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Zero-shot domain adaptation via domain randomization (used in sim-to-real transfer) works by:",
      options: [
        "Training on a single fixed simulation that closely matches the real world",
        "Training on a wide range of randomized simulation parameters so the model becomes robust to variation and generalizes to unseen real-world conditions",
        "Applying zero-shot learning to classify unseen simulation domains",
        "Using GAN-generated images to replace the simulation entirely",
      ],
      correctAnswer: 1,
      explanation:
        "Domain randomization varies textures, lighting, object positions, and other simulation parameters during training, causing the model to learn domain-invariant features that transfer to the real world without ever seeing real data.",
      hints: [
        "If the model sees enough variation in simulation, the real world is just one more variation.",
        "This sidesteps the sim-to-real gap by making simulation diversity so broad that reality falls within it.",
      ],
    },
  ],

  "domain-generalization": [
    {
      id: "q-adapt-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Domain generalization (DG) differs from domain adaptation in that:",
      options: [
        "DG requires labeled target data; DA requires unlabeled target data",
        "DG has no access to target domain data during training; DA can access unlabeled target data",
        "DG uses multiple source domains; DA always uses a single source domain",
        "DG optimizes for worst-case domain performance; DA optimizes for average performance",
      ],
      correctAnswer: 1,
      explanation:
        "In DG, the model must generalize to completely unseen target domains using only multiple source domains during training — target data is unavailable even for unsupervised alignment.",
      hints: [
        "Think about training on three domains (Photo, Sketch, Cartoon) and testing on a fourth (Painting) never seen during training.",
        "DA uses target data for alignment; DG cannot.",
      ],
    },
    {
      id: "q-adapt-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Empirical Risk Minimization (ERM) — simply training on pooled source domains — is a surprisingly strong baseline for domain generalization.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gulrajani & Lopez-Paz (2021) showed in the DomainBed benchmark that careful ERM with proper hyperparameter tuning matches or outperforms many sophisticated DG methods, highlighting the importance of rigorous evaluation.",
      hints: [
        "The DomainBed paper famously challenged the DG community with this finding.",
        "Many DG papers compare against poorly-tuned ERM baselines, inflating their apparent gains.",
      ],
    },
    {
      id: "q-adapt-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Meta-learning-based DG methods like MLDG train the model to:",
      options: [
        "Minimize average loss across all source domains simultaneously",
        "Simulate domain shift during training by using some source domains as meta-train and others as meta-test, optimizing for fast adaptation to new domains",
        "Learn a domain-invariant encoder by maximizing mutual information across domains",
        "Generate new source domains via data augmentation to expand the training distribution",
      ],
      correctAnswer: 1,
      explanation:
        'MLDG applies MAML-style meta-learning: it holds out one source domain as a simulated "new domain" and optimizes the model so that gradients computed on meta-train domains also improve performance on the meta-test domain.',
      hints: [
        "MLDG stands for Meta-Learning for Domain Generalization.",
        "The meta-training objective is designed to mimic the test-time adaptation challenge.",
      ],
    },
  ],

  "invariant-risk-minimization": [
    {
      id: "q-adapt-kp14-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Invariant Risk Minimization (IRM) seeks to learn a representation $\\Phi$ such that:",
      options: [
        "The loss is minimized on the source domain only",
        "The optimal classifier on top of $\\Phi$ is the same (invariant) across all training environments",
        "The representation $\\Phi$ has minimum norm across environments",
        "The gradient of the loss with respect to $\\Phi$ is zero in all environments",
      ],
      correctAnswer: 1,
      explanation:
        "IRM (Arjovsky et al., 2019) formulates the problem as finding a representation $\\Phi$ and classifier $w$ such that $w$ is simultaneously optimal for all environments. Formally, the IRM objective is:\n\\[\\min_{\\Phi, w} \\sum_{e \\in \\mathcal{E}} R^e(w \\circ \\Phi) \\quad \\text{s.t.} \\quad w \\in \\arg\\min_{w'} R^e(w' \\circ \\Phi) \; \\forall e.\\]\nEquivalently, IRM encourages the gradient of the loss with respect to $w$ to be zero in every environment when evaluated at the optimal $w$: $abla_w R^e(w \\circ \\Phi) = 0$. The key insight is that if a feature is causal (affects $Y$ consistently across environments), the optimal classifier using that feature is the same everywhere; if it is spurious (varies with the environment), the optimal classifier changes. IRM trades off in-sample performance for out-of-sample invariance.",
      hints: [
        "The constraint $w \\in \\arg\\min_{w'} R^e(w' \\circ \\Phi)$ means: for each environment $e$, the classifier $w$ is the best linear classifier on top of $\\Phi$. If $\\Phi$ captures spurious features, this condition fails in some environments.",
        "Causal features: $Y \\leftarrow \\Phi(X) \\leftarrow E$ (environment $E$ does not influence the relationship between $\\Phi(X)$ and $Y$). Spurious features: $Y \\leftarrow E \\rightarrow \\Phi(X)$, where the environment influences both the representation and the label, creating illusory correlations.",
      ],
    },
    {
      id: "q-adapt-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "IRMv1 (the practical IRM implementation) adds a gradient penalty that penalizes the norm of the gradient of the loss with respect to a fixed dummy classifier on top of $\\Phi$.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "IRMv1 (IRMV1) replaces the intractable bilevel optimization of IRM with a tractable penalty. The gradient penalty\n\\[\\|\\nabla_{w=1} R^e(w \\circ \\Phi)\\|^2\\]\nmeasures how far the representation $\\Phi$ is from admitting $w=1$ as its optimal classifier in environment $e$. If $\\Phi$ were truly invariant, then for each environment the scalar $1 \\cdot \\Phi(X)$ would be the optimal linear classifier, making the gradient of the loss w.r.t. $w$ equal to zero at $w=1$. IRMv1 adds this penalty to the standard ERM loss, making the optimization fully differentiable end-to-end.",
      hints: [
        "Fix $w=1$ as a dummy scalar classifier. Then $\\nabla_{w=1} R^e(w \\circ \\Phi) = \\mathbb{E}[\\nabla_{w} L(y, w \\cdot \\Phi(x))]_{w=1} = \\mathbb{E}[\\nabla_{w} L(y, w \\cdot \\Phi(x))]$. This is non-zero whenever the representation $\\Phi$ is not simultaneously optimal across environments.",
        "The IRM penalty $\\|\\nabla_{w=1} R^e(w \\circ \\Phi)\\|^2$ is zero if and only if $w=1$ is a stationary point of $R^e(w \\circ \\Phi)$ in each environment $e$ — i.e., $\\Phi$ supports an invariant optimal classifier.",
      ],
    },
    {
      id: "q-adapt-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key limitation of IRM identified by subsequent work (Rosenfeld et al., Kamath et al.) is:",
      options: [
        "IRM cannot be implemented using stochastic gradient descent",
        "IRM fails to recover invariant features when there are too few training environments or the environments are not sufficiently diverse",
        "IRM requires knowing the causal graph of the data generating process",
        "IRM is only applicable to linear models and cannot generalize to deep networks",
      ],
      correctAnswer: 1,
      explanation:
        "With few environments or environments that differ only superficially, the IRM constraint is underdetermined and can be satisfied by spurious features, requiring many diverse environments to reliably identify causal features.",
      hints: [
        'IRM needs enough environments to "triangulate" which features are truly invariant.',
        "With only two environments, many spurious correlations could still appear invariant.",
      ],
    },
  ],

  "meta-da": [
    {
      id: "q-adapt-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Meta-learning for domain adaptation frames adaptation as a few-shot learning problem where:",
      options: [
        'Each "task" is a new random subset of the source dataset',
        'Each "task" is adapting from one domain to another, and the model learns to adapt quickly with few target examples',
        "The meta-learner is a GAN that generates new domain-specific examples",
        "Tasks are defined by different random label permutations of the same dataset",
      ],
      correctAnswer: 1,
      explanation:
        "Meta-DA learns an initialization or adaptation algorithm that enables fast adaptation to new domains from few examples, using multiple source domain pairs as meta-training tasks that simulate the target adaptation setting.",
      hints: [
        "MAML and Prototypical Networks are common meta-learning frameworks used in this context.",
        "The meta-training objective is designed to mimic the test-time adaptation challenge.",
      ],
    },
    {
      id: "q-adapt-kp15-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "MAML (Model-Agnostic Meta-Learning) can be applied to domain adaptation by treating each source domain as a separate task during meta-training.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "MAML trains an initialization that can be quickly fine-tuned to any task; using source domains as tasks produces an initialization that adapts efficiently to new target domains with few gradient steps.",
      hints: [
        "MAML is task-agnostic — any collection of tasks can be used for meta-training.",
        "Domain pairs are natural tasks: train on source, evaluate on target after K gradient steps.",
      ],
    },
    {
      id: "q-adapt-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Feature-Critic Networks (FCN) for meta-DA improve upon MAML-based approaches by:",
      options: [
        "Using a second-order meta-gradient to update the feature extractor more efficiently",
        "Learning an auxiliary reward/critic that evaluates feature transferability, guiding the feature extractor during meta-training",
        "Training a domain discriminator as the meta-learner instead of gradient-based adaptation",
        "Replacing MAML\'s inner loop with a hypernetwork that generates task-specific parameters",
      ],
      correctAnswer: 1,
      explanation:
        "FCN learns a feature critic network that assigns a transferability score to features; this critic is jointly meta-trained with the feature extractor, providing a richer training signal than task loss alone.",
      hints: [
        "A critic that measures transferability can guide the feature extractor toward domain-agnostic representations.",
        "This is analogous to using a learned reward in meta-RL instead of a hand-crafted one.",
      ],
    },
  ],

  "clip-da": [
    {
      id: "q-adapt-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "CLIP (Contrastive Language-Image Pretraining) benefits domain adaptation primarily because:",
      options: [
        "CLIP was trained on the same domains used in standard DA benchmarks",
        "CLIP features are highly domain-generalizable due to training on 400M diverse image-text pairs, reducing domain gap in the representation space",
        "CLIP provides pixel-level domain translation between source and target",
        "CLIP embeddings are always zero for out-of-distribution images",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP\'s massive and diverse pre-training on internet image-text pairs produces features that are semantically rich and largely domain-invariant, making them strong initialization for domain adaptation tasks.",
      hints: [
        "Models trained on more diverse data tend to generalize better to new domains.",
        "CLIP features encode semantic content rather than low-level domain-specific statistics.",
      ],
    },
    {
      id: "q-adapt-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'CLIP zero-shot classification can itself serve as a domain adaptation baseline by using text prompts like "a photo of a [class]" without any domain-specific training.',
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "CLIP zero-shot classification matches image features against text class embeddings; because CLIP is domain-agnostic by training, this approach provides competitive accuracy on new domains without any adaptation.",
      hints: [
        "CLIP zero-shot classification requires only class names, no labeled images from the target domain.",
        "This baseline is competitive with supervised DA methods on some benchmarks.",
      ],
    },
    {
      id: "q-adapt-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CoOp (Context Optimization) adapts CLIP to a target domain by:",
      options: [
        "Fine-tuning all CLIP parameters on target domain data",
        "Learning a small set of continuous context tokens (soft prompts) prepended to class names while keeping CLIP frozen",
        "Training a domain-specific image encoder that replaces CLIP\'s visual backbone",
        "Applying gradient reversal on CLIP\'s text encoder to align text and image domains",
      ],
      correctAnswer: 1,
      explanation:
        'CoOp replaces hand-crafted prompts like "a photo of a" with learnable continuous vectors, adapting CLIP\'s text branch to the target distribution with very few parameters while preserving the powerful pre-trained features.',
      hints: [
        '"Prompt tuning" or "soft prompts" are learnable input tokens prepended to the text input.',
        "Training only prompts is far more parameter-efficient than full fine-tuning.",
      ],
    },
  ],

  "style-transfer-da": [
    {
      id: "q-adapt-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Neural style transfer for domain adaptation works by:",
      options: [
        "Training a classifier on artistically styled images to improve robustness",
        "Translating source domain images to the visual style of the target domain, then training the task model on the translated images",
        "Using the style loss as a regularizer during domain adversarial training",
        "Aligning Gram matrices of source and target features in the classification network",
      ],
      correctAnswer: 1,
      explanation:
        "Style transfer for DA applies neural style transfer (or fast style transfer networks) to render source content in the target domain\'s texture and color statistics, bridging the visual gap before task model training.",
      hints: [
        "The content of source images (shapes, layouts) is preserved; only low-level visual statistics are changed.",
        "This pixel-level adaptation reduces the domain gap before any feature-level alignment.",
      ],
    },
    {
      id: "q-adapt-kp17-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "AdaIN (Adaptive Instance Normalization) can be used for domain adaptation by replacing source feature statistics with target feature statistics.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "AdaIN transfers style by replacing the mean and variance of source feature maps with those from target examples; applied to intermediate network layers, this effectively stylizes source images to match target appearance.",
      hints: [
        "AdaIN is the core operation in arbitrary style transfer networks.",
        "Replacing mean and variance transfers low-level texture statistics, not high-level content.",
      ],
    },
    {
      id: "q-adapt-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DRIT++ and MUNIT perform unpaired multi-domain style transfer for DA by assuming:",
      options: [
        "A shared content space and domain-specific style spaces, encoding content and style separately",
        "A shared style space and domain-specific content spaces",
        "A fully shared latent space across all domains",
        "Independent encoders and decoders with no shared components",
      ],
      correctAnswer: 0,
      explanation:
        "Both MUNIT and DRIT++ disentangle images into a domain-shared content code and a domain-specific style code; cross-domain translation swaps style codes, preserving content while transferring target-domain appearance.",
      hints: [
        '"Content" = what is in the image (structure, semantics); "style" = how it looks (texture, color).',
        "To translate X\\toY, take content from X and style from Y.",
      ],
    },
  ],

  "nlp-da": [
    {
      id: "q-adapt-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Domain adaptation for NLP is most commonly needed when:",
      options: [
        "Models are trained and tested on the same corpus and topic",
        "Models trained on one text domain (e.g., news) are applied to another (e.g., biomedical or social media)",
        "The vocabulary size increases after deployment",
        "The model is fine-tuned on a larger language model",
      ],
      correctAnswer: 1,
      explanation:
        "NLP domain shift occurs across text types: a model fine-tuned on formal news text degrades on informal social media or specialized biomedical text due to differences in vocabulary, syntax, and writing style.",
      hints: [
        "Think about how different Wikipedia articles are from tweets or medical records.",
        "Out-of-vocabulary words and domain-specific terminology drive performance drops.",
      ],
    },
    {
      id: "q-adapt-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Domain-adaptive pre-training (DAPT, Gururangan et al.) continues pre-training a language model on unlabeled target domain text before task fine-tuning, improving performance on target domain tasks.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "DAPT adapts the language model\'s internal representations to target domain vocabulary and style by continuing masked language model pre-training on target corpus, consistently improving downstream NLP task performance.",
      hints: [
        "Pre-training on in-domain text exposes the model to domain-specific vocabulary and phraseology.",
        "The adapted model is then fine-tuned for the specific task, combining domain and task knowledge.",
      ],
    },
    {
      id: "q-adapt-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Pivot-based domain adaptation for sentiment analysis identifies "pivot features" that are:',
      options: [
        "The most frequent words in the target domain vocabulary",
        "Features (words/n-grams) that behave similarly across source and target domains and are predictive of the label",
        "Features unique to the target domain with no source-domain equivalent",
        "Randomly selected anchor words used to align source and target embeddings",
      ],
      correctAnswer: 1,
      explanation:
        "Structural Correspondence Learning (SCL) identifies pivots — words equally informative across domains — and uses them to learn a domain-invariant feature projection, bridging source and target vocabularies.",
      hints: [
        'Pivot features are domain-independent signals of the target concept (e.g., "excellent" is a positive pivot for both reviews and news).',
        "Non-pivot features may be domain-specific and mislead cross-domain transfer.",
      ],
    },
  ],

  "speech-da": [
    {
      id: "q-adapt-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A common domain shift in speech recognition involves adapting from:",
      options: [
        "Daytime driving data to nighttime driving data within the real world",
        "Synthetic simulation environments (e.g., CARLA, GTA) to real-world driving scenes",
        "One real-world city to another real-world city",
        "Camera-based perception to LiDAR-based perception",
      ],
      correctAnswer: 1,
      explanation:
        "Synthetic simulators provide free, safe, and fully labeled data; sim-to-real adaptation bridges the visual gap between photo-realistic simulation and the real world, enabling scalable data collection without expensive real-world annotation.",
      hints: [
        "Collecting labeled real-world driving data (with bounding boxes, segmentation masks) is expensive and slow.",
        "Simulation can generate unlimited labeled data but differs visually from the real world.",
      ],
    },
    {
      id: "q-adapt-kp19-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Adverse weather domain adaptation (adapting from clear to foggy/rainy conditions) can be addressed by augmenting training data with synthetic weather effects.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Synthetic weather augmentation (fog, rain, night) using physics-based or GAN-based rendering exposes models to target-like conditions during training, improving robustness without collecting real adverse-weather data.",
      hints: [
        "Augmentation is a simple form of domain randomization applied to weather conditions.",
        "Physics-based fog simulation can realistically model how fog scatters light in camera images.",
      ],
    },
    {
      id: "q-adapt-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ADVENT (Adversarial Entropy Minimization for semantic segmentation DA) adapts segmentation models by:",
      options: [
        "Translating source images to target style using CycleGAN before training the segmenter",
        "Minimizing entropy of target domain predictions via adversarial training on entropy maps, encouraging confident and structured target predictions",
        "Aligning source and target backbone features using MMD at multiple layers",
        "Pre-training the segmenter backbone on target domain images using self-supervised contrastive learning",
      ],
      correctAnswer: 1,
      explanation:
        "ADVENT uses a domain discriminator operating on prediction entropy maps rather than raw features; adversarial training minimizes target prediction entropy, pushing the model to make confident, structured predictions on target data.",
      hints: [
        "High entropy predictions mean the model is uncertain; low entropy means confident.",
        "Adversarial training on entropy maps encourages target predictions to have the same low-entropy structure as source predictions.",
      ],
    },
  ],

  "medical-da": [
    {
      id: "q-adapt-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A typical domain shift in medical imaging occurs when:",
      options: [
        "The same patient is scanned twice on the same machine",
        "Models trained on images from one scanner/hospital are deployed at a different site with different scanner settings",
        "The image resolution is downsampled by 2\\times",
        "The label space changes from binary to multi-class",
      ],
      correctAnswer: 1,
      explanation:
        "Scanner vendor differences, acquisition protocols, and patient population variations cause significant distribution shift in medical images (CT, MRI, histopathology), making cross-site generalization a major challenge.",
      hints: [
        "Different MRI scanners produce images with different contrast, noise, and artifact profiles.",
        "A model that works perfectly at the training hospital may fail at a different institution.",
      ],
    },
    {
      id: "q-adapt-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Histogram matching (normalizing intensity distributions to a reference) is a simple yet effective pre-processing technique for medical image domain adaptation.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Histogram normalization aligns the marginal intensity distribution of target images to a reference source distribution, reducing scanner-induced statistical shift as a simple, interpretable pre-processing step.",
      hints: [
        "Many scanner-induced shifts affect global intensity statistics like mean and variance.",
        "This is a hand-crafted alignment that requires no labeled data or model training.",
      ],
    },
    {
      id: "q-adapt-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CycleGAN-based MRI-to-CT synthesis for domain adaptation must enforce which additional constraint to prevent hallucination of clinically relevant structures?",
      options: [
        "Spectral normalization of the generator to ensure Lipschitz continuity",
        "Task (segmentation) consistency loss to ensure translated images produce the same anatomical labels as the original",
        "Progressive training starting at 16\\times16 resolution before scaling to full resolution",
        "Identity loss weighted by the Hounsfield unit range of the target modality",
      ],
      correctAnswer: 1,
      explanation:
        "Without task consistency, CycleGAN may hallucinate or erase anatomical structures during translation; adding a segmentation consistency loss ensures translated images preserve clinically relevant anatomy, critical for safe medical AI.",
      hints: [
        "A GAN optimizes for visual realism, not anatomical accuracy — these can conflict.",
        "Segmentation consistency enforces that the translation does not change the clinical content of the image.",
      ],
    },
  ],

  "autonomous-driving-da": [
    {
      id: "q-adapt-kp21-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Sim-to-real domain adaptation for autonomous driving aims to transfer models from:",
      options: [
        "Daytime driving data to nighttime driving data within the real world",
        "Synthetic simulation environments (e.g., CARLA, GTA) to real-world driving scenes",
        "One real-world city to another real-world city",
        "Camera-based perception to LiDAR-based perception",
      ],
      correctAnswer: 1,
      explanation:
        "Synthetic simulators provide free, safe, and fully labeled data; sim-to-real adaptation bridges the visual gap between photo-realistic simulation and the real world, enabling scalable data collection without expensive real-world annotation.",
      hints: [
        "Collecting labeled real-world driving data (with bounding boxes, segmentation masks) is expensive and slow.",
        "Simulation can generate unlimited labeled data but differs visually from the real world.",
      ],
    },
    {
      id: "q-adapt-kp21-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Adverse weather domain adaptation (adapting from clear to foggy/rainy conditions) can be addressed by augmenting training data with synthetic weather effects.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Synthetic weather augmentation (fog, rain, night) using physics-based or GAN-based rendering exposes models to target-like conditions during training, improving robustness without collecting real adverse-weather data.",
      hints: [
        "Augmentation is a simple form of domain randomization applied to weather conditions.",
        "Physics-based fog simulation can realistically model how fog scatters light in camera images.",
      ],
    },
    {
      id: "q-adapt-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ADVENT (Adversarial Entropy Minimization for semantic segmentation DA) adapts segmentation models by:",
      options: [
        "Translating source images to target style using CycleGAN before training the segmenter",
        "Minimizing entropy of target domain predictions via adversarial training on entropy maps, encouraging confident and structured target predictions",
        "Aligning source and target backbone features using MMD at multiple layers",
        "Pre-training the segmenter backbone on target domain images using self-supervised contrastive learning",
      ],
      correctAnswer: 1,
      explanation:
        "ADVENT uses a domain discriminator operating on prediction entropy maps rather than raw features; adversarial training minimizes target prediction entropy, pushing the model to make confident, structured predictions on target data.",
      hints: [
        "High entropy predictions mean the model is uncertain; low entropy means confident.",
        "Adversarial training on entropy maps encourages target predictions to have the same low-entropy structure as source predictions.",
      ],
    },
  ],

  "continual-da": [
    {
      id: "q-adapt-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Continual domain adaptation addresses which scenario?",
      options: [
        "Adapting a model to a single fixed target domain with unlimited time",
        "Adapting to a sequence of changing target domains over time without catastrophic forgetting of previous domains",
        "Continuously collecting more source domain data to improve model accuracy",
        "Adapting the model architecture continuously as new data arrives",
      ],
      correctAnswer: 1,
      explanation:
        "Continual DA handles non-stationary environments where the target domain evolves over time (e.g., weather changes, sensor drift), requiring adaptation without catastrophic forgetting of previously adapted domains.",
      hints: [
        "Think of a self-driving car that must adapt to seasonal changes without forgetting how to drive in other conditions.",
        "Catastrophic forgetting is the key challenge: adapting to a new domain can overwrite knowledge of previous ones.",
      ],
    },
    {
      id: "q-adapt-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Elastic Weight Consolidation (EWC) can be applied to continual DA to protect important weights from being overwritten when adapting to a new domain.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "EWC adds a penalty on weight changes proportional to their importance (Fisher information) for previous tasks/domains, slowing down the forgetting of previously acquired domain knowledge during continual adaptation.",
      hints: [
        "EWC was originally proposed for continual learning; its principle applies equally to continual domain adaptation.",
        "Importance is measured by how much each weight affects performance on previously adapted domains.",
      ],
    },
    {
      id: "q-adapt-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Continual Test-Time Adaptation methods must guard against "error accumulation" where:',
      options: [
        "Errors from the source model grow linearly with the number of target samples",
        "Iterative self-training on shifting test data drifts the model away from its original capabilities via compounding pseudo-label errors",
        "The model\'s memory grows without bound as it stores all previously seen test samples",
        "Batch normalization statistics become incorrect when computed over only test samples",
      ],
      correctAnswer: 1,
      explanation:
        "In continual TTA, each round of self-training uses the model\'s own noisy predictions; if not corrected, errors compound over time and can cause catastrophic model drift, requiring regularization or periodic resets.",
      hints: [
        "Pseudo-label errors in one round become training signal in the next — small errors can snowball.",
        "Methods like EATA and CoTTA add regularization or stochastic weight restoration to combat this.",
      ],
    },
  ],

  "federated-da": [
    {
      id: "q-adapt-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Federated domain adaptation combines federated learning and domain adaptation to handle:",
      options: [
        "A single centralized dataset with domain shift between train and test splits",
        "Multiple clients with heterogeneous local data distributions (domain shift across clients) without sharing raw data",
        "Federated model training on homogeneous data followed by centralized domain adaptation",
        "Domain adaptation between a server model and a single client model",
      ],
      correctAnswer: 1,
      explanation:
        "Federated DA addresses the setting where clients have different data domains (e.g., hospitals with different scanners) and must collaboratively train a model that generalizes across domains without centralizing private data.",
      hints: [
        "Each client can be seen as a separate domain; the goal is domain-invariant learning without sharing raw data.",
        "This is FedAvg + domain adaptation: both privacy and generalization challenges must be addressed together.",
      ],
    },
    {
      id: "q-adapt-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In federated domain adaptation, a globally shared model may perform worse on individual clients than locally trained models because of client-specific distribution differences.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Global model averaging (FedAvg) can produce a model that is suboptimal for every individual client when client data distributions differ significantly; personalized federated DA methods address this by learning client-specific components.",
      hints: [
        "Averaging models trained on different distributions can produce a model that fits none of them well.",
        "Personalization allows each client to have a model adapted to its local domain.",
      ],
    },
    {
      id: "q-adapt-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FedDG (Federated Domain Generalization, Liu et al.) shares amplitude spectrum information across clients instead of gradient updates. This works because:",
      options: [
        "Amplitude spectra do not contain patient-identifiable information and represent domain style without content",
        "Frequency domain gradients have lower communication cost than spatial domain gradients",
        "Amplitude spectra are easier to align using MMD than spatial features",
        "Sharing spectra allows the server to reconstruct source images for centralized training",
      ],
      correctAnswer: 0,
      explanation:
        "The amplitude spectrum encodes low-level texture and color statistics (domain style) while the phase spectrum encodes semantic content; sharing amplitude spectra allows privacy-preserving domain style sharing without revealing identifiable content.",
      hints: [
        'Fourier theory: amplitude = "what textures" (style), phase = "where things are" (content).',
        "Style transfer via amplitude manipulation is much less privacy-invasive than sharing raw images.",
      ],
    },
  ],

  "benchmark-da": [
    {
      id: "q-adapt-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Office-31 benchmark for domain adaptation consists of images from which three domains?",
      options: [
        "Amazon product photos, DSLR photos, and webcam photos of the same 31 object categories",
        "Artwork, clipart, and product photos of 65 object categories",
        "Real photos, sketches, and paintings of 40 categories",
        "Indoor, outdoor, and synthetic images of 31 scenes",
      ],
      correctAnswer: 0,
      explanation:
        "Office-31 contains 31 object classes photographed with three distinct imaging modalities: Amazon product photos (controlled backgrounds), DSLR camera photos (high quality), and webcam photos (lower quality, varied backgrounds).",
      hints: [
        'The "Office" refers to the office supply objects in the dataset.',
        "31 categories \\times 3 domains with significant visual style differences across domains.",
      ],
    },
    {
      id: "q-adapt-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DomainNet is a large-scale DA benchmark containing approximately 600,000 images across 6 domains and 345 categories.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "DomainNet (Peng et al., 2019) is one of the largest DA benchmarks with ~600K images spanning 345 object categories across 6 domains: Clipart, Infograph, Painting, Quickdraw, Real, and Sketch.",
      hints: [
        "DomainNet was designed to stress-test DA methods at much larger scale than Office-31.",
        "345 categories \\times 6 domains makes it significantly more challenging than earlier benchmarks.",
      ],
    },
    {
      id: "q-adapt-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "WILDS (Koh et al., 2021) differs from traditional DA benchmarks like Office-Home by:",
      options: [
        "Using only synthetic source domains and real target domains",
        "Curating real-world distribution shifts spanning biology, satellite imagery, NLP, and clinical settings with standardized evaluation protocols",
        "Focusing exclusively on fine-grained visual recognition tasks",
        "Requiring models to be trained without any source domain labels",
      ],
      correctAnswer: 1,
      explanation:
        "WILDS provides diverse, realistic distribution shifts from actual deployment scenarios (hospital systems, satellite imagery, online reviews), with standardized splits and metrics enabling rigorous comparison across diverse DA methods.",
      hints: [
        "Traditional DA benchmarks often use synthetic or artificially constructed domain shifts.",
        "WILDS emphasizes ecological validity: shifts that actually occur in deployed ML systems.",
      ],
    },
  ],

  "practical-da": [
    {
      id: "q-adapt-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Before applying complex domain adaptation algorithms in practice, the first recommended step is to:",
      options: [
        "Train a GAN to translate target images to source style",
        "Analyze the nature and magnitude of the domain shift (data exploration, feature visualization) to choose appropriate methods",
        "Collect 10\\times more source domain data to overwhelm the domain gap",
        "Replace all batch normalization with layer normalization",
      ],
      correctAnswer: 1,
      explanation:
        "Understanding the type of shift (covariate, label, concept) and its magnitude guides method selection; a small shift may require only fine-tuning, while a large gap may need full adversarial adaptation or pixel-level translation.",
      hints: [
        "Not every domain gap requires a complex adaptation method — sometimes fine-tuning is sufficient.",
        "Feature space visualization (e.g., t-SNE) can reveal whether features are already aligned.",
      ],
    },
    {
      id: "q-adapt-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "When labeled target data is available, even in small amounts, supervised fine-tuning typically outperforms unsupervised domain adaptation methods.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Even a small amount of labeled target data provides direct task supervision that unsupervised alignment cannot match; supervised fine-tuning is almost always the preferred strategy when any target labels are available.",
      hints: [
        "Labeled data directly specifies the decision boundary; unlabeled data can only align distributions.",
        "The value of a single labeled example in the target domain is high because it provides direct task supervision.",
      ],
    },
    {
      id: "q-adapt-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Negative transfer in domain adaptation occurs when:",
      options: [
        "The adaptation method produces a model with lower accuracy on the target than training without adaptation",
        "The source model achieves negative loss on the target domain",
        "The domain discriminator has negative accuracy after adversarial training",
        "The importance weights are negative due to numerical instability",
      ],
      correctAnswer: 0,
      explanation:
        "Negative transfer happens when the adaptation process is harmful — the adapted model performs worse on the target than no adaptation at all, often caused by incompatible source-target distributions or overly aggressive alignment.",
      hints: [
        "Negative transfer is most common when the source and target tasks or distributions are fundamentally incompatible.",
        "It can also occur with inappropriate hyperparameter settings in adversarial training.",
      ],
    },
  ],

  "label-shift": [
    {
      id: "q-adapt-kp26-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Label shift (prior probability shift) occurs when:",
      options: [
        "P(X|Y) stays the same between source and target but P(Y) changes",
        "The conditional label distribution P(Y|X) changes between source and target",
        "Both P(X) and P(Y) change while P(X|Y) remains constant",
        "Labels are mislabeled in the target domain but not the source domain",
      ],
      correctAnswer: 0,
      explanation:
        "Label shift assumes the class-conditional distributions P(X|Y) are identical but the class priors P(Y) differ; a classifier trained under source class frequencies may be miscalibrated for target class frequencies.",
      hints: [
        '"Prior" shift means the probability of each class (Y) shifts between domains.',
        "Covariate shift flips the assumption: P(X) changes while P(Y|X) stays fixed; label shift assumes the reverse.",
      ],
    },
    {
      id: "q-adapt-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Under label shift, the optimal correction is to reweight source samples by the ratio of target to source class priors w_k = p_t(Y=k)/p_s(Y=k).",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Since P(X|Y) is identical across domains under label shift, reweighting source samples by the class prior ratio corrects the distribution mismatch, making the weighted source distribution equivalent to the target distribution.",
      hints: [
        "The density ratio p_t(x)/p_s(x) simplifies to p_t(y)/p_s(y) when P(X|Y) is constant.",
        "This is analogous to importance weighting for covariate shift, but applied to labels instead of inputs.",
      ],
    },
    {
      id: "q-adapt-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BBSE (Black Box Shift Estimation) estimates target label proportions without target labels by:",
      options: [
        "Solving a linear system relating predicted class frequencies on unlabeled target data to the true label shift using the source model\'s confusion matrix",
        "Training a secondary model on target data with pseudo-labels and comparing predicted class histograms",
        "Computing the KL divergence between source and target prediction distributions",
        "Using importance sampling with a kernel density estimate of the label distribution",
      ],
      correctAnswer: 0,
      explanation:
        "BBSE uses the source model\'s confusion matrix C (where C_{ij} = P(ŷ=i|y=j)) to solve Cw = \\mû_t for the target label weights w, where \\mû_t is the empirical prediction distribution on unlabeled target data.",
      hints: [
        "The confusion matrix links predicted class frequencies to true class frequencies.",
        "Given the model predictions on target data and the confusion matrix, linear algebra recovers the target label distribution.",
      ],
    },
  ],

  "concept-drift": [
    {
      id: "q-adapt-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Concept drift refers to which type of distribution change over time?",
      options: [
        "The input distribution P(X) changes while P(Y|X) stays constant",
        "The conditional label distribution P(Y|X) changes over time",
        "The label space Y expands as new classes emerge",
        "The feature space X gains new dimensions over time",
      ],
      correctAnswer: 1,
      explanation:
        "Concept drift means the relationship between inputs and outputs changes — the same input X no longer maps to the same label Y, making previously trained models incorrect even for inputs they have seen before.",
      hints: [
        '"Concept" refers to the mapping from X to Y; "drift" means this mapping changes over time.',
        "In contrast, covariate shift only changes P(X) while keeping P(Y|X) fixed.",
      ],
    },
    {
      id: "q-adapt-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ADWIN (ADaptive WINdowing) detects concept drift by maintaining a sliding window of data and testing whether the mean of an older sub-window differs significantly from a recent sub-window.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "ADWIN adaptively adjusts the window size using a statistical test: when a significant difference is detected between older and newer data within the window, the old data is dropped, signaling a drift event.",
      hints: [
        "The key innovation of ADWIN is adaptive window sizing — it automatically grows/shrinks the window.",
        "A significant statistical difference between sub-windows indicates the data distribution has changed.",
      ],
    },
    {
      id: "q-adapt-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Gradual concept drift is harder to detect than abrupt drift because:",
      options: [
        "Gradual drift requires more parameters to model than abrupt drift",
        "Statistical tests have lower power against small incremental changes; the drift accumulates before becoming detectable",
        "Gradual drift changes both P(X) and P(Y|X) simultaneously, requiring two separate detectors",
        "Gradual drift only affects classification boundaries, not regression targets",
      ],
      correctAnswer: 1,
      explanation:
        "Abrupt drift causes a sudden, large statistical change that is easy to detect; gradual drift produces small, incremental changes that are individually within noise thresholds, requiring longer observation windows or more sensitive tests.",
      hints: [
        "Think of trying to detect a slow temperature increase vs. a sudden temperature jump — which is harder?",
        "By the time gradual drift accumulates to detectable levels, significant model degradation may have already occurred.",
      ],
    },
  ],

  "open-vocabulary-da": [
    {
      id: "q-adapt-kp28-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Open-vocabulary domain adaptation allows detection or segmentation of:",
      options: [
        "Only the fixed set of categories seen during training",
        "Arbitrary categories described by natural language, even if not seen during training",
        "Categories from the source domain only, applied to target domain images",
        "Categories defined by visual prototypes without language descriptions",
      ],
      correctAnswer: 1,
      explanation:
        "Open-vocabulary models (e.g., OWL-ViT, GLIP) use vision-language alignment to recognize categories described by free-form text, enabling adaptation to new target-domain categories without retraining.",
      hints: [
        "Foundation models like CLIP enable open-vocabulary recognition by aligning images and text in a shared space.",
        '"Open vocabulary" means the class list is not fixed at training time.',
      ],
    },
    {
      id: "q-adapt-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Open-vocabulary adaptation requires collecting new labeled images for each novel target-domain category during deployment.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Open-vocabulary models use language descriptions (class names or text prompts) to define new categories without labeled images, enabling zero-shot adaptation to novel categories in new domains.",
      hints: [
        "CLIP zero-shot classification requires only class names, no labeled images from the target domain.",
        "This baseline is competitive with supervised DA methods on some benchmarks.",
      ],
    },
    {
      id: "q-adapt-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "PromptKD and similar methods improve open-vocabulary DA by learning domain-specific prompts that:",
      options: [
        "Replace the visual backbone with a domain-specific convolutional network",
        "Bridge the domain gap in the text embedding space by conditioning text prompts on target domain context, aligning text and visual features more closely for the target domain",
        "Fine-tune the full CLIP model on target domain images with automatically generated captions",
        "Use knowledge distillation from a large language model to improve text encoder quality",
      ],
      correctAnswer: 1,
      explanation:
        "Domain-specific prompt learning adapts the text branch of vision-language models to the target domain by learning prompts that account for visual style differences, improving cross-modal alignment without modifying the visual backbone.",
      hints: [
        "Prompt learning is a lightweight way to adapt large pre-trained models.",
        "Domain-specific prompts shift the text representations to better match target visual features.",
      ],
    },
  ],

  "self-training-da": [
    {
      id: "q-adapt-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Self-training for domain adaptation works by:",
      options: [
        "Training the model on source data with artificially added noise",
        "Using the model to generate pseudo-labels for target data, then retraining on the combined source-labeled and target-pseudo-labeled data",
        "Training a second model on the target domain independently and ensembling predictions",
        "Applying mean teacher averaging of model weights over target domain training steps",
      ],
      correctAnswer: 1,
      explanation:
        "Self-training generates pseudo-labels for unlabeled target data using the current model, retrains on the combined source-labeled and target-pseudo-labeled data, and iterates — gradually adapting the model to the target domain.",
      hints: [
        "Self-training uses the model\'s own predictions as supervision for unlabeled data.",
        "The key risk is error propagation when pseudo-labels are wrong.",
      ],
    },
    {
      id: "q-adapt-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Mean Teacher (Tarvainen & Valpola) improves pseudo-label quality by maintaining an exponential moving average (EMA) of model weights as the teacher that generates pseudo-labels.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The EMA teacher is a temporally ensemble model that produces more stable, less noisy predictions than the student model being trained, providing higher-quality pseudo-labels and improving self-training stability.",
      hints: [
        "EMA smooths out the noisy updates from individual mini-batches, giving a more stable prediction.",
        "Temporal ensembling via EMA is more efficient than retraining an ensemble from scratch.",
      ],
    },
    {
      id: "q-adapt-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CBST (Class-Balanced Self-Training, Zou et al.) addresses the class imbalance problem in self-training by:",
      options: [
        "Oversampling target pseudo-labeled samples from majority classes",
        "Setting class-specific confidence thresholds so each class contributes an approximately equal number of pseudo-labeled samples",
        "Using focal loss to down-weight easy target samples during retraining",
        "Applying class-conditional batch normalization to balance feature distributions",
      ],
      correctAnswer: 1,
      explanation:
        "CBST computes separate thresholds per class such that a fixed fraction of each class\'s predictions are selected as pseudo-labels, preventing dominant classes from overwhelming rare ones during self-training.",
      hints: [
        "A global threshold selects only easy (dominant) classes; per-class thresholds ensure rare classes are included.",
        "Class balance is important for learning discriminative features for all categories, not just frequent ones.",
      ],
    },
  ],

  "evaluation-da": [
    {
      id: "q-adapt-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The standard evaluation protocol for unsupervised domain adaptation is to report accuracy:",
      options: [
        "On the source domain test set after adaptation",
        "On a labeled target domain test set that was not used during adaptation",
        "On a held-out source domain validation set",
        "On a combined source+target test set",
      ],
      correctAnswer: 1,
      explanation:
        "UDA methods are evaluated on a labeled target test set to measure how well adaptation improved target performance; the test labels are not used during training or adaptation.",
      hints: [
        "The goal of DA is target performance — source accuracy after adaptation is irrelevant.",
        "Using target test labels during adaptation would violate the unsupervised DA assumption.",
      ],
    },
    {
      id: "q-adapt-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Model selection (hyperparameter tuning) for UDA is challenging because using labeled target validation data violates the unsupervised assumption.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Standard hyperparameter selection uses a validation set with labels; in UDA, no target labels are available for validation, requiring proxy metrics (e.g., source validation accuracy, DEV, importance-weighted validation) that may not correlate with target accuracy.",
      hints: [
        'This is the "model selection problem" in UDA — how do you choose hyperparameters without target labels?',
        "Gulrajani & Lopez-Paz (2021) showed that inconsistent model selection inflates reported DA results.",
      ],
    },
    {
      id: "q-adapt-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Importance Weighted Validation (IWV) method for model selection in UDA estimates target accuracy without target labels by:",
      options: [
        "Using the source model accuracy as a proxy for target accuracy",
        "Computing importance-weighted source validation accuracy, reweighting source validation samples by estimated density ratios p_t(x)/p_s(x)",
        "Training a domain discriminator and using its accuracy as an inverse proxy for target performance",
        "Measuring the Wasserstein distance between source and target feature distributions as a model quality score",
      ],
      correctAnswer: 1,
      explanation:
        "IWV reweights source validation samples so that their distribution approximates the target distribution; the resulting weighted accuracy estimates target accuracy without any labeled target data.",
      hints: [
        "Importance weighting makes the source validation distribution look like the target distribution.",
        "This is the same density ratio correction used for covariate shift, applied to model selection.",
      ],
    },
  ],
};

const moreAdaptQuestions: Record<string, Question[]> = {
  "test-time-adaptation-v2": [
    {
      id: "q-adapt-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Test-Time Adaptation (TTA) differs from standard unsupervised domain adaptation in that:",
      options: [
        "TTA requires labeled target data while UDA does not",
        "TTA adapts the model during inference using only the unlabeled test data (no source data retained), typically by optimizing a self-supervised objective like entropy minimization or consistency — enabling adaptation to distribution shift on-the-fly without retraining",
        "TTA is computationally cheaper than UDA because it requires no training",
        "TTA can only be applied to computer vision tasks, not NLP",
      ],
      correctAnswer: 1,
      explanation:
        "TTA framework: given a pre-trained model and test-time data from a new distribution, adapt the model using only the unlabeled test batch (no source data, no target labels). Methods: (1) Tent (Wang et al., 2021): minimize entropy of model predictions by updating batch normalization statistics and affine parameters. (2) TTT (Sun et al., 2020): solve a self-supervised auxiliary task (rotation prediction) using test data. TTA addresses practical constraints where source data cannot be retained (privacy, storage) but adaptation at inference time is needed.",
      hints: [
        "Tent key insight: batch normalization statistics computed on source training data are mismatched to test distribution. Updating BN stats on test batch corrects this efficiently.",
        "Catastrophic forgetting in TTA: adapting for many steps without source data can degrade performance. TTT+SA and EATA use regularization to prevent over-adaptation.",
      ],
    },
    {
      id: "q-adapt-kp31-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "TTT++ (Liu et al., 2021) improves on standard test-time training by using contrastive self-supervised learning as the adaptation objective instead of rotation prediction, enabling better feature alignment between source and test distributions.",
      correctAnswer: "True",
      explanation:
        "TTT++ uses SimCLR-style contrastive learning: the auxiliary head minimizes the contrastive loss over augmented views of test examples. Advantages over rotation prediction: (1) Contrastive learning is more tightly coupled to the main task features. (2) Works for non-geometric distribution shifts where rotation prediction may not correlate with the main task. (3) TTT++ achieves better results on corruption robustness benchmarks (ImageNet-C) than rotation-based TTT.",
      hints: [
        "Rotation prediction auxiliary task weakness: for datasets with orientation-invariant objects (satellite images, medical scans), rotation prediction is trivially solved and provides no useful adaptation signal.",
        "Contrastive auxiliary task strength: augmentation invariance aligns with robustness to distribution shifts caused by corruptions — a form of image transformation.",
      ],
    },
    {
      id: "q-adapt-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Continual test-time adaptation faces "error accumulation" where the model degrades over time. The method used in EATA (Niu et al., 2022) to address this is:',
      options: [
        "Resetting the model to its initial weights after every N test examples",
        "Filtering out high-entropy (uncertain) test examples before adaptation and applying Fisher information-based regularization to penalize changes to parameters important for the source distribution — preventing noisy updates and catastrophic forgetting",
        "Using a separate memory bank of source examples to provide periodic supervision signals",
        "Applying early stopping based on test set performance to prevent over-adaptation",
      ],
      correctAnswer: 1,
      explanation:
        "EATA (Efficient Anti-Forgetting Test-Time Adaptation): (1) Sample filtering: only adapt on examples where prediction entropy H < threshold — skipping high-uncertainty examples. (2) Fisher regularization: L_reg = \\Sigma_i F_i (\\theta_i - \\theta_0_i)\\^2 where F_i is the Fisher information for parameter i from source training. This penalizes changes to parameters important for the source task, preventing catastrophic forgetting while allowing adaptation.",
      hints: [
        "Fisher information as parameter importance: F_i = E[(\\partial log p(y|x)/\\partial\\theta_i)\\^2] — high Fisher importance means the parameter strongly affects source task predictions.",
        "Threshold filtering: examples with H(p) < H_threshold are reliable and provide good gradient signal. Uncertain examples have noisy pseudo-labels that can hurt performance.",
      ],
    },
  ],

  "few-shot-da": [
    {
      id: "q-adapt-kp32-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Few-shot domain adaptation uses a small number of labeled target examples to:",
      options: [
        "Replace the source domain training data entirely",
        "Guide the alignment direction in feature space — the labeled target examples provide supervision to steer the adapted model toward task-relevant alignment (not just distribution matching), often dramatically improving over both UDA and standard fine-tuning",
        "Enable data augmentation by generating additional labeled target examples",
        "Select which source examples to exclude from training to reduce negative transfer",
      ],
      correctAnswer: 1,
      explanation:
        "Few-shot DA methods: (1) Domain alignment + supervised fine-tuning: use UDA loss to align source\\totarget, then fine-tune on few labeled target examples. (2) Minimax entropy (Saito et al., 2019): labeled target examples guide the entropy minimization objective. (3) Prototypical networks: labeled target examples initialize class prototypes for nearest-centroid classification in the adapted feature space. Even 1-3 labeled examples per class significantly outperforms UDA, as the labels resolve the alignment ambiguity.",
      hints: [
        "The alignment ambiguity problem in UDA: class-discriminative features may be entangled with domain-specific features. A few labeled target examples disambiguate which features to align vs. ignore.",
        "Few-shot DA advantage over pure fine-tuning: standard fine-tuning on 5 labeled target examples easily overfits. Combining with source domain data via domain adaptation regularizes the learned classifier.",
      ],
    },
    {
      id: "q-adapt-kp32-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Negative transfer in multi-source domain adaptation occurs when including data from an unrelated source domain hurts performance on the target domain compared to using only the most related source domain.",
      correctAnswer: "True",
      explanation:
        "Negative transfer: adding source domain C (unrelated to target) to source domains A and B (related) can hurt performance. Mechanism: the model is forced to learn representations that generalize across A, B, C — but generalizing to unrelated C pushes the representation away from the optimal alignment for the target. Solutions: (1) Domain weighting: weight source domains by similarity to target. (2) Source selection: exclude source domains with high discrepancy to target. (3) Per-domain classifiers: train separate domain-specific components combined via gating.",
      hints: [
        "A-distance: measure of domain discrepancy based on the error rate of a binary domain classifier. Higher classifier error \\to more similar domains.",
        "Multi-source DA best practice: always evaluate each source domain\'s contribution separately before combining. If domain C degrades performance, exclude or downweight it.",
      ],
    },
    {
      id: "q-adapt-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Mixture of Experts (MoE) architecture for domain adaptation enables adaptive domain handling by:",
      options: [
        "Training one expert model per source domain and selecting the best expert for each target example at inference time",
        "Learning a gating network that routes each input to a combination of specialized domain experts — the gating learns soft domain membership and the expert combination produces features that are both discriminative and adaptive to the input\'s underlying domain",
        "Using reinforcement learning to select which source domain examples to include in each training batch",
        "Training experts on different layers of the network and combining their representations via attention",
      ],
      correctAnswer: 1,
      explanation:
        "MoE for domain adaptation: the gating network g(x) = softmax(Wx) learns domain assignments from input features. Multiple expert feature extractors {E_1,...,E_K} specialize on different domain aspects. The combined representation f(x) = \\Sigma_k g_k(x) E_k(x) adapts to each example\'s domain content. Advantages: (1) Handles multi-domain inputs where examples may come from hybrid distributions. (2) Learns implicit domain structure without requiring domain labels. (3) Can generalize to novel domains via novel gating combinations.",
      hints: [
        "Domain adaptation with MoE: experts implicitly learn domain-specific feature transformations while the gating network learns to detect domain membership from input statistics.",
        "Sparse MoE (top-K gating): only K experts activated per example — reduces compute while maintaining adaptability. Load balancing loss ensures no expert is ignored.",
      ],
    },
  ],

  "deep-da-theory": [
    {
      id: "q-adapt-kp33-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Ben-David et al. (2010) theory bound for domain adaptation states that target error is bounded by:",
      options: [
        "Target error \\leq source error only",
        "Target error \\leq source error + H-divergence between source and target distributions + \\lambda*, where \\lambda* is the combined error of the ideal joint hypothesis for both domains — motivating minimizing both source error and domain divergence simultaneously",
        "Target error \\leq source error \\times (1 + H-divergence)",
        "Target error \\leq H-divergence only, independent of source error",
      ],
      correctAnswer: 1,
      explanation:
        "Ben-David et al. (2010) bound: \\epsilon_T(h) \\leq \\epsilon_S(h) + d_{H△H}(S,T) + \\lambda* where: \\epsilon_T(h) = target error; \\epsilon_S(h) = source error; d_{H△H}(S,T) = H-divergence (how well a classifier can distinguish source from target); \\lambda* = min_{h\\inH}[\\epsilon_S(h)+\\epsilon_T(h)] = combined error of the best joint classifier. This bound motivates DANN: minimize source error + domain divergence (via domain adversarial loss). The \\lambda* term is irreducible — it represents tasks where source and target have inherently different optimal classifiers.",
      hints: [
        "H-divergence: d_{H△H}(S,T) \\approx 2(1 - 2\\cdotmin_h error_rate(domain_classifier)) — related to the DANN discriminator error. If the discriminator can\'t distinguish source from target, H-divergence \\approx 0.",
        "\\lambda* term: if P_S(Y|X) \$\\neq\$ P_T(Y|X) (concept drift), even perfect alignment can\'t achieve zero target error — \\lambda* is non-zero.",
      ],
    },
    {
      id: "q-adapt-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The A-distance (proxy distance) between two domains can be estimated using a binary domain classifier: a lower A-distance indicates greater domain similarity.",
      correctAnswer: "True",
      explanation:
        "Proxy A-distance: train a binary classifier h to distinguish source vs. target samples. A-distance \\approx 2(1 - 2\\cdoterror(h)). If domains are identical (indistinguishable), the classifier achieves 50% accuracy, and A-distance \\approx 0. If domains are very different (easily distinguishable), the classifier achieves near 100% accuracy, and A-distance \\approx 2. A lower A-distance means greater domain similarity — more likely that domain adaptation will succeed without large error.",
      hints: [
        "A-distance computation: train a linear SVM on source (label 0) and target (label 1) examples. Error rate estimates 1 - A-distance/2.",
        "Using A-distance to select source domains: compute A-distance between each source domain and the target; upweight or select source domains with lower A-distance.",
      ],
    },
    {
      id: "q-adapt-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Conditional domain adaptation (vs. marginal adaptation) aligns:",
      options: [
        "The marginal feature distributions P_S(Z) and P_T(Z) separately from the label distributions",
        "The class-conditional feature distributions P_S(Z|Y) and P_T(Z|Y) — ensuring that source and target examples of the same class have similar representations, rather than just aligning the overall feature distributions which may ignore class structure",
        "The joint distribution P(Z,Y) using a Wasserstein-2 metric between source and target",
        "Only the output logit distributions P_S(Y|Z) and P_T(Y|Z), ignoring the feature space",
      ],
      correctAnswer: 1,
      explanation:
        "Marginal alignment limitation: aligning P_S(Z) \\approx P_T(Z) can mix classes — class A features from source may align with class B features from target. Conditional DA (CDA) aligns P_S(Z|Y=c) \\approx P_T(Z|Y=c) for each class c. Methods: (1) Joint Maximum Mean Discrepancy (JMMD): match joint (feature, one-hot label) distributions. (2) CDAN (Long et al., 2018): condition the adversarial domain discriminator on the model\'s predicted class distribution.",
      hints: [
        "CDAN discriminator input: D(f ⊗ p(y|f)) — the outer product of features f and predicted class probabilities p(y|f). This conditions the domain discriminator on the predicted label, enabling class-conditional alignment.",
        "Pseudo-label quality in conditional DA: the conditional alignment depends on accurate pseudo-labels for target examples. Warmup with marginal alignment before switching to conditional alignment improves stability.",
      ],
    },
  ],

  "prompt-adaptation": [
    {
      id: "q-adapt-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Prompt tuning for domain adaptation adapts a frozen pre-trained language model to a new domain by:",
      options: [
        "Fine-tuning all model parameters using domain-specific data",
        'Learning a small set of continuous "soft prompt" vectors prepended to the input — only these prompt parameters are updated during adaptation while the LLM weights remain frozen, enabling efficient multi-domain adaptation by swapping domain-specific prompt vectors',
        "Searching for the best discrete prompt text using gradient-free optimization",
        "Adding adapter layers between transformer blocks that are fine-tuned while the attention weights remain frozen",
      ],
      correctAnswer: 1,
      explanation:
        "Prompt tuning for DA: a domain-specific soft prompt P_d \\in R^{L\\timesd} is prepended to the input embedding. Only P_d is updated by gradient descent on domain-specific data; the pre-trained LLM is frozen. Benefits: (1) Multi-domain deployment: store one small P_d per domain (~L\\timesd parameters) vs. full model copy. (2) Fast adaptation: few-shot domain-specific learning updates only the small prompt. (3) No catastrophic forgetting: frozen LLM retains all pre-training knowledge.",
      hints: [
        "Prompt tuning parameter count: L=100 tokens \\times d=768 dims = 76,800 parameters for BERT-base vs. 110M for full fine-tuning — ~1400\\times more parameter-efficient.",
        "Domain prompt library: for 100 domains, store 100 small prompt vectors (~100KB each) instead of 100 full model copies (~440MB for BERT). 4400\\times storage reduction.",
      ],
    },
    {
      id: "q-adapt-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Visual prompt tuning (VPT) applies prompt tuning to vision transformers (ViT) for domain adaptation, learning prepended visual token embeddings while keeping the ViT backbone frozen.",
      correctAnswer: "True",
      explanation:
        "VPT (Jia et al., 2022): for ViT models, prepend p learnable patch token embeddings to the input sequence at each transformer block (VPT-Deep) or only at the input layer (VPT-Shallow). Only these prompt tokens are trained; the pre-trained ViT weights are frozen. VPT-Deep outperforms full fine-tuning on FGVC (fine-grained visual classification) with 25 prompt tokens \\times 12 layers = only 0.03% of ViT-Large parameters.",
      hints: [
        "VPT-Deep vs. VPT-Shallow: VPT-Deep injects prompts at every transformer layer (more expressive, more parameters); VPT-Shallow only at the input. VPT-Deep consistently outperforms shallow on domain adaptation tasks.",
        "Visual prompt tokens have no direct semantic meaning — they are learned feature modifications that shift the ViT\'s attention patterns to focus on domain-relevant features.",
      ],
    },
    {
      id: "q-adapt-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CLIP-based domain adaptation (CoOp, CoCoOp) adapts CLIP to downstream domains. CoCoOp improves over CoOp by:",
      options: [
        "Training more prompt tokens with a higher learning rate",
        "Making the prompt context conditioned on each input image instance (x-conditional prompts) rather than static class-level prompts — enabling the prompt to adapt to the specific visual content of each image, improving generalization to unseen classes",
        "Using a separate adapter network to process CLIP\'s text embeddings",
        "Replacing the text encoder with a fine-tuned language model specific to the target domain",
      ],
      correctAnswer: 1,
      explanation:
        "CoOp (Zhou et al., 2022): learn K context tokens [v\\_1,...,vK] shared across all classes — these static tokens improve performance on base classes but reduce generalization to novel classes. CoCoOp (Zhou et al., 2022): a lightweight meta-net h(\\cdot) takes image features and outputs a per-instance shift \\Deltav_i = h(f(x)). Prompt = [v\\_1+\\Deltav\\_1,...,vK+\\DeltavK, class_name]. This image-conditioned prompt improves base-to-novel generalization by making the context responsive to specific visual content.",
      hints: [
        'Base-to-novel generalization: train on 16-shot of "base" classes, evaluate on completely "novel" classes not seen during prompt training. CoOp hurts novel class accuracy; CoCoOp maintains it.',
        "Meta-net architecture: a single linear layer mapping CLIP image features (512-dim for ViT-B/16) \\to per-token bias (K\\times512). Very lightweight, ~0.01% of CLIP parameters.",
      ],
    },
  ],

  "source-free-da-v2": [
    {
      id: "q-adapt-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Source-free domain adaptation (SFDA) addresses the practical constraint that:",
      options: [
        "The target domain is too large to fit in GPU memory",
        "Source data cannot be retained at adaptation time due to privacy regulations, data storage limitations, or proprietary constraints — only a pre-trained source model is available, and adaptation must be performed using only unlabeled target data",
        "Source domain labels are unavailable due to the original dataset being unlabeled",
        "The source model was trained on a different computational platform incompatible with adaptation infrastructure",
      ],
      correctAnswer: 1,
      explanation:
        "SFDA motivation: (1) GDPR and data privacy: medical images from hospital A cannot be shared with hospital B for adaptation. (2) Proprietary data: a source model is trained on proprietary data; only the model weights are distributed, not the data. SFDA methods: (1) SHOT (Liang et al., 2020): freeze source classifier head, adapt feature extractor via self-supervised clustering + entropy minimization on target. (2) G-SFDA: generate virtual source features from the source model for alignment.",
      hints: [
        "SHOT insight: the source classifier head encodes source class semantics — keep it frozen. Only adapt the feature extractor to make target features align with what the classifier expects.",
        "Pseudo-label quality is critical for SFDA: use self-supervised objectives (entropy minimization, consistency regularization) to improve pseudo-label quality before using them for supervised fine-tuning.",
      ],
    },
    {
      id: "q-adapt-kp35-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Generative replay in source-free domain adaptation — generating synthetic source-like data from the source model and using it for domain alignment — is inspired by continual learning approaches to prevent catastrophic forgetting.",
      correctAnswer: "True",
      explanation:
        "Generative replay for SFDA: train a generator G to produce synthetic source-like images from the source model. During adaptation, align target features with the generated pseudo-source features — without needing the real source data. Inspiration from continual learning: Experience Replay and Generative Replay (Shin et al., 2017) prevent catastrophic forgetting by replaying past task data (or generated approximations). Methods: GSFDA uses the source model\'s softmax outputs as class prototypes.",
      hints: [
        "Model inversion: given a trained classifier, reconstruct inputs that maximize class probabilities — the inverted images are prototype images for each class, usable as pseudo-source data.",
        "Generative replay limitation: for complex distributions (natural images), the generated pseudo-source may not faithfully represent source feature statistics.",
      ],
    },
    {
      id: "q-adapt-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'In source-free domain adaptation, the "information maximization" objective (combining entropy minimization with diversity regularization) addresses what specific failure mode?',
      options: [
        "Gradient vanishing during adaptation when entropy is already low",
        "Model collapse to a single class: pure entropy minimization drives the model to predict one dominant class for all target examples (zero entropy, but all predictions are the same class) — diversity regularization (maximizing the marginal entropy H(E_x[p(y|x)])) prevents this by encouraging a uniform class distribution across the target set",
        "Overfitting to the most common classes in the target domain",
        "The model forgetting to predict rare classes due to class imbalance in the target domain",
      ],
      correctAnswer: 1,
      explanation:
        "Information maximization = entropy minimization + marginal entropy maximization: L_IM = -H(y|x) + H(y) = \\Sigma_x \\Sigma_y p(y|x) log p(y|x) - H(mean_x p(y|x)). The first term minimizes conditional entropy (confident predictions). The second term maximizes marginal entropy (diverse predictions). Without the diversity term: the model predicts class 1 for all examples (H(y|x)=0 but only one class used). This objective is used in IM, SHOT, and many SFDA methods.",
      hints: [
        "IM objective equivalence: maximizing I(y;x) = H(y) - H(y|x) — mutual information between predictions and inputs. Maximizes both prediction confidence (low H(y|x)) and diversity (high H(y)).",
        "Batch size effect: diversity term H(mean_x p(y|x)) requires a sufficiently large batch to accurately estimate the marginal distribution.",
      ],
    },
  ],
};

Object.assign(questions, moreAdaptQuestions);

const moreAdaptQ2: Record<string, Question[]> = {
  "continual-da-v2": [
    {
      id: "q-adapt-kp36-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Continual domain adaptation (CDA) differs from standard DA in that CDA must adapt to a sequence of target domains over time without access to previous domains. Which challenge is unique to CDA?",
      options: [
        "Requiring more labeled source data than standard DA",
        "Catastrophic forgetting: adapting to new domains overwrites weights learned for past domains, requiring methods that balance plasticity (new domain) and stability (old domains)",
        "Only adapting the classifier head while freezing the backbone",
        "Requiring source and target to have the same label space",
      ],
      correctAnswer: 1,
      explanation:
        "CDA unique challenge: adapter the model to domain D_t without forgetting adaptation to D_1...D_{t-1}. Methods: (1) EWC regularization: penalize changes to parameters important for past domains via Fisher information. (2) Experience replay: small buffer of past domain examples interleaved with new domain training. (3) Adapter-based: domain-specific adapter modules that grow with new domains — backbone frozen, zero forgetting by construction. Key metric: backward transfer (BWT) = performance on past domains after new domain learning. Negative BWT indicates catastrophic forgetting.",
      hints: [
        "Adapter modules (Houlsby 2019): small bottleneck layers inserted into Transformer blocks. Only adapter parameters updated — all other parameters frozen. Near-zero forgetting at cost of O(r\\cdotd) parameters per domain.",
        "EWC in CDA: Fisher diagonal F_i estimates parameter importance for domain t. Penalty \\lambda\\Sigma F_i(\\theta_i - \\theta^*_i)\\^2 prevents moving important parameters. Requires storing F per domain — memory cost O(d\\cdotT) for T domains.",
      ],
    },
    {
      id: "q-adapt-kp36-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In continual domain adaptation, using a larger learning rate for adapter layers while freezing the backbone is a standard technique to reduce catastrophic forgetting.",
      correctAnswer: "True",
      explanation:
        "Freezing the backbone limits parameter updates to adapter layers (small fraction of total parameters), dramatically reducing catastrophic forgetting. The backbone retains general representations; adapters specialize per domain. L2-SP regularizes fine-tuned parameters toward pre-trained values — an alternative allowing gradual adaptation. Both are standard PEFT techniques for CDA.",
      hints: [
        "LoRA for CDA: add low-rank adaptation matrices per domain. Existing domain LoRA weights frozen when moving to new domain. Model grows by r(d+k) parameters per domain.",
        "Freeze schedule: freeze backbone after epoch 1 of each domain, when task-specific signal dominates. Earlier freezing = more stability; later freezing = more plasticity.",
      ],
    },
    {
      id: "q-adapt-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The stability-plasticity dilemma in CDA is best characterized as:",
      options: [
        "Tradeoff between stable gradients and plastic loss landscapes",
        "The fundamental tension between retaining past domain knowledge (stability) and rapidly adapting to new domains (plasticity) — high stability prevents catastrophic forgetting but slows new domain learning; high plasticity enables fast adaptation but causes catastrophic forgetting",
        "Instability of batch normalization across domains",
        "Tradeoff between model size and inference speed",
      ],
      correctAnswer: 1,
      explanation:
        "Progressive Neural Networks (Rusu 2016): new column per domain with lateral connections — infinite plasticity, zero forgetting, but model size grows linearly with domains. PackNet: prune task-specific weights, reuse pruned capacity for new tasks — fixed model size, near-zero forgetting. EWC: weighted regularization balancing plasticity and stability. The optimal point depends on the number of domains and available compute.",
      hints: [
        "Progressive NNs never overwrite old weights — zero forgetting by construction. But model grows O(T) with T domains.",
        "HAT (Hard Attention to Task): binary masks per task select which neurons activate. Different domains use different network subsets — compact and zero-forgetting.",
      ],
    },
  ],
  "multi-source-da-v2": [
    {
      id: "q-adapt-kp37-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MSDA (Multi-Source Domain Adaptation) addresses which limitation of single-source DA?",
      options: [
        "Single-source DA cannot handle regression",
        "Single-source DA is limited by one domain\'s diversity — MSDA leverages multiple heterogeneous sources to learn more robust domain-invariant features covering the target domain better",
        "Single-source DA requires more labeled target data",
        "Single-source DA only works with images",
      ],
      correctAnswer: 1,
      explanation:
        "MSDA methods: MDAN (per-source adversarial discriminators + mixture weights), DCTN (k-way adversarial alignment), LtC-MSDA (moment matching across all source-target pairs). MSDA bound: \\epsilon_T(h) \\leq \\Sigma_k \\alpha_k[\\epsilon_{S_k}(h) + d_{H△H}(S_k, T)] + \\lambda*. Sources closer to target receive higher weight. Domain-specific BN: separate BN statistics per source during training, shared at inference.",
      hints: [
        "Source pooling failure: conflicting feature statistics between sources create domain-confounded representations that transfer poorly.",
        "MDAN: K binary discriminators (source k vs target) + task classifier jointly optimized. Source weights \\alpha_k learned end-to-end.",
      ],
    },
    {
      id: "q-adapt-kp37-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Naively combining all source datasets (source pooling) typically underperforms MSDA methods that explicitly model inter-source heterogeneity.",
      correctAnswer: "True",
      explanation:
        "Source pooling ignores inter-source gaps. When sources have conflicting statistics, a pooled model learns domain-confounded representations. MSDA methods with per-source discriminators and weighting outperform source pooling on Office-31 and DomainNet by 2-8%. Domain-specific batch normalization separates source-specific distributions while enabling a shared feature extractor.",
      hints: [
        "Negative transfer: sources very far from target (high H-divergence) can actively hurt adaptation. Source selection/weighting by target relevance is key.",
        "Office-31: Amazon, DSLR, Webcam domains. DomainNet: 6 domains (photo, clipart, sketch, painting, quickdraw, infograph) with 345 classes.",
      ],
    },
    {
      id: "q-adapt-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The MSDA generalization bound motivates learning source mixture weights \\alpha_k by:",
      options: [
        "Maximizing total source data size",
        "Minimizing \\Sigma_k \\alpha_k[\\epsilon_{S_k}(h) + d_{H△H}(S_k, T)] — weighting sources by their error + divergence to the target, so closer, more accurate sources receive more weight",
        "Using equal weights for all sources",
        "Weighting by source dataset size only",
      ],
      correctAnswer: 1,
      explanation:
        "The MSDA bound \\Sigma_k \\alpha_k[\\epsilon_{S_k}(h) + d_{H△H}(S_k, T)] + \\lambda* suggests optimal \\alpha_k minimizes weighted sum of source error and source-target H-divergence. In practice: learn \\alpha_k as attention weights over source domain discriminator outputs. Sources with low divergence to target and low source error receive the most weight.",
      hints: [
        "H-divergence estimation: domain classifier accuracy \\epsilon_d gives d_{H△H} \\approx 2(1-2\\epsilon_d). Low domain classifier accuracy = high divergence = similar source and target.",
        "\\lambda* term: if no hypothesis performs well on all sources + target, bound is vacuous — negative transfer regime.",
      ],
    },
  ],
  "da-generalization": [
    {
      id: "q-adapt-kp38-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Domain generalization differs from domain adaptation in that:",
      options: [
        "DG uses more labeled source data",
        "DG has no access to target domain data at training time — the model must generalize to unseen domains using only source data, whereas DA has access to target samples (labeled or unlabeled) during training",
        "DG only applies to image classification",
        "DG requires 10+ source domains while DA works with one",
      ],
      correctAnswer: 1,
      explanation:
        "DG is strictly harder than DA. DA leverages target distribution for alignment; DG must learn invariances without seeing the target. DG methods: (1) MixStyle: mix instance-level feature statistics across domains. (2) MLDG: meta-learning using held-out source as simulated target. (3) IRM: force optimal classifier to be domain-invariant. (4) SWAD: flat minima via weight averaging. DomainBed finding: ERM with proper tuning often matches specialized DG algorithms.",
      hints: [
        "Test-time training (TTT): hybrid between DG and DA — adapts using self-supervised auxiliary task on test batches without test labels.",
        "SWAD: finds flat minima by averaging weights along loss basin trajectory. Consistently outperforms ERM on DomainBed under fair evaluation.",
      ],
    },
    {
      id: "q-adapt-kp38-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Empirical Risk Minimization (ERM) with strong pre-trained backbones can sometimes match or outperform specialized DG algorithms on controlled benchmark evaluations.",
      correctAnswer: "True",
      explanation:
        "Gulrajani & Lopez-Paz (2021): ERM with proper hyperparameter tuning matches or beats many specialized DG algorithms on DomainBed. Key reasons: (1) Many DG algorithms tune on target domain (leakage). (2) Strong backbone + ERM is a powerful baseline. (3) True gains require genuinely better OOD generalization, not just better hyperparameter selection. This paper prompted the community to adopt stricter evaluation protocols.",
      hints: [
        "IID validation vs. leave-one-domain-out model selection gives different algorithm rankings — the choice of validation protocol significantly affects conclusions.",
        "Practical takeaway: always compare to ERM with the same backbone and training budget as a baseline before claiming DG method superiority.",
      ],
    },
    {
      id: "q-adapt-kp38-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "IRM (Invariant Risk Minimization) forces learning features where:",
      options: [
        "Average risk across all environments is minimized",
        "The optimal linear classifier w is the same across all environments — the IRM penalty ||\\nabla_{w|w=1} R^e(w∘\\Phi)||\\^2 forces \\Phi such that w=1 is simultaneously near-optimal for all environments, discarding environment-specific spurious correlations",
        "Data augmentation alone learns domain-invariant features",
        "Adversarial training is more stable than gradient penalties",
      ],
      correctAnswer: 1,
      explanation:
        "IRM motivation: ERM exploits spurious correlations that differ across environments (cows on grass in training, not test). IRM forces invariant features via the gradient penalty. Causal connection: IRM recovers causal feature set under strong assumptions. Limitations: requires diverse environments; with too few environments, degenerates to ERM. REx alternative: minimize variance of risks across environments — simpler with similar effect.",
      hints: [
        "IRM failure modes: with only 2 mildly diverse environments, IRM may overfit to those specific environments rather than learning truly invariant features.",
        "Practical IRM: \\lambda controls penalty strength. Start with small \\lambda and increase — monitor if penalty conflicts with accuracy.",
      ],
    },
  ],
  "subpopulation-shift": [
    {
      id: "q-adapt-kp39-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Subpopulation shift refers to:",
      options: [
        "Uniform feature distribution change across all groups",
        "Different group proportions at test vs. training time — a model maximizing average training accuracy performs poorly on minority groups whose test prevalence exceeds training prevalence",
        "Measurement errors in specific groups",
        "Adding new demographic features at test time",
      ],
      correctAnswer: 1,
      explanation:
        "Subpopulation shift example: 80% group A, 20% group B in training; 40% A, 60% B at test. Model biased toward A features fails at test. Methods: (1) Group DRO: minimize worst-group risk. (2) JTT: identify misclassified (likely minority) examples, upsample, retrain. (3) EIIL: infer group labels from model disagreement. Waterbirds benchmark: spurious land/water background correlation with bird type.",
      hints: [
        "Average accuracy is misleading for subpopulation shift — always report worst-group accuracy.",
        "JTT two-stage: (1) train ERM until convergence, (2) upsample misclassified examples 10-100\\times for final model.",
      ],
    },
    {
      id: "q-adapt-kp39-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Group DRO requires group annotations at training time to optimize worst-group performance.",
      correctAnswer: "True",
      explanation:
        "Standard Group DRO requires knowing each training sample\'s group to compute per-group losses and minimize the maximum. Annotations may be unavailable, legally restricted (GDPR), or expensive. Methods without explicit annotations: JTT (uses model errors as proxy), EIIL (infers environment labels from model disagreement), CnC (uses contrastive signals). The requirement for demographic labels is a practical limitation for real-world deployment.",
      hints: [
        "EIIL: train model on labeled data; examples where the model is uncertain get different environment labels than confident examples. Captures spurious feature reliance without demographic annotations.",
        "Privacy-preserving alternative: train group DRO with federated data where group labels are held locally and only aggregate group statistics are shared.",
      ],
    },
    {
      id: "q-adapt-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Group DRO minimizes max_{g\\inG} R^g(h). The theoretical guarantee is:",
      options: [
        "Low expected loss over the worst possible mixture of all distributions",
        "Uniformly low loss across all pre-defined groups — bounds worst-case test loss under subpopulation shift within the group structure G",
        "Variance minimization of losses across groups",
        "Sum of group losses weighted by estimated test group sizes",
      ],
      correctAnswer: 1,
      explanation:
        "Group DRO objective: min_\\theta max_{g\\inG} E_{(x,y)~P_g}[L(\\theta;x,y)]. Gradient update: always use the group with highest current loss. Convergence: O(1/√T) rate requiring per-group loss tracking. The guarantee holds under any subpopulation shift within the specified group structure G — if the test shift is outside G, guarantees may not hold.",
      hints: [
        "Softmax group weighting: \\alpha_g \\propto exp(R^g/\\tau) — smooth approximation of the max operator. Temperature \\tau controls concentration on worst group.",
        "Group size and variance: small groups have high-variance empirical risk estimates. Use EMA of per-group losses for stability.",
      ],
    },
  ],
  "da-nlp": [
    {
      id: "q-adapt-kp40-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Domain adaptation for NLP differs from vision DA primarily because:",
      options: [
        "NLP models cannot be pre-trained and fine-tuned like vision models",
        "Domain shift in NLP manifests as vocabulary shift, syntactic style, and topic drift rather than visual appearance changes — pre-trained LMs partially mitigate this, but continued pre-training on target domain text (BioBERT, SciBERT) remains important for specialized domains",
        "NLP DA only works for sentiment analysis",
        "NLP models are too small to benefit from domain adaptation",
      ],
      correctAnswer: 1,
      explanation:
        "NLP domain shift: (1) Vocabulary: medical text has specialized terminology. (2) Syntax: legal text uses passive constructions. (3) Topics: different topic distributions across domains. BioBERT: continued pre-training on PubMed abstracts outperforms general BERT by 1-3% on biomedical NER. SciBERT: trained on semantic scholar corpus for scientific text. Domain-adversarial fine-tuning also effective for cross-domain NLP adaptation.",
      hints: [
        "Continued pre-training recipe: take BERT checkpoint, train on target domain text with MLM for 100K steps. Simple and effective baseline for NLP DA.",
        "Domain-specific vocabularies: BioBERT uses BERT\'s original vocabulary (not domain-specific tokenizer). SciBERT trains its own BPE vocabulary on scientific text — improves subword tokenization quality for technical terms.",
      ],
    },
    {
      id: "q-adapt-kp40-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Zero-shot cross-lingual transfer (fine-tuning mBERT/XLM-R on English, evaluating on Spanish) can be viewed as domain adaptation where language is the domain.",
      correctAnswer: "True",
      explanation:
        "Cross-lingual transfer through DA lens: English = labeled source domain, Spanish = unlabeled target domain. Domain shift is both lexical and syntactic. DA methods applied to cross-lingual: (1) Language-adversarial training: make representations indistinguishable across languages. (2) Multilingual pre-training (XLM-R, mBERT): pre-trains on 100+ languages, learning cross-lingual invariances. XLM-R achieves near-English performance on XNLI for high-resource languages.",
      hints: [
        "Language divergence matters: English\\toGerman transfer better than English\\toChinese due to syntactic similarity and shared Latin script vocabulary.",
        "XTREME benchmark: evaluates cross-lingual transfer across 40 languages, 9 tasks (NER, QA, NLI, etc.).",
      ],
    },
    {
      id: "q-adapt-kp40-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Structural Correspondence Learning (SCL, Blitzer 2007) learns domain-invariant NLP representations by:",
      options: [
        "Using a pivot language as intermediary for cross-lingual translation",
        "Identifying pivot features (words appearing in both domains and predictive of labels in source), training binary classifiers to predict each pivot on both domain texts (no labels needed), and extracting domain-invariant features via SVD of the weight matrix",
        "Creating a pivot model trained on both domains as a distillation teacher",
        "Rotating feature vectors to remove domain-specific principal components",
      ],
      correctAnswer: 1,
      explanation:
        'SCL: (1) Select pivot features: high frequency in both domains + high MI with labels in source (e.g., "excellent", "terrible" for sentiment). (2) Train K binary classifiers: does pivot p_k appear in this text? On both domain data without labels. (3) SVD on weight matrix [w_1,...,w_K]: extract low-dimensional domain-invariant features. (4) Augment original features with latent features. Key insight: features correlating with pivots across domains are domain-invariant proxy for the label. DANN generalizes this with adversarial domain classifier.',
      hints: [
        "Pivot selection: n-gram frequency > threshold in BOTH domains + high MI with labels in source only. Too domain-specific pivots don\'t transfer.",
        "SCL vs DANN: SCL uses discrete pivot prediction tasks (older method). DANN uses continuous adversarial alignment (current standard). Both learn domain-invariant representations.",
      ],
    },
  ],
};

Object.assign(questions, moreAdaptQ2);

const moreAdaptQ3: Record<string, Question[]> = {
  "test-time-training": [
    {
      id: "q-adapt-kp41-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Test-Time Training (TTT, Sun et al. 2020) adapts a model at test time by:",
      options: [
        "Fine-tuning the full network on the test batch using the primary task loss with pseudo-labels",
        "Using a shared encoder trained jointly on a supervised main task and a self-supervised auxiliary task, then updating only the encoder at test time using the auxiliary task loss on each test sample",
        "Replacing the classifier head with a k-NN lookup over cached training embeddings at inference time",
        "Distilling a large source model into a smaller target model using test samples as the distillation dataset",
      ],
      correctAnswer: 1,
      explanation: "TTT splits a model into shared encoder + main-task head + auxiliary-task head. During source training both heads are trained jointly. At test time, the main-task head is frozen and only the encoder is updated using the self-supervised auxiliary loss (e.g., rotation prediction) on each individual test sample or mini-batch. This enables sample-level adaptation without any target labels. Key insight: the auxiliary task provides a learning signal that is correlated with useful representations, so optimizing it at test time shifts the encoder toward the target distribution.",
      hints: [
        "The auxiliary task must be learnable from unlabeled data — rotation prediction, jigsaw, SimCLR contrastive loss all work.",
        "TTT adapts the encoder per-sample or per-batch; TTT++ extends this with momentum updates to avoid catastrophic forgetting.",
      ],
    },
    {
      id: "q-adapt-kp41-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "TENT (Wang et al. 2021) performs test-time adaptation by:",
      options: [
        "Retraining all model parameters on test data with a cross-entropy loss using pseudo-labels",
        "Minimizing the entropy of model predictions on the test batch by updating only the affine parameters (gamma, beta) of batch normalization layers",
        "Applying exponential moving average of source model weights and current model weights during inference",
        "Training a domain classifier adversarially on test features to align them with source features",
      ],
      correctAnswer: 1,
      explanation: "TENT (Test ENTropy minimization) freezes all parameters except the scale (gamma) and shift (beta) parameters of BatchNorm layers, then minimizes prediction entropy H(p) = -sum p_i log p_i on the test batch. Only 2 parameters per BN layer are updated, making adaptation extremely lightweight. The entropy objective encourages confident, low-entropy predictions without requiring labels. TENT is effective because BN affine parameters control feature statistics — adapting them corrects the batch norm statistics mismatch between source and target domains.",
      hints: [
        "TENT only updates BN affine params (gamma, beta), not the running mean/variance — those are also reset to test-batch statistics.",
        "Entropy minimization is a proxy for target accuracy: confident predictions correlate with correct predictions when the domain shift is not too large.",
      ],
    },
    {
      id: "q-adapt-kp41-3",
      type: "true-false",
      difficulty: "medium",
      question: "TENT (entropy minimization at test time) is guaranteed to improve accuracy for any level of domain shift, provided the model was pretrained on a sufficiently large source dataset.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "TENT can fail or even hurt accuracy under large domain shifts or when the source model's predictions on the target are already highly uncertain. Entropy minimization can collapse to a degenerate solution where the model confidently predicts one class for all inputs (entropy collapse). Additionally, TENT adapts only BN affine parameters — if the feature extractor is deeply mismatched to the target, shallow BN adaptation is insufficient. Robust TTA methods like SAR and EATA add regularization to prevent collapse.",
      hints: [
        "Entropy collapse: if the model predicts class 0 for everything, entropy is 0 — this is a valid but useless minimum of the TENT objective.",
        "TENT works best for small-to-medium domain shifts (e.g., ImageNet-C corruptions) but struggles with large structural domain gaps.",
      ],
    },
    {
      id: "q-adapt-kp41-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Continual Test-Time Adaptation (CoTTA, Wang et al. 2022) addresses which key failure mode of naive test-time adaptation methods like TENT when applied sequentially across many changing domains?",
      options: [
        "Excessive GPU memory usage from storing intermediate activations for gradient computation",
        "Catastrophic forgetting of source knowledge combined with error accumulation: as pseudo-label errors compound over time, the model drifts away from the source initialization and performance degrades monotonically",
        "Inability to adapt to domains that are visually similar to the source domain",
        "Overconfident predictions due to batch normalization statistics being updated too aggressively",
      ],
      correctAnswer: 1,
      explanation: "CoTTA identifies two compounding failure modes in continual TTA: (1) error accumulation — noisy pseudo-labels at each step compound errors, and (2) catastrophic forgetting — the model drifts from source weights so far that it loses source-domain knowledge. CoTTA addresses both with: (a) stochastic restore — randomly reset a fraction of parameters to source weights at each step to maintain source knowledge, and (b) augmentation-averaged predictions — average predictions across multiple augmented views of each test sample to obtain robust pseudo-labels, reducing noise. This allows stable adaptation across sequences of continuously changing domains.",
      hints: [
        "Error accumulation analogy: each noisy pseudo-label update moves the model slightly in the wrong direction; over thousands of steps, the model is far from optimal.",
        "Stochastic restore in CoTTA: with probability p, each neuron's weights are reset to source weights — this acts as an implicit regularizer toward the source model.",
      ],
    },
  ],
  "shot-sfda": [
    {
      id: "q-adapt-kp42-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "SHOT (Source Hypothesis Transfer, Liang et al. 2020) is a source-free domain adaptation method. What does it transfer from source to target, and what objective does it minimize on the target domain?",
      options: [
        "It transfers the full source model and fine-tunes all layers using entropy minimization and source data replay",
        "It transfers only the frozen source classifier head and adapts the target feature extractor by jointly minimizing prediction entropy and maximizing prediction diversity (information maximization), while using pseudo-labels for clustering-based self-training",
        "It transfers source domain statistics and uses them as a prior for Bayesian adaptation on target features",
        "It transfers the source encoder and aligns target features to source features using a learned discriminator without the source data",
      ],
      correctAnswer: 1,
      explanation: "SHOT's key insight: the source classifier (hypothesis) encodes source-domain class boundaries. Fix this classifier and only adapt the feature extractor on the target. Objective: Information Maximization (IM) = -H(mean_x p(y|x)) + mean_x H(p(y|x)) — the first term maximizes prediction diversity across the target batch (prevents collapse to one class), the second term minimizes per-sample entropy (encourages confident predictions). Pseudo-labels from nearest-centroid clustering in the feature space further refine adaptation. No source data is needed — only the pretrained model is transferred, addressing privacy concerns.",
      hints: [
        "Information maximization = maximize marginal entropy (diversity) + minimize conditional entropy (confidence). These two competing objectives prevent both collapse and overconfidence.",
        "SHOT-IM (information maximization only) vs SHOT (IM + pseudo-label self-training): the latter achieves state-of-the-art on Office-Home.",
      ],
    },
    {
      id: "q-adapt-kp42-2",
      type: "true-false",
      difficulty: "easy",
      question: "Source-free domain adaptation (SFDA) methods require access to source domain data during the target adaptation phase.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "SFDA methods are specifically designed to adapt to a target domain using only the pretrained source model (weights), without any access to source data during adaptation. This is important for privacy (source data may be proprietary or contain sensitive user data) and practical constraints (source data may be too large to transfer or unavailable after deployment). Methods like SHOT, SFDA-DE, and G-SFDA all operate with only the source model checkpoint and unlabeled target data.",
      hints: [
        "SFDA motivation: GDPR and data privacy regulations may prevent sharing source training data with the team adapting to a new target domain.",
        "SFDA vs UDA: UDA has access to both source and target data simultaneously; SFDA only has the pretrained model and target data.",
      ],
    },
    {
      id: "q-adapt-kp42-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A major challenge in source-free domain adaptation is the quality of pseudo-labels on the target domain. Which strategy best mitigates noisy pseudo-labels in SFDA?",
      options: [
        "Use all target samples with equal weight regardless of prediction confidence",
        "Select only the top-k% most confident pseudo-labeled samples (confidence thresholding) and iteratively refine pseudo-labels using clustering in the feature space, discarding samples near decision boundaries",
        "Generate synthetic source data using a GAN trained on target images and use those as the source",
        "Apply dropout at inference time and use the variance of predictions to weight pseudo-labels",
      ],
      correctAnswer: 1,
      explanation: "Confidence thresholding filters out low-confidence samples where the model is uncertain, reducing the noise injected into pseudo-label training. Iterative clustering-based refinement further helps: cluster target features in the embedding space, assign cluster centroids as class prototypes, and reassign pseudo-labels based on nearest centroid rather than raw softmax output. This is less sensitive to calibration errors. SHOT uses nearest-centroid assignment; NRC uses neighborhood reciprocal graph to propagate pseudo-labels through a target-side graph structure. Both approaches outperform naive confidence-only filtering.",
      hints: [
        "Confidence threshold selection: typically 0.7-0.9 softmax probability. Too high = few samples used. Too low = noisy labels dominate.",
        "Clustering pseudo-labels are more robust because they aggregate information across many samples, smoothing out per-sample softmax errors.",
      ],
    },
  ],
  "invariant-risk-min": [
    {
      id: "q-adapt-kp43-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Invariant Risk Minimization (IRM, Arjovsky et al. 2019) aims to learn a feature representation phi(X) such that the optimal classifier on top of phi(X) is the same across all environments. The IRM objective penalizes:",
      options: [
        "The difference in marginal feature distributions P_e(phi(X)) across environments",
        "The gradient of the per-environment empirical risk with respect to a fixed classifier w=1.0, penalizing any representation where w=1.0 is not simultaneously optimal across all environments",
        "The covariance between features and environment labels, enforcing statistical independence",
        "The maximum mean discrepancy (MMD) between feature distributions of different environments",
      ],
      correctAnswer: 1,
      explanation: "IRM objective: min_{phi,w} sum_e R_e(w circ phi) + lambda * sum_e ||gradient_{w|w=1} R_e(w circ phi)||^2. The penalty term ||gradient_{w|w=1} R_e||^2 measures how far the fixed classifier w=1 is from being simultaneously optimal for environment e. If w=1 is optimal for all environments (gradient=0 everywhere), it means no better linear classifier exists on phi — i.e., the representation already captures the invariant causal features. Spurious correlations (e.g., cow on grass background) are non-invariant: the optimal classifier differs across environments where the correlation holds/breaks.",
      hints: [
        "IRM intuition: if a feature causes the label, the optimal classifier on that feature is the same regardless of environment. If a feature is spuriously correlated, the optimal classifier changes across environments.",
        "IRMv1 uses w=1 as the fixed point for gradient computation — a linearization that makes the objective tractable but approximate.",
      ],
    },
    {
      id: "q-adapt-kp43-2",
      type: "true-false",
      difficulty: "hard",
      question: "IRM (Invariant Risk Minimization) consistently outperforms ERM (Empirical Risk Minimization) on standard domain generalization benchmarks like DomainBed when the number of training environments is large.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Gulrajani and Lopez-Paz (2021) showed in a careful DomainBed study that IRM does NOT consistently outperform a well-tuned ERM baseline when controlling for model selection methodology and hyperparameters. IRM's theoretical guarantees require many diverse environments and linear models; with deep nonlinear networks and limited environments, IRM can underfit or fail to find the invariant representation. The study found that ERM with careful data augmentation and model selection often matches or beats IRM on practical benchmarks.",
      hints: [
        "DomainBed finding: the gap between IRM and ERM often disappears when using the same model selection protocol (train-domain validation vs oracle).",
        "IRM's nonlinear extension (IRMv1) is a relaxation of the original constraint — it is not guaranteed to find the true invariant predictor.",
      ],
    },
    {
      id: "q-adapt-kp43-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Distributionally Robust Optimization (DRO) for domain generalization minimizes the worst-case risk over a set of distributions. Group DRO (Sagawa et al. 2020) differs from standard DRO by:",
      options: [
        "Using a KL-ball around the empirical distribution and solving with a Lagrangian dual",
        "Defining the uncertainty set as a finite collection of known data groups (e.g., demographic subgroups) and minimizing the maximum risk across those groups via online exponentiated gradient updates on group weights",
        "Minimizing the variance of per-sample losses across the training set rather than the mean",
        "Applying importance weights equal to the inverse of group frequency to rebalance minority groups",
      ],
      correctAnswer: 1,
      explanation: "Group DRO assumes training data is partitioned into known groups (e.g., 'blond women', 'non-blond men' in CelebA hair prediction). It minimizes max_g R_g(theta) by maintaining exponentially updated weights over groups: groups with higher current loss receive higher weight at each step. This ensures the model performs well on the worst-performing group, not just on average. Unlike f-DRO which uses a continuous KL-ball, Group DRO requires explicit group annotations at training time. It significantly improves worst-group accuracy (e.g., from 47% to 91% on Waterbirds) at some average accuracy cost.",
      hints: [
        "Group DRO limitation: requires known group annotations at training time. Without annotations, you must use Just Train Twice (JTT) or GEORGE to infer group structure.",
        "Group DRO update rule: q_g <- q_g * exp(eta * R_g(theta)) then normalize. High-loss groups get upweighted each step.",
      ],
    },
  ],
  "coral-dg": [
    {
      id: "q-adapt-kp44-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "CORAL (Correlation Alignment, Sun and Saenko 2016) aligns source and target domains by:",
      options: [
        "Matching the first-order statistics (mean) of source and target feature distributions using batch normalization",
        "Minimizing the Frobenius norm of the difference between source and target second-order statistics (covariance matrices) of features, effectively whitening source features and coloring them with target covariance",
        "Adversarially training a domain discriminator to make source and target features indistinguishable",
        "Applying maximum mean discrepancy (MMD) with a polynomial kernel to match feature moments up to degree 2",
      ],
      correctAnswer: 1,
      explanation: "CORAL loss: L_CORAL = (1/4d^2) * ||C_S - C_T||_F^2 where C_S and C_T are the d x d covariance matrices of source and target features respectively, and ||.||_F is the Frobenius norm. By minimizing this loss along with the task loss, the feature extractor is trained to produce distributions with matching second-order statistics. Deep CORAL (Sun and Saenko 2016b) applies this loss to multiple deep layers. Unlike adversarial methods, CORAL has no minimax instability and is simple to implement. It is equivalent to whitening source features and re-coloring with target covariance.",
      hints: [
        "Covariance alignment captures correlations between feature dimensions — richer than just mean matching (which BN handles).",
        "CORAL vs MMD: MMD uses a kernel (infinite-dimensional feature map); CORAL explicitly matches up to 2nd order moments. CORAL is simpler but MMD is more general.",
      ],
    },
    {
      id: "q-adapt-kp44-2",
      type: "true-false",
      difficulty: "easy",
      question: "CORAL's domain alignment loss requires labeled data from the target domain to compute the target covariance matrix.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "CORAL computes the target covariance matrix from unlabeled target features — no target labels are needed. The source covariance is computed from labeled source features, and the CORAL loss penalizes the Frobenius distance between the two covariance matrices. This makes CORAL applicable in the standard UDA (unsupervised domain adaptation) setting where target data is unlabeled. The task loss (cross-entropy) uses only labeled source data, while the CORAL loss uses features from both domains.",
      hints: [
        "Covariance computation: C_T = (1/n_T) * X_T^T X_T - mu_T mu_T^T where X_T are target features and mu_T is the target mean. Labels not needed.",
        "CORAL is an unsupervised alignment method — all target supervision signals come from the covariance structure, not labels.",
      ],
    },
  ],
  "meta-learning-dg": [
    {
      id: "q-adapt-kp45-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "MLDG (Meta-Learning for Domain Generalization, Li et al. 2018) adapts MAML to domain generalization by treating source domains as meta-train and meta-test tasks. What is the key training procedure?",
      options: [
        "Train on all source domains jointly with data augmentation, then fine-tune on one held-out source domain per meta-iteration",
        "At each meta-iteration, split source domains into meta-train and meta-test sets, take a gradient step on meta-train, evaluate the updated model on meta-test, and backpropagate through the gradient step to update the original parameters — simulating generalization to an unseen domain",
        "Train a domain-agnostic initialization using contrastive learning across source domain pairs, then evaluate zero-shot on target domains",
        "Use the validation loss on held-out source domains as a reward signal for a policy gradient update on the feature extractor parameters",
      ],
      correctAnswer: 1,
      explanation: "MLDG follows the MAML bi-level optimization framework: (1) Sample meta-train domains D_tr and meta-test domains D_te from source environments. (2) Compute adapted parameters theta' = theta - alpha * gradient_theta L(D_tr; theta). (3) Compute meta-test loss L(D_te; theta'). (4) Update original theta using gradient of L(D_te; theta') with respect to theta (requiring second-order gradients through the inner update). The key insight: by simulating domain shift during training (meta-train vs meta-test are different source domains), the model learns to generalize to distribution shift, preparing it for unseen target domains.",
      hints: [
        "MLDG vs MAML: MAML simulates task shift (few-shot learning). MLDG simulates domain shift (different source domains as proxy for unseen target).",
        "Computational cost: second-order gradients (gradient through gradient) are expensive. First-order MAML approximation (FOMAML) drops second-order terms and is much faster.",
      ],
    },
    {
      id: "q-adapt-kp45-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When using meta-learning for domain generalization, which assumption must hold for the approach to work well on truly unseen target domains?",
      options: [
        "The target domain must be linearly separable in the original input space",
        "The domain shift between source meta-train and meta-test domains must be representative of the shift between source and target — i.e., the source domains must span the same type of variation as the source-to-target gap",
        "The number of source domains must be greater than the number of target domains to ensure coverage",
        "The target domain must share the same label space as at least one source domain",
      ],
      correctAnswer: 1,
      explanation: "Meta-learning for DG assumes that the meta-train/meta-test domain split within source domains mimics the source-to-target shift. If source domains all differ in one type (e.g., lighting conditions) but the real target shift is a different type (e.g., geographic distribution shift), the meta-learning signal does not prepare the model for the actual target. This is a fundamental limitation: with only 3-5 source domains, the meta-learning signal is often too weak and domain-type-specific. Empirically, MLDG provides modest gains over ERM on DomainBed, suggesting the assumption is often violated.",
      hints: [
        "If all source domains are photos from different cities and the target domain is satellite images, meta-learning across cities will not help with the photo-to-satellite shift.",
        "DomainBed finding: MLDG and other meta-learning DG methods show inconsistent improvements over ERM, often within confidence intervals.",
      ],
    },
  ],
  "multi-source-domain-adaptation": [
    {
      id: "q-adapt-kp46-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "MDAN (Multi-Domain Adaptation Networks, Zhao et al. 2018) extends adversarial domain adaptation to K source domains. What is the key challenge it solves over naive pooling of all source data?",
      options: [
        "Naive pooling requires K^2 discriminators which is computationally intractable for large K",
        "Naive pooling treats all source domains as identical, which can cause a single source domain to dominate alignment. MDAN trains K separate domain discriminators (one per source-target pair) to align each source independently with the target, with optional min or soft-max aggregation over domain losses",
        "Naive pooling cannot handle different label spaces across source domains",
        "Naive pooling requires all source domains to have the same number of samples, which is rarely satisfied in practice",
      ],
      correctAnswer: 1,
      explanation: "MDAN's key insight: in multi-source DA, different source domains have varying relevance to the target. Pooling all sources and training one discriminator creates a weighted average alignment that may not fully align any individual source. MDAN trains one GRL-based domain discriminator per source domain, aligning each source to the target domain independently. It proposes two aggregation strategies: (1) min-max: ensures all source domains are aligned; (2) soft-max: uses a softmax-weighted combination of domain losses, naturally downweighting irrelevant sources. Both outperform naive pooling on Office-31.",
      hints: [
        "One discriminator per source-target pair: K discriminators for K sources. Each discriminator sees only one source + target. No cross-source interaction.",
        "Soft-max variant automatically discovers source domain weights: sources dissimilar to target get low weight, similar sources get high weight.",
      ],
    },
    {
      id: "q-adapt-kp46-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In multi-source domain adaptation, domain mixing via MixUp applied across domains provides what primary benefit over within-domain MixUp?",
      options: [
        "Inter-domain MixUp reduces training time by creating virtual samples that replace original source samples",
        "Inter-domain MixUp creates interpolated training samples between source domains and between source and target, smoothing the decision boundary across domain boundaries and acting as an implicit domain alignment regularizer that bridges domain gaps",
        "Inter-domain MixUp doubles the effective training set size without any computational overhead",
        "Inter-domain MixUp eliminates the need for a domain discriminator in adversarial DA methods",
      ],
      correctAnswer: 1,
      explanation: "Standard within-domain MixUp linearly interpolates between samples of the same domain. Inter-domain MixUp interpolates between samples from different source domains or between source and target samples. The mixed samples lie in the manifold between domains, encouraging the feature extractor to produce smoothly varying features across domains. This acts as a regularizer that prevents abrupt feature changes at domain boundaries, improving generalization. Mixup-based DA methods like DomainMix and DCAN show consistent improvements in multi-source DA settings.",
      hints: [
        "MixUp creates virtual samples on the convex hull of the training set. Inter-domain MixUp extends this to the convex hull spanning multiple domains.",
        "Target MixUp: mixing source (labeled) and target (unlabeled) samples with label from source only — creates a supervised bridge between domains.",
      ],
    },
    {
      id: "q-adapt-kp46-3",
      type: "true-false",
      difficulty: "medium",
      question: "In multi-source domain adaptation, it is always optimal to assign equal weight to all source domains regardless of their similarity to the target domain.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Source domain weighting based on target similarity consistently improves multi-source DA performance. A source domain closer to the target (measured by domain divergence, MMD, or classifier confidence) should receive higher weight in both the task loss and domain alignment loss. Methods like MDAN-soft, LtC-MSDA, and DCTN all learn to upweight source domains more relevant to the target. Equal weighting can hurt if one source domain is very dissimilar to the target — adapting to a dissimilar source can corrupt features useful for the target. Oracle experiments consistently show that target-similarity-based weighting outperforms uniform weighting.",
      hints: [
        "Intuition: if adapting from {photos, sketches, cartoons} to clipart, photos are more relevant than sketches, so they should get higher weight.",
        "Domain similarity can be measured by: (1) Proxy A-distance, (2) MMD between source and target features, (3) source domain model's accuracy on target pseudo-labels.",
      ],
    },
    {
      id: "q-adapt-kp46-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LtC-MSDA (Learning to Combine for Multi-Source Domain Adaptation) learns source domain combination weights dynamically. Which mechanism does it use to determine per-source weights during adaptation?",
      options: [
        "A fixed attention head trained on labeled target samples to score each source domain's relevance",
        "A meta-learner that treats target performance as a reward and uses policy gradient to update source domain weights across training episodes",
        "Learnable domain-specific gates trained end-to-end: for each target sample, a small network predicts how to weight each source domain's feature representation based on the distance of the target sample to each source prototype in the feature space",
        "A fixed inverse-distance weighting based on pre-computed MMD between each source and the target, never updated during adaptation",
      ],
      correctAnswer: 2,
      explanation: "LtC-MSDA uses a sample-wise domain combination approach: for each target sample x_t, it computes its distance to the centroid of each source domain in the feature space, then uses a learned gating network (softmax over distances) to produce per-source weights alpha_k(x_t). The final adapted feature is sum_k alpha_k(x_t) * phi_k(x_t) where phi_k is a source-specific feature extractor branch. This allows the model to leverage different source domains for different target samples. This sample-level adaptation is significantly more flexible than fixed domain-level weighting.",
      hints: [
        "Sample-level weighting vs domain-level weighting: domain-level assigns one weight per source domain for all target samples; sample-level assigns different weights per target sample based on local similarity.",
        "LtC-MSDA prototype distance: domain prototypes are computed as the mean feature vector of each source domain. Target distance to each prototype guides the gating network.",
      ],
    },
  ],
  "dro-domain-generalization": [
    {
      id: "q-adapt-kp47-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "f-DRO (f-divergence Distributionally Robust Optimization) minimizes the worst-case risk over a set of distributions constrained within an f-divergence ball around the empirical distribution. What happens as the ball size rho increases?",
      options: [
        "The model becomes less robust because it optimizes over a larger uncertainty set",
        "The optimization becomes more conservative, optimizing against increasingly adverse perturbations of the data distribution, which can improve worst-group robustness but hurts average accuracy by upweighting unlikely distribution shifts",
        "The computational complexity decreases because fewer distributions need to be considered",
        "The model converges to ERM as rho increases because the constraint becomes less binding",
      ],
      correctAnswer: 1,
      explanation: "As rho increases, the uncertainty set grows to include distributions further from the empirical distribution. The DRO objective becomes more pessimistic, upweighting the tails of the loss distribution. At small rho, DRO approximates ERM. At large rho, DRO upweights rare high-loss examples strongly, potentially harming average accuracy. Chi-squared DRO (a special case of f-DRO) has an elegant dual form: it minimizes the mean + sqrt(rho) * standard deviation of the loss, explicitly trading average performance for loss variance.",
      hints: [
        "Chi-squared DRO dual: min_theta E[L] + sqrt(rho) * std(L). The sqrt(rho) term controls how much variance we penalize.",
        "rho calibration: estimate the f-divergence between source and expected target distribution from held-out validation data, then set rho to this estimate.",
      ],
    },
    {
      id: "q-adapt-kp47-2",
      type: "true-false",
      difficulty: "medium",
      question: "Group DRO requires knowledge of group membership (e.g., which demographic group each training sample belongs to) at training time.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Group DRO (Sagawa et al. 2020) explicitly requires group annotations for all training samples. The algorithm maintains per-group loss estimates and upweights groups with higher current loss. Without group annotations, you cannot compute per-group losses. This is a key practical limitation: group labels may require additional annotation effort and may not always be available. Methods like JTT (Just Train Twice) and GEORGE attempt to infer group structure from training dynamics (misclassified samples tend to belong to spurious-correlation minority groups) without explicit group labels.",
      hints: [
        "Group DRO requires: (1) group labels for all training data; (2) groups defined a priori by the practitioner. Both constraints limit practical applicability.",
        "JTT (Liu et al. 2021) avoids group labels: train ERM, identify hard (misclassified) samples, upsample them in retraining. Hard samples often correspond to minority groups.",
      ],
    },
  ],
  "ttt-variants": [
    {
      id: "q-adapt-kp48-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Test-Time Prompt Tuning (TPT, Shu et al. 2022) adapts vision-language models like CLIP at test time. How does it generate the adaptation signal?",
      options: [
        "It fine-tunes the image encoder weights using entropy minimization on the test image with random augmentations",
        "It optimizes the text prompt tokens to minimize entropy of CLIP predictions averaged over multiple augmented views of the single test image, filtering out high-entropy augmentations before averaging",
        "It replaces the class text embeddings with learned prototype vectors computed from the test image and its augmentations",
        "It fine-tunes both image and text encoders jointly using a contrastive loss between the test image and class name texts",
      ],
      correctAnswer: 1,
      explanation: "TPT works as follows: for a single test image x, generate N augmented views {x_1,...,x_N} using random crop/flip/color jitter. For each augmented view, compute CLIP prediction p_i = softmax(CLIP(x_i, text_prompts)). Filter views with high per-view entropy (top fraction discarded as too ambiguous). Average remaining predictions: p_avg = mean(p_i). Minimize entropy H(p_avg) by backpropagating through the frozen CLIP encoders and updating only the soft prompt tokens in the text encoder. This adapts the text representation toward the current test sample without any auxiliary task or source data. Achieves strong results on ImageNet-A, ImageNet-R, ImageNet-Sketch.",
      hints: [
        "TPT adapts only the prompt tokens (a few learnable vectors prepended to the text sequence), not the CLIP image or text encoder weights.",
        "High-entropy view filtering removes ambiguous augmentations that would add noise to the entropy objective — typically the top 10% most uncertain views.",
      ],
    },
    {
      id: "q-adapt-kp48-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A model deployed in production needs to adapt to a gradual distribution shift over weeks without access to labels. Which combination of methods best handles this scenario?",
      options: [
        "Periodic full retraining on a fixed source dataset to reset model parameters",
        "Continual test-time adaptation (CoTTA) with stochastic parameter restore and augmentation-averaged pseudo-labels, combined with a memory buffer of representative target samples for periodic rehearsal to prevent forgetting",
        "One-time source-trained model with no adaptation — production systems should not update deployed models without human approval",
        "Full model fine-tuning on all incoming target data using cross-entropy with hard pseudo-labels, with no regularization",
      ],
      correctAnswer: 1,
      explanation: "Gradual distribution shift over time requires continual adaptation that: (1) continuously incorporates new target data signal (TTA), (2) prevents catastrophic forgetting of previously adapted states (stochastic restore, memory buffer rehearsal), and (3) uses robust pseudo-labels (augmentation-averaged predictions reduce noise). CoTTA addresses (1) and (2). Adding a memory buffer (randomly sampled representative target points from recent history) for replay addresses (3) and provides temporal coherence. Full naive fine-tuning with hard pseudo-labels compounds errors quickly. Periodic full retraining is expensive and requires storing large datasets.",
      hints: [
        "Gradual shift challenge: the model must move with the distribution without forgetting where it was. This is the stability-plasticity dilemma in continual learning.",
        "Memory buffer size for TTA: typically 1-5% of expected test set size, sampled with reservoir sampling to maintain temporal diversity.",
      ],
    },
  ],
  "sfda-refinement": [
    {
      id: "q-adapt-kp49-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "NRC (Neighborhood Reciprocal Classifier, Yang et al. 2021) improves source-free domain adaptation using nearest-neighbor graph structures. What is the 'reciprocal' concept and why does it improve pseudo-label quality?",
      options: [
        "NRC uses bidirectional domain discriminators (source-to-target and target-to-source) to ensure symmetric alignment",
        "NRC defines the reciprocal neighborhood of sample x as samples that also have x in their k-NN list — mutual nearest neighbors — which form a more reliable set of similar samples than one-directional k-NN, as mutual proximity indicates genuine feature similarity rather than hubness artifacts",
        "NRC uses a reciprocal learning rate schedule that alternates between high and low LR phases during adaptation",
        "NRC trains two classifiers that mutually supervise each other using reciprocal pseudo-labels, similar to co-training",
      ],
      correctAnswer: 1,
      explanation: "NRC addresses the hubness problem: in high-dimensional spaces, some samples ('hubs') appear as nearest neighbors of many other samples even if they are not genuinely similar. One-directional k-NN suffers from this. Reciprocal nearest neighbors: sample x_i's reciprocal neighborhood is {x_j : x_i in kNN(x_j) AND x_j in kNN(x_i)}. Mutual nearest neighbors are much more reliably similar because both points independently chose each other as close. NRC propagates pseudo-labels through the reciprocal neighborhood graph: each sample's pseudo-label is a weighted average of its reciprocal neighbors' predictions. This graph-based propagation reduces the impact of individual noisy predictions and improves pseudo-label accuracy on Office-Home/VisDA.",
      hints: [
        "Hubness problem: in 256-d feature space, some samples appear in k-NN lists of many points due to the curse of dimensionality, not genuine similarity.",
        "Reciprocal k-NN is the intersection of kNN(x_i) and {x_j : x_i in kNN(x_j)} — typically much smaller than k, but much higher precision.",
      ],
    },
    {
      id: "q-adapt-kp49-2",
      type: "true-false",
      difficulty: "medium",
      question: "In source-free domain adaptation, the source model's classifier head should always be discarded and re-initialized for target adaptation because it encodes source-domain-specific decision boundaries.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "SHOT (Liang et al. 2020) demonstrates the opposite: the source classifier head is the 'source hypothesis' that encodes class structure learned from labeled source data. It is FROZEN during target adaptation. Only the feature extractor is adapted. The classifier head's weights define class prototypes in the feature space — these class prototypes are valuable and would be lost if the head were re-initialized. The adaptation goal is to transform target features so they align with the class structure already encoded in the frozen classifier, not to re-learn class structure from scratch.",
      hints: [
        "SHOT intuition: the frozen classifier head acts as an anchor. Target feature extractor is trained to produce features that satisfy the class boundaries already defined by the source classifier.",
        "If you re-initialize the classifier head, you lose all class discrimination knowledge from the source. You would need labeled target data to re-learn it.",
      ],
    },
    {
      id: "q-adapt-kp49-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "G-SFDA (Graph-based Source-Free Domain Adaptation) constructs a neighborhood graph on target features. What is the primary purpose of this graph during adaptation?",
      options: [
        "To replace the source classifier with a graph neural network trained on target pseudo-labels",
        "To enforce local consistency: neighboring target samples should have the same pseudo-label, allowing propagation of high-confidence predictions to uncertain neighbors and reducing the effective number of free pseudo-label assignments",
        "To compute graph Laplacian regularization that keeps target features close to the source feature manifold",
        "To detect and remove outlier target samples that are far from all other target samples",
      ],
      correctAnswer: 1,
      explanation: "G-SFDA builds a kNN graph on target features where edges connect similar samples. The local structure assumption (LCA) states that samples in the same local neighborhood are likely from the same class. The graph serves as a pseudo-label propagation mechanism: high-confidence predictions (from source model initialization) propagate through edges to uncertain neighbors, similar to label propagation in semi-supervised learning. The graph-based loss encourages feature consistency within neighborhoods: features of connected samples should have similar class predictions. This leverages the target data's intrinsic cluster structure, which often aligns with class boundaries even when the source model's raw predictions are noisy.",
      hints: [
        "Label propagation on the graph: connected nodes influence each other's pseudo-labels, making the pseudo-label assignment smoother across the target manifold.",
        "Graph construction: typically cosine similarity in feature space with a threshold; k=5-20 nearest neighbors. Graph is rebuilt periodically as features evolve during adaptation.",
      ],
    },
  ],
  "domain-adaptation-extra": [
    {
      id: "q-adapt-kp50-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "ETA (Efficient Test-Time Adaptation, Niu et al. 2022) addresses two pathological failure modes of TENT. Which two problems does it solve and how?",
      options: [
        "Slow convergence and high memory usage — solved by gradient checkpointing and a faster optimizer",
        "Entropy collapse (confident but wrong) and catastrophic forgetting — solved by a sample selection criterion that filters unreliable samples with extreme entropy, and an anti-forgetting term that regularizes updates to stay close to the source model using a Fisher-weighted L2 penalty on important parameters",
        "Noisy pseudo-labels and batch size sensitivity — solved by ensembling multiple entropy estimates and using larger batch sizes",
        "Adversarial robustness and spurious correlations — solved by adversarial augmentation and feature decorrelation regularization",
      ],
      correctAnswer: 1,
      explanation: "EATA (Efficient Anti-forgetting Test-Time Adaptation) identifies TENT's two failure modes: (1) Entropy collapse: TENT minimizes entropy of all samples, including those where the model is confidently wrong, reinforcing errors. EATA filters samples to only adapt on those with entropy in a reliable middle range (not too high, not too low). (2) Catastrophic forgetting: adapting on target data degrades source-domain performance. EATA uses an elastic weight consolidation (EWC)-style Fisher information regularizer: weights important for source performance (high Fisher info) are penalized from changing. Together these make TTA both reliable and stable across sequential domain shifts.",
      hints: [
        "Sample selection in EATA: discard samples where entropy > H_0 (too uncertain, likely wrong) and entropy < H_1 (already confident, no adaptation needed). Only adapt on moderate-entropy samples.",
        "Fisher regularizer: L_EWC = sum_i F_i * (theta_i - theta_0_i)^2 where F_i is Fisher information of parameter i and theta_0 are source model weights.",
      ],
    },
    {
      id: "q-adapt-kp50-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In domain generalization, what is the spurious correlation problem, and why does a model trained with ERM on source domains fail when spurious correlations are broken at test time?",
      options: [
        "Spurious correlations are correlations between input features and labels that hold in the source but not the target. ERM minimizes average source loss, which makes exploiting spurious correlations optimal on source data — a model trained with ERM learns to rely on spurious features because they improve source accuracy, then fails when those correlations vanish at test time",
        "Spurious correlations refer to label noise in the source training data that causes the model to learn incorrect class boundaries",
        "Spurious correlations are correlations between different input modalities that ERM cannot capture due to the cross-modal alignment problem",
        "Spurious correlations arise from data augmentation that inadvertently creates false patterns not present in the original data",
      ],
      correctAnswer: 0,
      explanation: "Classic example: cows are photographed on grass (source), so the model learns to use grass background as a feature for 'cow'. This spurious correlation (grass -> cow) holds in the source but breaks in the target where cows appear on beaches. ERM minimizes average source loss, and exploiting spurious features reduces this loss — so ERM has no incentive to ignore them. At test time, the spurious feature (grass) is absent, causing failure. IRM, Group DRO, and CausalDA all aim to learn only invariant causal features (the cow's shape/texture) by explicitly penalizing reliance on environment-specific correlations.",
      hints: [
        "Waterbirds dataset: waterbirds (water background) vs landbirds (land background). Spurious: background predicts bird type in source. Test: backgrounds are swapped.",
        "ERM's weakness: it cannot distinguish between invariant causal features and spurious correlations — both reduce training loss equally.",
      ],
    },
    {
      id: "q-adapt-kp50-3",
      type: "true-false",
      difficulty: "easy",
      question: "Domain generalization methods are trained using only source domain data and are evaluated on target domains that are completely unseen during training.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Domain generalization (DG) is the setting where multiple source domains are available during training, but the target domain is never seen — not even as unlabeled data — during training. This distinguishes DG from domain adaptation (DA), which uses target domain data (unlabeled in UDA, or a few labels in few-shot DA) during training. DG methods must generalize purely from source diversity, without any target-specific optimization. Benchmarks like DomainBed (PACS, Office-Home, TerraIncognita) evaluate DG performance on held-out domains with no prior exposure.",
      hints: [
        "DG vs UDA: DG has no target data during training. UDA has unlabeled target data during training. Both have no target labels during training.",
        "DG evaluation: train on 3 of 4 domains, test on the 4th. Repeat for all 4 choices of target domain and report average accuracy.",
      ],
    },
    {
      id: "q-adapt-kp50-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DANN (Domain-Adversarial Neural Network) and CDAN (Conditional Domain Adversarial Network) were developed sequentially. What key limitation of DANN does CDAN address?",
      options: [
        "DANN uses a gradient reversal layer which causes training instability; CDAN replaces it with Wasserstein distance minimization for more stable training",
        "DANN aligns marginal feature distributions P(f) across domains but ignores class-conditional structure; CDAN conditions the domain discriminator on class predictions (feature tensor product with classifier output) to achieve class-conditional alignment, preventing class-mismatched features from being aligned",
        "DANN requires balanced source and target batch sizes which is impractical; CDAN introduces importance weighting to handle imbalanced batches",
        "DANN can only handle binary classification; CDAN extends adversarial alignment to multi-class and multi-label settings",
      ],
      correctAnswer: 1,
      explanation: "DANN aligns P_S(f(x)) with P_T(f(x)) globally — it matches the marginal feature distributions. However, this can result in class-conditional misalignment: source 'cat' features aligned with target 'dog' features (if their marginal positions are similar). CDAN conditions the domain discriminator on the outer product of features and classifier outputs: h(x) outer g(x) where g(x) is the softmax prediction. This outer product encodes class information into the domain input. The discriminator thus aligns class-conditional distributions P_S(f|y=k) with P_T(f|y=k) for each class k, preventing cross-class alignment. CDAN achieves state-of-the-art on Office-31 and Office-Home over DANN.",
      hints: [
        "CDAN outer product: f tensor g is a d_f x d_y dimensional tensor. For large models, a random multi-linear map is used to reduce dimensionality while preserving class conditioning.",
        "Class-conditional alignment prevents the negative transfer problem: forcing class-mismatched features to be indistinguishable actually hurts classification.",
      ],
    },
    {
      id: "q-adapt-kp50-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which best describes the key trade-off when choosing between shallow (feature-level) and deep (pixel-level) domain adaptation approaches for image data?",
      options: [
        "Shallow DA is faster to train; deep DA achieves higher accuracy — so deep DA is always preferred when compute is available",
        "Shallow (feature-level) DA adapts high-level semantic representations and is efficient, but cannot correct low-level domain gaps (texture, color, style). Deep (pixel-level) DA corrects low-level image statistics via style transfer or CycleGAN but adds significant training complexity, potential hallucination of semantic content, and may not improve task-relevant features if style transfer changes semantics",
        "Shallow DA requires access to source data at test time; deep DA can operate source-free",
        "Shallow DA only works for classification; deep DA is required for detection and segmentation tasks",
      ],
      correctAnswer: 1,
      explanation: "Feature-level DA (DANN, CORAL, MMD): aligns representations in a learned feature space. Efficient, end-to-end trainable, preserves semantic content. Limitation: cannot correct low-level domain gaps (e.g., day vs night, real vs synthetic textures) because these are encoded at the pixel level, not the feature level. Pixel-level DA (CycleGAN, FDA, UNIT): translates source images to look like target domain before feeding to the model. Corrects low-level statistics but risks changing semantic content during translation (a car may look like a van after style transfer). Best practice for large low-level gaps (synthetic-to-real, CT-to-MRI): combine pixel-level translation with feature-level alignment for complementary benefits.",
      hints: [
        "GTA5-to-Cityscapes adaptation (synthetic driving to real): pixel-level translation dramatically helps because the texture/color gap is huge. Feature-level alone is insufficient.",
        "Hallucination risk: CycleGAN style transfer may change car colors, add/remove pedestrians, or alter lane markings — the label remains from the source but the translated image has changed semantics.",
      ],
    },
  ],
};

Object.assign(questions, moreAdaptQ3);

registerQuestions(questions);
export default questions;
