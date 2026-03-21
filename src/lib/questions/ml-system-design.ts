import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "requirements-ml": [
    {
      id: "q-msd-kp1-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When gathering ML system requirements, which stakeholder is most critical to consult FIRST to define the business success metric?",
      options: [
        "The ML engineer who will train the model.",
        "The product manager or business owner who owns the business objective.",
        "The data engineer who will build the data pipeline.",
        "The DevOps engineer who will deploy the system.",
      ],
      correctAnswer: 1,
      explanation:
        "The business owner defines what success looks like in business terms (e.g., 'increase purchase conversion by 5%' or 'reduce fraud losses by $10M/year'). Without a clear business metric, ML teams risk optimizing proxy metrics that do not translate to business value. Product managers translate business goals into measurable objectives that ML engineers can then operationalize.",
      hints: [
        "ML metrics (AUC, NDCG) are proxies — only the business owner knows which proxy best maps to business outcomes.",
        "Define success first, then work backward to the ML metric.",
      ],
    },
    {
      id: "q-msd-kp1-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "In an ML system design document, data freshness requirements (how recently training data must be from) are determined solely by model accuracy needs and not by the serving latency SLO.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Data freshness requirements are driven by the rate of concept drift in the domain, not serving latency. A fraud detection model may need hourly retraining because fraud patterns evolve daily. A movie recommendation model may be retrained weekly. Serving latency SLO constrains feature retrieval at inference time, not how stale training data can be. These are independent requirements.",
      hints: [
        "Serving latency = how fast to respond to a request. Data freshness = how recent the training labels are.",
        "A model trained on 6-month-old data can still serve with p99 < 100 ms latency.",
      ],
    },
    {
      id: "q-msd-kp1-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An ML system must achieve 99.9% availability (three nines). How many minutes of downtime per month does this allow, and what ML-specific failure modes must be included in the availability calculation?",
      options: [
        "~44 minutes/month; only infrastructure failures count toward downtime.",
        "~44 minutes/month; model degradation events (silent accuracy drops, data pipeline failures producing wrong features) must also be counted as availability failures if they cause incorrect outputs.",
        "~8.7 hours/month; 99.9% availability only applies to web servers, not ML models.",
        "~4.4 minutes/month; 99.9% is the strictest SLA and applies to all systems equally.",
      ],
      correctAnswer: 1,
      explanation:
        "99.9% availability = 0.1% downtime = 43.8 minutes/month. For ML systems, 'availability' must include silent failures: a data pipeline bug producing incorrect features causes the model to serve wrong predictions with no infrastructure failure — the system appears 'up' but is unavailable in the meaningful sense. ML availability SLOs must cover both infrastructure uptime and model output correctness.",
      hints: [
        "99.9% = 1 - 0.001; 30 days × 24 hrs × 60 min × 0.001 = 43.2 minutes.",
        "Silent model degradation (wrong features, stale model) is functionally equivalent to downtime.",
      ],
    },
    {
      id: "q-msd-kp1-7",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A team is designing an ML system for real-time personalization. The engineering lead proposes using the same evaluation metric for both offline model selection and online A/B test success criteria. What is the problem with this approach?",
      options: [
        "It is computationally inefficient to compute the same metric twice.",
        "Offline metrics (e.g., AUC on historical data) measure model quality in isolation; online metrics (e.g., conversion rate) measure system-level business outcomes. A model can improve offline AUC while decreasing online conversion due to system interactions, latency changes, or distribution shift. Different metrics are required.",
        "The A/B test cannot measure model-specific metrics like AUC.",
        "Using the same metric simplifies the evaluation process — this is actually a best practice.",
      ],
      correctAnswer: 1,
      explanation:
        "Offline metrics measure model quality on static historical data. Online metrics measure the full system\'s business impact in live traffic. These are fundamentally different: a model with better offline AUC can degrade online metrics due to increased latency (slower response reduces conversion), system interactions (the model interacts with caching, feature pipelines, UI), or distribution shift (historical test data does not represent current user behavior). Always specify separate offline and online success criteria.",
      hints: [
        "Offline: static data, model quality. Online: live traffic, business outcomes.",
        "A faster model with lower AUC can outperform a slower model with higher AUC in an A/B test.",
      ],
    },
    {
      id: "q-msd-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A product manager asks you to design an ML-powered search ranking system for an e-commerce site that receives 50,000 queries per second (QPS) at peak. Which requirement must be defined BEFORE choosing a model architecture?",
      options: [
        "Whether to use BERT or a gradient boosted tree as the ranking model.",
        "The p99 latency SLO for the ranking call, the QPS budget per model inference, and the acceptable recall@10 floor.",
        "How many GPU nodes the training cluster will have.",
        "The specific learning rate schedule for model training.",
      ],
      correctAnswer: 1,
      explanation:
        "At 50K QPS, a 200 ms p99 SLO means the model must complete inference in <50 ms (leaving headroom for feature retrieval and I/O). This SLO eliminates large transformer models immediately. Specifying QPS, latency SLO, and recall floor as hard requirements prevents building a system that cannot serve at production scale.",
      hints: [
        "50K QPS × 200 ms SLO implies a throughput requirement of 10,000 concurrent inflight requests — a concrete capacity constraint.",
        "Latency and throughput requirements directly constrain model selection.",
      ],
    },
    {
      id: "q-msd-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A p99 latency SLO (e.g., p99 < 100 ms) is a functional requirement because it directly determines which ML model to use.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        'Latency SLOs are non-functional (quality-of-service) requirements: they constrain how well the system performs, not what it computes. They do influence model selection as a hard constraint, but they describe system properties, not behaviors. Functional requirements describe what outputs the system produces (e.g., "return ranked list of 10 items").',
      hints: [
        "Functional: what the system does. Non-functional: how well it does it.",
        "SLOs, throughput, availability, and cost are all non-functional quality attributes.",
      ],
    },
    {
      id: "q-msd-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "You are sizing a real-time ML inference cluster. The model has p50 latency of 20 ms and p99 latency of 80 ms, serving 10,000 QPS. Approximately how many model replicas are needed if each replica handles 100 requests concurrently?",
      options: [
        "1 replica — one server can handle all requests since p50 latency is only 20 ms.",
        "100 replicas — 10,000 QPS ÷ 100 concurrent requests per replica.",
        "10 replicas — p99 latency of 80 ms means only 10 requests per second per replica.",
        "1,000 replicas — one per QPS unit.",
      ],
      correctAnswer: 1,
      explanation:
        "Using Little\'s Law: throughput = concurrency ÷ latency. At 80 ms p99 (0.08 s), a replica handling 100 concurrent requests serves ~1,250 QPS. To serve 10,000 QPS requires ~8 replicas at minimum. With 100 concurrent capacity per replica and overhead/headroom: 10,000 ÷ 100 = 100 replicas is the capacity-based estimate (assuming each slot is utilized 100%). In practice, you add 20–30% headroom.",
      hints: [
        "Little\'s Law: L = λ × W (concurrency = throughput × latency). Rearranged: throughput = concurrency ÷ latency.",
        "At p99 latency = 80 ms and 100 concurrent slots: each replica handles 100/0.08 = 1,250 req/s max.",
      ],
    },
  ],

  "problem-framing": [
    {
      id: "q-msd-kp2-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A travel company wants to predict 'will this user book a hotel in the next 7 days?' Which ML framing is most direct?",
      options: [
        "Regression — predict the exact probability of booking.",
        "Binary classification — predict a binary label (books / does not book), with probability output for downstream thresholding.",
        "Clustering — group users by travel intent.",
        "Multi-label classification — predict all possible travel destinations.",
      ],
      correctAnswer: 1,
      explanation:
        "The business question maps directly to a binary outcome (books or not within 7 days). Binary classification outputs a calibrated probability that can be thresholded for downstream actions (send push notification, show promo). Regression to the exact probability is equivalent but requires careful label construction. Clustering does not produce the required yes/no prediction.",
      hints: [
        "Binary classification: yes/no outcome with probability output.",
        "The probability output allows downstream calibration of the decision threshold.",
      ],
    },
    {
      id: "q-msd-kp2-5",
      type: "true-false",
      difficulty: "easy",
      question:
        "Framing a problem as multi-task learning (predicting multiple outputs simultaneously) always increases computational cost with no accuracy benefit.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Multi-task learning often improves accuracy on each individual task by sharing representations across related tasks. For example, a model predicting both CTR and conversion rate shares a user interest representation, and gradients from each task regularize the other. The shared backbone reduces overall inference cost compared to running two separate models. The trade-off is increased training complexity.",
      hints: [
        "Shared layers in multi-task learning act as a form of regularization — each task reduces the other\'s overfitting.",
        "Two separate 100M-param models vs. one shared 120M-param model with two heads: the multi-task model is cheaper to serve.",
      ],
    },
    {
      id: "q-msd-kp2-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A food delivery platform wants to rank restaurants for a user. They have: (A) explicit ratings (1-5 stars), (B) implicit signals (clicks, orders, dwell time on menu), (C) contextual signals (time of day, weather, user location). What is the optimal problem framing?",
      options: [
        "Regression on average star rating — predicts the 'best' restaurant objectively.",
        "Pointwise learning-to-rank using only explicit ratings — they are the cleanest signal.",
        "Listwise learning-to-rank combining all three signal types, using ratings as strong labels, implicit signals as weak labels, and context as features — optimizing directly for ranking quality (NDCG).",
        "Collaborative filtering using only order history — explicit signals are too noisy.",
      ],
      correctAnswer: 2,
      explanation:
        "Optimal framing combines all available signals: explicit ratings (high-quality, sparse) as strong training labels; implicit signals (abundant, noisy) as weak labels with appropriate loss weighting; context as features that personalize rankings. Listwise optimization (LambdaRank, LambdaLoss) directly optimizes NDCG rather than pointwise regression. This captures the full information in all three signal types.",
      hints: [
        "Explicit ratings are rare but accurate; implicit signals are abundant but biased — combine both with different loss weights.",
        "Listwise losses optimize the ranking metric directly; pointwise losses only approximate it.",
      ],
    },
    {
      id: "q-msd-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A ride-sharing company wants to predict surge pricing multipliers (1.0×, 1.5×, 2.0×, 2.5×, 3.0×). What is the most appropriate ML framing?",
      options: [
        "Binary classification: surge vs. no surge.",
        "Multi-class classification with 5 ordered classes, or ordinal regression — since the classes have a meaningful order.",
        "Regression to a continuous multiplier value.",
        "Clustering riders and drivers into demand zones.",
      ],
      correctAnswer: 1,
      explanation:
        "The 5 surge multipliers are discrete but ordered (1.0 < 1.5 < 2.0 < 2.5 < 3.0). Multi-class classification ignores the ordering; ordinal regression exploits it. Regression to a continuous value is also valid if the downstream system can threshold to the 5 levels. The key is that the ordered nature of the output should inform model design.",
      hints: [
        "Ordinal classes have a natural order — predicting 2.0 when the truth is 1.5 is a smaller error than predicting 3.0.",
        "Standard cross-entropy loss treats all misclassifications equally — it ignores the ordering.",
      ],
    },
    {
      id: "q-msd-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A search ranking problem can always be reduced to pointwise regression (predicting a relevance score per document) without any loss in ranking quality.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Pointwise regression ignores inter-document relationships: predicting scores independently cannot capture relative ordering constraints. Listwise losses (e.g., ListNet, LambdaLoss) directly optimize ranking metrics like NDCG by considering the full ranked list jointly. Pointwise approaches often underperform pairwise and listwise on NDCG because they optimize the wrong objective.",
      hints: [
        "NDCG rewards placing highly relevant documents at rank 1 — pointwise MSE does not directly optimize for this.",
        "Two documents with scores 0.9 and 0.1 are ranked the same as 0.8 and 0.1 by pointwise models, but differently by NDCG.",
      ],
    },
    {
      id: "q-msd-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A credit card fraud detection model must decide within 150 ms (total authorization timeout) whether to approve or decline a transaction. The fraud rate is 0.05%. Which framing and evaluation approach is correct?",
      options: [
        "Binary classification optimized for accuracy; 99.95% accuracy is sufficient.",
        "Binary classification with extreme class imbalance handling (focal loss or oversampling); evaluated by precision-recall AUC and precision@recall=80%, not accuracy.",
        "Regression predicting a continuous fraud probability; threshold selected post-hoc.",
        "Multi-class: legitimate, suspicious, fraud — with three different downstream actions.",
      ],
      correctAnswer: 1,
      explanation:
        'At 0.05% fraud rate, a model predicting "not fraud" always achieves 99.95% accuracy — useless. The relevant metrics are precision-recall AUC and operational precision@recall (e.g., at 80% recall, what fraction of flagged transactions are truly fraudulent?). Focal loss or oversampling addresses the extreme imbalance, and the 150 ms SLO constrains model complexity.',
      hints: [
        "0.05% fraud rate: if 10M transactions/day, 50K are fraud. 40% recall = 20K caught; 30K missed (false negatives).",
        "The correct metrics: recall (did we catch enough fraud?) and precision (how many flags are real fraud?).",
      ],
    },
  ],

  "data-collection-design": [
    {
      id: "q-msd-kp3-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A model predicts loan default risk. Training data was collected from 2010-2020. In 2023, the model\'s performance has degraded significantly. What is the most likely cause?",
      options: [
        "The model was overfitting to the training data and always had poor performance.",
        "Concept drift: the statistical relationship between features and loan default has changed since 2020 (e.g., COVID-19 economic shock changed income/debt patterns).",
        "Data leakage: future information was encoded in the training features.",
        "The model is underfitting due to insufficient training data.",
      ],
      correctAnswer: 1,
      explanation:
        "Concept drift occurs when the joint distribution P(Y|X) changes over time — features that predicted default in 2010-2020 may no longer be predictive in 2023 due to macroeconomic changes, regulatory changes, or demographic shifts. COVID-19 dramatically changed income stability and spending patterns, obsoleting models trained on pre-pandemic data. Regular monitoring and retraining cadences are required to detect and correct concept drift.",
      hints: [
        "Concept drift: P(Y|X) changes. Data drift: P(X) changes. Both can degrade model performance.",
        "A model that was accurate in 2020 but fails in 2023 is not overfitting — it is suffering from distribution shift.",
      ],
    },
    {
      id: "q-msd-kp3-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Human annotation agreement (inter-annotator agreement, e.g., Cohen\'s kappa) should be measured and reported before using human labels as training data ground truth.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Low inter-annotator agreement (e.g., kappa < 0.6) means labels are inconsistent across annotators — the training signal is noisy. Training on such data produces a model that learns annotator disagreement rather than true signal. IAA must be measured first, annotation guidelines refined, annotators calibrated, and only sufficiently agreed-upon labels used. IAA < 0.6 typically requires annotation guideline revision.",
      hints: [
        "Cohen\'s kappa of 0.8+ indicates strong agreement; below 0.6 is weak agreement — unreliable ground truth.",
        "A model cannot learn a task better than humans can agree on what the correct answer is.",
      ],
    },
    {
      id: "q-msd-kp3-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You are training a next-token prediction language model on web-crawled data. Which data quality problem is most likely to cause the model to generate harmful content?",
      options: [
        "Duplicate documents in the training set — memorization of repeated content.",
        "Training data contamination: harmful, toxic, or personally identifiable information in the web crawl gets memorized and reproduced at inference time.",
        "Imbalanced language distribution — rare languages are underrepresented.",
        "Training data that is too recent — the model learns ephemeral information.",
      ],
      correctAnswer: 1,
      explanation:
        "Web-crawled data contains toxic content, extremist material, personal information, and harmful instructions. LLMs trained on unfiltered web data memorize and can reproduce this content. Mitigation requires: content filtering (blocklists, classifiers), deduplication (reduces memorization), PII scrubbing, and quality filtering (remove spam, low-quality content). The C4, RefinedWeb, and Dolma datasets illustrate different approaches to this problem.",
      hints: [
        "GPT-2 could reproduce verbatim training data including personal phone numbers from its training set.",
        "Deduplication reduces memorization: if a document appears once, it is less likely to be reproduced verbatim.",
      ],
    },
    {
      id: "q-msd-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A recommendation system logs every item shown to users and whether they clicked. Training a model on this logged data to predict clicks will suffer from which specific bias?",
      options: [
        "Confirmation bias — users always click what they already know.",
        "Exposure bias (position bias) — items shown at the top are clicked more regardless of quality, so the model learns position artifacts instead of true relevance.",
        "Survivorship bias — only popular items are ever shown, so only they appear in logs.",
        "Label noise bias — click signals are too noisy to learn from.",
      ],
      correctAnswer: 1,
      explanation:
        'Position bias is the dominant issue in recommendation/search logs: items ranked higher receive disproportionately more clicks regardless of their true relevance (simply because they are seen). A model trained on raw logs learns to predict "was shown at position 1" rather than "is relevant." Inverse propensity scoring (IPS) or position-aware models are needed to debias.',
      hints: [
        "If item A appears at rank 1 and item B at rank 10, A gets more clicks even if B is more relevant.",
        'The model cannot distinguish "clicked because relevant" from "clicked because shown first."',
      ],
    },
    {
      id: "q-msd-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Collecting training data from production logs is always safe because production data reflects the true real-world distribution the model will serve.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Production logs reflect the current model\'s decisions, creating a feedback loop bias: the model only shows items it already thinks are relevant, so the data never covers items it would have incorrectly penalized. This creates a self-reinforcing loop that amplifies existing model biases. Random exploration (e.g., ε-greedy or logging policies) is needed to collect unbiased training data.",
      hints: [
        "If the current model never shows category X, production logs have no signal on how users would respond to X.",
        "Logged data captures only what the existing system chose to act on — a biased sample.",
      ],
    },
    {
      id: "q-msd-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You have 1 million unlabeled examples and a budget for 10,000 human labels. Active learning selects which examples to label. Which uncertainty sampling criterion is most appropriate for a binary classifier?",
      options: [
        "Label the 10,000 examples with the highest predicted positive probability.",
        "Label the 10,000 examples where predicted probability is closest to 0.5 (maximum margin uncertainty), as these are the examples the model is most uncertain about.",
        "Label 10,000 randomly selected examples to ensure unbiased coverage.",
        "Label the 10,000 examples with the lowest predicted positive probability.",
      ],
      correctAnswer: 1,
      explanation:
        "Uncertainty sampling for binary classification selects examples where the model\'s predicted probability is closest to 0.5 — the decision boundary. These are the examples where the model is most uncertain and where a label provides the most information gain. Labeling examples with high or low confidence (far from 0.5) teaches the model things it already knows.",
      hints: [
        "Examples near the decision boundary most change the model — that\'s where labeled data has the highest value.",
        "P(y=1|x) ≈ 0.5 means the model cannot decide — a human label resolves the uncertainty entirely.",
      ],
    },
  ],

  "feature-store-design": [
    {
      id: "q-msd-kp4-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of point-in-time correct feature retrieval in a feature store?",
      options: [
        "To retrieve features as fast as possible for low-latency serving.",
        "To ensure that training examples use only feature values that were available at the time the label was generated, preventing temporal data leakage.",
        "To limit the amount of storage used by the feature store.",
        "To ensure that features are normalized consistently across all training examples.",
      ],
      correctAnswer: 1,
      explanation:
        "Point-in-time correct retrieval (also called 'as-of' queries) ensures that when creating a training example with label from time T, the feature values used are those that existed at time T — not future values. Without this, a feature like 'account_balance_at_transaction' might be retrieved using today\'s balance rather than the balance at the time of the labeled transaction, causing look-ahead bias (leakage).",
      hints: [
        "If a label is from Jan 15 but feature values from Feb 1 are used, the model sees the future — leakage.",
        "Point-in-time correct = feature value at the exact moment the training label was generated.",
      ],
    },
    {
      id: "q-msd-kp4-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "A streaming feature pipeline that computes per-user aggregations using Apache Flink guarantees exactly-once feature update semantics by default, with no additional configuration.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Flink supports exactly-once processing but it requires explicit configuration: checkpointing must be enabled (state.checkpoints.dir), the sink must support idempotent writes or transactions (e.g., Kafka transactional producer, JDBC with upsert semantics), and the source must support replay (Kafka with offset tracking). Default Flink pipelines provide at-least-once semantics. Exactly-once requires coordinating Flink checkpoints with sink transaction commits.",
      hints: [
        "At-least-once means a message might be processed twice on failure; exactly-once means state updates are idempotent.",
        "Redis does not natively support transactions compatible with Flink checkpointing — upsert patterns simulate exactly-once.",
      ],
    },
    {
      id: "q-msd-kp4-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A feature store serves embeddings for 500 million user profiles. Each embedding is 256 float32 values (1 KB). The p99 serving latency requirement is <5 ms. Which storage and retrieval architecture is most appropriate?",
      options: [
        "PostgreSQL with a vector column — standard relational database handles this scale.",
        "Sharded Redis cluster with user_id as the shard key: 500M × 1 KB = 500 GB partitioned across 50 nodes (10 GB/node), each node serving point lookups in <1 ms.",
        "FAISS index for ANN search — vector databases are the right tool for embedding retrieval.",
        "DynamoDB with embedding stored as a JSON attribute — managed NoSQL for scale.",
      ],
      correctAnswer: 1,
      explanation:
        "For point lookups (not similarity search) at 500M users, sharded Redis is optimal: 500M × 1 KB = 500 GB across a 50-node cluster is 10 GB/node — within typical Redis capacity. Redis GET latency is sub-millisecond, easily meeting the 5 ms SLO. FAISS is for ANN similarity search, not point lookups by user_id. DynamoDB adds network latency and JSON parsing overhead that may approach the 5 ms limit.",
      hints: [
        "FAISS = find nearest neighbors. Redis = fetch by exact key. These are different retrieval patterns.",
        "500M × 1 KB = ~500 GB. Sharded across 50 nodes = 10 GB/node — Redis is designed for this.",
      ],
    },
    {
      id: "q-msd-kp4-7",
      type: "true-false",
      difficulty: "easy",
      question:
        "A feature store\'s offline store (e.g., BigQuery or Parquet files) is used to serve features at model inference time in production.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "The offline store is used for training data generation and batch inference — not for real-time serving. The online store (Redis, DynamoDB, Cassandra) serves features at inference time because it supports low-latency point lookups (sub-millisecond). The offline store contains the full feature history for point-in-time correct training data generation, but querying it at inference time would introduce seconds of latency — incompatible with real-time serving SLOs.",
      hints: [
        "Offline store: analytical queries for training. Online store: point lookups for serving.",
        "BigQuery query time: seconds to minutes. Redis GET: sub-millisecond. Only one is suitable for serving.",
      ],
    },
    {
      id: "q-msd-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'A feature store has an online store (Redis) and an offline store (BigQuery). A real-time fraud detection model needs the "user\'s total spend in the past 30 days" feature during a payment authorization call that must complete in <150 ms. Which store handles this request?',
      options: [
        "The offline store (BigQuery) — it has the full 30-day history.",
        "The online store (Redis) — pre-materialized 30-day spend values are served via sub-millisecond point lookups.",
        "Both stores are queried and results are merged at inference time.",
        "The feature is computed on-the-fly by querying the transaction database during inference.",
      ],
      correctAnswer: 1,
      explanation:
        "The online store (Redis) serves pre-materialized feature values with sub-millisecond latency. A BigQuery query scanning 30 days of data would take seconds — incompatible with a 150 ms total authorization timeout. A scheduled materialization job (e.g., hourly) pre-computes the 30-day spend and writes it to Redis so it is available for instant point lookup.",
      hints: [
        "BigQuery is optimized for analytical batch queries (minutes); Redis is optimized for point lookups (sub-ms).",
        "Materialization bridges the gap: compute offline, serve from the fast store.",
      ],
    },
    {
      id: "q-msd-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Train-serve skew in an ML system occurs when features are computed differently during training (offline) vs. serving (online), causing the model to receive different inputs at inference time than it was trained on.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        'Train-serve skew is one of the most common production ML bugs. Example: during training, "user age in days" is computed as (current_date − birthdate) using a static training date; at serving, it is recomputed with today\'s date — always giving the correct age. But if the serving code uses a different formula (e.g., age in years vs. days), the model receives a wildly different feature value. Feature stores prevent this by enforcing one shared computation for both training and serving.',
      hints: [
        "A feature computed in PySpark for training and in SQL for serving may use different rounding or timezone assumptions.",
        "The model was trained on feature distribution X; serving it feature distribution Y causes silent degradation.",
      ],
    },
    {
      id: "q-msd-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You are designing a feature store for a recommendation system that needs user-item interaction counts over 1-hour, 1-day, and 7-day windows, updated in real time as users click. What architecture correctly handles this?",
      options: [
        "Batch ETL job runs every 7 days to recompute all window aggregations and load into Redis.",
        "A streaming pipeline (e.g., Flink/Kafka) computes rolling window aggregations in real time and writes to the online store; a separate batch pipeline writes to the offline store for training.",
        "The model queries the raw event log at inference time and computes aggregations on-the-fly.",
        "A Lambda cache stores raw events; the model computes aggregations using the cache at inference time.",
      ],
      correctAnswer: 1,
      explanation:
        "Real-time window features require a dual-path architecture: (1) a streaming pipeline (Flink keyed sliding windows) computes rolling aggregations and writes to the online store (Redis) with low latency; (2) a batch pipeline writes historical window values to the offline store (BigQuery/Parquet) for training data generation. This ensures training-serving consistency and real-time freshness.",
      hints: [
        "A 7-day ETL job means features are 7 days stale — unacceptable for real-time click signals.",
        "Flink\'s keyed sliding windows are exactly designed for per-user rolling aggregations with sub-second latency.",
      ],
    },
  ],

  "model-selection-design": [
    {
      id: "q-msd-kp5-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "For a tabular dataset with 1 million rows and 200 engineered features predicting user churn, which model family typically achieves the best accuracy without extensive hyperparameter search?",
      options: [
        "Deep neural network with 10 layers.",
        "Gradient boosted decision tree (e.g., XGBoost, LightGBM) — typically best on structured/tabular data.",
        "k-Nearest Neighbors with k=10.",
        "Linear regression with L2 regularization.",
      ],
      correctAnswer: 1,
      explanation:
        "On tabular/structured data, gradient boosted trees (GBDTs) consistently outperform deep learning and simpler models. They handle mixed feature types natively, are robust to irrelevant features, require less feature engineering than linear models, train faster than deep nets, and are interpretable via feature importance. XGBoost won the majority of Kaggle tabular competitions from 2015-2022. Deep learning only surpasses GBDTs on tabular data with very large datasets (>10M rows) and carefully designed architectures.",
      hints: [
        "GBDTs: robust to feature scale, handle missing values, capture non-linear interactions natively.",
        "On tabular data, the winning Kaggle approach is almost always a GBDT ensemble or a GBDT + NN blend.",
      ],
    },
    {
      id: "q-msd-kp5-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "When comparing two models in an A/B test, statistical significance (p < 0.05) guarantees that the observed improvement is large enough to be worth the deployment cost.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Statistical significance only means the observed difference is unlikely to be due to chance — it says nothing about the magnitude or practical importance of the difference. With large sample sizes (common in ML A/B tests), even a 0.001% CTR improvement can be statistically significant. Practical significance requires also reporting the effect size (absolute and relative lift) and comparing it to the cost of deployment, maintenance, and infrastructure. Minimum detectable effect (MDE) should be pre-specified based on business value.",
      hints: [
        "p < 0.05 with 100M users can detect a 0.001% change — statistically significant but practically negligible.",
        "Always report both p-value (statistical significance) AND effect size (practical significance).",
      ],
    },
    {
      id: "q-msd-kp5-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You are performing neural architecture search (NAS) to optimize a model for both accuracy and inference latency on a mobile device. Which multi-objective optimization approach correctly handles this?",
      options: [
        "Optimize accuracy first, then apply post-training quantization to meet latency.",
        "Use a Pareto-optimal search: identify the set of architectures where no architecture dominates another in both accuracy and latency, then select the Pareto-optimal architecture matching your latency budget.",
        "Use a weighted sum: loss = accuracy + λ × latency. Tune λ on the validation set.",
        "Maximize accuracy subject to a hard latency constraint using constrained optimization.",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-objective NAS requires finding the Pareto frontier — the set of architectures where improving accuracy requires increasing latency and vice versa. Both option B (Pareto search) and option D (constrained optimization) are valid; Pareto search provides the full trade-off picture while constrained optimization finds one optimal point. The weighted sum (option C) requires knowing λ a priori and can miss non-convex Pareto regions. Option A ignores architecture-level latency optimization.",
      hints: [
        "Pareto frontier: a point is Pareto-optimal if no other point improves one objective without worsening another.",
        "MobileNetV3 and EfficientNet were found via NAS with latency-accuracy multi-objective optimization.",
      ],
    },
    {
      id: "q-msd-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "You are comparing Model A (AUC-ROC 0.91, p99 latency 80 ms, 2 GB memory) vs. Model B (AUC-ROC 0.93, p99 latency 250 ms, 8 GB memory). Your SLA requires p99 < 100 ms. What is the correct decision?",
      options: [
        "Deploy Model B — higher AUC always means better user experience.",
        "Deploy Model A — it meets the latency SLA; pursue knowledge distillation or architecture pruning to close the 0.02 AUC gap.",
        "Reject both models and retrain from scratch with a different algorithm.",
        "Negotiate the SLA to 300 ms to accommodate Model B.",
      ],
      correctAnswer: 1,
      explanation:
        "A p99 latency SLA is a hard constraint: a model that violates it cannot be deployed regardless of accuracy. Model A is the only viable option. Knowledge distillation (training a small student model to mimic Model B) or pruning Model B can often recover most of the 0.02 AUC gap while meeting the latency constraint. Never negotiate SLAs downward to accommodate a model.",
      hints: [
        "SLAs are contractual commitments — violating them has business consequences.",
        "Knowledge distillation: a 7B model can often match a 70B model\'s AUC at a fraction of the latency.",
      ],
    },
    {
      id: "q-msd-kp5-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Offline evaluation metrics (e.g., AUC on a held-out test set) reliably predict online A/B test results, so A/B testing is optional once offline metrics are satisfactory.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Offline metrics measure model quality on static historical data and cannot capture feedback loops, user behavior changes, novelty effects, or system-level interactions that only appear in live traffic. It is common for a model with better offline AUC to perform worse in an A/B test due to factors invisible in the training data. Online A/B testing is mandatory before full promotion.",
      hints: [
        "A model trained on last month\'s data is evaluated on a test set from last month — but deployed into next month\'s world.",
        "User behavior adapts to recommendations — a feedback loop that static offline evaluation cannot model.",
      ],
    },
    {
      id: "q-msd-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A new LLM-based product description generator has ROUGE-L score 0.72 vs. 0.68 for the current template-based system, but A/B test shows no statistically significant difference in purchase conversion rate (p=0.34, 95% CI: −1.2% to +1.4%). What should you do?",
      options: [
        "Deploy the LLM model — higher ROUGE-L proves it is better.",
        "Do not deploy the LLM model — it shows no business lift and carries significant inference cost and operational complexity.",
        "Run the A/B test longer until significance is reached regardless of cost.",
        'Deploy to 10% of traffic permanently as a "shadow" to collect more data.',
      ],
      correctAnswer: 1,
      explanation:
        "ROUGE-L is a proxy metric for text quality, not business outcome. The A/B test (the ground truth) shows no statistically significant purchase conversion improvement. Deploying the LLM model would add substantial inference cost, latency, and operational complexity for zero measured business gain. The null result is the signal: the current system is adequate for this metric.",
      hints: [
        "The A/B test CI includes zero — the LLM might be worse, better, or neutral. The null result is valid.",
        "An LLM model may cost 100× more to serve — that cost requires a commensurate business gain to justify.",
      ],
    },
  ],

  "training-pipeline-design": [
    {
      id: "q-msd-kp6-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a distributed training job, what is the key difference between data parallelism and model parallelism?",
      options: [
        "Data parallelism splits the dataset across workers, each holding a full model copy. Model parallelism splits the model across workers, each holding the full dataset.",
        "Data parallelism is used for large datasets; model parallelism is used for small datasets.",
        "Data parallelism runs on CPUs; model parallelism runs on GPUs.",
        "Data parallelism requires synchronous gradient updates; model parallelism does not.",
      ],
      correctAnswer: 0,
      explanation:
        "Data parallelism: each GPU worker holds a full copy of the model and processes a different mini-batch; gradients are averaged across workers (AllReduce). Effective when the model fits in one GPU. Model parallelism: the model is split across GPUs (different layers or tensor shards on different devices); each GPU processes the full batch through its partition. Required when the model is too large to fit on one GPU (e.g., LLMs with billions of parameters).",
      hints: [
        "Data parallel: N GPUs each run the full 10B model on different data → N× throughput.",
        "Model parallel: the 140 GB LLM is split across 4× 40 GB GPUs — each GPU holds a part of the model.",
      ],
    },
    {
      id: "q-msd-kp6-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using a larger batch size in distributed training always improves model accuracy because more samples are used per gradient update.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Large batch sizes can hurt generalization. Small-batch SGD converges to sharper minima with poor generalization; large-batch training converges faster but often to sharp minima that generalize poorly ('generalization gap'). The linear scaling rule (scale learning rate proportionally with batch size) partially mitigates this but has limits. Learning rate warmup, gradient clipping, and careful batch size selection are required to achieve good accuracy with large batches.",
      hints: [
        "A batch size of 32K may train 10× faster than 32 but often achieves 1-2% lower accuracy without careful tuning.",
        "The 'generalization gap' in large-batch training is well-documented: Keskar et al. 2017 showed large batches converge to sharp minima.",
      ],
    },
    {
      id: "q-msd-kp6-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A training pipeline uses a rolling window: always train on the most recent 90 days of data, retrain weekly. After 6 months, a performance investigation shows the model systematically underperforms on weekends vs. weekdays. What is the most likely pipeline design flaw?",
      options: [
        "The model architecture is too simple to capture weekend patterns.",
        "The training data is temporally biased: the rolling window cutoff lands mid-week, and the most recent weekend data is always excluded from the most recent batches, causing the model to see proportionally less weekend data.",
        "Weekend traffic has higher latency, causing timeouts during inference.",
        "The feature engineering is wrong — day-of-week features are being incorrectly computed.",
      ],
      correctAnswer: 1,
      explanation:
        "Rolling window pipelines with fixed weekly retraining schedules can introduce systematic temporal imbalance: if the pipeline runs every Monday using the past 90 days, Saturday and Sunday data from the most recent weekend are always at the tail of the window. Combined with recency weighting or time-decay in the training objective, weekend data receives less weight. The fix is to verify the temporal distribution of training data by day-of-week and ensure the window includes equal representation.",
      hints: [
        "Always audit training data distribution by temporal slices (day of week, hour of day, month) when model performance varies by time.",
        "If the model is retrained every Monday on 90 days ending Sunday, the most recent data always skews toward weekdays.",
      ],
    },
    {
      id: "q-msd-kp6-7",
      type: "true-false",
      difficulty: "easy",
      question:
        "A model trained with a fixed random seed on the same data will always produce exactly identical weights across different hardware accelerators (e.g., V100 vs. A100).",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Different GPU architectures implement floating-point operations with different rounding behaviors, and CUDA non-deterministic operations (e.g., atomicAdd in certain kernels) produce different results across GPU generations even with fixed seeds. Additionally, cuDNN algorithm selection changes across library versions. For truly reproducible training, deterministic CUDA mode must be explicitly enabled (torch.use_deterministic_algorithms(True)) and the same hardware/library version must be used.",
      hints: [
        "CUDA floating-point arithmetic is not deterministic across GPU architectures due to different rounding.",
        "torch.use_deterministic_algorithms(True) enforces determinism but may reduce performance.",
      ],
    },
    {
      id: "q-msd-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In an ML training pipeline, which combination of versioned artifacts is required to guarantee full experiment reproducibility?",
      options: [
        "Model weights + training script only.",
        "Data version + code commit hash + hyperparameter config + random seeds + environment (Docker image/conda lock file).",
        "Hyperparameter config + model weights + evaluation metrics.",
        "Training script + learning rate schedule + GPU hardware specification.",
      ],
      correctAnswer: 1,
      explanation:
        "Full reproducibility requires all five: (1) data version — which dataset split; (2) code commit — exact training code; (3) hyperparameter config — all tunable parameters; (4) random seeds — Python, NumPy, PyTorch, CUDA; (5) environment — pinned library versions (Docker image or conda lock file). Any single missing element breaks reproducibility.",
      hints: [
        "A hyperparameter config without a data version doesn\'t tell you what data the model was trained on.",
        "Library version drift (e.g., PyTorch 1.13 vs. 2.0) can change numerical results even with fixed seeds.",
      ],
    },
    {
      id: "q-msd-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Continuous training (automatically retraining on new production data) always improves model quality compared to periodic manual retraining.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        'Continuous training introduces risks: a data pipeline bug can corrupt training data, a sudden distribution shift can degrade the model, and noisy labels from a new data source can reduce quality. Continuous training pipelines require validation gates (e.g., "new model must achieve AUC ≥ current model − 0.01 on a holdout set") and automated rollback before promotion.',
      hints: [
        "Automation increases velocity but requires guard rails — otherwise a bad data batch retrains a worse model.",
        "A feedback loop bug (wrong labels) will silently degrade a continuously-training model.",
      ],
    },
    {
      id: "q-msd-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Training a large recommendation model on 8 GPUs, you observe GPU utilization at 25% despite CPU utilization at 95%. What is the bottleneck and the fix?",
      options: [
        "The optimizer step is too slow; switch from Adam to SGD.",
        "The data preprocessing pipeline is CPU-bound and cannot feed data to GPUs fast enough. Fix: use multiple workers (num_workers), prefetching, pre-tokenization/caching, and possibly GPU-resident data loading.",
        "The model is too large and causes GPU memory fragmentation.",
        "The learning rate is too high, causing frequent NaN losses that stall computation.",
      ],
      correctAnswer: 1,
      explanation:
        "Low GPU utilization with high CPU utilization is the classic signature of a data pipeline bottleneck: the GPU sits idle waiting for batches the CPU is still preprocessing. Fixes include: increasing num_workers (parallel data loading), using prefetch_factor (prefetch batches into GPU memory), pre-caching tokenized data to disk, and using DALI or other GPU-accelerated data pipelines.",
      hints: [
        "GPU utilization = (time GPU is computing) / (total time). Low GPU, high CPU means GPU is waiting for data.",
        "The fix is always on the data pipeline side — not the model or optimizer.",
      ],
    },
  ],

  "serving-design": [
    {
      id: "q-msd-kp7-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the purpose of model shadow deployment (shadow mode) before a full production rollout?",
      options: [
        "To reduce serving costs by running the new model on only 10% of traffic.",
        "To route all production traffic to both the old and new model simultaneously, log the new model\'s outputs for comparison, but only serve the old model\'s response to users — allowing validation without user impact.",
        "To test the model on synthetic traffic before any real users are exposed.",
        "To A/B test two models by splitting user traffic between them.",
      ],
      correctAnswer: 1,
      explanation:
        "Shadow deployment mirrors all production traffic to the new model but discards its response — users always receive the old model\'s output. This validates that the new model produces correct outputs, meets latency SLOs under real traffic patterns, handles edge cases, and does not crash — all without any risk to users. Only after shadow validation passes is the model promoted to canary or A/B testing.",
      hints: [
        "Shadow mode: both models run, old model serves. A/B test: different users get different models.",
        "Shadow deployment is the safest validation step: zero user impact, full real-traffic validation.",
      ],
    },
    {
      id: "q-msd-kp7-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "INT8 quantization of a neural network always degrades model accuracy compared to FP32, making it unsuitable for production serving.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Post-training INT8 quantization often achieves accuracy within 0.5-1% of FP32 on most tasks while reducing model size by 4× and inference latency by 2-4×. Quantization-aware training (QAT) further closes the accuracy gap. For well-calibrated models on tasks like image classification, speech recognition, and NLP classification, INT8 is routinely used in production (e.g., TensorRT, OpenVINO deployments). Accuracy loss only becomes significant for tasks requiring fine-grained numerical precision.",
      hints: [
        "BERT-base with INT8 quantization achieves within 1% of FP32 on GLUE while being 2× faster.",
        "Quantization-aware training (QAT) simulates quantization during training, reducing the accuracy gap further.",
      ],
    },
    {
      id: "q-msd-kp7-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A recommendation serving system processes requests with a two-stage pipeline: ANN retrieval (5 ms) → feature fetch (10 ms) → reranking model (20 ms) → post-processing (2 ms). The p99 end-to-end latency is 80 ms. Which optimization gives the largest gain?",
      options: [
        "Optimize the ANN retrieval step from 5 ms to 3 ms.",
        "Parallelize feature fetch and early processing steps that do not depend on each other; pipeline ANN retrieval output into feature fetch to overlap I/O and compute.",
        "Replace the reranking model with a faster model that increases latency from 20 ms to 15 ms.",
        "Remove the post-processing step (2 ms savings).",
      ],
      correctAnswer: 1,
      explanation:
        "The total sequential latency is 5+10+20+2=37 ms but p99 is 80 ms — indicating tail latency from I/O and queuing. Parallelizing independent steps (e.g., fetching user features and item features in parallel during feature fetch; starting feature pre-fetch during ANN retrieval) eliminates serial waits. This is the highest-leverage optimization: cutting 10 ms of serial I/O by parallelizing can halve end-to-end p99. Optimizing the already-fast 5 ms or 2 ms steps yields minimal gain.",
      hints: [
        "Amdahl\'s Law: speed up the slowest sequential step. Feature fetch and reranking dominate.",
        "I/O-bound steps (feature fetch from Redis) can be parallelized — fire all requests simultaneously instead of sequentially.",
      ],
    },
    {
      id: "q-msd-kp7-7",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A model serving system experiences a sudden spike from 1,000 to 10,000 QPS. The auto-scaler takes 3 minutes to provision new replicas. During those 3 minutes, which technique best handles the overload without dropping requests?",
      options: [
        "Increase the model batch size dynamically to process more requests per inference call.",
        "Use request queuing with a bounded queue: accept incoming requests into a queue up to a capacity limit, process them as resources allow, and return a 503 with Retry-After for requests that exceed the queue depth.",
        "Reduce model precision from FP16 to INT4 to speed up inference during the spike.",
        "Route excess requests to a slower CPU-based fallback model.",
      ],
      correctAnswer: 1,
      explanation:
        "During a scaling lag, bounded request queuing provides graceful degradation: requests queue until replicas are available, and once the queue is full, new requests get a structured error (503 + Retry-After) that allows clients to retry. This is better than dropping connections silently or letting queues grow unboundedly (causing timeouts). Dynamic batching (option A) helps but cannot absorb a 10× traffic spike alone. The CPU fallback (option D) is a valid secondary measure but is not the primary overload handling technique.",
      hints: [
        "Unbounded queues = OOM crashes. Bounded queues = structured failure with retry signals.",
        "503 + Retry-After is the correct HTTP response for overload — clients know to retry in N seconds.",
      ],
    },
    {
      id: "q-msd-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A content platform needs to serve personalized home feed recommendations to 50 million daily active users when they open the app. The app opening latency SLO is p99 < 200 ms. Which serving strategy is most appropriate?",
      options: [
        "Real-time online serving: run the recommendation model for each user at app-open time.",
        "Pre-computed batch inference: run a nightly batch job to compute top-100 recommendations for each user, store in a fast key-value store (Redis), and serve the cached result at app-open time.",
        "Edge inference: run the model on the user\'s device.",
        "Only serve recommendations for users who opened the app in the past hour.",
      ],
      correctAnswer: 1,
      explanation:
        "Running a heavy recommendation model for 50M users at app-open time is infeasible at p99 < 200 ms. Pre-computing recommendations in a nightly batch job and caching in Redis enables sub-millisecond retrieval. The trade-off is recommendation staleness (up to 24 hours), which is acceptable for home feed content. Real-time signals (e.g., recent clicks) can be layered on top.",
      hints: [
        "50M requests at app-open peak could be 1M+ QPS — serving a heavy model in real time at that scale requires enormous infrastructure.",
        "Redis GET latency is ~0.1 ms; a recommendation model call is 10–100 ms — a 100–1000× difference.",
      ],
    },
    {
      id: "q-msd-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "vLLM\'s continuous batching (also called iteration-level scheduling) improves LLM serving throughput by allowing new requests to join an in-progress batch when earlier requests in that batch finish generating their sequences.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Traditional static batching waits for all requests in a batch to finish before starting new ones — requests that finish early leave GPU capacity idle. vLLM\'s continuous batching schedules at the token generation step level: when a sequence completes (hits EOS or max_tokens), its slot is immediately filled by a waiting request. This dramatically improves GPU utilization and throughput for variable-length LLM outputs.",
      hints: [
        "LLM outputs vary greatly in length — one request may finish in 10 tokens while another takes 1000.",
        "Static batching wastes GPU cycles waiting for the longest request; continuous batching fills those cycles.",
      ],
    },
    {
      id: "q-msd-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You must serve a 70B-parameter LLM with p99 first-token latency < 500 ms for a customer-facing chat application at 1,000 QPS. Which combination of techniques is MOST effective?",
      options: [
        "Run on a single A100 80 GB GPU with FP32 precision.",
        "Use tensor parallelism across 4–8 GPUs (e.g., 4×A100), FP16 quantization, vLLM continuous batching, and KV cache with PagedAttention.",
        "Run on CPU cluster with 128 cores and aggressive caching.",
        "Distill to a 7B model and serve on a single T4 GPU with no other optimizations.",
      ],
      correctAnswer: 1,
      explanation:
        "A 70B model in FP16 requires ~140 GB VRAM — exceeding a single 80 GB GPU. Tensor parallelism across 4–8 A100s splits the model across devices. FP16 halves memory vs. FP32. vLLM\'s continuous batching maximizes GPU utilization; PagedAttention manages KV cache memory without fragmentation. Together these achieve the throughput and latency targets at 1,000 QPS.",
      hints: [
        "70B × 2 bytes/param (FP16) = 140 GB — requires at least 2× A100 80 GB. 4× gives compute headroom.",
        "PagedAttention (vLLM) stores KV cache in non-contiguous pages, eliminating memory waste from reserved-but-unused cache slots.",
      ],
    },
  ],

  "recommendation-design": [
    {
      id: "q-msd-kp8-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A new user signs up for a music streaming app and has no listening history. Which strategy best addresses the cold start problem for recommendations?",
      options: [
        "Show an empty recommendations page until the user has listened to 10 songs.",
        "Ask the user to select 3-5 favorite artists or genres during onboarding, then recommend based on collaborative filtering from similar users who share those preferences.",
        "Recommend only the globally most popular songs to every new user.",
        "Wait 24 hours and then start collecting implicit signals.",
      ],
      correctAnswer: 1,
      explanation:
        "The cold start problem (no user history) is best addressed by explicit preference elicitation (onboarding survey) combined with collaborative filtering: find users with similar stated preferences and use their listening history to bootstrap recommendations. Pure popularity-based recommendations (option C) are simple but miss personalization. Hybrid approaches layer popularity as a fallback with collaborative filtering as history accumulates.",
      hints: [
        "Cold start = no user history. Solutions: ask the user, use popularity, or use demographic similarity.",
        "Even 3 stated artist preferences dramatically narrows the recommendation space and enables collaborative filtering.",
      ],
    },
    {
      id: "q-msd-kp8-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Item-to-item collaborative filtering (recommending items similar to what the user last interacted with) inherently suffers from filter bubble effects that user-to-user collaborative filtering does not.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Both item-to-item and user-to-user collaborative filtering can cause filter bubbles. Item-to-item tends to recommend similar items (e.g., more of the same genre), narrowing diversity. User-to-user can equally narrow recommendations if similar users share the same homogeneous taste. The filter bubble is a property of the feedback loop architecture and optimization objective, not just the CF variant. Diversity-promoting objectives (MMR, DPP) and explicit exploration mechanisms address filter bubbles in both approaches.",
      hints: [
        "Filter bubble = the system only shows content similar to past behavior, narrowing exposure over time.",
        "Both CF variants create echo chambers if they purely optimize for similarity without diversity objectives.",
      ],
    },
    {
      id: "q-msd-kp8-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You are designing an embedding-based retrieval system for 1 billion items. User and item embeddings are 128-dimensional float32. Which ANN index structure and tradeoff is most appropriate for this scale?",
      options: [
        "Flat (exhaustive) search index — guarantees exact nearest neighbors at any scale.",
        "HNSW (Hierarchical Navigable Small World) index with ef_construction=200 and ef=100 at query time: sub-linear query time O(log n), 95%+ recall@10, ~64 GB memory for 1B 128-dim vectors at compressed precision.",
        "LSH (Locality-Sensitive Hashing) with 64 hash tables — low memory, fast queries.",
        "Product quantization (PQ) without any graph index — minimal memory, acceptable recall.",
      ],
      correctAnswer: 1,
      explanation:
        "At 1B items, HNSW provides the best recall-latency tradeoff: O(log n) query complexity, >95% recall@10 with appropriate ef settings. Memory: 1B × 128 × 4 bytes = 512 GB (FP32); with PQ compression or FP16 → 128-256 GB, achievable on a GPU cluster. Flat search at 1B items is infeasible (O(n) = 1B dot products per query). LSH has lower recall than HNSW. FAISS IVF+PQ is an alternative. HNSW is the industry standard (used in Spotify ANN, Weaviate, Qdrant).",
      hints: [
        "1B × 128 × 4 bytes = 512 GB. FP16 halves this to 256 GB — across multiple nodes.",
        "HNSW: query time O(log n) with 95%+ recall. Flat: O(n) with 100% recall. HNSW wins at 1B items.",
      ],
    },
    {
      id: "q-msd-kp8-7",
      type: "true-false",
      difficulty: "easy",
      question:
        "Online (real-time) features such as 'items clicked in the last 5 minutes' require a streaming pipeline to compute and cannot be served from a pre-materialized batch feature store.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Online features that capture very recent user behavior (session-level signals within the last minutes) change too rapidly to be served from a batch-materialized store, which is typically updated hourly or daily. They require a streaming pipeline (Flink, Kafka Streams) that computes per-user aggregations in near-real-time and writes to the online store continuously. These session features are critical for recommendation quality — a user who just clicked on action movies should immediately get more action movie recommendations.",
      hints: [
        "Batch feature: pre-computed, static, e.g., \'user\'s favorite genre over past 30 days\'.",
        "Streaming feature: computed in real time, e.g., \'items clicked in current session\'.",
      ],
    },
    {
      id: "q-msd-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A streaming service has 100 million items in its catalog. For real-time recommendations, a two-stage pipeline is used. Why can\'t the expensive ranking model be run over all 100M items?",
      options: [
        "The ranking model is not capable of scoring more than 1000 items.",
        "Running a 100 ms ranking model over 100M items sequentially takes 10,000 seconds — far beyond any real-time SLO. The retrieval stage narrows candidates to ~hundreds in milliseconds.",
        "Copyright law prevents running models over unlicensed content at scale.",
        "Ranking all items simultaneously causes GPU memory overflow.",
      ],
      correctAnswer: 1,
      explanation:
        "Serving latency is the hard constraint. A 100M-item catalog with even a 1 µs ranking model takes 100 seconds per query — unusable. The retrieval stage uses ANN search over user/item embeddings (FAISS, HNSW) to narrow 100M items to ~1,000 candidates in <10 ms. The heavy ranker then scores only those ~1,000 items, meeting latency SLOs.",
      hints: [
        "ANN retrieval: O(log n) or O(√n) to find top-k; sequential scoring: O(n). For n=100M, the difference is billions of operations.",
        "The two-stage pipeline trades retrieval recall for serving feasibility — a well-engineered trade-off.",
      ],
    },
    {
      id: "q-msd-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Matrix factorization (a form of collaborative filtering) requires explicit item content features (title, genre, description) to generate item embeddings.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Matrix factorization learns item (and user) embeddings purely from the user-item interaction matrix (ratings, clicks, watch history). It requires no content features. Content-based filtering uses item features to recommend similar items. Hybrid systems combine both. Netflix\'s original recommendation system used collaborative filtering before it had rich content metadata.",
      hints: [
        '"Collaborative" refers to leveraging the collective interactions of all users — no content required.',
        "Item embeddings from MF capture latent factors (e.g., genre taste) purely from interaction patterns.",
      ],
    },
    {
      id: "q-msd-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A recommendation system optimized purely for 7-day click-through rate (CTR) starts promoting increasingly sensational and polarizing content. The platform\'s 90-day user retention drops 15%. What design failure does this represent?",
      options: [
        "Underfitting — the CTR model has insufficient capacity.",
        "Reward hacking / metric misalignment: the system maximizes the proxy metric (7-day CTR) at the expense of the true objective (long-term user satisfaction and retention). CTR optimizes for clickability, not value.",
        "Data leakage from training labels into features.",
        "Cold start failure for new users who have no click history.",
      ],
      correctAnswer: 1,
      explanation:
        "This is the classic recommendation alignment failure: CTR is a proxy for engagement, not satisfaction. Sensational content drives clicks (high proxy metric) while eroding trust and long-term retention (the true objective). YouTube, Facebook, and Twitter have all documented this failure. Mitigation requires optimizing multi-objective rewards that include long-term signals (e.g., subscription retention, explicit satisfaction surveys).",
      hints: [
        'This is Goodhart\'s Law applied to ML: "When a measure becomes a target, it ceases to be a good measure."',
        "CTR ≠ user value. A click and immediate regret still counts as a click in the training signal.",
      ],
    },
  ],

  "search-ranking-design": [
    {
      id: "q-msd-kp9-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A dense retrieval model (bi-encoder) is trained using contrastive learning with in-batch negatives. What are 'in-batch negatives' and why are they used?",
      options: [
        "Negatives are drawn from a separate hard-negative mining step before training.",
        "For each (query, positive_doc) pair in a batch, all other documents in the batch serve as negative examples. This is computationally efficient because the batch\'s document encodings are already computed.",
        "Negatives are random documents sampled uniformly from the corpus at each step.",
        "Negatives are documents flagged as irrelevant by human annotators.",
      ],
      correctAnswer: 1,
      explanation:
        "In-batch negatives reuse document encodings already computed for other training pairs in the same batch as negatives for each query. With batch size B, each (query, positive) pair gets B-1 negatives at no extra encoding cost. This makes contrastive training highly efficient. The limitation is that some in-batch negatives may be 'false negatives' (actually relevant documents) — a problem mitigated by hard negative mining from BM25 or a previous model checkpoint.",
      hints: [
        "Batch size 256: each query gets 255 in-batch negatives. Only 256 document encodings are needed, not 256×256.",
        "False negatives (relevant docs treated as negatives) in in-batch training reduce training signal quality.",
      ],
    },
    {
      id: "q-msd-kp9-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Query expansion (adding synonyms and related terms to a query before retrieval) always improves precision in keyword-based search systems.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Query expansion improves recall (finding more relevant documents) but typically hurts precision (adding noise from irrelevant expanded terms). For example, expanding 'apple' to include 'fruit, iPhone, company' may retrieve relevant iPhone documents but also fruit recipes and company filings. Controlled query expansion (using domain-specific dictionaries or model-generated expansions limited to high-confidence synonyms) is required to prevent precision degradation. Pseudo-relevance feedback can also introduce topic drift.",
      hints: [
        "Recall: did we find all relevant documents? Precision: of what we found, how much is relevant?",
        "Query expansion: better recall, often worse precision — a fundamental information retrieval trade-off.",
      ],
    },
    {
      id: "q-msd-kp9-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A product search system must handle queries in 50 languages, with the product catalog also in 50 languages. Cross-lingual retrieval (Spanish query → English product title) is required. Which architecture best solves this?",
      options: [
        "Run BM25 separately for each language pair — 2500 separate indices.",
        "Train a multilingual bi-encoder (e.g., fine-tuned mE5 or LaBSE) that maps queries and documents from all 50 languages into a single shared embedding space, enabling cross-lingual dot product similarity.",
        "Machine-translate all queries to English before retrieval, then use an English-only bi-encoder.",
        "Use language detection followed by a separate monolingual model for each language.",
      ],
      correctAnswer: 1,
      explanation:
        "Multilingual bi-encoders (mE5, LaBSE, mDPR) encode queries and documents from any language into a single aligned embedding space where semantically equivalent text from different languages has high cosine similarity. This enables cross-lingual retrieval natively without machine translation. MT adds latency and translation errors; 50 separate monolingual models are maintenance-heavy and cannot handle cross-lingual queries.",
      hints: [
        "LaBSE (Language-agnostic BERT Sentence Embeddings) was trained on 109 languages with translation pairs — encodings are cross-lingually aligned.",
        "Cross-lingual embedding: Spanish \'manzana\' and English \'apple\' map to nearby vectors in the embedding space.",
      ],
    },
    {
      id: "q-msd-kp9-7",
      type: "true-false",
      difficulty: "medium",
      question:
        "Mean Reciprocal Rank (MRR) and NDCG@10 always agree on which ranking system is better when comparing two systems on the same query set.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "MRR measures where the first relevant result appears (1/rank_of_first_relevant). NDCG@10 measures the quality of the entire top-10 list, rewarding systems that place multiple relevant results early with higher relevance grades. A system with perfect MRR (first result always relevant) but poor NDCG@10 (only the first result is relevant) can lose to a system with lower MRR but many moderately-relevant results in the top 10. The two metrics optimize for different aspects of ranking quality.",
      hints: [
        "MRR: did we get the first relevant result right? NDCG@10: how good is the full top-10 list?",
        "A navigational query ('Wikipedia homepage') rewards MRR; an exploratory query rewards NDCG@10.",
      ],
    },
    {
      id: "q-msd-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "NDCG@10 is the standard ranking quality metric for search systems. What property makes it more appropriate than accuracy for evaluating search rankings?",
      options: [
        "NDCG@10 is faster to compute than accuracy for large document sets.",
        "NDCG@10 rewards systems that place highly relevant documents at the top of the list, applying a logarithmic discount to positions lower in the ranking.",
        "NDCG@10 is scale-invariant and does not require normalization.",
        "NDCG@10 only considers binary relevance (relevant/not relevant), making it simpler.",
      ],
      correctAnswer: 1,
      explanation:
        "NDCG (Normalized Discounted Cumulative Gain) sums relevance scores with position discounts: DCG@k = Σ (rel_i / log_2(i+1)) for i=1..k. The log discount means rank 1 gets full credit, rank 2 gets half, rank 3 gets one-third, etc. Normalization by ideal DCG makes it comparable across queries. This captures that a highly relevant document at rank 5 is worse than at rank 1.",
      hints: [
        "A system returning all relevant documents at rank 10 would score high on accuracy but low on NDCG.",
        'The "D" in NDCG stands for Discounted — positions further down contribute logarithmically less.',
      ],
    },
    {
      id: "q-msd-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a hybrid search system, BM25 scores and dense embedding similarity scores can be combined via linear interpolation: final_score = α × BM25 + (1−α) × cosine_similarity. This combination typically outperforms either alone.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "BM25 excels at exact keyword matching (high precision for rare terms); dense bi-encoders excel at semantic matching (capturing paraphrases and synonyms). Their failure modes differ: BM25 misses semantic matches, dense models miss rare/specific terms. Linear interpolation (with α tuned on a validation set) combines their strengths, a technique called hybrid retrieval. Reciprocal Rank Fusion (RRF) is an alternative that does not require score normalization.",
      hints: [
        'Query "myocardial infarction": BM25 finds exact matches; dense model also finds "heart attack" documents.',
        'Query "Apple Inc. Q3 earnings": BM25 is reliable for specific terms; dense models may hallucinate semantic similarity.',
      ],
    },
    {
      id: "q-msd-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A two-tower (bi-encoder) retrieval model encodes queries and documents independently. A cross-encoder reranker receives (query, document) pairs. Why are cross-encoders used only for reranking a small candidate set rather than retrieval over the full corpus?",
      options: [
        "Cross-encoders cannot process text longer than 512 tokens.",
        "Cross-encoders perform full attention between query and document tokens, requiring O(n × d) inference for n documents — infeasible at corpus scale. Bi-encoders pre-compute document embeddings offline, enabling ANN retrieval in O(log n).",
        "Cross-encoders are less accurate than bi-encoders for relevance scoring.",
        "Cross-encoders do not support GPU acceleration.",
      ],
      correctAnswer: 1,
      explanation:
        "Cross-encoders process query and document together in a single forward pass, enabling deep interaction modeling for high accuracy. But this requires running the model for every (query, document) pair at query time — O(corpus_size) inference per query, infeasible for millions of documents. Bi-encoders pre-compute document embeddings offline; at query time only the query is encoded and ANN search finds top-k candidates in milliseconds.",
      hints: [
        "1M documents × 50 ms cross-encoder inference = 50,000 seconds per query. Unusable.",
        "The two-stage pattern: fast bi-encoder retrieval (100K→1K) → accurate cross-encoder reranking (1K→10).",
      ],
    },
  ],

  "fraud-detection-design": [
    {
      id: "q-msd-kp10-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A fraud detection model must decide in real time whether to block a payment. The cost of a false negative (missed fraud) is $200 on average, and the cost of a false positive (blocking a legitimate transaction) is $10 in customer friction and support costs. How should the decision threshold be set?",
      options: [
        "At probability 0.5 — the standard decision boundary.",
        "Lower than 0.5 — since false negatives are 20× more costly than false positives, the model should flag more transactions (be more conservative) to catch more fraud even at the cost of more false positives.",
        "Higher than 0.5 — precision is more important than recall in fraud detection.",
        "The threshold should not be changed from the default; business costs do not affect model thresholds.",
      ],
      correctAnswer: 1,
      explanation:
        "The optimal decision threshold is cost-sensitive: with FN cost = $200 and FP cost = $10, the cost ratio is 20:1. The Bayes optimal threshold is P(fraud) > FP_cost / (FP_cost + FN_cost) = 10 / (10 + 200) ≈ 0.048. This means flag any transaction with >4.8% fraud probability. This threshold explicitly encodes the business cost trade-off into the decision rule. Standard 0.5 threshold ignores the asymmetric cost structure.",
      hints: [
        "Optimal threshold = FP_cost / (FP_cost + FN_cost) = 10 / 210 ≈ 0.048.",
        "Asymmetric costs shift the threshold: the more costly the false negative, the lower the threshold.",
      ],
    },
    {
      id: "q-msd-kp10-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Graph-based fraud detection (modeling account relationships as a graph and using graph neural networks) is superior to tabular feature-based models for detecting all types of fraud.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Graph-based fraud detection excels at detecting coordinated fraud rings where multiple accounts collaborate (e.g., synthetic identity fraud networks, mule account networks). For isolated individual fraud (e.g., a single stolen card used for unauthorized purchases), tabular GBDTs with velocity features (transaction count in 1h, spending pattern deviation) are typically more effective and faster to serve. The best production systems combine both: tabular features for fast first-pass scoring and GNNs for network-level signals.",
      hints: [
        "GNNs: powerful for detecting connected fraud rings. GBDTs: powerful for individual transaction anomaly detection.",
        "Production fraud systems typically use both: tabular model for <50 ms decision, GNN for post-authorization review.",
      ],
    },
    {
      id: "q-msd-kp10-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A fraud model achieves 85% recall and 70% precision on the test set. In production, you observe recall dropping to 60% within 3 months. The fraud rate has not changed. What is the most likely cause and corrective action?",
      options: [
        "The test set was too small; retrain with more data.",
        "Adversarial concept drift: fraudsters are adapting their behavior patterns to evade the model. Corrective action: continuous model monitoring with adversarial feature drift detection, frequent retraining on recent data, and active collection of new fraud patterns.",
        "The serving infrastructure has bugs causing wrong predictions.",
        "The model was overfitted to the test set; apply stronger regularization.",
      ],
      correctAnswer: 1,
      explanation:
        "Fraud is adversarial: once a model is deployed, fraudsters study its decision boundaries and change their behavior to evade detection. This is a domain-specific form of concept drift. The corrective action includes: (1) monitoring feature distributions and model output distributions for drift; (2) retraining on recent fraud patterns (frequent, e.g., daily/weekly); (3) active investigation of false negatives to discover new fraud patterns; (4) rule-based overrides for newly discovered fraud patterns while retraining.",
      hints: [
        "Adversarial drift: fraudsters observe which transactions are blocked and change patterns to avoid detection.",
        "Fraud model recall: never monitor only on fixed test sets. Monitor on a sliding window of recent production outcomes.",
      ],
    },
    {
      id: "q-msd-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A real-time fraud detection system must decide within the payment authorization window. What is the realistic end-to-end latency budget for the ML inference call itself?",
      options: [
        "5–10 seconds — payment authorization is an asynchronous process.",
        "<50 ms — the total authorization timeout is ~200 ms, leaving <50 ms for ML inference after feature retrieval and I/O overhead.",
        "Exactly 1 second — regulatory standards require 1-second fraud decisions.",
        "Latency does not matter for fraud detection since it runs asynchronously.",
      ],
      correctAnswer: 1,
      explanation:
        "Payment authorization has a hard total timeout of ~200 ms (Visa/Mastercard standards). Subtracting network round-trip (~20 ms), feature store lookup (~5 ms), and response processing (~10 ms), the ML model inference must complete in <50 ms. This eliminates transformer-based models and favors gradient boosted trees (GBDT) or shallow neural networks with pre-materialized features.",
      hints: [
        "The 200 ms total authorization budget is split across: network, feature retrieval, ML inference, response — each must be fast.",
        "LightGBM/XGBoost inference typically runs in 1–5 ms — well within budget; a BERT model takes 50–200 ms.",
      ],
    },
    {
      id: "q-msd-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using the raw transaction timestamp as a feature in a fraud detection model is always safe and does not risk data leakage.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Raw timestamps can cause label leakage because fraud labels (chargebacks) are typically assigned days to weeks after the transaction occurs. If the training dataset is built with the chargeback-date timestamp rather than the transaction-date timestamp, the model learns to associate temporal patterns with future labels it could not know at inference time. Safe alternatives include derived temporal features (hour of day, day of week) computed from the transaction timestamp only.",
      hints: [
        "A chargeback filed 30 days after the transaction means the label was not available at transaction time.",
        "Using any feature that encodes information about the future label is leakage.",
      ],
    },
    {
      id: "q-msd-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A fraud detection model achieves 99.5% accuracy but a fraud recall of only 40%. The fraud rate in production is 0.5%. What is the false positive rate implied by these numbers, and what explains the apparent paradox?",
      options: [
        "False positive rate is ~0%; the model is highly accurate and the recall failure is due to class imbalance.",
        'At 0.5% fraud rate, predicting "not fraud" 100% of the time achieves 99.5% accuracy; the model has collapsed to the majority class, catching 0% of fraud — "40% recall" implies some minimal fraud detection with very high false negative rate.',
        "The model is overfitting to training data; accuracy does not generalize to test data.",
        "False positive rate is 60%, equal to the false negative rate.",
      ],
      correctAnswer: 1,
      explanation:
        'With 0.5% fraud rate, a trivial model predicting "not fraud" always achieves 99.5% accuracy. If the model catches 40% of actual fraud (recall=0.4) and the fraud rate is 0.5%, then: frauds caught = 0.4 × 0.5% = 0.2% of all transactions flagged as fraud; false positive rate is effectively near 0% but the useful metric — precision and recall at the fraud class — is what matters. This illustrates why accuracy is a misleading metric for imbalanced classification.',
      hints: [
        "0.5% fraud rate: if 10M transactions/day, 50K are fraud. 40% recall = 20K caught; 30K missed (false negatives).",
        "The correct metrics: recall (did we catch enough fraud?) and precision (how many flags are real fraud?).",
      ],
    },
  ],

  "ads-ranking-design": [
    {
      id: "q-msd-kp11-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a second-price auction (Vickrey auction), the winner pays the second-highest bid. Why do second-price auctions incentivize honest bidding?",
      options: [
        "Because the winner pays less, so they can afford to bid higher.",
        "Because bidding true value is the dominant strategy: bidding higher cannot increase the amount paid (determined by others), and bidding lower risks losing the auction without saving money.",
        "Because advertisers cannot see other bids, so they must guess and bid honestly.",
        "Because the platform monitors bids and penalizes dishonest advertisers.",
      ],
      correctAnswer: 1,
      explanation:
        "In a second-price auction, the winner pays the runner-up\'s bid, not their own. If your true value is $5: bidding $5 means you win when you should (when others bid <$5) and pay the second-highest price. Bidding $7 wins you the same auctions (still beats the same set of competitors) and pays the same second price — no benefit. Bidding $3 might cause you to lose auctions where you would have been profitable. Hence, bidding true value is weakly dominant.",
      hints: [
        "Second-price: winner pays runner-up\'s bid. First-price: winner pays own bid.",
        "Bidding above true value: same wins, same price — no gain. Bidding below: same price if you win, but risk losing.",
      ],
    },
    {
      id: "q-msd-kp11-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "A generalized second-price (GSP) auction used in sponsored search is equivalent to a truthful Vickrey-Clarke-Groves (VCG) mechanism.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "GSP is not truthful in general: bidders can benefit by bidding strategically (not at their true value), because the payment structure in GSP does not satisfy incentive compatibility for all positions. VCG is provably truthful (bidding true value is a dominant strategy) but computationally expensive and rarely used in practice. Google\'s original AdWords used GSP, not VCG. The distinction matters for mechanism design in ads systems.",
      hints: [
        "Truthful mechanism: bidding true value is always optimal, regardless of others\' bids.",
        "GSP is simpler and commonly used; VCG is truthful but computationally complex for multiple slots.",
      ],
    },
    {
      id: "q-msd-kp11-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An ads ranking system uses a two-tower model to predict pCTR: user tower (200 features) and ad tower (150 features) produce 64-dim embeddings, combined via dot product. The pCTR model is miscalibrated: predicted pCTR is on average 2× higher than observed CTR. What is the most efficient calibration fix without retraining the model?",
      options: [
        "Retrain the full two-tower model with a calibration objective.",
        "Apply Platt scaling: train a logistic regression on (model output, observed label) pairs using recent production data, then use the regression to map raw model outputs to calibrated probabilities.",
        "Multiply all pCTR predictions by 0.5 uniformly.",
        "Filter out low-pCTR predictions below 0.01.",
      ],
      correctAnswer: 1,
      explanation:
        "Platt scaling is the standard post-hoc calibration technique: fit a logistic regression f(x) = 1 / (1 + exp(-(a*s + b))) where s is the model score, using (score, observed_label) pairs from recent production data. This learns the correct mapping without retraining the full model. A uniform 0.5× multiplier (option C) only corrects the overall mean but not distributional shape. Platt scaling corrects both mean and shape. Temperature scaling is an alternative for neural classifiers.",
      hints: [
        "Calibration: the model\'s predicted probabilities should match empirical frequencies.",
        "Platt scaling: one logistic regression layer on top of the existing model\'s outputs — cheap and effective.",
      ],
    },
    {
      id: "q-msd-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a real-time ads auction, expected revenue per slot is computed as bid × pCTR (predicted click-through rate). Advertiser A bids $5 with pCTR 0.02; Advertiser B bids $2 with pCTR 0.08. Which wins the auction and by how much?",
      options: [
        "A wins: $5 bid > $2 bid.",
        "B wins: expected revenue $2 × 0.08 = $0.16 > $5 × 0.02 = $0.10.",
        "A wins: 0.02 pCTR is more precise than 0.08.",
        "Tie: both have positive expected revenue.",
      ],
      correctAnswer: 1,
      explanation:
        "Ad auctions rank by expected revenue = bid × pCTR, not by bid alone. Advertiser B: $2 × 0.08 = $0.16. Advertiser A: $5 × 0.02 = $0.10. B wins despite the lower bid because its higher pCTR more than compensates. This is why pCTR model quality directly impacts auction revenue — miscalibrated pCTR can misrank advertisers and cost the platform money.",
      hints: [
        "A high bid with low CTR may generate less revenue than a lower bid with high CTR.",
        "This is why both bid accuracy (advertiser) and pCTR accuracy (platform model) are critical.",
      ],
    },
    {
      id: "q-msd-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For ads ranking systems, calibration of pCTR (i.e., predicted probabilities match observed click rates) is more important than AUC because auction pricing and budget pacing depend on the absolute probability value.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "AUC-ROC measures ranking quality (can you distinguish clickers from non-clickers?) but not calibration (does pCTR=0.02 mean ~2% of similar ads are clicked?). Auction clearing prices, second-price auction mechanics, and advertiser budget pacing all depend on absolute pCTR values. A perfectly ranked but poorly calibrated model can systematically over- or under-charge advertisers, causing billing errors and budget misallocation.",
      hints: [
        "A model with pCTR=0.10 when true CTR is 0.01 will over-charge winners and mis-pace budgets.",
        "IPS is the standard causal debiasing technique in recommender systems.",
      ],
    },
    {
      id: "q-msd-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Position bias in ads — where ads shown at higher positions receive more clicks regardless of quality — causes pCTR models trained on observed clicks to be biased. Which technique corrects for this during training?",
      options: [
        "Remove all training examples from the first 3 feed positions.",
        "Use inverse propensity scoring (IPS): weight each training example by 1/P(shown at position p), where P(shown at p) is the propensity of that position in the logging policy.",
        "Add position as a feature during both training and serving to let the model learn the bias.",
        "Only train on items that appear in positions 5–20 where position bias is minimal.",
      ],
      correctAnswer: 1,
      explanation:
        "IPS debiases training by weighting clicks inversely proportional to the propensity of being shown at that position. A click at position 1 (propensity 1.0) gets weight 1; a click at position 10 (propensity 0.3) gets weight 3.3, correcting for the fact that position-10 items are seen less often. Alternatively, a position-aware model learns a separate observation probability and factors it out during ranking inference.",
      hints: [
        'Without debiasing: the model learns "top positions → high CTR" rather than "relevant items → high CTR."',
        "IPS is the standard causal debiasing technique in recommender systems.",
      ],
    },
  ],

  "feed-ranking-design": [
    {
      id: "q-msd-kp12-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A social media feed ranking model scores each post with a single score and ranks them in descending order. A user follows 500 people who post 2,000 items/day. Why is this approach insufficient for a high-quality feed?",
      options: [
        "The model cannot process 2,000 posts fast enough to meet latency requirements.",
        "A purely score-based ranking ignores diversity and recency: a single viral topic could fill the entire feed, and older but still-relevant posts compete unfairly with brand-new content.",
        "Score-based ranking requires more training data than is available.",
        "Users follow too many people for collaborative filtering to work effectively.",
      ],
      correctAnswer: 1,
      explanation:
        "Pure score-based ranking suffers from two problems: (1) topic concentration — if 10 friends post about the same event, the top 20 feed slots are all the same topic, reducing diversity; (2) recency vs. relevance trade-off — a highly relevant 2-day-old post competes with less relevant but newer posts. Production feed systems use diversity re-ranking (MMR, DPP) and recency decay to balance relevance, diversity, and freshness.",
      hints: [
        "Diversity: user wants to see multiple topics, not 20 posts about one sports game.",
        "Recency decay: a 1-hour-old post of moderate relevance beats a 48-hour-old post of slightly higher relevance.",
      ],
    },
    {
      id: "q-msd-kp12-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a feed ranking system, training on historical user interactions creates a feedback loop that can amplify existing biases in content recommendations over time.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "The feedback loop works as follows: (1) the current model ranks content A highly → users click on A → A generates more training signal → the next model ranks A even higher → A crowds out content B. If the current model has a bias toward certain content types (e.g., sensational content), each training iteration amplifies that bias. Breaking the loop requires exploration (showing non-top-ranked content to collect unbiased signal), causal methods (IPS debiasing), and diversity objectives.",
      hints: [
        "Feedback loop: model biases influence what data is collected, which retrains a more biased model.",
        "The only way to break the loop is to show content the model would NOT have ranked highly — deliberate exploration.",
      ],
    },
    {
      id: "q-msd-kp12-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A feed ranking system uses a multi-objective reward: R = w1 × p_like + w2 × p_share + w3 × p_comment − w4 × p_hide. How should the weights be tuned and what is the risk of this approach?",
      options: [
        "Tune weights using gradient descent on a held-out validation set with a combined accuracy metric.",
        "Tune weights via online A/B experiments that vary weight combinations, measuring long-term user retention and satisfaction — not just engagement. Risk: the learned weights may over-optimize short-term proxy signals and miss long-term user value.",
        "Set weights based on revenue contribution: shares generate more viral reach so w2 should be highest.",
        "Use Bayesian optimization to minimize cross-entropy loss across all four objectives simultaneously.",
      ],
      correctAnswer: 1,
      explanation:
        "Weight tuning for multi-objective feed ranking requires online experiments because the right objective is long-term user value — not any single offline metric. Different weight combinations should be A/B tested against long-term metrics (7-day/30-day retention, satisfaction surveys, session length trends). The risk of static weights is Goodhart\'s Law: the system will exploit whichever proxy signals have high weights, potentially gaming them at the expense of true user value.",
      hints: [
        "Offline tuning optimizes proxy metrics; online A/B tests measure actual user outcomes.",
        "Goodhart\'s Law: if shares have weight w2=10, the model will surface shareable-but-not-valuable content.",
      ],
    },
    {
      id: "q-msd-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A social media feed ranking model uses engagement signals as training labels. Which signal is the WORST proxy for long-term user satisfaction?",
      options: [
        "Comment with 3+ sentences (indicates deep engagement).",
        "Reshare to close friends only.",
        "Rage click / angry reaction on inflammatory content — the user engaged but felt worse afterward.",
        "30-second video view completion rate.",
      ],
      correctAnswer: 2,
      explanation:
        "Angry reactions indicate emotional arousal and engagement (the model\'s signal) but negative user experience (the true objective). Content that triggers outrage maximizes short-term engagement signals while degrading long-term satisfaction and mental health. This is the metric misalignment problem: the proxy (engagement) diverges from the true objective (user wellbeing and retention).",
      hints: [
        'Engagement ≠ satisfaction. A user spending 5 minutes in outrage is "engaging" but not benefiting.',
        "Long-term signals like weekly active return rate or satisfaction surveys better capture true user value.",
      ],
    },
    {
      id: "q-msd-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Optimizing a news feed purely for dwell time (seconds spent reading a post) reliably improves long-term user retention and satisfaction.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Dwell time can be maximized by outrage-inducing, anxiety-provoking, or clickbait content that holds attention without providing value. Multiple platforms have found that dwell-time optimization decreases long-term retention, increases churn, and correlates with negative user wellbeing. Multi-objective optimization combining dwell time with explicit satisfaction signals (surveys) and return visit rate better captures true user value.",
      hints: [
        "A user angry-scrolling for 20 minutes has high dwell time but low satisfaction.",
        "Dwell time on low-quality content is indistinguishable from dwell time on high-quality content in the training signal.",
      ],
    },
    {
      id: "q-msd-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A feed ranking model is trained on user clicks, but clicks are heavily influenced by position (position bias). Training directly on observed clicks will produce a biased model. Which approach correctly addresses this?",
      options: [
        "Remove all training examples from the first 3 feed positions.",
        "Use inverse propensity scoring (IPS) weighted by the probability of each item being shown at its logged position, or train a position-aware model that explicitly models the observation probability.",
        "Add position as a feature during both training and serving.",
        "Only train on items that appear in positions 5–20 where position bias is minimal.",
      ],
      correctAnswer: 1,
      explanation:
        "IPS debiases training by weighting clicks inversely proportional to the propensity of being shown at that position. A click at position 1 (propensity 1.0) gets weight 1; a click at position 10 (propensity 0.3) gets weight 3.3, correcting for the fact that position-10 items are seen less often. Alternatively, a position-aware model learns a separate observation probability and factors it out during ranking inference.",
      hints: [
        'Without debiasing: the model learns "top positions → high CTR" rather than "relevant items → high CTR."',
        "IPS is the standard causal debiasing technique in recommender systems.",
      ],
    },
  ],

  "content-moderation-design": [
    {
      id: "q-msd-kp13-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A content moderation system uses a two-stage pipeline: a fast binary classifier (stage 1) flags potentially harmful content, then a slower, more accurate model (stage 2) reviews flagged content. Why is this two-stage design used?",
      options: [
        "Because a single model cannot achieve both high precision and high recall.",
        "To reduce overall cost and latency: the fast stage-1 classifier screens the vast majority of content at low cost, and the expensive stage-2 model only processes the small fraction flagged by stage 1.",
        "Because regulations require human review before any content is removed.",
        "Because stage-1 models are always more accurate for binary classification tasks.",
      ],
      correctAnswer: 1,
      explanation:
        "At 100K QPS with 0.1% harmful content, ~100 posts/second are harmful and ~99,900 are safe. Running an expensive stage-2 model on all 100K posts/second would be prohibitively costly. Stage 1 uses a fast, high-recall (low-threshold) classifier to flag ~1,000 posts/second for review; stage 2 applies precision-optimized scoring to those 1,000. This reduces stage-2 compute by 99× while maintaining system-level recall.",
      hints: [
        "Stage 1: fast, high recall (catch everything), low precision. Stage 2: slow, high precision (confirm).",
        "Running stage 2 on 100K QPS vs. 1K QPS = 100× cost difference — the two-stage design pays for itself.",
      ],
    },
    {
      id: "q-msd-kp13-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "For content moderation, the precision-recall trade-off can be independently controlled by adjusting the model\'s classification threshold after training, without retraining the model.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "A classifier outputs a probability score for each piece of content. By adjusting the threshold (e.g., from 0.5 to 0.3 for more aggressive removal), precision and recall trade off without retraining. Lowering the threshold increases recall (catches more harmful content) but decreases precision (more false positives). Raising it does the reverse. The optimal threshold depends on the platform\'s policy goals (e.g., protecting minors requires high recall; reducing creator friction requires high precision).",
      hints: [
        "The ROC curve and Precision-Recall curve show all achievable (precision, recall) points by varying threshold.",
        "Policy decisions (how much false positive risk is acceptable) determine threshold — not the model training.",
      ],
    },
    {
      id: "q-msd-kp13-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A content moderation classifier is fine-tuned and achieves 95% precision, 90% recall on a test set of English hate speech. When deployed globally, the recall drops to 70% for non-English content and the model flags 15% of innocuous content in certain languages as harmful. What are the two distinct failure modes and their fixes?",
      options: [
        "Underfitting on non-English languages (fix: larger model) and distribution shift (fix: more test data).",
        "Cross-lingual transfer failure (recall drops because the English-trained model does not generalize to other languages — fix: multilingual fine-tuning with target-language examples) and cultural/linguistic false positive bias (the model flags culturally-specific idioms as harmful — fix: adversarial debiasing with native-language annotators).",
        "The model is overfitting to English training data (fix: add L2 regularization) and has high false positive rate globally (fix: increase the classification threshold).",
        "Insufficient training data (fix: collect more English examples) and annotation errors (fix: re-annotate the test set).",
      ],
      correctAnswer: 1,
      explanation:
        "Two distinct failures: (1) Low recall on non-English — the English-fine-tuned classifier does not generalize to other languages because of different linguistic patterns, idioms, and slang; fix: multilingual pre-trained model + few-shot fine-tuning with target-language hate speech examples. (2) False positive bias — the model confuses culturally-specific language, dialects, or code-switching with hate speech; fix: collect native-annotated examples from affected communities, apply targeted debiasing. These are separate problems requiring separate solutions.",
      hints: [
        "Low recall = missing harmful content. High false positive = incorrectly removing safe content. Both are bad, for different reasons.",
        "Cultural false positives: African American Vernacular English (AAVE) has been systematically over-flagged by English hate speech classifiers.",
      ],
    },
    {
      id: "q-msd-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A content moderation classifier is deployed at 100,000 QPS on a platform with 0.1% harmful content rate. The classifier has 99% precision and 85% recall. Approximately how many false positives (safe content incorrectly removed) does the system generate per second?",
      options: [
        "~0 — 99% precision means almost no false positives.",
        "~1,000 per second — of ~99,900 safe posts/second, 1% are incorrectly flagged.",
        "~15 per second — from the 15% recall miss rate.",
        "~100 per second — the harmful content rate drives false positives.",
      ],
      correctAnswer: 1,
      explanation:
        "At 100K QPS with 0.1% harmful rate: ~100 harmful posts/second, ~99,900 safe posts/second. At 99% precision, 1% of flagged posts are false positives. The model flags: 100 × 0.85 = 85 true positives (recall=85%) and FP/(FP+TP) = 0.01 → FP = 85 × 0.01/0.99 ≈ 0.86 ≈ ~1 FP/second from the flagged set. However, at 99% precision with high QPS, even 1% of 8,500 flagged posts = 85 false positives/second if recall is higher. The key insight is that at scale, even 99% precision generates substantial false positive volume.",
      hints: [
        "False positive rate (of safe posts) = FP / total_safe. Even 0.1% of 99,900 = ~100 false positives/second.",
        "Volume amplifies small error rates into large absolute counts at 100K QPS.",
      ],
    },
    {
      id: "q-msd-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A content moderation classifier with 99% accuracy on a held-out test set is production-ready if the harmful content rate is 0.1% of all posts.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        'At 0.1% harmful content rate, a classifier predicting "safe" for every post achieves 99.9% accuracy. A 99% accurate model may be worse than this trivial baseline. The relevant metrics are precision and recall on the harmful class: how many true harmful posts are caught (recall) and how many flagged posts are truly harmful (precision). Accuracy is a misleading metric for rare-class detection.',
      hints: [
        'Apply the base-rate calculation: P(harmful) = 0.001. A model predicting "always safe" achieves 99.9% accuracy.',
        'Precision@recall=90% is more informative: "what fraction of flagged posts are actually harmful when we catch 90% of them?"',
      ],
    },
    {
      id: "q-msd-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A content moderation system serves 10 languages with abundant English data (5M labeled examples) but only 500–5,000 labeled examples for 8 other languages. What is the most effective approach?",
      options: [
        "Train separate monolingual classifiers for each of the 10 languages.",
        "Fine-tune a multilingual pretrained model (e.g., XLM-RoBERTa) on all available data, leveraging cross-lingual transfer from English to low-resource languages.",
        "Machine-translate all non-English content to English, then apply an English-only classifier.",
        "Use rule-based filters for low-resource languages and ML only for English.",
      ],
      correctAnswer: 1,
      explanation:
        "XLM-RoBERTa and similar multilingual models are pretrained on 100+ languages with shared subword representations. Fine-tuning on English data and even small amounts of target-language data enables effective cross-lingual transfer. Machine translation introduces errors and latency. Monolingual models require large per-language datasets. Multilingual fine-tuning achieves strong performance even for languages with only hundreds of labeled examples.",
      hints: [
        "XLM-RRoBERTa was pretrained on 2.5 TB of multilingual data — its representations generalize across languages.",
        "Transfer from English to Spanish is much stronger than from scratch with 500 Spanish examples.",
      ],
    },
  ],

  "entity-resolution-design": [
    {
      id: "q-msd-kp14-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What distinguishes entity resolution (record linkage) from deduplication?",
      options: [
        "Entity resolution requires ML; deduplication only uses exact string matching.",
        "Deduplication identifies duplicate records within a single database; entity resolution links records referring to the same real-world entity across multiple databases.",
        "Entity resolution is faster because it uses simpler algorithms.",
        "Deduplication only applies to text data; entity resolution applies to structured records.",
      ],
      correctAnswer: 1,
      explanation:
        "Deduplication: identify and merge duplicate records within one dataset (e.g., same customer entered twice). Entity resolution (record linkage): match records across separate databases that refer to the same entity (e.g., linking customer records from CRM, billing system, and support tickets). Both use similar techniques (blocking, similarity scoring, classification) but the scale and data access patterns differ. Entity resolution also handles schema heterogeneity between different database schemas.",
      hints: [
        "Deduplication: one database, find internal duplicates. Entity resolution: multiple databases, cross-link.",
        "Entity resolution must handle schema differences: one DB has 'first_name, last_name'; another has 'full_name'.",
      ],
    },
    {
      id: "q-msd-kp14-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "In ML-based entity resolution, using the match/non-match labels from a manually-curated gold standard test set to evaluate a production system is sufficient, even if the production data distribution differs from the test set.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Gold standard test sets for entity resolution are typically constructed by sampling record pairs for human labeling — often with oversampling of potential matches to create a balanced evaluation set. Production data has a very different distribution: most pairs are non-matches (extreme class imbalance), and the specific entity types, data quality issues, and domain distribution may differ. Production monitoring must include sampling from live decisions and measuring precision/recall on production-representative pairs.",
      hints: [
        "If gold standard has 50% match rate but production has 0.01% match rate, test metrics are not representative.",
        "Always evaluate on production-representative samples, not just on the labeled development/test set.",
      ],
    },
    {
      id: "q-msd-kp14-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You are building an entity resolution system for 500M customer records across 3 databases. After blocking, you have 50 billion candidate pairs to score. A pairwise classifier takes 0.1 ms per pair. How do you make this tractable without sacrificing recall?",
      options: [
        "Run the classifier on all 50B pairs using a distributed cluster of 500 machines.",
        "Apply two-stage scoring: a fast vectorized similarity pre-filter (TF-IDF cosine < 0.3 → discard) to reduce candidate pairs by 90%, followed by the 0.1 ms classifier on the remaining 5B pairs. Add transitivity closure (union-find) to propagate matches.",
        "Reduce blocking to 100M candidate pairs by using stricter blocking keys, accepting recall loss.",
        "Use approximate nearest neighbor search (LSH) to replace blocking entirely, generating 1M candidate pairs.",
      ],
      correctAnswer: 1,
      explanation:
        "50B pairs × 0.1 ms = 5M seconds — infeasible for a single cluster. A two-stage approach: (1) fast pre-filter (vectorized TF-IDF cosine similarity, 0.001 ms/pair) eliminates 90% of pairs, reducing to 5B; (2) then 5B × 0.1 ms = 500K seconds — still too slow. Further filtering stages are needed. Practically: 3+ stages of increasing accuracy/cost. LSH-based candidate generation (option D) is a strong alternative. Transitivity closure via union-find ensures match propagation across all three databases.",
      hints: [
        "50B × 0.1 ms = 5M seconds ≈ 58 days on one machine. Must reduce candidate count by >1000×.",
        "Union-find (disjoint set): if A=B and B=C, then A=C. Necessary when matching across 3+ databases.",
      ],
    },
    {
      id: "q-msd-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Entity resolution (record linkage) without blocking has O(n²) complexity for n records. With blocking, complexity drops to near-linear. What is the trade-off introduced by blocking?",
      options: [
        "Blocking increases memory usage exponentially.",
        "Blocking reduces recall: record pairs in different blocks are never compared, so true matches across blocks are missed.",
        "Blocking requires labeled data to learn the blocking key.",
        "Blocking eliminates the need for a similarity function, reducing accuracy.",
      ],
      correctAnswer: 1,
      explanation:
        "Blocking groups records into candidate sets (blocks) using a blocking key (e.g., first 3 chars of last name + zip code). Only records within the same block are compared. If two truly matching records are in different blocks (due to typos in the blocking key), they will never be matched — a recall loss. The trade-off is computational feasibility (O(n²)→near-linear) at the cost of some missed matches.",
      hints: [
        "Without blocking, comparing all n=10M records requires 50 trillion pairs — infeasible.",
        "Multiple blocking passes (union of blocked sets) improve recall at the cost of more comparisons.",
      ],
    },
    {
      id: "q-msd-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Blocking in entity resolution reduces the number of record pairs that must be compared, at the cost of potentially missing some true matches.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        'Blocking is a precision-recall trade-off: it dramatically reduces the number of comparisons (enabling scalability) but introduces false negatives when true matches are assigned to different blocks. Well-designed blocking (using multiple blocking keys, "canopy clustering," or LSH-based blocking) minimizes this recall loss while maintaining tractable candidate pair counts.',
      hints: [
        "Without blocking, comparing all n=10M records requires 50 trillion pairs — infeasible.",
        "Multiple blocking passes (union of blocked sets) improve recall at the cost of more comparisons.",
      ],
    },
    {
      id: "q-msd-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Two customer records from different databases: {name: "Microsoft Corp", address: "1 Microsoft Way, Redmond WA"} and {name: "Microsoft Corporation", address: "One Microsoft Way, Redmond, WA 98052"}. Which similarity features should be used for matching?',
      options: [
        "Exact string equality on both fields — only exact matches are reliable.",
        "Edit distance (Levenshtein) on name, address normalization + fuzzy matching, and blocking on zip code prefix to limit comparisons.",
        "TF-IDF cosine similarity on the full concatenated record string.",
        "Embedding similarity using a general-purpose sentence encoder.",
      ],
      correctAnswer: 1,
      explanation:
        'Entity resolution for business names requires: (1) fuzzy name matching (Jaro-Winkler, Levenshtein) to handle "Corp" vs. "Corporation"; (2) address normalization (standardizing "One" vs. "1", expanding "WA" to "Washington") followed by fuzzy matching; (3) zip code blocking to reduce candidate pairs. General sentence encoders are effective but add latency; rule-based normalization + edit distance is more interpretable and often more precise for structured records.',
      hints: [
        '"Corp" and "Corporation" are semantically identical but have edit distance 5 — fuzzy matching handles this.',
        'Address normalization (USPS standard forms) converts "One Microsoft Way" and "1 Microsoft Way" to the same canonical form.',
      ],
    },
  ],

  "feature-store-design-v2": [
    {
      id: "q-msd-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following is the primary challenge that a feature store solves in ML systems?",
      options: [
        "Reducing model training time by using faster hardware.",
        "Ensuring consistency between features used during training and serving (training-serving skew).",
        "Automatically selecting the best model architecture for a given task.",
        "Compressing model weights for efficient deployment.",
      ],
      correctAnswer: 1,
      explanation:
        "Training-serving skew — where features computed differently at training vs. serving time — is one of the most common and damaging ML bugs. Feature stores solve this by providing a single source of truth: features are computed once, stored, and retrieved by both training pipelines and serving infrastructure, guaranteeing consistency.",
      hints: [
        "A feature store has both an offline store (for training) and an online store (low-latency serving).",
        "Training-serving skew can silently degrade model performance without any error.",
      ],
    },
    {
      id: "q-msd-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A feature store's online store (e.g., Redis) and offline store (e.g., Parquet on S3) can be kept in sync using a materialization job that periodically writes computed features to both stores.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Materialization jobs compute features from raw data sources and write them to both online (low-latency key-value store like Redis or DynamoDB) and offline (columnar storage like Parquet or Delta Lake) stores. This dual-write approach ensures that the same feature values used during training are available at serving time with sub-millisecond latency.",
      hints: [
        "Feast, Tecton, and Hopsworks all implement this dual-store pattern.",
        "Point-in-time correct joins prevent future data leakage when retrieving offline features for training.",
      ],
    },
    {
      id: "q-msd-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A recommendation system computes user embeddings nightly and item embeddings in real-time. Which feature store architecture best supports this mixed latency requirement?",
      options: [
        "Store all features in an online store (Redis) — nightly batch jobs update user embeddings.",
        "Store all features offline only and batch-materialize before each serving request.",
        "Use a hybrid architecture: batch-materialize user embeddings to the online store nightly; compute item embeddings on-demand and cache with short TTL.",
        "Compute all features on-demand at serving time to avoid staleness.",
      ],
      correctAnswer: 2,
      explanation:
        "Hybrid feature stores are standard in production recommendation systems. User embeddings change slowly (daily recompute is sufficient) and should be pre-materialized to an online store for O(1) retrieval. Item features (price, inventory, freshness) change rapidly and require real-time computation or short-TTL caching. On-demand computation of all features at serving time introduces unacceptable latency at scale.",
      hints: [
        "User features: high cardinality, slow-changing → batch materialization.",
        "Item features: often real-time (price, availability) → on-demand or short TTL cache.",
      ],
    },
  ],
  "data-pipeline-design": [
    {
      id: "q-msd-kp16-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a Lambda architecture for ML feature pipelines, what are the two layers and their respective roles?",
      options: [
        "Batch layer (historical accuracy) and speed layer (low-latency recent data); results are merged at serving time.",
        "Training layer (feature engineering) and serving layer (inference); features flow unidirectionally.",
        "Storage layer (data lake) and compute layer (Spark); storage feeds compute.",
        "Online layer (real-time features) and offline layer (batch features); they use separate feature stores.",
      ],
      correctAnswer: 0,
      explanation:
        "Lambda architecture uses a batch layer for accurate, high-latency processing of all historical data (e.g., daily Spark jobs) and a speed layer for low-latency processing of recent data (e.g., Kafka Streams). At query time, results from both layers are merged to provide a complete, near-real-time view. This architecture trades complexity (two codebases) for flexibility in handling late-arriving data.",
      hints: [
        "Kappa architecture simplifies Lambda by using only a streaming layer — replay the stream for batch reprocessing.",
        "The serving layer in Lambda merges batch views and real-time views on read.",
      ],
    },
    {
      id: "q-msd-kp16-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a data pipeline for ML, idempotency means that running the pipeline multiple times with the same input produces the same output without side effects.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Idempotency is a critical property for reliable ML data pipelines. It ensures that retries (due to failures) or reruns (due to bugs) produce correct results without duplicating data or corrupting state. Common patterns include using upserts instead of inserts, writing to immutable partitions, and using deterministic transformations.",
      hints: [
        "Non-idempotent pipelines can cause data duplication on retry — a common production incident.",
        "Write to a staging location first, then atomically move/promote to the final destination.",
      ],
    },
    {
      id: "q-msd-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A fraud detection pipeline must process 50,000 transactions/second with feature computation latency under 5ms. Which architecture is most appropriate?",
      options: [
        "Apache Spark Structured Streaming with micro-batches every 100ms.",
        "Kafka Streams with stateful windowed aggregations, precomputed features in Redis, real-time scoring via gRPC.",
        "Nightly batch Spark jobs that precompute all features and load them into a relational database.",
        "REST API polling with a feature computation service called at transaction time.",
      ],
      correctAnswer: 1,
      explanation:
        "At 50,000 TPS with 5ms latency requirement, Kafka Streams is ideal: it processes events as they arrive (not micro-batches), supports stateful aggregations (windowed transaction counts per user), and integrates with Redis for precomputed user-level features (average spend, velocity signals). gRPC for scoring adds minimal overhead vs. REST. Spark micro-batches at 100ms intervals would violate the 5ms latency requirement.",
      hints: [
        "50,000 TPS × 5ms latency → need sub-millisecond feature retrieval, not computation.",
        "Precompute slow-changing features (e.g., 30-day spend average) in Redis; compute fast features (e.g., transaction count in last 60s) in Kafka Streams.",
      ],
    },
  ],
  "model-serving-design": [
    {
      id: "q-msd-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the key trade-off between synchronous (request-response) and asynchronous (queue-based) model serving architectures?",
      options: [
        "Synchronous serving is always faster; asynchronous serving is always more scalable.",
        "Synchronous serving provides immediate results with tight latency SLAs; asynchronous serving decouples producers from consumers, enabling load leveling but introducing result delivery complexity.",
        "Asynchronous serving is only suitable for batch predictions; synchronous serving handles real-time use cases.",
        "Synchronous serving requires more GPU resources because it cannot batch requests.",
      ],
      correctAnswer: 1,
      explanation:
        "Synchronous serving is required when callers need immediate results (e.g., search ranking, fraud detection). Asynchronous serving (via queues like Kafka or SQS) decouples the request rate from the processing rate — ideal for high-throughput, latency-tolerant use cases (e.g., document processing, video transcription). Asynchronous patterns require result delivery mechanisms (callbacks, polling, WebSockets) that add complexity.",
      hints: [
        "Use async when: workload is bursty, processing is slow, clients can tolerate delay.",
        "Async enables better GPU utilization through dynamic batching of queued requests.",
      ],
    },
    {
      id: "q-msd-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Dynamic batching in model serving (e.g., TensorRT-LLM, Triton Inference Server) improves GPU throughput by grouping multiple inference requests into a single forward pass, at the cost of increased latency for individual requests.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Dynamic batching collects incoming requests over a configurable wait window and combines them into a single batch for GPU inference. This dramatically improves GPU utilization (GPUs are parallelism engines — a batch of 32 is much faster than 32 sequential single requests) but adds queuing latency. The batch size and wait time are key configuration parameters that trade throughput for latency.",
      hints: [
        "A GPU running batch_size=1 inference uses a fraction of its CUDA cores.",
        "Triton's dynamic batching can be configured with max_queue_delay_microseconds.",
      ],
    },
    {
      id: "q-msd-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A large language model serving system must handle 10,000 concurrent users with variable prompt lengths (100-2000 tokens) and response lengths (50-500 tokens). Which serving optimization is MOST critical for throughput?",
      options: [
        "Increasing batch size to 512 regardless of sequence length.",
        "Using continuous batching (iteration-level scheduling) with paged KV cache to maximize GPU memory utilization.",
        "Deploying separate model instances for short and long sequences.",
        "Using FP32 precision to avoid quantization errors affecting long sequences.",
      ],
      correctAnswer: 1,
      explanation:
        "For LLM serving with variable sequence lengths, continuous batching (vLLM's approach) is the key innovation. Traditional static batching must wait for the longest sequence in a batch to finish before starting new requests. Continuous batching adds new requests as soon as any sequence completes, maximizing GPU utilization. Paged KV cache (PagedAttention) manages memory efficiently for variable-length sequences, avoiding memory waste from fixed-size KV caches.",
      hints: [
        "vLLM's PagedAttention achieves near-zero memory waste by managing KV cache like virtual memory pages.",
        "Continuous batching can improve throughput 20-30× over naive static batching for LLMs.",
      ],
    },
  ],
  "ab-testing-design": [
    {
      id: "q-msd-kp18-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In an A/B testing system for ML models, what is the purpose of 'holdback' groups?",
      options: [
        "Holdback groups receive the new model; control groups receive the baseline.",
        "A small percentage of users is held back on the old experience long-term to measure cumulative and novelty effects that might bias short-term experiments.",
        "Holdback groups are used for data quality validation before experiments begin.",
        "Holdback groups ensure that sensitive user segments are excluded from experiments.",
      ],
      correctAnswer: 1,
      explanation:
        "Holdback groups (also called holdout groups) are long-running control groups that continue receiving the old experience while the rest of the user base receives the new feature. They're used to measure long-term effects (after novelty effects subside), detect permanent vs. temporary improvements, and quantify the cumulative value of shipped features over time. Without holdbacks, short-term experiment gains may not reflect steady-state performance.",
      hints: [
        "Novelty effect: users may engage more with any change initially, inflating metrics.",
        "Holdbacks can run for weeks or months to detect long-term behavioral changes.",
      ],
    },
    {
      id: "q-msd-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In an ML model A/B test, using page views as the randomization unit (instead of user IDs) can cause Simpson's Paradox and inflate false positive rates.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "When randomizing by page views rather than users, the same user can be in both treatment and control groups across different sessions. This violates the independence assumption of standard statistical tests, leading to inflated false positive rates. Additionally, heavy users (who generate more page views) are overrepresented in the analysis. User-level randomization ensures each user has a single, consistent treatment assignment throughout the experiment.",
      hints: [
        "The unit of randomization must match the unit of analysis in significance tests.",
        "Cookie-based randomization can also cause issues when users clear cookies or use multiple devices.",
      ],
    },
    {
      id: "q-msd-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An e-commerce platform runs 200 A/B experiments simultaneously. With α=0.05, what is the expected number of false positives, and how should the experimentation system address this?",
      options: [
        "0 false positives — each experiment controls its own α independently.",
        "10 false positives (200 × 0.05); use Bonferroni correction: α_corrected = 0.05/200 = 0.00025.",
        "10 false positives (200 × 0.05); use sequential testing or Bayesian methods with FDR control (e.g., Benjamini-Hochberg at FDR=0.05).",
        "40 false positives — the multiple comparison problem inflates each individual experiment's error rate.",
      ],
      correctAnswer: 2,
      explanation:
        "With 200 simultaneous experiments at α=0.05, you expect ~10 false positives (type I errors) even with no real effects. Bonferroni correction is too conservative for independent experiments (loses statistical power). The Benjamini-Hochberg procedure controls the False Discovery Rate (FDR) — the expected fraction of discoveries that are false — which is more appropriate for large-scale experimentation. Sequential testing (e.g., always-valid p-values) also addresses peeking problems.",
      hints: [
        "Family-Wise Error Rate (FWER) control: probability of ANY false positive. Bonferroni controls FWER.",
        "False Discovery Rate (FDR) control: fraction of discoveries that are false. BH procedure controls FDR.",
      ],
    },
  ],
  "ml-platform-design": [
    {
      id: "q-msd-kp19-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following best describes the role of an ML platform in an organization?",
      options: [
        "An ML platform trains and deploys models autonomously without human intervention.",
        "An ML platform provides shared infrastructure, tooling, and abstractions that enable ML practitioners to efficiently develop, train, evaluate, and deploy models at scale.",
        "An ML platform is primarily a data storage solution optimized for training datasets.",
        "An ML platform replaces the need for dedicated ML engineering teams.",
      ],
      correctAnswer: 1,
      explanation:
        "ML platforms (like Uber's Michelangelo, Airbnb's Bighead, or open-source alternatives like MLflow + Kubeflow) provide shared infrastructure that multiplies ML team productivity. Key components include: experiment tracking, feature stores, model training orchestration, model registry, serving infrastructure, and monitoring. The platform abstracts infrastructure complexity so practitioners focus on ML work rather than DevOps.",
      hints: [
        "MLOps platforms reduce the time from model idea to production from months to days.",
        "Key platform principle: golden path — make the right thing easy and the wrong thing hard.",
      ],
    },
    {
      id: "q-msd-kp19-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A model registry is a centralized repository that stores trained model artifacts, metadata, and versioning information, enabling teams to track which model version is deployed in each environment.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Model registries (e.g., MLflow Model Registry, Weights & Biases Model Registry) provide a governance layer for ML models. They store: model artifacts (weights, preprocessing code), metadata (training metrics, dataset versions, hyperparameters), stage transitions (Staging → Production), and approval workflows. This enables reproducibility, rollback capability, and audit trails for model deployments.",
      hints: [
        "Without a model registry, tracking which model version is in production requires manual documentation.",
        "Model registry stages: Registered → Staging → Production → Archived.",
      ],
    },
    {
      id: "q-msd-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When designing an ML platform for a 500-person data science organization, which architectural decision has the highest impact on platform adoption?",
      options: [
        "Choosing the fastest training hardware (H100 GPUs vs. A100s).",
        "Providing a Python SDK with sensible defaults that requires minimal configuration while exposing advanced options for power users — following a 'progressive disclosure' design pattern.",
        "Mandating a single ML framework (PyTorch) to reduce support burden.",
        "Building a custom UI for all ML workflows to avoid vendor lock-in.",
      ],
      correctAnswer: 1,
      explanation:
        "Platform adoption is driven by developer experience. A Python SDK with progressive disclosure enables beginners to get started in minutes (sensible defaults, minimal boilerplate) while experts can customize every aspect. Forcing a single framework (option C) blocks teams with existing investments. Custom UIs (option D) have high build/maintenance costs and often lag commercial tools. Hardware choice (option A) affects training speed but not adoption of the platform itself.",
      hints: [
        "Stripe's API design philosophy: make simple things simple, complex things possible.",
        "The best ML platform is the one practitioners actually use — UX trumps features.",
      ],
    },
  ],
  "recommendation-system-design": [
    {
      id: "q-msd-kp20-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a two-stage recommendation system (retrieval + ranking), what is the primary role of each stage?",
      options: [
        "Retrieval: trains the recommendation model; Ranking: deploys and serves the model.",
        "Retrieval: quickly narrows millions of candidates to hundreds using a lightweight model; Ranking: applies a complex model to score and order those candidates.",
        "Retrieval: collects user interaction data; Ranking: processes and stores the data in a feature store.",
        "Retrieval: filters out inappropriate content; Ranking: personalizes results for each user.",
      ],
      correctAnswer: 1,
      explanation:
        "Two-stage recommendation systems decouple scalability from accuracy. The retrieval stage (also called candidate generation) uses lightweight models (ANN search over embeddings, collaborative filtering) to reduce the candidate space from millions to hundreds in milliseconds. The ranking stage applies expensive models (deep neural nets, gradient boosted trees) that can use rich features and complex interactions, optimizing a precise ranking objective over the manageable candidate set.",
      hints: [
        "Retrieval: optimize for recall (don't miss good items); Ranking: optimize for precision (order them correctly).",
        "YouTube's recommendation system popularized the two-tower neural network for retrieval.",
      ],
    },
    {
      id: "q-msd-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Collaborative filtering recommendation systems suffer from the 'cold start' problem because they cannot make recommendations for new users or new items without interaction history.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Pure collaborative filtering relies on user-item interaction data (clicks, purchases, ratings) to learn user and item representations. New users (no history) and new items (no interactions) cannot be represented in the learned embedding space. Solutions include: content-based features for new items, onboarding flows to gather initial preferences, hybrid models that combine collaborative and content-based filtering, and exploration strategies (bandit algorithms).",
      hints: [
        "User cold start: use demographic features, onboarding questionnaires, or popular items.",
        "Item cold start: use item content features (text, images) until enough interactions accumulate.",
      ],
    },
    {
      id: "q-msd-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A music streaming service wants to recommend songs to 100M users from a catalog of 50M songs. The system must retrieve top-100 candidates in under 50ms. Which retrieval approach is most appropriate?",
      options: [
        "Exact nearest neighbor search over all 50M song embeddings — O(n) is too slow, but GPU acceleration makes it feasible.",
        "Approximate Nearest Neighbor (ANN) search using HNSW or IVF-PQ index over precomputed song embeddings, with user embeddings computed or retrieved in real-time.",
        "Matrix factorization with explicit SVD decomposition computed at query time.",
        "Collaborative filtering with inverted index lookup: retrieve all users who liked the seed items.",
      ],
      correctAnswer: 1,
      explanation:
        "For 50M items at 50ms latency, Approximate Nearest Neighbor search is the standard solution. HNSW (Hierarchical Navigable Small World) and IVF-PQ (Inverted File Index with Product Quantization) reduce search complexity from O(n) to O(log n) or O(√n) while maintaining ~95%+ recall. Libraries like FAISS (Facebook AI Similarity Search) or ScaNN (Google) implement these efficiently. User embeddings are precomputed and cached in a feature store.",
      hints: [
        "FAISS with IVF-PQ can search 1B vectors in ~10ms on a single GPU.",
        "Product Quantization compresses 128-dim float32 embeddings from 512 bytes to 8-32 bytes, fitting huge indexes in RAM.",
      ],
    },
  ],
  "fraud-detection-design-v2": [
    {
      id: "q-msd-kp21-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What makes fraud detection a particularly challenging ML problem compared to standard binary classification?",
      options: [
        "Fraud detection requires processing images and text simultaneously.",
        "Class imbalance (fraud rate ~0.1-1%), adversarial adaptation (fraudsters adjust behavior), strict latency requirements (<100ms), and high asymmetric costs (false negatives > false positives).",
        "Fraud labels are unavailable, requiring fully unsupervised learning.",
        "The feature space changes every day, requiring daily model retraining.",
      ],
      correctAnswer: 1,
      explanation:
        "Fraud detection combines multiple hard challenges: (1) Extreme class imbalance (1 fraud per 1000 transactions) requiring specialized sampling, cost-sensitive learning, or anomaly detection approaches; (2) Adversarial dynamics — fraudsters reverse-engineer and evade detection systems; (3) Real-time scoring (decisions must be made before authorizing transactions, typically <100ms); (4) Asymmetric costs — missing fraud (false negative) is far more expensive than a false alarm (false positive).",
      hints: [
        "Precision-recall tradeoff: at low fraud rates, high precision (few false alarms) often conflicts with high recall (catching all fraud).",
        "Graph-based fraud detection (finding fraud rings) adds another dimension beyond per-transaction features.",
      ],
    },
    {
      id: "q-msd-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a fraud detection system, using future data to compute features used to predict past fraud events (e.g., a user's total transactions in the next 7 days) is called data leakage and will cause the model to appear much more accurate in offline evaluation than it is in production.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Data leakage is especially dangerous in fraud detection because labels are often assigned retrospectively (a charge-back occurs weeks after the transaction). If future information (e.g., account eventual outcome, future transaction velocity) leaks into training features, the model learns patterns that don't exist at prediction time, leading to dramatically inflated offline metrics. Point-in-time correct feature retrieval from a feature store prevents this leakage.",
      hints: [
        "Always ask: at prediction time (transaction T), what information would realistically be available?",
        "A 'too good to be true' offline AUC (>0.99) is often a sign of data leakage.",
      ],
    },
    {
      id: "q-msd-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A payment company's fraud model achieves 95% AUC-ROC on offline evaluation but only 70% AUC in production. What is the MOST likely cause?",
      options: [
        "The model is underfitting — it needs more parameters.",
        "The evaluation dataset has different class balance than production.",
        "Data leakage during feature engineering, concept drift (fraudsters adapted), or training-serving skew in feature computation.",
        "The GPU inference hardware is too slow, causing stale predictions.",
      ],
      correctAnswer: 2,
      explanation:
        "A 25 percentage point drop from offline to production AUC is a severe performance gap with three likely causes: (1) Data leakage — features computed with future information inflated offline metrics; (2) Concept drift — fraudsters detected and bypassed the model's decision boundary (especially likely if deployment took months); (3) Training-serving skew — features computed differently between training (batch SQL) and serving (real-time API), causing distribution mismatch. Debugging requires shadow mode deployment and feature distribution monitoring.",
      hints: [
        "Compare feature distributions between training data and live serving traffic to detect skew.",
        "Fraud concept drift can be dramatic — a fraud ring can shift behavior within days of model deployment.",
      ],
    },
  ],
  "search-system-design": [
    {
      id: "q-msd-kp22-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the difference between sparse retrieval (BM25) and dense retrieval (bi-encoder embeddings) in a search system?",
      options: [
        "Sparse retrieval uses neural networks; dense retrieval uses rule-based keyword matching.",
        "Sparse retrieval matches query and document via overlapping terms (TF-IDF weighting); dense retrieval encodes query and document into dense vectors and retrieves by vector similarity, enabling semantic matching beyond exact keyword overlap.",
        "Sparse retrieval is more accurate; dense retrieval is faster.",
        "Dense retrieval requires labeled data; sparse retrieval is fully unsupervised.",
      ],
      correctAnswer: 1,
      explanation:
        "BM25 (sparse retrieval) ranks documents by term frequency and inverse document frequency, excelling at exact keyword matches but failing on synonyms and paraphrases. Dense retrieval (bi-encoders like DPR, E5, BGE) encodes queries and documents into continuous vector spaces where semantic similarity can be measured. Dense retrieval handles 'car' vs. 'automobile' but may miss important exact-match signals. Hybrid search (BM25 + dense) typically outperforms either alone.",
      hints: [
        "BM25 is the baseline — hard to beat without substantial annotated data for training dense retrievers.",
        "Reciprocal Rank Fusion (RRF) is a simple but effective way to combine sparse and dense retrieval rankings.",
      ],
    },
    {
      id: "q-msd-kp22-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a search system, learning-to-rank (LTR) models are trained to predict the relevance of query-document pairs using features derived from both the query and the document.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Learning-to-rank (LambdaMART, RankNet, LambdaRank) trains models to optimize ranking metrics (NDCG, MAP) using query-document features: BM25 score, click-through rates, document freshness, PageRank, query-document semantic similarity, etc. LTR models are typically trained on implicit feedback (clicks) or explicit judgments (human annotators rating relevance). They rerank candidates retrieved by a first-stage retrieval system.",
      hints: [
        "Pointwise LTR: treat as regression on relevance score. Pairwise: optimize order of document pairs. Listwise: optimize full ranking.",
        "Offline metrics (NDCG) must be validated against online metrics (click-through rate, session length).",
      ],
    },
    {
      id: "q-msd-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A legal document search system must retrieve relevant case law from 100M documents with high recall (missing relevant cases has severe consequences). The query latency budget is 500ms. Which architecture best meets these requirements?",
      options: [
        "BM25-only retrieval — reliable, no training data needed, high recall for exact legal terms.",
        "Dense-only retrieval with FAISS ANN search — captures semantic legal concepts beyond exact citation matches.",
        "Hybrid retrieval: BM25 for exact legal citations and statutes + dense retrieval for conceptual similarity, followed by cross-encoder reranking for precision, with query expansion using legal ontologies.",
        "Re-read all 100M documents for every query using a cross-encoder — maximum accuracy.",
      ],
      correctAnswer: 2,
      explanation:
        "Legal search requires high recall (can't miss relevant precedents) and must handle both exact citation retrieval (§1983, Roe v. Wade) and conceptual similarity (cases about similar legal issues phrased differently). Hybrid retrieval + cross-encoder reranking is the state-of-the-art approach: BM25 catches exact matches; dense retrieval catches semantic matches; cross-encoders (which jointly encode query+document) provide high-precision reranking within 500ms. Legal ontologies (WordNet for law, case citation graphs) improve query expansion.",
      hints: [
        "Cross-encoders are 100× slower than bi-encoders but significantly more accurate — use for reranking, not retrieval.",
        "In legal domains, recall is often more important than precision — judges would rather review more cases than miss relevant ones.",
      ],
    },
  ],
  "model-monitoring-design": [
    {
      id: "q-msd-kp23-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the difference between data drift and concept drift in production ML monitoring?",
      options: [
        "Data drift refers to changes in model accuracy; concept drift refers to changes in input features.",
        "Data drift is a change in the statistical distribution of input features (P(X) changes); concept drift is a change in the relationship between inputs and labels (P(Y|X) changes).",
        "Data drift is detected by monitoring model outputs; concept drift is detected by monitoring input features.",
        "Data drift affects only batch models; concept drift affects only real-time models.",
      ],
      correctAnswer: 1,
      explanation:
        "Data drift (also called feature drift or covariate shift) occurs when input feature distributions change — e.g., a new user demographic segment starts using the product. Concept drift occurs when the true mapping from inputs to labels changes — e.g., COVID changed what products people buy, making pre-COVID purchase prediction models invalid. Both degrade model performance but require different responses: data drift may require retraining; concept drift requires new training data reflecting the new relationship.",
      hints: [
        "Data drift: P(X) changes but P(Y|X) stays the same. You may still be able to use the old model.",
        "Concept drift: P(Y|X) changes. The old model is learning a relationship that no longer exists.",
      ],
    },
    {
      id: "q-msd-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Population Stability Index (PSI) is a metric commonly used in production ML monitoring to detect distributional shift in input features, with PSI < 0.1 indicating no significant shift.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "PSI measures how much a distribution has shifted between a reference (training) and current (production) population. PSI < 0.1: no significant change; 0.1 ≤ PSI < 0.2: moderate shift (investigate); PSI ≥ 0.2: significant shift (model likely needs retraining). PSI is computed as Σ (actual% - expected%) × ln(actual%/expected%) over histogram bins. It's commonly used in financial ML for regulatory compliance monitoring.",
      hints: [
        "PSI is symmetric: it treats the reference and current distribution equally.",
        "KL divergence is a similar metric but is asymmetric and unbounded; PSI is bounded and interpretable.",
      ],
    },
    {
      id: "q-msd-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A content moderation model shows PSI = 0.35 (significant input drift) but business metrics (false positive rate, false negative rate) have not changed. What should you do?",
      options: [
        "Immediately retrain the model — PSI = 0.35 always requires retraining.",
        "Do nothing — business metrics are fine, so the model is performing well despite input drift.",
        "Investigate the drift source: segment PSI by feature and by content category; check if the model is robust to this specific shift; deploy shadow evaluation with labeled recent data to confirm performance.",
        "Roll back to the previous model version to avoid drift risk.",
      ],
      correctAnswer: 2,
      explanation:
        "PSI is a leading indicator, not a direct measure of performance. Significant input drift doesn't always cause performance degradation — the model may be robust to this specific distribution shift. The correct approach is: (1) segment PSI to identify which features are drifting and which content categories are affected; (2) if ground truth is available (human labels, appeals data), compute actual precision/recall on recent data; (3) if the drift is in low-importance features or the model is robust to this shift, retraining may not be necessary. Acting on PSI alone without confirming performance impact wastes resources.",
      hints: [
        "PSI is a proxy metric — ground truth performance metrics are the ultimate arbiter.",
        "Segment drift analysis: is drift concentrated in a specific user segment or feature? That context drives the response.",
      ],
    },
  ],
  "nlp-system-design": [
    {
      id: "q-msd-kp24-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When designing an NLP system for entity extraction from medical records, why is domain-specific pre-training or fine-tuning preferred over using a general-purpose LLM off-the-shelf?",
      options: [
        "General-purpose LLMs cannot process text longer than 512 tokens.",
        "Medical entity extraction requires recognizing specialized terminology (drug names, ICD codes, anatomical terms) where domain-specific models (BioBERT, ClinicalBERT) outperform general models trained on web text.",
        "General-purpose LLMs are too expensive to run at scale; domain-specific models are always smaller.",
        "Domain-specific models are easier to fine-tune because they have fewer parameters.",
      ],
      correctAnswer: 1,
      explanation:
        "Medical text contains specialized vocabulary, abbreviations, and context that differ significantly from general web text. BioBERT (pre-trained on PubMed abstracts) and ClinicalBERT (pre-trained on MIMIC clinical notes) learn domain-specific token representations and contextual patterns. For entity extraction, these models consistently outperform general-purpose BERT variants on biomedical NER benchmarks (BioNLP, n2c2). Large LLMs can be competitive with few-shot prompting but domain-specific fine-tuned models typically win on precision-critical clinical tasks.",
      hints: [
        "BERT pre-trained on Wikipedia never sees 'CABG' (coronary artery bypass graft) or 'q.d.' (once daily).",
        "Domain adaptation via continued pre-training on domain text improves downstream NER significantly.",
      ],
    },
    {
      id: "q-msd-kp24-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Retrieval-Augmented Generation (RAG) systems reduce LLM hallucination by grounding model responses in retrieved documents from a knowledge base, making them useful for question-answering systems over private or frequently-updated information.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "RAG systems combine a retrieval component (dense or sparse) that fetches relevant context from a knowledge base with a generative LLM that synthesizes the retrieved information into a response. This addresses two key LLM limitations: (1) knowledge cutoff — the retrieved documents can be updated without retraining; (2) hallucination — grounding responses in source documents reduces confabulation and enables citations. RAG is particularly valuable for enterprise Q&A over proprietary data that can't be included in pre-training.",
      hints: [
        "RAG vs. fine-tuning: RAG updates knowledge at retrieval time; fine-tuning embeds knowledge in weights.",
        "RAG challenges: retrieval quality bottlenecks generation quality — garbage in, garbage out.",
      ],
    },
    {
      id: "q-msd-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A customer service NLP system processes 1M messages/day and must route tickets to the correct team (<30 categories) with >95% accuracy and <500ms latency. Which architecture is most appropriate?",
      options: [
        "GPT-4 with few-shot prompting for each message — maximum accuracy, flexible categories.",
        "Fine-tuned BERT-base classifier with category hierarchy and confidence thresholds; escalate low-confidence predictions to a more expensive model or human review.",
        "Rule-based keyword matching — interpretable, fast, and sufficient for routing tasks.",
        "Train a custom transformer from scratch on historical ticket data — avoids licensing costs.",
      ],
      correctAnswer: 1,
      explanation:
        "For 1M messages/day with strict latency and accuracy requirements, fine-tuned BERT-base (or DistilBERT for speed) is the optimal choice: (1) >95% accuracy is achievable on routing with a few thousand labeled examples; (2) inference is 10-50ms, well within 500ms budget; (3) confidence thresholds enable intelligent escalation — route uncertain predictions to GPT-4 or humans (covering ~5% of traffic); (4) cost is sustainable at scale (GPT-4 for 1M messages/day would cost tens of thousands of dollars). Category hierarchies improve accuracy for similar classes.",
      hints: [
        "GPT-4 API cost at 1M messages/day: ~$5,000-20,000/day depending on message length.",
        "Fine-tuned DistilBERT: ~50MB model, <10ms inference — easily handles 1M/day on a single GPU.",
      ],
    },
  ],
};

registerQuestions(questions);
