import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sds-kafka-fundamentals": [
    {
      id: "q-stream-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In Apache Kafka, what determines the maximum degree of parallelism for a single consumer group reading from a topic?",
      options: [
        "The number of consumer group members registered with the group coordinator",
        "The number of partitions in the topic",
        "The replication factor configured for the topic",
        "The number of Kafka broker nodes in the cluster"
      ],
      correctAnswer: 1,
      explanation: "The partition count is the hard ceiling on consumer group parallelism. Kafka assigns each partition to at most one consumer within a consumer group at any time. Adding more consumers than partitions leaves the extra consumers idle. LinkedIn designed Kafka this way to provide strong ordering within a partition while enabling horizontal scale across partitions. If you need more parallelism, increase the partition count before creating the topic — partitions can be added but not removed.",
      hints: [
        "Can two consumers in the same group read from the same partition simultaneously?",
        "What happens to a consumer instance when there are more consumers than partitions?"
      ],
    },
    {
      id: "q-stream-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A Kafka producer uses a message key of user_id when publishing events. What is the guaranteed behavior?",
      options: [
        "All messages for a given user_id are delivered in strict global order across all topics",
        "All messages with the same user_id key are written to the same partition, preserving per-key ordering",
        "Kafka compacts messages with the same key so only the latest value survives per key",
        "The broker routes the message to a consumer instance whose ID matches the key"
      ],
      correctAnswer: 1,
      explanation: "Kafka's default partitioner applies a hash function to the message key and maps it to a partition (partition = hash(key) % numPartitions). All messages with the same key go to the same partition, and Kafka guarantees ordering within a partition. This is the standard approach for ensuring that all events for a given user, order, or entity are processed in the order they were produced. Uber uses this pattern so that ride lifecycle events (REQUEST, ACCEPT, START, END) for a given trip_id always arrive in order.",
      hints: [
        "The partitioner formula is: partition = murmur2(key) % numPartitions.",
        "What would happen to ordering if events for the same user_id landed on different partitions?"
      ],
    },
    {
      id: "q-stream-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A Kafka consumer crashes after processing 1,000 messages but before committing offsets. When it restarts, what is the expected behavior?",
      options: [
        "It starts from the latest offset and permanently skips the 1,000 unprocessed messages",
        "It replays from the last committed offset, re-delivering the 1,000 messages (at-least-once delivery)",
        "Kafka automatically commits the offset on behalf of the crashed consumer",
        "It reads from the beginning of the topic (offset 0) on every restart"
      ],
      correctAnswer: 1,
      explanation: "Kafka stores committed consumer offsets in the internal __consumer_offsets topic. On restart, the consumer resumes from the last committed offset, causing the 1,000 unacknowledged messages to be re-delivered. This is the at-least-once delivery semantic — messages may be reprocessed, so consumer logic must be idempotent. Netflix and LinkedIn design their Kafka consumers around this: each message carries a unique ID that downstream systems check before writing, discarding duplicates.",
      hints: [
        "Offsets mark the boundary between 'processed' and 'to-be-processed'.",
        "What does 'at-least-once' delivery mean for the consumer's processing logic?"
      ],
    },
    {
      id: "q-stream-4",
      type: "true-false",
      difficulty: "easy",
      question: "Kafka guarantees total message ordering across all partitions of a topic.",
      correctAnswer: "False",
      explanation: "False. Kafka guarantees ordering only within a single partition. Messages across different partitions have no global ordering guarantee relative to each other. Two messages written to partition 0 and partition 1 simultaneously cannot be reliably ordered. To preserve total order for a logical entity (e.g., all events for a user), use a consistent partition key (e.g., user_id) so all related events land in the same partition. This is a foundational Kafka design constraint documented by LinkedIn when open-sourcing Kafka in 2011.",
      hints: [
        "If partition 0 and partition 1 are on different brokers, who decides which message was 'first'?",
        "How do you ensure all events for one user arrive in order?"
      ],
    },
  ],

  "sds-delivery-semantics": [
    {
      id: "q-stream-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A payment processing system must never charge a customer twice even if a Kafka message is redelivered. Which approach achieves exactly-once processing at the application level?",
      options: [
        "Use at-most-once delivery by disabling retries on the Kafka producer to guarantee no duplicate messages",
        "Store an idempotency key (e.g., payment_id) in the database; skip processing if the key already exists before writing the charge",
        "Increase the consumer poll timeout to reduce the probability of duplicate redelivery",
        "Use Kafka's built-in at-least-once guarantee and compensate for occasional double charges manually"
      ],
      correctAnswer: 1,
      explanation: "Exactly-once semantics at the application level requires idempotent consumers. Each payment message carries a unique payment_id. Before writing the charge to the database, the consumer checks whether payment_id already exists in a deduplication table (using a UNIQUE constraint or INSERT ... ON CONFLICT DO NOTHING). If it exists, the message is skipped as a duplicate. Kafka's enable.idempotence=true and transactions handle the producer-to-broker leg, but application-level idempotency is still required for the consumer-to-database leg. Stripe and Uber both use this pattern.",
      hints: [
        "What makes an operation idempotent? Applying it multiple times yields the same result as once.",
        "How can a relational database enforce that the same payment_id is never processed twice?"
      ],
    },
    {
      id: "q-stream-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Kafka's idempotent producer (enable.idempotence=true) prevents which specific failure scenario that causes duplicate messages?",
      options: [
        "A consumer reading the same message twice because it crashed before committing its offset",
        "A producer retrying after a network timeout causes a duplicate because the broker wrote the message but the ACK was lost in transit",
        "A broker losing a message due to disk failure before replication to followers completes",
        "Two producers publishing to the same partition with overlapping sequence numbers"
      ],
      correctAnswer: 1,
      explanation: "The idempotent producer assigns each batch a producer ID (PID) and a monotonically increasing sequence number. If the broker writes the batch to the partition log and the ACK is dropped by the network, the producer retries. Without idempotence, the broker would write the batch a second time. With idempotence, the broker uses the (PID, sequence) pair to detect the duplicate and returns success without writing again. Confluent introduced this feature in Kafka 0.11 as the foundation for exactly-once semantics. acks=all combined with enable.idempotence=true is the recommended production configuration.",
      hints: [
        "When does a producer retry — when it does not receive an ACK within request.timeout.ms.",
        "What information does the broker need to know 'I already wrote this batch'?"
      ],
    },
  ],

  "sds-consumer-lag": [
    {
      id: "q-stream-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Your Kafka consumer group has a growing lag of 50 million messages. Before scaling up consumers, what is the FIRST thing to check?",
      options: [
        "Increase the Kafka topic replication factor to improve read throughput across replicas",
        "Verify whether the current consumer count already equals the partition count; if so, adding consumers provides no benefit",
        "Immediately scale the consumer group to 3x its current size to absorb the backlog",
        "Increase the Kafka topic retention period to ensure messages are not deleted before processing"
      ],
      correctAnswer: 1,
      explanation: "Before scaling, verify that the bottleneck is actually insufficient consumer instances. If consumers == partitions, adding more consumers yields zero benefit — extra consumers sit idle. The real bottleneck may be slow downstream processing (DB writes, HTTP calls), GC pauses, or single-threaded processing within a consumer. Uber's real-time data platform team found that most consumer lag incidents stemmed from slow downstream IO, not insufficient consumer count. Profile the per-message processing latency and check CPU/IO utilization before scaling horizontally.",
      hints: [
        "What is the maximum number of useful consumers in a consumer group for a topic with N partitions?",
        "If consumers are already equal to partitions, what else could be causing lag to grow?"
      ],
    },
    {
      id: "q-stream-8",
      type: "true-false",
      difficulty: "medium",
      question: "Consumer lag measured in message count is always a reliable indicator of processing delay in seconds.",
      correctAnswer: "False",
      explanation: "False. Message lag (count) does not directly translate to time delay without knowing the current production rate. 1 million messages of lag means 1 second of delay at 1M msg/sec but 17 minutes at 1K msg/sec. Time-based lag (seconds = lag_messages / current_throughput_rate) is a far better SLI for latency SLOs. Netflix's keystone pipeline team uses both metrics: message lag for capacity planning and time-based lag for alerting on SLO breaches. Monitoring tools like Burrow and kminion expose both metrics.",
      hints: [
        "If a topic produces 1 message per hour and you have 1 message of lag, is that urgent?",
        "What additional data point converts message count lag into seconds of delay?"
      ],
    },
  ],

  "sds-stream-windows": [
    {
      id: "q-stream-9",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A real-time dashboard needs to show unique active users over the past 60 minutes, refreshed every 5 minutes. Which window type and configuration is correct?",
      options: [
        "Tumbling window of 60 minutes — non-overlapping, result updates once per hour",
        "Sliding window of size 60 minutes with a 5-minute slide interval — overlapping windows, result updates every 5 minutes",
        "Session window with a 5-minute inactivity gap — gaps define boundaries rather than fixed time",
        "Global window with a count-based trigger firing every 1,000 events"
      ],
      correctAnswer: 1,
      explanation: "A sliding window of size 60 minutes and slide interval 5 minutes produces a new result every 5 minutes, each covering the last hour of events. Each event belongs to 12 overlapping windows (60 / 5). This delivers the rolling-hour semantic with 5-minute freshness. Tumbling windows update only once per hour. Session windows are user-inactivity-based and produce variable-length windows. LinkedIn uses sliding windows for feed engagement metrics and Netflix for content popularity dashboards.",
      hints: [
        "How many overlapping windows does each event belong to in a 60-min/5-min sliding window?",
        "What is the difference between window size and slide interval?"
      ],
    },
    {
      id: "q-stream-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In Apache Flink, an event-time tumbling window of 1 hour fires its result when:",
      options: [
        "Wall-clock time advances by 1 hour from when the first event in the window arrived",
        "The watermark passes the window's end timestamp (e.g., watermark > window_end)",
        "The number of events in the window exceeds the configured threshold trigger",
        "A processing-time timer fires based on the task manager system clock"
      ],
      correctAnswer: 1,
      explanation: "In event-time processing, Flink closes and fires a window when the watermark surpasses the window's end time. The watermark represents Flink's estimate of event-time progress, derived from timestamps in the data stream. This decouples window firing from wall-clock time, enabling correct handling of late and out-of-order events. If events stop arriving, the watermark stops advancing and windows never fire — unlike processing-time windows which fire on the system clock regardless. Databricks and Flink's 2015 ATC paper document this as the key distinction between event-time and processing-time semantics.",
      hints: [
        "What is the purpose of a watermark — what does 'watermark T' assert about the stream?",
        "Why can't a processing-time clock correctly handle late-arriving events?"
      ],
    },
  ],

  "sds-watermarks-late-data": [
    {
      id: "q-stream-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A Flink pipeline uses a 30-second watermark delay for an IoT sensor stream. A sensor event arrives with a timestamp 45 seconds behind the current watermark. What happens?",
      options: [
        "Flink buffers the late event indefinitely and includes it in the window when a trigger fires",
        "The event is dropped or routed to a side output because its window has already fired and been discarded",
        "Flink retracts the previously emitted window result and recomputes it including the late event",
        "The watermark rolls back to accommodate the late event and re-triggers affected windows"
      ],
      correctAnswer: 1,
      explanation: "Once the watermark advances past a window's end time plus any configured allowed lateness, that window is garbage-collected. Events arriving after this point are 'late' in Flink's model. They are either silently dropped or routed to a side output (a secondary stream) for separate handling — for example, an audit topic or a late-data reconciliation pipeline. Watermarks are monotonically non-decreasing; they never go backward, as doing so would invalidate downstream state. Uber's Flink platform uses side outputs to capture late IoT sensor events for offline reconciliation without blocking real-time aggregations.",
      hints: [
        "Can a watermark ever decrease? What would happen to window state if it could?",
        "What is Flink's 'allowedLateness' parameter and how does it extend the window lifetime?"
      ],
    },
    {
      id: "q-stream-12",
      type: "true-false",
      difficulty: "medium",
      question: "Increasing the watermark delay from 1 minute to 10 minutes in a streaming pipeline eliminates more late data but also increases end-to-end result latency by approximately 9 minutes.",
      correctAnswer: "True",
      explanation: "True. The watermark delay is a direct trade-off between completeness (fewer late events dropped) and latency (longer wait before windows fire). A 10-minute watermark means results are delayed by 10 minutes relative to event time — a window covering 12:00-13:00 event time will not fire until the watermark reaches 13:10. This 10-minute buffer accommodates late-arriving events at the cost of staleness. LinkedIn's Samza team and Flink's documentation both describe this as the fundamental completeness-vs-latency knob in event-time stream processing.",
      hints: [
        "If the watermark is 10 minutes behind event time, when does the 13:00 window boundary trigger?",
        "What is the relationship between watermark lag and result freshness?"
      ],
    },
  ],

  "sds-lambda-kappa-arch": [
    {
      id: "q-stream-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Lambda architecture, which layer provides low-latency results for recent data that the batch layer has not yet incorporated?",
      options: [
        "Batch layer — it stores and indexes all historical data for fast query access",
        "Speed layer — it processes recent events in real time and serves approximate, low-latency results",
        "Serving layer — it merges batch views and speed layer views to answer queries",
        "Ingestion layer — it buffers events before routing them to batch and speed layers"
      ],
      correctAnswer: 1,
      explanation: "Lambda architecture has three layers: (1) Batch layer — processes the complete dataset periodically (e.g., every few hours with Spark/Hadoop), producing accurate but stale views. (2) Speed layer — processes events in real time (Flink/Storm), serving approximate results for data not yet in the batch view. (3) Serving layer — merges batch and speed layer views to answer queries. Nathan Marz coined Lambda architecture at BackType/Twitter to solve real-time analytics on top of Hadoop's batch paradigm.",
      hints: [
        "Lambda architecture has three layers — what gap does the speed layer fill?",
        "Why is the batch layer inherently stale and what compensates for it?"
      ],
    },
    {
      id: "q-stream-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Jay Kreps proposed Kappa architecture as a simplification of Lambda. What is the core operational problem Kappa eliminates?",
      options: [
        "Kafka cannot handle the throughput required for the Lambda speed layer at LinkedIn scale",
        "Lambda requires maintaining two separate code paths (batch and streaming) for the same logic, creating a dual-maintenance burden and a common source of divergent results",
        "The Lambda batch layer cannot scale to petabyte datasets in reasonable wall-clock time",
        "Lambda's serving layer introduces query latency above 100ms making it unsuitable for user-facing products"
      ],
      correctAnswer: 1,
      explanation: "Jay Kreps (co-creator of Kafka, then at LinkedIn) argued in a 2014 blog post that Lambda's fundamental operational cost is maintaining two codebases — one batch (MapReduce/Spark) and one streaming (Storm/Flink) — that must produce equivalent outputs. Bugs appear when the two implementations drift. Kappa collapses this into a single streaming system: all processing uses a streaming job, and historical reprocessing is done by replaying the Kafka log from offset 0 through the same job. This eliminates the batch layer, halving the maintenance surface area.",
      hints: [
        "What is the main complexity Lambda adds over a single-system approach?",
        "What Kafka capability enables Kappa to reprocess historical data without a separate batch system?"
      ],
    },
    {
      id: "q-stream-15",
      type: "true-false",
      difficulty: "medium",
      question: "In Kappa architecture, historical reprocessing is done by replaying events from the beginning of the Kafka topic through the same streaming job used for real-time processing.",
      correctAnswer: "True",
      explanation: "True. This is the core insight of Kappa architecture. Kafka retains events for a configurable period (or indefinitely with tiered storage). To reprocess history after a bug fix or logic change, you start a new instance of the streaming job from offset 0 (or a specific historical offset) on a new consumer group and new output topic. Once it catches up to real time, you atomically swap the serving layer to point to the new output. The old job is decommissioned. This eliminates the need for a separate batch system. Confluent documents this as the standard Kappa deployment model.",
      hints: [
        "What Kafka setting retains data long enough for historical reprocessing?",
        "How do you deploy a new version of a streaming job without downtime in Kappa?"
      ],
    },
  ],

  "sds-flink-spark-stateful": [
    {
      id: "q-stream-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which statement accurately distinguishes Apache Flink from Spark Structured Streaming for stateful stream processing?",
      options: [
        "Flink processes data in micro-batches; Spark Structured Streaming is a true record-at-a-time streaming engine",
        "Flink uses a record-at-a-time pipeline with native stateful operators and incremental checkpointing; Spark Structured Streaming uses micro-batches that add latency but benefit from the Spark SQL optimizer",
        "Both are functionally equivalent; Flink is simply the open-source version of Spark Structured Streaming",
        "Spark Structured Streaming supports event-time watermarks; Flink only supports processing-time windows"
      ],
      correctAnswer: 1,
      explanation: "Flink is a true streaming engine processing records one at a time through a dataflow graph, with RocksDB-backed stateful operators, asynchronous incremental checkpointing (Chandy-Lamport barriers), and sub-second latency. Spark Structured Streaming uses micro-batches (default trigger interval 0ms but still batch execution), which adds latency but inherits the full Catalyst/Tungsten optimization stack. Flink achieves lower latency and richer stateful processing primitives (keyed state, timers, process functions). Databricks uses both in production but recommends Delta Live Tables over raw Structured Streaming for most pipelines.",
      hints: [
        "What is the difference between micro-batch processing and true record-at-a-time streaming?",
        "What state backend does Flink use for large state (GB-TB range)?"
      ],
    },
    {
      id: "q-stream-17",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Apache Flink's checkpointing uses asynchronous barrier snapshotting based on the Chandy-Lamport algorithm. What role do checkpoint barriers play?",
      options: [
        "Barriers are heartbeat messages sent by the JobManager to detect task manager failures",
        "Barriers are special records injected into data streams that signal operators to snapshot their state; when an operator receives barriers on all inputs it snapshots state to durable storage and forwards the barrier downstream",
        "Barriers partition the event stream into fixed time windows for windowed aggregations",
        "Barriers signal the end of a Kafka partition to the Flink source connector"
      ],
      correctAnswer: 1,
      explanation: "Flink's JobManager triggers a checkpoint by injecting checkpoint barrier records at each source. When a downstream operator receives a barrier on all input channels, it asynchronously snapshots its state (keyed state, operator state) to a configured state backend (HDFS, S3, RocksDB) and then forwards the barrier. This allows a globally consistent distributed snapshot without pausing the entire pipeline — only a brief alignment phase at each operator buffers in-flight records. On failure, Flink restores all operator states from the last successful checkpoint and replays from the corresponding Kafka offsets. This was published in Flink's ATC'15 paper.",
      hints: [
        "How does Flink take a consistent distributed snapshot without a global stop-the-world pause?",
        "When does an operator actually snapshot its state during checkpointing?"
      ],
    },
  ],

  "sds-event-sourcing-cqrs": [
    {
      id: "q-stream-18",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In an event sourcing system, how is the current state of an entity (e.g., a bank account) derived?",
      options: [
        "Reading the latest row from a normalized relational database table updated on each command",
        "Replaying all domain events for that entity from the append-only event log in chronological order to compute current state",
        "Querying a Redis cache that is updated synchronously with every write operation",
        "Running a nightly batch aggregation job that computes and stores the current state summary"
      ],
      correctAnswer: 1,
      explanation: "In event sourcing, the append-only event log is the system of record. Current state = fold(initial_state, events). For example, a bank account state is the sum of all DEPOSITED and WITHDRAWN events for that account_id. Snapshots are an optimization: start from the latest snapshot and replay only subsequent events, avoiding full history replay for high-event-count entities. Axon Framework and Kafka-based event sourcing at Confluent both use this model. Benefits include a complete immutable audit trail and the ability to reconstruct state at any historical moment.",
      hints: [
        "In event sourcing, the log is the source of truth — not a mutable state table.",
        "How does event replay answer 'what was the account balance at 3pm last Tuesday'?"
      ],
    },
    {
      id: "q-stream-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a CQRS system using Kafka, read models (query projections) are built by:",
      options: [
        "Running SELECT queries directly against the write-side command database using read replicas",
        "Consuming domain events from Kafka topics and materializing them into read-optimized projections tailored to specific query patterns (Elasticsearch, Redis, PostgreSQL)",
        "Synchronously updating both the command model and query projection in the same database transaction",
        "Polling the command database every second and copying changed rows to a separate read database"
      ],
      correctAnswer: 1,
      explanation: "CQRS separates writes (commands) from reads (queries). On the command side, domain events are published to Kafka. On the query side, consumer services build read-optimized projections from those events: an order history page materializes events into a PostgreSQL timeline table; a product search page projects events into Elasticsearch. Each projection is eventually consistent with the command side and optimized for its specific query pattern. This decoupling is used at LMAX Exchange and in microservice architectures at Netflix and Uber.",
      hints: [
        "Why would different query use cases need different read models?",
        "How does Kafka decouple the command (write) side from the query (read) side?"
      ],
    },
  ],

  "sds-cdc-schema-registry": [
    {
      id: "q-stream-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Debezium captures changes from a PostgreSQL database and publishes them to Kafka. Which PostgreSQL mechanism does Debezium use?",
      options: [
        "Application-level triggers that write changed rows to a dedicated change_log table",
        "PostgreSQL's write-ahead log (WAL) via a logical replication slot, decoded using the pgoutput or decoderbufs plugin",
        "Periodic SELECT queries that compare row checksums between polling intervals to detect changes",
        "PostgreSQL's LISTEN/NOTIFY pub-sub mechanism for row-level change notifications"
      ],
      correctAnswer: 1,
      explanation: "Debezium registers as a PostgreSQL logical replication client using a replication slot. PostgreSQL writes every INSERT, UPDATE, and DELETE to its WAL before applying it (for durability). The logical replication protocol decodes WAL entries into structured change events (old values, new values, operation type). Debezium's connector reads these decoded events and publishes them to Kafka topics — one topic per table by default. This approach has zero impact on normal query traffic and captures changes at the row level without modifying application code. LinkedIn uses Debezium-based CDC in their data mesh architecture.",
      hints: [
        "What does PostgreSQL write before applying any change to ensure durability on crash?",
        "What is a logical replication slot and how does it differ from physical replication?"
      ],
    },
    {
      id: "q-stream-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Confluent Schema Registry with Avro serialization, which schema change maintains backward compatibility?",
      options: [
        "Removing a required field that has no default value from the schema",
        "Adding a new optional field with a default value to the schema",
        "Changing the type of an existing field from string to long",
        "Renaming an existing required field to a new name"
      ],
      correctAnswer: 1,
      explanation: "Backward compatibility means a new schema version can deserialize data written with the old schema. Adding an optional field with a default value is the canonical backward-compatible change: messages serialized with the old schema (missing the new field) deserialize successfully under the new schema, substituting the default. Removing required fields, changing field types, or renaming fields break backward compatibility — old data cannot be deserialized with the new schema. Confluent Schema Registry enforces the configured compatibility level (BACKWARD, FORWARD, FULL) on schema registration, rejecting incompatible changes.",
      hints: [
        "Backward compatibility: new code reads old data. What happens if old data has no value for a new required field?",
        "What makes a field optional in Avro, and what role does a default value play?"
      ],
    },
  ],

  "sds-log-compaction": [
    {
      id: "q-stream-22",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which use case is Kafka log compaction specifically designed to support?",
      options: [
        "Retaining all click-stream events for 7 days to enable full analytics replay",
        "Maintaining a changelog topic where the latest value per key represents current state, enabling Kafka to function as a key-value store for state reconstruction",
        "Compressing message payloads with LZ4 to reduce network bandwidth and broker disk usage",
        "Limiting total topic size by deleting all messages beyond a configured byte threshold"
      ],
      correctAnswer: 1,
      explanation: "Log compaction guarantees that for each unique message key, at least the most recent value is retained. This makes a compacted topic behave like a distributed key-value store snapshotted as a log. Kafka Streams uses compacted changelog topics to rebuild local state stores on restart: instead of replaying the entire event history, it only needs the latest value per key. Sending a tombstone (key=X, value=null) deletes the key from the compacted log. Confluent uses compacted topics for KTable semantics and database CDC mirroring.",
      hints: [
        "What is a KTable in Kafka Streams and why does it need a compacted changelog topic?",
        "If a user's profile has been updated 1,000 times, how many records remain after log compaction?"
      ],
    },
    {
      id: "q-stream-23",
      type: "true-false",
      difficulty: "easy",
      question: "Kafka's time-based retention and log compaction can be enabled simultaneously on the same topic using cleanup.policy=compact,delete.",
      correctAnswer: "True",
      explanation: "True. Setting cleanup.policy=compact,delete enables both policies: the topic retains at least the latest value per key (compaction guarantee), AND segments older than retention.ms or larger than retention.bytes are eventually deleted. This is useful for CDC changelog topics that need latest-value semantics but should not grow unboundedly. Old compacted segments that age past the retention window are deleted. This is the default configuration for Kafka Streams internal changelog topics in production deployments and is documented in Confluent's operator guide.",
      hints: [
        "What does cleanup.policy=compact,delete mean for a topic?",
        "What happens to an old compacted segment when it ages past retention.ms?"
      ],
    },
  ],

  "sds-backpressure": [
    {
      id: "q-stream-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How does Apache Flink implement backpressure propagation when a downstream operator cannot keep up with incoming data?",
      options: [
        "A central coordinator polls operator queue depths and sends explicit throttle RPC signals to upstream operators",
        "Flink relies on TCP flow control: a full downstream input buffer stops granting credits to upstream, causing the upstream socket write to block, naturally propagating pressure to the source",
        "A token bucket rate limiter at each operator input enforces a configured maximum message rate",
        "The JobManager detects high queue depth via metrics and dynamically reduces source partition assignments"
      ],
      correctAnswer: 1,
      explanation: "Flink uses a credit-based flow control mechanism layered on top of TCP's inherent backpressure. When a downstream task's input buffer is full, it cannot grant buffer credits to upstream. The upstream task blocks on its network write, which fills the TCP send buffer, which TCP flow control propagates upstream through all operators to the source. This is implicit backpressure with zero coordination overhead — no polling, no explicit signals. Flink's web UI displays backpressure ratios (fraction of time operators are blocked on output) per operator, which Netflix and Uber use to identify bottleneck stages in production streaming jobs.",
      hints: [
        "What happens at the TCP level when a receiver's buffer is full and a sender tries to write?",
        "Does Flink need an explicit backpressure protocol or does it rely on existing network semantics?"
      ],
    },
    {
      id: "q-stream-25",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A real-time unique visitor counter must handle 10 million distinct user IDs per minute with sub-second latency. A HashSet holding all user IDs would require over 1 GB of memory per window. What is the best data structure alternative?",
      options: [
        "Count-Min Sketch — probabilistic frequency estimation with bounded additive error",
        "HyperLogLog — probabilistic cardinality estimator using ~12 KB for ~0.81% standard error at any scale",
        "Bloom filter — probabilistic set membership check with configurable false positive rate",
        "LSM-tree — log-structured merge-tree for efficient on-disk sorted key-value storage"
      ],
      correctAnswer: 1,
      explanation: "HyperLogLog (HLL) is the standard solution for approximate distinct count at scale. Using ~12 KB of memory (2^14 registers), HLL estimates cardinality with ~0.81% standard error regardless of whether the actual count is 1 million or 1 trillion. Redis implements PFADD/PFCOUNT for HLL natively. Twitter, Facebook, and LinkedIn all use HLL for unique visitor counting in their real-time analytics pipelines. Count-Min Sketch estimates event frequencies (how many times did X occur?), not cardinality. Bloom filter tests set membership (have I seen X before?), not distinct count.",
      hints: [
        "Which probabilistic data structure is specifically designed for counting distinct elements?",
        "How does HyperLogLog estimate cardinality — what statistical property of hashes does it exploit?"
      ],
    },
  ],

  "sds-stream-table-join": [
    {
      id: "q-stream-26",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In Kafka Streams, a KStream of purchase events is joined with a KTable of user profiles keyed by user_id. A user profile update arrives after the purchase event it would have enriched has already been processed. What happens?",
      options: [
        "Kafka Streams buffers the purchase event and waits for the profile KTable to update before emitting the enriched result",
        "The purchase event is joined with the KTable value at the moment it is processed; late KTable updates do not retroactively update already-emitted results",
        "The join fails with a NullPointerException because the key was not in the KTable at processing time",
        "Kafka Streams automatically reprocesses the purchase event when the matching KTable entry is updated"
      ],
      correctAnswer: 1,
      explanation: "A KStream-KTable join is a point-in-time lookup join: for each KStream record, Kafka Streams performs a synchronous lookup of the KTable's current state at that instant in processing time. If the profile does not exist yet (or has an older value), the purchase event is either dropped (inner join) or enriched with null (left join). Subsequent KTable updates do not trigger reprocessing of past KStream events. This is fundamentally different from a KStream-KStream windowed join, which does buffer events within a time window to match records. LinkedIn uses KStream-KTable joins for activity enrichment in their analytics pipeline.",
      hints: [
        "Is a KStream-KTable join time-windowed or is it a snapshot lookup?",
        "How does a KStream-KTable join differ from a KStream-KStream join in buffering behavior?"
      ],
    },
  ],

  "sds-dead-letter-queue": [
    {
      id: "q-stream-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A streaming pipeline receives a malformed JSON message that throws a deserialization exception on every processing attempt — a 'poison pill'. What is the correct handling strategy?",
      options: [
        "Delete the Kafka consumer group and recreate it to skip past the offending message",
        "After a configurable number of retries (e.g., 3), route the message to a dead letter queue (DLQ) topic with error metadata, commit the offset, and continue processing",
        "Halt the consumer and alert on-call engineers to manually inspect and delete the message",
        "Set auto.offset.reset=latest so the consumer skips all existing messages and starts from the newest"
      ],
      correctAnswer: 1,
      explanation: "A Dead Letter Queue (DLQ) is the standard pattern for unprocessable messages. After N retries, the consumer publishes the raw message bytes to a DLQ topic (e.g., payments.dlq) along with metadata: original topic, partition, offset, timestamp, and the exception stack trace. The consumer then commits the offset for the original topic, unblocking the pipeline. A separate DLQ consumer or alerting system monitors the DLQ for investigation and potential manual replay. Netflix, Uber, and AWS SQS all use this pattern. Setting auto.offset.reset=latest is destructive — it permanently skips all messages between the current and latest offsets.",
      hints: [
        "What risk do you take if the consumer blocks indefinitely on a message that will never parse?",
        "Where should unprocessable messages go so the main pipeline can continue processing?"
      ],
    },
    {
      id: "q-stream-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a metrics pipeline (StatsD to Kafka to InfluxDB), which Kafka topic configuration prevents a slow InfluxDB writer from exhausting broker disk space?",
      options: [
        "Increasing the number of topic partitions to distribute load across more broker disks",
        "Configuring retention.ms and retention.bytes to enforce time- and size-based message expiration",
        "Enabling log compaction so duplicate metric data points are merged per tag set",
        "Using producer quotas to throttle the StatsD publisher write rate to match InfluxDB ingestion speed"
      ],
      correctAnswer: 1,
      explanation: "Retention policies are the primary safeguard against unbounded disk growth. Setting retention.ms=3600000 (1 hour) causes the broker to delete segments older than 1 hour. Setting retention.bytes=10737418240 (10 GB per partition) adds a size cap. If InfluxDB falls behind and consumer lag grows, old metrics are purged rather than filling broker disks. This is a deliberate trade-off: metrics pipelines typically accept loss of old data over broker instability. Producer quotas (option D) would backpressure StatsD publishers rather than allow data to accumulate and expire naturally.",
      hints: [
        "What Kafka configuration controls how long data is kept before automatic deletion?",
        "What is the trade-off between setting a short vs long retention period for a high-throughput metrics topic?"
      ],
    },
  ],

  "sds-warehouse-spark": [
    {
      id: "q-stream-29",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Why does columnar storage (Parquet, ORC) dramatically outperform row-oriented storage (CSV, JSON) for analytical queries that read 3 columns from a 100-column table?",
      options: [
        "Columnar formats use more indexes so column lookups avoid full-table scans",
        "Each column's values are stored contiguously on disk, so only the 3 needed columns are read; row-oriented storage must read entire rows — all 100 columns — even to access 3 fields",
        "Columnar formats apply better compression algorithms than row-oriented formats regardless of query access pattern",
        "Columnar formats store data pre-sorted by primary key, reducing the number of rows scanned per query"
      ],
      correctAnswer: 1,
      explanation: "The core columnar advantage is IO reduction via column projection. In a CSV/JSON row file, each row stores all 100 columns contiguously — reading 3 columns still requires reading or seeking past all 100 columns per row. In Parquet or ORC, each column's bytes are stored together, so a query touching 3 columns reads only ~3% of total data bytes. Additionally, per-column compression ratios are far superior because values are of the same type and similar magnitude (run-length encoding, dictionary encoding, delta encoding). Databricks' Delta Lake, Apache ORC in Hive, and Google BigQuery's Capacitor all exploit this principle for analytical performance.",
      hints: [
        "How is data physically laid out in a Parquet file row group vs a CSV row?",
        "If each column is stored separately, what IO is saved when a query needs only 3 of 100 columns?"
      ],
    },
    {
      id: "q-stream-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A Spark job processing a 10 TB dataset is severely slow due to data skew — one partition holds 50 GB while all others hold ~200 MB. Which technique best resolves this?",
      options: [
        "Increase executor memory to 256 GB per node so each executor can process the large partition in memory",
        "Apply key salting: append a random integer suffix (0 to N-1) to skewed keys, process in N sub-partitions, then aggregate partial results to combine them",
        "Call df.coalesce(1) to merge all partitions into one, ensuring uniform processing across a single executor",
        "Set spark.sql.shuffle.partitions=10000 to create more shuffle partitions so the skewed key is automatically redistributed"
      ],
      correctAnswer: 1,
      explanation: "Key salting is the standard fix for single-key data skew. If the key 'bot123' accounts for 50 GB of data, appending a random integer 0-9 creates 10 virtual keys (bot123_0 through bot123_9), spreading load across 10 partitions processed in parallel. After aggregation, a second pass strips the suffix and merges the 10 sub-results. Increasing shuffle partitions (option D) does not help if one key dominates — all records for that key still hash to the same partition. Databricks engineers and Spark engineers at Netflix documented salting as the primary mitigation for skewed joins and groupBy aggregations.",
      hints: [
        "If one key holds 50 GB, how do you split it across multiple partitions without changing business semantics?",
        "Why does simply increasing spark.sql.shuffle.partitions not help when one specific key is the bottleneck?"
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
