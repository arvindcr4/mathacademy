import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-ecom-inventory": [
    {
      id: "q-sdi-ecom-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce platform processes 10,000 concurrent purchases of the same item during a flash sale. Which approach best prevents overselling while maintaining high throughput?",
      options: [
        "Pessimistic locking (SELECT FOR UPDATE) on the inventory row for every purchase request",
        "Pre-decrement inventory in Redis using DECR, reject if result < 0, then confirm asynchronously in the database",
        "Optimistic locking with check-and-set: read inventory version, update only if version unchanged, retry on conflict",
        "Application-level mutex using a distributed lock (Redlock) around the inventory check and update"
      ],
      correctAnswer: 1,
      explanation: "For extreme concurrency like flash sales, pre-reserving inventory in Redis via atomic DECR is the best approach. Redis processes commands serially so DECR is inherently atomic — no race conditions. If the result drops below 0, the item is out of stock and the decrement is reversed. The database is updated asynchronously after the fact. Pessimistic locking creates a serial bottleneck at the DB. Optimistic locking with retries causes thundering-herd retry storms. Redlock adds latency and is complex to get right.",
      hints: ["Think about which data store can handle 10,000 atomic operations per second without lock contention.", "Redis atomic commands like DECR serialize themselves — what does that mean for concurrent purchases?"],
    },
    {
      id: "q-sdi-ecom-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which database-level mechanism is the last line of defense against overselling inventory to negative quantities?",
      options: [
        "A unique index on (product_id, warehouse_id) to prevent duplicate rows",
        "A CHECK constraint: quantity >= 0 on the inventory table",
        "A foreign key constraint from orders to inventory",
        "A trigger that rolls back the transaction if quantity would go negative"
      ],
      correctAnswer: 1,
      explanation: "A CHECK constraint (quantity >= 0) at the database level is the simplest and most reliable last-resort guard. Even if application logic or caching layers have bugs, the database will reject any UPDATE that would set quantity below zero. While triggers can achieve the same, they add complexity. Unique indexes and foreign keys solve different problems. The CHECK constraint is declarative, enforced unconditionally, and requires no additional application logic.",
      hints: ["Which constraint is evaluated by the DB engine on every write, regardless of application code?", "What happens to a transaction that violates a CHECK constraint?"],
    },
    {
      id: "q-sdi-ecom-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A warehouse management system needs to track pick/pack/ship workflow with real-time inventory availability. Which event-driven design is most appropriate?",
      options: [
        "Polling the inventory table every second from the warehouse scanner app to detect quantity changes",
        "Each barcode scan emits an event (ITEM_PICKED, ITEM_PACKED, ITEM_SHIPPED) to a Kafka topic; consumers update inventory and push real-time availability via WebSocket",
        "Direct synchronous REST calls from scanner to inventory service on each scan, with the UI polling every 5 seconds",
        "Batch processing all scanner events nightly to reconcile inventory counts"
      ],
      correctAnswer: 1,
      explanation: "An event-driven architecture with Kafka is ideal for warehouse workflows. Each barcode scan emits a typed event (ITEM_PICKED, ITEM_PACKED, ITEM_SHIPPED) to a durable Kafka topic. Multiple consumers can independently update inventory, generate audit logs, trigger notifications, and push real-time availability updates via WebSocket to the storefront. This decouples scanner operations from downstream processing, handles backpressure gracefully, and provides a full audit trail. Polling creates unnecessary load and adds latency. Synchronous REST calls create tight coupling and fail badly if inventory service is slow.",
      hints: ["What architectural pattern decouples event producers from consumers and supports multiple consumers reading the same event?", "How would you push inventory changes to a storefront in real time without polling?"],
    },
    {
      id: "q-sdi-ecom-4",
      type: "true-false",
      difficulty: "medium",
      question: "During checkout, reserving inventory for 15 minutes using a Redis key with a TTL (time-to-live) is an effective way to hold stock while the user completes payment, automatically releasing it if payment fails or times out.",
      correctAnswer: "True",
      explanation: "True. Using a Redis key like reservation:{order_id} with a 15-minute TTL implements inventory hold semantics without requiring explicit cleanup logic. When the key expires, a keyspace notification can trigger a release handler that increments the available quantity back. If payment succeeds, the reservation is converted to a confirmed deduction in the database and the Redis key is deleted. This pattern avoids permanently locking inventory and handles abandoned checkouts automatically without cron jobs or manual cleanup.",
      hints: ["What happens to a Redis key when its TTL expires?", "How can you be notified when a Redis key expires so you can release the held inventory?"],
    },
    {
      id: "q-sdi-ecom-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Your inventory system uses optimistic locking (version column). Under which traffic pattern does optimistic locking perform WORSE than pessimistic locking?",
      options: [
        "Low-concurrency reads with occasional writes (e.g., restocking during off-peak hours)",
        "Moderate write concurrency with short transactions (e.g., standard product purchases)",
        "High write contention on the same row (e.g., a single viral item being purchased by thousands simultaneously)",
        "Mixed read-write workloads where reads outnumber writes 100:1"
      ],
      correctAnswer: 2,
      explanation: "Optimistic locking performs poorly under high write contention on the same row because many transactions will read the same version, attempt to update, and then fail with a version conflict — requiring retries. Under extreme contention (thousands of concurrent buyers for one item), this creates a retry storm where throughput collapses as most work is wasted on failed attempts and retries. Pessimistic locking (SELECT FOR UPDATE) serializes access upfront, yielding predictable throughput at the cost of latency. Optimistic locking shines when conflicts are rare, which is the opposite of this scenario.",
      hints: ["What happens when 1,000 transactions all read version=5 and then all try to update with WHERE version=5?", "Which scenario maximizes the probability of a version conflict?"],
    },
  ],

  "sdi-ecom-search": [
    {
      id: "q-sdi-ecom-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce platform needs product search that handles typos, synonyms, and partial matches in product names and descriptions. Which Elasticsearch feature is most critical to configure?",
      options: [
        "Sharding strategy: increase shard count to distribute search load",
        "Custom analyzers: edge n-gram tokenizer for prefix matching, synonym token filter, and fuzziness in queries",
        "Index templates: apply the same mapping across multiple indices automatically",
        "Snapshot and restore: back up the index to S3 for disaster recovery"
      ],
      correctAnswer: 1,
      explanation: "Custom analyzers are the core of effective product search. An edge n-gram tokenizer indexes prefixes of each word, enabling real-time prefix/autocomplete matching. A synonym token filter maps equivalent terms (e.g., 'tv' -> 'television'). Fuzziness in queries (Levenshtein distance 1 or 2) handles typos. Together these ensure 'samsng tv' still matches 'Samsung Television'. Sharding improves throughput but does not affect match quality. Index templates and snapshots are operational concerns, not relevance concerns.",
      hints: ["Which Elasticsearch configuration controls how text is broken into tokens at index time and query time?", "What handles 'tv' matching 'television' and 'samsng' matching 'Samsung' in the same pipeline?"],
    },
    {
      id: "q-sdi-ecom-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user filters products by brand=Nike, price=50-150, rating>=4. Which Elasticsearch mechanism implements this faceted search efficiently?",
      options: [
        "Post-filter with a boolean must clause applied after scoring",
        "Aggregations with sub-aggregations: terms agg for brand, range agg for price, range agg for rating — applied as filter context, not query context",
        "A separate index per filter combination, routing queries to the correct index",
        "Application-level filtering: fetch all results then filter in memory"
      ],
      correctAnswer: 1,
      explanation: "Faceted search in Elasticsearch uses filter context (not query context) for exact filters because filter context results are cached and do not affect scoring. Aggregations compute facet counts — terms aggregation for brand, range aggregation for price buckets, range aggregation for rating — so users see counts like 'Nike (342)'. Filters applied in filter context skip scoring and are cached in the filter cache, making them much faster than query context. A post-filter only applies after scoring, so it doesn't affect the aggregation counts for other facets — useful for keeping facet counts consistent across filter selections.",
      hints: ["What is the difference between query context and filter context in Elasticsearch, and which one is cached?", "How does Elasticsearch compute 'Nike (342)' — the count of Nike products in search results?"],
    },
    {
      id: "q-sdi-ecom-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce search team wants to rank products by relevance. Which combination of signals produces the best ranking?",
      options: [
        "TF-IDF score only (text relevance from Elasticsearch BM25)",
        "TF-IDF + static popularity score (total sales volume)",
        "TF-IDF (BM25) + click-through rate (CTR) + conversion rate + inventory availability, combined via a function_score query",
        "Only conversion rate, since it directly measures purchase intent"
      ],
      correctAnswer: 2,
      explanation: "Best-in-class product search ranking combines multiple signals. BM25/TF-IDF measures text relevance. CTR captures whether users find a result relevant enough to click. Conversion rate measures purchase intent (a product clicked but never bought may be misleading). Inventory availability ensures you don't rank out-of-stock items highly. Elasticsearch's function_score query allows multiplying or adding these signals as boost factors. Using only TF-IDF misses behavioral signals. Using only conversion rate ignores text relevance. The ensemble approach is how Amazon, eBay, and similar platforms rank products.",
      hints: ["What does a high click-through rate signal about a search result, compared to a high conversion rate?", "How does Elasticsearch's function_score query let you blend text relevance with custom numeric signals?"],
    },
    {
      id: "q-sdi-ecom-9",
      type: "true-false",
      difficulty: "medium",
      question: "Personalizing search results by boosting categories from a user's purchase history (e.g., boosting 'Running Shoes' for a user who previously bought 3 running products) is best implemented by building one large shared index and passing per-user boost parameters at query time, rather than maintaining a separate index per user.",
      correctAnswer: "True",
      explanation: "True. Maintaining a separate index per user is operationally infeasible at scale — millions of indices would crush Elasticsearch cluster management. Instead, a single shared product index is maintained, and personalization is applied at query time via boosting. The user's category preferences (derived from purchase/browse history) are stored in Redis or a user profile service. At search time, the query includes function_score boosts for the user's preferred categories. This adds minimal overhead (a few extra boost clauses per query) while personalizing results within the same shared index.",
      hints: ["How many Elasticsearch indices would you need if every user got their own index in a system with 50 million users?", "What does Elasticsearch's function_score or rescore query allow you to inject at query time?"],
    },
  ],

  "sdi-ecom-recommendations": [
    {
      id: "q-sdi-ecom-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce platform wants to implement 'customers who bought X also bought Y'. Which approach is correct for item-based collaborative filtering at scale?",
      options: [
        "At query time, compute cosine similarity between item X and all other items using the live purchase matrix",
        "Precompute an item-to-item similarity matrix offline (nightly Spark job), store top-K similar items per item in a key-value store, and serve recommendations in O(1) at query time",
        "Train a neural collaborative filtering model online that updates with every purchase",
        "Use user-based CF: find users similar to the buyer, recommend what they bought next"
      ],
      correctAnswer: 1,
      explanation: "Item-based CF at scale precomputes the similarity matrix offline. A nightly Spark job reads the full purchase matrix, computes pairwise item similarities (e.g., cosine similarity on purchase vectors), and stores the top-K most similar items for each item in a key-value store like Redis or DynamoDB (key: item_id, value: [item_1, item_2, ..., item_K]). At query time, looking up recommendations is a single O(1) key-value read. Online computation of similarity across millions of items is infeasible at query time. User-based CF is generally less accurate and harder to scale than item-based CF for large catalogs.",
      hints: ["What is the query-time complexity if you precompute and store top-K similar items per item in Redis?", "Why is item-based CF preferred over user-based CF for large catalogs?"],
    },
    {
      id: "q-sdi-ecom-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A new user visits an e-commerce site for the first time with no purchase history. Which strategy best addresses the cold-start problem for recommendations?",
      options: [
        "Show no recommendations until the user has purchased at least 5 items",
        "Use a combination of: globally popular items, demographic-based recommendations (age/location if available), and an onboarding quiz to elicit category preferences",
        "Randomly sample items from the catalog to expose users to diverse products",
        "Show only the most recently added items, since new users may prefer new products"
      ],
      correctAnswer: 1,
      explanation: "The cold-start problem for new users is solved by layered fallbacks. First, show globally popular items (trending, best-sellers) as a safe default. If demographic signals are available (age, location from signup or IP), use demographic-based collaborative filtering to show what similar users tend to buy. An onboarding quiz (e.g., 'What are you shopping for? Electronics / Fashion / Sports') immediately elicits explicit preference signals to bootstrap personalization. This layered approach provides useful recommendations immediately while quickly gathering data to enable personalized CF. Showing nothing or random items damages conversion.",
      hints: ["What data do you have for a brand-new user before they interact with any products?", "How can you get preference signals from a user before they make any purchases?"],
    },
    {
      id: "q-sdi-ecom-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When should a recommendation system use real-time session-based recommendations versus daily batch-computed collaborative filtering?",
      options: [
        "Real-time for all recommendations — batch is always outdated",
        "Batch for all recommendations — real-time is too expensive",
        "Batch (daily offline CF) for personalized long-term recommendations; real-time session-based (last N clicked items) for capturing immediate in-session intent",
        "Real-time for new users, batch for returning users"
      ],
      correctAnswer: 2,
      explanation: "Hybrid approaches work best. Batch-computed CF (run nightly on full purchase history) captures long-term user preferences effectively — it processes petabytes of data with complex algorithms like ALS matrix factorization that are impractical in real time. Session-based recommendations use the items a user has clicked or viewed in the current session (last 5-10 items) to surface similar items right now — capturing intent like 'currently shopping for running shoes' that hasn't yet appeared in their purchase history. The two signals are often blended: batch CF for the base ranking, session-based for recency boosting.",
      hints: ["What signal does a user's click history in the current session provide that their long-term purchase history does not?", "Why is running ALS matrix factorization in real time on every page load impractical?"],
    },
    {
      id: "q-sdi-ecom-13",
      type: "true-false",
      difficulty: "medium",
      question: "In collaborative filtering, item-based CF is generally more stable and scalable than user-based CF for large e-commerce catalogs because the item catalog changes less frequently than user behavior, making precomputed item similarity matrices valid for longer periods.",
      correctAnswer: "True",
      explanation: "True. In a large e-commerce catalog with millions of users and hundreds of thousands of products, item-based CF wins on scalability. The item similarity matrix (items x items) changes slowly — a product's similarity to other products is relatively stable as it accumulates purchases over weeks. In contrast, user similarity (users x users) changes constantly as each new purchase updates a user's profile. Item-based CF also benefits from the catalog being much smaller than the user base, making the similarity matrix computationally tractable. This is why Amazon's original recommendation engine used item-based CF.",
      hints: ["How often does a product's purchase pattern change compared to a user's purchase history?", "Which matrix is larger: items x items (hundreds of thousands) or users x users (millions)?"],
    },
  ],

  "sdi-ecom-cart-checkout": [
    {
      id: "q-sdi-ecom-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Where should shopping cart data be stored for a large e-commerce platform with both guest and logged-in users?",
      options: [
        "Only in browser localStorage — zero server cost, works offline",
        "Only in a relational database — ensures durability and ACID guarantees",
        "Server-side in Redis keyed by session_id (guest) or user_id (logged-in), with client-side as a fallback/display cache",
        "In a cookie encoded as JSON — limits to 4KB but requires no server infrastructure"
      ],
      correctAnswer: 2,
      explanation: "Server-side cart storage in Redis is the industry standard. Redis provides sub-millisecond reads, survives browser refreshes and device switches, and persists across sessions for logged-in users. Using user_id as the key means a user's cart is accessible from any device. Session_id handles guest carts. Client-side only (localStorage/cookie) loses the cart if the user clears storage, switches browsers, or uses another device. A relational database is durable but too slow for frequent cart reads (every page load). The 4KB cookie limit makes it impractical for multi-item carts. Redis also supports TTL to expire abandoned guest carts automatically.",
      hints: ["What happens to a localStorage cart if a user switches from mobile to desktop?", "Which storage layer provides sub-millisecond read latency suitable for every page load?"],
    },
    {
      id: "q-sdi-ecom-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user adds items to their cart as a guest, then logs in. How should the system handle merging the guest cart with their existing logged-in cart?",
      options: [
        "Discard the guest cart and use the logged-in cart — assume the logged-in cart is more authoritative",
        "Discard the logged-in cart and use the guest cart — the user just added these items",
        "Merge: for items in both carts, keep the higher quantity; for items in only one cart, add them; de-duplicate by product_id",
        "Prompt the user to choose which cart to keep, showing both side-by-side"
      ],
      correctAnswer: 2,
      explanation: "Cart merge on login should be additive and non-destructive. The safest approach: for product_ids present in both guest and logged-in carts, keep the higher quantity (the user likely intended to add more). For product_ids present in only one cart, include them in the merged cart. De-duplicate by product_id to avoid duplicate line items. This approach preserves maximum user intent — items the user added either during this session or previously. Discarding either cart risks losing items the user wanted. Prompting the user to choose creates unnecessary friction during a critical conversion moment.",
      hints: ["What is the least destructive approach that preserves items from both carts?", "If the logged-in cart has qty=2 for a shirt and the guest cart has qty=3 for the same shirt, what quantity makes most sense?"],
    },
    {
      id: "q-sdi-ecom-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the correct sequence of operations in a robust checkout flow?",
      options: [
        "Process payment -> reserve inventory -> calculate shipping/tax -> confirm order",
        "Validate inventory availability -> reserve inventory -> calculate shipping/tax -> process payment -> confirm order and send confirmation",
        "Reserve inventory -> process payment -> validate inventory -> confirm order",
        "Calculate shipping/tax -> process payment -> validate and reserve inventory -> confirm order"
      ],
      correctAnswer: 1,
      explanation: "The correct checkout sequence is: (1) Validate inventory — check that all items are available to avoid charging users for out-of-stock items. (2) Reserve inventory — atomically hold the stock so it cannot be sold to another buyer during payment. (3) Calculate shipping and tax — these depend on the delivery address confirmed at checkout, not at cart-add time. (4) Process payment — only charge the user after inventory is secured. (5) Confirm order — write the order record, release the reservation in exchange for a committed deduction, and send confirmation. Processing payment before validating/reserving inventory risks charging users for items you cannot fulfill.",
      hints: ["Why must inventory validation happen before payment processing?", "What is the risk of calculating tax before knowing the final delivery address?"],
    },
    {
      id: "q-sdi-ecom-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A product's price changes from $99 to $129 between the time a user adds it to their cart and when they reach checkout. What is the correct behavior?",
      options: [
        "Always honor the price at add-to-cart time — the user should always get the price they saw",
        "Always use the current price at checkout time without informing the user",
        "Lock the price at add-to-cart, but if the price has increased by checkout, show a 'price has changed' warning and display the new price before the user confirms payment",
        "Silently use the lower of the two prices to maximize conversion"
      ],
      correctAnswer: 2,
      explanation: "The industry standard is to warn users of price increases while always charging the current price. Locking prices at add-to-cart time indefinitely is impractical — prices legitimately change due to promotions ending, competitor adjustments, or errors. Always charging the checkout price without warning is legal but damages trust (user sees unexpected total). The best UX: store the price at add-to-cart for display purposes, recalculate at checkout, and if the price has increased, show a clear warning ('Price has changed from $99 to $129 — do you wish to continue?') before charging. Price decreases can be applied silently as a pleasant surprise.",
      hints: ["What is the user expectation when they see a price in their cart vs what they are charged?", "Which direction of price change (increase vs decrease) requires explicit user notification?"],
    },
  ],

  "sdi-ecom-order-management": [
    {
      id: "q-sdi-ecom-18",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which represents a correct order state machine for an e-commerce platform?",
      options: [
        "created -> paid -> shipped -> delivered (linear, no cancellations or returns)",
        "pending -> confirmed -> payment_captured -> picking -> shipped -> delivered, with cancelled and returned as terminal states reachable from multiple states",
        "pending -> shipped -> delivered -> payment_captured (payment after delivery)",
        "pending -> payment_captured -> delivered -> picking -> shipped (fulfillment after delivery)"
      ],
      correctAnswer: 1,
      explanation: "A robust order state machine reflects real fulfillment workflow: pending (order created, not yet confirmed) -> confirmed (inventory reserved, order accepted) -> payment_captured (payment successfully charged) -> picking (warehouse is assembling the order) -> shipped (handed to carrier, tracking number assigned) -> delivered (carrier confirms delivery). Cancelled and returned are terminal states reachable from multiple points: you can cancel a pending or confirmed order; you can initiate a return from shipped or delivered. Each transition should be an event logged with timestamp and actor, enabling customer support visibility and SLA tracking.",
      hints: ["At which state should the warehouse start picking items?", "From which states can a customer cancel an order?"],
    },
    {
      id: "q-sdi-ecom-19",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Order processing uses a distributed saga pattern: reserve inventory -> capture payment -> trigger fulfillment -> send confirmation. If payment capture fails, what must happen?",
      options: [
        "Retry the payment capture indefinitely until it succeeds",
        "Execute compensating transactions in reverse: cancel fulfillment trigger (if started), reverse the payment capture, release the inventory reservation",
        "Mark the order as failed and require the user to start a new order",
        "Roll back the entire saga using a two-phase commit across all services"
      ],
      correctAnswer: 1,
      explanation: "In the saga pattern, there are no distributed transactions — instead, each step has a compensating transaction that undoes its effect. If payment capture fails: (1) No fulfillment was triggered yet, so no compensation needed there. (2) The payment capture failed, so no reversal is needed for payment (but any pre-authorization may need to be released). (3) The inventory reservation must be released via a compensating transaction to make the stock available again. Compensating transactions run in reverse order from the failure point. Two-phase commit across microservices is an anti-pattern — it couples services and doesn't work across heterogeneous systems. Retrying indefinitely blocks the inventory reservation.",
      hints: ["In a saga, what undoes a completed step that was part of a failed multi-step process?", "If inventory was reserved in step 1 and payment fails in step 2, what must happen to the inventory?"],
    },
    {
      id: "q-sdi-ecom-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user wants to view their order history (thousands of orders over many years). Which pagination approach is most efficient?",
      options: [
        "Offset-based pagination: SELECT * FROM orders WHERE user_id=? LIMIT 20 OFFSET 500",
        "Page-number based: pass page=25 and compute OFFSET=25*20=500 on the server",
        "Cursor-based pagination using the last seen order_id (ULID or timestamp-ordered ID): SELECT * FROM orders WHERE user_id=? AND order_id < :cursor ORDER BY order_id DESC LIMIT 20",
        "Load all orders at once and paginate in JavaScript on the client"
      ],
      correctAnswer: 2,
      explanation: "Cursor-based pagination using timestamp-ordered IDs (ULIDs or Snowflake IDs) is the correct approach. OFFSET-based pagination requires the database to scan and skip N rows, which gets progressively slower as the user pages deeper (OFFSET 10000 scans 10020 rows to return 20). Cursor-based pagination with a WHERE order_id < :cursor clause uses an index seek directly to the cursor position, making every page O(log N) regardless of depth. Using ULIDs as order IDs gives natural time ordering (no separate created_at index needed for sorting) and the cursor is simply the last order_id from the previous page.",
      hints: ["What is the database cost of OFFSET 10000 LIMIT 20 compared to WHERE id < cursor LIMIT 20?", "Why does ULID make a good cursor for order history?"],
    },
    {
      id: "q-sdi-ecom-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A customer requests a return 25 days after delivery. What is the correct returns processing flow?",
      options: [
        "Immediately issue a full refund upon return request, before receiving the item back",
        "Validate return window (e.g., 30-day policy), check item condition eligibility, generate return label, inspect item on receipt, then issue refund via payment processor reversal",
        "Reject all returns after 14 days as a strict policy regardless of item condition",
        "Only issue store credit, never direct payment reversals"
      ],
      correctAnswer: 1,
      explanation: "Returns processing involves multiple steps: (1) Validate the return window — check that the request is within policy (e.g., 30 days from delivery date, stored in the order record). (2) Check item condition eligibility — some items (e.g., perishables, personalized items, opened software) may be non-returnable per policy. (3) Generate a prepaid return shipping label and RMA number. (4) Inspect the item on receipt at the warehouse — grade the condition (unopened, like new, damaged). (5) Issue refund via payment processor reversal (or store credit if the item is damaged beyond policy). The refund goes through the original payment method to comply with card network regulations. Refunding before receiving the item creates fraud risk.",
      hints: ["What data from the original order do you need to validate the 30-day return window?", "Why must refunds typically go back to the original payment method rather than always issuing store credit?"],
    },
  ],

  "sdi-ecom-pricing": [
    {
      id: "q-sdi-ecom-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce marketplace wants to implement dynamic pricing. Which approach is most appropriate for different scenarios?",
      options: [
        "ML-only pricing for all products: train a demand forecasting model and set price to maximize revenue",
        "Rule-based only: manually configured rules for every pricing scenario (competitor matching, discounts, bundles)",
        "Rule-based for known patterns (competitor price matching within bounds, promotional rules, bundle discounts) + ML-based for demand forecasting and elasticity estimation where sufficient data exists",
        "Fixed prices with manual overrides — dynamic pricing is too risky for most e-commerce"
      ],
      correctAnswer: 2,
      explanation: "Dynamic pricing works best as a hybrid. Rule-based engines excel at well-understood, interpretable, business-critical scenarios: match competitor price if theirs is lower by 5%, apply 20% discount on weekends, minimum margin constraints. These rules are auditable and safe. ML-based approaches (demand forecasting, price elasticity models) work well for products with rich historical data, where the model can estimate how price changes affect conversion. ML is harder to debug, can produce unexpected prices, and needs guardrails (min/max price bounds). The hybrid uses rules as guardrails and ML for optimization within those bounds — exactly how Amazon, Airbnb, and Uber approach pricing.",
      hints: ["What is a key operational risk of pure ML-based pricing without guardrails?", "Which scenario — known competitor price matching or complex demand elasticity — is better suited to rules vs ML?"],
    },
    {
      id: "q-sdi-ecom-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A coupon code SAVE20 allows one use per order and has a total redemption limit of 10,000. How do you implement this correctly under high concurrency?",
      options: [
        "Check the usage count in MySQL before applying the coupon, relying on SELECT + UPDATE in a transaction",
        "Store the coupon usage count in Redis; use DECR: if result < 0, reverse and reject; use a coupon_uses table with a unique index on (coupon_id, order_id) for idempotency",
        "Lock the entire coupons table row using SELECT FOR UPDATE for each redemption",
        "Check and apply the coupon in application code with no database-level constraint"
      ],
      correctAnswer: 1,
      explanation: "Correct coupon implementation needs two things: (1) Atomic usage count enforcement — Redis DECR on the coupon's remaining count is atomic; if it goes below 0, INCR it back and reject. This handles the 10,000 redemption limit without race conditions. (2) Per-order idempotency — a unique index on (coupon_id, order_id) in the database prevents the same coupon being applied twice to the same order (e.g., due to retries). This combination prevents overshooting the redemption limit and double-application. SELECT FOR UPDATE on the coupons row serializes all redemptions through one lock, creating a bottleneck. Pure application-level checks have TOCTOU race conditions.",
      hints: ["What makes Redis DECR safe for concurrent coupon redemptions?", "What prevents a coupon from being applied twice to the same order if the checkout service retries?"],
    },
    {
      id: "q-sdi-ecom-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A flash sale changes product prices from $199 to $49 for 2 hours. After the sale ends, some users still see $49 on the product page. What is the most likely cause and fix?",
      options: [
        "The database did not update the price — fix the cron job that applies flash sale prices",
        "The price was updated in the database, but the CDN is serving stale cached product pages — trigger a CDN cache purge when the sale price is updated",
        "Browser local storage is caching the price — tell users to clear their browser storage",
        "The load balancer is routing to stale application servers — restart all application servers"
      ],
      correctAnswer: 1,
      explanation: "CDN caching is the most common cause of stale prices after flash sales. Product pages are aggressively cached at CDN edge nodes to reduce origin server load (cache-control: public, max-age=3600 is common for product pages). When the flash sale ends and the price reverts in the database, the CDN continues serving the cached $49 page until the TTL expires. The fix: trigger a programmatic CDN cache purge (via CloudFront, Fastly, or Cloudflare APIs) immediately when the sale price is scheduled to change. Flash sale management systems should include 'CDN purge on price change' as a step in the sale workflow. Restarting app servers doesn't help with CDN edge caches.",
      hints: ["Where is the product page content most likely cached between the database and the user's browser?", "What operation clears a CDN's cached version of a URL immediately?"],
    },
    {
      id: "q-sdi-ecom-25",
      type: "true-false",
      difficulty: "medium",
      question: "Using a third-party tax calculation API like Avalara or TaxJar at checkout time (rather than maintaining your own tax rate tables) is preferable for most e-commerce platforms because tax rules vary by product category, destination state/country, buyer exemption status, and change frequently.",
      correctAnswer: "True",
      explanation: "True. Tax calculation is extraordinarily complex: rates vary by US state, county, and city (10,000+ jurisdictions). Product taxability differs — groceries may be exempt while clothing is taxed at different rates in different states. Buyer exemption status (resellers, nonprofits) further complicates things. Rules change with legislation multiple times per year. Maintaining accurate tax tables in-house requires dedicated tax engineers and legal monitoring. Avalara and TaxJar provide APIs that handle all this complexity, stay current with law changes, provide audit trails, and handle compliance reporting (sales tax remittance). For most platforms, the API cost is far less than the engineering and legal cost of maintaining this in-house.",
      hints: ["How many US tax jurisdictions exist, and how often do their rates change?", "What is the risk of using stale self-maintained tax tables in a state that recently changed its sales tax law?"],
    },
  ],

  "sdi-ecom-analytics": [
    {
      id: "q-sdi-ecom-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce team wants to track where users drop off in the conversion funnel: page_view -> product_view -> add_to_cart -> checkout -> purchase. Which data pipeline design is most appropriate?",
      options: [
        "Log all events to the application database, run SQL queries on it to compute funnel metrics",
        "Use client-side tracking (JavaScript pixels) to send events directly to Google Analytics, rely solely on that for funnel analysis",
        "Emit funnel events (with user_id, session_id, product_id, timestamp) to Kafka; consume into ClickHouse or BigQuery for funnel queries; track abandonment rate at each step",
        "Track only the final purchase event to minimize data storage costs"
      ],
      correctAnswer: 2,
      explanation: "A streaming analytics pipeline is the correct approach. Client-side JavaScript emits structured events (page_view, product_view, add_to_cart, checkout_started, purchase_completed) with user_id, session_id, product_id, and timestamp to a Kafka topic. A consumer writes these to an OLAP database (ClickHouse for sub-second queries, BigQuery for scale) optimized for analytical queries. Funnel analysis queries then compute: how many sessions that had add_to_cart events also had a purchase event within 24 hours? Abandonment at each step = (users entering step N - users completing step N) / users entering step N. Writing to the application database pollutes OLTP with analytical queries. Client-side only (GA) misses server-side context and is blocked by ad blockers.",
      hints: ["What type of database (OLTP or OLAP) is optimized for funnel analysis queries across billions of events?", "Why is tracking only the final purchase event insufficient for funnel analysis?"],
    },
    {
      id: "q-sdi-ecom-27",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An e-commerce team runs an A/B test: control group sees the original product page, treatment group sees a redesigned page. Which metric and assignment strategy is most statistically sound?",
      options: [
        "Assign users to groups by day of week (Mon-Wed = control, Thu-Sat = treatment); measure total revenue",
        "Assign users randomly (hash of user_id mod 2) to control/treatment; measure add-to-cart rate and conversion rate; use statistical significance testing (e.g., chi-squared) with minimum detectable effect",
        "Assign all mobile users to treatment and desktop users to control; measure page views",
        "Run the test for exactly 24 hours and use whichever variant had more purchases"
      ],
      correctAnswer: 1,
      explanation: "Sound A/B testing requires: (1) Random assignment — hashing user_id ensures stable, consistent assignment (a user always sees the same variant across sessions) and randomness ensures the groups are statistically comparable. (2) Relevant metrics — add-to-cart rate and conversion rate directly measure the goal; total revenue has high variance. (3) Statistical rigor — use chi-squared test (for conversion rates) or t-test (for continuous metrics) with a pre-determined minimum detectable effect (MDE) and power calculation to determine required sample size and test duration. Day-of-week or device-type assignment introduces confounding variables. 24 hours is almost never sufficient sample size; it also captures only weekday or weekend behavior.",
      hints: ["Why must A/B test assignment be random and stable (same user always in same group)?", "What is the 'peeking problem' in A/B testing, and why does running for exactly 24 hours risk it?"],
    },
    {
      id: "q-sdi-ecom-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce company wants a real-time revenue dashboard showing revenue by minute, and daily/weekly cohort retention. Which architecture serves both needs?",
      options: [
        "A single PostgreSQL database with materialized views refreshed every minute",
        "Real-time: Kafka -> ClickHouse with a streaming ingestion pipeline for per-minute revenue. Cohort analysis: nightly batch job reading from the data warehouse (BigQuery/Snowflake) to compute weekly retention curves",
        "All analytics computed on-demand from the production OLTP database",
        "A Redis time-series database (RedisTimeSeries) for all analytics including cohort analysis"
      ],
      correctAnswer: 1,
      explanation: "The two analytics needs have different characteristics requiring different architectures. Real-time dashboards (revenue by minute) need low-latency ingestion and fast aggregation queries — Kafka as the event stream with ClickHouse as the OLAP store (ClickHouse can ingest millions of events/second and answer aggregation queries in milliseconds). Cohort analysis (weekly retention, LTV curves) involves complex multi-step queries across months of data — better suited to a data warehouse (BigQuery, Snowflake) that gets a daily batch of enriched, cleaned event data. Running complex cohort queries on production OLTP databases or Redis causes performance degradation. The hybrid Kafka+ClickHouse+data warehouse pattern is standard at companies like Shopify and Instacart.",
      hints: ["Which query is more latency-sensitive: 'revenue in the last 60 seconds' or 'week 4 retention rate for January cohort'?", "Why is ClickHouse better than PostgreSQL for per-minute revenue aggregations?"],
    },
  ],

  "sdi-ecom-fraud": [
    {
      id: "q-sdi-ecom-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which combination of signals is most effective for detecting fraudulent orders in real time?",
      options: [
        "Order amount above $500 — flag all high-value orders for review",
        "Multiple orders from the same IP address within 10 minutes",
        "Velocity checks (N orders in M minutes per user/IP/card), IP geolocation vs billing address mismatch, multiple orders to the same shipping address with different payment cards, and device fingerprint anomalies",
        "Email domain check — flag orders from free email providers like Gmail or Yahoo"
      ],
      correctAnswer: 2,
      explanation: "Effective fraud detection requires a multi-signal approach. Velocity checks (e.g., >3 orders in 10 minutes from same IP or user_id) catch account takeover and card testing attacks. IP geolocation vs billing address mismatch (order placed from Nigeria, billing address in California) is a strong fraud signal. Multiple orders to one shipping address using different payment cards often indicates a fraudster consolidating purchases. Device fingerprinting catches bots and emulators. No single signal is sufficient — fraudsters adapt to single-signal rules quickly. High order amount alone generates too many false positives. IP-only checks are bypassed by VPNs. Free email checks are too broad and would block legitimate users.",
      hints: ["Why is any single fraud signal insufficient on its own?", "What attack pattern does 'multiple cards to one shipping address' specifically indicate?"],
    },
    {
      id: "q-sdi-ecom-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A fraud detection system uses a rule engine plus an ML model ensemble. What is the correct role of each component?",
      options: [
        "Rules replace the ML model entirely once they achieve 95% accuracy",
        "The ML model replaces rules after enough training data is collected",
        "Rules catch known fraud patterns instantly (card testing, velocity abuse) with low latency and high precision; ML catches novel fraud patterns by learning from labeled historical data — both run in parallel, with scores combined for a final decision",
        "Rules run offline on historical data; ML runs in real time for all decisions"
      ],
      correctAnswer: 2,
      explanation: "Rule engines and ML models are complementary, not substitutes. Rules excel at: known, well-defined patterns (card testing = >10 small orders in 5 minutes); immediate enforcement (no inference latency); high explainability (easy to audit and explain to regulators). ML models excel at: novel patterns that don't fit predefined rules; complex feature interactions (fraud that looks legitimate by any single signal but is anomalous in combination); continuous improvement as new labeled fraud examples are added. In practice, rules provide a first pass (block obvious fraud in <1ms), and the ML model scores borderline cases. Scores are combined: a transaction blocked by rules is auto-declined; one flagged only by ML may go to manual review. This ensemble approach is used by Stripe, PayPal, and Shopify.",
      hints: ["What is the latency advantage of a rule engine over a neural network for real-time fraud scoring?", "What type of fraud pattern is a rule engine unable to detect without a human writing a new rule?"],
    },
    {
      id: "q-sdi-ecom-31",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-commerce platform wants to reduce chargeback liability. Which authentication mechanism most directly shifts chargeback liability from the merchant to the card issuer?",
      options: [
        "Requiring CVV verification on every transaction",
        "Implementing 3D Secure (3DS) authentication — an additional cardholder verification step during checkout",
        "Adding CAPTCHA to the checkout page to prevent bot purchases",
        "Requiring address verification (AVS) for all orders"
      ],
      correctAnswer: 1,
      explanation: "3D Secure (3DS / Verified by Visa / Mastercard Identity Check) is specifically designed for liability shift. When a transaction is authenticated via 3DS, the card issuer (not the merchant) bears the chargeback liability for fraud disputes. This is because the issuer has verified the cardholder's identity (via OTP, biometric, or passive risk scoring). Without 3DS, a chargeback for 'I didn't make this purchase' falls on the merchant. CVV and AVS are verification tools but do not trigger liability shift. CAPTCHA prevents bots but provides no chargeback protection. 3DS 2.x (the modern version) uses risk-based authentication that is frictionless for most transactions, adding friction only when the risk score is high.",
      hints: ["Which party bears chargeback liability when 3DS authentication is successfully completed?", "What distinguishes 3DS from CVV/AVS in terms of who is responsible for fraud losses?"],
    },
  ],

  "sdi-ecom-reviews": [
    {
      id: "q-sdi-ecom-32",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which combination of mechanisms best ensures review authenticity on an e-commerce platform?",
      options: [
        "Allow anyone to review any product, rely on community downvoting to surface fake reviews",
        "Require a verified purchase for review submission + enforce a 72-hour delay after delivery before the review form unlocks + run an ML classifier on review text to detect templated or incentivized reviews",
        "Only allow reviews from users with >5 purchases on the platform",
        "Manually approve every review before publication"
      ],
      correctAnswer: 1,
      explanation: "Multi-layered authenticity controls work best. Verified purchase requirement ensures only buyers who actually received the product can review it, preventing competitor sabotage and brand sock-puppet reviews. The 72-hour delay prevents incentivized reviews where sellers offer refunds in exchange for immediate 5-star reviews right after delivery. ML classifiers detect patterns: templated language (many identical or near-identical reviews), unusual velocity (100 reviews of same product in one hour), or sentiment inconsistency (5-star text with negative language). Together these layers make fraud much harder. Community downvoting alone is gameable. Manual approval is unscalable at millions of reviews per day. Purchase count thresholds exclude legitimate first-time buyers.",
      hints: ["What behavior does the 72-hour post-delivery delay specifically prevent?", "What patterns in review text or metadata would an ML classifier use to detect fake reviews?"],
    },
    {
      id: "q-sdi-ecom-33",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A product has 10 ratings: 8 five-stars and 2 one-stars (average 4.6). Another has 1000 ratings: 780 five-stars and 220 one-stars (average 4.56). Which product should rank higher by helpfulness, and why?",
      options: [
        "The first product (4.6 average) — higher raw average means better product",
        "They should rank equally since the averages are nearly identical",
        "The second product (4.56 average) — the Wilson lower bound (Bayesian confidence interval for the true proportion of positive ratings) is higher because the larger sample size provides much tighter confidence",
        "The first product because fewer reviews means less chance of fake reviews"
      ],
      correctAnswer: 2,
      explanation: "Wilson lower bound is the correct ranking approach. With only 10 reviews, the 4.6 average has enormous uncertainty — the true quality could be anywhere from ~3.0 to ~5.0 at 95% confidence. With 1000 reviews, the confidence interval is tight around the 4.56 average. The Wilson lower bound formula gives the lower end of the 95% confidence interval for the proportion of positive ratings. For 10 reviews at 80% positive: lower bound approx 0.49. For 1000 reviews at 78% positive: lower bound approx 0.75. The second product ranks much higher because we're confident in its quality. This prevents products with a single 5-star review from outranking well-reviewed products. Reddit's comment ranking and Amazon's bestseller list use this principle.",
      hints: ["What does a confidence interval tell you about the true quality when you have only 10 data points vs 1000?", "Why is 'average rating' a poor ranking signal for products with very few reviews?"],
    },
    {
      id: "q-sdi-ecom-34",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user submits a photo with their review. What is the correct pipeline for handling image reviews at scale?",
      options: [
        "Store the image directly in the database as a BLOB field",
        "Accept the multipart upload in the API server, store on the API server's disk, and serve images from the API server",
        "Use multipart upload directly to S3 (presigned URL pattern), run an async moderation pipeline (ML classifier + human review queue for borderline cases), generate compressed thumbnails, then make the image public after approval",
        "Reject images from reviews to avoid moderation complexity"
      ],
      correctAnswer: 2,
      explanation: "The correct image review pipeline: (1) Generate a presigned S3 URL server-side and return it to the client — the client uploads directly to S3, bypassing the API server entirely (eliminates bandwidth bottleneck, scales to any upload volume). (2) S3 upload triggers an async Lambda or worker that runs the moderation pipeline: ML classifier (AWS Rekognition, Google Vision API) flags explicit/inappropriate content, borderline cases go to a human moderation queue, clear violations are rejected. (3) Approved images have thumbnails generated (multiple sizes: 150px, 400px, 800px) by an image processing service, stored back in S3. (4) Only after approval does the image become publicly associated with the review. Storing BLOBs in the database is an anti-pattern that bloats the DB. Serving from the API server doesn't scale.",
      hints: ["Why does the presigned URL pattern avoid sending image data through the API server?", "Why must image moderation be asynchronous rather than synchronous during review submission?"],
    },
  ],
};

registerQuestions(questions);
