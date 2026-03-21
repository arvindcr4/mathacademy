import type { Question } from '@/lib/curriculum'
import { registerQuestions } from '@/lib/questions'

const questions: Record<string, Question[]> = {
  // ── cv-kp-1: Image Fundamentals ───────────────────────────────────────────
  'image-fundamentals': [
    {
      id: 'q-cv-kp1-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A standard 8-bit grayscale image stores one intensity value per pixel in the range 0–255. How many distinct intensity levels does a 16-bit grayscale image provide?',
      options: [
        '512 levels (2 × 256)',
        '4096 levels (16 × 256)',
        '65536 levels (2¹⁶)',
        '32768 levels (2¹⁵)',
      ],
      correctAnswer: 2,
      explanation: 'An n-bit image stores 2ⁿ intensity levels per channel. A 16-bit grayscale image provides 2¹⁶ = 65536 distinct levels, enabling finer precision in medical imaging and HDR photography compared to the 256 levels of 8-bit.',
      hints: [
        'Each bit doubles the number of representable values: 8 bits → 256, 16 bits → ?',
        'Apply 2ⁿ where n = 16.',
      ],
    },
    {
      id: 'q-cv-kp1-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Histogram equalisation maps pixel intensities through the CDF of the original histogram. If an image has CDF value 0.6 at intensity 128, what output intensity does histogram equalisation assign to pixels with value 128 (assuming 8-bit output)?',
      options: [
        '128 (no change)',
        '153 (0.6 × 255 ≈ 153)',
        '76 (0.6 × 128)',
        '200 (fixed midpoint mapping)',
      ],
      correctAnswer: 1,
      explanation: 'Histogram equalisation applies the transform T(r) = round((L-1) × CDF(r)) where L = 256. With CDF(128) = 0.6: T(128) = round(255 × 0.6) = round(153) = 153. This stretches the intensity range so the histogram approximates uniform.',
      hints: [
        'The equalisation formula is T(r) = (L-1) × CDF(r). Substitute L=256, CDF=0.6.',
        'Multiplying the CDF (0.6) by the max output value (255) gives the output intensity.',
      ],
    },
    {
      id: 'q-cv-kp1-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'An RGB image is 1920 × 1080 pixels with 8 bits per channel. What is its uncompressed size in megabytes (MB)?',
      options: [
        'Approximately 2.1 MB',
        'Approximately 6.2 MB',
        'Approximately 8.3 MB',
        'Approximately 12.4 MB',
      ],
      correctAnswer: 1,
      explanation: 'Uncompressed size = width × height × channels × bytes-per-channel = 1920 × 1080 × 3 × 1 = 6,220,800 bytes ≈ 6.2 MB. This is why JPEG compression (typically 10–20× reduction) is essential for storing and transmitting photographs.',
      hints: [
        'Three channels (R, G, B), each 8 bits = 1 byte. Total = 1920 × 1080 × 3 bytes.',
        '1 MB = 1,048,576 bytes. Divide the total byte count to get MB.',
      ],
    },
  ],

  // ── cv-kp-2: Convolutions & Feature Maps ──────────────────────────────────
  'convolutions': [
    {
      id: 'q-cv-kp2-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A convolutional layer applies a 3×3 filter with stride 2 and no padding to a 7×7 input feature map. Using the formula output_size = ⌊(W − F + 2P)/S⌋ + 1, what is the output spatial dimension?',
      options: [
        '5×5',
        '4×4',
        '3×3',
        '2×2',
      ],
      correctAnswer: 2,
      explanation: 'Applying the formula: (7 − 3 + 2×0)/2 + 1 = 4/2 + 1 = 2 + 1 = 3. The output is 3×3. This formula from CS231n defines the spatial size produced by any conv layer: W=input size, F=filter size, P=padding, S=stride.',
      hints: [
        'The formula is ⌊(W − F + 2P) / S⌋ + 1. Substitute W=7, F=3, P=0, S=2.',
        '(7 − 3) / 2 + 1 = 4/2 + 1 = 3.',
      ],
    },
    {
      id: 'q-cv-kp2-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'A convolutional layer has 64 filters of size 3×3 applied to a 32-channel input with a bias per filter. How many learnable parameters does this layer have?',
      options: [
        '576 (3 × 3 × 64)',
        '18432 (3 × 3 × 32 × 64)',
        '18496 (3 × 3 × 32 × 64 + 64)',
        '36928 (3 × 3 × 32 × 64 × 2)',
      ],
      correctAnswer: 2,
      explanation: 'Each filter has shape 3×3×32 (height × width × input_channels) = 288 weights, plus 1 bias = 289 per filter. With 64 filters: 64 × (3×3×32 + 1) = 64 × 289 = 18,496 parameters. Note that parameter count is independent of output spatial size.',
      hints: [
        'Each filter spans all input channels: 3×3×32 weights per filter.',
        'Add 1 bias per filter: 64 × (3×3×32 + 1) = 64 × 289.',
      ],
    },
    {
      id: 'q-cv-kp2-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is "same" padding in a convolutional layer, and what padding P is needed to maintain spatial size for a 3×3 filter with stride 1?',
      options: [
        '"Same" padding adds zeros so the output has the same size as input; for a 3×3 filter with stride 1, P=1 is required',
        '"Same" padding adds the same value as the nearest border pixel; P=0 is used',
        '"Same" padding duplicates the filter weights symmetrically; P=2 is required for a 3×3 filter',
        '"Same" padding adds zeros so the output size is exactly half the input; P=1 is required',
      ],
      correctAnswer: 0,
      explanation: '"Same" padding ensures output size = ⌈W/S⌉. For stride 1, output = input size requires P = (F−1)/2. For F=3: P = (3−1)/2 = 1. Each border is padded by 1 zero, so a 7×7 input with 3×3 filter, S=1, P=1 produces (7−3+2)/1+1 = 7×7 output.',
      hints: [
        'Setting output = input requires (W − F + 2P)/S + 1 = W, solve for P with S=1.',
        'For F=3: P = (F-1)/2 = 1.',
      ],
    },
  ],

  // ── cv-kp-3: CNN Architectures ────────────────────────────────────────────
  'cnn-architectures': [
    {
      id: 'q-cv-kp3-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'ResNet-50 uses "bottleneck" residual blocks with three conv layers (1×1, 3×3, 1×1). What is the purpose of the two 1×1 convolutions flanking the 3×3 conv?',
      options: [
        'They perform spatial downsampling to reduce the 3×3 conv input size',
        'The first 1×1 reduces channel depth before the 3×3 conv (lowering cost), and the second 1×1 restores it, significantly cutting FLOPs',
        'They act as attention gates that selectively pass information to the 3×3 conv',
        'They replace batch normalisation by normalising channel statistics to unit variance',
      ],
      correctAnswer: 1,
      explanation: 'The bottleneck reduces channels from, say, 256 → 64 with a 1×1 conv before the 3×3, then expands back 64 → 256 with another 1×1. This means the expensive 3×3 conv operates on 64 channels instead of 256, reducing FLOPs by (256/64)² = 16× for the 3×3, at the cost of two cheap 1×1 convs — a net saving of ~4× over a plain block.',
      hints: [
        'The 3×3 conv is the expensive operation. Reducing its input channels drops the cost quadratically.',
        'Bottleneck = narrow in the middle: 256→64→64→256.',
      ],
    },
    {
      id: 'q-cv-kp3-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'The Inception module in GoogLeNet applies 1×1, 3×3, and 5×5 convolutions in parallel. Why are 1×1 convolutions inserted before the 3×3 and 5×5 branches?',
      options: [
        'To apply non-linear activation before the larger filters, acting as a learned preprocessing step',
        'To reduce the number of input channels (dimensionality reduction) before the expensive larger convolutions, significantly cutting FLOPs',
        'To ensure the output of each branch has the same spatial size for concatenation',
        'To share weights between branches so that all three filter sizes learn the same features',
      ],
      correctAnswer: 1,
      explanation: 'Without 1×1 bottlenecks, a 5×5 conv on 256 input channels costs 5×5×256×256 ≈ 1.6M multiply-adds per spatial location. A 1×1 reducing to 32 channels first costs 1×1×256×32 + 5×5×32×256 ≈ 213K — about 7.5× fewer FLOPs. This is the "Network in Network" dimensionality reduction that made GoogLeNet practical.',
      hints: [
        'FLOPs for a conv scale as F×F×C_in×C_out. Reducing C_in with a 1×1 first drops the cost of larger filters.',
        'EfficientNet-B7 uses φ=7, giving a 600×600 input and ~66M parameters with state-of-the-art accuracy.',
      ],
    },
    {
      id: 'q-cv-kp3-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'EfficientNet uses a compound scaling coefficient φ to jointly scale depth (d = 1.2^φ), width (w = 1.1^φ), and resolution (r = 1.15^φ) so that total FLOPs grow as approximately 2^φ.',
      correctAnswer: 'true',
      explanation: 'EfficientNet\'s compound scaling multiplies depth by α·β²·γ² ≈ 2 (so FLOPs ≈ 2φ). The coefficients α=1.2, β=1.1, γ=1.15 were found by grid search on EfficientNet-B0, giving a principled multi-dimensional scaling law outperforming single-dimension scaling at equal FLOPs.',
      hints: [
        'FLOPs scale as depth × width² × resolution², so α·β²·γ² ≈ 2 keeps FLOPs doubling per unit φ.',
        'EfficientNet-B7 uses φ=7, giving a 600×600 input and ~66M parameters with state-of-the-art accuracy.',
      ],
    },
  ],

  // ── cv-kp-4: Batch Normalization in CNNs ──────────────────────────────────
  'batch-normalization-cv': [
    {
      id: 'q-cv-kp4-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'The Batch Normalisation formula is x̂ᵢ = (xᵢ − μ_B) / √(σ²_B + ε), then yᵢ = γx̂ᵢ + β. What roles do the learnable parameters γ and β play?',
      options: [
        'γ clips the normalised activation to [-1, 1] and β re-centres it at 0.5',
        'γ (scale) and β (shift) allow the network to represent any linear function of the normalised activation, including undoing normalisation if optimal — preserving network expressiveness',
        'γ controls the batch size used for computing statistics and β sets the learning rate for BN parameters',
        'γ replaces the weight matrix and β replaces the bias in the layer following BN',
      ],
      correctAnswer: 1,
      explanation: 'After normalising to zero mean and unit variance, applying y = γx̂ + β re-introduces learnable scale and shift. If γ = σ and β = μ the layer can recover the original distribution — meaning BN never restricts representational capacity. In practice γ and β are learned to find the optimal activation statistics for each feature.',
      hints: [
        'If BN always forced zero mean and unit variance, would that restrict what the network can represent?',
        'γ and β give BN the ability to learn the best scale/shift, not just impose unit Gaussian.',
      ],
    },
    {
      id: 'q-cv-kp4-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Why can Batch Normalization behave differently at training time versus inference time?',
      options: [
        'During inference, the batch size is always 1, causing division by zero in the normalisation',
        'At inference, running mean and variance statistics (accumulated during training as exponential moving averages) are used instead of per-mini-batch statistics',
        'During inference, the γ and β parameters are frozen to their initial values',
        'Batch Norm uses different activation functions at training vs. inference time',
      ],
      correctAnswer: 1,
      explanation: 'During training, BN normalises using mini-batch mean μ_B and variance σ²_B computed over the current batch. At inference, a single sample has no meaningful "batch", so BN uses running estimates: μ_run = momentum·μ_run + (1-momentum)·μ_B accumulated during training. These fixed statistics make inference deterministic and independent of batch size.',
      hints: [
        'With a single test sample, the "batch mean" would just be that one sample\'s value — not a population statistic.',
        'Training accumulates running averages that substitute for batch statistics at inference.',
      ],
    },
    {
      id: 'q-cv-kp4-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Batch Normalization eliminates the need for careful weight initialisation in deep neural networks.',
      correctAnswer: 'false',
      explanation: 'While Batch Norm greatly reduces sensitivity to initialisation by stabilising activations across layers, good initialisation (e.g., He initialisation for ReLU: std = √(2/fan_in)) still improves early convergence and avoids saturated or exploding activations in the very first forward pass before BN statistics stabilise.',
      hints: [
        'BN stabilises activations during training — but what happens in the very first forward pass before any statistics are accumulated?',
        'He initialisation sets variance to prevent signals from shrinking or exploding through deep ReLU networks.',
      ],
    },
  ],

  // ── cv-kp-5: Object Detection ─────────────────────────────────────────────
  'object-detection': [
    {
      id: 'q-cv-kp5-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'A predicted bounding box has area 60 px² and a ground truth box has area 80 px². Their intersection is 40 px². What is the IoU (Intersection over Union)?',
      options: [
        '0.40 (intersection / predicted area)',
        '0.50 (intersection / gt area)',
        '0.40 (40 / (60 + 80 − 40))',
        '0.67 (40 / 60)',
      ],
      correctAnswer: 2,
      explanation: 'IoU = |A ∩ B| / |A ∪ B|. Union = area_A + area_B − intersection = 60 + 80 − 40 = 100. IoU = 40/100 = 0.40. In Pascal VOC, a detection is a true positive when IoU ≥ 0.5; COCO averages AP over IoU thresholds 0.50:0.05:0.95.',
      hints: [
        'Union = sum of both areas minus intersection (to avoid double-counting the overlap).',
        '60 + 80 − 40 = 100. IoU = 40/100.',
      ],
    },
    {
      id: 'q-cv-kp5-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'When computing Average Precision (AP) for a single class in object detection, what are the correct steps in order?',
      options: [
        '(1) Sort all detections by confidence descending; (2) label each as TP (IoU ≥ threshold with unmatched GT) or FP; (3) compute cumulative precision and recall at each detection; (4) compute area under the precision-recall curve',
        '(1) Sort detections by bounding-box area; (2) match each to the nearest GT box; (3) compute F1 at 50% recall; (4) average F1 across all images',
        '(1) Compute IoU for all predicted-GT pairs; (2) select the pair with maximum IoU; (3) compute precision at that IoU; (4) repeat for all GT boxes',
        '(1) Threshold confidence at 0.5; (2) remove duplicates with NMS; (3) compute recall; (4) compute precision at 50% recall threshold',
      ],
      correctAnswer: 0,
      explanation: 'Standard AP (VOC/COCO): (1) rank all detections by confidence score descending; (2) for each detection in rank order, if its IoU with any unmatched GT box ≥ threshold it is a TP (mark that GT matched), else FP; (3) compute cumulative precision P(k) = TP/(TP+FP) and recall R(k) = TP/num_GT at each rank k; (4) AP = area under P-R curve (interpolated at 11 recall points for VOC, continuous for COCO). mAP averages AP over all classes.',
      hints: [
        'The key step is sorting by confidence — high-confidence detections are evaluated first.',
        'Once a GT box is matched, subsequent detections overlapping it are FPs even if IoU ≥ threshold.',
      ],
    },
    {
      id: 'q-cv-kp5-3',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'DETR uses bipartite (Hungarian) matching between predictions and ground truth during training. Why does this eliminate the need for Non-Maximum Suppression (NMS) at inference?',
      options: [
        'DETR uses sigmoid instead of softmax activation, so multiple predictions can be confident about different objects without overlap',
        'Hungarian matching enforces a bijective (one-to-one) assignment between object queries and GT boxes during training, so each query learns to predict at most one unique object — duplicates cannot emerge at inference',
        'DETR predicts masks instead of bounding boxes, so bounding-box NMS is not applicable',
        'DETR applies NMS during training but removes it at inference by clamping confidence scores',
      ],
      correctAnswer: 1,
      explanation: 'DETR uses N object queries (e.g., N=100) and the Hungarian algorithm finds the unique minimum-cost bijection between predictions and GT. Each GT is matched to exactly one query and each query is matched to at most one GT. Since training enforces uniqueness, the model cannot learn to produce duplicate detections for the same object — making NMS unnecessary, unlike anchor-based detectors that can produce many overlapping predictions per object.',
      hints: [
        'NMS is needed when multiple anchors/proposals detect the same object. What prevents that in DETR?',
        'Bijective means one-to-one: each query "owns" at most one GT, so duplicates cannot be trained in.',
      ],
    },
  ],

  // ── cv-kp-6: Semantic Segmentation ───────────────────────────────────────
  'semantic-segmentation': [
    {
      id: 'q-cv-kp6-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Mean IoU (mIoU) is the standard metric for semantic segmentation. For a binary segmentation problem, if TP=80, FP=20, FN=10, what is the IoU for the foreground class?',
      options: [
        '0.73 (80 / (80 + 20 + 10))',
        '0.80 (80 / (80 + 20))',
        '0.89 (80 / (80 + 10))',
        '0.75 (80 / (80 + 20 + 10 − 80/2))',
      ],
      correctAnswer: 0,
      explanation: 'For a single class, IoU = TP / (TP + FP + FN) = 80 / (80 + 20 + 10) = 80/110 ≈ 0.727. mIoU averages this over all classes including background. Note FP are predicted-foreground but actually-background pixels; FN are actually-foreground but predicted-background pixels.',
      hints: [
        'IoU for segmentation = TP / (TP + FP + FN). This equals intersection/union on pixel sets.',
        '80 / (80 + 20 + 10) = 80/110 ≈ 0.73.',
      ],
    },
    {
      id: 'q-cv-kp6-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Fully Convolutional Networks (FCN) for segmentation produce coarse feature maps that must be upsampled. What does "FCN-32s" vs. "FCN-8s" refer to?',
      options: [
        'FCN-32s upsamples the pool5 output directly by 32× in one step; FCN-8s fuses pool3 (8× downsampled) and pool4 skip features before upsampling by 8×, producing finer predictions',
        'FCN-32s uses 32 filters in the last convolutional layer; FCN-8s uses 8 filters for a lighter model',
        'FCN-32s operates at 32-pixel stride for fast inference; FCN-8s processes 8 overlapping patches per pixel',
        'FCN-32s applies 32-bit floating point weights; FCN-8s applies 8-bit quantised weights',
      ],
      correctAnswer: 0,
      explanation: 'In Long et al. (2015), FCN-32s takes the coarsest pool5 feature map (32× downsampled) and upsamples it 32× in one bilinear step — blurry output. FCN-16s adds a skip from pool4 (16× downsampled) before a 16× upsample. FCN-8s adds pool3 (8× downsampled) for a finer 8× upsample, improving boundary localisation with each added skip.',
      hints: [
        'The number refers to the stride of the coarsest feature map used; larger stride = coarser predictions.',
        'Adding skip connections from earlier, higher-resolution layers recovers spatial detail lost to downsampling.',
      ],
    },
    {
      id: 'q-cv-kp6-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Semantic segmentation and instance segmentation produce the same output for a scene with multiple objects of the same class.',
      correctAnswer: 'false',
      explanation: 'Semantic segmentation labels all pixels of a given class identically (e.g., all cars share the label "car" with no further distinction), while instance segmentation assigns each individual object a unique mask ID — so two cars receive different instance labels but the same semantic label.',
      hints: [
        'If three people are in the image, semantic segmentation labels all their pixels "person" with no further distinction.',
        'What additional information does instance segmentation provide that semantic segmentation withholds?',
      ],
    },
  ],

  // ── cv-kp-7: Instance Segmentation ───────────────────────────────────────
  'instance-segmentation': [
    {
      id: 'q-cv-kp7-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'How does Mask R-CNN extend Faster R-CNN to perform instance segmentation?',
      options: [
        'It replaces the RPN with a segmentation-specific region proposal network',
        'It adds a parallel binary mask prediction head to the per-ROI classification and box regression heads',
        'It uses a fully convolutional decoder that runs before region proposals are generated',
        'It replaces bounding box regression with direct mask contour point regression',
      ],
      correctAnswer: 1,
      explanation: 'Mask R-CNN adds a small FCN (fully convolutional network) mask head in parallel with the existing box and class heads, predicting a binary mask for each region of interest independently of class prediction.',
      hints: [
        'Faster R-CNN already detects and classifies objects — what extra output does instance segmentation need?',
        'The mask head runs per-ROI, predicting a fixed-size binary mask for each detected instance.',
      ],
    },
    {
      id: 'q-cv-kp7-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What problem does ROI Align solve compared to ROI Pool in Mask R-CNN?',
      options: [
        'ROI Align uses bilinear interpolation to avoid quantisation errors when extracting fixed-size features from misaligned regions',
        'ROI Align reduces the number of region proposals to improve speed',
        'ROI Align replaces max pooling with average pooling for smoother feature aggregation',
        'ROI Align normalises the feature values within each region for stable training',
      ],
      correctAnswer: 0,
      explanation: 'ROI Pool discretises (quantises) the ROI coordinates to the nearest integer, introducing spatial misalignment; ROI Align uses bilinear interpolation at exact sub-pixel locations, greatly improving mask accuracy.',
      hints: [
        'Rounding coordinates to integers introduces a small but systematic spatial shift — why does that matter for precise masks?',
        'Bilinear interpolation allows sampling at non-integer grid positions — how does that preserve alignment?',
      ],
    },
    {
      id: 'q-cv-kp7-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Instance segmentation requires detecting individual object instances, so it is impossible to achieve without a region proposal or anchor-based detection stage.',
      correctAnswer: 'false',
      explanation: 'Anchor-free methods like SOLO and SOLOv2 perform instance segmentation by predicting masks directly based on instance location and size categories, without any region proposal or anchor mechanism.',
      hints: [
        'SOLO (Segmenting Objects by LOcations) assigns each location to an instance — does it use anchors?',
        'Think about whether instance segmentation is fundamentally tied to the two-stage detection paradigm.',
      ],
    },
  ],

  // ── cv-kp-8: Image Classification & Transfer Learning ────────────────────
  'image-classification': [
    {
      id: 'q-cv-kp8-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the main advantage of 3D convolutions (C3D) over 2D convolutions for video understanding?',
      options: [
        '3D convolutions require fewer parameters than 2D convolutions on the same input',
        '3D convolutions jointly model spatial and temporal patterns by applying filters across both spatial dimensions and the time axis',
        '3D convolutions can process variable-length videos without padding',
        '3D convolutions eliminate the need for optical flow as a separate input stream',
      ],
      correctAnswer: 1,
      explanation: '3D convolutional filters extend into the time dimension, learning spatiotemporal patterns (e.g., motion of body parts) directly from raw video frames, unlike 2D CNNs which process each frame independently.',
      hints: [
        'A 2D CNN applied per frame captures appearance but not motion — what does adding the time dimension enable?',
        '3D filters have shape (T×H×W) — what does the T dimension capture?',
      ],
    },
    {
      id: 'q-cv-kp8-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'SlowFast networks use two parallel pathways with different temporal sampling rates. What does each pathway capture?',
      options: [
        'The Slow pathway captures long-term audio; the Fast pathway captures short-term visual motion',
        'The Slow pathway (low frame rate) captures spatial semantics; the Fast pathway (high frame rate) captures fine temporal motion',
        'The Slow pathway processes low-resolution frames; the Fast pathway processes high-resolution frames',
        'The Slow pathway uses 3D convolutions; the Fast pathway uses 2D convolutions on optical flow',
      ],
      correctAnswer: 1,
      explanation: 'SlowFast has a Slow pathway (few frames, high channel capacity) for semantic content and a Fast pathway (many frames, few channels) for motion, with lateral connections fusing them — inspired by the primate visual system\'s P and M cell pathways.',
      hints: [
        'If the model only sees normal images during training, what does it learn?',
        'The momentum teacher provides stable targets — how does centering prevent the teacher from always outputting the same thing?',
      ],
    },
    {
      id: 'q-cv-kp8-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'TimeSformer applies transformer self-attention separately over the spatial and temporal dimensions (divided space-time attention) to make video classification tractable.',
      correctAnswer: 'true',
      explanation: 'TimeSformer uses divided attention — separate temporal and spatial attention operations per layer — rather than full space-time attention over all patch-frame pairs, reducing the quadratic cost of attending over both dimensions simultaneously.',
      hints: [
        'The forward process destroys the image by adding noise — the reverse process is learned to undo this.',
        'Think about how starting from noise and iteratively refining it could produce a coherent image.',
      ],
    },
  ],

  // ── cv-kp-9: Data Augmentation ────────────────────────────────────────────
  'data-augmentation-cv': [
    {
      id: 'q-cv-kp9-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the primary purpose of data augmentation during CNN training?',
      options: [
        'To increase the number of model parameters for greater capacity',
        'To artificially increase dataset diversity and reduce overfitting by applying label-preserving transformations',
        'To speed up training by reducing the number of unique images processed',
        'To normalise pixel values to zero mean and unit variance',
      ],
      correctAnswer: 1,
      explanation: 'Data augmentation applies label-preserving transforms (flips, crops, colour jitter, rotation) to create diverse training variants, exposing the model to a wider input distribution and reducing overfitting without collecting new data. Standard augmentation (random crop + horizontal flip) improved AlexNet top-5 error by ~1.5% on ImageNet.',
      hints: [
        'A model trained only on upright objects may fail when they appear rotated — how does augmentation address this?',
        'The label stays the same after a horizontal flip of a cat image — why is label preservation critical?',
      ],
    },
    {
      id: 'q-cv-kp9-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Mixup creates a training sample by forming x̃ = λxᵢ + (1−λ)xⱼ and ỹ = λyᵢ + (1−λ)yⱼ where λ ~ Beta(α, α). If α=0.2 and λ=0.7, and image i is class "cat" (one-hot [1,0]) while image j is class "dog" ([0,1]), what is the mixed label ỹ?',
      options: [
        '[1, 0] — the dominant class cat wins',
        '[0.7, 0.3] — 70% cat, 30% dog',
        '[0.5, 0.5] — always uniform',
        '[0.2, 0.8] — alpha controls the label directly',
      ],
      correctAnswer: 1,
      explanation: 'ỹ = λ·[1,0] + (1−λ)·[0,1] = [0.7, 0.3]. The model is trained with a soft target: 70% "cat", 30% "dog". Both the pixels and labels are linearly interpolated with the same λ. This soft supervision encourages smoother decision boundaries and better-calibrated confidence, reducing overconfident predictions.',
      hints: [
        'Apply the formula ỹ = λyᵢ + (1−λ)yⱼ with λ=0.7, yᵢ=[1,0], yⱼ=[0,1].',
        '0.7×[1,0] + 0.3×[0,1] = [0.7, 0] + [0, 0.3] = [0.7, 0.3].',
      ],
    },
    {
      id: 'q-cv-kp9-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'CutMix replaces a rectangular patch of one image with pixels from another, and adjusts the mixed label proportionally to the area ratio of the patch, so if a 112×112 patch is cut into a 224×224 image the label weight for the pasted image is 0.25.',
      correctAnswer: 'true',
      explanation: 'CutMix label weight = cut area / total image area = (112×112) / (224×224) = 12544/50176 = 0.25. If image i is "cat" and the 25%-area patch comes from image j "dog", the label is 0.75·yᵢ + 0.25·yⱼ = [0.75, 0.25]. Unlike Mixup which blends pixels, CutMix creates hard regional boundaries — teaching models to focus on discriminative local regions.',
      hints: [
        'If 99% of pixels are background, a model that always predicts background achieves 99% pixel accuracy — is that useful?',
        'Dice loss penalises based on overlap, not pixel count — how does that help when foreground is rare?',
      ],
    },
  ],

  // ── cv-kp-10: Vision Transformer (ViT) ───────────────────────────────────
  'vision-transformer-vit': [
    {
      id: 'q-cv-kp10-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'ViT-Base divides a 224×224 image into 16×16 patches. How many patch tokens does the transformer encoder receive (excluding the [CLS] token)?',
      options: [
        '49 tokens (224/16 = 14, then 7×7)',
        '196 tokens (14×14)',
        '256 tokens (16×16)',
        '784 tokens (28×28)',
      ],
      correctAnswer: 1,
      explanation: 'With patch size 16×16 on a 224×224 image: 224/16 = 14 patches per side. Total patch tokens = 14×14 = 196. Adding the special [CLS] token gives 197 tokens fed to the transformer. The [CLS] token\'s final embedding is used for classification.',
      hints: [
        '224 ÷ 16 = 14 patches along each spatial dimension.',
        '14 × 14 = 196 patch tokens (plus 1 [CLS] = 197 total).',
      ],
    },
    {
      id: 'q-cv-kp10-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Self-attention in a transformer has O(N²) complexity in the number of tokens N. For ViT with 196 patch tokens, how does this compare to a CNN layer with local 3×3 receptive fields at the same resolution?',
      options: [
        'ViT self-attention is O(196²) = O(38416) pairwise interactions per head, while the CNN\'s local 3×3 attention is O(196 × 9) = O(1764) — ViT attends globally at quadratically higher cost but captures long-range dependencies the CNN cannot in a single layer',
        'ViT self-attention is cheaper because transformers use sparse attention patterns trained by backpropagation',
        'Both have identical complexity because ViT patches and CNN receptive fields process the same number of pixels',
        'ViT self-attention is O(N log N) due to the softmax normalisation in the attention formula',
      ],
      correctAnswer: 0,
      explanation: 'Standard self-attention computes pairwise dot products between all N tokens: O(N²·d) per layer. For N=196, that is 196²=38,416 pairs per head. A CNN 3×3 conv attends to at most 9 neighbors per position: O(196×9×d). ViT pays ~21× more for global context; Swin Transformer reduces this with windowed local attention O(N×w²) while hierarchically expanding receptive fields.',
      hints: [
        'Attention computes a score for every pair (i, j) of tokens. N tokens → N² pairs.',
        'A CNN\'s 3×3 kernel at each position attends to 9 neighbors, not all 196 positions.',
      ],
    },
    {
      id: 'q-cv-kp10-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'ViT uses positional encodings for its patch sequence because self-attention is permutation-invariant and cannot infer spatial order from patch content alone.',
      correctAnswer: 'true',
      explanation: 'Self-attention is a set operation: attention(Q, K, V) is unchanged if tokens are permuted consistently. Without positional encodings, a ViT processing row-by-row vs. column-by-column shuffled patches would produce identical outputs — destroying spatial structure. Learnable 1D position embeddings added to each patch embedding inject spatial order.',
      hints: [
        'Shuffle 196 patches randomly — without positional encodings, does the transformer produce a different output?',
        'Position embeddings encode "patch at row i, column j" so the model knows spatial arrangement.',
      ],
    },
  ],

  // ── cv-kp-11: Self-Supervised Learning in CV ──────────────────────────────
  'self-supervised-cv': [
    {
      id: 'q-cv-kp11-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the core idea behind contrastive self-supervised learning (e.g., SimCLR)?',
      options: [
        'Predicting masked image patches from surrounding context',
        'Pulling together representations of different augmented views of the same image and pushing apart representations of different images',
        'Classifying images into pseudo-labels generated by k-means clustering',
        'Training a generator and discriminator adversarially on unlabelled images',
      ],
      correctAnswer: 1,
      explanation: 'SimCLR creates two augmented views of each image and trains the encoder to maximise agreement (similarity) between views of the same image while minimising it for views of different images in a batch.',
      hints: [
        'Different features in an image exist at different scales — how would multiple filter sizes help?',
        '1×1 convolutions within the Inception module are used for dimensionality reduction before larger filters.',
      ],
    },
    {
      id: 'q-cv-kp11-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'How does DINO (Self-DIstillation with NO labels) avoid representation collapse without explicit negative pairs?',
      options: [
        'By using a momentum encoder as a teacher and applying centering and sharpening to the teacher\'s output distribution',
        'By adding a batch normalisation layer between the encoder and projection head',
        'By predicting the cluster assignment of patches in a codebook with a cross-entropy loss',
        'By training with very large batch sizes to ensure diverse negative samples',
      ],
      correctAnswer: 0,
      explanation: 'DINO uses a student-teacher framework where the teacher is an exponential moving average of the student; centering (subtracting a running mean) and sharpening (low temperature) of teacher outputs prevent collapse without requiring negative pairs.',
      hints: [
        'Collapse occurs when all representations become identical — what prevents this if there are no explicit negatives?',
        'The momentum teacher provides stable targets — how does centering prevent the teacher from always outputting the same thing?',
      ],
    },
    {
      id: 'q-cv-kp11-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Self-supervised pretraining in computer vision requires large amounts of labelled data to generate the pretraining signal.',
      correctAnswer: 'false',
      explanation: 'Self-supervised methods derive their learning signal from the data itself (e.g., augmentation agreement, masked patch prediction) without any human-provided labels, making them applicable to large unlabelled image collections.',
      hints: [
        'The term "self-supervised" implies the supervision comes from the data itself — where do labels come from?',
        'Think about how you can construct a pretraining task using only the image and transformations applied to it.',
      ],
    },
  ],

  // ── cv-kp-12: Generative Models in CV ────────────────────────────────────
  'generative-cv': [
    {
      id: 'q-cv-kp12-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the role of the discriminator in a Generative Adversarial Network (GAN)?',
      options: [
        'To generate realistic images from random noise vectors',
        'To distinguish between real training images and fake images produced by the generator',
        'To encode real images into a latent space for the generator to sample from',
        'To compute the reconstruction loss between generated and real images',
      ],
      correctAnswer: 1,
      explanation: 'The discriminator is a binary classifier trained to tell real images from generated (fake) ones; its feedback provides the adversarial signal that drives the generator to produce increasingly realistic images.',
      hints: [
        'The generator and discriminator are trained adversarially — what signal does the generator receive?',
        'If the discriminator cannot tell real from fake, has the generator succeeded?',
      ],
    },
    {
      id: 'q-cv-kp12-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'How does a denoising diffusion probabilistic model (DDPM) generate images?',
      options: [
        'By sampling a latent vector and decoding it in a single forward pass through a decoder network',
        'By iteratively applying a learned denoising network to progressively remove noise from pure Gaussian noise over many steps',
        'By adversarially training a generator to fool a pixel-level discriminator',
        'By sampling tokens from a discrete image codebook using an autoregressive transformer',
      ],
      correctAnswer: 1,
      explanation: 'DDPMs define a forward process that gradually adds Gaussian noise to data over T steps, then train a network to reverse this process step by step; image generation starts from pure noise and iteratively denoises to a clean image.',
      hints: [
        'The forward process destroys the image by adding noise — the reverse process is learned to undo this.',
        'Think about how starting from noise and iteratively refining it could produce a coherent image.',
      ],
    },
    {
      id: 'q-cv-kp12-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'A Variational Autoencoder (VAE) learns to encode images into a continuous latent space from which new images can be sampled by decoding random latent vectors.',
      correctAnswer: 'true',
      explanation: 'The VAE encoder outputs parameters of a Gaussian distribution in latent space; the decoder maps samples from this distribution back to image space; the KL divergence term regularises the latent space to be smooth and continuous for generative sampling.',
      hints: [
        'Unlike a plain autoencoder, the VAE encodes to a distribution rather than a point — why does that enable sampling?',
        'If the latent space is continuous and structured, interpolating between latent vectors should produce coherent images.',
      ],
    },
  ],

  // ── cv-kp-13: Optical Flow & Video Understanding ──────────────────────────
  'optical-flow': [
    {
      id: 'q-cv-kp13-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does optical flow represent in a video sequence?',
      options: [
        'The change in pixel intensity values between two frames',
        'The apparent motion of pixels between consecutive frames as a 2D displacement field',
        'The depth of each pixel estimated from frame differences',
        'The camera pose transformation between consecutive frames',
      ],
      correctAnswer: 1,
      explanation: 'Optical flow is a dense 2D vector field where each vector represents the displacement (u, v) of a pixel from one frame to the next, capturing apparent motion of objects or the camera.',
      hints: [
        'Optical flow is a field of 2D vectors, one per pixel — what does each vector describe?',
        'Think about why this assumption is useful for optical flow estimation.',
        'What would optical flow be if brightness could change arbitrarily between frames?',
      ],
    },
    {
      id: 'q-cv-kp13-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Why is optical flow computed using the brightness constancy assumption?',
      options: [
        'It assumes that pixels with similar brightness in consecutive frames are likely to correspond to the same object',
        'It assumes that objects move in a way that preserves their brightness across frames',
        'It assumes that the camera is perfectly calibrated and doesn\'t suffer from motion blur',
        'It assumes that all pixels in an image have the same brightness',
      ],
      correctAnswer: 0,
      explanation: 'The brightness constancy assumption states that the brightness of a pixel does not change between frames unless the pixel is part of a moving object. This assumption is fundamental to optical flow estimation.',
      hints: [
        'Think about why this assumption is useful for optical flow estimation.',
        'What would optical flow be if brightness could change arbitrarily between frames?',
      ],
    },
    {
      id: 'q-cv-kp13-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Optical flow is a single vector field that describes the motion of all pixels in a video frame.',
      correctAnswer: 'false',
      explanation: 'Optical flow is a dense 2D vector field where each vector describes the motion of a specific pixel from one frame to the next. It is not a single vector field for all pixels.',
      hints: [
        'Each pixel in a video frame has its own optical flow vector.',
        'What would optical flow be if brightness could change arbitrarily between frames?',
      ],
    },
  ],

  // ── cv-kp-16: Medical Imaging AI ──────────────────────────────────────────
  'medical-imaging': [
    {
      id: 'q-cv-kp16-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Why is U-Net particularly popular for medical image segmentation tasks?',
      options: [
        'It was the first deep learning model to achieve human-level performance on ImageNet',
        'Its encoder-decoder architecture with skip connections preserves fine spatial detail needed for precise segmentation, even with limited training data',
        'It uses 3D convolutions natively for volumetric medical data',
        'It was specifically designed for CT scan Hounsfield unit normalisation',
      ],
      correctAnswer: 1,
      explanation: 'U-Net was designed for biomedical image segmentation where training data is scarce; skip connections recover high-resolution spatial detail lost during downsampling, enabling precise boundary delineation critical for medical analysis.',
      hints: [
        'Medical datasets are often small — what properties of U-Net help with limited data?',
        'Precise segmentation of tumours or organs requires fine spatial detail — how do skip connections preserve this?',
      ],
    },
    {
      id: 'q-cv-kp16-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the "class imbalance" challenge in medical image segmentation, and how is it commonly addressed?',
      options: [
        'Different hospitals use different imaging protocols; addressed by domain adaptation',
        'Pathological regions (e.g., tumours) occupy a small fraction of pixels; addressed using Dice loss or weighted cross-entropy to upweight minority pixels',
        'Some classes are harder to annotate than others; addressed by using semi-supervised learning',
        'CT and MRI produce different intensity ranges; addressed by Hounsfield unit normalisation',
      ],
      correctAnswer: 1,
      explanation: 'In medical segmentation, foreground lesions may occupy <1% of pixels, causing standard cross-entropy to underperform; Dice loss directly optimises overlap between predictions and ground truth, naturally handling class imbalance.',
      hints: [
        'If 99% of pixels are background, a model that always predicts background achieves 99% pixel accuracy — is that useful?',
        'Dice loss penalises based on overlap, not pixel count — how does that help when foreground is rare?',
      ],
    },
    {
      id: 'q-cv-kp16-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Transfer learning from ImageNet-pretrained models is always less effective for medical imaging than training from scratch on medical data.',
      correctAnswer: 'false',
      explanation: 'Despite the domain gap (natural vs. medical images), ImageNet-pretrained models transfer well to medical imaging when data is limited; low-level feature detectors (edges, textures) remain useful, and fine-tuning typically outperforms training from scratch on small medical datasets.',
      hints: [
        'Even though X-rays look different from natural photos, do they share low-level features like edges?',
        'When labelled medical data is scarce, what advantage does a pretrained initialisation provide?',
      ],
    },
  ],

  // ── cv-kp-17: Zero-Shot & Few-Shot Recognition ────────────────────────────
  'zero-shot-cv': [
    {
      id: 'q-cv-kp17-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does zero-shot image classification work in models like CLIP?',
      options: [
        'The model is trained on the test classes with no images, only class name descriptions',
        'Image embeddings are compared to text embeddings of class descriptions; the class with the highest cosine similarity is predicted',
        'A separate language model generates training images for unseen classes on the fly',
        'The model uses k-means clustering of visual features to assign images to class centroids',
      ],
      correctAnswer: 1,
      explanation: 'CLIP aligns image and text embeddings in a shared space; at inference, a prompt like "a photo of a {class}" is encoded as text and compared to the image embedding — the class with the highest similarity is selected without any class-specific visual training.',
      hints: [
        'CLIP is trained with paired image-text data — what shared space does this produce?',
        '"Zero-shot" means no labelled images of the test class — what acts as the class descriptor instead?',
      ],
    },
    {
      id: 'q-cv-kp17-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'How does DINO (Self-DIstillation with NO labels) avoid representation collapse without explicit negative pairs?',
      options: [
        'By using a momentum encoder as a teacher and applying centering and sharpening to the teacher\'s output distribution',
        'By adding a batch normalisation layer between the encoder and projection head',
        'By predicting the cluster assignment of patches in a codebook with a cross-entropy loss',
        'By training with very large batch sizes to ensure diverse negative samples',
      ],
      correctAnswer: 0,
      explanation: 'DINO uses a student-teacher framework where the teacher is an exponential moving average of the student; centering (subtracting a running mean) and sharpening (low temperature) of teacher outputs prevent collapse without requiring negative pairs.',
      hints: [
        'Collapse occurs when all representations become identical — what prevents this if there are no explicit negatives?',
        'The momentum teacher provides stable targets — how does centering prevent the teacher from always outputting the same thing?',
      ],
    },
    {
      id: 'q-cv-kp17-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Self-supervised pretraining in computer vision requires large amounts of labelled data to generate the pretraining signal.',
      correctAnswer: 'false',
      explanation: 'Self-supervised methods derive their learning signal from the data itself (e.g., augmentation agreement, masked patch prediction) without any human-provided labels, making them applicable to large unlabelled image collections.',
      hints: [
        'The term "self-supervised" implies the supervision comes from the data itself — where do labels come from?',
        'Think about how you can construct a pretraining task using only the image and transformations applied to it.',
      ],
    },
  ],

  // ── cv-kp-18: Image Retrieval & Hashing ───────────────────────────────────
  'image-retrieval': [
    {
      id: 'q-cv-kp18-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the goal of content-based image retrieval (CBIR)?',
      options: [
        'Generating a textual description of an image for search engine indexing',
        'Finding images in a database that are visually similar to a query image based on learned feature embeddings',
        'Classifying images into categories for structured database storage',
        'Retrieving images by keyword tags assigned during manual annotation',
      ],
      correctAnswer: 1,
      explanation: 'CBIR retrieves images whose visual content (encoded as feature embeddings) is most similar to the query image, enabling search by visual similarity without relying on text annotations.',
      hints: [
        '"Content-based" contrasts with text-based search — what replaces keywords?',
        'Feature embeddings encode visual semantics — how can similarity in embedding space relate to visual similarity?',
      ],
    },
    {
      id: 'q-cv-kp18-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'Why is hashing used in large-scale image retrieval?',
      options: [
        'To compress images before transmission over limited bandwidth',
        'To convert high-dimensional embeddings into compact binary codes that enable fast Hamming distance search',
        'To encrypt image features to protect intellectual property',
        'To generate unique identifiers for images in a database without feature comparison',
      ],
      correctAnswer: 1,
      explanation: 'Hashing methods (e.g., LSH, deep hashing) map image embeddings to short binary codes; Hamming distance between binary codes can be computed very efficiently (XOR + popcount), enabling sub-linear retrieval in massive databases.',
      hints: [
        'Comparing billions of high-dimensional float vectors is slow — what property of binary codes makes comparison faster?',
        'Hamming distance counts differing bits — can modern hardware compute this faster than float arithmetic?',
      ],
    },
    {
      id: 'q-cv-kp18-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'IoU (Intersection over Union) of 0.5 is the standard threshold for a detection to be considered a true positive in the Pascal VOC object detection benchmark.',
      correctAnswer: 'true',
      explanation: 'The Pascal VOC benchmark defines a detection as a true positive if its IoU with a ground truth box exceeds 0.5; COCO extends this by evaluating across IoU thresholds from 0.50 to 0.95 in steps of 0.05.',
      hints: [
        'An IoU of 0.5 means the predicted box overlaps with at least half of the ground truth box area.',
        'Different benchmarks use different IoU thresholds — VOC uses 0.5, COCO uses 0.50:0.95.',
      ],
    },
  ],

  // ── cv-kp-19: Panoptic Segmentation ──────────────────────────────────────
  'panoptic-segmentation': [
    {
      id: 'q-cv-kp19-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What does panoptic segmentation unify that semantic and instance segmentation handle separately?',
      options: [
        'Object detection and depth estimation',
        'Semantic segmentation (stuff classes with no instances) and instance segmentation (countable thing classes)',
        'Video segmentation and image segmentation',
        'Foreground segmentation and background removal',
      ],
      correctAnswer: 1,
      explanation: 'Panoptic segmentation assigns every pixel a semantic class label and additionally provides a unique instance ID for countable "things" (e.g., cars, people), while "stuff" classes (e.g., road, sky) receive class labels but no instance IDs.',
      hints: [
        '"Panoptic" means all-encompassing — what two tasks does it combine?',
        'Think about a street scene: the road has no distinct instances but cars do — how does panoptic handle both?',
      ],
    },
    {
      id: 'q-cv-kp19-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What metric is used to evaluate panoptic segmentation?',
      options: [
        'Mean IoU (mIoU) averaged over all semantic classes',
        'Panoptic Quality (PQ), which combines segmentation quality and recognition quality',
        'mAP at IoU = 0.5, the same metric used for object detection',
        'F1 score at the pixel level over all thing and stuff classes',
      ],
      correctAnswer: 1,
      explanation: 'Panoptic Quality (PQ) = Segmentation Quality (SQ, mean IoU of matched pairs) × Recognition Quality (RQ, F1 of matched vs. unmatched predictions), capturing both how well matched segments overlap and how well detection precision/recall performs.',
      hints: [
        'PQ rewards both accurate segment boundaries and correct detection — which two factors does it multiply?',
        'A model that detects all instances but with poor masks would score low on which component of PQ?',
      ],
    },
    {
      id: 'q-cv-kp19-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In panoptic segmentation, a single pixel can belong to more than one instance.',
      correctAnswer: 'false',
      explanation: 'Panoptic segmentation requires a unique, non-overlapping assignment — every pixel is assigned to exactly one segment (either a stuff region or a single thing instance), unlike instance segmentation which may produce overlapping masks.',
      hints: [
        'The panoptic task is defined as assigning exactly one label per pixel — can that allow overlap?',
        'Instance segmentation models like Mask R-CNN can produce overlapping masks — how is this resolved in panoptic segmentation?',
      ],
    },
  ],

  // ── cv-kp-20: Image Classification & Transfer Learning ────────────────────
  'image-classification': [
    {
      id: 'q-cv-kp20-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the main advantage of 3D convolutions (C3D) over 2D convolutions for video understanding?',
      options: [
        '3D convolutions require fewer parameters than 2D convolutions on the same input',
        '3D convolutions jointly model spatial and temporal patterns by applying filters across both spatial dimensions and the time axis',
        '3D convolutions can process variable-length videos without padding',
        '3D convolutions eliminate the need for optical flow as a separate input stream',
      ],
      correctAnswer: 1,
      explanation: '3D convolutional filters extend into the time dimension, learning spatiotemporal patterns (e.g., motion of body parts) directly from raw video frames, unlike 2D CNNs which process each frame independently.',
      hints: [
        'A 2D CNN applied per frame captures appearance but not motion — what does adding the time dimension enable?',
        '3D filters have shape (T×H×W) — what does the T dimension capture?',
      ],
    },
    {
      id: 'q-cv-kp20-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'SlowFast networks use two parallel pathways with different temporal sampling rates. What does each pathway capture?',
      options: [
        'The Slow pathway captures long-term audio; the Fast pathway captures short-term visual motion',
        'The Slow pathway (low frame rate) captures spatial semantics; the Fast pathway (high frame rate) captures fine temporal motion',
        'The Slow pathway processes low-resolution frames; the Fast pathway processes high-resolution frames',
        'The Slow pathway uses 3D convolutions; the Fast pathway uses 2D convolutions on optical flow',
      ],
      correctAnswer: 1,
      explanation: 'SlowFast has a Slow pathway (few frames, high channel capacity) for semantic content and a Fast pathway (many frames, few channels) for motion, with lateral connections fusing them — inspired by the primate visual system\'s P and M cell pathways.',
      hints: [
        'If the model only sees normal images during training, what does it learn?',
        'The momentum teacher provides stable targets — how does centering prevent the teacher from always outputting the same thing?',
      ],
    },
    {
      id: 'q-cv-kp20-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'TimeSformer applies transformer self-attention separately over the spatial and temporal dimensions (divided space-time attention) to make video classification tractable.',
      correctAnswer: 'true',
      explanation: 'TimeSformer uses divided attention — separate temporal and spatial attention operations per layer — rather than full space-time attention over all patch-frame pairs, reducing the quadratic cost of attending over both dimensions simultaneously.',
      hints: [
        'The forward process destroys the image by adding noise — the reverse process is learned to undo this.',
        'Think about how starting from noise and iteratively refining it could produce a coherent image.',
      ],
    },
  ],

  // ── cv-kp-21: Scene Recognition & Places365 ──────────────────────────────
  'scene-recognition': [
    {
      id: 'q-cv-kp21-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What makes scene recognition different from object recognition?',
      options: [
        'Scene recognition classifies single objects; object recognition classifies whole images',
        'Scene recognition classifies the overall environment or setting (e.g., bedroom, beach) based on global context, not individual objects',
        'Scene recognition requires bounding box annotations; object recognition only uses image-level labels',
        'Scene recognition only works on outdoor images; object recognition works on all images',
      ],
      correctAnswer: 1,
      explanation: 'Scene recognition identifies the high-level environment or place type from the holistic image context — global layout, materials, and spatial configuration — rather than detecting specific object instances.',
      hints: [
        'A kitchen can be recognised even if you cover all the individual objects — what cues remain?',
        'Think about whether recognising "bedroom" requires identifying a bed, or just the overall spatial context.',
      ],
    },
    {
      id: 'q-cv-kp21-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the Places365 dataset, and why is it useful for scene recognition?',
      options: [
        'A dataset of 365 images from each world city, used for geo-localisation',
        'A large-scale scene recognition dataset with 1.8M+ images covering 365 scene categories, used to train place-aware visual features',
        'A benchmark of 365 object categories extending COCO for fine-grained recognition',
        'A video dataset with 365-day temporal coverage for long-term scene understanding',
      ],
      correctAnswer: 1,
      explanation: 'Places365 contains over 1.8 million images across 365 scene categories (e.g., airport, forest, kitchen); CNNs pretrained on Places365 learn scene-centric features complementary to object-centric ImageNet features.',
      hints: [
        'ImageNet is object-centric — what dataset fills the need for scene-centric pretraining?',
        'Think about what 365 categories at the scene level covers — not objects but environments.',
      ],
    },
    {
      id: 'q-cv-kp21-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Scene recognition models trained on Places365 can be used as feature extractors for downstream visual tasks beyond scene classification.',
      correctAnswer: 'true',
      explanation: 'Places365-pretrained features encode rich environmental context (materials, spatial layout, lighting) useful for tasks like visual question answering, image captioning, and indoor localisation where scene semantics matter.',
      hints: [
        'Transfer learning from any well-trained model can be beneficial — what scene-specific information might Places365 features encode?',
        'Think about tasks where knowing the scene type (indoor vs. outdoor, type of room) is a useful prior.',
      ],
    },
  ],

  // ── cv-kp-22: Visual Anomaly Detection ───────────────────────────────────
  'anomaly-detection-cv': [
    {
      id: 'q-cv-kp22-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the typical setting for visual anomaly detection in industrial inspection?',
      options: [
        'Supervised binary classification using balanced datasets of normal and defective items',
        'Training only on normal (non-defective) images and detecting deviations from the learned normal distribution at test time',
        'Using a GAN to generate synthetic defects and training a discriminator on them',
        'Clustering all production images and labelling the smallest cluster as anomalous',
      ],
      correctAnswer: 1,
      explanation: 'In industrial anomaly detection, defects are rare and their types are often unknown in advance; models are trained on abundant normal images only and flag test images that deviate significantly from the learned normality model.',
      hints: [
        'Defects in manufacturing are by definition rare — can you collect enough labelled defect examples for supervised learning?',
        'If the model only sees normal images during training, what does it learn?',
      ],
    },
    {
      id: 'q-cv-kp22-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'PatchCore, a top-performing anomaly detection method, works by:',
      options: [
        'Training an autoencoder on normal images and using reconstruction error as an anomaly score',
        'Building a memory bank of normal patch features and scoring test patches by their nearest-neighbour distance to the memory bank',
        'Training a binary classifier on augmented anomaly images and normal images',
        'Applying normalising flow to model the density of normal features and thresholding the log-likelihood',
      ],
      correctAnswer: 1,
      explanation: 'PatchCore extracts patch-level features from a pretrained CNN for normal training images, stores a coreset in a memory bank, and scores test patches by their distance to the nearest stored normal patch — no training on anomalies needed.',
      hints: [
        'If 99% of pixels are background, a model that always predicts background achieves 99% pixel accuracy — is that useful?',
        'Dice loss penalises based on overlap, not pixel count — how does that help when foreground is rare?',
      ],
    },
    {
      id: 'q-cv-kp22-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Visual anomaly detection models are typically evaluated using the AUROC (Area Under the ROC Curve) metric.',
      correctAnswer: 'true',
      explanation: 'AUROC measures the model\'s ability to rank anomalous samples higher than normal samples across all possible thresholds; it is threshold-agnostic and accounts for the class imbalance common in anomaly detection benchmarks.',
      hints: [
        'An anomaly detector needs a threshold — AUROC evaluates performance across all thresholds simultaneously.',
        'Think about how you can construct a pretraining task using only the image and transformations applied to it.',
      ],
    },
  ],

  // ── cv-kp-23: Document AI & OCR ───────────────────────────────────────────
  'document-ai': [
    {
      id: 'q-cv-kp23-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is Optical Character Recognition (OCR) and what is its primary output?',
      options: [
        'A technique for compressing scanned document images for storage',
        'The process of converting images of text (printed or handwritten) into machine-readable character sequences',
        'A method for detecting the layout of a document including headers and footers',
        'A system for classifying documents into categories such as invoices and contracts',
      ],
      correctAnswer: 1,
      explanation: 'OCR takes an image containing text and outputs a digital text string, enabling downstream processing; modern OCR systems use deep learning to handle diverse fonts, handwriting styles, and image quality.',
      hints: [
        'Before OCR, scanned pages were just images — what does OCR enable you to do with the content?',
        'Think about converting a photo of a book page into searchable, editable text.',
      ],
    },
    {
      id: 'q-cv-kp23-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'LayoutLM extends BERT for document understanding by incorporating which additional input modalities?',
      options: [
        'Audio transcription and table structure annotations',
        '2D positional embeddings (bounding box coordinates) and optionally image features alongside text token embeddings',
        'Font type and size information extracted from PDF metadata',
        'Language-specific script embeddings for multilingual document processing',
      ],
      correctAnswer: 1,
      explanation: 'LayoutLM embedss just text tokens but also their 2D spatial positions (x1, y1, x2, y2) within the document page; LayoutLMv2/v3 additionally incorporate visual features from the page image, enabling layout-aware document understanding.',
      hints: [
        'Static appearance and motion are both cues for recognising actions — why process them separately?',
        'Optical flow captures motion patterns that RGB frames alone cannot easily encode.',
      ],
    },
    {
      id: 'q-cv-kp23-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Modern end-to-end OCR systems can jointly detect text regions and recognise characters without a separate text detection stage.',
      correctAnswer: 'true',
      explanation: 'End-to-end models (e.g., FOTS, ABCNet) simultaneously detect text regions and transcribe them in a single forward pass, whereas traditional OCR pipelines separate text detection (finding where text is) from recognition (what the text says).',
      hints: [
        'Traditional OCR has two stages — can a single neural network learn both detection and recognition jointly?',
        'End-to-end training allows detection and recognition to benefit from each other\'s gradients.',
      ],
    },
  ],

  // ── cv-kp-24: Remote Sensing & Satellite Imagery ──────────────────────────
  'remote-sensing-cv': [
    {
      id: 'q-cv-kp24-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What makes satellite imagery different from standard RGB photos for computer vision tasks?',
      options: [
        'Satellite images are always captured in black and white',
        'Satellite images often have more spectral bands (e.g., NIR, SWIR), much larger spatial extents, and a top-down (nadir) viewpoint',
        'Satellite images are always at very low resolution (>10m per pixel)',
        'Satellite images cannot be used with CNNs because of their non-Euclidean geometry',
      ],
      correctAnswer: 1,
      explanation: 'Satellite sensors capture multiple spectral bands beyond visible RGB (e.g., near-infrared for vegetation), cover thousands of km², and view scenes from directly above — all of which require adapted preprocessing and models.',
      hints: [
        'Earth observation satellites capture light beyond the visible spectrum — what extra information do those bands provide?',
        'A nadir (top-down) view differs from typical ground-level photos — how does that affect object appearance?',
      ],
    },
    {
      id: 'q-cv-kp24-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the Normalised Difference Vegetation Index (NDVI) and how is it computed from satellite imagery?',
      options: [
        'NDVI = (Red - Blue) / (Red + Blue) — measures water content of vegetation',
        'NDVI = (NIR - Red) / (NIR + Red) — measures vegetation density using the contrast between near-infrared and red reflectance',
        'NDVI = (Green - Red) / (Green + Red) — distinguishes vegetation from urban areas using visible bands only',
        'NDVI = NIR / Red — measures the ratio of photosynthetically active radiation to total radiation',
      ],
      correctAnswer: 1,
      explanation: 'NDVI exploits the fact that healthy vegetation strongly reflects NIR and absorbs Red; NDVI = (NIR - Red)/(NIR + Red) ranges from -1 to 1, with values near 1 indicating dense healthy vegetation.',
      hints: [
        'Healthy leaves absorb red light for photosynthesis and reflect NIR — how does the formula capture this contrast?',
        'NDVI requires spectral bands beyond RGB — which bands are needed?',
      ],
    },
    {
      id: 'q-cv-kp24-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Change detection in satellite imagery aims to identify regions where land cover or surface conditions have changed between two images captured at different times.',
      correctAnswer: 'true',
      explanation: 'Change detection compares multi-temporal satellite images to identify areas of significant change (e.g., deforestation, urban expansion, flood damage), and is a key application of remote sensing for environmental monitoring.',
      hints: [
        'Two satellite images of the same area taken months apart may show different land cover — how would you detect changes?',
        'Applications include monitoring disaster damage, tracking urban growth, and detecting illegal deforestation.',
      ],
    },
  ],

  // ── cv-kp-25: Neural Style Transfer & Image Generation ────────────────────
  'neural-style-transfer': [
    {
      id: 'q-cv-kp25-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is the role of the discriminator in a Generative Adversarial Network (GAN)?',
      options: [
        'To generate realistic images from random noise vectors',
        'To distinguish between real training images and fake images produced by the generator',
        'To encode real images into a latent space for the generator to sample from',
        'To compute the reconstruction loss between generated and real images',
      ],
      correctAnswer: 1,
      explanation: 'The discriminator is a binary classifier trained to tell real images from generated (fake) ones; its feedback provides the adversarial signal that drives the generator to produce increasingly realistic images.',
      hints: [
        'The generator and discriminator are trained adversarially — what signal does the generator receive?',
        'If the discriminator cannot tell real from fake, has the generator succeeded?',
      ],
    },
    {
      id: 'q-cv-kp25-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'How does a denoising diffusion probabilistic model (DDPM) generate images?',
      options: [
        'By sampling a latent vector and decoding it in a single forward pass through a decoder network',
        'By iteratively applying a learned denoising network to progressively remove noise from pure Gaussian noise over many steps',
        'By adversarially training a generator to fool a pixel-level discriminator',
        'By sampling tokens from a discrete image codebook using an autoregressive transformer',
      ],
      correctAnswer: 1,
      explanation: 'DDPMs define a forward process that gradually adds Gaussian noise to data over T steps, then train a network to reverse this process step by step; image generation starts from pure noise and iteratively denoises to a clean image.',
      hints: [
        'The forward process destroys the image by adding noise — the reverse process is learned to undo this.',
        'Think about how starting from noise and iteratively refining it could produce a coherent image.',
      ],
    },
    {
      id: 'q-cv-kp25-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'A Variational Autoencoder (VAE) learns to encode images into a continuous latent space from which new images can be sampled by decoding random latent vectors.',
      correctAnswer: 'true',
      explanation: 'The VAE encoder outputs parameters of a Gaussian distribution in latent space; the decoder maps samples from this distribution back to image space; the KL divergence term regularises the latent space to be smooth and continuous for generative sampling.',
      hints: [
        'Unlike a plain autoencoder, the VAE encodes to a distribution rather than a point — why does that enable sampling?',
        'If the latent space is continuous and structured, interpolating between latent vectors should produce coherent images.',
      ],
    },
  ],

  // ── cv-kp-26: Robustness & Adversarial Examples ───────────────────────────
  'robustness-cv': [
    {
      id: 'q-cv-kp26-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What is an adversarial example in computer vision?',
      options: [
        'A training image with an incorrect label that misleads the model during training',
        'An image with carefully crafted, imperceptible perturbations that cause a classifier to predict the wrong class',
        'An image from a different domain (e.g., sketches) that the model fails to classify correctly',
        'A synthetic image generated by a GAN that fools a human observer',
      ],
      correctAnswer: 1,
      explanation: 'Adversarial examples are inputs with small, often human-imperceptible pixel perturbations intentionally crafted to maximise the model\'s loss, causing it to misclassify with high confidence.',
      hints: [
        'The perturbation is chosen to specifically fool the model, not just add random noise.',
        'A human sees a cat; the model confidently predicts "guacamole" — what caused this?',
      ],
    },
    {
      id: 'q-cv-kp26-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'What is the key insight of the SRCNN (Super-Resolution CNN) approach for image super-resolution?',
      options: [
        'It uses GAN training to generate photorealistic textures in upscaled images',
        'It learns an end-to-end mapping from low-resolution to high-resolution images using a CNN with convolutional, non-linear mapping, and reconstruction layers',
        'It applies a frequency-domain upsampling using learned DCT coefficients',
        'It retrieves high-frequency patches from a database to augment low-resolution inputs',
      ],
      correctAnswer: 1,
      explanation: 'SRCNN pioneers deep learning for super-resolution by training a three-layer CNN to directly learn the mapping from bicubic-upsampled LR images to HR images, outperforming classical methods like sparse coding.',
      hints: [
        'Before deep learning, super-resolution used sparse coding with hand-crafted dictionaries — how does SRCNN differ?',
        'An end-to-end CNN learns the LR-to-HR mapping jointly rather than in separate stages.',
      ],
    },
    {
      id: 'q-cv-kp26-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'Channel shuffling in ShuffleNet is a permutation operation that reorders channels across groups, enabling cross-group information exchange at essentially zero computational cost.',
      correctAnswer: 'true',
      explanation: 'ShuffleNet applies grouped convolutions (which keep channels isolated) followed by a channel shuffle operation that reorders channels across groups, enabling cross-group information exchange at essentially zero computational cost.',
      hints: [
        'Grouped convolutions partition channels into independent groups — preventing inter-group information flow.',
        'Shuffling is a permutation (rearranging indices) — how much compute does that require?',
      ],
    },
  ],

  // ── cv-kp-27: Efficient CV ────────────────────────────────────────────────
  'efficient-cv': [
    {
      id: 'q-cv-kp27-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'Depthwise separable convolution replaces a standard 3×3 conv on C-channel input with output of C channels. By what factor does it reduce FLOPs compared to the standard conv?',
      options: [
        'C/9 reduction (depends on channel count)',
        '1/(C + 1/9) ≈ 1/9 for large C (approximately the inverse of the kernel area)',
        '1/3 reduction (depthwise is 1/3 of standard)',
        '1/(8C/9 + 1) which simplifies to roughly 1/9 only for C=1',
      ],
      correctAnswer: 1,
      explanation: 'Standard 3×3 conv FLOPs ∝ 3×3×C×C = 9C². Depthwise separable: depthwise 3×3 per channel = 3×3×C = 9C, pointwise 1×1 = 1×C×C = C². Total = 9C + C² = C(9 + C). Ratio = C(9+C)/(9C²) = (9+C)/(9C) ≈ 1/9 for large C. MobileNet uses this to achieve ~8–9× fewer FLOPs than a standard conv, enabling mobile deployment.',
      hints: [
        'Standard: F×F×C_in×C_out. Depthwise: F×F×C (one filter per channel). Pointwise: 1×1×C×C.',
        'For 3×3 filter and C channels: ratio = (9C + C²) / (9C²) = (9+C)/(9C) → 1/9 as C→∞.',
      ],
    },
    {
      id: 'q-cv-kp27-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'In knowledge distillation, training with a teacher temperature τ > 1 "softens" the probability distribution. If a teacher produces logits [4, 1, −2] and τ = 4, what happens to the soft label distribution compared to τ = 1?',
      options: [
        'At τ=4 the distribution becomes more uniform (entropy increases), revealing inter-class similarity structure that hard labels hide',
        'At τ=4 the distribution becomes sharper (entropy decreases), making distillation easier',
        'Temperature only affects the student network, not the teacher soft labels',
        'At τ=4 the distribution is identical to τ=1 since softmax is scale-invariant',
      ],
      correctAnswer: 0,
      explanation: 'Soft labels are softmax(logits/τ). At τ=1: p ∝ exp([4,1,−2]) = [e⁴,e¹,e⁻²] ≈ [0.952, 0.047, 0.001] — very peaked. At τ=4: p ∝ exp([1,0.25,−0.5]) ≈ [0.574, 0.282, 0.144] — much more uniform. Higher τ reveals that the teacher considers class 2 more plausible than class 3 even when it predicts class 1, transferring structural knowledge beyond the top prediction.',
      hints: [
        'Temperature τ divides all logits before softmax. Smaller logit differences → more uniform distribution.',
        'At τ→∞, soft labels approach uniform; at τ→0, they approach one-hot.',
      ],
    },
    {
      id: 'q-cv-kp27-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'ShuffleNet uses channel shuffling to enable information flow between feature channels after grouped convolutions, without incurring the full cost of standard convolutions.',
      correctAnswer: 'true',
      explanation: 'Grouped convolution partitions C channels into g groups, each operating independently — preventing inter-group information flow. Channel shuffle physically reorders the output channels so that features from different groups are interleaved before the next grouped conv. This is a zero-parameter, O(1) permutation that costs negligible compute while restoring cross-group communication.',
      hints: [
        'Grouped convolutions with g=4 create 4 isolated feature groups — without shuffling, information never crosses group boundaries.',
        'Shuffling is a permutation (rearranging indices) — how much compute does that require?',
      ],
    },
  ],

  // ── cv-kp-28: CV Evaluation Metrics ──────────────────────────────────────
  'cv-evaluation': [
    {
      id: 'q-cv-kp28-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'COCO mAP (the standard benchmark) is computed at multiple IoU thresholds. Which formula correctly defines COCO mAP?',
      options: [
        'mAP = AP × IoU',
        'mAP = AP × (IoU + 0.5)',
        'mAP = AP × (IoU + 0.5) / 2',
        'mAP = AP × (IoU + 0.5) / 10',
      ],
      correctAnswer: 2,
      explanation: 'COCO mAP = AP × (IoU + 0.5) / 2. This averages AP over two IoU thresholds: 0.5 and 0.75. Higher IoU thresholds demand tighter localisation — averaging over them rewards both rough and precise detections.',
      hints: [
        'COCO mAP = AP × (IoU + 0.5) / 2. This averages AP over two IoU thresholds: 0.5 and 0.75.',
        'Higher IoU thresholds demand tighter localisation — what does this mean for the precision-recall curve?',
      ],
    },
    {
      id: 'q-cv-kp28-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'FID (Fréchet Inception Distance) measures the distance between feature distributions of real and generated images. Which formula correctly defines FID?',
      options: [
        'FID = ||μ_r − μ_g||² + Tr(Σ_r + Σ_g − 2(Σ_r·Σ_g)^½), where μ and Σ are the mean and covariance of Inception-v3 pool3 features for real (r) and generated (g) images',
        'FID = average pixel-wise MSE between real and generated images divided by the Inception classification accuracy',
        'FID = KL(N(μ_r, Σ_r) || N(μ_g, Σ_g)), the KL divergence between two Gaussians fit to Inception features',
        'FID = 1 − cosine_similarity(μ_r, μ_g), using only the mean Inception features without covariance',
      ],
      correctAnswer: 0,
      explanation: 'FID = ||μ_r − μ_g||² + Tr(Σ_r + Σ_g − 2(Σ_r Σ_g)^{1/2}), the Fréchet/Wasserstein-2 distance between two multivariate Gaussians N(μ_r, Σ_r) and N(μ_g, Σ_g). Lower FID = more similar distributions. FID penalises both poor image quality (features drift from real distribution) and mode collapse (low covariance).',
      hints: [
        'FID is the Fréchet/Wasserstein-2 distance between two multivariate Gaussians N(μ_r, Σ_r) and N(μ_g, Σ_g).',
        'The matrix square root term (Σ_r·Σ_g)^½ penalises when the covariances of real and generated features differ — catching mode collapse.',
      ],
    },
    {
      id: 'q-cv-kp28-3',
      type: 'true-false',
      difficulty: 'easy',
      question: 'In Pascal VOC evaluation, a detection is a true positive only if its IoU with a ground truth box exceeds 0.5 AND the same ground truth box has not already been matched by a higher-confidence detection.',
      correctAnswer: 'true',
      explanation: 'VOC AP matching is greedy in confidence order: sort detections by score, assign each to the highest-IoU unmatched GT (if IoU ≥ 0.5). Once a GT is matched, all further detections overlapping it are FPs regardless of IoU. This prevents a single GT from generating multiple TPs and ensures the precision-recall curve reflects genuine detection performance.',
      hints: [
        'The "unmatched" condition prevents double-counting: two high-confidence overlapping predictions for one GT yield only one TP.',
        'Greedy matching in confidence order rewards detectors that assign highest scores to correct detections.',
      ],
    },
  ],

  // ── cv-kp-29: Foundation Models for CV ───────────────────────────────────
  'foundation-models-cv': [
    {
      id: 'q-cv-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'What makes SAM (Segment Anything Model) a "foundation model" for image segmentation?',
      options: [
        'It achieves state-of-the-art performance on every existing segmentation benchmark',
        'It is trained on a massive diverse dataset (SA-1B) and supports flexible prompts (points, boxes, masks, text) to segment any object in any image',
        'It uses a novel architecture that replaces convolutions with symbolic reasoning modules',
        'It is the first model to perform zero-shot segmentation using only text descriptions',
      ],
      correctAnswer: 1,
      explanation: 'SAM is designed for generalisation: trained on 11 million images with over 1 billion masks, it accepts user prompts (clicks, boxes, free-form masks) and generalises to unseen objects and domains without task-specific fine-tuning.',
      hints: [
        'DINOv2 is purely self-supervised — what signal does it use given it has no images, only class names?',
        'Combining multiple self-supervised objectives on high-quality data often outperforms single-objective training.',
      ],
    },
    {
      id: 'q-cv-kp30-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'How does DINO (Self-DIstillation with NO labels) avoid representation collapse without explicit negative pairs?',
      options: [
        'By using a momentum encoder as a teacher and applying centering and sharpening to the teacher\'s output distribution',
        'By adding a batch normalisation layer between the encoder and projection head',
        'By predicting the cluster assignment of patches in a codebook with a cross-entropy loss',
        'By training with very large batch sizes to ensure diverse negative samples',
      ],
      correctAnswer: 0,
      explanation: 'DINO uses a student-teacher framework where the teacher is an exponential moving average of the student; centering (subtracting a running mean) and sharpening (low temperature) of teacher outputs prevent collapse without requiring negative pairs.',
      hints: [
        'Collapse occurs when all representations become identical — what prevents this if there are no explicit negatives?',
        'The momentum teacher provides stable targets — how does centering prevent the teacher from always outputting the same thing?',
      ],
    },
    {
      id: 'q-cv-kp30-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'Self-supervised pretraining in computer vision requires large amounts of labelled data to generate the pretraining signal.',
      correctAnswer: 'false',
      explanation: 'Self-supervised methods derive their learning signal from the data itself (e.g., augmentation agreement, masked patch prediction) without any human-provided labels, making them applicable to large unlabelled image collections.',
      hints: [
        'The term "self-supervised" implies the supervision comes from the data itself — where do labels come from?',
        'Think about how you can construct a pretraining task using only the image and transformations applied to it.',
      ],
    },
  ],

  // ── cv-kp-30: Foundation Models for CV ───────────────────────────────────
  'foundation-models-cv': [
    {
      id: 'q-cv-kp30-1',
      type: 'multiple-choice',
      difficulty: 'easy',
      question: 'SAM (Segment Anything Model) consists of three components: an image encoder, a prompt encoder, and a mask decoder. Which image encoder does SAM use and why?',
      options: [
        'A ResNet-50 backbone pretrained on ImageNet because it is fast and lightweight',
        'A heavyweight ViT (ViT-H/16 in SAM-1) pretrained with MAE, run once per image to produce a 64×64 image embedding that is cached and reused across multiple prompts',
        'A CLIP vision encoder so that text prompts and image prompts can be processed in the same embedding space',
        'A U-Net encoder-decoder so that the image embedding retains full spatial resolution for segmentation',
      ],
      correctAnswer: 1,
      explanation: 'SAM uses a ViT-H (huge) image encoder with MAE pretraining to produce dense image embeddings at 1/16 scale (64×64 for a 1024×1024 input). Crucially, the image encoder runs once and the resulting embedding is stored — allowing fast interactive segmentation at < 50ms per prompt using only the lightweight prompt encoder and mask decoder.',
      hints: [
        'The image encoder is the expensive part — SAM amortises its cost by caching the embedding across prompts.',
        'ViT-H has 632M parameters; the prompt encoder and mask decoder together have ~4M.',
      ],
    },
    {
      id: 'q-cv-kp30-2',
      type: 'multiple-choice',
      difficulty: 'medium',
      question: 'DINOv2 achieves strong performance across diverse CV tasks without task-specific fine-tuning. How is it pretrained?',
      options: [
        'Supervised pretraining on ImageNet-22k with label smoothing and aggressive augmentation',
        'Self-supervised learning combining DINO self-distillation (student-teacher with centering/sharpening) and iBOT masked image modelling, trained on a carefully curated LVD-142M dataset',
        'Contrastive pretraining on image-text pairs from the web (similar to CLIP)',
        'Autoregressive next-patch prediction on a large-scale image dataset',
      ],
      correctAnswer: 1,
      explanation: 'DINOv2 combines two self-supervised objectives: (1) DINO self-distillation where a student ViT matches a momentum-teacher\'s global CLS token predictions; (2) iBOT masked image modelling where masked patch tokens are predicted. Training on the curated LVD-142M dataset (deduplicated, filtered web images) gives features that work as a universal visual backbone without fine-tuning for depth, segmentation, and classification.',
      hints: [
        'DINOv2 is purely self-supervised — it uses no text pairs (unlike CLIP) and no manual labels.',
        'Combining DINO (CLS-level) and iBOT (patch-level) objectives encourages both global and local feature quality.',
      ],
    },
    {
      id: 'q-cv-kp30-3',
      type: 'true-false',
      difficulty: 'medium',
      question: 'CLIP (Contrastive Language-Image Pretraining) can be used for zero-shot image classification by comparing image embeddings to text embeddings of class descriptions like "a photo of a {class}".',
      correctAnswer: 'true',
      explanation: 'CLIP trains dual ViT/ResNet image and text encoders with InfoNCE contrastive loss on 400M (image, text) pairs to produce aligned embeddings. At inference, class prompts "a photo of a {class}" are embedded as text; the image is embedded; cosine similarity identifies the closest class — enabling zero-shot classification on unseen classes without any task-specific training.',
      hints: [
        'CLIP learns a shared image-text embedding space where matching pairs are close — class names can act as label embeddings.',
        '"Zero-shot" means no labelled images of the test class are needed — the text description substitutes.',
      ],
    },
  ],
}

registerQuestions(questions)
export default questions
