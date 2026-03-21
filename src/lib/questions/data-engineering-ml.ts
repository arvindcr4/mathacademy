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
        "First, let's recall the core difference in how each approach handles data transformation.\n\n**Step 1:** In ETL (Extract, Transform, Load), data is transformed in a separate processing engine before being loaded into the destination system.\n\n**Step 2:** In ELT (Extract, Load, Transform), raw data is first loaded into the data warehouse, then transformed there using the warehouse's built-in compute power.\n\n**Step 3:** This makes ELT the preferred approach with modern cloud warehouses like Snowflake and BigQuery, which have powerful native transformation capabilities.\n\nTherefore, the answer is: ETL transforms data before loading; ELT loads raw data first then transforms in the destination.",
      hints: [
        "ETL: transform happens before load; ELT: transform happens after load in the destination",
        "Cloud data warehouses made ELT popular because of their powerful built-in processing",
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
        "First, let's recall the trade-offs between streaming and batch processing approaches.\n\n**Step 1:** Streaming processes data immediately as it arrives, enabling real-time insights like fraud detection, live monitoring, and personalized recommendations.\n\n**Step 2:** Batch processing collects and processes data in scheduled intervals, which is more cost-effective for large-scale analytics, model training, and historical reporting.\n\n**Step 3:** The key deciding factor is latency requirements - choose streaming when you need low-latency (milliseconds) feature serving for ML inference, and batch when throughput matters more than speed.\n\nTherefore, the answer is: When you need real-time insights (fraud detection, monitoring, recommendations) or low-latency feature serving.",
      hints: [
        "Streaming = real-time (fraud detection, monitoring); Batch = large-scale analytics",
        "Most ML training still uses batch because it handles large volumes more cost-effectively",
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
        "First, let's recall the structural differences between Parquet and CSV formats.\n\n**Step 1:** Parquet is a columnar storage format, meaning data is organized by columns rather than rows. This allows reading only the columns you need for your ML features.\n\n**Step 2:** Parquet provides 10-100x better compression than CSV through encoding schemes like run-length encoding and dictionary compression. It also embeds the schema directly in the file.\n\n**Step 3:** Additional benefits include type safety (int, float, string are explicitly stored) and predicate pushdown, which lets query engines skip irrelevant data chunks.\n\nTherefore, the answer is: Parquet is columnar (better compression, faster column reads), typed, and self-describing.",
      hints: [
        "Columnar storage = efficient for analytical queries since you only read needed columns",
        "Compression + types + schema embedded = modern columnar format advantages",
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
        "First, let's recall how partitioning organizes data on disk for efficient access.\n\n**Step 1:** Partitioning splits data into directory structures based on key columns - for example, date=2024-01-01/ or user_id=12345/ - creating a logical organization that mirrors your query patterns.\n\n**Step 2:** When querying partitioned data, the query engine performs partition pruning to only read relevant partitions instead of scanning the entire dataset. This dramatically reduces I/O and speeds up training data retrieval.\n\n**Step 3:** For ML pipelines specifically, partitioning by time (date/month) enables efficient historical data retrieval and supports incremental training workflows.\n\nTherefore, the answer is: Organizing data by key columns (date, user_id) to enable efficient querying of subsets.",
      hints: [
        "Partition by columns you frequently filter on - commonly date for time-series ML data",
        "Partition pruning allows query engines to skip irrelevant data chunks entirely",
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
        "First, let's recall the core problem that workflow orchestration tools solve in data engineering.\n\n**Step 1:** Data pipelines involve multiple tasks with dependencies - Airflow lets you define these dependencies as Directed Acyclic Graphs (DAGs) written in Python code.\n\n**Step 2:** Airflow provides scheduling capabilities (daily, hourly, cron-based), a web UI for monitoring execution, and automatic retry handling for failed tasks.\n\n**Step 3:** It serves as the backbone for data pipeline orchestration, though alternatives like Dagster and Prefect are gaining popularity for their improved developer experience.\n\nTherefore, the answer is: A workflow orchestration platform for authoring, scheduling, and monitoring data pipelines.",
      hints: [
        "Airflow orchestrates tasks (DAGs), it does not process or store data itself",
        "DAGs define task dependencies - Task A must complete before Task B can start",
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
        "First, let's recall what dbt brings to the data engineering toolbox.\n\n**Step 1:** dbt (data build tool) transforms data directly in your data warehouse using SQL, bringing software engineering best practices to SQL workflows.\n\n**Step 2:** Key features include version control (your transformations are code in git), automated testing (define assertions about your data), and auto-generated documentation.\n\n**Step 3:** dbt also handles dependencies between models and supports incremental updates, making it ideal for the Transform step in ELT workflows.\n\nTherefore, the answer is: A transformation framework that uses SQL with version control, testing, and documentation.",
      hints: [
        "dbt = SQL + git + tests + documentation, all working together in the warehouse",
        "dbt runs transformations inside your warehouse, not in a separate processing engine",
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
        "First, let's recall the fundamental difference between Spark and pandas architectures.\n\n**Step 1:** Pandas runs on a single machine and loads data into RAM - it fails when data exceeds available memory. Spark distributes data across multiple nodes in a cluster.\n\n**Step 2:** Spark provides fault tolerance through lineage tracking - if a node fails, Spark recreates lost partitions from other nodes automatically.\n\n**Step 3:** Spark has coordination overhead (task scheduling, data shuffling between nodes), so for data that fits in memory on a single machine, pandas is often faster.\n\nTherefore, the answer is: When data exceeds memory (RAM), needs distributed processing, or requires fault tolerance.",
      hints: [
        "Spark = distributed computing across multiple nodes; pandas = single machine with RAM as limit",
        "Spark's overhead only pays off when you need its distributed processing or fault tolerance capabilities",
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
        "First, let's recall what Kafka is at its core - a distributed log system designed for event streaming.\n\n**Step 1:** Kafka serves as the event streaming backbone, ingesting real-time data from multiple sources (user clicks, transactions, sensor data) and making it available to downstream consumers.\n\n**Step 2:** For ML pipelines specifically, Kafka enables real-time feature computation - user events flow through Kafka to feature pipelines that compute and update feature values.\n\n**Step 3:** Kafka's replay capability is valuable for ML - you can replay historical events to reconstruct training datasets or backfill features for new model versions.\n\nTherefore, the answer is: It's a distributed event streaming platform for real-time data ingestion and feature pipelines.",
      hints: [
        "Kafka = publish/subscribe messaging for events, not a database or processing engine",
        "Kafka decouples producers (applications generating events) from consumers (ML pipelines)",
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
        "First, let's recall the key problems that arise when multiple teams build ML models without a shared feature infrastructure.\n\n**Step 1:** Training-serving skew occurs when the features used during training differ from those used at inference time. A feature store ensures the same feature logic is used in both contexts.\n\n**Step 2:** Feature reuse is enabled by centralizing feature definitions - a feature like user_total_purchases is defined once and can be used by multiple models without reimplementation.\n\n**Step 3:** Feature stores also provide point-in-time correctness for training (historical feature values at the time of label creation) and low-latency serving infrastructure for inference.\n\nTherefore, the answer is: Centralizing feature definitions, preventing training-serving skew, and enabling feature reuse across models.",
      hints: [
        "Feature store = single source of truth for feature definitions across all models",
        "Same feature code for training and inference prevents the training-serving skew problem",
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
        "First, let's recall the two access patterns ML systems have for feature data.\n\n**Step 1:** The offline store provides batch access to historical feature values via SQL queries. This is used during training to create datasets by joining features at the correct point-in-time (preventing data leakage).\n\n**Step 2:** The online store provides low-latency (millisecond) key-value lookups during inference. It typically uses Redis or DynamoDB and only stores the latest feature values.\n\n**Step 3:** The feature store handles synchronization from offline to online - transforming and loading the latest feature values into the low-latency serving layer.\n\nTherefore, the answer is: Online serves precomputed features with low latency (ms) for inference; offline provides batch features for training.",
      hints: [
        "Offline store = training (batch SQL queries for historical point-in-time correctness); Online store = inference (millisecond key-value lookups)",
        "Same feature data flows from offline (training) to online (serving) through automated synchronization",
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
        "First, let's recall the garbage-in-garbage-out principle and its impact on ML systems.\n\n**Step 1:** Bad training data produces bad models - if your training data has incorrect labels or corrupted features, your model learns the wrong patterns.\n\n**Step 2:** Data issues often cause silent failures where outputs look valid but are wrong, making them hard to detect without explicit validation.\n\n**Step 3:** Validation checks include schema verification (correct types, required fields), range checks (age 0-150), uniqueness constraints, and statistical monitoring for drift in feature distributions.\n\nTherefore, the answer is: It catches data issues before they corrupt models or cause silent failures.",
      hints: [
        "Bad data in = bad model out. Validation ensures you catch problems early in the pipeline",
        "Fail fast, fail loud - validation prevents silent data corruption from propagating to model training",
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
        "First, let's recall the six classic dimensions that define data quality.\n\n**Step 1:** Accuracy means values are correct (e.g., a valid email format). Completeness means no critical missing values. Consistency means the same data agrees across systems.\n\n**Step 2:** Timeliness means data is current and up-to-date. Uniqueness means no duplicate records. Validity means data conforms to defined rules and constraints.\n\n**Step 3:** For ML specifically, we add distribution drift as a quality dimension - monitoring whether feature and label distributions have shifted from training to production.\n\nTherefore, the answer is: Accuracy, completeness, consistency, timeliness, uniqueness, and validity.",
      hints: [
        "The six dimensions are often remembered using the acronym ACTCUV (Accuracy, Completeness, Timeliness, Consistency, Uniqueness, Validity)",
        "ML pipelines add a seventh dimension: distribution drift between training and serving data",
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
        "First, let's recall what Great Expectations brings to data engineering workflows.\n\n**Step 1:** Great Expectations (GX) lets you define expectations - declarative rules about what your data should look like, such as column values being unique or falling within a specific range.\n\n**Step 2:** GX validates your data against these expectations and generates automatic documentation describing your data's characteristics and quality.\n\n**Step 3:** When validation fails, GX alerts your team, enabling you to catch data quality issues before they propagate downstream.\n\nTherefore, the answer is: A Python library for defining and testing data expectations with automatic documentation.",
      hints: [
        "Great Expectations = data testing framework with auto-generated documentation",
        "Expectations are assertions about data quality - they document your assumptions and verify them automatically",
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
        "First, let's recall the unique requirements that ML training imposes on data pipelines.\n\n**Step 1:** Data versioning is critical - you must track which dataset version trained which model to enable reproducibility and rollback if issues are discovered.\n\n**Step 2:** Reproducibility means running the same code with the same data produces identical models. This requires careful handling of randomness, deterministic transformations, and data snapshots.\n\n**Step 3:** Point-in-time correctness prevents data leakage - features must reflect values as they existed at the time of label creation, not future values.\n\nTherefore, the answer is: Data versioning, reproducibility, point-in-time correctness, and efficient feature extraction.",
      hints: [
        "Reproducibility is critical for debugging model issues and meeting compliance requirements",
        "Point-in-time correctness ensures features don't accidentally include future information (data leakage)",
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
        "First, let's recall the problem DVC solves - git handles code versioning but struggles with large files and datasets.\n\n**Step 1:** DVC (Data Version Control) brings git-like semantics to data and model files - you can version them, switch between versions, and track which data produced which model.\n\n**Step 2:** DVC stores actual data in cloud storage (S3, GCS, Azure Blob) while keeping lightweight version metadata in git. This gives you versioning without git's size limits.\n\n**Step 3:** DVC also tracks data lineage - which pipeline steps produced which artifacts - enabling full experiment reproducibility.\n\nTherefore, the answer is: A tool that brings git-like version control to data and ML models.",
      hints: [
        "DVC = git for large data files and ML models, with data stored in cloud storage",
        "DVC links your code commits to data versions, enabling reproducibility across experiments",
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
        "First, let's recall what data lineage means in the context of data systems.\n\n**Step 1:** Data lineage traces the complete journey of data - where it originated, what transformations were applied, and where it flows to downstream consumers.\n\n**Step 2:** For ML debugging, lineage enables you to trace a model issue back to its root cause in the data pipeline - which upstream data source introduced anomalies?\n\n**Step 3:** For compliance, lineage provides an audit trail proving data origins and transformations, which is often required by regulations like GDPR.\n\nTherefore, the answer is: Tracking data flow from source through transformations to consumption for debugging and compliance.",
      hints: [
        "Data lineage = data supply chain visibility from source to model input",
        "Critical for impact analysis: if a data source changes, which models does it affect?",
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
        "First, let's recall the various techniques available for protecting privacy in data pipelines.\n\n**Step 1:** Anonymization removes personally identifiable information (PII) entirely. Pseudonymization replaces PII with tokens, allowing correlation without exposing actual identities.\n\n**Step 2:** Differential privacy adds carefully calibrated noise to data or query results, making it mathematically difficult to identify individuals while preserving aggregate patterns.\n\n**Step 3:** Data minimization collects only what's necessary for the task. Federated learning trains models on data where it resides, never exposing raw data.\n\nTherefore, the answer is: Anonymization, pseudonymization, differential privacy, and data minimization.",
      hints: [
        "Different techniques suit different threat models and regulatory requirements (GDPR, CCPA)",
        "Federated learning is an advanced technique where the model travels to data rather than data to a central server",
      ],
    },
  ],
};

registerQuestions(questions);
