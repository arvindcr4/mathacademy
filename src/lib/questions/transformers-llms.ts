import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

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
        "At FP16 (2 bytes/entry), storing $\\mathbf{S}$ requires $512^2 \\times 2 \\approx 0.5$ MB per attention layer.",
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
        "D2l.ai \\S 11.6.2 compares path lengths formally:\n\nRNNs: to communicate from position $i$ to position $j$ where $j > i$, the hidden state at position $j$ depends on the hidden state at $j-1$, which depends on $j-2$, and so on — requiring $j - i = \\mathcal{O}(n)$ sequential steps. Information must traverse the full chain.\n\nSelf-attention: every query $\\mathbf{q}_i$ attends directly to every key $\\mathbf{k}_j$ via $\\mathbf{q}_i \\cdot \\mathbf{k}_j$, producing attention weights $\\alpha_{ij}$ in a single parallel operation. The maximum path between any two positions is therefore $\\mathcal{O}(1)$. This direct connectivity also means gradients from any position can flow to any other position in one step, preventing vanishing gradients that plague deep RNNs.",
      hints: [
        "In an RNN, to connect position 1 to position 512, information must traverse 511 recurrent steps.",
        "Self-attention creates direct edges between all position pairs in one matrix multiplication — no sequential propagation needed.",
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
        "D2l.ai \\S 11.5 defines the multi-head attention output as:\n\\[\n\\text{MultiHead}(\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}) = \\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h)\\,\\mathbf{W}^\\text{O},\n\\]\nwhere each $\\text{head}_i = \\text{Attention}\\!\\left(\\mathbf{Q}\\mathbf{W}_i^\\mathbf{Q}, \\mathbf{K}\\mathbf{W}_i^\\mathbf{K}, \\mathbf{V}\\mathbf{W}_i^\\mathbf{V}\\right)$. The concatenation $\\text{Concat}(\\text{head}_1, \\ldots, \\text{head}_h)$ produces a vector of length $h \\times d_v = h \\times (d_\\text{model}/h) = d_\\text{model}$. The weight matrix $\\mathbf{W}^\\text{O} \\in \\mathbb{R}^{d_\\text{model} \\times d_\\text{model}}$ then linearly combines the head outputs into a single $d_\\text{model}$-dimensional vector. Without $\\mathbf{W}^\\text{O}$, no information would flow between heads after concatenation, leaving each head's representation isolated.",
      hints: [
        "Concatenation produces $h \\times d_v = d_\\text{model}$ dimensions; $\\mathbf{W}^\\text{O}$ linearly combines them back to $d_\\text{model}$.",
        "If $\\mathbf{W}^\\text{O}$ were omitted, each head would be independent — there would be no learned interaction between heads in the output.",
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
        "Multi-head attention\'s representational power comes from subspace diversity. Each head $i$ has its own learned projections $\\mathbf{W}_i^\\mathbf{Q}, \\mathbf{W}_i^\\mathbf{K}, \\mathbf{W}_i^\\mathbf{V}$, mapping $\\mathbf{Q}, \\mathbf{K}, \\mathbf{V}$ into different $d_k$-dimensional subspaces where it learns distinct attention patterns.\n\nClark et al. (2019) found that different heads specialize: some heads track syntactic dependencies (subject-verb agreement), others capture coreference chains, others attend broadly across the sequence. These specializations are complementary — combining them yields richer representation than any single head.\n\nIf all heads learned identical projections, multi-head attention would collapse to single-head attention: $\\text{Concat}(\\text{head}, \\ldots, \\text{head})\\mathbf{W}^\\text{O}$ with identical heads is equivalent to one head scaled by $h$. The \"free\" representational benefit comes from diversity in learned subspaces, not from multiplicity alone.",
      hints: [
        "If all $h$ heads learned identical projections, $\\text{Concat}(\\text{head}, \\ldots, \\text{head})\\mathbf{W}^\\text{O}$ would be equivalent to a single head scaled by $h$.",
        "Clark et al. (2019) found different BERT heads specialize: some track subject-verb agreement, others track coreference — complementary patterns combined by $\\mathbf{W}^\\text{O}$.",
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
        "RoPE (Su et al., 2021) encodes position by rotating the query and key vectors. For a 2D subspace indexed by $j$, the rotation applied at position $m$ is:\n\\[\n\\mathbf{R}_j(m) = \\begin{pmatrix} \\cos(m\\theta_j) & -\\sin(m\\theta_j) \\\\ \\sin(m\\theta_j) & \\cos(m\\theta_j) \\end{pmatrix}.\n\\]\nThe key property is:\n\\[\n\\bigl(\\mathbf{R}_j(i)\\,\\mathbf{q}_j\\bigr)^\\top \\bigl(\\mathbf{R}_j(j)\\,\\mathbf{k}_j\\bigr) = \\mathbf{q}_j^\\top\\,\\mathbf{R}_j(j-i)\\,\\mathbf{k}_j,\n\\]\nso the dot product between positions $i$ and $j$ depends only on the relative displacement $(j-i)$, not on $i$ and $j$ separately. The rotation matrices satisfy $\\mathbf{R}(i)^\\top\\mathbf{R}(j) = \\mathbf{R}(j-i)$. This relative-position property is absent in absolute positional encodings (where the encoding for position $i$ is a fixed vector unrelated to position $j$), which is why RoPE enables better length extrapolation beyond the training context.",
      hints: [
        "Absolute positional encoding: position $i$ has embedding $\\mathbf{p}_i$, unrelated to $\\mathbf{p}_j$. RoPE: both $i$ and $j$ are rotated versions of the same content vector, so their dot product depends only on $j-i$.",
        "The rotation property: $\\mathbf{R}(i)^\\top\\mathbf{R}(j) = \\mathbf{R}(j-i)$ ensures relative offsets naturally arise in the dot product.",
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
        "SwiGLU (Shazeer, 2020) defines:\n\\[\n\\text{SwiGLU}(\\mathbf{x}, \\mathbf{W}, \\mathbf{V}, \\mathbf{b}, \\mathbf{c}, \\beta) = \\text{Swish}_\\beta(\\mathbf{x}\\mathbf{W} + \\mathbf{b}) \\otimes (\\mathbf{x}\\mathbf{V} + \\mathbf{c}),\n\\]\nwhere $\\otimes$ is element-wise multiplication and $\\text{Swish}_\\beta(z) = \\sigma(\\beta z)$ is a smooth activation with a learnable gating parameter $\\beta$.\n\nComparing to ReLU: ReLU$(\\mathbf{x}) = \\max(0, \\mathbf{x}\\mathbf{W} + \\mathbf{b})$, which applies a hard zero to all negative pre-activations. SwiGLU replaces this hard threshold with a learned sigmoid gate $(\\mathbf{x}\\mathbf{V} + \\mathbf{c})$ that scales each feature dimension by a value in $(0, 1)$. Since $\\sigma(z)$ is smooth and data-dependent, the gate value adapts per-input, providing soft, differentiable feature suppression rather than ReLU's all-or-nothing cutoff. This smoother gradient flow in the negative region consistently improves language model perplexity in experiments (LLaMA, PaLM).",
      hints: [
        "ReLU hard-zeroes negative pre-activations; SwiGLU replaces this with $\\sigma(\\beta z) \\cdot (\\mathbf{x}\\mathbf{V})$ — a learned, smooth gate.",
        "The element-wise product with a sigmoid-gated value allows information to flow in the negative region rather than being permanently blocked.",
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
        "The learning rate schedule is:\n\\[\n\\text{lr}(\\text{step}) = d_\\text{model}^{-0.5} \\cdot \\min\\!\\left(\\text{step}^{-0.5},\\; \\text{step} \\cdot \\text{warmup}^{-1.5}\\right).\n\\]\nThe two terms inside $\\min(\\cdot)$ are:\n\\[- \\text{term}_1 = \\text{step}^{-0.5} = \\frac{1}{\\sqrt{\\text{step}}},\\]\n\\[- \\text{term}_2 = \\text{step} \\cdot \\text{warmup}^{-1.5} = \\frac{\\text{step}}{\\text{warmup}^{1.5}}.\\]\n\nThey are equal when $\\text{step}^{-0.5} = \\text{step} \\cdot \\text{warmup}^{-1.5}$, which gives $\\text{step} = \\text{warmup} = 4000$.\n\nSubstituting at $\\text{step} = 4000$:\n\\[\n\\text{lr}_\\text{peak} = 512^{-0.5} \\times 4000^{-0.5} = \\frac{1}{\\sqrt{512} \\cdot \\sqrt{4000}} \\approx \\frac{1}{22.6 \\times 63.2} \\approx 6.96 \\times 10^{-4}.\n\\]\nFor $\\text{step} < 4000$: $\\text{term}_2 < \\text{term}_1$, so lr rises linearly as $\\text{step}/\\text{warmup}^{1.5}$. For $\\text{step} > 4000$: $\\text{term}_1 < \\text{term}_2$, so lr decays as $\\text{step}^{-0.5}$ (inverse square root decay).",
      hints: [
        "Set the two $\\min$ terms equal: $\\text{step}^{-0.5} = \\text{step} \\times \\text{warmup}^{-1.5} \\Rightarrow \\text{step} = \\text{warmup} = 4000$.",
        "At the peak: $\\text{lr} = d_\\text{model}^{-0.5} \\times \\text{warmup}^{-0.5} \\approx 0.044 \\times 0.016 \\approx 6.96 \\times 10^{-4}$.",
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
        "In Pre-norm (used by most modern LLMs), the residual branch input is normalized:\n\\[\n\\mathbf{x}_{\\ell+1} = \\mathbf{x}_\\ell + \\text{Sublayer}\\!\\bigl(\\text{LayerNorm}(\\mathbf{x}_\\ell)\\bigr).\n\\]\nAt initialization, the sublayer weights are small, so $\\text{Sublayer}(\\text{LayerNorm}(\\mathbf{x})) \\approx \\mathbf{0}$. The identity branch therefore carries the gradient directly: $\\nabla_{\\mathbf{x}_\\ell} \\mathcal{L} \\approx \\nabla_{\\mathbf{x}_{\\ell+1}} \\mathcal{L}$, and the gradient through the sublayer is $\\nabla_{\\text{Sublayer}} \\mathcal{L} \\approx \\nabla_{\\mathbf{x}_{\\ell+1}} \\mathcal{L} \\cdot \\nabla_{\\text{Sublayer}} \\approx \\text{small}$, giving stable gradients.\n\nIn Post-norm (original transformer):\n\\[\n\\mathbf{x}_{\\ell+1} = \\text{LayerNorm}\\!\\bigl(\\mathbf{x}_\\ell + \\text{Sublayer}(\\mathbf{x}_\\ell)\\bigr).\n\\]\nAt initialization, $\\mathbf{x}_\\ell + \\text{Sublayer}(\\mathbf{x}_\\ell)$ has large variance (sum of two independent random vectors), so the LayerNorm output has high variance. This produces large gradient magnitudes at early steps, requiring careful learning rate warmup to avoid destabilization.",
      hints: [
        "Pre-norm: $\\mathbf{x}+\\text{Sublayer}(\\text{LayerNorm}(\\mathbf{x}))$ — the residual branch starts near $\\mathbf{0}$, so gradients flow cleanly through the skip connection.",
        "Post-norm: $\\text{LayerNorm}(\\mathbf{x}+\\text{Sublayer}(\\mathbf{x}))$ — the sum of two random vectors has large variance, producing large early gradients.",
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
        "Adam's update for parameter $\\theta_i$ at step $t$ is:\n\\[\n\\theta_{t,i} \\leftarrow \\theta_{t-1,i} - \\alpha \\cdot \\frac{\\hat{m}_{t,i}}{\\sqrt{\\hat{v}_{t,i}} + \\varepsilon},\n\\]\nwhere the effective learning rate is $\\alpha_i^\\text{eff} = \\alpha \\cdot \\hat{m}_{t,i} / (\\sqrt{\\hat{v}_{t,i}} + \\varepsilon)$.\n\nThe second moment is updated as $v_t = \\beta_2 v_{t-1} + (1-\\beta_2) g_t^2$. With $\\beta_2 = 0.999$:\n\\[\nv_1 = (1 - 0.999) \\cdot g_1^2 = 0.001 \\cdot g_1^2.\n\\]\nBias correction gives $\\hat{v}_1 = v_1 / (1 - \\beta_2^1) = v_1 / 0.999 \\approx v_1$, so $\\sqrt{\\hat{v}_1} \\approx 0.032 \\cdot |g_1|$. With $\\varepsilon = 10^{-8}$, the denominator $\\sqrt{\\hat{v}_1} + \\varepsilon \\approx 0.032|g_1|$ is tiny for moderate gradients. This amplifies the effective learning rate by roughly $1/0.032 \\approx 30\\times$ beyond the nominal $\\alpha$. Warmup keeps $\\alpha$ small during the first few thousand steps until $v_t$ accumulates to meaningful values.",
      hints: [
        "At step 1: $v_1 = 0.001 \\cdot g_1^2 \\Rightarrow \\sqrt{v_1} \\approx 0.032|g_1|$ — extremely small.",
        "Small $\\sqrt{v_t}$ in the denominator makes the effective learning rate $\\alpha / \\sqrt{v_t}$ very large, causing disproportionately large steps early in training.",
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
        "The token embedding table has shape $(\\text{vocab\\_size}, d_\\text{model})$ — one $d_\\text{model}$-dimensional vector per vocabulary token. For GPT-4's cl100k_base tokenizer with $\\text{vocab\\_size} \\approx 100{,}000$ and $d_\\text{model} = 4096$, the embedding table alone has:\n\\[\n100{,}000 \\times 4096 \\times 2 \\text{ bytes} \\approx 820 \\text{ MB},\n\\]\nplus a tied output projection of the same size.\n\nGPT-2's vocabulary has 50,257 tokens, so its embedding table is:\n\\[\n50{,}257 \\times 4096 \\times 2 \\text{ bytes} \\approx 411 \\text{ MB}.\n\\]\nThe ratio is $100{,}000 / 50{,}257 \\approx 1.99$, meaning GPT-4's embedding table is roughly $2\\times$ larger — not $4\\times$ as the statement claims. The claim of \"roughly 4×\" is therefore incorrect. (The statement is False.)",
      hints: [
        "Embedding table size = vocab_size × d_model × bytes_per_param. For GPT-4: 100K × 4096 × 2 bytes ≈ 820 MB. For GPT-2: 50K × 4096 × 2 bytes ≈ 411 MB.",
        "The ratio is approximately 2×, not 4×. The \"4×\" claim in the statement is incorrect.",
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

Object.assign(questions, {
  "long-context-llms": [
    {
      id: "q-tr-kp31-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Rotary Position Embedding (RoPE) encodes position by rotating query and key vectors in 2D subspaces. What is the key advantage of RoPE over absolute learned positional embeddings?",
      options: [
        "RoPE requires fewer parameters because positions are encoded without learned embeddings",
        "RoPE encodes relative position implicitly: the dot product q_m times k_n depends only on the relative displacement m-n and content, enabling length extrapolation beyond the training context",
        "RoPE eliminates positional encoding entirely by using token IDs as position indices",
        "RoPE applies position encoding only to the value vectors, leaving queries and keys content-only",
      ],
      correctAnswer: 1,
      explanation:
        "RoPE's rotational structure ensures q_m * k_n = f(x_m, x_n, m-n) — the attention score depends on relative displacement m-n rather than absolute positions. This relative-position property is the basis for length generalization extensions like YaRN and LongRoPE.",
      hints: [
        "Absolute positional embeddings treat position 500 and 5000 as completely different learned vectors; RoPE encodes the difference.",
        "Rotation by angle theta(m-n) in each 2D subspace: the q_m·k_n dot product encodes relative position m-n.",
      ],
    },
    {
      id: "q-tr-kp31-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "YaRN (Yet another RoPE extensioN) extends the context length of a RoPE-based LLM (e.g., from 4K to 128K tokens) without full retraining by adjusting the RoPE base frequency and applying NTK-aware interpolation, requiring only a small fine-tuning step on long-context data.",
      correctAnswer: "True",
      explanation:
        "YaRN modifies the RoPE frequency spectrum — keeping high-frequency components (for short-range) unchanged and interpolating low-frequency components (for long-range) — combined with a temperature scaling of attention logits. After a brief fine-tuning on long-context documents, the model can handle sequences far beyond the original training length.",
      hints: [
        "NTK-aware interpolation avoids the out-of-distribution extrapolation problem that naive position interpolation causes.",
        "YaRN requires roughly 1000 steps of fine-tuning on long documents — far cheaper than pretraining from scratch on long contexts.",
      ],
    },
    {
      id: "q-tr-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For a question-answering task over a 100K-token document, when does RAG outperform a long-context LLM, and when does long-context processing win?",
      options: [
        "RAG always wins because retrieval is faster and cheaper than attending over 100K tokens",
        "Long-context always wins because it sees the full document without retrieval errors",
        "RAG wins when the answer is localized to a few retrievable chunks and retrieval precision is high; long-context wins when the answer requires synthesizing information spread across many distant sections that retrieval would miss or fragment",
        "RAG and long-context are always equivalent in answer quality for the same document",
      ],
      correctAnswer: 2,
      explanation:
        "The RAG vs. long-context trade-off depends on task structure: fact-lookup questions with localized answers are well-served by retrieval (cheaper, scalable). Tasks requiring multi-hop reasoning across many distant passages benefit from long-context attention which can attend to all passages simultaneously without retrieval fragmentation.",
      hints: [
        "Retrieval precision matters: if the answer spans 20 passages scattered throughout, top-5 retrieval may miss critical pieces.",
        "Long-context LLMs still suffer from the 'lost in the middle' problem where information in the middle of very long contexts is underweighted.",
      ],
    },
  ],

  "llm-reasoning-advanced": [
    {
      id: "q-tr-kp32-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Chain-of-Thought (CoT) prompting is an emergent ability: Wei et al. (2022) found it only improves performance above a certain model scale. Approximately what parameter count threshold was observed for CoT to help on arithmetic tasks?",
      options: [
        "Above roughly 1B parameters",
        "Above roughly 100B parameters",
        "Above roughly 10M parameters — even small models benefit from CoT",
        "CoT helps equally at all scales; the threshold was a measurement artifact",
      ],
      correctAnswer: 1,
      explanation:
        "Wei et al. (2022) showed CoT prompting only improved performance on arithmetic and symbolic reasoning for models above roughly 100B parameters. Smaller models produced incoherent intermediate steps leading to wrong answers. This threshold has since lowered through instruction tuning.",
      hints: [
        "Emergent ability = performance jumps discontinuously as scale crosses a threshold.",
        "Since 2022, instruction-tuning on CoT traces has reduced the scale needed — smaller models can now benefit.",
      ],
    },
    {
      id: "q-tr-kp32-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Scratchpad reasoning — allowing a model to generate intermediate working text before the final answer — is beneficial even when the scratchpad content is not supervised by the training loss, because it extends the model's effective computational depth.",
      correctAnswer: "True",
      explanation:
        "Scratchpad reasoning trades token generation (cheap) for additional transformer depth (fixed). Each generated token adds an implicit layer of computation: the model can think out loud using sequential token generation as extra compute steps, effectively performing more computation than a single forward pass allows.",
      hints: [
        "A single transformer forward pass has fixed depth; each generated token adds another forward pass of depth.",
        "Scratchpad tokens act as working memory — they store intermediate values the model cannot hold in activations alone.",
      ],
    },
    {
      id: "q-tr-kp32-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "OpenAI o1-style models use extended test-time compute (long thinking chains) trained via RL with outcome rewards. What is the theoretical basis for why more test-time tokens improve reasoning accuracy?",
      options: [
        "More tokens allow the model to memorize more training examples during inference",
        "Test-time compute scales the effective search over reasoning strategies: longer thinking chains enable the model to explore, backtrack, and verify — effectively performing implicit search over reasoning trajectories using sequential autoregression",
        "More tokens increase the temperature of the softmax, reducing greedy decoding errors",
        "Longer outputs trigger a special high-accuracy mode in the transformer architecture",
      ],
      correctAnswer: 1,
      explanation:
        "Extended thinking chains implement implicit search: the model can generate a hypothesis, detect inconsistency, backtrack, and try alternative approaches — all within a single generation. This is equivalent to tree-search over reasoning paths but implemented through autoregressive generation, making it trainable via outcome RL.",
      hints: [
        "Each moment of reconsidering in the thinking chain is a branch in the reasoning tree being explored.",
        "RL with outcome rewards trains the model to allocate tokens to search strategies that maximize final answer correctness.",
      ],
    },
  ],

  "multimodal-llms": [
    {
      id: "q-tr-kp33-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "CLIP (Contrastive Language-Image Pre-training, Radford et al., 2021) trains a vision encoder and text encoder jointly using contrastive loss on 400M image-text pairs. What does CLIP learn to produce?",
      options: [
        "A generative model that can produce images from text descriptions",
        "A shared embedding space where semantically matching image-text pairs are close and mismatched pairs are far apart, enabling zero-shot image classification by text similarity",
        "An object detector that identifies specific named entities in images",
        "A vision encoder pre-trained on ImageNet classification labels",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP's contrastive training aligns image and text representations in a shared embedding space. Given N image-text pairs in a batch, the InfoNCE loss maximizes similarity between N matching pairs and minimizes similarity between N squared minus N non-matching pairs. Zero-shot classification encodes candidate class names as text and finds the closest image embedding.",
      hints: [
        "Contrastive loss: pull together matching pairs, push apart non-matching pairs in embedding space.",
        "Zero-shot classification: encode 'a photo of a dog' as text; check which image embedding is closest.",
      ],
    },
    {
      id: "q-tr-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "LLaVA (Large Language and Vision Assistant) connects a frozen CLIP vision encoder to a large language model using a trainable MLP projection layer, where only the projection (and optionally the LLM) is fine-tuned on instruction-following visual QA data.",
      correctAnswer: "True",
      explanation:
        "LLaVA's two-stage training: (1) pre-training — freeze CLIP and LLM, train only the MLP projection on image-caption pairs to align visual tokens with text embedding space; (2) instruction fine-tuning — unfreeze the LLM (keep CLIP frozen) and train on visual instruction-following data.",
      hints: [
        "Stage 1: projection training aligns image token space with LLM word embedding space.",
        "Stage 2: instruction tuning teaches the LLM to follow visual questions using the already-aligned tokens.",
      ],
    },
    {
      id: "q-tr-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Flamingo (Alayrac et al., 2022) introduces cross-attention layers interleaved with frozen LLM layers to handle interleaved image-text sequences. What problem does this design solve that a simple prefix-image approach cannot?",
      options: [
        "Flamingo's cross-attention reduces memory usage by avoiding storing visual tokens in the KV cache",
        "Cross-attention layers allow the model to handle arbitrarily many images interleaved with text at any position — the language model can attend to image features at any point in generation, not only using a fixed prefix of image tokens before all text",
        "Cross-attention improves vision encoder training by providing gradients back to CLIP",
        "Flamingo's design eliminates the need for a vision encoder by computing visual features on-the-fly",
      ],
      correctAnswer: 1,
      explanation:
        "The prefix-image design places all image tokens before the text prompt — this fails for interleaved sequences. Flamingo's cross-attention layers query visual features at any position during generation, naturally supporting documents with images mixed throughout text.",
      hints: [
        "Prefix design: image tokens come first, text follows — position fixed at prompt start.",
        "Cross-attention: each text token can attend to any image's features at generation time, regardless of position.",
      ],
    },
  ],

  "llm-code-generation": [
    {
      id: "q-tr-kp34-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The pass@k metric for code generation evaluates: given k independently sampled solutions to a problem, what is the probability at least one passes all unit tests? For a model with 40% per-sample pass rate, what is pass@3?",
      options: [
        "pass@3 = 3 times 0.40 = 1.20 (capped at 1.0)",
        "pass@3 = 1 - (1 - 0.40)^3 = 1 - 0.216 = 0.784",
        "pass@3 = 0.40 (same as pass@1 since samples are independent)",
        "pass@3 = 0.40^3 = 0.064 (all three must pass)",
      ],
      correctAnswer: 1,
      explanation:
        "pass@k = 1 - (1-p)^k where p is per-sample pass rate. For p=0.40, k=3: pass@3 = 1 - 0.6^3 = 1 - 0.216 = 0.784. A model with 40% per-sample rate has 78.4% chance of producing at least one correct solution in 3 tries — making best-of-k sampling practically useful for code generation.",
      hints: [
        "Complement rule: P(at least 1 passes) = 1 - P(all fail) = 1 - (1-p)^k.",
        "For p=0.4, k=3: 1 - (0.6)^3 = 1 - 0.216 = 0.784.",
      ],
    },
    {
      id: "q-tr-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DeepSeek-Coder and CodeLlama both use Fill-in-the-Middle (FIM) training, which enables them to infill code at cursor positions given both the preceding and following context — unlike standard left-to-right models that can only append to a prefix.",
      correctAnswer: "True",
      explanation:
        "FIM training rearranges training sequences as PRE-prefix, SUF-suffix, MID-middle tokens, teaching the model to predict the middle given both sides. This is essential for IDE autocomplete where the programmer has typed both before and after the cursor.",
      hints: [
        "Standard autoregressive: given tokens 1..n, predict n+1. FIM: given tokens 1..k and m..n, predict k+1..m-1.",
        "IDE infilling (GitHub Copilot ghost text) requires FIM capability — the user types ahead, leaving a gap.",
      ],
    },
    {
      id: "q-tr-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Execution feedback in code generation RL uses unit test results as the reward signal. What fundamental advantage does execution feedback have over next-token log-likelihood or human preference ratings for code quality?",
      options: [
        "Execution feedback is faster to compute than log-likelihood, reducing training time",
        "Execution is the ground truth oracle for code correctness: the binary pass/fail signal from running tests against the specification eliminates ambiguity, unlike log-likelihood which rewards plausibility rather than correctness",
        "Execution feedback only requires one test case per problem, reducing annotation cost",
        "Execution feedback enables the model to directly observe GPU memory usage during training",
      ],
      correctAnswer: 1,
      explanation:
        "Log-likelihood rewards syntactically plausible code (which could be wrong); human ratings are expensive and subjective. Unit test execution is the objective ground truth: code either passes all tests (correct) or does not. This binary signal is unambiguous, scalable, and directly measures functional correctness — the actual goal of code generation.",
      hints: [
        "A model optimizing log-likelihood can produce elegant-looking but functionally wrong code.",
        "Tests define the specification precisely: pass all tests = meets requirements. No human judgment needed.",
      ],
    },
  ],

  "llm-agents-llm": [
    {
      id: "q-tr-kp35-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "OpenAI's function calling API requires developers to describe available functions in a JSON schema. What enables the model to correctly select and parameterize tools it has never seen during pretraining?",
      options: [
        "The model memorizes all possible APIs during pretraining on code documentation",
        "The function JSON schema provided in the system prompt serves as in-context specification: the model uses its instruction-following and schema-reading abilities to interpret new tool schemas zero-shot",
        "Function calling uses a separate specialized model fine-tuned only on API documentation",
        "The API names must exactly match patterns seen during pretraining for the model to use them",
      ],
      correctAnswer: 1,
      explanation:
        "Tool use generalizes through instruction following: the model reads the JSON schema describing the tool's name, parameters, and types in the system prompt, then applies its general capability for following structured specifications to generate valid tool calls. This is zero-shot tool learning.",
      hints: [
        "The schema is the in-context specification: function name, parameter names, types, descriptions.",
        "The model uses its general ability to follow structured formats and understand documentation to generalize to new tools.",
      ],
    },
    {
      id: "q-tr-kp35-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Structured outputs (JSON mode) in LLM APIs guarantee syntactically valid JSON by constraining the token sampling process to only allow tokens that maintain valid JSON grammar at each generation step, not by post-processing or retrying failed parses.",
      correctAnswer: "True",
      explanation:
        "Constrained decoding for structured outputs uses a grammar-constrained sampler: at each token position, only tokens consistent with the current partial JSON parse state are allowed. This guarantees syntactic validity by construction. Libraries like Outlines and llama.cpp implement this via JSON schema to finite-state-machine compilation.",
      hints: [
        "At each step, a finite state machine tracking the JSON parse state masks invalid next tokens to 0 probability.",
        "No retry needed: the FSM constraint ensures every generated sequence is valid JSON by construction.",
      ],
    },
    {
      id: "q-tr-kp35-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a multi-tool agent, the LLM must decide when to stop calling tools and produce a final answer. The stopping problem refers to the risk of premature answers or infinite tool-calling loops. What training signal most directly addresses this?",
      options: [
        "Increasing the maximum context length so the model can see all tool outputs",
        "Fine-tuning on trajectories where the terminal state receives positive reward and over-tool-calling trajectories receive negative reward — teaching the model when continued tool use is and is not beneficial",
        "Using temperature 0 to ensure deterministic stopping behavior",
        "Adding a hardcoded maximum tool-call count enforced at the API layer",
      ],
      correctAnswer: 1,
      explanation:
        "Optimal stopping in agentic systems requires the model to estimate whether additional tool calls will improve the answer — a value estimation problem. RL training on labeled trajectories teaches this stopping policy directly, generalizing better than hard limits.",
      hints: [
        "The model needs to estimate: will one more tool call help? — this is a value function estimation problem.",
        "Hard API limits (max tools) are a patch; RL-trained stopping generalizes to novel tool combinations.",
      ],
    },
  ],

  "llm-evaluation-advanced": [
    {
      id: "q-tr-kp36-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "MMLU covers 57 subjects. A model achieves 90% overall but only 60% on STEM subjects. What does this differential reveal about relying on aggregate benchmark scores?",
      options: [
        "The model failed STEM because STEM questions are harder on average, not due to capability gaps",
        "Aggregate scores can hide critical capability deficits: a high overall score can mask very low performance on specific domains, making aggregate MMLU insufficient for evaluating suitability for STEM-specific deployments",
        "A 90% aggregate on MMLU guarantees the model is deployment-ready for all 57 subjects",
        "The 60% STEM score is statistically indistinguishable from the 90% aggregate due to the small STEM subset size",
      ],
      correctAnswer: 1,
      explanation:
        "Aggregation hides variance: a model strong on 50 humanities subjects and weak on 7 STEM subjects can score 90% overall while being unreliable for scientific applications. Subject-level breakdown is crucial for understanding actual capability distribution.",
      hints: [
        "If 50 subjects are 95%+ and 7 STEM subjects are 60%, the aggregate is high but STEM is clearly a gap.",
        "Aggregate accuracy summarizes across 57 subjects — it necessarily loses subject-specific information.",
      ],
    },
    {
      id: "q-tr-kp36-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Benchmark contamination occurs when test set examples from an evaluation benchmark appear in an LLM's pretraining corpus, causing inflated benchmark scores that overestimate true generalization ability.",
      correctAnswer: "True",
      explanation:
        "Since LLMs are trained on large web crawls and the internet contains many benchmarks, contamination is a real concern. Detection methods include n-gram overlap detection, canary insertion (checking if the model can complete withheld benchmark suffixes), and using newer benchmarks post-dating the training cutoff.",
      hints: [
        "If MMLU test questions appear on the training web crawl, the model may have memorized answers rather than reasoning.",
        "Canary test: insert a unique string in the test set, check if the model knows it — if yes, the test set was in training data.",
      ],
    },
    {
      id: "q-tr-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BIG-bench Hard (Suzgun et al., 2022) consists of 23 tasks where LLMs scored below human performance on BIG-bench. What makes BIG-bench Hard tasks uniquely valuable for evaluating frontier LLMs compared to standard benchmarks?",
      options: [
        "BIG-bench Hard tests are longer, requiring more tokens to answer",
        "BIG-bench Hard tasks are specifically those that remained unsolved at evaluation time — they track genuine capability frontiers rather than settled capabilities, providing headroom for measuring future model improvements without immediate saturation",
        "BIG-bench Hard contains only math problems, isolating pure arithmetic capability",
        "BIG-bench Hard tasks are automatically generated, preventing contamination",
      ],
      correctAnswer: 1,
      explanation:
        "Standard benchmarks like MMLU and HellaSwag are already near-saturated by frontier models (90%+), making them uninformative for discriminating between top models. BIG-bench Hard was selected specifically because these tasks challenged models at evaluation time — providing a moving frontier for measuring genuine capability advances.",
      hints: [
        "When a benchmark hits 95%+ accuracy, it stops differentiating between models — it is saturated.",
        "BIG-bench Hard is the unsolved residual — the tasks that remained hard — useful precisely because they are not saturated.",
      ],
    },
  ],

  "llm-compression": [
    {
      id: "q-tr-kp37-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Magnitude-based weight pruning removes the smallest-magnitude weights from an LLM, setting them to zero. For a 70B parameter model where 50% of weights are pruned, what is the theoretical memory reduction if sparse weights are stored efficiently?",
      options: [
        "No reduction — zeros must still be stored in the weight matrix",
        "Up to 2 times reduction using sparse storage formats (CSR/CSC), since only non-zero values and their indices are stored",
        "Exactly 4 times reduction because pruning always removes 75% of parameters",
        "50% reduction in compute but no memory reduction since matrix shapes are unchanged",
      ],
      correctAnswer: 1,
      explanation:
        "Sparse storage formats store only non-zero values plus their indices. For 50% sparsity, non-zero values require 50% of original storage with some index overhead. Net: approximately 2 times compression with efficient sparse formats. NVIDIA's A100/H100 support 2:4 structured sparsity with 2 times throughput acceleration.",
      hints: [
        "Naive storage still stores zeros; sparse formats skip them entirely, storing only non-zero values plus positions.",
        "2:4 sparsity (2 non-zeros per 4-element group) gives exactly 2 times dense-equivalent speedup on supported hardware.",
      ],
    },
    {
      id: "q-tr-kp37-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Alpaca and Vicuna demonstrated that a 7B-parameter LLaMA model fine-tuned on GPT-4/ChatGPT outputs can achieve instruction-following quality comparable to much larger models — making teacher-student distillation from proprietary LLMs practical at low cost.",
      correctAnswer: "True",
      explanation:
        "Alpaca (Stanford, 2023) fine-tuned LLaMA-7B on 52K GPT-3.5-generated instruction-following examples for under $100, producing a model competitive with GPT-3.5 on many conversational tasks. Vicuna fine-tuned LLaMA on ChatGPT conversations. Both demonstrated that high-quality output distillation can efficiently transfer instruction-following abilities from large proprietary models to small open models.",
      hints: [
        "Distillation here uses the teacher's outputs (not logits): fine-tune the student to imitate the teacher's responses.",
        "52K examples at roughly $0.002 per 1K tokens gives approximately $100 total data cost for Alpaca — extremely efficient knowledge transfer.",
      ],
    },
    {
      id: "q-tr-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ShortGPT and LaCo show that many transformer layers in trained LLMs can be dropped with minimal performance loss. The block influence metric (cosine similarity between layer input and output) identifies redundant layers. What does high cosine similarity between a layer's input and output indicate?",
      options: [
        "The layer is performing maximum transformation and is essential",
        "The layer output is nearly identical to its input — the layer is performing nearly the identity function and contributing little to the representation change, making it a candidate for removal",
        "High cosine similarity indicates the layer has learned very large weight magnitudes",
        "The layer is performing dimension reduction and compressing the representation",
      ],
      correctAnswer: 1,
      explanation:
        "Block influence (1 minus cosine similarity between input and output) measures how much a layer changes its input representation. A high cosine similarity (near 1) means the layer barely changes the representation — an identity-like layer adds little value and can be dropped. ShortGPT found that certain middle layers exhibit very high input-output similarity.",
      hints: [
        "cosine_sim(input, output) near 1 means the vectors are nearly parallel, so the layer barely changes the representation.",
        "Block influence near 0 = identity layer; block influence near 2 = maximum orthogonal transformation.",
      ],
    },
  ],

  "llm-pretraining": [
    {
      id: "q-tr-kp38-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Common Crawl provides petabytes of raw web data for LLM pretraining. Which of the following is a widely-used heuristic quality filter in LLM pretraining pipelines such as C4 and RefinedWeb?",
      options: [
        "Filtering by page rank: only include top-1000 websites by traffic",
        "Perplexity-based filtering: remove documents with high perplexity under a small reference language model, selecting documents that are fluent and well-formed relative to known high-quality text",
        "Date filtering: only include documents published after 2010",
        "Keyword filtering: remove any document not containing at least 5 named entities",
      ],
      correctAnswer: 1,
      explanation:
        "Perplexity filtering (used in C4 and GPT-3 data pipeline) assigns a language model perplexity score to each document using a small reference LM trained on high-quality text such as Wikipedia. Documents with very high perplexity (incomprehensible or spammy) are discarded. This scalably filters low-quality web text without manual inspection.",
      hints: [
        "High perplexity under a Wikipedia-trained LM means the text is very different from fluent encyclopedic text.",
        "C4 (Colossal Clean Crawled Corpus) uses a 5-gram LM trained on Wikipedia to filter CommonCrawl.",
      ],
    },
    {
      id: "q-tr-kp38-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Deduplication of pretraining data (exact and near-exact duplicate removal) is critical not only to prevent memorization but also to improve model quality on downstream tasks — deduplicated datasets produce better models even controlling for total training tokens.",
      correctAnswer: "True",
      explanation:
        "Lee et al. (2022) and Penedo et al. (2023, RefinedWeb) demonstrated that deduplication consistently improves model quality: training on deduplicated data produces better models than training on the same data with duplicates, even at equal token count. Duplicates cause the model to disproportionately memorize repeated content and bias the data distribution.",
      hints: [
        "Duplicates act as implicit upweighting: a document appearing 100 times is trained on 100 times more than a unique document.",
        "MinHash LSH and suffix array deduplication are the two main scalable approaches for web-scale deduplication.",
      ],
    },
    {
      id: "q-tr-kp38-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The Chinchilla scaling law (Hoffmann et al., 2022) prescribes compute-optimal training. For a model with 10B parameters, approximately how many training tokens does Chinchilla recommend?",
      options: [
        "10B tokens — equal parameters and tokens",
        "200B tokens (approximately 20 tokens per parameter, as Chinchilla prescribes roughly 20 tokens per parameter for compute-optimal training)",
        "1T tokens — Chinchilla recommends 100 tokens per parameter",
        "Train until validation loss stops improving, regardless of token count",
      ],
      correctAnswer: 1,
      explanation:
        "Chinchilla found that compute-optimal training uses roughly 20 tokens per parameter: D* is approximately 20 times N*. For 10B params: 20 times 10B = 200B tokens. This contrasted with GPT-3's 175B params trained on 300B tokens. For the same compute budget, halving model size and doubling training tokens yields better models. Llama-1 and Llama-2 followed this principle.",
      hints: [
        "Pre-Chinchilla consensus: scale up model size. Post-Chinchilla: scale both model and data proportionally.",
        "20 tokens per parameter is the Chinchilla prescriptive ratio for compute-optimal pretraining.",
      ],
    },
  ],

  "emergent-capabilities": [
    {
      id: "q-tr-kp39-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Emergent abilities of LLMs (Wei et al., 2022) are defined as capabilities that appear suddenly at a scale threshold — absent in smaller models and present in larger ones. Which of the following is an example of an emergent ability?",
      options: [
        "Improved perplexity on held-out text as model size increases — a smooth, predictable improvement",
        "Multi-step arithmetic reasoning emerging around 100B parameters with few-shot prompting, while being near-random at 10B parameters",
        "Faster inference speed as model size decreases — a predictable scaling trend",
        "Increased vocabulary coverage with larger training datasets — a smooth data scaling effect",
      ],
      correctAnswer: 1,
      explanation:
        "Emergent abilities are specifically characterized by a sharp phase transition: performance is near-random below the threshold and jumps sharply above it. Multi-step arithmetic, multi-symbol reasoning, and chain-of-thought prompting exhibit this pattern. Smooth improvements in perplexity are NOT emergent by definition.",
      hints: [
        "Emergent = discontinuous jump, not smooth improvement. Plot accuracy vs. log(model size) and look for a sharp inflection.",
        "Below threshold: models perform at chance level (roughly 25% for 4-choice MCQ). Above: suddenly 70% or more.",
      ],
    },
    {
      id: "q-tr-kp39-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Schaeffer et al. (2023) argued that many reported emergent abilities are metric artifacts: when using nonlinear metrics such as exact match, smooth underlying capability improvements appear as sharp jumps, while switching to linear metrics such as token edit distance shows smooth scaling.",
      correctAnswer: "True",
      explanation:
        "Schaeffer et al. challenged the emergence narrative: exact match requires every token to be correct (a step function of underlying accuracy), so smooth improvements appear as sharp phase transitions. When measured with continuous metrics such as BPB or edit distance, the same tasks show smooth scaling — suggesting emergence is often a measurement artifact.",
      hints: [
        "Exact match on a 5-token answer: getting 4/5 tokens right = 0% exact match. Getting 5/5 = 100%. Smooth underlying progress appears as a sharp jump in the metric.",
        "The debate is still active: some researchers argue genuine phase transitions exist beyond metric artifacts.",
      ],
    },
    {
      id: "q-tr-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Few-shot in-context learning shows a growing performance gap versus zero-shot at larger scales on hard reasoning tasks. What mechanistic explanation has been proposed for why few-shot examples help large but not small models?",
      options: [
        "Few-shot examples provide more tokens for the model to attend to, increasing attention head utilization",
        "Large models can perform in-context Bayesian inference — inferring the latent task structure from examples to adapt their computation dynamically; small models lack the capacity for this implicit task inference",
        "Few-shot examples act as retrieval keys that match memorized training examples, working better in larger models with more memorized content",
        "Few-shot examples reduce the effective vocabulary the model needs to predict, making generation easier for all model sizes",
      ],
      correctAnswer: 1,
      explanation:
        "Mechanistic interpretability research (Olsson et al., 2022 on induction heads; Xie et al., 2021 on ICL as Bayesian inference) suggests large models develop meta-learning circuits that infer the latent task distribution from examples. Small models lack these circuits and use examples for surface-level pattern matching rather than genuine task adaptation.",
      hints: [
        "Induction heads (Olsson et al.) implement a form of copy-what-follows-this-pattern — a primitive ICL circuit.",
        "Bayesian ICL interpretation: the model updates a posterior over tasks given examples, then generates accordingly.",
      ],
    },
  ],

  "constitutional-llms": [
    {
      id: "q-tr-kp40-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "RLHF trains a reward model on human preference rankings, then uses PPO to optimize the LLM to maximize reward. RLAIF (RL from AI Feedback, Bai et al., 2022) replaces human raters with an AI annotator. What is the primary practical advantage of RLAIF?",
      options: [
        "RLAIF produces higher quality preference labels than human raters on all tasks",
        "RLAIF scales preference labeling at a fraction of the cost and time of human annotation — enabling continuous improvement without the bottleneck of human labeling throughput",
        "RLAIF eliminates the need for a reward model by using the LLM's own log-probabilities directly",
        "RLAIF uses RL without requiring any preference comparisons — it learns from scalar rewards only",
      ],
      correctAnswer: 1,
      explanation:
        "Human preference labeling is expensive and slow (human throughput is limited). RLAIF uses a capable LLM to generate preference comparisons automatically, enabling millions of preference labels at minimal cost. Bai et al. showed AI-labeled preferences produce comparable or better alignment quality than human labels for harmlessness training.",
      hints: [
        "RLHF bottleneck: human labelers can produce roughly 1000 comparisons per day. RLAIF: millions per day via API calls.",
        "Quality concern: AI annotators may have systematic biases — but they are consistent and highly scalable.",
      ],
    },
    {
      id: "q-tr-kp40-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Constitutional AI (CAI) trains a model to be harmless using a list of principles without requiring human harm labels: the model critiques and revises its own outputs against the principles, and these revised outputs are used for supervised fine-tuning.",
      correctAnswer: "True",
      explanation:
        "CAI's SL-CAI phase: (1) sample an initial (potentially harmful) response; (2) ask the model to critique the response against a constitutional principle; (3) ask the model to revise the response; (4) fine-tune on the revised responses. No human labels are needed for the harm dimension — the model self-supervises using the constitution.",
      hints: [
        "Critique step: identify ways your response is harmful. Revision step: rewrite to avoid those issues.",
        "Human labels are still used for helpfulness, but harmlessness training uses AI self-critique — eliminating expensive harm labeling.",
      ],
    },
    {
      id: "q-tr-kp40-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Refusal calibration in safety-trained LLMs involves balancing over-refusal (refusing benign requests that superficially resemble harmful ones) against under-refusal (complying with genuinely harmful requests). What training approach most directly addresses over-refusal without compromising safety?",
      options: [
        "Reducing the weight of the harmlessness reward in RLHF to allow more refusals to be overridden",
        "Including contrast pairs in fine-tuning: pairs of superficially similar benign and harmful prompts where the model is trained to respond helpfully to the benign version and refuse the harmful one — teaching fine-grained discrimination between surface similarity and true harm",
        "Removing all safety fine-tuning and relying only on pretraining data distribution",
        "Increasing the temperature at inference time so the model is less conservative in refusing",
      ],
      correctAnswer: 1,
      explanation:
        "Over-refusal stems from surface-level pattern matching. Contrast pair training teaches the model to distinguish intent and context: 'How do explosives work?' (educational) versus 'How do I make explosives to harm someone?' (harmful). This targeted discrimination reduces false positives while maintaining true refusals.",
      hints: [
        "Over-refusal is a false positive safety case: refusing 'How does poison work?' in a toxicology course context.",
        "Contrast pairs: a minimal edit between benign and harmful versions teaches context-sensitive safety, not surface patterns.",
      ],
    },
  ],
});

registerQuestions(questions);
export default questions;
