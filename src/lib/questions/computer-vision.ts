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
        "Each additional bit doubles the number of representable values. An 8-bit image stores $2^8 = 256$ levels, and a 16-bit image stores $2^{16}$ levels.\n\n**Step 1.** Recall the formula for the number of levels in an $n$-bit image:\n\\[\n\\text{levels} = 2^n.\n\\]\n\n**Step 2.** Substitute $n = 16$:\n\\[\n2^{16} = 65536.\n\\]\n\n**Step 3.** Verify: $2^{16} = 2 \\times 2^{15} = 2 \\times 32768 = 65536$, confirming approximately $2 \\times 32768 = 65536$ distinct levels. This enables finer precision in medical imaging and HDR photography compared to the 256 levels of an 8-bit image.",
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
        "Histogram equalisation applies a transform that maps each input intensity to the corresponding cumulative distribution function value scaled to the full output range.\n\n**Step 1.** Recall the histogram equalisation formula:\n\\[\nT(r) = \\left\\lfloor (L-1) \\cdot \\text{CDF}(r) \\right\\rceil,\n\\]\nwhere $L = 256$ is the number of possible output levels and $\\text{CDF}(r)$ is the cumulative distribution function value at intensity $r$.\n\n**Step 2.** Substitute the given values $L = 256$, $\\text{CDF}(128) = 0.6$:\n\\[\nT(128) = \\left\\lfloor 255 \\times 0.6 \\right\\rceil = \\left\\lfloor 153.0 \\right\\rceil = 153.\n\\]\n\n**Step 3.** Note that the maximum output value is $L - 1 = 255$, not 256. The transform stretches the intensity range so the output histogram approximates a uniform distribution.",
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
        "Each pixel has 3 channels (R, G, B), each stored as 8 bits $= 1$ byte.\n\n**Step 1.** Compute the total byte count:\n\\[\n\\text{Total bytes} = 1920 \\times 1080 \\times 3 \\times 1 = 6{,}220{,}800 \\text{ bytes}.\n\\]\n\n**Step 2.** Convert bytes to megabytes. Since $1 \\text{ MB} = 2^{20} = 1{,}048{,}576$ bytes:\n\\[\n\\frac{6{,}220{,}800}{1{,}048{,}576} \\approx 5.93 \\approx 6.2 \\text{ MB}.\n\\]\n\n**Step 3.** Note that JPEG compression typically achieves 10–20$\\times$ reduction, making it essential for storing and transmitting photographs.",
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
        "Substitute the given values into the output size formula.\n\n**Step 1.** Identify each parameter: $W = 7$, $F = 3$, $P = 0$, and $S = 2$.\n\n**Step 2.** Compute the numerator and divide by the stride:\n\\[\n\\left\\lfloor \\frac{7 - 3 + 2 \\cdot 0}{2} \\right\\rfloor + 1 = \\left\\lfloor \\frac{4}{2} \\right\\rfloor + 1 = 2 + 1 = 3.\n\\]\n\n**Step 3.** The output is $3 \\times 3$. Here $W$ is the input size, $F$ is the filter size, $P$ is the padding, and $S$ is the stride.",
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
        "$576$ ($3 \\times 3 \\times 64$?)",
        "$18432$ ($3 \\times 3 \\times 32 \\times 64$)",
        "$18496$ ($3 \\times 3 \\times 32 \\times 64 + 64$)",
        "$36928$ ($3 \\times 3 \\times 32 \\times 64 \\times 2$)?",
      ],
      correctAnswer: 2,
      explanation:
        "Each filter's parameter count depends on the input channel depth.\n\n**Step 1.** Compute weights per filter. Each filter has shape $3 \\times 3 \\times 32$ (height $\\times$ width $\\times$ input channels):\n\\[\n3 \\times 3 \\times 32 = 288 \\text{ weights per filter}.\n\\]\n\n**Step 2.** Add the bias. Total per filter $= 288 + 1 = 289$ parameters.\n\n**Step 3.** Multiply by the number of filters:\n\\[\n64 \\times 289 = 18{,}496 \\text{ parameters}.\n\\]\n\nNote: parameter count depends only on filter shape and number of filters, not on the output spatial size.",
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
        '"Same" padding ensures the output spatial size equals the input size.\n\n**Step 1.** Set output size = input size in the formula $\\left\\lfloor \\frac{W - F + 2P}{S} \\right\\rfloor + 1 = W$, and solve for $P$ with $S = 1$:\n\\[\nW - F + 2P + 1 = W \\implies -F + 2P + 1 = 0 \\implies P = \\frac{F - 1}{2}.\n\\]\n\n**Step 2.** For $F = 3$:\n\\[\nP = \\frac{3 - 1}{2} = 1.\n\\]\n\n**Step 3.** Verify: a $7 \\times 7$ input with $3 \\times 3$ filter, $S = 1$, $P = 1$ produces $(7 - 3 + 2)/1 + 1 = 7 \\times 7$ output. Each border is padded with 1 zero pixel.',
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
        "The bottleneck design uses $1 \\times 1$ convolutions to reduce and restore channel depth.\n\n**Step 1.** A $1 \\times 1$ conv reduces channels from, for example, $256 \\to 64$ before the expensive $3 \\times 3$ conv, then another $1 \\times 1$ conv expands back $64 \\to 256$.\n\n**Step 2.** The FLOPs of a $3 \\times 3$ conv scale as $\\text{channels}_{\\text{in}} \\times \\text{channels}_{\\text{out}}$. Reducing from 256 to 64 channels cuts the $3 \\times 3$ cost by a factor of $(256/64)^2 = 16\\times$, at the cost of two inexpensive $1 \\times 1$ convs.\n\n**Step 3.** The net saving is approximately $4\\times$ compared to a plain residual block, making deep networks computationally feasible.",
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
        "The FLOPs of a convolution scale as $F \\times F \\times C_{\\text{in}} \\times C_{\\text{out}}$. Without $1 \\times 1$ bottlenecks, a $5 \\times 5$ conv on 256 input channels costs:\n\\[\n5 \\times 5 \\times 256 \\times 256 \\approx 1.6 \\text{ M FLOPs}.\n\\]\n\n**Step 1.** Adding a $1 \\times 1$ reduction to 32 channels first:\n\\[\n1 \\times 1 \\times 256 \\times 32 + 5 \\times 5 \\times 32 \\times 256 \\approx 213\\text{ K FLOPs},\n\\]\nwhich is approximately $7.5\\times$ fewer.\n\n**Step 2.** This \"Network in Network\" dimensionality reduction was key to making GoogLeNet computationally practical at scale.\n\n**Step 3.** The same principle applies to the $3 \\times 3$ branch.",
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
      correctAnswer: 0,
      explanation:
        "EfficientNet's compound scaling is designed so that FLOPs double with each unit increase in $\\phi$.\n\n**Step 1.** FLOPs scale as:\n\\[\n\\text{FLOPs} \\propto d \\cdot w^2 \\cdot r^2,\n\\]\nsubstituting the scaling rules gives:\n\\[\n\\alpha^\\phi \\cdot (\\beta^\\phi)^2 \\cdot (\\gamma^\\phi)^2 = (\\alpha \\cdot \\beta^2 \\cdot \\gamma^2)^\\phi.\n\\]\n\n**Step 2.** The coefficients $\\alpha = 1.2$, $\\beta = 1.1$, $\\gamma = 1.15$ were found by grid search on EfficientNet-B0, satisfying $\\alpha \\cdot \\beta^2 \\cdot \\gamma^2 \\approx 2$.\n\n**Step 3.** This gives a principled multi-dimensional scaling law that outperforms single-dimension scaling at equal FLOPs.",
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
        "After normalising to zero mean and unit variance with $\\hat{x}_i$, the learned affine transformation $y_i = \\gamma \\hat{x}_i + \\beta$ re-introduces a learnable scale and shift.\n\n**Step 1.** If $\\gamma = \\sigma_B$ and $\\beta = \\mu_B$, the original unnormalised distribution is recovered.\n\n**Step 2.** This means Batch Normalisation never restricts the representational capacity of the network — the affine transform can undo the normalisation if that is optimal.\n\n**Step 3.** In practice, $\\gamma$ and $\\beta$ are learned to find the optimal activation distribution for each feature map channel.",
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
        "During training, Batch Normalisation normalises using the mini-batch statistics:\n\\[\n\\mu_B = \\frac{1}{m} \\sum_{i=1}^{m} x_i, \\quad \\sigma_B^2 = \\frac{1}{m} \\sum_{i=1}^{m} (x_i - \\mu_B)^2.\n\\]\n\n**Step 1.** At inference, a single test sample has no meaningful \"batch\" statistic.\n\n**Step 2.** Instead, BN uses running estimates accumulated during training via exponential moving average:\n\\[\n\\mu_{\\text{run}} = \\text{momentum} \\cdot \\mu_{\\text{run}} + (1 - \\text{momentum}) \\cdot \\mu_B.\n\\]\n\n**Step 3.** These fixed population statistics make inference deterministic and independent of batch size.",
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
      correctAnswer: 1,
      explanation:
        "While Batch Normalization greatly reduces sensitivity to initialisation by stabilising activations across layers, good initialisation still matters.\n\n**Step 1.** In the very first forward pass — before any running statistics have been accumulated — the batch statistics may be unstable, especially with small batch sizes.\n\n**Step 2.** Poor initialisation can still cause saturated (e.g., sigmoid/tanh) or exploding activations in this critical first pass.\n\n**Step 3.** He initialisation ($\\text{std} = \\sqrt{2/\\text{fan}_{\\text{in}}}$ for ReLU) sets weight variance to prevent signals from shrinking toward zero or exploding through deep networks, improving early convergence.",
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
        "IoU is defined as the ratio of intersection area to union area.\n\n**Step 1.** Write the IoU formula:\n\\[\n\\text{IoU} = \\frac{|A \\cap B|}{|A \\cup B|}.\n\\]\n\n**Step 2.** Compute the union area (being careful not to double-count the intersection):\n\\[\n|A \\cup B| = |A| + |B| - |A \\cap B| = 60 + 80 - 40 = 100.\n\\]\n\n**Step 3.** Compute IoU:\n\\[\n\\text{IoU} = \\frac{40}{100} = 0.40.\n\\]\n\nIn Pascal VOC, a detection is a true positive when $\\text{IoU} \\geq 0.5$. COCO averages AP over IoU thresholds $0.50:0.05:0.95$.",
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
        "(1) Compute IoU for all predicted-GT pairs; (2) select the pair with maximum IoU; (3) compute precision at that IoU; (4) repeat for all GT boxes.",
        "(1) Threshold confidence at 0.5; (2) remove duplicates with NMS; (3) compute recall; (4) compute precision at 50% recall threshold.",
      ],
      correctAnswer: 0,
      explanation:
        "Standard AP computation (VOC/COCO) proceeds through four stages.\n\n**Step 1.** Sort all detections by confidence score in descending order.\n\n**Step 2.** For each detection in rank order: if its IoU with any unmatched GT box $\\geq$ threshold, label it as TP (and mark that GT as matched); otherwise label it as FP.\n\n**Step 3.** Compute cumulative precision $P(k) = \\text{TP}/(\\text{TP} + \\text{FP})$ and recall $R(k) = \\text{TP}/\\text{num\\_GT}$ at each rank $k$.\n\n**Step 4.** AP is the area under the $P$-$R$ curve (interpolated at 11 recall points for VOC, continuous for COCO). mAP averages AP over all classes.",
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
        "Each of the $7 \\times 7 = 49$ grid cells outputs a fixed number of values.\n\n**Step 1.** Compute values per cell: 2 boxes $\\times$ 5 values + 20 class probabilities = 10 + 20 = 30 values per cell.\n\n**Step 2.** Multiply by the number of cells:\n\\[\n7 \\times 7 \\times 30 = 1470.\n\\]\n\n**Step 3.** YOLO frames object detection as a single regression problem, predicting all outputs in one forward pass — enabling real-time detection at approximately 45 FPS.",
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
        "Anchors are placed at every spatial location in the feature map.\n\n**Step 1.** Compute the number of spatial locations: $50 \\times 38 = 1900$.\n\n**Step 2.** Multiply by anchors per location: $1900 \\times 9 = 17{,}100$.\n\n**Step 3.** The Region Proposal Network (RPN) classifies each anchor as foreground/background and regresses bounding-box offsets. Non-maximum suppression then retains the top approximately 2000 proposals for the detection head.",
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
        "FPN combines two complementary pathways to achieve both high resolution and rich semantics.\n\n**Step 1.** The **bottom-up pathway** is the standard CNN forward pass, progressively downsampling to gain strong semantic features but losing spatial resolution.\n\n**Step 2.** The **top-down pathway** takes coarse, semantically rich feature maps, upsamples them by $2\\times$, and merges them element-wise with same-resolution features from the bottom-up pathway via $1 \\times 1$ lateral connections.\n\n**Step 3.** This gives every pyramid level both high resolution (from bottom-up) and rich semantic content (from top-down), enabling accurate detection of both small and large objects.",
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
        "DETR uses $N$ object queries (e.g., $N = 100$) and the Hungarian algorithm finds the unique minimum-cost bijection between predictions and ground truth boxes.\n\n**Step 1.** Each GT is matched to exactly one query, and each query is matched to at most one GT (or to \"no object\").\n\n**Step 2.** Since training enforces this one-to-one uniqueness, the model cannot learn to produce duplicate detections for the same object.\n\n**Step 3.** This contrasts with anchor-based detectors, where many anchors can propose overlapping boxes for the same object, requiring NMS to suppress duplicates.",
      hints: [
        "NMS is needed when multiple anchors/proposals detect the same object. What prevents that in DETR?",
        "The Hungarian matching enforces bijective (one-to-one) assignment: each query \"owns\" at most one GT box during training.",
      ],
    },
  ],
};

export default questions;
