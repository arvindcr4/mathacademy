import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-maps-routing": [
    {
      id: "q-maps-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the key advantage of A* over Dijkstra's algorithm for point-to-point routing on a road network?",
      options: [
        "A* guarantees a shorter path than Dijkstra on weighted graphs",
        "A* uses a heuristic to guide the search toward the destination, reducing the number of nodes explored",
        "A* works on graphs with negative edge weights; Dijkstra does not",
        "A* requires no preprocessing whereas Dijkstra requires a sorted adjacency list"
      ],
      correctAnswer: 1,
      explanation: "A* extends Dijkstra by adding a heuristic function h(n) that estimates the remaining cost from node n to the goal. As long as the heuristic is admissible (never overestimates), A* is optimal but explores far fewer nodes than Dijkstra. For geographic routing, straight-line Euclidean distance is a classic admissible heuristic. Bidirectional A* — running two simultaneous searches from source and destination — further cuts the search space roughly in half, which is critical for continental-scale road graphs with hundreds of millions of nodes.",
      hints: [
        "An admissible heuristic never overestimates the true remaining cost — what does that guarantee about the first path found?",
        "Think about why Dijkstra explores nodes in all directions uniformly while A* focuses toward the goal."
      ],
    },
    {
      id: "q-maps-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Contraction Hierarchies (CH) dramatically speed up shortest-path queries on road networks. Which statement best describes the CH preprocessing step?",
      options: [
        "CH partitions the graph into tiles and computes shortest paths within each tile independently",
        "CH iteratively removes ('contracts') each node and adds shortcut edges between its neighbors so shortest paths are preserved without routing through the contracted node",
        "CH replaces all edge weights with integer ranks and applies radix sort before each query",
        "CH computes a full all-pairs shortest path table that is compressed with delta encoding"
      ],
      correctAnswer: 1,
      explanation: "During CH preprocessing, nodes are ordered by 'importance' (e.g., edge difference — how many shortcuts must be added vs. edges removed). Nodes are contracted from least to most important: when a node u is contracted, a shortcut edge (v, w) is added for every pair of neighbors (v, w) where the shortest path from v to w passes through u. The resulting augmented graph allows bidirectional Dijkstra to run only on upward edges (toward more important nodes), dramatically pruning the search. A well-preprocessed CH reduces query time from seconds to microseconds on large road graphs — the technique underpins Google Maps, HERE, and OSRM routing engines.",
      hints: [
        "After contraction, a query only needs to traverse edges toward higher-importance nodes in each direction — why does this prune so aggressively?",
        "The preprocessing phase can take minutes or hours but query time becomes sub-millisecond — classic preprocessing vs. query-time tradeoff."
      ],
    },
    {
      id: "q-maps-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "For multi-modal routing combining transit, walking, and driving legs, which algorithm is most appropriate for the transit portion?",
      options: [
        "Dijkstra with time-expanded graph nodes for each departure event",
        "RAPTOR (Round-based Public Transit Optimized Router), which finds Pareto-optimal journeys in rounds by scanning route trips",
        "Bellman-Ford to handle negative wait-time edges at transit stops",
        "Floyd-Warshall precomputed on the transit schedule matrix"
      ],
      correctAnswer: 1,
      explanation: "RAPTOR (published by Microsoft Research) operates on a timetable rather than a weighted graph. Each round represents one additional transit vehicle boarded. In each round, the algorithm scans all routes that serve stops reachable from the previous round, updating earliest arrival times. It naturally produces Pareto-optimal journeys (fewest transfers vs. earliest arrival) without a time-expanded graph, which would be enormous for large transit networks. For multi-modal routing, RAPTOR handles the transit component while A* or CH handles driving/walking legs, with connection points at park-and-ride or transit stop nodes.",
      hints: [
        "RAPTOR's 'rounds' directly correspond to the number of transfers — the first round finds journeys with 0 transfers, the second round finds those with 1 transfer, etc.",
        "A time-expanded graph creates a node for every (stop, departure time) pair — this can be millions of nodes for a large city's schedule."
      ],
    },
  ],

  "sdi-maps-spatial-indexing": [
    {
      id: "q-maps-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A location service needs to find all drivers within 5 km of a rider. Which spatial indexing approach does Google's S2 library use that makes it well-suited for this query?",
      options: [
        "S2 projects Earth onto a cube, subdivides each face recursively into cells via a Hilbert curve, giving cells with globally unique 64-bit IDs and predictable area",
        "S2 uses geohash base-32 strings where longer prefixes represent smaller regions",
        "S2 stores coordinates in a kd-tree that partitions alternating longitude and latitude dimensions",
        "S2 indexes points in a PostGIS R-tree where bounding boxes are used for range queries"
      ],
      correctAnswer: 0,
      explanation: "Google's S2 library maps the sphere to a unit cube (6 faces), then subdivides each face with a quadtree refined by a Hilbert space-filling curve. This gives each cell a 64-bit integer ID where the prefix encodes the level (hierarchy). Nearby cells on the Hilbert curve tend to be geographically close, making range queries efficient: a proximity query becomes a set of cell range queries on a sorted index. S2 also preserves area more uniformly than Mercator-based geohash (geohash cells vary significantly in size near poles). Uber, Google Maps, and Lyft all use S2 or similar hierarchical approaches for driver-rider matching at scale.",
      hints: [
        "The Hilbert curve property means cells that are close in the 1D integer ordering tend to be close geographically — how does that help database range scans?",
        "Compare to geohash: both are hierarchical, but S2 uses a sphere-to-cube projection instead of a Mercator grid."
      ],
    },
    {
      id: "q-maps-5",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is a geohash and what is its primary weakness for proximity queries near cell boundaries?",
      options: [
        "A geohash is a base-32 encoded string representing a rectangular cell; its weakness is that two points very close together can have geohash strings that share no common prefix if they fall in adjacent cells",
        "A geohash is a cryptographic hash of GPS coordinates used to anonymize location data",
        "A geohash encodes altitude alongside latitude and longitude; its weakness is ignoring 2D proximity",
        "A geohash maps coordinates to a UUID; its weakness is non-determinism"
      ],
      correctAnswer: 0,
      explanation: "A geohash encodes a geographic point as a base-32 string by interleaving the binary representations of latitude and longitude bits. Longer strings = smaller cells (higher precision). Hierarchically, all points within a cell share the same prefix, enabling prefix-scan queries in a database. However, two points mere meters apart can have completely different geohash prefixes if they lie in adjacent top-level cells — for example, across the boundary between cells 'u09t' and 'u09v'. The workaround is to query the target cell AND all 8 neighboring cells, which is a standard pattern but adds complexity.",
      hints: [
        "Draw two adjacent geohash cells — a point near the shared border is in only one of them, yet a point in the neighboring cell may be closer than many points in the same cell.",
        "How many neighboring cells does a geohash cell have? Querying all of them handles the boundary problem."
      ],
    },
    {
      id: "q-maps-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A ride-sharing system must find the nearest available driver to a rider in real time with thousands of location updates per second. Which architecture best handles this at Uber scale?",
      options: [
        "Store all driver locations in PostgreSQL with PostGIS; use ST_DWithin for each rider request",
        "Partition drivers by S2 cell at a chosen level; maintain an in-memory spatial index (e.g., geohash ring) per cell shard; fan out rider requests to relevant cell shards and merge results",
        "Broadcast every driver location update to all rider-facing servers so each server maintains a full replica for local lookup",
        "Use a graph database where driver nodes are connected to road segment nodes; traverse edges for proximity"
      ],
      correctAnswer: 1,
      explanation: "At Uber's scale (millions of drivers globally), a single database for all location lookups becomes a bottleneck. The solution is to shard by spatial region (e.g., S2 cells at a fixed level like L7 or L8, which produce cells of ~5–20 km diameter). Each shard owns a subset of cells and maintains an in-memory spatial index of current driver locations within its cells. A rider request is routed to the 1–4 relevant cell shards (accounting for cell borders), each returns its nearest drivers, and results are merged. Uber's Ringpop and location service used variants of this pattern. In-memory indexes (skip lists, kd-trees, or geohash maps) give sub-millisecond lookup vs. disk-based PostGIS which adds I/O latency.",
      hints: [
        "Sharding by geography bounds how much state any single server needs to track — what determines the right cell level to shard at?",
        "Near cell borders a rider may need drivers in adjacent shards — how many shards do you query at most?"
      ],
    },
  ],

  "sdi-maps-tiles": [
    {
      id: "q-maps-7",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In the standard web map tile system (TMS/XYZ), how many tiles exist at zoom level z?",
      options: [
        "2^z tiles",
        "4^z tiles (2^z x 2^z grid)",
        "z^2 tiles",
        "256 x z tiles"
      ],
      correctAnswer: 1,
      explanation: "The web tile system recursively subdivides the world map: at zoom level 0 there is 1 tile (the whole world), at zoom level 1 there are 4 tiles (2x2 grid), at zoom level 2 there are 16 tiles (4x4 grid), and so on. Each zoom level doubles the number of tiles in each axis, so zoom level z has 2^z x 2^z = 4^z total tiles. Each tile is a 256x256 pixel image (raster) or a vector data bundle. At zoom 20 (city block detail), there are over 1 trillion tiles — serving them all on demand requires aggressive caching, CDNs, and on-the-fly generation for vector tiles.",
      hints: [
        "At zoom 0: 1 tile. At zoom 1: 4 tiles. At zoom 2: 16 tiles. What's the pattern?",
        "Each zoom level doubles resolution in both x and y — so total tiles multiply by 4 each level."
      ],
    },
    {
      id: "q-maps-8",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the primary advantage of vector tiles over raster tiles for a mapping application?",
      options: [
        "Vector tiles are pre-rendered images that load faster on low-bandwidth connections",
        "Vector tiles contain geometric data (points, lines, polygons) and attributes that can be styled client-side, enabling smooth zoom animation, dynamic restyling, and smaller file sizes at high zoom",
        "Vector tiles eliminate the need for a CDN because they are generated server-side on every request",
        "Vector tiles use PNG compression which achieves 10x smaller file size than GeoJSON"
      ],
      correctAnswer: 1,
      explanation: "Raster tiles are pre-rendered PNG/JPEG images baked at specific zoom levels — they look pixelated between zoom levels and cannot be restyled without server-side re-rendering. Vector tiles (e.g., Mapbox Vector Tile format, Protocol Buffers encoded) contain the raw geometry and attributes. The client (WebGL renderer like Mapbox GL JS) renders them at any zoom level without pixelation and can apply arbitrary styles (dark mode, color-blind-friendly palettes) in real time without fetching new tiles. Vector tiles are also typically much smaller than raster equivalents for the same area and detail level. Google Maps switched to vector tiles on mobile around 2013, reducing data usage by 40%.",
      hints: [
        "With raster tiles, switching from a 'day' to 'night' style requires pre-generating an entirely new tileset — how do vector tiles avoid this?",
        "Smooth fractional zoom (e.g., zoom 14.7) is trivial with vector tiles rendered by WebGL — why is it jerky with raster tiles?"
      ],
    },
    {
      id: "q-maps-9",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A map tile CDN serves billions of tile requests per day. A team notices cache hit rates drop significantly for new users opening the app for the first time. What technique best addresses this cold-start tile loading problem?",
      options: [
        "Pre-warm the CDN by proactively pushing all zoom level 0–6 tiles to edge nodes and use predictive pre-fetching for likely viewport tiles based on the user's detected city",
        "Increase CDN cache TTL from 24 hours to 30 days for all tiles",
        "Disable CDN and serve all tiles from origin to ensure consistency",
        "Switch from vector tiles to raster tiles so tiles can be cached in browser localStorage"
      ],
      correctAnswer: 0,
      explanation: "Cold-start tile loading is a common problem: the user opens the app, the CDN has no cached tiles for that edge PoP for their city, and requests waterfall to origin. The solution is two-pronged: (1) Proactive CDN warming — push the most-requested low-zoom tiles (zoom 0–6 cover the whole world in only 1,365 tiles) to all edge nodes, so global context tiles are always cached; and (2) Predictive pre-fetching — when a user's location or city is known at app open (via IP geolocation or stored profile), pre-request the tiles for their likely initial viewport before the map renders. Google Maps mobile prefetches surrounding tiles as the user pans. Combined with HTTP/2 multiplexing (many tile requests in one connection) and tile bundling, first-render latency drops dramatically.",
      hints: [
        "How many tiles cover the entire world at zoom levels 0–6? The total is surprisingly small — pre-warming them is feasible.",
        "Pre-fetching based on detected city means the CDN already has the tiles by the time the user opens the map view."
      ],
    },
  ],

  "sdi-maps-traffic": [
    {
      id: "q-maps-10",
      type: "multiple-choice",
      difficulty: "medium",
      question: "How does Google Maps collect real-time traffic speed data from its users, and what is the main privacy challenge with this approach?",
      options: [
        "Google Maps queries traffic sensors installed at every intersection; the challenge is sensor maintenance cost",
        "Google Maps anonymously collects GPS probe data (speed and location) from opted-in Android/Maps users; the challenge is that even anonymized location traces can re-identify individuals via home/work inference",
        "Google Maps scrapes traffic data from government transportation APIs; the challenge is API rate limits",
        "Google Maps uses computer vision on satellite feeds to count vehicles per road segment"
      ],
      correctAnswer: 1,
      explanation: "GPS probe data (also called 'floating car data') is the dominant source of real-time traffic intelligence for Google Maps, Apple Maps, HERE, and TomTom. Opted-in users' anonymized speed and position readings are aggregated per road segment to compute current speed vs. free-flow speed, generating the green/yellow/red traffic layer. The privacy challenge is significant: even with location anonymization, frequent location samples can reveal home address (where the device is at night) and work address (where it is on weekdays), enabling re-identification. Mitigations include differential privacy noise injection, minimum cohort sizes (never report from < N users on a segment), and on-device speed aggregation before uploading.",
      hints: [
        "If you see a blue dot moving at 5 mph on a highway that usually flows at 65 mph, what does that tell you about traffic — and about that user's route?",
        "Research by de Montjoye et al. showed 4 spatiotemporal points are enough to uniquely identify 95% of individuals in mobility datasets."
      ],
    },
    {
      id: "q-maps-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A real-time traffic ingestion pipeline receives GPS pings from 10 million vehicles every 30 seconds. Which processing architecture best handles map-matching these raw traces to road segments at this throughput?",
      options: [
        "Load all GPS pings into a relational database; run a nightly batch SQL join against the road network table",
        "Use a streaming pipeline (e.g., Kafka + Flink) where each GPS ping is map-matched to the nearest road segment in parallel, keyed by vehicle ID to maintain state for HMM-based sequential matching, and aggregated per segment with exponential smoothing",
        "Use a serverless function per vehicle that polls a REST API for the nearest road segment",
        "Accumulate pings in an S3 data lake and run MapReduce jobs every hour to compute segment speeds"
      ],
      correctAnswer: 1,
      explanation: "10 million vehicles x 2 pings/minute = ~333,000 events/second, which rules out batch approaches with multi-minute latency. A streaming architecture is required: Kafka ingests raw pings, Flink processes them in real time. Keying by vehicle ID is critical because Hidden Markov Model (HMM) map-matching is sequential — it uses the previous matched road segment to constrain which segments are candidates for the current ping, dramatically reducing false matches on parallel roads or GPS multipath errors. After map-matching, segment-level speed readings are aggregated using exponential weighted moving average (EWMA) to smooth noise while reacting quickly to changes. The result is published to a speed map service consumed by the routing engine. This is architecturally similar to Uber's real-time data platform and HERE's traffic pipeline.",
      hints: [
        "Why must map-matching be keyed per vehicle? Because the previous position constrains which road the vehicle is currently on — a stateless approach would match each ping independently with far more errors.",
        "Exponential smoothing on segment speed: new_speed = α x observed_speed + (1-α) x previous_speed. What does a high α value mean for responsiveness vs. noise?"
      ],
    },
    {
      id: "q-maps-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the Hidden Markov Model (HMM) used for in GPS map-matching, and what do its states and observations represent?",
      options: [
        "States are road segments; observations are raw GPS coordinates; the HMM finds the most likely sequence of road segments a vehicle traveled given the noisy GPS trace",
        "States are vehicle speeds; observations are traffic light states; the HMM predicts the next speed",
        "States are satellite counts; observations are GPS accuracy circles; the HMM filters satellite noise",
        "States are zip codes; observations are ping frequencies; the HMM classifies trip purpose"
      ],
      correctAnswer: 0,
      explanation: "In GPS map-matching, the true road segment a vehicle is on is hidden (the GPS coordinate is noisy and may not point exactly to a road). The HMM models: emission probability — how likely is a GPS observation given the vehicle is on road segment s (based on perpendicular distance from GPS to road); transition probability — how likely is it to transition from segment s1 to segment s2 (based on shortest path distance between them). The Viterbi algorithm then finds the single most likely sequence of road segments (states) that produced the observed GPS trace. This elegantly handles GPS multipath errors, tunnels, and parallel roads by using sequential context, unlike naive nearest-neighbor snapping.",
      hints: [
        "Why is nearest-neighbor snapping (always snap to the closest road) insufficient? Think about a GPS point equidistant between a highway and a parallel side street.",
        "Viterbi decoding considers the entire sequence of observations jointly — a point that looks ambiguous alone becomes clear when you know the vehicle came from and is going to specific segments."
      ],
    },
  ],

  "sdi-maps-eta": [
    {
      id: "q-maps-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Which set of features would most improve an ML model predicting ETA (estimated time of arrival) for a driving route?",
      options: [
        "User's device battery level, screen brightness, and app version",
        "Real-time segment speeds, historical speed distributions by time-of-day and day-of-week, route distance, number of turns, traffic signal density, and weather conditions",
        "User's ride history count and average rating",
        "Map tile zoom level and render time for the current viewport"
      ],
      correctAnswer: 1,
      explanation: "ETA prediction requires modeling travel time across individual road segments, so the most predictive features are segment-level: current speed (from real-time traffic), historical speed distributions (captures rush hour patterns, school zones, etc.), and structural route properties (distance, turn count, signal density — left turns cause longer delays in right-hand-traffic countries). Day-of-week and time-of-day features encode cyclical traffic patterns. Weather (rain, snow) degrades speeds significantly. Google Maps and Uber use gradient boosted trees or deep learning models (DeepETA at Uber) trained on millions of historical trips. Modern systems also apply real-time correction factors: if the first 10% of a trip took 20% longer than predicted, the remaining ETA is scaled up accordingly.",
      hints: [
        "ETA = sum of travel times across segments. What features predict travel time on a single segment?",
        "Historical data tells you what speeds are typical at this time/day; real-time data tells you what's happening right now — both matter."
      ],
    },
    {
      id: "q-maps-14",
      type: "true-false",
      difficulty: "easy",
      question: "ETA prediction should rely only on real-time traffic data and ignore historical patterns, because current conditions always dominate travel time.",
      correctAnswer: "False",
      explanation: "Both real-time and historical data are essential. Real-time traffic captures current incidents, accidents, and congestion. Historical data provides baseline speed distributions for each segment by time-of-day and day-of-week, which is critical when real-time probe data is sparse (e.g., rural roads, late-night hours). For example, a road might have no current probe data at 2 AM — historical data tells the model the road is typically fast at that hour. Google Maps explicitly blends historical and real-time data, using Bayesian updating: start with a historical prior, then update with real-time observations as they arrive.",
      hints: [
        "What happens on a rural road with only 3 probe vehicles in the last 10 minutes — is that real-time sample reliable?",
        "Historical data also captures recurring patterns like school zone slowdowns at 8 AM that real-time data might not yet show."
      ],
    },
  ],

  "sdi-maps-geocoding": [
    {
      id: "q-maps-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A geocoding system must match the user-typed address '123 Mian St, San Fransico, CA' to a canonical address and coordinates. Which pipeline steps are required?",
      options: [
        "Parse the raw string, normalize abbreviations and fix typos (address normalization + fuzzy matching), tokenize into structured components (number, street, city, state, zip), then query a spatial index for the best candidate, and return the highest-scored match",
        "Run the address through SHA-256 and look up the hash in a key-value store",
        "Send the raw string to a GPS satellite API that returns coordinates directly",
        "Split on commas, convert each token to an integer, and compute a bounding box"
      ],
      correctAnswer: 0,
      explanation: "Robust geocoding requires a multi-stage pipeline: (1) Tokenization — segment the raw string into structured fields (house number, pre-direction, street name, suffix, city, state, ZIP). (2) Normalization — expand abbreviations ('St' -> 'Street', 'CA' -> 'California') and standardize casing. (3) Fuzzy matching — use edit distance (Levenshtein) or phonetic algorithms (Soundex, Double Metaphone) to handle typos like 'Mian' -> 'Main' and 'Fransico' -> 'Francisco'. (4) Candidate retrieval — query a spatial/inverted index of known addresses (from USPS, OpenAddresses, proprietary data). (5) Scoring and ranking — weight matches by address component confidence and geographic plausibility (e.g., does the ZIP code match the city?). Google Maps Geocoding API and HERE Geocoder all follow this architecture.",
      hints: [
        "How would a naive exact-string match handle the typos 'Mian' and 'Fransico'? It would fail entirely — fuzzy matching is essential.",
        "Reverse geocoding (coordinates -> address) is the inverse: find the nearest known address or road segment to the given lat/lng."
      ],
    },
    {
      id: "q-maps-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A global geocoding system must handle addresses from 100+ countries with different address formats (Japan: prefecture/city/ward/block/lot, Germany: Strasse/Hausnummer, US: number/street/city/state/zip). What is the best architectural approach?",
      options: [
        "Build a single universal parser with a fixed field order that maps all country formats to US-style fields",
        "Use country-specific parsing rules and normalization dictionaries, with a country-detection step (from IP or explicit country code) to route input to the correct parser, then merge into a canonical internal representation for indexing",
        "Require all users to enter addresses in English US format and reject non-conforming input",
        "Store addresses as unstructured blobs and use only character-level n-gram similarity for all matching"
      ],
      correctAnswer: 1,
      explanation: "Address formats are highly country-specific: Japan uses a top-down hierarchy (prefecture -> city -> ward -> block -> lot number) that is completely inverted from the US bottom-up style (number -> street -> city -> state). Germany has no ZIP+4, France uses cedex codes, and many countries lack street names entirely (relying on what3words or plus codes). The correct architecture is: (1) Detect country from an explicit field or IP-based geolocation. (2) Route to a country-specific parser with locale-aware tokenization rules (e.g., Japanese requires kanji/kana normalization). (3) Normalize into a canonical internal schema with typed fields. (4) Query country-partitioned indexes to limit search space. This is how the Google Maps Geocoding API and HERE Geocoder handle global addresses — each country is a separate normalization config.",
      hints: [
        "In Japan, '東京都渋谷区恵比寿1丁目' is a perfectly valid address — can a US-style street parser handle that?",
        "Country partitioning of the index also helps performance: you only search addresses within the relevant country, not globally."
      ],
    },
  ],

  "sdi-maps-places": [
    {
      id: "q-maps-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user searches 'coffee near me' in Google Maps. Which components of the Places search pipeline contribute to ranking the results?",
      options: [
        "Only straight-line distance from the user — the nearest coffee shop ranks first",
        "A combination of relevance (text match to business name/category), proximity (travel time or distance), prominence (review count, rating, business popularity signals), and personalization (user's past visits and preferences)",
        "Only the business's advertising spend — paid listings rank first",
        "Only review count — the most-reviewed coffee shop globally ranks first"
      ],
      correctAnswer: 1,
      explanation: "Google Maps place ranking is a multi-factor model combining: (1) Relevance — does the business match 'coffee'? This uses the POI's category tags (cafe, coffee shop), name, and description against an inverted index. (2) Proximity — how far or how long to travel there? Travel time is better than straight-line distance because a 500m walk may take longer than a 2km drive. (3) Prominence — higher-rated, more-reviewed, and more-linked businesses (web signals) rank higher, similar to PageRank. (4) Personalization — Google uses past search history, saved places, and demographic signals. (5) Real-time signals — is the place currently open? This multi-factor ranking is why a slightly further coffee shop with thousands of excellent reviews often ranks above a closer one with no reviews.",
      hints: [
        "If distance were the only factor, a closed coffee shop 50m away would beat an excellent open one 500m away — why is this wrong?",
        "Prominence is essentially a business quality score: review count x recency x rating + web mentions + claimed/verified status."
      ],
    },
    {
      id: "q-maps-18",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What data structure is most commonly used to index Points of Interest (POIs) for fast proximity queries like 'find all restaurants within 1 km'?",
      options: [
        "A balanced binary search tree (AVL tree) on latitude only",
        "A spatial index such as an R-tree, quadtree, or geohash-bucketed inverted index that organizes POIs by geographic region for efficient range queries",
        "A hash map from POI ID to coordinates with linear scan for proximity",
        "A trie indexed on POI name for fast prefix search"
      ],
      correctAnswer: 1,
      explanation: "Proximity queries require a spatial index that avoids scanning all POIs. R-trees (the standard in PostGIS, Elasticsearch geo_distance queries, and SQLite with SpatiaLite) organize POIs into nested bounding rectangles, pruning branches whose bounding box doesn't intersect the query radius. Quadtrees recursively subdivide space into four quadrants. Geohash bucketing maps POIs to a cell string and stores them in a sorted key-value store, enabling prefix scans. All three achieve O(log n + k) query time (k = results) vs. O(n) for linear scan. Elasticsearch's geo_distance filter, which powers many map applications, uses a quad-tree internally combined with an inverted index for category filtering.",
      hints: [
        "Why can't a 1D BST on latitude alone answer '1 km radius' queries correctly?",
        "R-tree 'prunes' branches whose bounding box doesn't intersect the query circle — this is the key to sub-linear query time."
      ],
    },
  ],

  "sdi-maps-navigation": [
    {
      id: "q-maps-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "During turn-by-turn navigation, when should a navigation app trigger an automatic reroute?",
      options: [
        "Every 30 seconds regardless of route adherence, to ensure freshest traffic data",
        "Only when the user explicitly taps 'Reroute' in the UI",
        "When the user deviates from the planned route (detected via GPS position vs. route corridor) AND a faster alternative exists given current traffic conditions",
        "When the GPS signal drops below 4 satellites"
      ],
      correctAnswer: 2,
      explanation: "Rerouting has two necessary conditions: (1) Off-route detection — the user's current position falls outside a corridor around the planned route (typically a few hundred meters). This is detected by comparing the map-matched road segment to the expected segment on the route. GPS noise requires a threshold to avoid false triggers (e.g., momentarily showing the user 50m off-route on a bridge). (2) Better alternative exists — simply being off-route doesn't mandate rerouting; the app must compare the ETA via current position back to the original route vs. ETA via the best alternative. If the detour saves more than a threshold (e.g., 2 minutes), reroute. This prevents annoying micro-reroutes when the user just takes a legal shortcut. Google Maps and Waze implement both conditions with hysteresis to prevent reroute loops.",
      hints: [
        "Without condition 2, a user who takes a faster shortcut would always be rerouted back to the 'correct' route — that's a bad UX.",
        "Hysteresis: once a reroute is triggered, don't trigger another for at least N seconds to prevent oscillation."
      ],
    },
    {
      id: "q-maps-20",
      type: "multiple-choice",
      difficulty: "easy",
      question: "How does a navigation app generate human-readable turn instructions like 'In 500 meters, turn right onto Oak Avenue' from a routing graph path?",
      options: [
        "The server sends raw lat/lng waypoints and the client uses text-to-speech to read the coordinates aloud",
        "Each edge in the routing graph has a pre-stored instruction string that is looked up during route computation",
        "The instruction generation module analyzes consecutive edge pairs on the path: it computes the turn angle, identifies the maneuver type (straight/turn/U-turn/merge/roundabout), retrieves the road name of the next segment, and calculates the trigger distance",
        "Instructions are generated only by querying the user's real-time position — the system cannot pre-compute them"
      ],
      correctAnswer: 2,
      explanation: "Turn instruction generation (also called maneuver extraction) is a post-processing step on the computed path. For each node in the path, the system examines the incoming edge direction and outgoing edge direction: the angle between them determines the maneuver type (straight, slight right, right, sharp right, U-turn, etc.). The name of the next edge gives the road name. Distance to the maneuver is computed from the current position along the route. Special cases require additional logic: roundabouts (count exits), highway on/off ramps (use road numbering), merges (indicate lane), and destination arrival (building-side detection). OSRM, Valhalla, and GraphHopper all have open-source instruction generation modules that handle 50+ maneuver types across 30+ languages.",
      hints: [
        "Two edges meeting at a node: if the bearing changes by 45–135 degrees clockwise, that's a right turn. What determines how far in advance to announce it?",
        "Speed matters for announcement distance — at highway speeds you announce 1 km ahead, at walking speed you announce 50 m ahead."
      ],
    },
  ],

  "sdi-maps-offline": [
    {
      id: "q-maps-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user downloads an offline map region for a road trip. Six months later, new roads have been added. What is the most bandwidth-efficient way to update their offline map?",
      options: [
        "Re-download the entire region from scratch on a monthly schedule",
        "Use delta/diff updates: compute the binary diff between the old and new vector tile versions per tile, and only transmit tiles whose content has changed along with the diff, so unchanged tiles use zero bandwidth",
        "Require the user to re-install the app to get the latest map data",
        "Push all tile updates via push notification payload, which is limited to 4 KB each"
      ],
      correctAnswer: 1,
      explanation: "Delta downloads (incremental map updates) are essential for offline map usability. The server maintains versioned tile data and can compute binary diffs (using algorithms like bsdiff or tile-level Merkle trees to identify changed tiles). When a user requests an update, only tiles that changed between their version and the current version are transmitted, along with diffs. For a large city, this might be 2–5% of tiles in a typical 6-month period, reducing update size from gigabytes to tens of megabytes. Google Maps offline, HERE WeGo, and Maps.me all use incremental update strategies. The Merkle tree approach (where the root hash covers all tiles; unchanged subtrees are skipped) efficiently identifies exactly which tiles need updating.",
      hints: [
        "A Merkle tree of tile hashes: if the root hash matches, nothing has changed — no download needed. If only a leaf differs, only one tile needs updating.",
        "What percentage of a city's road network changes in 6 months? Usually < 5% — so full re-downloads are extremely wasteful."
      ],
    },
    {
      id: "q-maps-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "For offline navigation, a routing engine must fit in device memory and complete route calculations within 1 second on a 5-year-old smartphone. What data structures and algorithms make this feasible?",
      options: [
        "Load the full global road graph (100+ GB) into RAM and run standard Dijkstra — modern phones have enough RAM",
        "Use Contraction Hierarchies preprocessed server-side: store the CH-augmented graph in a compact Compressed Sparse Row (CSR) format, which enables bidirectional CH queries to answer long-distance routes in milliseconds using only the downloaded region's graph (1–3 GB)",
        "Use a lookup table of pre-computed routes for every possible origin-destination pair in the region",
        "Use A* on the raw OSM data loaded directly from the downloaded PBF file"
      ],
      correctAnswer: 1,
      explanation: "Offline routing on mobile is the exact problem OSRM and Valhalla solve. The key is server-side CH preprocessing: the graph is augmented with shortcut edges and node importance rankings, then serialized into a compact CSR format (arrays of edge offsets and destinations — ~4–8 bytes per edge, much smaller than adjacency lists with pointers). The CH-augmented CSR for a country like Germany is ~500 MB. At query time, bidirectional CH Dijkstra explores only a tiny fraction of nodes (often < 1,000 even for cross-country routes) because it only follows upward edges. This gives < 10 ms query times on mobile CPUs. OsmAnd and Maps.me use this approach. Raw OSM PBF + plain A* would be both too large (tens of GB) and too slow (minutes per query).",
      hints: [
        "CSR (Compressed Sparse Row): store all edges sorted by source node in one flat array. A node's edges are a contiguous slice — cache-friendly for Dijkstra's priority queue pop.",
        "Bidirectional CH means the search from source and the search from destination each explore << half the graph — they meet somewhere in the middle on high-importance nodes."
      ],
    },
  ],

  "sdi-maps-location-privacy": [
    {
      id: "q-maps-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A mapping company wants to publish aggregate traffic speeds per road segment while protecting individual user privacy. Which technique best achieves this?",
      options: [
        "Remove usernames from the data but keep exact timestamps and GPS coordinates",
        "Apply differential privacy: add calibrated Laplace noise to segment-level speed aggregates, with noise magnitude inversely proportional to the sensitivity of the statistic and the desired privacy budget ε",
        "Encrypt the data at rest with AES-256 and only allow internal employees to query it",
        "Round all GPS coordinates to 2 decimal places (approximately 1 km resolution)"
      ],
      correctAnswer: 1,
      explanation: "Differential privacy (DP) provides a mathematical guarantee: the published aggregate statistics are nearly identical whether or not any single user's data was included. For speed aggregation, the sensitivity (maximum change one user can cause) is bounded by the speed range (e.g., 0–120 mph). Adding Laplace(sensitivity/ε) noise to each segment's average speed gives ε-differential privacy. With enough users per segment (which is typical for major roads), the noise is small relative to the true mean and the aggregate remains useful. Apple Maps uses DP for anonymizing user data. The key advantage over anonymization or coarsening is the formal, provable privacy guarantee — removing usernames or rounding coordinates does not prevent re-identification from trajectory patterns.",
      hints: [
        "The privacy budget ε controls the tradeoff: small ε = more noise = better privacy but less accuracy. What's an acceptable ε for traffic data?",
        "Removing usernames isn't anonymization — trajectory data alone uniquely identifies most people within 4 location points."
      ],
    },
    {
      id: "q-maps-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A ride-sharing company stores driver GPS traces for trip reconstruction and fraud detection. What is the most privacy-preserving data retention policy?",
      options: [
        "Retain raw GPS traces indefinitely for all completed trips",
        "Retain raw GPS traces only for the minimum period required for fraud detection and dispute resolution (e.g., 90 days), then aggregate to trip-level summaries (origin, destination, duration) and delete raw traces",
        "Never store any GPS data to maximize privacy",
        "Store all GPS traces in a public S3 bucket with requester-pays to limit access"
      ],
      correctAnswer: 1,
      explanation: "Data minimization is a core GDPR and CCPA principle: retain data only as long as necessary for the stated purpose. Raw GPS traces enable re-identification and expose sensitive information (driver home, religious sites visited, medical facilities). For fraud detection, ML models can be trained on historical raw data then applied to feature vectors — raw traces don't need indefinite storage. For trip disputes, 90 days covers virtually all chargebacks and legal windows. After the retention period, raw traces are deleted and only summarized trip records (origin zone, destination zone, duration, fare) are kept — these preserve business intelligence value while dramatically reducing privacy risk. This approach is standard at Uber, Lyft, and Grab.",
      hints: [
        "GDPR Article 5(1)(e): personal data may be kept in identifiable form no longer than necessary for the stated purpose.",
        "Once a driver's route data is aggregated to 'trip started in Downtown, ended at Airport, 23 minutes', what can you infer about their home location?"
      ],
    },
  ],

  "sdi-maps-routing-graph": [
    {
      id: "q-maps-25",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A road network for a continent has 500 million nodes and 1.2 billion edges. Which graph storage format minimizes memory usage and maximizes cache performance for Dijkstra-style traversal?",
      options: [
        "Adjacency list with linked list nodes (pointer-based), one per edge",
        "Compressed Sparse Row (CSR): two flat integer arrays — one for edge targets and weights, one for node offset pointers into the first array — enabling cache-friendly sequential access to a node's neighbors",
        "Adjacency matrix of size 500M x 500M bitmask",
        "Hash map from node ID to a dynamic vector of (neighbor, weight) pairs"
      ],
      correctAnswer: 1,
      explanation: "CSR (Compressed Sparse Row) is the standard format for large sparse graphs used in production routing engines (OSRM, RoutingKit, CH-Go). Structure: (1) offset[] — array of length N+1 where offset[i] is the index in the edge array where node i's outgoing edges start; (2) edges[] — flat array of (target_node_id, weight) pairs sorted by source node. To iterate all neighbors of node i: scan edges[offset[i]..offset[i+1]]. This is maximally cache-friendly — all edges of a node are contiguous in memory. A pointer-based adjacency list has one pointer per edge (8 bytes on 64-bit = 9.6 GB just for pointers on 1.2B edges), plus cache misses on every pointer dereference. CSR for 1.2B edges at 8 bytes/edge (4B target + 4B weight) is ~9.6 GB but with near-sequential memory access patterns favored by CPU prefetchers.",
      hints: [
        "Dijkstra's inner loop: for each neighbor of u, relax the edge. With CSR, all neighbors are at a contiguous memory range — one cache line loads multiple edges.",
        "Dynamic vectors (std::vector<vector<Edge>>) waste memory on small-degree nodes and have poor cache behavior due to scattered heap allocations."
      ],
    },
    {
      id: "q-maps-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Cross-border routing between France and Germany must respect country-specific rules. Which two constraints are most commonly encoded as edge attributes in the routing graph?",
      options: [
        "Currency conversion rates and VAT percentages",
        "Turn restrictions (legal prohibited turns, often codified in OSM as turn:restriction relations) and access restrictions (vehicle type restrictions like trucks banned on certain roads, time-of-day access restrictions)",
        "Road surface material and lane marking color",
        "Posted toll amounts and historical accident rates"
      ],
      correctAnswer: 1,
      explanation: "Turn restrictions and access restrictions are the two most important legal constraints for correct routing across borders: (1) Turn restrictions — many countries have prohibited turns at specific intersections (no left turn during rush hour, no U-turn, mandatory turns on one-ways). In OSM these are modeled as turn:restriction relations covering via-node or via-way. Ignoring them produces illegal or dangerous routes. (2) Access restrictions — Germany's environmental zones (Umweltzone) ban high-emission vehicles; France has Crit'Air stickers; trucks are banned on certain Swiss mountain passes on Sundays. These are encoded as access=no, motorcar=no, hgv=no etc. on edges. The routing engine must filter edges based on the vehicle profile (car, truck, bicycle, pedestrian) and time of day before running the shortest path algorithm.",
      hints: [
        "OSM encodes a turn restriction like 'no left turn from Rue A via intersection X onto Rue B' as a relation with members: from-way, via-node, to-way, and restriction=no_left_turn.",
        "A truck routing engine uses a different graph than a car router — many residential streets and low-bridge roads are removed from the truck graph entirely."
      ],
    },
  ],

  "sdi-maps-geofencing": [
    {
      id: "q-maps-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A food delivery platform needs to trigger events when delivery drivers enter or exit restaurant or customer geofences (circular zones of 50–500m radius). The system tracks 100,000 drivers. What is the most scalable architecture?",
      options: [
        "On each driver location update, compute the distance from the driver to every geofence in the database using a full table scan",
        "Partition geofences spatially (e.g., by S2 cell or geohash); on each driver location update, look up only nearby geofences in the relevant spatial cells, then test containment only for those candidates; use an event-driven state machine per driver to detect entry/exit transitions",
        "Batch process all driver locations every 5 minutes against all geofences using a Spark job",
        "Store geofences as polygons in a relational DB and use a LIKE query on the WKT string"
      ],
      correctAnswer: 1,
      explanation: "Full table scan per update: 100,000 drivers x N geofences x 1 update/sec = O(100K x N) containment checks per second — infeasible for large N. The scalable approach: (1) Spatial partitioning — index all geofences in a spatial index (R-tree or S2-based hash map). Each driver location update queries only geofences in nearby cells (~4–9 cells), reducing candidates from millions to tens. (2) Containment check — for each candidate geofence, a circle containment check is a simple distance calculation (haversine for accuracy or Euclidean approximation for small radii). (3) State machine — track each driver's current 'inside' set of geofences. An entry event fires only on the 0->1 transition (was outside, now inside), avoiding duplicate events on every update inside the zone. This is how Uber Eats and DoorDash implement pickup/delivery zone detection.",
      hints: [
        "A driver in San Francisco only needs to check against San Francisco geofences — spatial partitioning eliminates geofences from other cities entirely.",
        "The state machine is essential: if a driver sends 10 location updates per second while stationary inside a geofence, you want exactly 1 'enter' event, not 10."
      ],
    },
    {
      id: "q-maps-28",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the point-in-polygon problem in geofencing, and which algorithm efficiently solves it for arbitrary polygon shapes?",
      options: [
        "Whether a GPS coordinate falls inside a polygon boundary; solved by the ray casting algorithm which counts how many times a ray from the point crosses the polygon boundary (odd = inside, even = outside)",
        "Whether a polygon is convex or concave; solved by computing the cross product of consecutive edge vectors",
        "Whether two polygons overlap; solved by the Sutherland-Hodgman clipping algorithm",
        "Whether a point is on the polygon boundary; solved by computing the minimum distance from the point to each edge"
      ],
      correctAnswer: 0,
      explanation: "The point-in-polygon problem: given a point P and a closed polygon, is P inside the polygon? The ray casting algorithm draws a horizontal ray from P to infinity and counts intersections with polygon edges. Odd intersections = inside; even = outside. The algorithm runs in O(n) for an n-vertex polygon and handles concave polygons, holes (with winding number variant), and complex shapes. For geofencing with circular zones, simple distance comparison is faster, but irregular zones (delivery zones shaped to ZIP codes, campus boundaries, airport perimeters) require ray casting or the winding number algorithm. Libraries like Turf.js (JavaScript) and Shapely (Python) implement these for production geofencing systems.",
      hints: [
        "Draw a ray from a point inside a circle — it crosses the circle boundary exactly once (odd). Draw from outside — it either misses (0) or crosses twice (even).",
        "The winding number algorithm handles self-intersecting polygons more correctly than ray casting — important for complex administrative boundaries."
      ],
    },
  ],

  "sdi-maps-isochrone": [
    {
      id: "q-maps-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A mapping service needs to compute and display an isochrone — the area reachable within 30 minutes from a given location by car. What algorithm produces this, and what is the main challenge in generating the visual boundary?",
      options: [
        "Run BFS from the origin on the road graph; the challenge is BFS ignores edge weights",
        "Run Dijkstra from the origin, collecting all nodes reachable within 30 minutes of travel time; then compute the concave hull (alpha shape or contour via kernel density estimation) of the reachable node set to generate the visual boundary polygon",
        "Draw a circle of radius equal to 30 min x average speed; no road graph needed",
        "Run Floyd-Warshall to find all-pairs shortest paths, then filter destinations reachable in 30 min"
      ],
      correctAnswer: 1,
      explanation: "Isochrone computation: (1) Run a time-constrained Dijkstra (or CH query) from the origin, expanding the search until all nodes within 30 minutes of travel time are settled. This gives a set of reachable nodes with their exact travel times. (2) Boundary generation — the reachable node set is a cloud of points on the road network, not a smooth polygon. To generate a visual polygon, compute an alpha shape (a generalization of convex hull with a parameter controlling 'tightness') or use kernel density estimation + contour lines. A simpler approach: snap nodes to a geospatial grid, mark reachable cells, then trace the boundary of marked cells. Challenges: dead-end roads (reachable but isolated from the boundary), one-way streets (asymmetric isochrones from source vs. to source), and ferry/transit mode transitions. Google Maps 'Reachable Area' and Mapbox Isochrone API use these techniques.",
      hints: [
        "Why is a simple circle incorrect for isochrones? Because road networks are anisotropic — you can drive 60 km along a highway in 30 min but only 5 km in a congested city grid.",
        "Alpha shapes: decrease α parameter -> tighter boundary that follows the road network shape. Increase α -> looser, more convex shape."
      ],
    },
    {
      id: "q-maps-30",
      type: "multiple-choice",
      difficulty: "medium",
      question: "An e-scooter company wants to show users all scooters available within a 5-minute walk. The scooter fleet has 50,000 units across a city, updated in real time. How would you design this system for sub-100ms response time?",
      options: [
        "Store scooter locations in a PostgreSQL table and run SELECT * WHERE distance < 400m on every user request using a sequential scan",
        "Maintain an in-memory geospatial index (e.g., Redis with GEO commands using a sorted set of geohash scores) for scooter locations; on user request, query GEORADIUS for scooters within ~400m (walkable in 5 min at 5 km/h), return top-N sorted by distance, and refresh scooter positions in the index on each location update",
        "Compute isochrone polygons for all 50,000 scooters and check if the user falls inside any of them",
        "Broadcast all scooter locations to every client app and do client-side filtering in JavaScript"
      ],
      correctAnswer: 1,
      explanation: "50,000 scooter location updates (typically every 30 seconds) and thousands of concurrent user queries require a purpose-built spatial index, not a relational DB sequential scan. Redis GEO commands use a sorted set where each member's score is its geohash integer. GEORADIUS (or the newer GEOSEARCH command) queries members within a given radius in O(N+log M) time where N is results and M is total members — extremely fast for bounded radii. At 50,000 scooters, a 400m radius query returns ~10–50 candidates in < 1ms. Position updates are GEOADD operations — O(log M). This pattern is used by Lime, Bird, and Spin for real-time availability maps. Client-side filtering would require sending 50,000 locations to every user — a massive bandwidth waste and privacy problem.",
      hints: [
        "Walking speed ~5 km/h -> 5 minutes approx 400m radius. What query does Redis GEOSEARCH need?",
        "Redis GEO internally uses a 52-bit geohash as the sorted set score — proximity queries become range scans on the sorted set."
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
