import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-ride-location": [
    {
      id: "q-ride-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Uber receives ~250,000 GPS location updates per second from driver apps globally. Which storage and indexing architecture best handles this ingestion rate while supporting sub-100ms nearest-driver queries?",
      options: [
        "Write all GPS updates directly to PostgreSQL with a PostGIS spatial index; query with ST_DWithin for nearby drivers",
        "Ingest updates via Kafka, write to Redis using GEOADD per city shard, and query with GEORADIUS; persist to Cassandra asynchronously for history",
        "Store all updates in Elasticsearch with a geo_point field; use a geo_distance query for nearby drivers",
        "Write updates to DynamoDB with a geohash partition key; use a Scan with a filter expression for radius queries"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the write throughput requirement: 250,000 GPS updates per second exceeds what PostgreSQL, DynamoDB scans, or Elasticsearch can handle sustainably. **Step 2:** Evaluate data stores with built-in geospatial support: Redis GEOADD handles millions of writes/sec with microsecond latency using a sorted set. **Step 3:** Determine the sharding strategy: city-level sharding distributes write load, Kafka provides backpressure handling, and Cassandra persists durable history. Redis GEOADD with city-level sharding is the canonical solution for high-frequency GPS ingestion. Redis handles millions of writes/sec with microsecond latency, GEOADD stores coordinates in a sorted set using a 52-bit geohash score, and GEORADIUS executes O(N+log(M)) radius queries. Kafka decouples ingestion from writes, enabling backpressure handling. Cassandra provides durable history. PostgreSQL/PostGIS can't sustain 250K writes/sec without extreme horizontal scaling. Elasticsearch is optimized for search, not high-frequency point writes. DynamoDB Scan is full-table and unsuitable for radius queries.",
      hints: [
        "Which in-memory data store has built-in geospatial commands that handle millions of writes per second?",
        "How does city-level sharding reduce per-instance write load while enabling fast radius queries?"
      ],
      stepByStep: {
        step1: "Identify the write throughput requirement: 250,000 GPS updates per second exceeds what PostgreSQL, DynamoDB scans, or Elasticsearch can handle sustainably.",
        step2: "Evaluate data stores with built-in geospatial support: Redis GEOADD handles millions of writes/sec with microsecond latency using a sorted set.",
        step3: "Determine the sharding strategy: city-level sharding distributes write load, Kafka provides backpressure handling, and Cassandra persists durable history."
      }
    },
    {
      id: "q-ride-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When storing driver locations for radius queries, why does Uber prefer S2 geometry cells over simple geohash strings?",
      options: [
        "S2 cells have shorter string representations, saving storage space",
        "S2 cells are hierarchical, cover the sphere without distortion at the poles, and allow querying a circular radius with a fixed number of covering cells at any level",
        "S2 cells are natively supported by Redis GEORADIUS, unlike geohash",
        "S2 cells use base-32 encoding which is faster to compute than base-36 geohash"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that geohash uses Mercator projection, which distorts cell sizes near the poles and causes unequal area cells globally. **Step 2:** Understand that S2 cells have nearly equal area at all latitudes and provide hierarchical structure for multi-resolution queries. **Step 3:** Note that a circle can be approximated with a bounded number of S2 cells, enabling efficient range scans on a sorted index. Google's S2 library divides the sphere into a quad-tree of cells at 30 levels. Unlike geohash (Mercator-projected), S2 cells have nearly equal area globally and avoid pole distortion. A circle can be approximated with a small, bounded number of S2 cell IDs at the appropriate level — enabling range scans on a sorted index. This produces tighter approximations than geohash neighbors, reducing false positives. S2 is not a Redis primitive; Uber uses it in their dispatch service with custom indexing. The encoding format is irrelevant to the query accuracy advantage.",
      hints: [
        "Consider how geohash cells distort near the poles and at cell boundaries due to Mercator projection.",
        "How does covering a circle with a fixed number of rectangular cells affect query precision compared to variable-sized geohash cells?"
      ],
      stepByStep: {
        step1: "Recognize that geohash uses Mercator projection, which distorts cell sizes near the poles and causes unequal area cells globally.",
        step2: "Understand that S2 cells have nearly equal area at all latitudes and provide hierarchical structure for multi-resolution queries.",
        step3: "Note that a circle can be approximated with a bounded number of S2 cells, enabling efficient range scans on a sorted index."
      }
    },
    {
      id: "q-ride-3",
      type: "true-false",
      difficulty: "easy",
      question: "To find drivers near a rider, storing driver locations in a Redis sorted set with geohash scores allows GEORADIUS to return results sorted by distance in O(log N) time for the index lookup.",
      correctAnswer: "true",
      explanation: "**Step 1:** Recall that Redis GEOADD stores coordinates as a 52-bit geohash score within a sorted set structure. **Step 2:** Understand that GEORADIUS converts the circular search region into geohash ranges and performs an O(log N + M) range scan. **Step 3:** Recognize that nearby locations have similar geohash scores, so the range scan efficiently retrieves drivers sorted by distance. True. Redis GEOADD stores coordinates encoded as a 52-bit integer geohash in a sorted set. GEORADIUS translates the search circle into a set of geohash ranges and performs a sorted set range scan — O(log N + M) where N is total members and M is results. Because nearby locations have similar geohash scores, the range scan is efficient. Results can be returned sorted by distance, and the underlying sorted set structure makes this sub-millisecond for typical city-scale datasets of hundreds of thousands of drivers.",
      hints: [
        "What data structure does Redis use internally for GEOADD, and how does it enable efficient spatial indexing?",
        "What is the time complexity of a range query on a sorted set, and why does this matter for GEORADIUS?"
      ],
      stepByStep: {
        step1: "Recall that Redis GEOADD stores coordinates as a 52-bit geohash score within a sorted set structure.",
        step2: "Understand that GEORADIUS converts the circular search region into geohash ranges and performs an O(log N + M) range scan.",
        step3: "Recognize that nearby locations have similar geohash scores, so the range scan efficiently retrieves drivers sorted by distance."
      }
    },
  ],

  "sdi-ride-matching": [
    {
      id: "q-ride-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Lyft's dispatch system must assign thousands of ride requests to available drivers every few seconds. Which algorithmic approach produces globally optimal driver-rider assignments?",
      options: [
        "Greedy nearest-driver first: assign each request to the closest available driver in request arrival order",
        "The Hungarian algorithm (or auction algorithm) run on a cost matrix of predicted ETAs, minimizing total assignment cost across all open requests simultaneously",
        "Random sampling: for each request, randomly select from the top-5 nearest drivers and assign the first to accept",
        "Round-robin assignment across all online drivers in the geographic zone, ignoring distance"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that greedy nearest-driver-first assigns each rider to the closest available driver sequentially, which is locally optimal but can strand distant riders. **Step 2:** Identify that the Hungarian algorithm solves the assignment problem by finding the globally optimal matching that minimizes total cost across all pairs. **Step 3:** Understand that running this optimization over a batch window of open requests further improves quality by considering all pending requests together. Optimal bipartite matching via the Hungarian algorithm (or its scalable variant, the auction algorithm) minimizes the sum of assignment costs (e.g., predicted ETA) across all rider-driver pairs simultaneously. Greedy nearest-first is locally optimal but globally suboptimal — it can strand distant riders by assigning nearby drivers to close riders first. In practice, Lyft and Uber run batched optimization every 2-5 seconds over a sliding window of open requests, using predicted ETA (not straight-line distance) as the cost metric, computed by a routing engine. Random sampling and round-robin produce poor user outcomes.",
      hints: [
        "Greedy algorithms optimize locally at each step — what class of algorithm optimizes globally for bipartite matching problems?",
        "Why is predicted ETA a better cost metric than Euclidean distance for driver matching, and how does batching improve global assignment quality?"
      ],
      stepByStep: {
        step1: "Recognize that greedy nearest-driver-first assigns each rider to the closest available driver sequentially, which is locally optimal but can strand distant riders.",
        step2: "Identify that the Hungarian algorithm solves the assignment problem by finding the globally optimal matching that minimizes total cost across all pairs.",
        step3: "Understand that running this optimization over a batch window of open requests further improves quality by considering all pending requests together."
      }
    },
    {
      id: "q-ride-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A ride-matching system uses predicted ETA rather than straight-line distance as the assignment cost. What is the primary reason for this choice?",
      options: [
        "ETA is cheaper to compute than distance because it avoids the Haversine formula",
        "ETA accounts for road network topology, traffic conditions, and turn restrictions — a driver 0.5 miles away on the other side of a highway may have a 10-minute ETA vs. 2 minutes for a driver 1 mile away on the same road",
        "Regulatory requirements mandate ETA-based matching in most jurisdictions",
        "ETA makes surge pricing calculations simpler by co-locating matching and pricing logic"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that straight-line distance ignores road topology, barriers like rivers or highways, and one-way streets. **Step 2:** Understand that a driver 0.5 miles away on the wrong side of a highway may take 10 minutes versus 2 minutes for a driver 1 mile away on a direct route. **Step 3:** Conclude that predicted ETA incorporates real-time traffic and road graph traversal, providing a true measure of pickup time for matching. Straight-line (Euclidean or Haversine) distance ignores road network reality. A driver 0.5 miles away might be separated by a river, highway, or one-way road system, resulting in a much longer actual travel time than a driver 1.5 miles away on a direct route. Predicted ETA incorporates real-time traffic, road graph traversal, turn restrictions, and speed limits — giving a true measure of how quickly a driver can reach the rider. This directly improves rider experience and reduces cancellation rates from long actual waits. The Haversine formula is O(1) and trivially cheap compared to routing.",
      hints: [
        "Can two points be close in Euclidean space but far apart on a road network due to physical barriers like rivers or highways?",
        "What does a routing engine consider that straight-line distance ignores, and how does this affect matching decisions?"
      ],
      stepByStep: {
        step1: "Recognize that straight-line distance ignores road topology, barriers like rivers or highways, and one-way streets.",
        step2: "Understand that a driver 0.5 miles away on the wrong side of a highway may take 10 minutes versus 2 minutes for a driver 1 mile away on a direct route.",
        step3: "Conclude that predicted ETA incorporates real-time traffic and road graph traversal, providing a true measure of pickup time for matching."
      }
    },
    {
      id: "q-ride-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Uber's dispatch system batches ride requests into 2-second windows before running assignment optimization. What is the primary trade-off of increasing this batch window to 10 seconds?",
      options: [
        "Higher server CPU usage because the optimization problem becomes larger",
        "Better global assignment quality at the cost of increased rider waiting time before a driver is confirmed",
        "Reduced assignment quality because drivers move further during the longer window, invalidating ETA estimates",
        "Both B and C — longer windows improve global optimality but introduce rider latency and ETA staleness"
      ],
      correctAnswer: 3,
      explanation: "**Step 1:** Identify the benefit: larger batches give the optimizer more simultaneous assignments to consider, improving global assignment quality. **Step 2:** Identify the first cost: riders wait longer for confirmation since assignment only begins after the window closes. **Step 3:** Identify the second cost: drivers move during the window (at 30mph, ~440 feet in 10 seconds), making ETA estimates stale by window-close. Increasing the batch window creates a genuine multi-dimensional trade-off. A larger batch gives the optimizer more riders and drivers to consider simultaneously, improving global assignment quality (e.g., avoiding the 'tyranny of the nearest driver'). However, riders experience longer confirmation latency since they must wait for the window to close before assignment begins. Additionally, drivers move during the window — a 10-second window at 30mph means a driver moves ~440 feet, making ETA estimates computed at window-open time less accurate by window-close. Uber has found 2-3 second windows balance these trade-offs well in dense markets.",
      hints: [
        "What improves with more riders and drivers in the optimization batch, and what degrades as time passes before assignment runs?",
        "How does driver movement during a longer batch window affect the accuracy of ETA estimates computed at window-open?"
      ],
      stepByStep: {
        step1: "Identify the benefit: larger batches give the optimizer more simultaneous assignments to consider, improving global assignment quality.",
        step2: "Identify the first cost: riders wait longer for confirmation since assignment only begins after the window closes.",
        step3: "Identify the second cost: drivers move during the window (at 30mph, ~440 feet in 10 seconds), making ETA estimates stale by window-close."
      }
    },
  ],

  "sdi-ride-surge": [
    {
      id: "q-ride-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Uber's surge pricing multiplier for a geographic zone is primarily determined by which signal?",
      options: [
        "The number of unique app opens in the zone in the last 60 seconds",
        "The ratio of unfulfilled ride requests to available drivers in the zone, with multiplier tiers calibrated to price elasticity",
        "The average driver rating in the zone weighted by trip recency",
        "The difference between current revenue and forecasted revenue for that zone and hour"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that surge pricing implements a supply-demand balancing mechanism, not a revenue maximization mechanism. **Step 2:** Identify the control signal: the ratio of open (unfulfilled) requests to available drivers in the geofenced zone. **Step 3:** Understand that multiplier tiers are calibrated empirically using price elasticity data to determine how much demand drops and supply increases per unit of price increase. Surge pricing is fundamentally a supply-demand balancing mechanism. The core signal is the ratio of open (unfulfilled) requests to available (idle + completing) drivers in a geofenced zone. When this ratio exceeds a threshold (e.g., 2:1 requests per driver), the multiplier increases. Multiplier tiers are calibrated empirically using price elasticity data — how much demand drops and supply increases per unit of price increase. This creates a feedback loop: higher prices attract more drivers (supply) and reduce requests (demand) until the zone clears. App opens are a leading indicator but not the direct control signal.",
      hints: [
        "What economic mechanism does surge pricing implement, and which ratio directly measures whether a market is supply-constrained?",
        "How do multiplier tiers relate to empirical price elasticity data for demand and supply responses?"
      ],
      stepByStep: {
        step1: "Recognize that surge pricing implements a supply-demand balancing mechanism, not a revenue maximization mechanism.",
        step2: "Identify the control signal: the ratio of open (unfulfilled) requests to available drivers in the geofenced zone.",
        step3: "Understand that multiplier tiers are calibrated empirically using price elasticity data to determine how much demand drops and supply increases per unit of price increase."
      }
    },
    {
      id: "q-ride-8",
      type: "true-false",
      difficulty: "easy",
      question: "Surge pricing zones should be defined using fixed rectangular grid cells rather than dynamic geofenced zones because fixed grids are simpler to compute and cache.",
      correctAnswer: "false",
      explanation: "**Step 1:** Recognize that fixed rectangular grids poorly align with natural demand boundaries like neighborhoods, venues, and transit hubs. **Step 2:** Understand that hexagonal grids (H3) are preferred because all six neighbors are equidistant from the center, eliminating directional bias. **Step 3:** Conclude that dynamic geofence polygons better capture actual demand patterns, and computational cost is negligible compared to accuracy gains. False. Fixed rectangular grids poorly align with natural demand boundaries (neighborhoods, event venues, transit hubs). Uber uses irregular, hand-tuned geofence polygons for surge zones, often corresponding to city neighborhoods or airport areas. Hexagonal grids (e.g., H3 by Uber) are increasingly preferred for demand heatmaps because hexagons have equal distance to all neighbors, minimizing directional bias and enabling smoother zone aggregation. Dynamic zone boundaries based on demand clustering can further improve accuracy. The computational cost of geofence polygon containment checks is negligible compared to the accuracy improvement over fixed rectangles.",
      hints: [
        "Do neighborhoods, event venues, and transit hubs follow rectangular boundaries, or do they have irregular natural shapes?",
        "What geometric property makes hexagonal grids superior to rectangular grids for spatial analysis and demand heatmaps?"
      ],
      stepByStep: {
        step1: "Recognize that fixed rectangular grids poorly align with natural demand boundaries like neighborhoods, venues, and transit hubs.",
        step2: "Understand that hexagonal grids (H3) are preferred because all six neighbors are equidistant from the center, eliminating directional bias.",
        step3: "Conclude that dynamic geofence polygons better capture actual demand patterns, and computational cost is negligible compared to accuracy gains."
      }
    },
    {
      id: "q-ride-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "To prevent surge price oscillations (multiplier spiking up then down rapidly), which technique is most effective?",
      options: [
        "Increase the batch window for surge calculation to 5 minutes to smooth out noise",
        "Apply hysteresis: require the supply/demand ratio to cross a higher threshold to increase the multiplier and a lower threshold to decrease it, preventing rapid flipping",
        "Cap the maximum surge multiplier at 1.5x to reduce volatility",
        "Compute surge based solely on historical data from the same hour last week, not real-time signals"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Identify the root cause: when the supply/demand ratio hovers near a single threshold, small fluctuations cause rapid on/off switching. **Step 2:** Recognize that hysteresis solves this by using different thresholds for activation (higher) versus deactivation (lower). **Step 3:** Understand that this creates a deadband where the multiplier stays stable, preventing oscillation without adding latency to real demand signals. Hysteresis (common in control systems) prevents oscillation by using different thresholds for increasing vs. decreasing the surge multiplier. For example: surge activates at a 3:1 demand/supply ratio but only deactivates when the ratio drops below 1.5:1. This prevents the multiplier from flip-flopping when the ratio hovers near a single threshold boundary. A 5-minute smoothing window adds unacceptable latency to real demand signals. Capping at 1.5x prevents the price signal from clearing supply-constrained markets. Historical-only data ignores real-time conditions. Hysteresis is the classic engineering solution to threshold oscillation.",
      hints: [
        "In control systems, what technique prevents rapid state switching when input hovers near a threshold, using separate 'on' and 'off' thresholds?",
        "Why does using a single threshold for both activating and deactivating surge cause oscillation?"
      ],
      stepByStep: {
        step1: "Identify the root cause: when the supply/demand ratio hovers near a single threshold, small fluctuations cause rapid on/off switching.",
        step2: "Recognize that hysteresis solves this by using different thresholds for activation (higher) versus deactivation (lower).",
        step3: "Understand that this creates a deadband where the multiplier stays stable, preventing oscillation without adding latency to real demand signals."
      }
    },
  ],

  "sdi-ride-eta": [
    {
      id: "q-ride-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Uber's ETA prediction must account for real-time traffic. Which combination of data sources and model approach is most appropriate for a production ETA system?",
      options: [
        "Static speed limits from map data only, with a 20% buffer added for traffic",
        "Real-time GPS probe data from active drivers aggregated into road segment speed estimates, combined with historical speed patterns by time-of-day/day-of-week, fed into a gradient boosting model",
        "Only historical average travel times by hour of day, with no real-time component",
        "Live traffic data from a single third-party API (e.g., Google Maps) as the sole input, passed directly to riders without ML post-processing"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that a ride-sharing company has millions of GPS probes from active drivers — a unique real-time data source unavailable to third parties. **Step 2:** Identify that combining real-time probe data with historical speed patterns by time-of-day captures both current conditions and expected patterns. **Step 3:** Understand that ML models (gradient boosting) learn to correct systematic biases, producing more accurate predictions than rule-based approaches. Production ETA systems like DeepETA (Uber) combine: (1) real-time road segment speeds derived from GPS probe data of active drivers (Uber has millions of probes globally), (2) historical speed patterns by time of day, day of week, and special events, and (3) ML models (gradient boosting or deep learning) that learn to correct systematic biases. Key features include segment-level speed, turn penalties, traffic signal delays, driver behavior patterns, and weather. GPS probe data is unique and high-frequency, making it far superior to static speed limits. Third-party APIs lack customization and introduce vendor dependency.",
      hints: [
        "What unique real-time data source does a ride-sharing company have that others don't, and why is it superior to static data?",
        "Why is combining real-time and historical data better than either alone for ETA prediction?"
      ],
      stepByStep: {
        step1: "Recognize that a ride-sharing company has millions of GPS probes from active drivers — a unique real-time data source unavailable to third parties.",
        step2: "Identify that combining real-time probe data with historical speed patterns by time-of-day captures both current conditions and expected patterns.",
        step3: "Understand that ML models (gradient boosting) learn to correct systematic biases, producing more accurate predictions than rule-based approaches."
      }
    },
    {
      id: "q-ride-11",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A food delivery app needs to show customers an ETA that accounts for restaurant preparation time, driver pickup wait, and delivery drive time. Which architecture best handles the uncertainty in preparation time?",
      options: [
        "Show a fixed 30-minute ETA for all orders regardless of restaurant or distance",
        "Compute a probabilistic ETA using P50/P90 estimates for each component (prep time, pickup wait, drive time), and display a range (e.g., '25-35 minutes') to set honest expectations",
        "Show only the drive time from restaurant to customer, excluding preparation time since it is uncontrollable",
        "Use the maximum possible time for each component to guarantee the ETA is never exceeded"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that food delivery has three sequential uncertainty sources: preparation, pickup wait, and drive time, each with its own variance. **Step 2:** Understand that when uncertainties combine, the total uncertainty grows (compounding variance from each stage). **Step 3:** Conclude that modeling each component as a distribution and displaying a P50-P90 range sets honest expectations and reduces cancellations from missed ETAs. Food delivery ETAs have compounded uncertainty from three sequential stages: preparation (high variance by restaurant and order complexity), driver pickup wait (depends on driver proximity at order time), and driving (traffic variance). DoorDash and Instacart model each component as a distribution and display P50 as the expected time and P90 as the upper bound. Showing a range (e.g., '25-35 min') is more honest than a point estimate and reduces cancellations from missed ETAs. Using maximum estimates makes ETAs too pessimistic, increasing cancellations. Excluding prep time produces systematically wrong ETAs. P90 calibration means 90% of deliveries arrive within the displayed window.",
      hints: [
        "When three uncertain estimates (prep, pickup, drive) are combined, how does uncertainty compound?",
        "Why might displaying an ETA range (P50 to P90) be better for customer satisfaction than a single point estimate?"
      ],
      stepByStep: {
        step1: "Recognize that food delivery has three sequential uncertainty sources: preparation, pickup wait, and drive time, each with its own variance.",
        step2: "Understand that when uncertainties combine, the total uncertainty grows (compounding variance from each stage).",
        step3: "Conclude that modeling each component as a distribution and displaying a P50-P90 range sets honest expectations and reduces cancellations from missed ETAs."
      }
    },
  ],

  "sdi-ride-statemachine": [
    {
      id: "q-ride-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A trip in a ride-sharing app transitions through states: REQUESTED -> ACCEPTED -> DRIVER_ARRIVED -> IN_TRIP -> COMPLETED (or CANCELLED at any point). Which storage approach best models this state machine for reliability and auditability?",
      options: [
        "Store only the current state in a single MySQL column; update it in place on each transition",
        "Use an event sourcing pattern: append an immutable event (e.g., TripAccepted, DriverArrived) to an event log; derive current state by replaying events",
        "Use a separate status table with one row per trip, updated via an UPDATE statement with optimistic locking on a version column",
        "Store state in the driver app's local SQLite database and sync to server on trip completion"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that storing only the current state in a mutable column loses the history of transitions, making dispute resolution impossible. **Step 2:** Identify that event sourcing appends immutable events to a log, preserving the complete transition history. **Step 3:** Understand that replaying events derives current state, enabling audit trails, ML training data, and Kafka integration for downstream consumers. Event sourcing is ideal for trip state machines. Each transition appends an immutable event (TripRequested, TripAccepted, DriverArrived, TripCompleted, TripCancelled) with a timestamp and actor to an append-only log. Current state is derived by replaying events. This provides: (1) full audit trail for disputes, (2) the ability to replay history for debugging or ML training, (3) natural integration with Kafka for downstream consumers (billing, analytics, safety), (4) idempotency by checking if an event already exists before appending. An in-place mutable state column loses history and makes dispute resolution difficult. Local device storage is unreliable.",
      hints: [
        "What pattern stores the history of state changes rather than just the current state, enabling full audit trails?",
        "How would you reconstruct what happened during a disputed trip — replaying events or reading a current state column?"
      ],
      stepByStep: {
        step1: "Recognize that storing only the current state in a mutable column loses the history of transitions, making dispute resolution impossible.",
        step2: "Identify that event sourcing appends immutable events to a log, preserving the complete transition history.",
        step3: "Understand that replaying events derives current state, enabling audit trails, ML training data, and Kafka integration for downstream consumers."
      }
    },
    {
      id: "q-ride-13",
      type: "true-false",
      difficulty: "easy",
      question: "In a ride-sharing trip state machine, a COMPLETED trip should be allowed to transition back to IN_TRIP to handle GPS signal loss that caused premature trip completion.",
      correctAnswer: "false",
      explanation: "**Step 1:** Recognize that COMPLETED is a terminal state — once payment is processed, the state must not change to avoid billing inconsistencies. **Step 2:** Understand that backward transitions would break downstream systems that have already processed the completed trip. **Step 3:** Know the correct approach: implement a grace period before completing a trip, use dead-reckoning, and handle GPS errors via post-trip dispute resolution. False. Terminal states (COMPLETED, CANCELLED) must be immutable — no backward transitions allowed. Allowing backward transitions creates billing inconsistencies (double charging), breaks downstream systems (payment already processed at COMPLETED), and makes the state machine undecidable. The correct approach for GPS signal loss is to implement a grace period before completing a trip (e.g., wait 30 seconds after apparent stop), use dead-reckoning to extend the trip, and provide a post-trip dispute resolution flow if GPS caused incorrect completion. Once a trip is COMPLETED and payment is processed, the state must not change — corrections happen via separate refund/adjustment records.",
      hints: [
        "What happens to payment processing when a trip reaches COMPLETED, and why must this remain immutable?",
        "How should GPS errors be handled without making terminal states reversible — through grace periods or backward transitions?"
      ],
      stepByStep: {
        step1: "Recognize that COMPLETED is a terminal state — once payment is processed, the state must not change to avoid billing inconsistencies.",
        step2: "Understand that backward transitions would break downstream systems that have already processed the completed trip.",
        step3: "Know the correct approach: implement a grace period before completing a trip, use dead-reckoning, and handle GPS errors via post-trip dispute resolution."
      }
    },
    {
      id: "q-ride-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A cancellation request arrives for a trip that is simultaneously transitioning to ACCEPTED on another server. How do you prevent the trip from being accepted after it has been cancelled (race condition)?",
      options: [
        "Use a distributed lock (Redis Redlock) around the entire state read-and-write sequence for every transition",
        "Use an optimistic concurrency control pattern: include the expected current state in the UPDATE WHERE clause (e.g., UPDATE trips SET state='CANCELLED' WHERE id=? AND state='REQUESTED'); if 0 rows updated, the transition failed",
        "Serialize all state transitions through a single-threaded queue per trip using an actor model",
        "Both B and C are valid solutions with different trade-off profiles"
      ],
      correctAnswer: 3,
      explanation: "**Step 1:** Identify the race condition: both cancel and accept operations read the state as REQUESTED simultaneously, then both attempt to write. **Step 2:** Recognize that OCC solves this atomically: the conditional UPDATE WHERE clause ensures only one writer succeeds. **Step 3:** Understand that the actor model serializes all messages per trip entity, eliminating concurrent access entirely — both are valid with different trade-offs. Both optimistic concurrency control (OCC) and the actor model solve this race condition correctly. OCC via conditional UPDATE (WHERE state='REQUESTED') is atomic at the database level — the DB engine ensures only one writer wins; the loser gets 0 rows affected and can handle the conflict. The actor model serializes all messages for a given trip entity, eliminating concurrent access entirely. OCC is stateless and scales horizontally; the actor model (e.g., Erlang/Akka) is stateful but eliminates all concurrency complexity per entity. Both are production-grade. A global Redlock per transition creates a bottleneck and is overkill for per-entity concurrency.",
      hints: [
        "How does a conditional SQL UPDATE (WHERE state='REQUESTED') prevent two concurrent writers from both succeeding?",
        "What does an actor model guarantee about message processing order per actor, and how does this eliminate race conditions?"
      ],
      stepByStep: {
        step1: "Identify the race condition: both cancel and accept operations read the state as REQUESTED simultaneously, then both attempt to write.",
        step2: "Recognize that OCC solves this atomically: the conditional UPDATE WHERE clause ensures only one writer succeeds.",
        step3: "Understand that the actor model serializes all messages per trip entity, eliminating concurrent access entirely — both are valid with different trade-offs."
      }
    },
  ],

  "sdi-ride-communication": [
    {
      id: "q-ride-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Uber's driver app needs to receive real-time dispatch offers, trip status updates, and navigation instructions. Which transport mechanism is most appropriate for this push communication channel?",
      options: [
        "HTTP long polling: driver app sends a request, server holds it open until an event is available, then responds",
        "WebSocket: bidirectional full-duplex TCP connection maintained between driver app and server, with heartbeats to detect disconnection",
        "SMS push notifications: server sends dispatch offer via SMS, driver responds by SMS",
        "Periodic HTTP polling every 2 seconds from the driver app"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that dispatch offers require sub-100ms push latency — polling approaches (2-second polling or long polling) add unacceptable delays. **Step 2:** Identify that WebSocket maintains a persistent bidirectional connection, enabling instant server-to-client pushes without polling overhead. **Step 3:** Understand that heartbeats detect disconnection, enabling fast reconnect to maintain reliability even in tunnels or areas of poor connectivity. WebSocket is the standard choice for driver apps requiring real-time bidirectional communication. A persistent WebSocket connection enables the server to push dispatch offers, navigation updates, and status changes to the driver instantly (sub-100ms) without polling overhead. The driver app also sends location updates and accepts/declines over the same connection. Heartbeat pings detect disconnection (e.g., tunnel, signal loss) enabling fast reconnect. Long polling works but is less efficient (connection overhead per message, no true push). SMS is unreliable, high-latency, and costly. 2-second polling introduces artificial latency for time-critical dispatch offers.",
      hints: [
        "Which protocol maintains a persistent connection so the server can push data anytime without the client polling?",
        "What happens to dispatch offer latency when a driver enters a tunnel with HTTP polling versus WebSocket?"
      ],
      stepByStep: {
        step1: "Recognize that dispatch offers require sub-100ms push latency — polling approaches (2-second polling or long polling) add unacceptable delays.",
        step2: "Identify that WebSocket maintains a persistent bidirectional connection, enabling instant server-to-client pushes without polling overhead.",
        step3: "Understand that heartbeats detect disconnection, enabling fast reconnect to maintain reliability even in tunnels or areas of poor connectivity."
      }
    },
    {
      id: "q-ride-16",
      type: "true-false",
      difficulty: "medium",
      question: "To minimize battery drain on driver phones, the driver app should send a GPS location update to the server every 1 second regardless of whether the driver is moving, idle, or on a trip.",
      correctAnswer: "false",
      explanation: "**Step 1:** Recognize that constant 1-second GPS updates waste battery when the driver is stationary — no meaningful location change occurs. **Step 2:** Understand adaptive update rates: high frequency during trips, medium when waiting, low when backgrounded using significant-location-change API. **Step 3:** Note that iOS significant-location-change API uses cell tower triangulation (low power) rather than GPS, reducing battery consumption by 50-80%. False. Constant 1-second updates waste battery and bandwidth when the driver is stationary. Battery-efficient location strategies use adaptive update rates: high frequency (1-4 Hz) during active trips for accurate route tracking, medium frequency (every 4-8 seconds) when online and waiting for requests, and low frequency (every 30-60 seconds or using significant-location-change API) when the app is backgrounded. On iOS, the significant-location-change API uses cell tower triangulation (low power) rather than GPS. On Android, fused location provider selects the lowest-power sensor sufficient for the current accuracy requirement. This can reduce GPS battery consumption by 50-80% with minimal dispatch quality impact.",
      hints: [
        "Does a stationary driver need the same location update frequency as a driver actively navigating a route?",
        "What iOS API provides location updates using cell tower triangulation instead of continuous GPS, and why does this save battery?"
      ],
      stepByStep: {
        step1: "Recognize that constant 1-second GPS updates waste battery when the driver is stationary — no meaningful location change occurs.",
        step2: "Understand adaptive update rates: high frequency during trips, medium when waiting, low when backgrounded using significant-location-change API.",
        step3: "Note that iOS significant-location-change API uses cell tower triangulation (low power) rather than GPS, reducing battery consumption by 50-80%."
      }
    },
  ],

  "sdi-ride-pricing": [
    {
      id: "q-ride-17",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Uber offers upfront pricing: the rider sees a locked price before booking, but the actual trip may take longer due to traffic. How does Uber reconcile the locked price with actual trip costs?",
      options: [
        "The driver is always paid exactly the locked price regardless of actual trip duration or distance",
        "Uber charges the rider the locked price but pays the driver based on actual time and distance, absorbing or collecting the difference as a pricing hedge",
        "The locked price is automatically voided if the trip takes more than 10% longer than estimated; the rider is then charged dynamic pricing",
        "The rider is charged the minimum of the locked price and the actual metered fare"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that upfront pricing separates rider price (locked) from driver pay (actual time and distance). **Step 2:** Understand that Uber absorbs or collects the difference through statistical modeling over millions of trips — risk pooling across the portfolio. **Step 3:** Conclude that accurate ETA prediction keeps expected locked prices aligned with expected driver pay, making the model sustainable. Uber's upfront pricing model separates rider price from driver pay. The rider pays the locked price (providing certainty). The driver is paid based on actual time and distance at their contracted per-minute and per-mile rates. Uber uses statistical modeling over millions of trips to ensure that on average, locked prices are profitable — sometimes Uber absorbs overages (long trips), sometimes it profits (short trips that beat the estimate). This is essentially insurance/risk pooling across millions of trips. The business model requires accurate ETA prediction to keep expected locked prices aligned with expected driver pay. Voiding the price lock would destroy the user value proposition.",
      hints: [
        "What does it mean to 'price lock' a ride for the consumer versus how the driver is compensated — are these the same?",
        "How might a company manage financial risk when offering fixed prices for variable-cost services — through statistical pooling?"
      ],
      stepByStep: {
        step1: "Recognize that upfront pricing separates rider price (locked) from driver pay (actual time and distance).",
        step2: "Understand that Uber absorbs or collects the difference through statistical modeling over millions of trips — risk pooling across the portfolio.",
        step3: "Conclude that accurate ETA prediction keeps expected locked prices aligned with expected driver pay, making the model sustainable."
      }
    },
    {
      id: "q-ride-18",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A ride-sharing app adds multi-stop trip support where a rider can add intermediate stops. How should the fare be calculated?",
      options: [
        "Charge only for the final segment (last stop to destination), ignoring intermediate stops",
        "Compute the optimal route through all waypoints using TSP (Travelling Salesman Problem) approximation, then charge based on total estimated time and distance of the optimized route",
        "Charge a flat per-stop fee of $2 plus the direct origin-to-destination fare, ignoring detour distance",
        "Require the driver to re-accept the ride at each stop with a new fare calculated from that point"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that multi-stop fares must reflect the actual route the driver travels, including all detours to intermediate stops. **Step 2:** Understand that with 2-4 stops, all route permutations can be evaluated exactly (6 permutations for 3 stops), making TSP approximation unnecessary. **Step 3:** Conclude that the fare should be based on the total estimated time and distance of the optimal ordered route plus any wait time at stops. Multi-stop fares should reflect the actual route the driver travels through all waypoints. Since the number of stops is small (typically 2-4), the optimal route can be found exactly (not just approximately) by evaluating all permutations — with 3 stops that is 6 permutations, trivially fast. The fare is based on the total estimated time and distance of the optimal ordered route, plus any wait time at stops. Charging only the final segment ignores driver effort. A flat per-stop fee is arbitrary and inaccurate for detours. Re-accepting at each stop creates friction and potential driver gaming. DoorDash and Instacart use similar multi-stop routing for delivery batching.",
      hints: [
        "With 2-3 intermediate stops, is computing all route permutations (exact TSP) feasible or does it require approximation?",
        "What should the fare reflect to fairly compensate the driver — the optimized total route or arbitrary segment fees?"
      ],
      stepByStep: {
        step1: "Recognize that multi-stop fares must reflect the actual route the driver travels, including all detours to intermediate stops.",
        step2: "Understand that with 2-4 stops, all route permutations can be evaluated exactly (6 permutations for 3 stops), making TSP approximation unnecessary.",
        step3: "Conclude that the fare should be based on the total estimated time and distance of the optimal ordered route plus any wait time at stops."
      }
    },
  ],

  "sdi-ride-pooling": [
    {
      id: "q-ride-19",
      type: "multiple-choice",
      difficulty: "hard",
      question: "UberPool (shared rides) must group passengers going in similar directions and sequence their pickups/dropoffs to minimize total detour. What is the key constraint that makes this problem tractable in real time?",
      options: [
        "Limiting the pool to 2 passengers per vehicle, so only one insertion point needs to be evaluated for the second rider",
        "Using a precomputed lookup table of all possible two-passenger route combinations in the city",
        "Restricting the search to drivers already on a route, evaluating only feasible insertion points for the new rider that do not exceed a maximum detour threshold (e.g., 5 minutes per passenger)",
        "Requiring all pooled passengers to share the exact same origin and destination"
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Recognize that evaluating all possible route combinations for all drivers is intractable at scale — constraints are needed. **Step 2:** Identify the two key constraints: only consider drivers already on a route, and only evaluate insertion points within a maximum detour threshold. **Step 3:** Understand that with pickup-before-dropoff constraints, there are only 3 valid orderings for 2 passengers, reducing per-candidate evaluation to O(1). Real-time pool matching uses two constraints to keep the problem tractable: (1) only consider drivers already carrying a passenger or immediately available (limiting the candidate set), and (2) for each candidate driver, only evaluate insertion points for the new rider's pickup and dropoff that satisfy a maximum detour constraint per existing passenger (e.g., no passenger's ETA increases by more than 5 minutes). With 2 passengers and 4 waypoints (2 pickups, 2 dropoffs), there are only 3 valid orderings (P1 must be picked up before dropped off, same for P2). This reduces to O(1) route evaluations per candidate driver, making real-time assignment feasible even at Uber scale.",
      hints: [
        "How many valid pickup/dropoff orderings exist for 2 passengers with pickup-before-dropoff constraints, and why does this limit the search space?",
        "What constraint bounds the detour so passengers aren't taken wildly out of the way — and how does this make real-time pooling feasible?"
      ],
      stepByStep: {
        step1: "Recognize that evaluating all possible route combinations for all drivers is intractable at scale — constraints are needed.",
        step2: "Identify the two key constraints: only consider drivers already on a route, and only evaluate insertion points within a maximum detour threshold.",
        step3: "Understand that with pickup-before-dropoff constraints, there are only 3 valid orderings for 2 passengers, reducing per-candidate evaluation to O(1)."
      }
    },
    {
      id: "q-ride-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a carpooling system (e.g., UberPool), how should the per-passenger fare be split when passengers travel different distances on the shared route?",
      options: [
        "Split the total vehicle fare equally among all passengers regardless of distance traveled",
        "Each passenger pays a base fare plus a per-km/per-minute rate for their individual segment of the trip, discounted from solo pricing to reflect the shared vehicle benefit",
        "Charge the longest-distance passenger the full solo fare; give all other passengers a free ride",
        "Charge all passengers the minimum fare of any passenger's solo price"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that equal fare splitting is unfair to short-distance riders and unattractive to long-distance riders who would prefer solo trips. **Step 2:** Understand that each passenger should pay based on their individual segment (time and distance) at a discounted per-unit rate. **Step 3:** Note that the discount (20-30% off solo) compensates passengers for accepting additional stops and potential detour, making pooling attractive. Fair carpooling pricing charges each passenger based on their individual travel component (their portion of time and distance) at a discounted per-unit rate compared to solo rides. This ensures a passenger traveling 2 miles pays less than one traveling 10 miles on the same vehicle. The discount (typically 20-30% off solo pricing) compensates passengers for accepting additional stops and potential detour. The total collected across all passengers should at minimum cover the driver's earnings plus Uber's take rate. Equal splitting is unfair to short-distance riders and unattractive to long-distance riders who'd rather take solo trips. This pricing structure is used by Lyft Shared and UberPool.",
      hints: [
        "Should a passenger who rides 1 mile pay the same as one who rides 10 miles in the same vehicle on the same route?",
        "What incentive does the discount from solo pricing provide to passengers to accept additional stops and potential detour?"
      ],
      stepByStep: {
        step1: "Recognize that equal fare splitting is unfair to short-distance riders and unattractive to long-distance riders who would prefer solo trips.",
        step2: "Understand that each passenger should pay based on their individual segment (time and distance) at a discounted per-unit rate.",
        step3: "Note that the discount (20-30% off solo) compensates passengers for accepting additional stops and potential detour, making pooling attractive."
      }
    },
  ],

  "sdi-ride-delivery": [
    {
      id: "q-ride-21",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DoorDash needs to batch multiple restaurant orders for a single Dasher to pick up and deliver sequentially. Which algorithm determines the optimal assignment and delivery sequence?",
      options: [
        "Assign the Dasher to whichever restaurant has the highest-value order; deliver orders in the order they were accepted",
        "Model as a Vehicle Routing Problem (VRP) with time windows: minimize total delivery time while ensuring each order arrives within its promised ETA window, solved with heuristics (e.g., nearest-neighbor insertion, 2-opt)",
        "Always batch orders from the same restaurant regardless of delivery locations; sequence deliveries alphabetically by customer name",
        "Assign only one order per Dasher at a time to avoid any sequencing complexity; prioritize simplicity over efficiency"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that multi-order delivery batching is a Vehicle Routing Problem with Time Windows (VRPTW), minimizing total delivery time while meeting ETA windows. **Step 2:** Understand that VRPTW is NP-hard, so exact solutions are impractical for real-time dispatch at scale. **Step 3:** Know that production systems use heuristics: nearest-neighbor insertion for initial routing, followed by 2-opt local search improvements within a 50-100ms time budget. Multi-order delivery batching is a Vehicle Routing Problem with Time Windows (VRPTW). The objective is to minimize total delivery time (or distance) while satisfying the constraint that each order is delivered within its promised window. Because VRPTW is NP-hard, production systems use polynomial-time heuristics: nearest-neighbor insertion for initial routing, followed by 2-opt or 3-opt local search improvements, run within a time budget (50-100ms). DoorDash uses a similar approach, also incorporating restaurant preparation time into pickup windows. Batching 2-3 orders per Dasher increases efficiency by ~30-40% vs. single-order assignments. Orders from the same restaurant but distant customers still require delivery sequence optimization.",
      hints: [
        "What operations research problem class describes assigning multiple stops to a vehicle with delivery time constraints?",
        "Why is an exact solution to VRPTW impractical for real-time dispatch, requiring heuristic approximations instead?"
      ],
      stepByStep: {
        step1: "Recognize that multi-order delivery batching is a Vehicle Routing Problem with Time Windows (VRPTW), minimizing total delivery time while meeting ETA windows.",
        step2: "Understand that VRPTW is NP-hard, so exact solutions are impractical for real-time dispatch at scale.",
        step3: "Know that production systems use heuristics: nearest-neighbor insertion for initial routing, followed by 2-opt local search improvements within a 50-100ms time budget."
      }
    },
    {
      id: "q-ride-22",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A DoorDash order from a restaurant to a customer requires: (1) restaurant preparation time, (2) Dasher drive to restaurant, (3) pickup wait time at restaurant, (4) drive to customer. Which component typically has the highest variance and most impacts ETA accuracy?",
      options: [
        "Drive to restaurant — highly variable due to traffic",
        "Drive to customer — last-mile delivery is unpredictable",
        "Restaurant preparation time — varies widely by order complexity, restaurant busyness, and kitchen efficiency",
        "Dasher pickup wait time — depends on kitchen readiness and Dasher arrival synchronization"
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Recognize that drive times can be estimated reliably using routing engines with real-time traffic data. **Step 2:** Understand that restaurant preparation time has the highest variance due to order complexity, queue depth, staff performance, and equipment availability. **Step 3:** Conclude that modeling per-restaurant, per-time-of-day preparation times is the #1 lever for improving food delivery ETA accuracy. Restaurant preparation time has the highest variance and is the primary driver of ETA inaccuracy in food delivery. Drive times can be estimated with routing engines using real-time traffic. But kitchen preparation time depends on order complexity (10-item order vs. a simple sandwich), current queue depth (restaurant handling 20 simultaneous orders vs. 2), staff performance, and equipment availability. DoorDash and Instacart extensively instrument and model per-restaurant preparation times using historical data — building per-restaurant, per-time-of-day regression models that predict preparation time and uncertainty bounds. Reducing preparation time variance (via better estimation) is the #1 lever for ETA improvement in food delivery.",
      hints: [
        "Which component is outside the delivery platform's direct control and hardest to predict — kitchen operations or road traffic?",
        "What factors cause one restaurant order to take 8 minutes and another similar order to take 35 minutes?"
      ],
      stepByStep: {
        step1: "Recognize that drive times can be estimated reliably using routing engines with real-time traffic data.",
        step2: "Understand that restaurant preparation time has the highest variance due to order complexity, queue depth, staff performance, and equipment availability.",
        step3: "Conclude that modeling per-restaurant, per-time-of-day preparation times is the #1 lever for improving food delivery ETA accuracy."
      }
    },
    {
      id: "q-ride-23",
      type: "true-false",
      difficulty: "easy",
      question: "Gopuff, which operates dark stores (micro-fulfillment centers), has an inherent delivery ETA advantage over restaurant delivery platforms because preparation time is near-zero — items are pre-packed and ready to pick within 2-3 minutes.",
      correctAnswer: "true",
      explanation: "**Step 1:** Recognize that restaurant preparation time has the highest variance in food delivery — cooking times vary wildly by order and kitchen load. **Step 2:** Understand that dark store items are pre-packaged, so preparation is a constant 2-3 minute mechanical picking operation. **Step 3:** Conclude that eliminating the highest-variance step enables reliable 15-30 minute delivery windows with minimal ETA uncertainty. True. Gopuff's model uses dark stores with pre-packaged SKUs where picking is mechanical and fast (2-3 minutes). Unlike restaurant food, items don't require cooking and preparation time is effectively a constant, low-variance picking operation. This eliminates the highest-variance component of food delivery ETAs, enabling Gopuff to reliably promise 15-30 minute delivery windows. The remaining variance comes from driver availability and last-mile traffic. This structural ETA advantage is a core differentiator of the dark-store/quick-commerce model over restaurant delivery aggregators like DoorDash or Uber Eats.",
      hints: [
        "What is the preparation time for a pre-packed bag of chips at a dark store versus a freshly cooked restaurant meal?",
        "How does eliminating the highest-variance step (restaurant cooking) affect overall ETA predictability?"
      ],
      stepByStep: {
        step1: "Recognize that restaurant preparation time has the highest variance in food delivery — cooking times vary wildly by order and kitchen load.",
        step2: "Understand that dark store items are pre-packaged, so preparation is a constant 2-3 minute mechanical picking operation.",
        step3: "Conclude that eliminating the highest-variance step enables reliable 15-30 minute delivery windows with minimal ETA uncertainty."
      }
    },
  ],

  "sdi-ride-rebalancing": [
    {
      id: "q-ride-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Grab (Southeast Asia) predicts that demand will surge near a stadium after a concert ends in 20 minutes. How should the dispatch system proactively reposition idle drivers?",
      options: [
        "Wait for surge pricing to naturally attract drivers to the area after the concert ends",
        "Send incentive push notifications to idle drivers near the stadium area, but take no direct dispatch action",
        "Use demand forecasting (from historical event data + real-time signals) to compute optimal repositioning destinations, then offer drivers a bonus to move to pre-positioned zones before demand peaks",
        "Route all current in-trip drivers to drop passengers near the stadium regardless of their destinations"
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Recognize that reactive repositioning (waiting for surge) is too late — drivers cannot travel far enough in the 20 minutes before demand peaks. **Step 2:** Understand that ML models trained on historical event patterns predict demand 15-30 minutes ahead, enabling proactive action. **Step 3:** Conclude that offering drivers incentives to move to pre-positioned zones before demand peaks prevents supply gaps and price spikes. Proactive repositioning uses demand forecasting to send idle drivers to anticipated demand zones before the surge occurs, preventing supply gaps and price spikes. Grab and Uber use ML models trained on historical event patterns, venue data, and time-of-day signals to predict demand 15-30 minutes ahead. The system computes optimal repositioning assignments (where to send which idle drivers) using optimization, and offers incentives (bonus per repositioned trip) since drivers sacrifice current positioning. Waiting for reactive surge is too late — drivers can't travel far enough in time. Rerouting in-trip drivers is impractical and harmful to existing passengers. Push notifications without routing guidance are less effective than specific zone targeting.",
      hints: [
        "When is it too late to reposition drivers — before or after demand peaks, and why?",
        "What data does a ride-sharing platform have about recurring demand patterns at event venues, and how is it used for forecasting?"
      ],
      stepByStep: {
        step1: "Recognize that reactive repositioning (waiting for surge) is too late — drivers cannot travel far enough in the 20 minutes before demand peaks.",
        step2: "Understand that ML models trained on historical event patterns predict demand 15-30 minutes ahead, enabling proactive action.",
        step3: "Conclude that offering drivers incentives to move to pre-positioned zones before demand peaks prevents supply gaps and price spikes."
      }
    },
    {
      id: "q-ride-25",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Uber uses H3 (hexagonal hierarchical geospatial indexing) for demand heatmaps. What advantage do hexagonal cells provide over square grid cells for this use case?",
      options: [
        "Hexagons use less memory to store than squares because they have fewer vertices",
        "All six neighbors of a hexagonal cell are equidistant from its center, eliminating directional bias in spatial aggregation and smoothing demand signals",
        "Hexagons can be stored natively in Redis GEORADIUS without custom encoding",
        "Hexagonal cells are required by GPS hardware standards for location reporting"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that in a square grid, diagonal neighbors are sqrt(2) times farther than cardinal neighbors, creating directional bias in spatial aggregation. **Step 2:** Understand that hexagonal cells have all six neighbors equidistant from the center, eliminating this directional bias. **Step 3:** Conclude that this produces smooth, accurate demand gradients rather than axis-aligned artifacts, and H3 provides hierarchical resolution levels for multi-scale analysis. Hexagonal grids have the key property that all six neighboring cells are equidistant from the central cell's centroid (unlike square grids where diagonal neighbors are sqrt(2) farther than cardinal neighbors). This eliminates directional bias in spatial aggregation — spreading demand signals uniformly in all directions. For demand heatmaps, this means a surge event at a cell boundary propagates equally to all adjacent cells, producing smooth, accurate gradients rather than axis-aligned artifacts. Uber's H3 library also provides hierarchical resolution levels (0-15) enabling multi-scale analysis. H3 is a software library, not a Redis primitive or GPS standard.",
      hints: [
        "In a square grid, how far is the diagonal neighbor compared to the cardinal neighbor — and why does this create directional bias?",
        "Why does equal distance to all neighbors matter for aggregating and smoothing demand signals across cell boundaries?"
      ],
      stepByStep: {
        step1: "Recognize that in a square grid, diagonal neighbors are sqrt(2) times farther than cardinal neighbors, creating directional bias in spatial aggregation.",
        step2: "Understand that hexagonal cells have all six neighbors equidistant from the center, eliminating this directional bias.",
        step3: "Conclude that this produces smooth, accurate demand gradients rather than axis-aligned artifacts, and H3 provides hierarchical resolution levels for multi-scale analysis."
      }
    },
  ],

  "sdi-ride-tracking": [
    {
      id: "q-ride-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A rider wants to share their live trip status with family members who are waiting. Which architecture best supports this real-time trip sharing feature?",
      options: [
        "Family members receive a link that polls the Uber API every 5 seconds for the driver's location",
        "A shareable URL resolves to a web page that opens a WebSocket to a trip-sharing service; the service subscribes to driver location updates and pushes them to all connected viewers in real time",
        "The trip status is emailed to family members when the driver is 10 minutes away",
        "Family members must install the Uber app and be added as trusted contacts to view the trip"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that polling approaches add latency and server load when multiple family members independently poll every 5 seconds. **Step 2:** Identify that a pub-sub architecture with WebSocket connections enables the server to push location updates to all connected viewers simultaneously. **Step 3:** Understand that a shareable URL with a unique token allows non-app-users to view real-time trip status via a web page without installation. Real-time trip sharing (as implemented by Uber and Lyft) uses a pub-sub architecture: a shareable URL (with a unique token) serves a web page that connects via WebSocket or Server-Sent Events (SSE) to a trip-sharing service. This service subscribes to driver location updates from the internal location stream, and fans out location updates to all connected viewers. No app installation is required. The architecture scales to many concurrent viewers per trip (family, friends) using a pub-sub fanout. Polling every 5 seconds adds latency and server load. Email notification is not real-time. Requiring app installation creates friction.",
      hints: [
        "How can a system push live driver location to multiple viewers simultaneously without each viewer polling the API?",
        "What architecture enables a shareable URL to provide real-time updates to non-app-users without installation?"
      ],
      stepByStep: {
        step1: "Recognize that polling approaches add latency and server load when multiple family members independently poll every 5 seconds.",
        step2: "Identify that a pub-sub architecture with WebSocket connections enables the server to push location updates to all connected viewers simultaneously.",
        step3: "Understand that a shareable URL with a unique token allows non-app-users to view real-time trip status via a web page without installation."
      }
    },
    {
      id: "q-ride-27",
      type: "multiple-choice",
      difficulty: "hard",
      question: "GPS traces of trips must be stored for dispute resolution (e.g., a rider claims the driver took a wrong route). What is the optimal storage strategy for GPS trace data?",
      options: [
        "Store every raw GPS point (lat/lon/timestamp) in a relational database table indexed by trip_id",
        "Compress GPS traces using the Ramer-Douglas-Peucker (RDP) algorithm to reduce point density while preserving route shape, store as an encoded polyline in an object store (S3), and keep metadata in a relational DB",
        "Discard GPS traces after trip completion since the route can be reconstructed from the start/end points",
        "Store only the first and last GPS coordinates with the total distance driven"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that storing ~1,800 raw GPS points per 30-minute trip is expensive at scale — compression is necessary. **Step 2:** Identify that Ramer-Douglas-Peucker (RDP) reduces point count by 70-90% while preserving route fidelity for visual inspection. **Step 3:** Understand that compressed traces store efficiently in S3 (cheap object storage) while metadata stays in a relational DB with a pointer to S3. GPS traces for a 30-minute trip at 1 Hz generate ~1,800 raw points — storing all raw points at scale is expensive. The Ramer-Douglas-Peucker algorithm simplifies polylines by removing points that deviate less than epsilon from the simplified line, reducing point count by 70-90% while preserving route fidelity for visual inspection. The compressed trace is stored as an encoded polyline in S3 (cheap, durable object storage). Trip metadata (trip_id, timestamps, fare, driver_id) is stored in a relational DB with a pointer to the S3 object. This enables dispute resolution (replay the route visually), ML training data for ETA models, and audit compliance at manageable storage cost.",
      hints: [
        "What algorithm simplifies a GPS polyline by removing redundant collinear points while preserving route shape?",
        "Which storage tier is cost-optimal for large binary objects like compressed GPS traces — and which for metadata?"
      ],
      stepByStep: {
        step1: "Recognize that storing ~1,800 raw GPS points per 30-minute trip is expensive at scale — compression is necessary.",
        step2: "Identify that Ramer-Douglas-Peucker (RDP) reduces point count by 70-90% while preserving route fidelity for visual inspection.",
        step3: "Understand that compressed traces store efficiently in S3 (cheap object storage) while metadata stays in a relational DB with a pointer to S3."
      }
    },
  ],

  "sdi-ride-safety": [
    {
      id: "q-ride-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Uber's safety feature detects a potential accident during a trip using phone accelerometer data and sends a check-in notification. If the user does not respond within 60 seconds, what should the system do?",
      options: [
        "Automatically end the trip and charge the fare to that point",
        "Contact the driver via in-app call to ask if they are okay",
        "Automatically share the trip details (current GPS location, driver info, trip ID) with the rider's emergency contacts and optionally connect to emergency services (911)",
        "Alert a human safety agent at Uber to manually review the trip and call the rider"
      ],
      correctAnswer: 2,
      explanation: "**Step 1:** Recognize that if a user is unconscious from a crash, they cannot respond to a check-in — emergency contacts and services must be notified automatically. **Step 2:** Understand that human agents cannot scale to handle all potential incidents instantly — automation is critical for time-sensitive emergencies. **Step 3:** Conclude that the system should automatically share GPS location and trip details with emergency contacts and optionally connect to 911. Uber's RideCheck feature uses the phone's accelerometer and gyroscope to detect anomalies consistent with a crash (sudden deceleration exceeding a g-force threshold). Upon detection, a check-in prompt is sent. If unanswered within 60 seconds, the system automatically: (1) shares current GPS location and trip/driver details with emergency contacts (via SMS), (2) optionally connects to local emergency services with the trip details via ADT's monitoring service. Human agents cannot scale to handle all potential incidents instantly — automated escalation is critical for time-sensitive emergencies. Ending the trip or calling the driver fails to address the rider's safety. The 60-second timeout balances false-positive rates against response time.",
      hints: [
        "Who needs to be notified if someone is unconscious and cannot respond to a check-in — and why is automation necessary?",
        "Why can't human safety agents scale to handle all potential crash incidents instantly, requiring automated escalation?"
      ],
      stepByStep: {
        step1: "Recognize that if a user is unconscious from a crash, they cannot respond to a check-in — emergency contacts and services must be notified automatically.",
        step2: "Understand that human agents cannot scale to handle all potential incidents instantly — automation is critical for time-sensitive emergencies.",
        step3: "Conclude that the system should automatically share GPS location and trip details with emergency contacts and optionally connect to 911."
      }
    },
    {
      id: "q-ride-29",
      type: "true-false",
      difficulty: "easy",
      question: "Uber's two-sided rating system (riders rate drivers, drivers rate riders) should show each party's rating to the other before both have submitted their rating to prevent anchoring bias.",
      correctAnswer: "false",
      explanation: "**Step 1:** Recognize that anchoring bias occurs when a rider who sees they received 3 stars from the driver retaliates with a lower rating. **Step 2:** Understand that ratings must be collected independently before either party sees the other's rating to prevent this bias. **Step 3:** Know that blind simultaneous reveal (both submit before either sees) produces more honest, independent ratings — also used in academic peer review. False. Ratings should be collected independently before either party sees the other's rating. Showing the driver's rating before the rider submits creates anchoring bias — a rider who sees they received 3 stars from the driver may retaliate with a lower rating. Both Uber and Lyft use a blind simultaneous reveal: both parties submit ratings before either is shown the result (or ratings are revealed after a timeout regardless of whether both submit). This produces more honest, independent ratings. The blind model is also used in academic peer review and diplomatic negotiations for the same reason.",
      hints: [
        "What is anchoring bias in rating systems, and how does seeing the other party's rating before submitting affect your own rating?",
        "How does blind peer review in academia prevent this same bias — and why is simultaneous reveal important?"
      ],
      stepByStep: {
        step1: "Recognize that anchoring bias occurs when a rider who sees they received 3 stars from the driver retaliates with a lower rating.",
        step2: "Understand that ratings must be collected independently before either party sees the other's rating to prevent this bias.",
        step3: "Know that blind simultaneous reveal (both submit before either sees) produces more honest, independent ratings — also used in academic peer review."
      }
    },
  ],

  "sdi-ride-infrastructure": [
    {
      id: "q-ride-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Uber operates in 70+ cities globally. Which architectural pattern best provides city-level service isolation (so a Sao Paulo outage does not affect London) while supporting cross-city features like airport rides that begin in one city zone and end in another?",
      options: [
        "A single global monolith with city as a database partition key; all services share one codebase and deployment",
        "Fully independent city-level microservice stacks deployed per city, with a global API gateway that routes requests by city; cross-city trips are handled by a federated trip service that spans both city stacks",
        "City data is sharded by geohash in a single global Kubernetes cluster, with no service-level isolation between cities",
        "Each city runs on the same shared services but with separate database schemas, isolated by application-level city_id filtering"
      ],
      correctAnswer: 1,
      explanation: "**Step 1:** Recognize that a single global monolith or shared services create a single point of failure — one city's outage cascades to all others. **Step 2:** Identify that independent city-level microservice deployments with circuit breakers provide fault isolation between cities. **Step 3:** Understand that cross-city trips require a federated trip service to coordinate handoffs between city stacks while maintaining isolation benefits. Uber's architecture uses city-level service isolation: dispatch, matching, and surge services are deployed per city (or per region) so that a failure in Sao Paulo does not cascade to London. This is achieved via independent deployments (separate Kubernetes namespaces or clusters per region), city-level data sharding, and circuit breakers between cities. A global API gateway routes rider/driver requests to the correct city stack based on geolocation. Cross-city trips (airport rides that cross city zone boundaries) are handled by a federated trip service that coordinates handoffs between city stacks. A single global monolith creates a single point of failure. Database-schema-only isolation provides no service-level fault boundaries.",
      hints: [
        "How do you prevent a service failure in one city from cascading to another — through shared services or isolated deployments?",
        "When a trip starts in city A and ends in city B, what mediates the handoff between city stacks?"
      ],
      stepByStep: {
        step1: "Recognize that a single global monolith or shared services create a single point of failure — one city's outage cascades to all others.",
        step2: "Identify that independent city-level microservice deployments with circuit breakers provide fault isolation between cities.",
        step3: "Understand that cross-city trips require a federated trip service to coordinate handoffs between city stacks while maintaining isolation benefits."
      }
    },
  ],
};

registerQuestions(questions);

export default questions;
