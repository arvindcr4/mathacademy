import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdg-realtime-multiplayer": [
    {
      id: "q-sdg-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a competitive FPS game, the server runs at 64 tick (64 updates per second). A client runs at 128 FPS. Which statement best describes the relationship between tick rate and client frame rate?",
      options: [
        "The client frame rate must match the server tick rate exactly; mismatches cause desyncs",
        "Client frame rate and server tick rate are independent: the client renders frames between server updates using interpolation, and sends inputs at the client frame rate",
        "Higher client frame rate automatically increases the effective server tick rate for that player",
        "The server tick rate dictates the maximum frame rate the client can display"
      ],
      correctAnswer: 1,
      explanation: "Tick rate and client frame rate are decoupled. The server processes game state N times per second (tick rate) and broadcasts snapshots. The client renders as fast as its hardware allows, interpolating between received snapshots to produce smooth visuals. Client inputs are sent each frame (or batched). A higher client frame rate improves input responsiveness (more frequent input samples) but does not change how often the server processes state. CS:GO and Valorant use 64/128 tick servers while clients render at 300+ FPS.",
      hints: ["Think about what the server snapshot represents vs. what the client renders between snapshots.", "Interpolation allows smooth rendering even when server updates arrive less frequently than frames."],
    },
    {
      id: "q-sdg-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "An authoritative game server uses a lock-step model where all clients must confirm receipt before advancing the simulation. Which major problem does this introduce for games with 8+ players?",
      options: [
        "The game state grows too large to serialize efficiently",
        "The fastest player's experience degrades because their inputs are queued",
        "The entire game simulation is gated on the slowest/highest-latency player, causing all clients to stall waiting for the laggy player",
        "The server cannot distinguish between player inputs and cheat injections"
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Lock-step synchronization requires every participant to confirm receipt of each simulation step before the simulation advances to the next step.\n**Step 2:** With 8+ players, the simulation rate is bounded by the worst-case latency in the room — one high-latency player becomes the bottleneck for the entire group.\n**Step 3:** This forces all other clients to wait for the laggy player, causing periodic freezes for everyone. Modern real-time games abandoned strict lock-step in favor of client-side prediction with authoritative server correction. Lock-step survives in turn-based and RTS games (StarCraft originally used it) where millisecond responsiveness is less critical.",
      hints: ["Lock-step means everyone moves in unison — what happens if one person can't keep up?", "This was a major complaint in early online RTS games."],
    },
  ],

  "sdg-client-prediction": [
    {
      id: "q-sdg-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Rollback netcode (used in fighting games like Guilty Gear Strive) differs from delay-based netcode primarily in which way?",
      options: [
        "Rollback adds artificial input delay for both players to mask latency, while delay-based executes inputs immediately and corrects later",
        "Rollback speculatively executes frames using predicted inputs, then re-simulates from the point of divergence when real inputs arrive, while delay-based adds fixed input delay to ensure all inputs are available before simulation",
        "Rollback uses UDP while delay-based requires TCP for guaranteed delivery",
        "Rollback runs the simulation on a central server while delay-based is purely peer-to-peer"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Rollback netcode speculatively advances the simulation using the last known inputs of remote players as a prediction.\n**Step 2:** When the real remote input arrives and differs from the prediction, the engine rolls back to the last confirmed frame, applies the correct input, and re-simulates forward — happening fast enough that players rarely notice.\n**Step 3:** Delay-based netcode instead inserts a fixed N-frame input delay for all players so that by the time frame F is executed, all inputs for frame F are guaranteed to have arrived. Delay-based creates sluggish controls at high latency; rollback feels local even at 100ms+ but requires a fast, deterministic simulation engine.",
      hints: ["Think about which approach actually delays your own inputs vs. which one replays history.", "GGPO is the famous middleware that popularized rollback in fighting games."],
    },
    {
      id: "q-sdg-4",
      type: "true-false",
      difficulty: "medium",
      question: "In client-side prediction, the client applies its own inputs immediately to its local game state without waiting for server confirmation. When the authoritative server state arrives, the client must reconcile by replaying all unacknowledged inputs on top of the server state.",
      correctAnswer: "True",
      explanation: "True. This is the core of client-side prediction as used in Valve's Source engine and most modern shooters. The client maintains a circular buffer of recent inputs with sequence numbers. When a server state snapshot arrives (tagged with the last processed input sequence), the client discards all acknowledged inputs and replays unacknowledged ones on top of the server state to arrive at the predicted current state. This corrects drift without a visible snap. Quake and Half-Life pioneered this technique, described in detail by Valve's developer documentation.",
      hints: ["Why would the client need to replay inputs rather than just accepting the server state directly?", "Think about the time gap between when the server processed state and when the client receives it."],
    },
  ],

  "sdg-lag-compensation": [
    {
      id: "q-sdg-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A player with 100ms latency fires at a moving enemy. The server receives the fire event 100ms later. Without lag compensation, what problem occurs and how does backward reconciliation solve it?",
      options: [
        "The enemy position is 100ms ahead of where the shooter aimed; backward reconciliation rewinds the server world state to the shooter's view time and checks hit registration there",
        "The shot arrives before the enemy moves; no compensation is needed",
        "The server averages the attacker's and victim's positions to find the hit point",
        "The client is made authoritative for hit detection to eliminate server latency entirely"
      ],
      correctAnswer: 0,
      explanation: "**Step 1:** Without lag compensation, the server checks the shot against current enemy positions, but the shooter aimed at where the enemy was 100ms ago (the shooter's view is behind real time by their latency). The shot misses even though it looked like a hit on the client.\n**Step 2:** Backward reconciliation (Valve's implementation, described in their 2001 paper) rewinds the server's history of entity positions to the timestamp of the shooter's fire event and performs hit detection there, favoring the shooter's perspective.\n**Step 3:** The tradeoff: victims can appear to die behind cover from their own perspective, since the server validated the shot against their past position.",
      hints: ["The shooter's screen shows a delayed view of the world — where was the enemy on the shooter's screen vs. where are they now?", "Valve calls this 'lag compensation' in their Source engine documentation."],
    },
    {
      id: "q-sdg-6",
      type: "true-false",
      difficulty: "medium",
      question: "Lag compensation is universally beneficial — it improves the experience for both the attacker and the victim in all network conditions.",
      correctAnswer: "False",
      explanation: "False. Lag compensation creates a fundamental tradeoff that benefits the attacker at the expense of the victim. From the victim's perspective, they may take damage from shots fired when they had already moved to safety — the server rewound their position and registered the hit against their past location. At very high latencies (200ms+), victims experience 'being shot around corners' frequently. This is why some games cap the rewind window (e.g., Overwatch caps at around 200ms) and why the debate between 'favoring shooter' vs. 'favoring victim' is a core game feel design decision.",
      hints: ["Consider the victim's experience: can they dodge bullets that have already been calculated as hits based on their past position?", "What happens when a player with 200ms latency shoots at you?"],
    },
  ],

  "sdg-matchmaking": [
    {
      id: "q-sdg-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Riot Games uses a skill rating system for League of Legends that accounts for rating uncertainty. When a player goes on a win streak after a long absence, their rating changes more rapidly than a player who plays daily. Which rating system has this property?",
      options: [
        "Elo rating system, which uses a fixed K-factor for all players",
        "TrueSkill (Microsoft Research), which models rating as a Gaussian distribution with mean mu and variance sigma, and increases sigma during inactivity",
        "Glicko-2, which tracks rating deviation (RD) that increases with inactivity and decreases with match activity",
        "TrueSkill2, which is purely based on win/loss streaks without uncertainty modeling"
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Glicko-2 (and its predecessor Glicko) tracks a Rating Deviation (RD) alongside the rating itself — RD increases when a player is inactive and decreases as they play more games.\n**Step 2:** This causes rating to change more aggressively when RD is high (returning players, placement matches) and more conservatively when RD is low (frequent players with established ratings).\n**Step 3:** TrueSkill uses a similar concept (sigma). Riot's LP/MMR system is loosely inspired by Glicko-2. Standard Elo uses a fixed K-factor and has no uncertainty model.",
      hints: ["Which system explicitly tracks 'confidence' in a player's rating, not just the rating itself?", "Think about what happens mathematically when you have fewer data points about a player."],
    },
    {
      id: "q-sdg-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A matchmaking service must fill a 10-player lobby in under 30 seconds while maintaining skill balance. Which architectural approach best handles queue wait times that vary by skill tier?",
      options: [
        "A single global queue sorted by MMR; always pick the 10 closest-rated players",
        "Separate queues per MMR bucket with a time-expanding skill window: start with a tight MMR range and widen it every N seconds if the lobby is not filled",
        "Random player selection from the global pool; rebalance after the match using post-game MMR adjustment",
        "Dedicated queues per region with no cross-region matching, even if it means 10-minute wait times for high MMR players"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** The expanding skill window approach (used by Riot, Blizzard, and Valve) starts with a tight acceptable MMR range and widens it progressively if the queue cannot be filled within a time threshold.\n**Step 2:** This provides fast matches for players in densely populated MMR buckets while still finding matches (at the cost of balance quality) for players in sparse high-MMR tiers.\n**Step 3:** The tradeoff between wait time and match quality is made explicit and tunable. A single sorted queue ignores the density problem; random selection harms balance.",
      hints: ["High-MMR players are rare — how do you balance wait time vs. match quality for them?", "Think about a sliding tolerance window that grows over time."],
    },
    {
      id: "q-sdg-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Your matchmaking service processes 500,000 concurrent queued players for a game like Fortnite. The lobby requires 100 players. Which data structure and algorithm combination efficiently finds the best skill-balanced lobbies?",
      options: [
        "A SQL table with an MMR column; run SELECT queries with ORDER BY mmr every second to build lobbies",
        "A Redis Sorted Set (ZADD with MMR as score); use ZRANGEBYSCORE to find players within an MMR window, then form lobbies from the result",
        "A full graph where each queued player is a node with edges to all compatible players; run max-clique detection to find the best lobby",
        "A distributed priority queue backed by Cassandra, scanning all partitions to find top-100 by skill"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Redis Sorted Sets with MMR as the score are purpose-built for this use case — ZADD inserts players in O(log N) and ZRANGEBYSCORE retrieves all players within a skill window in O(log N + M).\n**Step 2:** A matchmaker worker atomically claims a player (using ZPOPMIN/ZPOPMAX or a Lua script), builds a lobby, and launches a game server — scaling to millions of queued players with sub-millisecond range queries.\n**Step 3:** SQL ORDER BY at 500K rows is slow with lock contention. Graph max-clique is NP-hard. Cassandra full scans are expensive and unordered within partitions.",
      hints: ["Which Redis data structure maintains sorted order and supports efficient range queries by score?", "ZRANGEBYSCORE — what does the score represent here?"],
    },
  ],

  "sdg-session-management": [
    {
      id: "q-sdg-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A player disconnects mid-match in a 5v5 competitive game. The server must handle reconnection. Which design correctly preserves game state and allows the player to rejoin?",
      options: [
        "Terminate the player's game object immediately on disconnect; they re-join as a spectator",
        "Mark the player as disconnected but preserve their game state on the server; reserve their slot for a configurable timeout (e.g., 2 minutes); on reconnect, send a full state snapshot and resume from current server state",
        "Pause the entire match for all 9 other players until the disconnected player reconnects or the timeout expires",
        "Allow the disconnected player's slot to be filled by a bot immediately, making reconnection impossible"
      ],
      correctAnswer: 1,
      explanation: "The correct approach preserves the disconnected player's state server-side and holds their slot for a reasonable timeout. On reconnect, the server sends a full state snapshot (or delta from last ACK) to catch the client up. The match continues for other players (with the disconnected player possibly controlled by AI temporarily). This is how Riot (League of Legends), Valve (Dota 2), and Epic (Fortnite) handle disconnects. The server must distinguish between network blips (brief disconnect) and intentional leaves (extended absence triggering forfeit/bot replacement). Pausing the full match for 9 players creates poor UX and abuse potential.",
      hints: ["What needs to happen on the server between disconnect and reconnect?", "How does the reconnecting client catch up to the current server state?"],
    },
    {
      id: "q-sdg-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Epic Games (Fortnite) uses a fleet of dedicated game servers that must spin up within seconds of a match being formed. Which combination of technologies best achieves sub-5-second server allocation at global scale?",
      options: [
        "Provision new EC2 instances on-demand per match; the ~2-minute boot time is acceptable for a battle royale lobby phase",
        "Pre-warm a pool of idle game server processes on running instances; a fleet manager assigns the next available idle server to each new match, replenishing the warm pool continuously",
        "Use serverless Lambda functions to run the game simulation; scale automatically with no pre-warming needed",
        "Run all matches on a single massive multi-tenant server, isolating sessions via namespaces"
      ],
      correctAnswer: 1,
      explanation: "Pre-warming game server processes is the standard approach for low-latency server allocation. The fleet manager maintains a pool of already-running game server processes (warm servers) across regions. When a match is formed, it claims an idle process instantly. A replenishment daemon monitors pool size and starts new processes to replace claimed ones, keeping the pool above a minimum threshold. This is how GameLift, Multiplay, and in-house solutions at Epic/Riot work. On-demand instance provisioning takes 1-3 minutes — too slow. Lambda cannot maintain stateful game simulations. Single-server multi-tenancy creates fault isolation problems.",
      hints: ["What is 'warm pool' in the context of server fleets?", "Think about the difference between provisioning a new server vs. claiming an already-running process."],
    },
  ],

  "sdg-transport-protocols": [
    {
      id: "q-sdg-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Real-time multiplayer games prefer UDP over TCP for position updates. Which combination of reasons best explains this preference?",
      options: [
        "UDP is encrypted by default while TCP is not; and UDP supports multicast",
        "TCP's head-of-line blocking causes newer packets to be delayed waiting for retransmission of older lost packets; for stale position data, retransmission is useless since a newer update supersedes it",
        "UDP has larger maximum packet sizes than TCP, allowing more game state per packet",
        "TCP requires a persistent connection while UDP allows connectionless communication, reducing server memory usage"
      ],
      correctAnswer: 1,
      explanation: "The critical reason UDP is preferred for real-time game state is TCP's head-of-line blocking combined with automatic retransmission. If a position update packet is lost, TCP stalls delivery of all subsequent packets until the lost one is retransmitted and received. By the time it arrives, the data is stale — the player has already moved again. UDP drops the packet and keeps delivering newer ones. Games implement their own reliability only where needed (e.g., reliable ordered delivery for critical events like kills or item pickups, unreliable unordered for position updates). Libraries like ENet, QUIC, and Photon implement selective reliability over UDP.",
      hints: ["What does TCP guarantee that is actually harmful for real-time position updates?", "If you receive position update #10 before #9, which one do you actually want to display?"],
    },
    {
      id: "q-sdg-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A browser-based multiplayer game cannot use raw UDP sockets. Which technology provides the best equivalent for real-time peer-to-peer game data channels in the browser?",
      options: [
        "WebSocket over TCP — the standard for all browser real-time communication",
        "WebRTC Data Channels — provide unreliable, unordered UDP-like transport between peers directly from the browser without a relay server",
        "HTTP/2 server push — allows the server to push game updates to the browser",
        "QUIC via fetch() — HTTP/3 supports low-latency streams from browsers"
      ],
      correctAnswer: 1,
      explanation: "WebRTC Data Channels support both reliable (ordered, like TCP) and unreliable (unordered, like UDP) modes. For peer-to-peer games, players can exchange position updates over unreliable data channels directly, bypassing the server for latency-sensitive data. WebSocket runs over TCP and suffers from the same head-of-line blocking issue. HTTP/2 push is server-to-client only and not designed for bidirectional real-time data. QUIC is not directly accessible from JavaScript via fetch(). Browser games like agar.io (WebSocket) and more latency-sensitive titles use WebRTC. The STUN/TURN server is still needed for NAT traversal even with WebRTC.",
      hints: ["Which browser API specifically supports unreliable datagram-style delivery?", "Peer-to-peer vs. client-server — which one eliminates the server relay for latency?"],
    },
  ],

  "sdg-state-serialization": [
    {
      id: "q-sdg-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A battle royale game with 100 players sends server snapshots at 20Hz. The full game state is 50KB per snapshot. Which technique most drastically reduces bandwidth while maintaining smooth client-side visual quality?",
      options: [
        "Compress each full snapshot with gzip before sending",
        "Delta compression: send only the state changes since the last acknowledged snapshot per client, combined with snapshot interpolation on the client between received updates",
        "Reduce tick rate to 5Hz and increase client-side interpolation window proportionally",
        "Send only the 10 nearest players' state to each client, ignoring players beyond 200 meters"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Delta compression sends only what changed since the last acknowledged snapshot, reducing typical payloads by 80–95% compared to full snapshots.\n**Step 2:** Combined with snapshot interpolation (the client smoothly blends between the last two received snapshots), players see smooth movement even at 20Hz updates.\n**Step 3:** Area-of-interest filtering is also applied in practice, but delta compression provides the largest per-message savings. Gzip helps but delta encoding already captures repeated structure savings. Reducing tick rate to 5Hz creates noticeable 200ms visual stutter.",
      hints: ["If position changes 1cm between snapshots, why send the full 50KB state?", "What does 'acknowledged' mean in the context of delta compression?"],
    },
    {
      id: "q-sdg-15",
      type: "true-false",
      difficulty: "easy",
      question: "Snapshot interpolation on the game client means the client always renders the game world slightly in the past relative to the server's current time, using two buffered server snapshots to smoothly interpolate entity positions between them.",
      correctAnswer: "True",
      explanation: "**Step 1:** Snapshot interpolation requires the client to buffer at least two server snapshots and render at a time between them — typically 1–2 tick periods behind real time.\n**Step 2:** For example, at 20Hz (50ms per tick) the client might render 100ms behind real time, always interpolating between the snapshot at T-100ms and T-50ms. This produces perfectly smooth visuals even if a snapshot is occasionally delayed or dropped.\n**Step 3:** The tradeoff is added visual latency. Extrapolation (predicting beyond the latest snapshot) is used when interpolation data is unavailable but produces artifacts on direction changes.",
      hints: ["Why would you intentionally render behind real time?", "What would happen if you tried to render exactly at the latest snapshot time and a packet was delayed?"],
    },
  ],

  "sdg-leaderboards": [
    {
      id: "q-sdg-16",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A global leaderboard for a mobile game has 50 million players and requires returning a player's rank and the top-100 list within 10ms. Which Redis command correctly retrieves a player's rank (0-indexed from highest score)?",
      options: [
        "ZRANK leaderboard player_id (returns rank sorted ascending by score)",
        "ZREVRANK leaderboard player_id (returns rank sorted descending by score, so rank 0 = highest score)",
        "ZSCORE leaderboard player_id (returns the player's score, which equals their rank)",
        "ZRANGE leaderboard 0 -1 WITHSCORES (full scan to find the player's position)"
      ],
      correctAnswer: 1,
      explanation: "ZREVRANK returns a player's rank in descending score order (rank 0 = highest score), which matches typical leaderboard semantics where rank 1 is the best player. ZRANK returns ascending rank (rank 0 = lowest score). ZSCORE returns the score value, not rank. Full scan via ZRANGE is O(N) and unacceptable at 50M members. Redis Sorted Sets maintain elements in sorted order via a skip list + hash table, so ZREVRANK is O(log N) — sub-millisecond even at 50M players. ZADD updates a player's score in O(log N). Top-100 is retrieved with ZREVRANGE leaderboard 0 99 WITHSCORES in O(log N + 100).",
      hints: ["ZRANK sorts ascending. What does 'REV' mean in ZREVRANK?", "What O complexity does a Redis skip list provide for rank queries?"],
    },
    {
      id: "q-sdg-17",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A game requires showing each player their percentile rank among all 50 million players in real time. Exact percentile computation (ZREVRANK / total_members * 100) works but you need it in under 5ms. Which additional technique enables approximate percentile ranks without full Sorted Set scans?",
      options: [
        "Store percentile buckets in a PostgreSQL table and join with the leaderboard on each request",
        "Use Redis HyperLogLog to estimate the count of players above a given score range",
        "Pre-compute a score-to-percentile histogram (e.g., 1000 score buckets) and update it periodically; use binary search on the histogram for O(log B) percentile lookup",
        "Store each player's percentile in a separate Redis Hash and update it on every score change"
      ],
      correctAnswer: 2,
      explanation: "A pre-computed score histogram with B buckets (e.g., 1000 buckets covering the score range) allows O(log B) percentile approximation via binary search. The histogram is updated periodically (every few seconds or minutes) from the Sorted Set via ZCOUNT range queries. This decouples exact rank computation from per-request serving. Accuracy is within 1/B of the total (0.1% for 1000 buckets). HyperLogLog estimates cardinality of sets but doesn't maintain sorted score distributions. Updating every player's percentile Redis Hash on each score change is O(N) writes per update. PostgreSQL joins add latency. This histogram approach is used in leaderboard systems at scale.",
      hints: ["If you know how many players are in each score bucket, can you estimate rank without scanning all 50M?", "Trade exactness for speed — what data structure allows range queries in O(log N)?"],
    },
  ],

  "sdg-anti-cheat": [
    {
      id: "q-sdg-18",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Riot's Vanguard anti-cheat runs as a kernel-mode driver (Ring 0) that starts at boot. What security capability does kernel-mode access provide that user-mode anti-cheat cannot achieve?",
      options: [
        "Kernel mode allows the anti-cheat to read GPU memory directly for screenshot analysis",
        "Kernel mode lets the anti-cheat intercept and validate all network packets before the game client processes them",
        "Kernel mode enables detection of cheats that manipulate memory or inject code before the game process starts, and prevents user-mode processes from hooking or hiding from the anti-cheat",
        "Kernel mode reduces game latency by bypassing the OS network stack for game packets"
      ],
      correctAnswer: 2,
      explanation: "Kernel-mode anti-cheat (Vanguard, Easy Anti-Cheat in kernel mode, BattlEye) operates at the highest privilege level, allowing it to detect cheats that: (1) load before the game and hide from user-space enumeration, (2) use kernel drivers themselves to manipulate memory, (3) hook kernel APIs to hide processes/files from user-space scanning. User-mode anti-cheat can be bypassed by a cheat driver running at the same or higher privilege level. The controversial tradeoff is that a kernel driver vulnerability becomes a system-wide security risk. GPU memory reading is a separate capability. Network packet interception is done by network drivers, not game anti-cheat.",
      hints: ["What privilege level can a user-mode cheat NOT access without a kernel driver of its own?", "Why is hiding a process from user-space much harder when the anti-cheat is in the kernel?"],
    },
    {
      id: "q-sdg-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Server-side anti-cheat validates player actions. A player claims to move from position A to position B in 0.1 seconds. The maximum possible movement speed is 10 units/second, and the distance A->B is 5 units. How should the server respond?",
      options: [
        "Accept the movement and trust the client; client-side prediction requires accepting client positions",
        "Reject the movement and teleport the player back to position A, as 5 units in 0.1 seconds requires 50 units/second — 5x the max speed",
        "Log a suspicious event but accept the movement to avoid impacting legitimate players with high latency",
        "Immediately ban the player account for speed hacking"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Server-side position validation (player physics checks) is fundamental to authoritative server architecture.\n**Step 2:** Moving 5 units in 0.1 seconds implies a speed of 50 units/second, which exceeds the 10 units/second maximum by a factor of 5. The server should reject the position and correct the player to a valid position (typically their last valid position or a physics-corrected position).\n**Step 3:** An immediate ban on first detection is too aggressive (could be severe network jitter). In practice, servers apply a small tolerance buffer for network jitter (e.g., +20%) before flagging, and ban only on repeated violations or extreme magnitudes.",
      hints: ["Speed = distance / time. What speed does this movement imply?", "What is the core principle of authoritative server architecture regarding client-reported positions?"],
    },
  ],

  "sdg-in-app-purchases": [
    {
      id: "q-sdg-20",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A player purchases a legendary skin on iOS. The game server must validate the purchase and grant the item. Which flow correctly handles Apple StoreKit 2 receipt validation while preventing double-granting?",
      options: [
        "Trust the client's claim that a purchase occurred and grant the item immediately; validate the receipt asynchronously",
        "The client sends the StoreKit transaction ID to the game server; the server calls Apple's App Store Server API to verify the transaction, checks if this transaction ID was already processed (idempotency check), grants the item if new and records the transaction ID atomically",
        "The game client verifies the receipt locally using StoreKit and sends the verified result to the server",
        "Store the raw receipt blob client-side and send it to the server only when the player equips the item"
      ],
      correctAnswer: 1,
      explanation: "The correct flow: (1) Client completes purchase, receives a transaction from StoreKit 2. (2) Client sends the transaction ID to the game server. (3) Server calls Apple's App Store Server API (server-to-server) to verify the transaction is real, paid, and belongs to the correct product. (4) Server checks its own transactions table for this transaction ID — if already processed, return success without re-granting (idempotency). (5) If new, grant the item and record the transaction ID atomically in a DB transaction. Client-side validation can be tampered with. Trusting claims without validation enables purchase fraud. Deferring validation until equip creates a gap where the item might be used before validation.",
      hints: ["Why must receipt validation happen server-to-server, not client-to-Apple?", "What is idempotency and why is it critical for purchase grants?"],
    },
    {
      id: "q-sdg-21",
      type: "true-false",
      difficulty: "medium",
      question: "To prevent item double-granting due to network retries or server crashes, a purchase grant operation should be idempotent: processing the same transaction ID multiple times must produce the same result as processing it once, with no duplicate items granted.",
      correctAnswer: "True",
      explanation: "True. Purchase grants must be idempotent because: (1) the client may retry if the network drops after purchase but before receiving the grant confirmation, (2) the server may crash after granting but before responding, causing the client to retry, (3) Apple/Google may send the same transaction notification multiple times via their server-to-server notification systems. Implementation: store each processed transaction ID in a database table with a UNIQUE constraint on transaction_id. Before granting, INSERT OR IGNORE (MySQL) / INSERT ... ON CONFLICT DO NOTHING (PostgreSQL) the transaction ID. Only proceed with the grant if the insert succeeded (new transaction). This guarantees exactly-once item delivery.",
      hints: ["What happens if the server crashes between granting an item and sending the success response to the client?", "How does a UNIQUE constraint on transaction_id prevent duplicate grants?"],
    },
  ],

  "sdg-game-economy": [
    {
      id: "q-sdg-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A game has two currencies: Gold (earned by playing) and Gems (purchased with real money). Players can convert Gold to Gems. After 6 months, Gold inflation makes items feel worthless and Gems feel unattainable. Which game economy design principle was violated?",
      options: [
        "The game should have used a single currency to avoid confusion",
        "Gold sinks (gold destruction mechanisms) were insufficient relative to gold generation, causing hyperinflation; the Gold-to-Gems exchange rate should be one-directional (no Gold-to-Gems conversion) to protect monetization value",
        "The Gems price of items was set too high, discouraging purchase",
        "The game should use a player-to-player auction house to set prices naturally"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Dual-currency economies fail when the soft currency (Gold) generates faster than it is destroyed — insufficient gold sinks (crafting costs, repair fees, auction house taxes, premium item costs) cause hyperinflation that devalues all gold-priced items.\n**Step 2:** Allowing Gold-to-Gems conversion lets players bypass real-money purchases by farming gold, directly harming revenue and undermining monetization.\n**Step 3:** Healthy economies require gold sinks proportional to gold sources. Diablo 3's auction house caused catastrophic inflation — Blizzard removed it. WoW's gold sinks (repair, enchanting, consumables) were carefully tuned to slow accumulation.",
      hints: ["What mechanisms 'destroy' currency to counteract its creation?", "Why might allowing Gold->Gems conversion harm a game's monetization?"],
    },
  ],

  "sdg-inventory-achievements": [
    {
      id: "q-sdg-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Two players simultaneously complete a quest that grants the same unique item, and your inventory service grants the item to both. Which database design prevents this race condition for unique item grants?",
      options: [
        "Application-level locking with a global mutex around all item grant operations",
        "A database UNIQUE constraint on (player_id, item_id) for unique items, combined with an INSERT that fails gracefully on duplicate — only the first successful insert grants the item",
        "Check the player's inventory count before inserting, and reject if count >= 1 (check-then-act pattern)",
        "Queue all item grants in a single-threaded worker to serialize all inventory writes"
      ],
      correctAnswer: 1,
      explanation: "A UNIQUE constraint on (player_id, item_id) with INSERT ... ON CONFLICT DO NOTHING (PostgreSQL) or INSERT IGNORE (MySQL) is the correct atomic solution. The database engine enforces uniqueness at the storage level, making it impossible to insert two rows with the same (player_id, item_id) regardless of application-level concurrency. Only the first concurrent INSERT succeeds; the second gets a conflict error (not an exception — handled gracefully). The check-then-act pattern (read-then-write) has a classic TOCTOU race condition between the check and the insert. Global mutex is a scalability bottleneck. Single-threaded queuing eliminates the concurrency benefit of multiple application servers.",
      hints: ["Which constraint is evaluated atomically by the database, preventing races entirely?", "What is the TOCTOU (Time-of-Check to Time-of-Use) race condition?"],
    },
    {
      id: "q-sdg-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An achievement system must award 'Kill 1000 enemies' to a player. Multiple game servers report kill events concurrently. Which design guarantees the achievement is awarded exactly once when the counter reaches 1000?",
      options: [
        "Each game server reads the current kill count, increments it in memory, and writes the new value back to the database",
        "Use a Redis INCR command on the player's kill counter (atomic increment); a separate worker polls the counter and awards the achievement if it equals exactly 1000, with idempotent achievement grant logic",
        "Batch kill events in a queue and process them sequentially in a single-threaded consumer; check and grant in the consumer",
        "Game servers write kill events to a Kafka topic; a consumer aggregates counts per player in memory and grants achievements, using Kafka consumer group exactly-once semantics"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Redis INCR is atomic — even with 100 concurrent game servers reporting kills simultaneously, each INCR is serialized by Redis and the counter advances correctly without lost updates.\n**Step 2:** A watcher checks if INCR returns exactly 1000 (or uses WATCH/MULTI/EXEC for conditional logic) and triggers the achievement grant.\n**Step 3:** The grant itself must be idempotent (UNIQUE constraint on player_id + achievement_id) to handle retries. Option A has a classic read-modify-write race condition. Single-threaded queuing works but is a bottleneck. Kafka exactly-once processing also works but is more complex and introduces latency.",
      hints: ["What makes Redis INCR safe for concurrent increments from multiple servers?", "Why must the achievement grant itself also be idempotent?"],
    },
  ],

  "sdg-social-features": [
    {
      id: "q-sdg-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A game's friend system requires showing online/offline status for up to 500 friends in real time. Which architecture scales to 10 million concurrent players with sub-second presence updates?",
      options: [
        "Poll each friend's status via REST API every 5 seconds from the client",
        "Use a Pub/Sub system (Redis Pub/Sub or dedicated presence service): each player session subscribes to a channel per friend; presence updates are published when players connect/disconnect, fanned out only to subscribed friends",
        "Store online status in a PostgreSQL table with an updated_at timestamp; clients query for all friends with updated_at > last_poll every 10 seconds",
        "Broadcast every player's presence change to all 10 million clients via WebSocket"
      ],
      correctAnswer: 1,
      explanation: "A presence Pub/Sub system scales correctly. When player A connects, a connection event is published to channel 'presence:playerA'. All of A's friends who are online have subscribed to this channel and receive the update immediately. When A disconnects (or their heartbeat expires), a disconnection event is published. This fan-out-on-subscription model means updates are pushed only to relevant subscribers, not broadcast globally. Discord, Steam, and Xbox Live use similar presence architectures. Polling REST is latency-bounded and wastes bandwidth. PostgreSQL polling at 10M players generates enormous read traffic. Broadcasting to all 10M clients is O(N) for every status change.",
      hints: ["How does Pub/Sub limit who receives a presence update?", "Think about fan-out: each player change should reach only their friends, not all players."],
    },
    {
      id: "q-sdg-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A game chat system must support 10,000 concurrent players in a global channel, filter spam, and enforce mutes. Messages arrive at 500/second peak. Which architecture handles this correctly?",
      options: [
        "Direct client-to-client UDP broadcast: each client sends their message to all other clients in the channel",
        "A WebSocket-based chat server that receives messages, applies server-side spam filters and mute checks, then fans out to all subscribers via an in-memory pubsub; for scale, partition channels across multiple chat server instances with a Redis Pub/Sub relay",
        "Store all messages in PostgreSQL; clients poll every second for new messages with SELECT * WHERE channel_id = ? AND created_at > last_seen",
        "Use a third-party SMS gateway to relay game chat messages to players' phone numbers"
      ],
      correctAnswer: 1,
      explanation: "A WebSocket chat server with Redis Pub/Sub relay is the standard architecture. Each message: (1) arrives at a chat server via WebSocket, (2) is checked against the mute list and spam filter (rate limiting, pattern matching), (3) if valid, published to a Redis channel for the chat room, (4) all chat server instances subscribed to that Redis channel receive it and fan out to their connected clients. This scales horizontally: adding chat server nodes increases capacity. Mute enforcement happens server-side — muted players' messages are dropped before publishing. Direct UDP broadcast requires clients to know each other's IPs (security issue). DB polling at 10K * 1/s = 10K queries/sec is expensive. SMS gateway is nonsensical.",
      hints: ["How does Redis Pub/Sub help when chat servers are distributed across multiple machines?", "Where must mute/ban enforcement happen to be tamper-proof?"],
    },
  ],

  "sdg-replay-analytics": [
    {
      id: "q-sdg-27",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A game replay system must allow players to rewatch any past match. The naive approach of recording video is too storage-intensive. Which approach dramatically reduces storage while enabling full replay fidelity?",
      options: [
        "Record a compressed video at 360p for all matches; upscale to 1080p on playback using AI super-resolution",
        "Record only the inputs (player actions, RNG seeds, timestamps) and replay by re-running the deterministic game simulation from the initial state using those inputs",
        "Store only keyframes (full state snapshots) every 30 seconds; interpolate between keyframes for playback",
        "Use screen-capture software on the game server to record all 64 player perspectives simultaneously"
      ],
      correctAnswer: 1,
      explanation: "Event-sourced replay (recording inputs + RNG seeds) is the storage-optimal approach, reducing storage by 99%+ compared to video. If the game simulation is fully deterministic (same inputs + same seed = same output), replaying the match from the start using recorded inputs reproduces the exact game state at every tick. This is how CS:GO demos, Dota 2 replays, and Starcraft 2 replays work. The tradeoff: (1) the simulation must be strictly deterministic (no floating-point non-determinism across OS/hardware), (2) replaying from the start to jump to minute 45 requires simulating all prior frames (mitigated by periodic state snapshots as seek points), (3) game patches can break older replays if the simulation logic changes.",
      hints: ["If the simulation is deterministic, what is the minimum information needed to reproduce a match?", "Why might a game patch break older replays stored as input logs?"],
    },
    {
      id: "q-sdg-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A mobile game tracks 50 custom events per session (level_start, item_used, purchase, etc.) for 5 million daily active players, yielding 250 million events/day. Which pipeline handles this at minimum cost with acceptable query latency for funnel analysis?",
      options: [
        "Write all events to PostgreSQL with a single events table; run funnel analysis queries directly with GROUP BY and COUNT",
        "Ingest events into Kafka; stream to a columnar data warehouse (BigQuery, Redshift, or Snowflake) in micro-batches; run SQL funnel analysis on the columnar store with partition pruning by date and player_id",
        "Store all events in a Redis Hash per player for fast access; run analytics from Redis",
        "Log events to flat files on application servers; process with nightly cron MapReduce jobs"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Kafka handles burst ingestion (250M events/day \$\\approx\$ 2,900/sec average, spikes much higher) without loss, acting as a durable buffer between game servers and storage.\n**Step 2:** Micro-batch loads into BigQuery/Redshift store events in columnar format, enabling highly efficient sequential scans for funnel analysis — for example, scanning only the event_type column across millions of rows.\n**Step 3:** Partition pruning by date reduces scan cost dramatically. PostgreSQL at 250M rows/day with complex funnel queries would be impractically slow. Redis cannot store 250M events/day cost-effectively. Nightly batch processing introduces 24-hour analysis lag.",
      hints: ["What makes columnar storage particularly efficient for queries that scan one or two columns across billions of rows?", "Why is Kafka in front of the warehouse instead of writing directly to the warehouse?"],
    },
  ],

  "sdg-infrastructure": [
    {
      id: "q-sdg-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A game developer distributes a 50GB patch to 10 million players simultaneously. A CDN with 100Gbps egress capacity would take over 11 hours to serve all players at that rate. Which distribution strategy reduces this to under 2 hours?",
      options: [
        "Increase CDN capacity by 10x by provisioning more CDN nodes immediately before the patch",
        "Use binary delta patches (bsdiff/xdelta) to reduce patch sizes to 1-5% of the full game for most players who already have the previous version, combined with CDN distribution",
        "Distribute the patch via BitTorrent-style P2P: each player acts as a seeder after downloading; CDN serves initial seeds; players download from each other as peer swarm grows",
        "Both B and C: binary delta patches reduce the payload size, and P2P distribution scales bandwidth with the player population size, dramatically reducing CDN load"
      ],
      correctAnswer: 3,
      explanation: "Both optimizations together are optimal: (1) Binary delta patches (using bsdiff, xdelta3, or similar) compute the binary difference between old and new game files. For a 2MB changed file in a 50GB game, the delta might be 500KB instead of 50GB. Most players only download changed files, reducing effective patch size from 50GB to typically 500MB-2GB. (2) P2P distribution (Steam's integrated torrent, Blizzard's BNET P2P) turns every downloading player into an uploader. With 10M players, aggregate upload bandwidth grows proportionally — the CDN seeds the first wave, peers replicate to subsequent waves. Steam and Battle.net both use exactly this combination.",
      hints: ["What does a binary delta patch actually contain vs. a full file?", "How does P2P change the relationship between number of players and total available bandwidth?"],
    },
    {
      id: "q-sdg-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A game server fleet auto-scaler must provision servers before player demand spikes (e.g., right after a popular streamer goes live). Reactive scaling (scale when CPU > 80%) is too slow — server provisioning takes 3 minutes. Which predictive approach reduces under-provisioning incidents?",
      options: [
        "Set the minimum server count to the all-time peak player count; never scale down",
        "Use time-series forecasting on historical player count data (hour-of-day, day-of-week, streaming event correlation) to predict demand 10 minutes ahead; pre-provision servers before the predicted spike",
        "Reactive scaling with a 5x safety buffer: scale when CPU > 16% instead of 80%",
        "Require players to pre-register for play sessions 30 minutes in advance so server demand is known ahead of time"
      ],
      correctAnswer: 1,
      explanation: "Predictive auto-scaling uses historical demand patterns (daily/weekly cycles are highly predictable for games) and real-time signals (streamer going live, major tournament starting, patch release day) to forecast demand 10-15 minutes ahead. This lead time is sufficient to pre-provision servers before the actual spike arrives. AWS GameLift, Azure PlayFab, and Google Cloud all offer predictive scaling. The model inputs: time of day, day of week, holiday flags, streamer audience size from Twitch/YouTube APIs, scheduled events. Keeping all-time-peak servers always running is wasteful and expensive. A 5x safety buffer reduces utilization to 20% — economically unsustainable. Pre-registration destroys the on-demand play model.",
      hints: ["Game player counts have strong daily and weekly cycles — can you forecast them?", "What external signals (besides current player count) might predict an imminent player spike?"],
    },
  ],

  "sdg-advanced-topics": [
    {
      id: "q-sdg-31",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A gacha game must disclose loot box probabilities in compliance with regulations in China, Belgium, and other jurisdictions. Internally, the RNG must be provably fair and auditable. Which approach achieves both goals?",
      options: [
        "Use Math.random() on the client to determine loot box outcomes; the client is trustworthy",
        "Server-side RNG with committed seeds: the server commits to an encrypted seed before the player opens the box, reveals the seed and algorithm after, allowing the player to verify the outcome was predetermined and matches the disclosed probability",
        "Pre-generate all possible loot box outcomes and store them in a database; assign outcomes sequentially to players",
        "Let the player supply their own random seed to ensure they cannot claim the server cheated"
      ],
      correctAnswer: 1,
      explanation: "Provably fair systems use cryptographic commitment: (1) Server generates a random seed, hashes it (SHA-256), and sends the hash to the client before the pull. (2) After the pull, server reveals the seed; client verifies hash(seed) matches the committed hash. (3) The outcome is derived deterministically from seed + nonce. This proves the outcome was predetermined (server couldn't change it after commitment) and that the seed was random (preimage resistance). Combined with published probability tables (required in China, Netherlands, Belgium), players can independently verify fairness. Client-side RNG is trivially manipulated. Sequential pre-generation is vulnerable to prediction. Player-supplied seeds allow griefing.",
      hints: ["How does a cryptographic hash commitment prevent the server from changing the outcome after seeing the player's reaction?", "What does 'provably fair' mean in the context of cryptographic commitment schemes?"],
    },
    {
      id: "q-sdg-32",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A live esports event broadcasts a game to 500,000 simultaneous spectators. The spectator stream must be delayed by 3 minutes to prevent stream sniping (cheaters watching the broadcast to locate opponents). Which architecture achieves this at scale?",
      options: [
        "Each spectator connects directly to the game server; the server buffers 3 minutes of state and replays it with the delay",
        "The game server sends a real-time event stream to an ingest service; the ingest service writes to a distributed buffer (e.g., Kafka with 3-minute retention offset); spectator clients read from the buffer with a 3-minute lag via an HLS/DASH video pipeline or a WebSocket replay service",
        "Record the match to S3 in real time; after 3 minutes, start serving the recording from S3 to spectators as an on-demand stream",
        "Disable spectator mode during competitive matches; stream sniping cannot be prevented otherwise"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** The authoritative game server publishes state snapshots to a Kafka topic in real time.\n**Step 2:** A video encoder service (or WebSocket relay) reads from Kafka but always reads from the offset corresponding to 3 minutes ago, enforcing the delay on every spectator connection.\n**Step 3:** This delayed stream is packaged as HLS/DASH segments and pushed to a CDN for HTTP-based delivery to 500K viewers — CDN-served HTTP scales trivially. Direct connections to game servers would not survive 500K spectators. This mirrors how Twitch/YouTube enforce delay for competitive broadcasts.",
      hints: ["How do you consume a stream with a fixed time delay using Kafka consumer offsets?", "Why is CDN-served HLS preferred over WebSocket for 500K simultaneous spectators?"],
    },
    {
      id: "q-sdg-33",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A game supports cloud saves that sync across PC, PlayStation, and mobile. A player edits their save on PC while offline, then their phone auto-saves online. When the PC reconnects, there are two divergent save states. Which conflict resolution strategy is most appropriate for game saves?",
      options: [
        "Last-write-wins: always keep the most recently modified save, discarding the other",
        "Present both conflicting saves to the player with a clear description of each (playtime, last location, timestamp) and let them choose which to keep or merge, with the discarded save archived for 30 days",
        "Merge saves automatically by taking the maximum value of every attribute (highest gold, most items, furthest level)",
        "Reject the offline save entirely; the server-side save is always authoritative"
      ],
      correctAnswer: 1,
      explanation: "Presenting conflict resolution to the player is the safest approach for game saves, as automatic merging can produce invalid states (e.g., taking max gold from both saves that spent different items, resulting in a save that never existed). Showing both saves with metadata (session time, location, achievements earned) lets the player make an informed choice. Automatic last-write-wins could discard 10 hours of progress. Auto-merging by max values may create gameplay exploits (duplication glitch). Rejecting offline saves entirely destroys progress legitimately made without connectivity. Steam Cloud and Xbox Cloud Saves both implement conflict UX. Some games (like Minecraft) do archive the conflicted save for recovery.",
      hints: ["Why is automatic merging of game saves particularly dangerous compared to document merging?", "What metadata would a player need to make an informed choice between two conflicting saves?"],
    },
    {
      id: "q-sdg-34",
      type: "multiple-choice",
      difficulty: "hard",
      question: "At the end of a competitive season, a ranked game must reset all player ranks, archive final standings, and decay inactive accounts for the new season — for 20 million player records. Which approach minimizes downtime and risk?",
      options: [
        "Run a single UPDATE statement: UPDATE players SET rank = 0 WHERE season = current_season; requires a maintenance window as it locks the table for hours",
        "Use a background batch job with small page-based UPDATE batches (e.g., 1000 rows per batch with a short sleep between batches) to apply rank decay and reset without table locks, combined with a new season_id column to separate old/new season data atomically",
        "Drop and recreate the player rank table with default values; migrate historical data to an archive table",
        "Reset ranks client-side on first login of the new season; never update the database for inactive players"
      ],
      correctAnswer: 1,
      explanation: "Batched background updates are the correct approach for large-scale seasonal resets. Processing 1000 rows at a time with short sleeps between batches: (1) avoids long table locks that would block all game operations, (2) can be paused and resumed, (3) allows monitoring progress and aborting if anomalies are detected. The new season is tracked by a season_id column — old season data is preserved (historical leaderboards) while new season data starts fresh. Archiving happens by inserting into a season_archive table in the same batched process. A single UPDATE on 20M rows would hold a lock for hours. Table drop/recreate risks data loss. Client-side resets are trivially bypassable and create inconsistency.",
      hints: ["Why does a single UPDATE on 20M rows cause problems in production?", "How does using a season_id column allow old and new season data to coexist?"],
    },
    {
      id: "q-sdg-35",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A game detects AFK (away from keyboard) players in a battle royale. A player's character is not moving and not firing. Which behavioral signal most reliably distinguishes a human who is deliberately hiding from an AFK bot?",
      options: [
        "Character position unchanged for 30 seconds",
        "Zero mouse movement events received at the server for 30 seconds (human players micro-adjust aim even when stationary)",
        "No items picked up in the last 60 seconds",
        "Player health not decreasing"
      ],
      correctAnswer: 1,
      explanation: "Human players exhibit continuous micro-adjustments in mouse movement (jitter) even when deliberately hiding and staying still. A completely flat mouse input signal (zero delta movement for an extended period) is a strong indicator of an AFK client or bot. Bots that simulate AFK often add random mouse movements to bypass this — but these tend to have unnatural statistical distributions (uniform random vs. human Gaussian-clustered jitter). Position unchanged for 30s could be a legitimate hiding strategy. No items picked up is normal for players in a safe zone. Health not decreasing is expected for surviving players. Valorant, Apex Legends, and Fortnite use a combination of behavioral signals including input activity.",
      hints: ["What input signal is nearly impossible for a human to suppress completely even when trying to hold still?", "What distinguishes human micro-tremor mouse movement from zero movement?"],
    },
    {
      id: "q-sdg-36",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A cross-region multiplayer game pairs EU and NA players together. EU players experience 120ms RTT to the NA server, NA players experience 20ms RTT. Which mitigation allows a fairer play experience without region-locking?",
      options: [
        "Place the authoritative server geographically between the two regions (e.g., in the Atlantic) to equalize latency to ~70ms each",
        "Use a relay server in each region: each player connects to their nearest relay with low latency; relays exchange state at the inter-region latency; apply asymmetric lag compensation favoring the higher-latency player",
        "Force all cross-region matches to use the lower-latency region's server (NA server); EU players simply accept higher latency",
        "Disable cross-region matchmaking entirely; never match players from different regions"
      ],
      correctAnswer: 0,
      explanation: "Placing the server geographically between regions (or selecting a third-region server like US-East for EU vs. US-West players) equalizes latency, giving both players a similar experience (~60-80ms each instead of 20ms vs. 120ms). This is the approach used by most matchmaking systems that allow cross-region play — select the server location that minimizes the maximum player latency (minimax optimization). Relay servers add complexity without fixing the fundamental asymmetry. Forcing NA server gives NA players an unfair 100ms advantage. Disabling cross-region matchmaking hurts queue times for players in low-population regions. Data residency laws (GDPR) may constrain which servers can be used for EU players.",
      hints: ["If you can choose the server location freely, what placement minimizes the disadvantage to the higher-latency player?", "Think about minimax: minimize the maximum latency across all players."],
    },
    {
      id: "q-sdg-37",
      type: "true-false",
      difficulty: "easy",
      question: "In a single-elimination tournament bracket for 16 players, exactly 15 matches are required to determine the champion, regardless of whether byes are used.",
      correctAnswer: "True",
      explanation: "True. In single-elimination, each match eliminates exactly one player. To go from 16 players to 1 champion, exactly 15 players must be eliminated — therefore exactly 15 matches are required. This is true regardless of bracket seeding, byes (a bye is a walkover that eliminates no player and counts as no match — but for power-of-2 bracket sizes like 16, no byes are needed), or the order of matches. The formula is always N-1 matches for N players in single elimination. Double elimination requires 2N-2 or 2N-1 matches (every player must lose twice before elimination).",
      hints: ["Each match produces exactly one loser (eliminated). How many players must be eliminated to produce one champion from 16?", "N players, one champion — how many players must be eliminated?"],
    },
    {
      id: "q-sdg-38",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A procedurally generated open-world game uses seed-based chunk generation: each 256x256 chunk is generated from a seed derived from its (x, z) coordinates. Players share the same world (same seeds). Which problem occurs if chunk generation is not deterministic across all client platforms, and how is it solved?",
      options: [
        "Chunks generate slowly on lower-end hardware; solve with LOD (level of detail) reduction for distant chunks",
        "Floating-point operations produce platform-specific results (x86 vs. ARM vs. GPU compute); if two clients generate the same chunk differently, visible geometry mismatches occur and collision data diverges; solve by using integer arithmetic or fixed-point math for all generation, or transmitting the authoritative chunk from the server",
        "The same seed always generates the same chunk — there is no non-determinism issue",
        "Players on different OS versions see different chunk layouts because the OS random number generator differs"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** IEEE 754 floating-point operations are not guaranteed to produce bit-identical results across different CPU architectures, instruction sets (x86 SSE vs. ARM NEON vs. AVX-512), compiler optimizations, and FMA availability.\n**Step 2:** A procedural noise function using floats may produce subtly different heightmaps on different hardware, causing collision boundaries to differ, players to clip through terrain, and loot spawn positions to diverge.\n**Step 3:** Solutions include: (1) use integer or fixed-point arithmetic throughout generation, (2) quantize all float operations to a deterministic precision, (3) generate chunks server-side and stream them to clients. Minecraft's Java Edition encountered cross-platform differences when porting despite Java's platform-abstracted RNG.",
      hints: ["What property of floating-point arithmetic breaks cross-platform determinism?", "If two clients generate different collision data for the same chunk, what gameplay bugs result?"],
    },
  ],
};

registerQuestions(questions);

export default questions;
