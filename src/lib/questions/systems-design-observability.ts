import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-obs-pillars": [
    {
      id: "q-sdi-obs-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which three signals are widely considered the three pillars of observability in distributed systems?",
      options: [
        "Logs, metrics, and traces",
        "Alerts, dashboards, and runbooks",
        "CPU utilization, memory usage, and disk I/O",
        "Uptime, latency, and throughput",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Recall that distributed systems problems require understanding what happened (not just whether the system is up).\n" +
        "**Step 2:** Think about the three data types that different observability tools like Datadog, Honeycomb, and Jaeger specialize in — each addresses a different dimension of system behavior.\n" +
        "**Step 3:** Logs provide discrete event records, metrics provide numeric time-series measurements, and traces provide end-to-end request flow visibility. Together they answer 'what happened', 'how bad is it', and 'where did it happen'.",
      hints: [
        "Think about the three data types that different observability tools like Datadog, Honeycomb, and Jaeger specialize in.",
        "One signal is textual and event-driven, one is numeric and time-series, and one is graph-shaped showing request flow.",
      ],
    },
    {
      id: "q-sdi-obs-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When deciding between logs, metrics, and traces for a given observability need, which statement best describes the core tradeoff?",
      options: [
        "Logs have zero cardinality cost; metrics are the most expensive; traces are free after sampling.",
        "Metrics are cheap to store and query at scale but lose per-request detail; logs retain full event context but are expensive at high volume; traces provide causal chains but add per-request overhead.",
        "Traces replace logs entirely for microservices because they contain all log data inline.",
        "Metrics and traces are redundant — teams should pick one and discard the other.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Consider the cost structure of each pillar — metrics are pre-aggregated numeric data, logs are rich per-event records, and traces capture causal chains.\n" +
        "**Step 2:** Evaluate storage and query efficiency: metrics can be stored and queried at scale cheaply because they are pre-aggregated, but you lose individual request details.\n" +
        "**Step 3:** Logs retain rich context (stack traces, user IDs, payloads) but become expensive at high volume. Traces reconstruct request paths across services but require instrumentation everywhere and add per-request overhead even with sampling.",
      hints: [
        "Consider: a metric can tell you your p99 latency spiked, but can it tell you which specific user request was slow and why?",
        "Think about what happens to log storage costs when you have 10,000 requests per second each emitting 10 log lines.",
      ],
    },
  ],

  "sdi-obs-metrics": [
    {
      id: "q-sdi-obs-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A Prometheus instance starts experiencing severe memory pressure and slow queries. The team discovers that a single metric has 50 million unique time series. What is the most likely root cause and the correct mitigation?",
      options: [
        "Too many scrape targets; reduce scrape interval from 15s to 60s.",
        "High-cardinality labels such as user_id or request_id on the metric, causing label explosion; remove or hash high-cardinality dimensions.",
        "The metric is a histogram type with too many buckets; switch to a summary type.",
        "Prometheus is running out of disk IOPS; move to SSD storage.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recognize that Prometheus memory scales linearly with the number of active time series, where a time series is a unique combination of metric name plus all label key-value pairs.\n" +
        "**Step 2:** Identify that high-cardinality labels (user_id, request_id, URL paths with many unique values) create millions of unique series for a single metric.\n" +
        "**Step 3:** Remove or hash high-cardinality labels from Prometheus metrics. Use distributed tracing or log analysis for per-user analysis instead, keeping Prometheus labels to low-cardinality dimensions (region, service, status_code, method).",
      hints: [
        "Prometheus memory usage scales linearly with the number of active time series. A time series is a unique combination of metric name + all label key-value pairs.",
        "If a label has millions of distinct values (user_id, trace_id, URL path), each value creates a separate time series.",
      ],
    },
    {
      id: "q-sdi-obs-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A batch job runs for 45 minutes and then exits. The team wants to track its duration and exit status in Prometheus, but the job is gone before Prometheus can scrape it. What is the correct solution?",
      options: [
        "Increase the Prometheus scrape interval to 60 minutes so it captures the job.",
        "Use the Prometheus Pushgateway: the batch job pushes its metrics to the gateway on completion, and Prometheus scrapes the gateway.",
        "Switch the batch job to a long-running daemon that exposes a /metrics endpoint.",
        "Write the metrics directly to the Prometheus TSDB files on disk after the job completes.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recognize that Prometheus uses a pull model — it scrapes /metrics endpoints at configured intervals. A batch job that terminates before the scrape occurs will never be captured.\n" +
        "**Step 2:** Recall that the Pushgateway is designed for this exact use case: it acts as an intermediary that accepts pushed metrics and holds them for Prometheus to pull.\n" +
        "**Step 3:** The batch job pushes its metrics (duration, exit code, records processed) to the Pushgateway before exiting. Note that the Pushgateway is not suitable for service-level metrics because it does not clear stale metrics automatically.",
      hints: [
        "Prometheus's pull model assumes a running target. What happens if the target terminates before the scrape?",
        "The Pushgateway acts as an intermediary that accepts pushed metrics and holds them for Prometheus to pull.",
      ],
    },
    {
      id: "q-sdi-obs-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which Prometheus metric type should you use to track the number of HTTP requests completed, and which should you use to track the current number of active connections?",
      options: [
        "Histogram for request count; gauge for active connections",
        "Counter for request count (monotonically increasing); gauge for active connections (can go up and down)",
        "Gauge for both, because both values change over time",
        "Summary for request count; counter for active connections",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Determine whether each metric can decrease. The total number of completed HTTP requests only increases (or resets to zero on restart), while active connections can go up and down.\n" +
        "**Step 2:** Match each metric type to its behavior: a counter is monotonically increasing and ideal for cumulative counts like total requests — use rate() or increase() in PromQL to compute per-second rates.\n" +
        "**Step 3:** A gauge represents current state that can fluctuate arbitrarily (active connections, queue depth, memory usage) and is correct for metrics that go up and down.",
      hints: [
        "Can the total number of completed HTTP requests ever decrease? Can the number of active connections decrease?",
        "Use counter + rate() for 'how many per second'; use gauge for 'how many right now'.",
      ],
    },
  ],

  "sdi-obs-tracing": [
    {
      id: "q-sdi-obs-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "How does the W3C TraceContext standard propagate distributed trace context across service boundaries in an HTTP-based microservices architecture?",
      options: [
        "Each service reads the trace ID from a shared Redis key before handling the request.",
        "The trace ID and span ID are injected into HTTP headers (traceparent and tracestate) by the calling service and extracted by the receiving service.",
        "A central tracing server assigns trace IDs out-of-band and services poll for their current trace ID.",
        "Trace context is appended to the HTTP body as a JSON field by a proxy sidecar.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand that W3C TraceContext (RFC 7230) defines two HTTP headers for context propagation: 'traceparent' encodes version, trace-id, parent-id, and trace-flags; 'tracestate' carries vendor-specific metadata.\n" +
        "**Step 2:** When Service A calls Service B, Service A injects these headers. Service B extracts them, creates a child span with the received trace-id and parent-id, and propagates them to downstream calls.\n" +
        "**Step 3:** This creates a causally connected tree of spans across all services. OpenTelemetry SDKs handle this injection and extraction automatically through propagator plugins.",
      hints: [
        "Context propagation must work across process and network boundaries. What mechanism do HTTP services have for passing metadata?",
        "Look at the traceparent header format: 00-<trace-id>-<parent-span-id>-<flags>",
      ],
    },
    {
      id: "q-sdi-obs-7",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the fundamental difference between head-based sampling and tail-based sampling in distributed tracing, and why does Honeycomb and Jaeger's adaptive sampling favor tail-based approaches?",
      options: [
        "Head-based sampling makes the sampling decision at the start of a request before any spans are collected; tail-based sampling makes the decision after the full trace is complete, allowing sampling based on trace characteristics like errors or high latency.",
        "Head-based sampling samples the first span; tail-based sampling samples the last span in a trace.",
        "Head-based sampling is more accurate; tail-based sampling is used only when data volume is too high.",
        "Tail-based sampling discards all successful requests; head-based sampling discards all failed requests.",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Identify when each approach makes its sampling decision: head-based sampling decides at the start of a request (at the root service) before knowing whether the trace will be interesting.\n" +
        "**Step 2:** Recognize that tail-based sampling buffers all spans and decides after the full trace is assembled, allowing retention rules based on trace characteristics (errors, high latency).\n" +
        "**Step 3:** Tail-based sampling guarantees 100% of error traces and slow traces are retained while downsampling boring successful-fast traces, at the cost of requiring a stateful aggregation layer.",
      hints: [
        "At what point in the request lifecycle does each approach make its sampling decision?",
        "Which approach can guarantee that every 500-error trace is always sampled, regardless of overall traffic rate?",
      ],
    },
    {
      id: "q-sdi-obs-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A microservices system uses distributed tracing with 5% head-based sampling. The team notices that most sampled traces look healthy but incidents are hard to debug. What is the architectural problem and the best mitigation?",
      options: [
        "5% sampling is too high; reduce to 1% to lower overhead and improve query performance.",
        "Head-based sampling at 5% statistically discards 95% of all traces including 95% of error traces; switch to tail-based sampling or use dynamic sampling that always keeps 100% of error and high-latency traces.",
        "The problem is that spans are dropped due to network congestion; add more collector replicas.",
        "Tracing agents are too slow; switch to a lower-overhead binary protocol instead of HTTP.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Calculate the impact of uniform 5% head-based sampling: roughly 95% of error traces are discarded, leaving very few traces available for debugging when an incident occurs.\n" +
        "**Step 2:** Understand that dynamic or tail-based sampling solves this by always sampling 100% of error traces (5xx responses, exceptions) and slow traces (above p99 latency threshold), applying aggressive downsampling only to successful fast traces.\n" +
        "**Step 3:** Implement tail-based sampling using OpenTelemetry Collector's probabilistic sampling processor, Honeycomb Refinery, or Grafana Tempo's tail-based sampling to define rules like 'keep all spans where at least one span has status=error'.",
      hints: [
        "If you get 1000 errors per hour and sample at 5%, how many error traces do you actually capture for debugging?",
        "Tail-based sampling lets you define rules like: 'keep all spans from any trace where at least one span has status=error'.",
      ],
    },
  ],

  "sdi-obs-logging": [
    {
      id: "q-sdi-obs-9",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A log aggregation pipeline uses Fluentd to collect logs, Kafka as a buffer, and Elasticsearch for indexing and search. What is the primary purpose of Kafka in this pipeline?",
      options: [
        "Kafka compresses logs before they reach Elasticsearch to reduce storage costs.",
        "Kafka acts as a durable, high-throughput buffer that decouples log producers from Elasticsearch, absorbing traffic spikes and preventing back-pressure from overwhelming collectors.",
        "Kafka indexes log fields for fast full-text search before forwarding to Elasticsearch.",
        "Kafka provides role-based access control for log data, filtering out sensitive fields.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recognize that log generators (applications, syslog, containers) can produce logs in sudden bursts during incidents — exactly when observability data is most critical.\n" +
        "**Step 2:** Understand that without a buffer, these bursts would overwhelm Elasticsearch's indexing capacity, causing data loss or back-pressure that could affect application performance.\n" +
        "**Step 3:** Kafka serves as a shock absorber: its durable, partitioned log retains data for configurable periods, allowing Elasticsearch indexers to process at their own pace. Kafka also enables log data to be consumed by multiple downstream systems simultaneously.",
      hints: [
        "What happens to a pipeline with no buffer if Elasticsearch becomes temporarily unavailable or slow?",
        "Think about the producer-consumer pattern: Kafka lets producers and consumers operate at different rates.",
      ],
    },
    {
      id: "q-sdi-obs-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the key advantage of structured logging (JSON format with explicit fields) over unstructured plain-text log messages?",
      options: [
        "JSON logs are smaller in bytes than plain text, reducing storage costs significantly.",
        "Structured logs have machine-parseable fields that can be indexed, filtered, and aggregated without fragile regex parsing, enabling reliable log queries and correlation by fields like trace_id or user_id.",
        "JSON is the only format supported by modern log aggregation systems like Elasticsearch.",
        "Structured logs encrypt sensitive data automatically before writing to disk.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Consider the fragility of parsing unstructured logs: log lines like 'ERROR user 12345 failed payment' require custom regex patterns that break silently if the log format changes slightly.\n" +
        "**Step 2:** Recognize that structured logs emit JSON like {\"level\":\"error\",\"user_id\":12345,\"event\":\"payment_failed\",\"amount\":99.99,\"trace_id\":\"abc123\"} where every field is explicit, typed, and directly indexable.\n" +
        "**Step 3:** Log systems can filter by user_id=12345, group by event type, compute P99 of amount for failed payments, or join logs to traces by trace_id — all without any parsing logic.",
      hints: [
        "How would you extract the user_id from 'ERROR user 12345 failed' versus from {\"user_id\": 12345, \"event\": \"payment_failed\"}?",
        "Correlation IDs (trace_id, request_id) in structured fields allow you to find all log lines for a single request instantly.",
      ],
    },
    {
      id: "q-sdi-obs-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A team stores 30 days of logs in Elasticsearch (hot tier, SSD) but storage costs are spiraling. The logs are only actively searched in the first 3 days after ingestion. What architecture should they implement?",
      options: [
        "Delete all logs older than 3 days to reduce costs.",
        "Implement hot-warm-cold tiering: keep 3 days on hot SSD nodes, move 3-30 days to warm HDD nodes at lower cost, and archive logs older than 30 days to S3 or GCS at near-zero cost using Elasticsearch ILM policies.",
        "Compress all logs with gzip in Elasticsearch to reduce storage by 10x without changing architecture.",
        "Switch from Elasticsearch to a relational database like PostgreSQL which has better compression for log data.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Identify the cost problem: Elasticsearch hot tier (SSD) is expensive storage for data that is rarely accessed after 3 days.\n" +
        "**Step 2:** Leverage Elasticsearch Index Lifecycle Management (ILM) tiered storage: hot tier uses fast SSDs for recent data with high write throughput; warm tier (HDD) is used after 3 days for searchable but less frequently accessed data.\n" +
        "**Step 3:** Archive indices older than 30 days to object storage (S3, GCS) at roughly 50x lower cost. Logs can still be searched via Elasticsearch searchable snapshots or tools like Athena. S3 archival costs approximately $0.023 per GB vs $0.10-0.20 per GB for SSD-backed hot tier.",
      hints: [
        "You need searchability for recent logs and cheap storage for older logs. Does a single tier optimize both goals?",
        "Object storage like S3 costs roughly $0.023/GB vs $0.10-0.20/GB for SSD-backed hot tier storage.",
      ],
    },
  ],

  "sdi-obs-slo": [
    {
      id: "q-sdi-obs-12",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the correct relationship between SLI, SLO, and SLA in Google SRE's reliability framework?",
      options: [
        "SLA is the most granular (measured), SLI is the target, SLO is the legal agreement.",
        "SLI is the measured metric (e.g., request success rate); SLO is the target for that metric (e.g., 99.9%); SLA is the contractual commitment to customers with financial consequences for breach.",
        "SLO and SLA are synonymous; SLI is the monitoring tool that measures them.",
        "SLI is defined per team, SLO per product, and SLA per company.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Establish the measurement: SLI (Service Level Indicator) is the quantitative measurement of service behavior, such as the fraction of HTTP requests returning 2xx within 200ms.\n" +
        "**Step 2:** Set the target: SLO (Service Level Objective) is the target value for that SLI over a time window, for example 99.9% of requests succeeding over a 30-day rolling window.\n" +
        "**Step 3:** Formalize the contract: SLA (Service Level Agreement) is the formal contract with customers specifying the SLO and financial consequences (refunds, credits, penalties) if it is breached. SLAs are typically set conservatively looser than internal SLOs to give engineering teams buffer.",
      hints: [
        "Think of the three as: measure (SLI), target (SLO), and contract (SLA).",
        "Which one has financial penalties attached to it if breached?",
      ],
    },
    {
      id: "q-sdi-obs-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A service has a 99.9% availability SLO over a 30-day window. The error budget is exhausted with 10 days remaining in the window. According to Google SRE error budget policy, what should happen?",
      options: [
        "The SRE team should immediately roll back all changes made in the past 30 days.",
        "Engineering should freeze non-critical feature deployments, focus engineering effort on reliability improvements, and refrain from taking on additional risk until the budget renews.",
        "The SLO should be lowered to 99.5% to accommodate the current reliability level.",
        "Customer-facing traffic should be throttled by 10% to reduce the chance of additional errors.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Calculate the error budget: a 99.9% availability SLO over 30 days allows approximately 43.2 minutes of downtime. Exhausting it early means the service has been less reliable than promised.\n" +
        "**Step 2:** Apply Google SRE's error budget policy: when the budget is exhausted, the product and SRE teams jointly freeze risky changes (feature launches, infrastructure migrations, config changes) until reliability improves and the budget renews.\n" +
        "**Step 3:** Recognize that this creates direct incentive for developers to care about reliability — excessive reliability incidents block their ability to ship features. The error budget framework makes the reliability-velocity tradeoff explicit and quantified.",
      hints: [
        "The error budget is a shared resource between the product team (wants to ship features) and the SRE team (wants reliability).",
        "What does it signal when you've used your entire 30-day error budget with 10 days remaining?",
      ],
    },
    {
      id: "q-sdi-obs-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A team wants to alert on SLO burn rate rather than raw error rate. A 99.9% availability SLO has an error budget of 43.2 minutes per 30 days. What is the burn rate, and why is a burn rate of 14.4x the basis for a 1-hour alert window?",
      options: [
        "Burn rate 14.4x means the error budget is consumed 14.4 times faster than normal; at this rate the 30-day budget is exhausted in roughly 2 hours, justifying an urgent 1-hour alert window.",
        "Burn rate 14.4x means 14.4% of requests are failing; the 1-hour window is arbitrary.",
        "Burn rate is the number of errors per second; 14.4x means 14.4 errors per second which triggers the alert.",
        "Burn rate 14.4x means latency is 14.4x above SLO threshold; 1-hour window smooths out spikes.",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Define burn rate as a multiplier: a burn rate of 1x means consuming the error budget at exactly the rate that would exhaust it in 30 days. A burn rate of 14.4x means burning budget 14.4 times faster.\n" +
        "**Step 2:** Calculate the impact: at 14.4x burn rate, the 30-day budget (43.2 minutes) is exhausted in 30 days / 14.4 = approximately 2 days.\n" +
        "**Step 3:** Determine the alert threshold: if this rate persists for 1 hour, you've consumed 1hr * 14.4 / (30 * 24 hrs) = approximately 2% of the monthly budget in one hour — enough to justify paging an on-call engineer immediately.",
      hints: [
        "If your monthly budget is 43.2 minutes and you're burning at 14.4x, how long until the budget is gone?",
        "Burn rate alerting is designed so that a page only fires when the SLO is genuinely at risk, not for brief transient errors.",
      ],
    },
  ],

  "sdi-obs-alerting": [
    {
      id: "q-sdi-obs-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the difference between symptom-based alerting and cause-based alerting, and which does Google SRE recommend as the primary alerting strategy?",
      options: [
        "Symptom-based alerts trigger on user-visible impact (high error rate, high latency); cause-based alerts trigger on infrastructure signals (CPU high, disk full). Google SRE recommends symptom-based as primary because causes are numerous but symptoms directly measure user impact.",
        "Cause-based alerts are more accurate; Google SRE recommends cause-based as the primary strategy.",
        "Both strategies are equivalent; the choice depends on team preference.",
        "Symptom-based alerts are used for on-call pages; cause-based alerts are used only for capacity planning.",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1:** Distinguish the trigger sources: symptom-based alerts fire when users are actually experiencing problems (high 5xx error rates, elevated p99 latency, failed health checks), directly measuring SLO breach risk.\n" +
        "**Step 2:** Identify the limitation of cause-based alerting: it fires on infrastructure signals (high CPU, low disk space, memory pressure) which may or may not lead to user impact — you can have high CPU with no user impact (alert noise) or have user impact from an unanticipated cause.\n" +
        "**Step 3:** Follow Google SRE's recommendation: alert primarily on symptoms (your SLIs) and use cause-based signals as diagnostics, not as the primary paging mechanism.",
      hints: [
        "Which alert would you rather get at 3am: 'CPU is 90%' or '5% of user requests are failing'?",
        "Think about which signal most directly maps to whether your users are having a bad experience.",
      ],
    },
    {
      id: "q-sdi-obs-16",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A team's on-call engineers are getting paged 20 times per week on alerts that resolve on their own without any action. What is this pattern called, and what are the two primary strategies to fix it?",
      options: [
        "This is called alert spam; fix it by disabling all non-critical alerts permanently.",
        "This is alert fatigue from noisy alerts; fix it by (1) raising alert thresholds so only actionable signals page and (2) adding minimum duration requirements so transient spikes do not trigger pages.",
        "This is false positive alerting; fix it by switching from metrics-based to log-based alerting.",
        "This is normal on-call volume; SRE teams should aim for at least 15 pages per week to stay sharp.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recognize the danger: alert fatigue occurs when engineers receive so many noisy, non-actionable alerts that they begin to ignore or auto-acknowledge pages without investigating — a pattern that leads to real incidents being missed.\n" +
        "**Step 2:** Apply the first fix: raise thresholds so only pages fire when the error rate or latency exceeds a level that actually threatens the SLO.\n" +
        "**Step 3:** Apply the second fix: add for-duration clauses so alerts only fire if the condition persists for 5+ minutes, eliminating transient spikes. Additionally, review alerts weekly to delete alerts that have never required action in the past 3 months.",
      hints: [
        "If 80% of your pages require no action, what does that do to the on-call engineer's response to the 20% that are real?",
        "A useful heuristic: if you can't describe exactly what action to take when an alert fires, it should not page anyone.",
      ],
    },
    {
      id: "q-sdi-obs-17",
      type: "true-false",
      difficulty: "easy",
      question: "According to blameless postmortem culture (as practiced at Google, Etsy, and PagerDuty), the primary goal of a postmortem is to identify and punish the engineer whose mistake caused the incident.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation:
        "**Step 1:** Understand the core assumption: blameless postmortems assume that engineers act with good intentions given the information they had at the time.\n" +
        "**Step 2:** Recognize the true goal: understanding systemic factors — what in the system, process, or tooling made this failure possible — and implementing improvements that prevent recurrence.\n" +
        "**Step 3:** Acknowledge the harm of blame: punishing individuals suppresses future incident reporting (people hide mistakes to avoid blame) and fails to address underlying systemic issues. A blameless culture leads to richer postmortems, faster learning, and more reliable systems.",
      hints: [
        "If engineers fear blame, will they accurately report what they did before and during an incident?",
        "Is a single engineer's mistake usually the root cause, or are there systemic factors that enabled it?",
      ],
    },
  ],

  "sdi-obs-correlation": [
    {
      id: "q-sdi-obs-18",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An on-call engineer sees a spike in the p99 latency metric for the checkout service. Describe the ideal multi-signal investigation workflow using all three observability pillars.",
      options: [
        "Restart all checkout service instances immediately; check metrics afterwards to confirm resolution.",
        "From the latency metric spike, pivot to distributed traces filtered to that time window to find slow spans; identify the slow span's service and operation; then pivot to structured logs for that service with the trace_id to find specific error messages or slow queries; correlate with infrastructure metrics (CPU, memory, DB connections) to identify root cause.",
        "Check CPU and memory metrics on all hosts; if they look normal, escalate to the database team.",
        "Search all log lines for the word 'error' in the time window; the root cause will be in the first result.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Start with metrics to identify 'what' and 'how bad': p99 latency spiked at 14:32, establishing the time window and scope of the problem.\n" +
        "**Step 2:** Pivot to traces to identify 'where': filter traces from 14:30-14:35 with duration greater than 2 seconds; find that 80% of slow traces have a long span on the payment-processor service's database call.\n" +
        "**Step 3:** Pivot to logs to identify 'why': filter structured logs for payment-processor with trace_id from slow traces; find 'connection pool exhausted: max_connections=50 reached'. Infrastructure metrics (DB connection count) confirm the root cause.",
      hints: [
        "Each pillar answers a different question: metrics=what/how bad, traces=where in the call chain, logs=why specifically.",
        "The trace_id is the key that links a trace to all its associated log lines across all services.",
      ],
    },
    {
      id: "q-sdi-obs-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is OpenTelemetry and why is it significant for the observability ecosystem?",
      options: [
        "OpenTelemetry is Grafana's open-source metrics database, competing with Prometheus.",
        "OpenTelemetry is a CNCF vendor-neutral instrumentation standard that provides SDKs, APIs, and a collector for generating and exporting logs, metrics, and traces to any backend, eliminating vendor lock-in.",
        "OpenTelemetry is a managed observability SaaS platform offered by the OpenTelemetry Foundation.",
        "OpenTelemetry is a protocol for encrypting observability data in transit between services and collectors.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recognize that OpenTelemetry (OTel) is a CNCF project that merges OpenCensus and OpenTracing into a single, vendor-neutral standard.\n" +
        "**Step 2:** Understand what OTel provides: language SDKs (Go, Java, Python, JS, etc.) for instrumenting applications to emit spans, metrics, and logs using a common API; the OpenTelemetry Collector for processing and exporting to multiple backends.\n" +
        "**Step 3:** Appreciate the key benefit: instrument once with OTel SDKs and switch or add observability backends (Jaeger, Tempo, Datadog, Dynatrace, etc.) without re-instrumenting code. Datadog, Honeycomb, Grafana, AWS X-Ray, and Google Cloud Trace all accept OTLP.",
      hints: [
        "Before OTel, switching from Jaeger to Datadog required re-instrumenting all your application code with a new SDK.",
        "OTel = the USB-C of observability — one standard interface that works with many backends.",
      ],
    },
  ],

  "sdi-obs-synthetic": [
    {
      id: "q-sdi-obs-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the purpose of synthetic monitoring using canary probes (e.g., Prometheus Blackbox Exporter), and how does it complement real user monitoring (RUM)?",
      options: [
        "Synthetic monitoring replaces RUM entirely since it is more reliable and controllable.",
        "Synthetic monitoring proactively tests endpoints from external locations at regular intervals to detect outages and measure availability/latency before or independent of real user traffic; RUM captures actual user experience including client-side rendering and geographic variation, complementing synthetic's controlled baseline.",
        "Synthetic monitoring only tests internal service health; RUM only tests external CDN performance.",
        "Synthetic probes generate production-like load to stress-test systems; RUM is passive observation only.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand synthetic monitoring: it runs scripted probes (HTTP checks, browser scripts) on a schedule against endpoints from multiple geographic locations, detecting outages when there is no real user traffic (e.g., at 3am).\n" +
        "**Step 2:** Recognize what synthetic catches: regional availability differences, slow DNS or TLS handshake times, infrastructure-level issues proactively.\n" +
        "**Step 3:** Understand RUM complement: RUM instruments real browsers to capture Core Web Vitals (LCP, FID, CLS), JavaScript errors, and third-party resource load times that only appear under real-world conditions — things synthetic probes (which do not render the full page) would miss.",
      hints: [
        "What happens to your synthetic monitors at 3am when no users are visiting your site? What happens to your RUM data?",
        "RUM can detect a slow third-party font CDN that synthetic probes (which don't render the full page) would miss.",
      ],
    },
    {
      id: "q-sdi-obs-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A team uses the USE method for infrastructure dashboards and the RED method for service dashboards. What metrics does each method focus on?",
      options: [
        "USE: Uptime, Speed, Errors; RED: Requests, Errors, Duration",
        "USE: Utilization, Saturation, Errors (for infrastructure resources like CPU, memory, disks); RED: Rate, Errors, Duration (for services/microservices — request throughput, error rate, and latency)",
        "USE: User, Service, Endpoint metrics; RED: Real-time, Event, Data metrics",
        "Both methods measure the same thing but USE is for on-premises and RED is for cloud environments.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Know USE (Brendan Gregg's method): focuses on infrastructure resources (CPUs, disks, network interfaces, memory) using Utilization (how busy is the resource), Saturation (how much work is queued), and Errors (hardware or driver errors).\n" +
        "**Step 2:** Know RED (Tom Wilkie's method): focuses on services using Rate (requests per second), Errors (error rate or error ratio), and Duration (latency distribution — p50, p99).\n" +
        "**Step 3:** Apply correctly: USE answers 'is my infrastructure healthy?' while RED answers 'is my service healthy from a user perspective?' Grafana Kubernetes and Node Exporter dashboards use USE for nodes; service mesh dashboards (Istio, Linkerd) use RED for services.",
      hints: [
        "USE starts with the physical or virtual resource; RED starts with the user request.",
        "Which method would you use to diagnose a saturated network interface? Which to diagnose slow API responses?",
      ],
    },
  ],

  "sdi-obs-capacity": [
    {
      id: "q-sdi-obs-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A team wants to use metrics for capacity planning for their database cluster. Which signals should they monitor to predict when to scale, and what is the danger of relying solely on CPU utilization?",
      options: [
        "Monitor only CPU; if CPU is below 80% the cluster is healthy and does not need scaling.",
        "Monitor CPU, memory, disk IOPS, connection pool saturation, and replication lag together; CPU alone is misleading because a database can be CPU-idle but saturated on disk I/O, connections, or memory, causing degraded performance before CPU becomes the bottleneck.",
        "Monitor only disk space; databases fail when disk is full, not when CPU is high.",
        "Monitor query throughput (queries/sec) only; this is the single most predictive metric for database capacity.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recognize that databases commonly hit bottlenecks first in resources other than CPU: disk I/O (high read/write latency at IOPS limits), memory (buffer pool exhaustion causing disk reads), connection pool saturation (max_connections reached), replication lag, and lock contention.\n" +
        "**Step 2:** Understand the danger of CPU-only monitoring: a database instance can fail to handle load while showing only 30% CPU — what other resources might be saturated?\n" +
        "**Step 3:** Apply a multi-signal approach using the USE method across all resource dimensions and establish scaling thresholds (alert when disk I/O exceeds 70% of provisioned IOPS sustained for 10 minutes) rather than reacting to outages.",
      hints: [
        "A database instance can fail to handle load while showing only 30% CPU — what other resources might be saturated?",
        "Think about all the resources a database touches: CPU, RAM (buffer pool), disk I/O, network, file descriptors, connections.",
      ],
    },
    {
      id: "q-sdi-obs-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An engineering team wants to implement per-team infrastructure cost attribution dashboards. What is the most scalable architectural approach for attributing cloud resource costs to individual product teams?",
      options: [
        "Manually review the AWS Cost Explorer monthly and split the total bill equally among all teams.",
        "Apply consistent resource tagging (team, service, environment labels) to all cloud resources at provisioning time, use cloud cost APIs or tools like AWS Cost and Usage Reports, and build dashboards that group and aggregate costs by these tags; enforce tagging via infrastructure-as-code policies.",
        "Use a dedicated cloud account per team so costs are naturally separated at the account level.",
        "Monitor CPU and memory usage per container and multiply by the per-core cloud instance price.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recognize that without tags, there is no scalable way to attribute costs to teams — you cannot determine which team's service is responsible for a $50,000 RDS cluster.\n" +
        "**Step 2:** Implement consistent resource tagging: every cloud resource (EC2 instance, RDS, S3 bucket, EKS node pool, Lambda function) is tagged with metadata like {team: payments, service: checkout-api, env: production}.\n" +
        "**Step 3:** Build cost dashboards: AWS Cost and Usage Reports export detailed per-resource costs with tags to S3 for analysis. Tools like Infracost, CloudHealth, Apptio Cloudability, or Grafana Cloud Cost Management build dashboards from these tagged costs. Enforce tagging through policy-as-code in Terraform/CDK.",
      hints: [
        "Without tags, how would you know which team's service is responsible for a $50,000 RDS cluster?",
        "Tags are metadata attached to cloud resources at creation time; cost reports aggregate costs by these tags.",
      ],
    },
  ],

  "sdi-obs-anomaly": [
    {
      id: "q-sdi-obs-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A team wants to detect anomalies in their request rate metric automatically without setting static thresholds. What are the tradeoffs between Z-score based detection, MAD (Median Absolute Deviation), and ML-based seasonal decomposition approaches?",
      options: [
        "All three approaches are equivalent in accuracy; choose based on implementation simplicity.",
        "Z-score assumes normal distribution and is sensitive to outliers in the mean; MAD is more robust to outliers by using median; ML-based seasonal decomposition (e.g., Prophet, SARIMA) handles weekly/daily seasonality and trend but requires training data and is expensive to run at scale.",
        "Z-score only works for static metrics; MAD only works for time series; ML works for both.",
        "MAD is always the best choice because it has no false positives; Z-score and ML have unacceptable false positive rates.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand Z-score: it measures (x - mean) / std and works well for normally distributed stationary metrics, but is distorted by past anomalies that inflate the mean and standard deviation.\n" +
        "**Step 2:** Understand MAD: it replaces mean/standard deviation with median/median-absolute-deviation, making it more robust to outliers, but neither handles seasonality.\n" +
        "**Step 3:** Understand ML-based approaches: Facebook Prophet or SARIMA model trend and weekly/daily seasonality to produce dynamic baselines, but require training data and cannot run inline on streaming data. Tradeoffs: Z-score is O(1) per point; Prophet requires minutes of training on weeks of data.",
      hints: [
        "If your metric spikes to 3x normal every Friday afternoon, a static threshold or Z-score will alert every Friday. What kind of model accounts for this pattern?",
        "Which statistical measure is more resistant to a single large outlier: the mean or the median?",
      ],
    },
    {
      id: "q-sdi-obs-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is alert deduplication and why is it critical in PagerDuty or Opsgenie routing configurations?",
      options: [
        "Alert deduplication removes duplicate alert rules in the monitoring system to reduce configuration complexity.",
        "Alert deduplication groups multiple related alert firings from the same incident into a single notification, preventing on-call engineers from being paged dozens of times for the same underlying problem.",
        "Alert deduplication prevents the same metric data point from being evaluated by two different alert rules simultaneously.",
        "Alert deduplication is a database technique to remove duplicate entries in the alert history table.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Recognize the problem: when a large-scale failure occurs (network partition, datacenter outage, cascading failure), hundreds or thousands of individual alerts may fire simultaneously across every service and host.\n" +
        "**Step 2:** Understand the impact without deduplication: on-call engineers receive hundreds of individual pages for what is a single incident, fragmenting attention and causing critical pages to be missed.\n" +
        "**Step 3:** Implement deduplication: PagerDuty and Opsgenie use grouping (alerts with matching attributes within a time window merge into one incident), flap detection (suppress repeatedly flipping alerts), and dedup keys (Prometheus Alertmanager uses grouping labels; PagerDuty uses dedup_key in the Events API).",
      hints: [
        "Imagine a network switch failure that causes 50 services to go unhealthy simultaneously. How many pages should the on-call receive?",
        "PagerDuty's 'grouping' feature and Alertmanager's 'group_by' both solve this problem at different layers.",
      ],
    },
  ],

  "sdi-obs-network-db": [
    {
      id: "q-sdi-obs-26",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A team wants deep visibility into network traffic patterns within their Kubernetes cluster without modifying application code. Which technology enables this and what data can it expose?",
      options: [
        "Install a tcpdump sidecar in every pod; capture all network packets and send to Elasticsearch.",
        "Use eBPF-based network observability tools (e.g., Cilium Hubble, Pixie, Falco) that hook into the Linux kernel network stack, capturing connection-level metrics (flows, latency, retransmits), DNS queries, and HTTP/gRPC request metadata without requiring application code changes or sidecars.",
        "Enable VPC flow logs in the cloud provider; these provide per-packet inspection data at the application layer.",
        "Deploy a Prometheus exporter on each node that reads /proc/net/tcp to count open connections.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Understand eBPF capability: it allows programs to run safely in the Linux kernel without modifying kernel source or requiring application changes, attaching probes to kernel network functions and socket calls.\n" +
        "**Step 2:** Recognize what eBPF captures: Layer 4 flows (source/dest IP, port, bytes transferred, TCP retransmits, RTT) and Layer 7 application protocols (HTTP methods/status codes, gRPC call names, DNS query/response latency, Kafka operations).\n" +
        "**Step 3:** Appreciate the advantage: Cilium Hubble provides Kubernetes-aware network flow visualization with service identity (pod labels) rather than just IPs. Pixie uses eBPF for full request-level visibility without any application instrumentation.",
      hints: [
        "eBPF runs programs in the kernel with access to all system calls and network events, without modifying applications.",
        "Traditional network monitoring only captures L3/L4 data (IPs, ports, bytes). What application-layer data do you lose?",
      ],
    },
    {
      id: "q-sdi-obs-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A MySQL database is experiencing intermittent performance degradation. What are the three key observability signals you should instrument to diagnose the issue?",
      options: [
        "Disk space usage, server uptime, and replication lag only.",
        "Slow query log (queries exceeding a threshold like 100ms), EXPLAIN plan analysis for hot queries to identify missing indexes or full table scans, and lock wait metrics (information_schema.innodb_lock_waits or performance_schema wait events) to detect contention.",
        "CPU and memory utilization of the database host only; all database performance issues are resource contention.",
        "Network bandwidth to the database server and number of active TCP connections only.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Instrument slow queries: enable MySQL's slow query log (long_query_time=0.1) or performance_schema to identify which queries exceed latency thresholds, then sort by total execution time to find the queries consuming the most wall time.\n" +
        "**Step 2:** Analyze execution plans: run EXPLAIN or EXPLAIN ANALYZE on slow queries to reveal if the optimizer is doing a full table scan instead of using an index, or if a join is processing too many rows.\n" +
        "**Step 3:** Monitor lock contention: use information_schema.innodb_lock_waits or pt-stalk to capture lock holder and waiter details. Lock waits appear as intermittent latency spikes correlated with write-heavy transactions.",
      hints: [
        "A query that was fast last week might be slow now because a table grew from 1M to 100M rows without an index change.",
        "Lock waits appear as intermittent latency spikes correlated with write-heavy transactions.",
      ],
    },
  ],

  "sdi-obs-incident": [
    {
      id: "q-sdi-obs-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What are the four phases of a standard incident management lifecycle, and what is the primary goal of each phase?",
      options: [
        "Report, Assign, Fix, Close — each phase has equal priority.",
        "Detection (identify that an incident is occurring via alerts or user reports), Triage (assess severity, form incident response team, establish communication channels), Mitigation (restore service as fast as possible, even with a workaround), and Postmortem (analyze root cause, implement lasting fixes, share learnings).",
        "Alert, Escalate, Remediate, Deploy — focused on deploying a fix as quickly as possible.",
        "Monitor, Page, Fix, Document — in this order with no overlap between phases.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Detection — an alert fires or a customer reports an issue; the faster detection occurs, the less user impact.\n" +
        "**Step 2:** Triage — designate an incident commander, classify severity (SEV1-3), open a war room or incident channel, and notify stakeholders. Separate relevant symptoms from noise and form a hypothesis.\n" +
        "**Step 3:** Mitigation — prioritize restoring service over finding root cause (roll back a bad deploy, disable a feature flag, add capacity, redirect traffic). Postmortem — conduct a blameless analysis of what happened, why detection/response took as long as it did, and what systemic changes prevent recurrence.",
      hints: [
        "Why is mitigation (stop the bleeding) listed separately from postmortem (understand why it bled)?",
        "During an incident, what is more important: finding the root cause or restoring service to users?",
      ],
    },
    {
      id: "q-sdi-obs-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A security team wants to integrate observability infrastructure with SIEM (Security Information and Event Management) for threat detection. What is the most effective architecture for detecting threats from observability signals?",
      options: [
        "Export all Prometheus metrics to the SIEM; metrics contain all necessary security context.",
        "Stream structured application logs, Kubernetes audit logs, cloud trail logs (AWS CloudTrail, GCP Audit Logs), and network flow logs through a log aggregation pipeline (Kafka -> enrichment -> SIEM); define detection rules in the SIEM that correlate signals across sources to identify anomalies like privilege escalation, data exfiltration, or unusual API call patterns.",
        "Install an agent on each server that scans filesystem changes every minute and reports to the SIEM.",
        "Use distributed traces to detect security threats; traces contain all user actions in the call graph.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Identify the multiple log sources needed: application logs (authentication events, authorization failures), Kubernetes audit logs (API server calls including RBAC escalation attempts), cloud audit logs (IAM policy changes, storage access), network flow logs (unusual connections, data exfiltration), and OS-level logs (Falco, auditd for container escape attempts).\n" +
        "**Step 2:** Architect the pipeline: logs from all layers flow through a central pipeline where Kafka provides durability and fan-out, allowing the SIEM to receive a complete picture.\n" +
        "**Step 3:** Define detection rules: the SIEM (Splunk, Elastic SIEM, Chronicle, Microsoft Sentinel) correlates these streams with detection rules and threat intelligence feeds to identify patterns like privilege escalation or lateral movement.",
      hints: [
        "A single log source is insufficient for threat detection — attackers rarely appear in just one log type.",
        "Kubernetes audit logs record every API call to the control plane — including suspicious calls like listing all secrets.",
      ],
    },
    {
      id: "q-sdi-obs-30",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A FinOps team wants to build cloud cost observability dashboards to identify waste. What are the top three cost waste patterns to surface in these dashboards?",
      options: [
        "Monitor only total monthly spend; granular waste detection is not cost-effective to implement.",
        "Surface idle resources (instances running at less than 5% CPU for 7+ days), oversized resources (provisioned capacity far exceeding peak utilization), and unattached resources (orphaned EBS volumes, unused Elastic IPs, idle load balancers) — these three categories typically account for 20-30% of cloud waste.",
        "Focus only on data transfer costs since these are always the largest cost category.",
        "Monitor Reserved Instance coverage; 100% RI coverage always minimizes cloud spend regardless of utilization.",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** Identify idle resources: EC2/GCE instances with sustained less than 5-10% CPU utilization indicate over-provisioning or forgotten resources. A dashboard showing instances by average CPU percentage over 7 days quickly identifies candidates for rightsizing or termination.\n" +
        "**Step 2:** Identify oversized resources: compare provisioned vCPUs/memory against peak utilization; instances running at 15% peak are candidates for a smaller instance type, often cutting costs 60-75%.\n" +
        "**Step 3:** Identify unattached/orphaned resources: EBS volumes, Elastic IPs, load balancers, NAT gateways, and snapshots that persist after instances were terminated — these have no utilization metrics and continue billing. AWS Trusted Advisor, CloudHealth, and Infracost automate this detection.",
      hints: [
        "An EC2 instance running at 3% CPU 24/7 is provisioned for a peak that never comes — what should you do with it?",
        "EBS volumes and Elastic IPs continue billing even after the instance they were attached to is deleted.",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
