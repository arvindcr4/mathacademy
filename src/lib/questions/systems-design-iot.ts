import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-iot-mqtt": [
    {
      id: "q-iot-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "MQTT QoS level 2 guarantees exactly-once delivery using a four-step handshake (PUBLISH -> PUBREC -> PUBREL -> PUBCOMP). What is the PRIMARY trade-off of using QoS 2 compared to QoS 0?",
      options: [
        "QoS 2 requires TLS, while QoS 0 does not",
        "QoS 2 incurs higher latency and bandwidth overhead due to the four-message handshake per published message",
        "QoS 2 is only supported by AWS IoT Core, not by open-source brokers like Mosquitto",
        "QoS 2 drops messages when the broker restarts, just like QoS 0",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the key difference between QoS levels. QoS 0 uses 1 message (fire-and-forget), QoS 1 uses 2 messages (publish + PUBACK), and QoS 2 uses 4 messages (PUBLISH -> PUBREC -> PUBREL -> PUBCOMP).\n\n**Step 2:** Recognize that each additional message in the handshake introduces overhead: extra round-trips, increased latency, and persistent session state on both client and broker.\n\n**Step 3:** Evaluate the use case. For high-frequency sensor telemetry (temperature every second), QoS 0 is preferred. For commands with financial or safety implications where duplicates are costly, QoS 2 is warranted.\n\n**Answer:** QoS 2 incurs higher latency and bandwidth overhead due to the four-message handshake per published message.",
      hints: [
        "Count the number of network messages exchanged per delivery at each QoS level: QoS 0 = 1, QoS 1 = 2, QoS 2 = 4.",
        "Ask yourself: does a temperature reading lost once in a thousand matter more or less than a 4x increase in message overhead?",
      ],
    },
    {
      id: "q-iot-2",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In MQTT, a retained message is stored by the broker and immediately delivered to any new subscriber on that topic. What is the most appropriate use case for retained messages in an IoT system?",
      options: [
        "Streaming high-frequency sensor readings to a dashboard",
        "Storing the last-known state of a device so new subscribers immediately see the current value without waiting for the next publish",
        "Delivering firmware update binaries to devices",
        "Logging all historical telemetry for compliance auditing",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand what a retained message does. The broker stores the most recent message on each topic and delivers it immediately to any new subscriber.\n\n**Step 2:** Consider the scenario of a dashboard subscribing at midnight. Without retained messages, it sees nothing until the device next publishes.\n\n**Step 3:** Recognize the key constraint: only one retained message per topic is stored. This is not a history buffer, just the latest value.\n\n**Answer:** Retained messages store the last-known state of a device so new subscribers immediately see the current value without waiting for the next publish.",
      hints: [
        "Think about a dashboard that subscribes at midnight: without retained messages, it sees nothing until the device next publishes.",
        "Only one retained message is stored per topic — it is not a history, just the latest value.",
      ],
    },
    {
      id: "q-iot-3",
      type: "true-false",
      difficulty: "easy",
      question: "In MQTT, a device's Last Will and Testament (LWT) message is sent by the broker on behalf of the device immediately when the device calls DISCONNECT cleanly.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "**Step 1:** Recall what LWT stands for: Last Will and Testament. Like a human will, it is only executed upon unexpected death, not a planned departure.\n\n**Step 2:** Understand when the broker sends LWT: ONLY on unexpected disconnection (TCP timeout, power loss, network failure), NOT on clean DISCONNECT.\n\n**Step 3:** Apply this to device liveness monitoring. Configure LWT as a retained 'offline' message. When a device connects, publish 'online'. If it drops unexpectedly, the broker sends the LWT 'offline' message.\n\n**Answer:** False. LWT is sent only on unexpected disconnection, not on clean DISCONNECT.",
      hints: [
        "LWT stands for Last Will and Testament — a will is only executed after an unexpected death, not a planned retirement.",
        "A clean DISCONNECT means the device intentionally closed the connection; the LWT is specifically for unplanned loss.",
      ],
    },
    {
      id: "q-iot-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You are designing an MQTT topic hierarchy for a fleet of 100,000 smart meters. Each meter publishes voltage, current, and power readings. Which topic structure best enables both per-device subscriptions and fleet-wide analytics subscriptions?",
      options: [
        "meters/all (single flat topic for all meters and all readings)",
        "meters/{deviceId}/{metric} (e.g., meters/d001/voltage) with wildcard subscriptions using + and #",
        "meters/{metric}/{deviceId} (e.g., meters/voltage/d001) with per-metric wildcard fans",
        "Both B and C are equally valid — the choice depends on the primary access pattern",
      ],
      correctAnswer: 3,
      explanation: "**Step 1:** Analyze Structure B (device-first: meters/d001/voltage). Per-device subscriptions (meters/d001/#) are trivial, but fleet-wide voltage analysis requires subscribing to meters/+/voltage.\n\n**Step 2:** Analyze Structure C (metric-first: meters/voltage/d001). Per-metric fleet subscriptions (meters/voltage/#) are trivial, but per-device queries require meters/+/d001.\n\n**Step 3:** Recognize that both are valid. AWS IoT Core recommends device-first for device shadow integration, while analytics pipelines often prefer metric-first. The choice depends on your primary access pattern.\n\n**Answer:** Both B and C are equally valid — the choice depends on the primary access pattern.",
      hints: [
        "MQTT + wildcard matches exactly one level; # wildcard matches one or more levels recursively.",
        "Think about who subscribes most: a device management dashboard (needs per-device) or an analytics engine (needs per-metric)?",
      ],
    },
  ],

  "sdi-iot-protocols": [
    {
      id: "q-iot-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A sensor node runs on a 32 KB RAM microcontroller with a constrained 6LoWPAN radio. Which IoT messaging protocol is most appropriate, and why?",
      options: [
        "AMQP 1.0, because it provides enterprise-grade message routing and is the protocol used by Azure Service Bus",
        "CoAP over UDP, because it is designed for constrained devices with a binary format, low overhead, and REST-like semantics over UDP",
        "MQTT over TLS, because QoS 2 guarantees exactly-once delivery critical for sensor data",
        "HTTP/2 with gRPC, because it provides efficient binary framing and multiplexing",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Evaluate protocol overhead. AMQP 1.0 requires TCP with significant framing overhead. MQTT requires TCP and a persistent connection. HTTP/2 and gRPC are impractical on 32 KB RAM.\n\n**Step 2:** Consider CoAP (RFC 7252). It uses UDP, has a 4-byte fixed header, supports confirmable/non-confirmable messages, and maps to REST methods.\n\n**Step 3:** Match to 6LoWPAN constraints. CoAP is the IETF-recommended protocol for constrained nodes and networks (IEEE 802.15.4).\n\n**Answer:** CoAP over UDP, because it is designed for constrained devices with a binary format, low overhead, and REST-like semantics over UDP.",
      hints: [
        "CoAP is to IoT what HTTP is to the web — but designed for UDP and tiny devices.",
        "MQTT needs a persistent TCP connection; CoAP is stateless UDP — which fits a constrained 6LoWPAN radio better?",
      ],
    },
    {
      id: "q-iot-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An IoT gateway must bridge 10,000 CoAP-speaking sensors to a cloud MQTT broker. The gateway performs protocol translation. Which design challenge is MOST critical to address?",
      options: [
        "Converting UDP datagrams to TCP segments without any state",
        "Mapping CoAP confirmable/non-confirmable semantics to MQTT QoS levels, and maintaining per-device session state for QoS 1+ acknowledgments at scale",
        "Ensuring the gateway uses TLS 1.3 instead of DTLS for all sensor connections",
        "Translating CoAP binary encoding to JSON before forwarding to the MQTT broker",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the core challenge. CoAP confirmable messages (CON) map to MQTT QoS 1/2, but MQTT QoS 1 requires PUBACK to flow back to the publisher.\n\n**Step 2:** Analyze the gateway burden. The gateway must maintain per-device session state: which CoAP message ID corresponds to which MQTT packet ID for 10,000 concurrent devices.\n\n**Step 3:** Recognize the memory cost. At scale, this session state (MQTT client sessions, in-flight window tracking, CoAP retry timers) consumes significant memory. Eclipse Californium and AWS IoT Greengrass use in-memory correlation tables.\n\n**Answer:** Mapping CoAP confirmable/non-confirmable semantics to MQTT QoS levels, and maintaining per-device session state for QoS 1+ acknowledgments at scale.",
      hints: [
        "MQTT QoS 1 requires an acknowledgment to flow BACK to the original sender — who manages that state at the gateway for 10,000 devices simultaneously?",
        "Think about what happens when the cloud MQTT broker sends PUBACK: the gateway must map it back to the correct CoAP message ID on the device side.",
      ],
    },
  ],

  "sdi-iot-device-shadow": [
    {
      id: "q-iot-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "AWS IoT Device Shadow stores two sub-documents: 'desired' and 'reported'. What does the 'delta' document represent, and how does a device use it?",
      options: [
        "Delta is the timestamp difference between desired and reported updates, used for latency monitoring",
        "Delta contains only the properties where desired and reported differ; the device subscribes to the delta topic and applies changes to reconcile its actual state with the desired state",
        "Delta is a full copy of the desired state sent to the device on every update",
        "Delta records the list of devices that have not yet acknowledged the desired state change",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand delta computation. Delta = desired - reported, meaning the shadow service computes the set of properties that differ between desired and reported.\n\n**Step 2:** Know the subscription mechanism. The device subscribes to $aws/things/{thingName}/shadow/update/delta and receives only the properties that need reconciliation.\n\n**Step 3:** Apply the reconciliation loop. Device receives delta (e.g., {color: 'red'}), applies the change, publishes new reported state to confirm convergence. Works offline too.\n\n**Answer:** Delta contains only the properties where desired and reported differ; the device subscribes to the delta topic and applies changes to reconcile its actual state with the desired state.",
      hints: [
        "Delta = desired - reported (the set difference of properties that disagree).",
        "The device does not need to poll — it subscribes to the delta topic and reacts only when something changes.",
      ],
    },
    {
      id: "q-iot-8",
      type: "true-false",
      difficulty: "medium",
      question: "In the device shadow model, if an operator updates the desired state while the device is offline, the delta document is lost and the device must poll for the latest desired state when it reconnects.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "**Step 1:** Recognize that the shadow is a persistent cloud-side document, not an ephemeral message. It is stored in DynamoDB and persists regardless of device connectivity.\n\n**Step 2:** On reconnect, the device should GET the full shadow first to see any accumulated changes that occurred while offline.\n\n**Step 3:** Then subscribe to the delta topic for real-time updates. The state is never lost.\n\n**Answer:** False. The shadow persists desired state durably, and the device should GET the full shadow on reconnect to catch accumulated changes.",
      hints: [
        "The shadow is a cloud-side document, not an ephemeral message — it persists regardless of device connectivity.",
        "On reconnect, what should the device do first: subscribe to delta, or GET the full shadow to see accumulated changes?",
      ],
    },
  ],

  "sdi-iot-auth": [
    {
      id: "q-iot-9",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A fleet of 1 million IoT devices each has an X.509 client certificate provisioned at manufacturing time. The root CA is compromised. What is the most scalable approach to remediate without physically touching each device?",
      options: [
        "Revoke the root CA immediately; all devices will automatically re-enroll using their private keys",
        "Perform OTA delivery of new device certificates signed by a new CA, using the existing (still-trusted) device certificates for mutual TLS during the transition period, then revoke the old CA after all devices are updated",
        "Switch all devices to username/password authentication to bypass certificate dependency",
        "Publish a CRL (Certificate Revocation List) and rely on devices to check it before each connection",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the catch-22. Revoking the old CA immediately prevents devices from connecting to rotate their certificates.\n\n**Step 2:** Implement a grace period. The broker temporarily trusts both old (compromised) and new CA simultaneously.\n\n**Step 3:** Rotate via OTA. Devices receive new certificates signed by the new CA, update their trust store, reconnect with the new cert, and report success. Then revoke old CA.\n\n**Answer:** Perform OTA delivery of new device certificates signed by a new CA, using the existing device certificates for mutual TLS during the transition period.",
      hints: [
        "You cannot revoke the old CA before devices have a way to authenticate with the new CA — this creates a connectivity chicken-and-egg problem.",
        "The transition requires both CAs to be trusted simultaneously during the OTA rotation window.",
      ],
    },
    {
      id: "q-iot-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A TPM (Trusted Platform Module) chip is used in an IoT device for device authentication. Which property of TPM makes it superior to storing private keys in the device's filesystem?",
      options: [
        "TPM chips are faster at RSA operations than software implementations",
        "The private key is generated inside the TPM and never exposed in plaintext outside the chip boundary, making key extraction attacks (even with physical access) extremely difficult",
        "TPM provides hardware-accelerated AES-256 encryption for MQTT payloads",
        "TPM automatically rotates private keys every 90 days without device reboot",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the key difference. Filesystem-stored keys can be extracted by an attacker with OS-level access. TPM-bound keys cannot.\n\n**Step 2:** Recognize the hardware boundary. Private keys are generated inside tamper-resistant hardware and never exposed in plaintext outside the chip.\n\n**Step 3:** Verify the mechanism. When authentication is needed, the TPM signs data internally and returns only the signature. Even physical JTAG debugging cannot extract the key.\n\n**Answer:** The private key is generated inside the TPM and never exposed in plaintext outside the chip boundary, making key extraction attacks extremely difficult.",
      hints: [
        "What is the difference between 'key stored on disk' and 'key stored inside tamper-resistant hardware that never exposes it'?",
        "Even a root-privileged attacker on the OS cannot extract a TPM-bound key — the TPM is a separate compute boundary.",
      ],
    },
  ],

  "sdi-iot-ota": [
    {
      id: "q-iot-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A connected vehicle fleet uses A/B partition OTA firmware updates. After applying an update to partition B and rebooting into it, the vehicle detects a critical sensor failure. What mechanism ensures the vehicle reverts to the known-good firmware in partition A?",
      options: [
        "The cloud backend detects the sensor failure via telemetry and remotely reboots the vehicle into partition A",
        "A watchdog timer and boot health check: if the new firmware does not confirm 'boot success' within a timeout (e.g., does not call a 'commit' API), the bootloader automatically reverts to the last-known-good partition on the next reboot",
        "The user must manually select the old partition via the vehicle's settings menu",
        "The OTA client rolls back automatically after detecting any sensor reading outside normal range",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Understand the boot mechanism. After rebooting into partition B, the bootloader increments the try count.\n\n**Step 2:** Apply the confirmation pattern. New firmware runs self-tests; if tests pass, it calls a 'mark as successful' API to reset the try count.\n\n**Step 3:** Handle failure. If firmware crashes or hangs before confirming (watchdog timeout), bootloader sees unconfirmed boot and reverts to partition A.\n\n**Answer:** A watchdog timer and boot health check: if the new firmware does not confirm 'boot success' within a timeout, the bootloader automatically reverts to the last-known-good partition.",
      hints: [
        "Think of it as a 'dead man's switch': the new firmware must periodically confirm it is healthy, or the bootloader assumes it failed.",
        "Who should make the rollback decision: the cloud, the bootloader, or the new firmware itself?",
      ],
    },
    {
      id: "q-iot-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You are rolling out a critical firmware update to 500,000 Ring doorbells. Which staged deployment strategy best minimizes blast radius while balancing update velocity?",
      options: [
        "Push to all 500,000 devices simultaneously to complete the rollout in the shortest possible time",
        "Canary deployment: push to 0.1% (500) devices, monitor error rates and crash reports for 24 hours, then exponentially expand to 1% -> 5% -> 20% -> 100% with automated rollback triggers at each stage",
        "Push to all devices in a single geographic region first, then expand region by region",
        "Only update devices that have been online for more than 30 days to target the most stable fleet",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Define canary size. Start with 0.1% (500 devices) to limit blast radius of a bad update.\n\n**Step 2:** Set success criteria. Monitor crash rates, connectivity, and sensor functioning for 24 hours before expanding.\n\n**Step 3:** Implement automated abort. If failure threshold is exceeded at any stage, halt and rollback automatically.\n\n**Answer:** Canary deployment: push to 0.1% (500) devices, monitor for 24 hours, then exponentially expand to 1% -> 5% -> 20% -> 100% with automated rollback triggers.",
      hints: [
        "What is the cost of a bad update hitting 500,000 devices vs. 500 devices? That ratio drives canary sizing.",
        "Automated abort criteria are as important as the rollout schedule — who decides when to halt?",
      ],
    },
  ],

  "sdi-iot-timeseries": [
    {
      id: "q-iot-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A Nest thermostat fleet generates temperature readings every 30 seconds per device for 10 million devices. Raw data is needed for the past 7 days, but for trend analysis over 1 year, 5-minute averages are sufficient. Which time-series database feature addresses this requirement?",
      options: [
        "Sharding by device ID across multiple InfluxDB nodes to distribute write load",
        "Continuous queries and retention policies: automatically downsample raw data into 5-minute aggregates and expire raw data after 7 days using tiered retention policies",
        "Column-family storage in Cassandra with a time-bucketed row key",
        "Partitioning the table by geographic region to reduce query latency for regional dashboards",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Calculate storage needs. 10M devices x 1 reading/30s = 333K writes/sec. 1 year of 30-second readings would be enormous.\n\n**Step 2:** Implement tiered retention. Raw data goes to a 7-day bucket; a continuous query downsamples to 5-minute aggregates for the 1-year bucket.\n\n**Step 3:** Auto-expire. The 7-day bucket automatically purges raw data after 168 hours, freeing storage.\n\n**Answer:** Continuous queries and retention policies: automatically downsample raw data into 5-minute aggregates and expire raw data after 7 days.",
      hints: [
        "How much storage would 1 year of 30-second readings for 10M devices consume? Downsampling to 5-minute reduces that by 10x.",
        "Continuous queries run on the server side automatically — you do not need an external scheduler.",
      ],
    },
    {
      id: "q-iot-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A time-series database for industrial sensor data needs to support queries like: 'Find all devices whose vibration exceeded 5g in the last hour, grouped by machine type'. The fleet has 50,000 sensors each writing 10 readings/sec. Which schema design best supports this query?",
      options: [
        "Store each sensor reading as a JSON document in MongoDB with a timestamp field and a sensor_id field",
        "Use a time-series database with tag-based indexing (e.g., InfluxDB measurement with device_id, machine_type as tags and vibration as a field), enabling tag-based filtering before time-range scanning",
        "Store all readings in a single SQL table with a composite index on (timestamp, sensor_id, machine_type)",
        "Use a columnar store (Parquet on S3) with hourly partitioning and query via Athena",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Design the schema. In InfluxDB, tags are indexed (device_id, machine_type) and fields are unindexed measurements (vibration).\n\n**Step 2:** Execute the query. Filter by machine_type tag first (indexed), then scan field values within the time range.\n\n**Step 3:** Handle scale. 50K sensors x 10 readings/sec = 500K writes/sec requires TSM (InfluxDB) or hypertables (TimescaleDB).\n\n**Answer:** Use a time-series database with tag-based indexing, enabling tag-based filtering before time-range scanning.",
      hints: [
        "In InfluxDB: tags are indexed (use for filtering), fields are not indexed (use for values). Design your schema accordingly.",
        "50K sensors x 10 readings/sec = 500K writes/sec — only a purpose-built time-series engine handles this efficiently.",
      ],
    },
  ],

  "sdi-iot-pipeline": [
    {
      id: "q-iot-15",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Design an IoT data ingestion pipeline for 1 million devices each sending 1 message/second (1M msg/sec total). The pipeline must route messages to: a time-series DB, a rule engine for alerting, and a cold storage archive. What is the most appropriate architecture?",
      options: [
        "MQTT broker -> direct writes to each destination (time-series DB, rule engine, cold storage) in the broker's message handler",
        "MQTT broker -> Kafka (topics per device-type) -> multiple consumer groups: (1) Kafka Streams for rule engine, (2) InfluxDB Telegraf consumer, (3) S3 sink connector — fan-out via consumer groups, not broker-level routing",
        "MQTT broker -> a single Lambda function that writes to all three destinations synchronously per message",
        "MQTT broker -> Redis pub/sub -> application servers that write to each destination",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Use MQTT as ingestion front end. The broker collects 1M msg/sec from devices.\n\n**Step 2:** Introduce Kafka as the durable backbone. Messages are written once and consumed by multiple independent consumer groups (fan-out without coupling).\n\n**Step 3:** Route to sinks. Kafka Streams for rule engine, Telegraf for InfluxDB, S3 Sink Connector for cold storage. Enables replay if a sink falls behind.\n\n**Answer:** MQTT broker -> Kafka (topics per device-type) -> multiple consumer groups for fan-out via consumer groups, not broker-level routing.",
      hints: [
        "Kafka's consumer group model lets N independent consumers each get ALL messages without any coordination — perfect for fanout.",
        "What happens if the time-series DB goes down for 5 minutes? With Kafka, you replay from the committed offset. Without it, data is lost.",
      ],
    },
    {
      id: "q-iot-16",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In an IoT pipeline, messages from MQTT arrive at a Kafka topic. A stream processor computes a 5-minute rolling average of temperature per device for anomaly detection. Which processing guarantee is most critical here, and why?",
      options: [
        "At-most-once — because losing occasional readings is acceptable for averages",
        "Exactly-once — because duplicate temperature readings would inflate the average and trigger false anomaly alerts",
        "At-least-once — because the consumer can deduplicate readings using the device timestamp as an idempotency key before computing the average",
        "Best-effort — because network conditions make stronger guarantees impossible",
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Evaluate guarantees. Exactly-once across MQTT -> Kafka -> DB requires coordination that is difficult and adds latency.\n\n**Step 2:** Use at-least-once with deduplication. The consumer deduplicates using device timestamp or sequence number as an idempotency key.\n\n**Step 3:** Make sinks idempotent. If writing the same reading twice produces the same result, at-least-once is equivalent to exactly-once.\n\n**Answer:** At-least-once with application-level deduplication using the device timestamp as an idempotency key.",
      hints: [
        "Exactly-once across system boundaries (MQTT, Kafka, stream processor, DB) requires coordination that may not be feasible.",
        "If you can make your sink idempotent (writing the same reading twice produces the same result), at-least-once becomes equivalent to exactly-once.",
      ],
    },
  ],

  "sdi-iot-edge": [
    {
      id: "q-iot-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A smart factory has 1,000 CNC machines generating 10 KB/s of sensor data each. Sending all data to the cloud would require 10 MB/s of uplink bandwidth and incurs 50ms round-trip latency, which is too slow for real-time safety cutoffs. What edge computing pattern best solves this?",
      options: [
        "Increase the cloud instance size to process data faster and reduce latency",
        "Deploy an edge gateway (cloudlet) running local stream processing to make sub-millisecond safety decisions; send only aggregated anomaly events and summaries to the cloud for long-term analytics",
        "Install fiber optic links to reduce round-trip latency to under 5ms",
        "Use UDP instead of TCP for all machine-to-cloud communication to reduce protocol overhead",
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the problem. 50ms cloud round-trip is too slow for safety-critical CNC machine cutoffs. Bandwidth is 10 MB/s.\n\n**Step 2:** Deploy edge computing. A cloudlet co-located in the factory runs safety logic locally with sub-millisecond latency.\n\n**Step 3:** Reduce bandwidth. Only aggregated anomaly events and summaries are sent to the cloud for long-term analytics.\n\n**Answer:** Deploy an edge gateway running local stream processing for sub-millisecond safety decisions; send only aggregated events to the cloud.",
      hints: [
        "For a safety cutoff on a CNC machine, can you tolerate 50ms of cloud round-trip? What is the consequence of a 50ms delay in stopping a machine?",
        "Edge = process near the data source; cloud = long-term analytics and model updates.",
      ],
    },
    {
      id: "q-iot-18",
      type: "true-false",
      difficulty: "easy",
      question: "Fog computing and edge computing refer to the same architecture: processing happens on the end device itself (e.g., on the sensor or microcontroller) rather than in any intermediate layer.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "**Step 1:** Clarify fog computing. Cisco coined this term for a distributed compute layer BETWEEN devices and cloud — a multi-tier hierarchy.\n\n**Step 2:** Clarify edge computing. Can mean on-device processing OR nearby infrastructure like cloudlets.\n\n**Step 3:** Distinguish examples. Raspberry Pi gateway = fog node. Microcontroller running TF Lite = on-device inference. AWS Wavelength = edge computing.\n\n**Answer:** False. Fog computing is a multi-tier hierarchy (device -> fog node -> cloud), not just two layers.",
      hints: [
        "Fog computing is a Cisco-coined term for a multi-tier hierarchy — device -> fog node -> cloud — not just two layers.",
        "A sensor running a neural network is 'on-device inference'; a local server aggregating from 1,000 sensors is a 'fog node'.",
      ],
    },
  ],

  "sdi-iot-edge-inference": [
    {
      id: "q-iot-19",
      type: "multiple-choice",
      difficulty: "hard",
      question: "You need to run a defect detection model on a Cortex-M4 microcontroller with 256 KB RAM and 1 MB flash. The original PyTorch model is 45 MB. Which pipeline of techniques makes deployment feasible?",
      options: [
        "Deploy the model on AWS Lambda and call it via HTTPS from the microcontroller for each inference",
        "Quantize the model from FP32 to INT8 (4x size reduction -> ~11 MB), then apply weight pruning to remove 80% of near-zero weights (~2 MB), then convert to TensorFlow Lite FlatBuffer format optimized for ARM Cortex-M with the CMSIS-NN kernel library",
        "Use knowledge distillation to train a smaller student model (5 MB), quantize to INT8 (1.25 MB), compile with TVM for ARM Cortex-M, targeting the CMSIS-NN operator library within the 1 MB flash constraint",
        "Both B and C are valid multi-step pipelines; C (distillation + quantization + TVM compilation) produces a smaller model at the cost of training a new student model",
      ],
      correctAnswer: 3,
      explanation: "**Step 1:** Quantize from FP32 to INT8. This gives 4x reduction (45 MB -> ~11 MB), still too large for 1 MB flash.\n\n**Step 2:** Apply additional techniques. Weight pruning removes 80% of near-zero weights; knowledge distillation trains a smaller student network from scratch.\n\n**Step 3:** Compile for Cortex-M. TensorFlow Lite Micro or TVM with CMSIS-NN kernels produces code that fits in 1 MB flash.\n\n**Answer:** Both B and C are valid pipelines. Option B (prune + quantize) preserves accuracy; Option C (distill + quantize + compile) produces the smallest model.",
      hints: [
        "INT8 quantization alone gives 4x reduction (45 MB -> ~11 MB) — still too large for 1 MB flash. What else is needed?",
        "Knowledge distillation lets you design a much smaller architecture from scratch rather than compressing an existing large one.",
      ],
    },
    {
      id: "q-iot-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An IoT device runs an anomaly detection model locally (on-device inference). The device detects an anomaly. What is the MAIN advantage of on-device inference over sending raw sensor data to the cloud for inference in this scenario?",
      options: [
        "On-device inference models are always more accurate because they have access to more data",
        "On-device inference enables real-time response without network round-trip latency, ensures anomaly detection works during internet outages, and reduces bandwidth by only transmitting anomaly events instead of continuous raw data",
        "On-device inference eliminates the need for model retraining over time",
        "On-device inference models are automatically updated by the cloud without any OTA process",
      ],
      correctAnswer: 1,
        explanation: "**Step 1:** Analyze latency. On-device inference decides in microseconds vs. 10-200ms cloud round-trip.\n\n**Step 2:** Analyze availability. The device continues functioning during network outages — critical for industrial safety systems.\n\n**Step 3:** Analyze bandwidth. Instead of streaming 1 KB/s continuously, only rare anomaly events (100 bytes) are sent to the cloud.\n\n**Answer:** On-device inference enables real-time response without network latency, ensures anomaly detection works during outages, and reduces bandwidth by only transmitting anomaly events.",
      hints: [
        "What happens to a cloud-dependent system when the internet connection goes down for 10 minutes in a factory?",
        "Bandwidth = raw sensor data rate x number of devices; on-device inference can reduce this by 99%+ by only sending anomaly events.",
      ],
    },
  ],

  "sdi-iot-device-registry": [
    {
      id: "q-iot-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An IoT device registry stores metadata for 10 million devices: device ID, model, firmware version, location, owner, and group memberships. A policy engine evaluates rules like 'push update X to all Ring Pro v2 devices in California with firmware < 3.1'. Which database design best supports this query pattern?",
      options: [
        "A key-value store (Redis) with device ID as key and metadata as serialized JSON — query by iterating all keys",
        "A relational database (PostgreSQL) with indexes on model, firmware_version, and location columns, plus a device_group junction table for group memberships",
        "A document store (MongoDB) with compound indexes on {model, firmware_version, location} to support multi-attribute fleet queries efficiently",
        "Both B and C are viable; the relational model (B) enforces referential integrity for group memberships, while the document model (C) is more flexible for evolving device metadata schemas",
      ],
      correctAnswer: 3,
      explanation: "**Step 1:** Reject Redis. Key-value stores require full scan of 10M keys for multi-attribute queries — prohibitively slow.\n\n**Step 2:** Consider PostgreSQL and MongoDB. Both with compound indexes handle multi-attribute fleet queries efficiently.\n\n**Step 3:** Choose based on trade-offs. PostgreSQL enforces referential integrity; MongoDB handles schema evolution better. Both are valid.\n\n**Answer:** Both B and C are viable; the relational model enforces referential integrity, while the document model is more flexible for evolving schemas.",
      hints: [
        "The query 'all devices with firmware < 3.1 in California' requires range index on firmware_version and equality index on location — which databases support compound indexes for this?",
        "Key-value stores are optimized for single-key lookups, not multi-attribute range queries across 10M records.",
      ],
    },
  ],

  "sdi-iot-command-control": [
    {
      id: "q-iot-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A cloud backend sends a command to unlock a smart lock (a safety-critical action). The command must be delivered reliably even if the device is temporarily offline, and the backend must know definitively whether the command was executed. Design the command-and-control flow.",
      options: [
        "Publish an MQTT message with QoS 0 to the device's command topic and assume success if no error is returned within 1 second",
        "Use the device shadow: set desired.lock_state = 'unlocked', wait for reported.lock_state to update to 'unlocked' within a timeout; if timeout expires without confirmation, escalate (alert, retry, or send to field service)",
        "Send an HTTP POST to the device's IP address directly from the cloud backend",
        "Use MQTT QoS 2 with a 10-second timeout; if no PUBCOMP is received, retry indefinitely",
      ],
      correctAnswer: 1,
      explanation: "For safety-critical commands, the device shadow pattern provides: (1) Persistence — the desired state is stored even if the device is offline; (2) Confirmation — the backend monitors reported state for convergence; (3) Visibility — the delta document shows which devices have not yet executed the command; (4) Idempotency — setting desired.lock_state = 'unlocked' multiple times is safe. QoS 2 (option D) only guarantees broker delivery, not execution by the device. HTTP to device IP (option C) requires the device to have a public IP and be online at the time. QoS 0 (option A) has no delivery guarantee. The pattern is: desired -> device executes -> reports -> backend verifies reported matches desired -> closes the command. AWS IoT Jobs uses this same pattern for firmware commands.",
      hints: [
        "MQTT QoS levels guarantee message delivery to the broker, not execution on the device — what additional confirmation is needed?",
        "The device shadow 'reported' state is the device's acknowledgment that it executed the command.",
      ],
    },
  ],

  "sdi-iot-connectivity": [
    {
      id: "q-iot-23",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A soil moisture sensor runs on a single AA battery and must last 5 years. It takes a reading every 15 minutes and sends it to the cloud. Which connectivity pattern maximizes battery life?",
      options: [
        "Maintain a persistent MQTT TCP connection with keepalive pings every 60 seconds",
        "Use LoRaWAN with duty-cycled radio: wake every 15 minutes, take reading, transmit a 50-byte LoRaWAN packet in 1-2 seconds, then power off the radio and MCU entirely (deep sleep) until the next cycle",
        "Use 4G LTE with a persistent connection and send readings over HTTPS",
        "Use Bluetooth Low Energy and upload batched readings to a nearby smartphone once per hour",
      ],
      correctAnswer: 1,
      explanation: "Battery life is dominated by radio-on time. A persistent MQTT TCP connection (option A) requires keepalive pings every 60 seconds, meaning the radio is on nearly 100% of the time — completely impractical for 5-year battery life. LoRaWAN (Long Range Wide Area Network) was designed for exactly this use case: transmissions of 0.5-5 seconds, ranges of 5-15 km, and devices sleeping at <1 μA for 15 minutes between readings. The duty cycle (radio on <1% of the time) enables 5-10 year coin cell battery life. 4G LTE draws 300-500 mA during connection — a death sentence for small batteries. Bluetooth (option D) requires nearby smartphone infrastructure. LoRaWAN is used by millions of agricultural IoT sensors, smart city sensors, and utility meters for exactly this reason.",
      hints: [
        "Calculate: if the radio draws 50 mA while on, and the MCU draws 5 μA while sleeping, what fraction of time must the radio be off to last 5 years on a 3000 mAh battery?",
        "LoRaWAN's key metrics: range 5-15 km, transmission time <5 seconds, sleep current <1 μA — perfect for 15-minute periodic reporting.",
      ],
    },
  ],

  "sdi-iot-security": [
    {
      id: "q-iot-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A firmware image for a medical IoT device must be authenticated before execution to prevent unauthorized firmware from running on the device. Which secure boot mechanism provides the strongest guarantee?",
      options: [
        "The device downloads firmware over HTTPS, which provides transport security ensuring the image was not tampered with in transit",
        "The bootloader verifies an ECDSA-P256 signature on the firmware image using a public key burned into OTP (one-time programmable) memory during manufacturing; the private key never leaves an HSM and is used to sign each release build",
        "The device checks a SHA-256 hash of the firmware against a value stored in the firmware header itself",
        "The device requires a time-limited OTP code entered by a technician before accepting a new firmware image",
      ],
      correctAnswer: 1,
      explanation: "Secure boot requires three elements: (1) An immutable root of trust — the public key burned into OTP memory cannot be changed post-manufacturing, so an attacker cannot substitute their own public key; (2) Asymmetric signature verification — ECDSA-P256 proves the firmware was signed by the holder of the corresponding private key; (3) HSM-protected private key — the signing key is stored in a Hardware Security Module, never exposed in plaintext. HTTPS (option A) only protects transport, not the firmware itself — a compromised update server can still deliver malicious firmware. A hash in the firmware header (option C) is trivially bypassed — an attacker replaces both the firmware and its hash. This is the secure boot design used by ARM TrustZone, Apple Secure Enclave, and NXP's HABv4.",
      hints: [
        "Why is the hash-in-header approach (option C) insecure? Who could modify both the firmware and its hash simultaneously?",
        "OTP memory is write-once — once the public key is burned during manufacturing, it cannot be changed even with root OS access.",
      ],
    },
    {
      id: "q-iot-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An IoT fleet's device certificates need to be rotated every 90 days for compliance. The fleet has 500,000 devices. What is the most scalable zero-touch certificate rotation approach?",
      options: [
        "Email each device owner instructions to manually re-provision their device",
        "Use EST (Enrollment over Secure Transport, RFC 7030) or ACME protocol: the device uses its current valid certificate to authenticate to the certificate authority and request a new certificate before the current one expires, all without human intervention",
        "Revoke all current certificates simultaneously and require devices to re-enroll using their manufacturing-time provisioning certificate",
        "Switch to self-signed certificates that never expire, eliminating the rotation requirement",
      ],
      correctAnswer: 1,
      explanation: "EST (RFC 7030) and similar automated certificate management protocols enable devices to renew their own certificates before expiry using their current valid certificate as proof of identity — exactly like ACME (used by Let's Encrypt for web servers). The device runs a scheduled job that checks certificate expiry, contacts the EST server at /simplereenroll, authenticates with the current certificate, receives a new certificate, and atomically swaps it. This requires: (1) a reachable EST/CA server endpoint; (2) the device storing both old and new certificate during the swap; (3) the CA issuing new certificates before the old ones expire. AWS IoT Core's fleet provisioning with replacement templates and Azure IoT Hub's automatic device enrollment both implement variants of this pattern. Self-signed certificates (option D) undermine the chain of trust entirely.",
      hints: [
        "ACME is how web servers get Let's Encrypt certificates renewed automatically — what is the IoT equivalent for device certificates?",
        "The device must rotate BEFORE expiry — what triggers the renewal process, and how early should it start?",
      ],
    },
  ],

  "sdi-iot-fleet-config": [
    {
      id: "q-iot-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "You need to push a configuration change (new sampling rate: 10 Hz -> 100 Hz) to all 2 million Nest thermostats in a fleet. Some devices are offline. Which delivery mechanism ensures eventual consistency across the entire fleet?",
      options: [
        "Send a broadcast MQTT message to all devices simultaneously and log which devices acknowledge within 5 minutes",
        "Update the device shadow desired state for each device in the fleet registry; devices receive the delta when they next connect and confirm receipt by updating reported state; track convergence via shadow reported state",
        "Email all device owners asking them to restart their thermostat to apply the new configuration",
        "Use a global Kafka topic that all devices subscribe to for configuration updates",
      ],
      correctAnswer: 1,
      explanation: "The device shadow is the correct mechanism for fleet-wide configuration because it provides store-and-forward semantics: the desired state is persisted in the cloud and delivered to the device whenever it connects, even if it was offline during the push. For 2 million devices, you batch-update the shadow desired state (AWS IoT Jobs can target device groups with policies). The convergence tracking is built-in: query devices where desired.sampling_rate != reported.sampling_rate. This is exactly how Google Nest, Ring, and Amazon Echo push configuration changes — not via MQTT broadcast (no persistence) or Kafka (not designed for device-specific state with offline support).",
      hints: [
        "What happens to an MQTT broadcast message if the device is offline? What happens to a desired state update in the device shadow?",
        "Configuration convergence = when reported.sampling_rate matches desired.sampling_rate across all devices — how do you track this at fleet scale?",
      ],
    },
  ],

  "sdi-iot-time-sync": [
    {
      id: "q-iot-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An IoT sensor stores timestamps locally and uploads them when it reconnects after 12 hours offline. The device clock drifted 45 seconds during the offline period. How should the data pipeline handle this timestamp drift?",
      options: [
        "Discard all readings taken during the offline period since their timestamps are unreliable",
        "On reconnect, the device reports its current clock offset (measured against NTP server) and the pipeline applies a linear interpolation correction to all stored timestamps before ingestion",
        "Accept the drifted timestamps as-is; 45-second drift is acceptable for most IoT analytics",
        "Use the server-side ingestion timestamp as the authoritative event time, discarding the device timestamp entirely",
      ],
      correctAnswer: 1,
      explanation: "Clock drift correction is a standard challenge in disconnected IoT systems. The recommended approach: (1) The device synchronizes with an NTP server on reconnect and measures its current offset (e.g., 'my clock is 45 seconds ahead of NTP'); (2) Assuming linear drift, the offset is distributed across the offline period proportionally to the number of readings; (3) Corrected_timestamp = device_timestamp - (elapsed_time / total_offline_time) x total_drift. This linear interpolation is a reasonable approximation for quartz crystal oscillators whose drift rate is roughly constant. Alternative: embed a sequence number in each reading so the pipeline can order and re-timestamp based on relative ordering even without the absolute drift measurement. Using ingestion timestamp (option D) is wrong because it destroys event time ordering for offline data.",
      hints: [
        "The clock drifted 45 seconds over 12 hours — approximately 3.75 seconds per hour. How would you distribute this correction across stored readings?",
        "Server ingestion timestamp records when data arrived, not when the event happened — why does that matter for time-series analysis?",
      ],
    },
  ],

  "sdi-iot-compression": [
    {
      id: "q-iot-28",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A constrained IoT device must transmit structured sensor data (device_id: string, timestamp: uint32, temperature: float32, humidity: float32, battery_pct: uint8) over a LoRaWAN link with maximum payload of 51 bytes per message. Which encoding approach minimizes payload size while preserving all fields?",
      options: [
        "JSON encoding: {\"id\":\"d001\",\"ts\":1700000000,\"t\":22.5,\"h\":65.3,\"b\":85} — approximately 55 bytes",
        "CBOR (Concise Binary Object Representation) with integer keys: uses binary encoding with integer field IDs instead of string keys — approximately 20-25 bytes for this payload",
        "Protobuf with schema pre-shared between device and cloud: binary encoding with field tags — approximately 18-22 bytes",
        "Both B and C fit within 51 bytes; CBOR requires no pre-shared schema (self-describing), while Protobuf requires the .proto file to be deployed to both sides but produces slightly smaller output",
      ],
      correctAnswer: 3,
      explanation: "For constrained device payloads, both CBOR and Protobuf are viable. CBOR (RFC 7049) is a binary encoding of JSON-like data structures — using integer map keys instead of string keys reduces overhead significantly (no quotes, shorter keys). A CBOR payload with integer keys for this struct is ~20-25 bytes. Protobuf with a pre-shared schema is ~18-22 bytes. The key trade-off: CBOR is self-describing (the payload contains enough information to decode without external metadata), while Protobuf requires the .proto schema on both sides — but Protobuf produces marginally smaller output. For a LoRaWAN 51-byte limit, both fit with room to spare. JSON at 55 bytes exceeds the limit. The IETF IoT working group recommends CBOR (with SenML for sensor data) for constrained environments. AWS IoT Core and Azure IoT Hub both support CBOR-encoded MQTT payloads.",
      hints: [
        "JSON uses string keys ('temperature') — how many bytes are wasted on field names vs. an integer tag (1-2 bytes)?",
        "CBOR is essentially binary JSON; Protobuf requires a schema but produces slightly smaller output. Both beat JSON by 2-4x for structured data.",
      ],
    },
  ],

  "sdi-iot-gateway": [
    {
      id: "q-iot-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A multi-protocol IoT gateway must translate between Modbus/RTU (legacy industrial sensors), BACnet (HVAC systems), and MQTT (cloud broker). Which architectural pattern best abstracts protocol differences from the cloud backend?",
      options: [
        "Implement a separate cloud connector for each protocol (Modbus connector, BACnet connector, MQTT connector) that each write directly to the cloud with different message formats",
        "Use a canonical message model at the gateway: each protocol adapter translates raw protocol data into a unified internal schema (e.g., {device_id, timestamp, readings: [{name, value, unit}]}), then a single MQTT publisher sends all data to the cloud in the same format regardless of source protocol",
        "Forward all raw Modbus and BACnet bytes to the cloud and have the cloud parse each protocol natively",
        "Use a separate MQTT topic per protocol (modbus/sensor1, bacnet/hvac1) so the cloud can identify the source protocol from the topic name",
      ],
      correctAnswer: 1,
      explanation: "The canonical message model (also called a semantic model or device abstraction layer) is the standard pattern for multi-protocol gateways. Protocol-specific adapters (Modbus RTU parser, BACnet client, Zigbee stack) each translate their raw data into a common internal schema. A single egress component serializes this canonical format to MQTT. The cloud backend sees only MQTT messages with a consistent schema regardless of whether the data came from a 1980s Modbus sensor or a modern BLE device. This is exactly how Eclipse Kura, Azure IoT Edge modules, and AWS IoT Greengrass connectors work. Option D (protocol-per-topic) still exposes protocol heterogeneity to the cloud. Option C (raw byte forwarding) moves complexity to the cloud and requires cloud-side protocol parsers for legacy industrial protocols — impractical.",
      hints: [
        "A canonical model means: regardless of source protocol, the cloud always receives data in the same format. Who does the translation? The gateway.",
        "Pushing Modbus binary frames to the cloud requires the cloud to implement a Modbus parser — is that where you want this complexity?",
      ],
    },
  ],

  "sdi-iot-smart-home": [
    {
      id: "q-iot-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A smart home hub (like Google Nest Hub or Amazon Echo) needs to control 50 smart home devices locally with <100ms response time. The cloud is used for voice processing and remote access. How should the local vs. cloud processing boundary be designed, and what happens during an internet outage?",
      options: [
        "All commands are routed through the cloud; local processing is not implemented because it requires maintaining duplicate logic",
        "The hub runs a local Matter/Thread border router and a local automation engine: device commands execute locally via mDNS/Thread without any cloud round-trip; the cloud syncs state and handles voice/remote access; during outage, all local automations and device controls continue functioning normally",
        "During outage, the hub displays 'No internet connection' and all controls are disabled until connectivity is restored",
        "Use WebSockets to maintain a persistent bidirectional connection to the cloud with automatic reconnection to minimize outage impact",
      ],
      correctAnswer: 1,
      explanation: "The Matter protocol (formerly Project CHIP, backed by Apple, Google, Amazon, Samsung) was specifically designed to solve local control reliability. A Matter-compliant hub acts as a Thread Border Router: devices on the Thread mesh network communicate locally via IPv6 without any cloud dependency. The local automation engine (running on the hub) processes 'when motion detected -> turn on light' rules without internet. The cloud layer handles: (1) voice assistant processing (requires internet); (2) remote access from outside the home network; (3) cross-ecosystem integration. During outage: local commands, automations, and schedules all work; only voice commands and remote access fail. This is the architecture Apple HomeKit local control, Google Home (offline routines), and Amazon Alexa Local Voice Control all implement.",
      hints: [
        "What is the user experience if a cloud-dependent smart lock stops working during a 2-hour internet outage? Is that acceptable?",
        "Matter/Thread enables IPv6 mesh networking among devices so they can communicate without any cloud dependency — the hub is just a border router.",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
