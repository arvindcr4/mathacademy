import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'ml-engineering-mindset': [
    {
      id: 'q-prod-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which of the following best describes the primary concern of an ML engineer vs. an ML researcher?',
      options: [
        'Achieving state-of-the-art benchmark scores on academic datasets',
        'Reliably deploying, monitoring, and maintaining models in production systems',
        'Publishing novel training algorithms in peer-reviewed conferences',
        'Collecting and annotating raw training data from the web',
      ],
      correctAnswer: 1,
      explanation:
        'ML engineers focus on the full lifecycle of a model in production — reliability, latency, monitoring, and maintenance — rather than maximising benchmark metrics.',
      hints: [
        'Think about what happens after a model finishes training.',
        'Researchers care about accuracy; engineers care about what keeps a system running.',
      ],
    },
    {
      id: 'q-prod-kp1-2',
      type: 'true-false',
      difficulty: 'easy',
      question:
        'An ML engineer should be comfortable treating model deployment the same way a software engineer treats shipping a web service — with tests, CI/CD, and runbooks.',
      correctAnswer: 'true',
      explanation:
        'Production ML engineering borrows heavily from software engineering practices: versioning, automated testing, continuous integration, and operational runbooks all apply to model services.',
      hints: [
        'Consider whether a model endpoint has similar reliability requirements to a REST API.',
        'Think about what happens when a model silently degrades over time in production.',
      ],
    },
    {
      id: 'q-prod-kp1-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A team ships a model with 95% accuracy on its holdout set, but business stakeholders report it is performing poorly. What mindset gap does this most likely indicate?',
      options: [
        'The model was trained on too little data',
        'The team optimised for an offline metric that does not align with the real business objective',
        'The model architecture is too simple for the task',
        'The holdout set was too large',
      ],
      correctAnswer: 1,
      explanation:
        'A classic ML engineering pitfall is optimising a surrogate offline metric (e.g. accuracy) that does not capture what the business actually cares about (e.g. revenue, retention, precision at top-k).',
      hints: [
        'What does "performing poorly" mean to a business stakeholder vs. a data scientist?',
        'Consider whether accuracy on a static dataset reflects real-world user outcomes.',
      ],
    },
  ],

  'python-best-practices': [
    {
      id: 'q-prod-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which tool is most commonly used to enforce consistent code style in a Python ML project?',
      options: [
        'pytest',
        'ruff or black',
        'mypy',
        'hydra',
      ],
      correctAnswer: 1,
      explanation:
        'Formatters like black and linters like ruff automatically enforce a consistent style, preventing style debates and reducing diff noise in code reviews.',
      hints: [
        'Think about what a linter or autoformatter does vs. a type checker.',
        'The tool should enforce PEP 8 style automatically on save or in CI.',
      ],
    },
    {
      id: 'q-prod-kp2-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Using type annotations in Python ML code has no practical benefit because Python does not enforce types at runtime.',
      correctAnswer: 'false',
      explanation:
        'Type annotations enable static analysis tools (mypy, pyright) to catch bugs before runtime, improve IDE auto-complete, and serve as living documentation for tensor shapes and data contracts.',
      hints: [
        'Consider what tools read type annotations even if Python itself ignores them.',
        'Think about how type annotations help a new engineer understand a function\'s expected inputs.',
      ],
    },
    {
      id: 'q-prod-kp2-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In a Python ML codebase, what is the primary purpose of using a dependency manager like Poetry or pip-tools rather than a bare requirements.txt?',
      options: [
        'To speed up model training by parallelising package imports',
        'To pin transitive dependencies and ensure fully reproducible environments across machines',
        'To automatically select the fastest available GPU drivers',
        'To compress model weights before deployment',
      ],
      correctAnswer: 1,
      explanation:
        'Poetry and pip-tools generate lock files that pin every transitive dependency to an exact version, so environments are reproducible across developer machines, CI, and production containers.',
      hints: [
        'Think about what happens when a transitive dependency silently upgrades and breaks your code.',
        'A lock file records not just your direct dependencies but also their dependencies\' exact versions.',
      ],
    },
  ],

  'reproducibility-prod': [
    {
      id: 'q-prod-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'To make a PyTorch training run reproducible, which of the following seeds must be set?',
      options: [
        'Only torch.manual_seed()',
        'Only random.seed() and numpy.random.seed()',
        'torch.manual_seed(), random.seed(), numpy.random.seed(), and CUDA seeds',
        'Only the dataset shuffle seed',
      ],
      correctAnswer: 2,
      explanation:
        'Full reproducibility requires seeding all random number generators: Python\'s random, NumPy, PyTorch (CPU and CUDA), and optionally setting torch.backends.cudnn.deterministic = True.',
      hints: [
        'Consider how many separate RNG states exist in a typical PyTorch training loop.',
        'GPU operations have their own random state separate from the CPU.',
      ],
    },
    {
      id: 'q-prod-kp3-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Storing training hyperparameters in a YAML config file (instead of hardcoding them in a script) is sufficient on its own to guarantee experiment reproducibility.',
      correctAnswer: 'false',
      explanation:
        'A config file captures hyperparameters but reproducibility also requires pinned software environments (Docker/conda lock files), random seeds, and version-controlled data references.',
      hints: [
        'What else changes between runs besides hyperparameters?',
        'Consider library version drift and non-deterministic GPU operations.',
      ],
    },
    {
      id: 'q-prod-kp3-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the main advantage of containerising ML training jobs with Docker?',
      options: [
        'Containers automatically tune hyperparameters for the target hardware',
        'The exact OS, library versions, and CUDA toolkit are frozen, making environments reproducible across machines',
        'Docker containers run faster than native Python on GPUs',
        'Containers eliminate the need for version control',
      ],
      correctAnswer: 1,
      explanation:
        'A Docker image captures the entire software stack — OS, Python version, library versions, and CUDA toolkit — so the same image produces the same behaviour on any host.',
      hints: [
        'Think about what "environment" means beyond just pip packages.',
        'Consider the problem of "it works on my machine" in ML contexts.',
      ],
    },
  ],

  'testing-ml-code': [
    {
      id: 'q-prod-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which type of test verifies that a single data preprocessing function produces the correct output for a given input?',
      options: [
        'Integration test',
        'Load test',
        'Unit test',
        'Shadow test',
      ],
      correctAnswer: 2,
      explanation:
        'Unit tests isolate a single function or component and assert its output, making them the fastest and most targeted form of test.',
      hints: [
        'Think about the smallest testable unit of code.',
        'Unit tests do not require a database, model, or network connection.',
      ],
    },
    {
      id: 'q-prod-kp4-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'A model test that asserts loss decreases on a single mini-batch for at least one gradient step is a useful sanity check for a newly implemented neural network.',
      correctAnswer: 'true',
      explanation:
        'The "overfit one batch" test checks that gradients flow correctly and the optimizer can minimise the loss, catching bugs in the forward pass, loss function, or optimizer setup before full training.',
      hints: [
        'If a model can\'t overfit a single batch, something in the gradient computation is likely broken.',
        'This test is intentionally easy — you\'re checking mechanics, not generalisation.',
      ],
    },
    {
      id: 'q-prod-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What does an integration test for an ML inference service most appropriately verify?',
      options: [
        'That the model achieves >90% accuracy on the full test set',
        'That the preprocessing, model forward pass, and postprocessing work together end-to-end given a real input',
        'That each preprocessing function returns the correct dtype',
        'That the model training loop converges in fewer than 100 epochs',
      ],
      correctAnswer: 1,
      explanation:
        'Integration tests verify that multiple components (preprocessing → model → postprocessing) work correctly together, catching interface bugs that unit tests of individual components would miss.',
      hints: [
        'Think about what "integration" means: components working together, not in isolation.',
        'An integration test for inference would send a real (or realistic) request and check the full response.',
      ],
    },
  ],

  'ci-cd-ml': [
    {
      id: 'q-prod-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a CI/CD pipeline for ML, what is the purpose of the Continuous Integration (CI) stage?',
      options: [
        'Automatically retraining the model every time new data arrives',
        'Running automated tests and checks on every code commit to detect issues early',
        'Deploying the model to a GPU cluster for inference',
        'Storing model artifacts in an object store',
      ],
      correctAnswer: 1,
      explanation:
        'CI runs automated tests (unit, integration, linting) on every commit so that regressions are caught early, before code is merged or deployed.',
      hints: [
        'CI is about building confidence in the code change, not about deployment.',
        'Think about the first word: "Continuous Integration" — merging code safely and often.',
      ],
    },
    {
      id: 'q-prod-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In ML CI/CD, it is acceptable to skip model accuracy checks in the pipeline as long as all unit tests pass.',
      correctAnswer: 'false',
      explanation:
        'Unit tests verify code correctness but do not catch model quality regressions. ML pipelines should include model evaluation gates (e.g., accuracy must not drop below a threshold) before promotion.',
      hints: [
        'Code can be syntactically correct but produce a worse model due to a subtle bug.',
        'Think about what guarantees you need before deploying a new model version.',
      ],
    },
    {
      id: 'q-prod-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A GitHub Actions workflow for ML includes a step that trains a small smoke-test model and asserts its validation loss is below a threshold. What risk does this step primarily mitigate?',
      options: [
        'Overfitting on the full training dataset',
        'Silent regressions in model training code that would only be caught after a full expensive training run',
        'Data leakage between train and test splits',
        'Excessive GPU memory usage during inference',
      ],
      correctAnswer: 1,
      explanation:
        'A smoke-test training run on a small data subset catches bugs in the training code (wrong loss, broken optimizer, gradient issues) cheaply, before committing resources to a full training job.',
      hints: [
        'Think about the cost of discovering a training bug after running a multi-hour GPU job.',
        'A "smoke test" is designed to fail fast on critical breakages without full validation.',
      ],
    },
  ],

  'model-packaging': [
    {
      id: 'q-prod-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary advantage of exporting a PyTorch model to ONNX format for deployment?',
      options: [
        'ONNX models train faster than native PyTorch models',
        'ONNX enables the model to run on runtimes and hardware backends other than PyTorch, improving portability',
        'ONNX automatically quantises the model to int8',
        'ONNX models do not require a GPU to achieve good throughput',
      ],
      correctAnswer: 1,
      explanation:
        'ONNX is a portable intermediate representation that allows models to run on diverse inference runtimes (TensorRT, ONNX Runtime, CoreML) across CPUs, GPUs, and edge devices.',
      hints: [
        'Think about what "portability" means when you need to run on different hardware or frameworks.',
        'ONNX is a graph format — it separates the model definition from the execution runtime.',
      ],
    },
    {
      id: 'q-prod-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'TorchScript models can be loaded and executed in a C++ environment without a Python interpreter.',
      correctAnswer: 'true',
      explanation:
        'TorchScript compiles a PyTorch model to a serialised intermediate representation that the LibTorch C++ runtime can load and execute, enabling Python-free deployment.',
      hints: [
        'Consider why a production server might not want a Python interpreter in the inference path.',
        'TorchScript is designed for deployment — think about what "script" implies.',
      ],
    },
    {
      id: 'q-prod-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When packaging an ML model in Docker for production, what is the best practice regarding model weights?',
      options: [
        'Bake the model weights directly into the Docker image at build time',
        'Mount the model weights from a volume or pull them from an artifact store at container startup, keeping the image lean',
        'Store model weights as base64-encoded environment variables',
        'Redownload weights from HuggingFace Hub every time the container restarts',
      ],
      correctAnswer: 1,
      explanation:
        'Embedding large weights bloats the image and makes updates painful. Pulling weights from an artifact store (S3, GCS, MLflow) at startup keeps images small and decouples model versioning from image versioning.',
      hints: [
        'Think about what happens to image size and build time if you embed multi-GB weights.',
        'How would you update model weights without rebuilding and pushing a new Docker image?',
      ],
    },
  ],

  'rest-grpc-serving': [
    {
      id: 'q-prod-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Compared to REST/JSON, what is a key performance advantage of gRPC for ML model serving?',
      options: [
        'gRPC uses HTTP/2 and Protocol Buffers, resulting in smaller payloads and lower latency than JSON over HTTP/1.1',
        'gRPC automatically batches requests on the server side',
        'gRPC supports larger model sizes than REST',
        'gRPC does not require serialisation of inputs',
      ],
      correctAnswer: 0,
      explanation:
        'gRPC uses HTTP/2 (enabling multiplexing and header compression) and binary Protocol Buffers serialisation, which are significantly more efficient than text-based JSON over HTTP/1.1 for high-throughput serving.',
      hints: [
        'Compare the encoding: JSON is human-readable text; Protobuf is compact binary.',
        'Think about what HTTP/2 multiplexing means for concurrent inference requests.',
      ],
    },
    {
      id: 'q-prod-kp7-2',
      type: 'true-false',
      difficulty: 'easy',
      question:
        'REST APIs are always the wrong choice for ML model serving because they are slower than gRPC.',
      correctAnswer: 'false',
      explanation:
        'REST is simpler to consume from browsers and third-party clients, easier to debug, and perfectly adequate for many serving workloads. gRPC\'s advantages matter most in high-throughput, low-latency internal services.',
      hints: [
        'Consider who the client is — a browser, a mobile app, or an internal microservice.',
        'Think about developer experience and ecosystem support for each protocol.',
      ],
    },
    {
      id: 'q-prod-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A model serving system needs to support streaming of partial results (e.g., token-by-token LLM output). Which serving protocol is most naturally suited for this?',
      options: [
        'REST with polling',
        'gRPC with server-side streaming RPCs',
        'SOAP over HTTP/1.1',
        'WebSockets wrapped around a REST endpoint',
      ],
      correctAnswer: 1,
      explanation:
        'gRPC natively supports server-side streaming RPCs, allowing the server to push a sequence of messages to the client over a single connection — ideal for incremental LLM token generation.',
      hints: [
        'Think about which protocol has first-class support for streaming multiple responses to one request.',
        'LLM token streaming sends many small messages — polling would add significant latency.',
      ],
    },
  ],

  'batch-inference': [
    {
      id: 'q-prod-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Batch inference pipelines are most appropriate when:',
      options: [
        'Users need predictions within milliseconds of submitting a request',
        'Predictions for a large dataset can be computed offline and stored for later lookup',
        'The model must stream tokens in real time',
        'The model is deployed to an edge device with no internet connection',
      ],
      correctAnswer: 1,
      explanation:
        'Batch inference processes a large volume of inputs offline (e.g., nightly scoring), stores results, and serves them from a cache — trading real-time latency for high throughput and cost efficiency.',
      hints: [
        'Think about the trade-off between latency and throughput.',
        'Consider use cases like daily churn predictions or pre-computed recommendations.',
      ],
    },
    {
      id: 'q-prod-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Apache Spark can be used to distribute batch inference across a cluster by applying a UDF that calls the model on each partition of the dataset.',
      correctAnswer: 'true',
      explanation:
        'Spark\'s pandas UDFs (or mapInPandas) allow you to broadcast a serialised model to each worker and run inference partition-by-partition, scaling batch inference to datasets that exceed single-machine memory.',
      hints: [
        'Think about how Spark distributes data across partitions and how you would apply a function to each.',
        'A Spark UDF is just a function applied to rows or batches — a model predict call fits naturally.',
      ],
    },
    {
      id: 'q-prod-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When running batch inference with Ray on a GPU cluster, what technique significantly improves GPU utilisation compared to single-sample inference?',
      options: [
        'Using Ray\'s object store to cache model weights',
        'Accumulating multiple inputs into a batch before calling model.forward()',
        'Running the model in float64 precision',
        'Pinning each Ray actor to a separate CPU core',
      ],
      correctAnswer: 1,
      explanation:
        'GPUs are designed for parallel computation; running inference on batches of inputs instead of individual samples maximises GPU utilisation and dramatically increases throughput.',
      hints: [
        'Think about what makes GPU computation efficient vs. CPU computation.',
        'A GPU processes a matrix operation on a batch in nearly the same time as on a single sample.',
      ],
    },
  ],

  'streaming-ml': [
    {
      id: 'q-prod-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a streaming ML pipeline, what role does Apache Kafka play?',
      options: [
        'Training the model on new data as it arrives',
        'Acting as a durable, distributed message queue that buffers events between producers and consumers',
        'Storing model weights and serving predictions',
        'Transforming raw data into feature vectors offline',
      ],
      correctAnswer: 1,
      explanation:
        'Kafka is a distributed log that durably stores events from producers (e.g., user actions) and allows consumers (e.g., ML feature servers) to read them in real time or replay them.',
      hints: [
        'Think of Kafka as a highway between data-producing services and data-consuming ML systems.',
        'Kafka retains messages for a configurable period, allowing replay — unlike a simple queue.',
      ],
    },
    {
      id: 'q-prod-kp9-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Apache Flink supports exactly-once processing semantics, making it suitable for stateful streaming ML feature computation where correctness is critical.',
      correctAnswer: 'true',
      explanation:
        'Flink\'s checkpointing and two-phase commit protocol guarantee exactly-once semantics, ensuring that stateful aggregations (e.g., rolling feature counts) are neither lost nor double-counted even after failures.',
      hints: [
        'Think about what "exactly-once" means for a running sum used as an ML feature.',
        'Flink checkpoints state periodically — how does that enable recovery without reprocessing?',
      ],
    },
    {
      id: 'q-prod-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A streaming ML system computes a "30-second rolling average purchase amount" feature. What type of Flink construct is used to implement this?',
      options: [
        'A batch job that recomputes the average every 30 seconds from scratch',
        'A sliding window aggregation keyed by user ID over a 30-second window',
        'A stateless map function applied to each event independently',
        'A Kafka consumer group with manual offset management',
      ],
      correctAnswer: 1,
      explanation:
        'Flink\'s keyed sliding windows group events by key (user ID) within a time window, compute aggregations (average), and emit results at each slide interval — exactly the pattern for rolling ML features.',
      hints: [
        'Think about the two parts: "keyed" (per user) and "window" (30-second time frame).',
        'A sliding window emits results more frequently than its size — how does that differ from a tumbling window?',
      ],
    },
  ],

  'feature-store-prod': [
    {
      id: 'q-prod-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What problem does a feature store primarily solve in production ML systems?',
      options: [
        'Automatically selecting the best model architecture for a given task',
        'Ensuring feature consistency between training (offline) and serving (online) to prevent training-serving skew',
        'Compressing model weights for edge deployment',
        'Managing GPU memory allocation during distributed training',
      ],
      correctAnswer: 1,
      explanation:
        'A feature store provides a single source of truth for features, ensuring the exact same computation is used in training pipelines (offline store) and inference services (online store), eliminating training-serving skew.',
      hints: [
        'Training-serving skew occurs when a feature is computed differently at training vs. inference time.',
        'Think about what happens when a feature computed in Spark for training differs from its SQL implementation for serving.',
      ],
    },
    {
      id: 'q-prod-kp10-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In Feast, the offline store is used for low-latency feature retrieval during real-time model inference.',
      correctAnswer: 'false',
      explanation:
        'In Feast, the offline store (e.g., BigQuery, Parquet) is used for historical feature retrieval during training. The online store (e.g., Redis, DynamoDB) is used for low-latency retrieval during real-time inference.',
      hints: [
        'Think about the latency requirements: training runs overnight; serving must respond in milliseconds.',
        'Offline stores are optimised for batch reads; online stores are optimised for point lookups.',
      ],
    },
    {
      id: 'q-prod-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A recommendation system computes a "user\'s top-5 categories in the past 7 days" feature. In Feast, what process keeps the online store up to date with this feature?',
      options: [
        'A real-time Kafka consumer that updates the feature on every click event',
        'Materialisation: a scheduled job that reads pre-computed feature values from the offline store and writes them to the online store',
        'A Feast API call at inference time that queries the offline store directly',
        'A cron job that retrains the model and updates weights in the online store',
      ],
      correctAnswer: 1,
      explanation:
        'Feast materialisation runs a scheduled job (e.g., hourly) that reads the latest feature values from the offline store and pushes them to the low-latency online store, keeping it fresh without hitting the offline store at inference time.',
      hints: [
        'Think about why you wouldn\'t query BigQuery directly during a 10ms inference deadline.',
        'Materialisation is the bridge between the historical offline store and the real-time online store.',
      ],
    },
  ],

  'model-monitoring-prod': [
    {
      id: 'q-prod-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does "data drift" mean in the context of ML model monitoring?',
      options: [
        'The model\'s weights changing over time due to online learning',
        'A statistical shift in the distribution of input features compared to the training distribution',
        'The model\'s predictions becoming slower due to infrastructure degradation',
        'Gradual corruption of training data stored in a data lake',
      ],
      correctAnswer: 1,
      explanation:
        'Data drift occurs when the statistical distribution of live inference inputs shifts away from what the model was trained on, which can degrade model performance even if the model itself is unchanged.',
      hints: [
        'Think about what happens if user behaviour changes seasonally — do input feature distributions stay the same?',
        'Data drift is about the inputs changing, not the model weights.',
      ],
    },
    {
      id: 'q-prod-kp11-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'EvidentlyAI can detect both data drift and model performance degradation by comparing a reference dataset to a current production dataset.',
      correctAnswer: 'true',
      explanation:
        'EvidentlyAI generates reports comparing statistical properties (drift tests, data quality) and model metrics (accuracy, precision, recall) between a reference (training/validation) dataset and a current production window.',
      hints: [
        'Think about what you need two datasets for — before and after.',
        'EvidentlyAI is a monitoring library that takes reference and current datasets as input.',
      ],
    },
    {
      id: 'q-prod-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A fraud detection model\'s predicted fraud probability distribution shifts significantly, but the business reports that fraud rates have not actually changed. What is the most likely cause?',
      options: [
        'Concept drift — the relationship between features and fraud labels has changed',
        'Feature drift — the input feature distributions have shifted, causing the model to score inputs differently',
        'Model corruption — the model weights were overwritten in the registry',
        'Threshold drift — the decision threshold was automatically adjusted by the monitoring tool',
      ],
      correctAnswer: 1,
      explanation:
        'If actual fraud rates are stable but model scores shift, the input features themselves have likely drifted (e.g., a feature pipeline change), causing the model to produce different outputs for equivalent real-world events.',
      hints: [
        'Separate the symptoms: the model\'s output changed, but the ground-truth label rate did not.',
        'If the real world hasn\'t changed but model scores have, look at what changed in the input pipeline.',
      ],
    },
  ],

  'shadow-mode': [
    {
      id: 'q-prod-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In shadow mode deployment, what does the shadow model do with the traffic it receives?',
      options: [
        'It serves predictions to a randomly selected 10% of users',
        'It processes real production requests but its predictions are discarded and not shown to users',
        'It retrains itself on production data in real time',
        'It caches predictions from the champion model to reduce latency',
      ],
      correctAnswer: 1,
      explanation:
        'In shadow mode, the challenger model receives a copy of production traffic, runs inference, logs its predictions, but never returns results to users — allowing safe evaluation against real traffic.',
      hints: [
        'The whole point of shadow mode is that it\'s invisible to users.',
        'Think about how you would test a new model on real traffic without any user impact.',
      ],
    },
    {
      id: 'q-prod-kp12-2',
      type: 'true-false',
      difficulty: 'easy',
      question:
        'In a champion-challenger setup, the challenger model immediately replaces the champion if it achieves higher accuracy on a held-out validation set.',
      correctAnswer: 'false',
      explanation:
        'Promotion criteria typically include multiple gates: offline accuracy, online shadow performance, latency, resource usage, and often a formal A/B test — not just offline validation accuracy alone.',
      hints: [
        'A model that looks better offline might have worse latency or higher infrastructure cost.',
        'Think about all the dimensions on which production models are evaluated.',
      ],
    },
    {
      id: 'q-prod-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is a key operational consideration when running a shadow model alongside a champion model at full production traffic scale?',
      options: [
        'The shadow model must use the same hyperparameters as the champion',
        'Running two inference paths doubles compute and memory costs, requiring capacity planning',
        'Shadow mode requires the two models to share the same feature store',
        'The shadow model must be deployed to a different cloud region',
      ],
      correctAnswer: 1,
      explanation:
        'Shadow mode effectively runs two full inference stacks simultaneously; the duplicate compute and memory footprint must be accounted for in infrastructure capacity and cost planning.',
      hints: [
        'Think about what "shadow" means — a copy running in parallel with the same input volume.',
        'At production scale, doubling inference load has real cost and resource implications.',
      ],
    },
  ],

  'blue-green-deploy': [
    {
      id: 'q-prod-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a blue-green deployment for an ML model, what happens immediately after the green (new) deployment is validated?',
      options: [
        'The green deployment is gradually rolled out to 10% of traffic, then 50%, then 100%',
        'The load balancer switches all traffic from blue (old) to green (new) instantly',
        'Both deployments continue serving traffic indefinitely for comparison',
        'The blue deployment is retrained on new data while green serves traffic',
      ],
      correctAnswer: 1,
      explanation:
        'Blue-green deployment involves a full, instantaneous traffic cut-over from the old (blue) environment to the new (green) environment, enabling instant rollback by reverting the switch if issues arise.',
      hints: [
        'Blue-green is about having two identical environments and switching between them.',
        'The key property is zero-downtime and instant rollback — how does a gradual rollout differ?',
      ],
    },
    {
      id: 'q-prod-kp13-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Canary deployments reduce deployment risk by routing a small percentage of traffic to the new model version before promoting it to full traffic.',
      correctAnswer: 'true',
      explanation:
        'Canary deployments limit blast radius by exposing the new model to a small traffic slice (e.g., 5%), monitoring metrics, and gradually increasing traffic only if the model behaves correctly.',
      hints: [
        'Think about the origin of the term "canary" — an early warning system.',
        'If 5% of users see the new model, what fraction are impacted if it fails?',
      ],
    },
    {
      id: 'q-prod-kp13-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A canary deployment of a new recommendation model shows a 2% drop in click-through rate (CTR) for the canary slice. What is the correct response?',
      options: [
        'Continue rolling out because 2% is below the standard 5% significance threshold',
        'Roll back the canary and investigate the root cause before re-deploying',
        'Immediately promote the new model to 100% traffic since the canary is already running',
        'Increase the canary traffic percentage to gather more data before deciding',
      ],
      correctAnswer: 1,
      explanation:
        'A measurable negative business metric (CTR drop) in the canary slice is a signal to halt and roll back — the canary succeeded in its purpose by catching a regression before full exposure.',
      hints: [
        'The purpose of a canary is to catch problems early — what should you do when it does?',
        'Rolling back is safe and cheap; continuing a bad rollout is not.',
      ],
    },
  ],

  'llmops': [
    {
      id: 'q-prod-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which challenge is unique to operating LLMs in production compared to traditional ML models?',
      options: [
        'LLMs require more training data than classical models',
        'LLM outputs are non-deterministic and difficult to evaluate automatically without human or LLM-as-judge evaluation',
        'LLMs cannot be deployed on GPUs',
        'LLMs do not require monitoring once deployed',
      ],
      correctAnswer: 1,
      explanation:
        'Unlike classification models with scalar metrics, LLM output quality is hard to measure automatically — requiring specialised evaluation approaches like human ratings, reference-free metrics, or LLM-as-judge.',
      hints: [
        'Think about how you would automatically measure whether an LLM\'s answer is "good".',
        'Traditional accuracy or F1 doesn\'t apply to free-form text generation.',
      ],
    },
    {
      id: 'q-prod-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'LLMOps requires tracking prompt versions alongside model versions because changing a prompt can alter model behaviour as significantly as changing model weights.',
      correctAnswer: 'true',
      explanation:
        'Prompts are first-class artefacts in LLMOps — a prompt change can completely change output quality, tone, or correctness, so prompts must be versioned, tested, and deployed with the same rigour as code.',
      hints: [
        'Consider how a single word change in a system prompt can shift an LLM\'s persona or task focus.',
        'If you can\'t reproduce a bug because you don\'t know what prompt version was running, you have a versioning gap.',
      ],
    },
    {
      id: 'q-prod-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In production LLM systems, what is "hallucination" and how is it typically mitigated at the system level?',
      options: [
        'The model generating very long outputs; mitigated by max_tokens limits',
        'The model confidently generating factually incorrect information; mitigated by RAG, output validation, and human-in-the-loop checks',
        'The model repeating the same token in a loop; mitigated by repetition penalties',
        'The model refusing to answer due to safety filters; mitigated by prompt engineering',
      ],
      correctAnswer: 1,
      explanation:
        'Hallucination is an LLM generating plausible-sounding but incorrect facts. System-level mitigations include Retrieval-Augmented Generation (grounding answers in retrieved context), structured output validation, and escalation to human review for high-stakes outputs.',
      hints: [
        'Think about why an LLM would invent a citation that doesn\'t exist.',
        'If you can\'t eliminate hallucination at the model level, how do you design a system that handles it safely?',
      ],
    },
  ],

  'prompt-management': [
    {
      id: 'q-prod-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Why should prompts be stored in version control rather than hardcoded in application code?',
      options: [
        'Version control makes prompts run faster at inference time',
        'Version control enables tracking changes, rolling back regressions, and reviewing prompt changes like code changes',
        'Version control compresses prompts to reduce token costs',
        'Version control automatically evaluates prompt quality',
      ],
      correctAnswer: 1,
      explanation:
        'Storing prompts in version control (Git, a prompt registry) enables change history, code review, regression tracking, and rollback — treating prompts with the same engineering discipline as source code.',
      hints: [
        'What would happen if a prompt change caused a regression and you had no history of what changed?',
        'Think about how software teams handle changes to configuration that affects system behaviour.',
      ],
    },
    {
      id: 'q-prod-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'A/B testing prompt variants in production is a valid technique for determining which prompt formulation leads to better user outcomes.',
      correctAnswer: 'true',
      explanation:
        'Just as A/B testing compares model versions, it can compare prompt variants — routing traffic to different prompt formulations and measuring downstream business metrics to determine the better version.',
      hints: [
        'Think about how you would decide between two prompt phrasings without user data.',
        'A/B testing applies to any change that affects user-facing behaviour, including prompt changes.',
      ],
    },
    {
      id: 'q-prod-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A production prompt template references several dynamic variables (e.g., user name, retrieved documents). What is the main risk of managing these templates as raw f-strings in application code?',
      options: [
        'F-strings are slower than template engines',
        'Ad hoc string interpolation makes it easy to accidentally inject untrusted user content that can hijack the prompt (prompt injection)',
        'F-strings cannot be stored in version control',
        'Dynamic variables increase token count making the prompt more expensive',
      ],
      correctAnswer: 1,
      explanation:
        'Naive string interpolation without sanitisation allows untrusted user input to modify the prompt\'s instructions (prompt injection), potentially bypassing safety measures or leaking system prompt details.',
      hints: [
        'Think about SQL injection — what happens when user-controlled content is inserted into a structured query without escaping?',
        'Prompt injection exploits the same lack of input sanitisation, but in natural language.',
      ],
    },
  ],

  'cache-llm': [
    {
      id: 'q-prod-kp16-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary cost that LLM response caching aims to reduce?',
      options: [
        'GPU memory used during model weight loading',
        'Per-token API or compute costs for repeated identical or near-identical queries',
        'Network bandwidth for streaming token outputs',
        'Storage costs for model checkpoints',
      ],
      correctAnswer: 1,
      explanation:
        'LLM inference is charged per token (API) or incurs compute cost proportional to sequence length. Caching responses to common queries avoids re-running expensive inference for identical inputs.',
      hints: [
        'Think about how many users might ask the same FAQ and why you would compute the same answer repeatedly.',
        'Caching is always about avoiding redundant computation — what is the redundant computation here?',
      ],
    },
    {
      id: 'q-prod-kp16-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Exact-match caching (hashing the full prompt string) is sufficient for all LLM caching use cases because users always phrase questions identically.',
      correctAnswer: 'false',
      explanation:
        'Users rarely phrase questions identically. Semantic caching — embedding queries and retrieving cached responses for semantically similar inputs — is needed to achieve meaningful cache hit rates in real applications.',
      hints: [
        'Think about how many ways a user could ask "What is your return policy?"',
        'Exact-match caching is simple but has very low hit rates for natural language input.',
      ],
    },
    {
      id: 'q-prod-kp16-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'KV-cache (key-value cache) in transformer inference is different from semantic response caching. What does KV-cache specifically speed up?',
      options: [
        'Reusing computed attention keys and values for the prefix/context during autoregressive generation, avoiding redundant computation',
        'Storing the final output embedding to skip the decode step for repeated prompts',
        'Caching the model weights in GPU memory across requests',
        'Pre-computing embeddings for all possible user inputs',
      ],
      correctAnswer: 0,
      explanation:
        'KV-cache stores the attention key and value tensors computed for tokens already processed in the context, so during autoregressive generation each new token only requires attention computation over the new token, not the full sequence.',
      hints: [
        'Autoregressive generation produces one token at a time — what part of the computation is repeated for each new token?',
        'Think about the attention mechanism: if the prefix is fixed, its keys and values don\'t change.',
      ],
    },
  ],

  'rate-limiting-ml': [
    {
      id: 'q-prod-kp17-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary purpose of rate limiting on an ML API endpoint?',
      options: [
        'To improve model accuracy by limiting the number of predictions',
        'To protect the service from overload and ensure fair resource allocation across clients',
        'To prevent clients from using incorrect input formats',
        'To automatically scale up GPU instances when demand increases',
      ],
      correctAnswer: 1,
      explanation:
        'Rate limiting caps the number of requests a client can make per time window, protecting the ML service from traffic spikes, abuse, and resource exhaustion that would degrade service for all clients.',
      hints: [
        'Think about what happens if one client sends 10,000 requests per second to your GPU-backed endpoint.',
        'Rate limiting is a defensive mechanism — who or what is it protecting?',
      ],
    },
    {
      id: 'q-prod-kp17-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'An SLO (Service Level Objective) for an ML API might specify that 99% of inference requests must complete within 200ms, measured over a rolling 30-day window.',
      correctAnswer: 'true',
      explanation:
        'SLOs define measurable targets for service quality (e.g., latency percentiles, availability). A p99 latency SLO of 200ms over 30 days is a typical, concrete example for a low-latency ML inference service.',
      hints: [
        'An SLO is a target, not a guarantee — it\'s expressed as a percentage of time or requests.',
        'p99 means 99% of requests meet the threshold; 1% are allowed to be slower.',
      ],
    },
    {
      id: 'q-prod-kp17-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A token-bucket rate limiter allows bursts of traffic above the steady-state rate, while a leaky-bucket enforces a strict constant output rate. For an ML API serving interactive users, which property is more desirable?',
      options: [
        'Strict constant rate (leaky bucket), because it provides predictable GPU utilisation',
        'Burst allowance (token bucket), because users tend to send bursts of requests and brief spikes should be absorbed',
        'Neither — rate limiting should be disabled for interactive use cases',
        'Leaky bucket, because it rejects burst traffic immediately and reduces tail latency',
      ],
      correctAnswer: 1,
      explanation:
        'Interactive users often send short bursts (e.g., rapid follow-up questions). A token bucket absorbs these bursts gracefully while still enforcing a long-term average rate, providing a better user experience than a strict leaky bucket.',
      hints: [
        'Think about a user clicking refresh three times quickly — should all three requests be rate-limited equally?',
        'Token buckets accumulate "tokens" over time and spend them on requests, allowing temporal flexibility.',
      ],
    },
  ],

  'gpu-utilization': [
    {
      id: 'q-prod-kp18-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which command-line tool provides real-time GPU utilisation metrics (memory usage, GPU compute %, temperature) for NVIDIA GPUs?',
      options: [
        'htop',
        'nvidia-smi',
        'perf',
        'strace',
      ],
      correctAnswer: 1,
      explanation:
        'nvidia-smi (NVIDIA System Management Interface) provides real-time and summary statistics for NVIDIA GPUs including utilisation percentage, memory used/free, power draw, and running processes.',
      hints: [
        'This tool ships with the NVIDIA driver and has "nvidia" in its name.',
        'Think about what tool you would use to see if a training job is actually using the GPU.',
      ],
    },
    {
      id: 'q-prod-kp18-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'A GPU utilisation of 30% during model training typically means the GPU is being used efficiently and there is no room for improvement.',
      correctAnswer: 'false',
      explanation:
        '30% GPU utilisation is a strong signal of a CPU or I/O bottleneck (e.g., slow data loading), wasted compute, or a batch size too small. Good training pipelines aim for 80–100% GPU utilisation.',
      hints: [
        'If the GPU sits idle 70% of the time, what is it waiting for?',
        'Think about the data loading pipeline — is the GPU starved of batches?',
      ],
    },
    {
      id: 'q-prod-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'PyTorch Profiler identifies that a training step spends 40% of its time in cudaMemcpy (host-to-device transfers). What is the most effective fix?',
      options: [
        'Reduce the batch size to transfer less data per step',
        'Use pinned (page-locked) memory with DataLoader pin_memory=True and increase num_workers to overlap data loading with GPU computation',
        'Switch from float32 to float64 to reduce transfer size',
        'Disable gradient checkpointing to reduce memory copies',
      ],
      correctAnswer: 1,
      explanation:
        'Pinned memory enables faster, asynchronous host-to-device transfers. Combined with multiple DataLoader workers, data preparation and transfer can be overlapped with GPU kernel execution, hiding the transfer latency.',
      hints: [
        'If the GPU is waiting for data transfers, you need to either speed up the transfer or hide its latency.',
        'Pinned memory allows CUDA to initiate asynchronous (non-blocking) transfers.',
      ],
    },
  ],

  'model-versioning-prod': [
    {
      id: 'q-prod-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary purpose of an ML model registry (e.g., MLflow Model Registry)?',
      options: [
        'To train models faster using distributed compute',
        'To provide a centralised catalogue of model versions with metadata, lineage, and stage transitions (staging → production)',
        'To automatically select hyperparameters via Bayesian optimisation',
        'To store raw training datasets with version control',
      ],
      correctAnswer: 1,
      explanation:
        'A model registry is a centralised store tracking model versions, their associated metadata (training run, metrics, artefact URI), and lifecycle stages (development → staging → production), enabling governed model deployment.',
      hints: [
        'Think about what you need to know about a model before promoting it to production.',
        'A registry is like a package registry (npm, PyPI) but for model artefacts.',
      ],
    },
    {
      id: 'q-prod-kp19-2',
      type: 'true-false',
      difficulty: 'easy',
      question:
        'MLflow Tracking allows you to log metrics, parameters, and artefacts for each training run, making it easy to compare experiments.',
      correctAnswer: 'true',
      explanation:
        'MLflow Tracking records parameters (hyperparameters), metrics (loss, accuracy) over time, and artefacts (model files, plots) for each run, providing a searchable experiment history for comparison.',
      hints: [
        'Think about what information you would want to record for every training run to be able to reproduce or compare it.',
        'MLflow stores this automatically if you call mlflow.log_param(), mlflow.log_metric() in your training script.',
      ],
    },
    {
      id: 'q-prod-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A model is promoted to production in the MLflow registry. Two weeks later, a data scientist wants to understand exactly which training data, code version, and hyperparameters produced this model. What MLflow concept addresses this?',
      options: [
        'MLflow Projects — which packages training code as a reproducible unit',
        'MLflow Model Lineage — which links a registered model version back to its parent run, logging run parameters, code version (git hash), and data source',
        'MLflow Pipelines — which orchestrates multi-step ML workflows',
        'MLflow Flavours — which define the model\'s serving API',
      ],
      correctAnswer: 1,
      explanation:
        'MLflow links each registered model version to its parent training run, which records the git commit hash, hyperparameters, and data references — providing full lineage for audit, debugging, and reproduction.',
      hints: [
        'The question asks about tracing a model back to its origins — which MLflow concept tracks "where did this model come from?"',
        'A registered model version has a "source run" link in MLflow.',
      ],
    },
  ],

  'data-pipeline-prod': [
    {
      id: 'q-prod-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which practice most directly improves data pipeline reliability in production ML systems?',
      options: [
        'Running pipelines on spot/preemptible instances to reduce cost',
        'Adding data quality checks (schema validation, null checks, distribution tests) at each pipeline stage',
        'Training models more frequently to adapt to data changes',
        'Storing all pipeline outputs in a single monolithic database',
      ],
      correctAnswer: 1,
      explanation:
        'Data quality checks catch upstream data issues early, preventing corrupt or out-of-distribution data from silently propagating through the pipeline and degrading model quality in production.',
      hints: [
        'If bad data enters a pipeline undetected, where does it end up?',
        'Think about the principle of "fail fast" — catching problems at the source is cheaper than downstream.',
      ],
    },
    {
      id: 'q-prod-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Idempotency in data pipelines means that running the same pipeline step multiple times produces the same result as running it once, making retries safe.',
      correctAnswer: 'true',
      explanation:
        'Idempotent pipeline steps can be safely retried on failure without producing duplicate or corrupted data, which is critical for fault-tolerant production pipelines running on unreliable infrastructure.',
      hints: [
        'Think about what happens if a pipeline step fails halfway through and you restart it — do you get duplicate records?',
        'Idempotency is a design property, not something that happens automatically.',
      ],
    },
    {
      id: 'q-prod-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A daily batch ML pipeline reads from a data warehouse. On Monday morning it fails because a source table was not updated over the weekend. What architectural pattern prevents this silent upstream dependency failure?',
      options: [
        'Running the pipeline more frequently (hourly instead of daily)',
        'Implementing upstream data availability checks (SLA sensors) that block pipeline execution until source data freshness is confirmed',
        'Adding a retry loop that runs the pipeline every 10 minutes until it succeeds',
        'Switching the pipeline from batch to streaming mode',
      ],
      correctAnswer: 1,
      explanation:
        'SLA sensors (supported by tools like Airflow\'s ExternalTaskSensor or dbt\'s source freshness checks) halt pipeline execution until upstream data meets a freshness SLA, preventing downstream jobs from running on stale data.',
      hints: [
        'How would the pipeline know that the source table is ready before it starts processing?',
        'Tools like Airflow have built-in sensors that wait for external conditions before proceeding.',
      ],
    },
  ],

  'incident-response-ml': [
    {
      id: 'q-prod-kp21-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the first step when responding to a production ML incident (e.g., model accuracy suddenly drops)?',
      options: [
        'Immediately retrain the model on fresh data',
        'Detect and acknowledge the incident, assess impact, and page the on-call engineer',
        'Roll back to the previous model version without investigation',
        'Open a ticket and wait for the next sprint to address it',
      ],
      correctAnswer: 1,
      explanation:
        'Incident response starts with detection and acknowledgement: identifying that an incident is occurring, assessing its scope and business impact, and engaging the on-call responder — before any remediation action.',
      hints: [
        'You can\'t fix what you haven\'t diagnosed — what is the first thing you need to confirm?',
        'Think about the standard incident response lifecycle: detect → acknowledge → triage → mitigate.',
      ],
    },
    {
      id: 'q-prod-kp21-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'A post-incident review (post-mortem) for an ML system should be blameless and focused on identifying systemic failures rather than individual mistakes.',
      correctAnswer: 'true',
      explanation:
        'Blameless post-mortems foster psychological safety, encourage honest reporting, and identify systemic improvements (monitoring gaps, missing tests, process failures) rather than punishing individuals.',
      hints: [
        'If engineers fear blame, will they honestly report what went wrong?',
        'The goal of a post-mortem is to prevent the incident from recurring, not to assign fault.',
      ],
    },
    {
      id: 'q-prod-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A recommendation model begins returning empty recommendation lists for 20% of users. The fastest mitigation that avoids a full model rollback is:',
      options: [
        'Triggering an emergency full model retraining pipeline',
        'Activating a fallback serving path (e.g., returning popularity-based recommendations) while the root cause is diagnosed',
        'Disabling the recommendation feature entirely for all users',
        'Rolling back the data pipeline to last week\'s version',
      ],
      correctAnswer: 1,
      explanation:
        'A pre-built fallback (graceful degradation) maintains service quality for affected users while engineers diagnose the root cause without the pressure of a complete outage — a core resilience pattern.',
      hints: [
        'Think about "graceful degradation" — what is a safe default when the primary system fails?',
        'A fallback to a simpler system keeps users served while you fix the complex one.',
      ],
    },
  ],

  'cost-attribution': [
    {
      id: 'q-prod-kp22-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is cost attribution in ML systems?',
      options: [
        'Automatically reducing cloud costs by downscaling GPU clusters',
        'Tracking and allocating compute, storage, and API costs to specific teams, models, or features to enable accountability',
        'Estimating the cost of training a model before it is run',
        'Measuring the carbon footprint of ML training jobs',
      ],
      correctAnswer: 1,
      explanation:
        'Cost attribution tags cloud resource usage (GPU hours, storage, API calls) to owning teams, models, or products, enabling chargeback, accountability, and informed decisions about which models are worth their cost.',
      hints: [
        'Think about how a finance team would know which ML product is consuming most of the cloud budget.',
        'Attribution requires tagging resources — without tags, all costs appear as one undifferentiated line item.',
      ],
    },
    {
      id: 'q-prod-kp22-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Spot (preemptible) GPU instances can significantly reduce ML training costs but require training jobs to support checkpointing and automatic restarts.',
      correctAnswer: 'true',
      explanation:
        'Spot instances can be 60–90% cheaper than on-demand but can be terminated with short notice. Checkpointing training state allows jobs to resume from the last checkpoint after a spot interruption, making them viable for cost reduction.',
      hints: [
        'If your spot instance is reclaimed mid-training, what saves you from losing all progress?',
        'Checkpointing is the enabling technology that makes preemptible training practical.',
      ],
    },
    {
      id: 'q-prod-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A team discovers that 60% of their ML inference spend comes from 5% of user requests that trigger a large LLM. What cost optimisation strategy addresses this most directly?',
      options: [
        'Reducing the number of parameters in the LLM by half',
        'Routing simple queries to a smaller, cheaper model and only routing complex queries to the large LLM (model routing / cascading)',
        'Increasing the batch size for all LLM requests',
        'Migrating the LLM from GPU to CPU inference',
      ],
      correctAnswer: 1,
      explanation:
        'Model routing (cascading) uses a cheap classifier or smaller model to handle simple queries, reserving the expensive large model for queries that genuinely require it — directly targeting the high-cost 5% of requests.',
      hints: [
        'Not all queries need the most powerful model — can you identify the hard ones cheaply?',
        'Think about a tiered system: cheap model first, expensive model as a fallback.',
      ],
    },
  ],

  'security-ml-prod': [
    {
      id: 'q-prod-kp23-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which authentication mechanism is most commonly used to secure ML API endpoints in production?',
      options: [
        'HTTP Basic Auth with username and password',
        'API keys or OAuth 2.0 bearer tokens validated at an API gateway',
        'IP allowlisting as the sole security control',
        'No authentication, relying on obscurity of the endpoint URL',
      ],
      correctAnswer: 1,
      explanation:
        'API keys (for machine-to-machine) or OAuth 2.0 tokens (for user-facing services) are the standard for securing ML APIs, typically enforced at an API gateway before traffic reaches the model server.',
      hints: [
        'Think about how public cloud ML APIs (OpenAI, Google) authenticate their clients.',
        'HTTP Basic Auth sends credentials in every request and is not suitable for production APIs.',
      ],
    },
    {
      id: 'q-prod-kp23-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Model inversion attacks allow an adversary to partially reconstruct training data from a deployed model\'s predictions, making access control to the model API a security concern.',
      correctAnswer: 'true',
      explanation:
        'Model inversion and membership inference attacks can extract sensitive training data patterns from model predictions. Restricting API access, adding output perturbation, and rate limiting help mitigate these privacy attacks.',
      hints: [
        'If a model was trained on private medical records, can querying it enough times reveal those records?',
        'Think about privacy-preserving ML as a security concern, not just a research topic.',
      ],
    },
    {
      id: 'q-prod-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'An adversary sends carefully crafted input to an ML API to cause the model to produce incorrect but confident predictions (adversarial examples). At the serving layer, what is one practical defence?',
      options: [
        'Disabling GPU acceleration to slow down adversarial query generation',
        'Input preprocessing (e.g., input smoothing, feature sanitisation) and anomaly detection on input distributions to flag suspicious requests',
        'Using a larger model, which is inherently more robust to adversarial inputs',
        'Encrypting model weights so adversaries cannot compute gradients',
      ],
      correctAnswer: 1,
      explanation:
        'Serving-layer defences include input preprocessing (randomised smoothing, feature clipping) and distribution monitoring to detect out-of-distribution or adversarially structured inputs before they reach the model.',
      hints: [
        'Adversarial examples exploit small, structured perturbations — can you detect or disrupt that structure before inference?',
        'Think about what makes adversarial examples distinctive compared to natural inputs.',
      ],
    },
  ],

  'multi-region-ml': [
    {
      id: 'q-prod-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary user-facing benefit of deploying an ML model in multiple geographic regions?',
      options: [
        'Models in multiple regions train faster due to distributed compute',
        'Users are routed to the nearest region, reducing inference latency',
        'Multiple regions allow different model versions to run simultaneously',
        'Regional deployments reduce the need for model monitoring',
      ],
      correctAnswer: 1,
      explanation:
        'Routing requests to the geographically nearest region minimises network round-trip time, directly reducing inference latency for end users regardless of their location.',
      hints: [
        'Network latency is proportional to physical distance — what does placing compute near users accomplish?',
        'Think about why CDNs (Content Delivery Networks) distribute content geographically.',
      ],
    },
    {
      id: 'q-prod-kp24-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In a multi-region ML deployment, model weights and feature stores must be synchronised across regions to ensure consistent predictions.',
      correctAnswer: 'true',
      explanation:
        'Serving different model versions or stale features across regions produces inconsistent user experiences and makes debugging difficult. Synchronisation pipelines ensure all regions run the same model and feature data.',
      hints: [
        'If Region A has a newer model than Region B, users in different regions get different predictions for the same input.',
        'Think about the operational complexity of keeping artefacts in sync across regions.',
      ],
    },
    {
      id: 'q-prod-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A globally deployed ML service uses active-active multi-region architecture. During a regional outage, what mechanism redirects traffic to healthy regions?',
      options: [
        'Manual operator intervention to update DNS records',
        'Automated health checks with global load balancing (e.g., AWS Global Accelerator, Anycast routing) that detects unhealthy regions and re-routes traffic',
        'The model automatically replicates itself to a new region',
        'Clients retry on failure and discover healthy regions through a config file',
      ],
      correctAnswer: 1,
      explanation:
        'Global load balancers with health checks automatically detect regional failures and re-route traffic to healthy regions in seconds, providing the fault tolerance of active-active multi-region deployments.',
      hints: [
        'Manual DNS changes can take minutes to hours to propagate — too slow for an automated failover.',
        'Think about what "active-active" implies about the readiness of all regions to handle traffic.',
      ],
    },
  ],

  'on-device-prod': [
    {
      id: 'q-prod-kp25-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the main advantage of running ML inference on-device (e.g., mobile phone) rather than in the cloud?',
      options: [
        'On-device models have higher accuracy than cloud models',
        'Inference works offline and user data does not need to leave the device, improving privacy and reducing latency',
        'On-device deployment eliminates the need for model training',
        'Edge devices have more powerful GPUs than cloud data centres',
      ],
      correctAnswer: 1,
      explanation:
        'On-device inference enables offline operation, eliminates round-trip network latency, and keeps sensitive data on the user\'s device — critical for privacy-sensitive applications like health monitoring or on-device keyboard prediction.',
      hints: [
        'Think about what happens to a voice assistant if it requires internet connectivity for every word.',
        'Privacy: if the data never leaves the device, it can\'t be intercepted in transit.',
      ],
    },
    {
      id: 'q-prod-kp25-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Quantisation (e.g., converting float32 weights to int8) is commonly used for on-device ML deployment because it reduces model size and improves inference speed on constrained hardware.',
      correctAnswer: 'true',
      explanation:
        'Int8 quantisation reduces model size by ~4x and often accelerates inference on mobile NPUs and CPUs that have efficient integer arithmetic units, making models feasible on memory- and compute-constrained edge devices.',
      hints: [
        'float32 uses 4 bytes per weight; int8 uses 1 byte — what does that mean for a 100MB model?',
        'Mobile chips often have dedicated hardware for integer operations.',
      ],
    },
    {
      id: 'q-prod-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When deploying a TensorFlow Lite model to Android, which runtime feature allows the model to leverage the device\'s dedicated neural processing unit (NPU) instead of the CPU?',
      options: [
        'TFLite GPU delegate',
        'TFLite NNAPI delegate, which routes operations to hardware accelerators (DSP, NPU) via Android\'s Neural Networks API',
        'TFLite XNNPack delegate',
        'TFLite Flex delegate',
      ],
      correctAnswer: 1,
      explanation:
        'The NNAPI delegate allows TFLite to route supported operations to Android\'s Neural Networks API, which in turn maps them to the best available hardware accelerator (NPU, DSP, or GPU) on the device.',
      hints: [
        'NNAPI stands for Neural Networks API — it\'s Android\'s abstraction layer for hardware accelerators.',
        'Delegates in TFLite are plugins that offload computation to specialised hardware.',
      ],
    },
  ],

  'rag-production': [
    {
      id: 'q-prod-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a production RAG (Retrieval-Augmented Generation) system, what role does the vector database play?',
      options: [
        'It trains the LLM on retrieved documents',
        'It stores document embeddings and enables fast approximate nearest-neighbour search to retrieve relevant context for a query',
        'It caches LLM responses to reduce API costs',
        'It validates LLM outputs against a knowledge graph',
      ],
      correctAnswer: 1,
      explanation:
        'The vector database (e.g., Pinecone, Weaviate, Qdrant) stores pre-computed document embeddings and performs ANN search to find the most semantically relevant chunks for a given query, which are then injected into the LLM prompt.',
      hints: [
        'The "retrieval" in RAG happens here — how do you find relevant documents from millions of candidates quickly?',
        'Embeddings make semantic similarity searchable; a vector DB makes that search fast.',
      ],
    },
    {
      id: 'q-prod-kp26-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In production RAG, the quality of chunking strategy (how documents are split) significantly affects retrieval accuracy and LLM answer quality.',
      correctAnswer: 'true',
      explanation:
        'Chunks that are too small lose context; chunks that are too large exceed context windows or dilute relevance. Chunking strategy (size, overlap, semantic boundaries) directly affects which text is retrieved and how useful it is to the LLM.',
      hints: [
        'If a key sentence is split across two chunks, will either chunk be retrieved and be fully useful?',
        'Think about the trade-off between specificity (small chunks) and coherence (large chunks).',
      ],
    },
    {
      id: 'q-prod-kp26-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A production RAG system is evaluated and found to have high retrieval recall but poor answer quality. The most likely cause is:',
      options: [
        'The embedding model is too small and produces poor-quality vectors',
        'Relevant documents are being retrieved but the LLM is failing to synthesise them into a correct answer (generation failure, not retrieval failure)',
        'The vector database index needs to be rebuilt',
        'The chunk size is too small, causing insufficient context per chunk',
      ],
      correctAnswer: 1,
      explanation:
        'High retrieval recall means the correct documents are being found. Poor answer quality despite good retrieval points to a generation-side issue: the LLM may not be grounding its answer in the retrieved context, or the prompt is not instructing it to do so effectively.',
      hints: [
        'Separate retrieval quality from generation quality — they can fail independently.',
        'If the right documents are being retrieved but the answer is still wrong, the problem is in how the LLM uses them.',
      ],
    },
  ],

  'ab-testing-prod': [
    {
      id: 'q-prod-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the purpose of randomising user assignment to treatment and control groups in an A/B test for ML models?',
      options: [
        'To ensure both groups have equal sample sizes',
        'To eliminate selection bias, ensuring any observed difference in metrics is attributable to the model change rather than pre-existing user differences',
        'To prevent users from knowing which model they are using',
        'To reduce infrastructure cost by balancing load across model versions',
      ],
      correctAnswer: 1,
      explanation:
        'Random assignment ensures that the only systematic difference between groups is the model version, making it valid to attribute metric differences to the model change rather than user characteristics.',
      hints: [
        'If power users are assigned to the new model, higher metrics might reflect user quality, not model quality.',
        'Randomisation is the gold standard for causal inference — it balances confounders across groups.',
      ],
    },
    {
      id: 'q-prod-kp27-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Peeking at A/B test results before the pre-determined sample size is reached and stopping the test early inflates the false positive rate.',
      correctAnswer: 'true',
      explanation:
        'Early stopping based on interim results (peeking) is a form of multiple comparisons that dramatically inflates Type I error rates — you are more likely to declare a winner by chance if you stop whenever the result looks significant.',
      hints: [
        'Think about what happens if you check results every hour and stop when p < 0.05 — how often would you stop for a neutral change?',
        'Statistical significance at a fixed sample size is not the same as significance after repeated peeking.',
      ],
    },
    {
      id: 'q-prod-kp27-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A new ML ranking model shows a statistically significant +1.5% improvement in click-through rate in an A/B test. Before shipping, what additional check is most critical for an e-commerce platform?',
      options: [
        'Verifying that the model does not increase CPU usage by more than 10%',
        'Checking for novelty effects (the improvement may be driven by users\' curiosity about new results, not genuine quality) and guardrail metrics like revenue per session',
        'Ensuring the model\'s p-value is below 0.001 rather than 0.05',
        'Confirming the model was trained on at least 12 months of data',
      ],
      correctAnswer: 1,
      explanation:
        'CTR can temporarily spike due to novelty effects when results change. Checking guardrail metrics (revenue, add-to-cart, long-session CTR) and running the test long enough to wash out novelty are critical before attributing the gain to genuine model improvement.',
      hints: [
        'Users sometimes click more when results are new, regardless of quality — how would you detect that?',
        'What business metric ultimately matters more than CTR for an e-commerce platform?',
      ],
    },
  ],

  'feedback-loops': [
    {
      id: 'q-prod-kp28-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is a "feedback loop" in the context of production ML systems?',
      options: [
        'A gradient update step in the training loop',
        'A cycle where model predictions influence user behaviour, which generates new training data that reinforces the model\'s biases',
        'A monitoring alert that triggers model retraining',
        'A recursive neural network architecture',
      ],
      correctAnswer: 1,
      explanation:
        'Feedback loops occur when model outputs affect the data collected to train future models — e.g., a recommendation model that only shows popular items generates data showing popular items are clicked, amplifying their dominance.',
      hints: [
        'Think about a recommender system: if it only recommends item A, what does the click data look like?',
        'The loop closes when model decisions shape the future training distribution.',
      ],
    },
    {
      id: 'q-prod-kp28-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Online learning systems that update model weights in real time from user feedback can be vulnerable to adversarial manipulation if feedback is not validated.',
      correctAnswer: 'true',
      explanation:
        'If an adversary can generate feedback signals (e.g., fake clicks, fraudulent ratings), they can steer online learning updates to degrade model quality or inject biased behaviour — a key security concern for real-time learning systems.',
      hints: [
        'If an adversary generates 10,000 fake clicks on a specific item, what does an online learning model do?',
        'Think about who controls the feedback signal and whether it can be gamed.',
      ],
    },
    {
      id: 'q-prod-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A content moderation model automatically removes posts it classifies as harmful. Over time, reported harmful content decreases, but auditors find the model is increasingly over-removing benign content. What feedback loop dynamic explains this?',
      options: [
        'The model is underfit and needs more capacity',
        'The model\'s actions suppress the harmful content it was trained to detect, leaving only hard-to-classify edge cases and shifting the distribution of remaining content toward false positives',
        'The training data is too small for the model to generalise',
        'The model is experiencing catastrophic forgetting due to frequent retraining',
      ],
      correctAnswer: 1,
      explanation:
        'By removing easily detectable harmful content, the model creates a survivorship-biased distribution of remaining content — harder, more ambiguous posts — leading to more false positives as the model extrapolates beyond its training distribution.',
      hints: [
        'If the model successfully removes 99% of obvious harmful content, what kind of content is left for it to evaluate?',
        'Think about how the data distribution shifts when the model\'s actions change what data it sees.',
      ],
    },
  ],

  'ml-oncall': [
    {
      id: 'q-prod-kp29-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which of the following is the most actionable type of alert for an ML on-call engineer?',
      options: [
        'An alert that fires whenever any metric changes by more than 0.1%',
        'An alert tied to a specific SLO violation (e.g., "p99 latency exceeded 500ms for 5 consecutive minutes") with a clear runbook',
        'An email summary of all model performance metrics sent at midnight',
        'A dashboard that requires manual inspection to detect anomalies',
      ],
      correctAnswer: 1,
      explanation:
        'Actionable alerts are precise (specific SLO violation), timely (5-minute window), and paired with a runbook so the on-call engineer knows exactly what to investigate and how to respond.',
      hints: [
        'Think about the difference between an alert that tells you something is wrong vs. one that tells you what to do.',
        'Alert fatigue comes from imprecise alerts — how do you make an alert that only fires when action is needed?',
      ],
    },
    {
      id: 'q-prod-kp29-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'A runbook for an ML incident should include both diagnostic steps (how to determine the root cause) and mitigation steps (how to restore service), not just one or the other.',
      correctAnswer: 'true',
      explanation:
        'Effective runbooks cover the full response lifecycle: how to diagnose what is wrong and how to mitigate it — ideally in priority order so on-call engineers can restore service quickly while the investigation continues.',
      hints: [
        'Diagnosis without mitigation leaves you knowing the problem but not fixing it.',
        'Mitigation without diagnosis means you might restore service temporarily but not prevent recurrence.',
      ],
    },
    {
      id: 'q-prod-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'An ML service has a high alert volume, causing on-call engineers to ignore many alerts. What is the most effective long-term fix for alert fatigue in ML systems?',
      options: [
        'Increasing the on-call rotation to have more engineers available',
        'Auditing and tuning alert thresholds, retiring noisy alerts, and ensuring every alert is actionable and mapped to a runbook',
        'Raising all alert thresholds by 50% to reduce volume',
        'Switching from automated alerts to manual daily dashboard reviews',
      ],
      correctAnswer: 1,
      explanation:
        'Alert fatigue is best addressed by improving alert quality: auditing which alerts are acted upon, tuning thresholds to reduce noise, retiring duplicate or low-signal alerts, and ensuring each alert links to an actionable runbook.',
      hints: [
        'More engineers don\'t fix the underlying problem — too many low-quality alerts.',
        'Think about what properties make an alert worth waking someone up for.',
      ],
    },
  ],

  'platform-engineering-ml': [
    {
      id: 'q-prod-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the goal of an ML platform engineering team?',
      options: [
        'To train production-level ML models for internal business use cases',
        'To build and maintain self-serve infrastructure and tooling that enables ML practitioners to train, evaluate, and deploy models efficiently',
        'To manage data labelling pipelines and annotation quality',
        'To define the company\'s ML research agenda',
      ],
      correctAnswer: 1,
      explanation:
        'ML platform teams build the "paved road" — shared infrastructure, training clusters, experiment tracking, feature stores, deployment pipelines — that enables data scientists and ML engineers to be self-sufficient and productive.',
      hints: [
        'Think about the difference between the team that uses the road and the team that builds and maintains it.',
        'Self-serve implies practitioners don\'t need to file tickets with the platform team for every common task.',
      ],
    },
    {
      id: 'q-prod-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'An internal developer portal for ML (e.g., built on Backstage) can help ML practitioners discover shared components, data assets, and model templates, reducing duplicated work across teams.',
      correctAnswer: 'true',
      explanation:
        'Developer portals provide discoverability for shared ML assets (feature pipelines, base model templates, monitoring dashboards), preventing teams from independently rebuilding equivalent infrastructure and enabling reuse.',
      hints: [
        'Think about how many teams independently build the same feature engineering pipeline without knowing others have done it.',
        'A portal is a catalogue — discoverability enables reuse.',
      ],
    },
    {
      id: 'q-prod-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A fast-growing ML org has 50 data scientists but only 5 ML engineers. What platform capability most directly increases data scientist autonomy and reduces the bottleneck on ML engineers?',
      options: [
        'A more powerful experiment tracking tool that logs more metrics',
        'A self-serve model deployment pipeline where data scientists can push a trained model and have it automatically containerised, tested, and deployed with minimal ML engineer involvement',
        'A shared GPU cluster that gives data scientists more compute for training',
        'A centralised data lake with better query performance',
      ],
      correctAnswer: 1,
      explanation:
        'A self-serve deployment pipeline removes the need for ML engineers to manually containerise and deploy each model — the highest-leverage platform investment for scaling ML capacity without linearly scaling the engineering headcount.',
      hints: [
        'The bottleneck is ML engineer time on deployment tasks — what removes them from that critical path?',
        'Self-serve means a data scientist can go from trained model to production without filing a ticket.',
      ],
    },
  ],
}

registerQuestions(questions)
export default questions
