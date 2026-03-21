import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-ecom-inventory": [
    {
      id: "q-ecom-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce platform processes 10,000 concurrent purchases of the same item during a flash sale. Which approach best prevents overselling while maintaining high throughput?",
      options: [
        "Pessimistic locking (SELECT FOR UPDATE) on the inventory row for every purchase request",
        "Pre-decrement inventory in Redis using DECR, reject if result < 0, then confirm asynchronously in the database",
        "Optimistic locking with check-and-set: read inventory version, update only if version unchanged, retry on conflict",
        "Application-level mutex using Redlock around the inventory check and update"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the bottleneck.** With 10,000 concurrent purchase requests for the same item, the critical challenge is ensuring that inventory is not oversold. A database row-level lock (pessimistic locking) would serialize all 10,000 requests through one lock, creating a throughput bottleneck. Optimistic locking with retry loops causes a thundering-herd problem — thousands of clients retry simultaneously.\n\n**Step 2: Evaluate which data store handles atomic operations best.** Redis processes commands serially on a single thread, so a DECR operation is inherently atomic — no two requests can read the same value simultaneously. This makes Redis the ideal buffer between the extreme concurrent request rate and the database.\n\n**Step 3: Select the architecture.** Pre-decrementing in Redis (DECR) atomically reserves inventory. If the result drops below 0, the item is out of stock and the decrement is reversed (INCR back). The database is updated asynchronously afterward. This approach prevents overselling, handles the traffic spike, and avoids DB lock contention — the correct pattern for flash sales.",
      hints: [
        "Think about which data store can handle 10,000 atomic operations per second without lock contention.",
        "Redis atomic commands like DECR serialize themselves — what does that mean for concurrent purchases?"
      ],
    },
  ],

  "sdi-ecom-search": [
    {
      id: "q-ecom-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce platform needs product search that handles typos, synonyms, and partial matches. Which Elasticsearch feature combination is most critical?",
      options: [
        "Increase shard count to distribute search load across more nodes",
        "Custom analyzers: edge n-gram tokenizer for prefix matching, synonym token filter, and fuzziness parameter in queries",
        "Index templates to apply the same mapping across multiple indices automatically",
        "Snapshot and restore to back up the index to S3 for disaster recovery"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the three core search challenges.** Product search must handle typos (samsng vs Samsung), synonyms (tv vs television), and partial matches (prefix autocomplete). These are three distinct text-matching problems that require different solutions.\n\n**Step 2: Match each challenge to an Elasticsearch feature.** Edge n-gram tokenizers break words into prefixes at index time, enabling prefix matching for autocomplete. Synonym token filters map equivalent terms so tv, television, and tv set all index to the same token. Fuzziness enables Levenshtein edit-distance matching (distance 1 or 2) to catch typos. These three components form a custom analyzer pipeline.\n\n**Step 3: Select the correct combination.** Custom analyzers handle all three challenges in a unified pipeline. Increasing shard count improves throughput but does not improve match quality. Index templates and snapshots are operational tooling, not relevance features.",
      hints: [
        "Which Elasticsearch configuration controls how text is broken into tokens at index time and query time?",
        "What handles tv matching television and samsng matching Samsung in the same pipeline?"
      ],
    },
  ],

  "sdi-ecom-recommendations": [
    {
      id: "q-ecom-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce platform wants to implement customers who bought X also bought Y using item-based collaborative filtering. Which design is correct at scale?",
      options: [
        "At query time, compute cosine similarity between item X and all other items using the live purchase matrix",
        "Precompute an item-to-item similarity matrix offline (nightly Spark job using ALS), store top-K similar items per item in Redis, and serve recommendations in O(1) at query time",
        "Train a neural collaborative filtering model online that updates with every purchase in real time",
        "Use user-based CF: find users similar to the buyer, recommend what those users bought next"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the query-time constraint.** Computing item similarity across millions of products at request time would require scanning the entire purchase matrix on every recommendation query — this is computationally infeasible and would introduce hundreds of milliseconds of latency.\n\n**Step 2: Evaluate online vs offline computation.** Online computation (option A) is too slow. Training an ML model in real time (option C) is expensive and unstable. User-based CF (option D) is less stable because user behavior changes constantly, requiring frequent recomputation.\n\n**Step 3: Select precomputation with online serving.** A nightly Spark job computes pairwise item similarities using cosine similarity on co-purchase vectors (or ALS matrix factorization) and stores the top-K most similar items per item in Redis. At query time, recommendations are a single O(1) key-value read. This is the architecture Amazon pioneered for item-based collaborative filtering at scale.",
      hints: [
        "What is the query-time complexity if you precompute and store top-K similar items per item in Redis?",
        "Why is item-based CF preferred over user-based CF for large catalogs?"
      ],
    },
  ],

  "sdi-ecom-cart": [
    {
      id: "q-ecom-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user adds items to their cart as a guest, then logs in. How should the system handle merging the guest cart with their existing logged-in cart?",
      options: [
        "Discard the guest cart and use the logged-in cart — the logged-in cart is more authoritative",
        "Discard the logged-in cart and use the guest cart — the user just added these items",
        "Merge: for items in both carts keep the higher quantity; for items only in one cart add them; de-duplicate by product_id",
        "Prompt the user to choose which cart to keep, showing both side-by-side"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify the merge scenario.** When a guest logs in, two carts exist: a guest cart (session_id keyed) and a logged-in cart (user_id keyed). The goal is to combine them without losing items or creating friction at a critical conversion moment.\n\n**Step 2: Evaluate each option.** Discarding either cart loses items the user intentionally added. Prompting the user to choose creates friction and increases cart abandonment. Neither is acceptable for a smooth conversion experience.\n\n**Step 3: Apply additive merge logic.** For product_ids in both carts, keep the higher quantity (the user likely intended more). For product_ids in only one cart, include them. De-duplicate by product_id. This additive merge preserves maximum user intent and is the industry standard — Shopify and Amazon both use this approach.",
      hints: [
        "What is the least destructive approach that preserves items from both carts?",
        "If the logged-in cart has qty=2 for a shirt and the guest cart has qty=3 for the same shirt, what quantity makes most sense?"
      ],
    },
  ],

  "sdi-ecom-orders": [
    {
      id: "q-ecom-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Order processing uses a distributed saga pattern: reserve inventory, capture payment, trigger fulfillment, send confirmation. If payment capture fails, what must happen?",
      options: [
        "Retry the payment capture indefinitely until it succeeds",
        "Execute compensating transactions in reverse: cancel fulfillment trigger (if started), void the payment authorization, release the inventory reservation",
        "Mark the order as failed and require the user to start a new checkout",
        "Roll back the entire saga using a two-phase commit across all services"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Understand the saga pattern.** A saga is a sequence of local transactions, each with a compensating transaction that undoes its effect. There are no distributed transactions — unlike 2PC, each service manages its own data and its own compensation logic.\n\n**Step 2: Identify the failure point and what was completed.** In the sequence (reserve inventory, capture payment, trigger fulfillment, send confirmation), if payment fails at step 2: no fulfillment was triggered, so no compensation is needed there. But step 1's inventory reservation is still held and must be released.\n\n**Step 3: Execute compensating transactions in reverse order.** From the failure point backward: void the payment pre-authorization and release the inventory reservation via compensating transactions. Two-phase commit is an anti-pattern across heterogeneous microservices. Retrying indefinitely blocks inventory and degrades user experience.",
      hints: [
        "In a saga, what undoes a completed step that was part of a failed multi-step process?",
        "If inventory was reserved in step 1 and payment fails in step 2, what must happen to the inventory?"
      ],
    },
  ],

  "sdi-ecom-payment": [
    {
      id: "q-ecom-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A payment service receives the same charge request twice due to a network retry. How does Stripe-style idempotency prevent double charging?",
      options: [
        "Deduplicate by comparing the full request body hash in the database before processing",
        "The client generates a unique idempotency key per payment intent; the server stores (idempotency_key, response) and returns the cached response for any retry with the same key without re-executing the charge",
        "The payment processor detects duplicate card charges automatically within 60 seconds",
        "Use optimistic locking on the payment record to prevent two threads from processing the same payment"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the core problem.** Network retries can cause duplicate charge requests. The server must recognize and deduplicate retries while allowing legitimate new requests through.\n\n**Step 2: Evaluate deduplication approaches.** Full request-body hash deduplication (option A) is fragile — the same logical request may have minor differences in formatting or timestamps. Card network automatic detection (option C) has a 60-second window and is unreliable. Optimistic locking on payment records (option D) handles concurrency but not true idempotency across retries.\n\n**Step 3: Use a client-supplied idempotency key.** The client generates a UUID per payment intent and includes it in the request header. The server atomically checks for the key — if found, it returns the cached response without re-executing. If not found, it processes the payment, stores the result with the key (TTL ~24h), and returns it. This is the industry standard at Stripe, Braintree, and Adyen.",
      hints: [
        "What must the server store alongside an idempotency key to serve future retries?",
        "Why is request-body deduplication insufficient compared to an explicit client-supplied idempotency key?"
      ],
    },
  ],

  "sdi-ecom-flash-sale": [
    {
      id: "q-ecom-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce site expects 500,000 users to attempt purchasing a limited-edition item (1,000 units) in the first minute of a flash sale. Which architecture handles this without overselling or server meltdown?",
      options: [
        "Scale up the database with read replicas and rely on SELECT FOR UPDATE to serialize purchases",
        "Queue incoming purchase requests in SQS/Kafka, dequeue at a controlled rate, atomically decrement Redis inventory counter (DECR), reject if < 0, and process confirmed orders asynchronously",
        "Use a distributed lock (Redlock) per item to serialize all purchase attempts globally",
        "Pre-generate 1,000 unique purchase tokens and require users to redeem them in order"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Recognize the thundering-herd problem.** Accepting 500,000 simultaneous requests directly against the backend would overwhelm any server or database — the traffic spike itself is the primary enemy, not the concurrency logic.\n\n**Step 2: Evaluate each architecture's ability to absorb the spike.** SELECT FOR UPDATE on a database row serializes all 500K requests through one DB lock — a complete throughput collapse. Redlock adds distributed lock latency and can cause lock starvation under extreme load. Pre-generated tokens require users to compete for a finite pool before checking inventory, which adds complexity without solving the backend protection problem.\n\n**Step 3: Select the queue-based purchase funnel.** Accept all 500K requests immediately into a durable queue (SQS/Kafka), returning a \"you are in queue\" response — this decouples the frontend from the backend. A consumer pool dequeues at a controlled rate, performs an atomic DECR on the Redis inventory counter, and rejects if the counter goes below 0. Confirmed purchases are written to the database asynchronously. This prevents overselling, smooths the traffic spike, and scales the write path independently.",
      hints: [
        "How does a queue protect the backend database from a 500K simultaneous request spike?",
        "Why is Redis DECR atomic and how does that prevent the inventory from going negative?"
      ],
    },
  ],

  "sdi-ecom-dynamic-pricing": [
    {
      id: "q-ecom-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce marketplace computes dynamic prices using demand signals, competitor prices, and inventory levels. Prices can change every 15 minutes. What is the correct caching strategy for product pages?",
      options: [
        "Cache product pages at the CDN for 24 hours to minimize origin load regardless of price changes",
        "Never cache product pages — always fetch the current price from the pricing service on every request",
        "Cache product page HTML at the CDN for 10 minutes; cache the price component separately with a 1-minute TTL in Redis; trigger a CDN purge via API when a price update is applied",
        "Store prices only in cookies so each user always sees the price from their last visit"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify which components change at what frequency.** Product page HTML (descriptions, images, specs) is stable and rarely changes. Prices change every 15 minutes. These two components have fundamentally different volatility profiles and should not share the same cache TTL.\n\n**Step 2: Design a layered caching strategy.** Cache product page HTML at the CDN for 10 minutes (reasonable staleness for stable content). Cache the price component separately with a 1-minute TTL in Redis, bounding stale prices to at most 1 minute.\n\n**Step 3: Implement targeted invalidation on price updates.** When the pricing engine applies a new price, it publishes an event that triggers a CDN purge for the affected product URLs via CloudFront, Fastly, or Cloudflare APIs. This ensures users see the new price within seconds of a change. Caching for 24 hours allows wrong prices to persist too long. Never caching overwhelms the origin. Cookie-based pricing is insecure and unreliable.",
      hints: [
        "Which parts of a product page change frequently versus infrequently, and should they have the same cache TTL?",
        "What operation clears a CDN cached URL immediately after a price change?"
      ],
    },
  ],

  "sdi-ecom-fraud": [
    {
      id: "q-ecom-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A fraud detection system uses a rule engine plus an ML model ensemble. What is the correct role of each component, as used by Stripe and PayPal?",
      options: [
        "Rules replace the ML model entirely once they achieve 95% precision",
        "The ML model replaces rules after enough training data is collected",
        "Rules catch known fraud patterns (card testing, velocity abuse) with low latency and high precision; ML catches novel fraud patterns by learning from labeled historical data — both run in parallel with scores combined for a final decision",
        "Rules run offline on historical data; ML runs in real time for all decisions"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Understand the complementary strengths of each approach.** Rule engines excel at known, well-defined fraud patterns (card testing = more than 10 small orders in 5 minutes) with sub-millisecond latency and full explainability for regulatory audits. ML models excel at novel patterns that do not fit predefined rules and at detecting complex feature interactions where fraud appears legitimate by any single signal but is anomalous in combination.\n\n**Step 2: Evaluate the options.** Rules alone cannot adapt to new fraud patterns without human-written updates. ML alone may be too slow or opaque for high-volume, obvious fraud. Running rules offline while ML runs real-time misses the point — both need to operate in the request path.\n\n**Step 3: Deploy both in parallel with combined scoring.** Rules provide a first pass and block obvious fraud instantly. ML scores borderline cases. The scores are combined — transactions blocked by rules are auto-declined; those flagged only by ML go to manual review. This ensemble approach is used by Stripe, PayPal, and Shopify.",
      hints: [
        "What is the latency advantage of a rule engine over a neural network for real-time fraud scoring?",
        "What type of fraud pattern is a rule engine unable to detect without a human writing a new rule?"
      ],
    },
  ],

  "sdi-ecom-catalog": [
    {
      id: "q-ecom-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A product catalog needs to store a t-shirt that comes in 3 colors and 5 sizes (15 variants). How should the data model handle attribute variations while keeping search and inventory accurate?",
      options: [
        "Create one product row per variant (15 rows), duplicating all shared attributes like title and description",
        "One parent product row with shared attributes (title, brand, description) and one child SKU row per variant (size, color, price, inventory_count) — queries join parent+SKU for display and inventory checks",
        "Store all 15 variants as a JSON array in a single product row to avoid joins",
        "Encode all variant combinations in the product title and use full-text search to filter"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the data model requirements.** A t-shirt with 3 colors and 5 sizes creates 15 variants. Shared attributes (title, brand, description) apply to all variants. Variant-specific attributes (size, color, price, inventory) differ per SKU. Atomic inventory decrements must target exactly one SKU without affecting others.\n\n**Step 2: Evaluate each approach.** Duplicate rows (15 rows per product) waste storage and make shared-attribute updates O(N). JSON arrays in a single row make inventory queries slow and atomic updates complex. Full-text search on variant-encoded titles is fragile and inaccurate.\n\n**Step 3: Apply the parent-child product+SKU model.** One parent product row holds shared attributes (title, brand, description, images). One child SKU row per variant holds size, color, price, and inventory_count. Searches operate on the parent; inventory checks filter by SKU. Atomic decrement targets exactly one SKU. This is the industry standard used by Shopify, eBay, and Amazon.",
      hints: [
        "If you update the product description, how many rows need updating in the duplicate-row model vs. the parent-child model?",
        "How do you atomically decrement inventory for exactly one SKU (Red, Medium) without affecting other variants?"
      ],
    },
  ],

  "sdi-ecom-reviews": [
    {
      id: "q-ecom-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A product has 10 ratings averaging 4.6 stars. Another has 1,000 ratings averaging 4.56 stars. Which should rank higher in a best-rated sort, and why?",
      options: [
        "The first product (4.6 average) — higher raw average means better product quality",
        "They should rank equally since the averages are nearly identical",
        "The second product — the Wilson lower bound (lower end of the 95% confidence interval for the true positive proportion) is much higher because the larger sample tightens the confidence interval",
        "The first product because fewer reviews means less chance of fake reviews"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify the sample size problem with raw averages.** A product with 10 reviews at 4.6 average has enormous uncertainty — the true quality could be anywhere from 3.0 to 5.0 at 95% confidence. A product with 1,000 reviews at 4.56 has a tight confidence interval. Raw averages do not account for this uncertainty.\n\n**Step 2: Understand the Wilson lower bound approach.** The Wilson lower bound computes the lower end of the 95% confidence interval for the proportion of positive ratings. It penalizes products with few reviews by giving them a lower bound closer to the true average, while products with many reviews have a tighter interval.\n\n**Step 3: Apply the formula.** For 10 reviews at 80% positive: lower bound is approximately 0.49. For 1,000 reviews at 78% positive: lower bound is approximately 0.75. The second product ranks higher because we are statistically confident in its quality. This prevents a single 5-star review from outranking well-reviewed products — Reddit comment sorting and Amazon bestseller ranking use this principle.",
      hints: [
        "What does a confidence interval tell you about true quality when you have only 10 data points vs 1,000?",
        "Why is raw average rating a poor ranking signal for products with very few reviews?"
      ],
    },
  ],

  "sdi-ecom-coupons": [
    {
      id: "q-ecom-12",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A coupon code SAVE20 allows one use per customer and has a total redemption limit of 10,000. How do you implement this correctly under high concurrency without overshooting the limit?",
      options: [
        "Check the usage count in MySQL before applying the coupon, relying on SELECT then UPDATE in a transaction",
        "Store the coupon remaining count in Redis; use DECR — if result < 0, INCR back and reject; use a unique index on (coupon_id, user_id) in the database for per-customer idempotency",
        "Lock the entire coupons table row using SELECT FOR UPDATE for each redemption attempt",
        "Check and apply the coupon in application code with no database-level constraint"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the two independent enforcement requirements.** A coupon system needs to enforce both a total redemption limit (10,000 uses) AND a per-customer use limit (one use per customer). Both must be enforced atomically under high concurrency.\n\n**Step 2: Evaluate approaches for each requirement.** A plain SELECT+UPDATE in MySQL has a TOCTOU race condition — the count can overshoot between check and update. SELECT FOR UPDATE serializes all redemptions through one lock, creating a throughput bottleneck. Application-level checks with no database constraint are not reliable under concurrency.\n\n**Step 3: Combine Redis DECR for atomic limit enforcement with a DB unique index for per-user idempotency.** Redis DECR on the coupon's remaining count is atomic — if it goes negative, INCR it back and reject, enforcing the 10,000 cap. A unique index on (coupon_id, user_id) prevents the same customer from redeeming twice, even with concurrent retries. This combination is correct and scalable.",
      hints: [
        "What makes Redis DECR safe for concurrent coupon redemptions where a plain SELECT+UPDATE is not?",
        "What database constraint prevents a single user from redeeming the same coupon twice?"
      ],
    },
  ],

  "sdi-ecom-fulfillment": [
    {
      id: "q-ecom-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An order needs to be fulfilled from one of five warehouses distributed across the country. Which factors should the fulfillment routing service optimize across?",
      options: [
        "Always route to the warehouse with the most total inventory to maximize utilization",
        "Always route to the warehouse closest to the customer by straight-line distance",
        "Optimize across: inventory availability at the warehouse (item must be in stock), shipping distance to customer (lower cost and faster delivery), carrier SLA compatibility (can the warehouse meet the promised delivery date), and warehouse workload",
        "Route round-robin across all warehouses to distribute load evenly"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify hard constraints that must be satisfied first.** Before optimizing anything, the warehouse must have the item in stock — filter out all warehouses where inventory_count = 0 for this SKU. A warehouse that cannot fulfill the item is not a candidate regardless of proximity.\n\n**Step 2: Evaluate optimization factors among eligible warehouses.** Distance-only routing ignores inventory availability and SLA compatibility. Round-robin ignores all real constraints. Maximum-inventory routing ignores distance, cost, and delivery time.\n\n**Step 3: Apply multi-objective optimization across all factors.** Among in-stock warehouses, score by: shipping distance (lower cost and faster delivery), carrier SLA compatibility (can the warehouse's carrier network meet the promised delivery date), and current workload (avoid overloading one warehouse). This is how Amazon and Instacart route orders — a weighted scoring function with split-shipment as a fallback if no single warehouse has all items.",
      hints: [
        "What is the first constraint that must be satisfied before optimizing across warehouses?",
        "Why might the closest warehouse not be the best choice for routing?"
      ],
    },
  ],

  "sdi-ecom-delivery-tracking": [
    {
      id: "q-ecom-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A DoorDash-style delivery tracking system shows customers the real-time location of their delivery driver. Which transport mechanism is most appropriate for pushing location updates to the customer's browser?",
      options: [
        "Short polling: the browser calls GET /delivery/{id}/location every 5 seconds",
        "Long polling: the browser holds a connection open until a location update is available",
        "WebSocket: a persistent bidirectional connection allows the server to push location updates every 3 seconds without repeated HTTP overhead",
        "Server-Sent Events (SSE): the server pushes location updates over a persistent HTTP connection; reconnection is handled automatically by the browser"
      ],
      correctAnswer: 3,
      explanation: "**Step 1: Identify the transport requirement.** Delivery tracking is unidirectional — the server pushes location updates to the customer's browser. The browser does not need to send location data back to the server (that is handled by the driver's app). This eliminates bidirectional protocols as necessary.\n\n**Step 2: Evaluate each transport mechanism.** Short polling (every 5 seconds) wastes bandwidth with repeated HTTP round trips even when location has not changed. Long polling has per-update connection setup overhead. WebSocket provides bidirectional communication, which is unnecessary overhead for a unidirectional read-only stream. SSE uses a persistent HTTP connection for server-to-client pushes only, matching the exact requirement.\n\n**Step 3: Select SSE.** SSE maintains a persistent HTTP connection over which the server pushes location events. It automatically reconnects on network drops and works with HTTP/2 multiplexing. This is the simplest, most appropriate mechanism for read-only server-to-client streaming. DoorDash and Uber Eats use SSE or WebSockets for real-time tracking.",
      hints: [
        "Does the customer's browser need to send any data to the server for delivery tracking, or only receive it?",
        "What is the main disadvantage of polling every 5 seconds compared to a persistent push connection?"
      ],
    },
  ],

  "sdi-ecom-autocomplete": [
    {
      id: "q-ecom-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A product search autocomplete must return suggestions within 50ms for a catalog of 10 million products. Which data structure and storage backend is most appropriate?",
      options: [
        "Full Elasticsearch query on every keystroke with a prefix match against the product title field",
        "A prefix trie (radix tree) of popular search terms and product names stored in Redis, with top-K completions stored at each node sorted by popularity score",
        "A relational database LIKE query: SELECT title FROM products WHERE title LIKE keyword%",
        "A hash map of all possible prefixes to completion lists, stored in application memory on each server"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the performance constraint.** Autocomplete must return within 50ms for a 10-million-product catalog. A full-text search query on every keystroke (Elasticsearch or SQL LIKE) introduces 20-100ms+ of latency, which exceeds the budget and adds unnecessary load for what is essentially a prefix lookup.\n\n**Step 2: Evaluate data structures for prefix matching.** A trie (prefix tree) enables O(L) lookups where L is the prefix length — independent of catalog size. Each node stores precomputed top-K completions sorted by popularity. Redis provides sub-millisecond key lookups and is shared across all API servers. In-memory hash maps on each server cannot be updated without restarts and waste memory.\n\n**Step 3: Select a prefix trie in Redis.** Build the trie offline from popular search queries and product names. Each prefix node stores the top-K completions sorted by popularity score. At query time, a single Redis key lookup retrieves the precomputed suggestions. The trie is rebuilt daily as popularity signals evolve. This satisfies the 50ms SLA at any catalog scale.",
      hints: [
        "What makes a prefix trie lookup O(L) where L is the prefix length, regardless of catalog size?",
        "How do you personalize autocomplete suggestions per user while still using a shared trie?"
      ],
    },
  ],

  "sdi-ecom-abtesting": [
    {
      id: "q-ecom-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce team runs an A/B test on pricing: control sees $99, treatment sees $89. Which assignment and analysis approach is statistically sound?",
      options: [
        "Assign users by day of week (Mon-Wed = control, Thu-Sat = treatment); measure total revenue after 3 days",
        "Assign users randomly by hashing user_id mod 2; measure conversion rate and revenue per visitor; use a t-test or chi-squared test with pre-specified minimum detectable effect and required sample size",
        "Assign all mobile users to treatment and desktop users to control; measure page views per session",
        "Run the test for exactly 24 hours and pick whichever variant had higher total purchases"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the assignment problem.** A/B test assignment must be both random (for statistical validity) and stable (the same user must see the same variant across sessions). Day-of-week assignment introduces time-based confounds. Device-based assignment (mobile vs desktop) is not random across the user population. Neither satisfies the statistical soundness requirement.\n\n**Step 2: Identify correct metrics.** Total purchases is confounded by unequal traffic across groups. Conversion rate (purchases/visitors) and revenue per visitor are normalized metrics that account for traffic differences.\n\n**Step 3: Apply power analysis and avoid peeking.** Calculate the required sample size based on baseline conversion rate, minimum detectable effect (e.g., 5% lift), power (80%), and significance level (p<0.05). Do not stop the test early when p<0.05 is observed — this inflates the false positive rate. Pre-specifying the sample size before data collection begins is essential. Hashing user_id provides stable, random, deterministic assignment with no flicker.",
      hints: [
        "Why must A/B test assignment be random and stable — why can't it change per visit?",
        "What is the peeking problem and why does stopping a test the moment p<0.05 is observed inflate false positives?"
      ],
    },
  ],

  "sdi-ecom-returns": [
    {
      id: "q-ecom-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A customer requests a return 25 days after delivery. Which state machine design and refund flow is correct?",
      options: [
        "Immediately issue a full refund upon return request, before receiving the item back",
        "Validate return window against delivery date, check item eligibility, generate RMA and prepaid label, inspect item on receipt, then issue refund via payment processor reversal to the original payment method",
        "Only issue store credit regardless of reason, never direct payment reversals",
        "Reject all returns after 14 days as a strict cutoff regardless of policy or item condition"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the state machine stages.** Returns processing has a well-defined sequence: validate return window, check item eligibility, authorize the return (generate RMA + prepaid label), receive the item, inspect it, then issue a refund. Each stage has a specific purpose and transition condition.\n\n**Step 2: Evaluate each option against the state machine.** Immediate refund before receiving the item (option 0) creates fraud risk — the item may never be returned. Store credit only (option 2) violates card network regulations that require reversals to the original payment method. A strict 14-day cutoff (option 3) ignores legitimate exceptions and creates poor customer experience.\n\n**Step 3: Implement the correct state machine.** Validate the 30-day return window using delivery_date from the order record. Verify item eligibility (no perishables, opened software). Generate an RMA and prepaid label. On receipt, inspect the item's condition. Issue refund via payment processor reversal to the original payment method (Visa/Mastercard requirement) or store credit if the item is damaged.",
      hints: [
        "What data from the original order do you need to validate the 30-day return window?",
        "Why must refunds typically go back to the original payment method rather than always issuing store credit?"
      ],
    },
  ],

  "sdi-ecom-marketplace": [
    {
      id: "q-ecom-18",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A multi-seller marketplace (like eBay or Shopify) must ensure that seller A cannot read or modify seller B's orders, products, or customer data. Which multi-tenancy architecture enforces this most robustly?",
      options: [
        "Shared database, shared schema: a single orders table with a seller_id column, relying solely on application-level WHERE seller_id = ? filters",
        "Separate database per seller: each seller gets their own database instance with full data isolation",
        "Shared database, shared schema with row-level security (RLS): the database enforces seller_id = current_setting on every query at the database level, independent of application logic",
        "Shared database with each seller's data encrypted with a unique seller key, relying on decryption failures to prevent cross-seller access"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify the threat model.** In a multi-seller marketplace, the primary risk is accidental or intentional cross-seller data access. Option A relies entirely on application developers adding WHERE seller_id=? to every query — a single missed filter leaks cross-tenant data.\n\n**Step 2: Evaluate each approach for robustness.** Separate databases per seller (option B) provides strong isolation but is operationally expensive at scale and prevents cross-seller analytics. Encryption-only (option D) does not prevent unauthorized access — a buggy query still executes, it just returns garbage.\n\n**Step 3: Select RLS as defense-in-depth.** Row-level security (RLS) policies are enforced by the database engine on every query, independent of application logic. Even if a developer forgets WHERE seller_id=?, the database silently adds the filter. PostgreSQL RLS is battle-tested for this use case at Supabase, Stripe, and many SaaS platforms. This provides protection against application-level bugs, which are the most common source of multi-tenancy leaks.",
      hints: [
        "What happens in option A if a developer forgets to add WHERE seller_id=? to a query?",
        "How does database-level RLS protect against application-level bugs compared to application-level filtering?"
      ],
    },
  ],

  "sdi-ecom-tax": [
    {
      id: "q-ecom-19",
      type: "true-false",
      difficulty: "easy",
      question: "Using a third-party tax calculation API like Avalara or TaxJar at checkout time is preferable to maintaining your own tax rate tables for most e-commerce platforms, because tax rules vary by product category, destination jurisdiction, and buyer exemption status and change frequently.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "**Step 1: Assess the complexity of tax calculation.** US sales tax alone spans 10,000+ jurisdictions (state, county, city), each with different rates and rules. Product taxability varies by category (groceries vs clothing). Exemption status (reseller certificates, nonprofits) adds further complexity. Rules change with new legislation multiple times per year.\n\n**Step 2: Evaluate build vs buy.** Building and maintaining tax tables internally requires dedicated tax engineers and continuous legal monitoring. Any stale table creates compliance risk — charging the wrong tax rate can trigger audits and penalties.\n\n**Step 3: Select a third-party API.** Avalara and TaxJar handle all this complexity via API: they stay current with law changes, provide audit trails, handle compliance reporting (sales tax remittance), and support exemption certificates. For most platforms, the API cost is far less than the engineering and legal cost of maintaining this internally. The statement is **True**.",
      hints: [
        "How many US tax jurisdictions exist, and how often do their rates change?",
        "What is the risk of using stale self-maintained tax tables in a state that recently changed its sales tax law?"
      ],
    },
  ],

  "sdi-ecom-media": [
    {
      id: "q-ecom-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce platform allows sellers to upload product images. What is the correct pipeline for handling image uploads and global delivery at scale?",
      options: [
        "Store images as BLOB fields in the product database table",
        "Accept multipart uploads on the API server, store on the API server disk, and serve images directly from the API server",
        "Issue a presigned S3 URL to the client (client uploads directly to S3 bypassing the API server); run async Lambda to generate multiple thumbnail sizes (150px, 400px, 800px); distribute via CloudFront CDN for global low-latency delivery",
        "Store image URLs from a third-party image hosting service in the database, relying on that service for availability"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify the bottleneck in naive uploads.** Direct uploads through the API server consume bandwidth and CPU that should be reserved for commerce operations. Serving images from the API server disk does not scale beyond a few thousand uploads per day.\n\n**Step 2: Evaluate storage and delivery options.** Database BLOB storage bloats the database and makes backups massive. Third-party image hosting creates an availability dependency on an external service. Neither provides the performance characteristics needed for a high-traffic marketplace.\n\n**Step 3: Implement the presigned URL + CDN pipeline.** The API server generates a presigned S3 URL and returns it to the client — the client uploads directly to S3, bypassing the API server entirely. An S3 event triggers a Lambda that generates thumbnails at multiple sizes (150px, 400px, 800px) stored back in S3. CloudFront CDN distributes images globally from edge nodes, reducing latency from hundreds of milliseconds to under 20ms. This is the industry-standard pipeline used by marketplace platforms.",
      hints: [
        "Why does the presigned URL pattern avoid sending image data through the API server?",
        "Why are multiple thumbnail sizes generated rather than resizing images on-the-fly per request?"
      ],
    },
  ],

  "sdi-ecom-subscriptions": [
    {
      id: "q-ecom-21",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A subscription billing system charges customers monthly. A charge fails due to an expired card. What is the correct dunning management flow?",
      options: [
        "Immediately cancel the subscription on the first failed charge",
        "Retry the charge every hour indefinitely until it succeeds or the customer cancels",
        "Follow a dunning schedule: retry on day 1, 3, 7 after failure; send email reminders with a card update link; move subscription to past_due state; cancel and deprovision after the dunning window (e.g., 14 days) expires without recovery",
        "Suspend the subscription immediately and wait for the customer to contact support"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Recognize that most failed charges are recoverable.** Many charge failures are transient (network timeout, card temporarily declined). Immediately canceling the subscription (option 0) loses revenue that could have been recovered with a simple retry.\n\n**Step 2: Evaluate retry strategies.** Retrying every hour (option 1) is aggressive — it can trigger card issuer fraud flags and annoy customers. Waiting for customer contact (option 3) is passive and effectively abandons recoverable revenue.\n\n**Step 3: Implement a structured dunning schedule.** Move the subscription to past_due state (still active but flagged). Send email reminders with a card update link. Retry on days 1, 3, and 7. After the dunning window expires (e.g., 14 days) without recovery, cancel and deprovision. This maximizes revenue recovery while giving customers time to fix payment issues. Stripe Billing, Chargebee, and Recurly all implement variations of this pattern.",
      hints: [
        "What state should a subscription enter after the first failed charge — active, paused, or past_due?",
        "Why is retrying every hour aggressive compared to retrying on days 1, 3, and 7?"
      ],
    },
  ],

  "sdi-ecom-wishlist": [
    {
      id: "q-ecom-22",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A user wants to share their wishlist with family members via a URL before their birthday. Which data model best supports private wishlists, shareable wishlists, and collaboration?",
      options: [
        "Store wishlists in localStorage — zero server cost and instant access",
        "One wishlist per user stored in the database, always public and indexed by user_id",
        "Wishlists table with wishlist_id UUID, user_id, visibility ENUM (private/shared/public), and share_token UUID; wishlist_items table with wishlist_id, product_id, added_at; share_token enables URL sharing without exposing user_id",
        "Encode the entire wishlist as a base64 query parameter in the shareable URL"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify the sharing and privacy requirements.** A wishlist system must support three access patterns: private (only the owner), shareable by link (anyone with the link), and potentially public. The sharing mechanism must not expose the owner's identity.\n\n**Step 2: Evaluate each approach.** localStorage is device-specific and loses data when switching devices. Base64-encoded URLs in query parameters are bounded by URL length limits and cannot be updated after sharing. Public-by-default (option B) violates privacy expectations.\n\n**Step 3: Implement a UUID-based share_token model.** Generate a random share_token UUID when sharing is enabled. Store wishlist_id, user_id, and visibility (private/shared/public) in the wishlists table, with share_token as a separate field. Share via /wishlist/share/{share_token} which does not expose the user_id. The wishlist_items table stores wishlist_id, product_id, and added_at. Items added after sharing automatically appear because they are server-stored. This is the model used by Amazon Wish Lists and Airbnb Registries.",
      hints: [
        "Why use a random share_token instead of the user_id directly in the share URL?",
        "What happens to the share URL if the user adds items to the wishlist after sharing the URL?"
      ],
    },
  ],

  "sdi-ecom-bnpl": [
    {
      id: "q-ecom-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A buy-now-pay-later (BNPL) system splits a $300 purchase into 4 installments of $75 due monthly. A customer misses installment 2. What state machine and system design handles this correctly?",
      options: [
        "Cancel the entire loan and charge the full remaining balance immediately",
        "Installment state machine with states SCHEDULED, PROCESSING, PAID, FAILED, and DELINQUENT; failed installments trigger a retry schedule; delinquent accounts are flagged for collections; the merchant receives full payment upfront from the BNPL provider who absorbs the credit risk",
        "Stop processing future installments until the customer manually pays the missed one",
        "Charge the customer a flat $50 late fee and reattempt the full loan next month"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the key BNPL economic relationship.** The merchant receives 100% of the purchase price upfront from the BNPL provider. The BNPL provider absorbs the credit risk and collects installments from the consumer. This means the merchant is already whole — the question is about how the BNPL provider manages consumer repayment.\n\n**Step 2: Design the installment state machine.** Each installment has its own state: SCHEDULED, PROCESSING, PAID, FAILED, DELINQUENT. A failed installment triggers a dunning schedule (retry in 3 days, notify customer). Delinquent accounts are flagged for collections after the retry window expires.\n\n**Step 3: Evaluate what happens to future installments when one fails.** Stopping all future installments (option 2) would incorrectly block the recovery process before the retry window closes. Canceling the entire loan (option 0) is disproportionate — one missed payment does not invalidate the entire remaining balance. A flat late fee (option 3) ignores the structured nature of installment schedules.",
      hints: [
        "Who bears the credit risk in a BNPL transaction — the merchant or the BNPL provider?",
        "Should future installments stop processing immediately when installment 2 fails, or only after the dunning window expires?"
      ],
    },
  ],

  "sdi-ecom-geofenced-pricing": [
    {
      id: "q-ecom-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce platform charges different prices based on the customer's country due to regulatory requirements and currency differences. Which architecture correctly implements geofenced pricing?",
      options: [
        "Store one USD price per product; convert to local currency using a public exchange rate API on every page load",
        "Store a price per (product_id, country_code) in the pricing table; at request time detect the user's country from IP (MaxMind GeoIP) or shipping address; serve the country-specific price; cache by (product_id, country_code) in Redis",
        "Let users manually select their country and currency, and show prices converted from USD using live exchange rates",
        "Store prices only in the seller's home currency and display a currency converter widget on the page"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Recognize why prices differ by country beyond currency.** Regulatory requirements (VAT inclusion in EU prices, MFN pricing obligations), different tax treatments, and business decisions (market positioning, purchasing power parity) mean the base price genuinely differs by country — not just by exchange rate.\n\n**Step 2: Evaluate pricing approaches.** Pure currency conversion (option A, C, D) cannot handle VAT inclusion, regulatory price floors, or intentional market differentiation. A fixed multiplier (option D) becomes wrong as exchange rates move.\n\n**Step 3: Implement per-country pricing with GeoIP detection.** Store a pricing table with (product_id, country_code, amount, currency_code, tax_inclusive). Detect the user's country from IP using MaxMind GeoIP or from their shipping address. Look up the specific price record. Cache in Redis keyed by (product_id, country_code) for performance. This architecture handles regulatory requirements, tax inclusion, and business pricing strategy correctly.",
      hints: [
        "Why can't you simply convert a USD price to Euros using the current exchange rate to get the German price?",
        "What IP-based technique is used to detect a user's country at request time?"
      ],
    },
  ],

  "sdi-ecom-demand-forecasting": [
    {
      id: "q-ecom-25",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce company wants to forecast demand for 500,000 SKUs to optimize inventory levels. Which approach is most scalable and accurate?",
      options: [
        "Train one global neural network model on all SKU time series simultaneously with product features as input",
        "Train a separate ARIMA model for each SKU independently — 500,000 individual time series models",
        "Use a global time-series model (e.g., DeepAR or LightGBM with lag features) trained on all SKUs simultaneously, leveraging cross-SKU patterns and cold-start features (category, price, seasonality dummies); retrain weekly; output safety stock thresholds per SKU",
        "Use sales velocity from the last 30 days as the forecast for the next 30 days with no ML"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify the scale challenge.** Training 500,000 individual models (one per SKU) is operationally infeasible — each ARIMA model requires separate retraining, monitoring, and tuning. There is no knowledge transfer across SKUs, and cold-start products with no history have no model at all.\n\n**Step 2: Evaluate modeling approaches.** A single global neural network (option A) can learn cross-SKU patterns but lacks the time-series-specific architecture needed for sequential demand data. No-ML approaches (option D) cannot capture seasonality or promotional effects.\n\n**Step 3: Select a global time-series model.** DeepAR (Amazon's open-source model) or LightGBM with lag features trains on all SKUs simultaneously, learning patterns that transfer across products. Cold-start products borrow signal from similar products in the same category. The output is a probabilistic forecast (P50, P90 quantiles) used to compute safety stock: safety_stock = Z * std_dev_demand * sqrt(lead_time). This is the approach used by Instacart and Amazon for large-scale demand forecasting.",
      hints: [
        "How does a global model handle demand forecasting for a newly launched product with no sales history?",
        "What is safety stock and how does a probabilistic demand forecast determine the right level?"
      ],
    },
  ],

  "sdi-ecom-cross-border": [
    {
      id: "q-ecom-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce platform expands to 20 countries. A customer in Brazil checks out in BRL but the platform settles in USD. Which system components are needed for correct cross-border commerce?",
      options: [
        "Display all prices in USD and let customers use browser-based currency converters",
        "Currency conversion at display time only; charge USD on the payment processor regardless of displayed currency",
        "Localization layer: display prices in local currency (BRL) with local formatting; payment processor settles in BRL via a local acquirer or currency conversion at checkout using a live exchange rate with a spread; store original currency and amount on the order; handle local payment methods (Boleto, Pix in Brazil); comply with local tax regulations",
        "Maintain one USD price globally and apply a fixed 1.3x multiplier for all non-US countries"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify all the cross-border complexity dimensions.** Multi-currency commerce involves: local price display (BRL for Brazil), local payment methods (Boleto, Pix), local tax compliance (ICMS in Brazil, VAT in EU, GST in Australia), currency conversion with spread, and settlement in a different currency (USD).\n\n**Step 2: Evaluate each option's coverage.** Displaying prices in USD only (option A) alienates local customers. Currency conversion at display time only (option B) does not address local payment methods or tax compliance. A fixed multiplier (option D) quickly becomes wrong as exchange rates fluctuate.\n\n**Step 3: Implement a full localization stack.** Display prices in local currency with local formatting. Use a local acquirer or a global PSP (Stripe) that supports multi-currency settlement. Store both original_currency/amount and settled_currency/amount on the order record. Support local payment methods (Boleto, Pix in Brazil). Handle local tax regulations. Use live exchange rates with a configured spread. This is how global e-commerce platforms handle cross-border expansion.",
      hints: [
        "Why is it important to store both the original local currency amount and the settled USD amount on the order?",
        "What is a local payment acquirer and why does it improve authorization rates compared to routing all transactions through a US acquirer?"
      ],
    },
  ],

  "sdi-ecom-loyalty": [
    {
      id: "q-ecom-27",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A loyalty points system allows customers to earn and burn points. A customer with 500 points tries to redeem 400 points on one device while simultaneously placing an order earning 100 points on another device. How should the system prevent double-spend and race conditions?",
      options: [
        "Read the balance, compute the new balance in application code, then UPDATE points SET balance = new_balance WHERE user_id = ?",
        "Use an append-only ledger table: each earn or burn is an INSERT (not an UPDATE); the current balance is always computed as SUM(amount) WHERE user_id = ?; use a SERIALIZABLE transaction or optimistic locking on the balance computation to prevent concurrent burns from overdrawing",
        "Store points in Redis and use a distributed lock (Redlock) around every earn and burn operation",
        "Allow the balance to temporarily go negative and correct it in a nightly reconciliation job"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the race condition in mutable balance fields.** A READ-then-UPDATE pattern (option A) has a classic TOCTOU race: two concurrent requests both read balance=500, both compute new_balance=100, both UPDATE — overdrafting by 100 points. This is a financial integrity failure.\n\n**Step 2: Evaluate approaches for concurrency control.** Redlock (option C) adds distributed lock latency and complexity for what should be a database-level concern. Allowing negative balances (option D) is a financial integrity failure that requires costly reconciliation. Neither is acceptable.\n\n**Step 3: Implement an append-only ledger with serializable transactions.** Each earn or burn is an immutable INSERT (never an UPDATE to a balance field). The current balance is always SUM(amount) WHERE user_id=?. A SERIALIZABLE transaction atomically computes the balance and inserts the burn, preventing concurrent overdrafts. The append-only ledger also provides a full audit trail — every point movement is visible and immutable, which is essential for fraud investigation and debugging.",
      hints: [
        "Why is an append-only ledger more robust than a mutable balance field for loyalty points?",
        "What is the race condition in option A when two concurrent burn operations both read balance=500 and then both try to burn 400 points?"
      ],
    },
  ],

  "sdi-ecom-order-aggregation": [
    {
      id: "q-ecom-28",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An Instacart-style service allows customers to order from multiple stores in one checkout. A customer orders milk from Store A and cereal from Store B. How should the system handle batching, routing, and payment?",
      options: [
        "Create two separate orders and require the customer to checkout twice — once per store",
        "Create one customer-facing parent order with two sub-orders (one per store); route each sub-order to the correct store's picker; capture a single payment from the customer and disburse to each store minus fees; assign shoppers based on geographic feasibility",
        "Merge all items into one combined order and route to whichever store has more items",
        "Require the customer to select one primary store and only allow items from that store"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the data model requirement.** A multi-store checkout needs a hierarchical structure: one customer-facing order (for the customer experience) containing multiple per-merchant sub-orders (for fulfillment). The customer wants a single cart, checkout, and delivery — not multiple orders.\n\n**Step 2: Evaluate each approach.** Separate checkouts (option A) create a poor customer experience and halve conversion rates. Merging all items into one order (option C) fails when stores are unrelated — you cannot pick cereal from Store A and milk from Store B in one trip. Single-store restriction (option D) defeats the purpose of multi-store checkout.\n\n**Step 3: Implement parent-child order with payment split.** Create a parent order (customer-facing, single payment, single delivery) with child sub-orders (one per merchant). Capture a single payment from the customer, then disburse to each merchant minus commission via Stripe Connect or Braintree Marketplace. Sub-orders route to their respective merchants' pickers. Parent order delivered_at is set when all sub-orders are delivered. This is exactly Instacart's architecture.",
      hints: [
        "How does the platform handle payment when items come from multiple merchants?",
        "What happens to the parent order state if sub-order A is delivered but sub-order B is delayed?"
      ],
    },
  ],

  "sdi-ecom-seller-analytics": [
    {
      id: "q-ecom-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A marketplace wants to provide sellers with a real-time analytics dashboard showing sales, revenue, and top products updated within 60 seconds. Which architecture achieves this for 100,000 active sellers?",
      options: [
        "Run SQL GROUP BY queries on the production OLTP orders database on every dashboard load",
        "Export data to a data warehouse (BigQuery) nightly and refresh dashboards once per day",
        "Stream order events to Kafka; a Flink or Spark Streaming job computes per-seller aggregates (revenue, order count, top products) in near-real-time and writes them to ClickHouse; the dashboard queries ClickHouse per-seller in milliseconds; seller_id is the sharding key",
        "Cache per-seller aggregates in a Redis hash, updated synchronously on every order write in the OLTP path"
      ],
      correctAnswer: 2,
      explanation: "**Step 1: Identify the OLTP vs OLAP separation requirement.** A 60-second real-time dashboard for 100,000 sellers cannot be served by querying the production OLTP database — analytical GROUP BY queries compete with checkout transactions for resources and degrade production performance.\n\n**Step 2: Evaluate each architecture.** Nightly exports (option B) cannot meet a 60-second SLA. Synchronous Redis updates (option D) add latency to the critical checkout path, and a Redis failure could block order processing — an unacceptable risk.\n\n**Step 3: Implement a dedicated OLAP streaming pipeline.** Stream order events to Kafka on every sale. A Flink or Spark Streaming job (or ClickHouse materialized views with Kafka engine) computes per-seller rolling aggregates in near-real-time and writes to ClickHouse. ClickHouse sharded by seller_id enables sub-second queries per seller. The dashboard queries ClickHouse, not the OLTP database. This separation is essential: OLTP handles transactions, OLAP handles analytics.",
      hints: [
        "Why is it dangerous to run GROUP BY analytics queries directly against the production OLTP database?",
        "What makes ClickHouse better than PostgreSQL for per-seller analytics aggregations across millions of orders?"
      ],
    },
  ],

  "sdi-ecom-chat": [
    {
      id: "q-ecom-30",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce platform adds a chat-with-seller feature for pre-purchase questions. A buyer messages a seller who may not be online. Which architecture handles async delivery and automatic escalation to customer support?",
      options: [
        "WebSocket-only: if the seller is offline the message is lost; buyers must try again later",
        "Messages are stored in a messages table (conversation_id, sender_id, recipient_id, body, created_at, status); delivered via WebSocket if recipient is online; stored for async pickup if offline; unread messages trigger push notification or email after 5 minutes; conversations escalate to a support queue if seller does not respond within 24 hours",
        "Route all buyer-seller messages through email only, with no in-app chat interface",
        "Use SMS for all messages since it guarantees delivery regardless of app state"
      ],
      correctAnswer: 1,
      explanation: "**Step 1: Identify the async delivery challenge.** Sellers are not always online. A buyer message sent when the seller is offline must be stored and delivered when the seller comes online — it cannot be lost (which is what WebSocket-only would do).\n\n**Step 2: Evaluate each approach.** Email-only (option C) lacks in-app context and product linkage. SMS (option D) is expensive and inappropriate for in-app purchase-related messaging. WebSocket-only (option A) loses messages when the seller is offline.\n\n**Step 3: Implement store-and-forward with escalation.** Messages are always written to the database first (store-and-forward). If the seller is online, push via WebSocket. If offline, the message is stored with status=UNREAD and a background job sends a push notification or email after a timeout. If the seller does not respond within 24 hours, auto-escalate to the marketplace support queue via Zendesk or Intercom webhook. The conversation_id links buyer, seller, and product for context. This is the pattern used by eBay Messages, Etsy Conversations, and Amazon buyer-seller messaging.",
      hints: [
        "What is the store-and-forward pattern and why is it essential for async messaging?",
        "What happens to a message if it is pushed via WebSocket but the recipient's connection drops mid-push?"
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
