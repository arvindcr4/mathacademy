import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-rt-ot": [
    {
      id: "q-rt-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Operational Transformation (OT), two concurrent insert operations are performed on the string \"hello\": User A inserts \"X\" at index 2 and User B inserts \"Y\" at index 2 simultaneously. After applying B's operation at A's site using OT, what should the transformed insert position for B's \"Y\" be?",
      options: ["Index 2 (unchanged)", "Index 3 (shifted past A's insertion)", "Index 0 (reset to start)", "Index 4 (shifted by two)"],
      correctAnswer: 1,
      explanation: "When two inserts target the same position and A's insert is applied first, B's insert must be transformed to account for the character A inserted. Since A inserted at index 2 (before or at B's position), B's position shifts to index 3. This is the core of OT: transform B's operation against A's operation before applying it, preserving intent. The rule is: if A inserts at position <= B's position, increment B's position by the length A inserted.",
      hints: ["OT asks: given that A's operation has already been applied, where should B's operation now target?", "A's insert at index 2 shifts all subsequent characters one position to the right."],
    },
    {
      id: "q-rt-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Which formal property must OT transformation functions satisfy to guarantee convergence when operations pass through a central server that applies them in a canonical order?",
      options: ["CP1 (convergence property 1): transform(A, B) applied after B = transform(B, A) applied after A", "Commutativity: apply(A, B) = apply(B, A) for all operation pairs", "Idempotency: applying the same operation twice yields the same result", "Associativity: (A op B) op C = A op (B op C) for sequential operations"],
      correctAnswer: 0,
      explanation: "CP1 (also called the convergence property or TP1) states that for any two concurrent operations A and B, transform(A,B) followed by B and transform(B,A) followed by A must produce the same document state. This ensures all sites converge to the same state. Google Wave famously required both CP1 and CP2 (transform(transform(A,B),C') = transform(transform(A,C),B') for three concurrent operations), which is extremely difficult to implement correctly — one reason Wave was discontinued.",
      hints: ["CP1 is about two concurrent operations — if you apply A then transform(B against A), and also apply B then transform(A against B), you should reach the same state.", "Google Docs simplifies this by routing all operations through a single server, requiring only CP1."],
    },
    {
      id: "q-rt-3",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In a Google Docs-style architecture using Operational Transformation, what is the primary role of the central server?",
      options: ["Storing the document as a CRDT lattice and broadcasting state snapshots", "Serializing all incoming concurrent operations into a canonical order and broadcasting transformed operations to all clients", "Performing client-side rendering of rich text and returning HTML diffs", "Providing a last-write-wins conflict resolution using Lamport timestamps"],
      correctAnswer: 1,
      explanation: "Google Docs uses a single authoritative server that receives all client operations, serializes them into a total order (via a revision counter), transforms each incoming operation against all operations that have been applied since the client's last known revision, and broadcasts the transformed operations to all other clients. This central serialization point is what makes OT tractable — without it, you would need the harder multi-site OT algorithm satisfying both CP1 and CP2.",
      hints: ["The server acts as a 'referee' that determines the definitive order of all concurrent edits.", "Clients track a revision number; when they send an operation, they also send the revision they were at when they composed it."],
    },
  ],

  "sdi-rt-crdt": [
    {
      id: "q-rt-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the key structural difference between a state-based CRDT (CvRDT) and an operation-based CRDT (CmRDT)?",
      options: ["CvRDTs require a central server; CmRDTs are fully peer-to-peer", "CvRDTs merge full state snapshots using a join-semilattice; CmRDTs broadcast individual operations that must be delivered exactly once in causal order", "CvRDTs support only counters; CmRDTs support arbitrary data types including text", "CvRDTs are used in Google Docs; CmRDTs are used in Figma"],
      correctAnswer: 1,
      explanation: "State-based CRDTs (CvRDTs) work by periodically merging the full state of replicas using a merge function that satisfies the properties of a join-semilattice (commutative, associative, idempotent). They are network-efficient for small state but expensive for large documents. Operation-based CRDTs (CmRDTs) broadcast individual update operations and rely on the network to deliver them exactly once and in causal order. CmRDTs have smaller network messages but stricter delivery requirements. Hybrid approaches like delta-state CRDTs combine both advantages.",
      hints: ["CvRDT merges 'what the state looks like'; CmRDT sends 'what changed'.", "If your network can guarantee causal delivery with no duplicates, CmRDT is more efficient; if not, CvRDT's idempotent merge is safer."],
    },
    {
      id: "q-rt-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A G-Counter CRDT is implemented across 3 nodes (N0, N1, N2) as a vector [N0_count, N1_count, N2_count]. Node N1 increments its counter. What is the correct merge rule when two replicas share their state?",
      options: ["Sum all vector entries from both replicas to get total count", "Take the element-wise maximum of both vectors; the total value is the sum of the merged vector", "Overwrite with the replica that has the higher vector sum", "Use the median value for each position to avoid outliers"],
      correctAnswer: 1,
      explanation: "A Grow-only Counter (G-Counter) stores a vector where each node only increments its own slot. To merge two replicas, you take the element-wise maximum: merge([3,1,2], [3,2,1]) = [3,2,2]. The total count is the sum of the merged vector = 7. This merge is commutative, associative, and idempotent — the three properties required for a CvRDT. The value can only grow, which is why it is called Grow-only. A PN-Counter extends this with a separate G-Counter for decrements.",
      hints: ["Each node 'owns' one slot in the vector and only increments its own slot.", "Taking the element-wise max handles the case where you receive an older state — the max is at least as current as either replica."],
    },
    {
      id: "q-rt-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Figma's multiplayer system uses Y.js, a CRDT library. Which type of CRDT does Y.js implement for collaborative text editing, and what unique identifier does it assign to each character?",
      options: ["G-Set CRDT; each character gets a UUID generated at insertion time", "LSEQ CRDT; each character gets a fractional index between its neighbors", "YATA (Yet Another Transformation Approach) / Logoot-style CRDT; each character gets a unique (clientID, clock) tuple as its identity", "RGA (Replicated Growable Array); each character is identified by its position in a linked list with wall-clock timestamps"],
      correctAnswer: 2,
      explanation: "Y.js implements a variant of the YATA algorithm (and is related to Logoot/LSEQ families). Each character insertion is assigned a unique ID consisting of (clientID, lamport_clock). This ID is permanent and never changes even as characters around it are inserted or deleted. Deletions are represented as tombstones — the character's ID remains in the structure but is marked deleted, preventing ambiguity. The total order of characters is determined by these IDs. This allows offline editing and peer-to-peer merging without a central server.",
      hints: ["The key insight of CRDT-based text editing is that each character has a stable, unique identity regardless of what gets inserted or deleted around it.", "Unlike OT which transforms position indices, CRDTs use stable IDs so positions never need transformation."],
    },
    {
      id: "q-rt-7",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the primary tradeoff between OT-based systems (Google Docs) and CRDT-based systems (Figma/Notion) for real-time collaborative editing?",
      options: ["OT requires more storage; CRDTs require more CPU for rendering", "OT requires a central server for operation serialization and cannot work offline; CRDTs can work fully offline and peer-to-peer but accumulate tombstones causing memory growth", "OT supports richer text formatting; CRDTs only support plain text", "OT is open source; CRDTs are proprietary algorithms"],
      correctAnswer: 1,
      explanation: "OT's central server requirement is both its strength (simpler algorithm satisfying only CP1) and weakness (offline editing requires buffering and complex reconciliation on reconnect; the server is a single point of failure). CRDTs are offline-first by design — any two replicas can merge without coordination — enabling true peer-to-peer collaboration. However, CRDT text structures accumulate tombstones (logically deleted characters) that are never fully removed (to prevent re-insertion conflicts), causing memory growth proportional to total edits, not current document size. Production CRDT systems implement garbage collection heuristics to mitigate this.",
      hints: ["Ask: can a user edit the document on an airplane with no internet? OT makes this hard; CRDTs make it natural.", "Tombstones are the price CRDTs pay for never needing coordination — the structure remembers everything that was ever deleted."],
    },
  ],

  "sdi-rt-presence": [
    {
      id: "q-rt-8",
      type: "multiple-choice",
      difficulty: "easy",
      question: "In a real-time collaborative document editor, how is the \"presence\" system (showing which users are online with live cursors) typically implemented at scale?",
      options: ["Each client polls the server every 100ms asking for all other users' cursor positions", "Clients publish cursor position updates via WebSocket; the server maintains an in-memory presence store (e.g., Redis) and broadcasts updates to all subscribers of that document session", "Cursor positions are written to the primary database and read by other clients via long-polling", "A separate HTTP/2 server-sent events endpoint streams cursor positions from a database change feed"],
      correctAnswer: 1,
      explanation: "Presence is a high-frequency, ephemeral data stream — cursor positions change many times per second and have no long-term value. The standard architecture is: clients send cursor updates over an existing WebSocket connection; the server (or a presence service) stores the latest position per user in Redis (with a short TTL for automatic cleanup when users disconnect); and broadcasts the delta to all other connected clients on the same document. Redis Pub/Sub or a dedicated presence channel handles the fanout. Heartbeats (every 5-10 seconds) refresh TTLs; a user is considered offline when their TTL expires.",
      hints: ["Presence data is ephemeral — if the server restarts, it is fine to lose it and rebuild from reconnecting clients.", "Redis TTL provides automatic cleanup: if a user disconnects without sending a 'leave' event, their presence expires naturally."],
    },
    {
      id: "q-rt-9",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user's cursor position is stored as a character index in a collaborative document. Another user inserts 50 characters before the cursor. How should the cursor position be updated to remain semantically correct?",
      options: ["The cursor index is frozen and never updated automatically", "The server applies the same OT transformation used for text operations to shift the cursor index by 50", "The cursor is stored as an anchor to a specific character's CRDT node ID, so it automatically follows the character regardless of insertions elsewhere", "The client re-requests the cursor position from the server after each remote operation"],
      correctAnswer: 2,
      explanation: "Index-based cursors break whenever text is inserted or deleted before them, requiring constant retransformation. The robust solution (used by ProseMirror and modern CRDT editors) is to anchor the cursor to a specific node in the document's logical structure — in CRDT terms, the unique ID of the character the cursor is next to. Since CRDT node IDs are stable (never change position in memory), the cursor 'follows' its anchor character automatically as other edits shift document indices. OT-based systems must explicitly transform cursor positions the same way they transform text operations.",
      hints: ["Index-based: cursor at 100, someone inserts 50 chars at position 0 -> cursor should move to 150, but only if you remember to update it.", "CRDT anchor: cursor is 'after character with ID (alice, 42)' — that relationship never changes no matter what else is inserted."],
    },
    {
      id: "q-rt-10",
      type: "true-false",
      difficulty: "easy",
      question: "In a collaborative editor presence system, a user's \"online\" status should be determined solely by whether their WebSocket connection is open, without any heartbeat mechanism.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "WebSocket connections can silently die — due to network middleboxes timing out idle connections, mobile OS background restrictions, or network changes — without either endpoint receiving a TCP FIN or RST. A heartbeat/ping-pong mechanism (client sends a ping every 10-30 seconds; server drops the session if no ping is received within a timeout window) is essential for detecting these 'zombie' connections. Without heartbeats, a user could appear online for minutes after their device has lost connectivity, misleading other collaborators.",
      hints: ["NAT routers and corporate firewalls often silently discard idle TCP connections after 30-90 seconds.", "The heartbeat also refreshes presence TTLs in Redis, providing a dual purpose."],
    },
  ],

  "sdi-rt-undo-history": [
    {
      id: "q-rt-11",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In a collaborative document editor, why is implementing per-user undo (\"undo only my own changes\") significantly harder than in a single-user editor?",
      options: ["Multi-user editors have more users, so the undo stack grows too large to store in memory", "Undoing your own operation may conflict with operations other users have applied on top of it, requiring the undo operation itself to be transformed against all intervening operations", "The database cannot support concurrent undo transactions from multiple users", "Per-user undo requires client-side storage that is wiped when the browser tab closes"],
      correctAnswer: 1,
      explanation: "In a single-user editor, undo simply reverses the last operation. In a collaborative editor, if Alice types 'X' at position 5 and then Bob inserts 'YZ' at position 3 (shifting X to position 7), Alice's undo must remove 'X' from position 7 (not 5). This means the inverse of Alice's original operation must be transformed against all of Bob's intervening operations before being applied — exactly the same transformation problem as forward operations. Systems like Google Docs implement selective undo by tagging operations with user IDs and replaying the operation log with the target operation removed; this is computationally expensive and why some editors only offer global undo.",
      hints: ["The undo stack is no longer a simple LIFO stack when interleaved with concurrent operations from others.", "Think of undo as inserting a new 'anti-operation' at the current revision, not literally rewinding time."],
    },
    {
      id: "q-rt-12",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A document collaboration system stores the complete operation log to enable version history. As the document accumulates millions of operations, what is the standard approach to prevent slow reconstruction of document state from the beginning of time?",
      options: ["Delete old operations once they are older than 30 days", "Periodically write a full document snapshot and store only the tail of the operation log after the snapshot; reconstruct by loading the snapshot and replaying the tail", "Compress all operations before storing to reduce log size", "Use a write-ahead log that automatically garbage-collects applied operations"],
      correctAnswer: 1,
      explanation: "Replaying the entire operation log from operation #1 is O(n) in the number of operations — unacceptable for long-lived documents. The standard technique is checkpointing: periodically (e.g., every 1,000 operations or every hour) serialize the full document state as a snapshot. To reconstruct state at any point, find the most recent snapshot before that point and replay only the operations after it. This reduces reconstruction to O(tail_length). Snapshots can be stored in object storage (S3) with operation logs in a database. Some systems store snapshots at multiple granularities (hourly, daily) for different version history views.",
      hints: ["Think of it like database WAL + periodic checkpoints: the checkpoint prunes how far back you need to replay the log.", "Notion and Google Docs both store snapshots; named version history creates explicit snapshots."],
    },
  ],

  "sdi-rt-offline-sync": [
    {
      id: "q-rt-13",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A user edits a Notion document offline for 2 hours, accumulating 200 local operations. When they reconnect, what is the correct procedure for synchronizing with the server?",
      options: ["Discard local changes and reload the server version to avoid conflicts", "Send all 200 operations to the server; the server transforms them against all server-side operations that occurred during the offline period and applies them in order", "Merge the local document state with the server state by computing a diff of the two text strings", "Lock the document for all other users during the sync to prevent concurrent modifications"],
      correctAnswer: 1,
      explanation: "The reconnection flow is: (1) the client sends its buffered local operations along with the revision number at which it went offline; (2) the server fetches all operations applied since that revision; (3) each buffered client operation is transformed against the server-side operations using OT (or, in CRDT systems, the CRDT merge is applied directly since CRDTs are designed for exactly this scenario); (4) the transformed client operations are applied to the server state and broadcast to other clients. CRDTs simplify this enormously — the offline edits are simply merged into the CRDT structure without any transformation step. This is why CRDT-based systems like Notion are offline-first.",
      hints: ["The client kept a log of operations with their revision base — that's the key information the server needs to transform them.", "CRDT systems: the merge function handles offline sync 'for free' since merge(A, B) = merge(B, A) = converged state."],
    },
    {
      id: "q-rt-14",
      type: "multiple-choice",
      difficulty: "medium",
      question: "When a client reconnects after an offline period in a WebSocket-based collaborative system, which reconnection strategy ensures no operations are missed?",
      options: ["Reconnect and re-download the full document from the server", "Reconnect and send the last acknowledged server revision; the server sends all operations from that revision onward, allowing the client to replay them", "Reconnect and compute a hash of the local document to check if it matches the server", "Reconnect and wait for other clients to broadcast their current state"],
      correctAnswer: 1,
      explanation: "Each operation on the server is assigned a monotonically increasing revision (sequence number). The client tracks the last revision it has applied. On reconnect, the client sends this revision to the server, which responds with all operations from (revision+1) to current. This is a standard 'catch-up' or 'subscription replay' pattern. The server must retain operations for at least as long as clients can be offline (configurable retention window). For very long offline periods, the server may return a full snapshot instead of the operation tail, similar to how database replication handles replicas that have fallen too far behind.",
      hints: ["This is analogous to Kafka consumer replay: the client stores its 'offset' (revision) and asks the server to send everything it missed.", "The server-side operation log is the source of truth — clients are just materialized views of it."],
    },
  ],

  "sdi-rt-comments-annotations": [
    {
      id: "q-rt-15",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A user anchors a comment to the phrase \"hello world\" at character positions 10-20 in a collaborative document. Another user then inserts 50 characters at position 5, making the phrase start at position 60. How should the comment anchor be stored to survive such edits?",
      options: ["Store the raw character indices (10-20) and update them on every operation", "Store a reference to the CRDT node IDs of the first and last characters of the anchored phrase, so the anchor follows the content rather than a position", "Store the comment anchor as a regex pattern to re-locate the phrase after edits", "Store the anchor relative to the nearest paragraph break, which changes less frequently"],
      correctAnswer: 1,
      explanation: "Storing raw character indices for annotations is fragile — any insertion or deletion before the anchor invalidates it. The robust approach (used by Google Docs, Notion, and ProseMirror) is to anchor to stable node identifiers in the document's logical structure. In CRDT systems, these are the permanent unique IDs assigned to each character at insertion time. In OT systems, each character may have an associated stable ID or the anchor is stored as a (character, offset-within-character) pair that survives transformation. This is exactly how ProseMirror implements 'marks' and 'decorations' — they are anchored to node positions in the document tree, not raw string indices.",
      hints: ["The comment should 'follow' the highlighted text as the document is edited — the only way to do this reliably is to reference the content itself, not its position.", "Google Docs comments survive large insertions/deletions around them precisely because they anchor to stable document structure, not character offsets."],
    },
  ],

  "sdi-rt-access-control": [
    {
      id: "q-rt-16",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a real-time collaborative document system, where should permission checks for edit operations be enforced?",
      options: ["Only on the client side to reduce server latency", "Only at document open time; subsequent operations are trusted since the user already has access", "On the server for every incoming operation, since the client cannot be trusted and permissions can change mid-session", "In the database layer using row-level security to block unauthorized writes"],
      correctAnswer: 2,
      explanation: "Client-side permission checks are a convenience, not a security boundary — a malicious or buggy client can bypass them. Permissions must be enforced server-side for every operation. Furthermore, permissions can be revoked while a user has the document open (e.g., the owner removes edit access). If the server only checks permissions at session establishment, a revoked user could continue making edits until they close the tab. The server should check the current permission for every operation, which requires fast permission lookups (typically cached in Redis for ~1-second TTL). When permissions change, the server should also push a 'permission changed' event to the affected client's WebSocket connection.",
      hints: ["Security rule: never trust the client. Checks must be on the server, every time.", "Permissions are dynamic — a user can have edit rights revoked while they are actively editing."],
    },
  ],

  "sdi-rt-rich-text-model": [
    {
      id: "q-rt-17",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Quill editor represents document changes as 'Deltas' — a list of retain/insert/delete operations. Which property of the Delta format makes it suitable for OT-based collaborative editing?",
      options: ["Deltas are stored as compressed binary to minimize network bandwidth", "Deltas are composable (two deltas can be merged into one equivalent delta) and transformable (given two concurrent deltas, you can compute a transformed delta), making them a natural fit for OT", "Deltas use absolute character positions, making them easy to index in a database", "Deltas support rich media embedding via MIME type annotations"],
      correctAnswer: 1,
      explanation: "The Quill Delta format was designed specifically with collaborative editing in mind. A Delta is a sequence of {retain: N}, {insert: text, attributes: {...}}, and {delete: N} operations. Two key operations are defined on Deltas: compose (combine sequential deltas into one) and transform (given two concurrent deltas A and B, produce transform(A, B) to apply after B while preserving A's intent). These operations map directly to OT's requirements. The format also handles rich text attributes (bold, italic, links) as part of insert operations, so formatting changes are also transformable.",
      hints: ["The 'retain' operation (advance the cursor N characters without change) is crucial — it encodes context about where edits happen.", "compose and transform are the two operations that make a Delta format OT-compatible."],
    },
    {
      id: "q-rt-18",
      type: "multiple-choice",
      difficulty: "hard",
      question: "ProseMirror represents documents as an immutable tree of nodes (paragraph, text, heading, etc.) rather than a flat string. How does this tree structure affect collaborative editing compared to flat-string models?",
      options: ["Tree structures are slower to render but easier to transmit over WebSocket", "Operations on tree nodes (split node, join nodes, wrap in list) require more sophisticated transformation logic than character-level insertions, but the tree enables semantic conflict resolution (e.g., two users cannot independently wrap the same paragraph in different list types in a way that creates invalid document structure)", "Tree structures prevent any conflicts since each node is independently editable", "ProseMirror uses a flat string internally and only renders as a tree"],
      correctAnswer: 1,
      explanation: "Flat-string OT handles only character insert/delete. Rich document models like ProseMirror have structural operations: splitNode, joinNode, setNodeAttribute, liftNode (remove wrapping), wrapInNode (add list/blockquote). These require more complex OT transformation functions. However, the tree model enables schema-aware conflict resolution — ProseMirror's schema defines what node types are valid children, so the OT layer can reject or auto-fix operations that would violate document schema (e.g., a table cell inside a list item). This is why ProseMirror is used by platforms like Atlassian Confluence, Notion, and NYT that need structured, schema-validated collaborative documents.",
      hints: ["With a flat string, all you can conflict on is 'who inserted what where'. With a tree, you can conflict on 'what is this node's type, parent, or attributes'.", "Schema validation in ProseMirror means the document can never be in an invalid state — even after merging concurrent structural changes."],
    },
  ],

  "sdi-rt-spreadsheet": [
    {
      id: "q-rt-19",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In Google Sheets, two users simultaneously edit cell A1 and cell B1, where B1 contains the formula =A1*2. What concurrency challenge does this formula dependency create compared to a plain-text document?",
      options: ["Formula cells cannot be edited by multiple users simultaneously and are locked automatically", "The formula dependency graph must be re-evaluated after every merge, and if A1's new value conflicts with B1's expected input type, the system must decide which edit to prioritize", "Formulas are converted to static values during collaborative sessions to avoid dependency tracking", "Spreadsheets use last-write-wins per cell, so the formula always overwrites the data"],
      correctAnswer: 1,
      explanation: "Spreadsheet collaboration adds a dependency graph layer on top of cell-level OT. When A1 is edited, all cells with formulas depending on A1 must be re-evaluated. In concurrent edits, the system must: (1) merge the cell value changes using OT or last-write-wins; (2) topologically sort the dependency graph; (3) re-evaluate all affected formula cells in order. Conflicts become more complex: if user A deletes a row that user B's formula references, the formula becomes invalid (#REF! error). Google Sheets handles this by keeping deleted cells as tombstones for formula resolution. Circular dependency detection must also account for concurrent formula changes.",
      hints: ["A plain-text document has no semantic dependencies between its parts — a spreadsheet is a live computation graph.", "Think of it as: merging cell edits is the easy part; re-evaluating the dependency DAG consistently across all clients is the hard part."],
    },
  ],

  "sdi-rt-whiteboard": [
    {
      id: "q-rt-20",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a Figma or Miro-style collaborative whiteboard, objects exist on a 2D canvas with a z-order (stacking order). Two users simultaneously bring different objects to the front. How should the z-order conflict be resolved?",
      options: ["Reject the second operation since z-order is a global property", "Use a fractional indexing scheme for z-order values; each 'bring to front' assigns a new fractional value greater than the current maximum, allowing both operations to be applied without conflict", "Use last-write-wins based on server timestamp for all z-order changes", "Lock the entire canvas z-order index while any user is performing a z-order operation"],
      correctAnswer: 1,
      explanation: "Integer z-order indices (0, 1, 2, ...) require renumbering all objects when inserting between existing ones, making concurrent z-order operations conflict-prone. Figma uses fractional indexing: each object has a floating-point z-order key. 'Bring to front' assigns max_z + 1.0; 'send to back' assigns min_z - 1.0; 'bring forward one step' assigns the average of the object and the one above it. This is a CRDT-friendly approach — two concurrent 'bring to front' operations each assign a new maximum, and the object with the higher assigned value ends up on top without any coordination. Keys are periodically renormalized when they become too close together (floating-point precision limit).",
      hints: ["Fractional indexing is the same technique used in Notion's block ordering and Figma's layer ordering.", "Two concurrent 'bring to front' operations assign different new max values — both succeed, and the tie is broken by the value magnitude."],
    },
    {
      id: "q-rt-21",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In a collaborative drawing application like Miro, a user draws a stroke consisting of 500 points over 2 seconds. What is the most efficient strategy for broadcasting this stroke to other users in real-time?",
      options: ["Wait until the stroke is complete, then send all 500 points as a single message", "Send individual point events for every mouse move event (~60/second)", "Stream intermediate 'stroke-in-progress' events with batched points (e.g., every 50ms), followed by a final 'stroke-complete' event with the full stroke and a stable ID", "Store the stroke locally and sync only when the user explicitly saves"],
      correctAnswer: 2,
      explanation: "Neither extreme works well: waiting for completion adds 2 seconds of perceived lag for other users; sending every mouse event (60 events/second) generates enormous WebSocket traffic and overwhelms other clients. The standard approach (used by Miro, FigJam, and similar tools) is: send batched in-progress stroke segments every 50-100ms so other users see the stroke forming in near-real-time; when the stroke is completed, send a final authoritative event with a stable ID and the complete stroke data (which may be simplified/smoothed). The final event allows the system to replace all the provisional in-progress events with the canonical stroke, enabling clean version history.",
      hints: ["The 'stroke in progress' events are ephemeral — they exist only for live preview. The final stroke event is what goes into the document's persistent CRDT state.", "Throttling to 50ms batches reduces 60 events/second to 20 events/second, a 3x reduction with minimal visible latency impact."],
    },
  ],

  "sdi-rt-lww-vector-clocks": [
    {
      id: "q-rt-22",
      type: "true-false",
      difficulty: "medium",
      question: "Last-Write-Wins (LWW) using wall-clock timestamps is a safe conflict resolution strategy for distributed collaborative editing because modern servers have clock synchronization accurate to within 1 millisecond via NTP.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Wall-clock timestamps are unreliable for ordering distributed events even with NTP. NTP synchronization accuracy varies from ~1ms on a LAN to ~100ms over the internet, meaning two writes that appear simultaneous to humans can have their order reversed by clock skew. Additionally, clocks can be set backwards (by NTP corrections or manual intervention), violating monotonicity. The correct tool is Lamport clocks (logical clocks that increment on every send/receive) or vector clocks (which track causality per node). Lamport timestamps provide a total order consistent with causality; vector clocks reveal true concurrency. Production systems like Cassandra use hybrid logical clocks (HLC) that combine wall-clock time with logical counters for a best-of-both-worlds approach.",
      hints: ["Two events on different machines with timestamps 1ms apart might actually be concurrent or even in reverse causal order.", "Lamport's insight: you don't need a real clock to order events; you just need a counter that advances consistently."],
    },
    {
      id: "q-rt-23",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A PN-Counter CRDT is used to track the number of 'likes' on a collaborative document. It consists of two G-Counters: P (increments) and N (decrements). What is the correct way to read the current value and why can the value temporarily appear negative?",
      options: ["Value = max(P - N, 0); the floor at zero prevents negative display values", "Value = sum(P) - sum(N); this can temporarily go negative because decrement operations may be observed before their corresponding increment operations due to network reordering", "Value = sum(P) only; decrements are handled by the database, not the CRDT", "Value = sum(P) - sum(N) clamped to the shard's local view, preventing cross-shard inconsistency"],
      correctAnswer: 1,
      explanation: "A PN-Counter's value is sum(P_vector) - sum(N_vector). Because CRDTs allow operations to be applied in any order (causal or not, in operation-based variants), a decrement operation may be observed at a replica before the increment that logically preceded it (due to message reordering or network partitions). This can make the apparent value go negative transiently. For a 'likes' counter, this is acceptable because eventual consistency will reconcile. For a shopping cart item count, you may want to apply application-level constraints (don't allow decrement if local view shows 0). The beauty of the PN-Counter is that despite these transient anomalies, all replicas converge to the correct total.",
      hints: ["Eventual consistency means 'correct eventually' not 'correct always' — transient negative values are a known tradeoff.", "The invariant is convergence: once all updates propagate, sum(P) - sum(N) is the same at all replicas."],
    },
  ],

  "sdi-rt-merkle-sync": [
    {
      id: "q-rt-24",
      type: "multiple-choice",
      difficulty: "hard",
      question: "How do Merkle trees enable efficient state synchronization between two replicas of a collaborative document without transferring the entire document?",
      options: ["Merkle trees compress the document using a tree-based Huffman encoding", "Each node in the Merkle tree hashes the content below it; two replicas compare root hashes first, then recursively compare subtree hashes, transferring only the leaf nodes (data chunks) where hashes differ", "Merkle trees store operation logs in a balanced BST for O(log n) lookup", "Replicas exchange only the top-level Merkle root and use it as a version identifier for cache invalidation"],
      correctAnswer: 1,
      explanation: "A Merkle tree (hash tree) partitions the document into chunks and builds a binary tree of hashes: each leaf is hash(chunk_i); each internal node is hash(left_child || right_child); the root summarizes the entire document. Two replicas compare their root hashes: if equal, they are identical (done). If different, they descend into the left and right subtrees, comparing child hashes to identify which subtrees differ, until they reach leaf-level differences. Only the differing chunks need to be transferred. This reduces synchronization from O(document_size) to O(diff_size * log(document_size)). Used in Git (object database), BitTorrent (piece verification), and IPFS (content addressing).",
      hints: ["The root hash alone tells you if two replicas are identical — fast equality check in O(1).", "The tree structure turns 'find what's different' into a binary search, reducing communication to the minimum necessary."],
    },
  ],

  "sdi-rt-multiregion": [
    {
      id: "q-rt-25",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A globally distributed collaborative document service routes users to their nearest region (US-East, EU-West, APAC). Two users in different regions edit the same document concurrently. What is the fundamental challenge with multi-region OT compared to single-region OT?",
      options: ["Inter-region bandwidth costs make it prohibitively expensive to synchronize operations", "OT requires a single total ordering of operations, but multi-region systems have higher latency between regions, making it expensive to achieve consensus on ordering; CRDTs are often preferred for multi-region because they do not require global ordering", "Multi-region systems cannot use WebSockets due to BGP routing limitations", "Different regions use different OT algorithms that are incompatible with each other"],
      correctAnswer: 1,
      explanation: "Single-server OT works because the server imposes a canonical total order on operations instantly (local memory). In multi-region, achieving total order requires cross-region coordination for every operation — a 150ms+ round trip for US-East to APAC consensus on every keystroke is unacceptable. Solutions include: (1) designating one region as the primary for ordering and accepting higher latency for users in other regions; (2) using CRDTs which do not require global ordering and can merge independently in each region; (3) using hybrid approaches where operations are applied locally without ordering (CRDT-style) and then reconciled. Figma and Notion (both CRDT-based) handle multi-region more naturally than Google Docs (OT-based).",
      hints: ["The speed of light puts a hard lower bound on cross-region round-trip latency: ~70ms US to Europe, ~150ms US to Asia.", "CRDTs are 'order-free' by design — each region can apply operations in arrival order and still converge."],
    },
  ],

  "sdi-rt-code-collab": [
    {
      id: "q-rt-26",
      type: "multiple-choice",
      difficulty: "medium",
      question: "VS Code Live Share enables collaborative code editing with real-time syntax highlighting and Language Server Protocol (LSP) diagnostics. What unique challenge does LSP integration introduce compared to plain-text collaboration?",
      options: ["LSP requires a separate WebSocket connection per user for each file", "LSP requests (hover, autocomplete, go-to-definition) reference document positions that may have changed due to concurrent edits by the time the LSP server responds, requiring position remapping", "LSP is stateless and does not support collaborative sessions", "LSP diagnostics are user-specific and cannot be shared across a collaborative session"],
      correctAnswer: 1,
      explanation: "LSP operations are position-based: 'give me the hover tooltip at line 42, character 17'. In a collaborative session, while the LSP server is processing the request (which may take 50-200ms), other users may have inserted or deleted lines, changing what is at position (42, 17). VS Code Live Share solves this by: (1) always routing LSP requests through the host's LSP server (the host has the authoritative document state); (2) transforming response positions before displaying them to guests. Semantic conflicts (e.g., two users simultaneously rename the same function in different ways) require language-aware merge strategies, not just character-level OT.",
      hints: ["LSP is document-position-sensitive — unlike spell-check which works on the final text, LSP responses are anchored to specific locations that can move.", "VS Code Live Share guests' keystrokes are tunneled to the host's language server, bypassing this issue entirely."],
    },
  ],

  "sdi-rt-bandwidth-encoding": [
    {
      id: "q-rt-27",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A collaborative document generates ~100 text operations per second across all users. Each operation is currently serialized as a JSON object averaging 200 bytes. What bandwidth optimizations should be considered to scale to 10,000 concurrent document sessions?",
      options: ["Switch from WebSocket to HTTP/2 multiplexing to reduce connection overhead", "Use binary encoding (Protocol Buffers or MessagePack) to reduce per-operation size by 3-5x, apply delta compression to send only changed fields, and batch multiple operations into a single WebSocket frame", "Use gzip compression on the HTTP layer, which WebSocket already provides", "Switch to UDP-based transport for lower latency, accepting occasional packet loss"],
      correctAnswer: 1,
      explanation: "JSON is human-readable but verbose: field names are repeated every message, numbers are text-encoded, and there is no schema compression. Protocol Buffers (used by Google internally) or MessagePack can reduce message size by 3-5x by using compact binary encoding with field IDs instead of names. Delta compression encodes only fields that changed from the previous message (useful for cursor position streams). Batching multiple operations into a single WebSocket frame reduces per-message overhead. Together, these can reduce bandwidth by 5-10x. At 10,000 sessions x 100 ops/sec x 200 bytes = 200 MB/s; optimized to ~20-40 MB/s, which is much more manageable. gzip on WebSocket is a distinct feature (permessage-deflate extension) and does help, but binary encoding provides better baseline compression.",
      hints: ["JSON is a tax you pay for human-readability — at scale, binary encoding is worth the complexity.", "Batching trades latency for throughput: instead of 100 tiny frames/second, send 10 frames with 10 ops each."],
    },
  ],

  "sdi-rt-mobile-sync": [
    {
      id: "q-rt-28",
      type: "multiple-choice",
      difficulty: "medium",
      question: "A mobile collaborative document app must handle frequent connection interruptions (tunnel, subway, poor signal). What design pattern best handles this at the application level?",
      options: ["Disable collaborative editing on mobile and show a read-only view when the connection drops", "Implement an offline-first architecture: write all operations to a local durable log (SQLite), apply them to the local document immediately, and sync with the server opportunistically when connectivity is available", "Queue operations in memory and replay them on reconnection, accepting that changes made while offline will be lost if the app is killed", "Show a 'connection lost' modal that blocks editing until the connection is restored"],
      correctAnswer: 1,
      explanation: "Mobile connectivity is inherently unreliable. The offline-first pattern (championed by apps like Notion, Linear, and Figma mobile) stores all writes to a local durable store (SQLite on iOS/Android) before sending to the server. The local document is the immediate source of truth for the UI; the server is synced asynchronously. On reconnection, the buffered operation log is replayed. This requires: (1) a CRDT-based document model (making merge straightforward) or OT with offline buffering; (2) conflict detection and resolution for edits made offline; (3) background sync using platform APIs (iOS Background App Refresh, Android WorkManager). The key user-visible property: edits made offline are never lost, even if the app is killed.",
      hints: ["The principle: never lose user data. Persist locally first, sync second.", "SQLite as the local operation log gives you durability across app restarts — in-memory queues do not."],
    },
  ],

  "sdi-rt-locking": [
    {
      id: "q-rt-29",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What is the primary reason real-time collaborative editors like Google Docs use optimistic concurrency (no locking) rather than pessimistic locking (lock a section before editing)?",
      options: ["Pessimistic locking requires a relational database, which is too slow for real-time editing", "Locking blocks other users from editing locked sections, causing poor user experience for short edits; OT and CRDTs eliminate the need for locks by automatically merging concurrent edits without blocking", "Pessimistic locking cannot be implemented over WebSocket connections", "Google Docs is patent-protected from using locking algorithms"],
      correctAnswer: 1,
      explanation: "Pessimistic locking (as used in older collaborative editors like SharePoint document checkout) requires a user to explicitly lock a section before editing and release it after. This blocks all other users from editing that section, causing bottlenecks for any non-trivial editing scenario (e.g., two people editing different sentences in the same paragraph). OT and CRDTs make locking unnecessary: they allow truly concurrent edits to the same content and automatically produce a consistent merged result. The only legitimate use case for section-level locking in modern collaborative editors is for heavyweight operations (e.g., 'currently running a script that reformats the entire document') where you want to prevent conflicting structural changes.",
      hints: ["Optimistic concurrency says: 'assume no conflict; if conflict occurs, merge it'. Pessimistic says: 'prevent conflict by blocking others'. For frequent small edits, blocking is terrible UX.", "Spreadsheet cell locking (Sheets does optionally lock ranges) is a domain-specific pessimistic lock — appropriate when two users independently modifying the same formula cell has unclear semantics."],
    },
  ],

  "sdi-rt-video-annotation": [
    {
      id: "q-rt-30",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In a collaborative video annotation tool (e.g., Frame.io), a comment is anchored to a specific video timecode (e.g., 01:23.456). Two users simultaneously add comments at timecodes 01:23.100 and 01:23.200. How should the comment list be ordered, and what CRDT structure is most appropriate?",
      options: ["Use a first-come-first-served server queue; the server's receive order determines comment position in the list", "Use a CRDT-based ordered list where each comment is assigned a unique (clientID, timestamp) identifier and sorted by (video_timecode, clientID) to produce a deterministic total order without coordination", "Lock the comment panel while any user is adding a comment to prevent ordering conflicts", "Display comments in server-receive order, which naturally matches video playback order due to NTP synchronization"],
      correctAnswer: 1,
      explanation: "Video annotation comments need a total order: primarily by timecode (the semantic ordering), with tie-breaking for comments at the same timecode. A CRDT-ordered list (like a Logoot/LSEQ structure) assigns each comment a unique (timecode, clientID, counter) composite key. Sorting by this composite key gives a deterministic total order: comments at earlier timecodes come first; for same-timecode comments, the clientID tie-breaks consistently. This allows any replica to sort the comment list identically without coordination. The structure is also CRDT-friendly: insertions and deletions commute because each comment has a unique stable ID. Frame.io, Vimeo Review, and similar tools use this pattern, with the additional complexity of 'floating' comments when the video is re-cut and timecodes shift.",
      hints: ["Timecode is the primary sort key (semantic order); the clientID or counter is the tie-breaker for same-timecode conflicts.", "The CRDT property needed here is: any two replicas that have seen the same set of comment insertions produce the same sorted list, regardless of insertion order."],
    },
  ],
};

registerQuestions(questions);

export default questions;
