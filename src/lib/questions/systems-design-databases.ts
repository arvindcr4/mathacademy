import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-db-cap-theorem": [
    {
      id: "q-sdi-db-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "According to the CAP theorem, which two properties can a distributed system fully guarantee simultaneously during a network partition?",
      options: ["Consistency and Availability", "Consistency and Partition Tolerance", "Availability and Partition Tolerance", "All three: Consistency, Availability, and Partition Tolerance"],
      correctAnswer: 1,
      explanation: "The CAP theorem states that a distributed system can guarantee at most two of three properties: Consistency (C), Availability (A), and Partition Tolerance (P).\n\n**Step 1.** Partition tolerance means the system continues operating even when network partitions (communication breakdowns between nodes) occur. Since network partitions are unavoidable in real systems, partition tolerance is non-negotiable.\n\n**Step 2.** This means the real design choice is always between Consistency and Availability. A CP system (e.g., ZooKeeper, HBase) chooses consistency and rejects requests during a partition. An AP system (e.g., Cassandra, DynamoDB) chooses availability and may return stale data.\n\n**Step 3.** You can never simultaneously guarantee all three — hence the correct pair is Consistency and Partition Tolerance.",
      hints: [
        "Network partitions are considered an unavoidable reality in distributed systems — can you guarantee both C and A when nodes cannot communicate?",
        "Think about what happens when two nodes cannot communicate: must the system reject requests (favoring consistency) or serve potentially stale data (favoring availability)?",
      ],
    },
    {
      id: "q-sdi-db-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which of the following databases is classified as an AP system under the CAP theorem?",
      options: ["ZooKeeper", "HBase", "Apache Cassandra", "PostgreSQL (single-node)"],
      correctAnswer: 2,
      explanation: "Under the CAP theorem, databases are classified by which two of the three guarantees they prioritize.\n\n**Step 1.** Apache Cassandra is designed as an AP (Availability + Partition Tolerance) system. During a network partition, it continues accepting reads and writes on every node, even if some nodes cannot communicate — it may return stale data to maintain availability.\n\n**Step 2.** ZooKeeper and HBase are CP (Consistency + Partition Tolerance) systems. They will reject requests or delay responses during a partition to preserve strong consistency guarantees.\n\n**Step 3.** PostgreSQL is a single-node relational database — the CAP theorem applies to distributed systems, not single-node deployments.",
      hints: [
        "AP systems serve requests even when some nodes are unreachable, accepting the risk of stale reads.",
        "ZooKeeper is commonly used as a coordination service that requires strong consistency — which CAP category does that suggest?",
      ],
    },
    {
      id: "q-sdi-db-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The PACELC model extends CAP by adding a tradeoff that applies even when the network is healthy (no partition). What is that tradeoff?",
      options: ["Performance vs Correctness", "Latency vs Consistency", "Availability vs Partition Tolerance", "Throughput vs Durability"],
      correctAnswer: 1,
      explanation: "PACELC (Partition-Availability-Consistency-Else-Latency-Consistency) was proposed by Daniel Abadi to address a gap in the CAP theorem.\n\n**Step 1.** CAP only describes the tradeoff during a network partition. PACELC adds: what happens when the network is healthy and there is no partition?\n\n**Step 2.** The Else clause states: when operating normally, a system must choose between Latency (L) and Consistency (C). Strong consistency requires coordination (e.g., quorum reads), which adds network round-trips and increases latency.\n\n**Step 3.** Example: DynamoDB is PA/EL — it favors availability during partitions and low latency during normal operation, at the cost of consistency in both cases.",
      hints: [
        "PACELC asks: even on a perfect network, can you always read your own writes instantly without coordination overhead?",
        "Achieving strong consistency during normal operation requires coordination (e.g., quorum reads), which inherently adds latency.",
      ],
    },
    {
      id: "q-sdi-db-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the key distinction between linearizability and serializability?",
      options: ["Linearizability applies to transactions; serializability applies to single operations", "Linearizability applies to single operations with real-time ordering; serializability applies to multi-operation transactions with logical ordering", "Linearizability is weaker than serializability", "They are equivalent; both guarantee the same consistency level"],
      correctAnswer: 1,
      explanation: "Linearizability and serializability are both consistency models but apply at different scopes.\n\n**Step 1.** Linearizability (also called atomic consistency) is a per-operation guarantee: every operation appears to take effect instantaneously at some point between its invocation and completion, and these instants respect real-time (wall-clock) ordering. If operation A finishes before operation B starts, A must appear before B.\n\n**Step 2.** Serializability is a per-transaction guarantee: the result of executing concurrent transactions is equivalent to some serial (one-after-another) execution of those transactions. It concerns logical ordering, not real-time ordering.\n\n**Step 3.** Strict serializability combines both: transactions are serializable AND linearizable, providing the strongest consistency guarantee.",
      hints: [
        "Linearizability cares about wall-clock time — an operation that finishes before another starts must appear before it in the final state.",
        "Serializability is about transactions (groups of operations) and their logical ordering, not necessarily their real-time ordering.",
      ],
    },
  ],

  "sdi-db-sharding": [
    {
      id: "q-sdi-db-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which sharding strategy distributes data by applying a hash function to the shard key, producing roughly uniform distribution but making range queries inefficient?",
      options: ["Range-based sharding", "Hash-based sharding", "Directory-based sharding", "Geographic sharding"],
      correctAnswer: 1,
      explanation: "Hash-based sharding is a common strategy for distributing data across shards.\n\n**Step 1.** A hash function (e.g., MD5, MurmurHash) is applied to the shard key. The hash output (or a modulo of it) determines which shard owns that key. This distributes keys roughly uniformly across shards, naturally avoiding hot spots.\n\n**Step 2.** The critical downside: hash functions destroy the sorted order of keys. Adjacent keys in the domain hash to entirely different shards. A range query like \"users with IDs 1000–2000\" must fan out to every shard to collect results.\n\n**Step 3.** By contrast, range-based sharding preserves key ordering, enabling efficient range scans but risking hot spots on monotonically increasing keys (e.g., timestamps or auto-increment IDs).",
      hints: [
        "Think about what happens to the sorted order of keys after applying a hash function — are adjacent keys still stored near each other?",
        "If you need to query 'all orders placed this week', hash-based sharding would require hitting every shard because adjacent keys are scattered randomly.",
      ],
    },
    {
      id: "q-sdi-db-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In consistent hashing, why are virtual nodes (vnodes) used?",
      options: ["To reduce the number of physical servers needed", "To improve load balance by giving each physical node multiple positions on the hash ring", "To enable range queries across shards", "To avoid the need for a separate routing layer"],
      correctAnswer: 1,
      explanation: "Virtual nodes (vnodes) address a fundamental load-balance problem in basic consistent hashing.\n\n**Step 1.** In basic consistent hashing, each physical node occupies one position on the hash ring. With only a few nodes, the arc lengths (proportional to data load) can be highly unequal — some servers handle far more data than others.\n\n**Step 2.** Virtual nodes give each physical server multiple positions on the hash ring (e.g., 150 vnodes per physical node). The key space is subdivided more finely, producing much more uniform load distribution across physical servers.\n\n**Step 3.** When a node is added or removed, its vnodes are redistributed to many different neighbors rather than one. This prevents any single receiver from being overwhelmed during node churn.",
      hints: [
        "Without virtual nodes, one physical server might own a large arc of the ring and receive disproportionate traffic — why does that happen with few nodes?",
        "With virtual nodes, the key space is subdivided more finely, so adding/removing a server affects many small segments spread around the ring.",
      ],
    },
    {
      id: "q-sdi-db-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the primary problem with using Two-Phase Commit (2PC) for cross-shard transactions?",
      options: ["It requires all shards to use the same database engine", "The coordinator can fail after the prepare phase but before sending commit, leaving participants in a blocking uncertain state", "It does not support rollback", "It cannot handle more than two shards"],
      correctAnswer: 1,
      explanation: "Two-Phase Commit (2PC) has a fundamental blocking problem that makes it risky for distributed transactions.\n\n**Step 1.** In 2PC, the coordinator first sends a Prepare message to all participants. Each participant votes Yes (and durably logs the prepared state, locking resources) or No. If all vote Yes, the coordinator logs its commit decision and sends Commit to all participants.\n\n**Step 2.** The blocking problem: if the coordinator crashes after participants have voted Yes and logged the prepared state, but before the commit decision reaches all participants, those participants are stuck. They have locked resources and cannot independently decide to commit (risk inconsistency) or abort (risk violating atomicity if the coordinator decided Commit).\n\n**Step 3.** They must wait for the coordinator to recover — a slow or crashed coordinator stalls all participants indefinitely. Alternatives include 3PC, Paxos/Raft-based commit, or the Saga pattern.",
      hints: [
        "Participants in the prepared state have locked rows and are waiting for the coordinator's decision — what happens if the coordinator never responds?",
        "The Saga pattern avoids 2PC blocking by breaking a distributed transaction into a sequence of local transactions with compensating rollback actions.",
      ],
    },
    {
      id: "q-sdi-db-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "During a resharding migration, what technique prevents data loss or serving stale data while routing is updated?",
      options: ["Stop all writes during migration (maintenance window)", "Double-write to both old and new shards during migration, then switch reads to the new shard", "Use a read replica of the old shard as the new shard", "Delete data from the old shard before copying to the new shard"],
      correctAnswer: 1,
      explanation: "Double-write (also called dual-write) is the standard online resharding technique that avoids downtime.\n\n**Step 1.** During migration, every write is sent to both the old shard and the new shard simultaneously. A background job also copies existing data from the old shard to the new shard (the backfill phase).\n\n**Step 2.** Once the backfill is complete and the new shard is confirmed consistent with the old shard, reads are atomically switched to the new shard. Double-writing is then stopped.\n\n**Step 3.** This ensures zero data loss (all writes are captured on the new shard) and no stale reads (the switchover is atomic). No maintenance window is required. Tools like Vitess and AWS DMS use variants of this pattern.",
      hints: [
        "A maintenance window (stopping all writes) is the simplest but least available approach — what can be done to keep serving traffic during the migration?",
        "Writing to both shards simultaneously means the new shard is always at most slightly behind the old shard, preventing data loss.",
      ],
    },
  ],

  "sdi-db-replication": [
    {
      id: "q-sdi-db-9",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In master-slave (primary-replica) replication, what problem does 'read-after-write consistency' solve?",
      options: ["It ensures replicas never return stale data to any user", "It ensures a user always reads their own recent writes, even when reads are served from replicas", "It guarantees that all replicas are always fully synchronized with the primary", "It prevents the primary from accepting writes during replication lag"],
      correctAnswer: 1,
      explanation: "Read-after-write consistency (also called read-your-writes) addresses a specific consistency problem in replicated systems.\n\n**Step 1.** Replication lag means a replica may not yet have applied recent writes from the primary. If a user writes data and immediately reads from a replica, they might see stale data — or worse, not see their own write at all.\n\n**Step 2.** Read-after-write consistency guarantees that a user will always see their own most recent writes, even if their read request is routed to a lagging replica.\n\n**Step 3.** Implementation approaches: route the user's reads to the primary for a short window after a write, or track the write's LSN/timestamp and wait for the replica to catch up before serving the read.",
      hints: [
        "Imagine posting a comment and immediately refreshing the page — only to not see your own comment. What consistency guarantee is violated?",
        "The fix doesn't require all users to read from the primary — only users who recently performed a write need their reads routed to the primary.",
      ],
    },
    {
      id: "q-sdi-db-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the tradeoff between synchronous and asynchronous replication?",
      options: ["Synchronous is faster but loses data on failure; asynchronous is slower but guarantees durability", "Synchronous guarantees zero data loss but adds write latency; asynchronous is faster but risks losing committed data if the primary fails before replicas apply the write", "Synchronous replication requires more disk space; asynchronous requires more CPU", "There is no meaningful difference in production workloads"],
      correctAnswer: 1,
      explanation: "Synchronous and asynchronous replication represent a fundamental durability-vs-latency tradeoff.\n\n**Step 1.** With synchronous replication, the primary waits for at least one replica to confirm it has durably written the data before acknowledging the write to the client. This adds a network round-trip to every write, increasing latency.\n\n**Step 2.** In exchange, synchronous replication guarantees zero data loss: if the primary fails, at least one replica has a complete copy of all committed data.\n\n**Step 3.** With asynchronous replication, the primary acknowledges the write immediately and replicates in the background. This minimizes write latency but risks data loss: if the primary crashes before the replica receives the write, that data is lost when the replica becomes the new primary.\n\nSemi-synchronous replication (e.g., MySQL) requires exactly one replica to confirm, balancing both concerns.",
      hints: [
        "Think about the order of operations: does the primary wait for replica confirmation before responding to the client?",
        "In a failover scenario, if the primary had unflushed writes that replicas never received, those writes disappear — which replication mode prevents this?",
      ],
    },
    {
      id: "q-sdi-db-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is a fencing token and why is it needed in leader election?",
      options: ["A network firewall rule that prevents old leaders from receiving writes", "A monotonically increasing number issued by the lock service; storage nodes reject requests with a token lower than the highest seen, preventing stale leaders from making writes", "A checksum used to verify replication log integrity", "A TTL-based lease that automatically expires old leader credentials"],
      correctAnswer: 1,
      explanation: "Fencing tokens solve the split-brain problem that can occur after leader election.\n\n**Step 1.** After a leader election, the old leader may not know it was deposed — due to a GC pause, network hiccup, or clock skew — and still believe it is the leader. This is split-brain: two nodes both think they are the leader.\n\n**Step 2.** A fencing token is a monotonically increasing integer issued by the lock/coordination service (e.g., ZooKeeper) each time a new leader is elected. Every write request to storage must carry the current fencing token.\n\n**Step 3.** Storage nodes track the highest token seen and reject any request with a token lower than or equal to the highest seen. This authoritatively prevents a stale leader's writes from being accepted, even if the old leader has not yet noticed its demotion.",
      hints: [
        "A process can be paused for minutes (GC pause, VM migration) and wake up thinking it still holds a lock that has since expired and been re-granted to another process.",
        "If every write carries a monotonically increasing token, the storage layer can definitively detect and reject writes from an out-of-date leader.",
      ],
    },
    {
      id: "q-sdi-db-12",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In multi-master replication, two nodes concurrently update the same record. The system uses Last-Write-Wins (LWW) to resolve the conflict. What is a significant risk of LWW?",
      options: ["LWW requires expensive consensus among all nodes", "LWW can silently discard a causally later write if clocks are skewed, leading to data loss", "LWW is too slow for high-throughput write workloads", "LWW requires all nodes to be in the same data center"],
      correctAnswer: 1,
      explanation: "Last-Write-Wins uses wall-clock timestamps to decide conflict resolution, which introduces clock-synchronization risks.\n\n**Step 1.** LWW selects the write with the highest timestamp as the winner. The problem: wall clocks are not perfectly synchronized across machines. NTP can have millisecond-level skew between servers.\n\n**Step 2.** Consider a write on Node A at wall-clock time t=100ms and a concurrent write on Node B at t=99ms. Causally, B's write may have happened after A's — but LWW will keep B's write and discard A's, silently losing data.\n\n**Step 3.** Systems like Cassandra use LWW by default, accepting this trade-off. Alternatives include vector clocks (which track causal history to detect true ordering) and CRDTs (data structures that provably merge without conflict).",
      hints: [
        "If two servers' clocks differ by just 1 millisecond, the 'later' timestamp might actually belong to a write that happened causally earlier.",
        "Vector clocks can distinguish between concurrent writes and causally ordered writes, enabling smarter conflict resolution than timestamp-based LWW.",
      ],
    },
  ],

  "sdi-db-transactions": [
    {
      id: "q-sdi-db-13",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which ACID property ensures that a transaction either completes fully or has no effect at all - there is no partial update?",
      options: ["Consistency", "Isolation", "Durability", "Atomicity"],
      correctAnswer: 3,
      explanation: "Atomicity is the ACID property that guarantees all-or-nothing transaction execution.\n\n**Step 1.** Atomicity means a transaction is treated as an indivisible unit. Either all of its operations succeed and are committed, or — if any operation fails — all changes are rolled back and the database is left as if the transaction never started.\n\n**Step 2.** This prevents partial updates, such as debiting one account in a bank transfer without crediting the other. Without atomicity, a failed mid-transaction would leave the system in an inconsistent state.\n\n**Step 3.** Atomicity is implemented via write-ahead logging (WAL): before any page is modified, the intended change is recorded in a log. If a transaction fails, the log is used to undo the changes.",
      hints: [
        "Think of 'atom' — the smallest indivisible unit in chemistry. A transaction is indivisible: it either happens completely or not at all.",
        "In a bank transfer, both the debit and credit must succeed together, or neither should happen — which property enforces this?",
      ],
    },
    {
      id: "q-sdi-db-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which isolation level prevents dirty reads and non-repeatable reads, but still allows phantom reads?",
      options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      correctAnswer: 2,
      explanation: "Repeatable Read is an isolation level that locks rows but not query predicate ranges.\n\n**Step 1.** Repeatable Read prevents dirty reads (reading uncommitted data) and non-repeatable reads (the same row returning different data within a transaction). It achieves this by locking the rows a transaction reads.\n\n**Step 2.** However, Repeatable Read does not lock the set of rows matching a query predicate. Another transaction can INSERT new rows that satisfy your WHERE clause — these phantom rows will appear in subsequent range queries within your transaction.\n\n**Step 3.** Serializable (the highest isolation level) prevents phantoms by locking the predicate range itself, ensuring no new rows matching the predicate can be inserted until the transaction completes.",
      hints: [
        "A non-repeatable read: you read row X, another transaction updates row X and commits, you read row X again and see different data.",
        "A phantom read: you query 'SELECT COUNT(*) WHERE salary > 100k', another transaction inserts a high-salary row, you run the same query and get a different count.",
      ],
    },
    {
      id: "q-sdi-db-15",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How does MVCC (Multi-Version Concurrency Control) allow readers and writers to not block each other?",
      options: ["MVCC uses a separate in-memory buffer so reads never touch disk", "MVCC keeps multiple timestamped versions of each row; readers see a consistent snapshot of old versions while writers create new versions, eliminating read-write lock contention", "MVCC serializes all transactions into a single queue so conflicts are impossible", "MVCC replicates each row to a read replica so readers go to the replica and writers go to the primary"],
      correctAnswer: 1,
      explanation: "MVCC enables high-concurrency by maintaining multiple row versions instead of overwriting in place.\n\n**Step 1.** In MVCC (used by PostgreSQL, MySQL InnoDB, Oracle), each row update creates a new version tagged with a transaction ID (xmin). The old version is marked with an expiration (xmax). Old versions are retained in the table.\n\n**Step 2.** When a transaction starts, it receives a snapshot ID and sees only row versions that were committed before its snapshot started. Readers access old versions without acquiring locks; writers create new versions without blocking readers.\n\n**Step 3.** The tradeoff: old row versions accumulate over time and must be periodically cleaned up. PostgreSQL uses the VACUUM process for this. This design enables high concurrency without read-write lock contention.",
      hints: [
        "Instead of overwriting data in place, MVCC keeps the old version around for readers that started before the write — what does this mean for readers and writers?",
        "The 'snapshot' at transaction start defines which version of each row you see throughout the transaction — does a writer creating a new version block readers of the old version?",
      ],
    },
    {
      id: "q-sdi-db-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In Two-Phase Commit (2PC), what is the 'uncertain period' and why is it problematic?",
      options: ["The time between client request and coordinator receiving it, causing latency uncertainty", "The window after a coordinator crashes post-prepare but pre-commit, during which participants have locked resources but cannot safely commit or abort without coordinator recovery", "The time replicas take to catch up after a commit, causing temporary inconsistency", "The delay between issuing a read and receiving a response across shards"],
      correctAnswer: 1,
      explanation: "The uncertain period is 2PC's most critical flaw — a window where participants are blocked with no way to proceed.\n\n**Step 1.** In 2PC's prepare phase, each participant votes Yes and durably logs the prepared state, which locks the relevant resources. The coordinator then decides Commit or Abort and logs this decision.\n\n**Step 2.** If the coordinator crashes after logging its decision but before sending the decision to all participants, those participants enter the uncertain period. They have voted Yes, locked resources, and cannot safely unilaterally commit (risk inconsistency) or abort (risk violating atomicity if the coordinator decided Commit).\n\n**Step 3.** They must wait for the coordinator to recover. This blocking nature means a slow or crashed coordinator stalls all participants — a fundamental limitation of 2PC.",
      hints: [
        "Participants have already said 'I'm ready to commit' and locked their resources — they cannot simply decide on their own without risking inconsistency.",
        "The coordinator's decision is the single source of truth in 2PC, which is why its failure is so disruptive.",
      ],
    },
  ],

  "sdi-db-nosql-types": [
    {
      id: "q-sdi-db-17",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which NoSQL database type stores data as JSON-like documents with flexible schema, making it well-suited for product catalogs and user profiles?",
      options: ["Key-Value store", "Column-family store", "Document store", "Graph database"],
      correctAnswer: 2,
      explanation: "Document stores are designed for semi-structured data with variable attributes.\n\n**Step 1.** Document stores (e.g., MongoDB, Firestore, CouchDB) store data as semi-structured documents — JSON, BSON, or XML. Each document can have different fields; there is no fixed schema across documents.\n\n**Step 2.** This schema flexibility is ideal for entities with variable attributes. A product catalog is a perfect example: a book has an ISBN and author; a TV has a resolution and refresh rate. These cannot easily share a fixed relational schema but fit naturally in a document store.\n\n**Step 3.** Documents can contain nested arrays and sub-documents, allowing rich data structures to be retrieved in a single query. Indexes can be created on any field within documents.",
      hints: [
        "Think of a product catalog: a book has an ISBN and author; a TV has a resolution and refresh rate. They cannot easily share a fixed schema — which database type handles this naturally?",
        "This database type maps naturally to the JSON objects your application code works with — no impedance mismatch between app and database.",
      ],
    },
    {
      id: "q-sdi-db-18",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Cassandra (a column-family / wide-column store), the data model is said to be 'query-driven' rather than 'entity-driven'. What does this mean?",
      options: ["Cassandra auto-generates query plans, so schema design does not matter", "You design your tables around the specific queries your application will run, denormalizing data and duplicating it across tables if necessary to avoid slow scatter-gather queries", "Cassandra uses a SQL-like query language identical to relational databases", "Column families automatically normalize data to eliminate redundancy"],
      correctAnswer: 1,
      explanation: "Cassandra's query-driven design reflects the constraints of its distributed, joinless architecture.\n\n**Step 1.** Cassandra does not support server-side joins or ad-hoc secondary index queries at scale. The partition key determines which node stores the data, and the clustering key determines sort order within a partition.\n\n**Step 2.** To efficiently answer a query, data must be pre-arranged in a single partition. This means you create one table per query pattern, accepting data duplication across tables.\n\n**Step 3.** For example, to support 'messages by user' and 'messages by room', you maintain two separate tables with the same message data partitioned differently. This is denormalization by design, not by accident.",
      hints: [
        "Cassandra has no server-side joins — all joins must happen in the application layer or be pre-joined at write time. What does this mean for schema design?",
        "If you need to look up orders by user ID and also by order date, you may need two separate Cassandra tables with duplicated data.",
      ],
    },
    {
      id: "q-sdi-db-19",
      type: "true-false",
      difficulty: "easy",
      question: "Key-value stores like Redis natively support efficient secondary index queries (e.g., 'find all users with age > 30') without any additional infrastructure.",
      correctAnswer: "False",
      explanation: "Key-value stores are optimized for single-key operations, not arbitrary attribute queries.\n\n**Step 1.** Key-value stores provide O(1) get/put operations by primary key only. There is no built-in mechanism to query by arbitrary attributes — the fundamental design is optimized for primary-key lookup.\n\n**Step 2.** To support secondary index queries in Redis, you must manually maintain additional data structures. For example, sorted sets can encode range indexes (e.g., ZADD users:age 30 user_id), but this is application-managed, not automatic.\n\n**Step 3.** For full-featured secondary indexing, an external search layer like Elasticsearch is typically required. DynamoDB similarly requires explicit Global Secondary Indexes (GSIs) — separate index tables you create and pay for.",
      hints: [
        "The defining feature of a key-value store is O(1) lookup by key. What happens to that guarantee if you need to scan by a non-key attribute?",
        "Redis sorted sets are an explicit data structure you manage manually — not automatic secondary indexing built into the database.",
      ],
    },
    {
      id: "q-sdi-db-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Why are graph databases like Neo4j or Amazon Neptune significantly more efficient than relational databases for multi-hop traversal queries (e.g., 'friends of friends of friends')?",
      options: ["Graph databases use faster hardware than relational databases", "Graph databases store edges as direct physical pointers, making each hop O(1) regardless of graph size, while SQL joins require O(n) index lookups per hop", "Graph databases replicate data more aggressively, reducing read latency", "Graph databases avoid network I/O by storing everything in RAM"],
      correctAnswer: 1,
      explanation: "Graph databases use index-free adjacency to achieve O(1) per-hop traversal, unlike SQL's O(n) joins.\n\n**Step 1.** In a relational database, a multi-hop traversal requires multiple JOIN operations. Each JOIN scans an index of size O(n) where n is the number of rows in the relationship table. With millions of users, these joins become very expensive.\n\n**Step 2.** Graph databases use index-free adjacency: each node directly stores pointers (adjacency list) to its neighboring nodes. Traversing one hop follows a pointer in O(1) time, regardless of total graph size.\n\n**Step 3.** The cost of traversal scales with the number of edges traversed, not the total size of the graph. This makes graph databases orders of magnitude faster for connected data queries like social networks or recommendation engines.",
      hints: [
        "In SQL, finding 'friends of friends' requires full index scans at each hop — how does this scale with millions of users?",
        "Graph databases store the adjacency list directly on each node, so following an edge is a pointer dereference, not an index lookup.",
      ],
    },
  ],

  "sdi-db-storage-engines": [
    {
      id: "q-sdi-db-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "B-tree storage engines (used in PostgreSQL and MySQL InnoDB) update data in-place. What problem does this cause under heavy random write workloads?",
      options: ["B-trees cannot support transactions under heavy writes", "In-place updates cause frequent page splits and random I/O, as modified pages must be flushed to their fixed disk locations, which is expensive on spinning disks and causes write amplification", "B-trees require a full table scan for every write", "B-trees cannot store variable-length values"],
      correctAnswer: 1,
      explanation: "B-trees' in-place update model creates performance problems under random write workloads.\n\n**Step 1.** B-trees maintain sorted pages on disk. When a page is full and a new key must be inserted, the page splits into two and the parent page must be updated — potentially propagating all the way up the tree. Each page split requires writing multiple disk pages.\n\n**Step 2.** These page splits cause random writes to multiple disk locations. On spinning HDDs, random I/O is orders of magnitude slower than sequential I/O. On SSDs, frequent in-place updates cause write amplification: each logical write triggers multiple physical writes due to the SSD's flash translation layer and garbage collection.\n\n**Step 3.** LSM trees address this by converting random writes to sequential writes via the MemTable and SSTable compaction pipeline, achieving better write throughput under heavy random write workloads.",
      hints: [
        "Consider the difference between writing to a sequential log (easy, fast) vs. updating a specific location in a large sorted file (hard, slow).",
        "Page splits require writing to multiple disk pages — the split page, the new page, and the parent pointer — in non-sequential locations.",
      ],
    },
    {
      id: "q-sdi-db-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In an LSM-tree storage engine (e.g., RocksDB, Cassandra), what is the role of a Bloom filter?",
      options: ["A Bloom filter compresses SSTables to reduce disk usage", "A Bloom filter quickly determines whether a key is definitely NOT in a given SSTable, avoiding unnecessary disk reads during lookups", "A Bloom filter sorts keys within an SSTable for binary search", "A Bloom filter tracks which keys have been deleted (tombstones)"],
      correctAnswer: 1,
      explanation: "Bloom filters are probabilistic structures that dramatically reduce read amplification in LSM trees.\n\n**Step 1.** LSM trees store data in multiple levels of SSTables on disk. A point lookup must potentially check every SSTable from newest to oldest — this is read amplification.\n\n**Step 2.** Each SSTable has an associated Bloom filter in memory. Before reading an SSTable from disk, the engine checks its Bloom filter. A negative result (key definitely not present) skips the SSTable entirely with zero disk I/O. A positive result (key might be present) triggers a disk read.\n\n**Step 3.** Bloom filters have zero false negatives (they never say 'not present' when the key is there) but a small configurable false positive rate. This enables dramatic reductions in read amplification.",
      hints: [
        "LSM trees have excellent write performance but poor read performance — you might need to check many SSTables for one key. What could quickly eliminate most of those checks?",
        "A Bloom filter can tell you 'this key is definitely not here' with 100% accuracy, saving a disk read, but can occasionally say 'maybe here' when the key is actually absent.",
      ],
    },
    {
      id: "q-sdi-db-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is 'write amplification' in the context of storage engines, and why is it particularly high for LSM trees?",
      options: ["Write amplification is the ratio of bytes written to disk vs bytes written by the application; LSM trees have high write amplification because compaction rewrites data multiple times as SSTables are merged across levels", "Write amplification means a single client write triggers writes to multiple replicas; LSM trees replicate more aggressively", "Write amplification refers to the WAL log size; LSM trees write to WAL more frequently than B-trees", "Write amplification is only relevant for SSDs and does not apply to cloud storage"],
      correctAnswer: 0,
      explanation: "Write amplification measures the ratio of physical bytes written to disk per application byte written.\n\n**Step 1.** Write amplification (WA) = (bytes actually written to disk) / (bytes written by the application). A WA of 10x means 10 disk writes per application write.\n\n**Step 2.** In LSM trees, data flows through multiple levels (L0, L1, L2, ...). Each level has a size threshold (typically 10x). When a level is full, SSTables are compacted (merged and rewritten) into the next level. A single key may be rewritten during compaction at every level it passes through.\n\n**Step 3.** With a 10x size ratio per level and 4 levels, a key might be written up to 10-40 times total. This wears out SSDs faster and consumes I/O bandwidth. Tuning compaction strategy (Leveled vs Size-Tiered) trades WA against read amplification and space amplification.",
      hints: [
        "In leveled compaction with 4 levels, data may be rewritten once per level as it cascades down — how many total writes does one application write generate?",
        "B-trees have write amplification too (page splits, WAL), but LSM compaction tends to be more severe for write-heavy workloads.",
      ],
    },
    {
      id: "q-sdi-db-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Why is column-oriented storage (e.g., Parquet, Redshift) well-suited for OLAP but poor for OLTP workloads?",
      options: ["Column stores are slower to compress data than row stores", "OLAP queries aggregate a few columns across millions of rows (column scans are efficient); OLTP operations access all columns of specific rows (column stores must read from many separate column files per row)", "Column stores do not support SQL queries", "Column stores cannot handle concurrent writes from multiple users"],
      correctAnswer: 1,
      explanation: "Column-oriented storage is optimized for read-heavy analytical workloads but struggles with point queries and updates.\n\n**Step 1.** Column-oriented storage keeps each column's values contiguously on disk. For OLAP queries like $SUM$(revenue) WHERE region = 'US', only the revenue and region columns need to be read — massive I/O savings vs reading entire rows. Columns also compress extremely well (10-50x), enabling SIMD vectorized operations on compressed data.\n\n**Step 2.** For OLTP, each individual row access requires reading from N separate column files and reconstructing the row — far more I/O than a row-store, which stores all columns together contiguously.\n\n**Step 3.** Column stores also struggle with individual row mutations. Batch-loading and heavy compression are designed for read-mostly analytical workloads, not high-frequency point updates.",
      hints: [
        "An OLAP query scanning 100 columns but only needing 3 — how much I/O does each storage model require?",
        "OLTP workloads frequently update individual rows; how does modifying one column value in a column-oriented store compare to a row-oriented store?",
      ],
    },
  ],

  "sdi-db-indexing": [
    {
      id: "q-sdi-db-25",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A query is: SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-06-30'. Which index type would efficiently support this range query?",
      options: ["Hash index", "B-tree index", "Full-text index", "Bitmap index"],
      correctAnswer: 1,
      explanation: "Range queries require sorted data, which B-tree indexes provide naturally.\n\n**Step 1.** Hash indexes map each key to a hash bucket, supporting only equality comparisons (WHERE key = value) in O(1). They cannot efficiently answer range queries because hashing destroys the sorted order of keys.\n\n**Step 2.** B-tree indexes maintain keys in sorted order across leaf pages linked sequentially. For a range query, the engine finds the start of the range via binary search in O(log n) and then scans sequentially through the leaf pages until the end of the range is reached.\n\n**Step 3.** PostgreSQL supports both hash and B-tree indexes; MySQL InnoDB only supports B-tree. For any range query, B-tree is the correct choice.",
      hints: [
        "After hashing two adjacent dates, are the resulting hash values adjacent in storage? Can you traverse a range through hash buckets?",
        "B-tree leaf pages are stored in sorted order and linked sequentially, enabling efficient range scans after finding the start key.",
      ],
    },
    {
      id: "q-sdi-db-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A composite index exists on (country, city, last_name). Which of the following queries can use this index efficiently via an index seek (not a full index scan)?",
      options: ["WHERE city = 'London'", "WHERE last_name = 'Smith'", "WHERE country = 'UK' AND city = 'London'", "WHERE city = 'London' AND last_name = 'Smith'"],
      correctAnswer: 2,
      explanation: "Composite indexes follow the leftmost prefix rule — only leading columns can be used for an index seek.\n\n**Step 1.** A composite index on (country, city, last_name) is sorted: first by country, then by city within each country, then by last_name within each city. The leftmost prefix rule states that a query can use an index prefix if it provides equality conditions on a leading subset of columns.\n\n**Step 2.** WHERE country = 'UK' AND city = 'London' uses the first two columns in equality — enabling an efficient index seek. WHERE last_name = 'Smith' skips both leading columns and cannot use the index for a seek. WHERE city = 'London' skips the leading country column.\n\n**Step 3.** WHERE city = 'London' AND last_name = 'Smith' also skips the leading country column, so it cannot use the index for a seek either — even though it uses two indexed columns.",
      hints: [
        "Think of a phone book sorted by last name, then first name. Can you efficiently find all entries with a specific first name without knowing the last name?",
        "The leftmost prefix rule: you can use columns (a), (a, b), or (a, b, c) but not (b), (c), or (b, c) alone.",
      ],
    },
    {
      id: "q-sdi-db-27",
      type: "true-false",
      difficulty: "medium",
      question: "A covering index (index-only scan) eliminates the need to access the main table heap for queries where all needed columns are included in the index.",
      correctAnswer: "True",
      explanation: "A covering index enables the query engine to satisfy a query entirely from the index, never touching the heap.\n\n**Step 1.** A covering index includes all columns referenced by a query — both in WHERE clauses and in the SELECT projection. When the query planner recognizes this, it performs an index-only scan.\n\n**Step 2.** The engine reads the required data directly from the index pages, without looking up the corresponding heap (table) pages. This dramatically reduces I/O, especially for queries that touch a small fraction of columns on a large table.\n\n**Step 3.** Example: CREATE INDEX ON orders (user_id, created_at, amount) covers the query SELECT amount FROM orders WHERE user_id = 42 AND created_at > '2024-01-01' entirely without heap access.",
      hints: [
        "If the index already contains everything the query needs, why would the database bother reading the original table at all?",
        "The 'heap' in PostgreSQL refers to the main table storage — index-only scans skip this entirely when the index covers all required columns.",
      ],
    },
    {
      id: "q-sdi-db-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Why is it problematic to create many indexes on a write-heavy table?",
      options: ["More indexes slow down SELECT queries due to index contention", "Every INSERT, UPDATE, or DELETE must update all indexes on the table, increasing write latency and I/O proportionally to the number of indexes", "Indexes on write-heavy tables automatically become corrupted over time", "Too many indexes cause the query planner to choose the wrong index"],
      correctAnswer: 1,
      explanation: "Every index is a separate data structure that must be kept in sync with the base table on every write.\n\n**Step 1.** When a row is inserted, every index on that table must be updated to include the new key. When a row is updated, any index whose indexed column changed must update both the old and new key entries. When a row is deleted, all indexes must remove the key.\n\n**Step 2.** For a write-heavy table (e.g., a high-volume event log), having 10 indexes means each write triggers up to 10 additional index update operations. These updates consume I/O bandwidth and increase write latency.\n\n**Step 3.** General rule of thumb: keep fewer than 5 indexes on write-heavy OLTP tables. OLAP tables with batch-loaded, read-only data can safely have many more indexes.",
      hints: [
        "Think of maintaining a physical book's index — every time you add a new entry to the book, you must update every index entry as well.",
        "If a table has 8 indexes and you insert 1 million rows, how many total index entries are written?",
      ],
    },
  ],

  "sdi-db-time-series": [
    {
      id: "q-sdi-db-29",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Time-series databases like InfluxDB and TimescaleDB are optimized for (metric, timestamp) workloads. Which feature allows them to manage storage costs for historical data automatically?",
      options: ["Automatic sharding of all data across nodes", "Automatic downsampling (aggregating old data into lower-resolution summaries) combined with configurable retention policies that drop data after a set period", "Storing all data in RAM to avoid disk I/O", "Compressing only the most recent data and keeping old data uncompressed for fast queries"],
      correctAnswer: 1,
      explanation: "Downsampling and retention policies are the key automatic storage management features in time-series databases.\n\n**Step 1.** Time-series databases accumulate data continuously. Keeping per-second metrics forever is impractical — storage costs would grow unboundedly while older high-resolution data is rarely queried.\n\n**Step 2.** Downsampling (also called rollup) automatically aggregates high-resolution data into lower-resolution summaries as data ages. Per-second data rolls up to per-minute after 1 day, per-minute to per-hour after 1 week, and so on. This reduces storage by orders of magnitude while preserving trend information.\n\n**Step 3.** Retention policies automatically delete data older than a configured threshold (e.g., raw data deleted after 30 days). InfluxDB calls these continuous queries; TimescaleDB uses continuous aggregates.",
      hints: [
        "For a dashboard showing 'server CPU over the last year', do you really need per-second granularity for data from 6 months ago?",
        "Retention policies let operators say 'raw data is only valuable for 7 days; after that, hourly averages are sufficient'.",
      ],
    },
    {
      id: "q-sdi-db-30",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Why is partitioning time-series data by time range (e.g., one partition per day or week) particularly effective for time-series query performance?",
      options: ["Time-range partitioning automatically replicates data to multiple nodes", "Time-series queries almost always include a time range filter, so the query engine can skip entire partitions outside the range; recent partitions fit in memory and old partitions can be independently compressed or archived", "Time-range partitioning enables hash-based sharding by timestamp", "Time-range partitioning prevents write hotspots by distributing writes across all partitions equally"],
      correctAnswer: 1,
      explanation: "Time-range partitioning exploits the predictable query patterns of time-series workloads.\n\n**Step 1.** Time-series queries almost always include a time range filter (e.g., 'metrics from the last hour'). Partitioning by time range means each partition contains data for a specific window (e.g., one day).\n\n**Step 2.** The query planner performs partition pruning: it reads partition metadata and skips all partitions whose time range does not overlap with the query's filter — eliminating most partitions from consideration.\n\n**Step 3.** Additionally, recent partitions (frequently queried) fit in the OS page cache, while old partitions can be compressed aggressively and tiered to cheaper storage. TimescaleDB calls these partitions 'chunks' and manages them automatically.",
      hints: [
        "If you always query 'data from the last 24 hours', and each partition holds exactly 24 hours of data, how many partitions does the query need to read?",
        "Old partitions are rarely queried and never modified — what storage optimizations become possible for immutable, infrequently accessed data?",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
