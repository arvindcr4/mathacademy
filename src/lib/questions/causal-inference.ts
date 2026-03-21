import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "correlation-vs-causation": [
    {
      id: "q-ci-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A study finds that cities with more ice cream sales also have higher drowning rates. The most likely explanation is:",
      options: [
        "Ice cream causes drowning by impairing swimming ability",
        "Drowning risk increases appetite for ice cream",
        "Both are driven by a common cause — hot weather — making the correlation spurious",
        "The sample size is too small to draw any conclusion",
      ],
      correctAnswer: 2,
      explanation:
        "This is a classic example of confounding: hot weather independently increases both ice cream consumption and swimming (raising drowning risk). There is no direct causal link between ice cream and drowning — the correlation is entirely spurious.",
      hints: [
        "Ask: is there a third variable that could independently cause both phenomena?",
        "Hot summers drive both behaviors — this is the classic 'confounder' or 'common cause'.",
      ],
    },
    {
      id: "q-ci-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A high Pearson correlation coefficient (e.g., r = 0.95) between two variables X and Y is sufficient evidence to conclude that X causes Y.",
      correctAnswer: "False",
      explanation:
        "Correlation measures the strength of a linear association, not causation. Both variables may be caused by a third confounder, the causal direction may be reversed (Y causes X), or the correlation could be coincidental. Establishing causation requires additional assumptions or experimental design (e.g., randomization).",
      hints: [
        "Correlation is symmetric: corr(X,Y) = corr(Y,X). Causation is asymmetric.",
        "Think of confounders, reverse causation, and spurious correlations.",
      ],
    },
    {
      id: "q-ci-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following best distinguishes an observational study from a randomized controlled trial (RCT) in the context of causal inference?",
      options: [
        "Observational studies always have larger sample sizes than RCTs",
        "In an RCT, treatment assignment is randomized, breaking the association between confounders and treatment; in an observational study, subjects self-select into treatment, creating potential confounding",
        "Observational studies measure outcomes over time while RCTs measure outcomes at a single point",
        "RCTs are only valid for binary outcomes while observational studies handle continuous outcomes",
      ],
      correctAnswer: 1,
      explanation:
        "The key distinction is randomization. In an RCT, random assignment ensures that confounders are balanced across treatment and control groups in expectation, allowing causal identification. In observational studies, selection into treatment is non-random, so observed differences may reflect confounding rather than a causal effect.",
      hints: [
        "What does randomization 'break' in the causal graph between treatment and outcome?",
        "Think about why patients who choose surgery may differ systematically from those who choose medication.",
      ],
    },
  ],

  "potential-outcomes": [
    {
      id: "q-ci-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the Potential Outcomes Framework (Rubin Causal Model), the 'fundamental problem of causal inference' refers to:",
      options: [
        "The difficulty of collecting large enough samples for statistical power",
        "The impossibility of observing both the treated and untreated potential outcomes for the same unit at the same time",
        "The challenge of defining a valid control group in any study",
        "The computational intractability of estimating treatment effects at scale",
      ],
      correctAnswer: 1,
      explanation:
        "For any individual unit i, we can only observe Y_i(1) or Y_i(0) — the outcome under treatment or control — but never both simultaneously. The individual causal effect Y_i(1) - Y_i(0) is therefore never directly observed, making causal inference inherently a missing data problem.",
      hints: [
        "Think about counterfactuals: you cannot observe what would have happened to a patient who received treatment if they had instead received a placebo, at the same point in time.",
        "The word 'fundamental' indicates this is an in-principle limitation, not just a practical one.",
      ],
    },
    {
      id: "q-ci-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Stable Unit Treatment Value Assumption (SUTVA) requires two conditions. Which of the following correctly states both?",
      options: [
        "No interference between units AND no hidden versions of treatment",
        "Random assignment AND large sample sizes",
        "Balanced covariate distributions AND common support",
        "No unmeasured confounders AND no measurement error",
      ],
      correctAnswer: 0,
      explanation:
        "SUTVA has two components: (1) No interference — the potential outcome of unit i does not depend on the treatment received by other units (no spillovers); (2) No hidden variations of treatment — there is only one version of the treatment, so Y_i(1) is well-defined. Violations occur in network experiments (interference) or when treatment implementation varies (hidden versions).",
      hints: [
        "SUTVA is required to define individual potential outcomes Y_i(t) unambiguously.",
        "Vaccine trials may violate the interference assumption through herd immunity effects.",
      ],
    },
    {
      id: "q-ci-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Under the strong ignorability assumption (Y(0), Y(1) ⊥ T | X), which quantity is identified and equals the ATE?",
      options: [
        "E[Y | T=1] - E[Y | T=0] (naive difference in means)",
        "E_X[ E[Y | T=1, X] - E[Y | T=0, X] ] (covariate-adjusted difference)",
        "The coefficient on T in a linear regression of Y on T alone",
        "The correlation between T and Y divided by the variance of T",
      ],
      correctAnswer: 1,
      explanation:
        "Under strong ignorability (unconfoundedness + common support), the ATE is identified by the regression adjustment estimator: E_X[ E[Y|T=1,X] - E[Y|T=0,X] ]. The naive difference in means E[Y|T=1] - E[Y|T=0] is biased if confounders X are not conditioned on. This is the basis for methods like inverse propensity weighting and doubly robust estimation.",
      hints: [
        "Strong ignorability says treatment assignment is 'as good as random' conditional on X.",
        "The adjustment formula integrates out the conditioning on X to get the marginal ATE.",
      ],
    },
  ],

  "structural-causal-models": [
    {
      id: "q-ci-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a Structural Causal Model (SCM), each variable X_i is represented as:",
      options: [
        "A probability distribution parameterized by its Markov blanket",
        "A deterministic function of its parents and an independent noise variable: X_i = f_i(PA_i, U_i)",
        "A node in a neural network with learned weights",
        "A random variable that is conditionally independent of all other variables given its children",
      ],
      correctAnswer: 1,
      explanation:
        "In an SCM, each endogenous variable X_i is determined by a structural equation X_i = f_i(PA_i, U_i), where PA_i are the causal parents of X_i in the DAG and U_i is an exogenous noise variable. The noise variables {U_i} are assumed to be jointly independent, encoding the assumption that there are no hidden common causes beyond those explicitly modeled.",
      hints: [
        "SCMs go beyond probabilistic graphical models by specifying the mechanism (the function f_i), not just the conditional distribution.",
        "The structural equations allow us to reason about interventions and counterfactuals.",
      ],
    },
    {
      id: "q-ci-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Two different SCMs (with different structural equations) can generate the same observational joint distribution P(X_1, ..., X_n).",
      correctAnswer: "True",
      explanation:
        "This is the problem of 'Markov equivalence' and 'causal non-identifiability from observational data alone'. Multiple SCMs — even with different causal structures — can be consistent with the same observational distribution. This is why additional assumptions (e.g., functional form restrictions, interventional data) are needed for causal discovery.",
      hints: [
        "Think about X → Y vs Y → X: both can be consistent with the same bivariate distribution under certain noise models.",
        "This is why causal discovery is harder than structure learning in Bayesian networks.",
      ],
    },
    {
      id: "q-ci-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Pearl's hierarchy of causation (the 'ladder of causation') consists of three rungs. Which ordering is correct from lowest to highest?",
      options: [
        "Intervention → Association → Counterfactual",
        "Association → Intervention → Counterfactual",
        "Counterfactual → Intervention → Association",
        "Association → Counterfactual → Intervention",
      ],
      correctAnswer: 1,
      explanation:
        "Pearl's causal hierarchy is: (1) Association (seeing) — P(Y|X); (2) Intervention (doing) — P(Y|do(X=x)); (3) Counterfactual (imagining) — P(Y_x | X=x', Y=y'). Each level requires strictly more information than the one below. Observational data answers rung-1 queries; interventional data answers rung-2; SCMs with structural equations are needed for rung-3.",
      hints: [
        "Rung 1 is what statistical models answer with observational data.",
        "Rung 3 requires reasoning about what would have happened under a different treatment for a unit we already observed.",
      ],
    },
  ],

  "causal-graphs-dags": [
    {
      id: "q-ci-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a Directed Acyclic Graph (DAG) used for causal modeling, an arrow X → Y means:",
      options: [
        "X and Y are correlated in the data",
        "X is a direct cause of Y — intervening on X changes the distribution of Y",
        "Y temporally precedes X in the data collection process",
        "X is sufficient to predict Y with high accuracy",
      ],
      correctAnswer: 1,
      explanation:
        "An arrow X → Y in a causal DAG encodes the claim that X is a direct cause of Y relative to the other variables in the graph. This is an interventional claim: if we intervene to set X = x (do(X=x)), Y's distribution changes. Correlation alone does not justify drawing an arrow.",
      hints: [
        "Causal arrows encode mechanism, not mere association.",
        "The 'acyclic' in DAG means causes cannot be their own effects (no feedback loops in the static model).",
      ],
    },
    {
      id: "q-ci-kp4-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The d-separation criterion in a DAG is used to determine:",
      options: [
        "Whether two variables are causally equivalent",
        "Which variables to include in a regression to maximize predictive accuracy",
        "Whether a set of variables Z blocks all paths between X and Y, implying conditional independence X ⊥ Y | Z in the distribution faithful to the DAG",
        "The optimal intervention target to maximize a downstream outcome",
      ],
      correctAnswer: 2,
      explanation:
        "d-separation is a graphical criterion for reading off conditional independence statements. X and Y are d-separated by Z if every path between X and Y is blocked by Z (either through a chain/fork where a node in Z is on the path, or a collider not in Z and with no descendant in Z). Under the Markov and faithfulness assumptions, d-separation implies conditional independence in the joint distribution.",
      hints: [
        "d-separation is 'directed separation' — the directionality of arrows matters for whether a path is blocked.",
        "Colliders (X → Z ← Y) have special behavior: conditioning on a collider opens the path.",
      ],
    },
    {
      id: "q-ci-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a DAG with structure X → M → Y and X → Y (a mediated and direct effect), conditioning on the mediator M in a regression of Y on X gives:",
      options: [
        "The total causal effect of X on Y",
        "The direct effect of X on Y not through M (the controlled direct effect), but this can be biased if M is a collider for unmeasured confounders",
        "An unbiased estimate of the indirect effect through M",
        "No useful causal information because M is on the causal path",
      ],
      correctAnswer: 1,
      explanation:
        "Conditioning on the mediator M blocks the indirect path X → M → Y, so the coefficient on X captures the direct effect of X on Y. However, if there are unmeasured common causes of M and Y, conditioning on M opens a backdoor path (collider bias), biasing the direct effect estimate. This is the key challenge in mediation analysis.",
      hints: [
        "Conditioning on a mediator estimates the direct effect but can induce collider bias.",
        "Think about what happens when M is a collider for an unmeasured U that also affects Y.",
      ],
    },
  ],

  "do-calculus": [
    {
      id: "q-ci-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The do-operator do(X=x) in Pearl's framework differs from conditioning on X=x in that:",
      options: [
        "do(X=x) uses a larger dataset than conditioning on X=x",
        "do(X=x) represents a physical intervention that removes all incoming arrows to X in the DAG, while conditioning on X=x is an observational selection",
        "do(X=x) can only be applied to binary variables",
        "do(X=x) and conditioning on X=x always yield the same distribution over Y",
      ],
      correctAnswer: 1,
      explanation:
        "The do-operator models a physical intervention: do(X=x) sets X to value x and severs all causal mechanisms that previously determined X (removing all arrows into X in the 'mutilated' graph). In contrast, conditioning on X=x is an observational operation that does not change the underlying mechanisms. They coincide only when there are no confounders between X and Y.",
      hints: [
        "An intervention makes X exogenous — it removes the influence of X's causes.",
        "P(Y|X=x) \$\\neq\$ P(Y|do(X=x)) when there are confounders — this is the key insight of causal inference.",
      ],
    },
    {
      id: "q-ci-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The backdoor adjustment formula P(Y|do(X)) = Σ_Z P(Y|X,Z)P(Z) is valid when Z is any set of observed variables that satisfies the backdoor criterion relative to (X,Y).",
      correctAnswer: "True",
      explanation:
        "The backdoor criterion requires that Z: (1) blocks all backdoor paths from X to Y (paths with an arrow into X), and (2) contains no descendant of X. When Z satisfies these conditions, the backdoor adjustment formula identifies the interventional distribution P(Y|do(X)) from observational data, effectively removing confounding by conditioning on Z.",
      hints: [
        "Backdoor paths are non-causal paths that create spurious associations between X and Y.",
        "Adjusting for Z 'closes' these backdoor paths, leaving only the causal effect.",
      ],
    },
    {
      id: "q-ci-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Pearl's do-calculus consists of three rules that allow symbolic manipulation of interventional distributions. What is the primary purpose of do-calculus?",
      options: [
        "To estimate causal effects using only machine learning models without any graphical assumptions",
        "To provide a complete set of inference rules for transforming expressions involving do-operators into purely observational quantities, determining when a causal effect is identifiable from observational data",
        "To compute maximum likelihood estimates of structural equation parameters",
        "To test whether a given DAG is consistent with observational data",
      ],
      correctAnswer: 1,
      explanation:
        "Do-calculus is a sound and complete axiomatic system for causal reasoning. Its three rules (insertion/deletion of observations, action/observation exchange, insertion/deletion of actions) can be applied to any expression involving do-operators. Together, they characterize exactly which causal effects can be identified from observational data given a causal graph — a query is identifiable if and only if it can be reduced to an observational expression using do-calculus.",
      hints: [
        "The front-door criterion is an example of a non-obvious identifiability result provable using do-calculus.",
        "Completeness means: if do-calculus cannot reduce an expression to observational quantities, no method can identify the causal effect from observational data alone.",
      ],
    },
  ],

  "ate-att": [
    {
      id: "q-ci-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Average Treatment Effect (ATE) is defined as:",
      options: [
        "E[Y | T=1] - E[Y | T=0]",
        "E[Y(1) - Y(0)]",
        "E[Y(1) | T=1] - E[Y(0) | T=0]",
        "E[Y(1)] / E[Y(0)]",
      ],
      correctAnswer: 1,
      explanation:
        "The ATE = E[Y(1) - Y(0)] = E[Y(1)] - E[Y(0)] is the expected difference in potential outcomes averaged over the entire population. Note that E[Y|T=1] - E[Y|T=0] is the naive estimator which equals the ATE only under no confounding. The ATT = E[Y(1) - Y(0) | T=1] restricts this expectation to the treated population.",
      hints: [
        "Potential outcomes Y(1) and Y(0) are defined for all units, regardless of their actual treatment.",
        "ATE is a population-level quantity; ATT conditions on those who actually received treatment.",
      ],
    },
    {
      id: "q-ci-kp6-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The ATT (Average Treatment Effect on the Treated) equals the ATE when:",
      options: [
        "The sample size is large enough for the central limit theorem to apply",
        "Treatment assignment is independent of potential outcomes: T ⊥ (Y(0), Y(1))",
        "The outcome is binary",
        "The treatment effect is constant (homogeneous) across all units",
      ],
      correctAnswer: 1,
      explanation:
        "ATT = E[Y(1)-Y(0)|T=1]. If T ⊥ (Y(0),Y(1)) (random assignment), then E[Y(t)|T=1] = E[Y(t)] for t∈{0,1}, so ATT = ATE. With treatment effect heterogeneity and non-random assignment, ATT and ATE generally differ. They also coincide when treatment effects are constant (homogeneous) since then E[Y(1)-Y(0)|T=1] = E[Y(1)-Y(0)] = constant.",
      hints: [
        "Under randomization, the treated group is a representative sample of the full population.",
        "Constant treatment effects mean everyone benefits (or is harmed) the same amount.",
      ],
    },
    {
      id: "q-ci-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When estimating the ATE using Inverse Propensity Weighting (IPW), what is the role of the propensity score e(X) = P(T=1|X)?",
      options: [
        "It is used as a covariate in an outcome regression model",
        "It reweights observed outcomes so that the weighted sample mimics a randomized experiment, with 1/e(X) weighting treated units and 1/(1-e(X)) weighting control units",
        "It estimates the variance of the treatment effect",
        "It determines which units to exclude from the analysis due to poor overlap",
      ],
      correctAnswer: 1,
      explanation:
        "The Horvitz-Thompson IPW estimator reweights each observation by the inverse of its probability of receiving the treatment it received: treated units by 1/e(X) and controls by 1/(1-e(X)). This creates a pseudo-population where treatment is independent of X, enabling unbiased estimation of the ATE. Poor overlap (propensity scores near 0 or 1) leads to high-variance estimates.",
      hints: [
        "IPW is analogous to survey sampling weights — units with unusual treatment probabilities are upweighted to represent the full population.",
        "The doubly robust estimator combines IPW with outcome regression, being consistent if either model is correctly specified.",
      ],
    },
  ],

  "randomized-experiments": [
    {
      id: "q-ci-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The primary advantage of randomization in an A/B test is that it:",
      options: [
        "Guarantees that the sample size is large enough for statistical significance",
        "Ensures treatment and control groups are identical in all observable and unobservable characteristics in expectation, eliminating confounding",
        "Prevents any form of measurement error in the outcome",
        "Allows the experimenter to measure the CATE for every subgroup",
      ],
      correctAnswer: 1,
      explanation:
        "Randomization balances both observed and unobserved confounders across treatment and control groups in expectation. This breaks the association between treatment assignment and potential outcomes (T ⊥ (Y(0),Y(1))), making the naive difference in means an unbiased estimator of the ATE. This is the 'gold standard' for causal identification.",
      hints: [
        "The key word is 'in expectation' — any single randomized experiment may have imbalance by chance.",
        "Randomization is powerful because it balances variables you haven't even measured.",
      ],
    },
    {
      id: "q-ci-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Network interference (spillover effects) violates SUTVA and can cause A/B tests to underestimate or overestimate the true treatment effect if users in treatment and control groups interact with each other.",
      correctAnswer: "True",
      explanation:
        "When users in control and treatment groups interact (e.g., in social networks, marketplaces), the outcome of a control user may be affected by treated users nearby (interference), violating SUTVA. This leads to bias in standard estimators. Cluster randomization (randomizing by network community) or switchback experiments are common remedies in practice.",
      hints: [
        "Consider an experiment testing a new feed ranking: if treated users post more, their posts appear in control users' feeds, affecting control outcomes.",
        "Marketplace experiments have similar issues: increasing supply for treated users affects prices for controls.",
      ],
    },
    {
      id: "q-ci-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a two-sided marketplace A/B test (e.g., a ride-sharing platform), what is 'market-level interference' and how is it typically addressed?",
      options: [
        "Measurement error in the outcome variable; addressed by using multiple outcome proxies",
        "Selection bias from users opting into the experiment; addressed by intent-to-treat analysis",
        "Control and treatment units competing for shared resources (e.g., drivers), so treated riders benefiting from better matching reduces driver availability for control riders; addressed by market-level (cluster) randomization or synthetic control methods",
        "Multiple testing across user segments; addressed by Bonferroni correction",
      ],
      correctAnswer: 2,
      explanation:
        "In a two-sided marketplace, riders and drivers are linked through a shared pool. If treated riders get faster pickups, they consume driver capacity, leaving fewer drivers for control riders — creating a 'market-level' interference effect. Rider-level randomization understates the treatment effect. Solutions include cluster randomization by geography (city-level A/B), holdout experiments, or synthetic control methods.",
      hints: [
        "Uber, Lyft, and DoorDash face this challenge: you can't randomize individual riders independently when they share a driver pool.",
        "The fix is to randomize at the level where interference is contained — e.g., city or time period.",
      ],
    },
  ],

  "propensity-score": [
    {
      id: "q-ci-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The propensity score e(X) = P(T=1|X) was shown by Rosenbaum and Rubin (1983) to have what key property?",
      options: [
        "It is always sufficient to block all backdoor paths in any causal graph",
        "If (Y(0),Y(1)) ⊥ T | X, then (Y(0),Y(1)) ⊥ T | e(X) — the propensity score is a balancing score",
        "It uniquely identifies the causal graph structure from observational data",
        "It equals the probability that unit i is in the treatment group after matching",
      ],
      correctAnswer: 1,
      explanation:
        "Rosenbaum and Rubin's key theorem: if treatment is unconfounded given X, it is also unconfounded given the scalar propensity score e(X). This dimensionality reduction is powerful — instead of matching or conditioning on all of X, you can condition on a single scalar. This is the foundation of propensity score matching, stratification, and IPW.",
      hints: [
        "The propensity score collapses all confounders into a single number while preserving the balancing property.",
        "This theorem justifies why propensity score methods work: balance on e(X) implies balance on X in expectation.",
      ],
    },
    {
      id: "q-ci-kp8-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In propensity score matching, the 'common support' (or overlap) assumption requires:",
      options: [
        "The same number of treated and control units",
        "0 < P(T=1|X) < 1 for all values of X in the study population",
        "The propensity score model to be correctly specified",
        "All confounders to be observed and included in the propensity score model",
      ],
      correctAnswer: 1,
      explanation:
        "Common support (overlap) requires that every value of X has a positive probability of being treated and a positive probability of being control: 0 < e(X) < 1. Without this, there are regions of X where we cannot estimate the counterfactual — e.g., if all doctors with a certain profile always prescribe drug A, we have no comparable controls to estimate the effect on those doctors.",
      hints: [
        "If e(X) = 0 for some X, we have no treated units with that covariate profile to compare against.",
        "Trimming the sample to regions of common support is a common practical fix.",
      ],
    },
    {
      id: "q-ci-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The doubly robust (DR) estimator for the ATE is consistent if:",
      options: [
        "Both the propensity score model and the outcome regression model are correctly specified",
        "Either the propensity score model or the outcome regression model is correctly specified (but not necessarily both)",
        "The sample size exceeds 1000 observations",
        "The treatment effect is homogeneous across all covariate strata",
      ],
      correctAnswer: 1,
      explanation:
        "The doubly robust estimator (Augmented IPW) combines IPW and outcome regression: τ̂_DR = (1/n)Σ[ T_i(Y_i - μ̂_1(X_i))/ê(X_i) - (1-T_i)(Y_i - μ̂_0(X_i))/(1-ê(X_i)) + μ̂_1(X_i) - μ̂_0(X_i) ]. It is consistent if either the propensity score model ê or the outcome model μ̂ is correctly specified — hence 'doubly robust'. This provides important protection against model misspecification.",
      hints: [
        "The DR estimator provides two 'chances' to get the right answer: one from the propensity model, one from the outcome model.",
        "With flexible machine learning estimators for both components, you can achieve semiparametric efficiency.",
      ],
    },
  ],

  "instrumental-variables": [
    {
      id: "q-ci-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A valid instrumental variable Z for estimating the causal effect of T on Y must satisfy three conditions. Which set is correct?",
      options: [
        "Z is correlated with Y, Z is independent of T, Z affects Y only through T",
        "Z is correlated with T (relevance), Z is independent of unmeasured confounders U (exogeneity/exclusion), Z affects Y only through T (exclusion restriction)",
        "Z is a randomized treatment, Z is measured without error, Z has large sample variance",
        "Z is correlated with T, Z is correlated with Y, Z is uncorrelated with all other covariates",
      ],
      correctAnswer: 1,
      explanation:
        "A valid IV satisfies: (1) Relevance: Cov(Z,T) \$\\neq\$ 0 — Z predicts treatment; (2) Exogeneity: Z ⊥ U where U represents unmeasured confounders — Z is 'as good as random'; (3) Exclusion restriction: Z affects Y only through T, not through any other pathway. The classic example is a lottery randomizing access to treatment satisfying all three conditions.",
      hints: [
        "The exclusion restriction is the hardest to verify empirically — it is an untestable assumption.",
        "A 'weak instrument' satisfies relevance only weakly (small first-stage F-statistic), leading to large finite-sample bias.",
      ],
    },
    {
      id: "q-ci-kp9-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Two-Stage Least Squares (2SLS) estimator with instrument Z proceeds by:",
      options: [
        "First regressing Y on Z, then regressing the residuals on T",
        "First regressing T on Z to get predicted values T̂, then regressing Y on T̂",
        "First computing propensity scores, then running an OLS regression",
        "First differencing the data to remove fixed effects, then instrumenting",
      ],
      correctAnswer: 1,
      explanation:
        "2SLS: Stage 1 — regress T on Z (and any controls) to get T̂ = Ẑ·γ̂. Stage 2 — regress Y on T̂ (and any controls). The stage-1 regression 'purges' T of the variation correlated with unmeasured confounders, keeping only the exogenous variation induced by Z. The stage-2 coefficient on T̂ is the IV estimator of the causal effect of T on Y.",
      hints: [
        "T̂ captures only the part of T variation that comes from the instrument Z — which is exogenous by assumption.",
        "The IV estimate is consistent but generally less efficient (higher variance) than OLS when there is no confounding.",
      ],
    },
    {
      id: "q-ci-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Under heterogeneous treatment effects, the IV estimator (Wald estimator) identifies the LATE (Local Average Treatment Effect), which is the ATE for:",
      options: [
        "The entire population",
        "Units who comply with the instrument — i.e., compliers who take treatment when Z=1 and do not when Z=0",
        "Always-takers who would take treatment regardless of Z",
        "Never-takers who would never take treatment regardless of Z",
      ],
      correctAnswer: 1,
      explanation:
        "With binary T and Z, the population decomposes into: Compliers (T=1 iff Z=1), Always-takers (T=1 always), Never-takers (T=0 always), and Defiers (excluded by monotonicity). The Wald estimator E[Y|Z=1]-E[Y|Z=0]) / (E[T|Z=1]-E[T|Z=0]) = LATE — the ATE only for compliers. Always-takers and never-takers are unaffected by Z, so the instrument provides no information about their treatment effects.",
      hints: [
        "The LATE is the effect for the subpopulation whose treatment status is changed by the instrument.",
        "If you want the ATE for the whole population, IV alone is insufficient without additional assumptions.",
      ],
    },
  ],

  "difference-in-differences": [
    {
      id: "q-ci-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Difference-in-Differences (DiD) estimator computes the ATT as:",
      options: [
        "(Y_treated,post - Y_treated,pre)",
        "(Y_treated,post - Y_control,post)",
        "(Y_treated,post - Y_treated,pre) - (Y_control,post - Y_control,pre)",
        "(Y_treated,post + Y_treated,pre) / (Y_control,post + Y_control,pre)",
      ],
      correctAnswer: 2,
      explanation:
        "DiD compares the change over time in the treated group to the change over time in the control group. The first difference (treated post - treated pre) removes time-invariant unobserved confounders. The second difference (control post - control pre) estimates the counterfactual trend the treated group would have followed absent treatment. Their difference is the DiD estimator of the ATT.",
      hints: [
        "DiD 'differences out' both pre-existing group differences and common time trends.",
        "The key identifying assumption is parallel trends: without treatment, treated and control would have followed the same time trend.",
      ],
    },
    {
      id: "q-ci-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The parallel trends assumption in DiD is directly testable using pre-treatment data alone.",
      correctAnswer: "False",
      explanation:
        "The parallel trends assumption — that treated and control groups would have had the same trend in outcomes absent the treatment — is fundamentally untestable for the post-treatment period. However, researchers use pre-treatment placebo tests (testing parallel trends in pre-treatment periods) as supporting evidence. These tests are necessary but not sufficient: groups may have parallel pre-trends but diverge post-treatment for reasons unrelated to the intervention.",
      hints: [
        "You can test parallel pre-trends, but you can't test what the counterfactual post-trend would have been.",
        "Pre-trend tests are common practice but only partially validate the key assumption.",
      ],
    },
    {
      id: "q-ci-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a staggered adoption DiD design (units adopt treatment at different times), the standard two-way fixed effects (TWFE) estimator can be biased because:",
      options: [
        "TWFE cannot handle more than two time periods",
        "TWFE uses already-treated units as controls for later-treated units, which contaminates the estimate with negative-weighted treatment effects when there is treatment effect heterogeneity across cohorts",
        "TWFE requires a balanced panel, which is rarely available in staggered designs",
        "TWFE cannot account for time-varying confounders",
      ],
      correctAnswer: 1,
      explanation:
        "Callaway & Sant'Anna (2021), Sun & Abraham (2021), and Goodman-Bacon (2021) showed that in staggered DiD, TWFE implicitly uses 'forbidden comparisons': already-treated units serve as controls for later-treated units. When treatment effects evolve over time or differ across adoption cohorts, these negative-weighted comparisons can produce biased, even sign-reversed estimates. Modern solutions include cohort-specific ATTs aggregated properly (Callaway-Sant'Anna estimator).",
      hints: [
        "The Goodman-Bacon decomposition shows TWFE is a weighted average of all 2×2 DiD comparisons, some of which use treated-vs-treated comparisons.",
        "This is a major recent insight in applied econometrics; the fix is to use estimators that only compare treated to clean controls.",
      ],
    },
  ],

  "pc-algorithm": [
    {
      id: "q-ci-kp11-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The PC algorithm for causal discovery is classified as a 'constraint-based' method because it:",
      options: [
        "Constrains the search space to DAGs with fewer than a fixed number of edges",
        "Uses conditional independence tests (constraints implied by the Markov condition) to determine which edges to remove and orient in a skeleton graph",
        "Optimizes a penalized likelihood subject to a DAG acyclicity constraint",
        "Restricts the functional form of structural equations to linear models",
      ],
      correctAnswer: 1,
      explanation:
        "Constraint-based methods like PC use statistical tests of conditional independence as constraints. Starting from a complete undirected graph, PC removes edges between variables that are conditionally independent (d-separated) given some set. It then orients edges using v-structure (collider) detection. The output is a Markov Equivalence Class (CPDAG) rather than a unique DAG.",
      hints: [
        "Conditional independence is the statistical proxy for d-separation in the true causal graph.",
        "PC stands for Peter-Clark (the inventors' first names).",
      ],
    },
    {
      id: "q-ci-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The PC algorithm can always identify a unique causal DAG from observational data, given infinite data and correct conditional independence tests.",
      correctAnswer: "False",
      explanation:
        "The PC algorithm recovers a CPDAG (Completed Partially Directed Acyclic Graph) — the Markov equivalence class of all DAGs consistent with the observed conditional independence structure. Within a Markov equivalence class, the causal direction of some edges cannot be determined from observational data alone. Unique identification requires additional assumptions (e.g., non-Gaussian noise in LiNGAM, equal variances in specific models, or interventional data).",
      hints: [
        "Two DAGs are Markov equivalent if they have the same skeleton and the same v-structures (immoralities).",
        "Markov equivalence is a fundamental limit: some causal directions are unidentifiable from distributions alone.",
      ],
    },
    {
      id: "q-ci-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main computational bottleneck of the PC algorithm in high dimensions, and how does it affect reliability?",
      options: [
        "Computing the covariance matrix, which scales as O(p³); overcome by using sparse matrix methods",
        "The number of conditional independence tests grows exponentially with the number of conditioning variables considered; in high dimensions, sparse graphs can limit conditioning set sizes but large conditioning sets have low statistical power",
        "Sorting edges by correlation, which scales as O(p² log p); overcome by approximate sorting",
        "Inverting the Fisher information matrix for each test; overcome by diagonal approximations",
      ],
      correctAnswer: 1,
      explanation:
        "PC tests all pairs (X,Y) conditioned on subsets of their neighbors. In the worst case, the conditioning set size equals the maximum degree of the skeleton, and the number of tests is exponential in degree. In high dimensions (large p), low statistical power for large conditioning sets leads to incorrect independence decisions. Variants like PC-stable and FCI address ordering dependence and hidden confounders, respectively.",
      hints: [
        "Sparse graphs help because small maximum degree limits the conditioning set size.",
        "In genomics with thousands of genes, PC is often run with a maximum conditioning set size constraint.",
      ],
    },
  ],

  "ges-algorithm": [
    {
      id: "q-ci-kp12-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Greedy Equivalence Search (GES) algorithm for causal discovery operates by:",
      options: [
        "Testing all possible DAGs and selecting the one with the highest BIC score",
        "Performing greedy forward and backward search in the space of Markov equivalence classes (CPDAGs) using a score such as BIC, adding then removing edges",
        "Sampling random DAGs using MCMC and averaging the posterior distribution",
        "Learning a neural network to predict the adjacency matrix of the DAG",
      ],
      correctAnswer: 1,
      explanation:
        "GES operates in two phases: (1) Forward phase — greedily adds edges (single-edge additions to the CPDAG) that most increase the score; (2) Backward phase — greedily removes edges that increase the score. GES is provably consistent under Gaussian linear models with the BIC score and the faithfulness assumption. It searches CPDAGs directly, avoiding redundancy from Markov-equivalent DAGs.",
      hints: [
        "GES is a score-based method, unlike constraint-based PC. Both output a CPDAG.",
        "The score (e.g., BIC) trades off fit and model complexity, preventing overfitting to all possible edges.",
      ],
    },
    {
      id: "q-ci-kp12-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Score-based causal discovery methods like GES are guaranteed to find the globally optimal DAG (highest-scoring DAG) even in very large graphs.",
      correctAnswer: "False",
      explanation:
        "Exact optimization over the space of DAGs is NP-hard (superexponential in the number of variables). GES uses greedy search in CPDAG space, which is provably consistent under faithfulness but not guaranteed to find the global optimum in finite samples or when faithfulness is violated. Exact methods (e.g., dynamic programming for small p) become intractable for large graphs.",
      hints: [
        "The DAG space has superexponential size — there are roughly 2^(p²/2) possible DAGs for p variables.",
        "GES trades global optimality for computational feasibility while maintaining asymptotic consistency.",
      ],
    },
    {
      id: "q-ci-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is the BIC (Bayesian Information Criterion) a particularly natural score for causal discovery with GES?",
      options: [
        "BIC has a closed form for any distribution family, making it computationally cheap",
        "BIC is a consistent model selection criterion that penalizes model complexity; under Gaussian linear SEMs, the BIC score is decomposable (factors over variables), enabling efficient local search in CPDAG space",
        "BIC maximizes the likelihood of the data without any penalty, ensuring the best fit to the training data",
        "BIC is equivalent to the minimum description length of the causal graph",
      ],
      correctAnswer: 1,
      explanation:
        "The BIC score is score-equivalent (assigns the same score to Markov-equivalent DAGs) and locally consistent (prefers the correct CPDAG asymptotically). Crucially, for Gaussian linear models the BIC decomposes as a sum of local scores over variables: BIC(G) = Σ_i BIC(X_i | PA_i(G)). This decomposability allows GES to update the score incrementally when adding/removing an edge, making local search efficient.",
      hints: [
        "Score decomposability is key: when you add one edge, only the score of the child node changes.",
        "Score equivalence ensures GES doesn't arbitrarily prefer one DAG over another in the same equivalence class.",
      ],
    },
  ],

  "lingam": [
    {
      id: "q-ci-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "LiNGAM (Linear Non-Gaussian Acyclic Model) can uniquely identify the causal DAG (not just the CPDAG) from observational data because:",
      options: [
        "It uses interventional data from multiple environments",
        "The non-Gaussianity of noise variables allows unique identification of the causal ordering from the data distribution",
        "It assumes a linear functional form which uniquely determines edge directions",
        "It uses temporal ordering to determine the causal direction between variables",
      ],
      correctAnswer: 1,
      explanation:
        "Under Gaussian noise, X→Y and Y→X are statistically indistinguishable in the linear bivariate case (Markov equivalence). LiNGAM exploits the fact that under non-Gaussian noise with a linear SEM, the joint distribution is only consistent with one causal ordering. Shimizu et al. showed that ICA (Independent Component Analysis) can recover the unique causal DAG by finding the causal ordering via non-Gaussianity.",
      hints: [
        "Gaussianity is the 'special case' where causal direction is unidentifiable from observational data.",
        "ICA finds statistically independent components — the non-Gaussian noise variables U_i in the LiNGAM SEM.",
      ],
    },
    {
      id: "q-ci-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LiNGAM can identify the full causal DAG even when there are hidden (latent) common causes between observed variables.",
      correctAnswer: "False",
      explanation:
        "The basic LiNGAM model assumes no hidden common causes (causal sufficiency). When latent confounders are present, the basic DirectLiNGAM algorithm fails. Extensions like LvLiNGAM (latent variable LiNGAM) handle this case, but at the cost of more complex algorithms and potentially weaker identifiability guarantees.",
      hints: [
        "Causal sufficiency is a strong assumption: all common causes of observed variables are themselves observed.",
        "LvLiNGAM and related methods extend LiNGAM to handle some hidden variable scenarios.",
      ],
    },
    {
      id: "q-ci-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The DirectLiNGAM algorithm identifies the causal ordering by iteratively:",
      options: [
        "Running ICA on the full dataset and reading off the causal order from the mixing matrix",
        "Finding the variable with least residual dependence on all other variables' residuals (the most exogenous variable), appending it to the causal order, regressing it out, and repeating on the remaining variables",
        "Computing the GES score for all permutations of variables and selecting the one with highest BIC",
        "Fitting a VAR model to the time series and testing for Granger causality",
      ],
      correctAnswer: 1,
      explanation:
        "DirectLiNGAM iteratively finds the most 'exogenous' variable — one whose residuals (after regressing out all other variables) are independent of all other residuals. Since in the true causal ordering the most exogenous variable's noise is not caused by any other variable, it shows maximum non-Gaussian independence from others' residuals. This variable is placed first in the causal ordering, removed from the system, and the process repeats.",
      hints: [
        "The 'most exogenous' variable has the property that no other variable in the system is its cause.",
        "Non-Gaussianity is tested using mutual information or kernel-based independence tests.",
      ],
    },
  ],

  "neural-causal-discovery": [
    {
      id: "q-ci-kp14-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "NOTEARS (Zheng et al., 2018) reformulates causal structure learning as a continuous optimization problem by:",
      options: [
        "Using a neural network to directly predict the adjacency matrix of the DAG",
        "Replacing the combinatorial DAG constraint with a smooth equality constraint: h(W) = tr(e^(W⊙W)) - d = 0, which equals zero if and only if W encodes a DAG",
        "Relaxing the acyclicity constraint and post-hoc thresholding the learned weight matrix",
        "Training a variational autoencoder to sample from the posterior over DAG structures",
      ],
      correctAnswer: 1,
      explanation:
        "NOTEARS introduced the key insight that the DAG acyclicity constraint can be expressed as h(W) = tr(e^(W⊙W)) - d = 0 (where W is the weighted adjacency matrix and ⊙ is element-wise product). This smooth constraint enables gradient-based optimization (augmented Lagrangian method) for continuous structure learning, bypassing the combinatorial search over DAG space that made previous methods intractable at scale.",
      hints: [
        "h(W) = 0 iff the graph with adjacency W has no directed cycles — verified via the matrix exponential.",
        "NOTEARS enabled DAG learning with standard gradient descent, opening the door to neural network extensions like DAG-GNN.",
      ],
    },
    {
      id: "q-ci-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DAG-GNN extends NOTEARS by modeling the structural equations as linear functions, making it strictly more powerful for non-linear causal relationships.",
      correctAnswer: "False",
      explanation:
        "DAG-GNN (Yu et al., 2019) extends NOTEARS by using a graph neural network to model non-linear structural equations, making it more powerful than the linear NOTEARS for capturing non-linear relationships. The original NOTEARS uses a linear SEM, while DAG-GNN can capture arbitrary non-linear dependencies. So DAG-GNN is the non-linear extension, not the linear one.",
      hints: [
        "NOTEARS is linear; DAG-GNN replaces the linear model with a GNN encoder-decoder.",
        "Non-linear models can overfit and may not identify the unique causal structure without additional assumptions.",
      ],
    },
    {
      id: "q-ci-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key criticism of continuous optimization approaches like NOTEARS for causal discovery is:",
      options: [
        "They are computationally slower than combinatorial search methods for small graphs",
        "The continuous relaxation of the acyclicity constraint does not guarantee finding the globally optimal DAG, and the method is sensitive to hyperparameters and initialization; empirical results show it can perform poorly compared to simpler baselines in some settings",
        "They require Gaussian noise assumptions that are more restrictive than constraint-based methods",
        "They cannot handle graphs with more than 20 variables",
      ],
      correctAnswer: 1,
      explanation:
        "Several papers (e.g., Reisach et al. 2021 'Beware of the Simulated DAG') showed that NOTEARS and related methods can perform well on simulated data simply because of data normalization artifacts, and may underperform simpler baselines on real data. The non-convex optimization landscape means solutions depend on initialization, and the continuous relaxation does not guarantee recovery of the true DAG even asymptotically without strong assumptions.",
      hints: [
        "'Beware of the Simulated DAG' showed that sorting variables by variance can outperform NOTEARS on typical benchmarks.",
        "Continuous optimization \$\\neq\$ consistent causal discovery; strong identifiability assumptions are still needed.",
      ],
    },
  ],

  "time-series-causality": [
    {
      id: "q-ci-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Granger causality states that X 'Granger-causes' Y if:",
      options: [
        "X and Y are correlated at lag 0",
        "Past values of X contain information that improves prediction of future Y beyond what is available from past Y alone",
        "There is a statistically significant cross-correlation between X and Y at any lag",
        "X is a leading indicator of Y in a cointegrated system",
      ],
      correctAnswer: 1,
      explanation:
        "Granger causality is a predictive notion: X Granger-causes Y if including lagged values of X in a regression for Y significantly reduces prediction error compared to using only lagged Y. It is operationalized via an F-test on the restriction that coefficients on lagged X are all zero in a VAR model. Note: Granger causality is about predictive precedence, not structural causation — X could Granger-cause Y even if they share a common cause.",
      hints: [
        "Granger causality is about incremental predictability, not structural causation.",
        "A confounder that affects X before Y can create Granger causality without a direct structural link.",
      ],
    },
    {
      id: "q-ci-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Granger causality is equivalent to structural causation in the sense that if X Granger-causes Y, then X is a genuine cause of Y in the structural causal sense.",
      correctAnswer: "False",
      explanation:
        "Granger causality is a predictive/statistical concept, not a structural one. A common cause Z that influences X before Y will make X appear to Granger-cause Y, even with no direct structural link. Conversely, a structural cause X may not Granger-cause Y if the causal effect is instantaneous (same time-step). True structural causal discovery in time series requires additional assumptions (e.g., non-Gaussianity, interventional data).",
      hints: [
        "Granger causality tests are standard in econometrics but are not causal in the structural sense.",
        "Measurement frequency matters: if X and Y are measured at coarser time scales than the true causal lag, causal direction may be lost.",
      ],
    },
    {
      id: "q-ci-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "PCMCI (a method for causal discovery in time series) improves over standard Granger causality testing by:",
      options: [
        "Using neural networks instead of linear VAR models for prediction",
        "First applying PC-style conditional independence testing with parents identified by MCI (Momentary Conditional Independence) to control for autocorrelation and indirect effects, yielding a more reliable causal graph",
        "Bootstrapping the VAR coefficients to get confidence intervals for Granger causality",
        "Using cross-validation to select the optimal lag length for all variables simultaneously",
      ],
      correctAnswer: 1,
      explanation:
        "PCMCI (Runge et al., 2019) addresses two key failures of Granger causality in high-dimensional, autocorrelated systems: (1) it uses PC-style skeleton identification to find relevant parents for each variable, drastically reducing the conditioning set size; (2) it uses the MCI test (conditioning on parents of both X and Y) to account for autocorrelation and indirect effects, yielding a better-calibrated test with fewer false positives. This is particularly valuable in climate science with hundreds of variables.",
      hints: [
        "Standard Granger tests condition only on lagged Y, missing indirect effects and autocorrelation confounding.",
        "PCMCI scales to high-dimensional time series by iteratively restricting conditioning sets.",
      ],
    },
  ],

  "cate-estimation": [
    {
      id: "q-ci-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Conditional Average Treatment Effect (CATE) τ(x) = E[Y(1) - Y(0) | X=x] measures:",
      options: [
        "The average treatment effect over the entire population",
        "The expected treatment effect for units with covariate profile X=x",
        "The probability that the treatment has a positive effect given X=x",
        "The difference in means between the treated and control groups with X=x",
      ],
      correctAnswer: 1,
      explanation:
        "The CATE τ(x) captures treatment effect heterogeneity: it estimates the average causal effect of treatment for a specific subpopulation characterized by covariates X=x. Integrating τ(x) over the distribution of X gives the ATE. The CATE is the key estimand for personalized decision-making — choosing treatment for each individual based on their characteristics.",
      hints: [
        "The ATE = E[τ(X)] — averaging the CATE over the population distribution of X.",
        "CATE is what personalized medicine aims to estimate: will this drug work for this patient?",
      ],
    },
    {
      id: "q-ci-kp16-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A key challenge in evaluating CATE estimators is that individual treatment effects Y_i(1) - Y_i(0) are never observed. The standard evaluation approach uses:",
      options: [
        "Comparing CATE estimates across different estimators using their training loss",
        "Held-out RCT data where the difference in outcomes between matched treated/control pairs approximates the true CATE; or using the pseudo-outcome (e.g., τ̃_i from doubly-robust scores) as a proxy target",
        "Comparing the estimated CATEs to clinician expert opinions",
        "Using cross-validation on the observational dataset with treatment as the label",
      ],
      correctAnswer: 1,
      explanation:
        "Since individual counterfactuals are never observed, CATE evaluation uses: (1) RCT validation — in held-out experimental data, the empirical mean within groups stratified by estimated τ̂(x); (2) Doubly-robust pseudo-outcomes τ̃_i as approximate individual treatment effects, enabling regression-style evaluation (R-loss); (3) Decision-value metrics like AUTOC or QINI curves that evaluate the policy implied by the CATE.",
      hints: [
        "You cannot directly check if τ̂(x_i) is close to Y_i(1)-Y_i(0) because Y_i(1)-Y_i(0) is unobserved.",
        "R-loss (Robinson decomposition) is a popular approach: τ̂ minimizes E[(Ỹ_i - τ̂(X_i)·T̃_i)²] where tildes denote residuals.",
      ],
    },
    {
      id: "q-ci-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Robinson decomposition (partial linear model) used in the R-learner for CATE estimation expresses the outcome as:",
      options: [
        "Y = α + βT + ε, with β estimated by OLS",
        "Y - m(X) = τ(X)·(T - e(X)) + ε, where m(X) = E[Y|X] and e(X) = E[T|X] are nuisance functions",
        "Y = τ(X) + g(X) + ε, where g(X) is a flexible main effect and τ(X) is the interaction term",
        "Y(T) = f(X,T) with f estimated by a random forest treating T as a feature",
      ],
      correctAnswer: 1,
      explanation:
        "The Robinson (1988) partial linear decomposition: Y - m(X) = τ(X)·(T - e(X)) + ε. After partialling out the main effects m(X)=E[Y|X] and e(X)=E[T|X] (nuisance functions estimated in a first stage), the residual equation becomes a weighted regression that identifies τ(X). The R-learner minimizes the empirical R-loss: Σ[(Ỹ_i - τ̂(X_i)·T̃_i)²], enabling use of any flexible ML model for τ̂.",
      hints: [
        "The 'R' in R-learner refers to Robinson's decomposition.",
        "The nuisance functions m and e can be estimated with cross-fitting (sample-splitting) to avoid overfitting bias.",
      ],
    },
  ],

  "meta-learners": [
    {
      id: "q-ci-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The T-learner for CATE estimation trains two separate outcome models μ̂_0(x) and μ̂_1(x) and then estimates τ̂(x) = μ̂_1(x) - μ̂_0(x). What is its main weakness?",
      options: [
        "It requires knowing the propensity score e(X) to compute the CATE",
        "When treated and control groups have very different covariate distributions (low overlap), each model is extrapolating to regions with few observations of the corresponding treatment, leading to high variance",
        "It cannot handle non-linear treatment effects because it assumes additive separability",
        "It requires running the treatment model in the potential outcomes framework, which violates SUTVA",
      ],
      correctAnswer: 1,
      explanation:
        "The T-learner trains μ̂_1 only on treated data and μ̂_0 only on control data. When overlap is poor, μ̂_1 must extrapolate to covariate regions covered mostly by controls (and vice versa), introducing high variance and potential bias. The S-learner (single model with T as a feature) can borrow strength across groups but may underfit the treatment effect. X-learner and R-learner are more robust under poor overlap.",
      hints: [
        "Poor overlap means e(X) ≈ 0 or ≈ 1 for large portions of the covariate space.",
        "Extrapolation with complex models (e.g., random forests) can have large variance outside the training distribution of each group.",
      ],
    },
    {
      id: "q-ci-kp17-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The X-learner meta-algorithm is especially designed for situations where:",
      options: [
        "The treatment effect is constant (homogeneous) across all covariates",
        "The number of treated units is very small or very large compared to controls (imbalanced treatment assignment)",
        "The propensity score is unknown and cannot be estimated",
        "There are more than two treatment arms",
      ],
      correctAnswer: 1,
      explanation:
        "The X-learner (Künzel et al., 2019) is designed for highly imbalanced treatment assignment. Step 1: fit outcome models μ̂_0, μ̂_1 (like T-learner). Step 2: compute imputed treatment effects D̃_i^1 = Y_i - μ̂_0(X_i) for treated units and D̃_i^0 = μ̂_1(X_i) - Y_i for controls. Step 3: fit separate CATE models τ̂_1 and τ̂_0 on D̃^1 and D̃^0 respectively. Step 4: combine via propensity weighting: τ̂(x) = e(x)τ̂_0(x) + (1-e(x))τ̂_1(x). The propensity weighting upweights τ̂_1 when e(x) is large (many treated).",
      hints: [
        "With 1000 treated and 10 controls, τ̂_1 (from imputed effects for treated) is more reliable and should be upweighted.",
        "The propensity score e(X) acts as a natural weighting — regions with many treated units weight τ̂_1 more.",
      ],
    },
    {
      id: "q-ci-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which meta-learner is provably efficient (achieves the semiparametric efficiency bound) for CATE estimation when nuisance functions are estimated at fast enough rates?",
      options: [
        "S-learner",
        "T-learner",
        "R-learner (or equivalently, the DR-learner using doubly-robust pseudo-outcomes)",
        "X-learner",
      ],
      correctAnswer: 2,
      explanation:
        "The R-learner / DR-learner achieves semiparametric efficiency when nuisance functions (propensity score and outcome regression) are estimated consistently at sufficient rates (e.g., n^{1/4} convergence). This follows from the theory of orthogonal/Neyman-orthogonal scores: the Robinson decomposition's residual equation is an orthogonal moment condition, meaning errors in nuisance estimation have only second-order effects on the CATE estimator. The S, T, and X learners do not share this property in general.",
      hints: [
        "Neyman orthogonality means the CATE estimating equation is insensitive to first-order errors in nuisance function estimation.",
        "This is the basis of debiased/double machine learning (DML) as formalized by Chernozhukov et al. (2018).",
      ],
    },
  ],

  "causal-forests": [
    {
      id: "q-ci-kp18-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Causal forests (Wager & Athey, 2018) extend random forests for CATE estimation. The key modification to standard regression tree splitting is:",
      options: [
        "Using the treatment indicator T as the outcome variable to be predicted",
        "Splitting on the criterion that maximizes heterogeneity in treatment effects across child nodes, rather than variance reduction in the outcome",
        "Growing trees only on the treated units and computing the CATE as the leaf-level predictions",
        "Using CART on propensity-score matched pairs instead of the full dataset",
      ],
      correctAnswer: 1,
      explanation:
        "Causal trees/forests split to maximize heterogeneity in treatment effects: the splitting criterion seeks splits where treated and control units in child nodes differ maximally in their average outcomes, not in the outcome variance. Within each leaf, the CATE is estimated as the difference in means between treated and control units in that leaf. Causal forests aggregate predictions across many causal trees, with honest estimation (sample-splitting within leaves) providing valid confidence intervals.",
      hints: [
        "In a standard regression tree, you split to minimize within-node variance of Y. In a causal tree, you split to maximize between-arm differences within nodes.",
        "'Honesty' in causal forests: use one subsample to determine splits and another to estimate leaf-level means.",
      ],
    },
    {
      id: "q-ci-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Causal forests provide asymptotically valid confidence intervals for the CATE at any query point x, not just for the ATE.",
      correctAnswer: "True",
      explanation:
        "Wager & Athey (2018) proved that causal forest estimates τ̂(x) are asymptotically normal with a computable variance, enabling pointwise confidence intervals for the CATE. This is a significant advantage over many other CATE methods (e.g., T-learner with neural networks) which produce point estimates without valid uncertainty quantification. The key requirement is the honesty property of the tree construction.",
      hints: [
        "Honest trees use non-overlapping subsamples for splitting and estimation, avoiding overfitting that would invalidate standard errors.",
        "Valid confidence intervals for CATE are important for personalized decision-making with statistical guarantees.",
      ],
    },
    {
      id: "q-ci-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Generalized Random Forests (GRF, Athey et al. 2019) unify causal forests with other estimation problems. What is their core estimation principle?",
      options: [
        "They estimate any target parameter by training a random forest to predict the parameter directly as a regression target",
        "They solve a local moment condition at each query point x, using the forest's adaptive neighborhood weights to downweight observations far from x, thus adapting the estimating equation to a local problem",
        "They use the forest structure to construct an optimal instrument for 2SLS estimation",
        "They extend gradient boosting to non-smooth loss functions using random forests as weak learners",
      ],
      correctAnswer: 1,
      explanation:
        "GRF frames any estimation problem via a local moment condition: find θ(x) such that E[ψ_{θ,ν}(O_i) | X_i=x] = 0, where ψ is a score function and ν are nuisance parameters. The forest provides adaptive weights α_i(x) — the fraction of trees where observation i and query point x land in the same leaf — which define a weighted local estimating equation Σ_i α_i(x)·ψ_{θ,ν}(O_i) = 0. This unifies quantile regression forests, instrumental forest, and causal forests under one framework.",
      hints: [
        "The forest weights α_i(x) measure 'local similarity' to x — a data-adaptive kernel.",
        "The moment condition framework allows GRF to estimate any semiparametric estimand, not just the CATE.",
      ],
    },
  ],

  "double-ml": [
    {
      id: "q-ci-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Double/Debiased Machine Learning (DML, Chernozhukov et al. 2018) uses 'cross-fitting' (sample-splitting) to estimate nuisance functions. Why is this necessary?",
      options: [
        "Cross-fitting increases the effective sample size by using all observations for both nuisance estimation and final estimation",
        "Without sample-splitting, using the same data to estimate nuisance functions and the target parameter introduces 'overfitting bias' that can dominate the asymptotic distribution and invalidate inference",
        "Cross-fitting reduces the variance of the propensity score estimates by averaging across folds",
        "It ensures that the nuisance functions satisfy the overlap condition",
      ],
      correctAnswer: 1,
      explanation:
        "If the same sample is used to estimate nuisance functions (e.g., propensity score ê and outcome model m̂) and the treatment effect θ, overfitting in the nuisance estimates can create bias in θ̂ that is O(n^{-1/2}), as large as the signal. Cross-fitting (K-fold: estimate nuisance on K-1 folds, apply to held-out fold) ensures that nuisance estimates are independent of the observations used for θ estimation, so overfitting bias is O(n^{-1}) and asymptotic normality of θ̂ is preserved.",
      hints: [
        "This is analogous to why you evaluate a model on held-out test data — in-sample evaluation is biased.",
        "Cross-fitting allows flexible ML nuisance models (random forests, neural nets) while maintaining valid inference.",
      ],
    },
    {
      id: "q-ci-kp19-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "DML requires correctly specifying both the propensity score model and the outcome model to produce a consistent estimate of the treatment effect.",
      correctAnswer: "False",
      explanation:
        "DML uses doubly-robust / Neyman-orthogonal moment conditions, so the treatment effect estimator is consistent if either the propensity score model or the outcome regression model is consistent (doubly robust). Moreover, when both nuisance models converge at rates faster than n^{-1/4}, the treatment effect estimator achieves the parametric √n rate. This allows flexible ML models for nuisances without requiring any single one to be exactly correct.",
      hints: [
        "DML's key innovation is using orthogonal (debiased) scores that are insensitive to nuisance errors.",
        "The requirement is rates of convergence for nuisance functions, not their exact correctness.",
      ],
    },
    {
      id: "q-ci-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the partially linear DML model Y = θ_0·D + g_0(X) + ε, the DML estimator for θ_0 is based on the moment condition:",
      options: [
        "E[ε · D] = 0 (standard OLS moment condition)",
        "E[(Y - θ_0·D - ĝ(X)) · V̂] = 0 where V̂ = D - ê(X) is the residualized treatment",
        "E[Y | D, X] = θ_0·D + g_0(X) (conditional expectation equation)",
        "minθ ||Y - θ·D - g(X)||² subject to ||g||_∞ ≤ C",
      ],
      correctAnswer: 1,
      explanation:
        "DML solves the Neyman-orthogonal score equation: E[(Y - θ_0·D - g_0(X))·(D - l_0(X))] = 0, where l_0(X) = E[D|X] and g_0(X) = E[Y-θ_0·D|X]. Using estimates ĝ and l̂: θ̂ = {Σ V̂_i(Y_i - ĝ(X_i))} / {Σ V̂_i·D_i}, where V̂_i = D_i - l̂(X_i). This is equivalent to: regress (Y-ĝ(X)) on V̂ = (D-l̂(X)) without intercept. The orthogonality of V̂ to the nuisance g(X) eliminates the first-order bias from nuisance estimation errors.",
      hints: [
        "V̂ = D - ê(X) is the residual treatment after removing the effect of X — analogous to an instrumental variable.",
        "This is the Frisch-Waugh-Lovell theorem applied to the partially linear model with ML nuisance estimation.",
      ],
    },
  ],

  "regression-discontinuity": [
    {
      id: "q-ci-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A Regression Discontinuity Design (RDD) identifies a causal effect by exploiting:",
      options: [
        "Random assignment of treatment based on a coin flip",
        "A threshold rule where units just above a cutoff receive treatment and units just below do not, creating a local randomized experiment near the threshold",
        "Instrumental variables that shift treatment probability but not the outcome directly",
        "Panel data with repeated observations to difference out unit fixed effects",
      ],
      correctAnswer: 1,
      explanation:
        "In an RDD, treatment is determined by whether a running variable X crosses a known threshold c: T = 1(X ≥ c). Units near the cutoff are assumed to be very similar (quasi-random assignment near the threshold), so the jump in outcomes at the cutoff is attributed to the treatment. The identifying assumption is that all other factors influencing the outcome are continuous through the cutoff — only treatment status is discontinuous.",
      hints: [
        "Classic examples: scholarship eligibility based on exam score threshold; legal drinking age at 21; electoral outcomes at 50% vote share.",
        "RDD provides local identification — the LATE at the threshold, not the ATE for the whole population.",
      ],
    },
    {
      id: "q-ci-kp20-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a fuzzy RDD (as opposed to a sharp RDD), the treatment probability changes discontinuously at the threshold but does not jump from 0 to 1. The fuzzy RDD estimator is:",
      options: [
        "The difference in mean outcomes just above and below the threshold",
        "The ratio of the discontinuity in the outcome to the discontinuity in the treatment probability at the threshold — equivalent to a local IV estimator",
        "An OLS regression of outcome on treatment with a bandwidth-restricted sample",
        "A difference-in-differences estimator using the threshold as a natural experiment",
      ],
      correctAnswer: 1,
      explanation:
        "In a fuzzy RDD: lim_{x↓c} E[T|X=x] \$\\neq\$ lim_{x↑c} E[T|X=x] but the jump is not exactly 1. The fuzzy RDD estimator is τ_FRD = (discontinuity in E[Y|X=x] at c) / (discontinuity in E[T|X=x] at c). This is equivalent to using 1(X≥c) as an instrument for T in a 2SLS regression, restricted to a bandwidth around c. It identifies the LATE for compliers at the threshold.",
      hints: [
        "The threshold 1(X≥c) is a valid instrument: it shifts treatment probability discontinuously but (under continuity) does not directly shift outcomes.",
        "Fuzzy RDD = local IV; sharp RDD = reduced form = IV estimate when compliance is perfect.",
      ],
    },
    {
      id: "q-ci-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The McCrary (2008) density test in RDD is used to detect:",
      options: [
        "Whether the running variable is normally distributed, which is required for valid inference",
        "Manipulation of the running variable around the cutoff — if units can precisely control their score to be just above/below the threshold, the density of the running variable should be discontinuous at the cutoff",
        "Whether the bandwidth selection for local polynomial regression is optimal",
        "Violations of the parallel trends assumption near the threshold",
      ],
      correctAnswer: 1,
      explanation:
        "The McCrary density test checks whether there is a statistically significant discontinuity in the density of the running variable at the cutoff. A smooth density (no jump) is consistent with no manipulation. If agents can manipulate their score to land just above the threshold (e.g., students retaking tests, firms managing earnings), the density will be bunched just above c and depleted just below, violating the identifying assumption that units cannot precisely control their assignment.",
      hints: [
        "If students know the scholarship threshold, they may retake the exam to exceed it — creating a density jump.",
        "A significant density discontinuity suggests sorting: units just above the threshold are not comparable to those just below.",
      ],
    },
  ],

  "disentangled-representations": [
    {
      id: "q-ci-kp21-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A disentangled representation in the causal sense aims to learn latent variables z = (z_1, ..., z_k) such that:",
      options: [
        "Each z_i has zero correlation with all other z_j (statistical independence)",
        "Each z_i corresponds to an independent generative factor (an exogenous noise variable in the true SCM), capturing causally meaningful variation",
        "The reconstruction loss of a VAE is minimized while constraining the KL divergence",
        "The latent dimensions correspond to principal components of the input data",
      ],
      correctAnswer: 1,
      explanation:
        "Causal disentanglement goes beyond statistical independence: a truly disentangled representation has each latent z_i corresponding to an independent causal mechanism — one of the exogenous factors in the underlying SCM. This means interventions on z_i have predictable effects on the generative process, and the representation is transferable across domains that share the same causal mechanisms but different distributions.",
      hints: [
        "Statistical disentanglement (independent z_i's) is necessary but not sufficient for causal disentanglement.",
        "Causal disentanglement is connected to the Independent Causal Mechanisms (ICM) principle.",
      ],
    },
    {
      id: "q-ci-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "β-VAE achieves causal disentanglement by increasing the weight on the KL divergence term, which is sufficient to learn causally meaningful latent factors from observational data alone.",
      correctAnswer: "False",
      explanation:
        "Locatello et al. (2019) proved that disentanglement (even in the statistical sense) is provably impossible without inductive biases or additional supervision from observational data alone — any entangled representation can be reparameterized to appear disentangled. β-VAE's KL regularization encourages statistical independence of latents but provides no causal guarantees without additional constraints (supervision, interventional data, or inductive biases encoding causal structure).",
      hints: [
        "Locatello et al.'s impossibility result applies to all unsupervised methods, not just β-VAE.",
        "Supervised or weakly supervised signals (e.g., labels for generative factors, data from multiple environments) are needed to break the identifiability impasse.",
      ],
    },
    {
      id: "q-ci-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "iVAE (Identifiable VAE, Khemakhem et al. 2020) achieves identifiable disentanglement by:",
      options: [
        "Using a larger β coefficient on the KL term than standard β-VAE",
        "Conditioning the prior on observed auxiliary variables (e.g., class labels or domain indicators), which breaks the identifiability impossibility through a conditional non-linear ICA framework",
        "Training with adversarial examples to encourage robust representations",
        "Using a sparse prior (e.g., Laplacian) instead of a Gaussian prior on latents",
      ],
      correctAnswer: 1,
      explanation:
        "iVAE exploits auxiliary observed variables u (e.g., class labels, time index, domain) that modulate the prior p(z|u). Under mild conditions (sufficient variability of u and a non-linear exponential family prior), the latents z are provably identifiable up to permutation and element-wise reparameterization. This is essentially a conditional non-linear ICA result — the auxiliary variable breaks the permutation ambiguity that makes unconditional disentanglement impossible.",
      hints: [
        "The key is that different values of u must modulate the latent prior in sufficiently diverse ways.",
        "iVAE connects VAE-based disentanglement to the theory of identifiable non-linear ICA.",
      ],
    },
  ],

  "independent-causal-mechanisms": [
    {
      id: "q-ci-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Independent Causal Mechanisms (ICM) principle states that:",
      options: [
        "All causal variables must be statistically independent of each other in the joint distribution",
        "The causal mechanisms generating each variable from its parents are autonomous and do not share information — they are independently manipulable and do not inform each other",
        "Each node in a causal DAG must have an independent noise variable with zero variance",
        "Causal models must factorize as products of independent Gaussian distributions",
      ],
      correctAnswer: 1,
      explanation:
        "The ICM principle (Schölkopf et al., 2012) states that the causal generative process consists of modules P(X_i | PA_i) (the mechanism generating X_i from its parents) that are autonomous — they do not share parameters, can be independently intervened upon, and do not inform each other. Crucially, in the causal direction, knowing P(cause) tells you nothing about P(effect|cause), unlike the anti-causal direction. This asymmetry can be used for causal direction identification.",
      hints: [
        "ICM implies that perturbations to one mechanism don't affect other mechanisms — modular causal structure.",
        "The 'no information sharing' property means the mechanism parameters are orthogonal/independent.",
      ],
    },
    {
      id: "q-ci-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "According to the ICM principle, in the causal direction X→Y, the marginal distribution P(X) (cause) and the conditional P(Y|X) (mechanism) should be statistically independent — knowing P(X) provides no information about P(Y|X).",
      correctAnswer: "True",
      explanation:
        "The ICM principle implies that in the causal direction, P(cause) and P(effect|cause) are 'algorithmically independent' — they contain no shared information. In the anti-causal direction, P(Y) and P(X|Y) are typically dependent (knowing the marginal of Y gives information about the conditional). This asymmetry is the basis for causal direction tests: if P(X) and P(Y|X) are simpler to describe jointly than P(Y) and P(X|Y), X→Y is the causal direction.",
      hints: [
        "This is related to the Minimum Description Length principle: the causal direction has a shorter joint description.",
        "Complexity measures like Kolmogorov complexity formalize 'algorithmic independence'.",
      ],
    },
    {
      id: "q-ci-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The ICM principle predicts that when a distribution shift occurs due to a change in only one causal mechanism (sparse mechanism shift), the shift should be detectable as a change in only one or few modules of the causal factorization. How is this used for domain adaptation?",
      options: [
        "By retraining all model components on the target domain data",
        "By identifying which P(X_i | PA_i) modules changed between source and target (most others remain invariant), allowing targeted adaptation by updating only changed modules while keeping invariant mechanisms fixed",
        "By averaging the source and target distributions to obtain a more robust estimate",
        "By using adversarial domain adaptation to align all feature distributions",
      ],
      correctAnswer: 1,
      explanation:
        "The sparse mechanism shift hypothesis suggests that natural distribution shifts change only a few causal mechanisms. If we can identify which P(X_i|PA_i) changed (e.g., via change-point detection on the factorized components), we only need to adapt those modules. Invariant mechanisms transfer unchanged. This is more efficient than full model retraining and underpins methods like Invariant Risk Minimization (IRM) and causal transfer learning.",
      hints: [
        "Dataset shift due to a change in the environment often affects only the distribution of the cause, not the mechanism P(Y|X).",
        "If P(X) changes but P(Y|X) doesn't, a model trained on P(Y|X) transfers well — this is anti-causal adaptation.",
      ],
    },
  ],

  "invariant-risk-minimization": [
    {
      id: "q-ci-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Invariant Risk Minimization (IRM, Arjovsky et al. 2019) seeks to learn a feature representation Φ such that:",
      options: [
        "The total risk across all training environments is minimized",
        "There exists a single linear classifier w on top of Φ that is simultaneously optimal across all training environments — the causal features that are invariant across environments",
        "The feature distribution P(Φ(X)) is the same across all environments",
        "The representation Φ maximizes the mutual information between features and labels",
      ],
      correctAnswer: 1,
      explanation:
        "IRM optimizes: min_Φ Σ_e R^e(w·Φ) s.t. w ∈ argmin_{w'} R^e(w'·Φ) for all e. The constraint requires that the same classifier w is optimal across all environments. Intuitively, features that are causally related to the outcome (not spuriously correlated due to confounders) will have a consistent relationship with Y across environments, while spurious correlates will not. IRM finds a representation where this causal invariance holds.",
      hints: [
        "Spurious correlations change across environments (e.g., grass correlates with cows in train data but not in unusual test images).",
        "Causal features have invariant conditional distributions P(Y|Φ(X)) across environments.",
      ],
    },
    {
      id: "q-ci-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "IRM is guaranteed to recover the causal features and achieve zero out-of-distribution (OOD) error in all settings with sufficient environment diversity.",
      correctAnswer: "False",
      explanation:
        "IRM requires sufficient environment diversity (the environments must create sufficient 'interpolation' of the spurious correlations) to identify the causal features. Rosenfeld et al. (2021) showed that IRM can fail when linear environment structure is insufficient to separate causal from spurious features. Additionally, IRM's bi-level optimization is NP-hard in general and the practical IRMv1 approximation can be inconsistent. OOD generalization beyond the training environments is also not guaranteed without further structural assumptions.",
      hints: [
        "If all environments have the same spurious correlation (only one environment type), IRM cannot distinguish causal from spurious features.",
        "IRM provides a useful inductive bias but is not a provable OOD generalization panacea.",
      ],
    },
    {
      id: "q-ci-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The practical IRMv1 objective adds a penalty term to ERM. Which formulation is correct?",
      options: [
        "min_Φ,w Σ_e R^e(w·Φ) + λ·||∇_w R^e(w·Φ)||² summed over environments",
        "min_Φ,w Σ_e R^e(w·Φ) + λ·||w - w_e||² where w_e is the environment-specific optimal classifier",
        "min_Φ,w Σ_e R^e(w·Φ) subject to ||Φ(X)||² ≤ C",
        "min_Φ,w Σ_e R^e(w·Φ) + λ·KL(P^e(Φ(X))||P^{e'}(Φ(X)))",
      ],
      correctAnswer: 0,
      explanation:
        "IRMv1 relaxes the bi-level IRM constraint using a gradient norm penalty: min_{Φ,w} Σ_e [R^e(w·Φ) + λ·||∇_{w|w=1} R^e(w·Φ)||²]. The penalty term ||∇_w R^e(w·Φ)||² measures how much the gradient of the loss w.r.t. the classifier w deviates from zero — if w is already optimal for environment e, this gradient is zero. The penalty encourages w to be simultaneously optimal across all environments, approximating the original IRM constraint.",
      hints: [
        "If w is optimal for an environment, the gradient of the loss w.r.t. w should be zero.",
        "IRMv1 is a differentiable approximation that can be optimized with gradient descent, unlike the original bi-level problem.",
      ],
    },
  ],

  "counterfactual-reasoning": [
    {
      id: "q-ci-kp24-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Computing individual-level counterfactuals (e.g., 'what would patient i's outcome have been if they had not received treatment, given that we observed their outcome under treatment?') requires:",
      options: [
        "Only the observed joint distribution P(Y,T,X)",
        "The propensity score model P(T|X) and an outcome model P(Y|T,X)",
        "A fully specified SCM including the functional form of structural equations and the joint distribution of exogenous noise variables",
        "Interventional data from a randomized experiment",
      ],
      correctAnswer: 2,
      explanation:
        "Individual counterfactuals are rung-3 queries on Pearl's hierarchy. Computing Y_i(0) given that we observed Y_i(1)=y requires: (1) Abduction — infer the specific noise realization u_i that explains the observed outcome given the structural equations; (2) Mutation — modify the SCM by setting T=0; (3) Prediction — compute Y under the modified SCM with the inferred u_i. This requires the structural equations (not just the distribution), making counterfactuals strictly more demanding than interventional queries.",
      hints: [
        "Rung-3 requires 'imagination' — reasoning about specific individuals, not populations.",
        "The abduction step requires knowing the structural equations to infer u_i from observed (T_i, X_i, Y_i).",
      ],
    },
    {
      id: "q-ci-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Under the Rubin Potential Outcomes Framework, individual treatment effects Y_i(1) - Y_i(0) are identifiable (estimable without bias) from observational data under the strong ignorability assumption.",
      correctAnswer: "False",
      explanation:
        "Under strong ignorability (unconfoundedness + overlap), the ATE = E[Y(1)-Y(0)] and CATE = E[Y(1)-Y(0)|X=x] are identifiable, but individual treatment effects (ITEs) Y_i(1)-Y_i(0) are not. The fundamental problem of causal inference means we can never observe both Y_i(1) and Y_i(0). Strong ignorability identifies population-level averages but not individual counterfactuals. ITEs require stronger structural assumptions (SCMs with known functional forms).",
      hints: [
        "Population-level identification (ATE, CATE) is achievable; individual-level identification (ITE) is not — without a fully specified SCM.",
        "CATE gives the best achievable approximation to ITE from observational data alone.",
      ],
    },
    {
      id: "q-ci-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In algorithmic recourse, counterfactual explanations answer the question: 'what minimal change to input x would flip the model's prediction?' The key challenge compared to standard counterfactual computation is:",
      options: [
        "The model's decision boundary is not differentiable with respect to the input",
        "Counterfactual explanations must be actionable (achievable by the individual) and plausible (consistent with the data distribution), requiring causal knowledge of which features can be changed and what downstream effects those changes would cause",
        "Computing counterfactuals requires exponential time in the number of features",
        "Individual counterfactuals are never statistically estimable from finite samples",
      ],
      correctAnswer: 1,
      explanation:
        "Algorithmic recourse counterfactuals must be: (1) Actionable — only modifiable features (not age, race) can be suggested; (2) Causal — changing one feature may require changing causally downstream features too (e.g., increasing income may require changing job); (3) Plausible — the counterfactual should lie in a region of high data density. These constraints require a causal model of the feature space. Wachter et al. (2017) nearest-counterfactual ignores causal constraints; Karimi et al. (2021) CSCF addresses them.",
      hints: [
        "'You should get a college degree' is not actionable for a 60-year-old; 'You should increase savings' is.",
        "Causal recourse accounts for the fact that changing loan amount also changes debt-to-income ratio.",
      ],
    },
  ],

  "causal-ood": [
    {
      id: "q-ci-kp25-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The key insight of causal OOD generalization is that predictive models relying on spurious correlations fail under distribution shift because:",
      options: [
        "Spurious correlations are statistically weaker than causal relationships and thus harder to learn",
        "Spurious correlations are environment-specific — they change when the environment (data-generating process) changes — while the causal mechanism P(Y|causes) remains stable across environments",
        "Spurious features have higher variance than causal features, causing overfitting",
        "Spurious correlations violate the faithfulness assumption required by causal discovery algorithms",
      ],
      correctAnswer: 1,
      explanation:
        "Causal OOD approaches (IRM, DRO, CORAL, etc.) are motivated by the invariance principle: the causal mechanism P(Y|X_causal) is stable across distribution shifts, while spurious correlations P(Y|X_spurious) are environment-dependent. A classifier relying only on causal features generalizes across environments; one relying on spurious features does not. The 'cow on grass' example is classic: grass color is spurious (not causal) for predicting cows, and fails when cows appear on beaches.",
      hints: [
        "Invariant predictors = predictors that use features causally related to Y, not those that happen to be correlated in the training data.",
        "The causal mechanism P(Y|causes) is determined by physics/biology, not data collection — it's stable across contexts.",
      ],
    },
    {
      id: "q-ci-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Empirical Risk Minimization (ERM) with sufficient data will eventually converge to the optimal OOD-generalizing predictor that relies only on causal features.",
      correctAnswer: "False",
      explanation:
        "ERM minimizes the average loss on the training distribution. If spurious features are more predictive than causal features on the training distribution (e.g., because the spurious correlation is stronger), ERM will exploit spurious features. With infinite data from the same distribution, ERM converges to the Bayes-optimal predictor for that distribution — which includes spurious features. Causal OOD generalization requires explicitly constraining the learning to ignore spurious correlations, which ERM does not do.",
      hints: [
        "More training data from the same distribution reinforces the spurious correlations present in that distribution.",
        "OOD generalization requires data from multiple environments or additional causal assumptions.",
      ],
    },
    {
      id: "q-ci-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Distributionally Robust Optimization (DRO) approaches OOD generalization by optimizing the worst-case risk over a set of distributions. For causal OOD generalization, which distributional set is most natural?",
      options: [
        "All distributions within a fixed total variation distance from the training distribution",
        "All distributions resulting from interventions on the causal graph that change only non-Y-causing mechanisms (e.g., interventions on P(X_spurious) but not P(Y|X_causal))",
        "All distributions with the same marginal P(X) but different P(Y|X)",
        "All distributions that minimize the training loss below a fixed threshold",
      ],
      correctAnswer: 1,
      explanation:
        "From a causal perspective, the relevant distributional set for OOD generalization is the set of distributions resulting from interventions on 'non-causal' parts of the graph — changes to P(X_spurious) or the selection mechanism, but not to P(Y|X_causal). This aligns DRO with causal invariance: the worst case over this intervention set is a predictor that doesn't rely on features that can change under plausible interventions. This connects DRO to the causal invariance motivation of IRM.",
      hints: [
        "Generic DRO (worst-case over all distributions within a ball) may be overly conservative.",
        "Causally-motivated DRO restricts the adversary to interventions that match plausible environment shifts.",
      ],
    },
  ],

  "uplift-modeling": [
    {
      id: "q-ci-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Uplift modeling (also called 'incremental modeling' or 'true-lift modeling') aims to identify:",
      options: [
        "Users who will convert regardless of treatment (sure things)",
        "Users who would not convert regardless of treatment (lost causes)",
        "Users for whom the treatment has a positive causal effect (persuadables) — maximizing the CATE across individuals to target those with highest marginal returns",
        "Users who will convert only if not treated (sleeping dogs)",
      ],
      correctAnswer: 2,
      explanation:
        "Uplift modeling estimates the individual-level causal effect of a treatment (e.g., email, discount, ad) to identify 'persuadables' — users whose behavior is genuinely changed by the treatment. The four segments are: (1) Sure Things — convert with or without treatment; (2) Persuadables — convert only with treatment; (3) Do Not Disturbs/Sleeping Dogs — convert only without treatment; (4) Lost Causes — never convert. Targeting sure things and lost causes wastes resources or is harmful; persuadables are the valuable segment.",
      hints: [
        "Sending a discount to a 'sure thing' wastes marketing budget; they would have bought anyway.",
        "The CATE τ(x) > 0 identifies persuadables; τ(x) < 0 identifies 'sleeping dogs'.",
      ],
    },
    {
      id: "q-ci-kp26-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Qini curve (and AUUC — Area Under the Uplift Curve) is used to evaluate uplift models. It plots:",
      options: [
        "Precision vs recall for the binary treatment classification task",
        "Cumulative incremental gain (cumulative lift) as a function of the fraction of the population targeted, ordered by decreasing estimated CATE",
        "The ROC curve for predicting who will respond to treatment",
        "The distribution of estimated CATE values across the population",
      ],
      correctAnswer: 1,
      explanation:
        "The Qini/uplift curve ranks individuals by their estimated CATE (descending), then plots the cumulative incremental conversions (treated conversions - control conversions, normalized) as we target increasing fractions of the population. An ideal model concentrates persuadables at the top of the ranking. The area under the curve (AUUC or Qini coefficient) measures ranking quality — higher = better targeting of persuadables over sure things and lost causes.",
      hints: [
        "Unlike ROC curves (which evaluate prediction of a fixed label), uplift curves evaluate the ordering of causal effects.",
        "A random model gives a diagonal line; a perfect model curves sharply upward before flattening.",
      ],
    },
    {
      id: "q-ci-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A practical challenge in uplift modeling at scale is that models tend to score 'sure things' highly (high predicted conversion rate under treatment) rather than 'persuadables' (high incremental effect). The direct CATE approach mitigates this because:",
      options: [
        "Direct CATE models train on the treatment indicator as the outcome, naturally separating sure things from persuadables",
        "Direct CATE models (T-learner, R-learner, etc.) explicitly estimate the difference E[Y(1)|X] - E[Y(0)|X], not just E[Y(1)|X], so 'sure things' with high E[Y(1)|X] and high E[Y(0)|X] get low CATE scores",
        "Direct CATE models use propensity weighting to adjust for the bias toward sure things",
        "Direct CATE models penalize large predicted treatment effects to prevent overfitting",
      ],
      correctAnswer: 1,
      explanation:
        "A 'response model' trained on P(Y=1|T=1,X) will score sure things highly (high probability under treatment) without accounting for E[Y(0)|X]. The CATE τ(x) = E[Y(1)|X=x] - E[Y(0)|X=x] explicitly subtracts the baseline conversion rate, so sure things (with high Y(0)) get low CATE despite high Y(1). Persuadables with low Y(0) and high Y(1) — the true targets — get high CATE scores. This is why CATE estimation (not response modeling) is the correct approach for uplift.",
      hints: [
        "Response model shortcut: E[Y=1|T=1,X] is high for sure things because they always convert, but their incremental value is zero.",
        "The incremental value of treatment = Y(1) - Y(0), not Y(1) alone.",
      ],
    },
  ],

  "policy-learning": [
    {
      id: "q-ci-kp27-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Optimal policy learning in causal inference seeks to find a treatment assignment rule π: X → T that maximizes expected outcome. The optimal policy is:",
      options: [
        "Always treating everyone (π(x) = 1 for all x)",
        "π*(x) = argmax_t E[Y(t)|X=x] — treating unit x with the treatment that maximizes their conditional expected potential outcome",
        "π*(x) = 1(e(x) > 0.5) where e(x) is the propensity score",
        "The policy that achieves the highest lift on the validation set",
      ],
      correctAnswer: 1,
      explanation:
        "The optimal individualized treatment rule (ITR) is π*(x) = argmax_t E[Y(t)|X=x] = 1(τ(x) > 0) for binary treatment where τ(x) is the CATE. If the CATE is positive for individual x, treating is better; if negative, not treating is better. The expected value of π* is E[Y(π*(X))] = E[max(E[Y(0)|X], E[Y(1)|X])], which exceeds the ATE-based decision (treat all or treat none) when there is treatment effect heterogeneity.",
      hints: [
        "The value of an ITR over a fixed policy (treat all vs. treat none) is the 'value of personalization'.",
        "The optimal policy can be estimated from CATE estimates: treat x iff τ̂(x) > cost of treatment.",
      ],
    },
    {
      id: "q-ci-kp27-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Policy evaluation using off-policy data (observational data, not from the target policy) uses Inverse Propensity Score (IPS) weighting. The IPS estimator of policy value V(π) is:",
      options: [
        "(1/n)Σ Y_i · 1(T_i = π(X_i))",
        "(1/n)Σ Y_i · 1(T_i = π(X_i)) / P(T_i | X_i)",
        "(1/n)Σ [μ̂_1(X_i) - μ̂_0(X_i)] · π(X_i)",
        "(1/n)Σ T_i · Y_i / e(X_i)",
      ],
      correctAnswer: 1,
      explanation:
        "The IPS estimator for policy value is: V̂(π) = (1/n)Σ Y_i · 1(T_i = π(X_i)) / P(T_i | X_i). When the observed action matches the policy π(X_i), we include the outcome Y_i but divide by the probability of observing that action in the behavior policy (propensity score). This reweighting corrects for the selection bias — units with low propensity to follow the target policy are upweighted if they happen to do so. Doubly-robust policy evaluation (DM + IPW) is more variance-efficient.",
      hints: [
        "IPS reweights observed outcomes to simulate what would happen under the target policy π.",
        "When the target policy π matches the behavior policy (how data was collected), IPS reduces to the sample mean.",
      ],
    },
    {
      id: "q-ci-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Athey & Wager (2021) showed that the problem of learning an optimal treatment policy from observational data can be reduced to a weighted classification problem. The key insight is:",
      options: [
        "The optimal policy can be found by running logistic regression on the observed outcomes",
        "Minimizing the policy regret E[Y(π*)] - E[Y(π)] is equivalent to a weighted binary classification with pseudo-outcomes as targets, where the weights account for CATE uncertainty; doubly-robust pseudo-outcomes enable efficient policy optimization",
        "The optimal policy is always the threshold policy π(x) = 1(x_1 > c) for some feature x_1 and cutoff c",
        "Policy optimization reduces to maximum likelihood estimation of the propensity score under the target policy",
      ],
      correctAnswer: 1,
      explanation:
        "Athey & Wager showed: maximizing E[Y(π(X))] - E[Y(0)] ≈ E[τ(X)·π(X)] = E[τ̃_i·π(X_i)] where τ̃_i are doubly-robust pseudo-outcomes for τ(X_i). This is a weighted classification problem: find π that maximizes Σ τ̃_i·1(π(X_i)=1), equivalent to classifying X_i into treatment when τ̃_i > 0. The doubly-robust pseudo-outcomes τ̃ are used as 'soft labels', and the problem is solvable with any weighted classification algorithm (SVM, trees, etc.).",
      hints: [
        "The reduction to classification is powerful: any classification algorithm becomes a policy learning algorithm.",
        "The pseudo-outcome τ̃_i approximates the individual treatment effect — positive means treatment is better for unit i.",
      ],
    },
  ],

  "causal-fairness": [
    {
      id: "q-ci-kp28-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Counterfactual fairness (Kusner et al. 2017) requires that a prediction Ŷ is fair with respect to a protected attribute A if:",
      options: [
        "The prediction accuracy is equal across groups defined by A",
        "P(Ŷ=y | X=x, A=a) = P(Ŷ=y | X=x, A=a') for all a, a' (demographic parity given X)",
        "P(Ŷ_{A←a}=y | X=x, A=a) = P(Ŷ_{A←a'}=y | X=x, A=a) — the prediction is the same in the factual and counterfactual world where A is set to a different value",
        "The protected attribute A is not used as a direct input to the prediction model",
      ],
      correctAnswer: 2,
      explanation:
        "Counterfactual fairness asks: if person x had belonged to a different demographic group (A=a' instead of A=a), all else being equal, would their predicted outcome have changed? Formally: P(Ŷ_{A←a} | X=x, A=a) = P(Ŷ_{A←a'} | X=x, A=a). This is a counterfactual (rung-3) criterion — it requires a causal model of how A influences the other features X. It avoids using features that are causally downstream of A (proxy discrimination).",
      hints: [
        "Removing A from the input doesn't guarantee counterfactual fairness if other features are caused by A (proxy discrimination).",
        "Computing counterfactual fairness requires knowing the causal graph relating A to other features and the outcome.",
      ],
    },
    {
      id: "q-ci-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Causal fairness criteria (like counterfactual fairness) resolve the tensions between different statistical fairness criteria (demographic parity, equal opportunity, individual fairness) by providing a unified framework.",
      correctAnswer: "False",
      explanation:
        "Different causal fairness criteria (counterfactual fairness, path-specific effects, no direct discrimination, etc.) can still be mutually contradictory. For example, blocking the direct effect of A on Ŷ while allowing indirect effects through legitimate mediators (like education) may conflict with counterfactual fairness. Different conceptions of what constitutes 'discrimination' (direct vs. indirect paths, legitimate vs. illegitimate mediators) lead to different criteria. Causal frameworks provide clarity but do not automatically resolve the fundamental normative tensions.",
      hints: [
        "Whether education is a 'legitimate' mediator of race on income is a normative, not statistical, question.",
        "Causal models formalize the question but the answer depends on what fairness means normatively.",
      ],
    },
    {
      id: "q-ci-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Path-specific counterfactual fairness distinguishes between 'legitimate' and 'illegitimate' causal pathways from the sensitive attribute A to the outcome Ŷ. The key idea is:",
      options: [
        "All causal pathways from A to Ŷ are blocked to ensure fairness",
        "Only the direct effect of A on Ŷ is blocked; indirect effects through mediators unrelated to discrimination are allowed",
        "Discrimination = the total effect of A on Ŷ minus the effect through designated 'legitimate' mediators; blocking only the illegitimate paths (e.g., direct discrimination or through illegitimate mediators like zip code as a proxy for race)",
        "The sensitive attribute A is allowed to influence Ŷ only through propensity-score matched comparisons",
      ],
      correctAnswer: 2,
      explanation:
        "Path-specific fairness (Nabi & Shpitser, 2018; Chiappa, 2019) formalizes discrimination as causal effects flowing through 'illegitimate' pathways: e.g., race directly affecting loan decisions, or race affecting decisions through zip code (proxy discrimination). Legitimate pathways (e.g., race → income → creditworthiness → loan, if income differences are considered 'legitimate') are permitted. Fairness requires blocking only the illegitimate paths in the potential outcome: E[Ŷ_{A=a, M_{illegit}=M_{illegit,a'}} | X] = E[Ŷ_{A=a'} | X] on illegal paths.",
      hints: [
        "Which paths are 'illegitimate' is a normative choice that must be specified by domain experts and policymakers.",
        "Path-specific effects require computing do-calculus expressions involving specific edges in the causal graph.",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
