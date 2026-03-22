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
        "First, let's recall $1",
      hints: [
        "ML metrics (AUC, NDCG) are proxies - only the business owner knows which proxy best maps to business outcomes.",
        "Define success first, then work backward to the ML metric.",
      ],
    },
    {
      id: "q-msd-kp1-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "In an ML system design document, data freshness requirements (how recently training data must be from) are determined solely by model accuracy needs and not by the serving latency SLO.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "First, let's recall $1",
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
        "Using the same metric simplifies the evaluation process - this is actually a best practice.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "First, let's recall $1",
      hints: [
        "50K QPS \\times 200 ms SLO implies a throughput requirement of 10,000 concurrent inflight requests - a concrete capacity constraint.",
        "Latency and throughput requirements directly constrain model selection.",
      ],
    },
    {
      id: "q-msd-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "A p99 latency SLO (e.g., p99 < 100 ms) is a functional requirement because it directly determines which ML model to use.",
      correctAnswer: "false",
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
        "1 replica - one server can handle all requests since p50 latency is only 20 ms.",
        "100 replicas - 10,000 QPS \\div 100 concurrent requests per replica.",
        "10 replicas - p99 latency of 80 ms means only 10 requests per second per replica.",
        "1,000 replicas - one per QPS unit.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "Regression - predict the exact probability of booking.",
        "Binary classification - predict a binary label (books / does not book), with probability output for downstream thresholding.",
        "Clustering - group users by travel intent.",
        "Multi-label classification - predict all possible travel destinations.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "Shared layers in multi-task learning act as a form of regularization - each task reduces the other\'s overfitting.",
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
        "Regression on average star rating - predicts the 'best' restaurant objectively.",
        "Pointwise learning-to-rank using only explicit ratings - they are the cleanest signal.",
        "Listwise learning-to-rank combining all three signal types, using ratings as strong labels, implicit signals as weak labels, and context as features - optimizing directly for ranking quality (NDCG).",
        "Collaborative filtering using only order history - explicit signals are too noisy.",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall $1",
      hints: [
        "Explicit ratings are rare but accurate; implicit signals are abundant but biased - combine both with different loss weights.",
        "Listwise losses optimize the ranking metric directly; pointwise losses only approximate it.",
      ],
    },
    {
      id: "q-msd-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A ride-sharing company wants to predict surge pricing multipliers (1.0\\cdot, 1.5\\cdot, 2.0\\cdot, 2.5\\cdot, 3.0\\cdot). What is the most appropriate ML framing?",
      options: [
        "Binary classification: surge vs. no surge.",
        "Multi-class classification with 5 ordered classes, or ordinal regression - since the classes have a meaningful order.",
        "Regression to a continuous multiplier value.",
        "Clustering riders and drivers into demand zones.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Ordinal classes have a natural order - predicting 2.0 when the truth is 1.5 is a smaller error than predicting 3.0.",
        "Standard cross-entropy loss treats all misclassifications equally - it ignores the ordering.",
      ],
    },
    {
      id: "q-msd-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A search ranking problem can always be reduced to pointwise regression (predicting a relevance score per document) without any loss in ranking quality.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "Multi-class: legitimate, suspicious, fraud - with three different downstream actions.",
      ],
      correctAnswer: 1,
      explanation:
        'At 0.05% fraud rate, a model predicting "not fraud" always achieves 99.95% accuracy - useless. The relevant metrics are precision-recall AUC and operational precision@recall (e.g., at 80% recall, what fraction of flagged transactions are truly fraudulent?). Focal loss or oversampling addresses the extreme imbalance, and the 150 ms SLO constrains model complexity.',
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
        "First, let's recall $1",
      hints: [
        "Concept drift: P(Y|X) changes. Data drift: P(X) changes. Both can degrade model performance.",
        "A model that was accurate in 2020 but fails in 2023 is not overfitting - it is suffering from distribution shift.",
      ],
    },
    {
      id: "q-msd-kp3-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Human annotation agreement (inter-annotator agreement, e.g., Cohen\'s kappa) should be measured and reported before using human labels as training data ground truth.",
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
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
        "Duplicate documents in the training set - memorization of repeated content.",
        "Training data contamination: harmful, toxic, or personally identifiable information in the web crawl gets memorized and reproduced at inference time.",
        "Imbalanced language distribution - rare languages are underrepresented.",
        "Training data that is too recent - the model learns ephemeral information.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "Confirmation bias - users always click what they already know.",
        "Exposure bias (position bias) - items shown at the top are clicked more regardless of quality, so the model learns position artifacts instead of true relevance.",
        "Survivorship bias - only popular items are ever shown, so only they appear in logs.",
        "Label noise bias - click signals are too noisy to learn from.",
      ],
      correctAnswer: 1,
      explanation:
        'Position bias is the dominant issue in recommendation/search logs: items ranked higher receive disproportionately more clicks regardless of their true relevance (simply because they are seen). A model trained on raw logs learns to predict "was shown at position 1" rather than "is relevant." Inverse propensity scoring (IPS) or position-aware models are needed to debias.',
      hints: [
        "Why might an item at rank 1 receive more clicks than a more relevant item at rank 10, even when users are shown both?",
        "When a user clicks an item, what two possible reasons explain the click - and which one does the model actually learn from?",
      ],
    },
    {
      id: "q-msd-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Collecting training data from production logs is always safe because production data reflects the true real-world distribution the model will serve.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "What type of data does production logging capture - only what the current model chose to show, or everything that exists?",
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
        "First, let's recall $1",
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
        "First, let's recall $1",
      hints: [
        "If a label is from Jan 15 but feature values from Feb 1 are used, the model sees the future - leakage.",
        "Point-in-time correct = feature value at the exact moment the training label was generated.",
      ],
    },
    {
      id: "q-msd-kp4-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "A streaming feature pipeline that computes per-user aggregations using Apache Flink guarantees exactly-once feature update semantics by default, with no additional configuration.",
      correctAnswer: "false",
      explanation:
        "Flink supports exactly-once processing but it requires explicit configuration: checkpointing must be enabled (state.checkpoints.dir), the sink must support idempotent writes or transactions (e.g., Kafka transactional producer, JDBC with upsert semantics), and the source must support replay (Kafka with offset tracking). Default Flink pipelines provide at-least-once semantics. Exactly-once requires coordinating Flink checkpoints with sink transaction commits.",
      hints: [
        "At-least-once means a message might be processed twice on failure; exactly-once means state updates are idempotent.",
        "Redis does not natively support transactions compatible with Flink checkpointing - upsert patterns simulate exactly-once.",
      ],
    },
    {
      id: "q-msd-kp4-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A feature store serves embeddings for 500 million user profiles. Each embedding is 256 float32 values (1 KB). The p99 serving latency requirement is <5 ms. Which storage and retrieval architecture is most appropriate?",
      options: [
        "PostgreSQL with a vector column - standard relational database handles this scale.",
        "Sharded Redis cluster with user_id as the shard key: 500M \\times 1 KB = 500 GB partitioned across 50 nodes (10 GB/node), each node serving point lookups in <1 ms.",
        "FAISS index for ANN search - vector databases are the right tool for embedding retrieval.",
        "DynamoDB with embedding stored as a JSON attribute - managed NoSQL for scale.",
      ],
      correctAnswer: 1,
      explanation:
        "For point lookups (not similarity search) at 500M users, sharded Redis is optimal: 500M \\times 1 KB = 500 GB across a 50-node cluster is 10 GB/node - within typical Redis capacity. Redis GET latency is sub-millisecond, easily meeting the 5 ms SLO. FAISS is for ANN similarity search, not point lookups by user_id. DynamoDB adds network latency and JSON parsing overhead that may approach the 5 ms limit.",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "The offline store (BigQuery) - it has the full 30-day history.",
        "The online store (Redis) - pre-materialized 30-day spend values are served via sub-millisecond point lookups.",
        "Both stores are queried and results are merged at inference time.",
        "The feature is computed on-the-fly by querying the transaction database during inference.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "true",
      explanation:
        'Train-serve skew is one of the most common production ML bugs. Example: during training, "user age in days" is computed as (current_date − birthdate) using a static training date; at serving, it is recomputed with today\'s date - always giving the correct age. But if the serving code uses a different formula (e.g., age in years vs. days), the model receives a wildly different feature value. Feature stores prevent this by enforcing one shared computation for both training and serving.',
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
        "First, let's recall $1",
      hints: [
        "A 7-day ETL job means features are 7 days stale - unacceptable for real-time click signals.",
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
        "Gradient boosted decision tree (e.g., XGBoost, LightGBM) - typically best on structured/tabular data.",
        "k-Nearest Neighbors with k=10.",
        "Linear regression with L2 regularization.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "Use a weighted sum: loss = accuracy + \\lambda \\times latency. Tune \\lambda on the validation set.",
        "Maximize accuracy subject to a hard latency constraint using constrained optimization.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "Deploy Model B - higher AUC always means better user experience.",
        "Deploy Model A - it meets the latency SLA; pursue knowledge distillation or architecture pruning to close the 0.02 AUC gap.",
        "Reject both models and retrain from scratch with a different algorithm.",
        "Negotiate the SLA to 300 ms to accommodate Model B.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "SLAs are contractual commitments - violating them has business consequences.",
        "When a better model violates the latency constraint, what technique can transfer its knowledge to a smaller, faster model?",
      ],
    },
    {
      id: "q-msd-kp5-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Offline evaluation metrics (e.g., AUC on a held-out test set) reliably predict online A/B test results, so A/B testing is optional once offline metrics are satisfactory.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "A model trained on last month\'s data is evaluated on a test set from last month - but deployed into next month\'s world.",
        "User behavior adapts to recommendations - a feedback loop that static offline evaluation cannot model.",
      ],
    },
    {
      id: "q-msd-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A new LLM-based product description generator has ROUGE-L score 0.72 vs. 0.68 for the current template-based system, but A/B test shows no statistically significant difference in purchase conversion rate (p=0.34, 95% CI: −1.2% to +1.4%). What should you do?",
      options: [
        "Deploy the LLM model - higher ROUGE-L proves it is better.",
        "Do not deploy the LLM model - it shows no business lift and carries significant inference cost and operational complexity.",
        "Run the A/B test longer until significance is reached regardless of cost.",
        'Deploy to 10% of traffic permanently as a "shadow" to collect more data.',
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "The A/B test CI includes zero - the LLM might be worse, better, or neutral. The null result is valid.",
        "An LLM model may cost 100\\times more to serve - that cost requires a commensurate business gain to justify.",
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
        "First, let's recall $1",
      hints: [
        "Data parallel: N GPUs each run the full 10B model on different data \\to N\\times throughput.",
        "Model parallel: the 140 GB LLM is split across 4\\times 40 GB GPUs - each GPU holds a part of the model.",
      ],
    },
    {
      id: "q-msd-kp6-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using a larger batch size in distributed training always improves model accuracy because more samples are used per gradient update.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "The feature engineering is wrong - day-of-week features are being incorrectly computed.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "Full reproducibility requires all five: (1) data version - which dataset split; (2) code commit - exact training code; (3) hyperparameter config - all tunable parameters; (4) random seeds - Python, NumPy, PyTorch, CUDA; (5) environment - pinned library versions (Docker image or conda lock file). Any single missing element breaks reproducibility.",
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
      correctAnswer: "false",
      explanation:
        'Continuous training introduces risks: a data pipeline bug can corrupt training data, a sudden distribution shift can degrade the model, and noisy labels from a new data source can reduce quality. Continuous training pipelines require validation gates (e.g., "new model must achieve AUC \\geq current model − 0.01 on a holdout set") and automated rollback before promotion.',
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
        "First, let's recall $1",
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
        "To route all production traffic to both the old and new model simultaneously, log the new model\'s outputs for comparison, but only serve the old model\'s response to users - allowing validation without user impact.",
        "To test the model on synthetic traffic before any real users are exposed.",
        "To A/B test two models by splitting user traffic between them.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "A recommendation serving system processes requests with a two-stage pipeline: ANN retrieval (5 ms) \\to feature fetch (10 ms) \\to reranking model (20 ms) \\to post-processing (2 ms). The p99 end-to-end latency is 80 ms. Which optimization gives the largest gain?",
      options: [
        "Optimize the ANN retrieval step from 5 ms to 3 ms.",
        "Parallelize feature fetch and early processing steps that do not depend on each other; pipeline ANN retrieval output into feature fetch to overlap I/O and compute.",
        "Replace the reranking model with a faster model that increases latency from 20 ms to 15 ms.",
        "Remove the post-processing step (2 ms savings).",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "First, let's recall $1",
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
        "First, let's recall $1",
      hints: [
        "50M requests at app-open peak could be 1M+ QPS - serving a heavy model in real time at that scale requires enormous infrastructure.",
        "Redis GET latency is ~0.1 ms; a recommendation model call is 10-100 ms - a 100-1000\\times difference.",
      ],
    },
    {
      id: "q-msd-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "vLLM\'s continuous batching (also called iteration-level scheduling) improves LLM serving throughput by allowing new requests to join an in-progress batch when earlier requests in that batch finish generating their sequences.",
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
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
        "Use tensor parallelism across 4-8 GPUs (e.g., 4\\timesA100), FP16 quantization, vLLM continuous batching, and KV cache with PagedAttention.",
        "Run on CPU cluster with 128 cores and aggressive caching.",
        "Distill to a 7B model and serve on a single T4 GPU with no other optimizations.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "Flat (exhaustive) search index - guarantees exact nearest neighbors at any scale.",
        "HNSW (Hierarchical Navigable Small World) index with ef_construction=200 and ef=100 at query time: sub-linear query time O(log n), 95%+ recall@10, ~64 GB memory for 1B 128-dim vectors at compressed precision.",
        "LSH (Locality-Sensitive Hashing) with 64 hash tables - low memory, fast queries.",
        "Product quantization (PQ) without any graph index - minimal memory, acceptable recall.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "1B \\times 128 \\times 4 bytes = 512 GB. FP16 halves this to 256 GB - across multiple nodes.",
        "HNSW: query time O(log n) with 95%+ recall. Flat: O(n) with 100% recall. HNSW wins at 1B items.",
      ],
    },
    {
      id: "q-msd-kp8-7",
      type: "true-false",
      difficulty: "easy",
      question:
        "Online (real-time) features such as 'items clicked in the last 5 minutes' require a streaming pipeline to compute and cannot be served from a pre-materialized batch feature store.",
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
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
        "Running a 100 ms ranking model over 100M items sequentially takes 10,000 seconds - far beyond any real-time SLO. The retrieval stage narrows candidates to ~hundreds in milliseconds.",
        "Copyright law prevents running models over unlicensed content at scale.",
        "Ranking all items simultaneously causes GPU memory overflow.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        '"Collaborative" refers to leveraging the collective interactions of all users - no content required.',
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
        "Underfitting - the CTR model has insufficient capacity.",
        "Reward hacking / metric misalignment: the system maximizes the proxy metric (7-day CTR) at the expense of the true objective (long-term user satisfaction and retention). CTR optimizes for clickability, not value.",
        "Data leakage from training labels into features.",
        "Cold start failure for new users who have no click history.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "What happens when a proxy metric is optimized directly, rather than the true underlying objective?",
        "A user who clicks on sensational content and immediately feels worse - does that click represent value or a misleading signal?",
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
        "First, let's recall $1",
      hints: [
        "Batch size 256: each query gets 255 in-batch negatives. Only 256 document encodings are needed, not 256\\times256.",
        "False negatives (relevant docs treated as negatives) in in-batch training reduce training signal quality.",
      ],
    },
    {
      id: "q-msd-kp9-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Query expansion (adding synonyms and related terms to a query before retrieval) always improves precision in keyword-based search systems.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "Recall: did we find all relevant documents? Precision: of what we found, how much is relevant?",
        "Query expansion: better recall, often worse precision - a fundamental information retrieval trade-off.",
      ],
    },
    {
      id: "q-msd-kp9-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A product search system must handle queries in 50 languages, with the product catalog also in 50 languages. Cross-lingual retrieval (Spanish query \\to English product title) is required. Which architecture best solves this?",
      options: [
        "Run BM25 separately for each language pair - 2500 separate indices.",
        "Train a multilingual bi-encoder (e.g., fine-tuned mE5 or LaBSE) that maps queries and documents from all 50 languages into a single shared embedding space, enabling cross-lingual dot product similarity.",
        "Machine-translate all queries to English before retrieval, then use an English-only bi-encoder.",
        "Use language detection followed by a separate monolingual model for each language.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "LaBSE (Language-agnostic BERT Sentence Embeddings) was trained on 109 languages with translation pairs - encodings are cross-lingually aligned.",
        "Cross-lingual embedding: Spanish \'manzana\' and English \'apple\' map to nearby vectors in the embedding space.",
      ],
    },
    {
      id: "q-msd-kp9-7",
      type: "true-false",
      difficulty: "medium",
      question:
        "Mean Reciprocal Rank (MRR) and NDCG@10 always agree on which ranking system is better when comparing two systems on the same query set.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "First, let's recall $1",
      hints: [
        "A system returning all relevant documents at rank 10 would score high on accuracy but low on NDCG.",
        'The "D" in NDCG stands for Discounted - positions further down contribute logarithmically less.',
      ],
    },
    {
      id: "q-msd-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In a hybrid search system, BM25 scores and dense embedding similarity scores can be combined via linear interpolation: final_score = \\alpha \\times BM25 + (1−\\alpha) \\times cosine_similarity. This combination typically outperforms either alone.",
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
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
        "Cross-encoders perform full attention between query and document tokens, requiring O(n \\times d) inference for n documents - infeasible at corpus scale. Bi-encoders pre-compute document embeddings offline, enabling ANN retrieval in O(log n).",
        "Cross-encoders are less accurate than bi-encoders for relevance scoring.",
        "Cross-encoders do not support GPU acceleration.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "At probability 0.5 - the standard decision boundary.",
        "Lower than 0.5 - since false negatives are 20\\times more costly than false positives, the model should flag more transactions (be more conservative) to catch more fraud even at the cost of more false positives.",
        "Higher than 0.5 - precision is more important than recall in fraud detection.",
        "The threshold should not be changed from the default; business costs do not affect model thresholds.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "What is the Bayes optimal decision threshold in terms of the cost ratio between false negatives and false positives?",
        "When false negatives are 20\\times more costly than false positives, should the threshold be above or below 0.5?",
      ],
    },
    {
      id: "q-msd-kp10-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "Graph-based fraud detection (modeling account relationships as a graph and using graph neural networks) is superior to tabular feature-based models for detecting all types of fraud.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "5-10 seconds - payment authorization is an asynchronous process.",
        "<50 ms - the total authorization timeout is ~200 ms, leaving <50 ms for ML inference after feature retrieval and I/O overhead.",
        "Exactly 1 second - regulatory standards require 1-second fraud decisions.",
        "Latency does not matter for fraud detection since it runs asynchronously.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "The 200 ms total authorization budget is split across: network, feature retrieval, ML inference, response - each must be fast.",
        "LightGBM/XGBoost inference typically runs in 1-5 ms - well within budget; a BERT model takes 50-200 ms.",
      ],
    },
    {
      id: "q-msd-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Using the raw transaction timestamp as a feature in a fraud detection model is always safe and does not risk data leakage.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        'At 0.5% fraud rate, predicting "not fraud" 100% of the time achieves 99.5% accuracy; the model has collapsed to the majority class, catching 0% of fraud - "40% recall" implies some minimal fraud detection with very high false negative rate.',
        "The model is overfitting to training data; accuracy does not generalize to test data.",
        "False positive rate is 60%, equal to the false negative rate.",
      ],
      correctAnswer: 1,
      explanation:
        'With 0.5% fraud rate, a trivial model predicting "not fraud" always achieves 99.5% accuracy. If the model catches 40% of actual fraud (recall=0.4) and the fraud rate is 0.5%, then: frauds caught = 0.4 \\times 0.5% = 0.2% of all transactions flagged as fraud; false positive rate is effectively near 0% but the useful metric - precision and recall at the fraud class - is what matters. This illustrates why accuracy is a misleading metric for imbalanced classification.',
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
        "First, let's recall $1",
      hints: [
        "In a second-price auction, what determines the winner's payment - their own bid or the second-highest bid?",
        "What is the strategic implication of knowing your payment is determined by others' bids rather than your own?",
      ],
    },
    {
      id: "q-msd-kp11-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "A generalized second-price (GSP) auction used in sponsored search is equivalent to a truthful Vickrey-Clarke-Groves (VCG) mechanism.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "An ads ranking system uses a two-tower model to predict pCTR: user tower (200 features) and ad tower (150 features) produce 64-dim embeddings, combined via dot product. The pCTR model is miscalibrated: predicted pCTR is on average 2\\times higher than observed CTR. What is the most efficient calibration fix without retraining the model?",
      options: [
        "Retrain the full two-tower model with a calibration objective.",
        "Apply Platt scaling: train a logistic regression on (model output, observed label) pairs using recent production data, then use the regression to map raw model outputs to calibrated probabilities.",
        "Multiply all pCTR predictions by 0.5 uniformly.",
        "Filter out low-pCTR predictions below 0.01.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "What does it mean for a model to be 'calibrated' - do predicted probabilities match observed frequencies?",
        "What post-hoc technique fits a simple model on top of existing scores to correct calibration without retraining?",
      ],
    },
    {
      id: "q-msd-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a real-time ads auction, expected revenue per slot is computed as bid \\times pCTR (predicted click-through rate). Advertiser A bids $5 with pCTR 0.02; Advertiser B bids $2 with pCTR 0.08. Which wins the auction and by how much?",
      options: [
        "A wins: $5 bid > $2 bid.",
        "B wins: expected revenue $2 \\times 0.08 = $0.16 > $5 \\times 0.02 = $0.10.",
        "A wins: 0.02 pCTR is more precise than 0.08.",
        "Tie: both have positive expected revenue.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
      hints: [
        "If a model predicts pCTR=0.10 but the true CTR is 0.01, what business problem does this miscalibration cause in auction pricing?",
        "What does AUC-ROC measure (ranking quality vs. absolute probability values), and which is more important for auction mechanics?",
      ],
    },
    {
      id: "q-msd-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Position bias in ads - where ads shown at higher positions receive more clicks regardless of quality - causes pCTR models trained on observed clicks to be biased. Which technique corrects for this during training?",
      options: [
        "Remove all training examples from the first 3 feed positions.",
        "Use inverse propensity scoring (IPS): weight each training example by 1/P(shown at position p), where P(shown at p) is the propensity of that position in the logging policy.",
        "Add position as a feature during both training and serving to let the model learn the bias.",
        "Only train on items that appear in positions 5-20 where position bias is minimal.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "What bias does the model learn from raw click data without debiasing - does it learn position or relevance?",
        "What causal inference technique weights training examples inversely by their propensity of being observed?",
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
        "First, let's recall $1",
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
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
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
        "A feed ranking system uses a multi-objective reward: R = w1 \\times p_like + w2 \\times p_share + w3 \\times p_comment − w4 \\times p_hide. How should the weights be tuned and what is the risk of this approach?",
      options: [
        "Tune weights using gradient descent on a held-out validation set with a combined accuracy metric.",
        "Tune weights via online A/B experiments that vary weight combinations, measuring long-term user retention and satisfaction - not just engagement. Risk: the learned weights may over-optimize short-term proxy signals and miss long-term user value.",
        "Set weights based on revenue contribution: shares generate more viral reach so w2 should be highest.",
        "Use Bayesian optimization to minimize cross-entropy loss across all four objectives simultaneously.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Offline tuning optimizes proxy metrics; online A/B tests measure actual user outcomes.",
        "What happens when a proxy metric is given a very high weight - does the system optimize for the true objective or for the metric itself?",
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
        "Rage click / angry reaction on inflammatory content - the user engaged but felt worse afterward.",
        "30-second video view completion rate.",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "Only train on items that appear in positions 5-20 where position bias is minimal.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "What bias does the model learn from raw click data without debiasing - does it learn position or relevance?",
        "What causal inference technique weights training examples inversely by their propensity of being observed?",
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
        "First, let's recall $1",
      hints: [
        "What are the roles of stage 1 (fast, high recall) and stage 2 (slow, high precision) in a two-stage content moderation pipeline?",
        "What is the computational saving of using a two-stage design compared to running the expensive stage-2 model on all traffic?",
      ],
    },
    {
      id: "q-msd-kp13-5",
      type: "true-false",
      difficulty: "medium",
      question:
        "For content moderation, the precision-recall trade-off can be independently controlled by adjusting the model\'s classification threshold after training, without retraining the model.",
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
      hints: [
        "What model parameter can be adjusted after training to independently control the precision-recall trade-off without retraining?",
        "What determines the optimal threshold value - the model's training or the platform's policy goals?",
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
        "Cross-lingual transfer failure (recall drops because the English-trained model does not generalize to other languages - fix: multilingual fine-tuning with target-language examples) and cultural/linguistic false positive bias (the model flags culturally-specific idioms as harmful - fix: adversarial debiasing with native-language annotators).",
        "The model is overfitting to English training data (fix: add L2 regularization) and has high false positive rate globally (fix: increase the classification threshold).",
        "Insufficient training data (fix: collect more English examples) and annotation errors (fix: re-annotate the test set).",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "What are the two distinct problems: low recall on non-English content, and high false positives on culturally-specific language?",
        "Why does an English-trained model fail to generalize to other languages - and what type of model and data can fix this?",
      ],
    },
    {
      id: "q-msd-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A content moderation classifier is deployed at 100,000 QPS on a platform with 0.1% harmful content rate. The classifier has 99% precision and 85% recall. Approximately how many false positives (safe content incorrectly removed) does the system generate per second?",
      options: [
        "~0 - 99% precision means almost no false positives.",
        "~1,000 per second - of ~99,900 safe posts/second, 1% are incorrectly flagged.",
        "~15 per second - from the 15% recall miss rate.",
        "~100 per second - the harmful content rate drives false positives.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
      correctAnswer: "false",
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
        "A content moderation system serves 10 languages with abundant English data (5M labeled examples) but only 500-5,000 labeled examples for 8 other languages. What is the most effective approach?",
      options: [
        "Train separate monolingual classifiers for each of the 10 languages.",
        "Fine-tune a multilingual pretrained model (e.g., XLM-RoBERTa) on all available data, leveraging cross-lingual transfer from English to low-resource languages.",
        "Machine-translate all non-English content to English, then apply an English-only classifier.",
        "Use rule-based filters for low-resource languages and ML only for English.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "XLM-RRoBERTa was pretrained on 2.5 TB of multilingual data - its representations generalize across languages.",
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
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "Apply two-stage scoring: a fast vectorized similarity pre-filter (TF-IDF cosine < 0.3 \\to discard) to reduce candidate pairs by 90%, followed by the 0.1 ms classifier on the remaining 5B pairs. Add transitivity closure (union-find) to propagate matches.",
        "Reduce blocking to 100M candidate pairs by using stricter blocking keys, accepting recall loss.",
        "Use approximate nearest neighbor search (LSH) to replace blocking entirely, generating 1M candidate pairs.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "Entity resolution (record linkage) without blocking has O(n\\^2) complexity for n records. With blocking, complexity drops to near-linear. What is the trade-off introduced by blocking?",
      options: [
        "Blocking increases memory usage exponentially.",
        "Blocking reduces recall: record pairs in different blocks are never compared, so true matches across blocks are missed.",
        "Blocking requires labeled data to learn the blocking key.",
        "Blocking eliminates the need for a similarity function, reducing accuracy.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "What is the computational cost of comparing all n records against all n records? Is this tractable for large datasets?",
        "The recall loss in blocking comes from what source - which pairs are never compared?",
      ],
    },
    {
      id: "q-msd-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Blocking in entity resolution reduces the number of record pairs that must be compared, at the cost of potentially missing some true matches.",
      correctAnswer: "true",
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
        "Exact string equality on both fields - only exact matches are reliable.",
        "Edit distance (Levenshtein) on name, address normalization + fuzzy matching, and blocking on zip code prefix to limit comparisons.",
        "TF-IDF cosine similarity on the full concatenated record string.",
        "Embedding similarity using a general-purpose sentence encoder.",
      ],
      correctAnswer: 1,
      explanation:
        'Entity resolution for business names requires: (1) fuzzy name matching (Jaro-Winkler, Levenshtein) to handle "Corp" vs. "Corporation"; (2) address normalization (standardizing "One" vs. "1", expanding "WA" to "Washington") followed by fuzzy matching; (3) zip code blocking to reduce candidate pairs. General sentence encoders are effective but add latency; rule-based normalization + edit distance is more interpretable and often more precise for structured records.',
      hints: [
        'Why does exact string matching fail for "Corp" vs. "Corporation", and what technique handles this?',
        "What address normalization step converts 'One Microsoft Way' and '1 Microsoft Way' to the same form?",
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
        "First, let's recall $1",
      hints: [
        "Feature retrieval latency typically dominates inference latency in real-time ML systems.",
        "Redis GET: ~0.1 ms. PostgreSQL point lookup: 5-20 ms. Choose accordingly.",
      ],
    },
    {
      id: "q-msd-rt1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Edge deployment of ML models (running inference on the device rather than a server) always requires re-training the model from scratch because edge hardware lacks the compute used in training.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "TFLite and CoreML take existing model weights and convert/optimize them for edge hardware.",
        "Quantization-aware training fine-tunes an existing model - it is not a full re-train from scratch.",
      ],
    },
    {
      id: "q-msd-rt1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A real-time recommendation system has a p99 latency SLA of 80 ms end-to-end. Profiling shows: ANN retrieval 15 ms, feature fetch (Redis) 12 ms, model inference 30 ms, response serialization 5 ms. Total p50 is 62 ms but p99 is 130 ms. What is the MOST likely cause and the correct mitigation?",
      options: [
        "The model inference is too slow at p99 - replace the model with a smaller one.",
        "Tail latency amplification: at p99, sequential steps compound slow tails (GC pause, Redis eviction, network jitter). Mitigation: hedged requests to the feature store, per-step timeouts with cached fallbacks, and request-level retries with backoff.",
        "The ANN retrieval step needs more replicas to reduce p99.",
        "Response serialization at 5 ms is the bottleneck - switch from JSON to protobuf.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "When k sequential steps each have a 1% chance of being slow, what is the probability that at least one step is slow? Does this increase or decrease with more steps?",
        "What technique sends the same request to multiple replicas simultaneously and uses whichever responds first?",
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
        "First, let's recall $1",
      hints: [
        "Implicit feedback (clicks, purchases) scales with usage and requires no human labeling cost.",
        "The flywheel only turns if the feedback loop is closed: user signal \\to training data \\to better model \\to more users.",
      ],
    },
    {
      id: "q-msd-dfw1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Implicit feedback signals (e.g., clicks, dwell time, purchase completions) are always an unbiased proxy for user satisfaction and can be used directly as training labels without any preprocessing.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "A click at rank 1 and a click at rank 10 are not equally strong signals of relevance.",
        "Exposure bias: the model never sees signal for items it never recommends - creating a filter bubble.",
      ],
    },
    {
      id: "q-msd-dfw1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A marketplace app collects 50 million user interactions per day as implicit feedback. Which data flywheel design problem is MOST critical to address?",
      options: [
        "Storage cost - 50M events/day is too large to store.",
        "Feedback loop bias: the current model controls which items users see, so training on its logs reinforces existing decisions. Items the model underranked have no signal, and any model biases are amplified in the next iteration.",
        "Label noise - implicit signals have too much noise for supervised learning.",
        "Latency - 50M events/day cannot be processed in real-time.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "If the model always shows item A and never item B, item A gets clicks and item B gets zero - even if B is better.",
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
        "First, let's recall $1",
      hints: [
        "Recomputing a user embedding from scratch at request time would add hundreds of milliseconds - unacceptable for real-time serving.",
        "Pre-compute slow-changing features; compute fast-changing features (session signals) in real-time.",
      ],
    },
    {
      id: "q-msd-pers1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Session context (the sequence of items a user interacted with in the current browsing session) is more informative than long-term user embeddings for predicting the user's NEXT action within the same session.",
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
      hints: [
        "Session context captures current intent; long-term embeddings capture stable preferences - both are needed.",
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
        "Show globally most popular products - simple and requires no user data.",
        "Use a multi-armed bandit (e.g., Thompson Sampling) initialized with population-level priors segmented by onboarding signals (age, income range, stated goals), updated with each new user interaction during the session.",
        "Wait 30 days before personalizing - collect enough data first.",
        "Use the most recently popular products in the user's geographic region.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Thompson Sampling: maintain a Beta distribution over each item's click probability; sample from it to select items; update on each interaction.",
        "Onboarding signals (age, income, stated goal) allow segmenting the population prior - 25-year-old investor vs. 55-year-old retiree need different priors.",
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
        "First, let's recall $1",
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
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "Late fusion: pre-encode gallery offline \\to ANN search at query time. Early fusion: cannot pre-encode - requires joint encoding at query time.",
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
        "At query time: encode the uploaded image + encode all 10M catalog images \\to compute all cosine similarities \\to return top-k.",
        "Offline: encode all 10M catalog images and index in an ANN index (FAISS/HNSW). At query time: encode the user's uploaded image \\to ANN search over pre-indexed catalog \\to return top-k. Re-rank with a cross-modal reranker if needed.",
        "Train a classifier with 10M output classes (one per item) and predict the closest item class.",
        "Use perceptual hashing (pHash) to find visually identical items - no ML model required.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "10M cosine similarities \\times ~1 µs each = 10 seconds. ANN search: O(log n) = milliseconds.",
        "New catalog items only need to be encoded and added to the ANN index - no model retraining required.",
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
        "Linear scan of all driver GPS coordinates - O(n) but always correct.",
        "Geohash-based spatial index: encode driver locations as geohash strings and query neighboring geohash cells that intersect the 2 km radius.",
        "Inverted index on city name - group drivers by city for fast lookup.",
        "B-tree index on latitude and longitude - standard database indexing handles spatial queries.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Geohash length 6 \\approx 1.2 km \\times 0.6 km cells. Length 7 \\approx 153 m \\times 153 m. Choose based on query radius.",
        "Redis GEOSEARCH command: geohash-based spatial index built into Redis - sub-millisecond radius queries.",
      ],
    },
    {
      id: "q-msd-geo1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Training a geospatial ML model (e.g., predicting demand by location) with raw GPS coordinates (latitude, longitude) as features is equivalent in quality to using spatial embeddings or geohash encodings.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "Store all raw GPS traces - location data is not personally identifiable.",
        "Apply local differential privacy (LDP) with calibrated noise added to GPS coordinates on-device before transmission, ensuring individual traces cannot be reverse-engineered while aggregate statistics remain accurate for training.",
        "Delete GPS data after 24 hours to limit exposure.",
        "Anonymize GPS data by removing timestamps - location without time is not personally identifiable.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "LDP: noise is added on-device. Central DP: noise is added server-side after collection. LDP provides stronger user privacy guarantees.",
        "With \\epsilon=1, LDP randomizes ~37% of reports - the aggregate over millions of users still converges accurately.",
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
        "The evaluation metric is wrong - use RMSE instead of MAE.",
        "The model is overfitting to the training years and cannot generalize.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "3 years \\to 3 Decembers \\to the model has 3 training samples for the most important retail month.",
        "Fourier features (sin/cos of day-of-year) provide smooth seasonality encoding that generalizes across years.",
      ],
    },
    {
      id: "q-msd-ts1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In time-series forecasting, concept drift (the relationship between features and the target changing over time) is fully addressed by retraining the model on the most recent data window and discarding all older training data.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "First, let's recall $1",
      hints: [
        "Recursive forecasting error at step k grows approximately as k \\times \\sigma_1 for independent errors.",
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
        "Log all queries but do not cache - caching LLM responses introduces staleness.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Customer service queries have high repetition - password reset, billing, and shipping inquiries dominate.",
        "Semantic cache hit rate depends on similarity threshold: too high = low hit rate; too low = wrong responses.",
      ],
    },
    {
      id: "q-msd-llm1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Prompt versioning and management at scale (tracking which prompt template generated each LLM response in production) is unnecessary operational overhead because prompt changes are small text edits that do not significantly affect system behavior.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "A prompt is the model's 'code' at inference time - changing it is as impactful as changing model weights.",
        "Without prompt versioning, a customer complaint about bad LLM output cannot be reproduced or debugged.",
      ],
    },
    {
      id: "q-msd-llm1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An LLM API serving system handles 10,000 concurrent requests with highly variable output lengths (10-2000 tokens). The system uses static batching. Which problem does static batching create, and what replaces it?",
      options: [
        "GPU memory fragmentation - static batching wastes memory. Replace with unified memory.",
        "GPU utilization collapse: when the longest sequence in a batch finishes last, all other GPU slots sit idle. Continuous batching (iteration-level scheduling, used in vLLM) adds new requests as sequences complete, eliminating idle time and improving throughput by 5-20\\times.",
        "Network bandwidth saturation - static batching requires too many tokens to be transferred. Replace with token streaming.",
        "Cache invalidation overhead - replace with request-level KV cache pinning.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Idle GPU in static batching: slots that finished early wait for the slowest sequence in the batch.",
        "vLLM introduced PagedAttention + continuous batching in 2023, showing 23\\times throughput improvement over naive serving.",
      ],
    },
  ],

  "ml-fairness-systems": [
    {
      id: "q-msd-fair1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A hiring algorithm ranks job applicants and is found to recommend men at a 2\\times higher rate than equally qualified women. Which fairness criterion is violated and what is the simplest post-processing fix?",
      options: [
        "Calibration is violated - apply Platt scaling to recalibrate scores.",
        "Demographic parity is violated (men and women are not recommended at equal rates). Post-processing fix: apply separate score thresholds per gender group, tuning each threshold to achieve equal positive prediction rates across groups.",
        "Individual fairness is violated - rank candidates purely by individual qualifications.",
        "Accuracy parity is violated - retrain the model on balanced data.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Post-processing is the cheapest fairness fix: adjust thresholds after training without modifying the model.",
        "Demographic parity does not require equal accuracy - it requires equal positive prediction rates.",
      ],
    },
    {
      id: "q-msd-fair1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "It is mathematically possible to simultaneously satisfy demographic parity (equal positive rates across groups), equalized odds (equal TPR and FPR across groups), and calibration (predicted probabilities match observed rates) when base rates differ between groups.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "Chouldechova (2017) proved the fairness impossibility theorem - satisfying all fairness criteria simultaneously is impossible when base rates differ.",
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
        "Apply constrained optimization during training: add fairness constraints as Lagrange multipliers to the loss function (e.g., |TPR_group_A − TPR_group_B| \\leq \\epsilon), and monitor fairness metrics in production with automated alerts when constraints are violated.",
        "Retrain the model separately for each racial group - separate models guarantee fairness.",
        "Apply a uniform score multiplier to all members of the disadvantaged group.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "First, let's recall $1",
      hints: [
        "In a parameter server architecture, where do all workers send their gradients, and what becomes the bottleneck as the number of workers increases?",
        "In ring-AllReduce, how many neighbors does each worker communicate with, and how does this affect scalability?",
      ],
    },
    {
      id: "q-msd-dt1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Gradient compression techniques (e.g., Top-K sparsification, 1-bit quantization of gradients) can reduce communication volume in distributed training by 10-100\\times with minimal impact on final model accuracy.",
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
      hints: [
        "What is the key idea behind Top-K gradient sparsification, and what ensures that untransmitted gradient information is not permanently lost?",
        "What system resource (compute or communication bandwidth) is typically the bottleneck in large-scale distributed training?",
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
        "Implement periodic checkpointing (e.g., every 30 minutes) with elastic training (TorchElastic): on failure, the remaining 63 GPUs re-partition the data and model, load the latest checkpoint, and continue training - losing at most 30 minutes of work.",
        "Use synchronous training - synchronous updates automatically handle GPU failures without checkpointing.",
        "Assign the failed GPU's work to the CPU on the same node as a fallback.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "What determines the maximum amount of work lost when a GPU fails during a distributed training job?",
        "What mechanism allows surviving workers to automatically re-form a training group and continue after a worker failure?",
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
        "First, let's recall $1",
      hints: [
        "How does Bayesian optimization use previous trial results to select the next trial, compared to grid search which tries all combinations independently?",
        "Which search strategy is most sample-efficient: one that tries all combinations, one that samples randomly, or one that learns from previous results?",
      ],
    },
    {
      id: "q-msd-exp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Successive Halving and Hyperband early-stopping algorithms improve hyperparameter search efficiency by terminating unpromising trials early based on intermediate validation metrics, allowing more total configurations to be explored within a fixed compute budget.",
      correctAnswer: "true",
      explanation:
        "First, let's recall $1",
      hints: [
        "Successive Halving: start with N configs at 1 epoch each. Keep top N/3 \\to train to 3 epochs. Keep top N/9 \\to train to 9 epochs.",
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
        "First-come, first-served scheduling - simple and predictable.",
        "A multi-level priority scheduler: trials are grouped by experiment with per-experiment GPU quotas enforced by a resource manager (e.g., Kubernetes resource limits + fair-share scheduling via YARN or Slurm with preemption). High-priority experiments receive guaranteed quota; exploratory experiments receive best-effort scheduling.",
        "Run all trials sequentially on a single large GPU node - avoids scheduling complexity.",
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
        "Fixed window counter - increment a counter each second, reject when it hits 100. Simple and exact.",
        "Token bucket - tokens accumulate at 100/sec up to a burst capacity (e.g., 200 tokens). Requests consume tokens; excess requests are dropped. Allows short bursts up to bucket size while enforcing the 100 req/s average.",
        "Leaky bucket - requests enter a queue processed at 100/sec, excess requests are immediately dropped. Smooths output but does not allow any bursting.",
        "Sliding window log - store timestamps of each request; reject if the count in the last 1 s window exceeds 100. Accurate but memory-intensive.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Burst allowance = bucket capacity. If bucket holds 200 tokens, a client can send 200 requests instantly after being idle for 2 seconds.",
        "Leaky bucket fills a queue and processes it at a fixed rate - this is an output-rate limiter, not a burst-tolerant one.",
      ],
    },
    {
      id: "q-msd-sd-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a distributed system with multiple API gateway nodes, a local (in-process) rate limiter on each node guarantees that the global per-user request rate is enforced accurately.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
      hints: [
        "Sticky sessions (routing user X always to node Y) make local rate limiting accurate - but require consistent hashing or session affinity.",
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
        "Increase Redis memory so all timelines fit - eliminates eviction and staleness.",
        "Use write-around caching - on celebrity post, skip updating the cache entirely and let reads populate it lazily from the DB.",
        "Fanout-on-write with probabilistic early expiration: pre-compute and push the new post to followers' cached timelines, and use jittered TTLs plus a 'soft TTL' (background refresh before hard expiry) to prevent simultaneous expiry.",
        "Add a read-through cache layer with a 5-second lock: when cache misses, one thread fetches from DB while others wait behind a mutex.",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall $1",
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
        "First, let's recall $1",
      hints: [
        "Redis SET NX EX is atomic - SET if Not eXists with an EXpiry. This creates a distributed mutex with automatic lock release on timeout.",
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
        "Auto-increment a 64-bit integer in the DB and encode it in base62 (a-z, A-Z, 0-9). A 7-char base62 string encodes up to 62^7 \\approx 3.5 trillion unique IDs, far more than 100M. Pros: no collisions, short codes, simple. Cons: single-point auto-increment bottleneck - mitigate with Twitter Snowflake-style distributed ID generation.",
        "Generate a random UUID (128-bit) for each URL. Store UUID\\tolong_url in DynamoDB. Short code = first 7 hex characters of UUID.",
        "Use a consistent hash of the long URL across 10 DB shards. The shard ID + row ID form the short code.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "62^7 = 3,521,614,606,208 - always compute this to confirm the ID space is large enough.",
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
        "Modulo: ~80% remapped. Consistent hashing: ~20% remapped - same formula, the only difference is which keys move.",
        "Modulo: 80% remapped (4/5 of keys change their target node). Consistent hashing: ~1/5 = 20% remapped (only keys owned by the new node's range move).",
        "Modulo: 100% remapped (every key's hash % N changes). Consistent hashing: ~1/(N+1) \\approx 20% remapped.",
      ],
      correctAnswer: 3,
      explanation:
        "First, let's recall $1",
      hints: [
        "Consistent hashing invariant: adding node X only remaps keys in X's arc on the ring - no other nodes are affected.",
        "Virtual nodes: each physical server owns V points on the ring. Larger V \\to more uniform load distribution but higher coordination overhead.",
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
        "First, let's recall $1",
      hints: [
        "Consumer group = independent cursor on the log. Adding consumers to a group parallelizes consumption (one consumer per partition max).",
        "Retention: Kafka keeps all messages until retention.ms or retention.bytes is exceeded - consumers can re-read old messages, enabling replay and catch-up.",
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
        "Short polling: client polls every 1 second. Simple to implement; scales poorly - 2B devices \\times 1 req/s = 2B req/s server load even when no messages arrive.",
        "Long polling: client holds an HTTP connection open; server responds only when a message arrives (or on timeout). Better than polling but still wastes one HTTP connection per client and has high reconnect overhead on mobile.",
        "WebSocket (persistent bidirectional TCP connection) for online users, maintained by a stateful connection server (chat service). For offline users: store the message in a DB (e.g., Cassandra) keyed by recipient; on reconnect, the client fetches missed messages via REST. Mobile push (APNs/FCM) wakes offline apps.",
        "Server-sent events (SSE): server streams messages over HTTP/2 to the client. Bidirectional by using REST for client\\toserver. Simpler than WebSocket.",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall $1",
      hints: [
        "Erlang/OTP: each WebSocket connection = one lightweight Erlang process. 2M processes per server is feasible due to Erlang's green threads and preemptive scheduler.",
        "Message storage key design: (recipient_id, timestamp) \\to allows efficient range scan for 'messages since last seen timestamp' on reconnect.",
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
        "First, let's recall $1",
      hints: [
        "Key trie optimization: store top-K completions at EVERY node, not just leaf nodes. Traversing 'sta' returns the pre-computed top-5 without scanning all children.",
        "Trie memory: 10B queries \\times average 30 chars = ~300GB raw; frequency aggregation collapses to ~50M unique prefixes \\times top-5 entries \\approx manageable with compression.",
      ],
    },
    {
      id: "q-msd-famous2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "For a typeahead system, displaying personalized completions (based on the individual user's past queries) requires the same trie data structure as global completions, just partitioned by user_id.",
      correctAnswer: "false",
      explanation:
        "First, let's recall $1",
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
        "Netflix uses its Open Connect CDN: ISPs host Netflix Open Connect Appliances (OCA) inside their own networks. The Mumbai ISP's OCA has pre-fetched popular titles overnight via proactive caching (Zipf distribution - top 20% of titles = 80% of plays). The player requests the video from the nearest OCA, serving from local storage with sub-millisecond network hops inside the ISP.",
        "Netflix uses AWS CloudFront edge locations. The Mumbai CloudFront PoP caches video segments on-demand (cache-on-miss). The first viewer of an unpopular title fetches from S3 origin and populates the edge cache for subsequent viewers.",
        "Netflix streams via WebRTC peer-to-peer: users in the same city share video chunks with each other, reducing origin server load.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "Design Uber: 1M drivers send GPS location updates every 4 seconds. A rider requests a trip - the system must find all available drivers within 5km in <200ms. Which geospatial indexing approach does Uber use and why?",
      options: [
        "MySQL with lat/lng columns and a query: SELECT * FROM drivers WHERE lat BETWEEN rider_lat-0.045 AND rider_lat+0.045 AND lng BETWEEN rider_lng-0.045 AND rider_lng+0.045. Add a composite B-tree index on (lat, lng).",
        "Google S2 geometry: divide Earth into a hierarchy of cells using the Hilbert space-filling curve. Each driver's location maps to an S2 cell ID at multiple precisions. Store driver locations in a key-value store keyed by S2 cell ID. Query: fetch all drivers in the target S2 cells covering the 5km radius. S2 cells at level 14 are ~600m across, so a 5km radius requires ~50 S2 cells. Cell IDs are 64-bit integers enabling fast integer-key lookups.",
        "Geohash: encode each driver's location as a 6-character geohash (~1.2km precision). Store drivers in a Redis set per geohash cell. Query nearby geohash cells (the 8 neighbors + center) for drivers. Limitation: geohash cells don't map cleanly to circular radii.",
        "QuadTree: recursively subdivide the map into four quadrants. Store driver locations in a balanced QuadTree in memory on each matching server. Range query: traverse the QuadTree to find all drivers within 5km bounding box.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
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
        "Design a payment system like Stripe: a user clicks 'Pay $100' and your server calls the payment processor. The network times out - you don't know if the charge succeeded. How do you prevent double-charging while ensuring the payment eventually completes?",
      options: [
        "Retry the API call immediately. If the payment processor returns 'already charged', catch that error and treat the payment as successful.",
        "Never retry. On timeout, mark the order as 'pending' and require the user to manually retry the payment from the UI.",
        "Generate a client-generated idempotency key (UUID) per payment attempt before the API call. Send this key as a header (Idempotency-Key: <uuid>) on every attempt. The payment processor stores (idempotency_key, result) in its DB with a unique constraint. Retries with the same key return the cached result - guaranteed exactly-once processing regardless of retries or timeouts.",
        "Use two-phase commit (2PC) between your DB and the payment processor's DB. Phase 1: prepare both sides. Phase 2: commit if both prepared successfully. On coordinator failure, the transaction rolls back.",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall $1",
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
        "LSM tree (Log-Structured Merge-tree): writes go to an in-memory buffer (MemTable), then sequentially to disk as immutable SSTables. Sequential writes maximize disk throughput. Background compaction merges SSTables. Read performance trades off against write performance - reads may require checking multiple SSTables (mitigated by Bloom filters per SSTable).",
        "Both B-tree and LSM tree have the same write throughput because SSD random write IOPS (100K+) exceeds the 1M writes/s requirement at the data-per-operation level.",
        "LSM tree buffers writes in memory until a crash, making it unsuitable for durability requirements without a write-ahead log (WAL). B-trees are more durable by default.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "LSM write path: WAL (durability) \\to MemTable (speed) \\to SSTable (persistence). WAL + MemTable = writes survive crash; WAL is sequential append.",
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
        "Pure fan-out-on-read (pull): when a user opens their feed, query all 2000 followed accounts for their recent tweets, merge and sort by time. Simple but slow at read time - 2000 DB queries per feed load.",
        "Pure fan-out-on-write (push): when a user posts, write the tweet ID to each follower's timeline cache (Redis sorted set). Feed reads are O(1). Problem: a celebrity with 30M followers causes 30M Redis writes per tweet - write latency is unacceptable.",
        "Hybrid: fan-out-on-write for normal users (\\leq ~10K followers) into each follower's Redis timeline cache. For celebrities (> threshold), use fan-out-on-read at render time - fetch celebrity tweets separately and merge with the pre-computed timeline. This limits write fan-out to manageable sizes while keeping reads fast for all users.",
        "Fan-out-on-write for all users, using Kafka to buffer the 30M writes asynchronously. The celebrity's 30M followers all eventually receive the tweet within 5 seconds.",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall $1",
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
        "(1) URL deduplication: keep a distributed Bloom filter (or hashset) of seen URLs - prevents re-crawling. (2) Politeness: per-domain crawl delay (respect robots.txt + 1 req/s default) using per-domain priority queues. (3) URL frontier prioritization: prioritize high-PageRank, frequently-updated pages using a multi-level priority queue + back queue routing by domain.",
        "(1) Download speed: fetch pages in parallel using async I/O (aiohttp). (2) Parser: extract links using regex, not HTML parsing libraries. (3) Storage: write raw HTML to HDFS for later processing.",
        "(1) Robots.txt: check robots.txt before crawling each page on every request. (2) DNS: resolve each domain's IP via public DNS on every request. (3) Deduplication: use exact URL string matching in a SQL database.",
      ],
      correctAnswer: 1,
      explanation:
        "First, let's recall $1",
      hints: [
        "Bloom filter false positive tradeoff: at 10 bits/element, false positive rate \\approx 0.8%. A false positive means a new URL is incorrectly marked as seen and skipped - acceptable for a crawler.",
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
        "ANN trade-off: exact kNN is O(N) per query - infeasible for N=10B. HNSW and IVF-PQ achieve O(log N) or better with 95-99% recall.",
        "Independence requirement: item tower output must not depend on query features. Any user-item feature interaction must be deferred to the ranking stage.",
      ],
    },
    {
      id: "q-msd-tt-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A two-tower retrieval model trained with in-batch negatives has a systematic sampling bias. What is it and how is it corrected?",
      options: [
        "In-batch negatives oversample popular items as negatives (popular items appear more in batches), making the model incorrectly learn popular items are negative - corrected by logQ correction: subtracting log(sampling_probability) from each negative's logit before softmax",
        "In-batch negatives undersample rare items causing overfitting to popular items - corrected by stratified sampling equalizing item frequency in batches",
        "In-batch negatives create false positives because some batch items might be positive for other users - corrected by masking known positives across the batch",
        "In-batch negatives have too small a batch size to represent the full item distribution - corrected by using a memory bank of randomly sampled hard negatives",
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
      correctAnswer: "true",
      explanation: "The retrieval-ranking architecture exists to enable this split: retrieval (two-tower ANN) must score billions of items and can only use simple dot-product-compatible features; ranking scores only 100-1000 candidates and can use arbitrarily complex features including user-item cross-features, real-time context, and deep feature interactions (DCN, DeepFM, attention). The ranking model can be much larger and more expensive because its candidate set is tiny.",
      hints: [
        "Retrieval: O(log N) per query, N=10B, must be fast - simple dot product, pre-indexed items.",
        "Ranking: O(K) per query, K=500, can be slow - deep feature interaction models, cross-features, sequential attention.",
      ],
    },
    {
      id: "q-msd-tt-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Cold-start problem: a new item with zero interaction history must be recommended. Which approach best handles cold-start in a two-tower retrieval system?",
      options: [
        "Exclude new items from retrieval until they accumulate at least 100 interactions, ensuring embedding quality",
        "Use the item content tower (trained on item metadata: title, description, category, price) to generate an embedding from content features alone, bypassing interaction history, and index this embedding directly in the ANN index - update with interaction-based embeddings as data accumulates",
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
        "Cache all features in Redis with a 24-hour TTL - the model always reads from cache, missing features filled with zeros",
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
        "Use no caching - always recompute fresh embeddings for every request to maximize recommendation quality",
      ],
      correctAnswer: 1,
      explanation: "Caching intermediate representations (embeddings) is more flexible than caching model outputs: the same cached user embedding can be reused across different contexts (different item catalogs, A/B test variants, different ranking models). User embedding TTL should be calibrated to behavioral change rate. Event-driven invalidation (clear cache on purchase or session start) ensures major behavioral changes are reflected quickly. This reduces expensive user history loading by 80-95% during peak traffic while maintaining recommendation quality.",
      hints: [
        "Embedding cache hit rate: if users make 5 requests/session within 10 minutes, a 10-minute TTL achieves ~80% cache hit rate.",
        "Invalidation events: purchase, session start, explicit negative feedback - these signal significant preference changes making cached embeddings stale.",
      ],
    },
    {
      id: "q-msd-rt-3",
      type: "true-false",
      difficulty: "medium",
      question: "Streaming feature computation using Apache Flink can achieve the same per-event latency as computing features directly in the serving layer at request time.",
      correctAnswer: "false",
      explanation: "Streaming frameworks like Flink introduce additional latency: events must be published to Kafka, consumed by the Flink job, aggregated, and written to a feature store, then read back at serving time. This typically adds 100ms-5s of end-to-end latency beyond direct computation. The trade-off is scalability: streaming frameworks can aggregate across millions of events (user's 30-min click history) that would be impossible to recompute from scratch on each request. Direct request-time computation is only feasible for simple features derivable from the request context alone.",
      hints: [
        "Streaming latency: Kafka publish (~5ms) + Flink window processing (~100ms-1s) + Redis write (~5ms) + Redis read (~1ms). Total: 100ms-1s additional vs request-time computation.",
        "Streaming advantage: amortizes expensive aggregation computations across the stream rather than per-request.",
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
        "More users -> more data -> better model -> more users. The key design requirement is that user interactions must generate labeled training data - through explicit feedback (ratings, likes) or implicit feedback (clicks, dwell time, purchases) treated as weak labels",
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
        "Human reviewers are too slow - prevented by hiring more reviewers or setting shorter SLAs",
        "Confirmation bias feedback loop: the model only sends uncertain items to humans, so human labels only cover the uncertain region. The model never learns from items it confidently auto-approves or auto-rejects - prevented by (a) sampling a random fraction of all traffic for human review regardless of confidence, and (b) tracking auto-decision accuracy via periodic audits",
        "Human reviewers disagree with each other - prevented by enforcing strict annotation guidelines and removing disagreed labels",
        "The model overtakes human accuracy after sufficient training, making human review wasteful",
      ],
      correctAnswer: 1,
      explanation: "The confirmation bias loop in HITL: if humans only review model-uncertain items (typical for efficiency), training data is biased toward uncertain cases. Items the model confidently auto-approves - potentially including false negatives (harmful content the model is confidently missing) - never get human labels. Prevention: (1) Random sampling audit: send 1-5% of all auto-approved and auto-rejected items for human review regardless of confidence. (2) Periodic error analysis: compare model decisions to human decisions on sampled items to measure false negative rate. (3) Active learning prioritizes regions where errors are most harmful.",
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
      correctAnswer: "true",
      explanation: "Weak supervision (Ratner et al. 2016, Snorkel) uses multiple weak, noisy label sources called labeling functions (LFs) - heuristics, patterns, external knowledge bases, pre-trained models. Snorkel's label model combines LF outputs using a generative model estimating LF accuracies and correlations, producing soft probabilistic labels that train a discriminative model. This enables generating millions of training labels without hand-labeling each sample, at the cost of some label noise. Used in FDA, Google, and Apple production ML pipelines for medical record classification, content moderation, and information extraction.",
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
        "Users click too rarely, creating too few training examples - mitigated by boosting CTR via UI changes",
        "Position bias: users are more likely to click results at rank 1 than rank 5 regardless of relevance, causing the model trained on click data to reinforce already-highly-ranked results - mitigated by inverse propensity scoring (IPS) that deweights clicks on high-rank positions, or by randomized result injection to collect unbiased click data",
        "Users click on irrelevant results by mistake - mitigated by requiring users to dwell on results for at least 30 seconds before counting as positive",
        "Different users have different click behaviors - mitigated by personalizing training data by clustering users and training separate models per cluster",
      ],
      correctAnswer: 1,
      explanation: "Position bias is the dominant threat to search click log quality: P(click | position=1) >> P(click | relevance) for most users. A model trained naively on click data learns 'show at rank 1 -> gets clicks -> is relevant', which is backwards. IPS corrects this: weight each click by 1/P(click | position), where propensity P(click | position) is estimated from randomized experiments (swap top-2 results, measure click rate changes). This deweights high-position clicks and upweights low-position clicks. Unbiased learning to rank (ULTR) frameworks formalize this correction.",
      hints: [
        "IPS estimation: run A/B experiment where some queries show results in random order. Estimate P(click | position) from this randomized data. Apply to biased log.",
        "Propensity clipping: IPS weights can be very large for low-position clicks. Clip weights at a maximum to prevent high-variance gradient updates.",
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
      correctAnswer: "false",
      explanation: "Without secure aggregation or DP, the central server sees each client's gradient update, which can leak significant information about local data. Gradient inversion attacks (Zhu et al. 2019, Deep Leakage from Gradients) demonstrate that raw pixel-level training images can be reconstructed from gradients with high fidelity, especially for small batch sizes. The attack optimizes a dummy input to match the observed gradient, effectively inverting the gradient computation. FL alone provides much weaker privacy than commonly assumed - gradients are not private.",
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
        "Set a per-round epsilon budget and allow unlimited training rounds - privacy loss is bounded per round so total loss is acceptable",
        "Apply the moments accountant (Abadi et al. 2016) or Renyi DP composition to track cumulative privacy budget across all training rounds. Stop training or increase noise when the total epsilon reaches the budget. Each additional round consumes additional budget, so number of rounds is inherently limited for a fixed noise level",
        "Reset the privacy budget to zero after each model release, since deployed models cannot be queried for training data",
        "Use per-user privacy budgets - each user has their own epsilon and users who have spent their budget are excluded from future training rounds",
      ],
      correctAnswer: 1,
      explanation: "Privacy budget composition is fundamental: training for T rounds with per-round epsilon_r does NOT give total epsilon = epsilon_r. The moments accountant tracks privacy loss distribution across rounds precisely using Renyi DP composition, which is tighter than naive composition (T * epsilon_r). For large T, total epsilon grows as O(sqrt(T)). Once the total epsilon budget is spent, training must stop or noise must increase. This creates a fundamental tension: more training = better model but worse privacy. Systems must define a privacy policy (e.g., epsilon <= 10 per year per dataset) and plan training schedules accordingly.",
      hints: [
        "Moments accountant vs naive composition: for T=1000 rounds at epsilon_r=0.1, naive gives epsilon_total=100, moments accountant gives ~3-5. Much tighter.",
        "Privacy budget per model version: some teams treat each model release as a new privacy domain and restart budget tracking - actively debated in the DP community.",
      ],
    },
      ],
};

Object.assign(questions, extraMsdQ3);

registerQuestions(questions);

export default questions;
