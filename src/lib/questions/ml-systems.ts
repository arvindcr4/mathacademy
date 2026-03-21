import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "ml-pipelines": [
    {
      id: "q-mls-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of a Feature Store in an ML pipeline?",
      options: [
        "To store raw training data before preprocessing",
        "To serve precomputed features consistently across training and inference",
        "To version control model weights",
        "To orchestrate distributed training jobs",
      ],
      correctAnswer: 1,
      explanation:
        "A Feature Store centralizes precomputed features so that training and serving use identical transformations, eliminating training-serving skew. Without a feature store, the same feature (e.g., 'user_total_spend_30d') might be computed differently in Python training scripts vs. in the Java serving microservice — the classic skew problem. The feature store ensures both paths read from the same computed values stored in the same storage layer.",
      hints: [
        "Training-serving skew: the same feature computed differently offline (Python) vs. online (Java/Scala) — one of the most common ML production bugs.",
        'The key word is "consistency" — features should be identical in training and serving.',
        "Feast, Tecton, and Hopsworks are production feature stores; they abstract offline (training) and online (serving) feature retrieval.",
      ],
    },
    {
      id: "q-mls-kp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Training-serving skew can occur even when the feature transformation code is identical in both environments.",
      correctAnswer: "true",
      explanation:
        "Skew can arise from differences in data distributions, timing of feature computation, or subtle library version discrepancies — not just code divergence. Example: a feature 'days_since_last_purchase' computed at training time using a warehouse timestamp may differ from serving time due to timezone handling bugs, or different Python/numpy library versions may produce slightly different floating-point results for the same input. The feature 'user_age' may be computed using a birthdate lookup in training but a cached value at serving time.",
      hints: [
        "Code being identical does not guarantee identical outputs — check library versions, data sources, and timing.",
        'Think about time-dependent features: "days since last purchase" is a moving window that differs between training (snapshot) and serving (current state).',
        "Feature stores mitigate this by serving the same precomputed values from a shared store, not recomputing.",
      ],
    },
    {
      id: "q-mls-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a real-time ML pipeline, which component is most critical for ensuring low-latency feature retrieval at inference time?",
      options: [
        "An offline batch feature computation job",
        "An online feature store backed by a low-latency key-value store",
        "A data warehouse with columnar storage",
        "A message queue for streaming events",
      ],
      correctAnswer: 1,
      explanation:
        "Online feature stores use low-latency key-value stores (e.g., Redis ~0.5ms, DynamoDB ~5ms) to serve precomputed features in milliseconds during inference. Inference latency budgets are typically 50-100ms total — a data warehouse query (seconds) is incompatible. Redis stores precomputed feature vectors; at request time, the serving layer fetches features by entity key (e.g., user_id) and passes them to the model. The offline batch job computes features; the online store serves them.",
      hints: [
        "Inference latency budgets are typically in the tens of milliseconds — a SQL query to BigQuery (seconds) is not acceptable.",
        "Key-value stores (Redis, DynamoDB) are optimized for single-key lookups, not analytical scans.",
        "The architecture: offline computation → materialization to online store → low-latency retrieval at inference time.",
      ],
    },
  ],

  "data-versioning": [
    {
      id: "q-mls-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does DVC (Data Version Control) primarily track?",
      options: [
        "Model hyperparameters and metrics",
        "Large data files and ML pipeline stages using Git-compatible metadata",
        "Real-time data streams from Kafka topics",
        "GPU utilization during training runs",
      ],
      correctAnswer: 1,
      explanation:
        "DVC stores lightweight `.dvc` pointer files in Git while keeping large data files in remote storage, enabling reproducible data versioning without bloating Git.",
      hints: [
        "Git itself is not designed for large binary files — DVC solves this limitation.",
        "DVC files are small text pointers; the actual data lives elsewhere.",
      ],
    },
    {
      id: "q-mls-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Delta Lake\'s ACID transaction support allows concurrent readers and writers on the same table without data corruption.",
      correctAnswer: "true",
      explanation:
        "Delta Lake uses optimistic concurrency control and a transaction log to provide ACID guarantees, enabling safe concurrent reads and writes on object storage.",
      hints: [
        "Object storage like S3 doesn\'t natively support transactions — Delta Lake adds this layer.",
        "ACID stands for Atomicity, Consistency, Isolation, Durability.",
      ],
    },
    {
      id: "q-mls-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which Delta Lake feature enables querying a dataset as it appeared at a specific past point in time?",
      options: [
        "Schema evolution",
        "Z-ordering",
        "Time travel",
        "Bloom filter indexing",
      ],
      correctAnswer: 2,
      explanation:
        "Delta Lake\'s time travel feature uses the transaction log to reconstruct any historical version of a table, which is invaluable for reproducing past ML training datasets.",
      hints: [
        "Reproducibility requires being able to retrieve the exact data used for a previous training run.",
        "The feature name is quite literal — you\'re traveling back to a past state.",
      ],
    },
  ],

  "experiment-tracking": [
    {
      id: "q-mls-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which of the following is NOT typically tracked by MLflow in an experiment run?",
      options: [
        "Hyperparameters",
        "Evaluation metrics",
        "Training data row-level labels",
        "Artifact files such as model weights",
      ],
      correctAnswer: 2,
      explanation:
        "MLflow tracks parameters, metrics, tags, and artifacts — but not individual data labels. Dataset versioning is handled separately, e.g., via DVC or dataset hashing.",
      hints: [
        "MLflow is about tracking the experiment configuration and outputs, not raw data contents.",
        "Row-level data belongs in a data versioning or lineage system.",
      ],
    },
    {
      id: "q-mls-kp3-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Weights & Biases (W&B) can automatically log gradients and model topology without any additional code beyond `wandb.init()`.",
      correctAnswer: "false",
      explanation:
        "Automatic gradient and topology logging requires calling `wandb.watch(model)` explicitly; `wandb.init()` alone only sets up the run context.",
      hints: [
        "Automatic logging of specific model internals usually requires a dedicated call.",
        "Read W&B docs carefully — initialization and watching are two separate steps.",
      ],
    },
    {
      id: "q-mls-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When comparing two MLflow runs with identical hyperparameters but different metrics, what is the most likely cause?",
      options: [
        "The MLflow tracking server is misconfigured",
        "Non-determinism from random seeds, hardware, or data ordering",
        "The model architecture was changed between runs",
        "The learning rate was logged incorrectly",
      ],
      correctAnswer: 1,
      explanation:
        "Even with identical hyperparameters, non-determinism from random initialization, CUDA operations, or data shuffling can produce different metrics across runs.",
      hints: [
        "True reproducibility requires fixing random seeds AND controlling hardware-level non-determinism.",
        "GPU operations like cuDNN convolutions can be non-deterministic by default.",
      ],
    },
  ],

  "model-serving": [
    {
      id: "q-mls-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the main advantage of gRPC over REST for model serving in high-throughput systems?",
      options: [
        "gRPC uses JSON for easier human readability",
        "gRPC uses HTTP/2 and binary Protocol Buffers for lower latency and higher throughput",
        "gRPC is easier to test with web browsers",
        "gRPC supports more programming languages than REST",
      ],
      correctAnswer: 1,
      explanation:
        "gRPC leverages HTTP/2 multiplexing and Protobuf binary serialization, resulting in significantly lower latency and higher throughput than REST/JSON for structured data. A 1 KB JSON payload serializes to ~200 bytes in Protobuf (5x smaller), reducing I/O overhead. HTTP/2 multiplexing allows 50,000 RPS to share a small pool of TCP connections instead of opening a new connection per request. At p99 < 5 ms latency targets, these efficiencies are critical — JSON serialization alone can consume 1-2 ms at high QPS.",
      hints: [
        "Binary serialization is 5-10x smaller than JSON — less I/O at the same throughput.",
        "HTTP/2 multiplexing eliminates head-of-line blocking that plagues HTTP/1.1 at high concurrency.",
        "For internal microservices at >10K RPS, gRPC's Protocol Buffers are the de facto standard.",
      ],
    },
    {
      id: "q-mls-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "NVIDIA Triton Inference Server can serve models from multiple frameworks (TensorFlow, PyTorch, ONNX) simultaneously on the same server instance.",
      correctAnswer: "true",
      explanation:
        "Triton\'s backend architecture allows multiple framework backends to coexist, enabling a single deployment to host models from different frameworks simultaneously. Each backend (TensorFlow, PyTorch, ONNX Runtime) is a separate plugin that Triton manages. This is critical for organizations migrating between frameworks: a team can run TensorFlow models alongside PyTorch models during a transition period without separate infrastructure.",
      hints: [
        "Triton was designed for heterogeneous model deployment scenarios.",
        'Think about what "backend" means in the context of Triton\'s architecture.',
        "A single Triton instance can serve a PyTorch BERT model alongside a TensorFlow ResNet — useful during framework migrations.",
      ],
    },
    {
      id: "q-mls-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Triton Inference Server, what is the purpose of dynamic batching?",
      options: [
        "To automatically resize model input tensors at runtime",
        "To group multiple inference requests into a single batch to maximize GPU utilization",
        "To distribute a single large model across multiple GPUs",
        "To enable A/B testing between two model versions",
      ],
      correctAnswer: 1,
      explanation:
        "Dynamic batching collects individual client requests arriving within a configurable time window (e.g., 100 ms) and merges them into a single batch for GPU processing. Without batching, a single-request GPU kernel launch (1-2 ms overhead) dominates inference time for small inputs. With dynamic batching of 32 samples, the kernel launch overhead is amortized across 32 samples. Example: single request inference = 5 ms (mostly kernel launch overhead); batch of 32 = 15 ms total (0.47 ms per sample). That's a 10x per-sample throughput improvement with minimal latency impact on individual requests.",
      hints: [
        "GPUs are most efficient when processing many samples in parallel — a single sample leaves thousands of CUDA cores idle.",
        "Dynamic batching solves the tension between low latency (small batches) and high throughput (large batches).",
        "Triton's dynamic batcher waits up to the configured window duration before executing — balancing latency vs. batch size.",
      ],
    },
  ],

  "model-registry": [
    {
      id: "q-mls-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What lifecycle stage is typically NOT part of an MLflow Model Registry workflow?",
      options: ["Staging", "Production", "Archived", "Deleted"],
      correctAnswer: 3,
      explanation:
        "MLflow Model Registry uses Staging, Production, and Archived stages. Models are Archived (not Deleted) to preserve audit history and reproducibility. Audit trails matter for compliance: a regulator may ask 'what model was in production on March 15, 2023?' — Archived models answer this. Deleting a model destroys this evidence and makes incident reconstruction impossible.",
      hints: [
        "Audit trails require that historical model versions remain accessible — Archived preserves them.",
        "MLflow stages represent deployment readiness, not deletion — Deleted is not a stage.",
        "In regulated industries (finance, healthcare), model deletion may also violate record-keeping requirements.",
      ],
    },
    {
      id: "q-mls-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A model registry should store model binaries directly in the same database as its metadata.",
      correctAnswer: "false",
      explanation:
        "Best practice is to store model artifacts in object storage (e.g., S3, GCS) and keep only references (URIs) in the metadata database, keeping the registry lightweight and scalable. A model binary (10 MB to 10 GB) stored as a BLOB in a relational database causes: (1) database bloat, (2) slow backup/restore, (3) connection pool exhaustion. Object storage is designed for large binary objects with built-in versioning, replication, and lifecycle policies.",
      hints: [
        "Model files can be gigabytes — databases are optimized for structured data, not large binary blobs.",
        "Separation of concerns: metadata in a database (fast queries), binaries in object storage (fast retrieval of large files).",
        "S3 versioning + MLflow's artifact URI tracking = complete model lineage.",
      ],
    },
    {
      id: "q-mls-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which versioning strategy best supports rolling back a production model quickly when a regression is detected?",
      options: [
        "Overwriting the production model file in place",
        "Maintaining immutable versioned artifacts and updating a registry alias to point to a previous version",
        "Retraining the model from scratch with the previous dataset",
        "Updating the model\'s hyperparameter config file",
      ],
      correctAnswer: 1,
      explanation:
        "Immutable versioned artifacts combined with a pointer/alias system (e.g., MLflow's 'Production' alias) allow instant rollback by redirecting the alias to a previously validated version without any retraining. Example: v23 (broken) is in production; rollback = update 'Production' alias from v23 to v22 (takes seconds). Overwriting in place destroys v23, making forward recovery impossible. Retraining from scratch is slow and may not reproduce the same weights due to randomness.",
      hints: [
        "Rollback speed is critical — instant redirection via alias vs. minutes/hours of retraining.",
        "Immutability guarantees you can always return to an exact prior state without reconstruction.",
        "MLflow's alias system: 'Production' alias → v22. To rollback: set_alias('Production', 'v22'). Done.",
      ],
    },
  ],

  "distributed-training": [
    {
      id: "q-mls-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In PyTorch\'s Distributed Data Parallel (DDP), how are gradients synchronized across GPU workers?",
      options: [
        "A central parameter server collects and broadcasts gradients",
        "All-reduce operations average gradients across all workers after each backward pass",
        "Each worker keeps independent gradients and syncs only at epoch boundaries",
        "The master GPU accumulates all gradients and pushes updates",
      ],
      correctAnswer: 1,
      explanation:
        "DDP uses ring all-reduce to average gradients across all workers after each backward pass, ensuring all replicas stay synchronized without a central bottleneck.",
      hints: [
        "DDP is designed to avoid single points of failure — no central server.",
        "Ring all-reduce is a collective communication primitive where every node both sends and receives.",
      ],
    },
    {
      id: "q-mls-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Fully Sharded Data Parallel (FSDP) shards optimizer states, gradients, AND model parameters across GPUs, unlike DDP which only replicates them.",
      correctAnswer: "true",
      explanation:
        "FSDP shards all three components (parameters, gradients, optimizer states) to fit larger models in aggregate GPU memory, whereas DDP holds a full replica on each GPU.",
      hints: [
        "DDP requires each GPU to hold a full model copy — what happens when the model is too large?",
        '"Fully sharded" means every component of training state is distributed.',
      ],
    },
    {
      id: "q-mls-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DeepSpeed ZeRO Stage 3 reduces memory usage per GPU by sharding:",
      options: [
        "Only the optimizer states",
        "Optimizer states and gradients, but not parameters",
        "Optimizer states, gradients, and model parameters",
        "Only the model parameters",
      ],
      correctAnswer: 2,
      explanation:
        "ZeRO Stage 3 shards all three: optimizer states (Stage 1), gradients (Stage 2), and parameters (Stage 3), achieving near-linear memory reduction proportional to the number of GPUs.",
      hints: [
        "ZeRO stages are cumulative — each stage adds more sharding on top of the previous.",
        "Stage 3 is the most aggressive: if N GPUs are used, each holds ~1/N of every component.",
      ],
    },
  ],

  "gpu-memory-optimization": [
    {
      id: "q-mls-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does gradient checkpointing trade to reduce GPU memory usage during training?",
      options: [
        "Gradient precision for memory savings",
        "Recomputation time for reduced activation memory",
        "Batch size for reduced gradient size",
        "Model accuracy for faster training",
      ],
      correctAnswer: 1,
      explanation:
        "Gradient checkpointing discards intermediate activations during the forward pass and recomputes them during backpropagation, trading extra compute (roughly 33% overhead) for significantly less activation memory.",
      hints: [
        "Memory and compute are often interchangeable resources in ML training.",
        "Activations stored for backprop can dominate memory usage for deep networks.",
      ],
    },
    {
      id: "q-mls-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CPU offloading in DeepSpeed moves optimizer states to CPU RAM during the optimizer step, reducing GPU memory pressure.",
      correctAnswer: "true",
      explanation:
        "DeepSpeed\'s CPU offloading (ZeRO-Offload) moves optimizer states and gradients to CPU memory, allowing training of models that far exceed GPU VRAM capacity at the cost of PCIe bandwidth.",
      hints: [
        "CPU RAM is much larger but slower than GPU VRAM — the trade-off is bandwidth.",
        "Optimizer states (e.g., Adam\'s m and v tensors) can be 2x the model size.",
      ],
    },
    {
      id: "q-mls-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When training a large model with mixed precision (FP16/BF16), why must a master copy of weights be kept in FP32?",
      options: [
        "FP16 cannot represent negative numbers accurately",
        "Gradient updates are too small for FP16 precision, causing underflow and weight stagnation",
        "FP32 is required for CUDA kernel compatibility",
        "The loss function must be computed in FP32 for correctness",
      ],
      correctAnswer: 1,
      explanation:
        "Small gradient values can underflow to zero in FP16 due to its limited dynamic range, so weight updates are applied to an FP32 master copy to preserve training stability.",
      hints: [
        "FP16 has a dynamic range of ~6 orders of magnitude; FP32 has ~38.",
        "Even tiny gradients must produce measurable weight changes to converge.",
      ],
    },
  ],

  "inference-optimization": [
    {
      id: "q-mls-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does the ONNX format provide for ML model deployment?",
      options: [
        "A cloud-native container format for model serving",
        "A framework-agnostic intermediate representation enabling cross-runtime inference",
        "A compressed binary format that reduces model size automatically",
        "A real-time training protocol for online learning",
      ],
      correctAnswer: 1,
      explanation:
        "ONNX (Open Neural Network Exchange) is an open standard representing ML models as a computation graph, decoupling the training framework from the inference runtime. You can train in PyTorch and deploy on TensorRT, CoreML, or ONNX Runtime without rewriting model code. The graph is hardware-agnostic; each runtime optimizes for its target (e.g., TensorRT compiles ONNX to optimized CUDA kernels for NVIDIA GPUs).",
      hints: [
        'ONNX = "Open Neural Network Exchange" — portability between frameworks is the core value proposition.',
        "ONNX Runtime is NOT the same as PyTorch or TensorFlow — it's a dedicated inference runtime that ingests the ONNX graph.",
        "You can serve the same ONNX model on NVIDIA GPUs (via TensorRT), CPUs, and edge devices without changing the model.",
      ],
    },
    {
      id: "q-mls-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "TensorRT\'s kernel fusion optimization merges multiple sequential operations into a single GPU kernel, reducing memory bandwidth consumption.",
      correctAnswer: "true",
      explanation:
        "Kernel fusion eliminates intermediate memory round-trips between GPU compute and VRAM for sequential ops (e.g., Conv → BatchNorm → ReLU becomes a single fused kernel). Without fusion: each op writes its output to VRAM, then the next op reads it back — 3 separate kernel launches and 3 VRAM round-trips. With fusion: one kernel launch, one VRAM round-trip. For a typical CNN, this reduces latency by 30-50% and memory bandwidth by 2-3x.",
      hints: [
        "Each separate kernel launch = one write + one read from VRAM. Fusion eliminates intermediate round-trips.",
        "Memory bandwidth is often the bottleneck for modern GPUs, not raw FLOPs — fusion directly attacks this bottleneck.",
        "TensorRT's layer fusion is the canonical example: Fused Conv+BatchNorm+ReLU as a single CUDA kernel.",
      ],
    },
    {
      id: "q-mls-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "vLLM\'s PagedAttention improves LLM inference throughput primarily by:",
      options: [
        "Quantizing the KV cache to INT4",
        "Managing the KV cache in non-contiguous memory pages to eliminate fragmentation and enable better batching",
        "Using a speculative decoding draft model for all requests",
        "Distributing attention heads across multiple GPUs",
      ],
      correctAnswer: 1,
      explanation:
        "PagedAttention stores KV cache in fixed-size, non-contiguous memory pages (inspired by OS virtual memory), dramatically reducing fragmentation and enabling higher concurrent batch sizes. Standard allocation: reserve max_seq_len × n_layers × KV_size per request (e.g., 8192 tokens × 80 layers × 2 × 128 = 16.8 GB) even if the request is only 100 tokens long. PagedAttention: allocate 16-token pages on-demand, return them to the pool when done. This achieves >90% GPU memory utilization vs. 60-70% with standard allocation, enabling 2-4x higher batch sizes and throughput.",
      hints: [
        "Traditional KV cache pre-allocates max_seq_length per request — catastrophic fragmentation when sequences are short.",
        "OS virtual memory pages (4KB) inspired PagedAttention's 16-token cache blocks.",
        "Higher batch size = more samples processed per GPU kernel launch = higher throughput.",
      ],
    },
  ],

  "monitoring-ml": [
    {
      id: "q-mls-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What type of drift occurs when the statistical distribution of input features changes over time, even if the underlying relationship between features and labels stays the same?",
      options: [
        "Concept drift",
        "Data drift (covariate shift)",
        "Label drift",
        "Model drift",
      ],
      correctAnswer: 1,
      explanation:
        "Data drift (covariate shift) is when P(X) changes while P(Y|X) remains stable — the input distribution shifts but the relationship between features and labels is unchanged. Concept drift is when P(Y|X) itself changes — the underlying phenomenon the model learned changes. Example: during COVID, user spending patterns (P(X)) shifted but the relationship between spending and fraud (P(Y|X)) may have remained similar — data drift, not concept drift.",
      hints: [
        "The key question: did the feature distribution change, or did the feature-to-label relationship change?",
        "P(X) = input distribution; P(Y|X) = conditional label distribution given inputs.",
        "A retailer's user demographics shifting from young to older is data drift; fraudsters changing tactics is concept drift.",
      ],
    },
    {
      id: "q-mls-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The Population Stability Index (PSI) can detect distribution drift even when ground-truth labels are unavailable.",
      correctAnswer: "true",
      explanation:
        "PSI compares feature distributions between a reference dataset and current predictions using only the feature values, making it label-free and practical for online monitoring. PSI formula: $\\text{PSI} = \\sum_{i=1}^{n} (A_i - E_i) \\times \\ln(A_i / E_i)$ where $A_i$ is actual % and $E_i$ is expected % in bin $i$. Standard thresholds: PSI < 0.1 = no action, 0.1-0.25 = investigate, > 0.25 = significant drift requiring model retraining. PSI = 0 means identical distributions; PSI → ∞ means completely disjoint distributions.",
      hints: [
        "PSI = 0 means identical distributions; PSI = infinity means completely disjoint distributions.",
        "PSI > 0.25 on a key feature (e.g., transaction_amount, user_age) should page the on-call ML engineer.",
        "PSI is label-free because it only compares feature distributions — no labels needed.",
      ],
    },
    {
      id: "q-mls-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which monitoring approach is most appropriate for detecting concept drift in a classification model when labels arrive with a 30-day delay?",
      options: [
        "Monitor real-time prediction confidence scores and flag when average confidence drops significantly",
        "Wait 30 days, compute accuracy, and retrain if accuracy falls below threshold",
        "Use input feature distribution monitoring (PSI/KL divergence) as a leading indicator",
        "A and C together as complementary signals",
      ],
      correctAnswer: 3,
      explanation:
        "Using both confidence score monitoring and feature distribution drift as leading indicators provides early warning before labels arrive, enabling proactive retraining decisions. Confidence drop (e.g., average predicted probability shifting from 0.72 to 0.55) often precedes measurable accuracy drops because the model starts encountering unfamiliar patterns before accuracy formally degrades. PSI/KL divergence on input features catches covariate shifts that may eventually cause concept drift. Neither signal alone is sufficient — combining them is the mature monitoring strategy.",
      hints: [
        "No single signal is sufficient; combining leading indicators is best practice.",
        "A drop in model confidence often precedes a measurable accuracy drop by days or weeks.",
        "PSI detects data drift (P(X) change); confidence monitoring detects when the model starts seeing unfamiliar patterns.",
      ],
    },
  ],

  "data-quality": [
    {
      id: "q-mls-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'In Great Expectations, what is an "Expectation Suite"?',
      options: [
        "A CI/CD pipeline configuration for data validation",
        "A named collection of expectations that define the expected properties of a dataset",
        "A set of SQL queries for cleaning data",
        "A dashboard for visualizing data quality metrics",
      ],
      correctAnswer: 1,
      explanation:
        "An Expectation Suite is a named, versioned collection of expectations (assertions about data) that can be run against a batch of data to validate quality.",
      hints: [
        '"Suite" implies a grouped collection — think of it like a test suite in software testing.',
        "Great Expectations is essentially unit testing for data.",
      ],
    },
    {
      id: "q-mls-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Data validation should ideally be performed both at data ingestion time and immediately before model training to catch issues introduced during preprocessing.",
      correctAnswer: "true",
      explanation:
        "Validating at ingestion catches upstream issues while validating pre-training catches bugs introduced during feature engineering and preprocessing transformations.",
      hints: [
        "Bugs can be introduced at multiple stages — ingestion bugs and preprocessing bugs are different.",
        "Defense in depth applies to data pipelines, not just security systems.",
      ],
    },
    {
      id: "q-mls-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When a Great Expectations validation run fails in a production data pipeline, what is the recommended course of action?",
      options: [
        "Log the failure and continue processing to avoid pipeline downtime",
        "Halt the pipeline, quarantine the failing data batch, and alert on-call engineers",
        "Automatically correct the failing records using imputation",
        "Retrain the model on the new data distribution",
      ],
      correctAnswer: 1,
      explanation:
        "Failing validation should stop the pipeline immediately; proceeding would propagate bad data downstream, potentially corrupting model training or serving. Quarantine and alert preserves data integrity.",
      hints: [
        "Garbage in, garbage out — invalid data must never reach training or serving.",
        "The cost of stopping is lower than the cost of propagating corrupted data.",
      ],
    },
  ],

  "feature-engineering": [
    {
      id: "q-mls-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which Apache Spark operation is most efficient for applying a custom feature transformation function to each row of a large dataset?",
      options: [
        "collect() followed by a Python loop",
        "A User-Defined Function (UDF) applied with DataFrame.withColumn()",
        "Pandas apply() after converting to a Pandas DataFrame",
        "A nested for loop in PySpark",
      ],
      correctAnswer: 1,
      explanation:
        "Spark UDFs run in the distributed Spark execution engine, preserving parallelism. Collecting to the driver or converting to Pandas defeats distributed processing and risks OOM errors.",
      hints: [
        "Any operation that moves data to a single machine breaks distributed processing.",
        "Spark is designed to push computation to where the data lives.",
      ],
    },
    {
      id: "q-mls-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Target encoding a categorical feature on the full training set (before cross-validation splits) leads to target leakage.",
      correctAnswer: "true",
      explanation:
        "Computing target encoding statistics using the full dataset — including validation folds — allows the model to indirectly see validation labels during training, inflating performance estimates.",
      hints: [
        "Any statistics derived from labels must be computed strictly within each training fold.",
        "Cross-validation assumes strict separation between training and validation data.",
      ],
    },
    {
      id: "q-mls-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When engineering features for a time-series prediction task, which practice is essential to prevent data leakage?",
      options: [
        "Normalizing all features to zero mean and unit variance",
        "Computing rolling statistics (e.g., 7-day average) using only data from past timestamps relative to the prediction point",
        "Including future price data to improve feature correlation",
        "Using random train-test splits to ensure data diversity",
      ],
      correctAnswer: 1,
      explanation:
        "Time-series features must only use information available at or before the prediction timestamp. Future data in features and random (non-temporal) splits both cause leakage.",
      hints: [
        "In production, only historical data is available at the time of prediction.",
        "Rolling windows must always look backward, never forward.",
      ],
    },
  ],

  "batch-vs-realtime": [
    {
      id: "q-mls-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which inference pattern is most appropriate for generating daily product recommendations for all users in a catalog?",
      options: [
        "Real-time inference with sub-100ms latency requirements",
        "Batch inference run offline, with results cached for serving",
        "Streaming inference triggered per user event",
        "Synchronous gRPC inference at request time",
      ],
      correctAnswer: 1,
      explanation:
        "Daily batch recommendations can be precomputed offline for all users and cached, avoiding real-time model latency while enabling complex, compute-intensive models. Example: Netflix recommends rows of 20 movies per user — computing this for 200M users with a complex model takes hours but can run overnight. The results are stored in a fast key-value store (e.g., Redis) for sub-millisecond serving when users open the app. Staleness of ~24 hours is acceptable for daily recommendations.",
      hints: [
        "If results can be precomputed ahead of time, batch is almost always more efficient — complex models, no latency constraints.",
        "Daily granularity means staleness of a few hours is acceptable for non-urgent use cases.",
        "Batch inference + cached results = best of both worlds: complex model computation + low-latency serving.",
      ],
    },
    {
      id: "q-mls-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Real-time inference always produces fresher predictions than batch inference.",
      correctAnswer: "true",
      explanation:
        "Real-time inference uses the latest available features at request time (e.g., current cart contents, today's browsing history), while batch inference uses features as of the last batch run (e.g., last night's snapshot). For rapidly changing signals (stock prices, breaking news relevance, current inventory), this freshness difference is critical. The trade-off: real-time inference requires low-latency feature retrieval infrastructure.",
      hints: [
        "Batch predictions are computed at a fixed schedule and may be hours or days old by the time they're served.",
        "Freshness is one of the core trade-offs: batch = stale but cheap; real-time = fresh but requires live feature infrastructure.",
        "Real-time inference is necessary when the features themselves change between batch runs (e.g., inventory levels, current location).",
      ],
    },
    {
      id: "q-mls-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A fraud detection system requires decisions within 200ms and must use features computed from the last 10 transactions. Which architecture is most appropriate?",
      options: [
        "Batch inference with nightly model scoring",
        "Streaming feature computation (e.g., Flink) feeding an online feature store, with real-time inference",
        "A Spark batch job triggered on every transaction",
        "Precomputed features refreshed hourly from a data warehouse",
      ],
      correctAnswer: 1,
      explanation:
        "Fraud detection requires real-time features (last N transactions) and low-latency decisions. The architecture: Apache Flink maintains a sliding window of the last 10 transactions per card_id, continuously updated as new transactions arrive via Kafka. These rolling counts are materialized to Redis (~0.5ms read latency). At inference time (triggered by an authorization request), the model fetches features from Redis and runs inference — total latency <200ms. A data warehouse refresh (hourly or nightly) is too stale for fraud detection.",
      hints: [
        "The 200ms SLA rules out any batch approach — batch jobs take minutes to hours.",
        'Features derived from "the last 10 transactions" are time-series features that must be updated continuously, not periodically.',
        "Kafka + Flink + Redis is the standard stack for real-time feature engineering in production ML.",
      ],
    },
  ],

  "ml-testing": [
    {
      id: "q-mls-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the purpose of a shadow deployment in ML testing?",
      options: [
        "To serve a new model to a small percentage of real users",
        "To run a new model on live traffic in parallel with the production model, comparing outputs without affecting users",
        "To test a model on historical data before deployment",
        "To roll back a model when performance degrades",
      ],
      correctAnswer: 1,
      explanation:
        "Shadow deployments mirror real production traffic to the new model without serving its predictions, allowing safe evaluation of behavior on real data without user impact.",
      hints: [
        'The word "shadow" implies the new model runs invisibly alongside the production model.',
        "User impact must be zero during shadow testing.",
      ],
    },
    {
      id: "q-mls-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Integration tests for ML pipelines should verify that the full training pipeline produces a model with performance above a minimum threshold on a held-out dataset.",
      correctAnswer: "true",
      explanation:
        "ML integration tests should go beyond code correctness to verify end-to-end pipeline behavior, including that the output model meets minimum performance criteria on a validation set.",
      hints: [
        "A pipeline that runs without errors but produces a random model is still broken.",
        "Performance thresholds act as acceptance criteria for the integration test.",
      ],
    },
    {
      id: "q-mls-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which type of ML test is specifically designed to detect the case where a model performs well on average but fails on important data subgroups?",
      options: [
        "Unit test on model components",
        "Behavioral / slice-based testing",
        "Load testing under concurrent requests",
        "Adversarial robustness testing",
      ],
      correctAnswer: 1,
      explanation:
        "Slice-based testing evaluates model performance on specific data subgroups (e.g., by demographic, geographic region, or input type) to surface disparate performance hidden by aggregate metrics.",
      hints: [
        "Average accuracy can hide poor performance on minority subgroups.",
        "Fairness analysis relies heavily on this type of evaluation.",
      ],
    },
  ],

  "ab-testing-ml": [
    {
      id: "q-mls-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In an A/B test for ML models, what does the p-value represent?",
      options: [
        "The probability that model A is better than model B",
        "The probability of observing the measured difference (or larger) if there is actually no difference between models",
        "The percentage of users assigned to the treatment group",
        "The statistical power of the experiment",
      ],
      correctAnswer: 1,
      explanation:
        "The p-value is the probability of observing the measured effect size or larger under the null hypothesis (no true difference), not the probability that one model is better.",
      hints: [
        "A p-value is about the data, not a direct statement about the hypothesis being true.",
        "The null hypothesis assumes no real difference between A and B.",
      ],
    },
    {
      id: "q-mls-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Stopping an A/B test early as soon as statistical significance is reached (p < 0.05) is a valid and recommended practice.",
      correctAnswer: "false",
      explanation:
        "Early stopping inflates the false positive rate because peeking at results repeatedly increases the chance of spuriously crossing the significance threshold; pre-specified sample sizes and testing durations must be respected.",
      hints: [
        'Each "peek" at interim results is an additional hypothesis test, inflating Type I error.',
        "Sequential testing methods exist to handle early stopping correctly.",
      ],
    },
    {
      id: "q-mls-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When running an A/B test across a recommendation system, why is user-level randomization preferred over page-view-level randomization?",
      options: [
        "User-level randomization produces larger sample sizes",
        "Page-view randomization violates the stable unit treatment value assumption (SUTVA) by exposing the same user to both variants",
        "User-level randomization is easier to implement technically",
        "Page-view randomization introduces selection bias in the control group",
      ],
      correctAnswer: 1,
      explanation:
        "SUTVA requires that each unit receives only one treatment. If the same user sees both A and B across different page views, their behavior in one variant contaminates the other, violating independence.",
      hints: [
        "A user who sees both variants cannot be considered an independent observation for either.",
        'SUTVA is the "no interference" assumption — units must not affect each other.',
      ],
    },
  ],

  "canary-deployment": [
    {
      id: "q-mls-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a canaryary deployment, what percentage of traffic is typically sent to the new model version initially?",
      options: [
        "50%",
        "100%",
        "A small percentage, typically 1–5%",
        "0% (canary is only for offline evaluation)",
      ],
      correctAnswer: 2,
      explanation:
        "Canary deployments start by routing a small traffic slice (1–5%) to the new version, limiting blast radius if issues arise before gradually increasing traffic as confidence grows. Standard progression: 1% → 5% → 20% → 50% → 100%, with monitoring gates at each stage. The 1% initial slice is chosen to be large enough for statistical significance (at 1M DAU, 1% = 10K users) but small enough to limit user impact if the canary fails.",
      hints: [
        "The goal is to limit exposure to potential failures — the canary's job is to catch regressions before they affect all users.",
        '"Canary in a coal mine" — a small sentinel exposed first to detect danger.',
        "At 10M DAU, 1% canary = 100K users. If the canary fails, 100K users are affected vs. 10M if full rollout.",
      ],
    },
    {
      id: "q-mls-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A shadow deployment and a canary deployment both expose real users to the new model\'s predictions.",
      correctAnswer: "false",
      explanation:
        "Shadow deployments run the new model in parallel but serve only the production model's predictions to users — zero user impact. Canary deployments actually serve the new model's predictions to a small user subset (1-5%) — real exposure, real feedback. Shadow is for validation; canary is for live testing with real user behavior as the metric.",
      hints: [
        "Shadow = the new model runs invisibly alongside the champion. User sees champion predictions only.",
        "Canary = a small % of users see challenger predictions. Real behavior, real metrics.",
        "Use shadow first (zero risk), then canary (small risk) for a phased evaluation.",
      ],
    },
    {
      id: "q-mls-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What automated mechanism should trigger an immediate rollback during a canary deployment?",
      options: [
        "A fixed timer that rolls back after 24 hours regardless of metrics",
        "Monitoring of business KPIs and error rates with automatic rollback when thresholds are breached",
        "Manual code review of the new model\'s source code",
        "A/B test statistical significance reaching p < 0.05",
      ],
      correctAnswer: 1,
      explanation:
        "Automated canary analysis (ACA) monitors real-time error rates, latency, and business metrics (conversion, fraud recall); when any exceed defined thresholds (e.g., error rate > 1%, p99 latency > 200ms, revenue per user drops > 2%), an automated rollback fires without human intervention to minimize blast radius. Tools like Argo Rollouts and Flagger implement automated canary analysis with configurable metrics and rollback policies. Fixed timers are dangerous: a broken canary can cause 24 hours of user harm.",
      hints: [
        "Manual processes are too slow when production is degraded — automated rollback fires in seconds.",
        "The rollback trigger must be based on observable signals (error rate, latency) that indicate user harm, not arbitrary time.",
        "Configure rollback thresholds before deployment: what error rate is unacceptable? What latency threshold? Get stakeholder agreement.",
      ],
    },
  ],

  "model-compression": [
    {
      id: "q-mls-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the goal of knowledge distillation in model compression?",
      options: [
        "To convert model weights from FP32 to INT8",
        "To train a smaller student model to mimic the output distribution of a larger teacher model",
        "To prune redundant neurons from a neural network",
        "To decompose weight matrices using SVD",
      ],
      correctAnswer: 1,
      explanation:
        'Knowledge distillation trains a compact student model on the soft probability outputs ("dark knowledge") of a larger teacher, transferring generalization capability beyond hard labels.',
      hints: [
        "The teacher\'s soft probabilities contain more information than one-hot labels.",
        'The student learns the teacher\'s "reasoning pattern", not just its answers.',
      ],
    },
    {
      id: "q-mls-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Post-training quantization to INT8 typically requires no retraining and can be applied directly to a pretrained model.",
      correctAnswer: "true",
      explanation:
        "Post-training quantization calibrates scale factors using a small calibration dataset without gradient-based retraining, though quantization-aware training generally achieves better accuracy.",
      hints: [
        '"Post-training" is the key — it happens after training is complete.',
        "Calibration data is used to determine quantization ranges, not to update weights.",
      ],
    },
    {
      id: "q-mls-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Structured pruning is preferred over unstructured pruning for production deployment because:",
      options: [
        "Structured pruning achieves higher sparsity ratios",
        "Structured pruning removes entire neurons/channels/heads, producing dense tensors compatible with GPU hardware",
        "Unstructured pruning requires retraining from scratch",
        "Structured pruning has no impact on model accuracy",
      ],
      correctAnswer: 1,
      explanation:
        "Unstructured (weight-level) sparsity requires specialized sparse hardware to realize speedups; structured pruning removes entire computational units (channels, heads), yielding dense subnetworks that run efficiently on standard GPUs.",
      hints: [
        "GPUs are optimized for dense matrix operations, not arbitrary sparse patterns.",
        '"Structured" means whole computational blocks are removed, not random individual weights.',
      ],
    },
  ],

  "cost-optimization": [
    {
      id: "q-mls-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary risk of using AWS EC2 Spot Instances for ML training?",
      options: [
        "Spot Instances have lower GPU memory than On-Demand instances",
        "Spot Instances can be interrupted with a 2-minute warning when capacity is reclaimed",
        "Spot Instances cannot attach EBS volumes for checkpointing",
        "Spot Instances only support CPUs, not GPUs",
      ],
      correctAnswer: 1,
      explanation:
        "Spot Instances can be interrupted by AWS with a 2-minute notice; training jobs must checkpoint regularly to S3 so work is not lost upon interruption.",
      hints: [
        "The cost savings (60–90%) come with availability risk.",
        "Checkpointing is the standard mitigation — save progress frequently.",
      ],
    },
    {
      id: "q-mls-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Semantic caching for LLM APIs stores embeddings of past queries and returns cached responses for semantically similar (not just identical) future queries.",
      correctAnswer: "true",
      explanation:
        "Semantic caching computes embeddings of queries and retrieves cached responses when a new query\'s embedding is within a cosine similarity threshold, dramatically reducing API calls for paraphrased but equivalent questions.",
      hints: [
        "Exact string matching misses cases where users ask the same thing differently.",
        "Vector similarity enables fuzzy matching on meaning, not just text.",
      ],
    },
    {
      id: "q-mls-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which cost optimization strategy is most effective for a batch inference workload that processes 10M records nightly with flexible 6-hour completion window?",
      options: [
        "On-demand GPU instances with auto-scaling to finish as fast as possible",
        "Spot Instances with checkpointing and retry logic, exploiting the flexible window",
        "Reserved Instances for guaranteed capacity",
        "Serverless inference for pay-per-call billing",
      ],
      correctAnswer: 1,
      explanation:
        "A flexible 6-hour window allows absorbing Spot interruptions with retries from the last checkpoint. This combination typically cuts cost by 60–90% versus On-Demand with minimal development overhead.",
      hints: [
        "Flexibility in completion time is the key resource enabling Spot usage.",
        "Checkpointing transforms interruptions from failures into minor delays.",
      ],
    },
  ],

  "mlops-cicd": [
    {
      id: "q-mls-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What differentiates CI/CD for ML (MLOps) from traditional software CI/CD?",
      options: [
        "MLOps pipelines do not require automated testing",
        "MLOps CI/CD must also validate data quality, model performance, and retrain triggers — not just code",
        "MLOps pipelines only run on GPU infrastructure",
        "Traditional CI/CD cannot be used for ML projects at all",
      ],
      correctAnswer: 1,
      explanation:
        "ML systems have three axes of change: code, data, and model weights. MLOps CI/CD must test and validate all three, whereas traditional CI/CD focuses only on code correctness.",
      hints: [
        "What changes between ML deployments that doesn\'t change in regular software deployments?",
        "Data and model performance are first-class citizens in ML pipelines.",
      ],
    },
    {
      id: "q-mls-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Continuous Training (CT) is a distinct MLOps practice from Continuous Delivery (CD) and involves automatically retraining models when data drift or performance degradation is detected.",
      correctAnswer: "true",
      explanation:
        "CT extends standard CD with the ability to automatically trigger retraining pipelines based on monitoring signals, keeping models fresh without manual intervention.",
      hints: [
        "Models degrade over time as the world changes — CT automates the response.",
        'CT is unique to ML; traditional software doesn\'t need automated "retraining".',
      ],
    },
    {
      id: "q-mls-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a Kubeflow Pipelines ML CI/CD setup, what is the advantage of defining pipeline steps as containerized components?",
      options: [
        "Container steps run faster than native Python scripts",
        "Each step has isolated dependencies, can be independently versioned, and enables caching of intermediate outputs",
        "Containerized steps avoid the need for a GPU",
        "Containers remove the need for data validation",
      ],
      correctAnswer: 1,
      explanation:
        "Containerization isolates each pipeline step\'s environment, enables independent versioning, and allows Kubeflow to cache step outputs — reusing unchanged steps to speed up iterative development.",
      hints: [
        'Dependency isolation prevents "works on my machine" issues across pipeline steps.',
        "Caching intermediate steps is a major iteration speed boost during development.",
      ],
    },
  ],

  "data-labeling": [
    {
      id: "q-mls-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the core idea behind active learning for data labeling?",
      options: [
        "Using a model to automatically label all unlabeled data",
        "Querying a human annotator for labels on the examples where the model is most uncertain",
        "Augmenting the training set with synthetic data",
        "Training on all available data without any selection strategy",
      ],
      correctAnswer: 1,
      explanation:
        "Active learning selects the most informative samples — typically those with highest model uncertainty — for human annotation, minimizing labeling cost while maximizing model improvement per labeled sample.",
      hints: [
        "The goal is to get the most learning value per human annotation.",
        "High uncertainty = the model has most to gain from seeing the correct label.",
      ],
    },
    {
      id: "q-mls-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Inter-annotator agreement (IAA) is a metric used to assess the consistency and reliability of human labelers.",
      correctAnswer: "true",
      explanation:
        "IAA metrics (e.g., Cohen\'s Kappa, Fleiss' Kappa) measure how consistently multiple annotators assign labels, identifying ambiguous cases and unreliable annotators that can degrade training data quality.",
      hints: [
        "If annotators frequently disagree, the labeling task itself may be ill-defined.",
        "High IAA means the label definition is clear and annotators apply it consistently.",
      ],
    },
    {
      id: "q-mls-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a Label Studio annotation workflow for NER, which practice most reduces annotation errors from annotator fatigue?",
      options: [
        "Having a single expert annotator label all data",
        "Using pre-annotations from a baseline model as starting points for human review and correction",
        "Requiring annotators to label data in 8-hour sessions",
        "Using majority vote among 10 annotators for every sample",
      ],
      correctAnswer: 1,
      explanation:
        "Pre-annotations from a baseline model convert labeling from creation to correction — a significantly easier cognitive task — reducing fatigue-induced errors while maintaining quality.",
      hints: [
        "Correcting a near-correct label is much faster and less error-prone than creating one from scratch.",
        'This is called "human-in-the-loop" or "model-assisted annotation".',
      ],
    },
  ],

  "vector-databases": [
    {
      id: "q-mls-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary use case for a vector database in an ML system?",
      options: [
        "Storing time-series sensor readings with high write throughput",
        "Enabling efficient approximate nearest-neighbor search over high-dimensional embeddings",
        "Caching SQL query results for analytical workloads",
        "Storing model weights for fast loading",
      ],
      correctAnswer: 1,
      explanation:
        "Vector databases index high-dimensional embeddings and support approximate nearest-neighbor (ANN) search, which is foundational for semantic search, RAG, and recommendation systems.",
      hints: [
        "Embeddings are dense vectors — finding similar ones is the core problem.",
        "Exact nearest-neighbor search is too slow for high dimensions and large corpora.",
      ],
    },
    {
      id: "q-mls-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "HNSW (Hierarchical Navigable Small World) is an exact search algorithm that always returns the true nearest neighbors.",
      correctAnswer: "false",
      explanation:
        "HNSW is an approximate nearest-neighbor algorithm. It trades a small recall loss for dramatically better query speed and scalability compared to exact brute-force search.",
      hints: [
        'The "approximate" in ANN means exact results are not guaranteed.',
        "Recall vs. speed is the fundamental trade-off in ANN algorithms.",
      ],
    },
    {
      id: "q-mls-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Qdrant, what is the purpose of payload filtering during vector search?",
      options: [
        "To reduce the dimensionality of query vectors before search",
        'To combine semantic similarity search with structured attribute filters (e.g., category = "electronics")',
        "To compress stored vectors for memory efficiency",
        "To re-rank search results using a cross-encoder model",
      ],
      correctAnswer: 1,
      explanation:
        "Payload filtering allows combining ANN vector search with metadata constraints in a single query, enabling faceted semantic search without expensive post-filtering on large result sets.",
      hints: [
        "Pure vector search ignores metadata — payload filters add structured constraints.",
        'Combining semantic and keyword/attribute filters is called "hybrid search".',
      ],
    },
  ],

  "stream-processing": [
    {
      id: "q-mls-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In Apache Kafka, what is a "consumer group" and why is it useful for ML feature pipelines?',
      options: [
        "A group of Kafka brokers that store the same topic partitions",
        "A set of consumers that collectively read a topic in parallel, with each partition assigned to one consumer for load distribution",
        "A collection of ML models consuming predictions from a shared queue",
        "A schema registry group for validating message formats",
      ],
      correctAnswer: 1,
      explanation:
        "Consumer groups distribute topic partitions across multiple consumers, enabling parallel, scalable feature computation where each event is processed by exactly one consumer in the group.",
      hints: [
        "Parallel consumption requires that partitions are divided among consumers.",
        "Each partition is exclusively owned by one consumer within a group at a time.",
      ],
    },
    {
      id: "q-mls-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Apache Flink supports exactly-once processing semantics for stateful stream processing, even in the presence of failures.",
      correctAnswer: "true",
      explanation:
        "Flink achieves exactly-once semantics through distributed snapshots (Chandy-Lamport algorithm) and two-phase commit to sinks, ensuring each event affects state exactly once even after recovery.",
      hints: [
        '"Exactly-once" is the hardest processing guarantee — at-least-once and at-most-once are simpler.',
        "Flink\'s checkpointing mechanism is the key to fault-tolerant stateful processing.",
      ],
    },
    {
      id: "q-mls-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'When computing a "sliding window" feature (e.g., sum of purchases in the last 7 days) for a real-time fraud model using Flink, what challenge requires careful handling?',
      options: [
        "Flink cannot process more than one event per second",
        "Out-of-order events arriving late can fall outside their correct window, requiring watermarking strategies",
        "Sliding windows require Kafka to have more than 7 partitions",
        "Flink does not support aggregations over time windows",
      ],
      correctAnswer: 1,
      explanation:
        "Network delays cause events to arrive out of order; watermarks define how late events can arrive before a window is closed, balancing completeness against latency in feature computation.",
      hints: [
        "Events don\'t always arrive in the order they occurred — network latency varies.",
        'Watermarks tell Flink when it is "safe" to finalize a time window.',
      ],
    },
  ],

  "kubernetes-ml": [
    {
      id: "q-mls-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What Kubernetes resource type is most appropriate for running a distributed ML training job that requires coordination between multiple identical worker pods?",
      options: [
        "Deployment with HorizontalPodAutoscaler",
        "Job with completions and parallelism, or a training operator (e.g., PyTorchJob via Kubeflow)",
        "DaemonSet running on every node",
        "StatefulSet with persistent volume claims",
      ],
      correctAnswer: 1,
      explanation:
        "Kubeflow\'s training operators (PyTorchJob, TFJob) extend Kubernetes with ML-specific job types that handle distributed training coordination, worker-master communication, and fault recovery natively.",
      hints: [
        "Standard Kubernetes Job lacks ML-specific coordination primitives.",
        "Kubeflow adds custom resource definitions (CRDs) specifically for distributed training patterns.",
      ],
    },
    {
      id: "q-mls-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Kubernetes resource limits for GPU are specified with the resource key `nvidia.com/gpu` and a GPU is always shared between multiple pods by default.",
      correctAnswer: "false",
      explanation:
        "By default, Kubernetes GPU resources are not shared — a GPU requested by a pod is exclusively assigned to it. GPU sharing requires additional mechanisms like NVIDIA MPS or time-slicing plugins.",
      hints: [
        "Exclusive GPU assignment is the default; sharing requires explicit configuration.",
        "GPU sharing adds complexity around memory isolation and context switching.",
      ],
    },
    {
      id: "q-mls-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What Kubernetes scheduling feature ensures GPU training pods are placed on nodes that have sufficient GPU resources AND are co-located on the same high-speed interconnect fabric (e.g., NVLink)?",
      options: [
        "PodDisruptionBudgets",
        "Node affinity rules combined with custom node labels for interconnect topology",
        "Horizontal Pod Autoscaler",
        "ResourceQuotas at the namespace level",
      ],
      correctAnswer: 1,
      explanation:
        "Node affinity with custom labels (e.g., `nvlink-domain: A`) directs the scheduler to place all pods of a distributed training job onto nodes sharing high-bandwidth interconnects, critical for all-reduce performance.",
      hints: [
        "Network topology affects distributed training speed — nodes must be close in the network.",
        "Custom node labels expose hardware topology to the Kubernetes scheduler.",
      ],
    },
  ],

  "cloud-ml": [
    {
      id: "q-mls-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which AWS SageMaker feature automatically finds the best hyperparameters for a training job?",
      options: [
        "SageMaker Feature Store",
        "SageMaker Automatic Model Tuning (Hyperparameter Optimization)",
        "SageMaker Model Monitor",
        "SageMaker Clarify",
      ],
      correctAnswer: 1,
      explanation:
        "SageMaker Automatic Model Tuning runs multiple training jobs with different hyperparameter combinations using Bayesian optimization to find the configuration that maximizes the target metric.",
      hints: [
        'The feature name directly describes its purpose — "tuning" hyperparameters.',
        "Bayesian optimization is more efficient than grid or random search.",
      ],
    },
    {
      id: "q-mls-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GCP Vertex AI Pipelines and AWS SageMaker Pipelines are both built on top of the open-source Kubeflow Pipelines SDK.",
      correctAnswer: "false",
      explanation:
        "Vertex AI Pipelines is built on Kubeflow Pipelines, but SageMaker Pipelines uses AWS\'s own proprietary pipeline definition format and execution engine, not the Kubeflow SDK.",
      hints: [
        "Not all cloud ML platforms adopt the same open-source substrate.",
        "Vendor lock-in vs. open standards is a key consideration when choosing cloud ML platforms.",
      ],
    },
    {
      id: "q-mls-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary advantage of using Azure ML\'s managed endpoints over self-managing a Kubernetes inference cluster?",
      options: [
        "Managed endpoints support more ML frameworks than Kubernetes",
        "Managed endpoints handle infrastructure provisioning, auto-scaling, and blue-green deployments automatically, reducing operational burden",
        "Managed endpoints have lower inference latency than self-managed clusters",
        "Managed endpoints are always cheaper than Kubernetes",
      ],
      correctAnswer: 1,
      explanation:
        "Managed endpoints abstract away cluster management, auto-scaling policies, and deployment strategies, letting ML engineers focus on model development rather than infrastructure operations.",
      hints: [
        '"Managed" implies the cloud provider handles the operational work.',
        "The trade-off is flexibility vs. operational simplicity.",
      ],
    },
  ],

  "responsible-ai-systems": [
    {
      id: "q-mls-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does demographic parity require of a binary classifier?",
      options: [
        "Equal accuracy across all demographic groups",
        "Equal positive prediction rates across protected demographic groups",
        "Equal false negative rates across demographic groups",
        "Equal feature importance across groups",
      ],
      correctAnswer: 1,
      explanation:
        "Demographic parity (statistical parity) requires that the probability of a positive prediction is equal across protected groups, regardless of true label distributions.",
      hints: [
        "Parity here means the rate of a specific outcome — the positive prediction rate — is equal.",
        "This is different from equal accuracy or equal error rates.",
      ],
    },
    {
      id: "q-mls-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "It is mathematically possible to simultaneously satisfy demographic parity, equalized odds, and calibration when base rates differ between groups.",
      correctAnswer: "false",
      explanation:
        "Chouldechova\'s impossibility theorem proves that when base rates differ between groups, the three fairness criteria cannot all be satisfied simultaneously — a fundamental tension in algorithmic fairness.",
      hints: [
        "Fairness metrics often conflict with each other — optimizing one can worsen another.",
        "This is a proven mathematical impossibility result, not just an engineering limitation.",
      ],
    },
    {
      id: "q-mls-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a high-stakes ML system (e.g., loan approvals), which logging practice is essential for enabling post-hoc fairness audits?",
      options: [
        "Logging only aggregate model accuracy metrics",
        "Logging individual predictions with input features, model version, timestamp, and demographic proxies for auditing",
        "Deleting all user data after 24 hours to comply with privacy regulations",
        "Logging only cases where the model was wrong",
      ],
      correctAnswer: 1,
      explanation:
        "Comprehensive per-prediction logging with features, model version, and relevant demographic attributes enables retrospective fairness analysis, regulatory audits, and disparity detection across subgroups.",
      hints: [
        "You can only audit what you\'ve logged — missing data makes fairness analysis impossible.",
        "Regulators may require the ability to reconstruct any past decision.",
      ],
    },
  ],

  "security-ml": [
    {
      id: "q-mls-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What type of attack extracts a functional copy of a model by repeatedly querying its prediction API?",
      options: [
        "Data poisoning attack",
        "Model extraction (model stealing) attack",
        "Membership inference attack",
        "Adversarial perturbation attack",
      ],
      correctAnswer: 1,
      explanation:
        "Model extraction attacks use carefully chosen queries to train a surrogate model that approximates the target model\'s behavior, effectively stealing the model without accessing its weights.",
      hints: [
        "If you can query a model many times, you can observe and replicate its input-output mapping.",
        "The attack steals intellectual property encoded in the model\'s behavior.",
      ],
    },
    {
      id: "q-mls-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Rate limiting and query monitoring on a model\'s prediction API can help detect and mitigate model extraction attacks.",
      correctAnswer: "true",
      explanation:
        "Extraction attacks require a large number of queries; rate limiting reduces the attacker\'s query budget, and anomaly detection on query patterns (e.g., systematically exploring the input space) can identify ongoing attacks.",
      hints: [
        "Extraction requires many queries — limiting query rate raises the attacker\'s cost.",
        "Unusual query distributions (e.g., uniform random inputs) are fingerprints of extraction.",
      ],
    },
    {
      id: "q-mls-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A membership inference attack against an ML model attempts to determine:",
      options: [
        "Whether a model\'s training data contains sensitive personal information",
        "Whether a specific data point was included in the model\'s training set",
        "The exact weights of a model from its predictions",
        "Whether the model is vulnerable to adversarial examples",
      ],
      correctAnswer: 1,
      explanation:
        "Membership inference attacks exploit the fact that models often produce different confidence distributions for training versus non-training samples, allowing an attacker to infer whether a specific record was in the training set — a significant privacy risk.",
      hints: [
        '"Membership" refers to membership in the training dataset, not model membership.',
        "Models that overfit are more vulnerable because they memorize training examples.",
      ],
    },
  ],

  "latency-throughput": [
    {
      id: "q-mls-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In ML serving, what is the trade-off when increasing batch size?",
      options: [
        "Larger batches always reduce both latency and throughput",
        "Larger batches increase throughput but increase per-request latency due to queuing delay",
        "Larger batches reduce memory usage on the GPU",
        "Larger batches make the model more accurate",
      ],
      correctAnswer: 1,
      explanation:
        "Batching amortizes model invocation overhead across requests, improving throughput (samples/second), but each request waits longer to be included in a batch — increasing tail latency.",
      hints: [
        "Requests must wait for a full batch to form — this waiting time is added latency.",
        "GPU efficiency increases with batch size; individual request wait time also increases.",
      ],
    },
    {
      id: "q-mls-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "P99 latency is a more conservative and safety-relevant metric than mean latency for user-facing ML systems.",
      correctAnswer: "true",
      explanation:
        "P99 (99th percentile) latency represents the worst case for 99% of requests, capturing tail latency that mean completely hides. In user-facing systems, tail latency determines user experience for a significant fraction of users.",
      hints: [
        "The mean can be low while a small fraction of requests are extremely slow.",
        "If 1% of users see 10-second latency, that\'s a real problem the mean doesn\'t show.",
      ],
    },
    {
      id: "q-mls-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A model serving system needs to handle 10,000 requests/second with P99 latency < 50ms. Which optimization should be tried FIRST?",
      options: [
        "Scale out to 100 inference servers immediately",
        "Profile the serving bottleneck (CPU, GPU, I/O, network) and optimize the binding constraint",
        "Increase batch size to maximum to improve throughput",
        "Switch to a smaller model regardless of accuracy impact",
      ],
      correctAnswer: 1,
      explanation:
        "Before scaling out or making model changes, profiling identifies the actual bottleneck. Scaling a CPU-bound system with more GPUs wastes money; fixing the binding constraint is always the most efficient first step.",
      hints: [
        "Optimizing the wrong component wastes resources without improving performance.",
        '"Find the bottleneck first" is the universal principle for performance engineering.',
      ],
    },
  ],

  "caching-ml": [
    {
      id: "q-mls-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key limitation of exact-match caching for LLM API calls?",
      options: [
        "Exact-match caching requires too much GPU memory",
        "Even slight rephrasing of an identical question results in a cache miss, severely limiting the hit rate",
        "Exact-match caches cannot store responses longer than 512 tokens",
        "Exact-match caching is incompatible with streaming responses",
      ],
      correctAnswer: 1,
      explanation:
        "Exact-match caching only hits when queries are byte-for-byte identical, making it nearly useless for natural language inputs where the same question can be phrased countless ways.",
      hints: [
        "Natural language is highly variable — rare for two users to type exactly the same string.",
        "This limitation motivates semantic (embedding-based) caching.",
      ],
    },
    {
      id: "q-mls-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Prefix caching in LLM serving (as used in vLLM) reuses KV cache for the common system prompt portion across requests, reducing time-to-first-token.",
      correctAnswer: "true",
      explanation:
        "When multiple requests share a long system prompt prefix, prefix caching avoids recomputing the KV cache for that prefix, directly reducing prefill latency and compute cost.",
      hints: [
        "System prompts are often hundreds of tokens and identical across requests.",
        "Recomputing the same prefix for every request is wasteful — cache it once.",
      ],
    },
    {
      id: "q-mls-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When implementing semantic caching for an LLM API, which similarity threshold consideration is most critical to get right?",
      options: [
        "Choosing between cosine and Euclidean distance metrics",
        "Setting the similarity threshold: too high causes cache misses on paraphrases; too low causes incorrect cached responses for different questions",
        "Choosing the number of dimensions for the embedding model",
        "Deciding between Redis and Qdrant as the vector store backend",
      ],
      correctAnswer: 1,
      explanation:
        "The similarity threshold is the critical calibration point: a threshold too strict misses valid cache opportunities, while a threshold too loose serves wrong answers for genuinely different questions, causing correctness failures.",
      hints: [
        'The threshold determines what "similar enough" means — this is the core design decision.',
        "Domain-specific evaluation sets should guide threshold selection.",
      ],
    },
  ],

  "scaling-laws-systems": [
    {
      id: "q-mls-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "According to the Chinchilla scaling laws, what is the optimal relationship between model parameters (N) and training tokens (D)?",
      options: [
        "D should be roughly 10× N (train mostly larger models with less data)",
        "N and D should scale equally — roughly 20 tokens per parameter",
        "N should be maximized regardless of D",
        "D is irrelevant; only N determines model quality",
      ],
      correctAnswer: 1,
      explanation:
        "Chinchilla (Hoffmann et al., 2022) found the compute-optimal ratio is ~20 training tokens per model parameter, meaning prior large models (e.g., Gopher) were overtrained on too little data relative to their size.",
      hints: [
        "Chinchilla showed that prior models were too large relative to their training data.",
        "Compute optimality means the best model quality for a fixed compute budget.",
      ],
    },
    {
      id: "q-mls-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Scaling laws imply that doubling model parameters always doubles model performance on downstream tasks.",
      correctAnswer: "false",
      explanation:
        "Scaling laws show a power-law (sub-linear) relationship between scale and loss — performance improves predictably but with diminishing returns, not linearly with parameter count.",
      hints: [
        "Power laws have exponents less than 1 — doubling input gives less than double output.",
        "Scaling curves are log-linear, not linear.",
      ],
    },
    {
      id: "q-mls-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For infrastructure planning, scaling laws are most useful for:",
      options: [
        "Determining the exact accuracy of a model before training",
        "Predicting compute, memory, and training time requirements for a target model size before committing to a training run",
        "Automatically selecting the best model architecture",
        "Estimating the number of human annotators needed for data labeling",
      ],
      correctAnswer: 1,
      explanation:
        "Scaling laws provide predictive equations for loss, compute, and sample efficiency, allowing infrastructure teams to estimate cluster size, training duration, and cost before initiating expensive training runs.",
      hints: [
        "The value is in prediction before committing resources.",
        "Scaling laws let you extrapolate from small experiments to large-scale costs.",
      ],
    },
  ],

  "observability-ml": [
    {
      id: "q-mls-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In a Prometheus + Grafana ML observability stack, what is the role of Prometheus?",
      options: [
        "Rendering dashboards and visualizations for ML metrics",
        "Scraping and storing time-series metrics from ML services, and evaluating alerting rules",
        "Tracing individual inference requests end-to-end",
        "Storing model artifacts and experiment metadata",
      ],
      correctAnswer: 1,
      explanation:
        "Prometheus is a time-series metrics collection and alerting engine that scrapes metrics endpoints from services at regular intervals; Grafana then reads from Prometheus to render dashboards.",
      hints: [
        "Prometheus collects and stores; Grafana visualizes — they have distinct roles.",
        "Prometheus scrapes /metrics endpoints exposed by your ML services.",
      ],
    },
    {
      id: "q-mls-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Distributed tracing (e.g., with Jaeger or Zipkin) provides visibility into the latency contribution of each microservice hop in a multi-service ML inference pipeline.",
      correctAnswer: "true",
      explanation:
        "Distributed tracing propagates a trace context across service calls, recording spans for each hop, allowing engineers to identify which service in a chain is responsible for latency anomalies.",
      hints: [
        "A single inference request may touch feature serving, model serving, and post-processing services.",
        "Metrics tell you something is slow; traces tell you where.",
      ],
    },
    {
      id: "q-mls-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which Prometheus metric type is most appropriate for tracking the distribution of inference latencies across requests?",
      options: [
        "Counter — monotonically increasing count of requests",
        "Gauge — current value that can go up and down",
        "Histogram — samples observations into configurable buckets for percentile calculation",
        "Summary — pre-calculates client-side quantiles",
      ],
      correctAnswer: 2,
      explanation:
        "Histograms aggregate latency samples into pre-defined buckets, enabling server-side percentile calculation (P50, P95, P99) across multiple instances — essential for SLA monitoring.",
      hints: [
        "To compute P99 latency, you need a distribution, not just a single value.",
        "Histograms allow aggregation across multiple Prometheus instances; summaries do not.",
      ],
    },
  ],

  "ml-system-design-principles": [
    {
      id: "q-mls-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which principle states that ML system components should be designed to fail gracefully and continue serving (possibly degraded) when a dependency fails?",
      options: [
        "Data minimization",
        "Graceful degradation / fault tolerance",
        "Model interpretability",
        "Horizontal scalability",
      ],
      correctAnswer: 1,
      explanation:
        "Graceful degradation ensures the system provides reduced but functional service during partial failures — e.g., falling back to a simpler rule-based model if the ML model service is unavailable.",
      hints: [
        "The opposite of graceful degradation is a complete outage when any component fails.",
        "Fallback mechanisms are the implementation of this principle.",
      ],
    },
    {
      id: "q-mls-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'The "data flywheel" effect describes how a deployed ML product that attracts more users generates more training data, which improves the model, which attracts more users.',
      correctAnswer: "true",
      explanation:
        "The data flywheel is a virtuous cycle where user engagement generates labeled data that improves the model, creating a compounding competitive advantage that is difficult for competitors to replicate.",
      hints: [
        "A flywheel is a self-reinforcing cycle — each turn makes the next turn easier.",
        "This is why data network effects are a key moat for ML-driven products.",
      ],
    },
    {
      id: "q-mls-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When designing an ML system for a high-stakes domain, which principle best captures the trade-off between model complexity and operational reliability?",
      options: [
        "Always use the most accurate model available, regardless of complexity",
        "Prefer the simplest model that meets business requirements, because simpler models are easier to debug, monitor, and maintain in production",
        "Use ensemble models to maximize robustness",
        "Complexity should always be increased incrementally until performance plateaus",
      ],
      correctAnswer: 1,
      explanation:
        'In production ML, operational concerns (debuggability, monitoring, incident response speed) often outweigh marginal accuracy gains from complex models — a principle known as "sufficiently good and maintainable" design.',
      hints: [
        "A model that\'s 2% more accurate but takes 10× longer to debug may be a net negative.",
        "Occam\'s Razor applied to ML: prefer simplicity when accuracy is comparable.",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
