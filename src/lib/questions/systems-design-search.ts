import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "srch-inverted-index": [
    {
      id: "q-srch-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "During inverted index construction, what is the purpose of the 'posting list' for a given term?",
      options: [
        "A list of all terms in the vocabulary sorted by frequency",
        "A list of document IDs (and optionally positions/frequencies) that contain the term",
        "A hash map from document ID to the raw text of the document",
        "A sorted list of terms that co-occur with the given term"
      ],
      correctAnswer: 1,
      explanation: "A posting list records, for each term in the vocabulary, the set of documents that contain that term — along with optional metadata such as term frequency (TF) and token positions (needed for phrase queries). This is the core data structure of an inverted index: given a query term, you look it up in the vocabulary and retrieve its posting list to find candidate documents in O(1) vocabulary lookup + O(|posting list|) time.",
      hints: ["Think about what data structure enables fast lookup of 'which documents contain word X?'", "The name 'posting' comes from the act of posting a document ID to a term's list during index construction."],
    },
    {
      id: "q-srch-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "During tokenization for full-text search, which sequence of steps produces the most useful index tokens from the raw text 'Running quickly towards SUCCESS!'?",
      options: [
        "Lowercase \to remove punctuation \to split on whitespace \to stemming \to stop-word removal",
        "Split on whitespace \to stemming \to lowercase \to remove punctuation",
        "Remove punctuation \to stemming \to split on whitespace \to lowercase",
        "Lowercase \to stemming \to split on whitespace \to remove punctuation \to stop-word removal"
      ],
      correctAnswer: 0,
      explanation: "The standard NLP analysis pipeline for search is: (1) lowercase everything so 'SUCCESS' and 'success' match; (2) remove punctuation/special chars; (3) tokenize by splitting on whitespace; (4) apply stemming (e.g., Porter stemmer) to reduce 'Running' \to 'run', 'quickly' \to 'quick'; (5) remove stop words ('towards') that carry little discriminating information. This yields high-recall, normalized tokens. Doing stemming before lowercasing risks incorrect stems for uppercase words, and punctuation removal after splitting may leave punctuation attached to tokens.",
      hints: ["Stemming requires lowercase input to work correctly across most stemmers.", "Stop words are best removed after stemming so you catch all inflections of common words."],
    },
    {
      id: "q-srch-3",
      type: "true-false",
      difficulty: "easy",
      question: "Lemmatization and stemming always produce identical output for the same input word.",
      correctAnswer: "False",
      explanation: "False. Stemming applies rule-based heuristics to chop word endings (e.g., Porter stemmer: 'studies' \to 'studi'), often producing non-dictionary stems. Lemmatization uses vocabulary and morphological analysis to return the base dictionary form ('studies' \to 'study'). They diverge on irregular forms: stemming 'better' \to 'better', lemmatization 'better' \to 'good'. Lemmatization is more linguistically accurate but computationally heavier; stemming is faster but noisier.",
      hints: ["Consider the word 'ran' — what would each approach return?", "One approach needs a dictionary; the other just needs a set of suffix-stripping rules."],
    },
  ],

  "srch-tfidf-bm25": [
    {
      id: "q-srch-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "BM25 is preferred over TF-IDF in modern search engines primarily because of which two improvements?",
      options: [
        "BM25 uses neural embeddings for term matching; TF-IDF does not",
        "BM25 caps the TF contribution (saturation) and normalizes for document length; classical TF-IDF does neither",
        "BM25 indexes bigrams automatically; TF-IDF only supports unigrams",
        "BM25 uses inverted document frequency only; TF-IDF also includes term frequency"
      ],
      correctAnswer: 1,
      explanation: "BM25 (Best Match 25) improves on TF-IDF in two critical ways: (1) Term-frequency saturation — in TF-IDF, a term appearing 100 times scores 10x more than one appearing 10 times. BM25 uses a saturating function (tf / (tf + k1)) so after a few occurrences, more occurrences add diminishing value. (2) Document-length normalization — long documents naturally contain more term occurrences; BM25 penalizes longer documents relative to the average document length via parameter b (0=no normalization, 1=full normalization). These give more robust relevance scores without neural components.",
      hints: ["What happens to TF-IDF score if a term appears in a very long document 1,000 times vs. a short document 10 times?", "The 'k1' and 'b' parameters in BM25 control term-saturation and length normalization respectively."],
    },
    {
      id: "q-srch-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In BM25, setting the length normalization parameter b=0 and the term saturation parameter k1=0 effectively reduces BM25 to which scoring model?",
      options: [
        "Pure IDF scoring — terms are weighted only by inverse document frequency, ignoring TF entirely",
        "Pure TF scoring — documents are ranked only by raw term count",
        "Binary independence model — each document scores 1 if it contains the term, 0 otherwise",
        "Language model with Dirichlet smoothing"
      ],
      correctAnswer: 0,
      explanation: "When k1=0, the TF saturation term (tf / (tf + k1)) becomes (tf / tf) = 1 regardless of actual tf, so term frequency is completely ignored. When b=0, document length normalization is fully disabled. The BM25 score then reduces to the sum of IDF weights of query terms that appear in the document — a pure IDF model. This is a degenerate but theoretically illuminating case showing BM25 degrades gracefully to simpler models at parameter extremes.",
      hints: ["Substitute k1=0 into the BM25 TF saturation formula tf/(tf+k1*(1-b+b*dl/avgdl)) and simplify.", "What remains in the scoring formula when TF and length normalization are both removed?"],
    },
  ],

  "srch-crawler-architecture": [
    {
      id: "q-srch-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A web crawler needs to be 'polite' to target web servers. Which combination of mechanisms best implements crawler politeness?",
      options: [
        "Respecting robots.txt Crawl-delay directives, per-domain rate limiting, and randomized inter-request delays",
        "Using a single global thread pool with a maximum of 100 concurrent connections regardless of target domain",
        "Crawling only HTTPS sites and ignoring HTTP, since HTTPS servers can handle more load",
        "Prioritizing sitemaps over individual URL crawling to reduce server scanning"
      ],
      correctAnswer: 0,
      explanation: "Crawler politeness requires three complementary mechanisms: (1) Respect robots.txt — parse /robots.txt before crawling any URL on a domain and honor Crawl-delay, Disallow, and Allow directives; (2) Per-domain rate limiting — maintain a separate delay queue per domain (e.g., one request per 2 seconds per domain) rather than a global rate, since 100 req/s to one server is impolite even if spread across 1000 domains; (3) Randomized delays — avoid predictable burst patterns that look like DoS attacks. These three together prevent overloading any single origin server.",
      hints: ["Even with robots.txt compliance, crawling a single domain at 100 req/s can DoS a small server.", "robots.txt is fetched first and cached; Crawl-delay specifies minimum seconds between requests to that domain."],
    },
    {
      id: "q-srch-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A Google-scale web crawler uses a distributed frontier queue to manage URLs to crawl. Which data structure and partitioning strategy best handles billions of pending URLs with priority-based scheduling?",
      options: [
        "A single Redis sorted set with URLs as members and crawl-priority as score, shared by all crawler workers",
        "Per-domain FIFO queues stored in a distributed key-value store, with a front-end prioritizer that selects which domain queue to pull from next based on domain scores",
        "A relational database table with a 'next_crawl_at' timestamp column, indexed and polled by workers via SELECT FOR UPDATE SKIP LOCKED",
        "An in-memory min-heap on each crawler node, periodically checkpointed to disk"
      ],
      correctAnswer: 1,
      explanation: "Google's crawler architecture (described in the original PageRank paper and subsequent publications) uses a two-tier frontier: (1) per-domain back-queues that maintain FIFO ordering within a domain (ensuring politeness — no two requests to the same domain are dequeued simultaneously); (2) a front-end prioritizer that assigns scores to domain queues based on freshness signals and PageRank, selecting which domain queue feeds the next crawl slot. A single Redis sorted set becomes a bottleneck at billions of URLs and doesn't enforce per-domain politeness. A DB polling approach creates write hotspots. Per-node heaps lose work on crashes.",
      hints: ["How do you enforce per-domain rate limiting if all URLs are in a single shared queue?", "The crawler needs to maximize throughput globally while never hammering any single domain."],
    },
  ],

  "srch-pagerank": [
    {
      id: "q-srch-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In the PageRank algorithm, what is the purpose of the damping factor d (typically set to 0.85)?",
      options: [
        "It controls how many iterations the algorithm runs before convergence",
        "It models the probability that a random web surfer follows a link on the current page vs. teleports to a random page, preventing rank sinks",
        "It normalizes PageRank scores so they sum to 1.0 across all pages",
        "It penalizes pages with too many outgoing links to prevent link farming"
      ],
      correctAnswer: 1,
      explanation: "The damping factor d (0.85 in the original PageRank paper) models the 'random surfer' behavior: with probability d the surfer follows an actual hyperlink on the current page; with probability (1-d) they get 'bored' and teleport to a random page in the graph. Without this teleportation term, 'dangling nodes' (pages with no outgoing links) and 'rank sinks' (groups of pages linking only to each other) would absorb all PageRank without redistributing it. The formula PR(A) = (1-d)/N + d * Σ(PR(T_i)/C(T_i)) ensures every page has a minimum baseline rank via the (1-d)/N term.",
      hints: ["What happens to a page with no outgoing links — where does its PageRank go without the damping factor?", "Think of d as the probability of 'following a link' in the random surfer model."],
    },
    {
      id: "q-srch-9",
      type: "true-false",
      difficulty: "easy",
      question: "PageRank scores are computed once at index build time and never updated until the next full crawl.",
      correctAnswer: "False",
      explanation: "False. Modern search engines including Google continuously update PageRank-like scores using incremental and approximate update algorithms. Techniques include: topic-sensitive PageRank computed per-category, TrustRank variants, and real-time signals (click-through rates, freshness). Google's original paper acknowledged that re-crawling and re-computing PageRank must happen regularly as the web evolves. Additionally, the static link-graph PageRank is just one signal among hundreds; the 'living' ranking system blends it with real-time behavioral signals continuously.",
      hints: ["The web changes constantly — new pages are added and links change daily.", "If PageRank were static, newly published pages would never rank well until the next full re-computation."],
    },
  ],

  "srch-index-sharding": [
    {
      id: "q-srch-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A search system distributes its inverted index across 100 shards. In 'document partitioning' (horizontal sharding), a query for 'distributed systems' must:",
      options: [
        "Route only to the shard whose hash range includes the term 'distributed'",
        "Broadcast the query to all 100 shards (scatter), merge and re-rank the top-K results from each (gather)",
        "Route to exactly two shards — one for 'distributed' and one for 'systems'",
        "Query the master shard which maintains a global vocabulary and delegates to leaf shards"
      ],
      correctAnswer: 1,
      explanation: "In document partitioning (each shard holds a complete inverted index over a subset of documents), a query must be broadcast (scattered) to ALL shards because any shard might contain highly-relevant documents for the query. Each shard independently computes its local top-K results, returning them to the coordinator, which merges and re-ranks globally (gather phase). This is the 'scatter-gather' pattern. It's expensive (fan-out = number of shards) but unavoidable because relevance is computed per-shard and cannot be pre-determined by routing. Term partitioning (each shard owns a subset of the vocabulary) avoids fan-out but requires a shard per query term, causing multi-round trips for multi-term queries.",
      hints: ["In document partitioning, every shard has its own inverted index — how would you know which shard has the best document for your query?", "Compare document partitioning to term partitioning: which avoids scatter-gather?"],
    },
    {
      id: "q-srch-11",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which sharding strategy is better suited for minimizing query latency on multi-term queries in a large-scale search system, and why?",
      options: [
        "Term partitioning, because each query term is handled by one shard, eliminating fan-out",
        "Document partitioning, because each shard independently scores documents without inter-shard communication",
        "Random partitioning, because it balances load perfectly and any shard can answer any query",
        "Geo partitioning, because queries are typically location-specific"
      ],
      correctAnswer: 1,
      explanation: "Document partitioning is generally preferred for multi-term queries because: (1) Each shard independently processes the full query using its local inverted index — no inter-shard coordination required during query execution; (2) Scatter-gather is parallelized, so latency is bounded by the slowest shard (P99), not proportional to the number of query terms; (3) Term partitioning for multi-term queries requires iterating across multiple shards and merging intermediate posting lists before scoring, creating complex coordination. Document partitioning is what Elasticsearch, Solr, and Google use at scale.",
      hints: ["For a 5-term query, how many shard lookups does term partitioning require vs document partitioning?", "Document partitioning trades higher fan-out for simpler per-shard computation."],
    },
  ],

  "srch-ranking-pipeline": [
    {
      id: "q-srch-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Modern production search ranking uses a multi-stage pipeline. What is the correct order of stages from broadest to most precise?",
      options: [
        "Re-ranking (ML model) \to Ranking (BM25/features) \to Recall (inverted index) \to Business rules",
        "Recall (inverted index/ANN) \to Ranking (fast ML model, ~1000 candidates) \to Re-ranking (expensive ML model, ~100 candidates) \to Business rules/boosting",
        "Business rules \to Recall \to Re-ranking \to Ranking",
        "Ranking \to Recall \to Re-ranking \to Personalization"
      ],
      correctAnswer: 1,
      explanation: "The standard multi-stage search ranking funnel is: (1) Recall — retrieve thousands of candidate documents using inverted index (BM25) or ANN vector search; goal is high recall, not precision. (2) Ranking — apply a fast ML model (e.g., LightGBM with 100s of features) to score ~1000 candidates; must be fast (<10ms). (3) Re-ranking — apply an expensive model (e.g., cross-encoder, BERT-based) to top ~100 candidates for precision; can afford more compute. (4) Business rules — apply boost/bury logic, deduplication, diversity, sponsored results injection. Each stage narrows the candidate set while increasing scoring quality.",
      hints: ["Think of the funnel shape: wide at top (recall), narrow at bottom (final ranking).", "Why can't you apply the most expensive model to all indexed documents?"],
    },
  ],

  "srch-autocomplete": [
    {
      id: "q-srch-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You need to implement search autocomplete (typeahead) that returns the top 5 most popular completions for a given prefix in under 5ms. Which approach is most appropriate for a system with 10 million unique queries?",
      options: [
        "Full-text Elasticsearch query with a match_phrase_prefix query on a query-log index",
        "A prefix trie in memory where each node stores the top-K completions for that prefix, pre-computed offline",
        "A SQL LIKE 'prefix%' query on a query frequency table with a B-tree index on the query column",
        "A weighted finite automaton (WFA) stored on disk, loaded per request"
      ],
      correctAnswer: 1,
      explanation: "A prefix trie (also called a completion trie or autocomplete trie) with cached top-K results at every node is the fastest autocomplete structure. Each node stores not just child pointers but also the pre-computed top-K (e.g., top-5) completions for that prefix — updated offline from query logs. Lookup is O(prefix length) with no ranking computation at serve time. At 10M unique queries with a bounded alphabet, this fits in memory (a few GB). Elasticsearch prefix queries are accurate but add network RTT and internal query parsing. SQL LIKE queries with B-tree indexes are fast for small datasets but degrade at scale. WFAs require disk I/O per request.",
      hints: ["What data structure allows O(L) prefix lookup where L is the length of the typed prefix?", "The key insight is pre-computing top-K completions offline so serve time is pure traversal."],
    },
    {
      id: "q-srch-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A Redis Sorted Set is used for autocomplete by storing query strings as members and their search frequency as scores. Given prefix 'py', which Redis command pattern retrieves completions efficiently?",
      options: [
        "ZSCAN with a MATCH 'py*' pattern to iterate the sorted set and filter by prefix",
        "ZRANGEBYLEX (or ZRANGEBYSCORE) combined with a lexicographic range trick: ZRANGEBYLEX key [py (py\\xff to get all members starting with 'py'",
        "SMEMBERS on a separate set 'prefix:py' maintained by the application",
        "KEYS 'autocomplete:py*' to find all keys matching the prefix pattern"
      ],
      correctAnswer: 1,
      explanation: "The Redis lexicographic autocomplete pattern stores all query strings in a sorted set with score=0 (so Redis orders them lexicographically). ZRANGEBYLEX key '[py' '[py\\xff' retrieves all members between 'py' and 'py' followed by the highest byte value (0xFF), which captures all strings starting with 'py'. This is O(log N + M) where M is the number of matches — extremely fast. The score can encode actual frequency in a separate sorted set or via a suffix trick (appending a delimiter + encoded rank). ZSCAN with MATCH is O(N) full scan. KEYS is O(N) and should never be used in production. A separate set per prefix requires maintaining N*L keys.",
      hints: ["ZRANGEBYLEX requires all members to have the same score (0) so Redis sorts by member string lexicographically.", "What byte value acts as the 'greatest possible suffix' to cap the range at strings starting with 'py'?"],
    },
  ],

  "srch-spelling-correction": [
    {
      id: "q-srch-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Google's 'Did you mean' feature uses the Noisy Channel Model for spelling correction. Which formula best describes this model?",
      options: [
        "argmax_w P(w | q) = argmax_w P(q | w) * P(w)",
        "argmax_w P(w) / P(q | w)",
        "argmax_w edit_distance(w, q)",
        "argmax_w TF-IDF(w) * P(q | w)"
      ],
      correctAnswer: 0,
      explanation: "The Noisy Channel Model treats the query q as a 'noisy' version of the intended word w, transmitted through a noisy channel (the user's keyboard/mind). We want: argmax_w P(w | q) which by Bayes' theorem = argmax_w P(q | w) * P(w) / P(q). Since P(q) is constant for all candidates w, we maximize P(q | w) * P(w) where: P(w) is the language model (prior probability of intended word w, estimated from query frequency logs); P(q | w) is the error model (probability that w was mistyped as q, estimated from edit distance and keyboard layout). Combined, this naturally favors common words (high P(w)) that are close to the typed query (high P(q|w)).",
      hints: ["The Noisy Channel Model applies Bayes' theorem: P(intended | observed) ∝ P(observed | intended) * P(intended).", "P(w) is the language model — what prior probability should 'python' have vs 'pyhton'?"],
    },
  ],

  "srch-semantic-search": [
    {
      id: "q-srch-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In dense retrieval for semantic search, a bi-encoder model encodes queries and documents independently. What is the key limitation of this architecture compared to a cross-encoder?",
      options: [
        "Bi-encoders cannot be fine-tuned on labeled query-document pairs",
        "Bi-encoders produce fixed-size embeddings that cannot capture long-document context beyond the model's max token limit, and they miss query-document interaction at encoding time — limiting precision",
        "Bi-encoders require re-encoding all documents for every new query, making them slower than cross-encoders at inference",
        "Bi-encoders use cosine similarity which is less accurate than dot product for retrieval"
      ],
      correctAnswer: 1,
      explanation: "Bi-encoders encode query and document independently into fixed-size vectors (e.g., 768-dimensional), then compute similarity via dot product or cosine. The key limitations are: (1) Context length — documents longer than the model's max tokens (e.g., 512 for BERT) must be chunked or truncated, losing long-range context; (2) No cross-attention at encode time — the encoder cannot model query-document interactions (e.g., knowing 'bank' means 'river bank' in the context of the query 'fishing'). Cross-encoders concatenate query+document and run full cross-attention, yielding higher precision but no pre-indexable document representations. This is why bi-encoders are used for recall (fast ANN) and cross-encoders for re-ranking (slow but precise).",
      hints: ["Can a bi-encoder document embedding change based on the query? What about a cross-encoder?", "Why can bi-encoder document embeddings be pre-computed and indexed, but cross-encoder scores cannot?"],
    },
    {
      id: "q-srch-17",
      type: "multiple-choice",
      difficulty: "hard",
      question: "HNSW (Hierarchical Navigable Small World) is the dominant ANN index for vector search. What is the role of the 'ef_construction' parameter during index build time?",
      options: [
        "It controls the maximum number of neighbors each node maintains in the lowest layer of the graph",
        "It sets the size of the dynamic candidate list during graph construction — larger values mean more accurate edges but slower build time",
        "It determines the number of hierarchical layers in the HNSW graph",
        "It controls the beam width during query-time search, trading accuracy for speed"
      ],
      correctAnswer: 1,
      explanation: "In HNSW, ef_construction controls the size of the dynamic candidate list maintained during the greedy graph-building phase. When inserting a new node, the algorithm traverses the graph greedily to find the nearest neighbors for that node's new edges. ef_construction determines how many candidates are kept in the priority queue during this traversal. Larger ef_construction \to more thorough neighbor search \to higher-quality graph edges \to better recall at query time, but slower index construction and more memory during build. ef_search (a separate parameter) controls the same list size at query time. The number of layers is controlled by 'M' (max neighbors per node), which implicitly determines the number of layers via a probability distribution.",
      hints: ["ef_construction affects the build phase only; ef_search affects query time only.", "Think of ef_construction as the 'search budget' spent when wiring up a new node's edges in the graph."],
    },
  ],

  "srch-hybrid-search": [
    {
      id: "q-srch-18",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Reciprocal Rank Fusion (RRF) combines rankings from BM25 and vector search. Given document D ranked 2nd by BM25 and 5th by vector search (with k=60), what is its RRF score?",
      options: [
        "1/(60+2) + 1/(60+5) = 0.01613 + 0.01538 = 0.03151",
        "1/2 + 1/5 = 0.500 + 0.200 = 0.700",
        "(2 + 5) / 2 = 3.5 (average rank)",
        "min(2, 5) = 2 (best rank wins)"
      ],
      correctAnswer: 0,
      explanation: "RRF score = $\\sum 1/(k + \\text{rank}_i)$ across all rankers i, where k=60 is a constant that dampens the impact of top-ranked documents from any single system (preventing one ranker from dominating). For document D: RRF = 1/(60+2) + 1/(60+5) = 1/62 + 1/65 \\approx 0.01613 + 0.01538 \\approx 0.03151. The k=60 default was chosen empirically in the original Cormack et al. 2009 paper. RRF is robust, requires no score normalization (unlike linear combination of BM25 and cosine scores which have incompatible scales), and outperforms many learned fusion approaches despite its simplicity.",
      hints: ["RRF uses reciprocal of (k + rank), not the raw score from each system.", "k=60 prevents documents ranked 1st from scoring too far above documents ranked 2nd or 3rd."],
    },
    {
      id: "q-srch-19",
      type: "true-false",
      difficulty: "medium",
      question: "Hybrid search combining BM25 and vector search always outperforms either method alone on all benchmark datasets.",
      correctAnswer: "False",
      explanation: "False. While hybrid search often outperforms either method individually on most benchmarks, this is not universal. On datasets with highly specialized vocabulary (e.g., medical codes, legal citations), BM25 alone can match or exceed hybrid performance because exact term matching is critical and semantic generalization hurts precision. On purely conversational or semantic datasets, vector search alone can outperform hybrid. The BEIR benchmark shows significant variation across domains. Hybrid search adds complexity (two indexes, score fusion logic) and latency; it should be validated empirically per use case rather than assumed universally superior.",
      hints: ["Consider a legal document retrieval task where the exact case citation number must match — does semantic search help here?", "The BEIR benchmark evaluates retrieval across 18+ diverse datasets — does one method win on all of them?"],
    },
  ],

  "srch-elasticsearch-cluster": [
    {
      id: "q-srch-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Elasticsearch, what is the difference between a primary shard and a replica shard, and what happens during a primary shard failure?",
      options: [
        "Primary shards handle writes only; replica shards handle reads only. On failure, the cluster becomes read-only.",
        "Primary shards are the authoritative copies that handle both reads and writes. Replicas are synchronous copies. On primary failure, Elasticsearch automatically promotes a replica to primary with no data loss.",
        "Replica shards are larger than primary shards because they store additional metadata for faster queries.",
        "Primary and replica shards are identical; the difference is only in which node they are assigned to by the master node."
      ],
      correctAnswer: 1,
      explanation: "In Elasticsearch: Primary shards are the authoritative copies of index data; all indexing operations (writes) go to the primary first, which then replicates to replicas synchronously before acknowledging the write. Replica shards serve two purposes: read scalability (searches can be routed to either primary or replica) and high availability. When a primary shard fails, the cluster master node detects the failure and promotes one of the in-sync replicas to primary. Because writes were synchronously replicated before acknowledgment, no data is lost. The cluster status transitions from 'green' \to 'yellow' (all primaries assigned, some replicas unassigned) \to back to 'green' once Elasticsearch reassigns a new replica to a healthy node.",
      hints: ["Does Elasticsearch wait for replica acknowledgment before confirming a write to the client?", "What is the cluster health status when all primaries are assigned but some replicas are not?"],
    },
    {
      id: "q-srch-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Elasticsearch, what is the difference between 'refresh' and 'flush', and which one controls near-real-time (NRT) search?",
      options: [
        "Refresh writes the in-memory buffer to a new Lucene segment (making docs searchable); flush calls fsync to durably persist segments to disk. Refresh (default: 1s) controls NRT.",
        "Flush writes to the in-memory buffer; refresh calls fsync. Flush controls NRT.",
        "Refresh and flush are synonymous — both write to disk and make documents searchable.",
        "Refresh controls shard rebalancing; flush controls segment merging."
      ],
      correctAnswer: 0,
      explanation: "Elasticsearch has a two-phase persistence model: (1) Refresh (default: every 1 second) — writes documents from the in-memory indexing buffer to a new Lucene segment in memory (via lucene.IndexWriter.commit), making them searchable. This is the NRT mechanism — documents become searchable within ~1 second. The segment is not yet durably persisted to disk. (2) Flush — calls Lucene's fsync to write all segments to disk and advance the translog checkpoint. This ensures durability across restarts. The translog (write-ahead log) captures all operations between flushes for crash recovery. Refresh is what makes ES 'near-real-time' rather than real-time.",
      hints: ["After a refresh, are documents searchable? After a flush, are documents durable?", "If a node crashes between a refresh and a flush, are the refreshed-but-not-flushed documents lost? How are they recovered?"],
    },
  ],

  "srch-query-latency": [
    {
      id: "q-srch-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A distributed search system with 50 shards has P50 shard latency of 20ms and P99 shard latency of 200ms. What is the approximate P99 end-to-end query latency if the coordinator waits for ALL shards (scatter-gather)?",
      options: [
        "~200ms — same as single-shard P99, since we only wait for the slowest shard",
        "~400ms — P99 latency doubles with 50 shards due to the 'straggler' effect",
        "~20ms — averaging across 50 shards brings latency close to the median",
        "~1000ms — total latency is the sum of all shard latencies in series"
      ],
      correctAnswer: 1,
      explanation: "With 50 parallel shards, the coordinator waits for ALL of them (scatter-gather requires complete results for global ranking). The end-to-end latency is determined by the slowest shard — the maximum of 50 independent samples. For independent identically distributed latency distributions, P(max(X_1,...,X_50) <= t) = P(X <= t)^50. If P99 of a single shard is 200ms, then P(X <= 200ms) = 0.99. P(max of 50 <= 200ms) = 0.99^50 approx 0.605. So only 60.5% of queries complete within 200ms across all 50 shards — the P99 of the max is much higher (~400ms is a rough estimate). This is the 'tail latency amplification' problem; solutions include hedged requests and result set sampling.",
      hints: ["P(all 50 shards finish in <= 200ms) = P(one shard <= 200ms)^50 = 0.99^50 approx 0.605 — what does that say about the P99 of the maximum?", "Hedged requests (send duplicate request to a second shard if first doesn't respond in X ms) are one mitigation."],
    },
  ],

  "srch-query-understanding": [
    {
      id: "q-srch-23",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user searches for 'apple' on a general search engine. What query understanding technique determines whether they mean the fruit, the company, or the smartphone?",
      options: [
        "Stemming — reduce 'apple' to its root form and search all variants",
        "Intent classification and entity disambiguation — classify the query as navigational/informational/transactional and use context signals (prior queries, location, device) to select the correct entity sense",
        "Synonym expansion — add 'fruit', 'iPhone', and 'Macbook' as synonym terms to the query",
        "BM25 scoring — the most frequent sense in the corpus automatically ranks higher"
      ],
      correctAnswer: 1,
      explanation: "Query understanding for ambiguous queries (like 'apple') requires: (1) Intent classification — is this a navigational query (user wants apple.com), informational (user wants to learn about apples), or transactional (user wants to buy)? (2) Entity disambiguation — using contextual signals: prior queries in the session ('how to cook'), location (near an Apple Store), device (iPhone user), and time of day. Google uses knowledge graph entity linking to resolve named entities to canonical IDs (Apple Inc. KG ID: /m/0k8z). Simple BM25 ranking favors the highest-IDF sense, which may not match intent. Synonym expansion adds unrelated senses, hurting precision.",
      hints: ["What contextual signals beyond the query string help determine user intent?", "The Knowledge Graph provides canonical entity representations that can be matched to query tokens."],
    },
  ],

  "srch-learning-to-rank": [
    {
      id: "q-srch-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LambdaMART is a Learning to Rank algorithm that directly optimizes NDCG. Which statement best describes how it achieves this, given that NDCG is not differentiable?",
      options: [
        "LambdaMART approximates NDCG with a smooth surrogate loss function and minimizes it using gradient descent on a neural network",
        "LambdaMART uses gradient boosted trees (MART) where the gradients (lambdas) are pseudo-gradients derived from NDCG-weighted pairwise preferences, bypassing the need for a differentiable loss",
        "LambdaMART samples random document pairs and trains a binary classifier on which is more relevant, then aggregates pair scores",
        "LambdaMART uses reinforcement learning with NDCG as the reward signal for each ranking episode"
      ],
      correctAnswer: 1,
      explanation: "LambdaMART combines two ideas: (1) LambdaRank — instead of directly differentiating NDCG (which is a step function, hence non-differentiable), LambdaRank defines pseudo-gradients (lambdas) for each document pair (i,j). The lambda for pair (i,j) is proportional to the change in NDCG if documents i and j were swapped, weighted by the pairwise RankNet cross-entropy gradient. This lets you 'approximate' optimizing NDCG without its gradient. (2) MART (Multiple Additive Regression Trees) — gradient boosted trees are fit to these lambda pseudo-gradients rather than traditional loss gradients. This combination (Lambda + MART) yields state-of-the-art LTR performance and is used by Microsoft, Yahoo, and others in production.",
      hints: ["NDCG is a step function — what mathematical trick bypasses the need for its gradient?", "How does the NDCG delta (change in NDCG from swapping two documents) factor into the lambda computation?"],
    },
  ],

  "srch-ab-testing": [
    {
      id: "q-srch-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Search A/B testing using interleaving (e.g., team-draft interleaving) is preferred over side-by-side bucket tests for ranking changes. Why?",
      options: [
        "Interleaving requires fewer users to detect the same effect size, because every user sees results from both rankers and comparisons are within-user",
        "Interleaving eliminates the need for click logging, reducing infrastructure complexity",
        "Interleaving prevents position bias because both rankers always contribute equal numbers of results",
        "Interleaving can be run without a control group, making it faster to deploy"
      ],
      correctAnswer: 0,
      explanation: "Interleaving (team-draft interleaving, balanced interleaving) merges result lists from Ranker A and Ranker B into a single result list shown to one user. Click signals are then attributed back to the ranker that 'contributed' each clicked document. Because comparisons are within-user (each user sees both rankers), user-level variance is eliminated — the same user intent, location, device, and behavioral noise affects both rankers equally. This within-user design dramatically reduces the sample size needed to reach statistical significance (often 10-100x fewer users than bucket tests). Side-by-side bucket tests require enough users per bucket to overcome between-user variance.",
      hints: ["In bucket testing, User A sees Ranker A and User B sees Ranker B — what noise sources affect this comparison that interleaving eliminates?", "Why does within-user comparison reduce variance?"],
    },
  ],

  "srch-faceted-search": [
    {
      id: "q-srch-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Elasticsearch, what is the critical performance difference between placing a filter in the 'filter context' vs the 'query context' of a bool query?",
      options: [
        "Filter context filters are applied after scoring; query context filters are applied before scoring",
        "Filter context clauses are not scored (binary match/no-match) and their results are cached in the filter cache; query context clauses are scored and not cached",
        "Filter context supports only term-level queries; query context supports full-text queries",
        "Filter context runs on replicas only; query context runs on primaries only"
      ],
      correctAnswer: 1,
      explanation: "Elasticsearch bool query has 'must', 'should' (query context — affect score) and 'filter', 'must_not' (filter context — do not affect score). Filter context clauses: (1) Are purely binary — document either matches or doesn't; (2) Are cached in the 'filter cache' (a bitset per segment) — subsequent queries with the same filter reuse the cached bitset without re-evaluation; (3) Skip relevance score computation entirely. Query context clauses affect the _score and are not cached. For faceted search, using filter context for facet constraints (e.g., brand=Nike, price<100) is critical for performance: filter results are cached as bitsets and combined with bitwise AND operations, then ANDed with query results. Misplacing a filter in query context wastes CPU on scoring and defeats caching.",
      hints: ["What is the difference in computational cost between computing a relevance score and checking a binary condition?", "Why does caching filter bitsets dramatically speed up faceted navigation where users repeatedly drill down?"],
    },
  ],

  "srch-geo-search": [
    {
      id: "q-srch-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A location-based search needs to find all restaurants within 5km of a user's coordinates. Which geospatial indexing approach does Elasticsearch use natively, and what is its time complexity?",
      options: [
        "Geohash grid — encodes coordinates into a base-32 string prefix; proximity search uses prefix matching with O(1) lookup but rectangular approximation",
        "R-tree spatial index — exact distance queries in O(log N); used by PostGIS and MongoDB",
        "S2 geometry library — hierarchical cell decomposition on the unit sphere; O(log N) range queries",
        "Elasticsearch uses a Lucene BKD-tree (k-d tree variant) for geo_point fields, supporting geo_distance queries in O(log N)"
      ],
      correctAnswer: 3,
      explanation: "Elasticsearch uses Lucene's BKD-tree (Block K-Dimensional tree) to index geo_point fields. BKD trees are a disk-friendly k-d tree variant that stores points in sorted order within blocks, enabling efficient range queries (bounding box, geo_distance) in O(log N) time. A geo_distance query constructs a bounding box around the center point, uses the BKD tree to find candidates, then applies exact Haversine distance filtering. Geohash is a common encoding scheme (Elasticsearch also supports it) but it's an approximation and proximity search requires checking multiple neighboring cells. R-trees are used by PostGIS. S2 is used by Google Maps and supported by some search systems but not natively by Elasticsearch.",
      hints: ["Lucene uses BKD trees for all numeric range queries, not just geo — they generalize k-d trees to be disk-friendly.", "Geohash prefix matching only approximates geo proximity — nearby points can have very different geohash prefixes at cell boundaries."],
    },
  ],

  "srch-realtime-indexing": [
    {
      id: "q-srch-28",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A real-time search indexing pipeline uses Kafka \to Flink \to Elasticsearch. A downstream Elasticsearch node is slow, causing consumer lag to grow on the Kafka topic. What is the correct mitigation strategy that preserves document ordering within a partition?",
      options: [
        "Add more Kafka partitions to parallelize ingest across more Elasticsearch nodes",
        "Increase Flink parallelism by adding more task slots per Flink task manager, ensuring each Kafka partition is still consumed by exactly one Flink task to preserve per-partition ordering",
        "Batch multiple Kafka messages into a single Elasticsearch bulk request and process them synchronously",
        "Enable Kafka consumer group auto-rebalancing to distribute partitions more evenly across Flink workers"
      ],
      correctAnswer: 1,
      explanation: "Kafka guarantees ordering within a partition, not across partitions. If document order matters (e.g., update events for the same document ID), you must ensure a single consumer task reads each partition. Increasing Flink parallelism by adding task slots (Flink subtasks) allows more Kafka partitions to be processed concurrently, each by one Flink subtask — maintaining per-partition ordering guarantees. Adding more Kafka partitions can help long-term but doesn't help immediately and changes the partition assignment. Batching alone doesn't solve the slow Elasticsearch consumer problem if the bottleneck is ES write throughput. Auto-rebalancing causes a brief stop-the-world pause and doesn't fix the ES bottleneck.",
      hints: ["What does Kafka guarantee: ordering within a partition, or ordering across all partitions?", "For document updates to the same doc ID, why does per-partition ordering matter for correctness?"],
    },
  ],

  "srch-caching": [
    {
      id: "q-srch-29",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Elasticsearch has multiple caching layers. Which cache is most impactful for repeated filter queries on faceted search, and what is its eviction policy?",
      options: [
        "The query cache (shard-level LRU cache keyed by the full query JSON) — evicts least recently used entries when full",
        "The request cache (coordinating-node cache keyed by shard-level aggregation results) — evicts on index refresh",
        "The field data cache (for sorting and aggregations on analyzed string fields) — evicts when the JVM heap pressure exceeds a threshold",
        "The OS filesystem cache (Linux page cache backing Lucene segment files) — evicted by the OS based on LRU/LFU"
      ],
      correctAnswer: 0,
      explanation: "The Elasticsearch query cache (called 'filter cache' in older versions) is most impactful for faceted search. It caches filter context query results as bitsets per Lucene segment, keyed by the filter clause structure. Filters like {term: {brand: 'Nike'}} are cached after being used >=2 times on a segment. The cache uses an LRU eviction policy with a default size of 10% of the JVM heap. When a segment is refreshed (new documents added), its cache entries are invalidated — this is why frequent refreshes reduce filter cache effectiveness. The request cache caches entire shard-level responses (good for aggregations but invalidated on any refresh). FieldData cache is for in-memory doc values. OS cache is not Elasticsearch-controlled.",
      hints: ["Which cache stores binary bitsets representing 'which documents match this filter'?", "When is a filter cache entry invalidated — on every refresh or only when the filter changes?"],
    },
  ],

  "srch-vector-db-internals": [
    {
      id: "q-srch-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Pinecone and Weaviate both use HNSW for vector search. What is the trade-off between ef_search and query latency/recall in HNSW at query time?",
      options: [
        "Higher ef_search increases recall (more candidates explored) at the cost of higher latency; lower ef_search is faster but may miss true nearest neighbors",
        "Higher ef_search reduces latency because the greedy graph traversal terminates earlier with more candidates",
        "ef_search controls index build time only and has no effect on query latency",
        "Higher ef_search increases recall but also increases index memory usage proportionally"
      ],
      correctAnswer: 0,
      explanation: "At query time, HNSW performs a greedy beam search starting from the entry point in the top layer, descending through layers, and performing a more thorough search in the bottom layer. ef_search controls the size of the dynamic candidate list (beam) during the bottom-layer search: (1) Higher ef_search \to more candidates kept in the priority queue \to wider exploration of the graph \to higher probability of finding the true nearest neighbors \to better recall (e.g., recall@10 goes from 85% to 99%); but more graph edges traversed \to higher latency (e.g., 2ms \to 10ms). (2) Lower ef_search \to faster, fewer graph traversals, but higher chance of terminating in a local minimum and missing true neighbors. This is the fundamental recall-latency trade-off in approximate nearest neighbor search. ef_search does NOT affect memory — it only affects the runtime search beam width.",
      hints: ["ef_search is a runtime parameter — it controls how aggressively the query-time greedy search explores the graph.", "Can you always improve recall by increasing ef_search? What is the cost?"],
    },
  ],
};

registerQuestions(questions);

export default questions;
