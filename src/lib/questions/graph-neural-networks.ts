import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "@/lib/questions";

const questions: Record<string, Question[]> = {
  "graph-representations": [
    {
      id: "q-gnn-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A graph G = (V, E) with |V| = n nodes and |E| = m edges can be stored as an adjacency matrix. What is the space complexity of the dense adjacency matrix, and when is it inefficient?",
      options: [
        "O(n): always efficient regardless of graph density",
        "O(n²): inefficient for sparse graphs (m << n²) where most entries are zero",
        "O(m): the same as the edge list representation",
        "O(n·log n): efficient for power-law degree distributions",
      ],
      correctAnswer: 1,
      explanation:
        "The dense adjacency matrix A ∈ {0,1}^{n×n} requires O(n²) space regardless of edge count. For sparse real-world graphs (social networks, citation graphs, molecular graphs) with m = O(n), this wastes O(n²-m) = O(n²) space. Sparse representations (COO: coordinate list, CSR: compressed sparse row, edge index in PyG) store only O(m) entries. GNN frameworks like PyTorch Geometric use edge_index ∈ \\mathcal{Z}^{2×m} as the default sparse representation.",
      hints: [
        "Most real-world graphs are sparse: social networks average ~100-1000 friends per user out of billions.",
        "PyTorch Geometric's edge_index stores [source_nodes, target_nodes] — a compact COO format.",
      ],
    },
    {
      id: "q-gnn-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In PyTorch Geometric (PyG), a graph is represented using edge_index of shape [2, num_edges] and node features x of shape [num_nodes, num_features]. What does edge_index[0] and edge_index[1] contain?",
      options: [
        "edge_index[0] = edge weights; edge_index[1] = edge types",
        "edge_index[0] = source node indices; edge_index[1] = target node indices",
        "edge_index[0] = node features; edge_index[1] = edge features",
        "edge_index[0] = source node features; edge_index[1] = target node features",
      ],
      correctAnswer: 1,
      explanation:
        "PyG's edge_index is a 2×E matrix in COO format: edge_index[0, e] = source node of edge e, edge_index[1, e] = target node of edge e. For an undirected graph with edge (u, v), both (u→v) and (v→u) are included. Message passing from v to u uses edge_index[0] as the destination and edge_index[1] as the source: messages flow from edge_index[1] to edge_index[0]. This is the fundamental data structure for all GNN layers in PyG.",
      hints: [
        "COO = Coordinate format: store the (row, col) of each non-zero entry.",
        "For undirected graphs, m actual edges → 2m entries in edge_index (both directions).",
      ],
    },
    {
      id: "q-gnn-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The graph Laplacian L = D - A (where D is the degree matrix and A is the adjacency matrix) is fundamental to spectral graph theory. What property makes it useful for graph signal processing?",
      options: [
        "L is always invertible, enabling efficient linear system solutions",
        "L is positive semi-definite (PSD) with eigenvalues \\lambda_0=0 ≤ \\lambda_1 ≤ ... ≤ \\lambda_{n-1}; its eigenvectors form an orthonormal basis for graph signals, analogous to Fourier modes — enabling graph Fourier transforms",
        "L has the same spectrum as the adjacency matrix A",
        "L preserves the original node features through matrix multiplication",
      ],
      correctAnswer: 1,
      explanation:
        "The graph Laplacian L = D-A is PSD (x^T·L·x = \\Sigma_{(i,j)∈E}(x_i-x_j)² ≥ 0), with the smallest eigenvalue \\lambda_0=0 (eigenvector = uniform vector, connected graph). The eigendecomposition L = U\\LambdaU^T provides an orthonormal graph Fourier basis U = [u_0,...,u_{n-1}]. A graph signal x can be transformed as x̂ = U^T·x (graph Fourier transform), with filtering: g * x = U·(g(\\Lambda)⊙(U^T·x)). This is the basis of spectral GNNs (ChebNet, GCN).",
      hints: [
        "The smallest eigenvalues correspond to smooth, low-frequency graph signals; large eigenvalues = high-frequency.",
        "\\lambda_1 > 0 iff the graph is connected (the 'algebraic connectivity' or Fiedler value).",
      ],
    },
  ],

  "graph-laplacian": [
    {
      id: "q-gnn-kp2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The normalized graph Laplacian L_norm = I - D^{-1/2}·A·D^{-1/2} is used in spectral GNNs. What is its key advantage over the unnormalized Laplacian L = D-A?",
      options: [
        "It is always positive definite (PD), enabling Cholesky decomposition",
        "Its eigenvalues are bounded in [0,2] regardless of node degree, enabling more stable spectral filtering and removing the effect of degree heterogeneity on the filter scale",
        "It has a closed-form inverse, enabling exact Gaussian process inference on graphs",
        "It reduces memory requirements from O(n²) to O(n)",
      ],
      correctAnswer: 1,
      explanation:
        "L_norm = D^{-1/2}·(D-A)·D^{-1/2} = I - D^{-1/2}·A·D^{-1/2}. Its eigenvalues lie in [0,2] for any graph. Without normalization, L's eigenvalues scale with node degrees — high-degree nodes dominate the spectrum. L_norm removes this degree bias, making spectral filters consistent across graphs with different degree distributions. The normalized propagation rule in GCN: Ã = D_norm^{-1/2}·A_norm·D_norm^{-1/2} is the direct application of this normalization.",
      hints: [
        "The GCN paper (Kipf & Welling, 2017) uses the normalized adjacency with self-loops: D^{-1/2}·(A+I)·D^{-1/2}.",
        "Bounded eigenvalues prevent numerical issues in polynomial approximations to spectral filters.",
      ],
    },
    {
      id: "q-gnn-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Computing the eigenvectors of the graph Laplacian for spectral GNN operations is practical for large graphs with millions of nodes.",
      correctAnswer: "False",
      explanation:
        "Full eigenvector computation requires O(n³) time and O(n²) space — completely intractable for large graphs. This is why spectral GNNs (ChebNet, GCN) use polynomial approximations to the spectral filter (e.g., Chebyshev polynomials of the Laplacian), which can be computed in O(m·K) using K matrix-vector products with L. GCN further approximates to a first-order polynomial, reducing to a simple 1-hop neighborhood aggregation requiring only the sparse adjacency matrix.",
      hints: [
        "ChebNet uses Chebyshev polynomials T_k(L_norm) to approximate spectral filters without eigendecomposition.",
        "GCN (K=1 Chebyshev approximation) is why spectral motivation leads to the same spatial aggregation formula.",
      ],
    },
    {
      id: "q-gnn-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The graph Laplacian quadratic form x^T·L·x = \\Sigma_{(i,j)∈E}(x_i - x_j)² measures graph signal smoothness. A graph signal x is considered 'smooth' (low-frequency) when:",
      options: [
        "x has constant value at all nodes",
        "x has large differences between all connected node pairs",
        "x^T·L·x is small, meaning connected nodes tend to have similar signal values — the signal varies slowly across the graph",
        "x^T·L·x is maximized, concentrating signal energy on few nodes",
      ],
      correctAnswer: 2,
      explanation:
        "x^T·L·x = \\Sigma_{(i,j)∈E}(x_i-x_j)² is the Dirichlet energy of the graph signal x. Small value means connected neighbors have similar values — a smooth signal. The constant vector (x_i = c for all i) achieves x^T·L·x = 0 (minimum). High-frequency signals have large differences between neighbors. The graph Fourier transform decomposes x into smooth (low eigenvalue) and oscillatory (high eigenvalue) components, enabling frequency-domain filtering analogous to classical signal processing.",
      hints: [
        "Smoothness regularization in graph-based semi-supervised learning uses x^T·L·x as a penalty.",
        "Node labels in citation graphs tend to be smooth: connected papers often share the same topic.",
      ],
    },
  ],

  "mpnn-framework": [
    {
      id: "q-gnn-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Message Passing Neural Network (MPNN) framework describes GNN computations in three phases. Which sequence is correct?",
      options: [
        "Aggregate → Update → Message",
        "Message → Aggregate → Update",
        "Update → Message → Aggregate",
        "Normalize → Message → Update",
      ],
      correctAnswer: 1,
      explanation:
        "MPNN proceeds as: (1) Message: each edge (u,v) computes a message m_{uv} = M_t(h_u, h_v, e_{uv}) using source/target node features and edge features; (2) Aggregate: each node v collects messages from its neighbors: m_v = AGG({m_{uv} : u ∈ N(v)}) using a permutation-invariant function (sum, mean, max); (3) Update: node v updates its representation: h_v' = U_t(h_v, m_v). This general framework unifies GCN, GAT, GraphSAGE, GIN, and many other architectures.",
      hints: [
        "The MPNN framework from Gilmer et al. (2017) was introduced for quantum chemistry property prediction.",
        "All major GNN architectures can be expressed as special cases of MPNN with specific M, AGG, and U functions.",
      ],
    },
    {
      id: "q-gnn-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "After L layers of message passing, the representation of node v captures information from all nodes within L hops of v (its L-hop neighborhood). What challenge arises with very large L?",
      options: [
        "The computational complexity grows as O(n^L), making training infeasible",
        "Over-smoothing: node representations become increasingly similar as L increases, because all nodes eventually receive information from (nearly) the entire graph — losing the ability to distinguish individual nodes",
        "The L-hop neighborhood may be smaller than the 1-hop neighborhood for some graphs",
        "Gradient flow improves exponentially with L due to the skip connections in GNNs",
      ],
      correctAnswer: 1,
      explanation:
        "Over-smoothing (Li et al., 2018) is a fundamental GNN problem: as L increases, all node representations converge to the same stationary point determined by the graph structure (the eigenvector of the adjacency matrix). Deep GNNs cannot distinguish nodes because they all have the same 'infinite-hop' neighborhood — the entire graph. For tasks requiring only local structure (e.g., node classification on citation graphs), L=2-4 typically suffices. Methods to mitigate over-smoothing include: residual connections, DropEdge, and PairNorm.",
      hints: [
        "With random walk propagation, L→∞ leads to the stationary distribution — uniform over degree for regular graphs.",
        "Citation graph experiments show that GCN with >4 layers typically performs worse than GCN with 2 layers.",
      ],
    },
    {
      id: "q-gnn-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Over-squashing (Alon & Yahav, 2021) is distinct from over-smoothing. It occurs when:",
      options: [
        "Too many nodes in the graph cause GPU memory to overflow",
        "Exponentially many messages from an exponentially growing L-hop neighborhood must be compressed into a fixed-size node embedding, causing information loss for nodes that are far apart in the graph",
        "Aggregation functions (mean/sum) cancel out positive and negative feature contributions",
        "The gradient of the loss with respect to node embeddings becomes zero due to over-normalization",
      ],
      correctAnswer: 1,
      explanation:
        "Over-squashing: the L-hop neighborhood of node v can grow exponentially as a function of L (for high-degree graphs). All information from this exponentially large neighborhood must be compressed into a fixed-dimension embedding vector at each layer. The sensitivity of node v's embedding to a node u far away becomes exponentially small (∂h_v^L/∂h_u^0 decreases exponentially with distance(u,v)), making long-range information transport impossible. Graph rewiring (adding shortcuts between distant nodes) and full-graph attention can mitigate this.",
      hints: [
        "Over-squashing is about long-range information loss; over-smoothing is about excessive smoothing of local structure.",
        "Graph transformers (treating all nodes as tokens in attention) solve over-squashing by enabling O(1)-hop communication.",
      ],
    },
  ],

  gcn: [
    {
      id: "q-gnn-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Graph Convolutional Network (GCN, Kipf & Welling 2017) layer computes node representations as H' = \\sigma(D̃^{-1/2}·Ã·D̃^{-1/2}·H·W), where Ã = A + I. Why are self-loops (I) added?",
      options: [
        "Self-loops make the adjacency matrix invertible",
        "Self-loops ensure each node's own features are included in its updated representation — without them, a node's message passing only aggregates neighbor features, excluding its own current embedding",
        "Self-loops normalize the eigenvalues of the Laplacian to [0,1]",
        "Self-loops prevent over-smoothing by adding regularization to the update",
      ],
      correctAnswer: 1,
      explanation:
        "Without self-loops (A without I), the aggregation H' = D^{-1/2}·A·D^{-1/2}·H·W computes a weighted average of only the neighbors' features. Node v's own feature h_v is not included in its updated representation h_v'. Adding self-loops (Ã = A+I) ensures node v aggregates from N(v) ∪ {v}, incorporating its own current representation. The degree matrix D̃ is computed from Ã to normalize by the updated degree (including the self-loop).",
      hints: [
        "Self-loops are the graph analog of 'skip connections' in the aggregation step.",
        "Without self-loops, the GCN update is: h_v^{l+1} = \\sigma(W·MEAN({h_u^l : u ∈ N(v)})) — ignoring h_v^l.",
      ],
    },
    {
      id: "q-gnn-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GCN's symmetric normalization D̃^{-1/2}·Ã·D̃^{-1/2} is equivalent to computing the mean of neighbors' features (unweighted average).",
      correctAnswer: "False",
      explanation:
        "D^{-1}·A would compute the mean (row-normalize: each row sums to 1). D^{-1/2}·A·D^{-1/2} applies symmetric normalization: the contribution of neighbor u to node v is scaled by 1/√(d_u·d_v) where d_u, d_v are degrees (including self-loops). This means high-degree neighbors contribute less. The symmetric normalization ensures the propagation matrix is symmetric and has bounded eigenvalues in [-1,1], while D^{-1}·A (asymmetric) may not be symmetric.",
      hints: [
        "D^{-1}·A: contribution of neighbor u = 1/degree(v) (all neighbors equally weighted).",
        "D^{-1/2}·A·D^{-1/2}: contribution of neighbor u = 1/√(degree(u)·degree(v)) — penalizes high-degree neighbors.",
      ],
    },
    {
      id: "q-gnn-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GCN is derived from a first-order approximation of spectral graph convolutions. What is the key limitation of this derivation that restricts GCN's expressiveness?",
      options: [
        "GCN can only process graphs with at most 1000 nodes",
        "GCN uses the same weight matrix W for all nodes — it is a transductive method that cannot generalize to new nodes not seen during training (its propagation matrix Â = D̃^{-1/2}·Ã·D̃^{-1/2} requires the full graph during training and inference)",
        "GCN cannot handle continuous node features, only discrete labels",
        "GCN requires the graph to be bipartite for the spectral derivation to hold",
      ],
      correctAnswer: 1,
      explanation:
        "GCN is inherently transductive: the propagation matrix Â = D̃^{-1/2}·Ã·D̃^{-1/2} is computed from the full graph A at training time, and test nodes must be present in this matrix. Adding new nodes requires recomputing Â and retraining. This contrasts with inductive methods (GraphSAGE, GAT) that learn a local aggregation function applicable to any node neighborhood. For dynamic graphs or large-scale graphs where not all nodes are available at once, inductive methods are essential.",
      hints: [
        "Transductive: learned for specific graph nodes; inductive: learned for any graph structure.",
        "The planet analogy: GCN is like memorizing distances between specific cities; GraphSAGE is like learning a distance formula.",
      ],
    },
  ],

  graphsage: [
    {
      id: "q-gnn-kp5-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "GraphSAGE (Hamilton et al. 2017) introduces 'inductive representation learning'. The key difference from GCN is:",
      options: [
        "GraphSAGE uses spectral filters while GCN uses spatial aggregation",
        "GraphSAGE samples a fixed-size subset of neighbors at each layer and learns an aggregation function, enabling generalization to unseen nodes without access to the full graph during training",
        "GraphSAGE processes directed graphs while GCN requires undirected graphs",
        "GraphSAGE uses attention weights while GCN uses fixed degree-based weights",
      ],
      correctAnswer: 1,
      explanation:
        "GraphSAGE makes two key contributions: (1) Neighborhood sampling — sample a fixed-size S⊂N(v) instead of aggregating all neighbors, making memory cost per node O(S^L) instead of O(|N(v)|^L); (2) Inductive learning — the learned aggregator function is applied to any local neighborhood, generalizing to nodes not seen during training. GraphSAGE was demonstrated on massive graphs (Reddit, Amazon products) where full-batch GCN would be intractable.",
      hints: [
        "Neighborhood sampling enables mini-batch training on large graphs — full-graph GCN requires all node features in memory.",
        "The aggregator can be MEAN, LSTM over random permutations, or MAX-pooling.",
      ],
    },
    {
      id: "q-gnn-kp5-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "GraphSAGE concatenates the node's own representation with the aggregated neighbor representation before applying a linear transformation: h_v^{l+1} = \\sigma(W·CONCAT(h_v^l, AGG({h_u^l : u ∈ S(v)})). Why is concatenation preferred over addition?",
      options: [
        "Concatenation reduces computational cost compared to addition",
        "Concatenation preserves both the node's own features and the aggregated neighborhood information separately, allowing the model to learn different weights for the self-representation vs. the neighborhood — preventing premature information mixing",
        "Concatenation is required for the LSTM aggregator to work correctly",
        "Addition leads to gradient vanishing in deep GraphSAGE models",
      ],
      correctAnswer: 1,
      explanation:
        "With addition (h_v + AGG), the model cannot distinguish between 'information from my own features' and 'information from my neighbors' — they are entangled with equal weight. Concatenation gives the linear layer W the freedom to weight these two sources differently, effectively learning the trade-off between self-preservation and neighborhood aggregation. This is particularly important when node features are uninformative (rely more on neighborhood) or highly informative (rely more on self-features).",
      hints: [
        "GCN uses addition via the normalized adjacency (self-loop + neighbors), while GraphSAGE's concatenation is more expressive.",
        "Concatenation is also used in GraphSAGE's 'node-neighbor' separation in the final output dimension.",
      ],
    },
    {
      id: "q-gnn-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GraphSAGE uses neighborhood sampling with fixed sample size S to enable mini-batch training. What is the computational complexity of a forward pass through L GraphSAGE layers for a target node v, using sample size S per layer?",
      options: [
        "O(L·S·d): linear in layers and sample size",
        "O(S^L·d): exponential in layers — the 'neighborhood expansion' problem where the receptive field grows exponentially",
        "O(n·L·d): linear in total nodes for each layer",
        "O(m·d): linear in edges, shared across all target nodes",
      ],
      correctAnswer: 1,
      explanation:
        "At layer 1, node v samples S_1 neighbors. Each of those samples S_2 neighbors for layer 2. For L layers, the total number of nodes in the computation graph is S_1·S_2·...·S_L = S^L (if S_i = S). With d-dimensional features, the cost per target node is O(S^L·d). For L=2, S=25: 625 nodes per target. This exponential growth ('neighborhood explosion') is a key challenge in large-graph GNN training, addressed by methods like PinSage (multi-hop importance sampling) and cluster-GCN.",
      hints: [
        "With L=3, S=10: 1000 node computations per target node — manageable but growing fast.",
        "Cluster-GCN pre-partitions the graph into clusters, training on dense subgraphs to reduce expansion.",
      ],
    },
  ],

  gat: [
    {
      id: "q-gnn-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Graph Attention Networks (GAT, Veličković et al. 2018) use attention to weight neighbor contributions. The attention coefficient \\alpha_{ij} between node i and neighbor j is computed as:",
      options: [
        "\\alpha_{ij} = softmax_j(h_i · h_j) — dot-product attention",
        "\\alpha_{ij} = softmax_j(LeakyReLU(a^T·[W·h_i || W·h_j])) — learned attention via a shared attention vector a",
        "\\alpha_{ij} = 1/degree(i) — uniform normalization (same as GCN mean)",
        "\\alpha_{ij} = 1/√(degree(i)·degree(j)) — symmetric degree normalization (same as GCN)",
      ],
      correctAnswer: 1,
      explanation:
        "GAT's attention mechanism: (1) Compute attention logit e_{ij} = LeakyReLU(a^T·[W·h_i || W·h_j]) where a ∈ \\mathbb{R}^{2d'} is a trainable attention vector and || is concatenation; (2) Normalize: \\alpha_{ij} = exp(e_{ij}) / \\Sigma_{k∈N(i)}exp(e_{ik}). The output is h_i' = \\sigma(\\Sigma_j \\alpha_{ij}·W·h_j). Multi-head attention repeats this with K heads and concatenates (or averages) the results, reducing variance.",
      hints: [
        "LeakyReLU (not ReLU) is used to allow gradient flow for negative attention logits.",
        "The attention is computed solely from node features, not edge features — distinguishing it from edge-aware methods.",
      ],
    },
    {
      id: "q-gnn-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GAT's attention mechanism is computed using only the features of the source and target nodes, making it insensitive to the structural position of nodes in the graph (e.g., node degree is not directly used).",
      correctAnswer: "True",
      explanation:
        "Standard GAT computes attention solely from the features W·h_i and W·h_j of the source and target nodes, with no explicit use of structural information (degree, betweenness centrality, etc.). If all nodes have identical features, all attention weights become uniform — equivalent to mean aggregation. GATv2 (Brody et al., 2021) shows that GAT's attention has limited expressive power due to a 'static' attention issue (the ranking of neighbors doesn't change based on the query node in some cases), and proposes a modified dynamic attention.",
      hints: [
        "GATv2 changes the order of operations: e_{ij} = a^T·LeakyReLU(W·[h_i||h_j]) → e_{ij} = a^T·LeakyReLU(W_1·h_i + W_2·h_j) — making attention fully dynamic.",
        "Structural information (graph topology) can be injected as node features (degree, centrality) if needed.",
      ],
    },
    {
      id: "q-gnn-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GAT uses multi-head attention with K heads. In the intermediate layers, the outputs of K attention heads are concatenated (giving K·d' features). In the final layer, they are averaged. Why this distinction?",
      options: [
        "Concatenation is only valid for intermediate layers due to memory constraints in the final layer",
        "In intermediate layers, concatenation expands the representation capacity (K different feature views are maintained separately); in the final output layer, averaging reduces the representation to the required output dimension and stabilizes predictions by averaging over K independent attention mechanisms",
        "The distinction ensures gradient flow through all K heads in the final layer",
        "GAT paper uses this convention because concatenation in the final layer would require retraining all downstream layers",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-head attention serves different purposes at different depths: intermediate layers benefit from maintaining K separate representation spaces (concatenated), giving the subsequent layer more expressiveness. The final layer must produce the required output dimension (e.g., C classes for node classification); averaging K heads gives the same C-dimensional output while benefiting from ensemble-like variance reduction across heads. Concatenating at the final layer would give K·C outputs requiring an extra projection, adding parameters unnecessarily.",
      hints: [
        "This is analogous to why vision transformer (ViT) pools (averages) the token representations before the classification head.",
        "Averaging K heads = implicit ensemble: each head votes independently, reducing overfitting risk.",
      ],
    },
  ],

  gin: [
    {
      id: "q-gnn-kp7-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Graph Isomorphism Network (GIN, Xu et al. 2019) is designed to be as powerful as the Weisfeiler-Lehman (WL) graph isomorphism test. The key insight is that the aggregation function must be:",
      options: [
        "Permutation-equivariant with attention-weighted summation",
        "Injective (one-to-one) over multisets of neighbor features — distinguishing different neighborhood multisets requires the aggregation to be injective; SUM aggregation is injective, but MEAN and MAX are not",
        "Linear in the number of neighbors to maintain computational efficiency",
        "Continuous and differentiable everywhere to enable gradient-based learning",
      ],
      correctAnswer: 1,
      explanation:
        "GIN's key theorem: for a GNN to be as discriminative as the WL test, its aggregation must be injective over neighbor feature multisets. SUM is injective for bounded integer features (distinguishes {a,a} from {a}); MEAN loses count information ({a,a} ≡ {a} under mean = a); MAX loses multiplicity ({a,a} ≡ {a} under max = a). GIN update: h_v^{l+1} = MLP((1+\\epsilon)·h_v^l + \\Sigma_{u∈N(v)}h_u^l), where the MLP approximates any injective function by the universal approximation theorem.",
      hints: [
        "The WL test distinguishes graphs by iteratively refining node color histograms via aggregation — GIN's SUM achieves the same discriminative power.",
        "MEAN aggregation fails to distinguish: a 3-node graph {1,2,3} vs. a 6-node graph {1,1,2,2,3,3} have the same mean neighborhood.",
      ],
    },
    {
      id: "q-gnn-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GIN (with SUM aggregation and MLP updates) can distinguish any two non-isomorphic graphs, making it a complete graph isomorphism test.",
      correctAnswer: "False",
      explanation:
        "GIN is as powerful as the 1-dimensional WL (1-WL) test, which is not complete — there exist pairs of non-isomorphic graphs that 1-WL cannot distinguish (e.g., certain regular graphs). Higher-order WL tests (k-WL) are more expressive but exponentially more expensive. Higher-order GNNs (PPGN, k-GNN) and graph transformers can distinguish more graph pairs, but no polynomial-time GNN is known to be a complete isomorphism test. The 1-WL limitation is a fundamental expressiveness bound for standard MPNNs.",
      hints: [
        "The 1-WL test fails on regular graphs where all nodes have the same local structure.",
        "Cai, Fürer, Immerman (1992) showed that k-WL tests form a strict hierarchy and even k-WL does not capture all graph properties.",
      ],
    },
    {
      id: "q-gnn-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The parameter \\epsilon in GIN's update h_v^{l+1} = MLP((1+\\epsilon)·h_v^l + \\Sigma_{u∈N(v)}h_u^l) serves what purpose, and should it be fixed or learned?",
      options: [
        "\\epsilon controls the learning rate for node v's self-update; it must be fixed at \\epsilon=1",
        "\\epsilon weights the relative contribution of the node's own features vs. its neighbors'; it can be either a fixed scalar (e.g., \\epsilon=0) or a learned parameter — both options are proven to achieve the same expressive power as 1-WL if the MLP is sufficiently expressive",
        "\\epsilon must be learned per node to ensure injectivity of the aggregation",
        "\\epsilon is the dropout rate applied to node features during training",
      ],
      correctAnswer: 1,
      explanation:
        "GIN is proven to achieve 1-WL expressive power regardless of \\epsilon (fixed or learned), as long as the MLP is a universal approximator. The (1+\\epsilon) factor ensures h_v \$\\neq\$ AGG(N(v)) — the node can tell apart h_v=0, N(v)={0,0} from h_v=0, N(v)={} (empty neighborhood). In practice, both fixed \\epsilon=0 and learned \\epsilon work well. The paper tries both and finds similar performance, with fixed \\epsilon=0 being simpler. The key to expressiveness is the MLP, not the specific value of \\epsilon.",
      hints: [
        "The (1+\\epsilon) ensures the self-feature h_v and the aggregated sum can be distinguished even when they are numerically similar.",
        "Setting \\epsilon=0 reduces to: h_v^{l+1} = MLP(h_v^l + \\Sigma_{u∈N(v)}h_u^l).",
      ],
    },
  ],

  "graph-transformers": [
    {
      id: "q-gnn-kp8-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Graph Transformers (GT) apply self-attention over all pairs of nodes, overcoming GNN's over-squashing limitation. The main challenge in applying standard Transformers to graphs is:",
      options: [
        "Transformers cannot process variable-length sequences, but graphs have varying numbers of nodes",
        "Quadratic attention complexity O(n²·d) is intractable for large graphs; additionally, Transformers lack an inductive bias for graph structure — they treat all node pairs equally without encoding the graph topology",
        "Transformers require fixed-dimensional inputs but graph node features can vary in size",
        "Self-attention is not permutation-invariant, which is required for graph processing",
      ],
      correctAnswer: 1,
      explanation:
        "Graph Transformers face two challenges: (1) O(n²) attention complexity makes them intractable for graphs with millions of nodes (e.g., social networks, web graphs); (2) Without graph structural bias, the model cannot distinguish topologically different graphs with identical feature sets. Solutions include: sparse attention (attend only to neighbors + random/important far nodes), positional encodings (Laplacian PE, random walk PE), and edge features in attention (encoding adjacency). For small graphs (molecular, chemistry), GT works well without modifications.",
      hints: [
        "Graphormer (Ying et al., 2021) injects structural bias via node/edge/degree encodings into attention.",
        "BigBird and Longformer sparse attention patterns (local + random + global) can be adapted to graphs.",
      ],
    },
    {
      id: "q-gnn-kp8-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Graphormer (Ying et al. 2021) adds three structural encodings to standard Transformer attention. Which of the following is NOT one of them?",
      options: [
        "Degree encoding — embedding of each node's in/out degree added to node features",
        "Spatial encoding — a bias term b_{ij} in the attention matrix based on the shortest path distance between nodes i and j",
        "Edge encoding — averaging edge features along the shortest path between nodes i and j as an attention bias",
        "Spectral encoding — embedding of the node's Laplacian eigenvector component added to node features",
      ],
      correctAnswer: 3,
      explanation:
        "Graphormer's three structural encodings are: (1) Degree Encoding: learned embeddings of in/out degree added to input; (2) Spatial Encoding: b_{ij} = b_{\\phi(d(i,j))} is a bias in attention logits based on shortest-path distance d(i,j); (3) Edge Encoding: average edge features along the shortest path between i and j as an additional attention bias. Spectral/Laplacian encodings are used in other GT variants (e.g., Dwivedi et al., SAN) but not in the original Graphormer.",
      hints: [
        "Graphormer won the OGB-LSC competition at NeurIPS 2021 molecular property prediction track.",
        "The key insight: shortest path distances encode topological proximity; degree encodes local connectivity.",
      ],
    },
    {
      id: "q-gnn-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Laplacian positional encodings (LPE) are a common structural encoding for graph transformers. They use the k smallest non-trivial eigenvectors of the graph Laplacian as node position vectors. What is a key challenge with LPE?",
      options: [
        "LPE requires O(n³) computation for every mini-batch, making training impractical",
        "Eigenvectors are only unique up to sign flips and rotations (for repeated eigenvalues), causing inconsistent positional encodings across graphs — a sign ambiguity that requires special handling (e.g., random sign flipping during training, SignNet)",
        "LPE only works for regular graphs where all nodes have the same degree",
        "LPE cannot distinguish nodes in different connected components of the graph",
      ],
      correctAnswer: 1,
      explanation:
        "Laplacian eigenvectors u_i are only defined up to a sign: -u_i is also a valid eigenvector for the same eigenvalue. For repeated eigenvalues (degenerate spectrum), any rotation within the eigenspace is valid. This sign/rotation ambiguity means two graphs with identical structure but different eigenvector signs would have different LPE — inconsistent across graphs. Solutions: (1) Random sign flipping during training (data augmentation); (2) SignNet (Lim et al., 2022) — a canonical sign-equivariant network; (3) Absolute eigenvector values (losing sign information).",
      hints: [
        "The sign ambiguity makes LPE non-canonical: there's no 'correct' eigenvector sign.",
        "For symmetric graphs (cycles, complete graphs), the degeneracy is particularly severe — many eigenvectors share the same eigenvalue.",
      ],
    },
  ],

  "gnn-expressiveness": [
    {
      id: "q-gnn-kp9-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The 1-WL (Weisfeiler-Lehman) test is an upper bound on the expressive power of standard MPNNs. Two classes of graphs that 1-WL fails to distinguish are:",
      options: [
        "Graphs with different numbers of nodes or edges",
        "Regular graphs where all nodes have the same degree, and graphs with cycles of the same length — 1-WL cannot count triangles, cycles, or distinguish certain regular graphs",
        "Graphs with directed vs. undirected edges",
        "Graphs with continuous vs. discrete node features",
      ],
      correctAnswer: 1,
      explanation:
        "1-WL (and standard MPNNs) cannot: count triangles, distinguish 3-regular graphs from other 3-regular graphs with the same tree structure, or detect cycles longer than needed for the message-passing depth. Classic example: the two 3-regular non-isomorphic graphs with 6 nodes (K_{3,3} and the prism graph) cannot be distinguished by 1-WL. This has practical implications: GNNs cannot count motifs, which are important for molecular property prediction and social network analysis.",
      hints: [
        "Triangle counting is a key graph property for social network analysis (clustering coefficient) that standard GNNs miss.",
        "Higher-order GNNs (OSAN, PPGN, k-GNN) can count subgraph patterns by considering k-tuples of nodes.",
      ],
    },
    {
      id: "q-gnn-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Structural features (like node degree, triangle count, or PageRank) can be precomputed and added as node features to a GNN, making the GNN strictly more expressive than the 1-WL test without any architectural changes.",
      correctAnswer: "True",
      explanation:
        "Adding precomputed structural features (degree, local clustering coefficient, triangle count, eigenvector centrality, etc.) as input node features can help GNNs distinguish graphs that 1-WL cannot. For example, adding triangle count allows the GNN to know 'node v participates in k triangles', breaking the 1-WL equivalence for regular graphs. This 'feature augmentation' approach is practically effective and often used in competition settings. However, it requires careful feature engineering and may not generalize to all graph families.",
      hints: [
        "CIRCLE (2022) systematically studies which structural features break specific WL equivalences.",
        "This approach is faster than redesigning the GNN architecture, but may miss interactions between structural features.",
      ],
    },
    {
      id: "q-gnn-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Higher-order GNNs (k-GNN or k-WL) operate on k-tuples of nodes instead of individual nodes. The k=3 case can detect triangles. What is the main drawback of high-order GNNs?",
      options: [
        "Higher-order GNNs cannot process graphs with self-loops",
        "The computational and memory complexity grows as O(n^k) — exponential in k — making k≥3 intractable for large graphs; even k=3 requires O(n³) computation",
        "Higher-order GNNs break permutation invariance, requiring a canonical node ordering",
        "Higher-order WL tests cannot distinguish graphs with repeated eigenvalues in the Laplacian",
      ],
      correctAnswer: 1,
      explanation:
        "k-GNN processes all k-tuples of nodes, with O(n^k) tuple nodes and O(n^k·n) edges between them. For k=3 and n=100: 1 million tuple nodes. This is prohibitive for large graphs. Approximations include: Random Subgraph Networks (using sampled k-subgraphs), Nested GNNs (running inner GNNs on induced subgraphs), and Ring GNN. Practical tradeoffs: full k-GNN (expressive but expensive) vs. MPNN (inexpensive but limited). Most competitive GNNs use specialized architectures (distance encodings, random features) to gain expressiveness without full k-tuple computation.",
      hints: [
        "For molecular graphs with n~20-50 atoms, k=3 (n³ ≈ 100k tuples) is feasible; for social graphs (n=millions), k=3 is impossible.",
        "PPGN (Maron et al., 2019) achieves 3-WL power in O(n³) but efficiently using matrix operations.",
      ],
    },
  ],

  "mol-property-prediction": [
    {
      id: "q-gnn-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Molecular graphs represent molecules as graphs where nodes are atoms and edges are chemical bonds. What additional information is typically included as node and edge features?",
      options: [
        "Node features: pixel color; Edge features: bond image distance",
        "Node features: atom type (C, N, O, ...), atomic number, chirality, formal charge, hybridization; Edge features: bond type (single/double/triple/aromatic), bond stereo",
        "Node features: molecular weight; Edge features: bond strength in Newtons",
        "Node features: SMILES character; Edge features: graph distance",
      ],
      correctAnswer: 1,
      explanation:
        "Molecular GNNs encode rich chemical information as features: Node (atom) features include atom type (element), atomic number, formal charge, chirality (R/S), hybridization (sp, sp2, sp3), aromaticity, and hydrogen count. Edge (bond) features include bond type (single, double, triple, aromatic), bond conjugation, and stereochemistry (E/Z). These domain features are critical for predicting quantum mechanical properties (HOMO-LUMO gap, solvation energy) and biological activity (binding affinity).",
      hints: [
        "Without domain features, a GNN would need to learn chemistry from scratch — domain knowledge as features dramatically reduces sample complexity.",
        "RDKit is the standard cheminformatics library for extracting these features from SMILES strings.",
      ],
    },
    {
      id: "q-gnn-kp10-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The OGB (Open Graph Benchmark) molecular property prediction benchmarks (ogbg-molhiv, ogbg-molpcba) are important because:",
      options: [
        "They provide infinite training data generated from molecular dynamics simulations",
        "They provide standardized train/validation/test splits using scaffold splitting (dividing molecules by chemical scaffold to test generalization to structurally novel molecules), preventing trivial memorization of similar molecules",
        "They evaluate GNNs on real crystal structures with 3D coordinates",
        "They test GNNs on protein-ligand complexes with full protein flexibility",
      ],
      correctAnswer: 1,
      explanation:
        "OGB uses scaffold-based splitting (Bemis-Murcko scaffolds) rather than random splitting. Scaffold splitting groups molecules by their carbon skeleton (scaffold), placing different scaffolds in train/val/test. This tests true generalization to chemically novel molecules — a realistic drug discovery scenario where models must extrapolate beyond training chemical space. Random splitting inflates performance metrics by placing similar molecules in all splits.",
      hints: [
        "Scaffold splitting = testing on structurally different molecules from training set — harder but more realistic.",
        "Random splitting on molecular data is analogous to evaluating an NLP model on the same sentences as training.",
      ],
    },
    {
      id: "q-gnn-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Pre-training GNNs on large molecular datasets (e.g., Hu et al. 2020 'Strategies for Pre-training Graph Neural Networks') uses two pre-training tasks. Which combination is most effective?",
      options: [
        "Node classification + Graph reconstruction",
        "Masked atom prediction (predict masked atom types from context) + Contextual property prediction (predict graph-level properties of local subgraphs)",
        "Graph isomorphism prediction + Edge prediction",
        "SMILES string reconstruction + Molecular weight regression",
      ],
      correctAnswer: 1,
      explanation:
        "Hu et al. (2020) found that combining node-level and graph-level pre-training works best: (1) Node-level: masked atom prediction — mask some atoms and predict their types/features from context (analogous to BERT masked language modeling); (2) Graph-level: contextual property prediction — predict graph-level properties (chemical properties from a curated database) of randomly extracted subgraphs (ego networks). The combination captures both local chemical structure and global molecular properties, transferring to downstream tasks like toxicity and bioactivity prediction.",
      hints: [
        "This is the GNN analog of BERT's masked language modeling + next sentence prediction pre-training.",
        "Pre-training on 2 million unlabeled molecules from ZINC database dramatically improves performance on tasks with limited labeled data.",
      ],
    },
  ],

  "knowledge-graph-embeddings": [
    {
      id: "q-gnn-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "TransE (Bordes et al. 2013) is a knowledge graph embedding method that models the relation r between head entity h and tail entity t by:",
      options: [
        "Training a classifier that takes (h, r, t) as input and predicts if the triple is valid",
        "Learning embeddings such that h + r ≈ t — the relation r acts as a translation in embedding space, so valid triples have small ||h + r - t||",
        "Computing the dot product h · r · t and maximizing it for valid triples",
        "Learning a rotation matrix R_r that maps h to t: R_r · h ≈ t",
      ],
      correctAnswer: 1,
      explanation:
        "TransE models (h, r, t) as h + r ≈ t in the embedding space. Training minimizes ||h + r - t|| for positive triples and uses margin-based loss with corrupted (negative) triples. TransE is simple and effective for 1-to-1 relations but fails for 1-to-N, N-to-1, and N-to-N relations (e.g., 'nationality' of multiple people should point to one country, but TransE forces different entity embeddings to be similar if they share a relation). TransR, DistMult, ComplEx, and RotatE address these limitations.",
      hints: [
        "The analogy: 'Paris is the capital of France' → embedding(Paris) + embedding(capitalOf) ≈ embedding(France).",
        "TransE: 'Man + gender_rev ≈ Woman' — works well for 1-to-1 relations like gender reversal.",
      ],
    },
    {
      id: "q-gnn-kp11-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "RotatE (Sun et al. 2019) models relations as rotations in complex space: t = h ◦ r, where h, t ∈ \\mathbb{C}^d, r ∈ \\mathbb{C}^d with |r_i| = 1. What relational patterns can RotatE model that TransE cannot?",
      options: [
        "Anti-symmetry only (r(h,t) → ¬r(t,h))",
        "Symmetry (r(h,t) → r(t,h)), anti-symmetry, inversion (r1(h,t) ↔ r2(t,h)), and composition (r1(h,t) ∧ r2(t,x) → r3(h,x)) — all four major relational patterns",
        "Transitivity only (r(h,t) ∧ r(t,x) → r(h,x))",
        "1-to-N relations by using multiple head embeddings for each entity",
      ],
      correctAnswer: 1,
      explanation:
        "RotatE's unit-modulus complex rotation can model: (1) Symmetry: |r|=1, arg(r)=0 → r=1 → h◦r=h, so t=h (symmetric); (2) Anti-symmetry: r\$\\neq\$r^{-1} → h◦r\$\\neq\$t◦r; (3) Inversion: r2 = r1^{-1}; (4) Composition: r3 = r1·r2 (angle sum). TransE only models composition and cannot represent symmetry (h+r=t and t+r=h implies r=0) or inversion efficiently. Empirically, RotatE achieves state-of-the-art on FB15k-237 and WN18RR benchmarks.",
      hints: [
        "'HasSpouse' is symmetric; 'ParentOf' and 'ChildOf' are inverses — important patterns in KGs.",
        "Rotation in complex space = addition of phase angles: |h|=|t|=1, arg(t) = arg(h) + arg(r).",
      ],
    },
    {
      id: "q-gnn-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GNN-based knowledge graph completion methods (e.g., R-GCN) are more powerful than pure embedding methods like TransE in what way?",
      options: [
        "R-GCN can process larger knowledge graphs due to its O(m) complexity vs TransE's O(n²) complexity",
        "R-GCN aggregates multi-hop structural information — the embedding of entity h incorporates information about h's neighborhood (connected entities and relations), capturing structural context that TransE's bilinear score cannot model",
        "R-GCN uses non-Euclidean geometry for relation modeling, unlike TransE's flat Euclidean space",
        "R-GCN computes exact marginal likelihoods for triple validity, whereas TransE only computes approximate scores",
      ],
      correctAnswer: 1,
      explanation:
        "Relational GCN (Schlichtkrull et al. 2018) propagates messages across different relation types: h_v^{l+1} = \\sigma(W_0^{(l)}·h_v^l + \\Sigma_r \\Sigma_{u∈N_r(v)} (1/c_{v,r})·W_r^{(l)}·h_u^l). This aggregates multi-hop structural context: entity A's embedding is influenced by its connected entities and the relation types linking them. TransE uses only the triple (h,r,t) without considering the broader graph context. R-GCN's multi-hop aggregation enables modeling long-range dependencies in the KG structure.",
      hints: [
        "R-GCN uses separate weight matrices W_r for each relation type r — relation-specific message passing.",
        "Basis decomposition of W_r = \\Sigma_b a_{rb}·V_b reduces parameter count for KGs with many relation types.",
      ],
    },
  ],

  "link-prediction": [
    {
      id: "q-gnn-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Link prediction in graphs is the task of predicting whether an edge exists between two nodes that are not currently connected. Common heuristics for link prediction include:",
      options: [
        "Node degree: predict edges between high-degree nodes",
        "Common neighbors (CN) score = |N(u) ∩ N(v)|, Adamic-Adar, Jaccard coefficient — structural similarity measures based on shared neighborhood",
        "PageRank: predict edges between high PageRank nodes",
        "Betweenness centrality: predict edges through high-centrality nodes",
      ],
      correctAnswer: 1,
      explanation:
        "Classical link prediction heuristics are based on the 'friend of a friend' principle: nodes with many common neighbors are likely to connect. Common Neighbors: |N(u)∩N(v)|; Adamic-Adar: \\Sigma_{w∈N(u)∩N(v)} 1/log(|N(w)|) (down-weights high-degree common neighbors); Jaccard: |N(u)∩N(v)|/|N(u)∪N(v)|. GNN-based link prediction computes an edge score from learned node embeddings (e.g., dot product h_u·h_v), often outperforming heuristics on social and citation networks.",
      hints: [
        "Adamic-Adar down-weights hub nodes (e.g., celebrities in a social network) as common neighbors.",
        "GNN link prediction: learn embeddings h_u, h_v such that \\sigma(h_u·h_v) predicts edge probability.",
      ],
    },
    {
      id: "q-gnn-kp12-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SEAL (Zhang & Chen, 2018) is a GNN-based link prediction method that achieves state-of-the-art results by:",
      options: [
        "Computing node embeddings globally and using their dot product as edge scores",
        "Extracting a local subgraph around each candidate edge (the enclosing subgraph), labeling nodes with their distance to the source and target nodes, and training a GNN on these labeled subgraphs to predict link existence",
        "Using spectral graph convolutions to propagate link labels across the entire graph",
        "Training a separate GNN for each relation type in the knowledge graph",
      ],
      correctAnswer: 1,
      explanation:
        "SEAL extracts the h-hop enclosing subgraph around each candidate edge (u,v): all nodes within h hops of both u and v. Each node in the subgraph is labeled with its distance to u and to v (double-radius node labeling, DRNL), encoding structural role. A GNN is then trained on these labeled subgraphs to classify if edge (u,v) exists. This allows the GNN to learn structural heuristics (common neighbors, triangles, etc.) from data, achieving state-of-the-art on many link prediction benchmarks.",
      hints: [
        "SEAL's key insight: link existence depends on local subgraph structure, not just node embeddings.",
        "DRNL assigns node (w) label = 1 + min(d_u, d_v) + (d_u+d_v)/2·((d_u+d_v)/2 + (d_u-d_v)/2 - 1), encoding structural equivalence.",
      ],
    },
    {
      id: "q-gnn-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key challenge in GNN-based link prediction is that many GNNs fail to distinguish the 'structural roles' of the two target nodes (u, v). Specifically, a standard GNN with node embeddings h_u and h_v computes the same score for (u,v) and for any other pair (u',v') where h_{u'}=h_u and h_{v'}=h_v. What problem does this cause?",
      options: [
        "It causes over-smoothing in the GNN layers used for link prediction",
        "It makes the GNN unable to distinguish different topological relationships between the source and target of a link — e.g., a 'triangle closing' link (u and v have 5 common neighbors) vs. a 'bridge' link (u and v have 0 common neighbors) may get the same score if u and v have similar node embeddings",
        "It creates memory conflicts when processing mini-batches of link pairs",
        "It prevents the use of negative sampling during training",
      ],
      correctAnswer: 1,
      explanation:
        "Standard GNN link predictors compute h_u and h_v independently, then score the edge. Two node pairs with identical individual embeddings (because of symmetric local structure) will get the same edge score regardless of their relationship to each other. SEAL's subgraph approach avoids this by encoding the structural relationship between u and v directly. Other solutions: NBFNet (path-based encoding conditioning on the target pair), GNN-HOPS (incorporating path features), and direct structural feature injection.",
      hints: [
        "The problem: h_u captures 'what kind of node is u'; we also need 'what is the relationship between u and v in the graph'.",
        "This is related to the WL expressiveness limitation — standard MPNNs don't automatically compute pairwise structural information.",
      ],
    },
  ],

  "graph-rag": [
    {
      id: "q-gnn-kp13-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "GraphRAG (Edge et al. 2024) extends standard RAG (Retrieval-Augmented Generation) by building a knowledge graph from source documents. The key advantage over standard text chunking RAG is:",
      options: [
        "GraphRAG indexes documents faster than vector databases",
        "GraphRAG enables multi-hop reasoning over relationships between entities across documents — answering questions that require connecting information from different sources through shared entities or concepts in the knowledge graph",
        "GraphRAG avoids the need for embedding models, using only the knowledge graph structure",
        "GraphRAG always produces shorter, more concise answers than standard RAG",
      ],
      correctAnswer: 1,
      explanation:
        "Standard RAG retrieves text chunks by semantic similarity to the query — suitable for direct factual questions. GraphRAG builds a knowledge graph (entity-relationship pairs extracted by an LLM) and uses it for retrieval. This enables: (1) Multi-hop queries: 'What did the CEO of Company X (which acquired Company Y) say about their product Z?' requires connecting entities across documents; (2) Community-based summarization: graph clustering reveals document themes for global queries ('What are the main themes?'). GraphRAG excels at complex relational queries where chunk-based retrieval misses cross-document connections.",
      hints: [
        "Standard RAG: 'What year was X founded?' (single chunk lookup). GraphRAG: 'How are X and Y connected through Z?' (graph traversal).",
        "The graph construction phase (entity/relation extraction by LLM) is compute-intensive — an upfront cost.",
      ],
    },
    {
      id: "q-gnn-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GraphRAG's community detection step (using Leiden algorithm to cluster the knowledge graph) is used primarily to reduce indexing time during graph construction.",
      correctAnswer: "False",
      explanation:
        "Community detection in GraphRAG serves a different purpose: it hierarchically groups related entities and their relationships into coherent 'communities' (topics/themes), generating community summaries at multiple granularities. These summaries are used for 'global' query answering — answering broad thematic questions ('What are the main topics in this corpus?') by combining community-level summaries, which standard vector search cannot do. The hierarchical community structure enables both local (specific entity) and global (thematic) queries.",
      hints: [
        "Leiden algorithm produces hierarchical community structure — from small tight clusters to broad topic areas.",
        "Community summaries = LLM-generated summaries of all entities and relationships within each cluster.",
      ],
    },
    {
      id: "q-gnn-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A practical limitation of GraphRAG compared to standard vector RAG is:",
      options: [
        "GraphRAG cannot handle PDF documents, only plain text",
        "The graph construction pipeline (LLM-based entity/relation extraction + community detection) has very high upfront computational cost (10-100× more expensive than standard RAG indexing), making it impractical for frequently updated corpora or quick prototyping",
        "GraphRAG only supports English-language documents due to entity extraction limitations",
        "The knowledge graph cannot represent numerical or temporal information",
      ],
      correctAnswer: 1,
      explanation:
        "GraphRAG's construction requires LLM calls for every chunk to extract entities and relations — costing ~$10-100+ for large corpora. Vector RAG requires only embedding model calls (~1000× cheaper). This makes GraphRAG unsuitable for: (1) Frequently updated corpora (expensive to rebuild); (2) Quick experimentation; (3) Large corpora on tight budgets. Hybrid approaches (RAPTOR, HippoRAG) combine hierarchical summarization with vector search to get some GraphRAG benefits at lower cost.",
      hints: [
        "GraphRAG shines for complex analytical queries on stable, well-defined corpora (legal documents, scientific literature).",
        "For frequently updated news or chat data, standard vector RAG with metadata filtering is more practical.",
      ],
    },
  ],

  "temporal-knowledge-graphs": [
    {
      id: "q-gnn-kp14-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Temporal Knowledge Graphs (TKGs) extend static KGs by associating timestamps with facts: (h, r, t, \\tau) means the relation r held between h and t at time \\tau. The key challenge for TKG embedding methods is:",
      options: [
        "Handling continuous time vs. discrete timesteps",
        "Modeling the evolution of entity and relation embeddings over time — facts are true only at certain times, and the same entity may have different representations at different times (e.g., 'Obama, presidentOf, USA, 2009-2017' but not before/after)",
        "Scaling to larger graphs with time increasing the number of nodes",
        "Computing gradients through the time dimension for backpropagation",
      ],
      correctAnswer: 1,
      explanation:
        "TKG methods must capture temporal dynamics: (1) Interpolation — predicting missing facts within the observed time range (e.g., given facts at t=1 and t=3, predict at t=2); (2) Extrapolation — predicting future facts (t > max training time). Methods include: (1) TTransE/TNTComplEx — time-conditioned KG embedding (entity/relation embeddings modulated by time); (2) RE-NET — GNNs over entity interaction graphs at each timestep with RNN for temporal evolution; (3) TiRGN/xERTE — graph-based temporal reasoning.",
      hints: [
        "GDELT and ICEWS are common TKG benchmarks: political event knowledge graphs with timestamps.",
        "Extrapolation (future prediction) is much harder than interpolation — requires modeling temporal patterns and trends.",
      ],
    },
    {
      id: "q-gnn-kp14-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "Static knowledge graph completion methods (like TransE or RotatE) can be directly applied to temporal knowledge graphs without modification, treating all temporal facts as static.",
      correctAnswer: "False",
      explanation:
        "Treating TKG facts as static ignores temporal validity: TransE would learn h + r ≈ t regardless of time, unable to represent that 'Trump, presidentOf, USA, 2017-2021' but not before or after. The same triple (h,r,t) may be true at some times and false at others. Static methods would be confused by contradictory facts (Obama and Trump both being president). Temporal methods condition entity/relation embeddings on \\tau to capture these dynamics.",
      hints: [
        "Temporal validity is fundamental: 'Company X CEO Y' is true only during Y's tenure, changing over time.",
        "Ignoring timestamps averages over temporal states, losing the temporal signal.",
      ],
    },
    {
      id: "q-gnn-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "RE-NET (Jin et al. 2020) uses a GNN + RNN architecture for temporal KG reasoning. The GNN and RNN serve what distinct roles?",
      options: [
        "GNN processes edge features; RNN processes node features",
        "At each timestep t, the GNN aggregates structural information from concurrent events (multi-relational graph at time t — capturing who interacted with whom and how); the RNN then updates entity representations by combining the GNN-encoded structural context across multiple historical timesteps, modeling temporal evolution",
        "GNN performs link prediction; RNN performs entity classification",
        "GNN handles discrete time; RNN handles continuous time",
      ],
      correctAnswer: 1,
      explanation:
        "RE-NET's two-component architecture: (1) GNN (Graph Recurrent Event Encoder): at each timestep t, a GNN aggregates information from all events concurrent with time t — capturing the relational context (what events co-occurred, creating a 'snapshot graph'). This gives a context-aware entity representation for time t; (2) RNN (GRU): sequences the GNN outputs across time steps t=1,2,...,T, modeling how entity representations evolve over history. Together: GNN captures 'breadth' (concurrent events) and RNN captures 'depth' (temporal evolution).",
      hints: [
        "The GNN handles the spatial/relational dimension at each time point; the RNN handles the temporal dimension across time points.",
        "This temporal-spatial factorization is common in video understanding and spatiotemporal prediction.",
      ],
    },
  ],

  "equivariance-symmetry": [
    {
      id: "q-gnn-kp15-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A GNN is said to be permutation equivariant if, for any permutation P of the node ordering, f(P·X, PAP^T) = P·f(X, A). This property is desirable because:",
      options: [
        "It allows the GNN to process graphs in sorted order, reducing computation",
        "The output representation for node v should not change if we relabel the nodes — the node ordering is arbitrary and should not affect the learned representations",
        "Equivariance allows the GNN to be trained without adjacency matrices",
        "Equivariance guarantees that the GNN can detect graph isomorphism",
      ],
      correctAnswer: 1,
      explanation:
        "Graphs have no canonical node ordering — the same graph can be represented as different adjacency matrices depending on how nodes are numbered. A permutation-equivariant GNN gives the same node representation for node v regardless of how the graph is indexed (the output permutes consistently with the input permutation). Most standard GNNs (GCN, GAT, GIN, GraphSAGE) are permutation equivariant by construction — the aggregation over neighbors is permutation-invariant (SUM, MEAN, MAX don't depend on order).",
      hints: [
        "Graph-level readout (READOUT: \\Sigma h_v or mean) is permutation-invariant (not equivariant) — the scalar output doesn't change.",
        "MLPs on adjacency matrices are NOT permutation-equivariant — this is why GNNs are preferred for graph data.",
      ],
    },
    {
      id: "q-gnn-kp15-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SE(3)-equivariant GNNs for 3D molecular data (e.g., DimeNet, PaiNN, SEGNN) are equivariant to both rotations (SO(3)) and translations (T(3)). Why is translation equivariance typically handled differently from rotation equivariance?",
      options: [
        "Translation equivariance requires complex number representations while rotation equivariance uses real numbers",
        "Translation is handled by using relative positions (r_{ij} = r_j - r_i, interatomic vectors) as inputs instead of absolute coordinates — absolute positions are translation-dependent, but distances and relative vectors are translation-invariant; rotation equivariance requires more sophisticated machinery (e.g., spherical harmonics, Clebsch-Gordan tensor products)",
        "Translation is a discrete symmetry while rotation is continuous, requiring different mathematical tools",
        "Translation equivariance is only needed for periodic systems (crystals) while rotation equivariance is needed for all molecules",
      ],
      correctAnswer: 1,
      explanation:
        "Translation equivariance is achieved trivially by using relative coordinates r_{ij} = r_j - r_i and interatomic distances d_{ij} = ||r_{ij}|| — these are translation-invariant by construction. Absolute positions r_i are never used as input. Rotation equivariance is more subtle: transforming a molecule by rotation R changes r_{ij} → R·r_{ij}. SO(3)-equivariant networks must produce features that transform consistently under R — requiring irreducible representations of SO(3) (spherical harmonics l=0,1,2,...) and equivariant tensor operations (Clebsch-Gordan products).",
      hints: [
        "DimeNet uses interatomic distances and angles (invariant to rotation) — achieving invariance, not equivariance.",
        "SEGNN and SE(3)-Transformer maintain equivariant feature vectors that transform like physical quantities under rotation.",
      ],
    },
    {
      id: "q-gnn-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Equivariant networks using spherical harmonics represent features as 'steerable vectors' that transform under SO(3) according to Wigner D-matrices. The order l determines:",
      options: [
        "The number of training parameters in the equivariant layer",
        "The type of rotation transformation: l=0 features are scalars (rotation-invariant), l=1 features are 3D vectors (rotate like atomic positions), l=2 features are rank-2 tensors (transform like matrices under rotation), with higher l enabling richer angular dependency",
        "The graph topology — l determines how many hops of message passing are performed",
        "The maximum atomic number of elements the network can process",
      ],
      correctAnswer: 1,
      explanation:
        "Spherical harmonic order l encodes rotational transformation type: l=0: scalar, invariant under SO(3) (good for energies); l=1: vector, transforms like positions under rotation (good for forces, dipole moments); l=2: rank-2 tensor, transforms like quadrupole moments; higher l: increasingly complex angular patterns. Networks like NequIP, MACE, and Allegro use features up to l=3 or l=4. Higher l = more expressive but more compute. The Clebsch-Gordan product combines features of orders (l1, l2) → (l3) where |l1-l2| ≤ l3 ≤ l1+l2.",
      hints: [
        "Equivariant neural network for force fields must produce force vectors (l=1) equivariantly from structure.",
        "MACE (2022) uses higher-order equivariant features and achieves state-of-the-art accuracy on MD17 molecular dynamics benchmarks.",
      ],
    },
  ],
};

registerQuestions(questions);
export default questions;
