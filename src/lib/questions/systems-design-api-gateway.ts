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
      explanation: "An API gateway handles cross-cutting concerns: SSL termination, request routing, authentication, rate limiting, request/response transformation, and logging. Storing business logic and domain entities belongs in the microservices themselves. The gateway is infrastructure — it should remain stateless with respect to business rules. Netflix's Zuul and AWS API Gateway both follow this principle, delegating domain logic to downstream services.",
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
      explanation: "Terminating TLS at the gateway centralizes certificate provisioning, rotation, and management into a single operational concern. Internal east-west traffic can then use mTLS (via service mesh like Istio) or plain HTTP within a trusted VPC/network segment. This is far more operationally efficient than maintaining certificates on hundreds of microservices. Netflix terminates TLS at their edge proxy layer, then uses their internal network with mTLS enforced by Envoy sidecars for service-to-service calls.",
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
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Placing business logic in the API gateway creates a god-service anti-pattern. The gateway becomes a bottleneck: every business rule change requires a gateway deployment, it cannot be scaled independently per domain, and it couples unrelated services. Instead, business logic belongs in the appropriate microservice. The gateway handles only cross-cutting infrastructure concerns (auth, routing, rate limiting, logging). This is a classic mistake called the 'smart gateway, dumb services' anti-pattern.",
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
      explanation: "A single general-purpose API gateway forces all clients (iOS app, Android app, web browser, smart TV) to use the same response shapes and field sets. Mobile clients may need fewer fields to conserve bandwidth; web clients may need richer aggregated data in one round trip. The BFF pattern creates a dedicated backend per client type that aggregates, filters, and shapes responses specifically for that client. Sam Newman coined the term, and companies like SoundCloud, Netflix (with Falcor), and Lyft use variants of this pattern. The tradeoff is more services to maintain.",
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
      explanation: "The BFF pattern's value lies in ownership autonomy: one team owns the BFF and can evolve it independently. A shared BFF for iOS and Android means both teams must coordinate every change, recreating the coupling of a general API. Sam Newman warns specifically against this: 'a BFF should be owned by the same team that owns the frontend.' If iOS and Android teams are separate, they need separate BFFs. The extra operational cost of an additional service is the intended tradeoff for deployment independence.",
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
      explanation: "In client-side service discovery (Netflix Ribbon + Eureka), the client itself fetches the list of healthy instances from the registry and applies a load-balancing strategy (round-robin, least-connections, zone-aware). This means load-balancing logic lives in every client, but there is no single routing bottleneck. In server-side discovery (AWS ALB + ECS, Consul + Nginx), the client makes a request to a known router endpoint, and that router performs the registry lookup and forwards to a backend instance. Server-side is simpler for clients but adds a routing hop and a potential single point of failure.",
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
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "DNS has significant limitations for dynamic microservice environments: TTL-based caching means stale records persist after a pod dies, health checks are basic (TCP/HTTP) compared to Consul's script and gRPC checks, DNS returns only A/AAAA records (IP addresses) without port or metadata, and round-robin DNS provides no load-balancing awareness (it doesn't know which instance is overloaded). Consul, Eureka, and etcd provide richer health checking, immediate deregistration on failure, and support for metadata/tags used in advanced routing. DNS works well for stable, low-churn environments but struggles in Kubernetes-scale dynamic deployments.",
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
      explanation: "The circuit breaker analogy is deliberately inverted from electrical intuition: in software, an OPEN circuit means the circuit is broken — requests are blocked from flowing through to the failing service. This is the fail-fast mechanism: instead of waiting for timeouts on every request (which consumes threads and degrades the caller), the circuit breaker immediately returns an error or cached fallback. After a configured sleep window, it transitions to HALF-OPEN to test if the downstream has recovered. Netflix Hystrix popularized this pattern; Resilience4j is its modern replacement.",
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
      explanation: "A single success in HALF-OPEN is insufficient evidence that the downstream service has fully recovered — it could be an intermittent recovery on a still-degraded host. Production circuit breakers (Resilience4j, Polly) require a configurable number of consecutive successes or a success rate above a threshold (e.g., 5 successes, or 80% success rate over 10 probe requests) before returning to CLOSED. Closing too eagerly on one success risks a rapid OPEN-HALF_OPEN-OPEN oscillation that amplifies load spikes on a recovering service. This oscillation is sometimes called 'thundering herd' — every time the circuit reopens, a burst of traffic hits the recovering service.",
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
      explanation: "The circuit breaker prevents cascading failures: when Service A calls Service B and B is slow or failing, without a circuit breaker, A's thread pool fills up waiting, causing A to also become slow. Its callers then back up, and the failure spreads (cascade). The circuit breaker detects the failure rate, opens the circuit (blocks further calls to B), and lets A fail fast. This isolates the failure to B's scope. Netflix observed this pattern extensively when building Hystrix — a single dependency failure could bring down their entire streaming platform without isolation.",
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
      explanation: "The Bulkhead pattern allocates separate resource pools (thread pools, connection pools, or semaphores) per downstream dependency. If Service A calls both Service B and Service C, and B becomes slow, without bulkheads all of A's shared thread pool fills up waiting for B — starving calls to C. With bulkheads, B has its own pool of 20 threads and C has its own pool of 20 threads; B's slowness can exhaust only its 20 threads, leaving C's 20 threads unaffected. Netflix Hystrix implements both thread pool and semaphore bulkheads. Resilience4j provides BulkheadRegistry for this purpose.",
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
      explanation: "When N service instances all fail simultaneously (e.g., during a downstream restart), they all compute the same backoff duration (e.g., 2^1 = 2s, 2^2 = 4s). They all retry at the same moment, creating a synchronized surge that may overwhelm the recovering service, causing it to fail again — perpetuating the cycle. Jitter adds a random component (e.g., random(0, full_backoff)) to desynchronize retries across instances. AWS SDKs and Resilience4j both support 'full jitter' and 'decorrelated jitter' strategies. AWS published a seminal blog post 'Exponential Backoff And Jitter' showing jitter dramatically reduces total completion time under load.",
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
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Retrying non-idempotent operations (like POST /orders to create an order) can cause duplicate records if the original request succeeded but the response was lost. The retry would create a second order. To safely retry non-idempotent operations, the client must include an idempotency key (e.g., Idempotency-Key: <uuid> header — used by Stripe), and the server must store processed keys to detect and deduplicate retries. Exactly-once guarantees are notoriously hard to implement correctly across network boundaries. Only operations that are naturally idempotent (GET, PUT with full state, DELETE) can be retried safely without idempotency key infrastructure.",
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
      explanation: "Istio injects an Envoy sidecar proxy into each pod via a mutating admission webhook. This sidecar uses iptables rules to intercept all network traffic to and from the pod. The application code makes plain HTTP calls; the sidecar transparently handles mTLS handshakes, retry logic, circuit breaking, distributed trace header injection, and telemetry reporting. The application does not need to be modified. The control plane (Istiod) pushes xDS configuration (listeners, routes, clusters, endpoints) to all Envoy sidecars via gRPC. This separation allows the mesh to enforce uniform policy across services written in different languages.",
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
      explanation: "In Istio: the Data Plane consists of the Envoy sidecar proxies deployed alongside every workload. These proxies handle the actual network packets — applying mTLS, retries, timeouts, and circuit breaking in real time. The Control Plane is Istiod (which consolidates Pilot for service discovery and xDS config, Citadel for certificate management/SPIFFE identity, and Galley for config validation). Istiod pushes xDS protocol updates (Listener Discovery Service, Route Discovery Service, Cluster Discovery Service, Endpoint Discovery Service) to sidecars via a persistent gRPC stream. This architecture means control plane issues don't immediately break live traffic — sidecars cache their last configuration.",
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
      explanation: "SPIFFE (Secure Production Identity Framework for Everyone) certificates have short TTLs (e.g., 1 hour) by design — short-lived certs reduce the blast radius of a compromise. When a cert expires and SPIRE (the runtime agent) is unavailable to rotate it, the Envoy sidecar cannot present a valid certificate for mTLS handshakes. Peers with STRICT mTLS policy will reject connections, causing 503 errors. In PERMISSIVE mode, traffic would fall back to plaintext, which is a security downgrade. This is why SPIRE agent health and certificate rotation must be monitored with significant buffer before expiry. Production deployments should have cert TTL alerts at 20% remaining lifetime.",
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
      explanation: "The token bucket algorithm allows bursting up to the bucket capacity (100 tokens). When the client sends 150 requests, it consumes all 100 tokens for the first 100 requests. The remaining 50 requests find an empty bucket and are rejected (HTTP 429). After the burst, the bucket refills at 10 tokens/second, allowing sustained throughput of 10 rps. Token bucket is the preferred algorithm for APIs that need to accommodate legitimate burst traffic (e.g., app startup initializing multiple connections) while enforcing a steady-state rate. AWS API Gateway and Kong use token bucket variants. Compare to the leaky bucket, which smooths bursts by queuing them at a fixed output rate.",
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
      explanation: "Without atomic operations, a read-then-increment race (TOCTOU: Time Of Check To Time Of Use) allows two concurrent requests to each read a stale counter, both conclude they are within the limit, and both increment — resulting in a counter above the allowed maximum. Mitigation: use Redis atomic operations. The standard approach is a Lua script (executed atomically by Redis's single-threaded command processing) that combines the GET and INCR in one atomic transaction, or use Redis's INCR + EXPIRE combination with careful ordering, or the Redis INCRBY command which is atomic. Redis Cluster adds complexity because the sliding window key must be on the same shard. Stripe, Cloudflare, and Kong all use Lua scripts in Redis for atomic rate-limit enforcement.",
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
      explanation: "URI path versioning (/v1/, /v2/) is the most common choice for public APIs because: (1) URLs are self-documenting and unambiguous, (2) CDNs and reverse proxies can cache per-version without inspecting headers, (3) routing in the gateway is trivial (prefix-based), (4) URLs are bookmarkable and loggable. Stripe, Twilio, GitHub, and AWS all use URI path versioning. Header versioning (used by GitHub's Accept header) is cleaner but requires custom headers and is invisible in browser address bars. Query parameter versioning is discouraged by REST purists because the version is not a resource property. The tradeoff is that URI versioning requires URL duplication across versions.",
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
      explanation: "API keys are long-lived static secrets — revoking one requires rotating the key and updating all clients. They carry no inherent scope information and cannot expire without being regenerated. OAuth 2.0 client credentials flow issues short-lived access tokens (e.g., 1-hour TTL) with explicit scopes. Revoking access means revoking the client_id/secret — the next token request fails, and all existing tokens expire naturally. This makes OAuth 2.0 preferable for M2M scenarios where: (1) you need fine-grained permission scopes, (2) you want automatic token expiry as a security layer, (3) you want centralized revocation (at the auth server) without coordinating key rotation across all services. Kong, Apigee, and AWS API Gateway support both mechanisms.",
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
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "mTLS and OAuth 2.0 serve complementary, not competing, purposes. mTLS provides transport-layer identity — it proves 'this network connection comes from a process with a valid certificate for service X'. It does not carry authorization context (scopes, user identity, tenant ID). OAuth 2.0 provides application-layer authorization — the token carries claims about what the caller is allowed to do. Production systems often use both: mTLS (via Istio) enforces that connections are from known services, while a service-level JWT (from an OAuth server) carries the originating user context for audit and authorization decisions. Netflix uses mTLS for transport identity and then passes JWTs downstream for user-level authorization.",
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
      explanation: "WebSocket begins as an HTTP/1.1 Upgrade request (GET / HTTP/1.1, Connection: Upgrade, Upgrade: websocket). The gateway must forward this handshake to a backend and then become a transparent TCP tunnel for subsequent frames. The stateful, long-lived nature (connections can last hours) creates the sticky session requirement: if the gateway load balances subsequent frames to a different backend instance, the connection state is lost. Solutions: (1) consistent hashing by connection ID at the gateway, (2) a shared connection state store (Redis), or (3) a dedicated WebSocket tier. AWS API Gateway WebSocket APIs manage connection state via API Gateway itself, storing connectionId as the routing key. Kong, Nginx, and HAProxy support WebSocket proxying with proper sticky session configuration.",
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
      explanation: "Consistent head-based sampling requires that the sampling decision be made once — at the entry point (the gateway) — and propagated through the entire call chain via the trace context headers. B3 propagation (X-B3-TraceId, X-B3-SpanId, X-B3-Sampled) and W3C Trace Context (traceparent header with 'sampled' flag) both encode the sampling decision. All downstream services check the sampled flag and either record their span or not, ensuring either the full distributed trace is captured or none of it is. If each service makes independent decisions, you get orphaned spans — fragments of traces without their full chain. Istio's Envoy sidecars automatically propagate B3 headers and can enforce consistent sampling rates across the entire mesh.",
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
      explanation: "Canary deployment (named after the canary in a coal mine) routes a configurable small percentage (e.g., 1%, 5%, 10%) of real traffic to the new version, progressively increasing as confidence builds. The gateway can split by percentage, by specific request headers (X-Canary: true), by user cohort, or by geographic region. Blue-green keeps two full environments — blue (current) and green (new) — and switches 100% of traffic in one step via DNS or gateway config update. Canary allows gradual error rate comparison and rollback while limiting blast radius. Istio's VirtualService weight-based routing and AWS CodeDeploy both support canary deployments. Airbnb uses header-based canary routing extensively for API changes.",
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
      explanation: "Shadow traffic (request mirroring) sends a copy of live production requests to the new service version asynchronously — the client only waits for the primary service response. The shadow request is fire-and-forget from the user's perspective. The critical safety requirement: the shadow service must NOT produce real side effects. For a payment service, this means: connecting to a test Stripe account (not live keys), writing to a shadow database or disabling writes entirely, skipping email/SMS triggers, and skipping fraud scoring that might flag real users. Lyft uses shadow mode in their routing service tests. The Envoy mirror filter supports this natively (mirror_policy with runtime fraction). The primary service always responds; the shadow response is discarded or sent to a metrics comparison system.",
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
      explanation: "Conditional HTTP requests enable cache validation: the backend includes an ETag (e.g., a hash of the resource) or Last-Modified timestamp in the response. The gateway caches both the response and the validator. When the cache expires, instead of fetching the full resource, the gateway sends If-None-Match: <etag> (or If-Modified-Since). If the resource hasn't changed, the backend returns 304 Not Modified with no body — saving bandwidth. If changed, the full response is returned. This is called a 'stale-while-revalidate' pattern. AWS API Gateway, Varnish, and Nginx all support ETag-based conditional caching. The Vary header serves a different purpose: it tells the cache that the response varies by a specific request header (e.g., Vary: Accept-Encoding means separate caches for gzip vs plain).",
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
      explanation: "Error normalization is a critical gateway responsibility: (1) Security: stack traces reveal framework versions, file paths, and internal service names that attackers can use to target known vulnerabilities. (2) Client compatibility: non-standard status codes (like 599) break client libraries that handle only standard 4xx/5xx ranges. (3) Consistency: clients should see a uniform error contract regardless of which backend service failed. The gateway should log the full internal error (including stack trace) for debugging, but return a sanitized response: 502 Bad Gateway or 500 Internal Server Error with a structured error body like {\"error\": \"upstream_error\", \"requestId\": \"abc123\"}. The requestId allows support teams to correlate the sanitized client error with the full internal log.",
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
      explanation: "Idempotency key storage works as follows: (1) On the first request with key K, the server begins processing, stores the key K with status 'in-progress'. (2) If successful, the stored response is 'success + charge details'. (3) On retry with same key K, the server finds the stored result and returns it immediately without recharging. (4) If the original request is still in-progress when the retry arrives, the server returns 409 Conflict. Stripe stores idempotency keys for 24 hours in a Redis cache. The key insight: from the client's perspective, a timeout is ambiguous — the charge may have succeeded. Without idempotency keys, any retry risks a duplicate charge. With idempotency keys, the server's stored response is the source of truth. The idempotency key must be client-generated and globally unique (UUID v4 recommended).",
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
      explanation: "Production webhook delivery (Stripe, GitHub, Twilio pattern): (1) At-least-once delivery with exponential backoff retry: retry after 5s, 30s, 5min, 30min, 2h, 8h, 24h — up to 72 hours. (2) HMAC-SHA256 signature: the webhook payload is signed with a shared secret, allowing the receiver to verify authenticity (Stripe-Signature header). (3) The event ID in the payload enables the receiver to deduplicate retries. (4) After the retry window expires, the endpoint is marked as failing — customers are notified to investigate. In-memory buffering is dangerous (lost on restart); queues (SQS, Kafka) provide durability. The customer's endpoint must be idempotent to handle the same event delivered multiple times.",
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
      explanation: "Choreography (event-driven): OrderService publishes OrderCreated, PaymentService listens and publishes PaymentProcessed, InventoryService listens and publishes InventoryReserved. No central coordinator — services are decoupled but the overall saga logic is distributed across services, making it hard to trace and debug. Compensating transactions are also event-driven (PaymentFailed triggers OrderCancelled). Orchestration: a dedicated OrderSagaOrchestrator service explicitly calls PaymentService, then InventoryService, tracks state, and explicitly calls compensation (refund, release inventory) on failure. Orchestration is easier to debug and monitor (single state machine) but introduces a coordination service dependency. Netflix, Uber, and Airbnb use orchestration for complex financial sagas; simpler notification flows often use choreography. Temporal.io is a popular workflow engine for Saga orchestration.",
      hints: [
        "Choreography: the flow logic is implicit in the event subscriptions. Orchestration: the flow logic is explicit in the orchestrator's state machine.",
        "Debugging choreography requires correlating events across multiple services via trace IDs. Orchestration has all state in one place."
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
