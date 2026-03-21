import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  // ── nlp-kp-1: Tokenization & Subword Methods ──────────────────────────────
  'tokenization': [
    {
      id: 'q-nlp-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'BPE tokenization starts with a character-level vocabulary and then does what?',
      options: [
        'Splits the rarest words into single characters and leaves frequent words intact',
        'Iteratively merges the most frequent adjacent symbol pair, adding each merged symbol to the vocabulary',
        'Assigns each word a fixed-length subword sequence using a lookup table',
        'Randomly samples character n-grams until the vocabulary reaches the desired size',
      ],
      correctAnswer: 1,
      explanation: 'BPE (Gage, 1994; Sennrich et al., 2016) begins with a vocabulary of individual characters plus an end-of-word marker, then greedily merges the most frequent adjacent pair at each step. After k merges, the vocabulary contains the original characters plus k learned subword units. This means common morphemes like "ing" or "un" become single tokens, while rare words are split into recognisable pieces — eliminating OOV entirely.',
      hints: [
        'Think of BPE as a bottom-up process: start small (characters), merge upward.',
        'At each step only one merge rule is added. After 10,000 such merges you have a vocabulary of ~10,000 subword units.',
      ],
    },
    {
      id: 'q-nlp-kp1-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The phrase "The bank can guarantee deposits will eventually cover future tuition costs" contains an ambiguous word. Which word is it, and why?',
      options: [
        '"guarantee" — it can mean either legal promise or mathematical certainty',
        '"bank" — it could refer to a financial institution or the bank of a river',
        '"cover" — it can mean pay for or physically cover something',
        '"deposits" — it could be financial deposits or geological sediment deposits',
      ],
      correctAnswer: 1,
      explanation: 'This classic example (Jurafsky & Martin) illustrates lexical ambiguity. "Bank" has multiple word senses: financial institution vs. river bank. Static embeddings (Word2Vec, GloVe) assign a single vector to "bank" that blurs these senses. Contextualised models (BERT) produce different vectors for "bank" depending on whether nearby words are financial (deposits, tuition) or geographic (river, shore), directly addressing this polysemy problem.',
      hints: [
        'Static embeddings assign one vector per word form regardless of context — what problem arises for words with two very different meanings?',
        'BERT\'s key innovation over Word2Vec is producing context-sensitive representations. Why would that help here?',
      ],
    },
    {
      id: 'q-nlp-kp1-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'WordPiece (used in BERT) selects each merge by choosing the pair that maximises the likelihood of the training corpus under the language model, rather than the pair with the highest raw count.',
      correctAnswer: 'true',
      explanation: 'WordPiece scores each candidate merge by how much it increases the log-likelihood of the training data: score(A, B) = count(AB) / (count(A) × count(B)). This means a rare pair that always co-occurs (high PMI) can be preferred over a more frequent but less predictive pair, producing a vocabulary better suited to language modelling than BPE\'s raw-count criterion.',
      hints: [
        'BPE: pick the pair with the highest raw count. WordPiece: pick the pair that most improves the LM.',
        'Think pointwise mutual information — a pair that always appears together has high PMI even if neither word is common.',
      ],
    },
  ],

  // ── nlp-kp-2: Word Embeddings ─────────────────────────────────────────────
  'word-embeddings': [
    {
      id: 'q-nlp-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The phrase "The bank can guarantee deposits will eventually cover future tuition costs" contains an ambiguous word. Which word is it, and why?',
      options: [
        '"guarantee" — it can mean either legal promise or mathematical certainty',
        '"bank" — it could refer to a financial institution or the bank of a river',
        '"cover" — it can mean pay for or physically cover something',
        '"deposits" — it could be financial deposits or geological sediment deposits',
      ],
      correctAnswer: 1,
      explanation: 'This classic example (Jurafsky & Martin) illustrates lexical ambiguity. "Bank" has multiple word senses: financial institution vs. river bank. Static embeddings (Word2Vec, GloVe) assign a single vector to "bank" that blurs these senses. Contextualised models (BERT) produce different vectors for "bank" depending on whether nearby words are financial (deposits, tuition) or geographic (river, shore), directly addressing this polysemy problem.',
      hints: [
        'Static embeddings assign one vector per word form regardless of context — what problem arises for words with two very different meanings?',
        'BERT\'s key innovation over Word2Vec is producing context-sensitive representations. Why would that help here?',
      ],
    },
    {
      id: 'q-nlp-kp2-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Word2Vec Skip-Gram is trained to predict surrounding context words from a centre word. What does this objective teach the model?',
      options: [
        'The syntactic parse tree of every sentence in the corpus',
        'Which words appear in similar contexts, encoding distributional similarity as geometric proximity',
        'The exact frequency rank of every word in the training corpus',
        'A one-hot encoding of each word compressed into a lower-dimensional space',
      ],
      correctAnswer: 1,
      explanation: 'The distributional hypothesis (Firth, 1957; Harris, 1954) states that words in similar contexts have similar meanings. Skip-Gram operationalises this: it trains a model to predict which words tend to co-occur within a window of k words. Words that appear in similar contexts — "king" and "queen" both appearing near "throne", "crown", "reign" — end up with similar embedding vectors. The famous analogy king − man + woman ≈ queen emerges because these regularities are captured in the vector space.',
      hints: [
        '"You shall know a word by the company it keeps" (Firth, 1957) — this is the core idea Skip-Gram exploits.',
        'If "doctor" and "physician" appear near the same context words (patient, hospital, treatment), what should their vectors look like?',
      ],
    },
    {
      id: 'q-nlp-kp2-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'GloVe trains on individual context-window co-occurrences like Word2Vec, processing one (word, context) pair at a time.',
      correctAnswer: 'false',
      explanation: 'GloVe (Global Vectors, Pennington et al. 2014) builds a global word–word co-occurrence matrix X over the entire corpus first, then factorises it using a weighted least-squares objective: minimise Σ f(X_ij)(w_i·w̃_j + b_i + b̃_j − log X_ij)². The word "Global" in the name signals that it uses corpus-wide aggregate statistics rather than local window samples. This global view makes GloVe more data-efficient than Skip-Gram\'s stochastic sampling.',
      hints: [
        'The name GloVe contains the word "Global" — what does that suggest about its use of the corpus?',
        'Word2Vec samples individual (word, context) training pairs. GloVe first builds a big count matrix and trains on those counts directly.',
      ],
    },
  ],

  // ── nlp-kp-3: Language Modeling & Perplexity ──────────────────────────────
  'language-modeling': [
    {
      id: 'q-nlp-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A bigram language model trained on a corpus gives P(want|I) = 0.33, P(Chinese|want) = 0.0065, P(food|Chinese) = 0.52, P(</s>|food) = 0.68. What is P(<s> I want Chinese food </s>), assuming P(I|<s>) = 0.25?',
      options: [
        'Approximately 0.000031 — multiply the five bigram probabilities together',
        'Approximately 0.0019 — average the five probabilities',
        'Approximately 0.25 — only the first bigram probability matters',
        'Approximately 1.0 — it is a grammatical English sentence',
      ],
      correctAnswer: 0,
      explanation: 'By the chain rule and the Markov (bigram) approximation, P(sentence) ≈ Π P(wi|context). Here: 0.25 × 0.33 × 0.0065 × 0.52 × 0.68 ≈ 0.000019. (The exact numbers from Jurafsky & Martin Fig 3.2 give ~0.000019–0.000031 depending on rounding.) The key insight is that sentence probability is a product of conditional bigram probabilities, and the product of many small fractions rapidly becomes very small — hence the use of log space in practice.',
      hints: [
        'The chain rule: P(w1...wn) = P(w1)P(w2|w1)...P(wn|w_{n-1}) for a bigram model.',
        'Multiply: 0.25 × 0.33 × 0.0065 × 0.52 × 0.68. Note that even a very probable 5-word sentence has probability < 0.001.',
      ],
    },
    {
      id: 'q-nlp-kp3-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A language model achieves perplexity 109 on Wall Street Journal text with a trigram model, versus 170 with a bigram and 962 with a unigram. What does the lower trigram perplexity tell us?',
      options: [
        'The trigram model has a smaller vocabulary and fewer parameters',
        'The trigram model assigns higher probability to the test set, meaning it is less "surprised" by each word',
        'The trigram model generates more grammatical sentences when sampled from',
        'The trigram model takes three times as long to evaluate as the unigram model',
      ],
      correctAnswer: 1,
      explanation: 'Perplexity(W) = P(w1...wN)^(-1/N) — the per-word inverse probability of the test set. Lower perplexity = higher probability = the model better predicts the test text. A trigram model conditioning on the two previous words gives better predictions than a bigram (one word) or unigram (no context). The numbers 962 → 170 → 109 (from Jurafsky & Martin, WSJ experiments) show how longer context helps dramatically, but with diminishing returns.',
      hints: [
        'Perplexity = inverse probability normalised by length. The better the model predicts the test set, the __ the perplexity.',
        'Think of perplexity as the weighted branching factor: a perplexity of 109 means the model is on average choosing among ~109 equally likely next words.',
      ],
    },
    {
      id: 'q-nlp-kp3-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In n-gram language modelling, storing and combining probabilities in log space (log-probabilities) is standard practice because multiplying many probabilities together causes numerical underflow.',
      correctAnswer: 'true',
      explanation: 'Probabilities are ≤ 1, so multiplying N of them produces a number that shrinks exponentially. For a 100-word sentence with average per-word probability 0.01, the sentence probability is 0.01^100 = 10^-200, far below the smallest float64 value (~10^-308 near the limit). Working in log space converts products to sums: log P(w1...wN) = Σ log P(wi|context), which stays in a manageable numeric range. The exp is taken only at the end if raw probabilities are needed.',
      hints: [
        'float64 underflows below ~10^-308. A 100-word sentence with P≈0.001 per word has sentence probability 0.001^100 = 10^-300.',
        'log(a × b) = log(a) + log(b). Addition never underflows the way multiplication does.',
      ],
    },
  ],

  // ── nlp-kp-4: Sequence-to-Sequence Models & Encoder-Decoder ──────────────
  'seq2seq': [
    {
      id: 'q-nlp-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the original RNN encoder-decoder model (Sutskever et al., 2014), information passes from encoder to decoder via a single fixed-size vector. What fundamental limitation does this create?',
      options: [
        'The model cannot be trained with backpropagation through time',
        'The entire source sentence must be compressed into one vector regardless of length, losing detail for long inputs',
        'The decoder cannot generate sequences longer than the encoder input',
        'The model requires source and target to share the same vocabulary',
      ],
      correctAnswer: 1,
      explanation: 'The encoder compresses the entire source into one context vector (the final hidden state). For short sentences this works; for long sentences the vector becomes a bottleneck — it cannot preserve all lexical and syntactic detail from 30+ source words. This is the "information bottleneck" problem that Bahdanau attention was designed to solve in 2015.',
      hints: [
        'Imagine summarising a 50-word sentence into a single 512-dimensional vector. What details might get dropped?',
        'The attention mechanism was invented as a direct fix to this bottleneck. What does attention let the decoder do that a single vector cannot?',
      ],
    },
    {
      id: 'q-nlp-kp4-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'During seq2seq training with teacher forcing, the decoder receives the gold-standard previous token as input. During inference it receives its own previous prediction. What problem does this mismatch cause?',
      options: [
        'The model overfits to the training vocabulary and cannot handle unseen words',
        'Exposure bias: the model was never trained to recover from its own errors, so early mistakes compound during inference',
        'The model produces outputs that are shorter than the gold-standard target sequences',
        'Gradient flow through the decoder is blocked, causing vanishing gradients',
      ],
      correctAnswer: 1,
      explanation: 'Teacher forcing trains the model on a distribution that only includes perfect previous tokens. At test time, an incorrect token at step t changes the distribution of inputs at step t+1 onward — a distribution the model has never seen. This "exposure bias" can cause error cascades. Scheduled sampling (Bengio et al., 2015) and other approaches try to bridge this training/inference gap by gradually replacing gold tokens with model predictions during training.',
      hints: [
        'Exposure bias refers to what the model was exposed to during training vs. inference.',
        'If the model generates "the cat sat on the" but should have said "the dog", every subsequent word must now be conditioned on "the" — a prefix it never trained on.',
      ],
    },
    {
      id: 'q-nlp-kp4-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Seq2seq models with RNN encoders process all source tokens before the decoder generates any output token, making the encoder phase fully parallelisable across tokens.',
      correctAnswer: 'false',
      explanation: 'RNN encoders process tokens sequentially: h_t depends on h_{t-1}. This sequential dependency means you cannot compute h_3 until h_2 is done — the encoder phase is O(n) serial steps, not parallelisable. This is a key reason the Transformer replaced RNNs: its self-attention computes representations for all positions simultaneously in O(1) serial steps (though O(n²) in compute).',
      hints: [
        'Does computing h_3 require h_2 to already be computed?',
        'Parallelism is what makes GPUs efficient. If steps must run in sequence, GPU parallelism is wasted.',
      ],
    },
  ],

  // ── nlp-kp-5: Attention Mechanism ─────────────────────────────────────────
  'attention-mechanism': [
    {
      id: 'q-nlp-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In Bahdanau attention, at each decoder step t the model computes alignment scores e_{t,s} = v^T tanh(W_1 h_t + W_2 ĥ_s) for all encoder states ĥ_s. What do the resulting attention weights α_{t,s} represent?',
      options: [
        'The probability that source token s is syntactically the head of target token t',
        'A soft, learnable alignment: how much the decoder should focus on source position s when generating target token t',
        'The probability that source and target token vocabularies overlap at position s',
        'The cosine similarity between source token s and the target embedding at step t',
      ],
      correctAnswer: 1,
      explanation: 'The α_{t,s} are softmax-normalised alignment scores. They represent a learned soft alignment — the degree to which source position s is relevant when generating target position t. For English-French translation, when generating "la" the model attends strongly to "the" in the source. Crucially, different target tokens can attend to different source positions, and multiple source tokens can receive nonzero weight simultaneously ("soft" vs. hard alignment).',
      hints: [
        'The α values are produced by a softmax over all source positions, so they sum to 1 — they behave like a probability distribution over source positions.',
        'Contrast hard alignment (IBM models): assign each target word to exactly one source word. Soft alignment: assign fractional weights to all source words.',
      ],
    },
    {
      id: 'q-nlp-kp5-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Scaled dot-product attention computes Attention(Q,K,V) = softmax(QK^T / √d_k)V. Why divide by √d_k rather than, say, d_k?',
      options: [
        'Dividing by √d_k ensures the attention weights sum to exactly d_k',
        'When Q and K vectors have unit variance, their dot product has variance d_k; dividing by √d_k restores unit variance, keeping softmax gradients healthy',
        'It normalises for different sequence lengths so longer sequences get smaller attention weights',
        'It converts the dot products from cosine similarity to Euclidean distance',
      ],
      correctAnswer: 1,
      explanation: 'If q and k are d_k-dimensional vectors with zero mean and unit variance, q·k = Σ q_i k_i has variance d_k (sum of d_k unit-variance terms). For large d_k (e.g., 512 or 1024) this makes dot products large, pushing softmax into near-zero gradient "saturation" regions. Dividing by √d_k brings the variance back to 1, keeping gradients flowing. The Transformer paper (Vaswani et al., 2017) derives this from the statistical properties of the dot product.',
      hints: [
        'Var(q·k) = d_k × Var(q_i k_i) = d_k × 1 for unit-variance entries. To get variance 1, divide by √d_k.',
        'At large values softmax output is nearly one-hot; gradient of softmax near a one-hot is near zero. That is the saturation problem being avoided.',
      ],
    },
    {
      id: 'q-nlp-kp5-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Luong attention (Luong et al., 2015) uses an additive (MLP) scoring function, while Bahdanau attention uses a dot-product or bilinear scoring function.',
      correctAnswer: 'false',
      explanation: 'It is the reverse: Bahdanau (2015) introduced additive/concat attention — score(h_t, ĥ_s) = v^T tanh(W[h_t; ĥ_s]). Luong (2015) introduced simpler multiplicative variants: dot (h_t · ĥ_s), general (h_t^T W ĥ_s), and concat. Luong\'s dot and general forms are faster because they avoid the extra tanh and learnable vector v. This is why "scaled dot-product attention" in Transformers is sometimes called "Luong-style".',
      hints: [
        'Remember the order: Bahdanau (2014/15) came first with the MLP approach; Luong (2015) came second with simpler dot-product variants.',
        'Additive attention adds the two vectors after projecting them; multiplicative takes their dot product (possibly after a linear transform).',
      ],
    },
  ],

  // ── nlp-kp-6: Transformer Architecture ───────────────────────────────────
  'transformer-architecture': [
    {
      id: 'q-nlp-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Multi-head attention with h=8 heads and model dimension d_model=512 uses d_k = d_v = 64 per head. Why run 8 separate attention computations rather than one big one?',
      options: [
        'To reduce the total parameter count by a factor of 8 compared to single-head attention',
        'To let the model jointly attend from different representation subspaces — each head can specialise in different syntactic or semantic relationships',
        'To ensure each head processes a different segment of the input sequence',
        'To make the attention computation parallelisable across 8 GPUs',
      ],
      correctAnswer: 1,
      explanation: 'Each head learns separate Q, K, V projections, allowing it to attend to different aspects simultaneously. Empirically, different heads specialise: one head may track subject-verb agreement, another coreferential pronouns, another positional proximity. Concatenating and projecting the h=8 head outputs back to d_model combines these diverse views. The total parameter count is similar to single-head attention with dimension d_model (since 8 × 64 = 512).',
      hints: [
        'Think of each head as a separate "attention channel" learning its own query/key/value projections. What can 8 specialised channels capture that 1 general channel cannot?',
        'The paper (Vaswani et al., 2017) shows heads learn different linguistic phenomena. Attending in multiple subspaces jointly is the key advantage.',
      ],
    },
    {
      id: 'q-nlp-kp6-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The original Transformer uses sinusoidal positional encodings: PE(pos, 2i) = sin(pos/10000^(2i/d_model)). What property do sinusoidal encodings have that makes them useful for positions never seen in training?',
      options: [
        'Sinusoidal encodings are learned during training and extrapolate by periodicity',
        'They encode relative positions algebraically: PE(pos+k) is a linear transformation of PE(pos), allowing the model to attend by relative offset',
        'They ensure no two positions share the same encoding for any training sequence length',
        'They are orthogonal to token embeddings, preventing interference during addition',
      ],
      correctAnswer: 1,
      explanation: 'For any fixed offset k, PE(pos+k) can be expressed as a fixed linear function of PE(pos) (using the sin/cos angle-addition formula). This means attention dot products between positions automatically capture relative distances in a way that generalises beyond the training sequence length. Learned positional embeddings (used in BERT, GPT) lack this property and struggle with positions beyond their training length.',
      hints: [
        'sin(a+b) = sin(a)cos(b) + cos(a)sin(b). This means PE(pos+k) depends linearly on PE(pos). What does that enable the attention mechanism to do?',
        'If the training max length is 512 but the test input is 600 tokens, sinusoidal encodings can still produce unique, meaningful position vectors for positions 513–600.',
      ],
    },
    {
      id: 'q-nlp-kp6-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In a Transformer encoder, the causal masking (setting future positions to -∞ before softmax) prevents each token from attending to future tokens in the same layer.',
      correctAnswer: 'false',
      explanation: 'Causal masking is used in the Transformer decoder (for autoregressive generation) to prevent position t from attending to positions t+1, t+2, ... which have not yet been generated. The encoder has no such mask — every position attends to every other position bidirectionally. This is why BERT, which uses only the encoder, can condition on both left and right context simultaneously.',
      hints: [
        'Encoder = bidirectional (full attention matrix). Decoder = causal/masked (lower-triangular attention matrix). Why does the decoder need masking during training?',
        'During decoder training, all target tokens are available. Without masking, position t could "cheat" by looking at the gold token at t+1.',
      ],
    },
  ],

  // ── nlp-kp-7: BERT & Masked Language Modeling ─────────────────────────────
  'bert-pretraining': [
    {
      id: 'q-nlp-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which pretraining objective does BERT use to learn bidirectional representations?',
      options: [
        'Next-token prediction (causal language modeling)',
        'Masked Language Modeling (MLM) where ~15% of tokens are masked and predicted',
        'Contrastive sentence-pair learning with triplet loss',
        'Autoregressive character-level generation',
      ],
      correctAnswer: 1,
      explanation: 'BERT masks approximately 15% of input tokens and trains the model to predict them using the full bidirectional context, enabling deep bidirectional representations unlike left-to-right models.',
      hints: [
        'BERT stands for Bidirectional Encoder Representations from Transformers — what does "bidirectional" imply about context?',
        'If the model can see the token it needs to predict, it cannot learn anything useful — so what must be done?',
      ],
    },
    {
      id: 'q-nlp-kp7-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the purpose of the [CLS] token in BERT?',
      options: [
        'It marks the beginning of each sentence segment',
        'Its final hidden state is used as a pooled representation of the whole sequence for classification tasks',
        'It separates the two sentences in Next Sentence Prediction',
        'It is a special token that is always masked during MLM training',
      ],
      correctAnswer: 1,
      explanation: 'The [CLS] token is prepended to every input; after fine-tuning, its final-layer hidden state aggregates sequence-level information and is fed to a classification head.',
      hints: [
        'BERT adds [CLS] at the start and [SEP] at sentence boundaries — each has a distinct role.',
        'For tasks like sentiment analysis, you need a single vector representing the whole input — which special token provides that?',
      ],
    },
    {
      id: 'q-nlp-kp7-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'BERT\'s Next Sentence Prediction (NSP) task has been shown in subsequent research to be consistently beneficial and is retained in all BERT successors.',
      correctAnswer: 'false',
      explanation: 'RoBERTa and other models found that NSP provides little benefit and can even hurt performance; many BERT variants remove NSP and train longer on more data with larger batch sizes.',
      hints: [
        'RoBERTa (Robustly Optimized BERT) was specifically designed to re-evaluate BERT\'s training choices.',
        'If removing a training objective improves downstream results, what does that tell you about the objective?',
      ],
    },
  ],

  // ── nlp-kp-8: GPT & Autoregressive Language Models ───────────────────────
  'gpt-autoregressive': [
    {
      id: 'q-nlp-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'How does GPT differ from BERT in its core attention mechanism during pretraining?',
      options: [
        'GPT uses cross-attention between encoder and decoder stacks',
        'GPT uses causal (left-to-right) masked self-attention; BERT uses fully bidirectional attention',
        'GPT uses additive attention scores; BERT uses multiplicative scores',
        'GPT attends only to a fixed window of previous tokens; BERT attends to all tokens',
      ],
      correctAnswer: 1,
      explanation: 'GPT applies a causal mask so each token can only attend to itself and preceding tokens, enabling autoregressive text generation; BERT has no such mask, allowing full bidirectional context.',
      hints: [
        'An autoregressive model generates tokens one at a time — can it look at future tokens during training?',
        'Think about the masking strategy needed to prevent the model from "cheating" by seeing future words.',
      ],
    },
    {
      id: 'q-nlp-kp8-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What distinguishes GPT-3\'s "few-shot" capability from traditional fine-tuning?',
      options: [
        'GPT-3 updates its weights using a handful of gradient steps on the few-shot examples',
        'GPT-3 uses in-context examples in the prompt without any weight updates',
        'GPT-3 fine-tunes only the final layer on the few-shot examples',
        'GPT-3 retrieves relevant training examples via a nearest-neighbour index',
      ],
      correctAnswer: 1,
      explanation: 'Few-shot prompting provides examples directly in the context window at inference time; the model\'s weights are never updated, making this "in-context learning" rather than traditional fine-tuning.',
      hints: [
        'If no gradient descent is performed, how can the model adapt to a new task at inference time?',
        'Think about the role of the context window in large language models.',
      ],
    },
    {
      id: 'q-nlp-kp8-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Autoregressive language models like GPT generate each output token based on all previously generated tokens and the prompt.',
      correctAnswer: 'true',
      explanation: 'GPT-style models produce tokens one by one, conditioning each new token on the full sequence of preceding tokens (prompt + all generated tokens so far), which is the definition of autoregressive generation.',
      hints: [
        'The word "autoregressive" comes from time-series statistics — each value is regressed on its own past values.',
        'Can a causally masked model attend to tokens it has not yet generated?',
      ],
    },
  ],

  // ── nlp-kp-9: Text Classification & Sentiment Analysis ───────────────────
  'text-classification': [
    {
      id: 'q-nlp-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which approach best describes fine-tuning a pretrained BERT model for binary sentiment classification?',
      options: [
        'Replace BERT\'s entire architecture with a new randomly initialized transformer',
        'Add a linear classification head on top of the [CLS] token and fine-tune all weights end-to-end',
        'Freeze all BERT weights and train only a separate SVM on BERT\'s outputs',
        'Train BERT from scratch on the sentiment dataset only',
      ],
      correctAnswer: 1,
      explanation: 'Standard BERT fine-tuning adds a lightweight classification head to the [CLS] representation and continues gradient descent through the entire pretrained model on the downstream task.',
      hints: [
        'Fine-tuning implies the pretrained weights are updated, not frozen.',
        'The [CLS] token is designed to carry sequence-level information useful for classification.',
      ],
    },
    {
      id: 'q-nlp-kp9-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is "aspect-based sentiment analysis" (ABSA)?',
      options: [
        'Classifying the overall sentiment of a document as positive, negative, or neutral',
        'Identifying sentiment polarity toward specific entities or aspects mentioned in text',
        'Detecting sarcasm and irony in social media posts',
        'Measuring the intensity of emotion on a continuous scale from 0 to 1',
      ],
      correctAnswer: 1,
      explanation: 'ABSA goes beyond document-level sentiment by extracting fine-grained opinions tied to specific aspects (e.g., "the battery life is excellent but the screen is dim").',
      hints: [
        'A review might be positive about food but negative about service — how would document-level sentiment capture this?',
        'The term "aspect" refers to a specific feature or attribute of the entity being reviewed.',
      ],
    },
    {
      id: 'q-nlp-kp9-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Named Entity Recognition (NER) and relation extraction can be combined into a joint model that extracts entities and their relations simultaneously.',
      correctAnswer: 'true',
      explanation: 'Joint entity and relation extraction models (e.g., SpERT, PFN) avoid the error propagation of pipeline systems by learning to predict entity spans and relation labels jointly, often achieving better performance.',
      hints: [
        'In a pipeline, errors in NER propagate to relation extraction — how does a joint model avoid this?',
        'Think about whether a shared encoder could benefit both tasks simultaneously.',
      ],
    },
  ],

  // ── nlp-kp-10: NER & Sequence Labeling ───────────────────────────────────
  'ner-sequence-labeling': [
    {
      id: 'q-nlp-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the BIO tagging scheme for NER, what does the "B" tag indicate?',
      options: [
        'A token that is part of the background (non-entity) class',
        'The beginning of a named entity span',
        'A token between two entity mentions',
        'A boundary token that separates sentences',
      ],
      correctAnswer: 1,
      explanation: 'BIO stands for Beginning, Inside, Outside — the "B" tag marks the first token of a named entity, "I" marks continuation tokens, and "O" marks non-entity tokens.',
      hints: [
        'Think about what information you need to distinguish the start of "New York" from a continuation token in "New York City".',
        'BIO is a simple label scheme for converting span detection into a token-level classification problem.',
      ],
    },
    {
      id: 'q-nlp-kp10-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Why is a Conditional Random Field (CRF) layer often added on top of a BiLSTM for sequence labeling?',
      options: [
        'CRF reduces training time by pruning invalid token sequences during forward pass',
        'CRF models the joint probability of the entire label sequence, enforcing globally consistent predictions',
        'CRF replaces the need for a softmax and outputs continuous label scores',
        'CRF computes attention over the input tokens before the BiLSTM',
      ],
      correctAnswer: 1,
      explanation: 'A CRF layer captures label transition dependencies (e.g., "I-PER" should follow "B-PER", not "B-LOC") and decodes the globally optimal label sequence via the Viterbi algorithm.',
      hints: [
        'A plain softmax at each position treats each token\'s label independently — is that realistic for entity spans?',
        'Think about invalid tag transitions like "O" followed immediately by "I-PER" without a "B-PER".',
      ],
    },
    {
      id: 'q-nlp-kp10-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A BiLSTM processes the input sequence in both left-to-right and right-to-left directions, providing each token with context from both sides of the sequence.',
      correctAnswer: 'true',
      explanation: 'The bidirectional LSTM runs two separate LSTMs — one forward and one backward — and concatenates their hidden states, giving each token access to both past and future context.',
      hints: [
        'Identifying a named entity often requires knowing both what comes before and after the word.',
        '"Bi" in BiLSTM stands for bidirectional — what does that imply about the number of passes through the sequence?',
      ],
    },
  ],

  // ── nlp-kp-11: Extractive Question Answering ──────────────────────────────
  'question-answering': [
    {
      id: 'q-nlp-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In extractive question answering (e.g., on SQuAD), what does the model predict?',
      options: [
        'A free-form answer string generated token by token',
        'The start and end token positions of the answer span within the passage',
        'A yes/no label indicating whether the answer is in the passage',
        'A confidence score for each candidate answer sentence',
      ],
      correctAnswer: 1,
      explanation: 'Extractive QA models predict two pointers — a start index and an end index — into the context passage, and the answer is extracted as the text span between those positions.',
      hints: [
        'The term "extractive" implies the answer is taken directly from the provided text, not generated.',
        'Think about how you could frame span detection as two separate classification problems over token positions.',
      ],
    },
    {
      id: 'q-nlp-kp11-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What metric does SQuAD 1.1 use to evaluate model performance?',
      options: [
        'BLEU score averaged over all questions',
        'Exact Match (EM) and Token-level F1 score',
        'ROUGE-L recall over reference answers',
        'Mean Reciprocal Rank (MRR) of the correct answer',
      ],
      correctAnswer: 1,
      explanation: 'SQuAD uses Exact Match (the predicted span exactly equals the gold answer after normalisation) and token-level F1 (overlap between predicted and gold token sets), both averaged over all questions.',
      hints: [
        'Why would you need two metrics? Think about cases where the prediction partially overlaps with the gold answer.',
        'EM is a strict metric; F1 gives partial credit — which is more lenient?',
      ],
    },
    {
      id: 'q-nlp-kp11-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'SQuAD 2.0 extends SQuAD 1.1 by adding questions that have no answer in the provided passage, requiring models to abstain.',
      correctAnswer: 'true',
      explanation: 'SQuAD 2.0 includes ~50% unanswerable questions, forcing models to decide both whether an answer exists and where it is, making the task significantly harder.',
      hints: [
        'A model that always predicts a span would struggle when no span is correct — what capability does SQuAD 2.0 test?',
        'Think about the real-world scenario where a user asks a question that a document cannot answer.',
      ],
    },
  ],

  // ── nlp-kp-12: Text Generation & Decoding Strategies ─────────────────────
  'text-generation': [
    {
      id: 'q-nlp-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does "temperature" control in language model sampling?',
      options: [
        'The maximum number of tokens generated per step',
        'The sharpness of the probability distribution — higher temperature flattens it, producing more diverse outputs',
        'The learning rate used during fine-tuning',
        'The proportion of tokens masked during training',
      ],
      correctAnswer: 1,
      explanation: 'Temperature T divides the logits before softmax: T < 1 makes the distribution peakier (more greedy), T > 1 flattens it (more random), T = 1 leaves the distribution unchanged.',
      hints: [
        'Dividing logits by a small number amplifies differences; dividing by a large number shrinks them.',
        'What would T → 0 produce? What would T → ∞ produce?',
      ],
    },
    {
      id: 'q-nlp-kp12-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In nucleus (top-p) sampling, how are tokens selected at each step?',
      options: [
        'The top-k most probable tokens are sampled uniformly',
        'Tokens are sampled from the smallest set whose cumulative probability exceeds p',
        'All tokens with probability above p/V (where V is vocabulary size) are sampled',
        'The single most probable token is always chosen until probability drops below p',
      ],
      correctAnswer: 1,
      explanation: 'Top-p sampling sorts tokens by probability, accumulates them until the cumulative mass reaches p, then samples from that dynamic nucleus — adapting the candidate set size to the model\'s confidence.',
      hints: [
        'Unlike top-k, top-p uses a probability threshold rather than a fixed count of candidates.',
        'When the model is very confident, the nucleus will be small; when uncertain, it will be large.',
      ],
    },
    {
      id: 'q-nlp-kp12-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Beam search with beam width B always produces better (higher-quality) text than greedy decoding.',
      correctAnswer: 'false',
      explanation: 'Beam search finds higher-probability sequences but can produce generic, repetitive text; greedy decoding is faster and sometimes preferable, and sampling methods often produce more diverse, natural outputs.',
      hints: [
        'Maximising log-probability is not the same as maximising human-perceived quality.',
        'Consider the "degeneration" problem where beam search repeats phrases — why might that happen?',
      ],
    },
  ],

  // ── nlp-kp-13: Summarization ──────────────────────────────────────────────
  'summarization': [
    {
      id: 'q-nlp-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the key difference between extractive and abstractive summarization?',
      options: [
        'Extractive models generate new sentences; abstractive models select existing sentences',
        'Extractive models select and copy sentences from the source; abstractive models generate novel text',
        'Extractive summarization works only on short documents; abstractive works on long ones',
        'Abstractive models require labelled data; extractive models do not',
      ],
      correctAnswer: 1,
      explanation: 'Extractive summarization selects and stitches together existing sentences or phrases from the source document, while abstractive summarization generates new text that may not appear verbatim in the source.',
      hints: [
        'Think about how a human summarises vs. how a highlighter is used.',
        'Which approach could produce grammatical errors or hallucinations more easily?',
      ],
    },
    {
      id: 'q-nlp-kp13-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which metric is most commonly used to evaluate automatic summarization systems?',
      options: [
        'BLEU',
        'ROUGE',
        'Perplexity',
        'BERTScore',
      ],
      correctAnswer: 1,
      explanation: 'ROUGE (Recall-Oriented Understudy for Gisting Evaluation) measures n-gram overlap between generated and reference summaries; ROUGE-1, ROUGE-2, and ROUGE-L are the standard variants.',
      hints: [
        'The metric name includes "recall-oriented" — why would recall matter more than precision for summarization?',
        'BLEU is standard for translation; what equivalent exists for summarization?',
      ],
    },
    {
      id: 'q-nlp-kp13-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Abstractive summarization models can produce information not present in the source document (hallucination).',
      correctAnswer: 'true',
      explanation: 'Because abstractive models generate free text rather than copying source spans, they can introduce factual errors or fabricated details not supported by the source — a key challenge in the field.',
      hints: [
        'Would an extractive model that only copies source sentences be able to hallucinate?',
        'Think about what a seq2seq generation model optimises for versus factual accuracy.',
      ],
    },
  ],

  // ── nlp-kp-14: Machine Translation ───────────────────────────────────────
  'machine-translation': [
    {
      id: 'q-nlp-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does the BLEU score measure in machine translation evaluation?',
      options: [
        'The semantic similarity between source and translation using embeddings',
        'The precision of n-gram matches between the hypothesis and one or more reference translations, with a brevity penalty',
        'The recall of words from the source sentence that appear in the translation',
        'The fluency of the output as judged by a language model perplexity score',
      ],
      correctAnswer: 1,
      explanation: 'BLEU computes the geometric mean of modified n-gram precisions (1- to 4-gram) between hypothesis and references, multiplied by a brevity penalty to discourage short translations.',
      hints: [
        'BLEU stands for Bilingual Evaluation Understudy — it is reference-based.',
        'Why would precision be more natural than recall for translation evaluation?',
      ],
    },
    {
      id: 'q-nlp-kp14-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the main innovation of Meta\'s No Language Left Behind (NLLB) model?',
      options: [
        'It is the first transformer-based translation model',
        'It supports direct translation between 200+ languages, including many low-resource languages',
        'It uses reinforcement learning from human feedback for translation quality',
        'It replaces attention with linear recurrence for efficient long-document translation',
      ],
      correctAnswer: 1,
      explanation: 'NLLB-200 supports 200+ languages in a single model with a focus on low-resource languages often missed by commercial systems, trained with large-scale mined parallel data.',
      hints: [
        'The name "No Language Left Behind" is a strong hint about its scope and motivation.',
        'Think about which languages are underrepresented in standard MT datasets.',
      ],
    },
    {
      id: 'q-nlp-kp14-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'A higher BLEU score always means a translation is more acceptable to human evaluators.',
      correctAnswer: 'false',
      explanation: 'BLEU correlates with human judgment at the corpus level but is a poor indicator at the sentence level; translations with higher BLEU can be less fluent or accurate in specific cases, and newer metrics like COMET better predict human preferences.',
      hints: [
        'BLEU does not capture meaning — two sentences with the same words in different orders may score differently.',
        'What aspects of translation quality does n-gram overlap fail to capture?',
      ],
    },
  ],

  // ── nlp-kp-15: Coreference Resolution ────────────────────────────────────
  'coreference-resolution': [
    {
      id: 'q-nlp-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is coreference resolution in NLP?',
      options: [
        'Identifying which words in a sentence are synonyms',
        'Determining which mentions (noun phrases, pronouns) in a text refer to the same real-world entity',
        'Resolving ambiguous word senses using a dictionary',
        'Linking entities in text to entries in a knowledge base',
      ],
      correctAnswer: 1,
      explanation: 'Coreference resolution clusters all expressions that refer to the same entity — for example, linking "Barack Obama", "he", and "the president" when they denote the same person.',
      hints: [
        'Think about the pronoun "she" in a paragraph — how do you know which person it refers to?',
        'The word "co-reference" means two expressions that refer to the same thing.',
      ],
    },
    {
      id: 'q-nlp-kp15-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which evaluation metric is standard for coreference resolution?',
      options: [
        'F1 of entity-level mention detection only',
        'Average F1 of MUC, B-cubed, and CEAFe scorers',
        'ROUGE-L against reference coreference chains',
        'Token-level accuracy of pronoun resolution',
      ],
      correctAnswer: 1,
      explanation: 'The CoNLL coreference shared task defined the standard metric as the unweighted average F1 of three complementary scorers: MUC, B-cubed, and CEAFe, each capturing different aspects of cluster quality.',
      hints: [
        'No single metric fully captures coreference quality, so multiple are combined.',
        'Think about what it means to correctly identify both singleton and complex coreference chains.',
      ],
    },
    {
      id: 'q-nlp-kp15-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Coreference resolution is only concerned with pronouns and ignores other types of referring expressions such as definite noun phrases.',
      correctAnswer: 'false',
      explanation: 'Coreference resolution handles all referring expressions — pronouns, proper names, definite descriptions (e.g., "the scientist"), and demonstratives — not just pronouns.',
      hints: [
        '"The company" and "Apple" in the same paragraph might corefer — is "the company" a pronoun?',
        'Think about all the ways an entity can be referred to across a document.',
      ],
    },
  ],

  // ── nlp-kp-16: Dependency & Constituency Parsing ─────────────────────────
  'dependency-parsing': [
    {
      id: 'q-nlp-kp16-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does a dependency parse represent?',
      options: [
        'A tree of phrase constituents (NP, VP, PP) that make up a sentence',
        'Binary head-dependent relations between individual word pairs in a sentence',
        'The sequence of POS tags assigned to each word in the sentence',
        'A graph of semantic roles (agent, patient) between predicates and arguments',
      ],
      correctAnswer: 1,
      explanation: 'A dependency parse is a directed tree where each word (dependent) has exactly one head, and the labeled arc between them captures the grammatical relation (subject, object, modifier, etc.).',
      hints: [
        'Contrast with constituency parsing, which groups words into nested phrases.',
        'In "The cat sat", which word is the head of "cat" and what relation does it have?',
      ],
    },
    {
      id: 'q-nlp-kp16-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which parsing algorithm is widely used in modern neural dependency parsers for its O(n³) dynamic programming solution?',
      options: [
        'CYK (Cocke-Younger-Kasami) algorithm',
        'Eisner\'s algorithm for projective dependency parsing',
        'Earley\'s algorithm for context-free grammars',
        'Viterbi decoding over a linear-chain CRF',
      ],
      correctAnswer: 1,
      explanation: 'Eisner\'s algorithm finds the maximum spanning projective dependency tree in O(n³) time using dynamic programming over span-based chart items.',
      hints: [
        'Projective dependency trees cannot have crossing arcs — which algorithm exploits this property?',
        'Think about which algorithms are specifically designed for tree-structured outputs rather than sequences.',
      ],
    },
    {
      id: 'q-nlp-kp16-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In a constituency parse tree, every leaf node corresponds to an individual word in the sentence.',
      correctAnswer: 'true',
      explanation: 'Constituency (phrase-structure) trees have terminal nodes for each word and non-terminal nodes for phrases (NP, VP, etc.); every leaf is a word token.',
      hints: [
        'The tree must account for every word in the sentence — where else could a word appear except at a leaf?',
        'Internal (non-terminal) nodes represent phrases composed of their children.',
      ],
    },
  ],

  // ── nlp-kp-17: Topic Modeling ─────────────────────────────────────────────
  'topic-modeling': [
    {
      id: 'q-nlp-kp17-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In Latent Dirichlet Allocation (LDA), what does each document represent?',
      options: [
        'A single topic with a fixed set of words',
        'A mixture of latent topics, each with its own word distribution',
        'A sequence of word embeddings averaged into a document vector',
        'A cluster assignment to exactly one topic',
      ],
      correctAnswer: 1,
      explanation: 'LDA is a generative probabilistic model where each document is represented as a probability distribution over K topics, and each topic is a probability distribution over the vocabulary.',
      hints: [
        'A news article might be 60% politics and 40% economics — does it belong to exactly one topic?',
        'LDA is called a "mixture model" — what does that imply about topic assignments?',
      ],
    },
    {
      id: 'q-nlp-kp17-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'How does BERTopic differ from LDA in how it represents documents and discovers topics?',
      options: [
        'BERTopic uses bag-of-words counts with a Dirichlet prior like LDA but with BERT initialisation',
        'BERTopic clusters dense contextual embeddings and extracts topic keywords via class-based TF-IDF',
        'BERTopic replaces LDA\'s Gibbs sampling with variational inference using BERT features',
        'BERTopic is a supervised variant of LDA that requires labelled topic annotations',
      ],
      correctAnswer: 1,
      explanation: 'BERTopic embeds documents with sentence transformers, clusters the embeddings (e.g., HDBSCAN), then uses c-TF-IDF to extract representative keywords per cluster — no bag-of-words assumption needed.',
      hints: [
        'Dense embeddings capture semantics beyond word overlap — how might clustering them differ from LDA\'s generative approach?',
        'c-TF-IDF stands for "class-based TF-IDF" — what is the "class" in this context?',
      ],
    },
    {
      id: 'q-nlp-kp17-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Non-negative Matrix Factorization (NMF) can be applied to a term-document matrix to discover latent topics, similarly to LDA.',
      correctAnswer: 'true',
      explanation: 'NMF decomposes the term-document matrix into a topic-word matrix and a document-topic matrix with non-negativity constraints, yielding interpretable topic representations comparable to LDA.',
      hints: [
        'Both NMF and LDA decompose document representations into topic components — what constraint does NMF add?',
        'Non-negativity means the components are additive — why might that aid interpretability?',
      ],
    },
  ],

  // ── nlp-kp-18: Sentence Embeddings & SBERT ────────────────────────────────
  'sentence-embeddings': [
    {
      id: 'q-nlp-kp18-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What problem does Sentence-BERT (SBERT) solve compared to using vanilla BERT for sentence similarity?',
      options: [
        'BERT cannot produce embeddings for sentences longer than 128 tokens',
        'Comparing all sentence pairs with BERT requires O(n²) inference calls; SBERT produces independent embeddings enabling efficient similarity search',
        'BERT\'s [CLS] embeddings are not contextualised enough for word-level tasks',
        'SBERT removes the need for a tokenizer by operating on character n-grams',
      ],
      correctAnswer: 1,
      explanation: 'Vanilla BERT requires a cross-encoder (pair concatenation) for each pair, making large-scale retrieval infeasible. SBERT uses a siamese network to produce fixed-size sentence embeddings that can be compared with cosine similarity in O(n) inference.',
      hints: [
        'With 10,000 sentences and vanilla BERT, how many inference calls would pairwise comparison require?',
        'SBERT\'s siamese structure encodes each sentence independently — what does that enable at scale?',
      ],
    },
    {
      id: 'q-nlp-kp18-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'SBERT is trained using which type of objective to produce semantically meaningful sentence embeddings?',
      options: [
        'Masked language modeling on sentence pairs',
        'Natural Language Inference (NLI) classification and/or semantic textual similarity regression',
        'Next sentence prediction between adjacent paragraphs',
        'Contrastive loss using BM25-retrieved hard negatives only',
      ],
      correctAnswer: 1,
      explanation: 'SBERT fine-tunes BERT on NLI data (entailment/contradiction/neutral classification) using a siamese network and softmax loss, and optionally on STS regression tasks to align embeddings with human similarity scores.',
      hints: [
        'NLI data provides natural signal about sentence similarity — entailment means similar, contradiction means different.',
        'What loss function would you use if you have pairs with continuous similarity scores from 0 to 5?',
      ],
    },
    {
      id: 'q-nlp-kp18-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Mean pooling of all token embeddings from BERT\'s last layer is a common and effective method for obtaining sentence embeddings.',
      correctAnswer: 'true',
      explanation: 'Mean pooling averages all non-padding token embeddings and consistently outperforms using only the [CLS] token in many sentence similarity benchmarks when BERT has not been fine-tuned for the task.',
      hints: [
        'The [CLS] token is only optimised for sentence representation when the model is specifically fine-tuned for it.',
        'Averaging across all tokens reduces the influence of any single noisy token.',
      ],
    },
  ],

  // ── nlp-kp-19: Cross-Lingual Transfer & mBERT ────────────────────────────
  'cross-lingual': [
    {
      id: 'q-nlp-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What enables multilingual BERT (mBERT) to perform zero-shot cross-lingual transfer?',
      options: [
        'It was pre-trained with explicit translation pairs for all 104 languages',
        'Shared vocabulary subwords and joint pretraining on many languages lead to shared multilingual representations',
        'It uses language-specific adapter layers that are swapped at inference time',
        'It translates all inputs to English before processing them',
      ],
      correctAnswer: 1,
      explanation: 'mBERT is pretrained on Wikipedia in 104 languages with a shared WordPiece vocabulary, causing cross-lingual alignment to emerge naturally even without parallel corpora — enabling zero-shot transfer to unseen languages.',
      hints: [
        'Languages that share subwords or script will have overlapping vocabulary items — how might that help alignment?',
        'Zero-shot means a model is trained on task labels in a source language and directly evaluated on a target language without any target-language fine-tuning.',
      ],
    },
    {
      id: 'q-nlp-kp19-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'XLM-R improves on mBERT by:',
      options: [
        'Using a smaller vocabulary to reduce memory footprint across languages',
        'Training on 2.5 TB of filtered CommonCrawl data across 100 languages with a larger model and sentencepiece vocabulary',
        'Adding explicit language embeddings that tag each token with its source language',
        'Fine-tuning mBERT on machine-translated versions of English NLP benchmarks',
      ],
      correctAnswer: 1,
      explanation: 'XLM-R (Cross-lingual Language Model — RoBERTa) trains on a massive multilingual CommonCrawl corpus (much larger than Wikipedia) with sentencepiece tokenization, significantly outperforming mBERT on cross-lingual benchmarks.',
      hints: [
        'RoBERTa improved on BERT by training longer with more data — what does XLM-R do in the multilingual setting?',
        'If the model can see the token it needs to predict, it cannot learn anything useful — so what must be done?',
      ],
    },
    {
      id: 'q-nlp-kp19-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Zero-shot cross-lingual transfer means a model is trained on task labels in a source language and directly evaluated on a target language without any target-language fine-tuning.',
      correctAnswer: 'true',
      explanation: 'In zero-shot cross-lingual transfer, the model fine-tunes on labelled data in one language (usually English) and is evaluated on the same task in a different language without any additional training, relying on shared multilingual representations.',
      hints: [
        'If fine-tuning on target-language data were available and used, it would be called "few-shot" or "supervised" transfer.',
        'Think about why this is useful in practice for low-resource languages.',
      ],
    },
  ],

  // ── nlp-kp-20: Dialogue Systems & Task-Oriented NLP ──────────────────────
  'dialogue-systems': [
    {
      id: 'q-nlp-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What are the three core components of a typical task-oriented dialogue system pipeline?',
      options: [
        'Tokenizer, encoder, decoder',
        'Natural Language Understanding (NLU), Dialogue State Tracking (DST), and Natural Language Generation (NLG)',
        'Intent detection, named entity recognition, and coreference resolution',
        'Speech recognition, machine translation, and text-to-speech',
      ],
      correctAnswer: 1,
      explanation: 'Task-oriented dialogue systems parse user input into intents and slots (NLU), maintain a structured belief state over the conversation (DST), decide on actions (policy), and generate responses (NLG).',
      hints: [
        'A flight booking chatbot needs to know what the user wants (intent), fill in missing details (slots), and track what has been established so far.',
        'Think about what happens between understanding the user and generating the system response.',
      ],
    },
    {
      id: 'q-nlp-kp20-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is "slot filling" in the context of task-oriented dialogue?',
      options: [
        'Inserting template placeholders into generated responses',
        'Extracting values for predefined attributes (slots) such as destination city or departure date from user utterances',
        'Filling gaps in the dialogue history caused by missing turns',
        'Assigning a probability score to each possible system action',
      ],
      correctAnswer: 1,
      explanation: 'Slot filling identifies and extracts task-specific attribute values (e.g., "New York" for slot DESTINATION) from the user\'s input, which are needed to fulfill the task.',
      hints: [
        'A hotel booking system needs to know check-in date, number of guests, etc. — where do these values come from?',
        'Think of a form with blank fields — "slot filling" is filling those fields from natural language.',
      ],
    },
    {
      id: 'q-nlp-kp20-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Open-domain chatbots (like BlenderBot) are designed to complete specific tasks such as booking flights or making restaurant reservations.',
      correctAnswer: 'false',
      explanation: 'Open-domain chatbots aim for engaging, general conversation across any topic; task-oriented systems are purpose-built to complete specific structured tasks using domain-restricted ontologies.',
      hints: [
        'Think about the difference between chatting with a friend versus using a virtual assistant to book a table.',
        'The word "open-domain" is the key clue — what is the opposite of open-domain?',
      ],
    },
  ],

  // ── nlp-kp-21: Information Extraction & Relation Extraction ──────────────
  'information-extraction': [
    {
      id: 'q-nlp-kp21-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the goal of relation extraction in NLP?',
      options: [
        'Identifying all named entities in a document',
        'Classifying the semantic relationship between two entities mentioned in text',
        'Extracting the summary of a document into structured bullet points',
        'Parsing the syntactic dependency structure of a sentence',
      ],
      correctAnswer: 1,
      explanation: 'Relation extraction identifies and classifies relationships between entity pairs in text, e.g., determining that "Apple" and "Tim Cook" have the relation CEO_OF.',
      hints: [
        'If NER finds the entities, what is the next step to populate a knowledge graph?',
        'Think about what kind of structured fact (subject, relation, object) you want to extract.',
      ],
    },
    {
      id: 'q-nlp-kp21-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is "distant supervision" for relation extraction?',
      options: [
        'Training on labelled data from a distant (foreign language) source',
        'Automatically labelling text by aligning it with a knowledge base — if two entities are related in the KB, sentences containing both are labelled with that relation',
        'Using a teacher model to supervise a smaller student model from a distance',
        'Labelling training data using heuristic rules that are far from perfect',
      ],
      correctAnswer: 1,
      explanation: 'Distant supervision heuristically generates training data by assuming that any sentence mentioning two KB-related entities expresses that relation — enabling large-scale training without manual annotation, at the cost of noisy labels.',
      hints: [
        'Manual annotation of relations in text is expensive — how could a knowledge base like Freebase help?',
        'If "Steve Jobs" and "Apple" are linked in a KB as FOUNDED_BY, what assumption does distant supervision make about all sentences containing both names?',
      ],
    },
    {
      id: 'q-nlp-kp21-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Named Entity Recognition (NER) and relation extraction can be combined into a joint model that extracts entities and their relations simultaneously.',
      correctAnswer: 'true',
      explanation: 'Joint entity and relation extraction models (e.g., SpERT, PFN) avoid the error propagation of pipeline systems by learning to predict entity spans and relation labels jointly, often achieving better performance.',
      hints: [
        'In a pipeline, errors in NER propagate to relation extraction — how does a joint model avoid this?',
        'Think about whether a shared encoder could benefit both tasks simultaneously.',
      ],
    },
  ],

  // ── nlp-kp-22: NLP Evaluation Metrics ────────────────────────────────────
  'nlp-evaluation': [
    {
      id: 'q-nlp-kp22-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does BERTScore measure for text generation evaluation?',
      options: [
        'The n-gram overlap between hypothesis and reference sentences',
        'The cosine similarity between contextual BERT embeddings of hypothesis and reference tokens',
        'The perplexity of the hypothesis under a BERT language model',
        'The token-level F1 between hypothesis and reference, ignoring word order',
      ],
      correctAnswer: 1,
      explanation: 'BERTScore computes similarity using contextual embeddings from a pretrained BERT model, matching hypothesis tokens to the most similar reference tokens by cosine similarity, capturing semantic meaning beyond surface overlap.',
      hints: [
        'Unlike BLEU, BERTScore does not require exact word matches — what does it use instead?',
        'Contextual embeddings encode meaning — how might that help for synonymous paraphrases?',
      ],
    },
    {
      id: 'q-nlp-kp22-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'ROUGE-L uses longest common subsequence (LCS). What advantage does this have over ROUGE-N (n-gram)?',
      options: [
        'LCS is always faster to compute than n-gram matching',
        'LCS captures sentence-level structure and in-sequence word order without requiring consecutive matches',
        'LCS penalises length more aggressively than n-gram ROUGE',
        'LCS can compare sentences of different languages without translation',
      ],
      correctAnswer: 1,
      explanation: 'ROUGE-L rewards sequences of words that appear in the same order in both hypothesis and reference even if non-consecutive, capturing fluency and structure that pure n-gram overlap misses.',
      hints: [
        'If key words appear in the right order but not adjacently, would ROUGE-2 capture them?',
        'The longest common subsequence finds the longest shared word sequence — does the order matter here?',
      ],
    },
    {
      id: 'q-nlp-kp22-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'BLEU score can be computed without any reference translations by comparing the output directly to the source sentence.',
      correctAnswer: 'false',
      explanation: 'BLEU is a reference-based metric that requires one or more human reference translations; it measures n-gram overlap between the hypothesis and these references, not the source sentence.',
      hints: [
        'BLEU evaluates the quality of translation outputs — what does it need to compare against?',
        'Without references, how would you know if the translation is correct?',
      ],
    },
  ],

  // ── nlp-kp-23: Efficient NLP ──────────────────────────────────────────────
  'efficient-nlp': [
    {
      id: 'q-nlp-kp23-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'How does DistilBERT reduce the size of BERT while retaining most of its performance?',
      options: [
        'It removes the feed-forward layers from every transformer block',
        'It uses knowledge distillation, training a smaller student model to mimic BERT\'s output distributions',
        'It quantises BERT\'s weights to 8-bit integers without any retraining',
        'It replaces multi-head attention with a single-head attention mechanism',
      ],
      correctAnswer: 1,
      explanation: 'DistilBERT uses knowledge distillation during pretraining — the smaller student model is trained to match the soft probability outputs (and hidden states) of the full BERT teacher, resulting in ~40% fewer parameters with ~97% of BERT\'s performance.',
      hints: [
        'Knowledge distillation transfers knowledge from a large "teacher" to a smaller "student" — what signal does the student learn from?',
        'Soft probability distributions from the teacher contain more information than hard one-hot labels.',
      ],
    },
    {
      id: 'q-nlp-kp23-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What key architectural innovation does ALBERT use to reduce BERT\'s parameter count?',
      options: [
        'Reducing the number of transformer layers to 4',
        'Factorizing the embedding matrix and sharing parameters across all transformer layers',
        'Replacing attention with convolutional layers in even-numbered layers',
        'Using a binary codebook to represent all hidden states',
      ],
      correctAnswer: 1,
      explanation: 'ALBERT (A Lite BERT) uses two parameter-reduction techniques: embedding factorisation (splitting the large embedding matrix) and cross-layer parameter sharing (the same weights are used in every transformer block).',
      hints: [
        'If every layer uses the same weights, how many unique weight sets does the model need?',
        'Factorising a large matrix into two smaller ones reduces the total number of parameters — why?',
      ],
    },
    {
      id: 'q-nlp-kp23-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'TinyBERT uses task-specific knowledge distillation only on the final classification layer, ignoring intermediate transformer layers.',
      correctAnswer: 'false',
      explanation: 'TinyBERT distills knowledge from all transformer layers — attention matrices, hidden states, and the final prediction layer — using a layer mapping strategy, which is why it outperforms simple output-only distillation.',
      hints: [
        'If only the final output is distilled, is the student learning the intermediate representations of the teacher?',
        'Think about what intermediate layer distillation gives the student model access to.',
      ],
    },
  ],

  // ── nlp-kp-24: Retrieval-Augmented Generation ─────────────────────────────
  'retrieval-augmented': [
    {
      id: 'q-nlp-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the main motivation for Retrieval-Augmented Generation (RAG)?',
      options: [
        'To make language models smaller and faster during inference',
        'To ground generation in up-to-date or domain-specific documents, reducing hallucination',
        'To enable language models to generate images alongside text',
        'To replace fine-tuning entirely for all NLP tasks',
      ],
      correctAnswer: 1,
      explanation: 'RAG retrieves relevant documents at inference time and conditions the generator on them, allowing the model to access current or specialised knowledge without retraining and reducing the tendency to hallucinate.',
      hints: [
        'A parametric model encodes knowledge in its weights — what happens when the world changes after training?',
        'Retrieval brings in external evidence — how might that reduce fabricated facts?',
      ],
    },
    {
      id: 'q-nlp-kp24-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In a standard RAG pipeline, which component converts a user query into a vector for similarity search?',
      options: [
        'The generative language model (e.g., GPT)',
        'A dense retriever (bi-encoder) that encodes the query into an embedding',
        'A BM25 index that computes term frequency-inverse document frequency scores',
        'A cross-encoder reranker that scores all documents against the query',
      ],
      correctAnswer: 1,
      explanation: 'A dense bi-encoder (e.g., DPR) encodes the query into a dense vector, which is compared against pre-encoded document vectors via approximate nearest-neighbour search (e.g., FAISS) to retrieve top-k documents.',
      hints: [
        'The retriever must be fast — does comparing dense vectors or doing full cross-attention scale better?',
        'A "bi-encoder" encodes both query and documents independently — contrast this with a cross-encoder that processes pairs together.',
      ],
    },
    {
      id: 'q-nlp-kp24-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In RAG, the retrieved documents are appended to the prompt and the generator\'s weights are updated based on the retrieved content at inference time.',
      correctAnswer: 'false',
      explanation: 'RAG does not update model weights at inference time; retrieved documents are simply included in the context (prompt), and the frozen generator conditions its output on them.',
      hints: [
        'Weight updates require a training loop with backpropagation — does that happen during a normal inference forward pass?',
        'Think about in-context learning — how does the model use retrieved text without training on it?',
      ],
    },
  ],

  // ── nlp-kp-25: Long-Context NLP & Efficient Attention ────────────────────
  'long-context-nlp': [
    {
      id: 'q-nlp-kp25-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the computational complexity of standard self-attention with respect to sequence length n?',
      options: [
        'O(n)',
        'O(n log n)',
        'O(n²)',
        'O(n³)',
      ],
      correctAnswer: 2,
      explanation: 'Standard self-attention computes dot products between all pairs of tokens, requiring O(n²) time and memory, which becomes prohibitive for very long sequences.',
      hints: [
        'Every token attends to every other token — how many pairs are there for a sequence of length n?',
        'If n = 10,000, n² = 100,000,000 — why is this a practical problem for long documents?',
      ],
    },
    {
      id: 'q-nlp-kp25-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Longformer replaces full self-attention with which mechanism to handle long documents efficiently?',
      options: [
        'Random attention that samples a fixed number of token pairs per layer',
        'A combination of local sliding-window attention and global attention for special tokens',
        'Hierarchical attention that first attends within paragraphs then across paragraphs',
        'Attention over compressed memory states updated recurrently',
      ],
      correctAnswer: 1,
      explanation: 'Longformer uses sliding-window attention (each token attends to a local window) plus global attention for task-specific tokens (e.g., [CLS]), reducing complexity to O(n) while still enabling long-range information flow.',
      hints: [
        'A sliding window reduces the number of pairs from n² to n×w where w is the window size.',
        'Why might certain tokens (like [CLS]) need to attend globally while most tokens only need local context?',
      ],
    },
    {
      id: 'q-nlp-kp25-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Flash Attention achieves speedups over standard attention by reducing the number of attention operations computed, rather than reducing memory reads and writes.',
      correctAnswer: 'false',
      explanation: 'Flash Attention achieves speedups through IO-aware computation — it tiles the attention computation to avoid materialising the full n×n attention matrix in HBM (GPU high-bandwidth memory), reducing memory bandwidth bottlenecks, not the number of floating-point operations.',
      hints: [
        'The bottleneck in GPU computation is often memory bandwidth, not pure FLOP count.',
        'Flash Attention still computes the same attention mathematically — what does it change about how results are stored?',
      ],
    },
  ],

  // ── nlp-kp-26: Prompt Engineering & In-Context Learning ──────────────────
  'llm-prompting': [
    {
      id: 'q-nlp-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is "zero-shot prompting" for a large language model?',
      options: [
        'Prompting the model with zero tokens (empty input)',
        'Asking the model to perform a task with only a task description and no examples in the prompt',
        'Evaluating the model on tasks it was explicitly trained on',
        'Using a prompt that contains zero words from the training corpus',
      ],
      correctAnswer: 1,
      explanation: 'Zero-shot prompting provides only a task description (and optionally an output format instruction) without any worked examples, relying on the model\'s pretrained knowledge to generalise to the task.',
      hints: [
        'Think about how a human summarises vs. how a highlighter is used.',
        'Which approach could produce grammatical errors or hallucinations more easily?',
      ],
    },
    {
      id: 'q-nlp-kp26-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which finding from the GPT-3 paper showed that the order of few-shot examples in the prompt can significantly affect model performance?',
      options: [
        'Sensitivity to example ordering demonstrates that LLMs perform Bayesian updating on demonstrations',
        'Calibration experiments showed variance in accuracy up to 54% based solely on example permutation',
        'LLMs consistently perform better when examples are sorted by difficulty (easy to hard)',
        'The position of the correct-label example always dominates the prediction',
      ],
      correctAnswer: 1,
      explanation: 'Research (Zhao et al., 2021) found that LLM few-shot performance varies dramatically with example order and recency bias; this sensitivity is a key challenge in prompt engineering and motivates calibration techniques.',
      hints: [
        'If changing the order of examples in the prompt changes the answer, what does that imply about how the model uses demonstrations?',
        'The model has no mechanism to "look at all examples equally" — positional biases may dominate.',
      ],
    },
    {
      id: 'q-nlp-kp26-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In few-shot prompting, the model\'s weights are updated based on the examples provided in the prompt.',
      correctAnswer: 'false',
      explanation: 'Few-shot prompting is purely in-context learning — the model\'s parameters are frozen and no gradient updates occur; the model adapts its predictions based on the examples in its context window without any weight changes.',
      hints: [
        'Weight updates require a training loop with backpropagation — does that happen during a normal inference forward pass?',
        'Think about in-context learning — how does the model use retrieved text without training on it?',
      ],
    },
  ],

  // ── nlp-kp-27: Chain-of-Thought & Reasoning in LLMs ─────────────────────
  'chain-of-thought': [
    {
      id: 'q-nlp-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is Chain-of-Thought (CoT) prompting?',
      options: [
        'Chaining multiple LLMs together where each model processes the previous output',
        'Including step-by-step reasoning traces in few-shot examples to elicit intermediate reasoning steps from the model',
        'A training technique that rewards models for generating longer outputs',
        'Prompting the model to list all possible answers before selecting the best one',
      ],
      correctAnswer: 1,
      explanation: 'CoT prompting augments few-shot examples with intermediate reasoning steps (e.g., "let me think step by step"), which elicits similar reasoning chains in the model\'s output and significantly improves performance on multi-step reasoning tasks.',
      hints: [
        'Think about how showing your work in mathematics helps you arrive at the correct answer.',
        'The model generates tokens autoregressively — intermediate steps become part of the context for subsequent tokens.',
      ],
    },
    {
      id: 'q-nlp-kp27-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is "self-consistency" decoding as introduced by Wang et al. (2022) for CoT reasoning?',
      options: [
        'Generating a single chain of thought and verifying each step with a verifier model',
        'Sampling multiple diverse reasoning chains and choosing the most frequent final answer by majority vote',
        'Requiring the model to generate the same answer twice before accepting it',
        'Filtering out chains of thought that contain logical contradictions',
      ],
      correctAnswer: 1,
      explanation: 'Self-consistency generates multiple independent CoT reasoning paths (via sampling) and marginalises over them by selecting the most common final answer, significantly boosting accuracy over single greedy decoding.',
      hints: [
        'Multiple reasoning paths may arrive at the same answer via different routes — how does this help?',
        'Think about ensemble methods — how does voting across diverse outputs help?',
      ],
    },
    {
      id: 'q-nlp-kp27-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Chain-of-thought prompting improves performance on simple arithmetic tasks in small language models (under 1B parameters) as reliably as it does in large models.',
      correctAnswer: 'false',
      explanation: 'CoT prompting is an emergent capability — it provides significant gains primarily in large models (≥50B parameters); in small models, generating reasoning traces does not reliably improve and can even hurt performance.',
      hints: [
        'The original CoT paper found performance gains only above a certain model scale — why might reasoning ability be scale-dependent?',
        'Generating coherent multi-step reasoning requires capabilities that emerge with scale.',
      ],
    },
  ],

  // ── nlp-kp-28: Tool Use & Function Calling in LLMs ───────────────────────
  'tool-use-nlp': [
    {
      id: 'q-nlp-kp28-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is "function calling" in the context of LLM APIs (e.g., OpenAI)?',
      options: [
        'The model generates Python code that is automatically executed on a remote server',
        'The model outputs structured JSON specifying a function name and arguments, which the application then executes',
        'The model calls internal transformer sub-functions to retrieve factual information',
        'The model fine-tunes itself by calling a gradient descent function',
      ],
      correctAnswer: 1,
      explanation: 'Function calling allows a model to signal that an external tool should be invoked by emitting structured JSON with the function name and arguments; the application executes the function and may return results to the model for further reasoning.',
      hints: [
        'The model itself does not execute code — it only decides what to call and the application executes it.',
        'Think of the LLM as a planner that decides which tool to use and the application as the executor.',
      ],
    },
    {
      id: 'q-nlp-kp28-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In the ReAct (Reasoning + Acting) framework, how does an LLM interleave thought and action?',
      options: [
        'The model generates all thoughts first, then all actions in a separate pass',
        'The model alternates between generating reasoning traces (Thought) and issuing tool calls (Action), using observations to continue reasoning',
        'The model uses a policy network for actions and a separate value network for thoughts',
        'Thoughts are generated by one LLM and actions by another specialist LLM',
      ],
      correctAnswer: 1,
      explanation: 'ReAct interleaves Thought (reasoning about what to do next), Action (calling a tool), and Observation (tool result) steps in the same generation context, enabling the model to reason over tool outputs before taking the next action.',
      hints: [
        '"React" = Reasoning + Acting — how does seeing the result of an action inform the next thought?',
        'Contrast with Chain-of-Thought (reasoning only) or Action-only agents (no explicit reasoning).',
      ],
    },
    {
      id: 'q-nlp-kp28-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Tool-augmented LLMs can only use tools that were available at pretraining time.',
      correctAnswer: 'false',
      explanation: 'Tool use is specified via the prompt (API schemas, descriptions, examples) at inference time; new tools can be added without retraining by simply providing their specifications in the system prompt or function definitions.',
      hints: [
        'If tools are defined in the prompt, what does that imply about when they need to be introduced to the model?',
        'Think about how few-shot examples teach the model to use a new tool at inference time.',
      ],
    },
  ],

  // ── nlp-kp-29: Hallucination Detection & Mitigation ─────────────────────
  'hallucination': [
    {
      id: 'q-nlp-kp29-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In NLP, what is "hallucination" in the context of language model outputs?',
      options: [
        'The model generating tokens outside its vocabulary',
        'The model producing fluent but factually incorrect or unsupported content',
        'The model repeating the same phrase in a loop indefinitely',
        'The model failing to generate any output due to numerical instability',
      ],
      correctAnswer: 1,
      explanation: 'Hallucination refers to fluent, confident-sounding model outputs that contain factual errors or claims not supported by the source or world knowledge — a key reliability challenge in generative AI.',
      hints: [
        'Perplexity alone cannot detect hallucinations — why might a wrong statement sound fluent?',
        'Think about what the language modelling objective actually optimises — is factual correctness part of the loss?',
      ],
    },
    {
      id: 'q-nlp-kp29-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which mitigation strategy most directly addresses factual hallucination in closed-book generation?',
      options: [
        'Increasing beam width to explore more candidate sequences',
        'Grounding generation in retrieved documents (RAG) to constrain outputs to verifiable sources',
        'Reducing the temperature to near zero for deterministic greedy decoding',
        'Increasing the training data size to cover all possible facts',
      ],
      correctAnswer: 1,
      explanation: 'RAG supplies the model with retrieved evidence at inference time, encouraging it to ground responses in verifiable source text rather than relying solely on parametric knowledge that may be outdated or incorrect.',
      hints: [
        'If the model is shown the correct fact in its context, can it still hallucinate that fact (assuming it faithfully uses context)?',
        'Grounding means tying the output to an explicit source — how does retrieval help with this?',
      ],
    },
    {
      id: 'q-nlp-kp29-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Hallucination in LLMs occurs only when the model is asked about topics not covered in its training data.',
      correctAnswer: 'false',
      explanation: 'LLMs can hallucinate even about topics well-covered in training data — the issue stems from the generative objective optimising fluency and coherence, not factual accuracy, and from distributional biases.',
      hints: [
        'A model trained on many documents about a topic can still generate incorrect summaries of those documents.',
        'Think about what the language modelling objective actually optimises — is factual correctness part of the loss?',
      ],
    },
  ],

  // ── nlp-kp-30: NLP Safety: Bias, Toxicity & Fairness ─────────────────────
  'nlp-safety': [
    {
      id: 'q-nlp-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does the Word Embedding Association Test (WEAT) measure?',
      options: [
        'The accuracy of word embeddings on analogy benchmarks like king − man + woman = queen',
        'Implicit biases in word embeddings by comparing association strengths between target words and attribute words',
        'The dimensionality required for embeddings to capture gender information',
        'The cosine similarity between embeddings of antonyms',
      ],
      correctAnswer: 1,
      explanation: 'WEAT measures the relative association of two sets of target words (e.g., male/female names) with two sets of attribute words (e.g., career/family terms) using cosine similarity, revealing societal biases encoded in embeddings.',
      hints: [
        'Think about the Implicit Association Test (IAT) from psychology — WEAT is its embedding analogue.',
        'If "engineer" is closer to "he" than "she" in embedding space, what does that reveal?',
      ],
    },
    {
      id: 'q-nlp-kp30-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Which approach is commonly used to reduce toxic output from language models during training?',
      options: [
        'Removing all hate speech examples from the pretraining corpus and retraining from scratch',
        'Reinforcement Learning from Human Feedback (RLHF), where a reward model trained on human preferences guides fine-tuning',
        'Adding a post-processing filter that blocks any sentence containing a profanity list',
        'Reducing the model\'s temperature to near zero during fine-tuning',
      ],
      correctAnswer: 1,
      explanation: 'RLHF trains a reward model on human preference data and uses it to fine-tune the LLM via PPO, aligning the model toward helpful, harmless, and honest outputs rather than simply maximising next-token likelihood.',
      hints: [
        'Human preferences encode nuanced notions of safety that are hard to capture with simple rules.',
        'What loss function would you use if you have pairs with continuous similarity scores from 0 to 5?',
      ],
    },
    {
      id: 'q-nlp-kp30-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Debiasing word embeddings by removing the gender direction (e.g., via the Bolukbasi et al. hard debiasing method) completely eliminates gender bias in downstream NLP tasks.',
      correctAnswer: 'false',
      explanation: 'Hard debiasing reduces explicit gender associations in the embedding space but bias can persist in downstream models through other dimensions and training data; subsequent work (e.g., Gonen & Goldberg) showed residual bias remains detectable.',
      hints: [
        'If bias is encoded in many dimensions, removing one direction may not be sufficient.',
        'Think about whether bias in model outputs depends only on the embedding space or also on downstream training data.',
      ],
    },
  ],
}

registerQuestions(questions)
export default questions
