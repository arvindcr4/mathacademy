import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  // ── nlp-kp-1: Tokenization & Subword Methods ──────────────────────────────
  tokenization: [
    {
      id: "q-nlp-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "BPE tokenization starts with a character-level vocabulary and then does what?",
      options: [
        "Splits the rarest words into single characters and leaves frequent words intact",
        "Iteratively merges the most frequent adjacent symbol pair, adding each merged symbol to the vocabulary",
        "Assigns each word a fixed-length subword sequence using a lookup table",
        "Randomly samples character n-grams until the vocabulary reaches the desired size",
      ],
      correctAnswer: 1,
      explanation:
        'BPE (Gage, 1994; Sennrich et al., 2016) begins with a vocabulary of individual characters plus an end-of-word marker, then greedily merges the most frequent adjacent pair at each step. After k merges, the vocabulary contains the original characters plus k learned subword units. This means common morphemes like "ing" or "un" become single tokens, while rare words are split into recognisable pieces — eliminating OOV entirely.',
      hints: [
        "Think of BPE as a bottom-up process: start small (characters), merge upward.",
        "At each step only one merge rule is added. After 10,000 such merges you have a vocabulary of ~10,000 subword units.",
      ],
    },
    {
      id: "q-nlp-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'The phrase "The bank can guarantee deposits will eventually cover future tuition costs" contains an ambiguous word. Which word is it, and why?',
      options: [
        '"guarantee" — it can mean either legal promise or mathematical certainty',
        '"bank" — it could refer to a financial institution or the bank of a river',
        '"cover" — it can mean pay for or physically cover something',
        '"deposits" — it could be financial deposits or geological sediment deposits',
      ],
      correctAnswer: 1,
      explanation:
        'This classic example (Jurafsky & Martin) illustrates lexical ambiguity. "Bank" has multiple word senses: financial institution vs. river bank. Static embeddings (Word2Vec, GloVe) assign a single vector to "bank" that blurs these senses. Contextualised models (BERT) produce different vectors for "bank" depending on whether nearby words are financial (deposits, tuition) or geographic (river, shore), directly addressing this polysemy problem.',
      hints: [
        "Static embeddings assign one vector per word form regardless of context — what problem arises for words with two very different meanings?",
        "BERT\'s key innovation over Word2Vec is producing context-sensitive representations. Why would that help here?",
      ],
    },
    {
      id: "q-nlp-kp1-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "WordPiece (used in BERT) selects each merge by choosing the pair that maximises the likelihood of the training corpus under the language model, rather than the pair with the highest raw count.",
      correctAnswer: "true",
      explanation:
        "WordPiece scores each candidate merge by how much it increases the log-likelihood of the training data: score(A, B) = count(AB) / (count(A) × count(B)). This means a rare pair that always co-occurs (high PMI) can be preferred over a more frequent but less predictive pair, producing a vocabulary better suited to language modelling than BPE\'s raw-count criterion.",
      hints: [
        "BPE: pick the pair with the highest raw count. WordPiece: pick the pair that most improves the LM.",
        "Think pointwise mutual information — a pair that always appears together has high PMI even if neither word is common.",
      ],
    },
  ],

  // ── nlp-kp-2: Word Embeddings ─────────────────────────────────────────────
  "word-embeddings": [
    {
      id: "q-nlp-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'The phrase "The bank can guarantee deposits will eventually cover future tuition costs" contains an ambiguous word. Which word is it, and why?',
      options: [
        '"guarantee" — it can mean either legal promise or mathematical certainty',
        '"bank" — it could refer to a financial institution or the bank of a river',
        '"cover" — it can mean pay for or physically cover something',
        '"deposits" — it could be financial deposits or geological sediment deposits',
      ],
      correctAnswer: 1,
      explanation:
        'This classic example (Jurafsky & Martin) illustrates lexical ambiguity. "Bank" has multiple word senses: financial institution vs. river bank. Static embeddings (Word2Vec, GloVe) assign a single vector to "bank" that blurs these senses. Contextualised models (BERT) produce different vectors for "bank" depending on whether nearby words are financial (deposits, tuition) or geographic (river, shore), directly addressing this polysemy problem.',
      hints: [
        "Static embeddings assign one vector per word form regardless of context — what problem arises for words with two very different meanings?",
        "BERT\'s key innovation over Word2Vec is producing context-sensitive representations. Why would that help here?",
      ],
    },
    {
      id: "q-nlp-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Word2Vec Skip-Gram is trained to predict surrounding context words from a centre word. What does this objective teach the model?",
      options: [
        "The syntactic parse tree of every sentence in the corpus",
        "Which words appear in similar contexts, encoding distributional similarity as geometric proximity",
        "The exact frequency rank of every word in the training corpus",
        "A one-hot encoding of each word compressed into a lower-dimensional space",
      ],
      correctAnswer: 1,
      explanation:
        'The distributional hypothesis (Firth, 1957; Harris, 1954) states that words in similar contexts have similar meanings. Skip-Gram operationalises this: it trains a model to predict which words tend to co-occur within a window of k words. Words that appear in similar contexts — "king" and "queen" both appearing near "throne", "crown", "reign" — end up with similar embedding vectors. The famous analogy king − man + woman ≈ queen emerges because these regularities are captured in the vector space.',
      hints: [
        '"You shall know a word by the company it keeps" (Firth, 1957) — this is the core idea Skip-Gram exploits.',
        'If "doctor" and "physician" appear near the same context words (patient, hospital, treatment), what should their vectors look like?',
      ],
    },
    {
      id: "q-nlp-kp2-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "GloVe trains on individual context-window co-occurrences like Word2Vec, processing one (word, context) pair at a time.",
      correctAnswer: "false",
      explanation:
        'GloVe (Global Vectors, Pennington et al. 2014) builds a global word–word co-occurrence matrix X over the entire corpus first, then factorises it using a weighted least-squares objective: minimise Σ f(X_ij)(w_i·w̃_j + b_i + b̃_j − log X_ij)². The word "Global" in the name signals that it uses corpus-wide aggregate statistics rather than local window samples. This global view makes GloVe more data-efficient than Skip-Gram\'s stochastic sampling.',
      hints: [
        'The name GloVe contains the word "Global" — what does that suggest about its use of the corpus?',
        "Word2Vec samples individual (word, context) training pairs. GloVe first builds a big count matrix and trains on those counts directly.",
      ],
    },
  ],

  // ── nlp-kp-3: Language Modeling & Perplexity ──────────────────────────────
  "language-modeling": [
    {
      id: "q-nlp-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A bigram language model trained on a corpus gives P(want|I) = 0.33, P(Chinese|want) = 0.0065, P(food|Chinese) = 0.52, P(</s>|food) = 0.68. What is P(<s> I want Chinese food </s>), assuming P(I|<s>) = 0.25?",
      options: [
        "Approximately 0.000031 — multiply the five bigram probabilities together",
        "Approximately 0.0019 — average the five probabilities",
        "Approximately 0.25 — only the first bigram probability matters",
        "Approximately 1.0 — it is a grammatical English sentence",
      ],
      correctAnswer: 0,
      explanation:
        "By the chain rule and the Markov (bigram) approximation, P(sentence) ≈ Π P(wi|context). Here: 0.25 × 0.33 × 0.0065 × 0.52 × 0.68 ≈ 0.000019. (The exact numbers from Jurafsky & Martin Fig 3.2 give ~0.000019–0.000031 depending on rounding.) The key insight is that sentence probability is a product of conditional bigram probabilities, and the product of many small fractions rapidly becomes very small — hence the use of log space in practice.",
      hints: [
        "The chain rule: P(w1...wn) = P(w1)P(w2|w1)...P(wn|w_{n-1}) for a bigram model.",
        "Multiply: 0.25 × 0.33 × 0.0065 × 0.52 × 0.68. Note that even a very probable 5-word sentence has probability < 0.001.",
      ],
    },
    {
      id: "q-nlp-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A language model achieves perplexity 109 on Wall Street Journal text with a trigram model, versus 170 with a bigram and 962 with a unigram. What does the lower trigram perplexity tell us?",
      options: [
        "The trigram model has a smaller vocabulary and fewer parameters",
        'The trigram model assigns higher probability to the test set, meaning it is less "surprised" by each word',
        "The trigram model generates more grammatical sentences when sampled from",
        "The trigram model takes three times as long to evaluate as the unigram model",
      ],
      correctAnswer: 1,
      explanation:
        "Perplexity(W) = P(w1...wN)^(-1/N) — the per-word inverse probability of the test set. Lower perplexity = higher probability = the model better predicts the test text. A trigram model conditioning on the two previous words gives better predictions than a bigram (one word) or unigram (no context). The numbers 962 → 170 → 109 (from Jurafsky & Martin, WSJ experiments) show how longer context helps dramatically, but with diminishing returns.",
      hints: [
        "Perplexity = inverse probability normalised by length. The better the model predicts the test set, the __ the perplexity.",
        "Think of perplexity as the weighted branching factor: a perplexity of 109 means the model is on average choosing among ~109 equally likely next words.",
      ],
    },
    {
      id: "q-nlp-kp3-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In n-gram language modelling, storing and combining probabilities in log space (log-probabilities) is standard practice because multiplying many probabilities together causes numerical underflow.",
      correctAnswer: "true",
      explanation:
        "Probabilities are ≤ 1, so multiplying N of them produces a number that shrinks exponentially. For a 100-word sentence with average per-word probability 0.01, the sentence probability is 0.01^100 = 10^-200, far below the smallest float64 value (~10^-308 near the limit). Working in log space converts products to sums: log P(w1...wN) = Σ log P(wi|context), which stays in a manageable numeric range. The exp is taken only at the end if raw probabilities are needed.",
      hints: [
        "float64 underflows below ~10^-308. A 100-word sentence with P≈0.001 per word has sentence probability 0.001^100 = 10^-300.",
        "log(a × b) = log(a) + log(b). Addition never underflows the way multiplication does.",
      ],
    },
  ],

  // ── nlp-kp-4: Sequence-to-Sequence Models & Encoder-Decoder ──────────────
  seq2seq: [
    {
      id: "q-nlp-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the original RNN encoder-decoder model (Sutskever et al., 2014), information passes from encoder to decoder via a single fixed-size vector. What fundamental limitation does this create?",
      options: [
        "The model cannot be trained with backpropagation through time",
        "The entire source sentence must be compressed into one vector regardless of length, losing detail for long inputs",
        "The decoder cannot generate sequences longer than the encoder input",
        "The model requires source and target to share the same vocabulary",
      ],
      correctAnswer: 1,
      explanation:
        'The encoder compresses the entire source into one context vector (the final hidden state). For short sentences this works; for long sentences the vector becomes a bottleneck — it cannot preserve all lexical and syntactic detail from 30+ source words. This is the "information bottleneck" problem that Bahdanau attention was designed to solve in 2015.',
      hints: [
        "Imagine summarising a 50-word sentence into a single 512-dimensional vector. What details might get dropped?",
        "The attention mechanism was invented as a direct fix to this bottleneck. What does attention let the decoder do that a single vector cannot?",
      ],
    },
    {
      id: "q-nlp-kp4-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "During seq2seq training with teacher forcing, the decoder receives the gold-standard previous token as input. During inference it receives its own previous prediction. What problem does this mismatch cause?",
      options: [
        "The model overfits to the training vocabulary and cannot handle unseen words",
        "Exposure bias: the model was never trained to recover from its own errors, so early mistakes compound during inference",
        "The model produces outputs that are shorter than the gold-standard target sequences",
        "Gradient flow through the decoder is blocked, causing vanishing gradients",
      ],
      correctAnswer: 1,
      explanation:
        'Teacher forcing trains the model on a distribution that only includes perfect previous tokens. At test time, an incorrect token at step t changes the distribution of inputs at step t+1 onward — a distribution the model has never seen. This "exposure bias" can cause error cascades. Scheduled sampling (Bengio et al., 2015) and other approaches try to bridge this training/inference gap by gradually replacing gold tokens with model predictions during training.',
      hints: [
        "Exposure bias refers to what the model was exposed to during training vs. inference.",
        'If the model generates "the cat sat on the" but should have said "the dog", every subsequent word must now be conditioned on "the" — a prefix it never trained on.',
      ],
    },
    {
      id: "q-nlp-kp4-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Seq2seq models with RNN encoders process all source tokens before the decoder generates any output token, making the encoder phase fully parallelisable across tokens.",
      correctAnswer: "false",
      explanation:
        "RNN encoders process tokens sequentially: h_t depends on h_{t-1}. This sequential dependency means you cannot compute h_3 until h_2 is done — the encoder phase is O(n) serial steps, not parallelisable. This is a key reason the Transformer replaced RNNs: its self-attention computes representations for all positions simultaneously in O(1) serial steps (though O(n²) in compute).",
      hints: [
        "Does computing h_3 require h_2 to already be computed?",
        "Parallelism is what makes GPUs efficient. If steps must run in sequence, GPU parallelism is wasted.",
      ],
    },
  ],

  // ── nlp-kp-5: Attention Mechanism ─────────────────────────────────────────
  "attention-mechanism": [
    {
      id: "q-nlp-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Bahdanau (additive) attention, at each decoder step $t$ the model computes alignment scores $e_{t,s} = \\mathbf{v}^\\top \\tanh(\\mathbf{W}_1 \\mathbf{h}_t + \\mathbf{W}_2 \\hat{\\mathbf{h}}_s)$ for all source positions $s$. The resulting attention weights are $\\alpha_{t,s} = \\frac{\\exp(e_{t,s})}{\\sum_{s'}\\exp(e_{t,s'})}$. What do these $\\alpha_{t,s}$ values represent?",
      options: [
        "The probability that source token $s$ is syntactically the head of target token $t$",
        "A soft, learnable alignment: how much decoder step $t$ should attend to source position $s$ when generating the next target token",
        "The probability that source and target token vocabularies overlap at position $s$",
        "The cosine similarity between the query vector $\\mathbf{h}_t$ and the key vector $\\hat{\\mathbf{h}}_s$",
      ],
      correctAnswer: 1,
      explanation:
        "The attention weights $\\alpha_{t,s} \\in [0,1]$ sum to 1 over all source positions — they form a probability distribution over source positions. Each $\\alpha_{t,s}$ represents the fractional importance of source position $s$ when generating the target token at time $t$. For English-to-French translation, when generating the French token \"la\" (feminine article), the model assigns high $\\alpha_{t,s}$ to the English source position of \"the\" (feminine), not \"a\".\n\nThe key contrast is soft vs. hard alignment: IBM models' hard alignment assigns each target word to exactly one source word, while Bahdanau's soft alignment allows fractional weights — multiple source tokens can receive nonzero $\\alpha$ simultaneously, making the mechanism differentiable end-to-end.\n\nThe context vector at decoder step $t$ is:\n\\[\\mathbf{c}_t = \\sum_s \\alpha_{t,s} \\hat{\\mathbf{h}}_s.\\]",
      hints: [
        "The softmax normalises the raw alignment scores $e_{t,s}$ so that $\\sum_s \\alpha_{t,s} = 1$ — each $\\alpha_{t,s}$ behaves like a probability.",
        "Hard alignment (IBM Model 1–4): each target position links to exactly one source position. Soft alignment (Bahdanau): every target attends to every source with fractional weights — differentiable and end-to-end trainable.",
        "The context vector $\\mathbf{c}_t = \\sum_s \\alpha_{t,s} \\hat{\\mathbf{h}}_s$ is a weighted average of all encoder states.",
      ],
    },
    {
      id: "q-nlp-kp5-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Scaled dot-product attention computes:\n\\[\\text{Attention}(\\mathbf{Q},\\mathbf{K},\\mathbf{V}) = \\text{softmax}\\!\\left(\\frac{\\mathbf{Q}\\mathbf{K}^\\top}{\\sqrt{d_k}}\\right)\\mathbf{V}.\n\\]\nWhy divide by $\\sqrt{d_k}$ rather than by $d_k$?",
      options: [
        "Dividing by $\\sqrt{d_k}$ ensures the attention weights sum to exactly 1",
        "When $\\mathbf{q}$ and $\\mathbf{k}$ have unit variance, their dot product $\\mathbf{q}\\cdot\\mathbf{k} = \\sum_{i=1}^{d_k} q_i k_i$ has variance $d_k$; dividing by $\\sqrt{d_k}$ restores unit variance, keeping softmax in a gradient-friendly regime",
        "It normalises for different sequence lengths so longer sequences get smaller attention weights",
        "It converts dot products into cosine similarities for comparison",
      ],
      correctAnswer: 1,
      explanation:
        "If $\\mathbf{q}$ and $\\mathbf{k} \\in \\mathbb{R}^{d_k}$ each have independent components with mean 0 and variance 1, then:\n\\[\\mathbb{V}\\text{ar}(\\mathbf{q}\\cdot\\mathbf{k}) = \\mathbb{V}\\text{ar}\\!\\left(\\sum_{i=1}^{d_k} q_i k_i\\right) = d_k \\cdot (1 \\cdot 1) = d_k.\\]\nFor large $d_k$ (e.g., 512 or 1024), $\\mathbf{q}\\cdot\\mathbf{k}$ can have magnitude $\\sim 30\\sqrt{d_k} \\gg 1$, pushing softmax into saturation where the output is nearly one-hot and gradients are near zero. Dividing by $\\sqrt{d_k}$ normalises the variance to 1, keeping softmax inputs in a well-behaved region.\n\nDividing by $d_k$ instead would under-scale: $\\mathbb{V}\\text{ar}(\\mathbf{q}\\cdot\\mathbf{k}/d_k) = 1/d_k$, producing vanishingly small logits and extremely flat attention distributions.",
      hints: [
        "Step 1: $\\mathbb{V}\\text{ar}(q_i k_i) = \\mathbb{V}\\text{ar}(q_i)\\mathbb{V}\\text{ar}(k_i) = 1 \\cdot 1 = 1$ for unit-variance entries.\nStep 2: $\\mathbb{V}\\text{ar}(\\sum_i q_i k_i) = \\sum_i \\mathbb{V}\\text{ar}(q_i k_i) = d_k$.\nStep 3: To get variance 1, divide by $\\sqrt{d_k}$ (not $d_k$, which would give variance $1/d_k$).",
        "Softmax saturation: when input $\\gg 0$, softmax output $\\approx$ one-hot, gradient $\\approx 0$. The $\\sqrt{d_k}$ scaling keeps the dot product in a range where softmax is differentiable.",
      ],
    },
    {
      id: "q-nlp-kp5-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Luong attention (Luong et al., 2015) uses an additive (MLP) scoring function $\\text{score}(\\mathbf{h}_t, \\hat{\\mathbf{h}}_s) = \\mathbf{v}^\\top \\tanh(\\mathbf{W}[\\mathbf{h}_t; \\hat{\\mathbf{h}}_s])$, while Bahdanau attention uses a dot-product or bilinear scoring function $\\mathbf{h}_t^\\top \\mathbf{W} \\hat{\\mathbf{h}}_s$.",
      correctAnswer: "false",
      explanation:
        "The naming is reversed from what the statement claims:\n\n**Bahdanau (2015)** introduced *additive/concat* attention:\n\\[e_{t,s} = \\mathbf{v}^\\top \\tanh(\\mathbf{W}_1 \\mathbf{h}_t + \\mathbf{W}_2 \\hat{\\mathbf{h}}_s)\\] \nwhich uses a small MLP (the $\\tanh$ non-linearity) to combine the decoder state $\\mathbf{h}_t$ and encoder state $\\hat{\\mathbf{h}}_s$.\n\n**Luong (2015)** introduced *multiplicative* (dot-product / bilinear) variants:\n\\[\n\\text{dot: } & \\mathbf{h}_t^\\top \\hat{\\mathbf{h}}_s, \\\\\n\\text{general: } & \\mathbf{h}_t^\\top \\mathbf{W} \\hat{\\mathbf{h}}_s, \\\\\n\\text{concat: } & \\mathbf{v}^\\top \\tanh(\\mathbf{W}[\\mathbf{h}_t; \\hat{\\mathbf{h}}_s])\n\\]\nThe dot-product form is faster because it avoids the $\\tanh$ and extra parameters. This is why the Transformer's scaled dot-product attention is sometimes called \"Luong-style\" — it uses the dot-product scoring function that Luong popularised.",
      hints: [
        "Mnemonic: **B**ahdanau = **B**efore = MLP (additive) came first (2015). **L**uong = **L**ater = dot-product (multiplicative) came second (2015).",
        "Additive: uses $\\tanh$ non-linearity and an extra learnable vector $\\mathbf{v}$. Multiplicative: uses only matrix multiplication and optionally a weight matrix $\\mathbf{W}$ — no $\\tanh$.",
        "The Transformer's scaled dot-product attention $\\frac{\\mathbf{Q}\\mathbf{K}^\\top}{\\sqrt{d_k}}$ is a dot-product attention (Luong-style), scaled to prevent saturation.",
      ],
    },
  ],

  // ── nlp-kp-6: Transformer Architecture ───────────────────────────────────
  "transformer-architecture": [
    {
      id: "q-nlp-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Multi-head attention with $h=8$ heads and model dimension $d_\\text{model}=512$ uses $d_k = d_v = 64$ per head ($d_k = d_\\text{model}/h$). Why run 8 separate attention computations rather than one single-head attention of dimension 512?",
      options: [
        "To reduce the total parameter count by a factor of 8 compared to single-head attention",
        "To let the model jointly attend from different representation subspaces — each head can specialise in different syntactic or semantic relationships",
        "To ensure each head processes a different segment of the input sequence (heads are non-overlapping)",
        "To make the attention computation parallelisable across 8 GPU cores",
      ],
      correctAnswer: 1,
      explanation:
        "Each head $i$ learns its own projections $\\mathbf{W}_i^Q \\in \\mathbb{R}^{d_\\text{model} \\times d_k}$, $\\mathbf{W}_i^K$, $\\mathbf{W}_i^V$, producing $\\mathbf{Q}_i, \\mathbf{K}_i, \\mathbf{V}_i \\in \\mathbb{R}^{n \\times d_k}$. After computing attention for each head:\n\\[\\text{head}_i = \\text{Attention}(\\mathbf{Q}_i\\mathbf{W}_i^Q, \\mathbf{K}_i\\mathbf{W}_i^K, \\mathbf{V}_i\\mathbf{W}_i^V) \\in \\mathbb{R}^{n \\times d_k},\\]\nthe $h$ heads are concatenated and projected:\n\\[\\text{MultiHead}(\\mathbf{Q},\\mathbf{K},\\mathbf{V}) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)\\mathbf{W}^O.\\]\nEmpirically, different heads specialise: one tracks subject-verb number agreement, another resolves coreferential pronouns, another attends to positional proximity. Total compute is comparable to single-head with dimension $d_\\text{model}$ because $h \\times d_k = d_\\text{model}$ — the dimension reduction exactly offsets the multiple heads.",
      hints: [
        "Each head projects into a $d_k = d_\\text{model}/h$ dimensional subspace. 8 heads $\\times$ 64 dims = 512 dims total — same total dimensionality as one 512-dim head.",
        "The key advantage is representational diversity: different heads learn different $\\mathbf{W}_i^Q, \\mathbf{W}_i^K, \\mathbf{W}_i^V$ matrices, attending to different aspects of the input simultaneously.",
        "Compute comparison: single-head 512-dim attention vs. 8-head 64-dim attention — both require $\\mathcal{O}(n^2 \\cdot d_\\text{model})$ FLOPs.",
      ],
    },
    {
      id: "q-nlp-kp6-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The original Transformer uses sinusoidal positional encodings:\n\\[PE(\\text{pos}, 2i) = \\sin\\!\\left(\\frac{\\text{pos}}{10000^{2i/d_\\text{model}}}\\right), \\quad PE(\\text{pos}, 2i+1) = \\cos\\!\\left(\\frac{\\text{pos}}{10000^{2i/d_\\text{model}}}\\right).\\]\nWhat key property makes sinusoidal encodings useful for generalising to sequence positions beyond those seen during training?",
      options: [
        "Sinusoidal encodings are learned during training and extrapolate to longer sequences by periodic repetition",
        "They encode relative positions algebraically: $PE(\\text{pos}+k)$ is a fixed linear transformation of $PE(\\text{pos})$ (via the $\\sin(a+b)/\\cos(a+b)$ angle-addition formulas), so attention dot products automatically capture relative distance $(i-j)$",
        "They ensure every position has a unique encoding by construction, even beyond training length",
        "They are orthogonal to token embeddings in $\\mathbb{R}^{d_\\text{model}}$, preventing positional information from interfering with token semantics",
      ],
      correctAnswer: 1,
      explanation:
        "The key algebraic property is that for any fixed offset $k$:\n\\[\\begin{aligned}\nPE(\\text{pos}+k, 2i) &= \\sin\\!\\left(\\frac{\\text{pos}+k}{10000^{2i/d}}\\right) \\\\\n&= \\sin\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)\\cos\\!\\left(\\frac{k}{10000^{2i/d}}\\right) + \\cos\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)\\sin\\!\\left(\\frac{k}{10000^{2i/d}}\\right) \\\\\n&= A_{ki} \\cdot PE(\\text{pos}, 2i) + B_{ki} \\cdot PE(\\text{pos}, 2i+1),\n\\end{aligned}\\]\nwhere $A_{ki}, B_{ki}$ are constants depending only on $k$ (not on $\\text{pos}$). Thus $PE(\\text{pos}+k)$ is a fixed linear transformation of $PE(\\text{pos})$ — the relative offset $k$ is encoded algebraically into the dot products between position vectors.\n\nLearned positional embeddings (BERT, GPT) have no such guarantee: position 2048 simply has no entry in the lookup table if the model was trained only up to position 1024.",
      hints: [
        "Use the angle-addition formulas: $\\sin(x+y) = \\sin x \\cos y + \\cos x \\sin y$ and $\\cos(x+y) = \\cos x \\cos y - \\sin x \\sin y$. Apply with $x = \\text{pos}/10000^{2i/d}$ and $y = k/10000^{2i/d}$.",
        "The constants $A_{ki}, B_{ki}$ depend only on the offset $k$, not on $\\text{pos}$. This means: given any two position vectors $PE(i)$ and $PE(j)$, their dot product reveals $|i-j|$ — not the absolute positions $i$ and $j$.",
        "Learned embeddings: no row exists for positions never trained. Sinusoidal: the formula produces a valid vector for any integer position, and dot products between positions encode relative distance.",
      ],
    },
    {
      id: "q-nlp-kp6-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a Transformer encoder, causal masking (setting attention scores to $-\\infty$ for future positions before softmax) prevents each token from attending to future tokens within the same encoder layer.",
      correctAnswer: "false",
      explanation:
        "**Encoder** blocks use **bidirectional** (full) self-attention: every position attends to every other position without any mask. This is why BERT, which uses only the encoder stack, can condition each token on both its left and right context simultaneously.\n\n**Decoder** blocks apply **causal masking** (also called look-ahead or upper-triangular masking): the attention score matrix is multiplied by a lower-triangular mask $\\mathbf{M}_{ij} = 0$ if $i < j$ (future), $+\\infty$ if $i \\geq j$ (past or self), before softmax. This forces $\\alpha_{ij} = 0$ for $i < j$, so position $t$ can only attend to positions $1, \\dots, t$ — preventing the model from \"seeing the future\" during autoregressive generation.\n\nDuring decoder training with teacher forcing: all target tokens $\\langle\\text{the}, \\text{cat}, \\text{sat}\\rangle$ are available simultaneously, but causal masking ensures each position's representation depends only on previous positions.",
      hints: [
        "Draw the $n \\times n$ attention score matrix for $n=4$ tokens. Encoder: all entries are finite. Decoder: entries above the diagonal (future positions) are masked to $-\\infty$ before softmax.",
        "BERT = encoder only = bidirectional attention. GPT = decoder only = causal attention. This is the fundamental architectural difference between BERT and GPT.",
        "Causal masking is necessary because the decoder generates tokens sequentially — if position $t$ could attend to position $t+1$ (which hasn't been generated yet), it would be \"cheating\" during inference.",
      ],
    },
  ],

  // ── nlp-kp-7: BERT & Masked Language Modeling ─────────────────────────────
  "bert-pretraining": [
    {
      id: "q-nlp-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "BERT masks ~15% of input tokens and trains to predict them. Of those 15%, 80% are replaced with [MASK], 10% with a random token, and 10% left unchanged. Why not mask all 15% with [MASK]?",
      options: [
        "Masking all tokens with [MASK] would make the vocabulary too large",
        "The [MASK] token never appears at fine-tuning time, creating a train-test mismatch; the 10%+10% strategy forces the encoder to maintain good representations for all tokens",
        "The random replacement teaches the model to detect and correct typos",
        "Leaving 10% unchanged reduces the effective masking rate to 5%, preventing overfitting",
      ],
      correctAnswer: 1,
      explanation:
        'If all masked positions were replaced with [MASK], the model\'s representations for non-[MASK] tokens would receive no training signal for the MLM task, and [MASK] never appears during fine-tuning. By randomly keeping 10% unchanged and replacing 10% with a random word, the model cannot tell which tokens need predicting — it must learn good contextual representations for every token in every position. This is the "pre-training / fine-tuning mismatch" argument from Devlin et al. (2019).',
      hints: [
        '[MASK] is a pretraining-only artefact. What problem arises if the model learns to "turn off" its attention to tokens that are not [MASK]?',
        "The model cannot know which 10% were left unchanged — so it must represent every token well, not just [MASK] positions.",
      ],
    },
    {
      id: "q-nlp-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "BERT uses [CLS] at position 0 of every input. For sentence-pair classification (e.g., NLI), what is the typical fine-tuning approach?",
      options: [
        "Average the embeddings of both [SEP] tokens to get a sentence-pair representation",
        "Feed the [CLS] final hidden state to a linear classification head and fine-tune all weights end-to-end",
        "Concatenate the [CLS] embedding with the last token embedding and pass through an MLP",
        "Freeze all BERT weights and train only a softmax layer on top of the [CLS] embedding",
      ],
      correctAnswer: 1,
      explanation:
        "The [CLS] token attends to all other tokens through all 12 (or 24) transformer layers, accumulating a holistic representation of the entire input. A single linear layer is added on top of its final hidden state and the whole model — all BERT weights plus the new head — is fine-tuned jointly. This end-to-end fine-tuning achieves much higher accuracy than freezing BERT and using a fixed [CLS] vector, because the lower layers can adjust to task-specific patterns.",
      hints: [
        "The [CLS] token is the first token in the sequence. What does it represent?",
        "Fine-tuning updates all parameters. Why would updating only the classification head underperform full fine-tuning?",
      ],
    },
    {
      id: "q-nlp-kp7-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "RoBERTa (Liu et al., 2019) found that removing BERT\'s Next Sentence Prediction (NSP) task and training with longer sequences and larger batches consistently improves downstream performance.",
      correctAnswer: "true",
      explanation:
        "RoBERTa\'s ablations showed that NSP provides little benefit and can even hurt performance; many BERT variants remove NSP and train longer on more data with larger batch sizes.",
      hints: [
        "RoBERTa (Robustly Optimized BERT) was specifically designed to re-evaluate BERT\'s training choices.",
        "If removing a training objective improves downstream results, what does that tell you about the objective?",
      ],
    },
  ],

  // ── nlp-kp-8: GPT & Autoregressive Language Models ───────────────────────
  "gpt-autoregressive": [
    {
      id: "q-nlp-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'GPT-1 demonstrated that a large autoregressive language model pretrained on BooksCorpus could be fine-tuned on NLP tasks with minimal task-specific architecture. What does "autoregressive" mean in this context?',
      options: [
        "The model automatically selects the best regression objective based on the task",
        "Each token is predicted from all preceding tokens: P(w_t | w_1, ..., w_{t-1}), with a causal attention mask enforcing left-to-right conditioning",
        "The model recursively regresses over its own hidden states with recurrent connections",
        "The loss function auto-scales based on the gradient magnitude at each step",
      ],
      correctAnswer: 1,
      explanation:
        'An autoregressive LM factorises P(w_1...w_n) = Π P(w_t | w_1...w_{t-1}) using the chain rule. In GPT, this is implemented with a causal (lower-triangular) attention mask that zeroes out all attention weights from position t to positions t+1, t+2, ..., n — preventing the model from "seeing the future." At generation time, the model samples one token, appends it to the context, and repeats.',
      hints: [
        "Chain rule: P(A,B,C) = P(A)P(B|A)P(C|A,B). Autoregressive = applying this one step at a time.",
        "The causal mask is the architectural mechanism. Draw an attention matrix for 4 tokens — which entries are zeroed?",
      ],
    },
    {
      id: "q-nlp-kp8-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'GPT-3 (Brown et al., 2020) showed strong few-shot performance by placing a few examples in the prompt with no weight updates. Why does this "in-context learning" work?',
      options: [
        "GPT-3's weights are updated via meta-learning on each new prompt at inference time",
        "The examples in the context shift the model\'s conditional distribution, making desired outputs more likely without gradient descent",
        "GPT-3 retrieves training examples that match the prompt via a nearest-neighbour index",
        "GPT-3 translates all inputs to English before processing them",
      ],
      correctAnswer: 1,
      explanation:
        'In-context learning (ICL) exploits the fact that a large autoregressive model trained to predict the next token will, given examples of the form "Input: X → Output: Y", continue the pattern for a new Input: Z by predicting the most likely Output. No gradient update occurs — the examples shift the implicit prior over completions. This is fundamentally a property of the pretraining objective and scale: the model has learned so many patterns that it can identify and follow new ones from a few demonstrations.',
      hints: [
        'The model sees: "Translate English to French: sea → mer; cheese → fromage; dog → ?". It must predict the most likely continuation. What pretraining objective makes this work?',
        "ICL is not fine-tuning. The weights are frozen. How can examples in the context window change what the model outputs?",
      ],
    },
    {
      id: "q-nlp-kp8-3",
      type: "true-false",
      difficulty: "easy",
      question:
        'GPT-style models can be used for text classification by framing classification as a text completion task (e.g., appending "The sentiment is:" and sampling the next token).',
      correctAnswer: "true",
      explanation:
        'Because GPT generates the most likely continuation, framing classification as a prompt completion task allows zero-shot or few-shot classification without a classification head. For example: "Review: The food was awful. Sentiment: negative" teaches the pattern. A new review can then be classified by comparing the log-probabilities of "positive" and "negative" as continuations. This is the basis for many zero-shot benchmarks like SuperGLUE evaluated on GPT-3.',
      hints: [
        'If P("positive" | "Review: great film! Sentiment:") > P("negative" | ...), the model effectively classified the review.',
        'This requires no task-specific fine-tuning — the "classifier" is just next-token probability comparison.',
      ],
    },
  ],

  // ── nlp-kp-9: Text Classification & Sentiment Analysis ───────────────────
  "text-classification": [
    {
      id: "q-nlp-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "For binary sentiment classification using BERT, which fine-tuning strategy achieves the best results according to the original paper?",
      options: [
        "Freeze all BERT layers and train a logistic regression on the averaged token embeddings",
        "Add a linear classification head on the [CLS] token and fine-tune all BERT weights with a small learning rate (e.g., 2e-5)",
        "Replace the last 4 BERT layers with task-specific transformer layers and train only those",
        "Use BERT as a feature extractor and train an XGBoost classifier on the [CLS] output",
      ],
      correctAnswer: 1,
      explanation:
        'Devlin et al. (2019) show that fine-tuning all parameters end-to-end with a small learning rate (2e–5 to 5e–5) consistently outperforms feature-extraction approaches on classification tasks. The small learning rate is critical to avoid "catastrophic forgetting" — overwriting the rich pretraining representations. The classification head is typically a single linear layer with softmax applied to the [CLS] final hidden state.',
      hints: [
        'The key is "all weights" — not just the head. Why does updating all 110M BERT parameters (not just the head) help on a small labelled dataset?',
        "Too large a learning rate destroys the pretraining. 2e-5 nudges the weights to be task-appropriate without forgetting.",
      ],
    },
    {
      id: "q-nlp-kp9-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'A restaurant review says: "The food was excellent but the service was painfully slow." How does aspect-based sentiment analysis (ABSA) differ from document-level sentiment analysis on this sentence?',
      options: [
        'ABSA assigns a single sentiment label (positive) since "excellent" outweighs "slow"',
        "ABSA extracts (aspect, sentiment) pairs: (food, positive) and (service, negative), capturing fine-grained opinions toward distinct entities",
        'ABSA detects sarcasm in "painfully slow" and re-labels the service sentiment as positive',
        'ABSA ignores adjectives and classifies based only on nouns ("food", "service")',
      ],
      correctAnswer: 1,
      explanation:
        'This classic example (Jurafsky & Martin) illustrates lexical ambiguity. "Bank" has multiple word senses: financial institution vs. river bank. Static embeddings (Word2Vec, GloVe) assign a single vector to "bank" that blurs these senses. Contextualised models (BERT) produce different vectors for "bank" depending on whether nearby words are financial (deposits, tuition) or geographic (river, shore), directly addressing this polysemy problem.',
      hints: [
        "Static embeddings assign one vector per word form regardless of context — what problem arises for words with two very different meanings?",
        "BERT\'s key innovation over Word2Vec is producing context-sensitive representations. Why would that help here?",
      ],
    },
    {
      id: "q-nlp-kp9-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Naive Bayes classifies text by assuming all words are conditionally independent given the class, which is linguistically false — yet it often performs surprisingly well in practice.",
      correctAnswer: "true",
      explanation:
        'The "naive" independence assumption is unrealistic: seeing "not" dramatically changes the meaning of "good" (making them dependent). Despite this, Naive Bayes often achieves 70–80% accuracy on sentiment tasks because the log-probability scores act as a linear classifier over word counts, and the feature interactions that matter most (bigrams, negation) are partially captured by the presence of individual words. The independence assumption mainly affects probability calibration, not the ranking of classes.',
      hints: [
        'Naive Bayes still correctly identifies that "terrible", "awful", "hate" predict negative sentiment even without modelling word interactions.',
        "Think about what the language modelling objective actually optimises — is factual correctness part of the loss?",
      ],
    },
  ],

  // ── nlp-kp-10: NER & Sequence Labeling ───────────────────────────────────
  "ner-sequence-labeling": [
    {
      id: "q-nlp-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'The sentence "New York University filed a lawsuit" should be tagged for organisation NER. Using BIO tagging, what is the correct label sequence for "New York University"?',
      options: [
        'O O O — not an entity because "New" and "York" are location words',
        "B-ORG I-ORG I-ORG — B marks the start, I marks continuation of the same entity",
        "B-LOC B-LOC B-ORG — each word gets its own B tag because they are different words",
        "B-ORG B-ORG B-ORG — all three words are beginnings of separate entities",
      ],
      correctAnswer: 1,
      explanation:
        'In BIO tagging: B-TYPE marks the first token of an entity of that type, I-TYPE marks each continuation token within the same span, and O marks non-entity tokens. "New York University" is a single ORG entity spanning three tokens: B-ORG I-ORG I-ORG. Using B for every word (option 3) would incorrectly indicate three separate one-word entities. This scheme is used in CoNLL-2003 NER and supported by BiLSTM-CRF and transformer-based taggers.',
      hints: [
        "BIO = Beginning / Inside / Outside. A new entity always starts with B; only the first token of a span gets B.",
        'If you used B-ORG for every token of "New York University", you would be claiming there are three separate ORG entities of length 1.',
      ],
    },
    {
      id: "q-nlp-kp10-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is a CRF layer typically added on top of a BiLSTM (or transformer) for sequence labeling, rather than applying a softmax independently at each token position?",
      options: [
        "CRF makes training faster by reducing the number of loss computations per batch",
        "CRF models the joint probability of the entire label sequence, enforcing valid transitions (e.g., I-PER cannot follow B-LOC) and finding the globally optimal label sequence via Viterbi",
        "CRF replaces softmax, providing probability estimates that are always well-calibrated",
        "CRF allows the model to condition on future tokens by looking ahead in the sequence",
      ],
      correctAnswer: 1,
      explanation:
        'The distributional hypothesis (Firth, 1957; Harris, 1954) states that words in similar contexts have similar meanings. Skip-Gram operationalises this: it trains a model to predict which words tend to co-occur within a window of k words. Words that appear in similar contexts — "king" and "queen" both appearing near "throne", "crown", "reign" — end up with similar embedding vectors. The famous analogy king − man + woman ≈ queen emerges because these regularities are captured in the vector space.',
      hints: [
        '"You shall know a word by the company it keeps" (Firth, 1957) — this is the core idea Skip-Gram exploits.',
        'If "doctor" and "physician" appear near the same context words (patient, hospital, treatment), what should their vectors look like?',
      ],
    },
    {
      id: "q-nlp-kp10-3",
      type: "true-false",
      difficulty: "easy",
      question:
        'A BiLSTM processes the input once left-to-right; "bidirectional" means it additionally includes the reverse input sequence as a separate feature concatenated at the start.',
      correctAnswer: "false",
      explanation:
        "A BiLSTM runs two separate LSTMs: one forward (left-to-right) and one backward (right-to-left). At each position t, the forward LSTM has seen w_1...w_t and the backward LSTM has seen w_n...w_t. Their hidden states are concatenated: h_t = [→h_t; ←h_t]. This gives every token access to full left and right context without reordering the input. It is not a single reversed concatenation — it is two independent passes over the sequence.",
      hints: [
        '"Bi" = two passes. The forward pass processes left to right; the backward pass processes right to left. Both run independently and their states are concatenated.',
        'For NER, the word "Washington" in "George Washington" benefits from the right context (a person context); in "Washington, D.C." it benefits from the right context (location). BiLSTM captures both.',
      ],
    },
  ],

  // ── nlp-kp-11: Extractive Question Answering ──────────────────────────────
  "question-answering": [
    {
      id: "q-nlp-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In BERT-based extractive QA on SQuAD, the model predicts a start token index and an end token index. How is this implemented architecturally?",
      options: [
        "Two separate BERT models are run — one to predict start, one to predict end",
        "Two learned weight vectors (w_start and w_end) dot-product with each token\'s final hidden state to produce start and end logit scores across all positions",
        "A pointer network sequentially selects the start token and then the end token using beam search",
        "The [CLS] embedding is decoded through an LSTM to produce start and end positions",
      ],
      correctAnswer: 1,
      explanation:
        "BERT\'s QA head adds two parameter vectors w_start ∈ R^H and w_end ∈ R^H. For each token i, the start score is s_i = w_start · h_i and end score is e_i = w_end · h_i. Softmax over all positions gives a distribution; the predicted span is [argmax(s), argmax(e)] with the constraint that end ≥ start. This is a minimal head — just 2 × H parameters — that leverages all the contextual information already encoded by BERT.",
      hints: [
        "The QA head is remarkably simple: two vectors, each dotted with every token\'s hidden state. The complexity is in BERT\'s 12 (or 24) transformer layers below.",
        "Training: maximise log P(true_start) + log P(true_end). At inference: find the span [i,j] that maximises s_i + e_j with j ≥ i.",
      ],
    },
    {
      id: "q-nlp-kp11-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'SQuAD 1.1 evaluates with Exact Match (EM) and token-level F1. A model predicts "the Amazon River" but the gold answer is "the Amazon". What are EM and F1 for this prediction?',
      options: [
        "EM = 1, F1 = 1 — the model got the key entity correct",
        "EM = 0, F1 = 2/3 — EM requires exact string match; F1 gives partial credit for overlapping tokens",
        "EM = 0, F1 = 0 — any word mismatch scores zero on both metrics",
        "EM = 0.5, F1 = 0.5 — both metrics give half credit for a superset answer",
      ],
      correctAnswer: 1,
      explanation:
        'EM is binary: the normalised prediction must exactly match the normalised gold answer. "the Amazon River" ≠ "the Amazon", so EM = 0. F1 computes token overlap: predicted = {the, Amazon, River}, gold = {the, Amazon}. Precision = 2/3, Recall = 2/2 = 1, F1 = 2×(2/3×1)/(2/3+1) = 4/5 = 0.8. (Exact value depends on normalisation.) The point is that F1 gives partial credit for near-correct spans, making it a softer and often more informative metric.',
      hints: [
        "EM = 1 only if every character matches after normalisation (lowercasing, removing articles/punctuation). Even one extra word = EM 0.",
        "F1 = 2×P×R/(P+R) over token sets. Tokens in both prediction and gold are true positives.",
      ],
    },
    {
      id: "q-nlp-kp11-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "SQuAD 2.0 adds unanswerable questions to SQuAD 1.1. A model trained only on SQuAD 1.1 would fail catastrophically on SQuAD 2.0 because it always predicts a span.",
      correctAnswer: "true",
      explanation:
        'SQuAD 1.1 always has an answer in the passage, so models are trained to always output a span. On SQuAD 2.0\'s ~50% unanswerable questions, such a model always predicts something — a guaranteed error for unanswerable examples. SQuAD 2.0 models must learn to abstain: predict a null span when the passage does not contain the answer. This requires an additional "has-answer" binary classification head or comparing the span score to a learned no-answer threshold.',
      hints: [
        "A SQuAD 1.1 model is forced to output a span. What is its score on an unanswerable question where any span is wrong?",
        'SQuAD 2.0 tests "knowing what you don\'t know" — a key capability for reliable QA systems.',
      ],
    },
  ],

  // ── nlp-kp-12: Text Generation & Decoding Strategies ─────────────────────
  "text-generation": [
    {
      id: "q-nlp-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Applying temperature T = 0.5 vs T = 2.0 to a language model\'s logits before softmax — what is the effect on the output distribution?",
      options: [
        "T = 0.5 flattens the distribution (more uniform); T = 2.0 sharpens it (more peaked)",
        "T = 0.5 sharpens the distribution (more deterministic); T = 2.0 flattens it (more random)",
        "Both temperatures produce the same distribution after softmax normalisation",
        "T = 0.5 increases diversity; T = 2.0 always produces the greedy argmax token",
      ],
      correctAnswer: 1,
      explanation:
        "Temperature scales logits before softmax: softmax(z/T). For T < 1 (e.g., 0.5), dividing by a number < 1 amplifies differences between logits, making the distribution more peaked (the highest-probability token dominates). For T > 1 (e.g., 2.0), differences are compressed, making the distribution flatter and more uniform (more diverse/random outputs). T → 0 approaches greedy decoding; T → ∞ approaches uniform random sampling.",
      hints: [
        "Logits [3, 1, -1]. With T=0.5: [6, 2, -2] — the gap between 3 and 1 doubles. With T=2: [1.5, 0.5, -0.5] — the gap halves. How does this affect softmax outputs?",
        'T=1 leaves the distribution unchanged. T<1 is "colder" (more confident); T>1 is "hotter" (more uncertain/random).',
      ],
    },
    {
      id: "q-nlp-kp12-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Nucleus (top-p) sampling with p = 0.9 dynamically varies the candidate set size. Why is this more robust than top-k sampling with k = 50?",
      options: [
        "Top-p is faster because it sorts fewer tokens per step",
        "Top-k always samples from exactly k tokens regardless of distribution shape; top-p adapts — when confident it samples from few tokens, when uncertain from many, better matching the model\'s actual confidence",
        "Top-p prevents repetition by excluding recently generated tokens from the nucleus",
        "Top-k produces grammatically incorrect sentences because it ignores probability values",
      ],
      correctAnswer: 1,
      explanation:
        'When the model is very confident (e.g., 95% probability on "the"), top-k=50 still samples from 50 tokens including many implausible ones. When the model is uncertain (probability spread across hundreds of tokens), top-k=50 arbitrarily cuts off reasonable continuations. Top-p adapts: for a high-confidence step, p=0.9 might include only 2–3 tokens; for an uncertain step, it might include 100+. This matches the candidate set to the model\'s actual belief about what is reasonable.',
      hints: [
        "Imagine next-token probabilities: [0.9, 0.05, 0.02, ...]. Top-k=50 samples from tokens ranked 1–50; top-p=0.9 samples from just [token 1] since it already covers 90%.",
        "Conversely, if probabilities are [0.01, 0.009, 0.008, ...] (very flat), top-p=0.9 includes 90+ tokens while top-k=50 arbitrarily stops at 50.",
      ],
    },
    {
      id: "q-nlp-kp12-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Beam search with large beam width guarantees higher-quality text than sampling because it finds higher-probability sequences, and higher probability always implies higher human-perceived quality.",
      correctAnswer: "false",
      explanation:
        'This conflates probability with quality. Beam search finds the highest-probability sequence under the LM, but high-probability sequences are often generic, repetitive, and boring — a known failure mode called "degenerate text." Research (Holtzman et al., 2020 — The Curious Case of Neural Text Degeneration) showed that high-probability text has unexpectedly low quality. Sampling methods like nucleus sampling produce more diverse, human-like text despite having lower absolute probability, because human text itself is not always the most probable continuation.',
      hints: [
        "Humans write surprisingly low-probability text — we do not always choose the most predictable word. What does that imply about maximising probability for generation?",
        "Beam search failure mode: \"I don\'t know. I don\'t know. I don\'t know.\" — highly probable but useless.",
      ],
    },
  ],

  // ── nlp-kp-13: Summarization ──────────────────────────────────────────────
  summarization: [
    {
      id: "q-nlp-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "BART (Lewis et al., 2020) is pretrained by corrupting text and training the model to reconstruct it. For abstractive summarisation, BART is fine-tuned to map full articles to gold summaries. Why does this pretraining-then-fine-tuning approach work well for summarisation?",
      options: [
        "BART\'s corruption pretraining is equivalent to extracting key sentences, directly matching the summarisation task",
        "BART pretraining teaches both encoding (corrupted input) and decoding (reconstruction), giving the fine-tuned model strong text understanding and generation capabilities",
        "BART is pretrained on summary-article pairs from news sites, directly learning to summarise",
        "Reconstruction pretraining ensures BART always produces shorter outputs than its inputs",
      ],
      correctAnswer: 1,
      explanation:
        "BART is an encoder-decoder transformer. Pretraining on document corruption (token masking, deletion, permutation, text infilling) trains the encoder to understand degraded text and the decoder to generate fluent reconstructions. This directly develops both reading comprehension (encoder) and language generation (decoder) — the two capabilities needed for abstractive summarisation. Fine-tuning on (article, summary) pairs then specialises these capabilities to the summarisation task.",
      hints: [
        "Summarisation requires: (1) understanding the full article and (2) generating a fluent, shorter description. BART\'s pretraining develops exactly these two skills.",
        "Compare to BERT (encoder only, good at understanding) and GPT (decoder only, good at generation). BART combines both.",
      ],
    },
    {
      id: "q-nlp-kp13-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What metric does SQuAD 1.1 use to evaluate model performance?",
      options: [
        "BLEU score averaged over all questions",
        "Exact Match (EM) and Token-level F1 score",
        "ROUGE-L recall over reference answers",
        "Mean Reciprocal Rank (MRR) of the correct answer",
      ],
      correctAnswer: 1,
      explanation:
        "SQuAD uses Exact Match (the predicted span exactly equals the gold answer after normalisation) and token-level F1 (overlap between predicted and gold token sets), both averaged over all questions.",
      hints: [
        "Why would you need two metrics? Think about cases where the prediction partially overlaps with the gold answer.",
        "EM is a strict metric; F1 gives partial credit — which is more lenient?",
      ],
    },
    {
      id: "q-nlp-kp13-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "SQuAD 2.0 extends SQuAD 1.1 by adding questions that have no answer in the provided passage, requiring models to abstain.",
      correctAnswer: "true",
      explanation:
        "SQuAD 2.0 includes ~50% unanswerable questions, forcing models to decide both whether an answer exists and where it is, making the task significantly harder.",
      hints: [
        "A model that always predicts a span would struggle when no span is correct — what capability does SQuAD 2.0 test?",
        "Think about the real-world scenario where a user asks a question that a document cannot answer.",
      ],
    },
  ],

  // ── nlp-kp-14: Machine Translation ───────────────────────────────────────
  "machine-translation": [
    {
      id: "q-nlp-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Compute the BLEU-1 (unigram) precision for the hypothesis "the the the the" against the reference "the cat sat on the mat." The hypothesis has 4 tokens, all "the".',
      options: [
        '4/4 = 1.0 — all four "the" tokens appear in the reference',
        '2/4 = 0.5 — BLEU clips the count of each word to its max reference count (reference has 2 "the"s); modified precision = 2/4',
        '0/4 = 0 — "the" is a stop word and is excluded from BLEU computation',
        "1/6 ≈ 0.17 — BLEU divides by the reference length, not hypothesis length",
      ],
      correctAnswer: 1,
      explanation:
        'Standard BLEU uses "modified precision" (Papineni et al., 2002) to prevent this exact degenerate case. For each word, the count in the hypothesis is clipped to its maximum count in any reference. The reference has "the" twice, so the clip is 2. Modified precision = 2/4 = 0.5. Without clipping, a pathological hypothesis of all stop words would score 1.0, so the clip is essential for BLEU to be a meaningful metric.',
      hints: [
        "Naïve precision = (words in hyp that appear in ref) / (hyp length) = 4/4 = 1.0. But BLEU adds a clip to prevent this gaming.",
        'Clip rule: count(w in hypothesis) is capped at max_{ref} count(w in reference). "the" appears twice in the reference, so clip at 2.',
      ],
    },
    {
      id: "q-nlp-kp14-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "BLEU has a brevity penalty (BP = exp(1 - r/c) for c < r, else 1). A hypothesis of length c = 5 is compared to a reference of length r = 10. What is the brevity penalty?",
      options: [
        "BP = 1.0 — the hypothesis is shorter so no penalty applies",
        "BP = exp(1 - 10/5) = exp(-1) ≈ 0.368",
        "BP = exp(1 - 5/10) = exp(-0.5) ≈ 0.607",
        "BP = 5/10 = 0.5",
      ],
      correctAnswer: 1,
      explanation:
        "When the hypothesis is shorter than the reference (c < r), BP = exp(1 - r/c). Here r=10, c=5: BP = exp(1 - 10/5) = exp(-1) ≈ 0.368. This heavily penalises very short translations. The brevity penalty compensates for the fact that short hypotheses trivially achieve high n-gram precision by saying very little — a 1-token hypothesis matching 1 reference word has precision 1.0 but is clearly inadequate.",
      hints: [
        "The formula is BP = exp(1 - r/c). With c=5, r=10: 1 - 10/5 = 1 - 2 = -1. exp(-1) ≈ 0.37.",
        "Brevity penalty punishes translations that are too short. A 1-token hypothesis has BP ≈ exp(1-r) which is tiny for large r.",
      ],
    },
    {
      id: "q-nlp-kp14-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Higher BLEU scores correlate well with human translation quality judgements at the sentence level, making BLEU a reliable metric for evaluating individual translations.",
      correctAnswer: "false",
      explanation:
        "BLEU does not capture meaning — two sentences with the same words in different orders may score differently.",
      hints: [
        "BLEU does not capture meaning — two sentences with the same words in different orders may score differently.",
        "What aspects of translation quality does n-gram overlap fail to capture?",
      ],
    },
  ],

  // ── nlp-kp-15: Coreference Resolution ────────────────────────────────────
  "coreference-resolution": [
    {
      id: "q-nlp-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'In the text "The trophy did not fit in the suitcase because it was too big", what is coreference resolution trying to determine?',
      options: [
        'Whether "trophy" and "suitcase" are synonyms in this context',
        'Whether "it" refers to "the trophy" or "the suitcase" — linking the pronoun to its antecedent',
        'What the phrase "too big" modifies: the trophy or the suitcase',
      ],
      correctAnswer: 1,
      explanation:
        'This is the Winograd Schema (Levesque, 2012) example. Resolving "it" requires real-world knowledge: trophies and suitcases do not fit when the thing being placed is too big, so "it" → "trophy." Simple syntactic rules cannot resolve this — it requires pragmatic reasoning. Coreference resolution clusters all mentions referring to the same entity: {trophy, it} in this case. The Winograd Schema Challenge tests this capability directly.',
      hints: [
        'Ask yourself: what was "too big" — the trophy (which wouldn\'t fit inside) or the suitcase (too big to store)? Which interpretation makes physical sense?',
        "Coreference clusters are sets of noun phrases/pronouns all referring to the same entity.",
      ],
    },
    {
      id: "q-nlp-kp15-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The standard CoNLL-2012 coreference metric is the average F1 of MUC, B-cubed, and CEAFe. Why use three metrics instead of one?",
      options: [
        "Each metric evaluates a different language — MUC for English, B-cubed for German, CEAFe for Chinese",
        "Each metric has a different weakness: MUC undercounts singletons; B-cubed favours many small clusters; CEAFe uses entity-level alignment. Their average is more robust.",
        "Three metrics are required by the CoNLL shared task rules, with no technical justification",
        "The three metrics evaluate precision, recall, and F1 separately",
      ],
      correctAnswer: 1,
      explanation:
        "MUC (Vilain et al., 1995) counts link-level recall/precision but ignores singleton entities. B-cubed (Bagga & Baldwin, 1998) uses mention-level averaging and handles singletons but can be gamed with many small clusters. CEAFe aligns predicted and gold clusters globally. No single metric captures all aspects of cluster quality, so the CoNLL-2012 shared task (Pradhan et al., 2012) adopted their unweighted average as the standard evaluation.",
      hints: [
        "Each metric scores something slightly different. MUC = link quality. B-cubed = mention coverage. CEAFe = cluster alignment. Why might a model that scores well on one metric score poorly on another?",
        "A model that puts every mention in its own singleton cluster would score high on some aspects of B-cubed. Why would MUC catch this?",
      ],
    },
    {
      id: "q-nlp-kp15-3",
      type: "true-false",
      difficulty: "easy",
      question:
        'Coreference resolution only handles pronoun-antecedent pairs (e.g., "he" → "John") and does not apply to definite noun phrase references (e.g., "the researcher" → "Dr. Smith").',
      correctAnswer: "false",
      explanation:
        "Coreference resolution covers all referring expression types: pronouns (he, she, it), proper names (Barack Obama, the President), definite descriptions (the scientist, the company), demonstratives (this approach, those findings), and zero pronouns in pro-drop languages. The full task clusters all mentions of the same entity regardless of their syntactic form. Entity linking (connecting mentions to knowledge base entries) is a related but distinct task.",
      hints: [
        'In a long news article, "Apple", "the company", "the Cupertino giant", and "it" might all refer to the same entity. Only pronouns are a subset of the full coreference task.',
        'The difficulty varies: "she" in a single-referent context is easy; "the organisation" when multiple organisations are mentioned is hard.',
      ],
    },
  ],

  // ── nlp-kp-16: Dependency & Constituency Parsing ─────────────────────────
  "dependency-parsing": [
    {
      id: "q-nlp-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'For the sentence "The cat chased the mouse", a dependency parse produces directed arcs. What is the head of "cat" and what is the dependency relation?',
      options: [
        '"chased" is the head of "cat" with relation nsubj (nominal subject)',
        '"The" is the head of "cat" with relation det (determiner)',
        '"cat" is the root of the tree and has no head',
        '"mouse" is the head of "cat" with relation obj (direct object)',
      ],
      correctAnswer: 0,
      explanation:
        'In universal dependency grammar, the verb "chased" is the root of the sentence. Nouns take the verb as their head: "cat" is the nsubj (nominal subject) of "chased", and "mouse" is the obj (direct object). "The" depends on "cat" with relation det, and "the" before mouse depends on "mouse" with det. A dependency tree has exactly one root, and every other word has exactly one head.',
      hints: [
        "In a dependency tree, the verb is typically the root. Subject and object are children of the verb.",
        'The arc direction: head → dependent. nsubj means "nominal subject of". What is the subject of "chased"?',
      ],
    },
    {
      id: "q-nlp-kp16-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Modern neural dependency parsers like those of Chen & Manning (2014) use a transition-based approach. What is the key advantage of transition-based over graph-based parsing?",
      options: [
        "Transition-based parsers guarantee finding the globally optimal dependency tree",
        "Transition-based parsing runs in O(n) time (linear in sentence length) after precomputing features, enabling fast greedy decoding",
        "Transition-based parsers do not require a training corpus with annotated dependency trees",
        "Transition-based parsing handles non-projective dependencies better than graph-based methods",
      ],
      correctAnswer: 1,
      explanation:
        "Transition-based parsers build the dependency tree through a sequence of local decisions (SHIFT, REDUCE, LEFT-ARC, RIGHT-ARC) over a stack and buffer. With a neural scorer, each decision is O(1), so the full parse is O(n). Graph-based methods (like Eisner\'s algorithm) compute scores for all O(n²) possible arcs and find the maximum spanning tree in O(n³) — much slower. The trade-off is that transition-based parsers can make locally greedy errors that propagate.",
      hints: [
        "O(n) vs O(n³): for a 50-word sentence, that is 50 steps vs 125,000. At deployment speed matters.",
        "The greedy nature of transition-based parsing means it picks the best action at each step. Can a locally best decision lead to a globally suboptimal tree?",
      ],
    },
    {
      id: "q-nlp-kp16-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In a projective dependency tree, no two dependency arcs can cross when the sentence is drawn with words in linear order on a line and arcs drawn above.",
      correctAnswer: "true",
      explanation:
        "A projective dependency tree is one where for every arc (head → dependent), all words between head and dependent also have head as an ancestor — equivalently, no arcs cross when drawn on a line. Most English sentences are projective. Non-projective dependencies (crossing arcs) occur in languages with freer word order (German, Czech, Dutch) and require algorithms beyond Eisner\'s O(n³) projective parser, such as maximum spanning tree algorithms.",
      hints: [
        'Draw "The cat chased the mouse" and its dependency arcs above the words. Do any arcs cross? Now imagine a scrambled German sentence — crossing arcs become necessary.',
        "Projectivity is a property of the tree relative to the linear word order. English is mostly projective; this makes Eisner\'s efficient algorithm applicable.",
      ],
    },
  ],

  // ── nlp-kp-17: Topic Modeling ─────────────────────────────────────────────
  "topic-modeling": [
    {
      id: "q-nlp-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "LDA (Latent Dirichlet Allocation, Blei et al. 2003) is a generative model. In the generative story, how is each word in a document produced?",
      options: [
        "Each word is sampled from the document\'s most probable topic",
        "A topic z is sampled from the document\'s topic distribution θ_d, then a word is sampled from that topic\'s word distribution φ_z",
        "Words are sorted by TF-IDF and assigned to topics in order of frequency",
        "Each document is first clustered into one topic, then all words are sampled from that single topic\'s distribution",
      ],
      correctAnswer: 1,
      explanation:
        "LDA\'s generative process: (1) Draw θ_d ~ Dirichlet(α) — the document\'s topic mixture. (2) For each word position: draw topic z ~ Categorical(θ_d), then draw word w ~ Categorical(φ_z). This means different words in the same document can be generated from different topics, naturally modelling a news article that is 60% politics, 40% economics. Inference (Gibbs sampling or variational EM) inverts this generative model to recover θ_d and φ_z from observed words.",
      hints: [
        'Each word independently samples a topic from the document\'s mixture, then the word is drawn from that topic. A 50% politics document samples "election" from the politics topic and "GDP" from the economics topic.',
        "The Dirichlet prior on θ_d encourages sparse mixtures — most documents are dominated by 1–3 topics out of K.",
      ],
    },
    {
      id: "q-nlp-kp17-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "BERTopic clusters documents using dense BERT embeddings and then uses c-TF-IDF to extract topic keywords. How does this differ from LDA\'s bag-of-words assumption?",
      options: [
        "BERTopic uses count vectors like LDA but replaces Gibbs sampling with k-means clustering",
        "BERTopic encodes documents using contextual embeddings that capture semantic meaning beyond word overlap, enabling semantically similar documents without shared vocabulary to cluster together",
        "BERTopic requires labelled topic categories while LDA is fully unsupervised",
        "BERTopic uses character n-grams while LDA uses word unigrams",
      ],
      correctAnswer: 1,
      explanation:
        'LDA represents documents as bag-of-words count vectors — "automobile" and "car" appear as different features with no shared information. BERTopic embeddings place "The car broke down" and "The automobile malfunctioned" near each other in semantic space. HDBSCAN clustering then groups semantically similar documents regardless of surface word overlap. c-TF-IDF (class-based TF-IDF) then extracts the most representative keywords for each cluster, interpreting the topics.',
      hints: [
        'If "automobile" and "car" mean the same thing but never co-occur in the same documents, LDA treats them as unrelated. What does BERT do differently?',
        'c-TF-IDF = "class-based TF-IDF": treat all documents in a cluster as one mega-document and find the words most distinctive to that cluster vs. all others.',
      ],
    },
    {
      id: "q-nlp-kp17-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Choosing the number of topics K in LDA is straightforward because perplexity on a held-out set always decreases monotonically as K increases, providing a clear stopping criterion.",
      correctAnswer: "false",
      explanation:
        "Perplexity on held-out data does not provide a clear knee for LDA — it tends to keep decreasing (or plateauing) as K increases because more topics = more expressive model. The number of topics is typically chosen using human coherence judgements, automated coherence metrics (NPMI, C_v), or domain knowledge. This is a well-known challenge in topic modelling: the model selection problem has no single principled automatic solution.",
      hints: [
        "Perplexity measures how well the model predicts held-out words. More topics = more flexibility = lower perplexity. Does this give a natural stopping point?",
        'Human coherence: "bank, money, loan, interest" is a coherent topic. "bank, river, fly, cloud" is not. Automated coherence metrics try to capture this distinction.',
      ],
    },
  ],

  // ── nlp-kp-18: Sentence Embeddings & SBERT ────────────────────────────────
  "sentence-embeddings": [
    {
      id: "q-nlp-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "To find the most similar sentence to a query among 10 million candidate sentences using vanilla BERT (cross-encoder), how many inference calls are needed? How does SBERT change this?",
      options: [
        "BERT: 10 million calls; SBERT: 10 million calls (same computational cost)",
        "BERT: 10 million pairwise calls (query+candidate fed together); SBERT: 10 million + 1 calls to encode all candidates once, then cosine similarity is O(1) per query",
        "BERT: 1 call using the [CLS] embedding directly; SBERT: 10 million calls",
        "BERT: log(10 million) calls using binary search on sorted embeddings; SBERT: 1 call",
      ],
      correctAnswer: 1,
      explanation:
        "BERT cross-encoder requires feeding (query, candidate) pairs together through all 12 layers. For 10M candidates that is 10M full BERT forward passes per query — infeasible for real-time search. SBERT (Reimers & Gurevych, 2019) uses a siamese network to encode each sentence independently into a fixed-size embedding. The 10M candidates can be encoded offline and stored. At query time: 1 BERT forward pass for the query + dot-product/cosine similarity against 10M pre-encoded vectors using approximate nearest-neighbour search (FAISS).",
      hints: [
        "Cross-encoder: processes both sentences together through all layers. O(N) full forward passes for N candidates.",
        "Bi-encoder (SBERT): encode each sentence independently. Similarity = cosine(embed_query, embed_candidate). Pre-compute all candidate embeddings offline.",
      ],
    },
    {
      id: "q-nlp-kp18-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SBERT fine-tunes on NLI data with a softmax classification loss using the concatenation [u; v; |u-v|] as input to the classifier. Why include the element-wise absolute difference |u-v|?",
      options: [
        "To reduce the dimensionality of the representation from 3d to d",
        "To provide an explicit interaction feature: |u-v| is small when embeddings are similar and large when they differ, giving the classifier direct access to the dissimilarity signal",
        "To prevent the model from learning the trivial solution where all embeddings collapse to zero",
        "To normalise the embeddings to unit length before the classification layer",
      ],
      correctAnswer: 1,
      explanation:
        "The concatenation [u; v; |u-v|] is inspired by textual entailment models. u and v alone would allow the classifier to exploit dataset biases. |u-v| provides an explicit feature capturing how much the two embeddings differ, dimension by dimension. Entailed pairs have small |u-v| (similar topics, similar embeddings); contradictions have large |u-v| in specific dimensions (opposite semantic content). This explicit dissimilarity feature consistently improves classification accuracy on NLI tasks.",
      hints: [
        "|u-v| = 0 when u = v (identical embeddings); large when u and v are far apart. How does this help distinguish entailment from contradiction?",
        "The full feature vector is 3d-dimensional: d for u, d for v, d for their element-wise difference. Why not just use the difference u-v (signed)?",
      ],
    },
    {
      id: "q-nlp-kp18-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Mean pooling of all token embeddings from BERT\'s final layer tends to outperform using only the [CLS] embedding for sentence similarity tasks when BERT has not been fine-tuned for that task.",
      correctAnswer: "true",
      explanation:
        "The [CLS] token is only optimised for sentence-level representations during fine-tuning. For a pretrained-only BERT, [CLS] embedding quality for sentence similarity is poor — it has not been directly trained to aggregate sentence meaning. Mean pooling averages all non-[PAD] token embeddings, spreading the representation burden across all tokens. Empirically, mean pooling consistently outperforms [CLS] and max pooling on STS benchmarks when using pretrained (not fine-tuned) BERT.",
      hints: [
        "[CLS] is designed for classification with a fine-tuned head. Without fine-tuning, it is essentially a random-ish position in the embedding space.",
        "Averaging 128 token embeddings vs. using 1 special token: which is more robust to individual noisy embeddings?",
      ],
    },
  ],

  // ── nlp-kp-19: Cross-Lingual Transfer & mBERT ────────────────────────────
  "cross-lingual": [
    {
      id: "q-nlp-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "mBERT is pretrained on Wikipedia in 104 languages with a shared vocabulary but without any parallel data or cross-lingual objective. How does zero-shot cross-lingual transfer still emerge?",
      options: [
        "mBERT implicitly learns translation tables by comparing Wikipedia articles on the same topic across languages",
        "Shared subword vocabulary pieces and structural similarities (syntax, word order) across languages cause representations to align across languages without explicit alignment training",
        "mBERT uses language-specific embedding layers that are swapped at inference time based on a language detector",
        "Zero-shot transfer only works because all 104 languages share Latin script, making character-level features transferable",
      ],
      correctAnswer: 1,
      explanation:
        "Pires et al. (2019) showed that mBERT learns cross-lingual representations despite no parallel data. The mechanism: (1) many languages share subwords (especially multilingual Wikipedia), (2) structural typological similarities (SVO word order, agreement) create shared syntactic patterns, and (3) the multilingual MLM objective forces the model to develop language-neutral representations of concepts. XLM-R (Conneau et al., 2020) showed that more data (CommonCrawl) dramatically improves this cross-lingual alignment.",
      hints: [
        '"President", "Président", "Präsident", "Presidente" share a subword prefix. How might this shared vocabulary encourage shared representations?',
        "English and Spanish both have SVO word order and NP structure. A model learning both simultaneously may learn structure-independent representations.",
      ],
    },
    {
      id: "q-nlp-kp19-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'XLM-R improves over mBERT by training on 2.5 TB of CommonCrawl data versus mBERT\'s Wikipedia. What is the "curse of multilinguality" and how does XLM-R address it?',
      options: [
        "The curse of multilinguality refers to overfitting to high-resource languages; XLM-R uses language-specific dropout to equalise gradients",
        "Adding more languages to a fixed-capacity model dilutes per-language capacity; XLM-R mitigates this by using a larger model (XLM-R Large: 560M params) and α-sampled data that upweights low-resource languages",
        "The curse refers to the difficulty of learning word order across different language families; XLM-R uses relative positional encodings",
        "The curse is that multilingual models cannot distinguish code-switched text; XLM-R adds language identity tokens to each sentence",
      ],
      correctAnswer: 1,
      explanation:
        "The curse of multilinguality (Conneau et al., 2020): with a fixed model size, adding more languages reduces capacity per language, hurting high-resource language performance. XLM-R addresses this with: (1) a larger model (125M or 560M parameters), (2) α-sampling that exponentially upweights low-resource languages (sampling probability ∝ count^α, α < 1), and (3) much more data. Despite the curse, XLM-R outperforms per-language BERT models for most low-resource languages because the multilingual representations generalise better.",
      hints: [
        "Imagine sharing 125M parameters among 100 languages vs. 1 language. Each language gets ~1/100 the capacity. How does a bigger model help?",
        "α-sampling: low-resource languages have few documents but get upsampled. This balances the distribution so the model does not just optimise for English.",
      ],
    },
    {
      id: "q-nlp-kp19-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Zero-shot cross-lingual transfer means: fine-tune on English-labelled NLP data, then evaluate on the same task in the target language — with zero target-language labelled examples used during fine-tuning.",
      correctAnswer: "true",
      explanation:
        "Zero-shot cross-lingual transfer (Hu et al., 2020 — XTREME benchmark) evaluates: train on English CoNLL NER → evaluate on Arabic/Hindi/Swahili NER with no Arabic/Hindi/Swahili labels. The model must leverage its multilingual representations to transfer syntactic and semantic knowledge. Performance degrades gracefully with linguistic distance from English. Few-shot transfer (adding 10–100 target-language examples) dramatically improves performance, motivating practical annotation strategies for new languages.",
      hints: [
        '"Zero-shot" = zero labelled examples in the target language during training. The model still processes target-language text at inference.',
        "XTREME and XGLUE are the standard benchmarks for this. Why would this capability matter for low-resource languages with no NLP training data?",
      ],
    },
  ],

  // ── nlp-kp-20: Dialogue Systems & Task-Oriented NLP ──────────────────────
  "dialogue-systems": [
    {
      id: "q-nlp-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What are the three core components of a typical task-oriented dialogue system pipeline?",
      options: [
        "Tokenizer, encoder, decoder",
        "Natural Language Understanding (NLU), Dialogue State Tracking (DST), and Natural Language Generation (NLG)",
        "Intent detection, named entity recognition, and coreference resolution",
        "Speech recognition, machine translation, and text-to-speech",
      ],
      correctAnswer: 1,
      explanation:
        "Task-oriented dialogue systems parse user input into intents and slots (NLU), maintain a structured belief state over the conversation (DST), decide on actions (policy), and generate responses (NLG).",
      hints: [
        "A flight booking chatbot needs to know what the user wants (intent), fill in missing details (slots), and track what has been established so far.",
        "Think about what happens between understanding the user and generating the system response.",
      ],
    },
    {
      id: "q-nlp-kp20-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'What is "slot filling" in the context of task-oriented dialogue?',
      options: [
        "Inserting template placeholders into generated responses",
        "Extracting values for predefined attributes (slots) such as destination city or departure date from user utterances",
        "Filling gaps in the dialogue history caused by missing turns",
        "Assigning a probability score to each possible system action",
      ],
      correctAnswer: 1,
      explanation:
        'Slot filling identifies and extracts task-specific attribute values (e.g., "New York" for slot DESTINATION) from the user\'s input, which are needed to fulfill the task.',
      hints: [
        "A hotel booking system needs to know check-in date, number of guests, etc. — where do these values come from?",
        'Think of a form with blank fields — "slot filling" is filling those fields from natural language.',
      ],
    },
    {
      id: "q-nlp-kp20-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Open-domain chatbots (like BlenderBot) are designed to complete specific tasks such as booking flights or making restaurant reservations.",
      correctAnswer: "false",
      explanation:
        "Open-domain chatbots aim for engaging, general conversation across any topic; task-oriented systems are purpose-built to complete specific structured tasks using domain-restricted ontologies.",
      hints: [
        "Think about the difference between chatting with a friend versus using a virtual assistant to book a table.",
        'The word "open-domain" is the key clue — what is the opposite of open-domain?',
      ],
    },
  ],

  // ── nlp-kp-21: Information Extraction & Relation Extraction ──────────────
  "information-extraction": [
    {
      id: "q-nlp-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the goal of relation extraction in NLP?",
      options: [
        "Identifying all named entities in a document",
        "Classifying the semantic relationship between two entities mentioned in text",
        "Extracting the summary of a document into structured bullet points",
        "Parsing the syntactic dependency structure of a sentence",
      ],
      correctAnswer: 1,
      explanation:
        'Relation extraction identifies and classifies relationships between entity pairs in text, e.g., determining that "Apple" and "Tim Cook" have the relation CEO_OF.',
      hints: [
        "If NER finds the entities, what is the next step to populate a knowledge graph?",
        "Think about what kind of structured fact (subject, relation, object) you want to extract.",
      ],
    },
    {
      id: "q-nlp-kp21-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: 'What is "distant supervision" for relation extraction?',
      options: [
        "Training on labelled data from a distant (foreign language) source",
        "Automatically labelling text by aligning it with a knowledge base — if two entities are related in the KB, sentences containing both are labelled with that relation",
        "Using a teacher model to supervise a smaller student model from a distance",
        "Labelling training data using heuristic rules that are far from perfect",
      ],
      correctAnswer: 1,
      explanation:
        "Distant supervision heuristically generates training data by assuming that any sentence mentioning two KB-related entities expresses that relation — enabling large-scale training without manual annotation, at the cost of noisy labels.",
      hints: [
        'If "Steve Jobs" and "Apple" are linked in a KB as FOUNDED_BY, what assumption does distant supervision make about all sentences containing both names?',
        'Imagine a KB with "Paris" → "France" and "Eiffel Tower" → "Paris." Distant supervision would label any mention of both "Paris" and "Eiffel Tower" as expressing the relation CAPITAL_OF.',
      ],
    },
    {
      id: "q-nlp-kp21-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Named Entity Recognition (NER) and relation extraction can be combined into a joint model that extracts entities and their relations simultaneously.",
      correctAnswer: "true",
      explanation:
        "Joint entity and relation extraction models (e.g., SpERT, PFN) avoid the error propagation of pipeline systems by learning to predict entity spans and relation labels jointly, often achieving better performance.",
      hints: [
        "In a pipeline, errors in NER propagate to relation extraction — how does a joint model avoid this?",
        "Think about whether a shared encoder could benefit both tasks simultaneously.",
      ],
    },
  ],

  // ── nlp-kp-22: NLP Evaluation Metrics ────────────────────────────────────
  "nlp-evaluation": [
    {
      id: "q-nlp-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does BERTScore measure for text generation evaluation?",
      options: [
        "The n-gram overlap between hypothesis and reference sentences",
        "The cosine similarity between contextual BERT embeddings of hypothesis and reference tokens",
        "The perplexity of the hypothesis under a BERT language model",
        "The token-level F1 between hypothesis and reference, ignoring word order",
      ],
      correctAnswer: 1,
      explanation:
        "BERTScore computes similarity using contextual embeddings from a pretrained BERT model, matching hypothesis tokens to the most similar reference tokens by cosine similarity, capturing semantic meaning beyond surface overlap.",
      hints: [
        "Unlike BLEU, BERTScore does not require exact word matches — what does it use instead?",
        "Contextual embeddings encode meaning — how might that help for synonymous paraphrases?",
      ],
    },
    {
      id: "q-nlp-kp22-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "ROUGE-L uses longest common subsequence (LCS). What advantage does this have over ROUGE-N (n-gram)?",
      options: [
        "LCS is always faster to compute than n-gram matching",
        "LCS captures sentence-level structure and in-sequence word order without requiring consecutive matches",
        "LCS penalises length more aggressively than n-gram ROUGE",
        "LCS can compare sentences of different languages without translation",
      ],
      correctAnswer: 1,
      explanation:
        "ROUGE-L rewards sequences of words that appear in the same order in both hypothesis and reference even if non-consecutive, capturing fluency and structure that pure n-gram overlap misses.",
      hints: [
        "If key words appear in the right order but not adjacently, would ROUGE-2 capture them?",
        "LCS finds the longest shared word sequence — does the order matter here?",
      ],
    },
    {
      id: "q-nlp-kp22-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "BLEU score can be computed without any reference translations by comparing the output directly to the source sentence.",
      correctAnswer: "false",
      explanation:
        "BLEU is a reference-based metric that requires one or more human reference translations; it measures n-gram overlap between the hypothesis and these references, not the source sentence.",
      hints: [
        "BLEU evaluates the quality of translation outputs — what does it need to compare against?",
        "Without references, how would you know if the translation is correct?",
      ],
    },
  ],

  // ── nlp-kp-23: Efficient NLP ──────────────────────────────────────────────
  "efficient-nlp": [
    {
      id: "q-nlp-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "How does DistilBERT reduce the size of BERT while retaining most of its performance?",
      options: [
        "It removes the feed-forward layers from every transformer block",
        "It uses knowledge distillation, training a smaller student model to mimic BERT\'s output distributions",
        "It quantises BERT\'s weights to 8-bit integers without any retraining",
        "It replaces multi-head attention with a single-head attention mechanism",
      ],
      correctAnswer: 1,
      explanation:
        "DistilBERT uses knowledge distillation during pretraining — the smaller student model is trained to match the soft probability outputs (and hidden states) of the full BERT teacher, resulting in ~40% fewer parameters with ~97% of BERT\'s performance.",
      hints: [
        'Knowledge distillation transfers knowledge from a large "teacher" to a smaller "student" — what signal does the student learn from?',
        "Soft probability distributions from the teacher contain more information than hard one-hot labels.",
      ],
    },
    {
      id: "q-nlp-kp23-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What key architectural innovation does ALBERT use to reduce BERT\'s parameter count?",
      options: [
        "Reducing the number of transformer layers to 4",
        "Factorizing the embedding matrix and sharing parameters across all transformer layers",
        "Replacing attention with convolutional layers in even-numbered layers",
        "Using a binary codebook to represent all hidden states",
      ],
      correctAnswer: 1,
      explanation:
        "ALBERT (A Lite BERT) uses two parameter-reduction techniques: embedding factorisation (splitting the large embedding matrix) and cross-layer parameter sharing (the same weights are used in every transformer block).",
      hints: [
        "If every layer uses the same weights, how many unique weight sets does the model need?",
        "Factorising a large matrix into two smaller ones reduces the total number of parameters — why?",
      ],
    },
    {
      id: "q-nlp-kp23-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "TinyBERT uses task-specific knowledge distillation only on the final classification layer, ignoring intermediate transformer layers.",
      correctAnswer: "false",
      explanation:
        "TinyBERT distills knowledge from all transformer layers — attention matrices, hidden states, and the final prediction layer — using a layer mapping strategy, which is why it outperforms simple output-only distillation.",
      hints: [
        "If only the final output is distilled, is the student learning the intermediate representations of the teacher?",
        "Think about what intermediate layer distillation gives the student model access to.",
      ],
    },
  ],

  // ── nlp-kp-24: Retrieval-Augmented Generation ─────────────────────────────
  "retrieval-augmented": [
    {
      id: "q-nlp-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the main motivation for Retrieval-Augmented Generation (RAG)?",
      options: [
        "To make language models smaller and faster during inference",
        "To ground generation in up-to-date or domain-specific documents, reducing hallucination",
        "To enable language models to generate images alongside text",
        "To replace fine-tuning entirely for all NLP tasks",
      ],
      correctAnswer: 1,
      explanation:
        "RAG retrieves relevant documents at inference time and conditions the generator on them, allowing the model to access current or specialised knowledge without retraining and reducing the tendency to hallucinate.",
      hints: [
        "A parametric model encodes knowledge in its weights — what happens when the world changes after training?",
        "Retrieval brings in external evidence — how might that reduce fabricated facts?",
      ],
    },
    {
      id: "q-nlp-kp24-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What metric does SQuAD 1.1 use to evaluate model performance?",
      options: [
        "BLEU score averaged over all questions",
        "Exact Match (EM) and Token-level F1 score",
        "ROUGE-L recall over reference answers",
        "Mean Reciprocal Rank (MRR) of the correct answer",
      ],
      correctAnswer: 1,
      explanation:
        "SQuAD uses Exact Match (the predicted span exactly equals the gold answer after normalisation) and token-level F1 (overlap between predicted and gold token sets), both averaged over all questions.",
      hints: [
        "Why would you need two metrics? Think about cases where the prediction partially overlaps with the gold answer.",
        "EM is a strict metric; F1 gives partial credit — which is more lenient?",
      ],
    },
    {
      id: "q-nlp-kp24-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "SQuAD 2.0 extends SQuAD 1.1 by adding questions that have no answer in the provided passage, requiring models to abstain.",
      correctAnswer: "true",
      explanation:
        "SQuAD 2.0 includes ~50% unanswerable questions, forcing models to decide both whether an answer exists and where it is, making the task significantly harder.",
      hints: [
        "A model that always predicts a span would struggle when no span is correct — what capability does SQuAD 2.0 test?",
        "Think about the real-world scenario where a user asks a question that a document cannot answer.",
      ],
    },
  ],

  // ── nlp-kp-25: Long-Context NLP & Efficient Attention ────────────────────
  "long-context-nlp": [
    {
      id: "q-nlp-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Standard self-attention has O(n²) time and memory complexity. For a document of 32,000 tokens, roughly how many attention operations are computed?",
      options: [
        "32,000 — linear in sequence length",
        "32,000 × log(32,000) ≈ 480,000 — log-linear",
        "32,000² = 1,024,000,000 ≈ 1 billion — quadratic",
        "32,000³ ≈ 3 × 10^13 — cubic",
      ],
      correctAnswer: 2,
      explanation:
        "Self-attention computes QK^T where Q, K ∈ R^{n×d}: this is an n×n matrix requiring O(n²d) operations and O(n²) memory to store the attention matrix. For n=32,000: 32,000² = 1.024 × 10^9 attention scores per layer. At 12 layers, 12 heads: ~12 billion attention values. This is why vanilla transformers are limited to 512–2048 token contexts and efficient attention variants (FlashAttention, Longformer, Mamba) are critical for long-document tasks.",
      hints: [
        "Every token attends to every other token: n × n pairs. For n=32K: 32,000 × 32,000 = 1,024,000,000.",
        "Storing a 32K×32K float16 attention matrix: 32,000² × 2 bytes ≈ 2GB per head per layer. How many heads and layers does a typical transformer have?",
      ],
    },
    {
      id: "q-nlp-kp25-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Longformer uses sliding-window attention of width w for most tokens, plus global attention for a few special tokens. A 4,096-token document with w=512 uses global attention only on [CLS]. What is the approximate complexity?",
      options: [
        "Still O(n²) because the global token attends to all n tokens",
        "O(n × w) for sliding-window plus O(n × g) for global tokens where g << n — effectively O(n) for small w and g",
        "O(n × w²) because each window computes internal attention quadratically",
        "O(n log n) due to the hierarchical structure of the window attention",
      ],
      correctAnswer: 1,
      explanation:
        "Longformer\'s sliding-window attention: each of the n tokens attends to its w/2 neighbours on each side → O(n×w) total. Global attention on g special tokens (typically 1–64): each global token attends to all n tokens and all tokens attend back to each global token → O(n×g). Total: O(n×(w+g)). For n=4096, w=512, g=1: ~4096×513 ≈ 2.1M operations vs. 4096² = 16.8M for full attention — a ~8× reduction. This scales linearly with n for fixed w.",
      hints: [
        "Sliding window: token i attends to tokens [i-w/2, i+w/2]. Cost per token: w. Total: n×w.",
        "Global token: attends to all n tokens (and they attend back). Cost: 2×n×g. For g=1: just 2n additional operations.",
      ],
    },
    {
      id: "q-nlp-kp25-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "FlashAttention (Dao et al., 2022) reduces the theoretical FLOP count of attention from O(n²) to O(n log n) by using a divide-and-conquer algorithm.",
      correctAnswer: "false",
      explanation:
        "FlashAttention performs the same O(n²d) floating-point operations as standard attention — it does not reduce FLOPs. Its speedup comes from IO-awareness: instead of materialising the full n×n attention matrix in GPU high-bandwidth memory (HBM), it tiles the computation in fast SRAM, avoiding the O(n²) HBM reads/writes that are the actual bottleneck. GPU compute is usually faster than memory bandwidth. FlashAttention-2 and -3 further optimise parallelism and work partitioning for modern GPU architectures.",
      hints: [
        "GPU bottleneck: memory bandwidth (HBM reads/writes), not FLOP count. FlashAttention avoids writing the O(n²) attention matrix to HBM by computing it tile-by-tile in fast SRAM.",
        "The mathematical result is identical to standard attention. The speedup is purely from how the computation accesses memory.",
      ],
    },
  ],

  // ── nlp-kp-26: Prompt Engineering & In-Context Learning ──────────────────
  "llm-prompting": [
    {
      id: "q-nlp-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: 'What is "zero-shot prompting" for a large language model?',
      options: [
        "Prompting the model with zero tokens (empty input)",
        "Asking the model to perform a task with only a task description and no examples in the prompt",
        "Evaluating the model on tasks it was explicitly trained on",
        "Using a prompt that contains zero words from the training corpus",
      ],
      correctAnswer: 1,
      explanation:
        "Zero-shot prompting provides only a task description (and optionally an output format instruction) without any worked examples, relying on the model\'s pretrained knowledge to generalise to the task.",
      hints: [
        "Think about how a human summarises vs. how a highlighter is used.",
        "Which approach could produce grammatical errors or hallucinations more easily?",
      ],
    },
    {
      id: "q-nlp-kp26-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which finding from the GPT-3 paper showed that the order of few-shot examples in the prompt can significantly affect model performance?",
      options: [
        "Sensitivity to example ordering demonstrates that LLMs perform Bayesian updating on demonstrations",
        "Calibration experiments showed variance in accuracy up to 54% based solely on example permutation",
        "LLMs consistently perform better when examples are sorted by difficulty (easy to hard)",
        "The position of the correct-label example always dominates the prediction",
      ],
      correctAnswer: 1,
      explanation:
        'Research (Zhao et al., 2021) found that LLMs have a recency (primacy) bias in few-shot prompting: if the last example is labelled "positive", the model is disproportionately likely to predict "positive" for the test input — regardless of the test input\'s actual content. This is because the autoregressive model\'s predictions are most strongly influenced by recent context. Calibration techniques (dividing by the label\'s baseline probability) and shuffled example orderings partially mitigate this.',
      hints: [
        'If 5 of 8 few-shot examples end with "negative", will the model bias toward "negative" for the query? Zhao et al. show the answer is yes.',
        'An autoregressive model cannot "think" without generating tokens. CoT forces it to externalise intermediate reasoning so subsequent tokens can condition on correct sub-results.',
      ],
    },
    {
      id: "q-nlp-kp26-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Instruction tuning (supervised fine-tuning on instruction-response pairs) makes LLMs better at following zero-shot instructions because they learn the general pattern of responding to directives, not just memorising specific instruction-response pairs.",
      correctAnswer: "true",
      explanation:
        'Wei et al. (2022) and subsequent work show that instruction tuning generalises beyond the training tasks. A model fine-tuned on hundreds of task types (summarisation, translation, QA) becomes better at zero-shot on new task types not seen during instruction tuning. This is because it learns a general "follow the instruction" behaviour — a form of meta-learning. Jurafsky & Martin (Ch. 9) discuss this as one reason post-training is so valuable: the model learns what helpful responding looks like.',
      hints: [
        "If instruction tuning only memorised training tasks, performance on held-out tasks would be at zero-shot (untrained) levels. Generalization is the key finding.",
        "Instruction tuning datasets like FLAN cover 1836 tasks (Longpre et al., 2023). Can a model trained on these 1836 tasks truly generalise to a 1837th novel task?",
      ],
    },
  ],

  // ── nlp-kp-27: Chain-of-Thought & Reasoning in LLMs ─────────────────────
  "chain-of-thought": [
    {
      id: "q-nlp-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is Chain-of-Thought (CoT) prompting?",
      options: [
        "Chaining multiple LLMs together where each model processes the previous output",
        "Including step-by-step reasoning traces in few-shot examples to elicit similar reasoning steps from the model",
        "A training technique that rewards models for generating longer outputs",
        "Prompting the model to list all possible answers before selecting the best one",
      ],
      correctAnswer: 1,
      explanation:
        'CoT prompting augments few-shot examples with intermediate reasoning steps (e.g., "let me think step by step"), which elicits similar reasoning chains in the model\'s output and significantly improves performance on multi-step reasoning tasks.',
      hints: [
        "Think about how showing your work in mathematics helps you arrive at the correct answer.",
        "The model generates tokens autoregressively — intermediate steps become part of the context for subsequent tokens.",
      ],
    },
    {
      id: "q-nlp-kp27-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'What is "self-consistency" decoding as introduced by Wang et al. (2022) for CoT reasoning?',
      options: [
        "Generating a single chain of thought and verifying each step with a verifier model",
        "Sampling multiple diverse reasoning chains and choosing the most frequent final answer by majority vote",
        "Requiring the model to generate the same answer twice before accepting it",
        "Filtering out chains of thought that contain logical contradictions",
      ],
      correctAnswer: 1,
      explanation:
        "Self-consistency generates multiple independent CoT reasoning paths (via sampling) and marginalises over them by selecting the most common final answer, significantly boosting accuracy over single greedy decoding.",
      hints: [
        "Multiple reasoning paths may arrive at the same answer via different routes — how does this help?",
        "Think about ensemble methods — how does voting across diverse outputs help?",
      ],
    },
    {
      id: "q-nlp-kp27-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Chain-of-thought prompting was found to improve performance across all model sizes in the original Wei et al. (2022) paper, including models with fewer than 10 billion parameters.",
      correctAnswer: "false",
      explanation:
        "Wei et al. (2022) found CoT is an emergent capability: it provides negligible or even negative gains for models below ~100B parameters (approximately). For smaller models, generating intermediate steps does not help because the model lacks the capability to perform coherent multi-step reasoning. The gains are observed primarily in PaLM 540B, GPT-3 175B, and similar scale models. This makes CoT a scale-dependent technique, unlike few-shot prompting which benefits smaller models too.",
      hints: [
        '"Emergent" in ML means: absent at small scale, appearing above a threshold. CoT is cited as an emergent ability that appears suddenly above ~100B parameters.',
        "A 1B parameter model asked to reason step-by-step may generate plausible-sounding but incorrect intermediate steps. Why would this hurt rather than help?",
      ],
    },
  ],

  // ── nlp-kp-28: Tool Use & Function Calling in LLMs ───────────────────────
  "tool-use-nlp": [
    {
      id: "q-nlp-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'What is "function calling" in the context of LLM APIs (e.g., OpenAI)?',
      options: [
        "The model generates Python code that is automatically executed on a remote server",
        "The model outputs structured JSON specifying a function name and arguments, which the application then executes",
        "The model calls internal transformer sub-functions to retrieve factual information",
        "The model fine-tunes itself by calling a gradient descent function",
      ],
      correctAnswer: 1,
      explanation:
        "Function calling allows a model to signal that an external tool should be invoked. The model outputs a structured call specification (JSON) rather than a natural language answer. The application executes the function, gets the weather result, and may pass it back to the LLM as a tool result message. The LLM then generates a natural language response grounded in the actual weather data. This pattern solves the knowledge cutoff problem for dynamic data.",
      hints: [
        "The LLM does not execute code — it only decides what to call and with what parameters. The execution engine is the application.",
        'Tool use separates "what action to take" (the LLM\'s job) from "executing the action" (the application\'s job). Why is this separation important for safety?',
      ],
    },
    {
      id: "q-nlp-kp28-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the ReAct (Yao et al., 2023) framework, the LLM interleaves Thought, Action, and Observation steps. What is the key advantage over pure Chain-of-Thought reasoning?",
      options: [
        "ReAct uses shorter prompts because Observations replace the need for lengthy reasoning chains",
        "ReAct grounds reasoning in real-world observations from tool calls, preventing the model from reasoning in circles based on incorrect internal assumptions",
        "ReAct parallelises all tool calls, making it faster than sequential CoT reasoning",
        "ReAct uses a verifier model to check each Thought step before allowing an Action",
      ],
      correctAnswer: 1,
      explanation:
        'ReAct interleaves: Thought ("I need to find the capital of Germany") → Action (Search("Germany capital")) → Observation ("Berlin") → Thought ("The capital is Berlin, not Paris"). The Observation grounds subsequent reasoning in retrieved facts, preventing "hallucination spirals" where wrong premises lead to confidently wrong conclusions.',
      hints: [
        "CoT uses only the model\'s internal knowledge. ReAct augments this with external observations from tools. Which is more reliable for factual questions?",
        "The Observation step provides a factual anchor that the model must incorporate into its next Thought, reducing the chance of continuing with false premises.",
      ],
    },
    {
      id: "q-nlp-kp28-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Tool-augmented LLMs can use any tool whose interface is described in the prompt, including tools developed after the LLM\'s training cutoff, because tool use is specified via context rather than baked into model weights.",
      correctAnswer: "true",
      explanation:
        'Tools are defined via schema descriptions in the system prompt or message context at inference time. The LLM does not need to have "seen" a tool during training — it only needs to understand the API schema (name, parameters, description) well enough to call it correctly. A new API released in 2026 can be used by a model trained in 2024 simply by providing its schema in the prompt. This is analogous to how few-shot examples teach the model to use a new tool at inference time.',
      hints: [
        'The tool schema tells the model: "Here is a function called X that takes parameters Y and Z and returns R." Can the model use this without having seen function X before?',
        "Think about how you would tell a capable person how to use a new software tool: you describe what it does and how to call it. The LLM does the same from a written description.",
      ],
    },
  ],

  // ── nlp-kp-29: Hallucination Detection & Mitigation ─────────────────────
  hallucination: [
    {
      id: "q-nlp-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'An LLM confidently states "The Eiffel Tower was designed by Gustave Eiffel and completed in 1893." The actual completion year is 1889. This is an example of which hallucination type?',
      options: [
        "Fabrication: the Eiffel Tower does not exist and the LLM invented it",
        "Factual hallucination (intrinsic): the model generates a plausible-sounding but incorrect factual detail (wrong year) that contradicts verifiable ground truth",
        "Faithfulness hallucination: the model contradicts information provided in the user\'s prompt",
        "Format hallucination: the model uses the wrong output format (date instead of decade)",
      ],
      correctAnswer: 1,
      explanation:
        "Hallucination taxonomy: (1) Intrinsic hallucination — contradicts a source document or verifiable fact. (2) Extrinsic/faithfulness hallucination — contradicts information provided in the prompt/context. (3) Fabrication — generates entirely invented entities or events. Here the designer is correct but the year 1893 contradicts the verifiable ground truth (1889). Mitigation strategies include retrieval augmentation (ground answers in retrieved sources), self-consistency (cross-checking answers), and factual calibration training (RLHF with factuality reward).",
      hints: [
        "Is the LLM making up a building that doesn\'t exist (fabrication)? No. Is it contradicting something in the prompt? No. It is asserting a false fact about a real entity.",
        'The LLM is "confidently wrong" — it does not hedge with "I believe" or "approximately." This overconfidence is a key hallucination characteristic.',
      ],
    },
    {
      id: "q-nlp-kp29-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which approach most directly reduces hallucination in a production LLM system for domain-specific Q&A?",
      options: [
        "Increasing the temperature to 1.5 to explore more diverse factual answers",
        "Retrieval-Augmented Generation: grounding answers in retrieved domain documents and instructing the model to only answer from retrieved context",
        'Training the model to always add "I think" before every factual claim',
        "Using a larger model (e.g., 70B vs 7B parameters), as larger models hallucinate less",
      ],
      correctAnswer: 1,
      explanation:
        'RAG directly addresses hallucination by providing retrieved evidence and instructing the model: "Answer only based on the provided documents. If the answer is not in the documents, say so." This converts the problem from "generating plausible-sounding facts from memory" to "extracting stated facts from provided text" — a much easier task that can be verified. Larger models still hallucinate (albeit less frequently), and higher temperature increases hallucination. RAG with strict grounding instructions is the most reliable industrial approach.',
      hints: [
        "Without RAG: the model must retrieve facts from its weights — which may contain errors or outdated information.",
        "With RAG: the model reads the answer from a document. Even a small model can accurately quote a document it is given.",
      ],
    },
    {
      id: "q-nlp-kp29-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Hallucination in LLMs occurs only when the model generates text about topics not covered in its training data.",
      correctAnswer: "false",
      explanation:
        "LLMs hallucinate even about topics extensively covered in training data. The fundamental cause is not a knowledge gap but a generation process that optimises for plausibility given the context, not factual accuracy. A model may have seen correct information about Napoleon but still generate a plausible-sounding but wrong birth date — because the generation objective rewards fluent, context-consistent tokens, not fact-verified tokens. Hallucination is most severe for specific numbers, dates, citations, and names where many plausible values exist.",
      hints: [
        "Ask an LLM about a famous physicist\'s specific publication year — a heavily-trained domain. Does it never hallucinate? Test it.",
        'The LM objective is: predict the next token given context. There is no explicit "check if this is true" step. Plausibility ≠ accuracy.',
      ],
    },
  ],

  // ── nlp-kp-30: NLP Safety, Bias, & Alignment ─────────────────────────────
  "llm-safety": [
    {
      id: "q-nlp-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "RLHF (Reinforcement Learning from Human Feedback, Ouyang et al. 2022) uses a reward model trained on human preference comparisons. What does the reward model learn to score?",
      options: [
        "The grammatical correctness of model outputs on a standard grammar benchmark",
        "Human preferences: given two model responses to the same prompt, which response is more helpful, accurate, and safe — the reward model predicts the winning response",
        "The log-probability that the model\'s response appears verbatim in the pretraining corpus",
        "The toxicity level of each response using a keyword-based classifier",
      ],
      correctAnswer: 1,
      explanation:
        "The reward model (RM) is trained on comparisons: annotators see pairs of responses and choose the preferred one. The RM learns to assign higher scores to preferred responses. This scalar reward is then used to fine-tune the LLM via PPO (Proximal Policy Optimization): the LLM is updated to generate responses the RM scores highly, subject to a KL-divergence constraint preventing it from drifting too far from the original distribution. Jurafsky & Martin (Ch. 9) describe this as a key post-training step after instruction tuning.",
      hints: [
        "The RM is trained on (response_A, response_B, preferred=A) pairs. It learns a ranking function, not a classification into fixed categories.",
        "RLHF is the technique that turned GPT-3 into InstructGPT and ChatGPT. What capability did it add that standard LM pretraining could not?",
      ],
    },
    {
      id: "q-nlp-kp30-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Jurafsky & Martin (Ch. 9) describe DPO (Direct Preference Optimization, Rafailov et al. 2023) as an alternative to RLHF. What makes DPO simpler than RLHF?",
      options: [
        "DPO uses fewer training examples because it only requires one response per prompt instead of a pair",
        "DPO eliminates the separate reward model and RL training loop by directly optimising a loss that increases the relative probability of preferred responses over rejected responses",
        "DPO uses a rule-based reward function instead of human annotations, eliminating annotation costs",
        "DPO only fine-tunes the final transformer layer instead of all parameters, making it parameter-efficient",
      ],
      correctAnswer: 1,
      explanation:
        "RLHF requires three stages: (1) train reward model on preference data, (2) use RM scores as rewards in PPO, (3) update LLM. PPO is complex (requires value network, advantage estimation, clipping) and computationally expensive. DPO (Rafailov et al., 2023) derives a closed-form loss that directly maximises the log-ratio of preferred to rejected responses relative to the reference model — no RM, no RL. The loss is: L_DPO = -log σ(β·log[π(y_w|x)/π_ref(y_w|x)] - β·log[π(y_l|x)/π_ref(y_l|x)]). Empirically, DPO matches or exceeds RLHF quality.",
      hints: [
        "RLHF pipeline: data → reward model → RL fine-tuning (3 steps). DPO: data → one fine-tuning step. What is eliminated?",
        "DPO\'s key insight: the optimal RLHF policy can be expressed analytically, so we can directly optimise toward it without the RL detour.",
      ],
    },
    {
      id: "q-nlp-kp30-3",
      type: "true-false",
      difficulty: "easy",
      question:
        'Gender bias in word embeddings (e.g., "doctor" embedding being closer to "man" than "woman") is fully eliminated by the hard debiasing method of Bolukbasi et al. (2016), which projects out the gender direction.',
      correctAnswer: "false",
      explanation:
        'Bolukbasi et al. (2016) project embeddings away from the gender direction (PCA component separating male/female word sets), reducing explicit associations. But Gonen & Goldberg (2019) showed that residual bias persists: words like "nurse" and "engineer" cluster by gender stereotypes even after debiasing, because gender correlates with many other dimensions (occupation-related vocabulary, usage contexts). True debiasing would require retraining on debiased corpora or using contrastive objectives that enforce gender-neutral representations for role words.',
      hints: [
        'If "nurse" → female and "engineer" → male in training data, hundreds of co-occurrence dimensions encode this correlation — not just the gender axis.',
        "Bolukbasi removes one dimension. But bias is distributed across the full embedding space. Can removing one direction fully eliminate a multi-dimensional correlation?",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
