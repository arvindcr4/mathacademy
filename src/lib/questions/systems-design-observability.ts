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
      explanation: "The three pillars of observability are logs (time-stamped records of discrete events), metrics (numeric measurements aggregated over time), and distributed traces (end-to-end records of a request as it traverses multiple services). Logs give you detailed context for individual events, metrics tell you about system state over time, and traces show you the causal chain across microservices. Together they allow engineers to answer 'what happened', 'how bad is it', and 'where did it happen' respectively.",
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
      explanation: "Each pillar has a distinct cost-vs-fidelity tradeoff. Metrics are pre-aggregated numeric time series — cheap to store and fast to query, but you lose the individual request story. Logs retain rich per-event context (stack traces, user IDs, full payloads) but storing and searching billions of log lines is expensive. Traces reconstruct the causal path of a request across services, but they require instrumentation in every service and add per-request overhead (even with sampling). Modern observability platforms try to link all three so engineers can pivot from a metric spike to relevant traces and then to the exact log lines.",
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
      explanation: "Prometheus stores one time series per unique combination of label values. Adding a label like user_id with millions of distinct values creates millions of series for a single metric — this is called high cardinality. Prometheus keeps the head chunk of all active series in memory, so 50 million series can easily exhaust available RAM. The fix is to remove high-cardinality labels from Prometheus metrics entirely. If you need per-user analysis, use distributed tracing or log analysis instead. For Prometheus you should limit labels to low-cardinality dimensions (region, service, status_code, method) with bounded value sets.",
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
      explanation: "Prometheus uses a pull model — it scrapes /metrics endpoints at a configured interval. A batch job that completes before Prometheus scrapes it will never be captured. The Pushgateway is designed exactly for this use case: the job pushes its metrics (duration, exit code, records processed) to the gateway before exiting, and the gateway exposes those metrics for Prometheus to scrape. Important caveat: the Pushgateway is not suitable for service-level metrics because it does not clear stale metrics automatically — use it only for batch job completion signals.",
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
      explanation: "A counter is a monotonically increasing value that only goes up (or resets to zero on restart). It is ideal for cumulative counts like total HTTP requests, total errors, or total bytes sent — you use rate() or increase() in PromQL to compute the per-second rate. A gauge is a value that can go up or down arbitrarily, representing a current state: active connections, queue depth, memory usage, or CPU utilization. Histograms track the distribution of values (e.g., request duration bucketed by latency ranges) and are used for percentile calculations. Summaries are similar but calculate quantiles on the client side.",
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
      explanation: "W3C TraceContext (RFC 7230) defines two HTTP headers: 'traceparent' encodes version, trace-id (128-bit), parent-id (the current span ID, 64-bit), and trace-flags (e.g., sampling decision). 'tracestate' carries vendor-specific metadata. When Service A calls Service B, A injects these headers. Service B extracts them, creates a child span with the received trace-id and parent-id, and propagates them to any downstream calls. This creates a causally connected tree of spans across all services. OpenTelemetry SDKs handle this injection/extraction automatically through propagator plugins.",
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
      explanation: "Head-based sampling decides at the very start of a request (at the root service) whether to record the trace. This is simple to implement but means you may discard interesting traces (errors, outlier latency) because you don't know yet whether they'll be interesting. Tail-based sampling buffers all spans and makes the keep/drop decision only after the full trace is assembled, allowing you to guarantee that 100% of error traces and slow traces are retained while downsampling boring successful-fast traces. Honeycomb's Refinery and Jaeger's adaptive sampling implement tail-based approaches. The tradeoff is that tail-based sampling requires a stateful aggregation layer that receives all spans before deciding.",
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
      explanation: "With uniform 5% head-based sampling, roughly 95% of error traces are discarded. When an incident occurs, you may have very few error traces available for debugging — you see only the 5% that happened to be sampled. The solution is dynamic or tail-based sampling: always sample 100% of error traces (5xx responses, exceptions), always sample slow traces (above p99 latency threshold), and apply aggressive downsampling only to successful fast traces. Tools like OpenTelemetry Collector's probabilistic sampling processor, Honeycomb Refinery, and Grafana Tempo's tail-based sampling support these policies.",
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
      explanation: "In a log pipeline, Kafka serves as a shock absorber. Log generators (applications, syslog, containers) can produce logs in sudden bursts during incidents — exactly when you most need the observability data. Without a buffer, these bursts would overwhelm Elasticsearch's indexing capacity, causing data loss or back-pressure that could affect application performance. Kafka's durable, partitioned log retains data for configurable periods (hours to days), allowing Elasticsearch indexers (Logstash, Filebeat, or a custom consumer) to process at their own pace. Kafka also enables log data to be consumed by multiple downstream systems simultaneously (e.g., Elasticsearch for search, S3 for archival, a SIEM for security analysis).",
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
      explanation: "Unstructured log lines like '2024-01-15 ERROR user 12345 failed payment' require custom regex patterns to extract fields for searching or alerting. If the log format changes slightly (a developer rewrites the message), the regex breaks silently. Structured logs emit JSON like {\"level\":\"error\",\"user_id\":12345,\"event\":\"payment_failed\",\"amount\":99.99,\"trace_id\":\"abc123\"} — every field is explicit, typed, and directly indexable. Log systems can filter by user_id=12345, group by event type, compute P99 of amount for failed payments, or join logs to traces by trace_id — all without any parsing logic. This is why Google, Uber, and Netflix standardized on structured logging.",
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
      explanation: "Elasticsearch Index Lifecycle Management (ILM) supports tiered storage. The hot tier uses fast SSDs optimized for high write throughput and search on recent data. After 3 days, ILM automatically migrates indices to warm nodes (HDD or lower-tier SSDs) — this data is searchable but not actively written. After 30 days, indices can be moved to the cold tier (frozen indices, very cheap storage) or deleted after being snapshotted to object storage (S3, GCS). S3 archival costs roughly 50x less than hot SSD storage. Logs can still be searched in S3 via tools like Athena or Elasticsearch's searchable snapshots feature. This is the pattern used by large-scale logging services like Datadog, Elastic Cloud, and Grafana Loki.",
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
      explanation: "Service Level Indicator (SLI) is a quantitative measurement of service behavior — for example, the fraction of HTTP requests that return a 2xx response within 200ms. Service Level Objective (SLO) is the target value for that SLI over a time window — for example, 99.9% of requests succeed over a 30-day rolling window. Service Level Agreement (SLA) is a formal contract with customers or partners that specifies the SLO and the consequences (refunds, credits, penalties) if it is breached. SLAs are set conservatively looser than internal SLOs to give engineering teams buffer. Google SRE uses SLOs to define error budgets and guide decision-making about reliability vs. velocity.",
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
      explanation: "A 99.9% availability SLO over 30 days allows approximately 43.2 minutes of downtime (the error budget). When this budget is exhausted, the service has been less reliable than promised. Google SRE's error budget policy specifies that when the budget is exhausted, the product team and SRE team jointly freeze risky changes (feature launches, infrastructure migrations, config changes) until reliability improves and the budget renews. This creates a direct incentive for developers to care about reliability — excessive reliability incidents directly block their ability to ship features. The error budget framework makes the reliability-velocity tradeoff explicit and quantified.",
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
      explanation: "Burn rate is a multiplier: a burn rate of 1x means you are consuming the error budget at exactly the rate that would exhaust it in 30 days. A burn rate of 14.4x means you are burning budget 14.4 times faster. At 14.4x, the 30-day budget (43.2 min) is exhausted in 30 days / 14.4 = ~2 days. If this rate persists for 1 hour, you've consumed 1hr * 14.4 / (30*24 hrs) = 2% of the monthly budget in one hour — enough to justify paging an on-call engineer. Google SRE's alerting approach (from the SRE Workbook) uses multi-window burn rate alerts: a fast window (1hr) to detect acute incidents and a slow window (6hr or 3d) to catch slow-burning problems. This avoids alert fatigue from transient spikes while catching sustained degradation.",
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
      explanation: "Symptom-based alerts trigger when users are actually experiencing problems — high 5xx error rates, elevated p99 latency, failed health checks. These directly measure SLO breach risk. Cause-based alerts trigger on infrastructure signals — high CPU, low disk space, memory pressure — which may or may not lead to user impact. The problem with cause-based alerting as primary: you can have extremely high CPU (cause) with no user impact, generating alert noise; conversely, you can have user impact from a cause you never anticipated (a bug in business logic, a downstream service issue). Google SRE's recommendation is to alert primarily on symptoms (your SLIs) and use cause-based signals as diagnostics, not as the primary paging mechanism.",
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
      explanation: "Alert fatigue occurs when engineers receive so many noisy, non-actionable alerts that they begin to ignore or auto-acknowledge pages without investigating — a dangerous pattern that leads to real incidents being missed. The Google SRE book prescribes that every page should be actionable and require human judgment. Fixes include: (1) Raise thresholds — only page when the error rate or latency exceeds a level that actually threatens the SLO. (2) Add for-duration clauses — alert only if the condition persists for 5+ minutes, eliminating transient spikes. (3) Review alerts weekly: delete alerts that have fired but never required action in the past 3 months. (4) Use burn rate alerting instead of instantaneous thresholds to reduce noise.",
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
      explanation: "False. Blameless postmortems assume that engineers act with good intentions given the information they had at the time. The goal is to understand systemic factors — what in the system, process, or tooling made this failure possible — and to implement improvements that prevent recurrence. Punishing individuals suppresses future incident reporting (people hide mistakes to avoid blame) and fails to address the underlying systemic issues. A blameless culture leads to richer postmortems, faster learning, and more reliable systems. PagerDuty, Etsy, and Google all documented this shift as transformative for their reliability culture.",
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
      explanation: "Best-practice observability investigation follows a structured drill-down: (1) Metrics give you the 'what' — p99 latency spiked at 14:32. (2) Traces give you the 'where' — filter traces from 14:30-14:35 with duration > 2s; find that 80% of slow traces have a long span on the payment-processor service's database call. (3) Logs give you the 'why' — filter structured logs for payment-processor with trace_id from slow traces; find 'connection pool exhausted: max_connections=50 reached'. (4) Infrastructure metrics confirm — DB connection count metric shows it saturated at exactly 14:32. This three-signal correlation is why modern platforms like Datadog, Honeycomb, and Grafana Tempo link traces to logs via trace_id and metrics via time alignment.",
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
      explanation: "OpenTelemetry (OTel) is a CNCF project that merges OpenCensus and OpenTracing into a single, vendor-neutral standard. It provides: (1) Language SDKs (Go, Java, Python, JS, etc.) for instrumenting applications to emit spans, metrics, and logs using a common API. (2) The OpenTelemetry Collector — a standalone process that receives telemetry, processes it (filtering, sampling, attribute enrichment), and exports it to multiple backends simultaneously (Jaeger, Tempo, Datadog, Dynatrace, etc.). (3) The OTLP protocol for transmitting telemetry data. The key benefit: instrument your application once with OTel SDKs and switch or add observability backends without re-instrumenting code. Datadog, Honeycomb, Grafana, AWS X-Ray, and Google Cloud Trace all accept OTLP.",
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
      explanation: "Synthetic monitoring runs scripted probes (HTTP checks, browser scripts) on a schedule against your endpoints from multiple geographic locations. It detects: outages when there is no real user traffic (e.g., at 3am), regional availability differences, and slow DNS or TLS handshake times. The Prometheus Blackbox Exporter probes HTTP/S, TCP, DNS, and ICMP endpoints and exposes probe_success, probe_duration_seconds, and TLS certificate expiry metrics. RUM instruments real browsers (via JavaScript snippets) to capture Core Web Vitals (LCP, FID, CLS), JavaScript errors, and third-party resource load times that only appear under real-world conditions. Together: synthetic catches infrastructure-level issues proactively; RUM catches user-experience issues that depend on real browser environments and user behavior.",
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
      explanation: "Brendan Gregg's USE Method focuses on infrastructure resources (CPUs, disks, network interfaces, memory): Utilization (how busy is the resource, e.g., CPU 80%), Saturation (how much work is queued or waiting, e.g., run queue length), and Errors (hardware or driver errors). Tom Wilkie's RED Method focuses on services: Rate (requests per second), Errors (error rate or error ratio), and Duration (latency distribution — p50, p99). USE answers 'is my infrastructure healthy?' while RED answers 'is my service healthy from a user perspective?'. The Grafana Kubernetes and Node Exporter dashboards use USE for nodes; service mesh dashboards (Istio, Linkerd) use RED for services.",
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
      explanation: "Database capacity planning requires a multi-signal approach. CPU saturation is just one failure mode; databases commonly hit bottlenecks first in: (1) Disk I/O — high read/write latency when IOPS limits are reached (common in cloud instances with provisioned IOPS limits). (2) Memory — buffer pool exhaustion causing increased disk reads. (3) Connection pool saturation — max_connections reached causes connection refused errors even at low CPU. (4) Replication lag — the replica falls behind the primary during write spikes. (5) Lock contention — visible in wait event metrics. A holistic capacity plan uses the USE method across all resource dimensions and establishes scaling thresholds (alert when disk I/O > 70% of provisioned IOPS sustained for 10 minutes) rather than reacting to outages.",
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
      explanation: "The most scalable approach for multi-team cost attribution is resource tagging. Every cloud resource (EC2 instance, RDS, S3 bucket, EKS node pool, Lambda function) is tagged with metadata like {team: payments, service: checkout-api, env: production}. AWS Cost and Usage Reports (CUR) export detailed per-resource costs with these tags to S3 for analysis. Tools like Infracost, CloudHealth, Apptio Cloudability, or Grafana Cloud Cost Management build dashboards from these tagged costs. Infrastructure-as-code (Terraform, CDK) enforces tagging through policy-as-code (e.g., OPA, AWS Config rules) to prevent untagged resources. Separate accounts per team (AWS Organizations) is a strong isolation approach but complicates shared services and cross-team dependencies.",
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
      explanation: "Z-score measures how many standard deviations a value is from the mean: (x - mean) / std. It works well for normally distributed, stationary metrics but is distorted by past anomalies (they inflate the mean and std, masking future anomalies). MAD replaces mean/std with median/median-absolute-deviation, making it robust to outliers. Neither handles seasonality: a request rate that naturally doubles on weekday mornings will trigger false positives at those times. ML-based approaches like Facebook Prophet or SARIMA model trend, weekly seasonality, and daily patterns, producing dynamic baselines that adapt. Tradeoffs: Z-score is O(1) per point; MAD is slightly more expensive; Prophet requires minutes of training on weeks of data and cannot run inline on streaming data.",
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
      explanation: "When a large-scale failure occurs — a network partition, datacenter outage, or cascading failure — hundreds or thousands of individual alerts may fire simultaneously (every service, every host, every endpoint). Without deduplication, on-call engineers receive hundreds of individual pages for what is a single incident. PagerDuty and Opsgenie implement alert deduplication through: (1) Grouping — alerts with matching attributes (service, severity, region) within a time window are merged into one incident. (2) Flap detection — suppress alerts that repeatedly flip between firing and resolved within a short window. (3) Dedup keys — Prometheus Alertmanager uses grouping labels; PagerDuty uses dedup_key in the Events API to ensure repeated firings of the same alert update one incident rather than creating new ones. Proper deduplication keeps on-call engineers focused on the root cause, not the cascading symptoms.",
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
      explanation: "eBPF (extended Berkeley Packet Filter) allows programs to run safely in the Linux kernel without modifying kernel source or requiring application changes. eBPF-based observability tools attach probes to kernel network functions and socket calls, capturing: (1) Layer 4 flows — source/dest IP, port, bytes transferred, TCP retransmits, RTT. (2) Layer 7 application protocols — HTTP methods/status codes, gRPC call names, DNS query/response latency, Kafka produce/consume operations. (3) Connection-level latency — time from SYN to SYN-ACK. Cilium Hubble provides a Kubernetes-aware network flow visualization with service identity (pod labels) rather than just IPs. Pixie uses eBPF to provide full request-level visibility (request headers, response codes, latency) without any application instrumentation.",
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
      explanation: "Database performance issues have three common root causes each requiring different instrumentation: (1) Slow queries — enable MySQL's slow query log (long_query_time=0.1) or performance_schema to identify which queries exceed latency thresholds. Export these to a dashboard sorted by total execution time to find the queries consuming the most wall time. (2) Bad execution plans — EXPLAIN or EXPLAIN ANALYZE on slow queries reveals if the optimizer is doing a full table scan instead of using an index, or if a join is processing too many rows. This is a one-time analysis triggered by slow query identification. (3) Lock contention — tables or rows locked by one transaction blocking others cause latency spikes that appear intermittent. Monitoring information_schema.innodb_lock_waits or pt-stalk captures reveal lock holder and waiter details.",
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
      explanation: "Google SRE and PagerDuty define the incident lifecycle as: (1) Detection — an alert fires or a customer reports an issue; the faster detection occurs, the less user impact. (2) Triage — an incident commander is designated, severity is classified (SEV1-3), a war room or incident channel is opened, and stakeholders are notified. The key activity is separating relevant symptoms from noise and forming a hypothesis. (3) Mitigation — prioritize restoring service over finding root cause. Roll back a bad deploy, disable a feature flag, add capacity, redirect traffic. A workaround is acceptable; end-user impact must stop. (4) Postmortem — after the incident, conduct a blameless analysis of what happened, why detection/response took as long as it did, and what systemic changes prevent recurrence. This phase is the highest-leverage investment in long-term reliability.",
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
      explanation: "Effective security observability requires correlating multiple log sources: (1) Application logs — authentication events, authorization failures, API access patterns. (2) Kubernetes audit logs — every API server call including RBAC escalation attempts, secret access, or exec into pods. (3) Cloud audit logs — IAM policy changes, storage bucket access, cross-account role assumptions. (4) Network flow logs — unusual outbound connections, data exfiltration volumes, lateral movement patterns. (5) OS-level logs — from Falco (eBPF-based), auditd, or Sysdig for container escape attempts or privilege escalation. A SIEM (Splunk, Elastic SIEM, Chronicle, Microsoft Sentinel) correlates these streams with detection rules and threat intelligence feeds. The key architectural principle: logs from all layers flow through a central pipeline (Kafka provides durability and fan-out) so the SIEM receives a complete picture.",
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
        "Surface idle resources (instances running at <5% CPU for 7+ days), oversized resources (provisioned capacity far exceeding peak utilization), and unattached resources (orphaned EBS volumes, unused Elastic IPs, idle load balancers) — these three categories typically account for 20-30% of cloud waste.",
        "Focus only on data transfer costs since these are always the largest cost category.",
        "Monitor Reserved Instance coverage; 100% RI coverage always minimizes cloud spend regardless of utilization.",
      ],
      correctAnswer: 1,
      explanation: "Gartner and cloud providers estimate 30-35% of cloud spend is wasted. The three highest-ROI waste patterns to surface: (1) Idle resources — EC2/GCE instances with sustained <5-10% CPU utilization indicate over-provisioning or forgotten resources. A dashboard showing instances by average CPU % over 7 days quickly identifies candidates for rightsizing or termination. (2) Oversized resources — compare provisioned vCPUs/memory against peak utilization; instances running at 15% peak are candidates for a smaller instance type, often cutting costs 60-75%. (3) Unattached/orphaned resources — EBS volumes, Elastic IPs, load balancers, NAT gateways, and snapshots that persist after the instances they served were terminated. These have no utilization metrics to detect them — you must query the billing API for resources with zero attached instances. AWS Trusted Advisor, CloudHealth, and Infracost automate this detection.",
      hints: [
        "An EC2 instance running at 3% CPU 24/7 is provisioned for a peak that never comes — what should you do with it?",
        "EBS volumes and Elastic IPs continue billing even after the instance they were attached to is deleted.",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
