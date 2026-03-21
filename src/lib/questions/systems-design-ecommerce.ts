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
      explanation: "For extreme concurrency like flash sales, pre-reserving inventory in Redis via atomic DECR is the best approach. Redis processes commands serially so DECR is inherently atomic — no race conditions. If the result drops below 0, the item is out of stock and the decrement is reversed. The database is updated asynchronously after the fact. Pessimistic locking creates a serial bottleneck at the DB. Optimistic locking with retries causes thundering-herd retry storms. Redlock adds latency and complexity.",
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
      explanation: "Custom analyzers are the core of effective product search in Elasticsearch. An edge n-gram tokenizer indexes prefixes of each word enabling real-time autocomplete. A synonym token filter maps equivalent terms (e.g., tv to television). Fuzziness in queries (Levenshtein distance 1 or 2) handles typos so samsng tv still matches Samsung Television. Sharding improves throughput but does not affect match quality. Index templates and snapshots are operational concerns, not relevance concerns. This inverted-index approach underpins eBay and Amazon product search.",
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
      explanation: "Item-based CF at scale precomputes the similarity matrix offline. A nightly Spark job reads the full purchase matrix, computes pairwise item similarities (cosine similarity on co-purchase vectors or ALS matrix factorization), and stores the top-K most similar items for each item in Redis (key: item_id, value: [item_1...item_K]). At query time, recommendations are a single O(1) key-value read. Online computation of similarity across millions of items is infeasible at query time. Item-based CF is more stable than user-based CF because item similarity changes slowly while user behavior changes constantly — this is the approach Amazon pioneered.",
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
      explanation: "Cart merge on login should be additive and non-destructive. For product_ids present in both guest and logged-in carts, keep the higher quantity (the user likely intended to add more). For product_ids present in only one cart, include them in the merged cart, de-duplicating by product_id. This preserves maximum user intent. Discarding either cart risks losing items. Prompting the user creates friction at a critical conversion moment. Server-side cart storage in Redis keyed by session_id (guest) or user_id (logged-in) makes this merge straightforward — Shopify and Amazon both use this additive merge strategy.",
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
      explanation: "In the saga pattern there are no distributed transactions — each step has a compensating transaction that undoes its effect. If payment capture fails at step 2: no fulfillment was triggered yet, so no compensation is needed there; the inventory reservation from step 1 must be released via a compensating transaction to make stock available again; any payment pre-authorization should be voided. Compensating transactions run in reverse order from the failure point. Two-phase commit across microservices is an anti-pattern that couples services and does not work across heterogeneous systems. Retrying indefinitely blocks the inventory reservation and degrades UX.",
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
      explanation: "Stripe-style idempotency works as follows: the client generates a UUID idempotency key per payment operation and includes it in every request header. The server atomically checks if a row exists for that key in an idempotency_keys table. If it does, it returns the stored response immediately without re-executing the charge. If not, it processes the payment, stores the result alongside the key, and returns it. The key must be tied to a specific customer+amount+currency combination so a key cannot be reused with different parameters. TTL (typically 24h) bounds storage. This is the industry standard at Stripe, Braintree, and Adyen — it turns non-idempotent HTTP into idempotent operations safe for aggressive retries.",
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
      explanation: "Queue-based purchase funnel is the correct pattern. The storefront accepts all 500K requests immediately into a durable queue (SQS/Kafka), returning a you-are-in-queue response — this protects the backend from the traffic spike. A consumer pool dequeues at a controlled rate, performs an atomic DECR on the Redis inventory counter, and rejects if the counter goes below 0. Confirmed purchases are written to the database asynchronously. This prevents overselling (Redis DECR is atomic), prevents thundering-herd (queue smooths traffic), and scales the write path independently. SELECT FOR UPDATE on a single row serializes all 500K requests through one DB lock. Redlock adds latency and can cause lock starvation.",
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
      explanation: "Layered caching with targeted invalidation is the correct approach. The product page HTML (description, images, specs) is stable and can be CDN-cached for 10 minutes. The price is volatile and fetched separately with a 1-minute Redis TTL, so stale prices are bounded to 1 minute. When the pricing engine applies a new price, it publishes an event that triggers a CDN purge for the affected product URLs (via CloudFront, Fastly, or Cloudflare APIs), ensuring users get the new price within seconds. Caching for 24 hours shows wrong prices for too long during a sale or repricing. Never caching sends every page load to the origin — infeasible at scale. Amazon and Shopify both use this split-caching pattern.",
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
      explanation: "Rule engines and ML models are complementary. Rules excel at known, well-defined patterns (card testing = more than 10 small orders in 5 minutes) with immediate enforcement (under 1ms latency) and high explainability for regulatory audits. ML models excel at novel patterns that do not fit predefined rules and complex feature interactions (fraud that looks legitimate by any single signal but is anomalous in combination). In practice: rules provide a first pass and block obvious fraud instantly; ML scores borderline cases; scores are combined — a transaction blocked by rules is auto-declined while one flagged only by ML may go to manual review. This ensemble approach is used by Stripe, PayPal, and Shopify fraud platform.",
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
      explanation: "The parent-child product+SKU model is industry standard (used by Shopify, eBay, and Amazon). The parent product holds attributes shared across all variants (title, brand, description, category, images). Each SKU (Stock Keeping Unit) child row holds variant-specific attributes (size, color, material), price, and inventory_count. This avoids duplicating shared data across 15 rows. Searches operate on the parent (full-text on title/description); inventory checks operate on the SKU (filter by size=M AND color=Red). The JSON array approach makes inventory queries slow and atomic inventory updates complex. Duplicate rows make shared attribute updates O(N) instead of O(1).",
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
      explanation: "Wilson lower bound is the correct ranking approach. With only 10 reviews, the 4.6 average has enormous uncertainty — the true quality could be anywhere from about 3.0 to 5.0 at 95% confidence. With 1,000 reviews, the confidence interval is tight around 4.56. The Wilson lower bound formula gives the lower end of the 95% confidence interval for the proportion of positive ratings. For 10 reviews at 80% positive: lower bound is approximately 0.49. For 1,000 reviews at 78% positive: lower bound is approximately 0.75. The second product ranks much higher because we are confident in its quality. This prevents products with a single 5-star review from outranking well-reviewed products — Reddit comment sorting and Amazon bestseller ranking use this principle.",
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
      explanation: "Correct coupon implementation needs two things: (1) Atomic usage count enforcement — Redis DECR on the coupon's remaining count is atomic; if it goes negative, INCR it back and reject. This handles the 10,000 redemption limit without race conditions. (2) Per-customer idempotency — a unique index on (coupon_id, user_id) in the database prevents the same coupon from being used twice by the same customer, even due to retries or concurrent requests. This combination prevents overshooting the redemption limit and double-application. SELECT FOR UPDATE on the coupons row serializes all redemptions through one lock, creating a bottleneck that cannot scale. Pure application-level checks have TOCTOU race conditions.",
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
      explanation: "Fulfillment routing is a multi-objective optimization. First, hard constraints: the warehouse must have the item in stock (filter out warehouses without inventory). Second, optimize among eligible warehouses: minimize shipping distance (lower shipping cost and faster delivery time), verify that the carrier serving that warehouse can meet the promised SLA (2-day delivery requires a specific carrier network), and balance workload (avoid routing all orders to an already overloaded warehouse). This is similar to how Amazon and Instacart route orders — a weighted scoring function across all these factors, with a fallback to split-shipment if no single warehouse has all items. Round-robin and distance-only approaches ignore inventory and SLA constraints.",
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
      explanation: "Server-Sent Events (SSE) is the most appropriate mechanism for this read-only push use case. SSE maintains a persistent HTTP connection over which the server pushes events (location coordinates) every few seconds. Unlike WebSockets, SSE is unidirectional (server-to-client), which is all that is needed for tracking — the customer does not send location data. SSE automatically reconnects on network drops and works natively with HTTP/2 multiplexing. Short polling wastes bandwidth with repeated round trips even when location has not changed. Long polling has connection setup overhead per update. WebSockets add unnecessary bidirectional complexity for a unidirectional use case. DoorDash and Uber Eats use SSE or WebSockets for tracking.",
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
      explanation: "A prefix trie stored in Redis is the optimal solution. The trie is built offline from popular search queries and product names ranked by search frequency or sales. Each prefix node stores the top-K (e.g., 10) completions sorted by popularity score. At query time, a single Redis key lookup retrieves the precomputed top-K suggestions for that prefix — sub-millisecond. The trie is rebuilt periodically (daily) as popularity signals update. A LIKE query on a relational DB requires a full table scan unless there is a prefix-only B-tree index, and even so it cannot respond sub-10ms on 10M rows. Full Elasticsearch on every keystroke adds 20-100ms of overhead. In-memory hash maps cannot be shared across API servers or updated without restarts.",
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
      explanation: "Sound A/B testing for pricing requires: (1) Random stable assignment — hashing user_id ensures a user always sees the same price across sessions (no flicker) and randomization makes groups statistically comparable. (2) Correct metrics — conversion rate and revenue per visitor, not total revenue, which is confounded by unequal traffic. (3) Pre-specified sample size via power analysis — calculate required sample based on baseline conversion rate, minimum detectable effect (e.g., 5% lift), desired power (80%), and significance level (p<0.05). (4) Do not peek early — stopping when p<0.05 inflates false positive rate. Day-of-week assignment introduces time confounds. Device-based assignment is not random. 24 hours almost never provides sufficient sample size.",
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
      explanation: "Returns processing has multiple sequential states: (1) Return Requested — validate that the request is within the return window (e.g., 30 days from delivery_date stored on the order record) and that the item is eligible (no perishables, opened software, personalized items). (2) Return Authorized — generate RMA number and prepaid return shipping label. (3) Item Received — warehouse receives item and logs receipt event. (4) Item Inspected — grade condition (unopened, like new, damaged). (5) Refund Issued — via payment processor reversal to original payment method (required by card network rules) or store credit if item is damaged beyond policy. Issuing refunds before receiving items creates fraud risk. Reversals must go to the original payment method to comply with Visa and Mastercard regulations.",
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
      explanation: "Row-level security (RLS) at the database layer is the most robust multi-tenancy pattern for shared-schema deployments. RLS policies attach to tables and are evaluated by the database engine on every query — even if application code forgets a WHERE seller_id=? clause, the database silently adds the filter. PostgreSQL RLS is battle-tested for this use case (Supabase, Stripe, and many SaaS platforms use it). Application-level filtering only (option A) is vulnerable to bugs — a missing WHERE clause leaks cross-tenant data. Separate databases per seller (option B) is expensive and hard to manage at scale with thousands of sellers, and makes cross-seller analytics impossible. Encryption alone (option D) does not prevent unauthorized access, it just makes unauthorized reads produce garbage.",
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
      explanation: "True. Tax calculation is extraordinarily complex: rates vary by US state, county, and city (10,000+ jurisdictions). Product taxability differs — groceries may be exempt while clothing is taxed at different rates in different states. Buyer exemption status (resellers, nonprofits) further complicates things. Rules change with legislation multiple times per year. Maintaining accurate tax tables in-house requires dedicated tax engineers and continuous legal monitoring. Avalara and TaxJar provide APIs that handle all this complexity, stay current with law changes, provide audit trails, and handle compliance reporting (sales tax remittance). For most platforms the API cost is far less than the engineering and legal cost of maintaining this internally.",
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
      explanation: "The presigned URL + CDN pipeline is the industry standard. The API server generates a presigned S3 URL and returns it to the client — the client uploads the image directly to S3, bypassing the API server entirely (eliminates bandwidth bottleneck, scales to any upload volume). An S3 event triggers a Lambda or worker that generates thumbnails at multiple sizes (150px for thumbnails, 400px for grid views, 800px for product pages) using image processing libraries, storing each variant back in S3. CloudFront CDN distributes images from edge nodes globally, reducing latency from hundreds of milliseconds to under 20ms for most users. BLOB storage in the database bloats the DB and makes backups huge. Serving from the API server does not scale. Third-party hosting creates an availability dependency.",
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
      explanation: "Dunning management is the structured process of recovering failed subscription payments. Best practice: immediately retry once (some failures are transient network issues). Move the subscription to past_due state (still active but flagged). Send email reminders at configured intervals with a link to update payment details. Retry the charge on a schedule (e.g., day 1, 3, 7 after failure). After the dunning window expires without recovery, cancel the subscription and trigger deprovisioning (remove access to paid features). This approach maximizes revenue recovery while giving customers time to fix payment issues — Stripe Billing, Chargebee, and Recurly all implement this pattern. Immediate cancellation loses recoverable revenue. Hourly retries can trigger card issuer fraud flags.",
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
      explanation: "The wishlist data model needs to support multiple access patterns. The wishlists table stores wishlist_id as UUID primary key, user_id as owner, name, visibility as private/shared/public, and share_token as a separate UUID generated when sharing is enabled. The wishlist_items table stores wishlist_id, product_id, added_at, and priority. The share_token is a random UUID that is not derivable from user_id — sharing is via a URL like /wishlist/share/{share_token} which does not expose the user's identity. Visibility controls whether the list is also publicly searchable. This supports private lists (default), shareable-by-link lists (share_token), and public gift registries. localStorage loses data on device switch. Base64 URLs are bounded by URL length limits and cannot be updated after sharing.",
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
      explanation: "BNPL systems like Affirm, Klarna, and Afterpay work as follows: the merchant receives 100% of the purchase price upfront from the BNPL provider, who absorbs credit risk. The BNPL provider then collects installments from the consumer. Each installment has its own state machine: SCHEDULED (future payment), PROCESSING (being charged), PAID (successful), FAILED (card declined), DELINQUENT (past due beyond retry window). A failed charge triggers a dunning schedule (retry in 3 days, notify customer). Delinquent accounts are flagged for collections and may incur late fees per terms. Future installments continue to be scheduled even during a missed payment — stopping all future installments would incorrectly block recovery before the retry window closes.",
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
      explanation: "Geofenced pricing requires explicit per-country price records, not just currency conversion. Regulatory requirements (e.g., VAT inclusion in EU prices, MFN pricing obligations), different tax treatments, and business decisions (market positioning, purchasing power parity) mean the base price may genuinely differ by country, not just by exchange rate. The architecture: a pricing table with product_id, country_code, amount, currency_code, and tax_inclusive boolean; geo-detect the user's country from their IP using MaxMind GeoIP or from their shipping address; look up the specific price record; cache in Redis keyed by (product_id, country_code) for performance. CDN can further cache per-country versions. Pure exchange rate conversion does not handle VAT inclusion, regulatory price floors, or intentional market differentiation.",
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
      explanation: "Global time-series models trained across all SKUs simultaneously are the modern best practice for large-scale demand forecasting. Models like DeepAR (Amazon open-source model) or LightGBM with lag features learn demand patterns that generalize across products — a new product (cold start) can borrow signal from similar products in the same category. Per-SKU ARIMA models do not transfer knowledge across products and are expensive to maintain (500,000 retraining jobs). The global model uses features: historical demand, price, promotional flags, seasonality, category, and external signals (weather, holidays). Output is a probabilistic forecast (P50, P90 quantiles) used to compute safety stock: safety_stock = Z * std_dev_demand * sqrt(lead_time). Instacart and Amazon use this approach.",
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
      explanation: "Cross-border commerce requires a full localization stack. Display: prices shown in local currency with local number formatting. Payment: use a local payment acquirer in each market (lower interchange fees, higher authorization rates) or a global PSP like Stripe that supports multi-currency settlement. Store the original_currency and original_amount on the order record alongside the settled_currency and settled_amount. Local payment methods are critical — in Brazil, Boleto Bancario and Pix are preferred by large segments of the population over cards. Tax compliance: Brazil has ICMS, VAT rates vary in the EU, GST in Australia. Currency conversion must use live rates with a configured spread to protect against FX risk. A fixed multiplier quickly becomes wrong as exchange rates move.",
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
      explanation: "An append-only ledger is the correct pattern for financial-like transactions. Each earn or burn is an immutable INSERT into a transactions table (user_id, amount [positive=earn, negative=burn], type, order_id, created_at) — never an UPDATE to a balance field. The current balance is always SUM(amount) for that user. To prevent overdraft during concurrent burns: use a SERIALIZABLE transaction that computes the balance and inserts the burn atomically, relying on the database to serialize concurrent writes for the same user. Alternatively, use optimistic locking with a version counter on a balance summary row. The append-only approach provides a full audit trail (required for fraud investigation), makes debugging easy (every point movement is visible), and handles race conditions correctly. A READ then UPDATE has a classic TOCTOU race condition.",
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
      explanation: "Multi-store order aggregation requires a hierarchical order model: a parent order (customer-facing, single payment, single delivery) containing child sub-orders (one per merchant). The platform captures a single payment from the customer, then disburses to each merchant minus the platform commission — this requires a payment split or marketplace payout system (Stripe Connect, Braintree Marketplace). Each sub-order is routed to its merchant's picker. Shopper routing is a separate optimization: if Store A and Store B are geographically close, one shopper can fulfill both sub-orders in one trip; otherwise two shoppers are assigned. Sub-order state machines run independently (each can be in PICKING, PACKED, etc.) but the parent order's delivered_at is set when all sub-orders are delivered. This is exactly Instacart's architecture.",
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
      explanation: "Real-time seller analytics requires a dedicated OLAP pipeline separate from the OLTP path. Order events flow to Kafka on every sale. A stream processing job (Flink, Spark Streaming, or ClickHouse materialized views with Kafka engine) computes per-seller rolling aggregates (revenue last 1h/24h/7d, order count, top products by GMV) and writes them to ClickHouse, which is purpose-built for fast analytical queries on large datasets. ClickHouse sharded by seller_id enables sub-second queries per seller. The dashboard queries ClickHouse, not the OLTP database. OLTP queries for analytics degrade production performance. Nightly refreshes cannot serve a 60-second SLA. Synchronous Redis updates in the OLTP path add latency to the critical checkout path and are fragile — a Redis failure blocks orders.",
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
      explanation: "A persistent messaging architecture handles the async nature of seller availability. Messages are always written to the database first (store-and-forward pattern). If the recipient is connected via WebSocket, the message is pushed immediately. If offline, the message is stored with status=UNREAD and a background job sends a push notification (FCM/APNs) or email reminder after a configurable timeout (e.g., 5 minutes). Each conversation has an SLA: if the seller does not respond within 24 hours, the conversation is automatically escalated to the marketplace's customer support queue (via Zendesk API or Intercom webhook), where a support agent can step in on behalf of the seller. The conversation_id links the buyer, seller, and product for context. This pattern is used by eBay Messages, Etsy Conversations, and Amazon buyer-seller messaging.",
      hints: [
        "What is the store-and-forward pattern and why is it essential for async messaging?",
        "What happens to a message if it is pushed via WebSocket but the recipient's connection drops mid-push?"
      ],
    },
  ],
};

registerQuestions(questions);
