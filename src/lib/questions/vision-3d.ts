import type { Question } from "@/lib/curriculum";

const questions: Record<string, Question[]> = {
  "monocular-depth": [
    {
      id: "q-cv3d-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Self-supervised monocular depth estimation (e.g., Monodepth2) trains using photometric reprojection loss. Which expression correctly describes this loss between a target frame I\\_t and a source frame Iₛ?",
      options: [
        "L_photo = ||I\\_t(p) − Iₛ(p_warped)||\\_1, where p_warped = K\\cdotT_{t\\tos}\\cdotD(p)\\cdotK\\^{-1}\\cdotp uses predicted depth D and relative pose T to warp the source image onto the target",
        "L_photo = KL(I\\_t(p) || Iₛ(p)), the KL divergence between pixel intensity distributions",
        "L_photo = 1 − SSIM(I\\_t, Iₛ) where SSIM is computed on the raw (unwarped) pair",
        "L_photo = ||D(I\\_t) − D(Iₛ)||\\_2, the L2 distance between depth maps of target and source frames",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Monodepth2 uses a combined loss: L = \\alpha\\cdot(1−SSIM(I\\_t, Î))/2 + (1−\\alpha)\\cdot||I\\_t−Î||\\_1 where \\alpha=0.85, and Î is the reconstructed target image obtained by warping Iₛ using predicted depth D and relative pose T.\n\n**Step 2**: Warping: p_warped = K\\cdotT_{t\\tos}\\cdot(D(p)\\cdotK\\^{-1}\\cdotp).\n\n**Step 3**: This differentiable projection allows gradients to flow to both D and T.",
      hints: [
        "If you know depth and camera motion, you can predict what a source frame pixel maps to in the target - that is the warp.",
        "Minimising the colour difference between I\\_t and the warped Iₛ forces the predicted depth to explain the observed motion.",
      ],
    },
    {
      id: "q-cv3d-kp1-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Scale ambiguity is an inherent limitation of monocular depth estimation because a scene at double the distance with double the size produces identical images under a pinhole camera model.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: Under the pinhole camera model, scaling all 3D points by factor k and the camera translation by k produces identical image projections: p = K[R|t]\\cdotP.\n\n**Step 2**: This means monocular methods can only recover depth up to an unknown scale factor s - all predicted depths D are valid up to D\\tos\\cdotD.\n\n**Step 3**: Absolute metric scale requires additional constraints such as known object sizes, camera height, or IMU integration.",
      hints: [
        "A doll at arm\'s length and a building far away can project identically onto the image plane - depth is unrecoverable without scale information.",
        "Self-supervised methods address scale by median-scaling predictions to match GT during evaluation, or by using stereo pairs for scale anchoring.",
      ],
    },
    {
      id: "q-cv3d-kp1-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Monodepth2's auto-mask filters out pixels from the photometric loss. Precisely, a pixel p is masked out when:",
      options: [
        "min_s pe(I\\_t, Iₛ\\to\\_t) > min_s pe(I\\_t, Iₛ), i.e., the unwarped source frames already reconstruct the target pixel better than the warped frames - indicating the pixel is in a stationary region where reprojection provides no useful signal",
        "The pixel is in the top 5% of depth uncertainty, indicating the depth network is unsure",
        "The pixel lies within a sky region detected by a separate semantic segmentation network",
        "The pixel has gradient magnitude below a threshold, indicating a textureless region where photometric loss is unreliable",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Auto-masking condition: \\mu(pe(I\\_t, Iₛ) < pe(I\\_t, Iₛ\\to\\_t)) - mask pixel p if the photometric error to the raw source Iₛ is less than to the warped source Iₛ\\to\\_t.\n\n**Step 2**: This identifies stationary pixels (camera-static or static objects with no relative motion) where the warp doesn\'t improve reconstruction - applying gradients here would incorrectly push depth to infinity.\n\n**Step 3**: Masked pixels are excluded from the loss.",
      hints: [
        "If the source frame already matches the target without any warping, the depth prediction is providing no useful reprojection signal.",
        "Stationary objects in a moving sequence appear to not move - their reprojection is trivially good without depth.",
      ],
    },
  ],

  "stereo-matching": [
    {
      id: "q-cv3d-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A stereo camera has baseline B=0.12m and focal length f=800px. A point in the scene has disparity d=40px. What is its depth Z in meters?",
      options: [
        "Z = 40 / (800 \\times 0.12) = 0.42m",
        "Z = (800 \\times 0.12) / 40 = 2.4m",
        "Z = 800 / (0.12 \\times 40) = 166.7m",
        "Z = 0.12 / (800 \\times 40) = 0.0000038m",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1**: The stereo triangulation formula is Z = (f \\times B) / d.. Substituting: Z = (800 \\times 0.12) / 40 = 96/40 = 2.4m.\n\n**Step 2**: Note that f must be in the same units as d (pixels), and B in meters gives Z in meters.. Disparity d is the horizontal pixel offset between the same point in left and right rectified images: larger d \\to closer object.\n\n**Step 3**: ",
      hints: [
        "Z = (f \\times B) / d. Substitute f=800, B=0.12, d=40.",
        "800 \\times 0.12 = 96. 96 / 40 = 2.4m.",
      ],
    },
    {
      id: "q-cv3d-kp2-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "After stereo rectification, corresponding points in a stereo pair are guaranteed to lie on the same horizontal scanline, reducing the 2D matching problem to a 1D disparity search.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: Stereo rectification applies homographic warps H_L and H_R to both images so that epipolar lines become horizontal rows.\n\n**Step 2**: For any point pₗ = (x, y) in the left image, its correspondence in the right image must lie at (x − d, y) for some disparity d \\geq 0.\n\n**Step 3**: This reduces stereo matching from searching a 2D neighbourhood to a 1D search along the same row, enabling efficient dynamic programming or cost-volume methods.",
      hints: [
        "The epipolar constraint restricts correspondences to a line. After rectification, that line is horizontal (same row).",
        "Searching only along row y in the right image for a point at row y in the left image reduces search space from O(WH) to O(W).",
      ],
    },
    {
      id: "q-cv3d-kp2-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "GwcNet (Group-wise Correlation) builds its cost volume by computing group-wise dot products between left and right feature maps. How does group-wise correlation improve over the concatenation cost volume in DispNet?",
      options: [
        "Group-wise correlation divides feature channels into G groups and computes inner products within each group across disparity hypotheses, producing a compact C/G \\times D cost volume that captures feature similarity directly - unlike concatenation (2C \\times D) which requires the 3D CNN to learn similarity from stacked features implicitly",
        "Group-wise correlation computes the full C\\timesC feature cross-correlation matrix at each disparity, giving richer matching signals than concatenation at the cost of higher memory",
        "Group-wise correlation replaces the 3D cost volume with a 2D attention map, eliminating the need for 3D convolutions",
        "Group-wise correlation uses a binary similarity measure (Hamming distance) between binary feature codes, reducing cost volume computation to bitwise operations",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: DispNet concatenates left and right features \\to 2C\\timesD cost volume; the 3D encoder must learn what constitutes a match.. GwcNet splits C features into G groups, computes dot products within each group at each disparity: g_wc(d)=\\Sigma_{g=1}^{G} \\phi_g(x_l)\\cdot\\phi_g(x_r−d).\n\n**Step 2**: This C/G\\timesD volume explicitly encodes matching similarity (high inner product = good match) rather than raw feature values, improving both accuracy and memory efficiency vs.. concatenation.\n\n**Step 3**: ",
      hints: [
        "Dot product directly measures feature agreement - does concatenation encode this or leave it to the network to discover?",
        "C channels split into G groups \\to each group produces 1 scalar per disparity \\to total C/G scalars per disparity.",
      ],
    },
  ],

  "depth-completion": [
    {
      id: "q-cv3d-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is depth completion, and why is it needed in practice?",
      options: [
        "Filling in a dense depth map from a sparse set of valid LiDAR depth measurements by using guidance from a co-registered RGB image",
        "Completing a 3D object model from a single depth frame using shape priors",
        "Estimating depth for pixels that are occluded in one stereo frame using the other frame",
        "Extrapolating depth beyond the sensor\'s maximum range using learned priors",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: LiDAR sensors produce sparse depth maps (typically 5% valid pixels for a 64-line LiDAR on a high-resolution image), making dense depth estimation difficult; depth completion uses the sparse LiDAR points as anchor constraints and an RGB image for texture guidance to produce dense, accurate depth maps.",
      hints: [
        "Think about why a LiDAR\'s depth map has so many missing pixels - it only shoots beams in specific directions.",
        "The RGB image provides texture boundaries that guide how sparse depth should be interpolated.",
      ],
    },
    {
      id: "q-cv3d-kp3-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Guide networks in depth completion use the RGB image to compute spatially varying convolution kernels that adapt to image edges, preventing blurring across depth discontinuities.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: Methods like NLSPN and GuideNet predict spatially varying (non-local or guided) convolution kernels from the RGB image; these kernels are sharpened at edges, preventing depth values from blurring across object boundaries - a common failure of naive interpolation approaches.",
      hints: [
        "Think about why standard Gaussian blurring fails at depth boundaries in a depth completion map.",
        "The RGB image provides edge information that tells the network where not to interpolate across.",
      ],
    },
    {
      id: "q-cv3d-kp3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the challenge of evaluating depth completion methods on the KITTI dataset, and how is it typically addressed?",
      options: [
        "KITTI ground truth depth is itself semi-dense LiDAR accumulation (not truly dense), so evaluation is restricted to pixels with valid accumulated LiDAR measurements, and methods are compared on RMSE and MAE at those sparse valid pixels",
        "KITTI images are too low resolution to evaluate sub-pixel depth accuracy, requiring super-resolution preprocessing",
        "KITTI contains too few scenes for statistically significant evaluation, so data augmentation must be applied",
        "The evaluation metric for depth completion on KITTI is the 3D IoU between predicted and ground truth point clouds",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: KITTI depth completion ground truth is created by accumulating multiple LiDAR sweeps and applying semi-global matching - it is not truly dense; evaluation computes RMSE, MAE, iRMSE, and iMAE only at pixels where accumulated ground truth is valid, rather than over all image pixels.",
      hints: [
        'True "dense" ground truth depth for outdoor scenes is extremely hard to obtain.',
        "Think about how KITTI compensates for the sparsity of a single LiDAR sweep to produce evaluation ground truth.",
      ],
    },
  ],

  "metric-depth": [
    {
      id: "q-cv3d-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What distinguishes metric depth from relative (affine-invariant) depth in monocular estimation, and why does the distinction matter for autonomous driving?",
      options: [
        "Metric depth provides absolute distances in meters recoverable without any additional constraints; relative depth only recovers depth up to an unknown scale s and shift t (D_metric = s\\cdotD_relative + t), making relative depth insufficient for obstacle distance estimation in AV applications",
        "Metric depth is computed from stereo cameras while relative depth is computed from monocular cameras exclusively",
        "Metric depth uses LiDAR ground truth while relative depth uses human annotations",
        "Metric depth is per-pixel while relative depth is per-object bounding box only",
      ],
      correctAnswer: 0,
      explanation:
        '**Step 1**: Relative (affine-invariant) depth methods (MiDaS, DPT) predict depth up to unknown scale s and shift t; evaluation aligns predictions to GT using least-squares (D_metric = s\\cdotD_pred + t).\n\n**Step 2**: Metric methods (ZoeDepth, UniDepth, Depth Pro) predict absolute depth in meters without any alignment.\n\n**Step 3**: AVs need to know "the car ahead is 3.2m away", not just "it is closer than the building" - requiring metric depth.',
      hints: [
        "Relative depth: you need to scale/shift predictions to match any absolute reference. Metric depth does not.",
        "Self-supervised monocular methods are inherently relative - absolute scale requires external constraints (stereo, known height, etc.).",
      ],
    },
    {
      id: "q-cv3d-kp4-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ZoeDepth achieves metric monocular depth estimation by attaching a metric binning head (predictinging N adaptive bin centres and per-pixel bin probabilities) on top of a relative depth foundation model (DPT/MiDaS backbone), enabling it to convert relative depth features into absolute metric predictions.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: ZoeDepth freezes the DPT encoder (trained on diverse relative depth data) and fine-tunes a metric head that predicts N=64 adaptive depth bin centres for the scene using an MLP on global features, then assigns each pixel a depth via a soft probability distribution over bins.\n\n**Step 2**: This two-stage design leverages the generalised relative depth representations of DPT while adding metric scale via the fine-tuned head trained on LiDAR-supervised datasets.",
      hints: [
        "The DPT backbone captures rich depth features; the metric head converts them to absolute scale.",
        "Adaptive bins (rather than fixed log-space bins) allow the head to place bins where the scene depth distribution is concentrated.",
      ],
    },
    {
      id: "q-cv3d-kp4-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What training strategy allows metric depth models like UniDepth to generalise to scenes with unknown camera intrinsics, rather than requiring known focal length as input?",
      options: [
        "UniDepth jointly predicts camera intrinsics (focal lengths fx, fy and principal point cx, cy) as an auxiliary output alongside depth, using a dedicated pseudo-spherical output space that decouples depth prediction from camera model - the model learns to estimate its own geometric calibration from image content",
        "Augmenting training data with random focal length perturbations so the model learns to ignore focal length",
        "Using inverse depth (disparity) representation which is scale-invariant and thus independent of camera intrinsics",
        "Training only on datasets with fixed canonical camera parameters and relying on test-time adaptation",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: UniDepth predicts 3D points in a pseudo-spherical space (rays \\times depth), jointly outputting intrinsics (fx, fy, cx, cy) from a camera prediction head and depth from a depth head.\n\n**Step 2**: The pseudo-spherical representation isolates the camera model from depth estimation - predicted intrinsics are used to convert the 3D output to metric depth, enabling generalisation across cameras with different fields of view without providing intrinsics at inference.",
      hints: [
        "If the model can predict what camera was used (focal length), it can apply the correct scale without external calibration.",
        "Separating ray direction (from predicted intrinsics) from depth magnitude (from depth head) decouples camera model from depth.",
      ],
    },
  ],

  "depth-anything": [
    {
      id: "q-cv3d-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What training paradigm does Depth Anything use to achieve strong generalization across diverse scenes?",
      options: [
        "Large-scale semi-supervised training: pre-training on millions of unlabeled images with pseudo-labels generated by a teacher depth model, then training a student model on labeled depth datasets",
        "Supervised training exclusively on metric LiDAR-labeled outdoor datasets",
        "Self-supervised training using stereo pairs from internet video without any labeled data",
        "Training on a single large indoor dataset (NYU-v2) with augmentation to simulate outdoor scenes",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Depth Anything scales training to 62 million unlabeled images by using a teacher model to generate pseudo depth labels, then training a student model on both labeled and pseudo-labeled data - the scale of unlabeled data is the key to its strong zero-shot generalization.",
      hints: [
        "Think about how language models benefit from massive amounts of unlabeled text via pre-training.",
        "The key innovation is leveraging unlabeled images at scale using a teacher-student approach.",
      ],
    },
    {
      id: "q-cv3d-kp5-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Depth Anything V2 improves over V1 primarily by using synthetic data with perfect metric depth labels for initial pre-training, followed by real-world data fine-tuning to improve robustness.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: Depth Anything V2 leverages high-quality synthetic depth data (from rendering engines) as an initial training stage to learn accurate depth boundaries and fine details, then fine-tunes on real-world data; this synthetic-to-real curriculum produces sharper and more accurate depth maps than V1.",
      hints: [
        "Synthetic data provides perfect ground-truth depth that is impossible to collect at scale in the real world.",
        "Think about the synthetic-to-real progression: learn from perfect labels, then adapt to real data.",
      ],
    },
    {
      id: "q-cv3d-kp5-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What architectural component in Depth Anything enables strong spatial feature extraction compared to earlier monocular depth networks like Monodepth2?",
      options: [
        "A large Vision Transformer (ViT) encoder pre-trained with DINOv2 self-supervised learning, providing rich semantic and geometric features via self-attention over global image context",
        "A dilated convolutional backbone with atrous spatial pyramid pooling (ASPP) for multi-scale feature aggregation",
        "A recurrent LSTM module that aggregates temporal context across video frames",
        "A dual-encoder architecture that processes RGB and surface normals in parallel branches",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Depth Anything uses a DINOv2-pretrained ViT as its image encoder; ViT\'s global self-attention captures long-range spatial relationships across the image, providing strong semantic features that enable more accurate and globally consistent depth estimation compared to purely local CNN features.",
      hints: [
        "Think about the difference between CNN receptive fields (local) and transformer attention (global).",
        "DINOv2 pre-training provides rich visual features from self-supervised learning on diverse images.",
      ],
    },
  ],

  "nerf-fundamentals": [
    {
      id: "q-cv3d-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "NeRF\'s volume rendering integral computes pixel colour C(r) along ray r(t) = o + td. Which expression correctly states the discrete approximation used in practice?",
      options: [
        "C(r) = \\Sigma\\_i T\\_i (1 − exp(−\\sigma\\_i\\delta\\_i)) c\\_i, where T\\_i = exp(−\\Sigma\\_j<\\_i \\sigma\\_j\\delta\\_j) is accumulated transmittance and \\delta\\_i is the distance between adjacent samples",
        "C(r) = \\Sigma\\_i \\sigma\\_i c\\_i / \\Sigma\\_i \\sigma\\_i, a weighted average of sample colours by density",
        "C(r) = c\\_n where n = argmax \\sigma\\_i, the colour of the densest sample along the ray",
        "C(r) = \\Sigma\\_i exp(−\\sigma\\_i) c\\_i, where higher density means lower contribution",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: The NeRF volume rendering equation is C(r) = \\int T(t)\\sigma(r(t))c(r(t),d)dt where T(t) = exp(−\\int\\_0\\^t \\sigma(r(s))ds).\n\n**Step 2**: The discrete form: C(r) = \\Sigma\\_i T\\_i \\alpha\\_i c\\_i, with \\alpha\\_i = 1−exp(−\\sigma\\_i\\delta\\_i) (opacity at sample i) and T\\_i = \\Pi\\_j<\\_i(1−\\alpha\\_j) (transmittance reaching sample i).\n\n**Step 3**: This is the standard Porter-Duff alpha compositing formula applied along the ray.",
      hints: [
        "T\\_i represents the fraction of light that passes through all samples before i without being absorbed.",
        "\\alpha\\_i = 1−exp(−\\sigma\\_i\\delta\\_i) is the probability of the ray hitting a particle in interval \\delta\\_i - the discrete opacity.",
      ],
    },
    {
      id: "q-cv3d-kp6-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "NeRF\'s positional encoding \\gamma(p) maps coordinate p to [sin(2⁰\\pip), cos(2⁰\\pip), sin(2¹\\pip), cos(2¹\\pip), …, sin(2^(L-1)\\pip), cos(2^(L-1)\\pip)]. If L=10, what is the output dimensionality of \\gamma applied to a single scalar input?",
      options: [
        "10 (one value per frequency level)",
        "20 (sin and cos at each of L=10 levels)",
        "40 (input + all encoding components for a 3D point)",
        "60 (for a 3D point + 2D direction with L=10 and L=4 respectively)",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1**: For a single scalar, \\gamma produces 2L values (sin and cos at each of L frequency levels).. With L=10: 2\\times10=20 values.\n\n**Step 2**: For a 3D point (x,y,z), NeRF applies \\gamma independently to each coordinate and concatenates, giving 3\\times2L = 60 values.. The full input to the MLP also appends the original coordinates: 3 + 60 = 63.\n\n**Step 3**: For viewing direction (2D spherical), L=4 gives 2\\times2\\times4 = 16 + 2 = 18 values.",
      hints: [
        "Two components (sin and cos) per frequency level \\times L levels = 2L values per scalar input.",
        "A 3D point uses \\gamma on each of x, y, z: 3 \\times (2\\times10) = 60, plus the raw input = 63.",
      ],
    },
    {
      id: "q-cv3d-kp6-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'NeRF uses a hierarchical sampling strategy with "coarse" and "fine" networks. After evaluating the coarse network at Nc=64 uniform samples to get density estimates, how does the fine network decide where to place its Nf=128 additional samples?',
      options: [
        "The coarse density estimates define a piecewise constant PDF along the ray; inverse CDF sampling (importance sampling) draws Nf samples proportional to the expected colour contribution T\\_i\\alpha\\_i - concentrating samples near surfaces",
        "The fine network samples uniformly between the two coarse samples with the highest density",
        "The fine network uses the coarse network\'s output as a learned proposal and samples by gradient ascent on density",
        "The fine network always samples at the midpoints between adjacent coarse samples, doubling spatial resolution",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: After the coarse pass, NeRF normalises the per-sample weights w\\_i = T\\_i\\alpha\\_i to form a probability distribution along the ray.. Inverse-transform sampling draws Nf additional samples from this distribution (concentrated where w\\_i is high, i.e., near surfaces).\n\n**Step 2**: The final fine render evaluates the fine MLP at all Nc+Nf samples.. This concentrates computation near actual scene surfaces rather than in empty space.\n\n**Step 3**: ",
      hints: [
        "The coarse weights w\\_i = T\\_i\\alpha\\_i represent each sample\'s contribution to the rendered colour - high weight = likely near a surface.",
        "Inverse CDF sampling: sort uniform samples [0,1] through the CDF of the weight distribution to get denser samples near peaks.",
      ],
    },
  ],

  "instant-ngp": [
    {
      id: "q-cv3d-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Instant-NGP uses a multi-resolution hash encoding with L levels and hash tables of size T. If L=16 levels ranging from resolution 16 to 512, and T=2^19 entries per level, how many total trainable parameters does the hash encoding have (using 2 features per entry)?",
      options: [
        "2^19 \\times 2 = 1M parameters (one level only)",
        "16 \\times 2^19 \\times 2 = 16M parameters total across all levels",
        "16 \\times 512\\^2 \\times 2 \\approx 8M (using full grid at finest resolution)",
        "2^(19\\times16) parameters (exponential growth with levels)",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1**: Each of the L=16 hash table levels has T=2^19 \\approx 524K entries, each storing F=2 features.\n\n**Step 2**: Total = L \\times T \\times F = 16 \\times 524288 \\times 2 = 16,777,216 \\approx 16.8M parameters.\n\n**Step 3**: This is far fewer than a full voxel grid at the finest resolution (512\\^3 \\times 2 = 268M), yet achieves comparable quality because multi-resolution encoding with a small MLP is sufficient.",
      hints: [
        "Total = L levels \\times T entries/level \\times F features/entry.",
        "16 \\times 2^19 \\times 2 = 16 \\times 524288 \\times 2 \\approx 16.8M.",
      ],
    },
    {
      id: "q-cv3d-kp7-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The multi-resolution hash encoding in Instant-NGP stores feature vectors at L levels with geometrically increasing spatial resolution from N_min to N_max, so that coarser levels capture low-frequency structure and finer levels capture high-frequency detail.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: Instant-NGP uses L resolution levels with resolution Nₗ = ⌊N_min \\times b^l⌋ where growth factor b = (N_max/N_min)^(1/(L−1)).\n\n**Step 2**: Typical values: N_min=16, N_max=512, L=16, giving b\\approx1.45.\n\n**Step 3**: Features from all L levels are concatenated and fed to a small MLP (2 hidden layers of 64 units), enabling the model to represent both global structure (coarse grid) and fine details (fine grid).",
      hints: [
        "Think of an image pyramid: coarse levels capture shape; fine levels capture texture.",
        "The MLP synthesises across all L levels, learning which frequencies contribute to each scene region.",
      ],
    },
    {
      id: "q-cv3d-kp7-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Hash collisions in the multi-resolution hash encoding of Instant-NGP (different 3D positions mapping to the same hash table entry) are handled by:",
      options: [
        "Accepting collisions without explicit resolution: the MLP and multi-level redundancy average out collision artifacts - coherent geometric signals dominate over incoherent collisions, empirically causing minimal quality loss",
        "Using a collision-free perfect hash function precomputed for each scene via a separate initialisation pass",
        "Storing collision chains (linked lists) at each hash entry, as in traditional hash maps",
        "Increasing hash table size T until the expected collision probability per cell is below 0.1%",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Instant-NGP deliberately does not resolve hash collisions.. The key insight: two 3D positions that collide at one resolution level are very unlikely to collide at all L levels simultaneously.\n\n**Step 2**: At each level, colliding positions experience different collisions, so their multi-level feature vectors remain distinguishable.. The MLP learns to ignore the resulting feature noise.\n\n**Step 3**: Empirically, tables with T=2^19 in 3D scenes show minimal quality degradation from collisions.",
      hints: [
        "Hash collision at one level rarely coincides with collisions at other levels - multi-resolution redundancy dilutes the artifact.",
        "Traditional hash maps resolve collisions for correctness; NeRF hash tables sacrifice correctness for speed and rely on learning to compensate.",
      ],
    },
  ],

  "gaussian-splatting": [
    {
      id: "q-cv3d-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "3D Gaussian Splatting represents the scene as a set of 3D Gaussians. Each Gaussian\'s 3D covariance \\Sigma is parameterised as \\Sigma = RSS^T R^T. Why is this decomposition used instead of directly optimising \\Sigma?",
      options: [
        "Because \\Sigma = RSS^T R^T (R = rotation matrix from quaternion q, S = diagonal scaling matrix) ensures \\Sigma stays symmetric and positive semi-definite throughout optimisation - direct gradient updates on \\Sigma entries can produce invalid non-PSD matrices",
        "Because this decomposition reduces the number of parameters from 9 to 6 by eliminating redundant off-diagonal entries",
        "Because R and S can be optimised with different learning rates, making training more stable",
        "Because storing R and S separately enables faster GPU matrix multiplication during rendering",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: A valid 3D covariance matrix must be symmetric positive semi-definite (PSD).\n\n**Step 2**: Direct gradient updates on \\Sigma's 9 entries can violate PSD during training.\n\n**Step 3**: Decomposing \\Sigma = R\\cdotS\\cdotS^T\\cdotR^T where R is a rotation (stored as quaternion q, 4 params) and S is a diagonal scale matrix (3 params) guarantees PSD by construction: any matrix of the form RSS^T R^T is PSD.",
      hints: [
        "A covariance matrix \\Sigma = A^T A is always PSD. What structure guarantees this while remaining differentiable?",
        "Quaternion \\to rotation matrix keeps R orthogonal; scaling S along axes keeps ellipsoid axes aligned.",
      ],
    },
    {
      id: "q-cv3d-kp8-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "3D Gaussian Splatting renders pixel colour C by front-to-back alpha compositing: C = \\Sigma\\_i c\\_i \\alpha\\_i \\Pi\\_j<\\_i (1 − \\alpha\\_j), where \\alpha\\_i = o\\_i \\cdot exp(−½(x−\\mu\\_2ᴅ)^T \\Sigma\\_2ᴅ\\^{-1} (x−\\mu\\_2ᴅ)) evaluates the projected 2D Gaussian at pixel position x.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: After projecting each 3D Gaussian to a 2D Gaussian (via the Jacobian of the projective transform), 3DGS composes pixel colour front-to-back: C = \\Sigma\\_i c\\_i\\alpha\\_i\\Pi\\_j<\\_i(1−\\alpha\\_j).\n\n**Step 2**: Here \\alpha\\_i = o\\_i\\cdotG\\_2ᴅ(x) is the product of learned opacity o\\_i and the 2D Gaussian value at pixel x.\n\n**Step 3**: This is exactly the same alpha-compositing formula as NeRF\'s volume rendering but evaluated in 2D after splatting - enabling the fast tile-based GPU rasterizer.",
      hints: [
        "Compare to NeRF\'s C(r) = \\Sigma\\_i T\\_i\\alpha\\_ic\\_i: 3DGS uses the same compositing formula but Gaussians are already projected to 2D.",
        "Front-to-back ordering is achieved by sorting Gaussians by depth before rasterisation.",
      ],
    },
    {
      id: "q-cv3d-kp8-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the adaptive density control strategy in 3D Gaussian Splatting, and why is it necessary?",
      options: [
        "Gaussians are periodically split (when too large - positional gradient magnitude exceeds threshold \\tau_pos) or cloned (when too small - in under-reconstructed regions), and those with opacity \\alpha\\_i below threshold \\epsilon_\\alpha are pruned - adapting the number and placement of Gaussians to scene complexity",
        "The number of Gaussians is fixed at initialisation and only their parameters (position, covariance, opacity, colour) are optimised throughout training",
        "Gaussians are densified by adding new ones at positions with high photometric loss, and merged when two Gaussians overlap (IoU > 0.9) to prevent redundancy",
        "A fixed densification schedule adds Gaussians every N iterations at random scene positions regardless of reconstruction quality",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Adaptive density control monitors the L1 norm of positional gradients \\nabla\\mu accumulated over training.. When ||\\nabla\\mu|| > \\tau_pos: if the Gaussian is large (large scale S), split it into two smaller ones; if small, clone it to cover under-reconstructed regions.\n\n**Step 2**: Periodically, Gaussians with opacity \\alpha\\_i < \\epsilon_\\alpha are pruned.. Gaussians that grow too large (exceeding world-space or screen-space size thresholds) are also split.\n\n**Step 3**: This adapts the Gaussian count from typically ~100K (SfM initialisation) to millions.",
      hints: [
        "High positional gradient magnitude signals that the Gaussian is being pulled in conflicting directions - it needs to split to resolve ambiguity.",
        "Under-reconstruction (high loss region with small Gaussians) \\to clone; over-reconstruction (one Gaussian covers too much) \\to split.",
      ],
    },
  ],

  "dynamic-nerf": [
    {
      id: "q-cv3d-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Dynamic NeRF methods extend static NeRF to handle time-varying scenes. What fundamental change is needed to the input of the NeRF MLP?",
      options: [
        "Adding a time coordinate t to the MLP input: f(x, y, z, t, \\theta, \\phi) \\to (r, g, b, \\sigma), so the radiance field is conditioned on time and can represent different scene states at different frames",
        "Running a separate static NeRF for each video frame independently, then interpolating between frame-specific NeRFs at novel times",
        "Replacing the viewing direction with a temporal direction vector that encodes motion blur",
        'Adding a binary "moving/static" flag per 3D point predicted by a separate motion segmentation network',
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: The simplest dynamic NeRF extension conditions the network on time t: f(\\gamma(x), \\gamma(t), d) \\to (c, \\sigma).\n\n**Step 2**: More structured approaches like D-NeRF factor this as a canonical field + deformation: f_canonical(\\gamma(x + \\Deltax(x,t))) where \\Deltax is a learned deformation.\n\n**Step 3**: Others (HexPlane, K-Planes) use 4D feature grids factored across space-time planes for efficiency.",
      hints: [
        "Static NeRF: f(x,y,z,\\theta,\\phi). Adding t makes it time-aware: f(x,y,z,t,\\theta,\\phi).",
        "The scene changes over time - the MLP must receive time as a conditioning signal.",
      ],
    },
    {
      id: "q-cv3d-kp9-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "D-NeRF models dynamic scenes by learning a deformation field \\Deltax = MLP_deform(\\gamma(x), \\gamma(t)) that maps query points from world space at time t back to a canonical space, then evaluating a canonical NeRF at x + \\Deltax.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: D-NeRF uses two MLPs: (1) deformation MLP: (\\gamma(x), \\gamma(t)) \\to \\Deltax, predicting the displacement to map position x at time t to canonical space; (2) canonical NeRF: \\gamma(x + \\Deltax) \\to (c, \\sigma).\n\n**Step 2**: Volume rendering composites colours and densities from the canonical field.\n\n**Step 3**: This canonical-space approach is compact but requires the topology to remain fixed across time (no appearance/disappearance of scene parts).",
      hints: [
        'Canonical space is a fixed reference pose - all time steps are "undeformed" to it before colour/density lookup.',
        "The deformation field handles motion; the canonical NeRF handles appearance - a two-network factorisation.",
      ],
    },
    {
      id: "q-cv3d-kp9-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "HexPlane and K-Planes represent dynamic scenes as products of 2D feature planes. For a 4D spacetime scene (x,y,z,t), how many planes does HexPlane use and what are their axes?",
      options: [
        'HexPlane uses 6 planes (the "hex" in HexPlane): the three spatial planes XY, XZ, YZ and three spacetime planes XT, YT, ZT - features from all 6 planes are sampled by projection and multiplied element-wise to produce the 4D feature at any (x,y,z,t)',
        "HexPlane uses 4 planes: one per axis (X, Y, Z, T) arranged in a tetrahedral grid",
        "HexPlane uses 3 planes: XY for spatial, XT for horizontal motion, YT for vertical motion",
        "HexPlane uses 6 planes arranged as cube faces, one per axis-aligned face of the 3D spatial volume",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: HexPlane (Cao & Johnson, 2023) decomposes the 4D radiance field using 6 axis-aligned 2D planes: {XY, YZ, XZ} (pure spatial) + {XT, YT, ZT} (spatial-temporal).\n\n**Step 2**: For a query (x,y,z,t), features from all 6 planes are sampled by projecting the query onto each plane\'s two axes, then element-wise multiplied (Hadamard product).\n\n**Step 3**: This 6-plane product approximates the full 4D tensor at O(res\\^2) cost instead of O(res\\^4).",
      hints: [
        "4D spacetime has C(4,2) = 6 axis pairs - one plane per pair: (x,y),(x,z),(y,z),(x,t),(y,t),(z,t).",
        "Multiplying plane features (Hadamard product) approximates 4D tensor decomposition, like CP/Tucker decomposition.",
      ],
    },
  ],

  "generative-nerf": [
    {
      id: "q-cv3d-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does a 3D-aware generative model (e.g., EG3D, GRAF) provide that a standard 2D GAN cannot?",
      options: [
        "The ability to generate consistent multi-view images of a scene from any viewpoint, with explicit 3D structure encoded in the generative model rather than just 2D image appearance",
        "Higher image resolution by using 3D convolutions instead of 2D convolutions in the generator",
        "Faster training convergence because 3D representations are more data-efficient than 2D",
        "Semantic editing of generated images by modifying 3D segmentation masks",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Standard 2D GANs generate single images with no notion of 3D structure; 3D-aware GANs encode a NeRF or other 3D representation in the generator, enabling rendering from any viewpoint with multi-view consistency - the same latent code produces coherent images from all angles.",
      hints: [
        "Think about generating a face from a 2D GAN vs. rotating a 3D face model - what is the key difference?",
        "Multi-view consistency is the key property that 3D-aware models provide.",
      ],
    },
    {
      id: "q-cv3d-kp10-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "EG3D uses a tri-plane representation (three orthogonal feature planes) as an efficient 3D-aware generator backbone, trading full 3D volume resolution for much lower memory and computation cost.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: EG3D represents 3D features using three axis-aligned 2D feature planes (XY, XZ, YZ); for any 3D query point, features are sampled from all three planes by projection and aggregation, providing approximate 3D spatial structure at the cost of ambiguities that full voxel grids avoid but at a fraction of the memory.",
      hints: [
        "Think about projecting a 3D point onto each of the three coordinate planes - you get three 2D feature vectors.",
        "This is a compression trick: three 2D planes approximate a full 3D volume much more efficiently.",
      ],
    },
    {
      id: "q-cv3d-kp10-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What training signal does GRAF (Generative Radiance Fields) use to train a 3D-aware GAN without 3D supervision?",
      options: [
        "Adversarial loss between rendered novel-view patches and real image patches sampled at the same resolution, using a 2D discriminator that operates on rendered image patches - no 3D ground truth is needed",
        "Per-pixel reconstruction loss against ground truth multi-view images with known camera poses",
        "Contrastive loss that pushes same-scene renderings from different views to have similar latent codes",
        "Point cloud supervision from depth sensors co-registered with the training images",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: GRAF trains adversarially: the NeRF-based generator renders patches at randomly sampled camera poses, and a 2D patch discriminator distinguishes rendered patches from real image patches sampled at the same camera distribution - enabling 3D-aware generation with only unposed 2D image supervision.",
      hints: [
        "Think about how GAN training can work with only real images - the discriminator compares rendered vs. real patches.",
        "Camera pose is randomly sampled at training, not required as a label.",
      ],
    },
  ],

  sfm: [
    {
      id: "q-cv3d-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Structure from Motion (SfM) takes unordered images as input and produces which two outputs?",
      options: [
        "A sparse 3D point cloud of scene points and 6-DoF camera poses (rotation R, translation t) for each registered image",
        "Dense depth maps for each image and a 3D mesh of the scene surface",
        "Surface normals and albedo values for every reconstructed point",
        "Object segmentation masks and 3D bounding boxes for all scene objects",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: SfM simultaneously recovers: (1) the 3D positions of feature-matched scene points (sparse point cloud, typically from SIFT/SuperPoint matches across image pairs); (2) the 6-DoF camera poses [R|t] and optionally intrinsics K for each image.\n\n**Step 2**: This is solved via incremental registration + bundle adjustment.\n\n**Step 3**: COLMAP is the standard SfM pipeline, outputting cameras.bin/txt (poses + intrinsics) and points3D.bin/txt (sparse point cloud).",
      hints: [
        '"Structure" = 3D point positions. "Motion" = camera poses. SfM recovers both.',
        "COLMAP outputs cameras.bin/txt (poses + intrinsics) and points3D.bin/txt (sparse point cloud).",
      ],
    },
    {
      id: "q-cv3d-kp11-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "COLMAP uses incremental SfM: it starts with an initial pair of images, registers new images one at a time using PnP+RANSAC, and runs bundle adjustment periodically to refine all camera poses and 3D points jointly.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: COLMAP\'s incremental pipeline: (1) select initial pair maximising homography inlier ratio (ensures good baseline); (2) two-view reconstruction with 5-point essential matrix estimation; (3) iteratively select next image with most 2D-3D correspondences to registered points; (4) register via PnP (given 3D points and 2D observations) with RANSAC; (5) triangulate new points; (6) local bundle adjustment (BA) over recent images; (7) global BA periodically.\n\n**Step 2**: This prevents drift accumulation.",
      hints: [
        "PnP (Perspective-n-Point) solves for camera pose given known 3D-2D correspondences - used each time a new image is added.",
        "RANSAC handles mismatched correspondences; bundle adjustment corrects accumulated errors across the entire registered set.",
      ],
    },
    {
      id: "q-cv3d-kp11-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Bundle adjustment minimizes which objective function over all camera poses {R\\_i, t\\_i} and 3D point positions {X\\_j}?",
      options: [
        "\\Sigma\\_i\\_j ||x\\_i\\_j − \\pi(R\\_i, t\\_i, K\\_i, X\\_j)||\\^2 summed over all observed feature point correspondences (i=image, j=point), where \\pi is the projection function mapping 3D points to 2D image coordinates",
        "\\Sigma\\_i\\_j ||X\\_j − R\\_i\\^T(K\\_i\\^{-1}x\\_i\\_j \\cdot d\\_i\\_j − t\\_i)||\\^2, the 3D position error between triangulated and estimated points",
        "\\Sigma\\_i\\_j (1 − cos(angle(R\\_i X\\_j + t\\_i, x\\_i\\_j))), the angular error between observed and predicted ray directions",
        "\\Sigma\\_i ||log(R\\_iR\\_i₋\\_1\\^T)||\\^2 + \\Sigma\\_j ||X\\_j − X̄||\\^2, regularising camera rotation smoothness and point dispersion",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Bundle adjustment (Triggs et al.. 2000) minimises total reprojection error: \\Sigma\\_i\\_j \\rho(||x\\_i\\_j − \\pi(R\\_i, t\\_i, K\\_i, X\\_j)||\\^2) where \\rho is a robust kernel (e.g., Huber or Cauchy) to suppress outlier correspondences.\n\n**Step 2**: \\pi is the full projection: \\pi(R,t,K,X) = K\\cdot(RX+t) followed by perspective division.. Solved with Levenberg-Marquardt on the sparse Jacobian (sparsity comes from each observation involving only one camera and one point).\n\n**Step 3**: ",
      hints: [
        "Reprojection error = distance in pixels between where we observed a feature and where the 3D point projects through the camera.",
        "The Jacobian of reprojection error w.r.t. all poses and points is sparse - each residual only involves one camera and one point.",
      ],
    },
  ],

  mvs: [
    {
      id: "q-cv3d-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the goal of Multi-View Stereo (MVS) and how does it differ from SfM?",
      options: [
        "MVS produces a dense 3D reconstruction (dense point cloud or mesh) from images with known camera poses (typically from SfM), whereas SfM recovers sparse point clouds and camera poses from unordered images",
        "MVS works on unordered images while SfM requires ordered video sequences",
        "MVS uses only two views (stereo) while SfM uses multiple views",
        "MVS produces camera trajectories while SfM produces object models",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: SfM produces sparse reconstructions and camera poses; MVS takes the registered cameras from SfM and performs dense matching across multiple views to recover per-pixel depth at all image pixels, yielding dense point clouds or meshes of the scene.",
      hints: [
        "Think of SfM as the sparse skeleton and MVS as filling in the dense flesh.",
        "MVS assumes cameras are known - that\'s what SfM provides as input.",
      ],
    },
    {
      id: "q-cv3d-kp12-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Learning-based MVS methods like MVSNet build a cost volume by warping source image features onto a set of depth hypothesis planes in reference camera space and aggregating them to estimate per-pixel depth.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: MVSNet warps source view feature maps onto depth hypothesis planes in the reference frame using differentiable homography warping, builds a 3D cost volume by averaging warped features from all source views, and applies 3D convolutions to regularize and regress depth - enabling end-to-end learning of MVS.",
      hints: [
        "Think about hypothesis planes as virtual surfaces at different depths - if a source feature matches the reference at a specific plane, that depth is correct.",
        "The cost volume measures multi-view photometric consistency at each depth hypothesis.",
      ],
    },
    {
      id: "q-cv3d-kp12-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary scalability challenge of traditional MVSNet-style cost volume methods, and how do methods like CasMVSNet address it?",
      options: [
        "The 3D cost volume grows linearly with the number of depth hypotheses and quadratically with image resolution, causing GPU memory issues for high-resolution inputs; CasMVSNet uses a coarse-to-fine cascade that progressively narrows the depth range, dramatically reducing memory at each stage",
        "MVSNet requires O(N\\^2) feature matching between all image pairs, scaling poorly to large image sets; CasMVSNet reduces this with approximate nearest-neighbor feature matching",
        "The cost volume aggregation with 3D convolutions is too slow for real-time use; CasMVSNet replaces 3D convolutions with 2D convolutions on flattened depth slices",
        "MVSNet is limited to 2 source views; CasMVSNet extends it to unlimited source views using attention pooling",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: A full-resolution cost volume with D depth hypotheses and H\\timesW image resolution requires O(H\\timesW\\timesD) memory, which is prohibitive at high resolution; CasMVSNet builds cost volumes at multiple resolutions in a cascade, using coarse predictions to narrow the depth search range at each finer stage, reducing total memory and computation.",
      hints: [
        "Think about how much memory a 3D tensor with 192 depth planes at 1080p image resolution would need.",
        "A coarse-to-fine strategy first finds the approximate depth range, then refines within it at high resolution.",
      ],
    },
  ],

  "object-pose": [
    {
      id: "q-cv3d-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does 6-DoF object pose estimation recover?",
      options: [
        "The full rigid body transformation (3D rotation and 3D translation) of a known object relative to the camera frame",
        "The 2D bounding box and depth of an object in the image",
        "The semantic category and instance ID of each object in the scene",
        "The surface normals and material properties of each detected object",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: 6-DoF pose estimation recovers all six degrees of freedom of a rigid object\'s pose relative to the camera: 3 DoF rotation (SO(3)) and 3 DoF translation - enabling the robot or system to know exactly where the object is and how it is oriented in 3D space.",
      hints: [
        "Think about what a robotic arm needs to know to grasp a specific object - its full 3D position and orientation.",
        "6 DoF = 3 for rotation (roll, pitch, yaw) + 3 for translation (x, y, z).",
      ],
    },
    {
      id: "q-cv3d-kp13-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PVNet (Pixel-wise Voting Network) estimates 6-DoF pose by predicting the 2D image locations of predefined 3D keypoints on the object surface and then solving for pose using PnP (Perspective-n-Point).",
      correctAnswer: "true",
      explanation:
        "**Step 1**: PVNet trains a CNN to predict per-pixel unit vectors pointing toward each object keypoint; votes from all pixels are aggregated (RANSAC voting) to estimate 2D keypoint locations, and PnP with known 3D keypoint positions solves for the 6-DoF camera-to-object transformation.",
      hints: [
        "PnP solves for pose given known 3D points and their 2D image projections.",
        "Per-pixel voting aggregates evidence from many pixels, making keypoint localization robust to occlusion.",
      ],
    },
    {
      id: "q-cv3d-kp13-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What training strategy allows metric depth models like UniDepth to generalize to scenes with unknown camera intrinsics, rather than requiring known focal length as input?",
      options: [
        "Jointly predicting camera intrinsics (focal length, principal point) as an auxiliary output alongside depth, so the model learns to estimate its own geometric calibration from image content",
        "Augmenting training data with random focal length perturbations so the model learns to ignore focal length",
        "Using a NeRF to reconstruct the novel object online and then applying standard pose estimation on the NeRF",
        "Predictinging pose directly from language descriptions of the object\'s appearance without any visual template",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: UniDepth and similar models predict camera intrinsics as part of the network output, learning to estimate focal length and principal point from image content (e.g., perspective cues, vanishing points); this removes the dependency on known calibration at inference time.",
      hints: [
        "Think about how humans estimate distance without knowing their eye\'s focal length - they use scene geometry cues.",
        "If the model can predict what camera was used, it can correct for scale without being given intrinsics.",
      ],
    },
  ],

  "hand-pose": [
    {
      id: "q-cv3d-kp14-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the standard skeletal representation used in 3D hand pose estimation?",
      options: [
        "A kinematic skeleton of 21 joints (wrist + 4 joints per finger) with 3D joint positions in camera or world coordinates",
        "A dense point cloud of the hand surface sampled uniformly at 1024 points",
        "A graph of fingertip positions only (5 points) connected to the palm center",
        "A set of 3D bounding boxes, one per finger segment, representing each bone",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: The standard hand pose representation consists of 21 3D keypoints: 1 wrist + 4 joints per finger (MCP, PIP, DIP, fingertip) \\times 5 fingers; estimating these keypoints in 3D camera space is the primary task in hand pose benchmarks like FreiHAND and HO-3D.",
      hints: [
        "Think about how many joints a human hand has - count the knuckles per finger.",
        "Most pose estimation benchmarks define a canonical set of keypoints for comparison.",
      ],
    },
    {
      id: "q-cv3d-kp14-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "SMPL-X (Expressive Body Model) is a parametric model that jointly represents body pose, hand pose, and facial expressions as a low-dimensional parameter vector, enabling full human body reconstruction from images.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: SMPL-X extends SMPL to include hands (using MANO model articulation) and face (FLAME model expressions), representing the entire human body - including finger joints and facial action units - with a compact parameter vector that can be regressed from images for full expressive body reconstruction.",
      hints: [
        'Think about what "parametric" means - a small set of parameters controls the full 3D shape and pose.',
        "SMPL-X extends the body model to also control fingers and face, making it fully expressive.",
      ],
    },
    {
      id: "q-cv3d-kp14-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the primary challenge of estimating 3D hand pose from a single RGB image (without depth), and how do recent methods address it?",
      options: [
        "Depth ambiguity and severe self-occlusion make 3D lifting from 2D ill-posed; recent methods combine 2D heatmap-based joint detection with a parametric hand model (MANO) fitted via differentiable rendering or learned model parameter regression to resolve ambiguity",
        "RGB images lack sufficient texture detail near fingertips for accurate detection",
        "Hands move too quickly for standard cameras, requiring high-speed cameras for accurate pose",
        "Hand pose estimation is limited to front-facing views and fails for side or back-of-hand views",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Monocular hand pose estimation is ambiguous because many 3D configurations project to the same 2D image; self-occlusion (fingers hiding each other) worsens this.\n\n**Step 2**: Methods like Pose2Mesh, HandOccNet, and METRO use parametric hand models (MANO) whose anatomical constraints reduce the solution space and resolve ambiguities from single-view RGB.",
      hints: [
        "Think about how many different 3D hand poses could produce the same 2D image - depth ambiguity is severe.",
        "A parametric model provides prior knowledge about valid hand shapes and joint limits.",
      ],
    },
  ],

  "scene-flow": [
    {
      id: "q-cv3d-kp15-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is scene flow, and how does it differ from optical flow?",
      options: [
        "Scene flow is the 3D motion field describing how each point in 3D space moves between two frames; optical flow is the corresponding 2D projection of motion onto the image plane",
        "Scene flow estimates camera ego-motion only, while optical flow estimates all pixel motions including dynamic objects",
        "Scene flow requires depth sensors while optical flow is purely image-based and does not need depth",
        "Scene flow is computed from single images while optical flow requires a video sequence",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Scene flow generalizes optical flow to 3D: it is a dense vector field of 3D displacement for every point in the scene between two time steps; optical flow is its 2D image-plane projection, losing depth motion information.\n\n**Step 2**: Scene flow can be estimated from stereo or RGB-D sequences.",
      hints: [
        "Optical flow is 2D (pixel displacement in x, y); scene flow adds the z (depth) component.",
        "Think about a ball flying toward the camera - optical flow shows it growing in the image, scene flow shows it moving in 3D.",
      ],
    },
    {
      id: "q-cv3d-kp15-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "FlowNet3D estimates scene flow directly from point clouds by using PointNet++-style set abstraction layers and a flow embedding layer that aggregates spatial proximity and feature similarity between two point clouds.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: FlowNet3D processes two point clouds jointly using PointNet++ set abstraction for feature extraction and a flow embedding module that mixes features from nearby points in both clouds based on spatial distance and feature affinity - directly regressing 3D flow vectors without optical flow or stereo matching.",
      hints: [
        "Think about how to find correspondences between two point clouds - nearby points with similar features are likely the same surface.",
        "The flow embedding layer is the key innovation: it computes motion by comparing features across the two point clouds.",
      ],
    },
    {
      id: "q-cv3d-kp15-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the "ego-motion" decomposition challenge in scene flow estimation for autonomous driving?',
      options: [
        "The observed point cloud motion is a combination of camera ego-motion (the car moving) and independent object motion; scene flow methods must disentangle these to accurately estimate flow of dynamic objects like pedestrians and other vehicles",
        "Ego-motion refers to the rotation of the LiDAR sensor during one scan, causing distortion that must be corrected before flow estimation",
        "Scene flow methods must predict where the ego vehicle will be in the future as part of the flow estimation task",
        "Ego-motion compensation requires GPS/IMU and cannot be estimated from point cloud data alone",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: In autonomous driving, the camera/LiDAR moves with the vehicle; the apparent motion of all points includes both the ego-vehicle\'s motion and the independent motion of dynamic objects; scene flow methods must separate these components to produce meaningful 3D motion estimates for perception and prediction.",
      hints: [
        "Think about how a stationary pedestrian appears to move backward when you drive past them.",
        "Removing ego-motion from the observed flow reveals which objects in the scene are actually moving.",
      ],
    },
  ],

  pointnet: [
    {
      id: "q-cv3d-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "PointNet processes N input points and produces a global shape descriptor. In what order are its three key operations applied?",
      options: [
        "(1) 3\\times3 input T-Net \\to (2) shared MLP per point \\to (3) 64\\times64 feature T-Net \\to (4) shared MLP per point \\to (5) global max pooling",
        "(1) global max pooling \\to (2) shared MLP \\to (3) T-Net alignment \\to (4) per-point features",
        "(1) KNN graph construction \\to (2) message passing \\to (3) global max pooling",
        "(1) voxelisation \\to (2) 3D CNN \\to (3) global average pooling",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: PointNet architecture: (1) input transform (T-Net predicts 3\\times3 matrix, apply to raw points); (2) shared MLP: 64-64; (3) feature transform (T-Net predicts 64\\times64 matrix, apply to 64-dim features); (4) shared MLP: 64-128-1024; (5) global max pool over N points \\to 1024-dim global descriptor.\n\n**Step 2**: The two T-Nets provide alignment invariance; max pooling provides permutation invariance.",
      hints: [
        "Total = L levels \\times T entries/level \\times F features/entry.",
        "16 \\times 2^19 \\times 2 = 16 \\times 524288 \\times 2 \\approx 16.8M.",
      ],
    },
    {
      id: "q-cv3d-kp16-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "PointNet++ improves over PointNet by hierarchically grouping local neighborhoods of points and applying a mini-PointNet within each group - analogous to how a CNN applies local filters at each spatial location before pooling.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: PointNet++ Set Abstraction (SA) layers: (1) farthest point sampling selects M centroids from N points; (2) ball query groups K points within radius r around each centroid; (3) a mini-PointNet (shared MLP + max pool) encodes each local group into a C-dim feature.\n\n**Step 2**: Stacking SA layers produces hierarchical feature abstraction: local geometry first, then progressively larger structures - just like CNN conv\\topool stacks.",
      hints: [
        "PointNet processes all N points with global max pool - it cannot model local neighbourhoods.",
        "PointNet++ is to PointNet as a CNN is to a global average pooling classifier.",
      ],
    },
    {
      id: "q-cv3d-kp16-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "PointNet\'s feature transform T-Net predicts a 64\\times64 matrix applied to intermediate features. A regularisation term is added to the loss: L_reg = ||I − AA\\^T||\\^2_F. What does this term enforce?",
      options: [
        "It encourages the predicted 64\\times64 transform matrix A to be approximately orthogonal (close to a rotation), preventing the high-dimensional feature transform from learning arbitrary distortions that would destabilise training",
        "It forces the transform matrix to be the identity, preventing the feature alignment from modifying features",
        "It ensures the L2 norm of A equals 1 (unit matrix norm) for stable gradient flow",
        "It regularises the weight norms of the T-Net\'s own MLP layers, not the predicted transform",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: L_reg = ||I − AA\\^T||\\^2_F with weight 0.001 encourages A to be orthogonal: if A is orthogonal then AA\\^T = I and the loss is 0.\n\n**Step 2**: Orthogonal transforms are length-preserving (isometries) - they rotate/reflect feature space without distorting distances.\n\n**Step 3**: Without this constraint, the 64\\times64 transform can be ill-conditioned, causing training instability (much harder to optimise than the 3\\times3 input transform).",
      hints: [
        "For an orthogonal matrix A: AA\\^T = I. The loss ||I − AA\\^T||\\^2_F = 0 when A is perfectly orthogonal.",
        "64\\times64 = 4096 unconstrained parameters is a lot - without regularisation, the transform can easily become ill-conditioned.",
      ],
    },
  ],

  "voxel-methods": [
    {
      id: "q-cv3d-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "An outdoor LiDAR scene is voxelised at 0.1m resolution over a 200\\times200\\times4m volume (BEV extent \\times height). What fraction of the resulting voxels are typically non-empty with a 64-beam LiDAR producing ~100K points?",
      options: [
        "Nearly 100% - all voxels within the LiDAR range are filled",
        "About 1-5% - LiDAR points from a single sweep occupy only a tiny fraction of the total voxel grid",
        "About 50% - half of outdoor voxels contain at least one return",
        "About 20% - the typical urban scene fills roughly one fifth of the voxels",
      ],
      correctAnswer: 1,
      explanation:
        "**Step 1**: Total voxels = (200/0.1) \\times (200/0.1) \\times (4/0.1) = 2000 \\times 2000 \\times 40 = 160M voxels.. With ~100K LiDAR points and averaging ~3 points per occupied voxel, approximately 33K non-empty voxels \\approx 0.02% fill rate.\n\n**Step 2**: Even accounting for multi-return density, occupancy rarely exceeds 5%.. This extreme sparsity motivates sparse convolution (e.g., SpConv, MinkowskiEngine) which skips empty voxels entirely.\n\n**Step 3**: ",
      hints: [
        "Total voxels = (200/0.1)\\^2 \\times (4/0.1) = 2000\\^2 \\times 40 = 160M. 100K points / 160M voxels \\approx 0.06%.",
        "Dense 3D CNNs would compute at 160M locations; sparse conv computes only at ~33K occupied ones.",
      ],
    },
    {
      id: "q-cv3d-kp17-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "VoxelNet first applies a Voxel Feature Encoding (VFE) layer that processes the variable number of points within each voxel using a shared MLP and element-wise max pooling, producing a fixed-length feature vector per voxel that is then processed by 3D convolutions.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: VoxelNet VFE: (1) for each non-empty voxel, compute point-level features: for each point in the voxel, concatenate [x, y, z, r, \\Deltax, \\Deltay, \\Deltaz] where \\Delta are offsets from the voxel centroid; (2) shared MLP transforms each point to a 128-dim feature; (3) element-wise max pooling over all points in the voxel \\to 128-dim voxel feature.\n\n**Step 2**: These fixed-size voxel features are scattered into a sparse 3D tensor for subsequent 3D CNN processing and final BEV detection.",
      hints: [
        "VFE is PointNet-style: shared MLP per point (order-invariant) + max pooling (permutation-invariant) within the voxel.",
        "The output is one fixed-length vector per non-empty voxel, regardless of how many points it contains.",
      ],
    },
    {
      id: "q-cv3d-kp17-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'Minkowski Engine (SECOND, SPVCNN) uses generalised sparse convolution. What makes its convolution "generalised" compared to standard sparse convolution?',
      options: [
        "It supports sparse convolution on arbitrary-dimensional integer-coordinate spaces (not just 3D) using a generalised sparse tensor abstraction - enabling the same framework for 3D spatial data, 4D space-time data, and even higher-dimensional inputs without architecture changes",
        "It uses learned kernel weights that vary spatially across the feature map, unlike standard conv with shared weights",
        "It supports non-cubic anisotropic kernel shapes aligned to the principal axes of the point cloud",
        "It performs convolution in the frequency domain using a sparse FFT for faster computation",
      ],
      correctAnswer: 0,
      explanation:
        '**Step 1**: Minkowski Engine defines sparse tensors as (coordinate, feature) pairs where coordinates are integer-valued tuples of any dimension D.\n\n**Step 2**: "Generalised" means the same Conv, BN, ReLU framework handles D=3 (spatial LiDAR), D=4 (spatial+time for video point clouds), or D=2 (2D sparse activations).\n\n**Step 3**: This makes it a universal sparse tensor computation library - SECOND uses D=3, while video methods use D=4 space-time sparse tensors.',
      hints: [
        "Standard sparse conv: hardcoded for 3D. Minkowski Engine: dimension D is a parameter, enabling 4D (x,y,z,t) tensors.",
        '"Generalised" refers to the dimensional generality, not the spatial variability of kernel weights.',
      ],
    },
  ],

  "point-transformers": [
    {
      id: "q-cv3d-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why are transformer-based architectures natural fits for point cloud processing?",
      options: [
        "Self-attention computes pairwise interactions between all points (or local neighborhoods) without assuming any ordering, making it inherently permutation-invariant like the unordered point set itself",
        "Transformers process data sequentially, which matches the time-ordered nature of LiDAR scans",
        "Transformers use fixed receptive fields like CNNs, which map directly to voxel grid neighborhoods",
        "Transformers require fixed-size inputs, which matches the fixed-size point cloud outputs from LiDAR sensors",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Self-attention operates on sets of vectors and is permutation-equivariant by design, matching the unordered nature of point clouds; it also naturally handles variable-size point sets and captures long-range dependencies between points across the scene - making transformers a natural fit for point cloud processing.",
      hints: [
        "Think about the key property of transformers that makes them work on NLP tokens regardless of sentence length.",
        "Point clouds are sets - self-attention is a set operation that requires no ordering.",
      ],
    },
    {
      id: "q-cv3d-kp18-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Point Transformer (Zhao et al., 2021) uses a subtracted position encoding in its attention mechanism, computing attention weights based on the relative positions between points rather than absolute global positions.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: Point Transformer computes attention weights using subtracted (relative) positional encodings \\gamma(p\\_i - p\\_j), ensuring that attention is invariant to global translation of the point cloud - a desirable inductive bias for 3D shape understanding where relative geometry matters more than absolute position.",
      hints: [
        "Think about why the absolute position of a chair in a room matters less than the relative position of its legs to its seat.",
        "Relative positional encoding makes the attention focus on local geometric relationships.",
      ],
    },
    {
      id: "q-cv3d-kp18-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What training signal does GRAF (Generative Radiance Fields) use to train a 3D-aware GAN without 3D supervision?",
      options: [
        "Adversarial loss between rendered novel-view patches and real image patches sampled at the same resolution, using a 2D discriminator that operates on rendered image patches - no 3D ground truth is needed",
        "Per-pixel reconstruction loss against ground truth multi-view images with known camera poses",
        "Contrastive loss that pushes same-scene renderings from different views to have similar latent codes",
        "Point cloud supervision from depth sensors co-registered with the training images",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: GRAF trains adversarially: the NeRF-based generator renders patches at randomly sampled camera poses, and a 2D patch discriminator distinguishes rendered patches from real image patches sampled at the same camera distribution - enabling 3D-aware generation with only unposed 2D image supervision.",
      hints: [
        "Think about how GAN training can work with only real images - the discriminator compares rendered vs. real patches.",
        "Camera pose is randomly sampled at training, not required as a label.",
      ],
    },
  ],

  "3d-object-detection": [
    {
      id: "q-cv3d-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "PointPillars uses vertical pillars instead of 3D voxels. If a scene spans 70m \\times 80m and pillar size is 0.16m \\times 0.16m, how many non-empty pillars (at most) does the BEV pseudo-image have?",
      options: [
        "437.5 \\times 500 = 218,750 pillars (70/0.16 \\times 80/0.16)",
        "700 \\times 800 = 560,000 pillars (using 0.1m resolution)",
        "350 \\times 400 = 140,000 pillars (using 0.2m resolution)",
        "Unlimited - pillars are defined dynamically by occupied voxels",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: BEV grid size = (X_range / pillar_size) \\times (Y_range / pillar_size) = (70/0.16) \\times (80/0.16) = 437.5 \\times 500 \\approx 438 \\times 500 = 219,000 total pillar positions.\n\n**Step 2**: In practice, only ~5-10% are non-empty (occupied by LiDAR points).\n\n**Step 3**: These non-empty pillars are processed by a shared PointNet-style encoder, scattered into a 2D pseudo-image, then processed by a standard 2D CNN backbone and SSD-style detection head.",
      hints: [
        "Grid dimensions = (scene extent) / (pillar resolution). 70/0.16 \\approx 438, 80/0.16 = 500.",
        "Outdoor LiDAR scenes are sparse - most pillar positions in the grid have no points.",
      ],
    },
    {
      id: "q-cv3d-kp19-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "CenterPoint detects 3D objects by predicting Gaussian-rendered heatmaps of object centre locations in BEV space and then regressing object size, orientation, and velocity at each detected peak - making it naturally rotation-invariant without needing rotated anchors.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: CenterPoint renders each GT object\'s BEV centre as a Gaussian splat on a heatmap (\\sigma proportional to object size), then trains a centre heatmap head with focal loss.\n\n**Step 2**: At inference, local peaks above a confidence threshold are extracted; separate regression heads at those peaks predict log(width), log(length), height, sin(yaw), cos(yaw) and (dx, dy) velocity.\n\n**Step 3**: No rotation-aligned anchors needed - arbitrary yaw is handled by the sin/cos regression.",
      hints: [
        "Heatmap-based detection (like CornerNet, CenterNet) encodes object location as a 2D probability map rather than discrete anchors.",
        "sin(yaw) and cos(yaw) regression naturally handles the 2\\pi periodicity of rotation without binning.",
      ],
    },
    {
      id: "q-cv3d-kp19-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Two-stage 3D detectors like PV-RCNN combine voxel-based and point-based processing. What is the role of the second stage in PV-RCNN?",
      options: [
        "RoI-grid pooling: for each 3D proposal from the first stage, a regular grid of points is sampled within the proposal box, nearby voxel/keypoint features are aggregated via set abstraction, and an MLP regresses refined box parameters and confidence - significantly improving localisation accuracy over the first stage",
        "The second stage applies a 2D detection head on the BEV feature map to detect small objects missed by the first stage",
        "The second stage performs instance segmentation of the LiDAR points inside each detected bounding box",
        "The second stage classifies semantic categories using RGB image features aligned to first-stage proposals",
      ],
      correctAnswer: 0,
      explanation:
        '**Step 1**: PV-RCNN second stage: (1) sample a regular 6\\times6\\times6 grid of points inside each 3D proposal box; (2) RoI-grid pooling aggregates features from nearby "keypoints" (downsampled raw-point features saved from the backbone) using set abstraction at each grid point; (3) an MLP over all grid-point features predicts refined (dx, dy, dz, dw, dl, dh, d\\theta) and class confidence.\n\n**Step 2**: This fine-grained geometric feature aggregation inside proposals recovers localisation accuracy that coarse voxel features miss.',
      hints: [
        "The first stage (voxel backbone + BEV head) gives coarse proposals; the second stage refines them using fine-grained point features.",
        "RoI-grid pooling is the 3D equivalent of RoIAlign in Mask R-CNN - extracting fine features from within a proposed region.",
      ],
    },
  ],

  "point-cloud-segmentation": [
    {
      id: "q-cv3d-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the difference between 3D semantic segmentation and 3D instance segmentation on point clouds?",
      options: [
        "Semantic segmentation assigns a category label (e.g., car, road, tree) to each point; instance segmentation additionally assigns a unique ID to each individual object instance (e.g., car #1, car #2)",
        "Semantic segmentation operates on point clouds while instance segmentation operates on voxel grids",
        "Semantic segmentation is per-scan while instance segmentation is per-object and requires multiple scans",
        "Semantic segmentation uses supervised learning while instance segmentation is always self-supervised",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Semantic segmentation labels every point with a class (identifying what it belongs to); instance segmentation goes further by distinguishing individual object instances of the same class - critical for applications like counting vehicles or tracking individual pedestrians.",
      hints: [
        'Think about labeling all cars as "car" (semantic) vs. labeling each car as a distinct entity (instance).',
        "This distinction is the same as in 2D image segmentation.",
      ],
    },
    {
      id: "q-cv3d-kp20-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "RandLA-Net addresses the scalability challenge of point cloud segmentation by using random point sampling combined with a local feature aggregation module, achieving high efficiency on large-scale outdoor point clouds.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: RandLA-Net uses random sampling (replacing expensive FPS) for efficiency on point clouds with millions of points, and compensates for random sampling\'s quality loss with an attentive feature aggregation module that captures rich local geometry - achieving state-of-the-art accuracy on large-scale datasets like Semantic3D and SemanticKITTI.",
      hints: [
        "Farthest Point Sampling (FPS) is accurate but O(N\\^2) - random sampling is O(1) but discards structure.",
        "RandLA-Net\'s feature aggregation compensates for information loss from random sampling.",
      ],
    },
    {
      id: "q-cv3d-kp20-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What training signal does GRAF (Generative Radiance Fields) use to train a 3D-aware GAN without 3D supervision?",
      options: [
        "Adversarial loss between rendered novel-view patches and real image patches sampled at the same resolution, using a 2D discriminator that operates on rendered image patches - no 3D ground truth is needed",
        "Per-pixel reconstruction loss against ground truth multi-view images with known camera poses",
        "Contrastive loss that pushes same-scene renderings from different views to have similar latent codes",
        "Point cloud supervision from depth sensors co-registered with the training images",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: GRAF trains adversarially: the NeRF-based generator renders patches at randomly sampled camera poses, and a 2D patch discriminator distinguishes rendered patches from real image patches sampled at the same camera distribution - enabling 3D-aware generation with only unposed 2D image supervision.",
      hints: [
        "Think about how GAN training can work with only real images - the discriminator compares rendered vs. real patches.",
        "Camera pose is randomly sampled at training, not required as a label.",
      ],
    },
  ],

  "scene-graph-generation": [
    {
      id: "q-cv3d-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does a scene graph represent in the context of image understanding?",
      options: [
        'A structured graph where nodes represent detected objects (with category and attributes) and directed edges represent semantic relationships between objects (e.g., "the cup is to the left of the keyboard", "the book is on the table")',
        "A hierarchical clustering of image regions based on color similarity",
        "A temporal sequence of scene states from a video, linked by action edges",
        "A bipartite graph between image pixels and semantic class labels",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: A scene graph provides a structured semantic representation: object nodes with class labels and attributes, connected by predicate edges that describe spatial, possessive, or semantic relationships; this representation supports visual reasoning, image retrieval, and question answering.",
      hints: [
        'Think about what a scene graph is - a knowledge graph extracted from an image.',
        "Nodes are objects (what), edges are relationships (how they relate).",
      ],
    },
    {
      id: "q-cv3d-kp21-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ScanRefer is a benchmark for 3D visual grounding that requires localizing an object in a 3D point cloud scene given a free-form natural language description that often references spatial relations to other objects.",
      correctAnswer: "true",
      explanation:
        '**Step 1**: ScanRefer contains 51,583 descriptions of 11,046 objects in 800 ScanNet scenes; many descriptions are disambiguating ("the white table with a chair in front of it"), requiring models to understand both object appearance and 3D spatial relations to correctly localize the referred object.',
      hints: [
        "Disambiguating descriptions are what make 3D visual grounding hard - spatial relations are often the key differentiator.",
        "Think about how you would describe a specific object among many similar objects in a room.",
      ],
    },
    {
      id: "q-cv3d-kp21-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "EmbodiedScan and LEO (Embodied 3D Language Understanding) extend static 3D grounding to embodied agents. What key capability do they add?",
      options: [
        "They enable agents to ground language to 3D scenes from an egocentric viewpoint acquired through active exploration, rather than requiring a pre-built complete 3D scan as input - the agent must navigate to perceive and ground the referred object",
        "They extend grounding to handle multiple simultaneous referring expressions and resolve conflicts between them",
        "They replace 3D point cloud input with pure RGB video, eliminating the need for depth sensors",
        "They allow grounding in outdoor scenes (street-level) rather than only indoor room-scale scenes",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Embodied 3D grounding places the agent in an environment where the full 3D scan is not pre-given; the agent must actively navigate and perceive the scene from egocentric views, incrementally building a scene representation and grounding language to what has been observed - a fundamentally harder and more realistic setting than offline 3D grounding.",
      hints: [
        "Think about how a robot in an unexplored room must first look around before it can find the referred object.",
        "Offline 3D grounding assumes you already have the complete 3D scan - embodied grounding does not.",
      ],
    },
  ],

  "spatial-relations": [
    {
      id: "q-cv3d-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the task of visual spatial relation detection?",
      options: [
        'Identifying and classifying the spatial relationship between two objects in an image (e.g., "the cup is to the left of the keyboard", "the book is on the table")',
        "Estimating the 3D distance between all pairs of detected objects",
        "Segmenting the spatial extent of each object region in the image",
        "Detecting objects that occupy the same pixel location due to occlusion",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Spatial relation detection identifies directional or topological spatial predicates (left-of, above, inside/outside in 3D) between pairs of objects - supporting visual question answering, navigation, and robotic task planning that requires understanding object arrangements.",
      hints: [
        'Think about what spatial language people use to describe scenes: "the chair next to the window".',
        "Spatial relations describe how objects are positioned relative to each other, not their absolute positions.",
      ],
    },
    {
      id: "q-cv3d-kp22-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Referring expression comprehension requires a model to localize a specific object in an image given a free-form natural language description that often references spatial relations to other objects (e.g., 'the white table with a chair in front of it').",
      correctAnswer: "true",
      explanation:
        '**Step 1**: Referring expression comprehension grounds a referring expression (e.g., "the chair between the two tables") to a specific 3D bounding box; spatial relation understanding is critical because the description often references the target object\'s position relative to context objects.',
      hints: [
        "Think about how you would describe a specific object among many similar objects in a room.",
        "Disambiguating descriptions are what make 3D visual grounding hard - spatial relations are often the key differentiator.",
      ],
    },
    {
      id: "q-cv3d-kp22-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "EmbodiedScan and LEO (Embodied 3D Language Understanding) extend static 3D grounding to embodied agents. What key capability do they add?",
      options: [
        "They enable agents to ground language to 3D scenes from an egocentric viewpoint acquired through active exploration, rather than requiring a pre-built complete 3D scan as input - the agent must navigate to perceive and ground the referred object",
        "They extend grounding to handle multiple simultaneous referring expressions and resolve conflicts between them",
        "They replace 3D point cloud input with pure RGB video, eliminating the need for depth sensors",
        "They allow grounding in outdoor scenes (street-level) rather than only indoor room-scale scenes",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Embodied 3D grounding places the agent in an environment where the full 3D scan is not pre-given; the agent must actively navigate and perceive the scene from egocentric views, incrementally building a scene representation and grounding language to what has been observed - a fundamentally harder and more realistic setting than offline 3D grounding.",
      hints: [
        "Think about how a robot in an unexplored room must first look around before it can find the referred object.",
        "Offline 3D grounding assumes you already have the complete 3D scan - embodied grounding does not.",
      ],
    },
  ],

  'neural-rendering-avatars': [
    {
      id: 'q-cv3d-kp25-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Neural Radiance Fields for human avatars (e.g., NeRF-based body models) must handle articulated motion. How do they address this compared to static scene NeRFs?',
      options: [
        'They train a separate NeRF for each body pose, requiring one NeRF per training frame',
        'They use a canonical body NeRF combined with a learnable deformation field that maps any posed body configuration back to the canonical space, where the NeRF is evaluated - enabling generalisation to novel poses not seen during training',
        'They replace the neural radiance field with a mesh-based renderer that deforms with body pose',
        'They concatenate the body pose as an additional input to the MLP alongside (x,y,z) coordinates',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Neural avatar NeRFs (NeuralBody, ARAH, HumanNeRF): define a canonical NeRF in rest pose; a deformation field D(x, \\theta) maps query point x under pose \\theta back to canonical coordinates where the NeRF is queried.\n\n**Step 2**: The deformation is typically LBS (linear blend skinning) from SMPL or a learned SE(3) flow.\n\n**Step 3**: This allows the canonical NeRF to learn appearance and the deformation field to learn pose-dependent geometry, generalising to novel poses.',
      hints: [
        'Canonical NeRF: learned in rest/T-pose. Deformation: warp current-pose query points to canonical space before querying.',
        'SMPL provides a kinematic skeleton and LBS weights - plugging SMPL pose parameters into LBS gives the deformation field.',
      ],
    },
    {
      id: 'q-cv3d-kp25-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Gaussian Avatar methods (GaussianAvatar, SplattingAvatar) represent human bodies as sets of 3D Gaussians attached to the SMPL mesh surface, enabling real-time neural avatar rendering by inheriting the speed advantage of 3D Gaussian Splatting.',
      correctAnswer: 'true',
      explanation: '**Step 1**: Gaussian avatars: initialise 3D Gaussians on the SMPL mesh surface; each Gaussian inherits the local pose transformation from its attached mesh triangle (LBS + rotation).. As the body moves, Gaussians move with the mesh.\n\n**Step 2**: A small MLP predicts pose-dependent Gaussian attribute updates (appearance changes from shadowing, cloth deformation).. Rendering: standard 3DGS rasterisation at >100 FPS - 1000x faster than NeRF-based avatars.\n\n**Step 3**: ',
      hints: [
        'Gaussians attached to mesh triangles: each Gaussian has local (u,v,w) barycentric coordinates on a triangle - it moves with the triangle under LBS.',
        '3DGS rendering speed: tile rasterisation at 100+ FPS vs. NeRF ray-marching at <1 FPS for comparable quality.',
      ],
    },
    {
      id: 'q-cv3d-kp25-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A key challenge for monocular neural avatar reconstruction (training from a single video) is separating lighting from surface reflectance. Why is this difficult and how do relightable avatar methods address it?',
      options: [
        'Lighting and reflectance are always entangled because cameras record RGB, not HDR light measurements',
        'Under natural illumination, the observed colour = albedo \\times shading (lighting \\times surface normal). These are ambiguous from colour alone (infinite (albedo, lighting) pairs produce the same observed colour); relightable methods impose priors (smooth albedo, BRDF physics) and use shadow-free illumination changes across video frames to separate intrinsic components',
        'Relightable avatars require a light stage with controlled illumination during capture, making monocular methods impossible',
        'The difficulty is purely computational: the NeRF must evaluate the rendering equation at each sample point, which is too slow for real-time training',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Intrinsic decomposition (albedo/shading) from monocular video: two different (albedo, shading) pairs can produce identical observed RGB - inherently under-determined.\n\n**Step 2**: Relightable NeRF methods (NeRFactor, NeuSG-relightable): impose smoothness regularisation on albedo (spatially smooth), use physically-based BRDF models, and exploit natural illumination variation across video frames (outdoor: sunlight angle changes; indoor: moving person causes shading changes).\n\n**Step 3**: Result: disentangled albedo + BRDF + normal that can be relit under novel illumination.',
      hints: [
        'Colour = albedo \\times lighting \\times geometry: three unknowns from one equation. Priors and multi-frame observations resolve the ambiguity.',
        'Albedo smoothness: real surfaces are piecewise smooth. Large spatial variation in albedo \\to likely an artifact, not real reflectance.',
      ],
    },
  ],
  "bev-perception": [
    {
      id: "q-cv3d-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'The Lift-Splat-Shoot (LSS) method lifts camera images to BEV. In the "Lift" step, each pixel (u, v) with depth bin d\\_n is lifted to a 3D point. What is the 3D coordinate in camera frame?',
      options: [
        "(d\\_n(u − cx)/fx, d\\_n(v − cy)/fy, d\\_n) - inverse perspective projection using focal lengths fx, fy and principal point cx, cy",
        "(u/d\\_n, v/d\\_n, 1/d\\_n) - normalised image coordinates divided by depth",
        "(u \\cdot d\\_n, v \\cdot d\\_n, d\\_n) - pixel coordinates multiplied by depth",
        "(u − cx, v − cy, d\\_n \\cdot fx) - pixel offsets scaled by depth and focal length",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Inverse perspective projection: given pixel (u,v) and depth d\\_n, the 3D point in camera frame is X = d\\_n(u−cx)/fx, Y = d\\_n(v−cy)/fy, Z = d\\_n.\n\n**Step 2**: LSS predicts a categorical depth distribution over D discrete depth bins for each pixel, creates D feature vectors per pixel weighted by depth probabilities, and lifts all of them to 3D - producing a point cloud of (D\\timesH\\timesW) frustum features that is then splatted to BEV.",
      hints: [
        "The pinhole projection is p = K\\cdotP (3D\\to2D). The inverse (2D+depth\\to3D) is P = d\\_n\\cdotK\\^{-1}\\cdot[u,v,1]\\^T.",
        "K\\^{-1} applied to homogeneous pixel [u,v,1] gives the normalised direction; scaling by d\\_n gives the 3D point.",
      ],
    },
    {
      id: "q-cv3d-kp26-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "BEVFusion achieves camera-LiDAR fusion in BEV space by lifting camera features to BEV using LSS (with predicted depth distributions) and projecting LiDAR features to BEV via voxelisation, then concatenating both modality features before shared detection heads.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: BEVFusion (Liu et al.\n\n**Step 2**: 2022): (1) camera features lifted to BEV via LSS depth prediction \\to camera BEV features; (2) LiDAR points voxelised and processed by sparse 3D CNN \\to LiDAR BEV features; (3) both BEV feature maps are spatially aligned and concatenated channel-wise; (4) shared 2D CNN backbone + detection heads (CenterPoint-style).\n\n**Step 3**: This achieves tight geometric alignment because both modalities are in the same metric BEV coordinate frame.",
      hints: [
        "Think about how depth estimation enables cameras to perceive 3D structure - occupancy prediction extends this to the full 3D scene.",
        "Cross-attention allows 3D voxel queries to gather information from relevant 2D image regions.",
      ],
    },
    {
      id: "q-cv3d-kp26-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the role of the "Splat" step in the Lift-Splat-Shoot (LSS) architecture for camera-to-BEV feature lifting?',
      options: [
        'Splatting reduces the 3D frustum feature volume (H\\timesW\\timesD features per camera) to a 2D BEV grid by summing ("splatting") features into BEV grid cells, efficiently implemented using a cumulative sum trick (pillar pooling) that groups frustum points into the same BEV pillar',
        "Splatting computes the outer product of depth and image features to produce a 3D feature volume",
        "Splatting projects BEV features back to the camera image plane to compute a reconstruction loss",
        "Splatting applies bilinear interpolation to upsample low-resolution depth predictions to full image resolution",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: LSS Splat: each of the D\\cdotH\\cdotW lifted 3D points is assigned to a BEV (x,y) pillar based on its 3D coordinates (after camera\\toego transformation).. Features from all points in the same BEV pillar are summed.\n\n**Step 2**: This is implemented using a CUDA cumulative-sum trick (sorting points by pillar index then performing parallel prefix sums) for efficiency - avoiding an explicit 3D feature volume materialisation.. The result is a H_bev\\timesW_bev\\timesC BEV feature map.\n\n**Step 3**: ",
      hints: [
        "Splat = scatter features from 3D frustum points into 2D BEV grid cells by summing all contributions per cell.",
        "The cumulative sum trick avoids building the full 3D feature volume explicitly - it works directly on the sparse point list.",
      ],
    },
  ],

  "occupancy-prediction": [
    {
      id: "q-cv3d-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does occupancy prediction output in the context of 3D scene understanding for autonomous driving?",
      options: [
        "A 3D voxel grid where each voxel is labeled with an occupancy state (free, occupied, unknown) and optionally a semantic category - representing the complete 3D geometry and semantics of the scene",
        "A probability map of where a pedestrian will be in the next 5 seconds",
        "A dense depth map for the front camera view only",
        "A set of 3D bounding boxes for detected dynamic objects only",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Occupancy prediction produces a complete 3D voxel occupancy grid of the scene - labeling each voxel as occupied or free and (in semantic occupancy) with a class label - representing both static structures (buildings, roads) and dynamic objects in a unified dense format.",
      hints: [
        "Think about representing the entire world around a vehicle as a 3D grid of filled and empty cells.",
        "Unlike object detection, occupancy represents everything in the scene, not just detected object categories.",
      ],
    },
    {
      id: "q-cv3d-kp27-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "MonoScene and TPVFormer demonstrate that semantic 3D occupancy can be predicted from camera images alone (without LiDAR), by lifting 2D image features to 3D using cross-attention or geometric projection.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: MonoScene uses 2D U-Net features projected to 3D via frustum pooling, while TPVFormer uses a tri-perspective view (TPV) representation and cross-attention to aggregate image features into a 3D occupancy grid - showing that camera-only systems can achieve reasonable 3D scene completion without LiDAR depth.",
      hints: [
        "Think about how depth estimation enables cameras to perceive 3D structure - occupancy prediction extends this to the full 3D scene.",
        "Cross-attention allows 3D voxel queries to gather information from relevant 2D image regions.",
      ],
    },
    {
      id: "q-cv3d-kp27-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What is the main advantage of semantic occupancy representation over 3D object detection for autonomous driving safety applications?",
      options: [
        "Occupancy grids represent all scene geometry (including anomalous objects, free-form debris, and unknown obstacles) in a unified dense format, whereas object detection only handles predefined object categories and misses out-of-distribution obstacles",
        "Occupancy prediction is faster at inference time because it uses a simpler output head than object detection",
        "Occupancy grids are easier to fuse with HD maps because both use the same grid coordinate system",
        "Occupancy prediction does not require semantic labels and can be trained with unsupervised methods only",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Safety-critical AV perception requires detecting any obstacle - including unusual objects like fallen cargo or road debris not in any predefined category; occupancy grids represent all occupied space regardless of category, providing a safety net that complements category-specific object detection.",
      hints: [
        "Think about what happens when an autonomous vehicle encounters an unexpected obstacle that its detector was never trained on.",
        'Occupancy asks "is something there?" not "what is there?" - a more conservative safety question.',
      ],
    },
  ],

  "temporal-3d": [
    {
      id: "q-cv3d-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why does temporal fusion improve 3D object detection compared to single-frame detection?",
      options: [
        "Aggregating features from multiple past frames increases the effective point cloud density (reducing sparsity for distant objects) and provides motion cues that help disambiguate objects and predict their velocity",
        "Temporal fusion allows the model to predict future object positions without any explicit motion model",
        "Using multiple frames reduces the angular resolution requirement of the LiDAR sensor",
        "Temporal fusion eliminates false positives by requiring objects to appear in all frames simultaneously",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Sparse LiDAR returns from distant objects are a key limitation of single-frame 3D detection; stacking multiple past scans (after ego-motion compensation) densifies the point cloud at distant locations and provides temporal motion patterns, significantly improving detection of rare, distant, and fast-moving objects.",
      hints: [
        "Think about how a distant car might have only 3 LiDAR points in one scan but 15 across five scans.",
        "Motion over time also reveals which points belong to moving objects versus static background.",
      ],
    },
    {
      id: "q-cv3d-kp28-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Before aggregating LiDAR scans from multiple timesteps, ego-motion compensation must be applied to transform all past point clouds into the current frame\'s coordinate system using odometry or SLAM pose estimates.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: As the vehicle moves between scans, each historical point cloud is in a different coordinate frame; ego-motion compensation applies the inverse relative transformation (from pose estimates) to bring all past scans into the current reference frame before aggregation - otherwise static objects would appear smeared or duplicated.",
      hints: [
        "Think about trying to overlay photos taken from slightly different positions without alignment - they would not line up.",
        "Ego-motion compensation is the prerequisite that makes multi-frame stacking meaningful.",
      ],
    },
    {
      id: "q-cv3d-kp28-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        'What is the "streaming" vs. "clip" paradigm for temporal 3D detection, and what is the trade-off?',
      options: [
        "Streaming processes each new frame online by updating a running BEV feature memory state (e.g., BEVDet4D, StreamPETR); clip-based methods process a fixed window of T frames jointly. Streaming has lower latency and memory but cannot exploit non-causal temporal context; clip-based has higher accuracy but higher latency and memory cost",
        "Streaming uses LiDAR only while clip-based fuses cameras and LiDAR simultaneously",
        "Streaming aggregates point clouds in 3D space while clip-based aggregates features in BEV space",
        "Streaming requires end-to-end training while clip-based can use independently pre-trained temporal components",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: Streaming detectors maintain a persistent BEV memory updated online as new frames arrive, enabling low-latency causal inference ideal for real-time driving; clip-based methods process a fixed temporal window jointly, allowing bidirectional temporal context but requiring all frames before producing output - higher accuracy at the cost of latency.",
      hints: [
        "Online vs. offline processing is the core distinction: can you wait to see future frames?",
        "Autonomous driving requires real-time inference - streaming accommodates this better than batch clip processing.",
      ],
    },
  ],

  "world-models-driving": [
    {
      id: "q-cv3d-kp29-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the role of a world model in autonomous driving (e.g., GAIA-1, UniSim)?",
      options: [
        "A world model predicts future scene states (video frames, BEV maps, or sensor observations) given the current state and an action (steering, acceleration), enabling simulation of diverse driving scenarios for training and evaluation without real-world data collection",
        "A world model stores and retrieves pre-recorded driving scenarios from a database for offline policy optimization",
        "A world model provides HD map annotations automatically from raw sensor data",
        "A world model estimates the world coordinate frame from GPS and IMU for localization",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: World models for autonomous driving are generative models that simulate how the driving scene evolves given the ego-vehicle\'s actions; GAIA-1 and UniSim generate realistic future video conditioned on actions and scene context, enabling policy training in simulation and counterfactual scenario generation for safety evaluation.",
      hints: [
        "Think about how Atari game world models (Dreamer) simulate the game - world models for driving do the same for the road.",
        "A world model that predicts future sensor observations can replace expensive real-world data collection.",
      ],
    },
    {
      id: "q-cv3d-kp29-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "GAIA-1 (from Wayve) is a generative world model trained on large-scale real driving data that can generate realistic future video conditioned on text descriptions, action tokens, and ego-vehicle state.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: GAIA-1 is a multi-modal autoregressive world model that combines video tokens, text tokens, and action tokens in a unified sequence model; it can generate temporally consistent, photorealistic driving video conditioned on natural language descriptions of weather, scenarios, and ego-vehicle actions.",
      hints: [
        "Think about how GPT-style next-token prediction can be applied to video tokens interleaved with action and text tokens.",
        "GAIA-1 treats future video generation as sequence modeling - the same paradigm as language models.",
      ],
    },
    {
      id: "q-cv3d-kp29-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What training signal does GRAF (Generative Radiance Fields) use to train a 3D-aware GAN without 3D supervision?",
      options: [
        "Adversarial loss between rendered novel-view patches and real image patches sampled at the same resolution, using a 2D discriminator that operates on rendered image patches - no 3D ground truth is needed",
        "Per-pixel reconstruction loss against ground truth multi-view images with known camera poses",
        "Contrastive loss that pushes same-scene renderings from different views to have similar latent codes",
        "Point cloud supervision from depth sensors co-registered with the training images",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: GRAF trains adversarially: the NeRF-based generator renders patches at randomly sampled camera poses, and a 2D patch discriminator distinguishes rendered patches from real image patches sampled at the same camera distribution - enabling 3D-aware generation with only unposed 2D image supervision.",
      hints: [
        "Think about how GAN training can work with only real images - the discriminator compares rendered vs. real patches.",
        "Camera pose is randomly sampled at training, not required as a label.",
      ],
    },
  ],

  "end-to-end-driving": [
    {
      id: "q-cv3d-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What distinguishes end-to-end learning for autonomous driving from modular pipeline approaches?",
      options: [
        "End-to-end systems train a single neural network (or differentiable pipeline) directly from raw sensor inputs to driving outputs (steering, acceleration), optimizing the entire perception-prediction-planning stack jointly rather than with separately designed and trained modules",
        "End-to-end systems use only cameras, while modular systems require LiDAR for perception",
        "End-to-end systems operate in simulation only, while modular systems are deployed on real vehicles",
        "End-to-end systems are rule-based for safety-critical decisions, while modular systems use learned components throughout",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: End-to-end driving (e.g., CARLA-trained imitation agents, TransFuser, UniAD) learns a direct mapping from sensors to control actions in a single differentiable model, allowing gradient to flow from the driving objective through all intermediate representations - eliminating hand-designed interfaces between modules.",
      hints: [
        "Think about the difference between training each module of a pipeline separately vs. optimizing the entire chain for the final task.",
        "End-to-end means one gradient path from input (sensors) to output (driving commands).",
      ],
    },
    {
      id: "q-cv3d-kp30-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Waypoint-based end-to-end driving models (e.g., NEAT, Transfuser) predict a sequence of future waypoints as intermediate output and then use a simple PID controller to follow them, rather than directly outputting low-level steering and throttle commands.",
      correctAnswer: "true",
      explanation:
        "**Step 1**: Waypoint prediction provides a structured intermediate representation that is easier to learn and interpret than raw control commands; a PID controller then converts the waypoint sequence to low-level steering and throttle, combining the generalization of learned representations with the reliability of classical control.",
      hints: [
        "Predictinging where to go (waypoints) is often easier to learn than predicting exactly how hard to turn a wheel.",
        "Separating high-level waypoint prediction from low-level control execution provides a useful modular structure.",
      ],
    },
    {
      id: "q-cv3d-kp30-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "What training signal does GRAF (Generative Radiance Fields) use to train a 3D-aware GAN without 3D supervision?",
      options: [
        "Adversarial loss between rendered novel-view patches and real image patches sampled at the same resolution, using a 2D discriminator that operates on rendered image patches - no 3D ground truth is needed",
        "Per-pixel reconstruction loss against ground truth multi-view images with known camera poses",
        "Contrastive loss that pushes same-scene renderings from different views to have similar latent codes",
        "Point cloud supervision from depth sensors co-registered with the training images",
      ],
      correctAnswer: 0,
      explanation:
        "**Step 1**: GRAF trains adversarially: the NeRF-based generator renders patches at randomly sampled camera poses, and a 2D patch discriminator distinguishes rendered patches from real image patches sampled at the same camera distribution - enabling 3D-aware generation with only unposed 2D image supervision.",
      hints: [
        "Think about how GAN training can work with only real images - the discriminator compares rendered vs. real patches.",
        "Camera pose is randomly sampled at training, not required as a label.",
      ],
    },
  ],
};

const additionalVision3dQuestions: Record<string, Question[]> = {
  'instant-ngp-v2': [
    {
      id: 'q-cv3d-kp31-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Instant Neural Graphics Primitives (Instant-NGP) achieves orders-of-magnitude speedup over vanilla NeRF by replacing MLP-based coordinate encoding with ___.',
      options: [
        'A precomputed voxel grid that stores RGB values at fixed resolution',
        'A multiresolution hash table encoding: spatial coordinates are hashed at L resolution levels to look up trainable feature vectors, enabling fast gradient-based learning without large MLP depth',
        'A convolutional encoder that processes depth maps from RGB-D sensors',
        'A transformer that attends over a set of reference images to predict density and color',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Instant-NGP (Müller et al., 2022): coordinates x are hashed at L \\in {16..512K} resolution levels; each level maps x to a small feature vector via a hash function with collision resolution via gradient averaging.. The resulting multi-resolution feature is fed to a tiny 2-layer MLP.\n\n**Step 2**: Hash lookups are O(L) vs.. MLP forward pass O(D\\cdotW\\^2), enabling training convergence in seconds rather than hours.\n\n**Step 3**: ',
      hints: [
        'Hash encoding: map (x,y,z) \\to integer \\to lookup trainable 2D feature vector. Collisions are handled implicitly by gradient averaging.',
        'Multiresolution: coarse level captures large-scale structure; fine level captures details - same principle as image pyramids.',
      ],
    },
    {
      id: 'q-cv3d-kp31-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Instant-NGP\'s multiresolution hash encoding can represent scenes with hash collisions without explicit conflict resolution because gradient learning implicitly averages colliding features to represent the most frequently queried content.',
      correctAnswer: 'true',
      explanation: '**Step 1**: When two spatial locations hash to the same table entry, their gradients are summed.. Frequently queried positions (e.g., object surfaces visible from many training views) dominate the gradient signal, so the feature adapts to represent them well.\n\n**Step 2**: Rarely queried positions (background, occluded regions) contribute fewer gradients and their collisions matter less.. This implicit averaging makes collision-based hash encoding robust in practice.\n\n**Step 3**: ',
      hints: [
        'High-frequency query positions get more gradient updates \\to their features win over rarely-queried collision partners.',
        'Collision is a form of parameter sharing - acceptable when the sharing is between positions with similar appearance.',
      ],
    },
    {
      id: 'q-cv3d-kp31-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Compared to dense voxel grids, the multiresolution hash encoding in Instant-NGP achieves better memory efficiency because ___.',
      options: [
        'It uses 8-bit quantisation rather than 32-bit floats for all stored features',
        'It covers a large spatial extent with small hash tables by accepting hash collisions - the total parameter count is T\\cdotF per resolution level (T = table size, F = feature dim) rather than N\\^3\\cdotF for a voxel grid of side N',
        'It stores only the surface voxels rather than the full 3D volume',
        'It uses a separate network per resolution level, which can be pruned independently',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Dense voxel grid: N\\^3 entries for a grid of side N (N=512 \\to 134M entries).. Hash table: T entries per level (T typically 2^14 to 2^24), shared across all space - T << N\\^3.\n\n**Step 2**: Total params: L\\cdotT\\cdotF (e.g., 16 levels \\times 2^19 entries \\times 2 features = 16M params).. This covers the same volume with 8-100x fewer parameters, enabling fine-grained representations that would be prohibitively large as explicit grids.\n\n**Step 3**: ',
      hints: [
        'Voxel grid: O(N\\^3) memory. Hash table: O(T) memory. The hash collapses 3D space into 1D, accepting collisions.',
        'At resolution N=512: 512\\^3 = 134M entries. Hash table: 2^19 = 524K entries per level.',
      ],
    },
  ],
  'pointnet-deep-learning': [
    {
      id: 'q-cv3d-kp32-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'PointNet++ extends PointNet to capture local geometric structure. How does it do this?',
      options: [
        'It processes the entire point cloud as a single global feature with no local grouping',
        'It uses a hierarchical set abstraction: iterative farthest point sampling selects centroids, ball-query groups neighbouring points, and a PointNet mini-network extracts local features at each centroid - creating a multi-scale local representation',
        'It converts the point cloud to a voxel grid and applies 3D convolutions at multiple scales',
        'It uses graph neural networks where each point attends to all other points via full self-attention',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: PointNet++: (1) Farthest Point Sampling (FPS): greedily select S points maximally spread across the cloud; (2) Ball query: for each centroid, collect all points within radius r; (3) Mini-PointNet: extract a feature for each local group.\n\n**Step 2**: This hierarchical abstraction is repeated at multiple scales (multi-scale grouping, MSG) to capture both fine local features and global context.',
      hints: [
        'PointNet (v1): global max-pool over all points - no local geometry. PointNet++: local grouping + hierarchy.',
        'FPS: ensures centroids are well-spread, not clustered - better coverage than random sampling for non-uniform point clouds.',
      ],
    },
    {
      id: 'q-cv3d-kp32-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'PointNet achieves permutation invariance by using a symmetric function (global max-pooling) over point features, so the output is identical regardless of the order in which points are processed.',
      correctAnswer: 'true',
      explanation: '**Step 1**: PointNet (Qi et al., 2017): each point p_i is independently mapped to a feature h_i = f(p_i) (shared MLP).. Global feature g = max(h_1,...,h_N) (element-wise maximum).\n\n**Step 2**: Since max-pool is symmetric (commutative), g is invariant to the permutation of points.. A critical point function: {p_i | h_i = g} - the subset of points whose features are the global max - determines the global feature.\n\n**Step 3**: ',
      hints: [
        'Symmetric function: f(a,b,c) = f(c,a,b) = f(b,c,a). Max-pool satisfies this for any number of inputs.',
        'Order-invariance is essential because point clouds have no canonical ordering - they are sets, not sequences.',
      ],
    },
    {
      id: 'q-cv3d-kp32-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The T-Net (Transformer Network) in PointNet predicts an input alignment matrix. What problem does this solve?',
      options: [
        'It enables PointNet to process point clouds of variable size by dynamically resizing the network',
        'It predicts a 3\\times3 (or 64\\times64) transformation matrix applied to input points (or intermediate features) to make the network invariant to rigid 3D transformations - regularised to be close to a rotation matrix via an L2 penalty on (I − TT^T)',
        'It is a self-attention mechanism that attends to the most informative points before max-pooling',
        'It transforms the point cloud from world coordinates to camera coordinates using a predicted extrinsic matrix',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: T-Net: a mini-PointNet that predicts a 3\\times3 matrix applied to input xyz (for rotation/reflection invariance) or a 64\\times64 matrix applied to intermediate features (for feature-space alignment).\n\n**Step 2**: Regularisation: L_reg = ||I − TT^T||_F\\^2 encourages T to be orthogonal.\n\n**Step 3**: This makes PointNet approximately invariant to rigid transformations of the input point cloud, improving generalisation.',
      hints: [
        'Without T-Net: a rotated point cloud produces different features. With T-Net: T "un-rotates" the cloud before processing.',
        'Feature-space T-Net (64\\times64): regularisation is crucial because unconstrained 64\\times64 matrices can destroy information.',
      ],
    },
  ],
  'lidar-3d-detection': [
    {
      id: 'q-cv3d-kp33-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'VoxelNet was one of the first end-to-end 3D object detectors for LiDAR point clouds. Its key innovation was ___.',
      options: [
        'Using a 2D bird\'s-eye-view projection of the LiDAR scan as input to a standard 2D detector',
        'Voxelising the point cloud and processing each non-empty voxel with a VFE (Voxel Feature Encoding) network that learns per-voxel features from variable-size point sets, then applying a 3D convolutional RPN for detection',
        'Projecting LiDAR points onto the camera image plane and using image features for detection',
        'Applying PointNet directly to the entire point cloud without any spatial partitioning',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: VoxelNet (Zhou & Tuia, 2018): (1) divide 3D space into voxels; (2) for each non-empty voxel, randomly sample \\leqT points and encode with VFE layers (element-wise operations + max-pool); (3) stack voxel features into a sparse 3D tensor; (4) apply a 3D sparse convolutional backbone; (5) BEV projection \\to 2D RPN for 3D bounding box regression.\n\n**Step 2**: VFE enables variable-size point sets within each voxel.',
      hints: [
        'VFE layer: pointwise MLP \\to element-wise max-pool \\to concatenate individual and pooled features. Same principle as PointNet.',
        'Sparse convolution: only compute on non-empty voxels - critical efficiency gain since LiDAR point clouds are sparse.',
      ],
    },
    {
      id: 'q-cv3d-kp33-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'CenterPoint detects 3D objects by predicting a heatmap of object centres in BEV space rather than predicting bounding boxes directly, which simplifies the detection head and improves performance on rotated objects.',
      correctAnswer: 'true',
      explanation: '**Step 1**: CenterPoint (Yin et al., 2021): a centre-based detection head predicts a BEV heatmap where peaks correspond to object centres (inspired by CenterNet for 2D).\n\n**Step 2**: From each peak, separate regression heads predict height, size, rotation angle (yaw), and velocity.\n\n**Step 3**: Centre-based detection avoids the anchor-design problem and naturally handles objects at any orientation without anchor alignment issues.',
      hints: [
        'Anchor-based: need anchors at every location \\times every orientation \\times every size. Centre-based: just find the peak, then regress attributes.',
        'Gaussian heatmap: the centre point is rendered as a 2D Gaussian in BEV - easy to detect via peak finding.',
      ],
    },
    {
      id: 'q-cv3d-kp33-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'BEVFusion (Liu et al., MIT) fuses LiDAR and camera features in a unified BEV space. What is the key challenge in aligning LiDAR BEV features with camera image features?',
      options: [
        'LiDAR and camera use different timestamp frequencies that must be interpolated',
        'Camera images are perspective-projected (view-dependent) while LiDAR is range-based; transforming camera image features to BEV requires solving the "depth ambiguity" - a 2D image pixel corresponds to a ray in 3D, not a specific depth - typically resolved using predicted depth distributions or transformer-based cross-modal attention',
        'LiDAR features are always higher resolution than camera features, requiring upsampling',
        'Camera images cannot represent the z-axis (height) information that LiDAR captures, making fusion impossible',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Camera-to-BEV transformation requires lifting 2D image features to 3D.. LSS (Lift-Splat-Shoot) predicts a depth distribution per pixel and splats features along the ray.\n\n**Step 2**: BEVFusion uses a unified BEV encoder that fuses lifted camera features and voxelised LiDAR features with spatial alignment.. The depth uncertainty from cameras is the fundamental misalignment - LiDAR provides sparse but accurate depth; cameras provide dense but depth-ambiguous features.\n\n**Step 3**: ',
      hints: [
        'Image pixel (u,v) + focal length \\to ray direction. But where along the ray is the object? Needs predicted depth.',
        'LSS: predict depth probability d(z) for each pixel; splat feature f \\times d(z) into BEV at corresponding (x,y,z).',
      ],
    },
  ],
  'human-pose-estimation': [
    {
      id: 'q-cv3d-kp34-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'HRNet (High-Resolution Network) for human pose estimation maintains high-resolution representations throughout the network. Why does this matter for keypoint localisation?',
      options: [
        'High-resolution features enable the network to process higher-resolution input images without resizing',
        'Keypoint locations require precise spatial localisation (sub-pixel accuracy); networks that downsample to low resolution (e.g., standard ResNet) and upsample back lose spatial precision due to the encoder-decoder bottleneck - HRNet maintains parallel high-to-low resolution streams with repeated fusion',
        'High-resolution representations contain more semantic information than low-resolution ones',
        'HRNet uses high resolution to avoid any form of data augmentation during training',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Standard pose estimators: image \\to downsample (high semantics, low spatial) \\to upsample \\to heatmap.. Each downsample loses spatial precision.\n\n**Step 2**: HRNet: start at full resolution, gradually add lower-resolution parallel streams, perform repeated multi-scale fusion - the high-resolution stream is never downsampled, preserving spatial accuracy.. This is especially important for small joints (fingers, toes) where \\pm1 pixel matters.\n\n**Step 3**: ',
      hints: [
        'Encoder-decoder (HourGlass, SimpleBaseline): spatial information lost at the bottleneck must be recovered via skip connections or upsampling - imperfect.',
        'HRNet parallel streams: 1/4, 1/8, 1/16 resolution run simultaneously and exchange information via multi-scale fusion.',
      ],
    },
    {
      id: 'q-cv3d-kp34-2',
      type: 'true-false',
      difficulty: 'medium',
      question: '3D human pose estimation from a single RGB camera is inherently ambiguous because multiple 3D joint configurations can project to the same 2D skeleton, making it an ill-posed problem that requires learned priors to resolve.',
      correctAnswer: 'true',
      explanation: '**Step 1**: Monocular 3D pose ambiguity: a 2D skeleton (projected joints) is consistent with infinitely many 3D skeletons (different depths).. Humans use contextual cues (typical pose statistics, body proportions, contact with environment) to resolve this.\n\n**Step 2**: 3D pose estimators learn statistical priors over human joint configurations (e.g., SMPL body model) to disambiguate.. Multi-view cameras or depth sensors remove this ambiguity but require additional hardware.\n\n**Step 3**: ',
      hints: [
        'Rotation ambiguity: a limb can be at multiple depths while projecting to the same 2D point.',
        'Body model prior: SMPL constrains joint angles to physically valid poses, reducing the ambiguity significantly.',
      ],
    },
    {
      id: 'q-cv3d-kp34-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The SMPL body model represents human bodies as a parametric function of pose \\theta (joint angles) and shape \\beta (PCA body shape coefficients). What enables SMPL to generalise to arbitrary body shapes and poses?',
      options: [
        'SMPL uses a lookup table mapping each (\\theta, \\beta) to a stored mesh - enabling exact representation but limited to trained configurations',
        'SMPL uses linear blend skinning (LBS) with learned pose-dependent corrective blend shapes: the template mesh is deformed by bone rotations (LBS), and pose-dependent blend shapes correct the LBS artifacts (candy wrapper effect) using learned linear functions of joint rotations',
        'SMPL uses a neural network to directly regress vertex positions from (\\theta, \\beta) without any mesh template',
        'SMPL encodes body shape as a 3D voxel grid and pose as a sequence of transformations applied to the voxels',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: SMPL (Loper et al., 2015): template mesh \\to shape blend shapes (B_S(\\beta) = \\Sigma_n \\beta_n S_n) \\to pose blend shapes (B_P(\\theta) = \\Sigma_k (R_k − R*_k) P_k) \\to LBS (rotate each vertex by its bone\'s weighted transformation).\n\n**Step 2**: The pose blend shapes B_P correct LBS artifacts (e.g., collapsing at bent elbows).\n\n**Step 3**: Result: a differentiable function mapping 72+10 parameters to a 6890-vertex mesh, enabling gradient-based fitting and neural network integration.',
      hints: [
        'LBS artifact: linear blending of rotations produces the "candy wrapper" effect (collapsing at large joint angles). Pose blend shapes fix this.',
        'SMPL is differentiable: gradients flow from vertex positions back through LBS and blend shapes to \\theta and \\beta.',
      ],
    },
  ],
  '3d-scene-flow': [
    {
      id: 'q-cv3d-kp35-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: '3D scene flow estimation predicts the per-point 3D motion vector between two consecutive LiDAR frames. FlowNet3D uses ___.',
      options: [
        'A voxelised BEV representation with 2D optical flow estimation applied at each height slice',
        'Point mixture layers that associate points across frames via learned spatial correlation, followed by flow embedding propagation - producing per-point 3D flow vectors without voxelisation',
        'Template matching: each point in frame 1 is matched to the nearest point in frame 2 using L2 distance',
        'A GAN that generates the next-frame point cloud from the current frame, extracting flow from the generator\'s intermediate layers',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: FlowNet3D (Liu et al., 2019): (1) PointNet++ encodes features for both frames independently; (2) Flow embedding layers: for each point in frame 1, aggregate weighted features from nearby frame-2 points (correlation in feature space); (3) Set upconv layers propagate flow estimates from sampled points to all input points.\n\n**Step 2**: Result: per-point flow vectors without the memory cost of voxelisation.',
      hints: [
        'Analogy: FlowNet3D is to 3D point clouds what PWCNet is to 2D optical flow - correlation at multiple scales.',
        'Flow embedding: the correlation between frame-1 features and nearby frame-2 features encodes "how should this point move?"',
      ],
    },
    {
      id: 'q-cv3d-kp35-2',
      type: 'true-false',
      difficulty: 'easy',
      question: '3D scene flow is a generalisation of 2D optical flow to 3D space, where each point in a point cloud receives a 3D motion vector (dx, dy, dz) rather than a 2D pixel displacement (du, dv).',
      correctAnswer: 'true',
      explanation: '**Step 1**: 2D optical flow: for each pixel (u,v) in image I_t, predict displacement (\\Deltau, \\Deltav) to its location in I_{t+1}.\n\n**Step 2**: 3D scene flow: for each 3D point p_i in frame t, predict 3D motion vector (\\Deltax, \\Deltay, \\Deltaz) to its location in frame t+1.\n\n**Step 3**: 3D scene flow enables understanding of 3D motion in world coordinates, not just projected motion - critical for autonomous driving (understanding which 3D points are moving and where).',
      hints: [
        '2D optical flow: ambiguous for depth (a point moving in depth produces no image motion if it stays on the same ray).',
        '3D scene flow: explicit 3D displacement - no depth ambiguity since both frames are in 3D.',
      ],
    },
    {
      id: 'q-cv3d-kp35-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Self-supervised 3D scene flow estimation trains without ground-truth flow labels. Which self-supervised objective is most commonly used?',
      options: [
        'Reconstruction loss: predict frame t+1 point cloud from frame t using estimated flow, penalise Chamfer distance between predicted and observed frame t+1',
        'Cycle consistency: estimate flow from t\\tot+1 and t+1\\tot; enforce that composing them returns to the original point cloud',
        'Both Chamfer reconstruction and cycle consistency are commonly used together as complementary self-supervised objectives',
        'Contrastive learning: push flow features of matching points together and non-matching points apart',
      ],
      correctAnswer: 2,
      explanation: '**Step 1**: Self-supervised scene flow: (1) Chamfer loss: p_i + f_i should be close to its nearest neighbour in frame t+1 (forward reconstruction); (2) Cycle loss: f_forward(p) + f_backward(p + f_forward(p)) \\approx 0 - the round-trip should return to the original.\n\n**Step 2**: Both objectives are complementary: Chamfer ensures the warped cloud matches observations; cycle ensures forward and backward flows are consistent.\n\n**Step 3**: Methods like Self-Point-Flow combine these.',
      hints: [
        'Chamfer: warp frame t by flow \\to should overlap with frame t+1. Penalises poor flow that doesn\'t match observations.',
        'Cycle: if you move forward then backward by the corresponding flow, you should return home. Enforces flow consistency.',
      ],
    },
  ],
  'stereo-depth-estimation': [
    {
      id: 'q-cv3d-kp36-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'RAFT-Stereo adapts the RAFT optical flow framework for stereo depth estimation. Its core operation is ___.',
      options: [
        'A single forward pass CNN that directly regresses a depth map from a stereo image pair',
        'An iterative update operator that refines a disparity estimate over multiple steps using correlation volumes between left and right image features, converging to accurate sub-pixel disparity estimates',
        'A GAN discriminator that distinguishes between estimated and ground-truth disparity maps',
        'A transformer with cross-attention between left and right image patches at each pixel',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: RAFT-Stereo (Lipson et al., 2021): build a 1D correlation volume between left features and all right features at each row (epipolar constraint means right features are searched along a horizontal line).\n\n**Step 2**: The GRU-based update operator iteratively refines the disparity map d using a look-up in the correlation volume at the current d estimate.\n\n**Step 3**: After K iterations (K=32 typical), the disparity map converges to sub-pixel accuracy.',
      hints: [
        'Stereo constraint: corresponding points in left/right images lie on the same horizontal epipolar line - search is 1D, not 2D.',
        'Disparity d: left pixel (u,v) corresponds to right pixel (u−d, v). Depth Z = f\\cdotB/d where f=focal length, B=baseline.',
      ],
    },
    {
      id: 'q-cv3d-kp36-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Monocular depth estimation is an ill-posed problem (scale ambiguous), while stereo depth estimation provides metric (absolute) depth because the known stereo baseline converts disparity to physical distance.',
      correctAnswer: 'true',
      explanation: '**Step 1**: Stereo: depth Z = f\\cdotB/d where B (baseline = distance between cameras) and f (focal length) are known from calibration.. Disparity d is measured in pixels.\n\n**Step 2**: Result: metric depth in metres.. Monocular: a scene scaled by \\lambda produces the same image for any \\lambda - depth is only recoverable up to scale.\n\n**Step 3**: Monocular models learn a scale-ambiguous depth prior; post-hoc scale alignment with a GPS or LiDAR point is needed for metric estimates.',
      hints: [
        'Stereo baseline B: cameras are 6cm apart \\to B = 0.06m. This physical constant converts relative disparity to absolute depth.',
        'Monocular scale ambiguity: a small close object and a large far object can look identical in a single image.',
      ],
    },
    {
      id: 'q-cv3d-kp36-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Generalising stereo depth estimation to unseen domains (different camera baselines, focal lengths, or environments) is challenging because ___.',
      options: [
        'Stereo matching requires the cameras to have identical focal lengths, which rarely holds across different camera rigs',
        'Models trained on a specific camera rig (fixed B and f) learn disparity-to-depth mappings tied to that geometry; at test time with different B or f, the disparity-to-depth scale changes and the model fails unless it explicitly conditions on camera intrinsics/extrinsics or is trained with varying rigs',
        'Domain shifts in stereo are larger than in monocular because stereo uses twice as many images',
        'Stereo models require ground-truth depth for training and cannot be adapted without retraining from scratch',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Stereo domain generalisation: Z = f\\cdotB/d means the disparity value for a 10m object changes if f or B changes.\n\n**Step 2**: A model trained on KITTI (B=0.54m) applied to a short-baseline phone stereo (B=6mm) sees 90x smaller disparities for the same scene - completely out of distribution.\n\n**Step 3**: Solutions: normalise disparity by (f\\cdotB) during training/inference; train with diverse synthetic datasets varying B and f; meta-learning across camera configurations.',
      hints: [
        'KITTI baseline 54cm, phone stereo baseline 6mm = 90x difference. Same real-world depth \\to very different disparity values.',
        'Normalised disparity: d_norm = d / (f\\cdotB) is scale-invariant. Training on d_norm generalises across camera rigs.',
      ],
    },
  ],
  '3d-generation-diffusion': [
    {
      id: 'q-cv3d-kp37-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'DreamFusion generates 3D scenes from text prompts without 3D training data by using ___.',
      options: [
        'A 3D diffusion model trained on a large dataset of (text, 3D mesh) pairs',
        'Score Distillation Sampling (SDS): a NeRF is optimised so that rendered views from random camera angles look like samples from a 2D text-conditioned diffusion model, without requiring any 3D ground truth',
        'A GAN where the generator creates 3D scenes and the discriminator is a pretrained image classifier',
        'A retrieval system that finds the nearest text-aligned 3D model in a database and deforms it to match the text',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: DreamFusion (Poole et al., 2022): initialise a NeRF randomly; at each step, render from a random camera pose; add noise at a random diffusion timestep; compute the 2D diffusion model\'s predicted noise; the SDS gradient updates the NeRF to make rendered views more likely under the text-conditioned diffusion model.\n\n**Step 2**: No 3D dataset needed - the 2D diffusion model provides all the supervisory signal.',
      hints: [
        'SDS: "if this rendered view doesn\'t look like a sample from the diffusion model for this text prompt, update the 3D scene to make it more likely."',
        'No 3D GT: the 2D diffusion model trained on billions of images is a rich 3D-consistent image prior-SDS exploits this.',
      ],
    },
    {
      id: 'q-cv3d-kp37-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'One3D and Zero123 demonstrate zero-shot novel view synthesis: given a single image, they generate the object from arbitrary viewpoints by fine-tuning a diffusion model to be conditioned on camera pose.',
      correctAnswer: 'true',
      explanation: '**Step 1**: Zero123 (Liu et al., 2023): fine-tune Stable Diffusion on (image, relative camera pose) \\to target view pairs.\n\n**Step 2**: At inference: given a single input image and a target (\\Deltaazimuth, \\Deltaelevation, \\Deltadistance), generate the novel view.\n\n**Step 3**: The model learns the mapping from image appearance + camera geometry to novel view appearance - enabling arbitrary view synthesis from a single image without 3D reconstruction.',
      hints: [
        'Training data: synthetic 3D objects rendered from multiple poses \\to (source view, relative pose) \\to target view pairs.',
        'At test time: feed a real-world photo + desired camera pose \\to the model imagines the novel view.',
      ],
    },
    {
      id: 'q-cv3d-kp37-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Point-E (OpenAI) generates 3D point clouds from text using a two-stage approach. What are the two stages and why is this decomposition useful?',
      options: [
        'Stage 1: generate a point cloud from text with a 3D diffusion model; Stage 2: texture the point cloud with a 2D GAN',
        'Stage 1: generate a coarse 3D coloured point cloud from text using a small 3D diffusion model; Stage 2: upsample to a dense fine-resolution point cloud using a point cloud upsampling diffusion model - this decomposition is efficient because the coarse stage captures 3D structure while the fine stage adds detail',
        'Stage 1: retrieve the nearest text-aligned 3D model from a database; Stage 2: deform it using a neural network to match the text exactly',
        'Stage 1: generate a depth map from text using a 2D diffusion model; Stage 2: lift the depth map to a 3D point cloud using back-projection',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Point-E: Stage 1 generates a 1024-point coloured point cloud from a text-conditioned image synthesised from the text (using a text-to-image model).. Stage 2: given the coarse 4096-point cloud, a separate diffusion model generates a 16384-point fine-resolution cloud.\n\n**Step 2**: The decomposition: coarse stage handles 3D semantics at low resolution (faster, more tractable); fine stage adds surface detail using the coarse cloud as conditioning.. This is more tractable than direct high-resolution 3D diffusion.\n\n**Step 3**: ',
      hints: [
        'Direct 16K-point 3D diffusion: very high-dimensional, slow to train. Coarse-to-fine: 1K \\to 16K is much more tractable.',
        'The coarse stage provides the 3D structure (shape, overall geometry); the fine stage adds surface texture and detail.',
      ],
    },
  ],
  'indoor-3d-reconstruction': [
    {
      id: 'q-cv3d-kp38-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'BundleFusion reconstructs dense 3D models from RGB-D sequences in real-time. Its key innovation for handling drift in camera tracking is ___.',
      options: [
        'Loop closure detection using a bag-of-words vocabulary tree, followed by pose graph optimisation',
        'A hierarchical global-to-local alignment that continuously re-integrates all frames into a global TSDF volume while simultaneously optimising all camera poses in a bundle adjustment framework - achieving both local and global consistency without explicit loop closure triggers',
        'Using depth-only data without RGB, which avoids drift from colour-based tracking errors',
        'A neural network that predicts camera pose from each depth frame independently without any temporal accumulation',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: BundleFusion (Dai et al., 2017): maintains a global TSDF volume and continuously optimises all camera poses jointly (bundle adjustment) using sparse point-to-point correspondences established via feature matching (SIFT + BRIEF).\n\n**Step 2**: Unlike frame-to-model tracking that accumulates drift, BundleFusion continuously corrects all past poses - any drift detected via misalignment triggers a global re-optimisation, preventing accumulation.',
      hints: [
        'TSDF: Truncated Signed Distance Function - voxel-based surface representation. Fusion = weighted average of depth measurements.',
        'Bundle adjustment: optimise all camera poses and 3D points simultaneously to minimise reprojection error - the gold standard for SLAM accuracy.',
      ],
    },
    {
      id: 'q-cv3d-kp38-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'TSDF (Truncated Signed Distance Function) fusion represents a 3D surface by storing, at each voxel, the signed distance to the nearest surface - positive outside, negative inside - and the surface is extracted at the zero-crossing using Marching Cubes.',
      correctAnswer: 'true',
      explanation: '**Step 1**: TSDF (Curless & Levoy, 1996; KinectFusion, 2011): each voxel stores (TSDF value, weight).. For each depth frame, update TSDF: if the voxel is in front of the measured surface, TSDF > 0; behind, TSDF < 0; truncate at \\pmt.\n\n**Step 2**: The surface is at TSDF = 0.. Marching Cubes extracts the isosurface as a triangle mesh.\n\n**Step 3**: Multiple depth frames are fused by weighted averaging, improving robustness to noise.',
      hints: [
        'SDF zero-crossing: voxels where TSDF changes sign mark the surface - Marching Cubes finds this boundary.',
        'Truncation: TSDF values beyond \\pmt (e.g., \\pm5cm) are set to \\pm1 - prevents distant empty space from influencing the surface.',
      ],
    },
    {
      id: 'q-cv3d-kp38-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'ScanNet is a benchmark dataset for indoor 3D scene understanding. What makes it particularly useful for training and evaluating 3D reconstruction and semantic segmentation methods?',
      options: [
        'It provides only LiDAR scans without any RGB images, forcing purely geometric algorithms',
        'It provides RGB-D sequences with ground-truth camera poses (from BundleFusion), 3D mesh reconstructions, and per-vertex/per-voxel semantic labels from 20 NYU label classes - enabling joint evaluation of 3D reconstruction, semantic segmentation, and instance segmentation',
        'It was collected in outdoor environments and provides GPS ground truth for all camera trajectories',
        'ScanNet only contains empty rooms without objects, enabling evaluation of wall/floor reconstruction accuracy',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: ScanNet (Dai et al., 2017): 1513 RGB-D scans of indoor scenes, annotated with: (1) 3D ground-truth meshes from BundleFusion; (2) per-vertex semantic labels (20 classes: chair, table, sofa, etc.) from crowdsourced annotation; (3) per-instance labels.\n\n**Step 2**: This enables evaluation of 3D semantic segmentation (PointNet++, PointTransformer), instance segmentation (3D-BoNet), and reconstruction (occupancy networks).\n\n**Step 3**: The standard benchmark for indoor 3D scene understanding.',
      hints: [
        'RGB-D: RGB camera + depth camera (Kinect or similar) captures both colour and geometry simultaneously.',
        '1513 scans \\times diverse room types (bedroom, living room, kitchen) = comprehensive indoor scene diversity.',
      ],
    },
  ],
  'multi-camera-3d-perception': [
    {
      id: 'q-cv3d-kp39-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'BEVFormer learns a unified BEV representation from surround-view cameras using ___.',
      options: [
        'Projecting all camera images to BEV using known camera extrinsics without any learned lifting',
        'Deformable attention from BEV queries to multi-scale, multi-camera image features: each BEV grid point queries relevant image regions across cameras and timesteps, implicitly learning depth-free BEV feature lifting',
        'A separate depth estimation network that converts each camera image to a depth map before BEV projection',
        'A polar-to-Cartesian transformation of the concatenated surround-view image panorama',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: BEVFormer (Li et al., 2022): initialise BEV queries on a grid; for each query at (x,y), project to each camera via camera geometry \\to get candidate 2D locations; use deformable DETR attention to sample and aggregate features from those image regions across multiple cameras and temporal frames.\n\n**Step 2**: The transformer implicitly learns the depth and occlusion relationships without explicit depth estimation.',
      hints: [
        'BEV query (x,y): "what is at this ground location?" - projected to multiple cameras, features are aggregated via attention.',
        'Deformable attention: instead of attending to all image tokens (quadratic), attend to a small set of learned offsets around the projected location.',
      ],
    },
    {
      id: 'q-cv3d-kp39-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Tesla\'s Autopilot vision-only perception system demonstrates that camera-only 3D perception can approach LiDAR-level accuracy for autonomous driving by using surround-view cameras with implicit 3D reasoning.',
      correctAnswer: 'true',
      explanation: '**Step 1**: Tesla Autopilot uses 8 surround-view cameras (no LiDAR) and predicts a BEV occupancy map from multi-camera image features.\n\n**Step 2**: By training on fleet data with pseudo-labels from a teacher LiDAR-based model, the vision system learns implicit 3D reasoning.\n\n**Step 3**: While not strictly equivalent to LiDAR on all metrics (especially in poor lighting), Tesla\'s deployment at scale demonstrates that vision-only perception can reach production-grade performance for many driving scenarios.',
      hints: [
        'Vision-only advantage: cameras are cheaper, smaller, and don\'t fail in rain unlike some LiDAR systems.',
        'Fleet learning: millions of miles of driving data with diverse scenarios compensate for the difficulty of learning 3D geometry from 2D images.',
      ],
    },
    {
      id: 'q-cv3d-kp39-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Occupancy networks for autonomous driving (OccNet, SurroundOcc) predict 3D occupancy and semantic labels for each voxel in the driving scene. How do they handle temporal fusion across multiple frames?',
      options: [
        'They process each frame independently and average predictions across the time window',
        'They use recurrent BEV feature propagation: BEV features from the current frame are aligned with past frames via ego-motion compensation (known ego-pose from IMU/GPS), then fused via spatial attention or ConvGRU - enabling temporal context without explicit tracking',
        'They extract optical flow between frames and warp past predictions to the current frame',
        'Temporal fusion is not used because occupancy changes too rapidly between frames to be beneficial',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: OccNet/BEVFormer temporal: at timestep t, the ego vehicle has moved from t-1.\n\n**Step 2**: The BEV feature map from t-1 is spatially warped using the known ego-motion (rotation + translation from odometry) to align it with the current frame\'s coordinate system.\n\n**Step 3**: Then deformable temporal attention fuses current and past BEV features - allowing the model to see occluded areas that were visible in past frames and reduce per-frame noise.',
      hints: [
        'Ego-motion compensation: if you moved 1m forward, the past BEV feature is shifted by -1m to align with the current reference frame.',
        'Temporal context: an occluded pedestrian behind a truck was visible 3 frames ago - the past feature preserves this knowledge.',
      ],
    },
  ],
  'nerf-editing-composition': [
    {
      id: 'q-cv3d-kp40-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Instruct-NeRF2NeRF edits a NeRF scene using natural language instructions. It uses ___.',
      options: [
        'Direct text-to-mesh editing by modifying the NeRF\'s weight tensors based on text embeddings',
        'An iterative dataset update approach: render training images from the NeRF, edit each image with InstructPix2Pix (image diffusion model conditioned on instruction), update the NeRF training set with edited images, retrain NeRF - iterating until the NeRF represents the desired edit',
        'A differentiable renderer that computes gradients from CLIP loss between rendered views and text description',
        'A GAN discriminator conditioned on text that guides NeRF optimisation toward the specified edit',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Instruct-NeRF2NeRF (Haque et al., 2023): (1) render training views from original NeRF; (2) edit each view with InstructPix2Pix ("make the person wear a hat"); (3) replace training images with edited versions; (4) finetune NeRF on edited images.\n\n**Step 2**: Repeat until convergence.\n\n**Step 3**: This propagates 2D edits to 3D consistently - the NeRF integrates edits across all views, ensuring 3D-consistent appearance without explicit 3D editing.',
      hints: [
        'InstructPix2Pix: "given this image and instruction, generate an edited image that follows the instruction."',
        'Iterative update: one round of editing may be inconsistent across views - multiple rounds converge to a consistent 3D edit.',
      ],
    },
    {
      id: 'q-cv3d-kp40-2',
      type: 'true-false',
      difficulty: 'medium',
      question: 'NeRF composition methods allow combining multiple independently trained NeRFs into a single scene by treating each NeRF as an object and compositing their radiance fields using spatial bounding regions or opacity-based blending.',
      correctAnswer: 'true',
      explanation: '**Step 1**: Object-compositional NeRF (uORF, ObjectNeRF): each object has its own NeRF.. During rendering, a ray samples densities from all object NeRFs; compositing uses the alpha-compositing formula over objects along the ray.\n\n**Step 2**: Spatial bounding boxes restrict each object NeRF to its region.. This enables scene editing: move an object by translating its bounding box, swap objects by replacing one NeRF with another - without retraining the full scene.\n\n**Step 3**: ',
      hints: [
        'Object NeRF: trained on crops/masks of each object. Scene rendering: composite all objects via alpha-compositing.',
        'Compositing formula: T_final = \\Pi_i (1 − \\sigma_i\\cdot\\Delta_i) - transmittance through all objects ordered front-to-back.',
      ],
    },
    {
      id: 'q-cv3d-kp40-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'A fundamental limitation of volume rendering in NeRF for real-time applications is that it requires many samples per ray (typically 128-256). NeRF acceleration methods like Plenoxels and TensorRF address this by ___.',
      options: [
        'Reducing the number of training views required so the scene is simpler to represent',
        'Using explicit spatial data structures (voxel grids, tensor decompositions) that allow faster per-sample density lookups than MLP forward passes, and exploiting early ray termination (stop sampling once accumulated opacity > threshold) to reduce the effective samples per ray',
        'Replacing volume rendering with surface rendering, which requires only 1 sample per ray',
        'Using GPU-optimised matrix multiplication to make MLP forward passes 10x faster',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Plenoxels: stores density and spherical harmonic colour coefficients at each voxel; lookup = trilinear interpolation (fast).. TensoRF: decomposes the radiance field as a sum of low-rank vector-matrix outer products, enabling fast vectorised lookups.\n\n**Step 2**: Both avoid costly MLP evaluations (which require many multiply-accumulate ops per sample).. Early ray termination: once T(t) < \\epsilon (ray is almost fully opaque), stop sampling - saves 50-90% of samples on typical scenes.\n\n**Step 3**: ',
      hints: [
        'MLP eval: input (x,y,z) \\to 8 layers of 256-dim activations \\to one density + colour. Voxel lookup: input (x,y,z) \\to trilinear interpolation \\to one scalar. The latter is 100x faster.',
        'Early termination: a point behind an opaque object contributes near-zero to the final pixel - stop sampling there.',
      ],
    },
  ],
  'gaussian-splatting-variants': [
    {
      id: 'q-cv3d-kp41-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: '3D Gaussian Splatting (3DGS) represents scenes as a collection of 3D Gaussians. Each Gaussian\'s 3D covariance \\Sigma is parameterised as \\Sigma = RSS^T R^T. Why is this decomposition used instead of directly optimising \\Sigma?',
      options: [
        'Because \\Sigma = RSS^T R^T (R = rotation matrix from quaternion q, S = diagonal scaling matrix) ensures \\Sigma stays symmetric and positive semi-definite throughout optimisation - direct gradient updates on \\Sigma entries can produce invalid non-PSD matrices',
        'Because this decomposition reduces the number of parameters from 9 to 6 by eliminating redundant off-diagonal entries',
        'Because R and S can be optimised with different learning rates, making training more stable',
        'Because storing R and S separately enables faster GPU matrix multiplication during rendering',
      ],
      correctAnswer: 0,
      explanation: '**Step 1**: A valid 3D covariance matrix must be symmetric positive semi-definite (PSD).\n\n**Step 2**: Direct gradient updates on \\Sigma\'s 9 entries can violate PSD during training.\n\n**Step 3**: Decomposing \\Sigma = R\\cdotS\\cdotS^T\\cdotR^T where R is a rotation (stored as quaternion q, 4 params) and S is a diagonal scale matrix (3 params) guarantees PSD by construction: any matrix of the form RSS^T R^T is PSD.',
      hints: [
        'A covariance matrix \\Sigma = A^T A is always PSD. What structure guarantees this while remaining differentiable?',
        'Quaternion \\to rotation matrix keeps R orthogonal; scaling S along axes keeps ellipsoid axes aligned.',
      ],
    },
    {
      id: 'q-cv3d-kp41-2',
      type: 'true-false',
      difficulty: 'medium',
      question: '3D Gaussian Splatting renders pixel colour C by front-to-back alpha compositing: C = \\Sigma\\_i c\\_i \\alpha\\_i \\Pi\\_j<\\_i (1 − \\alpha\\_j), where \\alpha\\_i = o\\_i \\cdot exp(−½(x−\\mu\\_2ᴅ)^T \\Sigma\\_2ᴅ\\^{-1} (x−\\mu\\_2ᴅ)) evaluates the projected 2D Gaussian at pixel position x.',
      correctAnswer: 'true',
      explanation: '**Step 1**: After projecting each 3D Gaussian to a 2D Gaussian (via the Jacobian of the projective transform), 3DGS composes pixel colour front-to-back: C = \\Sigma\\_i c\\_i\\alpha\\_i\\Pi\\_j<\\_i(1−\\alpha\\_j).\n\n**Step 2**: Here \\alpha\\_i = o\\_i\\cdotG\\_2ᴅ(x) is the product of learned opacity o\\_i and the 2D Gaussian value at pixel x.\n\n**Step 3**: This is exactly the same alpha-compositing formula as NeRF\'s volume rendering but evaluated in 2D after splatting - enabling the fast tile-based GPU rasterizer.',
      hints: [
        'Compare to NeRF\'s C(r) = \\Sigma\\_i T\\_i\\alpha\\_ic\\_i: 3DGS uses the same compositing formula but Gaussians are already projected to 2D.',
        'Front-to-back ordering is achieved by sorting Gaussians by depth before rasterisation.',
      ],
    },
    {
      id: 'q-cv3d-kp41-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'What is the adaptive density control strategy in 3D Gaussian Splatting, and why is it necessary?',
      options: [
        'Gaussians are periodically split (when too large - positional gradient magnitude exceeds threshold \\tau_pos) or cloned (when too small - in under-reconstructed regions), and those with opacity \\alpha\\_i below threshold \\epsilon_\\alpha are pruned - adapting the number and placement of Gaussians to scene complexity',
        'The number of Gaussians is fixed at initialisation and only their parameters (position, covariance, opacity, colour) are optimised throughout training',
        'Gaussians are densified by adding new ones at positions with high photometric loss, and merged when two Gaussians overlap (IoU > 0.9) to prevent redundancy',
        'A fixed densification schedule adds Gaussians every N iterations at random scene positions regardless of reconstruction quality',
      ],
      correctAnswer: 0,
      explanation: '**Step 1**: Adaptive density control monitors the L1 norm of positional gradients \\nabla\\mu accumulated over training.. When ||\\nabla\\mu|| > \\tau_pos: if the Gaussian is large (large scale S), split it into two smaller ones; if small, clone it to cover under-reconstructed regions.\n\n**Step 2**: Periodically, Gaussians with opacity \\alpha\\_i < \\epsilon_\\alpha are pruned.. Gaussians that grow too large (exceeding world-space or screen-space size thresholds) are also split.\n\n**Step 3**: This adapts the Gaussian count from typically ~100K (SfM initialisation) to millions.',
      hints: [
        'High positional gradient magnitude signals that the Gaussian is being pulled in conflicting directions - it needs to split to resolve ambiguity.',
        'Under-reconstruction (high loss region with small Gaussians) \\to clone; over-reconstruction (one Gaussian covers too much) \\to split.',
      ],
    },
  ],
  'occupancy-and-semantic-3d': [
    {
      id: 'q-cv3d-kp42-1',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Occupancy networks (Mescheder et al., 2019) represent 3D shapes as ___.',
      options: [
        'A set of oriented surface points (normal + position) generated by a conditional GAN',
        'A continuous function f_\\theta(p, z) \\to [0,1] that predicts the probability of any 3D point p being inside the shape given latent code z, enabling mesh extraction at arbitrary resolution via Marching Cubes on the decision boundary f = 0.5',
        'A signed distance function stored in a fixed-resolution voxel grid',
        'A triangle mesh with a fixed number of vertices generated autoregressively',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Occupancy networks: encode the input (e.g., image, point cloud) into latent z via an encoder; for any query point p in 3D, predict f_\\theta(p, z) = P(p is occupied).. The surface is at f = 0.5.\n\n**Step 2**: Marching Cubes extracts the mesh from this implicit function at any query resolution.. This is resolution-free (unlike voxels) and differentiable (unlike explicit meshes with fixed topology).\n\n**Step 3**: ',
      hints: [
        'Implicit representation: the surface is defined implicitly as the decision boundary of a classifier, not as an explicit set of points.',
        'Resolution-free: you can query the occupancy function at 16\\^3 voxels for speed or 512\\^3 for high-quality mesh extraction.',
      ],
    },
    {
      id: 'q-cv3d-kp42-2',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Semantic 3D scene graphs represent indoor scenes as graphs where nodes are objects/rooms and edges encode spatial relationships (on, in, next-to), enabling reasoning about functional relationships beyond geometric proximity.',
      correctAnswer: 'true',
      explanation: '**Step 1**: 3D scene graphs (Armeni et al., 2019; SceneGraphNet): nodes = rooms, objects, cameras; edges = spatial/functional relationships (chair is at table, table is in kitchen).\n\n**Step 2**: This representation supports spatial queries ("find all chairs next to a table"), navigation planning, and language grounding ("pick up the cup on the counter").\n\n**Step 3**: Scene graphs bridge raw geometry and semantic understanding.',
      hints: [
        'Pure geometry: "these points form a cluster." Scene graph: "this cluster is a chair (node), next to a table (edge)."',
        'Applications: embodied AI agents use scene graphs to answer "where is the nearest chair?" without explicit search.',
      ],
    },
    {
      id: 'q-cv3d-kp42-3',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'Panoptic 3D scene understanding combines semantic segmentation and instance segmentation in 3D. Which model unifies these tasks end-to-end for point clouds?',
      options: [
        'PointNet++ with two separate heads: one for semantic labels, one for binary instance masks',
        'Mask3D: a Transformer-based architecture that produces a variable number of instance masks each with a semantic class label, trained with a bipartite Hungarian matching loss between predicted and ground-truth instances - enabling panoptic 3D segmentation in a single end-to-end framework',
        'VoxelNet with instance labels stored per voxel alongside semantic labels',
        'A two-stage pipeline where semantic segmentation is run first and instance boundaries are detected in the semantic map',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: Mask3D (Schult et al., 2023): a sparse 3D U-Net backbone extracts point features; N learnable instance queries cross-attend to point features via Transformer decoder layers to produce N (mask, class) pairs.. Hungarian matching during training assigns each predicted instance to a ground-truth instance.\n\n**Step 2**: This unifies semantic and instance segmentation - no separate pipelines, no post-processing heuristics (no clustering, no NMS).. State-of-the-art on ScanNet panoptic 3D.\n\n**Step 3**: ',
      hints: [
        'Instance segmentation: each object gets a unique label (chair_1, chair_2). Semantic: each point gets a class (chair, table).',
        'Panoptic = semantic + instance. Hungarian matching: assign predictions to GTs by minimising total assignment cost.',
      ],
    },
  ],
}

Object.assign(questions, additionalVision3dQuestions)

const moreVision3dQuestions: Record<string, Question[]> = {
  'nerf-volume-rendering': [
    {
      id: 'q-cv3d-kp43-1',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'The NeRF volume rendering equation computes the expected color C(r) of a ray r(t) = o + td. Which expression is correct?',
      options: [
        'C(r) = \\int T(t) \\cdot \\sigma(r(t)) \\cdot c(r(t), d) dt, where T(t) = exp(−\\int\\_0\\^t \\sigma(r(s)) ds) is the accumulated transmittance from ray origin to t',
        'C(r) = \\int \\sigma(r(t)) \\cdot c(r(t), d) dt, where \\sigma is the volume density and c is the emitted color at each point',
        'C(r) = \\sum\\_i \\alpha\\_i \\cdot c\\_i where \\alpha\\_i = 1 − exp(−\\sigma\\_i\\cdot\\delta\\_i) and the transmittance T\\_i = \\prod\\_j<\\_i (1 − \\alpha\\_j) is omitted',
        'C(r) = softmax(\\sigma(r(t\\_1)), …, \\sigma(r(t\\_n))) \\cdot c, using softmax to normalize opacity weights',
      ],
      correctAnswer: 0,
      explanation: '**Step 1**: NeRF (Mildenhall et al.. 2020) models the scene as a continuous volumetric radiance field.\n\n**Step 2**: The rendering integral is C(r) = \\int_{t_n}^{t_f} T(t)\\cdot\\sigma(r(t))\\cdotc(r(t),d) dt where T(t) = exp(−\\int_{t_n}^t \\sigma(r(s))ds) is the accumulated transmittance - the probability that the ray travels from t_n to t without hitting any particle.. In discretised form: Cˆ(r) = \\sum\\_i T\\_i\\cdot(1−exp(−\\sigma\\_i\\delta\\_i))\\cdotc\\_i where T\\_i = exp(−\\sum\\_j<\\_i \\sigma\\_j\\delta\\_j).\n\n**Step 3**: This is the standard alpha-compositing formula from classical volume rendering.',
      hints: [
        'Transmittance T(t): the fraction of light that reaches point t unobstructed - multiply all previous absorption terms.',
        'The discrete alpha values \\alpha\\_i = 1 − exp(−\\sigma\\_i\\delta\\_i) convert density \\times interval into opacity; T\\_i = \\prod\\_j<\\_i(1 − \\alpha\\_j) is accumulated transmittance.',
      ],
    },
    {
      id: 'q-cv3d-kp43-2',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: 'NeRF uses positional encoding \\gamma(p) = (sin(2⁰\\pip), cos(2⁰\\pip), …, sin(2^{L−1}\\pip), cos(2^{L−1}\\pip)) for input coordinates. Why is this encoding necessary?',
      options: [
        'Positional encoding normalises the input coordinates to the range [−1, 1] for numerical stability during training',
        'MLPs are biased toward learning low-frequency functions (spectral bias); positional encoding maps inputs into a higher-frequency Fourier feature space, enabling the MLP to represent sharp edges, fine textures, and high-frequency geometry',
        'Positional encoding converts Cartesian coordinates to spherical coordinates, which are more natural for radiance fields',
        'Positional encoding is required to break the symmetry between x, y, and z coordinates in the MLP',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: MLPs with ReLU activations exhibit spectral bias (Rahaman et al.. 2019): they learn low-frequency components of a function much faster than high-frequency ones.\n\n**Step 2**: Without encoding, a NeRF MLP learns a blurry radiance field.. The Fourier feature mapping \\gamma(p) with L=10 for positions and L=4 for view directions lifts inputs to a 2L-dimensional sinusoidal basis, allowing the MLP to represent high-frequency signals efficiently.. This was independently theorised as the Neural Tangent Kernel perspective in "Fourier Features Let Networks Learn High Frequency Functions in Low Dimensional Domains" (Tancik et al.\n\n**Step 3**: 2020).',
      hints: [
        'Spectral bias: without encoding, the MLP converges to a blurry average of the scene - losing fine details.',
        'L=10 for (x,y,z) gives 60 encoding dimensions; L=4 for viewing direction (\\theta,\\phi) gives 24 dimensions.',
      ],
    },
    {
      id: 'q-cv3d-kp43-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'NeRF training convergence on a single scene typically requires 100K-300K gradient steps and takes hours to days on a single GPU, which is the primary motivation for instant-NGP and subsequent accelerated NeRF methods.',
      correctAnswer: 'true',
      explanation: '**Step 1**: Original NeRF training takes 1-2 days on a single V100 GPU for 300K iterations over one scene.. The bottleneck is querying the MLP at thousands of points per ray for millions of rays.\n\n**Step 2**: Instant-NGP (Müller et al.. 2022) replaces the large MLP with a multi-resolution hash grid encoding + tiny MLP, reducing training to 5 seconds and rendering to real-time.\n\n**Step 3**: TensoRF, Zip-NeRF, and Gaussian Splatting are further alternatives addressing the same convergence speed problem.',
      hints: [
        'Per-scene optimisation: NeRF trains one model per scene - it does not generalise across scenes without additional work.',
        "Instant-NGP's multi-resolution hash grid amortises the spatial structure, making the MLP query much cheaper.",
      ],
    },
  ],
  'gaussian-splatting-core': [
    {
      id: 'q-cv3d-kp44-1',
      type: 'multiple-choice',
      difficulty: 'hard',
      question: '3D Gaussian Splatting (3DGS) achieves real-time novel view synthesis at 100+ FPS - far faster than NeRF. What is the primary architectural reason for this speed advantage?',
      options: [
        '3DGS uses a smaller MLP than NeRF (3 layers instead of 8), reducing per-sample compute',
        '3DGS represents the scene as explicit 3D Gaussians that are rasterised via differentiable splatting onto the image plane - eliminating per-ray MLP queries entirely and leveraging GPU-optimised tile-based rasterisation that is orders of magnitude faster than volumetric ray marching',
        '3DGS trains on lower-resolution images (128\\times128) and upsamples to full resolution with a super-resolution network',
        '3DGS uses pre-computed light fields that cache all possible view directions, trading memory for speed',
      ],
      correctAnswer: 1,
      explanation: '**Step 1**: 3DGS (Kerbl et al.. 2023) initialises Gaussians from SfM point clouds, each defined by position \\mu, covariance \\Sigma (represented as rotation R and scale S: \\Sigma=RSS^T R^T), opacity \\alpha, and view-dependent colour (spherical harmonics coefficients).\n\n**Step 2**: Rendering projects 3D Gaussians to 2D screen-space ellipses via \\Sigma′ = JW\\Sigma(JW)^T and sorts them by depth for alpha compositing.. The tile-based rasteriser processes 16\\times16 pixel tiles in parallel on the GPU.\n\n**Step 3**: No MLP query is needed at render time - each Gaussian is an explicit, parameterised primitive evaluated analytically.',
      hints: [
        'Alpha compositing of sorted Gaussians in screen space is a classical graphics operation, easily GPU-parallelised.',
        'Spherical harmonics for colour: degree-3 SH gives view-dependent colour with 48 coefficients per Gaussian.',
      ],
    },
    {
      id: 'q-cv3d-kp44-2',
      type: 'true-false',
      difficulty: 'medium',
      question: '3D Gaussian Splatting optimises scene parameters (Gaussian positions, covariances, opacities, and spherical harmonic colour coefficients) using standard backpropagation through a differentiable rasteriser with a photometric loss against training images.',
      correctAnswer: 'true',
      explanation: "3DGS trains all Gaussian parameters end-to-end via gradient descent. The differentiable tile rasteriser (CUDA implementation) allows gradients to flow back from pixel-level L1 + SSIM photometric loss to each Gaussian's \\mu, \\Sigma, \\alpha, and SH coefficients. Adaptive density control (splitting, cloning, pruning) is applied every 100 iterations based on positional gradient magnitudes. After training (~30 minutes on a V100), the explicit Gaussian scene can be rendered at real-time rates.",
      hints: [
        'The CUDA rasteriser is custom-written with backward passes for each Gaussian parameter - not using standard autograd.',
        'Loss = \\lambda\\cdotL1(render, gt) + (1−\\lambda)\\cdot(1−SSIM(render, gt)) with \\lambda=0.8.',
      ],
    },
    {
      id: 'q-cv3d-kp44-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'PointNet (Qi et al. 2017) processes unordered point clouds by applying shared MLPs to each point independently, then using a global max pooling operation. Why is max pooling specifically chosen as the aggregation function?',
      options: [
        'Max pooling is differentiable everywhere, unlike mean pooling which has zero gradient for non-maximum elements',
        'Max pooling produces a permutation-invariant global feature: regardless of the order points are fed into the network, max pooling always selects the same maximum-response elements - making the model insensitive to point ordering',
        'Max pooling reduces memory usage by a factor equal to the number of points, enabling processing of large point clouds',
        'Max pooling selects the geometrically most distant point from the centroid, providing a compact shape descriptor',
      ],
      correctAnswer: 1,
      explanation: "Point clouds have no canonical ordering - the same shape can be represented as any permutation of its points. PointNet's key insight: applying a symmetric function (one whose output is invariant to input permutation) solves this. Max pooling is a symmetric function: max(f(p\\_1), f(p\\_2), …) = max(f(p_{\\pi(1)}), f(p_{\\pi(2)}), …) for any permutation \\pi. The network architecture: T-Net (input transform) \\to shared MLP \\to T-Net (feature transform) \\to shared MLP \\to max pool \\to global feature \\to classification/segmentation head.",
      hints: [
        'Symmetry requirement: any function g(p\\_1, …, p\\_n) = g(p_{\\pi(1)}, …, p_{\\pi(n)}) for all \\pi is a valid aggregation for unordered sets.',
        "Max pooling is also a 'critical point set' selector: the global feature is determined by a sparse subset of points that achieve the maximum response - PointNet's theoretical robustness guarantee.",
      ],
    },
  ],
}

Object.assign(questions, moreVision3dQuestions)

export default questions;
