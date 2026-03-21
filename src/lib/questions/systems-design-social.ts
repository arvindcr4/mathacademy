import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "feed-fanout": [
    {
      id: "q-soc-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Twitter historically used fan-out on write (push model) for its home timeline, while Facebook used fan-out on read (pull model). What is the core trade-off between these two approaches?",
      options: [
        "Push model reduces read latency but increases write amplification; pull model increases read latency but avoids write amplification",
        "Push model is only suitable for mobile clients; pull model works for all clients",
        "Pull model requires more cache memory; push model requires no cache at all",
        "Push model uses more network bandwidth than pull model during reads",
      ],
      correctAnswer: 0,
      explanation: "Fan-out on write precomputes each user's timeline by writing every new tweet into all followers' timeline caches at post time. This gives O(1) reads but causes write amplification proportional to follower count — a tweet from a user with 10M followers triggers 10M cache writes. Fan-out on read delays work to read time: the home timeline is assembled by merging recent posts for all followees, which is cheap for accounts with few followees but expensive for users following thousands of accounts.",
      hints: [
        "Think about when the work happens: at write time or at read time.",
        "What happens to a viral tweet from a celebrity account with 50 million followers in the push model?",
      ],
    },
    {
      id: "q-soc-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Instagram's feed system uses a hybrid fan-out strategy to address the 'celebrity problem.' What does this hybrid approach do?",
      options: [
        "Celebrities get dedicated database shards; regular users share shards",
        "Posts from high-follower accounts (celebrities) are excluded from precomputed timelines and fetched on read; posts from regular users are pushed to follower caches on write",
        "Celebrity accounts are limited to 10 posts per day to reduce fan-out load",
        "Timelines for celebrity followers are computed in batch every 5 minutes instead of in real time",
      ],
      correctAnswer: 1,
      explanation: "The celebrity problem: fan-out on write becomes infeasible for accounts with tens of millions of followers because one post triggers millions of simultaneous cache writes. Instagram's hybrid approach: for regular users (follower count below a threshold like 1M), fan-out on write is used — their posts are pushed into follower timelines immediately. For celebrities, posts are NOT pushed; instead, when a follower reads their timeline, the system fetches the celebrity's recent posts on demand and merges them with the precomputed portion. This avoids the write storm while still keeping most of the timeline precomputed.",
      hints: [
        "The problem is that a celebrity's single post must be written to millions of cache entries simultaneously.",
        "How can you avoid that write amplification while still delivering the post quickly to readers?",
      ],
    },
    {
      id: "q-soc-3",
      type: "true-false",
      difficulty: "easy",
      question: "Twitter's user timeline (all tweets posted by a specific user, viewed on their profile page) is precomputed and stored in the same timeline cache as the home timeline (a user's personalized feed of people they follow).",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "False. Twitter maintains two separate timeline types. The user timeline contains only tweets posted by one specific user — it is fetched directly from that user's tweet store (a reverse-chronological query over their tweets). The home timeline is the personalized feed assembled from all accounts a user follows, which IS precomputed and stored in a cache (historically Redis). Mixing the two would be wasteful: the user timeline can always be recomputed cheaply by querying a single user's posts.",
      hints: [
        "A user timeline is just 'show me all tweets from @user in reverse order.' Does that require precomputation?",
        "Home timelines merge thousands of accounts' posts. Which one benefits most from precomputation?",
      ],
    },
  ],

  "social-graph-storage": [
    {
      id: "q-soc-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A social network with 1 billion users needs to store the follow relationship graph. Which storage approach is most practical at this scale?",
      options: [
        "Adjacency matrix — a 1-billion x 1-billion boolean matrix in a relational database",
        "Adjacency list — a table with (follower_id, followee_id) rows, sharded by follower_id, stored in a distributed key-value or relational store",
        "In-memory graph stored on a single server with fast RAM",
        "Each user stores their full follower list as a JSON blob in a document store with no indexing",
      ],
      correctAnswer: 1,
      explanation: "An adjacency matrix for 1 billion users would require 10^18 cells — completely infeasible. The adjacency list approach uses a table (follower_id, followee_id) where each row represents one directed follow edge. Sharding by follower_id means all rows for 'who does user X follow' are on the same shard, enabling O(1) shard lookup for fan-out. Facebook uses TAO (The Associations and Objects), a graph abstraction over MySQL shards. Twitter historically used FlockDB. The key insight is that average follows per user is sparse (thousands, not billions), making adjacency lists far more space-efficient.",
      hints: [
        "An adjacency matrix requires O(n^2) space. For 1 billion users, how many cells is that?",
        "Real social graphs are sparse — most users follow hundreds, not millions, of people.",
      ],
    },
    {
      id: "q-soc-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LinkedIn models connections as undirected edges (mutual friendship) while Twitter uses directed edges (follow). How does this distinction affect the storage schema for efficient inbox-style queries?",
      options: [
        "Directed graphs store edges once per pair; undirected graphs need no storage since connections are symmetric",
        "Directed graphs store each edge once (A->B separate from B->A); undirected connections typically store both (A,B) and (B,A) rows to avoid expensive OR-JOIN queries when finding all of a user's connections",
        "Undirected graphs always require a dedicated graph database; directed graphs work on any relational database",
        "The distinction has no impact on storage — both use the same (user_id_1, user_id_2) schema",
      ],
      correctAnswer: 1,
      explanation: "For a directed follow graph (Twitter), A following B (A->B) is stored once and B->A is a separate edge. For undirected connections (LinkedIn), a friendship between A and B is a single logical edge but is typically stored as two directed rows: (A,B) and (B,A). This denormalization avoids expensive JOIN or UNION queries at read time — to find all of A's connections, you query WHERE user_id_1 = A rather than WHERE user_id_1 = A OR user_id_2 = A. The trade-off is double storage cost, which is acceptable because average connection count is in the hundreds.",
      hints: [
        "If you only store (A,B) for a mutual connection, what query finds all of B's connections without scanning the entire table?",
        "Storing (A,B) and (B,A) doubles the rows but halves the query complexity. Is this a worthwhile trade-off?",
      ],
    },
  ],

  "real-time-notifications": [
    {
      id: "q-soc-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A social platform needs to push real-time notifications (new like, comment, follow) to users viewing the website. Comparing WebSockets, Server-Sent Events (SSE), and long polling — which statement is correct?",
      options: [
        "Long polling is the most efficient because the server never holds open connections",
        "WebSockets provide full-duplex communication over a single persistent TCP connection; SSE is server-to-client only over HTTP; long polling repeatedly reconnects after each server response",
        "SSE is bidirectional like WebSockets but uses UDP for lower latency",
        "All three mechanisms consume identical server resources per connected client",
      ],
      correctAnswer: 1,
      explanation: "WebSockets establish a persistent, full-duplex TCP connection after an HTTP upgrade handshake — both client and server can send messages at any time. SSE uses a persistent HTTP connection but is unidirectional (server to client only); clients send data via separate HTTP requests. Long polling has the client send a request, the server holds it open until an event occurs or times out, then the client immediately reconnects — creating connection overhead per event. For social notifications (server-push only), SSE is simpler than WebSockets and sufficient. Discord and WhatsApp Web use WebSockets because they also need client-to-server messages on the same connection.",
      hints: [
        "Which mechanisms require the connection to stay open between events?",
        "For notifications (server pushes to client only), do you need bidirectional communication?",
      ],
    },
    {
      id: "q-soc-7",
      type: "true-false",
      difficulty: "medium",
      question: "When a user has the Twitter app open on their phone, Twitter uses persistent WebSocket connections to deliver real-time tweet updates to the home timeline rather than relying solely on APNs/FCM push notifications.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "True. Push notifications via APNs (Apple Push Notification Service) and FCM (Firebase Cloud Messaging) are designed for app-in-background delivery — they wake the app or display a banner. When a user actively has the app open, a persistent connection (WebSocket or long-polling) is used to stream updates in real time without OS-level notification system overhead. The persistent connection provides lower latency and higher throughput than round-tripping through APNs/FCM. Most social apps use both: persistent connections when the app is foregrounded, and APNs/FCM when backgrounded.",
      hints: [
        "APNs and FCM are designed for what scenario — app open or app closed?",
        "Which mechanism gives lower latency for streaming updates to an actively-open app?",
      ],
    },
  ],

  "stories-ephemeral": [
    {
      id: "q-soc-8",
      type: "multiple-choice",
      difficulty: "easy",
      question: "Snapchat Stories and Instagram Stories automatically expire after 24 hours. What is the standard mechanism for enforcing TTL-based expiration at storage scale?",
      options: [
        "A cron job runs every hour and deletes all expired rows using a full table scan",
        "Stories are stored with a TTL attribute; a storage-level TTL mechanism (e.g., DynamoDB TTL, Redis EXPIRE, or Cassandra TTL) handles automatic deletion without blocking reads",
        "Expired stories are kept in the database forever but filtered out at the application layer on every read",
        "Stories are stored in RAM only and lost on server restart",
      ],
      correctAnswer: 1,
      explanation: "Production systems use storage-native TTL mechanisms rather than application-level polling. DynamoDB's TTL feature automatically deletes items within 48 hours of the epoch time stored in a designated attribute — no application code needed. Cassandra supports per-row TTL (INSERT ... USING TTL 86400) that automatically tombstones expired data. Redis EXPIRE sets per-key expiry handled by the Redis engine. Application-layer filtering (option C) risks returning expired content when the filter has bugs and wastes storage indefinitely. A full table scan cron job (option A) causes write amplification spikes and blocks reads.",
      hints: [
        "What happens to storage costs if expired stories are never deleted from the database?",
        "Which option eliminates the need for any application code to clean up expired data?",
      ],
    },
    {
      id: "q-soc-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Instagram Stories need to be delivered to all of a user's followers the moment they are posted. For a user with 5 million followers, what is the recommended delivery architecture?",
      options: [
        "Synchronously write the story to all 5 million follower feeds during the upload request, blocking until complete",
        "Publish a StoryPosted event to a message queue (Kafka); consumer workers fan out asynchronously to update follower notification stores and push notifications via APNs/FCM",
        "Store the story only in the poster's account; each follower fetches it when they open the Stories tray",
        "Email each follower a link to the story using a bulk email provider",
      ],
      correctAnswer: 1,
      explanation: "Synchronous fan-out to 5 million followers during the upload request would take minutes and create a massive write spike. The asynchronous event-driven approach decouples the upload response from delivery: the upload completes immediately, a StoryPosted event is enqueued to Kafka, and consumer worker pools fan out in parallel. Workers batch-write story references into follower notification stores (e.g., a Redis sorted set per follower keyed by story creation time), and trigger APNs/FCM push notifications for offline users. Option C (pull-on-open) works for the actual story content but still requires notification delivery so followers know a new story exists.",
      hints: [
        "What would happen to the upload API response time if the server had to notify 5 million followers synchronously?",
        "Message queues decouple which two concerns?",
      ],
    },
  ],

  "whatsapp-messaging": [
    {
      id: "q-soc-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "WhatsApp uses end-to-end encryption with the Signal Protocol. In this model, where are message decryption keys stored and what does this imply for server-side message access?",
      options: [
        "Keys are stored on WhatsApp's servers so they can decrypt messages for moderation",
        "Keys are generated and stored exclusively on user devices; WhatsApp servers store only ciphertext and cannot decrypt messages",
        "Keys are split between the user device and WhatsApp servers using Shamir's Secret Sharing",
        "Messages are encrypted with RSA-2048 and the private key is escrowed with a government authority",
      ],
      correctAnswer: 1,
      explanation: "The Signal Protocol uses X3DH (Extended Triple Diffie-Hellman) for key agreement and Double Ratchet for forward secrecy. Private keys never leave user devices. WhatsApp's servers store and forward only ciphertext — the server cannot read message content. Each message is encrypted with a session key derived from the Double Ratchet algorithm, which rotates keys after each message (forward secrecy: compromise of one key does not reveal past messages). This means WhatsApp cannot comply with requests to produce message contents even under legal compulsion, and cannot perform server-side content moderation on message text.",
      hints: [
        "If the server cannot see the decryption key, can it read the message content?",
        "What does 'forward secrecy' mean for what an attacker gains by compromising a single key?",
      ],
    },
    {
      id: "q-soc-11",
      type: "multiple-choice",
      difficulty: "medium",
      question: "WhatsApp delivers messages with three receipt states: single check (sent to server), double check (delivered to recipient device), and blue double check (read by recipient). How is the 'delivered to device' state tracked at scale?",
      options: [
        "The sender's phone polls the WhatsApp server every second to check delivery status",
        "The recipient's device sends a delivery acknowledgment (ACK) to the WhatsApp server upon receiving the message; the server stores this ACK and notifies the sender",
        "The server marks all messages as delivered after a fixed 5-second timeout",
        "Delivery state is tracked only on the sender's device by monitoring their network connection",
      ],
      correctAnswer: 1,
      explanation: "WhatsApp uses an explicit acknowledgment protocol: when the recipient's app receives a message (even in the background via a push notification wakeup), it sends a delivery ACK back to the server. The server stores this state per message and pushes an update to the sender's device, which renders the second check mark. Similarly, when the recipient opens the chat and the message scrolls into view, the app sends a 'read' receipt, triggering the blue double check. Messages are queued on the server if the recipient is offline and delivered when they reconnect, at which point the ACK is sent.",
      hints: [
        "How does the sender's app know the message was delivered without the sender's phone constantly polling?",
        "What must the server store to enable delivery status notifications?",
      ],
    },
  ],

  "discord-architecture": [
    {
      id: "q-soc-12",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Discord's largest servers (guilds) have hundreds of thousands of members. How does Discord shard its gateway connections to handle this at scale?",
      options: [
        "Every guild member maintains a direct WebSocket connection to the same gateway server as all other members of that guild",
        "Discord assigns each gateway server a shard ID; clients connect based on (guild_id % num_shards); a gateway server handles all events for guilds assigned to its shard",
        "Discord uses UDP multicast to broadcast messages to all guild members simultaneously",
        "Large guilds are split into sub-guilds of 1,000 members each, and members can only see messages from their sub-guild",
      ],
      correctAnswer: 1,
      explanation: "Discord's gateway sharding: each client connects to a gateway WebSocket server determined by its shard assignment. Guild events (messages, presence updates) are routed through the shard responsible for that guild_id. For very large guilds, Discord also uses 'large server' mode where full member list syncing is disabled by default — clients receive presence updates only for members they explicitly request or who are in shared voice/text channels. Discord's backend uses Elixir/Erlang for its gateway servers (leveraging BEAM's process model for millions of concurrent connections) and a distributed Pub/Sub system to fan out messages to all shards that have members in a given guild.",
      hints: [
        "If all guild members connected to the same server, what would happen when that server receives a burst of 100,000 presence updates?",
        "How does the modulo shard assignment ensure all messages for a guild go through the same routing path?",
      ],
    },
    {
      id: "q-soc-13",
      type: "true-false",
      difficulty: "medium",
      question: "Discord uses WebRTC for voice and video calls in its client applications, which means voice data travels peer-to-peer directly between users without passing through Discord's servers.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "False. While WebRTC is a peer-to-peer protocol, Discord routes all voice and video traffic through its own servers (Selective Forwarding Units or SFUs) rather than directly between peers. A peer-to-peer model breaks down for group calls: with N participants, each peer would need to upload N-1 streams, causing upstream bandwidth exhaustion for large voice channels. An SFU receives one stream from each participant and selectively forwards only the streams each other participant needs. This also works behind NAT/firewalls where true P2P connections often fail. Discord's SFUs are distributed globally to minimize latency.",
      hints: [
        "In a 20-person voice channel with pure P2P, how many upload streams does each participant need?",
        "What is a Selective Forwarding Unit (SFU) and why is it used instead of P2P?",
      ],
    },
  ],

  "feed-ranking": [
    {
      id: "q-soc-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LinkedIn's feed uses an ML ranking model (similar to Facebook's EdgeRank) to reorder posts. Which signals are most commonly used as features in such a ranking model?",
      options: [
        "Only the post's publication timestamp — newer posts always rank higher",
        "Affinity score (how often you interact with the poster), edge weight (type of interaction: like vs comment vs share), and time decay (recency of the post)",
        "Number of hashtags in the post and post character length",
        "The poster's account age and verification status only",
      ],
      correctAnswer: 1,
      explanation: "Facebook's EdgeRank originally used three factors: Affinity (how often you interact with the content creator — heavy interactors see more of their posts), Edge Weight (different interaction types have different weights: a comment signals stronger interest than a like, a share more than a comment), and Time Decay (older content scores lower via an exponential decay function). Modern systems replace EdgeRank with deep learning models that incorporate hundreds of signals including user demographics, device type, post media type, comment sentiment, and predicted probability of click/like/comment. These signals are combined and the feed is ranked by predicted engagement score.",
      hints: [
        "EdgeRank was Facebook's original feed ranking algorithm. What three factors did it use?",
        "Why would a comment be weighted more heavily than a like as an engagement signal?",
      ],
    },
  ],

  "distributed-counters": [
    {
      id: "q-soc-15",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A Facebook post receives 5 million reactions. Storing the exact reaction count in a single database row causes a hot-spot write bottleneck. What is the standard approach for distributed approximate counting at this scale?",
      options: [
        "Lock the counter row with SELECT FOR UPDATE for every reaction write",
        "Use sharded counters: distribute reaction writes across N counter shards (e.g., 100 rows), read the total by summing all shards, and optionally roll up to a single cached value periodically",
        "Store reactions in a blockchain for immutability and distributed counting",
        "Count reactions only once per hour using a batch MapReduce job and display the cached count",
      ],
      correctAnswer: 1,
      explanation: "A single counter row becomes a hot spot under millions of concurrent writes because each write requires acquiring a row lock. Sharded counters distribute write load: instead of one counter row, use N shards (e.g., 100 rows with shard_id 0-99). Each reaction write randomly picks a shard and increments it. Reading the total count requires summing all N shards. This reduces write contention by a factor of N. For display purposes, the summed count can be cached in Redis and refreshed periodically (eventual consistency is acceptable for like counts). This is the same pattern used by Apache Cassandra's counter columns internally.",
      hints: [
        "If 5 million writes all try to increment the same row, what happens to the row lock?",
        "What if you split that single counter into 100 counters and sum them on read?",
      ],
    },
    {
      id: "q-soc-16",
      type: "true-false",
      difficulty: "medium",
      question: "Facebook and Twitter display exact like/reaction counts (e.g., 4,827,341) rather than approximate counts because maintaining exact distributed counters is straightforward at billion-scale.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "False. At very high scale, maintaining perfectly exact counts across distributed systems requires expensive coordination. In practice, large social platforms display approximate counts: Instagram truncates to '4.8M' and Twitter shows '4.8K', reducing the precision requirement. Additionally, eventual consistency is acceptable — a count that is off by a few thousand for a fraction of a second is imperceptible to users. Facebook has written about using approximate counting mechanisms and sharded counters with periodic roll-up. Exact counting at billion-scale with strong consistency would require costly distributed transactions.",
      hints: [
        "Does a user care if the like count shows 4,827,341 vs 4,827,340?",
        "What consistency model does 'sharded counters with periodic rollup' provide?",
      ],
    },
  ],

  "rate-limiting": [
    {
      id: "q-soc-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Twitter limits tweet posting to prevent spam. Comparing the sliding window log algorithm vs. the token bucket algorithm for rate limiting, which statement is accurate?",
      options: [
        "Token bucket allows short bursts above the average rate; sliding window log is more memory-efficient",
        "Sliding window log stores a timestamp for each request (accurate but memory-intensive); token bucket allows bursts up to bucket capacity and consumes less memory by storing only the token count and last refill time",
        "Both algorithms use identical memory: one counter per user",
        "Sliding window log allows unlimited bursts; token bucket prevents all bursts",
      ],
      correctAnswer: 1,
      explanation: "Sliding window log keeps a sorted log of all request timestamps within the window (e.g., last 60 seconds) per user. This is perfectly accurate but uses O(requests) memory per user — for a user making 100 requests/minute, the log has 100 entries. Token bucket stores just two values per user: current token count and last refill timestamp. Tokens are added at a fixed rate up to a maximum capacity (bucket size). Requests consume tokens. The bucket capacity allows short bursts (e.g., 10 tweets in 2 seconds) while the refill rate enforces the sustained limit (e.g., 100 tweets/hour). Twitter uses token bucket-style limiting via Redis INCR with TTL for its API rate limits.",
      hints: [
        "How many values does token bucket need to store per user versus sliding window log?",
        "Token bucket has a 'capacity' parameter. What does that enable that a fixed-window counter does not?",
      ],
    },
  ],

  "user-search": [
    {
      id: "q-soc-18",
      type: "multiple-choice",
      difficulty: "medium",
      question: "LinkedIn's 'People You May Know' feature suggests mutual connections. Algorithmically, what is the most efficient approach for finding all users who share at least one mutual connection with a given user on a graph with 900 million nodes?",
      options: [
        "Run a depth-2 BFS from the user, collect all nodes at depth 2, and rank by mutual connection count",
        "Precompute similarity scores between all pairs of users nightly and store in a matrix",
        "Use a random walk algorithm that explores the graph for 1 hour per user request",
        "Query every user in the database and count mutual connections with the target user",
      ],
      correctAnswer: 0,
      explanation: "Depth-2 BFS (2-hop neighborhood) is the standard approach: starting from user U, visit all of U's direct connections (depth-1 neighbors), then all of their connections (depth-2 neighbors). The depth-2 nodes who are not already U's connections and not U themselves are candidates for 'People You May Know.' Rank them by count of mutual connections (how many depth-1 neighbors point to them). For efficiency, precompute and cache 1-hop adjacency lists per user. Full BFS is feasible because most users have O(hundreds) to O(thousands) of connections, so the 2-hop neighborhood is in the millions at most. Precomputing all pairs (option B) is O(n^2) = 8.1 x 10^17 pairs — completely infeasible.",
      hints: [
        "A mutual friend is someone you both know — what graph distance corresponds to this?",
        "How large is the 2-hop neighborhood of a typical LinkedIn user with 500 connections?",
      ],
    },
    {
      id: "q-soc-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Twitter's user search autocomplete (type '@e', show '@elonmusk', '@espn') must return results in under 50ms. Which data structure provides the fastest prefix lookup for billions of usernames?",
      options: [
        "Full-text search via Elasticsearch with wildcard queries on username",
        "Trie (prefix tree) stored in memory with the most popular matching usernames cached at each prefix node",
        "B-tree index on a relational database with a LIKE 'prefix%' query",
        "Linear scan of all usernames starting with the prefix",
      ],
      correctAnswer: 1,
      explanation: "A Trie (prefix tree) stores strings character by character, enabling O(L) prefix lookup where L is the prefix length. For autocomplete, each Trie node can store the top-K most popular matching usernames (by follower count or search frequency) pre-sorted. Traversing to the prefix node directly returns the top results without any additional scoring. At Twitter's scale, the full username Trie fits in memory (usernames are short, typically < 20 characters). Elasticsearch wildcard prefix queries work but add query parsing and network overhead. B-tree LIKE 'prefix%' is O(log n + results) but slower than an in-memory Trie due to disk/network latency. LinkedIn Typeahead uses a similar in-memory Trie with top-K caching.",
      hints: [
        "How many characters does a Trie need to traverse to find all usernames starting with 'elo'?",
        "If each Trie node stores the top-5 matching usernames, what is the result of a prefix lookup?",
      ],
    },
  ],

  "content-moderation": [
    {
      id: "q-soc-20",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Facebook moderates billions of posts per day for policy violations (hate speech, CSAM, misinformation). Which architecture correctly describes production-scale content moderation?",
      options: [
        "All posts are reviewed by human moderators before being published — no automated systems are used",
        "An async pipeline: content is published immediately, then processed by ML classifiers that assign violation probability scores; high-confidence violations are auto-actioned; borderline cases are queued for human review with ML-generated context",
        "A synchronous filter checks each post against a keyword blocklist during upload and rejects matching posts",
        "Moderation is crowd-sourced entirely through user reports with no proactive detection",
      ],
      correctAnswer: 1,
      explanation: "At Facebook's scale (hundreds of billions of pieces of content), synchronous review by humans is impossible. The production pipeline: (1) Content is immediately published. (2) ML classifiers run asynchronously: image classifiers (PhotoDNA hash matching for CSAM, object detection for violence), NLP models for hate speech and misinformation, video frame sampling. (3) High-confidence predictions (>threshold) trigger automatic removal/demotion. (4) Cases near the decision boundary are routed to human review queues, prioritized by severity and reach. (5) Human decisions feed back as training labels, continuously improving the models. This human-in-the-loop ML pipeline is the industry standard at all major platforms.",
      hints: [
        "How many human moderators would you need to review 100 billion posts per day at 2 minutes per post?",
        "What is the role of ML classifiers versus human reviewers in this pipeline?",
      ],
    },
  ],

  "auth-sessions": [
    {
      id: "q-soc-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A social platform issues JWT access tokens with a 15-minute expiry and refresh tokens with a 30-day expiry. What is the primary reason for using short-lived access tokens alongside long-lived refresh tokens?",
      options: [
        "JWTs are too large to store in a cookie, so they must be refreshed frequently to reduce storage costs",
        "Access tokens are stateless and cannot be invalidated before expiry; short expiry limits the damage window if a token is stolen, while refresh tokens can be revoked server-side by deleting them from the token store",
        "Refresh tokens encrypt the access token and can only be used once, making them more secure",
        "Short-lived access tokens reduce server CPU load because they require fewer signature verifications",
      ],
      correctAnswer: 1,
      explanation: "JWTs are stateless — the server does not store them, so there is no server-side way to invalidate a specific access token before it expires (short of maintaining a blocklist, which defeats the stateless advantage). If an access token is stolen, it is valid until expiry. Short expiry (15 minutes) limits this damage window. Refresh tokens, stored server-side (e.g., in a database or Redis), CAN be revoked instantly (e.g., on logout, password change, suspicious activity detection). When the access token expires, the client presents the refresh token to get a new access token — if the refresh token has been revoked, the user is forced to re-authenticate. This is the OAuth 2.0 pattern used by Facebook, Google, and Twitter.",
      hints: [
        "If a JWT access token is stolen, when does it stop working if you cannot invalidate it server-side?",
        "Why must refresh tokens be stored server-side to be revocable?",
      ],
    },
    {
      id: "q-soc-22",
      type: "true-false",
      difficulty: "easy",
      question: "OAuth 2.0 is an authentication protocol that verifies the identity of a user, while OpenID Connect (OIDC) is an authorization framework that grants third-party apps permission to access user resources.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "False — this is reversed. OAuth 2.0 is an authorization framework: it defines how a user grants a third-party application limited access to their resources without sharing credentials. OAuth 2.0 does not authenticate users — it does not establish who the user is. OpenID Connect (OIDC) is an identity layer built on top of OAuth 2.0 that adds authentication: it issues an ID token (a JWT) that contains claims about the authenticated user's identity (sub, email, name). When you click 'Sign in with Google,' Google uses OIDC to verify your identity and OAuth 2.0 to grant the app access to your profile data.",
      hints: [
        "OAuth 2.0 is about granting access to resources. Does that tell the app who the user is?",
        "OpenID Connect adds an 'ID token' to OAuth 2.0. What information does an ID token contain?",
      ],
    },
  ],

  "follow-consistency": [
    {
      id: "q-soc-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A user unfollows an account on a distributed social network. Due to eventual consistency, some nodes still show the follow relationship for a few seconds. What is the correct approach to handle this consistency-availability tradeoff?",
      options: [
        "Use two-phase locking across all nodes to make unfollow immediately consistent everywhere",
        "Accept eventual consistency for follow/unfollow — brief propagation delay is tolerable since showing a stale feed post is low-severity; use asynchronous event propagation via a message queue to converge all nodes",
        "Block all feed reads until unfollow has propagated to all nodes",
        "Require the user to manually refresh their feed after every follow/unfollow action",
      ],
      correctAnswer: 1,
      explanation: "The CAP theorem states you cannot have both perfect consistency and high availability in a distributed system under network partitions. For social follow/unfollow, the consequence of brief inconsistency is very low — seeing one extra post from an unfollowed account for a few seconds is a minor UX issue, not a data integrity problem. The accepted industry approach (used by Twitter, Instagram, Facebook) is eventual consistency: the unfollow event is published to a message queue (Kafka), consumer workers propagate the change to all relevant systems (timeline service, notification service, social graph caches) asynchronously. All nodes converge within seconds.",
      hints: [
        "What is the real-world harm if a user sees one post from an unfollowed account for 2 seconds?",
        "What does the CAP theorem say about the trade-off between consistency and availability?",
      ],
    },
  ],

  "trending-topics": [
    {
      id: "q-soc-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Twitter needs to compute trending topics in real time across 500,000 tweets per minute. Which data structure enables approximate frequency counting of hashtags in a fixed-size memory budget?",
      options: [
        "HashMap of all seen hashtags — exact but unbounded memory",
        "Count-Min Sketch — a probabilistic data structure that tracks approximate frequencies using multiple hash functions and a 2D array of counters, with bounded memory regardless of vocabulary size",
        "Bloom filter — tracks whether a hashtag has been seen, but not frequency",
        "Sorted array of (hashtag, count) pairs updated on every tweet",
      ],
      correctAnswer: 1,
      explanation: "Count-Min Sketch solves the heavy hitters problem in streaming data with bounded memory. It uses d hash functions and d arrays each of width w. To increment hashtag X: compute d hash values, increment count at position hash_i(X) in row i for each i. To query the frequency of X: take the minimum across all d counters (the minimum reduces overcount from hash collisions). Memory is fixed at d * w counters regardless of the number of unique hashtags. Twitter's trending algorithm uses stream processing (Kafka Streams or Flink) with Count-Min Sketch to identify hashtags with rapidly growing frequency over a sliding time window, then applies geographic and topic filtering.",
      hints: [
        "A HashMap grows without bound as new hashtags appear. What is the problem at 500K tweets/minute?",
        "Count-Min Sketch trades exact accuracy for fixed memory. For trending topics, is exact accuracy required?",
      ],
    },
  ],

  "media-upload": [
    {
      id: "q-soc-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Instagram allows uploading videos up to 60 minutes long. Which upload mechanism correctly handles large file uploads reliably over mobile connections?",
      options: [
        "Send the entire video file as a single HTTP POST body — the server buffers it all in RAM",
        "Split the file into chunks (e.g., 5 MB each), upload each chunk with a sequence number, allow resuming from the last successful chunk after a network failure, and reassemble server-side",
        "Compress the video to 144p before upload to minimize file size",
        "Use WebSockets to stream the raw video bytes to the server in real time",
      ],
      correctAnswer: 1,
      explanation: "Chunked resumable upload (used by YouTube, Google Drive, Instagram) solves two problems: (1) Reliability — mobile connections drop frequently; a single 2 GB HTTP request that fails must restart from zero, while chunked uploads resume from the last successful chunk. (2) Memory — buffering a 2 GB video in server RAM for a single request is wasteful; chunks are streamed directly to object storage (S3/GCS) as they arrive. Protocol: client requests an upload session (gets a session URL), uploads chunks with Content-Range headers, server acknowledges each chunk. On network failure, client queries the server for the byte offset of the last received chunk and resumes. YouTube's Resumable Upload API uses exactly this pattern.",
      hints: [
        "If a 1 GB upload fails at 99%, what happens with a single-request upload vs. a chunked upload?",
        "What HTTP header tells the server which byte range a chunk contains?",
      ],
    },
  ],

  "push-notifications": [
    {
      id: "q-soc-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A social app sends push notifications via APNs (iOS) and FCM (Android). A user receives 50 notifications in 1 second (a viral post blows up). How should the notification service handle this to avoid overwhelming the user?",
      options: [
        "Send all 50 notifications immediately — delivery order is the user's problem",
        "Deduplicate and collapse notifications server-side: batch related notifications into one (e.g., 'ElonMusk and 49 others liked your post'), using notification collapse keys (FCM) or apns-collapse-id (APNs) to replace previous unread notifications of the same type",
        "Drop all notifications after the first one per hour per user to prevent spam",
        "Send notifications via SMS instead of push when volume exceeds 10 per minute",
      ],
      correctAnswer: 1,
      explanation: "Both APNs and FCM provide collapse key mechanisms for exactly this use case. FCM's collapse_key and APNs' apns-collapse-id allow the platform to replace a previous undelivered notification with a newer one of the same type. The notification service groups events by type (likes, comments, new followers) and sends a single collapsed notification (e.g., 'Elon and 49 others liked your post') instead of 50 individual banners. Server-side aggregation: the notification service maintains a short aggregation window (1-5 seconds) per (user, notification_type) and emits one batched notification. This prevents notification fatigue and reduces APNs/FCM API call volume, which matters because both services have rate limits per device.",
      hints: [
        "What does a user experience when 50 notification banners appear in one second?",
        "FCM's collapse_key causes the push provider to do what when multiple notifications arrive for the same key?",
      ],
    },
  ],

  "comment-threading": [
    {
      id: "q-soc-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Reddit supports arbitrarily deep nested comments (a comment can have replies, which have replies, etc.). Which database schema supports efficient retrieval of an entire comment thread without N+1 queries?",
      options: [
        "Store parent_comment_id only; retrieve the thread by issuing one query per level of nesting",
        "Nested Set Model or Closure Table — precompute ancestor-descendant relationships so the entire subtree can be fetched in one query; alternatively, store the full materialized path (e.g., '1/4/7/12') as a string for each comment",
        "Store comments as a flat list ordered by creation time with no parent relationship",
        "Store the entire comment tree as a JSON blob per post, updating the blob on every new comment",
      ],
      correctAnswer: 1,
      explanation: "The adjacency list model (parent_comment_id only) requires recursive queries or N+1 fetches (one query per depth level) to retrieve a full thread. Three better approaches: (1) Closure Table — a separate table storing (ancestor_id, descendant_id, depth) for every ancestor-descendant pair, enabling O(1) subtree fetch at the cost of O(depth) writes per comment. (2) Materialized Path — store '1/4/7/12' as a string in each comment row; fetch entire subtree with WHERE path LIKE '1/4/7/%'. (3) Nested Set — assign left/right boundaries to each node; subtree fetch is WHERE left BETWEEN parent.left AND parent.right. Reddit and Hacker News use materialized paths.",
      hints: [
        "If you only store parent_comment_id, how many SQL queries do you need to fetch a thread 5 levels deep?",
        "What does 'materialized path' store in each row that makes subtree queries a single LIKE query?",
      ],
    },
  ],

  "direct-messaging": [
    {
      id: "q-soc-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Facebook Messenger stores messages so that both sender and recipient can retrieve their conversation history. Which storage model is standard for inbox retrieval at scale?",
      options: [
        "Store each message once in a global messages table; inbox retrieval is a JOIN between users and messages",
        "Store messages in a per-conversation log (conversation_id, message_id, timestamp, content); each user's inbox is a list of conversation_ids they participate in, with last_message_timestamp for sorting",
        "Store the full conversation as a text blob that is appended to on each new message",
        "Store messages only on the sender's device and transfer them peer-to-peer when the recipient requests them",
      ],
      correctAnswer: 1,
      explanation: "The industry standard (used by Facebook Messenger, Slack, Discord) separates message storage from inbox indexing. Messages are stored in an append-only log keyed by (conversation_id, message_id). The inbox is a separate lightweight structure per user: a list of (conversation_id, last_message_preview, last_activity_timestamp) — enough to render the inbox list without fetching full message history. Opening a conversation fetches messages from the conversation log paginated by message_id. This separation allows inbox retrieval to be fast (small payload, indexed by user_id) while full message history is fetched lazily. Facebook's original Messenger used HBase for the message log, with a separate MySQL table for inbox metadata.",
      hints: [
        "An inbox view shows conversation previews, not full message history. What is the minimum data needed for each conversation row?",
        "Why separate the inbox list from the full message log?",
      ],
    },
  ],

  "graph-traversal": [
    {
      id: "q-soc-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "LinkedIn wants to show the shortest path between two users (the 'how are you connected' feature). Standard BFS from one user to another on a graph of 900 million nodes is too slow. Which optimization makes this feasible?",
      options: [
        "Run Dijkstra's algorithm from the source user to find shortest paths to all 900 million users",
        "Bidirectional BFS — run BFS simultaneously from both the source and target, expanding the frontier from each side alternately until the two frontiers meet; this reduces the search space from O(b^d) to O(b^(d/2))",
        "Use DFS (Depth-First Search) which is faster than BFS for social graphs",
        "Precompute all-pairs shortest paths nightly and store them in a lookup table",
      ],
      correctAnswer: 1,
      explanation: "Standard BFS from node S explores O(b^d) nodes where b is the average branching factor (connections per user) and d is the path length. On LinkedIn with average 500 connections, BFS to depth 6 explores 500^6 = 10^16 nodes — infeasible. Bidirectional BFS runs BFS from both S and T simultaneously. The two frontiers meet at depth d/2 from each side, reducing nodes visited to O(b^(d/2)) on each side. For d=6 and b=500: 2 * 500^3 = 250 million — manageable. In practice, LinkedIn only shows up to 3rd-degree connections and uses precomputed 2-hop neighborhoods cached per user to make this interactive.",
      hints: [
        "BFS explores exponentially more nodes at each depth level. What does exploring from both ends simultaneously do to the maximum depth each side needs to reach?",
        "If two BFS frontiers meet in the middle, at what depth from each starting node do they collide?",
      ],
    },
  ],

  "cdn-invalidation": [
    {
      id: "q-soc-30",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user edits their Instagram profile photo. The old photo is cached at CDN edge nodes worldwide with a long Cache-Control max-age. How should this cache invalidation be handled?",
      options: [
        "Wait for the TTL to expire naturally — users will see the old photo until the cache expires",
        "Use URL versioning: the new photo is stored at a new URL (e.g., include a hash of the content in the filename); the old cached URL becomes stale naturally while the new URL is immediately served fresh",
        "Send a cache purge request to every CDN edge node globally before updating the photo",
        "Use Cache-Control: no-store for all profile photos to prevent caching",
      ],
      correctAnswer: 1,
      explanation: "URL versioning (content-addressed storage) is the gold standard for CDN cache invalidation. When a user uploads a new profile photo, it is stored with a URL that includes a hash of the image bytes (e.g., /photos/user123/avatar_a3f2b9c1.jpg). The user's profile record in the database is updated to point to the new URL. CDN edge nodes for the old URL eventually expire naturally (or are purged selectively). The new URL is a cache miss on first access and then cached normally. This eliminates the need for active cache invalidation entirely. Sending purge requests to all edge nodes (option C) works but adds operational complexity and latency for global CDNs with thousands of edge nodes.",
      hints: [
        "If the URL changes every time the content changes, why does cache invalidation become unnecessary?",
        "How does content-addressed storage (hash in the filename) guarantee cache correctness without active invalidation?",
      ],
    },
  ],

  "anti-spam": [
    {
      id: "q-soc-31",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Twitter needs to detect bot accounts that post spam at scale. Which combination of signals is most effective for behavioral bot detection?",
      options: [
        "Check only if the account has a profile picture and bio — bots rarely fill these in",
        "Analyze behavioral fingerprints: inter-tweet timing distribution (bots post at unnaturally regular intervals), follower/following ratio, account age vs. activity velocity, device fingerprint consistency, and API usage patterns (bots use Twitter API, not mobile apps)",
        "Block all accounts created in the last 24 hours from posting",
        "Require all users to solve a CAPTCHA before every tweet",
      ],
      correctAnswer: 1,
      explanation: "Sophisticated bots fill in profile fields to evade simple heuristic checks. Behavioral signals are much harder to fake at scale: (1) Timing patterns — human tweet inter-arrival times follow natural human activity rhythms; bots often post at machine-regular intervals or in inhuman bursts. (2) Network graph signals — bot accounts often have high following counts but few organic followers, or follow/unfollow in bulk patterns. (3) Content velocity — posting dozens of near-identical tweets per minute. (4) Device fingerprint — bots use a small set of devices or API clients, lacking the diversity of organic users. (5) Coordination — a cluster of accounts that all engage with the same content within seconds of each other signals coordinated inauthentic behavior. Twitter's Trust and Safety team uses ML models trained on these signals.",
      hints: [
        "What makes human posting behavior different from automated posting behavior at the timing level?",
        "If 1,000 accounts all like and retweet the same tweet within 2 seconds of each other, what does that suggest?",
      ],
    },
  ],

  "ab-testing": [
    {
      id: "q-soc-32",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Facebook runs thousands of simultaneous A/B experiments. How does experiment assignment ensure consistent bucketing (a user always sees the same variant) without storing the assignment in a database?",
      options: [
        "Store a mapping of (user_id, experiment_id) -> variant in Redis for every user and experiment",
        "Hash the (user_id, experiment_id) tuple to a value in [0, 1) using a deterministic hash function; users in [0, 0.5) are in the control group; users in [0.5, 1.0) are in the treatment group — the same hash always produces the same assignment",
        "Assign variants randomly on each page load — statistical averaging ensures balanced groups over time",
        "Assign variants based on user creation date modulo the number of experiment groups",
      ],
      correctAnswer: 1,
      explanation: "Deterministic hash-based assignment is the industry standard (used by Facebook, Google, Netflix). The hash function (e.g., MurmurHash3 or SHA-256) takes (user_id + experiment_id + salt) as input and outputs a deterministic pseudo-random number in [0, 1). Users in bucket [0, 0.5) see variant A; [0.5, 1.0) see variant B. Because the hash is deterministic, the same user always gets the same assignment without any database lookup. The experiment_id in the hash ensures different experiments give independently distributed assignments — a user in treatment for experiment 1 is not correlated with their assignment in experiment 2. This approach scales to billions of users with zero storage overhead per assignment.",
      hints: [
        "How do you get the same output from a function without storing state, given the same input?",
        "Why include the experiment_id in the hash input?",
      ],
    },
  ],

  "privacy-acl": [
    {
      id: "q-soc-33",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Facebook's privacy settings allow users to share posts with 'Friends,' 'Friends of Friends,' 'Only Me,' or custom lists. How is this access control enforced at query time for a feed with billions of posts?",
      options: [
        "Before serving any post, query the social graph to check if the viewer is within the poster's allowed audience — done synchronously per post",
        "Store the audience setting (privacy_level, allowed_user_ids_set) with each post; at feed generation time, fan-out workers include the post in a user's timeline only if the viewer is in the allowed audience, so no per-request ACL check is needed",
        "All posts are public by default; privacy settings only hide posts from search results",
        "Encrypt posts with the poster's public key; only friends have the decryption key",
      ],
      correctAnswer: 1,
      explanation: "Synchronous per-post ACL checks at read time would require social graph queries for every post in every feed — prohibitively expensive at scale. The scalable approach pushes privacy enforcement to write time (fan-out): when a post is created, the fan-out worker checks each potential recipient's eligibility before writing the post into their timeline cache. A 'Friends only' post is fanned out only to confirmed mutual friends. A 'Friends of Friends' post fans out to a 2-hop neighborhood. Because the timeline is precomputed with privacy already applied, reads require no ACL checks. Facebook uses this approach via their TAO social graph cache for sub-millisecond edge lookups during fan-out.",
      hints: [
        "If a timeline is precomputed, at what point should privacy filtering happen?",
        "What is the cost of checking social graph membership for every post on every feed read?",
      ],
    },
  ],

  "live-streaming": [
    {
      id: "q-soc-34",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Instagram Live and TikTok Live support thousands of concurrent viewers for a single stream. What is the correct architecture for low-latency live video delivery at this scale?",
      options: [
        "The streamer's phone directly accepts WebRTC peer connections from all viewers — pure P2P",
        "The streamer ingests via RTMP to an ingest server; the stream is transcoded to multiple bitrates and packaged as HLS/DASH segments; CDN edge nodes pull and cache segments close to viewers, delivering via HLS with 2-4s latency",
        "The stream is stored in a database and viewers poll for new frames every 100ms",
        "Viewers connect via UDP directly to the database server hosting the stream",
      ],
      correctAnswer: 1,
      explanation: "Live streaming architecture: (1) Ingest — the broadcaster streams via RTMP or WebRTC to an ingest server close to their location. (2) Transcoding — a transcoder converts the incoming stream to multiple quality levels (1080p, 720p, 360p) in real time. (3) Packaging — the transcoded stream is sliced into 2-4 second HLS or DASH segments and uploaded to an origin server. (4) CDN delivery — CDN edge nodes pull segments from origin and cache them; viewers receive HLS playlists that reference segment URLs on nearby edge nodes. HLS latency is 6-30 seconds depending on segment duration. For lower latency (1-3s), Low Latency HLS (LLHLS) or WebRTC-based delivery is used. A single streamer's phone cannot handle thousands of direct viewer connections — bandwidth and CPU would be exhausted.",
      hints: [
        "Why can't the streamer's phone handle thousands of direct viewer connections?",
        "What is the purpose of CDN edge nodes in this architecture?",
      ],
    },
  ],

  "group-chat": [
    {
      id: "q-soc-35",
      type: "multiple-choice",
      difficulty: "medium",
      question: "WhatsApp supports group chats with up to 1,024 members. When a message is sent to a group, how should the server deliver it to all members efficiently?",
      options: [
        "The sender's phone directly connects to all 1,024 members and sends the message peer-to-peer",
        "The server stores the message once in the group's message log, then fans out delivery to each member's message queue — each member's device retrieves their pending messages via their own connection to the server",
        "The server broadcasts the message using IP multicast to all group members simultaneously",
        "Each message is duplicated and stored 1,024 times in the database — one copy per member",
      ],
      correctAnswer: 1,
      explanation: "Server-side fan-out with a shared message store: the message is written once to the group's message log (identified by group_id). The server then creates delivery entries for each of the 1,024 members — a lightweight record that the member needs to receive message Y. When a member's device is connected, pending delivery entries are processed and the message (or a reference to the shared message) is pushed over their WebSocket connection. For offline members, the delivery is queued and triggered when they reconnect. This approach avoids storing 1,024 full copies of the message. For end-to-end encrypted group messages (WhatsApp's Signal Protocol sender keys), the sender encrypts once with a group session key, and the server distributes the same ciphertext to all members.",
      hints: [
        "If the message is stored once in the group log, what does each member's delivery entry contain?",
        "How does sender key encryption avoid encrypting the same message 1,024 times for E2E encrypted groups?",
      ],
    },
  ],

  "data-retention": [
    {
      id: "q-soc-36",
      type: "multiple-choice",
      difficulty: "hard",
      question: "GDPR's 'Right to Erasure' (Article 17) requires a social platform to delete all personal data of a user upon request. What makes this technically challenging at scale?",
      options: [
        "Databases cannot physically delete rows — they can only mark them as inactive",
        "User data is spread across multiple systems (primary DB, search indexes, CDN caches, analytics warehouses, backup snapshots, ML training datasets, audit logs); each system requires separate deletion logic, and some (backups, ML datasets) are expensive to selectively modify",
        "GDPR only applies to European users, so only one data center needs to comply",
        "Deleting a user account automatically cascades to all associated data in all systems via foreign key constraints",
      ],
      correctAnswer: 1,
      explanation: "Right to erasure is technically hard because user data is pervasive across heterogeneous systems: (1) Primary databases — cascade deletes via foreign keys handle structured data but take time for large accounts. (2) Search indexes (Elasticsearch) — must re-index or apply delete-by-query. (3) CDN caches — profile photos and posts cached at edge nodes with long TTLs must be purged. (4) Analytics data warehouses (Hive, BigQuery) — typically immutable; erasure requires rewriting partitions or pseudonymization. (5) ML training datasets — if a user's data was used to train a model, retraining is expensive. (6) Backup snapshots — deleting from live systems does not remove data from point-in-time backups; backups must age out or be selectively purged. (7) Audit/compliance logs — may be legally required to retain, creating tension with erasure rights. Industry practice uses a deletion pipeline that fans out deletion events to all downstream systems asynchronously, with SLA tracking.",
      hints: [
        "A user's data exists in how many different systems beyond just the primary database?",
        "What happens to user data that was included in a backup snapshot taken before the deletion request?",
      ],
    },
  ],
};

registerQuestions(questions);
