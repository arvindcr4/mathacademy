import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-mlp-feature-store": [
    {
      id: "q-mlp-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A feature store has an offline store (data warehouse/data lake) and an online store (low-latency key-value store). What is the primary reason for this dual-store architecture rather than serving all features from the data warehouse directly?",
      options: [
        "The offline store can only store numerical features while the online store handles categorical features",
        "The offline store provides high-throughput historical data for training with point-in-time correctness, while the online store provides sub-millisecond feature retrieval for real-time inference",
        "The online store is a write-through cache of the offline store, used only for fault tolerance",
        "Data warehouses do not support SQL queries, so a key-value store is needed for feature lookup"
      ],
      correctAnswer: 1,
      explanation: "The offline store (e.g., S3 + Parquet, BigQuery) enables large-scale historical feature retrieval for training with point-in-time correctness — i.e., only using feature values that were available at the label timestamp, preventing data leakage. The online store (e.g., Redis, DynamoDB, Cassandra) serves the same features at p99 latencies under 10ms for live inference. Serving from a data warehouse directly would introduce seconds of latency per request, which is unacceptable for real-time ML systems. Feast, Tecton, and Hopsworks all implement this dual-store pattern.",
      hints: [
        "Think about the latency requirements: a model serving request needs features in <10ms, while a training job can wait minutes for a full dataset scan.",
        "Point-in-time correctness is specifically a property of the offline store — it ensures you don't accidentally use future feature values during training."
      ],
    },
    {
      id: "q-mlp-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is 'point-in-time correctness' in feature stores, and which concrete problem does it prevent?",
      options: [
        "It ensures features are computed at exactly the same time across all workers in distributed training, preventing race conditions",
        "It ensures that when generating a training example with label timestamp T, only feature values that existed at or before T are used — preventing future data leakage into the training set",
        "It ensures feature values are deduplicated so that multiple writes at the same timestamp are idempotent",
        "It ensures that the online store is updated within one second of the offline store, preventing stale feature serving"
      ],
      correctAnswer: 1,
      explanation: "Point-in-time correctness (also called point-in-time joins or time-travel joins) prevents label leakage. Suppose you have a user's transaction count feature that is updated daily, and your label is whether a transaction was fraudulent. If a training example has label timestamp Monday 9 AM but you accidentally use the feature value from Tuesday's batch update, the model learns from future information — this produces inflated offline metrics that completely collapse in production. Feast and Tecton implement point-in-time joins by maintaining historical snapshots of feature values and joining them to label timestamps using an as-of join (latest feature value at or before the label time).",
      hints: [
        "Ask: 'At the moment the transaction happened, what feature values were actually available to the model?' That is what point-in-time correctness guarantees.",
        "This is why naive joins on feature tables cause inflated offline AUC that doesn't reproduce in production."
      ],
    },
    {
      id: "q-mlp-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Training-serving skew occurs when the feature distribution at training time differs from the feature distribution at serving time. Which of the following is the MOST common root cause in production ML systems?",
      options: [
        "The model architecture is too small to generalize across the two distributions",
        "Features are computed differently in the batch training pipeline (e.g., Spark) versus the real-time serving path (e.g., Python microservice), leading to implementation divergence",
        "The model is always retrained on data that is more than 90 days old, causing distribution shift",
        "Online stores use different compression algorithms than offline stores, corrupting floating-point feature values"
      ],
      correctAnswer: 1,
      explanation: "The most pervasive cause of training-serving skew is code divergence between pipelines: feature X is computed using a Spark SQL job for training but re-implemented in a Python/Java service for serving. Any subtle difference — handling of nulls, edge cases in string normalization, rounding behavior, timezone handling — creates skew. The standard mitigation is to use a feature store where the same feature transformation code is registered once and materialized to both the offline and online stores (one definition, two materialization paths). Google's paper 'Hidden Technical Debt in ML Systems' explicitly calls this out as a major source of silent failures.",
      hints: [
        "If your training pipeline computes 'days since last login' differently from your serving microservice, every prediction is made on slightly wrong features.",
        "Feature stores like Feast and Tecton solve this by having a single feature definition that materializes to both stores."
      ],
    },
  ],

  "sdi-mlp-registry-tracking": [
    {
      id: "q-mlp-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In MLflow, what is the difference between a 'run' and a 'registered model'?",
      options: [
        "A run is the production model; a registered model is a development model under experimentation",
        "A run captures one execution of training code (parameters, metrics, artifacts); a registered model is a named entry in the model registry that links to specific runs and manages stage transitions like Staging and Production",
        "A run stores model weights; a registered model stores only hyperparameters and evaluation metrics",
        "Registered models are stored in cloud object storage; runs are stored only in local filesystem"
      ],
      correctAnswer: 1,
      explanation: "In MLflow, an experiment contains multiple runs. Each run is a single training execution that logs: parameters (hyperparameters), metrics (loss, accuracy over time), tags, and artifacts (model files, plots, data samples). The Model Registry is a separate concept — it is a catalog where you register a specific run's model artifact under a named model (e.g., 'fraud-detection'). The registry manages versions (v1, v2, v3) and stage transitions: None → Staging → Production → Archived. This separation lets you run hundreds of experiments but promote only the best ones to production with full audit trail.",
      hints: [
        "Think of a run as a lab notebook entry for one experiment, and the model registry as the official product catalog.",
        "MLflow model URI format: models:/fraud-detection/Production fetches the current production version."
      ],
    },
    {
      id: "q-mlp-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When transitioning a model from Staging to Production in a model registry, which set of checks should be enforced as gates before the transition is approved?",
      options: [
        "Only that the model file size is under 500MB to ensure fast serving startup",
        "Offline evaluation metrics exceed a threshold, data drift checks pass on recent data, model signature is validated, integration tests pass, and a human approval is recorded in the audit log",
        "The model was trained on data from the last 7 days and uses the same algorithm as the current production model",
        "The model registry version number is higher than the current production version"
      ],
      correctAnswer: 1,
      explanation: "A robust model promotion gate (as implemented by Uber Michelangelo, Google Vertex AI pipelines, and MLflow + CI/CD integrations) enforces multiple checks: (1) offline metrics above a minimum threshold (e.g., AUC > 0.85), (2) comparison against the current champion model on a held-out validation set, (3) data drift checks ensuring the validation set distribution matches recent production traffic, (4) model signature validation ensuring input/output schemas match the serving API, (5) integration tests against the serving infrastructure, and (6) a recorded human approval for compliance. Automated transitions without these gates are a major source of production incidents in ML systems.",
      hints: [
        "Model promotion is analogous to a software release: you need automated tests + human review before shipping.",
        "Shadow mode testing (running new model in parallel before promotion) is also recommended but typically happens before the formal registry transition."
      ],
    },
    {
      id: "q-mlp-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An ML engineer uses MLflow to track experiments. They log parameters, metrics, and save model artifacts to S3. Six months later, they need to exactly reproduce a specific run's results. What information stored in MLflow is most critical for reproducibility, beyond just the model weights?",
      options: [
        "The exact wall-clock timestamp of when the run was executed and the experimenter's username",
        "The Git commit hash of the training code, the dataset version (or a pointer to the training data snapshot), and the full set of logged hyperparameters",
        "The MLflow tracking server hostname and database connection string",
        "The Python version and operating system where the model was originally trained"
      ],
      correctAnswer: 1,
      explanation: "True ML reproducibility requires three things beyond model weights: (1) exact code state — captured via the Git commit hash that MLflow logs automatically when using mlflow.log_param or mlflow projects; (2) exact data — either the data hash/version (DVC pointer, S3 path with version ID) or a snapshot; and (3) exact hyperparameters — the full set of logged params. Without the code commit, you cannot reproduce the preprocessing logic. Without the data version, you may train on a different dataset. MLflow Projects extends this by packaging code + environment (conda.yaml or requirements.txt) together with the run, making the entire experiment portable and reproducible.",
      hints: [
        "If you only save model weights, you cannot verify that running the same training code on the same data produces the same model.",
        "DVC (Data Version Control) is often paired with MLflow: DVC versions data, MLflow versions experiments."
      ],
    },
  ],

  "sdi-mlp-distributed-training": [
    {
      id: "q-mlp-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Kubeflow Pipelines and Argo Workflows are both used for ML training orchestration on Kubernetes. What is the fundamental architectural difference between them?",
      options: [
        "Kubeflow Pipelines is designed for batch jobs only; Argo Workflows supports both batch and streaming workloads",
        "Kubeflow Pipelines is ML-specific with a Python DSL, pipeline versioning, artifact lineage, and a UI for ML experiments; Argo Workflows is a general-purpose workflow engine using YAML DAGs that Kubeflow Pipelines uses as its execution backend",
        "Argo Workflows requires GPUs for all steps; Kubeflow Pipelines can run on CPU clusters",
        "Kubeflow Pipelines stores all artifacts in etcd; Argo Workflows uses a PostgreSQL backend"
      ],
      correctAnswer: 1,
      explanation: "Argo Workflows is a general-purpose Kubernetes-native workflow engine: you define DAGs as YAML manifests, and Argo runs each step as a container. Kubeflow Pipelines (KFP) is built on top of Argo Workflows (v1) or its own Argo-compatible runner (v2) but adds ML-specific abstractions: a Python SDK for defining pipelines as code, automatic artifact tracking and lineage, a UI for visualizing runs and comparing metrics, integration with the model registry, and versioned pipeline definitions. In practice, KFP v2 moved to a Kubernetes-native IR (intermediate representation) and can run on multiple backends including Vertex AI Pipelines. Argo is the lower-level primitive; KFP is the higher-level ML-opinionated layer.",
      hints: [
        "Think of Argo as the execution engine and Kubeflow Pipelines as the ML-specific orchestration framework built on top of it.",
        "KFP's Python SDK lets you annotate functions with @component and @pipeline decorators, generating the underlying Argo YAML automatically."
      ],
    },
    {
      id: "q-mlp-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In distributed data-parallel training with PyTorch DDP across 8 GPUs, what is AllReduce and why is it the communication bottleneck at large scale?",
      options: [
        "AllReduce is the operation that loads sharded dataset chunks onto each GPU; it bottlenecks when the dataset is stored on slow network-attached storage",
        "AllReduce is a collective operation that sums gradients across all workers so each worker has the same averaged gradient; at large scale, the communication volume grows linearly with parameter count and inversely with network bandwidth, making it the dominant cost for large models",
        "AllReduce is a memory allocation routine that pre-allocates GPU VRAM; it bottlenecks when models have more parameters than available VRAM",
        "AllReduce is a fault-tolerance checkpoint that saves model state to a distributed file system after each gradient step"
      ],
      correctAnswer: 1,
      explanation: "In synchronous data-parallel training, each GPU processes a different mini-batch and computes local gradients. Before the optimizer step, all GPUs must synchronize: each GPU needs the sum (or average) of gradients across all workers. AllReduce achieves this in O(N * params * 2 * (1 - 1/N)) communication volume using ring-AllReduce (NCCL). For a 7B parameter model with float32 gradients, that is ~28GB of gradient data per AllReduce call. With 8 GPUs on a 100Gbps interconnect, each AllReduce call takes ~2 seconds — dominating compute time. This is why large-scale training favors: (a) gradient compression, (b) model parallelism to reduce per-GPU parameter count, (c) high-bandwidth interconnects (NVLink, InfiniBand), and (d) mixed precision training to halve gradient size.",
      hints: [
        "Ring-AllReduce is bandwidth-optimal but still requires sending 2*(N-1)/N * params bytes per worker.",
        "Facebook's paper on ImageNet in 1 hour and Google's GShard both address AllReduce bottlenecks at scale."
      ],
    },
    {
      id: "q-mlp-9",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Ray Train is used for distributed ML training. What does Ray's 'placement group' feature provide that is essential for GPU gang scheduling in ML workloads?",
      options: [
        "Placement groups enforce geographic co-location of Ray workers in the same AWS availability zone for lower network latency",
        "Placement groups atomically reserve a bundle of resources (e.g., 8 GPUs across 2 nodes) so that training starts only when all required GPUs are simultaneously available, preventing partial resource allocation",
        "Placement groups allow Ray actors to share GPU memory across workers via CUDA unified virtual addressing",
        "Placement groups define priority tiers for preemption — high-priority placement groups cannot be preempted by lower-priority jobs"
      ],
      correctAnswer: 1,
      explanation: "Gang scheduling is the requirement that all workers in a distributed training job start simultaneously — partial starts waste resources (idle GPUs waiting for others) and create deadlocks (a job holding half the GPUs blocks other jobs from starting). Ray's placement groups solve this: you declare a bundle (e.g., [{GPU: 4, CPU: 16}, {GPU: 4, CPU: 16}] across 2 nodes) and Ray atomically reserves these resources before starting any actor. If not all resources are available, the entire group waits — no partial allocation. This is the same problem Kubernetes solves with gang-scheduling plugins like Volcano and Koordinator, and YARN solves with gang scheduling policies for Spark.",
      hints: [
        "Without gang scheduling, a job requesting 8 GPUs on a busy cluster might grab 4 GPUs and sit blocked indefinitely, starving other jobs that need exactly 4 GPUs.",
        "Kubernetes does not natively support gang scheduling — frameworks like Kubeflow, Volcano, or Ray add this capability."
      ],
    },
  ],

  "sdi-mlp-hyperparam-opt": [
    {
      id: "q-mlp-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Optuna uses Tree-structured Parzen Estimator (TPE) as its default hyperparameter optimization algorithm. Why does TPE outperform random search for most ML hyperparameter tuning tasks?",
      options: [
        "TPE evaluates all hyperparameter combinations simultaneously using parallelized grid search, making it faster than sequential random search",
        "TPE builds probabilistic models of the objective function to propose hyperparameters likely to improve on the current best, balancing exploration of the search space and exploitation of promising regions — unlike random search which samples uniformly without learning from past trials",
        "TPE uses gradient information from the model loss to directly compute the optimal learning rate, bypassing the need for multiple trials",
        "TPE enumerates all hyperparameter combinations in order of theoretical importance, starting with the hyperparameters with the highest Sobol sensitivity index"
      ],
      correctAnswer: 1,
      explanation: "Random search samples uniformly from the hyperparameter space without using information from previous trials. TPE (and other Bayesian optimization methods) maintain a surrogate model: they model P(x|y < y*) and P(x|y >= y*) — the distributions of hyperparameters that produced good results vs. poor results — and use the ratio to select the next candidate. This 'learn from history' approach converges to good hyperparameters much faster than random search, especially in high-dimensional spaces. Optuna also supports pruning (Hyperband/ASHA) — early termination of clearly bad trials — further reducing the number of full training runs needed. Studies at Preferred Networks show TPE finding solutions competitive with extensive grid search using 5-10x fewer trials.",
      hints: [
        "Bayesian optimization's key insight: use previous (hyperparams, metric) pairs to build a cheap surrogate model, then optimize the surrogate instead of running expensive training each time.",
        "Optuna's ask-and-tell API lets you integrate its sampler with any training framework."
      ],
    },
    {
      id: "q-mlp-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Hyperband is a bandit-based hyperparameter optimization algorithm. What is its key insight over standard early stopping?",
      options: [
        "Hyperband uses a neural architecture search to find the optimal model structure before hyperparameter tuning begins",
        "Hyperband runs many configurations for a small budget (few epochs) and progressively promotes only the top fraction to larger budgets through successive halving brackets, achieving near-optimal allocation without assuming which configurations will ultimately converge best",
        "Hyperband parallelizes all hyperparameter trials across all available GPUs simultaneously, then selects the best after all trials complete",
        "Hyperband uses the validation loss gradient to predict final performance from early training dynamics, stopping configurations whose gradient flattens below a threshold"
      ],
      correctAnswer: 1,
      explanation: "Standard early stopping uses a fixed patience threshold and stops when validation loss stops improving. Hyperband (Li et al., 2017) addresses the explore-exploit tradeoff more systematically via 'successive halving': it starts n configurations with budget B/n (few training steps), discards the bottom 50%, promotes the survivors with doubled budget, and repeats. To handle uncertainty about the right n vs. B tradeoff, Hyperband runs multiple successive halving brackets with different starting n values. This ensures that both 'run many configs briefly' and 'run few configs to completion' strategies are tried. ASHA (Asynchronous Successive Halving) extends this to asynchronous distributed settings — used in Ray Tune, Optuna, and AWS SageMaker HPO.",
      hints: [
        "Hyperband's key question: given a fixed total compute budget, how should you allocate it across many configurations vs. running each longer?",
        "Successive halving is the core primitive: start with n configs, keep top 1/eta after eta-fold more budget, repeat."
      ],
    },
  ],

  "sdi-mlp-model-serving": [
    {
      id: "q-mlp-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A model serving system using NVIDIA Triton Inference Server receives 1,000 requests per second, each requiring 5ms of GPU compute. Why does dynamic batching significantly improve GPU utilization compared to per-request inference?",
      options: [
        "Dynamic batching reduces model size by quantizing weights to INT8 before each inference call",
        "Dynamic batching accumulates multiple requests within a configurable time window and runs them as a single batched GPU kernel, amortizing kernel launch overhead and maximizing GPU tensor core utilization — GPU utilization approaches 100% vs ~10-20% for single-request inference",
        "Dynamic batching caches the KV attention states from previous requests to skip recomputation for repeated inputs",
        "Dynamic batching offloads preprocessing from GPU to CPU workers, freeing GPU cycles for pure matrix multiplication"
      ],
      correctAnswer: 1,
      explanation: "GPUs are throughput devices: they achieve peak efficiency when processing large matrices in parallel. A single request inference call wastes most of the GPU — the tensor cores sit idle while memory bandwidth is saturated by a tiny batch. With dynamic batching in Triton, requests arriving within a configurable window (e.g., 1ms) are queued and dispatched as a single batch (e.g., batch size 32-128). The same GPU compute that took 5ms for 1 request now takes 5-8ms for 64 requests — nearly 64x throughput improvement. Triton also supports preferred batch sizes and max queue delay settings. This is why DoorDash, Uber, and Netflix batch ML inference requests — it is the highest-ROI optimization for reducing GPU count at equivalent QPS.",
      hints: [
        "A GPU running 1 sample at a time is like a factory line processing 1 unit at a time — throughput is terrible even though each unit finishes quickly.",
        "Dynamic batching is distinct from static batching (where the client must submit full batches): Triton handles batching server-side, transparently to clients."
      ],
    },
    {
      id: "q-mlp-13",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Your team deploys a new recommendation model in shadow mode. What does shadow mode mean, and what production risk does it mitigate that canary deployment alone does not fully address?",
      options: [
        "Shadow mode means the model is deployed only to users in non-production geographic regions; canary deployment targets only paying users",
        "Shadow mode mirrors live production traffic to the new model and logs its predictions without affecting user experience — it validates model correctness and latency under real traffic patterns before any users are exposed, while canary deployment exposes a small real user segment to potential degradation",
        "Shadow mode uses a lightweight distilled version of the model for inference; canary uses the full model on a small traffic slice",
        "Shadow mode runs the model on synthetic test traffic; canary runs on real traffic but at reduced QPS"
      ],
      correctAnswer: 1,
      explanation: "Shadow deployment (traffic mirroring / dark launch) duplicates every incoming request to both the production model and the new challenger model. The challenger's responses are discarded (not served to users) but logged for offline analysis. This lets you validate: latency distribution under real production load, memory consumption at real QPS, prediction correctness on production feature distributions, and error rates — all with zero risk to user experience. Canary deployment sends a small fraction of real traffic to the new model and does expose those users to potential issues (errors, degraded experience). Shadow mode is preferred when the new model has untested serving performance characteristics or when the stakes of a bad prediction are high (credit scoring, medical).",
      hints: [
        "Shadow mode answers: 'Does the new model behave correctly on real production requests?' without risking any user's experience.",
        "Canary answers: 'What is the business/metric impact of the new model?' — which requires actual user exposure."
      ],
    },
    {
      id: "q-mlp-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A canary deployment for an ML model is configured to route 5% of traffic to the new model version. What rollback criteria should trigger an automatic revert to the previous version?",
      options: [
        "The new model version receives fewer than 5% of all requests due to load balancer routing inconsistencies",
        "Error rate exceeds a threshold (e.g., >1% 5xx errors), p99 serving latency exceeds SLA (e.g., >200ms), business metrics degrade (e.g., CTR drops >5% relative), or data quality alerts fire (e.g., >10% null predictions) — any of which auto-triggers revert via the deployment controller",
          "The model file size is larger than the previous version, consuming more memory per serving pod",
          "The canary model produces predictions with a different score distribution than the champion, regardless of downstream business impact"
      ],
      correctAnswer: 1,
      explanation: "Automated rollback in ML canary deployments (as implemented by Uber Michelangelo, Netflix Metaflow, and Seldon Core) is triggered by a combination of infrastructure health metrics and business metrics: (1) serving health: elevated error rates, p99 latency SLA breaches, memory OOM events; (2) prediction health: high null/NaN rate, prediction distribution collapse, out-of-range scores; (3) business metrics: statistically significant degradation in CTR, conversion rate, or revenue per user. The key challenge is that business metrics require time to accumulate statistical significance (minutes to hours depending on traffic), so serving health metrics serve as fast-fail signals while business metrics confirm the decision. Systems like Flagger, Argo Rollouts, and Seldon's ProgressiveRollout can automate this analysis.",
      hints: [
        "Rollback triggers should be a hierarchy: fast (error rate), medium (latency, prediction health), slow (business metrics).",
        "A model that produces 0.5 for every prediction has no serving errors but catastrophically wrong business metrics — both signal types are necessary."
      ],
    },
  ],

  "sdi-mlp-ab-testing": [
    {
      id: "q-mlp-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In an online A/B test for an ML model, why is user-level randomization preferred over request-level randomization for most product experiments?",
      options: [
        "Request-level randomization is computationally more expensive because it requires a hash computation on every API call",
        "User-level randomization ensures each user consistently sees either the control or treatment, preventing within-user contamination and enabling accurate measurement of user-centric metrics like retention and LTV; request-level randomization causes the same user to experience both variants, violating the stable unit treatment value assumption (SUTVA)",
        "Request-level randomization requires storing experiment assignments in a database, which adds latency to every request",
        "User-level randomization is required by GDPR because users must consent to being in a specific experiment group"
      ],
      correctAnswer: 1,
      explanation: "The stable unit treatment value assumption (SUTVA) in causal inference requires that a unit's (user's) outcome is only affected by their own treatment assignment, not by others'. Request-level randomization violates this: user A sees the control model on request 1 and the treatment model on request 2, creating a confounded experience. Beyond SUTVA, user-centric metrics (DAU, D7 retention, session length) require consistent assignment to measure correctly. User-level assignment is typically implemented via a hash of (user_id, experiment_id) that deterministically maps each user to a bucket. Holdout groups are a special case: a percentage of users are permanently excluded from all experiments to measure long-term baseline drift (used by Airbnb, Netflix, and LinkedIn).",
      hints: [
        "If a user sees both versions of a recommender in alternating requests, their engagement metrics reflect neither variant cleanly.",
        "Consistent assignment also makes debugging easier: you can reproduce a user's experience by replaying their requests."
      ],
    },
    {
      id: "q-mlp-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "You are running an A/B test comparing a new recommendation model against the current champion. After 3 days, the treatment group shows a 2% lift in CTR with p-value = 0.04. A stakeholder wants to ship immediately. What is the primary statistical concern?",
      options: [
        "The p-value of 0.04 is above the industry standard threshold of 0.01, so the result is not statistically significant",
        "Peeking at results before the pre-specified sample size is reached inflates the Type I error rate — stopping early when p < 0.05 means the true false positive rate is much higher than 5%, and the observed 2% lift may be noise",
        "3 days is too long; A/B tests must complete within 24 hours to avoid novelty effects biasing treatment group engagement",
        "The 2% CTR lift is below the minimum detectable effect of 5% that was pre-specified for this experiment"
      ],
      correctAnswer: 1,
      explanation: "This is the 'peeking problem' or optional stopping problem. If you continuously monitor a fixed-sample test and stop as soon as p < 0.05, the effective false positive rate is much higher — Johari et al. (2017) showed that checking a test daily for 5 days inflates the false positive rate from 5% to ~23%. The experiment was not pre-powered for 3 days; the minimum detectable effect calculation assumed a specific sample size corresponding to a longer run period. Solutions include: (1) pre-register the stopping rule and sample size, (2) use sequential testing methods (always-valid p-values via mSPRT, e-values) as used by Airbnb and LinkedIn, or (3) use Bayesian A/B testing where interim looks do not inflate error rates. Shipping at p=0.04 after 3 days of peeking likely means this is a false positive.",
      hints: [
        "The 5% significance threshold is only valid if you look exactly once at the pre-specified sample size.",
        "Airbnb's CUPED and LinkedIn's sequential testing infrastructure are purpose-built to handle the peeking problem in high-velocity experimentation."
      ],
    },
    {
      id: "q-mlp-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When should you use a multi-armed bandit instead of a traditional A/B test for ML model selection?",
      options: [
        "Always — multi-armed bandits are strictly superior to A/B tests because they never assign users to the losing variant",
        "When minimizing regret during the experiment matters (i.e., you want to dynamically shift traffic toward better-performing variants in real time) and you are willing to trade statistical causal inference power for faster convergence and lower opportunity cost",
        "When your experiment has more than 2 variants, because A/B tests only support binary comparisons",
        "When your business metric is latency-sensitive, because bandits can adapt to response time differences while A/B tests cannot"
      ],
      correctAnswer: 1,
      explanation: "A/B tests fix traffic allocation (e.g., 50/50) for the duration of the experiment to maximize statistical power for causal inference. Multi-armed bandits (Thompson sampling, UCB, Epsilon-greedy) dynamically adjust traffic allocation toward better-performing arms, minimizing cumulative regret (lost value from serving the suboptimal variant). Bandits are preferred when: (1) exploration is costly (medical trials, high-stakes recommendations), (2) the decision horizon is short (seasonal promotions), or (3) the environment is non-stationary. However, bandits sacrifice statistical rigor: they do not produce valid confidence intervals or p-values because allocation is adaptive. Systems like Google's Vizier, Airbnb, and Netflix use contextual bandits (where arm selection is conditioned on user context) for personalization rather than pure A/B testing.",
      hints: [
        "A/B tests ask 'Is A better than B?' with statistical guarantees; bandits ask 'How do I maximize total reward while learning?' — different questions.",
        "Thompson sampling maintains a Beta distribution over each arm's true reward probability and samples from it to make allocation decisions."
      ],
    },
  ],

  "sdi-mlp-data-validation": [
    {
      id: "q-mlp-18",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Great Expectations is used for data validation in ML pipelines. What does a 'data quality suite' test, and how does it integrate with pipeline orchestration?",
      options: [
        "A data quality suite tests model prediction accuracy against ground truth labels; it is integrated as a post-deployment monitoring step",
        "A data quality suite is a collection of expectations (assertions about data properties — non-null, within-range, matching a distribution) that run against a batch of data and fail the pipeline if expectations are violated, preventing bad data from reaching model training or serving",
        "A data quality suite validates that the Spark schema matches the Avro schema in the schema registry, blocking schema evolution that breaks downstream consumers",
        "A data quality suite measures data pipeline latency and SLA compliance, alerting when batch jobs exceed their expected runtime"
      ],
      correctAnswer: 1,
      explanation: "Great Expectations (GX) lets data engineers define 'expectations' — assertions like expect_column_values_to_not_be_null, expect_column_mean_to_be_between, expect_column_values_to_match_regex — and group them into 'expectation suites'. When a GX checkpoint runs (integrated into Airflow, Prefect, dbt, or custom pipelines), it validates a data batch against the suite and generates a data quality report. If critical expectations fail, the pipeline is blocked — preventing downstream model training on corrupted data. GX also auto-generates documentation and data quality dashboards. At DoorDash and Lyft, GX suites gate every batch feature computation job, ensuring that training data quality is validated before features are materialized to the offline store.",
      hints: [
        "Think of expectations as unit tests for your data: they codify assumptions that must hold for the model to train correctly.",
        "GX supports profiling a reference dataset to auto-generate a baseline expectation suite — a starting point for data quality monitoring."
      ],
    },
    {
      id: "q-mlp-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A streaming feature pipeline computes real-time features using Apache Flink, while a batch pipeline computes the same features using Apache Spark for training data. What architectural pattern eliminates the code duplication risk between these two paths?",
      options: [
        "Running Spark in streaming mode (Structured Streaming) to replace the Flink job, so there is only one codebase",
        "Using the Lambda architecture: the batch layer provides accurate historical features while the streaming layer provides approximate real-time features, with a serving layer merging both",
        "Defining feature transformations once in a feature platform (e.g., Tecton, Chronon) that auto-generates both the Flink streaming job and the Spark batch job from a single feature definition, ensuring parity",
        "Replacing both pipelines with a single Redis Streams consumer that computes features on arrival and stores them directly in the online store"
      ],
      correctAnswer: 2,
      explanation: "The core problem is maintaining two separate implementations of the same feature logic — one in Flink (Scala/Java) and one in Spark (Python/Scala) — which inevitably diverge. Modern feature platforms like Tecton, Chronon (DoorDash's open-sourced framework), and Feathr (LinkedIn) solve this with a single feature definition language (Python DSL) that compiles down to both Flink streaming jobs and Spark batch jobs. A single source of truth eliminates training-serving skew from code divergence. Tecton calls this 'materialization jobs' — the platform manages the execution backends while the data scientist writes feature logic once. This is the Kappa-like architecture where the same transformation logic handles both real-time and batch paths.",
      hints: [
        "Chronon was open-sourced by DoorDash specifically to solve the batch-streaming feature computation parity problem.",
        "The anti-pattern is: ML scientist writes Python feature code, data engineer re-implements it in Scala Flink — divergence is inevitable."
      ],
    },
  ],

  "sdi-mlp-monitoring": [
    {
      id: "q-mlp-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You are monitoring a production ML model for data drift. You use Population Stability Index (PSI) to compare the distribution of a feature between a reference window and a current window. A PSI of 0.28 is observed. What does this indicate and what action should be taken?",
      options: [
        "PSI of 0.28 indicates negligible drift (PSI < 0.1 is the concern threshold); no action needed",
        "PSI of 0.28 indicates significant distribution shift (PSI > 0.25 is the severe drift threshold); trigger investigation, potentially retrain the model on more recent data, and check upstream data pipelines for anomalies",
        "PSI of 0.28 indicates moderate drift; automatically roll back to the previous model version",
        "PSI measures model accuracy, not feature distribution; 0.28 indicates 72% accuracy which is within acceptable bounds"
      ],
      correctAnswer: 1,
      explanation: "PSI = sum((Actual% - Expected%) * ln(Actual% / Expected%)) measures the divergence between a reference distribution and a monitoring window distribution. Industry thresholds: PSI < 0.1 = negligible change; 0.1-0.25 = moderate change (review); > 0.25 = significant shift (action required). A PSI of 0.28 means the feature distribution has changed substantially from training time, which likely degrades model performance even before accuracy metrics confirm it (since ground truth labels often arrive with delay). Actions: (1) investigate the feature's upstream data pipeline for bugs or source changes, (2) check if this is a legitimate distributional change (seasonality, product change) or a data quality issue, (3) trigger retraining on more recent data if the shift is real. PSI is used by Fiddler, Arize, and WhyLabs for drift monitoring.",
      hints: [
        "PSI > 0.25 is the credit risk industry's threshold for 'the model needs revalidation' — adopted broadly in ML monitoring.",
        "PSI is asymmetric: compute it in both directions if you need a symmetric metric. KL divergence is the underlying foundation."
      ],
    },
    {
      id: "q-mlp-21",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is concept drift in ML, and how does it differ from data drift? Give a concrete example of each in a fraud detection context.",
      options: [
        "Concept drift and data drift are synonymous — both refer to changes in the input feature distribution over time",
        "Data drift is a change in P(X) — the input feature distribution shifts (e.g., average transaction amount increases due to inflation); concept drift is a change in P(Y|X) — the relationship between features and the target changes (e.g., fraudsters adopt new patterns that map the same features to different fraud probability)",
        "Data drift refers to missing values increasing in the dataset; concept drift refers to the model's decision boundary shifting due to adversarial attacks on input features",
        "Data drift is detected using statistical tests (KS test, PSI); concept drift can only be detected by human domain experts reviewing prediction logs"
      ],
      correctAnswer: 1,
      explanation: "Data drift (covariate shift): P(X) changes but P(Y|X) stays the same. Example: post-pandemic, average transaction amounts increased 30% across all users — the feature distribution shifted, but if a $500 transaction was risky before, it is still risky now. This can often be handled by retraining without changing the model architecture. Concept drift: P(Y|X) changes — the ground truth relationship between features and label changes. Example: fraudsters change tactics — they now use small transactions ($1-5) to test stolen cards before large purchases, whereas before only large transactions were suspicious. The same feature values now map to a different fraud probability. Concept drift is harder to detect because it requires ground truth labels (which arrive with delay in fraud). Monitoring the model's calibration (predicted vs. actual fraud rate by score bucket) is the most effective early signal of concept drift.",
      hints: [
        "Data drift: the inputs look different. Concept drift: the meaning of the inputs changes — same X, different Y.",
        "In fraud, concept drift is adversarial: fraudsters actively change behavior in response to model improvements."
      ],
    },
  ],

  "sdi-mlp-metadata-lineage": [
    {
      id: "q-mlp-22",
      type: "multiple-choice",
      difficulty: "medium",
      question: "ML Metadata (MLMD) is Google's open-source metadata store used by TFX and Kubeflow. What are the three core entities it tracks, and why is lineage tracking critical for debugging production model failures?",
      options: [
        "MLMD tracks hyperparameters, model accuracy, and deployment timestamps; lineage is critical for billing and cost attribution",
        "MLMD tracks Artifacts (data and model files), Executions (pipeline component runs), and Contexts (logical groupings like a pipeline run); lineage lets you trace a production model failure back to the exact training data version, preprocessing step output, and code version that produced it",
        "MLMD tracks database schema versions, API contract changes, and infrastructure configuration; lineage is critical for compliance with data retention policies",
        "MLMD tracks GPU utilization, memory consumption, and training throughput; lineage is critical for capacity planning and cost optimization"
      ],
      correctAnswer: 1,
      explanation: "MLMD's three entity types form a complete provenance graph: (1) Artifacts — typed metadata records for files/objects (datasets, schema, model files, evaluation results) with URIs pointing to actual storage; (2) Executions — records of component runs (TrainStep, EvalStep) with input/output artifact links and runtime properties; (3) Contexts — named groupings (a pipeline run ID, an experiment) that collect related executions. Together they form a DAG: raw data → processed features → trained model → evaluated model. When a production model suddenly degrades, lineage lets you answer: 'Which training dataset was used? Which preprocessing version? Which evaluation threshold was applied?' — enabling root cause analysis in minutes instead of days. This is also required for ML model auditability under regulations like GDPR Article 22 and the EU AI Act.",
      hints: [
        "Without lineage, debugging a production model failure means manual archeology across disparate systems: S3 logs, training job logs, code repos.",
        "MLMD is the metadata layer; the actual artifacts (model files, datasets) live in separate storage — MLMD just tracks their locations and relationships."
      ],
    },
  ],

  "sdi-mlp-embedding-serving": [
    {
      id: "q-mlp-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A recommendation system needs to serve embedding-based retrieval with a catalog of 100 million items. Why is approximate nearest neighbor (ANN) search preferred over exact nearest neighbor, and what are the tradeoffs of using FAISS vs. ScaNN?",
      options: [
        "ANN is preferred because exact nearest neighbor requires sorting all 100M items, which is O(N log N); ANN achieves O(log N) by using hash tables. FAISS is CPU-only; ScaNN is GPU-only.",
        "ANN is preferred because exact nearest neighbor over 100M 128-dim embeddings takes seconds per query (too slow for real-time serving); ANN uses indexing structures (IVF, HNSW, PQ) to achieve sub-10ms retrieval at >95% recall. FAISS (Facebook) excels on CPU with GPU support and broad index types; ScaNN (Google) achieves higher throughput on CPU via hardware-specific SIMD optimizations and anisotropic quantization, often outperforming FAISS on recall@k benchmarks",
        "ANN is preferred for privacy: it never returns the exact nearest neighbor so user queries cannot be reverse-engineered. FAISS uses L2 distance; ScaNN uses cosine similarity only.",
        "ANN is used only when the embedding dimension exceeds 1024; for smaller dimensions, exact nearest neighbor is fast enough. FAISS and ScaNN are identical in performance."
      ],
      correctAnswer: 1,
      explanation: "Exact nearest neighbor over 100M items requires computing 100M dot products per query: at 128 dimensions, that is ~12.8 billion FLOPs — taking ~500ms on a modern CPU. ANN indexes trade a small amount of recall (e.g., 95% recall@100) for orders-of-magnitude speedup. FAISS (Facebook AI Similarity Search) supports IVF (inverted file index), HNSW (hierarchical navigable small world graphs), and PQ (product quantization) with both CPU and GPU execution. ScaNN (Google's Scalable Nearest Neighbors) uses anisotropic quantization that penalizes quantization error in the direction of maximum variance, achieving higher recall at equivalent speed on CPU benchmarks. In practice, Spotify (Annoy), Pinterest (FAISS), and Google (ScaNN) each made different tradeoffs based on their serving infrastructure and recall requirements.",
      hints: [
        "The recall-latency-memory tradeoff is the central design space for ANN: HNSW has high recall but high memory; IVF+PQ has lower memory but requires careful parameter tuning.",
        "Caching the top-K results for the most popular query embeddings (e.g., trending items) can reduce ANN load by 30-50% in real recommendation systems."
      ],
    },
  ],

  "sdi-mlp-model-compression": [
    {
      id: "q-mlp-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A team needs to deploy a BERT-large model (340M parameters) for real-time inference with p99 latency under 50ms. Which combination of model compression techniques is most likely to achieve this goal while maintaining >95% of original accuracy?",
      options: [
        "Apply L1 regularization during retraining to sparsify weights, then export to ONNX format for serving — no other changes needed",
        "Apply knowledge distillation to train a smaller student model (e.g., DistilBERT or a 6-layer BERT) on the teacher's soft labels, then apply INT8 post-training quantization on the distilled model, achieving 4-6x inference speedup with <5% accuracy drop",
        "Increase batch size to 512 and use FP16 mixed precision training — this alone reduces latency from 200ms to 50ms without any model changes",
        "Apply weight pruning at 90% sparsity, then use sparse matrix operations in CUDA to skip zero-weight multiplications"
      ],
      correctAnswer: 1,
      explanation: "BERT-large at p99 < 50ms requires fundamental model size reduction. The most proven pipeline: (1) Knowledge distillation: Hugging Face DistilBERT retains 97% of BERT-base performance with 40% fewer parameters by training on teacher soft probabilities — for BERT-large, distilling to a 6-layer model gives 2-3x speedup. (2) INT8 post-training quantization (PTQ): converts FP32 weights to INT8, giving another 2-4x speedup on CPU (via ONNX Runtime or TensorRT) with 1-2% accuracy loss on most NLP tasks. Combined, distillation + quantization typically achieves 4-8x speedup. Pruning at 90% sparsity is theoretically attractive but sparse CUDA kernels are not efficient below ~95% sparsity on current hardware — the acceleration is rarely realized in practice. This pipeline is used by Hugging Face Optimum, Intel's Neural Compressor, and Twitter's NLP serving infrastructure.",
      hints: [
        "Distillation reduces the model architecture; quantization reduces the numerical precision — they are complementary and stack multiplicatively.",
        "Post-training quantization requires a calibration dataset (100-1000 representative samples) to determine activation quantization ranges without full retraining."
      ],
    },
  ],

  "sdi-mlp-feedback-privacy": [
    {
      id: "q-mlp-25",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A recommendation system uses implicit feedback (clicks, watch time) to label training data. What are the three main sources of bias introduced by implicit feedback, and how does survivorship bias specifically affect model training?",
      options: [
        "The three biases are recency bias (recent items are over-represented), popularity bias (popular items are over-recommended), and cold start bias (new items have no engagement data). Survivorship bias causes the model to overfit to highly active users.",
        "The three biases are position bias (items shown higher get more clicks regardless of quality), selection bias (only shown items can receive feedback — unshown items appear as implicit negatives), and label delay bias (engagement signals arrive hours/days after serving, creating temporal inconsistency). Survivorship bias specifically means the model only learns from items that were served and clicked — items that were never shown due to low initial scores are never corrected even if they would have been clicked, creating a self-reinforcing popularity loop.",
        "The three biases are confirmation bias (the model reinforces existing user preferences), automation bias (users click on anything the model recommends regardless of quality), and annotation bias (human labelers prefer mainstream content). Survivorship bias causes users who dislike recommendations to leave the platform, removing negative feedback.",
        "Implicit feedback has no inherent bias — it is just a noisy version of explicit ratings. The three main challenges are data volume, label noise, and class imbalance, not bias."
      ],
      correctAnswer: 1,
      explanation: "Position bias: items ranked at position 1 receive 2-3x more clicks than position 5 regardless of relevance — clicks measure position exposure, not true preference. This is addressed with Inverse Propensity Scoring (IPS) during training, weighting each sample by 1/P(shown at position k). Selection bias: the training set only contains items that were served; unserved items have no signal, so the model cannot learn that it is systematically under-serving certain categories. Addressed with explore-exploit (epsilon-greedy, bandits) to occasionally serve random items. Survivorship bias in feedback: the model is evaluated and retrained only on users who stayed — users who churned because of bad recommendations leave no corrective signal, causing the model to systematically ignore the preferences of users sensitive to recommendation quality. Addressing this requires retention-weighted loss functions or periodic cohort analysis including churned users.",
      hints: [
        "Position bias is the most studied: Yahoo's click models and Joachims et al.'s work on unbiased learning-to-rank are the foundational references.",
        "The self-reinforcing loop from selection bias is why recommendation systems tend to converge on popular content over time without explicit diversity interventions."
      ],
    },
    {
      id: "q-mlp-26",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A company wants to train a model on user data from mobile devices without centralizing raw data on servers. They implement federated learning. What is the key infrastructure challenge that makes federated learning difficult to deploy at scale compared to centralized training?",
      options: [
        "Federated learning requires all devices to have identical model architectures, which is impossible because different device manufacturers use different hardware",
        "Federated learning must handle massively non-IID data (each device has a highly biased local dataset), intermittent device availability (devices only participate when charging and on WiFi), heterogeneous compute (varying device speeds causing straggler problems), and communication efficiency (gradient updates must be compressed for mobile network upload bandwidth constraints)",
        "Federated learning is slower than centralized training because all gradient computations occur on CPU-only mobile devices rather than datacenter GPUs",
        "Federated learning requires end-to-end encryption of model weights, which triples computation time due to homomorphic encryption overhead"
      ],
      correctAnswer: 1,
      explanation: "Federated learning's infrastructure challenges are multi-dimensional: (1) Non-IID data: each mobile device has data from only one user — a user in Tokyo has very different language patterns from one in São Paulo — violating the IID assumption that gradient averaging relies on. FedProx and FedNova address non-IID convergence issues. (2) Device heterogeneity: a high-end Pixel 8 can do 10x more local compute than an older device — synchronous federated rounds have straggler problems. Asynchronous federated learning (FedAsync) helps but introduces gradient staleness. (3) Communication bottleneck: sending 100MB gradient updates over a 4G connection is impractical; gradient compression (top-k sparsification, quantization to 1-bit) is required. (4) Device availability: Google's FL system waits for devices to be charging on WiFi, reducing the available pool to ~10% of all devices at any time. Google's Gboard and Apple's on-device Siri use federated learning in production with these mitigations.",
      hints: [
        "The non-IID problem means federated averaging (FedAvg) may diverge or converge slowly — each local model drifts toward its user's distribution.",
        "Google's PAPAYA and Apple's FL infrastructure both use differential privacy on top of federated learning to provide formal privacy guarantees."
      ],
    },
  ],

  "sdi-mlp-data-versioning": [
    {
      id: "q-mlp-27",
      type: "multiple-choice",
      difficulty: "easy",
      question: "DVC (Data Version Control) is used for ML data versioning. How does DVC version large datasets without storing them in Git, and what does a DVC .dvc file contain?",
      options: [
        "DVC compresses all dataset files into a single binary blob and stores it in a hidden Git branch; the .dvc file is a pointer to that branch",
        "DVC stores the dataset content hash (MD5/SHA256) and remote storage path in a small .dvc metafile that IS committed to Git; the actual data is pushed to a configured remote (S3, GCS, Azure Blob) referenced by the hash — enabling exact dataset reproducibility without storing large files in Git",
        "DVC uses Git LFS under the hood, so the .dvc file is a standard Git LFS pointer file with the dataset SHA and server URL",
        "DVC stores dataset statistics (row count, column names, data types) in the .dvc file; the actual data must be stored separately in a data warehouse and is not managed by DVC"
      ],
      correctAnswer: 1,
      explanation: "DVC extends Git for data: you run 'dvc add data/train.parquet', which adds the file to .gitignore (so Git ignores it) and creates 'data/train.parquet.dvc' containing the file's MD5 hash and size. The .dvc file IS committed to Git — it is tiny (a few bytes). The actual dataset is pushed to a DVC remote (S3, GCS, HDFS) with 'dvc push'. Anyone can reproduce the exact dataset with 'dvc pull' + the .dvc file from Git. This enables: (1) referencing exact dataset versions in MLflow experiments, (2) comparing model performance across different data versions, (3) rolling back to any previous data version. DVC pipelines (dvc.yaml) further version the entire transformation DAG from raw data to features to training data, enabling end-to-end reproducibility.",
      hints: [
        "The .dvc file is essentially a content-addressed pointer: the hash is both the identifier and the integrity check for the data.",
        "DVC's caching system also avoids re-downloading data you already have locally, comparing local cache hashes against .dvc file hashes."
      ],
    },
  ],

  "sdi-mlp-cost-llm-serving": [
    {
      id: "q-mlp-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Your team trains large-scale ML models on a cluster of 100 A100 GPUs. Training a single experiment takes 48 hours. Which cost optimization strategies are most effective for reducing training costs by 50-70% without sacrificing model quality?",
      options: [
        "Switch from PyTorch to JAX — the compilation overhead is amortized over long training runs, providing a 2x speedup without any configuration changes",
        "Use EC2 Spot Instances (or GCP Preemptible/Spot VMs) for 60-90% cost reduction with checkpoint-based fault tolerance to resume from preemption; enable bf16 mixed precision training to halve memory and increase tensor core throughput; and implement gradient checkpointing to trade compute for memory, allowing larger batch sizes that improve GPU utilization",
        "Reduce the number of training epochs by 50% — this saves 50% of cost and models rarely benefit from training to full convergence",
        "Use CPU clusters instead of GPU clusters — CPUs are 10x cheaper per hour and PyTorch CPU performance is sufficient for most training tasks"
      ],
      correctAnswer: 1,
      explanation: "The most proven cost optimization stack for large-scale training: (1) Spot/Preemptible instances: AWS Spot A100s cost 60-80% less than on-demand; checkpointing every 30 minutes (using Torch's native checkpoint or frameworks like torchrun's fault-tolerant launcher) ensures at most 30 minutes of work is lost on preemption. (2) bf16 mixed precision: bfloat16 has the same exponent range as fp32 (no loss scaling needed unlike fp16), halves memory, and doubles tensor core throughput on Ampere GPUs — typically free 30-50% speedup. (3) Gradient checkpointing (activation recomputation): trades 30% more compute for 4-10x memory reduction, enabling 2-4x larger batch sizes that improve GPU utilization. Uber, Databricks, and Anthropic use all three together. Spot interruptions are less frequent for long jobs (>24h) because the Spot market is more stable for sustained compute demands.",
      hints: [
        "Spot instances require architectural investment in fault tolerance — a small upfront engineering cost that pays back on every subsequent training run.",
        "bf16 is preferred over fp16 for training LLMs because it avoids loss scaling complexity; fp16 is more common for inference quantization."
      ],
    },
    {
      id: "q-mlp-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LLM inference servers like vLLM use 'continuous batching' (also called iteration-level scheduling). How does continuous batching differ from traditional static batching, and why does it dramatically improve GPU utilization for LLM serving?",
      options: [
        "Continuous batching runs the model continuously without stopping between requests, using a streaming API that pushes tokens to clients as they are generated; static batching waits for the full response before returning",
        "Continuous batching allows new requests to join an in-progress batch at each token generation iteration, so GPU compute is never idle waiting for slow requests to finish; static batching holds all batch slots until the longest request in the batch completes, causing short requests to hold GPU resources long after they are done",
        "Continuous batching uses a FIFO queue and processes requests in order of arrival; static batching groups requests by sequence length to minimize padding waste",
        "Continuous batching is used for prefill (processing the input prompt); static batching is used for decoding (generating output tokens) — they handle different phases of LLM inference"
      ],
      correctAnswer: 1,
      explanation: "LLM generation has variable output length: request A might output 10 tokens and request B 500 tokens. With static batching, the batch finishes when ALL requests finish — request A's GPU slot sits idle for 490 tokens waiting for B. Continuous batching (Orca, Yu et al. 2022, implemented in vLLM, TGI, TensorRT-LLM) treats each token generation step as an independent scheduling decision: after each iteration, completed sequences are removed from the batch and new waiting requests are inserted. This keeps the batch full throughout generation, maximizing GPU utilization. vLLM additionally uses PagedAttention to manage the KV cache in non-contiguous memory pages (like virtual memory), eliminating the memory waste from pre-allocating fixed-size KV buffers per request — enabling 2-4x more requests in-flight simultaneously. Together, continuous batching + PagedAttention is why vLLM achieves 24x higher throughput than naive HuggingFace generation.",
      hints: [
        "Think of static batching like a bus that waits until all passengers reach their stop before new passengers board; continuous batching is like a subway where passengers board and exit at every stop.",
        "PagedAttention solves a different but related problem: KV cache memory fragmentation that limits the number of concurrent requests."
      ],
    },
    {
      id: "q-mlp-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Speculative decoding is a technique to accelerate LLM inference. How does it work, and what is the key condition that makes it produce outputs identical to the original model?",
      options: [
        "Speculative decoding uses a smaller draft model to generate K candidate tokens in a single forward pass, which a larger target model then verifies in parallel using a rejection sampling procedure that accepts draft tokens when their probability under the target model exceeds a threshold, maintaining the exact target distribution",
        "Speculative decoding caches the K most likely next tokens after each generation step and serves the cached prediction without running the model again; it produces identical output only when the cached token matches what the model would have generated",
        "Speculative decoding runs K copies of the model in parallel, each with a different random seed, and returns the most frequently generated token, reducing variance in output quality",
        "Speculative decoding uses beam search to generate K candidate sequences and selects the sequence with the highest log probability, producing deterministic output identical to greedy decoding"
      ],
      correctAnswer: 0,
      explanation: "Speculative decoding (Leviathan et al. 2022, Chen et al. 2022) exploits two facts: (1) autoregressive LLM generation is memory-bandwidth-bound (one token per forward pass), not compute-bound; (2) the large target model can verify K tokens in parallel in a single forward pass (since all K positions are known, attention is not causal for verification). The small draft model (e.g., 7B verifying 70B) generates K draft tokens quickly. The target model verifies all K in one pass using rejection sampling: for each position k, if the draft token probability under the target model >= draft model probability, accept; otherwise, reject with probability proportional to the probability ratio and sample a replacement. This guarantees the output distribution is exactly the target model's distribution — no quality loss. In practice, 3-5 draft tokens are accepted per verification call, giving 2-4x latency reduction. Used in Google's Gemini serving and Anthropic's Claude infrastructure.",
      hints: [
        "The key insight: verifying K tokens takes the same wall-clock time as generating 1 token (one forward pass of the large model), so if the draft model is right even 50% of the time, you get a 2x speedup.",
        "Rejection sampling preserves the exact target distribution — this is what makes speculative decoding lossless unlike quantization."
      ],
    },
  ],
};

registerQuestions(questions);
