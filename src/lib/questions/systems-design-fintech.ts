import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-fin-order-book": [
    {
      id: "q-sdi-fin-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A matching engine must support O(1) best-bid/best-ask lookup and O(log n) insertion/removal of limit orders. Which data structure combination is most appropriate for each side of the order book?",
      options: [
        "Hash map keyed by order ID for both sides",
        "Sorted array (binary search for insertion, O(n) removal)",
        "Two price-level maps (e.g., TreeMap/sorted dict) keyed by price, each price level holding a FIFO queue of orders",
        "Min-heap for asks and max-heap for bids, storing individual orders",
      ],
      correctAnswer: 2,
      explanation: "The canonical order book structure uses two sorted maps (e.g., Java TreeMap or C++ std::map): a max-map for bids (descending price) and a min-map for asks (ascending price). Each price level maps to a doubly-linked FIFO queue of orders at that price. This gives O(log n) price-level insertion/removal, O(1) best-bid/best-ask via first/last entry, and O(1) order cancellation via a separate hash map from order ID to queue node. Pure heaps lose O(1) cancellation because they don't support arbitrary deletion efficiently.",
      hints: [
        "You need both O(1) best-price lookup AND O(1) order cancellation — which combination achieves both?",
        "A TreeMap gives you the min/max key in O(1) via firstKey()/lastKey().",
      ],
    },
    {
      id: "q-sdi-fin-2",
      type: "true-false",
      difficulty: "medium",
      question: "In a limit order book, price-time priority (FIFO) means that among all orders at the same price level, the order that arrived first is matched first.",
      correctAnswer: "True",
      explanation: "True. Price-time priority (also called price-time-priority or FIFO matching) first ranks orders by price (best price matches first) and then, for orders at the same price, by arrival time (earliest timestamp wins). This is the dominant rule on most equity exchanges (NYSE, NASDAQ). The alternative is pro-rata allocation, where multiple orders at the same price are filled proportionally to their size — common on options and futures exchanges like CME.",
      hints: [
        "FIFO stands for First In, First Out — the first order to arrive at a price level is served first.",
        "Compare with pro-rata: pro-rata splits the incoming order proportionally across resting orders at the same price.",
      ],
    },
    {
      id: "q-sdi-fin-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A high-frequency trading firm's matching engine processes 1 million orders per second with latency requirements in the single-digit microsecond range. Which architectural decisions are most critical?",
      options: [
        "Use a microservices architecture with REST APIs between order ingestion and the matching core",
        "Single-threaded event loop with kernel-bypass networking (DPDK/RDMA), pre-allocated memory pools, and lock-free ring buffers between stages",
        "Multi-threaded matching with a distributed database for order state persistence",
        "Co-located JVM service with G1 garbage collector and Kafka for order delivery",
      ],
      correctAnswer: 1,
      explanation: "At sub-10-microsecond latencies, every software layer is a liability. The winning approach: single-threaded matching (eliminates lock contention), kernel-bypass networking via DPDK or RDMA (eliminates kernel syscall overhead ~5-10µs), pre-allocated memory pools (eliminates malloc/GC pauses), and lock-free SPSC ring buffers between pipeline stages (eliminates mutex latency). REST APIs introduce TCP round-trips (hundreds of microseconds). Distributed databases add network I/O. JVM GC pauses can be milliseconds — catastrophic for HFT. Firms like Jane Street use OCaml; others use C++ with explicit memory management.",
      hints: [
        "What is the main source of latency jitter in a JVM — and why is that fatal for HFT?",
        "Kernel-bypass means the NIC DMA-copies packets directly to userspace — what latency does that eliminate?",
      ],
    },
  ],

  "sdi-fin-market-data": [
    {
      id: "q-sdi-fin-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An exchange distributes real-time market data (quotes and trades) to thousands of subscribers simultaneously. Which transport protocol and reliability mechanism is most appropriate?",
      options: [
        "TCP unicast with a persistent connection per subscriber",
        "HTTP/2 server-sent events (SSE) with load balancers",
        "Multicast UDP with sequence numbers; receivers detect gaps and send gap-fill requests to a retransmission server",
        "WebSocket broadcast from a central server to all subscribers",
      ],
      correctAnswer: 2,
      explanation: "Multicast UDP is the industry standard for market data feeds (used by NASDAQ ITCH, CME MDP 3.0, etc.). A single UDP packet is replicated by the network to all multicast group members, eliminating per-subscriber bandwidth at the sender. Sequence numbers let receivers detect dropped packets; a separate TCP-based retransmission (gap-fill) server handles recovery. UDP is lossy but the latency is far lower than TCP's congestion window and retransmission logic. TCP unicast does not scale to thousands of simultaneous subscribers — bandwidth grows linearly. WebSocket over a load balancer reintroduces the single-server bottleneck.",
      hints: [
        "What transport protocol can send one packet that the network infrastructure delivers to thousands of receivers?",
        "How do receivers know they missed a message if UDP drops it silently?",
      ],
    },
    {
      id: "q-sdi-fin-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In a market data feed, what is the purpose of a sequence number on each message?",
      options: [
        "To encrypt the message payload for security",
        "To uniquely identify the instrument being quoted",
        "To allow receivers to detect out-of-order or missing messages and request retransmission",
        "To throttle the feed to a maximum message rate",
      ],
      correctAnswer: 2,
      explanation: "Sequence numbers are monotonically increasing integers assigned by the publisher to each message. Receivers compare the incoming sequence number against the expected next value. If a gap is detected (e.g., received 1005 after 1003), messages 1004 are missing and the receiver requests retransmission from the gap-fill server. Without sequence numbers, a receiver using UDP has no way to detect silent packet loss. This is fundamental to market data feed design (NASDAQ ITCH, CME MDP all use sequence numbers).",
      hints: [
        "If you receive message #1005 right after #1003, what do you know about #1004?",
        "UDP drops packets silently — how else would you detect a missing message?",
      ],
    },
  ],

  "sdi-fin-payments": [
    {
      id: "q-sdi-fin-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A payment API must guarantee exactly-once execution even if the client retries due to a network timeout. Which mechanism is the industry-standard approach?",
      options: [
        "Client includes a timestamp; server rejects duplicate timestamps within 5 minutes",
        "Client generates a UUID idempotency key per payment intent; server stores (key, result) and returns the cached result on replay",
        "Server uses optimistic locking on the user account row to detect duplicate debits",
        "Client retries with exponential backoff and the server deduplicates by amount and recipient",
      ],
      correctAnswer: 1,
      explanation: "Idempotency keys (as used by Stripe, Square, and Adyen) are client-generated UUIDs sent as a request header (e.g., Idempotency-Key: <uuid>). The server inserts the key into a deduplication table atomically with the payment record. On a replay, the server finds the existing key and returns the original response without re-executing the payment. This is safe even under concurrent retries because the INSERT is protected by a unique constraint. Timestamps are not unique enough. Deduplication by amount+recipient is semantically ambiguous (legitimate duplicate charges exist). Optimistic locking prevents concurrent double-spends but does not deduplicate across retries.",
      hints: [
        "Stripe's API requires an Idempotency-Key header for all POST requests — what does the server do with it?",
        "What database constraint ensures only one payment executes per idempotency key even under concurrent retries?",
      ],
    },
    {
      id: "q-sdi-fin-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A payment service must debit sender and credit recipient atomically across two microservices (Wallet Service and Ledger Service). Which pattern best achieves this without distributed transactions (2PC)?",
      options: [
        "Two-phase commit (2PC) coordinated by the Payment Service",
        "Saga pattern: sequence of local transactions with compensating transactions for rollback; orchestrated via a saga log",
        "Eventual consistency with a best-effort background reconciliation job",
        "Single-service database that both wallet and ledger services share",
      ],
      correctAnswer: 1,
      explanation: "The Saga pattern (used at Stripe, Uber, and other fintech companies) decomposes a distributed transaction into a sequence of local ACID transactions, each publishing an event/message to trigger the next step. If any step fails, compensating transactions (reverse operations) are executed in reverse order. An orchestration saga uses a durable saga log (e.g., in Kafka or a DB table) to track state and restart/compensate after failures. 2PC is fragile under coordinator failures and requires all participants to block during the prepare phase. Shared databases couple services. Background reconciliation allows inconsistent reads during the window.",
      hints: [
        "What does a compensating transaction do in a saga if a step fails?",
        "How does a saga log (stored durably) enable recovery after a crash mid-saga?",
      ],
    },
    {
      id: "q-sdi-fin-8",
      type: "true-false",
      difficulty: "easy",
      question: "Double-entry bookkeeping requires that every financial transaction is recorded as at least two journal entries (a debit and a credit) such that the sum of all debits always equals the sum of all credits.",
      correctAnswer: "True",
      explanation: "True. Double-entry bookkeeping is the foundation of all modern accounting and most financial ledger systems. Every transaction debits one or more accounts and credits one or more accounts by equal amounts, preserving the accounting equation (Assets = Liabilities + Equity). This invariant makes fraud and errors detectable — any imbalance indicates a bug or tampered record. Systems like Stripe's Ledger, Airbnb's payment infrastructure, and traditional core banking systems all implement double-entry internally.",
      hints: [
        "If you transfer $100 from checking to savings, which accounts are debited and credited?",
        "What invariant (mathematical equality) must hold after every transaction in double-entry bookkeeping?",
      ],
    },
  ],

  "sdi-fin-ledger": [
    {
      id: "q-sdi-fin-9",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A fintech company implements a distributed ledger as an immutable, append-only log. How are current account balances computed?",
      options: [
        "Balances are stored directly in each ledger entry and updated in-place",
        "A background job computes balances nightly and caches them in a separate table",
        "Balance is derived by replaying all ledger entries for an account from genesis, or by using periodic balance snapshots plus a delta replay",
        "Balances are stored in a separate mutable table updated atomically with each ledger append",
      ],
      correctAnswer: 2,
      explanation: "In an immutable append-only ledger (event-sourced architecture), account balances are derived state, not stored state. Full replay from genesis is correct but expensive for accounts with millions of transactions. The practical solution: periodic checkpoints (snapshots) store the balance at a known point in time (e.g., end of day). A balance query replays only the entries since the last checkpoint. This is the approach used by systems like Stellar, and it is also used in accounting systems like QuickBooks. Direct mutable balance storage violates append-only semantics.",
      hints: [
        "What is the trade-off between full replay (always correct) and snapshots + delta (faster)?",
        "What does 'event sourcing' mean for how you query the current state?",
      ],
    },
    {
      id: "q-sdi-fin-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A core banking system must guarantee ACID transactions for account debits and credits. The system has 100 million accounts. Which approach best balances ACID guarantees with scalability?",
      options: [
        "Single PostgreSQL instance with row-level locking for all accounts",
        "Shard accounts by account_id modulo N; each shard is a PostgreSQL instance with local ACID; cross-shard transfers use a saga with compensating transactions",
        "NoSQL document store (MongoDB) with multi-document transactions disabled for performance",
        "Eventual consistency via Cassandra with lightweight transactions (LWT) for balance updates",
      ],
      correctAnswer: 1,
      explanation: "Sharding by account_id distributes load while preserving local ACID guarantees within each shard. The vast majority of transactions (single-account debits, interest credits) are intra-shard and benefit from full ACID. Cross-shard transfers (e.g., wire transfers between accounts on different shards) are rarer and can use a saga with compensating transactions. This is the architecture used by neobanks and traditional banks modernizing onto horizontal PostgreSQL sharding or CockroachDB. A single PostgreSQL instance hits hardware limits at this scale. Cassandra LWT (Paxos-based) adds latency and does not give true serializability.",
      hints: [
        "What percentage of banking transactions touch a single account vs. two accounts on potentially different shards?",
        "CockroachDB and YugabyteDB are distributed SQL databases — how do they handle cross-shard transactions?",
      ],
    },
  ],

  "sdi-fin-settlement": [
    {
      id: "q-sdi-fin-11",
      type: "multiple-choice",
      difficulty: "medium",
      question: "US equity trades settle on a T+1 basis (trade date plus one business day). What is the primary reason instantaneous (T+0) settlement is technically and operationally challenging for equities?",
      options: [
        "Network bandwidth is insufficient to transmit settlement instructions on the same day",
        "Exchanges have no mechanism to match buyers and sellers in real time",
        "Settlement requires novation via a central counterparty (CCP), securities lending for short sellers, and funding verification — all of which require time to coordinate across custodians and clearing members",
        "SEC regulations prohibit same-day settlement by statute",
      ],
      correctAnswer: 2,
      explanation: "T+1 (and the historical T+2) exist because settlement involves multiple interdependent steps: trade matching and confirmation between broker-dealers, novation (the CCP, e.g., DTCC's NSCC, becomes the counterparty), securities delivery from seller's custodian, and cash delivery from buyer's custodian. Short sellers must borrow securities. Margin calls may need to be posted. Cross-border trades involve additional correspondent banking steps. Coordinating all these steps across hundreds of institutions in real time is operationally and liquidity-management challenging. Blockchain-based settlement (T+0 via DvP on a distributed ledger) is being actively explored by DTCC Project Ion and others.",
      hints: [
        "What is novation, and why does it require the CCP to verify creditworthiness before assuming counterparty risk?",
        "Why does a short seller need extra time that a long seller does not?",
      ],
    },
    {
      id: "q-sdi-fin-12",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which interbank settlement system operates on a net basis (accumulating transactions and settling net positions end-of-day) rather than settling each transaction individually in real time?",
      options: [
        "Fedwire (RTGS)",
        "TARGET2 (RTGS)",
        "ACH (Automated Clearing House)",
        "CHAPS (RTGS)",
      ],
      correctAnswer: 2,
      explanation: "ACH (Automated Clearing House) is a batch, net settlement system. Throughout the day, transactions (direct deposits, bill payments) accumulate in batches. At end-of-day clearing windows, NACHA computes net positions between participating banks and settles the net amounts via Fedwire. This reduces the total liquidity needed but means payments are not immediately final. In contrast, Fedwire, TARGET2 (EU), and CHAPS (UK) are Real-Time Gross Settlement (RTGS) systems: each payment is settled individually and immediately, making it final and irrevocable.",
      hints: [
        "RTGS = Real-Time Gross Settlement (each transaction settled one by one). ACH = batch netting. Which is which?",
        "If Bank A owes Bank B $1M and Bank B owes Bank A $900K, what is the net amount settled in ACH?",
      ],
    },
  ],

  "sdi-fin-fraud": [
    {
      id: "q-sdi-fin-13",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A real-time fraud scoring system must evaluate every card transaction (10,000/sec peak) within 50ms total latency budget. Which architecture satisfies this requirement?",
      options: [
        "Batch fraud scoring every hour using a Spark job on transaction logs",
        "Synchronous call to a Python ML model endpoint that queries a PostgreSQL feature store on each transaction",
        "Pre-computed user-level features stored in Redis; streaming feature computation on the incoming transaction in Flink; low-latency model serving (ONNX/TensorRT) with sub-10ms P99",
        "Rule-based engine with hard-coded thresholds that checks transaction amount and merchant category",
      ],
      correctAnswer: 2,
      explanation: "Real-time fraud scoring (as used at Stripe Risk, PayPal, and Visa) requires three tiers: (1) Pre-computed features (30-day spend velocity, device fingerprint, historical merchant frequency) stored in a low-latency key-value store like Redis (sub-millisecond read). (2) Stream-computed features derived from the live event context (e.g., time since last transaction, transaction frequency in last 5 minutes) via Flink or Kafka Streams. (3) Model serving using ONNX Runtime or NVIDIA TensorRT for sub-10ms inference. The 50ms budget is typically allocated: ~1ms feature retrieval, ~5ms streaming features, ~10ms model inference, ~34ms network + card network round-trip. Batch scoring misses real-time fraud. Synchronous PostgreSQL queries add 10-50ms per query. Rule-based systems have poor recall on novel fraud patterns.",
      hints: [
        "Break the 50ms budget: how many milliseconds for feature retrieval, model inference, and network?",
        "Why is a database (PostgreSQL) too slow for feature lookup at this scale, but Redis is not?",
      ],
    },
    {
      id: "q-sdi-fin-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "During card authorization, what is the correct sequence of steps from the cardholder tapping at a POS terminal to the merchant receiving approval?",
      options: [
        "POS → Issuing Bank → Card Network → Acquiring Bank → Merchant",
        "POS → Acquiring Bank → Card Network → Issuing Bank → Card Network → Acquiring Bank → POS",
        "POS → Card Network → Issuing Bank → Merchant",
        "POS → Merchant → Acquiring Bank → Issuing Bank",
      ],
      correctAnswer: 1,
      explanation: "The authorization flow is: (1) Cardholder taps/swipes at POS terminal. (2) POS sends authorization request to the Acquiring Bank (merchant's bank). (3) Acquiring Bank routes via the Card Network (Visa/Mastercard). (4) Card Network routes to the Issuing Bank (cardholder's bank). (5) Issuing Bank checks available balance, fraud rules, and responds approve/decline. (6) Response travels back: Issuing Bank → Card Network → Acquiring Bank → POS. Authorization is followed by clearing (the day's batch of approved transactions) and then settlement (actual fund movement, typically T+1). This full loop typically completes in 1-3 seconds end-to-end.",
      hints: [
        "There are four parties in a card transaction: cardholder, merchant (acquirer), card network, and issuing bank. What order do they communicate in?",
        "The authorization response must travel back the same path it came — how many hops total?",
      ],
    },
  ],

  "sdi-fin-wallet": [
    {
      id: "q-sdi-fin-15",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A digital wallet service must prevent a user from spending more than their balance even under concurrent debit requests (e.g., two payments processing simultaneously). Which approach is correct?",
      options: [
        "Read balance in application code, check if debit is possible, then UPDATE balance — no locking needed",
        "Use SELECT ... FOR UPDATE to pessimistically lock the wallet row; check balance; deduct; COMMIT — serializing concurrent debits",
        "Use a Redis counter for balance and rely on eventual consistency with the database",
        "Allow overdraft and run a nightly job to reverse invalid debits",
      ],
      correctAnswer: 1,
      explanation: "SELECT ... FOR UPDATE acquires a row-level exclusive lock before reading the balance, guaranteeing that only one transaction can check-and-deduct at a time. Without this lock, two concurrent transactions can both read the same balance (e.g., $100), both decide the $90 debit is valid, and both execute — resulting in a -$80 balance. This is a classic race condition. The alternative is optimistic locking (compare-and-swap on a version column), which is better under low contention but requires retry logic. Redis counters are not ACID-safe unless carefully designed with Lua scripts. Allowing overdrafts and reconciling after is never acceptable for a wallet.",
      hints: [
        "What is the read-check-write race condition, and how does SELECT FOR UPDATE prevent it?",
        "Two transactions both read balance=100, both pass the check for a $90 debit — what happens without locking?",
      ],
    },
    {
      id: "q-sdi-fin-16",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A cryptocurrency exchange must choose between UTXO (Unspent Transaction Output) and account-based models for tracking user balances. Which statement correctly differentiates them?",
      options: [
        "UTXO tracks balances as a running total in a single account record; account model tracks individual unspent coins",
        "UTXO balances are derived by summing unspent outputs associated with a public key; account model stores a mutable balance per address that is updated on each transaction",
        "Both models require the same amount of blockchain state to represent balances",
        "Account models are used only for Bitcoin; UTXO models are used only for Ethereum",
      ],
      correctAnswer: 1,
      explanation: "Bitcoin uses UTxO: a wallet's balance is the sum of all unspent outputs that can be unlocked with the wallet's private key. There is no single 'balance' field — it's computed by scanning the UTXO set. Ethereum uses the account model: each address has an explicit balance field in the global state trie, updated on each transaction. UTxO enables parallelism (non-overlapping UTxO sets can be processed simultaneously) and better privacy (no address reuse required). Account models are simpler for smart contracts and support richer state. Many modern blockchains (Solana, Cardano, Aptos) use variants of UTxO.",
      hints: [
        "In Bitcoin, if you received 0.3 BTC in one transaction and 0.5 BTC in another, what is your UTXO set?",
        "Ethereum has an explicit 'balance' field per address in state — Bitcoin does not. Which model is which?",
      ],
    },
  ],

  "sdi-fin-risk": [
    {
      id: "q-sdi-fin-17",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A risk management system at a hedge fund must compute real-time PnL (profit and loss) for a portfolio of 100,000 positions across equities, options, and futures as market prices update. Which architecture is most appropriate?",
      options: [
        "Batch job recalculates all PnL from scratch every minute",
        "Event-driven incremental computation: price update events trigger recalculation only for affected positions; position PnL is cached and aggregated hierarchically (position → strategy → fund)",
        "Store positions in a relational database; run a SQL aggregation query on each price update",
        "Request/response microservice: risk service queries position service and price service on demand",
      ],
      correctAnswer: 1,
      explanation: "Real-time risk systems (used at Citadel, Two Sigma, and D.E. Shaw) use event-driven incremental computation. A price update event for AAPL triggers recalculation only for the K positions that hold AAPL (K << 100,000). The result propagates up a hierarchical aggregation tree (position PnL → book PnL → strategy PnL → fund PnL). This incremental approach achieves sub-second latency at scale. Batch recalculation introduces seconds to minutes of staleness — dangerous for risk management. SQL aggregation queries are too slow for streaming price updates. Request/response microservices add network round-trip latency on every price tick.",
      hints: [
        "If AAPL price changes, how many of 100,000 positions are affected? Why recompute the rest?",
        "What does 'hierarchical aggregation' mean for rolling up position PnL to fund-level PnL efficiently?",
      ],
    },
    {
      id: "q-sdi-fin-18",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which condition typically triggers a market-wide circuit breaker halt on US equity markets?",
      options: [
        "Any single stock falls more than 5% in one minute",
        "The S&P 500 index falls 7%, 13%, or 20% from the prior day's closing price",
        "Trading volume exceeds 10 billion shares in a single day",
        "VIX (volatility index) rises above 40",
      ],
      correctAnswer: 1,
      explanation: "US market-wide circuit breakers (Rule 48 and the Market-Wide Circuit Breaker rules adopted after the 1987 crash and revised after the 2010 Flash Crash) halt trading when the S&P 500 index drops 7% (Level 1), 13% (Level 2), or 20% (Level 3) from the prior day's closing price. Level 1 and 2 halts last 15 minutes; a Level 3 halt stops trading for the rest of the day. Individual stocks also have LULD (Limit Up-Limit Down) price bands that trigger single-stock pauses. These rules are distinct from VIX levels or volume thresholds.",
      hints: [
        "Market-wide circuit breakers are tied to an index, not individual stocks — which index?",
        "What are the three percentage thresholds (Level 1, 2, 3) for US market-wide halts?",
      ],
    },
    {
      id: "q-sdi-fin-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A margin call is triggered when a trader's account equity falls below the maintenance margin requirement. Which system component should be responsible for triggering margin calls in real time?",
      options: [
        "A nightly batch job that computes end-of-day equity for all accounts",
        "The trading UI, which shows the user their current margin status",
        "An event-driven risk engine that subscribes to position and price events, computes account equity incrementally, and triggers margin calls when equity crosses the maintenance threshold",
        "The exchange's clearing house, which sends margin calls once per week",
      ],
      correctAnswer: 2,
      explanation: "Margin calls must be real-time in volatile markets — a nightly batch could allow losses to exceed account equity during the day, leaving the broker exposed. The correct architecture is an event-driven risk engine that maintains a stateful view of each account's positions and equity. On each price tick, it recomputes equity for affected accounts. When equity crosses the maintenance margin threshold, it immediately sends a margin call notification and may automatically liquidate positions if the call is not met within the defined window (typically minutes to hours). Interactive Brokers, for example, runs real-time margin monitoring and auto-liquidates without warning when margin is breached.",
      hints: [
        "If a position loses 30% in 5 minutes during a flash crash, what happens to margin requirements? When should the broker act?",
        "What kind of architecture (batch vs. event-driven) can react to price changes within seconds?",
      ],
    },
  ],

  "sdi-fin-compliance": [
    {
      id: "q-sdi-fin-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A financial institution must screen all outgoing wire transfers against the OFAC (Office of Foreign Assets Control) sanctions list in real time. Which design ensures compliance without blocking legitimate payments?",
      options: [
        "Screen transactions in a nightly batch job; block flagged transactions retroactively",
        "Hard-code the OFAC list in application code and redeploy whenever the list changes",
        "Load the sanctions list into a fast in-memory data structure (e.g., a trie or hash set); screen synchronously before payment execution with a configurable fuzzy-matching threshold; alert compliance team for manual review of near-matches",
        "Outsource screening to a third-party API called synchronously; if the API is down, skip screening",
      ],
      correctAnswer: 2,
      explanation: "OFAC compliance requires screening before the payment is executed (not retroactively). The list (~1,500 entries for SDNs plus thousands of secondary sanction entries) must be loaded into memory for sub-millisecond lookup. A trie enables prefix matching for name variations; fuzzy matching (edit distance) catches spelling variations of sanctioned party names. Near-matches are flagged for manual review rather than auto-blocked to minimize false positives. The list is updated by OFAC, so the system must support hot-reloading without restarts. Skipping screening when a third-party API is down is non-compliant and can result in severe fines (OFAC penalties can be millions per violation).",
      hints: [
        "OFAC fines can be $1M+ per violation — what does that mean for 'skip if API is down'?",
        "Why is fuzzy matching (not exact string match) important for sanctions screening?",
      ],
    },
    {
      id: "q-sdi-fin-21",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A fintech company must file Suspicious Activity Reports (SARs) with FinCEN within 30 calendar days of detecting suspicious activity. Which system design best supports this requirement?",
      options: [
        "Manual review: compliance officers manually review all transactions and file SARs in a spreadsheet",
        "A case management system that ingests alerts from fraud/AML models, assigns cases to analysts, tracks investigation status and deadlines, and generates structured SAR XML for e-filing with FinCEN",
        "Automated SAR filing for every transaction flagged by the fraud model, without human review",
        "Store all transactions in a data warehouse and query for suspicious patterns at the end of each quarter",
      ],
      correctAnswer: 1,
      explanation: "SAR filing requires a combination of automated detection and human judgment. The workflow: (1) AML models and rule engines generate alerts on suspicious patterns (structuring, layering, unusual geographic activity). (2) A case management system organizes alerts into cases, assigns them to analysts with a 30-day deadline tracker, and maintains a full audit trail of the investigation. (3) Once an analyst determines a SAR is warranted, the system generates FinCEN-compliant SAR XML (BSA E-Filing format) and submits it electronically. Pure automation without human review is non-compliant (FinCEN requires human certification of the SAR). Quarterly analysis violates the 30-day filing window.",
      hints: [
        "FinCEN requires the SAR filer to certify the report — can an automated system do this without a human?",
        "What is the risk of missing a 30-day SAR filing deadline?",
      ],
    },
    {
      id: "q-sdi-fin-22",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A digital bank must perform KYC (Know Your Customer) verification for new account openings at scale. Which pipeline is most appropriate?",
      options: [
        "Mail in physical copies of ID documents; a bank employee manually verifies them within 5 business days",
        "Accept self-reported identity information without any verification",
        "Automated pipeline: OCR extracts data from uploaded ID documents; facial biometric matching against the ID photo; identity document authenticity check via third-party API (e.g., Jumio, Onfido); risk scoring combining document authenticity, liveness check, and database cross-reference; manual review queue for borderline cases",
        "Request the customer's Social Security Number and cross-check against the SSA database only",
      ],
      correctAnswer: 2,
      explanation: "Modern digital KYC pipelines (used by Robinhood, Chime, Revolut) combine: (1) Document OCR to extract name, DOB, ID number from government-issued ID. (2) Liveness detection to prevent spoofing with a photo of a photo. (3) Facial biometric 1:1 matching between the selfie and the ID photo. (4) Document authenticity checks (security features, expiry, barcode validation) via providers like Jumio or Onfido. (5) Risk scoring incorporating device signals, IP geolocation, PEP/sanctions list cross-reference. (6) A manual review queue for cases below a confidence threshold. This achieves high automation rates (80-95% straight-through) while meeting FinCEN's CIP (Customer Identification Program) requirements under BSA.",
      hints: [
        "What is liveness detection, and why is it required in digital KYC?",
        "CIP (Customer Identification Program) requires verifying name, DOB, address, and ID number — which steps in the pipeline satisfy each requirement?",
      ],
    },
  ],

  "sdi-fin-trading-infra": [
    {
      id: "q-sdi-fin-23",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the FIX (Financial Information eXchange) protocol, and what is a FIX session heartbeat used for?",
      options: [
        "FIX is a binary proprietary protocol; heartbeats are used to encrypt messages",
        "FIX is a text-based messaging standard for electronic trading; heartbeats (HeartBeat messages, MsgType=0) are sent at regular intervals to confirm the session is alive and detect connectivity failures",
        "FIX is an HTTP-based REST API standard; heartbeats are HTTP keepalive packets",
        "FIX is a database protocol; heartbeats are used to synchronize clocks between counterparties",
      ],
      correctAnswer: 1,
      explanation: "FIX Protocol (Financial Information eXchange) is the dominant messaging standard for electronic order routing between brokers, exchanges, and buy-side institutions. It is ASCII text-based (though binary extensions like FAST/SBE exist for market data). A FIX session is a persistent TCP connection with sequence-numbered messages. HeartBeat messages (MsgType=0) are sent if no other message has been exchanged for the HeartBtInt interval (typically 30 seconds). If a counterparty does not respond to a TestRequest within the timeout, the session is considered dead and must be re-established with a Logon sequence. Gaps in received sequence numbers trigger ResendRequest for recovery.",
      hints: [
        "FIX messages look like: 8=FIX.4.2|9=...|35=D|... — what does 35=D mean?",
        "What happens if a FIX session TCP connection drops silently (no FIN packet)? How do heartbeats help?",
      ],
    },
    {
      id: "q-sdi-fin-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An algorithmic trading firm considers co-locating servers in the exchange's data center. Which latency reduction technique provides the greatest benefit for a market-making strategy that depends on reacting to order book changes?",
      options: [
        "Upgrading from 1GbE to 10GbE network interface cards in the firm's own data center",
        "Co-locating servers in the exchange's data center, reducing round-trip network latency from ~5ms to ~50-200 microseconds",
        "Switching from Python to JavaScript for the trading algorithm",
        "Using HTTP/2 instead of plain TCP for order submission",
      ],
      correctAnswer: 1,
      explanation: "Co-location (co-lo) is the single highest-impact latency optimization for market-making strategies. Trading from a remote data center incurs ~5-50ms round-trip time. Co-locating within the exchange data center reduces this to ~50-200 microseconds for the network hop, since the cable run is measured in meters rather than miles. This matters enormously for market-makers who must update quotes within microseconds of seeing a price move — being slower than a competitor means getting picked off (adverse selection). Beyond co-lo, firms invest in FPGA-based order entry (bypassing the OS entirely), microwave/millimeter-wave networks between exchanges, and kernel-bypass networking (DPDK).",
      hints: [
        "Speed-of-light through fiber is ~5µs per km — how far is a typical trading firm from the exchange?",
        "What is 'getting picked off' (adverse selection) in market-making, and how does co-location reduce it?",
      ],
    },
    {
      id: "q-sdi-fin-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Why is precise time synchronization (PTP/GPS) critical in trading systems, and what accuracy is typically required?",
      options: [
        "Time sync is needed only for log file timestamps and has no trading impact",
        "Regulators (MiFID II, FINRA) require timestamps accurate to 1 microsecond for reportable events; additionally, sequence of market data events matters for strategy correctness — microsecond clock drift can cause incorrect event ordering",
        "GPS is used for geographic routing of trade messages, not time synchronization",
        "Time accuracy of ±1 second is sufficient for all trading use cases",
      ],
      correctAnswer: 1,
      explanation: "Trading time synchronization serves two purposes: (1) Regulatory: MiFID II (EU) requires timestamps accurate to 1 microsecond (for systematic internalizers) or 100 microseconds (for trading venues) for all reportable events. FINRA requires sub-millisecond synchronization. (2) Strategy correctness: market data events from multiple exchanges must be correctly sequenced. A clock drift of even 10 microseconds can cause a strategy to believe Exchange A printed before Exchange B when the true order was reversed. PTP (Precision Time Protocol, IEEE 1588) achieves sub-microsecond accuracy on LAN; GPS-disciplined oscillators (GPSDO) provide ~10ns accuracy. NTP (Network Time Protocol) is insufficient — it provides only ~1-10ms accuracy.",
      hints: [
        "MiFID II specifies the timestamp accuracy requirement in microseconds — what is it?",
        "NTP vs PTP: which achieves sub-microsecond accuracy, and why is NTP insufficient for HFT?",
      ],
    },
  ],

  "sdi-fin-options-quant": [
    {
      id: "q-sdi-fin-26",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An options market-maker must compute Black-Scholes Greeks (delta, gamma, vega, theta) for 500,000 options contracts in real time as the underlying price changes. Which computational approach is most efficient?",
      options: [
        "Sequential Python computation of Black-Scholes for each contract on a single CPU core",
        "Vectorized SIMD computation (AVX-512) on CPU or GPU-based parallel computation using CUDA, processing thousands of contracts simultaneously with pre-computed CDF lookup tables for N(d1) and N(d2)",
        "Store precomputed Greeks in a database and query on each price change",
        "Approximate using a simple delta-only model to reduce computation",
      ],
      correctAnswer: 1,
      explanation: "Black-Scholes Greeks involve computing the normal CDF N(d1) and N(d2), which are mathematically expensive. For 500,000 contracts at tick frequency (potentially hundreds of price updates per second), sequential CPU computation is insufficient. The solution: (1) Vectorized SIMD instructions (Intel AVX-512 can process 16 floats simultaneously) or GPU parallelism (NVIDIA CUDA, processing millions of options simultaneously). (2) Pre-computed lookup tables or rational polynomial approximations for the normal CDF to avoid expensive erf() calls. (3) Incremental updates: when only the underlying price changes, only re-compute contracts on that underlying. Firms like Citadel and Jane Street use custom FPGA or GPU infrastructure for this computation.",
      hints: [
        "AVX-512 processes 16 single-precision floats in one instruction — how does that change throughput for a loop over 500,000 contracts?",
        "Which Greek changes most rapidly with the underlying price, requiring the most frequent recomputation?",
      ],
    },
    {
      id: "q-sdi-fin-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In foreign exchange (FX) trading, what is the key difference between a spot transaction and an FX swap?",
      options: [
        "Spot transactions involve options on currency pairs; FX swaps involve futures",
        "A spot transaction is the immediate exchange of currencies at the current market rate (typically settling T+2); an FX swap is a simultaneous spot purchase and forward sale (or vice versa) used to roll a position or manage funding in multiple currencies",
        "Spot transactions settle same-day; FX swaps settle in 30 years",
        "There is no difference — both terms refer to the same instrument",
      ],
      correctAnswer: 1,
      explanation: "An FX spot transaction exchanges currency pair at the current market rate with T+2 settlement (T+1 for USD/CAD). An FX swap combines a spot leg and a forward leg: you simultaneously buy EUR spot (e.g., at 1.0800) and sell EUR forward at a date in the future (e.g., at 1.0815). The difference in rates reflects the interest rate differential between the two currencies (covered interest rate parity). FX swaps are the most traded instrument in the FX market ($3.8 trillion/day per BIS 2022 survey) and are used by corporates to hedge foreign currency cash flows and by banks to manage cross-currency funding. FX forwards are single-leg; FX options give the right but not obligation.",
      hints: [
        "If you need USD today but will have EUR in 3 months, how does an FX swap solve your funding problem?",
        "The forward rate vs. spot rate difference reflects what economic principle?",
      ],
    },
  ],

  "sdi-fin-crypto-blockchain": [
    {
      id: "q-sdi-fin-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A payment system built on Ethereum must wait for transaction finality before crediting a user's account. Why is waiting for N confirmations important, and how many are typically required for high-value payments?",
      options: [
        "Confirmations are only needed for Bitcoin, not Ethereum",
        "Each confirmation represents one additional block mined on top of the transaction's block. More confirmations make it exponentially more expensive to reorganize the chain (51% attack), providing probabilistic finality; high-value payments typically require 12-35 confirmations (~3-7 minutes on Ethereum PoW, instant on PoS with finality gadgets)",
        "1 confirmation is always sufficient for any payment amount on any blockchain",
        "Confirmations are aesthetic — they don't affect transaction validity",
      ],
      correctAnswer: 1,
      explanation: "A blockchain reorganization (reorg) can reverse a transaction if a longer competing chain is broadcast. The probability of a successful reorg decreases exponentially with the number of confirmations because an attacker must redo proof-of-work for N+ blocks. For Bitcoin: 6 confirmations (~60 minutes) is conventional for high-value transfers. For Ethereum (post-Merge PoS): the finality gadget (Casper FFG) provides economic finality after 2 epochs (~12.8 minutes); before that, the transaction is in a 'safe' state after a few slots. Exchanges like Coinbase and Kraken require 35 Ethereum confirmations (pre-Merge) for large deposits. Post-Merge, Ethereum finality is much faster due to the BFT-based finality gadget.",
      hints: [
        "What happens to a transaction in block N if a miner broadcasts a longer chain that doesn't include that block?",
        "How does proof-of-stake finality (Casper FFG) differ from proof-of-work probabilistic finality?",
      ],
    },
    {
      id: "q-sdi-fin-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A crypto exchange must monitor the Bitcoin mempool to prioritize transaction inclusion and set appropriate fee rates for its hot wallet withdrawals. Which approach is most effective?",
      options: [
        "Always pay the maximum possible fee to guarantee inclusion in the next block",
        "Run a full Bitcoin node, subscribe to mempool events, compute a fee rate distribution histogram of pending transactions, and set withdrawal fees dynamically at the 50th-90th percentile of current mempool fees based on desired confirmation target",
        "Pay a fixed fee of 1 satoshi/byte regardless of mempool congestion",
        "Use a third-party block explorer API to check the last confirmed transaction fee and use that rate",
      ],
      correctAnswer: 1,
      explanation: "Effective Bitcoin fee management requires real-time mempool visibility. Running a full node provides direct access to the local mempool (thousands of unconfirmed transactions with their fee rates in sat/vByte). By computing the fee distribution, the exchange can choose a fee rate at the Nth percentile to target inclusion within M blocks. During congestion (e.g., ordinal inscription storms), fees can spike 100x — paying a fixed rate leaves withdrawals stuck for hours. Paying the maximum wastes user funds during low-congestion periods. Third-party APIs introduce latency and single-point-of-failure dependency. Fee estimation APIs like mempool.space provide good heuristics, but a full node gives full control and lower latency.",
      hints: [
        "Bitcoin miners include transactions in descending fee-rate order (sat/vByte). Where in that ordering does your transaction need to be for next-block inclusion?",
        "What happened to Bitcoin fees during the Ordinals/BRC-20 inscription boom in 2023?",
      ],
    },
  ],

  "sdi-fin-audit-dr": [
    {
      id: "q-sdi-fin-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A financial system must maintain a tamper-evident audit trail of all transactions for regulatory access. Which storage design best satisfies immutability and detectability of tampering?",
      options: [
        "Append events to a standard relational database table with an updated_at timestamp",
        "Store events in an append-only log with cryptographic hash chaining: each entry includes a SHA-256 hash of (event_data || previous_entry_hash), forming a linked chain; periodic anchoring of the chain root to an immutable external store (e.g., blockchain or write-once S3) for independent verification",
        "Write events to a regular file on the application server's local disk",
        "Store events in MongoDB with a unique index on event_id",
      ],
      correctAnswer: 1,
      explanation: "Cryptographic hash chaining is the standard technique for tamper-evident logs (used in blockchain, certificate transparency logs, and regulatory audit systems). Each log entry's hash depends on the previous entry's hash, forming a chain where any modification of a historical record invalidates all subsequent hashes. Periodic anchoring of the chain root hash to an external immutable store (an S3 Object Lock bucket, a public blockchain, or a trusted timestamping authority per RFC 3161) allows independent verification that the log has not been altered since the anchor point. This design is used by AWS QLDB (Quantum Ledger Database), certificate transparency logs (RFC 9162), and regulatory-grade audit systems. A relational database with mutable rows provides no tamper evidence.",
      hints: [
        "If you change entry #1000, what happens to the hash of entry #1001 and all subsequent entries?",
        "What does 'anchoring the chain root' to an external store add beyond the chain itself?",
      ],
    },
    {
      id: "q-sdi-fin-31",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A trading firm's core systems must meet RTO (Recovery Time Objective) of 15 minutes and RPO (Recovery Point Objective) of zero data loss after a data center failure. Which disaster recovery architecture achieves this?",
      options: [
        "Daily tape backups stored offsite; restore from tape on failure (RTO ~hours, RPO ~24 hours)",
        "Cold standby in a second data center: provision servers only when primary fails (RTO ~hours)",
        "Warm standby: a secondary data center continuously receives synchronous database replication; upon failure, a health-check failover script promotes the secondary within minutes; position state is replicated without lag",
        "Active-active: both data centers process trades simultaneously with conflict resolution; automatic DNS failover on failure",
      ],
      correctAnswer: 2,
      explanation: "For RPO=0 (zero data loss), synchronous replication is required — data is written to both primary and standby before the write is acknowledged. This rules out asynchronous replication (RPO > 0) and backups (RPO = hours). For RTO=15 minutes, the standby must be warm (infrastructure already running, database already populated) so promotion is a fast configuration change rather than provisioning. Active-active sounds appealing but introduces split-brain risk in trading systems — concurrent position updates from two sites can cause duplicate orders or inconsistent position state, which is catastrophic. Warm standby with synchronous replication (as used in PostgreSQL streaming replication with synchronous_commit=remote_apply) achieves both RPO=0 and RTO=15 minutes. Regulatory bodies (SEC, FINRA, FCA) mandate business continuity plans with specific RTO/RPO requirements for financial firms.",
      hints: [
        "Synchronous vs. asynchronous replication: which guarantees RPO=0, and what is the latency trade-off?",
        "Why is active-active dangerous for trading systems specifically (hint: think about order routing and position state)?",
      ],
    },
  ],

  "sdi-fin-reconciliation": [
    {
      id: "q-sdi-fin-32",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A brokerage must reconcile its internal position records against the custodian's records at end-of-day. Which approach best detects and classifies breaks (discrepancies)?",
      options: [
        "Manually compare spreadsheet exports from both systems; email discrepancies to the operations team",
        "An automated reconciliation engine that: (1) ingests positions from both sources, (2) matches records by account+symbol+settle date, (3) computes the difference for each matched pair, (4) classifies unmatched records as breaks, (5) routes breaks to a workflow system with severity tiers and SLA-based escalation",
        "Trust the custodian's records and override internal records on any discrepancy",
        "Run reconciliation once per week to reduce operational costs",
      ],
      correctAnswer: 1,
      explanation: "End-of-day reconciliation is a regulatory requirement for broker-dealers (SEC Rule 15c3-3, the Customer Protection Rule). An automated reconciliation engine processes two data feeds (internal OMS and custodian file, typically in FTP/SFTP CSV or ISO 20022 format), matches position records by key (account, CUSIP/ISIN, settlement date), and computes quantity and value differences. Breaks are classified by severity (small quantity rounding errors vs. large unexplained differences) and routed to operations staff with automated escalation if unresolved within the SLA window (typically 24 hours for reconciliation breaks). Manual spreadsheet reconciliation is error-prone and does not scale for thousands of accounts and hundreds of instruments. Weekly reconciliation violates daily reporting requirements.",
      hints: [
        "SEC Rule 15c3-3 (Customer Protection Rule) requires daily reconciliation of customer positions — why daily, not weekly?",
        "What is a 'break' in reconciliation terminology, and how do you classify its severity?",
      ],
    },
    {
      id: "q-sdi-fin-33",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A wire transfer system using RTGS (Real-Time Gross Settlement) fails to deliver due to a transient network error. Which retry design prevents both lost transfers and duplicate transfers?",
      options: [
        "Retry indefinitely with no deduplication — the receiving bank will reject duplicates",
        "Do not retry; require the sender to manually reinitiate the transfer if it fails",
        "Assign a globally unique payment ID before submission; on retry, include the same payment ID; the RTGS system (or receiving bank) uses the payment ID as an idempotency key to deduplicate; use exponential backoff with a maximum retry window matching the transfer's SLA",
        "Retry immediately 100 times in rapid succession until the transfer succeeds",
      ],
      correctAnswer: 2,
      explanation: "Wire transfer retry logic must address two failure modes: (1) The transfer was never received — retry is required. (2) The transfer was received and processed but the acknowledgment was lost — retry would create a duplicate. The solution is an idempotent payment ID assigned before the first attempt. Every retry carries the same payment ID. The RTGS system or receiving bank maintains a deduplication log: if a payment ID is already processed, return the original result without reprocessing. Exponential backoff (e.g., 1s, 2s, 4s, 8s...) avoids thundering-herd during outages. A maximum retry window (e.g., 24 hours) aligns with the transfer's SLA. This pattern is implemented by Fedwire, SWIFT GPI, and modern payment processors.",
      hints: [
        "How does the receiver distinguish 'I never got this' from 'I got this but the ACK was lost'?",
        "SWIFT GPI introduced an end-to-end unique transaction reference (UETR) for exactly this purpose — what does UETR stand for?",
      ],
    },
  ],
};

registerQuestions(questions);
