import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-video-upload": [
    {
      id: "q-vid-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "YouTube processes hundreds of hours of video uploaded every minute. Which upload strategy best handles unreliable network connections for large video files (>1 GB) while allowing resumption after interruption?",
      options: [
        "Single HTTP PUT with a very long timeout and client-side retry on failure",
        "Chunked upload using the TUS (resumable upload) protocol: the client splits the file into fixed-size chunks, POSTs each chunk with a Content-Range header, and can resume from the last acknowledged offset after any interruption",
        "Base64-encode the entire file and send it in a single JSON POST body",
        "Use WebSockets to stream the raw bytes in real time and buffer server-side",
      ],
      correctAnswer: 1,
      explanation: "The TUS (Tus Resumable Upload) protocol is an open standard for resumable uploads. The client PATCHes chunks to an upload URL with an Upload-Offset header; the server acknowledges each chunk. On reconnect, the client queries the server for the current offset (HEAD request) and resumes from there. YouTube, Vimeo, and AWS S3 multipart uploads all use this pattern. S3 multipart upload is functionally identical: initiate -> upload parts (5 MB–5 GB each) -> complete. The key benefit is that network failures lose at most one in-flight chunk, not the entire upload.",
      hints: [
        "Consider what happens with a single PUT if the connection drops after 950 MB of a 1 GB file — does the entire upload restart?",
        "TUS tracks progress server-side so any client (even on a different device) can resume the same upload.",
      ],
    },
    {
      id: "q-vid-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A video platform receives 500 GB of raw uploads per hour. After storing the raw file in S3, what is the recommended event-driven pipeline to trigger transcoding without polling S3?",
      options: [
        "A cron job runs every minute, lists all new S3 objects, and submits transcoding jobs to a queue",
        "S3 event notifications (or EventBridge) publish an ObjectCreated event to an SQS queue; a transcoding orchestrator consumes the queue, validates the file, and dispatches encoding jobs to a worker fleet",
        "The upload API synchronously starts transcoding before returning HTTP 200 to the client",
        "A Lambda function continuously scans the S3 bucket using ListObjectsV2 with pagination",
      ],
      correctAnswer: 1,
      explanation: "The event-driven pattern is the industry standard: S3 -> SQS (or SNS -> SQS) -> transcoding workers. S3 ObjectCreated events fire immediately when an upload completes, eliminating polling lag. SQS provides decoupling, retry logic, and backpressure — if workers fall behind, messages queue up rather than jobs being dropped. The orchestrator validates the video (checks codec, detects corruption), then fans out multiple encoding jobs (one per output rendition). YouTube's upload pipeline follows this pattern, as does AWS Elemental MediaConvert.",
      hints: [
        "Polling with ListObjectsV2 at scale is expensive and adds latency proportional to the poll interval.",
        "S3 event notifications are free and near-instant — pairing with SQS gives you durability and decoupling.",
      ],
    },
    {
      id: "q-vid-3",
      type: "true-false",
      difficulty: "easy",
      question: "In S3 multipart upload, all parts must be exactly the same size, including the final part.",
      correctAnswer: "false",
      explanation: "S3 multipart upload requires parts 1 through N-1 to be at least 5 MB, but the final part (part N) can be any size including smaller than 5 MB. This accommodates files whose total size is not evenly divisible by the chosen chunk size. Parts can also be uploaded in parallel, and each part has its own ETag for integrity verification. The CompleteMultipartUpload call assembles all parts in order.",
      hints: [
        "Think about a 12 MB file split into 5 MB chunks: the third chunk would only be 2 MB.",
        "S3's only hard requirement is that non-final parts be at least 5 MB to prevent excessive fragmentation.",
      ],
    },
  ],

  "sdi-video-transcoding": [
    {
      id: "q-vid-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Netflix uses per-title encoding optimization instead of a fixed encoding ladder. What is the core insight behind this approach?",
      options: [
        "Each title uses a different container format (MP4, MKV, WebM) based on genre",
        "Simple content (animation, static scenes) achieves acceptable quality at lower bitrates than complex content (fast action, grain), so a fixed ladder wastes bandwidth on simple titles and under-serves complex ones; per-title encoding finds the optimal bitrate-quality convex hull for each piece of content",
        "Per-title encoding applies different DRM schemes based on content value",
        "The approach encodes once at maximum quality, then applies post-processing filters per device",
      ],
      correctAnswer: 1,
      explanation: "Netflix's Dynamic Optimizer (published 2015-2016) analyzes each title's spatial and temporal complexity to determine the minimum bitrate needed to hit a target VMAF quality score at each resolution. An animated film with flat backgrounds can look excellent at 1080p/2 Mbps, while a grainy film noir might need 6 Mbps for the same quality. The result: average Netflix bandwidth dropped ~20% with no perceptible quality loss. The encoding ladder (list of bitrate-resolution pairs) is unique per title, per scene — and later evolved into shot-based encoding (Shotgun) where each shot has its own optimal encoding.",
      hints: [
        "VMAF (Video Multi-method Assessment Fusion) is Netflix's perceptual quality metric that correlates with human perception better than PSNR/SSIM.",
        "A fixed ladder like 240p/300kbps, 480p/1Mbps, 1080p/5Mbps wastes bits on simple scenes and starves complex ones.",
      ],
    },
    {
      id: "q-vid-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A video platform must choose between H.264 (AVC), H.265 (HEVC), and AV1 codecs for streaming. Which statement best describes the tradeoff for a 2024 deployment?",
      options: [
        "AV1 provides the best compression (30-50% better than H.264 at same quality) but has significantly higher encoding complexity and slower encode times; H.264 encodes fastest and has universal device support; HEVC sits in between with licensing costs",
        "H.265 and AV1 are identical in compression efficiency; the only difference is licensing cost",
        "AV1 is patent-encumbered like HEVC, making royalty-free streaming impossible with either",
        "H.264 provides better compression than AV1 on mobile devices due to hardware acceleration maturity",
      ],
      correctAnswer: 0,
      explanation: "AV1 (developed by the Alliance for Open Media, royalty-free) achieves 30-50% better compression than H.264 at equivalent quality and ~20-30% better than HEVC. However, AV1 encoding is 50-100x slower than H.264 on CPU — requiring GPU or specialized ASIC acceleration (e.g., AWS MediaConvert, NVIDIA NVENC AV1). H.264 has near-universal hardware decode support. HEVC has strong hardware support on modern devices but carries MPEG-LA patent licensing costs. Netflix and YouTube have both adopted AV1 for streaming, encoding offline and amortizing the encoding cost over many streams.",
      hints: [
        "YouTube streams AV1 to supported browsers/apps; the encode happens once at upload time but plays millions of times.",
        "For live streaming, H.264 or HEVC is often preferred because AV1's encode speed is prohibitive for real-time.",
      ],
    },
    {
      id: "q-vid-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A transcoding pipeline processes a 2-hour 4K film into 8 output renditions. How should the work be parallelized to minimize total transcoding time?",
      options: [
        "Encode all 8 renditions sequentially on a single powerful machine to avoid coordination overhead",
        "Split the video into time-based segments (e.g., 2-minute chunks), then encode all renditions of each segment in parallel across a worker fleet; merge segments per rendition at the end",
        "Encode the highest quality rendition first, then use it as the source for lower quality renditions sequentially",
        "Use a single FFmpeg command with 8 output filters to produce all renditions simultaneously from one decode pass",
      ],
      correctAnswer: 1,
      explanation: "The standard parallelization strategy is segment-based: split the source into N time segments, then scatter encoding jobs across a worker fleet. Each worker encodes one (segment, rendition) pair. With 60 segments and 8 renditions, 480 jobs can run in parallel. AWS Elemental MediaConvert, Netflix Archer, and similar systems use this approach. The final step concatenates the segments for each rendition using MP4Box or FFmpeg's concat demuxer. This reduces a 2-hour film's encoding time from hours to minutes by utilizing hundreds of machines simultaneously.",
      hints: [
        "A single-machine FFmpeg with multiple outputs (option D) is faster than sequential but still bottlenecked by that one machine's CPU.",
        "The split-encode-merge pattern is how cloud transcoding services like AWS MediaConvert achieve fast turnaround on long content.",
      ],
    },
  ],

  "sdi-video-abr": [
    {
      id: "q-vid-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the primary structural difference between HLS (HTTP Live Streaming) and MPEG-DASH manifests that affects client implementation?",
      options: [
        "HLS uses XML manifests (.mpd files); DASH uses M3U8 text-based playlists",
        "HLS uses M3U8 playlists (a two-level structure: master playlist lists renditions, each with its own media playlist of segments); DASH uses XML-based MPD files that describe all representations in a single hierarchical document",
        "DASH requires a proprietary CDN; HLS works with any HTTP server",
        "HLS segments are always 10 seconds; DASH segments are always 2 seconds",
      ],
      correctAnswer: 1,
      explanation: "HLS (Apple, RFC 8216) uses .m3u8 playlist files: a master playlist lists available renditions (bitrate, resolution, codec), and each rendition has its own media playlist listing .ts or .fmp4 segment URLs. DASH (ISO standard) uses a single XML MPD (Media Presentation Description) file that contains all representations, periods, adaptation sets, and segment templates. Both protocols are transport-agnostic (plain HTTP/HTTPS). HLS has historically been required for iOS/Safari; DASH is dominant on Android/Chrome. Most modern platforms transcode to both. Segment duration of 2-6 seconds is typical for both.",
      hints: [
        "HLS is Apple's protocol and is mandatory for streaming to iPhone/iPad without a plugin.",
        "DASH's single MPD file makes it easier to express complex multi-period content (e.g., ad insertion boundaries).",
      ],
    },
    {
      id: "q-vid-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The BOLA (Buffer-Occupancy-Based Lyapunov Algorithm) ABR algorithm selects bitrate based on buffer level rather than throughput measurements. What is the key advantage over throughput-based algorithms like FESTIVE?",
      options: [
        "BOLA eliminates rebuffering entirely by always choosing the lowest bitrate",
        "Throughput-based algorithms misestimate bandwidth due to TCP slow-start and variable network conditions, causing oscillation; BOLA uses buffer occupancy as a stable proxy — a full buffer means the current bitrate is sustainable, allowing quality upgrades without bandwidth measurement noise",
        "BOLA is only effective for live streams; throughput-based algorithms work better for VOD",
        "BOLA requires server-side state to track each client's buffer; throughput algorithms are stateless",
      ],
      correctAnswer: 1,
      explanation: "Throughput-based ABR algorithms suffer from measurement noise: TCP slow-start, congestion events, and CDN variability cause erratic bandwidth estimates, leading to quality oscillation (frequent up/down switches). BOLA (published by Huang et al., ACM SIGCOMM 2014) uses a Lyapunov optimization framework where buffer occupancy directly drives quality selection. A high buffer level indicates the network can sustain higher quality; a draining buffer signals to reduce quality. Because buffer level changes slowly and smoothly, BOLA produces fewer quality switches and lower rebuffering rates. Netflix, Akamai, and Shaka Player have implemented BOLA-based algorithms.",
      hints: [
        "Buffer level is a low-pass filter of network conditions — it smooths out short-term noise in bandwidth estimates.",
        "The Lyapunov framework provides a mathematical bound on both rebuffering and quality — it's not just heuristic.",
      ],
    },
    {
      id: "q-vid-9",
      type: "true-false",
      difficulty: "easy",
      question: "In HLS adaptive bitrate streaming, the client player is responsible for selecting which rendition (quality level) to download next — the server does not make this decision.",
      correctAnswer: "true",
      explanation: "ABR is entirely client-driven. The server simply makes all renditions available via the master playlist; the client player runs an ABR algorithm (throughput-based, buffer-based, or hybrid) to decide which rendition's next segment to request. The server has no knowledge of the client's buffer state or network conditions. This stateless server design is fundamental to why HLS/DASH scale so well — any CDN edge can serve segments without coordination. Server-side ABR (where the server selects quality) has been explored but requires persistent server-client state.",
      hints: [
        "Think about why CDN caching works for HLS — if the server controlled which rendition each client got, caching would be impossible.",
        "The player's ABR algorithm runs in JavaScript (DASH.js, Shaka Player) or native code (ExoPlayer, AVFoundation).",
      ],
    },
  ],

  "sdi-video-cdn": [
    {
      id: "q-vid-10",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Netflix Open Connect deploys custom appliances (OCAs) directly inside ISP networks rather than using public CDN PoPs. What is the primary architectural reason for this approach at Netflix's scale?",
      options: [
        "ISP-embedded appliances avoid CDN licensing fees, which is the sole motivation",
        "At Netflix's peak (~35% of US downstream traffic), serving from ISP-embedded appliances eliminates backbone transit costs and latency for the last mile; pre-positioned content means popular titles are already on-disk at the appliance before users request them, achieving near-100% cache hit rates and bypassing the public internet entirely",
        "Public CDN PoPs cannot serve HEVC or AV1 encoded content; OCA appliances are the only solution",
        "Open Connect appliances provide DRM decryption at the edge, which public CDNs cannot do",
      ],
      correctAnswer: 1,
      explanation: "Netflix Open Connect is a purpose-built CDN embedded within hundreds of ISP and IXP networks globally. OCAs are high-density storage servers (hundreds of TB each) pre-loaded nightly with popular content via a proactive caching algorithm. When a Netflix user streams, traffic flows from the OCA inside their ISP's network — never touching the public internet backbone. This eliminates transit costs (which can be significant at petabyte scale), reduces last-mile latency, and offloads congestion from internet exchange points. Cache hit rates exceed 95% for popular content. The OCA software is also optimized for high-throughput video delivery (sendfile syscall, zero-copy I/O).",
      hints: [
        "Backbone transit is priced per GB and represents a major cost for video streaming at scale.",
        "Pre-positioning content the night before means the OCA already has the data on disk when a user clicks play.",
      ],
    },
    {
      id: "q-vid-11",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A video CDN has a cache hit rate of 70% at edge PoPs for long-tail content. What technique can increase the effective cache hit rate without adding more edge storage?",
      options: [
        "Increase CDN edge server RAM to cache more content in memory",
        "Add an origin shield (mid-tier cache) layer between edge PoPs and the origin storage. Cache misses at the edge collapse to the shield, which has a higher hit rate due to aggregating requests from many edges; fewer requests reach origin",
        "Reduce video segment duration from 6 seconds to 1 second to increase cache granularity",
        "Pre-warm edge caches by pushing all content to all edges during off-peak hours",
      ],
      correctAnswer: 1,
      explanation: "An origin shield (also called a parent cache or shield PoP) sits between the edge tier and origin storage. Multiple edge PoPs in a region funnel cache misses to a single shield PoP. The shield sees the combined miss traffic from all its child edges, so popular content is highly likely to be cached there even if individual edges cannot store it. This dramatically reduces origin load and inter-region bandwidth. Akamai calls this 'Tiered Distribution'; Cloudflare calls it 'Argo Tiered Cache'. For video, the shield is particularly effective for long-tail content accessed across a region, where no single edge PoP sees enough requests to keep the content warm.",
      hints: [
        "If 10 edge PoPs each get 1 request/hour for a niche video, each edge will miss on every segment; a shield aggregates those 10 requests and caches after the first.",
        "Origin shield reduces origin egress costs — a major budget item for video platforms.",
      ],
    },
    {
      id: "q-vid-12",
      type: "true-false",
      difficulty: "easy",
      question: "CDN cache hit rate for video segments is generally higher for popular live streams than for long-tail VOD content.",
      correctAnswer: "true",
      explanation: "Popular live streams (e.g., a Super Bowl broadcast) have extremely high cache hit rates because millions of viewers request the same set of segments simultaneously (the current 2-6 second segment). This temporal locality means once a segment is cached at an edge PoP, it serves thousands of viewers before expiring. Long-tail VOD content (obscure titles, old episodes) may only be requested a few times per day per PoP, so segments often expire from cache between requests, causing origin fetches. This is why CDN economics work well for live sports but require origin shields or pre-positioning for long-tail VOD.",
      hints: [
        "During a live event, what fraction of a PoP's viewers are watching the exact same 4-second segment right now?",
        "A long-tail VOD title requested once per day has a cache hit rate near 0% if TTL is less than 24 hours.",
      ],
    },
  ],

  "sdi-video-thumbnails": [
    {
      id: "q-vid-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "YouTube generates thumbnails for millions of uploaded videos. What is the most scalable pipeline for extracting a representative thumbnail frame at upload time?",
      options: [
        "Download the entire video to a thumbnail service, decode every frame, score each frame, and return the best one",
        "Seek to a few candidate timestamps (e.g., 25%, 50%, 75% into the video), decode only those frames using FFmpeg's -ss (seek) and -vframes 1 flags, score them via a lightweight quality classifier (blur detection, face detection, composition score), and store the winner in object storage",
        "Use the first frame of the video as the thumbnail since it loads fastest",
        "Generate thumbnails client-side in the browser before upload to avoid server processing",
      ],
      correctAnswer: 1,
      explanation: "Efficient thumbnail generation uses FFmpeg's keyframe-seeking (-ss before -i for fast seek to nearest keyframe) rather than decoding the entire video. Multiple candidate frames at fixed percentages (or at scene change boundaries) are decoded and scored. Scoring criteria include: blur/sharpness (Laplacian variance), face detection (prefer frames with faces), brightness (avoid black frames), and composition quality. The winning frame is resized to multiple thumbnail resolutions (WebP/JPEG) and stored in object storage, with URLs recorded in the video metadata DB. YouTube also offers creator-uploaded custom thumbnails and generates 3 auto-generated candidates for A/B selection.",
      hints: [
        "FFmpeg's -ss flag placed before -i seeks to the nearest keyframe without decoding intermediate frames — much faster than sequential decode.",
        "The first frame is often a title card or black frame — not representative of the content.",
      ],
    },
    {
      id: "q-vid-14",
      type: "multiple-choice",
      difficulty: "hard",
      question: "TikTok detects near-duplicate videos at upload time to prevent re-uploads of the same content. Which technique is most effective for video-level deduplication at scale?",
      options: [
        "SHA-256 hash of the raw file bytes — any re-encode would differ, so this only catches exact copies",
        "Perceptual video hashing: extract frames at fixed intervals, compute a perceptual hash (pHash or dHash) for each frame, combine into a video fingerprint, and compare against a fingerprint index (LSH or inverted index); near-duplicate detection survives re-encoding, cropping, and minor edits",
        "Compare audio waveforms using exact sample matching — video is ignored",
        "Metadata matching on title, description, and upload time to flag likely duplicates",
      ],
      correctAnswer: 1,
      explanation: "Perceptual hashing computes a compact binary descriptor for each sampled frame that is robust to compression artifacts, re-encoding, slight resolution changes, and color adjustments. pHash uses DCT coefficients; dHash uses pixel differences. A video fingerprint is built from the ordered sequence of frame hashes. To query at scale, Locality-Sensitive Hashing (LSH) or MinHash enables approximate nearest-neighbor search across billions of fingerprints in sub-millisecond time. YouTube Content ID uses audio and video fingerprinting for copyright detection. TikTok uses a similar approach for duplicate detection. Cryptographic hashes (SHA-256) only catch byte-identical files — any re-encode produces a completely different hash.",
      hints: [
        "A re-encoded video is perceptually identical but byte-completely different — SHA-256 would treat it as a new video.",
        "pHash produces a 64-bit hash where Hamming distance < 10 typically indicates near-duplicate frames.",
      ],
    },
  ],

  "sdi-video-live": [
    {
      id: "q-vid-15",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Twitch ingest servers receive RTMP streams from streamers. What happens to the stream after ingest before viewers receive it?",
      options: [
        "RTMP packets are forwarded directly to CDN edge servers with no intermediate processing",
        "The ingest server transcodes the RTMP stream into multiple HLS/DASH renditions (e.g., 1080p60, 720p30, 480p, 360p) in real time using FFmpeg/hardware encoders, packages segments, and pushes them to a CDN origin; CDN edges pull segments on viewer request",
        "Viewers connect directly to the ingest server via P2P WebRTC to receive the raw stream",
        "RTMP is converted to WebSockets and served directly to browser clients",
      ],
      correctAnswer: 1,
      explanation: "The live ingest pipeline: (1) Streamer's OBS/XSplit sends RTMP to a Twitch ingest PoP nearest to them. (2) The ingest server decodes the RTMP stream and transcodes in real time to multiple ABR renditions. (3) A media packager (e.g., Nimble Streamer, custom) segments the output into HLS or DASH segments (typically 2-4 seconds each). (4) Segments are pushed to an internal CDN origin. (5) CDN edge servers pull segments on-demand as viewers request them. The ~10-20 second live latency comes from: encoder buffer + segment duration + CDN propagation + player buffer. Twitch uses proprietary ingest infrastructure with data centers optimized for low-latency RTMP receipt worldwide.",
      hints: [
        "RTMP delivers a continuous bitstream — HLS/DASH require discrete segments; the packager bridges this gap.",
        "Multiple renditions allow viewers to receive the quality appropriate for their connection speed.",
      ],
    },
    {
      id: "q-vid-16",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A live streaming platform wants to reduce end-to-end latency from 15 seconds to under 2 seconds without switching to WebRTC. What protocol enables this?",
      options: [
        "Increasing the CDN cache TTL to reduce origin fetches",
        "Low-Latency HLS (LL-HLS, RFC draft): uses partial segments (0.1-0.5s chunks published before the full segment is complete), HTTP/2 push or blocking playlist requests (playlist holds until a new segment exists), and playlist delta updates to reduce polling overhead; combined, these bring HLS latency to 1-3 seconds",
        "Switching from HLS to DASH with 1-second segment duration",
        "Using QUIC transport instead of TCP for segment delivery",
      ],
      correctAnswer: 1,
      explanation: "Low-Latency HLS (LL-HLS), introduced by Apple in 2019, addresses HLS's inherent latency by publishing partial segments (parts) of ~200ms before the full 2-6 second segment is complete. The player can start buffering immediately upon receiving the first part. Blocking playlist requests (the server holds the playlist response until a new part is available, up to a timeout) eliminate polling delay. Playlist delta updates send only the diff, reducing payload size. Combined: latency drops from ~15s (traditional HLS, 3 segment buffer x 4s segments + propagation) to 1-3s. DASH's equivalent is Common Media Client Data (CMCD) + Chunked Transfer Encoding. Netflix uses LL-HLS for its live sports offerings.",
      hints: [
        "Traditional HLS latency = (number of buffered segments) x (segment duration) + CDN propagation + packager delay.",
        "LL-HLS partial segments are the key innovation — you don't wait for a 4-second segment to fully encode before delivering.",
      ],
    },
  ],

  "sdi-video-drm": [
    {
      id: "q-vid-17",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Netflix, Disney+, and Amazon Prime Video use multi-DRM (Widevine + FairPlay + PlayReady). What is the role of the license server in the DRM playback flow?",
      options: [
        "The license server encodes the video into encrypted segments and stores them in S3",
        "The license server authenticates the user and device, verifies entitlement (subscription is active, concurrent stream limit not exceeded), and issues a short-lived content decryption key wrapped in a DRM license; the player's Content Decryption Module (CDM) uses the license to decrypt segments in a hardware-protected environment",
        "The license server decrypts video segments server-side and sends plaintext to the player",
        "The license server generates unique watermarks per stream for forensic tracking only",
      ],
      correctAnswer: 1,
      explanation: "The DRM flow: (1) Player's CDM generates a license request (challenge) containing device identity and desired content key ID. (2) Player POSTs the challenge to the license server (e.g., Netflix's own or a third-party like BuyDRM, EZDRM). (3) License server validates: is the user authenticated? Is their subscription active? Is the device certified? Does the CDM meet the security level requirement (Widevine L1 for 4K)? (4) If valid, the license server wraps the content encryption key (CEK) in a DRM license and returns it. (5) The CDM decrypts the CEK in a Trusted Execution Environment (TEE) or hardware secure element. (6) Encrypted video segments (using AES-128-CTR, Common Encryption / CENC) are decrypted on-the-fly during playback. Keys never appear in plaintext in application memory.",
      hints: [
        "Widevine is Google's DRM used in Chrome, Android, and Smart TVs; FairPlay is Apple's for Safari and iOS; PlayReady is Microsoft's for Edge and Xbox.",
        "Widevine L1 requires a TEE (Trusted Execution Environment) and is required for 4K streaming on most platforms.",
      ],
    },
    {
      id: "q-vid-18",
      type: "true-false",
      difficulty: "easy",
      question: "Common Encryption (CENC) allows a single encrypted video file to be decrypted by multiple DRM systems (Widevine, PlayReady, FairPlay) using their respective license servers.",
      correctAnswer: "true",
      explanation: "CENC (Common Encryption, ISO 23001-7) standardizes the encryption scheme (AES-CTR or AES-CBC mode) and the format of encryption metadata in MP4 and MPEG-TS containers. A single CENC-encrypted fMP4 file embeds 'pssh' (Protection System Specific Header) boxes for multiple DRM systems. Each DRM system's CDM reads its own pssh box to obtain key ID information, then fetches the decryption key from its respective license server. The actual video content is encrypted once; only the key delivery mechanism differs per DRM. This dramatically reduces storage costs — platforms don't need to store Widevine-encrypted, FairPlay-encrypted, and PlayReady-encrypted copies separately.",
      hints: [
        "Without CENC, a platform would need to store 3x the video data — one copy per DRM system.",
        "The 'pssh' box in the MP4 container is like a DRM system's business card saying 'here is how to get the key from my license server'.",
      ],
    },
  ],

  "sdi-video-storage": [
    {
      id: "q-vid-19",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Vimeo stores millions of videos including those uploaded years ago that are rarely watched. What tiered storage strategy minimizes cost while maintaining reasonable access latency for all content?",
      options: [
        "Store all video on NVMe SSDs for maximum access speed regardless of access frequency",
        "Hot tier (S3 Standard or equivalent) for recently uploaded and popular content; warm tier (S3 Infrequent Access or similar) for content accessed monthly; cold tier (Glacier / tape) for archival content not accessed in 6+ months. Access patterns trigger automatic tier migration via lifecycle policies",
        "Delete content after 90 days of inactivity to minimize storage costs",
        "Store only the lowest quality rendition for old content and re-transcode on-demand when accessed",
      ],
      correctAnswer: 1,
      explanation: "Tiered storage is the standard cost optimization strategy for video archives. S3 Intelligent-Tiering automates this by monitoring access patterns and moving objects between tiers automatically. Hot tier (S3 Standard): ~$23/TB/month, immediate access. Warm tier (S3-IA): ~$12.5/TB/month, same latency but per-retrieval cost. Cold tier (Glacier): ~$4/TB/month, 1-12 hour retrieval. Deep Archive: ~$1/TB/month, 12-48 hour retrieval. YouTube retains original uploads indefinitely using equivalent tiering. For cold-tier access, the platform can either accept the retrieval delay or use Glacier Expedited Retrieval (minutes) at higher per-GB cost.",
      hints: [
        "A video uploaded 5 years ago with 10 views total should not sit on SSD — the storage cost vastly exceeds revenue.",
        "S3 Intelligent-Tiering removes the need for custom lifecycle rule management by using actual access data.",
      ],
    },
  ],

  "sdi-video-recommendations": [
    {
      id: "q-vid-20",
      type: "multiple-choice",
      difficulty: "hard",
      question: "YouTube's recommendation system serves 80%+ of watch time from recommended videos. At a high level, what two-stage architecture enables real-time recommendations for 2 billion users?",
      options: [
        "A single neural network scores all 800 million videos simultaneously for each user request",
        "Candidate generation (retrieval): a lightweight model (e.g., two-tower neural network) retrieves hundreds of candidates from billions of videos in milliseconds using approximate nearest-neighbor search on user/video embeddings; ranking: a deep neural network with rich features scores only the candidates and returns the top-K list",
        "Collaborative filtering alone: find users with similar watch history and recommend what they watched next",
        "A rule-based system that always recommends videos from channels the user is subscribed to",
      ],
      correctAnswer: 1,
      explanation: "YouTube's recommendation architecture (described in the 2016 paper 'Deep Neural Networks for YouTube Recommendations') uses a two-stage funnel: (1) Candidate generation: a two-tower model embeds users and videos into a shared embedding space. ANN search (e.g., ScaNN, FAISS) retrieves ~hundreds of relevant candidates from billions of videos in <10ms. (2) Ranking: a deeper model with hundreds of features (watch time, click-through rate, user history, video freshness, user satisfaction signals) scores and re-ranks the candidates. Only ranking the ~hundreds of candidates (not billions) makes this feasible in real time. TikTok, Netflix, and Spotify use architecturally similar two-stage systems.",
      hints: [
        "Scoring 800M videos with a deep neural network per request is computationally infeasible — the retrieval stage prunes the space.",
        "ANN (Approximate Nearest Neighbor) search finds the top-K closest embedding vectors in O(log N) time, not O(N).",
      ],
    },
  ],

  "sdi-video-moderation": [
    {
      id: "q-vid-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "YouTube must moderate 500 hours of video uploaded per minute for policy violations (violence, CSAM, misinformation). What is the standard multi-layer moderation pipeline?",
      options: [
        "Human reviewers watch every video before it is published, adding 24-48 hours of delay",
        "Automated ML classifiers run on sampled frames and audio transcription immediately post-upload, classifying into risk tiers; high-confidence violations are auto-removed; medium-confidence cases are queued for human review; low-confidence content is published and monitored via user reports and periodic re-evaluation",
        "Upload bans are applied to all new accounts for 30 days; established accounts bypass moderation",
        "Hash-matching against a database of known-bad content is the only moderation technique used",
      ],
      correctAnswer: 1,
      explanation: "At 500 hours/minute scale, human-first review is impossible. The pipeline is: (1) Automated classifiers analyze sampled frames (e.g., every 5 seconds) and full-frame key frames for visual policy violations. Audio is transcribed via ASR (automatic speech recognition) and scanned for hate speech, threats. (2) Known CSAM and terrorist content is detected via PhotoDNA / NCMEC hash matching (100% recall on known material). (3) Risk scoring tiers content: high-risk -> auto-remove and human audit; medium-risk -> human review queue (prioritized by view velocity); low-risk -> publish with monitoring. (4) Human reviewers use a custom tool to see flagged frames and make binary decisions. YouTube's Trust & Safety team works with regional contractors for language-specific content. The system is a mix of automated enforcement at scale plus human judgment for edge cases.",
      hints: [
        "Frame sampling (not frame-by-frame analysis) is a pragmatic tradeoff — analyzing every frame of 500 hours/minute of video is computationally prohibitive.",
        "PhotoDNA generates a perceptual hash of known CSAM images; any match is a high-confidence true positive.",
      ],
    },
  ],

  "sdi-video-sync": [
    {
      id: "q-vid-22",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A watch party feature must synchronize playback across 100 viewers in different geographic regions. What is the core technical challenge and how does a practical implementation address it?",
      options: [
        "Bandwidth is the core challenge; solved by P2P video distribution among watch party participants",
        "Clock synchronization: different clients have different system clocks and network latencies; a practical solution uses a coordinator server that broadcasts authoritative playback position (NTP-style) periodically; clients with clock skew >500ms perform a soft seek; pause/resume events broadcast from the coordinator with an absolute timestamp for synchronized execution across all clients",
        "DRM prevents synchronized playback across devices; watch parties are technically impossible with encrypted content",
        "Buffering differences are unsolvable; watch parties simply accept 5-10 seconds of desynchronization",
      ],
      correctAnswer: 1,
      explanation: "The core challenge is that each client independently fetches, buffers, and renders video. Sources of divergence include: different buffer fill levels, variable network conditions causing stalls, and system clock differences. Solutions: (1) The coordinator (either a server or the host client) maintains the canonical playback position. (2) Clients periodically report their current playback position; the coordinator detects drift. (3) On pause/play, the coordinator broadcasts a timestamp (based on a shared synchronized clock like NTP) for when to execute the action; clients schedule the action at that absolute time. (4) Clients >N seconds ahead pause briefly; clients behind seek forward. Amazon Watch Party, Netflix Teleparty (browser extension), and Disney+ GroupWatch all use variants of this. The tricky part is handling the host's network stall — do all viewers pause, or does the group desynchronize?",
      hints: [
        "NTP (Network Time Protocol) synchronizes system clocks to within milliseconds globally — using server-based timestamps makes coordination precise.",
        "Broadcasting 'pause at Unix time 1700000050.000' is more reliable than 'pause now' — each client's 'now' is slightly different.",
      ],
    },
  ],

  "sdi-video-captions": [
    {
      id: "q-vid-23",
      type: "multiple-choice",
      difficulty: "medium",
      question: "YouTube automatically generates subtitles for videos using ASR (Automatic Speech Recognition). How are auto-generated captions integrated into HLS/DASH delivery?",
      options: [
        "Captions are burned into the video frames (open captions) during transcoding",
        "Captions are delivered as sidecar files: WebVTT (.vtt) for HLS (listed in the master playlist as a separate track with #EXT-X-MEDIA:TYPE=SUBTITLES) or TTML/WebVTT in the DASH MPD as a separate AdaptationSet; the player downloads and overlays them independently of video segments",
        "Captions are embedded in the MP4 video file as a timed text track and cannot be toggled off",
        "ASR captions are sent as a JSON API response and rendered by the page JavaScript, separate from the video player",
      ],
      correctAnswer: 1,
      explanation: "Sidecar delivery is the industry standard because it allows captions to be: (1) Toggled on/off without re-encoding video; (2) Delivered in multiple languages simultaneously (each as a separate track); (3) Updated independently of the video (corrections, translations). In HLS, each subtitle track is declared in the master playlist with #EXT-X-MEDIA:TYPE=SUBTITLES pointing to a WebVTT media playlist. In DASH, subtitle tracks are separate AdaptationSets in the MPD. The ASR pipeline: audio extraction -> speech-to-text model (Google's Universal ASR, or Whisper) -> timed text generation -> WebVTT/SRT formatting -> upload to subtitle CDN. YouTube also runs automatic translation using Neural Machine Translation (NMT) to generate captions in 100+ languages from the original ASR output.",
      hints: [
        "If captions were burned into video, a Spanish speaker and an English speaker would need separate video files — 2x storage and transcoding cost.",
        "WebVTT format: each cue has a start time, end time, and text — simple but sufficient for most captioning needs.",
      ],
    },
  ],

  "sdi-video-analytics": [
    {
      id: "q-vid-24",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A video platform needs to compute the 'rebuffering ratio' (percentage of watch time spent buffering) per video per day. At 1 billion daily views, what data pipeline is appropriate?",
      options: [
        "Write every buffering event to a MySQL table and run daily GROUP BY queries",
        "Client players emit buffering events (with video ID, session ID, buffer duration) to a Kafka topic; a stream processor (Flink or Spark Streaming) computes per-video aggregates in near-real-time; results land in a columnar store (BigQuery, Redshift, ClickHouse) for daily and hourly reporting",
        "Sample 1% of views and extrapolate — exact counts are unnecessary for operational metrics",
        "Store events in DynamoDB and run a Lambda function nightly to aggregate",
      ],
      correctAnswer: 1,
      explanation: "At 1 billion daily views, video QoE (Quality of Experience) analytics requires a streaming data pipeline: (1) Client SDK emits heartbeat events (every 10-30s) plus event-triggered signals (buffer start/end, quality switch, error) to a Kafka topic. (2) A stream processor like Apache Flink aggregates per-video, per-CDN, per-region metrics in real time (1-minute windows). (3) Results are written to a time-series store (InfluxDB, Prometheus) for real-time dashboards and to a data warehouse (BigQuery) for historical analysis. Key QoE metrics: rebuffering ratio (buffer time / watch time), startup latency, average bitrate, error rate, and quality switch frequency. Netflix's Atlas, YouTube's Streamz, and Akamai's mPulse use this architecture.",
      hints: [
        "At 1B daily views, MySQL cannot handle the write throughput for individual buffering events — Kafka's horizontal scaling is essential.",
        "Rebuffering ratio = total buffering seconds / (total buffering seconds + total playing seconds) per session, then averaged across sessions per video.",
      ],
    },
  ],

  "sdi-video-vmaf": [
    {
      id: "q-vid-25",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Why does Netflix use VMAF instead of PSNR or SSIM as the primary quality metric for automated encoding decisions?",
      options: [
        "VMAF is faster to compute than PSNR, making it suitable for real-time quality monitoring",
        "PSNR and SSIM correlate poorly with human perception of video quality — a compressed video can have high PSNR but look terrible to humans (e.g., blurry or blocky). VMAF combines multiple elementary metrics (detail loss, motion, contrast) trained on human perceptual judgments, providing a score that correlates much more strongly with how humans actually perceive quality",
        "VMAF is an industry standard required by all streaming platforms for DRM compliance",
        "PSNR cannot measure quality at resolutions above 1080p, making it unsuitable for 4K content",
      ],
      correctAnswer: 1,
      explanation: "PSNR (Peak Signal-to-Noise Ratio) measures pixel-level distortion in dB; SSIM (Structural Similarity) measures luminance, contrast, and structure similarity. Both have known failure modes: a blurred but low-noise image can have high PSNR despite being visually unacceptable. VMAF (Video Multi-method Assessment Fusion), developed by Netflix and open-sourced in 2016, uses a support vector machine trained on thousands of human quality ratings (MOS scores from subjective viewing tests). It combines VIF (Visual Information Fidelity), DLM (Detail Loss Metric), and motion to produce a 0-100 score where 90+ is perceptually excellent. Netflix's per-title encoding uses VMAF as the target quality constraint, enabling the bitrate ladder to be optimized for actual human perception rather than mathematical distortion.",
      hints: [
        "A video codec can reduce PSNR by introducing slight blur everywhere — visually terrible, but noise is low. VMAF would correctly rate this poorly.",
        "VMAF models are available for 4K HDR, phone screens, and broadcast TV — different viewing conditions have different perceptual thresholds.",
      ],
    },
  ],

  "sdi-video-scrubbing": [
    {
      id: "q-vid-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "YouTube and Netflix show thumbnail previews when a user hovers over the video timeline scrubber. How are these previews generated and delivered efficiently?",
      options: [
        "The player requests a video segment for the hovered timestamp and decodes the first frame in real time",
        "During transcoding, frames are extracted at fixed intervals (e.g., every 10 seconds), stitched into a sprite sheet (grid of JPEG thumbnails in a single image), and delivered with a VTT file mapping time ranges to sprite sheet coordinates (x, y, width, height); the player downloads the sprite sheet and CSS-crops the correct thumbnail without extra HTTP requests",
        "A separate API call fetches the thumbnail for each 10-second interval as the user scrubs",
        "Individual JPEG files are generated for each second and stored in S3 with time-based URLs",
      ],
      correctAnswer: 1,
      explanation: "Sprite sheet delivery is the standard approach. A single sprite sheet image (e.g., a 10x10 grid of 160x90 thumbnails) contains 100 preview frames, replacing 100 individual HTTP requests with a single ~50-200 KB image download. A companion WebVTT file maps time ranges to sprite sheet coordinates: e.g., '00:10:00 --> 00:10:10 thumbs.jpg#xywh=160,0,160,90' tells the player to CSS-offset by (160,0) and show a 160x90 crop. The player pre-loads sprite sheets for the video's duration. Netflix generates 2-second-interval sprites; YouTube uses 5-10 seconds. For very long content, multiple sprite sheets are used (one per N minutes). This technique eliminates scrubber-induced network traffic spikes.",
      hints: [
        "At 1 request per second of scrubbing, a user previewing a 2-hour film would trigger 7200 HTTP requests — sprite sheets collapse that to ~72 requests.",
        "WebVTT's xywh= fragment identifier is a W3C standard for spatial media fragment URIs.",
      ],
    },
  ],

  "sdi-video-offline": [
    {
      id: "q-vid-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Netflix allows subscribers to download content for offline viewing. What is the key technical challenge when combining DRM with offline download?",
      options: [
        "Downloaded files are too large for mobile device storage; the only solution is streaming",
        "DRM licenses are normally short-lived (minutes to hours) and require a live license server connection for renewal; offline download requires a persistent license that embeds a longer expiry (e.g., 30 days from download, 48 hours from first play start) issued at download time and stored securely in the device's CDM/TEE, since no license server connection exists during offline playback",
        "Offline playback is technically identical to streaming; DRM presents no additional challenge",
        "Downloaded content must be re-encrypted with a device-specific key on the server before transfer",
      ],
      correctAnswer: 1,
      explanation: "Online streaming uses short-lived license sessions (keys valid for the session duration) renewed against the license server. Offline changes the model fundamentally: the device must have a valid decryption license available when there is no network. The solution is a persistent license: at download time, the client requests a persistent license specifying the maximum expiry (e.g., 30 days from download, or 48 hours from first play — whichever comes first, matching Netflix's business rules). The CDM stores this license in secure storage (TEE, Keystore, or Secure Enclave). The encrypted video file is stored locally. On offline playback, the CDM checks the persistent license expiry and decrypts if valid. Netflix, Disney+, and Amazon Prime use Widevine offline persistent licenses on Android and FairPlay persistent keys on iOS.",
      hints: [
        "License expiry enforcement happens inside the CDM — users cannot easily manipulate the license clock without breaking the TEE security boundary.",
        "Netflix's download licenses expire 30 days after download or 48 hours after you first press play, matching their contractual obligations to studios.",
      ],
    },
  ],

  "sdi-video-launch": [
    {
      id: "q-vid-28",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Disney+ launching a new Marvel series at midnight causes millions of simultaneous requests to CDN origins. What is the 'thundering herd' problem and how is it mitigated for global content launches?",
      options: [
        "CDN servers crash due to running out of disk space from caching too many segments",
          "When content is not yet cached on CDN edges (cold cache), millions of simultaneous cache misses all propagate to origin storage simultaneously, overwhelming origin read bandwidth; mitigated by: (1) pre-warming CDN edges with popular segments before release time, (2) origin shields/mid-tier caches that collapse concurrent misses, (3) request coalescing (cache stampede prevention) where only one request per segment goes to origin while others wait, and (4) rate-limiting origin-bound traffic",
        "Content delivery networks cannot handle more than 10K concurrent streams — the solution is to add more edge servers",
        "The thundering herd only affects live content; VOD launches have no cache problems",
      ],
      correctAnswer: 1,
      explanation: "The thundering herd (cache stampede) occurs when a cold cache item is requested by many clients simultaneously. Every miss goes to origin, multiplying origin load by the number of concurrent viewers. Mitigations: (1) Pre-warming: before 12:00 AM, Netflix/Disney+ push popular segments to CDN edges in the expected launch regions, achieving a warm cache at launch time. (2) Origin shield: a regional mid-tier cache collapses all edge misses to a single origin request per segment. (3) Cache stampede prevention (also called request coalescing or request collapsing): when multiple simultaneous misses arrive for the same segment, only one origin request is made; the response is shared with all waiting requestors. (4) Rate limiting on the origin path prevents runaway load. Netflix pre-positions Open Connect Appliance content for major releases nightly.",
      hints: [
        "Pre-warming is the most effective mitigation for predictable launch events — you know exactly what content and when.",
        "Request coalescing is an edge server feature: the first miss triggers an origin fetch; subsequent requests for the same URL queue and receive the cached response.",
      ],
    },
  ],

  "sdi-video-chapters": [
    {
      id: "q-vid-29",
      type: "multiple-choice",
      difficulty: "hard",
      question: "YouTube automatically detects chapter boundaries in long-form videos. What ML-based approach enables scene detection and automatic chapter segmentation at scale?",
      options: [
        "YouTube only uses manually specified chapter timestamps from video descriptions; there is no automatic detection",
        "Scene detection combines visual and audio signals: visual models compute frame embedding differences (cosine distance between CNN features of adjacent frames) to detect abrupt and gradual transitions; a temporal segmentation model (e.g., TransNet V2 or a transformer over frame embeddings) identifies segment boundaries; the boundary timestamps are clustered and labeled using title text from ASR transcription and video chapter title extraction; chapters are only surfaced if the creator has not manually specified them",
        "A simple pixel difference threshold between consecutive frames is sufficient for all scene detection",
        "Chapter detection is done client-side by the YouTube player using JavaScript",
      ],
      correctAnswer: 1,
      explanation: "Automatic chapter detection is a multi-modal problem. Visual scene detection: compare frame embeddings (from a CNN like ResNet or EfficientNet) of frames N and N+K; a large cosine distance or L2 distance indicates a scene transition. Models like TransNet V2 (trained on MovieNet) achieve F1 >0.7 on shot boundary detection. Audio cues (music changes, silence) supplement visual detection. Chapter labeling uses ASR transcription: the text around each detected boundary often contains the chapter's natural language description. YouTube's system extracts timestamps from video descriptions (format: '0:00 Intro') as the primary source, using automatic detection as a fallback. Thumbnail selection for chapters uses the same frame extraction pipeline as video thumbnails. The system must filter spurious scene changes (e.g., reaction cuts in interview videos) from meaningful chapter breaks.",
      hints: [
        "Frame embedding comparison detects scene transitions, but chapter boundaries are typically longer transitions (minutes, not seconds) — temporal smoothing is needed.",
        "ASR transcription is essential for labeling chapters — visual features alone can detect boundaries but cannot name them.",
      ],
    },
  ],

  "sdi-video-webrtc": [
    {
      id: "q-vid-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A video conferencing system (Zoom-like) must support 100-person calls. What is the key architectural difference between SFU (Selective Forwarding Unit) and MCU (Multipoint Control Unit), and why do modern systems prefer SFU?",
      options: [
        "SFU decodes and re-encodes all streams centrally; MCU forwards raw RTP packets without processing — MCU is CPU-cheaper",
        "MCU decodes all participant streams, composites them into a single mixed video, and sends one stream per participant; SFU receives each participant's stream and selectively forwards individual streams to each subscriber without decoding or compositing; SFU is preferred because it offloads the heavy compositing work to the receiver (client-side layout), scales linearly, and supports simulcast (senders transmit multiple quality layers; SFU forwards the appropriate layer per receiver)",
        "SFU requires all participants to be in the same datacenter region; MCU is the only option for global calls",
        "Both SFU and MCU are identical architecturally; the terms are interchangeable in modern systems",
      ],
      correctAnswer: 1,
      explanation: "MCU (legacy approach): the server decodes every participant's audio and video, mixes/composites them (computationally expensive), and encodes+sends a single mixed stream to each participant. CPU cost scales as O(N²) with participant count. Quality is limited by the MCU's encode settings. SFU (modern approach): the server receives each participant's RTP stream and routes (forwards) individual streams to subscribers based on subscription topology. No decoding or compositing — the server is a smart router. CPU cost scales as O(N) (receive + forward). Client apps handle layout/compositing. Simulcast: senders transmit 3 quality layers (e.g., 1080p, 360p, 180p); the SFU sends each receiver the layer matching their bandwidth and screen size. Zoom, Google Meet, Discord, and Jitsi all use SFU architectures. MCU survives only in legacy enterprise systems or when client CPU is severely constrained (embedded devices).",
      hints: [
        "In a 100-person call, an MCU must decode 99 streams and encode 99 mixed outputs — 100x the compute of a point-to-point call.",
        "Simulcast is an SFU superpower: each sender transmits all layers once; the SFU selectively forwards different layers to different receivers based on their conditions.",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
