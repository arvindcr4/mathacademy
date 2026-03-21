import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "sdi-dist-consensus": [
    {
      id: "q-sdi-dist-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In Raft consensus, which condition must a candidate satisfy to win a leader election?",
      options: [
        "Receive votes from all nodes in the cluster",
        "Receive a majority of votes AND have a log at least as up-to-date as each voter",
        "Receive a majority of votes regardless of log state",
        "Have the longest log among all candidates",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Understand Raft's election safety goal.**\nRaft's leader election is designed so that the elected leader has all previously committed log entries. This property, called election safety, prevents the scenario where a newly elected leader overwrites committed entries from a previous term.\n\n**Step 2: Identify what makes a log "more up-to-date."**\nA voter's log is considered more up-to-date than a candidate's if either (a) the voter's last log term is higher, or (b) the terms are equal and the voter's last log index is greater. A voter rejects a candidate whose log is less up-to-date.\n\n**Step 3: Apply the combined condition.**\nThe winning condition requires two things simultaneously: a majority of votes (quorum) AND the log up-to-date check. Both conditions together guarantee the elected leader has all committed entries. This is why etcd and CockroachDB, which use Raft, maintain strong safety guarantees.`,
      hints: [
        "Raft's election safety property guarantees something specific about the winner's log — what invariant must hold?",
        "A voter rejects a candidate with a stale log. What are the two criteria for comparing log freshness?",
      ],
    },
    {
      id: "q-sdi-dist-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "How many nodes are required to tolerate $f$ crash failures in both Paxos and Raft?",
      options: ["$f + 1$", "$2f$", "$2f + 1$", "$3f + 1$"],
      correctAnswer: 2,
      explanation: `**Step 1: Determine the quorum size needed.**\nTo make progress, a cluster must be able to form a quorum (a majority of nodes) even while $f$ nodes have crashed. The quorum size must be $f + 1$, because:\n\\[\nf + 1 + f = 2f + 1\\]\nWith $2f + 1$ total nodes, a quorum of $f + 1$ is always reachable — at worst, the $f$ crashed nodes and $f$ healthy nodes form two groups, and the $f + 1$ healthy nodes win.\n\n**Step 2: Verify quorum intersection.**\nAny two quorums overlap by at least one node when the cluster has $2f + 1$ nodes:\n\\[\n\\text{Quorum}_1 + \\text{Quorum}_2 > 2f + 1\\]\nThis overlap guarantees that no two disjoint quorums can make conflicting decisions, preserving safety.`,
      hints: [
        "With $f$ crashed nodes, what is the minimum cluster size that still guarantees a majority can be reached?",
        "The formula ensures any two quorums overlap by at least one node. What cluster size guarantees this?",
      ],
    },
    {
      id: "q-sdi-dist-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Practical Byzantine Fault Tolerance (PBFT) requires a minimum of how many total nodes to tolerate $f$ Byzantine (arbitrarily faulty) nodes?",
      options: ["$2f + 1$", "$3f + 1$", "$4f + 1$", "$f + 1$"],
      correctAnswer: 1,
      explanation: `**Step 1: Understand why Byzantine failures require more nodes.**\nUnlike crash failures, a Byzantine node can send different, contradictory messages to different peers. To reach agreement among honest nodes despite $f$ liars, you need enough honest nodes to always form a majority.\n\n**Step 2: Derive the minimum node count.**\nWith $3f + 1$ total nodes, there are at least $2f + 1$ honest nodes. Even if $f$ nodes are Byzantine and send conflicting messages, the honest majority ($2f + 1$) can still agree on a value:\n\\[\n3f + 1 - f = 2f + 1\\]\n\n**Step 3: Note the relationship to the FLP impossibility.**\nThe FLP result proves no deterministic algorithm can solve consensus in a fully asynchronous network with even one crash failure. PBFT and similar protocols bypass this by using timeouts and requiring $3f + 1$ nodes to tolerate $f$ Byzantine faults.`,
      hints: [
        "Byzantine nodes can send different messages to different peers. How many honest nodes do you need to guarantee an honest majority despite $f$ liars?",
        "The FLP impossibility applies to purely asynchronous networks — how do practical Byzantine fault tolerant systems work around it?",
      ],
    },
    {
      id: "q-sdi-dist-4",
      type: "true-false",
      difficulty: "medium",
      question:
        "Two-Phase Commit (2PC) is a non-blocking protocol: if the coordinator crashes after sending 'prepare', participants can safely abort the transaction on their own.",
      correctAnswer: "False",
      explanation: `**Step 1: Identify what happens after a 'yes' vote.**\nIn phase 1, each participant votes either "yes" (prepared to commit) or "no" (abort). Once a participant votes "yes," it enters a locked state — it cannot unilaterally commit or abort. It has promised to honor the coordinator's decision but has not yet received that decision.\n\n**Step 2: Analyze what happens if the coordinator crashes.**\nIf the coordinator crashes after the prepare phase and before sending commit or abort in phase 2, the participants are left waiting indefinitely. They lack the information needed to make a safe, unilateral decision.\n\n**Step 3: Confirm the blocking nature.**\nThis is why 2PC is classified as a blocking protocol. Three-Phase Commit (3PC) and Paxos-based commit protocols are designed to remove this blocking property by adding an extra phase that allows participants to timeout safely.`,
      hints: [
        "After voting 'yes', a participant has given up its right to abort unilaterally — what information is it missing if the coordinator disappears?",
        "Think about whether participants have enough information to make a safe decision without hearing from the coordinator.",
      ],
    },
  ],

  "sdi-dist-clocks": [
    {
      id: "q-sdi-dist-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What ordering guarantee do Lamport logical clocks provide?",
      options: [
        "Real-time (wall-clock) ordering of all events",
        "If event $A$ happened-before event $B$, then $\\text{clock}(A) < \\text{clock}(B)$",
        "If $\\text{clock}(A) < \\text{clock}(B)$, then event $A$ happened-before event $B$",
        "Both (B) and (C) simultaneously",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Recall Lamport's clock update rule.**\nA Lamport logical clock increments as follows: on a send event, $\\text{clock} = \\text{clock} + 1$; on receive, $\\text{clock} = \\max(\\text{local}, \\text{received}) + 1$. This rule ensures the clock always reflects causal ordering.\n\n**Step 2: Confirm the one-way guarantee.**\nLamport clocks guarantee: if $A \\rightarrow B$ (causally precedes), then $\\text{clock}(A) < \\text{clock}(B)$. This is the contrapositive of the rule that a send always precedes its matching receive in the causal chain.\n\n**Step 3: Understand the converse does NOT hold.**\nThe converse — "if $\\text{clock}(A) < \\text{clock}(B)$ then $A \\rightarrow B$" — is false. Two events with $\\text{clock}(A) < \\text{clock}(B)$ could be concurrent (causally unrelated), such as two nodes that never communicate. This is precisely why vector clocks were invented.`,
      hints: [
        "Lamport's rule: on send, increment; on receive, take max and increment. Does this let you infer causality from timestamps alone?",
        "Consider two nodes that never communicate — their timestamps can be compared numerically, but what does that actually tell you?",
      ],
    },
    {
      id: "q-sdi-dist-6",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Given vector clocks $\\text{VC}(A) = [2, 1, 0]$ and $\\text{VC}(B) = [1, 2, 0]$, what is their causal relationship?",
      options: [
        "$A$ happened-before $B$",
        "$B$ happened-before $A$",
        "$A$ and $B$ are concurrent",
        "$A$ and $B$ are identical events",
      ],
      correctAnswer: 2,
      explanation: `**Step 1: Recall the vector clock comparison rule.**\nFor two vector clocks $\\text{VC}(A)$ and $\\text{VC}(B)$: we say $A \\rightarrow B$ (A happened-before B) iff every component of $\\text{VC}(A)$ is $\\leq$ the corresponding component of $\\text{VC}(B)$, and at least one component is strictly less.\n\n**Step 2: Compare the vectors component by component.**\nComparing $\\text{VC}(A) = [2, 1, 0]$ and $\\text{VC}(B) = [1, 2, 0]$:\n\\[\n\\text{Component 0: } & 2 \\ngeq 1 \\\\ \n\\text{Component 1: } & 1 \\leq 2 \\\\ \n\\text{Component 2: } & 0 = 0\n\\]\nOn component 0, $A$ is ahead; on component 1, $B$ is ahead. Neither vector is everywhere-less-than-or-equal to the other.\n\n**Step 3: Conclude they are concurrent.**\nSince neither dominates the other, $A$ and $B$ are concurrent — neither causally precedes the other. Vector clocks detect concurrency without false positives, unlike Lamport clocks.`,
      hints: [
        "For $A \\rightarrow B$, every component of $\\text{VC}(A)$ must be $\\leq$ every component of $\\text{VC}(B)$, with at least one strictly less.",
        "Compare component by component: what happens when $A$ wins on one dimension but $B$ wins on another?",
      ],
    },
    {
      id: "q-sdi-dist-7",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Google Spanner achieves external consistency (linearizability) across globally distributed data centers using TrueTime. How does it prevent a transaction from being visible before it is committed?",
      options: [
        "It uses a global lock manager to serialize all transactions",
        "It waits for the TrueTime uncertainty interval to pass before a commit is visible (commit-wait)",
        "It uses GPS clocks for exact synchronization so uncertainty is zero",
        "It replicates every write synchronously to all data centers before returning",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Understand TrueTime's bounded uncertainty.**\nTrueTime does not return a single timestamp — instead, it returns an interval $[\\text{earliest}, \\text{latest}]$ that bounds the true physical time. This uncertainty is small (typically milliseconds via GPS and atomic clocks) but never zero in a distributed system.\n\n**Step 2: Apply commit-wait.**\nSpanner's commit-wait rule: after a transaction commits at timestamp $T$, the server waits until:\n\\[\n\\text{TrueTime.now().latest} > T\\]\nThis guarantees that any subsequent transaction assigned a timestamp will be assigned a value greater than $T$, so no later transaction can be ordered before the committed one.\n\n**Step 3: Connect to external consistency.**\nCommit-wait ensures that a committed transaction's timestamp is provably in the past for all replicas, achieving linearizability (external consistency) across regions without requiring synchronous cross-region replication for every write.`,
      hints: [
        "TrueTime gives an interval $[\ \\text{earliest}, \\text{latest} \\ ]$, not an exact time — what does Spanner do to ensure a committed timestamp is unambiguously in the past?",
        "The key insight: if you wait long enough, the uncertainty window passes and the committed timestamp becomes globally 'safe' for ordering.",
      ],
    },
  ],

  "sdi-dist-consistency-models": [
    {
      id: "q-sdi-dist-8",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which consistency model guarantees that every operation appears to take effect atomically at some point between its invocation and completion, and reads always return the latest write?",
      options: [
        "Sequential consistency",
        "Linearizability (strong consistency)",
        "Causal consistency",
        "Eventual consistency",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Parse the definition carefully.**\nThe phrase "appears to take effect atomically at some point between its invocation and completion" describes a real-time (wall-clock) constraint — the operation must be ordered relative to other operations based on actual time.\n\n**Step 2: Compare with other models.**\nSequential consistency respects program order but not real-time — operations on different processes can be interleaved arbitrarily in time. Causal consistency preserves only causal ordering (happened-before relationships). Eventual consistency offers no ordering guarantees at all.\n\n**Step 3: Identify the model.**\nThe combination of real-time atomic ordering AND reads returning the latest write is exactly linearizability (also called strong consistency or atomic consistency). ZooKeeper and etcd both provide linearizable reads.`,
      hints: [
        "The key phrase is 'between its invocation and completion' — this is the real-time constraint that distinguishes linearizability from sequential consistency.",
        "Which distributed coordination services (used for leader election and distributed locking) are famous for providing this guarantee?",
      ],
    },
    {
      id: "q-sdi-dist-9",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "CRDTs (Conflict-free Replicated Data Types) are most commonly used to guarantee which consistency model?",
      options: [
        "Linearizability",
        "Sequential consistency",
        "Eventual consistency",
        "Read-your-writes consistency",
      ],
      correctAnswer: 2,
      explanation: `**Step 1: Understand what CRDTs guarantee.**\nCRDTs are data structures designed so that any two replicas can merge their states in any order, at any time, and converge to the same final value — without requiring coordination or conflict resolution.\n\n**Step 2: Recognize the convergence property.**\nCRDT operations are commutative, associative, and idempotent. These three properties ensure that no matter how updates arrive or in what order, all replicas eventually reach the same state. This is the definition of eventual consistency.\n\n**Step 3: Note practical deployments.**\nDynamoDB, Cassandra, and Riak use CRDT-inspired conflict resolution strategies. CRDTs are chosen precisely when you need convergence without coordination, which is eventual consistency.`,
      hints: [
        "CRDTs are specifically designed for systems where replicas can diverge temporarily — what property guarantees they eventually agree?",
        "The 'conflict-free' in CRDT means merges always succeed without user-defined resolution — which consistency model does this support?",
      ],
    },
    {
      id: "q-sdi-dist-10",
      type: "true-false",
      difficulty: "medium",
      question:
        "Read-your-writes consistency can be achieved by always routing a client's read requests to the same replica that received the client's writes.",
      correctAnswer: "True",
      explanation: `**Step 1: Define read-your-writes consistency.**\nThis consistency model guarantees that after a client writes a value, any subsequent read by that same client reflects that write — the client always sees its own mutations.\n\n**Step 2: Explain the sticky sessions approach.**\nOne implementation is session affinity (sticky sessions): once a write is routed to replica $R$, all subsequent reads from that client are also routed to $R$. Since $R$ has the write in its local state (or will replicate it locally before responding), the read always sees the client's own writes.\n\n**Step 3: Note the alternative approach.**\nAnother implementation uses version-stamped reads: the client sends the write's version or timestamp with subsequent reads, and the replica waits until it has replicated up to that version before responding. Both approaches achieve the same guarantee.`,
      hints: [
        "Think about what 'sticky sessions' or 'session tokens' accomplish in terms of read routing.",
        "If you always read from the node you wrote to, can your read ever miss your own write?",
      ],
    },
    {
      id: "q-sdi-dist-11",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which consistency model guarantees that operations causally related (write happened-before read) are observed in causal order, while concurrent operations may be seen in different orders by different nodes?",
      options: [
        "Linearizability",
        "Sequential consistency",
        "Causal consistency",
        "Monotonic read consistency",
      ],
      correctAnswer: 2,
      explanation: `**Step 1: Understand what causal consistency preserves.**\nCausal consistency maintains the happens-before relationship: if write $W$ causally precedes read $R$ (e.g., $W$ provides the data $R$ reads), then all nodes must observe $W$ before $R$. Causal ordering is strictly weaker than linearizability because it does not impose real-time ordering on unrelated (concurrent) operations.\n\n**Step 2: Contrast with concurrent operations.**\nOperations with no causal relationship (concurrent operations) may be observed in different orders by different nodes. For example, two nodes independently writing to the same key can be seen in either order by different observers.\n\n**Step 3: Identify the model.**\nThis is causal consistency. MongoDB sessions track a cluster time token and operation time to enforce causally consistent reads.`,
      hints: [
        "Causal ordering preserves the happens-before relationship, not the real-time order — what does this mean for concurrent operations?",
        "MongoDB sessions use a 'cluster time' token to enforce this — what does 'concurrent' mean in the vector-clock sense?",
      ],
    },
  ],

  "sdi-dist-failure-modes": [
    {
      id: "q-sdi-dist-12",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which failure model is the most powerful (allows the most adversarial behavior) and requires the most nodes to tolerate?",
      options: [
        "Crash-stop (fail-stop)",
        "Crash-recovery",
        "Omission failures",
        "Byzantine failures",
      ],
      correctAnswer: 3,
      explanation: `**Step 1: Rank failure modes by adversarial power.**\nCrash-stop is the simplest: a node halts and sends no further messages. Crash-recovery adds the ability to rejoin with persisted state. Omission failures sit between crash and Byzantine: a node may drop some messages but otherwise behaves correctly. Byzantine failures are the most general: a faulty node can behave arbitrarily, including sending different messages to different peers, lying, delaying, or replaying.\n\n**Step 2: Connect to node requirements.**\nByzantine fault tolerance requires the most nodes ($3f + 1$ to tolerate $f$ Byzantine nodes) because the system must function correctly even when $f$ nodes actively work against the others. Most distributed databases assume crash failures only; blockchains must assume Byzantine failures since participants may be malicious.`,
      hints: [
        "Rank these failure modes by how much the faulty node can do: halt silently, restart with old state, send anything to anyone.",
        "Which model do blockchains need to handle, given that nodes may be actively malicious?",
      ],
    },
    {
      id: "q-sdi-dist-13",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which combination of patterns best prevents cascading failures when one downstream service becomes slow?",
      options: [
        "Retry with exponential backoff only",
        "Circuit breaker + bulkhead + timeout + backpressure",
        "Increase thread pool size to absorb more requests",
        "Deploy more instances of the slow service",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Understand the cascading failure mechanism.**\nA slow downstream dependency causes upstream threads to block waiting for responses. The thread pool exhausts, the request queue fills, and upstream services become slow — propagating the failure up the call chain.\n\n**Step 2: Match each pattern to its protective role.**\nThe four-pattern defense works as follows:\n\\begin{align}\n\\text{Timeout} &\\rightarrow \\text{frees threads from hanging on slow calls} \\\\\n\\text{Circuit Breaker} &\\rightarrow \\text{open circuit stops flow when error rate is high} \\\\\n\\text{Bulkhead} &\\rightarrow \\text{isolate thread pools per dependency, limit blast radius} \\\\\n\\text{Backpressure} &\\rightarrow \\text{shed load before queues overflow} \n\\end{align}\n\n**Step 3: Recognize why retries alone are dangerous.**\nRetries without backoff or circuit breakers create retry storms that can amplify a transient failure into a sustained outage.`,
      hints: [
        "Why does increasing thread pool size make cascading failures worse rather than better?",
        "Think about what each pattern prevents: circuit breaker stops the flow, bulkhead limits blast radius, timeout frees threads, backpressure controls inflow rate.",
      ],
    },
    {
      id: "q-sdi-dist-14",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A network partition causes two database nodes to both believe they are the master and accept writes independently. What is this problem called, and what is the standard prevention technique?",
      options: [
        "Split-brain; prevented by requiring a quorum (majority) of nodes to acknowledge writes",
        "Split-brain; prevented by using synchronous replication to all replicas",
        "Thundering herd; prevented by jitter in retry delays",
        "ABA problem; prevented by version numbers on all records",
      ],
      correctAnswer: 0,
      explanation: `**Step 1: Define split-brain.**\nSplit-brain occurs when a network partition allows multiple nodes to act as master simultaneously. Because neither partition can communicate with the other, both accept writes independently, leading to divergent, irreconcilable states when the partition heals.\n\n**Step 2: Explain quorum-based prevention.**\nThe standard prevention is requiring a quorum (majority of nodes) to acknowledge writes. With $2f + 1$ nodes, only one partition can form a quorum — the partition with $f + 1$ or more nodes. The minority partition cannot make progress, ensuring at most one master.\n\n**Step 3: Note STONITH as a complementary technique.**\nSTONITH (Shoot The Other Node In The Head) forcibly powers off a potentially split-brained node when uncertainty arises, used in HA clusters alongside quorum-based fencing.`,
      hints: [
        "If you require more than half the nodes to agree, can two separate partitions both form a quorum simultaneously?",
        "STONITH stands for 'Shoot The Other Node In The Head' — what problem does physically killing a node solve?",
      ],
    },
    {
      id: "q-sdi-dist-15",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Why do average (mean) latency metrics often fail to detect gray failures in distributed systems?",
      options: [
        "Averages are too expensive to compute in real time",
        "A small fraction of slow or failing requests is diluted by the majority of fast requests, masking degraded tail performance",
        "Averages always overestimate latency compared to percentiles",
        "Gray failures only affect throughput, not latency",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Define a gray failure.**\nA gray failure (partial failure) is one where some requests succeed, some are slow, and some fail — a gradual degradation rather than a total outage. Gray failures are hard to detect because the system appears partially healthy.\n\n**Step 2: Show why averages hide gray failures.**\nSuppose $99\\%$ of requests complete in $10$ ms but $1\\%$ take $10{,}000$ ms:\n\\[\n\\text{Mean} = 0.99 \\cdot 10 + 0.01 \\cdot 10{,}000 \\approx 110 \\text{ ms}\n\\]\nThe mean is dominated by the fast majority. Meanwhile, the $p99$ latency is $10{,}000$ ms — a customer-visible degradation the mean completely fails to capture.\n\n**Step 3: Note the industry standard.**\nAmazon and Google use p99/p999 latency percentiles as the gold standard for SLOs, specifically to catch gray failures that mean latency misses.`,
      hints: [
        "If $1\\%$ of requests take $10$ seconds but $99\\%$ take $10$ ms, what is the mean? What is the $p99$?",
        "Amazon's famous finding: even a small percentage of slow responses causes significant customer-visible degradation.",
      ],
    },
  ],

  "sdi-dist-coordination": [
    {
      id: "q-sdi-dist-16",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary problem with using Redis SETNX for distributed locks, and how does Redlock address it?",
      options: [
        "SETNX is too slow; Redlock uses a faster in-memory protocol",
        "SETNX on a single node can fail if that node crashes, releasing the lock or making it unacquirable; Redlock acquires the lock on a majority of independent Redis nodes",
        "SETNX does not support TTL; Redlock adds expiry to locks",
        "SETNX is not atomic; Redlock uses Lua scripts to make it atomic",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Identify the single-node failure mode.**\nWith SETNX + TTL on a single Redis master, if the master crashes before replicating the lock state to its replica, and the replica is promoted to master, the lock is effectively lost. Another client can then acquire the same lock — a lock release bug.\n\n**Step 2: Describe how Redlock addresses it.**\nRedlock uses $N = 5$ independent Redis nodes (ideally on separate machines, separate availability zones). The client acquires the lock on a majority of them (at least $3$) before considering the lock held. Even if one or two nodes fail, the majority ensures the lock is unique. The TTL prevents indefinite lock holding if the client crashes.\n\n**Step 3: Note the safety debate.**\nRedlock's safety has been debated — its deterministic algorithm and lack of leader election make it different from Raft/Paxos. ZooKeeper ephemeral sequential nodes are often considered safer for critical distributed locking.`,
      hints: [
        "What happens to a Redis lock if async replication to the replica hasn't completed when the master crashes and the replica is promoted?",
        "Redlock's majority quorum is the same idea used in consensus protocols — why does majority ownership guarantee uniqueness?",
      ],
    },
    {
      id: "q-sdi-dist-17",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In ZooKeeper-based leader election using ephemeral sequential nodes, why do non-leader candidates watch the node just before them (chain watching) rather than all watching the current leader node?",
      options: [
        "ZooKeeper does not support watching non-leader nodes",
        "Chain watching prevents the herd effect — if all watch the leader node, all candidates wake up on leader failure and storm the ZooKeeper server simultaneously",
        "Watching the previous node reduces ZooKeeper storage overhead",
        "Only sequential nodes can be watched; the leader node is a permanent node",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Describe the naive approach and its problem.**\nIf all $N$ non-leader candidates watch the current leader node, when the leader fails, all $N$ candidates are notified simultaneously and try to become the new leader. This is the herd effect (thundering herd), which can overload ZooKeeper with a flood of requests at once.\n\n**Step 2: Explain chain watching as the solution.**\nWith chain watching, each candidate watches the ephemeral sequential node with the next-lower sequence number. When the leader fails, only the candidate immediately behind it (the one most likely to become the next leader) is notified. That candidate becomes leader, creates a new node, and the chain continues — only one candidate is active at a time.\n\n**Step 3: Quantify the improvement.**\nWith $N$ candidates, the naive approach generates $O(N)$ notifications on every leader change. Chain watching generates exactly $1$ notification, reducing ZooKeeper load from $O(N)$ to $O(1)$.`,
      hints: [
        "Imagine 100 candidates all watching one node — when that node is deleted, what happens to all 100 simultaneously?",
        "Chain watching means only the next-in-line is notified — how does this scale compared to everyone watching the leader?",
      ],
    },
    {
      id: "q-sdi-dist-18",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In the Saga pattern for distributed transactions, how does the system handle a failure partway through the sequence of local transactions?",
      options: [
        "It uses two-phase commit to atomically roll back all completed steps",
        "It executes compensating transactions in reverse order for all previously completed steps",
        "It retries the failed step indefinitely until it succeeds",
        "It marks the entire saga as failed and requires manual intervention",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Contrast Sagas with 2PC.**\nUnlike 2PC, which uses a centralized coordinator to manage a single commit/abort across all participants, the Saga pattern decomposes the transaction into a sequence of autonomous local transactions, each publishing a domain event that triggers the next step.\n\n**Step 2: Describe compensating transactions.**\nIf step $N$ fails, the saga executes compensating transactions for steps $N-1, N-2, \\dots, 1$ in reverse order. Each compensating transaction is a new forward transaction that semantically undoes the effect of the original (e.g., "cancel order" compensates "place order").\n\n**Step 3: Note the trade-offs.**\nSagas avoid the coordinator bottleneck and blocking nature of 2PC, making them well-suited for microservices. However, compensating transactions are not ACID rollbacks — they are best-effort semantic undos, and they must be idempotent.`,
      hints: [
        "Unlike 2PC which uses a single coordinator, Sagas decompose the problem — each step is a local transaction that can be individually undone.",
        "Think about what 'compensating' means — it's not a rollback in the ACID sense, it's a new forward transaction that reverses the business effect.",
      ],
    },
    {
      id: "q-sdi-dist-19",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a service mesh (e.g., Istio or Linkerd), where does the service mesh proxy run and what networking concerns does it handle?",
      options: [
        "As a centralized gateway that all traffic passes through; handles load balancing only",
        "As a sidecar proxy co-located with each service instance; handles retries, circuit breaking, mTLS, and observability",
        "As a DNS server that resolves service names to IP addresses",
        "As a centralized configuration server that pushes policies to services",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Explain the sidecar deployment model.**\nA service mesh deploys a sidecar proxy (e.g., Envoy in Istio, Linkerd's proxy) alongside each service instance in the same pod or VM. The sidecar intercepts all inbound and outbound traffic for that instance — not just traffic passing through a central gateway.\n\n**Step 2: Enumerate the concerns handled by the sidecar.**\nThe sidecar proxy handles cross-cutting networking concerns:\n\\begin{align}\n\\text{Retries} &\\rightarrow \\text{with configurable backoff} \\\\\n\\text{Circuit Breaking} &\\rightarrow \\text{open circuit on downstream failures} \\\\\n\\text{mTLS} &\\rightarrow \\text{mutual TLS for service-to-service encryption and authentication} \\\\\n\\text{Observability} &\\rightarrow \\text{metrics, traces, and logs for every request}\n\\end{align}\n\n**Step 3: Note the control plane.**\nThe control plane (e.g., Istio's istiod) pushes configuration to all sidecar proxies. This separation keeps networking concerns out of application code.`,
      hints: [
        "A sidecar is co-located with the application — not a centralized gateway — so it sees all traffic to/from one service instance.",
        "mTLS in the sidecar means the application doesn't need to implement TLS itself — the proxy handles it transparently.",
      ],
    },
  ],

  "sdi-dist-scalability-patterns": [
    {
      id: "q-sdi-dist-20",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "In CQRS (Command Query Responsibility Segregation), which statement best describes the relationship between the write model and the read model?",
      options: [
        "The write model and read model share the same database schema for consistency",
        "The write model is normalized and strongly consistent; the read model is denormalized, eventually consistent, and optimized for queries",
        "The read model handles both reads and writes; the write model is only for audit logging",
        "CQRS requires synchronous replication from write to read model before any command is acknowledged",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Describe the two models.**\nThe write model (command side) is responsible for enforcing business rules, maintaining integrity constraints, and processing updates. It is typically normalized and strongly consistent (e.g., a relational database with ACID transactions). The read model (query side) is denormalized and optimized for specific query patterns — such as Elasticsearch for full-text search or Redis for leaderboards.\n\n**Step 2: Explain the propagation model.**\nUpdates from the write model to the read model flow asynchronously (typically via events). The read model is therefore eventually consistent with respect to the write model — a read may not immediately reflect the latest write.\n\n**Step 3: Note the pairing with event sourcing.**\nCQRS is frequently paired with event sourcing, where the write model emits a stream of domain events that the read model consumes to build its projections.`,
      hints: [
        "Think about why e-commerce sites use separate databases for inventory management vs. product search/display.",
        "The read model is often updated by consuming events from the write side — what consistency guarantee does this provide?",
      ],
    },
    {
      id: "q-sdi-dist-21",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is a key downside of event sourcing compared to traditional state-based persistence?",
      options: [
        "Event sourcing cannot support audit logs or event replay",
        "Current state requires replaying the entire event log, and read models are eventually consistent",
        "Event sourcing requires 2PC for every write, increasing latency",
        "Event sourcing cannot be used with microservices architectures",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Describe how event sourcing stores state.**\nInstead of storing current state, event sourcing stores the full sequence of state-changing events (the event log). To reconstruct current state, you replay events from the beginning (or from the latest snapshot).\n\n**Step 2: Identify the two downsides.**\nFirst, if the event log is long, replaying all events is slow and resource-intensive. Periodic snapshots mitigate this by capturing compact state at intervals, reducing replay length. Second, because the read model is updated asynchronously from events (via projections), the read model is eventually consistent — reads may not yet reflect the latest committed events.\n\n**Step 3: Note the upsides for context.**\nThe benefits are a complete audit log, the ability to time-travel to any past state, and natural support for event-driven architectures.`,
      hints: [
        "If you store 5 years of financial transactions as events, how do you efficiently query the current account balance?",
        "Event sourcing naturally pairs with CQRS — why does the read model have an eventual consistency tradeoff?",
      ],
    },
    {
      id: "q-sdi-dist-22",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does TCP implement backpressure to prevent a fast sender from overwhelming a slow receiver?",
      options: [
        "TCP drops packets and relies on the sender to detect loss via timeouts",
        "TCP uses a receive window: the receiver advertises the amount of buffer space available, and the sender limits in-flight data accordingly",
        "TCP uses a centralized rate limiter to throttle all senders globally",
        "TCP pauses the sender for a fixed backoff interval whenever a packet is dropped",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Explain the sliding window mechanism.**\nTCP's flow control uses a receive window: the receiver embeds a window size field in every ACK, advertising how many bytes of receive buffer are available. The sender is prohibited from having more unacknowledged bytes in flight than the advertised window.\n\n**Step 2: Show how backpressure works dynamically.**\nIf the receiver's application is slow to consume data, its buffer fills and the window shrinks. When the window reaches zero, the sender is forced to pause transmission — this is built-in backpressure. As the receiver's application drains the buffer, the window reopens and the sender resumes.\n\n**Step 3: Connect to application-level backpressure.**\nReactive streams (RxJava, Project Reactor) implement the same principle at the application layer: consumers signal demand via $\\text{request}(n)$, and producers respect these demand signals, preventing queue overflow without packet loss.`,
      hints: [
        "The TCP receive window is dynamically adjusted — what happens when the receiver's buffer fills up completely?",
        "Reactive Streams' $\\text{request}(n)$ demand signal is the application-level equivalent of TCP's window advertisement.",
      ],
    },
    {
      id: "q-sdi-dist-23",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Strangler Fig pattern for migrating a monolith to microservices gets its name from a plant that gradually grows around a tree. What is the key mechanism of this pattern?",
      options: [
        "Rewrite the entire monolith as microservices in a single release, then switch over all at once",
        "A proxy or facade intercepts requests; new features and incrementally migrated features are routed to microservices while the rest goes to the monolith",
        "Extract the database from the monolith first, then migrate the application code",
        "Run the monolith and microservices in parallel indefinitely as active-active",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Describe the proxy-based interception.**\nA proxy or API gateway is placed in front of the monolith. All incoming traffic initially routes to the monolith. New features or incrementally migrated features are built as microservices, and the proxy is updated to route those specific requests to the new services instead.\n\n**Step 2: Explain the incremental migration.**\nOver time, more and more features are migrated: once a feature is moved to a microservice, the proxy routes its traffic there. The monolith shrinks as the microservices grow around it.\n\n**Step 3: Identify the key benefit.**\nThis enables zero-downtime, incremental migration without a risky big-bang cutover. The monolith and new system coexist during the transition, and the monolith is decommissioned only when all features have been migrated.`,
      hints: [
        "The key is incremental migration — you never have to stop traffic to switch from monolith to microservice for a given feature.",
        "What role does the proxy or API gateway play in managing which requests go to the old vs. new system?",
      ],
    },
  ],

  "sdi-dist-observability": [
    {
      id: "q-sdi-dist-24",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which of the three pillars of observability is best suited for understanding the flow of a single request across multiple microservices?",
      options: ["Logs", "Metrics", "Distributed traces", "Dashboards"],
      correctAnswer: 2,
      explanation: `**Step 1: Identify the three pillars.**\nThe three pillars of observability are:\n\\[\n\\text{Logs} \\rightarrow \\text{discrete events with context} \\\\\n\\text{Metrics} \\rightarrow \\text{aggregated numerical measurements over time} \\\\\n\\text{Distributed Traces} \\rightarrow \\text{the path of a request across services}\n\\]\n\n**Step 2: Explain why distributed traces are ideal for request flow.**\nA distributed trace assigns a single $\\text{trace}_\\text{id}$ to a request. Each service adds a span containing timing, metadata, and the $\\text{trace}_\\text{id}$. Tools like Jaeger and Zipkin visualize the full trace as a waterfall, making it easy to identify which service in a chain added the most latency.\n\n**Step 3: Note the limitations of the other pillars.**\nLogs help debug individual service behavior; metrics are used for alerting and dashboards but do not show per-request flow.`,
      hints: [
        "If a request touches 10 microservices and is slow, which observability signal shows you exactly which service added the most latency?",
        "Think about $\\text{trace}_\\text{id}$ propagation: how does a single identifier connect spans across service boundaries?",
      ],
    },
    {
      id: "q-sdi-dist-25",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why do high-traffic distributed systems typically sample only 1% of traces rather than capturing 100% of all requests?",
      options: [
        "Distributed tracing tools only support 1% sampling rates",
        "Capturing all traces generates enormous storage and processing overhead proportional to traffic volume, while 1% sampling preserves statistical accuracy for performance analysis",
        "100% tracing causes clock skew across services that invalidates trace timing",
        "Sampling is required by GDPR regulations to protect user privacy",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Calculate the data volume problem.**\nAt high traffic — say $1{,}000{,}000$ requests per second — and assuming each trace is $1$ KB:\n\\[\n\\text{100\\% sampling: } 1{,}000{,}000 \\text{ traces/s } \\times 1 \\text{ KB } = 1 \\text{ GB/s } \\approx 90 \\text{ TB/day}\n\\]\nAt $1\\%$ sampling, this drops to roughly $0.9$ TB/day — a orders-of-magnitude reduction.\n\n**Step 2: Assess whether 1% is sufficient.**\nFor statistical analysis of latency distributions, error rates, and performance profiling, $1\\%$ sampling provides sufficient accuracy. Tail-based sampling improves this further by selectively capturing errors and slow requests.\n\n**Step 3: Contrast head-based and tail-based sampling.**\nHead-based sampling decides whether to sample at request start (simple but may miss important outcomes). Tail-based sampling buffers requests and decides after seeing the outcome — capturing $100\\%$ of errors while sampling normal requests.`,
      hints: [
        "If you handle 1 million requests/second and each trace is 1 KB, what is the data volume at 100% vs 1% sampling?",
        "What is the difference between head-based sampling (decide at request start) and tail-based sampling (decide after seeing the outcome)?",
      ],
    },
    {
      id: "q-sdi-dist-26",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which term describes the actual measured value (e.g., $p99$ latency $= 180$ ms) as opposed to the target or contractual commitment?",
      options: [
        "SLO (Service Level Objective)",
        "SLA (Service Level Agreement)",
        "SLI (Service Level Indicator)",
        "Error budget",
      ],
      correctAnswer: 2,
      explanation: `**Step 1: Define each term precisely.**\n\\[\n\\text{SLI (Service Level Indicator)} = \\text{the actual measured metric} \\\\\n\\text{SLO (Service Level Objective)} = \\text{the internal target (e.g., p99 < 200 ms)} \\\\\n\\text{SLA (Service Level Agreement)} = \\text{the contractual commitment with customer penalties} \\\\\n\\text{Error Budget} = \\text{the acceptable margin of error within the SLO window}\n\\]\n\n**Step 2: Apply to the examples.**\n"Your monitoring dashboard shows $p99 = 180$ ms" is an SLI — it is a raw measurement. "Our product promises $p99 < 200$ ms" is an SLO. "The contract specifies $p99 < 200$ ms or we pay a credit" is an SLA.\n\n**Step 3: Note the Google's SRE framework origin.**\nGoogle's Site Reliability Engineering book popularized this terminology, making it the industry standard for discussing reliability commitments.`,
      hints: [
        "SLI is the measurement, SLO is the goal, SLA is the contract — which one is a raw number from your monitoring system?",
        "If your monitoring dashboard shows '$p99 = 180$ ms', is that an SLI, SLO, or SLA?",
      ],
    },
    {
      id: "q-sdi-dist-27",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A service has an SLO of 99.9% availability (error budget $= 8.76$ hours/year). If the current burn rate is 10x the sustainable rate, and there are 30 days left in the window, what action should the on-call engineer take?",
      options: [
        "Wait — at 10x burn rate there is still time left in the error budget",
        "Alert immediately — at 10x burn rate the remaining error budget will be exhausted in roughly 3 days, well before the window ends",
        "Reduce the SLO target from 99.9% to 99% to increase the error budget",
        "Disable all alerting for 30 days to allow the system to recover naturally",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Define error budget burn rate.**\nThe sustainable burn rate is $1.0\\times$: at this rate, the error budget is consumed exactly at the end of the window. At $10\\times$ burn rate, the budget is consumed $10$ times faster.\n\n**Step 2: Calculate time to budget exhaustion.**\nWith $30$ days remaining and a $10\\times$ burn rate:\n\\[\n\\text{Days until budget exhausted} = \\frac{30 \\text{ days}}{10} = 3 \\text{ days}\n\\]\nThe remaining error budget will be gone in approximately $3$ days, long before the $30$-day window resets.\n\n**Step 3: Take appropriate action.**\nThis is a critical alert condition requiring immediate action. Google's SRE workbook recommends multi-window burn rate alerts (e.g., $1$-hour and $6$-hour windows at $14.4\\times$ and $6\\times$ burn rates) to catch both fast-burning and slow-burning budget consumption patterns.`,
      hints: [
        "If you're burning at 10x the sustainable rate, divide the remaining time by 10 to find when the budget runs out.",
        "Google's SRE book recommends alerting when burn rate is high enough that the budget will run out long before the window resets.",
      ],
    },
  ],

  "sdi-dist-data-replication": [
    {
      id: "q-sdi-dist-28",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the key trade-off between synchronous and asynchronous replication in databases?",
      options: [
        "Synchronous replication has lower latency but higher storage costs",
        "Synchronous replication provides stronger durability (zero data loss on master failure) at the cost of higher write latency; asynchronous replication has lower latency but risks data loss",
        "Asynchronous replication provides stronger durability at the cost of higher throughput",
        "Synchronous replication works only in single-region deployments",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Describe synchronous replication.**\nIn synchronous replication, the master waits for at least one replica to acknowledge the write before returning success to the client. If the master crashes, the replica has all committed data — zero data loss. The cost is that write latency includes the round-trip to the replica, especially painful for cross-region writes.\n\n**Step 2: Describe asynchronous replication.**\nIn asynchronous replication, the master acknowledges the write immediately after writing to its local disk, without waiting for replica acknowledgment. Write latency is lower, but if the master crashes before replicating to the replica, some committed writes are lost.\n\n**Step 3: Identify the semi-synchronous middle ground.**\nMySQL's default semi-synchronous replication requires one replica to acknowledge (providing durability similar to sync) while others replicate asynchronously (lower average latency).`,
      hints: [
        "In synchronous replication, what has to happen before the client gets a success response? How does this affect latency?",
        "In async replication, what happens to writes that were acknowledged by the master but not yet sent to replicas when the master crashes?",
      ],
    },
    {
      id: "q-sdi-dist-29",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Google Spanner uses Paxos consensus across multiple geographically distributed replicas. Which multi-region replication topology does this most closely resemble?",
      options: [
        "Active-passive: one region serves all writes; others are read-only standbys",
        "Active-active: all regions can accept writes, with cross-region synchronization",
        "Master-slave with async replication and manual failover",
        "Single-region with in-memory replication only",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Define active-active replication.**\nIn an active-active topology, all regions can accept writes and all regions synchronize via a consensus protocol. Spanner uses Paxos to achieve this: any region can serve reads (via local Paxos leaders for strong reads), and any region can accept writes (routed to the shard's Paxos leader).\n\n**Step 2: Contrast with active-passive.**\nActive-passive (primary-DR) is simpler: one region serves all writes, and the other is a warm standby for disaster recovery. This wastes the standby region's capacity but simplifies consistency guarantees since writes are always directed to one leader.\n\n**Step 3: Connect Spanner's design to its guarantees.**\nSpanner's TrueTime and Paxos together enable Spanner to provide external consistency (linearizability) and global snapshot isolation across all regions simultaneously.`,
      hints: [
        "If any region can accept writes and all regions stay consistent, what replication topology is this? What consistency protocol does it require?",
        "Active-passive wastes the standby region's capacity — what does Spanner do instead?",
      ],
    },
    {
      id: "q-sdi-dist-30",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Which of the following is a primary use case for Change Data Capture (CDC) using a tool like Debezium with Kafka?",
      options: [
        "Replacing the primary database with a streaming platform",
        "Streaming row-level database changes to keep a search index, cache, or analytics pipeline up to date without polling the database",
        "Providing a SQL interface to Kafka topics",
        "Compressing database transaction logs to reduce storage costs",
      ],
      correctAnswer: 1,
      explanation: `**Step 1: Explain how CDC works.**\nCDC tools like Debezium connect to a database's transaction log (MySQL binlog, PostgreSQL WAL) and publish every insert, update, and delete as a structured event to Kafka topics. The database's transaction log already records every change — CDC simply makes that stream externally accessible without adding query load to the database.\n\n**Step 2: Describe the key use cases.**\nConsumers of the CDC stream include: (1) keeping Elasticsearch in sync with the operational database for full-text search; (2) invalidating or warming Redis caches on every database change; (3) feeding analytics pipelines (e.g., Snowflake via Kafka Connect).\n\n**Step 3: Contrast with polling.**\nPolling misses intermediate states — if a row is updated $5$ times between polls, polling sees only the final state. CDC captures every intermediate state in order, with zero additional load on the source database.`,
      hints: [
        "The database transaction log already contains a record of every change — CDC just makes that stream available externally without extra DB load.",
        "Compare CDC to polling: if a row is updated 5 times between polls, how many changes does polling see vs. CDC?",
      ],
    },
  ],
};

registerQuestions(questions);

export default questions;
