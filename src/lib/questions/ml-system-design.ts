import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

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
        "Convert 99.9% to a decimal fraction of downtime, then multiply by total minutes in 30 days.",
        "In ML systems, can a system appear technically 'up' while producing completely wrong outputs? What does this mean for availability SLOs?",
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
        "Capacity planning: how many requests can each replica process per second given its concurrency limit and latency?",
        "Use Little's Law to reason about the relationship between concurrency, latency, and throughput.",
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
        "Pointwise regression predicts each document's score independently. Can it capture the fact that documents are being ranked relative to each other?",
        "How does NDCG reward the ordering of the entire list, not just individual document scores?",
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
        "At 0.05% fraud rate, a naive classifier predicting 'not fraud' always achieves what accuracy?",
        "Accuracy alone is meaningless for imbalanced data. Which metrics directly measure fraud-catching ability?",
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
        "What kappa threshold distinguishes reliable ground truth from noisy labels? Below what value should annotation guidelines be revised?",
        "What fundamental limit exists on a model's ability to learn from human labels?",
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
        "Why might an item at rank 1 receive more clicks than a more relevant item at rank 10, even when users are shown both?",
        "When a user clicks an item, what two possible reasons explain the click — and which one does the model actually learn from?",
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
        "Production logs reflect the current model\'s decisions, creating a feedback loop bias: the model only shows items it already thinks are relevant, so the data never covers items it would have incorrectly penalized. This creates a self-reinforcing loop that amplifies existing model biases. Random exploration (e.g., \\epsilon-greedy or logging policies) is needed to collect unbiased training data.",
      hints: [
        "What type of data does production logging capture — only what the current model chose to show, or everything that exists?",
        "What bias does this create, and what mechanism is needed to collect unbiased signal about items the model would not have surfaced?",
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
        "The model is most uncertain when it assigns near-equal probability to both classes. Which predicted probability values represent maximum uncertainty?",
        "Labeling examples the model is already confident about adds little information. Where does a new label provide the most value?",
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
        "Is this a similarity search problem (find nearest neighbors) or a key-based lookup (retrieve by user_id)?",
        "What is the total memory footprint, and how should it be partitioned to achieve sub-millisecond point lookups?",
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
        "With very large sample sizes (e.g., 100M users), can a tiny effect size be statistically significant? Is that effect worth deploying?",
        "What two metrics must always be reported together to distinguish statistical significance from practical importance?",
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
        "Use a weighted sum: loss = accuracy + \\lambda × latency. Tune \\lambda on the validation set.",
        "Maximize accuracy subject to a hard latency constraint using constrained optimization.",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-objective NAS requires finding the Pareto frontier — the set of architectures where improving accuracy requires increasing latency and vice versa. Both option B (Pareto search) and option D (constrained optimization) are valid; Pareto search provides the full trade-off picture while constrained optimization finds one optimal point. The weighted sum (option C) requires knowing \\lambda a priori and can miss non-convex Pareto regions. Option A ignores architecture-level latency optimization.",
      hints: [
        "In multi-objective optimization, what does the Pareto frontier represent, and what property does each point on it have?",
        "What real-world neural architecture search methods use multi-objective optimization over accuracy and latency?",
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
        "When a better model violates the latency constraint, what technique can transfer its knowledge to a smaller, faster model?",
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
        "Does using more samples per gradient update always improve the model's ability to generalize to unseen data?",
        "What well-documented phenomenon shows that large-batch training often converges to minima that generalize poorly?",
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
        "What five components must be versioned together to fully reproduce a training run?",
        "Can the same code, seeds, and hyperparameters produce different results on different library versions?",
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
        "Does automating retraining introduce any new risks compared to manual retraining with human review?",
        "What safeguards are needed to prevent a corrupted data batch from silently degrading a continuously-trained model?",
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
        "Low GPU utilization despite high CPU utilization is a classic symptom of what type of bottleneck?",
        "If the GPU is idle while the CPU is busy, what component is failing to keep the GPU fed with data?",
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
        "In shadow deployment, both the old and new models receive production traffic. Which model's output is actually served to users?",
        "What is the primary advantage of shadow deployment over A/B testing in terms of user risk?",
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
        "Does INT8 quantization always significantly degrade accuracy, or is the accuracy loss often within acceptable bounds for production?",
        "What technique simulates quantization effects during training to minimize the accuracy gap?",
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
        "The total latency is 5+10+20+2 = 37 ms, but p99 is 80 ms. What does this gap suggest about where time is being lost?",
        "Which stages in the pipeline must wait for previous ones to finish, and which could run concurrently?",
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
        "What happens to a system when queues grow without bound during a traffic spike?",
        "What HTTP response code and Retry-After header signal to clients that they should resubmit their request later?",
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
        "In static batching, what happens to GPU slots when one request finishes early but others in the batch are still generating?",
        "What key innovation does vLLM introduce to fill those idle GPU slots immediately?",
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
        "What is the VRAM requirement for a 70B parameter model in FP16? How does this compare to a single A100 80 GB?",
        "What technique manages KV cache memory to eliminate waste from pre-allocated but unused slots?",
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
        "How do the update frequencies of batch-materialized features differ from real-time session-level features?",
        "Which pipeline technology (streaming or batch) is needed to compute features that change within minutes?",
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
        "What is the computational complexity of scoring all 100M items sequentially versus finding top-k via approximate nearest neighbors?",
        "The two-stage pipeline solves a fundamental trade-off between what two competing requirements?",
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
        "What happens when a proxy metric is optimized directly, rather than the true underlying objective?",
        "A user who clicks on sensational content and immediately feels worse — does that click represent value or a misleading signal?",
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
        "NDCG (Normalized Discounted Cumulative Gain) sums relevance scores with position discounts: DCG@k = \\Sigma (rel_i / log_2(i+1)) for i=1..k. The log discount means rank 1 gets full credit, rank 2 gets half, rank 3 gets one-third, etc. Normalization by ideal DCG makes it comparable across queries. This captures that a highly relevant document at rank 5 is worse than at rank 1.",
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
        "In a hybrid search system, BM25 scores and dense embedding similarity scores can be combined via linear interpolation: final_score = \\alpha × BM25 + (1−\\alpha) × cosine_similarity. This combination typically outperforms either alone.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "BM25 excels at exact keyword matching (high precision for rare terms); dense bi-encoders excel at semantic matching (capturing paraphrases and synonyms). Their failure modes differ: BM25 misses semantic matches, dense models miss rare/specific terms. Linear interpolation (with \\alpha tuned on a validation set) combines their strengths, a technique called hybrid retrieval. Reciprocal Rank Fusion (RRF) is an alternative that does not require score normalization.",
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
        "If a cross-encoder scores each document independently, how many forward passes are needed per query at corpus scale?",
        "What is the standard two-stage pattern that combines the speed of bi-encoders with the accuracy of cross-encoders?",
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
        "What is the Bayes optimal decision threshold in terms of the cost ratio between false negatives and false positives?",
        "When false negatives are 20× more costly than false positives, should the threshold be above or below 0.5?",
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
        "What type of fraud pattern does GNN-based detection excel at, and what type does tabular GBDT-based detection excel at?",
        "What architecture do production fraud systems typically use to combine the strengths of both approaches?",
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
        "In a second-price auction, what determines the winner's payment — their own bid or the second-highest bid?",
        "What is the strategic implication of knowing your payment is determined by others' bids rather than your own?",
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
        "In a truthful mechanism, what is the dominant strategy for each bidder?",
        "What key property does VCG satisfy that GSP does not, despite both being multi-slot auctions?",
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
        "What does the model learn from data generated by its own past ranking decisions?",
        "What mechanism is needed to collect unbiased signal about content the current model would not have surfaced?",
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
        "What happens when a proxy metric is given a very high weight — does the system optimize for the true objective or for the metric itself?",
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
        'Engagement \$\\neq\$ satisfaction. A user spending 5 minutes in outrage is "engaging" but not benefiting.',
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
        "What is the total computation time if all 50B pairs are scored sequentially? Is this tractable?",
        "When matching records across 3+ databases, if A matches B and B matches C, what must be true about A and C?",
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
        "What is the computational cost of comparing all n records against all n records? Is this tractable for large datasets?",
        "The recall loss in blocking comes from what source — which pairs are never compared?",
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
        "The recall loss comes from which pairs of records never being compared?",
        "What technique allows trading off more comparisons for higher recall?",
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

  "real-time-ml-systems": [
    {
      id: "q-msd-rt1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A streaming inference system must score user events (clicks, purchases) within 50 ms of the event arriving. Which architecture component is MOST critical to achieving this latency?",
      options: [
        "A large transformer model running on GPU for maximum accuracy.",
        "A pre-materialized feature store (Redis) serving pre-computed features with sub-millisecond point-lookup latency, paired with a lightweight scoring model.",
        "A relational database (PostgreSQL) with indexed event logs for feature retrieval.",
        "A Spark Streaming job that recomputes all user features on each event.",
      ],
      correctAnswer: 1,
      explanation:
        "The dominant latency component in streaming inference is feature retrieval, not model scoring. A Redis online store delivers pre-computed features in <1 ms; a lightweight model (GBDT or shallow NN) scores in <5 ms. This leaves 40+ ms for network and orchestration. Spark Streaming micro-batches cannot meet 50 ms SLOs, and PostgreSQL query latency is 5–50 ms per query — too slow when multiple features are needed.",
      hints: [
        "Feature retrieval latency typically dominates inference latency in real-time ML systems.",
        "Redis GET: ~0.1 ms. PostgreSQL point lookup: 5–20 ms. Choose accordingly.",
      ],
    },
    {
      id: "q-msd-rt1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Edge deployment of ML models (running inference on the device rather than a server) always requires re-training the model from scratch because edge hardware lacks the compute used in training.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Edge deployment uses post-training compression techniques (quantization, pruning, knowledge distillation) applied to a pre-trained server-side model. TensorFlow Lite, ONNX Runtime Mobile, and PyTorch Mobile convert trained models to edge-optimized formats without retraining. Quantization-aware training (QAT) is an optional fine-tuning step that starts from pre-trained weights, not random initialization.",
      hints: [
        "TFLite and CoreML take existing model weights and convert/optimize them for edge hardware.",
        "Quantization-aware training fine-tunes an existing model — it is not a full re-train from scratch.",
      ],
    },
    {
      id: "q-msd-rt1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A real-time recommendation system has a p99 latency SLA of 80 ms end-to-end. Profiling shows: ANN retrieval 15 ms, feature fetch (Redis) 12 ms, model inference 30 ms, response serialization 5 ms. Total p50 is 62 ms but p99 is 130 ms. What is the MOST likely cause and the correct mitigation?",
      options: [
        "The model inference is too slow at p99 — replace the model with a smaller one.",
        "Tail latency amplification: at p99, sequential steps compound slow tails (GC pause, Redis eviction, network jitter). Mitigation: hedged requests to the feature store, per-step timeouts with cached fallbacks, and request-level retries with backoff.",
        "The ANN retrieval step needs more replicas to reduce p99.",
        "Response serialization at 5 ms is the bottleneck — switch from JSON to protobuf.",
      ],
      correctAnswer: 1,
      explanation:
        "p99 spikes in sequential multi-step pipelines arise from tail latency amplification: even if each step's p99 is acceptable individually, the combination of independent slow-tail probabilities means a 4-step pipeline has a compounded probability of a slow response. Hedged requests (speculative execution) and per-step timeouts with cached fallbacks are the standard mitigations.",
      hints: [
        "Tail latency amplification: k sequential steps each with P(slow)=0.01 gives P(at least one slow)=1-(0.99^k).",
        "Hedged requests: send the same feature fetch to two Redis replicas simultaneously; use whichever responds first.",
      ],
    },
  ],

  "ml-data-flywheel": [
    {
      id: "q-msd-dfw1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A data flywheel in ML systems refers to a virtuous cycle where a better model attracts more users, generating more data, which enables training an even better model. Which design pattern MOST directly creates this flywheel?",
      options: [
        "Deploying the model on the largest GPU cluster available.",
        "Logging all user interactions (implicit feedback) and using them as training signal for the next model iteration, so more usage directly produces more training data.",
        "Running frequent A/B experiments to compare model variants.",
        "Hiring more data annotators to produce labeled training data faster.",
      ],
      correctAnswer: 1,
      explanation:
        "The data flywheel is driven by implicit signal collection: every user interaction (click, purchase, dwell time, skip) becomes a training example for the next model. This means the model improves as usage grows, which makes it more useful, attracting more users. The key design requirement is that the logging infrastructure captures all relevant user signals and feeds them back into the training pipeline automatically.",
      hints: [
        "Implicit feedback (clicks, purchases) scales with usage and requires no human labeling cost.",
        "The flywheel only turns if the feedback loop is closed: user signal → training data → better model → more users.",
      ],
    },
    {
      id: "q-msd-dfw1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Implicit feedback signals (e.g., clicks, dwell time, purchase completions) are always an unbiased proxy for user satisfaction and can be used directly as training labels without any preprocessing.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Implicit signals are noisy and biased. Position bias means top-ranked items receive more clicks regardless of quality. Exposure bias means items never shown have zero clicks despite potential quality. Preprocessing steps — inverse propensity scoring (IPS) for position bias, exploration to counter exposure bias, and negative sampling strategies — are required before these signals become reliable training labels.",
      hints: [
        "A click at rank 1 and a click at rank 10 are not equally strong signals of relevance.",
        "Exposure bias: the model never sees signal for items it never recommends — creating a filter bubble.",
      ],
    },
    {
      id: "q-msd-dfw1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A marketplace app collects 50 million user interactions per day as implicit feedback. Which data flywheel design problem is MOST critical to address?",
      options: [
        "Storage cost — 50M events/day is too large to store.",
        "Feedback loop bias: the current model controls which items users see, so training on its logs reinforces existing decisions. Items the model underranked have no signal, and any model biases are amplified in the next iteration.",
        "Label noise — implicit signals have too much noise for supervised learning.",
        "Latency — 50M events/day cannot be processed in real-time.",
      ],
      correctAnswer: 1,
      explanation:
        "The feedback loop bias is the most critical problem: the model only generates training signal for items it chooses to show. Items suppressed by the current model never get clicks and are permanently disadvantaged in future training runs. Mitigations: exploration (\\epsilon-greedy or Thompson sampling to expose non-top-ranked items), off-policy correction (IPS weighting), and counterfactual evaluation techniques.",
      hints: [
        "If the model always shows item A and never item B, item A gets clicks and item B gets zero — even if B is better.",
        "The fix requires deliberate exploration: occasionally showing non-top-ranked items to collect unbiased signal.",
      ],
    },
  ],

  "ml-personalization": [
    {
      id: "q-msd-pers1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a personalization system, a user embedding captures the user's latent preferences. Which statement correctly describes how user embeddings are used at inference time?",
      options: [
        "The user embedding is recomputed from scratch on every request by re-running the full model.",
        "A pre-computed user embedding is retrieved from the online feature store and used directly as input features to the ranking or retrieval model, avoiding recomputation at request time.",
        "User embeddings are computed by asking users to fill out explicit preference surveys.",
        "User embeddings are only used during training and are not available at serving time.",
      ],
      correctAnswer: 1,
      explanation:
        "User embeddings are expensive to compute (requiring a pass over the user's interaction history) and change slowly. Production systems pre-compute embeddings in a batch job (hourly, daily) and materialize them to an online feature store (Redis). At serving time, the embedding is fetched with a sub-millisecond point lookup and passed directly to the model, separating the expensive embedding computation from the latency-sensitive serving path.",
      hints: [
        "Recomputing a user embedding from scratch at request time would add hundreds of milliseconds — unacceptable for real-time serving.",
        "Pre-compute slow-changing features; compute fast-changing features (session signals) in real-time.",
      ],
    },
    {
      id: "q-msd-pers1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Session context (the sequence of items a user interacted with in the current browsing session) is more informative than long-term user embeddings for predicting the user's NEXT action within the same session.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Within a session, user intent is highly specific and transient. A user browsing running shoes in the current session has a strong immediate intent that may differ entirely from their long-term profile. Session-aware models (transformers over recent interaction sequences, e.g., BERT4Rec, SASRec) capture this short-term context and outperform long-term embedding models for next-item prediction within a session. Long-term embeddings are valuable for the first item shown at session start.",
      hints: [
        "Session context captures current intent; long-term embeddings capture stable preferences — both are needed.",
        "SASRec and BERT4Rec use self-attention over item sequences to capture session dynamics.",
      ],
    },
    {
      id: "q-msd-pers1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A new user signs up for a fintech app (zero history). The personalization system must immediately serve relevant financial product recommendations. Which cold-start strategy is MOST effective?",
      options: [
        "Show globally most popular products — simple and requires no user data.",
        "Use a multi-armed bandit (e.g., Thompson Sampling) initialized with population-level priors segmented by onboarding signals (age, income range, stated goals), updated with each new user interaction during the session.",
        "Wait 30 days before personalizing — collect enough data first.",
        "Use the most recently popular products in the user's geographic region.",
      ],
      correctAnswer: 1,
      explanation:
        "Cold-start personalization requires balancing exploration (learning user preferences) with exploitation (recommending products likely to be relevant). Thompson Sampling initialized with population priors derived from similar users segmented by onboarding signals provides personalized starting recommendations and rapidly updates posterior beliefs as the user interacts, avoiding purely random exploration.",
      hints: [
        "Thompson Sampling: maintain a Beta distribution over each item's click probability; sample from it to select items; update on each interaction.",
        "Onboarding signals (age, income, stated goal) allow segmenting the population prior — 25-year-old investor vs. 55-year-old retiree need different priors.",
      ],
    },
  ],

  "multi-modal-system-design": [
    {
      id: "q-msd-mm1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a vision-language model serving system (e.g., a product search that accepts both image and text queries), what is the primary architectural challenge compared to a text-only system?",
      options: [
        "Vision-language models cannot be deployed in the cloud.",
        "The system must encode queries from two different modalities into a shared embedding space, requiring modality-specific encoders and a fusion mechanism, with significantly higher compute per request due to image encoding.",
        "Image queries always produce lower quality results than text queries.",
        "Multi-modal systems require separate databases for images and text.",
      ],
      correctAnswer: 1,
      explanation:
        "Vision-language systems face two unique challenges: (1) modality gap — images and text live in different feature spaces that must be aligned (via contrastive training like CLIP); (2) compute asymmetry — image encoding is typically 5–10× more expensive than text encoding (ViT-L processes 224×224 images through 24 attention layers). The serving architecture often pre-encodes gallery images offline to avoid on-the-fly encoding at query time.",
      hints: [
        "CLIP pre-encodes all gallery images offline; at query time only the query (text or image) is encoded in real time.",
        "Image encoder (ViT-L): ~50 ms. Text encoder (BERT-base): ~5 ms. The asymmetry drives architectural decisions.",
      ],
    },
    {
      id: "q-msd-mm1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a multi-modal retrieval system (text + image), late fusion (encoding each modality independently then combining embeddings) always outperforms early fusion (concatenating raw features before encoding) in retrieval quality.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Late fusion and early fusion have different trade-offs. Late fusion (separate encoders per modality, then combine embeddings) is computationally efficient because gallery modalities can be pre-encoded offline. Early fusion can capture richer cross-modal interactions but requires joint encoding at query time — making it infeasible for retrieval over large galleries. Cross-encoders (early fusion) are reserved for reranking small candidate sets where quality trumps latency.",
      hints: [
        "Late fusion: pre-encode gallery offline → ANN search at query time. Early fusion: cannot pre-encode — requires joint encoding at query time.",
        "For retrieval scale (millions of items), late fusion is the practical choice; early fusion wins on accuracy for reranking.",
      ],
    },
    {
      id: "q-msd-mm1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A fashion e-commerce platform builds a visual similarity search: users upload a clothing image and receive visually similar products from a catalog of 10 million items. Which serving pipeline is correct?",
      options: [
        "At query time: encode the uploaded image + encode all 10M catalog images → compute all cosine similarities → return top-k.",
        "Offline: encode all 10M catalog images and index in an ANN index (FAISS/HNSW). At query time: encode the user's uploaded image → ANN search over pre-indexed catalog → return top-k. Re-rank with a cross-modal reranker if needed.",
        "Train a classifier with 10M output classes (one per item) and predict the closest item class.",
        "Use perceptual hashing (pHash) to find visually identical items — no ML model required.",
      ],
      correctAnswer: 1,
      explanation:
        "The standard vision similarity search pipeline: (1) offline: encode all catalog images with a vision backbone (ViT, ResNet) and build an ANN index (FAISS IVF-PQ) — 10M × 512-dim embeddings in FP16 ≈ 10 GB; (2) online: encode the query image (50–100 ms for ViT-L), ANN search returns top-1000 in <10 ms. Computing all 10M similarities at query time would take seconds. A 10M-class classifier cannot generalize to new catalog items without retraining.",
      hints: [
        "10M cosine similarities × ~1 µs each = 10 seconds. ANN search: O(log n) = milliseconds.",
        "New catalog items only need to be encoded and added to the ANN index — no model retraining required.",
      ],
    },
  ],

  "geospatial-ml-systems": [
    {
      id: "q-msd-geo1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A ride-sharing app needs to find all available drivers within 2 km of a user's location in real time. Which spatial indexing technique is MOST appropriate for this point-radius query at scale?",
      options: [
        "Linear scan of all driver GPS coordinates — O(n) but always correct.",
        "Geohash-based spatial index: encode driver locations as geohash strings and query neighboring geohash cells that intersect the 2 km radius.",
        "Inverted index on city name — group drivers by city for fast lookup.",
        "B-tree index on latitude and longitude — standard database indexing handles spatial queries.",
      ],
      correctAnswer: 1,
      explanation:
        "Geohash encodes 2D (lat/lon) coordinates into a 1D string with hierarchical prefix properties: nearby locations share long common prefixes. A geohash of length 7 covers ~153m × 153m cells. To find drivers within 2 km, query the geohash cell of the user plus its 8 neighbors. Redis GEO commands (GEOSEARCH) implement this natively with sub-millisecond radius queries. B-tree indexes on lat/lon are inefficient for radius queries because lat and lon are indexed independently in 1D.",
      hints: [
        "Geohash length 6 ≈ 1.2 km × 0.6 km cells. Length 7 ≈ 153 m × 153 m. Choose based on query radius.",
        "Redis GEOSEARCH command: geohash-based spatial index built into Redis — sub-millisecond radius queries.",
      ],
    },
    {
      id: "q-msd-geo1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Training a geospatial ML model (e.g., predicting demand by location) with raw GPS coordinates (latitude, longitude) as features is equivalent in quality to using spatial embeddings or geohash encodings.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Raw (lat, lon) coordinates are poor ML features because they lack spatial locality properties for models: lat=37.7749 and lat=37.7750 are neighbors but their difference carries no semantic meaning without knowing the coordinate system. Geohash or H3 hexagonal indexing creates categorical spatial features that capture neighborhood structure. Location embeddings (trained on spatial co-occurrence) further capture semantic relationships like 'downtown area' or 'airport zone'. Additionally, raw coordinates don't generalize across cities.",
      hints: [
        "H3 hexagonal indexing (Uber's open-source library) provides multi-resolution spatial features at up to 15 resolutions.",
        "Raw (lat, lon) require feature engineering to expose spatial structure to ML models.",
      ],
    },
    {
      id: "q-msd-geo1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A mapping application collects GPS traces from millions of users to improve road quality predictions. Which privacy-preserving mechanism protects individual location privacy while still enabling accurate aggregate ML training?",
      options: [
        "Store all raw GPS traces — location data is not personally identifiable.",
        "Apply local differential privacy (LDP) with calibrated noise added to GPS coordinates on-device before transmission, ensuring individual traces cannot be reverse-engineered while aggregate statistics remain accurate for training.",
        "Delete GPS data after 24 hours to limit exposure.",
        "Anonymize GPS data by removing timestamps — location without time is not personally identifiable.",
      ],
      correctAnswer: 1,
      explanation:
        "GPS traces are highly sensitive — research shows 4 spatiotemporal points uniquely identify 95% of individuals. Local differential privacy (LDP) adds calibrated noise to location reports on the device before transmission, providing mathematical privacy guarantees. The \\epsilon parameter controls the privacy-accuracy trade-off. Apple uses LDP for keyboard usage stats; Google uses it for Chrome histogram collection. Removing timestamps does not prevent re-identification from location patterns (home/work inference).",
      hints: [
        "LDP: noise is added on-device. Central DP: noise is added server-side after collection. LDP provides stronger user privacy guarantees.",
        "With \\epsilon=1, LDP randomizes ~37% of reports — the aggregate over millions of users still converges accurately.",
      ],
    },
  ],

  "time-series-ml-systems": [
    {
      id: "q-msd-ts1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A demand forecasting model for a retail chain shows consistently high errors in December. The model was trained on 3 years of daily sales data. What is the MOST likely cause?",
      options: [
        "The model architecture is too small to capture seasonal patterns.",
        "Insufficient seasonality data: with only 3 Decembers in the training set, the model cannot reliably learn the holiday demand spike. Adding explicit seasonal features (month-of-year, days-until-holiday, is_holiday indicator) corrects this.",
        "The evaluation metric is wrong — use RMSE instead of MAE.",
        "The model is overfitting to the training years and cannot generalize.",
      ],
      correctAnswer: 1,
      explanation:
        "With 3 years of data, the model has seen December only 3 times — insufficient to learn its statistical behavior robustly. Adding explicit seasonal features (Fourier terms for yearly seasonality, holiday indicators, days-before/after holidays) encodes domain knowledge directly and greatly improves generalization for rare seasonal patterns. Prophet, N-BEATS, and TFT all use explicit seasonality decomposition for this reason.",
      hints: [
        "3 years → 3 Decembers → the model has 3 training samples for the most important retail month.",
        "Fourier features (sin/cos of day-of-year) provide smooth seasonality encoding that generalizes across years.",
      ],
    },
    {
      id: "q-msd-ts1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In time-series forecasting, concept drift (the relationship between features and the target changing over time) is fully addressed by retraining the model on the most recent data window and discarding all older training data.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Discarding all historical data risks losing important recurring patterns (e.g., seasonal trends). The correct approach uses a combination of: (1) recency weighting — exponentially decaying sample weights give more influence to recent data without discarding old data; (2) rolling window retraining — use the most recent N time steps as the primary training window; (3) concept drift detection algorithms (ADWIN, Page-Hinkley) to trigger model updates when drift is detected.",
      hints: [
        "Exponential decay weights: recent data matters more but historical patterns (seasonality) still contribute.",
        "ADWIN (Adaptive Windowing) statistically detects when the data distribution has changed and triggers retraining.",
      ],
    },
    {
      id: "q-msd-ts1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A logistics company needs multi-step demand forecasting: predict demand 1 day, 7 days, and 30 days ahead simultaneously. Which modeling approach best handles multi-horizon forecasting without accumulating prediction error?",
      options: [
        "Recursive (autoregressive) forecasting: predict 1-day ahead, feed the prediction as input, predict the next day, repeat 30 times.",
        "Direct multi-output forecasting: train a single model with multiple output heads (one per forecast horizon), predicting all horizons simultaneously from the same input features without feeding predictions back as inputs.",
        "Train 30 separate models, one for each forecast horizon, independently.",
        "Use the 1-day model for all horizons by taking the prediction at day 1 and scaling by the horizon.",
      ],
      correctAnswer: 1,
      explanation:
        "Recursive forecasting accumulates error: each 1-step prediction error compounds over 30 steps, leading to large errors at the 30-day horizon. Direct multi-output forecasting trains one model with multiple output heads predicting all horizons simultaneously from the current input — no error accumulation. Temporal Fusion Transformer (TFT) and N-HiTS are direct multi-horizon architectures widely used in production forecasting.",
      hints: [
        "Recursive forecasting error at step k grows approximately as k × \\sigma_1 for independent errors.",
        "Direct forecasting: all output heads are trained jointly from the same features, with no error accumulation across steps.",
      ],
    },
  ],

  "llm-system-design": [
    {
      id: "q-msd-llm1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A company builds a customer service chatbot using an LLM API. Which system design pattern MOST reduces API cost at scale while maintaining response quality?",
      options: [
        "Increase the max_tokens parameter to ensure complete responses.",
        "Implement semantic caching: embed incoming user queries, search a vector database for semantically similar past queries, and return the cached LLM response if cosine similarity exceeds a threshold (e.g., 0.95).",
        "Use a larger model for all queries to reduce retries.",
        "Log all queries but do not cache — caching LLM responses introduces staleness.",
      ],
      correctAnswer: 1,
      explanation:
        "Semantic caching reduces LLM API calls by identifying near-duplicate queries and serving cached responses. For customer service chatbots, many queries are paraphrases of the same question ('How do I reset my password?' / 'I forgot my password'). By embedding queries and finding semantically similar ones (using FAISS or Pinecone), cached responses can serve 20–40% of queries without an API call. GPTCache implements this pattern.",
      hints: [
        "Customer service queries have high repetition — password reset, billing, and shipping inquiries dominate.",
        "Semantic cache hit rate depends on similarity threshold: too high = low hit rate; too low = wrong responses.",
      ],
    },
    {
      id: "q-msd-llm1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Prompt versioning and management at scale (tracking which prompt template generated each LLM response in production) is unnecessary operational overhead because prompt changes are small text edits that do not significantly affect system behavior.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Prompt changes in production LLM systems are equivalent to code changes — they directly affect model behavior, output quality, and safety. A single word change in a system prompt can dramatically alter LLM outputs. Prompt versioning is required for: debugging regressions, A/B testing prompt variants, audit trails in regulated industries, and rollback when a prompt change causes issues. Tools like LangSmith and PromptLayer enable prompt versioning.",
      hints: [
        "A prompt is the model's 'code' at inference time — changing it is as impactful as changing model weights.",
        "Without prompt versioning, a customer complaint about bad LLM output cannot be reproduced or debugged.",
      ],
    },
    {
      id: "q-msd-llm1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An LLM API serving system handles 10,000 concurrent requests with highly variable output lengths (10–2000 tokens). The system uses static batching. Which problem does static batching create, and what replaces it?",
      options: [
        "GPU memory fragmentation — static batching wastes memory. Replace with unified memory.",
        "GPU utilization collapse: when the longest sequence in a batch finishes last, all other GPU slots sit idle. Continuous batching (iteration-level scheduling, used in vLLM) adds new requests as sequences complete, eliminating idle time and improving throughput by 5–20×.",
        "Network bandwidth saturation — static batching requires too many tokens to be transferred. Replace with token streaming.",
        "Cache invalidation overhead — replace with request-level KV cache pinning.",
      ],
      correctAnswer: 1,
      explanation:
        "In static batching, a batch of 32 requests must all finish before new requests start. If 31 requests finish in 100 tokens but 1 runs for 2000 tokens, 31 GPU slots are idle for 1900 tokens worth of generation time — approximately 95% GPU waste for those slots. Continuous batching (vLLM's key innovation) schedules at the token generation step: when any sequence reaches EOS or max_tokens, its slot is immediately replaced by a new waiting request.",
      hints: [
        "Idle GPU in static batching: slots that finished early wait for the slowest sequence in the batch.",
        "vLLM introduced PagedAttention + continuous batching in 2023, showing 23× throughput improvement over naive serving.",
      ],
    },
  ],

  "ml-fairness-systems": [
    {
      id: "q-msd-fair1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A hiring algorithm ranks job applicants and is found to recommend men at a 2× higher rate than equally qualified women. Which fairness criterion is violated and what is the simplest post-processing fix?",
      options: [
        "Calibration is violated — apply Platt scaling to recalibrate scores.",
        "Demographic parity is violated (men and women are not recommended at equal rates). Post-processing fix: apply separate score thresholds per gender group, tuning each threshold to achieve equal positive prediction rates across groups.",
        "Individual fairness is violated — rank candidates purely by individual qualifications.",
        "Accuracy parity is violated — retrain the model on balanced data.",
      ],
      correctAnswer: 1,
      explanation:
        "Demographic parity (statistical parity) requires equal positive prediction rates across demographic groups. The simplest post-processing fix is group-specific thresholds: if the model scores women lower on average due to historical bias in training data, lower the threshold for women to equalize recommendation rates. This does not require retraining. More sophisticated approaches include reweighting training examples or adversarial debiasing.",
      hints: [
        "Post-processing is the cheapest fairness fix: adjust thresholds after training without modifying the model.",
        "Demographic parity does not require equal accuracy — it requires equal positive prediction rates.",
      ],
    },
    {
      id: "q-msd-fair1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "It is mathematically possible to simultaneously satisfy demographic parity (equal positive rates across groups), equalized odds (equal TPR and FPR across groups), and calibration (predicted probabilities match observed rates) when base rates differ between groups.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "Chouldechova's impossibility theorem (2017) proves that when group base rates differ, it is mathematically impossible to simultaneously satisfy calibration, equal positive predictive value, and equal false positive rates. The fairness impossibility result means practitioners must choose which fairness criteria to prioritize based on the application domain — there is no single correct fairness definition that applies universally.",
      hints: [
        "Chouldechova (2017) proved the fairness impossibility theorem — satisfying all fairness criteria simultaneously is impossible when base rates differ.",
        "Practitioners must choose which fairness criterion matters most for their specific application and stakeholders.",
      ],
    },
    {
      id: "q-msd-fair1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A credit scoring model is required by regulation to achieve equalized odds (equal TPR and FPR) across racial groups while maintaining overall AUC above 0.80. How is this constraint enforced in a production ML system?",
      options: [
        "Add race as an explicit feature so the model can learn group-specific patterns.",
        "Apply constrained optimization during training: add fairness constraints as Lagrange multipliers to the loss function (e.g., |TPR_group_A − TPR_group_B| ≤ \\epsilon), and monitor fairness metrics in production with automated alerts when constraints are violated.",
        "Retrain the model separately for each racial group — separate models guarantee fairness.",
        "Apply a uniform score multiplier to all members of the disadvantaged group.",
      ],
      correctAnswer: 1,
      explanation:
        "Equalized odds constraints can be enforced during training using Lagrangian relaxation (Agarwal et al., Reductions Approach to Fairness): the fairness constraint is added as a penalty term to the training loss. Fairlearn and IBM AIF360 implement this. In production, fairness metrics (TPR and FPR by group) must be monitored continuously — distribution shifts can violate constraints without model retraining. Using race as a feature is legally prohibited under ECOA in US credit scoring.",
      hints: [
        "Fairlearn (Microsoft) and AIF360 (IBM) implement constrained optimization for equalized odds.",
        "Production fairness monitoring: compute TPR and FPR by demographic group on a rolling window of recent decisions.",
      ],
    },
  ],

  "distributed-training-design": [
    {
      id: "q-msd-dt1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In distributed deep learning training, what is the key difference between a parameter server architecture and ring-AllReduce?",
      options: [
        "Parameter servers are used for small models; ring-AllReduce is used for large models.",
        "In parameter server (PS) architecture, gradient aggregation is centralized through PS nodes creating a bandwidth bottleneck; in ring-AllReduce, each worker communicates only with its two neighbors in a logical ring, aggregating gradients in a decentralized, bandwidth-efficient manner.",
        "Parameter servers run on CPUs; ring-AllReduce runs exclusively on GPUs.",
        "Ring-AllReduce requires more total communication volume than parameter servers.",
      ],
      correctAnswer: 1,
      explanation:
        "Parameter server architecture: all workers send gradients to central PS nodes, which aggregate and broadcast updated parameters — the PS nodes become network bottlenecks as worker count grows. Ring-AllReduce: workers are arranged in a logical ring; each worker communicates with only its two neighbors in 2(N-1) steps, with near-optimal bandwidth utilization regardless of N. Ring-AllReduce (used by Horovod, PyTorch DDP) scales linearly and is the standard for data-parallel training.",
      hints: [
        "PS bottleneck: if N=100 workers each send gradients to 1 PS node, the PS needs 100× the bandwidth of one worker.",
        "Ring-AllReduce: bandwidth per worker is constant regardless of N — it scales perfectly.",
      ],
    },
    {
      id: "q-msd-dt1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gradient compression techniques (e.g., Top-K sparsification, 1-bit quantization of gradients) can reduce communication volume in distributed training by 10–100× with minimal impact on final model accuracy.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Gradient sparsification selects only the largest K% of gradient values for communication, transmitting ~1% of the full gradient with error feedback (storing unshared gradients and adding them to the next step). 1-bit SGD quantizes gradient values to ±1, reducing communication to 32× fewer bits. Studies show these techniques achieve near-identical final accuracy to full-precision AllReduce, because small gradients contribute minimally to model updates and error feedback ensures no gradient information is permanently lost.",
      hints: [
        "Top-K sparsification: send only the K largest gradient elements. Error feedback: accumulate unsent gradients and add them next step.",
        "Communication bandwidth, not compute, is often the bottleneck in large distributed training — compression is critical.",
      ],
    },
    {
      id: "q-msd-dt1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A distributed training job runs on 64 GPUs across 8 nodes. After 6 hours of training, one GPU fails. Which fault tolerance design ensures the job continues without restarting from the beginning?",
      options: [
        "Stop the job, replace the GPU, and restart training from epoch 0.",
        "Implement periodic checkpointing (e.g., every 30 minutes) with elastic training (TorchElastic): on failure, the remaining 63 GPUs re-partition the data and model, load the latest checkpoint, and continue training — losing at most 30 minutes of work.",
        "Use synchronous training — synchronous updates automatically handle GPU failures without checkpointing.",
        "Assign the failed GPU's work to the CPU on the same node as a fallback.",
      ],
      correctAnswer: 1,
      explanation:
        "Synchronous distributed training requires all workers to participate in each AllReduce step; a single GPU failure stalls the entire job. Fault tolerance requires: (1) periodic checkpointing (model weights, optimizer state, RNG state, training step); (2) elastic training (TorchElastic, DeepSpeed elasticity) that allows job continuation with N-1 workers after a failure, re-sharding the data parallelism automatically; (3) spot/preemptible instance handling in cloud deployments.",
      hints: [
        "Checkpointing interval = max acceptable restart cost. Every 30 minutes: lose at most 30 min of training.",
        "TorchElastic: workers register with a rendezvous backend; on worker failure, surviving workers reform the group and continue.",
      ],
    },
  ],

  "ml-experiment-platform": [
    {
      id: "q-msd-exp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "An ML team runs 200 hyperparameter search trials simultaneously on a shared GPU cluster. Which hyperparameter search strategy is MOST sample-efficient (finds good hyperparameters with the fewest trials)?",
      options: [
        "Grid search: exhaustively search all combinations of hyperparameter values.",
        "Bayesian optimization (e.g., TPE, Gaussian Process): use a probabilistic surrogate model of the objective function to select the next trial based on expected improvement, learning from previous trial results.",
        "Random search: sample hyperparameters uniformly at random from the search space.",
        "Manual search: have experienced ML engineers guess promising hyperparameter values.",
      ],
      correctAnswer: 1,
      explanation:
        "Bayesian optimization is the most sample-efficient hyperparameter search strategy: it builds a probabilistic model (surrogate) of the objective function and uses acquisition functions (Expected Improvement, Upper Confidence Bound) to select the next trial that is most likely to improve upon the best known result. This converges to good hyperparameters in 50–100 trials vs. 1000+ for grid search. Optuna (TPE), Ray Tune (BOHB), and Weights & Biases Sweeps implement this.",
      hints: [
        "Grid search: exponential in number of hyperparameters. Bayesian: learns which regions are promising and focuses there.",
        "Bergstra & Bengio (2012): random search outperforms grid search; Bayesian optimization outperforms random search.",
      ],
    },
    {
      id: "q-msd-exp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Successive Halving and Hyperband early-stopping algorithms improve hyperparameter search efficiency by terminating unpromising trials early based on intermediate validation metrics, allowing more total configurations to be explored within a fixed compute budget.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation:
        "Successive Halving allocates a small resource budget (e.g., 10 epochs) to all N configurations, keeps the top 1/\\eta fraction, doubles resources, and repeats until one configuration remains. Hyperband runs multiple Successive Halving brackets with different initial resource allocations to balance exploration vs. exploitation. This adaptive resource allocation allows exploring 10–100× more configurations than full training within the same compute budget. Ray Tune and Optuna implement Hyperband natively.",
      hints: [
        "Successive Halving: start with N configs at 1 epoch each. Keep top N/3 → train to 3 epochs. Keep top N/9 → train to 9 epochs.",
        "Hyperband eliminates the choice of starting resources in Successive Halving by running multiple brackets simultaneously.",
      ],
    },
    {
      id: "q-msd-exp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An ML experiment platform must manage 10,000 parallel hyperparameter trials across a shared GPU cluster. Which design ensures fair resource allocation and prevents any single experiment from monopolizing the cluster?",
      options: [
        "First-come, first-served scheduling — simple and predictable.",
        "A multi-level priority scheduler: trials are grouped by experiment with per-experiment GPU quotas enforced by a resource manager (e.g., Kubernetes resource limits + fair-share scheduling via YARN or Slurm with preemption). High-priority experiments receive guaranteed quota; exploratory experiments receive best-effort scheduling.",
        "Run all trials sequentially on a single large GPU node — avoids scheduling complexity.",
        "Allow researchers to manually reserve GPU blocks for their experiments.",
      ],
      correctAnswer: 1,
      explanation:
        "Fair resource allocation in a shared ML cluster requires: (1) per-experiment GPU quotas; (2) priority tiers (production training > HPO > exploration); (3) preemption (low-priority jobs are suspended when high-priority jobs need resources); (4) gang scheduling for distributed training (all workers of one trial must start simultaneously). Kubernetes + Volcano or Slurm with fairshare scheduling implement this. First-come, first-served allows early-submitted experiments to monopolize resources.",
      hints: [
        "Fair-share scheduling: compute each team's fair share of cluster resources over time and prioritize teams below their share.",
        "Gang scheduling for distributed training: schedule all N workers of a trial simultaneously to avoid deadlock.",
      ],
    },
  ],
};

const sysdesign: Record<string, Question[]> = {
  "sysdesign-rate-limiting": [
    {
      id: "q-msd-sd-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A public API must enforce 100 requests/second per user. Requests arrive in bursts. Which rate-limiting algorithm best handles bursts while strictly enforcing the average rate?",
      options: [
        "Fixed window counter — increment a counter each second, reject when it hits 100. Simple and exact.",
        "Token bucket — tokens accumulate at 100/sec up to a burst capacity (e.g., 200 tokens). Requests consume tokens; excess requests are dropped. Allows short bursts up to bucket size while enforcing the 100 req/s average.",
        "Leaky bucket — requests enter a queue processed at 100/sec, excess requests are immediately dropped. Smooths output but does not allow any bursting.",
        "Sliding window log — store timestamps of each request; reject if the count in the last 1 s window exceeds 100. Accurate but memory-intensive.",
      ],
      correctAnswer: 1,
      explanation:
        "Token bucket is the standard answer for burst-tolerant rate limiting. Tokens accumulate at the configured rate (100/s) up to a maximum bucket size. A burst of 200 requests can be served instantly if tokens are available, then the client is throttled until more tokens accrue. Leaky bucket enforces a strictly smooth output rate — it does not allow bursting. Fixed window allows up to 2x the rate at window boundaries. Sliding window log is accurate but requires O(requests) memory per user.",
      hints: [
        "Burst allowance = bucket capacity. If bucket holds 200 tokens, a client can send 200 requests instantly after being idle for 2 seconds.",
        "Leaky bucket fills a queue and processes it at a fixed rate — this is an output-rate limiter, not a burst-tolerant one.",
      ],
    },
    {
      id: "q-msd-sd-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a distributed system with multiple API gateway nodes, a local (in-process) rate limiter on each node guarantees that the global per-user request rate is enforced accurately.",
      correctAnswer: "False",
      explanation:
        "Local rate limiters enforce per-node limits, not global limits. If a user sends requests to 5 nodes with a local limit of 100 req/s each, they can achieve 500 req/s globally. Accurate global rate limiting requires either (a) a centralized store (Redis with atomic INCR/EXPIRE) that all nodes consult, or (b) a consistent-hash load balancer that routes each user to exactly one node. Centralized Redis with Lua scripting is the most common production approach, accepting the latency trade-off of a network hop per request.",
      hints: [
        "Sticky sessions (routing user X always to node Y) make local rate limiting accurate — but require consistent hashing or session affinity.",
        "Redis INCR + EXPIRE with a Lua script is atomic and safe for distributed rate limiting.",
      ],
    },
  ],
  "sysdesign-caching": [
    {
      id: "q-msd-sd-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A social media feed system caches user timelines in Redis. When a celebrity with 10 million followers posts, all cached timelines become stale simultaneously. What pattern avoids the resulting thundering-herd cache miss storm?",
      options: [
        "Increase Redis memory so all timelines fit — eliminates eviction and staleness.",
        "Use write-around caching — on celebrity post, skip updating the cache entirely and let reads populate it lazily from the DB.",
        "Fanout-on-write with probabilistic early expiration: pre-compute and push the new post to followers' cached timelines, and use jittered TTLs plus a 'soft TTL' (background refresh before hard expiry) to prevent simultaneous expiry.",
        "Add a read-through cache layer with a 5-second lock: when cache misses, one thread fetches from DB while others wait behind a mutex.",
      ],
      correctAnswer: 2,
      explanation:
        "The celebrity problem (hot key / thundering herd) has two sub-problems: (1) computing the fan-out (pushing to 10M followers) and (2) cache stampede when all timeline caches expire together. Fanout-on-write pre-computes and pushes the post to each follower's cached feed asynchronously (message queue), so reads are always cache hits. Jittered TTLs prevent synchronized expiry. Probabilistic early expiration (PER / XFetch algorithm) refreshes cache entries slightly before their TTL expires using a probabilistic formula, eliminating the stampede. Option D (mutex lock) serializes but does not scale — 10M users waiting on one lock.",
      hints: [
        "XFetch early expiration formula: refresh if current_time - fetch_time * beta * log(rand()) > expiry_time. With beta=1 and rand()~U(0,1), refreshes happen more often as TTL approaches.",
        "Twitter uses fanout-on-write for normal users but fanout-on-read for celebrities (hybrid approach), trading write throughput for read latency.",
      ],
    },
    {
      id: "q-msd-sd-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A database-backed web service uses a cache-aside (lazy loading) pattern. After a cache miss, the service fetches from the DB and writes to cache. Under high concurrency, two threads both miss the cache for the same key simultaneously. What is this problem called, and what is the standard fix?",
      options: [
        "Cache stampede (dog-pile effect). Fix: use a distributed lock (e.g., Redis SET NX EX) so only one thread fetches from DB while others wait or serve stale data.",
        "Cache poisoning. Fix: validate all data before writing to cache.",
        "Cache eviction storm. Fix: increase cache TTL so items stay longer.",
        "Read-your-writes inconsistency. Fix: route the user to a replica with synchronous replication.",
      ],
      correctAnswer: 0,
      explanation:
        "Cache stampede (also called dog-pile or thundering herd) occurs when many concurrent requests miss the same key and all attempt to rebuild the cache simultaneously, overwhelming the database. The standard fix is a distributed lock: SET key:lock 1 NX EX 5 in Redis — only the first thread acquires it, fetches from DB, and populates the cache. Other threads either (a) wait and retry, or (b) serve stale data if a previous value exists (stale-while-revalidate). Alternatively, probabilistic early expiration proactively refreshes before the TTL expires, preventing the mass-miss scenario entirely.",
      hints: [
        "Redis SET NX EX is atomic — SET if Not eXists with an EXpiry. This creates a distributed mutex with automatic lock release on timeout.",
        "Stale-while-revalidate: return the old cached value immediately while asynchronously refreshing in the background.",
      ],
    },
  ],
};
Object.assign(questions, sysdesign);

const famous: Record<string, Question[]> = {
  "sysdesign-url-shortener": [
    {
      id: "q-msd-famous-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Design TinyURL: you need to generate a unique 7-character short code for each long URL, handling 100M URLs total and 10K write requests/second. Which ID generation + encoding approach is most appropriate?",
      options: [
        "Use MD5(long_url) and take the first 7 characters. Pros: deterministic (same URL always gets same code). Cons: MD5 collisions occur at ~100M entries; truncating to 7 chars makes collisions near-certain.",
        "Auto-increment a 64-bit integer in the DB and encode it in base62 (a-z, A-Z, 0-9). A 7-char base62 string encodes up to 62^7 ≈ 3.5 trillion unique IDs, far more than 100M. Pros: no collisions, short codes, simple. Cons: single-point auto-increment bottleneck — mitigate with Twitter Snowflake-style distributed ID generation.",
        "Generate a random UUID (128-bit) for each URL. Store UUID→long_url in DynamoDB. Short code = first 7 hex characters of UUID.",
        "Use a consistent hash of the long URL across 10 DB shards. The shard ID + row ID form the short code.",
      ],
      correctAnswer: 1,
      explanation:
        "Base62 encoding of an auto-incremented integer is the canonical answer: 62^7 ≈ 3.5 trillion > 100M, guaranteed no collisions, and 7 characters is short enough. At 10K writes/s, a single auto-increment DB becomes a bottleneck — solutions include: (a) Twitter Snowflake (41-bit timestamp + 10-bit machine ID + 12-bit sequence = 64-bit globally unique monotone IDs with no coordination), or (b) a ticket server (dedicated sequence DB with batch pre-allocation). MD5 truncation has collisions. UUIDs are 32 hex chars, too long if not encoded, and random UUIDs are unordered (bad for B-tree DB performance).",
      hints: [
        "62^7 = 3,521,614,606,208 — always compute this to confirm the ID space is large enough.",
        "Twitter Snowflake format: 1 unused | 41-bit ms timestamp | 10-bit machine | 12-bit sequence. Allows 4096 IDs/ms/machine with no coordination.",
      ],
    },
  ],
  "sysdesign-consistent-hashing": [
    {
      id: "q-msd-famous-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A distributed cache has 4 nodes. Using simple modulo hashing (key % 4), you add a 5th node. Approximately what fraction of keys must be remapped? Using consistent hashing with 100 virtual nodes per server, approximately what fraction is remapped?",
      options: [
        "Modulo: ~80% remapped. Consistent hashing: ~20% remapped.",
        "Modulo: ~80% remapped. Consistent hashing: ~20% remapped — same formula, the only difference is which keys move.",
        "Modulo: 80% remapped (4/5 of keys change their target node). Consistent hashing: ~1/5 = 20% remapped (only keys owned by the new node's range move).",
        "Modulo: 100% remapped (every key's hash % N changes). Consistent hashing: ~1/(N+1) ≈ 20% remapped.",
      ],
      correctAnswer: 3,
      explanation:
        "With modulo hashing and N→N+1 nodes, almost every key maps to a different node (key % N \$\\neq\$ key % (N+1) for most keys), so effectively ~100% of keys must be remapped — catastrophic for a cache. With consistent hashing on a ring, adding one node steals only its fair share: ~1/(N+1) = 1/5 = 20% of keys, and these come from the single adjacent predecessor node. Virtual nodes (vnodes) improve load balance: without them a single physical node might own an uneven arc; with 100 vnodes per server the load variance is low. This is why consistent hashing is used in DynamoDB, Cassandra, and Redis Cluster.",
      hints: [
        "Consistent hashing invariant: adding node X only remaps keys in X's arc on the ring — no other nodes are affected.",
        "Virtual nodes: each physical server owns V points on the ring. Larger V → more uniform load distribution but higher coordination overhead.",
      ],
    },
  ],
  "sysdesign-message-queue": [
    {
      id: "q-msd-famous-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You are designing a Kafka-like message queue for an event pipeline processing 1M events/second with exactly-once semantics and 7-day retention. A consumer falls behind and is 2 hours behind real-time. Which architecture choice is most critical for allowing it to catch up without impacting other consumers?",
      options: [
        "Increase the number of brokers so reads are distributed and the slow consumer gets dedicated bandwidth.",
        "Partition the topic and assign the slow consumer group its own independent offset pointer per partition. Consumers read sequentially from the log; each consumer group tracks its own offset independently, so a slow group does not block fast groups and can catch up by reading its log segment without coordination.",
        "Switch to a push-based model where the broker pushes messages to consumers at a controlled rate, throttling fast consumers to match the slowest.",
        "Use a dead-letter queue: when a consumer falls behind by more than 30 minutes, discard events older than that and log them to a separate DLQ topic for offline reprocessing.",
      ],
      correctAnswer: 1,
      explanation:
        "Kafka's key insight: the log is immutable and consumer groups track offsets independently. A slow consumer group simply has a lower offset than a fast group — they read from the same partitioned log at their own pace, with zero coordination between groups. The slow consumer can parallelize catch-up by adding consumer instances up to the number of partitions (each partition is assigned to exactly one consumer in a group). Retention (7 days of disk) ensures old segments are available. This offset-per-consumer-group design is why Kafka can serve 10+ consumer groups from the same topic with no interference — fundamentally different from traditional queues where consuming removes the message.",
      hints: [
        "Consumer group = independent cursor on the log. Adding consumers to a group parallelizes consumption (one consumer per partition max).",
        "Retention: Kafka keeps all messages until retention.ms or retention.bytes is exceeded — consumers can re-read old messages, enabling replay and catch-up.",
      ],
    },
  ],
  "sysdesign-chat-realtime": [
    {
      id: "q-msd-famous-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Design WhatsApp: for real-time 1-to-1 messaging with 2 billion users, how should the server push new messages to a recipient's mobile device, and how should you handle offline recipients?",
      options: [
        "Short polling: client polls every 1 second. Simple to implement; scales poorly — 2B devices × 1 req/s = 2B req/s server load even when no messages arrive.",
        "Long polling: client holds an HTTP connection open; server responds only when a message arrives (or on timeout). Better than polling but still wastes one HTTP connection per client and has high reconnect overhead on mobile.",
        "WebSocket (persistent bidirectional TCP connection) for online users, maintained by a stateful connection server (chat service). For offline users: store the message in a DB (e.g., Cassandra) keyed by recipient; on reconnect, the client fetches missed messages via REST. Mobile push (APNs/FCM) wakes offline apps.",
        "Server-sent events (SSE): server streams messages over HTTP/2 to the client. Bidirectional by using REST for client→server. Simpler than WebSocket.",
      ],
      correctAnswer: 2,
      explanation:
        "WhatsApp uses persistent WebSocket connections to a fleet of connection servers (Erlang/OTP for massive concurrency — 2M connections per server). Online message flow: sender → connection server → message router → recipient's connection server → recipient via WebSocket. For offline recipients: store message in Cassandra (optimized for write-heavy, keyed by recipient+timestamp); on reconnect, client syncs missed messages. Mobile push (APNs for iOS, FCM for Android) provides the initial wake-up signal. This architecture cleanly separates connection management from message storage, allowing each to scale independently.",
      hints: [
        "Erlang/OTP: each WebSocket connection = one lightweight Erlang process. 2M processes per server is feasible due to Erlang's green threads and preemptive scheduler.",
        "Message storage key design: (recipient_id, timestamp) → allows efficient range scan for 'messages since last seen timestamp' on reconnect.",
      ],
    },
  ],
};
Object.assign(questions, famous);

const famous2: Record<string, Question[]> = {
  "sysdesign-typeahead": [
    {
      id: "q-msd-famous2-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Design Google Search typeahead (autocomplete): given a user typing 'sta', return the top 5 completions in <100ms. You have 10B historical queries with frequencies. Which data structure and serving architecture is correct?",
      options: [
        "Store all queries in a SQL table (query TEXT, freq INT). On each keystroke, run SELECT query FROM searches WHERE query LIKE 'sta%' ORDER BY freq DESC LIMIT 5. Add a B-tree index on query.",
        "Build a trie where each node stores the top-K (e.g., K=5) completions with their frequencies, aggregated from all children. Serve from an in-memory trie per data-center region. On prefix 'sta', traverse 3 nodes and return the pre-computed top-5 list in O(prefix_length) time. Rebuild trie offline every few hours from MapReduce aggregation of query logs.",
        "Use Elasticsearch prefix queries with a completion suggester mapping. The completion suggester uses an in-memory FST (finite-state transducer) for fast prefix lookup with scores.",
        "Cache the top 100K most popular prefixes in Redis (key = prefix, value = JSON array of top 5 completions). Serve from Redis for 99% of queries; fall back to DB for rare prefixes.",
      ],
      correctAnswer: 1,
      explanation:
        "Google's typeahead uses a trie with pre-aggregated top-K lists at each node — this is the canonical answer. Each internal node stores the K highest-frequency completions beneath it, not just the children's prefixes. Traversal is O(length of prefix) = O(3) for 'sta', with O(1) list retrieval. The trie is built offline (MapReduce over query logs) and loaded into each serving machine's memory (~10GB compressed). LIKE queries on SQL are slow even with B-tree indexes (no range scan for suffix patterns). Redis caching only covers hot prefixes; trie handles all prefixes uniformly. Elasticsearch completion suggester is a production alternative (Spotify uses it) but has higher latency than in-memory trie.",
      hints: [
        "Key trie optimization: store top-K completions at EVERY node, not just leaf nodes. Traversing 'sta' returns the pre-computed top-5 without scanning all children.",
        "Trie memory: 10B queries × average 30 chars = ~300GB raw; frequency aggregation collapses to ~50M unique prefixes × top-5 entries ≈ manageable with compression.",
      ],
    },
    {
      id: "q-msd-famous2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a typeahead system, displaying personalized completions (based on the individual user's past queries) requires the same trie data structure as global completions, just partitioned by user_id.",
      correctAnswer: "False",
      explanation:
        "Personalized completions require a fundamentally different architecture. A global trie aggregates frequencies across all users — you cannot shard it by user_id while maintaining global top-K semantics. Personalization is typically done by a separate lightweight model: (1) fetch top-K global completions from the global trie; (2) re-rank using a per-user model that boosts completions matching the user's past query history, location, language, and session context. The re-ranking model (logistic regression or small neural net) runs in-memory with the user's profile vector. This two-stage approach (retrieve then personalize) keeps the global trie simple while enabling personalization.",
      hints: [
        "Two-stage: global retrieval (trie) + per-user re-ranking (lightweight ML model). Same pattern used in recommendation systems.",
        "User query history is typically stored as a bloom filter or recency-weighted frequency vector, not a full trie.",
      ],
    },
  ],
  "sysdesign-netflix": [
    {
      id: "q-msd-famous2-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Design Netflix: a user in Mumbai clicks play on a 4K video. Describe the critical path from click to first frame playing, focusing on how Netflix avoids serving 4K video from its US origin servers.",
      options: [
        "Netflix's origin servers in US stream directly to the user. Adaptive bitrate (ABR) reduces the resolution to 720p for users far from the origin to compensate for latency.",
        "Netflix uses its Open Connect CDN: ISPs host Netflix Open Connect Appliances (OCA) inside their own networks. The Mumbai ISP's OCA has pre-fetched popular titles overnight via proactive caching (Zipf distribution — top 20% of titles = 80% of plays). The player requests the video from the nearest OCA, serving from local storage with sub-millisecond network hops inside the ISP.",
        "Netflix uses AWS CloudFront edge locations. The Mumbai CloudFront PoP caches video segments on-demand (cache-on-miss). The first viewer of an unpopular title fetches from S3 origin and populates the edge cache for subsequent viewers.",
        "Netflix streams via WebRTC peer-to-peer: users in the same city share video chunks with each other, reducing origin server load.",
      ],
      correctAnswer: 1,
      explanation:
        "Netflix's Open Connect is the key differentiator: Netflix partners with ~1000 ISPs globally to place its own servers (OCAs) inside ISP data centers. OCAs proactively fill overnight with the most popular titles predicted for the next day (Zipf distribution means ~95% of plays hit cached content). This means 4K video plays entirely inside the local ISP's network — zero internet backbone traversal. The CDN cost is physical servers at ISPs, not per-GB bandwidth. For uncached long-tail content, OCAs fall back to Netflix's origin (AWS S3 + EC2). The player uses ABR (DASH or HLS): it fetches short 2-4 second segments and dynamically selects bitrate based on measured throughput, enabling smooth startup and quality adaptation.",
      hints: [
        "Open Connect = Netflix's own CDN, not a third-party. Key advantage: ISP placement means video traffic never leaves the ISP's network.",
        "Proactive caching: OCAs pull popular content overnight during off-peak hours, using predicted demand models. Reactive caching would cause slow first-play for popular titles.",
      ],
    },
  ],
  "sysdesign-uber": [
    {
      id: "q-msd-famous2-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Design Uber: 1M drivers send GPS location updates every 4 seconds. A rider requests a trip — the system must find all available drivers within 5km in <200ms. Which geospatial indexing approach does Uber use and why?",
      options: [
        "MySQL with lat/lng columns and a query: SELECT * FROM drivers WHERE lat BETWEEN rider_lat-0.045 AND rider_lat+0.045 AND lng BETWEEN rider_lng-0.045 AND rider_lng+0.045. Add a composite B-tree index on (lat, lng).",
        "Google S2 geometry: divide Earth into a hierarchy of cells using the Hilbert space-filling curve. Each driver's location maps to an S2 cell ID at multiple precisions. Store driver locations in a key-value store keyed by S2 cell ID. Query: fetch all drivers in the target S2 cells covering the 5km radius. S2 cells at level 14 are ~600m across, so a 5km radius requires ~50 S2 cells. Cell IDs are 64-bit integers enabling fast integer-key lookups.",
        "Geohash: encode each driver's location as a 6-character geohash (~1.2km precision). Store drivers in a Redis set per geohash cell. Query nearby geohash cells (the 8 neighbors + center) for drivers. Limitation: geohash cells don't map cleanly to circular radii.",
        "QuadTree: recursively subdivide the map into four quadrants. Store driver locations in a balanced QuadTree in memory on each matching server. Range query: traverse the QuadTree to find all drivers within 5km bounding box.",
      ],
      correctAnswer: 1,
      explanation:
        "Uber uses Google S2 geometry (open-sourced). The Hilbert curve property is critical: nearby points on Earth map to nearby S2 cell IDs, enabling range queries with integer key comparisons. At level 14 (~600m cells), a 5km radius needs ~50 cells — fetch all drivers with cell IDs in those 50 cells from a distributed KV store (Uber uses Riak/DynamoDB). Driver location updates (1M × 15/min = 15M writes/min) write to the KV store keyed by cell ID. S2 advantages over geohash: (1) equal-area cells at each level; (2) exact coverage of arbitrary regions without edge artifacts; (3) hierarchical — same system handles city-level and street-level queries. QuadTree works but requires in-memory data structure management across server restarts.",
      hints: [
        "Hilbert curve: maps 2D space to 1D while preserving locality. Adjacent points in 2D have close IDs in 1D, enabling range queries.",
        "Driver location update: S2 cell ID at multiple levels = cell ID at level 8 (city block), 12 (neighborhood), 14 (street). Store all three for multi-precision queries.",
      ],
    },
  ],
  "sysdesign-payment": [
    {
      id: "q-msd-famous2-5",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Design a payment system like Stripe: a user clicks 'Pay $100' and your server calls the payment processor. The network times out — you don't know if the charge succeeded. How do you prevent double-charging while ensuring the payment eventually completes?",
      options: [
        "Retry the API call immediately. If the payment processor returns 'already charged', catch that error and treat the payment as successful.",
        "Never retry. On timeout, mark the order as 'pending' and require the user to manually retry the payment from the UI.",
        "Generate a client-generated idempotency key (UUID) per payment attempt before the API call. Send this key as a header (Idempotency-Key: <uuid>) on every attempt. The payment processor stores (idempotency_key, result) in its DB with a unique constraint. Retries with the same key return the cached result — guaranteed exactly-once processing regardless of retries or timeouts.",
        "Use two-phase commit (2PC) between your DB and the payment processor's DB. Phase 1: prepare both sides. Phase 2: commit if both prepared successfully. On coordinator failure, the transaction rolls back.",
      ],
      correctAnswer: 2,
      explanation:
        "Idempotency keys are the industry-standard solution (Stripe, PayPal, Braintree all implement this). The client generates a UUID before the first attempt and reuses it on all retries for the same logical payment. The payment processor stores (idempotency_key → result) with a UNIQUE constraint — duplicate requests return the stored result without re-executing. This is safe to implement with a Redis SET NX (set if not exists) or DB UNIQUE constraint. The key insight: the idempotency key is client-generated (not server-generated) so it survives network failures. 2PC is impractical with external payment processors (they don't expose distributed transaction APIs). Option A depends on the processor returning a specific error — not guaranteed across all processors.",
      hints: [
        "Idempotency key lifecycle: generate before first attempt, store with the order in your DB, send on every retry. Expire keys after 24-48 hours.",
        "Stripe's implementation: Idempotency-Key header + DB unique index on (customer_id, idempotency_key). Returns cached response for up to 24 hours.",
      ],
    },
  ],
  "sysdesign-distributed-kv": [
    {
      id: "q-msd-famous2-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Design a distributed key-value store like DynamoDB/Cassandra: you need write-optimized storage handling 1M writes/second to a single node. Which storage engine design explains why LSM trees outperform B-trees for this workload?",
      options: [
        "B-tree: writes update nodes in-place on disk. Random writes cause disk seeks. At 1M writes/s, a spinning disk (150 seeks/s) saturates immediately. SSDs handle random writes faster but still suffer write amplification from B-tree node splits.",
        "LSM tree (Log-Structured Merge-tree): writes go to an in-memory buffer (MemTable), then sequentially to disk as immutable SSTables. Sequential writes maximize disk throughput. Background compaction merges SSTables. Read performance trades off against write performance — reads may require checking multiple SSTables (mitigated by Bloom filters per SSTable).",
        "Both B-tree and LSM tree have the same write throughput because SSD random write IOPS (100K+) exceeds the 1M writes/s requirement at the data-per-operation level.",
        "LSM tree buffers writes in memory until a crash, making it unsuitable for durability requirements without a write-ahead log (WAL). B-trees are more durable by default.",
      ],
      correctAnswer: 1,
      explanation:
        "LSM trees optimize for write throughput by converting random writes into sequential disk writes. Write path: (1) append to WAL for durability; (2) write to in-memory MemTable (AVL tree or skip list); (3) when MemTable is full (~64MB), flush to a sorted SSTable on disk sequentially. Sequential writes achieve full disk bandwidth (GB/s vs MB/s for random). Compaction merges SSTables to reclaim space and maintain read performance. Bloom filters (one per SSTable, ~10 bits/key) answer 'does this key exist in this SSTable?' with O(1) and ~1% false positive rate — avoiding disk reads for missing keys. B-trees update in-place with random writes, causing write amplification from page splits and rebalancing. RocksDB (Facebook) is the canonical LSM implementation, used by DynamoDB, Cassandra, and many others.",
      hints: [
        "LSM write path: WAL (durability) → MemTable (speed) → SSTable (persistence). WAL + MemTable = writes survive crash; WAL is sequential append.",
        "Bloom filter per SSTable: before reading SSTable for a key, check Bloom filter. If negative, skip SSTable entirely. Reduces read amplification from O(SSTables) to O(1) for missing keys.",
      ],
    },
  ],
  "sysdesign-twitter-feed": [
    {
      id: "q-msd-famous2-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Design Twitter's home timeline: a user with 500 followers posts a tweet. Another user follows 2000 accounts and opens their feed. Twitter tried both fan-out-on-write and fan-out-on-read. Which approach does Twitter use in production and why?",
      options: [
        "Pure fan-out-on-read (pull): when a user opens their feed, query all 2000 followed accounts for their recent tweets, merge and sort by time. Simple but slow at read time — 2000 DB queries per feed load.",
        "Pure fan-out-on-write (push): when a user posts, write the tweet ID to each follower's timeline cache (Redis sorted set). Feed reads are O(1). Problem: a celebrity with 30M followers causes 30M Redis writes per tweet — write latency is unacceptable.",
        "Hybrid: fan-out-on-write for normal users (≤ ~10K followers) into each follower's Redis timeline cache. For celebrities (> threshold), use fan-out-on-read at render time — fetch celebrity tweets separately and merge with the pre-computed timeline. This limits write fan-out to manageable sizes while keeping reads fast for all users.",
        "Fan-out-on-write for all users, using Kafka to buffer the 30M writes asynchronously. The celebrity's 30M followers all eventually receive the tweet within 5 seconds.",
      ],
      correctAnswer: 2,
      explanation:
        "Twitter's production system (documented in their engineering blog) uses the hybrid approach. Fan-out-on-write: posting a tweet triggers async writes of the tweet ID to each follower's timeline Redis sorted set (score = tweet timestamp). Read: fetch tweet IDs from Redis, hydrate from tweet cache. This gives O(1) reads. Problem: Katy Perry has 100M followers — fan-out would mean 100M Redis writes per tweet, causing multi-second write latency. Solution: detect high-follower accounts (celebrities), skip fan-out for them, and at read time merge the user's pre-computed timeline with a separate fetch of celebrity tweets. This bounds fan-out write latency while keeping read latency fast (one precomputed list + small number of celebrity queries).",
      hints: [
        "Fan-out-on-write complexity: O(followers) writes per tweet, O(1) reads. Fan-out-on-read: O(1) writes, O(following) reads. Hybrid balances both.",
        "Celebrity threshold: Twitter uses ~10K followers as the heuristic. Above this, the account is excluded from fan-out and handled at read time.",
      ],
    },
  ],
  "sysdesign-web-crawler": [
    {
      id: "q-msd-famous2-8",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Design a web crawler for Google Search: you need to crawl 10 billion pages in 30 days (~4000 pages/second). What are the three most critical systems design challenges and their solutions?",
      options: [
        "(1) Speed: use 1000 crawler threads. (2) Storage: store all HTML in a single MySQL DB. (3) Politeness: crawl each domain as fast as possible to finish quickly.",
        "(1) URL deduplication: keep a distributed Bloom filter (or hashset) of seen URLs — prevents re-crawling. (2) Politeness: per-domain crawl delay (respect robots.txt + 1 req/s default) using per-domain priority queues. (3) URL frontier prioritization: prioritize high-PageRank, frequently-updated pages using a multi-level priority queue + back queue routing by domain.",
        "(1) Download speed: fetch pages in parallel using async I/O (aiohttp). (2) Parser: extract links using regex, not HTML parsing libraries. (3) Storage: write raw HTML to HDFS for later processing.",
        "(1) Robots.txt: check robots.txt before crawling each page on every request. (2) DNS: resolve each domain's IP via public DNS on every request. (3) Deduplication: use exact URL string matching in a SQL database.",
      ],
      correctAnswer: 1,
      explanation:
        "The three canonical challenges for web crawlers at Google scale: (1) Deduplication: 10B pages produce far more URLs (links create cycles and duplicates). A Bloom filter with 10B bits ≈ 1.2GB memory handles 10B URLs with ~1% false positive rate — far cheaper than a hash set. (2) Politeness: crawling too aggressively gets your IP blocked and violates robots.txt. Each domain gets its own queue processed at the allowed rate. (3) URL prioritization: not all pages are equal. PageRank estimate, update frequency (sitemaps), and content quality determine crawl priority. A two-level queue (front queue for priority, back queue by domain for politeness) is the standard architecture. DNS caching is also critical — 4000 req/s with uncached DNS means 4000 DNS lookups/s; cache TTL of 1 hour reduces this by 100-1000x.",
      hints: [
        "Bloom filter false positive tradeoff: at 10 bits/element, false positive rate ≈ 0.8%. A false positive means a new URL is incorrectly marked as seen and skipped — acceptable for a crawler.",
        "robots.txt caching: fetch and cache robots.txt per domain (not per page). Re-fetch every 24 hours. Checking robots.txt on every request adds latency and violates the spirit of the standard.",
      ],
    },
  ],
};
Object.assign(questions, famous2);

const extraMsdQ3: Record<string, Question[]> = {
  "two-tower-recsys": [
    {
      id: "q-msd-tt-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a two-tower recommendation model, what do the two towers represent and why is their dot-product scoring structure important for large-scale serving?",
      options: [
        "One tower encodes user history; the other encodes item metadata. Dot-product scoring allows precomputing and indexing item embeddings offline so retrieval reduces to ANN search, enabling sub-millisecond lookup across billions of items",
        "One tower encodes user demographics; the other encodes item content. Dot-product scoring ensures interpretability because each dimension corresponds to a latent preference",
        "Both towers encode the same user-item interaction from different temporal perspectives, and dot-product scoring forces temporal consistency",
        "One tower is a content-based filter; the other is a collaborative filter. Dot-product scoring combines both signals multiplicatively",
      ],
      correctAnswer: 0,
      explanation: "Two-tower models separate user and item encoders. At serving time item embeddings are precomputed once and indexed in a vector database (FAISS, ScaNN, Qdrant). For each query, only the user tower runs in real time, producing a query vector; ANN search retrieves top-k items in O(log N) time. If the model used feature interactions at each layer, item representations would depend on the query and could not be pre-indexed. The independence constraint enables scale at the cost of not modeling feature interactions during retrieval.",
      hints: [
        "ANN trade-off: exact kNN is O(N) per query — infeasible for N=10B. HNSW and IVF-PQ achieve O(log N) or better with 95-99% recall.",
        "Independence requirement: item tower output must not depend on query features. Any user-item feature interaction must be deferred to the ranking stage.",
      ],
    },
    {
      id: "q-msd-tt-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A two-tower retrieval model trained with in-batch negatives has a systematic sampling bias. What is it and how is it corrected?",
      options: [
        "In-batch negatives oversample popular items as negatives (popular items appear more in batches), making the model incorrectly learn popular items are negative — corrected by logQ correction: subtracting log(sampling_probability) from each negative's logit before softmax",
        "In-batch negatives undersample rare items causing overfitting to popular items — corrected by stratified sampling equalizing item frequency in batches",
        "In-batch negatives create false positives because some batch items might be positive for other users — corrected by masking known positives across the batch",
        "In-batch negatives have too small a batch size to represent the full item distribution — corrected by using a memory bank of randomly sampled hard negatives",
      ],
      correctAnswer: 0,
      explanation: "In-batch negative sampling has systematic popularity bias: items appear as negatives proportional to their frequency in training data. Popular items are seen as negative far more often than random, causing the model to underrank them. LogQ correction (YouTube DNN, Covington et al. 2016): subtract log(p_i) from the dot product score of negative item i before softmax, where p_i is its sampling probability. This deweights high-frequency negatives, letting the model learn true preference signal rather than a frequency artifact.",
      hints: [
        "LogQ formula: adjusted_score_i = dot(u, v_i) - log(p_i). Items sampled more often get their score penalized to offset overrepresentation.",
        "Without logQ correction, models dramatically underrank popular items for niche users who genuinely want them.",
      ],
    },
    {
      id: "q-msd-tt-3",
      type: "true-false",
      difficulty: "medium",
      question: "In a recommendation system with separate retrieval and ranking stages, the ranking model can safely use cross-features between user and item because it only scores a small candidate set rather than billions.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "The retrieval-ranking architecture exists to enable this split: retrieval (two-tower ANN) must score billions of items and can only use simple dot-product-compatible features; ranking scores only 100-1000 candidates and can use arbitrarily complex features including user-item cross-features, real-time context, and deep feature interactions (DCN, DeepFM, attention). The ranking model can be much larger and more expensive because its candidate set is tiny.",
      hints: [
        "Retrieval: O(log N) per query, N=10B, must be fast — simple dot product, pre-indexed items.",
        "Ranking: O(K) per query, K=500, can be slow — deep feature interaction models, cross-features, sequential attention.",
      ],
    },
    {
      id: "q-msd-tt-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Cold-start problem: a new item with zero interaction history must be recommended. Which approach best handles cold-start in a two-tower retrieval system?",
      options: [
        "Exclude new items from retrieval until they accumulate at least 100 interactions, ensuring embedding quality",
        "Use the item content tower (trained on item metadata: title, description, category, price) to generate an embedding from content features alone, bypassing interaction history, and index this embedding directly in the ANN index — update with interaction-based embeddings as data accumulates",
        "Assign new items the average embedding of all items in the same category as a cold-start embedding",
        "Use a popularity-based fallback recommending new items uniformly at random to a fraction of users until enough interactions are collected",
      ],
      correctAnswer: 1,
      explanation: "Content-based cold-start for two-tower retrieval: the item tower is designed to encode item metadata (text, images, categories, price). For new items, the content tower generates a meaningful embedding from metadata alone, even without interaction history. This embedding can be immediately indexed in the ANN store. As interactions accumulate, the embedding is updated to incorporate collaborative signals. This enables immediate recommendation of new items while gracefully transitioning to collaborative embeddings. Pure collaborative filtering cannot handle cold-start because it requires interaction data.",
      hints: [
        "Item content features for cold-start: text embeddings of title/description (BERT), image embeddings (ViT), categorical features, price range.",
        "Warm-up schedule: at t=0, use 100% content embedding. At t>100 interactions, blend content and collaborative embeddings. At t>1000, use 100% collaborative.",
      ],
    },
  ],
  "realtime-ml-serving": [
    {
      id: "q-msd-rt-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A low-latency ML serving system must achieve p99 < 50ms for a ranking model requiring 500 features. Feature computation is the bottleneck. What architecture reduces latency most effectively?",
      options: [
        "Cache all features in Redis with a 24-hour TTL — the model always reads from cache, missing features filled with zeros",
        "Split features by staleness tolerance: precompute slow/expensive features into a low-latency feature store (Redis/Cassandra) updated hourly, and compute fresh/context features via streaming (Flink/Kafka) with sub-second latency. Retrieve precomputed features in parallel with inference, serving the union at query time",
        "Use synchronous feature computation: compute all 500 features sequentially on each request to ensure freshness",
        "Reduce the model to use only 50 features that can be computed within the latency budget, accepting the accuracy trade-off",
      ],
      correctAnswer: 1,
      explanation: "Tiered feature computation is the standard architecture: (1) Batch features: computed offline, stored in a feature store (Redis, Cassandra, Feast). Retrieval in 1-5ms. (2) Streaming features: computed on Flink from event streams, stored in Redis with sub-minute latency. (3) Online features: computed at request time from context. Retrieval in <1ms. Parallel retrieval of all tiers minimizes latency: total latency = max(tier latencies), not sum. This achieves fresh features for important signals within the p99 budget.",
      hints: [
        "Key insight: not all features need the same freshness. User long-term preferences change slowly (batch OK), session context changes fast (online required).",
        "Parallel feature retrieval: issue all feature store reads simultaneously (async/concurrent), not sequentially.",
      ],
    },
    {
      id: "q-msd-rt-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A recommendation model uses a user embedding expensive to compute (requires loading 90 days of user history). Which caching strategy is most appropriate?",
      options: [
        "Cache the final model output (ranked item list) per user with a 1-minute TTL",
        "Cache the user embedding (intermediate representation) with a TTL calibrated to the rate user preferences change (typically 1-60 minutes), invalidating on significant new events (purchase, session start), recomputing only on cache misses",
        "Cache the full feature vector for each user with a 24-hour TTL",
        "Use no caching — always recompute fresh embeddings for every request to maximize recommendation quality",
      ],
      correctAnswer: 1,
      explanation: "Caching intermediate representations (embeddings) is more flexible than caching model outputs: the same cached user embedding can be reused across different contexts (different item catalogs, A/B test variants, different ranking models). User embedding TTL should be calibrated to behavioral change rate. Event-driven invalidation (clear cache on purchase or session start) ensures major behavioral changes are reflected quickly. This reduces expensive user history loading by 80-95% during peak traffic while maintaining recommendation quality.",
      hints: [
        "Embedding cache hit rate: if users make 5 requests/session within 10 minutes, a 10-minute TTL achieves ~80% cache hit rate.",
        "Invalidation events: purchase, session start, explicit negative feedback — these signal significant preference changes making cached embeddings stale.",
      ],
    },
    {
      id: "q-msd-rt-3",
      type: "true-false",
      difficulty: "medium",
      question: "Streaming feature computation using Apache Flink can achieve the same per-event latency as computing features directly in the serving layer at request time.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Streaming frameworks like Flink introduce additional latency: events must be published to Kafka, consumed by the Flink job, aggregated, and written to a feature store, then read back at serving time. This typically adds 100ms-5s of end-to-end latency beyond direct computation. The trade-off is scalability: streaming frameworks can aggregate across millions of events (user's 30-min click history) that would be impossible to recompute from scratch on each request. Direct request-time computation is only feasible for simple features derivable from the request context alone.",
      hints: [
        "Streaming latency: Kafka publish (~5ms) + Flink window processing (~100ms-1s) + Redis write (~5ms) + Redis read (~1ms). Total: 100ms-1s additional vs request-time computation.",
        "Streaming advantage: amortizes expensive aggregation computations across the stream rather than per-request.",
      ],
    },
    {
      id: "q-msd-rt-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An ML serving system must maintain p99 latency < 100ms under 10x traffic spikes. Which combination of techniques best ensures SLO compliance?",
      options: [
        "Auto-scaling the serving fleet with a 5-minute scale-up time, ensuring eventual capacity for sustained traffic increases",
        "Adaptive degradation under load: (1) pre-deploy a distilled smaller model as fallback; (2) request hedging — duplicate slow requests to a second server after 70ms; (3) load shedding — drop lowest-priority traffic above 80% CPU; (4) predictive scaling before anticipated spikes",
        "Horizontal scaling with a 5-minute SLA for new instances — accept latency violations during scale-up as unavoidable",
        "Synchronous batch inference: accumulate 100 requests, run batch, return results — this improves GPU utilization",
      ],
      correctAnswer: 1,
      explanation: "Handling traffic spikes for p99 latency requires layered techniques: (1) Distilled fallback: when CPU > threshold, route to a 3x faster distilled model — p99 preserved, small accuracy cost. (2) Request hedging: if response not received within 70ms, issue identical request to a second server; first response wins. Reduces tail latency 20-30% at 2% extra load. (3) Load shedding: drop low-priority traffic (anonymous users, background refreshes) during extreme load. (4) Predictive scaling: scale up 10 min before predicted spikes. Auto-scaling alone (5-min scale-up) cannot handle sudden spikes. Synchronous batching increases individual request latency.",
      hints: [
        "Request hedging math: if p(>70ms on one server) = 5%, p(both >70ms) = 0.25%. Hedging converts 5% tail to 0.25% tail at 2% extra load.",
        "Load shedding tiers: tier 1 (logged-in, real-time) never shed. Tier 2 (batch inference, A/B logging) shed first. Tier 3 (analytics) shed aggressively.",
      ],
    },
  ],
  "data-flywheel-advanced": [
    {
      id: "q-msd-df-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A data flywheel is a self-reinforcing feedback loop in ML products. Which correctly describes the mechanism and its key design requirement?",
      options: [
        "More users -> more data -> better model -> more users. The key design requirement is that user interactions must generate labeled training data — through explicit feedback (ratings, likes) or implicit feedback (clicks, dwell time, purchases) treated as weak labels",
        "More data -> more compute -> better model -> more data. The key requirement is a large GPU cluster to process all collected data in real time",
        "Better model -> lower latency -> more users -> more data. The key requirement is a fast inference engine serving all users within SLO",
        "More users -> more A/B tests -> better experiments -> better model. The key requirement is a sophisticated experimentation platform",
      ],
      correctAnswer: 0,
      explanation: "The data flywheel core loop: (1) model generates recommendations, (2) users interact (click, purchase, skip), (3) interactions are logged as implicit or explicit labels, (4) labeled data retrains and improves the model, (5) better model improves user experience, (6) more users join and interact more. The critical design requirement is a closed logging-to-training pipeline that converts user interactions into model-ready training examples automatically. Without this, the flywheel breaks. Key design: logging infrastructure, label assignment pipeline, training pipeline ingesting new labels, and evaluation to prevent position bias and feedback loops from corrupting labels.",
      hints: [
        "Flywheel risk: feedback loops can corrupt the flywheel. If the model only shows popular items, it only collects data on popular items, reinforcing popularity bias.",
        "Implicit label quality: clicks are noisy positives. Purchases are stronger signals. Dwell time is a proxy for engagement. Multiple signals should be combined.",
      ],
    },
    {
      id: "q-msd-df-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A content moderation system uses HITL review where the ML model flags items for human review and human decisions become training labels. What is the critical failure mode?",
      options: [
        "Human reviewers are too slow — prevented by hiring more reviewers or setting shorter SLAs",
        "Confirmation bias feedback loop: the model only sends uncertain items to humans, so human labels only cover the uncertain region. The model never learns from items it confidently auto-approves or auto-rejects — prevented by (a) sampling a random fraction of all traffic for human review regardless of confidence, and (b) tracking auto-decision accuracy via periodic audits",
        "Human reviewers disagree with each other — prevented by enforcing strict annotation guidelines and removing disagreed labels",
        "The model overtakes human accuracy after sufficient training, making human review wasteful",
      ],
      correctAnswer: 1,
      explanation: "The confirmation bias loop in HITL: if humans only review model-uncertain items (typical for efficiency), training data is biased toward uncertain cases. Items the model confidently auto-approves — potentially including false negatives (harmful content the model is confidently missing) — never get human labels. Prevention: (1) Random sampling audit: send 1-5% of all auto-approved and auto-rejected items for human review regardless of confidence. (2) Periodic error analysis: compare model decisions to human decisions on sampled items to measure false negative rate. (3) Active learning prioritizes regions where errors are most harmful.",
      hints: [
        "False negative risk in content moderation: missing harmful content (auto-approved). The HITL loop is most blind to these when sampling only uncertain cases.",
        "Audit rate: 1-5% random audit provides statistical power to detect 5-10% error rates in auto-decisions with 95% confidence.",
      ],
    },
    {
      id: "q-msd-df-3",
      type: "true-false",
      difficulty: "easy",
      question: "Weak supervision (e.g., Snorkel's labeling functions) can generate training labels at scale without human annotation for every sample, making it effective for bootstrapping initial training datasets in data-scarce domains.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Weak supervision (Ratner et al. 2016, Snorkel) uses multiple weak, noisy label sources called labeling functions (LFs) — heuristics, patterns, external knowledge bases, pre-trained models. Snorkel's label model combines LF outputs using a generative model estimating LF accuracies and correlations, producing soft probabilistic labels that train a discriminative model. This enables generating millions of training labels without hand-labeling each sample, at the cost of some label noise. Used in FDA, Google, and Apple production ML pipelines for medical record classification, content moderation, and information extraction.",
      hints: [
        "LF examples: keyword rules (contains 'buy now' -> spam), external classifiers (sentiment model -> positive), distant supervision (entity in Wikipedia -> entity type).",
        "Weak supervision vs zero-shot: weak supervision uses domain-specific heuristics to generate training data; zero-shot uses a pre-trained model directly without domain-specific labels.",
      ],
    },
    {
      id: "q-msd-df-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A search ranking data flywheel uses user clicks as implicit training labels. What is the biggest threat to training data quality and how should it be mitigated?",
      options: [
        "Users click too rarely, creating too few training examples — mitigated by boosting CTR via UI changes",
        "Position bias: users are more likely to click results at rank 1 than rank 5 regardless of relevance, causing the model trained on click data to reinforce already-highly-ranked results — mitigated by inverse propensity scoring (IPS) that deweights clicks on high-rank positions, or by randomized result injection to collect unbiased click data",
        "Users click on irrelevant results by mistake — mitigated by requiring users to dwell on results for at least 30 seconds before counting as positive",
        "Different users have different click behaviors — mitigated by personalizing training data by clustering users and training separate models per cluster",
      ],
      correctAnswer: 1,
      explanation: "Position bias is the dominant threat to search click log quality: P(click | position=1) >> P(click | relevance) for most users. A model trained naively on click data learns 'show at rank 1 -> gets clicks -> is relevant', which is backwards. IPS corrects this: weight each click by 1/P(click | position), where propensity P(click | position) is estimated from randomized experiments (swap top-2 results, measure click rate changes). This deweights high-position clicks and upweights low-position clicks. Unbiased learning to rank (ULTR) frameworks formalize this correction.",
      hints: [
        "IPS estimation: run A/B experiment where some queries show results in random order. Estimate P(click | position) from this randomized data. Apply to biased log.",
        "Propensity clipping: IPS weights can be very large for low-position clicks. Clip weights at a maximum to prevent high-variance gradient updates.",
      ],
    },
    {
      id: "q-msd-df-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Active learning with a budget of 1000 labels/day. Which strategy is most sample-efficient for improving model performance?",
      options: [
        "Random sampling: send 1000 randomly selected unlabeled samples to annotators each day",
        "Pure uncertainty sampling: send the 1000 samples where the model has lowest confidence (highest entropy predictions)",
        "A hybrid strategy: core-set selection (maximally representative of unlabeled distribution via greedy k-center in embedding space), combined with uncertainty filtering (prefer samples near decision boundary), and diversity constraint (geographic, temporal, class diversity) — this balances informativeness and representativeness",
        "Hardest negative mining: select the 1000 samples the model is most confidently wrong about based on a proxy label",
      ],
      correctAnswer: 2,
      explanation: "Pure uncertainty sampling suffers from redundancy: the 1000 most uncertain samples are often clustered near a few decision boundary regions, providing redundant labels. Core-set selection (Sener & Savarese 2018) ensures selected samples cover the full data distribution by minimizing the maximum distance from any unlabeled sample to its nearest labeled sample. The hybrid approach balances: informativeness (uncertain = near decision boundary), representativeness (core-set coverage), and diversity constraints (prevent temporal/geographic clustering). This hybrid is used in production active learning pipelines at Google and Waymo.",
      hints: [
        "Redundancy in uncertainty sampling: if the model is uncertain about blurry cats, sampling 1000 blurry cats gives 1000 similar labels with diminishing returns after ~50.",
        "Greedy k-center: select x* = argmax_{x unlabeled} min_{x' labeled} d(x, x'). Iteratively selects the point furthest from all currently labeled points.",
      ],
    },
  ],
  "privacy-ml-systems": [
    {
      id: "q-msd-pp-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Federated learning trains models across many devices without centralizing raw data. What is the most significant accuracy-vs-privacy trade-off when adding DP-SGD to FL?",
      options: [
        "DP-SGD requires more communication rounds, increasing bandwidth costs but not affecting model accuracy",
        "DP-SGD clips per-sample gradients and adds Gaussian noise. Small epsilon (strong privacy) requires large noise causing large accuracy drop; large epsilon (weak privacy) allows small noise. Non-IID data distributions in FL amplify accuracy loss because DP noise obscures the weak gradient signal in minority groups",
        "DP-SGD only affects the final model weights so accuracy is unaffected during training but the final model is noisier",
        "DP-SGD requires encrypted gradient aggregation which is computationally too slow for production FL systems",
      ],
      correctAnswer: 1,
      explanation: "DP-SGD (Abadi et al. 2016) clips per-sample gradient to L2 norm C, adds Gaussian noise N(0, sigma^2 C^2 I). In FL, effective batch size is small (local device updates), so noise is relatively large. Privacy budget epsilon is consumed per round; training many rounds requires smaller per-round epsilon, requiring more noise. Non-IID data: minority-class devices have low-magnitude gradients that DP noise can overwhelm, degrading fairness for rare classes. Typical: epsilon=10 causes 1-2% accuracy drop on CIFAR-10; epsilon=1 causes 5-10% drop.",
      hints: [
        "Privacy budget accounting: total epsilon grows as O(sqrt(T)) for T rounds by the moments accountant. More rounds = worse privacy for fixed noise level.",
        "Non-IID + DP: a device with a rare class has gradient signals ~1/1000 of average. DP noise can overwhelm this, making the rare class invisible to the model.",
      ],
    },
    {
      id: "q-msd-pp-2",
      type: "true-false",
      difficulty: "medium",
      question: "Federated learning completely prevents the central server from learning anything about individual client data, even without secure aggregation or differential privacy.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Without secure aggregation or DP, the central server sees each client's gradient update, which can leak significant information about local data. Gradient inversion attacks (Zhu et al. 2019, Deep Leakage from Gradients) demonstrate that raw pixel-level training images can be reconstructed from gradients with high fidelity, especially for small batch sizes. The attack optimizes a dummy input to match the observed gradient, effectively inverting the gradient computation. FL alone provides much weaker privacy than commonly assumed — gradients are not private.",
      hints: [
        "Gradient inversion attack: given gradient dL/dW, find input x* such that dL(f(x*), y)/dW = gradient. For batch size 1, this nearly perfectly recovers the training image.",
        "Attack mitigation: gradient compression (top-k sparsification), differential privacy, or secure aggregation all reduce gradient inversion risk.",
      ],
    },
    {
      id: "q-msd-pp-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A federated learning system for mobile keyboard prediction must manage the global privacy budget across millions of daily training rounds. Which approach correctly handles budget tracking?",
      options: [
        "Set a per-round epsilon budget and allow unlimited training rounds — privacy loss is bounded per round so total loss is acceptable",
        "Apply the moments accountant (Abadi et al. 2016) or Renyi DP composition to track cumulative privacy budget across all training rounds. Stop training or increase noise when the total epsilon reaches the budget. Each additional round consumes additional budget, so number of rounds is inherently limited for a fixed noise level",
        "Reset the privacy budget to zero after each model release, since deployed models cannot be queried for training data",
        "Use per-user privacy budgets — each user has their own epsilon and users who have spent their budget are excluded from future training rounds",
      ],
      correctAnswer: 1,
      explanation: "Privacy budget composition is fundamental: training for T rounds with per-round epsilon_r does NOT give total epsilon = epsilon_r. The moments accountant tracks privacy loss distribution across rounds precisely using Renyi DP composition, which is tighter than naive composition (T * epsilon_r). For large T, total epsilon grows as O(sqrt(T)). Once the total epsilon budget is spent, training must stop or noise must increase. This creates a fundamental tension: more training = better model but worse privacy. Systems must define a privacy policy (e.g., epsilon <= 10 per year per dataset) and plan training schedules accordingly.",
      hints: [
        "Moments accountant vs naive composition: for T=1000 rounds at epsilon_r=0.1, naive gives epsilon_total=100, moments accountant gives ~3-5. Much tighter.",
        "Privacy budget per model version: some teams treat each model release as a new privacy domain and restart budget tracking — actively debated in the DP community.",
      ],
    },
    {
      id: "q-msd-pp-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A company trains a model on sensitive medical records using differential privacy with epsilon=1. Which factor most significantly determines how much accuracy the model loses due to DP noise?",
      options: [
        "The number of model parameters — larger models lose more accuracy because more parameters receive noise",
        "The model architecture type — convolutional networks are more robust to DP noise than transformers",
        "The clipping threshold C relative to the true gradient norm — if C is much smaller than the gradient norm, important gradients are heavily clipped before noise is added; if C is too large, noise variance (sigma^2 C^2) becomes large. Optimal C balances clipping bias and noise variance",
        "The learning rate — higher learning rates amplify DP noise and cause divergence",
      ],
      correctAnswer: 2,
      explanation: "The clipping threshold C in DP-SGD is the most impactful accuracy hyperparameter: (1) If C << true gradient norm: gradients are always clipped, losing magnitude information. (2) If C >> true gradient norm: gradients are unclipped but noise variance sigma^2 C^2 is large, swamping the gradient signal. Optimal C is set near the median of per-sample gradient norms (auto-clip methods). Larger batch sizes reduce the noise-to-signal ratio. Public pretrained models (DP fine-tuning of BERT/ViT) dramatically reduce accuracy loss because the model starts near the optimum and requires less noisy training.",
      hints: [
        "Auto-clipping: AdaClip and DP-Adam variants estimate optimal C adaptively by monitoring gradient norm percentiles during training.",
        "PATE framework: train multiple teacher models on partitioned data (no DP), aggregate teacher votes with DP noise, use noisy votes to label public data, train student on public data. Much better accuracy-privacy trade-off than DP-SGD.",
      ],
    },
  ],
  "embedding-retrieval-design": [
    {
      id: "q-msd-emb-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A recommendation system's item embedding space should have which geometric property to enable efficient and meaningful retrieval?",
      options: [
        "Maximum dimensionality — more dimensions encode more item attributes and always improve retrieval quality",
        "Isotropic distribution with well-separated clusters for semantically different items: embeddings uniformly distributed across the hypersphere (avoiding collapse where embeddings cluster near the origin), with angular distance reflecting semantic dissimilarity and enabling cosine similarity search to align with human-perceived relevance",
        "Sparse representation where each dimension corresponds to a human-interpretable item attribute, enabling item filtering by dimension value",
        "Binary embeddings — items as binary vectors enabling Hamming distance search, which is 100x faster than cosine similarity for ANN retrieval",
      ],
      correctAnswer: 1,
      explanation: "Well-designed embedding spaces for retrieval should: (1) be isotropically distributed (uniform on the hypersphere) to use full representational capacity — collapsed embeddings waste capacity and make ANN retrieval unreliable; (2) cluster semantically similar items close together in angular distance; (3) have sufficient but not excessive dimensionality, typically 64-512 dimensions with diminishing returns beyond ~256 dims. Methods to achieve isotropy: temperature scaling in contrastive loss, whitening post-processing, ArcFace-style angular margin losses. Representation collapse is a key failure mode in contrastive learning that must be monitored in production.",
      hints: [
        "Collapse detection: monitor the average cosine similarity between randomly sampled item pairs. Near-zero = isotropic (good). Near-one = collapsed (bad).",
        "Dimensionality selection: measure retrieval recall@k as you increase dimensionality. Pick the elbow point where gains plateau. Common: 64-128 dims for catalog search.",
      ],
    },
    {
      id: "q-msd-emb-2",
      type: "true-false",
      difficulty: "easy",
      question: "In a recommendation system, increasing the embedding dimension of the item tower always improves retrieval recall because higher-dimensional embeddings can represent more item attributes.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Embedding dimensionality follows a diminishing returns curve: increasing dimension improves recall up to a point, then plateaus or decreases due to (1) overfitting — with many dimensions and limited training data, the model fits noise; (2) ANN index quality degradation — high-dimensional HNSW and IVF-PQ indices lose recall and become slower (curse of dimensionality for ANN); (3) training instability with high-dimensional softmax over millions of items. Typical sweet spots: 64-128 dims for catalog search (<1M items), 128-256 for large-scale retrieval (>100M items). Above 512 dims rarely provides measurable improvement in production.",
      hints: [
        "ANN quality vs dimension: FAISS IVF-PQ quantization error increases with dimension; HNSW graph connectivity degrades. Both negatively affect retrieval recall at very high dimensions.",
        "Empirical sweet spot: YouTube uses 256 dims. Pinterest uses 128 dims. Both found diminishing returns beyond their chosen dimension.",
      ],
    },
    {
      id: "q-msd-emb-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce platform must update its ANN index of 500 million item embeddings as new items are added and attributes change. Which update strategy minimizes both index staleness and rebuild cost?",
      options: [
        "Full index rebuild every hour — ensures all embeddings are fresh but requires 500M embedding lookups and 1 hour of indexing time per rebuild",
        "Maintain a small delta index of recently changed items alongside the main ANN index. At query time, search both indexes and merge results. Periodically merge the delta into the main index during low-traffic windows. New items go into the delta first (available within seconds) while the main index is rebuilt weekly in the background",
        "Use a hash-based lookup table instead of ANN — hash item IDs to embedding vectors, enabling O(1) lookup with zero rebuild overhead",
        "Keep the original embeddings frozen and add a re-ranking layer that adjusts scores based on real-time item attributes without updating the ANN index",
      ],
      correctAnswer: 1,
      explanation: "Tiered ANN indexing (main + delta) is the standard production architecture for large-scale retrieval with frequent updates: (1) Main index: 500M items, built weekly or daily during low-traffic. HNSW or IVF-PQ provides fast ANN search. (2) Delta index: thousands of new/changed items since last main rebuild, maintained in a small exact-search structure. Query time: search both and merge by score. New items appear in the delta within seconds. (3) Periodic merge: merge delta into main when delta grows large (degrading brute-force query performance). This pattern is used in Pinecone, Qdrant, and Elasticsearch vector search implementations.",
      hints: [
        "Delta index merge trigger: when delta size exceeds 1% of main index size, brute-force delta search becomes expensive. Trigger merge at this threshold.",
        "Query merge: run ANN search on main (top-k1), run brute-force on delta (top-k2), merge and re-rank by score, return final top-k.",
      ],
    },
  ],
};

Object.assign(questions, extraMsdQ3);

registerQuestions(questions);
