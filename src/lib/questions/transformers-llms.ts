import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "self-attention": [
    {
      id: "q-tr-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In scaled dot-product attention with query and key dimension $d_k$, the model computes $\\mathbf{A} = \\text{softmax}\\!\\left(\\frac{\\mathbf{Q}\\mathbf{K}^\\top}{\\sqrt{d_k}}\\right) \\in \\mathbb{R}^{n \\times n}$. If $d_k = 64$, what is the scaling factor and why is it needed?",
      options: [
        "Scale by $d_k = 64$ to ensure each attention row sums to 1",
        "Scale by $\\sqrt{d_k} = 8$ to keep $\\mathbb{V}\\text{ar}(\\mathbf{q}\\cdot\\mathbf{k}) = 1$ for unit-variance $\\mathbf{q}, \\mathbf{k}$, preventing softmax saturation",
        "Scale by $1/d_k = 1/64$ to match the magnitude of value vectors",
        "No scaling is needed; softmax normalises the output automatically",
      ],
      correctAnswer: 1,
      explanation:
        "If $\\mathbf{q}, \\mathbf{k} \\in \\mathbb{R}^{d_k}$ have independent components with mean 0 and variance 1, then:\n\\[\\mathbb{V}\\text{ar}(\\mathbf{q}\\cdot\\mathbf{k}) = \\mathbb{V}\\text{ar}\\!\\left(\\sum_{i=1}^{d_k} q_i k_i\\right) = \\sum_{i=1}^{d_k} \\mathbb{V}\\text{ar}(q_i k_i) = \\sum_{i=1}^{d_k} 1 \\cdot 1 = d_k.\\]\nFor $d_k = 64$, the dot product variance is 64, so $\\mathbf{q}\\cdot\\mathbf{k} \\sim \\mathcal{N}(0, 64)$. Large logits push softmax into saturation (near one-hot output with near-zero gradients). Dividing by $\\sqrt{d_k} = 8$ scales the variance to 1, keeping softmax in a gradient-friendly regime.\n\nAs d2l.ai §11.3.1 notes: the $\\sqrt{d_k}$ factor prevents the softmax function from entering regions where gradients vanish.",
      hints: [
        "Step 1: $\\mathbb{V}\\text{ar}(q_i k_i) = \\mathbb{V}\\text{ar}(q_i) \\cdot \\mathbb{V}\\text{ar}(k_i) = 1 \\cdot 1 = 1$ (for independent unit-variance entries).\nStep 2: $\\mathbb{V}\\text{ar}(\\sum_i q_i k_i) = \\sum_i \\mathbb{V}\\text{ar}(q_i k_i) = d_k$.\nStep 3: To restore variance 1, divide by $\\sqrt{d_k}$.",
        "At saturation: softmax$(\\text{large value}) \\approx$ one-hot $\\Rightarrow$ gradient $\\approx 0$. The $\\sqrt{d_k}$ scaling prevents reaching this regime.",
      ],
    },
    {
      id: "q-tr-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Self-attention computes attention weights $\\alpha_{ij} = \\text{softmax}_{j}\\!\\left(\\frac{\\mathbf{q}_i \\cdot \\mathbf{k}_j}{\\sqrt{d_k}}\\right)$ for all pairs $(i, j)$ where $1 \\leq i, j \\leq n$. For a sequence of length $n = 512$ with $d_k = 64$, how many scalar dot products are needed to fill the full $n \\times n$ attention score matrix?",
      options: [
        "$n \\times d_k = 512 \\times 64 = 32{,}768$",
        "$n \\times n = 512 \\times 512 = 262{,}144$",
        "$n \\times n \\times d_k = 512 \\times 512 \\times 64 = 16{,}777{,}216$",
        "$d_k \\times d_k = 64 \\times 64 = 4{,}096$",
      ],
      correctAnswer: 1,
      explanation:
        "The full attention score matrix $\\mathbf{S} \\in \\mathbb{R}^{n \\times n}$ has one entry for every ordered pair $(i, j)$ of positions. Computing each entry requires one dot product of two $d_k$-dimensional vectors:\n\\[S_{ij} = \\mathbf{q}_i \\cdot \\mathbf{k}_j = \\sum_{t=1}^{d_k} q_{it} k_{jt}.\\]\nEach dot product involves $d_k$ multiply-add operations, but the question asks for the number of **scalar dot products** (the number of $(i, j)$ pairs, i.e., the number of entries in the matrix).\n\nAs d2l.ai §11.6.2 notes, self-attention has $\\mathcal{O}(n^2 \\cdot d_k)$ computational complexity and $\\mathcal{O}(n^2)$ memory complexity. For $n = 512$: the attention matrix alone stores $262{,}144$ entries, requiring $262{,}144 \\times 64 \\approx 16.8$ million scalar operations for the full matrix multiplication $\\mathbf{Q}\\mathbf{K}^\\top$.",
      hints: [
        "The attention score matrix $\\mathbf{S} = \\mathbf{Q}\\mathbf{K}^\\top$ has shape $(n, n)$. Each entry $S_{ij}$ is one dot product — so there are $n^2$ entries and $n^2$ dot products.",
        "Memory for $\\mathbf{S}$: storing all $n^2$ entries. At FP16 (2 bytes/entry), $512^2 \\times 2 \\approx 0.5$ MB per attention layer. For 12 layers: $\\approx 6$ MB just for attention matrices.",
        "The $\\mathcal{O}(n^2)$ memory is the core bottleneck for long sequences — this motivated FlashAttention (which avoids materialising the full matrix in HBM).",
      ],
    },
    {
      id: "q-tr-kp1-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "According to d2l.ai §11.6.2's comparison of CNN, RNN, and self-attention, self-attention achieves O(1) maximum path length between any two positions — a key advantage over RNNs where path length is O(n).",
      correctAnswer: "True",
      explanation:
        "D2l.ai §11.6.2 explicitly compares maximum path lengths: RNNs require O(n) sequential steps to propagate information between distant tokens, while self-attention connects any two positions in a single layer — O(1) maximum path length, enabling much better long-range gradient flow.",
      hints: [
        "In an RNN, to connect position 1 to position 512, information must traverse 511 recurrent steps.",
        "Self-attention creates direct connections between all position pairs in a single operation.",
      ],
    },
  ],

  "multi-head-attention": [
    {
      id: "q-tr-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A transformer uses $d_\\text{model} = 512$ with $h = 8$ attention heads. Each head projects to $d_k = d_\\text{model}/h = 64$ dimensions for queries and keys, and $d_v = 64$ for values. What is the key reason multi-head attention keeps total compute comparable to single-head attention of dimension 512?",
      options: [
        "$d_k = 512$; total compute is 8× higher than single-head because 8 heads run in parallel",
        "$d_k = 512/8 = 64$; total compute is comparable because $h$ heads of dimension $d_\\text{model}/h$ each require $\\mathcal{O}(n^2 \\cdot d_\\text{model}/h)$ FLOPs, giving total $\\mathcal{O}(n^2 \\cdot d_\\text{model})$ — same as single-head",
        "$d_k = 8$; heads use tiny projections, making compute negligible",
        "$d_k = 512$; all heads share the same $\\mathbf{W}^Q, \\mathbf{W}^K, \\mathbf{W}^V$ matrices",
      ],
      correctAnswer: 1,
      explanation:
        "Each head $i$ performs attention in a $d_k$-dimensional subspace:\n\\[\\text{head}_i = \\text{Attention}\\!\\left(\\mathbf{Q}\\mathbf{W}_i^Q, \\mathbf{K}\\mathbf{W}_i^K, \\mathbf{V}\\mathbf{W}_i^V\\right),\\]\nrequiring $\\mathcal{O}(n^2 \\cdot d_k)$ FLOPs. With $h$ heads in parallel:\n\\[\\text{total FLOPs} = h \\times \\mathcal{O}(n^2 \\cdot d_k) = \\mathcal{O}\\bigl(n^2 \\cdot \\underbrace{h \\cdot d_k}_{=d_\\text{model}}\\bigr) = \\mathcal{O}(n^2 \\cdot d_\\text{model}).\\]\nAs \"Attention is All You Need\" specifies (d2l.ai §11.5), this equals the FLOPs of a single attention head with dimension $d_\\text{model}$ — the per-head dimension reduction exactly compensates for having $h$ heads. Total projection parameters: $h \\times (d_\\text{model} \\times d_k) = d_\\text{model} \\times (h \\cdot d_k) = d_\\text{model}^2$ — same as single-head.",
      hints: [
        "Compute per head: $\\mathcal{O}(n^2 \\cdot d_k)$. With $h$ heads: $h \\times \\mathcal{O}(n^2 \\cdot d_k) = \\mathcal{O}(n^2 \\cdot d_\\text{model})$.",
        "Parameter count: each head needs $\\mathbf{W}_i^Q, \\mathbf{W}_i^K, \\mathbf{W}_i^V \\in \\mathbb{R}^{d_\\text{model} \\times d_k}$. Total: $3h d_\\text{model} d_k = 3 d_\\text{model}^2$ — same as 3 $d_\\text{model} \\times d_\\text{model}$ projections for single-head.",
        "The representational benefit of multiple heads is \"free\" in terms of compute — the dimension reduction exactly cancels the multiplicity.",
      ],
    },
    {
      id: "q-tr-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In multi-head attention, outputs from all h heads are concatenated (producing a vector of dimension h × d_k = d_model) and then projected by a weight matrix W^O ∈ ℝ^{d_model × d_model} to produce the final output.",
      correctAnswer: "True",
      explanation:
        "D2l.ai §11.5 describes the multi-head output as: MultiHead(Q,K,V) = Concat(head_1,...,head_h)W^O, where each head_i = Attention(QW_i^Q, KW_i^K, VW_i^V). The final projection W^O mixes information across all heads into a unified d_model-dimensional representation.",
      hints: [
        "Concatenation produces h × d_v = d_model dimensions; W^O then projects back to d_model.",
        "Without W^O, the heads would be independent with no cross-head interaction in the output.",
      ],
    },
    {
      id: "q-tr-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Empirical analysis of BERT\'s attention heads (Clark et al., 2019) found that different heads specialize in distinct syntactic and semantic patterns. Which finding best explains why 8–16 heads outperform 1 head of equal total compute?",
      options: [
        "More heads always produce lower training loss regardless of what they learn",
        "Different heads can capture different relationship types simultaneously (e.g., one head tracks subject-verb agreement, another tracks coreference), combining complementary representations",
        "Multiple heads average out noise in attention weights, producing more stable gradients",
        "Heads in earlier layers learn syntax while later layers are forced to learn semantics",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-head attention\'s power comes from representational diversity: different heads project Q, K, V into different subspaces, each capable of specializing on different relationship types. A single head with the same total compute cannot simultaneously represent multiple distinct relationship patterns.",
      hints: [
        "If all heads learned the same projection, multi-head attention would collapse to single-head attention.",
        "Diversity in learned subspaces is the key — not just averaging or redundancy.",
      ],
    },
  ],

  "positional-encoding": [
    {
      id: "q-tr-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The sinusoidal positional encoding defined in d2l.ai §11.6.3 uses the formula p_{i,2j} = sin(i/10000^{2j/d}) for even dimensions and p_{i,2j+1} = cos(i/10000^{2j/d}) for odd dimensions. For position i = 0, what are all the positional encoding values?",
      options: [
        "All values are 0 since sin(0) = 0",
        "Even-indexed dimensions are 0 (sin(0) = 0) and odd-indexed dimensions are 1 (cos(0) = 1)",
        "All values are 1 since cos(0) = 1",
        "Values alternate between 0 and 10000 depending on the dimension",
      ],
      correctAnswer: 1,
      explanation:
        "As shown in d2l.ai §11.6.3, at position i = 0: sin(0/...) = sin(0) = 0 for all even dimensions, and cos(0/...) = cos(0) = 1 for all odd dimensions. This gives the first token a unique all-{0,1} encoding that differs from all other positions.",
      hints: [
        "Substitute i = 0 into the formula: sin(0) = 0 and cos(0) = 1 regardless of j.",
        "This consistent baseline at i = 0 is one reason the formula uniquely identifies every position.",
      ],
    },
    {
      id: "q-tr-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What property of sinusoidal positional encodings (d2l.ai §11.6.3) makes them theoretically suitable for generalizing to sequences longer than seen during training?",
      options: [
        "The encoding values are always between -1 and 1, preventing numerical overflow",
        "The sinusoidal functions are deterministic — positions beyond the training length have well-defined encodings computed from the same formula, unlike learned position embeddings",
        "Higher-frequency components in later dimensions capture long-range dependencies",
        "Sinusoidal encodings are orthogonal across all positions, ensuring no information overlap",
      ],
      correctAnswer: 1,
      explanation:
        "D2l.ai §11.6.3 notes that sinusoidal encodings are fixed, not learned — the formula applies to any position i, including i > training_length. By contrast, learned position embeddings have no defined representation for unseen positions, making sinusoidal encodings theoretically more length-generalizable.",
      hints: [
        "Learned embeddings require a row in a lookup table — if position 2048 was never trained, there\'s no learned embedding.",
        "The sinusoidal formula computes a valid vector for any integer i without any training.",
      ],
    },
    {
      id: "q-tr-kp3-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "RoPE (Rotary Position Embedding) encodes relative position directly into attention scores by rotating Q and K vectors by a position-dependent angle, so that the dot product q_i · k_j depends only on (i − j), not on i and j separately.",
      correctAnswer: "True",
      explanation:
        "RoPE applies rotation matrices R(i) and R(j) to Q and K respectively; since (R(i)q)·(R(j)k) = q·(R(j-i)k), the dot product encodes only the relative position (i-j). This property is absent in absolute positional encodings and is why RoPE enables better length generalization.",
      hints: [
        "Relative position (i-j) is more transferable than absolute position (i and j separately).",
        "The rotation property: R(i)^T R(j) = R(j-i) means relative offsets naturally emerge from dot products.",
      ],
    },
  ],

  "feed-forward-sublayer": [
    {
      id: "q-tr-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The positionwise FFN in the original transformer (d2l.ai §11.7.3) applies FFN(x) = max(0, xW_1 + b_1)W_2 + b_2 to each token independently. If d_model = 512, the inner dimension is 2048. How many parameters does one FFN sublayer have (counting both linear layers)?",
      options: [
        "512 × 512 = 262,144 parameters",
        "512 × 2048 + 2048 + 2048 × 512 + 512 = 2,099,712 parameters",
        "2048 × 2048 = 4,194,304 parameters",
        "4 × 512 = 2,048 parameters",
      ],
      correctAnswer: 1,
      explanation:
        "The FFN has two weight matrices: W_1 ∈ ℝ^{512×2048} (1,048,576 params) and W_2 ∈ ℝ^{2048×512} (1,048,576 params), plus biases b_1 (2048) and b_2 (512) — totaling ≈ 2.1M parameters. The 4× expansion (2048 = 4 × 512) is standard across the original architecture.",
      hints: [
        "Two weight matrices: d_model × d_ff and d_ff × d_model, where d_ff = 4 × d_model.",
        "The FFN typically has roughly twice the parameters of the multi-head attention sublayer.",
      ],
    },
    {
      id: "q-tr-kp4-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'D2l.ai §11.7.3 notes the FFN is "positionwise" — it applies the same MLP to each token position independently. What architectural principle does this embody, and how does it complement the attention sublayer?',
      options: [
        "It provides parameter sharing across positions, reducing model size by a factor of n",
        "The FFN performs per-token feature transformation (no cross-token mixing), while attention performs cross-token information aggregation — the two sublayers provide complementary operations",
        "It allows the model to process tokens in parallel across the sequence length dimension",
        "Positionwise application ensures the model is invariant to token ordering",
      ],
      correctAnswer: 1,
      explanation:
        "D2l.ai §11.7.3 describes the architectural division of labor: self-attention mixes information across positions (but applies the same learned mixing to any position), while the FFN transforms each position\'s representation independently using a shared MLP — together they provide both cross-token and per-token computation.",
      hints: [
        "Attention = information routing between positions; FFN = per-token feature processing.",
        "The same FFN weights are used for every position — weight sharing across the sequence.",
      ],
    },
    {
      id: "q-tr-kp4-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "SwiGLU activation (used in LLaMA, PaLM) improves over ReLU in the FFN because its gating mechanism SwiGLU(x,W,V,b,c,β) = Swish_β(xW+b) ⊗ (xV+c) allows smooth, data-dependent feature suppression — unlike ReLU\'s hard zero cutoff.",
      correctAnswer: "True",
      explanation:
        "Shazeer (2020) showed that gated linear units including SwiGLU consistently improve language model perplexity over ReLU. The gating term (xV+c) acts as a learned soft switch that scales each feature by a learned sigmoid-like gate, providing smoother gradient flow than ReLU\'s hard zero at negative inputs.",
      hints: [
        "ReLU hard-zeroes negative inputs; SwiGLU uses a learned sigmoid-like gate for soft suppression.",
        "Empirical results (LLaMA paper) show SwiGLU with d_ff = 8d/3 outperforms ReLU with d_ff = 4d.",
      ],
    },
  ],

  "transformer-training": [
    {
      id: "q-tr-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The original transformer used the learning rate schedule lr = d_model^{-0.5} × min(step^{-0.5}, step × warmup_steps^{-1.5}). For d_model = 512 and warmup_steps = 4000, what is the peak learning rate, and approximately at what step does it occur?",
      options: [
        "Peak lr = 0.001 at step 1000",
        "Peak lr = d_model^{-0.5} × warmup_steps^{-0.5} = (512)^{-0.5} × (4000)^{-0.5} ≈ 0.000696 at step 4000",
        "Peak lr = 0.1 at step 10000",
        "Peak lr = 1.0 at step 1 due to the warmup formula",
      ],
      correctAnswer: 1,
      explanation:
        "The two expressions inside min() are equal at step = warmup_steps (step^{-0.5} = step × warmup_steps^{-1.5} when step = warmup_steps). Substituting: lr_peak = 512^{-0.5} × 4000^{-0.5} ≈ 0.0442 × 0.0158 ≈ 0.000696. The schedule warms up linearly then decays as step^{-0.5}.",
      hints: [
        "Set the two expressions equal to find the peak: step^{-0.5} = step × warmup^{-1.5} → step = warmup_steps.",
        "After warmup, the lr decays as 1/√step — this is the inverse square root schedule.",
      ],
    },
    {
      id: "q-tr-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Pre-norm (applying LayerNorm before each sublayer rather than after, as in most modern LLMs) stabilizes training because at initialization, the residual branch output is near-zero, making the gradient signal flow cleanly through the skip connection.",
      correctAnswer: "True",
      explanation:
        "With Pre-norm, the sublayer input is normalized before transformation: x + Sublayer(LayerNorm(x)). At initialization, Sublayer(LayerNorm(x)) ≈ 0, so the residual path carries the gradient signal cleanly. Post-norm normalizes the sum x + Sublayer(x), which can produce large early gradients that destabilize training.",
      hints: [
        "Pre-norm: LayerNorm is applied to the branch input before transformation.",
        "Post-norm (original transformer) requires careful learning rate warmup to avoid early instability.",
      ],
    },
    {
      id: "q-tr-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The original transformer\'s learning rate warmup addresses Adam\'s \"cold start\" problem. In Adam, the effective learning rate is α × m_t / (√v_t + ε). Why is the effective LR dangerously large in the first ~100 steps without warmup?",
      options: [
        "The momentum term m_t is too large because gradients are large at initialization",
        "The variance estimate v_t is near zero at initialization (no history), making 1/√v_t very large — amplifying the gradient signal regardless of α",
        "The bias correction 1/(1-β^t) overcorrects and produces negative learning rates",
        "Adam computes incorrect gradients in the first few steps due to numerical precision",
      ],
      correctAnswer: 1,
      explanation:
        "As noted in the context of d2l.ai §12.10, Adam\'s v_t = β_2 × v_{t-1} + (1-β_2) × g_t². With β_2 = 0.999 and t = 1, v_1 ≈ 0.001 × g_1², making √v_1 tiny even after bias correction. This causes very large effective steps; warmup keeps α small until v_t accumulates meaningful history.",
      hints: [
        "After just 1 step with β_2 = 0.999: v_1 = 0.001 × g² — extremely small.",
        "Small v_t → large 1/√v_t → large effective LR × gradient signal at each coordinate.",
      ],
    },
  ],

  "tokenization-llm": [
    {
      id: "q-tr-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'BPE tokenization starts with a character-level vocabulary and iteratively merges the most frequent adjacent pair. If the corpus contains "low low low low" and "lowest lowest", what is the first merge operation?',
      options: [
        'Merge "l" and "o" because "lo" appears most frequently',
        'Merge "l" and "o" → "lo", then "lo" and "w" → "low" after another step',
        'The first merge is "lo" + "w" = "low" (5 occurrences vs "lo"+"w" individually)',
        'Merge "low" and "est" because "lowest" is a single word',
      ],
      correctAnswer: 0,
      explanation:
        'Starting from characters ["l","o","w"," ","l","o","w",...], "l"+"o" appears 6 times across all words (4 in "low low low low" + 2 in "lowest lowest"), making it the most frequent adjacent pair. BPE merges the single most frequent pair at each step.',
      hints: [
        "Count adjacent character pair frequencies across the entire corpus.",
        "BPE merges the globally most frequent pair regardless of word boundaries (with a word-end marker convention).",
      ],
    },
    {
      id: "q-tr-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The GPT-4 tokenizer (cl100k_base) has a vocabulary of ~100,000 tokens, meaning its embedding table has ~100,000 × d_model rows — roughly 4× the size of GPT-2's 50,257-token vocabulary embedding table.",
      correctAnswer: "True",
      explanation:
        "The embedding table (and tied output projection) has one row per vocabulary token of dimension d_model. A 100K vocabulary with d_model = 4096 uses ~410M parameters just for embeddings — a significant fraction of total model parameters, motivating careful vocabulary size decisions.",
      hints: [
        "Embedding table parameters = vocab_size × d_model — scales linearly with vocabulary.",
        "100K / 50K ≈ 2× more rows, so the embedding table is roughly twice as large for the same d_model.",
      ],
    },
    {
      id: "q-tr-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "LLMs tokenized with BPE consistently fail at counting letters (e.g., \"how many 'r\'s in strawberry?\"). The root cause is most accurately described as:",
      options: [
        "The attention mechanism cannot count discrete symbols",
        'BPE merges "straw" and "berry" (or similar) into multi-character tokens, so the model never explicitly represents individual characters as distinct entities — character-level information is not preserved in the token stream',
        "LLMs lack a counting mechanism and cannot perform any numerical reasoning",
        "The causal mask prevents the model from re-reading previously generated tokens",
      ],
      correctAnswer: 1,
      explanation:
        'With BPE, "strawberry" may become ["straw","berry"] or ["st","raw","berry"]. The model sees token IDs, not characters — it has no mechanism to "look inside" a token. This fundamental information loss at tokenization time, not architectural limitation, causes character-counting failures.',
      hints: [
        'Tokenize "strawberry" with a BPE tokenizer and see how many "r" characters appear in the token stream vs. the original.',
        "The failure is in the interface (tokenization), not the model architecture itself.",
      ],
    },
  ],

  "scaling-laws": [
    {
      id: "q-tr-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Kaplan et al. (2020) found that language model loss L follows a power law with model parameters N: L(N) ∝ N^{-α_N}. If a model achieves L = 3.0 at N = 1B parameters, and the exponent α_N = 0.076, approximately what loss does a 10B model achieve?",
      options: [
        "L ≈ 2.83 (10× parameters reduces loss by about 0.17)",
        "L ≈ 0.3 (linear scaling with 10× the parameters)",
        "L ≈ 1.5 (loss halves with each 10× increase in parameters)",
        "L ≈ 3.0 (parameters have no effect on loss beyond 1B)",
      ],
      correctAnswer: 0,
      explanation:
        "Using the power law: L(10B)/L(1B) = (10B/1B)^{-0.076} = 10^{-0.076} ≈ 0.839. So L(10B) ≈ 3.0 × 0.839 ≈ 2.52. The small exponent (0.076) means loss decreases slowly with scale — a 10× parameter increase reduces loss by only ~16%.",
      hints: [
        "Power law: L(N) ∝ N^{-0.076}. Ratio: L(10N)/L(N) = 10^{-0.076} ≈ 0.84.",
        "The small exponent explains why you need 10× more compute for modest improvements.",
      ],
    },
    {
      id: "q-tr-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Chinchilla paper (Hoffmann et al., 2022) proposed that compute-optimal training requires N and D to scale equally: D_optimal ≈ 20N tokens. A 70B parameter model is therefore compute-optimally trained on approximately how many tokens?",
      options: [
        "70 billion tokens (1 token per parameter)",
        "1.4 trillion tokens (20 × 70B)",
        "7 trillion tokens (100 × 70B)",
        "700 billion tokens (10 × 70B)",
      ],
      correctAnswer: 1,
      explanation:
        "Chinchilla\'s equal-scaling rule: D_optimal ≈ 20N. For N = 70B: D = 20 × 70B = 1.4T tokens. Llama-2-70B was trained on 2T tokens, deliberately over-training the model beyond Chinchilla-optimal to improve inference efficiency (smaller model, better quality per parameter).",
      hints: [
        "Chinchilla: optimal D/N ≈ 20. Multiply model size by 20 to get the token target.",
        "Over-training (beyond 20N tokens) is now common because inference cost is amortized over many queries.",
      ],
    },
    {
      id: "q-tr-kp7-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Emergent abilities in LLMs (Wei et al., 2022) — capabilities that appear abruptly above a parameter threshold — challenge the smooth power-law extrapolation from scaling laws, since they predict sudden non-linear improvements that pretraining loss alone does not anticipate.",
      correctAnswer: "True",
      explanation:
        "Scaling laws predict smooth, continuous improvement in pretraining loss with scale. But emergent abilities like multi-step arithmetic or in-context learning appear suddenly at certain scales — the underlying capability may exist but remains below the benchmark threshold until the model crosses a critical scale, producing discontinuous benchmark curves.",
      hints: [
        "Power laws are smooth; emergence is step-like. Benchmark metrics can hide gradual underlying progress.",
        'The apparent discontinuity may partly reflect metric sensitivity — a task requiring 5 correct steps only "passes" when all 5 are correct simultaneously.',
      ],
    },
  ],

  "pretraining-data": [
    {
      id: "q-tr-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Dolma dataset (used by OLMo) applies multiple deduplication passes using MinHash LSH to remove near-duplicate documents. Why does deduplication improve both training efficiency and model behavior?",
      options: [
        "Fewer documents means smaller disk storage, reducing I/O bottlenecks during training",
        "Duplicated data wastes compute on repeated examples and causes memorization of repeated content verbatim, which is both compute-inefficient and a privacy/copyright risk",
        "Deduplication automatically removes low-quality web content alongside duplicate detection",
        "MinHash LSH reduces the vocabulary size of the resulting tokenized corpus",
      ],
      correctAnswer: 1,
      explanation:
        "Carlini et al. (2023) showed that training data memorization scales with repetition count — documents seen many times are memorized verbatim. Deduplication also improves compute efficiency since each unique example carries more learning signal than the 100th copy of the same document.",
      hints: [
        "If the same article appears 500 times, each pass through it adds ~0 marginal information after the first few.",
        "Memorization of repeated content enables training data extraction attacks — a direct safety concern.",
      ],
    },
    {
      id: "q-tr-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Data mixing ratios (e.g., 80% web, 10% code, 10% academic text) are a critical training hyperparameter for LLMs because the relative frequency of each domain in pretraining directly shapes the model\'s capability distribution across tasks.",
      correctAnswer: "True",
      explanation:
        "The LLaMA 3 and Falcon papers both report that deliberate over-sampling of high-quality domains (code, math, books) improved performance on targeted benchmarks while slightly reducing performance on others — demonstrating that data mixture is a direct dial for capability tuning even before instruction fine-tuning.",
      hints: [
        "A model trained on 50% code vs. 5% code will differ significantly in coding ability, all else equal.",
        "Data mixture is effectively a prior on which tasks you want the model to prioritize.",
      ],
    },
    {
      id: "q-tr-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'The "data contamination" problem in LLM evaluation occurs when benchmark test examples appear in pretraining data. If a model achieves pass@1 = 0.85 on HumanEval but 40% of HumanEval problems appear verbatim in its pretraining data, what is the most appropriate response?',
      options: [
        "The score is still valid since the model still needed to generate correct code",
        "Report contamination-controlled results by excluding or separately reporting contaminated problems, as memorization of test cases inflates pass@1 beyond true generalization ability",
        "Multiply the score by 0.6 to adjust for the 40% contamination rate",
        "Data contamination only matters for closed-book QA benchmarks, not code generation",
      ],
      correctAnswer: 1,
      explanation:
        "If the model memorized exact solutions during pretraining, the measured pass@1 reflects memorization + generalization — not pure generalization ability. Standard practice is to report both overall and contamination-filtered results, and to use held-out private benchmarks for fair comparison.",
      hints: [
        "A model that memorized 40% of HumanEval has an unfair advantage on those problems.",
        "Separating contaminated from uncontaminated problems reveals the true generalization score.",
      ],
    },
  ],

  "llm-architectures": [
    {
      id: "q-tr-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "LLaMA\'s three key architectural departures from the original GPT-2 transformer are: (1) Pre-RMSNorm instead of Post-LayerNorm, (2) SwiGLU instead of ReLU in the FFN, and (3) RoPE instead of absolute sinusoidal positional encodings. Which rationale correctly matches one of these changes?",
      options: [
        "Pre-RMSNorm is used because it adds learnable scale/shift parameters that Post-LayerNorm lacks",
        "RoPE replaces sinusoidal encodings because it encodes relative (not absolute) position directly into attention scores, improving length generalization",
        "SwiGLU is used because it reduces the FFN parameter count to 1/4 of the original",
        "Pre-RMSNorm is applied after each sublayer (not before) for gradient stability",
      ],
      correctAnswer: 1,
      explanation:
        "RoPE (Su et al., 2021) encodes position by rotating Q and K vectors such that their dot product depends only on relative distance — enabling better extrapolation to longer sequences. Pre-RMSNorm (applied before sublayers) improves training stability without learnable shift parameters, and SwiGLU empirically improves perplexity with similar compute.",
      hints: [
        "Absolute encodings encode position i; relative encodings encode the offset (i-j) between positions.",
        "RoPE\'s key property: the attention score between positions i and j depends only on (i-j).",
      ],
    },
    {
      id: "q-tr-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GPT-style (decoder-only) models are now preferred over encoder-decoder architectures (like T5) for most tasks because they unify generation and understanding in a single autoregressive framework, and can perform tasks like classification via conditional generation.",
      correctAnswer: "True",
      explanation:
        'Decoder-only models generate text autoregressively and can perform any task through appropriately framed prompts — classification becomes "the sentiment of this review is [positive/negative]", summarization becomes "TL;DR:", etc. This in-context learning capability scales well and eliminates the need for a separate encoder.',
      hints: [
        "Encoder-decoder models require a fixed input-output format; decoder-only models are task-agnostic through prompting.",
        "GPT-4, Claude, LLaMA — virtually all frontier models are decoder-only.",
      ],
    },
    {
      id: "q-tr-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Mistral 7B uses both Grouped Query Attention (8 KV heads for 32 Q heads) and Sliding Window Attention (window size 4096, context 8192). What are the respective memory savings from each technique during inference with a 8192-token sequence?",
      options: [
        "GQA saves 4× KV cache memory; SWA saves compute but not peak memory for the full sequence",
        "GQA saves 32× KV cache memory; SWA saves 50% of all GPU memory",
        "GQA and SWA both reduce model parameters by 4× each",
        "GQA has no effect on KV cache; SWA saves 4× KV cache memory",
      ],
      correctAnswer: 0,
      explanation:
        "GQA reduces KV cache by 32/8 = 4× (4 query heads share each KV head). SWA limits the attention window but each token still accumulates KV entries up to the window size — it reduces attention compute from O(n²) to O(n×w) but the KV cache still grows with sequence length for the rolling window implementation.",
      hints: [
        "GQA: KV cache reduction = n_Q_heads / n_KV_heads = 32/8 = 4×.",
        "SWA reduces attention FLOPs quadratically but the KV buffer still stores w entries per layer.",
      ],
    },
  ],

  "context-length": [
    {
      id: "q-tr-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A model trained with absolute learned position embeddings up to position 2048 is asked to process a 4096-token sequence. What is the most likely failure mode?",
      options: [
        "A hard error — the model will crash or produce NaN because position 2049 is out of range",
        "Silent degradation — positions 2049–4096 receive out-of-distribution embeddings the model never learned, producing incoherent outputs for the second half",
        "The model truncates the sequence to 2048 tokens automatically",
        "Performance remains identical since transformers are permutation-invariant",
      ],
      correctAnswer: 1,
      explanation:
        "With learned absolute position embeddings, each position index maps to a learnable vector. Positions > training_max (e.g., 2049+) simply have no learned embedding — typically implemented by clipping or zero-padding, producing out-of-distribution inputs that cause sharp quality degradation without error messages.",
      hints: [
        "A lookup table for positions 0–2047 has no defined entry for position 2048.",
        "The failure is silent and gradual — not a hard error, but severely degraded quality for the out-of-range positions.",
      ],
    },
    {
      id: "q-tr-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'The "lost in the middle" phenomenon (Liu et al., 2023) showed that LLMs exhibit a U-shaped recall curve: information at the beginning and end of a long context is retrieved well, but information in the middle is poorly utilized even when it fits within the context window.',
      correctAnswer: "True",
      explanation:
        "Liu et al. (2023) demonstrated this with multi-document QA tasks where the relevant document was placed at varying positions within the context. Models showed primacy (beginning) and recency (end) effects — the middle portion was consistently underutilized regardless of context length, mirroring human serial position effects.",
      hints: [
        "Even with a 32k context window, information at position 16k may be effectively invisible to the model.",
        "This motivates RAG pipeline design: put the most important context at the start or end, not the middle.",
      ],
    },
    {
      id: "q-tr-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "YaRN (Yet Another RoPE extensioN) extends context length by rescaling RoPE frequencies. For dimensions with high-frequency components (short wavelengths), it uses interpolation; for low-frequency components (long wavelengths), it uses extrapolation. Why this asymmetric treatment?",
      options: [
        "High-frequency dimensions are more important and need more parameters",
        "High-frequency components already see repeated sinusoidal patterns within training length (many cycles complete) and interpolate well; low-frequency components have barely completed one cycle at training length and need extrapolation to produce meaningful signals at longer positions",
        "Low-frequency dimensions are always zero at short contexts so they need extrapolation to activate",
        "The asymmetry is purely for numerical stability — both approaches give equivalent results",
      ],
      correctAnswer: 1,
      explanation:
        "RoPE uses wavelengths ranging from 2π (highest frequency) to 2π×10000 (lowest). At training length T, high-frequency dimensions have completed T/wavelength >> 1 cycles — interpolating within known periodic patterns is safe. Low-frequency dimensions may have completed < 1 cycle — extrapolation is needed to generate meaningful positions beyond T.",
      hints: [
        "High-frequency = short wavelength = many complete cycles within training length → safe interpolation.",
        "Low-frequency = long wavelength = fraction of a cycle within training length → must extrapolate.",
      ],
    },
  ],

  "flash-attention": [
    {
      id: "q-tr-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Standard attention materializes the n×n attention matrix in GPU HBM (high-bandwidth memory). For n = 4096 and FP16 (2 bytes/element), what is the memory cost of storing this matrix, and why is FlashAttention\'s tiling approach critical?",
      options: [
        "4096 × 4096 × 2 bytes = 33.6 MB; FlashAttention avoids this by using INT8",
        "4096 × 4096 × 2 bytes = 33.6 MB; FlashAttention tiles the computation in SRAM (on-chip, ~20MB) to avoid writing this matrix to slow HBM, saving O(n²) HBM reads/writes",
        "4096 × 4096 × 2 bytes = 33.6 MB; FlashAttention computes only the top-k attention scores to save memory",
        "The matrix is free since GPUs have infinite shared memory",
      ],
      correctAnswer: 1,
      explanation:
        "Dao et al. (2022) showed that standard attention is memory-bandwidth bound, not compute bound — the bottleneck is reading/writing the n×n matrix to/from HBM. FlashAttention tiles attention into SRAM-sized blocks (~20–40MB), computing softmax incrementally (online softmax trick) without materializing the full matrix in HBM, yielding 2–4× wall-clock speedup.",
      hints: [
        "33.6 MB per layer, times 32 layers = over 1GB just for attention matrices at n = 4096.",
        "SRAM is ~10–100× faster than HBM but much smaller; keeping computation in SRAM avoids the bandwidth bottleneck.",
      ],
    },
    {
      id: "q-tr-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "FlashAttention computes mathematically identical results to standard attention — it is not an approximation — but uses the online softmax algorithm to compute softmax incrementally over tiles without seeing the entire row simultaneously.",
      correctAnswer: "True",
      explanation:
        "The online softmax trick (Milakov & Gimelshein, 2018) maintains running max and sum statistics across tiles, enabling exact softmax computation without materializing the full row. FlashAttention uses this to compute exact attention in O(1) SRAM rather than O(n²) HBM, with zero accuracy trade-off.",
      hints: [
        "Incremental softmax: track max_so_far and sum_so_far; rescale previous outputs as new tiles are seen.",
        '"IO-aware" means optimizing memory access patterns, not approximating the math.',
      ],
    },
    {
      id: "q-tr-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "FlashAttention-2 achieves ~2× speedup over FA-1 by: (1) reducing non-matrix-multiply FLOPs (rescaling operations), (2) better parallelizing across GPU warps, and (3) restructuring loops to minimize warp-level synchronization. Which of these is the dominant win?",
      options: [
        "Reducing non-matmul FLOPs is dominant because matrix multiplications are the slowest operation",
        "Better warp parallelization across the sequence length dimension is dominant — FA-1 had poor GPU utilization because it only parallelized across batch and heads, leaving sequence-length parallelism unused",
        "Warp synchronization reduction is dominant because it eliminates deadlocks in attention computation",
        "All three contribute equally — the 2× speedup is split precisely among the three improvements",
      ],
      correctAnswer: 1,
      explanation:
        "FA-2's primary improvement is parallelizing over the sequence length dimension: FA-1 only parallelized across batch × heads (leaving GPUs idle for small batch or few heads), while FA-2 also parallelizes the outer loop over query blocks — dramatically improving GPU occupancy and SRAM utilization.",
      hints: [
        "A GPU with 108 SMs but only 32 attention heads has 76 idle SMs without sequence-length parallelism.",
        "Distributing query blocks across SMs is the key insight that FA-2 adds over FA-1.",
      ],
    },
  ],

  "kv-cache": [
    {
      id: "q-tr-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A 70B LLaMA-3 model has 80 transformer layers, 8 KV heads per layer, and head_dim = 128. For a single sequence of length 4096 in FP16 (2 bytes), what is the KV cache size?",
      options: [
        "80 × 8 × 128 × 2 bytes ≈ 164 KB (one position only)",
        "2 × 80 × 8 × 128 × 4096 × 2 bytes ≈ 5.4 GB for the full 4096-token sequence",
        "80 × 128 × 4096 × 2 bytes ≈ 84 MB (ignoring K/V distinction)",
        "70B × 2 bytes = 140 GB (the whole model must be cached)",
      ],
      correctAnswer: 1,
      explanation:
        "KV cache = 2 (K and V) × n_layers × n_KV_heads × head_dim × seq_len × bytes = 2 × 80 × 8 × 128 × 4096 × 2 = 5,368,709,120 bytes ≈ 5.4 GB. This is substantial — a 70B FP16 model weighs ~140 GB, so the KV cache is ~4% of model size per 4k tokens, growing linearly with context.",
      hints: [
        "KV cache formula: 2 × layers × KV_heads × head_dim × seq_len × bytes_per_element.",
        "With GQA (8 KV heads vs. 64 Q heads), the cache is already 8× smaller than standard MHA would be.",
      ],
    },
    {
      id: "q-tr-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "During autoregressive decoding, the KV cache allows each new token to be generated with a single forward pass through only the new token\'s position (not the entire prefix), because previous tokens' K and V representations are already cached and can be directly used in attention.",
      correctAnswer: "True",
      explanation:
        "Without the KV cache, generating token t would require recomputing K and V for all t-1 previous tokens from scratch — O(n²) total compute for n-token generation. With the cache, each new token requires only one forward pass: compute Q, K, V for the new token, retrieve cached K, V for all previous tokens, compute attention. Total compute becomes O(n).",
      hints: [
        "Cache hit: previous tokens' K and V are already computed and stored — no recomputation needed.",
        "The tradeoff is memory (KV cache) for compute — standard in LLM serving.",
      ],
    },
    {
      id: "q-tr-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'vLLM\'s PagedAttention stores KV cache entries in non-contiguous, fixed-size memory "pages" (e.g., 16 tokens per page). What specific problem does this solve compared to naive contiguous KV cache allocation?',
      options: [
        "It enables KV cache compression by storing similar entries in the same page",
        "It eliminates fragmentation: naive pre-allocation reserves the maximum sequence length per request even if most tokens are unused; paged allocation allocates pages on-demand, allowing memory from completed requests to be immediately reused",
        "It enables KV cache sharing across GPUs in tensor-parallel deployments",
        "It reduces the KV cache computation cost from O(n) to O(log n)",
      ],
      correctAnswer: 1,
      explanation:
        "Kwon et al. (2023) showed that naive contiguous KV cache allocation wastes 60–80% of GPU memory due to fragmentation and over-allocation. PagedAttention maps logical KV positions to physical pages via a block table (like OS virtual memory), allocating pages only when needed and reclaiming them immediately when a request completes.",
      hints: [
        "Pre-allocating max_seq_len slots per request wastes memory for short sequences.",
        "Physical page addresses are non-contiguous; a block table translates logical sequence positions to physical pages.",
      ],
    },
  ],

  "decoding-strategies": [
    {
      id: "q-tr-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Beam search with beam width B = 4 maintains the top 4 partial sequences at each step. If greedy decoding achieves sequence probability P_greedy, and beam search achieves P_beam, which relationship is guaranteed?",
      options: [
        "P_beam = P_greedy always (beam search is equivalent to greedy)",
        "P_beam ≥ P_greedy always (beam search finds sequences at least as probable as greedy)",
        "P_beam < P_greedy if B is too small (beam search is worse for small B)",
        "P_beam > P_greedy always (beam search strictly beats greedy)",
      ],
      correctAnswer: 1,
      explanation:
        "Beam search with B ≥ 1 is a superset of greedy search (B=1 is greedy). It always finds sequences with probability ≥ greedy because it explores B alternatives at each step instead of 1, and any sequence greedy would find is in beam search\'s candidate set.",
      hints: [
        "Greedy = beam search with B = 1. Beam search with B ≥ 2 keeps more candidates.",
        '"Guaranteed" is the key word — P_beam ≥ P_greedy is a formal property of the algorithm.',
      ],
    },
    {
      id: "q-tr-kp13-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Top-p sampling with p = 0.9 samples from the smallest set of tokens whose cumulative probability ≥ 0.9. For a very peaked distribution (e.g., one token has probability 0.95), how many tokens are in the nucleus?",
      options: [
        "Always exactly 90 tokens (p = 0.9 means top 90%)",
        "Just 1 token — the single token with p = 0.95 already exceeds the threshold of 0.9",
        "All tokens with probability > 0.01 (1%)",
        "10 tokens — the top 10% of the vocabulary",
      ],
      correctAnswer: 1,
      explanation:
        "The nucleus is the minimal set with cumulative probability ≥ p. If one token already has probability 0.95 > 0.9, it alone forms the entire nucleus — top-p sampling essentially becomes deterministic for peaked distributions, while using a broader set for uncertain (flat) distributions.",
      hints: [
        '"Smallest set" means we stop adding tokens as soon as cumulative probability crosses p.',
        "This adaptive behavior is top-p\'s advantage over top-k: it naturally handles both peaked and flat distributions.",
      ],
    },
    {
      id: "q-tr-kp13-3",
      type: "true-false",
      difficulty: "hard",
      question:
        "Beam search consistently outperforms sampling-based methods on open-ended creative generation tasks (stories, dialogue) according to human preference evaluations.",
      correctAnswer: "False",
      explanation:
        'Holtzman et al. (2020) "The Curious Case of Neural Text Degeneration" showed that beam search produces text that is high-probability but bland, generic, and repetitive — humans consistently prefer nucleus-sampled text for open-ended generation. Beam search is better for constrained tasks (translation, summarization) where there is a clearly correct output.',
      hints: [
        "High probability ≠ high quality for creative tasks — unexpected choices make text interesting.",
        'Beam search\'s repetition problem: "the company said the company said the company said..." maximizes P(token | prefix) locally.',
      ],
    },
  ],

  "speculative-decoding": [
    {
      id: "q-tr-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In speculative decoding, a draft model proposes k = 5 tokens and the target model verifies them in one forward pass. If k = 5 draft tokens are accepted on average, what is the approximate speedup factor compared to standard autoregressive decoding?",
      options: [
        "5× speedup — generating 5 tokens per target model call instead of 1",
        "10× speedup — the draft model processes 5 tokens twice as fast",
        "2× speedup — the draft and target models run in parallel",
        "No speedup — the draft model adds overhead that cancels the gains",
      ],
      correctAnswer: 0,
      explanation:
        "Each target model forward pass now verifies k (on average) draft tokens instead of producing 1. If the acceptance rate allows average 5 tokens per call, throughput is ~5× higher. The draft model overhead is small because it is much smaller (e.g., 7B draft for a 70B target), running ~10× faster per token.",
      hints: [
        "Speedup ≈ average accepted tokens per target call. If all k tokens are accepted, speedup ≈ k.",
        "The target model call is the bottleneck — getting more tokens per call directly improves throughput.",
      ],
    },
    {
      id: "q-tr-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Speculative decoding (Leviathan et al., 2023) guarantees that the output token distribution is identical to the target model\'s distribution — not the draft model\'s — through an acceptance-rejection mechanism that corrects draft tokens whenever they deviate from the target.",
      correctAnswer: "True",
      explanation:
        "For each draft token x, speculative decoding accepts it with probability min(1, p_target(x)/p_draft(x)). If rejected, a correction token is sampled from a modified distribution (p_target - p_draft normalized). This guarantees the output is exactly distributed as the target model, making speculative decoding lossless.",
      hints: [
        "Accept probability = min(1, p_target/p_draft): tokens more likely under target than draft are always accepted.",
        "Rejection plus correction sampling ensures the resulting distribution is exactly p_target — provably.",
      ],
    },
    {
      id: "q-tr-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Self-speculative decoding (e.g., Medusa, EAGLE) avoids requiring a separate draft model by generating draft tokens using lightweight heads attached to the target model itself. What is the key limitation compared to using a separate smaller draft model?",
      options: [
        "Self-speculative methods cannot guarantee output quality equivalence with the target model",
        "The draft heads must still run the full target model backbone to generate candidates — the speedup is limited by the target model\'s sequential execution, whereas a separate small draft model can run on different hardware or in parallel",
        "Self-speculative methods only work for models with fewer than 7B parameters",
        "Draft heads cannot be trained because there is no labeled data for multi-token prediction",
      ],
      correctAnswer: 1,
      explanation:
        "Methods like Medusa add parallel prediction heads to predict multiple future tokens simultaneously from the same hidden state, without sequential draft generation. The limitation is that speculative token quality depends on the single hidden state, which may not capture future context as well as a small autoregressive draft model running multiple steps.",
      hints: [
        "Medusa heads generate k candidates in parallel from one position — no sequential draft rollout.",
        "A proper small draft model runs multiple autoregressive steps, each conditioned on previous drafts — richer context for candidate generation.",
      ],
    },
  ],

  "quantization-llm": [
    {
      id: "q-tr-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A 7B parameter model in FP16 uses 7B × 2 bytes = 14 GB. If we quantize to INT4 (4-bit), what is the theoretical model size? What is a practical consideration that makes the actual size slightly larger?",
      options: [
        "7B × 4 bits = 3.5 GB theoretical; group scaling factors (one FP16 per group of 128 weights) add ~1% overhead",
        "7B × 4 bits = 3.5 GB theoretical; practical size is identical to theoretical",
        "7B × 4 bits = 14 GB theoretical (1 byte = 1 nibble confusion)",
        "7B × 4 bits = 7 GB theoretical because 4-bit integers take 1 byte each in hardware",
      ],
      correctAnswer: 0,
      explanation:
        "INT4 uses 4 bits/weight: 7B × 0.5 bytes = 3.5 GB theoretical. GPTQ/AWQ use group quantization with one FP16 scale and zero-point per group of 128 weights — adding 7B/128 × 2 × 2 bytes ≈ 219 MB overhead (~6%), bringing practical size to ~3.7 GB.",
      hints: [
        "4 bits = 0.5 bytes per weight: 7B × 0.5 = 3.5 GB.",
        "Group scaling: each 128-weight group needs its own scale factor stored in FP16 — small but real overhead.",
      ],
    },
    {
      id: "q-tr-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GPTQ quantizes weights to INT4 by minimizing per-layer quantization error using the inverse Hessian of the layer\'s input activations, compensating remaining weights for the error introduced by already-quantized weights.",
      correctAnswer: "True",
      explanation:
        "GPTQ (Frantar et al., 2022) applies Optimal Brain Quantization (OBQ) layer-by-layer: for each weight column being quantized, it computes the Hessian (second-order information about sensitivity) and adjusts remaining weights to compensate for the introduced error — achieving near-lossless INT4 quantization with perplexity degradation < 1 point on most models.",
      hints: [
        "Hessian diagonal tells you which weights are most sensitive to perturbation — quantize less-sensitive weights more aggressively.",
        "The compensation step: after quantizing weight w, update remaining weights to minimize the layer output change.",
      ],
    },
    {
      id: "q-tr-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'AWQ (Activation-Aware Weight Quantization) identifies "salient" weights — those that produce large output activations — and protects them by applying per-channel input scaling before quantization. Why does scaling the input channel protect these weights without changing model output?',
      options: [
        "Scaling inputs makes activations smaller, so the model naturally ignores those weights",
        "If input channel i is scaled by s, weight w_i must be divided by s to preserve output (s × x_i × w_i/s = x_i × w_i); the effective weight w_i/s is now smaller in magnitude and quantizes more accurately",
        "Scaling effectively increases the bit-width allocated to salient weights",
        "AWQ scaling is applied only during training and removed before deployment",
      ],
      correctAnswer: 1,
      explanation:
        "AWQ exploits the identity: (s × x_i) × (w_i/s) = x_i × w_i. By absorbing the scale s into the input (via preceding LayerNorm) and inverse-scaling the weights (w_i/s), salient weights become smaller in magnitude, reducing their quantization error while keeping the mathematical output unchanged.",
      hints: [
        "Key insight: scale × input AND divide weight by same scale — output is mathematically identical.",
        "Smaller weight magnitude → smaller absolute quantization error for the same number of bits.",
      ],
    },
  ],

  "lora-peft": [
    {
      id: "q-tr-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "LoRA (Hu et al., 2021) adds ΔW = BA where B ∈ ℝ^{d×r} and A ∈ ℝ^{r×k}. For a weight matrix W ∈ ℝ^{4096×4096} with rank r = 16, how many trainable parameters does the LoRA adapter add, vs. the full weight matrix?",
      options: [
        "LoRA adds 4096 × 16 + 16 × 4096 = 131,072 params vs. 4096 × 4096 = 16,777,216 — about 0.78% of the full matrix",
        "LoRA adds 4096 × 4096 = 16,777,216 params (same as full fine-tuning)",
        "LoRA adds 16 × 16 = 256 params per weight matrix",
        "LoRA adds 4096 × 16 = 65,536 params (only matrix A is trainable)",
      ],
      correctAnswer: 0,
      explanation:
        "LoRA adapter parameters: |B| + |A| = d×r + r×k = 4096×16 + 16×4096 = 65,536 + 65,536 = 131,072 params. The full W has 4096² = 16.8M params. LoRA reduces trainable parameters to 131K/16.8M ≈ 0.78% — enabling fine-tuning on consumer hardware.",
      hints: [
        "B: d × r matrix; A: r × k matrix. Both are trained; W is frozen.",
        "r is the bottleneck dimension — low rank means very few parameters in the update.",
      ],
    },
    {
      id: "q-tr-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "After LoRA fine-tuning, the adapter matrices B and A can be merged into the base model by computing W_new = W + BA, resulting in zero inference overhead compared to the original model.",
      correctAnswer: "True",
      explanation:
        "Since W_new = W + BA is just matrix addition, the merged model has the exact same architecture and forward pass as the original — no adapter branching at inference time. The merge trades a one-time matrix addition (cheap) for zero per-inference overhead (critical for latency-sensitive serving).",
      hints: [
        "W + BA produces a single matrix of the same shape as W — no architectural change.",
        "Without merging, LoRA adds two extra matrix multiplications per adapted layer at inference time.",
      ],
    },
    {
      id: "q-tr-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "QLoRA (Dettmers et al., 2023) introduces NF4 (NormalFloat 4-bit) quantization, which uses quantization levels placed at the quantiles of a standard normal distribution. Why is NF4 superior to uniform INT4 for quantizing LLM weights?",
      options: [
        "NF4 uses 5 bits instead of 4, providing higher precision",
        "LLM weights follow approximately a normal distribution; NF4 places more quantization levels in the high-density center region, minimizing mean squared quantization error for normally-distributed values vs. uniform INT4 which wastes levels in low-density tails",
        "NF4 is compatible with INT8 hardware while INT4 is not",
        "NF4 quantizes activations instead of weights, avoiding the need for calibration data",
      ],
      correctAnswer: 1,
      explanation:
        "Information-theoretically optimal quantization places levels at quantiles of the data distribution. Since weights ∼ N(0,σ²), most weight values cluster near zero — NF4 levels are denser near zero (matching the high-probability region) and sparser in the tails, minimizing expected quantization error versus uniform INT4 which places equal spacing across the full range.",
      hints: [
        "Uniform INT4 wastes precision on the sparse tails; NF4 concentrates precision where weights are most likely.",
        "Quantile-spaced levels minimize mean squared error for known distributions — basic optimal quantization theory.",
      ],
    },
  ],

  "instruction-tuning": [
    {
      id: "q-tr-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The FLAN paper (Wei et al., 2021) showed that instruction tuning on a diverse set of task descriptions dramatically improves zero-shot performance on held-out tasks. What does this demonstrate about what instruction tuning teaches the model?",
      options: [
        "Instruction tuning memorizes the training task examples and generalizes via lookup",
        'Instruction tuning teaches the model to follow the instruction format — "what it means to follow an instruction" — enabling generalization to novel task types never seen during tuning',
        "Instruction tuning only improves performance on tasks similar to the training tasks",
        "Instruction tuning reduces perplexity on the pretraining data distribution",
      ],
      correctAnswer: 1,
      explanation:
        'FLAN\'s key finding: a model instruction-tuned on 62 task clusters achieves strong zero-shot performance on held-out clusters not seen during tuning. This suggests instruction tuning teaches a general pattern of "interpret the instruction and produce a response" that transfers across task types — not just memorization of training tasks.',
      hints: [
        "If instruction tuning only memorized training tasks, performance on held-out tasks would not improve.",
        "The diversity of training tasks is crucial — the model learns instruction-following as a skill.",
      ],
    },
    {
      id: "q-tr-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "When fine-tuning with instruction data, computing cross-entropy loss on prompt/instruction tokens as well as response tokens trains the model equally well as computing loss only on response tokens.",
      correctAnswer: "False",
      explanation:
        "Including the prompt in the loss trains the model to predict given instructions — an uninformative signal that may cause instruction memorization. The InstructGPT and Alpaca papers both mask the loss on prompt tokens: only response tokens contribute to the gradient, focusing training on the generative objective of producing correct responses.",
      hints: [
        "Prompt tokens are the input — training to predict them is like predicting your own question.",
        "Loss masking on prompts: set the target tokens for the prompt to -100 (ignored by cross-entropy).",
      ],
    },
    {
      id: "q-tr-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DPO (Direct Preference Optimization, Rafailov et al., 2023) replaces the RLHF pipeline by optimizing the loss: L_DPO = -log σ(β log(π_θ(y_w|x)/π_ref(y_w|x)) - β log(π_θ(y_l|x)/π_ref(y_l|x))). What does increasing β do to model behavior?",
      options: [
        "Increasing β makes the model more likely to generate responses similar to y_w (preferred responses)",
        "Increasing β increases the KL penalty, keeping the fine-tuned model closer to the reference model and reducing its deviation from the original pretraining distribution",
        "Increasing β reduces the training loss but does not change model outputs",
        "Increasing β speeds up convergence by scaling the gradient signal",
      ],
      correctAnswer: 1,
      explanation:
        "β in DPO controls the KL divergence penalty between the fine-tuned policy π_θ and the reference π_ref. High β means high penalty for deviating from the reference model — the model learns preferences while staying close to the base model. Low β allows larger departures from the reference distribution.",
      hints: [
        "DPO implicitly optimizes reward minus β × KL(π_θ || π_ref) — β controls this trade-off.",
        "High β = conservative (stay close to base model); low β = aggressive (maximize reward, ignore KL cost).",
      ],
    },
  ],

  "grouped-query-attention": [
    {
      id: "q-tr-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Grouped Query Attention (GQA) uses G groups of KV heads for H query heads (G < H). LLaMA-3-70B has 64 query heads and 8 KV heads. What is G and how does this reduce KV cache compared to full MHA?",
      options: [
        "G = 64; no reduction — all heads still require their own K and V",
        "G = 8; KV cache is 64/8 = 8× smaller than MHA since 8 K/V heads serve all 64 Q heads",
        "G = 8; KV cache is 8× larger because GQA stores extra metadata",
        "G = 1 (MQA); KV cache is reduced to a single K and V for all heads",
      ],
      correctAnswer: 1,
      explanation:
        "With G = 8 KV groups and H = 64 Q heads, each group serves 64/8 = 8 query heads. KV cache size = 2 × layers × 8 × head_dim × seq_len, vs. 2 × layers × 64 × head_dim × seq_len for MHA — an 8× reduction. Ainslie et al. (2023) showed GQA achieves near-MHA quality at near-MQA inference efficiency.",
      hints: [
        "G = n_KV_heads = 8. KV cache reduction factor = n_Q_heads / n_KV_heads = 64/8 = 8×.",
        "Each KV group is shared by H/G = 64/8 = 8 query heads during attention computation.",
      ],
    },
    {
      id: "q-tr-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "To convert a pretrained MHA model to GQA without full retraining, Ainslie et al. (2023) showed that mean-pooling the original H KV heads into G groups provides a strong initialization for subsequent GQA fine-tuning with modest compute.",
      correctAnswer: "True",
      explanation:
        'The GQA paper proposed "uptrained" conversion: group the H original KV head projections into G groups of H/G, mean-pool each group into a single KV head, and fine-tune on 5% of the original pretraining budget to recover nearly full MHA quality — making GQA accessible without full retraining from scratch.',
      hints: [
        "Averaging H/G KV heads into 1 is an initialization strategy — not the final trained state.",
        "5% retraining budget is much cheaper than the full pretraining cost, making GQA conversion practical.",
      ],
    },
    {
      id: "q-tr-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multi-Query Attention (MQA, Shazeer 2019) is the extreme case of GQA with G = 1. Compared to GQA with G = 8, what is the quality trade-off and inference benefit of MQA for a model with 64 query heads?",
      options: [
        "MQA achieves identical quality to GQA-8 but with 64× smaller KV cache",
        "MQA achieves 8× smaller KV cache than GQA-8 (64 vs. 8 KV heads), but shows more quality degradation — GQA-8 better balances efficiency and quality",
        "MQA always outperforms GQA because fewer parameters means less overfitting",
        "MQA and GQA-8 have identical KV cache sizes because head_dim is scaled accordingly",
      ],
      correctAnswer: 1,
      explanation:
        "MQA (G=1): KV cache is 64× smaller than MHA. GQA-8 (G=8): KV cache is 8× smaller than MHA, 8× larger than MQA. Ainslie et al. showed MQA has noticeable quality loss (especially on tasks requiring fine-grained attention), while GQA-8 recovers most of MHA quality while retaining most of MQA\'s efficiency — making GQA the Pareto-optimal choice for modern LLMs.",
      hints: [
        "MQA: 1 KV head for all 64 Q heads — extreme memory saving, but a single KV must serve all diversity of Q heads.",
        "GQA-8: 8 KV heads, each serving 8 Q heads — more diverse representations than MQA with 8× less cache than MHA.",
      ],
    },
  ],

  "mixture-of-experts": [
    {
      id: "q-tr-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Mixtral 8×7B has 8 expert FFNs per transformer layer and activates k = 2 experts per token via a router. If each expert has the same size as the FFN in a 7B dense model, what is the approximate active parameter count per token during inference?",
      options: [
        "8 × 7B = 56B parameters are active for every token",
        "~13B parameters active per token: attention layers (~7B) are always active, plus 2/8 of the total FFN expert parameters",
        "2 × 7B = 14B parameters active (2 experts × full model size)",
        "7B parameters active — same as a dense 7B model since 2/8 = 1/4 of experts compensates",
      ],
      correctAnswer: 1,
      explanation:
        "Mixtral\'s total params: ~46.7B (attention + all 8 FFN experts × layers). Attention parameters (~7B-equivalent) are always active. Each FFN expert ≈ 1B parameters; 2/8 experts active ≈ 2B of expert params per layer × 32 layers ≈ 6B expert params. Total active ≈ 7B + 6B ≈ 13B — similar to dense 13B model performance at dense 7B inference cost.",
      hints: [
        "Active = always-on (attention) + 2/8 × FFN experts.",
        "Mixtral\'s key claim: 46.7B total params but ~13B active = better quality than dense 13B at similar inference cost.",
      ],
    },
    {
      id: "q-tr-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Without an auxiliary load balancing loss, MoE models collapse: the router learns to always route tokens to the same 1–2 experts, making most expert capacity permanently unused and eliminating the benefit of having multiple experts.",
      correctAnswer: "True",
      explanation:
        "Router collapse is a well-documented MoE failure mode: a popular expert gets more gradient signal → improves faster → gets routed to more → gets even more signal (positive feedback loop). The load balancing loss (e.g., auxiliary cross-entropy over expert assignment uniformity) breaks this cycle by penalizing unequal routing.",
      hints: [
        "More gradient signal → better expert → more routing → more signal: a positive feedback loop.",
        "The auxiliary loss adds a small penalty proportional to the variance in expert load, discouraging concentration.",
      ],
    },
    {
      id: "q-tr-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'DeepSeek-V2\'s fine-grained MoE architecture uses 160 routed experts with top-6 routing, plus 2 always-on "shared experts". Why are shared (always-on) experts beneficial in addition to routed experts?',
      options: [
        "Shared experts handle the routing computation, reducing router overhead",
        "Shared experts capture common knowledge and representations needed by all tokens (e.g., basic language modeling), while routed experts specialize in domain-specific patterns — preventing specialization from damaging general capability",
        "Shared experts prevent router collapse by providing a guaranteed gradient path",
        "Shared experts are replicated across GPUs for load balancing without communication overhead",
      ],
      correctAnswer: 1,
      explanation:
        "Routed experts can over-specialize: if all experts compete for specific niches, general-purpose representations may degrade. Shared experts that all tokens always pass through maintain stable general-purpose feature extraction, while routed experts add specialization on top — a divide between general and specialized processing.",
      hints: [
        'Shared experts ≈ the "general" backbone; routed experts ≈ the "specialist" modules.',
        "Without shared experts, every expert must balance generalism and specialism — leading to worse specialization.",
      ],
    },
  ],

  "sliding-window-attention": [
    {
      id: "q-tr-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Sliding Window Attention (SWA) with window size w = 4096 processes a sequence of n = 32768 tokens. What is the memory cost of the attention matrix vs. full self-attention?",
      options: [
        "SWA attention matrix: n × n = 32768² ≈ 1.1B elements; same as full attention",
        "SWA attention matrix: n × w = 32768 × 4096 ≈ 134M elements — 8× smaller than full attention\'s n² ≈ 1.1B elements",
        "SWA attention matrix: w × w = 4096² ≈ 16.8M elements — 67× smaller",
        "SWA has no attention matrix — it replaces attention with linear convolutions",
      ],
      correctAnswer: 1,
      explanation:
        "In SWA, each of n tokens attends to its w nearest neighbors — the attention matrix is n × w instead of n × n. For n = 32768 and w = 4096: n × w = 134M vs. n² = 1.07B — an n/w = 8× reduction. This enables linear O(n×w) memory scaling rather than quadratic O(n²) for full attention.",
      hints: [
        "Each row of the attention matrix has w non-zero entries instead of n.",
        "Total attention matrix size: n rows × w columns = n×w, vs. n×n for full attention.",
      ],
    },
    {
      id: "q-tr-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "A model with L = 32 transformer layers using SWA with window size w = 4096 can propagate information from position 1 to position 131,073 (32 × 4096 = 131,072 positions), despite each layer attending to at most 4096 neighboring positions.",
      correctAnswer: "True",
      explanation:
        "This is the receptive field argument: layer 1 sees positions within w of each token; layer 2 sees positions within w of layer-1 representations (which already aggregate w-wide neighborhoods); after L layers, each position has an effective receptive field of L × w. Like deep CNNs, local attention layers compose into global context.",
      hints: [
        "Analogy: a CNN with kernel size 3 has receptive field 3 at layer 1, 5 at layer 2, 2L+1 at layer L.",
        "SWA effective receptive field = L × w — grows linearly with depth.",
      ],
    },
    {
      id: "q-tr-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Longformer uses a hybrid of SWA (local attention) + global attention tokens. The [CLS] token and task-relevant tokens are given global attention. What is the computational complexity of this hybrid scheme for n tokens with w window and g global tokens?",
      options: [
        "O(n²) — global tokens make it equivalent to full attention",
        "O(n × (w + g)) — linear in n (with n >> w, g), much cheaper than O(n²) full attention while enabling long-range integration through the g global tokens",
        "O(n × w + g²) — local window is linear; global tokens form a quadratic bottleneck",
        "O(n × g) — only global token interactions matter; local attention is free",
      ],
      correctAnswer: 1,
      explanation:
        "Longformer complexity: local attention = O(n × w); global attention = O(n × g) (each of n tokens attends to all g global tokens, and g global tokens attend to all n). Total = O(n × (w + g)), which is linear in n when w and g are fixed constants << n — enabling efficient processing of very long documents.",
      hints: [
        "Local: n × w interactions. Global: n × g interactions (n tokens × g globals each way).",
        "Total O(n(w+g)) is linear in n — the quadratic bottleneck of full attention is eliminated.",
      ],
    },
  ],

  "retrieval-augmented-llm": [
    {
      id: "q-tr-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A basic RAG pipeline retrieves the top-k = 5 document chunks most similar to the query (using cosine similarity of dense embeddings) and prepends them to the LLM prompt. What is the primary failure mode when retrieval quality is low?",
      options: [
        "The LLM refuses to generate answers when irrelevant context is provided",
        "Irrelevant retrieved chunks contaminate the prompt context, confusing the LLM and potentially causing it to generate plausible-sounding but incorrect answers grounded in the wrong documents",
        "The LLM ignores all retrieved context and answers only from its weights",
        "The embedding model runs out of memory when processing 5 chunks simultaneously",
      ],
      correctAnswer: 1,
      explanation:
        'RAG faithfulness depends on retrieval precision: irrelevant chunks can actively harm generation by providing misleading context. LLMs tend to "stay grounded" in provided context even when it is wrong — a behavior called faithfulness to context that backfires when retrieval retrieves the wrong documents.',
      hints: [
        "LLMs are trained to use provided context — they don\'t automatically ignore irrelevant information.",
        "Retrieval precision is often more important than recall for RAG quality.",
      ],
    },
    {
      id: "q-tr-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "RAG (Lewis et al., 2020) showed that jointly training the retriever and generator using non-differentiable retrieval (via marginalization over discrete retrieved documents) is possible through MIPS (Maximum Inner Product Search) and gradient approximation.",
      correctAnswer: "True",
      explanation:
        "RAG jointly trains BERT-based dense retriever and BART-based generator by marginalizing over top-k retrieved documents: p(y|x) = Σ_z p_η(z|x) × p_θ(y|x,z). Gradients flow to both retriever (via document probabilities) and generator (via generation loss), though retrieval requires MIPS which is non-differentiable — approximated via in-batch updates.",
      hints: [
        "Marginalization: sum over top-k retrieved documents weighted by their retrieval probability.",
        "The retriever is updated to retrieve documents that help the generator — not just documents with keyword overlap.",
      ],
    },
    {
      id: "q-tr-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "HyDE (Hypothetical Document Embeddings, Gao et al., 2022) improves RAG retrieval by generating a hypothetical answer first and using its embedding (not the query embedding) for retrieval. Why does this improve retrieval quality?",
      options: [
        "Hypothetical answers have shorter text than questions, reducing embedding computation cost",
        "The embedding space is trained on documents — document-to-document similarity is more reliable than query-to-document similarity; a hypothetical answer written in document style better matches the retrieval corpus embedding distribution",
        "HyDE uses the LLM to directly search the database, bypassing embedding similarity",
        "Generating a hypothetical answer forces the LLM to commit to one interpretation of the query, reducing retrieval ambiguity",
      ],
      correctAnswer: 1,
      explanation:
        'Dense retrieval models are trained to embed queries and documents in the same space, but the distributional gap between question-style queries and answer-style documents creates a "query-document gap". HyDE bridges this by generating a hypothetical document (answer-style text) whose embedding naturally aligns with the target document distribution, improving recall.',
      hints: [
        'The retriever embeds both query and documents — but queries ("What is X?") and documents ("X is...") have different text distributions.',
        "A generated answer in document style inhabits the same embedding space as real answers.",
      ],
    },
  ],

  "tool-calling-llm": [
    {
      id: "q-tr-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "When an LLM with tool-calling capability decides to call a function, it outputs a structured tool call specification. In OpenAI\'s function calling format, what does the model actually return for a weather lookup call?",
      options: [
        'Executable Python code: `weather_api.get("London", unit="celsius")`',
        'A JSON object specifying the function name and typed arguments: {"name": "get_weather", "arguments": {"location": "London", "unit": "celsius"}}',
        'A natural language description: "Please look up the weather in London in Celsius"',
        "A direct HTTP request to the weather API endpoint",
      ],
      correctAnswer: 1,
      explanation:
        "The LLM generates structured JSON with function name and arguments — not executable code or API calls. The application layer parses this JSON, executes the actual function call, and returns the result as a tool message back to the LLM for incorporation into the final response.",
      hints: [
        "LLMs are text models — they output text/JSON, never directly execute code or make HTTP requests.",
        "The tool call JSON is parsed by the application, not by the LLM itself.",
      ],
    },
    {
      id: "q-tr-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Parallel tool calling — where the LLM outputs multiple tool call objects in a single response — reduces total latency for independent tool lookups by allowing concurrent execution rather than serial (one tool at a time) execution.",
      correctAnswer: "True",
      explanation:
        "If a task requires querying weather in 3 cities, serial tool calling requires 3 LLM calls (one per tool + response incorporation); parallel tool calling allows the LLM to output all 3 tool requests at once, the application executes them concurrently, and returns all results in a single tool message batch — reducing 3 round-trips to 1.",
      hints: [
        "Serial: request tool 1 → wait → request tool 2 → wait → request tool 3 → final answer.",
        "Parallel: request all 3 tools at once → wait once → final answer. Fewer round-trips = lower latency.",
      ],
    },
    {
      id: "q-tr-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Prompt injection in tool-calling agents occurs when malicious content in tool outputs contains instructions that override the agent\'s original task. Which defense mechanism most directly addresses this attack?",
      options: [
        "Increasing the temperature parameter so the LLM ignores injected instructions",
        'Structurally separating tool output content from the instruction namespace — e.g., placing tool results in a sandboxed "data" context with lower trust than the system prompt, so injected instructions are not interpreted as authoritative commands',
        "Restricting tool calls to a whitelist of 5 pre-approved functions",
        "Running the agent with a smaller context window to limit the impact of injected content",
      ],
      correctAnswer: 1,
      explanation:
        'Prompt injection exploits the LLM\'s inability to distinguish data from instructions — both appear as text in the context. Structural defenses create privilege levels: system prompt > user message > tool output. If the LLM is trained to treat tool outputs as data (not instructions), injected "Ignore previous instructions" in tool results has no effect.',
      hints: [
        "The root cause: LLMs treat all text in context equally, regardless of source.",
        "Defense principle: privilege separation — system instructions >> data from external tools.",
      ],
    },
  ],

  "agents-llm": [
    {
      id: "q-tr-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'The ReAct (Reason + Act) agent framework (Yao et al., 2022) interleaves Thought, Action, and Observation steps. For a task "Find the population of the capital of France", what is the correct ReAct trace structure?',
      options: [
        'Action: search("France capital population") → Observation: 2.1M → Final Answer: 2.1M',
        'Thought: "France\'s capital is Paris, I need to find Paris\'s population" → Action: search("Paris population") → Observation: "Paris population is 2.1M" → Thought: "I have the answer" → Final Answer: 2.1M',
        'Thought: "The population is 2.1M" → Final Answer: 2.1M (no action needed)',
        'Action: search("France") → Action: search("capital") → Action: search("population") → Final Answer: 2.1M',
      ],
      correctAnswer: 1,
      explanation:
        "ReAct\'s interleaved structure: Thought reasons about the current state and next step; Action executes a tool call; Observation records the tool result; this cycle repeats until a final answer can be produced. The explicit Thought steps make reasoning traceable and debuggable, unlike pure action-based or pure reasoning-based agents.",
      hints: [
        "The cycle is: Thought → Action → Observation → Thought → ... → Final Answer.",
        "Explicit thoughts are the key innovation — they make the agent\'s internal reasoning observable.",
      ],
    },
    {
      id: "q-tr-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LLM agents with temperature = 0 (greedy decoding) are fully deterministic: given identical inputs and tool outputs, they always produce identical action sequences.",
      correctAnswer: "False",
      explanation:
        "Even with temperature = 0, LLM agents can behave non-deterministically due to: (1) floating-point non-determinism in GPU parallel operations, (2) external tool variability (web search results change), (3) API-level batching affecting softmax computation. Perfect reproducibility requires identical hardware, software, random seeds, and deterministic tool outputs.",
      hints: [
        "Floating-point addition is not associative — parallel GPU reductions can give different results across runs.",
        "Real-world tools (search, APIs) return time-varying results — a major source of agent non-determinism.",
      ],
    },
    {
      id: "q-tr-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multi-agent architectures with an orchestrator and specialized subagents outperform single-agent systems on long-horizon tasks primarily because:",
      options: [
        "Multiple agents use more total compute, which always improves task quality",
        "Subagents maintain focused context windows on specific subtasks while the orchestrator maintains high-level state; parallelism allows independent subtasks to execute simultaneously; and specialization improves per-subtask performance",
        "Multi-agent systems avoid the KV cache memory constraint by distributing across agents",
        "Orchestrator agents have access to larger context windows than single agents",
      ],
      correctAnswer: 1,
      explanation:
        "Single-agent limitations: context window fills with interleaved subtask history, reducing attention quality on current task; all subtasks are serialized; one prompt must serve all specializations. Multi-agent addresses all three: focused context per subagent (better attention quality), parallel execution, and per-subagent specialization via targeted system prompts.",
      hints: [
        "A 128k context shared across 10 subtasks gives each subtask ~12k effective context — degraded vs. a dedicated 128k.",
        "Independent subtasks (e.g., search 3 different topics) can parallelize — 3× throughput for free.",
      ],
    },
  ],

  "evaluation-llm": [
    {
      id: "q-tr-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "MMLU (Hendrycks et al., 2021) evaluates LLMs on 57 subjects with multiple-choice questions. A model scores 90% on MMLU. What does this score and the benchmark\'s design tell you about the model\'s capabilities?",
      options: [
        "The model can correctly answer 90% of any knowledge question in any format",
        "The model has strong broad-knowledge recognition for multiple-choice format across 57 academic domains, but MMLU does not assess open-ended generation, reasoning chains, or practical task completion",
        "The model outperforms human experts on all 57 subjects",
        "90% MMLU directly implies the model will perform at 90% on real-world knowledge tasks",
      ],
      correctAnswer: 1,
      explanation:
        "MMLU\'s multiple-choice format tests knowledge recognition, not generation. 90% MMLU indicates broad knowledge coverage across domains (STEM, law, medicine, etc.), but says nothing about the model\'s ability to explain reasoning, handle novel formats, or complete multi-step tasks — all critical for real-world utility.",
      hints: [
        'Multiple-choice recognition ("which answer is correct?") differs from open-ended generation ("explain why X is correct").',
        "MMLU is a good proxy for breadth of training knowledge, but not for reasoning depth or instruction-following quality.",
      ],
    },
    {
      id: "q-tr-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LLM-as-judge evaluation (e.g., using GPT-4 to score model outputs) exhibits positional bias — preferring the response listed first — and verbosity bias — preferring longer responses even when length does not indicate quality.",
      correctAnswer: "True",
      explanation:
        "MT-Bench (Zheng et al., 2023) systematically studied LLM judge biases and confirmed both: positional bias (first/second position preference varies by model) and verbosity bias (LLM judges consistently prefer longer responses even when human evaluators do not). Standard mitigations include swapping response order and running both orderings, averaging results.",
      hints: [
        "Measure the swap rate: if the judge prefers A over B but B over A when order is reversed, it has positional bias.",
        "Verbosity test: compare judge preference between a concise correct answer and a verbose but less correct one.",
      ],
    },
    {
      id: "q-tr-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'HumanEval computes pass@k using the unbiased estimator: pass@k = 1 - C(n-c, k)/C(n, k), where n = total samples, c = correct samples, k = target. Why is this estimator used instead of the naive "generate k samples, check if any pass"?',
      options: [
        "The unbiased estimator is faster to compute than running all n samples",
        "Generating exactly k samples and checking is high-variance for small k; the unbiased estimator generates n > k samples and uses combinatorics to compute pass@k with lower variance, without cherry-picking the k that happen to include correct solutions",
        "The naive estimator is biased upward because it always includes the best-of-k sample",
        "HumanEval requires n = 200 samples per problem due to limited test cases",
      ],
      correctAnswer: 1,
      explanation:
        "If you naively run k = 10 samples and check if any pass, this estimates pass@10 with very high variance (1 run ≠ the true probability). By generating n = 200 samples and using the combinatorial formula, you get a lower-variance estimate of pass@k for any k ≤ n simultaneously, without the optimistic bias of selecting the single best k samples from n.",
      hints: [
        "Running 1 set of 10 samples is extremely noisy — some sets have 5 correct, others have 0.",
        "The combinatorial formula uses the actual fraction of correct samples across n attempts to estimate the probability that any k would include at least one correct.",
      ],
    },
  ],

  "safety-llm": [
    {
      id: "q-tr-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The InstructGPT paper (Ouyang et al., 2022) used RLHF with three steps: SFT, reward model training, and PPO fine-tuning. Why is a separate reward model needed rather than having humans directly rate each PPO training step?",
      options: [
        "Humans cannot evaluate code-related outputs, so the reward model specializes in that domain",
        "Online human evaluation is too slow and expensive for the thousands of rollouts per PPO update step; the reward model provides fast, dense scalar reward signals by generalizing from a fixed set of human preference comparisons",
        "PPO requires differentiable rewards, and human evaluations cannot be backpropagated through",
        "The reward model is more accurate than human evaluators on factual tasks",
      ],
      correctAnswer: 1,
      explanation:
        "PPO requires thousands of reward evaluations per update; having humans evaluate each output would take weeks per training run. The reward model (trained once on human preference comparisons) provides instant scalar rewards for any generated output, enabling efficient RL training at scale.",
      hints: [
        "PPO generates many rollouts per step — each needing a reward signal. Humans can\'t keep up.",
        "The reward model generalizes from ~10-100K human comparisons to evaluate any generated text.",
      ],
    },
    {
      id: "q-tr-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'Constitutional AI (CAI, Anthropic 2022) trains helpful and harmless models without requiring human harm ratings by using the LLM itself to critique and revise its own outputs according to a set of principles (the "constitution").',
      correctAnswer: "True",
      explanation:
        "CAI\'s two-phase approach: (1) SL-CAI: the model generates a response, critiques it against constitutional principles, then revises it — supervised learning on the revised responses without human harm labels. (2) RL-CAI: use an AI preference model (trained on AI-generated comparison labels) instead of human raters to scale RLHF-style training.",
      hints: [
        "The LLM acts as its own red-teamer and reviser using the constitution as a reference.",
        "AI feedback (not human feedback) scales Constitutional AI — reducing human annotation cost dramatically.",
      ],
    },
    {
      id: "q-tr-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DPO\'s loss is L_DPO = -E[(log σ(β × (log π_θ(y_w|x) - log π_ref(y_w|x)) - β × (log π_θ(y_l|x) - log π_ref(y_l|x))))]. What happens mathematically when π_θ = π_ref (the fine-tuned model equals the reference)?",
      options: [
        "The loss is maximized — the model must diverge from the reference to minimize DPO loss",
        "All log-ratios are 0, making the argument of σ equal to 0, so σ(0) = 0.5 and loss = -log(0.5) ≈ 0.693 — a non-zero loss indicating the model hasn\'t learned preferences yet",
        "The loss is undefined since log(π_θ/π_ref) = log(1) = 0 is an edge case",
        "The gradient of the DPO loss at π_θ = π_ref is 0 — it is always a fixed point",
      ],
      correctAnswer: 1,
      explanation:
        "When π_θ = π_ref: all log(π_θ/π_ref) = 0; DPO loss = -log σ(0) = -log(0.5) ≈ 0.693. The gradient at this point is non-zero — it pushes π_θ to increase log-probability of preferred responses relative to π_ref and decrease it for rejected ones. This confirms the starting point is not a minimum, and training will improve preferences.",
      hints: [
        "σ(0) = 1/(1+e^0) = 0.5; -log(0.5) = log(2) ≈ 0.693.",
        'The gradient pushes toward increasing log π_θ(y_w|x) - log π_ref(y_w|x) — the "uplift" for preferred responses.',
      ],
    },
  ],

  "open-source-llms": [
    {
      id: "q-tr-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'LLaMA-3-70B is described as "open-weights" rather than "open-source". The Meta LLaMA 3 Community License restricts certain uses. Which activity does it specifically restrict?',
      options: [
        "Using LLaMA-3 for personal research projects",
        'Using LLaMA-3 to train or fine-tune another model whose name includes "LLAMA" or to provide services to users > 700M monthly active users without a separate Meta license',
        "Running LLaMA-3 inference on commercial cloud infrastructure",
        "Sharing fine-tuned LLaMA-3 adapters (LoRA weights) publicly",
      ],
      correctAnswer: 1,
      explanation:
        "The LLaMA 3 license specifically restricts: (1) using LLaMA outputs to train other models except LLaMA derivatives, (2) deploying to users of services with > 700M MAU without Meta approval. Most common commercial uses (hosting, fine-tuning for products) are permitted — the restrictions target large-scale deployment and competitor training.",
      hints: [
        '"Open-weights" = weights are downloadable; "open-source" = code + data + weights under OSI-approved license.',
        "True open-source (Apache 2.0, MIT) permits any use including training competitors' models.",
      ],
    },
    {
      id: "q-tr-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Mistral-7B-v0.1 achieves better benchmark performance than LLaMA-2-13B on many tasks, demonstrating that architectural choices (GQA, SWA) and training data quality can compensate for a 2× deficit in parameter count.",
      correctAnswer: "True",
      explanation:
        "Jiang et al. (2023) showed Mistral-7B outperforms LLaMA-2-13B on commonsense reasoning, math, and code benchmarks. The key factors: sliding window attention enabling longer effective context, GQA for better inference efficiency, and aggressive data quality filtering — demonstrating that raw parameter count is not the dominant determinant of capability.",
      hints: [
        "Model quality is determined by architecture, data, and training recipe — not just parameter count.",
        "Mistral-7B\'s KV cache efficiency (GQA) also makes it practically preferable for deployment despite similar raw performance.",
      ],
    },
    {
      id: "q-tr-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Falcon-180B (TII, 2023) used a multiquery attention variant and a unique data pipeline emphasizing RefinedWeb (curated web data). What does Falcon\'s strong performance reveal about the relative importance of data quality vs. model architecture?",
      options: [
        "Model architecture (Falcon uses standard transformer) is the primary driver of performance",
        "High-quality curated web data (RefinedWeb) can produce competitive performance even with a standard architecture, suggesting data quality often dominates over architectural novelty at the same compute budget",
        "Falcon proves that model size (180B) is the only factor that matters for frontier performance",
        "Multiquery attention is the sole reason for Falcon\'s strong performance",
      ],
      correctAnswer: 1,
      explanation:
        "Falcon\'s key contribution was demonstrating that extensive web data curation (removing duplicates, low-quality text, and harmful content via RefinedWeb) combined with a largely standard architecture could match or beat models trained on similar compute with more architectural complexity — reinforcing Chinchilla\'s data-quality message at the 180B scale.",
      hints: [
        "RefinedWeb is the differentiator — aggressive filtering of Common Crawl to high-quality text.",
        '"Data-optimal" training: more tokens of higher quality often outperforms fewer tokens of lower quality.',
      ],
    },
  ],

  "multimodal-llm": [
    {
      id: "q-tr-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "LLaVA-1.5 (Liu et al., 2023) connects a CLIP ViT-L/14@336 vision encoder to a Vicuna LLM via a two-layer MLP projection. A 336×336 image produces 576 patch tokens from ViT (14×14 patches = 576). How does this compare to the text token budget, and what is the implication?",
      options: [
        "576 vision tokens ≈ a short paragraph of text; images consume moderate but significant context budget",
        "576 vision tokens ≈ 576 words, which is too large for any LLM to process",
        "Vision tokens are processed separately and do not count toward the context window",
        "ViT produces 1 global token, not 576, to keep context overhead minimal",
      ],
      correctAnswer: 0,
      explanation:
        "A 336×336 image with 14×14 patch size gives (336/14)² = 576 patch tokens. This is substantial — roughly equivalent to 400–600 text tokens depending on the text. For high-resolution images, newer models like LLaVA-1.6 use dynamic tiling, producing 2880+ tokens per image, consuming much of the context window.",
      hints: [
        "576 image tokens ≈ a dense paragraph of text in context budget terms.",
        "High-res images with tiling (e.g., 4 tiles × 576 = 2304 tokens) can dominate the context window.",
      ],
    },
    {
      id: "q-tr-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GPT-4V (and LLaVA-1.6) use dynamic high-resolution processing: low-resolution images are processed as a single 336×336 tile (576 tokens), while high-resolution images are divided into multiple 336×336 tiles (each producing 576 tokens), adaptively scaling visual token count with image complexity.",
      correctAnswer: "True",
      explanation:
        "Dynamic tiling addresses the resolution-context tradeoff: a fixed 336×336 encoding cannot capture fine text or small objects in high-resolution images. By tiling (e.g., a 672×672 image → 4 tiles), the model allocates more tokens to detail-rich images, trading context budget for visual fidelity. The total token count scales with the number of tiles used.",
      hints: [
        "A 4-tile 672×672 image: 4 × 576 = 2304 vision tokens plus 1 thumbnail token = 2305 total.",
        "Dynamic allocation means a 4K image can receive many more tokens than a thumbnail.",
      ],
    },
    {
      id: "q-tr-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In native multimodal models (e.g., Gemini, GPT-4o) trained from scratch on text+image data, what architectural advantage do they have over post-hoc VLMs (LLaVA-style: CLIP + LLM connector)?",
      options: [
        "Native multimodal models are smaller and more efficient because they avoid the redundancy of having separate visual and text encoders",
        "Native models develop deeply integrated cross-modal representations during pretraining, enabling richer visual reasoning where visual and textual features are co-learned rather than bridged by a post-hoc projection that must map between independently-learned spaces",
        "Native models use a different attention mechanism that processes visual tokens faster than text tokens",
        "Native models eliminate the need for a vision encoder entirely, processing raw pixels directly",
      ],
      correctAnswer: 1,
      explanation:
        'Post-hoc VLMs face the "modality gap" problem: CLIP and the LLM are trained separately, then bridged by a learned projection. The projection must compensate for the independently-optimized embedding spaces. Native models (trained end-to-end on interleaved text and image data) develop representations where visual and textual features are inherently aligned, enabling deeper integration.',
      hints: [
        "CLIP embeds images for contrastive image-text matching; LLMs embed text for next-token prediction — different objectives, different spaces.",
        "Native co-training: from the first training step, visual tokens interact with text tokens — representations evolve jointly.",
      ],
    },
  ],

  "llm-reasoning": [
    {
      id: "q-tr-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Wei et al. (2022) showed Chain-of-Thought prompting significantly improves LLM performance on multi-step math problems. For the problem "A store has 3 shelves with 8 books each, and 2 shelves with 12 books each. How many total books?", which CoT output demonstrates correct reasoning?',
      options: [
        '"The answer is 48." (direct answer, no steps)',
        '"3 × 8 = 24 books on the first type of shelf. 2 × 12 = 24 books on the second type. Total = 24 + 24 = 48 books."',
        '"3 shelves × 8 books = 24, plus 2 × 12 = 48, for a total of 72 books." (incorrect but shows steps)',
        '"Let me count: 8 + 8 + 8 + 12 + 12 = 48 books."',
      ],
      correctAnswer: 1,
      explanation:
        "CoT prompting elicits intermediate reasoning steps: first compute 3 × 8 = 24, then 2 × 12 = 24, then sum 24 + 24 = 48. Wei et al. showed that providing few-shot CoT examples dramatically improves accuracy on arithmetic, symbolic, and commonsense reasoning — particularly for large models (≥100B parameters in 2022, now effective at smaller scale with instruction tuning).",
      hints: [
        "CoT = explicit intermediate steps before the final answer.",
        "Models prompted with step-by-step reasoning examples produce step-by-step reasoning themselves.",
      ],
    },
    {
      id: "q-tr-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'DeepSeek-R1 and OpenAI o1 train extended reasoning ("thinking") using pure outcome-based RL — they use no human-annotated reasoning traces, relying solely on final answer correctness as the reward signal.',
      correctAnswer: "True",
      explanation:
        "DeepSeek-R1 (2025) demonstrated that RL with sparse outcome rewards (correct/incorrect final answer) causes the model to spontaneously develop effective reasoning strategies including self-verification, backtracking, and exploration — without any human annotation of intermediate steps. The model discovers CoT-like reasoning as an emergent strategy for maximizing the outcome reward.",
      hints: [
        "Outcome reward = 1 if final answer correct, 0 otherwise — no credit for intermediate steps.",
        "Despite sparse rewards, the model learns rich intermediate behaviors (verification, exploration) as optimal strategies.",
      ],
    },
    {
      id: "q-tr-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Process Reward Models (PRMs, Lightman et al., 2023) assign step-level rewards to reasoning chains. For a 10-step solution where steps 1–8 are correct but step 9 is subtly wrong (leading to a wrong answer), how do PRMs differ from Outcome Reward Models (ORMs) in the training signal they provide?",
      options: [
        "PRM: reward = 0 for all steps (fails at step 9); ORM: reward = 0 for the full solution",
        "PRM: reward = +1 for steps 1–8 (correct), reward = 0 for steps 9–10 (incorrect); ORM: reward = 0 for the entire solution — PRMs provide dense positive signal for correct reasoning even when the final answer is wrong",
        "PRM and ORM give identical signals for this case since the solution is ultimately wrong",
        "PRM: reward = -1 for step 9; ORM: reward = +0.8 for the 80% correct solution",
      ],
      correctAnswer: 1,
      explanation:
        "Lightman et al. showed ORMs are too sparse for long reasoning chains: a mostly-correct 10-step solution with one error gets 0 reward — wasting the learning signal from the 8 correct steps. PRMs provide +1 for each correct step (1–8) and 0 for incorrect steps (9–10), enabling dense credit assignment that significantly improves reasoning training efficiency.",
      hints: [
        "ORM sees only the final answer — a wrong answer gets 0 regardless of how many steps were correct.",
        "PRM sees each step — 8 correct steps get +8 in reward signal even if the conclusion is wrong.",
      ],
    },
  ],

  "llm-coding": [
    {
      id: "q-tr-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Fill-in-the-Middle (FIM) training — used in CodeLlama, DeepSeek-Coder — trains the model to predict a masked middle segment given prefix and suffix. The input format is: <PRE>[prefix]<SUF>[suffix]<MID>. What task does this enable that standard left-to-right autoregressive training does not?",
      options: [
        "FIM enables the model to generate code from natural language descriptions",
        "FIM enables code infilling: given existing code before and after a cursor position, generate the missing middle — critical for IDE autocomplete, where the programmer has typed ahead",
        "FIM enables the model to translate code between programming languages",
        "FIM improves next-token prediction by seeing future context during training",
      ],
      correctAnswer: 1,
      explanation:
        "Standard autoregressive models can only append to a prefix — they cannot fill gaps in existing code. FIM training (Bavarian et al., 2022) teaches models to complete missing segments given both prefix and suffix context, enabling IDE infilling where the user has written surrounding code but needs the middle section completed.",
      hints: [
        "FIM training objective: predict the [MID] token given [prefix] and [suffix] as context.",
        "IDE autocomplete often needs to fill in the middle of an expression or function — not append to the end.",
      ],
    },
    {
      id: "q-tr-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "HumanEval\'s 164 problems all involve standalone Python functions evaluated with unit tests — the benchmark does not test repository-level understanding, multi-file navigation, debugging existing code, or generating code in languages other than Python.",
      correctAnswer: "True",
      explanation:
        "HumanEval (Chen et al., 2021) is explicitly function-completion: given a Python function signature and docstring, complete the body. It measures atomic function-level coding ability but fails to capture real-world software engineering tasks like understanding dependencies across files, refactoring, or debugging — motivating benchmarks like SWE-bench, which uses real GitHub issues.",
      hints: [
        "Each HumanEval problem: one function, one docstring, automated unit tests. No project context.",
        "SWE-bench uses actual GitHub PRs requiring multi-file edits — much harder and more realistic.",
      ],
    },
    {
      id: "q-tr-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SWE-bench (Yang et al., 2024) evaluates LLM agents on resolving real GitHub issues requiring multi-file edits. The benchmark uses automated testing (pytest) for evaluation. What are the two key differences from HumanEval that make SWE-bench much harder?",
      options: [
        "SWE-bench uses JavaScript instead of Python, and allows 10 attempts per problem",
        "SWE-bench requires: (1) understanding the issue description and existing codebase to localize the bug across potentially thousands of files; and (2) making consistent edits across multiple files without breaking existing tests — requiring planning, navigation, and code comprehension beyond single-function generation",
        "SWE-bench problems are only solvable with tool use, and HumanEval prohibits tool use",
        "SWE-bench evaluates documentation quality, not code correctness",
      ],
      correctAnswer: 1,
      explanation:
        "HumanEval: read docstring → write one function body → done. SWE-bench: (1) parse a GitHub issue description, (2) navigate a real repository to identify which files need changes, (3) understand complex existing code and its test suite, (4) make coordinated multi-file changes that fix the issue without regressions. The localization and multi-file consistency requirements are the primary difficulty amplifiers.",
      hints: [
        "Localization = finding which lines in which files cause the bug from an issue description — no pointers given.",
        "Multi-file consistency = changes in file A must work with unchanged file B\'s assumptions.",
      ],
    },
  ],

  "llm-deployment": [
    {
      id: "q-tr-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "vLLM\'s PagedAttention divides KV cache into fixed-size memory pages (e.g., 16 tokens/page). If 4 requests are queued with maximum sequence lengths 512, 512, 512, 512 (total reserved: 4 × 512 = 2048 slots), but actual generation averages 200 tokens/request, how much GPU memory does naive pre-allocation waste vs. PagedAttention?",
      options: [
        "Naive wastes 0% — it always allocates exactly the tokens generated",
        "Naive pre-allocates 2048 slots but uses 4 × 200 = 800 — wasting 2048 - 800 = 1248 slots (61% waste); PagedAttention allocates pages on-demand, using only 800 slots",
        "PagedAttention wastes more memory due to page-boundary fragmentation",
        "Both approaches use identical memory since KV cache is always freed after each request",
      ],
      correctAnswer: 1,
      explanation:
        "Naive contiguous allocation reserves max_seq_len per request upfront — the 1248 reserved-but-unused slots cannot be used by other requests. PagedAttention allocates pages (e.g., 16-token blocks) only as tokens are actually generated, reclaiming unused pages immediately, allowing the saved memory to serve additional concurrent requests.",
      hints: [
        "Waste = (reserved − used) / reserved = (2048 − 800) / 2048 ≈ 61% for this example.",
        "PagedAttention\'s on-demand allocation: if a request generates 200 tokens, it uses ceil(200/16) = 13 pages, not ceil(512/16) = 32 pages.",
      ],
    },
    {
      id: "q-tr-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SGLang\'s RadixAttention achieves KV cache reuse across requests sharing a common prompt prefix (e.g., the same system prompt) by indexing cached K/V states in a radix tree, allowing multiple requests to share prefix pages rather than recomputing them.",
      correctAnswer: "True",
      explanation:
        "Zheng et al. (2023) showed that in production, many requests share long prefixes (system prompts, few-shot examples) that are recomputed wastefully per-request. RadixAttention\'s radix tree maps prefix token sequences to cached KV pages — a new request matching an existing prefix skips prefill for those tokens, dramatically reducing time-to-first-token for prefix-heavy workloads.",
      hints: [
        "Radix tree key = token sequence prefix; value = physical KV cache pages.",
        "System prompt (e.g., 500 tokens) shared by 1000 requests: recomputed 1000× without caching, once with RadixAttention.",
      ],
    },
    {
      id: "q-tr-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Tensor parallelism (TP) splits weight matrices across T GPUs (e.g., each GPU holds 1/T of each weight matrix column). For an attention layer computing QKV projections, each GPU must perform an all-reduce after computing its partial results. For T = 8 GPUs and a batch of 32 sequences, what is the communication pattern and why is NVLink preferred over InfiniBand for intra-node TP?",
      options: [
        "All-gather pattern; InfiniBand is preferred because it is faster for large tensors",
        "All-reduce pattern (each GPU contributes a partial sum, aggregated across all T GPUs); NVLink (~600 GB/s bidirectional) is preferred over InfiniBand (~200 GB/s) for intra-node communication because attention output all-reduces are latency-sensitive and happen every layer",
        "Broadcast pattern; NVLink and InfiniBand have identical performance for TP",
        "Point-to-point pattern; GPU 0 aggregates all partial results and broadcasts",
      ],
      correctAnswer: 1,
      explanation:
        "Tensor-parallel attention: each GPU computes Q_i, K_i, V_i from its shard W_i; after computing partial attention outputs, an all-reduce sums contributions across all T GPUs to get the full d_model output. This happens at every transformer layer — with 80 layers × 2 all-reduces (attention + FFN) = 160 all-reduce operations per forward pass. NVLink\'s 3–5× higher bandwidth vs. InfiniBand makes it dramatically faster for this dense communication pattern.",
      hints: [
        "All-reduce = every GPU sends its partial result; all GPUs receive the summed result.",
        "With 80 layers and T = 8, all-reduce latency × 160 rounds dominates inference latency — bandwidth matters enormously.",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
