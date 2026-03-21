import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'self-attention': [
    {
      id: 'q-tr-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In scaled dot-product attention, why are the dot products divided by √d_k before the softmax?',
      options: [
        'To normalize the output to sum to 1',
        'To prevent dot products from growing large in magnitude as d_k increases, keeping softmax gradients stable',
        'To match the scale of the value vectors',
        'To reduce the number of parameters in the attention layer',
      ],
      correctAnswer: 1,
      explanation: 'For large d_k, dot products grow in magnitude, pushing softmax into regions with tiny gradients. Dividing by √d_k counteracts this, maintaining gradient flow during training.',
      hints: [
        'Think about what happens to softmax outputs when inputs are very large positive or negative numbers.',
        'The variance of a dot product of random unit vectors scales with the dimension d_k.',
      ],
    },
    {
      id: 'q-tr-kp1-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In self-attention, what do the Query, Key, and Value projections represent conceptually?',
      options: [
        'Q retrieves information, K indexes stored information, V determines what to update',
        'Q is what a token is looking for, K is what a token advertises it contains, V is the actual content retrieved',
        'Q and K are identical; V is the residual connection',
        'Q is the output, K is the input, V is the bias term',
      ],
      correctAnswer: 1,
      explanation: 'Q represents a "query" for relevant information, K represents the "key" that each position advertises for matching, and V is the actual content passed forward weighted by Q-K similarity.',
      hints: [
        'Think of a database analogy: you query (Q) against an index (K) to retrieve values (V).',
        'The attention weight between positions i and j comes from how well Q_i matches K_j.',
      ],
    },
    {
      id: 'q-tr-kp1-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Self-attention has O(n²) time and memory complexity with respect to sequence length n, which is a fundamental limitation for long-context processing.',
      correctAnswer: 'true',
      explanation: 'Computing attention scores requires a dot product between every pair of positions, producing an n×n attention matrix — both time and memory grow quadratically with sequence length.',
      hints: [
        'Count the number of (query, key) pairs for a sequence of length n.',
        'This is why FlashAttention and sparse attention methods are important for long sequences.',
      ],
    },
  ],

  'multi-head-attention': [
    {
      id: 'q-tr-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary benefit of using multiple attention heads instead of a single attention head?',
      options: [
        'Multiple heads reduce the total number of parameters',
        'Multiple heads allow the model to attend to different representation subspaces and relationship types simultaneously',
        'Multiple heads speed up training by parallelizing gradient computation',
        'Multiple heads eliminate the need for positional encodings',
      ],
      correctAnswer: 1,
      explanation: 'Each attention head operates on a different linear projection of Q, K, V, allowing the model to capture different types of relationships (syntactic, semantic, positional) in parallel subspaces.',
      hints: [
        'Different heads learn to specialize — some attend to nearby tokens, others to semantically related tokens far away.',
        'The outputs of all heads are concatenated and projected, combining their diverse representations.',
      ],
    },
    {
      id: 'q-tr-kp2-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In multi-head attention with h heads and model dimension d_model, each head operates on d_model / h dimensional Q, K, V projections, keeping total computation comparable to single-head attention.',
      correctAnswer: 'true',
      explanation: 'The per-head dimension is d_k = d_model / h; the total parameter count and compute remains similar to single-head attention with dimension d_model, as the reduction in dimension compensates for the number of heads.',
      hints: [
        'Total work is h heads × (d_model/h) dimensions — the h factors cancel out.',
        'This is why multi-head attention doesn\'t dramatically increase compute cost.',
      ],
    },
    {
      id: 'q-tr-kp2-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Analysis of trained transformer attention heads has shown that individual heads tend to specialize in capturing specific patterns. Which specialization has been empirically observed?',
      options: [
        'Heads exclusively process syntactic dependencies within clauses',
        'Heads specializing in positional patterns, coreference, or rare word detection have been empirically identified',
        'All heads learn identical attention patterns due to gradient averaging',
        'Heads in earlier layers always attend locally; heads in later layers always attend globally',
      ],
      correctAnswer: 1,
      explanation: 'Empirical analysis (e.g., Clark et al., 2019) found heads with interpretable specializations: some track syntactic dependencies (subject-verb), others resolve coreference, and others attend to special tokens like [CLS] or [SEP].',
      hints: [
        'If all heads learned the same thing, multi-head attention would be redundant.',
        'Interpretability research on BERT attention heads revealed functional specialization.',
      ],
    },
  ],

  'positional-encoding': [
    {
      id: 'q-tr-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Why do transformers require explicit positional encodings when RNNs do not?',
      options: [
        'Transformers use larger vocabulary sizes than RNNs',
        'Self-attention is permutation-invariant — without positional encoding, the model cannot distinguish token order',
        'Transformers have more parameters and need position signals to converge faster',
        'Positional encodings replace the need for masking in transformers',
      ],
      correctAnswer: 1,
      explanation: 'Self-attention treats input tokens as a set — swapping any two tokens produces identical attention outputs without positional encodings. RNNs process tokens sequentially, inherently encoding order.',
      hints: [
        'If attention is a bag-of-words operation, what information is missing?',
        'Try swapping two input tokens and see if standard attention gives the same output.',
      ],
    },
    {
      id: 'q-tr-kp3-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What property of RoPE (Rotary Position Embedding) makes it especially effective for long-context transformers?',
      options: [
        'RoPE encodes absolute position as a trainable embedding added to each token',
        'RoPE encodes relative position directly into the attention score by rotating Q and K vectors, with relative distance naturally captured in their dot product',
        'RoPE replaces the softmax in attention with a linear operation for speed',
        'RoPE eliminates the need for Key and Value projections',
      ],
      correctAnswer: 1,
      explanation: 'RoPE applies position-dependent rotations to Q and K such that their dot product depends only on their relative distance, enabling length generalization and natural integration with attention computation.',
      hints: [
        'Relative position is more generalizable than absolute position for out-of-distribution lengths.',
        'Rotation in complex number space is the mathematical trick RoPE uses.',
      ],
    },
    {
      id: 'q-tr-kp3-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'ALiBi (Attention with Linear Biases) achieves length extrapolation by adding a fixed negative linear bias proportional to the distance between tokens directly to attention logits.',
      correctAnswer: 'true',
      explanation: 'ALiBi adds a head-specific slope multiplied by the key-query distance as a negative bias to pre-softmax attention scores, penalizing distant tokens without learned position embeddings, enabling extrapolation to longer sequences than seen during training.',
      hints: [
        'ALiBi does not add position embeddings to token representations — the position signal is in the attention logits.',
        'The linear penalty means attention naturally prefers nearby tokens, with tunable head-specific slopes.',
      ],
    },
  ],

  'feed-forward-sublayer': [
    {
      id: 'q-tr-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a standard transformer, what is the typical ratio of the FFN inner dimension to the model dimension d_model?',
      options: [
        '1:1 (same dimension)',
        '2:1',
        '4:1 (FFN inner dimension is 4× d_model)',
        '8:1',
      ],
      correctAnswer: 2,
      explanation: 'The original transformer uses a 4× expansion ratio in the FFN: two linear layers with inner dimension 4 × d_model and a ReLU activation between them, acting as a per-position MLP.',
      hints: [
        'The original "Attention is All You Need" paper specifies this ratio explicitly.',
        'The FFN expansion allows more expressive per-token transformations before projecting back.',
      ],
    },
    {
      id: 'q-tr-kp4-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What advantage does SwiGLU activation provide over standard ReLU in transformer FFN layers?',
      options: [
        'SwiGLU reduces the number of parameters in the FFN by half',
        'SwiGLU is a gated linear unit variant that empirically improves training loss and model quality compared to ReLU without significant computational overhead',
        'SwiGLU eliminates vanishing gradients entirely',
        'SwiGLU enables the FFN to attend to other tokens in the sequence',
      ],
      correctAnswer: 1,
      explanation: 'SwiGLU = Swish(xW) ⊗ (xV) uses a gating mechanism that provides smooth, non-monotonic activation; empirical results (Noam Shazeer, 2020) show consistent improvements in language model perplexity.',
      hints: [
        'Gated activations allow the network to selectively suppress or pass information.',
        'LLaMA, PaLM, and many modern LLMs adopted SwiGLU over ReLU based on empirical gains.',
      ],
    },
    {
      id: 'q-tr-kp4-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'The feed-forward sublayer in a transformer processes each token independently (no cross-token interaction), unlike the self-attention sublayer.',
      correctAnswer: 'true',
      explanation: 'The FFN is applied position-wise — the same MLP processes each token\'s representation independently. All cross-token information exchange happens exclusively in the self-attention sublayer.',
      hints: [
        'The FFN input and output have the same sequence dimension — there is no mixing across positions.',
        'This division of labor (attention for mixing, FFN for per-token transformation) is a key architectural principle.',
      ],
    },
  ],

  'transformer-training': [
    {
      id: 'q-tr-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the difference between Pre-norm and Post-norm layer normalization placement in a transformer block?',
      options: [
        'Pre-norm applies LayerNorm before the attention/FFN sublayer; Post-norm applies it after',
        'Pre-norm uses batch normalization; Post-norm uses layer normalization',
        'Pre-norm is used for encoders; Post-norm is used for decoders only',
        'There is no functional difference; placement is a stylistic choice',
      ],
      correctAnswer: 0,
      explanation: 'Pre-norm (used in most modern LLMs) normalizes inputs before each sublayer, improving training stability; Post-norm (original transformer) normalizes after, which can cause unstable gradients at initialization.',
      hints: [
        'The order relative to the sublayer (before or after) is the entire distinction.',
        'Modern LLMs like LLaMA use Pre-norm because it trains more stably without learning rate warmup tricks.',
      ],
    },
    {
      id: 'q-tr-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Gradient clipping (clipping the global gradient norm to a maximum value) is a standard training technique for transformers because exploding gradients are common without it.',
      correctAnswer: 'true',
      explanation: 'Transformers are prone to gradient explosions, especially in deep models. Clipping the global gradient norm (e.g., to 1.0) prevents catastrophically large weight updates that destabilize training.',
      hints: [
        'Without clipping, a single large gradient update can undo many steps of training.',
        'Global norm clipping scales all gradients uniformly to keep the total norm bounded.',
      ],
    },
    {
      id: 'q-tr-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Why does the original transformer use a learning rate warmup schedule (gradual increase before decay)?',
      options: [
        'Warmup reduces the total number of training steps needed',
        'At initialization, Adam\'s second-moment estimates are unreliable; warmup prevents early large, noisy updates that destabilize training',
        'Warmup increases the batch size gradually to match GPU memory',
        'Warmup is required to initialize the positional encodings correctly',
      ],
      correctAnswer: 1,
      explanation: 'In the early steps, Adam\'s variance estimate v_t is near zero, causing artificially large effective learning rates (gradient/√v_t). Warmup keeps the actual LR small until v_t accumulates meaningful signal.',
      hints: [
        'Adam divides by √v_t — if v_t is small, the effective step is large regardless of the LR.',
        'Warmup compensates for Adam\'s "cold start" problem with variance estimation.',
      ],
    },
  ],

  'tokenization-llm': [
    {
      id: 'q-tr-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does Byte-Pair Encoding (BPE) tokenization do?',
      options: [
        'Splits text into individual bytes only',
        'Iteratively merges the most frequent adjacent byte/character pairs into new vocabulary tokens',
        'Assigns each word a fixed-length binary code',
        'Uses a dictionary of pre-defined words as the vocabulary',
      ],
      correctAnswer: 1,
      explanation: 'BPE starts with a character vocabulary and iteratively merges the most frequent adjacent pair into a new token until a target vocabulary size is reached, producing a compact subword vocabulary.',
      hints: [
        'BPE is an iterative compression algorithm adapted for text tokenization.',
        'The result is a vocabulary of frequent subword units — between character-level and word-level.',
      ],
    },
    {
      id: 'q-tr-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'The choice of tokenizer vocabulary size directly affects model memory usage because the embedding table size is vocabulary size × embedding dimension.',
      correctAnswer: 'true',
      explanation: 'A larger vocabulary means a larger embedding matrix (and output projection matrix), increasing model parameter count and memory footprint, though it also reduces sequence lengths for the same text.',
      hints: [
        'The embedding table has one row per vocabulary token.',
        'Larger vocab = shorter sequences but larger parameter count — a real trade-off.',
      ],
    },
    {
      id: 'q-tr-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Why do LLMs often struggle with character-level tasks (e.g., counting letters in a word) despite strong general language understanding?',
      options: [
        'LLMs cannot process individual characters due to architectural limitations',
        'Subword tokenization merges characters into multi-character tokens, making individual character positions opaque to the model',
        'LLMs process all text as lowercase, losing character information',
        'The attention mechanism cannot attend to character-level features',
      ],
      correctAnswer: 1,
      explanation: 'BPE/SentencePiece merges characters into subword tokens (e.g., "strawberry" → ["straw", "berry"]), so the model never explicitly "sees" individual characters and cannot directly count or manipulate them.',
      hints: [
        'If "strawberry" is one or two tokens, the model never explicitly processes "r" as a distinct unit.',
        'This is a fundamental limitation of subword tokenization for character-level reasoning.',
      ],
    },
  ],

  'scaling-laws': [
    {
      id: 'q-tr-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Kaplan et al. (2020) scaling laws paper found that model performance scales predictably with which three quantities?',
      options: [
        'Learning rate, batch size, and training steps',
        'Model parameters (N), dataset size (D), and compute budget (C)',
        'Number of attention heads, model depth, and model width',
        'Vocabulary size, sequence length, and number of layers',
      ],
      correctAnswer: 1,
      explanation: 'Kaplan et al. found power-law relationships between language model cross-entropy loss and each of N (parameters), D (tokens), and C (FLOPs), enabling principled scaling decisions.',
      hints: [
        'These three quantities represent the three main axes of investment in LLM training.',
        'The power-law relationships mean loss decreases predictably as any of these grows.',
      ],
    },
    {
      id: 'q-tr-kp7-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The Chinchilla paper revised Kaplan et al.\'s recommendation primarily because:',
      options: [
        'Kaplan et al. overestimated dataset size requirements',
        'Kaplan et al.\'s compute-optimal models were too large and undertrained; Chinchilla showed equal scaling of N and D is optimal',
        'Chinchilla discovered that smaller models always outperform larger ones',
        'Kaplan et al. used an incorrect loss function for evaluation',
      ],
      correctAnswer: 1,
      explanation: 'Kaplan et al. recommended scaling N faster than D for a fixed compute budget; Chinchilla showed this was suboptimal and that N and D should scale equally (~20 tokens/parameter), producing smaller but better-trained models.',
      hints: [
        'Chinchilla is smaller than Gopher but outperforms it by training on more data.',
        'Compute-optimal means best test loss for a fixed FLOPs budget.',
      ],
    },
    {
      id: 'q-tr-kp7-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Scaling laws derived from pretraining loss (cross-entropy on next-token prediction) reliably predict performance on all downstream tasks.',
      correctAnswer: 'false',
      explanation: 'Pretraining scaling laws predict loss well, but downstream task performance can show "emergent" non-linear jumps at certain scales. Some capabilities appear suddenly rather than improving smoothly, limiting simple extrapolation from loss.',
      hints: [
        'Emergence describes capabilities that appear discontinuously with scale.',
        'Lower loss does not always translate linearly to better task performance.',
      ],
    },
  ],

  'pretraining-data': [
    {
      id: 'q-tr-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary source of text in the C4 (Colossal Clean Crawled Corpus) dataset?',
      options: [
        'Academic papers from arXiv',
        'Filtered Common Crawl web data with near-duplicate and low-quality text removed',
        'Wikipedia and Wikidata dumps',
        'Books and literary texts',
      ],
      correctAnswer: 1,
      explanation: 'C4 is derived from Common Crawl web data after aggressive filtering: removing pages with offensive content, short pages, code, and near-duplicates, resulting in ~750GB of clean English text.',
      hints: [
        'C4 stands for Colossal Clean Crawled Corpus — "crawled" refers to web crawling.',
        'The cleaning pipeline is the key contribution; the raw source is Common Crawl.',
      ],
    },
    {
      id: 'q-tr-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Data deduplication in pretraining corpora improves model training efficiency and reduces memorization of repeated content.',
      correctAnswer: 'true',
      explanation: 'Duplicated data wastes compute on redundant examples and causes models to memorize verbatim text (a privacy and copyright risk). Deduplication with tools like MinHash LSH removes near-duplicates efficiently at scale.',
      hints: [
        'If the same document appears 100 times, the model sees it 100 times — wasted compute.',
        'Memorization of training data is both a capability limitation and a safety concern.',
      ],
    },
    {
      id: 'q-tr-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Why is "data mixing ratio" an important hyperparameter when training LLMs on heterogeneous corpora (e.g., web, code, books, Wikipedia)?',
      options: [
        'Different data sources have different tokenizer vocabularies requiring ratio balancing',
        'The mixture ratio determines the relative influence of each domain on the model\'s capabilities, enabling deliberate skill emphasis (e.g., more code data for coding ability)',
        'Data mixing ratio controls GPU memory allocation for loading different datasets',
        'Mixing ratios are only relevant for fine-tuning, not pretraining',
      ],
      correctAnswer: 1,
      explanation: 'The mixture ratio directly shapes what capabilities the model learns — over-sampling code data produces better coding models, over-sampling books improves long-form reasoning. Finding the optimal mix is a key design decision for competitive LLMs.',
      hints: [
        'If you want a coding-focused LLM, what data should you emphasize?',
        'The mixture is a proxy for the distribution of tasks you want the model to be good at.',
      ],
    },
  ],

  'llm-architectures': [
    {
      id: 'q-tr-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What architectural feature distinguishes LLaMA from the original GPT-style transformer?',
      options: [
        'LLaMA uses a bidirectional encoder instead of a causal decoder',
        'LLaMA uses Pre-RMS Norm, SwiGLU activations, and RoPE positional embeddings instead of Post-LayerNorm, ReLU, and sinusoidal encodings',
        'LLaMA adds cross-attention layers for conditioning on external documents',
        'LLaMA uses a different tokenizer with character-level vocabulary',
      ],
      correctAnswer: 1,
      explanation: 'LLaMA adopts three key modifications over the original GPT architecture: Pre-RMS Norm (for training stability), SwiGLU FFN activation (better perplexity), and RoPE (better length generalization).',
      hints: [
        'LLaMA represents accumulated best practices from the research community post-GPT-3.',
        'Three specific component changes distinguish LLaMA from the original transformer.',
      ],
    },
    {
      id: 'q-tr-kp9-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Mistral 7B uses Grouped Query Attention (GQA) and Sliding Window Attention (SWA) to achieve faster inference and lower memory usage compared to a standard transformer of the same size.',
      correctAnswer: 'true',
      explanation: 'Mistral 7B combines GQA (fewer KV heads than Q heads, reducing KV cache size) with SWA (local attention window, reducing quadratic memory), enabling competitive performance at 7B parameters with efficient inference.',
      hints: [
        'GQA reduces KV cache memory; SWA reduces attention computation for long sequences.',
        'Mistral was notable for punching above its weight class on benchmarks due to architectural efficiency.',
      ],
    },
    {
      id: 'q-tr-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Gemma uses "multi-query attention" in some configurations. What does this mean for the KV cache during inference?',
      options: [
        'Multiple query heads share a single K and V head, reducing KV cache size by a factor equal to the number of query heads',
        'Multiple attention layers share the same KV cache',
        'Queries are computed multiple times for ensemble averaging',
        'Multi-query attention uses separate attention modules for different input modalities',
      ],
      correctAnswer: 0,
      explanation: 'In multi-query attention (MQA), all query heads share a single K and V projection, reducing the KV cache size by the number of heads — critical for memory-efficient inference with long sequences.',
      hints: [
        '"Multi-query" means many Qs, but only one K and one V — not many of each.',
        'KV cache memory scales with the number of K and V heads; reducing to 1 dramatically cuts memory.',
      ],
    },
  ],

  'context-length': [
    {
      id: 'q-tr-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Why can\'t a transformer model simply process sequences longer than its training context length without any modification?',
      options: [
        'The tokenizer does not support sequences longer than the training length',
        'Positional encodings or biases have not been trained for positions beyond the training length, causing poor generalization',
        'The attention mask cannot be extended beyond the training context size',
        'GPU memory limits prevent longer sequences without code changes',
      ],
      correctAnswer: 1,
      explanation: 'Absolute positional embeddings (and some relative encodings) are not trained for positions beyond the training length, producing out-of-distribution position signals that degrade model quality.',
      hints: [
        'If position 4096 was never seen during training, the model has no learned representation for it.',
        'This is why research on length extrapolation focuses on position encoding design.',
      ],
    },
    {
      id: 'q-tr-kp10-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'YaRN (Yet Another RoPE extensioN) extends context length by adjusting the frequency spectrum of RoPE, allowing models trained on short contexts to generalize to much longer ones.',
      correctAnswer: 'true',
      explanation: 'YaRN modifies RoPE frequencies using NTK-aware interpolation and extrapolation, enabling short-context models to be fine-tuned (or even used zero-shot in some cases) on significantly longer contexts.',
      hints: [
        'RoPE uses sinusoidal functions with different frequencies — YaRN rescales those frequencies.',
        'Fine-tuning on even a small amount of long-context data with YaRN RoPE can unlock long-context ability.',
      ],
    },
    {
      id: 'q-tr-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The "lost in the middle" phenomenon in long-context LLMs refers to:',
      options: [
        'Models forgetting earlier tokens due to KV cache eviction',
        'Models performing worse at retrieving information from the middle of a long context compared to the beginning or end',
        'Attention weights becoming uniform across all positions in very long sequences',
        'Positional encodings failing for tokens at the exact midpoint of the sequence',
      ],
      correctAnswer: 1,
      explanation: 'Research (Liu et al., 2023) showed LLMs have a U-shaped recall curve: they perform best on information at the start or end of long contexts and worst on content in the middle, regardless of context length.',
      hints: [
        'Primacy and recency effects appear in LLM attention, just as in human memory.',
        'Benchmark your long-context model on tasks where the answer is buried in the middle.',
      ],
    },
  ],

  'flash-attention': [
    {
      id: 'q-tr-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What key insight makes FlashAttention faster than standard attention despite computing the same mathematical result?',
      options: [
        'FlashAttention uses approximate attention with random projections',
        'FlashAttention uses tiling to keep attention computation in fast SRAM (on-chip), avoiding slow HBM memory round-trips',
        'FlashAttention reduces the number of attention heads used during forward pass',
        'FlashAttention uses INT8 quantization for attention scores',
      ],
      correctAnswer: 1,
      explanation: 'FlashAttention tiles the attention computation into blocks that fit in GPU SRAM, dramatically reducing the number of expensive HBM (GPU DRAM) reads and writes — the bottleneck in standard attention.',
      hints: [
        'GPU SRAM is ~10× faster than HBM but much smaller — the key is fitting computation there.',
        'Standard attention materializes the full n×n attention matrix in HBM; FlashAttention avoids this.',
      ],
    },
    {
      id: 'q-tr-kp11-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'FlashAttention is an IO-aware algorithm — it produces the mathematically exact same output as standard attention, just with better memory access patterns.',
      correctAnswer: 'true',
      explanation: 'FlashAttention uses the online softmax trick to compute exact softmax without materializing the full attention matrix, making it numerically equivalent to standard attention while being IO-efficient.',
      hints: [
        '"IO-aware" means it optimizes reads/writes between memory hierarchy levels, not the math.',
        'Exact equivalence means no accuracy trade-off — only speed and memory improvements.',
      ],
    },
    {
      id: 'q-tr-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'FlashAttention-2 improved upon FlashAttention-1 primarily by:',
      options: [
        'Using INT4 quantization for the attention computation',
        'Better parallelizing work across GPU warps and reducing non-matrix-multiply FLOPs (e.g., by restructuring loops to minimize rescaling operations)',
        'Supporting sparse attention patterns natively',
        'Moving the attention computation to CPU to free GPU memory',
      ],
      correctAnswer: 1,
      explanation: 'FlashAttention-2 reorganized the tiling loops to reduce rescaling overhead, better utilized GPU warp-level parallelism, and improved work partitioning — collectively achieving ~2× speedup over FlashAttention-1.',
      hints: [
        'The algorithm remained tiled/IO-aware; the improvements were in GPU utilization efficiency.',
        'Warp-level parallelism is key: FA2 distributes work across warps more evenly.',
      ],
    },
  ],

  'kv-cache': [
    {
      id: 'q-tr-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does the KV cache store during autoregressive LLM decoding?',
      options: [
        'The model weights compressed for fast loading',
        'The key and value tensors for all previously generated tokens, avoiding recomputation at each decoding step',
        'The probability distribution over the vocabulary at each step',
        'The attention masks for the current sequence',
      ],
      correctAnswer: 1,
      explanation: 'At each decoding step, the KV cache stores K and V tensors for all previous tokens so that the model only computes attention for the new token against cached K/V pairs, reducing decoding from O(n²) to O(n) total compute.',
      hints: [
        'Without the cache, every new token would require recomputing attention over the entire prefix.',
        'The cache trades memory for compute — a critical trade-off in LLM serving.',
      ],
    },
    {
      id: 'q-tr-kp12-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'KV cache size grows linearly with sequence length and the number of transformer layers, making it a dominant memory consumer in long-context LLM inference.',
      correctAnswer: 'true',
      explanation: 'KV cache size = 2 × n_layers × seq_len × n_heads × head_dim × bytes_per_element. For long sequences and deep models, this can exceed the model weights in memory consumption.',
      hints: [
        'Count the tensors: 2 (K and V) × layers × sequence length × head dimensions.',
        'For a 70B model with 80 layers and 32k context, the KV cache can be tens of GBs.',
      ],
    },
    {
      id: 'q-tr-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What does KV cache quantization to INT8 trade off compared to FP16 KV cache?',
      options: [
        'Faster prefill at the cost of slower decoding',
        'Reduced memory usage at the cost of minor numerical precision loss in attention computations',
        'Larger batch sizes at the cost of increased model parameter count',
        'Better throughput at the cost of higher GPU utilization',
      ],
      correctAnswer: 1,
      explanation: 'INT8 KV cache halves memory usage versus FP16, enabling larger batch sizes or longer contexts on the same hardware, at the cost of small quantization errors in attention scores — typically negligible in practice.',
      hints: [
        'INT8 uses 1 byte per value vs. 2 bytes for FP16 — a 2× memory reduction.',
        'The quality impact is usually minimal because attention weights are computed from the KV values, not used directly.',
      ],
    },
  ],

  'decoding-strategies': [
    {
      id: 'q-tr-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the main drawback of greedy decoding for text generation?',
      options: [
        'Greedy decoding is too slow for interactive applications',
        'Greedy decoding can get stuck in repetitive loops and misses globally better sequences by always choosing the locally highest-probability token',
        'Greedy decoding requires sampling from the full vocabulary distribution',
        'Greedy decoding cannot generate tokens longer than 512',
      ],
      correctAnswer: 1,
      explanation: 'Greedy decoding is myopic — it maximizes local probability at each step but may miss higher-probability sequences that require a suboptimal choice at step t to enable a much better step t+1.',
      hints: [
        '"Greedy" algorithms make locally optimal choices but don\'t guarantee globally optimal solutions.',
        'Consider a case where the best next word leads to an awkward sentence — greedy would still choose it.',
      ],
    },
    {
      id: 'q-tr-kp13-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In top-p (nucleus) sampling, what does p = 0.9 mean?',
      options: [
        'Only the top 90% most likely tokens are ever sampled',
        'The smallest set of tokens whose cumulative probability exceeds 0.9 is sampled from at each step',
        'The model samples exactly 90 tokens before stopping',
        'Temperature is set to 0.9 to scale the distribution',
      ],
      correctAnswer: 1,
      explanation: 'Nucleus sampling selects the minimal set of tokens with cumulative probability ≥ p, then samples from that set. This adapts the vocabulary size to the distribution — tight (few tokens) for confident predictions, broader for uncertain ones.',
      hints: [
        'Nucleus means the "core" of the probability mass — not a fixed number of tokens.',
        'The cutoff set varies in size depending on how peaked the distribution is.',
      ],
    },
    {
      id: 'q-tr-kp13-3',
      type: 'true-false',
      difficulty: 'hard',
      question: 'Beam search with a large beam size always produces higher-quality text than sampling-based methods for open-ended generation tasks.',
      correctAnswer: 'false',
      explanation: 'For open-ended generation, large beam search produces generic, repetitive text (it finds high-probability sequences that tend to be bland). Sampling introduces diversity that is often preferred by human evaluators for creative tasks.',
      hints: [
        'High probability ≠ high quality for creative or conversational text.',
        'Beam search is better for constrained tasks (e.g., translation, summarization); sampling for open-ended generation.',
      ],
    },
  ],

  'speculative-decoding': [
    {
      id: 'q-tr-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the core idea behind speculative decoding for LLM inference?',
      options: [
        'Using INT4 quantization to speed up the main model\'s forward pass',
        'A small draft model generates multiple candidate tokens in parallel; the large target model verifies them in a single forward pass, accepting correct tokens',
        'Caching the KV cache across multiple requests to amortize computation',
        'Running multiple models in ensemble and taking the majority vote',
      ],
      correctAnswer: 1,
      explanation: 'Speculative decoding uses a small, fast draft model to propose k tokens speculatively; the large target model checks all k in one batched forward pass and accepts tokens that match its distribution — delivering speedups proportional to average accepted tokens per step.',
      hints: [
        'The key insight is that verifying k tokens costs only 1 large model forward pass.',
        'If the draft model is right most of the time, you get multiple tokens per large-model step.',
      ],
    },
    {
      id: 'q-tr-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Speculative decoding produces outputs with the exact same distribution as the target model (not the draft model), preserving output quality.',
      correctAnswer: 'true',
      explanation: 'The acceptance/rejection mechanism in speculative decoding guarantees that the final token distribution exactly matches the target model\'s distribution — draft model errors are corrected by rejection sampling, not silently propagated.',
      hints: [
        'If a draft token is rejected, a correction token is sampled from the target model.',
        'This lossless property is what makes speculative decoding safe for production.',
      ],
    },
    {
      id: 'q-tr-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The speedup from speculative decoding is most sensitive to which factor?',
      options: [
        'The GPU memory bandwidth available for the draft model',
        'The acceptance rate of draft tokens — higher acceptance means more tokens per large-model call',
        'The vocabulary size of the draft model tokenizer',
        'The batch size used during speculative decoding',
      ],
      correctAnswer: 1,
      explanation: 'Speedup ≈ (1 / (1 - α)) where α is the average acceptance rate. If the draft is accepted 80% of the time, each large model call verifies ~5 tokens on average — a ~5× reduction in large model calls.',
      hints: [
        'More accepted draft tokens = fewer expensive large-model forward passes.',
        'Draft model accuracy directly determines the practical speedup; compute savings follow from that.',
      ],
    },
  ],

  'quantization-llm': [
    {
      id: 'q-tr-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary benefit of INT4 quantization (e.g., GGUF Q4) for LLM deployment?',
      options: [
        'INT4 models train faster than FP16 models',
        'INT4 reduces model size by ~4× versus FP16, enabling larger models to fit in CPU or consumer GPU memory',
        'INT4 quantization eliminates the need for KV cache during inference',
        'INT4 improves model accuracy by reducing numerical noise',
      ],
      correctAnswer: 1,
      explanation: 'INT4 uses 4 bits per weight versus 16 for FP16, giving a ~4× size reduction. This allows running models like LLaMA-3 70B on consumer hardware that couldn\'t fit the FP16 version.',
      hints: [
        '4 bits vs. 16 bits — the ratio directly gives the compression factor.',
        'Memory is the limiting resource for LLM deployment; quantization trades accuracy for memory.',
      ],
    },
    {
      id: 'q-tr-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'GPTQ is a post-training quantization method that quantizes weights layer-by-layer using second-order gradient information to minimize quantization error.',
      correctAnswer: 'true',
      explanation: 'GPTQ applies the Optimal Brain Quantization (OBQ) framework to quantize each layer\'s weights while compensating for quantization errors using the inverse Hessian of the layer\'s activations, achieving low error at INT4.',
      hints: [
        'Second-order information (Hessian) tells you which weights are most sensitive to perturbation.',
        'GPTQ compensates remaining (unquantized) weights to offset the error introduced by quantizing others.',
      ],
    },
    {
      id: 'q-tr-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'AWQ (Activation-Aware Weight Quantization) improves over naive INT4 quantization by:',
      options: [
        'Quantizing activations instead of weights',
        'Identifying and protecting salient weights (those with large input activations) from aggressive quantization by applying per-channel scaling',
        'Using a learned codebook for quantization instead of fixed bit-widths',
        'Applying quantization only to the FFN layers while keeping attention layers in FP16',
      ],
      correctAnswer: 1,
      explanation: 'AWQ observes that ~1% of weights (those with large input activations) contribute disproportionately to output quality; it protects these by scaling inputs so they can be quantized more accurately without special treatment.',
      hints: [
        'Not all weights are equally important — salient weights carry more information.',
        'Scaling inputs before quantization is a way to effectively give important weights higher precision.',
      ],
    },
  ],

  'lora-peft': [
    {
      id: 'q-tr-kp16-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does LoRA (Low-Rank Adaptation) add to a pretrained model\'s weight matrix W?',
      options: [
        'A full-rank weight matrix of the same size as W',
        'A low-rank decomposition ΔW = B × A, where B ∈ ℝ^{d×r} and A ∈ ℝ^{r×k} with r << min(d,k)',
        'A learned bias vector for each attention head',
        'A multiplicative scaling gate applied element-wise to W',
      ],
      correctAnswer: 1,
      explanation: 'LoRA freezes the original weights W and adds a trainable low-rank perturbation ΔW = BA; with rank r, this requires r×(d+k) parameters instead of d×k, drastically reducing trainable parameters.',
      hints: [
        'Low-rank means the update matrix has far fewer independent parameters than a full matrix.',
        'The rank r is the bottleneck dimension — setting r=8 means only 8-dimensional updates.',
      ],
    },
    {
      id: 'q-tr-kp16-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'LoRA adapters can be merged into the base model weights after fine-tuning, adding zero inference overhead compared to the original model.',
      correctAnswer: 'true',
      explanation: 'Since W_new = W + BA, the LoRA matrices can be pre-merged into W before deployment, producing a single weight matrix with identical inference cost to the original model (no adapter overhead).',
      hints: [
        'Matrix addition is all that\'s needed — W + BA is just a single matrix.',
        'The merge makes the adapter "invisible" at inference time.',
      ],
    },
    {
      id: 'q-tr-kp16-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'QLoRA enables fine-tuning of very large models (e.g., 65B) on a single GPU by combining which two techniques?',
      options: [
        'INT4 quantization of the base model weights combined with LoRA adapters trained in BF16',
        'Data parallelism across 8 GPUs combined with gradient checkpointing',
        'Speculative decoding combined with layer-wise fine-tuning',
        'INT8 inference combined with full fine-tuning of the last 4 layers only',
      ],
      correctAnswer: 0,
      explanation: 'QLoRA quantizes the frozen base model to NF4 (4-bit NormalFloat), drastically reducing base model memory, then trains only small FP16 LoRA adapters — enabling 65B model fine-tuning on a single 48GB GPU.',
      hints: [
        'The base model is quantized (frozen, no gradients) — only LoRA adapters need gradient storage.',
        'NF4 quantization + LoRA = the two components of QLoRA.',
      ],
    },
  ],

  'instruction-tuning': [
    {
      id: 'q-tr-kp17-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary purpose of instruction tuning (also called supervised fine-tuning or SFT)?',
      options: [
        'To increase the base model\'s vocabulary size for better tokenization',
        'To train the model to follow human instructions and produce helpful, formatted responses rather than just predicting the next token',
        'To quantize the model for efficient deployment',
        'To reduce the model\'s parameter count for faster inference',
      ],
      correctAnswer: 1,
      explanation: 'Instruction tuning fine-tunes a pretrained LLM on (instruction, response) pairs, teaching it to follow the intent of diverse instructions — transforming a raw text predictor into a useful assistant.',
      hints: [
        'Pretraining produces a text completer; instruction tuning makes it an instruction follower.',
        'The training format changes from raw text to structured (instruction, output) pairs.',
      ],
    },
    {
      id: 'q-tr-kp17-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'RLHF (Reinforcement Learning from Human Feedback) is required after instruction tuning to make a model safe and helpful.',
      correctAnswer: 'false',
      explanation: 'RLHF is one approach to alignment, but not strictly required. DPO (Direct Preference Optimization) achieves similar alignment without RL, and high-quality SFT data alone can produce helpful, safe models for many use cases.',
      hints: [
        'DPO is a popular alternative to RLHF that achieves comparable results without a reward model.',
        '"Required" is too strong — multiple post-training methods can achieve alignment.',
      ],
    },
    {
      id: 'q-tr-kp17-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When performing instruction tuning, why is it common to mask the loss on instruction/prompt tokens and compute loss only on response tokens?',
      options: [
        'Instruction tokens are too short to contribute meaningful gradient signal',
        'The model should learn to generate the response, not memorize or predict the instruction; training on response-only tokens focuses optimization on the generative task',
        'Instruction tokens are pre-tokenized differently and cannot be included in the loss',
        'Computing loss on instruction tokens would cause overfitting to the training data format',
      ],
      correctAnswer: 1,
      explanation: 'Including instruction tokens in the loss incentivizes the model to learn to predict given instructions, which is not useful. Loss on response tokens only teaches the model to generate appropriate completions given instructions.',
      hints: [
        'The instruction is the input — you don\'t want the model to "predict" its own input.',
        'Cross-entropy on the response trains the model\'s generation; cross-entropy on the prompt trains nothing useful.',
      ],
    },
  ],

  'grouped-query-attention': [
    {
      id: 'q-tr-kp18-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the key difference between Multi-Head Attention (MHA), Grouped-Query Attention (GQA), and Multi-Query Attention (MQA)?',
      options: [
        'MHA uses more parameters than GQA; MQA uses fewer attention layers',
        'MHA has H K/V heads for H Q heads; GQA has G < H shared K/V heads; MQA has 1 K/V head for all H Q heads',
        'MHA attends globally; GQA attends locally; MQA uses random attention patterns',
        'MHA is for encoders; GQA is for decoders; MQA is for encoder-decoder models',
      ],
      correctAnswer: 1,
      explanation: 'MHA: 1 K/V pair per query head (H total). GQA: G K/V groups shared across H/G query heads each. MQA: 1 K/V pair shared by all query heads. This progression reduces KV cache size from H to G to 1 copies.',
      hints: [
        'The variable is how many K/V heads are used — Q heads stay the same in all variants.',
        'Fewer K/V heads = smaller KV cache = more memory-efficient inference.',
      ],
    },
    {
      id: 'q-tr-kp18-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'GQA was shown to achieve nearly the same quality as MHA while providing inference speed and memory benefits closer to MQA.',
      correctAnswer: 'true',
      explanation: 'Ainslie et al. (2023) showed GQA with G groups closely matches MHA quality while delivering most of MQA\'s efficiency gains — striking the best balance and being adopted in LLaMA-2/3, Mistral, and Gemma.',
      hints: [
        'GQA is a middle ground: better quality than MQA, better efficiency than MHA.',
        'This is why GQA became the standard in most modern open-source LLMs.',
      ],
    },
    {
      id: 'q-tr-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'For a model with 32 query heads and GQA with 8 KV heads, what is the KV cache memory reduction factor compared to standard MHA?',
      options: [
        '2×',
        '4×',
        '8×',
        '32×',
      ],
      correctAnswer: 1,
      explanation: 'MHA stores 32 K and 32 V heads; GQA with 8 KV heads stores 8 K and 8 V heads. The reduction factor is 32/8 = 4× for both K and V components of the cache.',
      hints: [
        'KV cache scales with the number of KV heads, not query heads.',
        'Divide the number of query heads by the number of KV heads to get the reduction factor.',
      ],
    },
  ],

  'mixture-of-experts': [
    {
      id: 'q-tr-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In a Mixture of Experts (MoE) transformer, what component replaces or augments the dense FFN layer?',
      options: [
        'A larger single FFN with more parameters',
        'Multiple parallel FFN experts with a learned routing network that selects top-k experts per token',
        'A recurrent layer that processes tokens sequentially',
        'A cross-attention layer attending to a fixed expert memory bank',
      ],
      correctAnswer: 1,
      explanation: 'MoE replaces the dense FFN with N expert FFNs and a router that selects top-k (typically k=2) experts for each token, activating only a fraction of total parameters per forward pass.',
      hints: [
        'The "mixture" is the weighted combination of selected expert outputs.',
        'Only top-k experts fire per token — most of the total parameters are inactive for any given token.',
      ],
    },
    {
      id: 'q-tr-kp19-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A load balancing auxiliary loss is typically added during MoE training to prevent all tokens from routing to the same few experts.',
      correctAnswer: 'true',
      explanation: 'Without load balancing, the router collapses to always selecting the same popular experts, wasting capacity of other experts. An auxiliary loss encourages uniform token distribution across experts.',
      hints: [
        'If only 2 of 8 experts ever activate, the model effectively has 2 experts — wasteful.',
        'Load balancing ensures all expert capacity is utilized.',
      ],
    },
    {
      id: 'q-tr-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Mixtral 8×7B has 8 experts but activates only 2 per token. What is the effective active parameter count per forward pass compared to its total parameter count?',
      options: [
        'All 46.7B parameters are active for every token',
        'Approximately 12–13B parameters are active per token (attention layers are always active; only 2/8 of the expert FFN parameters activate)',
        'Exactly 2/8 = 25% of 46.7B ≈ 11.7B parameters are active',
        'Only the routing network\'s parameters are active; expert parameters are static',
      ],
      correctAnswer: 1,
      explanation: 'Attention layers and non-FFN components are always active (~7B). The FFN experts contribute ~7B each; 2 of 8 active means ~14B of FFN parameters, totaling ~13B active parameters per token despite 46.7B total.',
      hints: [
        'Attention parameters are always active — only the FFN experts are sparse.',
        'Active parameters = always-active layers + (2/8 × total expert FFN parameters).',
      ],
    },
  ],

  'sliding-window-attention': [
    {
      id: 'q-tr-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the computational advantage of Sliding Window Attention (SWA) over full self-attention for long sequences?',
      options: [
        'SWA uses INT8 computation instead of FP16',
        'SWA reduces attention from O(n²) to O(n×w) where w is the window size, enabling linear scaling with sequence length',
        'SWA eliminates the need for positional encodings',
        'SWA compresses the KV cache using learned hash functions',
      ],
      correctAnswer: 1,
      explanation: 'By restricting each token\'s attention to its w nearest neighbors, SWA reduces the attention matrix from n×n to n×w, enabling linear (not quadratic) memory and compute scaling with sequence length.',
      hints: [
        'Each token attends to w tokens instead of all n — the matrix is n rows × w columns.',
        'Linear scaling makes very long sequences computationally feasible.',
      ],
    },
    {
      id: 'q-tr-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In a multi-layer transformer with sliding window attention, information from a token can still influence distant tokens through multiple layers even with a fixed window size w.',
      correctAnswer: 'true',
      explanation: 'Each layer propagates information within window w, but stacking L layers allows information to travel up to L×w positions — enabling distant context with local attention, analogous to CNNs with receptive fields.',
      hints: [
        'Think of each layer as one hop of w positions — L hops reach L×w positions total.',
        'This is the "receptive field" argument applied to attention.',
      ],
    },
    {
      id: 'q-tr-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Longformer combines sliding window attention with global attention tokens. What is the role of global attention tokens?',
      options: [
        'Global tokens reduce sequence length by merging nearby tokens',
        'Global tokens (e.g., [CLS]) attend to all positions and are attended to by all positions, providing long-range integration while most tokens use local windows',
        'Global tokens store the KV cache for retrieval by all other tokens',
        'Global tokens are used exclusively for the output classification head',
      ],
      correctAnswer: 1,
      explanation: 'Longformer designates special tokens (task-specific tokens like [CLS]) as global attention tokens that have full attention to/from all positions, enabling long-range reasoning while the bulk of computation remains local (windowed).',
      hints: [
        'A few "hub" tokens with global attention efficiently distribute long-range information.',
        'This is a hybrid: mostly local (cheap) + a few global (expensive) attention patterns.',
      ],
    },
  ],

  'retrieval-augmented-llm': [
    {
      id: 'q-tr-kp21-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What problem does RAG (Retrieval-Augmented Generation) primarily solve for LLMs?',
      options: [
        'Reducing the number of parameters in the language model',
        'Providing the model with up-to-date or domain-specific information beyond what was in its pretraining data',
        'Speeding up token generation during inference',
        'Enabling the model to process images alongside text',
      ],
      correctAnswer: 1,
      explanation: 'RAG retrieves relevant documents from an external knowledge base at query time and provides them as context, allowing the LLM to answer questions about recent events or proprietary knowledge not in its weights.',
      hints: [
        'LLM knowledge is frozen at training time — RAG solves the knowledge cutoff problem.',
        'The retrieved documents become part of the prompt context for grounded generation.',
      ],
    },
    {
      id: 'q-tr-kp21-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'In a RAG pipeline, the retriever and the language model can be jointly trained end-to-end to optimize retrieval quality for the generation task.',
      correctAnswer: 'true',
      explanation: 'Systems like RAG (Lewis et al., 2020) and REALM jointly train the retriever (using MIPS with a document encoder) and the generator using marginal likelihood, allowing the retriever to learn what documents help generation.',
      hints: [
        'Joint training allows the retriever to optimize for what the generator actually needs.',
        'This is more powerful than a frozen retriever, but computationally expensive.',
      ],
    },
    {
      id: 'q-tr-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'In a production RAG system, "context window stuffing" (adding many retrieved chunks) degrades generation quality primarily because:',
      options: [
        'More context tokens increase the cost of KV cache computation quadratically',
        'LLMs struggle with the "lost in the middle" problem — relevant information buried in long contexts is poorly utilized',
        'The tokenizer cannot handle more than 4 retrieved chunks',
        'Retrieved chunks always contain contradictory information that confuses the model',
      ],
      correctAnswer: 1,
      explanation: 'Research shows LLMs perform worse at utilizing information from the middle of long contexts; adding many chunks increases noise and buries the most relevant content, degrading answer quality despite more information being present.',
      hints: [
        'More context is not always better — quality and position of retrieved chunks matter.',
        '"Lost in the middle" is the empirical phenomenon where LLMs ignore middle-context information.',
      ],
    },
  ],

  'tool-calling-llm': [
    {
      id: 'q-tr-kp22-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In function calling (tool calling) with LLMs, what does the model actually output when it decides to use a tool?',
      options: [
        'A Python code snippet that executes the function',
        'A structured JSON object specifying the function name and arguments, which the application layer executes',
        'A natural language description of what function to call',
        'A direct HTTP request to the external API',
      ],
      correctAnswer: 1,
      explanation: 'The LLM generates a structured function call specification (name + typed arguments) in JSON; the application layer is responsible for executing the actual function and returning results back to the LLM for final response generation.',
      hints: [
        'The LLM is a text model — it outputs text/JSON, not executable code or direct API calls.',
        'The function specification is parsed and executed by external code, not by the LLM itself.',
      ],
    },
    {
      id: 'q-tr-kp22-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Parallel tool calling allows an LLM to request multiple tool invocations in a single response, enabling concurrent execution for independent tools.',
      correctAnswer: 'true',
      explanation: 'Modern LLM APIs (e.g., OpenAI GPT-4, Claude) support parallel tool calls where the model outputs multiple tool call objects in one response; the application layer can execute them concurrently, reducing total latency.',
      hints: [
        'Sequential tool calls add latency for each tool; parallel execution amortizes wait time.',
        'Independent tools (e.g., weather lookup + calendar check) don\'t need to run sequentially.',
      ],
    },
    {
      id: 'q-tr-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the key security risk of allowing an LLM agent to call tools with user-provided inputs without sanitization?',
      options: [
        'The agent may use too many API tokens, increasing cost',
        'Prompt injection attacks can cause the LLM to call unintended tools or pass malicious arguments by embedding instructions in tool outputs or user messages',
        'Tool calling increases model response latency beyond acceptable thresholds',
        'The LLM may hallucinate tool names that do not exist in the schema',
      ],
      correctAnswer: 1,
      explanation: 'Prompt injection embeds malicious instructions in content the LLM processes (e.g., in retrieved documents or tool outputs), causing it to call unintended functions or exfiltrate data — a critical security concern for autonomous agents.',
      hints: [
        'If tool output contains "Ignore previous instructions and...", the LLM may follow it.',
        'Sanitizing and isolating tool outputs from the instruction namespace is a key defense.',
      ],
    },
  ],

  'agents-llm': [
    {
      id: 'q-tr-kp23-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the ReAct (Reason + Act) agent framework, what is the fundamental pattern of each reasoning step?',
      options: [
        'Observe → Predict → Execute',
        'Think (reasoning trace) → Act (tool call) → Observe (tool result), repeated until task completion',
        'Plan → Validate → Deploy',
        'Retrieve → Encode → Generate',
      ],
      correctAnswer: 1,
      explanation: 'ReAct interleaves natural language reasoning ("Thought") with action execution ("Act") and observation of results, creating a traceable loop that grounds LLM reasoning in external tool feedback.',
      hints: [
        '"ReAct" = Reasoning + Acting — the two alternating components.',
        'The Observation feeds back into the next Thought, creating a grounded feedback loop.',
      ],
    },
    {
      id: 'q-tr-kp23-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'LLM agents are deterministic systems — given the same input, they always produce the same sequence of actions and final answer.',
      correctAnswer: 'false',
      explanation: 'LLM agents are stochastic due to sampling-based decoding (temperature > 0), and multi-step reasoning can amplify early-step variance. The same prompt can produce different action sequences across runs.',
      hints: [
        'Even at temperature 0 (greedy), tool output variability and LLM non-determinism can cause different paths.',
        'Stochasticity makes evaluation and debugging of agents challenging.',
      ],
    },
    {
      id: 'q-tr-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Multi-agent architectures (e.g., a planner agent delegating to specialist subagents) are preferred over single-agent systems in which scenario?',
      options: [
        'When the task can be completed with a single tool call',
        'When tasks are complex, parallelizable, and benefit from specialized agents with focused context — avoiding context overload in a single agent',
        'When the LLM provider charges per-agent rather than per-token',
        'When the task requires fewer than 5 tool calls total',
      ],
      correctAnswer: 1,
      explanation: 'Multi-agent systems parallelize subtasks, keep each agent\'s context window focused on a specific domain, and allow specialization — critical when complex tasks exceed a single agent\'s context window or require simultaneous work streams.',
      hints: [
        'A single agent with a 128k context can still struggle with very long multi-step tasks.',
        'Parallelization and specialization are the two main reasons to decompose into multiple agents.',
      ],
    },
  ],

  'evaluation-llm': [
    {
      id: 'q-tr-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What type of tasks does the MMLU (Massive Multitask Language Understanding) benchmark evaluate?',
      options: [
        'Code generation and debugging across multiple programming languages',
        'Multi-choice questions across 57 subjects including STEM, humanities, and social sciences',
        'Open-ended dialogue quality rated by human judges',
        'Mathematical reasoning with step-by-step solution verification',
      ],
      correctAnswer: 1,
      explanation: 'MMLU contains 57 subject areas with multiple-choice questions, testing broad knowledge from elementary to professional level — measuring world knowledge and reasoning breadth across domains.',
      hints: [
        'The name "Massive Multitask" reflects the breadth of 57 subjects.',
        'Multiple-choice format enables automatic, reproducible evaluation.',
      ],
    },
    {
      id: 'q-tr-kp24-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'LLM-as-judge evaluation (using a strong LLM like GPT-4 to grade model outputs) can exhibit positional bias, preferring whichever response appears first.',
      correctAnswer: 'true',
      explanation: 'Studies (e.g., MT-Bench) found LLM judges show positional bias (favoring the first or second response) and self-enhancement bias (preferring outputs from models similar to themselves), requiring calibration techniques like position swapping.',
      hints: [
        'Systematic biases in LLM judges need to be measured and corrected for fair evaluation.',
        'Swapping the order of responses and checking consistency is a standard debiasing technique.',
      ],
    },
    {
      id: 'q-tr-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'HumanEval measures code generation performance using the pass@k metric. What does pass@1 specifically measure?',
      options: [
        'Whether at least 1 of k generated solutions passes all test cases, averaged over problems',
        'The probability that a single generated solution (k=1) passes all test cases, estimated via unbiased sampling',
        'The rank of the first correct solution among k generated candidates',
        'The percentage of test cases passed by the best of k solutions',
      ],
      correctAnswer: 1,
      explanation: 'pass@k estimates the probability that at least 1 of k samples passes all unit tests per problem, using an unbiased estimator that samples n > k solutions to reduce variance. pass@1 is the most commonly reported single-generation accuracy.',
      hints: [
        'pass@1 ≈ the fraction of problems where a single sample is correct.',
        'The unbiased estimator uses n > k samples to compute pass@k more reliably.',
      ],
    },
  ],

  'safety-llm': [
    {
      id: 'q-tr-kp25-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is RLHF (Reinforcement Learning from Human Feedback) designed to achieve for LLMs?',
      options: [
        'Faster inference by training a smaller reward model',
        'Alignment of model behavior with human preferences by training a reward model on human comparisons and fine-tuning the LLM with RL',
        'Automatic data augmentation using human feedback to expand training datasets',
        'Reduction of model hallucinations through supervised fine-tuning on factual data',
      ],
      correctAnswer: 1,
      explanation: 'RLHF trains a reward model on human preference comparisons between outputs, then uses PPO to optimize the LLM policy to maximize reward — aligning model behavior with human values and preferences.',
      hints: [
        'The reward model learns what humans prefer; the LLM learns to maximize that reward.',
        'InstructGPT (the paper behind ChatGPT) pioneered RLHF for LLM alignment.',
      ],
    },
    {
      id: 'q-tr-kp25-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Jailbreaking an LLM involves finding prompts that bypass safety training to elicit harmful outputs the model was trained to refuse.',
      correctAnswer: 'true',
      explanation: 'Jailbreak prompts use techniques like role-play framing, adversarial suffixes, or many-shot examples to override safety fine-tuning, causing the model to produce content it was explicitly trained to decline.',
      hints: [
        '"Jailbreak" is the term for breaking out of the safety constraints of the model.',
        'Adversarial prompting and safety fine-tuning are in an ongoing arms race.',
      ],
    },
    {
      id: 'q-tr-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'DPO (Direct Preference Optimization) achieves alignment with human preferences without RL by:',
      options: [
        'Using the reward model directly as a classifier to filter outputs at inference time',
        'Reformulating the RLHF objective as a supervised learning problem on preference pairs (chosen vs. rejected responses), eliminating the need for a separate reward model and RL training',
        'Training only on human-written demonstrations without any preference comparisons',
        'Applying reinforcement learning with a rule-based reward function instead of a learned reward model',
      ],
      correctAnswer: 1,
      explanation: 'DPO derives a closed-form loss directly from the Bradley-Terry preference model, enabling preference learning through supervised fine-tuning on (prompt, chosen, rejected) triples — simpler and often more stable than RLHF with PPO.',
      hints: [
        'DPO eliminates the reward model and RL loop — two major sources of RLHF complexity.',
        'The DPO loss increases log-likelihood of chosen responses relative to rejected ones.',
      ],
    },
  ],

  'open-source-llms': [
    {
      id: 'q-tr-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What distinguishes "open-weights" models like LLaMA-3 from truly "open-source" models?',
      options: [
        'Open-weights models are faster than open-source models',
        'Open-weights releases provide model weights for download but may restrict commercial use or omit training code/data, unlike fully open-source releases',
        'Open-weights models are smaller in parameter count',
        'Open-weights models require proprietary APIs for inference',
      ],
      correctAnswer: 1,
      explanation: 'LLaMA-3 provides weights under a custom license (restricting certain commercial uses); a truly open-source model would release weights, training code, and data under a permissive open-source license.',
      hints: [
        '"Open weights" ≠ open source — the license details matter significantly.',
        'True open-source requires freedom to use, modify, and distribute without restriction.',
      ],
    },
    {
      id: 'q-tr-kp26-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Mistral\'s Mixtral 8×22B is a dense model with 22 billion parameters active on every forward pass.',
      correctAnswer: 'false',
      explanation: 'Mixtral 8×22B is a Mixture of Experts model with 141B total parameters but only ~39B active per token (2 of 8 experts active), making it much more compute-efficient per token than a dense 141B model.',
      hints: [
        '"Mixtral" = Mixture of Experts — the 8× is a hint about the expert count.',
        'MoE models have sparse activation; total parameters ≠ active parameters.',
      ],
    },
    {
      id: 'q-tr-kp26-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Qwen2.5-72B competes with much larger closed models on benchmarks. What architectural or training choice primarily contributes to its efficiency?',
      options: [
        'Using a smaller vocabulary to reduce embedding table size',
        'High-quality multilingual pretraining data curation, long-context training, and GQA for inference efficiency — demonstrating data quality matters as much as scale',
        'Using sparse attention exclusively across all layers',
        'Training on exclusively English data for maximum benchmark performance',
      ],
      correctAnswer: 1,
      explanation: 'Qwen2.5\'s strong benchmark performance stems from curated high-quality multilingual data, careful instruction tuning, long-context capability via training, and GQA for efficient KV cache — showing that training quality can compensate for parameter count differences.',
      hints: [
        'Parameter count is not the only determinant of model quality.',
        'Data quality, curation, and training recipes are the differentiating factors at 72B scale.',
      ],
    },
  ],

  'multimodal-llm': [
    {
      id: 'q-tr-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'How does a typical vision-language model (e.g., LLaVA) connect image features to a language model?',
      options: [
        'By converting images to ASCII art before tokenization',
        'By encoding images with a vision encoder (e.g., CLIP ViT) and projecting visual tokens into the LLM\'s embedding space via a learned connector',
        'By training a separate model for images and merging outputs at the logit level',
        'By converting images to text descriptions using OCR before passing to the LLM',
      ],
      correctAnswer: 1,
      explanation: 'LLaVA and similar models use a frozen or fine-tuned vision encoder to extract image patch features, then project them into the LLM\'s token embedding space via an MLP or Q-Former connector, enabling joint autoregressive generation.',
      hints: [
        'The challenge is bridging vision and language embedding spaces — a learned projection does this.',
        'Image patches become pseudo-tokens that the LLM attends to alongside text tokens.',
      ],
    },
    {
      id: 'q-tr-kp27-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'GPT-4V processes images by converting them to a fixed number of visual tokens regardless of image resolution.',
      correctAnswer: 'false',
      explanation: 'GPT-4V uses dynamic tiling — higher resolution images are divided into more tiles and thus produce more visual tokens. This allows the model to allocate more token budget to detail-rich or large images.',
      hints: [
        'Fixed token counts for all resolutions would lose detail in high-resolution images.',
        'Dynamic tiling trades token budget for resolution fidelity.',
      ],
    },
    {
      id: 'q-tr-kp27-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the primary challenge of interleaved image-text generation (e.g., generating a document with embedded images) compared to image understanding?',
      options: [
        'Image generation requires more GPU memory than language generation',
        'The model must generate coherent images conditioned on text context while maintaining narrative consistency — requiring either a diffusion model integration or autoregressive image token generation',
        'Image generation is not supported by any current LLM architecture',
        'Interleaved generation requires the model to be retrained from scratch on interleaved data',
      ],
      correctAnswer: 1,
      explanation: 'Image-text interleaved generation requires generating images as well as understanding them, typically via integration with a diffusion model or discrete image tokenizers (e.g., VQVAE) — significantly more complex than just visual understanding.',
      hints: [
        'Understanding images and generating images are different capabilities requiring different components.',
        'Models like Gemini and GPT-4o tackle this by integrating generation modules alongside comprehension.',
      ],
    },
  ],

  'llm-reasoning': [
    {
      id: 'q-tr-kp28-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is Chain-of-Thought (CoT) prompting and why does it improve LLM reasoning?',
      options: [
        'Prompting the model to generate multiple answers and taking the majority vote',
        'Prompting the model to generate intermediate reasoning steps before the final answer, breaking complex problems into subproblems',
        'Providing a chain of training examples sorted by difficulty',
        'Using a chain of different models, each solving a portion of the task',
      ],
      correctAnswer: 1,
      explanation: 'CoT prompting elicits step-by-step reasoning in the model\'s output, which improves accuracy on complex reasoning tasks by forcing explicit intermediate computation rather than end-to-end prediction.',
      hints: [
        'Human problem solvers show their work — CoT makes LLMs do the same.',
        'Complex reasoning tasks require multiple logical steps that the model must make explicit.',
      ],
    },
    {
      id: 'q-tr-kp28-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'OpenAI o1 and DeepSeek-R1 improve reasoning by generating extended "thinking" before producing a final response, using reinforcement learning to train the reasoning process.',
      correctAnswer: 'true',
      explanation: 'Both models use RL to train the model to produce extended internal reasoning (often thousands of tokens) before the final answer, discovering effective reasoning strategies through trial-and-error with outcome-based rewards.',
      hints: [
        'The key innovation is RL-trained reasoning — not just prompted CoT but learned reasoning behavior.',
        '"Thinking tokens" are the extended internal monologue before the visible response.',
      ],
    },
    {
      id: 'q-tr-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Process Reward Models (PRMs) differ from Outcome Reward Models (ORMs) for reasoning training in that:',
      options: [
        'PRMs evaluate only the final answer; ORMs evaluate the full reasoning chain',
        'PRMs assign rewards to individual reasoning steps; ORMs assign a single reward to the final answer only',
        'PRMs are trained on human demonstrations; ORMs are trained on model-generated data',
        'PRMs use RL; ORMs use supervised learning',
      ],
      correctAnswer: 1,
      explanation: 'PRMs provide dense step-level feedback on reasoning quality, enabling credit assignment to individual steps; ORMs provide sparse final-answer feedback, which can be insufficient for learning multi-step reasoning.',
      hints: [
        '"Process" reward = reward per step; "Outcome" reward = reward for final answer.',
        'PRMs require annotating individual reasoning steps, making data collection more expensive.',
      ],
    },
  ],

  'llm-coding': [
    {
      id: 'q-tr-kp29-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What distinguishes code generation models like DeepSeek-Coder from general-purpose LLMs?',
      options: [
        'Code models use a completely different architecture than language models',
        'Code models are pretrained on large corpora of source code alongside natural language, with code-specific training objectives such as fill-in-the-middle',
        'Code models can only generate Python; general models handle all languages',
        'Code models do not use transformer architecture',
      ],
      correctAnswer: 1,
      explanation: 'Code LLMs are trained on vast code repositories with code-specific tasks like fill-in-the-middle (FIM) — predicting masked middle sections — and repository-level context, enabling better code understanding and generation than general LLMs.',
      hints: [
        'The pretraining data distribution determines what a model specializes in.',
        'FIM training is unique to code models — it teaches the model to complete partially written code.',
      ],
    },
    {
      id: 'q-tr-kp29-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'HumanEval only tests a model\'s ability to generate standalone Python functions from docstrings, not its ability to understand or modify existing codebases.',
      correctAnswer: 'true',
      explanation: 'HumanEval consists of 164 programming problems requiring completion of a function given its signature and docstring — it does not test repository-level understanding, debugging, or multi-file code comprehension.',
      hints: [
        'HumanEval is a function-level benchmark — one function per problem, evaluated with unit tests.',
        'Real-world coding involves much more: understanding large codebases, debugging, refactoring.',
      ],
    },
    {
      id: 'q-tr-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Why do code LLMs benefit significantly from repository-level context (entire codebase) rather than just the current file?',
      options: [
        'Repository-level context reduces the number of tokens generated',
        'Real code depends on function definitions, types, and patterns spread across many files; repository context enables correct import resolution, API usage, and style consistency',
        'Repository context is required for code execution',
        'Larger context windows always improve code generation regardless of content',
      ],
      correctAnswer: 1,
      explanation: 'In real codebases, generating correct code requires knowing external function signatures, project-specific conventions, and cross-file dependencies — information only available in repository-level context, not isolated file context.',
      hints: [
        'Code rarely exists in isolation — it calls functions defined in other files.',
        'Repository-level models can correctly use project-specific APIs that wouldn\'t appear in isolated file context.',
      ],
    },
  ],

  'llm-deployment': [
    {
      id: 'q-tr-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the key innovation of vLLM for LLM deployment throughput?',
      options: [
        'vLLM uses model parallelism across 8 GPUs by default',
        'vLLM uses PagedAttention to manage KV cache memory efficiently, enabling higher batch sizes and throughput',
        'vLLM applies INT4 quantization automatically before serving',
        'vLLM replaces autoregressive decoding with a parallel decode algorithm',
      ],
      correctAnswer: 1,
      explanation: 'vLLM\'s PagedAttention stores KV cache in paged, non-contiguous memory blocks (inspired by OS virtual memory), dramatically reducing fragmentation and enabling serving 2-24× more requests concurrently than naive implementations.',
      hints: [
        'Memory fragmentation wastes GPU VRAM and limits concurrent requests.',
        'PagedAttention = OS paging applied to KV cache management.',
      ],
    },
    {
      id: 'q-tr-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'SGLang\'s RadixAttention enables KV cache reuse across different requests that share common prompt prefixes, improving throughput for multi-turn conversations.',
      correctAnswer: 'true',
      explanation: 'SGLang\'s RadixAttention uses a radix tree to index KV cache by prompt prefix, allowing instant reuse of cached KV states for requests sharing prefixes — particularly effective for system prompts and multi-turn dialogue.',
      hints: [
        'Multi-turn conversations share a growing prefix (the conversation history).',
        'Reusing cached KV states avoids redundant prefill computation for shared prefixes.',
      ],
    },
    {
      id: 'q-tr-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'When deploying a 70B parameter model across multiple GPUs using tensor parallelism (TP), what is the primary communication bottleneck?',
      options: [
        'Gradient synchronization during the forward pass',
        'All-reduce operations after each tensor-parallel operation (e.g., attention and FFN) to combine partial results from each GPU',
        'Loading model weights from disk at startup',
        'Tokenization speed on the CPU',
      ],
      correctAnswer: 1,
      explanation: 'Tensor parallelism splits weight matrices across GPUs; each GPU computes a partial result. An all-reduce (or all-gather) after each layer combines these partial results — the inter-GPU communication bandwidth (NVLink/InfiniBand) is the primary bottleneck.',
      hints: [
        'Tensor parallelism requires communication after every layer — this dominates inference latency.',
        'NVLink (intra-node) is much faster than InfiniBand (inter-node) — prefer TP within a node.',
      ],
    },
  ],
}

registerQuestions(questions)
export default questions
