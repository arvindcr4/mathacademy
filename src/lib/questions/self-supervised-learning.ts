import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  "ssl-overview": [
    {
      id: "q-ssl-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the defining characteristic of self-supervised learning (SSL) compared to supervised learning?",
      options: [
        "SSL requires more labelled data than supervised learning",
        "SSL generates supervisory signals automatically from the data itself, without requiring human-annotated labels",
        "SSL only works for image data, not text or audio",
        "SSL trains models on random noise to learn robust representations",
      ],
      correctAnswer: 1,
      explanation:
        "SSL creates its own supervision from unlabelled data (e.g., predict a masked word, identify the correct image rotation) - enabling learning from the vast amounts of unlabelled data that would be too expensive to annotate.",
      hints: [
        "Think about how BERT predicts masked words - where do the labels come from?",
        'The word "self" means the data itself provides the training signal, not external human annotation.',
      ],
    },
    {
      id: "q-ssl-kp1-2",
      type: "true-false",
      difficulty: "easy",
      question:
        "The primary motivation for self-supervised learning is to leverage the vastly larger supply of unlabelled data compared to labelled data.",
      correctAnswer: "True",
      explanation:
        "Human annotation is expensive and slow. The internet provides orders of magnitude more unlabelled images, text, and audio than labelled data. SSL methods unlock this resource for learning powerful representations.",
      hints: [
        "Compare the size of ImageNet (1M labelled images) to the total number of images on the web.",
        "Think about why labelling is the bottleneck for supervised learning at scale.",
      ],
    },
    {
      id: "q-ssl-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SSL representations are typically evaluated using what standard protocol?",
      options: [
        "Directly measuring the pre-text task performance (e.g., masked prediction accuracy)",
        "Freezing the SSL-trained encoder and training a linear classifier on top using labelled examples (linear probing)",
        "Fine-tuning the entire SSL model from scratch on the downstream labelled dataset",
        "Comparing the model\'s embedding distances to a human-defined similarity matrix",
      ],
      correctAnswer: 1,
      explanation:
        "Linear probing freezes the SSL encoder and only trains a linear layer on a labelled downstream dataset. Good linear probe accuracy indicates the encoder learned rich, linearly separable representations that are not merely memorising pre-text task patterns.",
      hints: [
        "A linear classifier can only use linearly separable features - what does high linear probe accuracy imply about the representations?",
        "Freezing the encoder isolates the quality of the learned representations from the downstream dataset size.",
      ],
    },
  ],

  "pretext-tasks": [
    {
      id: "q-ssl-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In the rotation prediction pretext task for images, what is the model trained to do?",
      options: [
        "Generate a rotated version of the input image",
        "Predict which of {0°, 90°, 180°, 270°} a given image was rotated by",
        "Align two images to have the same orientation",
        "Predict the rotation invariant features of an image",
      ],
      correctAnswer: 1,
      explanation:
        "The rotation pretext task rotates images by one of four angles and asks the model to predict which rotation was applied. To solve this, the network must learn object-level features (orientation, shape) rather than low-level textures.",
      hints: [
        "The label (rotation angle) is generated automatically - no human needed.",
        'To predict the rotation, the model needs to understand what "upright" means - what features encode that?',
      ],
    },
    {
      id: "q-ssl-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The jigsaw puzzle pretext task trains a model to predict the permutation applied to image patches, encouraging it to learn spatial relationships between image regions.",
      correctAnswer: "True",
      explanation:
        "Jigsaw puzzle SSL shuffles an image\'s patches and trains the network to identify the correct permutation. Solving this requires understanding how image regions relate spatially, learning features that capture scene structure.",
      hints: [
        "To reassemble a puzzle, you need to understand the content of each piece and how they fit together.",
        "Spatial relationships between patches are exactly the kind of structure a good visual representation should capture.",
      ],
    },
    {
      id: "q-ssl-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SSL representations are typically evaluated using what standard protocol?",
      options: [
        "Directly measuring the pre-text task performance (e.g., masked prediction accuracy)",
        "Freezing the SSL-trained encoder and training a linear classifier on top using labelled examples (linear probing)",
        "Fine-tuning the entire SSL model from scratch on the downstream labelled dataset",
        "Comparing the model\'s embedding distances to a human-defined similarity matrix",
      ],
      correctAnswer: 1,
      explanation:
        "Linear probing freezes the SSL encoder and only trains a linear layer on a labelled downstream dataset. Good linear probe accuracy indicates the encoder learned rich, linearly separable representations that are not merely memorising pre-text task patterns.",
      hints: [
        "A linear classifier can only use linearly separable features - what does high linear probe accuracy imply about the representations?",
        "Freezing the encoder isolates the quality of the learned representations from the downstream dataset size.",
      ],
    },
  ],

  "contrastive-learning": [
    {
      id: "q-ssl-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The core objective of contrastive learning is to train an encoder such that:",
      options: [
        "Randomly sampled image pairs have similar embeddings",
        "Embeddings of semantically similar (positive) pairs are close, and embeddings of dissimilar (negative) pairs are far apart in the representation space",
        "All embeddings are mapped to the same point to minimise variance",
        "The encoder predicts the pixel values of its input from the embedding",
      ],
      correctAnswer: 1,
      explanation:
        "Contrastive learning (Chopra et al. 2005; reviewed in Weng 2021) uses positive pairs (augmented views of the same image, or related samples) and negative pairs (different images) to shape the embedding space: attract positives, repel negatives. The learned representation should reflect semantic similarity rather than surface statistics.",
      hints: [
        "Think of it as metric learning: close = similar, far = dissimilar.",
        "Positive pairs are typically created by augmenting the same image differently; negatives are other images.",
      ],
    },
    {
      id: "q-ssl-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In the InfoNCE loss \\[ L = -\\log\\frac{\\exp(\\sim(z_i,z_j)/\\tau)}{\\sum_{k \\neq i} \\exp(\\sim(z_i,z_k)/\\tau)} \\], what is the role of the temperature parameter \\tau, and what value does SimCLR use?",
      options: [
        "\\tau controls learning rate; SimCLR uses \\tau = 1.0",
        "\\tau sharpens or smooths the similarity distribution: low \\tau (e.g., 0.07 in SimCLR) focuses more on hard negatives; high \\tau treats all negatives more uniformly",
        "\\tau determines how many negative samples are included in the denominator",
        "\\tau is fixed at \\tau = 0.5 for all contrastive methods and has no tunable effect",
      ],
      correctAnswer: 1,
      explanation:
        "Temperature \\tau scales the logits before the softmax: low \\tau makes the loss peaky (large gradient from hard negatives near the anchor), while high \\tau smooths the distribution. SimCLR uses \\tau=0.07 (found optimal via grid search); MoCo uses \\tau=0.07-0.2. \\tau is one of the most critical hyperparameters in contrastive SSL.",
      hints: [
        "Softmax with low temperature \\to peaky distribution; high temperature \\to uniform distribution.",
        "Hard negatives are close to the query in embedding space - low temperature amplifies their gradient signal.",
      ],
    },
    {
      id: "q-ssl-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The InfoNCE loss has a direct connection to mutual information. What does maximising InfoNCE approximately achieve?",
      options: [
        "It minimises the reconstruction error between the encoder input and output",
        "It maximises a lower bound on the mutual information I(z_{t+k}; c_t) between future representations and the context vector - as shown in CPC (van den Oord et al., 2018)",
        "It minimises the entropy of the representation distribution",
        "It maximises the cosine similarity between all pairs of embeddings in the batch",
      ],
      correctAnswer: 1,
      explanation:
        "CPC (van den Oord et al., 2018) showed that the InfoNCE loss is a lower bound on the mutual information: I(z_{t+k}; c_t) \\geq log(N) − L_{InfoNCE}, where N is the number of negative samples. Maximizing InfoNCE encourages the encoder to capture information shared between the context and future observations - i.e., the semantic content invariant to augmentation.",
      hints: [
        "The InfoNCE loss was derived from Noise Contrastive Estimation and formalized as a MI bound in CPC.",
        "More negatives (larger N) \\to tighter lower bound \\to better MI approximation.",
      ],
    },
  ],

  simclr: [
    {
      id: "q-ssl-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SimCLR uses the NT-Xent loss. NT-Xent stands for ___, and for a minibatch of N images it treats ___ other augmented samples as negatives per anchor.",
      options: [
        "Normalized Temperature-scaled Cross Entropy; 2(N−1) other samples",
        "Non-parametric Triplet Extreme loss; N−1 other samples",
        "Noise-Tolerant Cross Entropy loss; N other samples",
        "Neural Transformer eXtended Embedding loss; 2N other samples",
      ],
      correctAnswer: 0,
      explanation:
        "NT-Xent = Normalized Temperature-scaled Cross Entropy. SimCLR creates 2N augmented views for N images; for any anchor view i, the 2(N−1) other views (from both augmented copies of all other N−1 images) serve as negatives. The loss is: \\[ L_i = -\\log\\frac{\\exp(\\sim(z_i,z_j)/\\tau)}{\\sum_{k \\neq i}^{2N} \\exp(\\sim(z_i,z_k)/\\tau)} \\], evaluated symmetrically.",
      hints: [
        "NT-Xent is the full name - Normalized (cosine similarity) Temperature-scaled Cross Entropy.",
        "Each image produces 2 views; so N images \\to 2N views \\to 2(N−1) negatives per anchor.",
      ],
    },
    {
      id: "q-ssl-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SimCLR uses a non-linear projection head (MLP) between the encoder and the contrastive loss, and the representations used for downstream tasks are taken from the encoder output, not the projection head output.",
      correctAnswer: "True",
      explanation:
        "Chen et al. found that a 2-layer MLP projection head (g(h) = W_2\\cdotReLU(W_1\\cdoth)) significantly improves representation quality. The projection head learns to discard augmentation-specific information not needed for contrastive loss, while the encoder retains it - so encoder outputs h are used for downstream tasks, not z = g(h). This finding boosted linear eval by ~10% compared to no projection head.",
      hints: [
        'The projection head is a "disposable" layer that improves training but whose output is discarded at evaluation.',
        "Think about why the features before the projection are more useful: the head compresses away information useful for classification.",
      ],
    },
    {
      id: "q-ssl-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SimCLR v1 with a ResNet-50 backbone achieves approximately ___% top-1 accuracy on ImageNet linear evaluation, and requires a batch size of ___ to achieve this.",
      options: [
        "76.5% top-1 accuracy; batch size 4096",
        "69.3% top-1 accuracy; batch size 4096",
        "58.0% top-1 accuracy; batch size 1024",
        "82.3% top-1 accuracy; batch size 8192",
      ],
      correctAnswer: 1,
      explanation:
        "SimCLR (Chen et al., 2020) achieves 69.3% top-1 linear evaluation accuracy on ImageNet with a ResNet-50 and batch size 4096 trained for 1000 epochs. With a larger ResNet-50 (4\\times) it reaches 76.5% - matching the supervised ResNet-50 baseline. Large batches (4096+) are needed because NT-Xent uses in-batch negatives.",
      hints: [
        "SimCLR requires very large batches because all other batch members serve as negatives - 4096 is standard.",
        "The 69.3% figure is for standard ResNet-50; the 76.5% requires a 4\\times wider model.",
      ],
    },
  ],

  moco: [
    {
      id: "q-ssl-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "MoCo (Momentum Contrast, He et al., 2019) maintains a queue of ___ encoded keys and updates the key encoder by exponential moving average with momentum coefficient m=___.",
      options: [
        "Queue size 65,536; momentum m = 0.999",
        "Queue size 4,096; momentum m = 0.9",
        "Queue size 1,000; momentum m = 0.99",
        "Queue size 131,072; momentum m = 0.9999",
      ],
      correctAnswer: 0,
      explanation:
        "MoCo uses a FIFO queue of 65,536 encoded keys as negatives. The key encoder \\theta_k is updated by EMA: \\theta_k \\leftarrow 0.999\\cdot\\theta_k + 0.001\\cdot\\theta_q. High momentum (0.999) ensures keys from different mini-batches are encoded by nearly the same network, maintaining representation consistency across the queue. This decouples negative count (65k) from batch size.",
      hints: [
        "The queue stores 65,536 negatives - far more than any feasible batch size.",
        "Momentum 0.999 means the momentum encoder slowly tracks the query encoder without gradients.",
      ],
    },
    {
      id: "q-ssl-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In MoCo, the momentum encoder\'s parameters are updated by backpropagating gradients through the key encoding path.",
      correctAnswer: "False",
      explanation:
        "The momentum encoder\'s parameters are NOT updated by gradient backpropagation - the queue is not differentiable. They are updated by EMA: \\theta_k \\leftarrow m\\cdot\\theta_k + (1−m)\\cdot\\theta_q (m=0.999). Backpropagating through the queue would require storing gradients for all 65k encoded keys, which is infeasible.",
      hints: [
        "Gradient-updating the momentum encoder would make it inconsistent with the older keys in the queue.",
        "EMA update: the momentum encoder slowly tracks the query encoder without gradients.",
      ],
    },
    {
      id: "q-ssl-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MoCo v3 and SimCLR v2 both found that using Vision Transformers (ViT) as encoders requires what training stability modification?",
      options: [
        "Gradient clipping with a maximum norm of 1.0",
        "Stopping gradient flow through the momentum encoder (already the case in MoCo) and careful learning rate warm-up, as ViT training is more sensitive to instability",
        "Reducing the queue size from 65536 to 256 for ViT models",
        "Replacing the NT-Xent loss with a triplet loss for ViT stability",
      ],
      correctAnswer: 1,
      explanation:
        "ViT-based contrastive training is prone to training instability (loss spikes, collapse). MoCo-v3 specifically identified that patching the ViT\'s patch projection layer to a frozen random projection prevents instability, alongside learning rate warm-up. Loss spikes occur when ViT\'s large attention span causes sudden representation shifts.",
      hints: [
        "ViTs are more sensitive to learning rate and batch size than CNNs in SSL settings.",
        "Training instability in SSL manifests as sudden loss spikes or complete representation collapse.",
      ],
    },
  ],

  byol: [
    {
      id: "q-ssl-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "BYOL (Bootstrap Your Own Latent, Grill et al., 2020) uses an asymmetric architecture to avoid collapse without negative pairs. The target network parameters \\xi are updated by:",
      options: [
        "Gradient descent on the BYOL loss, same as the online network",
        "Exponential moving average (EMA) of the online network parameters: \\xi \\leftarrow \\tau\\cdot\\xi + (1−\\tau)\\cdot\\theta, with \\tau = 0.996 increasing to 1 during training",
        "Random re-initialization at the start of each training epoch",
        "Averaging the online network parameters across all GPU workers in data-parallel training",
      ],
      correctAnswer: 1,
      explanation:
        "BYOL\'s target network is a momentum copy: \\xi \\leftarrow \\tau\\cdot\\xi + (1−\\tau)\\cdot\\theta where \\tau starts at 0.996 and increases toward 1 using a cosine schedule. No gradients flow through the target network. The online network additionally has a predictor q_\\theta that the target lacks - this asymmetry combined with slow-moving EMA target prevents collapse.",
      hints: [
        "Most contrastive methods need negatives to prevent collapse (all embeddings becoming identical).",
        "BYOL uses asymmetry (predictor on online branch only) + EMA target - not explicit negatives.",
      ],
    },
    {
      id: "q-ssl-kp6-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In BYOL, the target network\'s parameters are trained by gradient descent on the BYOL loss, just like the online network.",
      correctAnswer: "False",
      explanation:
        "The target network in BYOL is a momentum-updated (EMA) copy of the online network - it receives no gradients at all. Only the online network is updated by gradient descent. Gradients are stopped before the target network (stop_gradient operation). This asymmetry is essential for preventing collapse.",
      hints: [
        "If both networks were gradient-updated with the same loss, they could collapse to the same constant output trivially.",
        'EMA makes the target a slow-moving "teacher" - consistent but not gradient-updated.',
      ],
    },
    {
      id: "q-ssl-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Fetterman & Albrecht (2020) showed that BYOL collapses when batch normalization is removed. What implicit mechanism does batch normalization provide that prevents this collapse?",
      options: [
        "BN normalises the loss gradient, making training more stable",
        "BN computes statistics (mean, variance) across the entire batch, introducing implicit dependencies between samples - effectively acting as a form of implicit negative comparison since the normalization of each sample\'s representation depends on all other samples in the batch",
        "BN reduces the effective learning rate for the momentum encoder",
        "BN prevents the predictor from becoming the identity function",
      ],
      correctAnswer: 1,
      explanation:
        "Batch normalization computes $\\hat{z} = \\gamma \\frac{z - \\mu_{\\text{batch}}}{\\sigma_{\\text{batch}}} + \\beta$, where $\\mu_{\\text{batch}} = \\frac{1}{B}\\sum_b z_b$ and $\\sigma_{\\text{batch}}^2 = \\frac{1}{B}\\sum_b (z_b - \\mu_{\\text{batch}})^2$ are the batch mean and standard deviation. Critically, $\\hat{z}_i$ depends on all $B$ samples in the batch - not just sample $i$. If the online and target embeddings of sample $i$ diverge from the rest of the batch, the batch statistics shift, which feeds back into $\\hat{z}_i$. This creates an implicit cross-sample contrastive signal: differing from the batch is penalized through the normalization. Without BN, BYOL has no mechanism to distinguish positive pairs from trivial constant solutions, causing collapse. This reveals that BYOL's \"negative-free\" claim relies on BN as an implicit negative.",
      hints: [
        "Write out $\\hat{z}_i$ explicitly: it contains $\\mu_{\\text{batch}}$ and $\\sigma_{\\text{batch}}$, each of which depends on ALL samples in the batch. Sample $i$ influences its own normalization through its influence on the batch statistics.",
        "Contrastive methods use negatives explicitly: similar pairs attract, different pairs repel. BN creates an implicit repulsion: if one sample's embedding differs from the batch mean, it effectively \"repel\" itself through the normalization statistics.",
      ],
    },
  ],

  simsiam: [
    {
      id: "q-ssl-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SimSiam (Chen & He, 2021) avoids collapse without negative pairs or a momentum encoder. The SimSiam loss for a pair of views (z_1, z_2) is: L = −(1/2)[D(p_1, stopgrad(z_2)) + D(p_2, stopgrad(z_1))], where D is negative cosine similarity. What is the crucial role of stopgrad?",
      options: [
        "stopgrad freezes the projection head weights so only the encoder is trained",
        "stopgrad prevents gradients from flowing through one branch, breaking the trivial solution where both networks converge to output identical constant vectors",
        "stopgrad clips the gradient norm to prevent exploding gradients",
        "stopgrad is equivalent to adding L2 regularization on the target embeddings",
      ],
      correctAnswer: 1,
      explanation:
        "Without stopgrad, minimizing −cosine_sim(p_1, z_2) can be trivially solved by collapsing both p_1 and z_2 to the same constant. stopgrad breaks the gradient symmetry: when computing \\partialL/\\partial\\theta, z_2 is treated as constant (no gradient), so the network cannot exploit the shortcut. Chen & He analyze this as an EM-like alternating optimization.",
      hints: [
        "The stop-gradient is the key difference from BYOL - what happens to backpropagation when you stop gradients?",
        "If gradients can\'t flow through the target branch, the loss can\'t trivially collapse both branches together.",
      ],
    },
    {
      id: "q-ssl-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Representation collapse in SimSiam occurs when the encoder maps all inputs to the same constant embedding, making the cosine similarity always 1 and the loss always −1 (the minimum possible value).",
      correctAnswer: "True",
      explanation:
        "A collapsed SimSiam produces p_i = z_j = constant for all inputs, giving cosine_sim = 1 and loss = −1 trivially. This is a degenerate global minimum of the loss without stopgrad, but stopgrad prevents gradients from exploiting this solution.",
      hints: [
        'A constant embedding satisfies the "similar outputs for similar inputs" objective trivially.',
        "If all embeddings are the same, cosine similarity = 1 everywhere - the loss reaches its minimum without learning.",
      ],
    },
    {
      id: "q-ssl-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Chen & He (SimSiam) show that stopgrad makes SimSiam behave like Expectation-Maximization. What are the E-step and M-step analogues?",
      options: [
        "E-step: compute positive pair embeddings; M-step: compute negative pair embeddings",
        "E-step: fix z (stopgrad branch, treat as cluster centers) and optimize p (predictor branch) - analogous to the E-step assigning data to clusters; M-step: update \\theta to improve the predictor - analogous to the M-step updating variables",
        "E-step: compute contrastive loss; M-step: update the momentum encoder",
        "E-step: select hard negatives; M-step: update the projection head using those negatives",
      ],
      correctAnswer: 1,
      explanation:
        "SimSiam's loss for a pair of views is $\\mathcal{L} = \\frac{1}{2}\\sum_{z_A, z_B} D(p_A, \\text{stopgrad}(z_B)) + D(p_B, \\text{stopgrad}(z_A))$, where $D(p, z) = -\\frac{p \\cdot z}{\\|p\\|\\|z\\|}$ is negative cosine similarity. The stopgradient operator splits the update into two alternating phases: (1) E-step: fix $z$ (no gradient flows into the encoder from this term) and minimize $\\mathcal{L}$ with respect to the predictor $p$ - this is equivalent to finding the best predictor given fixed targets; (2) M-step: gradients now flow through $z = g_\\theta(x)$ to update $\\theta$, improving the encoder for the next iteration. Without stopgrad, both $p$ and $z$ are optimized simultaneously, which can trivially collapse by making both constant. The alternating scheme provably avoids this degenerate fixed point.",
      hints: [
        "In classical EM for clustering: E-step assigns points to clusters (fix cluster centers), M-step updates cluster centers. SimSiam's E-step fixes $z$ (targets) and updates $p$ (predictor); M-step uses the improved $p$ to compute gradients for $\\theta$.",
        "The stopgradient is not just a numerical trick - it implements the E-step/M-step separation that prevents the trivial constant solution.",
      ],
    },
  ],

  "barlow-twins": [
    {
      id: "q-ssl-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Barlow Twins loss (Zbontar et al., 2021) is: \n\[L_{BT} = \sum_i (1 - C_{ii})^2 + \lambda \sum_i \sum_{j \neq i} C_{ij}^2,\] \nwhere \n\[C_{ij} = \frac{\sum_b z^A_{b,i} \, z^B_{b,j}}{\|z^A_{\cdot,i}\| \; \|z^B_{\cdot,j}\|}.\] \nWhat do the two terms enforce?",
      options: [
        "First term enforces decorrelation; second term enforces invariance across augmentations",
        "First term (invariance): push $C_{ii} \to 1$ so each embedding dimension is consistent across views; second term (redundancy reduction): push $C_{ij} \to 0$ for $i \neq j$ so different dimensions are decorrelated",
        "First term minimizes L2 distance between embeddings; second term maximizes cosine similarity",
        "First term prevents collapse; second term prevents mode dropping",
      ],
      correctAnswer: 1,
      explanation:
        "The cross-correlation matrix $C_{ij}$ measures how similarly dimension $i$ of the two augmented embeddings responds across the batch. The diagonal term $(1 - C_{ii})^2$ drives $C_{ii} \to 1$, enforcing that each dimension captures view-invariant information. The off-diagonal term $C_{ij}^2$ for $i \neq j$ penalizes correlation between dimensions, decorrelating them - following Horace Barlow's redundancy reduction hypothesis (1961): each neuron should convey independent information. An optimal $C$ is the identity matrix $I$, meaning $C_{ii} = 1$ and $C_{ij}=0$ for $i \neq j$. The hyperparameter $\lambda$ balances the two objectives.",
      hints: [
        "If $C = I$, then $(1-C_{ii})^2 = 0$ and $C_{ij}^2 = 0$ for $i \neq j$ - the loss is minimized. This is what the optimization drives toward.",
        "Barlow's insight: if two neurons are correlated, one is redundant. Penalizing off-diagonal $C_{ij}$ removes that redundancy.",
      ],
    },
    {
      id: "q-ssl-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Barlow Twins is inspired by H. Barlow\'s redundancy reduction principle (1961), which suggests that efficient neural coding should minimise redundancy between neurons to maximise the information capacity of the representation.",
      correctAnswer: "True",
      explanation:
        'Horace Barlow\'s "redundancy reduction" hypothesis proposes that the visual system encodes information with minimal redundancy between neurons - each neuron should convey independent information. Barlow Twins operationalizes this as decorrelating embedding dimensions (off-diagonal C_{ij} \\to 0), with the Barlow Twins name explicitly honoring this connection.',
      hints: [
        'The paper\'s name "Barlow Twins" references Horace Barlow, the neuroscientist who proposed redundancy reduction.',
        "Decorrelated embeddings encode independent features - minimal redundancy.",
      ],
    },
    {
      id: "q-ssl-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Barlow Twins is empirically less sensitive to batch size than SimCLR. The cross-correlation matrix C has dimensions d\\timesd where d is the embedding dimension. This explains reduced batch-size sensitivity because:",
      options: [
        "Barlow Twins does not use a softmax normalisation, which is batch-size-sensitive",
        "The cross-correlation matrix C is d\\timesd regardless of batch size N; the signal quality improves with larger N (better correlation estimates) but the loss landscape does not sharply depend on N, unlike NT-Xent which has N−1 explicit negatives per anchor",
        "Barlow Twins uses a momentum encoder that reduces batch size sensitivity",
        "The off-diagonal decorrelation term is always zero regardless of batch size",
      ],
      correctAnswer: 1,
      explanation:
        "In NT-Xent, each sample uses exactly 2(N−1) negatives - the loss directly collapses if N is too small. In Barlow Twins, the cross-correlation matrix always has d\\timesd entries; N only affects the statistical quality of the correlation estimate. Empirically, Barlow Twins works with batch sizes as small as 256, while SimCLR needs 4096+.",
      hints: [
        "SimCLR\'s NT-Xent explicitly uses all other batch items as negatives - the loss changes dramatically with N.",
        "Barlow Twins' cross-correlation matrix size is determined by embedding dimension d, not batch size N.",
      ],
    },
  ],

  vicreg: [
    {
      id: "q-ssl-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "VICReg stands for Variance-Invariance-Covariance Regularisation. What do the three terms penalise/encourage?",
      options: [
        "Variance: maximise embedding spread; Invariance: minimise distance between positive pairs; Covariance: decorrelate embedding dimensions",
        "Variance: minimise embedding spread; Invariance: minimise distance between negative pairs; Covariance: maximise cross-correlation",
        "Variance: maximise cosine similarity; Invariance: penalise large gradients; Covariance: enforce unit norm",
        "Variance: penalise embedding collapse; Invariance: maximise mutual information; Covariance: enforce diagonal covariance",
      ],
      correctAnswer: 0,
      explanation:
        "VICReg's loss is $\\mathcal{L} = \\frac{1}{d}\\sum_i \\max(0, \\gamma - \\text{std}(z_i))$ (variance) $+\\frac{1}{d}\\sum_i \\|z^A_i - z^B_i\\|^2$ (invariance) $-\\frac{1}{d}\\sum_{i \\neq j} C_{ij}$ (covariance). The variance term prevents collapse by keeping embedding standard deviation above a threshold $\\gamma$; the invariance term attracts embeddings of positive pairs (minimizing pairwise distance); the covariance term decorrelates embedding dimensions to prevent redundancy - similar in spirit to Barlow Twins but applied to each branch independently.",
      hints: [
        "Write out what collapse would look like: if all embeddings collapse to a constant $c$, then $\\text{std}(z_i) = 0$ and the variance term is maximally violated - penalizing collapse explicitly.",
        "The covariance term $C_{ij} = \\text{Cov}(z_i, z_j)$ penalizes correlated dimensions: if two dimensions always co-vary, one is redundant. Maximizing independence is the goal.",
      ],
    },
    {
      id: "q-ssl-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "VICReg does not require negative pairs and prevents collapse using explicit variance regularisation that forces the standard deviation of each embedding dimension to stay above a minimum threshold.",
      correctAnswer: "True",
      explanation:
        "VICReg replaces implicit collapse prevention (negatives, stop-gradient, momentum encoder) with an explicit variance term that penalises collapse directly if any embedding dimension\'s standard deviation drops below 1.",
      hints: [
        "If all embeddings collapse to the same point, each dimension\'s variance drops to zero - the variance term penalises this directly.",
        "Think about how making variance regularisation explicit removes the need for other implicit anti-collapse mechanisms.",
      ],
    },
    {
      id: "q-ssl-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "VICReg is designed to be easily extendable to the multimodal setting. What property of its loss makes this straightforward?",
      options: [
        "VICReg uses a shared encoder for both modalities by design",
        "The three terms operate on each branch\'s embeddings independently - variance and covariance are single-branch terms, while invariance is the cross-branch term - making it easy to apply to heterogeneous modalities with separate encoders",
        "VICReg does not require positive pairs, so any two samples from different modalities can be paired",
        "VICReg uses a symmetric loss that doesn\'t require knowing which modality is which",
      ],
      correctAnswer: 1,
      explanation:
        "Variance and covariance terms regularise each branch independently; only the invariance term crosses branches. This modular structure allows using separate encoders for different modalities (text, image, audio) and applying the three terms to their respective embeddings.",
      hints: [
        "When modalities differ (e.g., image and text), you need separate encoders - VICReg\'s structure accommodates this.",
        "The invariance term just compares embeddings from the two branches - it doesn\'t care what those branches encode.",
      ],
    },
  ],

  dino: [
    {
      id: "q-ssl-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "DINO (Self-DIstillation with NO labels, Caron et al., 2021) trains a student to match the output of a teacher network. The teacher parameters \\xi are updated by:",
      options: [
        "Backpropagating the cross-entropy loss between student and teacher softmax outputs",
        "Exponential moving average of the student parameters: \\xi \\leftarrow \\lambda\\xi + (1−\\lambda)\\theta, with no gradient flowing through the teacher - the student minimizes H(P_t(x), P_s(x')), where x and x' are different crops",
        "Random re-initialization every 100 epochs to prevent teacher collapse",
        "Training the teacher on a separate labeled dataset and distilling to the student",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1:** The teacher EMA update.\n\nDINO's teacher is a momentum copy: $\\xi \\leftarrow \\lambda \\cdot \\xi + (1 - \\lambda) \\cdot \\theta$ (no gradient flows to the teacher).\n\n**Step 2:** The student objective.\n\nThe student minimises cross-entropy $H(P_t, P_s)$ where $P_t = \\text{softmax}\\left(\\left(g_\\xi(x) - c\\right) / \\tau_t\\right)$, using the teacher's output with centering vector $c$ and teacher temperature $\\tau_t < \\tau_s$.\n\n**Step 3:** How views are created.\n\nDifferent global/local crops create the view pair — a form of knowledge distillation requiring no labels.",
      hints: [
        '"Self" distillation: the teacher comes from the student itself via exponential moving average.',
        "No labels: the training signal is the teacher\'s output distribution, not a human-assigned class.",
      ],
    },
    {
      id: "q-ssl-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "DINO with ViT encoders produces attention maps that unsupervisedly segment objects in images - the [CLS] token\'s self-attention heads attend to semantically coherent foreground regions without any segmentation supervision.",
      correctAnswer: "True",
      explanation:
        "DINO-ViT\'s self-attention from the [CLS] token naturally concentrates on semantically relevant object regions, producing sharp segmentation-like attention maps without any pixel-level annotation. This emergent property (Caron et al., 2021) is not observed in supervised ViTs or CNN-based SSL - it requires the DINO multi-crop objective with ViT architecture.",
      hints: [
        "ViT attention is computed globally across patches - SSL trains this attention to focus on semantically consistent object regions.",
        "The attention maps from the [CLS] token show which patches are semantically relevant - without any label guidance.",
      ],
    },
    {
      id: "q-ssl-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'DINO uses two mechanisms to prevent collapse: "centering" and "sharpening." What do these operations do to the teacher\'s output, and why are both needed?',
      options: [
        "Centering subtracts the batch mean from teacher outputs (prevents one dimension from dominating); sharpening uses a low temperature \\tau_t for the teacher softmax (prevents uniform collapse). Both are needed because centering alone leads to a uniform distribution, and sharpening alone leads to a single-class collapse",
        "Centering normalizes embeddings to unit sphere; sharpening applies L1 regularization to the output",
        "Centering computes the running mean of gradients for stability; sharpening amplifies the top-k logits by 10\\times",
        "Centering removes the bias term from the teacher projection head; sharpening applies ReLU to teacher outputs",
      ],
      correctAnswer: 0,
      explanation:
        "DINO's teacher output is $P_t^{(k)} = \\frac{\\exp(g_\\xi(x)_k / \\tau_t)}{\\sum_{k'} \\exp(g_\\xi(x)_{k'} / \\tau_t)}$, with a centering term: $P_t^{(k)} = \\frac{\\exp((g_\\xi(x)_k - c_k) / \\tau_t)}{\\sum_{k'} \\exp((g_\\xi(x)_{k'} - c_{k'}) / \\tau_t)}$, where the centering vector $c \\gets m \\cdot c + (1-m) \\cdot \\mathbb{E}[g_\\xi(x)]$ is a running average of the teacher logits. Centering prevents any single logit dimension from dominating by subtracting the batch mean - without it, the teacher could collapse to one dominant class (mode collapse). Sharpening uses a low teacher temperature $\\tau_t = 0.04$ vs student $\\tau_s = 0.1$, making the output distribution peaked - without it, the teacher could spread probability uniformly over all classes. Both failure modes are prevented, but centering alone would allow the uniform distribution (no learning signal), and sharpening alone cannot prevent mode collapse.",
      hints: [
        "What does centering achieve mathematically? If $c = \\mathbb{E}[g_\\xi(x)]$, then the centered logits $(g_\\xi(x) - c)$ have zero mean. This prevents the softmax from spuriously preferring one class just because its raw logit is always higher.",
        "Low temperature $\\tau_t \\ll \\tau_s$ sharpens the teacher's distribution: small logit differences become large probability differences. This gives the student a clear target. But if the teacher randomly assigns one class a slightly higher logit, centering prevents this from becoming a consistent signal.",
      ],
    },
  ],

  "masked-autoencoder": [
    {
      id: "q-ssl-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In Masked Autoencoders (MAE, He et al., 2022), the model is trained on ImageNet by masking ___ of image patches and reconstructing the ___ of masked patches.",
      options: [
        "75% of patches; the normalized pixel values (mean/std per patch)",
        "15% of patches; the original pixel values",
        "50% of patches; the discrete token IDs from a dVAE codebook",
        "90% of patches; the frequency-domain (FFT) representation",
      ],
      correctAnswer: 0,
      explanation:
        "MAE masks 75% of 16\\times16 patches and trains a ViT encoder-decoder to reconstruct the normalized pixel values (mean and std computed per patch) of masked patches. The ViT encoder processes only the 25% visible patches (no mask tokens), and a lightweight Transformer decoder reconstructs the full image. This asymmetric design makes pre-training 3\\times faster than encoding all patches.",
      hints: [
        "Think of MAE as a vision equivalent of BERT: mask some tokens, predict what was masked.",
        "The encoder only processes visible patches (~25%) - greatly reducing compute compared to encoding everything.",
      ],
    },
    {
      id: "q-ssl-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "MAE applies the ViT encoder only to the unmasked (visible) patches and does NOT include [MASK] tokens in the encoder input - [MASK] tokens are only added in the decoder, making the encoder asymmetrically lightweight.",
      correctAnswer: "True",
      explanation:
        "By excluding [MASK] tokens from the encoder (unlike BEiT), MAE\'s encoder processes only ~25% of patches at full ViT depth. Mask tokens are added only in the lightweight decoder, which reconstructs the full image. This design is key to MAE\'s 3\\times training speedup and its ability to pre-train very large models (ViT-L, ViT-H) efficiently.",
      hints: [
        "If you mask 75% of patches and only encode the rest, the encoder sees 4\\times fewer tokens - huge compute savings.",
        "The decoder handles the masked positions - keeping it lightweight enables efficient pretraining.",
      ],
    },
    {
      id: "q-ssl-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "MAE uses a very high masking ratio (75%) compared to BERT\'s 15% word masking. The authors justify this because:",
      options: [
        "Images have fewer total tokens than text, so a higher ratio is needed for sufficient signal",
        "Images have high spatial redundancy - neighboring patches are highly correlated - so a low masking ratio allows the model to solve the task by simple interpolation rather than high-level semantic understanding; 75% forces the model to reason about global scene structure",
        "Time series models are shallower than ViTs and cannot handle high masking ratios",
        "Masking is not differentiable for time series data",
      ],
      correctAnswer: 1,
      explanation:
        "Images have high spatial redundancy: neighboring 16\\times16 patches overlap significantly and share much of their content. At 75% masking, only 25% of patches remain - the model cannot solve MAE by local interpolation (matching nearby visible patches), which would only require learning low-level texture continuity. Instead, the model must build a holistic understanding of the scene - object shapes, spatial layouts, occluded relationships - to accurately fill in large missing regions. BERT uses only 15% masking because text tokens carry dense semantic information; masking more would make the task too difficult. For images, the redundancy means a higher masking ratio is needed to force semantic understanding rather than texture matching.",
      hints: [
        "Think about what happens at 25% visible patches: any given masked patch's content is largely determined by distant visible patches, not neighbors. The model must reason globally, not locally.",
        "If you only mask 15% of image patches, a model could solve it by copying neighboring textures - no semantic understanding needed. At 75%, this is impossible.",
      ],
    },
  ],

  "bert-ssl": [
    {
      id: "q-ssl-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "BERT\'s Masked Language Modelling (MLM) pretext task works by:",
      options: [
        "Generating a rotated version of the input image",
        "Randomly masking 15% of input tokens and training the model to predict the original masked tokens from surrounding context",
        "Aligning two images to have the same orientation",
        "Predicting the rotation invariant features of an image",
      ],
      correctAnswer: 1,
      explanation:
        "BERT randomly replaces 15% of tokens with [MASK] and trains a bidirectional Transformer to predict the original tokens using context from both directions - a self-supervised objective that requires deep language understanding.",
      hints: [
        "The labels are the original words before masking - generated automatically from the text itself.",
        "Bidirectional context is key: BERT can look left and right to fill in the mask.",
      ],
    },
    {
      id: "q-ssl-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "BERT\'s Next Sentence Prediction (NSP) task, which predicts whether two sentences are consecutive, was later found to be largely unnecessary and was dropped in models like RoBERTa.",
      correctAnswer: "True",
      explanation:
        "RoBERTa\'s ablation studies found that NSP provides little or no benefit and can even hurt downstream performance. Removing NSP and training longer on more data with larger batches significantly improves results.",
      hints: [
        "The NSP task may be too easy - a model can solve it using superficial cues rather than deep sentence understanding.",
        'RoBERTa is "Robustly Optimised BERT" - one of its key changes was removing NSP.',
      ],
    },
    {
      id: "q-ssl-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BERT uses a [MASK] token during pre-training but this token never appears during fine-tuning, creating a train-test mismatch. How does BERT\'s training procedure partially mitigate this?",
      options: [
        "BERT adds a small amount of Gaussian noise to all tokens during fine-tuning",
        "Of the 15% selected tokens, 80% are replaced by [MASK], 10% are replaced by a random token, and 10% are left unchanged - forcing the model to develop representations for all tokens, not just [MASK] positions",
        "BERT uses a separate fine-tuning-specific vocabulary that includes [MASK]",
        "BERT pre-trains a second model on unmasked sequences to bridge the train-test gap",
      ],
      correctAnswer: 1,
      explanation:
        'The 10% unchanged tokens ask the model: "are you sure this token is correct?" - it must represent all tokens robustly.',
      hints: [
        "If the model only ever sees [MASK] at prediction positions, it learns [MASK]-specific features that don\'t transfer.",
        'The 10% unchanged tokens ask the model: "are you sure this token is correct?" - it must represent all tokens robustly.',
      ],
    },
  ],

  "gpt-ssl": [
    {
      id: "q-ssl-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "GPT\'s autoregressive language modelling pretext task trains the model to:",
      options: [
        "Predict all tokens simultaneously given a bidirectional context",
        "Predict the next token given only the preceding tokens (causal language modelling)",
        "Predict a randomly masked subset of tokens from the full bidirectional context",
        "Predict the first token of a sentence given the rest of the sentence",
      ],
      correctAnswer: 1,
      explanation:
        "GPT uses causal (left-to-right) language modelling: at each position, the model predicts the next token using only the tokens that came before it. This is enforced by a causal (masked) self-attention mechanism.",
      hints: [
        "Causal = one-directional = cannot look at future tokens.",
        "Think about how a language model generates text: one token at a time, each conditioned on previous tokens.",
      ],
    },
    {
      id: "q-ssl-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The key difference between BERT (masked LM) and GPT (causal LM) as SSL approaches is that BERT uses bidirectional context for each token while GPT uses only left-to-right (unidirectional) context.",
      correctAnswer: "True",
      explanation:
        "BERT\'s bidirectional attention allows each token to attend to the full sentence context, making it powerful for understanding tasks. GPT\'s causal attention only uses past context, making it naturally suited for text generation.",
      hints: [
        "Bidirectional context is better for understanding (e.g., NER, classification); unidirectional is necessary for generation.",
        "Think about why you can\'t use bidirectional attention for text generation: you can\'t see future tokens.",
      ],
    },
    {
      id: "q-ssl-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Autoregressive SSL (GPT-style) scales extremely well with data and model size. What property of the causal LM objective explains this empirical scaling behaviour?",
      options: [
        "Causal LM has a lower computational cost per token than masked LM, allowing larger batches",
        "Causal LM trains on every token position simultaneously as a prediction target (all T tokens per sequence), providing dense learning signal that scales efficiently with sequence length and data quantity",
        "Causal LM avoids the train-test mismatch of masked LM, making fine-tuning more efficient",
        "Causal LM uses a simpler loss function that is easier to optimise at large scale",
      ],
      correctAnswer: 1,
      explanation:
        "In causal LM, every token position contributes a prediction target - a sequence of length T provides T training signals simultaneously. This dense supervision scales linearly with data and benefits enormously from scale, explaining empirical scaling laws.",
      hints: [
        "Masked LM only predicts 15% of tokens; causal LM predicts every token. How does that affect sample efficiency?",
        "Dense supervision = more learning signal per sequence = better scaling with data quantity.",
      ],
    },
  ],

  "wav2vec-ssl": [
    {
      id: "q-ssl-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "wav2vec 2.0 applies a contrastive SSL objective to speech. What does it contrast?",
      options: [
        "Two different speakers saying the same word",
        "The correct quantised speech representation for a masked time step against distractor (negative) quantised representations",
        "Clean speech against noise-augmented speech",
        "Short clips of speech against long clips of the same utterance",
      ],
      correctAnswer: 1,
      explanation:
        "wav2vec 2.0 masks spans of speech features, quantises the unmasked context, and trains a Transformer to identify the correct quantised target for each masked time step among a set of distractors - a contrastive objective applied to raw speech.",
      hints: [
        "Think of it as BERT for speech: mask time steps, train to predict what was masked.",
        'The "contrast" is between the correct quantised unit and multiple distractors from the same batch.',
      ],
    },
    {
      id: "q-ssl-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "wav2vec 2.0 uses a product quantisation module to discretise continuous speech features into a finite vocabulary of speech units (pseudo-phonemes), which serve as the prediction targets.",
      correctAnswer: "True",
      explanation:
        'The quantisation module in wav2vec 2.0 learns a codebook of discrete speech representations (Gumbel-softmax). The model must predict which codebook entry corresponds to each masked frame - creating a discrete target like a "speech vocabulary" without any phoneme labels.',
      hints: [
        "Discretisation converts continuous audio features into a finite set of tokens - analogous to a text vocabulary.",
        "Gumbel-softmax enables differentiable discrete selection during training.",
      ],
    },
    {
      id: "q-ssl-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key result from wav2vec 2.0 was achieving competitive ASR performance with very few labelled minutes of speech. What makes the SSL pre-training so data-efficient for downstream ASR?",
      options: [
        "The pre-trained features are already language-specific and require no adaptation",
        "The SSL objective forces the model to learn rich acoustic and phonetic representations from unlabelled audio, so fine-tuning only needs to learn the language-specific mapping from these representations to characters/words",
        "The quantisation module pre-labels audio with phonemes, reducing the annotation burden",
        "The contrastive loss compresses the audio to a low-dimensional space that is easy to decode",
      ],
      correctAnswer: 1,
      explanation:
        "After SSL pre-training on thousands of hours of unlabelled audio, the representations capture fine-grained acoustic structure. Fine-tuning on a small labelled set only needs to align these representations with text transcriptions - a much simpler task than learning acoustics from scratch.",
      hints: [
        "The hard part of ASR is learning acoustic features - SSL does this from unlabelled data.",
        "With good representations, fine-tuning on 10 minutes of labelled data can approach results from 100 hours.",
      ],
    },
  ],

  data2vec: [
    {
      id: "q-ssl-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "data2vec unifies SSL across modalities (vision, text, speech) by using the same training objective. What is that objective?",
      options: [
        "Predict discrete tokens (words or codebook entries) for masked positions in each modality",
        "Predict the continuous latent representations of masked positions produced by a teacher network (EMA of the student), rather than modality-specific discrete targets",
        "Maximising the mutual information between two augmented views in each modality",
        "Reconstruct raw pixels/audio/text tokens for masked positions",
      ],
      correctAnswer: 1,
      explanation:
        "data2vec trains a student to predict the top-K averaged encoder states (from the EMA teacher) for masked positions - a unified continuous target that applies the same framework to all modalities without modality-specific discretisation.",
      hints: [
        "Instead of predicting discrete tokens (BERT-style) or pixels (MAE-style), data2vec predicts the teacher\'s continuous representations.",
        "One objective, one architecture template - applied to all modalities.",
      ],
    },
    {
      id: "q-ssl-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "data2vec avoids the need for modality-specific quantisation steps (like the codebook in wav2vec 2.0) by using a unified continuous target for all modalities.",
      correctAnswer: "True",
      explanation:
        "Quantisation (wav2vec 2.0 for speech, dVAE for images in BEiT) requires modality-specific design. data2vec replaces discrete targets with continuous teacher embeddings, eliminating this modality-specific preprocessing step and making the framework truly unified.",
      hints: [
        "Quantisation requires designing a codebook for each modality - data2vec skips this entirely.",
        "Continuous targets from the teacher apply uniformly to any modality that can be Transformer-encoded.",
      ],
    },
    {
      id: "q-ssl-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "data2vec uses top-K layer averaging from the teacher for its prediction targets. Why might averaging multiple top layers be better than using only the final layer?",
      options: [
        "The final layer is too computationally expensive to use as a target for every masked position",
        "Averaging top-K layers smooths the target representation, combining semantic information from the upper layers with structural information from slightly lower layers, producing richer and more stable targets",
        "The final layer in the teacher collapses to zero during training without averaging",
        "Top-K averaging reduces the dimensionality of the target vector, making prediction easier",
      ],
      correctAnswer: 1,
      explanation:
        "Upper transformer layers encode different aspects of the representation (top layer = most abstract, lower layers = more structural). Averaging them provides a richer, multi-scale target that is more informative than any single layer alone and more stable due to averaging noise.",
      hints: [
        "Think about what different layers in a Transformer encode - do they all capture the same information?",
        "Averaging is a form of ensembling: it reduces variance while preserving the shared signal.",
      ],
    },
  ],

  ibot: [
    {
      id: "q-ssl-kp16-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "iBOT (Image BERT Pre-Training with Online Tokeniser) combines which two SSL approaches?",
      options: [
        "Contrastive learning (SimCLR-style) and masked language modelling (BERT-style)",
        "Self-distillation (DINO-style) at the image level with masked patch prediction using an online tokeniser - combining instance-level and patch-level objectives",
        "Generative pretraining (GPT-style) with rotation prediction pretext tasks",
        "Barlow Twins redundancy reduction with masked autoencoding reconstruction",
      ],
      correctAnswer: 1,
      explanation:
        "iBOT applies DINO\'s self-distillation loss on the [CLS] token (image-level invariance) and simultaneously trains a masked patch prediction head using the teacher as an online tokeniser - combining global and local SSL objectives in one framework.",
      hints: [
        "DINO provides global (image-level) self-distillation; iBOT adds local (patch-level) masked prediction.",
        'The "online tokeniser" is the EMA teacher - it generates patch-level targets the student must predict.',
      ],
    },
    {
      id: "q-ssl-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "In iBOT, the online tokeniser (teacher) produces soft token distributions as targets for masked patches, rather than requiring a pre-trained discrete vocabulary like BEiT.",
      correctAnswer: "True",
      explanation:
        "Unlike BEiT which uses a pre-trained dVAE as a fixed tokeniser, iBOT\'s teacher evolves during training (EMA of the student), producing soft token distributions that improve as training progresses - eliminating the need for a separate pre-training stage for the tokeniser.",
      hints: [
        "BEiT\'s tokeniser is fixed and pre-trained; iBOT\'s tokeniser is online and improves jointly with the student.",
        "Soft distributions are more informative targets than hard discrete tokens.",
      ],
    },
    {
      id: "q-ssl-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "iBOT achieves strong performance on both image classification (linear probe) and dense prediction tasks (detection, segmentation). What architecture property of iBOT explains this breadth?",
      options: [
        "iBOT uses a CNN backbone optimised for feature pyramid networks",
        "The patch-level masked prediction objective trains all patch tokens (not just the [CLS] token) to be semantically rich, providing dense features suitable for both global and local downstream tasks",
        "iBOT uses a larger embedding dimension than DINO, providing more expressive features for all tasks",
        "iBOT applies gradient clipping that regularises patch features toward a shared global representation",
      ],
      correctAnswer: 1,
      explanation:
        "The masked patch prediction objective forces every patch token to encode meaningful semantic content (not just the [CLS] token). This yields dense, locally informative representations that are valuable for detection and segmentation, which require per-region features rather than global image embeddings.",
      hints: [
        "DINO focuses on the [CLS] token - are patch tokens also informative for detection/segmentation?",
        "Dense prediction tasks need spatially resolved features - which SSL objective encourages informative patch tokens?",
      ],
    },
  ],

  "ssl-theory": [
    {
      id: "q-ssl-kp17-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'The "augmentation graph" framework for understanding contrastive SSL defines positive pairs as nodes connected by edges. What determines the quality of representations according to this framework?',
      options: [
        "The number of nodes (images) in the graph determines representation quality",
        "The spectral structure of the augmentation graph - good representations should reflect the connected components (semantic classes) in the graph formed by augmentation-related positive pairs",
        "The degree distribution of the augmentation graph determines how many negatives each sample has",
        "The edge weights in the augmentation graph determine the contrastive loss temperature",
      ],
      correctAnswer: 1,
      explanation:
        "HaoChen et al. showed that contrastive SSL can be understood as spectral decomposition of the augmentation graph. Samples connected by augmentations (same content) form clusters; good representations should reflect these clusters, which align with semantic classes if augmentations are semantically invariant.",
      hints: [
        "Think about which samples are connected in the augmentation graph: those with the same semantic content.",
        "Spectral clustering finds the same communities - contrastive SSL is implicitly doing this.",
      ],
    },
    {
      id: "q-ssl-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        'The "uniformity-alignment" framework (Wang & Isola) decomposes contrastive SSL objectives into two desirable properties: alignment (positive pairs close together) and uniformity (embeddings spread uniformly on the hypersphere).',
      correctAnswer: "True",
      explanation:
        "Wang & Isola showed that NT-Xent implicitly optimises alignment (positive pair similarity) and uniformity (uniform coverage of the representation sphere). Both are necessary: alignment alone causes collapse; uniformity alone ignores semantic structure.",
      hints: [
        "Alignment: same semantics \\to close embeddings. Uniformity: don\'t waste hypersphere capacity by clustering.",
        'Uniformity prevents collapse by encouraging the model to "use" all of the embedding space.',
      ],
    },
    {
      id: "q-ssl-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Theoretical analysis shows that SSL representations can provably benefit downstream supervised tasks under what key assumption?",
      options: [
        "The downstream task uses the same augmentations as SSL pre-training",
        "The augmentations used in SSL preserve the semantic labels of the downstream task - i.e., augmented views of the same image have the same class label",
        "The downstream task has at least as many classes as the SSL pre-training had negatives",
        "The SSL encoder is larger than the supervised classifier applied on top of it",
      ],
      correctAnswer: 1,
      explanation:
        'Tian et al. and others formalised that SSL benefits downstream tasks if augmentations are "label-preserving" - an augmented view retains the same label as the original. Under this assumption, SSL representations that are invariant to augmentations are also informative for the downstream task.',
      hints: [
        'If the augmentation changes the label (e.g., flipping "left" and "right" for a chirality task), SSL would hurt.',
        "Think about the role of augmentations: they define what information SSL is forced to capture (augmentation-invariance) and discard (augmentation-specific).",
      ],
    },
  ],

  "ssl-augmentation": [
    {
      id: "q-ssl-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SimCLR ablation studies found that which combination of augmentations is most critical for learning good visual representations?",
      options: [
        "Random horizontal flip and Gaussian blur",
        "Random cropping and colour distortion (jitter + grayscale)",
        "Random rotation and cutout",
        "Gaussian noise and random erasing",
      ],
      correctAnswer: 1,
      explanation:
        "Chen et al. showed that random crop (with resize) combined with colour distortion is the most impactful augmentation pair. Crop forces the model to match different spatial views; colour distortion prevents colour histogram shortcuts.",
      hints: [
        "Random crop creates views that don\'t share pixel positions - the model must match them semantically.",
        "Colour distortion prevents the model from using colour as a trivial shortcut for matching views.",
      ],
    },
    {
      id: "q-ssl-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Augmentations that are too strong (destroying semantic content) will hurt SSL performance because positive pairs no longer share meaningful information.",
      correctAnswer: "True",
      explanation:
        "If augmentations are so severe that positive pair views share no semantic content, the contrastive objective has no valid learning signal - the model cannot learn to match truly different (augmented-beyond-recognition) views of the same image.",
      hints: [
        'Think about augmenting an image so strongly that you can no longer tell it\'s a cat - can the model learn "catness" from such pairs?',
        "Augmentation strength is a dial: too weak = no invariance learned; too strong = no shared information.",
      ],
    },
    {
      id: "q-ssl-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Multi-crop augmentation (used in SwAV) samples one or two large crops and several small crops from an image. What is the advantage of this strategy?",
      options: [
        "Small crops provide negatives from different regions of the same image",
        "Small crops provide more localised views at lower compute cost; the model matches small local crops to large global views, learning local-to-global consistency with less memory per step than using many large crops",
        "Multi-crop ensures that all crops have the same resolution for consistent feature extraction",
        "Small crops act as a data augmentation that prevents the model from memorising specific image crops",
      ],
      correctAnswer: 1,
      explanation:
        "Multi-crop increases the number of views per image without proportionally increasing compute (small crops are cheaper to encode). Matching small local crops to large global crops encourages the model to learn that local patches are consistent with the global scene representation.",
      hints: [
        "More views = more positive pairs = richer learning signal, but full-resolution crops are expensive.",
        "Small crops can be encoded cheaply; matching them to large crops teaches local-global consistency.",
      ],
    },
  ],

  "ssl-negative-free": [
    {
      id: "q-ssl-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'Methods like BYOL, SimSiam, Barlow Twins, and VICReg are called "negative-free" because:',
      options: [
        "They are trained on datasets with no negative (harmful) content",
        "They do not explicitly use dissimilar (negative) sample pairs in their training objective",
        "They use negative learning rates for some parameters",
        "They remove negative values from embeddings by applying ReLU activations",
      ],
      correctAnswer: 1,
      explanation:
        "Negative-free SSL methods achieve strong representations using only positive pairs (augmented views of the same image) and various collapse-prevention mechanisms - no explicit repulsion between different images is used.",
      hints: [
        "Not all methods are truly negative-free - they may use implicit negative signals.",
        "These methods show you don\'t need to explicitly repel different images to learn good representations.",
      ],
    },
    {
      id: "q-ssl-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "All negative-free SSL methods prevent representational collapse using the same mechanism (stop-gradient).",
      correctAnswer: "False",
      explanation:
        "Different negative-free methods use distinct anti-collapse mechanisms: BYOL uses a momentum encoder + predictor asymmetry; SimSiam uses stop-gradient; Barlow Twins uses cross-correlation decorrelation; VICReg uses explicit variance regularisation.",
      hints: [
        "Each term in VICReg addresses a specific failure mode or goal: collapse prevention, invariance, efficiency.",
        "Think about each word: Variance (spread), Invariance (stability across views), Covariance (independence of dimensions).",
      ],
    },
    {
      id: "q-ssl-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A unified theoretical analysis of negative-free methods by Tian et al. suggests they all implicitly enforce what property to prevent collapse?",
      options: [
        "Maximisation of the representation entropy over the data distribution",
        "Dimensional non-collapse: ensuring the covariance matrix of the representations has full rank (all eigenvalues non-zero), preventing degenerate low-dimensional solutions",
        "Maximisation of the mutual information between positive pairs using a lower bound",
        "Enforcing that gradients flow equally through all layers of the encoder",
      ],
      correctAnswer: 1,
      explanation:
        "Whether through explicit covariance (Barlow Twins, VICReg), predictor asymmetry (BYOL, SimSiam), or centering (DINO), all negative-free methods implicitly prevent the embedding covariance matrix from being rank-deficient - maintaining full-dimensional representations.",
      hints: [
        "Rank collapse means all representations lie in a lower-dimensional subspace - equivalent to losing information.",
        "Full-rank covariance means all embedding dimensions carry independent variance - the model uses all of its capacity.",
      ],
    },
  ],

  "ssl-graphs": [
    {
      id: "q-ssl-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Applying contrastive SSL to graph data (e.g., GraphCL) requires defining positive pairs. How are they typically created for graph-level SSL?",
      options: [
        "By pairing nodes from the same graph as positive pairs",
        "By creating two augmented views of the same graph (e.g., node dropping, edge perturbation, attribute masking) as a positive pair",
        "By pairing graphs with similar degree distributions as positive pairs",
        "By pairing the graph with its complement graph as a positive pair",
      ],
      correctAnswer: 1,
      explanation:
        "GraphCL applies graph augmentations (node dropping, edge perturbation, subgraph sampling, attribute masking) to create two views of the same graph and trains a GNN encoder to produce similar embeddings for the pair - a direct adaptation of contrastive SSL to graphs.",
      hints: [
        'Think about what "augmentation" means for a graph: you can perturb nodes, edges, or attributes.',
        "Two augmented views of the same graph should share the same semantic meaning - just like two crops of the same image.",
      ],
    },
    {
      id: "q-ssl-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Node-level SSL on graphs can use the graph structure itself as a self-supervised signal, for example by predicting the masked features of a node from its neighbours' features.",
      correctAnswer: "True",
      explanation:
        "Node-level SSL methods (e.g., GPT-GNN, GraphMAE) mask node features and train a GNN to reconstruct them using neighbourhood context - leveraging the graph\'s structural inductive bias for self-supervised representation learning.",
      hints: [
        "The graph structure provides rich context: a node\'s neighbours encode its local neighbourhood information.",
        "This is analogous to BERT\'s masked prediction, but applied to graph nodes instead of text tokens.",
      ],
    },
    {
      id: "q-ssl-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key challenge in designing augmentations for graph SSL is that some augmentations can change the semantic meaning of the graph. In molecular property prediction, what augmentation would be inappropriate?",
      options: [
        "Randomly dropping 10% of non-critical edges",
        "Randomly removing atoms (nodes) that are part of functional groups critical to the molecule\'s biological activity",
        "Adding random noise to continuous node features like atomic mass",
        "Randomly masking non-functional node attributes like 3D coordinates",
      ],
      correctAnswer: 1,
      explanation:
        "Removing atoms from functional groups (e.g., -OH, -NH\\_2) changes the molecule\'s chemical identity and properties. The positive pair would have different labels - violating the semantic-preservation requirement for SSL augmentations.",
      hints: [
        "Not all graph augmentations preserve semantics - in chemistry, specific substructures (functional groups) determine biological activity.",
        'An augmentation that changes the molecule\'s properties creates a positive pair with different "true labels".',
      ],
    },
  ],

  "ssl-time-series": [
    {
      id: "q-ssl-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Which augmentation is commonly used to create positive pairs for contrastive SSL on time series data?",
      options: [
        "Reversing the temporal order of the time series",
        "Extracting overlapping sub-sequences (temporal crops) from the same time series",
        "Shuffling the time steps randomly",
        "Replacing all values with their z-score",
      ],
      correctAnswer: 1,
      explanation:
        "Overlapping temporal crops from the same time series share temporal context and are semantically related - analogous to spatial crops in vision SSL. They form natural positive pairs without requiring labels.",
      hints: [
        'Think about what makes two time series windows "the same" - if they overlap or are from the same sequence, they share underlying dynamics.',
        "Temporal crops are the time-series analogue of image crops in SimCLR.",
      ],
    },
    {
      id: "q-ssl-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Time-Frequency Consistency (TF-C) is an SSL method for time series that creates positive pairs from the same signal\'s time-domain and frequency-domain representations.",
      correctAnswer: "True",
      explanation:
        "TF-C (Zhang et al.) creates positive pairs by taking a time-domain window and its frequency-domain Fourier transform, training the encoder to produce consistent representations in both domains - leveraging the inherent time-frequency duality of signals.",
      hints: [
        "A signal and its Fourier transform represent the same underlying information in different bases.",
        "Time-frequency duality is a natural source of positive pairs without requiring data augmentation design.",
      ],
    },
    {
      id: "q-ssl-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Applying masking-based SSL (MAE-style) to time series requires adapting the high masking ratio from vision. Why might a much higher masking ratio (e.g., 75%) be less effective for time series than for images?",
      options: [
        "Time series have fewer total time steps than images have patches, so masking fewer is needed",
        "Time series often have lower temporal redundancy than images - neighboring time steps carry less shared information than neighboring pixels - so aggressive masking can make the reconstruction task ill-posed rather than semantically challenging",
        "Time series models are shallower than ViTs and cannot handle high masking ratios",
        "Masking is not differentiable for time series data",
      ],
      correctAnswer: 1,
      explanation:
        "The optimal masking ratio depends on the autocorrelation structure of the time series. Images have strong spatial autocorrelation: adjacent pixels are very similar (high redundancy), so even with 75% masking, visible patches provide enough local context to reconstruct masked regions. Time series vary widely in their autocorrelation: ECG signals have very high redundancy (adjacent heartbeats are nearly identical), while financial returns have low redundancy (successive returns are nearly independent). With low redundancy, 75% masking leaves insufficient context - the model cannot reliably infer missing values from distant observations alone, making the reconstruction task ill-posed rather than simply difficult. The optimal masking ratio for time series is therefore domain-dependent and must be calibrated to the autocorrelation scale of the data.",
      hints: [
        "Define autocorrelation $\\rho(\\tau) = \\text{Cov}(x_t, x_{t+\\tau}) / \\text{Var}(x_t)$. If $\\rho(\\tau)$ decays quickly (low redundancy), long-range prediction is unreliable even with sophisticated models.",
        "Think about extreme cases: if $\\rho(1) = 0$ (successive values are independent), knowing 25% of a time series tells you almost nothing about the masked 75%. In images, $\\rho$ decays slowly due to spatial continuity of objects and textures.",
      ],
    },
  ],

  "ssl-medical": [
    {
      id: "q-ssl-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why is self-supervised learning particularly valuable for medical imaging applications?",
      options: [
        "Medical images are always high resolution, which SSL handles better than supervised methods",
        "Labelled medical data requires expensive expert annotation (radiologists, pathologists), while vast quantities of unlabelled medical images exist",
        "Medical imaging datasets are always publicly available, unlike natural image datasets",
        "SSL models are inherently more interpretable, which is required by medical regulations",
      ],
      correctAnswer: 1,
      explanation:
        "Medical image annotation requires clinical expertise (radiologists, pathologists) and is expensive, time-consuming, and often regulated. SSL enables learning from abundant unlabelled clinical data, dramatically reducing annotation requirements.",
      hints: [
        "Think about the bottleneck: a radiologist must annotate each image - how does SSL change this?",
        "The ratio of unlabelled to labelled medical images is extremely high.",
      ],
    },
    {
      id: "q-ssl-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Pre-training on natural images (e.g., ImageNet) and then fine-tuning on medical images consistently outperforms SSL pre-training directly on domain-specific medical images for medical imaging tasks.",
      correctAnswer: "False",
      explanation:
        "Multiple studies show that SSL pre-training on domain-specific medical images (e.g., chest X-rays, pathology patches) can match or outperform ImageNet pre-training, especially when medical data volume is large enough - because in-domain features transfer better.",
      hints: [
        "Natural image features (edges, textures of everyday objects) may not transfer well to X-ray patterns.",
        "In-domain pre-training captures the specific visual statistics of the target domain.",
      ],
    },
    {
      id: "q-ssl-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Medical imaging SSL must handle 3D volumetric data (e.g., CT scans). What adaptation of standard 2D contrastive SSL is commonly used?",
      options: [
        "Projecting 3D volumes to 2D slices and applying standard 2D SSL on each slice independently",
        "Treating spatially adjacent 2D slices or 3D sub-volumes from the same scan as positive pairs, and using 3D convolutional or Transformer encoders",
        "Applying 2D SSL to all three orthogonal planes (axial, coronal, sagittal) separately and averaging the embeddings",
        "Randomly flipping the 3D volume along all three axes as the primary augmentation",
      ],
      correctAnswer: 1,
      explanation:
        "For 3D medical data, positive pairs are constructed from views of the same volume (adjacent slices, random 3D crops, or different augmentations of the same volume), and encoders are extended to 3D (3D CNNs, 3D ViTs) to capture volumetric structure.",
      hints: [
        "The key insight is that different sub-volumes or slices from the same scan are positively related.",
        "3D volumetric context is critical for medical diagnosis - 2D slice processing discards this structure.",
      ],
    },
  ],

  "ssl-tabular": [
    {
      id: "q-ssl-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SCARF (Self-Supervised Contrastive Learning using Random Feature Corruption) creates positive pairs for tabular data by:",
      options: [
        "Pairing rows from the same table as positive pairs regardless of their feature values",
        "Corrupting a random subset of features in one view by replacing them with values sampled from the marginal distribution of each feature, while keeping the other view uncorrupted",
        "Applying z-score normalisation to one view and min-max scaling to the other",
        "Randomly duplicating rows and treating duplicates as positive pairs",
      ],
      correctAnswer: 1,
      explanation:
        "SCARF creates a corrupted view by randomly replacing some feature values with marginal samples (breaking the joint distribution), while the original row is the uncorrupted view. The model must distinguish real rows from corrupted ones - learning the feature joint distribution.",
      hints: [
        'The corruption mimics the "masking" of images or "masking" in BERT - but for tabular features.',
        "Replacing a feature with a random value from its marginal distribution breaks the correlations between features.",
      ],
    },
    {
      id: "q-ssl-kp23-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "TabTransformer uses SSL pre-training by masking categorical feature tokens and training the Transformer to reconstruct the masked values, analogous to BERT\'s masked language modelling.",
      correctAnswer: "True",
      explanation:
        "TabTransformer SSL applies masked token prediction to the categorical feature embeddings: random features are masked and the Transformer encoder is trained to reconstruct them from context - learning correlations between categorical variables without labels.",
      hints: [
        "Categorical features in a table are analogous to words in a sentence - they can be masked and predicted.",
        "The Transformer attends across features to reconstruct masked ones, learning feature relationships.",
      ],
    },
    {
      id: "q-ssl-kp23-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A fundamental challenge for applying contrastive SSL to tabular data is defining meaningful augmentations. Why is this harder for tabular data than for images?",
      options: [
        "Tabular data has fewer features than images have pixels, making augmentation less impactful",
        "Unlike images where semantic-preserving augmentations (crop, colour jitter) are intuitive and domain-agnostic, tabular feature perturbations are domain-specific - an augmentation that preserves semantics for one dataset may destroy it for another",
        "Tabular data cannot be represented as a sequence, preventing Transformer-based SSL",
        "Tabular datasets are always too small for contrastive learning to be effective",
      ],
      correctAnswer: 1,
      explanation:
        'In images, cropping or flipping generally preserves the semantic content across domains. For tabular data, whether changing a feature value is semantically neutral depends entirely on the domain: changing "age by 1 year" may be fine, but changing "diagnosis code" is not.',
      hints: [
        'There is no universal "tabular crop" analogous to image crop - augmentation design is domain-dependent.',
        "Think about a medical record vs. a financial transaction - what augmentation is semantically safe for both?",
      ],
    },
  ],

  "ssl-transfer": [
    {
      id: "q-ssl-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the standard protocol for evaluating how well SSL representations transfer to downstream tasks?",
      options: [
        "Re-training the SSL model from scratch on each downstream task",
        "Freezing the SSL encoder and training only a linear classifier on top (linear probe), and optionally fine-tuning the full encoder",
        "Using the SSL model\'s pre-training loss directly as a proxy for downstream performance",
        "Measuring the cosine similarity between SSL embeddings of different classes",
      ],
      correctAnswer: 1,
      explanation:
        "Linear probing tests whether SSL representations are linearly separable for the downstream task without any representation adaptation. Fine-tuning then measures the upper bound of transfer quality. Both protocols are standard benchmarks.",
      hints: [
        "Linear probing isolates representation quality from fine-tuning compute.",
        "Fine-tuning allows the representations to adapt to the downstream task - it\'s the upper bound of transfer performance.",
      ],
    },
    {
      id: "q-ssl-kp24-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SSL pre-trained models consistently outperform supervised pre-trained models on all downstream tasks when fine-tuned with large labelled datasets.",
      correctAnswer: "False",
      explanation:
        "The relative advantage of SSL vs. supervised pre-training depends on the downstream task, domain, and fine-tuning data size. With large labelled fine-tuning sets, supervised pre-training on the same domain can be competitive; SSL advantages are most consistent in low-label regimes.",
      hints: [
        "Think about when SSL matters most: when labels are scarce. With abundant labels, supervised pre-training can close the gap.",
        "Task distribution also matters: SSL on natural images may not transfer as well to medical images as in-domain pre-training.",
      ],
    },
    {
      id: "q-ssl-kp24-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Researchers have found that the choice of SSL method matters less than the choice of pre-training data distribution and backbone architecture for transfer performance. What practical implication does this have?",
      options: [
        "Practitioners should always implement the latest SSL algorithm from the literature",
        "Investinging in collecting more diverse in-domain unlabelled data and using a larger backbone is often more impactful than switching between SSL algorithms (SimCLR vs BYOL vs DINO)",
        "The SSL objective is the primary hyperparameter and should be tuned first",
        "Pre-training data and architecture are fixed by convention and should not be changed",
      ],
      correctAnswer: 1,
      explanation:
        "Empirical studies (including Meta-Dataset analyses) consistently show that data diversity and model scale dominate algorithm choice. Practitioners gain more from curating relevant unlabelled data and scaling backbones than from algorithm selection.",
      hints: [
        "This parallels the finding in supervised learning: data quality and scale often matter more than model architecture.",
        "Think about where to invest engineering effort: better data curation or algorithm refinement?",
      ],
    },
  ],

  "ssl-semi-supervised": [
    {
      id: "q-ssl-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "In SSL + semi-supervised learning combinations, what role does the SSL pre-training play?",
      options: [
        "SSL pre-training is used to generate pseudo-labels for the unlabelled data",
        "SSL pre-training provides a strong initialisation for the supervised fine-tuning stage, enabling better generalisation with fewer labelled examples",
        "SSL pre-training replaces the need for any labelled data",
        "SSL pre-training augments the labelled dataset by creating synthetic labelled samples",
      ],
      correctAnswer: 1,
      explanation:
        "SSL pre-trains the encoder on all available unlabelled data, producing a good feature initialisation. Fine-tuning on the small labelled set then requires fewer samples to converge, combining the best of both paradigms.",
      hints: [
        "Think about why you distil at the end: the fine-tuned large model is a better teacher than the SSL-only model.",
        "Distillation at the end compresses the knowledge into a smaller student, making deployment practical.",
      ],
    },
    {
      id: "q-ssl-kp25-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "FixMatch, a semi-supervised learning method, combines consistency regularisation and pseudo-labelling by generating pseudo-labels from weakly augmented views and using them to train on strongly augmented views.",
      correctAnswer: "True",
      explanation:
        "FixMatch generates high-confidence pseudo-labels from the model\'s predictions on weakly augmented unlabelled images, then trains the model to make the same predictions for strongly augmented versions of the same images - a consistency constraint that leverages unlabelled data effectively.",
      hints: [
        "Pseudo-labels from weak augmentation are more reliable (less augmentation noise).",
        "Training on strong augmentations with pseudo-labels encourages augmentation invariance.",
      ],
    },
    {
      id: "q-ssl-kp25-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SimCLRv2 proposes a semi-supervised learning protocol involving three stages. In the correct order, these are:",
      options: [
        "Supervised fine-tuning \\to SSL pre-training \\to knowledge distillation",
        "SSL pre-training on unlabelled data \\to fine-tuning on labelled data \\to knowledge distillation from the fine-tuned model back to a smaller student",
        "SSL pre-training \\to knowledge distillation \\to supervised fine-tuning",
        "Labelled data fine-tuning \\to unlabelled data SSL \\to knowledge distillation",
      ],
      correctAnswer: 1,
      explanation:
        "SimCLRv2's protocol: (1) SSL pre-train a large encoder on all unlabelled data, (2) fine-tune on the small labelled set, (3) use the resulting model as a teacher to train a compact student via self-training on unlabelled data - efficiently leveraging all data.",
      hints: [
        "Think about why you distil at the end: the fine-tuned large model is a better teacher than the SSL-only model.",
        "Distillation at the end compresses the knowledge into a smaller student, making deployment practical.",
      ],
    },
  ],

  "ssl-efficient": [
    {
      id: "q-ssl-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What makes linear probing a computationally efficient evaluation method for SSL?",
      options: [
        "Linear probes do not require backpropagation through the encoder",
        "The encoder is frozen, so only the linear layer\'s parameters (d\\timesC for d embedding dimensions and C classes) are trained - orders of magnitude fewer than the full encoder",
        "Linear probes always converge in a single gradient step",
        "Linear probes use a subset of the training data, reducing evaluation time",
      ],
      correctAnswer: 1,
      explanation:
        "With a frozen encoder, linear probing trains only d\\timesC parameters (e.g., 2048\\times1000 \\approx 2M for ImageNet). Compare this to fine-tuning an entire ResNet-50 (25M parameters) - linear probing is dramatically cheaper.",
      hints: [
        "The heavy lifting (feature extraction) is done by the frozen encoder - the linear layer is tiny.",
        "Think about how many parameters a linear classifier has vs. a deep encoder.",
      ],
    },
    {
      id: "q-ssl-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SSL methods that require large batch sizes (e.g., SimCLR with 4096 batch) can be made more accessible by using methods like MoCo that maintain a large queue of negatives decoupled from batch size.",
      correctAnswer: "True",
      explanation:
        "MoCo\'s key queue provides thousands of negatives without requiring a proportionally large batch, making it feasible to train on hardware with limited GPU memory that cannot accommodate 4096-sample batches.",
      hints: [
        "The queue stores negatives from past batches - how does that reduce the required current batch size?",
        "Think about researchers with 8GB GPUs vs. 40GB GPUs - MoCo democratisises contrastive SSL.",
      ],
    },
    {
      id: "q-ssl-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Efficient SSL methods for low-resource settings often use smaller backbone architectures. What trade-off must be carefully managed when scaling down the backbone for SSL?",
      options: [
        "Smaller backbones require longer training to converge due to lower learning rates",
        "Smaller backbones have lower capacity, which may limit representation expressiveness - but they train faster and require less memory, requiring a careful accuracy-efficiency trade-off for the target deployment constraint",
        "Smaller backbones cannot use contrastive losses, requiring generative SSL methods",
        "Smaller backbones always produce higher linear probe accuracy due to reduced overfitting",
      ],
      correctAnswer: 1,
      explanation:
        "Smaller encoders train faster and fit on constrained hardware but may lack the capacity to learn rich representations competitive with large backbones. Practitioners must match backbone size to the representation richness required for their downstream tasks and available compute.",
      hints: [
        "Model capacity is a spectrum - smaller is cheaper but may limit what the model can represent.",
        "Think about whether a MobileNet has enough capacity to learn features competitive with a ViT-L for ImageNet classification.",
      ],
    },
  ],

  "ssl-video": [
    {
      id: "q-ssl-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "VideoMAE extends MAE to video by masking what proportion of spatio-temporal patches, and why is such a high ratio needed?",
      options: [
        "15% - because video has less redundancy than images",
        "90% - because videos have extremely high spatio-temporal redundancy (adjacent frames are very similar), requiring very high masking to create a non-trivial reconstruction challenge",
        "50% - to balance information loss with reconstruction difficulty",
        "75% - the same as image MAE, since video is just a sequence of images",
      ],
      correctAnswer: 1,
      explanation:
        "VideoMAE uses ~90% masking because adjacent video frames are nearly identical. With lower masking ratios, the model can trivially interpolate masked patches from adjacent frames without learning semantics. Tube masking (masking the same spatial location across all frames) forces the model to understand the video content.",
      hints: [
        "Images: mask 75% to make task hard. Videos: mask 90%+ to prevent trivial temporal interpolation.",
        "Tube mask = same spatial patch masked in all frames. Without this, temporal copying trivializes the task.",
      ],
    },
    {
      id: "q-ssl-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "V-JEPA (Video Joint Embedding Predictive Architecture) predicts abstract representations of masked video regions rather than reconstruct raw pixels, following the JEPA framework.",
      correctAnswer: "True",
      explanation:
        "V-JEPA trains a predictor to predict the encoder\'s representations of masked spatio-temporal regions from visible context - not raw pixels. This avoids learning irrelevant low-level details (noise, texture) that pixel reconstruction requires, leading to more semantic representations.",
      hints: [
        "JEPA (Joint Embedding Predictive Architecture) predicts in representation space, not pixel space.",
        "Think about why predicting pixel values might be wasteful: the model spends capacity on reconstructinging noise and texture.",
      ],
    },
    {
      id: "q-ssl-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "A key challenge unique to video SSL compared to image SSL is learning temporal dynamics rather than just appearance. What architectural or training modification specifically encourages learning temporal reasoning?",
      options: [
        "Using 3D convolutional kernels instead of 2D, which automatically learn temporal features",
        "Designing temporal masking strategies that mask entire time segments (temporal tube masking) rather than random patches, forcing the model to infer motion and temporal evolution",
        "Increasing the frame rate of the video to provide more temporal signal",
        "Pre-training on videos with subtitles to provide temporal language supervision",
      ],
      correctAnswer: 1,
      explanation:
        "Random patch masking can be solved by spatial interpolation without understanding temporal dynamics. Temporal tube masking (masking the same spatial location across all time steps) forces the model to infer temporal evolution from surrounding spatial context, encouraging temporal reasoning.",
      hints: [
        "If a spatial region is masked in all frames, the model can\'t just copy from adjacent spatial positions - it must understand motion.",
        "Think about what would happen if you masked the same region across time: the model must infer its trajectory.",
      ],
    },
  ],

  "ssl-multimodal": [
    {
      id: "q-ssl-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "CLIP (Contrastive Language-Image Pre-Training) trains by contrasting:",
      options: [
        "Two different image augmentations of the same image",
        "Image embeddings and their paired text caption embeddings as positive pairs, and all other image-text cross-pairs in the batch as negatives",
        "Image embeddings with audio embeddings from the same video",
        "Text embeddings from the same document at different positions",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP trains an image encoder and text encoder jointly with a contrastive loss: each (image, caption) pair is positive; all other cross-modal combinations in the batch are negatives. This aligns image and text into a shared embedding space.",
      hints: [
        "CLIP uses naturally paired data (images with their captions) - no human labels needed.",
        "Positive = same image-text pair; negative = any other combination in the batch.",
      ],
    },
    {
      id: "q-ssl-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CLIP enables zero-shot image classification by encoding class name text prompts and finding the class whose text embedding is most similar to the image embedding.",
      correctAnswer: "True",
      explanation:
        'At inference, CLIP encodes candidate class names (e.g., "a photo of a dog") as text embeddings and computes their similarity to the image embedding. The highest-similarity class is selected - enabling zero-shot classification without any labelled images.',
      hints: [
        "CLIP aligns text and image spaces - so a text description of a class and an image of that class should be nearby.",
        "Zero-shot: no images of the class were seen during training - just the text description at test time.",
      ],
    },
    {
      id: "q-ssl-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ImageBind learns a single embedding space for six modalities (image, text, audio, depth, thermal, IMU) without having paired data for all modality combinations. How is this achieved?",
      options: [
        "By training a separate contrastive model for each pair of modalities and averaging their embeddings",
        'By using image as a central "binding" modality - pairing each other modality with images (which are naturally paired with text, audio, depth, etc.) and aligning all modalities to the shared image space',
        "By using a generative model to synthesise the missing modality in each pair",
        "By using a different SSL objective for each modality",
      ],
      correctAnswer: 1,
      explanation:
        'ImageBind uses image as a "binding" pivot: images naturally co-occur with text (captions), audio (videos), depth (RGBD cameras), and thermal/IMU (ego-centric cameras). By aligning each modality to the image space, all modalities become mutually aligned without needing direct cross-modality pairs.',
      hints: [
        "Images are uniquely versatile: they co-occur naturally with many other modalities in existing datasets.",
        "If A aligns with B and A aligns with C, then B and C are implicitly aligned through A.",
      ],
    },
  ],

  "ssl-rl": [
    {
      id: "q-ssl-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why is self-supervised learning useful for reinforcement learning agents?",
      options: [
        "SSL provides additional reward signals that help the agent explore more efficiently",
        "SSL can learn rich state representations from raw observations without reward signal, improving sample efficiency for downstream RL policy learning",
        "SSL replaces the policy gradient, making RL training more stable",
        "SSL eliminates the need for an environment simulator in model-based RL",
      ],
      correctAnswer: 1,
      explanation:
        "RL agents often receive sparse rewards and must learn from high-dimensional raw observations (pixels). SSL pre-training or auxiliary SSL objectives learn compact, semantically rich state representations that accelerate RL training.",
      hints: [
        "Rewards are sparse in RL - can you learn useful state representations from observations alone?",
        "Better state representations reduce the amount of interaction data needed to learn a good policy.",
      ],
    },
    {
      id: "q-ssl-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CURL (Contrastive Unsupervised Representations for Reinforcement Learning) applies contrastive SSL to consecutive frames from an RL agent\'s trajectory as positive pairs.",
      correctAnswer: "True",
      explanation:
        "CURL treats random crops of the same observation frame as positive pairs (analogous to SimCLR) and applies MoCo-style contrastive learning as an auxiliary loss alongside the RL objective, improving sample efficiency on visual RL benchmarks.",
      hints: [
        "Two crops of the same observation share the same underlying state - a natural positive pair.",
        "CURL is an auxiliary SSL objective added on top of an RL algorithm, not a replacement.",
      ],
    },
    {
      id: "q-ssl-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SPR (Self-Predictive Representations) improves RL sample efficiency by training the agent to predict what in future steps?",
      options: [
        "The raw pixel observations of future states from the current state and action sequence",
        "The latent representations of future states in the encoder\'s embedding space, given the current latent state and a sequence of actions",
        "The reward values for the next K time steps as a multi-step return prediction",
        "The policy\'s action probabilities for the next K states",
      ],
      correctAnswer: 1,
      explanation:
        "SPR trains a transition model to predict future latent representations (not raw pixels) in the encoder\'s embedding space. Predicting in latent space is easier and more semantically focused than pixel prediction, encouraging a representation that captures task-relevant dynamics.",
      hints: [
        "Predicting raw pixels requires capturing irrelevant visual detail; predicting in latent space focuses on what matters for control.",
        "A transition model in latent space: z_{t+k} = f(z_t, a_t, ..., a_{t+k-1}).",
      ],
    },
  ],

  "ssl-foundation": [
    {
      id: "q-ssl-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SSL is considered the foundation of foundation models because:",
      options: [
        "Foundation models are always trained on synthetic data generated by SSL methods",
        "The massive scale of pre-training data for foundation models (text, images, multimodal) can only be leveraged without labels using SSL objectives",
        "SSL provides the fine-tuning objective used after a model is deployed",
        "Foundation models use SSL only for evaluation, not for pre-training",
      ],
      correctAnswer: 1,
      explanation:
        "Foundation models (GPT, BERT, CLIP, Stable Diffusion) are pre-trained on internet-scale data. The only feasible way to train on such data without labels is through SSL objectives (causal LM, masked LM, contrastive learning) - making SSL the enabling technology for foundation models.",
      hints: [
        "Internet-scale data cannot be labelled by humans - what training objective allows learning from it?",
        "Every major foundation model (GPT, BERT, CLIP) uses an SSL pre-training objective.",
      ],
    },
    {
      id: "q-ssl-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The emergent capabilities of large foundation models (e.g., in-context learning, chain-of-thought reasoning) are generally attributed to SSL pre-training scale rather than to the specific SSL objective used.",
      correctAnswer: "True",
      explanation:
        "Emergent capabilities appear at large scales regardless of the specific SSL variant. Scale - model size, data quantity, and compute - is the primary driver, with the SSL objective (causal LM for GPT, masked LM for BERT) shaping what capabilities emerge rather than causing emergence per se.",
      hints: [
        "Transfer learning helps when source and target tasks share relevant features.",
        "Molecular property prediction is diverse: some properties depend on global structure, others on specific local chemistry.",
      ],
    },
    {
      id: 'q-ssl-kp30-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key open question in SSL research is whether SSL pre-training creates a "task-agnostic" representation or an implicit ensemble of task-specific features. Evidence from probing studies suggests ___.',
      options: [
        'SSL representations are completely task-agnostic: all downstream tasks extract identical features from the same layers',
        'Different downstream tasks activate different subsets of SSL-learned features, with earlier layers encoding lower-level structure and later layers encoding more abstract semantics-suggesting SSL learns a rich hierarchical multi-task representation rather than a single universal one',
        'SSL representations are task-specific from the first layer and cannot transfer across tasks',
        'Probing studies show SSL representations have no internal structure and downstream accuracy depends entirely on the linear probe\'s capacity',
      ],
      correctAnswer: 1,
      explanation: 'Linear probing experiments (Zeiler & Fergus, Tenney et al.) show that SSL representations have rich internal structure: earlier Transformer layers encode syntactic features (POS tags, parse depth), middle layers encode semantic roles, and later layers encode task-specific information. This hierarchical structure makes SSL representations useful across many tasks simultaneously-the hallmark of a strong general-purpose representation.',
      hints: [
        'Linear probing: train a linear classifier on frozen layer-N features-measures what information is explicitly encoded at that layer.',
        'If all tasks use layer 12, the representation is generic; if different tasks prefer different layers, it is multi-scale.',
      ],
    },
  ],
};

registerQuestions(questions);

const additionalSslQuestions: Record<string, Question[]> = {
  "dino-dinov2": [
    {
      id: "q-ssl-kp31-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DINO (Self-DIstillation with NO labels) uses a teacher-student framework. What prevents the student from collapsing to trivial constant representations?",
      options: [
        "A contrastive loss that explicitly pushes different-crop embeddings apart",
        "Centering (subtracting a running mean from teacher outputs) and sharpening (low temperature softmax on teacher) together prevent collapse without negative pairs",
        "A stop-gradient on the student branch, so gradients only flow through the teacher",
        "L2 normalization applied to both teacher and student outputs before computing the cross-entropy loss",
      ],
      correctAnswer: 1,
      explanation:
        "DINO avoids collapse through two mechanisms: (1) Centering: subtract an exponential moving average of teacher outputs from each teacher output, preventing any single dimension from dominating; (2) Sharpening: apply a low-temperature softmax to teacher outputs, making the distribution peaky. The student uses a higher temperature. Together these prevent mode collapse without requiring negative pairs or stop-gradient on the teacher (though the teacher is an EMA of the student).",
      hints: [
        "Collapse = all inputs map to the same embedding. Centering prevents one-dim domination; sharpening makes targets informative.",
        "Compare to BYOL which uses stop-gradient; DINO uses centering+sharpening as the anti-collapse mechanism.",
      ],
    },
    {
      id: "q-ssl-kp31-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "DINOv2 introduced several improvements over DINO. Which combination of changes was most responsible for its superior performance?",
      options: [
        "Larger ViT backbone only - DINOv2 uses ViT-G/14 while DINO used ViT-B/8",
        "Curated high-quality training data (LVD-142M), combined training with DINO + iBOT (masked image modeling) losses, and Sinkhorn-Knopp regularization for assignment - scale and data quality drove most gains",
        "Replacing the cross-entropy loss with a cosine similarity loss and using a momentum encoder with 0.9999 EMA coefficient",
        "Adding a language decoder branch that aligns vision features with text using CLIP-style contrastive training",
      ],
      correctAnswer: 1,
      explanation:
        "Oquab et al. (2024) DINOv2 key improvements: (1) LVD-142M - a curated dataset of 142M images with deduplication and quality filtering, removing web noise; (2) Combined loss: DINO global crops + iBOT masked-patch prediction, providing both global semantic and local spatial learning signals; (3) Sinkhorn-Knopp regularization for more uniform cluster assignments; (4) ViT-g at 14px patch size. Data curation was identified as the single most impactful factor.",
      hints: [
        "DINOv2 did not add any text supervision - it remains purely vision-based.",
        "The key insight: SSL model quality depends heavily on data quality, not just architecture or loss design.",
      ],
    },
    {
      id: "q-ssl-kp31-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "DINO\'s teacher network is trained using backpropagation, with gradients flowing from the cross-entropy loss between student and teacher outputs.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "The DINO teacher is updated via Exponential Moving Average (EMA) of the student weights - no gradients flow to the teacher. Only the student is updated via backpropagation. This momentum teacher provides more stable targets than a network that updates every step, analogous to the momentum encoder in MoCo.",
      hints: [
        "EMA teacher = slowly changing target network. This is the same principle as in BYOL and MoCo.",
        "If gradients flowed to the teacher, it would immediately adjust to match the student, losing the stable-target benefit.",
      ],
    },
  ],
  "clip-and-multimodal-ssl": [
    {
      id: "q-ssl-kp32-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "CLIP (Contrastive Language-Image Pre-Training) is trained on 400M image-text pairs. What is its training objective?",
      options: [
        "Minimize cross-entropy between predicted image captions and ground-truth captions (generation)",
        "Maximize cosine similarity between matched image-text pairs and minimize it between all mismatched pairs in the batch using a symmetric InfoNCE loss",
        "Predict whether an image-text pair is from the same webpage (binary classification)",
        "Minimize the L2 distance between image and text embeddings in a shared CLIP space",
      ],
      correctAnswer: 1,
      explanation:
        'CLIP uses symmetric InfoNCE (NT-Xent): for a batch of N image-text pairs, compute an N\\timesN similarity matrix. The diagonal entries are the true (matched) pairs. The loss maximizes diagonal similarities and minimizes off-diagonal ones - simultaneously from both the image\\totext and text\\toimage perspectives. This dual symmetry is the "symmetric" part. No generation, no binary classification - pure contrastive alignment.',
      hints: [
        "The N\\timesN matrix approach means every image is compared against all N texts (and vice versa) in the batch.",
        "InfoNCE = noise-contrastive estimation. With N=32768 (CLIP uses large batches), each sample has N-1 negatives.",
      ],
    },
    {
      id: "q-ssl-kp32-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What enables CLIP to perform zero-shot image classification without any task-specific training?",
      options: [
        "CLIP\'s image encoder is pre-trained on ImageNet-21K, which covers all classification categories",
        'CLIP encodes class names as text ("a photo of a {class}") and computes similarity to image embeddings - the most similar class text is predicted; no gradient updates needed',
        "CLIP uses a meta-learning objective that explicitly trains for few-shot generalization during pre-training",
        "CLIP applies a linear probe on its image features that is trained on a small held-out set of labeled examples",
      ],
      correctAnswer: 1,
      explanation:
        'Zero-shot CLIP: for a classification task with K classes, format each class as "a photo of a [class]" and encode all K texts. Encode the query image. Predict the class whose text embedding has highest cosine similarity to the image embedding. No training on the target task is needed - the image-text alignment learned during pre-training does the work. Prompt engineering (e.g., "a photo of a [class], a type of animal") further improves accuracy.',
      hints: [
        "The class names become text queries; the image is matched against them.",
        "This works because CLIP learned that images and their textual descriptions should have similar embeddings.",
      ],
    },
    {
      id: "q-ssl-kp32-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "CLIP performs comparably to supervised ResNet-50 on ImageNet zero-shot classification without seeing any ImageNet training images.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation:
        'Radford et al. (2021) showed that zero-shot CLIP (ViT-L/14@336px) achieves ~76% top-1 accuracy on ImageNet, matching the original ResNet-50 trained with full supervision. This is remarkable: no ImageNet labels, no fine-tuning - just the text "a photo of a [class]." Larger CLIP models exceed this, and CLIP is generally much more robust than supervised models to distribution shift.',
      hints: [
        "Zero-shot CLIP = 76.2% top-1 on ImageNet; supervised ResNet-50 = 76.1%. Near parity.",
        "The key is that ImageNet classes are natural language concepts that CLIP learned from web text.",
      ],
    },
  ],
  "masked-image-modeling": [
    {
      id: "q-ssl-kp33-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Masked Autoencoders (MAE, He et al., 2022) use an asymmetric encoder-decoder design. Why is the encoder applied only to visible (unmasked) patches?",
      options: [
        "To prevent the encoder from seeing masked tokens and thus learning their content from context",
        "To reduce encoder compute: with 75% masking, the encoder processes only 25% of patches, making pre-training ~3\\times faster than full-image encoding while still learning rich representations",
        "Because the decoder needs the mask tokens as inputs, so the encoder cannot share them",
        "To enforce that the encoder learns global image statistics rather than local patch details",
      ],
      correctAnswer: 1,
      explanation:
        "MAE\'s asymmetric design is primarily a compute optimization. The encoder (large ViT) only processes the 25% visible patches, dramatically reducing its computational cost. The decoder (shallow transformer) then takes encoder outputs + learnable mask tokens and reconstructs all patches. This design is key to MAE\'s 3\\times training speedup and its ability to pre-train very large models (ViT-L, ViT-H) efficiently.",
      hints: [
        "75% masking + encoder on 25% visible = encoder sees 1/4 of patches \\to ~4\\times less encoder compute.",
        "The decoder handles the masked positions - keeping it lightweight enables efficient pretraining.",
      ],
    },
    {
      id: "q-ssl-kp33-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BEiT (BERT Pre-Training of Image Transformers) differs from MAE in its reconstruction target. What does BEiT predict for masked patches?",
      options: [
        "The raw pixel values of the masked patches (same as MAE)",
        "Discrete visual tokens from a pre-trained dVAE (DALL-E tokenizer), converting patch reconstruction into a classification problem over a visual vocabulary",
        "The CLIP embedding of the masked patch, aligning vision tokens with language-aligned representations",
        "The mean color histogram of the masked region",
      ],
      correctAnswer: 1,
      explanation:
        "BEiT (Bao et al., 2022) uses a two-stage approach: (1) tokenize all image patches into discrete visual tokens using DALL-E\'s dVAE; (2) mask patches and train a ViT to predict the discrete token IDs of masked patches (not pixel values). This makes MIM a classification task over a finite vocabulary of ~8192 visual tokens, analogous to BERT\'s masked language modeling. BEiT-v3 later extended this to a multimodal masked modeling framework.",
      hints: [
        "MAE predicts pixel values; BEiT predicts discrete visual token IDs.",
        "dVAE tokenization discretizes continuous image patches into a vocabulary - like WordPiece for images.",
      ],
    },
    {
      id: "q-ssl-kp33-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "MAE\'s pre-training objective of reconstructing raw pixel values for masked patches is suboptimal compared to reconstructing higher-level features (like CLIP embeddings), and pixel reconstruction has been shown to produce worse downstream representations than feature reconstruction targets.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "MAE (He et al.) showed that pixel reconstruction with 75% masking produces excellent representations, outperforming earlier methods with semantic targets on many benchmarks. While some methods (BEiT, data2vec) use semantic targets, pixel reconstruction with high masking ratio forces the model to learn semantic structure through the constraint of predicting masked regions from context - the target granularity matters less than the task difficulty. MAE is simpler and highly competitive.",
      hints: [
        "MAE achieves 87.8% top-1 on ImageNet with ViT-H - competitive with or better than semantic-target methods.",
        "High masking ratio (75%) is what makes pixel-level prediction non-trivial and forces semantic understanding.",
      ],
    },
  ],
  "imagebind-multimodal": [
    {
      id: "q-ssl-kp34-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ImageBind (Girdhar et al., 2023) learns a joint embedding space across 6 modalities. What is its key training insight that enables modalities without paired training data to align?",
      options: [
        "ImageBind trains all 6 modalities jointly using a single contrastive loss across all pairs simultaneously",
        'ImageBind uses images as a "binding" modality: each non-image modality is aligned to images using paired data, and since all modalities align to the same image space, they implicitly align to each other - enabling zero-shot cross-modal retrieval between modality pairs with no direct paired training',
        "ImageBind uses a graph neural network to propagate alignment signals between modalities through a shared hub",
        "ImageBind trains each modality pair independently and then stitches the spaces together with a learned linear mapping",
      ],
      correctAnswer: 1,
      explanation:
        'ImageBind\'s key insight: images naturally co-occur with many other modalities (text, audio, depth, thermal, IMU). Use images as the binding "hub": train each modality encoder to align with the image encoder using naturally paired data (e.g., video+audio, image+depth). Since all modalities share an image-aligned space, they transitively align to each other - enabling e.g. audio-text retrieval without any audio-text training pairs. This emergent alignment is the most important scientific contribution.',
      hints: [
        "If audio \\leftrightarrow image and text \\leftrightarrow image, then transitively audio \\leftrightarrow text - without ever training on audio-text pairs.",
        "Images are the universal pivot: they co-occur naturally with all other modalities in web data.",
      ],
    },
    {
      id: "q-ssl-kp34-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Which of the following tasks can ImageBind perform zero-shot, without any task-specific training, due to its joint embedding space?",
      options: [
        "Image super-resolution and denoising",
        "Audio-driven image generation and cross-modal retrieval between any pair of its 6 modalities (e.g., retrieving images from audio queries)",
        "Multi-lingual text translation across 100+ languages",
        "Video temporal action localization with frame-level supervision",
      ],
      correctAnswer: 1,
      explanation:
        "ImageBind\'s joint embedding enables zero-shot: any-to-any cross-modal retrieval (e.g., find images matching a sound), audio-driven image generation (by using audio embeddings in place of text embeddings in a text-conditioned diffusion model), and arithmetic in embedding space (audio + text = compositional queries). None of these require task-specific training - they emerge from the aligned embedding geometry.",
      hints: [
        "If audio and text live in the same space as image embeddings used for generation, you can generate images from audio.",
        "Embedding arithmetic: image of dog + audio of barking = retrieve images of barking dogs.",
      ],
    },
    {
      id: "q-ssl-kp34-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "ImageBind requires paired training data for every combination of its 6 modalities (e.g., audio-text pairs, audio-depth pairs, thermal-IMU pairs) to learn its joint embedding space.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation:
        "ImageBind only needs image-paired data for each modality: (image, audio), (image, text), (image, depth), (image, thermal), (image, IMU). The 15 pairwise combinations among 6 modalities are not needed. Alignment between non-image modalities is emergent - it happens because all modalities share the image-aligned embedding space. This is the key data efficiency advantage.",
      hints: [
        "6 modalities paired with 1 hub = 5 paired datasets needed, not C(6,2)=15.",
        "Transitivity of alignment does the rest.",
      ],
    },
  ],
  'ssl-for-video': [
    {
      id: 'q-ssl-kp35-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'VideoMAE pre-trains a Vision Transformer on video by masking and reconstructing patches. What masking ratio does VideoMAE use, and why is a much higher ratio needed than for image MAE?',
      options: [
        '25% masking - same as image MAE, since video patches contain the same amount of information per patch',
        '90-95% masking - video has high temporal redundancy between frames, so unmasked patches provide enough context to reconstruct masked ones even at extreme ratios; high masking is needed to prevent trivial copy-from-adjacent-frame solutions',
        '50% masking - a moderate ratio balances information availability with reconstruction difficulty',
        '10% masking - video is much harder than images so less information should be removed to avoid underfitting',
      ],
      correctAnswer: 1,
      explanation: 'VideoMAE (Tong et al., 2022) uses ~90% tube masking (the same spatial location is masked across all frames in a tube). High masking is necessary because consecutive video frames are nearly identical - at 25% masking, the model can trivially copy unmasked adjacent frames to reconstruct masked ones. Tube masking + 90% ratio forces the model to learn genuine motion and temporal dynamics rather than frame copying.',
      hints: [
        'Adjacent frames in 30fps video differ by <5% of pixels - masking is trivially recoverable without tube masking.',
        'Tube masking: mask the same (x,y) location across all T frames - the model cannot peek at adjacent frames for that location.',
      ],
    },
    {
      id: 'q-ssl-kp35-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'V-JEPA (Video Joint Embedding Predictive Architecture) predicts in a latent feature space rather than pixel space, avoiding the need to reconstruct fine-grained visual details that are irrelevant to high-level video understanding.',
      correctAnswer: 'True',
      explanation: 'V-JEPA (Assran et al., 2024) predicts representations of masked video regions in the embedding space of a target encoder (EMA of the context encoder), not in pixel space. This focuses the model on semantically meaningful features (motion, object identity) rather than texture and high-frequency pixel details. Experiments show V-JEPA learns better action recognition features with less compute than pixel-reconstruction methods.',
      hints: [
        'Pixel reconstruction: model must predict exact RGB values - wastes capacity on irrelevant texture details.',
        'Latent prediction: model must predict abstract features - forces semantic understanding without texture memorisation.',
      ],
    },
    {
      id: 'q-ssl-kp35-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Contrastive video SSL methods like CVRL and MoCo-v3 on video create positive pairs by treating different temporal clips from the same video as views. What is the main challenge this creates compared to image contrastive SSL?',
      options: [
        'Video clips are too large to fit in GPU memory, making batched contrastive training impossible',
        'Temporal clips from the same video may show very different content (scene cuts, activity changes), creating false positive pairs that push semantically dissimilar representations together; temporal proximity or scene-boundary detection must be used to ensure positive pairs are actually semantically similar',
        'Contrastive video SSL always requires optical flow as an additional input modality',
        'The InfoNCE loss cannot be computed over video features because they are sequence-valued rather than vector-valued',
      ],
      correctAnswer: 1,
      explanation: 'A 2-minute video may contain a scene cut at 1:00; clips from 0:55 and 1:05 are from different scenes and should not be a positive pair. Naive temporal sampling creates false positives. Solutions: (1) use shot-boundary detectors to sample only within a single shot; (2) use temporal proximity with small windows (clips within 1 second); (3) use cluster-based positive mining rather than temporal proximity.',
      hints: [
        'Image SSL: two crops of the same image are always similar. Video SSL: two clips of the same video may not be.',
        'Shot boundary: a hard cut in a film makes adjacent clips entirely unrelated - treating them as positives hurts.',
      ],
    },
  ],
  "ssl-nlp": [
    {
      id: "q-ssl-kp36-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "BERT uses Masked Language Modeling (MLM) and Next Sentence Prediction (NSP) for pre-training. RoBERTa (Liu et al., 2019) found that one of these was harmful and removed it. Which one, and why?",
      options: [
        "MLM was removed because it causes the model to over-rely on bidirectional context, hurting generalization",
        "NSP was removed because it is too easy (models learn to use topic coherence heuristics) and actually hurts downstream performance by training on noisy cross-document sentence pairs",
        "NSP was replaced with a harder Sentence Order Prediction (SOP) task; MLM was unchanged",
        "Neither was removed; RoBERTa\'s gains came from larger batches and more data only",
      ],
      correctAnswer: 1,
      explanation:
        "RoBERTa found NSP harmful: NSP pairs consist of a real consecutive sentence (positive) and a random sentence from another document (negative). Models solve NSP by detecting topic shift (different document = different topic) rather than learning sentence coherence. This makes NSP too easy and introduces noise. Removing NSP and training longer with more data improved all GLUE benchmarks. ALBERT replaced NSP with the harder Sentence Order Prediction (SOP) task instead.",
      hints: [
        "NSP negative examples = random sentences from different documents. Models just detect topic change.",
        "RoBERTa: remove NSP, train longer, use dynamic masking \\to state-of-the-art at the time.",
      ],
    },
    {
      id: "q-ssl-kp36-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "ELECTRA (Clark et al., 2020) uses a generator-discriminator architecture for SSL pre-training. What is ELECTRA\'s training objective?",
      options: [
        "Generator: generates fake tokens; Discriminator: produces realistic tokens to fool the generator (standard GAN)",
        'Generator (small MLM model): replaces masked tokens with plausible alternatives; Discriminator (large model): classifies every token as "original" or "replaced" - making all tokens training signal vs. only masked tokens in BERT',
        "Generator: autoregressively generates the next token; Discriminator: verifies semantic consistency of the generated sequence",
        "Generator: produces paraphrases; Discriminator: classifies whether two sentences are paraphrases",
      ],
      correctAnswer: 1,
      explanation:
        "ELECTRA\'s key insight: BERT only computes loss on 15% masked tokens (the rest are wasted signal). ELECTRA trains a small MLM generator to replace masked tokens with plausible alternatives, then trains a large discriminator to detect which tokens were replaced vs. original - at every single token position. This provides 100% token coverage for the discriminator\'s loss, making ELECTRA ~4\\times more compute-efficient than BERT for the same downstream performance.",
      hints: [
        "BERT: 15% of tokens get a gradient. ELECTRA: 100% of tokens get a gradient.",
        "The generator makes the task hard by producing plausible (not obviously wrong) replacements.",
      ],
    },
    {
      id: "q-ssl-kp36-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "GPT-style causal language modeling (predicting the next token) is a form of self-supervised learning because the supervision signal (the next token) is derived from the data itself without human annotation.",
      correctAnswer: "True",
      explanation:
        "Causal language modeling (CLM) is self-supervised: the input text provides both input (tokens 1..t) and label (token t+1) without any human labels. This is why GPT-series models can be pre-trained on vast amounts of raw internet text. Self-supervised learning is the broader category encompassing both BERT-style MLM and GPT-style CLM - both derive training signal from the data structure itself.",
      hints: [
        "Self-supervised = labels come from the data, not from human annotators.",
        "Next-token prediction = the corpus is its own supervision signal.",
      ],
    },
  ],
  "contrastive-ssl-methods": [
    {
      id: "q-ssl-kp37-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SimCLR (Chen et al., 2020) identified several components critical for contrastive learning performance. Which combination did it find most important?",
      options: [
        "Momentum encoder + memory bank + large backbone",
        "Data augmentation composition (especially random crop + color jitter + grayscale) + projection head (MLP before loss) + large batch size + normalized temperature-scaled cross-entropy (NT-Xent)",
        "Stop-gradient on one branch + asymmetric network architecture + cosine similarity loss",
        "Online cluster assignment + Sinkhorn normalization + multi-crop strategy",
      ],
      correctAnswer: 1,
      explanation:
        "SimCLR\'s ablations showed: (1) Augmentation composition is critical - random cropping + color jittering + grayscale together are essential; (2) A non-linear projection head (2-layer MLP) before the NT-Xent loss dramatically improves representation quality (vs. computing loss on raw encoder output); (3) Larger batch sizes provide more negatives, improving contrastive quality; (4) NT-Xent loss with temperature scaling is better than standard cross-entropy. The projection head insight was particularly surprising and influential.",
      hints: [
        "The projection head trick: representations from the layer before the projection head are better for transfer than from the projection head itself.",
        "Why? The projection head may discard information needed for downstream tasks but not the contrastive objective.",
      ],
    },
    {
      id: "q-ssl-kp37-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Barlow Twins (Zbontar et al., 2021) avoids collapse through a redundancy-reduction objective inspired by neuroscience. What is its loss function?",
      options: [
        "Minimize cosine similarity between all pairs of batch embeddings (force all embeddings apart)",
        "Make the cross-correlation matrix of the two augmented-view embeddings as close to the identity matrix as possible: diagonal terms (invariance) \\to 1, off-diagonal terms (redundancy) \\to 0",
        "Maximize mutual information between the two view embeddings using a MINE estimator",
        "Minimize the KL divergence between the softmax distributions of the two view embeddings",
      ],
      correctAnswer: 1,
      explanation:
        "Barlow Twins computes the cross-correlation matrix $C$ where $C_{ij} = \\text{correlation}(z_i^{(\\text{view }1)}, z_j^{(\\text{view }2)})$ across the batch. The loss is: \\[ \\mathcal{L} = \\sum_i (1 - C_{ii})^2 + \\lambda \\sum_{i \\neq j} C_{ij}^2. \\] First term: diagonal entries should be 1 (same information in both views = invariance). Second term: off-diagonal should be 0 (different dimensions should be uncorrelated = redundancy reduction). This is inspired by Barlow's efficient coding hypothesis in neuroscience.",
      hints: [
        "Identity cross-correlation matrix = each feature dimension is invariant to augmentation AND uncorrelated with other dimensions.",
        "No negative pairs needed - the off-diagonal penalty prevents collapse by decorrelating dimensions.",
      ],
    },
    {
      id: "q-ssl-kp37-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "BYOL (Bootstrap Your Own Latent) requires negative pairs or explicit decorrelation objectives to prevent representational collapse, similar to SimCLR.",
      correctAnswer: "False",
      explanation:
        "BYOL uses no negative pairs, no memory bank, no explicit decorrelation. It uses only an online and a target (EMA) network with a stop-gradient on the target branch. Theoretical understanding of why BYOL does not collapse has been debated - key factors include the stop-gradient preventing the target from being directly optimized, the BatchNorm in the predictor creating implicit negative samples through batch statistics, and the EMA providing slowly-moving targets.",
      hints: [
        "BYOL was shocking when published: how can a network not collapse without negatives?",
        "Stop-gradient + EMA target + BatchNorm are the key anti-collapse mechanisms.",
      ],
    },
  ],
  "ssl-graph-molecules": [
    {
      id: "q-ssl-kp38-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Graph-level SSL for molecular property prediction uses strategies analogous to image augmentation. Which augmentation strategy is most appropriate for molecular graphs?",
      options: [
        "Random pixel dropout - remove random atoms with probability p and predict their properties",
        "Subgraph masking (randomly mask atom/bond features), edge perturbation (add/remove bonds), and node dropping - carefully chosen to preserve chemical validity and meaningful substructures",
        "Random rotation and reflection of the 3D molecular conformation, treating the molecule as a point cloud",
        "Random SMILES string corruption - randomly swap characters in the SMILES representation",
      ],
      correctAnswer: 1,
      explanation:
        "Molecular graph augmentation must respect chemical constraints. Common strategies: (1) node masking - mask atom types/features (analogous to image patch masking); (2) edge perturbation - add/remove bonds within chemical plausibility; (3) subgraph masking - hide functional groups. These are used in methods like GraphMAE, GROVER, and GNN pre-training frameworks. Random SMILES corruption can create invalid molecules; 3D rotation is data augmentation for 3D models, not the primary SSL strategy for graph-level tasks.",
      hints: [
        "Unlike images, molecular graphs have chemical validity constraints - augmentation cannot create invalid chemistry.",
        "Functional group masking is particularly powerful: these substructures are the key determinants of molecular properties.",
      ],
    },
    {
      id: "q-ssl-kp38-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GNNs trained with self-supervised pre-training on large molecular datasets followed by fine-tuning often outperform GNNs trained from scratch on small labeled datasets. Which SSL objective is most commonly used in molecular GNN pre-training?",
      options: [
        "Predicting the full 3D conformation of a molecule from its 2D graph (generative)",
        "Context prediction: predict the neighborhood subgraph of a node given the node\'s embedding, or attribute masking: predict masked node/edge attributes from graph context",
        "Contrastive learning between random graph augmentations of the same molecule (GraphCL)",
        "Both attribute masking and context prediction are common; GraphCL (contrastive) is also widely used",
      ],
      correctAnswer: 3,
      explanation:
        'Hu et al. (2020) "Strategies for Pre-training Graph Neural Networks" established attribute masking and context prediction as foundational GNN SSL methods. GraphCL (You et al., 2020) introduced graph-level contrastive learning with chemical augmentations. GROVER (Rong et al., 2020) combined contextual self-supervised tasks at both node/graph levels. Multiple SSL objectives have proven effective; the field has not converged on a single dominant method as BERT did for NLP.',
      hints: [
        "Attribute masking = mask node features; context prediction = predict subgraph context from node embedding.",
        "GraphCL = contrastive between augmented molecular graph views. All three have shown strong results.",
      ],
    },
    {
      id: "q-ssl-kp38-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Self-supervised pre-training on large unlabeled molecular datasets consistently helps molecular property prediction, even when the pre-training and fine-tuning target properties are chemically unrelated.",
      correctAnswer: "False",
      explanation:
        "GNN pre-training benefits are task-dependent. Hu et al. (2020) found that pre-training helps for some tasks (especially those needing structural/chemical context) but can hurt for others. The benefit is largest when pre-training data distribution is similar to fine-tuning targets, and smallest when properties are highly specific and unrelated to general structural patterns. Negative transfer - pre-training hurting fine-tuning - has been documented in molecular GNN pre-training.",
      hints: [
        "Transfer learning helps when source and target tasks share relevant features.",
        "Molecular property prediction is diverse: some properties depend on global structure, others on specific local chemistry.",
      ],
    },
  ],
  "ssl-audio-speech": [
    {
      id: "q-ssl-kp39-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "wav2vec 2.0 (Baevski et al., 2020) uses a contrastive objective for speech SSL. What is the key element that makes this work for continuous audio?",
      options: [
        "Treating speech as a sequence of mel-spectrogram frames and applying a standard contrastive loss between augmented versions",
        "Quantizing continuous audio representations into discrete speech units (using product quantization with Gumbel-softmax), then training a transformer to identify the true quantized unit for a masked position among distractors",
        "Predicting future audio frames autoregressively, like CPC (Contrastive Predictive Coding)",
        "Using a two-stream architecture where one stream processes clean audio and the other processes noisy audio, with contrastive alignment",
      ],
      correctAnswer: 1,
      explanation:
        "wav2vec 2.0 quantizes CNN-encoded speech features into discrete tokens using learnable codebooks with Gumbel-softmax (end-to-end differentiable). The transformer then learns to identify the correct quantized token for a masked time step among K distractors drawn from the same sequence. This turns continuous speech SSL into a discrete token identification task - more tractable than raw feature regression. The quantizer learns speech-relevant discrete units (often corresponding to phonemes) as a byproduct.",
      hints: [
        "Continuous audio \\to discrete tokens via quantization \\to contrastive identification of correct token.",
        "Gumbel-softmax makes the discrete quantization differentiable for end-to-end training.",
      ],
    },
    {
      id: "q-ssl-kp39-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "HuBERT (Hidden-Unit BERT, Hsu et al., 2021) improves over wav2vec 2.0 by using an offline clustering step. What is HuBERT\'s training procedure?",
      options: [
        "HuBERT trains an online quantizer jointly with the transformer, like wav2vec 2.0 but with a larger codebook",
        "HuBERT uses k-means clustering on MFCC features (or previous HuBERT representations) offline to generate pseudo-labels, then trains a BERT-like transformer to predict these discrete cluster labels for masked audio frames",
        "HuBERT uses a teacher network (EMA of student) to generate soft targets for masked audio frames, like DINO for speech",
        "HuBERT trains on (audio, transcription) pairs using a CTC loss but treats the transcription as a self-supervised signal derived from ASR n-best lists",
      ],
      correctAnswer: 1,
      explanation:
        "HuBERT procedure: (1) Cluster MFCC features into K=100 clusters using k-means (iteration 1) or cluster previous HuBERT representations (iteration 2+) to get frame-level pseudo-labels; (2) Train a BERT-style transformer with masked prediction on these discrete pseudo-labels. The key insight: even noisy cluster labels contain enough phonetic signal to drive useful SSL. Iterating (re-cluster with the trained model, retrain) progressively refines the pseudo-labels, analogous to EM.",
      hints: [
        "HuBERT = BERT for audio with k-means pseudo-labels instead of human transcriptions.",
        "The iterative refinement (k-means \\to train \\to k-means on new representations \\to retrain) is like EM.",
      ],
    },
    {
      id: "q-ssl-kp39-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "SSL-pretrained speech models like wav2vec 2.0 can achieve near-human performance on automatic speech recognition with only 10 minutes of labeled data, compared to hundreds of hours needed by supervised baselines.",
      correctAnswer: "True",
      explanation:
        "Baevski et al. (2020) showed wav2vec 2.0 fine-tuned on 10 minutes of labeled LibriSpeech data achieves WER comparable to previous best results using 100 hours of labeled data. With 1 hour of labels, it surpasses the previous best trained on 960 hours. This dramatic label efficiency improvement is the defining practical advantage of SSL for speech: high-quality ASR in low-resource languages without large transcribed speech corpora.",
      hints: [
        "10 minutes vs. 960 hours: SSL pre-training provides ~6000\\times labeled data efficiency.",
        "This enables ASR for languages where transcribed speech is scarce.",
      ],
    },
  ],
  "ssl-evaluation": [
    {
      id: "q-ssl-kp40-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Linear probing is a standard SSL evaluation protocol. What does it measure, and why is it sometimes a poor proxy for fine-tuning performance?",
      options: [
        "Linear probing measures whether a frozen backbone\'s representations are linearly separable for a downstream task; it can be a poor proxy because some SSL methods learn nonlinear representations that are excellent for fine-tuning but not linearly separable",
        "Linear probing measures training data efficiency; it is a poor proxy because it uses only 1% of labeled data while fine-tuning uses all labels",
        "Linear probing measures representation dimensionality; methods with higher-dimensional representations always score better",
        "Linear probing and fine-tuning always agree - if linear probing is high, fine-tuning will also be high",
      ],
      correctAnswer: 0,
      explanation:
        'Linear probing trains only a linear classifier on frozen SSL features. It is a proxy for "how well-structured are the representations?" However, fine-tuning (updating all weights) can overcome non-linear arrangement of features. Some methods (e.g., MAE) have relatively modest linear probing accuracy but excellent fine-tuning accuracy because their representations are rich but not linearly organized. MoCo v3 showed this gap clearly. Evaluating both linear probe and fine-tuning gives a fuller picture.',
      hints: [
        "Linear probe: frozen features, only train a linear head. Fine-tuning: update all weights.",
        "MAE linear probe is lower than SimCLR/DINO, but MAE fine-tuning is often higher.",
      ],
    },
    {
      id: "q-ssl-kp40-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the "uniformity-alignment" framework for evaluating SSL representations (Wang & Isola, 2020)?',
      options: [
        "Evaluate alignment as how close same-class representations are, and uniformity as how spread representations are across the unit hypersphere - good SSL should maximize both",
        "Evaluate alignment as how similar representations are to human judgments, and uniformity as the distribution of cluster sizes",
        "Evaluate alignment as cosine similarity between augmented pairs, and uniformity as the condition number of the representation covariance matrix",
        "Evaluate alignment and uniformity of gradient norms during SSL training to detect collapse",
      ],
      correctAnswer: 0,
      explanation:
        "Wang & Isola (2020) decomposed contrastive learning quality into: (1) Alignment: positive pairs (augmentations of the same image) should have similar representations; (2) Uniformity: representations should be uniformly distributed on the unit hypersphere - high entropy, spread out. Both are desirable: alignment ensures augmentation invariance; uniformity ensures maximum information content (no collapse to a point or subspace). These metrics can be computed without downstream tasks and predict transfer performance.",
      hints: [
        "Alignment = similar inputs map nearby. Uniformity = all of embedding space is used, not just a cluster.",
        "Collapse = perfect alignment but zero uniformity (all images map to the same point).",
      ],
    },
    {
      id: "q-ssl-kp40-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "k-nearest neighbor (kNN) classification on frozen SSL features is a valid evaluation protocol that requires no training of any additional parameters beyond the SSL pre-training.",
      correctAnswer: "True",
      explanation:
        "kNN evaluation: extract features for all labeled training images using the frozen SSL backbone, then for each test image compute its embedding and find the k nearest training embeddings by cosine distance - the majority label among neighbors is the prediction. No parameters are trained. This is even simpler than linear probing and evaluates raw feature quality. DINO and DINOv2 report kNN accuracy as a primary evaluation metric. High kNN accuracy indicates that the embedding space has a natural neighborhood structure aligned with semantic labels.",
      hints: [
        "kNN requires no optimization - just feature extraction and distance computation.",
        "DINO ViT-S achieves 74.5% kNN on ImageNet, remarkable for a model trained with no labels.",
      ],
    },
  ],
};

Object.assign(questions, additionalSslQuestions);

const extraSsl: Record<string, Question[]> = {
  "infonce-theory": [
    {
      id: "q-ssl-kp41-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The InfoNCE loss (Oord et al., 2018) used in contrastive learning is formally a lower bound on which quantity?",
      options: [
        "The conditional entropy H(x | z) between input x and its representation z",
        "The mutual information I(x; c) between the input x and the context representation c",
        "The KL divergence DKL(p(z|x) || p(z)) between the posterior and prior in a VAE",
        "The cross-entropy between the model's predictions and the true data distribution",
      ],
      correctAnswer: 1,
      explanation: "InfoNCE provides a lower bound on mutual information I(x; c): L_InfoNCE <= I(x; c) - log(N), where N is the number of negative samples. The bound is achieved when the critic f(x, c) = p(x|c)/p(x) (the density ratio). Because log(N) grows with N, using more negatives tightens the bound and provides a more accurate estimate of MI. The connection to MI is the theoretical justification for why maximizing InfoNCE leads to representations that capture maximally informative features about the context.",
      hints: [
        "Mutual information I(x;c) = E[log(p(x,c)/p(x)p(c))] - it measures statistical dependence between x and c.",
        "More negatives N tightens the bound but also increases memory requirements (larger batch or memory bank).",
      ],
    },
    {
      id: "q-ssl-kp41-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Wang and Isola (2020) decompose contrastive learning objectives into two components: uniformity and alignment. Which statement correctly describes the trade-off?",
      options: [
        "Perfect uniformity maximizes downstream task accuracy; alignment only prevents trivial collapse",
        "Alignment encourages augmentation-invariant embeddings (pulling positive pairs together), while uniformity encourages embeddings to be spread across the hypersphere - maximizing both jointly produces optimal representations",
        "Uniformity encourages memorization of training examples; alignment encourages generalization to new classes",
        "High alignment implies high uniformity because pulling positives together automatically pushes negatives apart",
      ],
      correctAnswer: 1,
      explanation: "Wang and Isola (2020) show that a good contrastive loss balances: (1) alignment - loss = E[||f(x) - f(x')||^2] over positive pairs (x, x'), encouraging augmentation-invariant embeddings; (2) uniformity - loss = log E[exp(-2||f(x) - f(y)||^2)] over random pairs, encouraging a uniform distribution of embeddings on the unit hypersphere (maximizing entropy). A perfectly aligned model puts all positive pairs at the same point (zero diversity), violating uniformity. A perfectly uniform model distributes points maximally but ignores augmentation invariance. The contrastive objective naturally balances both.",
      hints: [
        "Think of alignment as 'pull same-class embeddings together' and uniformity as 'spread all embeddings evenly'.",
        "Collapse (all embeddings at one point) has perfect alignment but zero uniformity - the worst case.",
      ],
    },
    {
      id: "q-ssl-kp41-3",
      type: "true-false",
      difficulty: "medium",
      question: "Increasing the number of negative samples N in InfoNCE always improves the quality of the learned representations, with no diminishing returns.",
      correctAnswer: "False",
      explanation: "While more negatives tighten the MI lower bound and generally improve representation quality in practice, there are important caveats: (1) false negatives - with large N, some negatives may be semantically similar to the anchor (especially in large batches from datasets with many similar images), corrupting the gradient signal; (2) memory constraints - larger N requires larger batches or memory banks, which is computationally expensive; (3) diminishing returns - empirical gains plateau after sufficient negatives (e.g., MoCo uses 65536 but SimCLR plateaus around 4096-8192). The optimal N is dataset- and task-dependent.",
      hints: [
        "False negatives: when a 'negative' sample is actually semantically similar to the anchor, treating it as negative misleads the model.",
        "MoCo's memory bank and SimCLR's large batch are both solutions to the 'need many negatives' problem.",
      ],
    },
  ],
  "byol-collapse-prevention": [
    {
      id: "q-ssl-kp42-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "BYOL (Grill et al., 2020) prevents representational collapse without negative samples primarily through:",
      options: [
        "A reconstruction loss that forces the encoder to retain pixel-level information",
        "An asymmetric architecture where an online network predicts the output of a momentum (EMA) target network, and only the online network is updated by gradient",
        "A uniformity regularizer that explicitly penalizes low variance in the embedding space",
        "A VQ-VAE codebook that discretizes embeddings and prevents them from collapsing to a single code",
      ],
      correctAnswer: 1,
      explanation: "BYOL's collapse prevention relies on two asymmetries: (1) architecture asymmetry - only the online network has a predictor MLP on top; the target network has no predictor, so the online network must 'predict' a strictly simpler target; (2) gradient asymmetry - the target network is updated by exponential moving average (EMA) of online weights, not by gradient, acting as a slowly-moving target that is always slightly ahead of the online network. This combination creates a stable bootstrap target. The stop-gradient on the target network is critical: without it, both networks would collapse to the same constant.",
      hints: [
        "BYOL has two networks: online (trained by gradient) and target (updated by EMA). Only the online has a predictor.",
        "Stop-gradient through the target network prevents the trivial solution where both networks output the same constant.",
      ],
    },
    {
      id: "q-ssl-kp42-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The EMA (Exponential Moving Average) update for BYOL's target network is theta_t <- m * theta_t + (1-m) * theta_o. What happens as the momentum coefficient m approaches 1.0?",
      options: [
        "The target network becomes identical to the online network at each step, causing training to be equivalent to training with the same network twice",
        "The target network updates extremely slowly, becoming nearly static and providing a very stable but lagged prediction target",
        "The target network diverges because its weights grow without bound when m > 0.5",
        "The online network stops learning because its gradient signal from the target becomes zero",
      ],
      correctAnswer: 1,
      explanation: "As m -> 1, the EMA update theta_t <- m*theta_t + (1-m)*theta_o gives (1-m) -> 0 weight to the current online network, so the target changes extremely slowly. In the limit m=1, the target is completely frozen (never updated). This creates a very stable but stale target - the online network must predict outputs from an essentially fixed network. In practice, BYOL uses m that increases from 0.996 to 1.0 during training (cosine schedule), providing increasingly stable targets as representations mature.",
      hints: [
        "EMA with m=0.999 vs m=0.99: the first decays toward online weights 10x slower than the second.",
        "A completely frozen target (m=1) is just supervised learning with fixed pseudo-labels - too stable, no self-improvement.",
      ],
    },
    {
      id: "q-ssl-kp42-3",
      type: "true-false",
      difficulty: "hard",
      question: "SimSiam (Chen and He, 2021) demonstrates that the stop-gradient operation on the target branch (not the EMA mechanism itself) is the essential ingredient for preventing collapse in BYOL-style methods.",
      correctAnswer: "True",
      explanation: "SimSiam simplifies BYOL by removing the EMA target network entirely - both branches share the same encoder weights. The only difference is that one branch uses stop-gradient. Despite having no EMA and no negative samples, SimSiam achieves competitive performance. This demonstrates that stop-gradient, not EMA, is the critical collapse-prevention mechanism. The stop-gradient creates an implicit EM-like alternation: one branch provides fixed targets while the other optimizes, analogous to the E-step (fix cluster centers) and M-step (assign points) in k-means.",
      hints: [
        "SimSiam = Siamese network with stop-gradient. No EMA, no negatives, no separate target network weights.",
        "The EM interpretation: stop-gradient makes one branch a 'fixed' target (E-step), the other optimizes (M-step).",
      ],
    },
  ],
  "mae-masking": [
    {
      id: "q-ssl-kp43-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "MAE (He et al., 2021) uses a very high masking ratio (typically 75%) compared to BERT's 15%. The primary justification for this high ratio is:",
      options: [
        "Higher masking ratios reduce GPU memory usage by processing fewer tokens in the encoder",
        "Predicting 15% of patches from 85% visible context is too easy for vision - 75% masking creates a task hard enough to require genuine semantic understanding",
        "75% masking exactly matches the compression ratio of JPEG encoding, providing a natural information bottleneck",
        "Higher masking prevents the decoder from learning identity mappings by ensuring no patch is always visible",
      ],
      correctAnswer: 1,
      explanation: "He et al. extensively ablate masking ratio and show 75% is optimal for ImageNet. Image patches have high spatial redundancy - adjacent patches are strongly correlated. At 15% masking, the model can reconstruct masked patches using simple interpolation from nearby visible patches without learning deep semantics. At 75%, nearby context for most masked patches is also masked, forcing the model to reason about long-range semantic structure. This creates a sufficiently challenging task that drives learning of rich representations. BERT uses 15% because text tokens are individually informative and less redundant.",
      hints: [
        "Spatial redundancy in images: adjacent pixels are highly correlated. Text tokens are much less predictable from neighbors.",
        "At high masking ratios, the model cannot rely on local texture interpolation - it must understand global structure.",
      ],
    },
    {
      id: "q-ssl-kp43-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "MAE applies the ViT encoder only to the unmasked tokens. The key efficiency advantage of this design is:",
      options: [
        "The encoder processes only ~25% of the input tokens, reducing encoder compute by approximately 4x compared to encoding all tokens",
        "The decoder can be made much larger than the encoder because it only needs to process masked tokens",
        "Encoding only unmasked tokens prevents the encoder from learning to ignore mask tokens, improving representation quality",
        "The sparse attention pattern over unmasked tokens allows use of locality-sensitive hashing for O(n log n) attention",
      ],
      correctAnswer: 0,
      explanation: "With 75% masking and 196 total patches (14x14 for 224x224 images, 16x16 patches), the encoder processes only 49 tokens (~25%). Since transformer attention scales as O(n^2) in sequence length, this reduces encoder FLOPs by approximately 16x (not 4x, since it's quadratic) and reduces memory by 16x. A lightweight decoder then processes all tokens (masked positions receive learnable mask tokens) to reconstruct pixels. This asymmetric encoder-decoder design makes MAE pre-training 3x faster than processing all tokens with the full encoder.",
      hints: [
        "ViT attention complexity: O((num_tokens)^2 * d). With 1/4 the tokens, quadratic scaling gives 1/16 the compute.",
        "MAE's decoder is intentionally shallow (e.g., 8 transformer blocks vs. ViT-L's 24) since it is discarded after pre-training.",
      ],
    },
    {
      id: "q-ssl-kp43-3",
      type: "true-false",
      difficulty: "medium",
      question: "MAE reconstructs raw pixel values (normalized per patch) rather than predicting discrete visual tokens like BEiT. This choice results in lower linear probing accuracy but higher fine-tuning accuracy than token-based reconstruction targets.",
      correctAnswer: "True",
      explanation: "MAE predicts normalized pixel values (mean and std computed per patch) rather than discrete visual tokens (as in BEiT which predicts dVAE token ids). He et al. find that pixel reconstruction with MAE gives slightly lower linear probing accuracy (~73.5% for ViT-L with linear probe) compared to BEiT (~73.5% too) but substantially higher fine-tuning accuracy (MAE ViT-L reaches 85.9% vs BEiT's 85.2% on ImageNet). This is because the encoder learns richer, more holistic representations optimized for reconstruction rather than discrete tokenization, which transfers better when the full model is fine-tuned.",
      hints: [
        "Linear probing evaluates representation quality when the encoder is frozen; fine-tuning updates all parameters.",
        "Discrete token prediction (BEiT) is more like a classification task - it may learn more linearly separable features.",
      ],
    },
  ],
  "bert-pretraining-deep": [
    {
      id: "q-ssl-kp44-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "BERT's Masked Language Modeling (MLM) pre-training uses a specific token replacement strategy: 80% [MASK], 10% random word, 10% unchanged. Why are 10% of masked positions replaced with random words rather than always using [MASK]?",
      options: [
        "Random replacement adds noise that prevents the model from memorizing the training corpus",
        "If only [MASK] tokens were used, the model would learn to attend only to non-[MASK] positions at fine-tune time, causing a train-test mismatch since [MASK] never appears in downstream tasks",
        "Random words force the model to learn a uniform distribution over the vocabulary, preventing degenerate solutions",
        "10% random words match the natural token error rate in web-crawled pre-training text, making the task realistic",
      ],
      correctAnswer: 1,
      explanation: "BERT's 10% random replacement and 10% unchanged positions address the pre-training/fine-tuning discrepancy. If all masked positions received [MASK] tokens, the model would learn: 'attend to non-[MASK] tokens only, ignore [MASK] positions since they carry no information about the original token.' At fine-tuning, no [MASK] tokens appear, but the model has never been trained to extract useful representations from non-masked positions. The 10% random words force the model to maintain useful representations of every token, since any token might be a corrupted version of another. The 10% unchanged positions let the model learn to represent actual context tokens too.",
      hints: [
        "The key problem: if the model sees [MASK] only during pre-training, it learns [MASK] = 'something to predict'. At fine-tune time, there are no [MASK] tokens.",
        "By sometimes keeping the original word, the model must also learn good representations for non-corrupted tokens.",
      ],
    },
    {
      id: "q-ssl-kp44-2",
      type: "true-false",
      difficulty: "medium",
      question: "BERT's Next Sentence Prediction (NSP) objective has been shown by RoBERTa and ALBERT to be beneficial for all downstream NLP tasks and should be retained in all BERT-style pre-training.",
      correctAnswer: "False",
      explanation: "RoBERTa (Liu et al., 2019) ablated NSP and found it hurts downstream performance on most tasks - removing NSP and using longer contiguous text sequences (instead of sentence pairs) improves GLUE, SQuAD, and RACE scores. ALBERT (Lan et al., 2020) replaced NSP with Sentence Order Prediction (SOP), which predicts whether two consecutive sentences are in the correct order (harder than NSP). The hypothesis is that NSP is too easy (documents from different sources are trivially distinguishable by topic) and encourages the model to learn topic differentiation rather than coherence modeling.",
      hints: [
        "NSP negative pairs are sampled from different documents - the model learns to detect topic switches, not true discourse coherence.",
        "SOP (ALBERT) uses the same document for both positive and negative pairs, requiring genuine order understanding.",
      ],
    },
    {
      id: "q-ssl-kp44-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The RoBERTa paper (Liu et al., 2019) identified that BERT was significantly undertrained. Which combination of changes most improved performance over BERT-base?",
      options: [
        "Larger vocabulary, bidirectional attention, and layer normalization before each sublayer",
        "Training longer with larger batches, removing NSP, using dynamic masking, and training on more data with longer sequences",
        "Replacing WordPiece tokenization with Byte-Pair Encoding and adding a mean-pooling head",
        "Using a relative positional encoding scheme and a deeper architecture with 24 layers instead of 12",
      ],
      correctAnswer: 1,
      explanation: "RoBERTa's key improvements over BERT: (1) longer training (1M steps vs 1M but with much larger batches of 8K sequences), (2) more training data (160GB vs BERT's 16GB), (3) longer sequence training (always using 512 tokens, not 50% at 128), (4) dynamic masking (regenerate masks each epoch rather than static masked corpus), (5) removal of NSP (using only MLM with full documents). Crucially, RoBERTa showed that most gains come from longer training with more data and larger batches - BERT's architecture was already well-designed, it was just undertrained.",
      hints: [
        "RoBERTa = Robustly Optimized BERT Pretraining Approach - the emphasis is on the training recipe, not the architecture.",
        "Dynamic masking means each training example sees different masked positions each epoch, providing more training signal.",
      ],
    },
  ],
  "wav2vec-audio-ssl": [
    {
      id: "q-ssl-kp45-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "wav2vec 2.0 (Baevski et al., 2020) uses a quantization module during pre-training. What is the role of this module?",
      options: [
        "It compresses audio waveforms to reduce storage requirements before training",
        "It discretizes continuous audio features into a finite set of learned quantized representations (codebook entries) that serve as the contrastive learning targets",
        "It applies vector quantization to the model gradients to reduce communication overhead in distributed training",
        "It converts raw audio to mel-spectrograms and then quantizes them to match ASR phoneme categories",
      ],
      correctAnswer: 1,
      explanation: "wav2vec 2.0 uses a product quantization module with G codebooks each containing V entries. The continuous CNN-encoded audio features are quantized to produce discrete targets q_t for the masked positions. The model then solves a contrastive task: given the context representation c_t (from the transformer), identify the correct quantized target q_t among K distractors (other quantized representations from the same utterance). This gives a discrete, finite target space without requiring any phoneme labels, enabling fully self-supervised speech representation learning.",
      hints: [
        "Product quantization: use G separate codebooks, sample one entry from each, and concatenate them to form the target.",
        "The quantizer is trained jointly with the rest of the model using a straight-through gradient estimator (Gumbel-softmax).",
      ],
    },
    {
      id: "q-ssl-kp45-2",
      type: "true-false",
      difficulty: "medium",
      question: "wav2vec 2.0 trained with just 10 minutes of labeled speech data, when used for fine-tuning, achieves word error rates competitive with the best supervised models trained on 960 hours of labeled LibriSpeech data from 2019.",
      correctAnswer: "True",
      explanation: "Baevski et al. (2020) demonstrate that wav2vec 2.0 pre-trained on 960h of unlabeled LibriSpeech and fine-tuned on just 10 minutes of labeled data achieves 4.8% WER on the test-clean split and 8.2% on test-other. This is competitive with the best supervised-only baselines from 2019 that used the full 960h of labeled data. The SSL pre-training provides such rich speech representations that only minimal labeled data is needed for ASR fine-tuning - a compelling demonstration of SSL's label efficiency.",
      hints: [
        "960 hours of labeled speech vs. 10 minutes: a 5760x reduction in labeled data requirement.",
        "The key: wav2vec 2.0 learns phonetic and linguistic structure from unlabeled audio; fine-tuning just maps this to transcriptions.",
      ],
    },
    {
      id: "q-ssl-kp45-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The diversity loss in wav2vec 2.0's training objective serves to:",
      options: [
        "Maximize the entropy of the quantized code assignments across the batch, preventing codebook collapse where most codes are never used",
        "Minimize the variance of the representations within each codebook entry to ensure compact clusters",
        "Penalize the model for using the same context representation for different masked positions",
        "Regularize the CNN feature extractor to produce smooth temporal features",
      ],
      correctAnswer: 0,
      explanation: "The diversity loss in wav2vec 2.0 is L_d = -H(p) = sum_i p_i * log(p_i) (negative entropy of codebook usage), encouraging uniform usage of all V codebook entries. Without it, the Gumbel-softmax quantizer can collapse: most audio frames get assigned to a handful of popular codes, leaving most codebook entries unused (codebook collapse). The diversity loss encourages the model to distribute assignments uniformly across all codes, ensuring the quantized target space is fully utilized and diverse.",
      hints: [
        "Codebook collapse: if one code represents 99% of frames, the contrastive task becomes trivial (always predict that code).",
        "Maximizing entropy of code assignments = uniform usage = each code represents an equal share of the audio.",
      ],
    },
  ],
  "dino-self-distillation": [
    {
      id: "q-ssl-kp46-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DINO (Caron et al., 2021) uses a 'centering' operation on the teacher's output distribution. The purpose of centering is to:",
      options: [
        "Normalize the teacher outputs to have zero mean across the batch, preventing one dominant dimension from saturating the softmax",
        "Reduce the variance of the teacher's predictions to stabilize training",
        "Center the student network's predictions around the teacher's mean to improve gradient signal",
        "Apply a temperature reduction to the teacher's softmax to sharpen the prediction targets",
      ],
      correctAnswer: 0,
      explanation: "DINO's centering subtracts a running mean c (updated by EMA: c <- m*c + (1-m)*mean_batch(g_theta(x))) from the teacher's logits before softmax. Without centering, the teacher's softmax can collapse to a uniform distribution (mode collapse where all images map to the same representation) or to a one-hot distribution. Centering prevents both: if one dimension is always large, centering reduces it, preventing dominance. Crucially, centering is applied only to the teacher (not the student), creating the asymmetry needed for stable self-distillation.",
      hints: [
        "Mode collapse in DINO without centering: teacher outputs the same distribution for all inputs (uniform collapse) or always predicts one class.",
        "Centering + sharpening (low teacher temperature) together enforce: diverse but confident predictions.",
      ],
    },
    {
      id: "q-ssl-kp46-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DINO's use of multi-crop augmentation (2 global crops + 6-8 local crops) creates a specific training objective. How are global and local crops used differently?",
      options: [
        "Global crops are passed to both teacher and student; local crops are passed only to the student, encouraging the student to match the teacher's global view from a local perspective",
        "Local crops are passed to the teacher to provide a harder prediction target; global crops are used only for the contrastive negative samples",
        "Both global and local crops are passed to both networks, with global crops weighted more in the loss",
        "Global crops update the teacher via EMA; local crops update the student via gradient descent",
      ],
      correctAnswer: 0,
      explanation: "In DINO's multi-crop strategy, the teacher only sees the two large global crops (224x224), while the student sees all crops including 6-8 small local crops (96x96). The student must predict the teacher's output from local crop inputs - it must recognize local patch content and match it to the global semantic representation. This local-to-global correspondence forces the student to learn that a local patch (e.g., an eye) should be embedded consistently with the global object context (e.g., a face). This is why DINO ViT features have remarkable localization properties without any explicit segmentation supervision.",
      hints: [
        "Teacher = global view (full scene context). Student = local view (small patch). Student must predict teacher's global understanding from a local patch.",
        "This is why DINO's attention maps show semantic object segmentation - the network learns what global concept a local patch belongs to.",
      ],
    },
    {
      id: "q-ssl-kp46-3",
      type: "true-false",
      difficulty: "medium",
      question: "DINO's self-attention maps in the final ViT layer can be directly used as unsupervised object segmentation masks without any fine-tuning on segmentation data.",
      correctAnswer: "True",
      explanation: "One of DINO's remarkable emergent properties is that the [CLS] token's self-attention maps in the final transformer layer produce high-quality, semantically meaningful attention patterns that closely match foreground object masks. Querying the attention of the [CLS] token with respect to all patch tokens reveals which patches the model considers most relevant to the global image representation - these patches correspond to semantic objects. Thresholding these attention maps provides surprisingly accurate unsupervised segmentation, demonstrated on VOC2012 and COCO without any segmentation supervision.",
      hints: [
        "[CLS] token attends to the most semantically relevant patches - in DINO, this correlates with object foregrounds.",
        "This property is unique to DINO among SSL methods; it does not appear in contrastive methods like MoCo or SimCLR.",
      ],
    },
  ],
  "contrastive-theory-depth": [
    {
      id: "q-ssl-kp47-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The 'dimensional collapse' problem in SSL representations (Hua et al., 2021) refers to:",
      options: [
        "The model learning to output zero-dimensional (scalar) representations instead of vectors",
        "The effective rank of the representation matrix collapsing to much fewer dimensions than the embedding space, causing many embedding dimensions to be redundant or correlated",
        "Individual embedding dimensions collapsing to zero due to ReLU saturation in the projection head",
        "The batch normalization statistics collapsing to identical means and variances across all layers",
      ],
      correctAnswer: 1,
      explanation: "Dimensional collapse occurs when the representation matrix (rows are embeddings for each sample) has low effective rank - many dimensions carry redundant information or are highly correlated. Even if individual samples don't collapse to the same point (feature collapse is avoided), the representations may span only a low-dimensional subspace of the embedding space. This is harmful because it wastes representational capacity and can make downstream linear probing ineffective. Barlow Twins and VICReg explicitly address this by encouraging unit-variance and decorrelated embedding dimensions.",
      hints: [
        "Effective rank = exp(entropy of singular value distribution). Low effective rank = few dominant directions.",
        "Dimensional collapse is distinct from feature collapse (all samples mapping to same point). Both are failure modes.",
      ],
    },
    {
      id: "q-ssl-kp47-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "VICReg (Bardes et al., 2022) uses three loss terms. Which combination correctly identifies them and their roles?",
      options: [
        "Variance (prevent individual dimension collapse), Invariance (encourage augmentation invariance), Covariance (decorrelate embedding dimensions)",
        "Variance (maximize total embedding variance), Independence (enforce statistical independence via ICA), Correlation (maximize cross-view correlation)",
        "Variational (KL regularization), Information (maximize MI), Contrastive (push negatives apart)",
        "Vector (L2 norm regularization), Invariance (cosine similarity), Redundancy (Barlow-style cross-correlation penalty)",
      ],
      correctAnswer: 0,
      explanation: "VICReg = Variance-Invariance-Covariance Regularization. Three loss terms: (1) Invariance: MSE between embeddings of two views of the same image, encouraging augmentation invariance (like the alignment term in contrastive learning); (2) Variance: hinge loss on per-dimension standard deviation, ensuring each dimension has variance >= 1 (preventing dimensional collapse for each individual dimension); (3) Covariance: sum of squared off-diagonal terms of the covariance matrix, penalizing correlations between dimensions (preventing redundancy). VICReg achieves competitive ImageNet accuracy without any negative samples or stop-gradient tricks.",
      hints: [
        "VICReg applies these three losses to both branches independently - no asymmetry, no stop-gradient needed.",
        "The variance term is a hinge: std(d) = max(0, 1 - std(d)) - it penalizes dimensions with std < 1 but doesn't penalize large variance.",
      ],
    },
    {
      id: "q-ssl-kp47-3",
      type: "true-false",
      difficulty: "medium",
      question: "The Barlow Twins objective (Zbontar et al., 2021) is equivalent to minimizing the squared Frobenius distance between the cross-correlation matrix of the two views' embeddings and the identity matrix.",
      correctAnswer: "True",
      explanation: "Barlow Twins computes C_ij = sum_b z_bi * z_bj / N (the cross-correlation matrix between the two views' embeddings, normalized across the batch). The loss is L = sum_i (1 - C_ii)^2 + lambda * sum_{i != j} C_ij^2. The first term encourages C_ii = 1 (the two views of the same image produce correlated embeddings - invariance). The second term encourages C_ij = 0 for i != j (different embedding dimensions are decorrelated between views - reducing redundancy). Together, this is exactly minimizing ||C - I||_F^2 (with the lambda weighting off-diagonal terms), where I is the identity matrix.",
      hints: [
        "Cross-correlation matrix C: C_ii = 1 means dimension i is perfectly correlated across the two views.",
        "C_ij = 0 for i != j means dimensions i and j are independent across views - no redundancy.",
      ],
    },
  ],
  "ssl-projection-head": [
    {
      id: "q-ssl-kp48-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "SimCLR (Chen et al., 2020) showed that adding a nonlinear projection head (MLP) on top of the representation before computing the contrastive loss significantly improves linear probing accuracy. The best explanation for this is:",
      options: [
        "The projection head increases the model's capacity, allowing it to memorize more training examples",
        "The projection head allows the contrastive loss to discard information that is useful for downstream tasks but harmful for contrastive optimization (e.g., augmentation-invariant nuisances), protecting the representation",
        "The projection head acts as a regularizer that prevents the backbone from overfitting to the pre-training dataset",
        "The projection head converts the backbone representations to the same dimensionality as the contrastive embedding space, resolving a dimensionality mismatch",
      ],
      correctAnswer: 1,
      explanation: "Chen et al. hypothesize that the contrastive loss encourages augmentation invariance at the cost of discarding information. The projection head serves as a 'sacrificial' layer: the contrastive loss acts on the projection head output (where augmentation-invariant but downstream-irrelevant information is discarded), while the backbone representation retains richer information that benefits downstream tasks. The projection head absorbs the 'damage' from augmentation invariance pressure, protecting the backbone. This is supported by the finding that representations from before the projection head always outperform those from after it for linear probing.",
      hints: [
        "Without projection head: contrastive loss directly pressures the backbone to discard any non-augmentation-invariant information, including useful class structure.",
        "With projection head: the backbone can retain class-discriminative info that the projection head then discards for contrastive alignment.",
      ],
    },
    {
      id: "q-ssl-kp48-2",
      type: "true-false",
      difficulty: "easy",
      question: "The projection head used for contrastive loss computation is typically discarded after pre-training, and only the backbone encoder is used for downstream task fine-tuning or linear probing.",
      correctAnswer: "True",
      explanation: "The projection head (usually a 2-3 layer MLP) is used only during contrastive pre-training to compute the loss. After pre-training is complete, the projection head is discarded. Only the backbone encoder (e.g., ResNet-50 or ViT) is retained. For evaluation, either a linear classifier is trained on top of frozen backbone features (linear probing) or the entire backbone is fine-tuned on the downstream labeled dataset. The projection head's purpose is solely to provide a better optimization target for the contrastive objective during pre-training.",
      hints: [
        "SimCLR, MoCo, BYOL, DINO - all discard their projection/prediction heads after pre-training.",
        "The backbone is the 'general-purpose feature extractor' that is reused; the head is task/objective-specific.",
      ],
    },
    {
      id: "q-ssl-kp48-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "When comparing linear probing vs. full fine-tuning for evaluating SSL representations, which scenario reveals a disconnect between the two evaluation protocols?",
      options: [
        "Linear probing always overestimates SSL quality because the linear classifier is too powerful for few-shot tasks",
        "MAE shows much lower linear probing accuracy (~73%) but much higher fine-tuning accuracy (~87%) compared to contrastive methods (MoCo v3: ~76% linear, ~83% fine-tuning), suggesting MAE's features are not linearly separable but are highly adaptable",
        "Full fine-tuning always exactly predicts linear probing rank ordering across SSL methods - the two protocols never disagree",
        "Linear probing overestimates performance on small datasets but underestimates on large datasets where fine-tuning saturates",
      ],
      correctAnswer: 1,
      explanation: "MAE demonstrates a striking disconnect: its linear probing accuracy (~73.5% for ViT-L) is significantly lower than MoCo v3 (~76.7%), but its fine-tuning accuracy (~85.9% for ViT-L) substantially exceeds MoCo v3 (~84.1%). This reveals that linear probing and fine-tuning measure different things: linear probing measures whether features are immediately linearly separable (useful for direct linear classification), while fine-tuning measures the capacity and richness of features when the full model adapts. MAE's reconstructive features are holistic and rich but not linearly organized; contrastive features are linearly separable by design but may have lower ceiling performance.",
      hints: [
        "Linear probing freezes the backbone - it can only use features as-is. Fine-tuning can reorganize features via backprop.",
        "MAE's objective (pixel reconstruction) does not explicitly push class-discriminative structure into the representation space.",
      ],
    },
  ],
  "ssl-negative-sampling": [
    {
      id: "q-ssl-kp49-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "MoCo (Momentum Contrast, He et al., 2020) introduces a momentum encoder and a queue to solve which specific problem in contrastive learning?",
      options: [
        "The gradient explosion problem when the negative samples come from the same batch as the anchor",
        "The requirement for a very large batch to provide sufficient negatives, making training infeasible on single GPUs",
        "The slow convergence of the encoder when trained with only a small number of epochs",
        "The mode collapse problem where the encoder outputs the same representation for all inputs",
      ],
      correctAnswer: 1,
      explanation: "SimCLR requires very large batches (4096-8192) to have enough negatives per anchor - this is memory-prohibitive on standard hardware. MoCo solves this by: (1) a queue of encoded keys that stores N=65536 negative encodings from previous mini-batches, providing many negatives without requiring them all in the current batch; (2) a momentum encoder (EMA of the query encoder) that generates the keys - ensuring consistency between current and past keys despite encoder evolution. The momentum encoder is crucial: if the key encoder updated by gradient, old queue entries from many steps ago would be generated by a very different encoder, making them inconsistent targets.",
      hints: [
        "Large batch is needed for negatives, but large batch requires more GPUs and memory. MoCo decouples the two.",
        "Queue of 65536 keys provides ~16x more negatives than a batch of 4096 without needing 16x more memory.",
      ],
    },
    {
      id: "q-ssl-kp49-2",
      type: "true-false",
      difficulty: "medium",
      question: "Hard negative mining - preferentially selecting negative samples that are semantically similar to the anchor - consistently improves contrastive learning performance when implemented correctly.",
      correctAnswer: "True",
      explanation: "Hard negatives are negative samples close to the anchor in embedding space (semantically similar but different class). They provide stronger gradient signal than easy negatives (far from the anchor) because the loss contribution of far negatives approaches zero after the model learns to separate them. Methods like MoCHi (He et al., 2020) synthesize hard negatives by interpolating or mixing anchor and negative embeddings. RingLoss and hard negative sampling strategies consistently improve contrastive representations. The key challenge is avoiding false negatives (hard samples that are actually semantically similar to the anchor but in different augmented views) - these corrupt the gradient signal.",
      hints: [
        "Easy negatives: loss contribution ~ 0 after training, providing no gradient. Hard negatives: loss contribution remains high.",
        "The hardest possible negative is a false negative - semantically identical to the anchor but treated as negative.",
      ],
    },
    {
      id: "q-ssl-kp49-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The 'uniformity on the hypersphere' interpretation of contrastive learning explains why Gaussian kernel-based uniformity loss log E[exp(-2||z_i - z_j||^2)] has a direct information-theoretic interpretation. This is because:",
      options: [
        "The Gaussian kernel computes the maximum likelihood of the data under an isotropic Gaussian distribution",
        "Minimizing this log-sum-exp expression is equivalent to maximizing the differential entropy of the feature distribution on the unit hypersphere, encouraging maximum spread",
        "The Gaussian kernel is the only kernel that induces a metric on the hypersphere consistent with geodesic distance",
        "This expression equals the negative log-likelihood of a von Mises-Fisher distribution with unit concentration",
      ],
      correctAnswer: 1,
      explanation: "Wang and Isola's uniformity loss G_uniform(Z) = log E_{x,y~p_data}[exp(-2||f(x) - f(y)||^2)] has a direct connection to differential entropy. The Gaussian kernel exp(-2||z_i - z_j||^2) is a positive definite kernel on R^d. Minimizing the log-expected kernel value encourages the feature distribution p(z) on the hypersphere to maximize the negative kernel energy - which corresponds to maximizing the spread (differential entropy) of the distribution. In the limit of a large dataset, the optimal distribution under uniformity loss is the uniform distribution on the unit hypersphere, which has maximum entropy among all distributions on S^{d-1}.",
      hints: [
        "Maximum entropy distribution on a bounded set (the hypersphere) is the uniform distribution.",
        "Uniformity loss penalizes pairs of points that are close together (high Gaussian kernel value), pushing points apart.",
      ],
    },
  ],
  "ssl-modalities-advanced": [
    {
      id: "q-ssl-kp50-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Data2Vec (Baevski et al., 2022) proposes a unified SSL framework for vision, language, and audio. Its key innovation over modality-specific SSL is:",
      options: [
        "Using a shared tokenizer that converts all modalities into the same discrete token space before training",
        "Predicting contextualized latent representations of the full input (from a teacher/EMA network) rather than modality-specific targets like pixels or tokens",
        "Training a single model that processes raw bytes directly, bypassing modality-specific preprocessing",
        "Applying the same fixed data augmentation pipeline (random crop, color jitter, Gaussian blur) to all modalities",
      ],
      correctAnswer: 1,
      explanation: "Data2Vec's unifying insight: instead of predicting modality-specific targets (pixels for MAE, discrete tokens for BERT, codebook entries for wav2vec), predict the top-K average hidden representations from a teacher (EMA) network that processes the full (unmasked) input. This produces 'contextualized' targets: the representation of a masked patch/token/frame incorporates global context from the teacher, making the targets richer than raw pixels or discrete tokens. The same masking-and-predicting framework applies identically to vision, language, and audio - only the initial tokenization step differs.",
      hints: [
        "Data2Vec target = EMA teacher's hidden states averaged over top-K layers. Same framework for image patches, text tokens, and audio frames.",
        "Contextualized targets capture not just local patch appearance but the role of that patch in the global representation.",
      ],
    },
    {
      id: "q-ssl-kp50-2",
      type: "true-false",
      difficulty: "hard",
      question: "Contrastive Language-Image Pre-training (CLIP) can be categorized as self-supervised learning because its training signal (image-text pairing) is automatically derived from the structure of the data (scraped image-alt-text pairs) rather than human-annotated class labels.",
      correctAnswer: "True",
      explanation: "CLIP (Radford et al., 2021) trains on 400M image-text pairs scraped from the internet, where the supervisory signal is the natural co-occurrence of images and their alt-text descriptions - no human annotation is performed. This satisfies the SSL definition: the training signal is derived automatically from data structure. CLIP is sometimes called 'weakly supervised' or 'naturally supervised' because the alt-text is noisier than human labels, but it is fundamentally self-supervised in that no human labeling effort was performed on the training data. The contrastive objective (match image to its text among N pairs in a batch) is the SSL objective.",
      hints: [
        "The alt-text accompanying internet images was written by humans, but not as annotation for ML - it is naturally occurring paired data.",
        "CLIP's 400M pairs are never manually labeled with ImageNet categories - the signal is purely image-text co-occurrence.",
      ],
    },
    {
      id: "q-ssl-kp50-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In the context of SSL for graphs (e.g., GraphCL, You et al., 2020), which augmentation strategy has been shown to be most task-sensitive - potentially helping or hurting depending on the downstream graph property to be predicted?",
      options: [
        "Node feature masking, which always improves performance by forcing structural feature learning",
        "Subgraph sampling (dropping random subgraphs as views), which can remove semantically critical substructures for property prediction tasks",
        "Edge perturbation (randomly adding or dropping edges), which is always domain-agnostic and safe",
        "Node degree-based subsampling, which works only for social network graphs but not molecular graphs",
      ],
      correctAnswer: 1,
      explanation: "Subgraph sampling creates views by extracting random subgraphs from the original graph. While this provides good augmentations for social networks (where random subgraphs preserve community structure), it can be catastrophic for molecular graphs: removing a subgraph may eliminate a functional group (e.g., hydroxyl, carboxyl) that determines the molecule's chemical property being predicted. If the contrastive task requires predicting from subgraphs, the model learns that these missing groups don't matter - directly contradicting the downstream task. This is a key insight from GraphCL: augmentation choice is not modality-agnostic but must be tailored to the graph semantics.",
      hints: [
        "For molecules: a subgraph might omit the active site that determines drug binding - the model then learns to ignore it.",
        "For social networks: random subgraphs preserve community structure (Ego network properties). No semantic units are destroyed.",
      ],
    },
  ],
};
Object.assign(questions, extraSsl);

const patchSsl: Record<string, Question[]> = {
  "ssl-kp30-patch": [
    {
      id: "q-ssl-kp30-patch-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "SSL models for tabular data face a unique challenge compared to image/text SSL: which property of tabular data makes standard augmentations like cropping or masking less effective?",
      options: [
        "Tabular datasets are always too small for SSL to be effective",
        "Tabular features are heterogeneous (mixed types: categorical, numerical) with no natural spatial or temporal structure, making semantics-preserving augmentations hard to define",
        "Tabular data always requires supervised labels because the features are already human-engineered",
        "Gradient-based optimization is incompatible with discrete categorical features in tabular data",
      ],
      correctAnswer: 1,
      explanation: "Tabular data lacks the structural regularity of images (spatial coherence) or text (sequential grammar). Features are heterogeneous: some are categorical (cannot be interpolated), some numerical (can be corrupted), with no natural ordering. Augmentations like cropping assume spatial continuity; masking assumes feature redundancy that may not exist when columns are independent. SCARF and SAINT address this with feature-space corruption using the empirical marginal distribution, generating 'corrupted views' by replacing random subsets of features with values sampled from other rows.",
      hints: [
        "Images have spatial coherence - nearby pixels are correlated. Tabular columns may be statistically independent.",
        "SCARF (Self-supervised Contrastive learning using Random Feature Corruption) samples corruptions from the marginal distribution of each feature.",
      ],
    },
  ],
  "ssl-kp35-patch": [
    {
      id: "q-ssl-kp35-patch-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In SSL for medical imaging, which factor most severely limits the direct application of natural image SSL methods like SimCLR to medical images?",
      options: [
        "Medical images are too high-resolution for GPU memory",
        "Standard augmentations (aggressive color jitter, random grayscale) can destroy diagnostically critical features, and positive pairs from the same image may share pathology that is semantically different from augmentation invariance",
        "Medical images use DICOM format which cannot be loaded by standard PyTorch dataloaders",
        "SimCLR requires ImageNet pre-training which uses photographic images incompatible with medical domain",
      ],
      correctAnswer: 1,
      explanation: "Medical image SSL faces the augmentation mismatch problem: SimCLR's default augmentations (aggressive color jitter, random horizontal flipping for histopathology where orientation matters, Gaussian blur that obscures lesion borders) can destroy pathologically relevant features. Furthermore, two crops of the same medical image may capture the same tumor in different views - making them 'positive pairs' - but different images with similar tumors are treated as negatives. This violates the contrastive assumption that positive pairs should be semantically similar. Domain-specific augmentations and patient-level positive mining are required.",
      hints: [
        "Consider pathology: horizontal flipping of a histology slide changes perceived cell arrangement, which has diagnostic meaning.",
        "Two patches of the same breast cancer slide are positives - but so should be patches from different slides of the same cancer type.",
      ],
    },
    {
      id: "q-ssl-kp35-patch-2",
      type: "true-false",
      difficulty: "medium",
      question: "SSL pre-training on unlabeled medical images (e.g., chest X-rays) consistently outperforms ImageNet-supervised pre-training for downstream medical imaging tasks, even when the ImageNet-pre-trained model is fine-tuned on the same medical dataset.",
      correctAnswer: "False",
      explanation: "The superiority of domain-specific SSL over ImageNet supervised pre-training is task-dependent and dataset-size-dependent. For large medical datasets (e.g., CheXpert with 224K X-rays), domain-specific SSL (e.g., MoCo v2 trained on X-rays) can match or slightly exceed ImageNet pre-training on CXR tasks. However, for small medical datasets, ImageNet supervised pre-training often remains competitive because the feature hierarchy (edges, textures, shapes) transfers well. The picture is nuanced: SSL on in-domain data helps more when labeled data is scarce and the domain gap is large (e.g., pathology vs. natural images).",
      hints: [
        "ImageNet pre-training captures a rich visual hierarchy that transfers across many visual tasks.",
        "The benefit of domain-specific SSL increases as the domain gap between ImageNet and the target increases.",
      ],
    },
    {
      id: "q-ssl-kp35-patch-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "The GigaSSL approach for whole-slide image (WSI) SSL must address which fundamental computational challenge not present in standard image SSL?",
      options: [
        "Whole-slide images require 3D convolutional encoders because they have multiple focal plane layers",
        "WSIs are gigapixel images (100K x 100K pixels) that cannot fit in GPU memory, requiring hierarchical or patch-based SSL where the 'image' is a bag of thousands of non-overlapping patches",
        "Medical image archives use lossless compression formats that cannot be decoded fast enough for online augmentation",
        "WSI pixels are 16-bit integers rather than 8-bit, requiring specialized normalization that breaks standard batch normalization",
      ],
      correctAnswer: 1,
      explanation: "Whole-slide histopathology images are gigapixel-scale (~100K x 100K pixels at 20x magnification). They cannot be processed as a single image. Standard WSI SSL: (1) extract thousands of non-overlapping patches (e.g., 256x256) from tissue regions, (2) encode each patch independently with a backbone (e.g., ResNet pre-trained with SimCLR), (3) aggregate patch features for slide-level representation using multiple-instance learning (MIL) or transformer-based aggregators. The SSL challenge is defining 'positive pairs' at the slide level: use two random subsets of patches from the same slide as augmented views of the same slide.",
      hints: [
        "A gigapixel image at 256x256 patch size yields (100K/256)^2 ~ 150K patches per slide.",
        "SSL must be applied either at the patch level (define positives as augmented patches) or slide level (define positives as two subsets of the same slide's patches).",
      ],
    },
  ],
};
Object.assign(questions, patchSsl);

Object.assign(questions, additionalSslQuestions);

registerQuestions(questions);
export default questions;
