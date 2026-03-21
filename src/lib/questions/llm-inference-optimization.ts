import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  // Topic 1: Inference Fundamentals
  "inference-bottlenecks": [
    {
      id: "q-inf-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What are the two main types of bottlenecks in LLM inference?",
      options: [
        "Network and storage bottlenecks",
        "Memory-bound (attention) and compute-bound (FFN) operations",
        "CPU and GPU bottlenecks",
        "Training and inference bottlenecks",
      ],
      correctAnswer: 1,
      explanation:
        "LLM inference has two distinct bottleneck types: (1) Memory-bound operations like attention are limited by memory bandwidth - the model needs to read weights from VRAM faster than it can compute. (2) Compute-bound operations like the feed-forward network (FFN) layers are limited by GPU compute capacity. Understanding which is the bottleneck helps choose optimization strategies.",
      hints: [
        "Attention involves loading large KV caches from memory",
        "The FFN layers involve matrix multiplications that use lots of compute",
      ],
    },
    {
      id: "q-inf-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is the decode phase of LLM inference often memory-bound rather than compute-bound?",
      options: [
        "Because the model weights are too large",
        "Because generating one token at a time means low arithmetic intensity - loading billions of parameters to compute one token",
        "Because GPUs are not optimized for inference",
        "Because the KV cache grows too large",
      ],
      correctAnswer: 1,
      explanation:
        "During decode, the model generates one token at a time. For each token, it must load all model weights from VRAM but only performs a small amount of computation per parameter (one multiply-add). This low arithmetic intensity (compute/memory ratio) means memory bandwidth is the bottleneck. This is why batching helps - it amortizes the weight loading cost across multiple sequences.",
      hints: [
        "Arithmetic intensity = FLOPs / bytes loaded",
        "One token = billions of parameters loaded for minimal compute",
      ],
    },
  ],

  "prefill-decode": [
    {
      id: "q-inf-3",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key difference between the prefill and decode phases in LLM inference?",
      options: [
        "Prefill uses CPU, decode uses GPU",
        "Prefill processes the entire prompt in parallel, decode generates tokens autoregressively one at a time",
        "Prefill is optional, decode is required",
        "Prefill is compute-bound, decode is memory-bound",
      ],
      correctAnswer: 1,
      explanation:
        "Prefill processes all prompt tokens simultaneously using parallel attention, making it compute-bound and fast. Decode generates output tokens sequentially - each token depends on all previous tokens, forcing serial generation. This is why decode dominates latency for long outputs while prefill dominates for long prompts.",
      hints: [
        "Prefill = process prompt all at once",
        "Decode = one token at a time, sequentially",
      ],
    },
    {
      id: "q-inf-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "For a chatbot application with short prompts (50 tokens) but long responses (1000 tokens), which phase dominates total latency?",
      options: [
        "Prefill dominates",
        "Decode dominates",
        "They are equal",
        "It depends on the model size",
      ],
      correctAnswer: 1,
      explanation:
        "Decode dominates because it must run 1000 times (once per output token) while prefill runs once for 50 tokens. Even though each decode step is fast (~10-50ms), 1000 sequential steps add up to 10-50 seconds. Prefill for 50 tokens might only take 100-500ms total.",
      hints: [
        "Decode runs once per output token",
        "1000 tokens × 30ms/token = 30 seconds",
      ],
    },
  ],

  "kv-cache-basics": [
    {
      id: "q-inf-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the KV cache and why is it essential for efficient LLM inference?",
      options: [
        "A cache of model weights for faster loading",
        "Storage of key and value tensors from attention layers to avoid recomputing them for previous tokens",
        "A cache of user prompts for deduplication",
        "Storage of intermediate activations for backpropagation",
      ],
      correctAnswer: 1,
      explanation:
        "The KV cache stores the key (K) and value (V) tensors computed during attention for all previous tokens. Without it, generating each new token would require recomputing attention over all previous tokens, making generation O(n²) instead of O(n). The trade-off is memory: KV cache grows linearly with sequence length and number of layers.",
      hints: [
        "Attention computes Q × K^T × V",
        "For each new token, we only need new Q, but all previous K and V",
      ],
    },
    {
      id: "q-inf-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For a 70B parameter model with 80 layers, hidden dimension 8192, what's the approximate KV cache memory for a 4096 token sequence with batch size 1 (fp16)?",
      options: [
        "~500 MB",
        "~5 GB",
        "~50 GB",
        "~500 GB",
      ],
      correctAnswer: 1,
      explanation:
        "KV cache size = 2 (K+V) × layers × hidden_dim × seq_len × bytes_per_element × batch. For this example: 2 × 80 × 8192 × 4096 × 2 bytes = 10.7 GB. Note: with grouped-query attention (GQA), the K cache can be smaller since multiple query heads share one KV head.",
      hints: [
        "Formula: 2 × layers × hidden_dim × seq_len × 2 bytes",
        "80 × 8192 × 4096 × 4 bytes ≈ 10 GB",
      ],
    },
  ],

  "inference-metrics": [
    {
      id: "q-inf-7",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "TTFT (Time to First Token) measures:",
      options: [
        "Total generation time",
        "Time from request arrival to first output token (prefill time)",
        "Time between consecutive tokens",
        "Time to load model weights",
      ],
      correctAnswer: 1,
      explanation:
        "TTFT (Time to First Token) measures the latency from when a request arrives to when the first output token is generated. This is dominated by the prefill phase. For chat applications, low TTFT is critical for perceived responsiveness - users expect the first token within 100-500ms.",
      hints: [
        "TTFT = prefill + scheduling overhead",
        "Users notice high TTFT as 'lag' before response starts",
      ],
    },
    {
      id: "q-inf-8",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What does TBT (Time Between Tokens) measure in LLM inference?",
      options: [
        "Time to batch tokens",
        "Latency between consecutive output tokens during the decode phase",
        "Time to begin training",
        "Token batching threshold",
      ],
      correctAnswer: 1,
      explanation:
        "TBT (Time Between Tokens) or inter-token latency measures the time to generate each subsequent token after the first. This is the decode phase latency per token. Consistent low TBT (e.g., 20-50ms) is important for smooth streaming responses in chat applications.",
      hints: [
        "TBT = decode latency per token",
        "Streaming UX requires consistent low TBT",
      ],
    },
  ],

  "attention-complexity": [
    {
      id: "q-inf-9",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is standard attention complexity O(n²) in sequence length, and how does this affect long-context inference?",
      options: [
        "Because the model has n² parameters",
        "Because each token's attention requires computing similarity with all previous tokens, creating a n×n attention matrix",
        "Because memory grows quadratically",
        "Because the optimizer requires n² steps",
      ],
      correctAnswer: 1,
      explanation:
        "Standard attention computes Q×K^T, creating an n×n matrix where n is sequence length. For each new token, attention compares against all previous tokens. This means: (1) compute scales as O(n²), (2) memory for attention scores scales as O(n²), and (3) KV cache scales as O(n). Flash Attention helps by never materializing the full n×n matrix.",
      hints: [
        "Attention matrix shape: (seq_len, seq_len)",
        "Each new token attends to all previous tokens",
      ],
    },
  ],

  // Topic 2: Batching Strategies
  "static-batching": [
    {
      id: "q-inf-10",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the main limitation of static batching in LLM inference?",
      options: [
        "It's too slow",
        "Requests must wait for the batch to fill or for the longest sequence to complete, wasting GPU cycles",
        "It requires too much memory",
        "It doesn't support parallel processing",
      ],
      correctAnswer: 1,
      explanation:
        "Static batching groups requests together and processes them as a batch, but has two inefficiencies: (1) Requests wait for the batch to fill before starting, increasing latency. (2) When sequences finish at different times, GPU slots sit idle waiting for the longest sequence. A batch of 8 requests where one takes 10x longer wastes significant compute.",
      hints: [
        "Static = fixed batch, wait for all to complete",
        "Short sequences finish fast but wait for slow ones",
      ],
    },
  ],

  "continuous-batching": [
    {
      id: "q-inf-11",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does continuous batching (iteration-level scheduling) improve GPU utilization over static batching?",
      options: [
        "It uses larger batches",
        "It inserts new requests into the batch as soon as previous requests complete, keeping the GPU fully utilized",
        "It processes requests in parallel on multiple GPUs",
        "It compresses the requests",
      ],
      correctAnswer: 1,
      explanation:
        "Continuous batching checks after each decode iteration which sequences have finished (hit EOS token). Finished sequences are immediately replaced with waiting requests. This eliminates idle GPU slots and ensures the batch is always full. Systems like vLLM and Orca achieve 2-3x higher throughput than static batching.",
      hints: [
        "Think of it as a dynamic queue - out goes finished, in comes new",
        "No waiting for slow sequences",
      ],
    },
  ],

  "pagedattention": [
    {
      id: "q-inf-12",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How does PagedAttention (vLLM) solve KV cache memory fragmentation?",
      options: [
        "By using larger memory blocks",
        "By storing KV cache in non-contiguous fixed-size blocks (pages) allocated on-demand, like virtual memory",
        "By compressing the KV cache",
        "By sharing KV cache between all requests",
      ],
      correctAnswer: 1,
      explanation:
        "PagedAttention divides KV cache into fixed-size blocks (pages) that can be non-contiguous in memory. Instead of pre-allocating the maximum sequence length for each request, pages are allocated on-demand as sequences grow. This eliminates fragmentation from variable-length sequences and enables memory sharing for prefix caching.",
      hints: [
        "Similar to OS virtual memory with pages",
        "Allocate only what you need, when you need it",
      ],
    },
    {
      id: "q-inf-13",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What throughput improvement does vLLM typically achieve over HuggingFace Transformers for LLM serving?",
      options: [
        "10-20% improvement",
        "2-4x improvement",
        "10x improvement",
        "No significant difference",
      ],
      correctAnswer: 1,
      explanation:
        "vLLM typically achieves 2-4x higher throughput than HuggingFace Transformers with standard implementations. The gains come from: (1) PagedAttention eliminating memory waste, (2) continuous batching, (3) optimized CUDA kernels, and (4) efficient KV cache management. Gains are highest with variable-length sequences and high batch sizes.",
      hints: [
        "Memory efficiency translates to higher batch sizes",
        "More concurrent requests = higher throughput",
      ],
    },
  ],

  "chunked-prefill": [
    {
      id: "q-inf-14",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What problem does chunked prefill solve, and how does it work?",
      options: [
        "It solves memory issues by compressing prompts",
        "It breaks long prefill into chunks interleaved with decode steps to prevent long TTFT for waiting requests",
        "It batches multiple prefills together",
        "It caches prefill results",
      ],
      correctAnswer: 1,
      explanation:
        "Long prompts have long prefill times, causing waiting requests to starve. Chunked prefill splits a long prefill into smaller chunks, interleaving them with decode steps from other requests. This ensures decode requests make progress even while processing a 10k token prompt, improving overall latency distribution.",
      hints: [
        "Long prefill = long wait for others",
        "Chunk it up and share the GPU",
      ],
    },
  ],

  "prefix-caching": [
    {
      id: "q-inf-15",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Prefix caching reuses KV cache across requests. When is this most beneficial?",
      options: [
        "When all requests are unique",
        "When requests share common prefixes (system prompts, few-shot examples, long context documents)",
        "When requests are very short",
        "When the model is small",
      ],
      correctAnswer: 1,
      explanation:
        "Prefix caching shines when multiple requests share common prefixes. Examples: system prompts ("You are a helpful assistant"), RAG with the same retrieved documents, or few-shot examples. Instead of recomputing KV cache for the shared prefix, it's cached and reused, reducing prefill time by the prefix length.",
      hints: [
        "Think RAG: same documents, different questions",
        "System prompts are identical across requests",
      ],
    },
  ],

  // Topic 3: Quantization
  "ptq-basics": [
    {
      id: "q-inf-16",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is Post-Training Quantization (PTQ)?",
      options: [
        "Training a model with lower precision from the start",
        "Reducing model precision (e.g., FP16 → INT8) after training without retraining",
        "Compressing the model using pruning",
        "Distilling the model to a smaller size",
      ],
      correctAnswer: 1,
      explanation:
        "PTQ converts a trained model from high precision (FP16/FP32) to lower precision (INT8, INT4) without additional training. This reduces memory usage and can speed up inference on hardware with INT8 support. The quality loss varies - INT8 is usually safe, INT4 may require calibration or fine-tuning.",
      hints: [
        "Post-training = after model is trained",
        "Quantize = reduce precision",
      ],
    },
  ],

  "gptq-awq": [
    {
      id: "q-inf-17",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does AWQ (Activation-aware Weight Quantization) differ from GPTQ?",
      options: [
        "AWQ is faster to train",
        "AWQ protects weights that are important for large activations, rather than treating all weights equally",
        "AWQ only works for vision models",
        "AWQ uses lower precision",
      ],
      correctAnswer: 1,
      explanation:
        "AWQ observes that not all weights are equally important - weights connected to large activation values matter more for output quality. It identifies and protects these salient weights during quantization, keeping them in higher precision. This achieves better quality than GPTQ at the same precision, especially for INT4.",
      hints: [
        "Activation-aware = consider what affects the output",
        "Protect important weights",
      ],
    },
  ],

  "int8-int4": [
    {
      id: "q-inf-18",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the typical quality trade-off when quantizing from FP16 to INT4?",
      options: [
        "No quality loss",
        "Minor quality loss (1-3%) with 4x memory reduction",
        "Major quality loss (>10%) but 8x speedup",
        "Quality improves due to regularization",
      ],
      correctAnswer: 1,
      explanation:
        "INT4 quantization typically shows 1-3% quality degradation on benchmarks while reducing memory by 4x (FP16 → INT4). With advanced methods like AWQ or GPTQ, the quality loss can be minimal. However, INT4 may struggle with tasks requiring high numerical precision (math, reasoning) where the quantization noise affects accuracy.",
      hints: [
        "4 bits vs 16 bits = 4x smaller",
        "Quality cost is usually acceptable with good methods",
      ],
    },
  ],

  "kv-cache-quant": [
    {
      id: "q-inf-19",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why might you want to quantize the KV cache, and what's the trade-off?",
      options: [
        "To improve accuracy",
        "To reduce memory pressure for long contexts, trading slight quality for 2-4x KV cache reduction",
        "To speed up training",
        "To enable multi-GPU inference",
      ],
      correctAnswer: 1,
      explanation:
        "KV cache grows linearly with sequence length and is often the memory bottleneck for long-context inference. Quantizing it to FP8 or INT8 reduces memory by 2-4x, enabling longer contexts or larger batches. The trade-off is potential quality degradation, especially for tasks sensitive to accumulated numerical errors.",
      hints: [
        "Long context = massive KV cache",
        "Compressing KV cache = more room for longer sequences",
      ],
    },
  ],

  // Topic 4: Speculative Decoding
  "speculative-decoding-basics": [
    {
      id: "q-inf-20",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does speculative decoding accelerate inference?",
      options: [
        "By using a faster model permanently",
        "By using a small draft model to generate candidates, then verifying them in parallel with the main model",
        "By skipping some layers",
        "By generating multiple tokens per forward pass",
      ],
      correctAnswer: 1,
      explanation:
        "Speculative decoding uses a small, fast draft model to speculate multiple tokens ahead. The main model then verifies all these tokens in a single forward pass. Accepted tokens are kept; rejected tokens are discarded and regenerated. This works because verifying is faster than generating, and well-aligned draft models have high acceptance rates.",
      hints: [
        "Draft = guess, Main = verify",
        "Parallel verification is faster than serial generation",
      ],
    },
  ],

  "draft-models": [
    {
      id: "q-inf-21",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What makes a good draft model for speculative decoding?",
      options: [
        "The largest possible model",
        "A model much smaller than the main model but with similar token distribution",
        "A model trained on different data",
        "A vision model",
      ],
      correctAnswer: 1,
      explanation:
        "A good draft model must: (1) Be fast enough that speculation overhead is low, (2) Have high acceptance rate (match the main model's distribution). Options include: same model at lower precision, smaller model from same family (Llama 7B drafting for Llama 70B), or models specifically trained to mimic the main model.",
      hints: [
        "Speed + alignment = good draft model",
        "Same family, smaller size often works well",
      ],
    },
  ],

  "acceptance-rate": [
    {
      id: "q-inf-22",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "If a draft model has 70% per-token acceptance rate, what's the expected speedup for speculative decoding with 4 speculation length?",
      options: [
        "~1.1x",
        "~1.5-2x",
        "~4x",
        "~10x",
      ],
      correctAnswer: 1,
      explanation:
        "With 70% acceptance and speculation length 4, on average ~2.4 tokens are accepted per speculation round (70%^1 + 70%^2 + 70%^3 + 70%^4 ≈ 2.4). If draft overhead is 20% of main model time, speedup ≈ 2.4/(1+0.2) ≈ 2x. Real speedups of 1.5-2.5x are common with well-tuned draft models.",
      hints: [
        "Need to account for draft model overhead",
        "Higher acceptance = more tokens accepted per round",
      ],
    },
  ],

  "medusa-heads": [
    {
      id: "inf-kp-20-q1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How do Medusa heads differ from traditional speculative decoding?",
      options: [
        "Medusa uses multiple main models",
        "Medusa adds extra prediction heads to the model itself, eliminating the need for a separate draft model",
        "Medusa only works for encoder models",
        "Medusa requires no training",
      ],
      correctAnswer: 1,
      explanation:
        "Medusa adds multiple prediction heads on top of the main model's final layer, each predicting tokens at different offsets (next token, token+1, token+2, etc.). Since these share the base model, there's no separate draft model overhead. The heads are trained with a small amount of fine-tuning. This achieves 2-3x speedup without the complexity of managing two models.",
      hints: [
        "Medusa = multiple heads on one model",
        "No separate draft model needed",
      ],
    },
  ],

  // Topic 5: Multi-GPU
  "tensor-parallelism": [
    {
      id: "q-inf-23",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is tensor parallelism and when is it used for LLM inference?",
      options: [
        "Running different requests on different GPUs",
        "Splitting individual weight matrices across GPUs for models too large for one GPU",
        "Training multiple models simultaneously",
        "Compressing tensors for faster transfer",
      ],
      correctAnswer: 1,
      explanation:
        "Tensor parallelism splits large weight matrices (like QKV projections and FFN layers) across multiple GPUs. Each GPU holds 1/N of the weights and computes partial results, which are then combined via all-reduce. This is essential when a model doesn't fit on one GPU (e.g., 70B model needs ~140GB in FP16).",
      hints: [
        "One model split across GPUs",
        "Each GPU has partial weights, results combined",
      ],
    },
  ],

  "pipeline-parallelism": [
    {
      id: "q-inf-24",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is pipeline parallelism less commonly used than tensor parallelism for LLM inference?",
      options: [
        "It's harder to implement",
        "It creates pipeline bubbles (idle time) during sequential generation, hurting latency",
        "It requires more memory",
        "It doesn't work with transformers",
      ],
      correctAnswer: 1,
      explanation:
        "Pipeline parallelism assigns different layers to different GPUs. During autoregressive decode, each token must pass through all layers sequentially, creating pipeline bubbles where GPUs wait. This works well for training (with micro-batches) but hurts inference latency. Tensor parallelism keeps all GPUs busy for each token.",
      hints: [
        "Sequential token generation = sequential pipeline stages",
        "Idle GPUs = wasted resources",
      ],
    },
  ],

  "nvlink-nccl": [
    {
      id: "q-inf-25",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is NVLink important for tensor-parallel LLM inference?",
      options: [
        "It provides more power to GPUs",
        "It offers much higher bandwidth than PCIe for all-reduce operations between GPUs",
        "It enables larger VRAM",
        "It reduces power consumption",
      ],
      correctAnswer: 1,
      explanation:
        "Tensor parallelism requires frequent all-reduce operations to combine partial results across GPUs. NVLink provides 300-900 GB/s bandwidth between GPUs versus ~64 GB/s for PCIe. This communication overhead can dominate inference latency without fast interconnects. Multi-GPU inference is often limited by inter-GPU communication, not compute.",
      hints: [
        "All-reduce happens after every transformer layer",
        "Faster communication = lower latency per token",
      ],
    },
  ],

  // Topic 6: Production Architecture
  "autoscaling": [
    {
      id: "q-inf-26",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What's a key challenge when autoscaling LLM inference servers?",
      options: [
        "LLMs use too much power",
        "Loading model weights takes 10-60 seconds, creating cold-start latency spikes",
        "Autoscaling doesn't work with GPUs",
        "LLMs don't benefit from scaling",
      ],
      correctAnswer: 1,
      explanation:
        "Unlike stateless web servers, LLM inference servers must load multi-GB model weights before serving requests. This cold start takes 10-60 seconds, during which the new replica can't serve traffic. Solutions include: keeping warm pools, using SSD caching for faster loading, or pre-loading models on standby replicas.",
      hints: [
        "LLM servers aren't instantly ready",
        "Loading 70GB takes time",
      ],
    },
  ],

  "streaming-responses": [
    {
      id: "q-inf-27",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why is streaming important for LLM chat applications?",
      options: [
        "It reduces total compute",
        "It improves perceived latency by showing tokens as they're generated rather than waiting for complete response",
        "It's required for accuracy",
        "It reduces memory usage",
      ],
      correctAnswer: 1,
      explanation:
        "Streaming returns tokens as they're generated via Server-Sent Events (SSE) or similar protocols. This dramatically improves perceived latency - users see the first words within 100ms rather than waiting 10+ seconds for a complete response. Research shows streaming significantly improves user satisfaction even when total time is unchanged.",
      hints: [
        "Show progress, don't make users wait",
        "First token in 100ms feels instant vs 10s wait",
      ],
    },
  ],

  "caching-strategies": [
    {
      id: "q-inf-28",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is semantic caching for LLM inference?",
      options: [
        "Caching model weights",
        "Caching responses to similar queries using embedding similarity rather than exact matching",
        "Caching the KV cache only",
        "Caching user sessions",
      ],
      correctAnswer: 1,
      explanation:
        "Semantic caching stores query-response pairs with their embeddings. New queries are compared against cached queries using embedding similarity. If a similar query (e.g., "What is Python?" vs "Tell me about Python") is found, the cached response is returned without model inference. This can reduce latency and cost for FAQ-style queries.",
      hints: [
        "Exact match cache misses similar questions",
        "Embedding similarity finds semantically close queries",
      ],
    },
  ],

  "fallback-routing": [
    {
      id: "q-inf-29",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is model routing / fallback in production LLM systems?",
      options: [
        "Routing requests to random models",
        "Directing requests to different models based on complexity, cost, or availability",
        "Always using the largest model",
        "Disabling failed models permanently",
      ],
      correctAnswer: 1,
      explanation:
        "Model routing directs requests intelligently: simple queries to smaller/cheaper models, complex queries to larger models. Fallback handles failures by retrying with alternative models. This optimizes cost (don't use GPT-4 for "hello") while maintaining quality and availability when primary models fail.",
      hints: [
        "Not all queries need GPT-4",
        "Have backup plans for failures",
      ],
    },
  ],
};

registerQuestions(questions);
