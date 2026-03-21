import type { Question } from "@/lib/curriculum";
import { registerQuestions } from "./registry";

const questions: Record<string, Question[]> = {
  // ── cv-kp-1: Image Fundamentals ───────────────────────────────────────────
  "image-fundamentals": [
    {
      id: "q-cv-kp1-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A standard 8-bit grayscale image stores one intensity value per pixel in the range 0–255. How many distinct intensity levels does a 16-bit grayscale image provide?",
      options: [
        "512 levels ($2 \\times 256$)",
        "4096 levels ($16 \\times 256$)",
        "65536 levels ($2^{16}$)",
        "32768 levels ($2^{15}$)",
      ],
      correctAnswer: 2,
      explanation:
        "An $n$-bit image stores $2^n$ intensity levels per channel.  \n\nFor a 16-bit image:\n\\[\n2^{16} = 65536\n\\]\nThis equals $2 \\times 2^{15} = 2 \\times 32768 = 65536$ distinct levels, enabling finer precision in medical imaging and HDR photography compared to the 256 levels of an 8-bit image.",
      hints: [
        "Each additional bit doubles the number of representable values: $2^8 = 256$, so $2^{16} = 2^8 \\times 2^8$.",
        "Apply the formula $2^n$ with $n = 16$.",
      ],
    },
    {
      id: "q-cv-kp1-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Histogram equalisation maps pixel intensities through the CDF of the original histogram. If an image has CDF value 0.6 at intensity $r = 128$, what output intensity does histogram equalisation assign to pixels with value 128 (assuming 8-bit output)?",
      options: [
        "128 (no change)",
        "153 ($\\lfloor 0.6 \\times 255 \\rceil = 153$)",
        "76 ($0.6 \\times 128$)",
        "200 (fixed midpoint mapping)",
      ],
      correctAnswer: 1,
      explanation:
        "Histogram equalisation applies the transform\n\\[\nT(r) = \\lfloor (L-1) \\cdot \\text{CDF}(r) \\rceil,\n\\]\nwhere $L = 256$ is the number of possible output levels and $\\text{CDF}(r)$ is the cumulative distribution function value at intensity $r$.\n\nSubstituting the given values:\n\\[\nT(128) = \\lfloor 255 \\times 0.6 \\rceil = \\lfloor 153.0 \\rceil = 153.\n\\]\nThis stretches the intensity range so the output histogram approximates a uniform distribution.",
      hints: [
        "The equalisation formula is $T(r) = (L-1) \\cdot \\text{CDF}(r)$. With $L = 256$ and $\\text{CDF}(r) = 0.6$, compute $255 \\times 0.6$.",
        "The maximum output value is $L - 1 = 255$ (for 8-bit), not 256.",
      ],
    },
    {
      id: "q-cv-kp1-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "An RGB image is $1920 \\times 1080$ pixels with 8 bits per channel. What is its uncompressed size in megabytes (MB)?",
      options: [
        "Approximately 2.1 MB",
        "Approximately 6.2 MB",
        "Approximately 8.3 MB",
        "Approximately 12.4 MB",
      ],
      correctAnswer: 1,
      explanation:
        "Each pixel has 3 channels (R, G, B), each stored as 8 bits $= 1$ byte.\n\n\\[\n\\text{Total bytes} = 1920 \\times 1080 \\times 3 = 6{,}220{,}800 \\text{ bytes}.\n\\]\n\nConverting to megabytes ($1 \\text{ MB} = 2^{20} = 1{,}048{,}576$ bytes):\n\\[\n\\frac{6{,}220{,}800}{1{,}048{,}576} \\approx 5.93 \\approx 6.2 \\text{ MB}.\n\\]\n\nJPEG compression typically achieves 10–20$\\times$ reduction, making it essential for storing and transmitting photographs.",
      hints: [
        "Compute the total byte count: width $\\times$ height $\\times$ channels $\\times$ bytes-per-channel = $1920 \\times 1080 \\times 3 \\times 1$.",
        "Divide by $2^{20} = 1{,}048{,}576$ to convert bytes to MB.",
      ],
    },
  ],

  // ── cv-kp-2: Convolutions & Feature Maps ──────────────────────────────────
  convolutions: [
    {
      id: "q-cv-kp2-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A convolutional layer applies a $3 \\times 3$ filter with stride $S = 2$ and no padding ($P = 0$) to a $7 \\times 7$ input feature map. Using the formula\n\\[\n\\text{output size} = \\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1,\n\\]\nwhat is the output spatial dimension?",
      options: ["$5 \\times 5$", "$4 \\times 4$", "$3 \\times 3$", "$2 \\times 2$"],
      correctAnswer: 2,
      explanation:
        "Substituting $W = 7$, $F = 3$, $P = 0$, and $S = 2$ into the formula:\n\\[\n\\left\\lfloor \\frac{7 - 3 + 2 \\cdot 0}{2} \\right\\rfloor + 1 = \\left\\lfloor \\frac{4}{2} \\right\\rfloor + 1 = 2 + 1 = 3.\n\\]\nThe output is $3 \\times 3$.\n\nHere $W$ is the input size, $F$ is the filter size, $P$ is the padding, and $S$ is the stride.",
      hints: [
        "The formula is $\\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1$. Substitute $W = 7$, $F = 3$, $P = 0$, $S = 2$.",
        "Compute the numerator: $W - F + 2P = 7 - 3 + 0 = 4$. Then divide by $S = 2$ and apply the floor.",
      ],
    },
    {
      id: "q-cv-kp2-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "A convolutional layer has 64 filters of size $3 \\times 3$ applied to a 32-channel input with one bias per filter. How many learnable parameters does this layer have?",
      options: [
        "$576$ ($(3 \\times 3 \\times 64$)?)",
        "$18432$ ($3 \\times 3 \\times 32 \\times 64$)",
        "$18496$ ($3 \\times 3 \\times 32 \\times 64 + 64$)",
        "$36928$ ($3 \\times 3 \\times 32 \\times 64 \\times 2$)?",
      ],
      correctAnswer: 2,
      explanation:
        "Each filter has shape $3 \\times 3 \\times 32$ (height $\\times$ width $\\times$ input channels), giving:\n\\[\n3 \\times 3 \\times 32 = 288 \\text{ weights per filter}.\n\\]\n\nAdding the bias: $288 + 1 = 289$ parameters per filter.\n\nWith 64 filters:\n\\[\n64 \\times 289 = 18{,}496 \\text{ parameters}.\n\\]\n\nNote: parameter count depends only on filter shape and number of filters, not on the output spatial size.",
      hints: [
        "Each filter spans all input channels: weights per filter = $3 \\times 3 \\times 32 = 288$.",
        "Add 1 bias per filter: total per filter = $288 + 1 = 289$. Multiply by 64 filters.",
      ],
    },
    {
      id: "q-cv-kp2-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'What is "same" padding in a convolutional layer, and what padding $P$ is needed to maintain spatial size for a $3 \\times 3$ filter with stride $S = 1$?',
      options: [
        '"Same" padding adds zeros so the output has the same spatial size as the input; for a $3 \\times 3$ filter with $S = 1$, $P = 1$ is required.',
        '"Same" padding replicates the nearest border pixel value; $P = 0$ is used.',
        '"Same" padding duplicates the filter weights symmetrically; $P = 2$ is required for a $3 \\times 3$ filter.',
        '"Same" padding adds zeros so the output size is exactly half the input; $P = 1$ is required.',
      ],
      correctAnswer: 0,
      explanation:
        '"Same" padding ensures the output spatial size equals the input size. From the output size formula:\n\\[\n\\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1 = W,\n\\]\nsetting $S = 1$ and solving for $P$:\n\\[\nW - F + 2P + 1 = W \\implies -F + 2P + 1 = 0 \\implies P = \\frac{F - 1}{2}.\n\\]\nFor $F = 3$:\n\\[\nP = \\frac{3 - 1}{2} = 1.\n\\]\nSo each border is padded with 1 zero pixel, and a $7 \\times 7$ input with $3 \\times 3$ filter, $S = 1$, $P = 1$ produces $(7 - 3 + 2)/1 + 1 = 7 \\times 7$ output.',
      hints: [
        "Set output size = input size in the formula $\\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1 = W$, and solve for $P$ with $S = 1$.",
        "For $F = 3$: $P = (F - 1)/2 = 1$.",
      ],
    },
  ],

  // ── cv-kp-3: CNN Architectures ────────────────────────────────────────────
  "cnn-architectures": [
    {
      id: "q-cv-kp3-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        'ResNet-50 uses "bottleneck" residual blocks with three conv layers ($1 \\times 1$, $3 \\times 3$, $1 \\times 1$). What is the purpose of the two $1 \\times 1$ convolutions flanking the $3 \\times 3$ conv?',
      options: [
        "They perform spatial downsampling to reduce the $3 \\times 3$ conv input spatial size.",
        "The first $1 \\times 1$ reduces channel depth before the $3 \\times 3$ conv (lowering computational cost), and the second $1 \\times 1$ restores it, significantly cutting FLOPs.",
        "They act as attention gates that selectively pass information to the $3 \\times 3$ conv.",
        "They replace batch normalisation by normalising channel statistics to unit variance.",
      ],
      correctAnswer: 1,
      explanation:
        "The bottleneck design reduces channels from, for example, $256 \\to 64$ with a $1 \\times 1$ conv before the $3 \\times 3$, then expands back $64 \\to 256$ with another $1 \\times 1$.\n\nThe FLOPs of a $3 \\times 3$ conv scale as $\\text{channels}_{\\text{in}} \\times \\text{channels}_{\\text{out}}$. Reducing from 256 to 64 channels cuts the $3 \\times 3$ cost by a factor of $(256/64)^2 = 16\\times$, at the cost of two inexpensive $1 \\times 1$ convs. The net saving is approximately $4\\times$ compared to a plain residual block.",
      hints: [
        "The $3 \\times 3$ conv is the expensive operation. Its FLOPs scale quadratically with channel count — reducing input channels drops cost dramatically.",
        "Bottleneck structure: $256 \\to 64 \\to 64 \\to 256$. The middle is narrow, reducing the expensive $3 \\times 3$ computation.",
      ],
    },
    {
      id: "q-cv-kp3-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Inception module in GoogLeNet applies $1 \\times 1$, $3 \\times 3$, and $5 \\times 5$ convolutions in parallel. Why are $1 \\times 1$ convolutions inserted before the $3 \\times 3$ and $5 \\times 5$ branches?",
      options: [
        "To apply non-linear activation before the larger filters, acting as a learned preprocessing step.",
        "To reduce the number of input channels (dimensionality reduction) before the expensive larger convolutions, significantly cutting FLOPs.",
        "To ensure the output of each branch has the same spatial size for concatenation.",
        "To share weights between branches so that all three filter sizes learn the same features.",
      ],
      correctAnswer: 1,
      explanation:
        "The FLOPs of a convolution scale as $F \\times F \\times C_{\\text{in}} \\times C_{\\text{out}}$. Without $1 \\times 1$ bottlenecks, a $5 \\times 5$ conv on 256 input channels costs:\n\\[\n5 \\times 5 \\times 256 \\times 256 \\approx 1.6 \\text{M FLOPs}.\n\\]\n\nAdding a $1 \\times 1$ reduction to 32 channels first:\n\\[\n1 \\times 1 \\times 256 \\times 32 + 5 \\times 5 \\times 32 \\times 256 \\approx 213\\text{K FLOPs},\n\\]\nwhich is approximately $7.5\\times$ fewer. This \"Network in Network\" dimensionality reduction was key to making GoogLeNet computationally practical.",
      hints: [
        "FLOPs for a conv scale as $F \\times F \\times C_{\\text{in}} \\times C_{\\text{out}}$. Reducing $C_{\\text{in}}$ with a $1 \\times 1$ first drops the cost of larger filters quadratically.",
        "The $1 \\times 1$ conv acts as a bottleneck: it reduces channel count before the expensive spatial convolutions.",
      ],
    },
    {
      id: "q-cv-kp3-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "EfficientNet uses a compound scaling coefficient $\\phi$ to jointly scale depth ($d = \\alpha^\\phi$), width ($w = \\beta^\\phi$), and resolution ($r = \\gamma^\\phi$) so that total FLOPs grow approximately as $2^\\phi$.",
      correctAnswer: "True",
      explanation:
        "EfficientNet's compound scaling is designed so that FLOPs double with each unit increase in $\\phi$. Since FLOPs scale as:\n\\[\n\\text{FLOPs} \\propto d \\cdot w^2 \\cdot r^2,\n\\]\nsubstituting the scaling rules gives:\n\\[\n\\alpha^\\phi \\cdot (\\beta^\\phi)^2 \\cdot (\\gamma^\\phi)^2 = (\\alpha \\cdot \\beta^2 \\cdot \\gamma^2)^\\phi.\n\\]\nThe coefficients $\\alpha = 1.2$, $\\beta = 1.1$, $\\gamma = 1.15$ were found by grid search on EfficientNet-B0, satisfying $\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2$. This gives a principled multi-dimensional scaling law that outperforms single-dimension scaling at equal FLOPs.",
      hints: [
        "FLOPs scale as depth $\\times$ width$^2$ $\\times$ resolution$^2$, so the compound coefficient is $\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2$.",
        "With $\\alpha = 1.2$, $\\beta = 1.1$, $\\gamma = 1.15$: $1.2 \\times 1.1^2 \\times 1.15^2 \\approx 2$, so FLOPs $\\approx 2^\\phi$.",
      ],
    },
  ],

  // ── cv-kp-4: Batch Normalization in CNNs ──────────────────────────────────
  "batch-normalization-cv": [
    {
      id: "q-cv-kp4-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "The Batch Normalisation forward pass computes $\\hat{x}_i = (x_i - \\mu_B) / \\sqrt{\\sigma_B^2 + \\epsilon}$, then applies $y_i = \\gamma \\hat{x}_i + \\beta$. What roles do the learnable parameters $\\gamma$ and $\\beta$ play?",
      options: [
        "$\\gamma$ clips the normalised activation to $[-1, 1]$ and $\\beta$ re-centres it at $0.5$.",
        "$\\gamma$ (scale) and $\\beta$ (shift) allow the network to represent any linear function of the normalised activation, including undoing normalisation if optimal — preserving network expressiveness.",
        "$\\gamma$ controls the batch size used for computing statistics and $\\beta$ sets the learning rate for BN parameters.",
        "$\\gamma$ replaces the weight matrix and $\\beta$ replaces the bias in the layer following BN.",
      ],
      correctAnswer: 1,
      explanation:
        "After normalising to zero mean and unit variance with $\\hat{x}_i$, the learned affine transformation\n\\[\ny_i = \\gamma \\hat{x}_i + \\beta\n\\]\nre-introduces a learnable scale and shift. If $\\gamma = \\sigma_B$ and $\\beta = \\mu_B$, the original unnormalised distribution is recovered — meaning Batch Normalisation never restricts the representational capacity of the network. In practice, $\\gamma$ and $\\beta$ are learned to find the optimal activation distribution for each feature.",
      hints: [
        "If BN always forced zero mean and unit variance, would that restrict what the network can represent?",
        "Can $\\gamma$ and $\\beta$ be set to recover the original pre-normalisation distribution?",
      ],
    },
    {
      id: "q-cv-kp4-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why can Batch Normalization behave differently at training time versus inference time?",
      options: [
        "During inference, the batch size is always 1, causing division by zero in the normalisation.",
        "At inference, running mean and variance statistics (accumulated during training as exponential moving averages) are used instead of per-mini-batch statistics.",
        "During inference, the $\\gamma$ and $\\beta$ parameters are frozen to their initial values.",
        "Batch Norm uses different activation functions at training versus inference time.",
      ],
      correctAnswer: 1,
      explanation:
        "During training, Batch Normalisation normalises using the mini-batch statistics:\n\\[\n\\mu_B = \\frac{1}{m} \\sum_{i=1}^{m} x_i, \\quad \\sigma_B^2 = \\frac{1}{m} \\sum_{i=1}^{m} (x_i - \\mu_B)^2.\n\\]\n\nAt inference, a single test sample has no meaningful \"batch\" statistic. Instead, BN uses running estimates accumulated during training via exponential moving average:\n\\[\n\\mu_{\\text{run}} = \\text{momentum} \\cdot \\mu_{\\text{run}} + (1 - \\text{momentum}) \\cdot \\mu_B.\n\\]\nThese fixed population statistics make inference deterministic and independent of batch size.",
      hints: [
        "With a single test sample, the batch mean would just be that one sample's value — not a population statistic.",
        "During training, running averages of $\\mu_B$ and $\\sigma_B^2$ are accumulated and stored for use at inference.",
      ],
    },
    {
      id: "q-cv-kp4-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Batch Normalization eliminates the need for careful weight initialisation in deep neural networks.",
      correctAnswer: "False",
      explanation:
        "While Batch Normalization greatly reduces sensitivity to initialisation by stabilising activations across layers, good initialisation still matters:\n\nIn the very first forward pass — before any running statistics have been accumulated — the batch statistics may be unstable, especially with small batch sizes. Poor initialisation can still cause saturated (e.g., sigmoid/tanh) or exploding activations in this critical first pass.\n\nHe initialisation ($\\text{std} = \\sqrt{2/\\text{fan}_{\\text{in}}}$ for ReLU) sets weight variance to prevent signals from shrinking toward zero or exploding through deep networks, improving early convergence.",
      hints: [
        "BN stabilises activations during training — but what happens in the very first forward pass before running statistics are accumulated?",
        "He initialisation sets weight variance to keep signal magnitudes stable through deep ReLU networks.",
      ],
    },
  ],

  // ── cv-kp-5: Object Detection ─────────────────────────────────────────────
  "object-detection": [
    {
      id: "q-cv-kp5-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "A predicted bounding box has area $|A| = 60$ px$^2$ and a ground truth box has area $|B| = 80$ px$^2$. Their intersection area is $|A \\cap B| = 40$ px$^2$. What is the IoU (Intersection over Union)?",
      options: [
        "$0.40$ (intersection over predicted area: $40/60$)",
        "$0.50$ (intersection over ground truth area: $40/80$)",
        "$0.40$ (intersection over union: $40/(60 + 80 - 40)$)",
        "$0.67$ ($40/60$ rounded)",
      ],
      correctAnswer: 2,
      explanation:
        "IoU is defined as:\n\\[\n\\text{IoU} = \\frac{|A \\cap B|}{|A \\cup B|}.\n\\]\n\nThe union area is:\n\\[\n|A \\cup B| = |A| + |B| - |A \\cap B| = 60 + 80 - 40 = 100.\n\\]\n\nTherefore:\n\\[\n\\text{IoU} = \\frac{40}{100} = 0.40.\n\\]\n\nIn Pascal VOC, a detection is a true positive when $\\text{IoU} \\geq 0.5$. COCO averages AP over IoU thresholds $0.50:0.05:0.95$.",
      hints: [
        "The union is $|A| + |B| - |A \\cap B|$, to avoid double-counting the overlap.",
        "Compute: $60 + 80 - 40 = 100$, then $\\text{IoU} = 40/100 = 0.40$.",
      ],
    },
    {
      id: "q-cv-kp5-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When computing Average Precision (AP) for a single class in object detection, what are the correct steps in order?",
      options: [
        "(1) Sort all detections by confidence descending; (2) label each as TP (IoU $\\geq$ threshold with unmatched GT) or FP; (3) compute cumulative precision and recall at each detection; (4) compute area under the precision-recall curve.",
        "(1) Sort detections by bounding-box area; (2) match each to the nearest GT box; (3) compute F1 at 50% recall; (4) average F1 across all images.",
        "(1) Compute IoU for all predicted–GT pairs; (2) select the pair with maximum IoU; (3) compute precision at that IoU; (4) repeat for all GT boxes.",
        "(1) Threshold confidence at 0.5; (2) remove duplicates with NMS; (3) compute recall; (4) compute precision at 50% recall threshold.",
      ],
      correctAnswer: 0,
      explanation:
        "Standard AP computation (VOC/COCO) proceeds as follows:\n\n1. Sort all detections by confidence score in descending order.\n2. For each detection in rank order: if its IoU with any unmatched GT box $\\geq$ threshold, label it as TP (and mark that GT as matched); otherwise label it as FP.\n3. Compute cumulative precision $P(k) = \\text{TP}/(\\text{TP} + \\text{FP})$ and recall $R(k) = \\text{TP}/\\text{num\\_GT}$ at each rank $k$.\n4. AP is the area under the $P$–$R$ curve (interpolated at 11 recall points for VOC, continuous for COCO).\n\nmAP averages AP over all classes.",
      hints: [
        "The key first step is sorting by confidence — high-confidence detections are evaluated first.",
        "Once a GT box is matched, subsequent detections overlapping it are FPs even if IoU $\\geq$ threshold (greedy matching).",
      ],
    },
    {
      id: "q-cv-kp5-4",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "YOLOv1 predicts bounding boxes directly from a grid of cells. If the grid is $7 \\times 7$ and each cell predicts 2 boxes with 5 values each plus 20 class probabilities, what is the total output tensor size?",
      options: [
        "$7 \\times 7 \\times 30 = 1470$",
        "$7 \\times 7 \\times 25 = 1225$",
        "$7 \\times 7 \\times 40 = 1960$",
        "$7 \\times 7 \\times 10 = 490$",
      ],
      correctAnswer: 0,
      explanation:
        "Each of the $7 \\times 7 = 49$ grid cells outputs:\n\\[\n2 \\text{ boxes} \\times 5 \\text{ values} + 20 \\text{ class probabilities} = 10 + 20 = 30 \\text{ values}.\n\\]\n\nTotal output tensor:\n\\[\n7 \\times 7 \\times 30 = 1470.\n\\]\n\nYOLO frames object detection as a single regression problem, predicting all outputs in one forward pass — enabling real-time detection at approximately 45 FPS.",
      hints: [
        "Each box has 5 values: center $(x, y)$, size $(w, h)$, and objectness confidence.",
        "2 boxes $\\times$ 5 values + 20 classes = 30 values per cell. Multiply by $7 \\times 7 = 49$ cells.",
      ],
    },
    {
      id: "q-cv-kp5-5",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Faster R-CNN uses anchor boxes at each spatial location. If the backbone produces a $50 \\times 38$ feature map and 9 anchors are placed at each location (3 scales $\\times$ 3 aspect ratios), how many anchor boxes are generated in total?",
      options: [
        "$2700$ (incorrect stride-based calculation)",
        "$17100$ ($50 \\times 38 \\times 9$)",
        "$1900$ ($50 \\times 38$, no anchors-per-location factor)",
        "$38000$ ($50 \\times 38 \\times 20$)",
      ],
      correctAnswer: 1,
      explanation:
        "Anchors are placed at every spatial location in the feature map:\n\\[\n\\text{Total anchors} = H \\times W \\times \\text{anchors-per-location} = 50 \\times 38 \\times 9 = 17{,}100.\n\\]\n\nThe Region Proposal Network (RPN) classifies each anchor as foreground/background and regresses bounding-box offsets. Non-maximum suppression then retains the top approximately 2000 proposals for the detection head.",
      hints: [
        "Anchors are placed at every spatial location in the feature map — multiply $H \\times W \\times$ anchors-per-location.",
        "$50 \\times 38 = 1900$ spatial locations; each has 9 anchors: $1900 \\times 9 = 17100$.",
      ],
    },
    {
      id: "q-cv-kp5-6",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Feature Pyramid Networks (FPN) build a multi-scale feature pyramid. What is the key operation that allows FPN to create high-resolution feature maps with strong semantics?",
      options: [
        "Dilated convolutions that expand receptive fields without losing resolution.",
        "Top-down pathway with lateral connections: semantically strong coarse features are upsampled and merged with high-resolution bottom-up features.",
        "Global average pooling across all scales followed by channel-wise concatenation.",
        "Applying separate classifiers at each scale of a standard image pyramid at test time.",
      ],
      correctAnswer: 1,
      explanation:
        "FPN combines two pathways:\n\n1. **Bottom-up pathway**: the standard CNN forward pass, progressively downsampling to gain strong semantic features but losing spatial resolution.\n2. **Top-down pathway**: coarse, semantically rich feature maps are upsampled by $2\\times$ and merged element-wise with same-resolution features from the bottom-up pathway via $1 \\times 1$ lateral connections.\n\nThis gives every pyramid level both high resolution (from bottom-up) and rich semantic content (from top-down), enabling detectors like Faster R-CNN to accurately detect both small and large objects.",
      hints: [
        "Coarse feature maps have strong semantics but low resolution; fine maps have high resolution but weak semantics — FPN combines the best of both.",
        "Lateral $1 \\times 1$ convolutions reduce channel dimension and merge top-down (semantic) with bottom-up (high-resolution) features at each scale.",
      ],
    },
    {
      id: "q-cv-kp5-3",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DETR uses bipartite (Hungarian) matching between predictions and ground truth during training. Why does this eliminate the need for Non-Maximum Suppression (NMS) at inference?",
      options: [
        "DETR uses sigmoid instead of softmax activation, so multiple predictions can be confident about different objects without overlap.",
        "Hungarian matching enforces a bijective (one-to-one) assignment between object queries and GT boxes during training, so each query learns to predict at most one unique object — duplicates cannot emerge at inference.",
        "DETR predicts masks instead of bounding boxes, so bounding-box NMS is not applicable.",
        "DETR applies NMS during training but removes it at inference by clamping confidence scores.",
      ],
      correctAnswer: 1,
      explanation:
        "DETR uses $N$ object queries (e.g., $N = 100$) and the Hungarian algorithm finds the unique minimum-cost bijection between predictions and ground truth boxes. Each GT is matched to exactly one query, and each query is matched to at most one GT (or to \"no object\").\n\nSince training enforces this one-to-one uniqueness, the model cannot learn to produce duplicate detections for the same object — making NMS unnecessary at inference. This contrasts with anchor-based detectors, where many anchors can propose overlapping boxes for the same object.",
      hints: [
        "NMS is needed when multiple anchors/proposals detect the same object. What prevents that in DETR?",
        "The Hungarian matching enforces bijective (one-to-one) assignment: each query \"owns\" at most one GT box during training.",
      ],
    },
  ],

  // ── cv-kp-6: Semantic Segmentation ───────────────────────────────────────
  "semantic-segmentation": [
    {
      id: "q-cv-kp6-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Mean IoU (mIoU) is the standard metric for semantic segmentation. For a binary segmentation problem, if $\\text{TP} = 80$, $\\text{FP} = 20$, $\\text{FN} = 10$, what is the IoU for the foreground class?",
      options: [
        "$0.73$ ($\\text{TP}/(\\text{TP}+\\text{FP}+\\text{FN}) = 80/110$)",
        "$0.80$ ($\\text{TP}/(\\text{TP}+\\text{FP}) = 80/100$)",
        "$0.89$ ($\\text{TP}/(\\text{TP}+\\text{FN}) = 80/90$)",
        "$0.75$ (incorrect formula)",
      ],
      correctAnswer: 0,
      explanation:
        "For semantic segmentation, IoU for a single class is defined as:\n\\[\n\\text{IoU} = \\frac{\\text{TP}}{\\text{TP} + \\text{FP} + \\text{FN}}.\n\\]\n\nSubstituting the given values:\n\\[\n\\text{IoU} = \\frac{80}{80 + 20 + 10} = \\frac{80}{110} \\approx 0.727 \\approx 0.73.\n\\]\n\nHere FP are predicted-foreground pixels that are actually background, and FN are actual-foreground pixels predicted as background.\n\nmIoU averages IoU over all classes (including background).",
      hints: [
        "IoU for segmentation = $\\text{TP}/(\\text{TP}+\\text{FP}+\\text{FN})$. This equals intersection over union on pixel sets.",
        "Compute: $80/(80+20+10) = 80/110 \\approx 0.73$.",
      ],
    },
    {
      id: "q-cv-kp6-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'Fully Convolutional Networks (FCN) for segmentation produce coarse feature maps that must be upsampled. What does "FCN-32s" versus "FCN-8s" refer to?',
      options: [
        "FCN-32s upsamples the pool5 output directly by $32\\times$ in one step; FCN-8s fuses pool3 ($8\\times$ downsampled) and pool4 skip features before upsampling by $8\\times$, producing finer predictions.",
        "FCN-32s uses 32 filters in the last convolutional layer; FCN-8s uses 8 filters for a lighter model.",
        "FCN-32s operates at 32-pixel stride for fast inference; FCN-8s processes 8 overlapping patches per pixel.",
        "FCN-32s applies 32-bit floating point weights; FCN-8s applies 8-bit quantised weights.",
      ],
      correctAnswer: 0,
      explanation:
        "In Long et al. (2015):\n\n- **FCN-32s**: takes the pool5 feature map ($32\\times$ downsampled relative to the input) and upsamples it $32\\times$ in one bilinear step — the coarsest and blurriest output.\n- **FCN-16s**: adds a skip connection from pool4 ($16\\times$ downsampled) and upsamples by $16\\times$, improving boundary localisation.\n- **FCN-8s**: additionally incorporates pool3 ($8\\times$ downsampled) for an $8\\times$ upsample, yielding the finest boundary predictions.\n\nEach added skip connection recovers spatial detail lost during downsampling.",
      hints: [
        "The number refers to the downsampling factor of the coarsest feature map used — larger means coarser predictions.",
        "Adding skip connections from earlier, higher-resolution layers recovers spatial detail lost during downsampling.",
      ],
    },
    {
      id: "q-cv-kp6-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Semantic segmentation and instance segmentation produce the same output for a scene with multiple objects of the same class.",
      correctAnswer: "False",
      explanation:
        'Semantic segmentation labels all pixels of a given class identically (e.g., all cars share the label "car" with no further distinction), while instance segmentation assigns each individual object a unique mask ID — so two cars receive different instance labels but the same semantic label.',
      hints: [
        'If three people are in the image, semantic segmentation labels all their pixels "person" with no further distinction.',
        "What additional information does instance segmentation provide that semantic segmentation withholds?",
      ],
    },
  ],

  // ── cv-kp-7: Instance Segmentation ───────────────────────────────────────
  "instance-segmentation": [
    {
      id: "q-cv-kp7-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "How does Mask R-CNN extend Faster R-CNN to perform instance segmentation?",
      options: [
        "It replaces the RPN with a segmentation-specific region proposal network.",
        "It adds a parallel binary mask prediction head to the per-ROI classification and box regression heads.",
        "It uses a fully convolutional decoder that runs before region proposals are generated.",
        "It replaces bounding box regression with direct mask contour point regression.",
      ],
      correctAnswer: 1,
      explanation:
        "Mask R-CNN adds a small FCN (Fully Convolutional Network) mask head in parallel with the existing box and class heads. For each ROI, it predicts a binary mask of fixed spatial size (e.g., $14 \\times 14$ or $28 \\times 28$) indicating which pixels belong to the detected object instance. This mask prediction is independent of the class prediction — the mask head operates on each ROI regardless of its predicted class.",
      hints: [
        "Faster R-CNN already detects and classifies objects — what extra output does instance segmentation need?",
        "The mask head runs per-ROI, predicting a binary mask for each detected instance, independently of class prediction.",
      ],
    },
    {
      id: "q-cv-kp7-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What problem does ROI Align solve compared to ROI Pool in Mask R-CNN?",
      options: [
        "ROI Align uses bilinear interpolation to avoid quantisation errors when extracting fixed-size features from misaligned regions.",
        "ROI Align reduces the number of region proposals to improve speed.",
        "ROI Align replaces max pooling with average pooling for smoother feature aggregation.",
        "ROI Align normalises the feature values within each region for stable training.",
      ],
      correctAnswer: 0,
      explanation:
        "ROI Pool discretises (quantises) ROI coordinates to the nearest integer grid point:\n\\[\n\\text{quantised bin start} = \\lfloor \\text{float bin start} \\rfloor.\n\\]\n\nThis introduces a systematic spatial misalignment — the extracted features no longer precisely correspond to the original ROI coordinates — which degrades mask accuracy.\n\nROI Align avoids quantisation by using bilinear interpolation at exact sub-pixel locations, preserving spatial alignment and greatly improving mask quality.",
      hints: [
        "Rounding coordinates to integers introduces a small but systematic spatial shift — why does that matter for precise mask prediction?",
        "Bilinear interpolation allows sampling at non-integer grid positions — how does that preserve alignment?",
      ],
    },
    {
      id: "q-cv-kp7-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Instance segmentation requires detecting individual object instances, so it is impossible to achieve without a region proposal or anchor-based detection stage.",
      correctAnswer: "False",
      explanation:
        "Anchor-free methods like SOLO and SOLOv2 perform instance segmentation by predicting masks directly based on instance location and size categories, without any region proposal or anchor mechanism.",
      hints: [
        "SOLO (Segmenting Objects by LOcations) assigns each location to an instance — does it use anchors?",
        "Think about whether instance segmentation is fundamentally tied to the two-stage detection paradigm.",
      ],
    },
  ],

  // ── cv-kp-8: Image Classification & Transfer Learning ────────────────────
  "image-classification": [
    {
      id: "q-cv-kp8-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the main advantage of 3D convolutions (C3D) over 2D convolutions for video understanding?",
      options: [
        "3D convolutions require fewer parameters than 2D convolutions on the same input",
        "3D convolutions jointly model spatial and temporal patterns by applying filters across both spatial dimensions and the time axis",
        "3D convolutions can process variable-length videos without padding",
        "3D convolutions eliminate the need for optical flow as a separate input stream",
      ],
      correctAnswer: 1,
      explanation:
        "3D convolutional filters extend into the time dimension, learning spatiotemporal patterns (e.g., motion of body parts) directly from raw video frames, unlike 2D CNNs which process each frame independently.",
      hints: [
        "A 2D CNN applied per frame captures appearance but not motion — what does adding the time dimension enable?",
        "3D filters have shape (T\\timesH\\timesW) — what does the T dimension capture?",
      ],
    },
    {
      id: "q-cv-kp8-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SlowFast networks use two parallel pathways with different temporal sampling rates. What does each pathway capture?",
      options: [
        "The Slow pathway captures long-term audio; the Fast pathway captures short-term visual motion",
        "The Slow pathway (low frame rate) captures spatial semantics; the Fast pathway (high frame rate) captures fine temporal motion",
        "The Slow pathway processes low-resolution frames; the Fast pathway processes high-resolution frames",
        "The Slow pathway uses 3D convolutions; the Fast pathway uses 2D convolutions on optical flow",
      ],
      correctAnswer: 1,
      explanation:
        "SlowFast has a Slow pathway (few frames, high channel capacity) for semantic content and a Fast pathway (many frames, few channels) for motion, with lateral connections fusing them — inspired by the primate visual system\'s P and M cell pathways.",
      hints: [
        "If the model only sees normal images during training, what does it learn?",
        "The momentum teacher provides stable targets — how does centering prevent the teacher from always outputting the same thing?",
      ],
    },
    {
      id: "q-cv-kp8-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "When fine-tuning an ImageNet-pretrained CNN for a small medical imaging dataset, which strategy typically gives the best results?",
      options: [
        "Training only the randomly initialised classification head while freezing all pretrained layers, regardless of dataset size",
        "Unfreezing and fine-tuning all layers with a small learning rate (e.g., 1e-4), often using a lower LR for early layers than later layers (discriminative fine-tuning)",
        "Re-initialising all weights from scratch and training with a large learning rate to fit the medical domain",
        "Freezing all layers except the last batch normalisation, which is fine-tuned to adapt to the new domain",
      ],
      correctAnswer: 1,
      explanation:
        "For a small target dataset, the best strategy is typically to fine-tune all layers with a small global learning rate, using lower learning rates for early layers (which contain general features like edges) and higher rates for later layers (which contain task-specific features). This discriminative fine-tuning (introduced in ULMFiT) prevents catastrophic forgetting of useful low-level features while adapting high-level representations to the new domain.",
      hints: [
        "Early conv layers detect universal features (edges, textures) — do these need large updates for a new domain?",
        "Using a smaller LR for pretrained layers and larger LR for new layers is called discriminative fine-tuning.",
      ],
    },
    {
      id: "q-cv-kp8-5",
      type: "true-false",
      difficulty: "easy",
      question:
        "Transfer learning from a model pretrained on a large dataset (e.g., ImageNet) always degrades performance compared to training from scratch when the target dataset is large and very different in domain from the source dataset.",
      correctAnswer: "False",
      explanation:
        "Even when the target domain is very different from the source (e.g., satellite imagery vs. natural photos), transfer learning almost always matches or exceeds training from scratch — especially with large pretrained models. Low-level features (edges, textures, Gabor-like filters) are universally useful across domains, providing a better initialisation and faster convergence even if the final performance is similar.",
      hints: [
        "What do the earliest convolutional layers of any image network learn, regardless of the specific dataset?",
        "Training from scratch requires more data and compute to reach the same loss level — does pretraining help even in a different domain?",
      ],
    },
    {
      id: "q-cv-kp8-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "TimeSformer applies transformer self-attention separately over the spatial and temporal dimensions (divided space-time attention) to make video classification tractable.",
      correctAnswer: "True",
      explanation:
        "TimeSformer uses divided attention — separate temporal and spatial attention operations per layer — rather than full space-time attention over all patch-frame pairs, reducing the quadratic cost of attending over both dimensions simultaneously.",
      hints: [
        "The forward process destroys the image by adding noise — the reverse process is learned to undo this.",
        "Think about how starting from noise and iteratively refining it could produce a coherent image.",
      ],
    },
  ],

  // ── cv-kp-9: Data Augmentation ────────────────────────────────────────────
  "data-augmentation-cv": [
    {
      id: "q-cv-kp9-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the primary purpose of data augmentation during CNN training?",
      options: [
        "To increase the number of model parameters for greater capacity",
        "To artificially increase dataset diversity and reduce overfitting by applying label-preserving transformations",
        "To speed up training by reducing the number of unique images processed",
        "To normalise pixel values to zero mean and unit variance",
      ],
      correctAnswer: 1,
      explanation:
        "Data augmentation applies label-preserving transforms (flips, crops, colour jitter, rotation) to create diverse training variants, exposing the model to a wider input distribution and reducing overfitting without collecting new data. Standard augmentation (random crop + horizontal flip) improved AlexNet top-5 error by ~1.5% on ImageNet.",
      hints: [
        "A model trained only on upright objects may fail when they appear rotated — how does augmentation address this?",
        "The label stays the same after a horizontal flip of a cat image — why is label preservation critical?",
      ],
    },
    {
      id: "q-cv-kp9-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Mixup creates a training sample by forming $\\tilde{x} = \\lambda x_i + (1-\\lambda)x_j$ and $\\tilde{y} = \\lambda y_i + (1-\\lambda)y_j$ where $\\lambda \\sim \\text{Beta}(\\alpha, \\alpha)$. If $\\alpha = 0.2$ and $\\lambda = 0.7$, and image $i$ is class \"cat\" (one-hot $[1, 0]$) while image $j$ is class \"dog\" ($[0, 1]$), what is the mixed label $\\tilde{y}$?",
      options: [
        "$[1, 0]$ — the dominant class (cat) wins",
        "$[0.7, 0.3]$ — 70% cat, 30% dog",
        "$[0.5, 0.5]$ — always uniform regardless of $\\lambda$",
        "$[0.2, 0.8]$ — $\\alpha$ directly controls the label",
      ],
      correctAnswer: 1,
      explanation:
        "Applying the Mixup label formula:\n\\[\n\\tilde{y} = \\lambda \\cdot [1, 0] + (1-\\lambda) \\cdot [0, 1] = 0.7 \\cdot [1, 0] + 0.3 \\cdot [0, 1] = [0.7, 0] + [0, 0.3] = [0.7, 0.3].\n\\]\n\nThe model is trained with a soft target: 70% \"cat\", 30% \"dog\". Both pixels and labels are linearly interpolated with the same $\\lambda$. This soft supervision encourages smoother decision boundaries and better-calibrated confidence, reducing overconfident predictions.",
      hints: [
        "Apply the formula $\\tilde{y} = \\lambda y_i + (1-\\lambda)y_j$ with $\\lambda = 0.7$, $y_i = [1, 0]$, $y_j = [0, 1]$.",
        "$0.7 \\times [1, 0] + 0.3 \\times [0, 1] = [0.7, 0] + [0, 0.3] = [0.7, 0.3]$.",
      ],
    },
    {
      id: "q-cv-kp9-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "AutoAugment searches for optimal augmentation policies using reinforcement learning. What does a policy consist of, and what is the main practical drawback?",
      options: [
        "A single global scale factor for all augmentations; the drawback is it only works on grayscale images",
        "A sequence of (operation, probability, magnitude) triplets selected by a controller RNN; the drawback is the search cost (thousands of GPU-hours on the target dataset)",
        "A fixed set of 20 standard augmentations applied in random order; the drawback is it doubles training time",
        "A neural network that generates augmented images; the drawback is it requires paired original and augmented labels",
      ],
      correctAnswer: 1,
      explanation:
        "AutoAugment defines a policy as K sub-policies, each consisting of two (operation, probability, magnitude) triplets. A controller RNN proposes policies evaluated on a proxy task via RL. The searched CIFAR-10 policy achieves SOTA but requires ~5000 GPU-hours of search — making it impractical for new datasets. RandAugment later showed that randomly sampling operations with a single shared magnitude achieves similar accuracy without any search.",
      hints: [
        "Each sub-policy is a pair of (transform, probability, magnitude) — what does the RL controller optimise?",
        "The search runs thousands of child model evaluations — how does RandAugment avoid this cost?",
      ],
    },
    {
      id: "q-cv-kp9-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "CutMix replaces a rectangular patch of one image with pixels from another, and adjusts the mixed label proportionally to the area ratio of the patch, so if a 112\\times112 patch is cut into a 224\\times224 image the label weight for the pasted image is 0.25.",
      correctAnswer: "True",
      explanation:
        'CutMix label weight = cut area / total image area = (112\\times112) / (224\\times224) = 12544/50176 = 0.25. If image i is "cat" and the 25%-area patch comes from image j "dog", the label is 0.75\\cdoty\\_i + 0.25\\cdoty\\_j = [0.75, 0.25]. Unlike Mixup which blends pixels, CutMix creates hard regional boundaries — teaching models to focus on discriminative local regions.',
      hints: [
        "If 99% of pixels are background, a model that always predicts background achieves 99% pixel accuracy — is that useful?",
        "Dice loss penalises based on overlap, not pixel count — how does that help when foreground is rare?",
      ],
    },
  ],

  // ── cv-kp-10: Vision Transformer (ViT) ───────────────────────────────────
  "vision-transformer-vit": [
    {
      id: "q-cv-kp10-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "ViT-Base divides a 224\\times224 image into 16\\times16 patches. How many patch tokens does the transformer encoder receive (excluding the [CLS] token)?",
      options: [
        "49 tokens (224/16 = 14, then 7\\times7)",
        "196 tokens (14\\times14)",
        "256 tokens (16\\times16)",
        "784 tokens (28\\times28)",
      ],
      correctAnswer: 1,
      explanation:
        "With patch size 16\\times16 on a 224\\times224 image: 224/16 = 14 patches per side. Total patch tokens = 14\\times14 = 196. Adding the special [CLS] token gives 197 tokens fed to the transformer. The [CLS] token\'s final embedding is used for classification.",
      hints: [
        "224 \\div 16 = 14 patches along each spatial dimension.",
        "14 \\times 14 = 196 patch tokens (plus 1 [CLS] = 197 total).",
      ],
    },
    {
      id: "q-cv-kp10-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Self-attention in a transformer has O(N\\^2) complexity in the number of tokens N. For ViT with 196 patch tokens, how does this compare to a CNN layer with local 3\\times3 receptive fields at the same resolution?",
      options: [
        "ViT self-attention is O(196\\^2) = O(38416) pairwise interactions per head, while the CNN\'s local 3\\times3 attention is O(196 \\times 9) = O(1764) — ViT attends globally at quadratically higher cost but captures long-range dependencies the CNN cannot in a single layer",
        "ViT self-attention is cheaper because transformers use sparse attention patterns trained by backpropagation",
        "Both have identical complexity because ViT patches and CNN receptive fields process the same number of pixels",
        "ViT self-attention is O(N log N) due to the softmax normalisation in the attention formula",
      ],
      correctAnswer: 0,
      explanation:
        "Standard self-attention computes pairwise dot products between all N tokens: O(N\\^2\\cdotd) per layer. For N=196, that is 196\\^2=38,416 pairs per head. A CNN 3\\times3 conv attends to at most 9 neighbors per position: O(196\\times9\\timesd). ViT pays ~21\\times more for global context; Swin Transformer reduces this with windowed local attention O(N\\timesw\\^2) while hierarchically expanding receptive fields.",
      hints: [
        "Attention computes a score for every pair (i, j) of tokens. N tokens \\to N\\^2 pairs.",
        "A CNN\'s 3\\times3 kernel at each position attends to 9 neighbors, not all 196 positions.",
      ],
    },
    {
      id: "q-cv-kp10-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "ViT uses positional encodings for its patch sequence because self-attention is permutation-invariant and cannot infer spatial order from patch content alone.",
      correctAnswer: "True",
      explanation:
        "Self-attention is a set operation: attention(Q, K, V) is unchanged if tokens are permuted consistently. Without positional encodings, a ViT processing row-by-row vs. column-by-column shuffled patches would produce identical outputs — destroying spatial structure. Learnable 1D position embeddings added to each patch embedding inject spatial order.",
      hints: [
        "Shuffle 196 patches randomly — without positional encodings, does the transformer produce a different output?",
        'Position embeddings encode "patch at row i, column j" so the model knows spatial arrangement.',
      ],
    },
  ],

  // ── cv-kp-11: Self-Supervised Learning in CV ──────────────────────────────
  "self-supervised-cv": [
    {
      id: "q-cv-kp11-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the core idea behind contrastive self-supervised learning (e.g., SimCLR)?",
      options: [
        "Predicting masked image patches from surrounding context",
        "Pulling together representations of different augmented views of the same image and pushing apart representations of different images in the batch",
        "Classifying images into pseudo-labels generated by k-means clustering",
        "Training a generator and discriminator adversarially on unlabelled images",
      ],
      correctAnswer: 1,
      explanation:
        "SimCLR creates two random augmented views of each image, projects them through an encoder + projection head, and maximises cosine similarity between views of the same image (positive pair) while minimising it against views of all other images in the batch (negatives) using NT-Xent loss. With batch size N, each sample has 1 positive and 2(N−1) negatives.",
      hints: [
        "Different crops of the same photo should produce similar representations — what loss enforces this?",
        'The "contrastive" part compares positive pairs against many negatives — large batches are needed for enough negatives.',
      ],
    },
    {
      id: "q-cv-kp11-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does DINO (Self-DIstillation with NO labels) avoid representation collapse without explicit negative pairs?",
      options: [
        "By using a momentum encoder as a teacher and applying centering (subtracting a running mean from teacher outputs) and sharpening (low temperature in teacher softmax) to prevent the teacher from collapsing to a trivial constant output",
        "By adding a batch normalisation layer between the encoder and projection head",
        "By predicting the cluster assignment of patches in a codebook with a cross-entropy loss",
        "By training with very large batch sizes to ensure diverse negative samples",
      ],
      correctAnswer: 0,
      explanation:
        "DINO uses EMA teacher + student: the student tries to match the teacher\'s output on different augmented views. Two mechanisms prevent collapse: (1) centering subtracts a running mean g_c from teacher logits, preventing any single dimension from dominating; (2) sharpening uses low temperature \\tau_t\\approx0.04 in teacher softmax to produce peaked distributions that carry more signal.",
      hints: [
        "Collapse = all embeddings identical. Centering prevents one mode from dominating; sharpening prevents uniform outputs.",
        "The EMA teacher is more stable than the student — it provides consistent targets.",
      ],
    },
    {
      id: "q-cv-kp11-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Masked Image Modelling (MIM, as in MAE) trains a ViT encoder to reconstruct randomly masked patches from visible patches, learning rich visual representations without any labelled data.",
      correctAnswer: "True",
      explanation:
        "MAE (Masked Autoencoders, He et al. 2022) randomly masks 75% of patches, passes only visible patches through a ViT encoder, then uses a lightweight decoder to reconstruct the masked patches in pixel space. Despite no labels, MAE-pretrained ViT-L achieves 87.8% ImageNet top-1 accuracy after fine-tuning — outperforming supervised pretraining on smaller datasets.",
      hints: [
        "Masking 75% leaves only 25% visible — reconstructing missing patches forces understanding of global structure.",
        "The reconstruction loss is computed only on masked patches (not visible ones), preventing trivial solutions.",
      ],
    },
  ],

  // ── cv-kp-12: Generative Models in CV ────────────────────────────────────
  "generative-cv": [
    {
      id: "q-cv-kp12-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the role of the discriminator in a Generative Adversarial Network (GAN)?",
      options: [
        "To generate realistic images from random noise vectors",
        "To distinguish between real training images and fake images produced by the generator",
        "To encode real images into a latent space for the generator to sample from",
        "To compute the reconstruction loss between generated and real images",
      ],
      correctAnswer: 1,
      explanation:
        "The discriminator is a binary classifier trained to tell real images from generated (fake) ones; its feedback provides the adversarial signal that drives the generator to produce increasingly realistic images.",
      hints: [
        "The generator and discriminator are trained adversarially — what signal does the generator receive?",
        "If the discriminator cannot tell real from fake, has the generator succeeded?",
      ],
    },
    {
      id: "q-cv-kp12-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does a denoising diffusion probabilistic model (DDPM) generate images?",
      options: [
        "By sampling a latent vector and decoding it in a single forward pass through a decoder network",
        "By iteratively applying a learned denoising network to progressively remove noise from pure Gaussian noise over many steps",
        "By adversarially training a generator to fool a pixel-level discriminator",
        "By sampling tokens from a discrete image codebook using an autoregressive transformer",
      ],
      correctAnswer: 1,
      explanation:
        "DDPMs define a forward process that gradually adds Gaussian noise to data over T steps, then train a network to reverse this process step by step; image generation starts from pure noise and iteratively denoises to a clean image.",
      hints: [
        "The forward process destroys the image by adding noise — the reverse process is learned to undo this.",
        "Think about how starting from noise and iteratively refining it could produce a coherent image.",
      ],
    },
    {
      id: "q-cv-kp12-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "A Variational Autoencoder (VAE) learns to encode images into a continuous latent space from which new images can be sampled by decoding random latent vectors.",
      correctAnswer: "True",
      explanation:
        "The VAE encoder outputs parameters of a Gaussian distribution in latent space; the decoder maps samples from this distribution back to image space; the KL divergence term regularises the latent space to be smooth and continuous for generative sampling.",
      hints: [
        "Unlike a plain autoencoder, the VAE encodes to a distribution rather than a point — why does that enable sampling?",
        "If the latent space is continuous and structured, interpolating between latent vectors should produce coherent images.",
      ],
    },
  ],

  // ── cv-kp-13: Optical Flow & Video Understanding ──────────────────────────
  "optical-flow": [
    {
      id: "q-cv-kp13-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What does optical flow represent in a video sequence?",
      options: [
        "The change in pixel intensity values between two frames",
        "The apparent motion of pixels between consecutive frames as a 2D displacement field",
        "The depth of each pixel estimated from frame differences",
        "The camera pose transformation between consecutive frames",
      ],
      correctAnswer: 1,
      explanation:
        "Optical flow is a dense 2D vector field where each vector represents the displacement (u, v) of a pixel from one frame to the next, capturing apparent motion of objects or the camera.",
      hints: [
        "Optical flow is a field of 2D vectors, one per pixel — what does each vector describe?",
        "Think about why this assumption is useful for optical flow estimation.",
        "What would optical flow be if brightness could change arbitrarily between frames?",
      ],
    },
    {
      id: "q-cv-kp13-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Why is optical flow computed using the brightness constancy assumption?",
      options: [
        "It assumes that pixels with similar brightness in consecutive frames are likely to correspond to the same object",
        "It assumes that objects move in a way that preserves their brightness across frames",
        "It assumes that the camera is perfectly calibrated and doesn\'t suffer from motion blur",
        "It assumes that all pixels in an image have the same brightness",
      ],
      correctAnswer: 0,
      explanation:
        "The brightness constancy assumption states that the brightness of a pixel does not change between frames unless the pixel is part of a moving object. This assumption is fundamental to optical flow estimation.",
      hints: [
        "Think about why this assumption is useful for optical flow estimation.",
        "What would optical flow be if brightness could change arbitrarily between frames?",
      ],
    },
    {
      id: "q-cv-kp13-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Optical flow is a single vector field that describes the motion of all pixels in a video frame.",
      correctAnswer: "False",
      explanation:
        "Optical flow is a dense 2D vector field where each vector describes the motion of a specific pixel from one frame to the next. It is not a single vector field for all pixels.",
      hints: [
        "Each pixel in a video frame has its own optical flow vector.",
        "What would optical flow be if brightness could change arbitrarily between frames?",
      ],
    },
  ],

  // ── cv-kp-16: Medical Imaging AI ──────────────────────────────────────────
  "medical-imaging": [
    {
      id: "q-cv-kp16-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Why is U-Net particularly popular for medical image segmentation tasks?",
      options: [
        "It was the first deep learning model to achieve human-level performance on ImageNet",
        "Its encoder-decoder architecture with skip connections preserves fine spatial detail needed for precise segmentation, even with limited training data",
        "It uses 3D convolutions natively for volumetric medical data",
        "It was specifically designed for CT scan Hounsfield unit normalisation",
      ],
      correctAnswer: 1,
      explanation:
        "U-Net was designed for biomedical image segmentation where training data is scarce; skip connections recover high-resolution spatial detail lost during downsampling, enabling precise boundary delineation critical for medical analysis.",
      hints: [
        "Medical datasets are often small — what properties of U-Net help with limited data?",
        "Precise segmentation of tumours or organs requires fine spatial detail — how do skip connections preserve this?",
      ],
    },
    {
      id: "q-cv-kp16-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        'What is the "class imbalance" challenge in medical image segmentation, and how is it commonly addressed?',
      options: [
        "Different hospitals use different imaging protocols; addressed by domain adaptation",
        "Pathological regions (e.g., tumours) occupy a small fraction of pixels; addressed using Dice loss or weighted cross-entropy to upweight minority pixels",
        "Some classes are harder to annotate than others; addressed by using semi-supervised learning",
        "CT and MRI produce different intensity ranges; addressed by Hounsfield unit normalisation",
      ],
      correctAnswer: 1,
      explanation:
        "In medical segmentation, foreground lesions may occupy <1% of pixels, causing standard cross-entropy to underperform; Dice loss directly optimises overlap between predictions and ground truth, naturally handling class imbalance.",
      hints: [
        "If 99% of pixels are background, a model that always predicts background achieves 99% pixel accuracy — is that useful?",
        "Dice loss penalises based on overlap, not pixel count — how does that help when foreground is rare?",
      ],
    },
    {
      id: "q-cv-kp16-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Transfer learning from ImageNet-pretrained models is always less effective for medical imaging than training from scratch on medical data.",
      correctAnswer: "False",
      explanation:
        "Despite the domain gap (natural vs. medical images), ImageNet-pretrained models transfer well to medical imaging when data is limited; low-level feature detectors (edges, textures) remain useful, and fine-tuning typically outperforms training from scratch on small medical datasets.",
      hints: [
        "Even though X-rays look different from natural photos, do they share low-level features like edges?",
        "When labelled medical data is scarce, what advantage does a pretrained initialisation provide?",
      ],
    },
  ],

  // ── cv-kp-17: Zero-Shot & Few-Shot Recognition ────────────────────────────
  "zero-shot-cv": [
    {
      id: "q-cv-kp17-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does zero-shot image classification work in models like CLIP?",
      options: [
        "The model is trained on the test classes with no images, only class name descriptions",
        "Image embeddings are compared to text embeddings of class descriptions; the class with the highest cosine similarity is predicted",
        "A separate language model generates training images for unseen classes on the fly",
        "The model uses k-means clustering of visual features to assign images to class centroids",
      ],
      correctAnswer: 1,
      explanation:
        'CLIP aligns image and text embeddings in a shared space; at inference, a prompt like "a photo of a {class}" is encoded as text and compared to the image embedding — the class with the highest similarity is selected without any class-specific visual training.',
      hints: [
        "CLIP is trained with paired image-text data — what shared space does this produce?",
        '"Zero-shot" means no labelled images of the test class — what acts as the class descriptor instead?',
      ],
    },
    {
      id: "q-cv-kp17-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does DINO (Self-DIstillation with NO labels) avoid representation collapse without explicit negative pairs?",
      options: [
        "By using a momentum encoder as a teacher and applying centering and sharpening to the teacher\'s output distribution",
        "By adding a batch normalisation layer between the encoder and projection head",
        "By predicting the cluster assignment of patches in a codebook with a cross-entropy loss",
        "By training with very large batch sizes to ensure diverse negative samples",
      ],
      correctAnswer: 0,
      explanation:
        "DINO uses a student-teacher framework where the teacher is an exponential moving average of the student; centering (subtracting a running mean) and sharpening (low temperature) of teacher outputs prevent collapse without requiring negative pairs.",
      hints: [
        "Collapse occurs when all representations become identical — what prevents this if there are no explicit negatives?",
        "The momentum teacher provides stable targets — how does centering prevent the teacher from always outputting the same thing?",
      ],
    },
    {
      id: "q-cv-kp17-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Self-supervised pretraining in computer vision requires large amounts of labelled data to generate the pretraining signal.",
      correctAnswer: "False",
      explanation:
        "Self-supervised methods derive their learning signal from the data itself (e.g., augmentation agreement, masked patch prediction) without any human-provided labels, making them applicable to large unlabelled image collections.",
      hints: [
        'The term "self-supervised" implies the supervision comes from the data itself — where do labels come from?',
        "Think about how you can construct a pretraining task using only the image and transformations applied to it.",
      ],
    },
  ],

  // ── cv-kp-18: Image Retrieval & Hashing ───────────────────────────────────
  "image-retrieval": [
    {
      id: "q-cv-kp18-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the goal of content-based image retrieval (CBIR)?",
      options: [
        "Generating a textual description of an image for search engine indexing",
        "Finding images in a database that are visually similar to a query image based on learned feature embeddings",
        "Classifying images into categories for structured database storage",
        "Retrieving images by keyword tags assigned during manual annotation",
      ],
      correctAnswer: 1,
      explanation:
        "CBIR retrieves images whose visual content (encoded as feature embeddings) is most similar to the query image, enabling search by visual similarity without relying on text annotations.",
      hints: [
        '"Content-based" contrasts with text-based search — what replaces keywords?',
        "Feature embeddings encode visual semantics — how can similarity in embedding space relate to visual similarity?",
      ],
    },
    {
      id: "q-cv-kp18-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Why is hashing used in large-scale image retrieval?",
      options: [
        "To compress images before transmission over limited bandwidth",
        "To convert high-dimensional embeddings into compact binary codes that enable fast Hamming distance search",
        "To encrypt image features to protect intellectual property",
        "To generate unique identifiers for images in a database without feature comparison",
      ],
      correctAnswer: 1,
      explanation:
        "Hashing methods (e.g., LSH, deep hashing) map image embeddings to short binary codes; Hamming distance between binary codes can be computed very efficiently (XOR + popcount), enabling sub-linear retrieval in massive databases.",
      hints: [
        "Comparing billions of high-dimensional float vectors is slow — what property of binary codes makes comparison faster?",
        "Hamming distance counts differing bits — can modern hardware compute this faster than float arithmetic?",
      ],
    },
    {
      id: "q-cv-kp18-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "IoU (Intersection over Union) of 0.5 is the standard threshold for a detection to be considered a true positive in the Pascal VOC object detection benchmark.",
      correctAnswer: "True",
      explanation:
        "The Pascal VOC benchmark defines a detection as a true positive if its IoU with a ground truth box exceeds 0.5; COCO extends this by evaluating across IoU thresholds from 0.50 to 0.95 in steps of 0.05.",
      hints: [
        "An IoU of 0.5 means the predicted box overlaps with at least half of the ground truth box area.",
        "Different benchmarks use different IoU thresholds — VOC uses 0.5, COCO uses 0.50:0.95.",
      ],
    },
  ],

  // ── cv-kp-19: Panoptic Segmentation ──────────────────────────────────────
  "panoptic-segmentation": [
    {
      id: "q-cv-kp19-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What does panoptic segmentation unify that semantic and instance segmentation handle separately?",
      options: [
        "Object detection and depth estimation",
        "Semantic segmentation (stuff classes with no instances) and instance segmentation (countable thing classes)",
        "Video segmentation and image segmentation",
        "Foreground segmentation and background removal",
      ],
      correctAnswer: 1,
      explanation:
        'Panoptic segmentation assigns every pixel a semantic class label and additionally provides a unique instance ID for countable "things" (e.g., cars, people), while "stuff" classes (e.g., road, sky) receive class labels but no instance IDs.',
      hints: [
        '"Panoptic" means all-encompassing — what two tasks does it combine?',
        "Think about a street scene: the road has no distinct instances but cars do — how does panoptic handle both?",
      ],
    },
    {
      id: "q-cv-kp19-2",
      type: "multiple-choice",
      difficulty: "medium",
      question: "What metric is used to evaluate panoptic segmentation?",
      options: [
        "Mean IoU (mIoU) averaged over all semantic classes",
        "Panoptic Quality (PQ), which combines segmentation quality and recognition quality",
        "mAP at IoU = 0.5, the same metric used for object detection",
        "F1 score at the pixel level over all thing and stuff classes",
      ],
      correctAnswer: 1,
      explanation:
        "Panoptic Quality (PQ) = Segmentation Quality (SQ, mean IoU of matched pairs) \\times Recognition Quality (RQ, F1 of matched vs. unmatched predictions), capturing both how well matched segments overlap and how well detection precision/recall performs.",
      hints: [
        "PQ rewards both accurate segment boundaries and correct detection — which two factors does it multiply?",
        "A model that detects all instances but with poor masks would score low on which component of PQ?",
      ],
    },
    {
      id: "q-cv-kp19-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In panoptic segmentation, a single pixel can belong to more than one instance.",
      correctAnswer: "False",
      explanation:
        "Panoptic segmentation requires a unique, non-overlapping assignment — every pixel is assigned to exactly one segment (either a stuff region or a single thing instance), unlike instance segmentation which may produce overlapping masks.",
      hints: [
        "The panoptic task is defined as assigning exactly one label per pixel — can that allow overlap?",
        "Instance segmentation models like Mask R-CNN can produce overlapping masks — how is this resolved in panoptic segmentation?",
      ],
    },
  ],

  // ── cv-kp-20: Video Classification ───────────────────────────────────────
  "video-classification": [
    {
      id: "q-cv-kp20-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the main advantage of 3D convolutions (C3D) over 2D convolutions for video understanding?",
      options: [
        "3D convolutions require fewer parameters than 2D convolutions on the same input",
        "3D convolutions jointly model spatial and temporal patterns by applying filters across both spatial dimensions and the time axis",
        "3D convolutions can process variable-length videos without padding",
        "3D convolutions eliminate the need for optical flow as a separate input stream",
      ],
      correctAnswer: 1,
      explanation:
        "3D convolutional filters extend into the time dimension, learning spatiotemporal patterns (e.g., motion of body parts) directly from raw video frames, unlike 2D CNNs which process each frame independently.",
      hints: [
        "A 2D CNN applied per frame captures appearance but not motion — what does adding the time dimension enable?",
        "3D filters have shape (T\\timesH\\timesW) — what does the T dimension capture?",
      ],
    },
    {
      id: "q-cv-kp20-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SlowFast networks use two parallel pathways with different temporal sampling rates. What does each pathway capture?",
      options: [
        "The Slow pathway captures long-term audio; the Fast pathway captures short-term visual motion",
        "The Slow pathway (low frame rate) captures spatial semantics; the Fast pathway (high frame rate) captures fine temporal motion",
        "The Slow pathway processes low-resolution frames; the Fast pathway processes high-resolution frames",
        "The Slow pathway uses 3D convolutions; the Fast pathway uses 2D convolutions on optical flow",
      ],
      correctAnswer: 1,
      explanation:
        "SlowFast has a Slow pathway (few frames, high channel capacity) for semantic content and a Fast pathway (many frames, few channels) for motion, with lateral connections fusing them — inspired by the primate visual system\'s P and M cell pathways.",
      hints: [
        "Semantic understanding (what action is happening) requires fewer frames than capturing fast motion — which pathway handles each?",
        "The Fast pathway samples more frames per second — what does higher temporal resolution help capture?",
      ],
    },
    {
      id: "q-cv-kp20-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "TimeSformer applies transformer self-attention separately over the spatial and temporal dimensions (divided space-time attention) to make video classification tractable.",
      correctAnswer: "True",
      explanation:
        "TimeSformer uses divided attention — separate temporal and spatial attention operations per layer — rather than full space-time attention over all patch-frame pairs, reducing the quadratic cost of attending over both dimensions simultaneously.",
      hints: [
        "The forward process destroys the image by adding noise — the reverse process is learned to undo this.",
        "Think about how starting from noise and iteratively refining it could produce a coherent image.",
      ],
    },
  ],

  // ── cv-kp-21: Scene Recognition & Places365 ──────────────────────────────
  "scene-recognition": [
    {
      id: "q-cv-kp21-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What makes scene recognition different from object recognition?",
      options: [
        "Scene recognition classifies single objects; object recognition classifies whole images",
        "Scene recognition classifies the overall environment or setting (e.g., bedroom, beach) based on global context, not individual objects",
        "Scene recognition requires bounding box annotations; object recognition only uses image-level labels",
        "Scene recognition only works on outdoor images; object recognition works on all images",
      ],
      correctAnswer: 1,
      explanation:
        "Scene recognition identifies the high-level environment or place type from the holistic image context — global layout, materials, and spatial configuration — rather than detecting specific object instances.",
      hints: [
        "A kitchen can be recognised even if you cover all the individual objects — what cues remain?",
        'Think about whether recognising "bedroom" requires identifying a bed, or just the overall spatial context.',
      ],
    },
    {
      id: "q-cv-kp21-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the Places365 dataset, and why is it useful for scene recognition?",
      options: [
        "A dataset of 365 images from each world city, used for geo-localisation",
        "A large-scale scene recognition dataset with 1.8M+ images covering 365 scene categories, used to train place-aware visual features",
        "A benchmark of 365 object categories extending COCO for fine-grained recognition",
        "A video dataset with 365-day temporal coverage for long-term scene understanding",
      ],
      correctAnswer: 1,
      explanation:
        "Places365 contains over 1.8 million images across 365 scene categories (e.g., airport, forest, kitchen); CNNs pretrained on Places365 learn scene-centric features complementary to object-centric ImageNet features.",
      hints: [
        "ImageNet is object-centric — what dataset fills the need for scene-centric pretraining?",
        "Think about what 365 categories at the scene level covers — not objects but environments.",
      ],
    },
    {
      id: "q-cv-kp21-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Scene recognition models trained on Places365 can be used as feature extractors for downstream visual tasks beyond scene classification.",
      correctAnswer: "True",
      explanation:
        "Places365-pretrained features encode rich environmental context (materials, spatial layout, lighting) useful for tasks like visual question answering, image captioning, and indoor localisation where scene semantics matter.",
      hints: [
        "Transfer learning from any well-trained model can be beneficial — what scene-specific information might Places365 features encode?",
        "Think about tasks where knowing the scene type (indoor vs. outdoor, type of room) is a useful prior.",
      ],
    },
  ],

  // ── cv-kp-22: Visual Anomaly Detection ───────────────────────────────────
  "anomaly-detection-cv": [
    {
      id: "q-cv-kp22-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the typical setting for visual anomaly detection in industrial inspection?",
      options: [
        "Supervised binary classification using balanced datasets of normal and defective items",
        "Training only on normal (non-defective) images and detecting deviations from the learned normal distribution at test time",
        "Using a GAN to generate synthetic defects and training a discriminator on them",
        "Clustering all production images and labelling the smallest cluster as anomalous",
      ],
      correctAnswer: 1,
      explanation:
        "In industrial anomaly detection, defects are rare and their types are often unknown in advance; models are trained on abundant normal images only and flag test images that deviate significantly from the learned normality model.",
      hints: [
        "Defects in manufacturing are by definition rare — can you collect enough labelled defect examples for supervised learning?",
        "If the model only sees normal images during training, what does it learn?",
      ],
    },
    {
      id: "q-cv-kp22-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "PatchCore, a top-performing anomaly detection method, works by:",
      options: [
        "Training an autoencoder on normal images and using reconstruction error as an anomaly score",
        "Building a memory bank of normal patch features and scoring test patches by their nearest-neighbour distance to the memory bank",
        "Training a binary classifier on augmented anomaly images and normal images",
        "Applying normalising flow to model the density of normal features and thresholding the log-likelihood",
      ],
      correctAnswer: 1,
      explanation:
        "PatchCore extracts patch-level features from a pretrained CNN for normal training images, stores a coreset in a memory bank, and scores test patches by their distance to the nearest stored normal patch — no training on anomalies needed.",
      hints: [
        "If 99% of pixels are background, a model that always predicts background achieves 99% pixel accuracy — is that useful?",
        "Dice loss penalises based on overlap, not pixel count — how does that help when foreground is rare?",
      ],
    },
    {
      id: "q-cv-kp22-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Visual anomaly detection models are typically evaluated using the AUROC (Area Under the ROC Curve) metric.",
      correctAnswer: "True",
      explanation:
        "AUROC measures the model\'s ability to rank anomalous samples higher than normal samples across all possible thresholds; it is threshold-agnostic and accounts for the class imbalance common in anomaly detection benchmarks.",
      hints: [
        "An anomaly detector needs a threshold — AUROC evaluates performance across all thresholds simultaneously.",
        "Think about how you can construct a pretraining task using only the image and transformations applied to it.",
      ],
    },
  ],

  // ── cv-kp-23: Document AI & OCR ───────────────────────────────────────────
  "document-ai": [
    {
      id: "q-cv-kp23-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is Optical Character Recognition (OCR) and what is its primary output?",
      options: [
        "A technique for compressing scanned document images for storage",
        "The process of converting images of text (printed or handwritten) into machine-readable character sequences",
        "A method for detecting the layout of a document including headers and footers",
        "A system for classifying documents into categories such as invoices and contracts",
      ],
      correctAnswer: 1,
      explanation:
        "OCR takes an image containing text and outputs a digital text string, enabling downstream processing; modern OCR systems use deep learning to handle diverse fonts, handwriting styles, and image quality.",
      hints: [
        "Before OCR, scanned pages were just images — what does OCR enable you to do with the content?",
        "Think about converting a photo of a book page into searchable, editable text.",
      ],
    },
    {
      id: "q-cv-kp23-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "LayoutLM extends BERT for document understanding by incorporating which additional input modalities?",
      options: [
        "Audio transcription and table structure annotations",
        "2D positional embeddings (bounding box coordinates) and optionally image features alongside text token embeddings",
        "Font type and size information extracted from PDF metadata",
        "Language-specific script embeddings for multilingual document processing",
      ],
      correctAnswer: 1,
      explanation:
        "LayoutLM embedss just text tokens but also their 2D spatial positions (x1, y1, x2, y2) within the document page; LayoutLMv2/v3 additionally incorporate visual features from the page image, enabling layout-aware document understanding.",
      hints: [
        "Static appearance and motion are both cues for recognising actions — why process them separately?",
        "Optical flow captures motion patterns that RGB frames alone cannot easily encode.",
      ],
    },
    {
      id: "q-cv-kp23-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Modern end-to-end OCR systems can jointly detect text regions and recognise characters without a separate text detection stage.",
      correctAnswer: "True",
      explanation:
        "End-to-end models (e.g., FOTS, ABCNet) simultaneously detect text regions and transcribe them in a single forward pass, whereas traditional OCR pipelines separate text detection (finding where text is) from recognition (what the text says).",
      hints: [
        "Traditional OCR has two stages — can a single neural network learn both detection and recognition jointly?",
        "End-to-end training allows detection and recognition to benefit from each other\'s gradients.",
      ],
    },
  ],

  // ── cv-kp-24: Remote Sensing & Satellite Imagery ──────────────────────────
  "remote-sensing-cv": [
    {
      id: "q-cv-kp24-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What makes satellite imagery different from standard RGB photos for computer vision tasks?",
      options: [
        "Satellite images are always captured in black and white",
        "Satellite images often have more spectral bands (e.g., NIR, SWIR), much larger spatial extents, and a top-down (nadir) viewpoint",
        "Satellite images are always at very low resolution (>10m per pixel)",
        "Satellite images cannot be used with CNNs because of their non-Euclidean geometry",
      ],
      correctAnswer: 1,
      explanation:
        "Satellite sensors capture multiple spectral bands beyond visible RGB (e.g., near-infrared for vegetation), cover thousands of km\\^2, and view scenes from directly above — all of which require adapted preprocessing and models.",
      hints: [
        "Earth observation satellites capture light beyond the visible spectrum — what extra information do those bands provide?",
        "A nadir (top-down) view differs from typical ground-level photos — how does that affect object appearance?",
      ],
    },
    {
      id: "q-cv-kp24-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the Normalised Difference Vegetation Index (NDVI) and how is it computed from satellite imagery?",
      options: [
        "NDVI = (Red - Blue) / (Red + Blue) — measures water content of vegetation",
        "NDVI = (NIR - Red) / (NIR + Red) — measures vegetation density using the contrast between near-infrared and red reflectance",
        "NDVI = (Green - Red) / (Green + Red) — distinguishes vegetation from urban areas using visible bands only",
        "NDVI = NIR / Red — measures the ratio of photosynthetically active radiation to total radiation",
      ],
      correctAnswer: 1,
      explanation:
        "NDVI exploits the fact that healthy vegetation strongly reflects NIR and absorbs Red; NDVI = (NIR - Red)/(NIR + Red) ranges from -1 to 1, with values near 1 indicating dense healthy vegetation.",
      hints: [
        "Healthy leaves absorb red light for photosynthesis and reflect NIR — how does the formula capture this contrast?",
        "NDVI requires spectral bands beyond RGB — which bands are needed?",
      ],
    },
    {
      id: "q-cv-kp24-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Change detection in satellite imagery aims to identify regions where land cover or surface conditions have changed between two images captured at different times.",
      correctAnswer: "True",
      explanation:
        "Change detection compares multi-temporal satellite images to identify areas of significant change (e.g., deforestation, urban expansion, flood damage), and is a key application of remote sensing for environmental monitoring.",
      hints: [
        "Two satellite images of the same area taken months apart may show different land cover — how would you detect changes?",
        "Applications include monitoring disaster damage, tracking urban growth, and detecting illegal deforestation.",
      ],
    },
  ],

  // ── cv-kp-25: Neural Style Transfer & Image Generation ────────────────────
  "neural-style-transfer": [
    {
      id: "q-cv-kp25-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "What is the role of the discriminator in a Generative Adversarial Network (GAN)?",
      options: [
        "To generate realistic images from random noise vectors",
        "To distinguish between real training images and fake images produced by the generator",
        "To encode real images into a latent space for the generator to sample from",
        "To compute the reconstruction loss between generated and real images",
      ],
      correctAnswer: 1,
      explanation:
        "The discriminator is a binary classifier trained to tell real images from generated (fake) ones; its feedback provides the adversarial signal that drives the generator to produce increasingly realistic images.",
      hints: [
        "The generator and discriminator are trained adversarially — what signal does the generator receive?",
        "If the discriminator cannot tell real from fake, has the generator succeeded?",
      ],
    },
    {
      id: "q-cv-kp25-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "How does a denoising diffusion probabilistic model (DDPM) generate images?",
      options: [
        "By sampling a latent vector and decoding it in a single forward pass through a decoder network",
        "By iteratively applying a learned denoising network to progressively remove noise from pure Gaussian noise over many steps",
        "By adversarially training a generator to fool a pixel-level discriminator",
        "By sampling tokens from a discrete image codebook using an autoregressive transformer",
      ],
      correctAnswer: 1,
      explanation:
        "DDPMs define a forward process that gradually adds Gaussian noise to data over T steps, then train a network to reverse this process step by step; image generation starts from pure noise and iteratively denoises to a clean image.",
      hints: [
        "The forward process destroys the image by adding noise — the reverse process is learned to undo this.",
        "Think about how starting from noise and iteratively refining it could produce a coherent image.",
      ],
    },
    {
      id: "q-cv-kp25-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "A Variational Autoencoder (VAE) learns to encode images into a continuous latent space from which new images can be sampled by decoding random latent vectors.",
      correctAnswer: "True",
      explanation:
        "The VAE encoder outputs parameters of a Gaussian distribution in latent space; the decoder maps samples from this distribution back to image space; the KL divergence term regularises the latent space to be smooth and continuous for generative sampling.",
      hints: [
        "Unlike a plain autoencoder, the VAE encodes to a distribution rather than a point — why does that enable sampling?",
        "If the latent space is continuous and structured, interpolating between latent vectors should produce coherent images.",
      ],
    },
  ],

  // ── cv-kp-26: Robustness & Adversarial Examples ───────────────────────────
  "robustness-cv": [
    {
      id: "q-cv-kp26-1",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is an adversarial example in computer vision?",
      options: [
        "A training image with an incorrect label that misleads the model during training",
        "An image with carefully crafted, imperceptible perturbations that cause a classifier to predict the wrong class",
        "An image from a different domain (e.g., sketches) that the model fails to classify correctly",
        "A synthetic image generated by a GAN that fools a human observer",
      ],
      correctAnswer: 1,
      explanation:
        "Adversarial examples are inputs with small, often human-imperceptible pixel perturbations intentionally crafted to maximise the model\'s loss, causing it to misclassify with high confidence.",
      hints: [
        "The perturbation is chosen to specifically fool the model, not just add random noise.",
        'A human sees a cat; the model confidently predicts "guacamole" — what caused this?',
      ],
    },
    {
      id: "q-cv-kp26-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "What is the key insight of the SRCNN (Super-Resolution CNN) approach for image super-resolution?",
      options: [
        "It uses GAN training to generate photorealistic textures in upscaled images",
        "It learns an end-to-end mapping from low-resolution to high-resolution images using a CNN with convolutional, non-linear mapping, and reconstruction layers",
        "It applies a frequency-domain upsampling using learned DCT coefficients",
        "It retrieves high-frequency patches from a database to augment low-resolution inputs",
      ],
      correctAnswer: 1,
      explanation:
        "SRCNN pioneers deep learning for super-resolution by training a three-layer CNN to directly learn the mapping from bicubic-upsampled LR images to HR images, outperforming classical methods like sparse coding.",
      hints: [
        "Before deep learning, super-resolution used sparse coding with hand-crafted dictionaries — how does SRCNN differ?",
        "An end-to-end CNN learns the LR-to-HR mapping jointly rather than in separate stages.",
      ],
    },
    {
      id: "q-cv-kp26-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Channel shuffling in ShuffleNet is a permutation operation that reorders channels across groups, enabling cross-group information exchange at essentially zero computational cost.",
      correctAnswer: "True",
      explanation:
        "ShuffleNet applies grouped convolutions (which keep channels isolated) followed by a channel shuffle operation that reorders channels across groups, enabling cross-group information exchange at essentially zero computational cost.",
      hints: [
        "Grouped convolutions partition channels into independent groups — preventing inter-group information flow.",
        "Shuffling is a permutation (rearranging indices) — how much compute does that require?",
      ],
    },
  ],

  // ── cv-kp-27: Efficient CV ────────────────────────────────────────────────
  "efficient-cv": [
    {
      id: "q-cv-kp27-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "Depthwise separable convolution replaces a standard 3\\times3 conv on C-channel input with output of C channels. By what factor does it reduce FLOPs compared to the standard conv?",
      options: [
        "C/9 reduction (depends on channel count)",
        "1/(C + 1/9) \\approx 1/9 for large C (approximately the inverse of the kernel area)",
        "1/3 reduction (depthwise is 1/3 of standard)",
        "1/(8C/9 + 1) which simplifies to roughly 1/9 only for C=1",
      ],
      correctAnswer: 1,
      explanation:
        "Standard 3\\times3 conv FLOPs \\propto 3\\times3\\timesC\\timesC = 9C\\^2. Depthwise separable: depthwise 3\\times3 per channel = 3\\times3\\timesC = 9C, pointwise 1\\times1 = 1\\timesC\\timesC = C\\^2. Total = 9C + C\\^2 = C(9 + C). Ratio = C(9+C)/(9C\\^2) = (9+C)/(9C) \\approx 1/9 for large C. MobileNet uses this to achieve ~8–9\\times fewer FLOPs than a standard conv, enabling mobile deployment.",
      hints: [
        "Standard: F\\timesF\\timesC_in\\timesC_out. Depthwise: F\\timesF\\timesC (one filter per channel). Pointwise: 1\\times1\\timesC\\timesC.",
        "For 3\\times3 filter and C channels: ratio = (9C + C\\^2) / (9C\\^2) = (9+C)/(9C) \\to 1/9 as C\\to\\infty.",
      ],
    },
    {
      id: "q-cv-kp27-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In knowledge distillation, training with a teacher temperature $\\tau > 1$ \"softens\" the probability distribution. If a teacher produces logits $[4, 1, -2]$ and $\\tau = 4$, what happens to the soft label distribution compared to $\\tau = 1$?",
      options: [
        "At $\\tau = 4$ the distribution becomes more uniform (entropy increases), revealing inter-class similarity structure that hard labels hide.",
        "At $\\tau = 4$ the distribution becomes sharper (entropy decreases), making distillation easier.",
        "Temperature only affects the student network, not the teacher soft labels.",
        "At $\\tau = 4$ the distribution is identical to $\\tau = 1$ since softmax is scale-invariant.",
      ],
      correctAnswer: 0,
      explanation:
        "Soft labels are computed as $\\softmax(z / \\tau)$.  \n\nAt $\\tau = 1$:\n\\[\np \\propto [e^4, e^1, e^{-2}] \\approx [0.952, 0.047, 0.001],\n\\]\nwhich is very peaked toward class 1.\n\nAt $\\tau = 4$:\n\\[\np \\propto [e^{4/4}, e^{1/4}, e^{-2/4}] = [e^1, e^{0.25}, e^{-0.5}] \\approx [0.574, 0.282, 0.144],\n\\]\nwhich is much more uniform. Higher $\\tau$ reveals that the teacher considers class 2 more plausible than class 3 even when predicting class 1 — transferring structural knowledge beyond the top-1 prediction.",
      hints: [
        "Temperature $\\tau$ divides all logits before softmax. With larger $\\tau$, the logit differences are compressed, producing a more uniform distribution.",
        "As $\\tau \\to \\infty$, soft labels approach a uniform distribution; as $\\tau \\to 0$, they approach a one-hot distribution.",
      ],
    },
    {
      id: "q-cv-kp27-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "ShuffleNet uses channel shuffling to enable information flow between feature channels after grouped convolutions, without incurring the full cost of standard convolutions.",
      correctAnswer: "True",
      explanation:
        "Grouped convolution partitions C channels into g groups, each operating independently — preventing inter-group information flow. Channel shuffle physically reorders the output channels so that features from different groups are interleaved before the next grouped conv. This is a zero-parameter, O(1) permutation that costs negligible compute while restoring cross-group communication.",
      hints: [
        "Grouped convolutions with g=4 create 4 isolated feature groups — without shuffling, information never crosses group boundaries.",
        "Shuffling is a permutation (rearranging indices) — how much compute does that require?",
      ],
    },
  ],

  // ── cv-kp-28: CV Evaluation Metrics ──────────────────────────────────────
  "cv-evaluation": [
    {
      id: "q-cv-kp28-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "COCO mAP (the standard benchmark) is computed at multiple IoU thresholds. Which formula correctly defines COCO mAP?",
      options: [
        "$\\text{mAP} = \\text{AP} \\times \\text{IoU}$",
        "$\\text{mAP} = \\text{AP} \\times (\\text{IoU} + 0.5)$",
        "$\\text{mAP} = \\text{AP} \\times (\\text{IoU} + 0.5)/2$",
        "$\\text{mAP} = \\text{AP} \\times (\\text{IoU} + 0.5)/10$",
      ],
      correctAnswer: 2,
      explanation:
        "COCO mAP is defined as:\n\\[\n\\text{mAP} = \\text{AP} \\times \\frac{\\text{IoU} + 0.5}{2}.\n\\]\n\nThis averages AP over two IoU thresholds: $0.5$ and $0.75$. Higher IoU thresholds demand tighter localisation between predicted and ground-truth boxes. Averaging over multiple thresholds rewards detectors that produce both rough ($\\text{IoU} \\geq 0.5$) and precise ($\\text{IoU} \\geq 0.75$) localisations.\n\nNote: the actual COCO benchmark uses 10 thresholds ($0.50, 0.55, \\ldots, 0.95$), but the formula structure follows the same principle.",
      hints: [
        "COCO mAP averages AP over multiple IoU thresholds, penalising imprecise boxes more as the threshold increases.",
        "The factor of $(0.5 + \\text{IoU})/2$ captures averaging between the 0.5 and 0.75 IoU thresholds.",
      ],
    },
    {
      id: "q-cv-kp28-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "FID (Fréchet Inception Distance) measures the distance between feature distributions of real and generated images. Which formula correctly defines FID?",
      options: [
        "$\\text{FID} = \\|\\mu_r - \\mu_g\\|^2 + \\text{Tr}\\!\\left(\\Sigma_r + \\Sigma_g - 2(\\Sigma_r \\Sigma_g)^{1/2}\\right)$, where $\\mu$ and $\\Sigma$ are the mean and covariance of Inception-v3 pool3 features for real ($r$) and generated ($g$) images.",
        "$\\text{FID} = \\text{average pixel-wise MSE}$ between real and generated images divided by Inception classification accuracy.",
        "$\\text{FID} = D_{\\text{KL}}\\!\\left(\\mathcal{N}(\\mu_r, \\Sigma_r) \\| \\mathcal{N}(\\mu_g, \\Sigma_g)\\right)$, the KL divergence between two Gaussians.",
        "$\\text{FID} = 1 - \\text{cosine\\_similarity}(\\mu_r, \\mu_g)$, using only mean Inception features without covariance.",
      ],
      correctAnswer: 0,
      explanation:
        "FID is the Fréchet (Wasserstein-2) distance between two multivariate Gaussians:\n\\[\n\\text{FID} = \\|\\mu_r - \\mu_g\\|^2 + \\text{Tr}\\!\\left(\\Sigma_r + \\Sigma_g - 2(\\Sigma_r \\Sigma_g)^{1/2}\\right).\n\\]\n\nHere $\\mu_r, \\Sigma_r$ are the mean and covariance of Inception-v3 pool3 features for real images, and $\\mu_g, \\Sigma_g$ are for generated images. Lower FID indicates more similar distributions. FID penalises both poor image quality (feature mean drifts from real) and mode collapse (low generated covariance).",
      hints: [
        "FID is the Fréchet/Wasserstein-2 distance between two multivariate Gaussians $\\mathcal{N}(\\mu_r, \\Sigma_r)$ and $\\mathcal{N}(\\mu_g, \\Sigma_g)$.",
        "The matrix square-root term $(\\Sigma_r \\Sigma_g)^{1/2}$ penalises when the covariances of real and generated features differ — this catches mode collapse.",
      ],
    },
    {
      id: "q-cv-kp28-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "COCO mAP is reported as the mean of AP values computed across 10 IoU thresholds (0.50, 0.55, …, 0.95). A model achieves AP\\_0.\\_5\\_0=0.72 and AP\\_0.\\_7\\_5=0.52 but very low AP at stricter thresholds. Which statement best explains why COCO mAP (AP[.50:.95]) might be around 0.48 while VOC mAP (AP@0.5) is 0.72?",
      options: [
        "COCO mAP is lower because COCO has more object categories than Pascal VOC",
        "Averaging AP over thresholds 0.50–0.95 penalises imprecise localisation; a model with loose bounding boxes scores well at IoU=0.5 but poorly at IoU=0.75–0.95, dragging the average below AP@0.5",
        "COCO mAP uses a different P-R interpolation method that always produces lower values than the 11-point VOC interpolation",
        "COCO mAP subtracts the FID score from AP@0.5, which reduces the reported metric",
      ],
      correctAnswer: 1,
      explanation:
        "COCO mAP = (1/10) \\times \\Sigma AP@IoU_threshold for thresholds 0.50, 0.55, …, 0.95. A model that localises objects loosely will achieve high AP@0.5 (50% overlap suffices) but low AP@0.75 and near-zero AP@0.90–0.95 (tight overlap required). The average over all 10 thresholds rewards precise box localisation, encouraging detectors to produce tighter boxes rather than just the correct class.",
      hints: [
        "Higher IoU thresholds demand that the predicted box nearly perfectly overlaps the ground truth — loose boxes fail these stricter thresholds.",
        "mAP[.50:.95] is the unweighted mean of 10 AP values — if most values above IoU=0.6 are near zero, the mean will be much lower than AP@0.5.",
      ],
    },
    {
      id: "q-cv-kp28-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "In Pascal VOC evaluation, a detection is a true positive only if its IoU with a ground truth box exceeds 0.5 AND the same ground truth box has not already been matched by a higher-confidence detection.",
      correctAnswer: "True",
      explanation:
        "VOC AP matching is greedy in confidence order: sort detections by score, assign each to the highest-IoU unmatched GT (if IoU \\geq 0.5). Once a GT is matched, all further detections overlapping it are FPs regardless of IoU. This prevents a single GT from generating multiple TPs and ensures the precision-recall curve reflects genuine detection performance.",
      hints: [
        'The "unmatched" condition prevents double-counting: two high-confidence overlapping predictions for one GT yield only one TP.',
        "Greedy matching in confidence order rewards detectors that assign highest scores to correct detections.",
      ],
    },
  ],

  // ── cv-kp-30: Foundation Models for CV ───────────────────────────────────
  "foundation-models-cv": [
    {
      id: "q-cv-kp30-1",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "SAM (Segment Anything Model) consists of three components: an image encoder, a prompt encoder, and a mask decoder. Which image encoder does SAM use and why?",
      options: [
        "A ResNet-50 backbone pretrained on ImageNet because it is fast and lightweight",
        "A heavyweight ViT (ViT-H/16 in SAM-1) pretrained with MAE, run once per image to produce a 64\\times64 image embedding that is cached and reused across multiple prompts",
        "A CLIP vision encoder so that text prompts and image prompts can be processed in the same embedding space",
        "A U-Net encoder-decoder so that the image embedding retains full spatial resolution for segmentation",
      ],
      correctAnswer: 1,
      explanation:
        "SAM uses a ViT-H (huge) image encoder with MAE pretraining to produce dense image embeddings at 1/16 scale (64\\times64 for a 1024\\times1024 input). Crucially, the image encoder runs once and the resulting embedding is stored — allowing fast interactive segmentation at < 50ms per prompt using only the lightweight prompt encoder and mask decoder.",
      hints: [
        "The image encoder is the expensive part — SAM amortises its cost by caching the embedding across prompts.",
        "ViT-H has 632M parameters; the prompt encoder and mask decoder together have ~4M.",
      ],
    },
    {
      id: "q-cv-kp30-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DINOv2 achieves strong performance across diverse CV tasks without task-specific fine-tuning. How is it pretrained?",
      options: [
        "Supervised pretraining on ImageNet-22k with label smoothing and aggressive augmentation",
        "Self-supervised learning combining DINO self-distillation (student-teacher with centering/sharpening) and iBOT masked image modelling, trained on a carefully curated LVD-142M dataset",
        "Contrastive pretraining on image-text pairs from the web (similar to CLIP)",
        "Autoregressive next-patch prediction on a large-scale image dataset",
      ],
      correctAnswer: 1,
      explanation:
        "DINOv2 combines two self-supervised objectives: (1) DINO self-distillation where a student ViT matches a momentum-teacher\'s global CLS token predictions; (2) iBOT masked image modelling where masked patch tokens are predicted. Training on the curated LVD-142M dataset (deduplicated, filtered web images) gives features that work as a universal visual backbone without fine-tuning for depth, segmentation, and classification.",
      hints: [
        "DINOv2 is purely self-supervised — it uses no text pairs (unlike CLIP) and no manual labels.",
        "Combining DINO (CLS-level) and iBOT (patch-level) objectives encourages both global and local feature quality.",
      ],
    },
    {
      id: "q-cv-kp30-4",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SAM (Segment Anything Model) accepts multiple types of prompts to generate segmentation masks. Which of the following is NOT a supported prompt type in SAM?",
      options: [
        "A point (x, y) with a foreground/background label",
        "A bounding box (x1, y1, x2, y2) specifying a region of interest",
        "A free-form text description of the object to segment",
        "A rough mask from a previous prediction used to refine the segmentation",
      ],
      correctAnswer: 2,
      explanation:
        "SAM\'s prompt encoder accepts points, bounding boxes, and low-resolution masks as geometric prompts — it does NOT natively accept free-form text descriptions. Text-prompted segmentation requires an additional text-grounding module (e.g., Grounding DINO + SAM). SAM\'s mask decoder then generates up to 3 candidate masks with confidence scores from any combination of supported prompts.",
      hints: [
        "SAM\'s prompt encoder converts sparse (points, boxes) and dense (masks) inputs — which input format is it missing?",
        "Text-to-segmentation requires first grounding the text to image regions, which SAM itself does not do.",
      ],
    },
    {
      id: "q-cv-kp30-5",
      type: "multiple-choice",
      difficulty: "easy",
      question:
        "CLIP is trained with a contrastive (InfoNCE) loss on a batch of $N$ image-text pairs. For a batch of $N = 4$ pairs, how many positive and negative pairs does the loss use?",
      options: [
        "4 positives and 4 negatives (one negative per positive pair)",
        "4 positives and 12 negatives ($N$ positives, $N^2 - N$ negatives)",
        "4 positives and 8 negatives (2 negatives per positive)",
        "4 positives and 16 negatives ($N^2$ total pairs)",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP constructs an $N \\times N$ similarity matrix. Each of the $N$ diagonal entries (image $i$ with text $i$) is a positive pair. All off-diagonal entries are negative pairs — each image is paired with every other text, and vice versa.\n\nFor $N = 4$:\n\\[\n\\text{positives} = 4, \\quad \\text{negatives} = N^2 - N = 16 - 4 = 12.\n\\]\n\nThe InfoNCE loss maximises similarity of diagonal entries relative to all negatives in both image$\\to$text and text$\\to$image directions. Large batch sizes ($N = 32768$) provide abundant negatives, which is crucial for CLIP's performance.",
      hints: [
        "An $N \\times N$ matrix has $N$ diagonal (positive) and $N^2 - N$ off-diagonal (negative) entries.",
        "For $N = 4$: $4^2 = 16$ total pairs, 4 on the diagonal are positives, $16 - 4 = 12$ are negatives.",
      ],
    },
    {
      id: "q-cv-kp30-3",
      type: "true-false",
      difficulty: "medium",
      question:
        'CLIP (Contrastive Language-Image Pretraining) can be used for zero-shot image classification by comparing image embeddings to text embeddings of class descriptions like "a photo of a {class}".',
      correctAnswer: "True",
      explanation:
        'CLIP trains dual ViT/ResNet image and text encoders with InfoNCE contrastive loss on 400M (image, text) pairs to produce aligned embeddings. At inference, class prompts "a photo of a {class}" are embedded as text; the image is embedded; cosine similarity identifies the closest class — enabling zero-shot classification on unseen classes without any task-specific training.',
      hints: [
        "CLIP learns a shared image-text embedding space where matching pairs are close — class names can act as label embeddings.",
        '"Zero-shot" means no labelled images of the test class are needed — the text description substitutes.',
      ],
    },
  ],

  // ── cv-kp-31: Video Understanding ─────────────────────────────────────────
  "video-understanding-advanced": [
    {
      id: "q-cv-kp31-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Two-stream networks for video action recognition process which two complementary input streams?",
      options: [
        "RGB frames and depth maps captured by an RGBD sensor",
        "RGB frames (spatial stream) and optical flow frames (temporal stream), which are then fused for action classification",
        "Audio waveforms and RGB frames, fused via a cross-modal attention layer",
        "Low-resolution keyframes and high-resolution crops around detected persons",
      ],
      correctAnswer: 1,
      explanation:
        "Two-stream networks (Simonyan & Zisserman, 2014) split video understanding into appearance (spatial stream: individual RGB frames) and motion (temporal stream: stacked optical flow frames). Each stream is a CNN independently trained for action classification; predictions are fused by late fusion (averaging or SVM). The spatial stream captures object appearance; the temporal stream captures motion patterns. This decomposition achieved state-of-the-art on UCF-101 and HMDB-51.",
      hints: [
        "Action recognition needs both what objects look like (RGB) and how they move (optical flow).",
        "Optical flow encodes pixel displacement between consecutive frames as a 2D vector field — a natural motion descriptor.",
      ],
    },
    {
      id: "q-cv-kp31-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "3D convolutional networks (C3D, I3D) extend 2D CNNs to video by doing what?",
      options: [
        "Processing each frame independently with a 2D CNN and aggregating features with an LSTM",
        "Applying 3D convolution kernels of shape (T \\times H \\times W) that convolve across both spatial dimensions and a temporal dimension simultaneously, learning spatio-temporal features jointly",
        "Using 3D pooling only (not 3D convolution) to downsample the temporal dimension while keeping spatial convolutions 2D",
        "Extracting 3D point clouds from video depth maps and processing them with PointNet",
      ],
      correctAnswer: 1,
      explanation:
        "C3D (Tran et al., 2015) replaces all 2D conv kernels (H\\timesW) with 3D kernels (T\\timesH\\timesW = 3\\times3\\times3), allowing the network to jointly learn spatial and temporal features. I3D (Carreira & Zisserman, 2017) inflates Inception-v1 2D kernels to 3D and initialises them by repeating 2D weights along the time axis (exploiting ImageNet pre-training). 3D CNNs capture local motion patterns better than RNN-based approaches and are the backbone of modern video models (SlowFast, Video Swin Transformer).",
      hints: [
        "A 2D conv kernel slides over H\\timesW. A 3D kernel slides over T\\timesH\\timesW — it sees multiple frames at once.",
        "I3D's inflation trick: copy each 2D kernel T times along the temporal axis so it starts with ImageNet-level representations.",
      ],
    },
    {
      id: "q-cv-kp31-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Optical flow estimation computes the apparent motion of pixels between consecutive video frames and is represented as a 2D vector field (dx, dy) per pixel.",
      correctAnswer: "True",
      explanation:
        "Optical flow assigns each pixel in frame t a 2D displacement vector (dx, dy) pointing to where that pixel moved in frame t+1. Classical methods: Lucas-Kanade (sparse, patch-based), Horn-Schunck (dense, regularised). Deep learning methods: FlowNet, PWC-Net, RAFT (Teed & Deng, 2020 — state-of-the-art on KITTI and MPI-Sintel). Optical flow is used in two-stream action recognition, video stabilisation, and frame interpolation.",
      hints: [
        "Optical flow is a dense vector field: every pixel gets an (x, y) displacement, not just feature keypoints.",
        "A moving car: pixels in the car region have large dx (horizontal displacement); stationary background has near-zero flow.",
      ],
    },
  ],

  // ── cv-kp-32: 3D Object Detection ─────────────────────────────────────────
  "3d-object-detection": [
    {
      id: "q-cv-kp32-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "LiDAR-based 3D object detection differs from camera-based detection primarily because LiDAR data is what?",
      options: [
        "A dense RGB image captured with a scanning mechanism rather than a lens",
        "A sparse, unordered set of 3D points (point cloud) with x, y, z coordinates and optionally intensity, rather than a dense 2D pixel grid",
        "A sequence of depth maps with per-pixel dense depth values similar to a depth camera",
        "A structured voxel grid with uniform point density captured by a rotating sensor",
      ],
      correctAnswer: 1,
      explanation:
        "A LiDAR sensor emits laser pulses and measures the return time to produce a set of 3D points — a point cloud. Unlike camera images (dense, ordered H\\timesW grid), point clouds are sparse (e.g., 100K points covering a 360-degree scene), unordered (no fixed grid structure), and irregular (point density varies with distance and occlusion). This requires special processing methods: PointNet operates directly on points; VoxelNet/SECOND voxelise first; PointPillars uses vertical column (pillar) compression for efficiency.",
      hints: [
        "A camera captures all pixels in an H\\timesW grid. A LiDAR returns only points where the laser hit a surface — sparse and irregular.",
        "Point clouds have no inherent ordering — row 5, column 12 has no meaning in a LiDAR scan.",
      ],
    },
    {
      id: "q-cv-kp32-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "PointPillars (Lang et al., 2019) achieves fast LiDAR 3D detection by voxelising the point cloud into vertical pillars. What is the key efficiency advantage of pillars over full 3D voxels?",
      options: [
        "Pillars use a smaller voxel size in the xy-plane than full voxelisation, increasing spatial resolution",
        "Pillars collapse the z-dimension into a learned feature, producing a 2D pseudo-image that can be processed with a standard 2D CNN backbone — avoiding expensive 3D sparse convolutions",
        "Pillars discard ground-plane points, reducing the input point count by approximately 50% before any further processing",
        "Pillars use fixed average pooling per column, which is faster than learned PointNet aggregation",
      ],
      correctAnswer: 1,
      explanation:
        "PointPillars partitions the LiDAR point cloud into vertical columns (pillars) in the Bird's Eye View (BEV) plane. Within each pillar, a small PointNet aggregates all points into a fixed-length feature vector. The pillar features are then scattered back to a 2D BEV grid, creating a pseudo-image. A standard 2D SSD-style detection head runs on this pseudo-image. By eliminating 3D convolutions entirely, PointPillars achieves ~62 Hz inference on a single GPU — 2-4x faster than SECOND/VoxelNet — while maintaining competitive mAP on KITTI.",
      hints: [
        "VoxelNet uses 3D sparse convolutions (slow). PointPillars collapses the vertical (z) axis first, then uses 2D convolutions (fast).",
        "The output of PointPillars' encoding is a 2D BEV feature map — exactly the input a standard 2D detection head expects.",
      ],
    },
    {
      id: "q-cv-kp32-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "In autonomous driving 3D detection, the Bird's Eye View (BEV) representation is preferred over perspective view because it preserves metric scale and avoids the scale ambiguity inherent to monocular perspective projections.",
      correctAnswer: "True",
      explanation:
        "In a camera perspective image, a distant large object and a nearby small object can have identical pixel footprints — monocular depth is ambiguous without additional cues. BEV (top-down) maps derived from LiDAR or camera-based depth estimation preserve actual metric positions. Objects at different distances are not confused by scale: a pedestrian 50m away occupies a different BEV region from one 5m away. BEV also enables straightforward ego-motion integration over time. The BEV representation is the cornerstone of modern end-to-end autonomous driving stacks (BEVFusion, BEVDet).",
      hints: [
        "In perspective images, a truck at 100m can appear smaller than a bicycle at 5m. BEV encodes actual metric positions — no scale ambiguity.",
        "Think of a map vs. a photograph: a map preserves distances, a photo distorts them by perspective projection.",
      ],
    },
  ],

  // ── cv-kp-33: Medical Imaging ──────────────────────────────────────────────
  "medical-imaging-advanced": [
    {
      id: "q-cv-kp33-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Domain shift in medical imaging AI refers to what common problem?",
      options: [
        "The model overfitting to the training set because medical datasets are too small",
        "A model trained on images from one scanner, institution, or population performing significantly worse on images from a different source due to distribution differences",
        "Radiologists disagreeing on ground-truth labels, making the training signal noisy",
        "The inability of CNNs to process 3D medical volumes like CT scans without modification",
      ],
      correctAnswer: 1,
      explanation:
        "Medical images vary substantially across acquisition sites: different MRI field strengths (1.5T vs. 3T), CT reconstruction kernels, scanner manufacturers, and patient demographics create distribution shifts. A model trained on data from Hospital A may fail on Hospital B due to these shifts — even though the underlying anatomy is the same. Mitigations: domain adaptation, domain generalisation, federated learning (training across sites without sharing data), and test-time adaptation.",
      hints: [
        "A chest X-ray model trained on Siemens scanners may produce different intensity distributions than a Philips scanner — same anatomy, different pixel statistics.",
        "Domain shift is analogous to a model trained on US English performing poorly on British English — distribution mismatch, not task change.",
      ],
    },
    {
      id: "q-cv-kp33-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "Self-supervised learning (SSL) methods like SimCLR and MAE are particularly valuable in medical imaging because they can leverage large amounts of unlabelled medical images to learn useful representations before fine-tuning on scarce labelled datasets.",
      correctAnswer: "True",
      explanation:
        "Medical image annotation is expensive and slow — it requires domain expert radiologists or pathologists. SSL pre-training on large unlabelled medical image databases (CheXpert, MIMIC-CXR, or large private hospitals) produces representations that transfer well with few labelled examples. Studies (e.g., MoCo/SimCLR pre-training on radiology images) consistently show SSL representations outperform ImageNet pre-training for medical tasks, as the learned features are domain-specific rather than natural-image-specific.",
      hints: [
        "Unlabelled medical images are abundant (hospitals generate millions); labelled images are scarce (radiologist annotation bottleneck).",
        "SSL pre-training requires no labels: it learns from augmented views of the same image (contrastive) or masked patches (MAE).",
      ],
    },
    {
      id: "q-cv-kp33-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "The nnU-Net framework (Isensee et al., 2021) became a strong baseline for medical image segmentation. What is its key design principle?",
      options: [
        "It uses a fixed U-Net architecture with ResNet encoder for all medical segmentation tasks",
        "It automatically configures all architectural, pre-processing, and training hyper-parameters based on dataset fingerprinting (image spacing, size, intensity statistics), requiring no manual hyper-parameter tuning",
        "It applies dataset-specific data augmentation policies found by neural architecture search",
        "It trains an ensemble of 10 independently initialised U-Nets and averages their predictions at test time",
      ],
      correctAnswer: 1,
      explanation:
        "nnU-Net ('no-new-Net') (Isensee et al., NMI 2021) outperforms most task-specific methods without manual architecture engineering. It analyses a new dataset's fingerprint (image dimensions, voxel spacing, modality, target structure size) and automatically selects: architecture variant (2D/3D/cascade U-Net), patch size, batch size, normalisation strategy, and resampling parameters. This automated configuration has won numerous Medical Segmentation Decathlon tasks, demonstrating that engineering effort on data representation often matters more than novel architectures.",
      hints: [
        "Most segmentation papers propose new architectures. nnU-Net's insight: a well-configured baseline beats architectural novelty on most medical tasks.",
        "Dataset fingerprinting: if images are isotropic 3D, use 3D U-Net. If highly anisotropic (thin 2D slices), use 2D U-Net. All automatic.",
      ],
    },
  ],

  // ── cv-kp-34: Contrastive Vision-Language ─────────────────────────────────
  "contrastive-vision-language": [
    {
      id: "q-cv-kp34-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "CLIP (Radford et al., 2021) is trained using a contrastive objective on image-text pairs. During training, which pairs are treated as positives and which as negatives?",
      options: [
        "Positives: augmented views of the same image; negatives: images from different classes in ImageNet",
        "Positives: matching (image, caption) pairs in the batch; negatives: all other (image, caption) cross-pairings within the batch",
        "Positives: images paired with manually curated captions; negatives: images paired with automatically generated captions",
        "Positives: image-text pairs with high cosine similarity; negatives: pairs below a fixed similarity threshold",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP constructs an N-by-N similarity matrix for a batch of N (image, text) pairs. The N diagonal entries (i-th image with i-th text) are positives. All N(N-1) off-diagonal entries are negatives — the i-th image paired with every other text, and vice versa. The InfoNCE loss maximises similarity of diagonal entries relative to all negatives in both image-to-text and text-to-image directions. Using large batch sizes (N=32,768) provides abundant in-batch negatives, which is critical for the quality of learned representations.",
      hints: [
        "In a batch of N pairs, there are N correct matches (diagonal) and N squared minus N incorrect pairings (off-diagonal).",
        "Large batches are essential: more negatives = harder contrastive task = better representations.",
      ],
    },
    {
      id: "q-cv-kp34-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "ALIGN (Jia et al., 2021) demonstrated that noisy image-text pairs scraped from the web (without expensive curation) can be used effectively for contrastive vision-language pre-training when scale is sufficiently large.",
      correctAnswer: "True",
      explanation:
        "ALIGN (Google, 2021) scales contrastive image-text training to 1.8 billion noisy image-text pairs scraped from the web using only minimal frequency-based filtering — no expensive human curation. Despite the noise, the sheer scale compensates, and ALIGN matches or exceeds CLIP performance on zero-shot classification and image-text retrieval. This demonstrates a 'scale is all you need' principle for noisy web data in vision-language learning.",
      hints: [
        "CLIP used 400M carefully filtered pairs. ALIGN used 1.8B noisy pairs with minimal filtering — scale outweighs curation at sufficient size.",
        "Noise robustness at scale: individual noisy examples are outvoted by the consistent signal in billions of correctly matched pairs.",
      ],
    },
    {
      id: "q-cv-kp34-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "For zero-shot image classification with CLIP, prompt engineering (e.g., using 'a photo of a {class}' instead of just '{class}') improves performance. Why?",
      options: [
        "The extra words reduce the cosine similarity between negative pairs, sharpening the decision boundary",
        "CLIP was trained on image captions (natural sentences) rather than bare class names; prompt templates shift the text embedding distribution closer to the training distribution of actual captions",
        "Prompt templates make the text embeddings longer, giving the text encoder more tokens to compute a richer representation",
        "The phrase 'a photo of' explicitly tells the image encoder to expect a photograph rather than a painting or drawing",
      ],
      correctAnswer: 1,
      explanation:
        "CLIP's text encoder was trained on image captions from the internet, which are natural sentences ('a photo of a dog running in a park'), not bare class labels ('dog'). When doing zero-shot classification, using a prompt template that mimics this caption style (e.g., 'a photo of a {class}') shifts the text embedding into the region of the embedding space that CLIP associates with image content, improving alignment. Prompt ensembling (averaging embeddings across multiple templates) further improves results.",
      hints: [
        "CLIP never saw bare class names during training — it saw captions. Template prompts mimic caption style.",
        "Think of distribution mismatch: 'cat' as text vs. 'a photo of a cat' as text — which better matches what CLIP saw during pre-training?",
      ],
    },
  ],

  // ── cv-kp-35: Diffusion Models for Images ─────────────────────────────────
  "diffusion-models": [
    {
      id: "q-cv-kp35-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "In a Denoising Diffusion Probabilistic Model (DDPM), what is the forward process and what does the model learn to reverse?",
      options: [
        "Forward process: the model generates an image from noise; the model learns to add noise to a clean image.",
        "Forward process: a fixed Markov chain gradually adds Gaussian noise to a clean image until it becomes pure noise; the model learns a reverse denoising process to recover clean images from noisy ones.",
        "Forward process: the model encodes an image into a latent vector; the model learns to decode the latent vector back to an image.",
        "Forward process: image pixels are randomly masked; the model learns to predict the masked pixels given the unmasked context.",
      ],
      correctAnswer: 1,
      explanation:
        "DDPM (Ho et al., 2020) defines:\n\n- **Forward process**: a fixed Markov chain $q(x_t | x_{t-1})$ that incrementally adds small Gaussian noise over $T$ steps (typically $T = 1000$) until $x_T \\approx \\mathcal{N}(0, I)$.\n\n- **Reverse process**: a learned model $p_\\theta(x_{t-1} | x_t)$ (a U-Net) trained to denoise — predict and remove the noise added at each step.\n\nAt inference, sampling starts from pure Gaussian noise $x_T$ and iteratively denoises for $T$ steps to produce a clean image $x_0$. The ELBO training objective reduces to predicting the noise $\\epsilon$ added at each forward step.",
      hints: [
        "Forward process = add noise (fixed, no parameters). Reverse process = remove noise (learned U-Net).",
        "The model predicts the noise $\\epsilon$ that was added — so given noisy $x_t$, predict $\\epsilon$, subtract it to get $x_{t-1}$.",
      ],
    },
    {
      id: "q-cv-kp35-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Classifier-free guidance (Ho & Salimans, 2022) improves conditional image generation in diffusion models by doing what?",
      options: [
        "Training a separate image classifier and using its gradient to steer the diffusion process toward the target class at inference time",
        "Training the diffusion model jointly on conditional and unconditional generation (by randomly dropping condition labels), then at inference mixing the unconditional and conditional noise predictions with a guidance scale",
        "Using a CLIP model to re-rank generated images and selecting the one with the highest text-image similarity score",
        "Adding a classification loss term to the diffusion ELBO objective to force the model to learn class-discriminative features",
      ],
      correctAnswer: 1,
      explanation:
        "Classifier-free guidance (CFG, Ho & Salimans, 2022) trains a single model both with (conditional) and without (unconditional) the class/text condition — the condition is dropped with probability p_uncond during training, forcing the model to also learn unconditional generation. At inference, the noise prediction is: epsilon_guided = epsilon_uncond + w*(epsilon_cond - epsilon_uncond) where w > 1 is the guidance scale. Higher w increases fidelity/alignment but reduces diversity. CFG underpins Stable Diffusion, DALL-E 2, and Imagen.",
      hints: [
        "Classifier guidance needs a separate noisy-image classifier (hard to train). CFG bakes guidance into the diffusion model itself.",
        "The linear combination amplifies the difference between conditional and unconditional predictions — pushing generation toward the condition.",
      ],
    },
    {
      id: "q-cv-kp35-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "Latent diffusion models (LDMs), such as Stable Diffusion, perform the diffusion process in the latent space of a pre-trained VAE rather than in pixel space, making training and inference substantially faster.",
      correctAnswer: "True",
      explanation:
        "Rombach et al. (2022) showed that a VAE can compress images into a spatially smaller latent space (e.g., 512x512 pixels to 64x64 latents) while preserving perceptual quality. Running DDPM in this compressed latent space reduces compute substantially compared to pixel-space diffusion. The VAE decoder then maps the denoised latent back to pixel space. LDMs achieve competitive image quality at much lower computational cost, democratising high-resolution image generation.",
      hints: [
        "Pixel-space diffusion on 512x512 images requires the U-Net to process many pixels per step. Latent-space reduces spatial size by roughly 8x.",
        "The VAE in Stable Diffusion encodes 512x512 to 64x64x4 latents — the diffusion U-Net operates on the smaller 64x64 tensors.",
      ],
    },
  ],

  // ── cv-kp-36: Object Tracking ──────────────────────────────────────────────
  "object-tracking": [
    {
      id: "q-cv-kp36-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "SORT (Simple Online and Realtime Tracking) associates detections across frames using which two components?",
      options: [
        "A deep re-identification network to match appearance features and a graph neural network to resolve ID switches",
        "A Kalman filter to predict object positions and the Hungarian algorithm to match predicted tracks to new detections based on IoU",
        "An LSTM to model long-term motion trajectories and cosine similarity between bounding box embeddings",
        "Optical flow estimation to propagate bounding boxes frame-to-frame without any detection matching",
      ],
      correctAnswer: 1,
      explanation:
        "SORT (Bewley et al., 2016) is a classical but highly effective MOT (multi-object tracking) framework: (1) a Kalman filter models each track's state (position, velocity) and predicts its location in the next frame; (2) the Hungarian algorithm (linear assignment) matches predicted track locations to new detector bounding boxes using IoU as the cost. Despite its simplicity, SORT achieves real-time performance. Its main limitation: it lacks appearance features, so identity switches occur when objects are occluded.",
      hints: [
        "SORT = Kalman prediction (where will the object be?) + Hungarian matching (which detection matches which track?).",
        "Kalman filter = motion model; Hungarian algorithm = optimal assignment between predicted and observed boxes.",
      ],
    },
    {
      id: "q-cv-kp36-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "DeepSORT extends SORT by adding what component to reduce identity switches during occlusions?",
      options: [
        "A 3D pose estimator to predict object orientation and resolve left-right symmetry ambiguities",
        "A deep appearance embedding (re-identification CNN) that computes appearance descriptors for each detection, enabling assignment based on both IoU and appearance similarity",
        "A recurrent LSTM motion model that replaces the Kalman filter for longer-term trajectory modelling",
        "A depth estimation module that uses apparent size change to predict occlusion events before they occur",
      ],
      correctAnswer: 1,
      explanation:
        "DeepSORT (Wojke et al., 2017) adds a CNN-based appearance model: each detection is embedded into a 128-dimensional descriptor via a ReID network trained on a person re-identification dataset. When matching detections to tracks, the cost matrix combines IoU distance (motion model) with cosine distance between appearance descriptors. The appearance similarity allows re-association after long occlusions when IoU alone fails. DeepSORT is widely used for pedestrian tracking in surveillance and autonomous driving.",
      hints: [
        "SORT uses only IoU for matching. DeepSORT adds appearance similarity — 'does this detected person look like track #3?'",
        "ReID networks learn identity-preserving embeddings: the same person at different times/views maps to similar descriptors.",
      ],
    },
    {
      id: "q-cv-kp36-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Multi-object tracking (MOT) is typically evaluated using MOTA (Multiple Object Tracking Accuracy), which combines false positives, false negatives, and identity switches into a single metric.",
      correctAnswer: "True",
      explanation:
        "MOTA (Bernardin & Stiefelhagen, 2008) = 1 minus (FP + FN + IDSW) / GT, where GT is total ground-truth detections. It penalises missed detections (FN), false alarms (FP), and identity switches (IDSW). MOTA can be negative. A complementary metric, MOTP, measures localisation precision (IoU between matched tracks and ground truth). IDF1 (Ristani et al., 2016) focuses specifically on identification continuity. The MOTChallenge benchmark uses all these metrics.",
      hints: [
        "MOTA = 1 minus the sum of three error types divided by total ground-truth objects — lower errors yield higher MOTA.",
        "Identity switch: a tracker says 'that's person #2' in frame 50, then switches to 'that's person #5' in frame 51 for the same person.",
      ],
    },
  ],

  // ── cv-kp-37: Pose Estimation ──────────────────────────────────────────────
  "pose-estimation": [
    {
      id: "q-cv-kp37-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The heatmap-based approach to human pose estimation (used in Hourglass, HRNet) represents each joint as what?",
      options: [
        "A 3D bounding box around the joint with soft probability scores at each vertex",
        "A 2D Gaussian-shaped activation map centred at the joint location, with the model predicting one heatmap per keypoint",
        "A sparse set of pixel coordinates (x, y) directly regressed by a fully connected layer",
        "A graph node connected to adjacent body joints, with edge weights representing limb lengths",
      ],
      correctAnswer: 1,
      explanation:
        "Heatmap-based pose estimation (Newell et al., 2016 — Stacked Hourglass; Sun et al., 2019 — HRNet) represents each of K keypoints as a 2D Gaussian activation map of shape H-by-W. The peak location gives the keypoint coordinates; the Gaussian spread provides spatial uncertainty. L2 loss is computed between predicted and ground-truth Gaussians. This avoids the difficulty of directly regressing pixel coordinates with a linear head and produces spatially precise predictions. The final keypoint location is obtained by argmax over the heatmap.",
      hints: [
        "Heatmap = one map per joint, with a Gaussian blob centred at the true joint pixel location.",
        "Regressing (x,y) directly is hard. Predicting a spatial probability map with the peak at the joint is easier for the model.",
      ],
    },
    {
      id: "q-cv-kp37-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "OpenPose (Cao et al., 2017) introduced Part Affinity Fields (PAFs) for multi-person pose estimation. What do PAFs encode?",
      options: [
        "The probability that each pixel belongs to a particular body part (e.g., left arm, right leg)",
        "2D vector fields that encode the direction and location of limbs between body joints, enabling bottom-up grouping of keypoints to individual persons",
        "Depth offsets between different body joints to enable 3D pose estimation from a monocular image",
        "Attention weights indicating which detected keypoints the model is most confident about",
      ],
      correctAnswer: 1,
      explanation:
        "OpenPose uses a bottom-up strategy: first detect all keypoints (heatmaps) across all persons in the image, then group them into individuals. PAFs encode, for each limb (e.g., right shoulder to right elbow), a 2D unit vector field pointing from one joint to the other at pixels along the limb. During association, the dot product between the PAF direction and the vector connecting two candidate keypoints determines whether they belong to the same limb — enabling correct grouping even in crowded scenes without person bounding boxes.",
      hints: [
        "OpenPose is bottom-up: detect all joints, then connect them into skeletons. PAFs provide the connecting information.",
        "PAF at a pixel on a limb points from joint A to joint B — high dot product with the A-to-B direction confirms they are connected.",
      ],
    },
    {
      id: "q-cv-kp37-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "ViTPose (Xu et al., 2022) applies a plain Vision Transformer (ViT) backbone for human pose estimation and demonstrates that simple ViT backbones are competitive with highly engineered CNNs on COCO Keypoint Detection.",
      correctAnswer: "True",
      explanation:
        "ViTPose uses a plain ViT (no hierarchical structure, no task-specific modifications) as a pose estimation backbone, with a lightweight decoder head predicting heatmaps. It achieves state-of-the-art on COCO Keypoint Detection, outperforming HRNet and other CNN-based methods. Key findings: ViT backbones benefit from pre-training with MAE; model scalability is excellent (larger ViT = better pose). This demonstrated that transformer backbones can excel at dense prediction tasks like pose estimation.",
      hints: [
        "ViTPose uses a standard ViT with no task-specific architectural changes — just a different decoder head for heatmap prediction.",
        "ViTPose + MAE pre-training achieves state-of-the-art on COCO — showing pre-training strategy matters more than architecture engineering.",
      ],
    },
  ],

  // ── cv-kp-38: Image Segmentation Advanced ─────────────────────────────────
  "segmentation-advanced": [
    {
      id: "q-cv-kp38-1",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Mask2Former (Cheng et al., 2022) unifies semantic, instance, and panoptic segmentation in a single architecture. What is its core mechanism for producing per-segment masks?",
      options: [
        "A sliding window that classifies every NxN image patch independently into one of K semantic categories",
        "Learned mask queries that cross-attend to image features via a Transformer decoder, producing per-query binary masks and class predictions — each query corresponds to one predicted segment",
        "A separate branch for each task (semantic, instance, panoptic) with shared early encoder features",
        "A graph neural network that groups superpixels into segments using learned edge weights",
      ],
      correctAnswer: 1,
      explanation:
        "Mask2Former uses a universal architecture: a pixel decoder (multi-scale deformable attention) produces high-resolution features; a Transformer decoder with N learned queries cross-attends to these features. Each query learns to represent one segment (thing or stuff); it predicts a binary mask (via dot product with pixel features) and a class label. The same architecture handles semantic, instance, and panoptic segmentation. Masked attention restricts each query's attention to its predicted mask region, improving training efficiency.",
      hints: [
        "Think of each query as a slot that competes to represent one segment. The query cross-attends to image features to fill its slot.",
        "Masked attention = the query can only attend to pixels within its current predicted mask region — focusing the gradient signal.",
      ],
    },
    {
      id: "q-cv-kp38-2",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "The Segment Anything Model (SAM, Kirillov et al., 2023) supports which types of user prompts to specify what to segment?",
      options: [
        "Only free-form text descriptions (e.g., 'segment the red car on the left')",
        "Points (clicks), bounding boxes, and coarse masks — but not free-form text",
        "Only bounding boxes — SAM requires a bounding box around the target region",
        "Only semantic category names from a pre-defined vocabulary of 80 COCO classes",
      ],
      correctAnswer: 1,
      explanation:
        "SAM's prompt encoder accepts: (1) sparse prompts — foreground/background point clicks encoded as learned position and type embeddings, and bounding boxes; (2) dense prompts — low-resolution mask inputs (e.g., from a previous prediction). SAM does NOT natively accept text prompts. Text-prompted segmentation requires grounding the text to image regions first (e.g., Grounding DINO) before passing resulting boxes to SAM. SAM's mask decoder generates up to 3 candidate masks with confidence scores, handling ambiguous prompts.",
      hints: [
        "SAM's three prompt types: points (click here), boxes (frame this region), and masks (rough prior). No text.",
        "For text-to-segment pipelines, Grounding DINO detects the region and SAM segments it — two models in sequence.",
      ],
    },
    {
      id: "q-cv-kp38-3",
      type: "true-false",
      difficulty: "easy",
      question:
        "Panoptic segmentation assigns every pixel in an image to either a semantic category (for background 'stuff' regions like sky or road) or a specific object instance (for foreground 'thing' classes like cars or people).",
      correctAnswer: "True",
      explanation:
        "Panoptic segmentation (Kirillov et al., 2019) unifies semantic segmentation (assigning category labels to 'stuff' — amorphous regions like grass, road, sky) and instance segmentation (detecting and delineating individual 'things' — countable objects like cars, people, animals with unique instance IDs). Every pixel receives both a class label and (for 'things') an instance ID. The Panoptic Quality (PQ) metric = DQ times SQ evaluates joint performance on both stuff and thing categories.",
      hints: [
        "Stuff: background regions (sky, road, grass) — no instance distinction. Things: countable objects (car #1, car #2, person #1) — each instance is unique.",
        "Panoptic segmentation output: each pixel has a (class, instance_id) pair such as (sky, 0), (car, 1), (car, 2), (person, 3).",
      ],
    },
  ],

  // ── cv-kp-39: Visual Question Answering ───────────────────────────────────
  "visual-question-answering": [
    {
      id: "q-cv-kp39-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Early VQA models used 'early fusion' of image and text features. In the context of VQA, what does early fusion mean?",
      options: [
        "Pre-training the image encoder and text encoder jointly before task-specific fine-tuning on VQA data",
        "Concatenating or element-wise multiplying image and text feature vectors at the input or early layers, so that cross-modal interaction happens before the classification head",
        "Processing the image first with a CNN and passing its output as context to the question encoder's self-attention layers",
        "Fusing the final prediction logits from separately-trained image and text classification heads",
      ],
      correctAnswer: 1,
      explanation:
        "In early fusion VQA (the baseline of Antol et al., 2015 — VQA v1), the image (CNN global feature vector) and question (LSTM encoding) are combined immediately (e.g., concatenation or element-wise product) and fed to a classifier. Late fusion trains separate image and text streams and combines them only at prediction time (e.g., ensembling softmax outputs). Early fusion allows the combined representation to be jointly optimised for VQA, but simpler fusion operations can miss fine-grained cross-modal reasoning needed for spatial and relational questions.",
      hints: [
        "Early fusion = combine modalities early in the pipeline. Late fusion = keep modalities separate until the final prediction.",
        "Simple early fusion (concat + MLP) struggles with spatial relational questions — it lacks precise spatial reasoning over combined features.",
      ],
    },
    {
      id: "q-cv-kp39-2",
      type: "true-false",
      difficulty: "medium",
      question:
        "The VQA v2 dataset was designed to reduce language bias in VQA by balancing answer distributions, so that a model cannot achieve high accuracy on the test set by ignoring the image entirely.",
      correctAnswer: "True",
      explanation:
        "VQA v1 suffered from language priors: 'Is there a...' questions were almost always answered 'yes'; sports questions were answered 'tennis'. Goyal et al. (2017) designed VQA v2 by adding complementary image pairs — for each question, a second image is paired where the correct answer is different. This balancing ensures that question-only models (which ignore images) achieve only ~50% accuracy on balanced pairs, forcing models to actually look at the image to answer correctly.",
      hints: [
        "VQA v1 flaw: language models without seeing any image achieved ~50% accuracy by exploiting question-answer statistics.",
        "VQA v2 fix: for every (question, image, answer) triple, add (question, image', different_answer) — now language bias cannot help.",
      ],
    },
    {
      id: "q-cv-kp39-3",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "Visual grounding in VQA refers to which capability?",
      options: [
        "Training the model on ground-level (street view) images rather than aerial imagery for better scene understanding",
        "The ability of a VQA model to localise the image region relevant to answering the question, enabling interpretable attention over spatial image features",
        "Connecting a VQA model to a geographic database so it can answer location-specific questions using GPS coordinates",
        "Using grounded language models (trained on both text and visual data) as the language encoder in VQA",
      ],
      correctAnswer: 1,
      explanation:
        "Visual grounding in VQA means the model learns to attend to or localise the specific image region(s) needed to answer the question. Attention-based models (BAN, UpDown — Anderson et al., 2018) compute cross-attention between question tokens and image region features (from Faster R-CNN) to ground question tokens to relevant objects. Grounding is evaluated explicitly in benchmarks like RefCOCO (referring expression comprehension) where the model must produce a bounding box corresponding to the question's referent.",
      hints: [
        "Visual grounding: 'What color is the car?' causes the model to attend to the car region, not the background.",
        "Grounding produces interpretable models: you can visualise where the model looked when producing its answer.",
      ],
    },
  ],

  // ── cv-kp-40: Self-Supervised Visual Learning ──────────────────────────────
  "self-supervised-visual-learning": [
    {
      id: "q-cv-kp40-1",
      type: "multiple-choice",
      difficulty: "medium",
      question:
        "Masked Autoencoders (MAE, He et al., 2022) pre-train a Vision Transformer by masking patches and reconstructing them. Which masking ratio did MAE find optimal, and why is this ratio much higher than BERT's 15% masking ratio?",
      options: [
        "15% masking ratio, same as BERT, because visual and linguistic redundancy are similar",
        "75% masking ratio, because images have high spatial redundancy — nearby patches are strongly correlated — making it too easy to reconstruct masked patches from their immediate neighbours at lower masking ratios",
        "50% masking ratio, balancing the reconstruction difficulty with sufficient visible context for the encoder",
        "90% masking ratio, because ViT encoders are powerful enough to reconstruct images from only 10% of patches",
      ],
      correctAnswer: 1,
      explanation:
        "MAE uses a 75% masking ratio — far higher than BERT's 15% token masking. Images are spatially redundant: a masked patch can be trivially reconstructed from adjacent visible patches by interpolation at low masking ratios. By masking 75%, MAE forces the encoder to learn high-level semantic understanding rather than low-level texture interpolation. The MAE decoder operates only on the masked tokens (efficient), and reconstruction is in pixel space. This pre-training scales excellently with ViT-Large and ViT-Huge.",
      hints: [
        "At 15% masking, an image encoder can reconstruct patches by averaging adjacent visible patches — no semantic understanding needed.",
        "75% masking = only 25% visible patches. The model must understand object structure to reconstruct missing regions.",
      ],
    },
    {
      id: "q-cv-kp40-2",
      type: "multiple-choice",
      difficulty: "hard",
      question:
        "SimCLR (Chen et al., 2020) is a contrastive self-supervised learning method. Which two components were identified as most critical for SimCLR's strong performance?",
      options: [
        "A large momentum encoder and a memory bank of negative embeddings",
        "A non-linear projection head (MLP applied after the encoder before contrastive loss) and strong data augmentation (random cropping + colour jitter + grayscale)",
        "Asymmetric network architecture (online vs. target network) and an exponential moving average update rule",
        "Hard negative mining and a cross-entropy loss over a fixed set of cluster centroids",
      ],
      correctAnswer: 1,
      explanation:
        "SimCLR (Chen et al., 2020) showed that two components dramatically improve representation quality: (1) a non-linear projection head — a 2-layer MLP applied after the ResNet encoder before computing the NT-Xent loss. The contrastive loss is applied in projection space, preserving the encoder's representations for downstream tasks. (2) Composition of strong augmentations — random resized cropping, colour distortion, and Gaussian blur — creates hard positive pairs that force the encoder to learn invariant features. Ablating either component significantly drops downstream accuracy.",
      hints: [
        "Why a projection head? The features used for the contrastive loss are shaped by the auxiliary objective — the head absorbs this, keeping encoder features clean for transfer.",
        "Strong augmentation: two different crops of the same image look very different but must map to similar embeddings — forcing semantic invariance.",
      ],
    },
    {
      id: "q-cv-kp40-3",
      type: "true-false",
      difficulty: "medium",
      question:
        "DINO (Caron et al., 2021) applies self-supervised knowledge distillation to Vision Transformers and, without any supervision, produces CLS token features that directly perform well at nearest-neighbour image retrieval and k-NN classification.",
      correctAnswer: "True",
      explanation:
        "DINO (Self-DIstillation with NO labels) trains a student ViT to match the output distribution of a teacher ViT (exponential moving average of student). The student sees different augmented views from the teacher; the teacher's output is sharpened via a centering operation to prevent collapse. A key emergent property: DINO CLS tokens encode rich semantic features — k-NN classification on ImageNet with frozen DINO features achieves ~78% top-1 accuracy without any fine-tuning. Additionally, DINO's attention maps segment objects without supervision, revealing that ViTs learn semantic segmentation as a byproduct of self-distillation.",
      hints: [
        "DINO's k-NN classification: take frozen CLS embeddings, find 20 nearest training neighbours, majority-vote — no linear head, no fine-tuning.",
        "DINO attention maps show the model focusing on the subject and ignoring the background — emergent unsupervised segmentation.",
      ],
    },
  ],
};

const extraCV: Record<string, Question[]> = {
  "vit-deep": [
    {
      id: "q-cv-ext1-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "In Vision Transformer (ViT), an image of size 224x224 is split into 16x16 patches. How many patch tokens are passed to the transformer encoder (excluding the CLS token)?",
      options: ["112", "196", "256", "784"],
      correctAnswer: 1,
      explanation: "Number of patches = (224/16) times (224/16) = 14 times 14 = 196. Each patch is linearly projected to a D-dimensional embedding and treated as one token. Adding a CLS token gives 197 total tokens. ViT scales well because self-attention costs O(n^2) in the number of tokens, dominated by the 196 patch tokens.",
      hints: [
        "Divide each spatial dimension by the patch size: 224 / 16 = 14 patches per row and column.",
        "Total patches = 14 times 14 = 196. The CLS token is added separately and is not a patch.",
      ],
    },
    {
      id: "q-cv-ext1-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "ViT uses 1D learned positional embeddings. What limitation does this create at higher resolution, and how does the original paper address it?",
      options: [
        "Learned 1D embeddings cannot distinguish row from column positions, so 2D sinusoidal embeddings are used at fine-tuning",
        "Learned positional embeddings are trained for a fixed sequence length; when fine-tuning at higher resolution with more patches, embeddings for new positions are initialised by bicubic interpolation of the pretrained 2D position embedding grid",
        "Positional embeddings cannot generalise to non-square aspect ratios, requiring padding to square before inference",
        "1D positional embeddings require retraining from scratch whenever the patch size changes",
      ],
      correctAnswer: 1,
      explanation: "ViT positional embeddings are learned for the pretraining sequence length (e.g., 196 tokens for 224x224/16x16). At higher resolution (e.g., 384x384 giving 576 patches), the sequence is longer. The original paper interpolates the pretrained 2D positional embedding grid (14x14) bilinearly to the new grid size (24x24), allowing ViT to adapt to higher resolution without full retraining.",
      hints: [
        "Pretraining at 224x224 gives 14x14=196 positions. Fine-tuning at 384x384 gives 24x24=576 positions — new positions need embeddings.",
        "Interpolation treats the 14x14 grid as a 2D map and bilinearly upsamples it to 24x24, retaining spatial structure.",
      ],
    },
    {
      id: "q-cv-ext1-3",
      type: "true-false",
      difficulty: "easy",
      question: "ViT-B/16 and ViT-B/32 have the same number of transformer layers and embedding dimension, but differ only in patch size, which affects the number of tokens and computational cost.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "ViT-B/16 and ViT-B/32 share the same base (B) architecture: 12 transformer layers, embedding dimension 768, 12 attention heads. The only difference is the patch size: /16 creates 14x14=196 tokens; /32 creates 7x7=49 tokens. ViT-B/32 is much cheaper in self-attention cost but ViT-B/16 achieves better accuracy due to finer spatial resolution.",
      hints: [
        "The letter B in ViT-B denotes base model size — same parameters. The number after the slash is the patch size.",
        "Self-attention costs O(n^2) in tokens. 196^2=38416 vs 49^2=2401 — about 16x fewer attention operations for /32.",
      ],
    },
    {
      id: "q-cv-ext1-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Swin Transformer introduces a hierarchical design with shifted windows. What two problems of plain ViT does this hierarchy solve?",
      options: [
        "Swin uses shifted windows to reduce quadratic attention cost to linear in image size, and introduces hierarchy to produce multi-scale feature maps for dense prediction tasks like detection and segmentation",
        "Swin uses shifted windows to enable colour-aware attention and hierarchy to process variable-length sequences",
        "Swin eliminates positional embeddings by encoding position through window partitioning and adds hierarchy to process 3D medical volumes",
        "Swin uses shifted windows to handle non-square images and hierarchy to share weights across layers",
      ],
      correctAnswer: 0,
      explanation: "Plain ViT has two weaknesses for dense prediction: O(n^2) global attention is expensive for large images; and it has no multi-scale feature maps, making it incompatible with FPN-based detectors. Swin addresses both: window attention reduces each layer cost to O(n times window_size^2) which is linear in image size; the hierarchical patch merging produces 4x, 8x, 16x, 32x downsampled feature maps matching ResNet multi-scale structure.",
      hints: [
        "Dense tasks need multi-scale features. Plain ViT outputs one scale — Swin hierarchy outputs four.",
        "Window attention limits each token to attending within a local W times W window (e.g., 7x7). Shifted windows enable cross-window communication every other layer.",
      ],
    },
    {
      id: "q-cv-ext1-5",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Compared to CNNs, what inductive bias does a plain ViT lack that makes it data-hungry, and what was the solution in the original ViT paper?",
      options: [
        "ViT lacks translation equivariance and locality; the solution was to use a very large proprietary dataset (JFT-300M) for pretraining before fine-tuning on ImageNet",
        "ViT lacks depth-wise separable convolutions; the solution was to insert depthwise convolutions between transformer layers",
        "ViT lacks batch normalisation; the solution was to replace LayerNorm with BatchNorm in all transformer blocks",
        "ViT lacks max-pooling for downsampling; the solution was to use strided convolutions for patch projection",
      ],
      correctAnswer: 0,
      explanation: "CNNs encode translation equivariance (same filter at every position) and locality (small receptive field grows gradually) — powerful priors for natural images that reduce sample complexity. ViT has neither: each patch attends globally from layer 1, and there is no weight sharing across positions. The original paper showed excellent performance only after pretraining on JFT-300M (300M images), not when trained from scratch on ImageNet-1k alone.",
      hints: [
        "CNNs learn translation equivariance for free via weight sharing; ViT must learn it from data, requiring more examples.",
        "ViT trained on ImageNet-21k or JFT-300M matches CNNs on ImageNet-1k, but training from scratch on ImageNet-1k fails.",
      ],
    },
  ],

  "threed-vision": [
    {
      id: "q-cv-ext2-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "NeRF (Neural Radiance Field) represents a 3D scene as a continuous function. What are the inputs and outputs of the NeRF MLP?",
      options: [
        "Input: a 2D image patch; Output: 3D point cloud of the scene",
        "Input: a 3D point (x,y,z) and viewing direction (theta, phi); Output: RGB colour and volume density sigma at that point",
        "Input: a depth map from a stereo camera; Output: a full 3D mesh of the scene surface",
        "Input: a sequence of video frames; Output: camera poses and a dense point cloud via structure-from-motion",
      ],
      correctAnswer: 1,
      explanation: "NeRF (Mildenhall et al., 2020) maps a 5D input (3D position x,y,z and 2D viewing direction theta,phi) to 4D output (RGB colour and volume density sigma) via an MLP with positional encoding. Volume rendering composites colours along rays to produce 2D images. Training requires multi-view images with known camera poses; inference renders novel views by marching rays through the volume.",
      hints: [
        "NeRF is a continuous implicit representation — no explicit mesh or voxel grid. The scene is stored in MLP weights.",
        "Volume rendering integrates colour and density along each pixel ray. Points with high density contribute more to the final pixel colour.",
      ],
    },
    {
      id: "q-cv-ext2-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Stereo depth estimation computes depth from two horizontally offset cameras. For baseline B, focal length f, and disparity d (pixel offset between matched points), depth Z equals which expression?",
      options: [
        "Z = d * f / B",
        "Z = B * f / d",
        "Z = B * d / f",
        "Z = f / (B * d)",
      ],
      correctAnswer: 1,
      explanation: "By similar triangles in the stereo geometry: Z = B * f / d. Larger baseline B or longer focal length f gives more depth resolution; larger disparity d means the object is closer (smaller depth). Doubling the baseline B doubles the depth resolution. Disparity d is computed by finding matching pixels between left and right rectified images.",
      hints: [
        "Closer objects have larger disparity (they appear further apart in the two images). Z is inversely proportional to d.",
        "Doubling the baseline B doubles the depth range — stereo cameras for autonomous driving use baselines of 0.5 to 1.5 metres.",
      ],
    },
    {
      id: "q-cv-ext2-3",
      type: "true-false",
      difficulty: "medium",
      question: "Monocular depth estimation can recover the true metric scale of a scene without any additional calibration or reference, because a single camera contains sufficient geometric information.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Monocular depth estimation is fundamentally scale-ambiguous: a scene at twice the depth with twice the object sizes produces an identical image. Monocular methods (MiDaS, DPT, Depth Anything) predict relative or affine-invariant depth, not metric depth. To obtain true metric scale, additional information is required: camera intrinsics plus known object sizes, stereo, LiDAR supervision, or IMU data.",
      hints: [
        "A tiny room and a giant room can look identical in a photo if proportions are the same — the camera cannot tell them apart.",
        "MiDaS and DPT produce affine-invariant depth — the absolute scale and offset are undefined without a reference.",
      ],
    },
    {
      id: "q-cv-ext2-4",
      type: "multiple-choice",
      difficulty: "medium",
      question: "PointNet (Qi et al., 2017) processes 3D point clouds directly. What key architectural choice makes PointNet invariant to the order in which points are provided?",
      options: [
        "PointNet sorts points by x-coordinate before processing, creating a canonical ordering",
        "PointNet applies a shared MLP to each point independently, then aggregates all point features using a symmetric function (global max pooling), which is invariant to input permutation",
        "PointNet converts point clouds to a regular voxel grid and applies 3D convolutions",
        "PointNet uses a graph neural network where each node is connected to its k nearest neighbours, making the computation order-invariant",
      ],
      correctAnswer: 1,
      explanation: "Point clouds have no natural ordering. PointNet handles this by (1) applying a shared MLP to each point independently (permutation equivariant), then (2) applying global max pooling to aggregate all point features into a single global descriptor (permutation invariant). T-Net transformations align point clouds to a canonical space. PointNet++ extends PointNet with hierarchical grouping.",
      hints: [
        "Max pooling over a set: max(a, b, c) = max(b, a, c) = max(c, a, b). The order of elements does not change the maximum.",
        "PointNet: per-point MLP (no information sharing between points) then global max pool then global feature for classification.",
      ],
    },
    {
      id: "q-cv-ext2-5",
      type: "true-false",
      difficulty: "easy",
      question: "Occupancy networks represent 3D surfaces as the decision boundary of a neural network classifying 3D points as inside or outside the object, enabling continuous surface representation at arbitrary resolution.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Occupancy networks (Mescheder et al., 2019) learn a function f_theta mapping 3D points and a latent code to occupancy probability in [0,1]. The 3D surface is the iso-surface where occupancy = 0.5, extracted via Marching Cubes. Unlike explicit meshes (fixed connectivity) or voxels (fixed resolution), occupancy networks represent continuous surfaces and can handle complex topologies.",
      hints: [
        "The surface is implicitly defined as the 0.5 occupancy level-set — points inside have high occupancy, outside have low.",
        "Neural implicit representations (NeRF, occupancy nets, SDFs) represent scenes without discrete structure, enabling unlimited resolution.",
      ],
    },
    {
      id: "q-cv-ext2-6",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Instant-NGP (Muller et al., 2022) dramatically accelerates NeRF training from days to seconds. What is the key data structure it uses instead of a plain MLP?",
      options: [
        "A convolutional encoder that caches feature maps for each training view",
        "A multi-resolution hash grid that stores trainable feature vectors at grid vertices, enabling fast bilinear interpolation of spatial features without the slow positional encoding forward pass",
        "A sparse octree that subdivides space adaptively based on scene density",
        "A transformer with cross-attention over all training views simultaneously",
      ],
      correctAnswer: 1,
      explanation: "Instant-NGP replaces NeRF slow positional encoding plus large MLP with a multi-resolution hash table: L resolution levels each mapping 3D positions to feature vectors via hashing. Bilinear interpolation between hash table entries provides smooth spatial features. A tiny MLP decodes these features to colour and density. The hash table is much faster to query than evaluating a large MLP, enabling convergence in seconds.",
      hints: [
        "The hash table stores features at spatial grid vertices at multiple resolutions — fast O(1) lookup vs. slow MLP forward pass.",
        "Multi-resolution: coarse grid captures global scene structure; fine grid captures local detail. Features are interpolated and concatenated.",
      ],
    },
  ],

  "video-understanding-ext": [
    {
      id: "q-cv-ext3-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "RAFT (Recurrent All-Pairs Field Transforms, Teed and Deng, 2020) achieves state-of-the-art optical flow estimation. What is its core computational mechanism?",
      options: [
        "It applies a U-Net to stacked RGB frame pairs and regresses flow vectors directly with L1 loss",
        "It builds an all-pairs correlation volume between all pairs of feature pixels, then iteratively updates a flow field using a convolutional GRU that looks up correlations at the current flow estimate",
        "It uses self-supervised contrastive learning on frame pairs without ground-truth flow supervision",
        "It trains a transformer to predict per-pixel displacement by attending to a fixed 7x7 search window in the second frame",
      ],
      correctAnswer: 1,
      explanation: "RAFT extracts features from both frames with a shared encoder, computes a 4D cost volume correlating all pairs of feature pixels, then uses an iterative ConvGRU update operator that refines the flow field for 12-32 iterations, each time looking up correlation values at positions shifted by the current flow estimate. This recurrent refinement achieves robust flow estimation even for large displacements.",
      hints: [
        "The all-pairs correlation: for every pixel in frame 1, compare its features against ALL pixels in frame 2, building a 4D tensor.",
        "Iterative refinement: start with zero flow, look up correlations at current estimate, predict a flow delta, repeat 12-32 times.",
      ],
    },
    {
      id: "q-cv-ext3-2",
      type: "true-false",
      difficulty: "medium",
      question: "Video Vision Transformers (ViViT) can treat video as a 3D sequence of spatiotemporal tokens by factorising attention separately over spatial and temporal dimensions, reducing the cost of full spatiotemporal self-attention.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "ViViT (Arnab et al., 2021) proposes factorised attention strategies. In the factorised encoder model, temporal self-attention is applied first across all tokens at each timestep, then spatial self-attention is applied within each frame. This reduces the quadratic cost of full 3D attention from O((T*S)^2) to O(T^2*S + T*S^2), making video transformers tractable for longer clips.",
      hints: [
        "Full spatiotemporal attention over T frames of S patches: O((T*S)^2). Factorised: O(T^2*S + T*S^2).",
        "TimeSformer similarly factorises: first temporal attention (one spatial position, all frames), then spatial attention (one frame, all positions).",
      ],
    },
    {
      id: "q-cv-ext3-3",
      type: "multiple-choice",
      difficulty: "hard",
      question: "A model pretrained on Kinetics-700 typically achieves better downstream fine-grained action recognition than one pretrained on Kinetics-400. What is the primary reason?",
      options: [
        "K700 uses higher video resolution (1080p vs 720p in K400)",
        "K700 contains 700 action categories with more diverse action types and more training clips, providing richer representation coverage and better generalisation as a pretraining source",
        "K700 videos are longer (30 seconds vs 10 seconds in K400), providing more temporal context",
        "K700 uses a different train-test split methodology that reduces label noise",
      ],
      correctAnswer: 1,
      explanation: "Kinetics-700 has approximately 500K clips across 700 action categories versus approximately 250K clips across 400 categories in K400. More diverse action coverage means the pretrained model learns a wider vocabulary of motion patterns. When fine-tuning on fine-grained action tasks (e.g., FineGym, Diving48), K700-pretrained models transfer better because the broader pretraining distribution covers motion patterns absent in K400.",
      hints: [
        "Pretraining coverage matters: K700 has 75% more action categories and 100% more clips than K400.",
        "Fine-grained actions are more likely to be covered by K700 broader category space.",
      ],
    },
    {
      id: "q-cv-ext3-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the key difference between short-term and long-term temporal modelling in video understanding?",
      options: [
        "Short-term modelling handles videos under 1 minute; long-term modelling handles videos over 1 minute",
        "Short-term modelling captures local motion and action dynamics within a few frames; long-term modelling captures narrative structure, scene transitions, and temporal dependencies over many seconds or minutes",
        "Short-term modelling uses optical flow; long-term modelling uses RGB frames",
        "Short-term modelling requires a GPU; long-term modelling can run on a CPU due to reduced frame rate",
      ],
      correctAnswer: 1,
      explanation: "Short-term modelling (C3D, I3D, SlowFast) processes clips of 8-64 frames to capture local motion patterns. Long-term modelling (Video BERT, VideoCLIP, long-form video transformers) must capture dependencies over many minutes, for example understanding that a cooking video has preparation, cooking, and plating phases. Long-term modelling is significantly harder due to memory constraints.",
      hints: [
        "Short-term: recognising a punch takes 0.5 seconds (~15 frames). Long-term: understanding a movie scene requires minutes of context.",
        "Long-form video models often sample frames at very low frame rates or use hierarchical encoders to process minutes economically.",
      ],
    },
    {
      id: "q-cv-ext3-5",
      type: "true-false",
      difficulty: "easy",
      question: "The Lucas-Kanade optical flow method assumes that the flow vector is constant within a small local patch of pixels, making it best suited for small displacements and typically applied at keypoint locations rather than densely.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "Lucas-Kanade assumes the optical flow vector (u, v) is constant within a small neighbourhood window W around each pixel. This over-determined system (one equation per pixel in W, two unknowns) is solved via least squares. The constant-flow assumption fails for large displacements or at object boundaries. Lucas-Kanade is typically sparse (applied at Harris corner keypoints) and used in a coarse-to-fine pyramid to handle larger displacements.",
      hints: [
        "Lucas-Kanade solves: sum over W of (Ix*u + Iy*v + It)^2. The small neighbourhood is where flow is assumed constant.",
        "A pyramid scheme applies LK at multiple scales: large displacements become small at coarser scales where LK succeeds.",
      ],
    },
  ],

  "cv-foundation-models-ext": [
    {
      id: "q-cv-ext4-1",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Grounding DINO enables open-set object detection. How does it allow detecting arbitrary object categories not seen during training?",
      options: [
        "It generates synthetic training images for novel categories using a diffusion model",
        "It fuses a BERT-like text encoder with the visual backbone, encoding category names as text queries that attend to image features via cross-modal attention, allowing detection of any category described in natural language",
        "It stores a codebook of all possible object categories as a lookup table and matches image regions to codebook entries",
        "It uses few-shot in-context learning to adapt to new categories from a single exemplar image",
      ],
      correctAnswer: 1,
      explanation: "Grounding DINO (Liu et al., 2023) follows the GLIP approach: text and image modalities are fused via a feature enhancer that performs cross-modal attention between the text token sequence (encoded from category names or free-text descriptions) and the image feature maps. At inference, any text query can be used — the model has learned text-vision alignment that generalises to novel categories described in language, enabling open-vocabulary detection without per-category training.",
      hints: [
        "Closed-set detectors learn fixed category embeddings (e.g., 80 COCO classes). Grounding DINO replaces these with dynamic text embeddings.",
        "At inference, describe what to detect in text — the model cross-attends text to image and finds matching regions.",
      ],
    },
    {
      id: "q-cv-ext4-2",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Geirhos et al. showed ImageNet-trained CNNs are strongly texture-biased. How does CLIP training partially mitigate this compared to supervised CNNs?",
      options: [
        "CNNs rely on textures; CLIP relies on shapes because text descriptions refer to shapes, not textures",
        "CNNs trained on ImageNet are strongly texture-biased; CLIP, trained on diverse web image-text pairs where text describes objects semantically rather than texturally, develops a more balanced texture-shape bias than supervised CNNs",
        "CLIP has exactly the same texture bias as CNN because its image encoder uses the same data augmentations",
        "CLIP eliminates texture bias entirely by applying random stylization augmentation during contrastive pre-training",
      ],
      correctAnswer: 1,
      explanation: "Geirhos et al. (2019) showed ImageNet-trained CNNs are strongly texture-biased (a cat with elephant-skin texture is classified as elephant). CLIP text supervision introduces semantic descriptions that describe object identity, providing a weak shape-biasing signal. Studies show CLIP has reduced texture bias compared to supervised CNNs but is not fully shape-biased. Web captions describing function and identity implicitly favour semantic (shape-based) features over surface statistics (textures).",
      hints: [
        "Text captions describe objects semantically not texturally — this biases the visual encoder toward semantic features.",
        "Stylization-based training directly enforces shape bias; CLIP benefit is indirect via semantic supervision.",
      ],
    },
    {
      id: "q-cv-ext4-3",
      type: "true-false",
      difficulty: "medium",
      question: "SAM 2 (Segment Anything Model 2) extends SAM to video by introducing a streaming memory architecture that propagates segmentation masks from prompted frames to all other frames in the video.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "SAM 2 (Ravi et al., 2024) extends the image-based SAM to video by adding a memory attention module that caches object features from past frames and object pointers (compact object memory). The model streams through the video, and the memory bank guides propagation of the user-prompted segmentation mask across frames without requiring the user to re-prompt each frame. The same model handles both image and video segmentation.",
      hints: [
        "SAM 2 adds memory encoder and memory attention on top of SAM image encoder, prompt encoder, and mask decoder.",
        "Once a user prompts an object in frame 0, SAM 2 propagates the mask bidirectionally through all video frames.",
      ],
    },
    {
      id: "q-cv-ext4-4",
      type: "multiple-choice",
      difficulty: "easy",
      question: "What is the primary advantage of using foundation models like CLIP or DINOv2 as feature extractors for downstream CV tasks compared to training task-specific models from scratch?",
      options: [
        "Foundation models have fewer parameters, making downstream fine-tuning faster",
        "Foundation models encode rich visual semantics learned from millions or billions of images, enabling excellent performance on downstream tasks with very few labelled examples (few-shot) or even without fine-tuning (zero-shot)",
        "Foundation models are always more accurate than task-specific models trained on the full downstream dataset",
        "Foundation models eliminate the need for any data collection for downstream tasks",
      ],
      correctAnswer: 1,
      explanation: "Foundation models (CLIP, DINOv2, DINO, MAE-ViT) are pretrained on massive datasets and encode rich, general-purpose visual representations. A linear probe on frozen DINOv2 features achieves 86% ImageNet top-1 accuracy; CLIP enables zero-shot classification without any downstream labelled data. The key advantage is sample efficiency — excellent performance with minimal labelled downstream data.",
      hints: [
        "DINOv2 frozen features: linear probe on ImageNet gives 86% top-1 — no fine-tuning of the backbone needed.",
        "CLIP zero-shot: no downstream labels at all — just text descriptions of target classes.",
      ],
    },
    {
      id: "q-cv-ext4-5",
      type: "multiple-choice",
      difficulty: "hard",
      question: "DINO-pretrained ViTs produce patch-level features that enable unsupervised segmentation. What emergent property allows this without any segmentation supervision?",
      options: [
        "DINO explicitly trains the model to produce segmentation masks as a secondary output alongside the self-distillation loss",
        "The student-teacher training objective encourages the CLS token to aggregate global semantic information, while patch tokens develop semantically meaningful features enabling segmentation via self-attention map thresholding or k-NN clustering of patch features",
        "DINO applies contrastive loss between patch tokens of different images, forcing patch-level discriminative features that directly correspond to semantic segments",
        "DINO uses masked image modelling at the patch level, training each patch to predict its true label from the ImageNet-21k vocabulary",
      ],
      correctAnswer: 1,
      explanation: "DINO trains the CLS token of a student ViT to match the teacher ViT CLS token output distribution. An emergent property: the self-attention maps of the last transformer layer CLS token query show high attention on foreground objects and low attention on background — without any segmentation supervision. This occurs because the CLS token must aggregate all semantically relevant information for the distillation objective, and the most relevant information is the object.",
      hints: [
        "Visualise the CLS-token self-attention maps from DINO last layer — they show the model attending to the object, ignoring background.",
        "DINO emergent segmentation: no labels, no training, just thresholding the self-attention map of the CLS token.",
      ],
    },
  ],

  "nerf-and-depth": [
    {
      id: "q-cv-ext5-1",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Deformable DETR addresses the slow convergence of vanilla DETR by replacing dense self-attention over all image patches with deformable attention. What does deformable attention do?",
      options: [
        "It applies attention only to the top-K highest-scoring image patches, reducing the attention matrix from n^2 to n*K",
        "Each query attends to a small set of learned key sampling points (not all image tokens), iteratively refining reference points around object locations, reducing attention cost from O(n^2) to O(n*K) where K is the number of sampling points (e.g., 4)",
        "It replaces softmax attention with linear attention, enabling O(n) computation for all query-key pairs simultaneously",
        "It applies attention at multiple image scales simultaneously using a fixed 3x3 grid of sampling points per scale",
      ],
      correctAnswer: 1,
      explanation: "Vanilla DETR computes full cross-attention between all N_q decoder queries and all HW/P^2 encoder tokens — O(N_q * HW) cost. Deformable DETR (Zhu et al., 2021) replaces this with deformable attention: each query attends to K=4 sampling points around a reference point, selected via predicted offsets. Cost: O(N_q * K * num_scales). The reference points are refined iteratively across decoder layers, focusing attention on relevant image regions. This reduces convergence from 500 epochs to 50 epochs.",
      hints: [
        "Vanilla DETR: each of N_q queries attends to ALL HW encoder tokens. Deformable: each query attends to K=4 points only.",
        "The K sampling points are predicted as offsets from a reference point — they adaptively focus on relevant image regions.",
      ],
    },
    {
      id: "q-cv-ext5-2",
      type: "true-false",
      difficulty: "easy",
      question: "Depth estimation from a single RGB image is an ill-posed problem because the mapping from 3D to 2D loses depth information irreversibly, requiring learned statistical priors to produce plausible estimates.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "The perspective projection from 3D world to 2D image is a many-to-one mapping: infinitely many 3D scenes project to the same 2D image. This makes monocular depth estimation fundamentally ill-posed — there is no unique correct answer given only a single image. Deep networks learn statistical priors from large training datasets to disambiguate depth from monocular cues (object size, atmospheric perspective, texture gradients, occlusion), but cannot recover true metric depth without additional constraints.",
      hints: [
        "A small nearby object and a large far object can produce identical image projections — depth cannot be uniquely determined from one view.",
        "Monocular depth networks learn scene statistics: objects like cars and doors have known sizes that serve as implicit depth cues.",
      ],
    },
    {
      id: "q-cv-ext5-3",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Depth Anything V2 achieves strong zero-shot monocular depth estimation. What training strategy enables it to generalise across diverse scenes and domains?",
      options: [
        "Supervised training exclusively on LiDAR-annotated datasets (KITTI, NYU Depth) with data augmentation",
        "Pretraining on a large synthetic dataset with perfect ground-truth depth, then fine-tuning on a curated real-image dataset annotated with pseudo-labels generated from a teacher model, combining synthetic precision with real diversity",
        "Self-supervised training on video sequences using photometric consistency loss between adjacent frames without any ground-truth depth labels",
        "Training on a mixture of stereo image pairs and sparse LiDAR scans, using sparse-to-dense propagation to generate dense depth maps",
      ],
      correctAnswer: 1,
      explanation: "Depth Anything V2 (Yang et al., 2024) uses a two-stage approach: (1) train a teacher model on large-scale synthetic datasets (Hypersim, VKITTI, etc.) with perfect pixel-level depth annotations — these provide precision; (2) use the teacher to generate pseudo-labels for a massive real-image dataset, then train the student on both synthetic and pseudo-labelled real data. The key insight is that synthetic data provides accurate depth labels while real data provides visual diversity.",
      hints: [
        "Synthetic datasets have perfect depth labels but limited visual diversity. Real images have high visual diversity but sparse or no depth labels.",
        "Pseudo-labelling: use a well-trained teacher to label unlabelled real images, then train student on these labels — a form of semi-supervised learning.",
      ],
    },
    {
      id: "q-cv-ext5-4",
      type: "multiple-choice",
      difficulty: "hard",
      question: "Gaussian Splatting (Kerbl et al., 2023) is an alternative to NeRF for novel view synthesis. What is the core representation it uses and its primary advantage?",
      options: [
        "It uses a neural network to store density and colour at each voxel of a uniform grid, enabling fast GPU-parallel rendering",
        "It represents the scene as a set of 3D Gaussian primitives with learned position, covariance (shape), opacity, and spherical harmonic colour coefficients, enabling real-time rendering via differentiable rasterization of sorted Gaussians",
        "It represents the scene as a triangle mesh with learned texture maps, rendered with standard rasterization hardware",
        "It uses a hash-encoded NeRF stored in a sparse octree, enabling real-time rendering via early ray termination at occupied voxels",
      ],
      correctAnswer: 1,
      explanation: "3D Gaussian Splatting (3DGS) represents scenes as millions of 3D Gaussians, each with learned centre (x,y,z), covariance matrix (encodes shape and orientation), opacity, and spherical harmonic coefficients (view-dependent colour). Rendering projects (splats) each Gaussian onto the image plane as a 2D Gaussian and blends them front-to-back. Because rendering is a differentiable rasterisation operation (not volumetric ray marching), it achieves real-time rates of 30-100 FPS at 1080p — far faster than NeRF-based methods.",
      hints: [
        "NeRF rendering: march rays through a volume, evaluating MLP at hundreds of points per ray — slow. 3DGS: splat each Gaussian onto screen and blend — fast.",
        "3DGS is initialised from a sparse point cloud (from SfM), then learns Gaussian parameters via gradient descent to minimise photometric loss.",
      ],
    },
    {
      id: "q-cv-ext5-5",
      type: "true-false",
      difficulty: "medium",
      question: "In structure-from-motion (SfM), COLMAP recovers 3D scene structure and camera poses simultaneously from a set of unordered 2D images without any prior knowledge of camera positions.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "COLMAP (Schonberger and Frahm, 2016) is a feature-based SfM pipeline that (1) detects SIFT features in all images, (2) matches features across image pairs, (3) estimates essential/fundamental matrices between matched pairs, (4) incrementally reconstructs 3D points and camera poses through bundle adjustment. It requires no prior camera pose information — camera positions, orientations, and intrinsics are all estimated from image content alone. COLMAP is the standard preprocessing step for NeRF and 3DGS pipelines.",
      hints: [
        "SfM: given 2D images with no metadata, recover 3D structure of the scene AND camera positions simultaneously.",
        "COLMAP output: a sparse 3D point cloud and estimated camera poses (intrinsics + extrinsics) for all input images — used as NeRF input.",
      ],
    },
    {
      id: "q-cv-ext5-6",
      type: "multiple-choice",
      difficulty: "medium",
      question: "Dense Prediction Transformer (DPT, Ranftl et al., 2021) achieves strong monocular depth estimation by using a ViT backbone. What is the key advantage of DPT decoder over a standard convolutional decoder?",
      options: [
        "DPT decoder uses transposed convolutions that are faster than bilinear upsampling at matching resolutions",
        "DPT assembles tokens from multiple ViT stages into image-like feature maps at different resolutions via learned projections, then progressively fuses and upsamples them — enabling the decoder to access both fine-grained local features and global context from early ViT layers",
        "DPT decoder applies cross-attention between the depth map and the input image, refining depth boundaries",
        "DPT decoder uses a recurrent LSTM to propagate depth estimates from the top-left corner to the bottom-right corner of the image",
      ],
      correctAnswer: 1,
      explanation: "DPT (Dense Prediction Transformer) treats ViT like a convolutional encoder: it extracts tokens from multiple transformer layers (e.g., layers 3, 6, 9, 12) and projects them back to spatial feature maps at different resolutions via learned readout operations. These multi-scale features are then fused progressively in a U-Net-style decoder to produce a dense depth map. Unlike CNNs (limited receptive field at early layers), all ViT tokens have global context from layer 1, enabling more accurate depth boundaries.",
      hints: [
        "DPT taps into ViT at multiple layer depths — earlier layers for spatial detail, later layers for semantic context.",
        "ViT tokens have global context at every layer (full self-attention) — unlike CNN early layers which only see local neighbourhoods.",
      ],
    },
    {
      id: "q-cv-ext5-7",
      type: "true-false",
      difficulty: "easy",
      question: "A point cloud captured by a LiDAR sensor is typically much sparser than a depth image captured by an RGB-D camera at the same distance, because LiDAR returns only one point per emitted laser beam rather than a dense pixel grid.",
      options: ["True", "False"],
      correctAnswer: "True",
      explanation: "A 64-channel spinning LiDAR generates approximately 1.3 million 3D points per second — but spread over a 360-degree field of view and 80m range, the resulting BEV occupancy is sparse. An RGB-D camera (e.g., Intel RealSense) produces a dense depth image aligned to the RGB sensor — typically 640x480 = 307K depth pixels per frame at close range (0.1-10m). LiDAR point clouds are inherently sparse and irregular; RGB-D depth maps are dense and structured.",
      hints: [
        "LiDAR: one 3D point per laser beam, emitted in all directions. Sparse but long-range. RGB-D: one depth value per pixel. Dense but short-range.",
        "Autonomous driving uses LiDAR (long range, sparse) plus cameras. Indoor robotics often uses RGB-D (dense, short-range).",
      ],
    },
    {
      id: "q-cv-ext5-8",
      type: "multiple-choice",
      difficulty: "hard",
      question: "In autonomous driving, camera-based BEV perception methods (BEVDet, BEVFormer) aim to replicate LiDAR-based BEV representations from camera images. What is the core technical challenge these methods must solve?",
      options: [
        "Aligning the temporal dimension between cameras with different exposure times and frame rates",
        "Lifting 2D perspective-view camera features to 3D BEV space — transforming from image plane coordinates to top-down metric coordinates — without ground-truth depth, using learned depth prediction or geometry-based projections",
        "Handling the fisheye distortion from wide-angle automotive cameras, which requires special projection models",
        "Synchronising multiple cameras mounted at different heights and angles into a common ego-vehicle coordinate frame",
      ],
      correctAnswer: 1,
      explanation: "Camera images are in perspective-view (2D image coordinates); BEV representation is in top-down metric space (x,y in metres). To lift camera features to BEV, methods must predict depth for each image feature (BEVDet: per-pixel depth prediction then voxel projection) or use cross-attention from BEV queries to image features with implicit geometry (BEVFormer: deformable attention from BEV grid queries to multi-camera image features). Without accurate depth, lifted features are smeared along rays rather than placed at correct 3D positions.",
      hints: [
        "Perspective projection collapses depth dimension: a camera pixel could correspond to any 3D point along a ray. BEV requires knowing where in 3D space each feature lies.",
        "BEVFormer uses temporal attention over past BEV states to improve current-frame BEV estimation — aligning features over time in BEV space.",
      ],
    },
    {
      id: "q-cv-ext5-9",
      type: "multiple-choice",
      difficulty: "medium",
      question: "CLIP achieves state-of-the-art zero-shot transfer to many image classification benchmarks but often underperforms on fine-grained classification tasks (e.g., differentiating bird species). What is the main reason?",
      options: [
        "CLIP text encoder cannot handle long class names used in fine-grained datasets",
        "CLIP training data (web-scraped image-text pairs) contains far fewer examples of fine-grained distinctions (e.g., Ruby-throated Hummingbird vs Anna Hummingbird) than coarse categories (e.g., bird), so the shared embedding space is less discriminative for subtle inter-class differences",
        "CLIP uses a smaller image encoder than models specifically trained for fine-grained classification",
        "Fine-grained classification requires spatial attention to specific image regions, which CLIP cannot perform because it uses a global CLS token for image representation",
      ],
      correctAnswer: 1,
      explanation: "CLIP is pretrained on massive web data where coarse descriptions predominate ('a photo of a bird'). Fine-grained distinctions (subtle colour patterns, beak shapes distinguishing 200 bird species) rarely appear in natural web captions. As a result, CLIP visual features are not sufficiently discriminative in the embedding subspace for fine-grained categories. Specialised models (BioCLIP trained on iNaturalist data) significantly outperform CLIP on such tasks, reflecting the distribution mismatch between CLIP pretraining and fine-grained evaluation benchmarks.",
      hints: [
        "CUB-200 (200 bird species): CLIP achieves 65% top-1. Supervised models trained on CUB-200 achieve 90%+ — a large gap.",
        "Web captions say 'a hummingbird' — not 'a Ruby-throated Hummingbird with iridescent red throat patch'. Fine-grained labels are absent.",
      ],
    },
  ],
};
Object.assign(questions, extraCV);

registerQuestions(questions);
export default questions;
