import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-net-load-balancing": [
    {
      id: "q-sdi-net-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which load balancing algorithm is best suited for ensuring a user's session always hits the same backend server?",
      options: [
        "Round-robin",
        "Least connections",
        "IP hash",
        "Weighted round-robin",
      ],
      correctAnswer: 2,
      explanation:
        "IP hash computes a hash of the client's IP address and maps it to a specific backend server. This creates sticky sessions: the same client IP always routes to the same server, preserving session state without a shared session store.\n\n**Step 1**\nIdentify what each algorithm uses as its routing decision basis.\n- Round-robin cycles through servers in order.\n- Least connections routes to the server with the fewest active connections.\n- Weighted round-robin adjusts rotation by server capacity.\n- IP hash uses the client IP address as the routing key.\n\n**Step 2**\nDetermine which algorithm provides deterministic routing for the same client.\nBecause IP hash applies a hash function to the client IP, the same IP always maps to the same server. This is the only algorithm that inherently produces sticky sessions.\n\n**Step 3**\nConfirm the answer.\nRound-robin and least-connections distribute traffic without stickiness. Weighted round-robin adjusts distribution by server capacity but is still not session-sticky. Therefore, IP hash is the correct answer.",
      hints: [
        "Think about which algorithm uses a property of the client itself to determine routing.",
        "Session stickiness requires deterministic routing based on client identity.",
      ],
    },
    {
      id: "q-sdi-net-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the key difference between Layer 4 and Layer 7 load balancing?",
      options: [
        "L4 supports HTTP only; L7 supports TCP/UDP only",
        "L4 routes based on TCP/UDP headers without inspecting payload; L7 inspects HTTP content and can route by URL path or headers",
        "L4 is slower because it requires full TLS termination",
        "L7 cannot perform health checks on backends",
      ],
      correctAnswer: 1,
      explanation:
        "Layer 4 load balancers operate at the transport layer (TCP/UDP). They route traffic based on IP and port without inspecting the payload, making them fast but unable to make content-aware decisions. Layer 7 load balancers operate at the application layer (HTTP/HTTPS). They can read headers, cookies, and URL paths to make intelligent routing decisions.\n\n**Step 1**\nRecall what each OSI layer exposes to the load balancer.\n- Layer 4 (transport): IP address, source/destination ports, TCP flags.\n- Layer 7 (application): HTTP headers, cookies, URL path, request method.\n\n**Step 2**\nEvaluate each option against this distinction.\n- Option 1 is backwards: L4 handles TCP/UDP, L7 handles HTTP.\n- Option 2 correctly captures the difference: L4 reads network headers; L7 reads application content.\n- Option 3 is false: L4 is typically faster because it does less processing.\n- Option 4 is false: L7 load balancers perform rich health checks using HTTP semantics.\n\n**Step 3**\nConfirm the answer.\nLayer 7's ability to route $\\texttt{/api/*}$ to one backend and $\\texttt{/static/*}$ to another is a defining feature that Layer 4 cannot provide.",
      hints: [
        "The OSI model layers define what information is visible to the load balancer.",
        "Content-based routing (URL path, cookie, header) requires reading the HTTP request.",
      ],
    },
    {
      id: "q-sdi-net-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Active health checks involve the load balancer proactively sending periodic pings or HTTP requests to backend servers to determine their health.",
      correctAnswer: "True",
      explanation:
        "Active health checks are initiated by the load balancer itself. It sends periodic requests (e.g., an HTTP $\\texttt{GET /health}$) to each backend on a configured interval and marks a server as unhealthy if it fails to respond or returns an error status code.\n\n**Step 1**\nDistinguish who initiates the health check.\n- Active: the load balancer initiates the check.\n- Passive: the load balancer monitors real production traffic.\n\n**Step 2**\nRecognize the trade-offs.\nActive checks detect failures quickly but add background traffic overhead to backends. Passive checks have zero overhead but may allow several failed real requests before detecting an unhealthy server.\n\n**Step 3**\nConfirm the statement.\nThe statement accurately describes active health checks: proactive, periodic probes from the load balancer. Therefore, it is true.",
      hints: [
        "Consider who initiates the health check: the load balancer or the monitoring of real traffic.",
        "Active implies the load balancer takes action without waiting for a real user request.",
      ],
    },
    {
      id: "q-sdi-net-4",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which global load balancing approach routes traffic by advertising the same IP address from multiple geographic locations using BGP, so routers automatically direct clients to the nearest PoP?",
      options: [
        "GeoDNS",
        "Anycast",
        "Weighted round-robin DNS",
        "Latency-based routing",
      ],
      correctAnswer: 1,
      explanation:
        "Anycast allows the same IP address to be announced from multiple Points of Presence (PoPs) using BGP. Internet routers automatically route packets toward the topologically nearest PoP advertising that IP, minimizing latency without any DNS tricks.\n\n**Step 1**\nUnderstand how Anycast works.\nWith Anycast, every PoP advertises the same IP address via BGP. Routers along the internet backbone choose the shortest path to the nearest advertising PoP. If one PoP fails, BGP re-converges within seconds and routers automatically route to the next nearest PoP.\n\n**Step 2**\nCompare with the alternatives.\n- GeoDNS returns different A records based on the client's IP geolocation. It works at the DNS layer, not the network layer.\n- Weighted round-robin DNS rotates which IP is returned but does not use BGP.\n- Latency-based routing selects the lowest-latency endpoint from a set of candidates but also operates at the DNS level.\n\n**Step 3**\nConfirm the answer.\nAnycast is unique in that a single IP is reachable from multiple physical locations simultaneously via BGP, with routers performing the selection automatically.",
      hints: [
        "BGP routing converges based on path metrics, naturally selecting the shortest path.",
        "The key is that a single IP is reachable from multiple physical locations simultaneously.",
      ],
    },
  ],

  "sdi-net-cdn": [
    {
      id: "q-sdi-net-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which CDN caching strategy is most appropriate for a large collection of static assets whose full set is known before any user requests them?",
      options: [
        "Pull caching",
        "Push caching",
        "Passive caching",
        "Stale-while-revalidate",
      ],
      correctAnswer: 1,
      explanation:
        "Push caching (also called proactive caching) requires the origin server to upload content to CDN edge nodes before user requests arrive. This is ideal when the asset set is known in advance, such as a new software release or a video library.\n\n**Step 1**\nDefine each strategy.\n- Pull caching is lazy: the edge fetches content from origin on the first cache miss and caches it for subsequent requests.\n- Push caching is proactive: the origin uploads content to the CDN before any user requests it.\n- Passive caching and stale-while-revalidate are cache behavioral directives, not distinct strategies.\n\n**Step 2**\nEvaluate which fits the scenario.\nThe scenario states the asset set is known in advance. With push caching, you can pre-populate the edge cache, eliminating all origin hits from the start. Pull caching would incur an origin hit on every cold request.\n\n**Step 3**\nConfirm the answer.\nPush caching is the strategy designed for known-in-advance static assets.",
      hints: [
        "Pull is reactive—it waits for a cache miss. Push is proactive—you load the cache before requests arrive.",
        "If you know exactly which files will be requested, you can pre-populate the edge cache.",
      ],
    },
    {
      id: "q-sdi-net-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which Cache-Control directive specifically controls how long CDN/proxy caches may store a response, independently of the browser's max-age?",
      options: [
        "max-age",
        "s-maxage",
        "no-cache",
        "immutable",
      ],
      correctAnswer: 1,
      explanation:
        "The $\\texttt{s-maxage}$ directive targets shared caches (CDNs and proxies) specifically. When present, CDNs use $\\texttt{s-maxage}$ instead of $\\texttt{max-age}$ to determine their cache TTL.\n\n**Step 1**\nClarify what each directive does.\n\\[\n\\begin{align}\n\\texttt{max-age} &\\rightarrow \\text{sets TTL for all caches (browser + CDN)} \\\\\\[5pt]\n\\texttt{s-maxage} &\\rightarrow \\text{sets TTL for shared caches only (CDN/proxy)} \\\\\\[5pt]\n\\texttt{no-cache} &\\rightarrow \\text{revalidate with origin before serving} \\\\\\[5pt]\n\\texttt{immutable} &\\rightarrow \\text{suppresses revalidation requests during max-age} \n\\end{align}\n\\]\n\n**Step 2**\nIdentify the key distinction.\nThe $\\texttt{s}$ in $\\texttt{s-maxage}$ stands for shared cache. This lets you set different TTLs for browser cache and CDN cache simultaneously using two separate directives.\n\n**Step 3**\nConfirm the answer.\nOnly $\\texttt{s-maxage}$ specifically controls CDN/proxy cache duration independently of the browser.",
      hints: [
        "The 's' in s-maxage stands for 'shared' cache, as opposed to private browser cache.",
        "You can have different TTLs for browser cache and CDN cache using two separate directives.",
      ],
    },
    {
      id: "q-sdi-net-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why is URL versioning (e.g., /static/app.v123.js) considered the most reliable CDN cache invalidation strategy?",
      options: [
        "Because CDNs poll origin servers for version updates automatically",
        "Because changing the URL creates a cache miss on all edges instantly—no purge API needed",
        "Because it relies on ETags to detect file changes",
        "Because Cache-Control max-age is ignored for versioned URLs",
      ],
      correctAnswer: 1,
      explanation:
        "CDN caches are keyed by URL. When you deploy a new file version with a new URL (e.g., $\\texttt{app.v124.js}$), the CDN has never seen that URL before—every edge node treats it as a fresh cache miss and fetches from origin. The old URL continues to be served from cache for any stale links.\n\n**Step 1**\nUnderstand how CDN cache keys work.\nCDN caches use the full URL as the cache key. Two different URLs are two different cache entries.\n\n**Step 2**\nAnalyze why versioning is instant and atomic.\n\\[\n\\begin{align}\n\\texttt{app.v123.js} &\\rightarrow \\text{cached at all edges (unchanged)} \\\\\\[5pt]\n\\texttt{app.v124.js} &\\rightarrow \\text{completely fresh cache miss everywhere} \n\\end{align}\n\\]\nNo API calls, no propagation delays, no costs. Purge APIs (CloudFront invalidations, etc.) send commands to all edge nodes but typically take 5–10 minutes to propagate.\n\n**Step 3**\nConfirm the answer.\nThe defining property of URL versioning is that a new URL means a new cache entry—instant and global by definition.",
      hints: [
        "CDN caches use the full URL as the cache key.",
        "A new URL means the CDN has no cached copy—it must fetch fresh content from origin.",
      ],
    },
    {
      id: "q-sdi-net-8",
      type: "true-false",
      difficulty: "hard",
      question:
        "An origin shield is an intermediate CDN PoP placed between edge nodes and the origin server, designed to reduce the number of cache misses that reach the origin.",
      correctAnswer: "True",
      explanation:
        "An origin shield (called a regional edge cache in CloudFront) is an additional caching layer sitting between the edge PoPs and the origin server. When multiple edge nodes around the world experience a cache miss for the same object, instead of all independently hitting the origin, they all request from the single origin shield PoP.\n\n**Step 1**\nVisualize the request flow without an origin shield.\n\\[\n\\text{Edge (us-east)} \\rightarrow \\text{Origin} \\quad\\text{and}\\quad \\text{Edge (eu-west)} \\rightarrow \\text{Origin} \\quad\\text{both independently hit origin.}\n\\]\n\n**Step 2**\nVisualize the request flow with an origin shield.\n\\[\n\\text{Edge (us-east)} \\rightarrow \\text{Shield} \\leftarrow \\text{Edge (eu-west)} \\quad\\text{only one origin request if shield misses.}\n\\]\n\n**Step 3**\nConfirm the statement.\nThis is precisely the definition and purpose of an origin shield: reducing origin traffic by consolidating cache warm-up through a single intermediate layer.",
      hints: [
        "Think of it as a cache for the caches—a centralized intermediate layer between edges and origin.",
        "Without an origin shield, N edge PoPs each have their own cache warm-up period hitting origin.",
      ],
    },
  ],

  "sdi-net-api-design": [
    {
      id: "q-sdi-net-9",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which API paradigm is most suitable for internal microservice communication where performance, strong typing, and code generation are priorities?",
      options: [
        "REST",
        "GraphQL",
        "gRPC",
        "SOAP",
      ],
      correctAnswer: 2,
      explanation:
        "gRPC uses Protocol Buffers (Protobuf) as its IDL and binary serialization format. It generates strongly typed client and server stubs in multiple languages from a $\\texttt{.proto}$ file, making it ideal for internal microservice communication where you control both ends.\n\n**Step 1**\nCompare the paradigms on each criterion.\n\\[\n\\begin{array}{l|c|c|c}\n\\text{Criterion} & \\text{REST} & \\text{GraphQL} & \\text{gRPC} \\\\\n\\hline\n\\text{Serialization} & \\text{JSON} & \\text{JSON} & \\text{Protobuf (binary)} \\\\\\[5pt]\n\\text{Typing} & \\text{None} & \\text{Schema} & \\text{Generated stubs} \\\\\\[5pt]\n\\text{Code generation} & \\text{Optionally} & \\text{No} & \\text{Yes (proto)} \\\\\\[5pt]\n\\text{Streaming} & \\text{No} & \\text{No} & \\text{Yes (HTTP/2)}\n\\end{array}\n\\]\n\n**Step 2**\nEvaluate performance.\nBinary serialization (Protobuf) is significantly faster and more compact than JSON. This matters at high request volumes inside a datacenter.\n\n**Step 3**\nConfirm the answer.\ngRPC is purpose-built for high-performance, type-safe internal service communication and is the best fit among these options.",
      hints: [
        "Binary protocols are faster than text-based protocols like JSON.",
        "IDL-based code generation ensures type safety across service boundaries.",
      ],
    },
    {
      id: "q-sdi-net-10",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which API versioning strategy is generally considered the most visible to developers and most cache-friendly?",
      options: [
        "Header versioning (Accept: application/vnd.api.v1+json)",
        "Query parameter versioning (?version=1)",
        "URL path versioning (/v1/users)",
        "Subdomain versioning (v1.api.example.com)",
      ],
      correctAnswer: 2,
      explanation:
        "URL path versioning (e.g., $\\texttt{/v1/users}$, $\\texttt{/v2/users}$) places the version directly in the URL path, making it immediately visible in browser address bars, logs, and documentation. CDNs and HTTP caches can cache versioned endpoints independently because the URL is part of the cache key.\n\n**Step 1**\nEvaluate developer visibility.\nURL path versioning appears in every HTTP request and is the easiest to inspect, share, and debug. Header versioning requires inspecting request headers. Subdomain versioning requires looking at the host.\n\n**Step 2**\nEvaluate cache-friendliness.\nCDN cache keys are typically based on the URL. With URL path versioning, each version gets its own cache entry. Header and query parameter versioning are often stripped by caches or require special configuration to include in the cache key.\n\n**Step 3**\nConfirm the answer.\nStripe, Twilio, and GitHub all use URL path versioning. It is the de facto standard for public APIs.",
      hints: [
        "CDN cache keys are typically based on the URL path.",
        "Developer experience matters—where would you look first to find the version?",
      ],
    },
    {
      id: "q-sdi-net-11",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which of the following HTTP methods is NOT idempotent?",
      options: [
        "GET",
        "PUT",
        "DELETE",
        "POST",
      ],
      correctAnswer: 3,
      explanation:
        "POST is not idempotent: calling $\\texttt{POST /orders}$ twice creates two separate order resources with two different IDs. Idempotency means making the same request multiple times produces the same result as making it once.\n\n**Step 1**\nDefine idempotency for each method.\n\\[\n\\begin{align}\n\\texttt{GET} &\\rightarrow \\text{safe, idempotent (no side effects)} \\\\\\[5pt]\n\\texttt{PUT} &\\rightarrow \\text{idempotent (same body $\\Rightarrow$ same state)} \\\\\\[5pt]\n\\texttt{DELETE} &\\rightarrow \\text{idempotent (already-deleted $\\Rightarrow$ 404, still deleted)} \\\\\\[5pt]\n\\texttt{POST} &\\rightarrow \\text{not idempotent (creates a new resource each time)}\n\\end{align}\n\\]\n\n**Step 2**\nIdentify the method that always creates a new resource.\nPOST to a collection endpoint generates a new resource with a new ID on every call. This is the defining non-idempotent behavior.\n\n**Step 3**\nConfirm the answer.\nOnly POST creates a new resource on every call, making it the only non-idempotent method listed.",
      hints: [
        "Idempotency means repeated identical requests have the same effect as a single request.",
        "Which method always creates a new resource, generating a new ID each time?",
      ],
    },
    {
      id: "q-sdi-net-12",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which pagination strategy performs best at scale for large datasets and prevents page drift when new items are inserted?",
      options: [
        "Offset + limit pagination",
        "Cursor-based pagination",
        "Page number pagination",
        "Seek method with random access",
      ],
      correctAnswer: 1,
      explanation:
        "Cursor-based pagination uses an opaque cursor (typically a base64-encoded representation of the last-seen record's ID or timestamp) to mark the position in the dataset. Each request returns a $\\texttt{next\\_cursor}$ that encodes where to continue. This approach is stable: inserting new records between pages does not cause items to shift into different offset positions (page drift).\n\n**Step 1**\nAnalyze why offset-based pagination causes page drift.\n\\[\n\\begin{align}\n\\text{Page 1: offset}=0, \\text{limit}=10 \\rightarrow \\text{items }[1\\text{--}10] \\\\\\[5pt]\n\\text{Insert 10 new items} \\quad\\Rightarrow\\quad \\text{Page 1 now returns items }[11\\text{--}20]\n\\end{align}\n\\]\nWith offset pagination, new inserts before page 1 shift all subsequent pages.\n\n**Step 2**\nAnalyze why cursor-based pagination prevents drift.\nA cursor encodes the last position seen (e.g., $\\texttt{id} > 10$). The next query uses an indexed $\\texttt{WHERE id > last\\_seen}$ comparison, which is fast and unaffected by inserts elsewhere in the table.\n\n**Step 3**\nConfirm the answer.\nCursor-based pagination eliminates page drift and uses efficient indexed queries, making it the best choice at scale.",
      hints: [
        "OFFSET scans in SQL must skip all preceding rows, growing slower as offset increases.",
        "A cursor encodes the last position seen, making the next page query use an indexed comparison.",
      ],
    },
  ],

  "sdi-net-websocket": [
    {
      id: "q-sdi-net-13",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which real-time communication technology supports true bidirectional communication over a single persistent TCP connection?",
      options: [
        "Server-Sent Events (SSE)",
        "HTTP long polling",
        "WebSocket",
        "HTTP/2 push",
      ],
      correctAnswer: 2,
      explanation:
        "WebSocket establishes a persistent TCP connection via an initial HTTP upgrade handshake. Once upgraded, both client and server can send frames to each other at any time without the request-response framing overhead.\n\n**Step 1**\nDistinguish true bidirectionality from simulated push.\n- WebSocket: either side can send a frame independently at any time.\n- SSE: only the server can push; the client sends data via a separate HTTP request.\n- Long polling: simulates push by holding open HTTP requests until data is available—high latency and overhead.\n- HTTP/2 push: proactively sends resources associated with a response; not suitable for arbitrary bidirectional messaging.\n\n**Step 2**\nConfirm the key property.\nWebSocket's protocol upgrade ($\\texttt{Connection: Upgrade}$, $\\texttt{Upgrade: websocket}$) is what enables true bidirectional frames over one TCP socket.\n\n**Step 3**\nConfirm the answer.\nOnly WebSocket provides true bidirectional, full-duplex communication over a single persistent TCP connection.",
      hints: [
        "Bidirectional means both sides can initiate message sends independently.",
        "WebSocket reuses port 80/443 but upgrades from HTTP to the WS protocol.",
      ],
    },
    {
      id: "q-sdi-net-14",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In a horizontally scaled WebSocket system, a message sent by User A (connected to Server 1) needs to reach User B (connected to Server 2). What is the standard architecture to achieve this?",
      options: [
        "Sticky sessions so both users always connect to the same server",
        "A shared Redis Pub/Sub broker so Server 1 publishes the message and Server 2 forwards it to User B",
        "A database polling loop where Server 2 polls for new messages every 100ms",
        "HTTP/2 server push from Server 1 to Server 2",
      ],
      correctAnswer: 1,
      explanation:
        "WebSocket connections are stateful and server-affine: a user's socket is held open on one specific server. When User A (on Server 1) sends a message to User B (on Server 2), Server 1 cannot directly write to User B's socket. The standard solution is a pub/sub broker—typically Redis Pub/Sub or a message queue. Server 1 publishes the message to a channel. Server 2 is subscribed to that channel, receives the message, and forwards it through User B's open WebSocket.\n\n**Step 1**\nAnalyze why direct server-to-server delivery does not work.\n\\[\n\\text{Server 1} \\nrightarrow \\text{(no direct connection to User B's socket on Server 2)}\n\\]\nWebSocket sockets are not shared between servers. Each server only knows about its own open connections.\n\n**Step 2**\nEvaluate each option.\n- Sticky sessions prevent cross-server routing but do not solve cross-server delivery.\n- Database polling (every 100 ms) adds 100 ms latency minimum and excessive database load.\n- HTTP/2 push is for resource hints, not inter-server WebSocket forwarding.\n\n**Step 3**\nConfirm the answer.\nA pub/sub broker decouples servers: any server can publish to any channel, and any server subscribed receives the message for its local connected users.",
      hints: [
        "When connections are stateful, message delivery must cross server boundaries somehow.",
        "A pub/sub broker acts as the message bus between WebSocket servers.",
      ],
    },
    {
      id: "q-sdi-net-15",
      type: "true-false",
      difficulty: "medium",
      question:
        "HTTP/2 multiplexing is functionally equivalent to WebSocket for building real-time bidirectional applications because both allow the server to push data to the client at any time.",
      correctAnswer: "False",
      explanation:
        "HTTP/2 multiplexes multiple request-response streams over one TCP connection, which dramatically reduces head-of-line blocking compared to HTTP/1.1. However, HTTP/2 is still fundamentally a request-response protocol—all communication is initiated by the client. Server push in HTTP/2 is limited to pushing resources proactively alongside a response (e.g., pushing CSS when the browser requests HTML), not for arbitrary server-to-client messaging.\n\n**Step 1**\nDistinguish the communication models.\n\\[\n\\begin{align}\n\\text{HTTP/2 multiplexing} &\\rightarrow \\text{client initiates all streams; server pushes resources as hints} \\\\\\[5pt]\n\\text{WebSocket} &\\rightarrow \\text{either side can send a frame independently at any time}\n\\end{align}\n\\]\n\n**Step 2**\nIdentify the key difference.\nHTTP/2 server push cannot be used for general-purpose bidirectional messaging (chat, gaming, live trading). It is a hint mechanism for associated resources only.\n\n**Step 3**\nConfirm the answer.\nThe statement is false. WebSocket is truly bidirectional; HTTP/2 multiplexing is not.",
      hints: [
        "HTTP/2 server push is for resource hints, not arbitrary messaging.",
        "True bidirectionality means the server can initiate a message without a preceding client request.",
      ],
    },
    {
      id: "q-sdi-net-16",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Approximately how many concurrent WebSocket connections can a single well-tuned server handle with asynchronous I/O (e.g., Node.js or Go)?",
      options: [
        "1,000 – 5,000",
        "10,000 – 20,000",
        "50,000 – 100,000",
        "500,000 – 1,000,000",
      ],
      correctAnswer: 2,
      explanation:
        "With asynchronous non-blocking I/O, a single server can maintain 50,000–100,000 concurrent WebSocket connections. Each idle WebSocket connection consumes very little CPU—just an open file descriptor and a small amount of RAM for buffers (typically 2–10 KB).\n\n**Step 1**\nUnderstand what limits WebSocket scale.\n\\[\n\\begin{align}\n\\text{Thread-per-connection} &\\rightarrow \\text{fast exhaustion (thread stack } \\approx 1\\text{ MB)} \\\\\\[5pt]\n\\text{Async I/O (event loop)} &\\rightarrow \\text{one thread manages thousands of connections via callbacks}\n\\end{align}\n\\]\n\n**Step 2**\nIdentify the practical limits.\nThe OS file descriptor limit ($\\texttt{ulimit -n}$) must be increased from the default 1,024. At low message rates, memory is the first constraint; at high message rates, CPU becomes the bottleneck.\n\n**Step 3**\nConfirm the answer.\n50,000–100,000 is the well-documented range for production WebSocket servers using efficient async runtimes (Go goroutines, Node.js libuv, Erlang actors).",
      hints: [
        "Async I/O allows one thread to manage thousands of open connections via event callbacks.",
        "Each idle connection consumes an OS file descriptor and a small memory buffer, not a full thread.",
      ],
    },
  ],

  "sdi-net-dns": [
    {
      id: "q-sdi-net-17",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the correct order of servers contacted during a full (uncached) DNS resolution for a domain like www.example.com?",
      options: [
        "Client → Authoritative NS → TLD NS → Root NS → Recursive resolver",
        "Client → Recursive resolver → Root NS → TLD NS → Authoritative NS",
        "Client → Root NS → Recursive resolver → Authoritative NS → TLD NS",
        "Client → TLD NS → Root NS → Authoritative NS → Recursive resolver",
      ],
      correctAnswer: 1,
      explanation:
        "DNS resolution follows a hierarchical delegation chain. The client queries its configured recursive resolver. If not cached, the resolver asks a root nameserver which TLD nameserver (.com) to contact, then the .com TLD nameserver which authoritative nameserver holds records for example.com. Finally, the resolver queries the authoritative nameserver for the A record of www.example.com.\n\n**Step 1**\nMap the DNS hierarchy from top to bottom.\n\\[\n\\text{Root NS (.)} \\rightarrow \\text{TLD NS (.com)} \\rightarrow \\text{Authoritative NS (example.com)}\n\\]\n\n**Step 2**\nIdentify who drives the resolution.\nThe recursive resolver does the walking. The client only ever talks to its recursive resolver.\n\n**Step 3**\nConfirm the correct order.\nThe delegation chain is: client $\\rightarrow$ recursive resolver $\\rightarrow$ root NS $\\rightarrow$ TLD NS $\\rightarrow$ authoritative NS.",
      hints: [
        "DNS is hierarchical: root → TLD → authoritative, each delegating to the next level.",
        "The recursive resolver does the heavy lifting—the client only ever talks to it.",
      ],
    },
    {
      id: "q-sdi-net-18",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "You are designing a DNS-based failover system for a critical service. What TTL should you set for production DNS records to balance failover speed against resolver load?",
      options: [
        "5 seconds",
        "60–300 seconds",
        "1 hour (3600 seconds)",
        "24 hours (86400 seconds)",
      ],
      correctAnswer: 1,
      explanation:
        "A TTL of 60–300 seconds (1–5 minutes) is the practical sweet spot for production services with DNS-based failover. Low TTL enables fast failover but dramatically increases query volume to authoritative nameservers, which can cause DDoS-like conditions. High TTL means clients cache stale IP addresses for hours after a failover.\n\n**Step 1**\nAnalyze the trade-off.\n\\[\n\\begin{align}\n\\text{TTL too low (5 s)} &\\rightarrow \\text{fast failover, but massive resolver query load} \\\\\\[5pt]\n\\text{TTL too high (1 h+)} &\\rightarrow \\text{low load, but hours of stale IPs after a failover}\n\\end{align}\n\\]\n\n**Step 2**\nFind the practical range.\nNetflix and major SaaS providers use TTLs in the 60–300 second range. This provides recovery within a few minutes while keeping nameserver traffic manageable.\n\n**Step 3**\nConfirm the answer.\n60–300 seconds balances the maximum tolerable downtime against the load imposed on authoritative nameservers.",
      hints: [
        "Low TTL means faster failover but more nameserver traffic.",
        "What is the maximum downtime you can tolerate if a server IP changes?",
      ],
    },
    {
      id: "q-sdi-net-19",
      type: "true-false",
      difficulty: "hard",
      question:
        "DNS round-robin with multiple A records reliably distributes traffic evenly across backends because clients always respect DNS TTLs and re-query after expiration.",
      correctAnswer: "False",
      explanation:
        "DNS round-robin is unreliable for even load distribution for two reasons. First, many clients (browsers, JVM-based applications, mobile apps) cache DNS responses much longer than the TTL—they ignore TTL expiration and keep using the same IP for minutes or hours. Second, even when TTLs are respected, the client's local DNS cache sticks to one IP for the duration of the TTL.\n\n**Step 1**\nIdentify the first failure mode: client-side DNS caching.\nThe JVM, for example, caches DNS results indefinitely by default unless explicitly configured. Browsers also hold DNS entries well past TTL expiration. This means a single IP address can serve the vast majority of requests regardless of the TTL set.\n\n**Step 2**\nIdentify the second failure mode: TTL-aligned client batches.\nIf many clients resolve at similar times (e.g., after a TTL expires at the top of the hour), they all get the same rotation slot. This creates a thundering herd effect.\n\n**Step 3**\nConfirm the answer.\nDNS-based load balancing cannot detect backend health without active integration with a health-aware DNS provider. Therefore, the statement is false.",
      hints: [
        "Client-side DNS caching is beyond the control of the TTL you set.",
        "The JVM, for example, caches DNS results indefinitely by default unless configured otherwise.",
      ],
    },
  ],

  "sdi-net-messaging-protocols": [
    {
      id: "q-sdi-net-20",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In MQTT, which QoS level guarantees that a message is delivered exactly once using a four-step handshake?",
      options: [
        "QoS 0 (at-most-once)",
        "QoS 1 (at-least-once)",
        "QoS 2 (exactly-once)",
        "QoS 3 (persistent)",
      ],
      correctAnswer: 2,
      explanation:
        "MQTT QoS 2 (exactly-once delivery) uses a four-step handshake:\n\\[\n\\begin{align}\n1.\\ & \\texttt{PUBLISH} \\text{ from sender} \\\\\\[5pt]\n2.\\ & \\texttt{PUBCREC} \\text{ (publish received) from receiver} \\\\\\[5pt]\n3.\\ & \\texttt{PUBREL} \\text{ (publish release) from sender} \\\\\\[5pt]\n4.\\ & \\texttt{PUBCOMP} \\text{ (publish complete) from receiver}\n\\end{align}\n\\]\nThis ensures the message is neither lost nor duplicated.\n\n**Step 1**\nCompare QoS levels by delivery guarantee.\n- QoS 0: fire-and-forget, no acknowledgment, messages can be lost.\n- QoS 1: acknowledgment required (PUBACK), messages may be duplicated.\n- QoS 2: four-step handshake, neither lost nor duplicated.\n\n**Step 2**\nConfirm the answer.\nOnly QoS 2 provides exactly-once delivery, which is essential for financial or safety-critical IoT data.",
      hints: [
        "Higher QoS levels trade off latency and overhead for delivery guarantees.",
        "Exactly-once requires the receiver to track message IDs to detect and discard duplicates.",
      ],
    },
    {
      id: "q-sdi-net-21",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In AMQP (RabbitMQ), a message is published to an exchange with routing key 'order.created'. Which exchange type routes this message to ALL bound queues regardless of routing key?",
      options: [
        "Direct exchange",
        "Topic exchange",
        "Fanout exchange",
        "Headers exchange",
      ],
      correctAnswer: 2,
      explanation:
        "A fanout exchange broadcasts every message it receives to all queues bound to it, completely ignoring the routing key. This is ideal for publish-subscribe scenarios where all consumers need every message (e.g., broadcasting an order event to an inventory service, a notification service, and an analytics service simultaneously).\n\n**Step 1**\nDefine the routing behavior of each exchange type.\n\\[\n\\begin{align}\n\\texttt{Direct} &\\rightarrow \\text{routes to queues with exact binding key match} \\\\\\[5pt]\n\\texttt{Topic} &\\rightarrow \\text{wildcard pattern matching (e.g., } \\texttt{order.*} \\text{ matches } \\texttt{order.created)} \\\\\\[5pt]\n\\texttt{Fanout} &\\rightarrow \\text{ignores routing key—delivers to ALL bound queues} \\\\\\[5pt]\n\\texttt{Headers} &\\rightarrow \\text{routes based on message header attributes}\n\\end{align}\n\\]\n\n**Step 2**\nConfirm the answer.\nOnly the fanout exchange ignores the routing key entirely and delivers to every bound queue.",
      hints: [
        "Fanout ignores the routing key entirely—every bound queue receives every message.",
        "Think of fanout like a broadcast: one message, all subscribers.",
      ],
    },
    {
      id: "q-sdi-net-22",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which gRPC streaming mode allows the client to send a stream of messages and receive a single response when done (e.g., uploading a large file in chunks)?",
      options: [
        "Unary RPC",
        "Server streaming RPC",
        "Client streaming RPC",
        "Bidirectional streaming RPC",
      ],
      correctAnswer: 2,
      explanation:
        "Client streaming RPC allows the client to write a sequence of messages to the stream and send them to the server. When finished writing, the client signals completion and the server processes all received messages and returns a single response. This pattern is ideal for file uploads (sending chunks), bulk data ingestion, and telemetry batching.\n\n**Step 1**\nMap streaming modes to their directions.\n\\[\n\\begin{align}\n\\texttt{Unary} &\\rightarrow \\text{one request, one response} \\\\\\[5pt]\n\\texttt{Server streaming} &\\rightarrow \\text{one request, many responses (e.g., live events)} \\\\\\[5pt]\n\\texttt{Client streaming} &\\rightarrow \\text{many requests, one response (e.g., file upload)} \\\\\\[5pt]\n\\texttt{Bidirectional} &\\rightarrow \\text{many requests, many responses (both sides stream simultaneously)}\n\\end{align}\n\\]\n\n**Step 2**\nConfirm the answer.\nFile upload = client sends many chunks, server returns one confirmation. This is the definition of client streaming RPC.",
      hints: [
        "Match the streaming direction to the use case: who sends multiple messages?",
        "File upload = client sends many chunks, server returns one confirmation.",
      ],
    },
    {
      id: "q-sdi-net-23",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "You need strict message ordering for all events related to a single user's account. Using Apache Kafka, how do you guarantee order for a given user's events?",
      options: [
        "Use multiple partitions with a round-robin producer",
        "Use a single global Kafka topic with one partition",
        "Partition by user ID so all events for the same user go to the same partition",
        "Use Kafka Streams with a global KTable",
      ],
      correctAnswer: 2,
      explanation:
        "Kafka guarantees message ordering within a single partition. Consumers of a partition receive messages in the exact order they were produced. By using the user ID as the partition key, Kafka's consistent hashing maps all events for a given user to the same partition.\n\n**Step 1**\nClarify Kafka's ordering guarantee.\nKafka's guarantee is scoped to a partition, not a topic. Across partitions, there is no ordering guarantee.\n\n**Step 2**\nAnalyze each option.\n\\[\n\\begin{align}\n\\text{Round-robin} &\\rightarrow \\text{events for same user split across partitions} \\Rightarrow \\text{no ordering} \\\\\\[5pt]\n\\text{Single partition} &\\rightarrow \\text{one partition for all users} \\Rightarrow \\text{throughput bottleneck} \\\\\\[5pt]\n\\text{Partition by user ID} &\\rightarrow \\text{all user events in same partition} \\Rightarrow \\text{strict per-user order}\n\\end{align}\n\\]\n\n**Step 3**\nConfirm the answer.\nPartitioning by user ID ensures all events for the same user go to the same partition, preserving strict per-user ordering.",
      hints: [
        "Kafka ordering guarantee is scoped to a partition, not a topic.",
        "To order events for a specific entity, all events for that entity must go to the same partition.",
      ],
    },
  ],

  "sdi-net-security": [
    {
      id: "q-sdi-net-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "TLS 1.3 reduces the connection setup latency compared to TLS 1.2 primarily because it:",
      options: [
        "Eliminates the certificate exchange step entirely",
        "Reduces the handshake to 1 round trip (1-RTT) instead of 2",
        "Uses symmetric encryption for the entire handshake",
        "Allows the client to skip certificate verification",
      ],
      correctAnswer: 1,
      explanation:
        "TLS 1.3 redesigned the handshake to complete in 1 round trip (1-RTT) compared to TLS 1.2's 2 round trips. In TLS 1.3, the client sends its key share (Diffie-Hellman public key) in the first ClientHello message. The server responds with its key share, certificate, and the first encrypted application data—all in one round trip.\n\n**Step 1**\nCompare handshake round trips.\n\\[\n\\begin{align}\n\\texttt{TLS 1.2} &\\rightarrow \\text{ClientHello} \\rightarrow \\text{ServerHello + Certificate + KeyExchange} \\rightarrow \\text{2 RTTs} \\\\\\[5pt]\n\\texttt{TLS 1.3} &\\rightarrow \\text{ClientHello + KeyShare} \\rightarrow \\text{ServerHello + Certificate + KeyShare} \\rightarrow \\text{1 RTT}\n\\end{align}\n\\]\n\n**Step 2**\nEliminate incorrect options.\n- TLS 1.3 still requires certificates for authentication.\n- It does not use symmetric encryption for the handshake (ECDHE is still asymmetric key exchange).\n- Certificate verification is still performed.\n\n**Step 3**\nConfirm the answer.\nThe 1-RTT improvement comes from sending the key share immediately in the first ClientHello, enabling immediate key derivation.",
      hints: [
        "Round trips add latency: each RTT is at least one network propagation delay.",
        "TLS 1.3 sends the key share immediately in the first message, enabling faster key derivation.",
      ],
    },
    {
      id: "q-sdi-net-25",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A JWT access token is issued with a 15-minute expiry. The user logs out and the token should be immediately invalidated before the 15-minute window ends. What mechanism achieves this?",
      options: [
        "Increase the token's expiry to 1 second",
        "Store the token in a server-side session database and delete it on logout",
        "Maintain a token blacklist (denylist) checked on every request",
        "Use RSA-signed tokens instead of HMAC",
      ],
      correctAnswer: 2,
      explanation:
        "JWTs are stateless by design—the server does not store issued tokens, so there is no built-in revocation mechanism. If a token is compromised or a user logs out, the token remains cryptographically valid until its $\\texttt{exp}$ claim expires. To revoke tokens before expiry, systems maintain a token blacklist (typically in Redis): on logout, the token's JTI (JWT ID) is added to the blacklist with a TTL equal to the remaining token lifetime.\n\n**Step 1**\nExplain why short expiry alone is insufficient.\nWith a 15-minute expiry, the blast radius of a compromised token is at most 15 minutes. However, on logout you want immediate revocation, not up to 15 minutes of continued access.\n\n**Step 2**\nEvaluate each option.\n- Shortening the expiry to 1 second still doesn't provide immediate revocation.\n- Server-side session storage defeats the purpose of using JWTs (statelessness).\n- RSA vs HMAC signing is about algorithm strength, not revocation.\n\n**Step 3**\nConfirm the answer.\nA token denylist (Redis-backed) checked on every authenticated request enables immediate revocation while preserving the stateless JWT pattern.",
      hints: [
        "Stateless authentication has no server memory of issued tokens.",
        "Revocation requires some server-side state to track invalidated tokens.",
      ],
    },
    {
      id: "q-sdi-net-26",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the OAuth 2.0 authorization code flow with PKCE, what is the purpose of the code_verifier and code_challenge?",
      options: [
        "They replace the client secret for public clients and prevent authorization code interception attacks",
        "They encrypt the access token in transit",
        "They bind the authorization code to the user's IP address",
        "They generate the refresh token deterministically",
      ],
      correctAnswer: 0,
      explanation:
        "PKCE (Proof Key for Code Exchange) was designed for public clients (mobile apps, SPAs) that cannot securely store a client secret. The client generates a random $\\texttt{code\\_verifier}$, computes $\\texttt{code\\_challenge} = \\text{BASE64URL(SHA256(code\\_verifier))}$, and sends the challenge with the authorization request. When exchanging the code for tokens, the client also sends the original verifier. The server recomputes $\\texttt{SHA256(code\\_verifier)}$ and verifies it matches the stored challenge.\n\n**Step 1**\nUnderstand the attack PKCE prevents.\nAn attacker intercepts the authorization code from the redirect URI. Without PKCE, the attacker can exchange the code at the token endpoint (the code is all that is needed). With PKCE, the attacker cannot exchange the code without knowing the $\\texttt{code\\_verifier}$, which was never transmitted in plaintext.\n\n**Step 2**\nConfirm the answer.\nThe $\\texttt{code\\_verifier}$ is the secret; the $\\texttt{code\\_challenge}$ is a cryptographically bound hash of that secret sent upfront. This replaces the client secret for public clients.",
      hints: [
        "PKCE solves the problem of public clients that cannot store secrets securely.",
        "The verifier is secret; the challenge is a hash of the verifier sent upfront.",
      ],
    },
    {
      id: "q-sdi-net-27",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which CSRF prevention mechanism works by preventing the browser from including cookies in cross-origin requests at the browser level, without requiring server-side token generation?",
      options: [
        "CSRF token in hidden form field",
        "Double-submit cookie pattern",
        "SameSite=Strict cookie attribute",
        "Content-Security-Policy header",
      ],
      correctAnswer: 2,
      explanation:
        "The $\\texttt{SameSite=Strict}$ cookie attribute instructs the browser to never send the cookie in any cross-site request—whether triggered by a form, image tag, or script. This prevents CSRF attacks at the source: the forged request from the attacker's site arrives without the session cookie, so the server treats it as unauthenticated.\n\n**Step 1**\nCompare CSRF defenses.\n\\[\n\\begin{align}\n\\texttt{CSRF token} &\\rightarrow \\text{requires server-side generation and validation on every form} \\\\\\[5pt]\n\\texttt{Double-submit} &\\rightarrow \\text{requires matching cookie value with request header} \\\\\\[5pt]\n\\texttt{SameSite} &\\rightarrow \\text{browser-enforced, zero server-side work} \\\\\\[5pt]\n\\texttt{CSP} &\\rightarrow \\text{prevents XSS, unrelated to CSRF}\n\\end{align}\n\\]\n\n**Step 2**\nConfirm the answer.\nOnly $\\texttt{SameSite=Strict}$ is enforced by the browser itself, requiring no server-side token generation or validation.",
      hints: [
        "Browser-enforced defenses work regardless of server-side logic.",
        "SameSite controls when the browser attaches cookies to cross-origin requests.",
      ],
    },
  ],

  "sdi-net-microservices": [
    {
      id: "q-sdi-net-28",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In client-side service discovery, who is responsible for querying the service registry and selecting an instance to call?",
      options: [
        "The load balancer, which queries the registry and forwards the request",
        "The calling service itself, which queries the registry and applies its own load balancing logic",
        "The target service, which registers its own IP and selects its own callers",
        "The API gateway, which always centralizes registry lookups",
      ],
      correctAnswer: 1,
      explanation:
        "In client-side service discovery, the calling service (client) is responsible for querying the service registry (e.g., Consul, Eureka, etcd) to retrieve the list of available instances of the target service. The client then applies its own load balancing algorithm (round-robin, least connections, etc.) to select an instance and calls it directly. Netflix Ribbon + Eureka is the canonical example.\n\n**Step 1**\nContrast with server-side discovery.\nIn server-side discovery, the client sends a request to a load balancer or router, which queries the registry and forwards the request to an appropriate instance. The client has no awareness of the registry.\n\n**Step 2**\nConfirm the answer.\nClient-side discovery means the calling service does all the work: registry lookup plus load balancing. This eliminates the router as a potential bottleneck but adds complexity to each client.",
      hints: [
        "Client-side means the caller does the work. Server-side means an intermediary does it.",
        "Netflix OSS (Ribbon + Eureka) is the classic client-side service discovery implementation.",
      ],
    },
    {
      id: "q-sdi-net-29",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A circuit breaker is in the 'Open' state. What behavior does the calling service exhibit, and when does the circuit breaker transition to 'Half-Open'?",
      options: [
        "All requests pass through normally; the circuit moves to Half-Open after 50% of requests succeed",
        "All requests fail fast immediately without calling the downstream service; after a configured timeout (e.g., 60s), one test request is allowed through",
        "Requests queue up until the downstream service recovers; the circuit opens when the queue is drained",
        "The circuit breaker retries failed requests indefinitely until the downstream service responds",
      ],
      correctAnswer: 1,
      explanation:
        "When a circuit breaker is Open (triggered by a failure threshold, e.g., >50% errors in 10 seconds), it short-circuits all subsequent calls to the failing downstream service—requests fail fast with an error or fallback response without ever hitting the unhealthy service. This prevents cascading failures. After a configured wait period (typically 30–60 seconds), the circuit transitions to Half-Open and allows one test request through.\n\n**Step 1**\nClarify the Open state behavior.\n\\[\n\\texttt{Open} \\rightarrow \\text{fail fast, no calls reach the downstream service}\n\\]\nThis gives the failing service time to recover and prevents resource exhaustion in the calling service.\n\n**Step 2**\nClarify the Half-Open transition.\n\\[\n\\texttt{Open} \\xrightarrow{\\text{timeout}} \\texttt{Half-Open} \\xrightarrow{\\text{test request}} \\begin{cases} \\text{success} \\rightarrow \\texttt{Closed} \\\\ \\text{failure} \\rightarrow \\texttt{Open} \\end{cases}\n\\]\n\n**Step 3**\nConfirm the answer.\nNetflix Hystrix and Resilience4j implement exactly this state machine.",
      hints: [
        "Open circuit = fail fast, no calls reach the downstream service.",
        "Half-Open is a probe state: one request tests whether recovery has occurred.",
      ],
    },
    {
      id: "q-sdi-net-30",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The bulkhead pattern in microservices is named after ship compartmentalization. What problem does it solve?",
      options: [
        "It prevents unauthorized services from calling each other by enforcing mTLS",
        "It isolates thread pools or connection pools per downstream dependency so that exhausting one pool does not affect calls to other services",
        "It replicates service instances across availability zones to prevent single points of failure",
        "It rate-limits inbound requests to a service to prevent overload",
      ],
      correctAnswer: 1,
      explanation:
        "The bulkhead pattern prevents a slow or failing downstream service from exhausting shared resources (thread pool, connection pool) and degrading all other services. Without bulkheads, if Service A calls both Database B and Service C using a shared thread pool, and Database B becomes slow, its calls consume all threads—Service C calls also start queuing and failing even though Service C itself is healthy.\n\n**Step 1**\nIllustrate the problem.\n\\[\n\\begin{align}\n\\text{Without bulkheads:}\\ & \\text{Shared pool} \\rightarrow \\text{Database B slow} \\rightarrow \\text{all threads exhausted} \\rightarrow \\text{Service C also fails} \\\\\\[5pt]\n\\text{With bulkheads:}\\ & \\text{Pool B (Database B)} + \\text{Pool C (Service C)} \\rightarrow \\text{one slow} \\nRightarrow \\text{other affected}\n\\end{align}\n\\]\n\n**Step 2**\nConfirm the analogy.\nJust as a flooded compartment does not sink a ship with intact bulkheads, a slow dependency does not bring down calls to unrelated healthy services.\n\n**Step 3**\nConfirm the answer.\nThe bulkhead pattern's purpose is fault isolation between downstream dependencies via resource pool separation.",
      hints: [
        "Shared thread pools create hidden coupling between unrelated downstream dependencies.",
        "The goal is fault isolation: one slow dependency should not contaminate calls to other dependencies.",
      ],
    },
  ],
};

registerQuestions(questions);
