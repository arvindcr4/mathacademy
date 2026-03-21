import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  'ssl-overview': [
    {
      id: 'q-ssl-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the defining characteristic of self-supervised learning (SSL) compared to supervised learning?',
      options: [
        'SSL requires more labelled data than supervised learning',
        'SSL generates supervisory signals automatically from the data itself, without requiring human-annotated labels',
        'SSL only works for image data, not text or audio',
        'SSL trains models on random noise to learn robust representations',
      ],
      correctAnswer: 1,
      explanation:
        'SSL creates its own supervision from unlabelled data (e.g., predict a masked word, identify the correct image rotation) — enabling learning from the vast amounts of unlabelled data that would be too expensive to annotate.',
      hints: [
        'Think about how BERT predicts masked words — where do the labels come from?',
        'The word "self" means the data itself provides the training signal, not external human annotation.',
      ],
    },
    {
      id: 'q-ssl-kp1-2',
      type: 'true-false',
      difficulty: 'easy',
      question:
        'The primary motivation for self-supervised learning is to leverage the vastly larger supply of unlabelled data compared to labelled data.',
      correctAnswer: 'true',
      explanation:
        'Human annotation is expensive and slow. The internet provides orders of magnitude more unlabelled images, text, and audio than labelled data. SSL methods unlock this resource for learning powerful representations.',
      hints: [
        'Compare the size of ImageNet (1M labelled images) to the total number of images on the web.',
        'Think about why labelling is the bottleneck for supervised learning at scale.',
      ],
    },
    {
      id: 'q-ssl-kp1-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'SSL representations are typically evaluated using what standard protocol?',
      options: [
        'Directly measuring the pre-text task performance (e.g., masked prediction accuracy)',
        'Freezing the SSL-trained encoder and training a linear classifier on top using labelled examples (linear probing)',
        'Fine-tuning the entire SSL model from scratch on the downstream labelled dataset',
        'Comparing the model\'s embedding distances to a human-defined similarity matrix',
      ],
      correctAnswer: 1,
      explanation:
        'Linear probing freezes the SSL encoder and only trains a linear layer on a labelled downstream dataset. Good linear probe accuracy indicates the encoder learned rich, linearly separable representations that are not merely memorising pre-text task patterns.',
      hints: [
        'A linear classifier can only use linearly separable features — what does high linear probe accuracy imply about the representations?',
        'Freezing the encoder isolates the quality of the learned representations from the downstream dataset size.',
      ],
    },
  ],

  'pretext-tasks': [
    {
      id: 'q-ssl-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In the rotation prediction pretext task for images, what is the model trained to do?',
      options: [
        'Generate a rotated version of the input image',
        'Predict which of {0°, 90°, 180°, 270°} a given image was rotated by',
        'Align two images to have the same orientation',
        'Predict the rotation invariant features of an image',
      ],
      correctAnswer: 1,
      explanation:
        'The rotation pretext task rotates images by one of four angles and asks the model to predict which rotation was applied. To solve this, the network must learn object-level features (orientation, shape) rather than low-level textures.',
      hints: [
        'The label (rotation angle) is generated automatically — no human needed.',
        'To predict the rotation, the model needs to understand what "upright" means — what features encode that?',
      ],
    },
    {
      id: 'q-ssl-kp2-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'The jigsaw puzzle pretext task trains a model to predict the permutation applied to image patches, encouraging it to learn spatial relationships between image regions.',
      correctAnswer: 'true',
      explanation:
        'Jigsaw puzzle SSL shuffles an image\'s patches and trains the network to identify the correct permutation. Solving this requires understanding how image regions relate spatially, learning features that capture scene structure.',
      hints: [
        'To reassemble a puzzle, you need to understand the content of each piece and how they fit together.',
        'Spatial relationships between patches are exactly the kind of structure a good visual representation should capture.',
      ],
    },
    {
      id: 'q-ssl-kp2-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key limitation of pretext task-based SSL (rotation, jigsaw) is that the representations may be biased toward solving the specific pretext task. What problem does this cause?',
      options: [
        'The model requires more compute than contrastive methods',
        'Features learned to solve a specific pretext task may not transfer well to downstream tasks that require different semantic information',
        'Pretext tasks cannot be applied to datasets with fewer than 1M images',
        'The pretext task labels are too noisy to train on',
      ],
      correctAnswer: 1,
      explanation:
        'Representations optimised for rotation prediction may encode orientation-related features at the expense of object identity or semantic content needed for classification. Contrastive methods reduce this bias by encouraging semantic similarity rather than solving a specific artificial task.',
      hints: [
        'A model perfect at rotation prediction may pay attention to low-level texture cues not useful for object recognition.',
        'Think about the gap between what the pretext task rewards and what downstream tasks require.',
      ],
    },
  ],

  'contrastive-learning': [
    {
      id: 'q-ssl-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The core objective of contrastive learning is to train an encoder such that:',
      options: [
        'Randomly sampled image pairs have similar embeddings',
        'Embeddings of semantically similar (positive) pairs are close, and embeddings of dissimilar (negative) pairs are far apart in the representation space',
        'All embeddings are mapped to the same point to minimise variance',
        'The encoder predicts the pixel values of its input from the embedding',
      ],
      correctAnswer: 1,
      explanation:
        'Contrastive learning (Chopra et al. 2005; reviewed in Weng 2021) uses positive pairs (augmented views of the same image, or related samples) and negative pairs (different images) to shape the embedding space: attract positives, repel negatives. The learned representation should reflect semantic similarity rather than surface statistics.',
      hints: [
        'Think of it as metric learning: close = similar, far = dissimilar.',
        'Positive pairs are typically created by augmenting the same image differently; negatives are other images.',
      ],
    },
    {
      id: 'q-ssl-kp3-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question:
        'In the InfoNCE loss L = −log[exp(sim(z_i,z_j)/τ) / Σ_{k≠i} exp(sim(z_i,z_k)/τ)], what is the role of the temperature parameter τ, and what value does SimCLR use?',
      options: [
        'τ controls learning rate; SimCLR uses τ = 1.0',
        'τ sharpens or smooths the similarity distribution: low τ (e.g., 0.07 in SimCLR) focuses more on hard negatives; high τ treats all negatives more uniformly',
        'τ determines how many negative samples are included in the denominator',
        'τ is fixed at τ = 0.5 for all contrastive methods and has no tunable effect',
      ],
      correctAnswer: 1,
      explanation:
        'Temperature τ scales the logits before the softmax: low τ makes the loss peaky (large gradient from hard negatives near the anchor), while high τ smooths the distribution. SimCLR uses τ=0.07 (found optimal via grid search); MoCo uses τ=0.07–0.2. τ is one of the most critical hyperparameters in contrastive SSL.',
      hints: [
        'Softmax with low temperature → peaky distribution; high temperature → uniform distribution.',
        'Hard negatives are close to the query in embedding space — low temperature amplifies their gradient signal.',
      ],
    },
    {
      id: 'q-ssl-kp3-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The InfoNCE loss has a direct connection to mutual information. What does maximising InfoNCE approximately achieve?',
      options: [
        'It minimises the reconstruction error between the encoder input and output',
        'It maximises a lower bound on the mutual information I(z_{t+k}; c_t) between future representations and the context vector — as shown in CPC (van den Oord et al., 2018)',
        'It minimises the entropy of the representation distribution',
        'It maximises the cosine similarity between all pairs of embeddings in the batch',
      ],
      correctAnswer: 1,
      explanation:
        'CPC (van den Oord et al., 2018) showed that the InfoNCE loss is a lower bound on the mutual information: I(z_{t+k}; c_t) ≥ log(N) − L_{InfoNCE}, where N is the number of negative samples. Maximizing InfoNCE encourages the encoder to capture information shared between the context and future observations — i.e., the semantic content invariant to augmentation.',
      hints: [
        'The InfoNCE loss was derived from Noise Contrastive Estimation and formalized as a MI bound in CPC.',
        'More negatives (larger N) → tighter lower bound → better MI approximation.',
      ],
    },
  ],

  'simclr': [
    {
      id: 'q-ssl-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question:
        'SimCLR uses the NT-Xent loss. NT-Xent stands for ___, and for a minibatch of N images it treats ___ other augmented samples as negatives per anchor.',
      options: [
        'Normalized Temperature-scaled Cross Entropy; 2(N−1) other samples',
        'Non-parametric Triplet Extreme loss; N−1 other samples',
        'Noise-Tolerant Cross Entropy loss; N other samples',
        'Neural Transformer eXtended Embedding loss; 2N other samples',
      ],
      correctAnswer: 0,
      explanation:
        'NT-Xent = Normalized Temperature-scaled Cross Entropy. SimCLR creates 2N augmented views for N images; for any anchor view i, the 2(N−1) other views (from both augmented copies of all other N−1 images) serve as negatives. The loss is: L_i = −log[exp(sim(z_i,z_j)/τ) / Σ_{k≠i}^{2N} exp(sim(z_i,z_k)/τ)], evaluated symmetrically.',
      hints: [
        'NT-Xent is the full name — Normalized (cosine similarity) Temperature-scaled Cross Entropy.',
        'Each image produces 2 views; so N images → 2N views → 2(N−1) negatives per anchor.',
      ],
    },
    {
      id: 'q-ssl-kp4-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'SimCLR uses a non-linear projection head (MLP) between the encoder and the contrastive loss, and the representations used for downstream tasks are taken from the encoder output, not the projection head output.',
      correctAnswer: 'true',
      explanation:
        'Chen et al. found that a 2-layer MLP projection head (g(h) = W_2·ReLU(W_1·h)) significantly improves representation quality. The projection head learns to discard augmentation-specific information not needed for contrastive loss, while the encoder retains it — so encoder outputs h are used for downstream tasks, not z = g(h). This finding boosted linear eval by ~10% compared to no projection head.',
      hints: [
        'The projection head is a "disposable" layer that improves training but whose output is discarded at evaluation.',
        'Think about why the features before the projection are more useful: the head compresses away information useful for classification.',
      ],
    },
    {
      id: 'q-ssl-kp4-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'SimCLR v1 with a ResNet-50 backbone achieves approximately ___% top-1 accuracy on ImageNet linear evaluation, and requires a batch size of ___ to achieve this.',
      options: [
        '76.5% top-1 accuracy; batch size 4096',
        '69.3% top-1 accuracy; batch size 4096',
        '58.0% top-1 accuracy; batch size 1024',
        '82.3% top-1 accuracy; batch size 8192',
      ],
      correctAnswer: 1,
      explanation:
        'SimCLR (Chen et al., 2020) achieves 69.3% top-1 linear evaluation accuracy on ImageNet with a ResNet-50 and batch size 4096 trained for 1000 epochs. With a larger ResNet-50 (4×) it reaches 76.5% — matching the supervised ResNet-50 baseline. Large batches (4096+) are needed because NT-Xent uses in-batch negatives.',
      hints: [
        'SimCLR requires very large batches because all other batch members serve as negatives — 4096 is standard.',
        'The 69.3% figure is for standard ResNet-50; the 76.5% requires a 4× wider model.',
      ],
    },
  ],

  'moco': [
    {
      id: 'q-ssl-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question:
        'MoCo (Momentum Contrast, He et al., 2019) maintains a queue of ___ encoded keys and updates the key encoder by exponential moving average with momentum coefficient m=___.',
      options: [
        'Queue size 65,536; momentum m = 0.999',
        'Queue size 4,096; momentum m = 0.9',
        'Queue size 1,000; momentum m = 0.99',
        'Queue size 131,072; momentum m = 0.9999',
      ],
      correctAnswer: 0,
      explanation:
        'MoCo uses a FIFO queue of 65,536 encoded keys as negatives. The key encoder θ_k is updated by EMA: θ_k ← 0.999·θ_k + 0.001·θ_q. High momentum (0.999) ensures keys from different mini-batches are encoded by nearly the same network, maintaining representation consistency across the queue. This decouples negative count (65k) from batch size.',
      hints: [
        'The queue stores 65,536 negatives — far more than any feasible batch size.',
        'Momentum 0.999 means the momentum encoder slowly tracks the query encoder without gradients.',
      ],
    },
    {
      id: 'q-ssl-kp5-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In MoCo, the momentum encoder\'s parameters are updated by backpropagating gradients through the key encoding path.',
      correctAnswer: 'false',
      explanation:
        'The momentum encoder\'s parameters are NOT updated by gradient backpropagation — the queue is not differentiable. They are updated by EMA: θ_k ← m·θ_k + (1−m)·θ_q (m=0.999). Backpropagating through the queue would require storing gradients for all 65k encoded keys, which is infeasible.',
      hints: [
        'Gradient-updating the momentum encoder would make it inconsistent with the older keys in the queue.',
        'EMA update: the momentum encoder slowly tracks the query encoder without gradients.',
      ],
    },
    {
      id: 'q-ssl-kp5-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'MoCo v3 and SimCLR v2 both found that using Vision Transformers (ViT) as encoders requires what training stability modification?',
      options: [
        'Gradient clipping with a maximum norm of 1.0',
        'Stopping gradient flow through the momentum encoder (already the case in MoCo) and careful learning rate warm-up, as ViT training is more sensitive to instability',
        'Reducing the queue size from 65536 to 256 for ViT models',
        'Replacing the NT-Xent loss with a triplet loss for ViT stability',
      ],
      correctAnswer: 1,
      explanation:
        'ViT-based contrastive training is prone to training instability (loss spikes, collapse). MoCo-v3 specifically identified that patching the ViT\'s patch projection layer to a frozen random projection prevents instability, alongside learning rate warm-up. Loss spikes occur when ViT\'s large attention span causes sudden representation shifts.',
      hints: [
        'ViTs are more sensitive to learning rate and batch size than CNNs in SSL settings.',
        'Training instability in SSL manifests as sudden loss spikes or complete representation collapse.',
      ],
    },
  ],

  'byol': [
    {
      id: 'q-ssl-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question:
        'BYOL (Bootstrap Your Own Latent, Grill et al., 2020) uses an asymmetric architecture to avoid collapse without negative pairs. The target network parameters ξ are updated by:',
      options: [
        'Gradient descent on the BYOL loss, same as the online network',
        'Exponential moving average (EMA) of the online network parameters: ξ ← τ·ξ + (1−τ)·θ, with τ = 0.996 increasing to 1 during training',
        'Random re-initialization at the start of each training epoch',
        'Averaging the online network parameters across all GPU workers in data-parallel training',
      ],
      correctAnswer: 1,
      explanation:
        'BYOL\'s target network is a momentum copy: ξ ← τ·ξ + (1−τ)·θ where τ starts at 0.996 and increases toward 1 using a cosine schedule. No gradients flow through the target network. The online network additionally has a predictor q_θ that the target lacks — this asymmetry combined with slow-moving EMA target prevents collapse.',
      hints: [
        'Most contrastive methods need negatives to prevent collapse (all embeddings becoming identical).',
        'BYOL uses asymmetry (predictor on online branch only) + EMA target — not explicit negatives.',
      ],
    },
    {
      id: 'q-ssl-kp6-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In BYOL, the target network\'s parameters are trained by gradient descent on the BYOL loss, just like the online network.',
      correctAnswer: 'false',
      explanation:
        'The target network in BYOL is a momentum-updated (EMA) copy of the online network — it receives no gradients at all. Only the online network is updated by gradient descent. Gradients are stopped before the target network (stop_gradient operation). This asymmetry is essential for preventing collapse.',
      hints: [
        'If both networks were gradient-updated with the same loss, they could collapse to the same constant output trivially.',
        'EMA makes the target a slow-moving "teacher" — consistent but not gradient-updated.',
      ],
    },
    {
      id: 'q-ssl-kp6-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question:
        'Fetterman & Albrecht (2020) showed that BYOL collapses when batch normalization is removed. What implicit mechanism does batch normalization provide that prevents this collapse?',
      options: [
        'BN normalises the loss gradient, making training more stable',
        'BN computes statistics (mean, variance) across the entire batch, introducing implicit dependencies between samples — effectively acting as a form of implicit negative comparison since the normalization of each sample\'s representation depends on all other samples in the batch',
        'BN reduces the effective learning rate for the momentum encoder',
        'BN prevents the predictor from becoming the identity function',
      ],
      correctAnswer: 1,
      explanation:
        'BN in the projection/prediction heads computes batch statistics: z_normalized = (z − μ_batch) / σ_batch. This normalization depends on all other samples in the batch, introducing implicit cross-sample interactions analogous to comparing against negatives. Without BN, BYOL collapses — revealing that its "negative-free" claim has a subtle asterisk.',
      hints: [
        'BN uses batch mean and variance — those statistics depend on ALL samples in the batch, not just the current one.',
        'When BN is removed from BYOL, representations collapse — suggesting BN provides implicit contrastive signal.',
      ],
    },
  ],

  'simsiam': [
    {
      id: 'q-ssl-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'SimSiam (Chen & He, 2021) avoids collapse without negative pairs or a momentum encoder. The SimSiam loss for a pair of views (z_1, z_2) is: L = −(1/2)[D(p_1, stopgrad(z_2)) + D(p_2, stopgrad(z_1))], where D is negative cosine similarity. What is the crucial role of stopgrad?',
      options: [
        'stopgrad freezes the projection head weights so only the encoder is trained',
        'stopgrad prevents gradients from flowing through one branch, breaking the trivial solution where both networks converge to output identical constant vectors',
        'stopgrad clips the gradient norm to prevent exploding gradients',
        'stopgrad is equivalent to adding L2 regularization on the target embeddings',
      ],
      correctAnswer: 1,
      explanation: 'Without stopgrad, minimizing −cosine_sim(p_1, z_2) can be trivially solved by collapsing both p_1 and z_2 to the same constant. stopgrad breaks the gradient symmetry: when computing ∂L/∂θ, z_2 is treated as constant (no gradient), so the network cannot exploit the shortcut. Chen & He analyze this as an EM-like alternating optimization.',
      hints: [
        'The stop-gradient is the key difference from BYOL — what happens to backpropagation when you stop gradients?',
        'If gradients can\'t flow through the target branch, the loss can\'t trivially collapse both branches together.',
      ],
    },
    {
      id: 'q-ssl-kp7-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Representation collapse in SimSiam occurs when the encoder maps all inputs to the same constant embedding, making the cosine similarity always 1 and the loss always −1 (the minimum possible value).',
      correctAnswer: 'true',
      explanation:
        'A collapsed SimSiam produces p_i = z_j = constant for all inputs, giving cosine_sim = 1 and loss = −1 trivially. This is a degenerate global minimum of the loss without stopgrad, but stopgrad prevents gradients from exploiting this solution.',
      hints: [
        'A constant embedding satisfies the "similar outputs for similar inputs" objective trivially.',
        'If all embeddings are the same, cosine similarity = 1 everywhere — the loss reaches its minimum without learning.',
      ],
    },
    {
      id: 'q-ssl-kp7-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Chen & He (SimSiam) show that stopgrad makes SimSiam behave like Expectation-Maximization. What are the E-step and M-step analogues?',
      options: [
        'E-step: compute positive pair embeddings; M-step: compute negative pair embeddings',
        'E-step: fix z (stopgrad branch, treat as cluster centers) and optimize p (predictor branch) — analogous to the E-step assigning data to clusters; M-step: update θ to improve the predictor — analogous to the M-step updating variables',
        'E-step: compute contrastive loss; M-step: update the momentum encoder',
        'E-step: select hard negatives; M-step: update the projection head using those negatives',
      ],
      correctAnswer: 1,
      explanation: 'With stopgrad, the SimSiam update alternates: (1) fix the target representations z (E-step: treat them as fixed targets like cluster assignments) and update the predictor p to match them; (2) update θ to improve z for the next iteration (M-step). This alternating optimization provably converges and does not degenerate to collapse, unlike the simultaneous update without stopgrad.',
      hints: [
        'EM alternates between fixing and optimising two sets of variables.',
        'The "stop-gradient branch" plays the role of fixed latent variables in the E-step.',
      ],
    },
  ],

  'barlow-twins': [
    {
      id: 'q-ssl-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Barlow Twins loss (Zbontar et al., 2021) is L_BT = Σ_i (1−C_{ii})² + λ Σ_i Σ_{j≠i} C_{ij}², where C_{ij} = Σ_b z^A_{b,i} z^B_{b,j} / (||z^A_{.,i}|| ||z^B_{.,j}||) is the cross-correlation matrix. What do the two terms separately enforce?',
      options: [
        'First term enforces decorrelation; second term enforces invariance across augmentations',
        'First term (invariance): push diagonal entries to 1 so each feature dimension is consistent across augmented views; second term (redundancy reduction): push off-diagonal entries to 0 so different embedding dimensions are decorrelated',
        'First term minimizes L2 distance between embeddings; second term maximizes cosine similarity',
        'First term prevents collapse; second term prevents mode dropping',
      ],
      correctAnswer: 1,
      explanation: 'The diagonal terms C_{ii} measure the correlation of embedding dimension i between the two views — pushing to 1 enforces view-invariance. The off-diagonal terms C_{ij} (i≠j) measure redundancy between dimensions — pushing to 0 decorrelates them, following Horace Barlow\'s redundancy reduction hypothesis (1961). The hyperparameter λ trades off these two objectives.',
      hints: [
        'An identity cross-correlation means: same feature is consistent across views (diagonal=1), different features are independent (off-diagonal=0).',
        'Think about what the identity matrix looks like — ones on diagonal, zeros off diagonal.',
      ],
    },
    {
      id: 'q-ssl-kp8-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Barlow Twins is inspired by H. Barlow\'s redundancy reduction principle (1961), which suggests that efficient neural coding should minimise redundancy between neurons to maximise the information capacity of the representation.',
      correctAnswer: 'true',
      explanation: 'Horace Barlow\'s "redundancy reduction" hypothesis proposes that the visual system encodes information with minimal redundancy between neurons — each neuron should convey independent information. Barlow Twins operationalizes this as decorrelating embedding dimensions (off-diagonal C_{ij} → 0), with the Barlow Twins name explicitly honoring this connection.',
      hints: [
        'The paper\'s name "Barlow Twins" references Horace Barlow, the neuroscientist who proposed redundancy reduction.',
        'Decorrelated embeddings encode independent features — minimal redundancy.',
      ],
    },
    {
      id: 'q-ssl-kp8-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Barlow Twins is empirically less sensitive to batch size than SimCLR. The cross-correlation matrix C has dimensions d×d where d is the embedding dimension. This explains reduced batch-size sensitivity because:',
      options: [
        'Barlow Twins does not use a softmax normalisation, which is batch-size-sensitive',
        'The cross-correlation matrix C is d×d regardless of batch size N; the signal quality improves with larger N (better correlation estimates) but the loss landscape does not sharply depend on N, unlike NT-Xent which has N−1 explicit negatives per anchor',
        'Barlow Twins uses a momentum encoder that reduces batch size sensitivity',
        'The off-diagonal decorrelation term is always zero regardless of batch size',
      ],
      correctAnswer: 1,
      explanation: 'In NT-Xent, each sample uses exactly 2(N−1) negatives — the loss directly collapses if N is too small. In Barlow Twins, the cross-correlation matrix always has d×d entries; N only affects the statistical quality of the correlation estimate. Empirically, Barlow Twins works with batch sizes as small as 256, while SimCLR needs 4096+.',
      hints: [
        'SimCLR\'s NT-Xent explicitly uses all other batch items as negatives — the loss changes dramatically with N.',
        'Barlow Twins\' cross-correlation matrix size is determined by embedding dimension d, not batch size N.',
      ],
    },
  ],

  'vicreg': [
    {
      id: 'q-ssl-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'VICReg stands for Variance-Invariance-Covariance Regularisation. What do the three terms penalise/encourage?',
      options: [
        'Variance: maximise embedding spread; Invariance: minimise distance between positive pairs; Covariance: decorrelate embedding dimensions',
        'Variance: minimise embedding spread; Invariance: minimise distance between negative pairs; Covariance: maximise cross-correlation',
        'Variance: maximise cosine similarity; Invariance: penalise large gradients; Covariance: enforce unit norm',
        'Variance: penalise embedding collapse; Invariance: maximise mutual information; Covariance: enforce diagonal covariance',
      ],
      correctAnswer: 0,
      explanation:
        'VICReg\'s variance term prevents collapse by keeping embedding standard deviation above a threshold; the invariance term attracts embeddings of positive pairs; the covariance term decorrelates embedding dimensions to prevent redundancy.',
      hints: [
        'Each term in VICReg addresses a specific failure mode or goal: collapse prevention, invariance, efficiency.',
        'Think about each word: Variance (spread), Invariance (stability across views), Covariance (independence of dimensions).',
      ],
    },
    {
      id: 'q-ssl-kp9-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'VICReg does not require negative pairs and prevents collapse using explicit variance regularisation that forces the standard deviation of each embedding dimension to stay above a minimum threshold.',
      correctAnswer: 'true',
      explanation:
        'VICReg replaces implicit collapse prevention (negatives, stop-gradient, momentum encoder) with an explicit variance term that penalises collapse directly if any embedding dimension\'s standard deviation drops below 1.',
      hints: [
        'If all embeddings collapse to the same point, each dimension\'s variance drops to zero — the variance term penalises this directly.',
        'Think about how making variance regularisation explicit removes the need for other implicit anti-collapse mechanisms.',
      ],
    },
    {
      id: 'q-ssl-kp9-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'VICReg is designed to be easily extendable to the multimodal setting. What property of its loss makes this straightforward?',
      options: [
        'VICReg uses a shared encoder for both modalities by design',
        'The three terms operate on each branch\'s embeddings independently — variance and covariance are single-branch terms, while invariance is the cross-branch term — making it easy to apply to heterogeneous modalities with separate encoders',
        'VICReg does not require positive pairs, so any two samples from different modalities can be paired',
        'VICReg uses a symmetric loss that doesn\'t require knowing which modality is which',
      ],
      correctAnswer: 1,
      explanation:
        'Variance and covariance terms regularise each branch independently; only the invariance term crosses branches. This modular structure allows using separate encoders for different modalities (text, image, audio) and applying the three terms to their respective embeddings.',
      hints: [
        'When modalities differ (e.g., image and text), you need separate encoders — VICReg\'s structure accommodates this.',
        'The invariance term just compares embeddings from the two branches — it doesn\'t care what those branches encode.',
      ],
    },
  ],

  'dino': [
    {
      id: 'q-ssl-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'DINO (Self-DIstillation with NO labels, Caron et al., 2021) trains a student to match the output of a teacher network. The teacher parameters ξ are updated by:',
      options: [
        'Backpropagating the cross-entropy loss between student and teacher softmax outputs',
        'Exponential moving average of the student parameters: ξ ← λξ + (1−λ)θ, with no gradient flowing through the teacher — the student minimizes H(P_t(x), P_s(x\')), where x and x\' are different crops',
        'Random re-initialization every 100 epochs to prevent teacher collapse',
        'Training the teacher on a separate labeled dataset and distilling to the student',
      ],
      correctAnswer: 1,
      explanation: 'DINO\'s teacher is a momentum copy: ξ ← λξ + (1−λ)θ (no gradient). The student minimizes cross-entropy H(P_t, P_s) where P_t = softmax((g_ξ(x) − c)/τ_t), using the teacher\'s output with centering vector c and teacher temperature τ_t < τ_s. Different global/local crops create the view pair — a form of knowledge distillation requiring no labels.',
      hints: [
        '"Self" distillation: the teacher comes from the student itself via exponential moving average.',
        'No labels: the training signal is the teacher\'s output distribution, not a human-assigned class.',
      ],
    },
    {
      id: 'q-ssl-kp10-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'DINO with ViT encoders produces attention maps that unsupervisedly segment objects in images — the [CLS] token\'s self-attention heads attend to semantically coherent foreground regions without any segmentation supervision.',
      correctAnswer: 'true',
      explanation: 'DINO-ViT\'s self-attention from the [CLS] token naturally concentrates on semantically relevant object regions, producing sharp segmentation-like attention maps without any pixel-level annotation. This emergent property (Caron et al., 2021) is not observed in supervised ViTs or CNN-based SSL — it requires the DINO multi-crop objective with ViT architecture.',
      hints: [
        'ViT attention is computed globally across patches — SSL trains this attention to focus on semantically consistent object regions.',
        'The attention maps from the [CLS] token show which patches are semantically relevant — without any label guidance.',
      ],
    },
    {
      id: 'q-ssl-kp10-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'DINO uses two mechanisms to prevent collapse: "centering" and "sharpening." What do these operations do to the teacher\'s output, and why are both needed?',
      options: [
        'Centering subtracts the batch mean from teacher outputs (prevents one dimension from dominating); sharpening uses a low temperature τ_t for the teacher softmax (prevents uniform collapse). Both are needed because centering alone leads to a uniform distribution, and sharpening alone leads to a single-class collapse',
        'Centering normalizes embeddings to unit sphere; sharpening applies L1 regularization to the output',
        'Centering computes the running mean of gradients for stability; sharpening amplifies the top-k logits by 10×',
        'Centering removes the bias term from the teacher projection head; sharpening applies ReLU to teacher outputs',
      ],
      correctAnswer: 0,
      explanation: 'Centering: P_t = softmax((g_ξ(x) − c)/τ_t), where c ← m·c + (1−m)·E[g_ξ(x)] (running mean). Without centering, the teacher may collapse to one dominant output dimension (mode collapse). Sharpening via low τ_t (e.g., 0.04 vs student τ_s=0.1) makes the teacher distribution peaked, preventing uniform collapse. The two mechanisms counteract opposite failure modes.',
      hints: [
        'Mode collapse → centering prevents it (subtracts running mean to keep outputs balanced).',
        'Uniform distribution → sharpening prevents it (low temperature makes predictions peaked).',
      ],
    },
  ],

  'masked-autoencoder': [
    {
      id: 'q-ssl-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In Masked Autoencoders (MAE, He et al., 2022), the model is trained on ImageNet by masking ___ of image patches and reconstructing the ___ of masked patches.',
      options: [
        '75% of patches; the normalized pixel values (mean/std per patch)',
        '15% of patches; the original pixel values',
        '50% of patches; the discrete token IDs from a dVAE codebook',
        '90% of patches; the frequency-domain (FFT) representation',
      ],
      correctAnswer: 0,
      explanation: 'MAE masks 75% of 16×16 patches and trains a ViT encoder-decoder to reconstruct the normalized pixel values (mean and std computed per patch) of masked patches. The ViT encoder processes only the 25% visible patches (no mask tokens), and a lightweight Transformer decoder reconstructs the full image. This asymmetric design makes pre-training 3× faster than encoding all patches.',
      hints: [
        'Think of MAE as a vision equivalent of BERT: mask some tokens, predict what was masked.',
        'The encoder only processes visible patches (~25%) — greatly reducing compute compared to encoding everything.',
      ],
    },
    {
      id: 'q-ssl-kp11-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'MAE applies the ViT encoder only to the unmasked (visible) patches and does NOT include [MASK] tokens in the encoder input — [MASK] tokens are only added in the decoder, making the encoder asymmetrically lightweight.',
      correctAnswer: 'true',
      explanation: 'By excluding [MASK] tokens from the encoder (unlike BEiT), MAE\'s encoder processes only ~25% of patches at full ViT depth. Mask tokens are added only in the lightweight decoder, which reconstructs the full image. This design is key to MAE\'s 3× training speedup and its ability to pre-train very large models (ViT-L, ViT-H) efficiently.',
      hints: [
        'If you mask 75% of patches and only encode the rest, the encoder sees 4× fewer tokens — huge compute savings.',
        'The decoder handles the masked positions — keeping it lightweight enables efficient pretraining.',
      ],
    },
    {
      id: 'q-ssl-kp11-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'MAE uses a very high masking ratio (75%) compared to BERT\'s 15% word masking. The authors justify this because:',
      options: [
        'Images have fewer total tokens than text, so a higher ratio is needed for sufficient signal',
        'Images have high spatial redundancy — neighboring patches are highly correlated — so a low masking ratio allows the model to solve the task by simple interpolation rather than high-level semantic understanding; 75% forces the model to reason about global scene structure',
        'Higher masking enables the decoder to hallucinate realistic-looking textures from noise',
        'A 75% ratio reduces the encoder compute to match BERT\'s token count per forward pass',
      ],
      correctAnswer: 1,
      explanation: 'He et al. ablated masking ratios from 25% to 90% and found 75% optimal: below 50%, the task is too easy (local interpolation suffices); above 80%, too little context makes reconstruction ill-posed. High redundancy in image pixels is the key reason a much higher ratio than text masking is needed to create a non-trivial learning task.',
      hints: [
        'Adjacent pixels/patches are correlated in images — with 15% masking, a model can "paint over" masked patches trivially.',
        'High masking forces the encoder to build a global, semantic model of the scene.',
      ],
    },
  ],

  'bert-ssl': [
    {
      id: 'q-ssl-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'BERT\'s Masked Language Modelling (MLM) pretext task works by:',
      options: [
        'Generating a rotated version of the input image',
        'Randomly masking 15% of input tokens and training the model to predict the original masked tokens from surrounding context',
        'Aligning two images to have the same orientation',
        'Predicting the rotation invariant features of an image',
      ],
      correctAnswer: 1,
      explanation:
        'BERT randomly replaces 15% of tokens with [MASK] and trains a bidirectional Transformer to predict the original tokens using context from both directions — a self-supervised objective that requires deep language understanding.',
      hints: [
        'The labels are the original words before masking — generated automatically from the text itself.',
        'Bidirectional context is key: BERT can look left and right to fill in the mask.',
      ],
    },
    {
      id: 'q-ssl-kp12-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'BERT\'s Next Sentence Prediction (NSP) task, which predicts whether two sentences are consecutive, was later found to be largely unnecessary and was dropped in models like RoBERTa.',
      correctAnswer: 'true',
      explanation:
        'RoBERTa\'s ablation studies found that NSP provides little or no benefit and can even hurt downstream performance. Removing NSP and training longer on more data with larger batches significantly improves results.',
      hints: [
        'The NSP task may be too easy — a model can solve it using superficial cues rather than deep sentence understanding.',
        'RoBERTa is "Robustly Optimised BERT" — one of its key changes was removing NSP.',
      ],
    },
    {
      id: 'q-ssl-kp12-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'BERT uses a [MASK] token during pre-training but this token never appears during fine-tuning, creating a train-test mismatch. How does BERT\'s training procedure partially mitigate this?',
      options: [
        'BERT adds a small amount of Gaussian noise to all tokens during fine-tuning',
        'Of the 15% selected tokens, 80% are replaced by [MASK], 10% are replaced by a random token, and 10% are left unchanged — forcing the model to develop representations for all tokens, not just [MASK] positions',
        'BERT uses a separate fine-tuning-specific vocabulary that includes [MASK]',
        'BERT pre-trains a second model on unmasked sequences to bridge the train-test gap',
      ],
      correctAnswer: 1,
      explanation:
        'The 10% unchanged tokens ask the model: "are you sure this token is correct?" — it must represent all tokens robustly.',
      hints: [
        'If the model only ever sees [MASK] at prediction positions, it learns [MASK]-specific features that don\'t transfer.',
        'The 10% unchanged tokens ask the model: "are you sure this token is correct?" — it must represent all tokens robustly.',
      ],
    },
  ],

  'gpt-ssl': [
    {
      id: 'q-ssl-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'GPT\'s autoregressive language modelling pretext task trains the model to:',
      options: [
        'Predict all tokens simultaneously given a bidirectional context',
        'Predict the next token given only the preceding tokens (causal language modelling)',
        'Predict a randomly masked subset of tokens from the full bidirectional context',
        'Predict the first token of a sentence given the rest of the sentence',
      ],
      correctAnswer: 1,
      explanation:
        'GPT uses causal (left-to-right) language modelling: at each position, the model predicts the next token using only the tokens that came before it. This is enforced by a causal (masked) self-attention mechanism.',
      hints: [
        'Causal = one-directional = cannot look at future tokens.',
        'Think about how a language model generates text: one token at a time, each conditioned on previous tokens.',
      ],
    },
    {
      id: 'q-ssl-kp13-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'The key difference between BERT (masked LM) and GPT (causal LM) as SSL approaches is that BERT uses bidirectional context for each token while GPT uses only left-to-right (unidirectional) context.',
      correctAnswer: 'true',
      explanation:
        'BERT\'s bidirectional attention allows each token to attend to the full sentence context, making it powerful for understanding tasks. GPT\'s causal attention only uses past context, making it naturally suited for text generation.',
      hints: [
        'Bidirectional context is better for understanding (e.g., NER, classification); unidirectional is necessary for generation.',
        'Think about why you can\'t use bidirectional attention for text generation: you can\'t see future tokens.',
      ],
    },
    {
      id: 'q-ssl-kp13-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Autoregressive SSL (GPT-style) scales extremely well with data and model size. What property of the causal LM objective explains this empirical scaling behaviour?',
      options: [
        'Causal LM has a lower computational cost per token than masked LM, allowing larger batches',
        'Causal LM trains on every token position simultaneously as a prediction target (all T tokens per sequence), providing dense learning signal that scales efficiently with sequence length and data quantity',
        'Causal LM avoids the train-test mismatch of masked LM, making fine-tuning more efficient',
        'Causal LM uses a simpler loss function that is easier to optimise at large scale',
      ],
      correctAnswer: 1,
      explanation:
        'In causal LM, every token position contributes a prediction target — a sequence of length T provides T training signals simultaneously. This dense supervision scales linearly with data and benefits enormously from scale, explaining empirical scaling laws.',
      hints: [
        'Masked LM only predicts 15% of tokens; causal LM predicts every token. How does that affect sample efficiency?',
        'Dense supervision = more learning signal per sequence = better scaling with data quantity.',
      ],
    },
  ],

  'wav2vec-ssl': [
    {
      id: 'q-ssl-kp14-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'wav2vec 2.0 applies a contrastive SSL objective to speech. What does it contrast?',
      options: [
        'Two different speakers saying the same word',
        'The correct quantised speech representation for a masked time step against distractor (negative) quantised representations',
        'Clean speech against noise-augmented speech',
        'Short clips of speech against long clips of the same utterance',
      ],
      correctAnswer: 1,
      explanation:
        'wav2vec 2.0 masks spans of speech features, quantises the unmasked context, and trains a Transformer to identify the correct quantised target for each masked time step among a set of distractors — a contrastive objective applied to raw speech.',
      hints: [
        'Think of it as BERT for speech: mask time steps, train to predict what was masked.',
        'The "contrast" is between the correct quantised unit and multiple distractors from the same batch.',
      ],
    },
    {
      id: 'q-ssl-kp14-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'wav2vec 2.0 uses a product quantisation module to discretise continuous speech features into a finite vocabulary of speech units (pseudo-phonemes), which serve as the prediction targets.',
      correctAnswer: 'true',
      explanation:
        'The quantisation module in wav2vec 2.0 learns a codebook of discrete speech representations (Gumbel-softmax). The model must predict which codebook entry corresponds to each masked frame — creating a discrete target like a "speech vocabulary" without any phoneme labels.',
      hints: [
        'Discretisation converts continuous audio features into a finite set of tokens — analogous to a text vocabulary.',
        'Gumbel-softmax enables differentiable discrete selection during training.',
      ],
    },
    {
      id: 'q-ssl-kp14-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key result from wav2vec 2.0 was achieving competitive ASR performance with very few labelled minutes of speech. What makes the SSL pre-training so data-efficient for downstream ASR?',
      options: [
        'The pre-trained features are already language-specific and require no adaptation',
        'The SSL objective forces the model to learn rich acoustic and phonetic representations from unlabelled audio, so fine-tuning only needs to learn the language-specific mapping from these representations to characters/words',
        'The quantisation module pre-labels audio with phonemes, reducing the annotation burden',
        'The contrastive loss compresses the audio to a low-dimensional space that is easy to decode',
      ],
      correctAnswer: 1,
      explanation:
        'After SSL pre-training on thousands of hours of unlabelled audio, the representations capture fine-grained acoustic structure. Fine-tuning on a small labelled set only needs to align these representations with text transcriptions — a much simpler task than learning acoustics from scratch.',
      hints: [
        'The hard part of ASR is learning acoustic features — SSL does this from unlabelled data.',
        'With good representations, fine-tuning on 10 minutes of labelled data can approach results from 100 hours.',
      ],
    },
  ],

  'data2vec': [
    {
      id: 'q-ssl-kp15-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'data2vec unifies SSL across modalities (vision, text, speech) by using the same training objective. What is that objective?',
      options: [
        'Predict discrete tokens (words or codebook entries) for masked positions in each modality',
        'Predict the continuous latent representations of masked positions produced by a teacher network (EMA of the student), rather than modality-specific discrete targets',
        'Maximising the mutual information between two augmented views in each modality',
        'Reconstruct raw pixels/audio/text tokens for masked positions',
      ],
      correctAnswer: 1,
      explanation:
        'data2vec trains a student to predict the top-K averaged encoder states (from the EMA teacher) for masked positions — a unified continuous target that applies the same framework to all modalities without modality-specific discretisation.',
      hints: [
        'Instead of predicting discrete tokens (BERT-style) or pixels (MAE-style), data2vec predicts the teacher\'s continuous representations.',
        'One objective, one architecture template — applied to all modalities.',
      ],
    },
    {
      id: 'q-ssl-kp15-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'data2vec avoids the need for modality-specific quantisation steps (like the codebook in wav2vec 2.0) by using a unified continuous target for all modalities.',
      correctAnswer: 'true',
      explanation:
        'Quantisation (wav2vec 2.0 for speech, dVAE for images in BEiT) requires modality-specific design. data2vec replaces discrete targets with continuous teacher embeddings, eliminating this modality-specific preprocessing step and making the framework truly unified.',
      hints: [
        'Quantisation requires designing a codebook for each modality — data2vec skips this entirely.',
        'Continuous targets from the teacher apply uniformly to any modality that can be Transformer-encoded.',
      ],
    },
    {
      id: 'q-ssl-kp15-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'data2vec uses top-K layer averaging from the teacher for its prediction targets. Why might averaging multiple top layers be better than using only the final layer?',
      options: [
        'The final layer is too computationally expensive to use as a target for every masked position',
        'Averaging top-K layers smooths the target representation, combining semantic information from the upper layers with structural information from slightly lower layers, producing richer and more stable targets',
        'The final layer in the teacher collapses to zero during training without averaging',
        'Top-K averaging reduces the dimensionality of the target vector, making prediction easier',
      ],
      correctAnswer: 1,
      explanation:
        'Upper transformer layers encode different aspects of the representation (top layer = most abstract, lower layers = more structural). Averaging them provides a richer, multi-scale target that is more informative than any single layer alone and more stable due to averaging noise.',
      hints: [
        'Think about what different layers in a Transformer encode — do they all capture the same information?',
        'Averaging is a form of ensembling: it reduces variance while preserving the shared signal.',
      ],
    },
  ],

  'ibot': [
    {
      id: 'q-ssl-kp16-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'iBOT (Image BERT Pre-Training with Online Tokeniser) combines which two SSL approaches?',
      options: [
        'Contrastive learning (SimCLR-style) and masked language modelling (BERT-style)',
        'Self-distillation (DINO-style) at the image level with masked patch prediction using an online tokeniser — combining instance-level and patch-level objectives',
        'Generative pretraining (GPT-style) with rotation prediction pretext tasks',
        'Barlow Twins redundancy reduction with masked autoencoding reconstruction',
      ],
      correctAnswer: 1,
      explanation:
        'iBOT applies DINO\'s self-distillation loss on the [CLS] token (image-level invariance) and simultaneously trains a masked patch prediction head using the teacher as an online tokeniser — combining global and local SSL objectives in one framework.',
      hints: [
        'DINO provides global (image-level) self-distillation; iBOT adds local (patch-level) masked prediction.',
        'The "online tokeniser" is the EMA teacher — it generates patch-level targets the student must predict.',
      ],
    },
    {
      id: 'q-ssl-kp16-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'In iBOT, the online tokeniser (teacher) produces soft token distributions as targets for masked patches, rather than requiring a pre-trained discrete vocabulary like BEiT.',
      correctAnswer: 'true',
      explanation:
        'Unlike BEiT which uses a pre-trained dVAE as a fixed tokeniser, iBOT\'s teacher evolves during training (EMA of the student), producing soft token distributions that improve as training progresses — eliminating the need for a separate pre-training stage for the tokeniser.',
      hints: [
        'BEiT\'s tokeniser is fixed and pre-trained; iBOT\'s tokeniser is online and improves jointly with the student.',
        'Soft distributions are more informative targets than hard discrete tokens.',
      ],
    },
    {
      id: 'q-ssl-kp16-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'iBOT achieves strong performance on both image classification (linear probe) and dense prediction tasks (detection, segmentation). What architecture property of iBOT explains this breadth?',
      options: [
        'iBOT uses a CNN backbone optimised for feature pyramid networks',
        'The patch-level masked prediction objective trains all patch tokens (not just the [CLS] token) to be semantically rich, providing dense features suitable for both global and local downstream tasks',
        'iBOT uses a larger embedding dimension than DINO, providing more expressive features for all tasks',
        'iBOT applies gradient clipping that regularises patch features toward a shared global representation',
      ],
      correctAnswer: 1,
      explanation:
        'The masked patch prediction objective forces every patch token to encode meaningful semantic content (not just the [CLS] token). This yields dense, locally informative representations that are valuable for detection and segmentation, which require per-region features rather than global image embeddings.',
      hints: [
        'DINO focuses on the [CLS] token — are patch tokens also informative for detection/segmentation?',
        'Dense prediction tasks need spatially resolved features — which SSL objective encourages informative patch tokens?',
      ],
    },
  ],

  'ssl-theory': [
    {
      id: 'q-ssl-kp17-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The "augmentation graph" framework for understanding contrastive SSL defines positive pairs as nodes connected by edges. What determines the quality of representations according to this framework?',
      options: [
        'The number of nodes (images) in the graph determines representation quality',
        'The spectral structure of the augmentation graph — good representations should reflect the connected components (semantic classes) in the graph formed by augmentation-related positive pairs',
        'The degree distribution of the augmentation graph determines how many negatives each sample has',
        'The edge weights in the augmentation graph determine the contrastive loss temperature',
      ],
      correctAnswer: 1,
      explanation:
        'HaoChen et al. showed that contrastive SSL can be understood as spectral decomposition of the augmentation graph. Samples connected by augmentations (same content) form clusters; good representations should reflect these clusters, which align with semantic classes if augmentations are semantically invariant.',
      hints: [
        'Think about which samples are connected in the augmentation graph: those with the same semantic content.',
        'Spectral clustering finds the same communities — contrastive SSL is implicitly doing this.',
      ],
    },
    {
      id: 'q-ssl-kp17-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'The "uniformity-alignment" framework (Wang & Isola) decomposes contrastive SSL objectives into two desirable properties: alignment (positive pairs close together) and uniformity (embeddings spread uniformly on the hypersphere).',
      correctAnswer: 'true',
      explanation:
        'Wang & Isola showed that NT-Xent implicitly optimises alignment (positive pair similarity) and uniformity (uniform coverage of the representation sphere). Both are necessary: alignment alone causes collapse; uniformity alone ignores semantic structure.',
      hints: [
        'Alignment: same semantics → close embeddings. Uniformity: don\'t waste hypersphere capacity by clustering.',
        'Uniformity prevents collapse by encouraging the model to "use" all of the embedding space.',
      ],
    },
    {
      id: 'q-ssl-kp17-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Theoretical analysis shows that SSL representations can provably benefit downstream supervised tasks under what key assumption?',
      options: [
        'The downstream task uses the same augmentations as SSL pre-training',
        'The augmentations used in SSL preserve the semantic labels of the downstream task — i.e., augmented views of the same image have the same class label',
        'The downstream task has at least as many classes as the SSL pre-training had negatives',
        'The SSL encoder is larger than the supervised classifier applied on top of it',
      ],
      correctAnswer: 1,
      explanation:
        'Tian et al. and others formalised that SSL benefits downstream tasks if augmentations are "label-preserving" — an augmented view retains the same label as the original. Under this assumption, SSL representations that are invariant to augmentations are also informative for the downstream task.',
      hints: [
        'If the augmentation changes the label (e.g., flipping "left" and "right" for a chirality task), SSL would hurt.',
        'Think about the role of augmentations: they define what information SSL is forced to capture (augmentation-invariance) and discard (augmentation-specific).',
      ],
    },
  ],

  'ssl-augmentation': [
    {
      id: 'q-ssl-kp18-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'SimCLR ablation studies found that which combination of augmentations is most critical for learning good visual representations?',
      options: [
        'Random horizontal flip and Gaussian blur',
        'Random cropping and colour distortion (jitter + grayscale)',
        'Random rotation and cutout',
        'Gaussian noise and random erasing',
      ],
      correctAnswer: 1,
      explanation:
        'Chen et al. showed that random crop (with resize) combined with colour distortion is the most impactful augmentation pair. Crop forces the model to match different spatial views; colour distortion prevents colour histogram shortcuts.',
      hints: [
        'Random crop creates views that don\'t share pixel positions — the model must match them semantically.',
        'Colour distortion prevents the model from using colour as a trivial shortcut for matching views.',
      ],
    },
    {
      id: 'q-ssl-kp18-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Augmentations that are too strong (destroying semantic content) will hurt SSL performance because positive pairs no longer share meaningful information.',
      correctAnswer: 'true',
      explanation:
        'If augmentations are so severe that positive pair views share no semantic content, the contrastive objective has no valid learning signal — the model cannot learn to match truly different (augmented-beyond-recognition) views of the same image.',
      hints: [
        'Think about augmenting an image so strongly that you can no longer tell it\'s a cat — can the model learn "catness" from such pairs?',
        'Augmentation strength is a dial: too weak = no invariance learned; too strong = no shared information.',
      ],
    },
    {
      id: 'q-ssl-kp18-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Multi-crop augmentation (used in SwAV) samples one or two large crops and several small crops from an image. What is the advantage of this strategy?',
      options: [
        'Small crops provide negatives from different regions of the same image',
        'Small crops provide more localised views at lower compute cost; the model matches small local crops to large global views, learning local-to-global consistency with less memory per step than using many large crops',
        'Multi-crop ensures that all crops have the same resolution for consistent feature extraction',
        'Small crops act as a data augmentation that prevents the model from memorising specific image crops',
      ],
      correctAnswer: 1,
      explanation:
        'Multi-crop increases the number of views per image without proportionally increasing compute (small crops are cheaper to encode). Matching small local crops to large global crops encourages the model to learn that local patches are consistent with the global scene representation.',
      hints: [
        'More views = more positive pairs = richer learning signal, but full-resolution crops are expensive.',
        'Small crops can be encoded cheaply; matching them to large crops teaches local-global consistency.',
      ],
    },
  ],

  'ssl-negative-free': [
    {
      id: 'q-ssl-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Methods like BYOL, SimSiam, Barlow Twins, and VICReg are called "negative-free" because:',
      options: [
        'They are trained on datasets with no negative (harmful) content',
        'They do not explicitly use dissimilar (negative) sample pairs in their training objective',
        'They use negative learning rates for some parameters',
        'They remove negative values from embeddings by applying ReLU activations',
      ],
      correctAnswer: 1,
      explanation:
        'Negative-free SSL methods achieve strong representations using only positive pairs (augmented views of the same image) and various collapse-prevention mechanisms — no explicit repulsion between different images is used.',
      hints: [
        'Not all methods are truly negative-free — they may use implicit negative signals.',
        'These methods show you don\'t need to explicitly repel different images to learn good representations.',
      ],
    },
    {
      id: 'q-ssl-kp19-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'All negative-free SSL methods prevent representational collapse using the same mechanism (stop-gradient).',
      correctAnswer: 'false',
      explanation:
        'Different negative-free methods use distinct anti-collapse mechanisms: BYOL uses a momentum encoder + predictor asymmetry; SimSiam uses stop-gradient; Barlow Twins uses cross-correlation decorrelation; VICReg uses explicit variance regularisation.',
      hints: [
        'Each term in VICReg addresses a specific failure mode or goal: collapse prevention, invariance, efficiency.',
        'Think about each word: Variance (spread), Invariance (stability across views), Covariance (independence of dimensions).',
      ],
    },
    {
      id: 'q-ssl-kp19-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A unified theoretical analysis of negative-free methods by Tian et al. suggests they all implicitly enforce what property to prevent collapse?',
      options: [
        'Maximisation of the representation entropy over the data distribution',
        'Dimensional non-collapse: ensuring the covariance matrix of the representations has full rank (all eigenvalues non-zero), preventing degenerate low-dimensional solutions',
        'Maximisation of the mutual information between positive pairs using a lower bound',
        'Enforcing that gradients flow equally through all layers of the encoder',
      ],
      correctAnswer: 1,
      explanation:
        'Whether through explicit covariance (Barlow Twins, VICReg), predictor asymmetry (BYOL, SimSiam), or centering (DINO), all negative-free methods implicitly prevent the embedding covariance matrix from being rank-deficient — maintaining full-dimensional representations.',
      hints: [
        'Rank collapse means all representations lie in a lower-dimensional subspace — equivalent to losing information.',
        'Full-rank covariance means all embedding dimensions carry independent variance — the model uses all of its capacity.',
      ],
    },
  ],

  'ssl-graphs': [
    {
      id: 'q-ssl-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Applying contrastive SSL to graph data (e.g., GraphCL) requires defining positive pairs. How are they typically created for graph-level SSL?',
      options: [
        'By pairing nodes from the same graph as positive pairs',
        'By creating two augmented views of the same graph (e.g., node dropping, edge perturbation, attribute masking) as a positive pair',
        'By pairing graphs with similar degree distributions as positive pairs',
        'By pairing the graph with its complement graph as a positive pair',
      ],
      correctAnswer: 1,
      explanation:
        'GraphCL applies graph augmentations (node dropping, edge perturbation, subgraph sampling, attribute masking) to create two views of the same graph and trains a GNN encoder to produce similar embeddings for the pair — a direct adaptation of contrastive SSL to graphs.',
      hints: [
        'Think about what "augmentation" means for a graph: you can perturb nodes, edges, or attributes.',
        'Two augmented views of the same graph should share the same semantic meaning — just like two crops of the same image.',
      ],
    },
    {
      id: 'q-ssl-kp20-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Node-level SSL on graphs can use the graph structure itself as a self-supervised signal, for example by predicting the masked features of a node from its neighbours\' features.',
      correctAnswer: 'true',
      explanation:
        'Node-level SSL methods (e.g., GPT-GNN, GraphMAE) mask node features and train a GNN to reconstruct them using neighbourhood context — leveraging the graph\'s structural inductive bias for self-supervised representation learning.',
      hints: [
        'The graph structure provides rich context: a node\'s neighbours encode its local neighbourhood information.',
        'This is analogous to BERT\'s masked prediction, but applied to graph nodes instead of text tokens.',
      ],
    },
    {
      id: 'q-ssl-kp20-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key challenge in designing augmentations for graph SSL is that some augmentations can change the semantic meaning of the graph. In molecular property prediction, what augmentation would be inappropriate?',
      options: [
        'Randomly dropping 10% of non-critical edges',
        'Randomly removing atoms (nodes) that are part of functional groups critical to the molecule\'s biological activity',
        'Adding random noise to continuous node features like atomic mass',
        'Randomly masking non-functional node attributes like 3D coordinates',
      ],
      correctAnswer: 1,
      explanation:
        'Removing atoms from functional groups (e.g., -OH, -NH₂) changes the molecule\'s chemical identity and properties. The positive pair would have different labels — violating the semantic-preservation requirement for SSL augmentations.',
      hints: [
        'Not all graph augmentations preserve semantics — in chemistry, specific substructures (functional groups) determine biological activity.',
        'An augmentation that changes the molecule\'s properties creates a positive pair with different "true labels".',
      ],
    },
  ],

  'ssl-time-series': [
    {
      id: 'q-ssl-kp21-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Which augmentation is commonly used to create positive pairs for contrastive SSL on time series data?',
      options: [
        'Reversing the temporal order of the time series',
        'Extracting overlapping sub-sequences (temporal crops) from the same time series',
        'Shuffling the time steps randomly',
        'Replacing all values with their z-score',
      ],
      correctAnswer: 1,
      explanation:
        'Overlapping temporal crops from the same time series share temporal context and are semantically related — analogous to spatial crops in vision SSL. They form natural positive pairs without requiring labels.',
      hints: [
        'Think about what makes two time series windows "the same" — if they overlap or are from the same sequence, they share underlying dynamics.',
        'Temporal crops are the time-series analogue of image crops in SimCLR.',
      ],
    },
    {
      id: 'q-ssl-kp21-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Time-Frequency Consistency (TF-C) is an SSL method for time series that creates positive pairs from the same signal\'s time-domain and frequency-domain representations.',
      correctAnswer: 'true',
      explanation:
        'TF-C (Zhang et al.) creates positive pairs by taking a time-domain window and its frequency-domain Fourier transform, training the encoder to produce consistent representations in both domains — leveraging the inherent time-frequency duality of signals.',
      hints: [
        'A signal and its Fourier transform represent the same underlying information in different bases.',
        'Time-frequency duality is a natural source of positive pairs without requiring data augmentation design.',
      ],
    },
    {
      id: 'q-ssl-kp21-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Applying masking-based SSL (MAE-style) to time series requires adapting the high masking ratio from vision. Why might a much higher masking ratio (e.g., 75%) be less effective for time series than for images?',
      options: [
        'Time series have fewer total time steps than images have patches, so masking fewer is needed',
        'Time series often have lower temporal (temporal) redundancy than images — nearby time steps may be less correlated than nearby pixels — making moderate masking already challenging without requiring 75%',
        'Time series models are shallower than ViTs and cannot handle high masking ratios',
        'Masking is not differentiable for time series data',
      ],
      correctAnswer: 1,
      explanation:
        'Images have high spatial redundancy (nearby pixels are similar), requiring high masking to create non-trivial prediction tasks. Time series may exhibit lower autocorrelation depending on the domain (e.g., financial data vs. ECG), so the optimal masking ratio must be tuned per application.',
      hints: [
        'The right masking ratio depends on the data\'s autocorrelation structure — how similar are adjacent time steps?',
        'For ECG signals, adjacent beats are very similar (high redundancy); for stock returns, they may not be.',
      ],
    },
  ],

  'ssl-medical': [
    {
      id: 'q-ssl-kp22-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Why is self-supervised learning particularly valuable for medical imaging applications?',
      options: [
        'Medical images are always high resolution, which SSL handles better than supervised methods',
        'Labelled medical data requires expensive expert annotation (radiologists, pathologists), while vast quantities of unlabelled medical images exist',
        'Medical imaging datasets are always publicly available, unlike natural image datasets',
        'SSL models are inherently more interpretable, which is required by medical regulations',
      ],
      correctAnswer: 1,
      explanation:
        'Medical image annotation requires clinical expertise (radiologists, pathologists) and is expensive, time-consuming, and often regulated. SSL enables learning from abundant unlabelled clinical data, dramatically reducing annotation requirements.',
      hints: [
        'Think about the bottleneck: a radiologist must annotate each image — how does SSL change this?',
        'The ratio of unlabelled to labelled medical images is extremely high.',
      ],
    },
    {
      id: 'q-ssl-kp22-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'Pre-training on natural images (e.g., ImageNet) and then fine-tuning on medical images consistently outperforms SSL pre-training directly on domain-specific medical images for medical imaging tasks.',
      correctAnswer: 'false',
      explanation:
        'Multiple studies show that SSL pre-training on domain-specific medical images (e.g., chest X-rays, pathology patches) can match or outperform ImageNet pre-training, especially when medical data volume is large enough — because in-domain features transfer better.',
      hints: [
        'Natural image features (edges, textures of everyday objects) may not transfer well to X-ray patterns.',
        'In-domain pre-training captures the specific visual statistics of the target domain.',
      ],
    },
    {
      id: 'q-ssl-kp22-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Medical imaging SSL must handle 3D volumetric data (e.g., CT scans). What adaptation of standard 2D contrastive SSL is commonly used?',
      options: [
        'Projecting 3D volumes to 2D slices and applying standard 2D SSL on each slice independently',
        'Treating spatially adjacent 2D slices or 3D sub-volumes from the same scan as positive pairs, and using 3D convolutional or Transformer encoders',
        'Applying 2D SSL to all three orthogonal planes (axial, coronal, sagittal) separately and averaging the embeddings',
        'Randomly flipping the 3D volume along all three axes as the primary augmentation',
      ],
      correctAnswer: 1,
      explanation:
        'For 3D medical data, positive pairs are constructed from views of the same volume (adjacent slices, random 3D crops, or different augmentations of the same volume), and encoders are extended to 3D (3D CNNs, 3D ViTs) to capture volumetric structure.',
      hints: [
        'The key insight is that different sub-volumes or slices from the same scan are positively related.',
        '3D volumetric context is critical for medical diagnosis — 2D slice processing discards this structure.',
      ],
    },
  ],

  'ssl-tabular': [
    {
      id: 'q-ssl-kp23-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'SCARF (Self-Supervised Contrastive Learning using Random Feature Corruption) creates positive pairs for tabular data by:',
      options: [
        'Pairing rows from the same table as positive pairs regardless of their feature values',
        'Corrupting a random subset of features in one view by replacing them with values sampled from the marginal distribution of each feature, while keeping the other view uncorrupted',
        'Applying z-score normalisation to one view and min-max scaling to the other',
        'Randomly duplicating rows and treating duplicates as positive pairs',
      ],
      correctAnswer: 1,
      explanation:
        'SCARF creates a corrupted view by randomly replacing some feature values with marginal samples (breaking the joint distribution), while the original row is the uncorrupted view. The model must distinguish real rows from corrupted ones — learning the feature joint distribution.',
      hints: [
        'The corruption mimics the "masking" of images or "masking" in BERT — but for tabular features.',
        'Replacing a feature with a random value from its marginal distribution breaks the correlations between features.',
      ],
    },
    {
      id: 'q-ssl-kp23-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'TabTransformer uses SSL pre-training by masking categorical feature tokens and training the Transformer to reconstruct the masked values, analogous to BERT\'s masked language modelling.',
      correctAnswer: 'true',
      explanation:
        'TabTransformer SSL applies masked token prediction to the categorical feature embeddings: random features are masked and the Transformer encoder is trained to reconstruct them from context — learning correlations between categorical variables without labels.',
      hints: [
        'Categorical features in a table are analogous to words in a sentence — they can be masked and predicted.',
        'The Transformer attends across features to reconstruct masked ones, learning feature relationships.',
      ],
    },
    {
      id: 'q-ssl-kp23-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A fundamental challenge for applying contrastive SSL to tabular data is defining meaningful augmentations. Why is this harder for tabular data than for images?',
      options: [
        'Tabular data has fewer features than images have pixels, making augmentation less impactful',
        'Unlike images where semantic-preserving augmentations (crop, colour jitter) are intuitive and domain-agnostic, tabular feature perturbations are domain-specific — an augmentation that preserves semantics for one dataset may destroy it for another',
        'Tabular data cannot be represented as a sequence, preventing Transformer-based SSL',
        'Tabular datasets are always too small for contrastive learning to be effective',
      ],
      correctAnswer: 1,
      explanation:
        'In images, cropping or flipping generally preserves the semantic content across domains. For tabular data, whether changing a feature value is semantically neutral depends entirely on the domain: changing "age by 1 year" may be fine, but changing "diagnosis code" is not.',
      hints: [
        'There is no universal "tabular crop" analogous to image crop — augmentation design is domain-dependent.',
        'Think about a medical record vs. a financial transaction — what augmentation is semantically safe for both?',
      ],
    },
  ],

  'ssl-transfer': [
    {
      id: 'q-ssl-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the standard protocol for evaluating how well SSL representations transfer to downstream tasks?',
      options: [
        'Re-training the SSL model from scratch on each downstream task',
        'Freezing the SSL encoder and training only a linear classifier on top (linear probe), and optionally fine-tuning the full encoder',
        'Using the SSL model\'s pre-training loss directly as a proxy for downstream performance',
        'Measuring the cosine similarity between SSL embeddings of different classes',
      ],
      correctAnswer: 1,
      explanation:
        'Linear probing tests whether SSL representations are linearly separable for the downstream task without any representation adaptation. Fine-tuning then measures the upper bound of transfer quality. Both protocols are standard benchmarks.',
      hints: [
        'Linear probing isolates representation quality from fine-tuning compute.',
        'Fine-tuning allows the representations to adapt to the downstream task — it\'s the upper bound of transfer performance.',
      ],
    },
    {
      id: 'q-ssl-kp24-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'SSL pre-trained models consistently outperform supervised pre-trained models on all downstream tasks when fine-tuned with large labelled datasets.',
      correctAnswer: 'false',
      explanation:
        'The relative advantage of SSL vs. supervised pre-training depends on the downstream task, domain, and fine-tuning data size. With large labelled fine-tuning sets, supervised pre-training on the same domain can be competitive; SSL advantages are most consistent in low-label regimes.',
      hints: [
        'Think about when SSL matters most: when labels are scarce. With abundant labels, supervised pre-training can close the gap.',
        'Task distribution also matters: SSL on natural images may not transfer as well to medical images as in-domain pre-training.',
      ],
    },
    {
      id: 'q-ssl-kp24-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Researchers have found that the choice of SSL method matters less than the choice of pre-training data distribution and backbone architecture for transfer performance. What practical implication does this have?',
      options: [
        'Practitioners should always implement the latest SSL algorithm from the literature',
        'Investing in collecting more diverse in-domain unlabelled data and using a larger backbone is often more impactful than switching between SSL algorithms (SimCLR vs BYOL vs DINO)',
        'The SSL objective is the primary hyperparameter and should be tuned first',
        'Pre-training data and architecture are fixed by convention and should not be changed',
      ],
      correctAnswer: 1,
      explanation:
        'Empirical studies (including Meta-Dataset analyses) consistently show that data diversity and model scale dominate algorithm choice. Practitioners gain more from curating relevant unlabelled data and scaling backbones than from algorithm selection.',
      hints: [
        'This parallels the finding in supervised learning: data quality and scale often matter more than model architecture.',
        'Think about where to invest engineering effort: better data curation or algorithm refinement?',
      ],
    },
  ],

  'ssl-semi-supervised': [
    {
      id: 'q-ssl-kp25-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'In SSL + semi-supervised learning combinations, what role does the SSL pre-training play?',
      options: [
        'SSL pre-training is used to generate pseudo-labels for the unlabelled data',
        'SSL pre-training provides a strong initialisation for the supervised fine-tuning stage, enabling better generalisation with fewer labelled examples',
        'SSL pre-training replaces the need for any labelled data',
        'SSL pre-training augments the labelled dataset by creating synthetic labelled samples',
      ],
      correctAnswer: 1,
      explanation:
        'SSL pre-trains the encoder on all available unlabelled data, producing a good feature initialisation. Fine-tuning on the small labelled set then requires fewer samples to converge, combining the best of both paradigms.',
      hints: [
        'Think about why you distil at the end: the fine-tuned large model is a better teacher than the SSL-only model.',
        'Distillation at the end compresses the knowledge into a smaller student, making deployment practical.',
      ],
    },
    {
      id: 'q-ssl-kp25-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'FixMatch, a semi-supervised learning method, combines consistency regularisation and pseudo-labelling by generating pseudo-labels from weakly augmented views and using them to train on strongly augmented views.',
      correctAnswer: 'true',
      explanation:
        'FixMatch generates high-confidence pseudo-labels from the model\'s predictions on weakly augmented unlabelled images, then trains the model to make the same predictions for strongly augmented versions of the same images — a consistency constraint that leverages unlabelled data effectively.',
      hints: [
        'Pseudo-labels from weak augmentation are more reliable (less augmentation noise).',
        'Training on strong augmentations with pseudo-labels encourages augmentation invariance.',
      ],
    },
    {
      id: 'q-ssl-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'SimCLRv2 proposes a semi-supervised learning protocol involving three stages. In the correct order, these are:',
      options: [
        'Supervised fine-tuning → SSL pre-training → knowledge distillation',
        'SSL pre-training on unlabelled data → fine-tuning on labelled data → knowledge distillation from the fine-tuned model back to a smaller student',
        'SSL pre-training → knowledge distillation → supervised fine-tuning',
        'Labelled data fine-tuning → unlabelled data SSL → knowledge distillation',
      ],
      correctAnswer: 1,
      explanation:
        'SimCLRv2\'s protocol: (1) SSL pre-train a large encoder on all unlabelled data, (2) fine-tune on the small labelled set, (3) use the resulting model as a teacher to train a compact student via self-training on unlabelled data — efficiently leveraging all data.',
      hints: [
        'Think about why you distil at the end: the fine-tuned large model is a better teacher than the SSL-only model.',
        'Distillation at the end compresses the knowledge into a smaller student, making deployment practical.',
      ],
    },
  ],

  'ssl-efficient': [
    {
      id: 'q-ssl-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What makes linear probing a computationally efficient evaluation method for SSL?',
      options: [
        'Linear probes do not require backpropagation through the encoder',
        'The encoder is frozen, so only the linear layer\'s parameters (d×C for d embedding dimensions and C classes) are trained — orders of magnitude fewer than the full encoder',
        'Linear probes always converge in a single gradient step',
        'Linear probes use a subset of the training data, reducing evaluation time',
      ],
      correctAnswer: 1,
      explanation:
        'With a frozen encoder, linear probing trains only d×C parameters (e.g., 2048×1000 ≈ 2M for ImageNet). Compare this to fine-tuning an entire ResNet-50 (25M parameters) — linear probing is dramatically cheaper.',
      hints: [
        'The heavy lifting (feature extraction) is done by the frozen encoder — the linear layer is tiny.',
        'Think about how many parameters a linear classifier has vs. a deep encoder.',
      ],
    },
    {
      id: 'q-ssl-kp26-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'SSL methods that require large batch sizes (e.g., SimCLR with 4096 batch) can be made more accessible by using methods like MoCo that maintain a large queue of negatives decoupled from batch size.',
      correctAnswer: 'true',
      explanation:
        'MoCo\'s key queue provides thousands of negatives without requiring a proportionally large batch, making it feasible to train on hardware with limited GPU memory that cannot accommodate 4096-sample batches.',
      hints: [
        'The queue stores negatives from past batches — how does that reduce the required current batch size?',
        'Think about researchers with 8GB GPUs vs. 40GB GPUs — MoCo democratisises contrastive SSL.',
      ],
    },
    {
      id: 'q-ssl-kp26-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Efficient SSL methods for low-resource settings often use smaller backbone architectures. What trade-off must be carefully managed when scaling down the backbone for SSL?',
      options: [
        'Smaller backbones require longer training to converge due to lower learning rates',
        'Smaller backbones have lower capacity, which may limit representation expressiveness — but they train faster and require less memory, requiring a careful accuracy-efficiency trade-off for the target deployment constraint',
        'Smaller backbones cannot use contrastive losses, requiring generative SSL methods',
        'Smaller backbones always produce higher linear probe accuracy due to reduced overfitting',
      ],
      correctAnswer: 1,
      explanation:
        'Smaller encoders train faster and fit on constrained hardware but may lack the capacity to learn rich representations competitive with large backbones. Practitioners must match backbone size to the representation richness required for their downstream tasks and available compute.',
      hints: [
        'Model capacity is a spectrum — smaller is cheaper but may limit what the model can represent.',
        'Think about whether a MobileNet has enough capacity to learn features competitive with a ViT-L for ImageNet classification.',
      ],
    },
  ],

  'ssl-video': [
    {
      id: 'q-ssl-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'VideoMAE extends MAE to video by masking what proportion of spatio-temporal patches, and why is such a high ratio needed?',
      options: [
        '15% — because video has less redundancy than images',
        '90% — because videos have extremely high spatio-temporal redundancy (adjacent frames are very similar), requiring very high masking to create a non-trivial reconstruction challenge',
        '50% — to balance information loss with reconstruction difficulty',
        '75% — the same as image MAE, since video is just a sequence of images',
      ],
      correctAnswer: 1,
      explanation:
        'VideoMAE uses ~90% masking because adjacent video frames are nearly identical. With lower masking ratios, the model can trivially reconstruct masked patches by copying from nearby temporal neighbours — a much higher ratio is needed to force semantic understanding.',
      hints: [
        'Compare temporal redundancy in video to spatial redundancy in images — which is higher?',
        'If adjacent frames are almost the same, what masking ratio makes reconstruction non-trivial?',
      ],
    },
    {
      id: 'q-ssl-kp27-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'V-JEPA (Video Joint Embedding Predictive Architecture) predicts abstract representations of masked video regions rather than reconstruct raw pixels, following the JEPA framework.',
      correctAnswer: 'true',
      explanation:
        'V-JEPA trains a predictor to predict the encoder\'s representations of masked spatio-temporal regions from visible context — not raw pixels. This avoids learning irrelevant low-level details (noise, texture) that pixel reconstruction requires, leading to more semantic representations.',
      hints: [
        'JEPA (Joint Embedding Predictive Architecture) predicts in representation space, not pixel space.',
        'Think about why predicting pixel values might be wasteful: the model spends capacity on reconstructinging noise and texture.',
      ],
    },
    {
      id: 'q-ssl-kp27-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key challenge unique to video SSL compared to image SSL is learning temporal dynamics rather than just appearance. What architectural or training modification specifically encourages learning temporal reasoning?',
      options: [
        'Using 3D convolutional kernels instead of 2D, which automatically learn temporal features',
        'Designing temporal masking strategies that mask entire time segments (temporal tube masking) rather than random patches, forcing the model to infer motion and temporal evolution',
        'Increasing the frame rate of the video to provide more temporal signal',
        'Pre-training on videos with subtitles to provide temporal language supervision',
      ],
      correctAnswer: 1,
      explanation:
        'Random patch masking can be solved by spatial interpolation without understanding temporal dynamics. Temporal tube masking (masking the same spatial location across all time steps) forces the model to infer temporal evolution from surrounding spatial context, encouraging temporal reasoning.',
      hints: [
        'If a spatial region is masked in all frames, the model can\'t just copy from adjacent spatial positions — it must understand motion.',
        'Think about what would happen if you masked the same region across time: the model must infer its trajectory.',
      ],
    },
  ],

  'ssl-multimodal': [
    {
      id: 'q-ssl-kp28-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'CLIP (Contrastive Language-Image Pre-Training) trains by contrasting:',
      options: [
        'Two different image augmentations of the same image',
        'Image embeddings and their paired text caption embeddings as positive pairs, and all other image-text cross-pairs in the batch as negatives',
        'Image embeddings with audio embeddings from the same video',
        'Text embeddings from the same document at different positions',
      ],
      correctAnswer: 1,
      explanation:
        'CLIP trains an image encoder and text encoder jointly with a contrastive loss: each (image, caption) pair is positive; all other cross-modal combinations in the batch are negatives. This aligns image and text into a shared embedding space.',
      hints: [
        'CLIP uses naturally paired data (images with their captions) — no human labels needed.',
        'Positive = same image-text pair; negative = any other combination in the batch.',
      ],
    },
    {
      id: 'q-ssl-kp28-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'CLIP enables zero-shot image classification by encoding class name text prompts and finding the class whose text embedding is most similar to the image embedding.',
      correctAnswer: 'true',
      explanation:
        'At inference, CLIP encodes candidate class names (e.g., "a photo of a dog") as text embeddings and computes their similarity to the image embedding. The highest-similarity class is selected — enabling zero-shot classification without any labelled images.',
      hints: [
        'CLIP aligns text and image spaces — so a text description of a class and an image of that class should be nearby.',
        'Zero-shot: no images of the class were seen during training — just the text description at test time.',
      ],
    },
    {
      id: 'q-ssl-kp28-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'ImageBind learns a single embedding space for six modalities (image, text, audio, depth, thermal, IMU) without having paired data for all modality combinations. How is this achieved?',
      options: [
        'By training a separate contrastive model for each pair of modalities and averaging their embeddings',
        'By using image as a central "binding" modality — pairing each other modality with images (which are naturally paired with text, audio, depth, etc.) and aligning all modalities to the shared image space',
        'By using a generative model to synthesise the missing modality in each pair',
        'By using a different SSL objective for each modality',
      ],
      correctAnswer: 1,
      explanation:
        'ImageBind uses image as a "binding" pivot: images naturally co-occur with text (captions), audio (videos), depth (RGBD cameras), and thermal/IMU (ego-centric cameras). By aligning each modality to the image space, all modalities become mutually aligned without needing direct cross-modality pairs.',
      hints: [
        'Images are uniquely versatile: they co-occur naturally with many other modalities in existing datasets.',
        'If A aligns with B and A aligns with C, then B and C are implicitly aligned through A.',
      ],
    },
  ],

  'ssl-rl': [
    {
      id: 'q-ssl-kp29-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Why is self-supervised learning useful for reinforcement learning agents?',
      options: [
        'SSL provides additional reward signals that help the agent explore more efficiently',
        'SSL can learn rich state representations from raw observations without reward signal, improving sample efficiency for downstream RL policy learning',
        'SSL replaces the policy gradient, making RL training more stable',
        'SSL eliminates the need for an environment simulator in model-based RL',
      ],
      correctAnswer: 1,
      explanation:
        'RL agents often receive sparse rewards and must learn from high-dimensional raw observations (pixels). SSL pre-training or auxiliary SSL objectives learn compact, semantically rich state representations that accelerate RL training.',
      hints: [
        'Rewards are sparse in RL — can you learn useful state representations from observations alone?',
        'Better state representations reduce the amount of interaction data needed to learn a good policy.',
      ],
    },
    {
      id: 'q-ssl-kp29-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'CURL (Contrastive Unsupervised Representations for Reinforcement Learning) applies contrastive SSL to consecutive frames from an RL agent\'s trajectory as positive pairs.',
      correctAnswer: 'true',
      explanation:
        'CURL treats random crops of the same observation frame as positive pairs (analogous to SimCLR) and applies MoCo-style contrastive learning as an auxiliary loss alongside the RL objective, improving sample efficiency on visual RL benchmarks.',
      hints: [
        'Two crops of the same observation share the same underlying state — a natural positive pair.',
        'CURL is an auxiliary SSL objective added on top of an RL algorithm, not a replacement.',
      ],
    },
    {
      id: 'q-ssl-kp29-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'SPR (Self-Predictive Representations) improves RL sample efficiency by training the agent to predict what in future steps?',
      options: [
        'The raw pixel observations of future states from the current state and action sequence',
        'The latent representations of future states in the encoder\'s embedding space, given the current latent state and a sequence of actions',
        'The reward values for the next K time steps as a multi-step return prediction',
        'The policy\'s action probabilities for the next K states',
      ],
      correctAnswer: 1,
      explanation:
        'SPR trains a transition model to predict future latent representations (not raw pixels) in the encoder\'s embedding space. Predicting in latent space is easier and more semantically focused than pixel prediction, encouraging a representation that captures task-relevant dynamics.',
      hints: [
        'Predicting raw pixels requires capturing irrelevant visual detail; predicting in latent space focuses on what matters for control.',
        'A transition model in latent space: z_{t+k} = f(z_t, a_t, ..., a_{t+k-1}).',
      ],
    },
  ],

  'ssl-foundation': [
    {
      id: 'q-ssl-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'SSL is considered the foundation of foundation models because:',
      options: [
        'Foundation models are always trained on synthetic data generated by SSL methods',
        'The massive scale of pre-training data for foundation models (text, images, multimodal) can only be leveraged without labels using SSL objectives',
        'SSL provides the fine-tuning objective used after a model is deployed',
        'Foundation models use SSL only for evaluation, not for pre-training',
      ],
      correctAnswer: 1,
      explanation:
        'Foundation models (GPT, BERT, CLIP, Stable Diffusion) are pre-trained on internet-scale data. The only feasible way to train on such data without labels is through SSL objectives (causal LM, masked LM, contrastive learning) — making SSL the enabling technology for foundation models.',
      hints: [
        'Internet-scale data cannot be labelled by humans — what training objective allows learning from it?',
        'Every major foundation model (GPT, BERT, CLIP) uses an SSL pre-training objective.',
      ],
    },
    {
      id: 'q-ssl-kp30-2',
      type: 'true-false',
      difficulty: 'medium',
      question:
        'The emergent capabilities of large foundation models (e.g., in-context learning, chain-of-thought reasoning) are generally attributed to SSL pre-training scale rather than to the specific SSL objective used.',
      correctAnswer: 'true',
      explanation:
        'Emergent capabilities appear at large scales regardless of the specific SSL variant. Scale — model size, data quantity, and compute — is the primary driver, with the SSL objective (causal LM for GPT, masked LM for BERT) shaping what capabilities emerge rather than causing emergence per se.',
      hints: [
        'Both GPT and BERT use different SSL objectives but both show emergent capabilities at scale.',
        'Emergence is correlated with scale, not with the choice of SSL objective.',
      ],
    },
    {
      id: 'q-ssl-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The JEPA (Joint Embedding Predictive Architecture) framework proposed by LeCun aims to be the SSL foundation for future AI systems. What is its key distinction from generative SSL (e.g., MAE, GPT)?',
      options: [
        'JEPA uses a discriminative loss; generative SSL uses a generative loss',
        'JEPA predicts abstract representations of future/missing inputs in latent space rather than predicting raw pixels, avoiding learning irrelevant low-level details and focusing on semantic structure',
        'JEPA requires paired data from multiple modalities; generative SSL works on single-modality data',
        'JEPA uses energy-based modelling; generative SSL uses likelihood maximisation',
      ],
      correctAnswer: 1,
      explanation:
        'JEPA argues that predicting raw pixels (MAE) or tokens (GPT) forces the model to model irrelevant low-level details. Predicting in abstract representation space avoids this by focusing learning on semantic, task-relevant structure — potentially more efficient and scalable for AI systems that must reason about the world.',
      hints: [
        'What does predicting raw pixels require that predicting representations avoids?',
        'Representations abstract away details (noise, texture) irrelevant to semantics — predicting them is a harder but more focused task.',
      ],
    },
  ],
}

registerQuestions(questions)
export default questions
