import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

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
        'BPE (Gage, 1994; Sennrich et al., 2016) begins with a vocabulary of individual characters plus an end-of-word marker, then greedily merges the most frequent adjacent pair at each step. After k merges, the vocabulary contains the original characters plus k learned subword units. This means common morphemes like "ing" or "un" become single tokens, while rare words are split into recognisable pieces - eliminating OOV entirely.',
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
        '"guarantee" - it can mean either legal promise or mathematical certainty',
        '"bank" - it could refer to a financial institution or the bank of a river',
        '"cover" - it can mean pay for or physically cover something',
        '"deposits" - it could be financial deposits or geological sediment deposits',
      ],
      correctAnswer: 1,
      explanation:
        'This classic example (Jurafsky & Martin) illustrates lexical ambiguity. "Bank" has multiple word senses: financial institution vs. river bank. Static embeddings (Word2Vec, GloVe) assign a single vector to "bank" that blurs these senses. Contextualised models (BERT) produce different vectors for "bank" depending on whether nearby words are financial (deposits, tuition) or geographic (river, shore), directly addressing this polysemy problem.',
      hints: [
        "Static embeddings assign one vector per word form regardless of context - what problem arises for words with two very different meanings?",
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
        "WordPiece scores each candidate merge by how much it increases the log-likelihood of the training data: score(A, B) = count(AB) / (count(A) \\times count(B)). This means a rare pair that always co-occurs (high PMI) can be preferred over a more frequent but less predictive pair, producing a vocabulary better suited to language modelling than BPE\'s raw-count criterion.",
      hints: [
        "BPE: pick the pair with the highest raw count. WordPiece: pick the pair that most improves the LM.",
        "Think pointwise mutual information - a pair that always appears together has high PMI even if neither word is common.",
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
        "Word2Vec and GloVe produce static (context-independent) word embeddings, while BERT produces contextualised embeddings. What key difference does this make for the representation of ambiguous words like \"bank\"?",
      options: [
        "Static embeddings assign a different vector to each distinct meaning of a polysemous word; contextualised embeddings assign the same vector regardless of meaning",
        "Static embeddings assign a single vector to \"bank\" that averages over all its uses; BERT produces different vectors for \"bank\" depending on whether it appears in a financial or geographic context",
        "There is no meaningful difference - both represent words as fixed-length vectors regardless of context",
        "BERT's contextualised embeddings are shorter than static embeddings because they encode less information per token",
      ],
      correctAnswer: 1,
      explanation:
        "Static embeddings (Word2Vec, GloVe) assign exactly one vector per word form, regardless of context. For a polysemous word like \"bank\", the vector is trained as an average over all occurrences in the training corpus - financial uses and geographic uses are merged into a single representation. BERT avoids this averaging problem by producing a different vector for each token occurrence, conditioned on the full left and right context through bidirectional self-attention. When BERT processes \"bank\" near financial words (deposits, tuition), the resulting vector differs from when it processes \"bank\" near geographic words (river, shore). This contextual conditioning is what allows BERT to resolve polysemy, whereas a static embedding cannot.",
      hints: [
        "Static embeddings: one vector per word form. What gets averaged together when \"bank\" is used in two completely different senses?",
        "BERT's attention heads see the full context to the left and right of each token. How does this allow \"bank\" to receive different representations in different sentences?",
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
        'The distributional hypothesis (Firth, 1957; Harris, 1954) states that words in similar contexts have similar meanings. Skip-Gram operationalises this: it trains a model to predict which words tend to co-occur within a window of k words. Words that appear in similar contexts - "king" and "queen" both appearing near "throne", "crown", "reign" - end up with similar embedding vectors. The famous analogy king − man + woman \\approx queen emerges because these regularities are captured in the vector space.',
      hints: [
        '"You shall know a word by the company it keeps" (Firth, 1957) - this is the core idea Skip-Gram exploits.',
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
        "GloVe (Global Vectors, Pennington et al. 2014) builds a global word-word co-occurrence matrix $\\mathbf{X}$ over the entire corpus first, where $X_{ij}$ counts how often word $i$ appears in the context of word $j$. It then factorises this matrix using a weighted least-squares objective:\n\\[\\mathcal{L} = \\sum_{i,j} f(X_{ij})\\bigl(\\mathbf{w}_i^\\top \\tilde{\\mathbf{w}}_j + b_i + \\tilde{b}_j - \\log X_{ij}\\bigr)^2.\\]\nThe weighting function $f(X_{ij})$ upweights mid-frequency co-occurrences and downweights very high-frequency pairs (which would otherwise dominate the loss). The word \"Global\" signals that GloVe uses corpus-wide aggregate statistics rather than local window samples like Word2Vec. Because the full co-occurrence matrix is available during training, GloVe extracts more signal from the same data than Skip-Gram's stochastic per-pair sampling, making it more data-efficient.\n\nKey contrast: Word2Vec samples individual (word, context) pairs on-the-fly; GloVe pre-counts all pairs into matrix $\\mathbf{X}$ and factorises those counts.",
      hints: [
        'The name GloVe contains the word "Global" - what does that suggest about its use of the corpus?',
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
        "Approximately 0.000031 - multiply the five bigram probabilities together",
        "Approximately 0.0019 - average the five probabilities",
        "Approximately 0.25 - only the first bigram probability matters",
        "Approximately 1.0 - it is a grammatical English sentence",
      ],
      correctAnswer: 0,
      explanation:
        "By the chain rule and the Markov (bigram) approximation, P(sentence) \\approx \\Pi P(wi|context). Here: 0.25 \\times 0.33 \\times 0.0065 \\times 0.52 \\times 0.68 \\approx 0.000019. (The exact numbers from Jurafsky & Martin Fig 3.2 give ~0.000019-0.000031 depending on rounding.) The key insight is that sentence probability is a product of conditional bigram probabilities, and the product of many small fractions rapidly becomes very small - hence the use of log space in practice.",
      hints: [
        "The chain rule: P(w1...wn) = P(w1)P(w2|w1)...P(wn|w_{n-1}) for a bigram model.",
        "Multiply: 0.25 \\times 0.33 \\times 0.0065 \\times 0.52 \\times 0.68. Note that even a very probable 5-word sentence has probability < 0.001.",
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
        "Perplexity is defined as:\n\\[\\text{Perplexity}(\\mathcal{W}) = P(w_1 \\dots w_N)^{-1/N} = \\exp\\!\\left(-\\frac{1}{N}\\sum_{t=1}^{N}\\log P(w_t | w_{<t})\\right).\\]\nPerplexity is the exponential of the average negative log probability (cross-entropy) per token. It can be interpreted as the effective vocabulary size the model is choosing from at each step — a perplexity of 109 means the model is as uncertain as if it were picking uniformly among 109 words. A trigram model conditions on two preceding words, giving it more context to make accurate predictions than a bigram (one word) or unigram (no context), which is why its perplexity 109 is lower than 170 (bigram) and 962 (unigram).\n\nThe monotonic decrease 962 \\to 170 \\to 109 (from Jurafsky & Martin, WSJ experiments) shows that more context helps, but with diminishing returns — going from unigram to bigram gives a much larger improvement than going from bigram to trigram.",
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
        "Probabilities are \\leq 1, so multiplying N of them produces a number that shrinks exponentially. For a 100-word sentence with average per-word probability 0.01, the sentence probability is 0.01^100 = 10^-200, far below the smallest float64 value (~10^-308 near the limit). Working in log space converts products to sums: log P(w1...wN) = \\Sigma log P(wi|context), which stays in a manageable numeric range. The exp is taken only at the end if raw probabilities are needed.",
      hints: [
        "float64 underflows below ~10^-308. A 100-word sentence with P\\approx0.001 per word has sentence probability 0.001^100 = 10^-300.",
        "log(a \\times b) = log(a) + log(b). Addition never underflows the way multiplication does.",
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
        'The encoder compresses the entire source into one context vector (the final hidden state). For short sentences this works; for long sentences the vector becomes a bottleneck - it cannot preserve all lexical and syntactic detail from 30+ source words. This is the "information bottleneck" problem that Bahdanau attention was designed to solve in 2015.',
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
        'Teacher forcing trains the model on a distribution that only includes perfect previous tokens. At test time, an incorrect token at step t changes the distribution of inputs at step t+1 onward - a distribution the model has never seen. This "exposure bias" can cause error cascades. Scheduled sampling (Bengio et al., 2015) and other approaches try to bridge this training/inference gap by gradually replacing gold tokens with model predictions during training.',
      hints: [
        "Exposure bias refers to what the model was exposed to during training vs. inference.",
        'If the model generates "the cat sat on the" but should have said "the dog", every subsequent word must now be conditioned on "the" - a prefix it never trained on.',
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
        "RNN encoders process tokens sequentially: h_t depends on h_{t-1}. This sequential dependency means you cannot compute h_3 until h_2 is done - the encoder phase is O(n) serial steps, not parallelisable. This is a key reason the Transformer replaced RNNs: its self-attention computes representations for all positions simultaneously in O(1) serial steps (though O(n\\^2) in compute).",
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
        "The attention weights $\\alpha_{t,s} \\in [0,1]$ sum to 1 over all source positions - they form a probability distribution over source positions. Each $\\alpha_{t,s}$ represents the fractional importance of source position $s$ when generating the target token at time $t$. For English-to-French translation, when generating the French token \"la\" (feminine article), the model assigns high $\\alpha_{t,s}$ to the English source position of \"the\" (feminine), not \"a\".\n\nThe key contrast is soft vs. hard alignment: IBM models' hard alignment assigns each target word to exactly one source word, while Bahdanau's soft alignment allows fractional weights - multiple source tokens can receive nonzero $\\alpha$ simultaneously, making the mechanism differentiable end-to-end.\n\nThe context vector at decoder step $t$ is:\n\\[\\mathbf{c}_t = \\sum_s \\alpha_{t,s} \\hat{\\mathbf{h}}_s.\\]",
      hints: [
        "The softmax normalises the raw alignment scores $e_{t,s}$ so that $\\sum_s \\alpha_{t,s} = 1$ - each $\\alpha_{t,s}$ behaves like a probability.",
        "Hard alignment (IBM Model 1-4): each target position links to exactly one source position. Soft alignment (Bahdanau): every target attends to every source with fractional weights - differentiable and end-to-end trainable.",
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
        "The naming is reversed from what the statement claims:\n\n**Bahdanau (2015)** introduced *additive/concat* attention:\n\\[e_{t,s} = \\mathbf{v}^\\top \\tanh(\\mathbf{W}_1 \\mathbf{h}_t + \\mathbf{W}_2 \\hat{\\mathbf{h}}_s)\\] \nwhich uses a small MLP (the $\\tanh$ non-linearity) to combine the decoder state $\\mathbf{h}_t$ and encoder state $\\hat{\\mathbf{h}}_s$.\n\n**Luong (2015)** introduced *multiplicative* (dot-product / bilinear) variants:\n\\[\n\\text{dot: } & \\mathbf{h}_t^\\top \\hat{\\mathbf{h}}_s, \\\\\n\\text{general: } & \\mathbf{h}_t^\\top \\mathbf{W} \\hat{\\mathbf{h}}_s, \\\\\n\\text{concat: } & \\mathbf{v}^\\top \\tanh(\\mathbf{W}[\\mathbf{h}_t; \\hat{\\mathbf{h}}_s])\n\\]\nThe dot-product form is faster because it avoids the $\\tanh$ and extra parameters. This is why the Transformer's scaled dot-product attention is sometimes called \"Luong-style\" - it uses the dot-product scoring function that Luong popularised.",
      hints: [
        "Mnemonic: **B**ahdanau = **B**efore = MLP (additive) came first (2015). **L**uong = **L**ater = dot-product (multiplicative) came second (2015).",
        "Additive: uses $\\tanh$ non-linearity and an extra learnable vector $\\mathbf{v}$. Multiplicative: uses only matrix multiplication and optionally a weight matrix $\\mathbf{W}$ - no $\\tanh$.",
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
        "To let the model jointly attend from different representation subspaces - each head can specialise in different syntactic or semantic relationships",
        "To ensure each head processes a different segment of the input sequence (heads are non-overlapping)",
        "To make the attention computation parallelisable across 8 GPU cores",
      ],
      correctAnswer: 1,
      explanation:
        "Each head $i$ learns its own projections $\\mathbf{W}_i^Q \\in \\mathbb{R}^{d_\\text{model} \\times d_k}$, $\\mathbf{W}_i^K$, $\\mathbf{W}_i^V$, producing $\\mathbf{Q}_i, \\mathbf{K}_i, \\mathbf{V}_i \\in \\mathbb{R}^{n \\times d_k}$. After computing attention for each head:\n\\[\\text{head}_i = \\text{Attention}(\\mathbf{Q}_i\\mathbf{W}_i^Q, \\mathbf{K}_i\\mathbf{W}_i^K, \\mathbf{V}_i\\mathbf{W}_i^V) \\in \\mathbb{R}^{n \\times d_k},\\]\nthe $h$ heads are concatenated and projected:\n\\[\\text{MultiHead}(\\mathbf{Q},\\mathbf{K},\\mathbf{V}) = \\text{Concat}(\\text{head}_1, \\dots, \\text{head}_h)\\mathbf{W}^O.\\]\nEmpirically, different heads specialise: one tracks subject-verb number agreement, another resolves coreferential pronouns, another attends to positional proximity. Total compute is comparable to single-head with dimension $d_\\text{model}$ because $h \\times d_k = d_\\text{model}$ - the dimension reduction exactly offsets the multiple heads.",
      hints: [
        "Each head projects into a $d_k = d_\\text{model}/h$ dimensional subspace. 8 heads $\\times$ 64 dims = 512 dims total - same total dimensionality as one 512-dim head.",
        "The key advantage is representational diversity: different heads learn different $\\mathbf{W}_i^Q, \\mathbf{W}_i^K, \\mathbf{W}_i^V$ matrices, attending to different aspects of the input simultaneously.",
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
        "The key algebraic property is that for any fixed offset $k$:\n\\[\\begin{aligned}\nPE(\\text{pos}+k, 2i) &= \\sin\\!\\left(\\frac{\\text{pos}+k}{10000^{2i/d}}\\right) \\\\\n&= \\sin\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)\\cos\\!\\left(\\frac{k}{10000^{2i/d}}\\right) + \\cos\\!\\left(\\frac{\\text{pos}}{10000^{2i/d}}\\right)\\sin\\!\\left(\\frac{k}{10000^{2i/d}}\\right) \\\\\n&= A_{ki} \\cdot PE(\\text{pos}, 2i) + B_{ki} \\cdot PE(\\text{pos}, 2i+1),\n\\end{aligned}\\]\nwhere $A_{ki}, B_{ki}$ are constants depending only on $k$ (not on $\\text{pos}$). Thus $PE(\\text{pos}+k)$ is a fixed linear transformation of $PE(\\text{pos})$ - the relative offset $k$ is encoded algebraically into the dot products between position vectors.\n\nLearned positional embeddings (BERT, GPT) have no such guarantee: position 2048 simply has no entry in the lookup table if the model was trained only up to position 1024.",
      hints: [
        "Use the angle-addition formulas: $\\sin(x+y) = \\sin x \\cos y + \\cos x \\sin y$ and $\\cos(x+y) = \\cos x \\cos y - \\sin x \\sin y$. Apply with $x = \\text{pos}/10000^{2i/d}$ and $y = k/10000^{2i/d}$.",
        "The constants $A_{ki}, B_{ki}$ depend only on the offset $k$, not on $\\text{pos}$. This means: given any two position vectors $PE(i)$ and $PE(j)$, their dot product reveals $|i-j|$ - not the absolute positions $i$ and $j$.",
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
        "**Encoder** blocks use **bidirectional** (full) self-attention: every position attends to every other position without any mask. This is why BERT, which uses only the encoder stack, can condition each token on both its left and right context simultaneously.\n\n**Decoder** blocks apply **causal masking** (also called look-ahead or upper-triangular masking): the attention score matrix is multiplied by a lower-triangular mask $\\mathbf{M}_{ij} = 0$ if $i < j$ (future), $+\\infty$ if $i \\geq j$ (past or self), before softmax. This forces $\\alpha_{ij} = 0$ for $i < j$, so position $t$ can only attend to positions $1, \\dots, t$ - preventing the model from \"seeing the future\" during autoregressive generation.\n\nDuring decoder training with teacher forcing: all target tokens $\\langle\\text{the}, \\text{cat}, \\text{sat}\\rangle$ are available simultaneously, but causal masking ensures each position's representation depends only on previous positions.",
      hints: [
        "Draw the $n \\times n$ attention score matrix for $n=4$ tokens. Encoder: all entries are finite. Decoder: entries above the diagonal (future positions) are masked to $-\\infty$ before softmax.",
        "BERT = encoder only = bidirectional attention. GPT = decoder only = causal attention. This is the fundamental architectural difference between BERT and GPT.",
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
        'If all masked positions were replaced with [MASK], the model\'s representations for non-[MASK] tokens would receive no training signal for the MLM task, and [MASK] never appears during fine-tuning. By randomly keeping 10% unchanged and replacing 10% with a random word, the model cannot tell which tokens need predicting - it must learn good contextual representations for every token in every position. This is the "pre-training / fine-tuning mismatch" argument from Devlin et al. (2019).',
      hints: [
        '[MASK] is a pretraining-only artefact. What problem arises if the model learns to "turn off" its attention to tokens that are not [MASK]?',
        "The model cannot know which 10% were left unchanged - so it must represent every token well, not just [MASK] positions.",
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
        "The [CLS] token attends to all other tokens through all 12 (or 24) transformer layers, accumulating a holistic representation of the entire input. A single linear layer is added on top of its final hidden state and the whole model - all BERT weights plus the new head - is fine-tuned jointly. This end-to-end fine-tuning achieves much higher accuracy than freezing BERT and using a fixed [CLS] vector, because the lower layers can adjust to task-specific patterns.",
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
        "RoBERTa's ablation study systematically removed each component of BERT's training setup and measured the effect. Key findings:\n\n1. **NSP removal improves or matches performance**: The NSP loss requires predicting whether two sentences are consecutive. RoBERTa found that NSP provides little benefit and can even hurt performance because it conflates two distinct signals: topic prediction (detecting whether both sentences come from the same document) and sentence-order coherence. The topic signal dominates, which means the model partially learns to solve NSP from [MASK] tokens in each sentence independently — a task already well-covered by the MLM objective. Training on this redundant signal wastes capacity and can even interfere with MLM learning.\n\n2. **Longer training + larger batches + more data**: RoBERTa trained on 160GB of data (vs BERT's 16GB) with batches of 8,192 sequences (vs 256), showing that scale was more impactful than the NSP auxiliary task.\n\n3. **Dynamic masking**: RoBERTa applies different masking patterns each time an epoch is processed, rather than using the same mask across epochs like BERT.\n\nThese changes collectively account for RoBERTa's superior performance on benchmarks like GLUE and SQuAD.",
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
        'An autoregressive LM factorises P(w_1...w_n) = \\Pi P(w_t | w_1...w_{t-1}) using the chain rule. In GPT, this is implemented with a causal (lower-triangular) attention mask that zeroes out all attention weights from position t to positions t+1, t+2, ..., n - preventing the model from "seeing the future." At generation time, the model samples one token, appends it to the context, and repeats.',
      hints: [
        "Chain rule: P(A,B,C) = P(A)P(B|A)P(C|A,B). Autoregressive = applying this one step at a time.",
        "The causal mask is the architectural mechanism. Draw an attention matrix for 4 tokens - which entries are zeroed?",
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
        'In-context learning (ICL) exploits the fact that a large autoregressive model trained to predict the next token will, given examples of the form "Input: X \\to Output: Y", continue the pattern for a new Input: Z by predicting the most likely Output. No gradient update occurs - the examples shift the implicit prior over completions. This is fundamentally a property of the pretraining objective and scale: the model has learned so many patterns that it can identify and follow new ones from a few demonstrations.',
      hints: [
        'The model sees: "Translate English to French: sea \\to mer; cheese \\to fromage; dog \\to ?". It must predict the most likely continuation. What pretraining objective makes this work?',
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
        'This requires no task-specific fine-tuning - the "classifier" is just next-token probability comparison.',
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
        'Devlin et al. (2019) show that fine-tuning all parameters end-to-end with a small learning rate (2e-5 to 5e-5) consistently outperforms feature-extraction approaches on classification tasks. The small learning rate is critical to avoid "catastrophic forgetting" - overwriting the rich pretraining representations. The classification head is typically a single linear layer with softmax applied to the [CLS] final hidden state.',
      hints: [
        'The key is "all weights" - not just the head. Why does updating all 110M BERT parameters (not just the head) help on a small labelled dataset?',
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
        'Aspect-based sentiment analysis (ABSA) operates at a finer granularity than document-level sentiment. Rather than assigning one overall sentiment label to an entire review, ABSA identifies specific aspects of the subject and extracts the sentiment expressed toward each one. In the sentence "The food was excellent but the service was painfully slow," the two aspects are food and service, with sentiments positive and negative respectively. Document-level sentiment would typically assign a mixed or neutral label to the whole sentence, losing this nuance. ABSA requires detecting both the aspect targets (food, service) and their associated sentiment-bearing words (excellent, slow), enabling a more granular and informative analysis of opinions.',
      hints: [
        "Document-level sentiment gives one label to the whole text. What information gets lost when you cannot say \"the food was great but the service was terrible\"?",
        "ABSA extracts (aspect, sentiment) pairs. What are the two aspects in this review, and which sentiment word goes with which aspect?",
      ],
    },
    {
      id: "q-nlp-kp9-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Naive Bayes classifies text by assuming all words are conditionally independent given the class, which is linguistically false - yet it often performs surprisingly well in practice.",
      correctAnswer: "true",
      explanation:
        'The "naive" independence assumption is unrealistic: seeing "not" dramatically changes the meaning of "good" (making them dependent). Despite this, Naive Bayes often achieves 70-80% accuracy on sentiment tasks because the log-probability scores act as a linear classifier over word counts, and the feature interactions that matter most (bigrams, negation) are partially captured by the presence of individual words. The independence assumption mainly affects probability calibration, not the ranking of classes.',
      hints: [
        'Naive Bayes still correctly identifies that "terrible", "awful", "hate" predict negative sentiment even without modelling word interactions.',
        "The independence assumption mainly affects probability calibration (how well the output probabilities match true frequencies), not the ranking of which class is preferred. The classifier can still pick the right class even if the probabilities are overconfident.",
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
        'O O O - not an entity because "New" and "York" are location words',
        "B-ORG I-ORG I-ORG - B marks the start, I marks continuation of the same entity",
        "B-LOC B-LOC B-ORG - each word gets its own B tag because they are different words",
        "B-ORG B-ORG B-ORG - all three words are beginnings of separate entities",
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
        'A CRF (Conditional Random Field) models the joint probability of an entire label sequence given the input, rather than predicting each label independently. This matters because sequence labeling tasks like NER have structural constraints: for example, an I-PER tag cannot follow a B-LOC tag since a person entity cannot be inside a location entity. The CRF transition matrix learns these invalid patterns and penalises them during decoding. Finding the highest-scoring label sequence is done exactly via the Viterbi algorithm, which efficiently searches over all possible label sequences and returns the globally optimal one. A simple softmax at each token would make independent decisions and could produce sequences like B-LOC I-PER, which violate BIO constraints and introduce errors that propagate through the output.',
      hints: [
        "What is wrong with predicting each label independently? Can a softmax predictor produce an invalid tag sequence like B-LOC followed by I-PER?",
        "The CRF transition matrix learns which tag-to-tag transitions are valid. If I-PER can only follow B-PER or I-PER (not B-LOC), where does this constraint come from?",
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
        "A BiLSTM runs two separate LSTMs: one forward (left-to-right) and one backward (right-to-left). At each position t, the forward LSTM has seen w_1...w_t and the backward LSTM has seen w_n...w_t. Their hidden states are concatenated: h_t = [\\toh_t; \\leftarrowh_t]. This gives every token access to full left and right context without reordering the input. It is not a single reversed concatenation - it is two independent passes over the sequence.",
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
        "Two separate BERT models are run - one to predict start, one to predict end",
        "Two learned weight vectors (w_start and w_end) dot-product with each token\'s final hidden state to produce start and end logit scores across all positions",
        "A pointer network sequentially selects the start token and then the end token using beam search",
        "The [CLS] embedding is decoded through an LSTM to produce start and end positions",
      ],
      correctAnswer: 1,
      explanation:
        "BERT\'s QA head adds two parameter vectors w_start \\in R^H and w_end \\in R^H. For each token i, the start score is s_i = w_start \\cdot h_i and end score is e_i = w_end \\cdot h_i. Softmax over all positions gives a distribution; the predicted span is [argmax(s), argmax(e)] with the constraint that end \\geq start. This is a minimal head - just 2 \\times H parameters - that leverages all the contextual information already encoded by BERT.",
      hints: [
        "The QA head is remarkably simple: two vectors, each dotted with every token\'s hidden state. The complexity is in BERT\'s 12 (or 24) transformer layers below.",
        "Training: maximise log P(true_start) + log P(true_end). At inference: find the span [i,j] that maximises s_i + e_j with j \\geq i.",
      ],
    },
    {
      id: "q-nlp-kp11-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'SQuAD 1.1 evaluates with Exact Match (EM) and token-level F1. A model predicts "the Amazon River" but the gold answer is "the Amazon". What are EM and F1 for this prediction?',
      options: [
        "EM = 1, F1 = 1 - the model got the key entity correct",
        "EM = 0, F1 = 2/3 - EM requires exact string match; F1 gives partial credit for overlapping tokens",
        "EM = 0, F1 = 0 - any word mismatch scores zero on both metrics",
        "EM = 0.5, F1 = 0.5 - both metrics give half credit for a superset answer",
      ],
      correctAnswer: 1,
      explanation:
        'EM is binary: the normalised prediction must exactly match the normalised gold answer. "the Amazon River" \$\\neq\$ "the Amazon", so EM = 0. F1 computes token overlap: predicted = {the, Amazon, River}, gold = {the, Amazon}. Precision = 2/3, Recall = 2/2 = 1, F1 = 2\\times(2/3\\times1)/(2/3+1) = 4/5 = 0.8. (Exact value depends on normalisation.) The point is that F1 gives partial credit for near-correct spans, making it a softer and often more informative metric.',
      hints: [
        "EM = 1 only if every character matches after normalisation (lowercasing, removing articles/punctuation). Even one extra word = EM 0.",
        "F1 = 2\\timesP\\timesR/(P+R) over token sets. Tokens in both prediction and gold are true positives.",
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
        'SQuAD 1.1 always has an answer in the passage, so models are trained to always output a span. On SQuAD 2.0\'s ~50% unanswerable questions, such a model always predicts something - a guaranteed error for unanswerable examples. SQuAD 2.0 models must learn to abstain: predict a null span when the passage does not contain the answer. This requires an additional "has-answer" binary classification head or comparing the span score to a learned no-answer threshold.',
      hints: [
        "A SQuAD 1.1 model is forced to output a span. What is its score on an unanswerable question where any span is wrong?",
        'SQuAD 2.0 tests "knowing what you don\'t know" - a key capability for reliable QA systems.',
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
        "Applying temperature T = 0.5 vs T = 2.0 to a language model\'s logits before softmax - what is the effect on the output distribution?",
      options: [
        "T = 0.5 flattens the distribution (more uniform); T = 2.0 sharpens it (more peaked)",
        "T = 0.5 sharpens the distribution (more deterministic); T = 2.0 flattens it (more random)",
        "Both temperatures produce the same distribution after softmax normalisation",
        "T = 0.5 increases diversity; T = 2.0 always produces the greedy argmax token",
      ],
      correctAnswer: 1,
      explanation:
        "Temperature scales logits before softmax: softmax(z/T). For T < 1 (e.g., 0.5), dividing by a number < 1 amplifies differences between logits, making the distribution more peaked (the highest-probability token dominates). For T > 1 (e.g., 2.0), differences are compressed, making the distribution flatter and more uniform (more diverse/random outputs). T \\to 0 approaches greedy decoding; T \\to \\infty approaches uniform random sampling.",
      hints: [
        "Logits [3, 1, -1]. With T=0.5: [6, 2, -2] - the gap between 3 and 1 doubles. With T=2: [1.5, 0.5, -0.5] - the gap halves. How does this affect softmax outputs?",
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
        "Top-k always samples from exactly k tokens regardless of distribution shape; top-p adapts - when confident it samples from few tokens, when uncertain from many, better matching the model\'s actual confidence",
        "Top-p prevents repetition by excluding recently generated tokens from the nucleus",
        "Top-k produces grammatically incorrect sentences because it ignores probability values",
      ],
      correctAnswer: 1,
      explanation:
        'When the model is very confident (e.g., 95% probability on "the"), top-k=50 still samples from 50 tokens including many implausible ones. When the model is uncertain (probability spread across hundreds of tokens), top-k=50 arbitrarily cuts off reasonable continuations. Top-p adapts: for a high-confidence step, p=0.9 might include only 2-3 tokens; for an uncertain step, it might include 100+. This matches the candidate set to the model\'s actual belief about what is reasonable.',
      hints: [
        "Imagine next-token probabilities: [0.9, 0.05, 0.02, ...]. Top-k=50 samples from tokens ranked 1-50; top-p=0.9 samples from just [token 1] since it already covers 90%.",
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
        "This conflates probability with quality. Beam search finds the highest-probability sequence under the LM by keeping the $b$ most promising partial sequences at each step (beam width $b$). For very large $b$, beam search approximates maximum a posteriori (MAP) decoding — finding the single highest-probability complete sequence. But high-probability sequences under an LM tend to be generic, repetitive, and safe — precisely because the model assigns high probability to common, predictable phrasings.\n\nHoltzman et al. (2020, The Curious Case of Neural Text Degeneration) demonstrated this empirically: as beam width increases, text quality (as rated by humans) peaks at moderate widths and then degrades, while n-gram repetition increases monotonically. Human-written text is not the most probable continuation at every step — we choose unexpected words for emphasis, style, and surprise. Maximising sequence probability explicitly penalises these creative deviations.\n\n\\[\n\\hat{y} = \\arg\\max_{y \\in \\mathcal{Y}} \\prod_{t=1}^{T} P(y_t | y_{<t})\\]\n\nThis maximisation rewards repeating safe, high-frequency phrases. Sampling methods (nucleus, temperature) introduce stochasticity that biases toward the high-probability mass while leaving room for unexpected choices, producing more diverse and human-like text.",
      hints: [
        "Humans write surprisingly low-probability text - we do not always choose the most predictable word. What does that imply about maximising probability for generation?",
        "Beam search failure mode: \"I don\'t know. I don\'t know. I don\'t know.\" - highly probable but useless.",
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
        "BART is an encoder-decoder transformer. Pretraining on document corruption (token masking, deletion, permutation, text infilling) trains the encoder to understand degraded text and the decoder to generate fluent reconstructions. This directly develops both reading comprehension (encoder) and language generation (decoder) - the two capabilities needed for abstractive summarisation. Fine-tuning on (article, summary) pairs then specialises these capabilities to the summarisation task.",
      hints: [
        "Summarisation requires: (1) understanding the full article and (2) generating a fluent, shorter description. BART\'s pretraining develops exactly these two skills.",
        "Compare to BERT (encoder only, good at understanding) and GPT (decoder only, good at generation). BART combines both.",
      ],
    },
    {
      id: "q-nlp-kp13-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "ROUGE-L recall is the standard evaluation metric for summarisation. What key property does the Longest Common Subsequence (LCS) in ROUGE-L capture that n-gram overlap metrics like ROUGE-1 miss?",
      options: [
        "ROUGE-L rewards consecutive word matches, penalising summaries that reorder information from the source",
        "ROUGE-L rewards in-sequence word order without requiring consecutive matches, capturing sentence-level fluency and structure that non-consecutive n-gram overlap misses",
        "ROUGE-L automatically corrects for summary length bias by normalising against the reference length",
        "ROUGE-L uses the full vocabulary of the reference rather than a limited n-gram set",
      ],
      correctAnswer: 1,
      explanation:
        "ROUGE-L uses the Longest Common Subsequence (LCS) — the longest sequence of words that appears in both the hypothesis and the reference in the same order (but not necessarily consecutively). Unlike ROUGE-1 (unigram overlap), which counts any shared word regardless of position, ROUGE-L rewards summaries that preserve the structure and fluency of the original text. For example, given a reference \"The cat sat on the mat\" and a hypothesis \"The cat on the mat sat\": ROUGE-1 would score well since all words appear, but ROUGE-L would penalise the word-order inversion because the LCS is shorter. The LCS-based F1 captures how well the summary preserves the intended word order of the reference.\n\nFormally, for reference R and hypothesis H:\n\\[\\text{ROUGE-L} = \\frac{\\text{LCS}(R, H)}{|R|},\\quad \\text{precision} = \\frac{\\text{LCS}(R, H)}{|H|},\\quad F_1 = \\frac{2 \\cdot P \\cdot R}{P + R}.\\]",
      hints: [
        "LCS = Longest Common Subsequence. For \"The cat sat on the mat\" and \"The cat on the mat sat\", what is the LCS? Does it penalise the reordered version?",
        "ROUGE-1 counts shared words but ignores their order. ROUGE-L adds the constraint that words must appear in the same sequence. Which is a better proxy for summary quality?",
      ],
    },
    {
      id: "q-nlp-kp13-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In abstractive summarisation, the model is allowed to copy word-for-word from the source document, whereas in extractive summarisation the model must paraphrase all content.",
      correctAnswer: "false",
      explanation:
        "The distinction is the opposite: extractive summarisation selects and concatenates whole sentences or passages verbatim from the source document — no generation is required. Abstractive summarisation generates new text that may paraphrase, compress, or rephrase the source content, potentially introducing words not present in the source. BART and T5 are abstractive models; SummaRuNer is an extractive model. Copy mechanisms in seq2seq models (copy pointers) blur this line by allowing abstractive models to also copy specific source spans verbatim when appropriate.",
      hints: [
        "Extractive = extract (copy verbatim) sentences from source. Abstractive = generate new text that may differ from the source. Which is which?",
        "A model that selects entire sentences from a news article to form a summary is performing which type of summarisation?",
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
        '4/4 = 1.0 - all four "the" tokens appear in the reference',
        '2/4 = 0.5 - BLEU clips the count of each word to its max reference count (reference has 2 "the"s); modified precision = 2/4',
        '0/4 = 0 - "the" is a stop word and is excluded from BLEU computation',
        "1/6 \\approx 0.17 - BLEU divides by the reference length, not hypothesis length",
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
        "BP = 1.0 - the hypothesis is shorter so no penalty applies",
        "BP = exp(1 - 10/5) = exp(-1) \\approx 0.368",
        "BP = exp(1 - 5/10) = exp(-0.5) \\approx 0.607",
        "BP = 5/10 = 0.5",
      ],
      correctAnswer: 1,
      explanation:
        "When the hypothesis is shorter than the reference (c < r), BP = exp(1 - r/c). Here r=10, c=5: BP = exp(1 - 10/5) = exp(-1) \\approx 0.368. This heavily penalises very short translations. The brevity penalty compensates for the fact that short hypotheses trivially achieve high n-gram precision by saying very little - a 1-token hypothesis matching 1 reference word has precision 1.0 but is clearly inadequate.",
      hints: [
        "The formula is BP = exp(1 - r/c). With c=5, r=10: 1 - 10/5 = 1 - 2 = -1. exp(-1) \\approx 0.37.",
        "Brevity penalty punishes translations that are too short. A 1-token hypothesis has BP \\approx exp(1-r) which is tiny for large r.",
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
        "BLEU was designed by Papineni et al. (2002) to evaluate entire translation corpora, not individual sentences. At the sentence level, BLEU has very high variance and poor correlation with human quality judgments for several reasons:\n\n1. **Small-sample problem**: BLEU averages n-gram precision over many sentences. A single sentence provides too small a sample for stable n-gram statistics, making BLEU scores at sentence level noisy and unreliable.\n\n2. **N-gram overlap does not capture meaning**: Two translations with identical n-gram sets but opposite meanings (e.g., \"The cat did not die\" vs. \"The cat died\") can receive similar BLEU scores because BLEU only measures surface overlap, not semantic content.\n\n3. **No fluency or adequacy assessment**: BLEU cannot judge grammaticality or whether a sentence faithfully conveys the source meaning.\n\n4. **Reference variability**: At the sentence level, a single reference may not capture all valid translations; BLEU penalises valid alternatives that differ from the reference in wording.\n\nFor sentence-level evaluation, metrics like METEOR, BERTScore, or human evaluation are preferred. BLEU remains useful for corpus-level ranking because averaging over many sentences smooths out the variance.",
      hints: [
        "BLEU was designed for entire corpora. What happens to the reliability of n-gram statistics when you evaluate a single sentence instead of thousands?",
        "BLEU only measures n-gram overlap. Can n-gram overlap detect opposite meanings? Consider \"The cat did not die\" vs. \"The cat died\" — do they have similar BLEU scores?",
        "If you translate a sentence with all the right words in the wrong order, BLEU may give a decent score. Does this reflect translation quality?",
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
        'Whether "it" refers to "the trophy" or "the suitcase" - linking the pronoun to its antecedent',
        'What the phrase "too big" modifies: the trophy or the suitcase',
      ],
      correctAnswer: 1,
      explanation:
        'This is the Winograd Schema (Levesque, 2012) example. Resolving "it" requires real-world knowledge: trophies and suitcases do not fit when the thing being placed is too big, so "it" \\to "trophy." Simple syntactic rules cannot resolve this - it requires pragmatic reasoning. Coreference resolution clusters all mentions referring to the same entity: {trophy, it} in this case. The Winograd Schema Challenge tests this capability directly.',
      hints: [
        'Ask yourself: what was "too big" - the trophy (which wouldn\'t fit inside) or the suitcase (too big to store)? Which interpretation makes physical sense?',
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
        "Each metric evaluates a different language - MUC for English, B-cubed for German, CEAFe for Chinese",
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
        'Coreference resolution only handles pronoun-antecedent pairs (e.g., "he" \\to "John") and does not apply to definite noun phrase references (e.g., "the researcher" \\to "Dr. Smith").',
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
        'The arc direction: head \\to dependent. nsubj means "nominal subject of". What is the subject of "chased"?',
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
        "Transition-based parsers build the dependency tree through a sequence of local decisions (SHIFT, REDUCE, LEFT-ARC, RIGHT-ARC) over a stack and buffer. With a neural scorer, each decision is O(1), so the full parse is O(n). Graph-based methods (like Eisner\'s algorithm) compute scores for all O(n\\^2) possible arcs and find the maximum spanning tree in O(n\\^3) - much slower. The trade-off is that transition-based parsers can make locally greedy errors that propagate.",
      hints: [
        "O(n) vs O(n\\^3): for a 50-word sentence, that is 50 steps vs 125,000. At deployment speed matters.",
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
        "A projective dependency tree is one where for every arc (head \\to dependent), all words between head and dependent also have head as an ancestor - equivalently, no arcs cross when drawn on a line. Most English sentences are projective. Non-projective dependencies (crossing arcs) occur in languages with freer word order (German, Czech, Dutch) and require algorithms beyond Eisner\'s O(n\\^3) projective parser, such as maximum spanning tree algorithms.",
      hints: [
        'Draw "The cat chased the mouse" and its dependency arcs above the words. Do any arcs cross? Now imagine a scrambled German sentence - crossing arcs become necessary.',
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
        "A topic z is sampled from the document\'s topic distribution \\theta_d, then a word is sampled from that topic\'s word distribution \\phi_z",
        "Words are sorted by TF-IDF and assigned to topics in order of frequency",
        "Each document is first clustered into one topic, then all words are sampled from that single topic\'s distribution",
      ],
      correctAnswer: 1,
      explanation:
        "LDA\'s generative process: (1) Draw \\theta_d ~ Dirichlet(\\alpha) - the document\'s topic mixture. (2) For each word position: draw topic z ~ Categorical(\\theta_d), then draw word w ~ Categorical(\\phi_z). This means different words in the same document can be generated from different topics, naturally modelling a news article that is 60% politics, 40% economics. Inference (Gibbs sampling or variational EM) inverts this generative model to recover \\theta_d and \\phi_z from observed words.",
      hints: [
        'Each word independently samples a topic from the document\'s mixture, then the word is drawn from that topic. A 50% politics document samples "election" from the politics topic and "GDP" from the economics topic.',
        "The Dirichlet prior on \\theta_d encourages sparse mixtures - most documents are dominated by 1-3 topics out of K.",
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
        'LDA represents documents as bag-of-words count vectors - "automobile" and "car" appear as different features with no shared information. BERTopic embeddings place "The car broke down" and "The automobile malfunctioned" near each other in semantic space. HDBSCAN clustering then groups semantically similar documents regardless of surface word overlap. c-TF-IDF (class-based TF-IDF) then extracts the most representative keywords for each cluster, interpreting the topics.',
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
        "Perplexity on held-out data does not provide a clear knee for LDA - it tends to keep decreasing (or plateauing) as K increases because more topics = more expressive model. The number of topics is typically chosen using human coherence judgements, automated coherence metrics (NPMI, C_v), or domain knowledge. This is a well-known challenge in topic modelling: the model selection problem has no single principled automatic solution.",
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
        "BERT cross-encoder requires feeding (query, candidate) pairs together through all 12 layers. For 10M candidates that is 10M full BERT forward passes per query - infeasible for real-time search. SBERT (Reimers & Gurevych, 2019) uses a siamese network to encode each sentence independently into a fixed-size embedding. The 10M candidates can be encoded offline and stored. At query time: 1 BERT forward pass for the query + dot-product/cosine similarity against 10M pre-encoded vectors using approximate nearest-neighbour search (FAISS).",
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
        "The [CLS] token is only optimised for sentence-level representations during fine-tuning. For a pretrained-only BERT, [CLS] embedding quality for sentence similarity is poor - it has not been directly trained to aggregate sentence meaning. Mean pooling averages all non-[PAD] token embeddings, spreading the representation burden across all tokens. Empirically, mean pooling consistently outperforms [CLS] and max pooling on STS benchmarks when using pretrained (not fine-tuned) BERT.",
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
        "Adding more languages to a fixed-capacity model dilutes per-language capacity; XLM-R mitigates this by using a larger model (XLM-R Large: 560M params) and \\alpha-sampled data that upweights low-resource languages",
        "The curse refers to the difficulty of learning word order across different language families; XLM-R uses relative positional encodings",
        "The curse is that multilingual models cannot distinguish code-switched text; XLM-R adds language identity tokens to each sentence",
      ],
      correctAnswer: 1,
      explanation:
        "The curse of multilinguality (Conneau et al., 2020): with a fixed model size, adding more languages reduces capacity per language, hurting high-resource language performance. XLM-R addresses this with: (1) a larger model (125M or 560M parameters), (2) \\alpha-sampling that exponentially upweights low-resource languages (sampling probability \\propto count^\\alpha, \\alpha < 1), and (3) much more data. Despite the curse, XLM-R outperforms per-language BERT models for most low-resource languages because the multilingual representations generalise better.",
      hints: [
        "Imagine sharing 125M parameters among 100 languages vs. 1 language. Each language gets ~1/100 the capacity. How does a bigger model help?",
        "\\alpha-sampling: low-resource languages have few documents but get upsampled. This balances the distribution so the model does not just optimise for English.",
      ],
    },
    {
      id: "q-nlp-kp19-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Zero-shot cross-lingual transfer means: fine-tune on English-labelled NLP data, then evaluate on the same task in the target language - with zero target-language labelled examples used during fine-tuning.",
      correctAnswer: "true",
      explanation:
        "Zero-shot cross-lingual transfer (Hu et al., 2020 - XTREME benchmark) evaluates: train on English CoNLL NER \\to evaluate on Arabic/Hindi/Swahili NER with no Arabic/Hindi/Swahili labels. The model must leverage its multilingual representations to transfer syntactic and semantic knowledge. Performance degrades gracefully with linguistic distance from English. Few-shot transfer (adding 10-100 target-language examples) dramatically improves performance, motivating practical annotation strategies for new languages.",
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
        "A hotel booking system needs to know check-in date, number of guests, etc. - where do these values come from?",
        'Think of a form with blank fields - "slot filling" is filling those fields from natural language.',
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
        'The word "open-domain" is the key clue - what is the opposite of open-domain?',
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
        "Automatically labelling text by aligning it with a knowledge base - if two entities are related in the KB, sentences containing both are labelled with that relation",
        "Using a teacher model to supervise a smaller student model from a distance",
        "Labelling training data using heuristic rules that are far from perfect",
      ],
      correctAnswer: 1,
      explanation:
        "Distant supervision heuristically generates training data by assuming that any sentence mentioning two KB-related entities expresses that relation - enabling large-scale training without manual annotation, at the cost of noisy labels.",
      hints: [
        'If "Steve Jobs" and "Apple" are linked in a KB as FOUNDED_BY, what assumption does distant supervision make about all sentences containing both names?',
        'Imagine a KB with "Paris" \\to "France" and "Eiffel Tower" \\to "Paris." Distant supervision would label any mention of both "Paris" and "Eiffel Tower" as expressing the relation CAPITAL_OF.',
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
        "In a pipeline, errors in NER propagate to relation extraction - how does a joint model avoid this?",
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
        "Unlike BLEU, BERTScore does not require exact word matches - what does it use instead?",
        "Contextual embeddings encode meaning - how might that help for synonymous paraphrases?",
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
        "LCS finds the longest shared word sequence - does the order matter here?",
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
        "BLEU evaluates the quality of translation outputs - what does it need to compare against?",
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
        "DistilBERT uses knowledge distillation during pretraining - the smaller student model is trained to match the soft probability outputs (and hidden states) of the full BERT teacher, resulting in ~40% fewer parameters with ~97% of BERT\'s performance.",
      hints: [
        'Knowledge distillation transfers knowledge from a large "teacher" to a smaller "student" - what signal does the student learn from?',
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
        "Factorising a large matrix into two smaller ones reduces the total number of parameters - why?",
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
        "TinyBERT distills knowledge from all transformer layers - attention matrices, hidden states, and the final prediction layer - using a layer mapping strategy, which is why it outperforms simple output-only distillation.",
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
        "A parametric model encodes knowledge in its weights - what happens when the world changes after training?",
        "Retrieval brings in external evidence - how might that reduce fabricated facts?",
      ],
    },
    {
      id: "q-nlp-kp24-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "RAG (Lewis et al., 2020) uses a retriever to fetch relevant documents and a generator to produce the final answer. What are the two main RAG variants, RAG-Token and RAG-Sequence, and how do they differ?",
      options: [
        "RAG-Token uses the retrieved document as a prefix to the query; RAG-Sequence prepends the query to the document",
        "RAG-Token marginalises over each retrieved document at the token level, conditioning each generated token on all retrieved documents; RAG-Sequence conditions the entire generated answer on each retrieved document and marginalises at the sequence level",
        "RAG-Token is trained with supervised retrieval; RAG-Sequence uses unsupervised retrieval",
        "The only difference is the vocabulary size: RAG-Token uses a smaller vocabulary for efficiency",
      ],
      correctAnswer: 1,
      explanation:
        "RAG-Token and RAG-Sequence are two decoding strategies for combining retrieval and generation:\n\n**RAG-Token**: At each generation step, the probability distribution over the next token is a weighted sum over the distributions obtained from each retrieved document. The model effectively has multiple possible document contexts at each step, and marginalises (sums) over them:\n\\[P_\\text{RAG-Token}(w_t | w_{<t}, x) = \\sum_{d \\in \\text{top-}k} P_\\text{gen}(w_t | w_{<t}, d, x) \\cdot P_\\text{ret}(d | x)\\]\n\n**RAG-Sequence**: The entire answer sequence is generated conditioned on each retrieved document separately, then the sequence-level probabilities are marginalised. Each document generates a complete answer sequence, and the final answer is the one with the highest marginal probability:\n\\[P_\\text{RAG-Seq}(y | x) = \\sum_{d \\in \\text{top-}k} P_\\text{gen}(y | w_{<t}, d, x) \\cdot P_\\text{ret}(d | x)\\]\n\nRAG-Token allows token-level flexibility (different tokens can be sourced from different documents); RAG-Sequence is more conservative and tends to copy from a single dominant document.",
      hints: [
        "Marginalisation means summing over latent retrieval decisions. At what level does each variant marginalise — per token or per generated sequence?",
        "RAG-Token lets each generated token come from a different retrieved document. RAG-Sequence forces the whole answer to come from one document at a time.",
      ],
    },
    {
      id: "q-nlp-kp24-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "RAG allows a language model to answer questions about information that was not in its training data, provided that the relevant information is stored in the retrieval index.",
      correctAnswer: "true",
      explanation:
        "This is the core motivation for RAG. A parametric language model (all weights) can only answer questions from knowledge encoded during pretraining. If the world changes after training (e.g., today's news, private documents, updated facts), the parametric model cannot reliably answer those questions. RAG addresses this by retrieving relevant documents at inference time from an external, mutable index. The index can be updated with new documents without retraining the language model. At query time, the retriever finds the most relevant documents, and the generator produces an answer conditioned on both the query and the retrieved content. This makes RAG a non-parametric approach to knowledge-intensive tasks.",
      hints: [
        "RAG has two components: a retriever (searches an external index) and a generator (produces the answer). What does each component contribute?",
        "If you update the retrieval index with today's news, can a RAG system answer questions about today's news without retraining the language model?",
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
        "Standard self-attention has O(n\\^2) time and memory complexity. For a document of 32,000 tokens, roughly how many attention operations are computed?",
      options: [
        "32,000 - linear in sequence length",
        "32,000 \\times log(32,000) \\approx 480,000 - log-linear",
        "32,000\\^2 = 1,024,000,000 \\approx 1 billion - quadratic",
        "32,000\\^3 \\approx 3 \\times 10^13 - cubic",
      ],
      correctAnswer: 2,
      explanation:
        "Self-attention computes QK^T where Q, K \\in R^{n\\timesd}: this is an n\\timesn matrix requiring O(n\\^2d) operations and O(n\\^2) memory to store the attention matrix. For n=32,000: 32,000\\^2 = 1.024 \\times 10^9 attention scores per layer. At 12 layers, 12 heads: ~12 billion attention values. This is why vanilla transformers are limited to 512-2048 token contexts and efficient attention variants (FlashAttention, Longformer, Mamba) are critical for long-document tasks.",
      hints: [
        "Every token attends to every other token: n \\times n pairs. For n=32K: 32,000 \\times 32,000 = 1,024,000,000.",
        "Storing a 32K\\times32K float16 attention matrix: 32,000\\^2 \\times 2 bytes \\approx 2GB per head per layer. How many heads and layers does a typical transformer have?",
      ],
    },
    {
      id: "q-nlp-kp25-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Longformer uses sliding-window attention of width w for most tokens, plus global attention for a few special tokens. A 4,096-token document with w=512 uses global attention only on [CLS]. What is the approximate complexity?",
      options: [
        "Still O(n\\^2) because the global token attends to all n tokens",
        "O(n \\times w) for sliding-window plus O(n \\times g) for global tokens where g << n - effectively O(n) for small w and g",
        "O(n \\times w\\^2) because each window computes internal attention quadratically",
        "O(n log n) due to the hierarchical structure of the window attention",
      ],
      correctAnswer: 1,
      explanation:
        "Longformer\'s sliding-window attention: each of the n tokens attends to its w/2 neighbours on each side \\to O(n\\timesw) total. Global attention on g special tokens (typically 1-64): each global token attends to all n tokens and all tokens attend back to each global token \\to O(n\\timesg). Total: O(n\\times(w+g)). For n=4096, w=512, g=1: ~4096\\times513 \\approx 2.1M operations vs. 4096\\^2 = 16.8M for full attention - a ~8\\times reduction. This scales linearly with n for fixed w.",
      hints: [
        "Sliding window: token i attends to tokens [i-w/2, i+w/2]. Cost per token: w. Total: n\\timesw.",
        "Global token: attends to all n tokens (and they attend back). Cost: 2\\timesn\\timesg. For g=1: just 2n additional operations.",
      ],
    },
    {
      id: "q-nlp-kp25-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "FlashAttention (Dao et al., 2022) reduces the theoretical FLOP count of attention from O(n\\^2) to O(n log n) by using a divide-and-conquer algorithm.",
      correctAnswer: "false",
      explanation:
        "FlashAttention performs the same O(n\\^2d) floating-point operations as standard attention - it does not reduce FLOPs. Its speedup comes from IO-awareness: instead of materialising the full n\\timesn attention matrix in GPU high-bandwidth memory (HBM), it tiles the computation in fast SRAM, avoiding the O(n\\^2) HBM reads/writes that are the actual bottleneck. GPU compute is usually faster than memory bandwidth. FlashAttention-2 and -3 further optimise parallelism and work partitioning for modern GPU architectures.",
      hints: [
        "GPU bottleneck: memory bandwidth (HBM reads/writes), not FLOP count. FlashAttention avoids writing the O(n\\^2) attention matrix to HBM by computing it tile-by-tile in fast SRAM.",
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
        'Research (Zhao et al., 2021) found that LLMs have a recency (primacy) bias in few-shot prompting: if the last example is labelled "positive", the model is disproportionately likely to predict "positive" for the test input - regardless of the test input\'s actual content. This is because the autoregressive model\'s predictions are most strongly influenced by recent context. Calibration techniques (dividing by the label\'s baseline probability) and shuffled example orderings partially mitigate this.',
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
        'Wei et al. (2022) and subsequent work show that instruction tuning generalises beyond the training tasks. A model fine-tuned on hundreds of task types (summarisation, translation, QA) becomes better at zero-shot on new task types not seen during instruction tuning. This is because it learns a general "follow the instruction" behaviour - a form of meta-learning. Jurafsky & Martin (Ch. 9) discuss this as one reason post-training is so valuable: the model learns what helpful responding looks like.',
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
        "The model generates tokens autoregressively - intermediate steps become part of the context for subsequent tokens.",
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
        "Multiple reasoning paths may arrive at the same answer via different routes - how does this help?",
        "Think about ensemble methods - how does voting across diverse outputs help?",
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
        "The LLM does not execute code - it only decides what to call and with what parameters. The execution engine is the application.",
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
        'ReAct interleaves: Thought ("I need to find the capital of Germany") \\to Action (Search("Germany capital")) \\to Observation ("Berlin") \\to Thought ("The capital is Berlin, not Paris"). The Observation grounds subsequent reasoning in retrieved facts, preventing "hallucination spirals" where wrong premises lead to confidently wrong conclusions.',
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
        'Tools are defined via schema descriptions in the system prompt or message context at inference time. The LLM does not need to have "seen" a tool during training - it only needs to understand the API schema (name, parameters, description) well enough to call it correctly. A new API released in 2026 can be used by a model trained in 2024 simply by providing its schema in the prompt. This is analogous to how few-shot examples teach the model to use a new tool at inference time.',
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
        "Hallucination taxonomy: (1) Intrinsic hallucination - contradicts a source document or verifiable fact. (2) Extrinsic/faithfulness hallucination - contradicts information provided in the prompt/context. (3) Fabrication - generates entirely invented entities or events. Here the designer is correct but the year 1893 contradicts the verifiable ground truth (1889). Mitigation strategies include retrieval augmentation (ground answers in retrieved sources), self-consistency (cross-checking answers), and factual calibration training (RLHF with factuality reward).",
      hints: [
        "Is the LLM making up a building that doesn\'t exist (fabrication)? No. Is it contradicting something in the prompt? No. It is asserting a false fact about a real entity.",
        'The LLM is "confidently wrong" - it does not hedge with "I believe" or "approximately." This overconfidence is a key hallucination characteristic.',
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
        'RAG directly addresses hallucination by providing retrieved evidence and instructing the model: "Answer only based on the provided documents. If the answer is not in the documents, say so." This converts the problem from "generating plausible-sounding facts from memory" to "extracting stated facts from provided text" - a much easier task that can be verified. Larger models still hallucinate (albeit less frequently), and higher temperature increases hallucination. RAG with strict grounding instructions is the most reliable industrial approach.',
      hints: [
        "Without RAG: the model must retrieve facts from its weights - which may contain errors or outdated information.",
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
        "LLMs hallucinate even about topics extensively covered in training data. The fundamental cause is not a knowledge gap but a generation process that optimises for plausibility given the context, not factual accuracy. A model may have seen correct information about Napoleon but still generate a plausible-sounding but wrong birth date - because the generation objective rewards fluent, context-consistent tokens, not fact-verified tokens. Hallucination is most severe for specific numbers, dates, citations, and names where many plausible values exist.",
      hints: [
        "Ask an LLM about a famous physicist\'s specific publication year - a heavily-trained domain. Does it never hallucinate? Test it.",
        'The LM objective is: predict the next token given context. There is no explicit "check if this is true" step. Plausibility \$\\neq\$ accuracy.',
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
        "Human preferences: given two model responses to the same prompt, which response is more helpful, accurate, and safe - the reward model predicts the winning response",
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
        "RLHF requires three stages: (1) train reward model on preference data, (2) use RM scores as rewards in PPO, (3) update LLM. PPO is complex (requires value network, advantage estimation, clipping) and computationally expensive. DPO (Rafailov et al., 2023) derives a closed-form loss that directly maximises the log-ratio of preferred to rejected responses relative to the reference model - no RM, no RL. The loss is: L_DPO = -log \\sigma(\\beta\\cdotlog[\\pi(y_w|x)/\\pi_ref(y_w|x)] - \\beta\\cdotlog[\\pi(y_l|x)/\\pi_ref(y_l|x)]). Empirically, DPO matches or exceeds RLHF quality.",
      hints: [
        "RLHF pipeline: data \\to reward model \\to RL fine-tuning (3 steps). DPO: data \\to one fine-tuning step. What is eliminated?",
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
        'If "nurse" \\to female and "engineer" \\to male in training data, hundreds of co-occurrence dimensions encode this correlation - not just the gender axis.',
        "Bolukbasi removes one dimension. But bias is distributed across the full embedding space. Can removing one direction fully eliminate a multi-dimensional correlation?",
      ],
    },
  ],

  // ── nlp-kp-31: Subword Tokenization Details ───────────────────────────────
  "subword-tokenization-details": [
    {
      id: "q-nlp-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SentencePiece differs from BPE and WordPiece mainly because it treats the input as what?",
      options: [
        "A sequence of bytes, converting all text to UTF-8 byte values before tokenisation",
        "A raw stream of Unicode characters with no pre-tokenisation whitespace split, enabling language-agnostic subword segmentation",
        "A sequence of morphemes obtained by a morphological analyser before BPE is applied",
        "A sequence of syllables detected via a rule-based syllabifier specific to each target language",
      ],
      correctAnswer: 1,
      explanation:
        "SentencePiece (Kudo & Richardson, 2018) does not rely on pre-tokenisation or whitespace splitting - it trains a BPE or unigram language-model segmenter directly on raw Unicode characters. Whitespace is treated as an ordinary character (represented as ▁). This makes it fully language-agnostic and reversible (the original string can be recovered exactly from tokens), which is critical for languages like Japanese, Chinese, and Thai that lack explicit word boundaries.",
      hints: [
        "Unlike BPE which splits on whitespace first, SentencePiece sees the raw character stream - no language-specific pre-processing needed.",
        "The ▁ symbol in SentencePiece tokens represents a space - it encodes word boundaries implicitly.",
      ],
    },
    {
      id: "q-nlp-kp31-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The unigram language-model tokeniser (used in SentencePiece) starts with a large vocabulary and iteratively removes tokens, whereas BPE starts with a small vocabulary and iteratively adds tokens.",
      correctAnswer: "true",
      explanation:
        "BPE is bottom-up: begin with characters, add merged symbols step by step. The unigram LM (Kudo, 2018) is top-down: start with a large over-complete vocabulary (all substrings up to some length), then prune tokens whose removal increases the corpus likelihood the least, until the target vocabulary size is reached. Both produce subword vocabularies, but via opposite directions of search.",
      hints: [
        "BPE merges: vocabulary grows from characters up. Unigram LM prunes: vocabulary shrinks from over-complete down.",
        "Think of BPE as constructive and unigram LM as eliminative.",
      ],
    },
    {
      id: "q-nlp-kp31-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When comparing BPE and WordPiece tokenisers on the same text, which statement best describes the key algorithmic difference in how the next merge/token is selected?",
      options: [
        "BPE selects the pair with the highest frequency count; WordPiece selects the pair that maximises the likelihood ratio count(AB) / (count(A) \\times count(B))",
        "BPE selects the pair with the highest TF-IDF score; WordPiece selects the pair that minimises perplexity on a held-out set",
        "BPE selects pairs at random with probability proportional to frequency; WordPiece uses a deterministic greedy PMI criterion across all n-grams simultaneously",
        "Both BPE and WordPiece use identical selection criteria - they differ only in how they handle the end-of-word marker",
      ],
      correctAnswer: 0,
      explanation:
        "BPE greedily picks the adjacent symbol pair with the highest raw frequency in the corpus. WordPiece normalises by the product of individual symbol frequencies - effectively maximising pointwise mutual information - which biases the selection toward pairs that are highly predictive of each other rather than merely common. This distinction leads to different tokenisations on the same vocabulary size budget.",
      hints: [
        "BPE criterion: argmax count(AB). WordPiece criterion: argmax count(AB) / (count(A) * count(B)).",
        "High-frequency symbols individually (like 'e' and 's') might form a common pair by raw count; WordPiece asks whether seeing 'e' actually predicts 's'.",
      ],
    },
  ],

  // ── nlp-kp-32: Retrieval-Augmented Generation ─────────────────────────────
  "rag-details": [
    {
      id: "q-nlp-kp32-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a RAG (Retrieval-Augmented Generation) system, what is the primary difference between dense retrieval and sparse retrieval?",
      options: [
        "Dense retrieval uses inverted-index exact keyword matching; sparse retrieval uses neural embeddings for approximate nearest-neighbour search",
        "Dense retrieval represents queries and documents as continuous embedding vectors and retrieves via approximate nearest-neighbour search; sparse retrieval uses high-dimensional term-frequency vectors (e.g., BM25) with exact keyword matching",
        "Dense retrieval fetches the entire document; sparse retrieval fetches only named entities from documents",
        "Dense retrieval requires GPU inference; sparse retrieval always runs on CPU - they are otherwise equivalent",
      ],
      correctAnswer: 1,
      explanation:
        "Dense retrieval (e.g., DPR - Karpukhin et al., 2020) encodes both query and passages into dense vectors via a bi-encoder; retrieval is approximate nearest-neighbour (ANN) using FAISS. Sparse retrieval (BM25, TF-IDF) represents text as high-dimensional sparse vectors over vocabulary terms and uses an inverted index for exact term matching. Dense retrieval captures semantic similarity beyond keyword overlap; sparse retrieval is fast and interpretable. Hybrid systems (e.g., combining BM25 + DPR) often outperform either alone.",
      hints: [
        "Dense = continuous embeddings, ANN search. Sparse = term-frequency vectors, inverted index.",
        "BM25 misses 'automobile' when query says 'car'; a dense retriever with a shared embedding space would capture this synonym.",
      ],
    },
    {
      id: "q-nlp-kp32-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "When setting chunk size in a RAG pipeline, which trade-off is most important to consider?",
      options: [
        "Larger chunks reduce retrieval latency but increase GPU memory usage during generation",
        "Larger chunks provide more context per retrieved passage but reduce retrieval precision; smaller chunks improve precision but may miss surrounding context needed for answering",
        "Chunk size only affects indexing time, not retrieval quality or answer generation",
        "Smaller chunks always produce better answers because they contain less irrelevant information",
      ],
      correctAnswer: 1,
      explanation:
        "Chunk size is a fundamental RAG hyper-parameter. Small chunks (e.g., 128 tokens) give the retriever high precision - the returned chunk is likely to directly contain the answer - but may lack the surrounding context needed for the generator to produce a coherent answer. Large chunks (e.g., 512-1024 tokens) provide more context but dilute the dense embedding, reducing retrieval precision. Common strategies: retrieve with small chunks but expand context windows around hits, or use hierarchical chunking.",
      hints: [
        "Think about what the retriever embeds vs. what the generator reads - they can differ if you expand context after retrieval.",
        "A chunk of 50 tokens is precise but may cut off a sentence mid-thought. A chunk of 2000 tokens captures context but the embedding becomes less focused.",
      ],
    },
    {
      id: "q-nlp-kp32-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "RAGAS is a framework for evaluating RAG pipelines that measures faithfulness (whether the answer is supported by retrieved context) and answer relevance separately from retrieval quality.",
      correctAnswer: "true",
      explanation:
        "RAGAS (Es et al., 2023) decomposes RAG evaluation into: (1) faithfulness - does the answer contain only claims entailed by retrieved documents? (2) answer relevance - does the answer address the question? (3) context precision/recall - did retrieval return the right documents? These components expose whether failures come from retrieval (wrong chunks) or generation (hallucination given correct chunks), enabling targeted debugging.",
      hints: [
        "RAGAS separates retrieval quality from generation quality - important because different components can fail independently.",
        "Faithfulness specifically checks whether the generated answer can be fully deduced from the retrieved passages - a direct hallucination metric.",
      ],
    },
  ],

  // ── nlp-kp-33: LLM Prompting ──────────────────────────────────────────────
  "llm-prompting-v2": [
    {
      id: "q-nlp-kp33-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which statement best describes the difference between zero-shot and few-shot prompting in large language models?",
      options: [
        "Zero-shot prompting requires the model to be fine-tuned; few-shot prompting does not",
        "Zero-shot prompting provides only a task description without examples; few-shot prompting includes a small number of input-output demonstration examples in the prompt",
        "Zero-shot prompting uses temperature=0; few-shot prompting samples with temperature > 0",
        "Zero-shot prompting works only for classification tasks; few-shot prompting works for generative tasks",
      ],
      correctAnswer: 1,
      explanation:
        "Zero-shot prompting relies entirely on the model's pre-trained knowledge - only a task instruction is provided (e.g., 'Translate English to French: ...'). Few-shot prompting (Brown et al., 2020 - GPT-3) prepends k demonstration examples (input, output) pairs to the prompt, enabling in-context learning without gradient updates. Few-shot typically improves performance on complex tasks by clarifying format and expected reasoning style.",
      hints: [
        "Zero-shot = task description only. Few-shot = task description + k examples of (input, output).",
        "GPT-3's key finding was that large enough models can learn from in-context examples without fine-tuning.",
      ],
    },
    {
      id: "q-nlp-kp33-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Chain-of-thought (CoT) prompting improves LLM reasoning primarily by doing what?",
      options: [
        "Adding a final verification step that checks the answer against a symbolic calculator",
        "Instructing the model to output intermediate reasoning steps before the final answer, which improves accuracy on multi-step arithmetic and logical reasoning tasks",
        "Splitting the prompt across multiple API calls to reduce context length",
        "Training a separate reasoning module that post-processes LLM outputs",
      ],
      correctAnswer: 1,
      explanation:
        "Wei et al. (2022) demonstrated that prompting LLMs with examples that include step-by-step reasoning (chain-of-thought) before the final answer - e.g., 'Roger has 5 balls. He buys 2 more cans of 3 balls each. 2\\times3=6, 5+6=11. The answer is 11.' - dramatically improves performance on GSM8K and other reasoning benchmarks. The intermediate steps decompose the problem and reduce the probability of early errors propagating. Zero-shot CoT ('Let's think step by step.') also works on large models.",
      hints: [
        "CoT makes the model show its work. Why would that help with multi-step arithmetic?",
        "The 'Let's think step by step' suffix is a zero-shot CoT trigger - no examples needed.",
      ],
    },
    {
      id: "q-nlp-kp33-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Instruction tuning (FLAN, InstructGPT) trains a language model to follow natural-language task descriptions, improving zero-shot generalisation to unseen task types.",
      correctAnswer: "true",
      explanation:
        "Instruction tuning fine-tunes pre-trained LLMs on a large collection of NLP tasks framed as natural-language instructions (e.g., 'Summarise the following article:', 'Translate to French:', 'Is this review positive or negative?'). FLAN (Wei et al., 2022) and T0 showed that models instruction-tuned on many tasks generalise better zero-shot to held-out tasks than base pre-trained models. InstructGPT adds RLHF on top of instruction tuning to align with human preferences.",
      hints: [
        "Without instruction tuning, an LLM given 'Summarize:' might complete the prompt literally. After instruction tuning, it follows the instruction.",
        "FLAN used 62 tasks; models trained on those tasks zero-shot improved on 25 held-out tasks.",
      ],
    },
  ],

  // ── nlp-kp-34: Text Classification ───────────────────────────────────────
  "text-classification-advanced": [
    {
      id: "q-nlp-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When fine-tuning BERT for binary text classification, which architectural modification is most commonly made?",
      options: [
        "The entire BERT model is discarded and a new LSTM is trained on BERT's tokeniser output",
        "A linear classification head is added on top of the [CLS] token representation and the whole model is fine-tuned end-to-end",
        "Only the final two transformer layers are replaced; all earlier layers are frozen permanently",
        "The [CLS] token is removed and mean pooling over all token embeddings is used with no additional head",
      ],
      correctAnswer: 1,
      explanation:
        "Standard BERT fine-tuning (Devlin et al., 2019) adds a single linear layer W\\in\\mathbb{R}^{d\\timesC} on top of the [CLS] token representation (the aggregate sequence representation) and fine-tunes all parameters end-to-end with cross-entropy loss. The [CLS] token accumulates a global sentence representation through the self-attention layers. Typical hyper-parameters: 2-5 epochs, learning rate 2e-5 to 5e-5, batch size 16-32.",
      hints: [
        "BERT's [CLS] token was designed to aggregate sequence-level information - it is the natural hook for classification.",
        "Fine-tuning end-to-end updates the pre-trained weights slightly to adapt the representation to the target task.",
      ],
    },
    {
      id: "q-nlp-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In multi-label text classification, a document can belong to zero or more classes simultaneously, so sigmoid (not softmax) activation is applied per class in the output layer.",
      correctAnswer: "true",
      explanation:
        "Multi-label classification requires independent binary decisions per class (e.g., a news article tagged as both 'politics' and 'economy'). Softmax normalises probabilities across classes to sum to 1, which is appropriate for mutually exclusive classes (multi-class). Sigmoid independently squashes each class logit to (0,1), allowing any subset of classes to be predicted. Binary cross-entropy loss is used per class, and thresholds (typically 0.5, but tunable via F1 optimisation on a dev set) convert probabilities to binary labels.",
      hints: [
        "Softmax forces probabilities to sum to 1 - if class A has 0.9, class B can only have 0.1. That is wrong for multi-label.",
        "With sigmoid, each class independently fires. A document can be 0.9 politics AND 0.8 economy simultaneously.",
      ],
    },
    {
      id: "q-nlp-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Hierarchical text classification (HTC) arranges classes in a taxonomy (e.g., Sports > Football > Penalty). Which challenge is unique to HTC compared to flat classification?",
      options: [
        "HTC requires more training data because hierarchical labels are noisier than flat labels",
        "HTC models must respect label consistency constraints - if a document is assigned a child label, its parent labels must also be assigned - while flat classifiers make independent predictions",
        "HTC is only applicable to document-level classification and cannot handle sentence-level inputs",
        "HTC requires the taxonomy to be balanced (equal leaves per parent) or performance degrades sharply",
      ],
      correctAnswer: 1,
      explanation:
        "In HTC, the taxonomy imposes a constraint: a document labelled 'Football' must also be labelled 'Sports'. Flat classifiers may violate this by predicting 'Football' without 'Sports'. HTC-specific architectures (e.g., HiAGM, BERT-HTC) propagate information up and down the hierarchy and enforce consistency either through structural regularisation or constrained decoding. Evaluation uses hierarchy-aware metrics that penalise inconsistency differently from flat precision/recall.",
      hints: [
        "If a flat classifier says 'Football=yes, Sports=no' that is logically inconsistent. HTC forces valid label subsets.",
        "Methods like HiAGM model the taxonomy structure explicitly using graph neural networks over the class hierarchy.",
      ],
    },
  ],

  // ── nlp-kp-35: Information Extraction ────────────────────────────────────
  "information-extraction-v2": [
    {
      id: "q-nlp-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Open Information Extraction (Open IE) differs from traditional closed IE mainly because it does what?",
      options: [
        "Extracts relations defined in a fixed, pre-specified schema (e.g., 'founded-by', 'located-in')",
        "Extracts (subject, relation, object) triples from text with no pre-defined relation schema, using linguistic patterns or neural models",
        "Requires annotated training data for every target relation type before extraction can begin",
        "Only works on structured databases and spreadsheets, not free text",
      ],
      correctAnswer: 1,
      explanation:
        "Open IE (Banko et al., 2007 - TextRunner; Mausam et al., 2012 - OLLIE; Stanovsky et al., 2018 - OpenIE 5) extracts arbitrary (argument1, relation-phrase, argument2) triples directly from text without a closed schema. This allows processing of any domain without labelled training data per relation. Closed IE requires defining target relations upfront (e.g., ACE, TAC KBP) and typically has higher precision for targeted extractions. Open IE sacrifices precision for broad coverage.",
      hints: [
        "Closed IE: you define 'CEO-of' beforehand and find instances. Open IE: you extract whatever relation the sentence expresses.",
        "Open IE output for 'Elon Musk founded SpaceX in 2002' would be (Elon Musk, founded, SpaceX) - no pre-defined schema needed.",
      ],
    },
    {
      id: "q-nlp-kp35-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In document-level relation extraction, which challenge does NOT appear in sentence-level relation extraction?",
      options: [
        "Ambiguous entity mentions (e.g., 'Apple' as company vs. fruit)",
        "Cross-sentence coreference - the two entities participating in a relation may appear in different sentences",
        "Class imbalance - most entity pairs do not stand in any target relation",
        "The need to encode both entities in the same neural representation",
      ],
      correctAnswer: 1,
      explanation:
        "Sentence-level RE extracts relations between entity pairs that appear within a single sentence. Document-level RE (DocRED, Re-DocRED) requires reasoning across sentences: 'Alice was born in Paris. The city is in France.' - the relation (Alice, country-of-birth, France) requires linking 'Paris' to 'France' across sentences via coreference. This demands graph-based or cross-sentence attention models (e.g., ATLOP, DocuNET) that sentence-level models cannot handle.",
      hints: [
        "Sentence-level RE sees both entities in one sentence context. Doc-level RE may see entity A in sentence 1 and entity B in sentence 10.",
        "Coreference chains (she \\to Alice, the city \\to Paris) must be resolved before cross-sentence relations can be extracted.",
      ],
    },
    {
      id: "q-nlp-kp35-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Event detection, a subtask of information extraction, involves identifying trigger words in text (e.g., the word 'exploded' signals an Attack event) and classifying them into predefined event types.",
      correctAnswer: "true",
      explanation:
        "Event detection (as defined in ACE 2005 and TAC KBP benchmarks) has two subtasks: (1) trigger identification - finding the word or phrase that most clearly expresses the occurrence of an event; (2) trigger classification - labelling the trigger with an event type (e.g., Conflict:Attack, Life:Die). A full event extraction system additionally identifies the arguments (who, what, when, where) of each event, which is the argument extraction subtask.",
      hints: [
        "In 'Three soldiers were killed in the blast', 'killed' and 'blast' are event triggers for Life:Die and Conflict:Attack respectively.",
        "Event detection is a sequence labelling or span classification problem - each token/span receives an event-type label or NONE.",
      ],
    },
  ],

  // ── nlp-kp-36: Dialogue Systems ──────────────────────────────────────────
  "dialogue-systems-v2": [
    {
      id: "q-nlp-kp36-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which component of a task-oriented dialogue system is responsible for tracking the user's goal across multiple turns (e.g., destination city, departure date)?",
      options: [
        "Natural Language Understanding (NLU) module",
        "Dialogue State Tracker (DST)",
        "Policy network",
        "Natural Language Generation (NLG) module",
      ],
      correctAnswer: 1,
      explanation:
        "In the classic pipeline for task-oriented dialogue (Henderson et al., 2014), the Dialogue State Tracker (DST) maintains the current belief state - a structured representation of the user's goal filled so far (e.g., {destination: 'Paris', date: None, class: 'business'}). The NLU extracts intents and slots from the current turn; the DST accumulates them across turns; the policy decides the next system action; the NLG generates the response. The MultiWOZ benchmark evaluates DST performance.",
      hints: [
        "If the user says 'Actually, make it Tuesday instead', the DST updates the date slot while keeping all other slots unchanged.",
        "DST output is a structured belief state (slot-value pairs), not free text - it feeds the policy module.",
      ],
    },
    {
      id: "q-nlp-kp36-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Open-domain dialogue systems (chatbots) and task-oriented dialogue systems share the same primary objective: completing a specific user task such as booking a flight or finding a restaurant.",
      correctAnswer: "false",
      explanation:
        "Task-oriented dialogue systems have a clear end goal - successfully completing a transaction (booking, reservation, query). Success is measured by task completion rate and efficiency. Open-domain dialogue systems (e.g., Blenderbot, LaMDA) aim for engaging, coherent, and persona-consistent conversation without a fixed task. They are evaluated on human-judged naturalness, engagingness, and coherence rather than task completion. The two paradigms have different architectures, training data, and evaluation metrics.",
      hints: [
        "Task-oriented: 'I want to book a flight to Tokyo on Monday.' Open-domain: 'What do you think about space travel?'",
        "One system has a completion criterion (flight booked or not); the other has no such end state.",
      ],
    },
    {
      id: "q-nlp-kp36-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In end-to-end neural task-oriented dialogue, what is the main advantage of end-to-end training over the classic pipeline (NLU \\to DST \\to Policy \\to NLG)?",
      options: [
        "End-to-end models always achieve higher task completion rates than pipeline models on all benchmarks",
        "End-to-end models propagate gradients through all components jointly, allowing components to adapt representations to each other and avoiding error propagation from upstream modules",
        "End-to-end models eliminate the need for any annotated dialogue data, requiring only raw conversation logs",
        "End-to-end models require a fixed ontology, which allows them to be deployed in new domains with no modification",
      ],
      correctAnswer: 1,
      explanation:
        "Classic pipeline systems suffer from error propagation: an NLU mistake (wrong intent) corrupts the DST which corrupts the policy. Each module is trained independently, so representations are not optimised for downstream use. End-to-end models (e.g., Simpletod, T5-based dialogue) are trained with a single loss over the full system, allowing each component to adapt its representations to downstream needs. However, they typically require more data and lose the interpretability of explicit belief states.",
      hints: [
        "In a pipeline, the DST sees only the NLU output - if NLU is wrong, DST cannot recover. In E2E, gradients from the final loss reach all components.",
        "Error propagation: a 90% accurate NLU + 90% accurate DST + 90% accurate policy gives only 72.9% overall accuracy if errors are independent.",
      ],
    },
  ],

  // ── nlp-kp-37: Semantic Textual Similarity ────────────────────────────────
  "semantic-textual-similarity": [
    {
      id: "q-nlp-kp37-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Sentence-BERT (SBERT) uses a bi-encoder architecture for semantic textual similarity. What is the primary advantage of bi-encoders over cross-encoders for large-scale retrieval?",
      options: [
        "Bi-encoders are always more accurate than cross-encoders on STS benchmarks",
        "Bi-encoders encode each sentence independently, enabling pre-computation of embeddings and O(1) retrieval via ANN; cross-encoders must process every query-document pair jointly at inference time",
        "Bi-encoders do not require training data; cross-encoders require thousands of labelled sentence pairs",
        "Bi-encoders only work for English; cross-encoders support multilingual comparison",
      ],
      correctAnswer: 1,
      explanation:
        "In a bi-encoder (Reimers & Gurevych, 2019), both sentences are encoded independently into fixed-length embeddings via BERT + pooling. All corpus embeddings can be pre-computed and stored; retrieval is a single ANN lookup per query - O(1) complexity at query time regardless of corpus size. Cross-encoders concatenate both sentences and run them through BERT jointly, producing a single similarity score. Cross-encoders are more accurate but require N forward passes for N candidates - impractical for million-scale retrieval. Common practice: use bi-encoder for retrieval, cross-encoder for re-ranking top-k results.",
      hints: [
        "Bi-encoder: embed sentence A once, embed sentence B once, compute cosine similarity - no joint processing.",
        "Cross-encoder: must run [A;B] through BERT for every (A, B) pair - N pairs = N forward passes.",
      ],
    },
    {
      id: "q-nlp-kp37-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The MTEB (Massive Text Embedding Benchmark) evaluates text embedding models across a single task type - semantic textual similarity - using only English datasets.",
      correctAnswer: "false",
      explanation:
        "First, let's recall what MTEB stands for. MTEB is the Massive Text Embedding Benchmark, and the word \"Massive\" is a hint about its scope.\n\n**Step 1:** Understand MTEB's scope. MTEB (Muennighoff et al., 2022) evaluates text embedding models across 56 datasets spanning 8 task categories: classification, clustering, pair classification, reranking, retrieval, STS (semantic textual similarity), summarisation, and bitext mining. It covers 112 languages, not just English.\n\n**Step 2:** Understand why it covers diverse tasks. The goal of MTEB is to prevent overfitting to STS benchmarks. If a model is only evaluated on STS tasks, it might develop representations specialised for STS but generalise poorly to other downstream tasks like retrieval or clustering. MTEB provides a holistic view of embedding quality across diverse use cases.\n\n**Step 3:** Recognise the practical value. Models like E5, GTE, and BGE are routinely compared on the MTEB leaderboard because it gives a comprehensive view of performance across many task types in many languages, rather than a narrow view of a single task type.\n\nTherefore, the statement is false — MTEB evaluates across 8 task categories (not just STS) and covers 112 languages (not just English).",
      hints: [
        "The 'M' in MTEB stands for Massive. What does this tell you about the scope of the benchmark?",
        "STS (semantic textual similarity) is just one of 8 task categories in MTEB. Bitext mining, retrieval, and classification are very different tasks — why would a comprehensive benchmark evaluate on all of them?",
      ],
    },
    {
      id: "q-nlp-kp37-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which loss function is most commonly used to fine-tune a bi-encoder for semantic similarity, and how does it operate?",
      options: [
        "Cross-entropy loss over a 5-class similarity scale (0-4), treating STS as a classification problem",
        "Cosine-similarity MSE loss - the model is trained to match the cosine similarity of its sentence embeddings to human-annotated similarity scores on a continuous scale",
        "Triplet loss - for each anchor sentence, a positive (similar) and negative (dissimilar) sentence are sampled; the model is trained to bring anchor-positive closer than anchor-negative by a margin",
        "Mean squared error over absolute token-level alignment scores computed by dynamic time warping",
      ],
      correctAnswer: 2,
      explanation:
        "First, let's recall what triplet loss is. Triplet loss is a contrastive loss function used to train bi-encoders for semantic similarity. The idea is to learn an embedding space where similar sentences are close together and dissimilar sentences are far apart.\n\n**Step 1:** Understand the triplet structure. For each training example, we have three sentences: an anchor $a$ (the query sentence), a positive $p$ (a sentence semantically similar to $a$), and a negative $n$ (a sentence semantically dissimilar to $a$). The model encodes all three into embedding vectors $e_a$, $e_p$, $e_n$.\n\n**Step 2:** Understand the loss function. Triplet loss penalises the model when the distance between the anchor and the negative is not sufficiently larger than the distance between the anchor and the positive. The loss is:\n\\[ L = \\max(0, \\|e_a - e_p\\| - \\|e_a - e_n\\| + \\text{margin}) \\]\n\nThis means: if the anchor-positive distance is already smaller than the anchor-negative distance minus the margin, the loss is 0. Otherwise, the model is penalised and updates its weights to bring $p$ closer and push $n$ further.\n\n**Step 3:** Understand in-batch negatives. Constructing explicit triplets is expensive. In practice, we use in-batch negatives: within a batch of $N$ sentences, every other sentence in the batch serves as a potential negative for each anchor. This gives $N-1$ negatives per anchor for free, making training efficient.\n\nTherefore, the answer is triplet loss — for each anchor sentence, a positive (similar) and negative (dissimilar) sentence are sampled, and the model is trained to bring anchor-positive closer than anchor-negative by a margin.",
      hints: [
        "Triplet loss has three components: anchor, positive, and negative. What does the margin enforce — what is the minimum required separation between anchor-positive and anchor-negative distances?",
        "In-batch negatives make triplet training efficient: for a batch of $N$ sentences, each anchor has $N-1$ negatives from the same batch. How does this avoid the need to construct explicit triplet pairs?",
      ],
    },
  ],

  // ── nlp-kp-38: Question Answering ─────────────────────────────────────────
  "question-answering-advanced": [
    {
      id: "q-nlp-kp38-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Extractive QA and abstractive QA differ in how they produce answers. Which statement is correct?",
      options: [
        "Extractive QA generates a free-form answer by paraphrasing; abstractive QA copies a span directly from the source passage",
        "Extractive QA identifies and copies a contiguous span from the source passage as the answer; abstractive QA generates the answer in the model's own words, potentially synthesising information from multiple sources",
        "Both extractive and abstractive QA always require multiple retrieved documents - neither can work with a single passage",
        "Extractive QA is always more accurate because it does not risk hallucination; abstractive QA is always less accurate",
      ],
      correctAnswer: 1,
      explanation:
        "Extractive QA (SQuAD, Rajpurkar et al., 2016) frames the task as predicting start and end token indices in a passage - the answer is literally a substring of the context. Models like BERT fine-tuned on SQuAD output span boundaries. Abstractive QA (NarrativeQA, ELI5) requires generating a new text sequence, often combining information from multiple sentences or paraphrasing. It is evaluated with ROUGE/BERTScore. Open-domain QA (DrQA, RAG) often uses extractive retrieval + abstractive generation.",
      hints: [
        "Extractive: the model highlights a passage span. Abstractive: the model writes a new sentence.",
        "SQuAD is extractive - the ground-truth answer is always a substring of the provided Wikipedia paragraph.",
      ],
    },
    {
      id: "q-nlp-kp38-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The SQuAD 2.0 benchmark added 'unanswerable questions' to SQuAD 1.1. What additional capability does a model need to handle SQuAD 2.0?",
      options: [
        "The model must perform multi-hop reasoning across multiple paragraphs to find answers",
        "The model must learn to abstain - to predict that no answer exists in the passage - in addition to extracting spans when an answer is present",
        "The model must generate abstractive answers when the passage does not contain the exact answer wording",
        "The model must perform coreference resolution to link pronouns to their antecedents before span extraction",
      ],
      correctAnswer: 1,
      explanation:
        "SQuAD 2.0 (Rajpurkar et al., 2018) adds ~50K unanswerable questions alongside the 100K answerable ones from SQuAD 1.1. The adversarial unanswerable questions are crafted to look plausible - the passage contains related information but not the actual answer. Models must both predict span boundaries AND output a confidence-based 'no answer' flag when the passage does not support an answer. This tests reading comprehension more realistically than the original version where an answer always existed.",
      hints: [
        "SQuAD 1.1: always extract a span. SQuAD 2.0: sometimes say 'the passage doesn't answer this question'.",
        "The adversarial design ensures that the passage always contains related words - the model cannot simply search for keywords.",
      ],
    },
    {
      id: "q-nlp-kp38-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In open-domain QA, the retriever-reader pipeline first retrieves relevant passages from a large corpus (e.g., Wikipedia) and then applies a reading comprehension model to extract or generate the answer from the retrieved passages.",
      correctAnswer: "true",
      explanation:
        "DrQA (Chen et al., 2017) introduced the retriever-reader paradigm for open-domain QA: (1) retriever: BM25 or DPR retrieves the top-k passages from a 5M-article Wikipedia corpus; (2) reader: a BERT/span-extraction model reads the top-k passages and predicts the answer span. This separates knowledge storage (indexed passages) from reasoning (reader model) and scales to any large text corpus. Modern RAG systems follow the same paradigm with generative readers.",
      hints: [
        "Open-domain QA has no provided passage - the system must first find relevant documents from a corpus, then read them.",
        "DrQA's two components map to two sub-tasks: passage retrieval (IR) and reading comprehension (NLP).",
      ],
    },
  ],

  // ── nlp-kp-39: Text Summarization ─────────────────────────────────────────
  "text-summarization": [
    {
      id: "q-nlp-kp39-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the key difference between extractive and abstractive text summarisation?",
      options: [
        "Extractive summarisation rewrites sentences in simpler language; abstractive summarisation copies sentences verbatim",
        "Extractive summarisation selects and concatenates sentences from the source document; abstractive summarisation generates new text that may paraphrase, compress, or fuse information from the source",
        "Extractive summarisation requires a neural model; abstractive summarisation uses only heuristic sentence scoring",
        "Extractive summarisation only works on news articles; abstractive summarisation works on all document types",
      ],
      correctAnswer: 1,
      explanation:
        "Extractive summarisation selects a subset of sentences (or passages) from the source document - the summary contains only verbatim spans. Methods: TextRank (graph-based), SummaRuNNer (neural classifier per sentence), BERT-extractive. Abstractive summarisation generates a new summary that may compress multiple sentences, paraphrase, fuse cross-sentence information, or omit details. Models: BART, T5, Pegasus. Abstractive is more powerful but prone to factuality errors (hallucinating unsupported content).",
      hints: [
        "Extractive = select existing sentences. Abstractive = write new sentences.",
        "If the summary contains the exact sentence 'The economy grew by 3%' copied from the article, it is extractive.",
      ],
    },
    {
      id: "q-nlp-kp39-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "ROUGE-1 and ROUGE-L are both recall-based metrics for summarisation evaluation. What aspect of summary quality does ROUGE NOT directly measure?",
      options: [
        "Unigram overlap between generated and reference summaries",
        "Longest common subsequence between generated and reference summaries",
        "Factual consistency - whether claims in the generated summary are supported by the source document",
        "N-gram co-occurrence frequency with the reference summary",
      ],
      correctAnswer: 2,
      explanation:
        "ROUGE (Lin, 2004) measures n-gram overlap and longest common subsequence between a generated summary and one or more human reference summaries. It captures lexical similarity but does not evaluate faithfulness/factuality - a summary can score high on ROUGE while containing hallucinated facts not present in the source document. Factual consistency evaluation requires separate methods: NLI-based (e.g., FactCC, DAE), QA-based (QuestEval), or model-based (AlignScore). This limitation is a major drawback of ROUGE as the primary summarisation metric.",
      hints: [
        "ROUGE compares generated text to reference text - it has no access to the source document, so it cannot check factuality.",
        "A generated summary that copies sentences from the source may be faithful but score low on ROUGE if it differs from the reference.",
      ],
    },
    {
      id: "q-nlp-kp39-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Pegasus (Zhang et al., 2020) uses a pre-training objective called Gap Sentence Generation (GSG) specifically designed for abstractive summarisation, where important sentences are masked and the model generates them.",
      correctAnswer: "true",
      explanation:
        "First, let's recall how standard BERT pretraining works. BERT uses a masked language modelling (MLM) objective where random individual tokens are masked and the model is trained to predict them. This is a token-level objective.\n\n**Step 1:** Understand what GSG does. Gap Sentence Generation (GSG) is a pretraining objective specifically designed for abstractive summarisation. Instead of masking individual tokens, GSG masks entire sentences. The model is trained to generate the masked sentences — essentially producing summaries of the remaining document.\n\n**Step 2:** Understand why sentences are selected by importance. In Pegasus, the sentences to mask are selected based on their ROUGE score with the rest of the document. Sentences with high ROUGE overlap with the rest of the document are considered less important (already captured by surrounding context), while sentences with low ROUGE overlap are considered more important and are masked. This means the model learns to generate the most salient content.\n\n**Step 3:** Recognise why this mirrors summarisation. GSG directly mirrors the abstractive summarisation task: given a document, generate the most important content. This makes Pegasus particularly well-suited for fine-tuning on downstream benchmarks.\n\nTherefore, the statement is true — Pegasus uses GSG, where important sentences are masked and the model generates them, specifically designed for abstractive summarisation.",
      hints: [
        "Standard MLM masks individual tokens. GSG masks entire sentences. Why is masking whole sentences more analogous to summarisation?",
        "The masked sentences are chosen by ROUGE importance — sentences that are well-covered by surrounding context are considered less important. What does the model learn to generate when these sentences are masked?",
      ],
    },
  ],

  // ── nlp-kp-40: LLM Safety ─────────────────────────────────────────────────
  "llm-safety-v2": [
    {
      id: "q-nlp-kp40-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Red teaming of LLMs involves what primary activity?",
      options: [
        "Training a second LLM to automatically generate safer outputs from the base model",
        "Systematically probing an LLM with adversarial prompts to identify harmful, unsafe, or undesired behaviours before deployment",
        "Fine-tuning an LLM exclusively on high-quality curated data to reduce the chance of harmful outputs",
        "Applying differential privacy during pre-training to prevent memorisation of sensitive training data",
      ],
      correctAnswer: 1,
      explanation:
        "Red teaming (Ganguli et al., 2022 - Anthropic; Perez et al., 2022) involves human or automated adversaries crafting inputs designed to elicit harmful, biased, or otherwise undesired outputs from an LLM. Goals: discover failure modes (harmful content generation, jailbreaks, privacy leaks) before public deployment. Red team findings inform safety fine-tuning, RLHF reward modelling, and system-level mitigations. Automated red teaming uses another LLM to generate adversarial prompts at scale.",
      hints: [
        "Red team = attack team. Their goal is to find weaknesses before the model is released.",
        "Red teaming produces a dataset of (adversarial prompt, harmful output) pairs that can be used to improve safety training.",
      ],
    },
    {
      id: "q-nlp-kp40-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Constitutional AI (CAI, Anthropic, 2022) trains an LLM to be helpful, harmless, and honest using a set of written principles. Which two-phase training process does CAI use?",
      options: [
        "Phase 1: train a reward model on human preference data; Phase 2: fine-tune the LLM with PPO using the reward model",
        "Phase 1: supervised fine-tuning on human-written constitutionally-aligned responses; Phase 2: RLHF with human preference labels for harmlessness",
        "Phase 1: the LLM critiques and revises its own outputs based on a written constitution (SL-CAI); Phase 2: RLAIF - train a preference model using AI-generated harmlessness labels, then fine-tune with RL",
        "Phase 1: filter training data using classifier-based safety checks; Phase 2: fine-tune on the filtered corpus with standard language modelling loss",
      ],
      correctAnswer: 2,
      explanation:
        "CAI (Bai et al., 2022) has two stages: (1) Supervised Learning from AI Feedback (SL-CAI): the model is prompted to generate a response, then critique it against a list of constitutional principles (e.g., 'Is this response harmful?'), then revise. The revised responses are used for SFT. (2) RL from AI Feedback (RLAIF): the AI generates preference labels (which response is more constitutional?) to train a harmlessness preference model, then RL fine-tunes the policy. This reduces dependence on human labellers for harmlessness feedback while scaling safety training.",
      hints: [
        "SL-CAI: self-critique and revision using the constitution. RLAIF: AI generates preference labels instead of humans.",
        "Constitutional = a written set of principles governing acceptable behaviour, analogous to a legal constitution.",
      ],
    },
    {
      id: "q-nlp-kp40-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Jailbreaking attacks on LLMs, such as the 'DAN' (Do Anything Now) prompt, succeed by exploiting fine-tuning data poisoning vulnerabilities in the model's weights.",
      correctAnswer: "false",
      explanation:
        "Most jailbreaking attacks are inference-time prompt-based exploits, not attacks on model weights. Jailbreaks craft prompts that trick the model into abandoning safety constraints through role-play scenarios ('Pretend you are an AI with no restrictions'), hypothetical framings, or suffix optimisation (GCG - Zou et al., 2023 - appends adversarial token suffixes). They exploit the tension between helpfulness (following instructions) and harmlessness (refusing harmful requests) baked in during RLHF. Data poisoning is a separate threat model that requires access to the training pipeline.",
      hints: [
        "DAN prompts are simple text inputs that users type into a chat interface - no access to model weights required.",
        "Prompt injection and jailbreaking are inference-time attacks. Training-time attacks (data poisoning, backdoors) are a different category.",
      ],
    },
  ],
};

const extra: Record<string, Question[]> = {
  "advanced-tokenization": [
    {
      id: "q-nlp-kp41-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Byte-level BPE (used in GPT-2) differs from standard BPE in that its base vocabulary consists of:",
      options: [
        "The 26 lowercase ASCII letters plus punctuation",
        "All 256 possible byte values, enabling lossless encoding of any Unicode text without an unknown-token symbol",
        "A fixed set of 1000 common English words",
        "All Unicode codepoints up to U+FFFF (65,536 symbols)",
      ],
      correctAnswer: 1,
      explanation: "Byte-level BPE starts with a vocabulary of 256 bytes. Any UTF-8 encoded text can be represented as a sequence of bytes, so byte-level BPE eliminates the need for an <UNK> token entirely. Rare Unicode characters or emojis may require many bytes, but they will always be tokenised. GPT-2, GPT-3, and GPT-4 use byte-level BPE, allowing the tokeniser to handle any text in any language or script.",
      hints: [
        "UTF-8 encodes any Unicode character as 1-4 bytes. With 256 base symbols, every character can be represented.",
        "No <UNK> token needed: every possible byte sequence is representable as a sequence of merge rules.",
      ],
    },
    {
      id: "q-nlp-kp41-2",
      type: "true-false",
      difficulty: "easy",
      question: "The unigram language model tokeniser (Kudo, 2018) is guaranteed to produce a unique tokenisation for any input string, just like BPE.",
      correctAnswer: "false",
      explanation: "Unlike BPE, the unigram language model tokeniser can produce multiple valid tokenisations for the same input string. It assigns probabilities to all possible segmentations using the Viterbi algorithm to find the most likely one, but can also sample from the distribution of tokenisations. This stochastic tokenisation (subword regularisation) is used as data augmentation during training, exposing the model to multiple segmentations and improving robustness.",
      hints: [
        "BPE deterministically applies merge rules left to right - unique output. Unigram LM uses a probabilistic model over all possible segmentations.",
        "Subword regularisation: randomly sample tokenisations during training instead of always using the argmax - unique to unigram LM.",
      ],
    },
    {
      id: "q-nlp-kp41-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "SentencePiece encodes whitespace as the special character ▁. What property does this give the tokeniser compared to systems that use whitespace as a delimiter?",
      options: [
        "It causes SentencePiece to always split on whitespace before applying merge rules, identical to BPE",
        "It makes tokenisation fully reversible: joining tokens and replacing ▁ with a space exactly recovers the original string, without requiring a separate detokenisation step",
        "It compresses text more efficiently because spaces are removed from the byte stream entirely",
        "It forces SentencePiece to normalise to lowercase before processing since ▁ replaces case information",
      ],
      correctAnswer: 1,
      explanation: "SentencePiece treats text as a raw Unicode stream with no pre-tokenisation whitespace split. Whitespace is replaced by ▁ before segmentation, making it part of the token (e.g., ▁world). This encoding is reversible: concatenate all tokens and replace ▁ with a space to recover the original string exactly, including original whitespace positions. This is critical for generation tasks that need to produce correctly spaced output.",
      hints: [
        "▁world means 'world that starts after a space'. It is a single token, not two.",
        "Reversible tokenisation: tokens \\to join \\to replace ▁ with space \\to original string. Used in T5, mT5, XLNet.",
      ],
    },
    {
      id: "q-nlp-kp41-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When a new technical term like 'ChatGPT' appears in text, how does a BPE tokeniser trained before this word existed handle it?",
      options: [
        "It produces a single <UNK> token because the word is not in the vocabulary",
        "It splits the word into known subword units using the learned merge rules, falling back to base characters if needed",
        "It refuses to process the input and raises an error",
        "It maps the entire word to the most similar vocabulary entry using cosine similarity of character n-grams",
      ],
      correctAnswer: 1,
      explanation: "BPE handles out-of-vocabulary words by decomposing them into known subword units. 'ChatGPT' would be split based on which merges are in the vocabulary - common substrings like 'Chat', 'G', 'PT' or further decomposed to characters if no merge rules apply. The worst case is character-level tokenisation. This is why BPE eliminates <UNK>: any string is representable as a sequence of base characters (or bytes for byte-level BPE).",
      hints: [
        "Apply merges greedily: find the longest vocabulary entry matching the current position.",
        "New words get decomposed into familiar parts. No <UNK> needed.",
      ],
    },
    {
      id: "q-nlp-kp41-5",
      type: "true-false",
      difficulty: "hard",
      question: "Increasing the BPE vocabulary size always improves downstream NLP task performance because more vocabulary coverage means fewer tokenisation splits.",
      correctAnswer: "false",
      explanation: "Vocabulary size involves a trade-off. A very large vocabulary reduces the number of tokens per sentence (good for attention complexity) but increases the embedding matrix size, reduces the frequency of each subword in training data (hurting embedding quality for rare tokens), and may cause vocabulary mismatch when transferring to new domains. The optimal vocabulary size depends on the languages, domain, and model architecture. GPT-4's ~100K vocabulary is larger than BERT's ~30K, balancing these considerations for multilingual and code data.",
      hints: [
        "Larger vocabulary: fewer tokens per sequence, larger embedding table, rarer individual tokens in training.",
        "For code-heavy models, a larger vocabulary is beneficial to represent keywords and identifiers as single tokens.",
      ],
    },
    {
      id: "q-nlp-kp41-6",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which tokenisation approach is used by the T5 model?",
      options: [
        "Character-level tokenisation with a fixed vocabulary of ASCII characters",
        "SentencePiece with the unigram language model, using a vocabulary of 32,000 tokens",
        "WordPiece with a vocabulary of 30,522 tokens (same as BERT)",
        "Byte-level BPE with a vocabulary of 50,257 tokens (same as GPT-2)",
      ],
      correctAnswer: 1,
      explanation: "T5 (Raffel et al., 2020) uses SentencePiece with the unigram language model trained on a large text corpus (C4 - Colossal Clean Crawled Corpus). The 32,000-token vocabulary is shared across all tasks. mT5 extends this to 250,000 tokens for 101 languages. SentencePiece's language-agnostic segmentation without pre-tokenisation makes it well-suited for multilingual models and text-to-text frameworks.",
      hints: [
        "BERT: WordPiece, 30,522 tokens. GPT-2: byte-level BPE, 50,257 tokens. T5: SentencePiece unigram, 32,000 tokens.",
        "T5 frames all NLP tasks as text-to-text - the same vocabulary handles both input and output for all tasks.",
      ],
    },
  ],

  "rag-advanced": [
    {
      id: "q-nlp-kp42-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Dense Passage Retrieval (DPR, Karpukhin et al. 2020) encodes queries and passages with separate BERT models and uses inner product similarity. How is DPR trained?",
      options: [
        "DPR is trained with unsupervised contrastive learning on pairs of documents from the same Wikipedia article",
        "DPR is trained with in-batch negatives: for a batch of (question, positive passage) pairs, other positive passages in the batch serve as negatives, plus hard negatives mined from BM25 top-k results that are not the gold passage",
        "DPR is trained with a cross-encoder reranker that labels positive and negative passages, then distils the labels to the bi-encoder",
        "DPR is pretrained with masked passage modelling where question tokens are masked and the model reconstructs them from the passage",
      ],
      correctAnswer: 1,
      explanation: "DPR requires supervised training on labelled (question, positive passage, negative passages) triples. In-batch negatives: for a batch of B question-passage pairs, each question treats the other B-1 positive passages as negatives - efficient with large batches. Hard negatives from BM25 (retrieved but wrong passages) teach the model to distinguish semantically related but incorrect passages from the true answer passage. This supervised signal allows DPR to capture semantic relevance beyond keyword overlap.",
      hints: [
        "In-batch negatives: B pairs \\to B questions \\times (B-1) negatives each. Efficient use of GPU memory.",
        "Hard negatives: BM25 top-k that look relevant but are wrong answers. These 'confusable' examples most improve retrieval quality.",
      ],
    },
    {
      id: "q-nlp-kp42-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Reciprocal Rank Fusion (RRF) combines results from multiple retrievers. For a document ranked r_s by BM25 and r_d by DPR, its RRF score is:",
      options: [
        "RRF(d) = BM25_score(d) + DPR_score(d) (linear combination of raw scores)",
        "RRF(d) = 1/(k + r_s) + 1/(k + r_d) where k is a constant (typically 60)",
        "RRF(d) = max(r_s, r_d) (best rank across retrievers)",
        "RRF(d) = r_s \\times r_d (product of ranks; lower is better)",
      ],
      correctAnswer: 1,
      explanation: "RRF (Cormack et al., 2009): score(d) = sum over retrievers of 1/(k + rank_i(d)). k=60 is standard: rank 1 gives 1/61\\approx0.016; rank 10 gives 1/70\\approx0.014. RRF is robust to score distribution differences between systems (BM25 scores in [0,30] vs. dense scores in [-1,1]) because it uses only rank order, not raw scores. Documents ranked highly by both retrievers receive high combined scores.",
      hints: [
        "RRF avoids normalising scores from different retrievers - rank is comparable; raw scores are not.",
        "k=60 prevents top-ranked documents from dominating: 1/(1+60) vs 1/(60+60) is only a 2\\times difference.",
      ],
    },
    {
      id: "q-nlp-kp42-3",
      type: "true-false",
      difficulty: "medium",
      question: "In a RAG system, increasing the number of retrieved passages (top-k) always improves answer quality because more context is better.",
      correctAnswer: "false",
      explanation: "Increasing k has diminishing returns and can degrade performance. Problems: (1) Noise dilution - irrelevant passages distract the generator and may introduce false information. (2) Lost-in-the-middle effect (Liu et al., 2023) - LLMs attend better to content at the start and end of context; information in the middle of long contexts is often ignored. (3) Context length limits - each passage consumes tokens from the fixed context window. Optimal k is task-dependent, typically 3-10 for most QA tasks.",
      hints: [
        "Lost-in-the-middle: LLMs attend better to context at the beginning and end of their window.",
        "More passages = more noise. A perfect retriever with k=1 (always correct passage) would be ideal.",
      ],
    },
    {
      id: "q-nlp-kp42-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Iterative RAG systems like IRCoT (Trivedi et al., 2022) interleave retrieval and reasoning. What problem do they solve that single-step RAG cannot?",
      options: [
        "Multi-hop RAG reduces retrieval cost by reusing cached passages across queries",
        "Multi-hop reasoning questions require evidence chains: answering requires fact F1 which enables a new retrieval query to find fact F2 - single retrieval cannot identify F2 without first knowing F1",
        "Multi-hop RAG eliminates the need for a vector index by using the LLM itself as a retriever",
        "Multi-hop RAG only applies to structured knowledge graphs, not free-text corpora",
      ],
      correctAnswer: 1,
      explanation: "Bridge questions require chained reasoning: 'What is the capital of the country where X was born?' needs (1) retrieve X's birthplace, (2) retrieve that country's capital. Single-step RAG cannot retrieve the second document without knowing the answer to the first sub-question. IRCoT interleaves CoT reasoning steps with retrieval: each reasoning step generates a new query, retrieves new evidence, and informs the next reasoning step.",
      hints: [
        "Bridge question: answer requires an intermediate fact not discoverable from the original query alone.",
        "IRCoT: reason \\to retrieve \\to reason further \\to retrieve again. Each retrieval is conditioned on previously gathered evidence.",
      ],
    },
    {
      id: "q-nlp-kp42-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which approximate nearest-neighbour (ANN) index is most commonly used for efficient dense retrieval in production RAG systems?",
      options: [
        "Brute-force exact search (computing inner product with all corpus vectors)",
        "FAISS (Facebook AI Similarity Search), particularly IVF-PQ (Inverted File Index with Product Quantization)",
        "Binary search trees partitioning the embedding space by coordinate",
        "Locality-sensitive hashing with random projections",
      ],
      correctAnswer: 1,
      explanation: "FAISS (Johnson et al., 2017) is the standard library for billion-scale dense retrieval. IVF partitions vectors into Voronoi cells; at query time only the nearest cells are searched. PQ compresses each vector from 768 floats to ~64 bytes using product quantization, reducing memory 10-100x. Together IVF-PQ achieves sub-millisecond retrieval over 100M+ vectors with modest recall loss. DPR and RAG papers use FAISS as the ANN backend.",
      hints: [
        "Brute force O(N) per query - infeasible for N > 10M. FAISS IVF-PQ achieves O(sqrt(N)) probe cost.",
        "Product quantization: split 768-dim vector into 8 subspaces of 96 dims, quantize each to 256 centroids. 8 bytes instead of 3072.",
      ],
    },
    {
      id: "q-nlp-kp42-6",
      type: "true-false",
      difficulty: "hard",
      question: "ColBERT (Khattab & Zaharia, 2020) uses a late-interaction architecture where query and document token embeddings interact at retrieval time via MaxSim, giving higher retrieval quality than bi-encoders while maintaining efficiency through pre-computed document embeddings.",
      correctAnswer: "true",
      explanation: "ColBERT encodes queries and documents as matrices of token embeddings. Similarity: MaxSim(Q,D) = sum_{q in Q} max_{d in D} q\\cdotd - each query token finds its best matching document token. Documents are encoded offline; at query time only O(|Q|*|D|) dot products are needed. This late interaction captures fine-grained semantic matching that single-vector bi-encoders compress away. ColBERT outperforms bi-encoders and is competitive with cross-encoders at retrieval speed.",
      hints: [
        "Bi-encoder: one vector per document, cosine similarity. ColBERT: token-level matrix, MaxSim. Richer interaction.",
        "MaxSim: each query token votes for the document it matches best. Sum over query tokens - weighted voting across all query terms.",
      ],
    },
  ],

  "structured-prediction": [
    {
      id: "q-nlp-kp43-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A linear-chain CRF models P(y|x) proportional to exp(sum of potential functions). What does it capture that a token-level softmax (MEMM) does not?",
      options: [
        "CRF models the joint distribution over the entire label sequence globally, avoiding the label bias problem that affects MEMMs which normalise locally at each step",
        "CRF requires fewer parameters than MEMM because it does not model transition probabilities",
        "CRF can handle variable-length inputs while MEMM requires fixed-length sequences",
        "CRF uses gradient-free inference while MEMM requires backpropagation",
      ],
      correctAnswer: 0,
      explanation: "The label bias problem in MEMMs: local normalisation means the model may ignore input features if transitions are dominated by the label prior. CRFs globally normalise over all label sequences via the partition function Z(x), so every label sequence competes directly. This allows CRFs to consider the entire observation sequence when making each labelling decision, typically outperforming MEMMs on NER and POS tagging.",
      hints: [
        "MEMM: P(y_t|y_{t-1}, x) normalized locally at each step. CRF: joint P(y|x) normalized globally over all sequences.",
        "Label bias: in MEMM, a state with few outgoing transitions channels probability regardless of input. CRF avoids this.",
      ],
    },
    {
      id: "q-nlp-kp43-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The Viterbi algorithm finds the most likely label sequence in a linear-chain CRF. For sequence length T and label set of size K, its time complexity is:",
      options: [
        "O(T * K) - linear in both T and K",
        "O(T * K^2) - quadratic in K because each step considers all K^2 transitions",
        "O(K^T) - exponential, by exhaustive enumeration",
        "O(T^2 * K) - dynamic programming over all pairs of positions",
      ],
      correctAnswer: 1,
      explanation: "Viterbi applies dynamic programming: at each time step t, for each label k, compute the maximum score over all previous labels k': delta_t(k) = max_{k'} [delta_{t-1}(k') + Psi(k, k', x_t)]. Each step requires K^2 operations (all K-to-K transitions). Total: O(T * K^2). For NER with K=17 BIO labels: 289*T operations - tractable. Compared to exhaustive search O(K^T): Viterbi is exponentially faster.",
      hints: [
        "At each step, maximise over K previous states x K current states = K^2 operations. T steps total.",
        "Same structure as HMM Viterbi. The CRF version uses unnormalised scores instead of log-probabilities.",
      ],
    },
    {
      id: "q-nlp-kp43-3",
      type: "true-false",
      difficulty: "medium",
      question: "BERT-CRF models for NER typically outperform BERT-softmax (predicting each token label independently) because the CRF layer enforces globally consistent label sequences, for example preventing invalid transitions like I-ORG following B-PER.",
      correctAnswer: "true",
      explanation: "BERT-CRF combines contextual BERT embeddings with CRF inference over the label sequence. The CRF transition matrix learns that I-ORG cannot follow B-PER, that I-X must follow B-X or I-X, etc. On CoNLL-2003 NER, BERT-CRF consistently achieves approximately 0.5-1 F1 higher than BERT-softmax. The improvement is especially large for rare entity types where local predictions are uncertain and global label constraints provide crucial guidance.",
      hints: [
        "BERT-softmax: each token classified independently. Errors are uncorrelated. BERT-CRF: globally optimal sequence - invalid transitions penalized.",
        "BIO constraints: I-ORG must follow B-ORG or I-ORG. CRF can learn this exactly; softmax relies on training data statistics.",
      ],
    },
    {
      id: "q-nlp-kp43-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Constrained beam search (CBS) for sequence generation guarantees that specific n-grams appear in the output. How does it track constraint satisfaction?",
      options: [
        "By adjusting the temperature during sampling to increase the probability of desired tokens",
        "By maintaining a (beam_hypothesis, constraint_state) tuple: each hypothesis tracks which required n-grams have been satisfied, and extensions that cannot satisfy all remaining constraints are pruned",
        "By post-processing the output to insert required n-grams at the most grammatical positions",
        "By fine-tuning the model on examples containing the required n-grams before each generation call",
      ],
      correctAnswer: 1,
      explanation: "CBS (Hokamp & Liu, 2017; Anderson et al., 2017) extends beam search with a constraint state machine. Each beam hypothesis is paired with a constraint state indicating which required lexical constraints have been satisfied. At each step, the beam only extends in ways that can still lead to all constraints being satisfied. This enables guaranteed inclusion of required terms - crucial for controlled MT, data-to-text generation, and enforcing terminology.",
      hints: [
        "Constrained beam search tracks a finite state machine over required n-grams alongside each beam hypothesis.",
        "Grid beam search: partition beams by number of satisfied constraints. Ensures diverse constraint-completion states in the beam.",
      ],
    },
    {
      id: "q-nlp-kp43-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In the IOB (Inside-Outside-Begin) tagging scheme for NER, a token tagged 'B-ORG' means:",
      options: [
        "The token is outside any named entity (O = Outside)",
        "The token begins a named entity of type ORG (organization)",
        "The token is inside (a continuation of) an ORG named entity",
        "The token marks the boundary between two consecutive ORG entities",
      ],
      correctAnswer: 1,
      explanation: "IOB tagging: B-TYPE = Begin a new entity of TYPE; I-TYPE = Inside (continuation of) an entity of TYPE; O = Outside (not part of any entity). 'Apple Inc. released' \\to B-ORG I-ORG O. The B tag is crucial for distinguishing adjacent entities of the same type: 'John Smith John Doe' \\to B-PER I-PER B-PER I-PER - without B, consecutive I tags would merge two separate people into one entity.",
      hints: [
        "B = Begin (first token of entity). I = Inside (subsequent tokens). O = Outside (non-entity).",
        "Adjacent same-type entities need B to separate them: B-PER I-PER B-PER I-PER for 'John Smith John Doe'.",
      ],
    },
    {
      id: "q-nlp-kp43-6",
      type: "true-false",
      difficulty: "hard",
      question: "The structured perceptron (Collins, 2002) for sequence labelling updates weights only when the predicted label sequence differs from the gold sequence, making it an online algorithm with convergence guarantees analogous to the standard perceptron.",
      correctAnswer: "true",
      explanation: "Structured perceptron update: if predicted y_hat is different from gold y*: w = w + Phi(x, y*) - Phi(x, y_hat), increasing the score of the gold sequence and decreasing the score of the incorrect prediction. Convergence theorem: if a separating weight vector exists (data is linearly separable in feature space), the structured perceptron converges in a bounded number of mistakes. With averaged weights (Collins 2002), it is robust and competitive with CRFs on NLP tasks.",
      hints: [
        "Structured perceptron = perceptron over structured outputs. Update when prediction is wrong; no update when correct.",
        "Averaged perceptron: average weights over all updates. Reduces overfitting to training data order.",
      ],
    },
  ],

  "evaluation-metrics-advanced": [
    {
      id: "q-nlp-kp44-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "BLEU score applies a brevity penalty (BP) to discourage short translations. Which formula correctly describes BP?",
      options: [
        "BP = min(1, |hypothesis| / |reference|)",
        "BP = min(1, exp(1 - |reference| / |hypothesis|))",
        "BP = |hypothesis| / max(|hypothesis|, |reference|)",
        "BP = 1 - |reference - hypothesis| / |reference|",
      ],
      correctAnswer: 1,
      explanation: "BLEU brevity penalty: BP = 1 if |hyp| >= |ref|, else exp(1 - |ref|/|hyp|). If hypothesis is half as long as reference: BP = exp(1-2) = exp(-1) approx 0.37. BLEU = BP * exp(sum w_n log p_n) where p_n is clipped n-gram precision, w_n = 1/N (typically N=4). The brevity penalty prevents the trivial strategy of outputting a single high-precision word.",
      hints: [
        "Without BP: a 1-word output matching a reference word would have 100% unigram precision. BP penalises short outputs.",
        "BP < 1 only when hypothesis is shorter than reference. BLEU is precision-based; recall is handled only implicitly via BP.",
      ],
    },
    {
      id: "q-nlp-kp44-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "BERTScore (Zhang et al., 2020) computes precision, recall, and F1 using contextual BERT embeddings. Given hypothesis tokens {h_i} and reference tokens {r_j}, BERTScore Recall is defined as:",
      options: [
        "R = (1/|H|) sum_i max_j cosine(h_i, r_j)",
        "R = (1/|R|) sum_j max_i cosine(h_i, r_j)",
        "R = cosine(mean(h_i), mean(r_j))",
        "R = sum_i sum_j cosine(h_i, r_j) / (|H| * |R|)",
      ],
      correctAnswer: 1,
      explanation: "BERTScore Precision P = (1/|H|) sum_i max_j cosine(h_i, r_j): each hypothesis token matched to best reference token. Recall R = (1/|R|) sum_j max_i cosine(h_i, r_j): each reference token matched to best hypothesis token. F1 = 2PR/(P+R). Recall measures how well the hypothesis covers reference content. BERTScore correlates better with human judgements than BLEU/ROUGE on translation and summarisation.",
      hints: [
        "Recall: for each reference token, find the best matching hypothesis token. Average over reference tokens.",
        "Precision: for each hypothesis token, find the best matching reference token. Average over hypothesis tokens.",
      ],
    },
    {
      id: "q-nlp-kp44-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "ROUGE-2 is computed as the bigram recall of the generated summary against reference summaries. For generated summary G and reference R, ROUGE-2 is:",
      options: [
        "ROUGE-2 = |bigrams(G) intersect bigrams(R)| / |bigrams(G)| (bigram precision)",
        "ROUGE-2 = sum_{bigrams in R} count_match(bigram) / sum_{bigrams in R} count(bigram) (bigram recall)",
        "ROUGE-2 = 2 * precision * recall / (precision + recall) (F1 over bigrams)",
        "ROUGE-2 = LCS(G, R) / |R| (longest common subsequence recall)",
      ],
      correctAnswer: 1,
      explanation: "ROUGE-N (Lin, 2004) is a recall-oriented metric: ROUGE_N = sum_{n-grams in ref} count_match(n-gram) / sum_{n-grams in ref} count(n-gram). Count_match = min(count in hypothesis, count in reference), preventing credit for repeated n-grams. ROUGE-2 captures fluency better than ROUGE-1 because bigrams encode local word order. In practice, the F1 version (combining ROUGE precision and recall) is often reported.",
      hints: [
        "ROUGE-N: how many reference bigrams appear in the hypothesis? Precision would ask the reverse.",
        "ROUGE-2 rewards summaries that share common word pairs with the reference in the same order.",
      ],
    },
    {
      id: "q-nlp-kp44-4",
      type: "true-false",
      difficulty: "medium",
      question: "Multi-dimensional quality metrics (MQM, Freitag et al. 2021) for MT evaluation, which assign weighted error counts across error categories, correlate more strongly with human direct assessment than BLEU.",
      correctAnswer: "true",
      explanation: "MQM (Multidimensional Quality Metrics) asks annotators to mark specific errors (mistranslation, omission, addition, fluency) and assign severity (critical, major, minor). The MQM score sums weighted error penalties per sentence. Freitag et al. (2021, 2022) showed MQM annotations correlate much more strongly with human direct assessment than BLEU. Modern learned metrics (COMET, BLEURT) trained on DA scores also significantly outperform BLEU, motivating the shift away from BLEU in the MT community.",
      hints: [
        "BLEU is a surface-level n-gram metric. MQM captures semantic and fluency errors explicitly.",
        "The WMT shared task has shifted from BLEU to human DA and learned metrics as primary evaluation.",
      ],
    },
    {
      id: "q-nlp-kp44-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In human evaluation of NLG systems, direct assessment (DA) asks annotators to:",
      options: [
        "Compare two system outputs side-by-side and pick the better one (pairwise preference)",
        "Rate the quality of a single output on a numeric scale (e.g., 0-100) without comparing to other systems",
        "Identify specific errors by category and severity (like MQM)",
        "Rank all system outputs from best to worst simultaneously",
      ],
      correctAnswer: 1,
      explanation: "Direct assessment (Graham et al., 2013) presents each annotator with a single output and asks for an absolute quality score on a continuous scale (0-100). Scores are z-normalised per annotator to account for different rating styles. Advantages over pairwise comparison: more scalable (no need to compare all pairs), allows fine-grained quality measurement, and aggregates well. DA is the primary human evaluation method in WMT MT evaluation campaigns.",
      hints: [
        "Pairwise: which is better? DA: how good is this single output? Two different experimental designs.",
        "Z-normalisation corrects for annotators who always score high or low: subtract annotator mean, divide by annotator std.",
      ],
    },
    {
      id: "q-nlp-kp44-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The METEOR metric for machine translation evaluation differs from BLEU by including:",
      options: [
        "Character-level n-gram matching instead of word-level n-gram matching",
        "Recall as well as precision, synonym and stem matching, and a fragmentation penalty for non-consecutive matches",
        "Perplexity under a language model as a fluency component",
        "BERTScore-style contextual embedding matching for semantic similarity",
      ],
      correctAnswer: 1,
      explanation: "METEOR (Banerjee & Lavie, 2005) computes an F-score combining unigram precision and recall (harmonic mean), uses synonym dictionaries and Porter stemmer to match morphological variants and synonyms beyond exact matches, and applies a fragmentation penalty for non-contiguous matches. METEOR correlates better with human judgements than BLEU at the sentence level precisely because it captures recall and semantic equivalence that pure precision-based BLEU misses.",
      hints: [
        "BLEU: precision-only, exact match. METEOR: F1 (precision+recall), stems, synonyms, fragmentation penalty.",
        "Fragmentation: 'the big red car' matching 'the car big red' (same words, wrong order) gets penalised by the fragmentation penalty.",
      ],
    },
  ],
};

const extra2: Record<string, Question[]> = {
  "bleu-detail-and-human-eval": [
    {
      id: "q-nlp-kp45-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "BLEU uses clipped n-gram precision. What does 'clipping' mean in this context?",
      options: [
        "Long translations are clipped to the length of the reference before scoring",
        "The count of each n-gram in the hypothesis is clipped to the maximum count of that n-gram in any single reference, preventing credit for repeating n-grams more times than they appear in references",
        "N-grams beyond order 4 are clipped and not counted",
        "Hypothesis words that do not appear in any reference are clipped (removed) before scoring",
      ],
      correctAnswer: 1,
      explanation: "BLEU clipping prevents a degenerate hypothesis like 'the the the the' from scoring 100% unigram precision against a reference containing one 'the'. The count of each n-gram in the hypothesis is capped at its maximum count in any single reference. Modified precision p_n = sum_ngrams min(count_hyp, max_count_ref) / sum_ngrams count_hyp. This ensures a system cannot game BLEU by repeating high-frequency words.",
      hints: [
        "Without clipping: 'the the the' against reference 'the cat sat' \\to 3/3 = 100% unigram precision. With clipping: min(3,1)/3 = 1/3.",
        "Clipping is applied before summing counts across the entire test set.",
      ],
    },
    {
      id: "q-nlp-kp45-2",
      type: "true-false",
      difficulty: "medium",
      question: "The Spearman rank correlation coefficient is commonly used to assess the agreement between an automatic metric (like BLEU or COMET) and human evaluation scores, because it measures monotonic relationship without assuming a linear relationship.",
      correctAnswer: "true",
      explanation: "Spearman's rho measures whether the ranking of systems by an automatic metric agrees with the ranking by human evaluation. It does not assume the relationship is linear (unlike Pearson correlation). For system-level evaluation, Spearman's rho is appropriate because we care about whether the metric ranks systems the same way humans do, not whether the raw scores are proportional. A metric with high Spearman rho is considered a good proxy for human judgement.",
      hints: [
        "Spearman = Pearson applied to ranks. If A > B > C for humans and A > B > C for BLEU: perfect rank agreement.",
        "System-level vs. segment-level correlation: metrics like BLEU are much more reliable at system level than at the sentence level.",
      ],
    },
    {
      id: "q-nlp-kp45-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "COMET (Rei et al., 2020) is a learned MT evaluation metric trained on human quality judgements. What type of human annotation does COMET-DA use?",
      options: [
        "Pairwise preference annotations (annotators choose the better of two translations)",
        "Direct assessment scores (annotators rate each translation on a 0-100 scale without comparison)",
        "MQM error annotations (annotators mark and categorize errors in each translation)",
        "Relative ranking of all system outputs for each source sentence simultaneously",
      ],
      correctAnswer: 1,
      explanation: "COMET-DA (Direct Assessment) is trained on DA scores: annotators rate each translation independently on a 0-100 scale, which are then z-normalised. COMET uses a cross-lingual encoder (XLM-R) to jointly encode the source, hypothesis, and reference (for reference-based versions). It outperforms BLEU significantly on segment-level correlation with human judgement. COMET-QE (Quality Estimation) is a reference-free variant using source and hypothesis only.",
      hints: [
        "COMET-DA uses 0-100 DA scores. COMET-MQM uses MQM error annotations. Both trained on WMT human evaluation data.",
        "COMET takes (source, hypothesis, reference) as input - it can use reference information the MT system did not have access to.",
      ],
    },
    {
      id: "q-nlp-kp45-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Inter-annotator agreement (IAA) is important in NLP annotation projects. Cohen's kappa is preferred over raw percent agreement because it:",
      options: [
        "Measures agreement faster than computing raw percent agreement",
        "Corrects for chance agreement: two annotators randomly guessing the same distribution would agree some fraction of the time, and kappa normalises this out",
        "Is always higher than raw percent agreement, making results look better",
        "Can only be applied to binary annotations, making it simpler to compute",
      ],
      correctAnswer: 1,
      explanation: "Cohen's kappa: k = (P_o - P_e) / (1 - P_e) where P_o is observed agreement and P_e is expected agreement by chance. If labels are unbalanced (e.g., 90% of examples are negative), two random annotators would agree 81% (0.9\\times0.9) of the time. Kappa normalises this: k=0 means agreement at chance level, k=1 means perfect agreement. For NLP tasks, kappa > 0.8 is generally considered high agreement.",
      hints: [
        "P_e: if annotators independently sample from the label distribution, what fraction would match by chance?",
        "Kappa for NER: annotators often agree on O tags (most tokens) but disagree on entity boundaries, giving misleadingly high raw agreement.",
      ],
    },
    {
      id: "q-nlp-kp45-5",
      type: "true-false",
      difficulty: "easy",
      question: "ROUGE-L is based on the longest common subsequence (LCS) between hypothesis and reference and does not require words to appear consecutively, making it more flexible than ROUGE-2 which requires consecutive bigrams.",
      correctAnswer: "true",
      explanation: "ROUGE-L computes the LCS between hypothesis H and reference R: ROUGE_L = LCS(H,R)/|R| (recall-based). LCS rewards shared word sequences even if non-consecutive: 'the cat sat mat' and 'the fluffy cat quietly sat on a mat' share LCS 'the cat sat mat' (length 4). ROUGE-2 only counts adjacent bigram matches. ROUGE-L captures sentence-level structure and in-sequence word order without requiring contiguous matches.",
      hints: [
        "LCS: longest sequence of words appearing in both H and R in the same order but not necessarily consecutively.",
        "ROUGE-L handles paraphrases better than ROUGE-2 because synonymous insertions/deletions don't break LCS as they break bigrams.",
      ],
    },
    {
      id: "q-nlp-kp45-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "SummEval (Fabbri et al., 2021) is a benchmark that evaluates summarisation metrics. Which four dimensions of summary quality does it cover with human annotations?",
      options: [
        "BLEU, ROUGE-1, ROUGE-2, ROUGE-L (the four standard automatic metrics)",
        "Coherence, consistency (faithfulness), fluency, and relevance",
        "Precision, recall, F1, and accuracy relative to the reference summary",
        "Grammaticality, lexical diversity, length appropriateness, and factual density",
      ],
      correctAnswer: 1,
      explanation: "SummEval (Fabbri et al., 2021) collected expert human annotations on four dimensions for CNN/DailyMail summaries: (1) Coherence - logical structure and organisation; (2) Consistency/Faithfulness - factual alignment with the source; (3) Fluency - grammatical quality of individual sentences; (4) Relevance - coverage of important information. These dimensions allow evaluating whether automatic metrics capture each aspect of quality, revealing that ROUGE correlates poorly with consistency - the dimension most important for practical use.",
      hints: [
        "Consistency (faithfulness) is the most practically important dimension - hallucinated summaries can score well on ROUGE.",
        "SummEval revealed that NLI-based metrics correlate better with consistency than n-gram metrics like ROUGE.",
      ],
    },
  ],
};

Object.assign(questions, extra, extra2);

registerQuestions(questions);
export default questions;
