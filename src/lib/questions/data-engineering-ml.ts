import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  // Topic 1: Data Pipeline Fundamentals
  "etl-vs-elt": [
    {
      id: "q-de-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key difference between ETL and ELT?",
      options: [
        "ETL is faster than ELT",
        "ETL transforms data before loading; ELT loads raw data first then transforms in the destination",
        "ETL only works with structured data",
        "ELT requires more storage",
      ],
      correctAnswer: 1,
      explanation:
        "ETL (Extract, Transform, Load): Transform happens in a separate processing layer before loading. ELT (Extract, Load, Transform): Raw data is loaded to the data warehouse first, then transformed using warehouse compute. ELT is preferred with modern cloud warehouses (Snowflake, BigQuery) that have powerful transformation capabilities.",
      hints: [
        "ETL: Transform before load, ELT: Transform after load",
        "Cloud warehouses made ELT popular",
      ],
    },
  ],

  "batch-streaming": [
    {
      id: "q-de-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When should you choose streaming over batch processing?",
      options: [
        "Always prefer streaming",
        "When you need real-time insights (fraud detection, monitoring, recommendations) or low-latency feature serving",
        "When data volume is small",
        "Batch is always cheaper",
      ],
      correctAnswer: 1,
      explanation:
        "Choose streaming for: (1) Real-time fraud detection, (2) Live monitoring and alerting, (3) Real-time personalization, (4) Low-latency feature serving for ML inference. Batch is better for: (1) Large-scale analytics, (2) Model training pipelines, (3) Historical reporting. Streaming adds complexity and cost.",
      hints: [
        "Streaming = real-time, Batch = cost-effective for large data",
        "Most ML training still uses batch",
      ],
    },
  ],

  "data-formats": [
    {
      id: "q-de-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is Parquet preferred over CSV for ML data pipelines?",
      options: [
        "Parquet is easier to read",
        "Parquet is columnar (better compression, faster column reads), typed, and self-describing",
        "CSV is deprecated",
        "Parquet works without compression",
      ],
      correctAnswer: 1,
      explanation:
        "Parquet advantages: (1) Columnar storage - only read columns you need, (2) 10-100x better compression than CSV, (3) Schema embedded in file, (4) Type safety (int, float, string), (5) Predicate pushdown for filtering. For ML, this means faster feature extraction and lower storage costs.",
      hints: [
        "Columnar = efficient for analytical queries",
        "Compression + types + schema = modern data format",
      ],
    },
  ],

  "data-partitioning": [
    {
      id: "q-de-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is data partitioning and why does it matter for ML pipelines?",
      options: [
        "Splitting data across team members",
        "Organizing data by key columns (date, user_id) to enable efficient querying of subsets",
        "Encrypting data partitions",
        "Compressing data files",
      ],
      correctAnswer: 1,
      explanation:
        "Partitioning organizes data into directories by key columns (e.g., date=2024-01-01/). Benefits: (1) Query only relevant partitions instead of full dataset, (2) Parallel processing by partition, (3) Efficient time-based filtering for training data. Common patterns: partition by date, user_id, or model version.",
      hints: [
        "Partition by commonly filtered columns",
        "Enables partition pruning in queries",
      ],
    },
  ],

  // Topic 2: Modern Data Stack
  "apache-airflow": [
    {
      id: "q-de-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is Apache Airflow and what problem does it solve?",
      options: [
        "A database management system",
        "A workflow orchestration platform for authoring, scheduling, and monitoring data pipelines",
        "A data visualization tool",
        "A machine learning framework",
      ],
      correctAnswer: 1,
      explanation:
        "Airflow is a workflow orchestrator: (1) Define pipelines as Python code (DAGs), (2) Schedule tasks (daily, hourly, cron), (3) Monitor execution with web UI, (4) Handle dependencies between tasks, (5) Retry on failure. It's the de facto standard for data pipeline orchestration, though alternatives like Dagster and Prefect are growing.",
      hints: [
        "Airflow = pipeline orchestrator, not data processor",
        "DAGs define task dependencies",
      ],
    },
  ],

  "dbt-transformations": [
    {
      id: "q-de-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is dbt and why is it popular for data transformations?",
      options: [
        "A database connector",
        "A transformation framework that uses SQL with version control, testing, and documentation",
        "A data visualization library",
        "An ETL tool",
      ],
      correctAnswer: 1,
      explanation:
        "dbt (data build tool) brings software engineering practices to SQL transformations: (1) Version control your transformations, (2) Test data quality assertions, (3) Document models automatically, (4) Define dependencies between models, (5) Run incremental updates. Popular for ELT workflows in cloud warehouses.",
      hints: [
        "dbt = SQL + git + tests + docs",
        "Transforms data in the warehouse, not separate engine",
      ],
    },
  ],

  "apache-spark": [
    {
      id: "q-de-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When should you use Apache Spark over pandas for data processing?",
      options: [
        "Always use Spark",
        "When data exceeds memory (RAM), needs distributed processing, or requires fault tolerance",
        "For any data analysis",
        "Spark is always faster",
      ],
      correctAnswer: 1,
      explanation:
        "Use Spark when: (1) Data > RAM (distributed processing across nodes), (2) Need fault tolerance (automatic recovery from failures), (3) Complex multi-stage pipelines, (4) Processing at PB scale. Pandas is faster for data that fits in memory. Spark has overhead from distributed coordination - use it when you need its capabilities.",
      hints: [
        "Spark = distributed, pandas = single machine",
        "Spark overhead only worth it at scale",
      ],
    },
  ],

  "kafka-streaming": [
    {
      id: "q-de-8",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What role does Kafka play in ML data pipelines?",
      options: [
        "It's a model serving framework",
        "It's a distributed event streaming platform for real-time data ingestion and feature pipelines",
        "It's a database",
        "It's a batch processing engine",
      ],
      correctAnswer: 1,
      explanation:
        "Kafka in ML: (1) Real-time feature computation (stream of user events -> features), (2) Data ingestion from multiple sources, (3) Decoupling producers (apps) from consumers (ML pipelines), (4) Replay capability for retraining. Often paired with stream processing frameworks (Flink, Spark Streaming, Kafka Streams).",
      hints: [
        "Kafka = event streaming backbone",
        "Enables real-time feature pipelines",
      ],
    },
  ],

  // Topic 3: Feature Stores
  "feature-store-concepts": [
    {
      id: "q-de-9",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What problem does a feature store solve in ML systems?",
      options: [
        "Model versioning",
        "Centralizing feature definitions, preventing training-serving skew, and enabling feature reuse across models",
        "Data visualization",
        "Model deployment",
      ],
      correctAnswer: 1,
      explanation:
        "Feature stores solve: (1) Training-serving skew - same feature logic used in both, (2) Feature reuse - define once, use in many models, (3) Point-in-time correctness - historical feature values for training, (4) Low-latency serving - precomputed features for inference. Examples: Feast, Tecton, AWS Feature Store.",
      hints: [
        "Feature store = single source of truth for features",
        "Training and inference use same feature definitions",
      ],
    },
  ],

  "online-offline-features": [
    {
      id: "q-de-10",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the difference between online and offline feature serving?",
      options: [
        "Online is for training, offline is for inference",
        "Online serves precomputed features with low latency (ms) for inference; offline provides batch features for training",
        "Online is real-time, offline is historical",
        "There's no difference",
      ],
      correctAnswer: 1,
      explanation:
        "Offline store: (1) Historical feature values for training, (2) SQL/query access, (3) Point-in-time joins to get correct historical values. Online store: (1) Low-latency (ms) key-value lookup, (2) Used during inference, (3) Only latest feature values, (4) Often Redis/DynamoDB. The feature store syncs from offline to online.",
      hints: [
        "Offline = training (batch), Online = inference (low latency)",
        "Same features, different access patterns",
      ],
    },
  ],

  // Topic 4: Data Quality
  "data-validation": [
    {
      id: "q-de-11",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is data validation important in ML pipelines?",
      options: [
        "It speeds up training",
        "It catches data issues before they corrupt models or cause silent failures",
        "It's required by law",
        "It reduces storage costs",
      ],
      correctAnswer: 1,
      explanation:
        "Data validation prevents: (1) Model corruption from bad data, (2) Silent failures where outputs look valid but are wrong, (3) Debugging nightmares from corrupted training data. Validate: schema (types, required fields), ranges (age 0-150), uniqueness, referential integrity, statistical properties (mean/variance drift).",
      hints: [
        "Bad data in = bad model out",
        "Fail fast, fail loud",
      ],
    },
  ],

  "data-quality-dimensions": [
    {
      id: "q-de-12",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What are the key dimensions of data quality?",
      options: [
        "Speed and cost",
        "Accuracy, completeness, consistency, timeliness, uniqueness, and validity",
        "Size and format",
        "Source and destination",
      ],
      correctAnswer: 1,
      explanation:
        "Data quality dimensions: (1) Accuracy - values are correct, (2) Completeness - no missing values, (3) Consistency - same data across systems, (4) Timeliness - data is current, (5) Uniqueness - no duplicates, (6) Validity - conforms to rules. ML-specific: label quality, feature distributions, data drift.",
      hints: [
        "Six classic dimensions cover most quality concerns",
        "ML adds distribution drift as a dimension",
      ],
    },
  ],

  "great-expectations": [
    {
      id: "q-de-13",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is Great Expectations and how does it help with data quality?",
      options: [
        "A testing framework for models",
        "A Python library for defining and testing data expectations with automatic documentation",
        "A database migration tool",
        "A visualization library",
      ],
      correctAnswer: 1,
      explanation:
        "Great Expectations (GX) helps: (1) Define expectations (rules) about your data, (2) Validate data against expectations, (3) Generate documentation from expectations, (4) Alert on validation failures. Expectations like 'column values are unique', 'values are between 0 and 100', 'table has at least 1000 rows'.",
      hints: [
        "Great Expectations = data testing + docs",
        "Expectations = assertions about data",
      ],
    },
  ],

  // Topic 5: ML Data Pipelines
  "training-data-pipelines": [
    {
      id: "q-de-14",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What are key considerations for training data pipelines?",
      options: [
        "Only speed matters",
        "Data versioning, reproducibility, point-in-time correctness, and efficient feature extraction",
        "Use the smallest dataset possible",
        "Store everything in CSV",
      ],
      correctAnswer: 1,
      explanation:
        "Training pipeline considerations: (1) Data versioning - track which data trained which model, (2) Reproducibility - same code + data = same model, (3) Point-in-time correctness - features as they existed at training time (prevent data leakage), (4) Efficient feature extraction - don't recompute unchanged features.",
      hints: [
        "Reproducibility is critical for debugging and compliance",
        "Point-in-time prevents future data leakage",
      ],
    },
  ],

  "data-versioning-ml": [
    {
      id: "q-de-15",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is DVC and why use it for ML data versioning?",
      options: [
        "A distributed version control for code",
        "A tool that brings git-like version control to data and ML models",
        "A database connector",
        "A cloud storage service",
      ],
      correctAnswer: 1,
      explanation:
        "DVC (Data Version Control): (1) Version large datasets and models alongside code, (2) Track data lineage - which data produced which model, (3) Reproduce experiments with specific data versions, (4) Store data in cloud storage (S3, GCS) while tracking in git. Works like git but for large files.",
      hints: [
        "DVC = git for data/models",
        "Links code commits to data versions",
      ],
    },
  ],

  // Topic 6: Data Governance
  "data-lineage": [
    {
      id: "q-de-16",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is data lineage and why does it matter for ML?",
      options: [
        "Tracking data file names",
        "Tracking data flow from source through transformations to consumption for debugging and compliance",
        "Encrypting data",
        "Compressing data",
      ],
      correctAnswer: 1,
      explanation:
        "Data lineage tracks: (1) Where data came from (sources), (2) What transformations were applied, (3) Where data flows to (downstream consumers). For ML: (1) Debug model issues by tracing back to data, (2) Impact analysis - if source changes, what models are affected, (3) Compliance - prove data origins.",
      hints: [
        "Lineage = data supply chain map",
        "Critical for debugging and compliance",
      ],
    },
  ],

  "privacy-pipelines": [
    {
      id: "q-de-17",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What techniques protect privacy in ML data pipelines?",
      options: [
        "Only encryption",
        "Anonymization, pseudonymization, differential privacy, and data minimization",
        "Using smaller datasets",
        "Storing data locally",
      ],
      correctAnswer: 1,
      explanation:
        "Privacy techniques: (1) Anonymization - remove PII, (2) Pseudonymization - replace PII with tokens, (3) Differential privacy - add noise to prevent individual identification, (4) Data minimization - collect only what's needed, (5) Federated learning - train on data where it lives. Choose based on threat model and regulations.",
      hints: [
        "Different techniques for different privacy requirements",
        "GDPR/CCPA may require specific approaches",
      ],
    },
  ],
};

registerQuestions(questions);
