import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "apigw-core-responsibilities": [
    {
      id: "q-apigw-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Which of the following is NOT a core responsibility of an API gateway?",
      options: [
        "SSL/TLS termination",
        "Request routing to backend services",
        "Storing business logic and domain entities",
        "Rate limiting and throttling"
      ],
      correctAnswer: 2,
      explanation: "An API gateway handles cross-cutting concerns:\n\n**Step 1:** Identify the infrastructure concern — SSL termination, request routing, authentication, rate limiting, request/response transformation, and logging are all gateway responsibilities.\n\n**Step 2:** Recognize what does NOT belong — storing business logic and domain entities belongs in the microservices themselves.\n\n**Step 3:** Apply the principle — the gateway is infrastructure; it should remain stateless with respect to business rules. Netflix's Zuul and AWS API Gateway both follow this principle, delegating domain logic to downstream services.",
      hints: [
        "Think of the gateway as a smart reverse proxy — it handles infrastructure concerns, not application concerns.",
        "If the gateway needs to change every time a business rule changes, it has taken on too much responsibility."
      ],
    },
    {
      id: "q-apigw-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "At Netflix, the API gateway performs SSL termination at the edge. What is the primary benefit of terminating TLS at the gateway rather than at each microservice?",
      options: [
        "End-to-end encryption is stronger because TLS is only applied once",
        "Certificate management is centralized, reducing operational overhead and enabling internal traffic to use faster unencrypted or mTLS channels within the trusted network",
        "Backend services get lower latency because they never need to handle TLS",
        "SSL termination at the gateway prevents man-in-the-middle attacks between the gateway and backend services"
      ],
      correctAnswer: 1,
      explanation: "Terminating TLS at the gateway works as follows:\n\n**Step 1:** Centralize certificate management — the gateway handles certificate provisioning, rotation, and storage for all backend services.\n\n**Step 2:** Offload TLS processing — the gateway terminates TLS inbound from clients, then forwards unencrypted (or re-encrypts with mTLS via service mesh) within the trusted VPC.\n\n**Step 3:** Reduce operational overhead — instead of managing certificates on hundreds of microservices, a single gateway layer manages them all. Netflix terminates TLS at their edge proxy layer, then uses internal mTLS enforced by Envoy sidecars for service-to-service calls.",
      hints: [
        "How many certificates would you need to manage if every microservice handled its own TLS termination?",
        "What network boundary separates untrusted public internet from the internal service mesh?"
      ],
    },
    {
      id: "q-apigw-3",
      type: "true-false",
      difficulty: "easy",
      question: "An API gateway should contain business logic such as calculating discounts or validating order quantities, because centralizing this logic reduces duplication across microservices.",
      correctAnswer: "false",
      explanation: "This statement is false. Here is why:\n\n**Step 1:** Recognize the anti-pattern — placing business logic in the API gateway creates a god-service anti-pattern.\n\n**Step 2:** Identify the consequences — the gateway becomes a bottleneck: every business rule change requires a gateway deployment, it cannot be scaled independently per domain, and it couples unrelated services.\n\n**Step 3:** Apply the correct principle — business logic belongs in the appropriate microservice. The gateway handles only cross-cutting infrastructure concerns (auth, routing, rate limiting, logging). This is called the 'smart gateway, dumb services' anti-pattern.",
      hints: [
        "If the gateway encodes discount logic, what happens when the pricing team needs to change it — do they control gateway deployments?",
        "Sam Newman's 'Building Microservices' explicitly warns against putting orchestration logic in the gateway."
      ],
    },
  ],

  "apigw-bff-pattern": [
    {
      id: "q-apigw-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Lyft and Netflix both use the Backend for Frontend (BFF) pattern. What problem does BFF primarily solve?",
      options: [
        "It replaces the need for a service mesh by handling all inter-service communication",
        "It creates a tailored API aggregation layer per client type (mobile, web, TV), avoiding over-fetching or under-fetching caused by a one-size-fits-all API",
        "It provides a caching layer between the database and microservices to reduce read latency",
        "It enforces authentication and authorization at the frontend before requests reach the backend"
      ],
      correctAnswer: 1,
      explanation: "The BFF pattern solves this problem through the following steps:\n\n**Step 1:** Recognize the mismatch — a single general-purpose API gateway forces all clients (iOS, Android, web, smart TV) to use the same response shapes, causing over-fetching or under-fetching.\n\n**Step 2:** Introduce per-client backends — the BFF pattern creates a dedicated backend per client type that aggregates, filters, and shapes responses specifically for that client.\n\n**Step 3:** Enable independent evolution — each client team owns their BFF and can evolve it without coordinating with other teams. Sam Newman coined the term; SoundCloud, Netflix (with Falcor), and Lyft use variants of this pattern. The tradeoff is more services to maintain.",
      hints: [
        "A mobile app on a 4G connection cares about response payload size; a web app cares about the number of round trips.",
        "BFF moves the aggregation concern from the client into a dedicated server-side component."
      ],
    },
    {
      id: "q-apigw-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A team implements a single BFF for both iOS and Android mobile apps. Over time, the iOS team adds iOS-specific fields and the Android team adds Android-specific fields. What is the primary risk of this shared BFF design?",
      options: [
        "The BFF will exceed the maximum HTTP header size limit",
        "The shared BFF becomes a coordination bottleneck — changes for one platform require negotiation with the other, reintroducing the coupling the BFF pattern was meant to eliminate",
        "A single BFF cannot handle two different authentication schemes simultaneously",
        "The BFF will cause circular dependencies between the iOS and Android teams' service registries"
      ],
      correctAnswer: 1,
      explanation: "A shared BFF undermines the pattern's core benefit through these steps:\n\n**Step 1:** Lose ownership autonomy — a shared BFF means both teams must coordinate every change, recreating the coupling the BFF pattern was meant to eliminate.\n\n**Step 2:** Violate the ownership rule — Sam Newman explicitly states: 'a BFF should be owned by the same team that owns the frontend.' If iOS and Android teams are separate, they need separate BFFs.\n\n**Step 3:** Accept the tradeoff — the extra operational cost of an additional service is the intended price for deployment independence.",
      hints: [
        "Who should own the BFF — the platform team or the client team?",
        "The main benefit of BFF is independent deployability. Does sharing undermine that?"
      ],
    },
  ],

  "apigw-service-discovery": [
    {
      id: "q-apigw-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In client-side service discovery (used by Netflix Eureka), who is responsible for load balancing, and what is the key difference from server-side service discovery?",
      options: [
        "The DNS resolver load balances using round-robin; in server-side, the client picks from a static IP list",
        "The client queries the service registry and selects an instance using a load-balancing algorithm it implements locally; in server-side discovery, a router or load balancer queries the registry and routes on behalf of the client",
        "The API gateway queries Eureka and injects the chosen instance address into each request header for the client to use",
        "Client-side discovery uses UDP multicast to find services; server-side uses TCP unicast"
      ],
      correctAnswer: 1,
      explanation: "Client-side vs server-side service discovery works as follows:\n\n**Step 1:** Client-side discovery (Netflix Ribbon + Eureka) — the client queries the service registry, fetches the list of healthy instances, and applies a load-balancing strategy locally (round-robin, least-connections, zone-aware).\n\n**Step 2:** Server-side discovery (AWS ALB + ECS, Consul + Nginx) — the client makes a request to a known router endpoint, and that router performs the registry lookup and forwards to a backend instance.\n\n**Step 3:** Compare tradeoffs — client-side has no routing bottleneck but embeds load-balancing logic in every client; server-side is simpler for clients but adds a routing hop and potential single point of failure.",
      hints: [
        "Netflix Ribbon is the library that implements client-side load balancing on top of Eureka registrations.",
        "AWS ALB target groups with ECS service discovery are an example of server-side discovery."
      ],
    },
    {
      id: "q-apigw-7",
      type: "true-false",
      difficulty: "easy",
      question: "DNS-based service discovery is always preferred over dedicated service registries like Consul because DNS is universally supported and requires no additional infrastructure.",
      correctAnswer: "false",
      explanation: "This statement is false. Here is why DNS is not always preferred:\n\n**Step 1:** Identify DNS limitations in dynamic environments — TTL-based caching means stale records persist after a pod dies, health checks are basic (TCP/HTTP), DNS returns only IP addresses without port or metadata, and round-robin provides no load-balancing awareness.\n\n**Step 2:** Recognize what dedicated registries provide — Consul, Eureka, and etcd offer richer health checking (script, gRPC), immediate deregistration on failure, and metadata/tag support for advanced routing.\n\n**Step 3:** Choose the right tool — DNS works well for stable, low-churn environments but struggles in Kubernetes-scale dynamic deployments.",
      hints: [
        "What happens to DNS cached records when a service instance crashes — how quickly do clients discover the failure?",
        "Consul health checks can verify application-level health (e.g., HTTP /health returning 200), not just TCP connectivity."
      ],
    },
  ],

  "apigw-circuit-breaker": [
    {
      id: "q-apigw-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A circuit breaker is in the OPEN state. What does this mean, and what happens to incoming requests?",
      options: [
        "The circuit is open (accepting connections); all requests flow through normally",
        "The circuit breaker has detected failures exceeding the threshold; requests fail fast without reaching the downstream service, returning an error or fallback immediately",
        "The circuit is partially open; 50% of requests are allowed through to test downstream health",
        "The circuit breaker is disabled; it logs failures but does not block requests"
      ],
      correctAnswer: 1,
      explanation: "The circuit breaker OPEN state works as follows:\n\n**Step 1:** Understand the inverted analogy — in software, an OPEN circuit means the circuit is broken; requests are blocked from flowing through to the failing service.\n\n**Step 2:** Recognize the fail-fast mechanism — instead of waiting for timeouts on every request (consuming threads and degrading the caller), the circuit breaker immediately returns an error or cached fallback.\n\n**Step 3:** Know the recovery path — after a configured sleep window, the circuit transitions to HALF-OPEN to test if the downstream has recovered. Netflix Hystrix popularized this pattern; Resilience4j is its modern replacement.",
      hints: [
        "Think of an electrical circuit: open = broken = no current flows. In software, OPEN = requests are blocked.",
        "Fail-fast prevents thread pool exhaustion in the caller service — without circuit breaking, all threads can be held waiting for a slow downstream."
      ],
    },
    {
      id: "q-apigw-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A circuit breaker moves to the HALF-OPEN state. A single probe request is sent to the downstream service and succeeds. Should the circuit breaker immediately return to CLOSED state? What is the risk?",
      options: [
        "Yes — one success proves the service is healthy; immediately close the circuit to restore full traffic",
        "No — a single success may be a fluke on an intermittently failing service; the circuit should close only after a configurable number of consecutive successes or a success-rate threshold over the probe window",
        "No — the circuit should remain half-open permanently and never return to closed state",
        "Yes — the circuit breaker only needs a single success because the downstream SLA guarantees 99.9% uptime"
      ],
      correctAnswer: 1,
      explanation: "Closing the circuit on a single probe success is premature. Here is the correct approach:\n\n**Step 1:** Reject single-success closure — a single success in HALF-OPEN is insufficient evidence that the downstream has fully recovered; it could be an intermittent recovery on a still-degraded host.\n\n**Step 2:** Require threshold-based closure — production circuit breakers (Resilience4j, Polly) require a configurable number of consecutive successes or a success rate above a threshold (e.g., 5 successes, or 80% success rate over 10 probe requests) before returning to CLOSED.\n\n**Step 3:** Avoid thundering herd — closing too eagerly risks rapid OPEN-HALF_OPEN-OPEN oscillation that amplifies load spikes on a recovering service.",
      hints: [
        "Resilience4j's half-open configuration: permittedNumberOfCallsInHalfOpenState and slowCallRateThreshold both contribute to the close decision.",
        "A recovering database under load may successfully handle one query but fail under the full traffic burst that follows circuit close."
      ],
    },
    {
      id: "q-apigw-10",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the primary purpose of the circuit breaker pattern in a microservices architecture?",
      options: [
        "To encrypt traffic between services to prevent data interception",
        "To prevent cascading failures by stopping repeated calls to a failing service and giving it time to recover",
        "To route requests to the nearest data center to minimize latency",
        "To compress request payloads to reduce bandwidth usage"
      ],
      correctAnswer: 1,
      explanation: "The circuit breaker prevents cascading failures through these steps:\n\n**Step 1:** Observe the cascade — when Service A calls Service B and B is slow or failing, without a circuit breaker, A's thread pool fills up waiting, causing A to also become slow; its callers then back up and the failure spreads.\n\n**Step 2:** Detect and open — the circuit breaker detects the failure rate and opens the circuit, blocking further calls to B.\n\n**Step 3:** Isolate and protect — by letting A fail fast, the circuit breaker isolates the failure to B's scope, preventing it from propagating upstream. Netflix observed this when building Hystrix — a single dependency failure could bring down their entire streaming platform without isolation.",
      hints: [
        "Cascading failure: Service C calls B calls A. If A is slow, B's threads fill up, then C's threads fill up — the failure propagates upstream.",
        "The circuit breaker gives a failing service 'breathing room' by removing traffic pressure during its recovery."
      ],
    },
  ],

  "apigw-bulkhead-retry": [
    {
      id: "q-apigw-11",
      type: "multiple-choice",
      difficulty: "medium",
      question: "The Bulkhead pattern in microservices is inspired by ship hull design. How does it prevent cascade failures?",
      options: [
        "It replicates data across multiple database nodes, so a single node failure does not cause data loss",
        "It isolates thread pools (or connection pools or semaphores) per downstream dependency, so that exhaustion caused by one slow service cannot consume resources allocated to other services",
        "It encrypts each service's network traffic separately, so a breach in one service does not expose others",
        "It deploys each microservice in a separate availability zone, preventing co-location failures"
      ],
      correctAnswer: 1,
      explanation: "The Bulkhead pattern prevents cascade failures through these steps:\n\n**Step 1:** Isolate resource pools — allocate separate thread pools, connection pools, or semaphores per downstream dependency.\n\n**Step 2:** Observe the protection — if Service A calls both B and C, and B becomes slow, without bulkheads the shared pool fills up, starving C. With bulkheads, B's slowness exhausts only its own pool, leaving C unaffected.\n\n**Step 3:** Implement with known tools — Netflix Hystrix implements both thread pool and semaphore bulkheads; Resilience4j provides BulkheadRegistry for this purpose.",
      hints: [
        "A ship's hull is divided into watertight compartments — a breach in one compartment doesn't sink the ship.",
        "In Hystrix, each HystrixCommand runs in its own thread pool. You configure maxConcurrentRequests per command group."
      ],
    },
    {
      id: "q-apigw-12",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A service uses retry with exponential backoff when calling a downstream API. Without jitter, what problem can occur when many service instances all experience the same failure simultaneously?",
      options: [
        "The exponential backoff grows too large, causing requests to never be retried",
        "All instances back off for the same duration and retry simultaneously, creating a coordinated thundering herd that repeatedly overloads the recovering downstream service",
        "Exponential backoff without jitter violates HTTP idempotency requirements, causing duplicate orders",
        "Without jitter, the retry counter overflows and the service enters an infinite retry loop"
      ],
      correctAnswer: 1,
      explanation: "Without jitter, synchronized retries create a thundering herd:\n\n**Step 1:** Observe the synchronization problem — when N service instances fail simultaneously (e.g., during a downstream restart), they all compute the same backoff duration (e.g., $2^1 = 2s$, $2^2 = 4s$).\n\n**Step 2:** Recognize the consequence — all instances retry at the same moment, creating a synchronized surge that overwhelms the recovering service, causing it to fail again and perpetuating the cycle.\n\n**Step 3:** Apply jitter as the solution — jitter adds a random component (e.g., $\\text{random}(0, \\text{full\\_backoff})$) to desynchronize retries across instances. AWS SDKs and Resilience4j support 'full jitter' and 'decorrelated jitter' strategies.",
      hints: [
        "Imagine 1000 Lambda functions all failing at once and all retrying at exactly t=2s, t=4s, t=8s — what does that look like to the downstream?",
        "AWS SDK's built-in retry uses jitter by default for this reason."
      ],
    },
    {
      id: "q-apigw-13",
      type: "true-false",
      difficulty: "medium",
      question: "It is safe to retry any failed HTTP request with exponential backoff, regardless of whether the operation is idempotent, as long as the downstream service uses exactly-once processing guarantees.",
      correctAnswer: "false",
      explanation: "This statement is false. Here is why safe retry requires idempotency:\n\n**Step 1:** Recognize the duplicate risk — retrying non-idempotent operations (like POST /orders) can cause duplicate records if the original request succeeded but the response was lost.\n\n**Step 2:** Understand the solution — to safely retry non-idempotent operations, the client must include an idempotency key (e.g., Idempotency-Key: <uuid> header — used by Stripe), and the server must store processed keys to detect and deduplicate retries.\n\n**Step 3:** Know what is safe without infrastructure — only operations that are naturally idempotent (GET, PUT with full state, DELETE) can be retried safely without idempotency key infrastructure.",
      hints: [
        "POST /payments with retry: did the first request succeed and the response was lost, or did it truly fail? Without idempotency keys, you cannot know.",
        "Stripe's idempotency key: the client generates a UUID, sends it in the header, and Stripe deduplicates retries by caching the response for 24 hours."
      ],
    },
  ],

  "apigw-service-mesh": [
    {
      id: "q-apigw-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Istio's service mesh architecture, what is the role of the sidecar proxy (Envoy) running alongside each microservice pod?",
      options: [
        "It stores the service's persistent state so that the main container can remain stateless",
        "It intercepts all inbound and outbound network traffic for the pod, enforcing mTLS, telemetry collection, traffic policies, and retries — transparently without changes to the application code",
        "It acts as a service registry and stores the list of all healthy service endpoints",
        "It runs the control plane logic and distributes routing configuration to all other proxies in the mesh"
      ],
      correctAnswer: 1,
      explanation: "Istio's sidecar proxy works through these steps:\n\n**Step 1:** Inject the sidecar — Istio injects an Envoy proxy into each pod via a mutating admission webhook, using iptables REDIRECT rules to intercept all inbound and outbound traffic.\n\n**Step 2:** Transparently handle cross-cutting concerns — the sidecar handles mTLS handshakes, retry logic, circuit breaking, distributed trace header injection, and telemetry reporting without modifying the application code.\n\n**Step 3:** Push configuration from the control plane — Istiod pushes xDS configuration (listeners, routes, clusters, endpoints) to all Envoy sidecars via gRPC, enforcing uniform policy across polyglot services.",
      hints: [
        "iptables REDIRECT rules redirect traffic through the sidecar on port 15001 before it reaches the application.",
        "The sidecar pattern enables policy enforcement without modifying application code — a polyglot-friendly approach."
      ],
    },
    {
      id: "q-apigw-15",
      type: "multiple-choice",
      difficulty: "hard",
      question: "What is the difference between the control plane and data plane in Istio, and which components belong to each?",
      options: [
        "Control plane = Envoy sidecar proxies handling live traffic; Data plane = Istiod managing configuration and certificates",
        "Control plane = Istiod (Pilot, Citadel, Galley) managing routing config, certificates, and policy; Data plane = Envoy sidecar proxies that actually process network traffic using that configuration",
        "Control plane = the API gateway handling north-south traffic; Data plane = the service mesh handling east-west traffic",
        "Control plane = Kubernetes kube-apiserver; Data plane = Istio Istiod distributing xDS configuration"
      ],
      correctAnswer: 1,
      explanation: "Istio separates control and data planes as follows:\n\n**Step 1:** Identify the Data Plane — Envoy sidecar proxies deployed alongside every workload handle actual network packets: applying mTLS, retries, timeouts, and circuit breaking in real time.\n\n**Step 2:** Identify the Control Plane — Istiod (consolidating Pilot for service discovery and xDS config, Citadel for certificate management/SPIFFE identity, and Galley for config validation) pushes xDS protocol updates to sidecars via a persistent gRPC stream.\n\n**Step 3:** Appreciate the resilience benefit — because sidecars cache their last configuration, control plane issues do not immediately break live traffic.",
      hints: [
        "xDS is the configuration API Envoy uses to receive routing, cluster, and endpoint configuration from the control plane.",
        "Istiod combining Pilot + Citadel + Galley was introduced in Istio 1.5 to simplify the previously multi-component control plane."
      ],
    },
    {
      id: "q-apigw-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In a service mesh using mTLS with SPIFFE/SPIRE for identity, a certificate expires on a running pod and SPIRE is temporarily unavailable for rotation. What happens to traffic for that pod?",
      options: [
        "Traffic continues unaffected because Envoy caches the certificate indefinitely until SPIRE recovers",
        "Traffic to and from the pod fails because Envoy cannot complete mTLS handshakes with an expired certificate — the impact depends on the peer's strict vs permissive mTLS mode",
        "Envoy automatically falls back to plain HTTP when the certificate expires, maintaining service availability",
        "Kubernetes automatically restarts the pod, which triggers a new SPIRE certificate issuance before traffic resumes"
      ],
      correctAnswer: 1,
      explanation: "SPIFFE certificate expiration impacts traffic as follows:\n\n**Step 1:** Understand short TTLs — SPIFFE certificates have short TTLs (e.g., 1 hour) by design to reduce the blast radius of a compromise.\n\n**Step 2:** Observe the failure mode — when a cert expires and SPIRE is unavailable to rotate it, the Envoy sidecar cannot present a valid certificate for mTLS handshakes. STRICT mTLS peers reject connections (503 errors); PERMISSIVE mode falls back to plaintext (a security downgrade).\n\n**Step 3:** Monitor proactively — SPIRE agent health and certificate rotation must be monitored with buffer before expiry. Production deployments should have cert TTL alerts at 20% remaining lifetime.",
      hints: [
        "SPIFFE SVIDs (X.509 certificates) encode the workload identity as a URI SAN (e.g., spiffe://cluster.local/ns/default/sa/payment-service).",
        "STRICT mTLS: both sides must present valid certs. PERMISSIVE: accept both TLS and plaintext. Strict is recommended for production."
      ],
    },
  ],

  "apigw-rate-limiting": [
    {
      id: "q-apigw-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A token bucket rate limiter is configured with a capacity of 100 tokens and a refill rate of 10 tokens per second. A client sends 150 requests in the first second. What happens?",
      options: [
        "All 150 requests are queued and processed over 15 seconds as tokens refill",
        "The first 100 requests are allowed (consuming all tokens in the bucket); the remaining 50 are rejected with 429 Too Many Requests",
        "The rate limiter distributes the 150 requests evenly, allowing 10 per 100ms",
        "The bucket capacity doubles to 200 to absorb the burst, then refills normally"
      ],
      correctAnswer: 1,
      explanation: "The token bucket algorithm processes this burst as follows:\n\n**Step 1:** Consume tokens for initial requests — the bucket holds 100 tokens; the first 100 requests consume all tokens in the bucket.\n\n**Step 2:** Reject when empty — the remaining 50 requests find an empty bucket and are rejected with HTTP 429 Too Many Requests.\n\n**Step 3:** Refill and sustain — after the burst, the bucket refills at 10 tokens per second, allowing a sustained throughput of 10 rps. Token bucket accommodates legitimate burst traffic while enforcing a steady-state rate. AWS API Gateway and Kong use token bucket variants.",
      hints: [
        "Token bucket: bucket fills at refill_rate up to capacity. Each request consumes one token. No token = rejected.",
        "Leaky bucket: requests enter a queue and drain at a fixed rate. Burst requests are queued (up to queue size), not immediately rejected."
      ],
    },
    {
      id: "q-apigw-18",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An API gateway enforces rate limiting using a sliding window counter stored in a distributed Redis instance. Two gateway nodes both receive requests from the same client at exactly the same millisecond. What race condition can occur, and how is it mitigated?",
      options: [
        "Both nodes read the same counter value (e.g., 99 out of 100), both decide the request is within limit, both increment, resulting in a counter of 101 — exceeding the limit by 1",
        "Redis single-threaded architecture prevents any race condition — reads and writes are always serialized",
        "The race condition causes one gateway node to crash, triggering an automatic failover to a replica",
        "Both nodes read 99, but Redis's eventual consistency model ensures only one increment is applied"
      ],
      correctAnswer: 0,
      explanation: "The race condition and its mitigation work as follows:\n\n**Step 1:** Identify the TOCTOU race — without atomic operations, a read-then-increment race allows two concurrent requests to each read a stale counter (e.g., 99 out of 100), both decide the request is within the limit, and both increment — resulting in a counter of 101.\n\n**Step 2:** Use Redis atomic operations — the standard mitigation is a Lua script (executed atomically by Redis's single-threaded command processing) that combines GET and INCR in one atomic transaction, or the Redis INCRBY command which is atomic.\n\n**Step 3:** Handle cluster complexity — Redis Cluster adds complexity because the sliding window key must be on the same shard. Stripe, Cloudflare, and Kong all use Lua scripts in Redis for atomic rate-limit enforcement.",
      hints: [
        "Redis INCR is atomic, but a GET followed by a conditional INCR is not — the two operations can be interleaved by concurrent requests.",
        "Redis Lua scripts execute atomically: no other command runs between the script's start and end, eliminating the TOCTOU window."
      ],
    },
  ],

  "apigw-versioning-auth": [
    {
      id: "q-apigw-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which API versioning strategy is recommended for REST APIs where clients are third-party developers who need stable, bookmarkable URLs?",
      options: [
        "Header versioning (Accept: application/vnd.api+json;version=2) — cleaner URLs but requires clients to set custom headers",
        "Query parameter versioning (?version=2) — easy to test in browser but pollutes the URL with metadata",
        "URI path versioning (/v2/users) — explicit, cacheable, easy to route, visible in logs and documentation",
        "Semantic versioning in the response body (\"apiVersion\": \"2.0\") — most backward compatible"
      ],
      correctAnswer: 2,
      explanation: "URI path versioning is recommended for public APIs because:\n\n**Step 1:** Leverage inherent benefits — URLs are self-documenting, unambiguous, bookmarkable, and loggable; CDNs and reverse proxies can cache per-version without inspecting headers.\n\n**Step 2:** Simplify gateway routing — routing in the gateway is trivial (prefix-based), reducing complexity compared to header-based or query parameter approaches.\n\n**Step 3:** Follow industry practice — Stripe, Twilio, GitHub, and AWS all use URI path versioning. Header versioning requires custom headers and is invisible in browser address bars; query parameter versioning is discouraged by REST purists because the version is not a resource property.",
      hints: [
        "Stripe's API: https://api.stripe.com/v1/charges — the version is explicit in the path.",
        "CDN caching of /v1/users and /v2/users works automatically; caching by Accept header version requires a Vary: Accept header that many CDNs ignore."
      ],
    },
    {
      id: "q-apigw-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When should an API gateway use API key authentication instead of OAuth 2.0 client credentials flow for machine-to-machine (M2M) authentication?",
      options: [
        "API keys should always be preferred because they are simpler to implement and more secure than OAuth tokens",
        "API keys are appropriate for simple server-to-server calls with low security requirements (no fine-grained scopes needed); OAuth 2.0 client credentials should be used when scopes, token expiry, and revocation without credential rotation are needed",
        "OAuth 2.0 client credentials should only be used for human users logging in with browser flows; API keys are always used for M2M",
        "API keys provide better audit trails than OAuth tokens because they are static and easily searchable in logs"
      ],
      correctAnswer: 1,
      explanation: "Choosing between API keys and OAuth 2.0 for M2M authentication depends on:\n\n**Step 1:** Assess API key limitations — they are long-lived static secrets, carry no inherent scope information, and revoking one requires rotating the key and updating all clients.\n\n**Step 2:** Recognize OAuth 2.0 advantages — the client credentials flow issues short-lived access tokens (e.g., 1-hour TTL) with explicit scopes, and revocation is centralized (revoke the client_id/secret; all existing tokens expire naturally).\n\n**Step 3:** Apply the right tool — use OAuth 2.0 when you need fine-grained scopes, automatic token expiry, or centralized revocation. Use API keys for simple server-to-server calls with low security requirements. Kong, Apigee, and AWS API Gateway support both.",
      hints: [
        "Stripe uses API keys for their external developers because simplicity is paramount for third-party adoption. Internal Stripe services likely use mTLS.",
        "An API key in a log file is a secret leak that persists until manually rotated. An OAuth token in a log file expires automatically."
      ],
    },
    {
      id: "q-apigw-21",
      type: "true-false",
      difficulty: "medium",
      question: "mTLS (mutual TLS) is always a better authentication mechanism than OAuth 2.0 for service-to-service (east-west) communication in a microservices architecture and should replace OAuth entirely.",
      correctAnswer: "false",
      explanation: "This statement is false. mTLS and OAuth 2.0 are complementary:\n\n**Step 1:** Understand mTLS — it provides transport-layer identity (proves 'this connection comes from a process with a valid certificate for service X') but does not carry authorization context (scopes, user identity, tenant ID).\n\n**Step 2:** Understand OAuth 2.0 — it provides application-layer authorization; the token carries claims about what the caller is allowed to do.\n\n**Step 3:** Use both in production — mTLS (via Istio) enforces that connections are from known services, while a service-level JWT (from an OAuth server) carries the originating user context for audit and authorization decisions. Netflix uses this layered approach.",
      hints: [
        "mTLS answers 'who is connecting?' (service identity). OAuth answers 'what are they allowed to do?' (authorization scope).",
        "mTLS alone cannot carry the end-user's identity or permissions through a chain of microservice calls."
      ],
    },
  ],

  "apigw-websocket-tracing": [
    {
      id: "q-apigw-22",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A WebSocket connection must be proxied through an API gateway. What is the key challenge compared to proxying regular HTTP requests, and how is it addressed?",
      options: [
        "WebSocket frames are not HTTP-compatible, so the gateway must convert them to HTTP/2 server-sent events before forwarding",
        "WebSocket connections are long-lived and stateful — the gateway must maintain connection affinity (sticky sessions) so that all frames for a connection route to the same backend instance, and must handle the HTTP Upgrade handshake transparently",
        "WebSocket uses UDP instead of TCP, requiring the gateway to implement its own reliability layer",
        "WebSocket connections bypass the gateway's rate limiter entirely because they are not HTTP requests"
      ],
      correctAnswer: 1,
      explanation: "WebSocket proxying challenges and solutions work as follows:\n\n**Step 1:** Handle the HTTP Upgrade — WebSocket begins as an HTTP/1.1 Upgrade request (GET / HTTP/1.1, Connection: Upgrade, Upgrade: websocket). The gateway must forward this handshake to a backend and then become a transparent TCP tunnel for subsequent frames.\n\n**Step 2:** Manage sticky sessions — the stateful, long-lived nature of WebSocket connections (lasting hours) requires connection affinity: all frames for a connection must route to the same backend instance, or the connection state is lost.\n\n**Step 3:** Implement routing solutions — use consistent hashing by connection ID at the gateway, a shared connection state store (Redis), or a dedicated WebSocket tier. AWS API Gateway, Kong, Nginx, and HAProxy all support WebSocket proxying with proper sticky session configuration.",
      hints: [
        "The HTTP Upgrade header sequence: client sends Upgrade: websocket + Sec-WebSocket-Key; server responds 101 Switching Protocols + Sec-WebSocket-Accept.",
        "If a gateway restarts mid-connection without sticky sessions, the client's WebSocket frame hits a new backend instance that has no state for that connectionId."
      ],
    },
    {
      id: "q-apigw-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An API gateway injects a trace ID into every request and propagates it downstream. A request passes through 5 microservices, and the gateway samples 10% of traces. Which trace propagation and sampling strategy ensures consistent trace assembly while minimizing overhead?",
      options: [
        "Each microservice independently decides whether to sample based on its own 10% rate — samples are assembled from independently sampled spans",
        "The gateway makes the sampling decision and injects it into the trace context (e.g., X-B3-Sampled: 1 or W3C traceparent sampled flag); all downstream services honor this decision and either all record spans or none do",
        "The last microservice in the chain decides the sampling rate based on total request latency",
        "Sampling decisions are made by the tracing backend (Jaeger/Zipkin) after all spans are received, so all services always send spans"
      ],
      correctAnswer: 1,
      explanation: "Consistent trace assembly requires head-based sampling:\n\n**Step 1:** Make a single sampling decision — the gateway makes the sampling decision (e.g., 10% of traces) and injects it into the trace context (X-B3-Sampled or W3C traceparent sampled flag).\n\n**Step 2:** Propagate the decision — all downstream services honor the propagated sampling decision and either all record spans or none do.\n\n**Step 3:** Avoid orphaned spans — if each service makes independent decisions, you get fragmented traces with missing spans. Consistent head-based sampling ensures either the full distributed trace is captured or none of it is. Istio's Envoy sidecars automatically propagate B3 headers and enforce consistent sampling.",
      hints: [
        "W3C traceparent format: 00-<traceId>-<parentSpanId>-<flags>. The flags byte's low bit is the sampled flag.",
        "Without consistent sampling, a 10% gateway sample rate combined with independent 10% rates at 5 services gives only 0.1^5 = 0.001% fully assembled traces."
      ],
    },
  ],

  "apigw-canary-shadow": [
    {
      id: "q-apigw-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "How does canary routing at the API gateway level differ from a standard blue-green deployment?",
      options: [
        "Canary routing deploys a new version to all instances simultaneously; blue-green deploys to half the instances at a time",
        "Canary routing sends a small percentage of live traffic to the new version while the majority continues to hit the stable version, allowing gradual risk exposure and metric comparison; blue-green keeps the old version fully active and switches 100% of traffic at once when ready",
        "Canary routing is only applicable to mobile API clients; blue-green is for web API clients",
        "Blue-green uses A/B testing based on user demographics; canary uses random traffic splitting"
      ],
      correctAnswer: 1,
      explanation: "Canary routing and blue-green deployment differ as follows:\n\n**Step 1:** Understand canary routing — a configurable small percentage of live traffic (e.g., 1%, 5%, 10%) is sent to the new version, progressively increasing as confidence builds. The gateway can split by percentage, headers, user cohort, or geographic region.\n\n**Step 2:** Understand blue-green deployment — two full environments are kept (blue current, green new), and 100% of traffic switches in one step via DNS or gateway config update.\n\n**Step 3:** Compare tradeoffs — canary limits blast radius and allows gradual metric comparison; blue-green requires double the infrastructure cost during transition but provides a complete rollback path. Istio's VirtualService weight-based routing and AWS CodeDeploy both support canary deployments.",
      hints: [
        "Istio VirtualService: route 95% to stable subset, 5% to canary subset. Adjust weights via kubectl apply, no restart needed.",
        "Blue-green requires double the infrastructure cost during transition; canary can run on the existing fleet with selective routing."
      ],
    },
    {
      id: "q-apigw-25",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A team wants to test a new payment service version using shadow traffic mirroring at the API gateway. What must they ensure about the shadow service to make this safe?",
      options: [
        "The shadow service must respond faster than the primary to avoid latency regression in the user-facing path",
        "The shadow service must not write to production databases, send real emails, charge real payment methods, or trigger any real side effects — it must operate in a read-only or mock-backend mode",
        "The shadow service must be deployed in a separate cloud region to prevent resource contention with the primary service",
        "Shadow traffic mirroring requires the client to receive both the primary and shadow response, doubling the client's network consumption"
      ],
      correctAnswer: 1,
      explanation: "Shadow traffic mirroring requires these safety steps:\n\n**Step 1:** Send mirrored requests asynchronously — the gateway sends a copy of live production requests to the shadow service asynchronously; the client only waits for the primary service response.\n\n**Step 2:** Prevent real side effects — the shadow service must NOT write to production databases, send real emails, charge real payment methods, or trigger any real side effects. For a payment service, connect to a test Stripe account, disable writes, and skip email/SMS triggers.\n\n**Step 3:** Discard or compare shadow responses — the primary service always responds to the client; the shadow response is discarded or sent to a metrics comparison system. Envoy's mirror filter supports this natively.",
      hints: [
        "Envoy mirror filter: the mirrored request is sent asynchronously; the response is ignored. The client only sees the primary response.",
        "If the shadow payment service makes real Stripe charges, every shadowed transaction would double-charge the customer."
      ],
    },
  ],

  "apigw-caching-errors": [
    {
      id: "q-apigw-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An API gateway caches GET /products/123 responses. The product price changes in the backend database. Which HTTP mechanism allows the gateway to serve the cached response while letting clients validate freshness efficiently without re-downloading the full payload?",
      options: [
        "Cache-Control: no-store — forces the gateway to skip caching entirely and always fetch from the backend",
        "ETag/If-None-Match or Last-Modified/If-Modified-Since conditional requests — the gateway returns 304 Not Modified with no body if the resource hasn't changed, saving bandwidth",
        "Vary: Authorization header — ensures each user gets their own cached copy based on their auth token",
        "Cache-Control: private — marks the response as user-specific and prevents gateway-level caching"
      ],
      correctAnswer: 1,
      explanation: "ETag-based conditional requests enable efficient cache validation:\n\n**Step 1:** Store validators with cached responses — the backend includes an ETag (a hash of the resource) or Last-Modified timestamp; the gateway caches both the response and the validator.\n\n**Step 2:** Send conditional requests on cache expiry — when the cache expires, the gateway sends If-None-Match: <etag> (or If-Modified-Since) instead of fetching the full resource.\n\n**Step 3:** Return 304 or 200 — if the resource is unchanged, the backend returns 304 Not Modified with no body (saving bandwidth); if changed, the full response is returned. AWS API Gateway, Varnish, and Nginx all support this pattern.",
      hints: [
        "ETag is typically a hash of the response body. If the product's price changes, the ETag changes, and the backend returns 200 with the new body.",
        "304 Not Modified has no body — the client reuses its cached copy, saving the full payload transfer cost."
      ],
    },
    {
      id: "q-apigw-27",
      type: "multiple-choice",
      difficulty: "easy",
      question: "A microservice returns an internal error with a custom status code 599 and a stack trace in the response body. The API gateway forwards this directly to the client. What is the problem with this approach?",
      options: [
        "HTTP status codes above 511 are invalid and will cause client parsing errors",
        "Leaking internal error codes and stack traces exposes implementation details, aids attackers, and breaks client error handling that expects standard HTTP codes — the gateway should normalize errors to standard 5xx codes with a sanitized message",
        "The gateway should convert all errors to 200 OK with an error field in the JSON body to maintain backward compatibility",
        "Stack traces in response bodies violate the HTTP/1.1 specification and will be dropped by compliant HTTP clients"
      ],
      correctAnswer: 1,
      explanation: "Forwarding internal errors directly to clients is problematic for these reasons:\n\n**Step 1:** Prevent information leakage — stack traces reveal framework versions, file paths, and internal service names that attackers can use to target known vulnerabilities.\n\n**Step 2:** Maintain client compatibility — non-standard status codes (like 599) break client libraries that handle only standard 4xx/5xx ranges.\n\n**Step 3:** Normalize and sanitize — the gateway should log the full internal error for debugging but return a sanitized response: 502 Bad Gateway or 500 Internal Server Error with a structured error body like {\"error\": \"upstream_error\", \"requestId\": \"abc123\"}. The requestId enables support teams to correlate the sanitized client error with full internal logs.",
      hints: [
        "A stack trace showing 'com.company.payments.StripeClient.java:47' tells an attacker which library and version handles payment processing.",
        "The requestId in the sanitized error response is the bridge between what the client sees and what engineers see in logs."
      ],
    },
  ],

  "apigw-idempotency-webhooks": [
    {
      id: "q-apigw-28",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Stripe implements idempotency keys for its Charges API. A client sends POST /charges with Idempotency-Key: order-789-attempt-1 and the request times out. The client retries with the same key. What must the server-side idempotency implementation guarantee?",
      options: [
        "The server reprocesses the charge because the original request timed out, and the new charge is created with a higher priority",
        "The server returns the stored result of the original request (whether it succeeded or failed) without re-executing the charge operation, so the client gets a deterministic response regardless of how many retries occur",
        "The server generates a new idempotency key for the retry, preventing duplication at the cost of a new charge record",
        "The server uses a distributed lock to prevent concurrent retries, but after the lock expires, it re-executes the charge"
      ],
      correctAnswer: 1,
      explanation: "Stripe's idempotency key implementation works as follows:\n\n**Step 1:** Store the key with in-progress status — on the first request with key K, the server begins processing and stores the key K with status 'in-progress'.\n\n**Step 2:** Cache the result — if successful, the stored response is 'success + charge details'. If the original request is still in-progress when a retry arrives, the server returns 409 Conflict.\n\n**Step 3:** Return stored results on retry — on retry with the same key K, the server finds the stored result and returns it immediately without re-executing the charge operation. Stripe stores idempotency keys for 24 hours in Redis. The key insight: a timeout is ambiguous from the client's perspective; idempotency keys make the server's stored response the source of truth.",
      hints: [
        "The server must atomically check-and-store the idempotency key before executing the charge to prevent parallel duplicate requests from both proceeding.",
        "Stripe's idempotency key scope: per API key. The same key from different customers is treated as different keys."
      ],
    },
    {
      id: "q-apigw-29",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A webhook delivery system must reliably deliver events to customer endpoints. The customer's endpoint is intermittently returning 503. What is the correct delivery strategy?",
      options: [
        "Deliver the webhook exactly once using a synchronous HTTP call; if it fails, mark the event as dropped to avoid duplicates",
        "Retry with exponential backoff and jitter over a configurable window (e.g., up to 72 hours), validate the webhook signature with HMAC-SHA256 on delivery, and accept that at-least-once delivery means the customer endpoint must be idempotent",
        "Use at-most-once delivery and alert the customer via email when their endpoint fails, expecting them to manually re-fetch missed events",
        "Buffer webhooks in the API gateway's memory and replay them as fast as possible until the customer endpoint returns 200"
      ],
      correctAnswer: 1,
      explanation: "Production webhook delivery follows these steps:\n\n**Step 1:** Retry with exponential backoff — retry at intervals (e.g., 5s, 30s, 5min, 30min, 2h, 8h, 24h) up to a configurable window (e.g., 72 hours). Use durable queues (SQS, Kafka) rather than in-memory buffering.\n\n**Step 2:** Verify authenticity — use HMAC-SHA256 signatures (e.g., Stripe-Signature header) so the receiver can verify the payload is genuinely from the sender.\n\n**Step 3:** Enable idempotent handling — the event ID in the payload enables the receiver to deduplicate retries. The customer's endpoint must be idempotent to safely handle the same event delivered multiple times. After the retry window expires, mark the endpoint as failing and notify the customer.",
      hints: [
        "GitHub webhook delivery: the X-Hub-Signature-256 header contains HMAC-SHA256 of the payload body using the webhook secret.",
        "Stripe marks an endpoint as 'failing' after 3 days of retries and disables it, sending the customer an email."
      ],
    },
  ],

  "apigw-eventing-saga": [
    {
      id: "q-apigw-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In a microservices order system, the Saga pattern manages distributed transactions. What is the key difference between Saga choreography and Saga orchestration, and when is each preferred?",
      options: [
        "Choreography uses a central Saga orchestrator service; orchestration uses event-driven peer-to-peer communication between services",
        "Choreography: each service listens for events and reacts autonomously, publishing its own events — no central coordinator. Orchestration: a central Saga orchestrator explicitly commands each step and handles compensations. Choreography is preferred for simple linear flows; orchestration for complex multi-step sagas with conditional branching",
        "Choreography requires a shared database for step tracking; orchestration is fully stateless",
        "Choreography is only used in synchronous REST-based systems; orchestration is only for async message-driven systems"
      ],
      correctAnswer: 1,
      explanation: "Saga choreography vs orchestration works as follows:\n\n**Step 1:** Understand choreography — each service listens for events and publishes its own events autonomously (e.g., OrderCreated -> PaymentProcessed -> InventoryReserved). No central coordinator exists, making the saga logic distributed and harder to trace.\n\n**Step 2:** Understand orchestration — a dedicated OrderSagaOrchestrator service explicitly commands each step, tracks state, and calls compensation (refund, release inventory) on failure. It is easier to debug and monitor as a single state machine.\n\n**Step 3:** Choose based on complexity — choreography suits simpler, linear notification flows; orchestration suits complex multi-step sagas with conditional branching (used by Netflix, Uber, and Airbnb for financial sagas). Temporal.io is a popular workflow engine for Saga orchestration.",
      hints: [
        "Choreography: the flow logic is implicit in the event subscriptions. Orchestration: the flow logic is explicit in the orchestrator's state machine.",
        "Debugging choreography requires correlating events across multiple services via trace IDs. Orchestration has all state in one place."
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
