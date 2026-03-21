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
        "A Feature Store centralizes precomputed features so that training and serving use identical transformations, eliminating training-serving skew. Without a feature store, the same feature (e.g., 'user\\_total\\_spend\\_30d') might be computed differently in a Python training pipeline versus a Java serving microservice — the classic skew problem.\n\n" +
        "The core issue: in a production ML system, feature computation often diverges across environments. The training pipeline computes features in a batch job using a Python library (e.g., pandas, scikit-learn), while the serving layer computes features in real-time using a different language (e.g., Java, C++). Subtle differences in library versions, floating-point rounding, or even the order of operations can cause the same feature to take different values in each environment.\n\n" +
        "The Feature Store ensures both paths read from the same precomputed values stored in a shared storage layer (e.g., Redis for online serving, S3 for offline training). Concretely, the offline pipeline computes and materializes features; the online store serves them at inference time. This guarantees consistency: \\(P(\\text{training}) = P(\\text{serving})\\).",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
        "In Weights & Biases (W&B), calling `wandb.init()` alone is sufficient to automatically log model gradients and topology.",
      correctAnswer: "False",
      explanation:
        "`wandb.init()` only establishes the run context (project name, run name, experiment metadata). Automatic logging of gradients and model topology requires an explicit call to `wandb.watch(model)`, which instruments the model to record gradients and topology information throughout training.",
      hints: [
        "In W&B, `wandb.init()` handles run setup, not model instrumentation.",
        "`wandb.watch(model)` is the dedicated call for automatic gradient and topology logging.",
        "Initialization and model watching are two distinct operations in the W&B API.",
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
      correctAnswer: "True",
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
        "In NVIDIA Triton Inference Server, what does dynamic batching accomplish?",
      options: [
        "Automatically resizing model input tensors at runtime to fit varying input shapes",
        "Combining multiple individual inference requests that arrive within a configurable time window into a single batch for GPU processing",
        "Partitioning a large model across multiple GPUs for distributed inference",
        "Routing a percentage of live traffic to a new model version for evaluation",
      ],
      correctAnswer: 1,
      explanation:
        "Dynamic batching collects individual client requests that arrive within a configurable time window (e.g., 100 ms) and merges them into a single batch before GPU execution. This amortizes the kernel launch overhead across many samples.\n\n" +
        "Without batching, each individual request triggers a separate GPU kernel launch. For small inputs, the kernel launch overhead (1-2 ms) dominates the actual compute time. With dynamic batching, a single kernel launch processes many samples:\n\n" +
        "\\[ \\text{Single request:} \\quad t_{\\text{total}} \\approx t_{\\text{launch}} + t_{\\text{compute}} \\approx 5 \\text{ ms} \\]\n" +
        "\\[ \\text{Batch of 32:} \\quad t_{\\text{total}} \\approx t_{\\text{launch}} + 32 \\cdot t_{\\text{per-sample}} \\approx 15 \\text{ ms} \\]\n" +
        "\\[ \\Rightarrow \\text{Throughput improvement: } \\frac{5}{0.47} \\approx 10\\times \\text{ per-sample speedup} \\]\n\n" +
        "Triton's dynamic batcher waits up to the configured time window before executing — trading a small amount of added latency for a large throughput gain.",
      hints: [
        "GPUs achieve peak efficiency when many samples are processed in a single kernel launch — a single request leaves most CUDA cores idle.",
        "Dynamic batching resolves the tension between low latency (desirable for individual requests) and high throughput (desirable for resource efficiency).",
        "The time window parameter controls the trade-off: longer windows allow larger batches but add latency to individual requests.",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
      explanation:
        "PSI compares feature distributions between a reference (baseline) dataset and the current dataset using only the feature values — no labels required. It is computed by partitioning both distributions into \\(n\\) bins, then summing the weighted differences:\n\n" +
        "\\[ \\text{PSI} = \\sum_{i=1}^{n} (A_i - E_i) \\times \\ln\\!\\left(\\frac{A_i}{E_i}\\right) \\]\n\n" +
        "where \\(A_i\\) is the actual percentage of observations in bin \\(i\\) and \\(E_i\\) is the expected (reference) percentage.\n\n" +
        "Standard interpretation thresholds:\n" +
        "\\[ \\text{PSI} < 0.1 \\; \\Rightarrow \\; \\text{no action needed} \\]\n" +
        "\\[ 0.1 \\leq \\text{PSI} < 0.25 \\; \\Rightarrow \\; \\text{investigate further} \\]\n" +
        "\\[ \\text{PSI} \\geq 0.25 \\; \\Rightarrow \\; \\text{significant drift — retrain recommended} \\]\n\n" +
        "PSI = 0 means identical distributions; PSI grows toward infinity as the distributions become more disjoint.",
      hints: [
        "PSI = 0 means the distributions are identical; PSI \\(\\to \\infty\\) means they are completely disjoint.",
        "PSI > 0.25 on a key feature (e.g., transaction\\_amount, user\\_age) should trigger an ML on-call alert.",
        "PSI is label-free — it only compares feature distributions, so no labeled data is needed for online monitoring.",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
      correctAnswer: "False",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
        "Why is structured pruning generally preferred over unstructured pruning for production deployment on standard GPUs?",
      options: [
        "Structured pruning achieves higher overall sparsity ratios than unstructured pruning",
        "Structured pruning removes entire neurons, channels, or attention heads, producing dense sub-networks that map efficiently to GPU hardware; unstructured pruning leaves random sparse patterns that require specialized hardware to accelerate",
        "Unstructured pruning necessarily requires full model retraining from scratch",
        "Structured pruning has no impact on model accuracy, whereas unstructured pruning always degrades accuracy",
      ],
      correctAnswer: 1,
      explanation:
        "The key distinction lies in what each method removes:\n\n" +
        "Unstructured pruning zeroes out individual weights (connections) based on magnitude. This produces irregular, random sparse patterns that are computationally indistinguishable from dense matrices on standard GPUs — no speedup is realized without specialized sparse hardware (e.g., NVIDIA A100's sparse tensor cores).\n\n" +
        "Structured pruning removes entire computational units — an attention head, a CNN channel, or a transformer layer. The result is a dense sub-network with regular structure that maps directly onto GPU tensor cores without any hardware modifications:\n\n" +
        "\\[ W_{\\text{pruned}} \\in \\mathbb{R}^{d \\times d} \\quad \\text{(dense, GPU-accelerated)} \\]\n\n" +
        "The trade-off: structured pruning may sacrifice some sparsity efficiency (cannot achieve the same compression ratios) but delivers practical speedups on commodity hardware.",
      hints: [
        "Standard GPUs accelerate dense matrix multiplications — they do not natively accelerate arbitrary sparse patterns.",
        "In structured pruning, what gets removed are entire attention heads, CNN channels, or layers — not individual weights.",
        "The practical advantage: structured pruning works on any GPU without special hardware support.",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
        "What is the core principle behind active learning for data labeling?",
      options: [
        "A model automatically assigns labels to all unlabeled data without human input",
        "A human annotator is queried only for the specific data points on which the model has the highest prediction uncertainty",
        "Synthetic data is generated and added to the training set to improve model robustness",
        "All available unlabeled data is labeled uniformly without any selection strategy",
      ],
      correctAnswer: 1,
      explanation:
        "Active learning is built on the insight that not all data points are equally valuable for improving a model. Instead of labeling data at random, the model identifies the examples about which it is most uncertain — those where its probability estimates are closest to a decision boundary.\n\n" +
        "The standard uncertainty metric is entropy:\n" +
        "\\[ H(x) = -\\sum_{c} p_c(x) \\log p_c(x) \\]\n" +
        "where \\(p_c(x)\\) is the model's predicted probability for class \\(c\\) at input \\(x\\). High entropy (predictions near 0.5 for binary classification) indicates the model cannot distinguish confidently between classes — these are the most informative samples to label.\n\n" +
        "This selectivity minimizes the labeling budget required to achieve a target model performance.",
      hints: [
        "Active learning seeks to maximize model improvement per human annotation dollar — it is not designed to label everything automatically.",
        "High model uncertainty (e.g., a binary classifier outputting ~0.5) means the model is confused — the correct label would be most informative here.",
        "The uncertainty criterion is often measured by entropy or by the gap between top two class probabilities.",
      ],
    },
    {
      id: "q-mls-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Inter-annotator agreement (IAA) is a metric used to assess the consistency and reliability of human labelers.",
      correctAnswer: "True",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
      correctAnswer: "False",
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
      correctAnswer: "False",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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
        "In LLM serving, prefix caching (as implemented in vLLM) works by reusing the KV cache generated for which portion of a request?",
      correctAnswer: "True",
      explanation:
        "LLM inference consists of two phases: (1) the prefill phase, which processes the full input prompt and populates the KV cache; and (2) the decode phase, which generates tokens autoregressively. When many requests share the same system prompt (e.g., \"You are a helpful assistant...\"), the prefill phase computes the same KV cache for that prefix repeatedly — an expensive and unnecessary computation.\n\n" +
        "Prefix caching identifies the common prefix across requests (stored as a hash key) and reuses the already-computed KV cache for that portion. The prefill phase then only needs to process the unique user-specific portion:\n\n" +
        "\\[ t_{\\text{prefill}} = t_{\\text{prefix}} + t_{\\text{user-specific}} \\]\n\n" +
        "Since the system prompt may be hundreds to thousands of tokens, caching it can reduce time-to-first-token by 30-70% for typical chat workloads.",
      hints: [
        "System prompts are typically long (hundreds of tokens) and identical across all users — recomputing their KV cache on every request is the inefficiency prefix caching targets.",
        "The KV cache is stored as a hash-keyed cache — if the hash of the prefix matches a prior request, the cached KV values are reused.",
        "The prefill phase dominates latency for longer prompts; prefix caching directly reduces this component.",
      ],
    },
    {
      id: "q-mls-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When implementing semantic caching for an LLM API, which design decision is most critical to get right?",
      options: [
        "Whether to use cosine similarity versus Euclidean distance as the similarity metric",
        "Calibrating the embedding similarity threshold: too high → cache misses on valid paraphrases; too low → incorrect cached responses for genuinely different queries",
        "Selecting the embedding model's dimensionality",
        "Choosing between Redis and Qdrant as the vector store backend",
      ],
      correctAnswer: 1,
      explanation:
        "The similarity threshold is the central calibration knob in semantic caching. After computing query embeddings and retrieving the nearest cached embedding, the system checks whether the similarity exceeds the threshold before returning a cached response:\n\n" +
        "\\[ \\text{Hit} \\iff \\text{sim}(\\mathbf{q}, \\mathbf{q}_{\\text{cached}}) > \\tau \\]\n\n" +
        "where \\(\\tau\\) is the threshold. Setting \\(\\tau\\) too high (e.g., 0.98) means even slight paraphrases — \"How do I reset my password?\" vs. \"How can I change my password?\" — will miss the cache. Setting \\(\\tau\\) too low (e.g., 0.75) risks returning cached answers to fundamentally different questions, producing incorrect responses.\n\n" +
        "The optimal threshold is domain-dependent and should be tuned on a representative evaluation set of query pairs labeled as same-intent or different-intent.",
      hints: [
        "The threshold answers: how similar must two queries be for one to stand in for the other? This is the core design trade-off.",
        "Too high a threshold = cache misses (expensive LLM calls not avoided). Too low a threshold = correctness failures (wrong answers served).",
        "Domain-specific evaluation sets — pairs of queries labeled as same or different intent — are the standard tool for calibrating this threshold.",
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
      correctAnswer: "False",
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
      correctAnswer: "True",
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
      correctAnswer: "True",
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


  "ml-interpretability-systems": [
    {
      id: "q-mls-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the primary purpose of SHAP (SHapley Additive exPlanations) values in ML systems?",
      options: [
        "To speed up model training by pruning unimportant features.",
        "To assign each feature a contribution value for a specific prediction, based on game-theoretic Shapley values that fairly distribute the prediction among features.",
        "To automatically select the best hyperparameters for a model.",
        "To visualize the decision boundary of a classifier.",
      ],
      correctAnswer: 1,
      explanation:
        "SHAP values provide consistent, locally accurate feature attributions by computing each feature's average marginal contribution across all possible feature subsets. Unlike simpler attribution methods, SHAP satisfies desirable properties: local accuracy, missingness, and consistency, making it the gold standard for model explanation.",
      hints: [
        "Shapley values come from cooperative game theory — imagine features as players splitting a payout (prediction).",
        "SHAP is model-agnostic but also has fast, model-specific implementations for tree ensembles.",
      ],
    },
    {
      id: "q-mls-kp31-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A loan approval model uses 50 features. SHAP analysis reveals that a protected attribute (ethnicity) has high importance. What is the correct engineering response?",
      options: [
        "Increase the weight of ethnicity since it improves model accuracy.",
        "Remove ethnicity from the feature set, retrain, check if ethnicity-correlated features act as proxies, measure fairness metrics (demographic parity, equalized odds) across groups, and document findings for regulatory compliance.",
        "Use SHAP to reduce ethnicity's contribution to exactly zero without changing the model.",
        "Accept the result since SHAP values are just statistics without legal implications.",
      ],
      correctAnswer: 1,
      explanation:
        "Protected attributes in high-stakes models create legal and ethical risk (disparate impact under ECOA). The remediation process: remove the direct feature, check for correlated proxies, apply fairness constraints if needed, measure fairness metrics on hold-out data, and document the investigation. Simply ignoring high SHAP importance for a protected attribute creates regulatory liability.",
    },
    {
      id: "q-mls-kp31-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "An interpretable model (e.g., linear regression, decision tree) is always preferable to a black-box model in production ML systems.",
      correctAnswer: "False",
      explanation:
        "Interpretability is context-dependent. In high-stakes domains (credit, medicine, criminal justice) where explanations are legally required or essential for trust, interpretable models are preferred despite accuracy trade-offs. In other domains (image recognition, speech processing), black-box models are standard and post-hoc explanation methods provide sufficient insight. The choice depends on requirements, not a universal rule.",
    },
  ],

  "ml-governance-systems": [
    {
      id: "q-mls-kp32-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the purpose of a model card in ML governance?",
      options: [
        "A business card format for ML engineers.",
        "A standardized document accompanying a model that describes its intended uses, performance across subgroups, limitations, training data, and ethical considerations — enabling informed decisions about deployment.",
        "A credit card used to pay for GPU compute.",
        "A configuration file specifying model hyperparameters.",
      ],
      correctAnswer: 1,
      explanation:
        "Model cards (Mitchell et al., 2019) are model documentation artifacts: they specify intended use cases, out-of-scope uses, performance metrics across demographic groups, ethical considerations, and training data information. They enable stakeholders to assess whether a model is appropriate for a given deployment context and make ML systems more transparent and accountable.",
      hints: [
        "Google, Hugging Face, and many organizations publish model cards for their public models.",
        "Think of a model card as a nutrition label for ML models.",
      ],
    },
    {
      id: "q-mls-kp32-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An ML governance framework for a financial institution must ensure models are compliant with SR 11-7 (Fed model risk management guidance). What technical controls are required?",
      options: [
        "Only audit model accuracy annually.",
        "Model inventory with risk ratings, independent validation (challenger models, back-testing), documentation of assumptions and limitations, ongoing monitoring with performance thresholds, change management process for model updates, and audit trails for all model decisions.",
        "Use open-source models only to ensure transparency.",
        "Have the model development team self-validate their own models.",
      ],
      correctAnswer: 1,
      explanation:
        "SR 11-7 requires a three-line-of-defense model risk framework: (1) model development with full documentation; (2) independent model validation (separate team tests the model, builds challengers, performs conceptual soundness review); (3) audit. Technical controls include: model inventory tracking versions and risk tiers, automated back-testing pipelines, performance monitoring dashboards, and immutable audit logs of predictions.",
    },
    {
      id: "q-mls-kp32-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Data lineage tracking in ML systems records the origin, transformations, and usage of data throughout its lifecycle, enabling debugging, compliance audits, and impact analysis.",
      correctAnswer: "True",
      explanation:
        "Data lineage answers where did this data come from and what happened to it. This is essential for: debugging model degradation (which data transform introduced the bug?), GDPR right-to-erasure compliance (finding and deleting an individual's data from all derived datasets), and impact analysis (if upstream data changes, what models are affected?).",
    },
  ],

  "ml-testing-systems": [
    {
      id: "q-mls-kp33-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is behavioral testing for NLP models, as proposed by Ribeiro et al.?",
      options: [
        "Testing how quickly the model responds to requests.",
        "A systematic evaluation methodology that tests specific linguistic capabilities (negation, vocabulary, robustness to typos) using templated test cases, going beyond aggregate accuracy to reveal specific failure modes.",
        "A user study measuring model behavior in production.",
        "Testing model behavior under adversarial attacks.",
      ],
      correctAnswer: 1,
      explanation:
        "Behavioral testing (CheckList) creates test suites targeting specific model capabilities: minimum functionality tests (basic sanity checks), invariance tests (adding typos or changing names should not change sentiment), and directional tests (adding not should flip sentiment). This reveals failures that aggregate metrics miss — a model with 95% accuracy may still completely fail at understanding negation.",
      hints: [
        "Inspired by software testing checklists — check specific behaviors, not just aggregate performance.",
        "Different from adversarial testing: behavioral tests check expected model properties.",
      ],
    },
    {
      id: "q-mls-kp33-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How should regression testing for ML models be designed to detect silent model degradation across releases?",
      options: [
        "Manually compare model outputs on random samples before each release.",
        "Maintain a frozen evaluation suite (held-out benchmark with known correct answers and performance baselines per metric per slice), run it automatically on every model candidate in CI, and block promotion if any metric regresses below a configurable threshold from the current production model.",
        "Use the training loss as the primary regression metric.",
        "Regression testing is unnecessary if CI/CD pipelines are in place.",
      ],
      correctAnswer: 1,
      explanation:
        "ML regression testing requires: (1) a frozen, representative benchmark never modified after establishment; (2) per-slice metrics to catch targeted regressions on subpopulations; (3) automated CI integration so every candidate is evaluated; (4) configurable non-regression thresholds. This prevents subtle quality degradations from accumulating undetected.",
    },
    {
      id: "q-mls-kp33-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Unit testing ML code should cover data preprocessing functions, feature engineering pipelines, and custom loss functions — not just model architecture code.",
      correctAnswer: "True",
      explanation:
        "ML bugs most commonly occur in data transformations and feature engineering, not model architectures. Unit tests should verify: preprocessing functions handle edge cases (nulls, outliers, type mismatches); feature engineering produces expected outputs on known inputs; custom loss functions return finite values and correct gradients; data loaders produce correct shapes and types.",
    },
  ],

  "ml-cost-engineering": [
    {
      id: "q-mls-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the primary driver of inference cost in transformer-based language models, and what is the most effective technique to reduce it?",
      options: [
        "Model accuracy; reducing accuracy by using a smaller vocabulary.",
        "The KV cache memory and attention computation scale quadratically with sequence length; KV cache quantization, FlashAttention, and speculative decoding are the most effective techniques to reduce inference cost.",
        "Network bandwidth; using faster network cards.",
        "CPU memory; upgrading to larger RAM.",
      ],
      correctAnswer: 1,
      explanation:
        "Transformer inference cost drivers: (1) attention computation is O(n^2) in sequence length — FlashAttention reduces memory I/O by fusing operations; (2) KV cache grows linearly with context length, becoming the memory bottleneck for long contexts; (3) speculative decoding (small draft model proposes tokens, large model verifies in parallel) can achieve 2-4x speedup for repetitive outputs.",
      hints: [
        "Autoregressive decoding generates tokens sequentially — each token requires a full forward pass.",
        "Speculative decoding exploits that verification is cheaper than sequential generation.",
      ],
    },
    {
      id: "q-mls-kp34-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Your ML training job costs $50,000 per run and takes 3 days on 256 A100 GPUs. GPU utilization monitoring shows 45% average utilization. What is the most impactful optimization?",
      options: [
        "Upgrade to H100 GPUs immediately.",
        "Profile the data loading and preprocessing pipeline — at 45% GPU utilization, the bottleneck is likely the CPU-side data pipeline. Fix with multi-process data loading, prefetching, pre-tokenization, and faster storage (NVMe). This can double effective throughput without adding hardware.",
        "Increase the learning rate to converge faster.",
        "Reduce the model size by 50% to fit on fewer GPUs.",
      ],
      correctAnswer: 1,
      explanation:
        "45% GPU utilization in training almost always indicates a data pipeline bottleneck: GPUs are sitting idle waiting for batches. The fix: (1) increase DataLoader workers; (2) pin memory for faster CPU to GPU transfer; (3) pre-process and cache tokenized data; (4) use high-speed NVMe or memory-mapped datasets; (5) implement prefetching. Fixing this can raise utilization to 85-90%, halving effective cost without any model or hardware changes.",
    },
    {
      id: "q-mls-kp34-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Mixed-precision training (using FP16 or BF16 for forward/backward passes while keeping FP32 master weights) reduces memory usage and increases training throughput without significant accuracy loss.",
      correctAnswer: "True",
      explanation:
        "Mixed-precision training: (1) FP16/BF16 activations and gradients halve memory, enabling 2x larger batch sizes; (2) Tensor Cores on modern GPUs execute FP16 matrix multiplications 4-8x faster than FP32; (3) FP32 master weights and loss scaling prevent gradient underflow. BF16 is preferred over FP16 because it has the same exponent range as FP32, avoiding gradient overflow issues.",
    },
  ],

  "ml-scalability-patterns": [
    {
      id: "q-mls-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the key challenge when scaling an ML system from 1 million to 1 billion users?",
      options: [
        "The model architecture must be completely redesigned.",
        "The system must handle not just increased request volume but also increased data heterogeneity, longer tail distributions in user behavior, stricter latency SLAs at scale, and the compounding effects of model feedback loops on user behavior.",
        "More users always improve model quality due to more training data.",
        "Scaling from 1M to 1B users only requires adding more servers.",
      ],
      correctAnswer: 1,
      explanation:
        "Scaling ML systems introduces non-linear challenges: (1) tail distributions — rare behaviors that matter at 1B users do not appear in 1M user training data; (2) feedback loops — at scale, model recommendations significantly shape the data distribution the model is trained on next; (3) infrastructure complexity — sharding, consistency, and latency SLAs become harder; (4) societal impact — mistakes at scale affect millions.",
    },
    {
      id: "q-mls-kp35-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the purpose of the two-phase commit pattern in distributed ML feature stores, and when is it necessary?",
      options: [
        "To commit model weights to disk in two separate write operations.",
        "To ensure atomicity when writing features to both an online store (Redis) and offline store (S3) simultaneously — either both writes succeed or neither does, preventing training-serving skew from partial updates.",
        "A training technique that commits gradients twice per step for stability.",
        "Two-phase commit is only relevant for transactional databases, not ML systems.",
      ],
      correctAnswer: 1,
      explanation:
        "When a feature computation updates both online (serving) and offline (training) stores, a partial failure creates training-serving skew. Two-phase commit ensures atomicity. In practice, saga patterns or eventual consistency with version tracking are more common due to availability trade-offs.",
    },
    {
      id: "q-mls-kp35-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Horizontal scaling (adding more machines) is always sufficient to handle increased ML inference load without architectural changes.",
      correctAnswer: "False",
      explanation:
        "Horizontal scaling works well for stateless inference but has limits: (1) shared state (feature caches, model state) creates coordination overhead; (2) model size may require all replicas to load large weights, causing memory waste; (3) heterogeneous request types require different resource profiles; (4) at very high QPS, upstream bottlenecks (feature store, database) become the constraint. Architectural changes are often also needed.",
    },
  ],

  "ml-workflow-orchestration": [
    {
      id: "q-mls-kp36-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the primary advantage of using a workflow orchestration system (e.g., Apache Airflow, Prefect, Kubeflow Pipelines) for ML pipelines over cron jobs?",
      options: [
        "Workflow orchestrators run jobs faster than cron.",
        "Workflow orchestrators provide dependency management (execute step B only after step A succeeds), retry logic, monitoring, lineage tracking, parameterization, and reproducibility — things cron cannot provide.",
        "Workflow orchestrators eliminate the need for containerization.",
        "Cron jobs cannot run ML code.",
      ],
      correctAnswer: 1,
      explanation:
        "Cron jobs are primitive: they run at a schedule but have no dependency management, no retry logic, no monitoring, and no parameterization. ML pipelines have complex dependencies and failure modes requiring retries. Orchestrators provide DAG-based dependency resolution, step-level monitoring, parameter sweeps, artifact tracking, and integration with compute backends.",
      hints: [
        "A cron job that fails silently is a common source of ML production incidents.",
        "Orchestrators provide the glue between pipeline steps that cron lacks.",
      ],
    },
    {
      id: "q-mls-kp36-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "An ML pipeline DAG has a step that takes 6 hours to compute a feature matrix used by 5 downstream training jobs. How should this be optimized?",
      options: [
        "Run the feature computation step 5 separate times, once before each training job.",
        "Cache the computed feature matrix as a versioned artifact (content-addressed by input hash) in a shared store; downstream training jobs check the cache first and skip recomputation if the input hash matches.",
        "Parallelize all 6 steps together using stream processing.",
        "Replace the feature computation with a simpler method that takes 1 hour.",
      ],
      correctAnswer: 1,
      explanation:
        "Artifact caching is fundamental to efficient ML pipeline orchestration: compute the artifact hash from all inputs, check if the cache contains an artifact with this hash, load from cache if yes or compute and store if no. This enables incremental computation — only recompute what has changed.",
    },
    {
      id: "q-mls-kp36-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In ML pipeline orchestration, a DAG (Directed Acyclic Graph) structure ensures that pipeline steps can be executed in a valid order without circular dependencies.",
      correctAnswer: "True",
      explanation:
        "DAGs model dependencies between pipeline steps: an edge A to B means B depends on A. Acyclicity guarantees there is always a topological ordering (a valid execution sequence). Circular dependencies would create deadlocks. Orchestrators like Airflow enforce DAG structure at definition time, catching circular dependencies before execution.",
    },
  ],

  "model-deployment-patterns": [
    {
      id: "q-mls-kp37-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the difference between blue-green deployment and canary deployment for ML models?",
      options: [
        "Blue-green uses GPU; canary uses CPU.",
        "Blue-green maintains two identical production environments and switches all traffic instantly; canary gradually routes a small percentage of traffic to the new model, monitoring for issues before full rollout.",
        "Blue-green is for batch models; canary is for online models.",
        "Blue-green requires more hardware than canary deployment.",
      ],
      correctAnswer: 1,
      explanation:
        "Blue-green: instant switchover with easy rollback; risk is that all users see the new model simultaneously. Canary: gradual rollout (1% to 5% to 20% to 100%) with continuous monitoring; risk exposure is limited to a small user percentage, enabling early issue detection. For ML models with hard-to-predict behavioral changes, canary is preferred.",
    },
    {
      id: "q-mls-kp37-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A canary deployment of a new recommendation model shows 0.3% better CTR but 0.5% higher p99 latency. How should you evaluate whether to proceed with full rollout?",
      options: [
        "Always prioritize the metric (CTR) over infrastructure metrics (latency).",
        "Evaluate whether p99 latency remains within the SLA threshold; check if the latency increase affects user experience; model the business impact of +0.3% CTR vs. potential churn from +0.5% latency; investigate the root cause of the latency increase before committing to full rollout.",
        "Roll back immediately since any latency regression is unacceptable.",
        "Proceed with rollout since CTR improvement outweighs latency concerns.",
      ],
      correctAnswer: 1,
      explanation:
        "Deployment decisions require multi-dimensional evaluation: (1) Is the SLA breached? (2) Business impact model: CTR gain vs. latency-induced conversion loss. (3) Root cause analysis prevents a latency regression from masking a deeper issue. (4) User experience research on latency thresholds. This holistic evaluation is necessary before irreversible full rollout.",
    },
    {
      id: "q-mls-kp37-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In ML deployment, a rollback plan should be prepared before every model deployment to ensure rapid recovery if the new model causes production issues.",
      correctAnswer: "True",
      explanation:
        "Rollback readiness is a fundamental deployment best practice: the previous model version should remain available and deployable in minutes. This requires: keeping the previous model artifact in the registry, pre-testing the rollback procedure, having runbooks that specify rollback triggers, and ensuring the serving infrastructure can route traffic to the old version without downtime.",
    },
  ],

  "experiment-design-systems": [
    {
      id: "q-mls-kp38-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the multiple comparisons problem in ML experimentation and why does it matter?",
      options: [
        "Running multiple models simultaneously causes GPU memory conflicts.",
        "When testing many metrics or variants simultaneously, the probability of finding at least one statistically significant result by chance increases — requiring corrections like Bonferroni or FDR control to maintain valid statistical inference.",
        "Multiple comparisons slow down the experiment analysis process.",
        "Only one metric should ever be evaluated per ML experiment.",
      ],
      correctAnswer: 1,
      explanation:
        "The multiple comparisons problem: with alpha=0.05 and 20 independent tests, the expected number of false positives is 1. Teams testing 10 metrics across 5 variants face 50 comparisons — inflating the false positive rate dramatically. Corrections: Bonferroni (divide alpha by number of tests, conservative), Benjamini-Hochberg (FDR control, less conservative), or pre-specifying a primary metric before seeing data.",
    },
    {
      id: "q-mls-kp38-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You want to run 20 A/B tests simultaneously on a platform with 10M users to accelerate iteration velocity. What experimental design challenge must you address?",
      options: [
        "You cannot run more than 3 tests simultaneously.",
        "Interaction effects: if multiple experiments affect the same user experience, treatment effects may not be additive, violating SUTVA. Mitigate with orthogonal design (independent randomization layers), interaction detection, and holdout groups excluded from all experiments.",
        "Running 20 tests requires 20 separate traffic splits of equal size.",
        "Simultaneous tests must all have the same treatment duration.",
      ],
      correctAnswer: 1,
      explanation:
        "Experiment interaction is the key challenge at scale. SUTVA assumes each unit's outcome depends only on its own treatment — violated if experiments interact. Solutions: (1) orthogonal randomization layers reduce but do not eliminate interactions; (2) interaction detection checks if experiments perform differently when co-assigned; (3) holdout groups measure cumulative effect of all live experiments.",
    },
    {
      id: "q-mls-kp38-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Peeking at A/B test results before the pre-determined end date and stopping early when significance is reached inflates the false positive rate above the nominal alpha level.",
      correctAnswer: "True",
      explanation:
        "The peeking problem (optional stopping): running a significance test multiple times during an experiment inflates Type I error rate. At 5 looks at alpha=0.05, the actual false positive rate is approximately 14%. Solutions: pre-determine sample size before starting, use sequential testing methods that are valid at any stopping time, or apply alpha spending functions for planned interim analyses.",
    },
  ],

  "ml-data-engineering": [
    {
      id: "q-mls-kp39-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the purpose of data versioning in ML pipelines, and what does it enable?",
      options: [
        "Data versioning prevents data from being modified by multiple users simultaneously.",
        "Data versioning assigns unique identifiers to datasets at specific points in time, enabling experiment reproducibility (same data plus same code equals same model), debugging by comparing dataset versions when model performance changes, and rollback to known-good datasets.",
        "Data versioning compresses data to reduce storage costs.",
        "Data versioning automatically cleans and validates incoming data.",
      ],
      correctAnswer: 1,
      explanation:
        "Data versioning (DVC, Delta Lake, LakeFS) is analogous to code version control for datasets. Without it, which data was used to train the model that was in production on March 15 is unanswerable. With versioning: full reproducibility by tagging training dataset versions, bisect data quality issues by comparing versions when metrics degraded, and rollback to last-known-good dataset.",
      hints: [
        "DVC (Data Version Control) integrates with git to version datasets stored in S3, GCS, etc.",
        "Content-addressed storage (sha256 hash of content) naturally versions data without metadata management.",
      ],
    },
    {
      id: "q-mls-kp39-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A Spark job processing 10TB of daily log data for ML feature computation takes 4 hours. Profiling shows 70% of time is in a groupBy + count on a high-cardinality key with skewed distribution (10% of keys have 80% of records). What optimization addresses this?",
      options: [
        "Increase the number of Spark executors proportionally.",
        "Apply salting: append a random suffix (0 to N) to the skewed keys before aggregation to distribute records across N partitions, perform the groupBy + count on salted keys, then sum the partial counts per original key in a second aggregation pass.",
        "Switch from Spark to a single-machine pandas job for accuracy.",
        "Filter out the high-frequency keys before aggregation.",
      ],
      correctAnswer: 1,
      explanation:
        "Data skew in Spark causes stragglers: the few partitions handling high-frequency keys take 10-100x longer than others. Salting artificially distributes the skewed key, spreading records across N partitions. After the first aggregation, a second groupBy on the original key sums partial counts, transforming an O(skew_factor) straggler into a balanced O(N) parallel computation.",
    },
    {
      id: "q-mls-kp39-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Schema evolution in ML data pipelines refers to handling changes in the structure of data over time (e.g., new fields added, fields renamed) without breaking downstream feature computations.",
      correctAnswer: "True",
      explanation:
        "Schema evolution is a practical ML data engineering challenge: as products evolve, event schemas change. Without schema evolution handling, adding a new field breaks all pipelines that do not expect it. Solutions: backwards-compatible schema changes, schema registries enforcing compatibility, and defensive code that handles missing fields gracefully.",
    },
  ],

  "ml-production-incidents": [
    {
      id: "q-mls-kp40-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is a silent ML failure and why is it more dangerous than a system crash?",
      options: [
        "A model that generates predictions with no sound output.",
        "A model that continues to serve predictions and appears healthy by system metrics (uptime, latency, error rate) but is actually producing subtly wrong predictions due to data drift, feature bugs, or model degradation — undetected until business impact materializes.",
        "A failure that occurs only during low-traffic periods.",
        "A model crash that is not logged to the monitoring system.",
      ],
      correctAnswer: 1,
      explanation:
        "Silent failures are the most dangerous ML production issues: infrastructure is healthy (no errors, normal latency) but predictions are quietly wrong. Examples: feature pipeline bug causing all users to get the same features, data drift making the model output nonsense that passes schema validation. Detection requires business metric monitoring (revenue, engagement) and prediction distribution monitoring — not just system health checks.",
      hints: [
        "System monitoring catches crashes; business metric monitoring catches silent failures.",
        "No news is good news is a dangerous assumption for ML systems.",
      ],
    },
    {
      id: "q-mls-kp40-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "During a production incident, a recommendation model begins returning the same 10 items for all users. What is the most likely root cause and debugging approach?",
      options: [
        "The model weights were corrupted; restore from backup immediately.",
        "Investigate in order of likelihood: (1) feature pipeline bug returning constant or null features causing identical model inputs; (2) model serving bug such as cached response returned for all users; (3) diversity filter bug excluding all candidates except top-10; (4) upstream data outage returning empty user history. Compare features at serving time to training-time distribution, check feature freshness timestamps, and review recent deployments in all pipeline components.",
      ],
      correctAnswer: 1,
      explanation:
        "Homogeneous recommendation output is almost always a feature or serving bug, not a model bug. Debugging sequence: (1) is the model receiving identical inputs? Log feature vectors for different users; (2) is the serving layer caching? Check response headers; (3) is candidate generation filtering too aggressively? Log candidate counts at each pipeline stage; (4) recent deployment? Roll back the last change. Feature bugs (null/constant features) are the most common cause.",
    },
    {
      id: "q-mls-kp40-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Post-incident reviews (PIRs) for ML systems should include analysis of detection time (how long until the issue was detected) and recovery time (how long to restore normal service) to improve future incident response.",
      correctAnswer: "True",
      explanation:
        "ML incident PIRs should track: (1) detection time — was the issue caught by monitoring alerts or by user complaints? Alerts indicate mature monitoring; user complaints indicate monitoring gaps; (2) time to diagnose root cause; (3) recovery time; (4) impact (users affected, business cost). These metrics drive targeted investments: long detection time means improve monitoring; long diagnosis time means improve observability tooling; long recovery time means improve rollback automation.",
    },
  ],

};
registerQuestions(questions);
export default questions;
